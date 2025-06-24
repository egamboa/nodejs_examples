import dotenv from 'dotenv'
dotenv.config()

import { sequelize } from './src/config/db'
import { redis } from './src/config/redis'
import app from './src/app'

const PORT = process.env.PORT || 4000

async function startServer() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    console.log('✅ PostgreSQL connected')

    console.log('✅ Redis connected', redis.status)

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('❌ Startup Error:', err)
    process.exit(1)
  }
}

startServer()
