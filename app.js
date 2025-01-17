// import express dan router
import express from 'express'
import dotenv from 'dotenv'
import router from './routes/api.js'

dotenv.config()

// destructing object process.env
const { APP_PORT } = process.env;

// membuat object express
const app = express();

// menggunakan middleware
app.use(express.json());

// menggunakan routing (router)
app.use(router);

// mendefinisikan port
app.listen(APP_PORT, () =>
  console.log(`Server running at: http://localhost:${APP_PORT}`)
);
