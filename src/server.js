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
let totalUsers = users.length;
//All roles are defined here
let roles = ['Loup', 'Villageois', 'Chasseur', 'Petite fille', 'Cupidon'];
//Get availables length roles to define how much wolves/villagers
const offset = roles.filter(role => role !== 'Loup' && role !== 'Villageois').length;

const MIN_TO_START = 6;
const AVAILABLE_WOLVES_OR_VILLAGER = totalUsers - offset;
const MAX_WOLVES = (AVAILABLE_WOLVES_OR_VILLAGER % 2 === 0) ? AVAILABLE_WOLVES_OR_VILLAGER / 2 : (AVAILABLE_WOLVES_OR_VILLAGER / 2) + .5;
const MAX_VILLAGERS = (AVAILABLE_WOLVES_OR_VILLAGER % 2 === 0) ? AVAILABLE_WOLVES_OR_VILLAGER / 2 : (AVAILABLE_WOLVES_OR_VILLAGER / 2) - .5;

const getRandomRole = () => {
  const randomRole = Math.floor(Math.random() * roles.length);
  return roles[randomRole];
}
const getIdOnRole = (role) => users.filter(u => u.role === role).map(x => x.id);

console.log(`Max wolves possible : ${MAX_WOLVES}`);
console.log(`Max villagers possible: ${MAX_VILLAGERS}`);

io.on('connection', (socket) => {
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
        isMaster: users.length === 0 ? true : false
      }
      users.push(user);
      console.log(users);
      socket.emit('infos', {
        user,
        usersConnected: users
      });
      
      socket.broadcast.emit('newPlayer', data.username);
    }
  });  

  /**
   * CHAT MESSAGES
   */
  socket.on('messageSent', (payload) => {    
    const { name, message } = payload;
    io.sockets.emit('message', {
      from: name,
      message,
      at: new Date()
    })
  });

  let turnTime = 3;
  let countdown = turnTime * 60;
  socket.on('startGame', (payload) => {    
    console.log('ok')
    if(!GAME_HAS_STARTED) {
      setInterval(() => {
        countdown--;
        console.log(countdown)
        io.sockets.emit('timer', { countdown });
      }, 1000)
      
      GAME_HAS_STARTED = true;
    }
  })
});
