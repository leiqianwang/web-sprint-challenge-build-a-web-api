/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Pull your server into this file and start it!
*/

// const server = require('./server');

// const PORT = process.env.PORT || 9000;

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const server = require('./server'); // Import your server instance from server.js

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


