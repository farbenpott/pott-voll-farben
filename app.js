const defaultMaterials = ['Öl', 'Acryl', 'Bleistift', 'Aquarell', 'Mischtechnik'];
const palettes = {
  city: ['#e9b05f', '#e27b50', '#566f64', '#283d3d'],
  figure: ['#e8dfce', '#7b6458', '#b17b67', '#433b39'],
  portrait: ['#d98758', '#efc477', '#53766c', '#35444a'],
  cat: ['#d7c4a5', '#a85d44', '#56686a', '#343940'],
  flowers: ['#e5b464', '#dd7653', '#647f66', '#e9d8bb'],
  night: ['#33445b', '#596786', '#dca45e', '#c16e4f'],
  bird: ['#deba65', '#cc6549', '#477366', '#3f4141'],
  figure2: ['#ddd6c8', '#776f64', '#ae9982', '#44413e'],
  abstract: ['#e18a55', '#f0c562', '#637f70', '#6c5968'],
  meadow: ['#d99b61', '#778752', '#c66c4f', '#e7d1a0'],
  portrait2: ['#be815d', '#e2c194', '#506b67', '#42423e'],
  flowers2: ['#dab362', '#bb654d', '#697a5a', '#e9d6b8']
};

const $ = selector => document.querySelector(selector);
const themeFilters = $('#theme-filters');
const mediumFilters = $('#medium-filters');
const grid = $('#art-grid');
let artworks = [];
let categories = [];
let activeTheme = new URLSearchParams(location.search).get('thema') || 'Alle';
let activeMedium = 'Alle';

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function svgArt(kind = 'abstract', format = 'quadratisch') {
  const colors = palettes[kind] || palettes.abstract;
  const landscape = format === 'querformat';
  const width = landscape ? 480 : 420;
  const height = landscape ? 320 : format === 'hochkant' ? 560 : 420;
  const hills = `<path d="M0 ${height * .71} Q${width * .25} ${height * .56} ${width * .5} ${height * .72} T${width} ${height * .65}V${height}H0Z" fill="${colors[2]}"/>`;
  let subject = '';

  if (['city', 'night'].includes(kind)) {
    subject = `<circle cx="${width * .73}" cy="${height * .26}" r="${width * .12}" fill="${colors[3]}" opacity=".9"/><path d="M0 ${height * .74}h${width}v${height * .26}H0z" fill="${colors[2]}"/>${[.08, .26, .47, .68, .84].map((x, i) => `<path d="M${width * x} ${height * (.46 + i % 2 * .08)}h${width * .13}v${height * .32}h-${width * .13}z" fill="${i % 2 ? colors[3] : colors[1]}"/><path d="M${width * (x + .04)} ${height * (.53 + i % 2 * .08)}h${width * .025}v${height * .04}h-${width * .025}z" fill="${colors[0]}"/>`).join('')}`;
  } else if (['figure', 'figure2'].includes(kind)) {
    subject = `<path d="M${width * .5} ${height * .3}c-${width * .15} 0-${width * .18} ${height * .16}-${width * .14} ${height * .24}l-${width * .1} ${height * .19}q${width * .1} ${height * .1} ${width * .2} 0l${width * .04} ${height * .24} ${width * .17} ${height * .08} ${width * .12} ${height * .22}h-${width * .53}q${width * .07}-${height * .23} ${width * .22}-${height * .3}l-${width * .02}-${height * .2}c-${width * .1}-${height * .1}-${width * .1}-${height * .35} ${width * .04}-${height * .46}z" fill="${colors[1]}"/><circle cx="${width * .49}" cy="${height * .23}" r="${width * .12}" fill="${colors[0]}"/><path d="M${width * .37} ${height * .23}q${width * .1}-${height * .23} ${width * .25} 0" fill="none" stroke="${colors[3]}" stroke-width="8"/>`;
  } else if (kind.startsWith('portrait')) {
    subject = `<circle cx="${width * .5}" cy="${height * .39}" r="${width * .2}" fill="${colors[0]}"/><path d="M${width * .3} ${height * .4}q${width * .01}-${height * .32} ${width * .22}-${height * .31}q${width * .24} 0 ${width * .21} ${height * .33}l-${width * .05} ${height * .15}q-${width * .1}-${height * .08}-${width * .18}-${height * .02}-${width * .12} ${height * .1}-${width * .2} ${height * .04}z" fill="${colors[3]}"/><path d="M${width * .19} ${height * .91}q${width * .02}-${height * .3} ${width * .31}-${height * .34}q${width * .3} ${height * .01} ${width * .32} ${height * .34}z" fill="${colors[2]}"/><circle cx="${width * .44}" cy="${height * .38}" r="3" fill="${colors[3]}"/><circle cx="${width * .57}" cy="${height * .38}" r="3" fill="${colors[3]}"/>`;
  } else if (kind === 'cat') {
    subject = `<path d="M${width * .26} ${height * .57}l-${width * .02}-${height * .31} ${width * .19} ${height * .11}q${width * .1}-${height * .1} ${width * .2} 0l${width * .17}-${height * .11}v${height * .31}q0 ${height * .25}-${width * .27} ${height * .25}t-${width * .27}-${height * .25}" fill="${colors[3]}"/><circle cx="${width * .43}" cy="${height * .57}" r="4" fill="${colors[0]}"/><circle cx="${width * .57}" cy="${height * .57}" r="4" fill="${colors[0]}"/><path d="M${width * .5} ${height * .62}l-6 6h12z" fill="${colors[1]}"/>`;
  } else if (kind === 'bird') {
    subject = `<path d="M${width * .25} ${height * .62}q${width * .04}-${height * .3} ${width * .28}-${height * .28}q${width * .23} ${height * .01} ${width * .25} ${height * .25}q-${width * .1} ${height * .24}-${width * .31} ${height * .21}z" fill="${colors[2]}"/><path d="M${width * .7} ${height * .58}l${width * .14} ${height * .05}-${width * .14} ${height * .05}" fill="${colors[1]}"/><circle cx="${width * .65}" cy="${height * .55}" r="4" fill="${colors[3]}"/><path d="M${width * .18} ${height * .82}h${width * .64}" stroke="${colors[3]}" stroke-width="5"/>`;
  } else if (kind.startsWith('flowers')) {
    subject = Array.from({ length: 5 }, (_, i) => {
      const x = width * (.2 + i * .15), y = height * (.46 + i % 2 * .12), radius = width * (.045 + i % 3 * .01);
      return `<path d="M${x} ${y}v${height * .37}" stroke="${colors[2]}" stroke-width="5"/><circle cx="${x}" cy="${y}" r="${radius}" fill="${colors[0]}"/><circle cx="${x - radius * .6}" cy="${y - radius * .6}" r="${radius * .58}" fill="${colors[1]}"/><circle cx="${x + radius * .6}" cy="${y - radius * .6}" r="${radius * .58}" fill="${colors[1]}"/><circle cx="${x}" cy="${y - radius * 1.2}" r="${radius * .58}" fill="${colors[1]}"/>`;
    }).join('');
  } else if (kind === 'abstract') {
    subject = `<circle cx="${width * .35}" cy="${height * .38}" r="${width * .22}" fill="${colors[0]}"/><path d="M${width * .42} ${height * .15}q${width * .4} ${height * .1} ${width * .17} ${height * .44}t-${width * .34} ${height * .3}q${width * .09}-${height * .32}-${width * .12}-${height * .74}" fill="${colors[2]}"/><circle cx="${width * .73}" cy="${height * .69}" r="${width * .13}" fill="${colors[1]}"/><path d="M${width * .08} ${height * .78}q${width * .2}-${height * .16} ${width * .35} 0t${width * .4} 0" fill="none" stroke="${colors[3]}" stroke-width="14"/>`;
  } else {
    subject = `${hills}<path d="M0 ${height * .8}q${width * .2}-${height * .31} ${width * .42} 0t${width * .58}-${height * .09}v${height * .29}H0z" fill="${colors[1]}"/>${Array.from({ length: 14 }, (_, i) => `<path d="M${i * width / 14} ${height * .9}q${width * .02}-${height * (.18 + i % 4 * .06)} ${width * .04}-${height * .32}" stroke="${i % 2 ? colors[3] : colors[0]}" fill="none" stroke-width="3"/>`).join('')}`;
  }

  const clip = format === 'rund' ? `<defs><clipPath id="round-art"><circle cx="${width / 2}" cy="${height / 2}" r="${width * .49}"/></clipPath></defs><g clip-path="url(#round-art)">` : '';
  const closeClip = format === 'rund' ? '</g>' : '';
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Beispielkunstwerk" xmlns="http://www.w3.org/2000/svg">${clip}<rect width="${width}" height="${height}" fill="${colors[0]}"/>${['city', 'night'].includes(kind) ? `<path d="M0 ${height * .75}Q${width * .28} ${height * .53} ${width * .51} ${height * .72}T${width} ${height * .61}V${height}H0Z" fill="${colors[2]}"/>` : ''}<path d="M${width * .08} ${height * .1}q${width * .35}-${height * .13} ${width * .81} ${height * .12}" fill="none" stroke="#fff4d9" stroke-width="${Math.max(width * .018, 5)}" opacity=".3"/>${subject}${closeClip}</svg>`;
}

function getThemes() {
  return categories.map(category => category.name);
}

function getMaterials() {
  return [...new Set([...defaultMaterials, ...artworks.map(work => work.material).filter(Boolean)])];
}

function renderFilters() {
  const themes = ['Alle', ...getThemes()];
  const materials = ['Alle', ...getMaterials()];
  themeFilters.innerHTML = themes.map(theme => `<button class="filter-btn ${theme === activeTheme ? 'active' : ''}" data-theme="${escapeHtml(theme)}">${escapeHtml(theme)}</button>`).join('');
  mediumFilters.innerHTML = materials.map(material => `<button class="filter-btn ${material === activeMedium ? 'active' : ''}" data-medium="${escapeHtml(material)}">${escapeHtml(material)}</button>`).join('');
  themeFilters.querySelectorAll('button').forEach(button => button.onclick = () => setTheme(button.dataset.theme));
  mediumFilters.querySelectorAll('button').forEach(button => button.onclick = () => { activeMedium = button.dataset.medium; render(); });
}

function imageMarkup(work, modal = false) {
  const title = escapeHtml(work.title);
  if (work.bild) {
    return `<img src="${escapeHtml(work.bild)}" alt="${title}" loading="lazy">`;
  }
  return svgArt(work.vorschau, work.format || 'quadratisch');
}

function render() {
  renderFilters();
  const visible = artworks.filter(work =>
    (activeTheme === 'Alle' || (work.themen || []).includes(activeTheme)) &&
    (activeMedium === 'Alle' || work.material === activeMedium)
  );

  $('#gallery-title').innerHTML = activeTheme === 'Alle' ? 'Alle Werke' : `Kategorie: <em>${escapeHtml(activeTheme)}</em>`;
  $('#gallery-note').innerHTML = activeTheme === 'Alle'
    ? 'Gemälde aus dem Atelier.'
    : `Werke der Kategorie ${escapeHtml(activeTheme)}.`;
  $('#result-count').textContent = `${visible.length} ${visible.length === 1 ? 'WERK' : 'WERKE'}`;
  $('#active-theme').hidden = activeTheme === 'Alle';
  $('#active-theme-label').textContent = `Thema: ${activeTheme}`;
  grid.hidden = !visible.length;
  $('#empty-state').hidden = !!visible.length;

  grid.innerHTML = visible.map((work, index) => {
    const title = escapeHtml(work.title);
    const topics = escapeHtml((work.themen || []).join(' · '));
    const formatClass = ['rund', 'quadratisch', 'hochkant', 'querformat'].includes(work.format) ? work.format : '';
    return `<article class="art-card" style="animation-delay:${index * 45}ms" data-title="${title}"><div class="art-image ${formatClass}">${imageMarkup(work)}<div class="art-overlay"><span>${topics} · ${escapeHtml(work.material || '')}</span><b>↗</b></div></div><div class="art-info"><h3>${title}</h3><span>${escapeHtml(work.jahr || '')}</span></div><div class="art-meta">${escapeHtml(work.material || '')}${work.groesse ? ` &nbsp;·&nbsp; ${escapeHtml(work.groesse)}` : ''}</div></article>`;
  }).join('');

  grid.querySelectorAll('.art-card').forEach(card => {
    card.onclick = () => openModal(visible.find(work => work.title === card.dataset.title));
  });
}

function setTheme(theme) {
  activeTheme = theme;
  const url = new URL(location.href);
  if (theme === 'Alle') url.searchParams.delete('thema');
  else url.searchParams.set('thema', theme);
  history.pushState({}, '', url);
  render();
  if (theme !== 'Alle') $('#galerie').scrollIntoView({ behavior: 'smooth' });
}

function openModal(work) {
  if (!work) return;
  const topics = escapeHtml((work.themen || []).join(' · '));
  $('#modal-content').innerHTML = `<div class="modal-art ${work.format === 'rund' ? 'rund' : ''}">${imageMarkup(work)}</div><div class="modal-copy"><p class="eyebrow">${topics} · ${escapeHtml(work.material || '')}</p><h2>${escapeHtml(work.title)}</h2><p class="details">Originalgemälde<br>${escapeHtml(work.jahr || '')}${work.groesse ? ` &nbsp;·&nbsp; ${escapeHtml(work.groesse)}` : ''}</p>${work.preis ? `<p class="price">${escapeHtml(work.preis)}</p>` : ''}<a href="mailto:c.marczian@outlook.de?subject=${encodeURIComponent(`Anfrage: ${work.title}`)}">Frage zum Werk ↗</a></div>`;
  $('#art-modal').showModal();
}

function renderThemeCards() {
  $('#theme-cards').innerHTML = categories.map(category => {
    const theme = category.name;
    const count = artworks.filter(work => (work.themen || []).includes(theme)).length;
    return `<a class="theme-card" href="?thema=${encodeURIComponent(theme)}#galerie">${category.bild ? `<img class="theme-image" src="${escapeHtml(category.bild)}" alt="" loading="lazy">` : ''}<span class="theme-arrow" aria-hidden="true">↗</span><div><h3>${escapeHtml(theme)}</h3><span>${count} ${count === 1 ? 'WERK' : 'WERKE'}</span></div></a>`;
  }).join('');
}

async function loadArtworks() {
  try {
    const [worksResponse, categoriesResponse] = await Promise.all([fetch('./werke.json'), fetch('./kategorien.json')]);
    if (!worksResponse.ok) throw new Error(`werke.json konnte nicht geladen werden (${worksResponse.status}).`);
    if (!categoriesResponse.ok) throw new Error(`kategorien.json konnte nicht geladen werden (${categoriesResponse.status}).`);
    const [worksData, categoriesData] = await Promise.all([worksResponse.json(), categoriesResponse.json()]);
    if (!Array.isArray(worksData)) throw new Error('werke.json muss eine Liste von Werken enthalten.');
    if (!Array.isArray(categoriesData) || categoriesData.some(category => !category.name)) throw new Error('kategorien.json muss eine Liste von Kategorien mit name enthalten.');
    artworks = worksData;
    categories = categoriesData;
  } catch (error) {
    console.error(error);
    $('#gallery-note').textContent = 'Die Galerie konnte nicht geladen werden. Starte die Website über einen lokalen Webserver.';
    artworks = [];
    categories = [];
  }
  if (!getThemes().includes(activeTheme)) activeTheme = 'Alle';
  renderThemeCards();
  render();
}

$('#clear-theme').onclick = () => setTheme('Alle');
$('#reset-filters').onclick = () => { activeMedium = 'Alle'; setTheme('Alle'); };
$('#art-modal').addEventListener('click', event => { if (event.target.id === 'art-modal') $('#art-modal').close(); });
$('.modal-close').onclick = () => $('#art-modal').close();
window.addEventListener('popstate', () => {
  activeTheme = new URLSearchParams(location.search).get('thema') || 'Alle';
  activeMedium = 'Alle';
  render();
});
$('.menu-toggle').onclick = event => {
  const open = $('.main-nav').classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', open);
};
$('.main-nav').querySelectorAll('a').forEach(link => link.onclick = () => $('.main-nav').classList.remove('open'));
$('#year').textContent = new Date().getFullYear();
loadArtworks();
