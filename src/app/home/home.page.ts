import { Component, OnInit, NgZone } from '@angular/core';
import { TaskI } from '../models/task.interface';
import { TodoService } from '../services/todo.service';
import { BLE } from '@ionic-native/ble/ngx';
import { NavController, LoadingController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todos: TaskI[];
  devices:any = {};
  device:any = {};
  peripheral:any = {};
  statusMessage: string;

  constructor(private todoService: TodoService,
              private ble: BLE,
              private ngZone: NgZone,
              private statusBar: StatusBar,
              private loadingController: LoadingController
              //public plt: Platform
            ) {
              }

  ngOnInit() {
    this.todoService.getTodos().subscribe(res=> {this.todos = res;
      //console.log('Tasks', res);
    })
  }

  Scan(){
    //this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];
    this.ble.scan([], 15).subscribe(
      device => this.onDeviceDiscovered(device),
      //error => this.scanError(error)
    );
    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
    //setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  // If location permission is denied, you'll end up here
  // scanError(error) {
  //   this.setStatus('Error ' + error);
  //   let toast = this.toastCtrl.create({
  //     message: 'Error scanning for Bluetooth low energy devices',
  //     position: 'middle',
  //     duration: 5000
  //   });
  //   toast.present();
  // }

  setStatus(message) {
  console.log(message);
  this.ngZone.run(() => {
    this.statusMessage = message;
  });
}

  onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device, null, 2));
    this.ngZone.run(()=> {
      this.devices.push(device);
      // if (device.id == 'D2:03:16:2D:FA:E5'){
      // this.ble.connect(device.id).subscribe(
      //   peripheral => this.onConnected(peripheral)
      // )}
    });

  }

  deviceSelected(device){
    console.log(JSON.stringify(device) + ' selected');
    //this.ngZone.run(()=> {
    // this.devices.push(device);
    //})
  }

  onConnected(peripheral) {
    this.ngZone.run((peripheral) => {
      //this.setStatus('');
      this.peripheral = peripheral;
    });
  }
  // ASCII only
  stringToBytes(string) {
     var array = new Uint8Array(string.length);
     for (var i = 0, l = string.length; i < l; i++) {
         array[i] = string.charCodeAt(i);
      }
      return array.buffer;
  }

  // ASCII only
  bytesToString(buffer) {
      return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  async Connect(device){
    //this.device = device;
    const loading = await this.loadingController.create({
      message: `Connecting....${device.id}`
    })
    await loading.present();
    //console.log(this.device.id);
    //this.setStatus('Connectedd to '+ this.device.name || this.device.id);
    this.ble.connect(device.id).subscribe(peripheral => {
      loading.dismiss();
      console.log('Obtained' + JSON.stringify(peripheral, null, 2));

    this.ble.write(device.id,'1800', '2a00', this.stringToBytes('h')).then(
      buffer=> {
        let data = this.bytesToString(buffer);
        console.log(data);
        this.ble.read(device.id,'1800', '2a00').then(
          buffer2=> {
            let data2 = this.bytesToString(buffer2);
            console.log(data2);
          });

          // let data = this.bytesToString(buffer);
          // console.log(data);
          // console.log(this.bytesToString(this.stringToBytes('hello')));
      }).catch(error=> {
          console.log('error' + JSON.stringify(error));
          alert(JSON.stringify(error));
      });

    });
  }
  //connect to ID and then write value 0/1/2/3
  //connect(deviceId) :: connect(D2:03:16:2D:FA:E5)
  //write(deviceId, serviceUUID, characteristicUUID, value)
  // :: write(D2:03:16:2D:FA:E5, serviceUUID, characteristicUUID, value)
  //Returns a Promise.
}
