// Auto-generated CST.js
import Visitor from './Visitor.js';

export class Produccion {
    constructor(id, alias, expresion) {
        this.id = id;
        this.alias = alias;
        this.expresion = expresion;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitProduccion(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Opciones {
    constructor(concatenacion) {
        this.concatenacion = concatenacion;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitOpciones(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Union {
    constructor(expresion) {
        this.expresion = expresion;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitUnion(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Expresion {
    constructor(label, varios, expresiones, cierres, conteo) {
        this.label = label;
        this.varios = varios;
        this.expresiones = expresiones;
        this.cierres = cierres;
        this.conteo = conteo;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitExpresion(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Etiqueta {
    constructor(arroba, id, varios) {
        this.arroba = arroba;
        this.id = id;
        this.varios = varios;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitEtiqueta(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Varios {
    constructor(value) {
        this.value = value;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitVarios(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Expresiones {
    constructor(id, alias, i, opciones, corchetes) {
        this.id = id;
        this.alias = alias;
        this.i = i;
        this.opciones = opciones;
        this.corchetes = corchetes;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitExpresiones(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Cierres {
    constructor(value) {
        this.value = value;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitCierres(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Conteo {
    constructor(number, id, opciones) {
        this.number = number;
        this.id = id;
        this.opciones = opciones;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitConteo(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Corchetes {
    constructor(rango, contenido) {
        this.rango = rango;
        this.contenido = contenido;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitCorchetes(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Caracter {
    constructor(value) {
        this.value = value;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitCaracter(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Contenido {
    constructor(corchetes, texto) {
        this.corchetes = corchetes;
        this.texto = texto;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitContenido(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Corchete {
    constructor(value) {
        this.value = value;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitCorchete(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Texto {
    constructor(value) {
        this.value = value;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitTexto(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Identificador {
    constructor(id) {
        this.id = id;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitIdentificador(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Number {
    constructor(value) {
        this.value = value;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitNumber(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}