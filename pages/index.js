import React, { useReducer, useEffect } from "react";
import { getStations, getConnections } from "../services/irail";
import Head from "../components/head";
import Nav from "../components/nav";
import AutoComplete from "../components/auto-complete";
import "./styles.scss";
import { getAPIDateTimeFromTimeStamp } from "../utils/date-utils";
import DateTimePicker from "../components/date-time-picker";

const ACTION = {
  SET_STATIONS: "SET_STATIONS",
  SET_FROM: "SET_FROM",
  SET_TO: "SET_TO",
  SET_DATE: "SET_DATE",
  SET_DEPARTURE: "SET_DEPARTURE",
  SET_CONNECTIONS: "SET_CONNECTIONS",
};

const initialState = {
  lang: "nl",
  stations: [],
  from: null,
  to: null,
  date: new Date(),
  departure: true,
  connections: [],
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.SET_STATIONS:
      return { ...state, stations: action.stations };
    case ACTION.SET_FROM:
      return { ...state, from: action.from };
    case ACTION.SET_TO:
      return { ...state, to: action.to };
    case ACTION.SET_DATE:
      return { ...state, to: action.date };
    case ACTION.SET_DEPARTURE:
      return { ...state, departure: action.departure };
    case ACTION.SET_CONNECTIONS:
      console.log("connections", action.connections);
      return { ...state, connections: action.connections };
    default:
      throw new Error("no valid action given to the reducer", action.type);
  }
}

export async function getStaticProps(context) {
  const stations = await getStations();

  return {
    props: {
      stations: stations,
    }, // will be passed to the page component as props
  };
}

const Search = ({ stations }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  });


  async function onSubmit(event) {
    event.preventDefault();
    const dateTimeObject = getAPIDateTimeFromTimeStamp(state.date.getTime());
    const routeOptions = {
      date: dateTimeObject.date,
      time: dateTimeObject.time,
      timeSel: "depart",
      lang: "nl",
    };

    const connections = await getConnections(
      state.from,
      state.to,
      routeOptions
    );
    dispatch({
      type: ACTION.SET_CONNECTIONS,
      connections,
    });
  }

  return (
    <div className="o-wrapper">
      <Head title="Home" />
      <Nav />

      <div className="o-layout hero">
        <h1 className="title o-layout__item">Plan uw route </h1>
        <p className="description o-layout__item">Zoek uw station</p>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <div className="o-layout">
            <div className="o-layout__item u-1-of-2-at-small">
              <AutoComplete
                label={"From"}
                items={stations}
                onChange={(station) =>
                  dispatch({
                    type: ACTION.SET_FROM,
                    from: station.name,
                  })
                } 
              />
            </div>
            <div className="o-layout__item u-1-of-2-at-small">
               <AutoComplete
                label={"To"}
                items={stations}
                onChange={(station) =>
                  dispatch({
                    type: ACTION.SET_TO,
                    to: station.name,
                  })
                }
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
                onChange={(event) =>
                  dispatch({
                    type: ACTION.SET_DEPARTURE,
                    departure: true,
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
                onChange={(event) =>
                  dispatch({
                    type: ACTION.SET_DEPARTURE,
                    departure: false,
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
              <DateTimePicker
                onChange={(date) => {
                  dispatch({
                    type: ACTION.SET_DATE,
                    date,
                  });
                }}
              />
            </div>
          </fieldset>
          <button
            className={`c-button c-button--primary ${
              (!state.from || !state.to) && "c-button--disabled"
            }`}
            type="submit"
            disabled={!state.from || !state.to}
          >
            Plan route
          </button>
        </form>
      </div>
      <div>{JSON.stringify(state.connections)}</div>
    </div>
  );
};

export default Search;
