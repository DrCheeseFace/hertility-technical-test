import { HormoneResults } from "../db_types/Results";

export interface Results {
  id: number;
  userId: number;
  hormoneResults: Array<HormoneResults>;
  inRange: boolean;
}

export interface HormoneRange {
  min: number;
  max: number;
}

export type HormoneRanges = Record<string, HormoneRange>;
