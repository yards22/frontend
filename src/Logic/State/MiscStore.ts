import { action, makeAutoObservable, observable } from "mobx";
import { MLeaderboard } from "../Model/MLeaderboard";
import { MPoll } from "../Model/MPoll";
import { MiscRepo } from "../Repository/MiscRepo";

export class MiscStore {
  @observable token: string | null = null;
  @observable polls: MPoll[] | null = null;
  @observable leaderboard: MLeaderboard[] | null = null;
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
    // sorting poll so that unpolled is set to first
    polls.sort((a, b) => {
      return a.hasPolled ? 1 : -1;
    });
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
            let found = false;

            // now lets try to find out the reactions
            for (let j = 0; j < polls[i].reaction.length; j++) {
              if (polls[i].reaction[j].type === type) {
                polls[i].reaction[j].count++;
                found = true;
                break;
              }
            }

            // first reaction
            if (!found) {
              polls[i].reaction.push({ type: type, count: 1 });
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

  @action
  GetLeaderboard = async () => {
    try {
      const lb = await this.miscRepo.getLeaderBoard(this.token || "");
      this.leaderboard = lb;
    } catch (err) {
      throw err;
    }
  };
}
