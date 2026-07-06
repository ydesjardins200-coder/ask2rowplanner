// map.js — Blue/Yellow interactive maps + assignments
function leaderOptions(sel){var names=["— none —"];roster.forEach(function(p){if(p.name&&names.indexOf(p.name)<0)names.push(p.name);});EXTRA_LEADERS.forEach(function(x){if(names.indexOf(x)<0)names.push(x);});return names.map(function(n){var v=(n==='— none —')?'':n;return '<option value="'+esc(v)+'"'+(((sel||'')===v)?' selected':'')+'>'+esc(n)+'</option>';}).join('');}
function sideFor(b,color){if(color==='blue')return b.side;if(b.side==='strong')return 'off';if(b.side==='off')return 'strong';return b.side;}
var CLR={strong:'#e06fb5',off:'#5b9bd5',center:'#2fb3a4',support:'#c8952a'};
// Divide line per map. Blue is the accurate reference. Yellow is the same
// angle/length, mirrored to the parallel position on the far side of the map
// center so the (flipped) strong lane sits on the Lucia side. Tune freely.
var DIVIDE={blue:{l:25,t:31,w:66,r:56},yellow:{l:21,t:3.5,w:105,r:55}};
var ZONES={blue:{strong:[64.5,28.9],off:[21.5,70.5]},yellow:{strong:[23.1,69.4],off:[71.9,24.4]}};
// Cross-side equivalence: on the YELLOW map each role sits at its mirror tower.
// (Blue is the reference; assignments stay tied to the role and follow it.)
var MIRROR={H1:"H4",H4:"H1",H2:"H3",H3:"H2",T1:"T2",T2:"T1",TH1:"TH2",TH2:"TH1",O1:"O3",O3:"O1",O2:"O4",O4:"O2",LIFESTONE:"LIFESTONE"};
var MCENTER=[52.5,42];
function bpos(b,color){
  if(color!=='yellow')return [b.x,b.y];
  var m=MIRROR[b.code];
  if(m){for(var i=0;i<BUILD.length;i++)if(BUILD[i].code===m)return [BUILD[i].x,BUILD[i].y];}
  return [Math.round((2*MCENTER[0]-b.x)*10)/10,Math.round((2*MCENTER[1]-b.y)*10)/10];
}
function renderMap(color){
 var wrap=el('wrap-'+color);var zn=ZONES[color];var strong=zn.strong;var off=zn.off;
 var youBase=(color==='blue')?LUC:YAE;var youName=(color==='blue')?'Lucia':'Yaen';
 var dv=DIVIDE[color];var h='<div class="divide" style="left:'+dv.l+'%;top:'+dv.t+'%;width:'+dv.w+'%;transform:rotate('+dv.r+'deg)"></div>';
 h+='<div class="zone" style="color:#f4a6d7;left:'+strong[0]+'%;top:'+strong[1]+'%">STRONG</div>';
 h+='<div class="zone" style="color:#8fc0f0;left:'+off[0]+'%;top:'+off[1]+'%">OFF</div>';
 h+='<div class="base" style="left:'+LUC[0]+'%;top:'+LUC[1]+'%;color:#9fe0ff">Lucia</div>';
 h+='<div class="base" style="left:'+YAE[0]+'%;top:'+YAE[1]+'%;color:#ffce7a">Yaen</div>';
 h+='<div class="you" style="left:'+youBase[0]+'%;top:'+(youBase[1]+7)+'%">YOU</div>';
 h+='<div class="life" style="left:'+LIFE[0]+'%;top:'+LIFE[1]+'%"></div>';
 BUILD.forEach(function(b){var ld=(b.code in assign)?assign[b.code]:b.leader;var sd=sideFor(b,color);var bp=bpos(b,color);
  h+='<div class="b'+(ld?'':' un')+'" style="left:'+bp[0]+'%;top:'+bp[1]+'%;border-color:'+CLR[sd]+'"><span class="code" style="color:'+CLR[sd]+'">'+b.code+'</span><select data-code="'+b.code+'">'+leaderOptions(ld)+'</select></div>';});
 wrap.innerHTML=h;
 var sels=wrap.querySelectorAll('select');for(var i=0;i<sels.length;i++){sels[i].onchange=function(e){assign[e.target.getAttribute('data-code')]=e.target.value;save();renderMap('blue');renderMap('yellow');};}
  if(typeof enforceRole==='function')enforceRole();
}
function resetPlan(){assign={};BUILD.forEach(function(b){assign[b.code]=b.leader;});save();renderMap('blue');renderMap('yellow');}
function clearAll(){assign={};BUILD.forEach(function(b){assign[b.code]='';});save();renderMap('blue');renderMap('yellow');}
