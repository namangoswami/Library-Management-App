import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './Components/top-bar/top-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookListComponent } from './Components/book-list/book-list.component';
import { BookListItemComponent } from './Components/book-list/book-list-item/book-list-item.component';
import { BookViewComponent } from './Components/book-view/book-view.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BooksParentListComponent } from './Components/books-parent-list/books-parent-list.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IssueDetailsComponent } from './Components/issue-details/issue-details.component';
import { IssueParentListComponent } from './Components/issue-parent-list/issue-parent-list.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { IssueListItemComponent } from './Components/issue-parent-list/issue-list-item/issue-list-item.component';
import { BookEditDialogComponent } from './Components/book-edit-dialog/book-edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './Components/login/login.component';
import { StoreModule } from '@ngrx/store';
import { PostIssueComponent } from './Components/post-issue/post-issue.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomInterceptor } from './Services/http-interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignupComponent } from './Components/signup/signup.component';
import { GlobalLoaderComponent } from './Components/global-loader/global-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BookListComponent,
    BookListItemComponent,
    BookViewComponent,
    DashboardComponent,
    BooksParentListComponent,
    IssueDetailsComponent,
    IssueParentListComponent,
    IssueListItemComponent,
    BookEditDialogComponent,
    LoginComponent,
    PostIssueComponent,
    SignupComponent,
    GlobalLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
