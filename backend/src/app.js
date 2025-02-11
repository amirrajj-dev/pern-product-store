import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/product.route.js'
import {sql} from './utils/db.js'
import { aj } from './utils/arcjet.js'

const app = express()
dotenv.config()

const port = process.env.PORT

app.use(helmet())  //Helmet is a middleware that helps secure Express apps by setting various HTTP headers.
app.use(morgan("dev")) // log the request to the console
app.use(express.json())
app.use(cors({
    credentials: true, // enable cookies
}))

app.use('/api/products' , productRoutes)

app.use(async (req, res , next) =>{
    const decision = await aj.protect(req , {
        requested : 1
    })

    if(decision.isDenied()){
       try {
        if (decision.reason.isRateLimit()){
            res.status(429).json({ message: 'Too many requests, please try again later', success: false })
            return
        }else if (decision.reason.isBot()){
            res.status(403).json({ message: 'You are a bot, please try again later' , success : false})
        }else{
            res.status(401).json({ message: 'Invalid credentials, please try again' , success : false})
        }
        //check for spoofed bots
      if (decision.results.some((result)=>result.reason.isBot() && result.reason.isSpoofed())){
        res.status(403).json({ message: 'You are a bot, please try again later'})
        return
      }
      next()
       } catch (error) {
        console.error('Error protecting the request:', error)
        next(error)
       }
    }
})

const initDb = async ()=>{
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            image VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
        console.log('Connected to the database!')
    } catch (error) {
        console.error('Error connecting to the database:', error)
        process.exit(1)
    }
}

initDb().then(()=>{
    app.listen(port , ()=>{
        console.log(`Server is running on port ${port} 🐘🩶`)
    })
})