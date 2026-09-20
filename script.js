gsap.registerPlugin(ScrollTrigger);
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
let lenis;
if(window.Lenis){lenis=new Lenis({duration:1.25,smoothWheel:true});lenis.on("scroll",ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
const dot=$(".cursor-dot"),ring=$(".cursor-ring");let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;gsap.set(dot,{x:mx,y:my})});
gsap.ticker.add(()=>{rx+=(mx-rx)*.14;ry+=(my-ry)*.14;gsap.set(ring,{x:rx,y:ry})});
$$("a,.skill-list>div,.cert").forEach(x=>{x.addEventListener("mouseenter",()=>ring.classList.add("big"));x.addEventListener("mouseleave",()=>ring.classList.remove("big"))});

let p={v:0};gsap.to(p,{v:100,duration:1.9,ease:"power2.out",onUpdate(){ $(".loader-count").textContent=String(Math.round(p.v)).padStart(2,"0");$(".loader-bar i").style.width=p.v+"%"},onComplete(){
gsap.timeline().to(".loader",{yPercent:-100,duration:1,ease:"power4.inOut"}).set(".loader",{display:"none"}).add(intro(),"-=.4")
}});
function intro(){let t=gsap.timeline();t.from(".nav",{y:-20,opacity:0,duration:.7}).from(".hero-title .line>span",{yPercent:120,duration:1.25,stagger:.1,ease:"power4.out"},"-.35").from(".hero-photo",{opacity:0,y:70,scale:.94,rotate:8,duration:1.4,ease:"power4.out"},"-.9").from(".hero-top,.hero-bottom",{opacity:0,y:15,duration:.8,stagger:.1},"-.9");return t}
$$(".hero-photo").forEach(el=>gsap.to(el,{yPercent:15,rotate:-1,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}}));
gsap.to(".hero-grid",{yPercent:12,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
$$(".skill-list>div,.event,.cert,.case,.about-copy,.about h2,.quote,.work-intro").forEach(el=>gsap.fromTo(el,{opacity:0,y:60},{opacity:1,y:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 86%",once:true}}));
$$(".floating-type span").forEach((el,i)=>gsap.to(el,{y:i%2?-12:12,duration:2+i*.15,repeat:-1,yoyo:true,ease:"sine.inOut"}));
gsap.from(".contact-glow",{scale:.5,scrollTrigger:{trigger:".contact",start:"top bottom",end:"bottom top",scrub:true}});
$$(".case-visual").forEach(v=>gsap.fromTo(v,{scale:.94},{scale:1,ease:"none",scrollTrigger:{trigger:v,start:"top 90%",end:"bottom 15%",scrub:true}}));
$$("a[href^='#']").forEach(a=>a.addEventListener("click",e=>{let el=$(a.getAttribute("href"));if(el){e.preventDefault();lenis?lenis.scrollTo(el,{offset:-20}):el.scrollIntoView()}}));
addEventListener("load",()=>ScrollTrigger.refresh());


/* ---------- V3 interactions ---------- */
const progressBar = document.querySelector(".page-progress i");
const cursorLabel = document.querySelector(".cursor-label");

if (progressBar) {
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progressBar.style.height = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  };
  addEventListener("scroll", updateProgress, {passive:true});
  updateProgress();
}

// Cursor says VIEW over project artwork.
document.querySelectorAll(".case").forEach(card => {
  card.addEventListener("mouseenter", () => cursorLabel?.classList.add("show"));
  card.addEventListener("mouseleave", () => cursorLabel?.classList.remove("show"));
});

// Navigation overlay.
const menu = document.querySelector(".menu-overlay");
const menuButton = document.querySelector(".nav-menu");
const menuClose = document.querySelector(".menu-close");

function openMenu(){
  if(!menu) return;
  menu.style.visibility="visible";
  gsap.to(menu,{yPercent:0,duration:.9,ease:"power4.inOut"});
  gsap.fromTo(".menu-inner a",{y:70,opacity:0},{y:0,opacity:1,duration:.7,stagger:.07,delay:.3,ease:"power3.out"});
}
function closeMenu(){
  if(!menu) return;
  gsap.to(menu,{yPercent:-105,duration:.8,ease:"power4.inOut",onComplete:()=>menu.style.visibility="hidden"});
}
menuButton?.addEventListener("click",openMenu);
menuClose?.addEventListener("click",closeMenu);
document.querySelectorAll(".menu-inner a").forEach(a=>a.addEventListener("click",closeMenu));

// Project case-study modal. Content is descriptive only; no URLs are invented.
const projectData = {
  resume:{n:"01 / 03",title:"Resume <em>Builder</em>",desc:"Interactive resume generation using Python and Streamlit, producing formatted downloadable PDFs.",tags:["PYTHON","STREAMLIT","PDF"]},
  home:{n:"02 / 03",title:"Home Value <em>Prediction</em>",desc:"Flask-based machine-learning platform using Random Forest Regression with maps, prediction history, batch CSV prediction and dashboard visualization.",tags:["PYTHON","ML","FLASK"]},
  orders:{n:"03 / 03",title:"Company Order <em>App</em>",desc:"Java-based order management system for structured data entry, storage and retrieval.",tags:["JAVA","DATABASE","CRUD"]}
};
const modal=document.querySelector(".project-modal");
const modalNumber=document.querySelector(".modal-number");
const modalTitle=document.querySelector(".modal-content h2");
const modalDesc=document.querySelector(".modal-description");
const modalTags=document.querySelector(".modal-tags");

function showProject(key){
  const d=projectData[key]; if(!d||!modal) return;
  modalNumber.textContent=d.n; modalTitle.innerHTML=d.title; modalDesc.textContent=d.desc;
  modalTags.innerHTML=d.tags.map(x=>`<b>${x}</b>`).join("");
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
  gsap.fromTo(".modal-panel",{y:50,opacity:0,scale:.97},{y:0,opacity:1,scale:1,duration:.7,ease:"power3.out"});
}
function hideProject(){
  if(!modal) return;
  gsap.to(".modal-panel",{y:30,opacity:0,duration:.35,onComplete:()=>{
    modal.classList.remove("open");modal.setAttribute("aria-hidden","true");
  }});
}
document.querySelectorAll(".case").forEach(card=>{
  card.addEventListener("click",()=>showProject(card.dataset.project));
});
document.querySelector(".modal-close")?.addEventListener("click",hideProject);
document.querySelector(".modal-backdrop")?.addEventListener("click",hideProject);
addEventListener("keydown",e=>{if(e.key==="Escape"){hideProject();closeMenu()}});

// Gentle 3D tilt for project visuals.
document.querySelectorAll(".case-visual").forEach(visual=>{
  visual.addEventListener("mousemove",e=>{
    if(innerWidth<900)return;
    const r=visual.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    gsap.to(visual,{rotateX:-y*3,rotateY:x*3,transformPerspective:900,duration:.5,ease:"power2.out"});
  });
  visual.addEventListener("mouseleave",()=>gsap.to(visual,{rotateX:0,rotateY:0,duration:.7,ease:"power3.out"}));
});

/* ---------- Touch/mobile performance ---------- */
const isTouch = window.matchMedia("(hover:none), (pointer:coarse)").matches;
if (isTouch) {
  // Remove desktop-only 3D tilt listeners by leaving the visual static on touch.
  document.querySelectorAll(".case-visual").forEach(v => {
    v.style.transform = "none";
  });
  // Keep the decorative floating type slower on phones.
  document.querySelectorAll(".floating-type span").forEach((el,i)=>{
    gsap.killTweensOf(el);
    gsap.to(el,{y:i%2?-5:5,duration:3.5+i*.15,repeat:-1,yoyo:true,ease:"sine.inOut"});
  });
}
