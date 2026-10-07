(function(){
// mobile menu
var menu=document.querySelector('.menu'),nav=document.querySelector('header nav');
if(menu&&nav)menu.addEventListener('click',function(){var o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});

// reveal on scroll
var rv=[].slice.call(document.querySelectorAll('.reveal'));
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});rv.forEach(function(el){io.observe(el)})}
else rv.forEach(function(el){el.classList.add('in')});

// posters: show a styled tile until the image file exists
var posters=[].slice.call(document.querySelectorAll('.poster'));
posters.forEach(function(p){var img=p.querySelector('img');if(!img)return;
  function bad(){p.classList.add('empty');p.removeAttribute('tabindex')}
  img.addEventListener('error',bad);if(img.complete&&img.naturalWidth===0)bad()});

// lightbox
var lb=document.getElementById('lightbox');if(!lb)return;
var lbImg=lb.querySelector('img'),lbCap=lb.querySelector('p'),cur=0;
function live(){return posters.filter(function(p){return !p.classList.contains('empty')})}
function show(i){var l=live();if(!l.length)return;cur=(i+l.length)%l.length;var im=l[cur].querySelector('img');lbImg.src=im.src;lbImg.alt=im.alt;var b=l[cur].querySelector('b');lbCap.textContent=b?b.textContent:'';lb.classList.add('open');document.body.style.overflow='hidden'}
function close(){lb.classList.remove('open');document.body.style.overflow=''}
posters.forEach(function(p){function go(){if(!p.classList.contains('empty'))show(live().indexOf(p))}
  p.addEventListener('click',go);p.addEventListener('keydown',function(e){if(e.key==='Enter')go()})});
lb.querySelector('.lb-close').addEventListener('click',close);
lb.querySelector('.lb-prev').addEventListener('click',function(){show(cur-1)});
lb.querySelector('.lb-next').addEventListener('click',function(){show(cur+1)});
lb.addEventListener('click',function(e){if(e.target===lb)close()});
document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1)});
})();
