export interface Answer {
  readonly text?: string;
  readonly score: number;
}

export interface Question {
  readonly text: string;
  readonly answers: Answer[];
  readonly section?: boolean;
}

export interface Interpretation {
  readonly text: string;
  readonly minScore: number;
  readonly maxScore: number;
}

export interface Quiz {
  readonly id?: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly attribution?: string;
  readonly questions: Question[];
  readonly interpretations: Interpretation[];
}

export interface QuizResponseItem {
  readonly question: number;
  readonly answer: number;
}

export interface QuizResponse {
  readonly timestamp: Date;
  readonly items: QuizResponseItem[];
}
