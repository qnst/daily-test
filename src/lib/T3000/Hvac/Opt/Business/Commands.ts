

import MainController from './MainController'
import T3Gv from '../../Data/T3Gv'
import ListManager from '../../Data/ListManager';
import Resources from '../../Data/Resources';
import Utils2 from '../../Helper/Utils2';

import ConstantData from '../../Data/ConstantData'
import ShapeController from './ShapeController';
import ToolUtil from './ToolUtil';
import ToolUtil1 from './ShapeController';

// remove this class
// update name to ToolOpt
class Commands {
  public tul: ToolUtil1

  // public MainController: any;

  constructor() {
    // this.MainController = new MainController();
    this.tul = new ToolUtil1();
  }

  static MainController = new MainController();

  SD_Select = (e) => {
    console.log('SD_Select', e);
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

  SD_Line_SetDefaultWallThickness = (e) => {
    console.log('SD_Line_SetDefaultWallThickness 1', e);

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
  SD_StampShapeFromTool: function (e) {
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
  SD_StampShapeFromTool = (e, type) => {

    console.log('SD_StampShapeFromTool', e, type);

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


    // Commands.MainController.Shapes.StampOrDragDropNewShape(e,/* null*/type)
    //new ShapeController().StampOrDragDropNewShape(e, type);

    new ToolUtil1().StampOrDragDropNewShape(e, type);


    // console.log('SD_StampShapeFromTool', e);

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

  /**
 * Creates a new shape from the selected tool
 * @param event - The DOM event that triggered the action
 * @param shapeType - The type of shape to create
 * @returns void
 */
  StampShapeFromToolAct(event, shapeType) {
    console.log('O.ToolOpt.StampShapeFromToolAct - Input:', { event, shapeType });

    this.tul.StampOrDragDropNewShape(event, shapeType);

    console.log('O.ToolOpt.StampShapeFromToolAct - Output: Created shape of type', shapeType);
  }

  SD_Tool_Line = (e) => {
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

  SD_Rotate = (event, angle) => {
    if (null == angle)
      return null;
    // var t = e.currentTarget.attributes.getNamedItem('angle'/*SDUI.Constants.Attr_RotationAngle*/).value;
    var t = angle;
    Commands.MainController.Shapes.RotateShapes(360 - t)
  }

  SD_Shape_Align = (e) => {
    if (null == e)
      return null;
    // var t = e.currentTarget.attributes.getNamedItem(SDUI.Constants.Attr_ShapeAlign).value;
    var t = e;
    Commands.MainController.Shapes.AlignShapes(t)
  }

  SD_Group = (e) => {
    Commands.MainController.Shapes.GroupSelectedShapes()
  }


  SD_Ungroup = (e) => {
    Commands.MainController.Shapes.UngroupSelectedShapes()
  }

  SD_Shape_Flip_Horizontal = (e) => {
    Commands.MainController.Shapes.FlipHorizontal()
  }

  SD_Shape_Flip_Vertical = (e) => {
    Commands.MainController.Shapes.FlipVertical()
  }

  SD_MakeSameSize = (e, samesizeoption) => {
    // if (null == e)
    //   return !1;
    // var t = e.currentTarget.attributes.getNamedItem(SDUI.Constants.Attr_SameSizeOption);
    var t = samesizeoption;
    Commands.MainController.Shapes.MakeSameSize(t)
  }

  SD_Shape_BringToFront = (e) => {
    Commands.MainController.Shapes.BringToFrontOf()
  }

  SD_Shape_SendToBack = (e) => {
    Commands.MainController.Shapes.SendToBackOf()
  }

  SD_Paste = (e) => {
    // Utils2.FlashUIControl(Resources.Controls.Ribbon_Home.Paste.Id);
    Commands.MainController.Shapes.Paste(!1)
  }

  SD_PasteRightClick = (e) => {
    // Utils2.FlashUIControl(Resources.Controls.Ribbon_Home.Paste.Id),
    Commands.MainController.Shapes.Paste(!0)
  }

  SD_Copy = (e) => {
    // Utils2.FlashUIControl(Resources.Controls.Ribbon_Home.Copy.Id),
    Commands.MainController.Shapes.Copy()
  }

  SD_Cut = (e) => {
    // Utils2.FlashUIControl(Resources.Controls.Ribbon_Home.Cut.Id),
    Commands.MainController.Shapes.Cut()
  }

  SD_Delete = (e) => {
    Commands.MainController.Shapes.DeleteSelectedObjects()
  }

  SD_Undo = (e) => {
    Commands.MainController.Shapes.Undo()
  }

  SD_Redo = (e) => {
    Commands.MainController.Shapes.Redo()
  }

  SD_CommitFilePickerSelection = (e) => {
    Commands.MainController.SaveAs()
  }

  SD_Duplicate = (e) => {
    Commands.MainController.Shapes.Duplicate()
  }

  SD_MeasureDistance = (e) => {
    T3Gv.gBusinessManager.AddMeasureLine(e)
  }

  SD_MeasureArea = (e) => {
    T3Gv.gBusinessManager.AddMeasureArea(e)
  }

  SD_ClickSymbol = (e) => {
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

  SD_DragDropSymbol = (e) => {
    // if (null == e) return !1;
    // var t = e.currentTarget.attributes.getNamedItem(SDUI.Constants.Attr_SymbolId);
    // null != t &&
    //   null != t.value &&
    //   SDUI.Commands.MainController.Shapes.DragDropSymbol(e, t.value)

    Commands.MainController.Shapes.DragDropSymbol(e, 't.value')
  }

}

export default Commands
