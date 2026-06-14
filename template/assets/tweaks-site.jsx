/* TOCHE & FILS — Tweaks for the site vitrine (3 variations + accents) */
const TF_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "variant": "classique",
  "cta": "#E05A00",
  "primary": "#0A5FA8"
}/*EDITMODE-END*/;

function TFTweaks(){
  const [t,setTweak]=useTweaks(TF_TWEAK_DEFAULTS);
  React.useEffect(()=>{
    const v = t.variant==='classique' ? '' : t.variant;
    document.documentElement.dataset.variant = v;
    if(v) localStorage.setItem('tf_variant', v); else localStorage.removeItem('tf_variant');
    document.documentElement.style.setProperty('--cta', t.cta);
    document.documentElement.style.setProperty('--blue', t.primary);
  },[t.variant,t.cta,t.primary]);
  return (
    <TweaksPanel title="Variations">
      <TweakSection label="Direction visuelle" />
      <TweakRadio label="Style" value={t.variant}
        options={[{value:'classique',label:'Classique'},{value:'industriel',label:'Industriel'},{value:'premium',label:'Premium'}]}
        onChange={v=>setTweak('variant',v)} />
      <TweakSection label="Couleurs" />
      <TweakColor label="Couleur CTA" value={t.cta}
        options={['#E05A00','#0A5FA8','#D97706','#16A34A']}
        onChange={v=>setTweak('cta',v)} />
      <TweakColor label="Couleur primaire" value={t.primary}
        options={['#0A5FA8','#063D6E','#1E40AF','#0E7490']}
        onChange={v=>setTweak('primary',v)} />
    </TweaksPanel>
  );
}

(function mount(){
  const el=document.createElement('div');
  el.id='tf-tweaks-root';
  document.body.appendChild(el);
  ReactDOM.createRoot(el).render(<TFTweaks/>);
})();
