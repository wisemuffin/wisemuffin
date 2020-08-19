---
id: graphql
title: Graphql
sidebar_label: Graphql
---

# apollo codgen (apollo tooling)

when you generate types if the globalTypes.ts has no modules then you get an TS error from tsconfig --isolatedModules= true

react-scripts automatically adds --isolatedModules

to get round this.

```javascript
export default {};
```

[issue](https://github.com/apollographql/apollo-tooling/issues/2030)
