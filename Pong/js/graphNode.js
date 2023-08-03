class GraphNode {
    constructor() {
    }
    getType() {
        return this.mType;
    }
    setType(pType) {
        this.mType = pType;
    }

    accept(pVisitor, pContext) {
        pVisitor.visit(this, pContext);
    }
}

