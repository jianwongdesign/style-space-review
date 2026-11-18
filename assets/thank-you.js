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
    const heading = document.querySelector('h1'), status = document.querySelector('#pkg-label + .lead');
    const receipt = q.get('receipt') || '';
    const unconfirmed = () => {
      heading.textContent = 'Plan your renovation.';
      status.textContent = 'Use the enquiry form to send your project details, or contact the design team on WhatsApp.';
      document.getElementById('cta-wa').href = 'https://wa.me/' + (CFG.whatsapp || '6594376122');
    };
    if (!/^[a-f0-9]{32}$/.test(receipt)) unconfirmed();
    else {
      heading.textContent = 'Checking your enquiry…';
      status.textContent = 'Please wait while we confirm your submission.';
      fetch('../' + (CFG.formAction || 'send.php') + '?receipt=' + encodeURIComponent(receipt), {credentials: 'same-origin', cache: 'no-store'})
        .then(response => {if (!response.ok) throw new Error('Receipt unavailable'); return response.json();})
        .then(result => {
          if (!result.confirmed) {unconfirmed(); return;}
          heading.textContent = 'Thank you. We have your enquiry.';
          status.textContent = 'A Style + Space designer will contact you on the mobile number you gave to arrange your free consultation.';
          if (!result.count) return;
          const confirmedName = result.package === 'bto' && result.package_variant === 'premium' ? 'HDB BTO Premium' : NAMES[result.package] || '';
          dl.push({event: 'contact_form', cta_location: 'thankyou', package: result.package, package_variant: result.package_variant, package_name: confirmedName, focus: result.focus, form_name: 'sem-landing-quote', submission_id: result.submission_id});
          dl.push({event: 'generate_lead', lead_source: 'sem-landing', package: result.package, submission_id: result.submission_id});
        })
        .catch(() => {
          heading.textContent = 'Please check your enquiry.';
          status.textContent = 'We could not load the confirmation. If you just submitted, contact the design team on WhatsApp to check before sending again.';
        });
    }
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-cta]'); if (!a) return;
      dl.push({event: 'whatsapp_click', cta_type: 'whatsapp', cta_location: a.dataset.loc || '', package: raw, package_name: name, link_url: 'https://wa.me/' + (CFG.whatsapp || '6594376122')});
    });
  }
})();
