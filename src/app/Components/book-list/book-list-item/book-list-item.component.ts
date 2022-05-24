import { Component, Input, OnInit } from '@angular/core';
import { GlobalStoreService } from 'src/app/Services/global-store.service';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css'],
})
export class BookListItemComponent implements OnInit {
  @Input() bookData: any;
  @Input() deleteCallback: any;
  constructor(private service: GlobalStoreService) {}
  user: any;
  issueDate: any = undefined;
  expiryDate: any = undefined;
  returnDate: any = undefined;
  ngOnInit(): void {
    this.user = this.service.getUser();
    if (!this.bookData.coverImage) {
      this.bookData.coverImage = `https://cdn-bmkfl.nitrocdn.com/QpdFqIcoTEvEOVPJSaFmHEBkUmzbEvDz/assets/static/optimized/wp-content/plugins/elementor/assets/images/4e1babbdd1538f8e168642eb6888cc04.placeholder.png`;
    }
    if (this.user.role == false) {
      if (this.bookData.issueDate) {
        this.issueDate = new Date(this.bookData.issueDate).toDateString();
      }
      if (this.bookData.returnDate && this.bookData.returnDate != 'null') {
        this.returnDate = new Date(this.bookData.returnDate).toDateString();
      } else if (this.bookData.expiryDate) {
        this.expiryDate = new Date(this.bookData.expiryDate).toDateString();
      }
    }
  }
  deleteBook() {
    this.service.deleteBook(this.bookData.id);
    this.service.deleteBooksStatic(this.bookData.id);
  }
}
