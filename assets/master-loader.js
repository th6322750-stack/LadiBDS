(function(){
  var img=document.getElementById('masterImage');
  var fallback=document.getElementById('masterFallback');
  if(!img||!window.__MASTER){
    if(fallback) fallback.hidden=false;
    return;
  }
  img.onload=function(){
    document.documentElement.classList.add('master-ready');
    if(fallback) fallback.hidden=true;
  };
  img.onerror=function(){
    if(fallback) fallback.hidden=false;
  };
  img.src='data:image/webp;base64,'+window.__MASTER;
})();