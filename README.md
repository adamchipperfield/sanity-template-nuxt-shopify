# sanity-template-nuxt-shopify

⚠️ **This is a work in progress**

_A Sanity x Nuxt.js e-commerce starter based on Shopify_

This is a starter template for a [Sanity.io](https://sanity.io) project for an e-commerce site. The project is in 2 parts: Sanity's Studio + a Nuxt.js app.s

### `sanity`
The Studio is a React.js app which is deployed as a Single Page App (SPA). It allows you to interact with the Content Lake (a pool of your data) in an easy-to-use GUI.

### `app`
The app is a Nuxt.js server-side rendered web application. It connectss to your Shopify store, as well as the schema and data added through the Studio, to present a full e-commerce experience.

## Deploying
In order to use the template you'll need to visit Sanity's one-click project wizard: https://www.sanity.io/create?template=adamchipperfield/sanity-template-nuxt-shopify

## Local development
Once you've set up your project (see above) and cloned your repo (the one Sanity created) locally you can start working with the project.

Run `yarn install`, then `yarn start` to spin up local servers for Nuxt.js and Sanity Studio.

- [Nuxt.js documentation](https://nuxtjs.org)
- [Sanity Studio documentation](https://www.sanity.io/docs/sanity-studio)
