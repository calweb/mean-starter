module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'A hard to guess string',
  MONGO_URI: process.env.MONGOLAB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/test',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'Google Client Secret',
  GITHUB_SECRET: process.env.GITHUB_SECRET || 'GitHub Client Secret',
  TRANSLOADIT_SECRET: process.env.TRANSLOADIT_SECRET || 'Some secret',
  TRANSLOADIT_KEY: process.env.TRANSLOADIT_KEY || 'Some key'
};
