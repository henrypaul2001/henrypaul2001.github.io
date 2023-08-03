class PhysicsCircle {
    constructor(pPosition, pRadius, pVelocity, pColour, pName, pVisible) {
        this.SetPosition(pPosition);
        this.SetRadius(pRadius);
        this.SetVelocity(pVelocity);
        this.SetOldPos(pPosition);
        this.SetColour(pColour);
        this.mType = "physCircle";
        this.mName = pName;
        this.SetMass(50);
        this.mVisible = pVisible;
    }

    SetPosition(pPosition) {
        this.mPosition = pPosition;
    }
    GetPosition() {
        return this.mPosition;
    }
    SetOldPos(pPosition) {
        this.mOldPosition = pPosition;
    }
    GetOldPos() {
        return this.mOldPosition;
    }
    SetRadius(pRadius) {
        this.mRadius = pRadius;
    }
    GetRadius() {
        return this.mRadius;
    }
    SetVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }
    GetVelocity() {
        return this.mVelocity;
    }
    SetColour(pColour) {
        this.mColour = pColour;
    }
    GetColour() {
        return this.mColour;
    }
    setName(pName) {
        this.mName = pName;
    }
    getName() {
        return this.mName;
    }
    getType() {
        return this.mType;
    }
    SetMass(pMass) {
        this.mMass = pMass;
    }
    GetMass() {
        return this.mMass;
    }
    setVisibility(pBool) {
        this.mVisible = pBool;
    }
    getVisibility() {
        return this.mVisible;
    }

    draw(pContext) {
        if (this.getVisibility() == true) {
            pContext.beginPath();
            pContext.arc(this.GetPosition().getX(), this.GetPosition().getY(), this.GetRadius(), 0, Math.PI * 2, false);
            pContext.fillStyle = this.GetColour();
            pContext.fill();
            pContext.strokeStyle = "#000000";
            pContext.lineWidth = 5;
            pContext.stroke();
        }
    }

    CollisionResponse(pNormal, pCollidableObjects, pIndex, pUpdateableObjects) {
        // Finds the object it is colliding with (if it is a polygon, it will find which specific line segment it
        // has collided with)
        var collidingObject;
        if (pCollidableObjects[pIndex].getType() == "poly") {
            collidingObject = pCollidableObjects[pIndex].getCollidingObject();
        }
        else {
            collidingObject = pCollidableObjects[pIndex];
        }
        
        // Check what type of object it is colliding with
        if (collidingObject.getType() == "physCircle") {
            // Moving circle collision
            var hypotenuse = this.GetVelocity();
            var dotProduct = hypotenuse.dotProduct(pNormal);
            var parVelocity = pNormal.multiply(dotProduct);
            var perpVelocity = this.GetVelocity().subtract(parVelocity);

            this.SetVelocity(perpVelocity);
            collidingObject.SetVelocity(parVelocity);
        }
        else if (collidingObject.getName() == "right") {
            // Player 1 scores
            // Find player 1 score text object
            for (var i = 0; i < pUpdateableObjects.length; i++) {
                if (pUpdateableObjects[i].getName() == "p1Score") {
                    var scoreObj = pUpdateableObjects[i];
                    break;
                }
            }

            var currentNumber = parseInt(scoreObj.GetText());
            scoreObj.SetText(String(currentNumber + 1));

            // Event listener in main.js updates the playing variable
            window.dispatchEvent(new CustomEvent("p1Score"));
        }
        else if (collidingObject.getName() == "left") {
            // Player 2 scores
            // Find player 2 score text object
            for (var i = 0; i < pUpdateableObjects.length; i++) {
                if (pUpdateableObjects[i].getName() == "p2Score") {
                    var scoreObj = pUpdateableObjects[i];
                    break;
                }
            }

            var currentNumber = parseInt(scoreObj.GetText());
            scoreObj.SetText(String(currentNumber + 1));

            // Event listener in main.js updates the playing variable
            window.dispatchEvent(new CustomEvent("p2Score"));
        }
        else {
            // Collision response for any other object
            var currentVelocity = this.GetVelocity();
            var negativeNormal = new Vector(-pNormal.getX(), -pNormal.getY());
            var adjacent = negativeNormal.dotProduct(currentVelocity);
            var newVelocity = pNormal.multiply(adjacent).multiply(2).add(currentVelocity);

            // Collision response
            this.SetVelocity(newVelocity);
        }
        
        // Sets the circle colour to the colour of the object it collided with
        this.SetColour(collidingObject.GetColour());
    }

    Update(pDeltaTime, pCollidableObjects, pUpdateableObjects) {
        var currentPos = this.GetPosition();
        this.SetOldPos(currentPos);

        var affectedVel = this.GetVelocity().multiply(pDeltaTime);
        var newPos = currentPos.add(affectedVel);
        this.SetPosition(newPos);

        // Collision detection
        for (var i = 0; i < pCollidableObjects.length; i++) {
            // If index is itself
            if (this.getName() == pCollidableObjects[i].getName()) {
                //skip
            }
            else {
                let { collision, normal } = pCollidableObjects[i].Collide(this);
                if (collision) {
                    this.SetPosition(this.GetOldPos());
                    this.CollisionResponse(normal, pCollidableObjects, i, pUpdateableObjects);
                }
            }

        }
    }

    Collide(pOtherCircle) {
        // Collision between two physics circles
        var centre = this.GetPosition();
        var otherCentre = pOtherCircle.GetPosition();
        var distance = centre.distanceBetween(otherCentre);
        var radii = (this.GetRadius() + pOtherCircle.GetRadius())
        var normalVector, subtractedCentres;
        if (distance < (radii * radii)) {
            subtractedCentres = otherCentre.subtract(centre);
            normalVector = subtractedCentres.normalise();
            return { collision: true, normal: normalVector};
        }
        else {
            return { collision: false, normal: normalVector};
        }
    }
}