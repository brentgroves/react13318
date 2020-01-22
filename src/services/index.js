
import * as types from '../constants/ActionTypes'
import { rcvDS13318, rcvKep13318, isAuthenticated,isAdmin,updateFirstName,setServices } from '../actions'
import {setSAGA} from '../sagas'
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client')
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');

//const io = require('socket.io-client');
//const feathers = require('@feathersjs/feathers');
//const socketio = require('@feathersjs/socketio-client');
//import feathers from '@feathersjs/client';
//import client from '../feathers';
/*
const setupSocket = (dispatch, username) => {
  const socket = new WebSocket('ws://localhost:8989')
  socket.onopen = () => {
    socket.send(JSON.stringify({
      type: types.ADD_USER,
      name: username
    }))
  }
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author))
        break
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users))
        break
      default:
        break
    }
  }

  return socket
}
*/

/*
const socket = io(config.BPGServicesURI);
const client = feathers();

client.configure(feathers.socketio(socket));
client.configure(feathers.authentication({
  storage: window.localStorage
}));
*/

const setupServices = async (dispatch) => {
  //const socket = new WebSocket('ws://localhost:8989')

  const socket = io('http://localhost:3030');
  const srv = feathers();

  // Setup the transport (Rest, Socket, etc.) here
  srv.configure(socketio(socket));

  // Available options are listed in the "Options" section
  srv.configure(auth({
    storageKey: 'auth'
  }))
/*
  await srv.service('users')
    .create({
      "email": "user4@buschegroup.com",
      "password": "JesusLives1!",
      "userName": "Brent",
      "isAdmin": true,
      "roles": [ "Admin", "Manager", "Quality"]


  }).then(async (res) => {
    // Logged in
    //const { user } = await srv.get('authentication');
console.log('created user!')
//    console.log(res.user.isAdmin);
  //  console.log(res.user.userName);
    // Gets the authenticated accessToken (JWT)
    //const { accessToken } = await app.get('authentication');
  //  dispatch(addUserName(res.user.userName))
  //  dispatch(isAdmin(true));
  //  dispatch(isAuthenticated(true));
  }).catch(e => {
    // Show login page (potentially with `e.message`)
    console.error('Authentication error', e);
  });
*/
/*
await srv.authenticate({
"strategy": "local",
"email": "user4@buschegroup.com",
"password": "JesusLives1!"
}).then(async (res) => {
  // Logged in
  //const { user } = await srv.get('authentication');

  console.log(res.user.isAdmin);
  console.log(res.user.userName);
  // Gets the authenticated accessToken (JWT)
  //const { accessToken } = await app.get('authentication');
//  dispatch(addUserName(res.user.userName))
  dispatch(isAdmin(res.user.isAdmin));
  dispatch(updateFirstName(res.user.userName))
  dispatch(isAuthenticated(true));
  dispatch(setServices(srv));
}).catch(e => {
  // Show login page (potentially with `e.message`)
  console.error('Authentication error', e);
});
*/
/*

await srv.reAuthenticate().then(() => {
  dispatch(isAuthenticated(true));
}).catch(() => {
  dispatch(isAuthenticated(false));
});
*/

console.log('connecting to Kep13318');
  const Kep13318Service = srv.service('Kep13318');
  Kep13318Service.on('created', message => {
    console.log('Received a Kep13318 message', message);
    dispatch(rcvKep13318(message.text));
  });
  const Sproc13318Service = srv.service('Sproc13318');
  Sproc13318Service.on('created', message => {
    console.log('Received a Sproc13318 message');
    console.log(`message=> ${message.text[0].TransDate}`)
      dispatch(rcvDS13318(message.text));

  //  const p = JSON.parse(message.text.toString()); // payload is a buffer
//    dispatch(messageReceived(message.text, 'Sproc13313'));
//    dispatch(addDS13318(message.text));
  });
  setSAGA(srv,dispatch);
  dispatch(setServices(srv));


//await srv.logout().then(dispatch(isAuthenticated(false)));
 // dispatch(isAdmin(true));
  //dispatch(addApp(srv));


  /*
  socket.onopen = () => {
    socket.send(JSON.stringify({
      type: types.ADD_USER,
      name: username
    }))
  }
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author))
        break
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users))
        break
      default:
        break
    }
  }
  */

  return srv
}

export default setupServices