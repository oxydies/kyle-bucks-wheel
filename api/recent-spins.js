import Redis from 'ioredis';

let redis;

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL);
  }
  return redis;
}

export default async function handler(req, res) {
  try {
    const client = getRedis();
    
    // Get recent spins from Redis (stored as JSON array)
    const spinsJson = await client.get('recent_spins');
    const spins = spinsJson ? JSON.parse(spinsJson) : [];
    
    // Return last 10 spins
    const recentSpins = spins.slice(0, 10);
    
    res.status(200).json({ spins: recentSpins });
  } catch (error) {
    console.error('Error fetching recent spins:', error);
    res.status(500).json({ error: 'Failed to fetch recent spins', spins: [] });
  }
}
