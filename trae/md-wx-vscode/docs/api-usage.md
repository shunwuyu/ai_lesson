# md2wx

Convert Markdown to WeChat compatible HTML, rendered in GitHub flavor

## Features

- Convert Markdown to GitHub flavored HTML
- Code highlighting
- Support LaTeX via KaTeX
- Convert LaTeX SVG to WeChat compatible PNG (copy & paste enabled!)

## Installation

```shell
npm install md2wx

# or
yarn add md2wx
```

## Usage

```js
import md2wx from "md2wx";
```

### `renderHtml`

```js
const text = "## h2";
const highlight = true;
const html = md2wx.renderHtml(text, highlight);
```

### `convertSvgToPng`

```js
await md2wx.convertSvgToPng();
```