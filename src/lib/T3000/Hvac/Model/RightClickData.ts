

class RightClickData {

  public targetId: number;
  public segment: number;
  public hitPoint: { x: number, y: number };
  public locked: boolean;
  public context: number;

  constructor() {
    this.targetId = -1;
    this.segment = -1;
    this.hitPoint = { x: 0, y: 0 };
    this.locked = false;
    this.context = 0;
  }
}

export default RightClickData
