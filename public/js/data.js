// data.js — constants & shared mutable state
var IMG_W=954,IMG_H=996;
var BUILD=[{"code": "H1", "leader": "Humble MAD", "x": 81.6, "y": 15.6, "side": "strong"}, {"code": "T1", "leader": "iiiiiiiii", "x": 60.2, "y": 10.2, "side": "strong"}, {"code": "H2", "leader": "Jalalz", "x": 52.0, "y": 22.8, "side": "strong"}, {"code": "TH1", "leader": "IONZ", "x": 82.9, "y": 37.6, "side": "strong"}, {"code": "H3", "leader": "SugarWoogy", "x": 39.1, "y": 68.1, "side": "center"}, {"code": "TH2", "leader": "Yvel", "x": 8.2, "y": 54.2, "side": "off"}, {"code": "T2", "leader": "Joker7Even", "x": 31.4, "y": 85.4, "side": "off"}, {"code": "H4", "leader": "Northwolfs", "x": 8.8, "y": 78.5, "side": "off"}, {"code": "O1", "leader": "Fraedrake", "x": 25.1, "y": 17.3, "side": "support"}, {"code": "O2", "leader": "Fraedrake", "x": 9.9, "y": 18.9, "side": "support"}, {"code": "O3", "leader": "Fraedrake", "x": 83.1, "y": 76.3, "side": "support"}, {"code": "O4", "leader": "Fraedrake", "x": 89.3, "y": 87.0, "side": "support"}, {"code": "BM", "leader": "", "x": 70.1, "y": 78.9, "side": "strong"}, {"code": "LIFESTONE", "leader": "", "x": 45.7, "y": 46.4, "side": "center"}],LUC=[34.8, 33.4],YAE=[56.8, 65.6],LIFE=[46.0, 49.0];
// ---- Registered team (from the master "Rally Leaders & Team" chart) ----
var REG_STRONG=["Midjet Shiso","Esvipe","Ping (DEMON)","T1Faker THE GOAT","Flexie","Just Scary","SOREN","SugarWoogy","Humble Soju","Jalalz","iiiiiiiii","FaceOfBlade","Humble HVN","Ionz","Taattaat","Lastomania","Humble MAD"];
var REG_OFF=["DARK","BaBaDemouz","Chemona","Northwolfs","Erotic Sushi","krasivaya eva","WIZARD","Garius","Daenerys","Joker7even","Yvel","Ash","RomolusRemus"];
var REG_SUB=[];
var EXTRA_LEADERS=["Fraedrake","Warby"];
var FIELDS=[
 {key:"uuid",label:"UUID (player ID)",type:"text"},
 {key:"power",label:"Total power",type:"text"},
 {key:"decoration",label:"Decoration Lvl.",type:"select",opts:["1","2","3","4","5","6","7","8","9"]},
 {key:"svip",label:"SVIP",type:"check"},
 {key:"faction",label:"Faction",type:"select",opts:["Human","OrcWilderberg","Wood Elf"]},
 {key:"legendary",label:"# Of Legendary skin",type:"select",opts:["1","2","3","4","5"]},
 {key:"maxed",label:"Maxed unit type",type:"multicheck",opts:["Infantry","Mage","Cavalry","Archer"]},
 {key:"exemplar",label:"Exemplar artefact",type:"check"},
 {key:"maxpet",label:"Maxed pets",type:"proof"}
];

// ---- Rally grouping (the "grouping" the Rallies tab renders). Many-to-many. ----
var GROUPS=[
 {code:"H1", leader:"Humble MAD", side:"strong", troop:"Infantry",   members:["BoatyMcBoatFace","Flexie","SOREN","Ping (DEMON)","Midjet Shiso","Esvipe"]},
 {code:"H2", leader:"Jalalz",     side:"strong", troop:"Inf (BLINK)", members:["SOREN","Just Scary","Esvipe","Humble MAD","SugarWoogy"]},
 {code:"H3", leader:"SugarWoogy", side:"strong", troop:"Infantry",   members:["Humble Soju","Flexie","Midjet Shiso","Ping (DEMON)","Esvipe","Just Scary"]},
 {code:"TH1",leader:"Ionz",       side:"strong", troop:"Tower",       members:["Humble Shiso","iiiiiiiii","Just Scary","Esvipe","Ping (DEMON)"]},
 {code:"T1", leader:"Ionz",       side:"strong", troop:"Tower",       members:["Ping (DEMON)","Humble MAD","Esvipe","Ionz","SOREN"]},
 {code:"H4", leader:"Northwolfs", side:"off",    troop:"Cavalry",     members:["Garius","krasivaya eva","Joker7even","RomolusRemus","Yvel","WIZARD"]},
 {code:"TH2",leader:"Yvel",       side:"off",    troop:"Inf/Tower",   members:["krasivaya eva","BaBaDemouz","RomolusRemus","DARK","WIZARD","Erotic Sushi"]},
 {code:"T2", leader:"Joker7even", side:"off",    troop:"Infantry",    members:["DARK","Northwolfs","Erotic Sushi","BaBaDemouz","Garius","WIZARD"]},
 {code:"Fraedrake", leader:"Garrison", side:"support", troop:"Garrison", members:["Daenerys","FaceOfBlade","WIZARD","Chemona","Erotic Sushi"]},
 {code:"Ghost Cavalry", leader:"(mobile)", side:"support", troop:"Cavalry", members:["Daenerys","Lastomania","Ash","T1Faker THE GOAT","Chemona","Humble HVN","Taattaat","FaceOfBlade"]},
 {code:"Lifestone", leader:"Flexie/Warby", side:"lifestone", troop:"Cav+sup", members:["Flexie/Warby","Ping (DEMON)","Ionz","Yvel"]},
 {code:"Lifestone Support", leader:"", side:"lifestone", troop:"Support", members:["RomolusRemus","Humble HVN","Ash","Garius","Joker7even"]},
 {code:"Beastmaster", leader:"BeastMaster", side:"support", troop:"Behemoth", members:["BeastMaster"]}
];
var RALLY_ORDER=GROUPS.map(function(g){return g.code;});
var FUNCTIONS=["GARRISON LEAD","GARRISON FILL","GHOST CAV","FAEDRAKE","LIFESTONE","TOWERS"];
var TARGETS={};   GROUPS.forEach(function(g){TARGETS[g.code]=g.members.length;});
var TROOP={};     GROUPS.forEach(function(g){TROOP[g.code]=g.troop;});
var GSIDE={};     GROUPS.forEach(function(g){GSIDE[g.code]=g.side;});

var assign={}, roster=[], groups=[];
var IS_ADMIN=false, MYNAME='';
