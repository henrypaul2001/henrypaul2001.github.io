class RenderVisitor {
    constructor() {
        this.mStack = [];
    }

    popTransform() {
        this.mStack.pop();
    }

    peekTransform() {
        return this.mStack[this.mStack.length - 1];
    }

    pushTransform(pTransform) {
        if (this.mStack.length < 1) {
            this.mStack[0] = pTransform.getMatrix();
        }
        else {
            var topMatrix = this.peekTransform();
            var multipliedMatrix = topMatrix.multiply(pTransform.getMatrix());
            this.mStack.push(multipliedMatrix);
        }
    }

    visit(pNode, pContext) {
        if (pNode.getType() == "geo") {
            this.visitGeo(pNode, pContext);
        }
        else if (pNode.getType() == "transform") {
            this.visitTransform(pNode, pContext);
        }
        else if (pNode.getType() == "group") {
            this.visitGroup(pNode, pContext);
        }
        else {
            console.log("No type found for node");
        }
    }

    visitGroup(pNode, pContext) {
        var index, child;

        for (index = 0; index < pNode.getNumberOfChildren(); index++) {
            child = pNode.getChildAt(index);
            child.accept(this, pContext);
        }
    }

    visitTransform(pNode, pContext) {
        this.pushTransform(pNode);
        this.visitGroup(pNode, pContext);
        this.popTransform();
    }

    visitGeo(pNode, pContext) {
        var matrix = this.peekTransform();
        matrix.setTransform(pContext);
        pNode.draw(pContext);
    }
}