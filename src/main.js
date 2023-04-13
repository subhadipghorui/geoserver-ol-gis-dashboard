//////////////////////////////////////////////////////////////////////
// Load Layers to Layer Panel
loadLayerPanel();

//////////////////////////////////////////////////////////////////////
// getWMSImageLayer function and add to layer-panel
let getWMSImageLayerBtn = document.getElementById("getWMSImageLayerBtn");
getWMSImageLayerBtn.addEventListener("click", () => {
  let wmsImageUrl = document.getElementById("wmsImageUrl").value;
  let wmsImageLayerName = document.getElementById("wmsImageLayerName").value;
  let wmsImageLayerExtent = document.getElementById("wmsImageLayerExtent").value;
  let wmsImageLayerVisibility = document.getElementById(
    "wmsImageLayerVisibility"
    ).checked;
    let wmsImageLayerTitle = document.getElementById("wmsImageLayerTitle").value;
    let layerZIndex = map.getLayers().getLength();
  // Conver Layer Extent to array
  let lyrExt=[];
  let lyrExtNumber;
  if(wmsImageLayerExtent !=""){
    lyrExtNumber = [];
    lyrExt = wmsImageLayerExtent.split(',');
    lyrExt.forEach(function(e){
      lyrExtNumber.push(parseFloat(e))
    });
  }
  else{
    lyrExtNumber = null;
  }
  let getWmsLayer = getWMSImageLayer(
    wmsImageUrl,
    wmsImageLayerName,
    wmsImageLayerTitle,
    wmsImageLayerVisibility,
    lyrExtNumber,
    layerZIndex
  );

  // layerGroup.setLayer(getWmsLayer);
  // add layer to layerGroup
  map.addLayer(getWmsLayer);

  // Hide the Modal
  $("#wmsImageModal").modal("hide");
  // refresh the layer panel
  loadLayerPanel();
  // alert('WMS Image Layer Added.')
});
//////////////////////////////////////////////////////////////////////
// getWMSTileLayer function and add to layer-panel
let getWMSTileLayerBtn = document.getElementById("getWMSTileLayerBtn");
getWMSTileLayerBtn.addEventListener("click", () => {
  let wmsTileUrl = document.getElementById("wmsTileUrl").value;
  let wmsTileLayerName = document.getElementById("wmsTileLayerName").value;
  let wmsTileLayerTitle = document.getElementById("wmsTileLayerTitle").value;
  let wmsTileLayerVisibility = document.getElementById("wmsTileLayerVisibility").checked;
  let wmsTileLayerExtent = document.getElementById("wmsTileLayerExtent").value;
  let layerZIndex = map.getLayers().getLength();
    // Conver Layer Extent to array
  let lyrExt=[];
  let lyrExtNumber;
  if(wmsTileLayerExtent !=""){
    lyrExtNumber = [];
    lyrExt = wmsTileLayerExtent.split(',');
    lyrExt.forEach(function(e){
      lyrExtNumber.push(parseFloat(e))
    });
  }
  else{
    lyrExtNumber = null;
  }
  console.log(lyrExtNumber);
  let getWmsTileLayer = getWMSTileLayer(
    wmsTileUrl,
    wmsTileLayerName,
    wmsTileLayerTitle,
    wmsTileLayerVisibility,
    lyrExtNumber,
    layerZIndex
  );

  // layerGroup.setLayer(getWmsLayer);
  // add layer to layerGroup
  map.addLayer(getWmsTileLayer);

  // Hide the Modal
  $("#wmsTileModal").modal("hide");
  // refresh the layer panel
  loadLayerPanel();
  // alert('WMS Image Layer Added.')
});

///////////////////////////////////////////////////////////////////
// Base Layer Switching
let baseLayerElement = document.getElementById("baselayer");
baseLayerElement.addEventListener("click", function () {
  // grab the element value or text
  let baseLayerElementValue = baseLayerElement.value;
  // Find the base layer from baseLayergroup
  baseLayerGroup.getLayers().forEach((layer, i) => {
    let baseLayerName = layer.get("title");
    // console.log(
    //   baseLayerName,
    //   baseLayerName == baseLayerElementValue,
    //   baseLayerElementValue
    // );
    layer.setVisible(baseLayerName == baseLayerElementValue);
  });
});


// //////////////////////////////////////////////////////////////
// File Uplaod
const inputElement = document.getElementById("uploadedFile");
let result;
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const file = this.files[0]; /* now you can work with the file list */
  // console.log(file);
  // 
  if(file){
      const reader = new FileReader();
      // console.log(reader);
      reader.addEventListener('load', function(){
          result =this.result;
          // loadGeoJSONToMap(JSON.parse(result))
      });
      reader.readAsText(file)
  } 
};
const uploadLayerFileBtn = document.getElementById("layerUploadModalBtn");
let uploadLayerFileTitle = document.getElementById("layerUploadModalTitle");
let uploadLayerFileType=document.getElementById("layerUploadModalType"); 
uploadLayerFileBtn.addEventListener('click', function(){
  if(result){
    let x = uploadLayerFileType.value;
    switch (x) {
      case 'GeoJSON':
        loadGeoJSONToMap(JSON.parse(result),uploadLayerFileTitle.value)
        break;
      case 'KML':
        loadKMLToMap(result,uploadLayerFileTitle.value)
        break;
      default:
        alert('Invalid')
    }
    // Clear the form
    uploadLayerFileTitle.value = "";
    uploadLayerFileType.value = "";
    result=null;

    $('#layerUploadModal').modal('hide')
  }else{
    alert('Upload a Layer First!');
  }
})

