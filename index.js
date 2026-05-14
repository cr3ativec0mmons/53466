import tema39568_9Lexer from "./generated/tema39568_9Lexer.js";
import tema39568_9Parser from "./generated/tema39568_9Parser.js";
import Customtema39568_9Visitor from "./Customtema39568_9Visitor.js";
import antlr4, { CharStreams, CommonTokenStream } from "antlr4";
import readline from 'readline';
import fs from 'fs';

async function main() {
    let input;

// Intento leer la entrada desde el archivo input - en forma sincrónica.
    try {
        input = fs.readFileSync('input.js', 'utf8');
    } catch (err) {
        // Si no es posible leer el archivo, solicitar la entrada del usuario por teclado
        input = await leerCadena(); // Simula lectura síncrona
        console.log(input);
    }

    // Proceso la entrada con el analizador para obtener el lexer
    let inputStream = CharStreams.fromString(input);
    let lexer = new tema39568_9Lexer(inputStream);
    
    //Verificar si el lexer está generando tokens 
    console.log("Verificando tokens generados por el lexer...");
    const tokens = lexer.getAllTokens();
    if (tokens.length === 0) {
        console.error("No se generaron tokens. Verifica la entrada y la gramática.");
        return;
    }

    //Mostrar la tabla de tokens y lexemas
    console.log("\nTabla de Tokens y Lexemas:");
    console.log("--------------------------------------------------");
    console.log("| Lexema         | Token                         |");
    console.log("--------------------------------------------------");

    // Recorrer todos los tokens generados por el lexer
    for (let token of tokens) {
        // Obtener el nombre simbólico del token
        const tokenType = tema39568_9Lexer.symbolicNames[token.type] || `UNKNOWN (${token.type})`;
        const lexema = token.text; // Obtener el lexema (texto del token)
        console.log(`| ${lexema.padEnd(14)} | ${tokenType.padEnd(30)}|`);
    }
    console.log("--------------------------------------------------"); 

    /* Vuelve a procesar la entrada, obtener el lexer, el código tokenizado y el parser 
     * Es necesario volver a procesar la entrada porque la función getAllTokens() consume
     * todos los tokens reconocidos y vacía el lexer. */
    inputStream = CharStreams.fromString(input);
    lexer = new tema39568_9Lexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new tema39568_9Parser(tokenStream);
    let tree = parser.programa();

    // Verificar si se produjeron errores sintácticos
    if (parser.syntaxErrorsCount > 0) {
        console.error("\nSe encontraron errores de sintaxis en la entrada.");
    } else {
        console.log("\nEntrada válida.");
        const cadena_tree = tree.toStringTree(parser.ruleNames);
        console.log(`Árbol de derivación: ${cadena_tree}`);

        /* Utilizar un visitor para visitar los nodos que me interesan del árbol 
         * e implementar la semántica que nos interesa.*/
        const visitor = new Customtema39568_9Visitor();
        visitor.visit(tree);
    }
}

function leerCadena() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question("Ingrese una cadena: ", (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

// Ejecuta la función principal
main();