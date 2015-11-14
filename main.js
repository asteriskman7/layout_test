'use strict';

console.log('init');

function getImageData() {
  return {
    width: 9,
    height: 19,
    layers: {
      nwell: [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0],
      pwell: [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0],
      pc:    [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0],
      v0:    [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1,0, 0,0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0],
      m1:    [1,1,1,1,1,1,1,1,1, 0,0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,1,0, 1,1,1,1,1,0,0,1,1, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,1,0, 0,0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 1,1,1,1,1,1,1,1,1],
      v1:    [1,0,1,0,1,0,1,0,1, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0],
      m2:    [1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0]
    }
  };
}

function resizeLayer(layer, oldW, oldH, newW, newH) {
  var result = [];
  var newVal;
  for (var y = 0; y < newH; y++) {
    for (var x = 0; x < newW; x++) {
      if ((y >= oldH) || (x >= oldW)) {
        newVal = 0;
      } else {
        newVal = layer[y * oldW + x];
      }
      result[y * newW + x] = newVal;
    }
  }
  return result;
}

function resizeAllLayers(layoutData, newW, newH) {
  var oldW = layoutData.width;
  var oldH = layoutData.height;
  layoutData.width = newW;
  layoutData.height = newH;
  for (var layerName in layoutData.layers) {
    layoutData.layers[layerName] = resizeLayer(layoutData.layers[layerName], oldW, oldH, newW, newH);
  }
  return layoutData;
}

function drawLayout(ctx, canvasW, canvasH, layoutData, selection) {
  var gridSize = 15;
  var gridOriginX = 0;
  var gridOriginY = 0;
  var gridWidth = Math.floor(canvasW / gridSize);
  var gridHeight = Math.floor(canvasH / gridSize);
  console.log('drawing layout');
  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.save();
  ctx.translate(-gridSize *  gridOriginX, -gridSize * gridOriginY);
  //draw layers
  var layerList = [
    {name: 'pwell', type: 'normal', color: 'rgba(0,255,0,1)'},
    {name: 'nwell', type: 'normal', color: 'rgba(255,255,0,1)'},
    {name: 'pc', type: 'normal', color: 'rgba(255, 0, 255, 0.75)'},
    {name: 'm1', type: 'normal', color: 'rgba(0, 0, 255, 0.75)'},
    {name: 'v0', type: 'via', color: 'rgba(255, 255, 255, 1)'},
    {name: 'm2', type: 'normal', color: 'rgba(255, 0, 0, 0.75)'},
    {name: 'v1', type: 'via', color: 'rgba(255, 255, 0, 1)'},
  ];
  var layerData;  
  
  layerList.forEach(
    function(v) {
      layerData = layoutData.layers[v.name];
      if (layerData !== undefined) {        
        for (var y = 0; y < gridHeight; y++) {
          for (var x = 0; x < gridWidth; x++) { 
            if (layerData[y * gridWidth + x] === 1) {
              switch (v.type) {
                case 'normal': 
                  ctx.fillStyle = v.color;
                  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
                  break;
                case 'via':
                  ctx.strokeStyle = v.color;
                  ctx.beginPath();
                  ctx.arc(x * gridSize + gridSize * 0.5 + 0.5, y * gridSize + gridSize * 0.5 + 0.5, gridSize * 0.5 * 0.75, 0, 2 * Math.PI);
                  ctx.stroke();
                  break;
              }              
            }
          }
        }
      }       
    }
  );
  
  var selectedIndex;
  var x;
  var y;
  for (var i = 0; i < selection.length; i++) {
    selectedIndex = selection[i];
    y = Math.floor(selectedIndex / gridWidth);
    x = selectedIndex % gridWidth;
    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.beginPath();
    ctx.moveTo(x * gridSize, y * gridSize);
    ctx.lineTo(x * gridSize + gridSize, y * gridSize + gridSize);
    ctx.stroke();
  }
  
  ctx.restore();
  ctx.save();
  //draw grid
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  for (x = 1; x < Math.ceil(canvasW / gridSize); x++) {
    ctx.beginPath();
    ctx.moveTo(x * gridSize+0.5, 0);
    ctx.lineTo(x * gridSize+0.5, canvasH);
    ctx.stroke();
  }
  for (y = 1; y < Math.ceil(canvasH / gridSize); y++) {
    ctx.beginPath();
    ctx.moveTo(0,       y * gridSize+0.5);
    ctx.lineTo(canvasW, y * gridSize+0.5);
    ctx.stroke();
  }
  ctx.restore();
}



var canvas = document.getElementById('canvas_layout');
var ctx = canvas.getContext('2d');

var layoutData = resizeAllLayers(getImageData(), 20, 20);

var design = extractor.extract(layoutData);

var selection = extractor.extractLayerGroups(layoutData.layers.m1, 20, 20);

drawLayout(ctx, canvas.width, canvas.height, layoutData, []);

document.getElementById('button_redraw').onclick = function() {drawLayout(ctx, canvas.width, canvas.height, layoutData, [])};