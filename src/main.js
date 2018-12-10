const databaseMongo = require('./config/database');
const serverHapi = require('./config/server');
const config = require('./config/config');
const Auth = require('./routes/authRoute');
const Post = require('./routes/postRoute');
const userPost = require('./routes/userPostsRoute');

async function main() {
  const auth = new Auth();
  const posts = new Post();
  const userPosts = new userPost();
  const db = new databaseMongo(config.dbConfig.HOST);
  await db.connect();

  const server = new serverHapi(
    config.serverConfig.PORT,
    config.serverConfig.HOST,
    config.TokenKey.key
  );

  const routes = [
    auth.login(),
    auth.signUP(),
    auth.getMe(),
    userPosts.postUserFavPosts(),
    userPosts.getUserFavPosts(),
    userPosts.deleteUserFavPosts(),
    userPosts.postUserLikePosts(),
    userPosts.getUserLikedPosts(),
    userPosts.deleteUserLikedPosts(),
    posts.post(),
    posts.get(),
    posts.delete(),
    posts.put(),
  ];

  await server.init(routes);
}

main();
