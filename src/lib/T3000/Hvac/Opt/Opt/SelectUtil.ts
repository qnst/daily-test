import NvConstant from "../../Data/Constant/NvConstant";
import OptConstant from "../../Data/Constant/OptConstant";
import T3Constant from "../../Data/Constant/T3Constant";
import TextConstant from "../../Data/Constant/TextConstant";
import Instance from "../../Data/Instance/Instance";
import T3Gv from "../../Data/T3Gv";
import EvtUtil from "../../Event/EvtUtil";
import SelectionAttr from "../../Model/SelectionAttr";
import T3Util from "../../Util/T3Util";
import ObjectUtil from "../Data/ObjectUtil";
import UIUtil from "../UI/UIUtil";
import ActionUtil from "./ActionUtil";
import LayerUtil from "./LayerUtil";
import OptCMUtil from "./OptCMUtil";
import SvgUtil from "./SvgUtil";
import $ from 'jquery';

class SelectUtil {

  /**
   * Handles selection of an object when clicked
   * @param event - The click event
   * @param svgElement - The SVG element that was clicked
   * @param preserveSelection - Whether to preserve existing selection state
   * @returns Boolean indicating whether object was selected successfully
   */
  static SelectObjectFromClick(event, svgElement, preserveSelection) {
    T3Util.Log('O.Opt SelectObjectFromClick - Input:', { event, svgElement, preserveSelection });

    const visibleObjectCount = LayerUtil.ActiveVisibleZList().length;
    const shapeContainerType = NvConstant.FNObjectTypes.ShapeContainer;

    // Exit if no visible objects or no SVG element provided
    if (visibleObjectCount === 0) {
      T3Util.Log('O.Opt SelectObjectFromClick - Output: false (no visible objects)');
      return false;
    }

    if (svgElement === null) {
      T3Util.Log('O.Opt SelectObjectFromClick - Output: false (no SVG element)');
      return false;
    }

    // Get the object ID and corresponding data object
    const objectId = svgElement.GetID();
    const object = ObjectUtil.GetObjectPtr(objectId, false);

    // Verify the object is a valid drawing object
    if (!(object && object instanceof Instance.Shape.BaseDrawObject)) {
      T3Util.Log('O.Opt SelectObjectFromClick - Output: false (not a drawing object)');
      return false;
    }

    // // Exclude shape container objects in cells
    // if (object && object.objecttype === shapeContainerType && this.ContainerIsInCell(object)) {
    //   T3Util.Log('O.Opt SelectObjectFromClick - Output: false (container in cell)');
    //   return false;
    // }

    // Determine if this is a multiple selection operation
    let isMultipleSelection = event.gesture.srcEvent.shiftKey ||
      event.gesture.srcEvent.ctrlKey ||
      T3Constant.DocContext.SelectionToolMultiple;

    // Special case: Ctrl+Meta keys together cancel multiple selection
    if (event.gesture.srcEvent.ctrlKey && event.gesture.srcEvent.metaKey) {
      isMultipleSelection = false;
    }

    // Get the selected list and check if object is already selected
    const selectedList = T3Gv.stdObj.GetObject(T3Gv.opt.theSelectedListBlockID).Data;
    var indexInSelectedList = $.inArray(objectId, selectedList);

    // Prepare array with object to select
    let objectsToSelect = [];
    objectsToSelect.push(objectId);

    // Handle object selection depending on whether it's already selected
    if (indexInSelectedList == -1) {
      // Object is not already selected - select it
      this.SelectObjects(objectsToSelect, isMultipleSelection, false);
      T3Util.Log('O.Opt SelectObjectFromClick - Output: true (object selected)');
      return true;
    }
    else {
      if (!isMultipleSelection) {
        // Object is already selected and this isn't a multiple selection
        return true;
      }
      else {
        // Object is already selected and this is a multiple selection
        this.SelectObjects(objectsToSelect, isMultipleSelection, false);
        return !!preserveSelection;
      }

      // return !isMultipleSelection || (this.SelectObjects(objectsToSelect, isMultipleSelection, !1), !!preserveSelection);
    }
  }

  /**
   * Selects one or more objects in the drawing
   * @param objectsToSelect - Array of object IDs to select
   * @param isMultipleSelection - Whether to allow multiple objects to be selected
   * @param preserveSelectionState - Whether to preserve the existing selection state
   * @returns The selected object ID or -1 if none selected
   */
  static SelectObjects(objectsToSelect, isMultipleSelection?, preserveSelectionState?) {
    T3Util.Log("O.Opt SelectObjects - Input:", { objectsToSelect, isMultipleSelection, preserveSelectionState });

    let selectedIndex = -1;

    if (objectsToSelect && objectsToSelect.length > 0) {
      // Get the text edit data object
      const textEditData = ObjectUtil.GetObjectPtr(T3Gv.opt.teDataBlockId, false);

      // Close text editing if active
      if (textEditData.theActiveTextEditObjectID !== -1) {
        this.DeactivateTextEdit(false, true);
      }

      // Get the current selection list
      const selectedList = ObjectUtil.GetObjectPtr(T3Gv.opt.theSelectedListBlockID, preserveSelectionState);

      // Get the currently targeted object
      selectedIndex = SelectUtil.GetTargetSelect();

      // If not in multiple selection mode, clear existing selection
      if (!isMultipleSelection) {
        T3Gv.opt.SetDimensionVisibility(selectedList, false);
        selectedList.length = 0;
      }

      // Handle existing target selection state
      if (selectedIndex >= 0) {
        const indexInSelectedList = $.inArray(selectedIndex, selectedList);
        if (isMultipleSelection) {
          if (indexInSelectedList >= 0) {
            selectedIndex = -1;
          }
        } else {
          if (indexInSelectedList < 0) {
            selectedIndex = -1;
          }
        }
      }

      // Process each object to select
      for (let i = 0; i < objectsToSelect.length; i++) {
        let objectId = objectsToSelect[i];
        const object = ObjectUtil.GetObjectPtr(objectId, false);

        if (object) {
          const indexInSelectedList = $.inArray(objectId, selectedList);

          // If object not in selection list, add it
          if (indexInSelectedList === -1) {
            if (selectedIndex < 0) {
              selectedIndex = objectId;
            }
            selectedList.push(objectId);
          }
          // If in multiple selection mode and object already selected, remove it (toggle behavior)
          else if (isMultipleSelection) {
            const objectInList = ObjectUtil.GetObjectPtr(objectId, false);
            if (objectInList) {
              objectInList.ShowOrHideDimensions(false);
            }
            selectedList.splice(indexInSelectedList, 1);
          }
        }
      }

      // Ensure selectedIndex is valid
      if (selectedIndex >= 0) {
        const indexInSelectedList = $.inArray(selectedIndex, selectedList);
        if (indexInSelectedList < 0) {
          selectedIndex = -1;
        }
      }

      // If no selection index but we have objects selected, use the first one
      if (selectedIndex < 0 && selectedList.length > 0) {
        selectedIndex = selectedList[0];
      }

      // Update the target selection and refresh the UI
      SelectUtil.SetTargetSelect(selectedIndex, preserveSelectionState);
      T3Gv.opt.lastOpDuplicate = false;
      this.UpdateSelectionAttributes(selectedList);
      SvgUtil.HideAllSVGSelectionStates();
      SvgUtil.RenderAllSVGSelectionStates();
    }

    T3Util.Log("O.Opt SelectObjects - Output:", { selectedIndex, selectedCount: objectsToSelect?.length || 0 });
    return selectedIndex;
  }

  /**
   * Gets the currently targeted/selected object ID
   * @returns The ID of the currently targeted object or -1 if none selected
   */
  static GetTargetSelect() {
    T3Util.Log('O.Opt GetTargetSelect - Input: No parameters');

    // Get session data
    const sessionData = ObjectUtil.GetObjectPtr(T3Gv.opt.sdDataBlockId, false);

    // Default to no selection
    let targetSelectId = -1;

    // Verify the selected object is valid
    if (sessionData.tselect >= 0) {
      const selectedObject = ObjectUtil.GetObjectPtr(sessionData.tselect, false);
      if (selectedObject && selectedObject instanceof Instance.Shape.BaseDrawObject) {
        targetSelectId = sessionData.tselect;
      }
    }

    T3Util.Log('O.Opt GetTargetSelect - Output:', targetSelectId);
    return targetSelectId;
  }

  /**
   * Sets an object as the current target selection
   * @param targetId - The object ID to set as the target selection
   * @param preserveSession - Whether to preserve the current session data
   */
  static SetTargetSelect(targetId: number, preserveSession: boolean) {
    T3Util.Log("O.Opt SetTargetSelect - Input:", { targetId, preserveSession });

    // Get session data
    let sessionData = ObjectUtil.GetObjectPtr(T3Gv.opt.sdDataBlockId, preserveSession);
    sessionData.tselect = targetId;

    let dimensions = null;

    // If we have a valid target ID, get its dimensions
    if (targetId > 0) {
      const drawingObject = ObjectUtil.GetObjectPtr(targetId, false);
      if (drawingObject && drawingObject instanceof Instance.Shape.BaseDrawObject) {
        dimensions = drawingObject.GetDimensionsForDisplay();
      } else {
        // Reset target if object is invalid
        targetId = -1;
        sessionData.tselect = targetId;
      }
    }

    // Update UI with dimensions if available
    if (dimensions) {
      UIUtil.ShowFrame(true);
      UIUtil.UpdateDisplayCoordinates(dimensions, null, null, null);
    } else {
      UIUtil.ShowFrame(false);
    }

    T3Util.Log("O.Opt SetTargetSelect - Output:", { targetId: sessionData.tselect, dimensions });
  }

  /**
   * Updates the selection state attributes based on currently selected objects
   * @param selectedObjects - Array of currently selected object IDs
   */
  static UpdateSelectionAttributes(selectedObjects) {
    T3Util.Log('O.Opt UpdateSelectionAttributes - Input:', selectedObjects);

    if (!selectedObjects) {
      T3Util.Log('O.Opt UpdateSelectionAttributes - Output: No selection objects provided, exiting early');
      return;
    }

    // Constants for better readability
    const DRAWING_OBJECT_CLASS = OptConstant.DrawObjectBaseClass;
    const TEXT_FACE = TextConstant.TextFace;
    const OBJECT_TYPES = NvConstant.FNObjectTypes;
    const SHAPE_TYPE = OptConstant.ShapeType;
    const DIMENSION_FLAGS = NvConstant.DimensionFlags;
    const TEXT_FLAGS = NvConstant.TextFlags;

    // Local variables with descriptive names
    let targetObjectId;
    let objectIndex;
    let currentObject;
    let targetObject;
    let moveList;
    let objectCount = 0;

    // Tree tracking
    const treeTopInfo = {
      topconnector: -1,
      topshape: -1,
      foundtree: false
    };

    // Get session data
    const sessionData = ObjectUtil.GetObjectPtr(T3Gv.opt.sdDataBlockId, false);

    // Get selection count if we have selected objects
    if (selectedObjects && (objectCount = selectedObjects.length)) {
      // First selected object is available here if needed
      const firstSelectedObject = selectedObjects[0];
    }

    // Reset selection state properties
    this.ResetSelectionState();

    // Handle undo/redo state
    const undoState = T3Gv.state.GetUndoState();

    let selectState = T3Gv.opt.selectionState;
    selectState.undo = undoState.undo;
    selectState.redo = undoState.redo;

    // Special case: dimension editing mode
    if (T3Gv.opt.bInDimensionEdit) {
      T3Gv.opt.HandleDimensionEditMode(sessionData);
      T3Util.Log('O.Opt UpdateSelectionAttributes - Output: Dimension edit mode handled');
      return;
    }

    // No selection or note editing mode
    if (objectCount === 0 || T3Gv.opt.bInNoteEdit) {
      T3Gv.opt.HandleEmptySelectionOrNoteEditMode(sessionData);
      T3Util.Log('O.Opt UpdateSelectionAttributes - Output: Empty selection or note edit mode handled');
      return;
    }

    // Get target selection object
    targetObjectId = SelectUtil.GetTargetSelect();
    selectState.nselect = objectCount;

    // Validate target object
    if (targetObjectId >= 0) {
      targetObject = ObjectUtil.GetObjectPtr(targetObjectId, false);
      if (!(targetObject && targetObject instanceof Instance.Shape.BaseDrawObject)) {
        targetObjectId = -1;
        sessionData.tselect = -1;
      }
    }

    // Process target object if valid
    if (targetObjectId >= 0) {
      T3Gv.opt.ProcessTargetObject(targetObjectId, targetObject);
    }

    // Process each selected object
    for (objectIndex = 0; objectIndex < objectCount; objectIndex++) {
      const objectId = selectedObjects[objectIndex];

      // Check if selection allows alignment
      if (moveList) {
        if (moveList.indexOf(objectId) === -1) {
          selectState.allowalign = true;
        }
      } else if (objectId !== targetObjectId) {
        selectState.allowalign = true;
      }

      // Get and process the current object
      currentObject = ObjectUtil.GetObjectPtr(objectId, false);
      if (!(currentObject instanceof Instance.Shape.BaseDrawObject)) continue;

      const objectToProcess = currentObject;
      // Process the object based on its type and properties
      T3Gv.opt.ProcessSelectedObject(currentObject, objectToProcess, objectIndex);
    }

    // Clean up and finalize
    T3Gv.opt.moveList = null;
    selectState.allowcopy = selectState.nselect > 0;

    // Create copy of selection attributes for UI
    const selectionAttributes = new SelectionAttr();
    $.extend(true, selectionAttributes, selectState);

    // Handle pixel to point conversion for font size if needed
    if (T3Gv.docUtil.rulerConfig.showpixels && selectionAttributes.fontsize >= 0) {
      selectionAttributes.fontsize = OptCMUtil.PixelstoPoints(selectionAttributes.fontsize);
    }

    T3Util.Log('O.Opt UpdateSelectionAttributes - Output:', {
      nselect: selectState.nselect,
      nshapeselected: selectState.nshapeselected,
      nlineselected: selectState.nlineselected,
      nconnectorselected: selectState.nconnectorselected,
      hastext: selectState.selectionhastext
    });
  }

  /**
   * Resets the selection state to default values
   * This method clears all properties in the selection state object when:
   * - New selection is being made
   * - Selection is being cleared
   * - Before calculating new selection attributes
   * @returns void
   */
  static ResetSelectionState() {
    T3Util.Log('O.Opt ResetSelectionState - Input: No parameters');

    const selectionState = T3Gv.opt.selectionState;

    // Selection counts
    selectionState.nselect = 0;
    selectionState.nlineselected = 0;
    selectionState.nshapeselected = 0;
    selectionState.nconnectorselected = 0;
    selectionState.ngroupsselected = 0;
    selectionState.nimageselected = 0;
    selectionState.ntablesselected = 0;
    selectionState.npolylinecontainerselected = 0;
    selectionState.ncells_selected = 0;
    selectionState.nsegs = 0;

    // Selection flags
    selectionState.IsTargetTable = false;
    selectionState.allowalign = 0;
    selectionState.allowcopy = false;
    selectionState.selectionhastext = false;
    selectionState.cell_notext = false;
    selectionState.cellselected = false;
    selectionState.projectTableSelected = false;
    selectionState.lockedTableSelected = false;
    selectionState.polyclosed = false;
    selectionState.iswallselected = false;
    selectionState.bInNoteEdit = T3Gv.opt.bInNoteEdit;
    selectionState.connectorCanHaveCurve = false;
    selectionState.isJiraCard = false;

    // Dimension properties
    selectionState.width = 0;
    selectionState.widthstr = '';
    selectionState.height = 0;
    selectionState.heightstr = '';
    selectionState.left = 0;
    selectionState.leftstr = '';
    selectionState.top = 0;
    selectionState.topstr = '';
    selectionState.WallThickness = 0;
    selectionState.fixedCornerRadius = -2;
    selectionState.lineCornerRadius = -2;

    // Type and state indicators
    selectionState.TextDirection = 0;
    selectionState.dimensions = 0;
    selectionState.celltype = 0;
    selectionState.cellflags = 0;
    selectionState.subtype = 0;
    selectionState.objecttype = 0;

    // References and IDs
    selectionState.datasetElemID = -1;
    selectionState.tselect = -1;
    selectionState.paste = OptCMUtil.GetClipboardType();
    selectionState.csOptMng = T3Gv.wallOpt;

    T3Util.Log('O.Opt ResetSelectionState - Output: Selection state reset');
  }
}

export default SelectUtil
