const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));// const uri = ""

app.set('view engine', 'ejs');

app.use(express.static('public'));

const uri = "mongodb+srv://root:1234@cluster0.ddjbo47.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    } catch (err) {
    console.error(err);
    } finally {
    await client.close();
    }
}

connect();

app.get('/', (req, res) => {
    console.log("Here is the");
    res.render('index')
})

app.get('/studentclaim', (req, res) => {
    // console.log("Here is the");
    var showAlert = req.query.showAlert;

    res.render('studentclaim',{showAlert: showAlert})
})

app.get('/studentclaimaff', (req, res) => {
    console.log("Here is the");
    res.render('studentclaimaff')
})

app.post('/insertj', (req, res) => {
    const name = req.body.list;
    const age = req.body.arr;
    const name2 = typeof req.body.list
    const obj = JSON.parse(req.body.list);
    obj["commentaire"] = age;
    // obj = JSON.stringify(obj)
    res.render('page', { name:  name2,age: obj["commentaire"] });
    
})



app.get('/admincm', (req, res) => {
    res.render('adminclainm'); 
})

app.get('/adminsubject', (req, res) => {
    res.render('adminsubject'); 
})



app.post('/insert', async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    
    try {
        await client.connect();
        const collection = client.db("mongodb_prj").collection("Reclamation");

        
        let age = req.body.arr;
        // let name2 = typeof req.body.list
        let obj = JSON.parse(req.body.list);
        obj["commentaire"] = age;
        // obj = JSON.stringify(obj);
        // res.render('page', { name:  name2,age: obj["commentaire"] });
        // const myObj = { name: 'John Doe', age: 30 };
        // const showAlert = true;
        await collection.insertOne(obj);
        res.redirect('/studentclaim?showAlert=true'); // redirect to the route for displaying data
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    } finally {
        await client.close();
    }
    });
    

    app.get('/adminclaim', async (req, res) => {
        try {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

         
          // Select the database and collection
          const db = client.db('mongodb_prj');
          const collection = db.collection('Reclamation');
      
          // Find all documents in the collection
          const result = await collection.find({}).toArray();
      
          // Send the result as a JSON response
        //   res.json(result);

          res.render('adminclaim', { data: result });
      
        } catch (err) {
          console.log(err);
          res.status(500).send('Internal server error');
        } 
      }); // Add a closing brace here
      
    
    
    
    // Route for displaying data
    // app.get('/users', async (req, res) => {
    // const client = new MongoClient(uri, { useNewUrlParser: true });
    
    // try {
    //     await client.connect();
    //     const collection = client.db("myFirstDatabase").collection("users");
    //     const users = await collection.find().toArray();
    //     res.render("users", { users: users });
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send(err);
    // } finally {
    //     await client.close();
    // }
    // });
    









// app.get('/form', function(req, res) {
//     res.render('index');
// });

// app.post('/submit', function(req, res) {
//     const name = req.body.name;
//     const age = req.body.age;

//     // Render the result with the form data
//     res.render('page', { name: name, age: age });
// });

app.listen(4000,()=>{
    console.log("server started on port 4000");
});
    