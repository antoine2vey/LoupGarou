const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3005;

app.use(express.static(__dirname));
http.listen(PORT, () => console.log('listening on PORT ' + PORT));

//Total user at the start
let users = [];
let totalUsers = users.length;
//All roles are defined here 
let roles = ['Loup', 'Villageois', 'Chasseur', 'Petite fille', 'Cupidon' ];
//Get availables length roles to define how much wolves/villagers
const offset = roles.filter(role => role !== 'Loup' && role !== 'Villageois').length;

const AVAILABLE_WOLVES_OR_VILLAGER = totalUsers - offset;
const MAX_WOLVES = (AVAILABLE_WOLVES_OR_VILLAGER % 2 === 0) ? AVAILABLE_WOLVES_OR_VILLAGER/2 : (AVAILABLE_WOLVES_OR_VILLAGER/2)+.5;
const MAX_VILLAGERS = (AVAILABLE_WOLVES_OR_VILLAGER % 2 === 0) ? AVAILABLE_WOLVES_OR_VILLAGER/2 : (AVAILABLE_WOLVES_OR_VILLAGER/2)-.5;

const getRandomRole = () => {
  const randomRole = Math.floor(Math.random() * roles.length);
  return roles[randomRole];
}

console.log(`Max wolves possible : ${MAX_WOLVES}`);
console.log(`Max villagers possible: ${MAX_VILLAGERS}`);
console.log(`Assigned role is ${getRandomRole()}`)
if((MAX_WOLVES + MAX_VILLAGERS + offset) == totalUsers) {
  console.log('👌  Algorithm is correct')
}


io.on('connection', (client) => {
  client.on('login', (data) => {    
    if(users.some(user => user.username === data.username)) {      
      client.emit('usernameTaken', 'Name already taken');
    } else {
      users.push({
        id: client.id,
        username: data.username,
        role: getRandomRole()
      });

      console.log(users);
    }
  })
})