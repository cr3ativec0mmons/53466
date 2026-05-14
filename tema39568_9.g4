grammar tema39568_9;

programa: instrucciones;

instrucciones: instruccion
    | instrucciones instruccion
    ;

instruccion: decision;

decision: 'if' '(' condicion ')' '{' sentencia '}' ('else' '{' sentencia '}')?;

sentencia: salida
    | salida sentencia
    | terminar
    ;

salida: 'printf' '(' cadena ')' ';';

terminar: 'return' ';';

condicion: '0'
    | '1'
    ;

cadena: '"' caracteres '"';

caracteres: caracter
    | caracteres caracter
    ;

caracter: LETRA
    | DIGITO
    | SIMBOLO
    ;

LETRA: [a-zA-Z];
DIGITO: [0-9];
SIMBOLO: '.' | ',' | '!' | '?' | ':' | ';' | '\'';
WS: [ \t\r\n]+ -> skip;