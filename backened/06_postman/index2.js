import express from "express";

const app = express();
const PORT = 5008; 

// Middleware to parse JSON
app.use(express.json());

// In-memory book store
const books = [];

/*
    Book format:
    {
        id: __,
        name: ___,
        author: ___
    }
*/

// Create a new book
app.post('/book', (req, res) => {
    const { body } = req;
    const book = {
        id: books.length,
        ...body
    };

    books.push(book);
    res.status(201).send(book); // 201 Created
});

// Get all books
app.get("/books", (req, res) => {
    res.status(200).send(books); // 200 OK
});

// Get book(s) by query (id, name, author)
app.get("/book", (req, res) => {
    const { id, name, author } = req.query;

    if (id) {
        const book = books.filter(book => book.id === parseInt(id));
        return res.status(book.length ? 200 : 404).send(book.length ? book : "Not found");
    }

    let result = books;

    if (name) {
        result = result.filter(book => book.name === name);
    }

    if (author) {
        result = result.filter(book => book.author === author && (!name || book.name === name));
    }

    if (result.length > 0) {
        res.status(200).send(result);
    } else {
        res.status(404).send("Not found");
    }
});

// Replace a book entirely
app.put('/book', (req, res) => {
    const { id } = req.query;

    if (!id) return res.status(400).send("ID is required");

    const index = books.findIndex(book => book.id === parseInt(id));

    if (index === -1) return res.status(404).send("Not found");

    const updatedBook = { id: parseInt(id), ...req.body };
    books[index] = updatedBook;

    res.status(200).send(updatedBook);
});

// Update name or author (partial update)
app.patch("/book", (req, res) => {
    const { id, name, author } = req.query;

    if (!id) return res.status(400).send("ID is required");

    const index = books.findIndex(book => book.id === parseInt(id));

    if (index === -1) return res.status(404).send("Not found");

    if (name) books[index].name = name;
    if (author) books[index].author = author;

    res.status(200).send(books[index]); 
}); 

// Delete a book by ID
app.delete("/book/:id", (req, res) => {
    const { id } = req.params;

    const index = books.findIndex(book => book.id === parseInt(id));

    if (index === -1) return res.status(404).send("Not found");

    const deletedBook = books[index];
    books[index] = books[books.length - 1];
    books.pop();

    res.status(200).send(deletedBook);
});

// Start server
app.listen(PORT, () => {
    console.log("Server running at", PORT);
});
