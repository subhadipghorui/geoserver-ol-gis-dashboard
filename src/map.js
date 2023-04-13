// ////////////////////////////////////////
// Controls

///////////////////////////////////////////
// LayerSwtching Control
var button = document.createElement("button");
button.innerHTML = '<i class="fa fa-server" aria-hidden="true"></i>';

var handleLayerSwitcherControl = function (e) {
  $("#layers-panel").toggle();
};

button.addEventListener("click", handleLayerSwitcherControl, false);

var element = document.createElement("div");
element.className = "layer-switcher ol-selectable ol-control";
element.appendChild(button);

var LayerSwitcherControl = new ol.control.Control({
  element: element,
});

///////////////////////////////////////////
// Geolocate Control
var button = document.createElement("button");
button.innerHTML = '<i class="fa fa-compass" aria-hidden="true"></i>';

var handleGeolocate = function (e) {
  console.log("Run geolocate");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      map.setView(
        new ol.View({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 10,
          projection: "EPSG:4326",
        })
      );
      // document.getElementById("lat").value = position.coords.latitude;
      // document.getElementById("long").value = position.coords.longitude;
      // document.getElementById("locationAccuracy").innerText =
      //   "Accuracy(meter) : " + position.coords.accuracy;
    });
  } else {
    console.log("Geolocation Not Available.");
  }
};

button.addEventListener("click", handleGeolocate, false);

var element = document.createElement("div");
element.className = "geolocate ol-selectable ol-control";
element.appendChild(button);

var GeolocateController = new ol.control.Control({
  element: element,
});

// //////////////////////////////////////////
// Map
let map;
map = new ol.Map({
  view: new ol.View({
    center: [147.18348907448888, -42.65119147437143],
    zoom: 6,
    projection: "EPSG:4326",
  }),
  target: "map",
  controls: new ol.control.defaults().extend([
    new ol.control.FullScreen({
      source: "fullscreen", // for redering modalas and other elements.
    }),
    LayerSwitcherControl,
    GeolocateController,
  ]),
});
map.on('click', function(e){
  console.log(e.coordinate)
})
////////////////////////////////////////////
// Base Layers
// Openstreet Map Standard
const openstreetMapStandard = new ol.layer.Tile({
  source: new ol.source.OSM(),
  visible: true,
  title: "OSM Standard",
});
// Esri Satelite
var mapLink = '<a href="http://www.esri.com/">Esri</a>';
var wholink =
  "i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community";
const esriSatellite = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attributions: '&copy; '+mapLink+', '+wholink,
  }),
  maxZoom:18,
  visible: false,
  title: "Esri Satelite",
});

// Google
// var googleLayerRoadNames=new ol.layer.Tile({
//   title: "Google Road Names",
//   source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}' }),
// });

// var googleLayerRoadmap=new ol.layer.Tile({
//   title: "Google Road Map",
//   source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' }),
// });

// var googleLayerSatellite =new ol.layer.Tile({
//   title: "Google Satellite",
//   source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}' }),
// });

// var googleLayerHybrid =new ol.layer.Tile({
//   title: "Google Satellite & Roads",
//   source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' }),
// });

// var googleLayerTerrain =new ol.layer.Tile({
//   title: "Google Terrain",
//   source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}' }),
// });

// var googleLayerHybrid2 =new ol.layer.Tile({
//   title: "Google Terrain & Roads",
//   source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' }),
// }); 

// var googleLayerOnlyRoad=new ol.layer.Tile({
//   title: "Google Road without Building",
//   source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}' }),
// });
// Openstreet Map Humanitarian
const openstreetMapHumanitarian = new ol.layer.Tile({
  source: new ol.source.OSM({
    url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  }),
  visible: false,
  title: "OSM Humanitarian",
});

// Bing Maps Basemap Layer
const bingMaps = new ol.layer.Tile({
  source: new ol.source.BingMaps({
    key: "Amc8Idj-8lA4y51ZoCnbEMiMu-MRcQXLEB3-LylaaItC4JFWZ_ARpF7zt9pgALJL",
    imagerySet: "CanvasGray", // Road, CanvasDark, CanvasGray
  }),
  visible: false,
  title: "Bing Maps",
});

// CartoDB BaseMap Layer
const cartoDBBaseLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
    attributions: "© CARTO",
  }),
  visible: false,
  title: "Carto Dark All",
});

// Stamen basemap layer
const StamenTerrainWithLabels = new ol.layer.Tile({
  source: new ol.source.Stamen({
    layer: "terrain-labels",
    attributions:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
  }),
  visible: false,
  title: "Stamen Terrain With Labels",
});

const StamenTerrain = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
    attributions:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
  }),
  visible: false,
  title: "Stamen Terrain",
});

// Base Vector Layers
// Vector Tile Layer OpenstreetMap
const openstreetMapVectorTile = new ol.layer.Tile({
  source: new ol.source.TileJSON({
    url: "https://api.maptiler.com/maps/hybrid/tiles.json?key=8bEw6oE9fyDPrElX2XXO",
    tileSize: 512,
    crossOrigin: "anonymous",
  }),
  visible: false,
  title: "Vector Tile Layer OSM",
});

// Base Layer Group
const baseLayerGroup = new ol.layer.Group({
  layers: [
    openstreetMapStandard,
    esriSatellite,
    openstreetMapHumanitarian,
    bingMaps,
    cartoDBBaseLayer,
    StamenTerrainWithLabels,
    StamenTerrain,
    openstreetMapVectorTile,
  ],
  title: "Base Maps",
});
map.addLayer(baseLayerGroup);

////////////////////////////////////////////
// Get Feature
// const wmsSource = new ol.source.TileWMS({
//   url: 'http://localhost:8080/geoserver217/wms',
//   params: {'LAYERS': 'topp:tasmania_state_boundaries', 'TILED': true},
//   serverType: 'geoserver',
//   crossOrigin: 'anonymous',
// });

// const wmsLayer = getWMSTileLayer('http://localhost:8080/geoserver217/wms',
//                 'topp:tasmania_state_boundaries',
//                 'TAsmania',
//                 true,
//                 )
// map.addLayer(wmsLayer);
/////////////////////////////////////////////////////////////////////////////////
// Event
// map.on('singleclick', function (evt) {
//   console.log(evt.coordinate);
//   document.getElementById('layer-info').innerHTML = '';
//   var viewResolution = /** @type {number} */ (map.getView().getResolution());
//   var url = wmsLayer.getSource().getFeatureInfoUrl(
//     evt.coordinate,
//     viewResolution,
//     'EPSG:4326',
//     {'INFO_FORMAT': 'text/html'}
//   );
//   console.log(url);

//   if (url) {
//     fetch(url)
//       .then(function (response) { return response.text(); })
//       .then(function (html) {
//         document.getElementById('layer-info').innerHTML = html;
//       });
//   }
// });

//////////////////////////////////////////////////////////////////////
// Add WMS Image Layer functions
function getWMSImageLayer(
  url,
  layerName,
  title,
  visibility,
  extent = null,
  zIndex
) {
  let wmsImageLayer = new ol.layer.Image({
    extent: extent,
    source: new ol.source.ImageWMS({
      url: url,
      params: { LAYERS: layerName },
      ratio: 1,
      // serverType: 'geoserver',
    }),
    title: title,
    visible: visibility,
    zIndex: zIndex,
  });
  return wmsImageLayer;
}
//////////////////////////////////////////////////////////////////////
// Add WMS Tile Layer functions
function getWMSTileLayer(
  url,
  layerName,
  title,
  visibility,
  extent = null,
  zIndex
) {
  let wmsTileSource = new ol.source.TileWMS({
    url: url,
    params: { LAYERS: layerName, TILED: true },
    ratio: 1,
    serverType: "geoserver",
  });
  let wmsTilelayer = new ol.layer.Tile({
    source: wmsTileSource,
    title: title,
    visible: visibility,
    extent: extent,
    zIndex: zIndex,
  });
  return wmsTilelayer;
}
/////////////////////////////////////////////////////////////////////
// Upload Local File
// Geojson
function loadGeoJSONToMap(geojsonObject, title) {
  var geojsonVectorSource = new ol.source.Vector({
    features: new ol.format.GeoJSON().readFeatures(geojsonObject),
  });
  var geojsonVectorLayer = new ol.layer.Vector({
    title: title,
    source: geojsonVectorSource,
    extent: geojsonVectorSource.getExtent(),
    zIndex: map.getLayers().getLength(),
  });
  map.addLayer(geojsonVectorLayer);
  loadLayerPanel();
}

// KML
function loadKMLToMap(kmlObject, title) {
  var kmlVectorSource = new ol.source.Vector({
    features: new ol.format.KML().readFeatures(kmlObject),
  });
  var kmlLayer = new ol.layer.Vector({
    source: kmlVectorSource,
    title: title,
    extent: kmlVectorSource.getExtent(),
    zIndex: map.getLayers().getLength(),
  });
  map.addLayer(kmlLayer);
  loadLayerPanel();
}

/////////////////////////////////////////////////////////////////////
// Default Layers
// WMS Tile Layers
let wb_wmts = getWMSTileLayer(
  "https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms",
  "lulc:WB_LULC50K_0506",
  "West Bengal LULC 3",
  false,
  [85.82, 21.481, 89.886, 27.22],
  3
);
map.addLayer(wb_wmts);
let landDegradation_wmts = getWMSTileLayer(
  "https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms",
  "ld:WB_LD50K_0506",
  "WB Land Degradation 4",
  false,
  [85.82, 21.481, 89.886, 27.22],
  4
);
map.addLayer(landDegradation_wmts);
let asssam_wmts = getWMSTileLayer(
  "https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms",
  "lulc:AS_LULC50K_1516",
  "Assam LULC 2",
  false,
  [89.701, 24.135, 96.021, 27.977],
  2
);
map.addLayer(asssam_wmts);
let asssamFlood_wmts = getWMSTileLayer(
  "https://bhuvan-ras2.nrsc.gov.in/cgi-bin/hazard.exe",
  "as_hz",
  "Assam Flood Hazard 1",
  false,
  [89.701, 24.135, 96.021, 27.977],
  1
);
map.addLayer(asssamFlood_wmts);
// let bihar_wmts = getWMSTileLayer(
//   "https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms",
//   "lulc:BR_LULC50K_1516",
//   "Bihar LULC 1",
//   true,
//   [83.323,24.286,88.298,27.521],
//   1
//   );
// map.addLayer(bihar_wmts);
// let jharkhand_wmts = getWMSTileLayer(
//   "https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms",
//   "lulc:JH_LULC50K_1516",
//   "Bihar LULC 1",
//   true,
//   [83.33,21.97,87.962,25.349],
//   4
//   );
// map.addLayer(jharkhand_wmts);
// Layer Group
// const layerGroup = new ol.layer.Group({
//   layers:[
//     glacial_himalayas_wmts, wb_wmts
//   ],
//   title: 'Layers'
// })
// map.addLayer(layerGroup);
