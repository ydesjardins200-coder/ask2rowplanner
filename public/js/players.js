// players.js — registered roster HUB (main/subs + buffs) + Rallies grouping.
function initRoster(){
  roster=[];
  REG_STRONG.forEach(function(n){roster.push({name:n,side:'strong',sub:false,buffs:{}});});
  REG_OFF.forEach(function(n){roster.push({name:n,side:'off',sub:false,buffs:{}});});
  REG_SUB.forEach(function(n){roster.push({name:n,side:'',sub:true,buffs:{}});});
}
function initGroups(){groups=GROUPS.map(function(g){return {code:g.code,leader:g.leader,side:g.side,troop:g.troop,members:g.members.slice()};});}
function pbuffs(p){if(!p.buffs)p.buffs={};return p.buffs;}
function buffCount(p){var b=pbuffs(p),n=0;BUFFS.forEach(function(k){if(b[k]&&b[k].ok)n++;});return n;}
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
function rdirtyNote(){var n=el('rdirty');if(n)n.textContent=rosterDirty?'Unsaved changes \u2014 tap Save to share with the team.':'';}
function markDirty(){rosterDirty=true;var b=document.querySelectorAll('#playerlist .save');for(var i=0;i<b.length;i++){b[i].className='save dirty';b[i].textContent='Save*';}rdirtyNote();}
function clearDirty(){rosterDirty=false;var b=document.querySelectorAll('#playerlist .save');for(var i=0;i<b.length;i++){b[i].className='save';b[i].textContent='Save';}rdirtyNote();}
function commitRoster(){saveRoster();clearDirty();renderMap('blue');renderMap('yellow');renderRallies();renderStaff();renderSides();renderLife();renderReady();}
function readyBadge(p){var n=buffCount(p),t=BUFFS.length;var cls=n>=t?'rdy full':(n>0?'rdy part':'rdy none');return '<span class="'+cls+'">'+n+'/'+t+'</span>';}
function buffList(i,p){
  var b=pbuffs(p),h='';
  BUFFS.forEach(function(k){
    var v=b[k]||{},ok=!!v.ok;
    h+='<div class="buf"><label><input type="checkbox" class="bchk" data-i="'+i+'" data-k="'+esc(k)+'"'+(ok?' checked':'')+'> '+esc(k)+'</label>';
    if(v.img) h+='<a class="shotimg" href="'+esc(v.img)+'" target="_blank" rel="noopener"><img src="'+esc(v.img)+'" alt="proof"></a>';
    h+='<label class="shotbtn">'+(v.img?'Replace':'\uD83D\uDCF7 Proof')+'<input type="file" accept="image/*" class="bfile" data-i="'+i+'" data-k="'+esc(k)+'"></label></div>';
  });
  return h;
}
// ---- derived: which groups a player leads / is in ----
function playerGroups(name){var leads=[],inn=[];groups.forEach(function(g){if(g.leader===name)leads.push(g.code);if(g.members.indexOf(name)>=0)inn.push(g.code);});return {leads:leads,inn:inn};}
function playerCard(i){
  var p=roster[i],pg=playerGroups(p.name);
  var asg='<b>Leads:</b> '+(pg.leads.length?esc(pg.leads.join(', ')):'\u2014')+' &nbsp;\u00b7&nbsp; <b>In rallies:</b> '+(pg.inn.length?esc(pg.inn.join(', ')):'\u2014');
  var d=rosterDirty?' dirty':'',t=rosterDirty?'Save*':'Save';
  return '<div class="pcard" data-i="'+i+'"><div class="phead">'
   +'<button class="exp">\u25B8</button>'
   +'<input class="pn" data-i="'+i+'" value="'+esc(p.name)+'">'
   +'<select class="pside" data-i="'+i+'"><option value="strong"'+(p.side==='strong'?' selected':'')+'>Strong</option><option value="off"'+(p.side==='off'?' selected':'')+'>Off</option><option value=""'+(!p.side?' selected':'')+'>\u2014</option></select>'
   +'<select class="psub" data-i="'+i+'"><option value="main"'+(!p.sub?' selected':'')+'>Main</option><option value="sub"'+(p.sub?' selected':'')+'>Sub</option></select>'
   +readyBadge(p)
   +'<button class="save'+d+'" data-i="'+i+'">'+t+'</button>'
   +'<button class="rm" data-i="'+i+'">\u00d7</button>'
   +'</div><div class="pbody"><div class="asg">'+asg+'</div><div class="bufs">'+buffList(i,p)+'</div></div></div>';
}
function renderPlayers(){
  var c=el('playerlist');if(!c)return;
  var secs=[['Strong Side \u2014 Main',function(p){return !p.sub&&p.side==='strong';}],
            ['Off Side \u2014 Main',function(p){return !p.sub&&p.side==='off';}],
            ['Substitutes',function(p){return p.sub;}],
            ['Unassigned',function(p){return !p.sub&&p.side!=='strong'&&p.side!=='off';}]];
  var nMain=0,nSub=0;roster.forEach(function(p){if(p.sub)nSub++;else nMain++;});
  var h='<div class="bar"><span class="sub">Registered team \u2014 <b>'+nMain+' main + '+nSub+' subs</b>. Set side &amp; Main/Sub, tick buffs, add proof. The Rallies tab pulls names from here. Tap \u25B8 to expand.</span></div><div class="sub" id="rdirty" style="color:#e0a52a"></div><div class="bar"><button onclick="addPlayer()">+ Add player</button></div>';
  secs.forEach(function(s){
    var idxs=[];roster.forEach(function(p,i){if(s[1](p))idxs.push(i);});
    if(idxs.length===0)return;
    h+='<div class="rolehdr"><span>'+s[0]+'<span class="cnt">'+idxs.length+'</span></span></div>';
    idxs.forEach(function(i){h+=playerCard(i);});
  });
  c.innerHTML=h;rdirtyNote();
  function each(sel,fn){var n=c.querySelectorAll(sel);for(var i=0;i<n.length;i++)fn(n[i]);}
  each('.exp',function(x){x.onclick=function(e){var card=e.target.parentNode.parentNode;var open=card.className.indexOf('open')<0;card.className=open?'pcard open':'pcard';e.target.textContent=open?'\u25BE':'\u25B8';};});
  each('.pn',function(x){x.onchange=function(e){roster[+e.target.getAttribute('data-i')].name=e.target.value;saveLocal();markDirty();};});
  each('.pside',function(x){x.onchange=function(e){roster[+e.target.getAttribute('data-i')].side=e.target.value;saveLocal();markDirty();renderPlayers();renderSides();};});
  each('.psub',function(x){x.onchange=function(e){roster[+e.target.getAttribute('data-i')].sub=(e.target.value==='sub');saveLocal();markDirty();renderPlayers();renderSides();};});
  each('.save',function(x){x.onclick=function(){commitRoster();renderPlayers();};});
  each('.rm',function(x){x.onclick=function(e){roster.splice(+e.target.getAttribute('data-i'),1);saveRoster();renderPlayers();renderSides();renderRallies();};});
  each('.bchk',function(x){x.onchange=function(e){var i=+e.target.getAttribute('data-i'),k=e.target.getAttribute('data-k');var b=pbuffs(roster[i]);b[k]=b[k]||{};b[k].ok=e.target.checked;saveLocal();markDirty();updateBadge(i);renderReady();};});
  each('.bfile',function(x){x.onchange=function(e){uploadBuff(+e.target.getAttribute('data-i'),e.target.getAttribute('data-k'),e.target.files[0]);};});
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
      var b=pbuffs(roster[i]);b[k]={ok:true,img:url};saveRoster();renderPlayers();
    },function(){flash('Upload failed');});
  }catch(e){flash('Upload failed');}
}
function addPlayer(){roster.push({name:'New player',side:'',sub:true,buffs:{}});saveLocal();markDirty();renderPlayers();}
function resetPlayers(){initRoster();saveRoster();renderPlayers();renderSides();renderRallies();}
// ---- Rallies tab: the grouping (editable; member dropdowns from registered list) ----
function renderRallies(){
  var c=el('rallytbl');if(!c)return;
  var h='<div class="sub">The grouping \u2014 every member is a dropdown from the registered players. Editing needs the leadership Write key (set it on the Blue map tab).</div>';
  groups.forEach(function(g,gi){
    h+='<div class="grp gs-'+g.side+'"><div class="grphd"><b>'+esc(g.code)+'</b> <span class="gtag">'+sideLbl(g.side)+' \u00b7 '+esc(g.troop)+' \u00b7 '+g.members.length+'</span></div>';
    h+='<div class="grow"><span class="glbl">Lead</span><select class="glead" data-g="'+gi+'">'+nameOptions(g.leader)+'</select></div>';
    g.members.forEach(function(m,mi){
      h+='<div class="grow"><span class="glbl">'+(mi+1)+'</span><select class="gmem" data-g="'+gi+'" data-m="'+mi+'">'+nameOptions(m)+'</select><button class="gdel" data-g="'+gi+'" data-m="'+mi+'">\u00d7</button></div>';
    });
    h+='<div class="grow"><button class="gadd" data-g="'+gi+'">+ member</button></div></div>';
  });
  c.innerHTML=h;
  function each(sel,fn){var n=c.querySelectorAll(sel);for(var i=0;i<n.length;i++)fn(n[i]);}
  each('.glead',function(x){x.onchange=function(e){groups[+e.target.getAttribute('data-g')].leader=e.target.value;save();renderRallies();renderLife();renderPlayers();};});
  each('.gmem',function(x){x.onchange=function(e){groups[+e.target.getAttribute('data-g')].members[+e.target.getAttribute('data-m')]=e.target.value;save();renderRallies();renderLife();renderStaff();renderPlayers();};});
  each('.gdel',function(x){x.onclick=function(e){groups[+e.target.getAttribute('data-g')].members.splice(+e.target.getAttribute('data-m'),1);save();renderRallies();renderLife();renderStaff();renderPlayers();};});
  each('.gadd',function(x){x.onclick=function(e){groups[+e.target.getAttribute('data-g')].members.push('');save();renderRallies();renderLife();renderStaff();};});
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
    h+='<div class="grp gs-'+g.side+'"><div class="grphd"><b>'+esc(g.code)+'</b>'+(g.leader?' <span class="gtag">lead: '+esc(g.leader)+'</span>':'')+'</div><div class="asg">'+(g.members.length?esc(g.members.join(', ')):'\u2014')+'</div></div>';
  });
  c.innerHTML=h;
}
// ---- Buff readiness overview (leadership: who's not ready) ----
function renderReady(){
  var c=el('readytbl');if(!c)return;
  var rows=roster.map(function(p){return {p:p,n:buffCount(p)};});
  rows.sort(function(a,b){return a.n-b.n||(a.p.name.toLowerCase()<b.p.name.toLowerCase()?-1:1);});
  var full=0;roster.forEach(function(p){if(buffCount(p)>=BUFFS.length)full++;});
  var h='<div class="sub"><b>'+full+'/'+roster.length+'</b> fully buffed \u2014 least ready first.</div><table class="t stat"><tr><th>Player</th><th>Side</th><th>Buffs</th><th>Missing</th></tr>';
  rows.forEach(function(r){
    var p=r.p,b=pbuffs(p),miss=[];BUFFS.forEach(function(k){if(!(b[k]&&b[k].ok))miss.push(k);});
    var cls=r.n>=BUFFS.length?'ok':(r.n>0?'over':'bad');
    h+='<tr><td>'+esc(p.name)+(p.sub?' <span style="color:#8aa0b6">(sub)</span>':'')+'</td><td>'+sideLbl(p.side)+'</td><td class="'+cls+'">'+r.n+'/'+BUFFS.length+'</td><td style="font-size:10px;color:#d3a9b8">'+(miss.length?esc(miss.join(', ')):'\u2014')+'</td></tr>';
  });
  c.innerHTML=h+'</table>';
}
