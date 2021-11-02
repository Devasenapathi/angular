import { Injectable } from "@angular/core";
import { Country, Post, State } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class postServices{
  private posts :Post[]=[];
  private postUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient, private router:Router){}

  getCountries(){
    return[
      new Country(1,'Australia'),
      new Country(2, 'India'),
    ]
  }
  getStates(){
    return[
      new State(1,1,'sydney'),
      new State(2,1,'Melbourn'),
      new State(3,2,'TamilNadu')
    ]
  }



  getPosts(){
    this.http.get<{message:string,posts:any[]}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      return postData.posts.map(post =>{
        return{

          country:post.country,
          title: post.title,
          content: post.content,
          amount: post.amount,
          amountfrom: post.amountfrom,
          state:post.state,
          currency:post.currency,
          mop:post.mop,
          account:post.account,
          id: post._id
        }
      })
    }))
    .subscribe((transformendPosts)=>{
      this.posts= transformendPosts;
      this.postUpdated.next([...this.posts]);

    });
  }

  getPostUpdatedListener(){
    return this.postUpdated.asObservable();
  }

  getPost(id: string){
    return this.http.get<{country:string,reference:string,pan:string,amount:string,amountfrom:string,account:string,currency:string,mop:string,state:string}>("http://localhost:3000/api/posts/" +id);
  }

  addPosts( reference: string, pan:string, amount:string, amountfrom: string, country:string, state:string, currency:string,mop:string, account:string){
    const post: Post ={ id: null,country:country ,reference: reference, pan: pan , amount:amount, amountfrom:amountfrom, state:state, currency:currency, mop:mop, account:account, visibile:true}
    this.http.post<{message: string,postId: string}>('http://localhost:3000/api/posts', post)
     .subscribe((responseData)=>{
       const id = responseData.postId;
       post.id = id;
       this.posts.push(post)
       this.postUpdated.next([...this.posts])
       this.router.navigate(["/"]);
     })
  }

  updatePost(id:string, reference:string, pan:string, amount:string,amountfrom:string,country:string,state:string, currency:string,mop:string, account:string){
    const post:Post = {id:id, reference:reference, pan:pan, amount:amount,amountfrom:amountfrom,country:country, state:state, currency:currency, mop:mop, account:account};
    this.http.put("http://localhost:3000/api/posts/" + id , post)
    .subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p=>p.id===post.id);
      updatedPosts[oldPostIndex]=post;
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts])
      this.router.navigate(["/"]);
    })
  }

  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api/posts/"+ postId)
    .subscribe(()=>{
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts=updatedPosts;
      this.postUpdated.next([...this.posts])
      console.log("deleted");
    })
  }

}
