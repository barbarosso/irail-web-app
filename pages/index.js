import React, { useReducer } from "react";
import { getStations, getRoutes } from "../services/irail";
import Head from "../components/head";
import Nav from "../components/nav";
import AutoComplete from "../components/auto-complete";
import "./styles.scss";

const ACTION = {
  SET_FROM_STATIONS: "SET_FROM_STATIONS",
  SET_TO_STATIONS: "SET_TO_STATIONS",
  SET_FROM: "SET_FROM",
  SET_TO: "SET_TO",
  SET_DEPARTURE: "SET_DEPARTURE",
  SET_ROUTES: "SET_ROUTES"
};

const initialState = {
  toStations: [],
  fromStations: [],
  from: null,
  to: null,
  departure: true,
  routes: []
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.SET_FROM_STATIONS:
      return { ...state, fromStations: action.stations };
    case ACTION.SET_TO_STATIONS:
      return { ...state, toStations: action.stations };
    case ACTION.SET_FROM:
      return { ...state, from: action.from };
    case ACTION.SET_TO:
      return { ...state, to: action.to };
    case ACTION.SET_DEPARTURE:
      return { ...state, departure: action.departure };
    case ACTION.SET_ROUTES:
      return { ...state, routes: action.routes };
    default:
      throw new Error();
  }
}

const Search = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getApiStations(value) {
    let stations = await getStations(value);
    return stations;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const routes = await getRoutes(state.from, state.to);
    dispatch({
      type: ACTION.SET_ROUTES,
      routes
    });
  }

  return (
    <div>
      <Head title="Home" />
      <Nav />

      <div className="hero">
        <h1 className="title">Plan uw route </h1>
        <p className="description">Zoek uw station</p>
        <form onSubmit={onSubmit}>
          <AutoComplete
            label={"From"}
            items={state.fromStations}
            onChange={station =>
              dispatch({
                type: ACTION.SET_FROM,
                from: station.name
              })
            }
            apiCall={async value => {
              const stations = await getApiStations(value);
              dispatch({
                type: ACTION.SET_FROM_STATIONS,
                stations
              });
            }}
          />
          <AutoComplete
            label={"To"}
            items={state.toStations}
            onChange={station =>
              dispatch({
                type: ACTION.SET_TO,
                to: station.name
              })
            }
            apiCall={async value => {
              const stations = await getStations(value);
              dispatch({
                type: ACTION.SET_TO_STATIONS,
                stations
              });
            }}
          />
          <fieldset id="departure">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="departure"
                  name="departure"
                  onChange={event =>
                    dispatch({
                      type: ACTION.SET_DEPARTURE,
                      departure: true
                    })
                  }
                  checked={state.departure === true}
                />
                Option 1
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="arrive"
                  name="departure"
                  onChange={event =>
                    dispatch({
                      type: ACTION.SET_DEPARTURE,
                      departure: false
                    })
                  }
                  checked={state.departure === false}
                />
                Option 1
              </label>
            </div>
          </fieldset>
          <button type="submit" disabled={!state.from || !state.to}>
            Plan route
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
