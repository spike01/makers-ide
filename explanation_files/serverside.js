//Key lines:
//Server-side:
//server.js
//line 4: 

var io = require('socket.io')(server); 

//requires the socket.io library, setting the server created on line 2 as the server it will be acting on

//lines 47 - 67:

var userCount = 0;

function updateUserCount(change) {
  userCount += change;
  io.emit('userCountChanged', userCount) //"emit" broadcasts to all connected clients
}

io.on('connect', function(socket){
  updateUserCount(+1);

  socket.on('disconnect', function(){
    updateUserCount(-1);
  })

  socket.on('textUpdated', function(file){
    fs.writeFile('code/' + file.name, file.content.trim());
    io.emit('fileChanged', { content: file.content, author: file.author });
  })
});

