import 'dotenv/config'
import './database/connectdb.js'
import express from 'express';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const whiteList = [process.env.ORIGIN1]

// Config
app.set('port', process.env.DB_PORT || 5000)

app.use(cors({
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) return callback(null, origin)
        return callback("Error de CORS origin: " + origin + " no autorizado!")
    }
}))


app.use(express.static('public'))
app.use(cookieParser());
app.use(express.json())

// Routes
app.use('/', authRouter)

// Initialization
const PORT = app.get('port');
app.listen(PORT, console.log(`Server running on port ${PORT}`))

export default app;