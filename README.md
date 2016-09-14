# THIS PROJECT IS GOING AWAY

Chrome is killing 'native' apps it seems, and this one never worked particularly well ;) Consider this project unmaintined : you might prefer to look at [http://nteract.io/](http://nteract.io/)

# Jupyter Viewer: A chrome app for interacting with Jupyter notebooks

A simple chrome packaged app for interacting with the Jupyter server. Get rid of the distracting browser user interface to put notebooks front-and-centre.

![screenshot](/assets/ScreenShot.png "Screenshot")

## What this is not

Unlike other attempts at something similar (including my own) this does not aim to manage the notebook server for you in any way - you still have to start it on the command line or set up a server. The idea is to have a very simple codebase which doesn't have to keep up with the rapid changes in the notebook itself.

Currently only tested on OSX using local notbook server.

## Installation

A version wil be uploaded to the Chrome Web Store in due course. Install the development version by downloading the source, unzipping, and loading in Chrome as an unpacked extension [see here](https://developer.chrome.com/extensions/getstarted#unpacked).


## Setup

The only configuration needed is the url to your Jupyter server. This defaults to `localhost:8888` which is the default for local server.

## Changelog

- 0.2: First beta, should work for simple use case of accessing a single Jupyter notebook server. Default configuration matches the default settings for the local notebook server.


## Known issues

- This isn't yet uploaded to the Chrome app store.
- The tab-bar implementation is very simple, and will probably break if you try to open too many tabs.


## Contributing

Contributions by pull request are welcome.

## License

LGPL
