// i18n.js — dashboard translations (loads first). t(key, fallback) resolves for current LANG.
var LANG=(function(){try{return localStorage.getItem('s2ak_lang')||(navigator.language||'en').slice(0,2);}catch(e){return 'en';}})();
var I18N={
 en:{
  tab_map_blue:"Map · Blue",tab_map_yellow:"Map · Yellow",tab_phases:"Phases",tab_lifestone:"Lifestone",tab_rallies:"Rallies",tab_players:"Players",tab_staffing:"Staffing",tab_sides:"Sides",tab_members:"Members",
  logout:"Log out",refresh:"Refresh from team",admin:"Admin",member:"Member",
  sec_strong:"Strong Side — Main",sec_off:"Off Side — Main",sec_unassigned:"Unassigned",sec_subs:"Substitutes",
  add_player:"+ Add player",which_player:"Which player are you?",pick_name:"pick your name to edit your own card",
  main_function:"Main function",assignment:"Assignment — 5 legions → rally roles",general_info:"General info",legion:"Legion",save:"Save",
  m_main:"Main",m_sub:"Sub",s_strong:"Strong",s_off:"Off",yes:"yes",proof:"proof",replace:"Replace",view_shot:"View screenshot",pick:"— pick —",
  f_uuid:"UUID (player ID)",f_power:"Total power",f_decoration:"Decoration Lvl.",f_svip:"SVIP",f_faction:"Faction",f_legendary:"# Of Legendary skin",f_maxed:"Maxed unit type",f_exemplar:"Exemplar artefact",f_maxpet:"Maxed pets",
  u_Infantry:"Infantry",u_Mage:"Mage",u_Cavalry:"Cavalry",u_Archer:"Archer",
  players_intro:"Registered team. Set side & Main/Sub, fill fields, add proof. Tap ▸ to expand a card."
 },
 fr:{
  tab_map_blue:"Carte · Bleu",tab_map_yellow:"Carte · Jaune",tab_phases:"Phases",tab_lifestone:"Pierre de vie",tab_rallies:"Ralliements",tab_players:"Joueurs",tab_staffing:"Effectifs",tab_sides:"Côtés",tab_members:"Membres",
  logout:"Déconnexion",refresh:"Actualiser (équipe)",admin:"Admin",member:"Membre",
  sec_strong:"Côté Fort — Titulaires",sec_off:"Côté Faible — Titulaires",sec_unassigned:"Non assignés",sec_subs:"Remplaçants",
  add_player:"+ Ajouter un joueur",which_player:"Quel joueur êtes-vous ?",pick_name:"choisissez votre nom pour modifier votre fiche",
  main_function:"Fonction principale",assignment:"Affectation — 5 légions → rôles de ralliement",general_info:"Infos générales",legion:"Légion",save:"Enregistrer",
  m_main:"Titulaire",m_sub:"Remplaçant",s_strong:"Fort",s_off:"Faible",yes:"oui",proof:"preuve",replace:"Remplacer",view_shot:"Voir la capture",pick:"— choisir —",
  f_uuid:"UUID (ID du joueur)",f_power:"Puissance totale",f_decoration:"Niveau de décoration",f_svip:"SVIP",f_faction:"Faction",f_legendary:"Nb de skins légendaires",f_maxed:"Type d’unité maximisé",f_exemplar:"Artéfact exemplaire",f_maxpet:"Familiers maximisés",
  u_Infantry:"Infanterie",u_Mage:"Mage",u_Cavalry:"Cavalerie",u_Archer:"Archer",
  players_intro:"Effectif enregistré. Définissez le côté et Titulaire/Remplaçant, remplissez les champs, ajoutez une preuve. Touchez ▸ pour développer une fiche."
 },
 zh:{
  tab_map_blue:"地图 · 蓝",tab_map_yellow:"地图 · 黄",tab_phases:"阶段",tab_lifestone:"生命石",tab_rallies:"集结",tab_players:"玩家",tab_staffing:"人员",tab_sides:"阵营",tab_members:"成员",
  logout:"登出",refresh:"刷新（团队）",admin:"管理员",member:"成员",
  sec_strong:"强侧 — 主力",sec_off:"弱侧 — 主力",sec_unassigned:"未分配",sec_subs:"替补",
  add_player:"+ 添加玩家",which_player:"你是哪位玩家？",pick_name:"选择你的名字以编辑自己的卡片",
  main_function:"主要职能",assignment:"分配 — 5 支军团 → 集结角色",general_info:"基本信息",legion:"军团",save:"保存",
  m_main:"主力",m_sub:"替补",s_strong:"强",s_off:"弱",yes:"是",proof:"证明",replace:"替换",view_shot:"查看截图",pick:"— 选择 —",
  f_uuid:"UUID（玩家ID）",f_power:"总战力",f_decoration:"装饰等级",f_svip:"SVIP",f_faction:"阵营",f_legendary:"传奇皮肤数量",f_maxed:"已满级兵种",f_exemplar:"典范神器",f_maxpet:"已满级宠物",
  u_Infantry:"步兵",u_Mage:"法师",u_Cavalry:"骑兵",u_Archer:"弓兵",
  players_intro:"注册名单。设置阵营与主力/替补，填写字段，添加证明。点击 ▸ 展开卡片。"
 },
 vi:{
  tab_map_blue:"Bản đồ · Xanh",tab_map_yellow:"Bản đồ · Vàng",tab_phases:"Giai đoạn",tab_lifestone:"Đá sự sống",tab_rallies:"Tập hợp",tab_players:"Người chơi",tab_staffing:"Nhân sự",tab_sides:"Phe",tab_members:"Thành viên",
  logout:"Đăng xuất",refresh:"Làm mới (nhóm)",admin:"Quản trị",member:"Thành viên",
  sec_strong:"Phe Mạnh — Chính thức",sec_off:"Phe Yếu — Chính thức",sec_unassigned:"Chưa phân",sec_subs:"Dự bị",
  add_player:"+ Thêm người chơi",which_player:"Bạn là người chơi nào?",pick_name:"chọn tên của bạn để sửa thẻ của mình",
  main_function:"Vai trò chính",assignment:"Phân công — 5 quân đoàn → vai trò tập hợp",general_info:"Thông tin chung",legion:"Quân đoàn",save:"Lưu",
  m_main:"Chính thức",m_sub:"Dự bị",s_strong:"Mạnh",s_off:"Yếu",yes:"có",proof:"bằng chứng",replace:"Thay",view_shot:"Xem ảnh",pick:"— chọn —",
  f_uuid:"UUID (ID người chơi)",f_power:"Tổng sức mạnh",f_decoration:"Cấp trang trí",f_svip:"SVIP",f_faction:"Phe",f_legendary:"Số skin huyền thoại",f_maxed:"Loại quân tối đa",f_exemplar:"Cổ vật mẫu mực",f_maxpet:"Thú cưng tối đa",
  u_Infantry:"Bộ binh",u_Mage:"Pháp sư",u_Cavalry:"Kỵ binh",u_Archer:"Cung thủ",
  players_intro:"Danh sách đã đăng ký. Đặt phe & Chính thức/Dự bị, điền thông tin, thêm bằng chứng. Nhấn ▸ để mở thẻ."
 }
};
if(!I18N[LANG])LANG='en';
function t(k,fb){var v=I18N[LANG]&&I18N[LANG][k];if(v!=null)return v;if(fb!=null)return fb;var e=I18N.en&&I18N.en[k];return e!=null?e:k;}
