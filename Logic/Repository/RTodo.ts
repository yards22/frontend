import MTodo from "../Model/MTodo";
import { Request } from "../Utils/Fetch";
export interface IRTodo {
  getTodoList: () => Promise<MTodo[]>;
  createTodo: (todo: MTodo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

// this repo is for todo repository considering local use
// generally used for mocking or testing
export class RTodoLocal implements IRTodo {
  todoList: MTodo[] = [];

  async getTodoList() {
    return this.todoList;
  }
  async createTodo(todo: MTodo) {
    this.todoList.push(todo);
    return;
  }
  async deleteTodo(id: string) {
    const temp: MTodo[] = [];
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].id !== id) temp.push(this.todoList[i]);
    }
    this.todoList = temp;
    return;
  }
}

// this repo is for todo repository considering use with API
export class RTodoRemote implements IRTodo {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async getTodoList() {
    const todoList: MTodo[] = [];
    try {
      const res = await Request.Get(`${this.baseUrl}/`);
      if (res.status !== 200) {
        throw new Error("something went wrong");
      }
      const jsonData = await res.json();

      for (let i = 0; i < jsonData.data.length; i++) {
        const item = jsonData.data[i];
        todoList.push(new MTodo(item.id, item.title, item.description));
      }
      return todoList;
    } catch (err) {
      throw err;
    }
  }
  async createTodo(todo: MTodo) {
    try {
      const res = await Request.Post(`${this.baseUrl}/`, todo);
      if (res.status !== 200) {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  }
  async deleteTodo(id: string) {
    try {
      const res = await Request.Delete(`${this.baseUrl}/${id}`);
      if (res.status !== 200) {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  }
}
