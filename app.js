const DEFAULT_TITLE='Your next big deadline.';
const DEFAULT_DATE='2026-11-24T12:29'; // Contest entry deadline: Nov 23, 2026 11:59 PM Pacific = Nov 24, 2026 12:29 PM IST
const DEFAULT_STEPS=[
  {text:'Build the core',done:true},{text:'Refine the design',done:true},
  {text:'Test & fix',done:false},{text:'Submit on time',done:false}
];
const $=id=>document.getElementById(id);
let saved={};try{saved=JSON.parse(localStorage.getItem('deadlineMode')||'{}')||{}}catch{}
let deadline=saved.deadline||DEFAULT_DATE,title=saved.title||DEFAULT_TITLE,theme=saved.theme||'cyan';
let steps;try{steps=JSON.parse(localStorage.getItem('deadlineMilestones'))||DEFAULT_STEPS}catch{steps=DEFAULT_STEPS}
const persist=()=>localStorage.setItem('deadlineMode',JSON.stringify({title,deadline,theme}));
function formatDeadline(value){return new Intl.DateTimeFormat(undefined,{weekday:'short',day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit',timeZoneName:'short'}).format(new Date(value));}
function updateCountdown(){const diff=new Date(deadline).getTime()-Date.now();if(Number.isNaN(diff))return;const clock=new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit'}).format(new Date());$('lockClock').textContent=clock;
 if(diff<=0){$('days').textContent='0';$('hours').textContent='00';$('minutes').textContent='00';$('seconds').textContent='00';$('deadlineText').textContent='The deadline has arrived. You did it.';return;}
 const total=Math.floor(diff/1000),d=Math.floor(total/86400),h=Math.floor(total%86400/3600),m=Math.floor(total%3600/60),s=total%60;
 $('days').textContent=d;$('hours').textContent=String(h).padStart(2,'0');$('minutes').textContent=String(m).padStart(2,'0');$('seconds').textContent=String(s).padStart(2,'0');$('deadlineText').textContent='YOUR DEADLINE · '+formatDeadline(deadline);
}
function applySettings(){$('eventTitle').textContent=title;$('titleInput').value=title;$('dateInput').value=deadline;$('themeInput').value=theme;document.documentElement.dataset.theme=theme;updateCountdown();}
function saveSteps(){localStorage.setItem('deadlineMilestones',JSON.stringify(steps));}
function renderSteps(){const host=$('milestones');host.innerHTML='';steps.forEach((step,i)=>{const label=document.createElement('label');label.className='milestone';const box=document.createElement('input');box.type='checkbox';box.checked=!!step.done;box.setAttribute('aria-label',`Mark ${step.text} complete`);box.addEventListener('change',()=>{steps[i].done=box.checked;saveSteps();updateProgress();});const check=document.createElement('span');check.className='check';const num=document.createElement('span');num.className='step';num.textContent=String(i+1).padStart(2,'0');const text=document.createElement('span');text.className='milestone-text';const b=document.createElement('b');b.textContent=step.text;text.append(b);const remove=document.createElement('button');remove.type='button';remove.className='remove-step';remove.textContent='×';remove.setAttribute('aria-label',`Remove ${step.text}`);remove.addEventListener('click',e=>{e.preventDefault();steps.splice(i,1);saveSteps();renderSteps();});label.append(box,check,num,text,remove);host.append(label);});updateProgress();}
function updateProgress(){const done=steps.filter(s=>s.done).length,total=steps.length;$('progressCopy').textContent=`${done} OF ${total} COMPLETE`;$('progressBar').style.width=`${total?done/total*100:0}%`;}
function toast(message){const t=$('toast');t.textContent=message;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),2400);}
$('editToggle').addEventListener('click',()=>{$('settingsPanel').hidden=false;$('editToggle').setAttribute('aria-expanded','true');$('settingsPanel').scrollIntoView({behavior:'smooth',block:'center'});});
$('closeSettings').addEventListener('click',()=>{$('settingsPanel').hidden=true;$('editToggle').setAttribute('aria-expanded','false');});
$('settingsForm').addEventListener('submit',e=>{e.preventDefault();const nextDate=$('dateInput').value;if(!nextDate||new Date(nextDate)<=new Date()){toast('Choose a future deadline.');return;}title=$('titleInput').value.trim()||DEFAULT_TITLE;deadline=nextDate;theme=$('themeInput').value;persist();applySettings();$('settingsPanel').hidden=true;$('editToggle').setAttribute('aria-expanded','false');toast('Your countdown has been updated.');});
$('resetButton').addEventListener('click',()=>{title=DEFAULT_TITLE;deadline=DEFAULT_DATE;theme='cyan';steps=DEFAULT_STEPS.map(s=>({...s}));persist();saveSteps();applySettings();renderSteps();toast('Demo countdown restored.');});
$('milestoneForm').addEventListener('submit',e=>{e.preventDefault();const input=$('milestoneInput'),value=input.value.trim();if(!value)return;if(steps.length>=8){toast('Keep your plan to 8 milestones or fewer.');return;}steps.push({text:value,done:false});input.value='';saveSteps();renderSteps();toast('Milestone added.');});
$('focusButton').addEventListener('click',()=>{document.body.classList.toggle('focus-mode');$('focusButton').innerHTML=document.body.classList.contains('focus-mode')?'Exit focus mode <span>×</span>':'Enter focus mode <span>↗</span>';});
$('wallpaperToggle').addEventListener('click',()=>{const on=document.body.classList.toggle('wallpaper-mode');$('wallpaperToggle').setAttribute('aria-pressed',String(on));$('wallpaperToggle').querySelector('span').textContent=on?'Exit lock-screen view':'Lock-screen view';});
$('shareButton').addEventListener('click',async()=>{const data={title:`${title} — Deadline Mode`,text:`I'm working toward ${title}. Follow my countdown!`,url:location.href};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(`${data.text} ${data.url}`);toast('Share text copied.');}}catch(e){if(e.name!=='AbortError')toast('Could not share from this browser.');}});
$('wallpaperDownload').addEventListener('click',()=>{document.body.classList.add('wallpaper-mode');window.print();setTimeout(()=>document.body.classList.remove('wallpaper-mode'),500);toast('In the print window, choose Save as PDF to keep your lock-screen layout.');});
applySettings();renderSteps();updateCountdown();setInterval(updateCountdown,1000);
