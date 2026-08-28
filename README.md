# Setup Slipshow

Action to install [slipshow](https://github.com/panglesd/slipshow) in your
Github action.

WIP. Do not use yet.

Example of use:
```yaml
name: Release

on: [ "push" ]

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
        run: slipshow compile pres.slp -o pres.html
```

(When a tag is pushed, use the tag instead of `main`)
