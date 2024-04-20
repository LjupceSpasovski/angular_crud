import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:3500/books'; 

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(updatedBook: Book): Observable<Book> {
    const url = `${this.apiUrl}/${updatedBook._id}`;
    console.log({url})
    return this.http.put<Book>(url, updatedBook);
  }

  deleteBook(bookId: string): Observable<void> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.delete<void>(url);
  }

}
