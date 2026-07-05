// map.js — Blue/Yellow interactive maps + assignments
function leaderOptions(sel){var names=["— none —"];roster.forEach(function(p){if(p.name&&names.indexOf(p.name)<0)names.push(p.name);});EXTRA_LEADERS.forEach(function(x){if(names.indexOf(x)<0)names.push(x);});return names.map(function(n){var v=(n==='— none —')?'':n;return '<option value="'+esc(v)+'"'+(((sel||'')===v)?' selected':'')+'>'+esc(n)+'</option>';}).join('');}
function sideFor(b,color){if(color==='blue')return b.side;if(b.side==='strong')return 'off';if(b.side==='off')return 'strong';return b.side;}
var CLR={strong:'#e06fb5',off:'#5b9bd5',center:'#2fb3a4',support:'#c8952a'};
function renderMap(color){
 var wrap=el('wrap-'+color);var strong=(color==='blue')?[70,34]:[6,62];var off=(color==='blue')?[6,62]:[70,34];
 var youBase=(color==='blue')?LUC:YAE;var youName=(color==='blue')?'Lucia':'Yaen';
 var h='<div class="divide" style="left:26%;top:30%;width:74%;transform:rotate(34deg)"></div>';
 h+='<div class="zone" style="color:#f4a6d7;left:'+strong[0]+'%;top:'+strong[1]+'%">STRONG</div>';
 h+='<div class="zone" style="color:#8fc0f0;left:'+off[0]+'%;top:'+off[1]+'%">OFF</div>';
 h+='<div class="base" style="left:'+LUC[0]+'%;top:'+LUC[1]+'%;color:#9fe0ff">Lucia</div>';
 h+='<div class="base" style="left:'+YAE[0]+'%;top:'+YAE[1]+'%;color:#ffce7a">Yaen</div>';
 h+='<div class="you" style="left:'+youBase[0]+'%;top:'+(youBase[1]+7)+'%">YOU</div>';
 h+='<div class="life" style="left:'+LIFE[0]+'%;top:'+LIFE[1]+'%"></div>';
 BUILD.forEach(function(b){var ld=(b.code in assign)?assign[b.code]:b.leader;var sd=sideFor(b,color);
  h+='<div class="b'+(ld?'':' un')+'" style="left:'+b.x+'%;top:'+b.y+'%;border-color:'+CLR[sd]+'"><span class="code" style="color:'+CLR[sd]+'">'+b.code+'</span><select data-code="'+b.code+'">'+leaderOptions(ld)+'</select></div>';});
 wrap.innerHTML=h;
 var sels=wrap.querySelectorAll('select');for(var i=0;i<sels.length;i++){sels[i].onchange=function(e){assign[e.target.getAttribute('data-code')]=e.target.value;save();renderMap('blue');renderMap('yellow');};}
}
function resetPlan(){assign={};BUILD.forEach(function(b){assign[b.code]=b.leader;});save();renderMap('blue');renderMap('yellow');}
function clearAll(){assign={};BUILD.forEach(function(b){assign[b.code]='';});save();renderMap('blue');renderMap('yellow');}
