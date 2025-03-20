import NvConstant from "../../Data/Constant/NvConstant";
import T3Gv from "../../Data/T3Gv";
import T3Util from "../../Util/T3Util";
import ObjectUtil from "../Data/ObjectUtil";


class LayerUtil {

  /**
   * Retrieves a list of z-indices from layers that are either active or both visible and active
   * @returns An array of z-indices from qualifying layers
   */
  static ActiveVisibleZList() {
    T3Util.Log('U.LayerUtil ActiveVisibleZList: input');

    const layersManagerBlockId = T3Gv.opt.layersManagerBlockId;
    const layersManager = ObjectUtil.GetObjectPtr(layersManagerBlockId, false);
    const layers = layersManager.layers;
    const numberOfLayers = layersManager.nlayers;
    const activeLayerIndex = layersManager.activelayer;
    let visibleZList = [];

    for (let i = numberOfLayers - 1; i >= 0; i--) {
      const layer = layers[i];
      if (i === activeLayerIndex || (layer.flags & NvConstant.LayerFlags.Visible && layer.flags & NvConstant.LayerFlags.Active)) {
        visibleZList = visibleZList.concat(layer.zList);
      }
    }

    T3Util.Log('U.LayerUtil ActiveVisibleZList: output', visibleZList);
    return visibleZList;
  }

  /**
   * Shows the SVG overlay layer by setting its visibility to true
   */
  static ShowOverlayLayer() {
    T3Util.Log('O.Opt ShowOverlayLayer: input');
    T3Gv.opt.svgOverlayLayer.SetVisible(true);
    T3Util.Log('O.Opt ShowOverlayLayer: output');
  }

  /**
   * Retrieves a list of z-indices from all visible layers, including the active layer
   * @returns An array of z-indices from visible layers
   */
  static VisibleZList() {
    T3Util.Log('O.Opt VisibleZList: input');

    const layersManager = ObjectUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, false);
    const layers = layersManager.layers;
    const numberOfLayers = layersManager.nlayers;
    const activeLayerIndex = layersManager.activelayer;
    let visibleZList = [];

    for (let i = numberOfLayers - 1; i >= 0; i--) {
      const layer = layers[i];
      if (i === activeLayerIndex || (layer.flags & NvConstant.LayerFlags.Visible)) {
        visibleZList = visibleZList.concat(layer.zList);
      }
    }

    T3Util.Log('O.Opt VisibleZList: output', visibleZList);
    return visibleZList;
  }
}

export default LayerUtil
