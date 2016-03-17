'use strict';

/* globals ClipperLib, fabric */


var debug;

var extractor = {
  extract: function(shapesData) {
    /*
      shapesData = {
        layers: {
          layer1: [{left: 0, top: 0, width: 1, height: 1}, {left: 2, top: 2, width: 2, height: 2}],
          layer2: [],
          layer3: []
        }
      }
    */
    
    //console.log('extracting ' + layoutData.width + ' x ' + layoutData.height);
    console.log('extracting from shapes');
    
    var layers = {};
    
    //convert all rect info to polygons
    for (var layerName in shapesData.layers) {
      layers[layerName] = extractor.rectsToPolygons(shapesData.layers[layerName]);
    }
    
    //todo: combine all polygons on a layer for each layer
    
    var checkResult = extractor.designRuleCheck(layers);
    console.log(checkResult.msg);
    if (checkResult.status === false) {
      return {};    
    }
    //https://sourceforge.net/projects/jsclipper/
    
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

    layers.pfetsLayer = extractor.deriveLayer('intersection', layers.pc, layers.pwell);
    layers.nfetsLayer = extractor.deriveLayer('intersection', layers.pc, layers.nwell);
    
    //layers.notPC = extractor.deriveLayer('not', layers.pc, layers.pc);
    layers.pw = extractor.deriveLayer('difference', layers.pwell, layers.pc);
    layers.nw = extractor.deriveLayer('difference', layers.nwell, layers.pc);
    
    
    
    //layers.belowV0 = extractor.deriveLayer('or', extractor.deriveLayer('or', layoutData.layers.pwell, layoutData.layers.nwell), layoutData.layers.pc);
    
    extractor.polygonsToCanvas(layers.pfetsLayer, window.fjscanvas);
    
    //pfets and nfets are the pfetsLayer and nfetsLayer
    //var pfets = extractor.extractLayerGroups(layers.pfetsLayer.data, layoutData.width, layoutData.height);
    //var nfets = extractor.extractLayerGroups(layers.nfetsLayer.data, layoutData.width, layoutData.height);
    
    
    
    var signalLayers = ['pw', 'nw', 'pc', 'm1', 'm2'];
    var layerGroups = {};
    var nextNetIndex = 0;
    var nets = {};
    var cellNets = {};
    
    signalLayers.forEach(
      function(layerName) {
        var groups = layers[layerName];
        //var groups = extractor.extractLayerGroups(layers[layerName].data, layoutData.width, layoutData.height);
        //layerGroups[layerName] = groups;
        cellNets[layerName] = [];
        var groupNumber = 0;
        groups.forEach(function(g) {
          var netIndex;
          netIndex = nextNetIndex;
          ++nextNetIndex;
          //the groupNumber'th group on layer layerName is net netIndex
          cellNets[layerName][groupNumber] = netIndex;          
          nets[netIndex] = [{layer: layerName, groupNumber: groupNumber}];
          groupNumber++;           
        });
      }
    );
    
    //now connect layers with vias.
    var viaLayers = ['v0', 'v1'];
    var viaConnections = {
      v0: {above: ['m1'], below: ['pw', 'nw', 'pc']},
      v1: {above: ['m2'], below: ['m1']}
    };
    //var extractedVias = {};
    //viaLayers.forEach(
    //  function(layerName) {
    //    extractedVias[layerName] = extractor.extractLayerGroups(layers[layerName].data, layoutData.width, layoutData.height);
    //  }
    //);

    //todo: apply pin names and make sure they are sticky
    //for each via, find the net above and below, if they're not the same net name, make it so
    viaLayers.forEach(function(layerName) {
      var vias = layers[layerName];
      vias.forEach(function(viaPoly) {
        var aboveNet;
        var belowNet;
        var i;
        var groupNumber;
        //console.log('via on layer ' + layerName + ' at cell ' + viaCell);
        //check layers above
        var aboveLayers = viaConnections[layerName].above;
        //check all nets in the aboveLayer to see if they have the same cell as viaCell
        for (i = 0; i < aboveLayers.length; i++) {
          var aboveLayerName = aboveLayers[i];
          var abovePolys = layers[aboveLayerName];
          for (groupNumber = 0; groupNumber < abovePolys.length; groupNumber++) {
            var abovePoly = abovePolys[groupNumber];
            if (extractor.deriveLayer('intersection', [viaPoly], [abovePoly]).length !== 0) {
              aboveNet = cellNets[aboveLayerName][groupNumber];
              break;
            }
          }
          if (aboveNet !== undefined) {
            break;
          }
        }

        //check layers below
        var belowLayers = viaConnections[layerName].below;        
        for (i = 0; i < belowLayers.length; i++) {
          var belowLayerName = belowLayers[i];
          var belowPolys = layers[belowLayerName];
          for (groupNumber = 0; groupNumber < belowPolys.length; groupNumber++) {
            var belowPoly = belowPolys[groupNumber];
            if (extractor.deriveLayer('intersection', [viaPoly], [belowPoly]).length !== 0) {
              belowNet = cellNets[belowLayerName][groupNumber];
              break;
            }            
          }  
          if (belowNet !== undefined) {
            break;
          }
        }
        
        //join aboveNet and belowNet
        //move everything on belowNet to aboveNet
        if (belowNet !== aboveNet) {
          //set all the nets that are equal to belowNet to aboveNet
          var belowNetList = nets[belowNet];
          var aboveNetList = nets[aboveNet];
          //foreach belowNet we have to set cellNets[belowLayerName][groupNumber] to be aboveNet
          belowNetList.forEach(function(n){
            //n={layer: layerName, groupNumber: groupNumber}
            cellNets[n.layer][n.groupNumber] = aboveNet;
          });
          
          nets[aboveNet] = aboveNetList.concat(belowNetList);
          delete nets[belowNet];
        }
        
      });
    });
    
    //now connect the nets to each terminal of the pfets & nfets
    var devices = [];
    var gateNet;
    var sourceNet;
    var drainNet;
    var fetIndex;
    var pcIndex;
    var pwIndex;
    var nwIndex;
    var pwPoly;
    var nwPoly;
    var pcPoly;
    var device;
    for (fetIndex = 0; fetIndex < layers.pfetsLayer.length; fetIndex++) {
      //gateNet = the net of the pc that is overlapping with this pfetsLayer shape
      var pfetPoly = layers.pfetsLayer[fetIndex];
      for (pcIndex = 0; pcIndex < layers.pc.length; pcIndex++) {
        pcPoly = layers.pc[pcIndex];
        if (extractor.deriveLayer('intersection', [pfetPoly], [pcPoly]).length !== 0) {
          gateNet = cellNets.pc[pcIndex];
          break;
        }
      }

      //sourceNet = the net of the pw shape to the left of this pfetsLayer shape
      var leftPfet = extractor.translatePoly(pfetPoly, -1, 0);
      for (pwIndex = 0; pwIndex < layers.pw.length; pwIndex++) {
        pwPoly = layers.pw[pwIndex];
        if (extractor.deriveLayer('intersection', [leftPfet], [pwPoly]).length !== 0) {
          sourceNet = cellNets.pw[pwIndex];
          break;
        }
      }
      
      //drainNet = the net of the pw shape to the right of this pfetsLayer shape
      var rightPfet = extractor.translatePoly(pfetPoly, 1, 0);
      for (pwIndex = 0; pwIndex < layers.pw.length; pwIndex++) {
        pwPoly = layers.pw[pwIndex];
        if (extractor.deriveLayer('intersection', [rightPfet], [pwPoly]).length !== 0) {
          drainNet = cellNets.pw[pwIndex];
          break;
        }
      }
      
      device = {type: 'pfet', gateNet: gateNet, sourceNet: sourceNet, drainNet: drainNet};
      devices.push(device);
    }
    
    for (fetIndex = 0; fetIndex < layers.nfetsLayer.length; fetIndex++) {
      //gateNet = the net of the pc that is overlapping with this nfetsLayer shape
      var nfetPoly = layers.nfetsLayer[fetIndex];
      for (pcIndex = 0; pcIndex < layers.pc.length; pcIndex++) {
        pcPoly = layers.pc[pcIndex];
        if (extractor.deriveLayer('intersection', [nfetPoly], [pcPoly]).length !== 0) {
          gateNet = cellNets.pc[pcIndex];
          break;
        }
      }

      //sourceNet = the net of the nw shape to the left of this nfetsLayer shape
      var leftNfet = extractor.translatePoly(nfetPoly, -1, 0);
      for (nwIndex = 0; nwIndex < layers.nw.length; nwIndex++) {
        nwPoly = layers.nw[nwIndex];
        if (extractor.deriveLayer('intersection', [leftNfet], [nwPoly]).length !== 0) {
          sourceNet = cellNets.nw[nwIndex];
          break;
        }
      }
      
      //drainNet = the net of the nw shape to the right of this nfetsLayer shape
      var rightNfet = extractor.translatePoly(nfetPoly, 1, 0);
      for (nwIndex = 0; nwIndex < layers.nw.length; nwIndex++) {
        nwPoly = layers.nw[nwIndex];
        if (extractor.deriveLayer('intersection', [rightNfet], [nwPoly]).length !== 0) {
          drainNet = cellNets.nw[nwIndex];
          break;
        }
      }
      device = {type: 'nfet', gateNet: gateNet, sourceNet: sourceNet, drainNet: drainNet};
      devices.push(device);
    }
    
    //return {pfets: pfets, nfets: nfets};
    var netNames = Object.getOwnPropertyNames(nets);
    var design = {devices: devices, nets: netNames, netCells: nets};
    return design;
    
  },
  
  designRuleCheck: function(shapesData) {
    //all PC must be only 1 unit wide
    //all vias must have valid layer above and below
    //maximum pw/nw area is something like 16
    //minimum pfetsLayer/nfetsLayer area is 4
    //pw and nw must neither overlap nor touch
    //pfets must have at least 1 cell of pw across their entire left and right side
    //nfets must have at least 1 cell of nw across their entire left and right side
    
    
    return {status: true, msg: 'designRuleCheck PASS'};
  },
  
  rectsToPolygons: function(rects) {
    var polygons = rects.map(function(r) {
      var p = [
        {X: r.left, Y: r.top},
        {X: r.left + r.width, Y: r.top},
        {X: r.left + r.width, Y: r.top + r.height},
        {X: r.left, Y: r.top + r.height}
      ];
      return p;
    });
    return polygons;
  },
    
  deriveLayer: function(op, subj, clip) {
    var cpr = new ClipperLib.Clipper();    
    
    cpr.AddPaths(subj, ClipperLib.PolyType.ptSubject, true);
    cpr.AddPaths(clip, ClipperLib.PolyType.ptClip, true);
    var solution = [];
    var rc;
    var typeMap = {
      intersection: ClipperLib.ClipType.ctIntersection,
      union: ClipperLib.ClipType.ctUnion,
      difference: ClipperLib.ClipType.ctDifference,
      xor: ClipperLib.ClipType.ctXor
    };

    rc = cpr.Execute(typeMap[op], solution);    
    
    return solution;
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
  },
  
  polygonsToCanvas: function(polygons, canvas) {
    polygons.forEach(function(p) {
      var cpolypts = [];
      p.forEach(function(pt){
        cpolypts.push({x:pt.X, y:pt.Y});
      });      
      var cpoly = new fabric.Polygon(cpolypts, {fill: 'orange'});
      canvas.add(cpoly);
    });
  },
  
  translatePoly: function(polygon, dx, dy) {
    var result = [];
    polygon.forEach(function(pt){
      var newPt = {X: pt.X + dx, Y: pt.Y + dy};
      result.push(newPt);
    });
    return result;
  }
  
};

