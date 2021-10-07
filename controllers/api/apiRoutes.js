const router = require(`express`).Router();
const withAuth = require(`../../utils/auth`);
const { Comment, Post, User } = require(`../../models`)

router.post(`/login`, async (req, res) => {
  console.log(`/login ROUTE SLAPPED`)
  console.log(req.body)
  try {
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    };

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ message: `Login attempt successful!` })
    })

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})

router.get(`/logout`, (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect(`../`);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})

module.exports = router;