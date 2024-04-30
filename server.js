const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(' UNCAUGHT EXCEPTION! 💥 shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
dbConnect();

async function dbConnect() {
  await mongoose.connect(DB);
  console.log('DB connection successful');
}

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     newCreateIndex: true,
//     useFindIndexMethod: false,
//   })
//   .then(con => {
//     console.log(con.connections);
//     console.log('DB connection successful');
//   });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLER REJECTION! 💥 shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
