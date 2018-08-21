var chokidar = require('chokidar'); //scrutation des fichiers
var sftp = require('sftp-node'); //envoie vers les serveurs

const options = {
    host: 'domain.com',
    port: '22',
    username: 'username',
    privateKey: './key',
};

//initialisation du watcher. on ignore les fichiers caché (.dotfile)
var watcher = chokidar.watch('./send', {
    ignored: /[\/\\]\./,
    persistent: true
});
//function d'envoie vers le serveur en sftp
watcher.on('add', path => {
        console.log(path);
        sftp.upload(options, '/dest/directory/'+path, './'+path, function(err,res){
            if(err)
                console.log('err: '+ err);
            else
                console.log('res: '+ res);
        });
    });