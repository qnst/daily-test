

import MainController from './MainController'
import GlobalData from '../../Data/T3Gv'
import ListManager from '../../Data/ListManager';
import Resources from '../../Data/Resources';
import Utils2 from '../../Helper/Utils2';
import ConstantData from '../../Data/ConstantData'
import ToolUtil from './ToolUtil';

class ToolOpt {

  public tul: ToolUtil

  constructor() {
    this.tul = new ToolUtil();
  }

  SelectAct = (e) => {

    const selectionToolSticky = ConstantData.DocumentContext.SelectionToolSticky;

    this.tul.CancelModalOperation();

    if (selectionToolSticky) {
      T3Gv.optManager.ResetObjectDraw();
    }

    const selectionModeAttr = e.currentTarget.attributes.getNamedItem(ConstantData.Constants.Attr_SelectionMode);
    let isMultipleSelection = false;

    if (selectionModeAttr) {
      switch (selectionModeAttr.value) {
        case 'multiple':
          isMultipleSelection = true;
          break;
        case 'all':
          T3Gv.optManager.SelectAllObjects();
          return;
        case 'lines':
          T3Gv.optManager.SelectAllObjects([
            ConstantData.DrawingObjectBaseClass.LINE,
            ConstantData.DrawingObjectBaseClass.CONNECTOR
          ]);
          break;
        case 'shapes':
          T3Gv.optManager.SelectAllObjects([ConstantData.DrawingObjectBaseClass.SHAPE]);
          break;
      }
    }


    if (isMultipleSelection) {
      ConstantData.DocumentContext.SelectionToolMultiple = true;
    }

    T3Gv.optManager.CloseEdit();
  }

  LineSetDefaultWallThicknessAct = (e) => {

    //Interior Wall 4" linethickness="0.33333" Exterior Wall 6 linethickness="0.5"
    const thickness = 0.5

    // Resources.Tools = {
    //   Tool_Symbol: - 1,
    //   Tool_Select: 0,
    //   Tool_Shape: 1,
    //   Tool_Line: 2,
    //   Tool_Text: 3,
    //   Tool_Wall: 4,
    //   Tool_StyledLine: 5
    // }

    this.tul.SetDefaultWallThickness(thickness, null);
    // Commands.MainController.Selection.SetSelectionTool(4/*Resources.Tools.Tool_Wall*/, true);
    this.tul.DrawNewWallShape(null, null);


  }


  StampShapeFromToolAct = (e, type) => {



    this.tul.StampOrDragDropNewShape(e,/* null*/type)


  }

  ToolLineAct = (e) => {

    this.tul.DrawNewLineShape(2, !1, !1)
  }

  RotateAct = (event, angle) => {
    if (null == angle)
      return null;
    // var t = e.currentTarget.attributes.getNamedItem('angle'/*SDUI.Constants.Attr_RotationAngle*/).value;
    var t = angle;
    this.tul.RotateShapes(360 - t)
  }

  ShapeAlignAct = (e) => {
    if (null == e)
      return null;
    // var t = e.currentTarget.attributes.getNamedItem(SDUI.Constants.Attr_ShapeAlign).value;
    var t = e;
    this.tul.AlignShapes(t)
  }

  GroupAct = (e) => {
    this.tul.GroupSelectedShapes()
  }


  UngroupAct = (e) => {
    this.tul.UngroupSelectedShapes()
  }

  ShapeFlipHorizontalAct = (e) => {
    this.tul.FlipHorizontal()
  }

  ShapeFlipVerticalAct = (e) => {
    this.tul.FlipVertical()
  }

  MakeSameSizeAct = (e, samesizeoption) => {
    // if (null == e)
    //   return !1;
    // var t = e.currentTarget.attributes.getNamedItem(SDUI.Constants.Attr_SameSizeOption);
    var t = samesizeoption;
    this.tul.MakeSameSize(t)
  }

  ShapeBringToFrontAct = (e) => {
    this.tul.BringToFrontOf()
  }

  ShapeSendToBackAct = (e) => {
    this.tul.SendToBackOf()
  }

  PasteAct = (e) => {
    // Utils2.FlashUIControl(Resources.Controls.Ribbon_Home.Paste.Id);
    this.tul.Paste(!1)
  }

  PasteActRightClickAct = (e) => {
    // Utils2.FlashUIControl(Resources.Controls.Ribbon_Home.Paste.Id),
    this.tul.Paste(!0)
  }

  CopyAct = (e) => {
    // Utils2.FlashUIControl(Resources.Controls.Ribbon_Home.Copy.Id),
    this.tul.Copy()
  }

  CutAct = (e) => {
    // Utils2.FlashUIControl(Resources.Controls.Ribbon_Home.Cut.Id),
    this.tul.Cut()
  }

  DeleteAct = (e) => {
    this.tul.DeleteSelectedObjects()
  }

  UndoAct = (e) => {
    this.tul.Undo()
  }

  RedoAct = (e) => {
    this.tul.Redo()
  }

  CommitFilePickerSelectionAct = (e) => {
    Commands.MainController.SaveAs()
  }

  DuplicateAct = (e) => {
    this.tul.Duplicate()
  }

  MeasureDistanceAct = (e) => {
    T3Gv.gBusinessManager.AddMeasureLine(e)
  }

  MeasureAreaAct = (e) => {
    T3Gv.gBusinessManager.AddMeasureArea(e)
  }

  ClickSymbolAct = (e) => {
    // if (
    //   SDUI.Commands.MainController.Shapes.CancelDragOperation(),
    //   null == e
    // ) return !1;
    // var t = e.currentTarget.attributes.getNamedItem(SDUI.Constants.Attr_SymbolId);
    // t &&
    //   SDUI.Commands.MainController.Shapes.SD_PreLoad_Symbol(
    //     t.value,
    //     !1,
    //     SDUI.Commands.MainController.Symbols.SelectButton,
    //     !0
    //   )

    this.tul.SD_PreLoad_Symbol("d6e019b9-110d-4990-8897-eade69451d92", false, null, true)
  }

  DragDropSymbolAct = (e) => {
    // if (null == e) return !1;
    // var t = e.currentTarget.attributes.getNamedItem(SDUI.Constants.Attr_SymbolId);
    // null != t &&
    //   null != t.value &&
    //   SDUI.Commands.MainController.Shapes.DragDropSymbol(e, t.value)

    this.tul.DragDropSymbol(e, 't.value')
  }

}

export default ToolOpt
