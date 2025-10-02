import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { prizes } = req.body;
  
  if (!prizes || !Array.isArray(prizes)) {
    return res.status(400).json({ error: 'Invalid prizes data' });
  }
  
  try {
    await kv.set('prizes', prizes);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving prizes:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save prizes' 
    });
  }
}
