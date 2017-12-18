Touraine Tech Website
=====================
[![Build Status](https://travis-ci.org/TouraineTech/tourainetech.github.io.svg?branch=dev)](https://travis-ci.org/TouraineTech/tourainetech.github.io)

To work on the project checkout the `dev` branch.

Do not forget to install dependencies : `npm install`

To have a local live version use : `npm start`

file ending by print.scss are imported via a link for print only

Each pull requests are built and deployed on github pages.

## Using Docker

It just run the webpack-dev-server inside Docker... **NOT FOR PROD**


`make build` will create the project related Docker image

`make start` will start the web

Then visit [localhost:4000](http://localhost:4000)

`stop` and `restart` are available

### Docker for dev

Once image have been built and run you can use `make sync` to get downloaded *node_modules*.

After stopping the standalone container you can use `make dev start` to use your local filesystem instead of the image one.