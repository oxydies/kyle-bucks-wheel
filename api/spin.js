import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  try {
    const players = await kv.get('players') || {};
    const prizes = await kv.get('prizes') || [];
    
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
    await kv.set('players', players);
    
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
      error: 'Failed to spin' 
    });
  }
}
