

import $ from 'jquery';
import NvConstant from '../../Data/Constant/NvConstant';
import T3Gv from '../../Data/T3Gv';
import '../../Util/T3Hammer';
import T3Util from "../../Util/T3Util";
import DataUtil from "../Data/DataUtil";
import SvgUtil from "./SvgUtil";

class LayerUtil {

  /**
   * Retrieves a list of z-indices from layers that are either active or both visible and active
   * @returns An array of z-indices from qualifying layers
   */
  static ActiveVisibleZList() {
    T3Util.Log('U.LayerUtil ActiveVisibleZList: input');

    const layersManagerBlockId = T3Gv.opt.layersManagerBlockId;
    const layersManager = DataUtil.GetObjectPtr(layersManagerBlockId, false);
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

    const layersManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, false);
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

  /**
   * Removes an object from all Z-order lists across all layers
   * @param objectId - ID of the object to remove
   */
  static RemoveFromAllZLists(objectId) {
    T3Util.Log("O.Opt RemoveFromAllZLists - Input:", objectId);

    // Get the layers manager with preserved state
    const layersManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, true);
    const numberOfLayers = layersManager.nlayers;

    // Search through all layers for the object
    for (let layerIndex = 0; layerIndex < numberOfLayers; ++layerIndex) {
      const zList = layersManager.layers[layerIndex].zList;
      const indexInList = $.inArray(objectId, zList);

      if (indexInList != -1) {
        // Remove the object from the list when found
        zList.splice(indexInList, 1);
        T3Util.Log("O.Opt RemoveFromAllZLists - Output: Removed object from layer", layerIndex);
        return;
      }
    }

    T3Util.Log("O.Opt RemoveFromAllZLists - Output: Object not found in any layer");
  }

  /**
   * Clears the SVG highlight layer by removing all highlight elements.
   * Logs the input and output with prefix O.Opt.
   */
  static ClearSVGHighlightLayer(): void {
    T3Util.Log("O.Opt ClearSVGHighlightLayer - Input: none");
    if (T3Gv.opt.svgOverlayLayer !== null) {
      T3Gv.opt.svgHighlightLayer.RemoveAll();
      T3Util.Log("O.Opt ClearSVGHighlightLayer - Output: SVG highlight layer cleared");
    } else {
      T3Util.Log("O.Opt ClearSVGHighlightLayer - Output: svgOverlayLayer is null, no action taken");
    }
  }

  /**
   * Clears the SVG overlay layer by removing all overlay elements.
   * Logs the input and output with prefix O.Opt.
   */
  static ClearSVGOverlayLayer(): void {
    T3Util.Log("O.Opt ClearSVGOverlayLayer - Input: none");
    if (T3Gv.opt.svgOverlayLayer !== null) {
      T3Gv.opt.svgOverlayLayer.RemoveAll();
      T3Util.Log("O.Opt ClearSVGOverlayLayer - Output: SVG overlay layer cleared");
    } else {
      T3Util.Log("O.Opt ClearSVGOverlayLayer - Output: svgOverlayLayer is null, no action taken");
    }
  }

  /**
   * Clears the SVG object layer by removing all object elements.
   * Logs the input and output with prefix O.Opt.
   */
  static ClearSVGObjectLayer(): void {
    T3Util.Log("O.Opt ClearSVGObjectLayer - Input: none");
    if (T3Gv.opt.svgObjectLayer !== null) {
      T3Gv.opt.svgObjectLayer.RemoveAll();
      T3Util.Log("O.Opt ClearSVGObjectLayer - Output: SVG object layer cleared");
    } else {
      T3Util.Log("O.Opt ClearSVGObjectLayer - Output: svgObjectLayer is null, no action taken");
    }
  }

  /**
     * Updates layer indices for objects based on the current layers data.
     * @param updateOptions - An object containing updated options, including a TextureList property.
     * @returns void
     */
  static UpdateObjectLayerIndices(updateOptions: { TextureList: any }): void {
    T3Util.Log("O.Opt UpdateObjectLayerIndices - Input:", updateOptions);

    const layersManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, false);
    const layers = layersManager.layers;
    const numLayers = layersManager.nlayers;

    for (let layerIndex = 0; layerIndex < numLayers; layerIndex++) {
      const zList = layers[layerIndex].zList;
      for (let objectIndex = 0, zListLength = zList.length; objectIndex < zListLength; objectIndex++) {
        const currentObject = DataUtil.GetObjectPtr(zList[objectIndex], false);
        if (currentObject) {
          currentObject.Layer = layerIndex;
          currentObject.GetTextures(updateOptions.TextureList);
        }
      }
    }

    T3Util.Log("O.Opt UpdateObjectLayerIndices - Output: Completed");
  }

  /**
     * Inserts objects into a layer immediately after a specified object.
     * @param objectId - The ID of the object after which new objects will be inserted.
     * @param insertList - An array of object IDs to be inserted.
     * @returns void
     */
  static InsertObjectsIntoLayerAt(objectId: number, insertList: number[]): void {
    T3Util.Log("O.Opt InsertObjectsIntoLayerAt - Input:", { objectId, insertList });

    // Find the layer index for the specified object.
    const layerIndex = this.FindLayerForShapeID(objectId);
    if (layerIndex >= 0) {
      // Retrieve the layers and get the current z-order list for the identified layer.
      const layers = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, true).layers;
      let currentZList = layers[layerIndex].zList;

      // Locate the index of the object in the z-order list.
      const objectIndex = currentZList.indexOf(objectId);
      const tail = currentZList.slice(objectIndex + 1);

      // Remove elements after the specified object.
      currentZList.splice(objectIndex + 1, currentZList.length - objectIndex - 1);

      // Insert new objects and append the tail.
      layers[layerIndex].zList = currentZList.concat(insertList, tail);
    }

    T3Util.Log("O.Opt InsertObjectsIntoLayerAt - Output:", { objectId, insertList });
  }

  /**
   * Gets the preserved ZList for the specified layer.
   * @param layerIndex - The index of the layer to get the ZList for.
   * @returns The preserved ZList for the specified layer.
   */
  static ZListPreserveForLayer(layerIndex: number) {
    T3Util.Log("O.Opt ZListPreserveForLayer - Input:", { layerIndex });
    const layersManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, true);
    const result = layersManager.layers[layerIndex].zList;
    T3Util.Log("O.Opt ZListPreserveForLayer - Output:", result);
    return result;
  }

  /**
    * Finds the layer index for a given shape ID.
    * @param shapeId - The ID of the shape.
    * @returns {number} The index of the layer containing the shape, or -1 if not found.
    */
  static FindLayerForShapeID(shapeId: number): number {
    T3Util.Log("O.Opt FindLayerForShapeID - Input:", { shapeId });

    const layerManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, false);
    const layers = layerManager.layers;
    const layerCount = layerManager.nlayers;

    for (let layerIndex = 0; layerIndex < layerCount; layerIndex++) {
      const zList = layers[layerIndex].zList;
      if ($.inArray(shapeId, zList) !== -1) {
        T3Util.Log("O.Opt FindLayerForShapeID - Output:", { result: layerIndex });
        return layerIndex;
      }
    }

    T3Util.Log("O.Opt FindLayerForShapeID - Output:", { result: -1 });
    return -1;
  }

  /**
     * Gets the frontmost and backmost layer details for the selected objects.
     * @returns {Object} An object containing:
     *   - result: boolean indicating if there is a selection,
     *   - frontmostname: the name of the frontmost layer,
     *   - frontmostindex: the index of the frontmost layer,
     *   - backmostname: the name of the backmost layer,
     *   - backmostindex: the index of the backmost layer.
     */
  static GetFrontBackLayersForSelected() {
    T3Util.Log("O.Opt GetFrontBackLayersForSelected - Input:", {});

    const layerManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, false);
    const layers = layerManager.layers;
    const layerCount = layerManager.nlayers;
    let frontmostIndex = -1;
    let backmostIndex = 0;

    const selectedObjects = DataUtil.GetObjectPtr(T3Gv.opt.theSelectedListBlockID, false);
    const selectedCount = selectedObjects.length;

    if (selectedCount === 0) {
      const resultEmpty = {
        result: false,
        frontmostname: layers[0].name,
        frontmostindex: 0,
        backmostname: layers[layerCount - 1].name,
        backmostindex: layerCount
      };
      T3Util.Log("O.Opt GetFrontBackLayersForSelected - Output:", resultEmpty);
      return resultEmpty;
    }

    for (let idx = 0; idx < selectedCount; idx++) {
      const currentLayerIndex = this.FindLayerForShapeID(selectedObjects[idx]);
      if (currentLayerIndex < frontmostIndex || frontmostIndex === -1) {
        frontmostIndex = currentLayerIndex;
      }
      if (currentLayerIndex > backmostIndex) {
        backmostIndex = currentLayerIndex;
      }
    }

    const result = {
      result: true,
      frontmostname: layers[frontmostIndex].name,
      frontmostindex: frontmostIndex,
      backmostname: layers[backmostIndex].name,
      backmostindex: backmostIndex
    };

    T3Util.Log("O.Opt GetFrontBackLayersForSelected - Output:", result);
    return result;
  }

  /**
  * Gets the preserved Z-order list of objects from the front-most layer
  * @returns Array of object IDs in the front-most layer
  */
  static FrontMostLayerZListPreserve() {
    T3Util.Log("O.Opt FrontMostLayerZListPreserve - Input: No parameters");

    const layersManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, true);
    const frontMostLayerZList = layersManager.layers[0].zList;

    T3Util.Log("O.Opt FrontMostLayerZListPreserve - Output: Retrieved front-most layer Z-list with",
      frontMostLayerZList.length, "objects");

    return frontMostLayerZList;
  }

  static HideOverlayLayer() {
    T3Util.Log("O.Opt HideOverlayLayer - Input: No parameters");

    T3Gv.opt.svgOverlayLayer.SetVisible(false);

    T3Util.Log("O.Opt HideOverlayLayer - Output: Overlay layer hidden");
  }

  static IsTopMostVisibleLayer() {
    T3Util.Log('O.Opt isTopMostVisibleLayer - Input');
    const layersManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, false);
    const result = layersManager.activelayer === this.GetTopMostVisibleLayer();
    T3Util.Log('O.Opt isTopMostVisibleLayer - Output:', result);
    return result;
  }

  static GetTopMostVisibleLayer() {
    T3Util.Log('O.Opt getTopMostVisibleLayer - Input');
    const layersManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, false);
    const layers = layersManager.layers;
    const totalLayers = layersManager.nlayers;
    for (let i = 0; i < totalLayers; ++i) {
      if (layers[i].flags & NvConstant.LayerFlags.Visible) {
        T3Util.Log('O.Opt getTopMostVisibleLayer - Output:', i);
        return i;
      }
    }
    T3Util.Log('O.Opt getTopMostVisibleLayer - Output:', -1);
    return -1;
  }

  static ActiveLayerZList() {
    T3Util.Log('O.Opt ActiveLayerZList - Input');

    const layersManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, false);
    const activeLayerZList = layersManager.layers[layersManager.activelayer].zList;

    T3Util.Log('O.Opt ActiveLayerZList - Output:', activeLayerZList);
    return activeLayerZList;
  }

  static ZListPreserve(additionalLayerFlag?) {
    T3Util.Log('O.Opt zListPreserve - Input:', additionalLayerFlag);
    const layersManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, true);
    const layers = layersManager.layers;
    const activeLayerIndex = layersManager.activelayer;
    let currentLayer = layers[activeLayerIndex];
    if ((currentLayer.flags & NvConstant.LayerFlags.NoAdd) || (currentLayer.flags & additionalLayerFlag)) {
      const totalLayers = layers.length;
      for (let index = 0; index < totalLayers; index++) {
        if ((layers[index].flags & NvConstant.LayerFlags.NoAdd) === 0) {
          this.MakeLayerActiveByIndex(index);
          this.DirtyObjectsOnLayer(activeLayerIndex, currentLayer);
          this.DirtyObjectsOnLayer(index, layers[index]);
          SvgUtil.RenderDirtySVGObjects();
          currentLayer = layers[index];
          break;
        }
      }
    }
    T3Util.Log('O.Opt zListPreserve - Output:', currentLayer.zList);
    return currentLayer.zList;
  }

  /**
   * Marks all objects in a specific layer as dirty so they will be re-rendered
   * This function iterates through all objects in the given layer and adds them to the
   * dirty list, which causes them to be redrawn in the next rendering cycle.
   *
   * @param layerIndex - Index of the layer containing objects to mark dirty
   * @param layerData - The layer object containing the z-ordered list of objects
   */
  static DirtyObjectsOnLayer(layerIndex, layerData) {
    const objectList = layerData.zList;
    const objectCount = objectList.length;

    for (let objectIndex = 0; objectIndex < objectCount; ++objectIndex) {
      DataUtil.AddToDirtyList(objectList[objectIndex]);
    }
  }

  /**
   * Marks all objects in visible layers above the active layer as dirty
   * This function iterates through layers with indices lower than the active layer
   * (which appear visually above the active layer) and marks all their objects as dirty
   * so they will be re-rendered. This ensures proper z-ordering of objects when
   * changes are made to the active layer.
   */
  static MarkAllAllVisibleHigherLayerObjectsDirty() {
    let layerIndex, objectIndex;
    const layersManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, false);

    // Iterate from the layer just above the active one (lower index) up to the top-most layer
    for (layerIndex = layersManager.activelayer - 1; layerIndex >= 0; layerIndex--) {
      // Check if this layer is visible
      if (layersManager.layers[layerIndex].flags & NvConstant.LayerFlags.Visible) {
        // Mark all objects in this visible layer as dirty
        for (objectIndex = 0; objectIndex < layersManager.layers[layerIndex].zList.length; objectIndex++) {
          DataUtil.AddToDirtyList(layersManager.layers[layerIndex].zList[objectIndex]);
        }
      }
    }
  }

  /**
   * Retrieves a concatenated list of all objects across all layers in Z-order
   * @returns An array containing all object IDs in Z-order
   */
  static ZList() {
    T3Util.Log("O.Opt ZList - Input: No parameters");

    const layersManager = DataUtil.GetObjectPtr(T3Gv.opt.layersManagerBlockId, false);
    let allObjectIds = [];

    // Iterate through all layers from bottom to top (reverse order)
    for (let layerIndex = layersManager.nlayers - 1; layerIndex >= 0; layerIndex--) {
      // Concatenate the z-list from current layer to our result array
      allObjectIds = allObjectIds.concat(layersManager.layers[layerIndex].zList);
    }

    T3Util.Log("O.Opt ZList - Output: Retrieved", allObjectIds.length, "objects");
    return allObjectIds;
  }

}

export default LayerUtil
