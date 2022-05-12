import { Component, OnInit } from '@angular/core';
import { GlobalStoreService } from 'src/app/Services/global-store.service';

@Component({
  selector: 'app-books-parent-list',
  templateUrl: './books-parent-list.component.html',
  styleUrls: ['./books-parent-list.component.css'],
})
export class BooksParentListComponent implements OnInit {
  books: any = [];
  issues: any = [];
  pastIssues: any = [];
  adminActiveIssues: any = [];
  adminPastIssues: any = [];
  user: any;
  constructor(private store: GlobalStoreService) {}
  ngOnInit(): void {
    this.user = this.store.getUser();
    this.store.getBooksStatic();
    this.store.booksSubject.subscribe((obs: any) => {
      console.log(this.books);
      this.books = [...obs];
    });
    if (this.user.role == false) {
      console.log('in booklist', this.user.id);
      this.store.getIssuesByUserId(this.user.id).subscribe((issues: any) => {
        this.issues = issues.filter((i: any) => i.isActive == 1);
        this.pastIssues = issues.filter((i: any) => i.isActive == 0);
      });
    } else {
      this.store.getAllIssuesStatic();
      this.store.issuesSubject.subscribe((issues: any) => {
        this.adminActiveIssues = issues.filter(
          (issue: any) => issue.isActive == 1
        );
        this.adminPastIssues = issues.filter(
          (issue: any) => issue.isActive == 0
        );
      });
    }
  }
}
