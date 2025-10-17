export enum SectionId {
  Aim = 'aim',
  Theory = 'theory',
  Procedure = 'procedure',
  Pretest = 'pretest',
  Demo = 'demo',
  Practice = 'practice',
  Posttest = 'posttest',
  References = 'references',
  Contributors = 'contributors',
  Feedback = 'feedback',
}

export interface Section {
  id: SectionId;
  title: string;
}

export const SECTIONS: Section[] = [
  { id: SectionId.Aim, title: 'Aim' },
  { id: SectionId.Theory, title: 'Theory' },
  { id: SectionId.Procedure, title: 'Procedure' },
  { id: SectionId.Pretest, title: 'Pre-Test' },
  { id: SectionId.Demo, title: 'Demo' },
  { id: SectionId.Practice, title: 'Practice' },
  { id: SectionId.Posttest, title: 'Post-Test' },
  { id: SectionId.References, title: 'References' },
  { id: SectionId.Contributors, title: 'Contributors' },
  { id: SectionId.Feedback, title: 'Feedback' },
];

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
