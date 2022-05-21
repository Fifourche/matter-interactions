var sourceLinkRoot = 'https://github.com/liabru/matter-tools/blob/master';

MatterTools.Demo.create({
  fullPage: true,
  preventZoom: true,
  startExample: true,
  appendTo: document.body,

  toolbar: {
    title: 'matter-tools',
    url: 'https://github.com/liabru/matter-tools',
    reset: true,
    source: true,
    inspector: true,
    tools: true,
    fullscreen: true,
    exampleSelect: true
  },

  tools: {
    inspector: true,
    gui: true
  },
  
  examples: [
    {
      name: 'Electrostatic',
      id: 'electrostatic',
      init: Example.electrostatic,
      sourceLink: sourceLinkRoot + '/docs/examples/electrostatic.js'
    },
    {
      name: 'Gravitation',
      id: 'gravitation',
      init: Example.gravitation,
      sourceLink: sourceLinkRoot + '/docs/examples/gravitation.js'
    }
  ]
});