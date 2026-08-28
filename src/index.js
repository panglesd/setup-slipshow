import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import * as os from 'os';
// arch in [x64, arm...] (https://nodejs.org/api/os.html#os_os_arch)
// return value in [x86_64, arm64]
function mapArch (arch) {
  const mappings = {
    arm: 'arm64',
    x64: 'x86_64'
  };
  return mappings[arch] || arch;
}

// os in [darwin, linux, win32...] (https://nodejs.org/api/os.html#os_os_platform)
// return value in [macos, linux, windows]
function mapOS (os) {
  const mappings = {
    win32: 'windows',
      darwin: 'macos'
  };
    return mappings[os] || os;
}

async function setup() {
  // Get version of tool to be installed
  const version = core.getInput("version");

  // Gather OS details
  const osPlatform = mapOS(os.platform());
  const osArch = mapArch(os.arch());

  const downloadURL = `https://github.com/panglesd/slipshow/releases/download/${version}/slipshow-${osPlatform}-${osArch}.tar`;

  core.debug('Debug');
  core.debug(downloadURL);

  // Download the specific version of the tool, e.g. as a tarball
  const pathToTarball = await tc.downloadTool(downloadURL);

  // Extract the tarball onto the runner
  const pathToCLI = await tc.extractTar(pathToTarball, undefined, "x");

  // Expose the tool by adding it to the PATH
  core.addPath(`${pathToCLI}/bin`);
}

setup().catch((error) => core.setFailed(error.message));
