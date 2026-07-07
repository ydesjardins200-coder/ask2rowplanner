// heroes.js — Call of Dragons hero catalog for garrison Commander/Deputy pairing.
// Verified against callofdragonsguides.com's full hero list (last updated 2026-01-03).
// f = faction (LO League of Order / SW Springwardens / WB Wilderburg)
// t = unit type the hero buffs (Inf/Cav/Mrk/Mag/All where All = versatile/support)
// Names are game proper nouns and are intentionally never translated.
var HEROES=[
  {n:"Nika",f:"LO",t:"Inf"},{n:"Liliya",f:"LO",t:"Mag"},{n:"Madeline",f:"LO",t:"All"},
  {n:"Theia",f:"LO",t:"All"},{n:"Theodore",f:"LO",t:"Cav"},{n:"Bertrand",f:"LO",t:"Mag"},
  {n:"Zayda",f:"LO",t:"Mrk"},{n:"Tarra",f:"LO",t:"All"},{n:"Tobin",f:"LO",t:"Cav"},
  {n:"Danfel",f:"LO",t:"Inf"},{n:"Sibyl",f:"LO",t:"Mrk"},{n:"Falgrim",f:"LO",t:"Mrk"},
  {n:"Mu Hsiang",f:"LO",t:"All"},{n:"Bahorn",f:"LO",t:"All"},{n:"Lieh Shan Yen",f:"LO",t:"Cav"},
  {n:"Ruby",f:"LO",t:"Mrk"},{n:"Joren",f:"LO",t:"Inf"},{n:"Agnar",f:"LO",t:"Cav"},
  {n:"Freya",f:"LO",t:"Cav"},{n:"Yun Ming",f:"LO",t:"Mag"},{n:"Lei Kuan",f:"LO",t:"Inf"},
  {n:"Vardun",f:"LO",t:"Mag"},{n:"Eliana",f:"LO",t:"All"},{n:"Alistair",f:"LO",t:"Cav"},
  {n:"Waldyr",f:"LO",t:"Mag"},{n:"Atheus",f:"LO",t:"Mag"},{n:"Kella",f:"LO",t:"All"},
  {n:"Garwood",f:"SW",t:"Inf"},{n:"Emrys",f:"SW",t:"Cav"},{n:"Velyn",f:"SW",t:"Mag"},
  {n:"Ffraegar",f:"SW",t:"Mrk"},{n:"Syndrion",f:"SW",t:"Mrk"},{n:"Forondil",f:"SW",t:"Cav"},
  {n:"Mogro",f:"SW",t:"Inf"},{n:"Thundelyn",f:"SW",t:"Mag"},{n:"Neya",f:"SW",t:"Cav"},
  {n:"Kaelan",f:"SW",t:"Mrk"},{n:"Ellanir",f:"SW",t:"Inf"},{n:"Seluna",f:"SW",t:"All"},
  {n:"Cantaman",f:"SW",t:"Mag"},{n:"Alwyn",f:"SW",t:"Mag"},{n:"Bakhar",f:"SW",t:"Inf"},
  {n:"Gwanwyn",f:"SW",t:"Mrk"},{n:"Naernin",f:"SW",t:"Inf"},
  {n:"Hosk",f:"WB",t:"All"},{n:"Kinnara",f:"WB",t:"Mrk"},{n:"Bakshi",f:"WB",t:"Cav"},
  {n:"Skogul",f:"WB",t:"Inf"},{n:"Goresh",f:"WB",t:"Inf"},{n:"Tohar",f:"WB",t:"Mag"},
  {n:"Maggrat",f:"WB",t:"Mrk"},{n:"Urag",f:"WB",t:"Cav"},{n:"Thaleia",f:"WB",t:"Mag"},
  {n:"Gramora",f:"WB",t:"Mag"},{n:"Kuma",f:"WB",t:"Inf"},{n:"Mardok",f:"WB",t:"Cav"},
  {n:"Kregg",f:"WB",t:"Mrk"},{n:"Pan",f:"WB",t:"All"},{n:"Ordo",f:"WB",t:"All"},
  {n:"Chakcha",f:"WB",t:"All"}
];
var HERO_FACTIONS={LO:"League of Order",SW:"Springwardens",WB:"Wilderburg"};
function heroById(id){for(var i=0;i<HEROES.length;i++)if(HEROES[i].n===id)return HEROES[i];return null;}
function heroName(id){return id||'';}
// Build a <select>'s options, grouped by faction, with the unit type shown per hero.
function heroOptions(sel){
  var esc2=(typeof esc==='function')?esc:function(x){return (''+x).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
  var o='<option value=""'+(!sel?' selected':'')+'>\u2014</option>';
  var order=['LO','SW','WB'];
  order.forEach(function(fk){
    o+='<optgroup label="'+esc2(HERO_FACTIONS[fk])+'">';
    HEROES.filter(function(h){return h.f===fk;}).sort(function(a,b){return a.n<b.n?-1:1;}).forEach(function(h){
      o+='<option value="'+esc2(h.n)+'"'+((sel||'')===h.n?' selected':'')+'>'+esc2(h.n+' ('+h.t+')')+'</option>';
    });
    o+='</optgroup>';
  });
  return o;
}
