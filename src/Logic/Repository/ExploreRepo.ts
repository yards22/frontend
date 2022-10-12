import { AuthHeaders } from "../../Atoms/Util";
import { MFollow } from "../Model/MExplore";
import { Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";

export class ExploreRepo{
    baseUrl  : string;
    rq : Request;
    constructor(baseUrl : string , rq:Request){
        this.baseUrl = baseUrl;
        this.rq = rq
    }

    // async getFollowing(token : string): Promise<MFollow[]>{
    //     try{
    //         const res = await this.rq.Get(`${this.baseUrl}/whoAmIFollowing`,AuthHeaders(token));
    //         const {body} = await CheckResponse(res,200);
    //         return { body.data }
    //     }catch(err:any){
    //         throw ThrowFor(err, {})
    //     }
    // }

    // async getFollowers(token : string): Promise<MFollow[]>{
    //     try{
    //         const res = await this.rq.Get(`${this.baseUrl}/myfollowers`,AuthHeaders(token));
    //         const {body} = await CheckResponse(res,200);
    //         return { body.data }
    //     }catch(err:any){
    //         throw ThrowFor(err, {})
    //     }
    // }

    // async getRecommendations(token : string): Promise<MRecommended[]>{
    //     try{
    //         const res = await this.rq.Get(`${this.baseUrl}/`,AuthHeaders(token));
    //         const {body} = await CheckResponse(res,200);
    //         return { body.data }
    //     }catch(err:any){
    //         throw ThrowFor(err, {})
    //     }
    // }
    
    async makeNewConnection(props :{user_id: number , token : string}): Promise<number>{
        try{
            const res = await this.rq.Post(`${this.baseUrl}/`,{user_id : props.user_id},AuthHeaders(props.token));
            const {body} = await CheckResponse(res,200);
            return body.statusCode
        }catch(err:any){
            throw ThrowFor(err, {})
        }
    }

    async deleteNewConnection(props :{user_id: number , token : string}): Promise<number>{
        try{
            const res = await this.rq.Delete(`${this.baseUrl}/`,{user_id : props.user_id},AuthHeaders(props.token));
            const {body} = await CheckResponse(res,200);
            return body.statusCode
        }catch(err:any){
            throw ThrowFor(err, {})
        }
    }


}