var Example = Example || {};

Matter.use('matter-interactions', 'matter-part2body');

Example.electrostatic = function() {
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

    // create poles parts
    var positive_1 = Bodies.rectangle(200, 100, 60, 60, {render: {fillStyle: '#f54242'}}),
        negative_1 = Bodies.rectangle(260, 100, 60, 60, {render: {fillStyle: '#4287f5'}}),
        positive_2 = Bodies.rectangle(400, 100, 60, 60, {render: {fillStyle: '#f54242'}}),
        negative_2 = Bodies.rectangle(460, 100, 60, 60, {render: {fillStyle: '#4287f5'}});

    // create electrostatic interaction
    var Electrostatic = MatterInteractions.Classics.createElectrostatic();
    
    // put parts to interact
    MatterInteractions.Interactions.addBody(Electrostatic, positive_1, {charge: 1});
    MatterInteractions.Interactions.addBody(Electrostatic, negative_1, {charge: -1});

    MatterInteractions.Interactions.addBody(Electrostatic, positive_2, {charge: 1});
    MatterInteractions.Interactions.addBody(Electrostatic, negative_2, {charge: -1});
    
    // create final dipoles
    var dipole_1 = Body.create({parts: [positive_1, negative_1]}),
        dipole_2 = Body.create({parts: [positive_2, negative_2]});


    // add bodies
    Composite.add(world, [
        // rectangles
        dipole_1,
        dipole_2,

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

Example.electrostatic.title = 'Electrostatic';
Example.electrostatic.for = '>=0.14.2';

if (typeof module !== 'undefined') {
    module.exports = Example.electrostatic;
}
