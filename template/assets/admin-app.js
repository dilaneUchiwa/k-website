/* ============================================================
   TOCHE & FILS — Backoffice — shell, router, pages
   ============================================================ */
(function(){
"use strict";
const {icon,ph,CATS,PRODUCTS,DEVIS,MESSAGES,USERS,INVOICES}=window.__ADMIN;
const $=s=>document.querySelector(s);

/* ---------- Nav model ---------- */
const NAV=[
  {cat:'Pilotage'},
  {id:'dashboard',ic:'dashboard',t:'Tableau de bord'},
  {cat:'Catalogue'},
  {id:'catalogue',ic:'package',t:'Produits'},
  {id:'categories',ic:'layers',t:'Catégories'},
  {id:'medias',ic:'image',t:'Médias'},
  {cat:'Relation client'},
  {id:'devis',ic:'clipboard',t:'Demandes de devis',count:()=>DEVIS.filter(d=>d.status==='new').length},
  {id:'messages',ic:'mail',t:'Messages',count:()=>MESSAGES.filter(m=>m.unread).length},
  {cat:'Finance'},
  {id:'facturation',ic:'receipt',t:'Facturation'},
  {id:'comptabilite',ic:'chart',t:'Comptabilité'},
  {cat:'Configuration'},
  {id:'pages',ic:'file',t:'Pages & contenus'},
  {id:'utilisateurs',ic:'users',t:'Utilisateurs'},
  {id:'parametres',ic:'settings',t:'Paramètres'},
];
const TITLES={dashboard:'Tableau de bord',catalogue:'Gestion du catalogue',categories:'Catégories',medias:'Bibliothèque de médias',devis:'Demandes de devis',messages:'Messages de contact',facturation:'Facturation',comptabilite:'Comptabilité',pages:'Pages & contenus',utilisateurs:'Utilisateurs & rôles',parametres:'Paramètres','produit-new':'Nouveau produit'};

/* ---------- helpers ---------- */
function statCard(o){
  return `<div class="stat-card"><div class="row"><div class="ic ${o.color}">${icon(o.ic)}</div>
    ${o.trend?`<span class="trend ${o.trend.dir}">${icon(o.trend.dir==='up'?'trendUp':o.trend.dir==='down'?'trendDown':'arrowR')} ${o.trend.v}</span>`:''}</div>
    <div class="v">${o.v}</div><div class="lbl">${o.lbl}</div></div>`;
}
function badgeDevis(s){const m={new:['new','Nouveau'],prog:['prog','En traitement'],done:['done','Traité']}[s];return `<span class="badge ${m[0]}"><span class="d"></span>${m[1]}</span>`;}
function initials(n){return n.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();}

/* =========================================================
   DASHBOARD
   ========================================================= */
function Dashboard(){
  const newDevis=DEVIS.filter(d=>d.status==='new').length;
  const unread=MESSAGES.filter(m=>m.unread).length;
  const recent=DEVIS.slice(0,5);
  return `<div class="content">
    <div class="page-head">
      <div><h1>Bonjour, Franklin 👋</h1><p>Voici l'activité de TOCHE &amp; FILS aujourd'hui — 12 juin 2026.</p></div>
      <div class="ph-actions">
        <button class="btn btn-secondary" data-go="comptabilite">${icon('chart')} Rapport financier</button>
        <button class="btn btn-cta" data-go="produit-new">${icon('plus')} Nouveau produit</button>
      </div>
    </div>
    <div class="grid-4" style="margin-bottom:22px">
      ${statCard({ic:'package',color:'blue',v:PRODUCTS.filter(p=>p.status==='active').length,lbl:'Produits actifs',trend:{dir:'up',v:'+3'}})}
      ${statCard({ic:'clipboard',color:'orange',v:newDevis,lbl:'Devis en attente',trend:{dir:'up',v:'+2'}})}
      ${statCard({ic:'mail',color:'sky',v:unread,lbl:'Messages non lus',trend:{dir:'flat',v:'='}})}
      ${statCard({ic:'wallet',color:'green',v:'251 M',lbl:'CA du mois (FCFA)',trend:{dir:'up',v:'+18%'}})}
    </div>
    <div class="grid-2" style="grid-template-columns:1.6fr 1fr;align-items:start">
      <div class="card">
        <div class="card-head"><h3>Dernières demandes de devis</h3><a data-go="devis">Voir toutes ›</a></div>
        <table class="tbl"><thead><tr><th>Client</th><th>Produit</th><th>Pays</th><th>Statut</th></tr></thead><tbody>
        ${recent.map(d=>`<tr style="cursor:pointer" data-devis="${d.name}">
          <td><div class="client"><div class="av">${initials(d.name)}</div><div><b>${d.name}</b><span>${d.date}</span></div></div></td>
          <td>${d.product}</td><td>${d.country}</td><td>${badgeDevis(d.status)}</td></tr>`).join('')}
        </tbody></table>
      </div>
      <div style="display:flex;flex-direction:column;gap:18px">
        <div class="card card-pad">
          <h3 style="font-size:16px;color:var(--navy);margin-bottom:16px">Objectif du mois</h3>
          <div class="kv" style="margin-bottom:8px"><span class="muted" style="color:var(--muted)">251 M / 300 M FCFA</span><b style="font-family:var(--ff-head);color:var(--blue)">84%</b></div>
          <div class="prog green"><i style="width:84%"></i></div>
          <p style="font-size:13px;color:var(--muted);margin:14px 0 0">Plus que <b style="color:var(--ink)">49 M FCFA</b> pour atteindre votre objectif mensuel.</p>
        </div>
        <div class="card card-pad">
          <h3 style="font-size:16px;color:var(--navy);margin-bottom:14px">Actions rapides</h3>
          <div style="display:grid;gap:9px">
            <button class="btn btn-secondary" style="justify-content:flex-start" data-go="produit-new">${icon('plus')} Ajouter un produit</button>
            <button class="btn btn-secondary" style="justify-content:flex-start" data-go="devis">${icon('clipboard')} Traiter les devis</button>
            <button class="btn btn-secondary" style="justify-content:flex-start" data-go="facturation">${icon('receipt')} Créer une facture</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* =========================================================
   CATALOGUE (admin)
   ========================================================= */
let PROD_FILTER='all';
function Catalogue(){
  return `<div class="content">
    <div class="page-head">
      <div><h1>Gestion du catalogue</h1><p>${PRODUCTS.length} produits · ${PRODUCTS.filter(p=>p.feat).length} en vedette</p></div>
      <div class="ph-actions"><button class="btn btn-secondary" data-go="categories">${icon('layers')} Catégories</button><button class="btn btn-cta" data-go="produit-new">${icon('plus')} Nouveau produit</button></div>
    </div>
    <div class="toolbar">
      <div class="seg" id="prodSeg">
        <button class="${PROD_FILTER==='all'?'on':''}" data-f="all">Tous</button>
        <button class="${PROD_FILTER==='active'?'on':''}" data-f="active">Actifs</button>
        <button class="${PROD_FILTER==='feat'?'on':''}" data-f="feat">Vedettes</button>
        <button class="${PROD_FILTER==='archived'?'on':''}" data-f="archived">Archivés</button>
      </div>
      <div class="grow"></div>
      <div class="input-ic" style="width:280px">${icon('search')}<input class="input" id="prodSearch" placeholder="Rechercher…"></div>
    </div>
    <div class="grid-4" id="prodGrid"></div>
  </div>`;
}
function renderProdGrid(){
  const grid=$('#prodGrid');if(!grid)return;
  const q=($('#prodSearch')?.value||'').toLowerCase();
  let list=PRODUCTS.filter(p=>PROD_FILTER==='all'||(PROD_FILTER==='feat'?p.feat:p.status===PROD_FILTER));
  if(q)list=list.filter(p=>(p.name+p.brand+p.cat).toLowerCase().includes(q));
  grid.innerHTML=list.length?list.map(p=>`<div class="pcard">
    <div class="media">${p.img?`<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover">`:ph(p.kind)}<div class="flag">${p.feat?'<span class="badge" style="background:var(--cta);color:#fff"><span class="d" style="background:#fff"></span>Vedette</span>':''}</div></div>
    <div class="pc-body">
      <h4>${p.name}</h4>
      <p class="meta">${p.brand} · ${p.cat}</p>
      <div class="pc-foot">
        <span class="badge ${p.status==='active'?'active':'arch'}"><span class="d"></span>${p.status==='active'?'Actif':'Archivé'}</span>
        <div class="tbl-actions">
          <button title="Voir" data-go="produit-new">${icon('eye')}</button>
          <button title="Modifier" data-go="produit-new">${icon('edit')}</button>
          <button class="del" title="Archiver" data-del="${p.name}">${icon('trash')}</button>
        </div>
      </div>
    </div></div>`).join(''):`<div class="empty" style="grid-column:1/-1">${icon('package')}<p>Aucun produit ne correspond.</p></div>`;
}
function bindCatalogue(){
  $('#prodSeg')?.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b)return;PROD_FILTER=b.dataset.f;$('#prodSeg').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));renderProdGrid();});
  $('#prodSearch')?.addEventListener('input',renderProdGrid);
  $('#prodGrid')?.addEventListener('click',e=>{const d=e.target.closest('[data-del]');if(d){toast('Produit archivé.');}});
  renderProdGrid();
}

/* =========================================================
   PRODUCT FORM
   ========================================================= */
let FEAT_ON=false,STATUS_ACTIVE=true;
function ProductForm(){
  return `<div class="content">
    <div class="page-head">
      <div><div style="font-size:13px;color:var(--muted);margin-bottom:6px"><a data-go="catalogue" style="color:var(--blue)">Catalogue</a> › Nouveau produit</div><h1>Nouveau produit</h1></div>
      <div class="ph-actions"><button class="btn btn-secondary" data-go="catalogue">Annuler</button><button class="btn btn-cta" id="saveProduct">${icon('check')} Enregistrer le produit</button></div>
    </div>
    <div class="form-grid">
      <div>
        <div class="card card-pad fsec" style="margin-bottom:18px">
          <div class="fsec-title">${icon('info')} Informations générales</div>
          <div class="frow">
            <div class="field"><label>Nom du produit <span class="req">*</span></label><input class="input" placeholder="ex. SINOTRUK HOWO 8x4"></div>
            <div class="field"><label>Marque <span class="req">*</span></label><input class="input" placeholder="ex. SINOTRUK"></div>
          </div>
          <div class="frow">
            <div class="field"><label>Modèle <span class="req">*</span></label><input class="input" placeholder="ex. HOWO 380"></div>
            <div class="field"><label>Catégorie <span class="req">*</span></label><select class="input"><option value="">Sélectionner…</option>${CATS.map(c=>`<option>${c}</option>`).join('')}</select></div>
          </div>
          <div class="field"><label>Description</label><textarea class="input" placeholder="Décrivez le produit, ses usages et ses points forts…"></textarea></div>
        </div>

        <div class="card card-pad fsec" style="margin-bottom:18px">
          <div class="fsec-title">${icon('image')} Photos <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--muted)">(max 10) — glisser pour réordonner</span></div>
          <div class="uploader">
            ${[0,1,2].map((i,_,a)=>`<div class="up-thumb">${i===0?`<img src="assets/img/p-howo-clean.png" style="width:100%;height:100%;object-fit:cover">`:i===1?`<img src="assets/img/p-excav2.png" style="width:100%;height:100%;object-fit:cover">`:ph('exc')}<button class="x">${icon('x')}</button>${i===0?'<span class="drag">Principale</span>':''}</div>`).join('')}
            <div class="up-add">${icon('plus')}<span>Ajouter</span></div>
          </div>
        </div>

        <div class="card card-pad fsec">
          <div class="fsec-title">${icon('clipboard')} Caractéristiques techniques</div>
          <div id="specList">
            ${[['Charge utile','25 – 30 Tonnes'],['Moteur','HOWO D12 380CV'],['Configuration','8x4']].map(([k,v])=>`<div class="spec-row"><input class="input" value="${k}" placeholder="Clé"><input class="input" value="${v}" placeholder="Valeur"><button>${icon('trash')}</button></div>`).join('')}
          </div>
          <button class="btn btn-secondary btn-sm" id="addSpec" style="margin-top:6px">${icon('plus')} Ajouter une caractéristique</button>
        </div>
      </div>

      <div style="position:sticky;top:88px;display:flex;flex-direction:column;gap:18px">
        <div class="card card-pad">
          <div class="fsec-title">${icon('settings')} Paramètres</div>
          <div class="field"><label>Statut</label>
            <div class="radio-pill"><label><input type="radio" name="st" checked> Actif</label><label><input type="radio" name="st"> Archivé</label></div>
          </div>
          <div class="switch-row" style="margin-top:6px">
            <div><b>Produit vedette</b><br><span>Afficher sur la page d'accueil</span></div>
            <button class="toggle" id="featToggle"></button>
          </div>
          <div class="switch-row">
            <div><b>Disponibilité</b><br><span>Marquer comme disponible</span></div>
            <button class="toggle on" id="dispToggle"></button>
          </div>
        </div>
        <div class="card card-pad">
          <div class="fsec-title">${icon('eye')} Aperçu</div>
          <div class="pcard" style="box-shadow:none;border-color:var(--line)">
            <div class="media" style="aspect-ratio:4/3">${ph('truck')}</div>
            <div class="pc-body"><h4>Nom du produit</h4><p class="meta">Marque · Catégorie</p></div>
          </div>
          <p style="font-size:12.5px;color:var(--muted);margin:12px 0 0">Voici comment votre produit apparaîtra dans le catalogue public.</p>
        </div>
      </div>
    </div>
  </div>`;
}
function bindProductForm(){
  $('#featToggle')?.addEventListener('click',e=>e.currentTarget.classList.toggle('on'));
  $('#dispToggle')?.addEventListener('click',e=>e.currentTarget.classList.toggle('on'));
  $('#addSpec')?.addEventListener('click',()=>{const d=document.createElement('div');d.className='spec-row';d.innerHTML=`<input class="input" placeholder="Clé"><input class="input" placeholder="Valeur"><button>${icon('trash')}</button>`;$('#specList').appendChild(d);});
  $('#specList')?.addEventListener('click',e=>{const b=e.target.closest('button');if(b)b.closest('.spec-row').remove();});
  $('.uploader')?.addEventListener('click',e=>{if(e.target.closest('.x'))e.target.closest('.up-thumb').remove();});
  $('#saveProduct')?.addEventListener('click',()=>{toast('Produit enregistré et publié !');setTimeout(()=>go('catalogue'),700);});
}

/* =========================================================
   DEVIS LIST
   ========================================================= */
let DEVIS_FILTER='all';
function DevisList(){
  return `<div class="content">
    <div class="page-head"><div><h1>Demandes de devis</h1><p>${DEVIS.length} demandes · ${DEVIS.filter(d=>d.status==='new').length} nouvelles</p></div>
      <div class="ph-actions"><button class="btn btn-secondary" id="exportCsv">${icon('download')} Exporter CSV</button></div></div>
    <div class="toolbar">
      <div class="seg" id="devisSeg">
        <button class="${DEVIS_FILTER==='all'?'on':''}" data-f="all">Toutes</button>
        <button class="${DEVIS_FILTER==='new'?'on':''}" data-f="new">Nouvelles</button>
        <button class="${DEVIS_FILTER==='prog'?'on':''}" data-f="prog">En traitement</button>
        <button class="${DEVIS_FILTER==='done'?'on':''}" data-f="done">Traitées</button>
      </div>
      <div class="grow"></div>
      <div class="input-ic" style="width:260px">${icon('search')}<input class="input" id="devisSearch" placeholder="Rechercher un client…"></div>
    </div>
    <div class="card" style="overflow:hidden">
      <table class="tbl"><thead><tr><th>Date</th><th>Client</th><th>Produit</th><th>Qté</th><th>Pays</th><th>Statut</th><th></th></tr></thead>
      <tbody id="devisBody"></tbody></table>
    </div>
  </div>`;
}
function renderDevisBody(){
  const body=$('#devisBody');if(!body)return;
  const q=($('#devisSearch')?.value||'').toLowerCase();
  let list=DEVIS.filter(d=>DEVIS_FILTER==='all'||d.status===DEVIS_FILTER);
  if(q)list=list.filter(d=>(d.name+d.product+d.country).toLowerCase().includes(q));
  body.innerHTML=list.length?list.map(d=>`<tr style="cursor:pointer" data-devis="${d.name}">
    <td style="color:var(--muted)">${d.date}</td>
    <td><div class="client"><div class="av">${initials(d.name)}</div><div><b>${d.name}</b><span>${d.email}</span></div></div></td>
    <td>${d.product}</td><td>${d.qty}</td><td>${d.country}</td><td>${badgeDevis(d.status)}</td>
    <td><div class="tbl-actions"><button title="Voir le détail">${icon('eye')}</button></div></td></tr>`).join(''):`<tr><td colspan="7"><div class="empty">${icon('clipboard')}<p>Aucune demande.</p></div></td></tr>`;
}
function bindDevis(){
  $('#devisSeg')?.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b)return;DEVIS_FILTER=b.dataset.f;$('#devisSeg').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));renderDevisBody();});
  $('#devisSearch')?.addEventListener('input',renderDevisBody);
  $('#exportCsv')?.addEventListener('click',()=>toast('Export CSV généré (6 lignes).'));
  $('#devisBody')?.addEventListener('click',e=>{const r=e.target.closest('[data-devis]');if(r)openDevisModal(r.dataset.devis);});
  renderDevisBody();
}
function openDevisModal(name){
  const d=DEVIS.find(x=>x.name===name);if(!d)return;
  $('#modalTitle').textContent='Demande de '+d.name;
  $('#modalBody').innerHTML=`
    <div class="detail-row"><div class="k">Statut</div><div class="v">${badgeDevis(d.status)}</div></div>
    <div class="detail-row"><div class="k">Date</div><div class="v">${d.date}</div></div>
    <div class="detail-row"><div class="k">Email</div><div class="v">${d.email}</div></div>
    <div class="detail-row"><div class="k">Téléphone</div><div class="v">${d.phone}</div></div>
    <div class="detail-row"><div class="k">Pays</div><div class="v">${d.country}</div></div>
    <div class="detail-row"><div class="k">Produit</div><div class="v">${d.product} × ${d.qty}</div></div>
    <div class="detail-row" style="flex-direction:column;gap:8px"><div class="k">Message</div><div class="v" style="font-weight:400;color:#445">${d.msg}</div></div>`;
  $('#modalFoot').innerHTML=`<button class="btn btn-secondary" data-modal-close>Fermer</button><button class="btn btn-primary" id="mProg">Marquer en traitement</button><button class="btn btn-cta" id="mDone">${icon('check')} Marquer traité</button>`;
  $('#mProg')?.addEventListener('click',()=>{d.status='prog';closeModal();toast('Demande marquée en traitement.');renderDevisBody?.();});
  $('#mDone')?.addEventListener('click',()=>{d.status='done';closeModal();toast('Demande marquée comme traitée.');renderDevisBody?.();});
  openModal();
}

/* =========================================================
   MESSAGES
   ========================================================= */
function Messages(){
  return `<div class="content">
    <div class="page-head"><div><h1>Messages de contact</h1><p>${MESSAGES.filter(m=>m.unread).length} non lus sur ${MESSAGES.length}</p></div></div>
    <div class="card" style="overflow:hidden">
      ${MESSAGES.map(m=>`<div style="display:flex;gap:16px;padding:18px 22px;border-bottom:1px solid var(--line);align-items:flex-start;${m.unread?'background:rgba(46,156,219,.04)':''}">
        <div class="client"><div class="av">${initials(m.name)}</div></div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:10px"><b style="font-family:var(--ff-head);font-size:14.5px;color:var(--ink)">${m.name}</b>${m.unread?'<span class="badge new"><span class="d"></span>Non lu</span>':''}<span style="margin-left:auto;font-size:12.5px;color:var(--muted)">${m.date}</span></div>
          <div style="font-family:var(--ff-head);font-weight:600;font-size:14px;color:var(--navy);margin:4px 0 4px">${m.subject}</div>
          <p style="font-size:13.5px;color:var(--muted);margin:0">${m.excerpt}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

/* =========================================================
   CATEGORIES
   ========================================================= */
function Categories(){
  return `<div class="content">
    <div class="page-head"><div><h1>Catégories</h1><p>${CATS.length} catégories de produits</p></div>
      <div class="ph-actions"><button class="btn btn-cta" onclick="window.__toast('Nouvelle catégorie créée.')">${icon('plus')} Nouvelle catégorie</button></div></div>
    <div class="grid-3">
      ${CATS.map((c,i)=>`<div class="card card-pad" style="display:flex;align-items:center;gap:14px">
        <div class="ic blue" style="width:46px;height:46px;border-radius:12px;display:grid;place-items:center">${icon(i%2?'excavator':'truck')}</div>
        <div style="flex:1"><b style="font-family:var(--ff-head);font-size:14.5px;color:var(--ink)">${c}</b><br><span style="font-size:12.5px;color:var(--muted)">${PRODUCTS.filter(p=>p.cat===c).length} produit(s)</span></div>
        <div class="tbl-actions"><button>${icon('edit')}</button><button class="del">${icon('trash')}</button></div>
      </div>`).join('')}
    </div>
  </div>`;
}

/* =========================================================
   MEDIAS
   ========================================================= */
function Medias(){
  return `<div class="content">
    <div class="page-head"><div><h1>Bibliothèque de médias</h1><p>24 images · 38 Mo utilisés</p></div>
      <div class="ph-actions"><button class="btn btn-cta">${icon('plus')} Importer des images</button></div></div>
    <div class="grid-4">
      <div class="up-add" style="aspect-ratio:1">${icon('plus')}<span>Importer</span></div>
      ${Array.from({length:11},(_,i)=>`<div class="up-thumb" style="aspect-ratio:1">${ph(i%3===0?'exc':i%3===1?'truck':'pkg')}</div>`).join('')}
    </div>
  </div>`;
}

/* =========================================================
   PAGES & CONTENT
   ========================================================= */
function Pages(){
  const pgs=[['Accueil','Hero, services, produits vedettes'],['À propos','Histoire & présentation de Franklin Kuate'],['Nos services','Détail des 5 domaines d\'activité'],['Contact','Coordonnées & formulaire']];
  return `<div class="content">
    <div class="page-head"><div><h1>Pages & contenus</h1><p>Modifiez les textes du site sans développeur</p></div></div>
    <div class="grid-2">
      ${pgs.map(([t,d])=>`<div class="card card-pad" style="display:flex;align-items:center;gap:16px">
        <div class="ic sky" style="width:48px;height:48px;border-radius:12px;display:grid;place-items:center">${icon('file')}</div>
        <div style="flex:1"><b style="font-family:var(--ff-head);font-size:15px;color:var(--ink)">${t}</b><br><span style="font-size:13px;color:var(--muted)">${d}</span></div>
        <button class="btn btn-secondary btn-sm">${icon('edit')} Éditer</button>
      </div>`).join('')}
    </div>
  </div>`;
}

/* =========================================================
   UTILISATEURS
   ========================================================= */
function Users(){
  return `<div class="content">
    <div class="page-head"><div><h1>Utilisateurs &amp; rôles</h1><p>${USERS.length} comptes · rôles configurables</p></div>
      <div class="ph-actions"><button class="btn btn-secondary">${icon('lock')} Gérer les rôles</button><button class="btn btn-cta" onclick="window.__toast('Invitation envoyée.')">${icon('plus')} Inviter un collaborateur</button></div></div>
    <div class="card" style="overflow:hidden">
      <table class="tbl"><thead><tr><th>Utilisateur</th><th>Rôle</th><th>Statut</th><th></th></tr></thead><tbody>
      ${USERS.map(u=>`<tr>
        <td><div class="client"><div class="av">${u.init}</div><div><b>${u.name}</b><span>${u.email}</span></div></div></td>
        <td><span class="badge ${u.role==='Administrateur'?'prog':u.role==='Comptable'?'done':'arch'}"><span class="d"></span>${u.role}</span></td>
        <td><span class="badge ${u.status==='active'?'active':'arch'}"><span class="d"></span>${u.status==='active'?'Actif':'Inactif'}</span></td>
        <td><div class="tbl-actions"><button>${icon('edit')}</button><button class="del">${icon('trash')}</button></div></td></tr>`).join('')}
      </tbody></table>
    </div>
    <div class="card card-pad" style="margin-top:18px">
      <div class="fsec-title">${icon('lock')} Rôles &amp; permissions</div>
      <div class="grid-3">
        ${[['Administrateur','Accès complet à tous les modules','prog'],['Éditeur','Catalogue, médias et pages','arch'],['Comptable','Module comptabilité uniquement','done']].map(([t,d,c])=>`<div style="border:1px solid var(--line);border-radius:12px;padding:16px"><span class="badge ${c}"><span class="d"></span>${t}</span><p style="font-size:13px;color:var(--muted);margin:10px 0 0">${d}</p></div>`).join('')}
        <div style="border:1.5px dashed var(--line);border-radius:12px;padding:16px;display:flex;align-items:center;justify-content:center;color:var(--blue);font-weight:600;font-family:var(--ff-head);font-size:13.5px;cursor:pointer" onclick="window.__toast('Création de rôle personnalisé.')">${icon('plus','width="16" height="16" style="margin-right:6px"')} Rôle personnalisé</div>
      </div>
    </div>
  </div>`;
}

/* =========================================================
   PARAMETRES
   ========================================================= */
function Settings(){
  return `<div class="content">
    <div class="page-head"><div><h1>Paramètres</h1><p>Coordonnées, slogan et réseaux sociaux du site</p></div>
      <div class="ph-actions"><button class="btn btn-cta" onclick="window.__toast('Paramètres enregistrés.')">${icon('check')} Enregistrer</button></div></div>
    <div class="form-grid">
      <div class="card card-pad fsec">
        <div class="fsec-title">${icon('info')} Coordonnées de contact</div>
        <div class="frow"><div class="field"><label>Téléphone Cameroun</label><input class="input" value="+237 694 945 547"></div><div class="field"><label>Téléphone Chine</label><input class="input" value="+86 18333718710"></div></div>
        <div class="frow"><div class="field"><label>Email</label><input class="input" value="franklin@gmail.com"></div><div class="field"><label>WhatsApp</label><input class="input" value="+237 694 945 547"></div></div>
        <div class="field"><label>Adresse (Chine)</label><textarea class="input">N° 411, Zone A, 4e étage, Ville de vêtements de Wufu, N° 499-523 Avenue Sanyuanli, District de Yuexiu, Guangzhou, Guangdong, Chine</textarea></div>
        <div class="field"><label>Slogan</label><input class="input" value="Crossing borders and creating a new chapter in international trade"></div>
      </div>
      <div class="card card-pad" style="align-self:start">
        <div class="fsec-title">${icon('users')} Réseaux sociaux</div>
        <div class="field"><label>WhatsApp Business</label><input class="input" value="wa.me/237694945547"></div>
        <div class="field"><label>Facebook</label><input class="input" placeholder="facebook.com/…"></div>
        <div class="field"><label>Langue par défaut</label><select class="input"><option>Français</option><option>Anglais</option></select></div>
      </div>
    </div>
  </div>`;
}

/* =========================================================
   COMPTABILITE
   ========================================================= */
function Compta(){
  const months=['Jan','Fév','Mar','Avr','Mai','Juin'];
  const rev=[180,210,165,240,225,251],exp=[120,140,110,150,160,168];
  const mx=Math.max(...rev);
  return `<div class="content">
    <div class="page-head"><div><h1>Comptabilité</h1><p>Pilotage financier · Semestre 1 — 2026 (FCFA)</p></div>
      <div class="ph-actions"><button class="btn btn-secondary">${icon('download')} Rapport PDF</button><button class="btn btn-cta" onclick="window.__toast('Écriture ajoutée.')">${icon('plus')} Nouvelle écriture</button></div></div>
    <div class="grid-4" style="margin-bottom:22px">
      ${statCard({ic:'trendUp',color:'green',v:'1.27 Md',lbl:'Chiffre d\'affaires (S1)',trend:{dir:'up',v:'+18%'}})}
      ${statCard({ic:'wallet',color:'orange',v:'848 M',lbl:'Dépenses (S1)',trend:{dir:'up',v:'+9%'}})}
      ${statCard({ic:'chart',color:'blue',v:'424 M',lbl:'Bénéfice net',trend:{dir:'up',v:'+34%'}})}
      ${statCard({ic:'credit',color:'sky',v:'92 M',lbl:'Crédits en cours',trend:{dir:'down',v:'-12%'}})}
    </div>
    <div class="grid-2" style="grid-template-columns:1.5fr 1fr;align-items:start;margin-bottom:22px">
      <div class="card card-pad">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><h3 style="font-size:16px;color:var(--navy)">Bénéfices / Pertes</h3>
          <div class="legend"><div><span class="sw" style="background:var(--blue)"></span>Revenus</div><div><span class="sw" style="background:#f59e0b"></span>Dépenses</div></div></div>
        <div class="chart">
          ${months.map((m,i)=>`<div class="bar-col"><div class="bars"><div class="bar rev" style="height:${rev[i]/mx*100}%"></div><div class="bar exp" style="height:${exp[i]/mx*100}%"></div></div><span class="lbl">${m}</span></div>`).join('')}
        </div>
      </div>
      <div class="card card-pad">
        <h3 style="font-size:16px;color:var(--navy);margin-bottom:6px">Objectifs &amp; avancement</h3>
        ${[['CA annuel','1.27 Md / 2.4 Md',53,''],['Engins vendus','38 / 60 unités',63,'orange'],['Nouveaux clients','24 / 30',80,'green']].map(([t,v,p,c])=>`<div class="obj"><div class="top"><b>${t}</b><span class="pct">${p}%</span></div><div class="kv" style="margin-bottom:8px"><span style="color:var(--muted);font-size:12.5px">${v}</span></div><div class="prog ${c}"><i style="width:${p}%"></i></div></div>`).join('')}
      </div>
    </div>
    <div class="grid-2" style="grid-template-columns:1.4fr 1fr;align-items:start">
      <div class="card" style="overflow:hidden">
        <div class="card-head"><h3>Dernières opérations</h3><a>Voir tout ›</a></div>
        <table class="tbl"><thead><tr><th>Date</th><th>Libellé</th><th>Type</th><th style="text-align:right">Montant</th></tr></thead><tbody>
        ${[['10/06','Vente — 2× HOWO 8x4','Vente','+97 M','green'],['08/06','Fret maritime Guangzhou→Douala','Dépense','-14 M','red'],['05/06','Vente — SANY SY215C','Vente','+62 M','green'],['03/06','Paiement fournisseur SDLG','Dépense','-41 M','red'],['01/06','Remboursement crédit client','Crédit','+18 M','green']].map(([d,l,t,a,c])=>`<tr><td style="color:var(--muted)">${d}</td><td style="font-weight:500">${l}</td><td><span class="badge ${t==='Vente'?'done':t==='Crédit'?'prog':'arch'}"><span class="d"></span>${t}</span></td><td style="text-align:right;font-family:var(--ff-head);font-weight:700;color:${c==='green'?'var(--green)':'var(--red)'}">${a}</td></tr>`).join('')}
        </tbody></table>
      </div>
      <div class="card card-pad">
        <div class="fsec-title">${icon('credit')} Crédits &amp; remboursements</div>
        ${[['Société BTP Douala','45 M restants',60],['Entreprise Nkomo','28 M restants',25],['GabTravaux','19 M restants',85]].map(([n,v,p])=>`<div class="obj"><div class="top"><b style="font-size:13.5px">${n}</b><span class="pct">${p}%</span></div><div class="kv" style="margin-bottom:8px"><span style="color:var(--muted);font-size:12.5px">${v}</span></div><div class="prog orange"><i style="width:${p}%"></i></div></div>`).join('')}
        <button class="btn btn-secondary btn-sm" style="margin-top:14px;width:100%" onclick="window.__toast('Crédit enregistré.')">${icon('plus')} Enregistrer un crédit</button>
      </div>
    </div>
  </div>`;
}

/* =========================================================
   FACTURATION
   ========================================================= */
function Facturation(){
  return `<div class="content">
    <div class="page-head"><div><h1>Facturation</h1><p>${INVOICES.length} factures · modèle personnalisable</p></div>
      <div class="ph-actions"><button class="btn btn-secondary" onclick="window.__toast('Modèle de facture enregistré.')">${icon('settings')} Modèle</button><button class="btn btn-cta" onclick="window.__toast('Nouvelle facture créée.')">${icon('plus')} Nouvelle facture</button></div></div>
    <div class="grid-2" style="grid-template-columns:1fr 1.3fr;align-items:start">
      <div>
        <div class="card" style="overflow:hidden;margin-bottom:18px">
          <div class="card-head"><h3>Factures émises</h3><button class="btn btn-ghost btn-sm">${icon('filter')} Filtrer</button></div>
          <table class="tbl"><thead><tr><th>N°</th><th>Client</th><th>Montant</th><th>Statut</th></tr></thead><tbody>
          ${INVOICES.map(f=>`<tr style="cursor:pointer"><td><b style="font-family:var(--ff-head);font-size:13px">${f.n}</b><br><span style="font-size:11.5px;color:var(--muted)">${f.date}</span></td><td>${f.client}</td><td style="font-family:var(--ff-head);font-weight:600">${f.amount}</td><td><span class="badge ${f.status}">${f.status==='paid'?'Payée':f.status==='pend'?'En attente':'En retard'}</span></td></tr>`).join('')}
          </tbody></table>
        </div>
        <div class="card card-pad">
          <div class="fsec-title">${icon('settings')} Modèle de facture</div>
          <div class="switch-row"><div><b>Afficher le logo</b><br><span>En-tête de la facture</span></div><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
          <div class="switch-row"><div><b>Conditions de paiement</b><br><span>Pied de page</span></div><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
          <div class="switch-row"><div><b>TVA (19,25%)</b><br><span>Calcul automatique</span></div><button class="toggle" onclick="this.classList.toggle('on')"></button></div>
          <div class="field" style="margin-top:14px"><label>Devise</label><select class="input"><option>FCFA (XAF)</option><option>USD ($)</option><option>EUR (€)</option></select></div>
        </div>
      </div>
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><span style="font-family:var(--ff-head);font-weight:600;font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em">Aperçu</span><button class="btn btn-secondary btn-sm" onclick="window.__toast('Facture exportée en PDF.')">${icon('printer')} Imprimer / PDF</button></div>
        <div class="inv-paper">
          <div class="inv-top">
            <div><div class="lg">${icon('truck')}</div><h2>TOCHE &amp; FILS</h2><div class="small">International Trade Co., LTD<br>Guangzhou, Guangdong, Chine<br>franklin@gmail.com · +237 694 945 547</div></div>
            <div class="rt"><div class="ti">FACTURE</div><div class="small">N° FAC-2026-0042<br>Date : 10/06/2026<br>Échéance : 25/06/2026</div></div>
          </div>
          <div class="inv-meta">
            <div><h5>Facturé à</h5><p><b>Société BTP Douala</b><br>Zone Industrielle Bassa<br>Douala, Cameroun<br>contact@btp-douala.cm</p></div>
            <div style="text-align:right"><h5>Détails</h5><p>Mode : Virement bancaire<br>Réf. devis : DEV-0118<br>Conditions : 50% à la commande</p></div>
          </div>
          <table class="inv-tbl"><thead><tr><th>Désignation</th><th>Qté</th><th>P.U.</th><th>Total</th></tr></thead><tbody>
            <tr><td><b>SINOTRUK HOWO 8x4</b><br><span style="color:var(--muted);font-size:12px">Camion benne 380CV</span></td><td>2</td><td>22 000 000</td><td>44 000 000</td></tr>
            <tr><td>Fret maritime CIF Douala</td><td>1</td><td>4 500 000</td><td>4 500 000</td></tr>
          </tbody></table>
          <div class="inv-tot">
            <div class="kv"><span>Sous-total</span><b>48 500 000</b></div>
            <div class="kv"><span>TVA (0%)</span><b>0</b></div>
            <div class="kv tot"><span>Total (FCFA)</span><span>48 500 000</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* =========================================================
   ROUTER
   ========================================================= */
const PAGES={dashboard:{f:Dashboard},catalogue:{f:Catalogue,after:bindCatalogue},'produit-new':{f:ProductForm,after:bindProductForm},categories:{f:Categories},medias:{f:Medias},devis:{f:DevisList,after:bindDevis},messages:{f:Messages},facturation:{f:Facturation},comptabilite:{f:Compta},pages:{f:Pages},utilisateurs:{f:Users},parametres:{f:Settings}};

function renderSidebar(active){
  return NAV.map(n=>{
    if(n.cat) return `<div class="sb-cat">${n.cat}</div>`;
    const cnt=n.count?n.count():0;
    return `<button class="sb-link ${n.id===active?'on':''}" data-go="${n.id}">${icon(n.ic)}<span>${n.t}</span>${cnt?`<span class="count">${cnt}</span>`:''}</button>`;
  }).join('');
}
function go(id){location.hash='#/'+id;}
window.__go=go;
function render(){
  const id=(location.hash.replace(/^#\//,'')||'dashboard').split('?')[0];
  if(id==='login'){showLogin();return;}
  showApp();
  const route=PAGES[id]||PAGES.dashboard;
  $('#sbNav').innerHTML=renderSidebar(PAGES[id]?id:'dashboard');
  $('#pgTitle').textContent=TITLES[id]||'Tableau de bord';
  $('#adminContent').innerHTML=route.f();
  document.querySelectorAll('.sb-link').forEach(b=>b.addEventListener('click',()=>{go(b.dataset.go);closeSb();}));
  $('#adminContent').querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
  // dashboard devis rows
  $('#adminContent').querySelectorAll('[data-devis]').forEach(r=>r.addEventListener('click',()=>openDevisModal(r.dataset.devis)));
  if(route.after) route.after();
  document.querySelector('.main')?.scrollTo({top:0});
  window.scrollTo(0,0);
}

/* ---------- shell visibility ---------- */
function showLogin(){$('#loginScreen').style.display='grid';$('#appShell').style.display='none';}
function showApp(){$('#loginScreen').style.display='none';$('#appShell').style.display='grid';}

/* ---------- sidebar mobile ---------- */
function openSb(){$('#sidebar').classList.add('open');$('#sbBackdrop').classList.add('open');}
function closeSb(){$('#sidebar')?.classList.remove('open');$('#sbBackdrop')?.classList.remove('open');}

/* ---------- modal ---------- */
function openModal(){$('#modal').classList.add('open');}
function closeModal(){$('#modal').classList.remove('open');}

/* ---------- toast ---------- */
function toast(msg){const t=$('#toast');t.querySelector('span').textContent=msg;t.classList.add('show');clearTimeout(t.__tm);t.__tm=setTimeout(()=>t.classList.remove('show'),3200);}
window.__toast=toast;

/* ---------- boot ---------- */
window.addEventListener('hashchange',render);
document.addEventListener('DOMContentLoaded',()=>{
  // login
  $('#loginForm').addEventListener('submit',e=>{e.preventDefault();go('dashboard');});
  $('#demoLogin')?.addEventListener('click',()=>go('dashboard'));
  // topbar
  $('#menuBtn').addEventListener('click',openSb);
  $('#sbBackdrop').addEventListener('click',closeSb);
  $('#logoutBtn').addEventListener('click',()=>go('login'));
  // modal close
  $('#modal').addEventListener('click',e=>{if(e.target.id==='modal'||e.target.closest('[data-modal-close]')||e.target.closest('.modal-head .x'))closeModal();});
  // start
  if(!location.hash||location.hash==='#/'){location.hash='#/login';}
  render();
});
})();
