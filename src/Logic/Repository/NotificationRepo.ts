import {MNotification} from "../Model/MNotification"
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";
import { Request } from "../Utils/Fetch";
import { AuthHeaders } from "../../Atoms/Util";

export class NotificationRepo{
    baseUrl: string;
    rq: Request;
    constructor(baseUrl: string, rq: Request) {
        this.rq = rq;
        this.baseUrl = baseUrl;
    }
    
    async getNotifications(token:string) {
       try{
         const res = await this.rq.Get(this.baseUrl,AuthHeaders(token));
         const {body} = await CheckResponse(res,200);
         return body.data as MNotification[];
       }catch(err:any){
         ThrowFor(err,{})
       }
    }

    async updateNotification(){
        
    }
}