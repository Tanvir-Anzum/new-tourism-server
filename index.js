const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const ObjectId = require('mongodb').ObjectId
//userme
//133075c
app.use(cors())
const MongoClient = require('mongodb').MongoClient
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ukmrv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
//const handler = (req, res) => {
  //res.send('Hello World!')
//}
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World then!')
})

app.listen(port, () => {
  console.log('Example app listening on port no a')
})

async function run() {
  try {
    await client.connect()

     const EventsCollection = client.db('tourism').collection('events')
     const ordersCollection = client.db('tourism').collection('orders')
    // const usersCollection = client.db('volunteerNetwork').collection('users')
    // const reviewCollection = client.db('volunteerNetwork').collection('review')

    // add Events
    app.post('/addEvent', async (req, res) => {
      console.log(req.body)
      const result = await EventsCollection.insertOne(req.body)
      console.log(result)
      res.send(result)
    })
     app.get('/allEvents', async (req, res) => {
       const result = await EventsCollection.find({}).toArray()
       res.send(result)
     })

      app.get('/singleItem/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id: ObjectId(req.params.id) }
        const result = await EventsCollection.findOne(query)
        res.json(result)
      })

    // get search events
   app.post('/orders', async (req, res) => {
     console.log(req.body)
     console.log('dekhi')
     const result = await ordersCollection.insertOne(req.body)
     res.send(result)
   })

    app.get('/orders', async (req, res) => {
      const result = await ordersCollection.find({}).toArray()
      res.send(result)
    })

    // add volunteer

    // get all volunteer

    // get all events
   app.get('/orders/:email', async (req, res) => {
     const result = await ordersCollection
       .find({
         email: req.params.email,
       })
       .toArray()
     res.send(result)
   })

  } finally {
  }
}
run().catch(console.dir)