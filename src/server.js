const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3005;
const uuid = require('uuid/v4');

app.use(express.static(__dirname));
http.listen(PORT, () => console.log('listening on PORT ' + PORT));

let GAME_HAS_STARTED = false;
let cycle = 0;
let users = [];
<<<<<<< HEAD
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
let roles = ['Chasseur', 'Petite fille', 'Cupidon', 'Voyante', 'Sorcière'];
=======
let votes = [];
let shouldKill = [];
let roles = ['Petite fille', 'Chasseur', 'Cupidon'];

>>>>>>> new
const offset = roles.filter(role => role !== 'Loup' && role !== 'Villageois').length;
const wolf = 'Loup';
const villager = 'Villageois';

const getIdOnRole = (role) => users.filter(user => user.role === role).map(x => x.id);
const setVote = (from, against, callback) => {
  const hasAlreadyVoted = votes.find(vote => vote.from === from);  

  //Si la personne a déjà votée contre qqun
  if(hasAlreadyVoted) {
    //On actualise son vote    
    hasAlreadyVoted.against = against;     
  } else {
    //Sinon on lui rajoute une voix contre
    votes.push({from, against});
  }
  

  //TODO: Mapper le tableau votes sur shoudKill pour garder une update
  const beenVoted = shouldKill.find(person => person.toKill === against);
  if(beenVoted) {
    //Si la personne a déjà été votée, on lui ajoute un vote         
    return beenVoted.count += 1;
  }
  //Sinon on l'ajoute a la liste dispatchée en front
  shouldKill.push({toKill: against, count: 1})  

  //Callback
  callback();
}
const setWeather = (cycle) => (cycle % 2 === 0) ? 'night' : 'day';


io.on('connection', (socket) => {
  socket.on('disconnect', () => {    
    users = users.filter(u => u.id !== socket.id);    
    socket.broadcast.emit('users', users);
  });

  /**
   * LOGIN
   */  
  socket.on('login', (data) => {    
    // If user is already connected    
    if (users.some(user => user.username === data.username)) {
      socket.emit('usernameTaken', 'Cet utilisateur existe déjà');
    } else {      
      const user = {
        id: socket.id,
        username: data.username,
        isMaster: !users.length ? true : false,
        isDead: false
      }

      users.push(user);    

      socket.emit('user', user);
      socket.emit('users', users);
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

  socket.on('messageSentToWolves', payload => {
    const { name, message } = payload;
    io.emit('messageToWolves', {
      from: name,
      message,
      at: new Date()   
    })
  });

  /**
   * GAME STARTED
   */
  let turnTime = 1;
  let countdown = turnTime * 60;
  socket.on('startGame', (payload) => {     
    const availableWolvesOrVillagers = users.length - offset;
    const maxWolves = (availableWolvesOrVillagers % 2 === 0) ? availableWolvesOrVillagers / 2 : (availableWolvesOrVillagers / 2) + .5;
    const maxVillagers = (availableWolvesOrVillagers % 2 === 0) ? availableWolvesOrVillagers / 2 : (availableWolvesOrVillagers / 2) - .5;

    for (let i = 0; i < maxWolves; i++) {
      roles.push(wolf);
    }
    for (let j = 0; j < maxVillagers; j++) {
      roles.push(villager);
    }

    users.forEach(user => {  
      const index = Math.floor(Math.random() * roles.length);
      user.role = roles[index];
      roles.splice(index, 1);
    });    
    
    //Dispatch les roles en front (attente socket.to() method)
    socket.broadcast.emit('role', users);
    socket.broadcast.emit('users', users);

    if(!GAME_HAS_STARTED) {
      //Send that its nighty/sunny      
      io.emit('weather', setWeather(cycle));

      setInterval(() => {
        countdown--;
        socket.broadcast.emit('timer', { countdown });

        //Turn has ended, we kill the guy !
        if (countdown === 0) {
          //New cycle
          cycle += 1;
          io.emit('weather', setWeather(cycle));
          //Reset countdown;
          countdown = turnTime * 60;
          shouldKill.sort((a, b) => a.count < b.count);
          const killedPlayer = shouldKill[0].toKill;
          users.map( user => {
            if (user.username === killedPlayer) {
              user.isDead = true;
            }
          });

          //Dispatch updated user
          //Still need socket.to() method
          //So we notify that localStorage needs to be update
          io.emit('users', {
            users,
            updateLocalStorage: true
          });
        }
      }, 1000)

      GAME_HAS_STARTED = true;
    }
  })


  socket.on('vote', (payload) => {    
    const { from, against } = payload;

    //Set un vote contre qqun, callback sur un message dans le chat;
    setVote(from, against, () => {
      io.emit('message', {
        from: '🤖 ',
        message: `${from} à voté contre ${against}`,
        at: new Date()
      })
    });

    //Synchrone, mise à jour des votes après le dispatch du message
    io.emit('votes', shouldKill);
  });
});