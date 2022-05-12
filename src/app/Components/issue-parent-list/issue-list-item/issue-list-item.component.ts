import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalStoreService } from 'src/app/Services/global-store.service';
import { PostIssueComponent } from '../../post-issue/post-issue.component';

@Component({
  selector: 'app-issue-list-item',
  templateUrl: './issue-list-item.component.html',
  styleUrls: ['./issue-list-item.component.css']
})
export class IssueListItemComponent implements OnInit {

  constructor(private dialog:MatDialog, private service:GlobalStoreService) { }
@Input() issueData:any=[];
  issueDate:any;
  expiryDate:any;
  returnDate:any=undefined;

  ngOnInit(): void {
    this.issueDate=new Date(this.issueData.issueDate).toDateString();
    this.expiryDate=new Date(this.issueData.expiryDate).toDateString();
    if(this.issueData.isActive==0)
    this.returnDate=new Date(this.issueData.returnDate).toDateString();
  }
  returnBook()
  {
    const returnDate:any=new Date(Date.now());
    console.log(this.issueData)
    console.log(new Date(returnDate.toString()).toDateString());
    const multiplier=10;
    if(!this.issueData)
    return;
    // this.service.putIssue(this.issueData.issueId,this.user.id,this.bookData.id, 0,this.bookData.issueDate, this.bookData.expiryDate, returnDate.toISOString());
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
          onSubmit:()=>{this.service.putIssue(this.issueData.id,0,this.issueData.bookId, 0,this.issueDate, this.expiryDate, returnDate.toISOString(), fine);this.dialog.closeAll();this.service.getAllIssuesStatic()},
        issueData:{
        issueDate:new Date(this.issueData.issueDate).toDateString(),
        expiryDate:new Date(this.issueData.expiryDate).toDateString(),
          returnDate:returnDate.toDateString(),
          fine:fine
      }}
    })
  }

}
