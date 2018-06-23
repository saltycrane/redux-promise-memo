import React from "react";

const HomePage = () => (
  <div style={{ padding: 20 }}>
    <div>
      Blog post:
      <ul>
        <li style={{ listStyle: "none" }}>
          <a href=" https://www.saltycrane.com/blog/2018/06/caching-filtered-list-results-w-redux-react-router-and-redux-promise-memo/">
            Caching a filtered list of results w/ Redux, React Router, and
            redux-promise-memo
          </a>
        </li>
      </ul>
    </div>
    <div>
      Example apps:
      <ol>
        <li>
          <a href="https://filtered-vehicles1.saltycrane.com/vehicles">
            Filtered vehicles example w/ no caching
          </a>
        </li>
        <li>
          <a href="https://filtered-vehicles2.saltycrane.com/vehicles">
            Filtered vehicles example w/ manual caching solution
          </a>
        </li>
        <li>
          <a href="https://filtered-vehicles3.saltycrane.com/vehicles">
            <strong>
              Filtered vehicles example w/ caching using{" "}
              <code>redux-promise-memo</code>
            </strong>
          </a>
        </li>
      </ol>
    </div>
  </div>
);

export default HomePage;
