const router = require(`express`).Router();
const withAuth = require(`../../utils/auth`);
const { Comment, Post, User } = require(`../../models`)

router.post(`/`, withAuth, async (req, res) => {
  console.log(`POST "api/comment/" ROUTE SLAPPED`);
  try {
    const newComment = await Comment.create({
      creator_id: req.session.user_id,
      post_id: req.body.post_id,
      comment_body: req.body.comment_body,
    });

    newComment.user_name = req.session.user_name;

    res.status(201).json(newComment);

  } catch (err) {
    console.log(err);
    res.render(`error`, { err });
  };
})

module.exports = router;