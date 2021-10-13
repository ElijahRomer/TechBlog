const router = require(`express`).Router();
const withAuth = require(`../utils/auth`);
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
    res.render(`error`, { err });
  }
});

router.get(`/login`, (req, res) => {
  console.log(`/login ROUTE SLAPPED`)
  console.log(req.session)
  try {
    res.render(`login`, {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.render(`error`, { err });
  }
});

router.get(`/createaccount`, (req, res) => {
  console.log(`/createaccount ROUTE SLAPPED`)
  console.log(req.session)
  try {
    res.render(`createAccount`, {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.render(`error`, { err });
  }
});


router.get(`/`, async (req, res) => {
  console.log(`/ ROUTE SLAPPED`)
  console.log(req.session)
  try {
    let rawBlogPostData = await Post.findAll({
      attributes: ["id", "creator_Id", "post_title", "post_body", "createdAt", "updatedAt"],
      include: [
        {
          model: User,
          attributes: ['user_name']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_body', 'createdAt'],
          include: [{ model: User, attributes: ['user_name'] }]
        }
      ]
    });

    const blogPostData = rawBlogPostData.map((blogPost) => blogPost.get({ plain: true }));

    console.log(blogPostData[0]);
    console.log(blogPostData[0].comments);
    console.log(blogPostData[0].comments);

    res.render(`homepage`, {
      logged_in: req.session.logged_in,
      blogPostData,
    });
  } catch (err) {
    console.log(err);
    res.render(`error`, { err });
  };
});

module.exports = router;