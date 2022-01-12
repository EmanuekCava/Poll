import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

dotenv.config()
const app = express()
import './data/database/database'

app.set('port', process.env.PORT || 6000)

import pollRouter from './router/poll.routes'
import userRouter from './router/user.routes'

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(pollRouter)
app.use(userRouter)

app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
})
