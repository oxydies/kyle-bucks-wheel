import Redis from 'ioredis';

let redis;

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL);
  }
  return redis;
}

// 40 madlib templates with varied word types and examples
const storyTemplates = [
  // Office chaos
  {
    prompts: [
      'Adjective (ex: sparkly, weird, gigantic)',
      'Noun - Plural (ex: staplers, donuts, emails)',
      'Verb - Past Tense (ex: exploded, danced, screamed)',
      'Profession (ex: astronaut, plumber, CEO)'
    ],
    story: (w) => `The ${w[0]} Monday started when ${w[1]} mysteriously ${w[2]} in the break room. A visiting ${w[3]} had to help clean up. Kyle gave everyone bonus bucks for surviving.`
  },
  {
    prompts: [
      'Person\'s Name (ex: Taylor Swift, Elon Musk)',
      'Verb ending in -ing (ex: juggling, typing, screaming)',
      'Animal (ex: llama, penguin, goldfish)',
      'Color (ex: neon pink, muddy brown)'
    ],
    story: (w) => `${w[0]} showed up at work today, ${w[1]} while riding a ${w[2]}. Everything turned ${w[3]} for some reason. Kyle Bucks were distributed as hush money.`
  },
  {
    prompts: [
      'Adjective - Feeling (ex: anxious, thrilled, confused)',
      'Part of Body (ex: elbow, left pinky toe)',
      'Silly Word (ex: blorp, yeet, flibbertigibbet)',
      'Interjection (ex: Yikes!, Holy moly!, Zoinks!)'
    ],
    story: (w) => `I felt ${w[0]} when I accidentally hit my ${w[1]} on the ${w[2]} machine. "${w[3]}" I yelled. Kyle heard and gave me sympathy bucks immediately.`
  },
  {
    prompts: [
      'Number (ex: seventeen, 420, one million)',
      'Noun - Plural (ex: coffee mugs, keyboards, chairs)',
      'Place (ex: the parking lot, Antarctica, Dave\'s desk)',
      'Adverb (ex: mysteriously, frantically, slowly)'
    ],
    story: (w) => `There were ${w[0]} ${w[1]} scattered across ${w[2]}. They appeared ${w[3]} overnight. HR investigated but Kyle just gave out bucks and moved on.`
  },
  {
    prompts: [
      'Verb - Past Tense (ex: teleported, yodeled, exploded)',
      'Animal (ex: ferret, peacock, hamster)',
      'Piece of Clothing (ex: tube sock, Hawaiian shirt)',
      'Profession (ex: ninja, barista, detective)'
    ],
    story: (w) => `The office ${w[3]} ${w[0]} when they saw a ${w[1]} wearing a ${w[2]} in the conference room. Kyle declared it the best day ever and made it rain bucks.`
  },

  // Kyle Bucks legends
  {
    prompts: [
      'Adjective (ex: mystical, haunted, legendary)',
      'Place (ex: Mount Everest, the supply closet)',
      'Person\'s Name (ex: Gandalf, Oprah, Batman)',
      'Silly Word (ex: ka-chow, bazinga, booyah)'
    ],
    story: (w) => `Legend says Kyle discovered the ${w[0]} power of Kyle Bucks at ${w[1]}. ${w[2]} appeared in a vision and said "${w[3]}" and the currency was born.`
  },
  {
    prompts: [
      'Measure of Time (ex: eons, 47 minutes, centuries)',
      'Verb ending in -ing (ex: meditating, breakdancing)',
      'Color (ex: electric purple, seafoam green)',
      'Number (ex: twelve, 666, ninety-nine)'
    ],
    story: (w) => `Kyle spent ${w[0]} ${w[1]} until a ${w[2]} light appeared. ${w[3]} voices spoke the truth: share the wealth. Kyle Bucks were manifested into reality.`
  },
  {
    prompts: [
      'Adjective - Feeling (ex: enlightened, pumped, terrified)',
      'Animal (ex: wise owl, confused sloth)',
      'Interjection (ex: Eureka!, Bingo!, Sweet!)',
      'Verb - Past Tense (ex: transcended, vibed, awakened)'
    ],
    story: (w) => `Kyle felt ${w[0]} when a ${w[1]} taught him ancient wisdom. "${w[2]}" he exclaimed as he ${w[3]} to a higher plane. Kyle Bucks descended from the heavens.`
  },

  // Absurd quests
  {
    prompts: [
      'Adjective (ex: impossible, ridiculous, epic)',
      'Noun - Plural (ex: rubber ducks, Post-it notes)',
      'Place (ex: the roof, behind the fridge)',
      'Profession (ex: wizard, crossing guard, DJ)'
    ],
    story: (w) => `My ${w[0]} quest required collecting ${w[1]} from ${w[2]}. A mysterious ${w[3]} gave me cryptic clues. Kyle rewarded me with bucks for completing the prophecy.`
  },
  {
    prompts: [
      'Person\'s Name (ex: Gordon Ramsay, Beyoncé)',
      'Verb ending in -ing (ex: backflipping, solving)',
      'Animal (ex: majestic eagle, grumpy cat)',
      'Silly Word (ex: whammy, kaboom, schwing)'
    ],
    story: (w) => `${w[0]} challenged me to prove my worth by ${w[1]} better than a ${w[2]}. When I succeeded, they shouted "${w[3]}" and Kyle granted me championship bucks!`
  },
  {
    prompts: [
      'Measure of Time (ex: three hours, forty days)',
      'Verb - Past Tense (ex: conquered, survived, decoded)',
      'Part of Body (ex: eyebrow, thumb, kneecap)',
      'Adverb (ex: heroically, awkwardly, gracefully)'
    ],
    story: (w) => `For ${w[0]}, I ${w[1]} the challenge using only my ${w[2]}. I completed it ${w[3]} and earned Kyle's eternal respect (and a bunch of bucks).`
  },

  // Tech disasters
  {
    prompts: [
      'Adjective (ex: catastrophic, glitchy, bizarre)',
      'Noun - Plural (ex: laptops, printers, monitors)',
      'Interjection (ex: Oh no!, Dang it!, Uh oh!)',
      'Color (ex: error-message red, warning yellow)'
    ],
    story: (w) => `The ${w[0]} tech failure made all the ${w[1]} turn ${w[3]}. "${w[2]}" everyone said in unison. Kyle gave us crisis management bucks and called IT.`
  },
  {
    prompts: [
      'Person\'s Name (ex: Steve Jobs, Ada Lovelace)',
      'Verb ending in -ing (ex: debugging, hacking, coding)',
      'Silly Word (ex: glitcharoo, techno-oops)',
      'Profession (ex: software engineer, tech guru)'
    ],
    story: (w) => `${w[0]} possessed me, and I started ${w[1]} like a possessed ${w[3]}. I kept shouting "${w[2]}" until the problem fixed itself. Kyle gave me bucks for unorthodox methods.`
  },
  {
    prompts: [
      'Number (ex: 404, eleventy billion, zero)',
      'Verb - Past Tense (ex: crashed, froze, rebooted)',
      'Animal (ex: cyber-squirrel, robot chicken)',
      'Measure of Time (ex: nanoseconds, hours, days)'
    ],
    story: (w) => `Error ${w[0]} appeared when the system ${w[1]} thanks to a ${w[2]} in the server room. It took ${w[3]} to fix. Kyle gave us patience bucks.`
  },

  // Food chaos
  {
    prompts: [
      'Adjective (ex: suspicious, delicious, radioactive)',
      'Noun - Plural (ex: sandwiches, bananas, tacos)',
      'Part of Body (ex: taste buds, stomach, tongue)',
      'Interjection (ex: Yum!, Blegh!, Whoa!)'
    ],
    story: (w) => `Someone brought ${w[0]} ${w[1]} to the potluck. My ${w[2]} immediately regretted it. "${w[3]}" I said. Kyle gave everyone pizza bucks as compensation.`
  },
  {
    prompts: [
      'Person\'s Name (ex: Guy Fieri, Julia Child)',
      'Verb ending in -ing (ex: baking, grilling, mixing)',
      'Animal (ex: competitive raccoon, foodie bear)',
      'Color (ex: burnt orange, moldy green)'
    ],
    story: (w) => `${w[0]} hosted a cooking show, ${w[1]} against a ${w[2]}. Everything turned ${w[3]} and possibly sentient. Kyle gave us hazard pay bucks.`
  },
  {
    prompts: [
      'Adjective - Feeling (ex: hungry, nauseous, excited)',
      'Noun - Plural (ex: french fries, cookies, sushi rolls)',
      'Adverb (ex: aggressively, delicately, weirdly)',
      'Silly Word (ex: nom-nom, yummy-yum, bleaurgh)'
    ],
    story: (w) => `I felt ${w[0]} watching someone eat ${w[1]} ${w[2]} while saying "${w[3]}" between bites. Kyle found it hilarious and gave us lunch bucks.`
  },

  // Meeting madness
  {
    prompts: [
      'Measure of Time (ex: infinity, six hours, forever)',
      'Adjective (ex: pointless, mind-numbing, chaotic)',
      'Profession (ex: motivational speaker, mime, Viking)',
      'Interjection (ex: Finally!, Good grief!, Hallelujah!)'
    ],
    story: (w) => `The meeting lasted ${w[0]} and was completely ${w[1]}. A guest ${w[2]} made it worse. When it ended, we all shouted "${w[3]}" Kyle gave us freedom bucks.`
  },
  {
    prompts: [
      'Person\'s Name (ex: Michael Scott, Leslie Knope)',
      'Verb ending in -ing (ex: presenting, rambling, dancing)',
      'Silly Word (ex: synergy, paradigm-shift, discombobulate)',
      'Part of Body (ex: brain cells, willpower, sanity)'
    ],
    story: (w) => `${w[0]} spent the entire meeting ${w[1]} about "${w[2]}" until everyone lost their ${w[3]}. Kyle ended it early with generous bucks for everyone.`
  },
  {
    prompts: [
      'Animal (ex: bored sloth, energetic squirrel)',
      'Verb - Past Tense (ex: dozed off, escaped, interrupted)',
      'Color (ex: PowerPoint blue, chart green)',
      'Number (ex: fifty-seven, too many, zero)'
    ],
    story: (w) => `A ${w[0]} ${w[1]} during the presentation about ${w[2]} strategies. We covered ${w[3]} slides but learned nothing. Kyle gave us endurance bucks.`
  },

  // Supernatural
  {
    prompts: [
      'Adjective (ex: haunted, mystical, cursed)',
      'Place (ex: the copy room, fourth floor, janitor closet)',
      'Interjection (ex: Spooky!, Ghost!, Run!)',
      'Profession (ex: ghost hunter, exorcist, medium)'
    ],
    story: (w) => `The ${w[0]} presence in ${w[1]} made everyone scream "${w[2]}" We called a ${w[3]} but Kyle just gave us bravery bucks instead.`
  },
  {
    prompts: [
      'Person\'s Name (ex: Dracula, Casper, Gandalf)',
      'Verb ending in -ing (ex: floating, glowing, vanishing)',
      'Silly Word (ex: boo-yah, spook-a-roo, phantasma)',
      'Measure of Time (ex: midnight, witching hour, 3am)'
    ],
    story: (w) => `${w[0]} appeared at ${w[3]}, ${w[1]} and shouting "${w[2]}" repeatedly. Turns out they just wanted Kyle Bucks. We all got paranormal activity bucks.`
  },
  {
    prompts: [
      'Adjective - Feeling (ex: spooked, enchanted, possessed)',
      'Noun - Plural (ex: crystals, candles, herbs)',
      'Animal (ex: black cat, mystical owl, spirit animal)',
      'Color (ex: ectoplasm green, aura purple)'
    ],
    story: (w) => `I felt ${w[0]} after using ${w[1]} to summon a ${w[2]}. Everything glowed ${w[3]} and reality shifted. Kyle gave us metaphysical bucks for the experience.`
  },

  // Time travel
  {
    prompts: [
      'Measure of Time (ex: yesterday, 1985, next Tuesday)',
      'Verb - Past Tense (ex: time-traveled, zapped, teleported)',
      'Person\'s Name (ex: Doc Brown, Marty McFly)',
      'Interjection (ex: Great Scott!, Whoa!, No way!)'
    ],
    story: (w) => `I ${w[1]} to ${w[0]} and met ${w[2]}! "${w[3]}" I said when I realized Kyle Bucks existed in all timelines. Returned with infinite temporal bucks.`
  },
  {
    prompts: [
      'Adjective (ex: alternate, dystopian, groovy)',
      'Noun - Plural (ex: flying cars, robots, dinosaurs)',
      'Place (ex: ancient Rome, the future, parallel universe)',
      'Silly Word (ex: flux-capacitor, chrono-whoops)'
    ],
    story: (w) => `The ${w[0]} timeline had ${w[1]} everywhere! I visited ${w[2]} and learned the ancient word "${w[3]}" Kyle gave me bucks across all dimensions.`
  },
  {
    prompts: [
      'Number (ex: twenty years, 88mph, infinite)',
      'Verb ending in -ing (ex: paradoxing, time-looping)',
      'Part of Body (ex: temporal lobe, space-time continuum)',
      'Profession (ex: time cop, chrono-archaeologist)'
    ],
    story: (w) => `After ${w[0]} of ${w[1]}, I broke my ${w[2]} and became a ${w[3]}. Kyle gave me retirement bucks from every possible timeline.`
  },

  // Sports
  {
    prompts: [
      'Adjective (ex: competitive, athletic, clumsy)',
      'Verb - Past Tense (ex: slam-dunked, scored, fumbled)',
      'Animal (ex: sporty kangaroo, competitive sloth)',
      'Interjection (ex: Score!, Goooal!, Touchdown!)'
    ],
    story: (w) => `The ${w[0]} tournament was intense! I ${w[1]} better than a ${w[2]}. The crowd chanted "${w[3]}" Kyle gave me championship bucks!`
  },
  {
    prompts: [
      'Person\'s Name (ex: LeBron James, Serena Williams)',
      'Verb ending in -ing (ex: shooting, running, scoring)',
      'Piece of Clothing (ex: jersey, sneakers, headband)',
      'Number (ex: three-pointer, hole-in-one, 100 points)'
    ],
    story: (w) => `${w[0]} coached me in ${w[1]} while wearing their lucky ${w[2]}. I scored ${w[3]} and won. Kyle gave me MVP bucks and a trophy.`
  },
  {
    prompts: [
      'Measure of Time (ex: overtime, halftime, sudden death)',
      'Adverb (ex: aggressively, gracefully, terribly)',
      'Silly Word (ex: swoosh, kabonk, nothing-but-net)',
      'Color (ex: team red, victory gold)'
    ],
    story: (w) => `During ${w[0]}, I played ${w[1]} and made a "${w[2]}" move that turned ${w[3]}. Kyle gave us all sportsmanship bucks!`
  },

  // Nature and weather
  {
    prompts: [
      'Adjective (ex: torrential, sunny, apocalyptic)',
      'Noun - Plural (ex: clouds, rainbows, thunderbolts)',
      'Verb - Past Tense (ex: rained, snowed, hurricaned)',
      'Interjection (ex: Wow!, Mother Nature!, Yikes!)'
    ],
    story: (w) => `The ${w[0]} weather brought ${w[1]} that ${w[2]} on the office. "${w[3]}" everyone said. Kyle gave us act-of-god bucks and sent us home.`
  },
  {
    prompts: [
      'Animal (ex: weather-predicting groundhog, storm crow)',
      'Place (ex: the great outdoors, the wilderness)',
      'Adjective - Feeling (ex: refreshed, soaked, windblown)',
      'Color (ex: sky blue, storm gray, sunset orange)'
    ],
    story: (w) => `A ${w[0]} appeared at ${w[1]} and made everyone feel ${w[2]}. The sky turned ${w[3]} and Kyle gave us nature appreciation bucks.`
  },
  {
    prompts: [
      'Measure of Time (ex: golden hour, dawn, dusk)',
      'Verb ending in -ing (ex: photosynthesizing, basking)',
      'Part of Body (ex: skin, lungs, soul)',
      'Silly Word (ex: Mother-Nature-magic, eco-vibes)'
    ],
    story: (w) => `At ${w[0]}, I spent time ${w[1]} to rejuvenate my ${w[2]} with pure "${w[3]}" energy. Kyle gave us wellness bucks for touching grass.`
  },

  // Music
  {
    prompts: [
      'Adjective (ex: loud, terrible, Grammy-worthy)',
      'Person\'s Name (ex: Beethoven, Taylor Swift, Weird Al)',
      'Verb ending in -ing (ex: singing, drumming, yodeling)',
      'Interjection (ex: Encore!, Bravo!, Stop!)'
    ],
    story: (w) => `The ${w[0]} performance featured ${w[1]} ${w[2]} on stage. The audience shouted "${w[3]}" Kyle gave everyone concert ticket bucks!`
  },
  {
    prompts: [
      'Noun - Plural (ex: kazoos, electric guitars, tubas)',
      'Animal (ex: musical whale, dancing parrot)',
      'Silly Word (ex: rock-n-roll, cha-cha-cha, jazz-hands)',
      'Profession (ex: rockstar, DJ, conductor)'
    ],
    story: (w) => `We formed a band using only ${w[0]} and a trained ${w[1]}. Our signature sound was "${w[2]}" We became famous ${w[3]}s. Kyle sponsored our tour with bucks!`
  },
  {
    prompts: [
      'Color (ex: psychedelic purple, neon pink)',
      'Verb - Past Tense (ex: jammed, rocked out, performed)',
      'Measure of Time (ex: three encores, all night long)',
      'Adverb (ex: passionately, off-key, beautifully)'
    ],
    story: (w) => `The ${w[0]} lights flashed as we ${w[1]} for ${w[2]}, playing ${w[3]}. Kyle gave us rock legend bucks and asked for an autograph.`
  },

  // Transportation
  {
    prompts: [
      'Adjective (ex: speedy, rusty, futuristic)',
      'Noun - Plural (ex: spaceships, shopping carts, unicycles)',
      'Place (ex: the highway, Mars, downtown)',
      'Interjection (ex: Vroom!, Beep beep!, Whoosh!)'
    ],
    story: (w) => `We raced ${w[0]} ${w[1]} to ${w[2]} while screaming "${w[3]}" the whole way. Kyle gave us speed demon bucks and traffic tickets.`
  },
  {
    prompts: [
      'Person\'s Name (ex: Elon Musk, Lightning McQueen)',
      'Verb ending in -ing (ex: driving, flying, teleporting)',
      'Animal (ex: road-running ostrich, commuting penguin)',
      'Number (ex: 88mph, warp speed, zero mph)'
    ],
    story: (w) => `${w[0]} taught me the art of ${w[1]} faster than a ${w[2]} at ${w[3]}. Kyle gave us frequent traveler bucks for the adventure!`
  },
  {
    prompts: [
      'Piece of Clothing (ex: seatbelt, driving gloves)',
      'Part of Body (ex: foot, steering hand)',
      'Silly Word (ex: zoom-zoom, vroom-vroom)',
      'Adjective - Feeling (ex: carsick, exhilarated, lost)'
    ],
    story: (w) => `I wore my lucky ${w[0]}, controlled everything with my ${w[1]}, shouted "${w[2]}" and felt ${w[3]} the whole ride. Kyle gave us road trip bucks!`
  },

  // Pure chaos
  {
    prompts: [
      'Adjective (ex: random, inexplicable, chaotic)',
      'Verb - Past Tense (ex: happened, occurred, manifested)',
      'Silly Word (ex: shenanigans, tomfoolery, hullabaloo)',
      'Interjection (ex: What?!, Huh?!, Seriously?!)'
    ],
    story: (w) => `Something ${w[0]} just ${w[1]} for no reason. Total "${w[2]}" ensued. "${w[3]}" everyone said. Kyle gave us confusion bucks and walked away.`
  },
  {
    prompts: [
      'Number (ex: forty-two, infinity, zero)',
      'Noun - Plural (ex: rubber chickens, fidget spinners)',
      'Adverb (ex: spontaneously, mysteriously, hilariously)',
      'Color (ex: plaid, transparent, iridescent)'
    ],
    story: (w) => `Exactly ${w[0]} ${w[1]} appeared ${w[2]} and turned ${w[3]}. Nobody questioned it. Kyle just threw bucks at the situation until it resolved itself.`
  },
  {
    prompts: [
      'Person\'s Name (ex: Bigfoot, The Tooth Fairy)',
      'Animal (ex: confused flamingo, philosophical capybara)',
      'Verb ending in -ing (ex: existing, vibing, pondering)',
      'Measure of Time (ex: the eternal now, 4:20, tea time)'
    ],
    story: (w) => `${w[0]} and a ${w[1]} were just ${w[2]} together at ${w[3]}. It was beautiful. It was art. Kyle gave us existential bucks for witnessing it.`
  },
  {
    prompts: [
      'Adjective - Feeling (ex: bewildered, enlightened, unhinged)',
      'Profession (ex: chaos coordinator, professional weirdo)',
      'Part of Body (ex: funny bone, third eye, soul)',
      'Interjection (ex: Bazinga!, Cowabunga!, Yeet!)'
    ],
    story: (w) => `I felt ${w[0]} after becoming an official ${w[1]}. It awakened my ${w[2]} and now I only communicate by yelling "${w[3]}" Kyle gave me bucks for committing to the bit.`
  }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = getRedis();
    const { name, words } = req.body;

    // Words array length is flexible (4-7 words depending on the story)
    if (!name || !words || !Array.isArray(words) || words.length < 4) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid request. Need name and at least 4 words.' 
      });
    }

    // Get player data
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
      newBalance: players[name],
      prompts: template.prompts // Send prompts back for reference
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
