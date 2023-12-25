const express = require('express');
const  cors = require('cors');
const app = express();
require ("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pwyhut1.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const tasksCollection = client.db('SmartTaskDB').collection('tasks');

    app.get('/tasks', async (req, res) => {
        const cursor = tasksCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })
  

    app.post('/tasks', async (req, res) => {
        const task = req.body
        const result = await tasksCollection.insertOne(task)
        res.send(result)
      });



    // Send a ping to confirm a successful connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error

  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
     res.send(' server in running ')
});

app.listen(port,()=>{
     console.log(`server is running on port ${port}`)
})
