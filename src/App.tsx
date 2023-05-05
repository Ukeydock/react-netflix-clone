import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Row from "./components/Row";
import requests from "./api/request";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <Nav />
      <Banner />

      <Row
        title="Netflix"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLarageRow={true}
      />

      <Row
        title="Trending Now"
        id="TN"
        fetchUrl={requests.fetchTrending}
        isLarageRow={false}
      />
      <Row
        title="Top Rated"
        id="TR"
        fetchUrl={requests.fetchTopRated}
        isLarageRow={false}
      />
      <Row
        title="Action Movie"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
        isLarageRow={false}
      />
    </div>
  );
}

export default App;
