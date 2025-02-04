const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// User registration route
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;  // Retrieve username and password from the request body
    
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(400).json({ message: "Both username and password are required" });
    }

    // Check if the username already exists
    if (users[username]) {
        return res.status(400).json({ message: "Username already exists" });
    }

    // Store new user data (for example, in a simple object)
    users[username] = { password: password };  // You can add more details if needed

    // Return success response
    return res.status(200).json({ message: "User registered successfully" });
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json({ books: books });
});

// Get book details based on ISBN
//  Get book review
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn; 

    if (books[isbn]) {
        return res.status(200).json(books[isbn]); 
    } else {
        return res.status(404).json({ message: "Book not found" }); 
    }
});

public_users.post("/review/:isbn", function (req, res) {
    const isbn = req.params.isbn;
    const review = req.query.review;  // Get the review from the query parameter

    // Check if review is provided
    if (!review) {
        return res.status(400).json({ message: "Review text is required" });
    }



    // Check if the book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Check if the user has already reviewed this book
    if (books[isbn].reviews[username]) {
        // Modify the existing review
        books[isbn].reviews[username] = review;
        return res.status(200).json({ message: "Review updated successfully" });
    } else {
        // Add a new review for this book
        books[isbn].reviews[username] = review;
        return res.status(201).json({ message: "Review added successfully" });
    }
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    let result = [];

    // Iterate over books to find matches
    Object.keys(books).forEach((key) => {
        if (books[key].author.toLowerCase() === author) {
            result.push(books[key]); // Store matching books
        }
    });

    // If books found, return the list
    if (result.length > 0) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ message: "No books found for this author" });
    }
});



// ✅ Get books by Title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    let result = [];

    // Iterate over books to find matches
    Object.keys(books).forEach((key) => {
        if (books[key].title.toLowerCase().includes(title)) { // Match title (substring search)
            result.push(books[key]); // Store matching books
        }
    });

    // If books found, return the list
    if (result.length > 0) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ message: "No books found for this title" });
    }
});


// Get book reviews based on ISBN
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;  // Retrieve ISBN from request parameters

    // Check if the book exists in the 'books' object
    if (books[isbn]) {
        // Return the reviews of the book
        return res.status(200).json(books[isbn].reviews);
    } else {
        // Return error if the book is not found
        return res.status(404).json({ message: "Book not found" });
    }
});




module.exports.general = public_users;
