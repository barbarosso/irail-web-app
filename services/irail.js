export const getStations = async queryParam => {
  try {
    const response = await fetch(`https://irail.be/stations/NMBS?q=${queryParam}`);
    const result = await response.json();
    const stations = result["@graph"].map(station => ({
      id: station.id,
      name: station.name
    }));
    return stations;
  } catch (error) {
    console.log("fetching data went wrong");
    throw error;
  }
};
