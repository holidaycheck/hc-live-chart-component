# ideas
- [ ] syntax highlighting in JS editor
- [ ] make labels ONLY on the side of the axis shorter, but when hovering it should be completely visible
- [ ] verify the data returned by the JS code to fit for rendering, and give hints if it doesn't
- [ ] make chart useable on mobile devices
- [ ] store previous data in localstorage and show them using another dataset, in the same chart, so be able to compare
- [ ] allow an attribute "unit" which may take values like "seconds", "bytes", etc. and each knows how to scale them 
      e.g. "minutes", "hours", "kB" or "MB", etc.
- [ ] use `renderWaterfallChart()` and `renderBarChart()` instead of `return`, so rendering can also 
      happen asynchronously and multiple times (needs to ensure to also disconnect/clean up when "reconnecting" new code!!!!)
      this would also be useful, since Safari does NOT render all bars on first render, so we would need to do some
      "onload" waiting and render then (try repro by chanigng the JS code in safari and the chart updates with new bars)
- [ ] show only the first line of the error message (didn't get a multiline error message to show, maybe this is irrelevant???)
- [ ] handle resize in Chart (`chart.resize()` ftw)
- [ ] rerender only when sourcecode changed (prevent useless re-renders of the chart)
- [ ] make the code useful also when the chart is not shown (the `return` actually looks awkward if no chart is rendered)
- [ ] render the code editor and chart below one another

# version 2
- [ ] make `npm release` and `npm publish` work, publishing to npm
- [x] provide a stacked waterfall chart 

# version 1
- [x] show errors in JS
- [x] make the labels easier to read when they are long - shortened labels to 30chars
- [x] build + deploy via travis
- [x] make index.html useful in Safari
- [x] make it work embedded in HC tech blog
  - [x] show errors in the data format, to not throw errors when trying to draw the chart
  - [x] dont bubble key events from the editor, the techblog uses them to open the menu and other strange stuff
  - [x] don't throw error when label is not a string
  - [x] more colors, when lots of bars are shown
- [x] load the Chart.js from vendor or CDN, depending on on/offline and load it on demand and not in the HTML file
- [x] allow including the <hc-chart> as a block element anywhere
- [x] make releaseable
  - [x] make examples work under `src/examples` without moving them there
  - [x] examples must be made work in dist too
