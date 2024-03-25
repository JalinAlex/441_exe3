console.log("I am Alex. my IP is 10.50.54.27 Mac address is CE-15-31-61-02-B5. Ncc student ID is: 223190738");
const sqlite3 = require('sqlite3').verbose();  
const fs = require('fs');  
  
// create or connect to sqlite3 database  
// if the file not exist, create automatically  
let db = new sqlite3.Database('./books.db', (err) => {  
    if (err) {  
        return console.error(err.message);  
    }  
    console.log('Connected to the books database.');  
  
    // create a table  
    db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title738 TEXT, author738 TEXT, isbn738 TEXT, description738 TEXT)', function(err) {  
        if (err) {  
            return console.error(err.message);  
        }  
        console.log('Books table created.');  

        // input book information  
        promptForBookDetails()
    });  
});  
  
function promptForBookDetails() {  
    const readline = require('readline').createInterface({  
        input: process.stdin,  
        output: process.stdout  
    });  
  
    readline.question('Enter book title738: ', (title) => {  
        readline.question('Enter book author738: ', (author) => {  
            readline.question('Enter book ISBN738: ', (isbn) => {  
                readline.question('Enter book description738: ', (description) => {  
                    readline.close();  
  
                    // Insert data  
                    db.run('INSERT INTO books (title738, author738, isbn738, description738) VALUES (?, ?, ?, ?)', [title, author, isbn, description], function(err) {  
                        if (err) {  
                            return console.error(err.message);  
                        }  
                        console.log('Book details added successfully.');  
                        askForAnotherBook();  
                    });  
                });  
            });  
        });  
    });  
}  
  
function askForAnotherBook() {  
    const readline = require('readline').createInterface({  
        input: process.stdin,  
        output: process.stdout  
    });  
    //ask for continue: yes-add another book, no-show table and close
    readline.question('Do you want to enter details for another book? (yes/no): ', (answer) => {  
        readline.close();  
        if (answer.toLowerCase() === 'yes') {  
            promptForBookDetails();  
        } else {  
            showAllBooks();  
        }  
    });  
}  
  
function showAllBooks() {  
    db.all('SELECT * FROM books', [], (err, rows) => {  
        if (err) {  
            return console.error(err.message);  
        }  
        console.log('All books in the database:');  
        rows.forEach((row)=>{
            console.log(`ID: ${row.id}, title738: ${row.title738}, author738: ${row.author738}, ISBN738: ${row.isbn738}, description738: ${row.description738}`);
        }) 
        db.close((err) => {  
            if (err) {  
                return console.error(err.message);  
            }  
            console.log('Closed the database connection.');  
        });  
    });  
}  