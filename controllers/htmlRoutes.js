const router = require(`express`).Router();
const withAuth = require(`../utils/auth`);
const { format_date_short, format_date_long, format_date_time } = require(`../utils/formatDateTime`);
const { Comment, Post, User } = require(`../models`)

router.get(`/dashboard`, withAuth, async (req, res) => {
  try {
    console.log(`/dashboard ROUTE SLAPPED`)
    console.log(req.session);

    // make a call for post data to render in response
    let rawUserPostData = await Post.findAll({
      where: {
        creator_id: req.session.user_id
      },
      include: [{ model: User }]
    });


    const userPosts = rawUserPostData.map((post) => post.get({ plain: true }));

    console.log(userPosts);

    res.render(`dashboard`, {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      userPosts,
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

router.get(`/createaccount`, (req, res) => {
  console.log(`/createaccount ROUTE SLAPPED`)
  console.log(req.session)

  res.render(`createAccount`, {
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