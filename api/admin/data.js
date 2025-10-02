import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    const prizes = await kv.get('prizes') || [];
    const players = await kv.get('players') || {};
    
    res.status(200).json({ prizes, players });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
