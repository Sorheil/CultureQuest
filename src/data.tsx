// types
export type Chapter = {
    id: string;
    title: string;
    description: string;
    introduction?: string;
    level: number;
    numberquestion: number;
    unlocked: boolean;
    questionsFound: number;
    image: string;
    lesson: string;
    completed: boolean;
};

export type Option = {
    id: string;
    label: string;
    image?: string;
};

export type Character = {
    image: string;
    speech: string;
};

export type Question = {
    id: string;
    type: string;
    word: string;
    chapterId: string;
    correctOption: Option;
    options: Option[];
    character?: Character;
};

// données
export const CHAPTERS: Chapter[] = [
    {
        id: "default",
        title: "select a color",
        description: "select a color",
        level: 1,
        numberquestion: 5,
        unlocked: true,
        questionsFound: 0,
        completed: true,
        image: "/image/chapters/ch1/chapter1.jpg",
        lesson: "lesson1",
    },
    {
        id: "ch1",
        title: "Origines ancestrales",
        description: "Les Origines selon la Tradition Bassa",
        introduction:
            " l’ancêtre des Bassa est sorti de la grotte appelée « Ngok Lituba ».Berceau des Bassa du Cameroun \n" +
            "et d’autres groupes dont les Bakoko et les Banen, l’ancêtre commun et ses membres de famille sont \n" +
            "sortis de la grotte pour migrer dans plusieurs directions. Un groupe a pris la direction sud et \n" +
            "rencontré le fleuve Sanaga qu’une partie des membres atraversé sur le dos d’un boa, d’après la \n" +
            "tradition mythique, tandis que les autres sont restés sur place : ce sont les Babimbi. Après la \n" +
            "traversée de la Sanaga, certains ont pris la direction « est » : c’est le sous-groupe Likôl. Le reste \n" +
            "s’est dirigé vers la côte : ce sont les Bassa du Wouri.",
        level: 1,
        numberquestion: 5,
        unlocked: true,
        questionsFound: 0,
        completed: true,
        image: "/image/chapters/ch1/chapter1.jpg",
        lesson: "lesson1",
    },
    {
        id: "ch2",
        title: "Organisation sociale",
        description: "La structure de la société traditionnelle Bassa",
        introduction:
            "La société Bassa est organisée en clans appelés 'Mbok'. Chaque Mbok représente une lignée familiale ayant ses propres rites et chefs...",
        level: 2,
        numberquestion: 4,
        unlocked: true,
        questionsFound: 0,
        completed: false,
        image: "/image/chapters/ch2/chapter2.jpg",
        lesson: "lesson2",
    },
    {
        id: "ch3",
        title: "Spiritualité et croyances",
        description: "Le monde spirituel chez les Bassa",
        introduction:
            "La spiritualité joue un rôle fondamental dans la culture Bassa. Les ancêtres sont honorés et des esprits protecteurs sont invoqués lors de cérémonies...",
        level: 3,
        numberquestion: 4,
        unlocked: false,
        questionsFound: 0,
        completed: false,
        image: "/image/chapters/ch3/chapter3.jpg",
        lesson: "lesson3",
    }
];

export const QUESTIONS: Question[] = [
    // --- TES QUESTIONS ---
    {
        id: "q1",
        type: "culture",
        word: "Selon la tradition Bassa, quel est le lieu d'origine de leur ancêtre ?",
        chapterId: "ch1",
        correctOption: { id: "montagne", label: "Une montagne sacrée" },
        options: [
            { id: "montagne", label: "Une montagne sacrée" },
            { id: "grotte", label: "La grotte appelée « Ngok Lituba »" },
            { id: "village", label: "Un village ancestral" },
        ],
    },
    {
        id: "q2",
        type: "culture",
        word: "Quels autres groupes sont également considérés comme ayant pour berceau la grotte de Ngok Lituba, selon la tradition ?",
        chapterId: "ch1",
        correctOption: { id: "bakoko_banen", label: "Les Bakoko et les Banen" },
        options: [
            { id: "ewondo_bulu", label: "Les Ewondo et les Bulu" },
            { id: "bakoko_banen", label: "Les Bakoko et les Banen" },
            { id: "douala_sawa", label: "Les Douala et les Sawa" },
        ],
    },
    {
        id: "q3",
        type: "culture",
        word: "Quel fleuve est mentionné comme un point de repère important lors de la migration d'un groupe Bassa vers le sud ?",
        chapterId: "ch1",
        correctOption: { id: "nyong", label: "Le fleuve Nyong" },
        options: [
            { id: "nyong", label: "Le fleuve Nyong" },
            { id: "sanaga", label: "Le fleuve Sanaga" },
            { id: "wouri", label: "Le fleuve Wouri" },
        ],
    },
    {
        id: "q4",
        type: "culture",
        word: "Comment une partie des membres du groupe a-t-elle traversé le fleuve Sanaga, selon la tradition mythique ?",
        chapterId: "ch1",
        correctOption: { id: "boa", label: "Sur le dos d’un boa" },
        options: [
            { id: "pirogue", label: "En pirogue" },
            { id: "nage", label: "À la nage" },
            { id: "boa", label: "Sur le dos d’un boa" },
        ],
    },
    {
        id: "q5",
        type: "culture",
        word: "Quels sont les noms des trois sous-groupes Bassa mentionnés comme ayant migré dans différentes directions après la sortie de la grotte ?",
        chapterId: "ch1",
        correctOption: { id: "babimbi_likol_bassaWouri", label: "Les Babimbi, le sous-groupe Likôl, les Bassa du Wouri" },
        options: [
            { id: "babimbi_yabassi_dibombari", label: "Les Babimbi, les Yabassi, les Dibombari" },
            { id: "babimbi_likol_bassaWouri", label: "Les Babimbi, le sous-groupe Likôl, les Bassa du Wouri" },
            { id: "likol_banen_bakoko", label: "Les Likôl, les Banen, les Bakoko" },
        ],
    },

    // --- NOUVELLES QUESTIONS ch2 ---
    {
        id: "q6",
        type: "culture",
        word: "Comment s'appelle une lignée familiale dans la société Bassa ?",
        chapterId: "ch2",
        correctOption: { id: "mbok", label: "Mbok" },
        options: [
            { id: "mbok", label: "Mbok" },
            { id: "ekang", label: "Ekang" },
            { id: "ngondo", label: "Ngondo" },
        ],
    },
    {
        id: "q7",
        type: "culture",
        word: "Quel rôle joue le chef de clan dans la société Bassa traditionnelle ?",
        chapterId: "ch2",
        correctOption: { id: "arbitre", label: "Arbitre des conflits" },
        options: [
            { id: "arbitre", label: "Arbitre des conflits" },
            { id: "guerisseur", label: "Guérisseur principal" },
            { id: "enseignant", label: "Enseignant religieux" },
        ],
    },
    {
        id: "q8",
        type: "culture",
        word: "Quel principe fondamental régissait les relations entre les membres du même Mbok ?",
        chapterId: "ch2",
        correctOption: { id: "solidarite", label: "Solidarité et entraide" },
        options: [
            { id: "solidarite", label: "Solidarité et entraide" },
            { id: "independance", label: "Indépendance individuelle" },
            { id: "concurrence", label: "Compétition entre membres" },
        ],
    },
    {
        id: "q9",
        type: "culture",
        word: "Comment s'organisaient les mariages entre les différents Mbok ?",
        chapterId: "ch2",
        correctOption: { id: "exogamie", label: "Exogamie obligatoire" },
        options: [
            { id: "exogamie", label: "Exogamie obligatoire" },
            { id: "endogamie", label: "Endogamie préférée" },
            { id: "libre", label: "Mariage libre" },
        ],
    },

    // --- NOUVELLES QUESTIONS ch3 ---
    {
        id: "q10",
        type: "spiritualité",
        word: "Qui sont honorés comme des protecteurs spirituels chez les Bassa ?",
        chapterId: "ch3",
        correctOption: { id: "ancetres", label: "Les ancêtres" },
        options: [
            { id: "ancetres", label: "Les ancêtres" },
            { id: "divinites", label: "Les divinités étrangères" },
            { id: "esprits", label: "Les esprits de la nature" },
        ],
    },
    {
        id: "q11",
        type: "spiritualité",
        word: "Quel élément est souvent utilisé dans les rituels pour communiquer avec les esprits ?",
        chapterId: "ch3",
        correctOption: { id: "feu", label: "Le feu" },
        options: [
            { id: "feu", label: "Le feu" },
            { id: "eau", label: "L'eau" },
            { id: "terre", label: "La terre" },
        ],
    },
    {
        id: "q12",
        type: "spiritualité",
        word: "Quel rôle jouent les devins dans la société Bassa ?",
        chapterId: "ch3",
        correctOption: { id: "intermediaires", label: "Ils servent d'intermédiaires avec le monde spirituel" },
        options: [
            { id: "intermediaires", label: "Ils servent d'intermédiaires avec le monde spirituel" },
            { id: "chefs", label: "Ils gouvernent les villages" },
            { id: "guerriers", label: "Ils dirigent les armées" },
        ],
    },
    {
        id: "q13",
        type: "spiritualité",
        word: "Quelle valeur est centrale dans la pratique spirituelle Bassa ?",
        chapterId: "ch3",
        correctOption: { id: "respect", label: "Le respect des ancêtres" },
        options: [
            { id: "courage", label: "Le courage au combat" },
            { id: "respect", label: "Le respect des ancêtres" },
            { id: "innovation", label: "L'innovation spirituelle" },
        ],
    },
    {
        id: "q14",
        type: "translation",
        word: "rouge",
        chapterId: "default",
        character:{speech:"",image:"/image/chapters/default/rouge.png"},
        correctOption: { id: "kòyop", label: "kòyop", image: "/coffee.png" },
        options: [
            { id: "kòyop", label: "kòyop", image: "/coffee.png" },
            { id: "Mbènto ", label: "Mbènto ", image: "/bagel.png" },
            { id: "Bèngè ", label: "Bèngè ", image: "/croissant.png" },
            { id: "puba", label: "puba", image: "/tea.png", }
        ],
    },
    {
        id: "q15",
        type: "translation",
        word: "blanc",
        chapterId: "default",
        character:{speech:"",image:"/image/chapters/default/white.jpg"},
        correctOption: { id: "puba", label: "puba", image: "/white.png" },
        options: [
            { id: "mbènto", label: "mbènto", image: "/white.png" },
            { id: "nlànga", label: "nlànga", image: "/dog.png" },
            { id: "kòyop", label: "kòyop", image: "/bird.png" },
            { id: "puba", label: "puba", image: "/cat.png" }
        ]
    },
    {
        id: "q17",
        type: "translation",
        word: "black",
        chapterId: "default",
        character:{speech:"",image:"/image/chapters/default/black.png"},
        correctOption: { id: "nlànga", label: "nlànga", image: "/red.png" },
        options: [
            { id: "kòyop", label: "kòyop", image: "/red.png" },
            { id: "mbènto ", label: "mbènto ", image: "/apple.png" },
            { id: "nlànga", label: "nlànga", image: "/carrot.png" },
            { id: "puba", label: "puba", image: "/avocado.png" }
        ]
    }
];
