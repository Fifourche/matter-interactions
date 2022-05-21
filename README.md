# matter-interactions

> A plugin to bring two-bodies interactions to [matter.js](https://github.com/liabru/matter-js/).

[![Build Status](https://api.travis-ci.com/Fifourche/matter-interactions.svg?branch=main)](https://api.travis-ci.com/Fifourche/matter-interactions)

## Install

Get the [matter-interactions.js](build/matter-interactions.js) file directly and load it with a ``<script src="...">`` tag.

### Dependencies

- [matter.js](https://github.com/liabru/matter-js/)

## Usage
Simply add this before your code :

```js
Matter.use('matter-interactions');
// or
Matter.use(MatterInteractions);
```

see the [Using Plugins](https://github.com/liabru/matter-js/wiki/Using-plugins) section for more information.

## Documentation

See the [API docs](API.md).

## Examples

Check out the [examples](docs/examples) or try them out first:

- [Gravitation](https://fifourche.github.io/matter-interactions/#gravitation)
- [Electrostatic](https://fifourche.github.io/matter-interactions/#electrostatic)

### Notes

This plugin has been built using the [matter-plugin-boilerplate](https://github.com/liabru/matter-plugin-boilerplate), and comes with the same tools to modify it. You may also visit [Creating plugins](https://github.com/liabru/matter-js/wiki/Creating-plugins) if you wish to learn the basics to release your own version !
