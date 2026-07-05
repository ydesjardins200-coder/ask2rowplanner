// store.js — Supabase client, load/save, leadership write-key
function saveLocal(){try{localStorage.setItem('btx_app_v2',JSON.stringify({a:assign,r:roster}));}catch(e){}}
var SB=null,SBKEY='btx';
var LEADKEY=(function(){try{return localStorage.getItem('btx_lead_key')||'';}catch(e){return '';}})();
function setLeadKey(){var v=window.prompt('Leadership WRITE key (leave blank to clear). Only leaders with this key can change the shared plan; without it you still see live updates and can edit your own local copy.',LEADKEY);if(v===null)return;LEADKEY=v;try{localStorage.setItem('btx_lead_key',v);}catch(e){}flash(v?'Write key set':'Write key cleared');}
(function(){try{if(window.SUPA&&window.SUPA.key&&window.SUPA.key.indexOf('PASTE')<0&&window.supabase){SB=window.supabase.createClient(window.SUPA.url,window.SUPA.key);}}catch(e){}})();
function localFallback(){try{var v=localStorage.getItem('btx_app_v2');return v?JSON.parse(v):null;}catch(e){return null;}}
var STORE={save:function(d){var s=JSON.stringify(d);try{localStorage.setItem('btx_app_v2',s);}catch(e){}if(SB){SB.rpc('save_plan',{p_id:SBKEY,p_data:d,p_secret:LEADKEY}).then(function(res){if(res&&res.error){flash('Sync failed (local saved)');}else if(res&&res.data===true){flash('Synced \u2713');}else{flash('Read-only \u2014 need write key');}},function(){flash('Sync failed (local saved)');});}else{flash('Saved (local)');}},
saveRoster:function(full,ros){try{localStorage.setItem('btx_app_v2',JSON.stringify(full));}catch(e){}if(SB){SB.rpc('save_roster',{p_roster:ros}).then(function(res){if(res&&res.error){flash('Sync failed (local saved)');}else{flash('Saved \u2713');}},function(){flash('Sync failed (local saved)');});}else{flash('Saved (local)');}},
load:function(cb){if(SB){SB.from('plan').select('data').eq('id',SBKEY).single().then(function(r){var d=(r&&r.data&&r.data.data)?r.data.data:localFallback();cb(d);try{SB.channel('plan-'+SBKEY).on('postgres_changes',{event:'*',schema:'public',table:'plan',filter:'id=eq.'+SBKEY},function(p){if(p&&p.new&&p.new.data){cb(p.new.data);flash('Updated (team)');}}).subscribe();}catch(e){}},function(){cb(localFallback());});}else{cb(localFallback());}}};
function save(){STORE.save({a:assign,r:roster,g:groups});}
function saveRoster(){STORE.saveRoster({a:assign,r:roster},roster);}
