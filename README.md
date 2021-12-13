# Marshall Wace UI Developer technical test

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

---

## Instructions

In the [src/components](./src/components) directory you'll find a set of React components used to define a basic dashboard widget.

Your task is to style the `Widget`, `PositionGrid` and `SearchInput` components to match the design specifications in the [resources/specifications](./resources/specifications) directory. Don't worry about adding any interactive behaviour for now.

The `"Roboto"` font is already loaded in the [index.html](./index.html) template, and the SVG icon for the search input field can be found in the [src/icons](./src/icons) directory.

The `Widget` component width should autosize to fill the width of its container. Its height will vary according to how many rows are currently visible in the grid.

### Additional notes

- You can launch the Vite dev server by running `npm start` within the project directory

- As far as possible, you should be aiming for 'pixel perfect' translation of the designs: font sizes, colours, spacing etc. should all be as described in the design specifications

- Your solution should be written in vanilla CSS (no preprocessors). There should be no need to make any changes to the existing HTML element structure other than adding class names etc.

- The various components already have corresponding `.css` files which are loaded along with the React component source files via `import` statements

- Class names have already been added for the root elements of the existing components; you can add additional class names to nested elements if needed. Feel free to adopt whichever class naming conventions you prefer.

- The `PositionGrid` is implemented as a semantic HTML `<table>` element, however you might find it easier to style by assigning flexbox display modes to the various elements

- You can assume this will run on modern browsers, so don't worry about compatibility hacks or polyfills

- Use of CSS variables is encouraged - these can be defined in [`src/index.css`](./src/index.css)

---

Once you are happy with your solution, run the following command to save your progress:

```
git add .
git commit --allow-empty -m "End of part 1"
```

You are now ready to move onto the TypeScript/TDD/React part of the challenge, run the following command to update this `README.md` with the instructions for the next section:

```
git cherry-pick part2 --strategy-option=theirs
```