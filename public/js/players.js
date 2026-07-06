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
function funcOpts(sel){var o='<option value="">\u2014 pick \u2014</option>';FUNCTIONS.forEach(function(r){o+='<option'+(sel===r?' selected':'')+'>'+esc(r)+'</option>';});return o;}
function membersOf(code){var out=[],seen={};roster.forEach(function(p){if(p.legions&&p.legions.indexOf(code)>=0&&!seen[p.name]){seen[p.name]=1;out.push(p.name);}});return out;}
function legionCount(code){var n=0;roster.forEach(function(p){if(p.legions)p.legions.forEach(function(c){if(c===code)n++;});});return n;}
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
function clearDirty(){rosterDirty=false;var b=document.querySelectorAll('#playerlist .save');for(var i=0;i<b.length;i++){b[i].className='save';b[i].textContent='Save';}rdirtyNote();}
function commitRoster(){saveRoster();clearDirty();renderMap('blue');renderMap('yellow');renderRallies();renderStaff();renderSides();renderMapInfo();renderLife();renderReady();}
function readyBadge(p){var n=buffCount(p),t=fieldsFor(p).length;var cls=n>=t?'rdy full':(n>0?'rdy part':'rdy none');return '<span class="'+cls+'">'+n+'/'+t+'</span>';}
function buffList(i,p){
  var h='';
  fieldsFor(p).forEach(function(f){
    var e=pbuffs(p)[f.key]||{},v=e.v;
    h+='<div class="buf"><span class="blbl">'+esc(f.label)+'</span><span class="bctl">';
    if(f.type==='check'){
      h+='<label class="bchkw"><input type="checkbox" class="bchk" data-i="'+i+'" data-k="'+f.key+'"'+(v===true?' checked':'')+'> yes</label>';
    }else if(f.type==='text'){
      h+='<input type="text" class="btxt" data-i="'+i+'" data-k="'+f.key+'" value="'+esc(v||'')+'" placeholder="value">';
    }else if(f.type==='multicheck'){
      f.opts.forEach(function(o){var on=v&&typeof v==='object'&&v[o];h+='<label class="bmcw"><input type="checkbox" class="bmck" data-i="'+i+'" data-k="'+f.key+'" data-o="'+esc(o)+'"'+(on?' checked':'')+'> '+esc(o)+'</label>';});
    }else if(f.type!=='proof'){
      h+='<select class="bsel" data-i="'+i+'" data-k="'+f.key+'"><option value="">\u2014</option>';
      f.opts.forEach(function(o){h+='<option'+(v===o?' selected':'')+'>'+esc(o)+'</option>';});
      h+='</select>';
    }
    h+='</span><span class="bproof">';
    if(e.img) h+='<img class="shotimg" src="'+esc(e.img)+'" alt="proof" data-full="'+esc(e.img)+'">';
    h+='<label class="shotbtn">'+(e.img?'Replace':'\uD83D\uDCF7')+'<input type="file" accept="image/*" class="bfile" data-i="'+i+'" data-k="'+f.key+'"></label></span></div>';
  });
  return h;
}
// ---- derived: which groups a player leads / is in ----
function playerGroups(name){var leads=[],inn=[];groups.forEach(function(g){if(g.leader===name)leads.push(g.code);if(g.members.indexOf(name)>=0)inn.push(g.code);});return {leads:leads,inn:inn};}
function playerCard(i){
  var p=roster[i];
  var d=rosterDirty?' dirty':'',t=rosterDirty?'Save*':'Save';
  var legs=p.legions||['','','','',''];
  var assignH='';for(var li=0;li<5;li++){assignH+='<div class="lrow"><span class="llbl">Legion '+(li+1)+'</span><select class="pleg" data-i="'+i+'" data-l="'+li+'">'+legionOpts(legs[li]||'')+'</select></div>';}
  return '<div class="pcard'+(openCards[i]?' open':'')+'" data-i="'+i+'"><div class="phead">'
   +'<button class="exp" data-i="'+i+'">'+(openCards[i]?'\u25BE':'\u25B8')+'</button>'
   +'<input class="pn" data-i="'+i+'" value="'+esc(p.name)+'">'
   +'<select class="pside" data-i="'+i+'"><option value="strong"'+(p.side==='strong'?' selected':'')+'>Strong</option><option value="off"'+(p.side==='off'?' selected':'')+'>Off</option><option value=""'+(!p.side?' selected':'')+'>\u2014</option></select>'
   +'<select class="psub" data-i="'+i+'"><option value="main"'+(!p.sub?' selected':'')+'>Main</option><option value="sub"'+(p.sub?' selected':'')+'>Sub</option></select>'
   +readyBadge(p)
   +'<button class="save'+d+'" data-i="'+i+'">'+t+'</button>'
   +'<button class="rm" data-i="'+i+'">\u00d7</button>'
   +'</div><div class="pbody">'
   +'<div class="fbox"><div class="fbox-h">Main function</div><select class="pfunc" data-i="'+i+'">'+funcOpts(p.func||'')+'</select></div>'
   +'<div class="fbox"><div class="fbox-h">Assignment \u2014 5 legions \u2192 rally roles</div>'+assignH+'</div>'
   +'<div class="fbox"><div class="fbox-h">General info</div><div class="bufs">'+buffList(i,p)+'</div></div>'
   +'</div></div>';
}
function renderPlayers(){
  var c=el('playerlist');if(!c)return;
  var secs=[['Strong Side \u2014 Main',function(p){return !p.sub&&p.side==='strong';}],
            ['Off Side \u2014 Main',function(p){return !p.sub&&p.side==='off';}],
            ['Substitutes',function(p){return p.sub;}],
            ['Unassigned',function(p){return !p.sub&&p.side!=='strong'&&p.side!=='off';}]];
  var nMain=0,nSub=0;roster.forEach(function(p){if(p.sub)nSub++;else nMain++;});
  var h='<div class="bar"><span class="sub">Registered team \u2014 <b>'+nMain+' main + '+nSub+' subs</b>. Set side &amp; Main/Sub, tick buffs, add proof. The Rallies tab pulls names from here. Tap \u25B8 to expand.</span></div><div class="sub" id="rdirty" style="color:#e0a52a"></div><div class="bar"><button class="adminonly" onclick="addPlayer()">+ Add player</button></div>'+((!IS_ADMIN&&!MYNAME)?'<div class="linkme"><b>Which player are you?</b> pick your name to edit your own card: <select id="linkmesel"><option value="">\u2014 select \u2014</option>'+roster.map(function(pp){return '<option>'+esc(pp.name)+'</option>';}).join('')+'</select></div>':'');
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
  each('.shotimg',function(x){x.onclick=function(e){openImg(e.target.getAttribute('data-full'));};});
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
  flash('Uploading\u2026');
  var safe=(p.name||'p').replace(/[^a-zA-Z0-9]/g,'_').slice(0,24);
  var path=safe+'/'+k.replace(/[^a-zA-Z0-9]/g,'_')+'_'+Date.now()+'.jpg';
  try{
    SB.storage.from('buffs').upload(path,file,{upsert:true,contentType:(file.type||'image/jpeg')}).then(function(res){
      if(res&&res.error){flash('Upload failed');alert('Upload failed \u2014 make sure the "buffs" storage bucket exists (see setup).');return;}
      var pub=SB.storage.from('buffs').getPublicUrl(path);
      var url=(pub&&pub.data&&pub.data.publicUrl)?pub.data.publicUrl:'';
      var b=pbuffs(roster[i]);b[k]=b[k]||{};b[k].img=url;saveRoster();renderPlayers();
    },function(){flash('Upload failed');});
  }catch(e){flash('Upload failed');}
}
function addPlayer(){roster.push({name:'New player',side:'',sub:true,buffs:{}});saveLocal();markDirty();renderPlayers();}
function resetPlayers(){initRoster();saveRoster();renderPlayers();renderSides();renderMapInfo();renderRallies();}
// ---- Rallies tab: the grouping (editable; member dropdowns from registered list) ----
function renderRallies(){
  var c=el('rallytbl');if(!c)return;
  var h='<div class="sub">Members are built from each player\u2019s 5 legion assignments (Players tab). The Leader is set here (needs the Write key).</div>';
  groups.forEach(function(g,gi){
    var mem=membersOf(g.code),lc=legionCount(g.code);
    h+='<div class="grp gs-'+g.side+'"><div class="grphd"><b>'+esc(g.code)+'</b> <span class="gtag">'+sideLbl(g.side)+' \u00b7 '+esc(g.troop)+' \u00b7 '+lc+' legions</span></div>';
    h+='<div class="grow"><span class="glbl">Lead</span><select class="glead" data-g="'+gi+'">'+nameOptions(g.leader)+'</select></div>';
    h+='<div class="asg">'+(mem.length?esc(mem.join(', ')):'<span style="color:#7a8a99">no legions assigned yet</span>')+'</div></div>';
  });
  c.innerHTML=h;
  var n=c.querySelectorAll('.glead');for(var i=0;i<n.length;i++){n[i].onchange=function(e){groups[+e.target.getAttribute('data-g')].leader=e.target.value;save();renderRallies();renderLife();renderMapInfo();};}
  if(typeof enforceRole==='function')enforceRole();
}
// ---- Sides tab: registered Strong/Off, derived from roster ----
function renderSides(){
  var c=el('sidestbl');if(!c)return;
  var st=[],of=[];roster.forEach(function(p){if(p.sub)return;if(p.side==='strong')st.push(p.name);else if(p.side==='off')of.push(p.name);});
  var n=Math.max(st.length,of.length),h='<table class="t"><tr><th>#</th><th style="color:#e06fb5">Strong ('+st.length+')</th><th>#</th><th style="color:#5b9bd5">Off ('+of.length+')</th></tr>';
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
    h+='<div class="grp gs-'+g.side+'"><div class="grphd"><b>'+esc(g.code)+'</b>'+(g.leader?' <span class="gtag">lead: '+esc(g.leader)+'</span>':'')+'</div><div class="asg">'+(mem.length?esc(mem.join(', ')):'\u2014')+'</div></div>';
  });
  c.innerHTML=h;
}
// ---- Buff readiness overview (leadership: who's not ready) ----
function renderReady(){
  var c=el('readytbl');if(!c)return;
  var rows=roster.map(function(p){return {p:p,n:buffCount(p)};});
  rows.sort(function(a,b){return a.n-b.n||(a.p.name.toLowerCase()<b.p.name.toLowerCase()?-1:1);});
  var full=0;roster.forEach(function(p){if(buffCount(p)>=FIELDS.length)full++;});
  var h='<div class="sub"><b>'+full+'/'+roster.length+'</b> fully filled \u2014 least ready first.</div><table class="t stat"><tr><th>Player</th><th>Side</th><th>Fields</th><th>Missing</th></tr>';
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
function mapInfoHTML(){
  var subs=[];roster.forEach(function(p){if(p.sub)subs.push(p.name);});
  var ord=teleportOrder();
  var tp='<div class="rolehdr"><span>Teleport</span></div><table class="t tp"><tr><th>#</th><th>Player</th></tr>';
  ord.forEach(function(p,i){
    var sc=p.side==='strong'?'#f4a6d7':(p.side==='off'?'#8fc0f0':'#c9d4de');
    tp+='<tr><td>'+(i+1)+'</td><td style="color:'+sc+'">'+esc(p.name)+'</td></tr>';
  });
  tp+='</table>';
  if(subs.length)tp+='<div class="sub" style="font-size:10px"><b>Subs:</b> '+esc(subs.join(', '))+'</div>';
  var gp='<div class="rolehdr"><span>Grouping</span></div><div class="gpgrid">';
  groups.forEach(function(g){var mem=membersOf(g.code);gp+='<div class="grp gs-'+g.side+'"><div class="grphd"><b>'+esc(g.code)+'</b> <span class="gtag">'+(g.leader?'lead: '+esc(g.leader)+' \u00b7 ':'')+legionCount(g.code)+' leg</span></div><div class="asg">'+(mem.length?esc(mem.join(', ')):'<span style="color:#7a8a99">\u2014</span>')+'</div></div>';});
  gp+='</div>';
  return '<div class="minfo"><div class="minfo-tp">'+tp+'</div><div class="minfo-gp">'+gp+'</div></div>';
}
function renderMapInfo(){var h=mapInfoHTML();var a=el('mapinfo-blue'),b=el('mapinfo-yellow');if(a)a.innerHTML=h;if(b)b.innerHTML=h;}
// ---- Image modal (lightbox) for any uploaded proof ----
function openImg(url){
  if(!url)return;
  var m=document.getElementById('imgmodal');
  if(!m){m=document.createElement('div');m.id='imgmodal';m.className='imgmodal';m.innerHTML='<span class="imgmodal-x">\u00d7</span><img id="imgmodal-img" src="" alt="proof">';document.body.appendChild(m);m.onclick=function(){m.className='imgmodal';};}
  var im=document.getElementById('imgmodal-img');if(im)im.src=url;
  m.className='imgmodal show';
}
