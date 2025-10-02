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
  
  const { prizes } = req.body;
  
  if (!prizes || !Array.isArray(prizes)) {
    return res.status(400).json({ error: 'Invalid prizes data' });
  }
  
  try {
    const client = getRedis();
    await client.set('prizes', JSON.stringify(prizes));
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving prizes:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save prizes',
      details: error.message
    });
  }
}
