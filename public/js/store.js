// store.js — Supabase client, load/save, leadership write-key
function saveLocal(){try{localStorage.setItem('btx_app_v2',JSON.stringify({a:assign,r:roster}));}catch(e){}}
var SB=null,SBKEY='btx';
var LEADKEY=(function(){try{return localStorage.getItem('btx_lead_key')||'';}catch(e){return '';}})();
function setLeadKey(){var v=window.prompt(t('lk_prompt'),LEADKEY);if(v===null)return;LEADKEY=v;try{localStorage.setItem('btx_lead_key',v);}catch(e){}flash(v?t('lk_set'):t('lk_cleared'));}
(function(){try{if(window.SUPA&&window.SUPA.key&&window.SUPA.key.indexOf('PASTE')<0&&window.supabase){SB=window.supabase.createClient(window.SUPA.url,window.SUPA.key);}}catch(e){}})();
function localFallback(){try{var v=localStorage.getItem('btx_app_v2');return v?JSON.parse(v):null;}catch(e){return null;}}
var STORE={save:function(d){var s=JSON.stringify(d);try{localStorage.setItem('btx_app_v2',s);}catch(e){}if(SB){SB.rpc('save_plan',{p_id:SBKEY,p_data:d,p_secret:LEADKEY}).then(function(res){if(res&&res.error){flash(t('fl_syncfail'));}else if(res&&res.data===true){flash(t('fl_synced'));}else{flash(t('fl_readonly'));}},function(){flash(t('fl_syncfail'));});}else{flash(t('fl_savedlocal'));}},
saveRoster:function(full,ros){try{localStorage.setItem('btx_app_v2',JSON.stringify(full));}catch(e){}if(SB){SB.rpc('save_roster',{p_roster:ros}).then(function(res){if(res&&res.error){flash(t('fl_syncfail'));}else{flash(t('fl_saved'));}},function(){flash(t('fl_syncfail'));});}else{flash(t('fl_savedlocal'));}},
load:function(cb){
  if(!SB){cb(localFallback());return;}
  var last='';
  function apply(d){var s=JSON.stringify(d||null);if(s===last)return;var first=(last==='');last=s;cb(d);if(!first)flash(t('fl_updated'));}
  function fetchPlan(initial){SB.from('plan').select('data').eq('id',SBKEY).single().then(function(r){apply((r&&r.data&&r.data.data)?r.data.data:localFallback());},function(){if(initial)apply(localFallback());});}
  fetchPlan(true);
  try{SB.channel('plan-'+SBKEY).on('postgres_changes',{event:'*',schema:'public',table:'plan',filter:'id=eq.'+SBKEY},function(p){if(p&&p.new&&p.new.data)apply(p.new.data);}).subscribe();}catch(e){}
  try{setInterval(function(){fetchPlan(false);},15000);}catch(e){}
  try{if(typeof document!=='undefined'&&document.addEventListener)document.addEventListener('visibilitychange',function(){if(!document.hidden)fetchPlan(false);});}catch(e){}
}};
function save(){STORE.save({a:assign,r:roster,g:groups,h:garr});}
function saveRoster(){STORE.saveRoster({a:assign,r:roster},roster);}
