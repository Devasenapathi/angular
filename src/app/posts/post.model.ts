
export class Post{
  id?: any;
  country?: string;
  reference?: string;
  pan?: string;
  amount?: string;
  amountfrom?: string;
  state?: string;
  account?: string;
  currency?: string;
  mop?: string;
  visibile?: boolean;
}

export class State{
  constructor(public id:number,public countryid:any ,public name:string){}
}
export class Country{
  constructor(public id:number,public name:string){}
}


