//Client-side:
//edit.ejs
//lines 21 - 42:

editor.on('keyup', updateFile);

  var uid = Math.random().toString(36);

  function updateFile(editor, change) {
    socket.emit('textUpdated', { name: $('form').data('filename'), content: editor.getValue(), author: uid });
  }

  var socket = io();

  socket.on('userCountChanged', function(newUserCount){
    $('h3').text(newUserCount + ' users online')
  })

  socket.on('fileChanged', function(file){ //"on" waits for an emit

    if(uid == file.author) return;

    var cursorPos = editor.getCursor();
    editor.setValue(file.content);
    editor.setCursor(cursorPos);
  })
