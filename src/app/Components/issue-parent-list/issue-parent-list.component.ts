import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalStoreService } from 'src/app/Services/global-store.service';

@Component({
  selector: 'app-issue-parent-list',
  templateUrl: './issue-parent-list.component.html',
  styleUrls: ['./issue-parent-list.component.css']
})
export class IssueParentListComponent implements OnInit {

  constructor(private service:GlobalStoreService, private route:ActivatedRoute) { }
  id:any;
  issueListPast:any=[];
  issueListActive:any=[];
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      console.log(param);
      this.id = Number(param.get('bookId'));
    });
  this.service.getIssues(this.id).subscribe((issues:any)=>{
    this.issueListActive=issues.filter((i:any)=>i.isActive!=0);
    this.issueListPast=issues.filter((i:any)=>i.isActive==0);
  })
  }
}
