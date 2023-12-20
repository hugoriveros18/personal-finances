import express, { json } from "express"
import cors from 'cors'
import routerApi from "./routes/index.js"

// APP
const app = express()

// JSON MIDDLEWARE
app.use(json())

// CORS *
app.use(cors())

// APP ROUTES
routerApi(app)



const PORT = process.env.PORT ?? 1234;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
});
