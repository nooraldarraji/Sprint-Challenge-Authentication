const router = require('express').Router();
const Users = require('../users/users-model.js')

router.post('/register', (req, res) => {
  // implement registration
  let { username, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 8)
  Users.add({ username, password: hashedPassword})
  .then(saved => {
    res
    .status(201)
    .json({ message: `The user ${saved} has been Created succesfully!` })
  })
  .catch(()=> {
    res
    .status(401)
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
      res
        .json({ message: "User has been inside the data base"})
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
