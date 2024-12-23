
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
  
    






    i = cursor
    
    
    i = cursor
    lexeme = ""
    do while (i <= len(input) .and. input(i:i) >= "0" .and. input(i:i) <= "9" .and. input(i:i) /= " ")
        lexeme = lexeme // input(i:i)
        i = i + 1
    end do
    if (len(lexeme) > 0) then
        cursor = i
        return
    end if
        
        

    i = cursor
    
    
    i = cursor
    lexeme = ""
    do while (i <= len(input) .and. input(i:i) >= "a" .and. input(i:i) <= "z" .and. input(i:i) /= " ")
        lexeme = lexeme // input(i:i)
        i = i + 1
    end do
    if (len(lexeme) > 0) then
        cursor = i
        return
    end if
        

    i = cursor
    lexeme = ""
    do while (i <= len(input) .and. input(i:i) >= "A" .and. input(i:i) <= "Z" .and. input(i:i) /= " ")
        lexeme = lexeme // input(i:i)
        i = i + 1
    end do
    if (len(lexeme) > 0) then
        cursor = i
        return
    end if
        
        

    i = cursor
    
    if (input(i:i) == ' ' .or. iachar(input(i:i)) == 9 .or. iachar(input(i:i)) == 10 .or. iachar(input(i:i)) == 13) then
        if (input(i:i) == ' ') lexeme = lexeme // '_'
        if (iachar(input(i:i)) == 9) lexeme = lexeme // '\t'
        if (iachar(input(i:i)) == 10) lexeme = lexeme // '\n'
        if (iachar(input(i:i)) == 13) lexeme = lexeme // '\r'
        cursor = i + 1
        return
    end if
            
    if (findloc([" "], input(i:i), 1) > 0) then
        lexeme = input(cursor:i)
        cursor = i + 1
        return
    end if
            
    
        

    if (input(i:i) == '.') then
        lexeme = '.'
        cursor = i + 1
        return
    end if
        

    print *, "error lexico en col ", cursor, ', "'//input(cursor:cursor)//'"'
    lexeme = "ERROR"
end function nextSym
end module parser 
        