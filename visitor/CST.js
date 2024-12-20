
// Auto-generated
import Node from './Node.js';

export class Producciones extends Node {
    constructor(id, expr, alias) {
        super();
        this.id = id;
		this.expr = expr;
		this.alias = alias;
    }

    accept(visitor) {
        return visitor.visitProducciones(this);
    }
}
    
export class Opciones extends Node {
    constructor(expr) {
        super();
        this.expr = expr;
    }

    accept(visitor) {
        return visitor.visitOpciones(this);
    }
}
    
export class Union extends Node {
    constructor(expr) {
        super();
        this.expr = expr;
    }

    accept(visitor) {
        return visitor.visitUnion(this);
    }
}
    
export class Expresion extends Node {
    constructor(expr, label, qty) {
        super();
        this.expr = expr;
		this.label = label;
		this.qty = qty;
    }

    accept(visitor) {
        return visitor.visitExpresion(this);
    }
}
    
export class String extends Node {
    constructor(val, isCase) {
        super();
        this.val = val;
		this.isCase = isCase;
    }

    accept(visitor) {
        return visitor.visitString(this);
    }
}
    
export class Corchetes extends Node {
    constructor(cor, isCase) {
        super();
        this.cor = cor;
		this.isCase = isCase;
    }

    accept(visitor) {
        return visitor.visitCorchetes(this);
    }
}
    
export class Rango extends Node {
    constructor(bottom, top) {
        super();
        this.bottom = bottom;
		this.top = top;
    }

    accept(visitor) {
        return visitor.visitRango(this);
    }
}
    