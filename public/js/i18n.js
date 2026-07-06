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
  players_intro:"Registered team. Set side & Main/Sub, fill fields, add proof. Tap ▸ to expand a card.",
  lead_main:"Lead · Main garrison",no_legions:"no legions assigned yet",leg:"leg",legions:"legions",
  role_none:"— role —",role_backup:"Backup garrison",role_fill:"FILL",role_firsttake:"Phase 1 - FIRST TAKE",role_cavs:"CAVS",role_main:"Main garrison",
  rallies_intro:"Members come from each player’s 5 legions (Players tab); add or remove here and it updates the Players tab. Give each a role.",
  teleport:"Teleport",grouping:"Grouping",subs:"Subs",lg_1st:"1st take",lg_gar:"garrison",lg_fill:"fill",lg_cavs:"cavs",reset_plan:"Reset to plan",clear_all:"Clear all",
  col_email:"Email",col_name:"Name",col_uuid:"UUID",col_power:"Power",col_troop:"Main troop",col_approved:"Approved",col_role:"Role",col_player:"Player (team)",
  merge_dupes:"Merge duplicates",approve_to_add:"approve to add",admins_only:"Admins only.",r_member:"member",r_admin:"admin",members_intro:"Expand a row to see submitted details; approving adds them to the roster.",
  col_rally:"Rally",col_legions:"Legions",col_plan:"Plan",col_status:"Status",
  col_group:"Group",col_leader:"Leader",col_side:"Side",col_objective:"Objective",phases_intro:"Phase plan and mechanics. Leaders default to the assigned rally leader and can be overridden here (admin)."
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
  players_intro:"Effectif enregistré. Définissez le côté et Titulaire/Remplaçant, remplissez les champs, ajoutez une preuve. Touchez ▸ pour développer une fiche.",
  lead_main:"Chef · Garnison principale",no_legions:"aucune légion assignée",leg:"lég",legions:"légions",
  role_none:"— rôle —",role_backup:"Garnison de secours",role_fill:"RENFORT",role_firsttake:"Phase 1 - PREMIÈRE PRISE",role_cavs:"CAVS",role_main:"Garnison principale",
  rallies_intro:"Les membres viennent des 5 légions de chaque joueur (onglet Joueurs) ; ajoutez ou retirez ici et l’onglet Joueurs se met à jour. Donnez un rôle à chacun.",
  teleport:"Téléport",grouping:"Regroupement",subs:"Remplaçants",lg_1st:"1re prise",lg_gar:"garnison",lg_fill:"renfort",lg_cavs:"cavs",reset_plan:"Réinitialiser",clear_all:"Tout effacer",
  col_email:"Courriel",col_name:"Nom",col_uuid:"UUID",col_power:"Puissance",col_troop:"Troupe princ.",col_approved:"Approuvé",col_role:"Rôle",col_player:"Joueur (équipe)",
  merge_dupes:"Fusionner doublons",approve_to_add:"approuver pour ajouter",admins_only:"Admins seulement.",r_member:"membre",r_admin:"admin",members_intro:"Développez une ligne pour voir les détails soumis ; l’approbation l’ajoute à l’effectif.",
  col_rally:"Ralliement",col_legions:"Légions",col_plan:"Prévu",col_status:"Statut",
  col_group:"Groupe",col_leader:"Chef",col_side:"Côté",col_objective:"Objectif",phases_intro:"Plan de phases et mécaniques. Les chefs par défaut sont ceux du ralliement et peuvent être remplacés ici (admin)."
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
  players_intro:"注册名单。设置阵营与主力/替补，填写字段，添加证明。点击 ▸ 展开卡片。",
  lead_main:"队长 · 主驻防",no_legions:"尚未分配军团",leg:"团",legions:"军团",
  role_none:"— 角色 —",role_backup:"后备驻防",role_fill:"填补",role_firsttake:"阶段1 - 首占",role_cavs:"骑兵队",role_main:"主驻防",
  rallies_intro:"成员来自每位玩家的 5 支军团（玩家页）；在此添加或移除会同步更新玩家页。为每人分配角色。",
  teleport:"传送",grouping:"编组",subs:"替补",lg_1st:"首占",lg_gar:"驻防",lg_fill:"填补",lg_cavs:"骑兵",reset_plan:"重置",clear_all:"全部清除",
  col_email:"邮箱",col_name:"名称",col_uuid:"UUID",col_power:"战力",col_troop:"主兵种",col_approved:"已批准",col_role:"角色",col_player:"玩家（队伍）",
  merge_dupes:"合并重复",approve_to_add:"批准后添加",admins_only:"仅限管理员。",r_member:"成员",r_admin:"管理员",members_intro:"展开一行查看提交的详情；批准后会加入名单。",
  col_rally:"集结",col_legions:"军团",col_plan:"计划",col_status:"状态",
  col_group:"分组",col_leader:"队长",col_side:"阵营",col_objective:"目标",phases_intro:"阶段计划与机制。队长默认为对应集结的队长，可在此覆盖（管理员）。"
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
  players_intro:"Danh sách đã đăng ký. Đặt phe & Chính thức/Dự bị, điền thông tin, thêm bằng chứng. Nhấn ▸ để mở thẻ.",
  lead_main:"Chỉ huy · Đồn chính",no_legions:"chưa có quân đoàn",leg:"qđ",legions:"quân đoàn",
  role_none:"— vai trò —",role_backup:"Đồn dự bị",role_fill:"BỔ SUNG",role_firsttake:"Giai đoạn 1 - CHIẾM ĐẦU",role_cavs:"CAVS",role_main:"Đồn chính",
  rallies_intro:"Thành viên đến từ 5 quân đoàn của mỗi người chơi (tab Người chơi); thêm/bớt ở đây sẽ cập nhật tab Người chơi. Gán vai trò cho từng người.",
  teleport:"Dịch chuyển",grouping:"Nhóm",subs:"Dự bị",lg_1st:"chiếm đầu",lg_gar:"đồn",lg_fill:"bổ sung",lg_cavs:"cavs",reset_plan:"Đặt lại",clear_all:"Xóa hết",
  col_email:"Email",col_name:"Tên",col_uuid:"UUID",col_power:"Sức mạnh",col_troop:"Quân chính",col_approved:"Đã duyệt",col_role:"Vai trò",col_player:"Người chơi (đội)",
  merge_dupes:"Gộp trùng",approve_to_add:"duyệt để thêm",admins_only:"Chỉ quản trị.",r_member:"thành viên",r_admin:"quản trị",members_intro:"Mở một hàng để xem chi tiết đã gửi; duyệt sẽ thêm vào danh sách.",
  col_rally:"Tập hợp",col_legions:"Quân đoàn",col_plan:"Kế hoạch",col_status:"Trạng thái",
  col_group:"Nhóm",col_leader:"Chỉ huy",col_side:"Phe",col_objective:"Mục tiêu",phases_intro:"Kế hoạch giai đoạn và cơ chế. Chỉ huy mặc định theo tập hợp, có thể ghi đè tại đây (quản trị)."
 }
};
if(!I18N[LANG])LANG='en';
function t(k,fb){var v=I18N[LANG]&&I18N[LANG][k];if(v!=null)return v;if(fb!=null)return fb;var e=I18N.en&&I18N.en[k];return e!=null?e:k;}
function roleLabel(r){if(!r)return t('role_none');var m={'Backup garrison':'role_backup','FILL':'role_fill','Phase 1 - FIRST TAKE':'role_firsttake','CAVS':'role_cavs','Main garrison':'role_main'};return m[r]?t(m[r]):r;}
(function(){var F={
 en:{lead_short:"lead",fl_synced:"Synced \u2713",fl_saved:"Saved \u2713",fl_updated:"Updated (team)",fl_readonly:"Read-only \u2014 admins only",fl_syncfail:"Sync failed (local saved)",fl_savedlocal:"Saved (local)",fl_refreshed:"Refreshed \u2713",fl_refreshfail:"Refresh failed",fl_noconn:"No connection",fl_nothing:"Nothing to load yet",fl_uploading:"Uploading\u2026",fl_uploadfail:"Upload failed"},
 fr:{lead_short:"chef",fl_synced:"Synchronis\u00e9 \u2713",fl_saved:"Enregistr\u00e9 \u2713",fl_updated:"Mis \u00e0 jour (\u00e9quipe)",fl_readonly:"Lecture seule \u2014 admins seulement",fl_syncfail:"\u00c9chec de synchro (enregistr\u00e9 localement)",fl_savedlocal:"Enregistr\u00e9 (local)",fl_refreshed:"Actualis\u00e9 \u2713",fl_refreshfail:"\u00c9chec de l\u2019actualisation",fl_noconn:"Pas de connexion",fl_nothing:"Rien \u00e0 charger",fl_uploading:"T\u00e9l\u00e9versement\u2026",fl_uploadfail:"\u00c9chec du t\u00e9l\u00e9versement"},
 zh:{lead_short:"\u961f\u957f",fl_synced:"\u5df2\u540c\u6b65 \u2713",fl_saved:"\u5df2\u4fdd\u5b58 \u2713",fl_updated:"\u5df2\u66f4\u65b0\uff08\u56e2\u961f\uff09",fl_readonly:"\u53ea\u8bfb \u2014 \u4ec5\u7ba1\u7406\u5458",fl_syncfail:"\u540c\u6b65\u5931\u8d25\uff08\u5df2\u672c\u5730\u4fdd\u5b58\uff09",fl_savedlocal:"\u5df2\u4fdd\u5b58\uff08\u672c\u5730\uff09",fl_refreshed:"\u5df2\u5237\u65b0 \u2713",fl_refreshfail:"\u5237\u65b0\u5931\u8d25",fl_noconn:"\u65e0\u8fde\u63a5",fl_nothing:"\u6682\u65e0\u53ef\u52a0\u8f7d\u5185\u5bb9",fl_uploading:"\u4e0a\u4f20\u4e2d\u2026",fl_uploadfail:"\u4e0a\u4f20\u5931\u8d25"},
 vi:{lead_short:"ch\u1ec9 huy",fl_synced:"\u0110\u00e3 \u0111\u1ed3ng b\u1ed9 \u2713",fl_saved:"\u0110\u00e3 l\u01b0u \u2713",fl_updated:"\u0110\u00e3 c\u1eadp nh\u1eadt (nh\u00f3m)",fl_readonly:"Ch\u1ec9 \u0111\u1ecdc \u2014 ch\u1ec9 qu\u1ea3n tr\u1ecb",fl_syncfail:"\u0110\u1ed3ng b\u1ed9 th\u1ea5t b\u1ea1i (\u0111\u00e3 l\u01b0u c\u1ee5c b\u1ed9)",fl_savedlocal:"\u0110\u00e3 l\u01b0u (c\u1ee5c b\u1ed9)",fl_refreshed:"\u0110\u00e3 l\u00e0m m\u1edbi \u2713",fl_refreshfail:"L\u00e0m m\u1edbi th\u1ea5t b\u1ea1i",fl_noconn:"Kh\u00f4ng c\u00f3 k\u1ebft n\u1ed1i",fl_nothing:"Ch\u01b0a c\u00f3 g\u00ec \u0111\u1ec3 t\u1ea3i",fl_uploading:"\u0110ang t\u1ea3i l\u00ean\u2026",fl_uploadfail:"T\u1ea3i l\u00ean th\u1ea5t b\u1ea1i"}
};for(var l in F){if(I18N[l])for(var k in F[l])I18N[l][k]=F[l][k];}})();
(function(){var F={
 en:{value_ph:"value",new_player:"New player",remove_rally:"Remove from rally",col_player_short:"Player",col_fields:"Fields",col_missing:"Missing",ready_note:"fully filled \u2014 least ready first",loading_members:"Loading members\u2026",load_members_fail:"Could not load members.",total:"TOTAL",you:"YOU"},
 fr:{value_ph:"valeur",new_player:"Nouveau joueur",remove_rally:"Retirer du ralliement",col_player_short:"Joueur",col_fields:"Champs",col_missing:"Manquant",ready_note:"enti\u00e8rement rempli \u2014 moins pr\u00eats en premier",loading_members:"Chargement des membres\u2026",load_members_fail:"Impossible de charger les membres.",total:"TOTAL",you:"VOUS"},
 zh:{value_ph:"\u503c",new_player:"\u65b0\u73a9\u5bb6",remove_rally:"\u4ece\u96c6\u7ed3\u79fb\u9664",col_player_short:"\u73a9\u5bb6",col_fields:"\u5b57\u6bb5",col_missing:"\u7f3a\u5c11",ready_note:"\u5df2\u586b\u6ee1 \u2014 \u6700\u4e0d\u9f50\u5168\u7684\u5728\u524d",loading_members:"\u52a0\u8f7d\u6210\u5458\u2026",load_members_fail:"\u65e0\u6cd5\u52a0\u8f7d\u6210\u5458\u3002",total:"\u603b\u8ba1",you:"\u4f60"},
 vi:{value_ph:"gi\u00e1 tr\u1ecb",new_player:"Ng\u01b0\u1eddi ch\u01a1i m\u1edbi",remove_rally:"X\u00f3a kh\u1ecfi t\u1eadp h\u1ee3p",col_player_short:"Ng\u01b0\u1eddi ch\u01a1i",col_fields:"Tr\u01b0\u1eddng",col_missing:"Thi\u1ebfu",ready_note:"\u0111\u00e3 \u0111i\u1ec1n \u0111\u1ee7 \u2014 \u00edt s\u1eb5n s\u00e0ng nh\u1ea5t tr\u01b0\u1edbc",loading_members:"\u0110ang t\u1ea3i th\u00e0nh vi\u00ean\u2026",load_members_fail:"Kh\u00f4ng th\u1ec3 t\u1ea3i th\u00e0nh vi\u00ean.",total:"T\u1ed4NG",you:"B\u1ea0N"}
};for(var l in F){if(I18N[l])for(var k in F[l])I18N[l][k]=F[l][k];}})();
(function(){var F={
 en:{center:"Center",buff_readiness:"Buff readiness",staffing_intro:"Primary players per rally vs target (from Players tab)."},
 fr:{center:"Centre",buff_readiness:"\u00c9tat des buffs",staffing_intro:"Joueurs titulaires par ralliement vs cible (onglet Joueurs)."},
 zh:{center:"\u4e2d\u8def",buff_readiness:"\u589e\u76ca\u5b8c\u6210\u5ea6",staffing_intro:"\u5404\u96c6\u7ed3\u7684\u4e3b\u529b\u73a9\u5bb6\u4e0e\u76ee\u6807\u5bf9\u6bd4\uff08\u6765\u81ea\u73a9\u5bb6\u9875\uff09\u3002"},
 vi:{center:"Trung t\u00e2m",buff_readiness:"M\u1ee9c s\u1eb5n s\u00e0ng buff",staffing_intro:"Ng\u01b0\u1eddi ch\u01a1i ch\u00ednh th\u1ee9c m\u1ed7i t\u1eadp h\u1ee3p so v\u1edbi m\u1ee5c ti\u00eau (t\u1eeb tab Ng\u01b0\u1eddi ch\u01a1i)."}
};for(var l in F){if(I18N[l])for(var k in F[l])I18N[l][k]=F[l][k];}})();
