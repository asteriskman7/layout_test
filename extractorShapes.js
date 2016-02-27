'use strict';

var debug;

var extractor = {
  extract: function(layoutData) {
    console.log('extracting ' + layoutData.width + ' x ' + layoutData.height);
    
    var checkResult = extractor.designRuleCheck(layoutData);
    console.log(checkResult.msg);
    if (checkResult.status === false) {
      return {};    
    }
    
    
// vias only conduct in the Z direction
// pc only vertical
// m1/m2 any direction
// pfets/nfets must have minimum width. must have length of 1
// fets must have the same well on both sides
// nwell must not touch pwell
// 
// make derived layers:
// pc and pwell => pfet
// pc and nwell => nfet
// pwell and not pc => pw
// nwell and not pc => nw
// 
// all active adjacent cells on a layer are connected, adjacent is NSEW, not diagonal
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

    var layers = layoutData.layers;

    layers.pfetsLayer = extractor.deriveLayer('and', layers.pc, layers.pwell);
    layers.nfetsLayer = extractor.deriveLayer('and', layers.pc, layers.nwell);
    
    layers.notPC = extractor.deriveLayer('not', layers.pc, layers.pc);
    layers.pw = extractor.deriveLayer('and', layoutData.layers.pwell, layers.notPC);
    layers.nw = extractor.deriveLayer('and', layoutData.layers.nwell, layers.notPC);
    
    //layers.belowV0 = extractor.deriveLayer('or', extractor.deriveLayer('or', layoutData.layers.pwell, layoutData.layers.nwell), layoutData.layers.pc);
    
    var pfets = extractor.extractLayerGroups(layers.pfetsLayer.data, layoutData.width, layoutData.height);
    var nfets = extractor.extractLayerGroups(layers.nfetsLayer.data, layoutData.width, layoutData.height);
    
    var signalLayers = ['pw', 'nw', 'pc', 'm1', 'm2'];
    var layerGroups = {};
    var nextNetIndex = 0;
    var nets = {};
    var cellNets = {};
    
    signalLayers.forEach(
      function(layerName) {
        var groups = extractor.extractLayerGroups(layers[layerName].data, layoutData.width, layoutData.height);
        layerGroups[layerName] = groups;
        cellNets[layerName] = [];
        groups.forEach(
          function(g) {
            var netIndex;
            netIndex = nextNetIndex;
            ++nextNetIndex;
            g.forEach(
              function(cell) {
                cellNets[layerName][cell] = netIndex;
              }
            );            
            nets[netIndex] = [{layer: layerName, cells: g}];
          }
        );
      }
    );
    
    //now connect layers with vias.
    var viaLayers = ['v0', 'v1'];
    var viaConnections = {
      v0: {above: ['m1'], below: ['pw', 'nw', 'pc']},
      v1: {above: ['m2'], below: ['m1']}
    };
    var extractedVias = {};
    viaLayers.forEach(
      function(layerName) {
        extractedVias[layerName] = extractor.extractLayerGroups(layers[layerName].data, layoutData.width, layoutData.height);
      }
    );

    //for each via, find the net above and below, if they're not the same net name, make it so
    viaLayers.forEach(
      function(layerName) {
        var vias = extractedVias[layerName];
        vias.forEach(
          function(viaCell) {
            var aboveNet;
            var belowNet;
            var i;
            //console.log('via on layer ' + layerName + ' at cell ' + viaCell);
            //check layers above
            var aboveLayers = viaConnections[layerName].above;
            //check all nets in the aboveLayer to see if they have the same cell as viaCell
            for (i = 0; i < aboveLayers.length; i++) {
              var aboveLayerName = aboveLayers[i]; 
              var aboveLayerCellNets = cellNets[aboveLayerName];
              aboveNet = aboveLayerCellNets[viaCell];
              if (aboveNet !== undefined) {
                //console.log('via connects up to net ' + aboveNet);
                break;
              }  
            }

            //check layers below
            var belowLayers = viaConnections[layerName].below;
            for (i = 0; i < belowLayers.length; i++) {
              var belowLayerName = belowLayers[i];
              var belowLayerCellNets = cellNets[belowLayerName];
              belowNet = belowLayerCellNets[viaCell];
              if (belowNet !== undefined) {
                //console.log('via connects down to net ' + belowNet);
                break;
              }
            }
            
            //join aboveNet and belowNet
            //move everything on belowNet to aboveNet
            if (belowNet !== aboveNet) {
              nets[belowNet].forEach(
                function(netInfo) {
                  netInfo.cells.forEach(
                    function(cell) {
                      cellNets[netInfo.layer][cell] = aboveNet;
                    }
                  );
                  nets[aboveNet].push(netInfo);
                }
              );
              
              delete nets[belowNet];
            }
          }
        );
      }
    );
    
    debug = nets;
    
    //now connect the nets to each terminal of the pfets & nfets
    var devices = [];
    pfets.forEach(
      function(pfet) {
        var gateNet = cellNets.pc[pfet[0]];
        var sourceNet = cellNets.pw[pfet[0]-1];
        var drainNet = cellNets.pw[pfet[0]+1];
        var device = {type: 'pfet', gateNet: gateNet, sourceNet: sourceNet, drainNet: drainNet};
        devices.push(device);
      }
    );
    
    nfets.forEach(
      function(nfet) {
        var gateNet = cellNets.pc[nfet[0]];
        var sourceNet = cellNets.nw[nfet[0]-1];
        var drainNet = cellNets.nw[nfet[0]+1];
        var device = {type: 'nfet', gateNet: gateNet, sourceNet: sourceNet, drainNet: drainNet};
        devices.push(device);
      }
    );
    
    //return {pfets: pfets, nfets: nfets};
    var netNames = Object.getOwnPropertyNames(nets);
    var design = {devices: devices, nets: netNames, netCells: nets};
    return design;
    
  },
  
  designRuleCheck: function(layoutData) {
    //all PC must be only 1 unit wide
    //all vias must have valid layer above and below
    //maximum pw/nw area is something like 16
    //minimum pfetsLayer/nfetsLayer area is 4
    //pw and nw must neither overlap nor touch
    //pfets must have at least 1 cell of pw across their entire left and right side
    //nfets must have at least 1 cell of nw across their entire left and right side
    
    
    return {status: true, msg: 'designRuleCheck PASS'};
  },
    
  deriveLayer: function(op, a, b) {
    a = a.data;
    b = b.data;
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
    
    return {data: z, pins: []};
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