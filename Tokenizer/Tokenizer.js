import Visitor from '../visitor/Visitor.js';
import { Rango } from '../visitor/CST.js';

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
        node.expr.forEach(element => {
            console.log(element)
        });
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
    
        const specialChars = ['\\t', '\\n', '\\r', '\\f', '\\v'];
        let result = '';

        specialChars.forEach((char) => {
            console.log("el char: ",chars)
            if (chars.includes(char)) {
                const representation = (() => {
                    switch (char) {
                        case '\t': return '\\t';
                        case '\n': return '\\n';
                        case '\r': return '\\r';
                        case '\f': return '\\f';
                        case '\v': return '\\v';
                    }
                })();
    
                result += `
        if ("${representation}" == input(i:i)) then
            lexeme = input(cursor:i)
            cursor = i + 1
            return
        end if
                `;
            }
        });
    
        const normalChars = chars.filter((char) => !specialChars.includes(char));
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
        console.log("asdasd",node)
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
}