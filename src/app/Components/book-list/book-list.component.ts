import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GlobalStoreService } from 'src/app/Services/global-store.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnChanges {
  constructor(private store: GlobalStoreService) {}
  @Input() sectionTitle: any;
  @Input() itemList: any = [];
  @Input() dataType: any = 0; //0 book, 1 issue
  maxBookCount = 10;
  currentPage = 0;
  filteredList: any = [...this.itemList];
  collapsed: boolean = false;
  ngOnInit(): void {
    this.paginate();
  }
  ngOnChanges(): void {
    this.paginate();
  }
  toggleCollapse = () => {
    this.collapsed = !this.collapsed;
  };
  deleteCallback = (id: number) => {
    this.itemList = this.itemList.filter((book: any) => book.id != id);
  };
  paginatorToggle() {
    alert('works');
    return false;
  }
  getMaxPages = () => Math.ceil(this.itemList.length / this.maxBookCount);
  modifyPagination(num: number) {
    if (num > 0) {
      if (
        this.maxBookCount * (this.currentPage + 2) - this.itemList.length <
        this.maxBookCount
      ) {
        this.currentPage += num;
      }
    }
    if (num < 0) {
      if (this.currentPage > 0) {
        this.currentPage += num;
      }
    }
    this.paginate();
  }
  paginate() {
    this.filteredList = this.itemList.filter(
      (i: any, k: any) =>
        k >= this.currentPage * this.maxBookCount &&
        k < (this.currentPage + 1) * this.maxBookCount
    );
    console.log(this.dataType, this.filteredList);
  }
}
