export const getStations = async queryParam => {
  try {
    const response = await fetch(
      `https://irail.be/stations/NMBS?q=${queryParam}`
    );
    const result = await response.json();
    const stations = result["@graph"].map(station => ({
      id: station["@id"],
      name: station.name
    }));
    return stations;
  } catch (error) {
    console.log("fetching data went wrong");
    throw error;
  }
};

export const getRoutes = async (
  from,
  to,
  { date, time, timeSel = "depart", lang = "nl" }
) => {
  try {
    const response = await fetch(
      `http://api.irail.be/connections/?from=${from}&to=${to}&date=${date}&time=${time}&timeSel=${timeSel}&format=json&lang=${lang}&fast=false&typeOfTransport=trains&alerts=false&results=6`,
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
