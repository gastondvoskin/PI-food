const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {     // tono: true si necesito cambiar mucho 
  console.log("Connected to DB");
  server.listen(3001, () => {
    console.log('Listening on port 3001'); // eslint-disable-line no-console
  });
});


