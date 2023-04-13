///////////////////////////////////////////////////////////////////////
// layers panel Toggle
$("#layers-panel-switch").click(function () {
  $("#layers-panel").toggle();
});

///////////////////////////////////////////////////////////////////////
// Layers-panel Functions
let layerList = document.getElementById("layerList"); // target div
let layersHtml = "";

function loadLayerPanel() {
  layersHtml = "";
  map.getLayers().array_.sort(function (a, b) {
    if (a.getZIndex() != undefined || b.getZIndex() != undefined) {
      // console.log(a.get("title"), a.getZIndex(), b.get("title"), b.getZIndex());
      return b.getZIndex() - a.getZIndex();
    }
  });
  map.getLayers().array_.forEach(function (element, index, array) {
    let layerTitle = element.get("title");
    // console.log(layerTitle);

    if (layerTitle != undefined) {
      layersHtml += `<li id="${layerTitle}" class="list-group-item d-flex justify-content-between" aria-disabled="true">
      <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" name="${layerTitle}" value="${layerTitle}"`;

      element.get("visible") ? (layersHtml += "checked") : "";

      layersHtml += `>
          <label class="form-check-label" for="${layerTitle}">
              ${layerTitle}
          </label>
      </div>
      <div class="px-1 d-flex" id="layer-control">
          <i class="fas fa-arrow-up px-2 my-auto" id="layerUp" data-layer-name="${layerTitle}"></i> 
          <i class="fas fa-arrow-down px-2 my-auto" id="layerDown" data-layer-name="${layerTitle}"></i>
          <div class="dropdown my-auto">
            <button class="btn btn-sm btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Action
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="layer-actions">
              <a class="dropdown-item" href="#" id="zoomToLayer" data-layer-name="${layerTitle}">Zoom to Layer</a>
              <a class="dropdown-item" href="#" id="removeLayer" data-layer-name="${layerTitle}">Remove</a>
              <div class="dropdown-item">
                <div class="form-group">
                  <label for="${layerTitle}">Opacity</label>
                  <input type="range" class="form-control-range" id="layerOpacity" data-layer-name="${layerTitle}" value=100>
                </div>
              </div>
            </div>
          </div>
      </div>
  </li>`;
    }
  });
  layerList.innerHTML = layersHtml;

  // Add/update Layer Visility Function
  layerVisiblityEvent();
  layerRemoveFromPanelEvent();
  layerOpacityEvent();
  zoomToLayerEvent();
  layerZIndexUpEvent();
  layerZIndexDownEvent();
}

///////////////////////////////////////////////////////////////////
// Panel Layer Visibility
function layerVisiblityEvent() {
  let layerElements = document.querySelectorAll(
    "#layerList > li div.form-check input[type=checkbox]"
  );
  for (let layerElement of layerElements) {
    // console.log(layerElement);
    layerElement.addEventListener("change", function () {
      // grab the element value or text
      let layerElementValue = this.value;
      let layer;
      map.getLayers().array_.forEach(function (element, index, array) {
        if (layerElementValue === element.get("title")) {
          layer = element;
        }
      });
      this.checked ? layer.setVisible(true) : layer.setVisible(false);
    });
  }
}

////////////////////////////////////////////////////////////////////
// Panel Layer Remove
function layerRemoveFromPanelEvent() {
  let layerRemoveElements = document.querySelectorAll(
    "#layerList > li div#layer-control div#layer-actions a#removeLayer"
  );
  for (let layerRemoveElement of layerRemoveElements) {
    layerRemoveElement.addEventListener("click", function () {
      // element layer name is store on data-layer-name attribute
      layerRemoveElementValue = this.getAttribute("data-layer-name");
      // console.log(layerRemoveElementValue)

      // Get the Layer from map
      let layer;
      map.getLayers().array_.forEach(function (element, index, array) {
        if (layerRemoveElementValue === element.get("title")) {
          layer = element;
        }
      });

      // Do something
      map.removeLayer(layer);
      // Need to update the Layer-panel DOM
      loadLayerPanel();
    });
  }
}

///////////////////////////////////////////////////////////////////
// Change Layer Opacity
function layerOpacityEvent() {
  let layerOpacityElements = document.querySelectorAll(
    "#layerList > li div#layer-control div#layer-actions input#layerOpacity"
  );
  for (let layerOpacityElement of layerOpacityElements) {
    layerOpacityElement.addEventListener("mousemove", function () {
      // element layer name is store on data-layer-name attribute
      layerOpacityElementName = this.getAttribute("data-layer-name");
      layerOpacityElementValue = parseInt(this.value); // convert value to number

      // Get the Layer from map
      let layer;
      map.getLayers().array_.forEach(function (element, index, array) {
        if (layerOpacityElementName === element.get("title")) {
          layer = element;
        }
      });

      // Do something
      layer.setOpacity(layerOpacityElementValue / 100); // opacity 0 - 1
    });
  }
}

///////////////////////////////////////////////////////////////////
// Zoom To Layer Event
function zoomToLayerEvent() {
  let zoomToLayerElements = document.querySelectorAll(
    "#layerList > li div#layer-control div#layer-actions a#zoomToLayer"
  );
  for (let zoomToLayerElement of zoomToLayerElements) {
    zoomToLayerElement.addEventListener("click", function () {
      // element layer name is store on data-layer-name attribute
      zoomToLayerElementName = this.getAttribute("data-layer-name");

      // Get the Layer from map
      let layer;
      map.getLayers().array_.forEach(function (element, index, array) {
        if (zoomToLayerElementName === element.get("title")) {
          layer = element;
        }
      });
      // Do something
      lyrExt = layer.getExtent(); // opacity 0 - 1
      map.getView().fit(lyrExt);

      // New by wms get capabilities
      // console.log(layer.getSource().urls[0]);
      // fetch(layer.getSource().urls[0]+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities').then(function(response) {
      //   return response.text();
      // }).then(function(text) {
      //   var parser = new ol.format.WMSCapabilities();
      //   var result = parser.read(text);
      //   var extent = result.Capability.Layer.Layer.find(l => l.Name === zoomToLayerElementName).EX_GeographicBoundingBox;
      //   console.log(result)
      // })
    });
  }
}


////////////////////////////////////////////////////////////////////
//  Layer Z Index
function layerZIndexUpEvent() {
  let layerUpElements = document.querySelectorAll(
    "#layerList > li div#layer-control i#layerUp"
  );
  for (let layerUpElement of layerUpElements) {
    layerUpElement.addEventListener("click", function () {
      // element layer name is store on data-layer-name attribute
      layerUpElementValue = this.getAttribute("data-layer-name");
      // console.log(layerUpElementValue)

      // Get the Layer from map
      let layer;
      let previousLayer;
      map.getLayers().array_.forEach(function (element, index, array) {
        if (layerUpElementValue === element.get("title")) {
          layer = element;
          previousLayer = array[index - 1];
        }
      });
      // console.log(layer.get("title"), previousLayer.get("title"));

      // // Get layer Z Index
      let layerZIndex = layer.getZIndex();
      // // Do something
      layer.setZIndex(layerZIndex + 1);
      previousLayer.setZIndex(layerZIndex);
      // Need to update the Layer-panel DOM
      loadLayerPanel();
    });
  }
}
function layerZIndexDownEvent(){
let layerDownElements = document.querySelectorAll(
  "#layerList > li div#layer-control i#layerDown"
);
for (let layerDownElement of layerDownElements) {
  layerDownElement.addEventListener("click", function () {
    // element layer name is store on data-layer-name attribute
    layerDownElementValue = this.getAttribute("data-layer-name");
    // console.log(layerDownElementValue)

    // Get the Layer from map
    let layer;
    let nextLayer;
    map.getLayers().array_.forEach(function (element, index, array) {
      if (layerDownElementValue === element.get("title")) {
        layer = element;
        nextLayer = array[index+1];
      }
    });
    // console.log(layer.get('title'), nextLayer.get('title'))

    // // Get layer Z Index
    let layerZIndex = layer.getZIndex();
    // // Do something
    layer.setZIndex(layerZIndex-1);
    nextLayer.setZIndex(layerZIndex);
    // Need to update the Layer-panel DOM
    loadLayerPanel();
  });
}
}
