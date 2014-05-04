module.exports = function handleTo(server){

    server.get('/', function (req, res){
        res.sendfile('Application/Frontend/index.html');
    });

    server.get('/index.html', function (req, res){
        res.sendfile('Application/Frontend/index.html');
    });

    server.get('/Frontend/*', function (req, res){
        res.writeHead(200, {'Context-Type': 'text/html'});
        res.end();
    });

    /*server.get('*', function (req, res){
        res.sendfile('Application/Frontend/templates/404.html');
    });*/
};