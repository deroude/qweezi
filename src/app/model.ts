export interface Answer {
   text?: string;
   score: number;
}

export interface Question {
   text: string;
   order?: number;
   answers: Answer[];
   section?: boolean;
}

export interface Interpretation {
   text: string;
   minScore: number;
   maxScore: number;
}

export interface Quiz {
   id?: string;
   title: string;
   subtitle?: string;
   attribution?: string;
   questions: Question[];
   interpretations: Interpretation[];
}

export interface QuizResponseItem {
   question: number;
   answer: number;
}

export interface QuizResponse {
   timestamp: Date;
   items: QuizResponseItem[];
}
