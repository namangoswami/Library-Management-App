import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalStoreService } from './Services/global-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: GlobalStoreService) {}
  isLoading = false;
  title = 'TC Library';
  ngOnInit() {
    this.store.loadingSubject.subscribe((val: any) => {
      if (val <= 0) {
        this.isLoading = false;
      } else this.isLoading = true;
      // alert('updated val' + val + ' ' + this.isLoading);
    });
  }
}
