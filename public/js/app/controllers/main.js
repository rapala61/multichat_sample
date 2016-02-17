angular.module('chatApp')
  .controller('main', ['$scope', 'socket', function( $scope, socket ) {
    $scope.message = "I am the main controller for the chat app";
    $scope.chats = [
      { id: 'red', messages: [], newMessage: {} },
      { id: 'white', messages: [], newMessage: {} },
      { id: 'blue', messages: [], newMessage: {} }
    ];

    function findChat( id ){
      var chat = null;
      $scope.chats.forEach(function( currChat ) {
        if ( currChat.id === id ) {
          chat = currChat;
        }
      });
      return chat;
    }

    $scope.sendMessage = function( chatId ) {
      var chat = findChat( chatId );
      socket.emit('new chat message',
        {
          chatId: chatId,
          from: chat.newMessage.from,
          content: chat.newMessage.content
        }
      );
    }

    socket.on('new chat message', function( msg ) {
      console.log('ff', msg);
      var chat = findChat( msg.chatId );
      $scope.$apply(function() {
        chat.messages.push({ from: msg.from, content: msg.content });
      })
    });

  }]);
