/**
 * Esta funcion crea estados coherentes a operaciones asicronas
 * Cada instancia de AsyncLocalStorage mantiene un contexto independiente de almacenamiento. Pueden existir varias instancias de manera simultanea.
*/
const http = require('node:http');
const { AsyncLocalStorage } = require( 'node:async_hooks' );

const asyncLocalStorage = new AsyncLocalStorage();

function logWithIs(msg){
    const id = asyncLocalStorage.getStore();
    console.info(`${id != undefined ? id : '-'}`, msg );
}

let idSeq = 0 ;
http.createServer( (req, res)=>{
    asyncLocalStorage.run( idSeq++, ()=>{
        logWithIs('Inicio');
        setImmediate(()=>{
            logWithIs('Fin');
            res.end();
        });
    } );
} ).listen(8080);

http.get('http://localhost:8080');
http.get('http://localhost:8080');
http.get('http://localhost:8080');
http.get('http://localhost:8080');
