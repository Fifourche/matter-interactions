

<!-- Start index.js -->

## MatterInteractions

An attractors plugin for matter.js.
See the readme for usage and examples.

## MatterInteractions.Body.init(body)

Initialises the `body` to support interactions.
This is called automatically by the plugin.

### Params:

* **Matter.Body** *body* The body to init.

### Return:

* No return value.

## MatterAttractors.Interactions

Main tool to edit interactions and index them.

### Properties:

* **list** *allInteractions* List of all the created interactions.

## MatterInteractions.Interactions.createInteraction(name, effect, options)

Create an interaction by specifying its name, the effect on the bodies, and optional parameters.

### Params:

* **string** *name* The name of the interaction.
* **function** *effect* The effective interaction : a function taking two bodies as parameters, and possibly options.
* **dictionary** *options* Parameters the interaction would need (example : charge, mass, ...).

### Return:

* **MatterInteractions.Interaction** Created interaction.

## MatterInteractions.Interactions.deleteInteraction(interaction)

Delete the specified interaction.

### Params:

* **MatterInteractions.Interaction** *interaction* The interaction to delete.

### Return:

* No return value.

## MatterInteractions.Interactions.addBody(interaction, body, options)

Subject the body to the specified interaction, and give interaction-related parameters.

### Params:

* **MatterInteractions.Interaction** *interaction* The interaction to subject the body to.
* **Matter.Body** *body* The body to subject to the interaction.
* **dictionary** *options* Optional : interaction-related parameters.

### Return:

* No return value.

## MatterInteractions.Interactions.removeBody(interaction, body)

Free the body from the specified interaction.

### Params:

* **MatterInteractions.Interaction** *interaction* The interaction the body is subjected to.
* **Matter.Body** *body* The body to free from the interaction.

### Return:

* No return value.

## MatterInteractions.Engine.update(engine)

Applies all interactions for all bodies in the `engine`.
This is called automatically by the plugin.

### Params:

* **Matter.Engine** *engine* The engine to update.

### Return:

* No return value.

## MatterInteractions.Classics

Defines some useful common interactions.

## MatterInteractions.createGravitation(strength)

A function to create a gravitational interaction. Uses the bodies masses to compute the gravitational force.
You can specify a gravitational constant by passing the it to the function ; defaults to `1` otherwise. 

### Params:

* **number** *strength* Optional : gravitational constant to use.

### Return:

* **MatterInteractions.Interaction** Interaction object created.

## MatterInteractions.createElectrostatic(strength)

A function to create an electrostatic interaction between charged bodies.
You can specify a prefactor by passing the it to the function ; defaults to `50` otherwise. 

### Params:

* **number** *strength* Optional : constant prefactor to use.

### Return:

* **MatterInteractions.Interaction** Interaction object created.

This plugin adds a new property `body.plugin.interactions` to instances of `Matter.Body`.  
This is an array of callback functions that will be called automatically
for every pair of bodies, on every engine update.

### Properties:

* **Array.\<Function>** *body.plugin.interactions* 

An interaction calculates the force to be applied
to both bodies, using the interaction parameters of attached to each of them.

### Params:

* **Matter.Body** *bodyA* 
* **Matter.Body** *bodyB* 

### Return:

* **Vector** a force vector (optional)

<!-- End index.js -->

