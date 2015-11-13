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



function printLayer(w, h, data) {
  var row;
  for(var y = 0; y < h; y++) {
    row = '';
    for (var x = 0; x < w; x++) {
      //console.log(x + ' ' + y);
      row += data[y * w + x].toString();
    }
    //console.log(y + ' ' + row);
    console.log(row); 
  }
}

var layoutData = getImageData();

var design = extractor.extract(layoutData);

function drawLayout(ctx, canvasW, canvasH, layoutData) {
  var gridSize = 15;
  var gridOriginX = 0;
  var gridOriginY = 0;
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
        for (var y = 0; y < layoutData.height; y++) {
          for (var x = 0; x < layoutData.width; x++) { 
            if (layerData[y * layoutData.width + x] === 1) {
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
  
  ctx.restore();
  ctx.save();
  //draw grid
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  for (var x = 1; x < Math.ceil(canvasW / gridSize); x++) {
    ctx.beginPath();
    ctx.moveTo(x * gridSize+0.5, 0);
    ctx.lineTo(x * gridSize+0.5, canvasH);
    ctx.stroke();
  }
  for (var y = 1; y < Math.ceil(canvasH / gridSize); y++) {
    ctx.beginPath();
    ctx.moveTo(0,       y * gridSize+0.5);
    ctx.lineTo(canvasW, y * gridSize+0.5);
    ctx.stroke();
  }
  ctx.restore();
}

var canvas = document.getElementById('canvas_layout');
var ctx = canvas.getContext('2d');

drawLayout(ctx, canvas.width, canvas.height, layoutData);