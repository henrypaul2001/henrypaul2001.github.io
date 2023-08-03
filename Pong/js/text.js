class TextObject {
    constructor(pText, pX, pY, pFont, pFillColour, pTextAlign, pName) {
        this.SetX(pX);
        this.SetY(pY);
        this.SetFont(pFont);
        this.SetFillColour(pFillColour);
        this.SetAlign(pTextAlign);
        this.SetText(pText);
        this.mName = pName;
        this.setVisible(true);
    }

    SetX(pX) {
        this.mX = pX;
    }
    GetX() {
        return this.mX;
    }
    SetY(pY) {
        this.mY = pY;
    }
    GetY() {
        return this.mY;
    }
    SetFont(pFont) {
        this.mFont = pFont;
    }
    GetFont() {
        return this.mFont;
    }
    SetFillColour(pFill) {
        this.mFillColour = pFill;
    }
    GetFillColour() {
        return this.mFillColour;
    }
    SetAlign(pAlign) {
        this.mAlign = pAlign;
    }
    GetAlign() {
        return this.mAlign;
    }
    SetText(pText) {
        this.mText = pText;
    }
    GetText() {
        return this.mText;
    }
    getName() {
        return this.mName;
    }
    getVisible() {
        return this.mVisible;
    }
    setVisible(pBool) {
        this.mVisible = pBool;
    }

    draw(pContext) {
        if (this.getVisible() == true)
        {
            pContext.font = this.GetFont();
            pContext.fillStyle = this.GetFillColour();
            pContext.textAlign = this.GetAlign();
            pContext.fillText(this.GetText(), this.GetX(), this.GetY());
        }
    }

    Update() {
        // This is here to not upset the update loop in main.js
    }
}