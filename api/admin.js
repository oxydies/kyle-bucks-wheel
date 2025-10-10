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
  
  const { action, password, prizes, players, index } = req.body;
  
  try {
    const client = getRedis();
    
    // Handle different admin actions
    switch(action) {
      case 'login':
        const ADMIN_PASSWORD = 'kylebucks2025';
        if (password === ADMIN_PASSWORD) {
          res.status(200).json({ success: true });
        } else {
          res.status(401).json({ success: false });
        }
        break;
        
      case 'getData':
        const prizesJson = await client.get('prizes');
        const storedPrizes = prizesJson ? JSON.parse(prizesJson) : [];
        const playersJson = await client.get('players');
        const storedPlayers = playersJson ? JSON.parse(playersJson) : {};
        res.status(200).json({ prizes: storedPrizes, players: storedPlayers });
        break;
        
      case 'savePrizes':
        if (!prizes || !Array.isArray(prizes)) {
          return res.status(400).json({ error: 'Invalid prizes data' });
        }
        await client.set('prizes', JSON.stringify(prizes));
        res.status(200).json({ success: true });
        break;
        
      case 'savePlayers':
        if (!players || typeof players !== 'object') {
          return res.status(400).json({ error: 'Invalid players data' });
        }
        await client.set('players', JSON.stringify(players));
        res.status(200).json({ success: true });
        break;
        
      case 'deleteSpin':
        if (index === undefined || index === null) {
          return res.status(400).json({ error: 'Index is required' });
        }
        const spinsJson = await client.get('recent_spins');
        const spins = spinsJson ? JSON.parse(spinsJson) : [];
        if (index >= 0 && index < spins.length) {
          spins.splice(index, 1);
          await client.set('recent_spins', JSON.stringify(spins));
          res.status(200).json({ success: true });
        } else {
          res.status(400).json({ success: false, error: 'Invalid index' });
        }
        break;
        
      case 'clearSpins':
        await client.set('recent_spins', JSON.stringify([]));
        res.status(200).json({ success: true });
        break;
        
      default:
        res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Admin API error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error',
      details: error.message
    });
  }
}
