import Redis from 'ioredis';

let redis;

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL);
  }
  return redis;
}

export default async function handler(req, res) {
  const { name } = req.query;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  try {
    const client = getRedis();
    
    const playersJson = await client.get('players');
    const players = playersJson ? JSON.parse(playersJson) : {};
    
    if (players[name] === undefined) {
      return res.status(200).json({ exists: false });
    }
    
    res.status(200).json({ 
      exists: true, 
      balance: players[name] 
    });
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ error: 'Failed to fetch player', details: error.message });
  }
}
