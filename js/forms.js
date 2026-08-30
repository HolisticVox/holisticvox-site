(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);},l=d.createElement(e),l.async=1,l.src=u,n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');ml('account', '2227229');

function escapeHTML(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch];
  });
}

const MAYA_SYSTEM=`You are Maya, the warm and professional practitioner intake coordinator for HolisticVox &#x2014; a bilingual holistic wellness platform founded by Nina Datshkovsky Ennis.

YOUR ROLE: Guide holistic health practitioners through their application conversationally, warmly, and like a real human colleague &#x2014; never like a form or robot.

COLLECT THESE (one at a time, in natural order):
1. Full name
2. Specialty/modality (Naturopathy, Herbalism, Acupuncture/TCM, Functional Medicine, Nutrition Coaching, Somatic/Energy Healing, Gold & Silver Wellness, Coaching, or other)
3. Years of experience
4. Email address
5. Website or social media URL (say it's optional)
6. Brief description of their practice and ideal clients
7. Listing tier preference: Basic ($10/month: directory profile, specialty tags, contact link, EN/ES listing) OR Featured ($25/month: top placement, homepage spotlight, social media feature, newsletter mention)

RULES:
- ONE question at a time &#x2014; never multiple
- Be warm, curious, and genuinely interested in their work
- Respond in whatever language they use (English or Spanish)
- Keep replies to 1-3 sentences unless answering a question
- When ALL info collected, write a clear summary starting with exactly: APPLICATION COMPLETE:
- After summary say: "Nina will review your application and be in touch within 48 hours. We are so excited about the possibility of welcoming you to the HolisticVox community! "

START: Greet warmly, introduce yourself as Maya from HolisticVox, and ask for their name.`;

let mayaHist=[],mayaStarted=false,mayaDone=false,mayaLog=[];
const MAYA_QUESTIONS=[
  'Beautiful, thank you. What is your specialty or main healing modality?',
  'How many years of experience do you have?',
  'What email address should Nina use to contact you?',
  'Do you have a website or social media link? You can write "skip" if not.',
  'Briefly describe your practice and the clients you love to help.',
  'Which listing feels right: Basic ($10/month) or Featured ($25/month)?'
];

function addMsg(text,role){
  const box=document.getElementById('maya-msgs');
  const d=document.createElement('div');
  d.className=role==='assistant'?'mb-agent':'mb-user';
  d.innerHTML=escapeHTML(text).replace(/\\n/g,'<br>');
  box.appendChild(d);
  box.scrollTop=box.scrollHeight;
  mayaLog.push({role,text});
}

function showTyping(v){
  document.getElementById('maya-typing').style.display=v?'block':'none';
  document.getElementById('maya-msgs').scrollTop=9999;
}

async function callMaya(msg){
  if(mayaDone)return;
  if(msg){mayaHist.push({role:'user',content:msg});addMsg(msg,'user');}
  showTyping(true);
  setTimeout(()=>{
    showTyping(false);
    if(!msg&&mayaHist.length===0){
      addMsg("Hi, I'm Maya from HolisticVox. I'll help collect your practitioner application for Nina. What is your full name?",'assistant');
      return;
    }
    if(mayaHist.length<=MAYA_QUESTIONS.length){
      addMsg(MAYA_QUESTIONS[mayaHist.length-1],'assistant');
      return;
    }
    const values=mayaHist.map(m=>m.content);
    const summary=`APPLICATION COMPLETE:\nName: ${values[0]||''}\nSpecialty: ${values[1]||''}\nExperience: ${values[2]||''}\nEmail: ${values[3]||''}\nWebsite: ${values[4]||''}\nPractice: ${values[5]||''}\nTier: ${values[6]||''}\n\nNina will review your application and be in touch within 48 hours. We are so excited about the possibility of welcoming you to the HolisticVox community!`;
    mayaDone=true;
    addMsg(summary,'assistant');
    submitApp(summary);
  },450);
}

function sendToMaya(){
  const inp=document.getElementById('maya-input');
  const m=inp.value.trim();
  if(!m)return;
  inp.value='';
  callMaya(m);
}

function submitApp(summary){
  const nm=summary.match(/Name[:\s]+([^\n]+)/i);
  const em=summary.match(/Email[:\s]+([^\s\n]+@[^\s\n]+)/i);
  const sp=summary.match(/Specialty[:\s]+([^\n]+)/i);
  document.getElementById('maya-conv-data').value=mayaLog.map(m=>'['+m.role.toUpperCase()+']: '+m.text).join('\n\n');
  if(nm)document.getElementById('maya-name-data').value=nm[1].trim();
  if(em)document.getElementById('maya-email-data').value=em[1].trim();
  if(sp)document.getElementById('maya-spec-data').value=sp[1].trim();
  openEmailDraft('HolisticVox practitioner application', [
    'Source: Maya practitioner assistant',
    'Name: '+(nm?nm[1].trim():''),
    'Email: '+(em?em[1].trim():''),
    'Specialty: '+(sp?sp[1].trim():''),
    '',
    'Conversation:',
    mayaLog.map(m=>'['+m.role.toUpperCase()+']: '+m.text).join('\n\n')
  ]);
}

// Auto-start Maya using MutationObserver (does NOT override go())
const mayaPageObserver = new MutationObserver(() => {
  const p = document.getElementById('page-practitioners');
  if(p && p.classList.contains('active') && !mayaStarted){
    mayaStarted = true;
    setTimeout(() => callMaya(null), 900);
  }
});
mayaPageObserver.observe(document.body, {subtree:true, attributes:true, attributeFilter:['class']});

// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
// SOFIA &#x2014; SPONSOR PARTNERSHIPS AGENT
// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
const SOFIA_SYSTEM=`You are Sofia, the warm and professional partnerships coordinator for HolisticVox &#x2014; a bilingual holistic wellness platform founded by Nina Datshkovsky Ennis that reaches health-conscious consumers in the US and Latin America.

YOUR ROLE: Engage potential sponsors and brand partners in a natural, enthusiastic conversation. You represent HolisticVox as a premium partnership opportunity.

ABOUT HOLISTICVOX AUDIENCE:
- Health-conscious women and men aged 25-55
- Interest in natural remedies, holistic healing, clean supplements
- Bilingual English/Spanish speakers in the US and Latin America
- High purchase intent for wellness products
- Unique niche: Gold & Silver Wellness (colloidal silver/gold)

SPONSORSHIP PACKAGES TO DISCUSS:
1. Sponsored Article ($300-500): Expert-written article featuring their product, SEO-optimised, permanent placement
2. Featured Product in HV Market ($150/month): Homepage + Market page placement with affiliate tracking
3. Newsletter Feature ($100/issue): Dedicated mention in weekly wellness newsletter
4. Bundle Package ($600/month): Article + Market placement + Newsletter &#x2014; best value

INFORMATION TO COLLECT (naturally, one question at a time):
1. Their name and role/title
2. Brand/company name and what products they sell
3. Target audience (who are their customers?)
4. Which partnership package interests them most
5. Their email address and website
6. Their timeline and any questions

RULES:
- ONE question at a time &#x2014; never multiple
- Be enthusiastic but professional &#x2014; you genuinely believe in their brand if it aligns with wellness
- Respond in whatever language they use (English or Spanish)
- If their brand doesn't align with holistic wellness, politely say you focus on wellness brands only
- When ALL info is collected, write a summary starting with exactly: SPONSOR COMPLETE:
- After summary: "Nina will personally review your proposal and be in touch within 24 hours. We're excited about the possibility of partnering with you! &#x2728;"

START: Greet enthusiastically, introduce yourself as Sofia, mention you handle brand partnerships for HolisticVox, and ask who you're speaking with and what brand they represent.`;

let sofiaHist=[],sofiaStarted=false,sofiaDone=false,sofiaLog=[];
const SOFIA_QUESTIONS=[
  'Thank you. What is your name and role at the brand?',
  'What wellness products or services does your brand offer?',
  'Who is your main customer or target audience?',
  'Which partnership package interests you most: sponsored article, featured product, newsletter feature, or bundle?',
  'What email address and website should Nina use to review your brand?',
  'What timeline are you hoping for, and do you have any questions for us?'
];

function addSofiaMsg(text,role){
  const box=document.getElementById('sofia-msgs');
  const d=document.createElement('div');
  const isAgent=role==='assistant';
  d.style.cssText='align-self:'+(isAgent?'flex-start':'flex-end')+';max-width:84%;background:'+(isAgent?'rgba(255,255,255,.1)':'#3B82F6')+';color:#fff;border-radius:'+(isAgent?'4px 18px 18px 18px':'18px 4px 18px 18px')+';padding:10px 14px;font-size:.84rem;line-height:1.68';
  d.innerHTML=escapeHTML(text).replace(/\\n/g,'<br>');
  box.appendChild(d);
  box.scrollTop=box.scrollHeight;
  sofiaLog.push({role,text});
}

function showSofiaTyping(v){
  document.getElementById('sofia-typing').style.display=v?'block':'none';
  document.getElementById('sofia-msgs').scrollTop=9999;
}

async function callSofia(msg){
  if(sofiaDone)return;
  if(msg){sofiaHist.push({role:'user',content:msg});addSofiaMsg(msg,'user');}
  showSofiaTyping(true);
  setTimeout(()=>{
    showSofiaTyping(false);
    if(!msg&&sofiaHist.length===0){
      addSofiaMsg("Hi, I'm Sofia. I help HolisticVox review brand partnerships and sponsorships. What brand do you represent?",'assistant');
      return;
    }
    if(sofiaHist.length<=SOFIA_QUESTIONS.length){
      addSofiaMsg(SOFIA_QUESTIONS[sofiaHist.length-1],'assistant');
      return;
    }
    const values=sofiaHist.map(m=>m.content);
    const summary=`SPONSOR COMPLETE:\nBrand: ${values[0]||''}\nContact: ${values[1]||''}\nProducts: ${values[2]||''}\nAudience: ${values[3]||''}\nPackage: ${values[4]||''}\nEmail: ${values[5]||''}\nTimeline / Questions: ${values[6]||''}\n\nNina will personally review your proposal and be in touch within 24 hours. We're excited about the possibility of partnering with you!`;
    sofiaDone=true;
    addSofiaMsg(summary,'assistant');
    submitSponsorApp(summary);
  },450);
}

function sendToSofia(){
  const inp=document.getElementById('sofia-input');
  const m=inp.value.trim();
  if(!m)return;
  inp.value='';
  callSofia(m);
}

function submitSponsorApp(summary){
  const bn=summary.match(/Brand[:\s]+([^\n]+)/i);
  const em=summary.match(/Email[:\s]+([^\s\n]+@[^\s\n]+)/i);
  const pk=summary.match(/Package[:\s]+([^\n]+)/i);
  document.getElementById('sofia-conv-data').value=sofiaLog.map(m=>'['+m.role.toUpperCase()+']: '+m.text).join('\n\n');
  if(bn)document.getElementById('sofia-brand-data').value=bn[1].trim();
  if(em)document.getElementById('sofia-email-data').value=em[1].trim();
  if(pk)document.getElementById('sofia-package-data').value=pk[1].trim();
  openEmailDraft('HolisticVox sponsor application', [
    'Source: Sofia sponsor assistant',
    'Brand: '+(bn?bn[1].trim():''),
    'Email: '+(em?em[1].trim():''),
    'Package: '+(pk?pk[1].trim():''),
    '',
    'Conversation:',
    sofiaLog.map(m=>'['+m.role.toUpperCase()+']: '+m.text).join('\n\n')
  ]);
}

// Auto-start Sofia when contact page is visible & scrolled to Sofia section
const sofiaObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting&&!sofiaStarted){
      sofiaStarted=true;
      setTimeout(()=>callSofia(null),800);
    }
  });
},{threshold:0.3});
document.addEventListener('DOMContentLoaded',()=>{
  const s=document.getElementById('sofia-section');
  if(s)sofiaObserver.observe(s);
});
if(document.getElementById('sofia-section'))sofiaObserver.observe(document.getElementById('sofia-section'));

const HV_CONTACT_EMAIL='holisticvoxwellness@gmail.com';
function formDataLines(form){
  return formEntriesToLines(Array.from(new FormData(form).entries()));
}
function formEntriesToLines(entries){
  return entries
    .filter(([key,value])=>key!=='bot-field'&&key!=='form-name'&&String(value).trim())
    .map(([key,value])=>key.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())+': '+String(value).trim());
}
function openEmailDraft(subject, lines){
  const body=Array.isArray(lines)?lines.join('\n'):String(lines||'');
  window.location.href='mailto:'+HV_CONTACT_EMAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
}

// Contact and feedback form handlers for Cloudflare static hosting
function handleContactForm(e){
  e.preventDefault();
  const btn=document.getElementById('contact-submit-btn');
  btn.textContent='Opening email...';btn.disabled=true;
  openEmailDraft('HolisticVox contact message', formDataLines(e.target));
  btn.textContent='Email draft opened';
  btn.style.background='#4ade80';
  setTimeout(()=>{btn.textContent='Send Message \u2192';btn.style.background='';btn.disabled=false;},4000);
}
function handleFeedbackForm(e){
  e.preventDefault();
  const btn=document.getElementById('feedback-submit-btn');
  btn.textContent='Opening email...';btn.disabled=true;
  openEmailDraft('HolisticVox website feedback', formDataLines(e.target));
  btn.textContent='Email draft opened';
  btn.style.background='#4ade80';
  setTimeout(()=>{btn.textContent='Send Feedback \u2192';btn.style.background='';btn.disabled=false;},4000);
}

// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
// SAGE &#x2014; PRACTITIONER AI AGENT
// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
const SAGE_SYSTEM = `You are Sage, the warm and professional Practitioner Coordinator for HolisticVox &#x2014; a bilingual (English/Spanish) holistic wellness platform.

Your role is to:
1. Welcome potential practitioners with warmth and professionalism
2. Learn about them and their practice through natural conversation
3. Collect the following information (conversationally, not as a checklist):
   - Full name and title
   - Specialty/modality
   - Years of experience
   - Location (city, country)
   - Languages spoken
   - Website or social media URL
   - Brief bio / about their practice
   - Which listing tier they prefer: Basic ($10/month) or Featured ($25/month)
4. Answer questions about HolisticVox honestly:
   - Basic listing ($10/mo): directory profile, specialty tags, contact link, EN/ES listing
   - Featured listing ($25/mo): top placement, homepage spotlight, social media feature, newsletter mention
   - We're launching our practitioner directory soon &#x2014; they'll be among the first
   - Nina Datshkovsky Ennis (founder) will personally review each application within 48 hours
5. When you have all the info, summarize it and confirm with them, then say you're submitting their application

PERSONALITY:
- Warm, knowledgeable, and genuinely interested in their work
- Speak like a real person, not a robot &#x2014; use natural language
- Ask follow-up questions that show genuine curiosity
- Keep responses concise (2-4 sentences max per message)
- If they write in Spanish, respond entirely in Spanish
- Occasionally use gentle wellness language that fits the brand

IMPORTANT:
- Never invent information about HolisticVox
- Do not make guarantees about income or results
- When you have collected all information and the user confirms, end your message with exactly this JSON block on its own line:
  SUBMIT_APPLICATION:{"name":"...","specialty":"...","experience":"...","location":"...","languages":"...","website":"...","bio":"...","tier":"..."}`;

let sageHistory = [];
let sageCollected = {};
let sageStarted = false;
let sageSubmitted = false;
const SAGE_QUESTIONS=[
  'Thank you. What is your specialty or main holistic modality?',
  'How many years of experience do you have?',
  'What city and country are you based in?',
  'Which languages do you speak with clients?',
  'Do you have a website or social media link? You can write "skip" if not.',
  'Please share a short bio or description of your practice.',
  'Which listing tier do you prefer: Basic ($10/month) or Featured ($25/month)?'
];

function toggleSage() {
  const win = document.getElementById('sage-window');
  win.classList.toggle('open');
  if (win.classList.contains('open') && !sageStarted) {
    sageStarted = true;
    startSage();
  }
  if (win.classList.contains('open')) {
    setTimeout(() => document.getElementById('sage-input').focus(), 100);
  }
}

function showSageTrigger() {
  document.getElementById('sage-trigger').style.display = 'flex';
}

// Watch practitioners page with MutationObserver (does NOT override go())
const sagePageObserver = new MutationObserver(() => {
  const p = document.getElementById('page-practitioners');
  const trigger = document.getElementById('sage-trigger');
  if(trigger) trigger.style.display = (p && p.classList.contains('active')) ? 'flex' : 'none';
});
sagePageObserver.observe(document.body, {subtree:true, attributes:true, attributeFilter:['class']});

async function startSage() {
  const opening = "Hi! I'm Sage, HolisticVox's Practitioner Coordinator \n\nI'm so glad you're interested in joining our network. Could you start by telling me your full name and title?";
  addSageMsg('sage', opening);
  sageHistory.push({ role: 'assistant', content: opening });
  showQuickReplies(['Tell me about HolisticVox', 'What does it cost?', 'I\'m a naturopath', 'I\'m an herbalist']);
}

async function sendToSage() {
  const input = document.getElementById('sage-input');
  const text = input.value.trim();
  if (!text || sageSubmitted) return;

  input.value = '';
  input.style.height = 'auto';
  clearQuickReplies();
  addSageMsg('user', text);
  sageHistory.push({ role: 'user', content: text });

  const typingId = showTyping();
  document.getElementById('sage-send-btn').disabled = true;

  setTimeout(() => {
    removeTyping(typingId);
    const answers=sageHistory.filter(m=>m.role==='user').map(m=>m.content);
    if(answers.length<=SAGE_QUESTIONS.length){
      addSageMsg('sage', SAGE_QUESTIONS[answers.length-1]);
      document.getElementById('sage-send-btn').disabled = false;
      return;
    }
    sageCollected={
      name:answers[0]||'',
      specialty:answers[1]||'',
      experience:answers[2]||'',
      location:answers[3]||'',
      languages:answers[4]||'',
      website:answers[5]||'',
      bio:answers[6]||'',
      tier:answers[7]||''
    };
    const reply=`Thank you, ${sageCollected.name}. I have everything I need and I am submitting your application for Nina to review.`;
      addSageMsg('sage', reply);
      sageHistory.push({ role: 'assistant', content: reply });
      setTimeout(() => submitApplication(), 1500);
  },450);
}

function useQuickReply(text) {
  document.getElementById('sage-input').value = text;
  sendToSage();
}

function showQuickReplies(options) {
  const container = document.getElementById('sage-qr');
  container.innerHTML = options.map(o =>
    `<button class="qr-btn" onclick="useQuickReply('${o}')">${o}</button>`
  ).join('');
}

function clearQuickReplies() {
  document.getElementById('sage-qr').innerHTML = '';
}

function addSageMsg(from, text) {
  const msgs = document.getElementById('sage-msgs');
  const div = document.createElement('div');
  div.className = `msg ${from === 'user' ? 'user' : ''}`;

  const formattedText = text
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  if (from === 'sage') {
    div.innerHTML = `<div class="msg-av"></div><div class="msg-bubble">${formattedText}</div>`;
  } else {
    div.innerHTML = `<div class="msg-bubble">${formattedText}</div>`;
  }

  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('sage-msgs');
  const div = document.createElement('div');
  div.className = 'msg';
  div.id = 'typing-' + Date.now();
  div.innerHTML = `<div class="msg-av"></div><div class="typing-dots"><span></span><span></span><span></span></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div.id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

async function submitApplication() {
  sageSubmitted = true;

  const formData = new FormData();
  formData.append('name', sageCollected.name || '');
  formData.append('specialty', sageCollected.specialty || '');
  formData.append('experience', sageCollected.experience || '');
  formData.append('location', sageCollected.location || '');
  formData.append('languages', sageCollected.languages || '');
  formData.append('website', sageCollected.website || '');
  formData.append('bio', sageCollected.bio || '');
  formData.append('tier', sageCollected.tier || '');
  formData.append('source', 'Sage AI Agent');

  openEmailDraft('HolisticVox practitioner application', formEntriesToLines(Array.from(formData.entries())));

  // Show success message
  const msgs = document.getElementById('sage-msgs');
  const qr = document.getElementById('sage-qr');
  const inputRow = document.querySelector('.sage-input-row');
  const safeSageName = escapeHTML(sageCollected.name || 'there');

  msgs.innerHTML = '';
  qr.innerHTML = '';
  inputRow.style.display = 'none';

  msgs.innerHTML = `
    <div class="sage-submitted">
      <div style="font-size:2.2rem;margin-bottom:12px"></div>
      <h4>Email Draft Opened</h4>
      <p>Thank you, <strong>${safeSageName}</strong>! Please send the email draft that opened so Nina receives your practitioner application.</p>
      <p style="margin-top:8px">If the draft did not open, please email your details to <strong>holisticvoxwellness@gmail.com</strong>.</p>
      <p style="margin-top:8px;color:#C4A228;font-weight:600">She'll personally review your profile and be in touch within 48 hours.</p>
    </div>
  `;
}

function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 80) + 'px';
}

function submitPetsNewsletter() {
  const e = document.getElementById('pets-email');
  if(e && e.value.includes('@')) {
    toast('&#x2713; You\'ll be notified when new pet articles are published!');
    e.value = '';
  } else {
    toast('&#x26A0; Please enter a valid email address.');
  }
}

function submitLongevityNewsletter(){
  const e=document.getElementById('longevity-email');
  if(e&&e.value.includes('@')){toast("&#x2713; You'll be notified when new longevity articles are published!");e.value='';}
  else{toast('&#x26A0; Please enter a valid email address.');}
}

// FORMS
// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
function validate(fields) {
  for (const f of fields) {
    if (!f || !f.value.trim()) {
      if (f) { f.style.borderColor = '#e53e3e'; f.focus(); setTimeout(() => f.style.borderColor = '', 2000); }
      toast(currentLang === 'es' ? '&#x26A0; Por favor completa todos los campos.' : '&#x26A0; Please fill in all required fields.');
      return false;
    }
    if (f.type === 'email' && !f.value.includes('@')) {
      f.style.borderColor = '#e53e3e';
      toast(currentLang === 'es' ? '&#x26A0; Por favor ingresa un correo v&#xE1;lido.' : '&#x26A0; Please enter a valid email.');
      setTimeout(() => f.style.borderColor = '', 2000);
      return false;
    }
  }
  return true;
}
function submitContact() {
  const n = document.getElementById('c-name'), e = document.getElementById('c-email'), m = document.getElementById('c-msg');
  if (validate([n, e, m])) {
    toast(currentLang === 'es' ? '&#x2713; Mensaje enviado. Te respondemos en 24&#x2013;48 horas.' : '&#x2713; Message sent! We\'ll reply within 24&#x2013;48 hours.');
    [n, e, m].forEach(f => f.value = '');
  }
}
function submitNewsletter() {
  const e = document.getElementById('nl-email');
  if (validate([e])) {
    toast(T('nl_success'));
    e.value = '';
  }
}
function submitPractitioner() {
  const form = document.getElementById('practitioner-direct-form');
  if (!form) return;
  if (!form.reportValidity()) return;
  const rows = formEntriesToLines(Array.from(new FormData(form).entries()));
  openEmailDraft('HolisticVox practitioner application', ['Source: Practitioner page form', ...rows]);
  toast(currentLang === 'es' ? '&#x2713; Se abri&#xF3; un borrador de email. Env&#xED;alo para completar la solicitud.' : '&#x2713; Email draft opened. Please send it to complete the application.');
}

// &#x2500;&#x2500; Popup Logic &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;
let popupShown = false;

function showPopup() {
  if (popupShown) return;
  // Don't show if already subscribed (stored in sessionStorage)
  if (sessionStorage.getItem('hv_subscribed')) return;
  popupShown = true;
  document.getElementById('hv-popup').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  document.getElementById('hv-popup').classList.remove('show');
  document.body.style.overflow = '';
}

// Close on overlay click
document.getElementById('hv-popup').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

// Show popup after 25 seconds OR when user scrolls 60% of the page
setTimeout(showPopup, 25000);

window.addEventListener('scroll', function() {
  const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  if (scrollPct > 60) showPopup();
}, { passive: true });

// Exit intent &#x2014; show when mouse moves toward top of page
document.addEventListener('mouseleave', function(e) {
  if (e.clientY < 10) showPopup();
});

function submitPopup() {
  const name  = document.getElementById('popup-name').value.trim();
  const email = document.getElementById('popup-email').value.trim();
  if (!name) { document.getElementById('popup-name').focus(); return; }
  if (!email || !email.includes('@')) { document.getElementById('popup-email').focus(); return; }

  // Send the subscriber to MailerLite (account 2227229, form 189980140483118888).
  // Submitting through a hidden iframe avoids cross-origin errors on a static site.
  try {
    var FRAME = 'ml_hidden_frame';
    var frame = document.getElementById(FRAME);
    if (!frame) {
      frame = document.createElement('iframe');
      frame.name = FRAME; frame.id = FRAME; frame.style.display = 'none';
      document.body.appendChild(frame);
    }
    var f = document.createElement('form');
    f.method = 'POST';
    f.action = 'https://assets.mailerlite.com/jsonp/2227229/forms/189980140483118888/subscribe';
    f.target = FRAME; f.style.display = 'none';
    function add(n, v) { var i = document.createElement('input'); i.type = 'hidden'; i.name = n; i.value = v; f.appendChild(i); }
    add('fields[email]', email);
    add('fields[name]', name);
    add('ml-submit', '1');
    add('anticsrf', 'true');
    document.body.appendChild(f);
    f.submit();
    setTimeout(function () { if (f.parentNode) f.parentNode.removeChild(f); }, 1500);
  } catch (e) {}

  // Show success state
    const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  document.getElementById('popup-form-area').innerHTML = `
    <div class="popup-success">
      <div class="big-leaf">&#x1F33F;</div>
      <h3>You're in, ${safeName}!</h3>
      <p>Please check your inbox to confirm your email. Once you confirm, your free guide
      <strong>"7 Natural Remedies That Actually Work"</strong> will be on its way to <strong>${safeEmail}</strong>.<br><br>
      Don't see it? Take a peek in your spam or promotions folder.</p>
      <button onclick="closePopup();go('articles')" style="margin-top:16px;background:#2d5a2d;color:#fff;border:none;border-radius:50px;padding:10px 24px;font-size:.85rem;font-weight:700;cursor:pointer;font-family:inherit">Continue to Articles &#x2192;</button>
    </div>
  `;

  // Mark as subscribed so popup doesn't show again this session
  sessionStorage.setItem('hv_subscribed', '1');
}

