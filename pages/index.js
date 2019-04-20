import React, { useReducer, useEffect } from "react";
import { getStations, getRoutes } from "../services/irail";
import Head from "../components/head";
import Nav from "../components/nav";
import AutoComplete from "../components/auto-complete";
import "./styles.scss";
import DateTimePicker from "../components/date-time-picker";

const ACTION = {
  SET_STATIONS: "SET_STATIONS",
  SET_FROM: "SET_FROM",
  SET_TO: "SET_TO",
  SET_DEPARTURE: "SET_DEPARTURE",
  SET_ROUTES: "SET_ROUTES"
};

const initialState = {
  stations: [],
  from: null,
  to: null,
  time: null,
  departure: true,
  routes: []
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.SET_STATIONS:
      return { ...state, stations: action.stations };
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

  const loadStations = async () => {
    let stations = await getStations();
    dispatch({
      type: ACTION.SET_STATIONS,
      stations
    });
  };

  useEffect(() => {
    loadStations();
  }, []);

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
            items={state.stations}
            onChange={station =>
              dispatch({
                type: ACTION.SET_FROM,
                from: station.name
              })
            }
          />
          <AutoComplete
            label={"To"}
            items={state.stations}
            onChange={station =>
              dispatch({
                type: ACTION.SET_TO,
                to: station.name
              })
            }
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

          <fieldset>
            <DateTimePicker onChange={time => console.log(time)} />
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
