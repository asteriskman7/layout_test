'use strict';

/* globals extractor, simulator, fabric */


console.log('init');
var debug;

function getLayoutData() {
  var layout = {
    width: 9,
    height: 19,
    layers: {
      nwell: {data: [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0], pins: []},
      pwell: {data: [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0], pins: []},
      pc:    {data: [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0], pins: []},
      v0:    {data: [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,1,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,1,0, 0,0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0], pins: []},
      m1:    {data: [1,1,1,1,1,1,1,1,1, 0,0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,1,0, 1,1,1,1,1,0,0,1,1, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,1,0, 0,0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 0,0,1,0,0,0,0,0,0, 1,1,1,1,1,1,1,1,1], pins: [{name: 'gnd', x: 0, y: 18}]},
      v1:    {data: [1,0,1,0,1,0,1,0,1, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0], pins: []},
      m2:    {data: [1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0], pins: [{name: 'vdd', x: 1, y: 0}]}
    }
  };
  return resizeAllLayers(layout, 33, 33);
}

function getShapesData() {
  var shapes = {
    layers: {
      nwell: [{top: 120, left: 0, width: 90, height: 40}],
      pwell: [{top: 30, left: 0, width: 90, height: 40}],
      pc: [{top: 20, left: 40, width: 10, height: 150}],
      v0: [{top: 40, left: 20, width: 10, height: 10}, {top: 50, left: 70, width: 10, height: 10}, {top: 90, left: 40, width: 10, height: 10}, {top: 130, left: 70, width: 10, height: 10}, {top: 140, left: 20, width: 10, height: 10}],
      m1: [{top: 0, left: 0, width: 90, height: 10}, {top: 0, left: 20, width: 10, height: 50}, {top: 50, left: 70, width: 10, height: 90}, {top: 90, left: 0, width: 50, height: 10}, {top: 90, left: 70, width: 20, height: 10}, {top: 140, left: 20, width: 10, height: 50}, {top: 180, left: 0, width: 90, height: 10}],
      v1: [{top: 0, left: 0, width: 10, height: 10}],
      m2: [{top: 0, left: 0, width: 90, height: 10}]
    }
  };
  return shapes;
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
    layoutData.layers[layerName].data = resizeLayer(layoutData.layers[layerName].data, oldW, oldH, newW, newH);
  }
  return layoutData;
}

var fjscanvas = new fabric.Canvas('canvas_layout');

function drawLayoutShapes(shapesLayout) {
  //var canvas = new fabric.Canvas('canvas_layout');
  var canvas = fjscanvas;
  
  canvas.setZoom(2);
  
  var layerList = [
    {name: 'pwell', type: 'normal', color: 'rgba(0,255,0,1)'},
    {name: 'nwell', type: 'normal', color: 'rgba(255,255,0,1)'},
    {name: 'pc', type: 'normal', color: 'rgba(255, 0, 255, 0.75)'},
    {name: 'm1', type: 'normal', color: 'rgba(0, 0, 255, 0.75)'},
    {name: 'v0', type: 'via', color: 'rgba(255, 255, 255, 1)'},
    {name: 'm2', type: 'normal', color: 'rgba(255, 0, 0, 0.75)'},
    {name: 'v1', type: 'via', color: 'rgba(255, 255, 0, 1)'},
  ];  
  
  layerList.forEach(function(layerInfo) {
    var layerData = shapesLayout.layers[layerInfo.name];
    console.log('draw layer ' + layerInfo.name);
    layerData.forEach(function(s) {      
      //s.scaleX = 10;
      //s.scaleY = 10;
      s.fill = layerInfo.color;
      //var stmp = {left: Math.random() * 100, top: Math.random() * 100, width: Math.random() * 100, height: Math.random() * 100, fill: s.fill};
      //console.log(s);
      var rect = new fabric.Rect(s);
      canvas.add(rect);
      /*
      rect.animate('left', s.left, {duration: 1000, onChange: canvas.renderAll.bind(canvas), easing: fabric.util.ease.easeInOutQuad});
      rect.animate('top', s.top, {duration: 1000, onChange: canvas.renderAll.bind(canvas), easing: fabric.util.ease.easeInOutQuad});
      rect.animate('width', s.width, {duration: 1000, onChange: canvas.renderAll.bind(canvas), easing: fabric.util.ease.easeInOutQuad});
      rect.animate('height', s.height, {duration: 1000, onChange: canvas.renderAll.bind(canvas), easing: fabric.util.ease.easeInOutQuad});
    */
    });
  });
}

/*
function drawLayout(ctx, canvasW, canvasH, layoutData, selection) {
  var gridSize = 15;
  var gridOriginX = 0;
  var gridOriginY = 0;
  var gridWidth = Math.floor(canvasW / gridSize);
  var gridHeight = Math.floor(canvasH / gridSize);
  console.log('drawing layout');
  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.save();
  ctx.translate(300,0);
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
    function(layerInfo) {
      layerData = layoutData.layers[layerInfo.name].data;
      if (layerData !== undefined) {
        //draw layer cells
        for (var y = 0; y < gridHeight; y++) {
          for (var x = 0; x < gridWidth; x++) { 
            if (layerData[y * gridWidth + x] === 1) {
              switch (layerInfo.type) {
                case 'normal': 
                  ctx.fillStyle = layerInfo.color;
                  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
                  break;
                case 'via':
                  ctx.strokeStyle = layerInfo.color;
                  ctx.beginPath();
                  ctx.arc(x * gridSize + gridSize * 0.5 + 0.5, y * gridSize + gridSize * 0.5 + 0.5, gridSize * 0.5 * 0.75, 0, 2 * Math.PI);
                  ctx.stroke();
                  break;
              }              
            }
          }
        }
        //draw layer pins
        layoutData.layers[layerInfo.name].pins.forEach(
          function(pinInfo) {            
            ctx.strokeStyle = layerInfo.color;
            ctx.beginPath();
            ctx.moveTo(pinInfo.x * gridSize, pinInfo.y * gridSize);
            ctx.lineTo(pinInfo.x * gridSize + gridSize, pinInfo.y * gridSize + gridSize);
            ctx.moveTo(pinInfo.x * gridSize + gridSize, pinInfo.y * gridSize);
            ctx.lineTo(pinInfo.x * gridSize, pinInfo.y * gridSize + gridSize);
            ctx.stroke();
          }
        );
      }       
    }
  );
  
  for (var net in design.netCells) {
    var netValue = simulator.curNetValues[net];
    console.log('display net ' + net + ' as ' + netValue);
    var netCells = design.netCells[net];
    netCells.forEach(
      function(l) {
        l.cells.forEach(
          function(c) {
            //console.log('cell ' + c + ' is value ' + netValue);
            var t;
            if (netValue > 0.5) {
              ctx.fillStyle = 'rgba(0,255,0,1)';
              t = '+';
            } else {
              ctx.fillStyle = 'rgba(255,0,0,1)';
              t = '-';
            }

            var x = c % gridWidth;
            var y = Math.floor(c / gridWidth);
            //ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
            ctx.textAlign = 'center';
            ctx.fillText(t, x * gridSize + gridSize * 0.5, y * gridSize + gridSize * 0.5);
          }
        );
      }
    );
    
  }
  
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
  ctx.restore();
}
*/


var canvas = document.getElementById('canvas_layout');
var ctx = canvas.getContext('2d');

var layoutData = resizeAllLayers(getLayoutData(), 33, 33);

var shapesLayout = getShapesData();

var design = extractor.extract(shapesLayout);

//var selection = extractor.extractLayerGroups(layoutData.layers.m1.data, 33, 33);



document.getElementById('button_redraw').onclick = function() {drawLayoutShapes(ctx, 500, 500, layoutData, []);};


// latch
var designL = {
devices: [
  {type: 'nfet', gateNet: 'c', sourceNet: 'd', drainNet: '1'}, //first passgate nfet
  {type: 'pfet', gateNet: 'b', sourceNet: 'd', drainNet: '1'}, //first passgate pfet
  {type: 'pfet', gateNet: '1', sourceNet: 'vdd', drainNet: '4'}, //first invp
  {type: 'nfet', gateNet: '1', sourceNet: 'gnd', drainNet: '4'}, //first invn
  {type: 'pfet', gateNet: '4', sourceNet: 'vdd', drainNet: 'q'}, //second invp
  {type: 'nfet', gateNet: '4', sourceNet: 'gnd', drainNet: 'q'}, //second invn
  {type: 'pfet', gateNet: 'c', sourceNet: 'q', drainNet: '1'}, //second passgate
  {type: 'nfet', gateNet: 'b', sourceNet: 'q', drainNet: '1'}

],
nets: ['d', 'c', 'b', '1', 'q', '4', 'vdd', 'gnd']
};

var designL2 = {
devices: [
  {type: 'nfet', gateNet: 'db', sourceNet: 'dbb', drainNet: 'gnd'}, //second d inverter nfet
  {type: 'pfet', gateNet: 'db', sourceNet: 'dbb', drainNet: 'vdd'}, //second d inverter pfet
  {type: 'nfet', gateNet: 'd', sourceNet: 'db', drainNet: 'gnd'}, //first d inverter nfet
  {type: 'pfet', gateNet: 'd', sourceNet: 'db', drainNet: 'vdd'}, //first d inverter nfet
  {type: 'nfet', gateNet: 'c', sourceNet: 'dbb', drainNet: '1'}, //first passgate nfet
  {type: 'pfet', gateNet: 'b', sourceNet: 'dbb', drainNet: '1'}, //first passgate pfet
  {type: 'pfet', gateNet: '1', sourceNet: 'vdd', drainNet: '4'}, //first invp
  {type: 'nfet', gateNet: '1', sourceNet: 'gnd', drainNet: '4'}, //first invn
  {type: 'pfet', gateNet: '4', sourceNet: 'vdd', drainNet: 'q'}, //second invp
  {type: 'nfet', gateNet: '4', sourceNet: 'gnd', drainNet: 'q'}, //second invn
  {type: 'pfet', gateNet: 'c', sourceNet: 'q', drainNet: '1'}, //second passgate
  {type: 'nfet', gateNet: 'b', sourceNet: 'q', drainNet: '1'}

],
nets: ['d', 'db', 'dbb', 'c', 'b', '1', 'q', '4', 'vdd', 'gnd']
};


//nand
//abz
//001
//011
//101
//110
//parallel pfets to vdd
//series nfets to gnd
var aval = 0;
var bval = 0;
var cval = 0;
var dval = 0;
var designN = {
devices: [
  {type: 'pfet', gateNet: 'a', sourceNet: 'vdd', drainNet: 'z'},
  {type: 'pfet', gateNet: 'b', sourceNet: 'vdd', drainNet: 'z'},
  {type: 'nfet', gateNet: 'a', sourceNet: 'gnd', drainNet: 'ad'},
  {type: 'nfet', gateNet: 'b', sourceNet: 'ad', drainNet: 'z'}
],
nets: ['a', 'b', 'z', 'ad', 'vdd', 'gnd']
};

var designN2 = {
devices: [
  {type: 'pfet', gateNet: 'a', sourceNet: 'vdd', drainNet: 'z'},
  {type: 'pfet', gateNet: 'b', sourceNet: 'vdd', drainNet: 'z'},
  {type: 'pfet', gateNet: 'c', sourceNet: 'vdd', drainNet: 'z'},
  {type: 'nfet', gateNet: 'a', sourceNet: 'gnd', drainNet: 'ad'},
  {type: 'nfet', gateNet: 'b', sourceNet: 'ad', drainNet: 'bd'},
  {type: 'nfet', gateNet: 'c', sourceNet: 'bd', drainNet: 'z'}
],
nets: ['a', 'b', 'c', 'z', 'ad', 'bd', 'vdd', 'gnd']
};

var designP = {
devices: [
  {type: 'pfet',  gateNet: 'a', sourceNet: 'vdd', drainNet: 'z'},
  {type: 'nfet',  gateNet: 'b', sourceNet: 'gnd', drainNet: 'z'} 
],
nets: ['a', 'b', 'vdd', 'gnd', 'z']
};

simulator.init(design);
//simulator.tick();

//drawLayout(ctx, canvas.width, canvas.height, layoutData, []);
//drawLayout(ctx, 500, 500, layoutData, []);
drawLayoutShapes(shapesLayout);