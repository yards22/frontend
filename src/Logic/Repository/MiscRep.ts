import { AuthHeaders } from "../../Atoms/Util";
import { Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";

export class MiscRepo{
    baseUrl  : string;
    rq : Request;
    constructor(baseUrl : string , rq:Request){
        this.baseUrl = baseUrl;
        this.rq = rq
    }
    
    async sendFeedback (props:{data:any,token:string}):Promise<number|undefined>{
        try{
            const data = props.data;
            const res = await this.rq.Post(`${this.baseUrl}/feedback`,data,AuthHeaders(props.token))
            const response = await CheckResponse(res,200)
            return response.status
        }catch(err){
            ThrowFor(err,{})
        }
    }
    


}