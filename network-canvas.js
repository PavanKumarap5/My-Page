// Create and style canvas
const canvas = document.createElement('canvas');
canvas.id = 'network-canvas';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let width, height, points;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  points = Array.from({ length: 100 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  }));
}

function drawNetwork() {
  ctx.clearRect(0, 0, width, height);
  for (let p of points) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#cccccc';
    ctx.fill();
  }

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let a = points[i], b = points[j];
      let dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.2)';
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawNetwork);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
requestAnimationFrame(drawNetwork);

// Timezone with date and black time
function updateTime() {
  const now = new Date();

  const pstTime = now.toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const pstDate = now.toLocaleDateString('en-US', {
    timeZone: 'America/Los_Angeles'
  });

  const cstTime = now.toLocaleTimeString('en-US', {
    timeZone: 'America/Chicago',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const cstDate = now.toLocaleDateString('en-US', {
    timeZone: 'America/Chicago'
  });

  const estTime = now.toLocaleTimeString('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const estDate = now.toLocaleDateString('en-US', {
    timeZone: 'America/New_York'
  });

  document.getElementById('pst-time').innerHTML =
    `<strong style="color:#000">${pstTime}</strong><br><span style="font-size:12px;">${pstDate}</span>`;
  document.getElementById('cst-time').innerHTML =
    `<strong style="color:#000">${cstTime}</strong><br><span style="font-size:12px;">${cstDate}</span>`;
  document.getElementById('est-time').innerHTML =
    `<strong style="color:#000">${estTime}</strong><br><span style="font-size:12px;">${estDate}</span>`;
}

setInterval(updateTime, 1000);
updateTime();
