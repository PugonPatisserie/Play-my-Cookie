
// module aliases
const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Constraint = Matter.Constraint,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

const engine = Engine.create();
const world = engine.world;

const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: '#87CEEB'
    }
});

// ground
const ground = Bodies.rectangle(400, 590, 810, 60, { isStatic: true });

// bird
const bird = Bodies.circle(150, 300, 20, { density: 0.004, restitution: 0.8 });
const slingshotConstraint = Constraint.create({
    pointA: { x: 150, y: 300 },
    bodyB: bird,
    stiffness: 0.05
});

// targets
const boxA = Bodies.rectangle(600, 550, 40, 40);
const boxB = Bodies.rectangle(640, 550, 40, 40);
const boxC = Bodies.rectangle(620, 510, 80, 40);

// add all to world
World.add(world, [ground, bird, boxA, boxB, boxC, slingshotConstraint]);

// mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    }
});
World.add(world, mouseConstraint);

render.mouse = mouse;

// run the engine
Engine.run(engine);
Render.run(render);

// release bird on mouse up
Matter.Events.on(mouseConstraint, 'enddrag', function(event) {
    if (event.body === bird) {
        setTimeout(() => {
            slingshotConstraint.bodyB = null;
        }, 100);
    }
});
