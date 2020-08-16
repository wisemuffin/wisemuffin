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
