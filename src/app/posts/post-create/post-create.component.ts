import { Component,OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Country, Post, State } from '../post.model';
import { postServices } from '../posts.service';
import {FormControl, Validators} from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';

export class Currency {
  name:string;
}

export class Account{
  name:string;
}

export class MOP{
  name:string;
}


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  post:Post;
  private mode = 'create';
  private postId : any;

  currencies: Currency[] = [
    {name: "USD"},
    {name: "INR"},
    {name: "EURO"}
  ];

  accounts: Account[]=[
    {name: "SBI"},
    {name: "CUB"},
    {name: "ICICI"}
  ]

  mops: MOP[]=[
    {name: "Debit Card"},
    {name: "Credit Card"},
    {name: "Net BAnking"}
  ];
  selectedCountry: Country = new Country(1, 'India');
  countries!:Country[];
  states!:State[];
  selected!:string;




  constructor(public postsService: postServices,public route:ActivatedRoute){}


  ngOnInit(){
    this.countries = this.postsService.getCountries();
    this.changeCountry();
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId =paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData=>{
          this.post={
            country:postData.country ,
            reference: postData.reference,
            pan:postData.pan,
            amount:postData.amount,
            amountfrom:postData.amountfrom,
            state: postData.state,
            mop: postData.mop,
            account: postData.account,
            currency: postData.currency,};
        });
      }else{
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  changeCountry(){
    this.states = this.postsService.getStates().filter((item)=> item.countryid);
  }

  onSavePost(form: NgForm){
    if(form.invalid){
      return;
    }
    if(this.mode==='create'){


    this.postsService.addPosts(

      form.value.country,
      form.value.reference,
      form.value.pan,
      form.value.amount,
      form.value.amountfrom,
      form.value.state,
      form.value.account,
      form.value.currency,
      form.value.mop,)
    }else{
      this.postsService.updatePost(
        this.postId,
        form.value.country,
        form.value.reference,
        form.value.pan,
        form.value.amount,
        form.value.amountfrom,
        form.value.state,
        form.value.account,
        form.value.currency,
        form.value.mop,
      );
    }
    form.resetForm();
  }
}
