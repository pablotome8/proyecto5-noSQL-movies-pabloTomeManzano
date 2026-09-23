const express = require('express'); 
const { connect } = require('./utils/db'); 

connect(); 

const PORT = 3000; 
const server = express(); 

server.use(express.json()); 
server.use(express.urlencoded({ extended: true })); 

const movieRoutes = require('./routes/movie.routes'); 
const cinemaRoutes = require('./routes/cinema.routes'); 

server.use('/movies', movieRoutes); 
server.use('/cinemas', cinemaRoutes); 

server.listen(PORT, () => { 
  console.log(`Server running in http://localhost:${PORT}`); 
});