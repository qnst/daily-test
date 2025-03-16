
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
    this.flags = NvConstant.LayerFlags.SDLF_Visible;
    this.n = 0;
    this.index = 0;
    this.layertype = NvConstant.LayerTypes.SD_LAYERT_NONE;
    this.zList = [];
  }
}

export default Layer
