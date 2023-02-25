import { action } from "mobx";
import { MBatsman, MBowler, MCreatingTheMatchArgs, MInstantMatch, MSettingUpScoreCard } from "../Model/MInstantMatch";
import { InstantMatchRepo } from "../Repository/InstantMatchRepo";
import {createBatsMan, createBowler} from "../Utils/InstantMatchUtil"

export class InstantMatchStore{
    instantMatchRepo : InstantMatchRepo;
    currentMatch : MInstantMatch | undefined;
    tempMatch : MInstantMatch | undefined;
    currentScoreCard : MSettingUpScoreCard |undefined;

    constructor(instantMatchRepo:InstantMatchRepo){
        this.instantMatchRepo = instantMatchRepo
    }

    @action
    SetCurrentMatch=(x:MInstantMatch)=>{
        console.log("Current Summary",x)
        this.currentMatch = x;
    }

    @action
    SetCurrentScoreCard = (x:MSettingUpScoreCard)=>{
        this.currentScoreCard = x;
    }

    @action
    CreateNewMatch=async (creatingTheMatchArgs:MCreatingTheMatchArgs):Promise<number>=>{
        const y = await this.instantMatchRepo.createNewMatch(creatingTheMatchArgs);
        this.SetOpeningPlayerDetails(y)
        return y.matchId
    }

    @action
    SetBasicDetailsOfMatch= async (hostTeam:string,visitorTeam:string,tossWonTeam:string,teamOptedTo:string)=>{
        if(this.currentMatch){
            this.tempMatch = {...this.currentMatch,hostTeam,visitorTeam,tossWonTeam,teamOptedTo}
            
            if((tossWonTeam===hostTeam && teamOptedTo==="bat") || (tossWonTeam===visitorTeam && teamOptedTo==="bowl")){
                //setting up host team bat
                this.tempMatch = {...this.tempMatch, currentBatingTeam:hostTeam,currentBowlingTeam:visitorTeam, battingOrder:[hostTeam,visitorTeam]}
            }else{
                //setting up host team bowl
                this.tempMatch = {...this.tempMatch, currentBatingTeam:visitorTeam,currentBowlingTeam:hostTeam,battingOrder:[visitorTeam,hostTeam]}
            }
            this.SetCurrentMatch(this.tempMatch)
        }
    }

    @action
    SetOpeningPlayerDetails = async(instTempMatch:MInstantMatch)=>{
            let strikerBatsmanName = instTempMatch.strikerBatsman.batsmanName
            let nonStrikerBatsmanName = instTempMatch.nonStrikerBatsman.batsmanName
            let currentBowlerName = instTempMatch.currentBowler.bowlerName
            this.tempMatch = instTempMatch
            let strikerBatsman: MBatsman = createBatsMan(strikerBatsmanName,true,false)
            let nonStrikerBatsman : MBatsman = createBatsMan(nonStrikerBatsmanName,false,true)
            let currentBowler : MBowler = createBowler(currentBowlerName,true)
            let x = [strikerBatsman,nonStrikerBatsman]
            let y = [currentBowler]
            if(this.tempMatch.currentBatingTeam === this.tempMatch.hostTeam){
               //host team bat situation
               this.tempMatch = {...this.tempMatch,hostTeamBatsMan:x,visitorTeamBowlers:y}
            }else{
                //host team bowl situation
                this.tempMatch = {...this.tempMatch,visitorTeamBatsMan:x,hostTeamBowlers:y}
            }
            this.SetCurrentMatch(this.tempMatch)
            this.SetCurrentScoreCard(
                    {
                        strikerBatsman,
                        nonStrikerBatsman,
                        currentBowler,
                        battingTeam:  this.tempMatch.battingOrder? this.tempMatch.battingOrder[0] : "",
                        bowlingTeam: this.tempMatch.battingOrder? this.tempMatch.battingOrder[1] : "",
                    }
            )
        
    }


}