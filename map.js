mapboxgl.accessToken = "pk.eyJ1Ijoic3RlcGhlbmFudGkiLCJhIjoiY2t4NDN5MDJ2MDJkcTJ2cGFjOGk3MW9jcyJ9.idvR4RaqkBIA5w32u482kw";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/stephenanti/cl3ugxwsm001r14pbmpt4ep6c",
  zoom: 3,
  maxZoom: 9,
  minZoom: 3.5,
  center: [-99, 38],
  maxBounds: [
    [-180, 15],
    [-30, 72],
  ],
  projection: 'albers',
});

map.on("load", function () {
    map.addLayer({
      id: "us_states_elections_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/statesElections.geojson",
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.7,
      }

    }, "waterway-label");
    map.addLayer({
      id: "us_states_elections",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/statesElections.geojson",
      },
      maxzoom: 6,
      paint: {
        "fill-color": [
          "match",
          ["get", "Winner"],
          "Donald J Trump", "#cf635d",
          "Joseph R Biden Jr", "#6193c7",
          "Other", "#91b66e",
          "#ffffff",
        ],
        "fill-outline-color": "#ffffff",
        "fill-opacity": [
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
    },"us_states_elections_outline"
    );

    map.addLayer(
        {
          id: "us_counties_elections_outline",
          type: "line",
          source: {
            type: "geojson",
            data: "data/countiesElections.geojson",
          },
          minzoom: 6,
          paint: {
            "line-color": "#ffffff",
            "line-width": 0.25,
          },
        },
        "us_states_elections"
      );
      map.addLayer(
        {
          id: "us_counties_elections",
          type: "fill",
          source: {
            type: "geojson",
            data: "data/countiesElections.geojson",
          },
        minzoom: 6,
          paint: {
            "fill-color": [
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
            "fill-outline-color": "#000000",
            "fill-opacity": [
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
        },
        "us_counties_elections_outline"
      );
  });


  // Create the popup
map.on('click', 'us_states_elections', function (e) {
    var stateName = e.features[0].properties.State;
    var winner = e.features[0].properties.Winner;
    var wnrPerc = e.features[0].properties.WnrPerc;
    var totalVotes = e.features[0].properties.Total;
    wnrPerc = (wnrPerc * 100).toFixed(0);
    totalVotes = totalVotes.toLocaleString();
    stateName = stateName.toUpperCase();
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+stateName+'</h4>'
            +'<h2>'+winner+'</h2>'
            + '<p>'+wnrPerc+'% - ('+totalVotes+' votes)</p>')
        .addTo(map);
});




// Map2 



mapboxgl.accessToken = "pk.eyJ1Ijoic3RlcGhlbmFudGkiLCJhIjoiY2t4NDN5MDJ2MDJkcTJ2cGFjOGk3MW9jcyJ9.idvR4RaqkBIA5w32u482kw";
var map2 = new mapboxgl.Map({
  container: "map2",
  style: "mapbox://styles/stephenanti/cl3z5r2wh000014mv98ip2os2",
  zoom: 3,
  maxZoom: 9,
  minZoom: 3.5,
  center: [-99, 38],
  maxBounds: [
    [-180, 15],
    [-30, 72],
  ],
  projection: 'albers',
});



map2.on("load", function () {
    map2.addLayer(
      {
        id: "us_counties_centroids",
        type: "circle",
        source: {
          type: "geojson",
          data: "data/countiesPoints.geojson",
        },
        paint: {
          'circle-radius':
    ['interpolate', ['linear'], ['zoom'],
        3, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Trump'], ['get', 'Biden']]]], 40], 1],
        9, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Trump'], ['get', 'Biden']]]], 15], 5],
    ],
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
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 0.5,
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


    map2.addLayer(
        {
        id: "us_states_elections_outline",
        type: "line",
        source: {
            type: "geojson",
            data: "data/statesElections.geojson",
        },
        paint: {
            "line-color": "#ffffff",
            "line-width": 0.7,
        },
        },
        "us_counties_centroids"
    );
    map2.addLayer(
        {
        id: "us_counties_elections_outline",
        type: "line",
        source: {
            type: "geojson",
            data: "data/countiesElections.geojson",
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

map2.on('click', 'us_counties_centroids', function (e) {
  var stateName = e.features[0].properties.State;
  var countyName = e.features[0].properties.County;
  var winner = e.features[0].properties.Winner;
  var wnrPerc = e.features[0].properties.WnrPerc;
  var totalVotes = e.features[0].properties.Total;
  wnrPerc = (wnrPerc * 100).toFixed(0);
  totalVotes = totalVotes.toLocaleString();
  stateName = stateName.toUpperCase();
  countyName = countyName.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + countyName + ' - ' + stateName + '</h4>'
          + '<h2>' + winner + '</h2>'
          + '<p>' + wnrPerc + '% - (' + totalVotes + ' votes)</p>')
      .addTo(map2);
});

map2.on('mouseenter', 'us_counties_centroids', function () {
  map2.getCanvas().style.cursor = 'pointer';
});
map2.on('mouseleave', 'us_counties_centroids', function () {
  map2.getCanvas().style.cursor = '';
});
