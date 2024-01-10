mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FjaGluNTMiLCJhIjoiY2xteDhycmIyMDd3MDJrcXkzcGhjbTBpcCJ9.mPeSSH07Ft3gwK59uwYjMA";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 4,
  center: [82.1025, 25.7041],
});
// Fetch stores from API
async function getStores() {
  const res = await fetch("/api/v1/stores");
  const datas = await res.json();
  console.log(datas);
  const stores = datas.data.map((store) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0], // lat
          store.location.coordinates[1], // long
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: "shop",
      },
    };
  });

  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  map.on("load", function () {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores,
        },
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top",
      },
    });
  });
}
getStores();
