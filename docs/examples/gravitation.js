var Example = Example || {};

Matter.use('matter-interactions');

Example.gravitation = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Body = Matter.Body,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showVelocity: true,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // remove base gravitation
    world.gravity.scale = 0

    // create circular bodies, with no friction
    var smallest_body = Bodies.circle(200, 300, 20, {render: {sprite: {texture: './examples/assets/death_star.png'}}, friction: 0, frictionAir: 0}),
        biggest_body = Bodies.circle(400, 300, 47, {render: {sprite: {texture: './examples/assets/alderaan.png'}}, friction: 0, frictionAir: 0});

    smallest_body.mass = 0.08;
    biggest_body.mass = 8;

    // create gravitational interaction
    var Gravitation = MatterInteractions.Classics.createGravitation();

    MatterInteractions.Interactions.addBody(Gravitation, smallest_body);
    MatterInteractions.Interactions.addBody(Gravitation, biggest_body);

    // give an initial velocity to the small body
    Body.setVelocity(smallest_body, {x: 0, y: 3});

    // add bodies
    Composite.add(world, [
        // circular bodies
        smallest_body,
        biggest_body,

        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

Example.gravitation.title = 'Gravitation';
Example.gravitation.for = '>=0.14.2';

if (typeof module !== 'undefined') {
    module.exports = Example.gravitation;
}
