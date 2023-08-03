class Polygon extends Shape {
    constructor(pVertices, pFillColour, pFill, pVelocity, pName) {
        super(pVertices[0].GetPosition(), "poly", pName);
        this.setVertices(pVertices);
        this.setFillColour(pFillColour);
        this.setFill(pFill);
        this.setVelocity(pVelocity);
    }
    setVertices(pVertices) {
        this.mVertices = pVertices;
    }
    getVertices() {
        return this.mVertices;
    }
    getFillColour() {
        return this.mFillColour;
    }
    setFillColour(pFillColour) {
        this.mFillColour = pFillColour
    }
    getNumberOfVertices() {
        return this.mVertices.length;
    }
    getVertex(pIndex) {
        return this.mVertices[pIndex];
    }
    setFill(pFill) {
        this.mFill = pFill;
    }
    getFill() {
        return this.mFill;
    }
    setVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }
    getVelocity() {
        return this.mVelocity;
    }
    getCollidingObject() {
        for(var i = 0; i < this.getNumberOfVertices(); i++) {
            if (this.getVertex(i).getCollided() == true) {
                return this.getVertex(i);
            }
        }
        return false;
    }

    draw(pContext) {
        pContext.beginPath();
        var fillColour = this.getFillColour();
        var firstLine = true;
        for(var i = 0; i < this.getNumberOfVertices(); i++) {
            this.getVertex(i).draw(pContext, firstLine, this.getFill());
            firstLine = false;
        }
        pContext.closePath();
        if (this.getFill() == true) {
            pContext.fillStyle = fillColour;
            pContext.fill();
            pContext.stroke();
        }
    }

    Collide(pCircle) {
        var normal;
        for(var i = 0; i < this.getNumberOfVertices(); i++) {
            let { collision, normal } = this.getVertex(i).Collide(pCircle);
            if (collision) {
                this.getVertex(i).setCollided(true);
                return { collision: collision, normal: normal};
            }
            else {
                this.getVertex(i).setCollided(false);
            }
        }
        return { collision: false, normal: normal};
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