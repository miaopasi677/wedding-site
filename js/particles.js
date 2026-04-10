// 花瓣 / 心形粒子飘落
(function(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  function resize(){
    canvas.width  = innerWidth;
    canvas.height = innerHeight;
  }
  resize();
  addEventListener('resize', resize);

  const EMOJIS = ['✦','✧','·','⋆','✩','✫'];
  const particles = [];

  for(let i = 0; i < 22; i++){
    particles.push(spawn(true));
  }

  function spawn(random){
    return {
      x:     Math.random() * innerWidth,
      y:     random ? Math.random() * innerHeight : -20,
      size:  8 + Math.random() * 12,
      speed: 0.25 + Math.random() * 0.45,
      drift: (Math.random() - 0.5) * 0.3,
      rot:   Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      alpha: 0.15 + Math.random() * 0.3
    };
  }

  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = '#c8cdd4';
      ctx.font = `${p.size}px Georgia, serif`;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillText(p.emoji, -p.size/2, p.size/2);
      ctx.restore();

      p.y        += p.speed;
      p.x        += p.drift;
      p.rot      += p.rotSpeed;

      if(p.y > innerHeight + 20){
        Object.assign(p, spawn(false));
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
