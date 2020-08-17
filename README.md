# socket.io-chat-server
 
[Live demo](https://socket-io-chat-server-1.herokuapp.com)

Проект построен на стеке ***Node - Express - Socket.io*** .

### Реализован Socket API :

1. *io.on('connect')* - запоминаются данные подключаемого пользователя в структуре данных Users.

2. *socket.on('users manager', ({ method, name }, callback)* - управление данными подключенного пользователя в структуре данных Users.

3. *socket.on('rooms manager', ({ method, roomName }, callback)* - управление комнатами пользователей в структуре данных Rooms.

4. *socket.on('chat message',({ roomName, user: {userID, userName}, message })* - управление сообщениями между пользователями.

5. *socket.on('disconnect')* - удаляются сведения пользователя из структур Users и Rooms. Оповещаются остальные пользователи об изменениях в их комнатах.