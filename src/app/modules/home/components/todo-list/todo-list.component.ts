import { Component, DoCheck, OnInit } from '@angular/core';
import { first, last, VirtualTimeScheduler } from 'rxjs';

//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit, DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.setLocalStorage();
  }

  public deleteItemTaskList(event: number){
    this.taskList.splice(event, 1);    
  }

  public deleteAllTaskList(){
    const confirm = window.confirm("Quer apagar tudo?");

    if(confirm){
      this.taskList = [];
    }
    
  }

  public setEmitItemTaskList(event: string){
    this.taskList.push({task: event, checked: false});
  }

  public validationInput(event: string, index: number){

    if(!event.length){
      const confirm = window.confirm("A anotação está vazia, deseja deletar?");

      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }  
  }

}
