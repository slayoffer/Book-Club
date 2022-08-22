// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book to list
UI.prototype.addBookToList = function (book) {
  const list = document.querySelector('#book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

// Show alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement('div');
  // Add class name
  div.className = `alert ${className}`;
  // Add text
  div.textContent = message;

  // Get parent
  const form = document.querySelector('#book-form');

  // Insert alert
  form.insertAdjacentElement('beforebegin', div);

  // Timeout after 3 sec
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

// Clear fields
UI.prototype.clearFields = function () {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
};

// Event listeners for add book
document.getElementById('book-form').addEventListener('submit', (e) => {
  // Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Instantiate the book object
  const book = new Book(title, author, isbn);

  // Instantiate the UI object
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert;
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success alert
    ui.showAlert('Book added successfully', 'success');

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', (e) => {
  // Instantiate the UI object
  const ui = new UI();
  // Delete book
  ui.deleteBook(e.target);

  // Show success alert
  ui.showAlert('Book deleted successfully', 'success');

  e.preventDefault();
});
