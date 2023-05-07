import React from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/request";

export default function MainPage() {
  return (
    <div>
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
