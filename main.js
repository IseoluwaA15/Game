// main.js - Basic Murder Mystery Game Logic
const gameLog = document.getElementById('game-log');
const gameActions = document.getElementById('game-actions');

const characters = [
    'Ms. Greenwood',
    'Mr. Adams',
    'Dr. Springfield',
    'Madam Rosemary',
    'Sir Alexander',
    'Ms. Alagor'
];
const locations = ['Kitchen', 'Ballroom', 'Conservatory', 'Dining Room', 'Billiard Room', 'Library', 'Lounge', 'Hall'];
const weapons = ['Candlestick', 'Dagger', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'];

let murderers = [];
function pickMurderers() {
    let suspects = [...characters];
    // Pick two unique murderers
    const first = suspects.splice(Math.floor(Math.random() * suspects.length), 1)[0];
    const second = suspects.splice(Math.floor(Math.random() * suspects.length), 1)[0];
    murderers = [first, second];
}

// Pick murderers at the start
pickMurderers();

// Update solution to use two murderers
let solution = {
    murderers: murderers,
    location: locations[Math.floor(Math.random() * locations.length)],
    weapon: weapons[Math.floor(Math.random() * weapons.length)]
};

function log(message) {
    gameLog.innerHTML += `<div>${message}</div>`;
}

function showActions() {
    gameActions.innerHTML = `
        <h3>Make an Accusation</h3>
        <form id="accuse-form">
            <label>Suspects (hold Ctrl or Cmd to select two):
                <select name="suspect" multiple size="${characters.length}">
                    ${characters.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
            </label><br>
            <label>Location:
                <select name="location">
                    ${locations.map(l => `<option value="${l}">${l}</option>`).join('')}
                </select>
            </label><br>
            <label>Weapon:
                <select name="weapon">
                    ${weapons.map(w => `<option value="${w}">${w}</option>`).join('')}
                </select>
            </label><br>
            <button type="submit">Accuse!</button>
        </form>
        <button onclick="showInterviewSection()">Interview a Suspect</button>
        <button onclick="showEvidenceSection()">Review Evidence</button>
        <button onclick="showLocationSection()">Examine a Location</button>
    `;
    document.getElementById('accuse-form').onsubmit = function(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const suspects = Array.from(e.target.elements['suspect'].selectedOptions).map(opt => opt.value).join(',');
        checkAccusation(suspects, data.get('location'), data.get('weapon'));
    };
}

function checkAccusation(suspect, location, weapon) {
    // Accept if either murderer is accused, but only if both are selected
    const accused = suspect.split(',').map(s => s.trim());
    if (
        accused.length === 2 &&
        accused.includes(solution.murderers[0]) &&
        accused.includes(solution.murderers[1]) &&
        location === solution.location &&
        weapon === solution.weapon
    ) {
        log(`<b>Congratulations! You solved the mystery!</b> The murderers were ${solution.murderers.join(' and ')} in the ${location} with the ${weapon}.`);
        gameActions.innerHTML = '<button onclick="window.location.reload()">Play Again</button>';
    } else {
        log(`Nope! That is not the correct solution. Try again!`);
    }
}

function showSummary() {
    const summary = `
        <h2>Case Summary</h2>
        <p><b>Victims:</b> Dr. Black, Mr. Adams, Madam Rosemary, and Ms. Alagor were found murdered!</p>
        <p><b>Note:</b> Evidence suggests that two of the murderers worked together.</p>
        <p><b>Suspects:</b> ${characters.join(', ')}</p>
        <p><b>Locations:</b> ${locations.join(', ')}</p>
        <p><b>Possible Weapons (Evidence):</b> ${weapons.join(', ')}</p>
        <hr>
        <button onclick="startGame()">Start Investigation</button>
    `;
    gameLog.innerHTML = summary;
    gameActions.innerHTML = '';
}

function startGame() {
    gameLog.innerHTML = 'Welcome to the Murder Mystery Game! Make your accusation below.';
    showActions();
}

function showInterviewSection() {
    let html = '<h3>Interview a Suspect</h3>';
    html += '<ul style="list-style:none;padding:0;">';
    characters.forEach((c, i) => {
        html += `<li><button onclick="interviewSuspect('${c}')">Interview ${c}</button></li>`;
    });
    html += '</ul>';
    gameActions.innerHTML = html + '<button onclick="showActions()">Back to Accusation</button>';
}

function interviewSuspect(suspect) {
    // Simple random responses for demo; you can expand with real clues
    const responses = [
        `"I didn't do it! I was in the ${locations[Math.floor(Math.random()*locations.length)]}."`,
        `"Why are you asking me? Maybe check the ${weapons[Math.floor(Math.random()*weapons.length)]}."`,
        `"I saw someone near the ${locations[Math.floor(Math.random()*locations.length)]}."`,
        `"I heard a noise in the ${locations[Math.floor(Math.random()*locations.length)]}."`,
        `"I have nothing to hide!"`
    ];
    log(`<b>Interview with ${suspect}:</b> ${responses[Math.floor(Math.random()*responses.length)]}`);
}

function showEvidenceSection() {
    let html = '<h3>Review Evidence</h3>';
    html += '<ul style="list-style:none;padding:0;">';
    weapons.forEach((w, i) => {
        html += `<li><button onclick="reviewEvidence('${w}')">Examine ${w}</button></li>`;
    });
    html += '</ul>';
    gameActions.innerHTML = html + '<button onclick="showActions()">Back to Accusation</button>';
}

function reviewEvidence(weapon) {
    // Simple random clues for demo; you can expand with real clues
    const clues = [
        `You find fingerprints on the ${weapon}.`,
        `The ${weapon} appears recently cleaned.`,
        `There are traces of blood on the ${weapon}.`,
        `The ${weapon} is missing from its usual place.`,
        `No obvious signs of use on the ${weapon}.`
    ];
    log(`<b>Evidence: ${weapon}</b> — ${clues[Math.floor(Math.random()*clues.length)]}`);
}

function showLocationSection() {
    let html = '<h3>Examine a Location</h3>';
    html += '<ul style="list-style:none;padding:0;">';
    locations.forEach((l, i) => {
        html += `<li><button onclick="examineLocation('${l}')">Examine ${l}</button></li>`;
    });
    html += '</ul>';
    gameActions.innerHTML = html + '<button onclick="showActions()">Back to Accusation</button>';
}

function examineLocation(location) {
    // More detailed clues for each location
    const missingItems = [
        'a valuable painting',
        'a candlestick',
        'a set of keys',
        'a glass',
        'a book',
        'a vase',
        'a clock',
        'a letter'
    ];
    const struggleAreas = [
        'near the window',
        'by the fireplace',
        'at the entrance',
        'beside the sofa',
        'under the table',
        'next to the bookshelf',
        'in the corner',
        'by the door'
    ];
    const clues = [
        `You notice signs of a struggle in the ${location}, especially ${struggleAreas[Math.floor(Math.random()*struggleAreas.length)]}.`,
        `Something seems to be missing from the ${location}: ${missingItems[Math.floor(Math.random()*missingItems.length)]}.`,
        `There are muddy footprints in the ${location}, mostly ${struggleAreas[Math.floor(Math.random()*struggleAreas.length)]}.`,
        `A broken object lies on the floor in the ${location}, close to ${struggleAreas[Math.floor(Math.random()*struggleAreas.length)]}.`,
        `The ${location} appears undisturbed.`
    ];
    // Always show both missing item and struggle area for more detail
    const item = missingItems[Math.floor(Math.random()*missingItems.length)];
    const area = struggleAreas[Math.floor(Math.random()*struggleAreas.length)];
    log(`<b>Location: ${location}</b><br>Missing item: <i>${item}</i>.<br>Signs of struggle: <i>${area}</i>.`);
}

// Show summary on load
showSummary();
