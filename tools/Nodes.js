const nodes = {
    Producciones:['id', 'expr', 'alias'],
    Opciones:['expr'],
    Union:['expr'],
    Expresion:['expr', 'label', 'qty'],
    String:['val', 'isCase'],
    Corchetes:['cor', 'isCase'],
    Rango:['bottom', 'top'],
    Identificador:['id'],
};

export default nodes;