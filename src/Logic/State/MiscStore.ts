import { action, makeAutoObservable, observable } from "mobx";
import { MiscRepo } from "../Repository/MiscRepo";

export class MiscStore {
  @observable token: string | null = null;
  miscRepo: MiscRepo;

  constructor(miscRepo: MiscRepo) {
    makeAutoObservable(this);
    this.miscRepo = miscRepo;
    this.token = window.localStorage.getItem("token");
  }

  @action
  CreateFeedback = async (content: string, image?: File) => {
    try {
      await this.miscRepo.putFeedback(this.token || "", content, image);
    } catch (err) {
      throw err;
    }
  };
}
