import React, { useReducer } from "react";
import { getStations } from "../services/irail";
import Head from "../components/head";
import Nav from "../components/nav";
import AutoComplete from "../components/auto-complete";
import "./styles.scss";

const EVENTS = {
  SET_FROM_STATIONS: "SET_FROM_STATIONS",
  SET_TO_STATIONS: "SET_TO_STATIONS",
  SET_FROM: "SET_FROM",
  SET_TO: "SET_TO",
  SET_LEAVE: "SET_LEAVE",
  SET_ROUTES: "SET_ROUTES"
};

const Search = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getApiStations(value) {
    let stations = await getStations(value);
    return stations;
  }

  return (
    <div>
      <Head title="Home" />
      <Nav />

      <div className="hero">
        <h1 className="title">Plan uw route </h1>
        <p className="description">Zoek uw station</p>
        <AutoComplete
          label={"From"}
          items={state.fromStations}
          onChange={station =>
            dispatch({
              type: EVENTS.SET_FROM,
              from: station.id
            })
          }
          apiCall={async value => {
            const stations = await getApiStations(value);
            dispatch({
              type: EVENTS.SET_FROM_STATIONS,
              stations
            });
          }}
        />
        <AutoComplete
          label={"To"}
          items={state.toStations}
          onChange={station =>
            dispatch({
              type: EVENTS.SET_TO,
              to: station.id
            })
          }
          apiCall={async value => {
            const stations = await getStations(value);
            dispatch({
              type: EVENTS.SET_TO_STATIONS,
              stations
            });
          }}
        />
      </div>

      <button type="submit" disabled={!state.from || !state.to}>
        Plan route
      </button>
    </div>
  );
};

const initialState = {
  toStations: [],
  fromStations: [],
  from: null,
  to: null,
  leave: true,
  routes: []
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case EVENTS.SET_FROM_STATIONS:
      return { ...state, fromStations: action.stations };
    case EVENTS.SET_TO_STATIONS:
      return { ...state, toStations: action.stations };
    case EVENTS.SET_FROM:
      return { ...state, from: action.from };
    case EVENTS.SET_TO:
      return { ...state, to: action.to };
    case EVENTS.SET_LEAVE:
      return { ...state, leave: action.leave };
    default:
      throw new Error();
  }
}

export default Search;
