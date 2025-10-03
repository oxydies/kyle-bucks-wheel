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
  
  const { index } = req.body;
  
  if (index === undefined || index === null) {
    return res.status(400).json({ error: 'Index is required' });
  }
  
  try {
    const client = getRedis();
    
    const spinsJson = await client.get('recent_spins');
    const spins = spinsJson ? JSON.parse(spinsJson) : [];
    
    // Remove the spin at the specified index
    if (index >= 0 && index < spins.length) {
      spins.splice(index, 1);
      await client.set('recent_spins', JSON.stringify(spins));
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: 'Invalid index' });
    }
  } catch (error) {
    console.error('Error deleting spin:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete spin',
      details: error.message
    });
  }
}
