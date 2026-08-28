# Setup Slipshow

Installs [slipshow](https://github.com/panglesd/slipshow) in the Github action
environment.

## Prerequisite

Currently only works in MacOS and Linux runners.

## Inputs

The only accepted input is `version`, standing for slipshow's version to
install. Omitted it will default to `latest`.

## Usage

```yaml
      - name: Install slipshow
        uses: panglesd/setup-slipshow@main
        with:
          version: v0.12.0
```

(When a tag is pushed, use the tag instead of `main`)

Below are more complete examples.

### You want to setup `slipshow` on a CI runner to compile a presentation

```yaml
on:
  push:
    branches:
      - main

jobs:
  compile_slipshow:
    name: Compile slipshow presentation
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Install slipshow
        uses: panglesd/setup-slipshow@main
      - name: Compile presentation
        run: slipshow compile src/pres.slp -o compiled/pres.html
```

### You want to publish the compiled presentation on GitHub pages

Use GitHub's [deploy-page](https://github.com/actions/deploy-pages) action. Note
that this requires to set the GitHub Pages source as "GitHub Actions", in
`Settings > Pages`.

Add the following to the example above:

```yaml
      - name: Upload as artifacts  # required for next action to publish
        uses: actions/upload-pages-artifact@v3
        with:
          path: compiled/

  # Deploy what was compiled with actions/deploy-pages
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: compile_slipshow
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5

# See the actions/deploy-pages docs
permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false
```
