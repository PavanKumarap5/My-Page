document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('hamburger').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('active');
  });

  const canvas = document.createElement('canvas');
  canvas.id = 'network-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height, points = [];

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
    points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#cccccc';
      ctx.fill();
    });
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

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  requestAnimationFrame(drawNetwork);

  function updateTime() {
    const now = new Date();
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
      `<strong style="color:#000">${pst.time}</strong><br><span style="font-size:12px;">${pst.date}</span>`;
    document.getElementById('cst-time').innerHTML =
      `<strong style="color:#000">${cst.time}</strong><br><span style="font-size:12px;">${cst.date}</span>`;
    document.getElementById('est-time').innerHTML =
      `<strong style="color:#000">${est.time}</strong><br><span style="font-size:12px;">${est.date}</span>`;
  }

  setInterval(updateTime, 1000);
  updateTime();

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  AOS.init({
    duration: 800,
    once: true
  });
});
