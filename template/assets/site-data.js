/* ============================================================
   TOCHE & FILS — Site Vitrine — app logic
   Vanilla SPA: hash routing, animated transitions, reveal
   ============================================================ */
(function(){
"use strict";

/* ---------------- Lucide-style icons ---------------- */
const I = {
  truck:'<path d="M14 18V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="6.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/>',
  ship:'<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/>',
  card:'<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  handshake:'<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
  globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>',
  wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  wa:'<path d="M17.6 6.32A8.07 8.07 0 0 0 12.05 4 8.13 8.13 0 0 0 4 12.06a8 8 0 0 0 1.1 4.06L4 20l3.95-1.04a8.1 8.1 0 0 0 3.9 1h.2A8.13 8.13 0 0 0 20 11.94a8 8 0 0 0-2.4-5.62m-5.55 12.3a6.74 6.74 0 0 1-3.43-.94l-.25-.15-2.35.62.63-2.29-.16-.25a6.71 6.71 0 0 1 10.42-8.3 6.63 6.63 0 0 1 2 4.71 6.75 6.75 0 0 1-6.73 6.75z"/><path d="M15.7 13.71c-.2-.1-1.18-.59-1.36-.65s-.32-.1-.45.1-.51.64-.63.78-.23.15-.43.05a5.5 5.5 0 0 1-1.62-1 6.1 6.1 0 0 1-1.12-1.39c-.12-.2 0-.31.09-.41s.2-.23.3-.35a1.4 1.4 0 0 0 .2-.33.37.37 0 0 0 0-.35c0-.1-.45-1.08-.62-1.48s-.32-.34-.45-.34h-.38a.74.74 0 0 0-.53.25 2.23 2.23 0 0 0-.7 1.66 3.86 3.86 0 0 0 .82 2.06 8.86 8.86 0 0 0 3.4 3 11 11 0 0 0 1.13.42 2.72 2.72 0 0 0 1.25.08 2 2 0 0 0 1.34-.95 1.66 1.66 0 0 0 .12-.94c-.05-.08-.18-.13-.38-.23z"/>',
  arrow:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  chevR:'<path d="m9 18 6-6-6-6"/>',
  chevD:'<path d="m6 9 6 6 6-6"/>',
  chevU:'<path d="m18 15-6-6-6 6"/>',
  send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
  file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  checkCircle:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  menu:'<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  award:'<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  sparkle:'<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
  excavator:'<path d="M3 18h13v-3H3z"/><circle cx="6" cy="20.5" r="1.5"/><circle cx="13" cy="20.5" r="1.5"/><path d="M9 15V9h3l1 3"/><path d="m13 9 4-4 2 2-3 4"/><path d="M18 6l3 3"/>',
  fb:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
};
function icon(name, cls){
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${cls?`class="${cls}"`:''}>${I[name]||''}</svg>`;
}
window.__icon = icon;
window.__ICONS = I;

/* category equipment silhouettes for placeholders */
const EQ = {
  'Camions bennes': I.truck,
  'Tracteurs routiers': I.truck,
  'Excavateurs': I.excavator,
  'Chargeuses sur pneus': I.excavator,
  'Bulldozers': I.excavator,
  'Compacteurs': I.truck,
  'Semi-remorques': I.truck,
  'Autres machines': I.package,
};
function ph(cat, soft, tag){
  const g = EQ[cat]||I.truck;
  return `<div class="ph ${soft?'soft':''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${g}</svg>${tag?`<span class="ph-tag">${tag}</span>`:''}</div>`;
}

/* ---------------- Data ---------------- */
const CATS = ['Camions bennes','Tracteurs routiers','Chargeuses sur pneus','Excavateurs','Bulldozers','Compacteurs','Semi-remorques','Autres machines'];
const PRODUCTS = [
  {id:'howo-8x4', name:'SINOTRUK HOWO 8x4', brand:'SINOTRUK', model:'HOWO 380', cat:'Camions bennes', feat:true,
   img:'assets/img/p-howo-clean.png',
   desc:"Camion benne robuste 8x4 conçu pour les chantiers exigeants et le transport de matériaux lourds. Châssis renforcé, benne haute résistance et moteur fiable adapté aux conditions africaines.",
   specs:{'Charge utile':'25 – 30 Tonnes','Moteur':'HOWO D12 380CV','Boîte de vitesses':'HW19710 / 10 rapports','Configuration':'8x4','Capacité benne':'18 – 22 m³','Cabine':'HW76, climatisée'}},
  {id:'shacman-f3000', name:'SHACMAN F3000', brand:'SHACMAN', model:'Dump Truck 6x4', cat:'Camions bennes', feat:true,
   img:'assets/img/p-shacman-cl.png',
   desc:"Le SHACMAN F3000 allie puissance et économie de carburant. Une référence pour le transport minier et de chantier sur longues distances.",
   specs:{'Charge utile':'20 – 25 Tonnes','Moteur':'Weichai 340CV','Boîte de vitesses':'Fast 10 rapports','Configuration':'6x4','Capacité benne':'16 m³','Réservoir':'300 L'}},
  {id:'sany-sy215', name:'SANY SY215C', brand:'SANY', model:'Excavateur 21.5T', cat:'Excavateurs', feat:true,
   img:'assets/img/p-excav2.png',
   desc:"Excavateur hydraulique polyvalent de 21,5 tonnes. Précision, faible consommation et grande fiabilité pour terrassement et travaux publics.",
   specs:{'Poids opérationnel':'21.5 Tonnes','Moteur':'Isuzu 4HK1 164CV','Godet':'1.0 m³','Profondeur de creusement':'6.66 m','Force de pénétration':'150 kN','Vitesse déplacement':'5.5 km/h'}},
  {id:'sdlg-956', name:'SDLG LG956L', brand:'SDLG', model:'Chargeuse 5T', cat:'Chargeuses sur pneus', feat:true,
   img:'assets/img/p-loader2.png',
   desc:"Chargeuse sur pneus de 5 tonnes, idéale pour la manutention, le chargement de camions et les carrières. Excellent rapport robustesse / coût.",
   specs:{'Charge nominale':'5 Tonnes','Moteur':'Deutz / Weichai 162kW','Capacité godet':'3.0 m³','Hauteur de déversement':'3.1 m','Poids':'16.7 Tonnes','Transmission':'Powershift'}},
  {id:'shacman-x3000', name:'SHACMAN X3000', brand:'SHACMAN', model:'Tracteur routier 6x4', cat:'Tracteurs routiers', feat:false,
   img:'assets/img/p-tractor-red.png',
   desc:"Tracteur routier 420CV pour le transport longue distance et le remorquage de semi-remorques lourdes.",
   specs:{'Puissance':'420 CV','Moteur':'Weichai WP12','Configuration':'6x4','Boîte':'Fast 12 rapports','Cabine':'Couchette double','Sellette':'90#'}},
  {id:'sany-sd22', name:'SANY SD22', brand:'SANY', model:'Bulldozer 220CV', cat:'Bulldozers', feat:false,
   img:'assets/img/p-bulldozer2.png',
   desc:"Bulldozer sur chenilles de 220CV pour le nivellement, le décapage et les gros travaux de terrassement.",
   specs:{'Puissance':'220 CV','Poids':'23.6 Tonnes','Lame':'3.9 m³','Type':'Chenilles','Moteur':'Cummins NTA855','Pression au sol':'0.78 kg/cm²'}},
  {id:'xcmg-xs123', name:'XCMG XS123', brand:'XCMG', model:'Compacteur 12T', cat:'Compacteurs', feat:false,
   img:'assets/img/p-roller2.png',
   desc:"Compacteur vibrant monocylindre de 12 tonnes pour le compactage de remblais, routes et plateformes.",
   specs:{'Poids opérationnel':'12 Tonnes','Largeur cylindre':'2130 mm','Force centrifuge':'250 / 140 kN','Moteur':'Shangchai 130kW','Vitesse':'0–11 km/h','Pente franchissable':'30%'}},
  {id:'cimc-semi', name:'CIMC Semi-remorque', brand:'CIMC', model:'Benne 60T', cat:'Semi-remorques', feat:false,
   img:'assets/img/p-trailer2.png',
   desc:"Semi-remorque benne 3 essieux de forte capacité pour le transport de minerais, sable et gravats.",
   specs:{'Capacité':'60 Tonnes','Essieux':'3 x 13T','Volume':'40 m³','Suspension':'Mécanique','Pneus':'12 unités','Acier benne':'Hardox 450'}},
  {id:'hitachi-zx350', name:'Hitachi ZX350', brand:'Hitachi', model:'Excavateur 35T', cat:'Excavateurs', feat:false,
   img:'assets/img/p-dump6b.png',
   desc:"Excavateur lourd de 35 tonnes pour mines et grands chantiers. Hydraulique haute performance et confort opérateur.",
   specs:{'Poids opérationnel':'35 Tonnes','Moteur':'Isuzu 271CV','Godet':'1.4 m³','Profondeur':'7.4 m','Force de pénétration':'230 kN','Réservoir':'480 L'}},
];
const PHONE_CM='+237 694 945 547', PHONE_CN='+86 18333718710', EMAIL='franklin@gmail.com';
window.__TF = {CATS,PRODUCTS,ph,PHONE_CM,PHONE_CN,EMAIL};
})();
