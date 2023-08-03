class GroupNode extends GraphNode {

    constructor() {
        super();
        this.setType("group");
        this.mChildren = [];
    }

    getNumberOfChildren() {
        return this.mChildren.length;
    }

    getChildAt(pIndex) {
        return this.mChildren[pIndex];
    }

    addChild(pParameter) {
        this.mChildren.push(pParameter);
    }
}

