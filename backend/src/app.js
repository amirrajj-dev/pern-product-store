import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/product.route.js'
import {sql} from './utils/db.js'

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