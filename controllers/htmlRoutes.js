const router = require(`express`).Router();
const withAuth = require(`../utils/auth`);


router.get(`/dashboard`, withAuth, (req, res) => {
  console.log(`/dashboard ROUTE SLAPPED`)
  console.log(req.session)

  res.render(`dashboard`, {
    logged_in: req.session.logged_in
  });
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