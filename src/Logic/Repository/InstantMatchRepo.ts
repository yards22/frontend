import { MInstantMatch } from "../Model/MInstantMatch";

export class InstantMatchRepo{
    
    async createNewMatch(): Promise<MInstantMatch>{
        return { matchId:1, created_by: "user",currentInnings:1 }
    }
}