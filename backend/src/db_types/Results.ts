// tharun - im going to assume these are db types and cannot be changed
export interface HormoneResults {
  code: string;
  units: string;
  value: number;
}

export interface ResultsDb {
  id: number;
  userId: number;
  hormoneResults: Array<HormoneResults>;
}
