---
id: about
title: About
sidebar_label: About
---

# wisemuffin

I am a data engineering and visualisation nerd.
I love to get people curious about data, ask questions no one has thought to ask, and have the ability to self serve with interactive visualisations.

This website is just a portfolio and playground for for me to develope my skills 🚀.

## Inspiration

- [Visual Vocabulary](https://github.com/ft-interactive/chart-doctor/blob/master/visual-vocabulary/Visual-vocabulary.pdf)

## Visualisation libraries

- Tableau
- Plotly
- Leaflet
- Flourish

## Front end

- [React](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/docs/en)

## Backend

- AWS API Gateway
- AWS Appsync (GraphQL)
- DynamoDB
- Cognito

## Dev tools

- [Good tutorial](https://www.youtube.com/watch?v=Z_Q2xEfipiY)
- [Evaluate Bundle size] webpack-bundle-analyzer - shows size of bundles, review to reduce code size loaded onto client

```javascript
webpack --profile --json > stats.json
npx webpack-bundle-analyzer stats.json
```

- if we just destructure from a module. it will still bring whole module (in prod tree shaking can solve this but not for dev). Most libraries will have all in index.js and then seperate files for each function.
- [Memory issues]
  - node --inspect ./node_modules/.bin/webpack --watch
  - then take a snapshot in chrome dev tools -> memory -> take heap snapshot
  - the choose compaire between snapshots to check for memory leaks

## CI/CD to production

- push to github master branch
- AWS codepipline trigger
- AWS code build
- AWS S3 and CFN deployment

## Infrastructure as Code (IAC)

- Cloud formation template to build CI/CD

## Visualisation Tool Kit (Legacy)

- Tableau
- Plotly
- flourish
- Dash
- Alteryx
- SQL (warehouse and relational db experiance)
- grafana
- matomo

# adding vis

[cloudinary](https://cloudinary.com/console)
