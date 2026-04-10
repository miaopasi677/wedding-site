// 滚动入场动画 + Ken Burns 触发
(function(){

  // 所有需要入场动画的元素
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .info-card, .countdown-wrap'
  );

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        // 时间线子项按顺序延迟
        const parent = e.target.closest('.timeline');
        if(parent){
          const items = parent.querySelectorAll('.reveal-left, .reveal-right');
          items.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 180);
          });
        } else {
          e.target.classList.add('visible');
        }
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  // Ken Burns：进入视口触发 bg-photo 缩放
  const sceneIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.scene').forEach(s => sceneIO.observe(s));

})();
