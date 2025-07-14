export interface CarModel {
  id: string;
  fullTitle: string;
  // …any other fields from your Swift CarModel
}

export type SearchResult =
  | { type: 'tutorial'; chapter: TourChapter }
  | { type: 'quiz'; chapter: TourChapter };


export enum TourChapter {
  ActivateDA       = 'activation',    // match your URL/route or whichever case you're using
  Verkehrszeichen  = 'trafficSign',
  ACC              = 'acc',
  //Stauassistent    = 'trafficLight',
  Ampelerkennung   = 'trafficLight',  // adjust the string keys to your routing/naming
  LKA              = 'lka',
  Spurwechsel      = 'spurwechsel',
  Notbrems         = 'notbremse',
  Deaktivierung    = 'deaktivierung',
  Risiken          = 'risiken',
  NewFeature      = 'NewFeature',
}

// 3. Export the ordered array of chapters
export const allChapters: TourChapter[] = [
  TourChapter.ActivateDA,
  TourChapter.Verkehrszeichen,
  TourChapter.ACC,
  //TourChapter.Stauassistent,
  TourChapter.Ampelerkennung,
  TourChapter.LKA,
  TourChapter.Spurwechsel,
  TourChapter.Notbrems,
  TourChapter.Deaktivierung,
  TourChapter.Risiken,
  TourChapter.NewFeature
];