// players.js — registered roster HUB (main/subs + buffs) + Rallies grouping.
function seedLegions(n){var legs=[];GROUPS.forEach(function(g){if(g.members.indexOf(n)>=0&&legs.length<5)legs.push(g.code);});while(legs.length<5)legs.push('');return legs;}
function initRoster(){
  roster=[];
  REG_STRONG.forEach(function(n){roster.push({name:n,side:'strong',sub:false,func:'',legions:seedLegions(n),buffs:{}});});
  REG_OFF.forEach(function(n){roster.push({name:n,side:'off',sub:false,func:'',legions:seedLegions(n),buffs:{}});});
  REG_SUB.forEach(function(n){roster.push({name:n,side:'',sub:true,func:'',legions:['','','','',''],buffs:{}});});
}
function initGroups(){groups=GROUPS.map(function(g){return {code:g.code,leader:g.leader,side:g.side,troop:g.troop};});}
function legionOpts(sel){var o='<option value="">\u2014</option>';RALLY_ORDER.forEach(function(r){o+='<option'+(sel===r?' selected':'')+'>'+esc(r)+'</option>';});return o;}
function funcOpts(sel){var o='<option value="">'+esc(t('pick'))+'</option>';FUNCTIONS.forEach(function(r){o+='<option'+(sel===r?' selected':'')+'>'+esc(r)+'</option>';});return o;}
function membersOf(code){var out=[],seen={};roster.forEach(function(p){if(p.legions&&p.legions.indexOf(code)>=0&&!seen[p.name]){seen[p.name]=1;out.push(p.name);}});return out;}
function legionCount(code){var n=0;roster.forEach(function(p){if(p.legions)p.legions.forEach(function(c){if(c===code)n++;});});return n;}
// How many of THIS player's legion slots point at a group (duplicates allowed).
function countSlots(p,code){var n=0;if(p&&p.legions)for(var i=0;i<p.legions.length;i++)if(p.legions[i]===code)n++;return n;}
// Same, resolved by name (case/space tolerant), summed across any matching entries.
function legsOfName(name,code){var me=(''+(name||'')).trim().toLowerCase(),n=0;roster.forEach(function(p){if((''+p.name).trim().toLowerCase()===me)n+=countSlots(p,code);});return n;}
function pbuffs(p){if(!p.buffs)p.buffs={};return p.buffs;}
function fEntry(p,k){var b=pbuffs(p);if(!b[k])b[k]={};return b[k];}
function isFilled(f,v){
  if(f.type==='check')return v===true;
  if(f.type==='text')return v!==undefined&&v!==null&&(''+v).trim()!=='';
  if(f.type==='multicheck'){if(!v||typeof v!=='object')return false;for(var k in v){if(v[k])return true;}return false;}
  return v!==undefined&&v!==null&&v!=='';
}
function fieldsFor(p){return FIELDS.filter(function(f){return !f.func||f.func===p.func;});}
function fFilled(p,f){var e=pbuffs(p)[f.key]||{};if(f.type==='proof')return !!e.img;return isFilled(f,e.v);}
function buffCount(p){var n=0;fieldsFor(p).forEach(function(f){if(fFilled(p,f))n++;});return n;}
function nameOptions(sel){
  var seen={},names=[];
  roster.forEach(function(p){if(p.name&&!seen[p.name]){seen[p.name]=1;names.push(p.name);}});
  EXTRA_LEADERS.forEach(function(x){if(!seen[x]){seen[x]=1;names.push(x);}});
  if(sel&&!seen[sel])names.push(sel);
  names.sort(function(a,b){return a.toLowerCase()<b.toLowerCase()?-1:1;});
  var o='<option value="">\u2014 none \u2014</option>';
  names.forEach(function(n){o+='<option'+(((sel||'')===n)?' selected':'')+'>'+esc(n)+'</option>';});
  return o;
}
function sideLbl(s){return s==='strong'?'Strong':s==='off'?'Off':s==='lifestone'?'Lifestone':s==='support'?'Support':'\u2014';}
// ---- readiness + buffs ----
var rosterDirty=false;
var openCards={};
function rdirtyNote(){var n=el('rdirty');if(n)n.textContent=rosterDirty?'Unsaved changes \u2014 tap Save to share with the team.':'';}
function markDirty(){rosterDirty=true;var b=document.querySelectorAll('#playerlist .save');for(var i=0;i<b.length;i++){b[i].className='save dirty';b[i].textContent='Save*';}rdirtyNote();}
function clearDirty(){rosterDirty=false;var b=document.querySelectorAll('#playerlist .save');for(var i=0;i<b.length;i++){b[i].className='save';b[i].textContent=t('save');}rdirtyNote();}
function commitRoster(){saveRoster();clearDirty();renderMap('blue');renderMap('yellow');renderRallies();renderStaff();renderSides();renderMapInfo();renderLife();renderReady();}
function readyBadge(p){var n=buffCount(p),t=fieldsFor(p).length;var cls=n>=t?'rdy full':(n>0?'rdy part':'rdy none');return '<span class="'+cls+'">'+n+'/'+t+'</span>';}
function buffList(i,p){
  var h='';
  fieldsFor(p).forEach(function(f){
    var e=pbuffs(p)[f.key]||{},v=e.v;
    h+='<div class="buf"><span class="blbl">'+esc(t('f_'+f.key,f.label))+'</span><span class="bctl">';
    if(f.type==='check'){
      h+='<label class="bchkw"><input type="checkbox" class="bchk" data-i="'+i+'" data-k="'+f.key+'"'+(v===true?' checked':'')+'> '+esc(t('yes'))+'</label>';
    }else if(f.type==='text'){
      h+='<input type="text" class="btxt" data-i="'+i+'" data-k="'+f.key+'" value="'+esc(v||'')+'" placeholder="'+esc(t('value_ph'))+'">';
    }else if(f.type==='multicheck'){
      f.opts.forEach(function(o){var on=v&&typeof v==='object'&&v[o];h+='<label class="bmcw"><input type="checkbox" class="bmck" data-i="'+i+'" data-k="'+f.key+'" data-o="'+esc(o)+'"'+(on?' checked':'')+'> '+esc(t('u_'+o,o))+'</label>';});
    }else if(f.type!=='proof'){
      h+='<select class="bsel" data-i="'+i+'" data-k="'+f.key+'"><option value="">\u2014</option>';
      f.opts.forEach(function(o){h+='<option'+(v===o?' selected':'')+'>'+esc(o)+'</option>';});
      h+='</select>';
    }
    h+='</span><span class="bproof">';
    if(e.img) h+='<a class="viewshot" href="#" data-full="'+esc(e.img)+'">'+esc(t('view_shot'))+'</a>';
    h+='<label class="shotbtn">'+(e.img?esc(t('replace')):'\uD83D\uDCF7')+'<input type="file" accept="image/*" class="bfile" data-i="'+i+'" data-k="'+f.key+'"></label></span></div>';
  });
  return h;
}
// ---- derived: which groups a player leads / is in ----
function playerGroups(name){var leads=[],inn=[];groups.forEach(function(g){if(g.leader===name)leads.push(g.code);if(g.members.indexOf(name)>=0)inn.push(g.code);});return {leads:leads,inn:inn};}
function playerCard(i){
  var p=roster[i];
  var d=rosterDirty?' dirty':'',tt=rosterDirty?(t('save')+'*'):t('save');
  var legs=p.legions||['','','','',''];
  var assignH='';for(var li=0;li<5;li++){assignH+='<div class="lrow"><span class="llbl">'+esc(t('legion'))+' '+(li+1)+'</span><select class="pleg" data-i="'+i+'" data-l="'+li+'">'+legionOpts(legs[li]||'')+'</select></div>';}
  return '<div class="pcard'+(openCards[i]?' open':'')+'" data-i="'+i+'"><div class="phead">'
   +'<button class="exp" data-i="'+i+'">'+(openCards[i]?'\u25BE':'\u25B8')+'</button>'
   +'<input class="pn" data-i="'+i+'" value="'+esc(p.name)+'">'
   +'<select class="pside" data-i="'+i+'"><option value="strong"'+(p.side==='strong'?' selected':'')+''+esc(t('s_strong'))+'</option><option value="off"'+(p.side==='off'?' selected':'')+''+esc(t('s_off'))+'</option><option value=""'+(!p.side?' selected':'')+'>\u2014</option></select>'
   +'<select class="psub" data-i="'+i+'"><option value="main"'+(!p.sub?' selected':'')+'>'+esc(t('m_main'))+'</option><option value="sub"'+(p.sub?' selected':'')+'>'+esc(t('m_sub'))+'</option></select>'
   +readyBadge(p)
   +'<button class="save'+d+'" data-i="'+i+'">'+tt+'</button>'
   +'<button class="rm" data-i="'+i+'">\u00d7</button>'
   +'</div><div class="pbody">'
   +'<div class="fbox"><div class="fbox-h">'+esc(t('main_function'))+'</div><select class="pfunc" data-i="'+i+'">'+funcOpts(p.func||'')+'</select></div>'
   +'<div class="fbox"><div class="fbox-h">'+esc(t('assignment'))+'</div>'+assignH+'</div>'
   +'<div class="fbox"><div class="fbox-h">'+esc(t('general_info'))+'</div><div class="bufs">'+buffList(i,p)+'</div></div>'
   +'</div></div>';
}
function renderPlayers(){
  var c=el('playerlist');if(!c)return;
  var secs=[[t('sec_strong'),function(p){return !p.sub&&p.side==='strong';}],
            [t('sec_off'),function(p){return !p.sub&&p.side==='off';}],
            [t('sec_unassigned'),function(p){return !p.sub&&p.side!=='strong'&&p.side!=='off';}],
            [t('sec_subs'),function(p){return p.sub;}]];
  var nMain=0,nSub=0;roster.forEach(function(p){if(p.sub)nSub++;else nMain++;});
  var h='<div class="bar"><span class="sub">'+esc(t('players_intro'))+' <b>'+nMain+' + '+nSub+'</b></span></div><div class="sub" id="rdirty" style="color:#e0a52a"></div><div class="bar"><button class="adminonly" onclick="addPlayer()">'+esc(t('add_player'))+'</button></div>'+((!IS_ADMIN&&!MYNAME)?'<div class="linkme"><b>'+esc(t('which_player'))+'</b> '+esc(t('pick_name'))+': <select id="linkmesel"><option value="">\u2014 select \u2014</option>'+roster.map(function(pp){return '<option>'+esc(pp.name)+'</option>';}).join('')+'</select></div>':'');
  secs.forEach(function(s){
    var idxs=[];roster.forEach(function(p,i){if(s[1](p))idxs.push(i);});
    if(idxs.length===0)return;
    h+='<div class="rolehdr"><span>'+s[0]+'<span class="cnt">'+idxs.length+'</span></span></div>';
    idxs.forEach(function(i){h+=playerCard(i);});
  });
  c.innerHTML=h;rdirtyNote();
  function each(sel,fn){var n=c.querySelectorAll(sel);for(var i=0;i<n.length;i++)fn(n[i]);}
  each('.exp',function(x){x.onclick=function(e){var i=+e.target.getAttribute('data-i');openCards[i]=!openCards[i];var card=e.target.parentNode.parentNode;card.className=openCards[i]?'pcard open':'pcard';e.target.textContent=openCards[i]?'\u25BE':'\u25B8';};});
  each('.pn',function(x){x.onchange=function(e){roster[+e.target.getAttribute('data-i')].name=e.target.value;saveLocal();markDirty();};});
  each('.pside',function(x){x.onchange=function(e){roster[+e.target.getAttribute('data-i')].side=e.target.value;saveLocal();markDirty();renderPlayers();renderSides();renderMapInfo();};});
  each('.psub',function(x){x.onchange=function(e){roster[+e.target.getAttribute('data-i')].sub=(e.target.value==='sub');saveLocal();markDirty();renderPlayers();renderSides();renderMapInfo();};});
  each('.pfunc',function(x){x.onchange=function(e){roster[+e.target.getAttribute('data-i')].func=e.target.value;saveLocal();markDirty();renderMapInfo();renderPlayers();};});
  each('.viewshot',function(x){x.onclick=function(e){e.preventDefault();openImg(e.target.getAttribute('data-full'));};});
  each('.pleg',function(x){x.onchange=function(e){var i=+e.target.getAttribute('data-i'),l=+e.target.getAttribute('data-l');if(!roster[i].legions)roster[i].legions=['','','','',''];roster[i].legions[l]=e.target.value;saveLocal();markDirty();renderRallies();renderStaff();renderLife();renderMapInfo();};});
  each('.save',function(x){x.onclick=function(){commitRoster();renderPlayers();};});
  each('.rm',function(x){x.onclick=function(e){roster.splice(+e.target.getAttribute('data-i'),1);saveRoster();renderPlayers();renderSides();renderMapInfo();renderRallies();};});
  each('.bchk',function(x){x.onchange=function(e){var i=+e.target.getAttribute('data-i');fEntry(roster[i],e.target.getAttribute('data-k')).v=e.target.checked;saveLocal();markDirty();updateBadge(i);renderReady();};});
  each('.bsel',function(x){x.onchange=function(e){var i=+e.target.getAttribute('data-i');fEntry(roster[i],e.target.getAttribute('data-k')).v=e.target.value;saveLocal();markDirty();updateBadge(i);renderReady();};});
  each('.btxt',function(x){x.onchange=function(e){var i=+e.target.getAttribute('data-i');fEntry(roster[i],e.target.getAttribute('data-k')).v=e.target.value;saveLocal();markDirty();updateBadge(i);renderReady();};});
  each('.bmck',function(x){x.onchange=function(e){var i=+e.target.getAttribute('data-i'),ent=fEntry(roster[i],e.target.getAttribute('data-k'));if(!ent.v||typeof ent.v!=='object')ent.v={};ent.v[e.target.getAttribute('data-o')]=e.target.checked;saveLocal();markDirty();updateBadge(i);renderReady();};});
  each('.bfile',function(x){x.onchange=function(e){uploadBuff(+e.target.getAttribute('data-i'),e.target.getAttribute('data-k'),e.target.files[0]);};});
  var lm=el('linkmesel');if(lm)lm.onchange=function(e){if(window.linkMe)window.linkMe(e.target.value);};
  if(typeof enforceRole==='function')enforceRole();
}
function updateBadge(i){var card=document.querySelector('.pcard[data-i="'+i+'"]');if(!card)return;var old=card.querySelector('.rdy');if(!old)return;var t=document.createElement('div');t.innerHTML=readyBadge(roster[i]);old.parentNode.replaceChild(t.firstChild,old);}
function uploadBuff(i,k,file){
  if(!file)return;var p=roster[i];
  if(!SB){alert('Screenshot proof needs the site connected to Supabase with a "buffs" storage bucket. Checkmarks work without it.');return;}
  flash(t('fl_uploading'));
  var safe=(p.name||'p').replace(/[^a-zA-Z0-9]/g,'_').slice(0,24);
  var path=safe+'/'+k.replace(/[^a-zA-Z0-9]/g,'_')+'_'+Date.now()+'.jpg';
  try{
    SB.storage.from('buffs').upload(path,file,{upsert:true,contentType:(file.type||'image/jpeg')}).then(function(res){
      if(res&&res.error){flash(t('fl_uploadfail'));alert('Upload failed \u2014 make sure the "buffs" storage bucket exists (see setup).');return;}
      var pub=SB.storage.from('buffs').getPublicUrl(path);
      var url=(pub&&pub.data&&pub.data.publicUrl)?pub.data.publicUrl:'';
      var b=pbuffs(roster[i]);b[k]=b[k]||{};b[k].img=url;saveRoster();renderPlayers();
    },function(){flash(t('fl_uploadfail'));});
  }catch(e){flash(t('fl_uploadfail'));}
}
function addPlayer(){roster.push({name:t('new_player'),side:'',sub:false,func:'',legions:['','','','',''],buffs:{}});saveLocal();markDirty();renderPlayers();}
function resetPlayers(){initRoster();saveRoster();renderPlayers();renderSides();renderMapInfo();renderRallies();}
// ---- Rallies tab: the grouping (editable; member dropdowns from registered list) ----
function roleColor(role){if(role==='FILL')return '#f4c430';if(role==='Phase 1 - FIRST TAKE')return '#5fa8ff';if(role==='CAVS')return '#ff6b6b';if(role==='Lifestone carrier')return '#2fb3a4';if(role==='Lifestone support')return '#7fe3d6';if(role==='Beastmaster')return '#8bb84a';if(role==='Backup garrison'||role==='Main garrison')return '#5fd08a';return '#9fb3c6';}
function leadLabel(code){if(code==='Ghost Cavalry')return 'Ghost cavalry leader (SUN)';if(code==='Lifestone')return 'Lifestone leader';return t('lead_main');}
function leadCardColor(code){if(code==='Ghost Cavalry')return '#ff6b6b';if(code==='Lifestone')return '#2fb3a4';return '#5fd08a';}
function rallyRows(g){
  var lead=(g.code in assign)?assign[g.code]:g.leader;
  var roles=g.roles||{},rows=[],meLead=(''+(lead||'')).trim().toLowerCase();
  var cavsOnly=(g.code==='Ghost Cavalry'||g.code==='Fraedrake');
  // Leader marches first — at least one (the rally) even without an explicit slot.
  if(lead){var ls=legsOfName(lead,g.code);if(ls<1)ls=1;for(var i=0;i<ls;i++)rows.push({name:lead,role:cavsOnly?'CAVS':'Main garrison',lead:true,first:i===0});}
  // Everyone else: one row per legion slot, roster order.
  roster.forEach(function(p){
    var key=(''+p.name).trim().toLowerCase();if(key===meLead)return;
    var c=countSlots(p,g.code);
    for(var k=0;k<c;k++)rows.push({name:p.name,role:cavsOnly?'CAVS':(roles[p.name]||''),lead:false,first:k===0});
  });
  return rows;
}
// Total marches committed to a group = one row per legion (incl. the leader's rally).
function rallyLegions(g){return rallyRows(g).length;}
function roleOptions(sel,code){var R=(code==='Ghost Cavalry'||code==='Fraedrake')?["CAVS"]:(code==='Lifestone')?["","Lifestone carrier","Lifestone support","Beastmaster"]:["","Backup garrison","FILL","Phase 1 - FIRST TAKE"];return R.map(function(r){return '<option value="'+esc(r)+'"'+((sel||'')===r?' selected':'')+'>'+esc(roleLabel(r))+'</option>';}).join('');}
function rallyPersist(){saveLocal();if(typeof saveRoster==='function')saveRoster();renderRallies();renderPlayers();renderMapInfo();renderStaff();renderLife();renderSides();}
function addToRally(code,name){
  if(!name)return;var p=null;roster.forEach(function(x){if(x.name===name)p=x;});if(!p)return;
  if(!p.legions)p.legions=['','','','',''];
  // Duplicates allowed: a player can commit more than one of their 5 legions to
  // the same group. Only the 5-slot ceiling stops them.
  var idx=p.legions.indexOf('');
  if(idx<0){alert(name+' already has all 5 legions assigned. Free one on their player card first.');renderRallies();return;}
  p.legions[idx]=code;rallyPersist();
}
function removeFromRally(code,name){
  var p=null;roster.forEach(function(x){if(x.name===name)p=x;});if(!p||!p.legions)return;
  var idx=p.legions.indexOf(code);if(idx>=0)p.legions[idx]='';rallyPersist();
}
function renderRallies(){
  var c=el('rallytbl');if(!c)return;
  var h='<div class="sub">'+esc(t('rallies_intro'))+'</div>';
  h+='<div class="rgrid">';
  groups.forEach(function(g,gi){
    var rows=rallyRows(g),lc=rows.length;
    var curLead=(g.code in assign)?assign[g.code]:g.leader;
    if(!g.roles)g.roles={};
    h+='<div class="grp gs-'+g.side+'"><div class="grphd"><b>'+esc(g.code)+'</b> <span class="gtag">'+sideLbl(g.side)+' \u00b7 '+esc(g.troop)+' \u00b7 '+lc+' '+esc(t('legions'))+'</span></div>';
    h+='<div class="grow"><span class="glbl">'+esc(leadLabel(g.code))+'</span><select class="glead" data-g="'+gi+'">'+nameOptions(curLead)+'</select></div>';
    var shown=0;
    rows.forEach(function(r){
      if(r.lead&&r.first)return; // leader's first march is the dropdown above
      shown++;
      if(r.lead){ // extra leader march: name + remove only (role fixed)
        h+='<div class="grow"><span class="glbl mname">'+esc(r.name)+'</span><span class="grole" style="color:'+roleColor(r.role)+';flex:1">'+esc(roleLabel(r.role))+'</span><button class="mdel" data-c="'+esc(g.code)+'" data-n="'+esc(r.name)+'" title="'+esc(t('remove_rally'))+'">\u00d7</button></div>';
        return;
      }
      if(r.first){ // member's first legion carries the editable role
        h+='<div class="grow"><span class="glbl mname">'+esc(r.name)+'</span><select class="mrole" data-g="'+gi+'" data-n="'+esc(r.name)+'">'+roleOptions(g.roles[r.name],g.code)+'</select><button class="mdel" data-c="'+esc(g.code)+'" data-n="'+esc(r.name)+'" title="'+esc(t('remove_rally'))+'">\u00d7</button></div>';
      }else{ // extra member legion: echoes the role read-only
        h+='<div class="grow"><span class="glbl mname" style="opacity:.75">'+esc(r.name)+'</span><span class="grole" style="color:'+roleColor(r.role)+';flex:1">'+esc(r.role?roleLabel(r.role):'\u2014')+'</span><button class="mdel" data-c="'+esc(g.code)+'" data-n="'+esc(r.name)+'" title="'+esc(t('remove_rally'))+'">\u00d7</button></div>';
      }
    });
    if(!shown)h+='<div class="asg"><span style="color:#7a8a99">'+esc(t('no_legions'))+'</span></div>';
    // Duplicates allowed, so every named player stays selectable (add again = +1 legion).
    var avail=roster.filter(function(p){return p.name;});
    h+='<div class="grow"><span class="glbl">'+esc(t('add_player'))+'</span><select class="gadd" data-c="'+esc(g.code)+'"><option value="">'+esc(t('pick'))+'</option>'+avail.map(function(p){return '<option>'+esc(p.name)+'</option>';}).join('')+'</select></div>';
    h+='</div>';
  });
  h+='</div>';
  c.innerHTML=h;
  var gl=c.querySelectorAll('.glead');for(var i=0;i<gl.length;i++){gl[i].onchange=function(e){var gi=+e.target.getAttribute('data-g');assign[groups[gi].code]=e.target.value;groups[gi].leader=e.target.value;save();renderRallies();renderLife();renderMapInfo();renderMap('blue');renderMap('yellow');};}
  var mr=c.querySelectorAll('.mrole');for(var k=0;k<mr.length;k++){mr[k].onchange=function(e){var gi=+e.target.getAttribute('data-g'),nm=e.target.getAttribute('data-n');if(!groups[gi].roles)groups[gi].roles={};groups[gi].roles[nm]=e.target.value;save();};}
  var ga=c.querySelectorAll('.gadd');for(var a=0;a<ga.length;a++){ga[a].onchange=function(e){addToRally(e.target.getAttribute('data-c'),e.target.value);};}
  var md=c.querySelectorAll('.mdel');for(var d=0;d<md.length;d++){md[d].onclick=function(e){removeFromRally(e.target.getAttribute('data-c'),e.target.getAttribute('data-n'));};}
  if(typeof enforceRole==='function')enforceRole();
}
// ---- Sides tab: registered Strong/Off, derived from roster ----
function renderSides(){
  var c=el('sidestbl');if(!c)return;
  var st=[],of=[];roster.forEach(function(p){if(p.sub)return;if(p.side==='strong')st.push(p.name);else if(p.side==='off')of.push(p.name);});
  var n=Math.max(st.length,of.length),h='<table class="t"><tr><th>#</th><th style="color:#e06fb5">'+esc(t('s_strong'))+' ('+st.length+')</th><th>#</th><th style="color:#5b9bd5">'+esc(t('s_off'))+' ('+of.length+')</th></tr>';
  for(var i=0;i<n;i++){h+='<tr><td>'+(st[i]?(i+1):'')+'</td><td>'+(st[i]?esc(st[i]):'')+'</td><td>'+(of[i]?(i+1):'')+'</td><td>'+(of[i]?esc(of[i]):'')+'</td></tr>';}
  c.innerHTML=h+'</table>';
}
// ---- Lifestone tab: derived from the Lifestone / Support / Beastmaster groups ----
function renderLife(){
  var c=el('lifetbl');if(!c)return;
  var order=['Lifestone','Lifestone Support','Beastmaster'],h='';
  order.forEach(function(code){
    var g=null;groups.forEach(function(x){if(x.code===code)g=x;});if(!g)return;
    var mem=membersOf(g.code);
    h+='<div class="grp gs-'+g.side+'"><div class="grphd"><b>'+esc(g.code)+'</b>'+(g.leader?' <span class="gtag">'+esc(t('lead_short'))+': '+esc(g.leader)+'</span>':'')+'</div><div class="asg">'+(mem.length?esc(mem.join(', ')):'\u2014')+'</div></div>';
  });
  c.innerHTML=h;
}
// ---- Buff readiness overview (leadership: who's not ready) ----
function renderReady(){
  var c=el('readytbl');if(!c)return;
  var rows=roster.map(function(p){return {p:p,n:buffCount(p)};});
  rows.sort(function(a,b){return a.n-b.n||(a.p.name.toLowerCase()<b.p.name.toLowerCase()?-1:1);});
  var full=0;roster.forEach(function(p){if(buffCount(p)>=FIELDS.length)full++;});
  var h='<div class="sub"><b>'+full+'/'+roster.length+'</b> '+esc(t('ready_note'))+'.</div><table class="t stat"><tr><th>'+esc(t('col_player_short'))+'</th><th>'+esc(t('col_side'))+'</th><th>'+esc(t('col_fields'))+'</th><th>'+esc(t('col_missing'))+'</th></tr>';
  rows.forEach(function(r){
    var p=r.p,miss=[];FIELDS.forEach(function(f){var e=pbuffs(p)[f.key];if(!(e&&isFilled(f,e.v)))miss.push(f.label);});
    var cls=r.n>=FIELDS.length?'ok':(r.n>0?'over':'bad');
    h+='<tr><td>'+esc(p.name)+(p.sub?' <span style="color:#8aa0b6">(sub)</span>':'')+'</td><td>'+sideLbl(p.side)+'</td><td class="'+cls+'">'+r.n+'/'+FIELDS.length+'</td><td style="font-size:10px;color:#d3a9b8">'+(miss.length?esc(miss.join(', ')):'\u2014')+'</td></tr>';
  });
  c.innerHTML=h+'</table>';
}
// Teleport order: garrison first (nearest their objective), strong next,
// off side last so they never take the first spots. Ties keep list order.
function funcRank(p){
  if(p.func==='GARRISON LEAD')return 0;
  if(p.func==='GARRISON FILL')return 1;
  if(p.side==='strong')return 2;
  if(p.side==='off')return 4;
  return 3;
}
function teleportOrder(){
  var mains=[];roster.forEach(function(p,i){if(!p.sub)mains.push({p:p,i:i});});
  mains.sort(function(a,b){var d=funcRank(a.p)-funcRank(b.p);return d!==0?d:a.i-b.i;});
  return mains.map(function(x){return x.p;});
}
// ---- Below-map command panel: teleport order + live grouping ----
// Player's headline role for the teleport list: their explicit function if set,
// otherwise their lane side. Kept short so it fits the narrow column.
function mainRoleLbl(p){
  if(p.func)return p.func;
  if(p.side==='strong')return t('s_strong');
  if(p.side==='off')return t('s_off');
  return '\u2014';
}
// A player's total legion commitment for the teleport badge: every filled slot
// counts (two legions in the same group count as two), plus any group they lead
// where they hold no slot (leading = a march you must send).
function legAssignedCount(p){
  var n=0,me=(''+(p.name||'')).trim().toLowerCase(),slotCodes={};
  if(p.legions)for(var i=0;i<p.legions.length;i++){var c=p.legions[i];if(c){n++;slotCodes[c]=1;}}
  for(var gi=0;gi<groups.length;gi++){var g=groups[gi];var lead=(g.code in assign)?assign[g.code]:g.leader;if(lead&&(''+lead).trim().toLowerCase()===me&&!slotCodes[g.code]){n++;slotCodes[g.code]=1;}}
  return n;
}
function mapInfoHTML(){
  var subs=[];roster.forEach(function(p){if(p.sub)subs.push(p.name);});
  var ord=teleportOrder();
  var tp='<div class="rolehdr"><span>'+esc(t('teleport'))+'</span></div><table class="t tp"><tr><th>#</th><th>'+esc(t('col_player_short'))+'</th><th class="tplg" title="'+esc(t('legions'))+'">'+esc(t('leg'))+'</th></tr>';
  ord.forEach(function(p,i){
    var sc=p.side==='strong'?'#f4a6d7':(p.side==='off'?'#8fc0f0':'#c9d4de');
    var lc=legAssignedCount(p);
    tp+='<tr class="tprow" data-n="'+esc(p.name)+'">'
      +'<td>'+(i+1)+'</td>'
      +'<td><span class="tpn" style="color:'+sc+'">'+esc(p.name)+'</span><span class="tprole">'+esc(mainRoleLbl(p))+'</span></td>'
      +'<td class="tplg"><span class="lgbadge'+(lc>=5?' full':(lc===0?' zero':''))+'">'+lc+'</span></td></tr>';
  });
  tp+='</table>';
  if(subs.length)tp+='<div class="sub" style="font-size:10px"><b>'+esc(t('subs'))+':</b> '+esc(subs.join(', '))+'</div>';
  var gp='<div class="rolehdr"><span>'+esc(t('grouping'))+'</span> <span class="rolekey"><i class="rk-b"></i> '+esc(t('lg_1st'))+' <i class="rk-g"></i> '+esc(t('lg_gar'))+' <i class="rk-y"></i> '+esc(t('lg_fill'))+' <i class="rk-r"></i> '+esc(t('lg_cavs'))+'</span></div><div class="gpgrid">';
  groups.forEach(function(g){
    if(!g.roles)g.roles={};
    var rows=rallyRows(g);
    var lead=(g.code in assign)?assign[g.code]:g.leader;
    var body=rows.map(function(r){
      var col=roleColor(r.role),roleTxt='<span class="grole" style="color:'+col+'">'+esc(r.role?roleLabel(r.role):'\u2014')+'</span>';
      var del='<button class="gmdel" data-c="'+esc(g.code)+'" data-n="'+esc(r.name)+'" title="'+esc(t('remove_rally'))+'">\u00d7</button>';
      // Leader's rally (first) is read-only and can't be removed here (change the lead
      // in the Rallies tab); their extra marches and all member legions are removable.
      if(r.lead&&r.first)return '<div class="gmrow"><span class="gmn" style="color:'+col+';font-weight:bold">'+esc(r.name)+'</span>'+roleTxt+'</div>';
      if(r.lead)return '<div class="gmrow"><span class="gmn" style="color:'+col+';font-weight:bold">'+esc(r.name)+'</span>'+roleTxt+del+'</div>';
      if(r.first)return '<div class="gmrow"><span class="gmn" style="color:'+col+'">'+esc(r.name)+'</span>'
        +'<select class="gmrole" data-c="'+esc(g.code)+'" data-n="'+esc(r.name)+'">'+roleOptions(g.roles[r.name],g.code)+'</select>'+del+'</div>';
      return '<div class="gmrow"><span class="gmn" style="color:'+col+';opacity:.75">'+esc(r.name)+'</span>'+roleTxt+del+'</div>';
    }).join('');
    var foot=lead?('<div class="gfoot"><span class="gfoot-l">'+esc(leadLabel(g.code))+'</span><span class="gfoot-n">'+esc(lead)+'</span></div>'):'';
    var inner=(body||'<div class="asg drophint"><span>'+esc(t('drag_here'))+'</span></div>')+foot;
    gp+='<div class="grp gs-'+g.side+'" data-c="'+esc(g.code)+'"><div class="grphd"><b>'+esc(g.code)+'</b> <span class="gtag">'+rallyLegions(g)+' '+esc(t('leg'))+'</span></div>'+inner+'</div>';
  });
  gp+='</div>';
  return '<div class="minfo"><div class="minfo-tp">'+tp+'</div><div class="minfo-gp">'+gp+'</div></div>';
}
// Wire drag-to-group + inline role/remove inside one rendered panel container.
function bindMapInfo(c){
  if(!c)return;
  var rs=c.querySelectorAll('.gmrole');
  for(var r=0;r<rs.length;r++){rs[r].onchange=function(e){var code=e.target.getAttribute('data-c'),nm=e.target.getAttribute('data-n');for(var gi=0;gi<groups.length;gi++){if(groups[gi].code===code){if(!groups[gi].roles)groups[gi].roles={};groups[gi].roles[nm]=e.target.value;break;}}save();renderRallies();renderMapInfo();};}
  var dl=c.querySelectorAll('.gmdel');
  for(var d=0;d<dl.length;d++){dl[d].onclick=function(e){var b=e.target.closest('button')||e.target;removeFromRally(b.getAttribute('data-c'),b.getAttribute('data-n'));};}
  // Drag a teleport name onto a grouping card. Uses Pointer Events (not the HTML5
  // drag API, which iOS Safari ignores) so it works on iPhone as well as desktop.
  if(!IS_ADMIN)return;
  var rows=c.querySelectorAll('.tprow');
  for(var i=0;i<rows.length;i++)bindDragRow(rows[i]);
}
function bindDragRow(row){
  row.onpointerdown=function(e){
    if(e.button&&e.button!==0)return;
    var name=row.getAttribute('data-n');if(!name)return;
    var sx=e.clientX,sy=e.clientY,pid=e.pointerId,dragging=false,ghost=null,curHi=null;
    function cardAt(x,y){var el2=document.elementFromPoint(x,y);return (el2&&el2.closest)?el2.closest('.grp[data-c]'):null;}
    function move(ev){
      if(!dragging){
        if(Math.abs(ev.clientX-sx)+Math.abs(ev.clientY-sy)<8)return; // threshold: let taps & scrolls through
        dragging=true;document.body.classList.add('tp-dragging');
        ghost=document.createElement('div');ghost.className='tp-ghost';ghost.textContent=name;document.body.appendChild(ghost);
        try{row.setPointerCapture(pid);}catch(_){}
      }
      ev.preventDefault();
      ghost.style.left=(ev.clientX+12)+'px';ghost.style.top=(ev.clientY+8)+'px';
      var card=cardAt(ev.clientX,ev.clientY);
      if(card!==curHi){if(curHi)curHi.classList.remove('drop-hi');curHi=card;if(curHi)curHi.classList.add('drop-hi');}
    }
    function up(ev){
      row.removeEventListener('pointermove',move);row.removeEventListener('pointerup',up);row.removeEventListener('pointercancel',up);
      try{row.releasePointerCapture(pid);}catch(_){}
      if(dragging){var card=cardAt(ev.clientX,ev.clientY);if(card){var code=card.getAttribute('data-c');if(code)addToRally(code,name);}}
      if(ghost&&ghost.parentNode)ghost.parentNode.removeChild(ghost);
      if(curHi)curHi.classList.remove('drop-hi');
      document.body.classList.remove('tp-dragging');
    }
    row.addEventListener('pointermove',move);
    row.addEventListener('pointerup',up);
    row.addEventListener('pointercancel',up);
  };
}
function renderMapInfo(){var h=mapInfoHTML();var a=el('mapinfo-blue'),b=el('mapinfo-yellow');if(a)a.innerHTML=h;if(b)b.innerHTML=h;bindMapInfo(a);bindMapInfo(b);if(typeof enforceRole==='function')enforceRole();}
// ---- Image modal (lightbox) for any uploaded proof ----
function openImg(url){
  if(!url)return;
  var m=document.getElementById('imgmodal');
  if(!m){m=document.createElement('div');m.id='imgmodal';m.className='imgmodal';m.innerHTML='<span class="imgmodal-x">\u00d7</span><img id="imgmodal-img" src="" alt="proof">';document.body.appendChild(m);m.onclick=function(){m.className='imgmodal';};}
  var im=document.getElementById('imgmodal-img');if(im)im.src=url;
  m.className='imgmodal show';
}
// ---- Admin: Members panel (approve + assign team/player + role) ----
function mergeDuplicates(rows){
  if(!SB){alert('Sign-in not configured.');return;}
  var groups={};
  rows.forEach(function(m){
    if(!m.approved)return;
    var sub=m.submission||{},b=sub.buffs||{};
    var uuid=(b.uuid&&b.uuid.v)?(''+b.uuid.v).trim():'';
    var nm=((sub.name||m.player||'')+'').trim().toLowerCase();
    var key=uuid?('u:'+uuid):(nm?('n:'+nm):'');
    if(!key)return;(groups[key]=groups[key]||[]).push(m);
  });
  var dups=Object.keys(groups).map(function(k){return groups[k];}).filter(function(g){return g.length>1;});
  if(!dups.length){alert('No duplicate accounts found (matched by UUID, then in-game name).');return;}
  var summary=dups.map(function(g){return ((g[0].submission&&g[0].submission.name)||g[0].player||'?')+' \u00d7'+g.length;}).join(', ');
  if(!confirm('Merge duplicates: '+summary+'\n\nThe most complete data is kept on one player and the extra account(s) are removed. This cannot be undone.'))return;
  var toDelete=[],changed=false;
  dups.forEach(function(g){
    var primary=g[0],pname=(primary.submission&&primary.submission.name)||primary.player;
    var pl=null;roster.forEach(function(p){if((p.name||'').toLowerCase()===(''+pname).toLowerCase())pl=p;});
    if(!pl){pl={name:pname,side:'',sub:false,func:'',legions:['','','','',''],buffs:{}};roster.push(pl);changed=true;}
    if(!pl.buffs)pl.buffs={};
    g.forEach(function(m){var bb=(m.submission&&m.submission.buffs)||{};for(var fk in bb){var e=bb[fk];if(!e)continue;var cur=pl.buffs[fk],curHas=cur&&(cur.v||cur.img),newHas=e.v||e.img;if(newHas&&!curHas){pl.buffs[fk]=e;changed=true;}}});
    for(var i=1;i<g.length;i++)toDelete.push(g[i].id);
  });
  // dedupe roster by name (keep first)
  var seen={},nr=[];roster.forEach(function(p){var k=(p.name||'').toLowerCase();if(k&&seen[k]){changed=true;return;}if(k)seen[k]=1;nr.push(p);});
  if(nr.length!==roster.length){roster.length=0;nr.forEach(function(p){roster.push(p);});}
  if(changed&&typeof saveRoster==='function')saveRoster();
  var done=0,total=toDelete.length;
  function finish(){renderPlayers();renderMapInfo();renderMembers();}
  if(!total){finish();return;}
  toDelete.forEach(function(id){SB.from('profiles').delete().eq('id',id).then(function(){if(++done>=total)finish();},function(){if(++done>=total)finish();});});
}
// Permanently remove a member: deletes their account record AND erases the linked
// player from the roster, every rally/legion, all leader slots and map assignments.
function removeMemberCompletely(id,name){
  var label=name||'this member';
  if(typeof confirm==='function'&&!confirm('Remove '+label+' completely?\n\nThis deletes their account record and erases them from the roster, all rallies, every role, and any leader/tower slot they hold. This cannot be undone.'))return;
  if(name){
    var me=(''+name).trim().toLowerCase();
    // roster
    for(var i=roster.length-1;i>=0;i--){if((''+roster[i].name).trim().toLowerCase()===me)roster.splice(i,1);}
    // group leaders (constant) + per-member roles
    groups.forEach(function(g){
      if((''+(g.leader||'')).trim().toLowerCase()===me)g.leader='';
      if(g.roles){for(var k in g.roles){if((''+k).trim().toLowerCase()===me)delete g.roles[k];}}
    });
    // any assign slot pointing at them (group leaders + map building/tower leaders)
    for(var code in assign){if(assign[code]&&(''+assign[code]).trim().toLowerCase()===me)assign[code]='';}
    if(typeof save==='function')save();
    if(typeof saveRoster==='function')saveRoster();
  }
  function done(){renderMembers();if(typeof renderPlayers==='function')renderPlayers();if(typeof renderMap==='function'){renderMap('blue');renderMap('yellow');}if(typeof renderRallies==='function')renderRallies();if(typeof renderStaff==='function')renderStaff();if(typeof renderSides==='function')renderSides();if(typeof renderMapInfo==='function')renderMapInfo();if(typeof renderLife==='function')renderLife();if(typeof renderReady==='function')renderReady();}
  if(SB&&id){SB.from('profiles').delete().eq('id',id).then(done,done);}else done();
}
function renderMembers(){
  var c=el('memberstbl');if(!c)return;
  if(!IS_ADMIN){c.innerHTML='<div class="sub">'+esc(t('admins_only'))+'</div>';return;}
  if(!SB){c.innerHTML='<div class="sub">Sign-in isn\u2019t configured, so there are no accounts to manage.</div>';return;}
  c.innerHTML='<div class="sub">'+esc(t('loading_members'))+'</div>';
  SB.from('profiles').select('id,email,role,approved,player,submission').then(function(res){
    if(!res||res.error){c.innerHTML='<div class="sub">'+esc(t('load_members_fail'))+'</div>';return;}
    var rows=res.data||[];
    rows.sort(function(a,b){return (a.approved?1:0)-(b.approved?1:0)||((a.email||'')<(b.email||'')?-1:1);});
    // safety net: any approved account not yet in the roster gets added
    var _added=false;
    rows.forEach(function(m){
      if(!m.approved)return;
      var nmv=(m.submission&&m.submission.name)||m.player;if(!nmv)return;
      var ex=false;roster.forEach(function(p){if((p.name||'').toLowerCase()===(''+nmv).toLowerCase())ex=true;});
      if(!ex){roster.push({name:nmv,side:'',sub:false,func:'',legions:['','','','',''],buffs:((m.submission&&m.submission.buffs)||{})});_added=true;}
    });
    if(_added){if(typeof saveRoster==='function')saveRoster();if(typeof renderPlayers==='function')renderPlayers();if(typeof renderMapInfo==='function')renderMapInfo();}
    var opts=roster.map(function(p){return p.name;});
    var pending=rows.filter(function(m){return !m.approved;}).length;
    function src(m){var pl=null;roster.forEach(function(x){if(x.name===m.player)pl=x;});return (m.approved&&pl&&pl.buffs)?pl.buffs:((m.submission&&m.submission.buffs)||{});}
    function nm(m){return (m.submission&&m.submission.name)||m.player||'\u2014';}
    function bv(s,k){var e=s[k];return (e&&e.v!=null&&e.v!=='')?e.v:'\u2014';}
    function yn(s,k){return (s[k]&&s[k].v)?'yes':'no';}
    function troop(s){var e=s.maxed,v=e&&e.v;if(!v||typeof v!=='object')return '\u2014';var a=[];for(var k in v){if(v[k])a.push(k);}return a.length?a.join(', '):'\u2014';}
    function shot(s,k,lbl){var e=s[k];return (e&&e.img)?'<a class="viewshot" href="#" data-full="'+esc(e.img)+'">'+lbl+'</a>':'';}
    function detail(s){
      var parts=['Decoration Lvl: <b>'+esc(bv(s,'decoration'))+'</b>','SVIP: <b>'+yn(s,'svip')+'</b>','Faction: <b>'+esc(bv(s,'faction'))+'</b>','Legendary skins: <b>'+esc(bv(s,'legendary'))+'</b>','Exemplar: <b>'+yn(s,'exemplar')+'</b>'];
      var pf=[shot(s,'decoration','decoration'),shot(s,'svip','SVIP'),shot(s,'legendary','legendary skin'),shot(s,'maxpet','maxed pets')].filter(Boolean);
      var h='<div style="padding:6px 4px;font-size:12px;color:#cdd">'+parts.join(' &nbsp;\u00b7&nbsp; ')+'</div>';
      if(pf.length)h+='<div style="padding:2px 4px 6px;font-size:12px">Proof: '+pf.join(' &nbsp;\u00b7&nbsp; ')+'</div>';
      return h;
    }
    var h='<div class="sub"><b>'+rows.length+'</b> account'+(rows.length===1?'':'s')+' \u00b7 '+pending+' '+esc(t('members_intro'))+' <button class="mmerge">'+esc(t('merge_dupes'))+'</button></div>';
    h+='<table class="t"><tr><th></th><th>'+esc(t('col_email'))+'</th><th>'+esc(t('col_name'))+'</th><th>'+esc(t('col_uuid'))+'</th><th>'+esc(t('col_power'))+'</th><th>'+esc(t('col_troop'))+'</th><th>'+esc(t('col_approved'))+'</th><th>'+esc(t('col_role'))+'</th><th>'+esc(t('col_player'))+'</th><th></th></tr>';
    rows.forEach(function(m,ri){
      var s=src(m);
      h+='<tr'+(m.approved?'':' style="background:#3a2f18"')+'>'
       +'<td><button class="mexp" data-r="'+ri+'">\u25B8</button></td>'
       +'<td>'+esc(m.email||'')+'</td>'
       +'<td><b>'+esc(nm(m))+'</b></td>'
       +'<td>'+esc(bv(s,'uuid'))+'</td>'
       +'<td>'+esc(bv(s,'power'))+'</td>'
       +'<td style="font-size:11px">'+esc(troop(s))+'</td>'
       +'<td style="text-align:center"><input type="checkbox" class="mapp" data-id="'+m.id+'" data-r="'+ri+'"'+(m.approved?' checked':'')+'></td>'
       +'<td><select class="mrole" data-id="'+m.id+'"><option value="member"'+(m.role!=='admin'?' selected':'')+'>'+esc(t('r_member'))+'</option><option value="admin"'+(m.role==='admin'?' selected':'')+'>'+esc(t('r_admin'))+'</option></select></td>'
       +'<td>'+(!m.approved?'<span style="color:#9fb3c6;font-size:11px">'+esc(t('approve_to_add'))+'</span>':(m.submission?'<span class="mplayer-locked" title="Auto-assigned from their signup">'+esc(m.player||'\u2014')+'</span>':('<select class="mplayer" data-id="'+m.id+'"><option value="">\u2014 unassigned \u2014</option>'+opts.map(function(n){return '<option'+(m.player===n?' selected':'')+'>'+esc(n)+'</option>';}).join('')+'</select>')))+'</td>'
       +'<td style="text-align:center"><button class="mdelall" data-id="'+m.id+'" data-n="'+esc(m.player||nm(m)||'')+'" title="'+esc(t('remove_member'))+'">\uD83D\uDDD1</button></td>'
       +'</tr>';
      h+='<tr class="mdet" id="mdet_'+ri+'" style="display:none"><td></td><td colspan="9">'+detail(s)+'</td></tr>';
    });
    c.innerHTML=h+'</table>';
    function upd(id,patch,ok){SB.from('profiles').update(patch).eq('id',id).then(function(r){if(r&&!r.error&&ok)ok();},function(){});}
    function each(sel,fn){var n=c.querySelectorAll(sel);for(var i=0;i<n.length;i++)fn(n[i]);}
    each('.mexp',function(x){x.onclick=function(e){var r=e.target.getAttribute('data-r'),d=document.getElementById('mdet_'+r);if(d){var op=d.style.display==='none';d.style.display=op?'table-row':'none';e.target.textContent=op?'\u25BE':'\u25B8';}};});
    each('.viewshot',function(x){x.onclick=function(e){e.preventDefault();openImg(e.target.getAttribute('data-full'));};});
    each('.mapp',function(x){x.onchange=function(e){
      var id=e.target.getAttribute('data-id'),m=rows[+e.target.getAttribute('data-r')];
      if(e.target.checked){
        var nmv=(m.submission&&m.submission.name)||m.player;
        if(nmv){
          var ex=false;roster.forEach(function(p){if((p.name||'').toLowerCase()===nmv.toLowerCase())ex=true;});
          if(!ex){roster.push({name:nmv,side:'',sub:false,func:'',legions:['','','','',''],buffs:((m.submission&&m.submission.buffs)||{})});saveRoster();renderPlayers();}
          upd(id,{approved:true,player:nmv},renderMembers);
        }else{upd(id,{approved:true},renderMembers);}
      }else{upd(id,{approved:false},renderMembers);}
    };});
    each('.mrole',function(x){x.onchange=function(e){upd(e.target.getAttribute('data-id'),{role:e.target.value});};});
    each('.mplayer',function(x){x.onchange=function(e){upd(e.target.getAttribute('data-id'),{player:e.target.value},renderMembers);};});
    each('.mdelall',function(x){x.onclick=function(e){var b=e.target.closest('button')||e.target;removeMemberCompletely(b.getAttribute('data-id'),b.getAttribute('data-n'));};});
    var mb=c.querySelector('.mmerge');if(mb)mb.onclick=function(){mergeDuplicates(rows);};
  },function(){c.innerHTML='<div class="sub">'+esc(t('load_members_fail'))+'</div>';});
}
// ---- Phases: mechanics table with editable leaders (default to rally leaders) ----
function phaseLead(pi,ri,row){
  var k='PH:'+pi+':'+ri;if(k in assign)return assign[k];
  if(row.code){var l=(row.code in assign)?assign[row.code]:null;if(l==null){groups.forEach(function(g){if(g.code===row.code)l=g.leader;});}return l||'';}
  return '';
}
function renderPhases(){
  var c=el('phasetbl');if(!c)return;
  var h='';
  PHASES.forEach(function(ph,pi){
    h+='<div class="phhdr '+ph.cls+'">'+esc(ph.title)+'</div>';
    h+='<table class="t"><tr><th>'+esc(t('col_group'))+'</th><th>'+esc(t('col_leader'))+'</th><th>'+esc(t('col_side'))+'</th><th>'+esc(t('col_objective'))+'</th></tr>';
    ph.rows.forEach(function(row,ri){
      h+='<tr><td><b>'+esc(row.group)+'</b></td>'
       +'<td><select class="plead" data-p="'+pi+'" data-r="'+ri+'">'+nameOptions(phaseLead(pi,ri,row))+'</select></td>'
       +'<td style="color:'+row.sc+';font-weight:bold">'+esc(row.side)+'</td>'
       +'<td>'+esc(row.obj)+'</td></tr>';
    });
    h+='</table>';
  });
  c.innerHTML=h;
  var n=c.querySelectorAll('.plead');for(var i=0;i<n.length;i++){n[i].onchange=function(e){assign['PH:'+e.target.getAttribute('data-p')+':'+e.target.getAttribute('data-r')]=e.target.value;save();};}
  if(typeof enforceRole==='function')enforceRole();
}
