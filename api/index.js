const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {     // tono: in the future, change to false 
  console.log("Connected to DB");
  server.listen(3001, () => {
    console.log('Listening on port 3001'); // eslint-disable-line no-console
  });
});


