/* ============================================================
   TOCHE & FILS — Backoffice — icons + data
   ============================================================ */
(function(){
"use strict";
const I={
  dashboard:'<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>',
  layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
  clipboard:'<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h6"/>',
  mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  image:'<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  receipt:'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  chart:'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',
  menu:'<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/>',
  trash:'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  checkCircle:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  truck:'<path d="M14 18V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="6.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/>',
  excavator:'<path d="M3 18h13v-3H3z"/><circle cx="6" cy="20.5" r="1.5"/><circle cx="13" cy="20.5" r="1.5"/><path d="M9 15V9h3l1 3"/><path d="m13 9 4-4 2 2-3 4"/><path d="M18 6l3 3"/>',
  logout:'<path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>',
  lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  trendUp:'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
  trendDown:'<path d="M16 17h6v-6"/><path d="m22 17-8.5-8.5-5 5L2 7"/>',
  arrowR:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  printer:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect width="12" height="8" x="6" y="14" rx="1"/>',
  credit:'<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
};
function icon(n,a){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${a||''}>${I[n]||''}</svg>`;}
const EQ={truck:I.truck,exc:I.excavator,pkg:I.package};
function ph(kind,soft){const g=kind==='exc'?I.excavator:kind==='pkg'?I.package:I.truck;return `<div class="ph ${soft?'soft':''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${g}</svg></div>`;}

/* ---------------- Data ---------------- */
const CATS=['Camions bennes','Tracteurs routiers','Chargeuses sur pneus','Excavateurs','Bulldozers','Compacteurs','Semi-remorques','Autres machines'];
const PRODUCTS=[
  {name:'SINOTRUK HOWO 8x4',brand:'SINOTRUK',cat:'Camions bennes',kind:'truck',img:'assets/img/p-howo-clean.png',status:'active',feat:true,date:'12/06/2026'},
  {name:'SHACMAN F3000',brand:'SHACMAN',cat:'Camions bennes',kind:'truck',img:'assets/img/p-shacman-cl.png',status:'active',feat:true,date:'10/06/2026'},
  {name:'SANY SY215C',brand:'SANY',cat:'Excavateurs',kind:'exc',img:'assets/img/p-excav2.png',status:'active',feat:true,date:'08/06/2026'},
  {name:'SDLG LG956L',brand:'SDLG',cat:'Chargeuses sur pneus',kind:'exc',img:'assets/img/p-loader2.png',status:'active',feat:true,date:'05/06/2026'},
  {name:'SHACMAN X3000',brand:'SHACMAN',cat:'Tracteurs routiers',kind:'truck',img:'assets/img/p-tractor-red.png',status:'active',feat:false,date:'02/06/2026'},
  {name:'SANY SD22',brand:'SANY',cat:'Bulldozers',kind:'exc',img:'assets/img/p-bulldozer2.png',status:'active',feat:false,date:'28/05/2026'},
  {name:'XCMG XS123',brand:'XCMG',cat:'Compacteurs',kind:'truck',img:'assets/img/p-roller2.png',status:'archived',feat:false,date:'20/05/2026'},
  {name:'Hitachi ZX350',brand:'Hitachi',cat:'Excavateurs',kind:'exc',img:'assets/img/p-dump6b.png',status:'active',feat:false,date:'15/05/2026'},
];
const DEVIS=[
  {date:'12/06/2026',name:'Jean Mbarga',email:'jmbarga@email.cm',phone:'+237 677 11 22 33',product:'SINOTRUK HOWO 8x4',qty:2,country:'Cameroun',status:'new',msg:'Bonjour, je souhaite 2 camions bennes pour un chantier à Douala. Quel délai de livraison ?'},
  {date:'11/06/2026',name:'Ali Hassan',email:'ali.h@email.sn',phone:'+221 77 88 99 00',product:'SANY SY215C',qty:1,country:'Sénégal',status:'prog',msg:'Besoin d\'un excavateur 21T pour terrassement. Merci de m\'envoyer une offre.'},
  {date:'10/06/2026',name:'Paul Essono',email:'p.essono@email.ga',phone:'+241 06 12 34 56',product:'SDLG LG956L',qty:1,country:'Gabon',status:'done',msg:'Demande de devis pour chargeuse sur pneus. Livraison Libreville.'},
  {date:'09/06/2026',name:'Aminata Diallo',email:'a.diallo@email.ci',phone:'+225 07 00 11 22',product:'SHACMAN F3000',qty:3,country:'Côte d\'Ivoire',status:'new',msg:'Flotte de 3 dump trucks pour société minière. Urgent.'},
  {date:'07/06/2026',name:'Joseph Nkomo',email:'j.nkomo@email.cm',phone:'+237 699 44 55 66',product:'SANY SD22',qty:1,country:'Cameroun',status:'prog',msg:'Bulldozer pour ouverture de piste. Quel est le prix CIF Douala ?'},
  {date:'05/06/2026',name:'Fatou Sow',email:'f.sow@email.sn',phone:'+221 76 12 34 56',product:'Hitachi ZX350',qty:2,country:'Sénégal',status:'done',msg:'2 excavateurs lourds pour carrière. Merci.'},
];
const MESSAGES=[
  {date:'12/06/2026',name:'Marc Ondoa',email:'marc.o@email.cm',subject:'Partenariat distribution',unread:true,excerpt:'Bonjour, je représente une société de BTP et souhaiterais discuter d\'un partenariat...'},
  {date:'11/06/2026',name:'Grace Kamga',email:'g.kamga@email.cm',subject:'Pièces détachées SINOTRUK',unread:true,excerpt:'Fournissez-vous également les pièces détachées pour les camions HOWO ?'},
  {date:'10/06/2026',name:'Ibrahim Touré',email:'i.toure@email.ml',subject:'Délais de livraison Mali',unread:true,excerpt:'Quels sont vos délais pour une livraison à Bamako via le port de Dakar ?'},
  {date:'08/06/2026',name:'Sandra Eyenga',email:'s.eyenga@email.cm',subject:'Visite showroom Chine',unread:false,excerpt:'Est-il possible d\'organiser une visite de vos showrooms à Guangzhou ?'},
];
const USERS=[
  {name:'Franklin Kuate',email:'franklin@gmail.com',role:'Administrateur',status:'active',init:'FK'},
  {name:'Estelle Mballa',email:'estelle.m@toche.com',role:'Éditeur',status:'active',init:'EM'},
  {name:'Bertrand Nana',email:'bertrand.n@toche.com',role:'Comptable',status:'active',init:'BN'},
  {name:'Yvan Tchoupo',email:'yvan.t@toche.com',role:'Éditeur',status:'inactive',init:'YT'},
];
const INVOICES=[
  {n:'FAC-2026-0042',client:'Société BTP Douala',date:'10/06/2026',amount:'48 500 000',status:'paid'},
  {n:'FAC-2026-0041',client:'Mines du Sud SARL',date:'05/06/2026',amount:'112 000 000',status:'paid'},
  {n:'FAC-2026-0040',client:'Entreprise Nkomo',date:'01/06/2026',amount:'27 800 000',status:'pend'},
  {n:'FAC-2026-0039',client:'GabTravaux',date:'24/05/2026',amount:'63 200 000',status:'over'},
];

window.__ADMIN={icon,ph,CATS,PRODUCTS,DEVIS,MESSAGES,USERS,INVOICES};
})();
