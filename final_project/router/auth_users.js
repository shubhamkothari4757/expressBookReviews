const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Both username and password are required" });
    }

    // Check if the user exists and the password matches
    if (users[username] && users[username].password === password) {
        // Create a JWT token with the user data
        const token = jwt.sign({ username }, "your_secret_key", { expiresIn: '1h' });

        // Store the token in the session (for authentication in subsequent requests)
        req.session.authorization = { accessToken: token };

        return res.status(200).json({ message: "Login successful", token });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
