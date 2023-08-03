class Matrix {
    constructor(p00, p01, p02, p10, p11, p12, p20, p21, p22) {
        this.set00(p00);
        this.set01(p01);
        this.set02(p02);

        this.set10(p10);
        this.set11(p11);
        this.set12(p12);

        this.set20(p20);
        this.set21(p21);
        this.set22(p22);
    }

    get00() {
        return this.m00;
    }
    set00(p00) {
        this.m00 = p00;
    }

    get01() {
        return this.m01;
    }
    set01(p01) {
        this.m01 = p01;
    }

    get02() {
        return this.m02;
    }
    set02(p02) {
        this.m02 = p02;
    }

    get10() {
        return this.m10;
    }
    set10(p10) {
        this.m10 = p10;
    }

    get11() {
        return this.m11;
    }
    set11(p11) {
        this.m11 = p11;
    }

    get12() {
        return this.m12;
    }
    set12(p12) {
        this.m12 = p12;
    }

    get20() {
        return this.m20;
    }
    set20(p20) {
        this.m20 = p20;
    }

    get21() {
        return this.m21;
    }
    set21(p21) {
        this.m21 = p21;
    }

    get22() {
        return this.m22;
    }
    set22(p22) {
        this.m22 = p22;
    }

    getElement(row, column) {
        if (row == 0 && column == 0) {
            return this.get00();
        }
        else if(row == 0 && column == 1) {
            return this.get01();
        }
        else if(row == 0 && column == 2) {
            return this.get02();
        }
        else if(row == 1 && column == 0) {
            return this.get10();
        }
        else if(row == 1 && column == 1) {
            return this.get11();
        }
        else if(row == 1 && column == 2) {
            return this.get12();
        }
        else if(row == 2 && column == 0) {
            return this.get20();
        }
        else if(row == 2 && column == 1) {
            return this.get21();
        }
        else if(row == 2 && column == 2) {
            return this.get22();
        }
    }

    static createIdentity() {
        return new Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }

    static createTranslation(pVector) {
        var matrix = Matrix.createIdentity();
        matrix.set02(pVector.getX());
        matrix.set12(pVector.getY());
        return matrix;
    }

    static createScale(pVector) {
        var matrix = Matrix.createIdentity();
        matrix.set00(matrix.get00() * pVector.getX());
        matrix.set11(matrix.get11() * pVector.getY());
        return matrix;
    }

    static createRotation(pNumber) {
        var matrix = Matrix.createIdentity();
        matrix.set00(Math.cos(pNumber));
        matrix.set01(Math.sin(-pNumber));
        matrix.set10(Math.sin(pNumber));
        matrix.set11(Math.cos(pNumber));
        return matrix;
    }

    multiply(pMatrix) {
        var matrix = new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0);
        
        matrix.set00((this.get00() * pMatrix.get00()) + (this.get01() * pMatrix.get10()) + (this.get02() * pMatrix.get20()));
        matrix.set01((this.get00() * pMatrix.get01()) + (this.get01() * pMatrix.get11()) + (this.get02() * pMatrix.get21()));
        matrix.set02((this.get00() * pMatrix.get02()) + (this.get01() * pMatrix.get12()) + (this.get02() * pMatrix.get22()));

        matrix.set10((this.get10() * pMatrix.get00()) + (this.get11() * pMatrix.get10()) + (this.get12() * pMatrix.get20()));
        matrix.set11((this.get10() * pMatrix.get01()) + (this.get11() * pMatrix.get11()) + (this.get12() * pMatrix.get21()));
        matrix.set12((this.get10() * pMatrix.get02()) + (this.get11() * pMatrix.get12()) + (this.get12() * pMatrix.get22()));

        matrix.set20((this.get20() * pMatrix.get00()) + (this.get21() * pMatrix.get10()) + (this.get22() * pMatrix.get20()));
        matrix.set21((this.get20() * pMatrix.get01()) + (this.get21() * pMatrix.get11()) + (this.get22() * pMatrix.get21()));
        matrix.set22((this.get20() * pMatrix.get02()) + (this.get21() * pMatrix.get12()) + (this.get22() * pMatrix.get22()));

        return matrix;
    }

    multiplyVector(pVector) {
        var vector = new Vector(0, 0, 0);
        
        vector.setX((this.get00() * pVector.getX()) + (this.get01() * pVector.getY()) + (this.get02() * pVector.getZ()));
        vector.setY((this.get10() * pVector.getX()) + (this.get11() * pVector.getY()) + (this.get12() * pVector.getZ()));
        vector.setZ((this.get20() * pVector.getX()) + (this.get21() * pVector.getY()) + (this.get22() * pVector.getZ()));

        return vector;
    }

    setTransform(pContext) {
        pContext.setTransform(this.get00(), this.get10(), this.get01(), this.get11(), this.get02(), this.get12());
    }
    
    transform(pContext) {
        pContext.transform(this.get00(), this.get10(), this.get01(), this.get11(), this.get02(), this.get12());
    }
}
