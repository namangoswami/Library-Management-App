import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './Components/book-list/book-list.component';
import { BookViewComponent } from './Components/book-view/book-view.component';
import { BooksParentListComponent } from './Components/books-parent-list/books-parent-list.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { IssueDetailsComponent } from './Components/issue-details/issue-details.component';
import { IssueParentListComponent } from './Components/issue-parent-list/issue-parent-list.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { RouteGuardGuard } from './Services/route-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'books',
        component: BooksParentListComponent,
        canActivate: [RouteGuardGuard],
      },
      {
        path: 'books/:bookId',
        component: BookViewComponent,
        canActivate: [RouteGuardGuard],
      },
      {
        path: 'books/:bookId/issues',
        component: IssueParentListComponent,
        canActivate: [RouteGuardGuard],
      },
      {
        path: 'books/:bookId/issues/:issueId',
        component: IssueDetailsComponent,
        canActivate: [RouteGuardGuard],
      },
    ],
  },
  { path: '**', redirectTo: '/books' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
