


// import SDJS from "../SDJS.Index";
// import SDGraphics from '../../SDGraphics/SDGraphics.Index';
// import SDUI from '../../SDUI/SDUI.Index';
// import GPP from "../../gListManager";


import BaseLine from './S.BaseLine'
import ListManager from '../Data/ListManager';
import FileParser from '../Data/FileParser';
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/T3Gv';

// import Line from '../Basic/Basic.Line'


import Point from '../Model/Point'

import Document from '../Basic/B.Document'

import Element from '../Basic/B.Element'
import ConstantData from '../Data/ConstantData'


import PolySeg from '../Model/PolySeg'
import SelectionAttributes from '../Model/SelectionAttributes'
import ConstantData2 from '../Data/ConstantData2'

class Line extends BaseLine {

  // constructor(e) {
  //   //'use strict';
  //   (e = e || {
  //   }).LineType = ListManager.LineType.LINE,
  //     this.StartPoint = e.StartPoint ||
  //     {
  //       x: 0,
  //       y: 0
  //     },
  //     this.EndPoint = e.EndPoint ||
  //     {
  //       x: 0,
  //       y: 0
  //     },
  //     this.FixedPoint = e.FixedPoint ||
  //     [
  //       0,
  //       0
  //     ],
  //     this.LineOrientation = e.LineOrientation ||
  //     ListManager.LineOrientation.NONE,
  //     this.hoplist = e.hoplist ||
  //     {
  //       nhops: 0,
  //       hops: []
  //     },
  //     this.ArrowheadData = e.ArrowheadData ||
  //     [],
  //     this.ShortRef = e.ShortRef ||
  //     0,
  //     this.shapeparam = e.shapeparam ||
  //     0,
  //     this.StartArrowID = e.StartArrowID ||
  //     0,
  //     this.EndArrowID = e.EndArrowID ||
  //     0,
  //     this.StartArrowDisp = e.StartArrowDisp ||
  //     !1,
  //     this.EndArrowDisp = e.EndArrowDisp ||
  //     !1,
  //     this.ArrowSizeIndex = e.ArrowSizeIndex ||
  //     0,
  //     this.TextDirection = e.TextDirection ||
  //     !1;
  //   var t = ListManager.BaseLine.apply(this, [
  //     e
  //   ]);
  //   if (this.CalcFrame(), t) return t
  // }


  public StartPoint: Point;
  public EndPoint: Point;
  public FixedPoint: number[];
  public LineOrientation: number;
  public hoplist: any;
  public ArrowheadData: any[];
  public ShortRef: number;
  public shapeparam: number;
  public StartArrowID: number;
  public EndArrowID: number;
  public StartArrowDisp: boolean;
  public EndArrowDisp: boolean;
  public ArrowSizeIndex: number;
  public TextDirection: boolean;


  constructor(lineParam: any = {}) {

    lineParam = lineParam || {};
    lineParam.LineType = ConstantData.LineType.LINE;

    super(lineParam);

    this.StartPoint = lineParam.StartPoint || { x: 0, y: 0 };
    this.EndPoint = lineParam.EndPoint || { x: 0, y: 0 };
    this.FixedPoint = lineParam.FixedPoint || [0, 0];
    this.LineOrientation = lineParam.LineOrientation || ConstantData.LineOrientation.NONE;
    this.hoplist = lineParam.hoplist || { nhops: 0, hops: [] };
    this.ArrowheadData = lineParam.ArrowheadData || [];
    this.ShortRef = lineParam.ShortRef || 0;
    this.shapeparam = lineParam.shapeparam || 0;
    this.StartArrowID = lineParam.StartArrowID || 0;
    this.EndArrowID = lineParam.EndArrowID || 0;
    this.StartArrowDisp = lineParam.StartArrowDisp || false;
    this.EndArrowDisp = lineParam.EndArrowDisp || false;
    this.ArrowSizeIndex = lineParam.ArrowSizeIndex || 0;
    this.TextDirection = lineParam.TextDirection || false;

    this.CalcFrame();
  }














  // ListManager.Line.prototype = new ListManager.BaseLine
  // ListManager.Line.prototype.constructor = ListManager.Line
  GetLineShapePolyPoints(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d = [],
      D = this.shapeparam;
    p = this.ShortRef,
      D < 0.01 &&
      (p = 0);
    var g = this.EndPoint.x - this.StartPoint.x,
      h = this.EndPoint.y - this.StartPoint.y,
      m = !1,
      C = null,
      y = null,
      f = null,
      L = null,
      I = null,
      T = null,
      b = null,
      M = null;
    switch (p) {
      case 0:
      case ConstantData2.LineTypes.SED_LS_MeasuringTape:
        d.push(
          new Point(this.StartPoint.x, this.StartPoint.y)
        ),
          d.push(new Point(this.EndPoint.x, this.EndPoint.y));
        break;
      case 1:
      case 2:
        if (2 == this.ShortRef && (m = !0), 0 === (a = Math.sqrt(g * g + h * h))) break;
        r = h / a,
          i = g / a,
          (n = a) > 200 &&
          (n = 200),
          s = (a - 2 * (o = D * n / 2)) / 2,
          C = {
            x: this.StartPoint.x,
            y: this.StartPoint.y
          },
          d.push(C),
          l = s * i,
          S = s * r,
          y = {
            x: this.StartPoint.x + l,
            y: this.StartPoint.y + S
          },
          d.push(y),
          l = o * r,
          S = o * i,
          f = {
            x: y.x + l,
            y: y.y - S
          },
          m ? (
            d.push(f),
            L = {
              x: f.x + S,
              y: f.y + l
            },
            d.push(L),
            I = {
              x: L.x - 2 * l,
              y: L.y + 2 * S
            },
            d.push(I),
            c = 0,
            u = 0
          ) : (
            c = o * i / 2,
            u = o * r / 2,
            L = {
              x: f.x + S - c,
              y: f.y + l - u
            },
            d.push(L),
            I = {
              x: L.x - 2 * l + 2 * c,
              y: L.y + 2 * S + 2 * u
            },
            d.push(I)
          ),
          m ? (
            T = {
              x: I.x + S - c,
              y: I.y + l - u
            },
            d.push(T),
            b = {
              x: T.x + l,
              y: T.y - S
            },
            d.push(b),
            M = {
              x: this.EndPoint.x,
              y: this.EndPoint.y
            },
            d.push(M)
          ) : (
            b = {
              x: (T = {
                x: I.x + S - c,
                y: I.y + l - u
              }).x + l,
              y: T.y - S
            },
            d.push(b),
            M = {
              x: this.EndPoint.x,
              y: this.EndPoint.y
            },
            d.push(M)
          )
    }
    if (t) for (var P = 0; P < d.length; P++) d[P].x -= this.Frame.x,
      d[P].y -= this.Frame.y;
    return d
  }

  CreateShape(e, t) {
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    var a,
      r = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER),
      i = null;
    a = this.ShortRef,
      this.shapeparam < 0.01 &&
      (a = 0);
    var n = (0 === a || a == ConstantData2.LineTypes.SED_LS_MeasuringTape) &&
      0 === this.hoplist.nhops;
    (
      i = n ? e.CreateShape(Document.CreateShapeType.LINE) : e.CreateShape(Document.CreateShapeType.POLYLINE)
    ).SetID(ConstantData.SVGElementClass.SHAPE);
    var o = null;
    (
      o = n ? e.CreateShape(Document.CreateShapeType.LINE) : e.CreateShape(Document.CreateShapeType.POLYLINE)
    ).SetID(ConstantData.SVGElementClass.SLOP),
      o.ExcludeFromExport(!0),
      this.CalcFrame();
    var s = this.Frame,
      l = this.StyleRecord;
    if (null == (l = this.SVGTokenizerHook(l))) {
      var S = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
      S &&
        (l = S.def.style)
    }
    if (l) {
      var c = l.Line.Paint.Color,
        u = l.Line.Thickness;
      l.Line.Thickness > 0 &&
        l.Line.Thickness < 1 &&
        (u = 1);
      var p = l.Line.Paint.Opacity,
        d = l.Line.LinePattern
    }
    var D = s.width,
      g = s.height;
    r.SetSize(D, g),
      r.SetPos(this.Frame.x, this.Frame.y),
      i.SetSize(D, g);
    var h = [];
    if (n) i.SetPoints(
      this.StartPoint.x - this.Frame.x,
      this.StartPoint.y - this.Frame.y,
      this.EndPoint.x - this.Frame.x,
      this.EndPoint.y - this.Frame.y
    );
    else {
      if (
        h = this.GetLineShapePolyPoints(ConstantData.Defines.NPOLYPTS, !0),
        0 !== this.hoplist.nhops
      ) {
        var m = T3Gv.optManager.InsertHops(this, h, h.length);
        h = h.slice(0, m.npts)
      }
      i.SetPoints(h)
    }
    return i.SetFillColor('none'),
      i.SetStrokeColor(c),
      i.SetStrokeOpacity(p),
      i.SetStrokeWidth(u),
      0 !== d &&
      i.SetStrokePattern(d),
      o.SetSize(D, g),
      n ? o.SetPoints(
        this.StartPoint.x - this.Frame.x,
        this.StartPoint.y - this.Frame.y,
        this.EndPoint.x - this.Frame.x,
        this.EndPoint.y - this.Frame.y
      ) : o.SetPoints(h),
      o.SetStrokeColor('white'),
      o.SetFillColor('none'),
      o.SetOpacity(0),
      t ? o.SetEventBehavior(Element.EventBehavior.HIDDEN_OUT) : o.SetEventBehavior(Element.EventBehavior.NONE),
      o.SetStrokeWidth(u + ConstantData.Defines.SED_Slop),
      r.AddElement(i),
      r.AddElement(o),
      this.ApplyStyles(i, l),
      this.ApplyEffects(r, !1, !0),
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR &&
      T3Gv.optManager.GanttSetPercentCompleteEffectOnBar(this, i, l),
      r.isShape = !0,
      this.AddIcons(e, r),
      r
  }

  SetCursors() {
    var e,
      t = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    T3Gv.optManager.currentModalOperation === ListManager.ModalOperations.ADDCORNER ? (e = t.GetElementByID(ConstantData.SVGElementClass.SLOP)) &&
      e.SetCursor(Element.CursorType.CROSSHAIR) :
      // ListManager.BaseDrawingObject.prototype.SetCursors.call(this)
      // Double ===
      // super.SetCursors()
      this.BaseDrawingObject_SetCursors()
  }

  BaseDrawingObject_SetCursors() {
    var e,
      t,
      a,
      r,
      i,
      n,
      o = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID),
      s = !1;
    if (!(this.flags & ConstantData.ObjFlags.SEDO_Lock) && o) if (
      T3Gv.optManager.GetEditMode() === ConstantData.EditState.DEFAULT
    ) {
      if (
        (i = o.GetElementByID(ConstantData.SVGElementClass.SHAPE)) &&
        (
          this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FRAME_CONTAINER ? i.SetCursor(Element.CursorType.DEFAULT) : i.SetCursor(Element.CursorType.ADD)
        ),
        (e = o.GetElementByID(ConstantData.ShapeIconType.HYPERLINK)) &&
        e.SetCursor(Element.CursorType.POINTER),
        (
          e = o.GetElementByID(ConstantData.ShapeIconType.TRELLOLINK)
        ) &&
        e.SetCursor(Element.CursorType.POINTER),
        (e = o.GetElementByID(ConstantData.ShapeIconType.NOTES)) &&
        e.SetCursor(Element.CursorType.POINTER),
        (
          e = o.GetElementByID(ConstantData.ShapeIconType.EXPANDEDVIEW)
        ) &&
        e.SetCursor(Element.CursorType.POINTER),
        (e = o.GetElementByID(ConstantData.ShapeIconType.COMMENT)) &&
        e.SetCursor(Element.CursorType.POINTER),
        (
          e = o.GetElementByID(ConstantData.ShapeIconType.ATTACHMENT)
        ) &&
        e.SetCursor(Element.CursorType.POINTER),
        (e = o.GetElementByID(ConstantData.ShapeIconType.FIELDDATA)) &&
        e.SetCursor(Element.CursorType.POINTER),
        (r = o.GetElementByID(ConstantData.SVGElementClass.SLOP)) &&
        r.SetCursor(Element.CursorType.ADD),
        a = T3Gv.optManager.svgDoc.GetActiveEdit(),
        this.DataID &&
        this.DataID >= 0 &&
        o.textElem &&
        (
          o.textElem === a ? (
            i.SetCursor(Element.CursorType.TEXT),
            o.textElem.SetCursorState(ConstantData.CursorState.EDITLINK)
          ) : o.textElem.SetCursorState(ConstantData.CursorState.LINKONLY)
        ),
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select &&

        // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always ||
        // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select &&

        this.IsSelected()
      ) {
        for (
          n = o.GetElementListWithID(ConstantData.SVGElementClass.DIMENSIONTEXT),
          t = 0;
          t < n.length;
          t++
        ) n[t].SetCursorState(ConstantData.CursorState.EDITONLY),
          n[t] === a &&
          (s = !0);
        s &&
          (i.SetCursor(null), r && r.SetCursor(null))
      }
    } else this.ClearCursors()
  }

  AdjustLineStart(e, t, a, r, i, n) {


    console.log('== track UpdateDimensionsLines Shape.Line-> AdjustLineStart')


    var o = [],
      s = e.GetElementByID(ConstantData.SVGElementClass.SHAPE),
      l = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
    this.StartPoint.x = t,
      this.StartPoint.y = a,
      n ||
      this.EnforceMinimum(!0);
    var S = !1;
    T3Gv.optManager.LinkParams &&
      T3Gv.optManager.LinkParams.ConnectIndex >= 0 &&
      (S = !0),
      i &&
      (S = !0),
      S ||
      this.AdjustForLineAngleSnap(this.EndPoint, this.StartPoint),
      this.CalcFrame(),
      e.SetSize(this.Frame.width, this.Frame.height),
      e.SetPos(this.Frame.x, this.Frame.y),
      s.SetSize(this.Frame.width, this.Frame.height);
    var c = [],
      u = (
        0 === this.ShortRef ||
        this.ShortRef == ConstantData2.LineTypes.SED_LS_MeasuringTape
      ) &&
        0 === this.hoplist.nhops;
    u ? s.SetPoints(
      this.StartPoint.x - this.Frame.x,
      this.StartPoint.y - this.Frame.y,
      this.EndPoint.x - this.Frame.x,
      this.EndPoint.y - this.Frame.y
    ) : (
      c = this.GetLineShapePolyPoints(ConstantData.Defines.NPOLYPTS, !0),
      s.SetPoints(c)
    ),
      l.SetSize(this.Frame.width, this.Frame.height),
      u ? l.SetPoints(
        this.StartPoint.x - this.Frame.x,
        this.StartPoint.y - this.Frame.y,
        this.EndPoint.x - this.Frame.x,
        this.EndPoint.y - this.Frame.y
      ) : l.SetPoints(c),
      this.CalcFrame(),
      this.rflags &&
      (
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !1
        )
      ),
      e.SetSize(this.Frame.width, this.Frame.height),
      e.SetPos(this.Frame.x, this.Frame.y),
      s.SetSize(this.Frame.width, this.Frame.height),
      u ? s.SetPoints(
        this.StartPoint.x - this.Frame.x,
        this.StartPoint.y - this.Frame.y,
        this.EndPoint.x - this.Frame.x,
        this.EndPoint.y - this.Frame.y
      ) : (
        c = this.GetLineShapePolyPoints(ConstantData.Defines.NPOLYPTS, !0),
        s.SetPoints(c)
      ),
      l.SetSize(this.Frame.width, this.Frame.height),
      u ? l.SetPoints(
        this.StartPoint.x - this.Frame.x,
        this.StartPoint.y - this.Frame.y,
        this.EndPoint.x - this.Frame.x,
        this.EndPoint.y - this.Frame.y
      ) : l.SetPoints(c),
      this.UpdateDimensionLines(e);
    this.UpdateCoordinateLines(e);
    new SelectionAttributes();
    var p = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
    o.push(
      new Point(this.StartPoint.x - p.x, this.StartPoint.y - p.y)
    ),
      o.push(
        new Point(this.EndPoint.x - p.x, this.EndPoint.y - p.y)
      );
    var d = o[0].x - o[1].x,
      D = o[0].y - o[1].y;
    Utils2.sqrt(d * d + D * D);
    T3Gv.optManager.UpdateDisplayCoordinates(
      this.Frame,
      this.StartPoint,
      ConstantData.CursorTypes.Grow,
      this
    ),
      - 1 != this.DataID &&
      this.LM_ResizeSVGTextObject(e, this, this.Frame)
  }

  AdjustLineEnd(e, endPointX, endPointY, r, i) {


    console.log('== track UpdateDimensionsLines Shape.Line-> AdjustLineEnd')


    // e ShapeContainer
    // t x 150
    // a y 83
    // r 12
    // i false

    // Double===

    // var n = [];
    // if (e) var o = e.GetElementByID(ConstantData.SVGElementClass.SHAPE),
    //   s = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
    // this.EndPoint.x = endPointX,
    //   this.EndPoint.y = endPointY,
    //   this.EnforceMinimum(!1);
    // var l = !1;
    // if (
    //   T3Gv.optManager.LinkParams &&
    //   T3Gv.optManager.LinkParams.ConnectIndex >= 0 &&
    //   (l = !0),
    //   i &&
    //   (l = !0),
    //   l ||
    //   this.AdjustForLineAngleSnap(this.StartPoint, this.EndPoint),
    //   this.CalcFrame(),
    //   e
    // ) {
    //   e.SetSize(this.Frame.width, this.Frame.height),
    //     e.SetPos(this.Frame.x, this.Frame.y),
    //     o.SetSize(this.Frame.width, this.Frame.height);
    //   var S = [],
    //     c = (
    //       0 === this.ShortRef ||
    //       this.ShortRef == ConstantData2.LineTypes.SED_LS_MeasuringTape
    //     ) &&
    //       0 === this.hoplist.nhops;
    //   e &&
    //     o &&
    //     s &&
    //     (
    //       c ? o.SetPoints &&
    //         o.SetPoints(
    //           this.StartPoint.x - this.Frame.x,
    //           this.StartPoint.y - this.Frame.y,
    //           this.EndPoint.x - this.Frame.x,
    //           this.EndPoint.y - this.Frame.y
    //         ) : (
    //         S = this.GetLineShapePolyPoints(ConstantData.Defines.NPOLYPTS, !0),
    //         o.SetPoints &&
    //         o.SetPoints(S)
    //       ),
    //       s.SetSize(this.Frame.width, this.Frame.height),
    //       c ? s.SetPoints &&
    //         s.SetPoints(
    //           this.StartPoint.x - this.Frame.x,
    //           this.StartPoint.y - this.Frame.y,
    //           this.EndPoint.x - this.Frame.x,
    //           this.EndPoint.y - this.Frame.y
    //         ) : s.SetPoints &&
    //       s.SetPoints(S),
    //       this.rflags &&
    //       (
    //         this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
    //         this.rflags = Utils2.SetFlag(
    //           this.rflags,
    //           ConstantData.FloatingPointDim.SD_FP_Height,
    //           !1
    //         )
    //       ),
    //       this.CalcFrame(),
    //       e.SetSize(this.Frame.width, this.Frame.height),
    //       e.SetPos(this.Frame.x, this.Frame.y),
    //       o.SetSize(this.Frame.width, this.Frame.height),
    //       c ? o.SetPoints &&
    //         o.SetPoints(
    //           this.StartPoint.x - this.Frame.x,
    //           this.StartPoint.y - this.Frame.y,
    //           this.EndPoint.x - this.Frame.x,
    //           this.EndPoint.y - this.Frame.y
    //         ) : (
    //         S = this.GetLineShapePolyPoints(ConstantData.Defines.NPOLYPTS, !0),
    //         o.SetPoints &&
    //         o.SetPoints(S)
    //       ),
    //       s.SetSize(this.Frame.width, this.Frame.height),
    //       c ? s.SetPoints &&
    //         s.SetPoints(
    //           this.StartPoint.x - this.Frame.x,
    //           this.StartPoint.y - this.Frame.y,
    //           this.EndPoint.x - this.Frame.x,
    //           this.EndPoint.y - this.Frame.y
    //         ) : s.SetPoints &&
    //       s.SetPoints(S),
    //       this.UpdateDimensionLines(e)
    //     );
    //   new SelectionAttributes();
    //   var u = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
    //   n.push(
    //     new Point(this.StartPoint.x - u.x, this.StartPoint.y - u.y)
    //   ),
    //     n.push(
    //       new Point(this.EndPoint.x - u.x, this.EndPoint.y - u.y)
    //     );
    //   var p = n[0].x - n[1].x,
    //     d = n[0].y - n[1].y,
    //     D = (Utils2.sqrt(p * p + d * d), Utils1.DeepCopy(this.EndPoint));
    //   if (
    //     T3Gv.optManager.UpdateDisplayCoordinates(
    //       this.Frame,
    //       D,
    //       ConstantData.CursorTypes.Grow,
    //       this
    //     ),
    //     T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto &&
    //     (D.x != this.EndPoint.x || D.y != this.EndPoint.y)
    //   ) {
    //     var g = new Error(Resources.Strings.Error_Bounds);
    //     throw g.name = '1',
    //     g
    //   }
    //   - 1 != this.DataID &&
    //     e &&
    //     this.LM_ResizeSVGTextObject(e, this, this.Frame)
    // }


    // debugger






    var points = [];
    if (e) {
      var shapeElement = e.GetElementByID(ConstantData.SVGElementClass.SHAPE);
      var slopElement = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
    }
    this.EndPoint.x = endPointX;
    this.EndPoint.y = endPointY;
    this.EnforceMinimum(false);

    var linkParamsExist = T3Gv.optManager.LinkParams && T3Gv.optManager.LinkParams.ConnectIndex >= 0;
    var adjustForLineAngleSnap = i || linkParamsExist;

    if (adjustForLineAngleSnap) {
      this.AdjustForLineAngleSnap(this.StartPoint, this.EndPoint);
    }

    this.CalcFrame();

    if (e) {
      e.SetSize(this.Frame.width, this.Frame.height);
      e.SetPos(this.Frame.x, this.Frame.y);
      shapeElement.SetSize(this.Frame.width, this.Frame.height);

      var polyPoints = [];
      var isSimpleLine = (this.ShortRef === 0 || this.ShortRef == ConstantData2.LineTypes.SED_LS_MeasuringTape) && this.hoplist.nhops === 0;

      if (isSimpleLine) {
        shapeElement.SetPoints(
          this.StartPoint.x - this.Frame.x,
          this.StartPoint.y - this.Frame.y,
          this.EndPoint.x - this.Frame.x,
          this.EndPoint.y - this.Frame.y
        );
      } else {
        polyPoints = this.GetLineShapePolyPoints(ConstantData.Defines.NPOLYPTS, true);
        shapeElement.SetPoints(polyPoints);
      }

      slopElement.SetSize(this.Frame.width, this.Frame.height);

      if (isSimpleLine) {
        slopElement.SetPoints(
          this.StartPoint.x - this.Frame.x,
          this.StartPoint.y - this.Frame.y,
          this.EndPoint.x - this.Frame.x,
          this.EndPoint.y - this.Frame.y
        );
      } else {
        slopElement.SetPoints(polyPoints);
      }

      if (this.rflags) {
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, false);
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, false);
      }

      this.CalcFrame();
      e.SetSize(this.Frame.width, this.Frame.height);
      e.SetPos(this.Frame.x, this.Frame.y);
      shapeElement.SetSize(this.Frame.width, this.Frame.height);

      if (isSimpleLine) {
        shapeElement.SetPoints(
          this.StartPoint.x - this.Frame.x,
          this.StartPoint.y - this.Frame.y,
          this.EndPoint.x - this.Frame.x,
          this.EndPoint.y - this.Frame.y
        );
      } else {
        polyPoints = this.GetLineShapePolyPoints(ConstantData.Defines.NPOLYPTS, true);
        shapeElement.SetPoints(polyPoints);
      }

      slopElement.SetSize(this.Frame.width, this.Frame.height);

      if (isSimpleLine) {
        slopElement.SetPoints(
          this.StartPoint.x - this.Frame.x,
          this.StartPoint.y - this.Frame.y,
          this.EndPoint.x - this.Frame.x,
          this.EndPoint.y - this.Frame.y
        );
      } else {
        slopElement.SetPoints(polyPoints);
      }

      this.UpdateDimensionLines(e);

      // Double add for coordinates line changes
      this.UpdateCoordinateLines(e);

      new SelectionAttributes();
      var rect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
      points.push(new Point(this.StartPoint.x - rect.x, this.StartPoint.y - rect.y));
      points.push(new Point(this.EndPoint.x - rect.x, this.EndPoint.y - rect.y));

      var deltaX = points[0].x - points[1].x;
      var deltaY = points[0].y - points[1].y;
      var distance = Utils2.sqrt(deltaX * deltaX + deltaY * deltaY);
      var deepCopiedEndPoint = Utils1.DeepCopy(this.EndPoint);

      T3Gv.optManager.UpdateDisplayCoordinates(this.Frame, deepCopiedEndPoint, ConstantData.CursorTypes.Grow, this);

      if (T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto &&
        (deepCopiedEndPoint.x != this.EndPoint.x || deepCopiedEndPoint.y != this.EndPoint.y)) {
        var error = new Error(Resources.Strings.Error_Bounds);
        error.name = '1';
        throw error;
      }

      if (this.DataID !== -1 && e) {
        this.LM_ResizeSVGTextObject(e, this, this.Frame);
      }
    }







  }

  Flip(e) {

    console.log('== track UpdateDimensionsLines Shape.Line-> Flip')


    var t,
      a = {};
    if (
      T3Gv.optManager.ob = Utils1.DeepCopy(this),
      e & ConstantData.ExtraFlags.SEDE_FlipVert &&
      (
        a.y = this.StartPoint.y,
        this.StartPoint.y = this.EndPoint.y,
        this.EndPoint.y = a.y,
        t = !0
      ),
      e & ConstantData.ExtraFlags.SEDE_FlipHoriz &&
      (
        a.x = this.StartPoint.x,
        this.StartPoint.x = this.EndPoint.x,
        this.EndPoint.x = a.x,
        t = !0
      ),
      t
    ) {
      var r = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      this.UpdateDimensionLines(r),
        - 1 != this.DataID &&
        this.LM_ResizeSVGTextObject(r, this, this.Frame),
        T3Gv.optManager.ob.Frame &&
        T3Gv.optManager.MaintainLink(
          this.BlockID,
          this,
          T3Gv.optManager.ob,
          ConstantData.ActionTriggerType.ROTATE
        ),
        T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE)
    }
    T3Gv.optManager.ob = {}
  }

  AddCorner(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S = [],
      c = [],
      u = !1;
    if (
      T3Gv.optManager.ob = Utils1.DeepCopy(this),
      (
        S = [
          {
            x: this.StartPoint.x,
            y: this.StartPoint.y
          },
          {
            x: this.EndPoint.x,
            y: this.EndPoint.y
          }
        ]
      ).push(new Point(t.x, t.y)),
      (o = 360 - (o = Utils1.CalcAngleFromPoints(S[0], S[1]))) >= 360 &&
      (o -= 360),
      s = 2 * Math.PI * (o / 360),
      Utils3.RotatePointsAboutCenter(this.Frame, - s, S),
      !(Math.abs(S[1].y - S[2].y) > this.StyleRecord.Line.Thickness)
    ) {
      if (Collab.AllowMessage()) {
        Collab.BeginSecondaryEdit();
        var p = {
          BlockID: this.BlockID
        };
        p.point = {
          x: t.x,
          y: t.y
        }
      }
      S[2].y = S[0].y,
        Math.abs(S[1].x - S[2].x) > Math.abs(S[0].x - S[2].x) &&
        (u = !0);
      var d = o >= 0 &&
        o <= 180 ? 50 : - 50;
      S.push(new Point(S[2].x, S[2].y + d)),
        Utils3.RotatePointsAboutCenter(this.Frame, s, S),
        c.push(new Point(S[2].x, S[2].y)),
        c.push(new Point(S[3].x, S[3].y)),
        u ? (this.StartPoint.x = c[0].x, this.StartPoint.y = c[0].y) : (this.EndPoint.x = c[0].x, this.EndPoint.y = c[0].y),
        this.CalcFrame(),
        T3Gv.optManager.MaintainLink(
          this.BlockID,
          this,
          T3Gv.optManager.ob,
          ConstantData.ActionTriggerType.MODIFYSHAPE
        ),
        T3Gv.optManager.SetLinkFlag(
          this.BlockID,
          ConstantData.LinkFlags.SED_L_MOVE | ConstantData.LinkFlags.SED_L_CHANGE
        ),
        T3Gv.optManager.UpdateLinks();
      var D = {
        StartPoint: {
          x: c[0].x,
          y: c[0].y
        },
        EndPoint: {
          x: c[1].x,
          y: c[1].y
        },
        Dimensions: this.Dimensions,
        TextFlags: this.TextFlags,
        objecttype: this.objecttype
      };
      D.StyleRecord = Utils1.DeepCopy(this.StyleRecord);
      var g = new ListManager.Line(D);
      switch (
      a = T3Gv.optManager.AddNewObject(g, !1, !0),
      r = u ? T3Gv.optManager.PolyLJoin(
        a,
        ConstantData.HookPts.SED_KTL,
        this.BlockID,
        ConstantData.HookPts.SED_KTL,
        !1
      ) : T3Gv.optManager.PolyLJoin(
        a,
        ConstantData.HookPts.SED_KTL,
        this.BlockID,
        ConstantData.HookPts.SED_KTR,
        !1
      ),
      i = T3Gv.optManager.GetObjectPtr(r, !1),
      n = T3Gv.optManager.svgObjectLayer.GetElementByID(r),
      l = Number(T3Gv.docHandler.rulerSettings.majorScale).toString(),
      T3Gv.docHandler.rulerSettings.units
      ) {
        case ConstantData.RulerUnits.SED_Feet:
          this.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches ? (
            l = Number(12 * T3Gv.docHandler.rulerSettings.majorScale).toString(),
            l += '"'
          ) : l += '\'';
          break;
        case ConstantData.RulerUnits.SED_Inches:
          l += '"'
      }
      i.UpdateDimensionFromText(n, l, {
        segment: 2
      }),
        T3Gv.optManager.AddToDirtyList(this.BlockID),
        Collab.ClearCreateList(),
        Collab.AddToCreateList(r),
        Collab.AllowMessage() &&
        (
          Collab.IsSecondary() &&
          Collab.CreateList.length &&
          (p.CreateList = [
            r
          ]),
          Collab.BuildMessage(ConstantData.CollabMessages.AddCorner, p, !1)
        ),
        T3Gv.optManager.CompleteOperation(null)
    }
  }

  UseEdges(e, t, a, r, i, n) {
    var o,
      s = 0,
      l = 0,
      S = 0,
      c = 0,
      u = 0,
      p = 0,
      d = !1;
    return i.x !== n.x &&
      (
        e &&
          a ? Utils2.IsEqual(this.StartPoint.y, this.EndPoint.y) &&
        (s = n.x - i.x, d = !0) : (
          o = this.Frame.x + this.Frame.width / 2,
          Math.abs(o - i.x / 2) < 100 ? (u = (n.x - i.x) / 2, d = !0) : this.Frame.x > i.x / 2 &&
            (u = n.x - i.x, d = !0)
        )
      ),
      i.y !== n.y &&
      (
        t &&
          r ? Utils2.IsEqual(this.StartPoint.x, this.EndPoint.x) &&
        (l = n.y - i.y, d = !0) : (
          o = this.Frame.y + this.Frame.height / 2,
          Math.abs(o - i.y / 2) < 100 ? (p = (n.y - i.y) / 2, d = !0) : this.Frame.y > i.y / 2 &&
            (p = n.y - i.y, d = !0)
        )
      ),
      !!d &&
      (
        T3Gv.optManager.GetObjectPtr(this.BlockID, !0),
        (u || p) &&
        this.OffsetShape(u, p),
        (s || l) &&
        (
          s &&
          (S = this.Frame.width + s),
          l &&
          (c = this.Frame.height + l),
          this.SetSize(S, c, 0)
        ),
        T3Gv.optManager.AddToDirtyList(this.BlockID),
        !0
      )
  }


}

export default Line;
