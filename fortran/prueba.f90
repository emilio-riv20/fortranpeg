program test_tokenizer
    use tokenizer     ! Importa el módulo tokenizer
    implicit none

    character(len=100) :: input_string  ! Cadena de entrada (ajusta el tamaño según tus pruebas)
    integer :: cursor                   ! Índice actual en la cadena
    character(len=:), allocatable :: lexeme ! Para almacenar los tokens encontrados

    ! Inicializar la cadena de prueba
    input_string = "foobarfooxyzbar"    ! Cadena de prueba
    cursor = 1                          ! Comenzar desde el primer carácter

    print *, "Probando el módulo tokenizer con la cadena: "//input_string
    print *, "------------------------------------------"

    ! Iterar sobre la cadena hasta que llegues al final
    do while (cursor <= len_trim(input_string))
        ! Llama a la función nextSym
        lexeme = nextSym(input_string, cursor)

        ! Si se reconoce un token, imprímelo
        if (allocated(lexeme)) then
            print *, "Token reconocido: ", trim(lexeme)
            deallocate(lexeme)  ! Libera la memoria del token encontrado
        else
            exit                ! Salir si no se reconoce un token válido
        end if
    end do

    print *, "------------------------------------------"
    print *, "Prueba finalizada."

end program test_tokenizer
