class Vector {
    constructor(pX, pY, pZ) {
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ);
    }

    getX() {
        return this.mX;
    }
    setX(pX) {
        this.mX = pX;
    }

    getY() {
        return this.mY;
    }
    setY(pY) {
        this.mY = pY;
    }

    getZ() {
        return this.mZ;
    }
    setZ(pZ) {
        this.mZ = pZ;
    }

    add(pVector) {
        var x, y ,z;

        x = this.getX() + pVector.getX();
        y = this.getY() + pVector.getY();
        z = this.getZ() + pVector.getZ();

        var newVector = new Vector(x, y, z);
        return newVector;
    }

    subtract(pVector) {
        var x, y, z;

        x = this.getX() - pVector.getX();
        y = this.getY() - pVector.getY();
        z = this.getZ() - pVector.getZ();

        var newVector = new Vector(x, y, z);
        return newVector;
    }

    multiply(pNumber) {
        var x, y, z;

        x = this.getX() * pNumber;
        y = this.getY() * pNumber;
        z = this.getZ() * pNumber;

        var newVector = new Vector(x, y, z);
        return newVector;
    }

    divide(pNumber) {
        var x, y, z;

        x = this.getX() / pNumber;
        y = this.getY() / pNumber;
        z = this.getZ() / pNumber;

        var newVector = new Vector(x, y, z);
        return newVector;
    }

    magnitude() {
        var magnitude, x, y;

        x = this.getX();
        y = this.getY();

        magnitude = (x * x) + (y * y);
        magnitude = Math.sqrt(magnitude);

        return magnitude;
    }

    normalise() {
        var magnitude, x, y, z;

        x = this.getX();
        y = this.getY();
        z = this.getZ();

        magnitude = this.magnitude();

        var newVector = new Vector(x / magnitude, y / magnitude, z);
        return newVector;
    }

    limitTo(pNumber) {
        var x, y, z, magnitude;

        x = this.getX();
        y = this.getY();
        z = this.getZ();

        magnitude = this.magnitude();

        if (magnitude > pNumber) {
            var newVector = this.normalise();
            newVector = newVector.multiply(pNumber);
            return newVector;
        }

        return this;
    }

    dotProduct(pVector) {
        var x, y, dotProduct;

        x = this.getX();
        y = this.getY();

        dotProduct = (x * pVector.getX()) + (y * pVector.getY());

        return dotProduct;
    }

    interpolate(pVector, pNumber) {
        var newVector = new Vector(this.getX(), this.getY(), this.getZ());

        newVector = pVector.subtract(this);  
        newVector = newVector.multiply(pNumber);
        newVector = newVector.add(this);
        
        return newVector;
    }

    rotate(pNumber) {
        var x, y;

        x = (Math.sin(-pNumber) * this.getY()) + (Math.cos(pNumber) * this.getX());
        y = (Math.sin(pNumber) * this.getX()) + (Math.cos(pNumber) * this.getY());

        var newVector = new Vector(x, y, this.getZ());
        return newVector;
    }

    angleBetween(pVector) {
        var angle;

        angle = Math.acos(this.dotProduct(pVector) / (this.magnitude() * pVector.magnitude()));

        return angle;
    }

    distanceBetween(pVector) {
        var distance;

        var a = this.getX() - pVector.getX()
        var b = this.getY() - pVector.getY()
        distance = ((a * a) + (b * b));

        return distance;
    }
}