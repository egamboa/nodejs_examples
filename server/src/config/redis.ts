import Redis from 'ioredis'

export const redis = new Redis(
  process.env.REDIS_URL || 'redis://localhost:6379',
)

redis.on('ready', () => {
  console.log('🔵 Redis connection is ready')
})

redis.on('error', (error) => {
  console.error('❌ Redis connection error:', error)
})

redis.on('close', () => {
  console.log('⚠️ Redis connection closed')
})

redis.on('reconnecting', () => {
  console.log('🔄 Redis reconnecting...')
})
