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

export const getRoutes = async (from, to) => {
  try {
    const response = await fetch(`https://irail.be/route?to=${from}&to=${to}`);
    const result = await response.json();

    return result.connection;
  } catch (error) {
    console.log("fetching data getRoutes went wrong", error.toString());
    throw error;
  }
};
