// Immediately log to console to prove script is running
console.log('🎭 MADLIB SCRIPT STARTING...');

let currentPlayerName = '';
let currentBalance = 0;
let currentPrompts = [];

const templates = [
    ['Adjective (ex: sparkly, weird, gigantic)', 'Noun - Plural (ex: staplers, donuts, emails)', 'Verb - Past Tense (ex: exploded, danced, screamed)', 'Profession (ex: astronaut, plumber, CEO)'],
    ['Person\'s Name (ex: Taylor Swift, Elon Musk)', 'Verb ending in -ing (ex: juggling, typing, screaming)', 'Animal (ex: llama, penguin, goldfish)', 'Color (ex: neon pink, muddy brown)'],
    ['Adjective - Feeling (ex: anxious, thrilled, confused)', 'Part of Body (ex: elbow, left pinky toe)', 'Silly Word (ex: blorp, yeet, flibbertigibbet)', 'Interjection (ex: Yikes!, Holy moly!, Zoinks!)'],
    ['Number (ex: seventeen, 420, one million)', 'Noun - Plural (ex: coffee mugs, keyboards, chairs)', 'Place (ex: the parking lot, Antarctica, Dave\'s desk)', 'Adverb (ex: mysteriously, frantically, slowly)'],
    ['Verb - Past Tense (ex: teleported, yodeled, exploded)', 'Animal (ex: ferret, peacock, hamster)', 'Piece of Clothing (ex: tube sock, Hawaiian shirt)', 'Profession (ex: ninja, barista, detective)']
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
    currentPrompts = templates[Math.floor(Math.random() * templates.length)];
    
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
    
    fetch('/api/madlib', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: currentPlayerName, words: words })
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
