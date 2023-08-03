class GeometryNode extends GraphNode {
    constructor(pPoly) {
        super();
        this.setType("geo");
        this.setPoly(pPoly);
    }

    getPoly() {
        return this.mPoly;
    }

    setPoly(pPoly) {
        this.mPoly = pPoly;
    }

    draw(pContext) {
        this.getPoly().draw(pContext);
    }
}