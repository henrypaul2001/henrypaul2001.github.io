class Shape {
    constructor(pPosition, pType, pName) {
        this.SetPosition(pPosition);
        this.setType(pType);
        this.setName(pName);
    }

    SetPosition(pPosition) {
        this.mPosition = pPosition;
    }
    GetPosition() {
        return this.mPosition;
    }
    setType(pType) {
        this.mType = pType;
    }
    getType() {
        return this.mType;
    }
    setName(pName) {
        this.mName = pName;
    }
    getName() {
        return this.mName;
    }
}