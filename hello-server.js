var ipc=require('node-ipc');

ipc.config.id   = 'testpipe';
ipc.config.retry= 1500;

ipc.serve(
    function(){
        ipc.server.on(
            'app.message',
            function(data,socket){
                // ipc.log('got a message : '.debug, data);
                ipc.log('got a message : ', data);
                ipc.server.emit(
                    socket,
                    'app.message',  //this can be anything you want so long as
                                //your client knows.
                    data+' testpipe!'
                );
            }
        );
        ipc.server.on(
            'app.message2',
            function(data,socket){
                // ipc.log('got a message : '.debug, data);
                ipc.log('got a message : ', data);
                ipc.server.emit(
                    socket,
                    'app.message2',  //this can be anything you want so long as
                                //your client knows.
                    data+' testpipe!!!'
                );
            }
        );
        ipc.server.on(
            'socket.disconnected',
            function(socket, destroyedSocketID) {
                ipc.log('client ' + destroyedSocketID + ' has disconnected!');
            }
        );
    }
);

ipc.server.start();
