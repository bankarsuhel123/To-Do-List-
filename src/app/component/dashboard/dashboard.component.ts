import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/model/crud';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskObj: Crud = new Crud();
  taskArr: Crud[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';
  model = new Crud();

  constructor(private TaskService: TaskService) { }

  ngOnInit(): void {
    this.editTaskValue = '',
      this.addTaskValue = '';
    this.taskObj = new Crud();
    this.taskArr = []
    this.getAllTask();
  }

  getAllTask() {
    this.TaskService.getTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert(err)
    })
  }
  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.TaskService.addTask(this.taskObj).subscribe((data) => {
      this.ngOnInit();
      this.addTaskValue = ''
    }, err => {
      alert(err);
    })
  }
  editTask() {
    this.taskObj.task_name = this.editTaskValue
    this.TaskService.updateTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert('failed to update task')
    })
  }
  deleteTask(etask: Crud) {
    this.TaskService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert('failed to delete task')
    })
  }
  call(etask: Crud) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name
  }
}
