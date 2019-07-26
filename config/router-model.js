const axios = require('axios');
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretWord = require('./secrets')




module.exports = {
    register,
    getUser,
    login
}

function register (data) {
    const {username, password} = data;
    const hash = bcrypt.hashSync(data.password, 12)
    data.password = hash;
  return db('users').insert(data);
}

function getUser(filter){
    return db('users')
    .first()
    .where(filter)
    .then(user =>{
        if(user){
            return user;
        }else{
            return null;
        }
    });
}
  
  function login(data) {
    // implement user login

    const {username , password} = data;
    
    return getUser({username})
        .then(user =>{
            
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user)
                console.log(token)
                return token;
            }else{
                return null
            }
        })
  }





  function generateToken(user){
    const jwtPayload = {
        subject: user.id,
        username:user.username,
    }

    const jwtOptions = {
        expiresIn:"1d"
    }
    return jwt.sign(jwtPayload, secretWord.jwtSecret, jwtOptions)
}


  