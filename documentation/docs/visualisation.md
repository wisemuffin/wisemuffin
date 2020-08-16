---
id: visualisation
title: Visualisation
sidebar_label: Visualisation
---

Documents what i used to produce each data vis

## Which Data Vis tool should i use

- vega-lite

  - +ve very easy to build interactive and multi views with many features
  - -ve responsiveness

- d3

  - +ve most flexability
  - -ve very slow to build

- other JS libraries
  - +ve fast to build
  - need to fork and build own lib if missing features

## react-vega

### develop in ObserableHQ then export JSON

comment out the .data

```javascript
{
  return JSON.stringify(
    vl
      .markCircle()
      // .data(exo_planets)
      .encode()
      .toJSON()
  );
}
```

then use the VegWrapper. Make sure you add:

```javascript
data={{
    table: exo_planets,
  }}
```

and

```javascript
spec={{
    data: { name: "table" },
    width: "container",
    height: 300,
  }}
```

example

```javascript
<VegaLiteWrapper
  spec={{
    data: { name: "table" },
    width: "container",
    mark: { type: "circle" },
    selection: { sel9: { type: "interval", bind: "scales" } },
    encoding: {
      x: {
        field: "pl_orbper",
        type: "quantitative",
        scale: { type: "log" },
        title: "Orbit Time (days)",
      },
      y: {
        field: "pl_bmassj",
        type: "quantitative",
        title: "Mass (1 = Jupyter)",
      },
    },
    height: 300,
  }}
  data={{
    table: exo_planets,
  }}
  style={{ width: "95%", padding: 0 }}
/>
```

### responsiveness issues

to make this responsive see [issue in react-vega](https://github.com/vega/react-vega/issues/85) or issue in [vega-embed](https://github.com/vega/vega-embed/issues/476)

workaround
