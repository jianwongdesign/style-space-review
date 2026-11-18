/* Review-only UI. No tags, pixels, network submission or persistent contact storage. */
(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');
  const $ = id => document.getElementById(id);
  const dedicated = document.body.dataset.page === 'condo';
  const assetRoot = dedicated ? '../assets/img/' : 'assets/img/';
  const packages = window.SS_PACKAGES;
  const query = new URLSearchParams(location.search);
  const campaignKeys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid'];
  const campaign = Object.fromEntries(campaignKeys.filter(k => query.has(k)).map(k => [k, query.get(k).slice(0,200)]));
  const money = value => 'S' + value;
  const priceNumber = value => Number(value.replace(/[^0-9]/g, ''));
  const homeLabels = {hdb3:'3-room HDB', hdb4:'4-room HDB', hdb5:'5-room HDB', exec:'Executive / Maisonette', condo:'Condominium', other:'Another property type'};
  const sizeHome = {'3-room':'hdb3', '4-room':'hdb4', '5-room':'hdb5', 'Exec / Mais.':'exec', 'Whole package':'condo'};
  const projectImages = {
  "kitchen-10": {
    "file": "kitchen-10.webp",
    "title": "Warm timber, clean lines",
    "room": "Kitchen",
    "alt": "Galley kitchen with timber lower cabinets, dark upper cabinets and a glazed door",
    "width": 1600,
    "height": 1200
  },
  "toilet-6": {
    "file": "toilet-6.webp",
    "title": "A framed shower space",
    "room": "Bathroom",
    "alt": "Bathroom with a dark vanity, illuminated mirror and black-framed glass shower screen",
    "width": 1600,
    "height": 1200
  },
  "kitchen-13": {
    "file": "kitchen-13.webp",
    "title": "Light meets dark",
    "room": "Kitchen",
    "alt": "Kitchen with white cabinets on one side, dark timber cabinets on the other and a pale tiled floor",
    "width": 1600,
    "height": 960
  },
  "kitchen-4": {
    "file": "kitchen-4.webp",
    "title": "Storage with a place for everything",
    "room": "Kitchen",
    "alt": "Galley kitchen with full-height timber storage, dark cabinets and a long worktop",
    "width": 1600,
    "height": 1200
  },
  "toilet-14": {
    "file": "toilet-14.webp",
    "title": "Soft greys, simple details",
    "room": "Bathroom",
    "alt": "Grey tiled bathroom with a white basin and toilet, recessed shower area and framed artwork",
    "width": 1386,
    "height": 1039
  },
  "toilet-3": {
    "file": "toilet-3.webp",
    "title": "Texture from floor to wall",
    "room": "Bathroom",
    "alt": "Bathroom with dark stone-effect tiles, a light timber vanity and a glass shower enclosure",
    "width": 1600,
    "height": 1405
  },
  "living-6": {
    "file": "living-6.webp",
    "title": "A place to come together",
    "room": "Living",
    "alt": "Living room with a grey sofa, a dark TV wall, built-in console and glazed balcony doors",
    "width": 1600,
    "height": 1200
  },
  "living11": {
    "file": "living11.webp",
    "title": "Let the daylight in",
    "room": "Living",
    "alt": "Bright living room with white seating, a wall-mounted television and full-height curtains",
    "width": 1600,
    "height": 960
  },
  "living14": {
    "file": "living14.webp",
    "title": "Room for living and dining",
    "room": "Living & dining",
    "alt": "White living and dining space with a suspended TV console, display shelves and a dining nook",
    "width": 1200,
    "height": 720
  },
  "living-2": {
    "file": "living-2.webp",
    "title": "A considered focal point",
    "room": "Living",
    "alt": "Living room with a white TV feature wall, dark console, grey sofa and yellow artwork",
    "width": 1600,
    "height": 1200
  },
  "living-7": {
    "file": "living-7.webp",
    "title": "Connected spaces",
    "room": "Living & dining",
    "alt": "Open living and dining space with a grey sofa, timber dining table and a dark TV wall",
    "width": 1600,
    "height": 1200
  },
  "living-5": {
    "file": "living-5.webp",
    "title": "Everyday calm",
    "room": "Living",
    "alt": "Living room with a pale green sofa, light timber TV console and dark-framed glazed doors",
    "width": 1600,
    "height": 1200
  }
};
  const projectGroups = {"kitchen": ["kitchen-10", "toilet-6", "toilet-3", "kitchen-4", "kitchen-13", "toilet-14"], "condo": ["living-6", "living11", "living14", "living-2", "living-7", "living-5"], "home": ["living-5", "kitchen-10", "toilet-6", "living-2", "kitchen-4", "living14"]};
  const copy = {
    kitchen: {
      title:'Refresh your kitchen &amp; <em class="mark">bathrooms.</em>',
      lead:'A renovation package for resale HDB kitchens and bathrooms, with the essentials clearly included.',
      badge:'Best seller', note:'New cabinets and worktops quoted separately. Terms apply.',
      highlights:['Hacking & removal','Floor tiling','Wall tiling','Waterproofing','Piping & installation','Chemical wash & cleaning'],
      photo:['kitchen-13.webp','Kitchen with white cabinets on one side, dark timber cabinets on the other and a pale tiled floor'], inset:['toilet-6.webp','Style + Space bathroom with stone-effect tiles and a glass shower enclosure'],
      benefitsTitle:'Better everyday living starts here.', benefitsIntro:'Put your renovation budget into the spaces you use every day. Here is what the package does for your home.',
      benefits:[['Renew','A fresh foundation','Replace tired kitchen and bathroom floor and wall finishes, with waterproofing included in the wet works.'],['Refresh','The essentials, together','Replacement piping and installation work are part of the scope. Two toilet bowls, wash basins and basin taps are listed as complimentary.'],['Focus','A focused renovation','Start with your kitchen and bathrooms instead of committing to a whole-home renovation. Discuss any extra works separately.']],
      fit:'You have a resale HDB flat and want to renew the kitchen and bathroom finishes, waterproofing and plumbing.',
      extra:'New kitchen cabinets, worktops, appliances, shower screens and electrical work are not listed in this package. Ask for these to be itemised if you need them.',
      gallery:'kitchen',
      faq:[['Does this include a new kitchen cabinet?','The published kitchen and bathroom package lists removal of the existing kitchen cabinet and construction of a tiled cabinet base. It does not list fabrication of new cabinets or a worktop. Ask for these as separate items in your quotation.'],['Can I renovate just one bathroom?','This published package combines kitchen and bathroom works. Tell the team if you only need one room so they can discuss a separate scope. The combined package price is not a single-bathroom quotation.']]
    },
    condo: {
      title:'Condo renovation <em class="mark">package.</em>',
      lead:'Carpentry, ceiling and painting for your resale condo, with every inclusion listed.',
      badge:'Carpentry & finishing', note:'Free design consultation. Flooring, wet works and kitchen cabinets quoted separately. Terms apply.',
      photo:['living-6.webp','Living room with a grey sofa, a dark TV wall, built-in console and glazed balcony doors'], inset:['living11.webp','Bright living space with a wall-mounted television and custom cabinetry'],
      benefitsTitle:'Thoughtful details. More usable space.', benefitsIntro:'See how the included carpentry and finishing works can make everyday life in your condo more comfortable.',
      benefits:[['Arrive','A more organised entrance','A full-height shoe cabinet keeps everyday pairs together, with a suspended settee bench for putting them on.'],['Unwind','Rooms that feel connected','Living and bedroom feature walls, TV consoles and bedside tables give key rooms a coordinated starting point.'],['Make space','A dedicated place to work','A suspended study table and top-hung book cabinet create a defined work area, with storage above the desk.']],
      fit:'You want to refresh a resale condo with built-in carpentry, ceiling works and painting, while discussing any changes to existing floors and wet areas separately.',
      extra:'The itemised S$11,988 scope does not list new flooring, kitchen cabinets, bathroom renovation, plumbing or appliances. Ask the designer to quote those separately if required.',
      gallery:'condo',
      faq:[['Is S$11,988 a full condo renovation?','The itemised offer is a carpentry and finishing package: foyer, living, master bedroom and study carpentry, plus the listed lighting points, ceiling works, painting, cleaning and floor protection. Do not treat it as an all-inclusive full renovation.'],['Are new floors, bathrooms or kitchen cabinets included?','These are not listed in the itemised S$11,988 offer. The website also describes broader condo renovation services; discuss these as additional works and ask for a written scope and price.'],['Can the carpentry be adapted to my layout?','The package specifies dimensions for the listed pieces. Bring your floor plan to discuss suitability. Confirm any changes in dimensions, materials or layout and their cost in your quotation.'],['What about condo management requirements?','Share your management office’s renovation requirements with the designer. Confirm access arrangements, permitted working periods, submissions and any deposits before agreeing a schedule.']]
    },
    bto: {
      title:'A considered start for your <em class="mark">new home.</em>', lead:'Explore the HDB BTO Standard package: kitchen carpentry, flooring and the listed finishing works for your new flat.', badge:'HDB BTO Standard', note:'Check the included dimensions and materials against your flat. Any extra works should be itemised in your quotation.', photo:['living-5.webp','Bright HDB living room with timber TV carpentry'], inset:['kitchen-10.webp','Kitchen with warm timber cabinetry'],
      benefitsTitle:'Start with the essentials.', benefitsIntro:'A published scope helps you plan your new home around the work you need.', benefits:[['Cook','A practical kitchen','The listed kitchen cabinet and quartz worktop dimensions give you a clear starting point for your kitchen plan.'],['Settle','Floors and finishing','Living and dining floor tiles, bedroom vinyl, painting and cleaning are listed in this package.'],['Plan','A scope you can compare','Review the itemised works, then discuss any additions around your layout and priorities.']],fit:'You have a standard BTO flat and want the listed kitchen carpentry, flooring and finishing works.',extra:'Check dimensions, appliance supply, additional carpentry and any changes to electrical points with your designer. Only the published list defines the package.',faq:[]
    },
    premium: {
      title:'Make your BTO <em class="mark">feel complete.</em>', lead:'Explore the HDB BTO Premium package, with kitchen and living-room carpentry plus the listed finishing works.', badge:'HDB BTO Premium', note:'This is a different scope from BTO Standard. Review the inclusions for your flat and confirm any additions in writing.', photo:['living-5.webp','Bright HDB living room with timber TV carpentry'], inset:['kitchen-10.webp','Kitchen with warm timber cabinetry'],benefitsTitle:'Build on your new home.',benefitsIntro:'See what the Premium package adds, and check it against what your flat already has.',benefits:[['Cook','Kitchen storage in place','The listed laminated kitchen cabinets include soft-closing hinges and a dish drainer.'],['Relax','A living-room focal point','A feature wall and TV console are included in the published living carpentry scope.'],['Compare','Understand your package','Review the complimentary items and listed finishing works before discussing any changes.']],fit:'You have a premium BTO flat and want the listed kitchen and living carpentry and finishing works.',extra:'Flooring and a kitchen worktop are not listed in the Premium itemised scope. Check existing finishes and ask for any required additions to be quoted.',faq:[]
    },
    resale: {
      title:'Give your resale flat a <em class="mark">fresh chapter.</em>', lead:'Plan a broader refresh with the HDB Resale package, covering the listed kitchen carpentry, floors, bathroom works and finishing.', badge:'HDB Resale', note:'A resale flat’s condition matters. Use the published scope as your starting point and confirm the work needed after a site review.',photo:['living-7.webp','Renovated HDB living and dining area with warm timber carpentry'],inset:['toilet-3.webp','Bathroom with dark tiles and timber vanity'],benefitsTitle:'A joined-up refresh for your flat.',benefitsIntro:'Compare the listed works across the home before deciding what to keep and what to change.',benefits:[['Renew','Floors across your home','The published flooring scope covers living, dining, bedrooms and the household shelter.'],['Refresh','Kitchen and wet areas','Kitchen carpentry, bathroom tiling, waterproofing and plumbing are listed in the package.'],['Finish','Bring the rooms together','Ceiling work, painting and cleaning help complete the agreed renovation scope.']],fit:'You own a resale HDB flat and want to review a broader renovation scope across multiple rooms.',extra:'Confirm site condition, additional demolition, worktops, appliances and any unlisted carpentry with the designer. Additional requirements need a written quotation.',faq:[]
    }
  };
  const generalFaq = [
    ['Is the advertised price my final renovation cost?','It is the published price for the listed package and flat type. Your final quotation depends on the agreed scope, measurements, materials and any additions. Confirm taxes and all inclusions in writing before you commit.'],
    ['How long will the renovation take?','The completion date needs to be agreed after the team reviews your scope, site conditions and access requirements. Share your preferred start and move-in dates during the consultation.'],
    ['I’m not ready to renovate yet. Can I still enquire?','Yes. Choose the timing and project stage that best describe your situation. You can also compare prices and read the included works here without leaving contact details.']
  ];
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const state = {pkg:dedicated?'condo':'kitchen', size:0, sizeChosen:false};
  // A local, non-PII event contract for the junior's later tagging work. Never sent.
  window.ssPreviewEvents = [];
  // Production tagging is opt-in: assets/config.js ships with live:false (protected preview); build-live.py sets live:true.
  const CFG = window.SS_CONFIG || {};
  const LIVE = CFG.live === true;
  const root = dedicated ? '../' : '';
  const dl = window.dataLayer = window.dataLayer || [];
  // Local event -> dataLayer event the GTM container (GTM-NHHPFN9P) already has triggers for.
  const dlEvents = {plan_open:'form_open', pkg_select:'pkg_select', form_start:'form_start', form_invalid:'form_invalid'};
  function pkgContext() {
    const premium = state.pkg === 'premium';
    return {package:premium?'bto':state.pkg, package_variant:premium?'premium':'', package_name:packages[state.pkg].title, focus:state.focus||'', page_variant:dedicated?'condo-v2':'main-v2'};
  }
  function record(event, detail = {}) {
    window.ssPreviewEvents.push({event, page_variant:dedicated?'condo-v2':'main-v2', package:state.pkg, focus:state.focus||'', preview:!LIVE, ...detail});
    if (LIVE && dlEvents[event]) dl.push({event:dlEvents[event], cta_location:detail.cta_location||'', form_name:'sem-landing-quote', ...pkgContext()});
  }
  function selectedLabel(id) { const el=$(id); return el.value ? el.options[el.selectedIndex].text : 'Not specified'; }
  function priceForHome() {
    const pkg=packages[state.pkg];
    return pkg.prices.find(row => sizeHome[row[0]] === $('home').value) || null;
  }
  function feedback() {
    const home=$('home').value, budget=$('budget').value, row=priceForHome();
    const name=packages[state.pkg].title;
    if (!home) return `Your selected package: ${name}. Choose your home to see the relevant published price.`;
    if (!row) return `The published ${name} scope does not list a price for ${homeLabels[home]}. Ask for a tailored quotation; the displayed package price should not be used as your estimate.`;
    const amount=priceNumber(row[1]);
    const limits={under12:11999,'12to15':14999,'15to20':19999,'20to30':29999,'30plus':Infinity};
    let result=`Published ${name} price for ${homeLabels[home]}: ${money(row[1])}. `;
    if (budget && limits[budget] < amount) result+='Your budget is below this listed package price. We can discuss a smaller scope or revised budget; no package price reduction is assumed.';
    else if (budget === 'unsure') result+='Use this as a starting point for a budget discussion. Additional works need a separate allowance.';
    else result+='This covers the listed scope. Confirm any additional works and the final quotation with the designer.';
    if ($('timing').value==='soon') result+=' Your preferred start date is subject to the team’s availability.';
    return result;
  }
  function updateFeedback(){
    $('fit-feedback').textContent=feedback();
    if(!$('contact-step').hidden) renderSummary();
  }
  function setSize(index, explicit=false) {
    state.size=index;
    if(explicit) {state.sizeChosen=true; $('home').value=sizeHome[packages[state.pkg].prices[index][0]] || ''; record('price_select',{size:packages[state.pkg].prices[index][0]});}
    document.querySelectorAll('[data-size]').forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.size)===index)));
    updateFeedback();
  }
  function setPackage(pkg, initial=false) {
    if(!Object.hasOwn(packages,pkg)) pkg='kitchen';
    if(dedicated) pkg='condo';
    state.pkg=pkg; state.size=0; state.sizeChosen=false;
    const d=packages[pkg], c=copy[pkg];
    if(!initial) { $('home').value=pkg==='condo'?'condo':''; showStep(1,false); }
    if(dedicated) $('home').value='condo';
    // Ads traffic for toilet/bathroom searches (?pkg=kitchen&focus=bathroom): same published package and prices, bathroom-first wording and imagery.
    const bathFocus = !dedicated && pkg==='kitchen' && query.get('focus')==='bathroom';
    state.focus = bathFocus ? 'bathroom' : '';
    $('hero-title').innerHTML=bathFocus?'Refresh your bathrooms &amp; <em class="mark">kitchen.</em>':c.title;
    $('hero-lead').textContent=bathFocus?'One resale HDB package covering your bathrooms and kitchen, with the essentials clearly included.':c.lead;
    $('hero-price').textContent=(d.prices.length>1?'From ':'')+money(d.prices[0][1]);
    $('hero-price-note').textContent=pkg==='condo'?'For the full scope shown here':d.prices[0][0]+' HDB · other sizes available';
    $('hero-badge').textContent=c.badge;
    $('hero-scope-note').textContent=c.note;
    for(const [id,item] of bathFocus?[['hero-photo',c.inset],['hero-inset',c.photo]]:[['hero-photo',c.photo],['hero-inset',c.inset]]) {if($(id)) {$(id).src=assetRoot+item[0];$(id).alt=item[1];}}
    if($('hero-included-list')) {
      $('hero-included-list').innerHTML=(c.highlights||d.groups.map(g=>g[0])).map(item=>`<li><span>${escape(item)}</span></li>`).join('');
      const freeItems=d.freeItems || [];
      $('hero-gift').hidden=!freeItems.length;
      $('hero-gift-copy').innerHTML=freeItems.map((item,i)=>`<li>${d.freeItemIcons?.[i]?`<img class="free-item-icon" src="${assetRoot}offer-icons/${d.freeItemIcons[i]}.svg" alt="" width="40" height="40">`:''}<span>${escape(item)}</span></li>`).join('');
      $('hero-gift-copy').classList.toggle('two-items',freeItems.length===2);
    }
    if($('hero-condo-list')) $('hero-condo-list').innerHTML=d.groups.map((g,i)=>`<li><h3>${d.groupIcons?.[i]?`<img class="scope-icon" src="${assetRoot}scope-icons/${d.groupIcons[i]}.svg" alt="" width="28" height="28">`:''}${escape(g[0])}</h3><p>${escape(g[1])}</p></li>`).join('');
    $('benefits-title').textContent=c.benefitsTitle;$('benefits-intro').textContent=c.benefitsIntro;
    $('benefit-grid').innerHTML=c.benefits.map((b,i)=>`<article class="benefit"><span class="num">0${i+1} / ${escape(b[0])}</span><h3>${escape(b[1])}</h3><p>${escape(b[2])}</p></article>`).join('');
    $('package-name').textContent=d.title; $('package-tag').textContent=d.tag;
    $('size-list').classList.toggle('single',d.prices.length===1);
    $('size-list').innerHTML=d.prices.map((r,i)=>`<button type="button" data-size="${i}" aria-pressed="${i===0}"><span class="size-label">${escape(r[0])}</span><span class="price">${money(r[1])}</span></button>`).join('');
    $('package-gift').textContent=d.gift; $('package-gift').classList.toggle('is-free',Boolean(d.freeItems?.length)); $('source-link').href=d.link;
    $('scope-list').innerHTML=d.groups.map((g,i)=>`<details ${i===0?'open':''}><summary>${escape(g[0])}</summary><p>${escape(g[1])}</p></details>`).join('');
    $('fit-copy').textContent=c.fit; $('extra-copy').textContent=c.extra;
    const galleryKeys = projectGroups[c.gallery || 'home'];
    const gallery = (bathFocus ? ['toilet-6','toilet-3','toilet-14','kitchen-10','kitchen-4','kitchen-13'].filter(k=>galleryKeys.includes(k)) : galleryKeys).map(key => projectImages[key]);
    $('gallery-title').textContent = bathFocus ? 'Bathrooms & kitchens, in focus.' : pkg === 'kitchen' ? 'Kitchens & bathrooms, in focus.' : dedicated ? 'Living spaces, thoughtfully designed.' : 'Ideas for every room in your home.';
    $('gallery').innerHTML = gallery.map(p => `<figure class="project-card"><a class="project-image" href="${assetRoot+p.file}" target="_blank" rel="noopener" aria-label="View full image: ${escape(p.title)} (opens in a new tab)"><img src="${assetRoot+p.file}" alt="${escape(p.alt)}" width="${p.width}" height="${p.height}" loading="lazy" decoding="async"><span class="project-zoom" aria-hidden="true">↗</span></a><figcaption><span class="project-room">${escape(p.room)}</span><strong>${escape(p.title)}</strong></figcaption></figure>`).join('');
    $('faq-list').innerHTML=[...c.faq,...generalFaq].map(f=>`<details><summary>${escape(f[0])}</summary><p>${escape(f[1])}</p></details>`).join('');
    document.querySelectorAll('[data-package]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.package===pkg)));
    if(!dedicated) {
      const url=new URL(location.href); url.searchParams.set('pkg',pkg==='premium'?'bto':pkg); url.searchParams.delete('v');
      if(pkg==='premium') url.searchParams.set('v','premium');
      history.replaceState(null,'',url);
    }
    updateFeedback();
    if(!initial) record('pkg_select');
  }
  function summaryRows() {
    const row=priceForHome();
    return [['Package',packages[state.pkg].title],['Your home',selectedLabel('home')],['Published scope price',row?money(row[1]):$('home').value?'Tailored quote required':'Choose home type first'],['Your budget',selectedLabel('budget')],['Preferred start',selectedLabel('timing')],['Project stage',selectedLabel('stage')]];
  }
  function renderSummary() {
    $('project-summary').innerHTML=summaryRows().map(r=>`<div><dt>${escape(r[0])}</dt><dd>${escape(r[1])}</dd></div>`).join('');
    $('summary-caveat').textContent=feedback();
  }
  function showStep(step, focus=true) {
    $('project-step').hidden=step!==1; $('contact-step').hidden=step!==2;
    for(const [id,num] of [['step-one-label',1],['step-two-label',2]]) {$(id).classList.toggle('active',step===num); if(step===num)$(id).setAttribute('aria-current','step');else $(id).removeAttribute('aria-current');}
    if(step===2) renderSummary();
    if(focus) (step===1?$('project-heading'):$('contact-heading')).focus({preventScroll:false});
  }
  function validProject() {
    for(const id of ['home','budget','timing','stage']) {if(!$(id).checkValidity()) {showStep(1,false);$(id).reportValidity();record('form_invalid',{field:id});return false;}}
    return true;
  }
  function composeMessage(withContact=false) {
    const rows=summaryRows();
    let text=`Hi Style + Space, I’d like to discuss the ${packages[state.pkg].title} package.\n\n`+rows.map(r=>`${r[0]}: ${r[1]}`).join('\n');
    if(withContact) {
      text+=`\n\nName: ${$('name').value.trim()}\nMobile: ${$('phone').value.trim()}`;
      if($('email').value.trim()) text+=`\nEmail: ${$('email').value.trim()}`;
    }
    if($('notes').value.trim()) text+=`\n\nOther requirements: ${$('notes').value.trim()}`;
    text+='\n\nPlease help me check the included scope, any additional works and the next step for a consultation.';
    return text;
  }
  // Production only: real WhatsApp / phone actions. The dataLayer event names match the container's existing Custom Event triggers.
  function liveContact(kind, ctaLocation) {
    const base = `https://wa.me/${CFG.whatsapp}`;
    const tel = `tel:${CFG.phone}`;
    dl.push({event:kind==='call'?'Phone_Calls':'whatsapp_click', cta_type:kind==='call'?'call':'whatsapp', cta_location:ctaLocation||'', link_url:kind==='call'?tel:base, ...pkgContext()});
    if(kind==='call') {window.location.href=tel;return;}
    const url = `${base}?text=${encodeURIComponent(composeMessage(false))}`;
    const contactWindow=window.open('','_blank');
    if(contactWindow) {contactWindow.opener=null;contactWindow.location.href=url;}
    else window.location.href=url;
  }
  function addHidden(form, name, value) {
    let input=form.querySelector(`input[type=hidden][name="${name}"]`);
    if(!input) {input=document.createElement('input');input.type='hidden';input.name=name;form.appendChild(input);}
    input.value=value;
  }
  function submitLive() {
    const form=$('planner-form'), row=priceForHome(), ctx=pkgContext();
    const utm=new URLSearchParams(campaign).toString();
    Object.entries({pkg:ctx.package, variant:ctx.package_variant, focus:ctx.focus, page:ctx.page_variant, size:row?row[0]:'', price:row?row[1]:'', home_label:selectedLabel('home'), budget_label:selectedLabel('budget'), timing_label:selectedLabel('timing'), stage_label:selectedLabel('stage'), utm}).forEach(([k,v])=>addHidden(form,k,v));
    form.action=root+CFG.formAction; form.method='post';
    const button=form.querySelector('button[type=submit]'); button.disabled=true; button.textContent='Sending…';
    form.submit();
  }
  let lastFocus=null;
  function openPreview(channel) {
    lastFocus=document.activeElement;
    $('dialog-title').textContent=channel==='call'?'Call the design team':channel==='whatsapp'?'Your WhatsApp message':'Your enquiry preview';
    $('dialog-description').textContent=channel==='call'?'Preview only: this would open a call to +65 6272 2988 on the live website.':'Nothing has been sent. This is how your project details would reach the team.';
    $('message-preview').value=channel==='call'?'+65 6272 2988':composeMessage(channel==='form');
    $('copy-status').textContent='';$('copy-message').textContent=channel==='call'?'Copy number':'Copy message';
    document.body.classList.add('dialog-open');$('preview-dialog').showModal();
  }
  $('preview-dialog').addEventListener('close',()=>{document.body.classList.remove('dialog-open');lastFocus?.focus({preventScroll:true});});
  $('close-dialog').addEventListener('click',()=>$('preview-dialog').close());
  $('back-to-page').addEventListener('click',()=>$('preview-dialog').close());
  $('copy-message').addEventListener('click',async()=>{
    try {await navigator.clipboard.writeText($('message-preview').value);$('copy-status').textContent='Copied. Nothing has been sent.';}
    catch {$('message-preview').focus();$('message-preview').select();$('copy-status').textContent='Select and copy the message above.';}
  });
  document.addEventListener('click',event=>{
    const size=event.target.closest('[data-size]');if(size)setSize(Number(size.dataset.size),true);
    const pkg=event.target.closest('[data-package]');if(pkg)setPackage(pkg.dataset.package);
    const channel=event.target.closest('[data-channel]');if(channel) {
      if(LIVE) liveContact(channel.dataset.channel,channel.dataset.location);
      else {record('contact_preview',{channel:channel.dataset.channel,cta_location:channel.dataset.location});openPreview(channel.dataset.channel);}
    }
    const tracked=event.target.closest('[data-event]');if(tracked)record(tracked.dataset.event,{cta_location:tracked.dataset.location});
  });
  document.addEventListener('toggle',event=>{if(event.target.tagName==='DETAILS' && event.target.open)record('scope_expand',{section:event.target.querySelector('summary').textContent});},true);
  for(const id of ['home','budget','timing','stage']) $(id).addEventListener('change',()=>{
    if(id==='home') {const index=packages[state.pkg].prices.findIndex(r=>sizeHome[r[0]]===$('home').value);if(index>=0)setSize(index);}
    updateFeedback();record('project_answer',{field:id,value:$(id).value});
  });
  $('review-project').addEventListener('click',()=>{if(validProject()){showStep(2);record('project_review');}});
  $('edit-project').addEventListener('click',()=>showStep(1));
  $('phone').addEventListener('input',()=>$('phone').setCustomValidity(''));
  $('planner-form').addEventListener('submit',event=>{
    event.preventDefault();
    if(!validProject())return;
    if($('contact-step').hidden){showStep(2);record('project_review');return;}
    const digits=$('phone').value.replace(/\D/g,'');
    $('phone').setCustomValidity(digits.length>=8&&digits.length<=15?'':'Please enter a mobile number with 8–15 digits.');
    for(const id of ['name','phone','email']) {if(!$(id).checkValidity() || (id==='name'&&!$(id).value.trim())) {if(id==='name'&&!$(id).value.trim()){$('name').value='';}$(id).reportValidity();record('form_invalid',{field:id});return;}}
    if(LIVE) {submitLive();return;}
    record('form_preview');openPreview('form');
  });
  $('planner-form').addEventListener('focusin',()=>record('form_start'),{once:true});
  for(const a of document.querySelectorAll('[data-link="other-page"]')) {const url=new URL(a.href);for(const [key,value] of Object.entries(campaign))url.searchParams.set(key,value);a.href=url.href;}
  // Ads previously linking to ?pkg=condo land on the dedicated page, retaining attribution.
  if(!dedicated && query.get('pkg')==='condo') {
    const url=new URL('condominium/',location.href);for(const [key,value] of Object.entries(campaign))url.searchParams.set(key,value);url.hash=location.hash;location.replace(url.href);return;
  }
  let initial=dedicated?'condo':query.get('pkg')||'kitchen';
  if(initial==='bto'&&(query.get('v')==='premium'||query.get('pkg')==='bto:premium'))initial='premium';
  if(initial==='bto:premium')initial='premium';
  setPackage(initial,true);
  // Condo ad traffic: the planner offers condo and "another property type" only, so HDB owners are not routed into a condo quote.
  if(dedicated) for(const option of [...$('home').options]) if(/^(hdb3|hdb4|hdb5|exec)$/.test(option.value)) option.remove();
  if(LIVE) {
    // Honeypot (real visitors never see it) and production wording; the preview-only wording stays in the HTML for the protected preview.
    const form=$('planner-form');
    const trap=document.createElement('input');trap.type='text';trap.name='website';trap.tabIndex=-1;trap.autocomplete='off';trap.setAttribute('aria-hidden','true');trap.style.cssText='position:absolute;left:-9999px;width:1px;height:1px;opacity:0';form.appendChild(trap);
    const consent=document.querySelector('.consent');
    if(consent) consent.innerHTML='By sending an enquiry, you agree to be contacted about your renovation. <a href="https://www.style-plus-space.com/privacy-policy/" target="_blank" rel="noopener">Privacy policy</a>.';
    const send=form.querySelector('button[type=submit]');if(send) send.innerHTML='Send my enquiry <span aria-hidden="true">↗</span>';
    const summaryWa=document.querySelector('#contact-step [data-channel="whatsapp"]');if(summaryWa) summaryWa.innerHTML='WhatsApp my project details ↗';
    if(query.get('sent')==='0') {
      dl.push({event:'form_error', form_name:'sem-landing-quote', ...pkgContext()});
      const note=document.createElement('p');note.className='summary-note';note.setAttribute('role','alert');
      note.textContent='Sorry, we could not send your enquiry. Please try again, or WhatsApp us on +65 9437 6122.';
      $('project-heading').before(note);
      document.getElementById('plan').scrollIntoView({block:'start'});
    }
  }
})();
