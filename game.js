// Game State
let gameState = {
    currentStage: null,
    gameRunning: false,
    gamePaused: false,
    score: 0,
    combo: 0,
    maxCombo: 0,
    hits: { perfect: 0, great: 0, good: 0, missed: 0 },
    currentTime: 0,
    calibrationOffset: 0,
};

// Settings
let settings = {
    perfectWindow: 100,
    greatWindow: 150,
    goodWindow: 250,
    soundEnabled: true,
    particlesEnabled: true,
    showHitFeedback: true,
};

// Game Stages (6 difficulty levels)
const stages = [
    {
        id: 1,
        name: "Tutorial",
        difficulty: "1★",
        bpm: 120,
        notes: [
            { time: 1000, lane: 2, type: 'normal' },
            { time: 1500, lane: 2, type: 'normal' },
            { time: 2000, lane: 2, type: 'normal' },
            { time: 2500, lane: 2, type: 'normal' },
            { time: 3000, lane: 1, type: 'normal' },
            { time: 3500, lane: 1, type: 'normal' },
            { time: 4000, lane: 3, type: 'normal' },
            { time: 4500, lane: 4, type: 'normal' },
            { time: 5000, lane: 5, type: 'normal' },
            { time: 5500, lane: 3, type: 'long', duration: 1000 },
            { time: 7000, lane: 2, type: 'normal' },
            { time: 7500, lane: 2, type: 'normal' },
            { time: 8000, lane: 2, type: 'normal' },
            { time: 8500, lane: 2, type: 'long', duration: 1500 },
        ]
    },
    {
        id: 2,
        name: "Rising Beats",
        difficulty: "2★",
        bpm: 128,
        notes: [
            { time: 800, lane: 2, type: 'normal' },
            { time: 1200, lane: 3, type: 'normal' },
            { time: 1600, lane: 2, type: 'normal' },
            { time: 2000, lane: 3, type: 'normal' },
            { time: 2400, lane: 1, type: 'normal' },
            { time: 2800, lane: 4, type: 'normal' },
            { time: 3200, lane: 5, type: 'normal' },
            { time: 3600, lane: 3, type: 'long', duration: 1200 },
            { time: 4800, lane: 2, type: 'normal' },
            { time: 5200, lane: 3, type: 'normal' },
            { time: 5600, lane: 2, type: 'normal' },
            { time: 6000, lane: 4, type: 'long', duration: 1000 },
            { time: 7000, lane: 1, type: 'normal' },
            { time: 7400, lane: 2, type: 'normal' },
            { time: 7800, lane: 3, type: 'normal' },
            { time: 8200, lane: 4, type: 'normal' },
            { time: 8600, lane: 5, type: 'normal' },
        ]
    },
    {
        id: 3,
        name: "Momentum",
        difficulty: "3★",
        bpm: 135,
        notes: [
            { time: 600, lane: 2, type: 'normal' },
            { time: 900, lane: 3, type: 'normal' },
            { time: 1200, lane: 2, type: 'normal' },
            { time: 1500, lane: 1, type: 'normal' },
            { time: 1800, lane: 3, type: 'normal' },
            { time: 2100, lane: 4, type: 'normal' },
            { time: 2400, lane: 2, type: 'long', duration: 1200 },
            { time: 3600, lane: 3, type: 'normal' },
            { time: 3900, lane: 5, type: 'normal' },
            { time: 4200, lane: 1, type: 'normal' },
            { time: 4500, lane: 2, type: 'normal' },
            { time: 4800, lane: 3, type: 'long', duration: 1500 },
            { time: 6300, lane: 4, type: 'normal' },
            { time: 6600, lane: 2, type: 'normal' },
            { time: 6900, lane: 5, type: 'normal' },
            { time: 7200, lane: 3, type: 'normal' },
            { time: 7500, lane: 1, type: 'long', duration: 1200 },
            { time: 8700, lane: 2, type: 'normal' },
            { time: 9000, lane: 4, type: 'normal' },
        ]
    },
    {
        id: 4,
        name: "Intensity Peak",
        difficulty: "4★",
        bpm: 140,
        notes: [
            { time: 500, lane: 2, type: 'normal' },
            { time: 750, lane: 3, type: 'normal' },
            { time: 1000, lane: 2, type: 'normal' },
            { time: 1250, lane: 1, type: 'normal' },
            { time: 1500, lane: 4, type: 'normal' },
            { time: 1750, lane: 3, type: 'normal' },
            { time: 2000, lane: 5, type: 'normal' },
            { time: 2250, lane: 2, type: 'long', duration: 1000 },
            { time: 3250, lane: 1, type: 'normal' },
            { time: 3500, lane: 3, type: 'normal' },
            { time: 3750, lane: 2, type: 'normal' },
            { time: 4000, lane: 4, type: 'normal' },
            { time: 4250, lane: 5, type: 'normal' },
            { time: 4500, lane: 3, type: 'long', duration: 1200 },
            { time: 5700, lane: 2, type: 'normal' },
            { time: 5950, lane: 4, type: 'normal' },
            { time: 6200, lane: 1, type: 'normal' },
            { time: 6450, lane: 5, type: 'normal' },
            { time: 6700, lane: 3, type: 'long', duration: 1500 },
            { time: 8200, lane: 2, type: 'normal' },
        ]
    },
    {
        id: 5,
        name: "Overdrive",
        difficulty: "5★",
        bpm: 150,
        notes: [
            { time: 400, lane: 2, type: 'normal' },
            { time: 600, lane: 3, type: 'normal' },
            { time: 800, lane: 2, type: 'normal' },
            { time: 1000, lane: 1, type: 'normal' },
            { time: 1200, lane: 4, type: 'normal' },
            { time: 1400, lane: 5, type: 'normal' },
            { time: 1600, lane: 3, type: 'normal' },
            { time: 1800, lane: 2, type: 'long', duration: 1000 },
            { time: 2800, lane: 4, type: 'normal' },
            { time: 3000, lane: 1, type: 'normal' },
            { time: 3200, lane: 5, type: 'normal' },
            { time: 3400, lane: 2, type: 'normal' },
            { time: 3600, lane: 3, type: 'normal' },
            { time: 3800, lane: 4, type: 'long', duration: 1200 },
            { time: 5000, lane: 1, type: 'normal' },
            { time: 5200, lane: 2, type: 'normal' },
            { time: 5400, lane: 3, type: 'normal' },
            { time: 5600, lane: 5, type: 'normal' },
            { time: 5800, lane: 4, type: 'normal' },
            { time: 6000, lane: 2, type: 'long', duration: 1500 },
        ]
    },
    {
        id: 6,
        name: "Apocalypse",
        difficulty: "EX",
        bpm: 160,
        notes: [
            { time: 300, lane: 2, type: 'normal' },
            { time: 500, lane: 3, type: 'normal' },
            { time: 700, lane: 2, type: 'normal' },
            { time: 900, lane: 1, type: 'normal' },
            { time: 1100, lane: 4, type: 'normal' },
            { time: 1300, lane: 5, type: 'normal' },
            { time: 1500, lane: 3, type: 'normal' },
            { time: 1700, lane: 2, type: 'normal' },
            { time: 1900, lane: 4, type: 'long', duration: 800 },
            { time: 2700, lane: 1, type: 'normal' },
            { time: 2900, lane: 5, type: 'normal' },
            { time: 3100, lane: 2, type: 'normal' },
            { time: 3300, lane: 3, type: 'normal' },
            { time: 3500, lane: 4, type: 'normal' },
            { time: 3700, lane: 5, type: 'long', duration: 1200 },
            { time: 4900, lane: 2, type: 'normal' },
            { time: 5100, lane: 1, type: 'normal' },
            { time: 5300, lane: 3, type: 'normal' },
            { time: 5500, lane: 4, type: 'normal' },
            { time: 5700, lane: 5, type: 'normal' },
        ]
    }
];

// Canvas and Game Variables
let canvas, ctx;
const LANE_WIDTH = 120;
const LANE_HEIGHT = 600;
const HIT_POSITION = 550;
const LANE_SPACING = 20;
let gameStartTime = 0;
let pausedTime = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // Load settings
    loadSettings();
    
    // Setup keyboard listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    // Update slider displays
    ['perfectWindow', 'greatWindow', 'goodWindow'].forEach(id => {
        const elem = document.getElementById(id);
        elem.addEventListener('input', (e) => {
            settings[id] = parseInt(e.target.value);
            document.getElementById(id + 'Value').textContent = e.target.value;
            saveSettings();
        });
    });
    
    // Settings checkboxes
    document.getElementById('soundEnabled').addEventListener('change', (e) => {
        settings.soundEnabled = e.target.checked;
        saveSettings();
    });
    document.getElementById('particlesEnabled').addEventListener('change', (e) => {
        settings.particlesEnabled = e.target.checked;
        saveSettings();
    });
    document.getElementById('showHitFeedback').addEventListener('change', (e) => {
        settings.showHitFeedback = e.target.checked;
        saveSettings();
    });
});

// Menu Navigation
function showMainMenu() {
    document.getElementById('mainMenu').classList.remove('hidden');
    document.getElementById('stageSelect').classList.add('hidden');
    document.getElementById('settingsMenu').classList.add('hidden');
    document.getElementById('controlsMenu').classList.add('hidden');
    document.getElementById('gameScreen').classList.add('hidden');
}

function showStageSelect() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('stageSelect').classList.remove('hidden');
    populateStages();
}

function showSettings() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('settingsMenu').classList.remove('hidden');
    updateSettingsDisplay();
}

function showControls() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('controlsMenu').classList.remove('hidden');
}

function populateStages() {
    const grid = document.getElementById('stageGrid');
    grid.innerHTML = '';
    stages.forEach(stage => {
        const card = document.createElement('div');
        card.className = 'stage-card';
        card.innerHTML = `<h3>${stage.name}</h3><p class="stage-difficulty">${stage.difficulty}</p>`;
        card.onclick = () => startGame(stage.id);
        grid.appendChild(card);
    });
}

function updateSettingsDisplay() {
    document.getElementById('perfectWindow').value = settings.perfectWindow;
    document.getElementById('perfectWindowValue').textContent = settings.perfectWindow;
    document.getElementById('greatWindow').value = settings.greatWindow;
    document.getElementById('greatWindowValue').textContent = settings.greatWindow;
    document.getElementById('goodWindow').value = settings.goodWindow;
    document.getElementById('goodWindowValue').textContent = settings.goodWindow;
    document.getElementById('soundEnabled').checked = settings.soundEnabled;
    document.getElementById('particlesEnabled').checked = settings.particlesEnabled;
    document.getElementById('showHitFeedback').checked = settings.showHitFeedback;
}

// Auto-Calibration
function startAutoCalibrate() {
    const status = document.getElementById('calibrateStatus');
    status.innerHTML = '<p>Starting calibration... Press keys when you see notes!</p>';
    
    let calibrationSamples = [];
    const calibrationStage = {
        notes: [
            { time: 2000, lane: 2 },
            { time: 4000, lane: 2 },
            { time: 6000, lane: 2 }
        ]
    };
    
    let startTime = Date.now();
    let calibrationComplete = false;
    
    function calibrationLoop() {
        const elapsed = Date.now() - startTime;
        ctx.fillStyle = 'rgba(26, 26, 46, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Calibration Mode', canvas.width / 2, 100);
        
        // Draw lanes
        drawLanes();
        
        // Draw notes
        calibrationStage.notes.forEach(note => {
            const noteY = HIT_POSITION - (elapsed - note.time) * 0.3;
            if (noteY > -50 && noteY < canvas.height + 50) {
                drawNote(note.lane, noteY, 50);
            }
        });
        
        // Draw hit line
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, HIT_POSITION);
        ctx.lineTo(canvas.width, HIT_POSITION);
        ctx.stroke();
        
        if (!calibrationComplete && elapsed < 7000) {
            requestAnimationFrame(calibrationLoop);
        } else if (!calibrationComplete) {
            calibrationComplete = true;
            if (calibrationSamples.length > 0) {
                const avgOffset = calibrationSamples.reduce((a, b) => a + b) / calibrationSamples.length;
                gameState.calibrationOffset = avgOffset;
                status.innerHTML = `<p style="color: #00ff00;">Calibration complete! Offset: ${avgOffset.toFixed(0)}ms</p>`;
            } else {
                status.innerHTML = `<p style="color: #ffaa00;">No inputs detected. Try again!</p>`;
            }
        }
    }
    
    // Track key presses during calibration
    const tempKeyHandler = (e) => {
        const now = Date.now() - startTime;
        const lane = getLaneFromKey(e.key);
        if (lane) {
            const nextNote = calibrationStage.notes.find(n => Math.abs(n.time - now) < 500);
            if (nextNote) {
                calibrationSamples.push(now - nextNote.time);
            }
        }
    };
    
    document.addEventListener('keydown', tempKeyHandler);
    calibrationLoop();
    
    setTimeout(() => {
        document.removeEventListener('keydown', tempKeyHandler);
    }, 7500);
}

// Game Logic
function startGame(stageId) {
    gameState.currentStage = stages.find(s => s.id === stageId);
    gameState.gameRunning = true;
    gameState.gamePaused = false;
    gameState.score = 0;
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.hits = { perfect: 0, great: 0, good: 0, missed: 0 };
    gameState.currentTime = 0;
    
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('stageSelect').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    document.getElementById('pauseMenu').classList.add('hidden');
    document.getElementById('resultScreen').classList.add('hidden');
    
    document.getElementById('stageName').textContent = gameState.currentStage.name + ' - ' + gameState.currentStage.difficulty;
    
    gameStartTime = Date.now();
    pausedTime = 0;
    gameLoop();
}

function gameLoop() {
    if (!gameState.gameRunning) return;
    
    if (gameState.gamePaused) {
        setTimeout(gameLoop, 16);
        return;
    }
    
    gameState.currentTime = Date.now() - gameStartTime - pausedTime;
    
    // Draw game
    drawGame();
    
    // Check for missed notes
    checkMissedNotes();
    
    // Update UI
    updateHUD();
    
    // Check if song is finished
    const maxNoteTime = Math.max(...gameState.currentStage.notes.map(n => n.time + (n.duration || 0)));
    if (gameState.currentTime > maxNoteTime + 2000) {
        endGame();
        return;
    }
    
    requestAnimationFrame(gameLoop);
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = 'rgba(10, 10, 10, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw lanes
    drawLanes();
    
    // Draw hit line
    ctx.strokeStyle = '#ffaa00';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, HIT_POSITION);
    ctx.lineTo(canvas.width, HIT_POSITION);
    ctx.stroke();
    
    // Draw notes
    gameState.currentStage.notes.forEach((note, index) => {
        const timeDiff = gameState.currentTime - note.time;
        
        // Only draw notes that haven't been completely missed
        if (timeDiff < 500 || (!note.pressed && timeDiff < 500 + settings.goodWindow)) {
            const noteY = HIT_POSITION - timeDiff * 0.3;
            
            if (note.type === 'long') {
                drawLongNote(note.lane, noteY, note.duration * 0.3, note.pressed);
            } else {
                drawNote(note.lane, noteY, 50, note.pressed);
            }
        }
    });
}

function drawLanes() {
    const lanes = 5;
    const totalWidth = lanes * LANE_WIDTH + (lanes - 1) * LANE_SPACING;
    const startX = (canvas.width - totalWidth) / 2;
    
    for (let i = 0; i < lanes; i++) {
        const x = startX + i * (LANE_WIDTH + LANE_SPACING);
        
        // Lane background
        ctx.fillStyle = 'rgba(0, 212, 255, 0.1)';
        ctx.fillRect(x, 0, LANE_WIDTH, canvas.height);
        
        // Lane border
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, 0, LANE_WIDTH, canvas.height);
    }
}

function drawNote(lane, y, height, pressed = false) {
    const lanes = 5;
    const totalWidth = lanes * LANE_WIDTH + (lanes - 1) * LANE_SPACING;
    const startX = (canvas.width - totalWidth) / 2;
    const x = startX + (lane - 1) * (LANE_WIDTH + LANE_SPACING) + LANE_SPACING / 2;
    
    if (pressed) {
        ctx.fillStyle = '#ffaa00';
    } else {
        ctx.fillStyle = '#00d4ff';
    }
    
    ctx.fillRect(x, y, LANE_WIDTH - LANE_SPACING, height);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, LANE_WIDTH - LANE_SPACING, height);
}

function drawLongNote(lane, startY, length, pressed = false) {
    const lanes = 5;
    const totalWidth = lanes * LANE_WIDTH + (lanes - 1) * LANE_SPACING;
    const startX = (canvas.width - totalWidth) / 2;
    const x = startX + (lane - 1) * (LANE_WIDTH + LANE_SPACING) + LANE_SPACING / 2;
    
    const noteWidth = LANE_WIDTH - LANE_SPACING;
    
    // Draw long note body
    if (pressed) {
        ctx.fillStyle = 'rgba(255, 170, 0, 0.6)';
    } else {
        ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
    }
    ctx.fillRect(x, startY, noteWidth, Math.max(length, 20));
    
    // Draw top cap
    ctx.fillStyle = pressed ? '#ffaa00' : '#00d4ff';
    ctx.fillRect(x, startY, noteWidth, 10);
    
    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, startY, noteWidth, Math.max(length, 20));
}

function getLaneFromKey(key) {
    const laneMap = {
        'd': 1, 'D': 1,
        'f': 2, 'F': 2,
        ' ': 3,
        'j': 4, 'J': 4,
        'k': 5, 'K': 5,
    };
    return laneMap[key];
}

function handleKeyDown(e) {
    const lane = getLaneFromKey(e.key);
    
    if (e.key.toLowerCase() === 'p' || e.key === 'Escape') {
        if (gameState.gameRunning && !gameState.gamePaused) {
            pauseGame();
        }
        return;
    }
    
    if (!gameState.gameRunning || gameState.gamePaused || !lane) return;
    
    // Find the best note to hit in this lane
    let bestNote = null;
    let bestDiff = Infinity;
    
    gameState.currentStage.notes.forEach(note => {
        if (note.lane === lane && !note.pressed) {
            const timeDiff = Math.abs(gameState.currentTime - note.time);
            if (timeDiff < bestDiff && timeDiff < settings.goodWindow) {
                bestNote = note;
                bestDiff = timeDiff;
            }
        }
    });
    
    // Handle long notes
    gameState.currentStage.notes.forEach(note => {
        if (note.type === 'long' && note.lane === lane && !note.pressed) {
            const timeDiff = gameState.currentTime - note.time;
            const endTime = note.time + note.duration;
            
            // Can press long notes from start until 100ms after bottom
            if (gameState.currentTime >= note.time && gameState.currentTime <= endTime + 100) {
                if (!bestNote || timeDiff < bestDiff) {
                    bestNote = note;
                    bestDiff = Math.abs(timeDiff);
                }
            }
        }
    });
    
    if (bestNote) {
        const timeDiff = Math.abs(gameState.currentTime - bestNote.time);
        let hitType = null;
        let points = 0;
        
        if (timeDiff <= settings.perfectWindow) {
            hitType = 'perfect';
            points = 300;
            gameState.hits.perfect++;
        } else if (timeDiff <= settings.greatWindow) {
            hitType = 'great';
            points = 200;
            gameState.hits.great++;
        } else if (timeDiff <= settings.goodWindow) {
            hitType = 'good';
            points = 100;
            gameState.hits.good++;
        }
        
        if (hitType) {
            bestNote.pressed = true;
            gameState.score += points;
            gameState.combo++;
            gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);
            
            if (settings.showHitFeedback) {
                showHitFeedback(hitType, bestNote.lane);
            }
        }
    }
}

function handleKeyUp(e) {
    // Could be used for long note release
}

function showHitFeedback(hitType, lane) {
    const lanes = 5;
    const totalWidth = lanes * LANE_WIDTH + (lanes - 1) * LANE_SPACING;
    const startX = (canvas.width - totalWidth) / 2;
    const x = startX + (lane - 1) * (LANE_WIDTH + LANE_SPACING) + LANE_WIDTH / 2;
    
    // Visual feedback
    const colors = { perfect: '#ffff00', great: '#00ff00', good: '#0099ff' };
    ctx.fillStyle = colors[hitType];
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(hitType.toUpperCase(), x, HIT_POSITION - 60);
}

function checkMissedNotes() {
    gameState.currentStage.notes.forEach(note => {
        if (!note.pressed && note.type === 'normal') {
            const timeDiff = gameState.currentTime - note.time;
            if (timeDiff > settings.goodWindow) {
                note.pressed = true;
                gameState.hits.missed++;
                gameState.combo = 0;
            }
        } else if (!note.pressed && note.type === 'long') {
            const endTime = note.time + note.duration;
            // Only mark as missed if current time is past the end + grace period
            if (gameState.currentTime > endTime + 100) {
                note.pressed = true;
                gameState.hits.missed++;
                gameState.combo = 0;
            }
        }
    });
}

function updateHUD() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('combo').textContent = gameState.combo;
    
    const totalHits = gameState.hits.perfect + gameState.hits.great + gameState.hits.good;
    const totalAttempts = totalHits + gameState.hits.missed;
    const accuracy = totalAttempts > 0 ? ((totalHits / totalAttempts) * 100).toFixed(1) : '0';
    document.getElementById('accuracy').textContent = accuracy + '%';
}

function pauseGame() {
    gameState.gamePaused = true;
    pausedTime = Date.now() - gameStartTime;
    document.getElementById('pauseMenu').classList.remove('hidden');
}

function resumeGame() {
    gameState.gamePaused = false;
    gameStartTime = Date.now() - pausedTime;
    document.getElementById('pauseMenu').classList.add('hidden');
    gameLoop();
}

function exitGame() {
    gameState.gameRunning = false;
    document.getElementById('gameScreen').classList.add('hidden');
    showMainMenu();
}

function endGame() {
    gameState.gameRunning = false;
    showResultScreen();
}

function showResultScreen() {
    document.getElementById('resultScreen').classList.remove('hidden');
    
    const totalHits = gameState.hits.perfect + gameState.hits.great + gameState.hits.good;
    const totalAttempts = totalHits + gameState.hits.missed;
    const accuracy = totalAttempts > 0 ? ((totalHits / totalAttempts) * 100).toFixed(1) : '0';
    
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('finalCombo').textContent = gameState.maxCombo;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('resultPerfect').textContent = gameState.hits.perfect;
    document.getElementById('resultGreat').textContent = gameState.hits.great;
    document.getElementById('resultGood').textContent = gameState.hits.good;
    document.getElementById('resultMissed').textContent = gameState.hits.missed;
}

// Settings Storage
function saveSettings() {
    localStorage.setItem('djmaxSettings', JSON.stringify(settings));
}

function loadSettings() {
    const saved = localStorage.getItem('djmaxSettings');
    if (saved) {
        Object.assign(settings, JSON.parse(saved));
        updateSettingsDisplay();
    }
}
