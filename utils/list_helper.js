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

const mostBlogs = (blogs) => {
  const newBlogsArr = blogs.map((blog) => blog.author);
  const mostBlogsArr = newBlogsArr.sort(
    (a, b) =>
      newBlogsArr.filter((v) => v === a).length -
      newBlogsArr.filter((v) => v === b).length
  );
  const mostBlogsAuthor = [...mostBlogsArr].pop();

  const blogCount = mostBlogsArr.filter((author) => author === mostBlogsAuthor)
    .length;
  const mostBlogsObj = {
    author: mostBlogsAuthor,
    blogs: blogCount,
  };
  return mostBlogsObj;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
};
