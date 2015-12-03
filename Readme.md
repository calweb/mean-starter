# MEAN Starter

### Features

- Token based Auth
- Oauth with Github and/or Google
- User roles
- File upload

more coming soon!

### Getting Started

For local development, you'll need the MongoDB database installed on your machine.

If you are using homebrew, simply type `brew install mongodb`.

Once you have Mongo installed via Homebrew, you want to be able to start/stop it.

To start, simply type in terminal `mongod`.  Local development in mean-starter uses the default test database provided in mongodb.

Next you will need to install the dependencies:
```
npm install
```

Then you will need gulp installed to run gulp commands.

```
gulp serve-dev
```
It should open your default browser window and update any changes as you develop.

A lot of inspiration from [Sahat's hackathon starter](https://github.com/sahat/hackathon-starter) with far less features.
