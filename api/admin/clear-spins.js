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
  
  try {
    const client = getRedis();
    
    // Clear all spins by setting empty array
    await client.set('recent_spins', JSON.stringify([]));
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error clearing spins:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to clear spins',
      details: error.message
    });
  }
}
