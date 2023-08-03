class StaticCircle extends Shape {
    constructor(pPosition, pRadius, pColour) {
        super(pPosition, "statCircle");
        this.SetRadius(pRadius);
        this.SetColour(pColour);
    }

    SetRadius(pRadius) {
        this.mRadius = pRadius;
    }
    GetRadius() {
        return this.mRadius;
    }
    SetColour(pColour) {
        this.mColour = pColour;
    }
    GetColour() {
        return this.mColour;
    }

    Collide(pOtherCircle) {
        // Collision detection between static circle and physics circle
        var centre = this.GetPosition();
        var otherCentre = pOtherCircle.GetPosition();
        var distance = centre.distanceBetween(otherCentre);
        var radii = (this.GetRadius() + pOtherCircle.GetRadius());
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

    draw(pContext) {
        pContext.beginPath();
        pContext.arc(this.GetPosition().getX(), this.GetPosition().getY(), this.GetRadius(), 0, Math.PI * 2, false);
        pContext.fillStyle = this.GetColour();
        pContext.fill();
        pContext.strokeStyle = "#000000";
        pContext.lineWidth = 5;
        pContext.stroke();
    }
}