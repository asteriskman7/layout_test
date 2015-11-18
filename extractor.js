'use strict';

var extractor = {
  extract: function(layoutData) {
    
    var checkResult = extractor.designRuleCheck(layoutData);
    console.log(checkResult.msg);
    if (checkResult.status === false) {
      return {};    
    }
    
    
// vias only conduct in the Z direction
// pc only vertical
// m1/m2 any direction
// pfets/nfets must have minimum width. must have length of 1
// 
// make derived layers:
// pc and pwell => pfet
// pc and nwel => nfet
// pwell and not pc => pw
// nwell and not pc => nw
// 
// all active adjacent cells on a layer are connected, adjacent is nsew, not diagonal
// 
// foreach label in the design
//   propagate the net via floodfill
// 
// foreach active cell in all layers
//   if it's not already in a net
//     assign it a new net
//     propagate the net via floodfill
//     //floodfill can't find another net because if it does then the other net would have
//     // already floodfilled this cell
// 
// foreach pfet and nfet
//   create device with appropriate connections

    var pfetsLayer = extractor.deriveLayer('and', layoutData.layers.pc.data, layoutData.layers.pwell.data);
    var nfetsLayer = extractor.deriveLayer('and', layoutData.layers.pc.data, layoutData.layers.nwell.data);
    
    var pfets = extractor.extractLayerGroups(pfetsLayer, layoutData.width, layoutData.height);
    var nfets = extractor.extractLayerGroups(nfetsLayer, layoutData.width, layoutData.height);
    
    return {pfets: pfets, nfets: nfets};
    
  },
  
  designRuleCheck: function(layoutData) {
    return {status: true, msg: 'designRuleCheck PASS'};
  },
    
  deriveLayer: function(op, a, b) {
    if (a.length != b.length) {
      throw 'both layers in deriveLayer must be the same length';
    }
    
    var z = [];
    var aval;
    var bval;
    
    for (var i = 0; i < a.length; i++) {
      aval = a[i];
      bval = b[i];
      switch (op) {
        case 'not':
          z.push(1-aval);
          break;
        case 'and':
          z.push(aval & bval);
          break;
        case 'or':
          z.push(aval | bval);
      }
    }
    
    return z;
  },
  
  joinCells: function(layer, w, h, x, y, checkedCells) {
    var cellGroup = [];
    var cellsToCheck = [];
    //var checkedCells = [];
    if (checkedCells === undefined) {
      checkedCells = [];
    }
    var curCell;
    var i;
    i = y * w + x;
    if ((layer[i] === 1) && (checkedCells[i] !== 1)) {
      cellGroup.push(i);
      cellsToCheck.push({x: x, y: y-1});
      cellsToCheck.push({x: x, y: y+1});
      cellsToCheck.push({x: x-1, y: y});
      cellsToCheck.push({x: x+1, y: y});
      checkedCells[y*w + x] = 1;

      while (cellsToCheck.length > 0) {
        curCell = cellsToCheck.pop();
        x = curCell.x;
        y = curCell.y;
        i = y * w + x;
        if ((layer[i] === 1) && (checkedCells[i] !== 1)) {
          cellGroup.push(i);
          cellsToCheck.push({x: x, y: y-1});
          cellsToCheck.push({x: x, y: y+1});
          cellsToCheck.push({x: x-1, y: y});
          cellsToCheck.push({x: x+1, y: y});
        }
        checkedCells[i] = 1;
      }
    }
    
    return {cellGroup: cellGroup, checkedCells: checkedCells};
  },
  
  extractLayerGroups: function(layer, w, h) {
    var layerGroups = [];
    var checkedCells = [];
    var joinResult;
    var i;
    for (var x = 0; x < w; x++) {
      for (var y = 0; y < h; y++) {
        i = y * w + x;
        if (checkedCells[i] !== 1) {
          joinResult = extractor.joinCells(layer, w, h, x, y, checkedCells);
          checkedCells = joinResult.checkedCells;
          if (joinResult.cellGroup.length > 0) {
            layerGroups.push(joinResult.cellGroup);
          }
        }
      }
    }
    return layerGroups;
  }
};