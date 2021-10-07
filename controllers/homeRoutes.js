const router = require(`express`).Router();
const withAuth = require(`../utils/auth`);

router.get(`/`, (req, res) => {
  res.render(`homepage`);
});

router.get(`/dashboard`, withAuth, (req, res) => {
  res.render(`dashboard`);
});

router.get(`/loginCreateAccount`, withAuth, (req, res) => {
  res.render(`loginCreateAccount`);
});

module.exports = router;