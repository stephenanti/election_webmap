mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcGhlbmFudGkiLCJhIjoiY2t4NDN5MDJ2MDJkcTJ2cGFjOGk3MW9jcyJ9.idvR4RaqkBIA5w32u482kw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/stephenanti/cl3z5r2wh000014mv98ip2os2',
    zoom: 6.5,
    maxZoom: 9,
    minZoom: 3,
    center: [-85.5, 37.7]
});

map.on("load", function () {
    map.addLayer(
        {
        id: "us_counties_centroids",
        type: "circle",
        source: {
            type: "geojson",
            data: "countiesPoints.geojson",
        },
        paint: {
            "circle-radius": 5,
            "circle-color": [
            "match",
            ["get", "Winner"],
            "Donald J Trump",
            "#cf635d",
            "Joseph R Biden Jr",
            "#6193c7",
            "Other",
            "#91b66e",
            "#ffffff",
            ],
            "circle-stroke-color": "#000000",
            "circle-opacity": [
            "step",
            ["get", "WnrPerc"],
            0.3,
            0.4,
            0.5,
            0.5,
            0.7,
            0.6,
            0.9,
            ],
        },
        minzoom: 3,
        },
        "waterway-label"
    );
    map.addLayer(
        {
        id: "us_states_elections_outline",
        type: "line",
        source: {
            type: "geojson",
            data: "statesElections.geojson",
        },
        paint: {
            "line-color": "#ffffff",
            "line-width": 0.7,
        },
        },
        "us_counties_centroids"
    );
    map.addLayer(
        {
        id: "us_counties_elections_outline",
        type: "line",
        source: {
            type: "geojson",
            data: "countiesElections.geojson",
        },
        minzoom: 6,
        paint: {
            "line-color": "#ffffff",
            "line-width": 0.25,
        },
        },
        "us_states_elections_outline"
    );
});