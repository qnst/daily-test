

import T3Gv from "../../Data/T3Gv"
import NvConstant from "../../Data/Constant/NvConstant"
import ToolUtil from './ToolUtil'
import T3Util from "../../Util/T3Util";
import OptConstant from "../../Data/Constant/OptConstant";

class ToolOpt {

  public tul: ToolUtil

  constructor() {
    this.tul = new ToolUtil();
  }

  /**
   * Handles selection operations based on the event and selection mode
   * @param event - The DOM event that triggered the selection
   * @returns void
   */
  SelectAct(event) {
    T3Util.Log('O.ToolOpt.SelectAct - Input:', { event });

    // const selectionToolSticky = false;

    this.tul.CancelOperation();

    // if (selectionToolSticky) {
    //   T3Gv.opt.ResetObjectDraw();
    // }

    // let selectionModeAttr = "";// event.currentTarget.attributes.getNamedItem(NvConstant.Constants.Attr_SelectionMode);
    // let isMultipleSelection = false;

    // if (selectionModeAttr) {
    //   switch (selectionModeAttr) {
    //     case 'multiple':
    //       isMultipleSelection = true;
    //       break;
    //     case 'all':
    //       T3Gv.opt.SelectAllObjects();
    //       T3Util.Log('O.ToolOpt.SelectAct - Output: Selected all objects');
    //       return;
    //     case 'lines':
    //       T3Gv.opt.SelectAllObjects([
    //         OptConstant.DrawObjectBaseClass.Line,
    //         OptConstant.DrawObjectBaseClass.Connector
    //       ]);
    //       T3Util.Log('O.ToolOpt.SelectAct - Output: Selected all line objects');
    //       break;
    //     case 'shapes':
    //       T3Gv.opt.SelectAllObjects([OptConstant.DrawObjectBaseClass.Shape]);
    //       T3Util.Log('O.ToolOpt.SelectAct - Output: Selected all shape objects');
    //       break;
    //   }
    // }

    // if (isMultipleSelection) {
    //   // NvConstant.DocumentContext.SelectionToolMultiple = true;
    // }

    // T3Util.Log('O.ToolOpt.SelectAct - Output:', { isMultipleSelection, selectionMode: selectionModeAttr });
  }

  /**
    * Sets default wall thickness and initiates wall drawing
    * @param event - The DOM event that triggered the action
    * @returns void
    */
  DrawWall(event) {
    T3Util.Log('O.ToolOpt.DrawWall - Input:', { event });

    const defaultWallThickness = 0.5;
    this.tul.SetDefaultWallThickness(defaultWallThickness, null);
    this.tul.DrawNewWallShape(null, null);

    T3Util.Log('O.ToolOpt.DrawWall - Output: Initialized wall drawing with thickness', defaultWallThickness);
  }

  /**
   * Creates a new shape from the selected tool
   * @param event - The DOM event that triggered the action
   * @param shapeType - The type of shape to create
   * @returns void
   */
  StampShapeFromToolAct(event, shapeType) {
    T3Util.Log('O.ToolOpt.StampShapeFromToolAct - Input:', { event, shapeType });

    this.tul.StampOrDragDropNewShape(event, shapeType);

    T3Util.Log('O.ToolOpt.StampShapeFromToolAct - Output: Created shape of type', shapeType);
  }

  /**
   * Draws a new line shape
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  ToolLineAct(event) {
    T3Util.Log('O.ToolOpt.ToolLineAct - Input:', { event });

    // Parameters: lineType=2, isPolygon=false, isClosed=false
    this.tul.DrawNewLineShape(2, false, false);

    T3Util.Log('O.ToolOpt.ToolLineAct - Output: Drew new line shape');
  }

  /**
   * Rotates selected shapes by the specified angle
   * @param event - The DOM event that triggered the action
   * @param angle - The rotation angle in degrees
   * @returns null if angle is null, void otherwise
   */
  RotateAct(event, angle) {
    T3Util.Log('O.ToolOpt.RotateAct - Input:', { event, angle });

    if (angle === null) {
      T3Util.Log('O.ToolOpt.RotateAct - Output: No action, angle was null');
      return null;
    }

    this.tul.RotateShapes(360 - angle);

    T3Util.Log('O.ToolOpt.RotateAct - Output: Rotated shapes by angle', 360 - angle);
  }

  /**
   * Aligns selected shapes according to the specified alignment type
   * @param alignmentType - The type of alignment to apply
   * @returns null if alignmentType is null, void otherwise
   */
  ShapeAlignAct(alignmentType) {
    T3Util.Log('O.ToolOpt.ShapeAlignAct - Input:', { alignmentType });

    if (alignmentType === null) {
      T3Util.Log('O.ToolOpt.ShapeAlignAct - Output: No action, alignmentType was null');
      return null;
    }

    this.tul.AlignShapes(alignmentType);

    T3Util.Log('O.ToolOpt.ShapeAlignAct - Output: Aligned shapes with type', alignmentType);
  }

  /**
   * Groups currently selected shapes
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  GroupAct(event) {
    T3Util.Log('O.ToolOpt.GroupAct - Input:', { event });

    this.tul.GroupSelectedShapes();

    T3Util.Log('O.ToolOpt.GroupAct - Output: Grouped selected shapes');
  }

  /**
   * Ungroups currently selected shapes
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  UnGroupAct(event) {
    T3Util.Log('O.ToolOpt.UngroupAct - Input:', { event });

    this.tul.UnGroupSelectedShapes();

    T3Util.Log('O.ToolOpt.UngroupAct - Output: Ungrouped selected shapes');
  }

  /**
   * Flips selected shapes horizontally
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  ShapeFlipHorizontalAct(event) {
    T3Util.Log('O.ToolOpt.ShapeFlipHorizontalAct - Input:', { event });

    this.tul.FlipHorizontal();

    T3Util.Log('O.ToolOpt.ShapeFlipHorizontalAct - Output: Flipped shapes horizontally');
  }

  /**
   * Flips selected shapes vertically
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  ShapeFlipVerticalAct(event) {
    T3Util.Log('O.ToolOpt.ShapeFlipVerticalAct - Input:', { event });

    this.tul.FlipVertical();

    T3Util.Log('O.ToolOpt.ShapeFlipVerticalAct - Output: Flipped shapes vertically');
  }

  /**
   * Makes selected shapes the same size according to the specified option
   * @param event - The DOM event that triggered the action
   * @param sizeOption - The size option to apply
   * @returns void
   */
  MakeSameSizeAct(event, sizeOption) {
    T3Util.Log('O.ToolOpt.MakeSameSizeAct - Input:', { event, sizeOption });

    this.tul.MakeSameSize(sizeOption);

    T3Util.Log('O.ToolOpt.MakeSameSizeAct - Output: Made shapes same size with option', sizeOption);
  }

  /**
   * Brings selected shapes to the front
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  ShapeBringToFrontAct(event) {
    T3Util.Log('O.ToolOpt.ShapeBringToFrontAct - Input:', { event });

    this.tul.BringToFrontOf();

    T3Util.Log('O.ToolOpt.ShapeBringToFrontAct - Output: Brought shapes to front');
  }

  /**
   * Sends selected shapes to the back
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  ShapeSendToBackAct(event) {
    T3Util.Log('O.ToolOpt.ShapeSendToBackAct - Input:', { event });

    this.tul.SendToBackOf();

    T3Util.Log('O.ToolOpt.ShapeSendToBackAct - Output: Sent shapes to back');
  }

  /**
   * Pastes copied objects
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  PasteAct(event) {
    T3Util.Log('O.ToolOpt.PasteAct - Input:', { event });

    // Parameter: isRightClick=false
    this.tul.Paste(false);

    T3Util.Log('O.ToolOpt.PasteAct - Output: Pasted objects');
  }

  /**
   * Pastes copied objects on right click
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  PasteActRightClickAct(event) {
    T3Util.Log('O.ToolOpt.PasteActRightClickAct - Input:', { event });

    // Parameter: isRightClick=true
    this.tul.Paste(true);

    T3Util.Log('O.ToolOpt.PasteActRightClickAct - Output: Pasted objects with right click context');
  }

  /**
   * Copies selected objects
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  CopyAct(event) {
    T3Util.Log('O.ToolOpt.CopyAct - Input:', { event });

    this.tul.Copy();

    T3Util.Log('O.ToolOpt.CopyAct - Output: Copied selected objects');
  }

  /**
   * Cuts selected objects
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  CutAct(event) {
    T3Util.Log('O.ToolOpt.CutAct - Input:', { event });

    this.tul.Cut();

    T3Util.Log('O.ToolOpt.CutAct - Output: Cut selected objects');
  }

  /**
   * Deletes selected objects
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  DeleteAct(event) {
    T3Util.Log('O.ToolOpt.DeleteAct - Input:', { event });

    this.tul.DeleteSelectedObjects();

    T3Util.Log('O.ToolOpt.DeleteAct - Output: Deleted selected objects');
  }

  /**
   * Undoes the last operation
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  UndoAct(event) {
    T3Util.Log('O.ToolOpt.UndoAct - Input:', { event });

    this.tul.Undo();

    T3Util.Log('O.ToolOpt.UndoAct - Output: Undid last operation');
  }

  /**
   * Redoes the last undone operation
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  RedoAct(event) {
    T3Util.Log('O.ToolOpt.RedoAct - Input:', { event });

    this.tul.Redo();

    T3Util.Log('O.ToolOpt.RedoAct - Output: Redid last undone operation');
  }

  /**
   * Commits the file picker selection and saves the file
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  CommitFilePickerSelectionAct(event) {
    T3Util.Log('O.ToolOpt.CommitFilePickerSelectionAct - Input:', { event });

    this.tul.SaveAs();

    T3Util.Log('O.ToolOpt.CommitFilePickerSelectionAct - Output: Saved file');
  }

  /**
   * Duplicates selected objects
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  DuplicateAct(event) {
    T3Util.Log('O.ToolOpt.DuplicateAct - Input:', { event });

    this.tul.Duplicate();

    T3Util.Log('O.ToolOpt.DuplicateAct - Output: Duplicated selected objects');
  }

  /**
   * Adds a measurement line to the canvas
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  MeasureDistanceAct(event) {
    T3Util.Log('O.ToolOpt.MeasureDistanceAct - Input:', { event });

    T3Gv.wallOpt.AddMeasureLine(event);

    T3Util.Log('O.ToolOpt.MeasureDistanceAct - Output: Added measurement line');
  }

  /**
   * Adds a measurement area to the canvas
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  MeasureAreaAct(event) {
    T3Util.Log('O.ToolOpt.MeasureAreaAct - Input:', { event });

    T3Gv.wallOpt.AddMeasureArea(event);

    T3Util.Log('O.ToolOpt.MeasureAreaAct - Output: Added measurement area');
  }

  /**
   * Pre-loads a symbol for use
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  ClickSymbolAct(event) {
    T3Util.Log('O.ToolOpt.ClickSymbolAct - Input:', { event });

    const symbolId = "d6e019b9-110d-4990-8897-eade69451d92";
    this.tul.StampOrDragDropNewSymbol(symbolId, false);

    T3Util.Log('O.ToolOpt.ClickSymbolAct - Output: Pre-loaded symbol', symbolId);
  }

  /**
   * Handles drag and drop of symbols
   * @param event - The DOM event that triggered the action
   * @returns void
   */
  DragDropSymbolAct(event) {
    T3Util.Log('O.ToolOpt.DragDropSymbolAct - Input:', { event });

    this.tul.DragDropSymbol(event, true);

    T3Util.Log('O.ToolOpt.DragDropSymbolAct - Output: Handled symbol drag and drop');
  }
}

export default ToolOpt
