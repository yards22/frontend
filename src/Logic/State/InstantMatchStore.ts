import { action } from "mobx";
import { MBatsmanInstantMatch, MBowlerInstantMatch, MCreatingTheMatchArgs, MInstantMatch } from "../Model/MInstantMatch";
import { InstantMatchRepo } from "../Repository/InstantMatchRepo";
import {createBatsManInstantMatch, createBowlerInstantMatch} from "../Utils/InstantMatchUtil"

export class InstantMatchStore{
    instantMatchRepo : InstantMatchRepo;
    currentInstantMatch = {} as MInstantMatch;

    constructor(instantMatchRepo:InstantMatchRepo){
        this.instantMatchRepo = instantMatchRepo
    }

    @action
    GetCurrentMatch=()=>{
        return this.currentInstantMatch;
    }

    @action
    SetCurrentMatch=(x:MInstantMatch)=>{
        console.log("Current Summary",x)
        this.currentInstantMatch = x;
    }

    @action
    CreateNewMatch=async (creatingTheMatchArgs:MCreatingTheMatchArgs):Promise<number>=>{
        const y = await this.instantMatchRepo.createNewMatch(creatingTheMatchArgs);
        this.SetCurrentMatch(y);
        return y.match_id
    }

    // @action
    // SetOpeningPlayerDetails = async(instTempMatch:MInstantMatch)=>{
    //         let strikerBatsmanName = instTempMatch.strikerBatsman.batsmanName
    //         let nonStrikerBatsmanName = instTempMatch.nonStrikerBatsman.batsmanName
    //         let currentBowlerName = instTempMatch.currentBowler.bowlerName
    //         this.tempMatch = instTempMatch
    //         let strikerBatsman: MBatsman = createBatsMan(strikerBatsmanName,true,false)
    //         let nonStrikerBatsman : MBatsman = createBatsMan(nonStrikerBatsmanName,false,true)
    //         let currentBowler : MBowlerInstantMatch = createBowler(currentBowlerName,true)
    //         let x = [strikerBatsman,nonStrikerBatsman]
    //         let y = [currentBowler]
    //         if(this.tempMatch.currentBatingTeam === this.tempMatch.hostTeam){
    //            //host team bat situation
    //            this.tempMatch = {...this.tempMatch,hostTeamBatsMan:x,visitorTeamBowlers:y}
    //         }else{
    //             //host team bowl situation
    //             this.tempMatch = {...this.tempMatch,visitorTeamBatsMan:x,hostTeamBowlers:y}
    //         }
    //         this.SetCurrentMatch(this.tempMatch)
    //         this.SetCurrentScoreCard(
    //                 {
    //                     strikerBatsman,
    //                     nonStrikerBatsman,
    //                     currentBowler,
    //                     battingTeam:  this.tempMatch.battingOrder? this.tempMatch.battingOrder[0] : "",
    //                     bowlingTeam: this.tempMatch.battingOrder? this.tempMatch.battingOrder[1] : "",
    //                 }
    //         )
        
    // }


}