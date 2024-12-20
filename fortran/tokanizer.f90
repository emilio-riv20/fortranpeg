module tokenizer
    implicit none

    contains
    !función dentro del módulo que devuelve un valor lexeme, declarado como allocatable para ajustar su tamaño dinámicamente.
    function nextSym(input, cursor) result(lexeme) !input: Cadena de entrada (un character(len=*)). cursor: Entero que actúa como puntero o índice para recorrer
        character(len=*), intent(in) :: input
        integer, intent(inout) :: cursor !
        character(len=:), allocatable :: lexeme 

        if ("foo" == input(cursor:cursor + 2)) then !Foo
            allocate( character(len=3) :: lexeme !asigna espacio equivalente a lo que leyó y lo almacena
            lexeme = input(cursor:cursor + 2)
            cursor = cursor + 3 !actualiza el cursor
            return
        !por cada regla en la gramática, autogenerar un nuevo "if"
        end if
        if ("bar" == input(cursor:cursor + 2)) then
            allocate( character(len=3) :: lexeme)
            lexeme = input(cursor:cursor + 2)
            cursor = cursor + 3
            return
        end if
        print *, "error lexico en col ", cursor, ', "'//input(cursor:cursor)//'"'
    end function nextSym
end module tokenizer