// main.js — tabs + init (loads last)
var TABS=[["map-blue","Map · Blue"],["map-yellow","Map · Yellow"],["phases","Phases"],["life","Lifestone"],["rallies","Rallies"],["players","Players"],["staffing","Staffing"],["sides","Sides"]];
function buildTabs(){var t=el('tabs');TABS.forEach(function(p){var b=document.createElement('button');b.textContent=p[1];if(p[0]==='map-blue')b.className='on';b.onclick=function(){show(p[0],b);};t.appendChild(b);});}
function show(id,btn){var s=document.querySelectorAll('section');for(var i=0;i<s.length;i++)s[i].className=s[i].id===id?'on':'';var bs=el('tabs').children;for(var j=0;j<bs.length;j++)bs[j].className=(bs[j]===btn)?'on':'';}
initRoster();buildTabs();renderMap('blue');renderMap('yellow');renderPlayers();renderStaff();renderRallies();
STORE.load(function(d){if(d){try{assign=d.a||{};if(!rosterDirty&&d.r&&d.r.length)roster=d.r;renderMap('blue');renderMap('yellow');if(!rosterDirty)renderPlayers();renderStaff();renderRallies();}catch(e){}}});
