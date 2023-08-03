class Scene {
    constructor(pPosition, pScale, pRotation) {
        this.setPosition(pPosition);
        this.setRotation(pRotation);
        this.setScale(pScale);
        this.mUpdateableObjects = [];
        this.mCollidableObjects = [];
        this.mControllableObjects = [];
        this.initialiseSceneGraph();
    }

    getPosition() {
        return this.mPosition;
    }
    setPosition(pPosition) {
        this.mPosition = pPosition;
    }
    getRotation() {
        return this.mRotation;
    }
    setRotation(pRotation)
    {
        this.mRotation = pRotation;
    }
    getScale() {
        return this.mScale;
    }
    setScale(pScale) {
        this.mScale = pScale;
    }

    getSceneGraphRoot() {
        return this.mRootNode;
    }

    setSceneGraphRoot(pSceneGraphNode) {
        this.mRootNode = pSceneGraphNode;
    }

    getUpdateableObjects() {
        return this.mUpdateableObjects;
    }

    addToUpdateable(pObject) {
        this.mUpdateableObjects.push(pObject);
    }

    getCollidableObjects() {
        return this.mCollidableObjects;
    }

    addToCollidable(pObject) {
        this.mCollidableObjects.push(pObject);
    }

    getControllableObjects() {
        return this.mControllableObjects;
    }

    addToControllable(pObject) {
        this.mControllableObjects.push(pObject);
    }

    static getRndInteger(pMin, pMax) {
        return Math.floor(Math.random() * (pMax - pMin + 1)) + pMin;
    }

    initialiseSceneGraph() {
        var sceneTranslation = Matrix.createTranslation(this.getPosition());
        var sceneRotation = Matrix.createRotation(this.getRotation());
        var sceneScale = Matrix.createScale(this.getScale());

        var translationNode = new TransformNode(sceneTranslation);
        var rotationNode = new TransformNode(sceneRotation);
        var scaleNode = new TransformNode(sceneScale);
        var p1Group = new GroupNode();
        var p2Group = new GroupNode();

        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(p1Group);
        scaleNode.addChild(p2Group);

        // Text
        var startText = new TextObject("(not so Extreme) Pong", 0, -200, "italic 400 60px Courier New", "white", "center", "title");
        this.addToUpdateable(startText);
        var startTextNode = new GeometryNode(startText);
        scaleNode.addChild(startTextNode);

        var p1Score = new TextObject("0", -525, -300, "50px Courier New", "white", "left", "p1Score");
        this.addToUpdateable(p1Score);
        var leftTextNode = new GeometryNode(p1Score);
        scaleNode.addChild(leftTextNode);

        var p2Score = new TextObject("0", 525, -300, "50px Courier New", "white", "right", "p2Score");
        this.addToUpdateable(p2Score);
        var rightTextNode = new GeometryNode(p2Score);
        scaleNode.addChild(rightTextNode);

        // Countdown text
        var countdownText = new TextObject("3", 0, 0, "bold 75px Courier New", "white", "center", "countdown");
        this.addToUpdateable(countdownText);
        var countdownTextNode = new GeometryNode(countdownText);
        scaleNode.addChild(countdownTextNode);

        // Player 1 paddle
        var vertices = [];
        vertices.push(new LineSegment(new Vector(-525, -125), new Vector(-500, -125), "#FFFFFF", 5, "line1"));
        vertices.push(new LineSegment(new Vector(-500, -125), new Vector(-500, 125), "#FFFFFF", 5, "line2"));
        vertices.push(new LineSegment(new Vector(-500, 125), new Vector(-525, 125), "#FFFFFF", 5, "line3"));
        vertices.push(new LineSegment(new Vector(-500, 125), new Vector(-525, -125), "#FFFFFF", 5, "line4"));
        var p1Rect = new Polygon(vertices, "#FFFFFF", true, 8, "p1Rect");
        this.addToCollidable(p1Rect);
        this.addToControllable(p1Rect);
        var p1Node = new GeometryNode(p1Rect);

        p1Group.addChild(p1Node);

        // Player 2 paddle
        vertices = [];
        vertices.push(new LineSegment(new Vector(525, -125), new Vector(500, -125), "#FFFFFF", 5, "line5"));
        vertices.push(new LineSegment(new Vector(500, -125), new Vector(500, 125), "#FFFFFF", 5, "line6"));
        vertices.push(new LineSegment(new Vector(500, 125), new Vector(525, 125), "#FFFFFF", 5, "line7"));
        vertices.push(new LineSegment(new Vector(500, 125), new Vector(525, -125), "#FFFFFF", 5, "line8"));
        var p2Rect = new Polygon(vertices, "white", true, 8, "p2Rect");
        this.addToCollidable(p2Rect);
        this.addToControllable(p2Rect);
        var p2Node = new GeometryNode(p2Rect);

        p2Group.addChild(p2Node);

        // Circle
        var random = Scene.getRndInteger(1, 2);
        var velocityX;
        if (random == 1) {
            velocityX = 825;
        }
        else if (random == 2)
        {
            velocityX = -825;
        }
        var circle = new PhysicsCircle(new Vector(0, 0), 50, new Vector(velocityX, Scene.getRndInteger(-300, 300)), "white", "circle", false);
        this.addToUpdateable(circle);
        var circleNode = new GeometryNode(circle);
        scaleNode.addChild(circleNode);
        this.addToCollidable(circle);

        // Static circle for bounces
        var circleForUnfairBouncesJustToAnnoyYou = new StaticCircle(new Vector(0, 375), 60, "#FFFFFF");
        this.addToCollidable(circleForUnfairBouncesJustToAnnoyYou);
        var staticCircleNode = new GeometryNode(circleForUnfairBouncesJustToAnnoyYou);
        scaleNode.addChild(staticCircleNode);

        // Test circle 
        //Remove multi line comment to demonstrate moving circle physics (may cause some issues with the game)
        /*
        var testCircle = new PhysicsCircle(new Vector(0, 100), 50, new Vector(500, -100), "white", "testcircle", true);
        this.addToUpdateable(testCircle);
        var testCircleNode = new GeometryNode(testCircle);
        scaleNode.addChild(testCircleNode);
        this.addToCollidable(testCircle);
        */
        

        // Bottom and Top colliding boundaries
        var halfX = 1080 / 2;
        var halfY = 720 / 2;
        var bottom = new LineSegment(new Vector(-1000, -halfY), new Vector(1000, -halfY), "#FFFFFF", 10, "bottom");
        this.addToCollidable(bottom);
        var top = new LineSegment(new Vector(-1000, halfY), new Vector(1000, halfY), "#FFFFFF", 10, "top")
        this.addToCollidable(top);
        var bottomNode = new GeometryNode(bottom);
        var topNode = new GeometryNode(top);
        scaleNode.addChild(topNode);
        scaleNode.addChild(bottomNode);

        // Goals
        var goalLeft = new LineSegment(new Vector(-700, -halfY), new Vector(-700, halfY), "#FFFFFF", 5, "left");
        var goalRight = new LineSegment(new Vector(700, -halfY), new Vector(700, halfY), "#FFFFFF", 5, "right");
        this.addToCollidable(goalLeft);
        this.addToCollidable(goalRight);
        var leftNode = new GeometryNode(goalLeft);
        var rightNode = new GeometryNode(goalRight);
        scaleNode.addChild(leftNode);
        scaleNode.addChild(rightNode);

        this.setSceneGraphRoot(translationNode);
    }
}