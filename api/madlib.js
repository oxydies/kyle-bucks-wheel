import Redis from 'ioredis';

let redis;

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL);
  }
  return redis;
}

// 30+ madlib story templates
const storyTemplates = [
  {
    prompts: ['adjective', 'noun', 'verb (past tense)', 'place', 'food', 'number'],
    story: (words) => `Once upon a time, Kyle ${words[2]} into a ${words[0]} ${words[1]} at ${words[3]}. He discovered ${words[5]} pieces of ${words[4]} and decided to start the Kyle Bucks empire. The rest is history.`
  },
  {
    prompts: ['adjective', 'body part', 'verb', 'animal', 'liquid', 'celebrity'],
    story: (words) => `Today at work, I saw ${words[5]} ${words[2]} with a ${words[0]} ${words[3]}. They spilled ${words[4]} all over their ${words[1]} and blamed it on the Kyle Bucks system. Classic Monday.`
  },
  {
    prompts: ['emotion', 'verb ending in -ing', 'object', 'place', 'sound', 'adjective'],
    story: (words) => `I felt ${words[0]} while ${words[1]} my ${words[2]} in the ${words[3]}. Suddenly, I heard a ${words[4]} sound and realized I had earned a ${words[5]} amount of Kyle Bucks!`
  },
  {
    prompts: ['adjective', 'verb', 'tool', 'food', 'number', 'body part'],
    story: (words) => `The ${words[0]} quest for Kyle Bucks began when I tried to ${words[1]} a ${words[2]}. After ${words[4]} attempts, I accidentally hit my ${words[5]} and won ${words[3]}. Worth it.`
  },
  {
    prompts: ['color', 'animal', 'verb ending in -ing', 'noun', 'adjective', 'vehicle'],
    story: (words) => `A ${words[0]} ${words[1]} came ${words[2]} through the office carrying a ${words[4]} ${words[3]}. It was riding a ${words[5]} and distributing Kyle Bucks to the worthy.`
  },
  {
    prompts: ['adjective', 'profession', 'action', 'object', 'place', 'exclamation'],
    story: (words) => `I met a ${words[0]} ${words[1]} who taught me to ${words[2]} with a ${words[3]} at ${words[4]}. "${words[5]}!" they shouted. "This is how you earn Kyle Bucks!" I was enlightened.`
  },
  {
    prompts: ['adjective', 'number', 'verb', 'food', 'time of day', 'emotion'],
    story: (words) => `At ${words[4]}, I had a ${words[0]} idea: ${words[2]} exactly ${words[1]} pieces of ${words[3]}. I felt ${words[5]} when it somehow earned me Kyle Bucks. Don't ask questions.`
  },
  {
    prompts: ['verb ending in -ing', 'adjective', 'animal', 'object', 'place', 'sound'],
    story: (words) => `While ${words[0]} through ${words[4]}, I encountered a ${words[1]} ${words[2]} holding a ${words[3]}. It made a "${words[5]}" noise and granted me Kyle Bucks. This is my life now.`
  },
  {
    prompts: ['adjective', 'liquid', 'verb', 'celebrity', 'object', 'number'],
    story: (words) => `Kyle's ${words[0]} plan involved ${words[1]}, ${words[3]}, and a ${words[4]}. We were supposed to ${words[2]} it ${words[5]} times but nobody understood the assignment.`
  },
  {
    prompts: ['weather', 'emotion', 'verb', 'object', 'adjective', 'location'],
    story: (words) => `On a ${words[0]} day, I felt ${words[1]} so I decided to ${words[2]} my ${words[3]} at ${words[5]}. The ${words[4]} result? Kyle Bucks appeared out of nowhere.`
  },
  {
    prompts: ['adjective', 'verb ending in -ing', 'noun', 'number', 'body part', 'exclamation'],
    story: (words) => `The ${words[0]} adventure started with ${words[1]} a ${words[2]}. After ${words[3]} tries, I injured my ${words[4]} and yelled "${words[5]}!" Kyle appeared and gave me consolation bucks.`
  },
  {
    prompts: ['type of dance', 'adjective', 'food', 'mythical creature', 'verb', 'time period'],
    story: (words) => `In ${words[5]}, people earned Kyle Bucks by doing the ${words[0]} while holding ${words[1]} ${words[2]}. A ${words[3]} would appear and ${words[4]} in approval. Those were simpler times.`
  },
  {
    prompts: ['adjective', 'office supply', 'verb', 'number', 'sound', 'celebrity'],
    story: (words) => `Legend says if you ${words[2]} a ${words[0]} ${words[1]} ${words[3]} times while making a "${words[4]}" sound, ${words[5]} will appear with Kyle Bucks. I tried. It didn't work. I'm embarrassed.`
  },
  {
    prompts: ['emotion', 'verb ending in -ing', 'article of clothing', 'place', 'adjective', 'object'],
    story: (words) => `Feeling ${words[0]}, I started ${words[1]} in my ${words[2]} around ${words[3]}. A ${words[4]} ${words[5]} fell from the sky with a note: "From Kyle, with confusion."`
  },
  {
    prompts: ['adjective', 'musical instrument', 'verb', 'animal', 'food', 'number'],
    story: (words) => `The ${words[0]} prophecy foretold: "One who can ${words[2]} a ${words[1]} while riding a ${words[3]} and eating ${words[4]} shall receive ${words[5]} Kyle Bucks." I'm not that coordinated.`
  },
  {
    prompts: ['verb', 'adjective', 'household item', 'emotion', 'color', 'place'],
    story: (words) => `I tried to ${words[0]} a ${words[1]} ${words[2]} but felt ${words[3]} about it. The ${words[4]} vibes at ${words[5]} were off. Kyle sensed my struggle and awarded me sympathy bucks.`
  },
  {
    prompts: ['adjective', 'verb ending in -ing', 'technology', 'number', 'body part', 'object'],
    story: (words) => `My ${words[0]} plan: ${words[1]} with a ${words[2]} ${words[3]} times using only my ${words[4]} and a ${words[5]}. It failed spectacularly, but Kyle appreciated the effort.`
  },
  {
    prompts: ['type of weather', 'adjective', 'verb', 'animal', 'office location', 'emotion'],
    story: (words) => `During ${words[0]}, a ${words[1]} ${words[3]} decided to ${words[2]} in the ${words[4]}. Everyone felt ${words[5]}. Kyle declared it "Kyle Buck worthy" and we all got points.`
  },
  {
    prompts: ['adjective', 'superhero', 'verb', 'object', 'number', 'food'],
    story: (words) => `${words[1]} told me the ${words[0]} secret to Kyle Bucks: ${words[2]} a ${words[3]} exactly ${words[4]} times while thinking about ${words[5]}. I'm still waiting for my bucks.`
  },
  {
    prompts: ['verb ending in -ing', 'adjective', 'piece of furniture', 'liquid', 'sound', 'place'],
    story: (words) => `Corporate policy requires ${words[0]} on a ${words[1]} ${words[2]} while drinking ${words[3]} and making "${words[4]}" sounds at ${words[5]}. This somehow relates to Kyle Bucks. Don't ask me how.`
  },
  {
    prompts: ['adjective', 'verb', 'electronic device', 'celebrity', 'number', 'exclamation'],
    story: (words) => `Step 1: ${words[1]} your ${words[0]} ${words[2]}. Step 2: Call ${words[3]}. Step 3: Wait ${words[4]} days. Step 4: "${words[5]}!" - you now have Kyle Bucks (results may vary).`
  },
  {
    prompts: ['emotion', 'action', 'office supply', 'adjective', 'location', 'object'],
    story: (words) => `I felt ${words[0]} when I caught someone ${words[1]} with my ${words[2]} in the ${words[4]}. They claimed it was a ${words[3]} ${words[5]} Kyle gave them. I'm choosing to believe this.`
  },
  {
    prompts: ['adjective', 'type of food', 'verb', 'number', 'day of week', 'emotion'],
    story: (words) => `Every ${words[4]}, we gather for the ${words[0]} ritual: ${words[2]} ${words[1]} ${words[3]} times. Those who complete it feel ${words[5]} and receive Kyle's blessing (and bucks).`
  },
  {
    prompts: ['verb ending in -ing', 'adjective', 'animal', 'object', 'place', 'sound'],
    story: (words) => `The ancient art of ${words[0]} requires a ${words[1]} ${words[2]}, a ${words[3]}, and access to ${words[4]}. Make a "${words[5]}" sound and Kyle Bucks will rain down. Probably.`
  },
  {
    prompts: ['adjective', 'verb', 'type of plant', 'number', 'emotion', 'mythical creature'],
    story: (words) => `In my ${words[0]} dream, I had to ${words[1]} a ${words[2]} ${words[3]} times while feeling ${words[4]}. A ${words[5]} appeared and said "Kyle approves." I woke up with actual Kyle Bucks somehow.`
  },
  {
    prompts: ['adjective', 'office equipment', 'verb', 'liquid', 'place', 'number'],
    story: (words) => `The ${words[0]} incident at ${words[4]} involved a ${words[1]}, ${words[3]}, and ${words[5]} very confused people. We tried to ${words[2]} the situation. Kyle just laughed and threw bucks at us.`
  },
  {
    prompts: ['type of music', 'adjective', 'verb', 'food', 'celebrity', 'object'],
    story: (words) => `Kyle's mixtape of ${words[0]} was so ${words[1]} that it made me ${words[2]} my ${words[3]}. ${words[4]} called it "art." I call it grounds for more bucks. Also, there was a ${words[5]} involved somehow.`
  },
  {
    prompts: ['adjective', 'verb ending in -ing', 'animal', 'color', 'object', 'place'],
    story: (words) => `The ${words[0]} tradition of ${words[1]} with a ${words[3]} ${words[2]} while holding a ${words[4]} at ${words[5]} is how our ancestors earned Kyle Bucks. We honor them by continuing this nonsense.`
  },
  {
    prompts: ['emotion', 'verb', 'technology', 'number', 'adjective', 'food'],
    story: (words) => `I felt ${words[0]} when Kyle asked me to ${words[1]} his ${words[2]} ${words[3]} times. The ${words[4]} reward? ${words[5]}. I mean, also Kyle Bucks, but mostly ${words[5]}.`
  },
  {
    prompts: ['adjective', 'action', 'object', 'place', 'sound', 'number'],
    story: (words) => `At the ${words[0]} meeting in ${words[3]}, someone tried to ${words[1]} a ${words[2]}. It made a "${words[4]}" noise ${words[5]} times before Kyle intervened with emergency bucks.`
  },
  {
    prompts: ['type of movie', 'adjective', 'verb', 'object', 'celebrity', 'emotion'],
    story: (words) => `If Kyle Bucks were a ${words[0]} movie, it would be ${words[1]}, starring ${words[4]}, who must ${words[2]} a ${words[3]} while feeling ${words[5]}. Critics give it 5 stars.`
  }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { name, words } = req.body;
  
  if (!name || !words || !Array.isArray(words)) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  
  try {
    const client = getRedis();
    
    // Check player balance
    const playersJson = await client.get('players');
    const players = playersJson ? JSON.parse(playersJson) : {};
    
    if (players[name] === undefined) {
      return res.status(400).json({ 
        success: false, 
        error: 'Player not found' 
      });
    }
    
    if (players[name] < 10) {
      return res.status(400).json({ 
        success: false, 
        error: 'Not enough Kyle Bucks! Need 10 to play.' 
      });
    }
    
    // Deduct 10 Kyle Bucks
    players[name] -= 10;
    await client.set('players', JSON.stringify(players));
    
    // Pick a random story template
    const template = storyTemplates[Math.floor(Math.random() * storyTemplates.length)];
    
    // Generate the story with their words
    const story = template.story(words);
    
    res.status(200).json({ 
      success: true,
      story,
      newBalance: players[name]
    });
  } catch (error) {
    console.error('Error playing madlib:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to play madlib',
      details: error.message
    });
  }
}
