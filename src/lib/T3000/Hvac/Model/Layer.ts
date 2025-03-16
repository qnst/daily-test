
import NvConstant from "../Data/Constant/NvConstant"

class Layer {

  public name: string;
  public flags: number;
  public n: number;
  public index: number;
  public layertype: number;
  public zList: any[];

  constructor() {
    this.name = '';
    this.flags = NvConstant.LayerFlags.Visible;
    this.n = 0;
    this.index = 0;
    this.layertype = NvConstant.LayerTypes.None;
    this.zList = [];
  }
}

export default Layer
