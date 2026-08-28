import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";

function getDownloadURL() {
  return "https://github.com/panglesd/slipshow/releases/download/v0.12.0/slipshow-linux-x86_64.tar";
}

async function setup() {
  // Get version of tool to be installed
  const version = core.getInput("version");

  // Download the specific version of the tool, e.g. as a tarball
  const pathToTarball = await tc.downloadTool(getDownloadURL());

  // Extract the tarball onto the runner
  const pathToCLI = await tc.extractTar(pathToTarball);

  // Expose the tool by adding it to the PATH
  core.addPath(pathToCLI);
}

setup().catch((error) => core.setFailed(error.message));
