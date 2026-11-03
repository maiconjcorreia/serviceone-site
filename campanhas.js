(()=>{'use strict';
const root=document.documentElement,ga='G-THLG83R9P9',aw='AW-18356498936',key='s1-cookie';
const panel=document.getElementById('cookie'),accept=document.getElementById('accept'),decline=document.getElementById('decline'),settings=document.getElementById('cookie-settings');
let choice=null,loaded=false,configured=false;
try{choice=localStorage.getItem(key)}catch(_){}
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
function loadGoogle(){if(loaded)return;loaded=true;const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+ga;s.onerror=()=>{loaded=false};document.head.appendChild(s)}
function syncConsent(ok){gtag('consent','update',{ad_storage:ok?'granted':'denied',analytics_storage:ok?'granted':'denied',ad_user_data:ok?'granted':'denied',ad_personalization:ok?'granted':'denied'});if(ok){if(!configured){gtag('js',new Date());gtag('config',ga);gtag('config',aw);configured=true}loadGoogle()}}
function choose(value){choice=value;try{localStorage.setItem(key,value)}catch(_){}syncConsent(value==='yes');if(panel)panel.hidden=true;if(settings)settings.focus({preventScroll:true})}
if(panel)panel.hidden=choice==='yes'||choice==='no';
if(choice==='yes')syncConsent(true);
if(accept)accept.addEventListener('click',()=>choose('yes'));
if(decline)decline.addEventListener('click',()=>choose('no'));
if(settings)settings.addEventListener('click',()=>{if(panel){panel.hidden=false;if(accept)accept.focus({preventScroll:true})}});
document.querySelectorAll('[data-whatsapp]').forEach(a=>a.addEventListener('click',()=>{
if(choice!=='yes')return;
const service=a.dataset.service||root.dataset.campaign;
gtag('event',root.dataset.gaEvent,{send_to:ga,campaign_page:root.dataset.campaign,service,method:'whatsapp',cta_position:a.dataset.position||'page',transport_type:'beacon'});
gtag('event','conversion',{send_to:aw+'/'+root.dataset.conversion,transport_type:'beacon'});
}));
})();