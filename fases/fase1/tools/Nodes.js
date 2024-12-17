const nodes = {

    Gramatica:{
        saltos: " ",
        rules: "Node",
        saltos: " ",
    },

    Produccion:{
        id: "string",
        alias: "string",
        expresion: "Node",
    },

    Identificador:{
        id: "string",
    },

    Opciones:{
        concatenacion:[ "Node"],
        saltos: " ",
    },

    Union:{
        expresion1: "Node",
        saltos: " ",
        expresion2: "Node",
        id: "string",
    },

    Expresion:{
        etiqueta: "string",
        varios: "string",
        saltos: " ",
        expresion: "Node",
        saltos: " ",
        conteo: "Node",
    },

    Etiqueta:{
        saltos: " ",
        id: "string",
        saltos: " ",
        varios: "Node",
    },

    Varios:{
       id: "string",   
    },

    Expresiones:{
        id: "string",
        alias: "string",
        saltos: " ",
        Opciones: "Node",
        Corchetes: "Node",
    },

    Conteo:{
        saltos: " ",
        Number: "string",
        id: "string",
        saltos: " ",
        Opciones: "Node",
    },

    Corchetes:{
        rango: "Node",
        contenido: "Node",
    },

    Rango:{
        String: "string",
        String: "string",
    },

    String:{
        value: "string",
    },

    Contenido:{
        corchetes: "Node",
        texto: "string",
    },

    Number:{
        value: "string",
    },
};

export default nodes;