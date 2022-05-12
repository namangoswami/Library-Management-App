import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalStoreService } from 'src/app/Services/global-store.service';


@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {

  title:string="Think and Grow Rich";
  author:string="Napoleon Hill";
  issues:number=10;
  currentIssue:any=undefined;
  issueId:any=undefined;
  bookId:any=undefined;
  constructor(private route:ActivatedRoute, private service:GlobalStoreService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>{this.issueId=param.get('issueId');this.bookId=param.get('bookId');
    this.service.getIssuesByBookId(this.bookId).subscribe((issues:any)=>
    {
      this.currentIssue=issues.find((issue:any)=>issue.id==this.issueId);

    }
    )
  })

  }

}
