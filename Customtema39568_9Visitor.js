import tema39568_9Visitor from './generated/tema39568_9Visitor.js';

class Customtema39568_9Visitor extends tema39568_9Visitor {
    constructor() {
        super();
    }

    visitPrograma(ctx) {
        return this.visit(ctx.instrucciones());
    }

    visitInstrucciones(ctx) {
        if (ctx.instrucciones()) {
            return this.visit(ctx.instrucciones()) + '\n' + this.visit(ctx.instruccion());
        }
        return this.visit(ctx.instruccion());
    }

    visitInstruccion(ctx) {
        return this.visit(ctx.decision());
    }

    visitDecision(ctx) {
        const cond = this.visit(ctx.condicion());
        let js = `if (${cond}) {\n`;
        js += this.visit(ctx.sentencia(0));
        js += `}`;
        if (ctx.ELSE()) {
            js += ` else {\n`;
            js += this.visit(ctx.sentencia(1));
            js += `}`;
        }
        return js + "\n";
    }

    visitSentencia(ctx) {
        let js = "";
        for (let i = 0; i < ctx.children.length; i++) {
            js += this.visit(ctx.children[i]);
        }
        return js;
    }

    visitSalida(ctx) {
        let textoAImprimir = ctx.cadena().getText(); 
        return `    console.log(${textoAImprimir});\n`;
    }

    visitTerminar(ctx) {
        return `    return;\n`;
    }

    visitCondicion(ctx) {
        if (ctx.ZERO()) return "0";
        if (ctx.ONE()) return "1";
        return "";
    }
}

export default Customtema39568_9Visitor;