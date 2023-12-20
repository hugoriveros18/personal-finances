import express, { json } from "express"
import cors from 'cors'
import routerApi from "./routes/index.mjs"

// APP
const app = express()

// JSON MIDDLEWARE
app.use(json())

// CORS
const whitelist = ['http://localhost:3000']
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'))
    }
  }
}
app.use(cors(options))
// // CORS * ==> FOR ANY ORIGIN
// app.use(cors())

// APP ROUTES
routerApi(app)



const PORT = process.env.PORT ?? 1234;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
});
