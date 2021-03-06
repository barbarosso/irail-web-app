export const getStations = async (lang = "nl") => {
  try {
    const response = await fetch(
      `https://api.irail.be/stations/?format=json&lang=${lang}`
    );
    const result = await response.json();
    const stations = result.station.map(station => ({
      id: station["@id"],
      name: station.name
    }));
    return stations;
  } catch (error) {
    console.log("fetching data went wrong");
    throw error;
  }
};

export const getConnections = async (
  from,
  to,
  { date, time, timeSel = "depart", lang = "nl" }
) => {
  try {
    const response = await fetch(
      `https://api.irail.be/connections/?from=${from}&to=${to}&date=${date}&time=${time}&timesel=departure&format=json&lang=en&typeOfTransport=automatic&alerts=false&results=6`,
      {
        headers: new Headers({
          accept: "application/json"
        })
      }
    );
    const result = await response.json();

    return result.connection;
  } catch (error) {
    console.log("fetching data getRoutes went wrong", error.toString());
    throw error;
  }
};
