const express = require('express')
const { join } = require('path')
const { createConnection } = require('mysql2')
const app = express()
const db = createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'burgers_db'
})

//declare non-handlebars middleware
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//declare handlebars middleware using hbs extension
app.engine('.hbs', require('express-handlebars')({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

//view routing & database queries here
app.get('/', (req, res) => {
  db.query('SELECT * FROM burgers WHERE ?', { devoured:0 }, (e, burgers) => {
  if (e) throw e
  res.render('index', { burgers })
  })
})

app.get('/devoured', (req, res) => {
  db.query('SELECT * FROM burgers WHERE ?', { devoured:1 }, (e, eatenBurgers) => {
  if (e) throw e
  res.render('index', { eatenBurgers })
  })
})

app.post('/burgers', (req, res) => {
  db.query('INSERT INTO burgers WHERE ?', { devoured:0 }, (e, burgers) => {
  if (e) throw e
  res.sendStatus(200)
  })
})

app.delete('/burgers/:id', (req, res) => {
   db.query('DELETE FROM burgers WHERE ?', { id: req.params.id }, e => {
   if (e) throw e
   res.sendStatus(200)
   })
})



//create database connection to listen on a port
db.connect(_ => app.listen(3000))