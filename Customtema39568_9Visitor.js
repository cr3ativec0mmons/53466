import tema39568_9Visitor from './generated/tema39568_9Visitor.js';
import tema39568_9Parser from './generated/tema39568_9Parser.js';

class Customtema39568_9Visitor extends tema39568_9Visitor {
    constructor() {
        super();
        this.memory = {}; // Almacén de variables
    }

    visitDecl(ctx) {
        const varName = ctx.ID().getText();
        if (ctx.expr()) {
            this.memory[varName] = this.visit(ctx.expr());
        }
        const val = this.memory[varName] !== undefined ? this.memory[varName] : 'undefined';
        console.log(`Declaración: ${ctx.getChild(0).getText()} ${varName} = ${val};`);
    }

    visitAssign(ctx) {
        const varName = ctx.ID().getText();
        this.memory[varName] = this.visit(ctx.expr());
        console.log(`${varName} = ${this.memory[varName]};`);
    }

    visitNumber(ctx) {
        return Number(ctx.getText());
    }

    visitId(ctx) {
        return this.memory[ctx.getText()] || 0;
    }

    visitMulDiv(ctx) {
        const left = this.visit(ctx.expr(0));
        const right = this.visit(ctx.expr(1));
        return ctx.op.type === tema39568_9Parser.STAR ? left * right : left / right;
    }

    visitAddSub(ctx) {
        const left = this.visit(ctx.expr(0));
        const right = this.visit(ctx.expr(1));
        return ctx.op.type === tema39568_9Parser.SUM ? left + right : left - right;
    }

    visitParens(ctx) {
        return this.visit(ctx.expr());
    }
}

export default Customtema39568_9Visitor;