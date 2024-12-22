import Visitor from '../visitor/Visitor.js';
import { Expresion, Rango } from '../visitor/CST.js';

export default class Tokenizer extends Visitor {
    generateTokenizer(grammar) {
        console.log(grammar)
        return `
module tokenizer
implicit none

contains
function nextSym(input, cursor) result(lexeme)
    character(len=*), intent(in) :: input
    integer, intent(inout) :: cursor
    character(len=:), allocatable :: lexeme
    integer :: i

    if (cursor > len(input)) then
        allocate( character(len=3) :: lexeme )
        lexeme = "EOF"
        return
    end if
  
    ${grammar.map((produccion) => produccion.accept(this)).join('\n')}

    print *, "error lexico en col ", cursor, ', "'//input(cursor:cursor)//'"'
    lexeme = "ERROR"
end function nextSym
end module tokenizer 
        `;
    }

    visitProducciones(node) {
       return node.expr.accept(this);
    }

    visitOpciones(node) {
        return node.expr.map((node) => node.accept(this)).join('\n');
    }

    visitUnion(node) {
        // return `if `
        return node.expr.map((node) => node.accept(this)).join('\n');
    }

    visitExpresion(node) {
        let result = '';
    
        if (node.qty.length === 0) {
            result += node.expr.accept(this);
        } else {
            let exprResult = this.addTabulationToLines(node.expr.accept(this));
    
            switch (node.qty) {
                case '?':
                    result += `
    if (cursor <= len(input)) then
    i = cursor
    ${node.expr.accept(this)}
    if(lexeme /= "ERROR") then
        cursor = i
    end if
    end if
                    `;
                    break;
    
                case '*':
                    result += `
    i = cursor
    do while (cursor <= len(input))
    ${exprResult}
    cursor = cursor + 1
    end do
                    `;
                    break;
    
                case '+':
                    result += `
    i = cursor
    ${exprResult}
    do while (cursor <= len(input))
    ${exprResult}
    cursor = cursor + 1
    end do
                    `;
                    break;
    
                default:
                    console.log("Error en la cantidad de repeticiones");
            }
        }
    
        return result;
    }

    visitString(node) {
        return `
    if ("${node.val}" == input(cursor:cursor + ${node.val.length - 1})) then
        allocate( character(len=${node.val.length}) :: lexeme)
        lexeme = input(cursor:cursor + ${node.val.length - 1})
        cursor = cursor + ${node.val.length}
        return
    end if
    `;
    }

    
    generateCaracteres(chars) {
        if (chars.length === 0) return '';
    
        const specialChars = {
            '\\t': 9,  // Tabulación
            '\\n': 10, // Salto de línea
            '\\r': 13, // Retorno de carro
            '\\f': 12, // Avance de página
            '\\v': 11  // Tabulación vertical
        };
    
        const processedChars = [];
        let i = 0;
    
        // Procesa caracteres normales y especiales
        while (i < chars.length) {
            if (chars[i] === '\\' && i + 1 < chars.length) {
                const potentialSpecial = chars[i] + chars[i + 1];
                if (specialChars[potentialSpecial] !== undefined) {
                    processedChars.push(potentialSpecial);
                    i += 2; // Salta los dos caracteres
                    continue;
                }
            }
            processedChars.push(chars[i]);
            i++;
        }
    
        let result = '';
    
        // Genera las condiciones para caracteres especiales
        processedChars.forEach((char) => {
            if (specialChars[char] !== undefined) {
                const asciiValue = specialChars[char];
                result += `
    if (achar(${asciiValue}) == input(i:i)) then
        lexeme = input(cursor:i)
        cursor = i + 1
        return
    end if
                `;
            }
        });
    
        // Genera condiciones para caracteres normales
        const normalChars = processedChars.filter((char) => specialChars[char] === undefined);
        if (normalChars.length > 0) {
            result += `
    if (findloc([${normalChars.map((char) => `"${char}"`).join(', ')}], input(i:i), 1) > 0) then
        lexeme = input(cursor:i)
        cursor = i + 1
        return
    end if
            `;
        }
    
        return result;
    }

    visitCorchetes(node) {
        return `
    i = cursor
    ${this.generateCaracteres(node.cor.filter((node) => typeof node === 'string'))}
    ${node.cor
        .filter((node) => node instanceof Rango)
        .map((range) => range.accept(this))
        .join('\n')}
        `;
    }

    visitRango(node) {
        return `
    if (input(i:i) >= "${node.bottom}" .and. input(i:i) <= "${node.top}") then
        lexeme = input(cursor:i)
        cursor = i + 1
        return
    end if
        `;
    }

    visitIdentificador(node) {
        return '';
    }

    // Función para agregar tabulación a cada línea
    addTabulationToLines(code) {
        return code
            .split('\n')  // Separa el código en líneas
            .map(line => `    ${line}`)  // Agrega 4 espacios (tabulación) al principio de cada línea
            .join('\n');  // Vuelve a juntar las líneas con saltos de línea
    }
}