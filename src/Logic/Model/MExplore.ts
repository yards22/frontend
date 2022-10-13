export interface MFollow{
    username : string,
    profile_pic_uri : string |null,
    user_id : number
}

export interface MRecommended{
    username : string,
    profile_pic_uri : string |null,
    user_id : number,
    cricindex : number,
}