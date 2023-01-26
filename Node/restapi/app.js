let express = require('express');
let app = express();
//let port = 9310;
let cors = require('cors');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 9310
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let bodyParser = require('body-parser')
let mongoUrl= "mongodb+srv://test:test1234@cluster0.bjjeqdw.mongodb.net/groceryData?retryWrites=true&w=majority"
//let mongoUrl ="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2"
let db;
app.use(cors())

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send('Hii from express')
})

// get all category

app.get('/category',(req,res) => {
    console.log(req.params.id);
    db.collection('category').find().toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})


//category data by filter
app.get('/category/:id',(req,res) => {
   // console.log(req.params.id)
    let category_id = Number(req.params.id)
    db.collection('category').find({category_id}).toArray((err,data) => {
        if(err) throw err;
        res.send(data)

    })
})


// get all products
app.get('/product',(req,res) => {
    db.collection('products').find().toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})
//data wrt product id

app.get('/product/:id',(req,res) => {
    let prod_id = Number(req.params.id);
    db.collection('products').find({_id:prod_id}).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//filter 

app.get('/products', (req, res)=>{
    console.log(req.query.category_id)
    let query= {}
    let category_id =Number(req.query.category_id)
    let name =Number(req.query.name)

    if(category_id){
        query={category_id:category_id}
    }
    else if(name){
        query={"products.name":name}
    }else
    {
        query={}
    }
    db.collection('products').find(query).toArray((err,data)=>{
        if(err) throw err;
        res.send(data);
        
    })


})

//Connection with db
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error While Connecting');
    db = client.db('GroceryData') // database name
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is running on port ${port}`)
    })
})

