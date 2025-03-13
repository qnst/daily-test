

class BlockHeader {

  public state: number;
  public delta: number;
  public action: number;
  public blocktype: number;
  public blockid: number;
  public index: number;
  public nblocks: number;

  /**
   * Creates a new BlockHeader instance
   * @param state - The state of the block
   * @param delta - The delta value for the block
   * @param blockType - The type of the block
   * @param blockId - The ID of the block
   * @param index - The index of the block
   * @param numberOfBlocks - The total number of blocks
   */
  constructor(
    state: number,
    delta: number,
    blockType: number,
    blockId: number,
    index: number,
    numberOfBlocks: number
  ) {
    this.state = state;
    this.delta = delta;
    this.action = 0;
    this.blocktype = blockType;
    this.blockid = blockId;
    this.index = index;
    this.nblocks = numberOfBlocks;
  }
}

export default BlockHeader
