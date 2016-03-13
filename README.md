# Jupyter Viewer: A chrome app for interacting with Jupyter notebooks

A simple chrome packaged app for interacting with the Jupyter server. Get rid of the distracting browser user interface to put notebooks front-and-centre.

## What this is not

Unlike other attempts at something similar (including my own) this does not aim to manage the notebook server for you in any way - you still have to start it on the command line or set up a server. The idea is to have a very simple codebase which doesn't have to keep up with the rapid changes in the notebook itself.

Currently only tested on OSX using local notbook server.

## Installation

You can install the development version by downloading the source, unzipping, and loading in Chrome as an unpacked extension [see here](https://developer.chrome.com/extensions/getstarted#unpacked).



## Changelog

- 0.2: First beta, should work for simple use case of accessing a single Jupyter notebook server. Default configuration matches the default settings for the local notebook server.


## Known issues

- The tab-bar implementation is very simple, and will probably break if you try to open too many tabs.


## Contributing

Contributions by pull request are welcome.

## License

LGPL
