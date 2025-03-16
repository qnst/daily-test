
import StateConstant from "../Data/State/StateConstant";

class TextObject {

  public Type: string;
  public runtimeText: string;
  public selrange: { start: number; end: number; line: number; };

  constructor(txtObj: any) {
    txtObj = txtObj || {};
    this.Type = StateConstant.StoredObjectType.TextObject;
    this.runtimeText = txtObj.runtimeText || null;
    this.selrange = txtObj.selrange || { start: 0, end: 0, line: 0 };
  }
}

export default TextObject
