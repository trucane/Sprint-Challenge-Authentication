const axios = require('axios');
const { authenticate } = require('../auth/authenticate');
const Users = require('./router-model')
const db = require('../database/dbConfig');

const express = require('express');
const router = express.Router();
router.use(express.json());

// module.exports = server => {
//   server.post('/api/register', register);
//   server.post('/api/login', login);
//   server.get('/api/jokes', authenticate, getJokes);
// };

router.post( '/register', async (req, res) =>{
  const {username, password} = req.body;

  if(!username || !password){
    res.status(400).json({message:"Please provide a username and password"})
  }else{
    
    try{
      const [id] = await Users.register(req.body);
      const user = await Users.getUser({id})
      res.status(201).json(user)
      
    }catch(error){ 
      res.status(500).json({message:"no register"})
    }
  }
});


router.post('/login', async (req, res) =>{
  const {username, password} = req.body;
  if(!username || !password){
      res.status(206).json({message:"Missing name and/or password"})
  }else{
      try{
          const user = await Users.login(req.body);
          if(user){
              res.status(201).json({message:"You have logged in"})
          }else{
              res.status(400).json({message:"invalid username and/or passowrds"})
          }
      }catch(error){
          res.status(500).json(error)
      }
  }
});


router.get('/jokes', authenticate, async (req, res) =>{
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});



module.exports = router;
