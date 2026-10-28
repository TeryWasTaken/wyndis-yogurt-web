(() => {
  'use strict';
  const { $, $$, reduced } = window.WY;

  /* carousel */
  const car = $('#carousel'), track = $('#track');
  const originals = $$('.slide', track);
  const PITCH = 310.3, FIRST_X = 24, LOOP = originals.length * PITCH;
  for(let c=1;c<5;c++) originals.forEach((el,i)=>{
    const copy=el.cloneNode(true);
    copy.style.setProperty('--x', c*LOOP+i*PITCH);
    track.appendChild(copy);
  });
  originals.forEach((el,i)=>el.style.setProperty('--x',i*PITCH));
  const slides=$$('.slide',track);
  track.classList.add('nt');
  let offset=0, velocity=0, frame=null, lastTime=0;
  let dragging=false, lastX=0, downX=0, pointerTime=0, suppressClick=false;
  const unit=()=>$('#stage').getBoundingClientRect().width/1440;
  const wrap=n=>((n%LOOP)+LOOP)%LOOP;
  function render(){
    offset=wrap(offset);
    const tx=FIRST_X-2*LOOP-offset;
    track.style.setProperty('--tx',tx);
    slides.forEach((el,i)=>{
      const x=i*PITCH+tx;
      const shown=x+551*.48>0 && x<1020;
      el.setAttribute('aria-hidden',String(!shown));
      el.querySelectorAll('a').forEach(a=>a.tabIndex=shown?0:-1);
    });
  }
  function stop(){cancelAnimationFrame(frame);frame=null;lastTime=0;}
  function animate(now){
    frame=null;
    const dt=Math.min((now-lastTime)/1000,.04);lastTime=now;
    const decay=Math.exp(-5*dt);
    offset+=velocity*(1-decay)/5;
    velocity*=decay;render();
    if(Math.abs(velocity)>2&&!dragging)frame=requestAnimationFrame(animate);
    else velocity=0;
  }
  function coast(){
    stop();
    if(reduced){velocity=0;return;}
    lastTime=performance.now();frame=requestAnimationFrame(animate);
  }
  function go(direction){
    if(reduced){offset+=direction*PITCH;render();return;}
    velocity+=direction*PITCH*5;coast();
  }
  $('.prev',car).addEventListener('click',()=>go(-1));
  $('.next',car).addEventListener('click',()=>go(1));
  car.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
      e.preventDefault();go(e.key==='ArrowLeft'?-1:1);
    }
  });
  car.addEventListener('pointerdown',e=>{
    if(e.target.closest('.car-btn')||e.button!==0)return;
    stop();velocity=0;dragging=true;suppressClick=false;
    lastX=downX=e.clientX;pointerTime=performance.now();
  });
  car.addEventListener('pointermove',e=>{
    if(!dragging)return;
    if(Math.abs(e.clientX-downX)<5&&!car.hasPointerCapture(e.pointerId))return;
    if(!car.hasPointerCapture(e.pointerId))car.setPointerCapture(e.pointerId);
    car.classList.add('grabbing');suppressClick=true;
    const now=performance.now(),dx=(lastX-e.clientX)/unit();
    velocity=dx/Math.max((now-pointerTime)/1000,.008);
    offset+=dx;lastX=e.clientX;pointerTime=now;render();
  });
  function end(e){
    if(!dragging)return;
    dragging=false;car.classList.remove('grabbing');
    if(car.hasPointerCapture(e.pointerId))car.releasePointerCapture(e.pointerId);
    if(e.type==='pointercancel'||performance.now()-pointerTime>100)velocity=0;
    coast();setTimeout(()=>suppressClick=false,0);
  }
  window.addEventListener('pointerup',end);
  window.addEventListener('pointercancel',end);
  car.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopPropagation();}},true);
  car.addEventListener('dragstart',e=>e.preventDefault());
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();velocity=0;}});
  render();
})();
