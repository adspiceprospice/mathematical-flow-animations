const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gradientToggle = document.getElementById('gradientToggle');
const colorSpeedInput = document.getElementById('colorSpeed');
const patternSelect = document.getElementById('patternSelect');

function resizeCanvas() {
    canvas.width = 400;
    canvas.height = 400;
}
resizeCanvas();

let mouseX = 200;
let mouseY = 200;
let isMouseOver = false;

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener('mouseenter', () => {
    isMouseOver = true;
});

canvas.addEventListener('mouseleave', () => {
    isMouseOver = false;
});

function mag(x, y) {
    return Math.sqrt(x * x + y * y);
}

function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

let t = 0;
let colorT = 0;

function applyMouseAttraction(point) {
    if (!isMouseOver) return point;

    const dx = mouseX - point.x;
    const dy = mouseY - point.y;
    const dist = mag(dx, dy);
    const force = Math.max(0, 1 - dist / 100) * 0.2;

    return {
        x: point.x + dx * force,
        y: point.y + dy * force
    };
}

function calculateFlowWave(x, y) {
    const k = x / 4 - 12.5;
    const e = y / 9;
    const o = mag(k, e) / 9;
    
    const innerWave = Math.cos(e * 9) / 3 + Math.cos(y / 9) / 0.7;
    const q = x + 99 + Math.cos(9 / k) + o * k * innerWave * Math.sin(o * 4 - t);
    const c = o * e / 30 - t / 8;
    
    const px = q * 0.7 * Math.sin(c) + 200;
    const py = 200 + y / 9 * Math.cos(c * 4 - t / 2) - q / 2 * Math.cos(c);
    
    return applyMouseAttraction({ x: px, y: py });
}

function calculateVortexField(x, y) {
    const dx = x - 50;
    const dy = y - 75;
    const r = mag(dx, dy) / 8;
    const theta = Math.atan2(dy, dx);
    
    const vortex1 = Math.sin(r - t * 2) * Math.cos(theta * 3);
    const vortex2 = Math.cos(r + t) * Math.sin(theta * 2 + t);
    const vortex3 = Math.sin(theta * 4 - t) * Math.cos(r * 0.5);
    
    const fieldStrength = vortex1 * vortex2 + vortex3;
    const twist = Math.sin(r * 0.5 + t) * Math.PI;
    
    const px = 200 + (dx * Math.cos(twist) - dy * Math.sin(twist)) * fieldStrength;
    const py = 200 + (dx * Math.sin(twist) + dy * Math.cos(twist)) * fieldStrength;
    
    return applyMouseAttraction({ x: px, y: py });
}

function calculateQuantumField(x, y) {
    const fx = x / 25 - 2;
    const fy = y / 25 - 2;
    
    const wave1 = Math.sin(fx * 2 + t) * Math.cos(fy * 2 - t);
    const wave2 = Math.cos(fx * 3 - t * 1.5) * Math.sin(fy * 3 + t * 0.5);
    
    const px = 200 + (wave1 * 50 + Math.sin(fx * fy + t) * 30);
    const py = 200 + (wave2 * 50 + Math.cos(fx * fy - t) * 30);
    
    return applyMouseAttraction({ x: px, y: py });
}

function calculatePoint(x, y) {
    const pattern = parseInt(patternSelect.value);
    switch(pattern) {
        case 0: return calculateFlowWave(x, y);
        case 1: return calculateVortexField(x, y);
        case 2: return calculateQuantumField(x, y * 0.4);
        default: return calculateFlowWave(x, y);
    }
}

function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const baseHue = (Math.sin(colorT) + 1) / 2;
    const secondHue = (baseHue + 0.3) % 1;
    
    const pattern = parseInt(patternSelect.value);
    const particleCount = pattern === 1 ? 20000 : 30000;
    
    for (let i = 0; i < particleCount; i++) {
        const x = i % 100;
        const y = i / 150;
        try {
            const point = calculatePoint(x, y);
            if (isFinite(point.x) && isFinite(point.y)) {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 0.5, 0, Math.PI * 2);
                
                if (gradientToggle.checked) {
                    const normalizedX = point.x / canvas.width;
                    const normalizedY = point.y / canvas.height;
                    const hue = (baseHue + (secondHue - baseHue) * (normalizedX + normalizedY) / 2) % 1;
                    const [r, g, b] = hslToRgb(hue, 0.8, 0.6);
                    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                } else {
                    ctx.fillStyle = 'white';
                }
                
                ctx.fill();
            }
        } catch (e) {
            continue;
        }
    }

    t += Math.PI / 60;
    if (gradientToggle.checked) {
        colorT += parseFloat(colorSpeedInput.value) / 1000;
    }
    requestAnimationFrame(draw);
}

draw();