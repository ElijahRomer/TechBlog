const router = require(`express`).Router();
const withAuth = require(`../../utils/auth`);
const { Comment, Post, User } = require(`../../models`)

router.post(`/login`, async (req, res) => {
  console.log(`/api/login ROUTE SLAPPED`)
  console.log(req.body)
  try {
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    };

    const userDataFormatted = userData.get({ plain: true });
    // let userInterests = userInterestsData.map((userInterest) => userInterest.get({ plain: true }));

    console.log(userDataFormatted);

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

router.get(`/logout`, withAuth, (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect(`../../`);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})

module.exports = router;