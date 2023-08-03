class TransformNode extends GroupNode {
    constructor(pMatrix) {
        super();
        this.setType("transform");
        this.setMatrix(pMatrix);
    }

    getMatrix() {
        return this.mMatrix;
    }

    setMatrix(pMatrix) {
        this.mMatrix = pMatrix;
    }
}