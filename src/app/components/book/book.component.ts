import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  books: Book[] = [];
  selectedBook: Book = new Book();
  showConfirmationDialog: boolean = false;
  actionType: string = '';

  constructor(private bookService: BookService, private authService: AuthService, private router: Router){

  }
  ngOnInit(): void {
    this.getBooks();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

  addBook(childResult: boolean):void {
    if(childResult){
      this.bookService.addBook(this.selectedBook).subscribe(
        (response) => {
          console.log('Added book:',response);
          this.getBooks();
        },
        (error) => {
          console.error('Error adding book:', error);
        }
      );
      this.clearSelection();
      this.showConfirmationDialog = false
    }else{
      this.showConfirmationDialog = false
    }
  }
  confirmEditBook(): void {
    this.actionType = 'edit'
    this.showConfirmationDialog = true;

  }

  confirmAddBook(): void {
    if(this.selectedBook.title == ""){
      this.showConfirmationDialog = false;
    }
    else {
      this.actionType = 'add'
      this.showConfirmationDialog = true;
    }
  }
  handleAction(childResult: boolean): void {
    if(this.actionType == 'add'){
      this.addBook(childResult);
    }
    if(this.actionType == 'edit'){
      this.updateBook(childResult)
    }
    if(this.actionType == 'delete'){
      this.deleteBook(childResult)
    }
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe(book => (this.books = book))
  }
  selectBook(book: Book): void {
    this.selectedBook = { ...book };
  }

  updateBook(childResult: boolean): void {
    if(childResult){
      this.bookService.updateBook(this.selectedBook).subscribe(
        (response) => {
          console.log('Book updated!', response);
          this.getBooks();
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
      this.clearSelection();
      this.showConfirmationDialog = false
    }else{
      this.showConfirmationDialog = false
    }
  }
  clearSelection(): void{
    this.selectedBook = new Book();
  }
  deleteBook(childResult: boolean): void{
    if(childResult){
      this.bookService.deleteBook(this.selectedBook._id).subscribe(
        (response) => {
          console.log('Book deleted!');
          this.getBooks();
        },
        (error) => {
          console.error('Error deleting book:', error);
        }
      );
      this.clearSelection();
      this.showConfirmationDialog = false
    }else{
      this.clearSelection();
      this.showConfirmationDialog = false
    }
  }
  confirmDeleteBook(book: Book){
    this.selectedBook.title = book.title;
    this.selectedBook._id = book._id;
    this.actionType = 'delete'
    this.showConfirmationDialog = true;
  }
}
