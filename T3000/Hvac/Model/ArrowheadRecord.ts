

class ArrowheadRecord {

  public StartArrowID: number;
  public StartArrowDisp: boolean;
  public EndArrowID: number;
  public EndArrowDisp: boolean;
  public ArrowSizeIndex: number;

  constructor() {
    this.StartArrowID = 0;
    this.StartArrowDisp = false;
    this.EndArrowID = 0;
    this.EndArrowDisp = false;
    this.ArrowSizeIndex = 1;
  }

}

export default ArrowheadRecord

//   this.StartArrowID = 0,
//     this.StartArrowDisp = !1,
//     this.EndArrowID = 0,
//     this.EndArrowDisp = !1,
//     this.ArrowSizeIndex = 1
