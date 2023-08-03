// the window load event handler
function onLoad() {
    var mainCanvas, mainContext, rootNode, scene, playing;
    var lastTime = Date.now();
    visitor = new RenderVisitor();
    // this function will initialise our variables
    function initialiseCanvasContext() {
        // Find the canvas element using its id attribute.
        mainCanvas = document.getElementById('mainCanvas');
        // if it couldn't be found
        if (!mainCanvas) {
            // make a message box pop up with the error.
            alert('Error: cannot find the main canvas element');
            return;
        }
        // Get the 2D canvas context.
        mainContext = mainCanvas.getContext('2d');
        if (!mainContext) {
            alert('Error: failed to get context');
            return;
        }
    }

    function initialiseSceneGraph() {
        // Moves origin point to centre of the canvas
        origin = new Vector((mainCanvas.width * 0.5), (mainCanvas.height * 0.5));
        originMatrix = Matrix.createTranslation(origin);
        rootNode = new TransformNode(originMatrix);

        // Adds the rest of the scene graph to root node
        rootNode.addChild(scene.getSceneGraphRoot());
    }

    // this function will actually draw on the canvas
    function draw() {
        origin = new Vector(0, 0);
        matrix = Matrix.createTranslation(origin);
        mainContext.setTransform(matrix);
        // set the draw fill style colour to grey
        mainContext.fillStyle = "black";

        // fill the canvas with black
        mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

        // choose a line width
        mainContext.lineWidth = 5;

        // set the line join
        mainContext.lineJoin = 'round';

        // Create the scene graph and begin drawing it
        initialiseSceneGraph();
        rootNode.accept(visitor, mainContext);
    }

    function update(deltaTime) {
        deltaTime = deltaTime / 1000;

        // If circle is currently in play then the scene will be updated
        if (playing == true) {
            for (var i = 0; i < updateableObjects.length; i++) {
                updateableObjects[i].Update(deltaTime, collidableObjects, updateableObjects);
            }
        }
        
        // If circle is not currently in play then the countdown will begin
        if (playing == false) {
            playing = startCountdown(countdownObj, circleObj);
        }
    }

    function startCountdown(pCountdownObj, pCircleObj) {
        pCountdownObj.SetText("3");
        pCircleObj.SetPosition(new Vector(0, 0));
        pCircleObj.setVisibility(false);
        pCountdownObj.setVisible(true);

        // Start countdown
        // Calls countdown function every second
        var timer = setInterval(function countdown() {
            if (playing != true) {
                var currentNumber = parseInt(pCountdownObj.GetText());
                if (currentNumber > 0) {
                    pCountdownObj.SetText(String(currentNumber - 1)); 
                }
                else {
                    playing = true;
                    pCountdownObj.setVisible(false);
                    pCircleObj.setVisibility(true);

                    // Create random velocity for circle
                    var random = Scene.getRndInteger(1, 2);
                    var velocityX;
                    if (random == 1) {
                        velocityX = 825;
                    }
                    else if (random == 2)
                    {
                        velocityX = -825;
                    }
                    pCircleObj.SetVelocity(new Vector(velocityX, Scene.getRndInteger(-300, 300)));

                    // Stop loop
                    clearInterval(timer);
                    return playing;
                }
            }
        }, 1000)
    }
    
    function animationLoop() {
        var thisTime = Date.now();
        var deltaTime = thisTime - lastTime;
        executeMoves(controller);
        update(deltaTime);
        draw();
        lastTime = thisTime;
        requestAnimationFrame(animationLoop);
    }

    /* Player Controller */
    const controller = {
        87: {pressed: false, func: movePaddle1Up},
        83: {pressed: false, func: movePaddle1Down},
        38: {pressed: false, func: movePaddle2Up},
        40: {pressed: false, func: movePaddle2Down},
    }

    function movePaddle1Down() {
        controllableObjects[0].UpdateDown();
    }

    function movePaddle1Up() {
        controllableObjects[0].UpdateUp();
    }

    function movePaddle2Down() {
        controllableObjects[1].UpdateDown();
    }

    function movePaddle2Up() {
        controllableObjects[1].UpdateUp();
    }
    
    function executeMoves(controller) {
        Object.keys(controller).forEach(key => {
            controller[key].pressed && controller[key].func()
        })
    }

    // Create scene
    scene = new Scene(new Vector(0, 0), new Vector(1, 1), 0)

    // Take arrays of different object types from scene
    var updateableObjects = scene.getUpdateableObjects();
    var collidableObjects = scene.getCollidableObjects();
    var controllableObjects = scene.getControllableObjects();

    playing = false;
    initialiseCanvasContext();

    // Loop through the updateObjects list to find the countdown text object and the circle object
    for (var i = 0; i < updateableObjects.length; i++) {
        if (updateableObjects[i].getName() == "countdown") {
            var countdownObj = updateableObjects[i];
            break;
        }
    }
    for (var i = 0; i < updateableObjects.length; i++) {
        if (updateableObjects[i].getName() == "circle") {
            var circleObj = updateableObjects[i];
            break;
        }
    }

    // Begin game
    animationLoop();

    // Goal score events
    addEventListener("p1Score", function() {
        playing = false;
    })
    addEventListener("p2Score", function() {
        playing = false;
    })

    // Key input events
    addEventListener("keydown", (e) => {
        if (controller[e.keyCode]) {
            controller[e.keyCode].pressed = true;
        }
    })
    addEventListener("keyup", (e) => {
        if (controller[e.keyCode]) {
            controller[e.keyCode].pressed = false;
        }
    })
    addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
}

window.addEventListener('load', onLoad, false);