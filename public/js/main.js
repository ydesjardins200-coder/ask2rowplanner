// main.js — tabs + init (loads last)
var TABS=[["map-blue","Map · Blue"],["map-yellow","Map · Yellow"],["phases","Phases"],["life","Lifestone"],["rallies","Rallies"],["players","Players"],["staffing","Staffing"],["sides","Sides"],["members","Members"]];
var ADMINTABS={rallies:1,players:1,staffing:1,sides:1,members:1};
function buildTabs(){var t=el('tabs');TABS.forEach(function(p){var b=document.createElement('button');b.textContent=p[1];var cl=(p[0]==='map-blue')?'on':'';if(ADMINTABS[p[0]])cl=(cl?cl+' ':'')+'adminonly';if(cl)b.className=cl;b.onclick=function(){show(p[0],b);};t.appendChild(b);});}
function show(id,btn){var s=document.querySelectorAll('section');for(var i=0;i<s.length;i++)s[i].className=s[i].id===id?'on':'';var bs=el('tabs').children;for(var j=0;j<bs.length;j++)bs[j].className=(bs[j]===btn)?((''+bs[j].className).indexOf('adminonly')>=0?'on adminonly':'on'):((''+bs[j].className).indexOf('adminonly')>=0?'adminonly':'');if(id==='members'&&typeof renderMembers==='function')renderMembers();}
function myIndex(){for(var i=0;i<roster.length;i++)if(MYNAME&&roster[i].name===MYNAME)return i;return -1;}
// Members: disable plan-editing; re-enable only self-report controls on their own card.
function enforceRole(){
  var b=document.body;if(b)b.className=IS_ADMIN?'is-admin':'is-member';
  var lock='select[data-code],.glead,.pn,.pside,.psub,.rm,.addto,.pfunc,.pleg,.bchk,.bsel,.btxt,.bmck,.bfile,.save,.mrole,.gadd,.mdel,.adminonly';
  var n=document.querySelectorAll(lock);
  for(var i=0;i<n.length;i++){n[i].disabled=false;}
  if(IS_ADMIN)return;
  for(var k=0;k<n.length;k++){n[k].disabled=true;}
  var mi=myIndex();
  if(mi>=0){
    var mine=document.querySelectorAll('.pcard[data-i="'+mi+'"] .pleg, .pcard[data-i="'+mi+'"] .bchk, .pcard[data-i="'+mi+'"] .bsel, .pcard[data-i="'+mi+'"] .btxt, .pcard[data-i="'+mi+'"] .bmck, .pcard[data-i="'+mi+'"] .bfile, .pcard[data-i="'+mi+'"] .save');
    for(var j=0;j<mine.length;j++){mine[j].disabled=false;}
  }
}
function renderAll(){renderMap('blue');renderMap('yellow');renderPlayers();renderStaff();renderRallies();renderSides();renderMapInfo();renderLife();renderReady();}
function applyRole(){renderAll();enforceRole();}
// Called by the guard once the signed-in user's role/player is known.
window.setRole=function(isAdmin,myName){IS_ADMIN=!!isAdmin;MYNAME=myName||'';var rb=document.getElementById('rolebadge');if(rb){rb.textContent=IS_ADMIN?'Admin':('Member'+(MYNAME?' \u00b7 '+MYNAME:''));rb.className=IS_ADMIN?'rolebadge admin':'rolebadge member';}applyRole();};
window.linkMe=function(name){MYNAME=name||'';if(window.saveMyPlayer)window.saveMyPlayer(name);applyRole();};
initRoster();initGroups();buildTabs();renderAll();enforceRole();
(function(){var ls=el('langsel');if(ls){try{ls.value=localStorage.getItem('s2ak_lang')||'en';}catch(e){}}})();
if(window.__role&&window.setRole)window.setRole(window.__role.admin,window.__role.name);
STORE.load(function(d){if(d){try{assign=d.a||{};if(!rosterDirty&&d.r&&d.r.length)roster=d.r;if(d.g&&d.g.length)groups=d.g;renderMap('blue');renderMap('yellow');if(!rosterDirty)renderPlayers();renderStaff();renderRallies();renderSides();renderMapInfo();renderLife();renderReady();enforceRole();}catch(e){}}});
