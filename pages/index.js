import React, { useEffect } from "react";
import { getStations } from "../services/irail";
import Head from "../components/head";
import Nav from "../components/nav";
import AutoComplete from "../components/auto-complete";
import "./styles.scss";

const Home = () => {
  async function fetchMyAPI() {
    let result = await getStations("we");
    console.log(result);
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);
  return (
    <div>
      <Head title="Home" />
      <Nav />

      <div className="hero">
        <h1 className="title">Plan uw route </h1>
        <p className="description">
          To get started, edit <code>pages/index.js</code> and save to reload.
        </p>
        <AutoComplete label={"From"} />
        <AutoComplete label={"To"} />
      </div>
    </div>
  );
};

export default Home;
