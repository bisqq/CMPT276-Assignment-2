const express = require('express')
const res = require('express/lib/response')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg')
var pool
pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:root@localhost/rectangle"
})

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))

app.get('/database', async (req, res) => {

  try {
    const result = await pool.query('SELECT * FROM rect')
    const data = {results : result.rows}
    res.render('pages/mainpage', data)

  } catch (err) {
    res.end(err)
  }
})

app.get('/display', async (req, res) => {
  try {
    console.log(req.body)
    const result = await pool.query(`SELECT * FROM rect WHERE uid = '${req.body.id}'`)
    const data = {results : result.rows}
    res.render('pages/displaypage', data)

  } catch (err) {
    res.end(err)
  }
})

// add rectangle to the database
app.post('/addrect', (req, res) => {

  var name = req.body.name;
  var width = req.body.width;
  var height = req.body.height;
  var colour = req.body.colour;

  userQuery = `INSERT INTO rect VALUES ('${name}', '${width}', '${height}', '${colour}')`

  res.render(`pages/db`, {name: name, width: width, height: height, colour: colour})
})

// search the database using the uid
// app.get('/rectangle/:id', (req, res) => {
//   var uid = req.params.id;
// })

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
