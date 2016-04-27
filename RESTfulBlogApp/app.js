const express = require('express');
const app = express('require');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
var port = process.env.PORT || 3000;

var dbURI = "mongodb://localhost/restful_blog_app";

if(process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer())
app.use(methodOverride("_method"));

// MONGOOSE/MODEL_CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

// INSTANTIATE A MODEL
var Blog = mongoose.model('blog', blogSchema);

// RESTFUL ROUTES
app.get('/', (req, res) => {
    res.redirect("/blogs");
});

app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) console.log(err);
        else res.render("index", {blogs: blogs});
    });
});

app.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) console.log(err);
        else res.redirect("/blogs");
    });
});

// GET FORM TO POST ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// GET POST ROUTE
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) console.log(err);
        else res.render("show", {blog: foundBlog});
    });
});

// EDIT POST ROUTE
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err) console.log(err);
        else res.redirect("/blogs/" + req.params.id);
    });
});

// DELETE ROUTE
app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if (err) console.log(err);
        else res.redirect("/blogs");
    });
});

app.listen(port, () => {
    console.log("RESTful Blog App is running on http://localhost:" + port);
});
