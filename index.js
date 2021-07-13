

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
    "_id": req.body.id,
    "name": req.body.name,
    "occupation": req.body.occupation,
    "avatar": req.body.avatar
    }
   
    users.push(newUser)
    res.json(users)
})
app.put('/users/:id', (req, res) => {
  const updateUser = req.body
  users.forEach(user => {
    if (user._id === parseInt(req.params.id))
    user.name = updateUser.name, 
    user.occupation = updateUser.occupation
  })
    res.json(users);
})

app.delete('/users/:id',(req, res) => {
  const found = users.some(user => user._id == req.params.id)
  if (found) {
    res.json({
      isActive: 'false',
      users: users.filter(user => user._id == parseInt(req.params.id))
    })
  }
 
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))