(function(){
var f=document.getElementById('home-search');
if(f)f.addEventListener('submit',function(e){e.preventDefault();var q=f.q.value.trim();location.href='work.html'+(q?'?q='+encodeURIComponent(q):'')});
var list=document.getElementById('results');if(!list)return;
var items=[].slice.call(list.querySelectorAll('.res')),box=document.getElementById('q'),cnt=document.getElementById('count'),btns=[].slice.call(document.querySelectorAll('.filters button')),cat='all';
function run(){var q=box.value.toLowerCase().trim(),n=0;items.forEach(function(r){var ok=(cat==='all'||r.dataset.cat===cat)&&(!q||r.textContent.toLowerCase().indexOf(q)>-1);r.hidden=!ok;if(ok)n++});cnt.textContent=n+(n===1?' result':' results')}
btns.forEach(function(b){b.addEventListener('click',function(){cat=b.dataset.cat;btns.forEach(function(x){x.setAttribute('aria-pressed',x===b)});run()})});
box.addEventListener('input',run);
var p=new URLSearchParams(location.search).get('q');if(p)box.value=p;run();
})();
