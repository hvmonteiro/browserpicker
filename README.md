# About
BrowserPicker is a small application that allows you to choose which internet browser you prefer to use for opening your URLs on Windows operating system.

# The Problem
I use multiple desktop browsers daily to separate my interests and avoid mixing subjects. I might use *Edge* for work related stuff, *Chrome* for personal stuff and *Firefox* for development projects. 
However, a recurring issue arises when clicking on URLs, as they automatically launch the Windows default browser, disrupting my carefully curated browsing setup. 
To avoid this, I usually need to remember to manually copy the URL, select the appropriate browser, open a new tab or window, and then paste the link.

# The Solution
To avoid this inconvenience, I come up with this little desktop tool that lets you choose which browser you want to use to open URLs.

# How it works
To use it, you first need to configure it as the Windows default browser.
After completing this setup, whenever a URL is clicked or opened by default, BrowserPicker will retrieve all registered Windows browsers from the registry, it then presents a list allowing you to choose the browser you wish to use for opening the link. 


# Development environment setup
Since this is a Windows desktop tool, you can only setup the development build environment on Windows.
You need to follow the instructions below to setup the development environment.

For **troubleshooting** check the `...\assets\images\` directory for screenshots.

## Install development dependencies

### Install Git for Windows
- Install any *Git* Windows client from [here](https://git-scm.com/downloads/guis).

### Install NodeJS
- install *NodeJS* (x64) for Windows from [here](https://nodejs.org/en/download)
- setup Windows environment following [Microsoft's Node.js Guidelines for Windows](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules)

### Install Python
- install the current version of [Python](https://devguide.python.org/versions/) from the [Microsoft Store](https://apps.microsoft.com/store/search?publisher=Python+Software+Foundation) (also check the next step below)

### Install Windows Build Tools
- install the latest [Visual Studio Community 2022](https://visualstudio.microsoft.com/downloads/), modify your installation (check `...\assets\images\` directory for screenshots):
  1. in `Individual Components` type `C++` in the search input
    - select `Desktop development with C++`
  2. in `Individual Components` type `c++ core features` in the search input
    - select `C++ core features` (Latest) 
  3. in `Individual Components` type `sdk` in the search input
    - select `MSVC v143 - VS 2022 C++ x64/x86 build tools` (Latest) 

### Install node-gyp
- Install `node-gyp` from here (https://www.npmjs.com/package/node-gyp), follow install and setup instructions in *On Windows* section


## Setup the environment by executing the following commands:
```bash
git clone https://github.com/hvmonteiro/browserpicker.git
cd browserpicker

# check if you are running the x64 version of node
node -p "process.arch"

# configure NPM msvs_version to have the value of 2022
npm config set msvs_version=2022
# -or- add `msvs_version=2022` manually using
npm config edit

# install node-gyp globally
npm install -g node-gyp

# configure node-gyp msvs_version to have the value of 2022
node-gyp configure --msvs_version=2022

# install dependencies
npm install

# start the application in DEV mode
npm test

# or start the application in PROD mode
npm start
```
