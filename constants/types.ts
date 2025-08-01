export interface CarModel {
  id: string;
  fullTitle: string;
}

export type SearchResult =
  | { type: 'tutorial'; chapter: TourChapter }
  | { type: 'quiz'; chapter: TourChapter };


export enum TourChapter {
  ActivateDA       = 'Aktivierung', 
  Verkehrszeichen  = 'Verkehrszeichen',
  ACC              = 'Abstand',
  LKA              = 'Ampelerkennung',
  Spurwechsel      = 'Spurführung',
  Notbremse         = 'Notbremsung',
  Deaktivierung    = 'Deaktivierung',
  Risiken          = 'Risiken/Verantwortung',
}

//Export the ordered array of chapters
export const allChapters: TourChapter[] = [
  TourChapter.ActivateDA,
  TourChapter.Verkehrszeichen,
  TourChapter.ACC,
  TourChapter.LKA,
  TourChapter.Spurwechsel,
  TourChapter.Notbremse,
  TourChapter.Deaktivierung,
  TourChapter.Risiken,
];