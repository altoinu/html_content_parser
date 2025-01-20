# html_content_parser

Reads public HTML document and parses contents of the table.

Document specified by URL displays HTML table in following format:

<table>
  <tr>
    <td>x-coordinate</td>
    <td>Character</td>
    <td>y-coordinate</td>
  </tr>
  <tr>
    <td>0</td>
    <td>█</td>
    <td>0</td>
  </tr>
  <tr>
    <td>0</td>
    <td>█</td>
    <td>1</td>
  </tr>
  <tr>
    <td>0</td>
    <td>█</td>
    <td>2</td>
  </tr>
  <tr>
    <td>1</td>
    <td>▀</td>
    <td>1</td>
  </tr>
  <tr>
    <td>1</td>
    <td>▀</td>
    <td>2</td>
  </tr>
  <tr>
    <td>2</td>
    <td>▀</td>
    <td>1</td>
  </tr>
  <tr>
    <td>2</td>
    <td>▀</td>
    <td>2</td>
  </tr>
  <tr>
    <td>3</td>
    <td>▀</td>
    <td>2</td>
  </tr>
</table>

The code will load this HTML, parse through it, then organize them according to x-coodinate and y-coordinate. Then they will be displayed according to their coordinates in order to reveal the bigger image.

## Writing README stuff

[https://help.github.com/en/articles/basic-writing-and-formatting-syntax](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)

## Node stuff

- Node.js (v22.7.0) and npm [https://nodejs.org/](https://nodejs.org/)

## Initial set up

```
npm install
```

## To run

```
node src/index.mjs
```

## Lint

```
npm run lint:fix
```
