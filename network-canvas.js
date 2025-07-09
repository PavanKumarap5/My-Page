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

// Timezone with date and black time inside styled boxes
function updateTime() {
  const now = new Date();

  const timezones = [
    { id: 'pst-time', zone: 'America/Los_Angeles', label: 'PST' },
    { id: 'cst-time', zone: 'America/Chicago', label: 'CST' },
    { id: 'est-time', zone: 'America/New_York', label: 'EST' },
  ];

  timezones.forEach(({ id, zone, label }) => {
    const time = now.toLocaleTimeString('en-US', {
      timeZone: zone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const date = now.toLocaleDateString('en-US', {
      timeZone: zone
    });

    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = `
  <div style="
    background: white;
    border-radius: 12px;
    padding: 12px 16px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
    text-align: center;
    min-width: 110px;
  ">
    <div style="color: #007bff; font-weight: bold; font-size: 14px;">${label}</div>
    <div style="color: #000; font-size: 15px;">${time}</div>
    <div style="font-size: 12px; color: #007bff;">${date}</div>
  </div>
`;
    }
  });
}

setInterval(updateTime, 1000);
updateTime();
