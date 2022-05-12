import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalStoreService } from 'src/app/Services/global-store.service';

@Component({
  selector: 'app-post-issue',
  templateUrl: './post-issue.component.html',
  styleUrls: ['./post-issue.component.css'],
})
export class PostIssueComponent implements OnInit {
  constructor(
    private service: GlobalStoreService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.dialog.closeAll();
    this.data.onSubmit();
  }
}
