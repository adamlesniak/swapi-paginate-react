import { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";

function List({ result, pageChange, currentPage }) {
  if (result?.results) {
    return (
      <>
        <div class="list">
          <ul>
            {result.results.map((item) => (
              <li key={item.uid}>{item.name}</li>
            ))}
          </ul>
        </div>
        <div class="pagination">
          <div class="pagination-arrows">
            {result.previous && (
              <button autoFocus={!result.next} onClick={() => pageChange(currentPage - 1)}>
                {"<<"}
              </button>
            )}
            {result.next && (
              <button autoFocus={result.next} onClick={() => pageChange(currentPage + 1)}>
                {">>"}
              </button>
            )}
          </div>
          <div class="pagination-pages">
            {Array.from(Array(result.total_pages).keys())
              .map((number) => number + 1)
              .map((value) => (
                <button
                  className={`${currentPage === value ? "active" : ""}`}
                  onClick={() => pageChange(value)}
                  key={value}
                >
                  {value}
                </button>
              ))}
          </div>
        </div>
      </>
    );
  }

  return <p>No results - please try again later.</p>;
}

function App() {
  const [result, setResult] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(url = "https://swapi.tech/api/people") {
      setLoading(true);

      const queryParams = new URLSearchParams({ page, limit }).toString();

      const response = await fetch(`${url}?${queryParams}`);
      const responseJson = await response.json();

      setResult(responseJson);
      setLoading(false);
      setLimit(limit);
    }

    fetchData();
  }, [page, limit]);

  return (
    <div className="app">
      <main className="app-body">
        {loading && <img src={logo} className="app-logo" alt="logo" />}
        {!loading && (
          <List
            result={result || []}
            pageChange={(value) => setPage(value)}
            currentPage={page}
          ></List>
        )}
      </main>
    </div>
  );
}

export default App;
