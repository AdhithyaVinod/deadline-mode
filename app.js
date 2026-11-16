const DEFAULT_TITLE = 'Your next big deadline.';
const DEFAULT_DATE = '2026-11-24T12:29'; // 23 Nov 2026, 11:59 PM Pacific Time = 24 Nov, 12:29 PM India time
const $ = (id) => document.getElementById(id);
const saved = JSON.parse(localStorage.getItem('deadlineMode') || '{}');
let deadline = saved.deadline || DEFAULT_DATE;
let title = saved.title || DEFAULT_TITLE;

function persist(){ localStorage.setItem('deadlineMode', JSON.stringify({title, deadline})); }
function formatDeadline(value){
  const d = new Date(value);
  return new Intl.DateTimeFormat(undefined,{weekday:'short',day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit',timeZoneName:'short'}).format(d);
}
function updateCountdown(){
  const diff = new Date(deadline).getTime() - Date.now();
  if(Number.isNaN(diff)) return;
  if(diff <= 0){ $('days').textContent='0'; $('hours').textContent='00'; $('minutes').textContent='00'; $('seconds').textContent='00'; $('deadlineText').textContent='The deadline has arrived. You did it.'; return; }
  const total = Math.floor(diff/1000);
  const days = Math.floor(total/86400), hours = Math.floor(total%86400/3600), minutes = Math.floor(total%3600/60), seconds = total%60;
  $('days').textContent = days;
  $('hours').textContent = String(hours).padStart(2,'0');
  $('minutes').textContent = String(minutes).padStart(2,'0');
  $('seconds').textContent = String(seconds).padStart(2,'0');
  $('deadlineText').textContent = 'YOUR DEADLINE · ' + formatDeadline(deadline);
}
function applySettings(){ $('eventTitle').textContent=title; $('titleInput').value=title; $('dateInput').value=deadline; updateCountdown(); }
function updateProgress(){
  const boxes=[...document.querySelectorAll('.milestone input')];
  const done=boxes.filter(x=>x.checked).length;
  $('progressCopy').textContent=`${done} OF ${boxes.length} COMPLETE`;
  $('progressBar').style.width=`${done/boxes.length*100}%`;
  localStorage.setItem('deadlineMilestones',JSON.stringify(boxes.map(x=>x.checked)));
}
function toast(message){const t=$('toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2300)}
$('editToggle').addEventListener('click',()=>{$('settingsPanel').hidden=false;$('editToggle').setAttribute('aria-expanded','true');$('settingsPanel').scrollIntoView({behavior:'smooth',block:'center'});});
$('closeSettings').addEventListener('click',()=>{$('settingsPanel').hidden=true;$('editToggle').setAttribute('aria-expanded','false');});
$('settingsForm').addEventListener('submit',e=>{e.preventDefault();title=$('titleInput').value.trim()||DEFAULT_TITLE;deadline=$('dateInput').value;if(new Date(deadline)<=new Date()){toast('Choose a future deadline.');return;}persist();applySettings();$('settingsPanel').hidden=true;$('editToggle').setAttribute('aria-expanded','false');toast('Your countdown has been updated.');});
$('resetButton').addEventListener('click',()=>{title=DEFAULT_TITLE;deadline=DEFAULT_DATE;persist();applySettings();toast('Demo countdown restored.');});
$('focusButton').addEventListener('click',()=>{document.body.classList.toggle('focus-mode');$('focusButton').innerHTML=document.body.classList.contains('focus-mode')?'Exit focus mode <span>×</span>':'Enter focus mode <span>↗</span>';});
$('shareButton').addEventListener('click',async()=>{const data={title:`${title} — Deadline Mode`,text:`I'm working toward ${title}. Follow my countdown!`,url:location.href};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(`${data.text} ${data.url}`);toast('Share text copied.');}}catch(e){if(e.name!=='AbortError')toast('Could not share from this browser.');}});
document.querySelectorAll('.milestone input').forEach(x=>x.addEventListener('change',updateProgress));
const checks=JSON.parse(localStorage.getItem('deadlineMilestones')||'null');if(checks)document.querySelectorAll('.milestone input').forEach((x,i)=>x.checked=!!checks[i]);
applySettings();updateProgress();updateCountdown();setInterval(updateCountdown,1000);
