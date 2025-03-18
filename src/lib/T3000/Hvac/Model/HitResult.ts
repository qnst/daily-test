

/**
 * Represents the result of a hit test operation in the HVAC system
 */
class HitResult {
  public objectid: number;
  public hitcode: number;
  public cellid: number;
  public segment: number;
  public pt: { x: number, y: number };

  /**
   * Creates a new hit result instance
   * @param objectId - The ID of the object that was hit
   * @param hitCode - The code indicating how the object was hit
   * @param cellId - The ID of the cell that was hit, if applicable
   */
  constructor(objectId: number, hitCode: number, cellId: number) {
    this.objectid = objectId || 0;
    this.hitcode = hitCode || 0;
    this.cellid = cellId || 0;
    this.segment = -1;
    this.pt = { x: 0, y: 0 };
  }
}

export default HitResult
