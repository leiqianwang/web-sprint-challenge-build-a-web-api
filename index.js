/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Pull your server into this file and start it!
*/

// const server = require('./api/server');

// const PORT = process.env.PORT || 9000;

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const server = require('./api/server'); // Import your server instance from server.js
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


