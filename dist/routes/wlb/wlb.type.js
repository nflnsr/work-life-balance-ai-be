"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recalculationSchema = exports.workerListQuestions = exports.studentListQuestions = exports.dimensions = exports.responseSchema = void 0;
const genai_1 = require("@google/genai");
const responseSchema = {
    type: genai_1.Type.OBJECT,
    properties: {
        score: {
            type: genai_1.Type.NUMBER,
            description: "An overall work-life balance score from 0 to 100, where 100 is perfect balance.",
        },
        summary: {
            type: genai_1.Type.STRING,
            description: "A 2-3 sentence summary of the user's work-life balance status, written in an encouraging and helpful tone.",
        },
        dimensionalScores: {
            type: genai_1.Type.ARRAY,
            items: {
                type: genai_1.Type.OBJECT,
                properties: {
                    dimension: {
                        type: [
                            "Akademik/Pekerjaan & Profesionalisme",
                            "Pengembangan Diri",
                            "Sosial & Relasi",
                            "Personal & Mental",
                            "Karier & Masa Depan",
                        ],
                    },
                    score: {
                        type: genai_1.Type.NUMBER,
                        description: "A score for this specific dimension from 0 to 100.",
                    },
                    analysis: {
                        type: genai_1.Type.STRING,
                        description: "A brief, 1-2 sentence analysis of this dimension's score.",
                    },
                },
                required: ["dimension", "score", "analysis"],
            },
        },
        recommendations: {
            type: genai_1.Type.ARRAY,
            items: {
                type: genai_1.Type.OBJECT,
                properties: {
                    priority: { type: genai_1.Type.STRING, enum: ["High", "Medium", "Low"] },
                    title: {
                        type: genai_1.Type.STRING,
                        description: "A short, actionable title for the recommendation.",
                    },
                    description: {
                        type: genai_1.Type.STRING,
                        description: "A detailed, practical description of the recommendation (2-3 sentences).",
                    },
                },
                required: ["priority", "title", "description"],
            },
        },
    },
    required: ["score", "summary", "dimensionalScores", "recommendations"],
};
exports.responseSchema = responseSchema;
const dimensions = [
    "Akademik",
    "Akademik",
    "Akademik",
    "Akademik",
    "Akademik",
    "Pengembangan Diri",
    "Pengembangan Diri",
    "Pengembangan Diri",
    "Pengembangan Diri",
    "Sosial dan Relasi",
    "Sosial dan Relasi",
    "Sosial dan Relasi",
    "Sosial dan Relasi",
    "Personal dan Mental",
    "Personal dan Mental",
    "Personal dan Mental",
    "Personal dan Mental",
    "Personal dan Mental",
    "Karier dan Masa Depan",
    "Karier dan Masa Depan",
    "Karier dan Masa Depan",
    "Karier dan Masa Depan",
    "Karier dan Masa Depan",
];
exports.dimensions = dimensions;
const studentListQuestions = [
    // Akademik
    "Saya merasa puas dengan hasil akademik saya hingga saat ini.",
    "Fasilitas akademik yang saya miliki mendukung saya dalam belajar.",
    "Saya menikmati proses belajar dan kegiatan akademik lainnya.",
    "Saya memiliki kesulitan ekonomi dalam menunjang pendidikan saya.",
    "Saya bisa membagi waktu dengan baik antara akademik dan kehidupan personal.",
    // Pengembangan Diri
    "Saya merasa kemampuan dan keterampilan saya terus berkembang.",
    "Saya memiliki cukup waktu untuk mengeksplorasi bidang yang saya tekuni.",
    "Saya merasa wawasan finansial saya kian meningkat.",
    "Saya tidak merasa berkompetisi atau lingkungan saya berkompetisi dengan sehat.",
    // Sosial dan relasi
    "Saya memiliki hubungan yang baik di lingkungan yang saya tempati.",
    "Saya mendengarkan saran dan kritik dari orang lain.",
    "Lingkungan sosial saya mendukung apa yang saya lakukan.",
    "Saya merasa perlu berpenampilan dengan baik.",
    // Personal dan mental
    "Saya berusaha menyikapi suatu masalah sebaik mungkin.",
    "Saya cenderung menghindari konflik.",
    "Saya merasa kurang beristirahat akhir-akhir ini.",
    "Saya memikirkan hal-hal kecil yang saya alami di kehidupan sehari-hari.",
    "Saya memiliki kebiasaan atau hobi yang membantu saya mengurangi stres.",
    // Karier dan masa depan
    "Saya merasa tujuan hidup saya cukup jelas.",
    "Saya memiliki motivasi yang kuat untuk mencapai tujuan saya.",
    "Saya merasa cemas dengan masa depan dan karier saya.",
    "Saya mengalami kesulitan dalam mencari peluang dan kesempatan.",
    "Saya merasa khawatir dengan hal-hal tertentu meski hal tersebut di luar kendali saya.",
];
exports.studentListQuestions = studentListQuestions;
const workerListQuestions = [
    // Pekerjaan
    "Saya merasa puas dengan pekerjaan saya saat ini.",
    "Fasilitas kerja yang saya miliki mendukung produktivitas saya.",
    "Saya menikmati proses dan aktivitas dalam pekerjaan saya.",
    "Saya mengalami kesulitan ekonomi meskipun sudah bekerja.",
    "Saya bisa membagi waktu dengan baik antara pekerjaan dan kehidupan pribadi.",
    // Pengembangan Diri
    "Saya merasa kemampuan dan keterampilan saya terus berkembang di tempat kerja.",
    "Saya memiliki cukup waktu untuk meningkatkan kemampuan profesional saya.",
    "Saya memahami bagaimana cara mengelola keuangan pribadi dengan baik.",
    "Saya tidak merasa berkompetisi atau lingkungan saya berkompetisi dengan sehat.",
    // Sosial dan relasi
    "Saya memiliki hubungan kerja yang baik dengan rekan-rekan saya.",
    "Saya cenderung menghindari konflik.",
    "Saya mendengarkan saran dan kritik dari orang lain.",
    "Lingkungan saya mendukung dan menghargai apa yang saya lakukan.",
    "Saya merasa perlu berpenampilan dengan baik.",
    // Personal dan mental
    "Saya berusaha menyikapi suatu masalah sebaik mungkin.",
    "Saya merasa kurang beristirahat akhir-akhir ini.",
    "Saya memikirkan hal-hal kecil yang saya alami di kehidupan sehari-hari.",
    "Saya memiliki hobi atau kegiatan rutin yang membantu menghilangkan stres.",
    // Karier dan masa depan
    "Saya memiliki arah karier yang jelas.",
    "Saya memiliki motivasi yang kuat untuk mengembangkan karier saya.",
    "Saya merasa cemas dengan stabilitas dan masa depan pekerjaan saya.",
    "Saya mengalami kesulitan dalam mengembangkan karier atau mencari peluang yang lebih baik.",
    "Saya merasa khawatir dengan hal-hal tertentu meski hal tersebut di luar kendali saya.",
];
exports.workerListQuestions = workerListQuestions;
const recalculationSchema = {
    type: genai_1.Type.OBJECT,
    properties: {
        newScore: { type: genai_1.Type.NUMBER, description: "The new, improved score between 0 and 100." },
        feedback: {
            type: genai_1.Type.STRING,
            description: "A short, 1-2 sentence encouraging feedback message.",
        },
    },
    required: ["newScore", "feedback"],
};
exports.recalculationSchema = recalculationSchema;
