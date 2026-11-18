/* Thank-you page. The Contact-form conversion fires here (contact_form + generate_lead), once per submission, and only in the live build. */
(() => {
  'use strict';
  const CFG = window.SS_CONFIG || {};
  const LIVE = CFG.live === true;
  const dl = window.dataLayer = window.dataLayer || [];
  const q = new URLSearchParams(location.search);
  const raw = (q.get('pkg') || '').slice(0, 30), variant = (q.get('variant') || '').slice(0, 20);
  const NAMES = {bto: variant === 'premium' ? 'HDB BTO Premium' : 'HDB BTO Standard', resale: 'HDB Resale', condo: 'Condominium', kitchen: 'Kitchen & Bathroom'};
  const name = NAMES[raw] || '';
  if (name) {const l = document.getElementById('pkg-label'); l.textContent = 'Enquiry: ' + name + ' package'; l.hidden = false;}
  const message = 'Hi Style + Space, I just sent a quote request' + (name ? ' for the ' + name + ' package' : '') + ' via your website.';
  document.getElementById('cta-wa').href = 'https://wa.me/' + (CFG.whatsapp || '6594376122') + '?text=' + encodeURIComponent(message);
  if (raw) document.getElementById('back-link').href = '../?pkg=' + encodeURIComponent(raw) + (variant ? '&v=' + encodeURIComponent(variant) : '');
  if (LIVE) {
    document.getElementById('preview-note')?.remove();
    // sessionStorage guards against refresh / back-forward double counting.
    const token = 'sps_lead_' + raw + '_' + (q.get('gclid') || '');
    let fired = false; try {fired = sessionStorage.getItem(token) === '1';} catch (e) {}
    if (!fired) {
      dl.push({event: 'contact_form', cta_location: 'thankyou', package: raw, package_variant: variant, package_name: name, focus: q.get('focus') || '', form_name: 'sem-landing-quote'});
      dl.push({event: 'generate_lead', lead_source: 'sem-landing', package: raw});
      try {sessionStorage.setItem(token, '1');} catch (e) {}
    }
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-cta]'); if (!a) return;
      dl.push({event: 'whatsapp_click', cta_type: 'whatsapp', cta_location: a.dataset.loc || '', package: raw, package_name: name, link_url: 'https://wa.me/' + (CFG.whatsapp || '6594376122')});
    });
  }
})();
