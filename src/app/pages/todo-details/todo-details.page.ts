import { Component, OnInit, NgZone } from '@angular/core';
import { TaskI } from '../../models/task.interface';
import { TodoService} from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  todo: TaskI = {
    task: '',
    priority: 0
  };
  todoId = null;
  device:any = {};
  peripheral:any = {};
  statusMessage: string;

  constructor(private route: ActivatedRoute,
              private nav:NavController,
              private todoService: TodoService,
              private loadingController: LoadingController,
              private ble: BLE,
              private ngZone: NgZone,
              private statusBar: StatusBar

  ) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    //this.device = this.route.snapshot.params['device.id'];
    //if (this.device){
    //this.Connect(this.device);
    // }

    // else
    if (this.todoId){
       this.loadTodo();
     }
  }

  async Connect(device){
    const loading = await this.loadingController.create({
      message: `Connecting....${this.device.id}`
    })
    await loading.present();
    console.log(this.device.id);
    //this.setStatus('Connectedd to '+ this.device.name || this.device.id);
    this.ble.connect(this.device.id).subscribe(peripheral => {
      loading.dismiss();
      this.onConnected(peripheral);
      //peripheral => this.onDeviceDisconnected(peripheral)
    });
  }
  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    })
    await loading.present();
    this.todoService.getTodo(this.todoId).subscribe(res=> {
      loading.dismiss();
      this.todo = res;
    });
  }

  async saveTodo(){
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();

    if (this.todoId){
      //update
      this.todoService.updateTodo(this.todo, this.todoId).then (() => {
        loading.dismiss();
        this.nav.navigateForward('/');
    })
    } else {
      //Add new
      this.todoService.addTodo(this.todo).then (() => {
        loading.dismiss();
        this.nav.navigateForward('/');
  });
  }
}

  onRemove(idTodo: string){
    this.todoService.removeTodo(idTodo);
  }


  async onConnected(peripheral){
    this.ngZone.run(() => {
      //this.setStatus('');
      this.peripheral = peripheral;
    });
  }

  setStatus(message) {
  console.log(message);
  this.ngZone.run(() => {
    this.statusMessage = message;
  });
}

}
