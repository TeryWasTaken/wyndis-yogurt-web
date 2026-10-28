window.WY = {
  $: (s, r = document) => r.querySelector(s),
  $$: (s, r = document) => [...r.querySelectorAll(s)],
  reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
};
