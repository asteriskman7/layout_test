'use strict';

//example nets
//6 => A
//7 => gnd
//8 => Z
//9 => vdd

var simulator = {
  curNetValues: undefined,
  nextNetValues: undefined,
  devices: undefined,
  design: undefined,
  tickCount: undefined,
  init: function(design) {
    //design={devices: devices, nets: netNames}
    //devices=array of {type: 'pfet'/'nfet', gateNet: gateNet, sourceNet: sourceNet, drainNet: drainNet}
    //nets=array of net names
    simulator.devices = design.devices;
    simulator.design = design;
    simulator.curNetValues = {};
    simulator.nextNetValues = {};
    simulator.curNetStrength = {};
    design.nets.forEach(
      function(netName) {
        simulator.curNetValues[netName] = 0;
        simulator.nextNetValues[netName] = 0;
        simulator.curNetStrength[netName] = 0;
      }
    );
    simulator.tickCount = 0;
  },
  
  tick: function() {
    simulator.nextNetValues = {};
    simulator.nextNetDrivers = {};
    simulator.design.nets.forEach(
      function(netName) {
        simulator.nextNetValues[netName] = simulator.curNetValues[netName] * 0.9;
        simulator.curNetStrength[netName] = simulator.curNetStrength[netName] * 0.75;
        simulator.nextNetDrivers[netName] = [];
      }
    );
    
    //apply top level pin forces
    simulator.curNetValues.vdd = 1;
    simulator.curNetValues.gnd = 0;
    simulator.curNetStrength.vdd = 1;
    simulator.curNetStrength.gnd = 1;
    simulator.curNetStrength.d = 1;
    simulator.curNetStrength.c = 1;
    simulator.curNetStrength.b = 1;
    //simulator.curNetValues.d = (((simulator.tickCount % 16) > 7) + 0).toString();
    //simulator.curNetValues.c = (((simulator.tickCount % 8) > 3) + 0).toString();
    //simulator.curNetValues.b = (1 - ((simulator.tickCount % 8) > 3)).toString();
    simulator.curNetValues.a = aval;
    simulator.curNetValues.b = bval;    
    simulator.curNetStrength.a = 1;
    simulator.curNetStrength.b = 1;
    simulator.curNetValues.d = dval;
    simulator.curNetValues.c = cval;
    simulator.curNetValues.b = 1-cval;
    
    if (simulator.tickCount === 13) {
      var a = 1; //debug point
    }
    
    simulator.devices.forEach(
      function(device) {
        var gate;
        var source;
        var drain;
        //gsd action
        //1?? nothing
        //0AA s/d are equal, do nothing
        //001 set 0 to X
        //0?X set ? to X
        //0Z1 set Z to 1
        switch (device.type) {
          case 'pfet':
            gate   = simulator.curNetValues[device.gateNet];
            source = simulator.curNetValues[device.sourceNet]*0.9;
            drain  = simulator.curNetValues[device.drainNet]*0.9;
            if (gate < 0.5) { //if the gate isn't 0 then the device isn't on
              //if (source === drain) { //if current source and drain are the same, set their next values to be the same also
              //  simulator.nextNetValues[device.sourceNet] = source;
              //  simulator.nextNetValues[device.drainNet] = drain;
              //} else { //if source and drain are not the same there is more to do
                if ((source > 0.5) && (source >= drain)) {
                  simulator.nextNetValues[device.drainNet] = source;
                  simulator.nextNetDrivers[device.drainNet].push({v: source, s: simulator.curNetStrength[device.sourceNet]});
                }
                if ((drain > 0.5) && (drain >= source)) {
                  simulator.nextNetValues[device.sourceNet] = drain;
                  simulator.nextNetDrivers[device.sourceNet].push({v: drain, s: simulator.curNetStrength[device.drainNet]});
                }
              //}
            }
            break;
          case 'nfet':
            gate   = simulator.curNetValues[device.gateNet];
            source = simulator.curNetValues[device.sourceNet]*0.9;
            drain  = simulator.curNetValues[device.drainNet]*0.9;
            if (gate >= 0.5) { //if the gate isn't 1 then the device isn't on
              //if (source === drain) { //if current source and drain are the same, set their next values to be the same also
              //  simulator.nextNetValues[device.sourceNet] = source;
              //  simulator.nextNetValues[device.drainNet] = drain;
              //} else { //if source and drain are not the same there is more to do
                if ((source < 0.5) && (source <= drain)) {
                  simulator.nextNetValues[device.drainNet] = source;
                  simulator.nextNetDrivers[device.drainNet].push({v: source, s: simulator.curNetStrength[device.sourceNet]});
                }
                if ((drain < 0.5) && (drain <= source)) {
                  simulator.nextNetValues[device.sourceNet] = drain;
                  simulator.nextNetDrivers[device.sourceNet].push({v: drain, s: simulator.curNetStrength[device.drainNet]});
                }
              //}
            }
            break;            
          default:
            throw 'ERROR: device type ' + device.type + ' is not implemented';
        }
      }      
    );    
    
    simulator.design.nets.forEach(
      function(netName) {
        var drivers = simulator.nextNetDrivers[netName];
        var totalStrength = 0;
        var totalDrive = 0;
        var maxStrength = 0;
        for (var i = 0; i < drivers.length; i++) {
          maxStrength = Math.max(maxStrength, drivers[i].s);
          totalStrength += drivers[i].s;
          totalDrive += drivers[i].v * drivers[i].s;
        }
        if (totalStrength < 0.001) {
          simulator.nextNetValues[netName] = 0;
        } else {
          simulator.nextNetValues[netName] = totalDrive / totalStrength;
        }
        simulator.curNetStrength[netName] = maxStrength;
      }
    );
    
    
    simulator.curNetValues = simulator.nextNetValues;
    simulator.curNetValues.vdd = 1;
    simulator.curNetValues.gnd = 0;
    //simulator.curNetValues.d = (((simulator.tickCount % 16) > 7) + 0).toString();
    //simulator.curNetValues.c = (((simulator.tickCount % 8) > 3) + 0).toString();
    //simulator.curNetValues.b = (1 - ((simulator.tickCount % 8) > 3)).toString();
    simulator.curNetValues.a = aval;
    simulator.curNetValues.b = bval;
    simulator.curNetValues.d = dval;
    simulator.curNetValues.c = cval;
    simulator.curNetValues.b = 1-cval;
    simulator.tickCount += 1;
  }
};