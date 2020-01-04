const config = {
    host: 'localhost',
    port: 5432,
    database: 'social_feed',
    user: 'postgres',
    password: '',
};

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');
//var path = require('path')

const bcrypt = require('bcrypt');

const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || config);

const Sequelize = require('sequelize')
const UsersModel = require('./models/users')
const PostsModel = require('./models/posts')
const CommentsModel = require('./models/comments')

const connectionString = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
const sequelize = new Sequelize(process.env.DATABASE_URL || connectionString, {
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

// const sequelize = new Sequelize('social_feed', 'postgres', '', {
//     host: 'localhost',
//     dialect: 'postgres',
//     pool: {
//         max: 10,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// })

//Models
const Users = UsersModel(sequelize, Sequelize)
const Posts = PostsModel(sequelize, Sequelize)
const Comments = CommentsModel(sequelize, Sequelize)


//Joins
Users.hasMany(Posts, {foreignKey: 'user_id'})
Posts.belongsTo(Users, {foreignKey: 'user_id'})
Comments.belongsTo(Posts, {foreignKey: 'post_id'})
//Posts.hasMany(Comments, {foreignKey: 'comments'})

//create app
var app = express();

//add options to app
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser())

//templates
app.use("/static", express.static('./static/'));
//app.use(express.static(path.join(__dirname, 'views')))
//app.set('view engine', 'ejs');


// GET /api/login
app.get('/login', function (req, res) {
    res.render('pages/login')
});

app.get('/register', function (req, res) {
    res.render('pages/register');
}); 

app.get('/profile', function (req, res) {
    res.render('pages/profile');
}); 

app.get('/', function(req, res) {
    res.render('pages/index');
});

// GET / working
app.get('/api/posts', function (req, res) {
    Posts.findAll({include: [Users]}).then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
});

// GET specific post //WORKS
app.get('/api/posts/:id', (req, res) => {
    let id = req.params.id;
    console.log(req.params.id, 'id');

      db.one("SELECT * FROM posts WHERE id=$1", [id])
        .then((results) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        })
        .catch((e) => {
            console.error(e);
        });
});

app.post('/api/posts', function (req, res) {
    let data = {
        body: req.body.body,
        user_id: req.body.user_id, 
        image_url: req.body.image_url
       // name: req.body.user.name
    };
   // if(data.body && data.user_id && data.image_url) {
        Posts.create(data).then(function (post) {
            console.log(post)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(post));
    // }).catch(function(e) {
    //     res.status(434).send('unable to save post.')
    // })
    });

})


//update one post
app.put('/api/posts/:id', function (req, res) {
    let id = req.params.id;
    let data = {
        id: id,
       // title: req.body.title,
        body: req.body.body,
        image_url: req.body.image_url
    };
    let query = "UPDATE posts SET title=${title}, body=${body}, image_url=${image_url} WHERE id=${id}";
    db.one(query, data)
        .then((result) => {
            db.one(query, data)
                .then((result) => {
                    db.one("SELECT * FROM posts JOIN users ON posts.user_id=users.id WHERE posts.id=$1", [id])
                        .then((results) => {
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify(results));
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                })
                .catch((e) => {
                    console.error(e);
                });
        })
        .catch((e) => {
            console.error(e);
        });
});

//delete a post
app.delete('/api/posts/:id', function (req, res) {
    let id = req.params.id;

    let query = `DELETE FROM posts WHERE id=${id}`;
    db.result(query)
        .then((result) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        })
        .catch((e) => {
            console.error(e);
        });
});

// GET /api/register
app.post('/api/register', function (req, res) {
    let data = {
        name: req.body.name,
        email: req.body.email.toLowerCase().trim(),
        password: req.body.password,
        profilePicture: req.body.profilePicture
    };
    if (data.name && data.email && data.password) {

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);

        data['password'] = hash;

        Users.create(data).then(function(user){
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        });;
    } else {
        res.status(434).send('Name, email and password is required to register')
    }
});



app.post('/api/login', function (req, res) {
    //console.log(req.body)
    let email = req.body.email.toLowerCase().trim();
    let password = req.body.password;
    
    if (email && password) {

        Users.findOne({
            where: {
                email: email
            },

        }).then ((results) => {
            //console.log(results, 'results');
            bcrypt.compare(password, results.password).then(function(matched) {
                if (matched) {

                    //res.session.user = results.id;
                    //req.session.name = results.name;

                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                } else {
                    res.status(434).send('Email/Password combination did not match')
                }
            });
        }).catch((e) => {
                res.status(434).send('Email does not exist in the database')
            });
        
    } else {
        res.status(434).send('Both email and password is required to login')
    }
});


//post a comment to a specific post  //WORKS
app.post('/api/posts/comment', function (req, res) {
    let data = {
        comment: req.body.comment,
        user_id: req.body.user_id,
        post_id: req.body.post_id
       // comment_date: req.body.comment_date
    };
    let query = "INSERT INTO comments(comment, user_id, post_id) VALUES (${comment}, ${user_id}, ${post_id}) RETURNING id";
    db.one(query, data)
        .then((result) => {
                    console.log('comment data', data, query);
            db.one("SELECT * FROM comments JOIN users ON comments.user_id=users.id WHERE comments.id=$1", [result.id])

                .then((results) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                })
                .catch((e) => {
                    console.error(e);
                });
        })
        .catch((e) => {
            console.error(e);
        });
});


//A route for getting all the comments in your database  //WORKS
// app.get('/api/comments', (req, res, next) => {
//     db.query(`SELECT * FROM comments JOIN users ON comments.user_id = users.id`)
//     .then((results) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify(results));
//     })
//     .catch((e) => {
//         console.error(e);
//     });
// });
app.get('/api/comments', (req, res) => {
    Comments.findAll({include: [Posts]}).then((results) => {
    //Comments.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
});

//A route for getting all the comments from a single user  ///WORKS
app.get('/api/comments/user/:id', (req, res) => {
    let id = req.params.id;

    db.query('SELECT * FROM comments JOIN users ON comments.user_id = users.id WHERE users.id=$1', [id])
    .then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
    .catch((e) => {
        console.error(e);
    });
});

//A route for getting all the comments that belong to a post   //WORKS
app.get('/api/comments/post/:id', (req, res, next) => {
    let id = req.params.id;

    db.query('SELECT * FROM comments WHERE post_id=$1', [id])
    .then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
    .catch((e) => {
        console.error(e);
    });
});

//A route for getting all the users  //WORKS
// app.get('/api/users', (req, res, next) => {
//     db.query(`SELECT * FROM users`)
//     .then((results) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify(results));
//     })
//     .catch((e) => {
//         console.error(e);
//     });
// });
app.get('/api/users', function (req, res) {
    Users.findAll() .then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
});

app.get('/api/user/:id', function(req, res) {
    let id = req.params.id;
    Users.findOne({ where: {id: id}  }).then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
});

app.post('/api/user/:id', function(req, res) {
    let id = req.params.id;
    res.setHeader('Content-Type', 'application/json');
    Users.findOne({ where: {id: id}  }).then((user) => {
        if (!user) {
            res.end({error: 'no user found'});
        }
        let data = {}
        if (req.body.name) { data.name = req.body.name }
        if (req.body.email) { data.email = req.body.email }
        if (req.body.profilePicture) { data.profilePicture = req.body.profilePicture }
        user.update(data);
        res.end(JSON.stringify(user));
    });
});

//A route for getting posts from a single user  //WORKS
app.get('/api/users/posts/:id', (req, res, next) => {
    let id = req.params.id;
    if(id){
        db.query(`SELECT * FROM posts WHERE user_id=${id}`)
        .then((results) => {
        
            if(results.id = id) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(results));
            } else {
                res.status(434).send('user not found ');
        }
        
        
    })
    }
});

app.listen(3000, function(){
    console.log('Social Feed API is now listening on port 3000...');
})