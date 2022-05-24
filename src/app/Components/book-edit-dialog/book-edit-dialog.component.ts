import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalStoreService } from 'src/app/Services/global-store.service';

@Component({
  selector: 'app-book-edit-dialog',
  templateUrl: './book-edit-dialog.component.html',
  styleUrls: ['./book-edit-dialog.component.css'],
})
export class BookEditDialogComponent implements OnInit {
  constructor(
    private service: GlobalStoreService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  name = new FormControl(this.data.name || '');
  author = new FormControl(this.data.author || '');
  description = new FormControl(this.data.description || '');
  image: any = undefined;
  handleFileSelect(evt: any): any {
    const file = evt.target.files[0];
    if (!file) {
      return false;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.image = reader.result?.toString();
    };
  }
  ngOnInit(): void {}
  onSubmit() {
    if (
      this.name.value == '' ||
      this.author.value == '' ||
      this.description.value == ''
    )
      return;
    this.service.putBooks(
      this.name.value,
      this.author.value,
      this.description.value,
      this.image
    );
    this.service.addBookStatic({
      name: this.name.value,
      auhtor: this.author.value,
      description: this.author.value,
      coverImage: this.image,
    });
    this.service.getBooksStatic();
    this.dialog.closeAll();
  }
  onEdit() {
    if (
      this.name.value == '' ||
      this.author.value == '' ||
      this.description.value == ''
    )
      return;
    this.service.editBook(
      this.name.value,
      this.author.value,
      this.description.value,
      this.data.id,
      this.data.issues,
      this.image
    );
    this.data.callback(
      this.name.value,
      this.author.value,
      this.description.value,
      this.image
    );
    this.dialog.closeAll();
  }
}
