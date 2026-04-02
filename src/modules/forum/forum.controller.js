const forumService = require('./forum.service');

async function getCategories(req, res, next) {
  try {
    const categories = await forumService.getCategories();

    return res.status(200).json({
      categories,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getCategories,
};