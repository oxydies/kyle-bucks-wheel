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
  
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  try {
    const client = getRedis();
    
    const playersJson = await client.get('players');
    const players = playersJson ? JSON.parse(playersJson) : {};
    
    const prizesJson = await client.get('prizes');
    const prizes = prizesJson ? JSON.parse(prizesJson) : [];
    
    // Check if player exists and has enough balance
    if (players[name] === undefined) {
      return res.status(400).json({ 
        success: false, 
        error: 'Player not found' 
      });
    }
    
    if (players[name] < 20) {
      return res.status(400).json({ 
        success: false, 
        error: 'Not enough Kyle Bucks!' 
      });
    }
    
    // Deduct 20 Kyle Bucks
    players[name] -= 20;
    await client.set('players', JSON.stringify(players));
    
    // Pick a random prize
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[prizeIndex];
    
    res.status(200).json({ 
      success: true,
      prize,
      prizeIndex,
      newBalance: players[name]
    });
  } catch (error) {
    console.error('Error spinning:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to spin',
      details: error.message
    });
  }
}
