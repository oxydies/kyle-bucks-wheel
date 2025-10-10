import Redis from 'ioredis';

let redis;

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL);
  }
  return redis;
}

// 40 completely verified madlib templates with variety
const storyTemplates = [
  // Office chaos stories
  {
    prompts: ['adjective', 'noun', 'verb (past tense)', 'place in office', 'food', 'number'],
    story: (words) => `The ${words[0]} incident happened when Kyle ${words[2]} a ${words[1]} in the ${words[3]}. There were ${words[5]} pieces of ${words[4]} everywhere. HR is still investigating.`
  },
  {
    prompts: ['emotion', 'verb ending in -ing', 'office supply', 'celebrity', 'adjective', 'liquid'],
    story: (words) => `I felt ${words[0]} while ${words[1]} with the ${words[2]}. ${words[3]} walked by and spilled ${words[4]} ${words[5]} on my desk. Just another day at the office.`
  },
  {
    prompts: ['adjective', 'body part', 'verb (past tense)', 'animal', 'number', 'place'],
    story: (words) => `My ${words[0]} ${words[1]} ${words[2]} when I saw a ${words[3]} in ${words[5]}. I counted to ${words[4]} and decided I deserved Kyle Bucks for witnessing this.`
  },
  {
    prompts: ['type of food', 'adjective', 'verb', 'coworker name', 'emotion', 'time of day'],
    story: (words) => `At ${words[5]}, I tried to ${words[2]} some ${words[0]}. It was too ${words[1]} and made ${words[3]} feel ${words[4]}. Kyle awarded me sympathy bucks.`
  },
  
  // Kyle origin stories
  {
    prompts: ['adjective', 'place', 'verb (past tense)', 'magical object', 'number', 'animal'],
    story: (words) => `Legend says Kyle discovered the Kyle Buck system in a ${words[0]} ${words[1]} where he ${words[2]} a ${words[3]}. ${words[4]} ${words[5]}s appeared and the rest is history.`
  },
  {
    prompts: ['verb', 'adjective', 'noun', 'celebrity', 'emotion', 'number'],
    story: (words) => `Kyle learned to ${words[0]} from ${words[3]} who gave him a ${words[1]} ${words[2]}. He felt ${words[4]} and created ${words[5]} Kyle Bucks on the spot.`
  },
  {
    prompts: ['adjective', 'type of weather', 'verb (past tense)', 'object', 'place', 'sound'],
    story: (words) => `On a ${words[0]}, ${words[1]} day, Kyle ${words[2]} a ${words[3]} at ${words[4]}. It made a "${words[5]}" noise and Kyle Bucks were born.`
  },
  
  // Absurd quests
  {
    prompts: ['adjective', 'animal', 'verb', 'object', 'number', 'place'],
    story: (words) => `The ${words[0]} ${words[1]} told me I must ${words[2]} a ${words[3]} ${words[4]} times at ${words[5]} to earn Kyle Bucks. I'm still working on it.`
  },
  {
    prompts: ['verb ending in -ing', 'adjective', 'furniture', 'liquid', 'emotion', 'number'],
    story: (words) => `My quest involved ${words[0]} on a ${words[1]} ${words[2]} while drinking ${words[3]}. I felt ${words[4]} after ${words[5]} attempts. Kyle said "close enough" and gave me bucks anyway.`
  },
  {
    prompts: ['color', 'verb', 'animal', 'object', 'adjective', 'place'],
    story: (words) => `To unlock Kyle Bucks, you must ${words[1]} a ${words[0]} ${words[2]} using only a ${words[4]} ${words[3]} while standing in ${words[5]}. I tried. I failed. I got bucks for trying.`
  },
  
  // Technology disasters
  {
    prompts: ['adjective', 'technology', 'verb (past tense)', 'number', 'emotion', 'exclamation'],
    story: (words) => `The ${words[0]} ${words[1]} ${words[2]} after ${words[3]} minutes. I felt ${words[4]} and yelled "${words[5]}!" Kyle appeared with consolation bucks.`
  },
  {
    prompts: ['verb', 'adjective', 'software', 'coworker name', 'object', 'time'],
    story: (words) => `I tried to ${words[0]} the ${words[1]} ${words[2]} at ${words[5]} but ${words[3]} was using the only ${words[4]}. Kyle witnessed my struggle and awarded bucks.`
  },
  {
    prompts: ['adjective', 'verb ending in -ing', 'electronic device', 'liquid', 'number', 'emotion'],
    story: (words) => `${words[1]} my ${words[0]} ${words[2]} seemed easy until I spilled ${words[3]} on it ${words[4]} times. Now I feel ${words[5]} but at least I have Kyle Bucks.`
  },
  
  // Food-related chaos
  {
    prompts: ['type of food', 'adjective', 'verb (past tense)', 'place', 'number', 'emotion'],
    story: (words) => `The ${words[0]} was so ${words[1]} that it ${words[2]} across the ${words[3]}. ${words[4]} people witnessed this. We all felt ${words[5]} and Kyle gave everyone bucks.`
  },
  {
    prompts: ['adjective', 'food', 'verb', 'animal', 'object', 'exclamation'],
    story: (words) => `I brought ${words[0]} ${words[1]} to the potluck. A ${words[3]} tried to ${words[2]} it with a ${words[4]}. "${words[5]}!" everyone shouted. Kyle awarded creativity bucks.`
  },
  {
    prompts: ['verb ending in -ing', 'type of food', 'adjective', 'number', 'body part', 'emotion'],
    story: (words) => `${words[0]} ${words[1]} is a ${words[2]} experience. I did it ${words[3]} times until my ${words[4]} hurt. I felt ${words[5]} but Kyle said it was buck-worthy.`
  },
  
  // Meeting madness
  {
    prompts: ['adjective', 'verb (past tense)', 'object', 'number', 'emotion', 'excuse'],
    story: (words) => `The ${words[0]} meeting went sideways when someone ${words[1]} their ${words[2]}. After ${words[3]} minutes of feeling ${words[4]}, I used "${words[5]}" as my excuse to leave. Kyle approved.`
  },
  {
    prompts: ['type of meeting', 'adjective', 'verb', 'animal', 'object', 'number'],
    story: (words) => `During the ${words[0]}, a ${words[1]} ${words[3]} tried to ${words[2]} the ${words[4]}. It happened ${words[5]} times before we gave up. Kyle rewarded us for perseverance.`
  },
  {
    prompts: ['verb ending in -ing', 'adjective', 'presentation topic', 'emotion', 'number', 'object'],
    story: (words) => `I was ${words[0]} about ${words[2]} when the ${words[1]} ${words[5]} stopped working. After ${words[4]} minutes of feeling ${words[3]}, Kyle rescued me with emergency bucks.`
  },
  
  // Supernatural office
  {
    prompts: ['mythical creature', 'adjective', 'verb (past tense)', 'object', 'place', 'sound'],
    story: (words) => `A ${words[1]} ${words[0]} ${words[2]} into ${words[4]} carrying a ${words[3]}. It made a "${words[5]}" sound and announced Kyle Buck distribution. Nobody questioned it.`
  },
  {
    prompts: ['magical power', 'adjective', 'verb', 'number', 'object', 'emotion'],
    story: (words) => `I discovered I have ${words[0]} which lets me ${words[2]} ${words[1]} ${words[4]}s ${words[3]} times. I felt ${words[5]} about this power. Kyle said "use it wisely" and gave me bucks.`
  },
  {
    prompts: ['supernatural event', 'adjective', 'place', 'object', 'number', 'verb (past tense)'],
    story: (words) => `The ${words[0]} occurred in the ${words[1]} ${words[2]}. A ${words[3]} ${words[5]} ${words[4]} times. Kyle declared it "a sign" and distributed bucks to all witnesses.`
  },
  
  // Time travel nonsense  
  {
    prompts: ['year', 'adjective', 'historical figure', 'verb (past tense)', 'object', 'emotion'],
    story: (words) => `I time traveled to ${words[0]} and met a ${words[1]} ${words[2]} who ${words[3]} their ${words[4]}. We both felt ${words[5]}. They said "sounds like you need Kyle Bucks." They were right.`
  },
  {
    prompts: ['time period', 'verb', 'adjective', 'object', 'place', 'number'],
    story: (words) => `Back in ${words[0]}, people would ${words[1]} ${words[2]} ${words[3]}s at ${words[4]} for ${words[5]} hours. That's how Kyle Bucks started. Allegedly.`
  },
  {
    prompts: ['adjective', 'verb (past tense)', 'invention', 'number', 'emotion', 'celebrity'],
    story: (words) => `The ${words[0]} moment when I ${words[1]} the ${words[2]} changed everything. ${words[5]} witnessed it ${words[3]} times and felt ${words[4]}. Kyle Bucks rained from the sky.`
  },
  
  // Sports and games
  {
    prompts: ['sport', 'adjective', 'verb (past tense)', 'object', 'number', 'body part'],
    story: (words) => `We played ${words[0]} with a ${words[1]} ${words[3]}. I ${words[2]} it ${words[4]} times and injured my ${words[5]}. Kyle called it "the most buck-worthy performance ever."`
  },
  {
    prompts: ['game', 'adjective', 'verb', 'coworker name', 'emotion', 'number'],
    story: (words) => `${words[3]} challenged me to ${words[0]}. The ${words[1]} rules required us to ${words[2]} ${words[5]} times. We felt ${words[4]} but Kyle awarded us both bucks.`
  },
  {
    prompts: ['type of competition', 'adjective', 'verb (past tense)', 'object', 'place', 'emotion'],
    story: (words) => `The ${words[0]} at ${words[4]} got ${words[1]} when someone ${words[2]} the ${words[3]}. Everyone felt ${words[5]}. Kyle declared us all winners and distributed bucks.`
  },
  
  // Nature and animals
  {
    prompts: ['animal', 'adjective', 'verb (past tense)', 'object', 'place', 'sound'],
    story: (words) => `A ${words[1]} ${words[0]} ${words[2]} my ${words[3]} at ${words[4]} while making a "${words[5]}" noise. This violated several workplace policies but earned me Kyle Bucks.`
  },
  {
    prompts: ['type of bird', 'color', 'verb', 'food', 'number', 'place'],
    story: (words) => `The ${words[1]} ${words[0]} learned to ${words[2]} ${words[3]} at ${words[5]}. It did this ${words[4]} times before Kyle showed up with bucks for everyone.`
  },
  {
    prompts: ['adjective', 'plant', 'verb (past tense)', 'liquid', 'place', 'emotion'],
    story: (words) => `My ${words[0]} ${words[1]} ${words[2]} when I watered it with ${words[3]} in the ${words[4]}. I felt ${words[5]} about this decision. Kyle said "bold choice" and gave me bucks.`
  },
  
  // Musical mayhem
  {
    prompts: ['musical instrument', 'adjective', 'verb (past tense)', 'place', 'emotion', 'number'],
    story: (words) => `Someone ${words[2]} a ${words[1]} ${words[0]} in ${words[3]}. The sound made ${words[5]} people feel ${words[4]}. Kyle called it "performance art" and awarded bucks.`
  },
  {
    prompts: ['genre of music', 'adjective', 'verb', 'object', 'coworker name', 'emotion'],
    story: (words) => `${words[4]} started playing ${words[0]} while trying to ${words[2]} the ${words[1]} ${words[3]}. We all felt ${words[5]}. Kyle declared it a "productivity enhancement" worth bucks.`
  },
  {
    prompts: ['song title', 'adjective', 'verb (past tense)', 'place', 'number', 'emotion'],
    story: (words) => `"${words[0]}" played ${words[1]}ly in ${words[3]} for ${words[4]} hours straight. Everyone ${words[2]} and felt ${words[5]}. Kyle ended our suffering with bucks.`
  },
  
  // Transportation troubles
  {
    prompts: ['vehicle', 'adjective', 'verb (past tense)', 'place', 'object', 'number'],
    story: (words) => `I rode a ${words[1]} ${words[0]} to ${words[3]} carrying a ${words[4]}. After ${words[5]} attempts, I ${words[2]} successfully. Kyle witnessed this feat and awarded bucks.`
  },
  {
    prompts: ['mode of transport', 'adjective', 'verb', 'animal', 'emotion', 'place'],
    story: (words) => `My ${words[0]} broke down so I had to ${words[2]} on a ${words[1]} ${words[3]} to get to ${words[5]}. I felt ${words[4]} the entire time. Kyle said "that's buck-worthy commitment."`
  },
  
  // Weather chaos
  {
    prompts: ['type of weather', 'adjective', 'verb (past tense)', 'object', 'emotion', 'number'],
    story: (words) => `The ${words[0]} was so ${words[1]} that it ${words[2]} my ${words[3]}. I felt ${words[4]} for ${words[5]} whole minutes. Kyle saw my pain and granted bucks.`
  },
  {
    prompts: ['weather event', 'verb', 'place', 'adjective', 'object', 'emotion'],
    story: (words) => `During the ${words[0]}, we had to ${words[1]} to ${words[2]} with only a ${words[3]} ${words[4]}. Everyone felt ${words[5]}. Kyle said "that's teamwork" and gave us all bucks.`
  },
  
  // Technology failures
  {
    prompts: ['software name', 'adjective', 'verb (past tense)', 'number', 'emotion', 'exclamation'],
    story: (words) => `${words[0]} crashed and became ${words[1]}. I ${words[2]} for ${words[3]} minutes feeling ${words[4]} before screaming "${words[5]}!" Kyle appeared with tech support bucks.`
  },
  {
    prompts: ['electronic device', 'adjective', 'verb', 'coworker name', 'object', 'number'],
    story: (words) => `The ${words[0]} was being ${words[1]} so ${words[3]} tried to ${words[2]} it with a ${words[4]}. After ${words[5]} attempts, Kyle intervened with "please stop" bucks.`
  },
  
  // Kitchen disasters
  {
    prompts: ['appliance', 'adjective', 'verb (past tense)', 'food', 'number', 'emotion'],
    story: (words) => `The break room ${words[0]} got ${words[1]} and ${words[2]} everyone's ${words[3]}. ${words[4]} people felt ${words[5]}. Kyle bought pizza and gave us all apology bucks.`
  },
  {
    prompts: ['type of dish', 'adjective', 'verb', 'ingredient', 'number', 'coworker name'],
    story: (words) => `${words[5]} tried to ${words[2]} ${words[0]} but forgot the ${words[3]}. It turned ${words[1]} after ${words[4]} minutes. Kyle tasted it anyway and awarded brave bucks.`
  },
  
  // Weekend stories
  {
    prompts: ['hobby', 'adjective', 'verb (past tense)', 'place', 'object', 'emotion'],
    story: (words) => `My weekend ${words[0]} got ${words[1]} when I ${words[2]} at ${words[3]} with my ${words[4]}. I felt ${words[5]} about it Monday morning. Kyle said "at least you tried" and gave me bucks.`
  },
  {
    prompts: ['activity', 'adjective', 'verb', 'number', 'body part', 'emotion'],
    story: (words) => `I spent ${words[3]} hours doing ${words[0]}. My ${words[4]} became ${words[1]} from ${words[2]}ing so much. I felt ${words[5]} but earned weekend warrior bucks from Kyle.`
  },
  
  // Office supplies gone wild
  {
    prompts: ['office supply', 'adjective', 'verb (past tense)', 'number', 'place', 'emotion'],
    story: (words) => `Someone's ${words[0]} became ${words[1]} and ${words[2]} ${words[3]} times in the ${words[4]}. We all felt ${words[5]}. Kyle declared it "office art" worth bucks.`
  },
  {
    prompts: ['type of paper', 'adjective', 'verb', 'coworker name', 'object', 'number'],
    story: (words) => `${words[3]} needed ${words[0]} but it was too ${words[1]}. They tried to ${words[2]} it with a ${words[4]} ${words[5]} times. Kyle awarded problem-solving bucks.`
  },
  
  // Clothing catastrophes
  {
    prompts: ['article of clothing', 'adjective', 'verb (past tense)', 'place', 'emotion', 'color'],
    story: (words) => `My ${words[0]} turned ${words[5]} and ${words[1]} at ${words[3]}. I ${words[2]} in panic feeling ${words[4]}. Kyle saw my distress and gave me emergency fashion bucks.`
  },
  {
    prompts: ['accessory', 'adjective', 'verb', 'number', 'object', 'emotion'],
    story: (words) => `I wore a ${words[1]} ${words[0]} and tried to ${words[2]} with ${words[3]} ${words[4]}s. It made me feel ${words[5]}. Kyle called it "a look" and awarded style bucks.`
  },
  
  // Communication fails
  {
    prompts: ['verb of communication', 'adjective', 'message', 'coworker name', 'emotion', 'number'],
    story: (words) => `I tried to ${words[0]} "${words[2]}" to ${words[3]} but it came out ${words[1]}. After ${words[5]} attempts, I felt ${words[4]}. Kyle said "communication is hard" and gave me bucks.`
  },
  {
    prompts: ['type of document', 'adjective', 'verb (past tense)', 'number', 'place', 'emotion'],
    story: (words) => `My ${words[0]} became ${words[1]} when it ${words[2]} ${words[3]} times at ${words[4]}. I felt ${words[5]} about the whole situation. Kyle awarded documentation bucks anyway.`
  },
  
  // Exercise fails
  {
    prompts: ['exercise', 'adjective', 'verb (past tense)', 'body part', 'number', 'emotion'],
    story: (words) => `I attempted ${words[0]} but my ${words[1]} ${words[3]} ${words[2]} after ${words[4]} tries. I felt ${words[5]} about my fitness level. Kyle gave me participation bucks.`
  },
  {
    prompts: ['sport', 'adjective', 'verb', 'object', 'coworker name', 'number'],
    story: (words) => `${words[4]} challenged me to ${words[0]}. I had to ${words[2]} a ${words[1]} ${words[3]} ${words[5]} times. I lost spectacularly. Kyle gave me "you tried" bucks.`
  },
  
  // Celebrity encounters
  {
    prompts: ['celebrity', 'adjective', 'verb (past tense)', 'object', 'place', 'emotion'],
    story: (words) => `I dreamed ${words[0]} ${words[2]} a ${words[1]} ${words[3]} at ${words[4]}. I felt ${words[5]} when I woke up. It wasn't real but Kyle gave me imagination bucks anyway.`
  },
  {
    prompts: ['famous person', 'adjective', 'verb', 'advice', 'number', 'emotion'],
    story: (words) => `${words[0]} gave me ${words[1]} advice: "${words[3]}". I tried to ${words[2]} this ${words[4]} times and felt ${words[5]}. Kyle said "at least you listened" and awarded bucks.`
  },
  
  // Color and number chaos
  {
    prompts: ['color', 'adjective', 'object', 'number', 'verb (past tense)', 'place'],
    story: (words) => `Everything turned ${words[0]} and ${words[1]} when the ${words[2]} ${words[4]} ${words[3]} times at ${words[5]}. Kyle said "that's concerning" but gave me observation bucks.`
  },
  {
    prompts: ['number', 'adjective', 'noun', 'verb', 'place', 'emotion'],
    story: (words) => `I counted ${words[0]} ${words[1]} ${words[2]}s and had to ${words[3]} them all at ${words[4]}. I felt ${words[5]} about this task. Kyle appreciated my dedication with counting bucks.`
  },
  
  // Random absurdity
  {
    prompts: ['adjective', 'verb ending in -ing', 'random object', 'place', 'sound effect', 'number'],
    story: (words) => `The ${words[0]} act of ${words[1]} a ${words[2]} at ${words[3]} went "*${words[4]}*" ${words[5]} times. Nobody knows why. Kyle gave us all "what just happened" bucks.`
  },
  {
    prompts: ['texture', 'noun', 'verb (past tense)', 'liquid', 'emotion', 'number'],
    story: (words) => `The ${words[0]} ${words[1]} ${words[2]} after contact with ${words[3]}. I felt ${words[4]} for ${words[5]} seconds. Kyle said "science!" and awarded experimental bucks.`
  },
  {
    prompts: ['shape', 'adjective', 'verb', 'animal', 'object', 'place'],
    story: (words) => `I discovered a ${words[0]}-shaped, ${words[1]} ${words[3]} that could ${words[2]} a ${words[4]} in ${words[5]}. Kyle called it "the discovery of the century" and maxed out my bucks.`
  },
  {
    prompts: ['smell', 'adjective', 'verb (past tense)', 'place', 'number', 'emotion'],
    story: (words) => `The office smelled like ${words[0]} and got ${words[1]} in ${words[3]}. This ${words[2]} ${words[4]} times before we felt ${words[5]}. Kyle gave us all "survivor" bucks.`
  },
  {
    prompts: ['sound', 'adjective', 'object', 'verb', 'coworker name', 'number'],
    story: (words) => `The "${words[0]}" sound came from ${words[4]}'s ${words[1]} ${words[2]}. They tried to ${words[3]} it ${words[5]} times. Kyle said "I don't want to know" and gave mystery bucks.`
  },
  
  // Dream logic
  {
    prompts: ['adjective', 'action', 'famous place', 'object', 'emotion', 'number'],
    story: (words) => `In my dream, I had to ${words[1]} at ${words[2]} using a ${words[0]} ${words[3]}. I did it ${words[5]} times while feeling ${words[4]}. Kyle appeared and gave me dream bucks. They were real.`
  },
  {
    prompts: ['impossible thing', 'adjective', 'verb (past tense)', 'number', 'place', 'emotion'],
    story: (words) => `I achieved ${words[0]} by being ${words[1]} and ${words[2]}ing ${words[3]} times in ${words[4]}. I felt ${words[5]} about defying physics. Kyle gave me reality-bending bucks.`
  },
  
  // Social situations
  {
    prompts: ['social event', 'adjective', 'verb (past tense)', 'food', 'number', 'emotion'],
    story: (words) => `At the ${words[0]}, things got ${words[1]} when someone ${words[2]} all the ${words[3]}. ${words[4]} people felt ${words[5]}. Kyle saved the day with party bucks for everyone.`
  },
  {
    prompts: ['type of gathering', 'adjective', 'verb', 'object', 'coworker name', 'emotion'],
    story: (words) => `The ${words[0]} required everyone to ${words[2]} a ${words[1]} ${words[3]}. ${words[4]} refused and felt ${words[5]}. Kyle respected the rebellion and gave bucks anyway.`
  },
  
  // Pure nonsense
  {
    prompts: ['adjective', 'verb ending in -ing', 'fictional character', 'object', 'number', 'place'],
    story: (words) => `${words[2]} was ${words[0]} while ${words[1]} ${words[4]} ${words[3]}s in ${words[5]}. This made perfect sense to Kyle who distributed bucks immediately.`
  },
  {
    prompts: ['made-up word', 'adjective', 'verb (past tense)', 'emotion', 'number', 'object'],
    story: (words) => `The ancient art of "${words[0]}" became ${words[1]} when I ${words[2]} and felt ${words[3]} about ${words[4]} ${words[5]}s. Kyle understood completely and gave me wisdom bucks.`
  },
  {
    prompts: ['adjective', 'silly action', 'number', 'emotion', 'place', 'object'],
    story: (words) => `Company policy now requires ${words[1]} ${words[2]} times while feeling ${words[3]} at ${words[4]} using only a ${words[0]} ${words[5]}. Kyle approved this. We don't ask questions.`
  },
  {
    prompts: ['verb', 'adjective', 'random noun', 'emotion', 'number', 'exclamation'],
    story: (words) => `To ${words[0]} a ${words[1]} ${words[2]} while feeling ${words[3]} ${words[4]} times in a row is the secret to Kyle Bucks. "${words[5]}!" I shouted upon completion.`
  },
  {
    prompts: ['superpower', 'adjective', 'verb (past tense)', 'object', 'place', 'number'],
    story: (words) => `I gained the ${words[0]} power which made everything ${words[1]}. I ${words[2]} the ${words[3]} at ${words[4]} ${words[5]} times. Kyle called me a superhero and gave me super bucks.`
  },
  {
    prompts: ['type of dance', 'adjective', 'place', 'object', 'emotion', 'number'],
    story: (words) => `The ${words[0]} became ${words[1]} when performed in ${words[2]} with a ${words[3]}. I felt ${words[4]} after ${words[5]} performances. Kyle gave me choreography bucks.`
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
    
    if (players[name] < 20) {
      return res.status(400).json({ 
        success: false, 
        error: 'Not enough Kyle Bucks! Need 20 to play.' 
      });
    }
    
    // Deduct 20 Kyle Bucks
    players[name] -= 20;
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
