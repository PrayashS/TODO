import { Component, OnInit, ɵPendingTasks } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  
  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask(){
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert('Unable to get data')
    });
  }

  addTask() {
      this.taskObj.task_name = this.addTaskValue;
      this.crudService.addTask(this.taskObj).subscribe(res => {
        this.ngOnInit();
        this.addTaskValue = '';
      }, err => {
        alert(err);
      })
    }

    editTask(){
      this.crudService.editTask(this.taskObj).subscribe(res => {
        this.ngOnInit();
      }, err => {
        alert('Failed to update task')
      })
    }

    deleteTask(etask: Task){
      this.crudService.deleteTask(etask).subscribe(res => {
        this.ngOnInit();
      }, err => {
        alert('Failed to delete task')
      })
    }
}
