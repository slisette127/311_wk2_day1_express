

const express = require('express')
const app = express()
const port = process.env.PORT || 4000

app.use(express.json());

const { users } = require('./state')

/* BEGIN - create routes here */
app.get('/users', (req,res) => {
  res.json(users)
}
) 
app.get('/users/:id', (req, res) => {
  const found = users.some(user => user._id == req.params.id)
  if (found) {
    res.send(users.filter(user => user._id == req.params.id))
  }
})
app.post('/users', (req, res) => {
  const newUser = {
    "_id": 6,
    "name": "Frank Zappa",
    "occupation": "musician",
    "avatar": "https://upload.wikimedia.org/wikipedia/commons/0/02/Frank_Zappa_1973_2.JPG"
    }
    if (!newUser.id) {
      res.status(400).json({msg:'new user needs id'})
    } 
    users.push(newUser)
    res.json(users)
})
app.put('/users/1', (req, res) => {
  users[0].name = "Trey MacDougal";
  res.json(users);
})

app.delete('/users/1',(req, res) => {
  users.shift()
  res.json(users)
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))