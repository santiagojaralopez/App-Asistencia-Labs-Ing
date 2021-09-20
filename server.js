//Importo los módulos a usar
const {createServer} = require('http');
const {createReadStream} = require('fs');
const path = require('path');

//Guardo el host en una constante
const host = 'localhost';
//Y el puerto en una variable de entorno
const {PORT = 8000} = process.env;

//Guardo los content-type de los archivos a servir
const HTML_CONTENT_TYPE = 'text/html';
const CSS_CONTENT_TYPE = 'text/css';
const JS_CONTENT_TYPE = 'text/javascript';
const IMG_CONTENT_TYPE = 'image/png' || 'icon/ico';

//Monto la ruta de el directorio a servir
const PUBLIC_FOLDER = path.join(__dirname, 'public');

//Creo la funcion requestListener
const requestListener = (req, res) => {
    const {url} = req;
    let statusCode = 200;
    let contentType = HTML_CONTENT_TYPE;
    let stream;

    //Si se requiere la ruta principal, devolvemos el index.html
    if (url === '/') {
        stream = createReadStream(`${PUBLIC_FOLDER}/index.html`);
    } //Para las imagenes e íconos
    else if (url.match('\.png$') || url.match('\.ico$')) {
        contentType = IMG_CONTENT_TYPE;
        stream = createReadStream(`${PUBLIC_FOLDER}${url}`);
    } //Para los archivos css
    else if (url.match('\.css$')) {
        contentType = CSS_CONTENT_TYPE;
        stream = createReadStream(`${PUBLIC_FOLDER}${url}`);
    } //Para los archivos javascript
    else if (url.match('\.js$')) {
        contentType = JS_CONTENT_TYPE;
        stream = createReadStream(`${PUBLIC_FOLDER}${url}`);
    } //Si llegamos hasta acá, es un 404
    else {
        statusCode = 404;
    }

    //Cabeceras de response dependiendo del request
    res.writeHead(statusCode, {'Content-Type': contentType});
    //Si hay stream, devolvemos el response
    if (stream) stream.pipe(res);
    //Si no hay, retornamos un 'not found'
    else return res.end('Not found');
}

//Creamos el servidor con la funcion requestListener
const server = createServer(requestListener);

//Cuando esté a la escucha, nos informará
server.listen(PORT, host, () => {
    console.log(`Servidor corriendo en http://${host}:${PORT}`)
});