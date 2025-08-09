<script>
// === BACKGROUND NETWORK CANVAS ===
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
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
  }

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i], b = points[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawNetwork);
}

resizeCanvas();a
window.addEventListener('resize', resizeCanvas);
requestAnimationFrame(drawNetwork);

// === TIMEZONE CLOCKS ===
function updateTime() {
  const now = new Date();
  const format = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

  const pst = now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', ...format });
  const cst = now.toLocaleTimeString('en-US', { timeZone: 'America/Chicago', ...format });
  const est = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', ...format });

  const pstDate = now.toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' });
  const cstDate = now.toLocaleDateString('en-US', { timeZone: 'America/Chicago' });
  const estDate = now.toLocaleDateString('en-US', { timeZone: 'America/New_York' });

  document.querySelectorAll('.pst-time').forEach(el => {
    el.innerHTML = `<strong style="color:#000">${pst}</strong><br><span style="font-size:12px;">${pstDate}</span>`;
  });
  document.querySelectorAll('.cst-time').forEach(el => {
    el.innerHTML = `<strong style="color:#000">${cst}</strong><br><span style="font-size:12px;">${cstDate}</span>`;
  });
  document.querySelectorAll('.est-time').forEach(el => {
    el.innerHTML = `<strong style="color:#000">${est}</strong><br><span style="font-size:12px;">${estDate}</span>`;
  });
}

setInterval(updateTime, 1000);
updateTime();

// === INIT ANIMATIONS ===
if (window.AOS) AOS.init();
</script>
