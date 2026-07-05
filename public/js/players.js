// players.js — roster HUB: buffs + proof + derived assignments; per-row save.
// Rallies/Staffing derive from this. Buffs are self-serve (keyless save_roster).
function initRoster(){roster=DEF_PLAYERS.map(function(n){return {name:n,primary:(PRIMARY[n]||""),buffs:{}};});}
function pbuffs(p){if(!p.buffs)p.buffs={};return p.buffs;}
function buffCount(p){var b=pbuffs(p),n=0;BUFFS.forEach(function(k){if(b[k]&&b[k].ok)n++;});return n;}
var rosterDirty=false;
function rdirtyNote(){var n=el('rdirty');if(n)n.textContent=rosterDirty?'Unsaved changes \u2014 tap Save to share with the team.':'';}
function markDirty(){rosterDirty=true;var b=document.querySelectorAll('#playerlist .save');for(var i=0;i<b.length;i++){b[i].className='save dirty';b[i].textContent='Save*';}rdirtyNote();}
function clearDirty(){rosterDirty=false;var b=document.querySelectorAll('#playerlist .save');for(var i=0;i<b.length;i++){b[i].className='save';b[i].textContent='Save';}rdirtyNote();}
function commitRoster(){saveRoster();clearDirty();renderMap('blue');renderMap('yellow');renderStaff();renderRallies();}
function roleOptions(sel){var o='<option value="">\u2014 none \u2014</option>';RALLY_ORDER.forEach(function(r){o+='<option'+(((sel||'')===r)?' selected':'')+'>'+r+'</option>';});return o;}
function effLeader(b){return (b.code in assign)?assign[b.code]:b.leader;}
function sideName(s){return s==='strong'?'Strong':s==='off'?'Off':s==='center'?'Center':s==='support'?'Support':'\u2014';}
function rallySide(r){for(var i=0;i<BUILD.length;i++){if(BUILD[i].code===r)return sideName(BUILD[i].side);}return '\u2014';}
function leadsFor(name){var out=[];BUILD.forEach(function(b){if(effLeader(b)===name)out.push(b.code);});return out;}
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
function playerCard(i){
  var p=roster[i],leads=leadsFor(p.name);
  var asg='<b>Leads:</b> '+(leads.length?esc(leads.join(', ')):'\u2014')+' &nbsp;\u00b7&nbsp; <b>Rally:</b> '+(p.primary?esc(p.primary):'\u2014')+' &nbsp;\u00b7&nbsp; <b>Side:</b> '+(p.primary?rallySide(p.primary):'\u2014');
  var d=rosterDirty?' dirty':'',t=rosterDirty?'Save*':'Save';
  return '<div class="pcard" data-i="'+i+'">'
   +'<div class="phead">'
   +'<button class="exp" data-i="'+i+'">\u25B8</button>'
   +'<input class="pn" data-i="'+i+'" value="'+esc(p.name)+'">'
   +'<select class="pr" data-i="'+i+'">'+roleOptions(p.primary)+'</select>'
   +readyBadge(p)
   +'<button class="save'+d+'" data-i="'+i+'">'+t+'</button>'
   +'<button class="rm" data-i="'+i+'">\u00d7</button>'
   +'</div>'
   +'<div class="pbody"><div class="asg">'+asg+'</div><div class="bufs">'+buffList(i,p)+'</div></div>'
   +'</div>';
}
function renderPlayers(){
  var c=el('playerlist');if(!c)return;
  var groups=RALLY_ORDER.slice();groups.push('');
  var h='<div class="bar"><span class="sub">Each player is the source of truth \u2014 set rally, tick buffs, add proof. Rallies &amp; Staffing update from here. Tap \u25B8 to expand.</span></div><div class="sub" id="rdirty" style="color:#e0a52a"></div>';
  groups.forEach(function(r){
    var idxs=[];roster.forEach(function(p,i){var pr=(RALLY_ORDER.indexOf(p.primary)>=0)?p.primary:'';if(pr===r)idxs.push(i);});
    if(r===''&&idxs.length===0)return;
    var label=(r===''?'Unassigned':r),tgt=(r in TARGETS)?(' / '+TARGETS[r]+' target'):'';
    h+='<div class="rolehdr"><span>'+esc(label)+'<span class="cnt">'+idxs.length+tgt+'</span></span><button class="addto" data-r="'+esc(r)+'">+ Add</button></div>';
    idxs.forEach(function(i){h+=playerCard(i);});
  });
  c.innerHTML=h;rdirtyNote();
  function each(sel,fn){var n=c.querySelectorAll(sel);for(var i=0;i<n.length;i++)fn(n[i]);}
  each('.exp',function(x){x.onclick=function(e){var card=e.target.parentNode.parentNode;var open=card.className.indexOf('open')<0;card.className=open?'pcard open':'pcard';e.target.textContent=open?'\u25BE':'\u25B8';};});
  each('.pn',function(x){x.onchange=function(e){roster[+e.target.getAttribute('data-i')].name=e.target.value;saveLocal();markDirty();};});
  each('.pr',function(x){x.onchange=function(e){roster[+e.target.getAttribute('data-i')].primary=e.target.value;saveLocal();markDirty();renderPlayers();renderStaff();renderRallies();};});
  each('.save',function(x){x.onclick=function(){commitRoster();};});
  each('.rm',function(x){x.onclick=function(e){roster.splice(+e.target.getAttribute('data-i'),1);saveRoster();renderPlayers();renderStaff();renderRallies();renderMap('blue');renderMap('yellow');};});
  each('.addto',function(x){x.onclick=function(e){var r=e.target.getAttribute('data-r');roster.push({name:'New player',primary:r||'',buffs:{}});saveLocal();markDirty();renderPlayers();renderStaff();};});
  each('.bchk',function(x){x.onchange=function(e){var i=+e.target.getAttribute('data-i'),k=e.target.getAttribute('data-k');var b=pbuffs(roster[i]);b[k]=b[k]||{};b[k].ok=e.target.checked;saveLocal();markDirty();updateBadge(i);};});
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
function addPlayer(){roster.push({name:'New player',primary:'',buffs:{}});saveLocal();markDirty();renderPlayers();renderStaff();}
function resetPlayers(){initRoster();saveRoster();renderPlayers();renderStaff();renderRallies();renderMap('blue');renderMap('yellow');}
// ---- Rallies tab: derived live from the roster ----
function renderRallies(){
  var c=el('rallytbl');if(!c)return;
  var h='<table class="t"><tr><th>Rally</th><th>Leader</th><th>Side</th><th>Troop</th><th>Members</th></tr>';
  RALLY_ORDER.forEach(function(r){
    var members=[];roster.forEach(function(p){if(p.primary===r)members.push(p.name);});
    var leader='\u2014';for(var i=0;i<BUILD.length;i++){if(BUILD[i].code===r){leader=effLeader(BUILD[i])||'\u2014';break;}}
    h+='<tr><td><b>'+esc(r)+'</b></td><td>'+esc(leader)+'</td><td>'+rallySide(r)+'</td><td>'+esc(TROOP[r]||'\u2014')+'</td><td>'+(members.length?esc(members.join(', ')):'<span style="color:#7a8a99">\u2014 none \u2014</span>')+'</td></tr>';
  });
  c.innerHTML=h+'</table>';
}
