import React, { useReducer } from "react";
import { getStations, getRoutes } from "../services/irail";
import Head from "../components/head";
import Nav from "../components/nav";
import AutoComplete from "../components/auto-complete";
import "./styles.scss";
import TimePicker from "../components/date-time-picker";
import DateTimePicker from "../components/date-time-picker";

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
  time: null,
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
    <div className="o-wrapper">
      <Head title="Home" />
      <Nav />

      <div className="hero">
        <h1 className="title">Plan uw route </h1>
        <p className="description">Zoek uw station</p>
      </div>
      <div>
        
        <form onSubmit={onSubmit}>
          <div className="o-layout">
          <div className="o-layout__item u-1-of-2-at-small">

          
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
          </div>
          <div className="o-layout__item u-1-of-2-at-small">

          
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
            </div>
            </div>
          <fieldset id="arrive-departure" className="o-layout">
            
              <div className="c-input--radiobutton o-layout__item u-1-of-3-at-small u-1-of-4-at-medium">
                
                  <input
                    id="departure"
                    className="c-input__field-radiobutton"
                    type="radio"
                    value="departure"
                    name="arrive-departure"
                    onChange={event =>
                      dispatch({
                        type: ACTION.SET_DEPARTURE,
                        departure: true
                      })
                    }
                    checked={state.departure === true}
                  />
                <label htmlFor="departure" className="c-input__label">
                  Departure on:
                </label>
              </div>
            

              <div className="c-input--radiobutton o-layout__item u-1-of-3-at-small u-1-of-4-at-medium">
                
                <input
                  id="arrive"
                  className="c-input__field-radiobutton"
                  type="radio"
                  value="arrive"
                  name="arrive-departure"
                  onChange={event =>
                    dispatch({
                      type: ACTION.SET_DEPARTURE,
                      departure: false
                    })
                  }
                  checked={state.departure === false}
                />
                <label htmlFor="arrive" className="c-input__label">
                  Arrive on:
                </label>
              </div>
          </fieldset>

          <fieldset className="o-layout">
            <div className="o-layout__item">
            <DateTimePicker onChange={time => console.log(time)} />
            </div>
          </fieldset>
          <button className={`c-button c-button--primary ${(!state.from || !state.to) && 'c-button--disabled'}`} type="submit" disabled={!state.from || !state.to}>
            Plan route
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
