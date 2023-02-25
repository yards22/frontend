import { MCreatingTheMatchArgs, MInstantMatch } from "../Model/MInstantMatch";

export class InstantMatchRepo{
    
    async createNewMatch(creatingTheMatchArgs:MCreatingTheMatchArgs): Promise<MInstantMatch>{
        return { matchId:1, created_by: "user",...creatingTheMatchArgs }
    }
}