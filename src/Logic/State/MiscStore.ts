import { action, observable } from "mobx";
import { MiscRepo } from "../Repository/MiscRep";

export class MiscStore{
    @observable isLoading : boolean = false;
    miscRepo : MiscRepo;

    constructor(miscRepo : MiscRepo){
        this.miscRepo = miscRepo
    }
  
    @action
    SetLoading = (x:boolean)=>{
        this.isLoading = x;
    }

    @action
    SendFeedback = async (props:{data:any,token:string}) =>{
        this.SetLoading(true)
        try{
            const res = await this.miscRepo.sendFeedback(props)
            return res
        }catch(err){
            throw err
        }finally{
            this.SetLoading(false)
        }
    }
}