const express = require('express');
const mysql = require('mysql');

// define app for express
const app = express();

// Listen Port 
app.listen('3000', () => {
    console.log('Server started on port 3000');
});

// Create connection
const db = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    port        : 3306,
    database    : 'nodemysql'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

// Create DB : create nodemysql using get-api
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('databes(nodemysql) created...');
    });
});

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

// Insert post 1
app.get('/addpost1', (req, res) => {
    //data difinition
    let post = {title:'Post One', body:'This is post number one'};
    // Make Sql statement
    let sql = 'INSERT INTO posts SET ?';
    // Make query
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts 1 added...');
    });
});

// Insert post 2
app.get('/addpost2', (req, res) => {
    //data difinition
    let post = {title:'Post Two', body:'This is post number two'};
    // Make Sql statement
    let sql = 'INSERT INTO posts SET ?';
    // Make query (without 'let query=' of posts 1)
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts 2 added...');
    });
});

// Select posts
app.get('/getposts', (req, res) => {
    // Make Sql statement //
    let sql = 'SELECT * FROM posts';
    // Make query
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched...');
    });
});

// Select single post
app.get('/getpost/:id', (req, res) => {
    // Make Sql statement //
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`; //${}はテンプレートストリングという。
    // Make query
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched...');
    });
});

// Update post
app.get('/updatepost/:id', (req, res) => {
    // Difine Strings what you want to update
    let newTitle = 'Updated Title';
    // Make Sql statement //
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`; //${}はテンプレートストリングという。
    // Make query
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

// Delete post
app.get('/deletepost/:id', (req, res) => {
    // Make Sql statement //
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`; //${}はテンプレートストリングという。
    // Make query
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});

