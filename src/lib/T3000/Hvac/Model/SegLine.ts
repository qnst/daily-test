

class SegLine {

  public firstdir: number;
  public lastdir: number;
  public curveparam: number;
  public pts: any[];
  public lengths: any[];

  constructor() {
    this.firstdir = 0;
    this.lastdir = 0;
    this.curveparam = 0;
    this.pts = [];
    this.lengths = [];
  }

}

export default SegLine
