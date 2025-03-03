
import Base from "./Base"
import ListManager from '../../Data/ListManager'
import GlobalData from '../../Data/GlobalData'
import PolyLineContainer from '../../Shape/Shape.PolyLineContainer'
import Utils1 from "../../Helper/Utils1"
import Utils2 from '../../Helper/Utils2'
import Utils3 from '../../Helper/Utils3'
import Resources from '../../Data/Resources'
import Line from "../../Shape/Shape.Line"
import BaseLine from '../../Shape/Shape.BaseLine'
import ConstantData from '../../Data/ConstantData'
import HitResult from '../../Model/HitResult'
import ConstantData2 from '../../Data/ConstantData2'
import ArrowSizes from "../../Model/ArrowSizes"
import Instance from "../../Data/Instance/Instance"

class FloorPlan {


  GetLineRightClickMenuID(e) {
    return null;
  }

  AllowActionButtons(e) {
    return null;
  }

  ShapeSaveData(e, t) { }

}

export default FloorPlan

FloorPlan.prototype.GetToolList = function () {
  var e,
    t = [];
  return e = new Business.ToolItem('DocumentSetup', !1),
    t.push(e),
    e = new Business.ToolItem('AdjustWall', !0),
    t.push(e),
    e = new Business.ToolItem('DimensionsArea', !0),
    t.push(e),
    e = new Business.ToolItem('RecentSymbols', !1),
    t.push(e),
    t
}

FloorPlan.prototype.AddWall = function (e, t) {

  // debugger
  console.log('= FloorPlan AddWall e', e);
  console.log('= FloorPlan AddWall t', t);
  // debugger


  /*
      var a,
        r,
        i,
        n = GlobalData.objectStore.GetObject(GlobalData.optManager.theSEDSessionBlockID).Data;
      ConstantData.Defines.SED_MaxJSLineThick;
      ConstantData.DocumentContext.CurrentSelectionBusinessManager !== GlobalData.gFloorplanManager &&
        (
          n.def.wallThickness = ConstantData.DocumentContext.CurrentWallThickness
        );
      var o = Utils1.DeepCopy(n.def.style);
      r = GlobalData.optManager.GetDrawingScale(GlobalData.docHandler.rulerSettings);
      n.def.style.Line.Thickness;
      GlobalData.docHandler.rulerSettings.useInches ? n.def.wallThickness > 0 ? o.Line.Thickness = n.def.wallThickness : (a = 48, o.Line.Thickness = 8.33333 * a / r) : n.def.wallThickness > 0 ? o.Line.Thickness = n.def.wallThickness : (a = 50, o.Line.Thickness = 11.811023622047243 * a / r),
        o.Line.BThick = o.Line.Thickness / 2,
        o.Line.LinePattern = 0;
      var s = n.dimensions;
      s = Utils2.SetFlag(s, ConstantData.DimensionFlags.SED_DF_Area, !1),
        i = t ? Utils1.DeepCopy(t.Data.attributes) : {
          Frame: {
            x: 0,
            y: 0,
            width: 1,
            height: 1
          },
          StartPoint: {
            x: 0,
            y: 0
          },
          EndPoint: {
            x: 0,
            y: 0
          },
          StyleRecord: o,
          bOverrideDefaultStyleOnDraw: !0,
          TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
          TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
          TextDirection: !1,
          Dimensions: s,
          TextFlags: ConstantData.TextFlags.SED_TF_HorizText | ConstantData.TextFlags.SED_TF_None,
          objecttype: ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
        };
      var l = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1),
        S = Utils1.DeepCopy(l),
        c = new ListManager.Line(i);
      if (e) return c;
      GlobalData.optManager.DrawNewObject(c, !0),
        GlobalData.optManager.SetEditMode(ConstantData.EditState.EDIT),
        GlobalData.optManager.SelectObjects(S, !1, !1)


        */


  //Double e t  false null

  var a;




  var sedSession = GlobalData.objectStore.GetObject(GlobalData.optManager.theSEDSessionBlockID).Data;

  // ConstantData.Defines.SED_MaxJSLineThick;

  // if (ConstantData.DocumentContext.CurrentSelectionBusinessManager !== GlobalData.gFloorplanManager) {
  //   n.def.wallThickness = ConstantData.DocumentContext.CurrentWallThickness;
  // }

  // n.def.wallThickness = 0.33333;

  // debugger

  // n.def.wallThickness = -1;
  sedSession.def.wallThickness = 8.33325;

  var style = Utils1.DeepCopy(sedSession.def.style);
  var drwScale = GlobalData.optManager.GetDrawingScale(GlobalData.docHandler.rulerSettings);

  if (GlobalData.docHandler.rulerSettings.useInches) {
    if (sedSession.def.wallThickness > 0) {
      style.Line.Thickness = sedSession.def.wallThickness;
    } else {
      a = 48;
      style.Line.Thickness = 8.33333 * a / drwScale;
      // o.Line.Thickness = 0.33333 * a / r;
    }
  } else {
    if (sedSession.def.wallThickness > 0) {
      style.Line.Thickness = sedSession.def.wallThickness;
    } else {
      a = 50;
      style.Line.Thickness = 11.811023622047243 * a / drwScale;
      //o.Line.Thickness = 0.33333 * a / r;
    }
  }

  style.Line.BThick = style.Line.Thickness / 2;
  style.Line.LinePattern = 0;

  console.log('= FloorPlan AddWall o', style);

  var dimension = sedSession.dimensions;
  dimension = Utils2.SetFlag(dimension, ConstantData.DimensionFlags.SED_DF_Area, false);

  // i = t ? Utils1.DeepCopy(t.Data.attributes) : {
  //   Frame: { x: 0, y: 0, width: 1, height: 1 },
  //   StartPoint: { x: 0, y: 0 },
  //   EndPoint: { x: 0, y: 0 },
  //   StyleRecord: style,
  //   bOverrideDefaultStyleOnDraw: true,
  //   TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
  //   TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
  //   TextDirection: false,
  //   Dimensions: dimension,
  //   TextFlags: ConstantData.TextFlags.SED_TF_HorizText | ConstantData.TextFlags.SED_TF_None,
  //   objecttype: ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
  // };

  var lineParam = {
    Frame: { x: 0, y: 0, width: 1, height: 1 },
    StartPoint: { x: 0, y: 0 },
    EndPoint: { x: 0, y: 0 },
    StyleRecord: style,
    bOverrideDefaultStyleOnDraw: true,
    TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
    TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
    TextDirection: false,
    Dimensions: dimension,
    TextFlags: ConstantData.TextFlags.SED_TF_HorizText | ConstantData.TextFlags.SED_TF_None,
    objecttype: ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
  };

  var selectList = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, false);
  var currentSelectList = Utils1.DeepCopy(selectList);
  var line = new Line(lineParam);

  // if (e) return line;

  GlobalData.optManager.DrawNewObject(line, true);
  GlobalData.optManager.SetEditMode(ConstantData.EditState.EDIT);
  GlobalData.optManager.SelectObjects(currentSelectList, false, false);



}

FloorPlan.prototype.StartAddingWalls = function () {

  console.log('Business.FloorPlan.prototype.StartAddingWalls');
  this.IsAddingWalls() ||
    (
      GlobalData.optManager.CloseEdit(),
      this.ToggleAddingWalls(),
      this.AddWall()
    )
}

FloorPlan.prototype.StopAddingWalls = function (e) {
  var t = ConstantData2.ModalOperations;
  if (this.IsAddingWalls()) {
    this.ToggleAddingWalls(),
      (
        r = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1)
      ) &&
        r.length > 0 ? (
        GlobalData.optManager.ResetObjectDraw(),
        ConstantData.DocumentContext.SelectionToolSticky = !1,
        // GlobalData.optManager.UpdateTools(),
        GlobalData.gFloorplanManager.PostObjectDrawHook()
      ) : (
        GlobalData.optManager.CancelModalOperation(),
        e ||
        1 // (Collab.UnLockMessages(), Collab.UnBlockMessages())
      ),
      GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT);
    var a = [],
      r = [];
    (
      r = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1)
    ) &&
      r.length > 0 &&
      (a = Utils1.DeepCopy(r), GlobalData.optManager.SelectObjects(a))
  } else switch (GlobalData.optManager.currentModalOperation) {
    case t.ADDCORNER:
    case t.SPLITWALL:
      GlobalData.gFloorplanManager.AddCornerCancel();
      break;
    default:
      GlobalData.optManager.CancelModalOperation()
  }
}


FloorPlan.prototype.CancelObjectDraw = function () {
  this.StopAddingWalls()
}

FloorPlan.prototype.ToggleAddingWalls = function (e) {

  this.addingWalls = null != e ? e : !this.addingWalls
}

FloorPlan.prototype.IsAddingWalls = function () {
  return this.addingWalls
}

FloorPlan.prototype.AddNewPolyLine = function (e, t) {
  return e != ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ? null : new PolyLineContainer(t)
}

FloorPlan.prototype.AddCornerCancel = function () {
  GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
    GlobalData.optManager.CancelModalOperation(),
    GlobalData.optManager.ResetObjectDraw(),
    // GlobalData.optManager.UpdateTools(),
    GlobalData.gFloorplanManager.PostObjectDrawHook(),
    GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT)
}

FloorPlan.prototype.AddCorner = function (e) {
  try {
    var t,
      a,
      r;
    e.stopPropagation(),
      e.preventDefault(),
      e.gesture ? (
        t = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
        a = (
          r = GlobalData.optManager.svgObjectLayer.FindElementByDOMElement(e.currentTarget)
        ).GetID()
      ) : (
        t = Utils1.DeepCopy(GlobalData.optManager.RightClickParams.HitPt),
        a = GlobalData.optManager.RightClickParams.TargetID,
        r = GlobalData.optManager.svgObjectLayer.GetElementByID(a)
      );
    var i = GlobalData.optManager.GetObjectPtr(a, !0);
    return i &&
      i instanceof BaseDrawingObject &&
      i.AddCorner(r, t),
      GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
      GlobalData.optManager.CancelModalOperation(),
      GlobalData.optManager.ResetObjectDraw(),
      // GlobalData.optManager.UpdateTools(),
      GlobalData.gFloorplanManager.PostObjectDrawHook(),
      GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
      !1
  } catch (e) {
    GlobalData.optManager.ExceptionCleanup(e);
    throw e;
  }
}

FloorPlan.prototype.MoveOutline = function (e) {

  this.StopAddingWalls(),
    GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
    GlobalData.optManager.CancelModalOperation(),
    ConstantData.DocumentContext.PolyLineContainerMoveMode = !0,
    GlobalData.optManager.SetModalOperation(ConstantData2.ModalOperations.NONE)
}

FloorPlan.prototype.AddCornerStart = function (e) {

  this.StopAddingWalls(),
    GlobalData.optManager.CloseEdit(),
    GlobalData.optManager.CancelModalOperation(),
    GlobalData.optManager.SetEditMode(ConstantData.EditState.EDIT);
  for (var t = GlobalData.optManager.ActiveVisibleZList(), a = 0; a < t.length; a++) {
    var r = GlobalData.optManager.GetObjectPtr(t[a], !1);
    if (!(r.flags & ConstantData.ObjFlags.SEDO_Lock)) if (
      r.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
    ) GlobalData.optManager.svgObjectLayer.GetElementByID(t[a]).svgObj.SDGObj.GetEventProxy().on('dragstart', this.AddCorner)
  }
  GlobalData.optManager.SetModalOperation(ConstantData2.ModalOperations.ADDCORNER)
}

FloorPlan.prototype.PostObjectDrawHook = function (e) {
  console.log('Business.FloorPlan.prototype.PostObjectDrawHook e', e);

  this.addingWalls &&
    (
      //Double ===
      e === BaseLine.prototype.LM_DrawRelease ? this.AddWall() : this.StopAddingWalls()
    )
}

FloorPlan.prototype.NotifySetEditMode = function (e) {

  if (
    e === ConstantData.EditState.EDIT ||
    e === ConstantData.EditState.DEFAULT ||
    e === ConstantData.EditState.LINKCONNECT ||
    e === ConstantData.EditState.LINKJOIN
  ) return !1;
  this.addingWalls &&
    this.StopAddingWalls()
}

FloorPlan.prototype.AddMeasureLine = function () {
  // var e = GlobalData.objectStore.GetObject(GlobalData.optManager.theSEDSessionBlockID).Data,
  //   t = 0 == (e.def.textflags & ConstantData.TextFlags.SED_TF_HorizText),
  //   a = ConstantData.DimensionFlags.SED_DF_Always | e.dimensions;
  // a = Utils2.SetFlag(a, ConstantData.DimensionFlags.SED_DF_Standoff, !1),
  //   this.StopAddingWalls();
  // var r = Utils1.DeepCopy(e.def.style);
  // r.Line.Thickness = 1,
  //   r.Line.Paint.Color = '#000000',
  //   r.Line.Paint.EndColor = '#000000';
  // var i = {
  //   Frame: {
  //     x: 0,
  //     y: 0,
  //     width: 1,
  //     height: 1
  //   },
  //   StartPoint: {
  //     x: 0,
  //     y: 0
  //   },
  //   EndPoint: {
  //     x: 0,
  //     y: 0
  //   },
  //   StartArrowID: 32,
  //   EndArrowID: 32,
  //   StartArrowDisp: !1,
  //   EndArrowDisp: !1,
  //   ArrowSizeIndex: 0,
  //   StyleRecord: r,
  //   TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
  //   TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
  //   TextDirection: t,
  //   Dimensions: a,
  //   TextFlags: ConstantData.TextFlags.SED_TF_HorizText,
  //   ShortRef: ConstantData2.LineTypes.SED_LS_MeasuringTape,
  //   targflags: 0,
  //   hookflags: 0,
  //   bOverrideDefaultStyleOnDraw: !0
  // };
  // // GlobalData.optManager.arrowSizes();
  // new ArrowSizes();
  // i.ArrowSizeIndex = 1;
  // var n = new Line(i);
  // GlobalData.optManager.DrawNewObject(n, !1)







  var sessionData = GlobalData.objectStore.GetObject(GlobalData.optManager.theSEDSessionBlockID).Data;
  var isTextVertical = (sessionData.def.textflags & ConstantData.TextFlags.SED_TF_HorizText) === 0;
  var dimensions = ConstantData.DimensionFlags.SED_DF_Always | sessionData.dimensions;
  dimensions = Utils2.SetFlag(dimensions, ConstantData.DimensionFlags.SED_DF_Standoff, false);

  this.StopAddingWalls();

  var style = Utils1.DeepCopy(sessionData.def.style);
  style.Line.Thickness = 1;
  style.Line.Paint.Color = '#000000';
  style.Line.Paint.EndColor = '#000000';

  var lineParams = {
    Frame: { x: 0, y: 0, width: 1, height: 1 },
    StartPoint: { x: 0, y: 0 },
    EndPoint: { x: 0, y: 0 },
    StartArrowID: 32,
    EndArrowID: 32,
    StartArrowDisp: false,
    EndArrowDisp: false,
    ArrowSizeIndex: 1,
    StyleRecord: style,
    TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
    TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
    TextDirection: isTextVertical,
    Dimensions: dimensions,
    TextFlags: ConstantData.TextFlags.SED_TF_HorizText,
    ShortRef: ConstantData2.LineTypes.SED_LS_MeasuringTape,
    targflags: 0,
    hookflags: 0,
    bOverrideDefaultStyleOnDraw: true
  };

  var measureLine = new Line(lineParams);
  GlobalData.optManager.DrawNewObject(measureLine, false);





}

FloorPlan.prototype.AddMeasureArea = function () {
  var e = GlobalData.objectStore.GetObject(GlobalData.optManager.theSEDSessionBlockID).Data,
    t = 0 == (e.def.textflags & ConstantData.TextFlags.SED_TF_HorizText),
    a = Utils1.DeepCopy(e.def.style);
  this.StopAddingWalls();
  var r = {
    Frame: {
      x: 0,
      y: 0,
      width: 1,
      height: 1
    },
    StartPoint: {
      x: 0,
      y: 0
    },
    EndPoint: {
      x: 0,
      y: 0
    },
    StartArrowID: e.d_sarrow,
    StartArrowDisp: e.d_sarrowdisp,
    EndArrowID: e.d_earrow,
    EndArrowDisp: e.d_earrowdisp,
    ArrowSizeIndex: e.d_arrowsize,
    targflags: 0,
    TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
    TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
    TextDirection: t,
    Dimensions: ConstantData.DimensionFlags.SED_DF_Always | ConstantData.DimensionFlags.SED_DF_Area,
    TextFlags: ConstantData.TextFlags.SED_TF_HorizText,
    StyleRecord: a,
    bOverrideDefaultStyleOnDraw: !0,
    dataclass: ConstantData.SDRShapeTypes.SED_S_MeasureArea
  };
  r.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID,
    r.StyleRecord.Fill.Paint.Color = '#FF0000',
    r.StyleRecord.Fill.Paint.EndColor = '#FF0000',
    r.StyleRecord.Fill.FillEffect = 0,
    r.StyleRecord.OutsideEffect.OutsideType = 0,
    r.StyleRecord.Border.Thickness = 1,
    r.StyleRecord.Border.LinePattern = Resources.LinePatternData[Resources.Windows_LinePatterns.SEP_Dotted],
    r.StyleRecord.Fill.Paint.Opacity = 0.4,
    r.StyleRecord.Fill.Paint.EndOpacity = 0.4;
  var i = new Instance.Shape.Rect(r);
  GlobalData.optManager.DrawNewObject(i, !1)
}

FloorPlan.prototype.AlwaysShowLayers = function () {
  return !0
}

FloorPlan.prototype.AddWallOpening = function (e) {

  'click' == e.type &&
    (
      this.StopAddingWalls(),
      GlobalData.optManager.CloseEdit(),
      e.preventDefault &&
      e.preventDefault(),
      SDUI.Commands.MainController.Shapes.SD_PreLoad_Symbol(
        ConstantData.Defines.Floorplan_WallOpeningID,
        !0,
        SDUI.Commands.MainController.Shapes.ForceStampSymbol,
        !0
      )
    )
}

FloorPlan.prototype.SplitWall = function (e) {
  try {
    var t = {};
    e.stopPropagation(),
      e.preventDefault();
    var a = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
      r = GlobalData.optManager.svgObjectLayer.FindElementByDOMElement(e.currentTarget),
      i = GlobalData.optManager.GetObjectPtr(r.GetID(), !1);
    return i &&
      i.Hit(a, !1, !1, t),
      i instanceof PolyLine &&
      (
        i.polylist.closed &&
        (
          Collab.BeginSecondaryEdit(),
          GlobalData.optManager.GetObjectPtr(i.BlockID, !0),
          i.MaintainDimensionThroughPolygonOpennessChange(!1)
        ),
        GlobalData.optManager.PolyLSplit(i.BlockID, t.segment),
        GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT)
      ),
      GlobalData.optManager.CancelModalOperation(),
      GlobalData.optManager.PostObjectDraw(),
      !1
  } catch (e) {
    GlobalData.optManager.ExceptionCleanup(e);
    throw e;
  }
}

FloorPlan.prototype.SplitWallStart = function (e) {

  this.StopAddingWalls(),
    GlobalData.optManager.CloseEdit(),
    GlobalData.optManager.CancelModalOperation(),
    GlobalData.optManager.SetEditMode(
      ConstantData.EditState.EDIT,
      ConstantData.CursorType.ALIAS
    );
  for (var t = GlobalData.optManager.ActiveVisibleZList(), a = 0; a < t.length; a++) {
    var r = GlobalData.optManager.GetObjectPtr(t[a], !1);
    if (!(r.flags & ConstantData.ObjFlags.SEDO_Lock)) if (
      r.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
    ) GlobalData.optManager.svgObjectLayer.GetElementByID(t[a]).svgObj.SDGObj.GetEventProxy().on('dragstart', this.SplitWall)
  }
  GlobalData.optManager.SetModalOperation(ConstantData2.ModalOperations.SPLITWALL)
}

FloorPlan.prototype.EnsureCubicleBehindOutline = function (e) {

  var t,
    a,
    r = GlobalData.optManager.ActiveVisibleZList(),
    i = null;
  function n(e, t) {
    var a,
      r = t.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
      i = !1;
    for (a = 0; a < r.length; a++) {
      var n = new HitResult(- 1, 0, null);
      if (
        n.hitcode = e.Hit(r[a], !1, !0, n),
        n &&
        n.hitcode === ConstantData.HitCodes.SED_Border
      ) {
        i = !0;
        break
      }
    }
    if (!i) return !1;
    var o,
      s,
      l = Utils2.IntersectRect(e.Frame, t.Frame);
    return !!l &&
      (
        o = l,
        s = t.Frame,
        !(
          Math.abs(o.x - s.x) > 0.0001 ||
          Math.abs(o.y - s.y) > 0.0001 ||
          Math.abs(o.width - s.width) > 0.0001 ||
          Math.abs(o.height - s.height) > 0.0001
        )
      )
  }
  if (
    (t = GlobalData.optManager.GetObjectPtr(e, !1)) instanceof PolyLineContainer
  ) for (a = 0; a < r.length; a++) if (
    e !== r[a] &&
    (i = GlobalData.optManager.GetObjectPtr(r[a], !1)) instanceof PolyLineContainer &&
    n(i, t)
  ) {
    var o = r.indexOf(t.BlockID);
    if (o < 0) return;
    if (o < a) return;
    return void GlobalData.optManager.PutBehindObject(i.BlockID, t.BlockID)
  }
}

FloorPlan.prototype.AllowAutoInsert = function () {
  return !1
}

FloorPlan.prototype.GetAutomationContext = function () {
  return Resources.Contexts.FloorPlan
}
