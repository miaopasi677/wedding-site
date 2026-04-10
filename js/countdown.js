// 倒计时 —— 目标：2026-05-04 11:58:00
(function(){
  const target = new Date('2026-05-04T11:58:00+08:00').getTime();

  const els = {
    days:  document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins:  document.getElementById('cd-mins'),
    secs:  document.getElementById('cd-secs')
  };

  function pad(n){ return String(n).padStart(2,'0'); }

  function tick(){
    const diff = target - Date.now();
    if(diff <= 0){
      els.days.textContent = els.hours.textContent =
      els.mins.textContent = els.secs.textContent = '00';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    els.days.textContent  = pad(d);
    els.hours.textContent = pad(h);
    els.mins.textContent  = pad(m);
    els.secs.textContent  = pad(s);
  }

  tick();
  setInterval(tick, 1000);
})();
