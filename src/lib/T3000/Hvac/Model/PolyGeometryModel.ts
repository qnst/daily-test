

class PolyGeometryModel {

  NoFill: boolean;
  NoLine: boolean;
  Closed: boolean;
  Offset: number;
  NPoints: number;
  MoveTo: any[];
  shapeid: number;

  /**
   * Creates a new PolyGeometryModel instance
   * @param noFill - Whether the polygon should be filled
   * @param noLine - Whether the polygon should have an outline
   * @param closed - Whether the polygon is closed
   * @param offset - Offset value for the polygon
   * @param numPoints - Number of points in the polygon
   */
  constructor(noFill: boolean, noLine: boolean, closed: boolean, offset: number, numPoints: number) {
    this.NoFill = noFill;
    this.NoLine = noLine;
    this.Closed = closed;
    this.Offset = offset;
    this.NPoints = numPoints;
    this.MoveTo = [];
    this.shapeid = 0;
  }
}

export default PolyGeometryModel
