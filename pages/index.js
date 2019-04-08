import React, { useReducer } from "react";
import { getStations } from "../services/irail";
import Head from "../components/head";
import Nav from "../components/nav";
import AutoComplete from "../components/auto-complete";
import "./styles.scss";

const TYPES = {
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
              type: TYPES.SET_FROM,
              from: station.id
            })
          }
          apiCall={async value => {
            const stations = await getApiStations(value);
            dispatch({
              type: TYPES.SET_FROM_STATIONS,
              stations
            });
          }}
        />
        <AutoComplete
          label={"To"}
          items={state.toStations}
          onChange={station =>
            dispatch({
              type: TYPES.SET_FROM,
              to: station.id
            })
          }
          apiCall={async value => {
            const stations = await getStations(value);
            dispatch({
              type: TYPES.SET_TO_STATIONS,
              stations
            });
          }}
        />
      </div>
      <button>Plan route</button>
    </div>
  );
};

const initialState = {
  toStations: [],
  fromStations: [],
  from: "",
  to: "",
  leave: true,
  routes: []
};

function reducer(state, action) {
  switch (action.type) {
    case TYPES.SET_FROM_STATIONS:
      return { ...state, fromStations: action.stations };
    case TYPES.SET_TO_STATIONS:
      return { ...state, toStations: action.stations };
    case TYPES.SET_FROM:
      return { ...state, from: action.from };
    case TYPES.SET_TO:
      return { ...state, to: action.to };
    case TYPES.SET_LEAVE:
      return { ...state, leave: action.leave };
    default:
      throw new Error();
  }
}

export default Search;
