# OpenSea Whitelabel Marketplace

Embed a fully functional OpenSea marketplace on your own website in 3 quick steps! [Example marketplace](https://opensea-whitelabel.herokuapp.com/)

<img src="https://github.com/ProjectOpenSea/opensea-whitelabel/blob/master/screenshot-desktop.png" width="600" />
<img src="https://github.com/ProjectOpenSea/opensea-whitelabel/blob/master/screenshot-mobile.png" width="300" />

# Setup

### Installation

Run `yarn` to install dependencies.

### Configuration

Edit `constants.ts` to
1. Set the URL item you want to embed
  - You can embed any URL! TIP: you can include your affiliate address attached at the end, via "?ref=0x...", and earn referral bonuses!
2. Set the theme you want to use
  - You can pick between simple, day, night, and more to come!

### Quick deployment

1. `npm run publish` to get it on Heroku instantly
2. `npm run rename YOUR_NAME` to rename the url it publishes to
3. `npm run deploy` to deploy changes

## Available Scripts
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
