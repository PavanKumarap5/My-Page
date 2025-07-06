document.addEventListener('DOMContentLoaded', () => {
  // Create and style the canvas for the animated background
  document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('nav ul').classList.toggle('active');
});
  const canvas = document.createElement('canvas');
  canvas.id = 'network-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';   // Use viewport units for consistency
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';     // Behind other content
  canvas.style.pointerEvents = 'none';  // So clicks pass through
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');

  let width, height, points = [];

  // Initialize canvas size and points
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

  // Draw the animated network on canvas
  function drawNetwork() {
    ctx.clearRect(0, 0, width, height);

    // Update point positions and draw circles
    points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#cccccc';
      ctx.fill();
    });

    // Draw lines between points that are close enough
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        let a = points[i];
        let b = points[j];
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

  // Initialize canvas and listen for resize
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Start animation
  requestAnimationFrame(drawNetwork);

  // Timezone clock updates with black time text
  function updateTime() {
    const now = new Date();

    // Helper function to get time and date strings
    function getTimeAndDate(timeZone) {
      return {
        time: now.toLocaleTimeString('en-US', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }),
        date: now.toLocaleDateString('en-US', {
          timeZone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      };
    }

    const pst = getTimeAndDate('America/Los_Angeles');
    const cst = getTimeAndDate('America/Chicago');
    const est = getTimeAndDate('America/New_York');

    document.getElementById('pst-time').innerHTML =
      <strong style="color:#000">${pst.time}</strong><br><span style="font-size:12px;">${pst.date}</span>;
    document.getElementById('cst-time').innerHTML =
      <strong style="color:#000">${cst.time}</strong><br><span style="font-size:12px;">${cst.date}</span>;
    document.getElementById('est-time').innerHTML =
      <strong style="color:#000">${est.time}</strong><br><span style="font-size:12px;">${est.date}</span>;
  }

  // Update clocks every second
  setInterval(updateTime, 1000);
  updateTime();
});
