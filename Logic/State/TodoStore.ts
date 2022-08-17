import { observable, action, runInAction, makeAutoObservable } from "mobx";
import MTodo from "../Model/MTodo";
import { IRTodo } from "../Repository/RTodo";

export class TodoStore {
  @observable todoList: MTodo[] = [];
  @observable error: string | null = null;
  @observable message: string | null = null;
  constructor(private todoRepo: IRTodo) {
    makeAutoObservable(this);
  }

  @action
  fetchTodoList = async () => {
    this.message = "fetching todo list";
    try {
      const todoList = await this.todoRepo.getTodoList();
      runInAction(() => {
        this.todoList = todoList;
        this.message = "fetched todo";
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "something went wrong";
        this.message = null;
      });
    }
  };

  @action
  async createTodo(todo: MTodo) {
    this.message = "creating todo";
    try {
      await this.todoRepo.createTodo(todo);
      runInAction(() => {
        this.todoList.push({ ...todo });
        this.message = "todo created";
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "something went wrong";
        this.message = null;
      });
    }
  }

  @action
  async deleteTodo(id: string) {
    this.message = "deleting todo";
    try {
      await this.todoRepo.deleteTodo(id);
      runInAction(() => {
        let didDelete = false;
        // delete local copy
        const temp: MTodo[] = [];
        for (let i = 0; i < this.todoList.length; i++) {
          if (this.todoList[i].id !== id) temp.push(this.todoList[i]);
          else {
            didDelete = true;
          }
        }
        this.todoList = temp;
        this.message = didDelete ? "deleted todo" : "no such item exists";
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || "something went wrong";
        this.message = null;
      });
    }
  }
}
