

import MainController from './MainController'
import GlobalData from '../../Data/T3Gv'
import ListManager from '../../Data/ListManager';
import Resources from '../../Data/Resources';
import Utils2 from '../../Helper/Utils2';

import ConstantData from '../../Data/ConstantData'


class Commands {

  public MainController: any;

  constructor() {
    this.MainController = new MainController();
  }

  static MainController = new MainController();

  SelectAct = (e) => {
    console.log('SelectAct', e);
    // debugger

    const selectionToolSticky = ConstantData.DocumentContext.SelectionToolSticky;

    // Double Test
    // Select All shape and show re-size image
    Commands.MainController.Shapes.CancelModalOperation();

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

    // Double Test
    // Commands.MainController.Selection.SetSelectionTool(Resources.Tools.Tool_Select, e.shiftKey);

    if (isMultipleSelection) {
      ConstantData.DocumentContext.SelectionToolMultiple = true;
    }

    // Double Test
    // T3Gv.optManager.CloseEdit();
  }

  LineSetDefaultWallThicknessAct = (e) => {
    console.log('LineSetDefaultWallThicknessAct 1', e);

    /*
    if (null == e) return !1;
    var t,
      a = e.currentTarget.attributes.getNamedItem(Constants.Attr_LineThickness);
    null != a.value &&
      (
        t = 'string' == typeof a.value ? parseFloat(a.value, 10) : a.value,



        SDUI.Commands.MainController.Shapes.SetDefaultWallThickness(t, null),
        SDUI.Commands.MainController.Selection.SetSelectionTool(Resources.Tools.Tool_Wall, !0),
        SDUI.Commands.MainController.Shapes.DrawNewWallShape(null, null)
      )
        */



    // if (e == null) return false;

    // const lineThicknessAttr = e.currentTarget.attributes.getNamedItem(Constants.Attr_LineThickness);
    // if (lineThicknessAttr != null && lineThicknessAttr.value != null) {
    //   const thickness = typeof lineThicknessAttr.value === 'string' ? parseFloat(lineThicknessAttr.value) : lineThicknessAttr.value;

    //   SDUI.Commands.MainController.Shapes.SetDefaultWallThickness(thickness, null);
    //   SDUI.Commands.MainController.Selection.SetSelectionTool(Resources.Tools.Tool_Wall, true);
    //   SDUI.Commands.MainController.Shapes.DrawNewWallShape(null, null);
    // }

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

    Commands.MainController.Shapes.SetDefaultWallThickness(thickness, null);
    // Commands.MainController.Selection.SetSelectionTool(4/*Resources.Tools.Tool_Wall*/, true);
    Commands.MainController.Shapes.DrawNewWallShape(null, null);


  }

  /*
  StampShapeFromToolAct: function (e) {
    if (
      SDUI.Commands.MainController.Shapes.CancelModalOperation(),
      null == e
    ) return null;
    var t = e.currentTarget.attributes.getNamedItem(SDUI.Constants.Attr_ShapeType);
    SDUI.Commands.MainController.Selection.SetSelectionTool(SDUI.Resources.Tools.Tool_Shape, e.shiftKey),
    null != t &&
    null != t.value ? (
      shapeType = parseInt(t.value),
      SDUI.ConstantData.DocumentContext.ShapeTool != shapeType &&
      SDJS.SDF.ChangeHeader(SDJS.ConstantData2.SDROpCodesByName.SDF_C_HEAD_UIINFO, !1),
      SDUI.Commands.MainController.Selection.SetShapeTool(shapeType),
      SDUI.Commands.MainController.Shapes.StampOrDragDropNewShape(e, shapeType)
    ) : SDUI.Commands.MainController.Shapes.StampOrDragDropNewShape(e, null)
  }
  */

  StampShapeFromToolAct = (e, type) => {

    console.log('StampShapeFromToolAct', e, type);

    // if (
    //   Commands.MainController.Shapes.CancelModalOperation(),
    //   null == e
    // ) return null;

    // SDUI.ts

    // var t = e.currentTarget.attributes.getNamedItem('shapeType'/*Constants.Attr_ShapeType*/);
    // Double Resources.ts

    // SDF_C_HEAD_UIINFO => SDJS.FileParse.ts  SDF_C_HEAD_UIINFO=188
    // SDUI.Commands.MainController.Selection.SetSelectionTool(1 /*Resources.Tools.Tool_Shape*/, e.shiftKey),
    //   null != t &&
    //     null != t.value ? (
    //     shapeType = 2,// parseInt(t.value),
    //     ConstantData.DocumentContext.ShapeTool != shapeType &&
    //     SDF.ChangeHeader(ConstantData2.SDROpCodesByName.SDF_C_HEAD_UIINFO, !1),
    //     SDUI.Commands.MainController.Selection.SetShapeTool(shapeType),
    //     SDUI.Commands.MainController.Shapes.StampOrDragDropNewShape(e, shapeType)
    //   ) : SDUI.Commands.MainController.Shapes.StampOrDragDropNewShape(e,/* null*/2)



    // const shapeTypeAttr = e.currentTarget.attributes.getNamedItem('shapeType');
    // Commands.MainController.Selection.SetSelectionTool(1, e.shiftKey);

    // if (shapeTypeAttr && shapeTypeAttr.value) {
    //   const shapeType = parseInt(shapeTypeAttr.value, 10);
    //   if (ConstantData.DocumentContext.ShapeTool !== shapeType) {
    //     SDF.ChangeHeader(ConstantData2.SDROpCodesByName.SDF_C_HEAD_UIINFO, false);
    //   }
    //   SDUI.Commands.MainController.Selection.SetShapeTool(shapeType);
    //   SDUI.Commands.MainController.Shapes.StampOrDragDropNewShape(e, shapeType);
    // } else {
    //   SDUI.Commands.MainController.Shapes.StampOrDragDropNewShape(e, 2);
    // }


    Commands.MainController.Shapes.StampOrDragDropNewShape(e,/* null*/type)


    // console.log('StampShapeFromToolAct', e);

    //   if (
    //     SDUI.Commands.MainController.Shapes.CancelModalOperation(),
    //     null == e
    //   ) return null;

    //   // SDUI.ts

    //   var t = e.currentTarget.attributes.getNamedItem('shapeType'/*SDUI.Constants.Attr_ShapeType*/);
    //   // Double SDUI.Resources.ts

    //   // SDF_C_HEAD_UIINFO => SDJS.FileParse.ts  SDF_C_HEAD_UIINFO=188
    //   SDUI.Commands.MainController.Selection.SetSelectionTool(1 /*SDUI.Resources.Tools.Tool_Shape*/, e.shiftKey),
    //     null != t &&
    //       null != t.value ? (
    //       shapeType =type,//2,// parseInt(t.value),
    //       SDUI.ConstantData.DocumentContext.ShapeTool != shapeType &&
    //       SDJS.SDF.ChangeHeader(SDJS.ConstantData2.SDROpCodesByName.SDF_C_HEAD_UIINFO, !1),
    //       SDUI.Commands.MainController.Selection.SetShapeTool(shapeType),
    //       SDUI.Commands.MainController.Shapes.StampOrDragDropNewShape(e, shapeType)
    //     ) : SDUI.Commands.MainController.Shapes.StampOrDragDropNewShape(e,/* null2*/type)
  }

  ToolLineAct = (e) => {
    // if (
    //   SDUI.Commands.MainController.Shapes.CancelModalOperation(),
    //   null == e
    // ) return null;

    //linetype="line" linetype="arcLine" linetype="segLine" linetype="polyLine" linetype="arcSegLine" lineType="freehandLine"


    /*

    Resources.Tools = {
    Tool_Symbol: - 1,
    Tool_Select: 0,
    Tool_Shape: 1,
    Tool_Line: 2,
    Tool_Text: 3,
    Tool_Wall: 4,
    Tool_StyledLine: 5
    }
    */
    // var t = e.currentTarget.attributes.getNamedItem(/*Constants.Attr_LineType*/'lineType');
    // SDUI.Commands.MainController.Selection.SetSelectionTool(Resources.Tools.Tool_Line, e.shiftKey),
    //   null != t &&
    //     null != t.value ? (
    //     ConstantData.DocumentContext.LineTool != t.value &&
    //     SDF.ChangeHeader(ConstantData2.SDROpCodesByName.SDF_C_HEAD_UIINFO, !1),

    //     // Hightlight the selected line tool
    //     SDUI.Commands.MainController.Selection.SetLineTool(t.value),
    //     SDUI.Commands.MainController.Shapes.DrawNewLineShape(t.value, !1, !1)
    //   ) : SDUI.Commands.MainController.Shapes.DrawNewLineShape(null, !1, !1)


    Commands.MainController.Shapes.DrawNewLineShape(2, !1, !1)
  }

  RotateAct = (event, angle) => {
    if (null == angle)
      return null;
    // var t = e.currentTarget.attributes.getNamedItem('angle'/*SDUI.Constants.Attr_RotationAngle*/).value;
    var t = angle;
    Commands.MainController.Shapes.RotateShapes(360 - t)
  }

  ShapeAlignAct = (e) => {
    if (null == e)
      return null;
    // var t = e.currentTarget.attributes.getNamedItem(SDUI.Constants.Attr_ShapeAlign).value;
    var t = e;
    Commands.MainController.Shapes.AlignShapes(t)
  }

  GroupAct = (e) => {
    Commands.MainController.Shapes.GroupSelectedShapes()
  }


  UngroupAct = (e) => {
    Commands.MainController.Shapes.UngroupSelectedShapes()
  }

  ShapeFlipHorizontalAct = (e) => {
    Commands.MainController.Shapes.FlipHorizontal()
  }

  ShapeFlipVerticalAct = (e) => {
    Commands.MainController.Shapes.FlipVertical()
  }

  MakeSameSizeAct = (e, samesizeoption) => {
    // if (null == e)
    //   return !1;
    // var t = e.currentTarget.attributes.getNamedItem(SDUI.Constants.Attr_SameSizeOption);
    var t = samesizeoption;
    Commands.MainController.Shapes.MakeSameSize(t)
  }

  ShapeBringToFrontAct = (e) => {
    Commands.MainController.Shapes.BringToFrontOf()
  }

  ShapeSendToBackAct = (e) => {
    Commands.MainController.Shapes.SendToBackOf()
  }

  PasteAct = (e) => {
    // Utils2.FlashUIControl(Resources.Controls.Ribbon_Home.Paste.Id);
    Commands.MainController.Shapes.Paste(!1)
  }

  PasteActRightClickAct = (e) => {
    // Utils2.FlashUIControl(Resources.Controls.Ribbon_Home.Paste.Id),
    Commands.MainController.Shapes.Paste(!0)
  }

  CopyAct = (e) => {
    // Utils2.FlashUIControl(Resources.Controls.Ribbon_Home.Copy.Id),
    Commands.MainController.Shapes.Copy()
  }

  CutAct = (e) => {
    // Utils2.FlashUIControl(Resources.Controls.Ribbon_Home.Cut.Id),
    Commands.MainController.Shapes.Cut()
  }

  DeleteAct = (e) => {
    Commands.MainController.Shapes.DeleteSelectedObjects()
  }

  UndoAct = (e) => {
    Commands.MainController.Shapes.Undo()
  }

  RedoAct = (e) => {
    Commands.MainController.Shapes.Redo()
  }

  CommitFilePickerSelectionAct = (e) => {
    Commands.MainController.SaveAs()
  }

  DuplicateAct = (e) => {
    Commands.MainController.Shapes.Duplicate()
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

    Commands.MainController.Shapes.SD_PreLoad_Symbol("d6e019b9-110d-4990-8897-eade69451d92", false, null, true)
  }

  DragDropSymbolAct = (e) => {
    // if (null == e) return !1;
    // var t = e.currentTarget.attributes.getNamedItem(SDUI.Constants.Attr_SymbolId);
    // null != t &&
    //   null != t.value &&
    //   SDUI.Commands.MainController.Shapes.DragDropSymbol(e, t.value)

    Commands.MainController.Shapes.DragDropSymbol(e, 't.value')
  }

}

export default Commands
