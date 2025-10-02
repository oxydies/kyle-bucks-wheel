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
    
    // Get prizes from KV storage
    let prizesJson = await client.get('prizes');
    let prizes = prizesJson ? JSON.parse(prizesJson) : null;
    
    // If no prizes exist, initialize with defaults
    if (!prizes) {
      prizes = [
        "A high five from Kyle (redeemable never)",
        "One compliment (backhanded)",
        "The privilege of doing Kyle's dishes",
        "A participation trophy (imaginary)",
        "Nothing, but with enthusiasm!",
        "Kyle's leftover lunch (probably)",
        "A stern look of approval",
        "The title of 'Employee of the Minute'",
        "A pat on the back (aggressive)",
        "One (1) Kyle Buck back",
        "The burden of Kyle's respect",
        "A motivational speech (5 seconds)",
        "Kyle's secret recipe (it's toast)",
        "Honorary parking spot (doesn't exist)",
        "A personalized insult",
        "The responsibility of leadership",
        "Kyle's gym membership (unused)",
        "A firm handshake (too firm)",
        "The friends we made along the way",
        "Temporary bragging rights",
        "Kyle's wisdom (questionable)",
        "A certificate of adequacy",
        "The answer to life (it's 42)",
        "Kyle's Netflix password (changed)",
        "Eternal glory (lasts 5 minutes)"
      ];
      await client.set('prizes', JSON.stringify(prizes));
    }
    
    res.status(200).json({ prizes });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
}
