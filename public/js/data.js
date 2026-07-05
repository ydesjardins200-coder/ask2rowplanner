// data.js — constants & shared mutable state
var IMG_W=1004,IMG_H=570;
var BUILD=[{"code": "H1", "leader": "Humble MAD", "x": 77.0, "y": 3.9, "side": "strong"}, {"code": "T1", "leader": "iiiiiiiii", "x": 62.9, "y": 6.5, "side": "strong"}, {"code": "H2", "leader": "Jalalz", "x": 53.6, "y": 20.7, "side": "strong"}, {"code": "TH1", "leader": "IONZ", "x": 84.2, "y": 41.2, "side": "strong"}, {"code": "H3", "leader": "SugarWoogy", "x": 52.1, "y": 36.3, "side": "center"}, {"code": "TH2", "leader": "Yvel", "x": 19.9, "y": 33.9, "side": "off"}, {"code": "T2", "leader": "Joker7Even", "x": 35.3, "y": 76.5, "side": "off"}, {"code": "H4", "leader": "Northwolfs", "x": 14.4, "y": 74.0, "side": "off"}, {"code": "O1", "leader": "Fraedrake", "x": 26.2, "y": 5.3, "side": "support"}, {"code": "O2", "leader": "Fraedrake", "x": 33.5, "y": 34.4, "side": "support"}, {"code": "O3", "leader": "Fraedrake", "x": 86.0, "y": 78.1, "side": "support"}, {"code": "O4", "leader": "Fraedrake", "x": 48.9, "y": 58.6, "side": "support"}, {"code": "BM", "leader": "", "x": 69.8, "y": 33.5, "side": "strong"}],LUC=[40.0, 37.0],YAE=[65.0, 47.0],LIFE=[50.0, 44.0];
// ---- Registered team (from the master "Rally Leaders & Team" chart) ----
var REG_STRONG=["Midjet Shiso","Esvipe","Ping (DEMON)","T1Faker THE GOAT","Flexie","Just Scary","SOREN","SugarWoogy","Humble Soju","Jalalz","iiiiiiiii","FaceOfBlade","Humble HVN","Ionz","Taattaat","Lastomania","Humble MAD"];
var REG_OFF=["DARK","BaBaDemouz","Chemona","Northwolfs","Erotic Sushi","krasivaya eva","WIZARD","Garius","Daenerys","Joker7even","Yvel","Ash","RomolusRemus"];
var REG_SUB=[];
var EXTRA_LEADERS=["Fraedrake","Warby"];
var FIELDS=[
 {key:"decoration",label:"Decoration",type:"select",opts:["1","2","3","4","5","6","7","8","9"]},
 {key:"svip",label:"SVIP",type:"check"},
 {key:"faction",label:"Faction",type:"select",opts:["Human","OrcWilderberg","Wood Elf"]},
 {key:"title",label:"Alliance Title",type:"select",opts:["none","Chief Warden","Spymaster","King"]},
 {key:"legendary",label:"Legendary cities",type:"select",opts:["1","2","3","4","5"]}
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
