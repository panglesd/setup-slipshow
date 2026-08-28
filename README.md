# Setup Slipshow

Action to install [slipshow](https://github.com/panglesd/slipshow) in your
Github action.

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
        uses: actions/checkout@v3
      - name: Install slipshow
        id: setup-slipshow
        uses: panglesd/setup-slipshow@v1
      - name: Compile presentation
        run: |
          slipshow compile pres.slp -o pres.html
```
