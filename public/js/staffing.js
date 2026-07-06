// staffing.js — members per rally group vs plan size (from the grouping)
function renderStaff(){
  var c=el('stafftbl');if(!c)return;
  var h='<table class="t stat"><tr><th>'+esc(t('col_rally'))+'</th><th>'+esc(t('col_legions'))+'</th><th>'+esc(t('col_plan'))+'</th><th>'+esc(t('col_status'))+'</th></tr>';var tot=0,ttot=0;
  groups.forEach(function(g){
    var n=legionCount(g.code);var t=TARGETS[g.code]||0;tot+=n;ttot+=t;
    var cls='ok',lbl='OK';if(n===0){cls='bad';lbl='EMPTY';}else if(n<t){cls='bad';lbl='UNDER';}else if(n>t){cls='over';lbl='OVER';}
    h+='<tr><td><b>'+esc(g.code)+'</b></td><td>'+n+'</td><td>'+t+'</td><td class="'+cls+'">'+lbl+'</td></tr>';
  });
  h+='<tr><td><b>'+esc(t('total'))+'</b></td><td><b>'+tot+'</b></td><td><b>'+ttot+'</b></td><td></td></tr></table>';
  c.innerHTML=h;
}
