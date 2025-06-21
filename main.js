// main.js - Basic Murder Mystery Game Logic
const gameLog = document.getElementById('game-log');
const gameActions = document.getElementById('game-actions');

const characters = [
    'Professor Plum',
    'Miss Scarlet',
    'Colonel Mustard',
    'Mrs. Peacock',
    'Mr. Green',
    'Ms. Greenwood',
    'Dr. Springfield',
    'Sir Alexander'
];
const locations = ['Kitchen', 'Ballroom', 'Conservatory', 'Dining Room', 'Billiard Room', 'Library', 'Lounge', 'Hall'];
const weapons = ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'];
const evidence = [
    'Candlestick',
    'Rope',
    'Lead Pipe',
    'Revolver',
    'Knife',
    'Wrench',
    'Broken Glass',
    'Muddy Footprints',
    'Torn Fabric',
    'Strange Letter'
];

let murderer = null;
function pickMurderer() {
    let suspects = [...characters];
    murderer = suspects.splice(Math.floor(Math.random() * suspects.length), 1)[0];
}

// Pick murderer at the start
pickMurderer();

// Update solution to use one murderer
let solution = {
    murderer: murderer,
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
            <label>Suspect:
                <select name="suspect" size="${characters.length}">
                    ${characters.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
            </label><br>
            <label>Location:
                <select name="location">
                    ${locations.map(l => `<option value="${l}">${l}</option>`).join('')}
                </select>
            </label><br>
            <label>Weapon or Evidence:
                <select name="weapon">
                    ${evidence.map(w => `<option value="${w}">${w}</option>`).join('')}
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
        const suspect = data.get('suspect');
        checkAccusation(suspect, data.get('location'), data.get('weapon'));
    };
}

function checkAccusation(suspect, location, weapon) {
    if (
        suspect === solution.murderer &&
        location === solution.location &&
        weapon === solution.weapon
    ) {
        log(`<b>Congratulations! You solved the mystery!</b> The murderer was ${solution.murderer} in the ${location} with the ${weapon}.`);
        gameActions.innerHTML = '<button onclick="window.location.reload()">Play Again</button>';
    } else {
        log(`Nope! That is not the correct solution. Try again!`);
        pickHintGivers(); // Pick new hint givers for the next round
    }
}

function showSummary() {
    const summary = `
        <h2>Case Summary</h2>
        <p><b>Victims:</b> Dr. Black, Mr. Adams, Madam Rosemary, and Ms. Alagor were found murdered!</p>
        <p><b>Note:</b> Evidence suggests that the murderer acted alone.</p>
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
    pickHintGivers(); // Pick new hint givers for each round
    gameLog.innerHTML = 'Welcome to the Murder Mystery Game! Make your accusation below.';
    showActions();
}

// Pick two hint-givers (not the murderer) at the start of each round
let hintGivers = [];
function pickHintGivers() {
    const nonMurderers = characters.filter(c => c !== murderer);
    // Shuffle and pick two
    for (let i = nonMurderers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nonMurderers[i], nonMurderers[j]] = [nonMurderers[j], nonMurderers[i]];
    }
    hintGivers = nonMurderers.slice(0, 2);
}
pickHintGivers();

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
    // Two suspects give an obvious hint about the murderer
    if (hintGivers.includes(suspect)) {
        log(`<b>Interview with ${suspect}:</b> I've noticed something odd about ${murderer}. They seemed nervous and avoided eye contact all evening. I have a strong feeling that ${murderer} is not as innocent as they seem.`);
        return;
    }
    // The murderer denies everything
    if (suspect === murderer) {
        log(`<b>Interview with ${suspect}:</b> I don't know anything about what happened. I was nowhere near the scene when it occurred. People are always so quick to point fingers without any real evidence.`);
        return;
    }
    // Generic but more detailed responses for others
    const responses = [
        `"I didn't do it! I was in the ${locations[Math.floor(Math.random()*locations.length)]} reading quietly. I didn't hear or see anything unusual."`,
        `"Why are you asking me? Maybe check the ${weapons[Math.floor(Math.random()*weapons.length)]}. I saw someone near it earlier, but I couldn't see who."`,
        `"I saw someone near the ${locations[Math.floor(Math.random()*locations.length)]}, but it was too dark to make out their face. There was a strange noise, though."`,
        `"I heard a noise in the ${locations[Math.floor(Math.random()*locations.length)]}. It sounded like something heavy falling, but when I checked, no one was there."`,
        `"I have nothing to hide! I was with several people most of the night. If you ask around, they'll confirm it."`
    ];
    log(`<b>Interview with ${suspect}:</b> ${responses[Math.floor(Math.random()*responses.length)]}`);
}

function showEvidenceSection() {
    let html = '<h3>Review Evidence</h3>';
    html += '<ul style="list-style:none;padding:0;">';
    evidence.forEach((item, i) => {
        html += `<li><button onclick="reviewEvidence('${item}')">Examine ${item}</button></li>`;
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
    // Only show signs of struggle for each location
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
    // Special clues for the murder location (clearer, lead to the murderer)
    let specialClue = '';
    if (location === solution.location) {
        // Find the murderer's initials, occupation, and gender for clues
        const murdererName = solution.murderer;
        const murdererInitials = murdererName.split(' ').map(n => n[0]).join('');
        const murdererDetails = {
            'Professor Plum': { occupation: 'professor', gender: 'male' },
            'Miss Scarlet': { occupation: 'actress', gender: 'female' },
            'Colonel Mustard': { occupation: 'military officer', gender: 'male' },
            'Mrs. Peacock': { occupation: 'socialite', gender: 'female' },
            'Mr. Green': { occupation: 'businessman', gender: 'male' },
            'Ms. Greenwood': { occupation: 'botanist', gender: 'female' },
            'Dr. Springfield': { occupation: 'physician', gender: 'male' },
            'Sir Alexander': { occupation: 'historian', gender: 'male' }
        };
        const details = murdererDetails[murdererName] || { occupation: 'guest', gender: 'unknown' };
        const indirectClues = [
            `You find a monogrammed handkerchief with the initials <b>${murdererInitials}</b>.`,
            `There are traces of a rare cologne or perfume often worn by a <b>${details.occupation}</b>.`,
            `A button from an expensive suit or dress, similar to what a <b>${details.occupation}</b> would wear, is found near the scene.`,
            `You notice a footprint that matches the size and style of shoes worn by someone who is <b>${details.gender}</b>.`,
            `A faint scent of tobacco or a lipstick stain is found on a glass nearby, reminiscent of a <b>${details.gender}</b> guest.`,
            `There are signs that someone left in a hurry, knocking over a chair and leaving behind a personal item belonging to a <b>${details.gender}</b> <b>${details.occupation}</b>.`,
            `A note with a cryptic message is found, hinting at a secret related to a <b>${details.gender}</b> <b>${details.occupation}</b>.`,
            `You find a torn piece of fabric that matches the clothing style of a <b>${details.gender}</b> <b>${details.occupation}</b>.`,
            `There are muddy footprints leading away from the scene, matching the shoes of a <b>${details.gender}</b> guest.`
        ];
        specialClue = `<br><b>Special Clue:</b> ${indirectClues[Math.floor(Math.random()*indirectClues.length)]}`;
    }
    const area = struggleAreas[Math.floor(Math.random()*struggleAreas.length)];
    log(`<b>Location: ${location}</b><br>Signs of struggle: <i>${area}</i>.${specialClue}`);
}

// Show summary on load
showSummary();
