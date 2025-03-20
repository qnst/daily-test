import NvConstant from "../../Data/Constant/NvConstant";
import OptConstant from "../../Data/Constant/OptConstant";
import T3Gv from "../../Data/T3Gv";
import EvtUtil from "../../Event/EvtUtil";
import T3Util from "../../Util/T3Util";
import ObjectUtil from "../Data/ObjectUtil";
import LayerUtil from "./LayerUtil";
import SelectUtil from "./SelectUtil";
import '../../Util/T3Hammer'
import ActionUtil from "./ActionUtil";

class SvgUtil {

  /**
   * Renders selection states for all visible SVG elements in the document
   * Shows dimension lines and handles for selected objects and sets up action triggers
   *
   * @returns {void}
   */
  static RenderAllSVGSelectionStates() {
    T3Util.Log('O.Opt RenderAllSVGSelectionStates - Input: No parameters');

    // Get the visible objects list and the currently selected objects
    const visibleObjectIds = LayerUtil.ActiveVisibleZList();
    const visibleObjectCount = visibleObjectIds.length;
    const selectedObjectsList = T3Gv.stdObj.GetObject(T3Gv.opt.theSelectedListBlockID).Data;
    const targetSelectedId = SelectUtil.GetTargetSelect();

    // List of dimension element types to check for visibility
    const dimensionElementTypes = [
      OptConstant.SVGElementClass.DimLine,
      OptConstant.SVGElementClass.DimText,
      OptConstant.SVGElementClass.AreaDimLine,
      OptConstant.SVGElementClass.DimTextNoEdit
    ];

    /**
     * Creates an event handler for action clicks on drawing objects
     *
     * @param {Object} drawingObject - The object receiving the action
     * @returns {Function} Event handler function
     */
    const createActionClickHandler = function (drawingObject) {
      return function (event) {
        drawingObject.LMActionClick(event);
        return false;
      };
    };

    // Process each visible object
    for (let objectIndex = 0; objectIndex < visibleObjectCount; ++objectIndex) {
      const objectId = visibleObjectIds[objectIndex];
      const indexInSelectedList = selectedObjectsList.indexOf(objectId);

      // Skip if object is not in selection list or has issues
      if (indexInSelectedList < 0) {
        continue;
      }

      const drawingObject = ObjectUtil.GetObjectPtr(objectId, false);
      if (drawingObject === null || (drawingObject.flags & NvConstant.ObjFlags.NotVisible)) {
        continue;
      }

      const svgElement = T3Gv.opt.svgObjectLayer.GetElementById(objectId);
      if (svgElement === null || svgElement.GetElementById(OptConstant.SVGElementClass.Shape) === null) {
        continue;
      }

      // Handle action triggers
      const actionTriggerId = OptConstant.Common.Action + objectId;
      let actionTriggerElement = T3Gv.opt.svgOverlayLayer.GetElementById(actionTriggerId);

      if (actionTriggerElement === null &&
        (actionTriggerElement = drawingObject.CreateActionTriggers(
          T3Gv.opt.svgDoc,
          objectId,
          svgElement,
          targetSelectedId
        )) !== null) {

        T3Gv.opt.svgOverlayLayer.AddElement(actionTriggerElement);

        try {
          actionTriggerElement.SetRotation(drawingObject.RotationAngle);
        } catch (error) {
          throw error;
        }

        // Add interaction events if object is not locked
        const isObjectUnlocked = (drawingObject.flags & NvConstant.ObjFlags.Lock) === 0;
        const isDocumentEditable = !T3Gv.docUtil.IsReadOnly();
        const canGrow = !drawingObject.NoGrow();

        if (isObjectUnlocked && isDocumentEditable && canGrow) {
          const domElement = actionTriggerElement.DOMElement();
          const hammerInstance = new Hammer(domElement);

          hammerInstance.on('tap', EvtUtil.Evt_ActionTriggerTap);
          hammerInstance.on('dragstart', createActionClickHandler(drawingObject));

          if (T3Gv.opt.isGestureCapable) {
            hammerInstance.on('pinchin', EvtUtil.Evt_WorkAreaHammerPinchIn);
            hammerInstance.on('pinchout', EvtUtil.Evt_WorkAreaHammerPinchOut);
            hammerInstance.on('transformend', EvtUtil.Evt_WorkAreaHammerPinchEnd);
          }

          actionTriggerElement.SetEventProxy(hammerInstance);
        }
      }

      // Handle dimension visibility
      if (drawingObject.Dimensions & NvConstant.DimensionFlags.Select) {
        // Set opacity for dimension elements based on selection state
        for (let elementIndex = svgElement.ElementCount() - 1; elementIndex >= 1; elementIndex--) {
          const currentElement = svgElement.GetElementByIndex(elementIndex);
          const elementId = currentElement.GetID();

          if (dimensionElementTypes.indexOf(elementId) >= 0) {
            currentElement.SetOpacity(indexInSelectedList >= 0 ? 1 : 0);
          }
        }
      }
    }

    T3Util.Log('O.Opt RenderAllSVGSelectionStates - Output: Selection states rendered');
  }

  /**
   * Hides all SVG selection states by clearing the overlay layer
   * Disables dimension visibility for selected objects and clears action arrow timers
   *
   * @returns {void}
   */
  static HideAllSVGSelectionStates() {
    T3Util.Log('O.Opt HideAllSVGSelectionStates: input');

    const selectedList = ObjectUtil.GetObjectPtr(T3Gv.opt.theSelectedListBlockID, false);
    T3Gv.opt.SetDimensionVisibility(selectedList, false);

    if (!T3Gv.opt.fromOverlayLayer) {
      T3Gv.opt.svgOverlayLayer.RemoveAll();
    }

    ActionUtil.ClearAllActionArrowTimers();
    LayerUtil.ShowOverlayLayer();

    T3Util.Log('O.Opt HideAllSVGSelectionStates: output');
  }
}

export default SvgUtil
