// onboard.js — new (unapproved) users complete their player card, then await approval. i18n-aware.
window.showOnboarding=function(client,uid){
  var lang=(function(){try{return localStorage.getItem('s2ak_lang')||(navigator.language||'en').slice(0,2);}catch(e){return 'en';}})();
  var OL={
    en:{title:"Complete your player profile",sub:"Fill in your details, then submit for approval. An alliance admin will review and grant you access.",name:"In-game name",submit:"Submit for approval",logout:"Log out",proof:"proof",need:"Please enter your in-game name.",submitting:"Submitting…",failed:"Could not submit — please try again.",noreach:"Could not reach the server. Try again.",done:"Submitted ✓",donesub:"Thanks! Your profile is saved. An admin will review it and approve you shortly — you’ll get full access once approved.",added:"✓ added",uploading:"uploading…",upfail:"upload failed",uuid:"UUID (player ID)",power:"Total power",decoration:"Decoration Lvl.",svip:"SVIP",faction:"Faction",legendary:"# Of Legendary skin",maxed:"Maxed unit type",exemplar:"Exemplar artefact",maxpet:"Maxed pets",Infantry:"Infantry",Mage:"Mage",Cavalry:"Cavalry",Archer:"Archer",yes:"yes"},
    fr:{title:"Complétez votre profil de joueur",sub:"Remplissez vos informations, puis soumettez pour approbation. Un admin de l’alliance vérifiera et vous accordera l’accès.",name:"Nom en jeu",submit:"Soumettre pour approbation",logout:"Déconnexion",proof:"preuve",need:"Veuillez saisir votre nom en jeu.",submitting:"Envoi…",failed:"Échec de l’envoi — réessayez.",noreach:"Impossible de joindre le serveur. Réessayez.",done:"Envoyé ✓",donesub:"Merci ! Votre profil est enregistré. Un admin le vérifiera et vous approuvera sous peu — vous aurez l’accès complet une fois approuvé.",added:"✓ ajouté",uploading:"envoi…",upfail:"échec de l’envoi",uuid:"UUID (ID du joueur)",power:"Puissance totale",decoration:"Niveau de décoration",svip:"SVIP",faction:"Faction",legendary:"Nb de skins légendaires",maxed:"Type d’unité maximisé",exemplar:"Artéfact exemplaire",maxpet:"Familiers maximisés",Infantry:"Infanterie",Mage:"Mage",Cavalry:"Cavalerie",Archer:"Archer",yes:"oui"},
    zh:{title:"完善你的玩家资料",sub:"填写你的信息，然后提交审批。联盟管理员将审核并授予你访问权限。",name:"游戏内名称",submit:"提交审批",logout:"登出",proof:"证明",need:"请输入你的游戏内名称。",submitting:"提交中…",failed:"提交失败 — 请重试。",noreach:"无法连接服务器。请重试。",done:"已提交 ✓",donesub:"谢谢！你的资料已保存。管理员将尽快审核并批准 — 批准后你将获得完整访问权限。",added:"✓ 已添加",uploading:"上传中…",upfail:"上传失败",uuid:"UUID（玩家ID）",power:"总战力",decoration:"装饰等级",svip:"SVIP",faction:"阵营",legendary:"传奇皮肤数量",maxed:"已满级兵种",exemplar:"典范神器",maxpet:"已满级宠物",Infantry:"步兵",Mage:"法师",Cavalry:"骑兵",Archer:"弓兵",yes:"是"},
    vi:{title:"Hoàn thiện hồ sơ người chơi",sub:"Điền thông tin của bạn, sau đó gửi để duyệt. Quản trị viên liên minh sẽ xem xét và cấp quyền truy cập.",name:"Tên trong game",submit:"Gửi để duyệt",logout:"Đăng xuất",proof:"bằng chứng",need:"Vui lòng nhập tên trong game của bạn.",submitting:"Đang gửi…",failed:"Không gửi được — vui lòng thử lại.",noreach:"Không thể kết nối máy chủ. Thử lại.",done:"Đã gửi ✓",donesub:"Cảm ơn! Hồ sơ của bạn đã được lưu. Quản trị viên sẽ xem xét và phê duyệt sớm — bạn sẽ có toàn quyền sau khi được duyệt.",added:"✓ đã thêm",uploading:"đang tải lên…",upfail:"tải lên thất bại",uuid:"UUID (ID người chơi)",power:"Tổng sức mạnh",decoration:"Cấp trang trí",svip:"SVIP",faction:"Phe",legendary:"Số skin huyền thoại",maxed:"Loại quân tối đa",exemplar:"Cổ vật mẫu mực",maxpet:"Thú cưng tối đa",Infantry:"Bộ binh",Mage:"Pháp sư",Cavalry:"Kỵ binh",Archer:"Cung thủ",yes:"có"}
  };
  if(!OL[lang])lang='en';
  function tr(k){return (OL[lang]&&OL[lang][k])||OL.en[k]||k;}
  var imgs={};
  var FS=[
    {k:"uuid",t:"text"},{k:"power",t:"text"},
    {k:"decoration",t:"sel",o:["1","2","3","4","5","6","7","8","9"],proof:true},
    {k:"svip",t:"chk",proof:true},
    {k:"faction",t:"sel",o:["Human","OrcWilderberg","Wood Elf"]},
    {k:"legendary",t:"sel",o:["1","2","3","4","5"],proof:true},
    {k:"maxed",t:"multi",o:["Infantry","Mage","Cavalry","Archer"]},
    {k:"exemplar",t:"chk"},{k:"maxpet",t:"proof",proof:true}
  ];
  function esc(s){return (''+(s==null?'':s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function row(lbl,inner){return '<div class="obrow"><label>'+esc(lbl)+'</label>'+inner+'</div>';}
  var ov=document.createElement('div');ov.id='obwrap';document.body.appendChild(ov);
  var st=document.createElement('style');
  st.textContent='#obwrap{position:fixed;inset:0;z-index:99999;overflow:auto;font-family:Arial;color:#e8eef4;background:linear-gradient(rgba(10,20,32,.90),rgba(10,20,32,.94)),url(\'cod-bg.jpg\') center/cover fixed}.obform{max-width:560px;margin:34px auto;padding:24px;background:rgba(14,28,44,.94);border:1px solid #2f5680;border-radius:14px;box-shadow:0 12px 50px #000a;position:relative}.oblang{position:absolute;top:16px;right:16px}.oblang select{background:#0f2036;color:#e8eef4;border:1px solid #2f5680;border-radius:8px;padding:5px 9px;font-size:12px}.obform h2{margin:0 0 6px;font-size:27px;padding-right:110px}.obsub{color:#9fb3c6;font-size:13px;margin:0 0 16px;line-height:1.5}.obrow{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid #14202e;font-size:13px}.obrow>label{flex:0 0 150px;color:#c9d4de}.obrow input[type=text],.obrow select{flex:1;min-width:0;background:#0a1622;border:1px solid #2f5680;border-radius:7px;color:#fff;padding:8px}.obchk{display:inline-flex;align-items:center;gap:5px;white-space:nowrap}.obmulti{display:flex;flex-wrap:wrap;gap:6px 12px;flex:1}.obshot{position:relative;overflow:hidden;flex:0 0 auto;background:#24425f;border:1px solid #3d6a96;color:#fff;border-radius:7px;padding:7px 10px;font-size:12px;font-weight:bold;cursor:pointer;white-space:nowrap}.obshot input[type=file]{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;cursor:pointer}.obimg{flex:0 0 auto;font-size:11px;color:#8ff0b0;white-space:nowrap}.obmsg{min-height:16px;font-size:12px;margin:10px 0;color:#ff9b9b}.obgo{background:#1c86ff;border:none;color:#fff;font-weight:bold;padding:11px 18px;border-radius:9px;cursor:pointer;font-size:14px;margin-top:8px}.obout{background:#24425f;border:1px solid #3d6a96;color:#fff;padding:11px 16px;border-radius:9px;cursor:pointer}';
  document.head.appendChild(st);
  document.documentElement.style.visibility='visible';
  function langOpts(){var L=[['en','English'],['fr','Français'],['zh','中文'],['vi','Tiếng Việt']];return L.map(function(x){return '<option value="'+x[0]+'"'+(lang===x[0]?' selected':'')+'>'+x[1]+'</option>';}).join('');}
  function render(){
    var h='<div class="obform"><div class="oblang"><select id="ob_lang">'+langOpts()+'</select></div>';
    h+='<h2>'+esc(tr('title'))+'</h2><p class="obsub">'+esc(tr('sub'))+'</p>';
    h+=row(tr('name')+' *','<input id="ob_name" type="text">');
    FS.forEach(function(f){
      var inner='';
      if(f.t==='text')inner='<input id="ob_'+f.k+'" type="text">';
      else if(f.t==='chk')inner='<label class="obchk"><input id="ob_'+f.k+'" type="checkbox"> '+esc(tr('yes'))+'</label>';
      else if(f.t==='sel')inner='<select id="ob_'+f.k+'"><option value="">—</option>'+f.o.map(function(o){return '<option>'+esc(o)+'</option>';}).join('')+'</select>';
      else if(f.t==='multi')inner='<span class="obmulti">'+f.o.map(function(o){return '<label class="obchk"><input class="ob_maxed" data-o="'+esc(o)+'" type="checkbox"> '+esc(tr(o))+'</label>';}).join('')+'</span>';
      if(f.proof)inner+='<label class="obshot">📷 '+esc(tr('proof'))+'<input type="file" accept="image/*" class="ob_file" data-k="'+f.k+'"></label><span class="obimg" id="obimg_'+f.k+'"></span>';
      h+=row(tr(f.k),inner);
    });
    h+='<div class="obmsg" id="ob_msg"></div><button id="ob_submit" class="obgo">'+esc(tr('submit'))+'</button> <button id="ob_out" class="obout">'+esc(tr('logout'))+'</button></div>';
    ov.innerHTML=h;wire();
  }
  function wire(){
    document.getElementById('ob_lang').onchange=function(e){lang=e.target.value;if(!OL[lang])lang='en';try{localStorage.setItem('s2ak_lang',lang);}catch(x){}try{client.from('profiles').update({lang:lang}).eq('id',uid).then(function(){},function(){});}catch(x){}render();};
    document.getElementById('ob_out').onclick=function(){client.auth.signOut().then(function(){location.replace('index.html');});};
    function obUpload(k,file){
      if(!file)return;var span=document.getElementById('obimg_'+k);if(span){span.style.color='#9fb3c6';span.textContent=tr('uploading');}
      var path='onboard/'+Date.now()+'_'+k+'.jpg';
      try{
        client.storage.from('buffs').upload(path,file,{upsert:true,contentType:(file.type||'image/jpeg')}).then(function(res){
          if(res&&res.error){if(span){span.style.color='#ff9b9b';span.textContent=tr('upfail');}return;}
          var pub=client.storage.from('buffs').getPublicUrl(path);imgs[k]=(pub&&pub.data&&pub.data.publicUrl)||'';
          if(span){span.style.color='#8ff0b0';span.textContent=tr('added');}
        },function(){if(span){span.style.color='#ff9b9b';span.textContent=tr('upfail');}});
      }catch(e){if(span){span.style.color='#ff9b9b';span.textContent=tr('upfail');}}
    }
    var ofs=document.querySelectorAll('.ob_file');for(var oi=0;oi<ofs.length;oi++){ofs[oi].onchange=function(e){obUpload(e.target.getAttribute('data-k'),e.target.files[0]);};}
    function gv(id){var e=document.getElementById(id);return e?e.value:'';}
    function gc(id){var e=document.getElementById(id);return !!(e&&e.checked);}
    var msg=document.getElementById('ob_msg'),btn=document.getElementById('ob_submit');
    btn.onclick=function(){
      var name=gv('ob_name').trim();
      if(!name){msg.style.color='#ff9b9b';msg.textContent=tr('need');return;}
      var maxed={},mm=document.querySelectorAll('.ob_maxed');for(var i=0;i<mm.length;i++){if(mm[i].checked)maxed[mm[i].getAttribute('data-o')]=true;}
      var buffs={uuid:{v:gv('ob_uuid')},power:{v:gv('ob_power')},decoration:{v:gv('ob_decoration')},svip:{v:gc('ob_svip')},faction:{v:gv('ob_faction')},legendary:{v:gv('ob_legendary')},maxed:{v:maxed},exemplar:{v:gc('ob_exemplar')},maxpet:{}};
      for(var kk in imgs){if(buffs[kk])buffs[kk].img=imgs[kk];}
      msg.style.color='#9fb3c6';msg.textContent=tr('submitting');btn.disabled=true;
      var fail=function(t){msg.style.color='#ff9b9b';msg.textContent=t||tr('failed');btn.disabled=false;};
      var submission={name:name,buffs:buffs};
      client.from('profiles').update({submission:submission,player:name,lang:lang}).eq('id',uid).then(function(r){
        if(r&&r.error){fail();return;}
        document.querySelector('.obform').innerHTML='<h2>'+esc(tr('done'))+'</h2><p class="obsub">'+esc(tr('donesub'))+'</p><button class="obout" id="ob_out2">'+esc(tr('logout'))+'</button>';
        document.getElementById('ob_out2').onclick=function(){client.auth.signOut().then(function(){location.replace('index.html');});};
      },function(){fail(tr('noreach'));});
    };
  }
  render();
};
