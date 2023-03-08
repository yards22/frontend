import { MCreatingTheMatchArgs, MInstantMatch } from "../Model/MInstantMatch";

export class InstantMatchRepo{
    
    async createNewMatch(creatingTheMatchArgs:MCreatingTheMatchArgs): Promise<MInstantMatch>{
        return { match_id:1,...creatingTheMatchArgs }
    }
}