// Madlib Game JavaScript
console.log('🎭 MADLIB SCRIPT STARTING...');

let currentPlayerName = '';
let currentBalance = 0;
let currentPrompts = [];
let currentTemplateIndex = 0; // Track which template we're using

// ALL 40 templates matching API exactly
const templates = [
    ['Adjective (ex: sparkly, weird, gigantic)', 'Noun - Plural (ex: staplers, donuts, emails)', 'Verb - Past Tense (ex: exploded, danced, screamed)', 'Profession (ex: astronaut, plumber, CEO)'],
    ['Person\'s Name (ex: Taylor Swift, Elon Musk)', 'Verb ending in -ing (ex: juggling, typing, screaming)', 'Animal (ex: llama, penguin, goldfish)', 'Color (ex: neon pink, muddy brown)'],
    ['Adjective - Feeling (ex: anxious, thrilled, confused)', 'Part of Body (ex: elbow, left pinky toe)', 'Silly Word (ex: blorp, yeet, flibbertigibbet)', 'Interjection (ex: Yikes!, Holy moly!, Zoinks!)'],
    ['Number (ex: seventeen, 420, one million)', 'Noun - Plural (ex: coffee mugs, keyboards, chairs)', 'Place (ex: the parking lot, Antarctica, Dave\'s desk)', 'Adverb (ex: mysteriously, frantically, slowly)'],
    ['Verb - Past Tense (ex: teleported, yodeled, exploded)', 'Animal (ex: ferret, peacock, hamster)', 'Piece of Clothing (ex: tube sock, Hawaiian shirt)', 'Profession (ex: ninja, barista, detective)'],
    ['Adjective (ex: mystical, haunted, legendary)', 'Place (ex: Mount Everest, the supply closet)', 'Person\'s Name (ex: Gandalf, Oprah, Batman)', 'Silly Word (ex: ka-chow, bazinga, booyah)'],
    ['Measure of Time (ex: eons, 47 minutes, centuries)', 'Verb ending in -ing (ex: meditating, breakdancing)', 'Color (ex: electric purple, seafoam green)', 'Number (ex: twelve, 666, ninety-nine)'],
    ['Adjective - Feeling (ex: enlightened, pumped, terrified)', 'Animal (ex: wise owl, confused sloth)', 'Interjection (ex: Eureka!, Bingo!, Sweet!)', 'Verb - Past Tense (ex: transcended, vibed, awakened)'],
    ['Adjective (ex: impossible, ridiculous, epic)', 'Noun - Plural (ex: rubber ducks, Post-it notes)', 'Place (ex: the roof, behind the fridge)', 'Profession (ex: wizard, crossing guard, DJ)'],
    ['Person\'s Name (ex: Gordon Ramsay, Beyoncé)', 'Verb ending in -ing (ex: backflipping, solving)', 'Animal (ex: majestic eagle, grumpy cat)', 'Silly Word (ex: whammy, kaboom, schwing)'],
    ['Measure of Time (ex: three hours, forty days)', 'Verb - Past Tense (ex: conquered, survived, decoded)', 'Part of Body (ex: eyebrow, thumb, kneecap)', 'Adverb (ex: heroically, awkwardly, gracefully)'],
    ['Adjective (ex: catastrophic, glitchy, bizarre)', 'Noun - Plural (ex: laptops, printers, monitors)', 'Interjection (ex: Oh no!, Dang it!, Uh oh!)', 'Color (ex: error-message red, warning yellow)'],
    ['Person\'s Name (ex: Steve Jobs, Ada Lovelace)', 'Verb ending in -ing (ex: debugging, hacking, coding)', 'Silly Word (ex: glitcharoo, techno-oops)', 'Profession (ex: software engineer, tech guru)'],
    ['Number (ex: 404, eleventy billion, zero)', 'Verb - Past Tense (ex: crashed, froze, rebooted)', 'Animal (ex: cyber-squirrel, robot chicken)', 'Measure of Time (ex: nanoseconds, hours, days)'],
    ['Adjective (ex: suspicious, delicious, radioactive)', 'Noun - Plural (ex: sandwiches, bananas, tacos)', 'Part of Body (ex: taste buds, stomach, tongue)', 'Interjection (ex: Yum!, Blegh!, Whoa!)'],
    ['Person\'s Name (ex: Guy Fieri, Julia Child)', 'Verb ending in -ing (ex: baking, grilling, mixing)', 'Animal (ex: competitive raccoon, foodie bear)', 'Color (ex: burnt orange, moldy green)'],
    ['Adjective - Feeling (ex: hungry, nauseous, excited)', 'Noun - Plural (ex: french fries, cookies, sushi rolls)', 'Adverb (ex: aggressively, delicately, weirdly)', 'Silly Word (ex: nom-nom, yummy-yum, bleaurgh)'],
    ['Measure of Time (ex: infinity, six hours, forever)', 'Adjective (ex: pointless, mind-numbing, chaotic)', 'Profession (ex: motivational speaker, mime, Viking)', 'Interjection (ex: Finally!, Good grief!, Hallelujah!)'],
    ['Person\'s Name (ex: Michael Scott, Leslie Knope)', 'Verb ending in -ing (ex: presenting, rambling, dancing)', 'Silly Word (ex: synergy, paradigm-shift, discombobulate)', 'Part of Body (ex: brain cells, willpower, sanity)'],
    ['Animal (ex: bored sloth, energetic squirrel)', 'Verb - Past Tense (ex: dozed off, escaped, interrupted)', 'Color (ex: PowerPoint blue, chart green)', 'Number (ex: fifty-seven, too many, zero)'],
    ['Adjective (ex: haunted, mystical, cursed)', 'Place (ex: the copy room, fourth floor, janitor closet)', 'Interjection (ex: Spooky!, Ghost!, Run!)', 'Profession (ex: ghost hunter, exorcist, medium)'],
    ['Person\'s Name (ex: Dracula, Casper, Gandalf)', 'Verb ending in -ing (ex: floating, glowing, vanishing)', 'Silly Word (ex: boo-yah, spook-a-roo, phantasma)', 'Measure of Time (ex: midnight, witching hour, 3am)'],
    ['Adjective - Feeling (ex: spooked, enchanted, possessed)', 'Noun - Plural (ex: crystals, candles, herbs)', 'Animal (ex: black cat, mystical owl, spirit animal)', 'Color (ex: ectoplasm green, aura purple)'],
    ['Measure of Time (ex: yesterday, 1985, next Tuesday)', 'Verb - Past Tense (ex: time-traveled, zapped, teleported)', 'Person\'s Name (ex: Doc Brown, Marty McFly)', 'Interjection (ex: Great Scott!, Whoa!, No way!)'],
    ['Adjective (ex: alternate, dystopian, groovy)', 'Noun - Plural (ex: flying cars, robots, dinosaurs)', 'Place (ex: ancient Rome, the future, parallel universe)', 'Silly Word (ex: flux-capacitor, chrono-whoops)'],
    ['Number (ex: twenty years, 88mph, infinite)', 'Verb ending in -ing (ex: paradoxing, time-looping)', 'Part of Body (ex: temporal lobe, space-time continuum)', 'Profession (ex: time cop, chrono-archaeologist)'],
    ['Adjective (ex: competitive, athletic, clumsy)', 'Verb - Past Tense (ex: slam-dunked, scored, fumbled)', 'Animal (ex: sporty kangaroo, competitive sloth)', 'Interjection (ex: Score!, Goooal!, Touchdown!)'],
    ['Person\'s Name (ex: LeBron James, Serena Williams)', 'Verb ending in -ing (ex: shooting, running, scoring)', 'Piece of Clothing (ex: jersey, sneakers, headband)', 'Number (ex: three-pointer, hole-in-one, 100 points)'],
    ['Measure of Time (ex: overtime, halftime, sudden death)', 'Adverb (ex: aggressively, gracefully, terribly)', 'Silly Word (ex: swoosh, kabonk, nothing-but-net)', 'Color (ex: team red, victory gold)'],
    ['Adjective (ex: torrential, sunny, apocalyptic)', 'Noun - Plural (ex: clouds, rainbows, thunderbolts)', 'Verb - Past Tense (ex: rained, snowed, hurricaned)', 'Interjection (ex: Wow!, Mother Nature!, Yikes!)'],
    ['Animal (ex: weather-predicting groundhog, storm crow)', 'Place (ex: the great outdoors, the wilderness)', 'Adjective - Feeling (ex: refreshed, soaked, windblown)', 'Color (ex: sky blue, storm gray, sunset orange)'],
    ['Measure of Time (ex: golden hour, dawn, dusk)', 'Verb ending in -ing (ex: photosynthesizing, basking)', 'Part of Body (ex: skin, lungs, soul)', 'Silly Word (ex: Mother-Nature-magic, eco-vibes)'],
    ['Adjective (ex: loud, terrible, Grammy-worthy)', 'Person\'s Name (ex: Beethoven, Taylor Swift, Weird Al)', 'Verb ending in -ing (ex: singing, drumming, yodeling)', 'Interjection (ex: Encore!, Bravo!, Stop!)'],
    ['Noun - Plural (ex: kazoos, electric guitars, tubas)', 'Animal (ex: musical whale, dancing parrot)', 'Silly Word (ex: rock-n-roll, cha-cha-cha, jazz-hands)', 'Profession (ex: rockstar, DJ, conductor)'],
    ['Color (ex: psychedelic purple, neon pink)', 'Verb - Past Tense (ex: jammed, rocked out, performed)', 'Measure of Time (ex: three encores, all night long)', 'Adverb (ex: passionately, off-key, beautifully)'],
    ['Adjective (ex: speedy, rusty, futuristic)', 'Noun - Plural (ex: spaceships, shopping carts, unicycles)', 'Place (ex: the highway, Mars, downtown)', 'Interjection (ex: Vroom!, Beep beep!, Whoosh!)'],
    ['Person\'s Name (ex: Elon Musk, Lightning McQueen)', 'Verb ending in -ing (ex: driving, flying, teleporting)', 'Animal (ex: road-running ostrich, commuting penguin)', 'Number (ex: 88mph, warp speed, zero mph)'],
    ['Piece of Clothing (ex: seatbelt, driving gloves)', 'Part of Body (ex: foot, steering hand)', 'Silly Word (ex: zoom-zoom, vroom-vroom)', 'Adjective - Feeling (ex: carsick, exhilarated, lost)'],
    ['Adjective (ex: random, inexplicable, chaotic)', 'Verb - Past Tense (ex: happened, occurred, manifested)', 'Silly Word (ex: shenanigans, tomfoolery, hullabaloo)', 'Interjection (ex: What?!, Huh?!, Seriously?!)'],
    ['Number (ex: forty-two, infinity, zero)', 'Noun - Plural (ex: rubber chickens, fidget spinners)', 'Adverb (ex: spontaneously, mysteriously, hilariously)', 'Color (ex: plaid, transparent, iridescent)'],
    ['Person\'s Name (ex: Bigfoot, The Tooth Fairy)', 'Animal (ex: confused flamingo, philosophical capybara)', 'Verb ending in -ing (ex: existing, vibing, pondering)', 'Measure of Time (ex: the eternal now, 4:20, tea time)'],
    ['Adjective - Feeling (ex: bewildered, enlightened, unhinged)', 'Profession (ex: chaos coordinator, professional weirdo)', 'Part of Body (ex: funny bone, third eye, soul)', 'Interjection (ex: Bazinga!, Cowabunga!, Yeet!)']
];

function startMadlib() {
    console.log('▶️ startMadlib() called');
    const name = document.getElementById('playerName').value.trim();
    console.log('Name entered:', name);
    
    if (!name) {
        alert('Please enter your name!');
        return;
    }
    
    fetch('/api/player?name=' + encodeURIComponent(name))
        .then(response => response.json())
        .then(data => {
            console.log('Player data:', data);
            
            if (!data.exists) {
                alert('Name not found! Talk to Kyle to get some Kyle Bucks first! 💰');
                return;
            }
            
            if (data.balance < 20) {
                alert('You need at least 20 Kyle Bucks to play! You have ' + data.balance + '. Go spin the wheel!');
                return;
            }
            
            currentPlayerName = name;
            currentBalance = data.balance;
            
            document.getElementById('nameEntry').classList.add('hidden');
            document.getElementById('balanceSection').classList.remove('hidden');
            document.getElementById('playerBalance').textContent = currentBalance;
            
            loadNewPrompts();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error checking player. Try again!');
        });
}

function loadNewPrompts() {
    console.log('📝 Loading new prompts...');
    
    // Pick random template and store the index
    currentTemplateIndex = Math.floor(Math.random() * templates.length);
    currentPrompts = templates[currentTemplateIndex];
    
    console.log('Selected template index:', currentTemplateIndex);
    console.log('Prompts:', currentPrompts);
    
    let html = '';
    for (let i = 0; i < currentPrompts.length; i++) {
        const prompt = currentPrompts[i];
        const parts = prompt.split('(ex:');
        const label = parts[0].trim();
        const example = parts[1] ? parts[1].replace(')', '').trim() : '';
        
        html += '<div class="input-group">';
        html += '<label>' + label + '</label>';
        if (example) {
            html += '<div class="example-text">' + example + '</div>';
        }
        html += '<input type="text" id="madlib-' + i + '" placeholder="Enter your word...">';
        html += '</div>';
    }
    
    document.getElementById('madlibInputs').innerHTML = html;
    document.getElementById('madlibForm').classList.remove('hidden');
}

function generateMadlib() {
    console.log('🎲 Generating madlib...');
    const words = [];
    
    for (let i = 0; i < currentPrompts.length; i++) {
        const input = document.getElementById('madlib-' + i);
        if (!input || !input.value.trim()) {
            alert('Please fill in all the words!');
            return;
        }
        words.push(input.value.trim());
    }
    
    console.log('Words:', words);
    console.log('Sending template index:', currentTemplateIndex);
    
    fetch('/api/madlib', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name: currentPlayerName, 
            words: words,
            templateIndex: currentTemplateIndex // Send the template index!
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Madlib result:', data);
        
        if (!data.success) {
            alert(data.error || 'Failed to generate story!');
            return;
        }
        
        currentBalance = data.newBalance;
        document.getElementById('playerBalance').textContent = currentBalance;
        document.getElementById('madlibStory').innerHTML = data.story;
        document.getElementById('madlibForm').classList.add('hidden');
        document.getElementById('madlibResult').classList.remove('hidden');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error generating story. Try again!');
    });
}

function playAgain() {
    console.log('🔄 Play again clicked');
    if (currentBalance < 20) {
        alert('Not enough Kyle Bucks! You need 20 to play again. You have ' + currentBalance + '.');
        return;
    }
    
    document.getElementById('madlibResult').classList.add('hidden');
    loadNewPrompts();
}

function goBack() {
    console.log('⬅️ Going back to wheel');
    window.location.href = '/';
}

// Attach event listeners
console.log('🔗 Attaching event listeners...');

const startBtn = document.getElementById('startBtn');
const generateBtn = document.getElementById('generateBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const backBtn = document.getElementById('backBtn');

if (startBtn) {
    startBtn.onclick = startMadlib;
    console.log('✅ Start button listener attached');
}

if (generateBtn) {
    generateBtn.onclick = generateMadlib;
    console.log('✅ Generate button listener attached');
}

if (playAgainBtn) {
    playAgainBtn.onclick = playAgain;
    console.log('✅ Play again button listener attached');
}

if (backBtn) {
    backBtn.onclick = goBack;
    console.log('✅ Back button listener attached');
}

console.log('✅ MADLIB SCRIPT LOADED SUCCESSFULLY!');
