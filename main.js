const modal=document.getElementById('sourceModal');
const planTabs=document.getElementById('planTabs');
const sourceGrid=document.getElementById('sourceGrid');
const business=document.getElementById('singleBusiness');
const interior=document.getElementById('singleInterior');
const gallery=document.getElementById('singleGallery');
const title=document.getElementById('modalTitle');
function resetViews(){sourceGrid.hidden=false;planTabs.hidden=false;business.hidden=true;interior.hidden=true;gallery.hidden=true;}
function openModal(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
function filterPlans(kind='all'){
  resetViews(); title.textContent='MẶT BẰNG & BỘ SƯU TẬP SẢN PHẨM';
  planTabs.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.filter===kind));
  sourceGrid.querySelectorAll('.source-card').forEach(card=>{
    const visible=kind==='all'||card.dataset.kind===kind;
    card.classList.toggle('hidden',!visible);
  });
  openModal();
}
document.querySelectorAll('[data-open-plan]').forEach(btn=>btn.addEventListener('click',()=>filterPlans(btn.dataset.openPlan)));
planTabs.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>filterPlans(btn.dataset.filter)));
document.querySelectorAll('[data-open]').forEach(btn=>btn.addEventListener('click',()=>{
  const view=btn.dataset.open; resetViews();
  if(view==='business'){sourceGrid.hidden=true;planTabs.hidden=true;business.hidden=false;title.textContent='CÁC LOẠI HÌNH KINH DOANH';}
  if(view==='interior'){sourceGrid.hidden=true;planTabs.hidden=true;interior.hidden=false;title.textContent='HÌNH ẢNH PENTHOUSE';}
  if(view==='gallery'){sourceGrid.hidden=true;planTabs.hidden=true;gallery.hidden=false;title.textContent='THƯ VIỆN HÌNH ẢNH THEO PDF';}
  openModal();
}));
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
const toast=document.getElementById('toast');
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove('show'),3200)}
document.getElementById('leadForm').addEventListener('submit',e=>{e.preventDefault();showToast('Bản Ladi demo: form chưa kết nối backend, không gửi dữ liệu ra ngoài.');});