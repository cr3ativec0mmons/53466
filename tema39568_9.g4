grammar tema39568_9;

programa: instrucciones;

instrucciones: instruccion
    | instrucciones instruccion
    ;

instruccion: decision;

decision: IF LPAREN condicion RPAREN LBRACE sentencia RBRACE (ELSE LBRACE sentencia RBRACE)?;

sentencia: (salida | terminar)+;

salida: PRINTF LPAREN cadena RPAREN SIMBOLO;

terminar: RETURN SIMBOLO;

condicion: ZERO | ONE;

cadena: DQUOTE caracteres DQUOTE;

caracteres: (caracter)*;

caracter: LETRA | DIGITO | SIMBOLO;

// Tokens
IF: 'if';
ELSE: 'else';
PRINTF: 'printf';
RETURN: 'return';
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
ZERO: '0';
ONE: '1';
DQUOTE: '"';
LETRA: [a-zA-Z];
DIGITO: [0-9];
SIMBOLO: '.' | ',' | '!' | '?' | ':' | ';' | '\'';
WS: [ \t\r\n]+ -> skip;
