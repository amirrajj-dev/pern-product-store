import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/product.route.js'
import {sql} from './utils/db.js'
import { aj } from './utils/arcjet.js'
import path from 'path'

const app = express()
dotenv.config()

const port = process.env.PORT
const dirname = path.resolve()

app.use(helmet({
    contentSecurityPolicy : false
}))  //Helmet is a middleware that helps secure Express apps by setting various HTTP headers.
app.use(morgan("dev")) // log the request to the console
app.use(express.json())
app.use(cors({
    credentials: true, // enable cookies
    origin : process.env.FRONTEND_URL || 'http://localhost:5173'
}))

app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: 'Too many requests, please try again later', success: false });
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({ message: 'You are a bot, access denied', success: false });
            }
            return res.status(401).json({ message: 'Invalid credentials', success: false });
        }

        // Check for spoofed bots
        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            return res.status(403).json({ message: 'Spoofed bot detected, access denied' });
        }

        next(); // Proceed only if request is allowed
    } catch (error) {
        console.error('Error in Arcjet protection:', error);
        res.status(500).json({ message: 'Server error', success: false });
    }
});
  
app.use('/api/products' , productRoutes)

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(dirname, '/frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(dirname, '/frontend/dist/index.html'))
    })
}


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