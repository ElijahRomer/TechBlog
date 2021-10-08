const router = require(`express`).Router();
const withAuth = require(`../../utils/auth`);
const { Comment, Post, User } = require(`../../models`)

// ROUTES GO HERE
router.get('/dashboard', async (req, res) => {
  res.json({ "msg": "/dashboard route response" })
})

module.exports = router;