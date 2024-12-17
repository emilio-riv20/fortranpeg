// Auto-generated CST.js
import Visitor from './Visitor.js';

export class Gramatica {
    constructor(saltos, rules) {
        this.saltos = saltos;
        this.rules = rules;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitGramatica(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
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
export class Opciones {
    constructor(concatenacion, saltos) {
        this.concatenacion = concatenacion;
        this.saltos = saltos;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitOpciones(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Union {
    constructor(expresion1, saltos, expresion2, id) {
        this.expresion1 = expresion1;
        this.saltos = saltos;
        this.expresion2 = expresion2;
        this.id = id;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitUnion(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Expresion {
    constructor(etiqueta, varios, saltos, expresion, conteo) {
        this.etiqueta = etiqueta;
        this.varios = varios;
        this.saltos = saltos;
        this.expresion = expresion;
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
    constructor(saltos, id, varios) {
        this.saltos = saltos;
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
    constructor(id) {
        this.id = id;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitVarios(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Expresiones {
    constructor(id, alias, saltos, Opciones, Corchetes) {
        this.id = id;
        this.alias = alias;
        this.saltos = saltos;
        this.Opciones = Opciones;
        this.Corchetes = Corchetes;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitExpresiones(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class Conteo {
    constructor(saltos, Number, id, Opciones) {
        this.saltos = saltos;
        this.Number = Number;
        this.id = id;
        this.Opciones = Opciones;
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
export class Rango {
    constructor(String) {
        this.String = String;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitRango(this);
        }
        throw new Error('Visitor not implemented correctly');
    }
}
export class String {
    constructor(value) {
        this.value = value;
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visitString(this);
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