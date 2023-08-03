class LineSegment extends Shape {
    constructor(pPosition, pEndPoint, pColour, pThickness, pName) {
        super(pPosition, "segLine", pName);
        this.SetColour(pColour);
        this.SetThickness(pThickness);
        this.SetEndPoint(pEndPoint);
        this.setDirection();
        this.setCollided(false);
    }

    SetColour(pColour) {
        this.mColour = pColour;
    }
    GetColour() {
        return this.mColour;
    }
    SetThickness(pThickness) {
        this.mThickness = pThickness;
    }
    GetThickness() {
        return this.mThickness;
    }
    SetEndPoint(pEndPoint) {
        this.mEndPoint = pEndPoint;
    }
    GetEndPoint() {
        return this.mEndPoint;
    }
    setDirection() {
        this.mDirection = this.GetEndPoint().subtract(this.GetPosition()).normalise();
    }
    getDirection() {
        return this.mDirection;
    }
    getCollided() {
        return this.mCollide;
    }
    setCollided(pCollide) {
        this.mCollide = pCollide;
    }

    draw(pContext, pFirstLine, pFill) {
        // If this line is not a part of a polygon that is intended to fill, then it will begin a path
        if (!pFill) {
            pContext.beginPath();
            pContext.moveTo(this.GetPosition().getX(), this.GetPosition().getY());
        }

        // If it is the first line in a polygon (or only line), it will move to start position
        if (pFirstLine == true) {
            pContext.moveTo(this.GetPosition().getX(), this.GetPosition().getY());
        }

        // Create line
        pContext.lineTo(this.GetEndPoint().getX(), this.GetEndPoint().getY());

        // If the line is part of a polygon intended to fill, it will return back to the polygon draw method to begin drawing the next line
        if (pFill == true) {
            return;
        }

        // Draw line on canvas
        pContext.lineWidth = this.GetThickness();
        pContext.strokeStyle = this.GetColour();
        pContext.stroke();
    }

    Collide(pCircle) {
        var normalVector, dotProduct, closestPoint, collisionPoint, collisionCircle;

        // Find the closest point on the line to the circle
        var subtractedPoints = pCircle.GetPosition().subtract(this.GetPosition());
        dotProduct = subtractedPoints.dotProduct(this.getDirection());
        closestPoint = this.GetPosition().add(this.getDirection().multiply(dotProduct));

        // Find the distance between the start of the line and the closest point on the line
        var distanceBetween = closestPoint.distanceBetween(this.GetPosition());
        var lineLength = this.GetPosition().distanceBetween(this.GetEndPoint());

        // If distance is bigger than the line then the circle has either collided with the end point or gone past the end point
        if (distanceBetween > lineLength) {
            // Get distance between circle and end point
            var endPointDistance = pCircle.GetPosition().distanceBetween(this.GetEndPoint());

            // If distance is smaller than the radius of the circle then it has collided
            if (endPointDistance < (pCircle.GetRadius() * pCircle.GetRadius())) {
                collisionPoint = "endPoint";
                // Create a new circle at the end point to handle a collision with the corner of the line
                collisionCircle = new StaticCircle(this.GetEndPoint(), (this.GetThickness() / 2), this.GetColour());
                let { collision, normal } = collisionCircle.Collide(pCircle);
                return { collision: collision, normal: normal};
            }
            else {
                collisionPoint = "after";
                return { collision: false, normal: normalVector};
            }
        }
        // If the dot product is negative, then the circle has either collided with the start point or has gone past the start point
        else if (Math.sign(dotProduct) == -1) {
            // Get distance between circle and start point
            var startPointDistance = pCircle.GetPosition().distanceBetween(this.GetPosition());

            // If the distance is smaller than the radius of the circle then it has collided with the start point
            if (startPointDistance < (pCircle.GetRadius() * pCircle.GetRadius())) {
                collisionPoint = "startPoint";
                // Create a new circle at the start point to handle a collision with the corner of the line
                collisionCircle = new StaticCircle(this.GetPosition(), (this.GetThickness() / 2), this.GetColour());
                let { collision, normal } = collisionCircle.Collide(pCircle);
                return { collision: collision, normal: normal};
            }
            else {
                collisionPoint = "before";
                return { collision: false, normal: normalVector};
            }
        }

        // Check for collision with line
        var distance = pCircle.GetPosition().distanceBetween(closestPoint);
        if (distance < (pCircle.GetRadius() * pCircle.GetRadius())) {
            collisionPoint = "line";
            normalVector = pCircle.GetPosition().subtract(closestPoint).normalise();
            return { collision: true, normal: normalVector};
        }
        else {
            return { collision: false, normal: normalVector};
        }
    }

    UpdateUp() {
        var line, currentPos, endPos;
        var velocity = -this.getVelocity();
        var affectedVel = velocity;
        for(var i = 0; i < this.getNumberOfVertices(); i++) {
            line = this.getVertex(i);
            currentPos = line.GetPosition();
            endPos = line.GetEndPoint();
            line.SetPosition(new Vector(currentPos.getX(), currentPos.getY() + affectedVel));
            line.SetEndPoint(new Vector(endPos.getX(), endPos.getY() + affectedVel));
        }
    }

    UpdateDown() {
        var line, currentPos, endPos;
        var velocity = this.getVelocity();
        var affectedVel = velocity;
        for(var i = 0; i < this.getNumberOfVertices(); i++) {
            line = this.getVertex(i);
            currentPos = line.GetPosition();
            endPos = line.GetEndPoint();
            line.SetPosition(new Vector(currentPos.getX(), currentPos.getY() + affectedVel));
            line.SetEndPoint(new Vector(endPos.getX(), endPos.getY() + affectedVel));
        }
    }
}