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
  init: function(design) {
    //design={devices: devices, nets: netNames}
    //devices=array of {type: 'pfet'/'nfet', gateNet: gateNet, sourceNet: sourceNet, drainNet: drainNet}
    //nets=array of net names
    simulator.devices = design.devices;
    simulator.design = design;
    simulator.curNetValues = {};
    simulator.nextNetValues = {};
    design.nets.forEach(
      function(netName) {
        simulator.curNetValues[netName] = 'z';
        simulator.nextNetValues[netName] = 'z';
      }
    );
  },
  
  tick: function() {
    simulator.nextNetValues = {};
    simulator.design.nets.forEach(
      function(netName) {
        simulator.nextNetValues[netName] = 'z';
      }
    );
    
    //apply top level pin forces
    simulator.nextNetValues[7] = '0'; //gnd
    simulator.nextNetValues[9] = '1'; //vdd
    simulator.nextNetValues[6] = '1'; //a
    
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
            source = simulator.curNetValues[device.sourceNet];
            drain  = simulator.curNetValues[device.drainNet];
            if (gate === '0') { //if the gate isn't 0 then the device isn't on
              if (source === drain) { //if current source and drain are the same, set their next values to be the same also
                simulator.nextNetValues[device.sourceNet] = source;
                simulator.nextNetValues[device.drainNet] = drain;
              } else { //if source and drain are not the same there is more to do
                if ((source !== 'z') && (drain !== 'z')) { //if they're different but neither z then there's a conflict
                  simulator.nextNetValues[device.sourceNet] = 'x';
                  simulator.nextNetValues[device.drainnet] = 'x';
                } else { //set the z side to the non z side
                  if (source === 'z') {
                    simulator.nextNetValues[device.sourceNet] = drain;
                  } else {
                    simulator.nextNetValues[device.drainNet] = source;
                  }
                }
              }
            }
            break;
          case 'nfet':
            gate   = simulator.curNetValues[device.gateNet];
            source = simulator.curNetValues[device.sourceNet];
            drain  = simulator.curNetValues[device.drainNet];
            if (gate === '1') { //if the gate isn't 1 then the device isn't on
              if (source === drain) { //if current source and drain are the same, set their next values to be the same also
                simulator.nextNetValues[device.sourceNet] = source;
                simulator.nextNetValues[device.drainNet] = drain;
              } else { //if source and drain are not the same there is more to do
                if ((source !== 'z') && (drain !== 'z')) { //if they're different but neither z then there's a conflict
                  simulator.nextNetValues[device.sourceNet] = 'x';
                  simulator.nextNetValues[device.drainnet] = 'x';
                } else { //set the z side to the non z side
                  if (source === 'z') {
                    simulator.nextNetValues[device.sourceNet] = drain;
                  } else {
                    simulator.nextNetValues[device.drainNet] = source;
                  }
                }
              }
            }
            break;            
          default:
            throw 'ERROR: device type ' + device.type + ' is not implemented';
        }
      }      
    );
    
    simulator.curNetValues = simulator.nextNetValues;
  }
};