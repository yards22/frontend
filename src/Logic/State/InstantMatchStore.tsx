import { action } from "mobx";
import { MBatsman, MBowler, MInstantMatch, MSettingUpScoreCard } from "../Model/MInstantMatch";
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
        this.currentMatch = x;
    }

    @action
    SetCurrentScoreCard = (x:MSettingUpScoreCard)=>{
        this.currentScoreCard = x;
    }

    @action
    CreateNewMatch=async ()=>{
        const y = await this.instantMatchRepo.createNewMatch();
        this.SetCurrentMatch(y);
    }

    @action
    SetBasicDetailsOfMatch= async (hostTeam:string,visitorTeam:string,tossWonTeam:string,teamOptedTo:string)=>{
        if(this.currentMatch){
            this.tempMatch = {...this.currentMatch,hostTeam,visitorTeam,tossWonTeam,teamOptedTo}
            if((tossWonTeam===hostTeam && teamOptedTo==="BAT") || (tossWonTeam===visitorTeam && teamOptedTo==="BOWL")){
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
    SetOpeningPlayerDetails = async(strikerBatsmanName:string,nonStrikerBatsmanName:string,currentBowlerName:string)=>{
        if(this.currentMatch){
            this.tempMatch = this.currentMatch
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


}