import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import IBook from '../Common/book.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  connectionStr = 'https://librarymsbackend.azurewebsites.net/';
  // connectionStr = `https://localhost:7057/`;
  books: any = [];
  issues: any = [];
  token: string | null = '';
  constructor(private http: HttpClient) {
    this.loadingSubject.next(0);
  }
  pageSize = 10;
  getBooks(pageNo = 1): Observable<any> {
    return this.http
      .get(
        `${this.connectionStr}books?pageNo=${pageNo}&pageSize=${this.pageSize}`
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  @Output() booksSubject = new Subject();
  @Output() issuesSubject = new Subject();
  @Output() loadingSubject = new Subject();
  tempSubjectValue = 0;

  updateLoading(num: number) {
    this.tempSubjectValue += num;
    this.loadingSubject.next(this.tempSubjectValue);
  }
  getBooksSize(): any {
    return this.http.get(`${this.connectionStr}books/count`);
  }
  getBooksStatic(pageNo = 1): any {
    this.booksSubject.next(this.books);
    if (this.user.username != 'null')
      this.user.username = localStorage.getItem('username');
    this.getBooks(pageNo).subscribe((books) => {
      this.books = books;
      this.booksSubject.next(books);
    });
  }
  getAllIssuesStatic(): any {
    this.issuesSubject.next(this.issues);
    if (this.user.username != 'null')
      this.user.username = localStorage.getItem('username');
    this.getAllIssues().subscribe((issues: any) => {
      this.issues = issues;
      this.issuesSubject.next(issues);
    });
  }
  getToken(): any {
    if (this.token == '') this.token = localStorage.getItem('token');
    return this.token;
  }
  deleteBooksStatic(id: number): any {
    this.books = this.books.filter((book: any) => book.id != id);
    this.booksSubject.next(this.books);
  }
  addBookStatic(book: any) {
    book.isBookActive = 1;
    this.books.push(book);
    this.booksSubject.next(this.books);
  }
  username: string | null = null;
  role: boolean | string | null = 'null';
  id: number | null = null;
  user = {
    id: this.id,
    username: this.username,
    password: '',
    role: this.role,
  };
  headers = new HttpHeaders();
  getUser(): Object {
    if (this.user.username == 'null' || this.user.username == null)
      this.user.username = localStorage.getItem('username');
    if (this.user.id == null) {
      this.user.id = Number(localStorage.getItem('userId'));
    }
    if (this.user.role == 'null') {
      if (localStorage.getItem('role') == '1') this.user.role = true;
      else this.user.role = false;
    }
    return this.user;
  }
  getIssues(bookId: Number) {
    return this.http.get(`${this.connectionStr}books/${bookId}/issues`, {
      headers: this.headers,
    });
  }
  putBooks(
    name: string,
    author: string,
    description: string,
    coverImage: string
  ): any {
    this.http
      .put(
        this.connectionStr + 'books',
        {
          name,
          author,
          description,
          coverImage,
        },
        { headers: this.headers }
      )
      .subscribe((res) => {});
  }
  putBook(name: string, author: string, description: string, id: number): any {
    this.http.put(
      this.connectionStr + 'books/' + id,
      {
        name: name,
        author: author,
        description: description,
      },
      { headers: this.headers }
    );
  }
  editBook(
    name: string,
    author: string,
    description: string,
    id: Number,
    issues: Number,
    coverImage: any
  ): any {
    if (!coverImage) coverImage = 'unchanged';
    this.http
      .put(
        this.connectionStr + 'books/' + id,
        {
          name,
          author,
          description,
          id,
          issues,
          coverImage,
        },
        { headers: this.headers }
      )
      .subscribe((res) => res);
  }
  deleteBook(id: Number) {
    this.http
      .delete(this.connectionStr + 'books/' + id, { headers: this.headers })
      .subscribe((res) => res);
  }
  putIssues(
    userId: number,
    bookId: number,
    isActive: number,
    issueDate: any,
    expiryDate: any,
    returnDate: any = 'null'
  ) {
    this.http
      .put(
        this.connectionStr + 'books/' + bookId + '/issues',
        {
          userId,
          bookId,
          isActive,
          issueDate,
          expiryDate,
          returnDate,
          fine: 0,
        },
        { headers: this.headers }
      )
      .subscribe((issue) => issue);
  }
  putIssue(
    issueId: number,
    userId: number,
    bookId: number,
    isActive: number,
    issueDate: any,
    expiryDate: any,
    returnDate: any,
    fine: any
  ) {
    this.http
      .put(
        this.connectionStr + 'books/' + bookId + '/issues/' + issueId,
        {
          userId,
          bookId,
          isActive,
          issueDate,
          expiryDate,
          returnDate,
          fine,
        },
        { headers: this.headers }
      )
      .subscribe((issue) => issue);
  }
  getAllIssues() {
    return this.http.get(this.connectionStr + 'books/issues', {
      headers: this.headers,
    });
  }
  toggleUser() {
    this.user.role = !this.user.role;
  }
  getIssuesByUserId(id: number) {
    return this.http.get(this.connectionStr + 'user/' + id + '/issues', {
      headers: this.headers,
    });
  }
  getIssuesByBookId(id: number) {
    return this.http.get(this.connectionStr + 'books/' + id + '/issues', {
      headers: this.headers,
    });
  }
  login(username: string, password: string) {
    return this.http.post(this.connectionStr + 'user/login', {
      username,
      password,
    });
  }
  signup(username: string, password: string, role: number) {
    return this.http.post(this.connectionStr + 'user/register', {
      username,
      password,
      role,
    });
  }
  setUser(username: string, role: number, token: string, id: number) {
    localStorage.setItem('username', username);
    localStorage.setItem('role', role.toString());
    localStorage.setItem('userId', id.toString());
    this.user.username = username;
    this.user.id = id;
    if (role == 1) this.user.role = true;
    else this.user.role = false;
    this.setToken(token);
  }
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', this.token);
    this.headers.append('Authorization', `bearer ${token}`);
  }
  logOut() {
    this.removeToken();
    localStorage.setItem('token', '');
    localStorage.setItem('role', 'null');
    localStorage.setItem('username', 'null');
    this.user.username = 'null';
  }
  removeToken() {
    this.headers.delete('Authorization');
  }
  queryBooks(query: string) {
    return this.http.get(this.connectionStr + 'books/query/' + query);
  }
}
