import { ResultsDb } from "../db_types/Results";
import { HormoneRanges, Results } from "../model/results";

export async function fetchResults() {
  const [dbResults, ranges] = await Promise.all([
    fetchDbResults(),
    fetchRanges(),
  ]);

  const results: Results[] = dbResults.map((result) => ({
    ...result,
    inRange: getResultsStatus(result, ranges),
  }));

  return results;
}

function getResultsStatus(results: ResultsDb, ranges: HormoneRanges): boolean {
  return results.hormoneResults.every((hormone) => {
    const range = ranges[hormone.code];

    // tharun - i assume db is typed, but incase not we can check here and default to false
    if (!range) return false;

    return hormone.value >= range.min && hormone.value <= range.max;
  });
}

// tharun - if the range values and fixed, we can keep it as a const so no db requests
async function fetchRanges(): Promise<HormoneRanges> {
  const json: { default: HormoneRanges } = await import(
    "../data/ranges.json",
    {
      assert: { type: "json" },
    }
  );
  return json.default;
}

// this would normally be a database query - you don't need to change this function
async function fetchDbResults() {
  const json: { default: ResultsDb[] } = await import("../data/results.json", {
    assert: { type: "json" },
  });
  const results = json.default;
  return results;
}
