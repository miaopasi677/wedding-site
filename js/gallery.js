// 所有图片列表
const ALL_PHOTOS = [
  '071c6e4d790a08ca576e28da48925629.jpg',
  '2025-11-19 115459.jpg',
  '2025-11-19 120105.jpg',
  '2025-11-19 120224.jpg',
  '2025-11-19 120729.jpg',
  '2025-11-19 120942.jpg',
  '2025-11-19 122722.jpg',
  '2025-11-19 123106.jpg',
  '2025-11-19 123212.jpg',
  '2025-11-19 124212.jpg',
  '2025-11-19 124315.jpg',
  '2025-11-19 124448.jpg',
  '2025-11-19 124630.jpg',
  '2025-11-19 124742.jpg',
  '2025-11-19 125005.jpg',
  '2025-11-19 143058.jpg',
  '2025-11-19 143601.jpg',
  '2025-11-19 143826.jpg',
  '2025-11-19 144740.jpg',
  '2025-11-19 145021.jpg',
  '2025-11-19 145515.jpg',
  '2025-11-19 170347.jpg',
  '2025-11-19 171009.jpg',
  '2025-11-19 171132.jpg',
  '2025-11-19 172621.jpg',
  '2025-11-19 172915.jpg',
  '2025-11-19 173246.jpg',
  '2025-11-19 173914.jpg',
  '2025-11-19 174005.jpg',
  '2025-11-19 174149.jpg',
  '2025-11-19 174305.jpg',
  '2025-11-19 174703.jpg',
  '2026-04-08 112721.jpg'
].map(f => './assets/' + encodeURIComponent(f));

// ===== 轮播 =====
(function(){
  const slidesEl = document.getElementById('gallery-slides');
  const dotsEl   = document.getElementById('gallery-dots');
  if(!slidesEl) return;

  // 生成 slides
  ALL_PHOTOS.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'slide' + (i === 0 ? ' active' : '');
    div.style.backgroundImage = `url('${src}')`;
    slidesEl.appendChild(div);
  });

  // 生成 dots（超过12张只显示进度条，不显示圆点）
  const showDots = ALL_PHOTOS.length <= 12;
  if(showDots){
    ALL_PHOTOS.forEach((_, i) => {
      const s = document.createElement('span');
      s.className = 'dot' + (i === 0 ? ' active' : '');
      s.dataset.i = i;
      dotsEl.appendChild(s);
    });
  } else {
    // 进度条
    dotsEl.innerHTML = '<div class="gallery-progress"><div class="gallery-progress-bar" id="gallery-bar"></div></div>';
  }

  const slides = slidesEl.querySelectorAll('.slide');
  const dots   = dotsEl.querySelectorAll('.dot');
  const bar    = document.getElementById('gallery-bar');
  let current  = 0;
  let timer;

  function goTo(i){
    slides[current].classList.remove('active');
    if(dots[current]) dots[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    if(dots[current]) dots[current].classList.add('active');
    if(bar) bar.style.width = ((current + 1) / slides.length * 100) + '%';
  }

  function next(){ goTo(current + 1); }
  function start(){ timer = setInterval(next, 2800); }
  function stop(){  clearInterval(timer); }

  dots.forEach(d => {
    d.addEventListener('click', () => { stop(); goTo(+d.dataset.i); start(); });
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) start(); else stop(); });
  }, { threshold: 0.3 });

  const gallery = document.getElementById('scene-gallery');
  if(gallery) io.observe(gallery);
})();

// ===== 九宫格照片墙 =====
(function(){
  const grid = document.getElementById('mosaic-grid');
  if(!grid) return;

  // 取中间段的照片，避免和轮播、背景重复感
  const mosaicPhotos = ALL_PHOTOS.slice(5, 14);

  mosaicPhotos.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'mosaic-item reveal';
    div.style.cssText = `background-image:url('${src}'); transition-delay:${i * 60}ms`;
    grid.appendChild(div);
  });
})();
