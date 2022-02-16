const express = require('express')
const { redirect } = require('express/lib/response')
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

//main page, collect all rectangles and display them
app.get('/database', async (req, res) => {

  try {
    const result = await pool.query('SELECT * FROM rect')
    const data = {results : result.rows}
    res.render('pages/mainpage', data)

  } catch (err) {
    res.send(err)
  }
})

//select rectangle by id and send to display page
app.get('/:id', async (req, res) => {

  console.log("method called id")
  try {
    const result = await pool.query(`SELECT * FROM rect WHERE uid='${req.params.id}'`)
    const data = {results : result.rows}
    res.render('pages/displaypage', data)

  } catch (err) {
    res.send(err)
  }
})

//delete rectangle by id
app.post('/deleteRect', async (req, res) => {

  console.log("method called delete")

  try {
    await pool.query(`DELETE FROM rect WHERE uid='${req.body.rowId}'`)
    res.redirect('/database')

  } catch (err) {
    res.send("No input found")
  }
})

// add rectangle to the database
app.post('/addRect', async (req, res) => {

  console.log("method called addRect")

  var name = req.body.name
  var width = req.body.width
  var height = req.body.height
  var colour = req.body.colour

  console.log(name, width, height, colour)

  try {
    await pool.query(`INSERT INTO rect (name, width, height, colour) VALUES ('${name}', '${width}', '${height}', '${colour}')`)
    res.redirect('/database')

  }catch(err) {
    res.send("Please fill in all fields")
  }
  
})

//update rectangle by id
app.post('/editRect', async (req, res) => {
  
    console.log("method called editRect")
  
    var name = req.body.name
    var width = req.body.width
    var height = req.body.height
    var colour = req.body.colour
    var rowId = req.body.uid
  

    if (name != "") {
      console.log(name)
      await pool.query(`UPDATE rect SET name='${name}' WHERE uid='${rowId}'`)
    }

    if (width != "") {
      console.log(width)
      await pool.query(`UPDATE rect SET width='${width}' WHERE uid='${rowId}'`)
    }

    if (height != "") {
      console.log(height)
      await pool.query(`UPDATE rect SET height='${height}' WHERE uid='${rowId}'`)
    }

    if (colour != "") {
      console.log(colour)
      await pool.query(`UPDATE rect SET colour='${colour}' WHERE uid='${rowId}'`)
    }
  
    // try {
    //   const result = await pool.query(`SELECT * FROM rect WHERE uid='${rowId}'`)
    //   const data = {results : result.rows}
    //   res.render('pages/displaypage', data)
  
    // } catch (err) {
    //   res.send(err)
    // }

    res.redirect('/database')
    
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
