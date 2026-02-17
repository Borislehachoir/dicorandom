const wrapper = document.querySelector(".wrapper"),
    searchInput = wrapper.querySelector("input"),
    infoText = wrapper.querySelector(".info-text"),
    synonyms = wrapper.querySelector(".synonyms .list"),
    removeIcon = wrapper.querySelector(".search span");

/* =========================
   DICTIONNAIRE INTERNE
========================= */
const dictionary = {
    "amaurose": { definition: "1- MÉD. (ophtalmologie). Diminution de l'acuité visuelle, sans altération oculaire apparente, 2- (sens figuré) cécité mentale", example: "Aucun mouvement de lʼœil possible, amaurose complète, pupille dilatée au maximum sans réaction lumineuse. — (Annales des maladies de lʼoreille, du larynx du nez et du pharynx: Volume 48, 1929)", etymology: "Du grec amauros, 'obscur'", synonyms: [] },
    "sans ambages": { definition: "Sans s’embarrasser de circonlocutions, c-à-d sans détours", example: "Sitôt près de la vieille dame, il résuma sans ambages la situation ; on ne gardait aucun espoir de sauver Fernande. — (Marguerite Yourcenar, 1974)", etymology: "issu du latin ambages (détour, sinuosité), issu lui-même du verbe latin ago (mouvoir, chasser, pousser)", synonyms: [] },
    "anachorete": { definition: "1-(Religion) Religieux qui se retire dans la solitude pour mener une vie de contemplation et de pénitence.,2-(Sens figuré) Personne qui mène, loin du monde et de son agitation, une vie austère et vertueuse.", example: "Un savant anachorète.", etymology: "Du grec 'anachōrētēs', 'celui qui se retire'", synonyms: [] },
    "anarthrie": { definition: "Trouble du langage caractérisé par une forme d’aphasie dans lequel le malade ne peut articuler les mots.", example: "L’anarthrie est démontrée si le patient lit et écrit comme il le faisait avant l’A.V.C. ; peut-être pas immédiatement, car il faut passer l’effet inhibiteur de la diaschisis, mais peu de temps après. — (Anny Lanteri, 1995)", etymology: "Du grec 'an-', 'sans' + 'arthrōsis', 'articulation'", synonyms: [] },
    "andain": { definition: "1- Quantité d’herbe, de foin, de blé, etc. qu’un faucheur abat à chaque coup de faux, 2- (Agriculture) Coupe de foin mise en rangée pour le pressage, ou l’enlèvement.", example: "Pour faire sécher le foin, l’herbe coupée est étendue puis retournée dans la journée avant d’être ramassée en andains le soir venu. — (Sébastien Lay,2008)", etymology: "Du vieux français 'andain', rangée", synonyms: [] },
    "chambardement": { definition: "Grand changement", example: "Simple toilettage ou grand chambardement ?", etymology: "Du français populaire 'chambarder', dérivé de 'chambre'", synonyms: [] },
    "chamoisage": { definition: "Tanner des peaux à l'huile de poisson", example: "Les deux autres pièces étaient en cuir: soit un cuir n’ayant subi que l’opération de tannage, soit un cuir ayant été en outre soumis à une opération de chamoisage. — (Yves Delaporte, 2004)", etymology: "De 'chamois', la peau du chamois utilisée pour le tannage", synonyms: [] },
    "champi": { definition: "Enfant trouvé abandonné dans les champs", example: "François le Champi, de Georges Sand.", etymology: "du mot champ, issu du latin capax (étendu, spacieux, large)", synonyms: [] },
    "chancissure": { definition: "Moisissure", example: "Un jour, il a mangé la moisissure venue sur un pot de confiture d'abricots; n'en ayant pas été incommodé, il a mangé le lendemain celle qui recouvrait une confiture de groseilles, et une autre fois la chancissure d'une orange, toujours sans éprouver aucun inconvénient. — (A. Payen, 1870)", etymology: "Du latin 'candidus', devenu 'chancir', moisir", synonyms: [] },
    "virago": { definition: "1-Femme autoritaire (insulte) 2-Femme à l'allure masculine (vieilli)", example: "L’index est sa femme, virago sèche comme une merluche, qui dès le matin soufflette sa servante dont elle est jalouse. — (Bertrand, 1842)", etymology: "Du latin 'virago', de 'vir' (homme) + suffixe '-ago'", synonyms: [] },
    "vireux": { definition: "Qui contient, ou semble contenir du poison", example: "Quel beau personnage pour ta comédie vireuse, ô fantôme errant de Ben Johnson ! — (L. Daudet, 1915)", etymology: "Du latin 'virulentus', 'venimeux'", synonyms: [] },
    "vitoulet": { definition: "Boulette de hachis de viande", example: "Dégustons avec joie ces vitoulets que Mère nous a préparés pour le diner !", etymology: "Probablement du latin vitulus (« taurillon, bouvillon »)", synonyms: [] },
    "pied-à-terre": { definition: "Logement occupé occasionnellement", example: "Et puis, la famille a toujours eu un pied-à-terre en Normandie. — (Douglas Kennedy, 2020)", etymology: "Du français 'pied à terre', littéralement 'pied sur le sol'", synonyms: [] },
    "pied-plat": { definition: "Personne grossière ou servile", example: "Ce vendeur est un pied-plat : il fait des courbettes à son supérieur, mais m'a parlé comme à un chien.", etymology: "étymologie inconnue", synonyms: [] },
    "stéphanois": { definition: "Habitant de Saint-Étienne", example: "Sylvain Levy est stéphanois.", etymology: "Du nom de ville Saint-Étienne + suffixe '-ois'", synonyms: [] },
    "stercoral": { definition: "Relatif aux excréments", example: "Le bégueulisme cafard des contemporains d’Ernest Renan l’avait rigoureusement blâmé pour l’énergie stercorale de ses anathèmes. — (Léon Bloy, 1886)", etymology: "Du latin 'stercor', 'excrément'", synonyms: [] },
    "groupe carboxyle": { definition: "Groupe fonctionnel composé d'un carbone relié à un oxygène par double liaison et à un OH par simple liaison", example: "Pas d'exemple à donner.", etymology: "Chimie", synonyms: [] },
    "ester": { definition: "Produit de l'action d'un acide carboxylique sur un alcool avec élimination d'eau", example: "Pas d'exemple à donner.", etymology: "Chimie", synonyms: [] },
    "estérification": { definition: "Réaction de formation d'un ester à partir d'un acide et d'un alcool", example: "Pas d'exemple à donner.", etymology: "Chimie", synonyms: [] },
    "stéride": { definition: "Liquide résultant de l'esterification d'un stérol par un acide gras", example: "Pas d'exemple à donner.", etymology: "Chimie", synonyms: [] },
    "luger": { definition: "Échouer à un examen ou à une élection (Suisse)", example: "J'ai lugé au baccalauréat !", etymology: "de luge, du gaulois *(s)leudia « traîneau »", synonyms: [] },
    "lunule": { definition: "Tâche blanche à la base de l'ongle", example: "Ma lunule est très visible.", etymology: "Du latin 'lunula', 'petite lune'", synonyms: [] },
    "lupanar": { definition: "Maison close", example: "Les lupanars ne sont plus chose légale en France depuis plusieurs décénnies.", etymology: "Du latin 'lupanar', 'maison de prostituées' de 'lupa', 'louve'", synonyms: [] },
    "lusophone": { definition: "Qui parle portugais", example: "Mon amie Sara est lusophone.", etymology: "Du latin 'Lusitania', Portugal antique + '-phone'", synonyms: [] },
    "zoïle": { definition: "Critique envieux, méchant et partial", example: "Dana était une zoïle impitoyable qui s'amusait à écrire des articles uniquement pour cçuler les petits commerces.", etymology: "Du grec 'Zoilos', critique grec du IVe siècle av. J.-C.", synonyms: [] },
    "lanlaire (envoyer qq se faire)": { definition: "Envoyer quelqu'un voir ailleurs", example: "Je l'envoyais se faire lanlaire, tant que j'y étais.", etymology: "étymologie inconnue", synonyms: [] },
    "lapalissade": { definition: "Affirmation d'une évidence niaise", example: "Dire que l'eau mouille est une lapalissade.", etymology: "Du nom de Jacques de La Palice (1470-1525)", synonyms: [] },
    "gabegie": { definition: "Désordre ou gaspillage dû à une mauvaise gestion", example: "Quelle gabegie d'alcool voyais-je, seul sobre dans ce navire de boit-sans-soif !", etymology: "Du provençal 'gabegie', 'magasin mal tenu'", synonyms: [] },
    "ramasser un gadin": { definition: "Tomber", example: "Fais gaffe quand tu te baisses, tu risquerais de te ramasser un un gadin.", etymology: "étymologie inconnue", synonyms: [] },
    "galapiat": { definition: "Vaurien", example: "Cet individu est un galapiat.", etymology: "Du français ancien 'galapias', 'fripon'", synonyms: [] },
    "galetas": { definition: "Réduit misérable, souvent dans les combles", example: "Misère, j'en ai marre de vivre dans ce galetas !", etymology: "Du vieux français 'galetas', 'grenier'", synonyms: [] },
    "galetteux": { definition: "Riche", example: "Mon pote Noah est un galetteux : son père possède un manoir.", etymology: "variante de galeit, du gaulois gallos « pierre, rocher »", synonyms: [] },
    "gallup": { definition: "Sondage d'opinion", example: "Dans le cadre d'une SAE, j'ai dû faire un gallup : j'ai appris que certains vivaient dans des décharges publiques. Vous m'en voyez attristé !", etymology: "Du nom de Gallup, institut américain", synonyms: [] },
    "galurin": { definition: "Chapeau", example: "Quel joli galurin vous avez là, monsieur Galurin !", etymology: " Du latin galea (« casque, huppe »).", synonyms: [] },
    "garçonnière": { definition: "Petit appartement de célibataire, baisodrome", example: "Son petit appartement sert de garçonnière à ses supérieurs.", etymology: "De 'garçon', jeune homme", synonyms: [] },
    "un garni": { definition: "Chambres meublées louées au mois ou à la semaine", example: "Puis, vers les dix heures, il s’achemina vers son garni. — (Alexandre Dumas, Les Mille et Un Fantômes)", etymology: "du verbe garnir, issu du vieux-francique *warnjan (« prendre garde, mettre en garde »)", synonyms: [] },
    "gaudriole": { definition: "1-Propos gai, plaisanterie sur quelque sujet un peu libre. 2-Relations amoureuses libertines", example: "Après le premier petit verre, le propriétaire chanta une gaudriole qui fit rougir Schaunard. — (Murger, 1848)", etymology: "du latin gaudeō (être heureux, aimer)", synonyms: [] },
    "gaupe": { definition: "Femme de mauvaise vie", example: "Ci-gît, qui pour avoir par trop aimé les gaupes,\nDescendit jeune encore au royaume des taupes. - Baudelaire", etymology: "Emprunté sans doute à l’allemand walpe, mot rare connu plus tard aux sens d'« entremetteuse » et «femme stupide »", synonyms: [] },
    "géorgique": { definition: "Qui concerne les travaux des champs, la vie rurale", example: "Le genre géorgique.", etymology: "Du grec 'geōrgikos', de 'gē', 'terre' + 'ergon', 'travail'", synonyms: [] },
    "gerbe": { definition: "Botte d'épis ou de fleurs disposés avec toutes les têtes du même côté", example: "J'assemblais mon foin en gerbes égales.", etymology: "De l’italien garbo (« forme, manière dont une chose est faite »)", synonyms: [] },
    "gerber": { definition: "Assembler en gerbes", example: "Je gerbais tout mon blé.", etymology: "De l’italien garbo (« forme, manière dont une chose est faite »)", synonyms: [] },
    "femme en gésine": { definition: "Femme sur le point d'accoucher", example: "Monique était en gésine.", etymology: "Du latin 'gestatio', 'portage, grossesse'", synonyms: [] },
    "indurer": { definition: "Rendre anormalement dur", example: "Mes muscles se sont indurés après l'effort.", etymology: "Du latin 'indurare', 'endurcir'", synonyms: [] },
    "ineffable": { definition: "Qui ne peut être exprimé", example: "Des écumes de fleurs ont bercé mes dérades\n Et d’ineffables vents m’ont ailé par instants.\n— (Arthur Rimbaud, Le Bateau ivre)", etymology: "Du latin 'ineffabilis', 'qu’on ne peut exprimer'", synonyms: [] },
    "inexpugnable": { definition: "Qu'on ne peut prendre par la force", example: " 'C'est l’inexpugnable arrogance de votre beauté qui m'asperge.' — (OSS 117 : Rio ne répond plus, 2009)", etymology: "Du latin 'inexpugnabilis', 'imprenable'", synonyms: [] },
    "in extenso": { definition: "Tout au long, en entier", example: "'À moins que vous ne vouliez que je ne le fasse copier in extenso et ne vous en adresse la copie.' — (Ferdinand W. Esterhazy, 1894)'", etymology: "Du latin 'in extenso', 'en longueur'", synonyms: [] },
    "infatuation": { definition: "Satisfaction excessive et ridicule de sa personne", example: "'Cette double infatuation, si assurée de sa victoire, si bien dessinée sur un fond de misère commune, c’était plus que je n’en pouvais supporter.' — (Alain, 1937)", etymology: "Du latin 'infatuatio', 'engourdissement'", synonyms: [] },
    "infirmer": { definition: "Remettre en question, détruire l'autorité de", example: "La Cour d’appel infirma le jugement du tribunal de première instance.", etymology: "Du latin 'infirmare', 'affaiblir'", synonyms: [] },
    "inique": { definition: "Injuste", example: "Il s’est montré inique envers cet innocent.", etymology: "Du latin 'iniquus', 'inégal, injuste'", synonyms: [] },
    "in petto": { definition: "À part soi", example: "'In petto, je tiquai.' — (Léo Malet, 1955)", etymology: "Du latin 'in petto', 'dans la poitrine, secrètement'", synonyms: [] },
    "insane": { definition: "(Anglicisme) Fou, insensé.", example: "'Autour d’elle, 200 000 kilomètres carrés sont devenus un désert où tourbillonnaient les orages de sel et de poussières, à la suite d’un insane projet soviétique de diversion des fleuves qui s’y jetaient […].' — (Laurent Murawiec, 2002)", etymology: "De l'anglais 'insane', du latin 'insanus', 'fou'", synonyms: [] },
    "intelligentsia": { definition: "Groupe d’intellectuels russes du XIXe siècle connus pour leurs aspirations révolutionnaires.", example: "'Nous n'oserions pas affirmer avec Karl Mannheim que désormais ce n'est plus le prolétariat mais l'intelligentsia qui est le moteur de l'histoire.' -(Dumazedier, Ripert, 1966):", etymology: "Du russe 'intelligentsiya', du latin 'intelligere', 'comprendre'", synonyms: [] },
    "intercéder": { definition: "Plaider pour quelqu'un", example: "exemple", etymology: "Du latin 'intercedere', 'intervenir'", synonyms: [] },
    "interlope": { definition: "Illégal", example: "exemple", etymology: "Du néerlandais 'interloper', 'intrus'", synonyms: [] },
    "intromission": { definition: "1- introduction 2- relation sexuelle", example: "exemple", etymology: "Du latin 'intromissio', 'action d'introduire'", synonyms: [] },
    "intumescent": { definition: "Qui commence à gonfler", example: "exemple", etymology: "Du latin 'intumescentem', 'qui enfle'", synonyms: [] },
    "invétéré": { definition: "Se fortifie par le temps", example: "exemple", etymology: "Du latin 'inveteratus', 'ancien, enraciné'", synonyms: [] },
    "ipso facto": { definition: "Par une conséquence obligée", example: "exemple", etymology: "Du latin 'ipso facto', 'par le fait même'", synonyms: [] },
    "irréfragable": { definition: "Qu'on ne peut contredire", example: "exemple", etymology: "Du latin 'irrefutabilis', 'que l’on ne peut réfuter'", synonyms: [] },
    "dalot": { definition: "Petit canal dallé sous une route", example: "La route passe au-dessus d'un dalot du XVème siècle.", etymology: "Du français ancien 'dalot', 'canal couvert'", synonyms: [] },
    "daubeur": { definition: "Assistant du forgeron", example: "- Daubeur, passe-moi donc les pinces ! ", etymology: " du mot daube, issu du germanique dubban (« frapper »)", synonyms: [] },
    "débagouler": { definition: "Proférer un flot de paroles ou d'injures", example: "Le professeur débagoula son cours avec lassitude.", etymology: "Composé de goule,et de ba, déformation du verbe béer, issu du latin pateō, 's'étendre largement, être ouvert'", synonyms: [] },
    "débiner": { definition: "1- dénigrer 2- s'enfuir", example: "Le patron débine les efforts de son employé.", etymology: "étymologie inconnue", synonyms: [] },
    "une gaule": { definition: "Longue perche ou canne à pêche", example: "Attends, je me saisis de ma gaule, on va à la rivière juste après !", etymology: "Apparenté au breton 'gwalenn' (perche).", synonyms: [] },
    "démêlures": { definition: "Cheveux qui tombent quand on se peigne", example: "Le sol, à ses pieds, se couvrit de démêlures.", etymology: "issu du verbe mêler précédé du privatif dé, verbe issu du latin misceo (mélanger)", synonyms: [] },
    "percolation": { definition: "Infiltration lente des eaux de pluie dans le sol", example: " La percolation est un phénomène naturel important.", etymology: "Du latin 'percolare', 'faire passer à travers'", synonyms: [] },
    "péremptoire": { definition: "À quoi l'on ne peut rien répliquer", example: "'Les plaques et le sol, ça se croise pas, c'est parallèle. Si vous voulez du perpendiculaire, vous avez le sol et les tréteaux, par exemple. Et si je vous dis que vous êtes deux glands, là vous avez du péremptoire.' — Alexandre Astier, Kaamelott, 2005", etymology: "Du latin 'peremptorius', 'qui décide, décisif'", synonyms: [] },
    "mousmé": { definition: "Jeune fille, femme", example: "Quelle sublime mousmé !", etymology: "Du japonais 'musume', 'fille'", synonyms: [] },
    "moutard": { definition: "Enfant", example: "Le brave moutard travaillait dans la ferme.", etymology: "Peut-être dérivé du franco-provençal et franc-comtois mottet (« petit garçon, jeune homme »)", synonyms: [] },
    "moutier": { definition: "Monastère", example: "Noirmoutier : le monastère noir.", etymology: "Du latin 'monasterium'", synonyms: [] },
    "musard": { definition: "Qui perd son temps à des riens", example: "Va donc, musard, au devant de tes aventures !", etymology: "Du français ancien 'musard', 'flâneur'", synonyms: [] },
    "musser": { definition: "Cacher", example: "Je musse mon chapeau dans mon dos.", etymology: "Du gaulois *muk- (« cacher ») ", synonyms: [] },
    "pochade": { definition: "Œuvre littéraire rapide et sans prétention", example: "Ce livre est une pochade.", etymology: "Du français 'pochade', dérivé de 'poche'", synonyms: [] },
    "pochetée": { definition: "Niaise, stupide", example: "C'est une pochetée !", etymology: "évolution du mot poche, issu de l’ancien bas vieux-francique *pokka (« bourse, sac en papier, casquette »)", synonyms: [] },
    "poissarde": { definition: "Femme grossière, marchande de la halle au langage cru", example: "Quelle poissarde, cette bonne femme !", etymology: "De 'poisson', car marchande de poisson", synonyms: [] },
    "s'ébaudir": { definition: "S'amuser", example: "La jeunesse s'ébaudit tandis que les adultes pleurent.", etymology: "Du français ancien 'baudir', 'jouir, s'amuser'", synonyms: [] },
    "ébaubi": { definition: "Surpris", example: "J'en suis tout ébaubi !", etymology: "De l'ancien français 'abaubir', 'étonner'", synonyms: [] },
    "ébroïcien": { definition: "Habitant d'Évreux", example: "Cet Ebroïcien de 29 ans a ouvert son coffe shop éco-solidaire en mars 2022.", etymology: "Du nom de ville Évreux + suffixe '-ien'", synonyms: [] },
    "éburnéen": { definition: "Blanc comme l'ivoire", example: "Des dents d'un blanc éburnéen.", etymology: "Du latin 'eburneus', 'fait d'ivoire'", synonyms: [] },
    "écacher": { definition: "Écraser, aplatir par pression ou coup", example: "J'écache la canette sous mon pied.", etymology: "de l'ancien français escachier (écraser), du latin coactere (contraindre).", synonyms: [] },
    "reptation": { definition: "Action de ramper", example: "Le serpent effectue une reptation.", etymology: "Du latin 'reptatio', 'action de ramper'", synonyms: [] },
    "resquiller": { definition: "Se procurer un avantage par petite fraude", example: "Pour toucher les APL, Fabien n'a pas hésité à resquiller.", etymology: "Du français 'resquiller', de 'resquille', 'infraction'", synonyms: [] },
    "resucée": { definition: "Chose déjà faite, vue, entendue ou goûtée plusieurs fois", example: "Le racisme, de nos jours, n'est qu'une pitoyable resucée.", etymology: "Du latin 'resucare', 'faire revivre'", synonyms: [] },
    "rétif": { definition: "1- qui s'arrête ou recule au lieu d'avancer 2- récalcitrant", example: "Mon âne se montrait tout particulièrement rétif aujourd'hui.", etymology: "Du latin 'retifus', 'qui recule'", synonyms: [] },
    "rétrogression": { definition: "Mouvement en arrière", example: "J'effectue une rétrogression.", etymology: "Du latin 'retrogressio', 'action de reculer'", synonyms: [] },
    "météoriser": { definition: "Gonfler par accumulation de gaz dans l'abdomen", example: "Certains fourrages mangés trop verts météorisent les bestiaux.", etymology: "Du grec 'meteoron', 'élévation'", synonyms: [] },
    "minutaire": { definition: "Qui a le caractère d'un original", example: "Cette femme est particulièrement minutaire.", etymology: "Du latin 'minutarius', 'petit détail'", synonyms: [] },
    "mirliflore": { definition: "Jeune élégant qui se la pète", example: "'Fritz était là, devant la glace, vêtu comme un mirliflore.' — Erckmann-Chatrian, 1864", etymology: "Etymologie trop compliquée à rédiger.", synonyms: [] },
    "miraud": { definition: "Myopie", example: "'— Lisez ; dans le noir, je suis complètement miraude.' — Antoine Blondin,  1970", etymology: "Du verbe mirer (synonyme de voir), issu du latin mirus, ('surprenant')", synonyms: [] },
    "misonéisme": { definition: "Aversion pour tout ce qui est nouveau", example: "Ces enfants trouvent que leurs grands-parents font preuve de misonéisme.", etymology: "Du grec 'misos', 'haine' + 'neos', 'nouveau'", synonyms: [] },
    "hypocoristique": { definition: "Mot exprimant une intention affectueuse", example: " 'Bébou' est un terme hypocoristique.", etymology: "Du grec 'hypokoristikos', 'qui exprime de la tendresse'", synonyms: [] },
    "iconoclaste": { definition: "Cherche à détruire tout ce qui appartient au passé ou à la tradition", example: "Toutes les nations héroïques, Perses, Romains, Germains […], furent longtemps iconoclastes. — Michelet", etymology: "Du grec 'eikonoklastes', 'briseur d’images'", synonyms: [] },
    "idiotisme": { definition: "Expression particulière à une langue qu'on ne peut traduire littéralement", example: "Le verbe 'bifler' est un idiotisme : il n'existe qu'en français, et n'a aucun analogue de par le monde.", etymology: "Du grec 'idiotismos', 'particularité'", synonyms: [] },
    "ikebana": { definition: "Art de la composition florale japonais", example: "Monsieur Torikawa nous a initié hier soir à l'art de l'ikebana.", etymology: "Du japonais 'ikebana', 'composition florale vivante'", synonyms: [] },
    "imarcescible": { definition: "Qui ne peut se flétrir", example: "L'orchidée est une fleur imarcescible, tout comme l'immortelle.", etymology: "Du latin 'imarcescibilis', 'qui ne se fane pas'", synonyms: [] },
    "impétrer": { definition: "Obtenir par une requête ou une supplique", example: "Et me fut dit que le sire de la Trémoille étoit envoyé de par le duc et les seigneurs au roi, à Paris, pour savoir son plaisir, et pour impétrer que on les pût combattre. — (Les Chroniques de Sire Jean Froissart , A. Derez, 1835)", etymology: "Du latin 'impetrare', 'obtenir par prière'", synonyms: [] },
    "imprécation": { definition: "Malédiction proférée contre quelqu'un", example: "Il lança une imprécation contre la mouette qui venait de lui déféquer dessus.", etymology: "Du latin 'imprecatio', 'invocation contre quelqu’un'", synonyms: [] },
    "improbité": { definition: "Manque d'honnêteté", example: "'Cette déconfiture était due à des folles spéculations, aux fautes et même à l'improbité de ses dirigeants.' — Léon Berman, 1937 ", etymology: "Du latin 'improbitas', 'mauvaise conduite'", synonyms: [] },
    "imputer": { definition: "Attribuer à quelqu'un la responsabilité de", example: "Quant à mon alcoolisme, j'en impute toute la responsabilité à mon ami Thomas.", etymology: "Du latin 'imputare', 'attribuer'", synonyms: [] },
    "incarnat": { definition: "D'un rouge clair et vif", example: "'Elle voulait ne pas paraître embarrassée ; mais elle sentait que le plus vif incarnat colorait ses joues.' — Madame de Genlis", etymology: "Du latin 'incarnatus', 'de chair, rougeâtre'", synonyms: [] },
    "obvier": { definition: "Remédier à, prendre des précautions contre un évènement fâcheux.", example: "'Vraisemblablement pour obvier à cette absence de prénom, il avait, au cours de son existence aventureuse, travaillé sous le nom de Courtois et Malbec.' — Leo Malet, 1955", etymology: "Du latin 'obviare', 'empêcher, faire obstacle'", synonyms: [] },
    "œillade": { definition: "Coup d'œil furtif pour marquer tendresse ou connivence", example: "Maria lança de tendres oeillades vers son copain Bruce, tandis que celui-ci s'éloignait pour prendre le ferry.", etymology: "De 'œil', avec suffixe diminutif '-ade'", synonyms: [] },
    "oligophrénie": { definition: "Insuffisance mentale globale", example: "Ce type est totalement oligophrène !", etymology: "Du grec 'oligos', 'peu' + 'phrén', 'esprit'", synonyms: [] },
    "onanisme": { definition: "Se masturber", example: "'Le lendemain matin, Adams et moi prenons notre petit-déjeuner dans les cuisines quand nous assistons à une séance d’onanisme.' — David McNeil, 2012", etymology: "Du nom biblique 'Onan'", synonyms: [] },
    "un oreillon": { definition: "Moitié d'abricot dénoyauté en conserve", example: "Tiens, mange donc cet oreillon bien mûr et sucré à souhait !", etymology: "De 'oreille', petite forme", synonyms: [] },
    "pousser des cris d'orfraie": { definition: "Pousser des cris très aigus", example: "Quelqu'un poussait des cris d'orfraie.", etymology: "du latin ossifragus, 'briseur d'os'", synonyms: [] },
    "ornière": { definition: "Trace creusée par les roues dans le sol", example: "Les ornières de cette route de campagne étaient si profondes qu'on aurait pu y cacher une giraffe.", etymology: "Du latin 'urna', 'fossé'", synonyms: [] },
    "ouche": { definition: "Terrain voisin d'une maison planté d'arbres fruitiers", example: "'On la trouverait bien plus facilement , […], à l’état de débris de cercueils dans l’ouche du presbytère et dans les propriétés adjacentes de particuliers.' — Abbé Guignot, 1895", etymology: "Du latin 'aucea', 'terre cultivée'", synonyms: [] },
    "faire florès": { definition: "Faire un carton", example: "Marius fait florès avec sa nouvelle chemisette !", etymology: "Du latin 'florere', 'fleurir'", synonyms: [] },
    "blettissure": { definition: "Excès de maturité qui rend un fruit trop mûr", example: "Toutes mes vignes étaient meurtores de bletissures.", etymology: "Du français 'blettir', 'maturer au point de ramollir'", synonyms: [] },
    "cacher qqn/qqch sous le boisseau": { definition: "Mentir, dissimuler", example: "Il cache un éléphant sous un boisseau.", etymology: "De 'boisseau', ancienne mesure de grains", synonyms: [] },
    "boit-sans-soif": { definition: "Personne qui boit beaucoup d'alcool", example: "Quel boit-sans-soif, ce Léo !", etymology: "Expression française ancienne", synonyms: [] },
    "bombance": { definition: "Repas copieux", example: "Ce soir de Noël, nous aurons le droit à une excellente bombance.", etymology: "Du latin 'bumbare', 'manger avec bruit'", synonyms: [] },
    "faire bombance": { definition: "S'éclater la panse", example: "Christian aime faire bombance.", etymology: "Du verbe 'bombancer'", synonyms: [] },
    "bonace": { definition: "Calme plat (maritime)", example: "Bon sang, six jours en mer, et il se maintient une de ces bonaces !", etymology: "Du latin 'bonacia', 'calme'", synonyms: [] },
    "bonasse": { definition: "Bon par faiblesse", example: "Il est bonasse ce garçon !", etymology: "Du français ancien 'bon', suffixe '-asse' (péjoratif)", synonyms: [] },
    "bornoyer": { definition: "Viser d'un œil en fermant l'autre", example: "J'armais mon fusil, bornoyais et tirais. Je fis mouche.", etymology: "Du français 'œil borgne'", synonyms: [] },
    "bosco": { definition: "Maître de manœuvre", example: "Quasimodo n'était pas bosco. Il y avait bien un Henri Bosco.", etymology: "Du latin 'boscus', 'forêt', sens naval incertain", synonyms: [] },
    "boscot": { definition: "Bossu", example: "Quasimodo était boscot. Il n'y a pas d'Henri Boscot", etymology: "de l'occitan 'bossa' (bosse)", synonyms: [] },
    "boubouler": { definition: "Cri du hibou", example: "Le hibou bouboule.", etymology: "Onomatopée", synonyms: [] },
    "boucholeur": { definition: "Éleveur de moules sur bouchots", example: "Fanch, boucholeur comme son père, et son père avant lui.", etymology: "De 'bouchot', 'pieuvre de pieux'", synonyms: [] },
    "se bouffer le nez": { definition: "Se disputer", example: "Robin et Titouan se boufferaient presque le nez.", etymology: "Expression populaire française", synonyms: [] },
    "margaille": { definition: "1- rixe 2- désordre", example: "C'est la margaille dans le supermarché Auchan de cette petite ville du Gers : 50000 euros de dégâts au rayon viandes !", etymology: "du wallon margaille, origine incertaine", synonyms: [] },
    "margelle": { definition: "Bord d'un puits ou d'une fontaine", example: "Sur la margelle du puits, Petit Pierre jouait aux échecs avec son oncle.", etymology: "du bas latin margella ('marge, bord')", synonyms: [] },
    "margoulette": { definition: "La tronche", example: "La margoulette de cette jeune femme est sublime.", etymology: "Du gaulois marga (boue) et d'une forme occitane de 'gueule'.", synonyms: [] },
    "marmotter": { definition: "Murmurer entre les dents", example: "'Les autres femmes ne pensaient plus à marmotter leurs prières.' — George Sand, 1844", etymology: "Du français 'marmot', 'enfant ou bavard'", synonyms: [] },
    "marner": { definition: "1- incorporer de la marne dans le sol 2- travailler très dur", example: "'Ces salades puantes c'était pour que je bosse à l'œil!... Il dépréciait mon boulot pour me faire marner gratuitement' - Céline,1936", etymology: "De 'marne', terre argileuse", synonyms: [] },
    "marri": { definition: "Fâché, attristé, contrarié", example: "'Le Gros, marri (et mari cocu de surcroît), écluse du gros rouge par larges gorgées silencieuses...' — Frédéric Dard, 1968", etymology: "Du vieux français 'marri', 'affligé'", synonyms: [] },
    "lambiner": { definition: "Agir avec lenteur, sans énergie ni vivacité", example: "-Tu fais quoi ? -Je lambine.", etymology: "Peut-être[2] une antonomase de Denis Lambin (1516-1572), philologue et grammairien français extrêmement appliqué et soigneux, ce qui lui a valu d’être synonyme de lenteur.", synonyms: [] },
    "prolixe": { definition: "Diffus, trop long, bavard", example: "Jules parle très peu. Mais abordez l'astronomie, et il se révélera sacrément prolixe !", etymology: "Du latin 'prolixus', 'étendu, long'", synonyms: [] },
    "pronunciamiento": { definition: "Coup d'état militaire", example: "'Jamais un pronunciamiento n’a déclenché de guerre civile. Jusqu’en 1936 : et ce sera un grand changement' - Pierre Vilar, 2009", etymology: "De l'espagnol 'pronunciamiento', 'déclaration publique'", synonyms: [] },
    "propitiation": { definition: "Action qui rend la divinité clémente", example: "Le sacrifice de la messe est un sacrifice de propitiation.", etymology: "Du latin 'propitiatio', 'apaisement'", synonyms: [] },
    "propre-à-rien": { definition: "Inutile, incapable", example: "Timothé est un propre-à-rien. Il passe des journées à jouer à LOL.", etymology: "Expression française, littéralement 'bon à rien'", synonyms: [] },
    "prosaïque": { definition: "Qui manque de noblesse, banal, commun", example: "Je n'ai rarement vu quelqu'un d'aussi prosaïque.", etymology: "Du latin 'prosaicus', 'relatif à la prose'", synonyms: [] },
    "prurigineux": { definition: "Qui provoque des démangeaisons", example: "Cette dartre est terriblement prurigineuse.", etymology: "Du latin 'pruriginosus', 'qui démange'", synonyms: [] },
    "salmigondis": { definition: "Mélange confus et disparate", example: "Ma soeur, en désignant un salmigondis d'épices et de viandes, m'a dit qu'elle avait fait un poulet tikka massala.", etymology: "Du français 'salmigondis', probablement de l'italien 'salmicondis'", synonyms: [] },
    "sanderling": { definition: "Une sous-espèce de bécasseau", example: "Le sanderling se prélassait au bord de la rivière.", etymology: "Du néerlandais 'sanderling', diminutif de 'sand', 'sable'", synonyms: [] },
    "saphisme": { definition: "Homosexualité féminine", example: "Ce défilé a proposé une véritable ode au saphisme !", etymology: "De Sappho, poétesse grecque", synonyms: [] },
    "sarcler": { definition: "Débarrasser un terrain des mauvaises herbes", example: "Il faut sarcler les ivraies.", etymology: "Du latin 'sarculare', 'sarcler avec une houe'", synonyms: [] },
    "sarclure": { definition: "Herbes arrachées", example: "Angeline ramassa les sarclures.", etymology: "De 'sarcler'", synonyms: [] },
    "saros": { definition: "Période de 223 lunaisons pour prévoir les éclipses", example: "'Les Chaldéens avaient une autre période qu’ils appelaient sare ou saros. C’était une révolution de 3 600 ans.'- Pierre Leroux, 1840", etymology: "Du grec ancien 'saros', période astronomique", synonyms: [] },
    "satori": { definition: "Éveil recherché dans la méditation zen", example: "exemple", etymology: "Du japonais 'satori', 'éveil'", synonyms: [] },
    "intactile": { definition: "Inverse tactile", example: "Ma soeur est intactile (sauf avec son copain).", etymology: "tactile mais avec le préfixe privatif in-", synonyms: [] },
    "intangible": { definition: "Qui doit rester intact, sacré, inviolable", example: "Dieu est intangible.", etymology: "Du latin 'intangibilis', 'qu’on ne peut toucher'", synonyms: [] },
    "intempérance": { definition: "1- manque de retenue 2- boulimie/trop boire", example: "Mon ami Mathéo est la personnification de l'intempérance : s'il boit un verre, il descend la bouteille !", etymology: "Du latin 'intemperantia', 'manque de modération'", synonyms: [] },
    "septentrion": { definition: "Vient des septentriones, les 7 étoiles de la Grande Ourse. Synonyme de 'nord'.", example: "Au septentrion de la France se trouve Lille, Dunkerque et le Nord-Pas-de-Calais.", etymology: "Du latin 'septentriones', 'sept bœufs' (constellation de la Grande Ourse)", synonyms: [] },
    "séraphique": { definition: "Digne des anges", example: "Ma grand-mère est séraphique.", etymology: "Du latin 'seraphicus', du séraphin biblique", synonyms: [] },
    "fruitière": { definition: "Petite coopérative de producteurs de lait", example: "Marcel et Jacques sont pas contents du Mercosur : déjà qu'on leur tue leurs vaches, maintenant on veut leur fermer leur fruitière !", etymology: "Du français 'fruitier', 'lieu de production'", synonyms: [] },
    "fuie": { definition: "Petit colombier", example: "J'ai construit une fuie pour mes colombes.", etymology: "Du latin 'fugia', 'abri pour oiseaux'", synonyms: [] },
    "fulguration": { definition: "1- éclair sans tonnerre 2- accident mortel dû à la foudre", example: "Ce pauvre Roger est mort de fulguration.", etymology: "Du latin 'fulguratio', 'éclair'", synonyms: [] },
    "fulgurer": { definition: "Briller d'un vif éclat", example: "Je traversais la place Saint-Sulpice quand, abruptement, cette lointaine prophétie fulgura dans le soir mouillé. - Simone de Beauvoir, 1958", etymology: "Du latin 'fulgurare', 'éclairer'", synonyms: [] },
    "fumerie": { definition: "Lieu où l'on fume l'opium", example: "Solal m'a invité dans sa fumerie improvisée.", etymology: "De 'fumer', du latin 'fumare'", synonyms: [] },
    "funérarium": { definition: "Synonyme : athanée", example: "On rend visite dans un funérarium.", etymology: "Du latin 'funus', 'funérailles'", synonyms: [] },
    "sabouler": { definition: "Malmener, bousculer", example: "Je déteste Jérôme : il m'a saboulé comme un malpropre !", etymology: "De saboter (issu du provençal sabotar, ('agiter') et boule (du latin 'bulla', 'boule')", synonyms: [] },
    "saint-frusquin": { definition: "Ensemble d'affaires personnelles sans grande valeur", example: "Il a tout emporté, le saint-frusquin compris.", etymology: "Étymologie inconnue", synonyms: [] },
    "foultitude": { definition: "Grand nombre", example: "Une foultitude de Barbares prirent d'assaut la forteresse.", etymology: "De l'anglais 'foul', grand nombre", synonyms: [] },
    "fourbi": { definition: "Synonyme de truc, bidule", example: "Allez, range-moi donc ce fourbi.", etymology: "Du français 'furbir', 'préparer, arranger'", synonyms: [] },
    "fourbir": { definition: "Nettoyer, rendre brillant en frottant", example: "Je fourbissais ma vieille poêle.", etymology: "Du français ancien 'furbir', 'préparer, astiquer'", synonyms: [] },
    "fourchon": { definition: "Dent d'une fourche ou fourchette", example: "Vois comme ce fourchon est tordu.", etymology: "Du français 'fourche', suffixe '-on'", synonyms: [] },
    "foutral": { definition: "Extraordinaire (terme familier)", example: "Dame, c'est foutral !", etymology: "De l'occitan rouergat, 'foutral', qui signifie « fantasque », « bizarre », « drôle », « capricieux »", synonyms: [] },
    "clayère": { definition: "parc à huîtres", example: "Monsieur Le Brun a plusieurs clayères en Bretagne.", etymology: "", synonyms: [] },
    "clayette": { definition: "étagère amovible à claire-voie ", example: "Dans mon réfrigérateur, j'ai quatre clayettes.", etymology: "", synonyms: [] },
    "claie": { definition: " Panier fait de brins d’osier, plat, long et large, selon l’usage que l’on en fait.", example: "Ma mamie a fabriqué une claie.", etymology: "emprunté au gaulois  *clēta", synonyms: [] },
    "claire": { definition: "Bassin peu profond dans lequel on affine les huîtres. Une huître dite 'fine de claire' n'y aura séjourné que quelques semaines, à l'opposée d'une huître dite 'spéciale'.", example: "Les huîtres sont élevées dans une claire.", etymology: "du radical indoeuropéen  *kel('appeler'), qui a ensuite donné le latin clarus ('clair'). Ce mot était d'abord utilisé pour désigner une voix. D'où le radical.", synonyms: [] },
    "claire-voie": { definition: "Ouvrage dont l'assemblage n'est pas serré, n'est pas continu, qui laisse passer la lumière.", example: "Les claires-voies d'une hotte.", etymology: "constitué de clarus et de via. Traduction littérale : les chemins clairs, donc qui reçoivent une quantité conséquente de lumière. D'où l'association claire-voie.  ", synonyms: [] },
    "chrématistique": { definition: "(Economie) Qui se rapporte à la production de richesses.", example: "Les exportations sont étudiées sous l'angle chrématistique.", etymology: " du grec ancien 'khrêmatistikos' qui vient du nom 'khrêmatistês' (négociant), du verbe 'khrêmatizo'(négocier) qui vient lui-même du nom 'khrêma' (affaire), issu du verbe 'khrao' (infliger, utiliser) ", synonyms: [] },
    "chrestomathie": { definition: "Anthologie de textes d'auteurs accessibles rassemblés dans un but pédagogique.", example: "Une chrestomathie de l'histoire contemporaine de l'Iran.", etymology: " du grec ancien 'khrêstomátheia' (étude des choses utiles), qui vient du nom 'khrêstomathês' (adepte du savoir), composé de 'khrēstós' (bon, heureux, brave) et manthánô (apprendre) qui est issu de l’indo-européen '*mendh-' (faire attention)", synonyms: [] },
    "chromatopsie": { definition: " (Biologie) Vision des couleurs", example: "La chromatopsie de l'homme est impressionante : il peut voir en moyenne jusqu'à plus d'un million de couleurs différentes.", etymology: " du grec ancien 'khrômo' (couleur), et 'opsis' (vue) qui provient de l’indo-européen '*ver' (observer)", synonyms: [] },
    "chryséléphantin,e": { definition: "Qui est fait d’or et d’ivoire.", example: "Cette statue chryséléphantine m'éblouit par sa splendeur.", etymology: "du grec ancien 'khruselephantinos' (fait d'or et d'ivoire), issu du nom 'khrusós' (or) qui provient lui-même de l'hébreu 'חָרוּץ' (ḥārūṣ, 'or'), et de l'adjectif 'elephántinos' (qui est fait d'ivoire), qui provient pour sa part du nom 'eléphas' (éléphant) ", synonyms: [] },
    "badiste": { definition: "Joueur de badminton", example: "Mon meilleur ami est badiste. Il a gagné plusieurs compétitions.", etymology: " issu du nom badminton, qui vient de Badminton House où fut inventé le sport, Badminton qui trouve son étymologie dans Badimyncgtun, du nom d’homme Baduhelm et du nom 'town' (ville).", synonyms: [] },
    "boutefas (Suisse)": { definition: "Gros saucisson de viande de porc crue", example: "J'ai dégusté un merveilleux boutefas à l'arrêt de bus en rentrant de Lausanne.", etymology: " du verbe 'bouter' (mettre) d’un étymon indo-européen *bhā̆u-, bhū̆- (« frapper »), et peut-être de faim qui descend, après être passé du grec au latin, puis du latin au français, du radical indo-européen *bʰā- (« parler »).", synonyms: [] },
    "boustrophédon": { definition: "Système d'écriture qui se lit d'abord de droite à gauche, puis de gauche à droite.", example: "Le rongorongo se lit en boustrophédon.", etymology: "du grec ancien 'boustrophêdón' (tels des boeufs qui labourent), issu de l'indo-européen commun *gʷōws (bétail) pour 'bous' (boeuf), *dherebh- (« épaissir ») pour 'strophế' (tourner) et du radical démonstratif indo-européen commun *de pour 'don' (suffixe qui permet de transformer un mot en adverbe). ", synonyms: [] },
    "bourrade": { definition: "Poussée que l’on donne à quelqu’un avec la crosse d’un fusil ou avec les poings.", example: "J'ai collé une bourrade à mon ennemi.", etymology: "du verbe 'bourrer' (remplir, maltraiter), du vieux norrois bysja « se précipiter avec force »", synonyms: [] },
    "bradykinésie": { definition: "(Médecine) Difficulté à bouger, sauf avec des gestes lents", example: "Mon grand-père est touché de bradykinésie.", etymology: "du grec ancien 'bradýs' (lent) de l’indo-européen commun *gʷr̥dus, et de 'kínêsis' (mouvement), de l’indo-européen commun *kei- (« mouvoir »).", synonyms: [] },
    "bradypsychie": { definition: "(Médecine) Ralentissement du fonctionnement mental et cognitif.", example: "Avec l'âge, la bradypsychie s'intensifie.", etymology: "du grec ancien 'bradýs' (lent) de l’indo-européen commun *gʷr̥dus, et de 'psichí' (âme) qui est issu de 'psýkhō' (« souffler »)", synonyms: [] },
    "brésillet": { definition: "contrefaçon de bois de brésil, qui produit une teinture rouge.", example: "J'ai trouvé ce sublime bois en brésillet dans un vide-greniers.", etymology: "du nom 'braise', issu du gotique *bras, brasa (« braise, bruler »)", synonyms: [] },
    "brésiller": { definition: "Teindre en rouge avec du brésil", example: "Le teinturier brésille la robe.", etymology: "du nom 'brésil' (qu'on retrouve dans le bois de Brésil), de 'braise', issu du gotique *bras, brasa (« braise, bruler »)", synonyms: [] },
    "briffer": { definition: "Manger avidemment (ne pas confondre avec l'anglicisme briefer, qui veut dire 'Faire le point') ", example: "Je me suis briffé hier avec mes potes : mon bide était sur le point d'éclater !", etymology: "Vient d'une forme dialectale de bribe (gros morceau de pain); à rapprocher de l'occitan brifar (« manger goulûment »)", synonyms: [] },
    "briguer": { definition: " 1- (transitif) Rechercher avec ardeur; 2- (intransitif) Faire des magouilles", example: "1- J'ai brigué la banque hier; 2- Le vieux lion qui nous servait de maire briguait son neuvième mandat", etymology: "de l'italien 'briga' (ennui, chicane)", synonyms: [] },
    "briochin": { definition: "relatif à Saint-Brieuc; un habitant de cette localité.", example: "Mon ami est Briochin.", etymology: "pour Saint-Brieuc : de 'sanctus' (sacré), du radical indo-européen commun *sak (« sacré »), et du prénom Brieuc (aussi orthographié Brieux) qui vient du celtique brigh, « force », et magl, « accroître »", synonyms: [] },
    "brumasser": { definition: " Se dit d'un temps brumeux", example: "Aujourd'hui, il brumasse fort dans l'arrière-pays alsacien.", etymology: "de brume, du latin 'bruma' (solstice d'hiver) qui descend de l’indo-européen commun '*mréǵʰus' (court)", synonyms: [] },
    "brune": { definition: "1- relatif à la couleur, une nuance de marron foncé. 2- Moment de la journée où le soleil est en train de se coucher et n’est plus complètement visible, juste avant le crépuscule.", example: "J'admire la brune qui avale les ombres du soir du haut de mon balcon.", etymology: "du bas latin brunus, qu'on peut lier soit au proto-germanique occidental '*brūn' (brun, brillant), soit au latin 'brunda' (tête de cerf) qu'on peut relier à l'indo-européen commun '*peh₂ur' (feu) ", synonyms: [] },
    };

/* =========================
   MOTS ALÉATOIRES
========================= */
const randomWords = Object.keys(dictionary);

/* =========================
   FONCTION DE RECHERCHE
========================= */
function search(word) {
    word = word.trim().toLowerCase();
    searchInput.value = word;

    const entry = dictionary[word];
    if (!entry) {
        wrapper.classList.remove("active");
        infoText.style.color = "#f00";
        infoText.innerHTML = `Mot introuvable : <span>"${word}"</span>`;
        return;
    }

    wrapper.classList.add("active");
    infoText.style.color = "#000";
    infoText.innerHTML = "";

    // Mot et langue
    document.querySelector(".word p").innerText = word;
    document.querySelector(".word span").innerText = "Français";

    // Définition
    const meaningSpan = document.querySelector(".meaning span");
    meaningSpan.innerText = entry.definition;
    meaningSpan.style.whiteSpace = "pre-line";

    // Exemple
    document.querySelector(".example span").innerText = entry.example;

    // Étymologie
    const etySpan = document.querySelector(".etymology span");
    etySpan.innerText = entry.etymology || "AAA";
    etySpan.style.whiteSpace = "pre-line";
}

/* =========================
   RECHERCHE AU 'ENTER'
========================= */
searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        search(searchInput.value);
    }
});

/* =========================
   RANDOM WORD (TOUCHE R)
========================= */
document.addEventListener("keydown", e => {
    if (e.key.toLowerCase() === "r") {
        const word = randomWords[Math.floor(Math.random() * randomWords.length)];
        search(word);
    }
});

/* =========================
   RESET INPUT
========================= */
removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Appuyez sur R et découvrez un mot français totalement inconnu !";
});