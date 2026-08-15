// Load the UX layer separately so the approved visual CSS remains untouched.
(()=>{const l=document.createElement('link');l.rel='stylesheet';l.href='ux.css?v=1';document.head.appendChild(l)})();

const modal=document.getElementById('plansModal');
const modalPanel=modal?.querySelector('.modalPanel');
const modalTitle=modal?.querySelector('header h2');
const toast=document.getElementById('toast');
let returnFocus=null;

if(modal){
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');
  if(modalTitle){modalTitle.id='plansModalTitle';modal.setAttribute('aria-labelledby','plansModalTitle')}
}

function applyFilter(kind='all'){
  document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===kind));
  document.querySelectorAll('.modalGrid article').forEach(card=>card.classList.toggle('hidden',kind!=='all'&&card.dataset.kind!==kind));
}
function focusables(){
  if(!modalPanel)return[];
  return [...modalPanel.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el=>!el.closest('.hidden'));
}
function openModal(kind='all'){
  if(!modal)return;
  const wasOpen=modal.classList.contains('open');
  if(!wasOpen)returnFocus=document.activeElement;
  applyFilter(kind);
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
  if(!wasOpen)requestAnimationFrame(()=>modal.querySelector('[data-close]')?.focus({preventScroll:true}));
}
function closeModal(){
  if(!modal)return;
  modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');
  const target=returnFocus;returnFocus=null;
  setTimeout(()=>target?.focus?.({preventScroll:true}),20);
}

document.getElementById('openAllPlans')?.addEventListener('click',()=>openModal('all'));
document.querySelectorAll('[data-plan]').forEach(btn=>btn.addEventListener('click',()=>openModal(btn.dataset.plan)));
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>applyFilter(btn.dataset.filter)));
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&modal?.classList.contains('open')){e.preventDefault();closeModal();return}
  if(e.key==='Tab'&&modal?.classList.contains('open')){
    const nodes=focusables();if(!nodes.length)return;
    const first=nodes[0],last=nodes[nodes.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }
});

// Business-category buttons open only source-backed material; no invented inventory.
document.querySelectorAll('[data-business]').forEach(btn=>btn.addEventListener('click',()=>{
  openModal('spana');
  showToast('Nhóm kinh doanh bám tài liệu PDF; không thêm dữ liệu ngoài nguồn.');
}));

const floorMap={
 spana:{label:'SPANA TOWER',area:'SHOP KHỐI ĐẾ',text:'Mặt bằng được mở ở bộ sưu tập theo nguồn tài liệu.',bg:"url('https://datnenhoaxuan.com/uploads/images/S1%20T%E1%BA%A7ng%201-A0%281%29.jpg')"},
 cora:{label:'CORA TOWER',area:'LAYOUT',text:'Layout Cora tham chiếu bộ tài liệu và hình nguồn độ phân giải cao.',bg:"url('https://diaocmientrung.vn/wp-content/uploads/2025/10/mat-bang-sun-cora-tower-da-nang.jpg')"},
 slight:{label:'S-LIGHT TOWER',area:'MẶT BẰNG',text:'Mặt bằng S-Light hiển thị từ nguồn hình độ phân giải cao.',bg:"url('https://static1.cafeland.vn/cafelandnew/hinh-anh/2026/06/23/215/image-20260623094549-2.png?t=1')"}
};
document.querySelectorAll('[data-floor]').forEach(btn=>btn.addEventListener('click',()=>{
  const d=floorMap[btn.dataset.floor];if(!d)return;
  document.querySelectorAll('[data-floor]').forEach(b=>b.classList.toggle('active',b===btn));
  const image=document.getElementById('featuredPlan');
  if(image){image.style.backgroundImage=d.bg;image.style.backgroundSize='contain';image.style.backgroundRepeat='no-repeat';image.style.backgroundPosition='center'}
  document.getElementById('planLabel').textContent=d.label;
  document.getElementById('planArea').textContent=d.area;
  document.getElementById('planText').textContent=d.text;
}));

function showToast(msg){
  if(!toast)return;
  toast.textContent=msg;toast.classList.add('show');clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2800);
}

// Clear, non-deceptive preview form validation.
const leadForm=document.getElementById('leadForm');
leadForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const fields=[...leadForm.querySelectorAll('input')];fields.forEach(f=>{f.classList.remove('is-invalid');f.removeAttribute('aria-invalid')});
  const name=fields[0],phone=fields[1];
  const phoneDigits=(phone?.value||'').replace(/\D/g,'');
  let firstBad=null;
  if(!name?.value.trim()){name?.classList.add('is-invalid');name?.setAttribute('aria-invalid','true');firstBad=name}
  if(phoneDigits.length<9){phone?.classList.add('is-invalid');phone?.setAttribute('aria-invalid','true');firstBad=firstBad||phone}
  if(firstBad){firstBad.focus();showToast('Vui lòng nhập họ tên và số điện thoại hợp lệ.');return}
  showToast('Thông tin hợp lệ. Bản preview hiện chưa kết nối backend nên chưa gửi dữ liệu.');
});

// Sticky-header depth + current-section navigation.
const header=document.querySelector('.topbar');
const syncHeader=()=>header?.classList.toggle('is-scrolled',window.scrollY>8);
syncHeader();window.addEventListener('scroll',syncHeader,{passive:true});
const navLinks=[...document.querySelectorAll('.topbar nav a[href^="#"]')];
const sectionById=new Map(navLinks.map(a=>[a.getAttribute('href').slice(1),a]));
const watched=[...sectionById.keys()].map(id=>document.getElementById(id)).filter(Boolean);
if('IntersectionObserver'in window&&watched.length){
  const navObserver=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!visible)return;
    navLinks.forEach(a=>a.removeAttribute('aria-current'));
    sectionById.get(visible.target.id)?.setAttribute('aria-current','true');
  },{rootMargin:'-25% 0px -60% 0px',threshold:[0,.15,.35,.6]});
  watched.forEach(s=>navObserver.observe(s));
}

// Gentle reveals only when motion is allowed.
const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion&&'IntersectionObserver'in window){
  const revealTargets=[
    document.querySelector('.introCopy'),document.querySelector('.valueGrid'),document.querySelector('.productLayout'),
    document.querySelector('.shopCopy'),document.querySelector('.pentLeft'),document.querySelector('.floorContent'),
    document.querySelector('.gallery'),document.querySelector('.lead .shell')
  ].filter(Boolean);
  revealTargets.forEach(el=>el.classList.add('ux-reveal'));
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}
  }),{rootMargin:'0px 0px -8% 0px',threshold:.08});
  revealTargets.forEach(el=>revealObserver.observe(el));
}

// Decode below-fold images asynchronously and provide a non-empty fallback on remote failure.
const fallbackSvg='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#eee7dc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#8b7658" font-family="Arial" font-size="34">SUN GALAXY COMPLEX</text></svg>`);
document.querySelectorAll('img').forEach((img,i)=>{
  img.decoding='async';if(i>1)img.loading='lazy';
  img.addEventListener('error',()=>{if(img.dataset.fallbackDone)return;img.dataset.fallbackDone='1';img.classList.add('image-failed');img.src=fallbackSvg},{once:true});
});
