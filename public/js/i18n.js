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
 en:{value_ph:"value",new_player:"New player",remove_rally:"Remove from rally",drag_here:"drag a name here",remove_member:"Remove completely",commander:"Commander",deputy:"Deputy",col_player_short:"Player",col_fields:"Fields",col_missing:"Missing",ready_note:"fully filled \u2014 least ready first",loading_members:"Loading members\u2026",load_members_fail:"Could not load members.",total:"TOTAL",you:"YOU"},
 fr:{value_ph:"valeur",new_player:"Nouveau joueur",remove_rally:"Retirer du ralliement",drag_here:"glisser un nom ici",remove_member:"Supprimer complètement",commander:"Commandant",deputy:"Adjoint",col_player_short:"Joueur",col_fields:"Champs",col_missing:"Manquant",ready_note:"enti\u00e8rement rempli \u2014 moins pr\u00eats en premier",loading_members:"Chargement des membres\u2026",load_members_fail:"Impossible de charger les membres.",total:"TOTAL",you:"VOUS"},
 zh:{value_ph:"\u503c",new_player:"\u65b0\u73a9\u5bb6",remove_rally:"\u4ece\u96c6\u7ed3\u79fb\u9664",drag_here:"\u62d6\u62fd\u540d\u5b57\u5230\u6b64",remove_member:"\u5f7b\u5e95\u5220\u9664",commander:"\u6307\u6325\u5b98",deputy:"\u526f\u624b",col_player_short:"\u73a9\u5bb6",col_fields:"\u5b57\u6bb5",col_missing:"\u7f3a\u5c11",ready_note:"\u5df2\u586b\u6ee1 \u2014 \u6700\u4e0d\u9f50\u5168\u7684\u5728\u524d",loading_members:"\u52a0\u8f7d\u6210\u5458\u2026",load_members_fail:"\u65e0\u6cd5\u52a0\u8f7d\u6210\u5458\u3002",total:"\u603b\u8ba1",you:"\u4f60"},
 vi:{value_ph:"gi\u00e1 tr\u1ecb",new_player:"Ng\u01b0\u1eddi ch\u01a1i m\u1edbi",remove_rally:"X\u00f3a kh\u1ecfi t\u1eadp h\u1ee3p",drag_here:"k\u00e9o t\u00ean v\u00e0o \u0111\u00e2y",remove_member:"X\u00f3a ho\u00e0n to\u00e0n",commander:"Ch\u1ec9 huy",deputy:"Ph\u00f3 t\u01b0\u1edbng",col_player_short:"Ng\u01b0\u1eddi ch\u01a1i",col_fields:"Tr\u01b0\u1eddng",col_missing:"Thi\u1ebfu",ready_note:"\u0111\u00e3 \u0111i\u1ec1n \u0111\u1ee7 \u2014 \u00edt s\u1eb5n s\u00e0ng nh\u1ea5t tr\u01b0\u1edbc",loading_members:"\u0110ang t\u1ea3i th\u00e0nh vi\u00ean\u2026",load_members_fail:"Kh\u00f4ng th\u1ec3 t\u1ea3i th\u00e0nh vi\u00ean.",total:"T\u1ed4NG",you:"B\u1ea0N"}
};for(var l in F){if(I18N[l])for(var k in F[l])I18N[l][k]=F[l][k];}})();
(function(){var F={
 en:{center:"Center",buff_readiness:"Buff readiness",staffing_intro:"Primary players per rally vs target (from Players tab)."},
 fr:{center:"Centre",buff_readiness:"\u00c9tat des buffs",staffing_intro:"Joueurs titulaires par ralliement vs cible (onglet Joueurs)."},
 zh:{center:"\u4e2d\u8def",buff_readiness:"\u589e\u76ca\u5b8c\u6210\u5ea6",staffing_intro:"\u5404\u96c6\u7ed3\u7684\u4e3b\u529b\u73a9\u5bb6\u4e0e\u76ee\u6807\u5bf9\u6bd4\uff08\u6765\u81ea\u73a9\u5bb6\u9875\uff09\u3002"},
 vi:{center:"Trung t\u00e2m",buff_readiness:"M\u1ee9c s\u1eb5n s\u00e0ng buff",staffing_intro:"Ng\u01b0\u1eddi ch\u01a1i ch\u00ednh th\u1ee9c m\u1ed7i t\u1eadp h\u1ee3p so v\u1edbi m\u1ee5c ti\u00eau (t\u1eeb tab Ng\u01b0\u1eddi ch\u01a1i)."}
};for(var l in F){if(I18N[l])for(var k in F[l])I18N[l][k]=F[l][k];}})();
(function(){var F={
 en:{opt_unassigned:"— unassigned —",auto_assigned:"Auto-assigned from their signup",
  al_no_supabase:"Screenshot proof needs the site connected to Supabase with a \"buffs\" storage bucket. Checkmarks work without it.",
  al_upload_fail:"Upload failed — make sure the \"buffs\" storage bucket exists (see setup).",
  al_five_legions:"{n} already has all 5 legions assigned. Free one on their player card first.",
  al_signin:"Sign-in not configured.",
  al_no_dupes:"No duplicate accounts found (matched by UUID, then in-game name).",
  cf_merge:"Merge duplicates: {s}\n\nThe most complete data is kept on one player and the extra account(s) are removed. This cannot be undone.",
  cf_remove:"Remove {n} completely?\n\nThis deletes their account record and erases them from the roster, all rallies, every role, and any leader/tower slot they hold. This cannot be undone.",
  cf_unsaved:"You have unsaved local changes that will be discarded. Pull the latest team plan?"},
 fr:{opt_unassigned:"— non assigné —",auto_assigned:"Assigné automatiquement depuis son inscription",
  al_no_supabase:"La preuve par capture nécessite que le site soit connecté à Supabase avec un bucket de stockage « buffs ». Les cases fonctionnent sans cela.",
  al_upload_fail:"Échec du téléversement — assurez-vous que le bucket « buffs » existe (voir la configuration).",
  al_five_legions:"{n} a déjà 5 légions assignées. Libérez-en une sur sa fiche d'abord.",
  al_signin:"Connexion non configurée.",
  al_no_dupes:"Aucun compte en double trouvé (comparé par UUID, puis par nom en jeu).",
  cf_merge:"Fusionner les doublons : {s}\n\nLes données les plus complètes sont conservées sur un joueur et les comptes en trop sont supprimés. Irréversible.",
  cf_remove:"Supprimer {n} complètement ?\n\nCeci supprime son compte et l'efface de l'effectif, de tous les ralliements, de chaque rôle et de tout poste de chef/tour. Irréversible.",
  cf_unsaved:"Vous avez des modifications locales non enregistrées qui seront perdues. Charger le dernier plan d'équipe ?"},
 zh:{opt_unassigned:"— 未分配 —",auto_assigned:"根据其注册自动分配",
  al_no_supabase:"截图证明需要网站连接 Supabase 并具有“buffs”存储桶。勾选无需此项。",
  al_upload_fail:"上传失败 — 请确保“buffs”存储桶存在（见设置）。",
  al_five_legions:"{n} 已分配满 5 支军团。请先在其玩家卡上释放一支。",
  al_signin:"未配置登录。",
  al_no_dupes:"未找到重复账户（按 UUID、然后按游戏名匹配）。",
  cf_merge:"合并重复：{s}\n\n最完整的数据会保留在一个玩家上，多余账户将被删除。此操作不可撤销。",
  cf_remove:"彻底删除 {n}？\n\n这将删除其账户记录，并从名单、所有集结、每个角色以及任何队长/塔位中抹除。此操作不可撤销。",
  cf_unsaved:"你有未保存的本地更改将被丢弃。拉取最新的团队计划？"},
 vi:{opt_unassigned:"— chưa phân —",auto_assigned:"Tự động gán từ lúc đăng ký",
  al_no_supabase:"Bằng chứng ảnh cần trang kết nối Supabase với bucket lưu trữ “buffs”. Ô tích vẫn hoạt động mà không cần nó.",
  al_upload_fail:"Tải lên thất bại — hãy chắc chắn bucket “buffs” tồn tại (xem thiết lập).",
  al_five_legions:"{n} đã được gán đủ 5 quân đoàn. Hãy giải phóng một cái trên thẻ của họ trước.",
  al_signin:"Chưa cấu hình đăng nhập.",
  al_no_dupes:"Không tìm thấy tài khoản trùng (khớp theo UUID, rồi tên trong game).",
  cf_merge:"Gộp trùng: {s}\n\nDữ liệu đầy đủ nhất được giữ lại trên một người chơi và các tài khoản thừa bị xóa. Không thể hoàn tác.",
  cf_remove:"Xóa {n} hoàn toàn?\n\nThao tác này xóa tài khoản của họ và gỡ khỏi danh sách, mọi tập hợp, mọi vai trò và mọi vị trí chỉ huy/tháp. Không thể hoàn tác.",
  cf_unsaved:"Bạn có thay đổi cục bộ chưa lưu sẽ bị bỏ. Tải kế hoạch nhóm mới nhất?"}
};for(var l in F){if(I18N[l])for(var k in F[l])I18N[l][k]=F[l][k];}})();
// ---- Phases tab: translate titles, group descriptors and objectives.
// Keyed by the English source string; proper nouns/callouts (Lifestone, Ghost
// Cavalry, Fraedrake, Beastmaster, Behemoth, CAVS, BLINK, H1-H4, O3/O4) kept as-is.
var PHASE_TX={
 fr:{
  "PHASE 1 — OPENING (0-10 min)":"PHASE 1 — OUVERTURE (0-10 min)",
  "PHASE 2 — CENTER FIGHT / LIFESTONE":"PHASE 2 — COMBAT CENTRAL / LIFESTONE",
  "PHASE 3 — LOCKDOWN":"PHASE 3 — VERROUILLAGE",
  "Lifestone Squad":"Escouade Lifestone","Strong Side Inf":"Inf. côté fort","Towers":"Tours",
  "Off Side (Cav)":"Côté faible (Cav)","Strong Side":"Côté fort","Off Side":"Côté faible",
  "PRE-POSITION on the CENTER spawn — be first on it at gates open.":"PRÉ-POSITIONNEZ-VOUS sur l'apparition CENTRALE — soyez-y en premier à l'ouverture des portes.",
  "Rush-tag central + key buildings (first occupation). Screen Lifestone.":"Marquez le centre + bâtiments clés (première occupation). Écran devant Lifestone.",
  "H2 BLINK to forward center. H1+H3 push strong-side buildings.":"H2 BLINK vers le centre avancé. H1+H3 poussent les bâtiments du côté fort.",
  "Garrison captured towers on the strong side.":"Garnison des tours capturées du côté fort.",
  "Cav sweep off-side buildings — tag & hold.":"Balayage cav des bâtiments côté faible — marquez et tenez.",
  "Anchor the flank; prep forward team for O3/O4.":"Ancrez le flanc ; préparez l'équipe avancée pour O3/O4.",
  "TOP PRIORITY: grab, escort, DELIVER to a safe building, repeat.":"PRIORITÉ ABSOLUE : ramassez, escortez, LIVREZ à un bâtiment sûr, répétez.",
  "Clear the carrier's path. Intercept enemy carriers, wipe rallies.":"Dégagez la voie du porteur. Interceptez les porteurs ennemis, effacez les ralliements.",
  "Behemoth into the DECISIVE center fight + officer skills.":"Behemoth dans le combat central DÉCISIF + compétences d'officier.",
  "Collapse on center, win the Lifestone ground.":"Convergez au centre, gagnez le terrain de la Lifestone.",
  "Hold towers, feed rallies, don't abandon for kills.":"Tenez les tours, alimentez les ralliements, n'abandonnez pas pour des kills.",
  "Press enemy underside (O3/O4), split their attention.":"Pressez le dessous ennemi (O3/O4), divisez leur attention.",
  "CAMP center, deny pickups, keep delivering.":"CAMPEZ le centre, refusez les ramassages, continuez à livrer.",
  "Roam, punish overextensions, protect carriers.":"Rôdez, punissez les surextensions, protégez les porteurs.",
  "Flex into garrison; hold every building. Rotate subs.":"Basculez en garnison ; tenez chaque bâtiment. Alternez les remplaçants.",
  "Hold off-side buildings, keep the flank shut.":"Tenez les bâtiments côté faible, gardez le flanc fermé.",
  "Lock O3/O4 and the flank.":"Verrouillez O3/O4 et le flanc."
 },
 zh:{
  "PHASE 1 — OPENING (0-10 min)":"阶段1 — 开局 (0-10 分钟)",
  "PHASE 2 — CENTER FIGHT / LIFESTONE":"阶段2 — 中路争夺 / LIFESTONE",
  "PHASE 3 — LOCKDOWN":"阶段3 — 锁定",
  "Lifestone Squad":"Lifestone 小队","Strong Side Inf":"强侧步兵","Towers":"箭塔",
  "Off Side (Cav)":"弱侧（骑兵）","Strong Side":"强侧","Off Side":"弱侧",
  "PRE-POSITION on the CENTER spawn — be first on it at gates open.":"预先站位到中路刷新点 — 开门瞬间抢先占据。",
  "Rush-tag central + key buildings (first occupation). Screen Lifestone.":"抢点中路与关键建筑（首占）。为 Lifestone 拉屏。",
  "H2 BLINK to forward center. H1+H3 push strong-side buildings.":"H2 BLINK 前压中路。H1+H3 推进强侧建筑。",
  "Garrison captured towers on the strong side.":"驻防已占领的强侧箭塔。",
  "Cav sweep off-side buildings — tag & hold.":"骑兵扫荡弱侧建筑 — 抢占并守住。",
  "Anchor the flank; prep forward team for O3/O4.":"稳住侧翼；让前压队准备 O3/O4。",
  "TOP PRIORITY: grab, escort, DELIVER to a safe building, repeat.":"最高优先：拾取、护送、送达安全建筑，循环。",
  "Clear the carrier's path. Intercept enemy carriers, wipe rallies.":"清出运送者的路径。拦截敌方运送者，清掉集结。",
  "Behemoth into the DECISIVE center fight + officer skills.":"Behemoth 投入决定性的中路战斗 + 军官技能。",
  "Collapse on center, win the Lifestone ground.":"向中路合围，拿下 Lifestone 阵地。",
  "Hold towers, feed rallies, don't abandon for kills.":"守住箭塔，支援集结，不要为击杀而放弃。",
  "Press enemy underside (O3/O4), split their attention.":"压制敌方下路（O3/O4），分散其注意力。",
  "CAMP center, deny pickups, keep delivering.":"驻扎中路，阻止拾取，持续送达。",
  "Roam, punish overextensions, protect carriers.":"游走，惩罚冒进，保护运送者。",
  "Flex into garrison; hold every building. Rotate subs.":"转入驻防；守住每座建筑。轮换替补。",
  "Hold off-side buildings, keep the flank shut.":"守住弱侧建筑，封住侧翼。",
  "Lock O3/O4 and the flank.":"锁死 O3/O4 与侧翼。"
 },
 vi:{
  "PHASE 1 — OPENING (0-10 min)":"GIAI ĐOẠN 1 — MỞ MÀN (0-10 phút)",
  "PHASE 2 — CENTER FIGHT / LIFESTONE":"GIAI ĐOẠN 2 — GIAO TRANH TRUNG TÂM / LIFESTONE",
  "PHASE 3 — LOCKDOWN":"GIAI ĐOẠN 3 — KHÓA CHẶT",
  "Lifestone Squad":"Đội Lifestone","Strong Side Inf":"Bộ binh phe mạnh","Towers":"Tháp",
  "Off Side (Cav)":"Phe yếu (Kỵ)","Strong Side":"Phe mạnh","Off Side":"Phe yếu",
  "PRE-POSITION on the CENTER spawn — be first on it at gates open.":"ĐỨNG SẴN tại điểm hồi TRUNG TÂM — chiếm đầu tiên khi mở cổng.",
  "Rush-tag central + key buildings (first occupation). Screen Lifestone.":"Chiếm nhanh trung tâm + công trình chính (chiếm đầu). Che chắn Lifestone.",
  "H2 BLINK to forward center. H1+H3 push strong-side buildings.":"H2 BLINK lên trung tâm phía trước. H1+H3 đẩy công trình phe mạnh.",
  "Garrison captured towers on the strong side.":"Đồn trú các tháp đã chiếm ở phe mạnh.",
  "Cav sweep off-side buildings — tag & hold.":"Kỵ càn quét công trình phe yếu — chiếm và giữ.",
  "Anchor the flank; prep forward team for O3/O4.":"Giữ chắc cánh; chuẩn bị đội tiền phương cho O3/O4.",
  "TOP PRIORITY: grab, escort, DELIVER to a safe building, repeat.":"ƯU TIÊN HÀNG ĐẦU: nhặt, hộ tống, GIAO đến công trình an toàn, lặp lại.",
  "Clear the carrier's path. Intercept enemy carriers, wipe rallies.":"Dọn đường cho người vận chuyển. Chặn người vận chuyển địch, quét sạch tập hợp.",
  "Behemoth into the DECISIVE center fight + officer skills.":"Behemoth vào trận trung tâm QUYẾT ĐỊNH + kỹ năng sĩ quan.",
  "Collapse on center, win the Lifestone ground.":"Dồn vào trung tâm, giành thế đất Lifestone.",
  "Hold towers, feed rallies, don't abandon for kills.":"Giữ tháp, tiếp sức tập hợp, đừng bỏ để lấy điểm hạ gục.",
  "Press enemy underside (O3/O4), split their attention.":"Ép mặt dưới của địch (O3/O4), chia sự chú ý của họ.",
  "CAMP center, deny pickups, keep delivering.":"CẮM trại trung tâm, chặn nhặt, tiếp tục giao.",
  "Roam, punish overextensions, protect carriers.":"Đi tuần, trừng phạt kẻ tràn quá, bảo vệ người vận chuyển.",
  "Flex into garrison; hold every building. Rotate subs.":"Chuyển sang đồn trú; giữ mọi công trình. Xoay tua dự bị.",
  "Hold off-side buildings, keep the flank shut.":"Giữ công trình phe yếu, khóa chặt cánh.",
  "Lock O3/O4 and the flank.":"Khóa O3/O4 và cánh."
 }
};
function tp(s){var d=PHASE_TX[LANG];return (d&&d[s])||s;}
(function(){var F={
 en:{unsaved_note:"Unsaved changes — tap Save to share with the team."},
 fr:{unsaved_note:"Modifications non enregistrées — touchez Enregistrer pour partager avec l'équipe."},
 zh:{unsaved_note:"有未保存的更改 — 点击保存以与团队共享。"},
 vi:{unsaved_note:"Có thay đổi chưa lưu — nhấn Lưu để chia sẻ với nhóm."}
};for(var l in F){if(I18N[l])for(var k in F[l])I18N[l][k]=F[l][k];}})();
