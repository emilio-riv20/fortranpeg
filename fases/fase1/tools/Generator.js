// Generar clases para CST
// Este archivo genera las clases necesarias para implementar el patrón visitante con JavaScript

//import path from 'node:path';
import nodes from './Nodes.js';

const __dirname = import.meta.dirname;
const classesDestination = '../src/lib/CST.js';
const visitorDestination = '../src/lib/Visitor.js';

// Generar el archivo del Visitor
let codeString = `
// Auto-generated
export default class Visitor {
`;

for (const node of Object.keys(nodes)) {
    codeString += `\tvisit${node}(node) {\n\t\tthrow new Error('visit${node} not implemented');\n\t}\n`;
}

codeString += `}`;

writeFileSync(path.join(__dirname, visitorDestination), codeString);
console.log('Generated Visitor class');

// Generar el archivo de las clases del CST
codeString = `
// Auto-generated
import Visitor from './Visitor.js';

`;

for (const [name, args] of Object.entries(nodes)) {
    const argKeys = Object.keys(args);

    // Declarar la clase
    codeString += `
export class ${name} {
    constructor(${argKeys.join(', ')}) {
        ${argKeys.map((arg) => `this.${arg} = ${arg};`).join('\n\t\t')}
    }

    accept(visitor) {
        if (visitor instanceof Visitor) {
            return visitor.visit${name}(this);
        }
        throw new Error("Visitor not implemented correctly");
    }
}
    `;
    console.log(`Generating ${name} node`);
}

writeFileSync(path.join(__dirname, classesDestination), codeString);
console.log('Done!');
