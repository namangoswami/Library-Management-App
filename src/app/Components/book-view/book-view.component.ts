import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import IBook from 'src/app/Common/book.interface';
import { GlobalStoreService } from 'src/app/Services/global-store.service';
import { BookEditDialogComponent } from '../book-edit-dialog/book-edit-dialog.component';
import { PostIssueComponent } from '../post-issue/post-issue.component';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css'],
})
export class BookViewComponent implements OnInit {
  user:any;
  id: any;
  constructor(
    private route: ActivatedRoute,
    private service: GlobalStoreService,
    private dialog:MatDialog
  ) {}
  bookData: any={
    name:'',
    author:'',

  };
  issueDate:any=undefined;
  expiryDate:any=undefined;
  returnDate:any=undefined;
  requested:boolean=(this.bookData.isActive&&this.bookData.isActive!=0)?true:false;
  currentIssue:any=undefined;
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.id = Number(param.get('bookId'));
      this.service.getBooks().subscribe((data) => {
        this.bookData=data.find((i:any)=>this.id===i.id);
        this.service.getIssuesByUserId(this.user.id).subscribe((issues:any)=>{
          this.currentIssue=(issues.find((i:any)=>(i.id==this.bookData.id&&i.isActive==1)))
          this.requested=this.currentIssue?true:false;
          console.log(this.bookData, this.requested, this.currentIssue, issues);
          this.updateDates();
        }
        )
       });

    });
    this.user=this.service.getUser();
  //   this.service.getBooks().subscribe((data) => {
  //  this.bookData=data.find((i:any)=>this.id===i.id);
  // });


  }
  updateBook(name:string, author:string, description:string, image:string)
  {
    console.log(this.bookData, name, author, description);
    this.bookData.name=name;
    this.bookData.author=author;
    this.bookData.description=description;
    if(image)
    this.bookData.coverImage=image;
  }
  updateDates()
  {
    if(this.user.role==false&&this.currentIssue)
  {
    if(this.currentIssue.issueDate)
    {
      this.issueDate=new Date(this.currentIssue.issueDate).toDateString()
    }
    if(this.currentIssue.returnDate&&this.currentIssue.returnDate!="null")
    {
      this.returnDate=new Date(this.currentIssue.returnDate).toDateString()
    }
    else if(this.currentIssue.expiryDate)
    {
      this.expiryDate=new Date(this.currentIssue.expiryDate).toDateString()
    }
  }
  }
  editBook()
  {
    const dialogRef=this.dialog.open(BookEditDialogComponent, {
      width:'550px',
      data:{type:1, author:this.bookData.author, name:this.bookData.name, description:this.bookData.description, id:this.bookData.id, issues:this.bookData.issues, callback:(name:string, author:string, description:string, image:string)=>this.updateBook(name, author, description, image)}
    })
  }
  toggleRequested(){
    this.requested=!this.requested;
    this.currentIssue.isActive=!this.currentIssue.isActive;
    if(this.requested)
    {

      this.updateDates();
    }
  }
  requestBook()
  {
    // this.requested=true;
    const issueDate=new Date(Date.now());
    const expiryDate=new Date( issueDate.getFullYear(), issueDate.getMonth(),issueDate.getDate()+7);
    console.log(new Date( issueDate.getFullYear(), issueDate.getMonth(),issueDate.getDate()+7).toDateString())

    const dialogRef=this.dialog.open(PostIssueComponent, {
      width:'550px',
      data:{
          type:0,
          onSubmit:()=>{this.service.putIssues(this.user.id,this.bookData.id, 1,issueDate.toDateString(), expiryDate.toDateString());this.toggleRequested();this.dialog.closeAll()},
        issueData:{
        issueDate:issueDate.toDateString(),
        expiryDate:expiryDate.toDateString(),
      }}
    })
  }
  returnBook()
  {
    const returnDate:any=new Date(Date.now());
    console.log(this.currentIssue)
    console.log(new Date(returnDate.toString()).toDateString());
    const multiplier=10;
    if(!this.currentIssue)
    return;
    // this.service.putIssue(this.currentIssue.issueId,this.user.id,this.bookData.id, 0,this.bookData.issueDate, this.bookData.expiryDate, returnDate.toISOString());
    // this.requested=false;
    let fine:any;
    const days=Math.floor((new Date(Date.now()).getTime()-new Date(this.expiryDate).getTime())/(1000*3600*24));
    if(days<0)
    fine=0;
    else
    fine=days*multiplier;
    const dialogRef=this.dialog.open(PostIssueComponent, {
      width:'550px',
      data:{
          type:1,
          onSubmit:()=>{this.service.putIssue(this.currentIssue.issueId,this.user.id,this.bookData.id, 0,this.bookData.issueDate, this.bookData.expiryDate, returnDate.toISOString(), fine);this.toggleRequested();this.dialog.closeAll()},
        issueData:{
        issueDate:new Date(this.currentIssue.issueDate).toDateString(),
        expiryDate:new Date(this.currentIssue.expiryDate).toDateString(),
          returnDate:returnDate.toDateString(),
          fine:fine
      }}
    })
  }
}
