(() => {
  'use strict';
  const { $, $$, reduced } = window.WY;

  /* header */
  const hdr = $('#hdr');
  const nav = $('#nav');
  const links = $$('.nl', nav);
  const drawerLinks = $$('.dr-main');
  const sections = [
    ['home', 'home'], ['about', 'about'], ['products', 'products'],
    ['ice-cream', 'products'], ['greek-style', 'products'], ['drink', 'products'], ['blend', 'products'],
    ['contact', 'contact'],
  ].map(([id, key]) => [document.getElementById(id), key])
    .filter(([el]) => el);

  let current = null;
  function setActive(key) {
    if (key === current) return;
    current = key;
    const l = links.find(a => a.dataset.key === key) || links[0];
    links.forEach(a => a.classList.toggle('on', a === l));
    nav.style.setProperty('--px', l.dataset.px);
    nav.style.setProperty('--pw', l.dataset.pw);
    drawerLinks.forEach(a => a.classList.toggle('on', a.dataset.key === key));
  }
  function onScroll() {
    hdr.classList.toggle('scrolled', scrollY > 40);
    const line = innerHeight * 0.38;
    let key = 'home';
    for (const [el, k] of sections) if (el.getBoundingClientRect().top <= line) key = k;
    // paling bawah = Contacts
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) key = 'contact';
    setActive(key);
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* drawer */
  const drawer = $('#drawer'), scrim = $('#scrim'), burger = $('#burger'), closeBtn = $('#dr-close');
  let lastFocus = null;
  function openDrawer() {
    lastFocus = document.activeElement;
    scrim.hidden = false;
    requestAnimationFrame(() => scrim.classList.add('show'));
    drawer.removeAttribute('inert');
    drawer.setAttribute('aria-hidden', 'false');
    drawer.classList.add('open');
    document.body.classList.add('lock');
    burger.setAttribute('aria-expanded', 'true');
    setTimeout(() => closeBtn.focus({ preventScroll: true }), 50);
  }
  function closeDrawer(restore = true) {
    drawer.classList.remove('open');
    scrim.classList.remove('show');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.setAttribute('inert', '');
    document.body.classList.remove('lock');
    burger.setAttribute('aria-expanded', 'false');
    setTimeout(() => (scrim.hidden = true), 300);
    if (restore && lastFocus) lastFocus.focus({ preventScroll: true });
  }
  burger.addEventListener('click', () => (drawer.classList.contains('open') ? closeDrawer() : openDrawer()));
  closeBtn.addEventListener('click', () => closeDrawer());
  scrim.addEventListener('click', () => closeDrawer());
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  /* link drawer */
  $$('[data-close]', drawer).forEach(a =>
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      closeDrawer(false);
      setTimeout(() => {
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + id);
      }, 120);
    })
  );
})();
