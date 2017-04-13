const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3005;

app.use(express.static(__dirname));
http.listen(PORT, () => console.log('listening on PORT ' + PORT));

//Total user at the start
let GAME_HAS_STARTED = false;
let users = [];
// const users = [
//   {
//     id: 0,
//     name: 'Antoine',
//   },
//   {
//     id: 1,
//     name: 'Pierre',
//   },
//   {
//     id: 2,
//     name: 'Clément',
//   },
//   {
//     id: 3,
//     name: 'Thibault',
//   },
//   {
//     id: 4,
//     name: 'Maxime',
//   },
//   {
//     id: 5,
//     name: 'Edwin',
//   },
//   {
//     id: 6,
//     name: 'Margaux',
//   },
//   {
//     id: 7,
//     name: 'Eva',
//   },
//   {
//     id: 8,
//     name: 'Kouek',
//   },
// ]

//All roles are defined here
let roles = ['Chasseur', 'Petite fille', 'Cupidon'];

const offset = roles.filter(role => role !== 'Loup' && role !== 'Villageois').length;
const wolf = 'Loup';
const villager = 'Villageois';

const getIdOnRole = (role) => users.filter(u => u.role === role).map(x => x.id);

io.on('connection', (socket) => {  
  socket.on('disconnect', () => {    
    users = users.filter(u => u.id !== socket.id);    
    socket.broadcast.emit('infos', { users });
  });
  /**
   * LOGIN
   */  
  socket.on('login', (data) => {    
    // If user is already connected
    if (users.some(user => user.username === data.username)) {
      socket.emit('usernameTaken', 'Name already taken');
    } else {
      const user = {
        id: socket.id,
        username: data.username,
        isMaster: !users.length ? true : false,
        isDead: false
      }

      users.push(user);

      socket.emit('infos', { user, users });
      socket.broadcast.emit('newPlayer', data.username);      
    }
  });

  /**
   * CHAT MESSAGES
   */
  socket.on('messageSent', (payload) => {
    const { name, message } = payload;
    io.emit('message', {
      from: name,
      message,
      at: new Date()
    })
  });

  /**
   * GAME STARTED
   */
  let turnTime = 3;
  let countdown = turnTime * 60;
  socket.on('startGame', (payload) => {
    const availableWolvesOrVillagers = users.length - offset;
    const maxWolves = (availableWolvesOrVillagers % 2 === 0) ? availableWolvesOrVillagers / 2 : (availableWolvesOrVillagers / 2) + .5;
    const maxVillagers = (availableWolvesOrVillagers % 2 === 0) ? availableWolvesOrVillagers / 2 : (availableWolvesOrVillagers / 2) - .5;

    for (let i = 0; i < maxWolves; i++) {
      roles.push(wolve);
    }
    for (let j = 0; j < maxVillagers; j++) {
      roles.push(villager);
    }

    users.forEach(user => {  
      const index = Math.floor(Math.random() * roles.length);
      user.role = roles[index];
      roles.splice(index, 1);
    });    

    io.to(socket.id).emit('role', 'cc twa');    
    socket.broadcast.emit('role', users);

    if(!GAME_HAS_STARTED) {
      setInterval(() => {
        countdown--;
        socket.broadcast.emit('timer', { countdown });
      }, 1000)

      GAME_HAS_STARTED = true;
    }
  })
});