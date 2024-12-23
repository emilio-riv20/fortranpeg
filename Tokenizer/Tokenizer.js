import Visitor from '../visitor/Visitor.js';
import { Expresion, Rango } from '../visitor/CST.js';

export default class Tokenizer extends Visitor {
    generateTokenizer(grammar) {
        console.log(grammar)
        return `
module parser
implicit none
integer :: cursor
contains

subroutine parse(input)
    character(len=*), intent(in) :: input
    character(len=:), allocatable :: lexeme
    cursor = 1
    do while (lexeme /= "EOF" .and. lexeme /= "ERROR")
        lexeme = nextSym(input, cursor)
        print *, lexeme
    end do
end subroutine parse

function nextSym(input, cursor) result(lexeme)
    integer, intent(inout) :: cursor
    character(len=*), intent(in) :: input
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
end module parser 
        `;
    }

    visitProducciones(node) {
        console.log(node.id)
       return node.expr.accept(this);
    }

    visitOpciones(node) {
        let e = ""
        let ex = []
        node.expr.map((node) => {
            
            if (node.expr.length > 1 ){
                node.expr.map((n) => {
                    if(n.expr.constructor.name == "String"){
                        ex.push({val:n.expr.val,type:"string"})
                    } else if(n.expr.constructor.name == "Corchetes"){
                        ex.push({val:[n.expr.cor[0].bottom,n.expr.cor[0].top],type:"range"})
                    }
                })              
                // e += CreateIf(ex.length,ex)
            } else {  
                node.expr.map((node)=>{
                    e += node.accept(this)
                    e += "\n"
                })              
            }

        }).join("\n")
        e+=CreateIf(ex.length,ex)
        console.log(`${e}`)
        return e
    }


    visitUnion(node) {
        // return `if `
        return node.expr.map((node) => node.accept(this)).join('\n');
    }

    visitExpresion(node) {
        return node.expr.accept(this);
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
    
        // Genera las condiciones para caracteres especiales agrupados
        const groupedSpecials = processedChars.filter((char) => specialChars[char] !== undefined);
        if (groupedSpecials.length > 0) {
            const specialConditions = groupedSpecials
                .map((char) => `iachar(input(i:i)) == ${specialChars[char]}`)
                .join(' .or. ');
    
            result += `
    if (input(i:i) == ' ' .or. ${specialConditions}) then
        if (input(i:i) == ' ') lexeme = lexeme // '_'
        ${groupedSpecials
            .map((char) => `if (iachar(input(i:i)) == ${specialChars[char]}) lexeme = lexeme // '${char}'`)
            .join('\n        ')}
        cursor = i + 1
        return
    end if
            `;
        }
    
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
    i = cursor
    lexeme = ""
    do while (i <= len(input) .and. input(i:i) >= "${node.bottom}" .and. input(i:i) <= "${node.top}" .and. input(i:i) /= " ")
        lexeme = lexeme // input(i:i)
        i = i + 1
    end do
    if (len(lexeme) > 0) then
        cursor = i
        return
    end if
        `;
    }

    visitIdentificador(node) {
        return '';
    }

    visitPunto(node) {
        return `
    if (input(i:i) == '.') then
        lexeme = '.'
        cursor = i + 1
        return
    end if
        `;
    }
    visitFin(node) {
        return `
    if (input(i:i) == '.') then
        lexeme = 'EOF'
        cursor = i + 1
        return
    end if
        `;
    }

    // Función para agregar tabulación a cada línea
    addTabulationToLines(code) {
        return code
            .split('\n')  // Separa el código en líneas
            .map(line => `    ${line}`)  // Agrega 4 espacios (tabulación) al principio de cada línea
            .join('\n');  // Vuelve a juntar las líneas con saltos de línea
    }
}
function CreateIf(niv,arr,act=1){
    let condicion
    let bloque
    if (act > niv) {
        const indentacion = "   ".repeat(act - 1); 
        return `\n${indentacion}${indentacion}return\n`;
    }
    console.log(arr)
    const indentacion = "   ".repeat(act);
    let obj = arr.shift()
    if(obj.type == "string"){
        condicion = `("${obj.val}" == input(cursor:cursor + ${obj.val.length-1}))`; // Condición dinámic
        bloque = `${indentacion}if (${condicion}) then\n${indentacion}${indentacion}allocate(character(len=${obj.val.length})::lexeme) \n${indentacion}${indentacion}lexeme=input(cursor:cursor + ${obj.val.length-1})\n${indentacion}${indentacion}cursor=cursor+${obj.val.length}`;
    }else if(obj.type=="range"){
        condicion = `(input(i:i) >= "${obj.val[0]}" .and. input(i:i) <= "${obj.val[1]}")`; // Condición dinámic
        bloque = `\n${indentacion}i = cursor\n${indentacion}if (${condicion}) then\n${indentacion}${indentacion}lexeme=input(cursor:i)\n${indentacion}${indentacion}cursor=i+${obj.val[1].length}\n`;
    }
    const cuerpoRecursivo = CreateIf(niv,arr,act + 1);
    const cierre = `${indentacion}end if\n`;

    // arr.forEach((e)=>{console.log(e)})
    return bloque + cuerpoRecursivo + cierre;
}
