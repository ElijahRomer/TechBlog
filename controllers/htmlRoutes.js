const router = require(`express`).Router();
const withAuth = require(`../utils/auth`);
const { Comment, Post, User } = require(`../models`)

router.get(`/dashboard`, withAuth, async (req, res) => {
  try {
    console.log(`/dashboard ROUTE SLAPPED`)
    console.log(req.session)

    // make a call for post data to render in response

    res.render(`dashboard`, {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get(`/login`, (req, res) => {
  console.log(`/login ROUTE SLAPPED`)
  console.log(req.session)

  res.render(`login`, {
    logged_in: req.session.logged_in
  });
});

router.get(`/`, (req, res) => {
  console.log(`/ ROUTE SLAPPED`)
  console.log(req.session)


  res.render(`homepage`, {
    logged_in: req.session.logged_in
  });
});
module.exports = router;