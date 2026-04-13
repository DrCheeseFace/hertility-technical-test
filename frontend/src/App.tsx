import { useEffect } from "react";
import "./App.css";
import React from "react";

interface HormoneResults {
  code: string;
  units: string;
  value: number;
}

interface Results {
  id: number;
  userId: number;
  hormoneResults: Array<HormoneResults>;
  inRange: boolean;
}

enum StatusFilter {
  InRange,
  NotInRange,
  None,
}

const fetchResults = async () => {
  try {
    const res = await fetch("http://localhost:52863/results");
    const json = await res.json();
    return json as Results[];
  } catch (error) {
    console.error(error);
  }
  return [];
};

function App() {
  const [results, setResults] = React.useState<Results[]>([]);
  const [selectedStatusFilter, setSelectedStatusFilter] =
    React.useState<StatusFilter>(StatusFilter.None);

  useEffect(() => {
    fetchResults().then((results) => {
      setResults(results);
    });
  }, []);

  const showResult = (result: Results): boolean => {
    if (selectedStatusFilter === StatusFilter.None) return true;
    return result.inRange === (selectedStatusFilter === StatusFilter.InRange);
  };

  return (
    <div>
      <h2>Hertility admin dashboard</h2>
      <h1>Hormone results</h1>

      <div className="results">
        <div className="resultsHeader">
          <p>result id</p>
          <p>user id</p>
          <div>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(Number(e.target.value))}
            >
              <option value={StatusFilter.None}>status (All)</option>
              <option value={StatusFilter.InRange}>status (In Range)</option>
              <option value={StatusFilter.NotInRange}>
                status (Not In Range)
              </option>
            </select>
          </div>
        </div>
        <div className="resultsList">
          {results.map((result) => {
            if (!showResult(result)) return null; // if fails filter check

            return (
              <div className="resultsItem" key={result.id}>
                <p>{result.id}</p>
                <p>{result.userId}</p>
                <p>{result.inRange ? "IN RANGE" : "NOT IN RANGE"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
