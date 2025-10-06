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
    
    // Get the persistent total spin count
    const totalSpins = await client.get('total_spins_count');
    
    res.status(200).json({ 
      totalSpins: totalSpins ? parseInt(totalSpins) : 0 
    });
  } catch (error) {
    console.error('Error fetching total spins:', error);
    res.status(500).json({ error: 'Failed to fetch total spins', totalSpins: 0 });
  }
}
