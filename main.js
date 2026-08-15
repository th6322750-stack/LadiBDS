const modal=document.getElementById('plansModal');
const toast=document.getElementById('toast');
function openModal(kind='all'){
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
  document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===kind));
  document.querySelectorAll('.modalGrid article').forEach(card=>card.classList.toggle('hidden',kind!=='all'&&card.dataset.kind!==kind));
}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
document.getElementById('openAllPlans').addEventListener('click',()=>openModal('all'));
document.querySelectorAll('[data-plan]').forEach(btn=>btn.addEventListener('click',()=>openModal(btn.dataset.plan)));
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>openModal(btn.dataset.filter)));
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

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
  const image=document.getElementById('featuredPlan');image.style.backgroundImage=d.bg;image.style.backgroundSize='contain';image.style.backgroundRepeat='no-repeat';image.style.backgroundPosition='center';
  document.getElementById('planLabel').textContent=d.label;document.getElementById('planArea').textContent=d.area;document.getElementById('planText').textContent=d.text;
}));
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2800)}
document.getElementById('leadForm').addEventListener('submit',e=>{e.preventDefault();showToast('Bản preview: form chưa kết nối backend nên chưa gửi dữ liệu.');});
