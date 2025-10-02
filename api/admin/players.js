import Redis from 'ioredis';

let redis;

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL);
  }
  return redis;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { players } = req.body;
  
  if (!players || typeof players !== 'object') {
    return res.status(400).json({ error: 'Invalid players data' });
  }
  
  try {
    const client = getRedis();
    await client.set('players', JSON.stringify(players));
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving players:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save players',
      details: error.message
    });
  }
}
