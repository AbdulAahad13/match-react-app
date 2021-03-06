import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Cards from './dbCards.js'
//app config
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:po7nlBJtXGCE0f7g@cluster0.lxsn0.mongodb.net/matchdb?retryWrites=true&w=majority'
//middlewares
app.use(express.json())
app.use(cors())
//db config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})



//api endpoints
app.get('/', (req, res) => {
    res.status(200).send('hello programmers')
});

app.post('/match/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/match/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

//listner

app.listen(port, () => console.log(`listening on localhost: ${port}`));