

import GlobalData from '../../Data/T3Gv'
import Utils1 from '../../Helper/Utils1'
import Utils3 from '../../Helper/Utils3'
import Utils2 from '../../Helper/Utils2'
import Utils4 from '../../Helper/Utils4'
import ListManager from '../../Data/ListManager'
import Resources from '../../Data/Resources'
import FileParser from '../../Data/FileParser'
// import RRect from '../../Shape/Shape.RRect'
// import Oval from '../../Shape/Shape.Oval'
import Line from '../../Shape/S.Line'
import Rect from '../../Shape/S.Rect'

import $ from 'jquery'
import Polygon from '../../Shape/S.Polygon'
// import Commands from './ToolOpt'
import Commands from './Commands'
import RRect from '../../Shape/S.RRect'
import Oval from '../../Shape/S.Oval'
// import Collab from '../../Data/Collab'
import Clipboard from './Clipboard'
import ConstantData from '../../Data/ConstantData'

import PolySeg from '../../Model/PolySeg'
import Hook from '../../Model/Hook'
import RightClickData from '../../Model/RightClickData'
import ConstantData2 from '../../Data/ConstantData2'
import SVGFragmentSymbol from '../../Shape/S.SVGFragmentSymbol'
import QuickStyle from '../../Model/QuickStyle'
import Instance from '../../Data/Instance/Instance'
import PolyList from '../../Model/PolyList'


class ShapeController {


  CancelModalOperation = function (e) {
    Commands.MainController.Selection.SetSelectionTool(Resources.Tools.Tool_Select, false);
    T3Gv.optManager.CancelModalOperation();
    if (!e) {
      // Collab.UnLockMessages();
      // Collab.UnBlockMessages();
    }
    return false;
  }


  SetDefaultWallThickness = function (e, t) {
    console.log('SetDefaultWallThickness 1e =', e);
    console.log('SetDefaultWallThickness 1t =', t);
    // debugger


    /*
          var a = 1;
        GlobalData  gDocumentHandler.rulerSettings.useInches ||
            (a = ConstantData.Defines.MetricConv),
            t &&
            (e = t.Data.thick);
          var r = e * T3Gv.docHandler.rulerSettings.major / (T3Gv.docHandler.rulerSettings.majorScale * a);
          Collab.AllowMessage() &&
            Collab.BeginSecondaryEdit();
          var i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !1);
          if (!Utils2.IsEqual(i.def.wallThickness, r, 0.01) || t) {
            if (
              T3Gv.optManager.CloseEdit(!0, !0),
              i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !0),
              t ||
              (i.def.wallThickness = r),
              Collab.AllowMessage()
            ) {
              var n = {
                thick: e
              };
              Collab.BuildMessage(
                ConstantData.CollabMessages.SetDefaultWallThickness,
                n,
                !1,
                !1
              )
            }
            T3Gv.optManager.CompleteOperation(null)
          }
          */



    var conversionFactor = 1;
    if (!T3Gv.docHandler.rulerSettings.useInches) {
      conversionFactor = ConstantData.Defines.MetricConv;
    }
    if (t) {
      e = t.Data.thick;
    }


    var wallThickness = e * T3Gv.docHandler.rulerSettings.major / (T3Gv.docHandler.rulerSettings.majorScale * conversionFactor);

    // if (Collab.AllowMessage()) {
    //   Collab.BeginSecondaryEdit();
    // }

    var sessionBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, false);

    if (!Utils2.IsEqual(sessionBlock.def.wallThickness, wallThickness, 0.01) || t) {
      T3Gv.optManager.CloseEdit(true, true);
      sessionBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, true);

      if (!t) {
        sessionBlock.def.wallThickness = wallThickness;
      }

      // if (Collab.AllowMessage()) {
      //   var message = {
      //     thick: e
      //   };
      //   Collab.BuildMessage(ConstantData.CollabMessages.SetDefaultWallThickness, message, false, false);
      // }

      var sessionBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, false);


      T3Gv.optManager.CompleteOperation(null);
    }

  }


  DrawNewWallShape = function (e, t) {
    console.log('= ShapeController DrawNewWallShape e,t=>', e, t);
    console.log('= ShapeController DrawNewWallShape gBusinessManager=>', T3Gv.gBusinessManager)
    // debugger
    var a;
    var r = t != null;
    var i = null;//Double ===  Business.GetSelectionBusinessManager();

    if (i == null) {
      i = T3Gv.gBusinessManager;
    }

    if (i && i.AddWall) {
      T3Gv.optManager.CloseEdit();
      i.ToggleAddingWalls(true);
      a = i.AddWall(r, t);
      ConstantData.DocumentContext.UsingWallTool = true;
    }

    if (r) {
      console.log('= ShapeController DrawNewWallShape a=>', a);
      return a;
    }
  }



  StampOrDragDropNewShape = function (t, a) {
    console.log('StampOrDragDropNewShape', t, a);
    var r, i;
    T3Gv.optManager.SetUIAdaptation(t);

    // if (ConstantData.DocumentContext.HTMLFocusControl && ConstantData.DocumentContext.HTMLFocusControl.blur) {
    //   ConstantData.DocumentContext.HTMLFocusControl.blur();
    // }

    // if (a) {
    //   ConstantData.DocumentContext.ShapeTool = a;
    // } else {
    //   a = ConstantData.DocumentContext.ShapeTool;
    // }

    // if (gListManager.isMobilePlatform) {
    //   if (t.type === "pointerdown") {
    //     e = false;
    //     gListManager.PreDragDropOrStamp();
    //     r = this;
    //     i = this.StampOrDragDropMobileCallback;
    //     gListManager.stampTimeout = window.setTimeout(i, 200, r, a);
    //   } else if (t.type === "pointerup") {
    //     e = true;
    //   }
    // } else {
    // if (t.type === "mousedown" || t.type === "pointerdown" || t.type === "touchstart") {
    //   if (t.preventDefault) {
    //     t.preventDefault();
    //   }
    //   e = false;
    //   T3Gv.optManager.PreDragDropOrStamp();
    //   r = this;
    //   i = this.StampOrDragDropCallback;
    //   T3Gv.optManager.stampTimeout = window.setTimeout(i, 200, r, a);
    // } else if (t.type === "mouseup" || t.type === "pointerup" || t.type === "touchend") {
    //   e = true;
    // }  // }






    var e = false;
    T3Gv.optManager.PreDragDropOrStamp();
    r = this;
    i = this.StampOrDragDropCallback;
    T3Gv.optManager.stampTimeout = window.setTimeout(i, 200, r, a);


  }


  DrawNewLineShape = function (e, t, a, r) {

    // Double start to draw line
    console.log(' => ============DrawNewLineShape 1 e, t, a, r=>', e, t, a, r);

    /*
    var i = !1,
      n = null;
    switch (
    null == r ? (
      e ? ConstantData.DocumentContext.LineTool = e : e = ConstantData.DocumentContext.LineTool,
      T3Gv.optManager.forcedotted = t ? Resources.LinePatternData[Resources.Windows_LinePatterns.SEP_Dotted - 1] : null
    ) : i = !0,
    e
    ) {
      case 'line':
        n = this.DrawNewLine(a, 0, i, r);
        break;
      case 'commline':
        n = this.DrawNewLine(a, 1, i, r);
        break;
      case 'digiline':
        n = this.DrawNewLine(a, 2, i, r);
        break;
      case 'arcLine':
        n = this.DrawNewArcLine(i, a, r);
        break;
      case 'segLine':
        n = this.DrawNewSegLine(i, a, r);
        break;
      case 'arcSegLine':
        n = this.DrawNewArcSegLine(i, a, r);
        break;
      case 'polyLine':
        n = this.DrawNewPolyLine(i, a, r);
        break;
      case 'polyLineContainer':
        n = this.DrawNewPolyLineContainer(i, a, r);
        break;
      case 'freehandLine':
        n = this.DrawNewFreehandLine(i, a, r);
        break;
      case 'moveWall':
        T3Gv.gBusinessManager &&
          T3Gv.gBusinessManager.AddWall ? n = T3Gv.gBusinessManager.AddWall(i, r) : (
          ConstantData.DocumentContext.LineTool = 'line',
          n = this.DrawNewLine(a, 0, i, r)
        )
    }
    if (i) return n
    */





    let isDrawing = false;
    let newShape = null;

    // if (r == null) {
    //   if (e) {
    //     ConstantData.DocumentContext.LineTool = e;
    //   } else {
    //     e = ConstantData.DocumentContext.LineTool;
    //   }
    //   T3Gv.optManager.forcedotted = t ? Resources.LinePatternData[Resources.Windows_LinePatterns.SEP_Dotted - 1] : null;
    // } else {
    //   isDrawing = true;
    // }

    // debugger;

    // Resources.LineToolTypes = {
    //   StraightLine: 'line',
    //   ArcLine: 'arcLine',
    //   ArcSegmentedLine: 'arcSegLine',
    //   SegmentedLine: 'segLine',
    //   PolyLine: 'polyLine',
    //   PolyLineContainer: 'polyLineContainer',
    //   MoveWall: 'moveWall',
    //   CommLine: 'commline',
    //   DigiLine: 'digiline',
    //   FreehandLine: 'freehandLine'
    // }

    // LineTool:Resources.LineToolTypes.StraightLine

    // Double set e default type to line

    e = "line";
    // e = type;

    switch (e) {
      case 'line':
        newShape = this.DrawNewLine(a, 0, isDrawing, r);
        break;
      case 'commline':
        newShape = this.DrawNewLine(a, 1, isDrawing, r);
        break;
      case 'digiline':
        newShape = this.DrawNewLine(a, 2, isDrawing, r);
        break;
      case 'arcLine':
        newShape = this.DrawNewArcLine(isDrawing, a, r);
        break;
      case 'segLine':
        newShape = this.DrawNewSegLine(isDrawing, a, r);
        break;
      case 'arcSegLine':
        newShape = this.DrawNewArcSegLine(isDrawing, a, r);
        break;
      case 'polyLine':
        newShape = this.DrawNewPolyLine(isDrawing, a, r);
        break;
      case 'polyLineContainer':
        newShape = this.DrawNewPolyLineContainer(isDrawing, a, r);
        break;
      case 'freehandLine':
        newShape = this.DrawNewFreehandLine(isDrawing, a, r);
        break;
      case 'moveWall':
        if (T3Gv.gBusinessManager && T3Gv.gBusinessManager.AddWall) {
          newShape = T3Gv.gBusinessManager.AddWall(isDrawing, r);
        } else {
          // ConstantData.DocumentContext.LineTool = 'line';
          newShape = this.DrawNewLine(a, 0, isDrawing, r);
        }
        break;
    }

    if (isDrawing) {
      return newShape;
    }
  }


  DrawNewLine = function (e, t, a, r) {
    console.log(' => ============DrawNewLineShape 2 e, t, a, r=>', e, t, a, r);

    var i = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data,
      n = 0 == (i.def.textflags & ConstantData.TextFlags.SED_TF_HorizText),
      o = i.d_sarrow,
      s = i.d_earrow,
      l = i.d_sarrowdisp,
      S = i.d_earrowdisp,
      c = 0;
    switch (t) {
      case ConstantData2.LineTypes.SED_LS_Comm:
      case ConstantData2.LineTypes.SED_LS_Digi:
        c = 0.25
    }
    if (o > 0 != s > 0 && (0 === s && (s = o, S = l), o = 0, l = !1), r) u = Utils1.DeepCopy(r.Data.attributes);
    else var u = {
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
      StartArrowID: o,
      StartArrowDisp: l,
      EndArrowID: s,
      EndArrowDisp: S,
      ArrowSizeIndex: i.d_arrowsize,
      TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
      TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
      TextDirection: n,
      Dimensions: i.dimensions,
      ShortRef: t,
      shapeparam: c,
      bOverrideDefaultStyleOnDraw: !0
    };
    var p = new Line(u),
      d = Utils1.DeepCopy(i.def.style);
    if (r && r.Data && r.Data.attributes && r.Data.attributes.StyleRecord) d = Utils1.DeepCopy(r.Data.attributes.StyleRecord);
    else {
      var D = Utils4.FindStyle(ConstantData.Defines.TextBlockStyle);
      d.Text.Paint.Color = '#000000'//Double D.Text.Paint.Color
    }
    if (
      p.StyleRecord = d,
      i.flags & ConstantData.SessionFlags.SEDS_AllowHops &&
      (
        p.flags = Utils2.SetFlag(p.flags, ConstantData.ObjFlags.SEDO_LineHop, !0)
      ),
      a
    ) return p;
    T3Gv.optManager.DrawNewObject(p, e)
  }


  StampOrDragDropCallback = function (t, a) {
    console.log('StampOrDragDropCallback 1 t=', t);
    console.log('StampOrDragDropCallback 2 a=', a);
    //debugger
    var r;
    var i = ConstantData.SDRShapeTypes;

    T3Gv.optManager.stampTimeout = null;
    // SDUI.Commands.MainController.Dropdowns.HideAllDropdowns(),
    if (a !== 'textLabel') {
      ConstantData.DocumentContext.ShapeTool = a;
    }

    //Double ===
    var e = false;

    if (e) {
      r = false;
      T3Gv.optManager.UnbindDragDropOrStamp();
    } else {
      r = true;
    }

    switch (a) {
      case 'textLabel':
        t.StampTextLabel(false, false);
        break;
      case i.SED_S_Rect:
        t.StampRectangle(r, false);
        break;
      case i.SED_S_RRect:
        t.StampRoundRect(r, false);
        break;
      case i.SED_S_Circ:
        t.StampCircle(r, true);
        break;
      case i.SED_S_Oval:
        t.StampCircle(r, false);
        break;
      default:
        t.StampShape(a, r, false);
    }
  }


  StampRectangle = function (e, t) {
    console.log('StampRectangle 1 e=', e)
    console.log('StampRectangle 2 t=', t)
    var a,
      r,
      i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !1);
    t ? (
      a = ConstantData.Defines.Shape_Square,//ListManager.Model.ts 100
      r = ConstantData.Defines.Shape_Square//ListManager.Model.ts 100
    ) : (
      a = ConstantData.Defines.Shape_Width,//ListManager.Model.ts 150
      r = ConstantData.Defines.Shape_Height//ListManager.Model.ts 150
    );
    var n = {
      Frame: {
        x: - 1000,
        y: - 1000,
        width: a,
        height: r
      },
      TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL,// ListManager.Model.ts 0
      shapeparam: i.def.rrectparam,
      moreflags: ConstantData.ObjMoreFlags.SED_MF_FixedRR// ListManager.Model.ts 64
    };
    t &&
      (n.ObjGrow = ConstantData.GrowBehavior.PROPORTIONAL); //3
    var o = new Rect(n);
    console.log('StampRectangle 3 o=', o)
    // e ? T3Gv.optManager.DragDropNewShape(o, !0, !0, !0, null, null) :
    //  T3Gv.optManager.MouseStampNewShape(o, !0, !0, !0, null, null)

    T3Gv.optManager.MouseStampNewShape(o, !0, !0, !0, null, null)
  }

  StampRoundRect = function (e, t) {
    var a,
      r,
      i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !1);
    t ? (
      a = ConstantData.Defines.Shape_Square,
      r = ConstantData.Defines.Shape_Square
    ) : (
      a = ConstantData.Defines.Shape_Width,
      r = ConstantData.Defines.Shape_Height
    );
    var n = {
      Frame: {
        x: - 1000,
        y: - 1000,
        width: a,
        height: r
      },
      TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL,
      shapeparam: i.def.rrectparam,
      moreflags: ConstantData.ObjMoreFlags.SED_MF_FixedRR
    };
    t &&
      (n.ObjGrow = ConstantData.GrowBehavior.PROPORTIONAL);
    var o = new RRect(n);
    // e ? T3Gv.optManager.DragDropNewShape(o, !0, !0, !0, null, null) :
    //  T3Gv.optManager.MouseStampNewShape(o, !0, !0, !0, null, null)

    T3Gv.optManager.MouseStampNewShape(o, !0, !0, !0, null, null)
  }

  StampCircle = function (e, t) {
    //debugger
    var a,
      r;
    t ? (
      a = ConstantData.Defines.Shape_Square,
      r = ConstantData.Defines.Shape_Square
    ) : (
      a = ConstantData.Defines.Shape_Width,
      r = ConstantData.Defines.Shape_Height
    );
    var i = - 1000,
      n = - 1000,
      o = null;
    if (t) {
      o = {
        Frame: {
          x: i,
          y: n,
          width: 100,
          height: 100
        },
        TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL,
        ObjGrow: ConstantData.GrowBehavior.PROPORTIONAL
      }
    } else o = {
      Frame: {
        x: i,
        y: n,
        width: a,
        height: r
      },
      TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL
    };
    var s = new Oval(o);

    //  debugger
    // e ? T3Gv.optManager.DragDropNewShape(s, !0, !0, !0, null, null) :
    // T3Gv.optManager.MouseStampNewShape(s, !0, !0, !0, null, null)

    T3Gv.optManager.MouseStampNewShape(s, !0, !0, !0, null, null)
  }


  StampTextLabel = function (e, t) {
    // Commands.MainController.Selection.SetSelectionTool(Resources.Tools.Tool_Text, e);
    var a = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.tedSessionBlockId, !1);
    if (t || - 1 == a.theActiveTextEditObjectID) {
      if (!t) {
        var r = T3Gv.optManager.GetTargetSelect();
        if (r >= 0) {
          var i = T3Gv.optManager.GetObjectPtr(r, !1);
          if (i && i.AllowTextEdit()) {
            var n = T3Gv.optManager.svgObjectLayer.GetElementByID(r);
            return T3Gv.optManager.ActivateTextEdit(n)
            // ,
            //   void T3Gv.optManager.UpdateTools()
          }
        }
      }
    } else T3Gv.optManager.DeactivateTextEdit();
    var o = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data,
      s = Utils4.FindStyle(ConstantData.Defines.TextBlockStyle);
    null == s &&
      (s = o.def.style);
    var l = {
      StyleRecord: $.extend(!0, {
      }, s),
      Frame: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      TMargins: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
      TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
      TextAlign: ConstantData.TextAlign.LEFT,
      flags: ConstantData.ObjFlags.SEDO_TextOnly
    };
    null == l.StyleRecord.Line &&
      (l.StyleRecord.Line = Utils1.DeepCopy(s.Border)),
      l.StyleRecord.Line.Thickness = 0;
    var S = new Rect(l),
      c = Utils1.DeepCopy(o.def.style);
    c.Text.Paint = Utils1.DeepCopy(s.Text.Paint),
      S.StyleRecord.Text = c.Text;
    var u = T3Gv.optManager.CalcDefaultInitialTextStyle(S.StyleRecord.Text),
      p = T3Gv.optManager.svgDoc.CalcStyleMetrics(u);
    T3Gv.optManager.stampShapeOffsetX = 0,
      T3Gv.optManager.stampShapeOffsetY = p.ascent,
      S.Frame.height = p.height,
      e ||
      T3Gv.optManager.DeactivateTextEdit(!1),
      T3Gv.optManager.StampNewTextShapeOnTap(S, !1, !1, !1, e, this.StampCallback, {
        bActivateText: !0
      })
  }

  // StampOrDragDropNewShape = function (t, a) {
  //   console.log('StampOrDragDropNewShape 1 t=', t)
  //   console.log('StampOrDragDropNewShape 2 a=', a)


  //   /*
  //   var r,
  //     i;
  //   if (
  //     T3Gv.optManager.SetUIAdaptation(t),

  //     // Resources.ts
  //     ConstantData.DocumentContext.HTMLFocusControl &&
  //     ConstantData.DocumentContext.HTMLFocusControl.blur &&
  //     ConstantData.DocumentContext.HTMLFocusControl.blur(),
  //     a ? ConstantData.DocumentContext.ShapeTool = a : a = ConstantData.DocumentContext.ShapeTool,
  //     T3Gv.optManager.isMobilePlatform
  //   ) {
  //     if (
  //       'pointerdown' == t.type &&
  //       (
  //         e = !1,
  //         T3Gv.optManager.PreDragDropOrStamp(),
  //         r = this,
  //         i = this.StampOrDragDropMobileCallback,
  //         T3Gv.optManager.stampTimeout = window.setTimeout(i, 200, r, a)
  //       ),
  //       'pointerup' == t.type
  //     ) return void (e = !0)
  //   } else if (
  //     'mousedown' != t.type &&
  //     'pointerdown' != t.type &&
  //     'touchstart' != t.type ||
  //     (
  //       t.preventDefault &&
  //       t.preventDefault(),
  //       e = !1,
  //       T3Gv.optManager.PreDragDropOrStamp(),
  //       r = this,
  //       i = this.StampOrDragDropCallback,
  //       T3Gv.optManager.stampTimeout = window.setTimeout(i, 200, r, a)
  //     ),
  //     'mouseup' == t.type ||
  //     'pointerup' == t.type ||
  //     'touchend' == t.type
  //   ) return void (e = !0)
  //    */


  //   // debugger;
  //   // var r, i;
  //   // if (T3Gv.optManager.SetUIAdaptation(t),
  //   //   ConstantData.DocumentContext.HTMLFocusControl &&
  //   //   ConstantData.DocumentContext.HTMLFocusControl.blur &&
  //   //   ConstantData.DocumentContext.HTMLFocusControl.blur(),
  //   //   a ? ConstantData.DocumentContext.ShapeTool = a : a = ConstantData.DocumentContext.ShapeTool,
  //   //   T3Gv.optManager.isMobilePlatform) {
  //   //   if (t.type === 'pointerdown') {
  //   //     e = !1;
  //   //     T3Gv.optManager.PreDragDropOrStamp();
  //   //     r = this;
  //   //     i = this.StampOrDragDropMobileCallback;
  //   //     T3Gv.optManager.stampTimeout = window.setTimeout(i, 200, r, a);
  //   //   } else if (t.type === 'pointerup') {
  //   //     e = !0;
  //   //   }
  //   //   // Double ===
  //   // } else if (t.type === "click" || t.type === 'mousedown' || t.type === 'pointerdown' || t.type === 'touchstart') {
  //   //   t.preventDefault && t.preventDefault();
  //   //   e = !1;
  //   //   T3Gv.optManager.PreDragDropOrStamp();
  //   //   r = this;
  //   //   i = this.StampOrDragDropCallback;
  //   //   T3Gv.optManager.stampTimeout = window.setTimeout(i, 200, r, a);
  //   // } else if (t.type === 'mouseup' || t.type === 'pointerup' || t.type === 'touchend') {
  //   //   e = !0;
  //   // }














  //   var r, i;
  //   if (T3Gv.optManager.SetUIAdaptation(t),
  //     ConstantData.DocumentContext.HTMLFocusControl &&
  //     ConstantData.DocumentContext.HTMLFocusControl.blur &&
  //     ConstantData.DocumentContext.HTMLFocusControl.blur(),
  //     a ? ConstantData.DocumentContext.ShapeTool = a : a = ConstantData.DocumentContext.ShapeTool,
  //     T3Gv.optManager.isMobilePlatform) {
  //     if (t.type === 'pointerdown') {
  //       e = false;
  //       T3Gv.optManager.PreDragDropOrStamp();
  //       r = this;
  //       i = this.StampOrDragDropMobileCallback;
  //       T3Gv.optManager.stampTimeout = window.setTimeout(i, 200, r, a);
  //     } else if (t.type === 'pointerup') {
  //       e = true;
  //     }
  //   } else if (t.type === "click" || t.type === 'mousedown' || t.type === 'pointerdown' || t.type === 'touchstart') {
  //     t.preventDefault && t.preventDefault();
  //     e = false;
  //     T3Gv.optManager.PreDragDropOrStamp();
  //     r = this;
  //     i = this.StampOrDragDropCallback;
  //     T3Gv.optManager.stampTimeout = window.setTimeout(i, 200, r, a);
  //   } else if (t.type === 'mouseup' || t.type === 'pointerup' || t.type === 'touchend') {
  //     e = true;
  //   }


  // }



  StampShape = function (e, t) {
    var a,
      r = ConstantData.SDRShapeTypes,
      i = {
        x: - 1000,
        y: - 1000,
        width: ConstantData.Defines.Shape_Width,
        height: ConstantData.Defines.Shape_Height
      },
      n = T3Gv.optManager.GetShapeParams(e, i);

    console.log('StampShape====== n>', n);
    n.bIsSquare ? (
      ConstantData.Defines.Shape_Square,
      ConstantData.Defines.Shape_Square
    ) : (
      ConstantData.Defines.Shape_Width,
      ConstantData.Defines.Shape_Height
    );
    var o = {
      Frame: i,
      TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL,
      dataclass: n.dataclass,
      shapeparam: n.shapeparam
    };
    switch (
    n.bIsSquare &&
    (o.ObjGrow = ConstantData.GrowBehavior.PROPORTIONAL),
    n.dataclass
    ) {
      case r.SED_S_Rect:
        // a = new ListManager.Rect(o);
        a = new Rect(o);
        break;
      case r.SED_S_RRect:
        // a = new ListManager.RRect(o);
        a = new RRect(o);
        break;
      case r.SED_S_Oval:
        // a = new ListManager.Oval(o);
        a = new Oval(o);
        break;
      default:
        var s = n.polyVectorMethod(i, n.shapeparam);
        o.VertexArray = s,
          // (a = new ListManager.Polygon(o)).dataclass = n.dataclass
          (a = new Polygon(o)).dataclass = n.dataclass
    }
    // t ? T3Gv.optManager.DragDropNewShape(a, !0, !0, !0, null, null) :
    // T3Gv.optManager.MouseStampNewShape(a, !0, !0, !0, null, null)
    T3Gv.optManager.MouseStampNewShape(a, !0, !0, !0, null, null)

  }


  RotateShapes = function (e) {
    try {
      T3Gv.optManager.CloseEdit(),
        T3Gv.optManager.RotateShapes(parseInt(e, 10))
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
      throw e;
    }
  }

  AlignShapes = function (e) {
    try {
      T3Gv.optManager.CloseEdit(),
        T3Gv.optManager.AlignShapes(e)
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  DeleteSelectedObjects = function () {
    try {
      T3Gv.optManager.CloseEdit(),
        T3Gv.optManager.DeleteSelectedObjects()
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  Undo = function () {

    /*
    try {
      if (Collab.AllowMessage())
        if (Collab.IsSecondary()) {
          if (!Collab.AllowUndo())
            return !1;
          Collab.BuildMessage(ConstantData.CollabMessages.Undo, null, !1)
        } else
          T3Gv.optManager.Undo() && Collab.BuildMessage(ConstantData.CollabMessages.Undo, null, !1);
      else
        T3Gv.optManager.Undo()
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
      */

    try {
      T3Gv.optManager.Undo()
    }
    catch (e) {
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  Redo = function () {
    // try {
    //   if (Collab.AllowMessage()) if (Collab.IsSecondary()) {
    //     if (!Collab.AllowRedo()) return !1;
    //     Collab.BuildMessage(ConstantData.CollabMessages.Redo, null, !1)
    //   } else T3Gv.optManager.Redo() &&
    //     Collab.BuildMessage(ConstantData.CollabMessages.Redo, null, !1);
    //   else T3Gv.optManager.Redo()
    // } catch (e) {
    //   T3Gv.optManager.ExceptionCleanup(e);
    //   throw e;
    // }
    T3Gv.optManager.Redo()
  }


  Copy = function () {

    // T3Gv.optManager.CopyObjects();
    // return;

    try {
      var e = !1;
      try {
        e = document.execCommand('copy')
      } catch (e) {
        throw e
      }
      e ||
        T3Gv.optManager.CopyObjects()
    } catch (e) {

      T3Gv.optManager.RestorePrimaryStateManager();
      T3Gv.optManager.ExceptionCleanup(e);
      throw e
    }
  }


  Cut = function () {

    // T3Gv.optManager.CutObjects()
    // return;

    // debugger

    try {
      var e = !1;
      try {
        e = document.execCommand('cut')
      } catch (e) {
        throw e
      }
      e ||
        T3Gv.optManager.CutObjects()
    } catch (e) {
      throw e
      T3Gv.optManager.RestorePrimaryStateManager(),
        T3Gv.optManager.ExceptionCleanup(e)
    }
  }


  Paste = function (e) {
    /*
    try {
      T3Gv.optManager.PastePoint = null,
        e &&
        T3Gv.optManagerrightClickParams &&
        (T3Gv.optManager.PastePoint = T3Gv.optManagerrightClickParams.HitPt),
        Clipboard.PasteFromUIaction()
    } catch (e) {
      throw e
      T3Gv.optManager.ExceptionCleanup(e)
    }
    */

    // debugger

    try {
      T3Gv.optManager.PastePoint = null;
      if (e && T3Gv.optManagerrightClickParams) {
        T3Gv.optManager.PastePoint = T3Gv.optManagerrightClickParams.HitPt;
      }
      Clipboard.PasteFromUIaction();
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }


  }


  SendToBackOf = function () {
    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.SendToBackOf();
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e);
      throw e
    }
  }

  BringToFrontOf = function () {
    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.BringToFrontOf();
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e);
      throw e
    }
  }


  GroupSelectedShapes = function () {
    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.GroupSelectedShapes(!1, null, !1, !1, !0);
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  UngroupSelectedShapes = function () {
    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.UngroupSelectedShapes();
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  FlipHorizontal = function () {
    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.FlipShapes(ConstantData.ExtraFlags.SEDE_FlipHoriz);
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  FlipVertical = function () {
    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.FlipShapes(ConstantData.ExtraFlags.SEDE_FlipVert);
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  MakeSameSize = function (e) {
    try {
      T3Gv.optManager.CloseEdit(),
        T3Gv.optManager.MakeSameSize(parseInt(e, 10))
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  GetSelectionContext = function () {
    try {
      return T3Gv.optManager.GetSelectionContext()
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  IsActiveTextEdit = function () {
    try {
      return - 1 != T3Gv.optManager.GetObjectPtr(T3Gv.optManager.tedSessionBlockId, !1).theActiveTextEditObjectID
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  HandleKeyDown = function (e, t, a) {
    try {
      return T3Gv.optManager.HandleKeyDown(e, t, a)
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }


  Duplicate = function () {
    try {
      T3Gv.optManager.DuplicateObjects()
    } catch (e) {
      T3Gv.optManager.RestorePrimaryStateManager(),
        T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  HandleKeyPress = function (e, t) {
    try {
      return T3Gv.optManager.HandleKeyPress(e, t)
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  SD_PreLoad_Symbol = function (e, t, a, r) {
    // null != SDUI.Commands.MainController.Shapes.SD_PreloadTimer &&
    //   (
    //     clearTimeout(SDUI.Commands.MainController.Shapes.SD_PreloadTimer),
    //     SDUI.Commands.MainController.Shapes.SD_PreloadTimer = null
    //   );
    // var i = SDUI.Commands.MainController.Symbols.GetLMObject(e);
    // if (null == i) {
    //   if (!r) return void (
    //     SDUI.Commands.MainController.Shapes.SD_PreloadTimer = setTimeout(
    //       SDUI.Commands.MainController.Shapes.SD_PreLoad_Symbol,
    //       20,
    //       e,
    //       t,
    //       a,
    //       !1
    //     )
    //   );
    //   if (null == (i = T3Gv.optManager.BuildSymbolObject(e, - 1))) return
    // }
    // if (
    //   null == T3Gv.optManager.drawShape &&
    //   (T3Gv.optManager.drawShape = i),
    //   i.SymbolData.HasNative
    // ) {
    //   if (null == i.nativeDataArrayBuffer) return void (
    //     SDUI.Commands.MainController.Shapes.SD_PreloadTimer = setTimeout(
    //       SDUI.Commands.MainController.Shapes.SD_PreLoad_Symbol,
    //       20,
    //       e,
    //       t,
    //       a,
    //       !1
    //     )
    //   )
    // } else {
    //   var n = T3Gv.optManager.GetSymbolFormat(i.SymbolData),
    //     o = Globals.SymbolFormats;
    //   switch (n) {
    //     case o.EMF:
    //     case o.PNG:
    //     case o.JPG:
    //       if (null == i.EMFBuffer) return void (
    //         SDUI.Commands.MainController.Shapes.SD_PreloadTimer = setTimeout(
    //           SDUI.Commands.MainController.Shapes.SD_PreLoad_Symbol,
    //           20,
    //           e,
    //           t,
    //           a,
    //           !1
    //         )
    //       );
    //       break;
    //     case o.SVGColor:
    //       var s = SDF.GetSVGFragmentFromCache(e);
    //       if (null == s || null == s.fragment) return void (
    //         SDUI.Commands.MainController.Shapes.SD_PreloadTimer = setTimeout(
    //           SDUI.Commands.MainController.Shapes.SD_PreLoad_Symbol,
    //           20,
    //           e,
    //           t,
    //           a,
    //           !1
    //         )
    //       )
    //   }
    // }
    // a(e, t)

    this.StampOrDragDropNewSymbol(e, t)
  }


  DragDropSymbol = function (r, i) {

    this.StampOrDragDropSymbolCallback(r, i)
  }

  StampOrDragDropSymbolCallback = function (r, i) {

    this.SD_PreLoad_Symbol(i, !0, r.StampOrDragDropNewSymbol, !0)
  }

  StampOrDragDropNewSymbol = function (e, t) {
    T3Gv.optManager.ReplaceSymbolID = null;
    // var a = T3Gv.optManager.BuildSymbolObject(e, t);

    var svgF0 = '<g><g fill="##FILLCOLOR=#7F7F7F##" transform="translate(0,0)"><g class="pump"> <circle stroke="##LINECOLOR=#000000##" cy="16" cx="15.955" r="9.9609003" class="pump-background" /> <g transform="translate(16,16)"> <path d="M -5,8.1369 V -8.1191 L 9.078,0.0091 Z" class="rotating-middle" stroke="##LINECOLOR=#000000##" stroke-width="##LINETHICK=1##"/></g></g></g></g>';
    var svgF1 = '<g  class="heat-pump" stroke-linejoin="round"  stroke="#000"  transform="translate(39 -2.3842e-7)"  fill="currentColor" > <rect  class="inner" height="27.718"  width="27.718"  y="2.141"  x="-36.859" stroke-width="1.0868" ></rect>  <g transform="matrix(1.0276 0 0 1.0276 -39.441 -.44130)"  stroke-linecap="round"  stroke-miterlimit="1"  stroke-width="1.3509" > <path d="m16.234 16.944 8.6837-6.894-8.6837-6.894v3.447h-13.152v6.894h13.152z" fill="#ce2824" ></path> <path d="m15.766 28.844-8.6837-6.894 8.6837-6.894v3.447h13.152v6.894h-13.152z" fill="#3238db"></path></g></g>';

    var tempData = new SVGFragmentSymbol(null);
    tempData.StyleRecord = new QuickStyle();
    tempData.SVGFragment = svgF1;//

    if (tempData) {
      // var r = (a.ExtraFlags & ConstantData.ExtraFlags.SEDE_NoColor) > 0;
      // t ? T3Gv.optManager.DragDropNewShape(a, !0, !0, r, null, null) : T3Gv.optManager.MouseStampNewShape(a, !0, !0, r, null, null)
      T3Gv.optManager.DragDropNewShape(tempData, !0, !0, false, null, null)
    }
  }


  DrawNewSegLine = function (e, t, a) {
    var r,
      i = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data,
      n = 0 == (i.def.textflags & ConstantData.TextFlags.SED_TF_HorizText),
      o = i.d_sarrow,
      s = i.d_earrow,
      l = i.d_sarrowdisp,
      S = i.d_earrowdisp;
    o > 0 != s > 0 &&
      (0 === s && (s = o, S = l), o = 0, l = !1),
      r = a ? Utils1.DeepCopy(a.Data.attributes) : {
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
        StartArrowID: o,
        EndArrowID: s,
        StartArrowDisp: l,
        EndArrowDisp: S,
        ArrowSizeIndex: i.d_arrowsize,
        CurveAdjust: 7,
        TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
        TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
        TextDirection: n,
        Dimensions: i.dimensions,
        curveparam: i.def.curveparam,
        bOverrideDefaultStyleOnDraw: !0
      };
    var c = new Instance.Shape.SegmentedLine(r),
      u = Utils1.DeepCopy(i.def.style);
    if (a && a.Data && a.Data.attributes && a.Data.attributes.StyleRecord) u = Utils1.DeepCopy(a.Data.attributes.StyleRecord);
    else {
      var p = Utils4.FindStyle(ConstantData.Defines.TextBlockStyle);
      u.Text.Paint.Color = p.Text.Paint.Color
    }
    if (
      c.StyleRecord = u,
      i.flags & ConstantData.SessionFlags.SEDS_AllowHops &&
      (
        c.flags = Utils2.SetFlag(c.flags, ConstantData.ObjFlags.SEDO_LineHop, !0)
      ),
      e
    ) return c;
    T3Gv.optManager.DrawNewObject(c, t)
  }

  DrawNewArcSegLine = function (e, t, a) {
    var r,
      i = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data,
      n = 0 == (i.def.textflags & ConstantData.TextFlags.SED_TF_HorizText),
      o = i.d_sarrow,
      s = i.d_earrow,
      l = i.d_sarrowdisp,
      S = i.d_earrowdisp;
    o > 0 != s > 0 &&
      (0 === s && (s = o, S = l), o = 0, l = !1),
      r = a ? Utils1.DeepCopy(a.Data.attributes) : {
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
        StartArrowID: o,
        EndArrowID: s,
        StartArrowDisp: l,
        EndArrowDisp: S,
        ArrowSizeIndex: i.d_arrowsize,
        CurveAdjust: 7,
        TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
        TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
        TextDirection: n,
        Dimensions: i.dimensions,
        bOverrideDefaultStyleOnDraw: !0
      };
    var c = new ListManager.ArcSegmentedLine(r),
      u = Utils1.DeepCopy(i.def.style);
    if (a && a.Data && a.Data.attributes && a.Data.attributes.StyleRecord) u = Utils1.DeepCopy(a.Data.attributes.StyleRecord);
    else {
      var p = Utils4.FindStyle(ConstantData.Defines.TextBlockStyle);
      u.Text.Paint.Color = p.Text.Paint.Color
    }
    if (
      c.StyleRecord = u,
      i.flags & ConstantData.SessionFlags.SEDS_AllowHops &&
      (
        c.flags = Utils2.SetFlag(c.flags, ConstantData.ObjFlags.SEDO_LineHop, !0)
      ),
      e
    ) return c;
    T3Gv.optManager.DrawNewObject(c, t)
  }

  DrawNewPolyLine = function (e, t, a) {
    var r,
      i = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data,
      n = 0 == (i.def.textflags & ConstantData.TextFlags.SED_TF_HorizText),
      o = i.d_sarrow,
      s = i.d_earrow,
      l = i.d_sarrowdisp,
      S = i.d_earrowdisp;
    o > 0 != s > 0 &&
      (0 === s && (s = o, S = l), o = 0, l = !1),
      a ? r = Utils1.DeepCopy(a.Data.attributes) : (
        (
          r = {
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
            StartArrowID: o,
            EndArrowID: s,
            StartArrowDisp: l,
            EndArrowDisp: S,
            ArrowSizeIndex: i.d_arrowsize,
            CurveAdjust: 7,
            polylist: new PolyList(),
            TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
            TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
            TextDirection: n,
            Dimensions: i.dimensions,
            extraflags: ConstantData.ExtraFlags.SEDE_SideKnobs,
            bOverrideDefaultStyleOnDraw: !0
          }
        ).polylist.segs.push(
          new PolySeg(ConstantData.LineType.LINE, 0, 0)
        ),
        r.polylist.segs.push(
          new PolySeg(ConstantData.LineType.LINE, 0, 0)
        )
      );
    var c = new Instance.Shape.PolyLine(r),
      u = Utils1.DeepCopy(i.def.style);
    if (a && a.Data && a.Data.attributes && a.Data.attributes.StyleRecord) u = Utils1.DeepCopy(a.Data.attributes.StyleRecord);
    else {
      var p = Utils4.FindStyle(ConstantData.Defines.TextBlockStyle);
      u.Text.Paint.Color = p.Text.Paint.Color
    }
    if (c.StyleRecord = u, e) return c;
    T3Gv.optManager.DrawNewObject(c, t)
  }

  DrawNewPolyLineContainer = function (e, t, a) {
    var r,
      i = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data,
      n = (
        T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !1),
        0 == (i.def.textflags & ConstantData.TextFlags.SED_TF_HorizText)
      );
    a ? r = Utils1.DeepCopy(a.Data.attributes) : (
      (
        r = {
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
          StartArrowID: i.d_sarrow,
          EndArrowID: i.d_earrow,
          StartArrowDisp: i.d_sarrowdisp,
          EndArrowDisp: i.d_earrowdisp,
          ArrowSizeIndex: i.d_arrowsize,
          CurveAdjust: 7,
          polylist: new PolyList(),
          TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
          TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
          TextDirection: n,
          Dimensions: i.dimensions
        }
      ).polylist.segs.push(
        new PolySeg(ConstantData.LineType.LINE, 0, 0)
      ),
      r.polylist.segs.push(
        new PolySeg(ConstantData.LineType.LINE, 0, 0)
      )
    );
    var o = new Instance.Shape.PolyLineContainer(r);
    if (e) return o;
    T3Gv.optManager.DrawNewObject(o, t)
  }

  DrawNewFreehandLine = function (e, t, a) {
    var r = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data;
    a ? attributes = Utils1.DeepCopy(a.Data.attributes) : (
      attributes = {
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
        pointlist: [],
        bOverrideDefaultStyleOnDraw: !0
      },
      attributes.pointlist.push({
        x: 0,
        y: 0
      })
    );
    var i = new ListManager.FreehandLine(attributes),
      n = Utils1.DeepCopy(r.def.style);
    if (
      a &&
      a.Data &&
      a.Data.attributes &&
      a.Data.attributes.StyleRecord &&
      (n = Utils1.DeepCopy(a.Data.attributes.StyleRecord)),
      i.StyleRecord = n,
      e
    ) return i;
    T3Gv.optManager.DrawNewObject(i, t)
  }

  DrawNewArcLine = function (e, t, a) {
    var r,
      i = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data,
      n = 0 == (i.def.textflags & ConstantData.TextFlags.SED_TF_HorizText),
      o = i.d_sarrow,
      s = i.d_earrow,
      l = i.d_sarrowdisp,
      S = i.d_earrowdisp;
    o > 0 != s > 0 &&
      (0 === s && (s = o, S = l), o = 0, l = !1),
      r = a ? Utils1.DeepCopy(a.Data.attributes) : {
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
        StartArrowID: o,
        EndArrowID: s,
        StartArrowDisp: l,
        EndArrowDisp: S,
        ArrowSizeIndex: i.d_arrowsize,
        CurveAdjust: 7,
        TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
        TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
        TextDirection: n,
        Dimensions: i.dimensions,
        bOverrideDefaultStyleOnDraw: !0
      };
    var c = new Instance.Shape.ArcLine(r),
      u = Utils1.DeepCopy(i.def.style);
    if (a && a.Data && a.Data.attributes && a.Data.attributes.StyleRecord) u = Utils1.DeepCopy(a.Data.attributes.StyleRecord);
    else {
      var p = Utils4.FindStyle(ConstantData.Defines.TextBlockStyle);
      u.Text.Paint.Color = p.Text.Paint.Color
    }
    if (
      c.StyleRecord = u,
      i.flags & ConstantData.SessionFlags.SEDS_AllowHops &&
      (
        c.flags = Utils2.SetFlag(c.flags, ConstantData.ObjFlags.SEDO_LineHop, !0)
      ),
      e
    ) return c;
    T3Gv.optManager.DrawNewObject(c, t)
  }

}

export default ShapeController

