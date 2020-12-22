const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const sum = likes.reduce((preValue, currValue) => preValue + currValue, 0);
  return sum;
};

const favouriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...likes);

  return blogs.find((blog) => blog.likes === mostLikes);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
