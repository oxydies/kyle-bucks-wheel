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
    
    const prizesJson = await client.get('prizes');
    const prizes = prizesJson ? JSON.parse(prizesJson) : [];
    
    const playersJson = await client.get('players');
    const players = playersJson ? JSON.parse(playersJson) : {};
    
    res.status(200).json({ prizes, players });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
}
