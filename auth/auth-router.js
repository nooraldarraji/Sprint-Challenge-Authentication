const router = require('express').Router();
const Users = require('../users/users-model.js')
const generateToken = require('../auth/jsw.js')
const bcrypt = require('bcrypt')

router.post('/register', (req, res) => {
  // implement registration
  let { username, password } = req.body
  console.log(req.body)
  const hashedPassword = bcrypt.hashSync(password, 8)
  Users.add({ username, password: hashedPassword})
  .then(saved => {
    res
    .status(201)
    .json({ message: `The user ${saved} has been Created succesfully!` })
  })
  .catch(()=> {
    res
    .status(500)
    .json({ message: "ERROR: User has not been created!" })
  })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body
  Users.findBy({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      res
        .json({ token: token})
    } else {
      res
        .status(401)
        .json({ message: "You shall not pass!" })
    }
  })
  .catch(error => {
    res
        .status(500)
        .json(error)
  })

});

module.exports = router;
