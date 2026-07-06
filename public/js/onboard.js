// onboard.js — new (unapproved) users complete their player card, then await approval.
window.showOnboarding=function(client,uid){
  var FUNCS=["GARRISON LEAD","GARRISON FILL","GHOST CAV","FAEDRAKE","LIFESTONE","TOWERS"];
  var imgs={};
  var FS=[
    {k:"uuid",l:"UUID (player ID)",t:"text"},
    {k:"power",l:"Total power",t:"text"},
    {k:"decoration",l:"Decoration Lvl.",t:"sel",o:["1","2","3","4","5","6","7","8","9"],proof:true},
    {k:"svip",l:"SVIP",t:"chk",proof:true},
    {k:"faction",l:"Faction",t:"sel",o:["Human","OrcWilderberg","Wood Elf"]},
    {k:"legendary",l:"# Of Legendary skin",t:"sel",o:["1","2","3","4","5"],proof:true},
    {k:"maxed",l:"Maxed unit type",t:"multi",o:["Infantry","Mage","Cavalry","Archer"]},
    {k:"exemplar",l:"Exemplar artefact",t:"chk"},
    {k:"maxpet",l:"Maxed pets",t:"proof",proof:true}
  ];
  function esc(s){return (''+(s==null?'':s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function row(lbl,inner){return '<div class="obrow"><label>'+esc(lbl)+'</label>'+inner+'</div>';}
  var h='<div class="obform"><h2>Complete your player profile</h2><p class="obsub">Fill in your details, then submit for approval. An alliance admin will review and grant you access.</p>';
  h+=row('In-game name *','<input id="ob_name" type="text" placeholder="exact in-game name">');
  FS.forEach(function(f){
    var inner='';
    if(f.t==='text')inner='<input id="ob_'+f.k+'" type="text">';
    else if(f.t==='chk')inner='<label class="obchk"><input id="ob_'+f.k+'" type="checkbox"> yes</label>';
    else if(f.t==='sel')inner='<select id="ob_'+f.k+'"><option value="">\u2014</option>'+f.o.map(function(o){return '<option>'+esc(o)+'</option>';}).join('')+'</select>';
    else if(f.t==='multi')inner='<span class="obmulti">'+f.o.map(function(o){return '<label class="obchk"><input class="ob_maxed" data-o="'+esc(o)+'" type="checkbox"> '+esc(o)+'</label>';}).join('')+'</span>';
    if(f.proof)inner+='<label class="obshot">\uD83D\uDCF7 proof<input type="file" accept="image/*" class="ob_file" data-k="'+f.k+'"></label><span class="obimg" id="obimg_'+f.k+'"></span>';
    h+=row(f.l,inner);
  });
  h+='<div class="obmsg" id="ob_msg"></div><button id="ob_submit" class="obgo">Submit for approval</button> <button id="ob_out" class="obout">Log out</button></div>';
  var ov=document.createElement('div');ov.id='obwrap';ov.innerHTML=h;document.body.appendChild(ov);
  var st=document.createElement('style');
  st.textContent='#obwrap{position:fixed;inset:0;z-index:99999;overflow:auto;font-family:Arial;color:#e8eef4;background:linear-gradient(rgba(10,20,32,.90),rgba(10,20,32,.94)),url(\'cod-bg.jpg\') center/cover fixed}.obform{max-width:560px;margin:34px auto;padding:24px;background:rgba(14,28,44,.94);border:1px solid #2f5680;border-radius:14px;box-shadow:0 12px 50px #000a}.obform h2{margin:0 0 6px;font-size:27px}.obsub{color:#9fb3c6;font-size:13px;margin:0 0 16px;line-height:1.5}.obrow{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid #14202e;font-size:13px}.obrow>label{flex:0 0 150px;color:#c9d4de}.obrow input[type=text],.obrow select{flex:1;min-width:0;background:#0a1622;border:1px solid #2f5680;border-radius:7px;color:#fff;padding:8px}.obchk{display:inline-flex;align-items:center;gap:5px;white-space:nowrap}.obmulti{display:flex;flex-wrap:wrap;gap:6px 12px;flex:1}.obshot{position:relative;overflow:hidden;flex:0 0 auto;background:#24425f;border:1px solid #3d6a96;color:#fff;border-radius:7px;padding:7px 10px;font-size:12px;font-weight:bold;cursor:pointer;white-space:nowrap}.obshot input[type=file]{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;cursor:pointer}.obimg{flex:0 0 auto;font-size:11px;color:#8ff0b0;white-space:nowrap}.obmsg{min-height:16px;font-size:12px;margin:10px 0;color:#ff9b9b}.obgo{background:#1c86ff;border:none;color:#fff;font-weight:bold;padding:11px 18px;border-radius:9px;cursor:pointer;font-size:14px;margin-top:8px}.obout{background:#24425f;border:1px solid #3d6a96;color:#fff;padding:11px 16px;border-radius:9px;cursor:pointer}';
  document.head.appendChild(st);
  document.documentElement.style.visibility='visible';
  function gv(id){var e=document.getElementById(id);return e?e.value:'';}
  function gc(id){var e=document.getElementById(id);return !!(e&&e.checked);}
  var msg=document.getElementById('ob_msg'),btn=document.getElementById('ob_submit');
  document.getElementById('ob_out').onclick=function(){client.auth.signOut().then(function(){location.replace('index.html');});};
  function obUpload(k,file){
    if(!file)return;var span=document.getElementById('obimg_'+k);if(span){span.style.color='#9fb3c6';span.textContent='uploading\u2026';}
    var path='onboard/'+Date.now()+'_'+k+'.jpg';
    try{
      client.storage.from('buffs').upload(path,file,{upsert:true,contentType:(file.type||'image/jpeg')}).then(function(res){
        if(res&&res.error){if(span){span.style.color='#ff9b9b';span.textContent='upload failed';}return;}
        var pub=client.storage.from('buffs').getPublicUrl(path);imgs[k]=(pub&&pub.data&&pub.data.publicUrl)||'';
        if(span){span.style.color='#8ff0b0';span.textContent='\u2713 added';}
      },function(){if(span){span.style.color='#ff9b9b';span.textContent='upload failed';}});
    }catch(e){if(span){span.style.color='#ff9b9b';span.textContent='upload failed';}}
  }
  var ofs=document.querySelectorAll('.ob_file');for(var oi=0;oi<ofs.length;oi++){ofs[oi].onchange=function(e){obUpload(e.target.getAttribute('data-k'),e.target.files[0]);};}
  btn.onclick=function(){
    var name=gv('ob_name').trim();
    if(!name){msg.style.color='#ff9b9b';msg.textContent='Please enter your in-game name.';return;}
    var maxed={},mm=document.querySelectorAll('.ob_maxed');for(var i=0;i<mm.length;i++){if(mm[i].checked)maxed[mm[i].getAttribute('data-o')]=true;}
    var buffs={uuid:{v:gv('ob_uuid')},power:{v:gv('ob_power')},decoration:{v:gv('ob_decoration')},svip:{v:gc('ob_svip')},faction:{v:gv('ob_faction')},legendary:{v:gv('ob_legendary')},maxed:{v:maxed},exemplar:{v:gc('ob_exemplar')},maxpet:{}};
    for(var kk in imgs){if(buffs[kk])buffs[kk].img=imgs[kk];}
    var entry={name:name,side:'',sub:true,func:'',legions:['','','','',''],buffs:buffs};
    msg.style.color='#9fb3c6';msg.textContent='Submitting\u2026';btn.disabled=true;
    var fail=function(t){msg.style.color='#ff9b9b';msg.textContent=t||'Could not submit \u2014 please try again.';btn.disabled=false;};
    client.from('plan').select('data').eq('id','btx').single().then(function(r){
      var data=(r&&r.data&&r.data.data)||{};var ros=(data.r&&data.r.slice)?data.r.slice():[];
      var found=-1;for(var i=0;i<ros.length;i++){if((ros[i].name||'').toLowerCase()===name.toLowerCase()){found=i;break;}}
      if(found>=0){ros[found].func=entry.func||ros[found].func;ros[found].buffs=buffs;}else ros.push(entry);
      client.rpc('save_roster',{p_roster:ros}).then(function(rr){
        if(rr&&rr.error){fail();return;}
        client.from('profiles').update({player:name}).eq('id',uid).then(function(){},function(){});
        document.querySelector('.obform').innerHTML='<h2>Submitted \u2713</h2><p class="obsub">Thanks! Your profile is saved. An admin will approve you shortly \u2014 you\u2019ll get full access once approved.</p><button class="obout" id="ob_out2">Log out</button>';
        document.getElementById('ob_out2').onclick=function(){client.auth.signOut().then(function(){location.replace('index.html');});};
      },function(){fail();});
    },function(){fail('Could not reach the server. Try again.');});
  };
};
