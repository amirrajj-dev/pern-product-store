import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const port = process.env.PORT

app.use(helmet())  //Helmet is a middleware that helps secure Express apps by setting various HTTP headers.
app.use(morgan("dev")) // log the request to the console
app.use(express.json())
app.use(cors({
    credentials: true, // enable cookies
}))

app.listen(port , ()=>{
    console.log(`Server is running on port ${port} 🐘🩶`)
})