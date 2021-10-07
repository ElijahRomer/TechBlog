const router = require(`express`).Router();
const withAuth = require(`../utils/auth`);


router.get(`/dashboard`, withAuth, (req, res) => {
  res.render(`dashboard`);
});

router.get(`/login`, (req, res) => {
  res.render(`login`);
});

router.get(`/`, (req, res) => {
  res.render(`homepage`);
});
module.exports = router;