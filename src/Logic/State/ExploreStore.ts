import { action, makeAutoObservable, observable } from "mobx";
import { MFollow, MRecommended } from "../Model/MExplore";
import { ExploreRepo } from "../Repository/ExploreRepo";

export class ExploreStore{
    @observable isLoading: boolean = false;
    @observable FollowingList : MFollow[] = [];
    @observable FollowersList : MFollow[] = [];
    @observable RecommendationsList : MRecommended[] = [];
    exploreRepo : ExploreRepo;

    constructor(exploreRepo : ExploreRepo){
        makeAutoObservable(this)
        this.exploreRepo = exploreRepo
    }

    @action
    SetLoading = (loadingStatus:boolean)=>{
        this.isLoading = loadingStatus
    }

    @action
    SetFollowing = (FollowingList:MFollow[])=>{
        this.FollowingList = FollowingList
    }

    @action
    SetRecommendations = (recommendationList : MRecommended[]) =>{
        this.RecommendationsList = recommendationList
    }

    @action
    GetFollowing = async (token:string) => {
        this.SetLoading(true)
        try{
            const followingList = await this.exploreRepo.getFollowing(token);
            this.SetFollowing(followingList)
        }catch(err){
            throw err;
        }finally{
            this.SetLoading(false)
        }
    }

    @action
    GetFollowers = async (token:string) => {
        this.SetLoading(true)
        try{
            const followersList = await this.exploreRepo.getFollowers(token);
            this.FollowersList = followersList
        }catch(err){
            throw err;
        }finally{
            this.SetLoading(false)
        }
    }

    @action
    GetRecommendations = async (token:string) =>{
        this.SetLoading(true)
        try{
            const recommendationsList = await this.exploreRepo.getRecommendations(token);
            this.SetRecommendations(recommendationsList)
        }catch(err){
            throw err;
        }finally{
            this.SetLoading(false)
        }
    }

    @action 
    MakeNewConnection = async(props :{user_id: number , token : string}) =>{
        this.SetLoading(true)
        try{
            const response = await this.exploreRepo.makeNewConnection(props);
            return response;
        }catch(err){
            throw err;
        }finally{
            this.SetLoading(false)
        }
    }

    @action 
    DeleteNewConnection = async(props :{user_id: number , token : string}) =>{
        this.SetLoading(true)
        try{
            const response = await this.exploreRepo.deleteNewConnection(props);
            return response;
        }catch(err){
            throw err;
        }finally{
            this.SetLoading(false)
        }
    }
}