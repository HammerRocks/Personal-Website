const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Pac-Man properties
let pacman = {
    x: 200,
    y: 200,
    radius: 20,
    speed: 4,
    angle: 0,
    mouthOpen: true
};

// Dots to collect
let dots = [];
for (let i = 0; i < 10; i++) {
    dots.push({
        x: Math.random() * (canvas.width - 20) + 10,
        y: Math.random() * (canvas.height - 20) + 10,
        radius: 5
    });
}

// Handle keyboard input
let keys = {};
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// Game loop
function update() {
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Move Pac-Man
    if (keys['ArrowUp'] && pacman.y - pacman.radius > 0) {
        pacman.y -= pacman.speed;
        pacman.angle = -Math.PI / 2;
    }
    if (keys['ArrowDown'] && pacman.y + pacman.radius < canvas.height) {
        pacman.y += pacman.speed;
        pacman.angle = Math.PI / 2;
    }
    if (keys['ArrowLeft'] && pacman.x - pacman.radius > 0) {
        pacman.x -= pacman.speed;
        pacman.angle = Math.PI;
    }
    if (keys['ArrowRight'] && pacman.x + pacman.radius < canvas.width) {
        pacman.x += pacman.speed;
        pacman.angle = 0;
    }

    // Draw Pac-Man
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    const mouthAngle = pacman.mouthOpen ? Math.PI / 4 : 0;
    ctx.arc(pacman.x, pacman.y, pacman.radius, pacman.angle + mouthAngle, pacman.angle + 2 * Math.PI - mouthAngle);
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fill();
    ctx.closePath();
    pacman.mouthOpen = !pacman.mouthOpen; // Toggle mouth animation

    // Draw and check dots
    ctx.fillStyle = 'white';
    dots = dots.filter(dot => {
        const dist = Math.hypot(pacman.x - dot.x, pacman.y - dot.y);
        if (dist < pacman.radius + dot.radius) return false; // Dot eaten
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI);
        ctx.fill();
        return true;
    });

    requestAnimationFrame(update);
}

// Start the game
update();