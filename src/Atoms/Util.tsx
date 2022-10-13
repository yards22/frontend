export function AuthHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export interface MInterest{ 
  value : string,
  label : string, 
  image ?: string, 
  info ?: string,
  disable ?: boolean,
}

export function findTheElement(props : {element:string,array:MInterest[]}) {
  return props.array.find(each => each.value === props.element)
}

export function filterAList(props : {element:string,array:MInterest[]}){
  return props.array.filter(each => each.value !== props.element)
}

export function findIndex(props : {element:MInterest,array:MInterest[]}){
  return props.array.indexOf(props.element)
}
