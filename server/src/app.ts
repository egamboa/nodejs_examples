import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import healthRouter from './routes/health'
import authRouter from './routes/auth.routes'
import pokemonRoutes from './routes/pokemon.routes'

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/health', healthRouter)

app.use('/auth', authRouter)

app.use('/pokemon', pokemonRoutes)

app.use('/', (req, res) => {
  res.send("Hello I'm the example API")
})

export default app
