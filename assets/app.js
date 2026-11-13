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
  const copy = {
    kitchen: {
      title:'Refresh your kitchen &amp; <em class="mark">bathrooms.</em>',
      lead:'A renovation package for resale HDB kitchens and bathrooms, with the essentials clearly included.',
      badge:'Best seller', note:'New cabinets and worktops quoted separately. Terms apply.',
      highlights:['Hacking & removal','Floor & wall tiling','Waterproofing','Piping & installation','Chemical wash & cleaning'],
      heroGift:'2 toilet bowls · 2 wash basins · 2 basin taps',
      photo:['kitchen-13.webp','Style + Space kitchen with warm timber cabinetry and tiled walls'], inset:['toilet-6.webp','Style + Space bathroom with stone-effect tiles and a glass shower enclosure'],
      benefitsTitle:'Better everyday living starts here.', benefitsIntro:'Put your renovation budget into the spaces you use every day. Here is what the package does for your home.',
      benefits:[['Renew','A fresh foundation','Replace tired kitchen and bathroom floor and wall finishes, with waterproofing included in the wet works.'],['Refresh','The essentials, together','Replacement piping and installation work are part of the scope. Two toilet bowls, wash basins and basin taps are listed as complimentary.'],['Focus','A focused renovation','Start with your kitchen and bathrooms instead of committing to a whole-home renovation. Discuss any extra works separately.']],
      fit:'You have a resale HDB flat and want to renew the kitchen and bathroom finishes, waterproofing and plumbing.',
      extra:'New kitchen cabinets, worktops, appliances, shower screens and electrical work are not listed in this package. Ask for these to be itemised if you need them.',
      gallery:[['kitchen-10.webp','Kitchen with timber cabinetry and a bright work area','Warm materials. A practical everyday space.'],['toilet-3.webp','Bathroom with dark tiles and a timber vanity','Thoughtful bathroom details.'],['toilet-6.webp','Bathroom with a black-framed glass shower enclosure','A look you can make your own.']],
      faq:[['Does this include a new kitchen cabinet?','The published kitchen and bathroom package lists removal of the existing kitchen cabinet and construction of a tiled cabinet base. It does not list fabrication of new cabinets or a worktop. Ask for these as separate items in your quotation.'],['Can I renovate just one bathroom?','This published package combines kitchen and bathroom works. Tell the team if you only need one room so they can discuss a separate scope. The combined package price is not a single-bathroom quotation.']]
    },
    condo: {
      title:'Make more of your <em class="mark">condo.</em>',
      lead:'Room-by-room carpentry, lighting, ceilings and painting — one clearly defined package.',
      badge:'Carpentry & finishing', note:'Flooring, wet works and kitchen cabinets quoted separately. Terms apply.',
      photo:['living-6.webp','Condominium living area with built-in TV carpentry and full-height windows'], inset:['living11.webp','Bright living space with a wall-mounted television and custom cabinetry'],
      benefitsTitle:'Thoughtful details. More usable space.', benefitsIntro:'See how the included carpentry and finishing works can make everyday life in your condo more comfortable.',
      benefits:[['Arrive','A more organised entrance','A full-height shoe cabinet keeps everyday pairs together, with a suspended settee bench for putting them on.'],['Unwind','Rooms that feel connected','Living and bedroom feature walls, TV consoles and bedside tables give key rooms a coordinated starting point.'],['Make space','A dedicated place to work','A suspended study table and top-hung book cabinet create a defined work area, with storage above the desk.']],
      fit:'You want to refresh a resale condo with built-in carpentry, ceiling works and painting, while discussing any changes to existing floors and wet areas separately.',
      extra:'The itemised S$11,988 scope does not list new flooring, kitchen cabinets, bathroom renovation, plumbing or appliances. Ask the designer to quote those separately if required.',
      gallery:[['living-6.webp','Condo living room with timber and white TV carpentry','Carpentry that brings a room together.'],['living11.webp','Light-filled living room with custom TV cabinetry','A calm, coordinated living space.'],['living-7.webp','Warm timber details in a living and dining area','Ideas for your own layout.']],
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
  function record(event, detail = {}) {
    window.ssPreviewEvents.push({event, page_variant:dedicated?'condo-v2':'main-v2', package:state.pkg, preview:true, ...detail});
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
    $('hero-title').innerHTML=c.title;
    $('hero-lead').textContent=c.lead;
    $('hero-price').textContent=(d.prices.length>1?'From ':'')+money(d.prices[0][1]);
    $('hero-price-note').textContent=pkg==='condo'?'For the full scope shown here':d.prices[0][0]+' HDB · other sizes available';
    $('hero-badge').textContent=c.badge;
    $('hero-scope-note').textContent=c.note;
    for(const [id,item] of [['hero-photo',c.photo],['hero-inset',c.inset]]) {if($(id)) {$(id).src=assetRoot+item[0];$(id).alt=item[1];}}
    if($('hero-included-list')) {
      $('hero-included-list').innerHTML=(c.highlights||d.groups.map(g=>g[0])).map(item=>`<li>${escape(item)}</li>`).join('');
      const gift=c.heroGift||(d.gift.startsWith('Free with this package:')?d.gift.replace('Free with this package: ',''):'');
      $('hero-gift').hidden=!gift;
      $('hero-gift-copy').textContent=gift;
    }
    if($('hero-condo-list')) $('hero-condo-list').innerHTML=d.groups.map(g=>`<li><h3>${escape(g[0])}</h3><p>${escape(g[1])}</p></li>`).join('');
    $('benefits-title').textContent=c.benefitsTitle;$('benefits-intro').textContent=c.benefitsIntro;
    $('benefit-grid').innerHTML=c.benefits.map((b,i)=>`<article class="benefit"><span class="num">0${i+1} / ${escape(b[0])}</span><h3>${escape(b[1])}</h3><p>${escape(b[2])}</p></article>`).join('');
    $('package-name').textContent=d.title; $('package-tag').textContent=d.tag;
    $('size-list').classList.toggle('single',d.prices.length===1);
    $('size-list').innerHTML=d.prices.map((r,i)=>`<button type="button" data-size="${i}" aria-pressed="${i===0}"><span class="size-label">${escape(r[0])}</span><span class="price">${money(r[1])}</span></button>`).join('');
    $('package-gift').textContent=d.gift; $('source-link').href=d.link;
    $('scope-list').innerHTML=d.groups.map((g,i)=>`<details ${i===0?'open':''}><summary>${escape(g[0])}</summary><p>${escape(g[1])}</p></details>`).join('');
    $('fit-copy').textContent=c.fit; $('extra-copy').textContent=c.extra;
    const gallery=c.gallery || [['living-5.webp','Bright living room with timber carpentry','A welcoming space to come home to.'],['kitchen-10.webp','Kitchen with timber cabinetry','Details that work for your home.'],['living-7.webp','Living and dining space with warm timber','A considered layout.']];
    $('gallery').innerHTML=gallery.map(g=>`<figure><img src="${assetRoot+g[0]}" alt="${escape(g[1])}" width="1600" height="1200" loading="lazy"><figcaption>${escape(g[2])}</figcaption></figure>`).join('');
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
    const channel=event.target.closest('[data-channel]');if(channel) {record('contact_preview',{channel:channel.dataset.channel,cta_location:channel.dataset.location});openPreview(channel.dataset.channel);}
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
})();
