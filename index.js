"use strict";

const Matter = require('matter-js');

/**
 * An attractors plugin for matter.js.
 * See the readme for usage and examples.
 * @module MatterInteractions
 */
 
const MatterInteractions = {
  // plugin meta
  name: 'matter-interactions', // PLUGIN_NAME
  version: '0.0.1', // PLUGIN_VERSION
  for: 'matter-js@^0.16.1',

  // installs the plugin where `base` is `Matter`
  // you should not need to call this directly.
  install: function install(base) {
    base.after('Body.create', function () {
      MatterInteractions.Body.init(this);
    });

    base.before('Engine.update', function (engine) {
      MatterInteractions.Engine.update(engine);
    });
  },

  Body: {
    /**
     * Initialises the `body` to support interactions.
     * This is called automatically by the plugin.
     * @function MatterInteractions.Body.init
     * @param {Matter.Body} body The body to init.
     * @returns {void} No return value.
     */
    init: function init(body) {
      body.plugin.interactions = body.plugin.interactions || [];
    }
  },

  /**
   * Main tool to edit interactions and index them.
   * @namespace MatterAttractors.Interactions
   * @property {list} allInteractions List of all the created interactions.
   */
  Interactions: {

    allInteractions: [],

    /**
     * Create an interaction by specifying its name, the effect on the bodies, and optional parameters.
     * @function MatterInteractions.Interactions.createInteraction
     * @param {string} name The name of the interaction.
     * @param {function} effect The effective interaction : a function taking two bodies as parameters, and possibly options.
     * @param {dictionary} options Parameters the interaction would need (example : charge, mass, ...).
     * @returns {MatterInteractions.Interaction} Created interaction.
     */
    createInteraction: function createInteraction(name, effect, options) {

      var interaction = {name: name,
        effect: effect,
        options: options || undefined, 
        allBodies: []
      };
      MatterInteractions.Interactions.allInteractions.push(interaction);
      return interaction;
    },


    /**
     * Delete the specified interaction.
     * @function MatterInteractions.Interactions.deleteInteraction
     * @param {MatterInteractions.Interaction} interaction The interaction to delete.
     * @returns {void} No return value.
     */
    deleteInteraction: function deleteInteraction(interaction) {

      let interactions_list = MatterInteractions.Interactions.allInteractions,
        interaction_index = interactions_list.findIndex(element => (element == interaction));
        
      interactions_list.splice(interaction_index, 1);
        
    },


    /**
     * Subject the body to the specified interaction, and give interaction-related parameters.
     * @function MatterInteractions.Interactions.addBody
     * @param {MatterInteractions.Interaction} interaction The interaction to subject the body to.
     * @param {Matter.Body} body The body to subject to the interaction.
     * @param {dictionary} options Optional : interaction-related parameters.
     * @returns {void} No return value.
     */
    addBody: function addBody(interaction, body, options) {
      body.plugin.interactions = {};
      body.plugin.interactions[interaction.name] = {options: options};
      interaction.allBodies.push(body);
    },

    /**
     * Free the body from the specified interaction.
     * @function MatterInteractions.Interactions.removeBody
     * @param {MatterInteractions.Interaction} interaction The interaction the body is subjected to.
     * @param {Matter.Body} body The body to free from the interaction.
     * @returns {void} No return value.
     */
    removeBody: function removeBody(interaction, body) {
      delete body.plugin.interactions[interaction.name];
      let bodies = interaction.allBodies,
        index = bodies.findIndex(element => (element === body));
      bodies.splice(index, 1);
    }
  },

  Engine: {
    /**
     * Applies all interactions for all bodies in the `engine`.
     * This is called automatically by the plugin.
     * @function MatterInteractions.Engine.update
     * @param {Matter.Engine} engine The engine to update.
     * @returns {void} No return value.
     */
    update: function update(engine) {
      
      var world = engine.world,
        interactions = MatterInteractions.Interactions.allInteractions;
      
      var n_interactions = interactions.length;   

      // We go through one interaction at a time :
      for (let k = 0; k < n_interactions; k += 1) {
        let interaction = interactions[k],
          interaction_name = interaction.name,
          effect = interaction.effect,
          bodies = interaction.allBodies,
          n_bodies = bodies.length;

        // We consider each pair of bodies subjected to the interaction :
        for (let i = 0; i < n_bodies; i += 1) {
          let bodyA = bodies[i],
            optionsA = bodyA.plugin.interactions[interaction_name].options;

          for (let j = i + 1; j < n_bodies; j += 1) {
            let bodyB = bodies[j],
              optionsB = bodyB.plugin.interactions[interaction_name].options;

            // Check if there are interaction parameters defined for each body, then apply the interaction effect :
            if (interaction.options != undefined) {
              effect(bodyA, bodyB, optionsA, optionsB);
            } 
            else {
              effect(bodyA, bodyB);
            }
          }
        }
      }
    }
  },

  /**
   * Defines some useful common interactions.
   * 
   * @namespace MatterInteractions.Classics
   */

  Classics : {

    /**
     * A function to create a gravitational interaction. Uses the bodies masses to compute the gravitational force.
     * You can specify a gravitational constant by passing the it to the function ; defaults to `1` otherwise. 
     * @function MatterInteractions.createGravitation
     * @param {number} strength Optional : gravitational constant to use.
     * @returns {MatterInteractions.Interaction} Interaction object created.
     */

    createGravitation: function createGravitation(strength) {
      return MatterInteractions.Interactions.createInteraction('gravitation', function gravitation_effect(bodyA, bodyB) {
        
        // check if the user provided a strength prefactor :
        var strength_eff = (strength != undefined) ? strength : 1;

        // define the useful distances :
        var dx = bodyA.position.x - bodyB.position.x,
          dy = bodyA.position.y - bodyB.position.y,
          d_cubed = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 3/2);

        // gravitational factor for the bodies :
        var factor = - strength_eff * bodyA.mass * bodyB.mass;

        var force = {
          x: (dx / d_cubed) * factor,
          y: (dy / d_cubed) * factor
        };

          // apply force to both bodies :
        Matter.Body.applyForce(bodyA, bodyA.position, force);
        Matter.Body.applyForce(bodyB, bodyB.position, Matter.Vector.neg(force));
      }
      );
    },

    /**
     * A function to create an electrostatic interaction between charged bodies.
     * You can specify a prefactor by passing the it to the function ; defaults to `50` otherwise. 
     * @function MatterInteractions.createElectrostatic
     * @param {number} strength Optional : constant prefactor to use.
     * @returns {MatterInteractions.Interaction} Interaction object created.
     */

    createElectrostatic: function createElectrostatic(strength) {
      return MatterInteractions.Interactions.createInteraction('electrostatic', function electrostatic_effect(bodyA, bodyB, optionsA, optionsB) {
        
        // check if the user provided a strength prefactor :
        var strength_eff = (strength != undefined) ? strength : 50;

        // get the charge of each body
        let chargeA = optionsA.charge,
          chargeB = optionsB.charge;

        // define the useful distances :
        var dx = bodyA.position.x - bodyB.position.x,
          dy = bodyA.position.y - bodyB.position.y,
          d_cubed = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 3/2);

        // electrostatic factor for the bodies :
        var factor = strength_eff * chargeA * chargeB;

        var force = {
          x: (dx / d_cubed) * factor,
          y: (dy / d_cubed) * factor
        };

        // apply force to both bodies
        Matter.Body.applyForce(bodyA, bodyA.position, force);
        Matter.Body.applyForce(bodyB, bodyB.position, Matter.Vector.neg(force));
      },
      ['charge']);
    }
  }
};

Matter.Plugin.register(MatterInteractions);

module.exports = MatterInteractions;

/**
 * This plugin adds a new property `body.plugin.interactions` to instances of `Matter.Body`.  
 * This is an array of callback functions that will be called automatically
 * for every pair of bodies, on every engine update.
 * @property {Function[]} body.plugin.interactions
 * @memberof Matter.Body
 */

/**
 * An interaction calculates the force to be applied
 * to both bodies, using the interaction parameters of attached to each of them.
 * @callback AttractorFunction
 * @param {Matter.Body} bodyA
 * @param {Matter.Body} bodyB
 * @returns {Vector|undefined} a force vector (optional)
 */