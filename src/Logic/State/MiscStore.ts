import { action, makeAutoObservable, observable } from "mobx";
import { MPoll } from "../Model/MPoll";
import { MiscRepo } from "../Repository/MiscRepo";

export class MiscStore {
  @observable token: string | null = null;
  @observable polls: MPoll[] | null = null;

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

  @action
  SetPolls(polls: MPoll[]) {
    this.polls = polls;
  }

  @action
  GetPolls = async () => {
    try {
      const polls = await this.miscRepo.getPolls(this.token || "");
      this.SetPolls(polls);
    } catch (err) {
      throw err;
    }
  };

  @action
  PostPollReaction = async (pollId: number, type: number) => {
    try {
      await this.miscRepo.postPollReaction(this.token || "", pollId, type);
      if (this.polls) {
        const polls = [...this.polls];
        for (let i = 0; i < polls?.length; i++) {
          if (polls[i].poll.poll_id === pollId) {
            polls[i].hasPolled = true;
            for (let j = 0; j < polls[i].reaction.length; j++) {
              if (polls[i].reaction[j].type === type) {
                polls[i].reaction[j].count++;
                break;
              }
            }
            break;
          }
        }
        this.SetPolls(polls);
      }
    } catch (err) {
      throw err;
    }
  };
}
