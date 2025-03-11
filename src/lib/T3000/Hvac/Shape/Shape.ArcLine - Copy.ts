




import BaseLine from './S.BaseLine'
import ListManager from '../Data/ListManager';
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/T3Gv'
// import Collab from '../Data/Collab'
// import FileParser from '../Data/FileParser'
// import EvtUtil from "../Event/Event.Default";
// import Resources from '../Data/Resources'
// import Element from "../Basic/Basic.Element";

import Document from '../Basic/B.Document'
import Element from '../Basic/B.Element'
import ConstantData from '../Data/ConstantData'

import PolySeg from '../Model/PolySeg'
import SelectionAttributes from '../Model/SelectionAttributes'
import ConstantData1 from "../Data/ConstantData1"

class ArcLine extends BaseLine {


  // constructor(e) {
  //   //'use strict';
  //   (e = e || {
  //   }).LineType = ListManager.LineType.ARCLINE,
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
  //     this.CurveAdjust = e.CurveAdjust,
  //     this.IsReversed = e.IsReversed ||
  //     !1,
  //     this.FromPolygon = e.FromPolygon ||
  //     !1,
  //     this.CalcFrame(),
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
  //   if (t) return t
  // }

  public CurveAdjust: any;
  public IsReversed: any;
  public FromPolygon: any;
  public FixedPoint: any;
  public LineOrientation: any;
  public hoplist: any;
  public ArrowheadData: any;
  public StartArrowID: any;
  public EndArrowID: any;
  public StartArrowDisp: any;
  public EndArrowDisp: any;
  public ArrowSizeIndex: any;
  public TextDirection: any;



  constructor(e: any = {}) {

    e.LineType = ConstantData.LineType.ARCLINE;
    super(e);

    this.StartPoint = e.StartPoint || { x: 0, y: 0 };
    this.EndPoint = e.EndPoint || { x: 0, y: 0 };
    this.CurveAdjust = e.CurveAdjust;
    this.IsReversed = e.IsReversed || false;
    this.FromPolygon = e.FromPolygon || false;
    this.CalcFrame();
    this.FixedPoint = e.FixedPoint || [0, 0];
    this.LineOrientation = e.LineOrientation || ConstantData.LineOrientation.NONE;
    this.hoplist = e.hoplist || { nhops: 0, hops: [] };
    this.ArrowheadData = e.ArrowheadData || [];
    this.StartArrowID = e.StartArrowID || 0;
    this.EndArrowID = e.EndArrowID || 0;
    this.StartArrowDisp = e.StartArrowDisp || false;
    this.EndArrowDisp = e.EndArrowDisp || false;
    this.ArrowSizeIndex = e.ArrowSizeIndex || 0;
    this.TextDirection = e.TextDirection || false;
  }



  // ListManager.ArcLine = function (e) {
  //     //'use strict';
  //     (e = e || {
  //     }).LineType = ListManager.LineType.ARCLINE,
  //       this.StartPoint = e.StartPoint ||
  //       {
  //         x: 0,
  //         y: 0
  //       },
  //       this.EndPoint = e.EndPoint ||
  //       {
  //         x: 0,
  //         y: 0
  //       },
  //       this.CurveAdjust = e.CurveAdjust,
  //       this.IsReversed = e.IsReversed ||
  //       !1,
  //       this.FromPolygon = e.FromPolygon ||
  //       !1,
  //       this.CalcFrame(),
  //       this.FixedPoint = e.FixedPoint ||
  //       [
  //         0,
  //         0
  //       ],
  //       this.LineOrientation = e.LineOrientation ||
  //       ListManager.LineOrientation.NONE,
  //       this.hoplist = e.hoplist ||
  //       {
  //         nhops: 0,
  //         hops: []
  //       },
  //       this.ArrowheadData = e.ArrowheadData ||
  //       [],
  //       this.StartArrowID = e.StartArrowID ||
  //       0,
  //       this.EndArrowID = e.EndArrowID ||
  //       0,
  //       this.StartArrowDisp = e.StartArrowDisp ||
  //       !1,
  //       this.EndArrowDisp = e.EndArrowDisp ||
  //       !1,
  //       this.ArrowSizeIndex = e.ArrowSizeIndex ||
  //       0,
  //       this.TextDirection = e.TextDirection ||
  //       !1;
  //     var t = ListManager.BaseLine.apply(this, [
  //       e
  //     ]);
  //     if (t) return t
  //   },
  // ListManager.ArcLine.prototype = new ListManager.BaseLine,
  // ListManager.ArcLine.prototype.constructor = ListManager.ArcLine

  CalcRadiusAndCenter(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C,
      y,
      f,
      L = {
        centerX: 0,
        centerY: 0,
        actionX: 0,
        actionY: 0,
        radius: 0,
        valid: !1,
        centerInside: !1
      };
    return S = e + (f = a - e) / 2,
      c = t + (y = r - t) / 2,
      0 === (o = Math.sqrt(f * f + y * y)) ? (L.valid = !1, L) : (
        m = - y / o,
        C = f / o,
        o /= 2,
        y = i,
        (l = s = Math.abs((o * o + y * y) / (2 * y))) < i ? (
          L.centerInside = !0,
          u = (o = Utils2.sqrt(l * l - o * o)) * m,
          p = o * C,
          n ? (g = (d = S + u) + l * m, h = (D = c + p) + l * C) : (g = (d = S - u) - l * m, h = (D = c - p) - l * C)
        ) : (
          n ? s += y : s -= y,
          g = (d = S + (u = m * s)) - l * m,
          h = (D = c + (p = C * s)) - l * C,
          n &&
          (d = S + (u = m * (s = l - y)), D = c + (p = C * s))
        ),
        L.radius = l,
        L.centerX = d,
        L.centerY = D,
        L.actionX = g,
        L.actionY = h,
        L.valid = !0,
        L
      )
  }

  GetLineChangeFrame() {
    var e = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
    return e.width < ConstantData.Defines.SED_SegDefLen &&
      (e.width = ConstantData.Defines.SED_SegDefLen),
      e.height < ConstantData.Defines.SED_SegDefLen &&
      (e.height = ConstantData.Defines.SED_SegDefLen),
      e
  }

  CreateArcShapeForHops(e, t) {
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    var a = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER),
      r = null;
    (
      r = e.CreateShape(Document.CreateShapeType.POLYLINE)
    ).SetID(ConstantData.SVGElementClass.SHAPE);
    var i = null;
    (
      i = e.CreateShape(Document.CreateShapeType.POLYLINE)
    ).SetID(ConstantData.SVGElementClass.SLOP),
      i.ExcludeFromExport(!0),
      this.CalcFrame();
    var n = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      o = this.StyleRecord,
      s = (o = this.SVGTokenizerHook(o)).Line.Paint.Color,
      l = o.Line.Thickness,
      S = o.Line.Paint.Opacity,
      c = o.Line.LinePattern,
      u = n.width,
      p = n.height;
    a.SetSize(u, p),
      a.SetPos(n.x, n.y);
    var d = [];
    d = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0);
    var D = T3Gv.optManager.InsertHops(this, d, d.length);
    return d = d.slice(0, D.npts),
      r.SetPoints(d),
      r.SetFillColor('none'),
      r.SetStrokeColor(s),
      r.SetStrokeOpacity(S),
      r.SetStrokeWidth(l),
      0 !== c &&
      r.SetStrokePattern(c),
      i.SetPoints(d),
      i.SetStrokeColor('white'),
      i.SetFillColor('none'),
      i.SetOpacity(0),
      t ? i.SetEventBehavior(Element.EventBehavior.HIDDEN_OUT) : i.SetEventBehavior(Element.EventBehavior.NONE),
      i.SetStrokeWidth(l + ConstantData.Defines.SED_Slop),
      a.AddElement(r),
      a.AddElement(i),
      this.ApplyStyles(r, o),
      this.ApplyEffects(a, !1, !0),
      a.isShape = !0,
      this.AddIcons(e, a),
      a
  }

  CreateShape(e, t) {
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    if (0 === this.hoplist.nhops) {
      var a = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER),
        r = e.CreateShape(Document.CreateShapeType.PATH);
      r.SetID(ConstantData.SVGElementClass.SHAPE);
      var i = e.CreateShape(Document.CreateShapeType.PATH);
      i.SetID(ConstantData.SVGElementClass.SLOP),
        i.ExcludeFromExport(!0),
        this.CalcFrame();
      var n = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        o = this.StyleRecord,
        s = (o = this.SVGTokenizerHook(o)).Line.Paint.Color,
        l = o.Line.Paint.Opacity,
        S = o.Line.Thickness;
      o.Line.Thickness > 0 &&
        o.Line.Thickness < 1 &&
        (S = 1);
      var c = o.Line.LinePattern,
        u = n.width,
        p = n.height;
      return a.SetSize(u, p),
        a.SetPos(n.x, n.y),
        r.SetFillColor('none'),
        r.SetStrokeColor(s),
        r.SetStrokeOpacity(l),
        r.SetStrokeWidth(S),
        0 !== c &&
        r.SetStrokePattern(c),
        i.SetStrokeColor('white'),
        i.SetFillColor('none'),
        i.SetOpacity(0),
        t ? i.SetEventBehavior(Element.EventBehavior.HIDDEN_OUT) : i.SetEventBehavior(Element.EventBehavior.NONE),
        i.SetStrokeWidth(S + ConstantData.Defines.SED_Slop),
        a.AddElement(r),
        a.AddElement(i),
        this.ApplyStyles(r, o),
        this.ApplyEffects(a, !1, !0),
        a.isShape = !0,
        this.AddIcons(e, a),
        a
    }
    return this.CreateArcShapeForHops(e, t)
  }

  PostCreateShapeCallback(e, t, a, r) {

    console.log('= S.ArcLine PostCreateShapeCallback e, t, a, r', e, t, a, r)


    0 === this.hoplist.nhops ? this.RegenerateGenerateArc(t) : this.RegenerateGenerateArcForHops(t),
      this.DataID >= 0 &&
      this.LM_AddSVGTextObject(e, t),
      this.UpdateDimensionLines(t)
  }

  CreateActionTriggers(e, t, a, r) {
    var i = e.CreateShape(Document.CreateShapeType.GROUP),
      n = ConstantData.Defines.SED_KnobSize,
      o = ConstantData.Defines.SED_RKnobSize,
      s = !0,
      l = e.docInfo.docToScreenScale;
    e.docInfo.docScale <= 0.5 &&
      (l *= 2);
    var S = n / l,
      c = o / l;
    this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
      (S *= 2);
    var u = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      p = u.width,
      d = u.height,
      D = T3Gv.optManager.GetObjectPtr(t, !1);
    p += S,
      d += S;
    var g = $.extend(!0, {
    }, u);
    g.x -= S / 2,
      g.y -= S / 2,
      g.width += S,
      g.height += S;
    var h,
      m = {
        svgDoc: e,
        shapeType: Document.CreateShapeType.RECT,
        knobSize: S,
        fillColor: 'black',
        fillOpacity: 1,
        strokeSize: 1,
        strokeColor: '#777777',
        cursorType: this.CalcCursorForSegment(this.StartPoint, this.EndPoint, !1),
        locked: !1
      };
    if (
      t != r &&
      (
        m.fillColor = 'white',
        m.strokeSize = 1,
        m.strokeColor = 'black',
        m.fillOpacity = 0
      ),
      this.flags & ConstantData.ObjFlags.SEDO_Lock ? (m.fillColor = 'gray', m.locked = !0) : this.NoGrow() &&
        (
          m.fillColor = 'red',
          m.strokeColor = 'red',
          m.cursorType = Element.CursorType.DEFAULT
        ),
      m.x = this.StartPoint.x - u.x,
      m.y = this.StartPoint.y - u.y,
      m.knobID = ConstantData.ActionTriggerType.LINESTART,
      D &&
      D.hooks
    ) for (h = 0; h < D.hooks.length; h++) if (D.hooks[h].hookpt == ConstantData.HookPts.SED_KTL) {
      m.shapeType = Document.CreateShapeType.OVAL,
        s = !1;
      break
    }
    this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
      (m.shapeType = Document.CreateShapeType.IMAGE);
    var C = this.GenericKnob(m);
    if (
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
      C.SetURL &&
      (
        C.SetURL(
          m.cursorType === Element.CursorType.NWSE_RESIZE ? ConstantData.Constants.FilePath_ImageKnobs + ConstantData.Constants.Knob_ExpandDiag1 : ConstantData.Constants.FilePath_ImageKnobs + ConstantData.Constants.Knob_ExpandDiag2
        ),
        C.ExcludeFromExport(!0)
      ),
      i.AddElement(C),
      m.shapeType = Document.CreateShapeType.RECT,
      m.x = this.EndPoint.x - u.x,
      m.y = this.EndPoint.y - u.y,
      m.knobID = ConstantData.ActionTriggerType.LINEEND,
      D &&
      D.hooks
    ) for (h = 0; h < D.hooks.length; h++) if (D.hooks[h].hookpt == ConstantData.HookPts.SED_KTR) {
      m.shapeType = Document.CreateShapeType.OVAL,
        s = !1;
      break
    }
    this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
      (m.shapeType = Document.CreateShapeType.IMAGE),
      C = this.GenericKnob(m),
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
      C.SetURL &&
      (
        C.SetURL(
          m.cursorType === Element.CursorType.NWSE_RESIZE ? ConstantData.Constants.FilePath_ImageKnobs + ConstantData.Constants.Knob_ExpandDiag1 : ConstantData.Constants.FilePath_ImageKnobs + ConstantData.Constants.Knob_ExpandDiag2
        ),
        C.ExcludeFromExport(!0)
      ),
      i.AddElement(C),
      m.shapeType = Document.CreateShapeType.RECT,
      m.cursorType = this.CalcCursorForSegment(this.StartPoint, this.EndPoint, !0),
      this.NoGrow() &&
      (m.cursorType = Element.CursorType.DEFAULT);
    var y = this.StartPoint.x,
      f = this.StartPoint.y,
      L = this.EndPoint.x,
      I = this.EndPoint.y,
      T = this.CalcRadiusAndCenter(y, f, L, I, this.CurveAdjust, this.IsReversed);
    if (
      m.x = T.actionX - u.x,
      m.y = T.actionY - u.y,
      m.knobID = ConstantData.ActionTriggerType.MODIFYSHAPE,
      C = this.GenericKnob(m),
      i.AddElement(C),
      T3Gv.optManager.touchInitiated &&
      (s = !1),
      s &&
      !m.locked &&
      !this.NoGrow()
    ) {
      m.shapeType = Document.CreateShapeType.OVAL;
      var b = Math.atan(
        (this.EndPoint.y - this.StartPoint.y) / (this.EndPoint.x - this.StartPoint.x)
      );
      b < 0 &&
        (b *= - 1),
        this.EndPoint.x >= this.StartPoint.x ? (
          m.x = this.EndPoint.x - 2 * c * Math.cos(b) - u.x,
          m.y = this.EndPoint.y - 2 * c * Math.sin(b) - u.y
        ) : (
          m.x = this.StartPoint.x - 2 * c * Math.cos(b) - u.x,
          m.y = this.StartPoint.y - 2 * c * Math.sin(b) - u.y
        ),
        m.cursorType = Element.CursorType.ROTATE,
        m.knobID = ConstantData.ActionTriggerType.ROTATE,
        m.fillColor = 'white',
        m.fillOpacity = 0.001,
        m.strokeSize = 1.5,
        m.strokeColor = 'black',
        m.knobSize = c,
        C = this.GenericKnob(m),
        i.AddElement(C),
        m.knobSize = S
    }
    if (
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff &&
      this.CanUseStandOffDimensionLines()
    ) {
      var M = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      this.CreateDimensionAdjustmentKnobs(i, M, m)
    }
    return i.SetSize(p, d),
      i.SetPos(g.x, g.y),
      i.isShape = !0,
      i.SetID(ConstantData.Defines.Action + t),
      i
  }

  GetTextOnLineParams(e) {
    var t,
      a = {
        Frame: new ListManager.Rect,
        StartPoint: new Point,
        EndPoint: new Point
      };
    switch (
    a.StartPoint.x = this.StartPoint.x,
    a.StartPoint.y = this.StartPoint.y,
    a.EndPoint.x = this.EndPoint.x,
    a.EndPoint.y = this.EndPoint.y,
    a.Frame = Utils2.Pt2Rect(a.StartPoint, a.EndPoint),
    this.TextAlign
    ) {
      case ConstantData.TextAlign.TOPCENTER:
      case ConstantData.TextAlign.CENTER:
      case ConstantData.TextAlign.BOTTOMCENTER:
        var r = T3Gv.optManager.SD_GetClockwiseAngleBetween2PointsInRadians(a.StartPoint, a.EndPoint),
          i = [];
        i.push(new Point(a.StartPoint.x, a.StartPoint.y)),
          i.push(new Point(a.EndPoint.x, a.EndPoint.y)),
          Utils3.RotatePointsAboutCenter(a.Frame, r, i),
          t = this.CalcRadiusAndCenter(i[0].x, i[0].y, i[1].x, i[1].y, this.CurveAdjust, this.IsReversed),
          i[0].y = t.actionY,
          i[1].y = t.actionY,
          Utils3.RotatePointsAboutCenter(a.Frame, - r, i),
          a.StartPoint.x = i[0].x,
          a.StartPoint.y = i[0].y,
          a.EndPoint.x = i[1].x,
          a.EndPoint.y = i[1].y
    }
    return a
  }

  RegenerateGenerateArc(e) {
    var t = ConstantData1.ArrowheadLookupTable[this.StartArrowID],
      a = ConstantData1.ArrowheadLookupTable[this.EndArrowID],
      r = ConstantData1.ArrowheadSizeTable[this.ArrowSizeIndex];
    0 === t.id &&
      (t = null),
      0 === a.id &&
      (a = null);
    var i = e.GetElementByID(ConstantData.SVGElementClass.SHAPE),
      n = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
    if (null != i && null != i.PathCreator) {
      var o = i.PathCreator();
      o.BeginPath();
      var s = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        l = this.StartPoint.x - s.x,
        S = this.StartPoint.y - s.y,
        c = this.EndPoint.x - s.x,
        u = this.EndPoint.y - s.y,
        p = this.CalcRadiusAndCenter(l, S, c, u, this.CurveAdjust, this.IsReversed);
      p.centerInside ? (
        o.MoveTo(c, u),
        o.ArcTo(l, S, p.radius, p.radius, 0, this.IsReversed, !0, !1)
      ) : (
        o.MoveTo(l, S),
        o.ArcTo(c, u, p.radius, p.radius, 0, !this.IsReversed, !1, !1)
      );
      var d = o.ToString();
      i.SetPath(d),
        n.SetPath(d),
        e.SetSize(s.width, s.height),
        e.SetPos(s.x, s.y),
        (t || a) &&
        (
          p.centerInside ? (
            i.SetArrowheads(a, r, t, r, this.EndArrowDisp, this.StartArrowDisp),
            n.SetArrowheads(a, r, t, r, this.EndArrowDisp, this.StartArrowDisp)
          ) : (
            i.SetArrowheads(t, r, a, r, this.StartArrowDisp, this.EndArrowDisp),
            n.SetArrowheads(t, r, a, r, this.StartArrowDisp, this.EndArrowDisp)
          )
        )
    }
  }

  RegenerateGenerateArcForHops(e) {
    var t = ConstantData1.ArrowheadLookupTable[this.StartArrowID],
      a = ConstantData1.ArrowheadLookupTable[this.EndArrowID],
      r = ConstantData1.ArrowheadSizeTable[this.ArrowSizeIndex];
    0 === t.id &&
      (t = null),
      0 === a.id &&
      (a = null);
    var i = e.GetElementByID(ConstantData.SVGElementClass.SHAPE),
      n = e.GetElementByID(ConstantData.SVGElementClass.SLOP),
      o = [];
    o = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0);
    var s = T3Gv.optManager.InsertHops(this, o, o.length),
      l = (o = o.slice(0, s.npts)).length;
    i.SetPoints(o);
    var S = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      c = this.StartPoint.x - S.x,
      u = this.StartPoint.y - S.y;
    this.EndPoint.x,
      S.x,
      this.EndPoint.y,
      S.y;
    if (e.SetSize(S.width, S.height), e.SetPos(S.x, S.y), t || a) {
      var p = (c - o[0].x) * (c - o[0].x) + (u - o[0].y) * (u - o[0].y),
        d = !1;
      (c - o[l - 1].x) * (c - o[l - 1].x) + (u - o[l - 1].y) * (u - o[l - 1].y) < p &&
        (d = !0),
        d ? (
          i.SetArrowheads(a, r, t, r, this.EndArrowDisp, this.StartArrowDisp),
          n.SetArrowheads(a, r, t, r, this.EndArrowDisp, this.StartArrowDisp)
        ) : (
          i.SetArrowheads(t, r, a, r, this.StartArrowDisp, this.EndArrowDisp),
          n.SetArrowheads(t, r, a, r, this.StartArrowDisp, this.EndArrowDisp)
        )
    }
  }

  AdjustLineStart(e, t, a) {

    console.log('== track UpdateDimensionsLines Shape.ArcLine-> AdjustLineStart')


    var r = {
      x: this.StartPoint.x,
      y: this.StartPoint.y
    };
    this.StartPoint.x = t,
      this.StartPoint.y = a,
      this.EnforceMinimum(!0),
      this.CalcFrame(),
      (this.r.x < 0 || this.r.y < 0) &&
      (this.StartPoint.x = r.x, this.StartPoint.y = r.y, this.CalcFrame()),
      this.RegenerateGenerateArc(e),
      - 1 != this.DataID &&
      this.LM_ResizeSVGTextObject(e, this, this.Frame);
    new SelectionAttributes();
    var i = this.EndPoint.x - this.StartPoint.x,
      n = this.EndPoint.y - this.StartPoint.y;
    Utils2.sqrt(i * i + n * n);
    this.UpdateDimensionLines(e),
      T3Gv.optManager.UpdateDisplayCoordinates(
        this.Frame,
        this.StartPoint,
        ConstantData.CursorTypes.Grow
      ),
      - 1 != this.DataID &&
      this.LM_ResizeSVGTextObject(e, this, this.Frame)
  }

  AdjustLineEnd(e, t, a, r) {

    console.log('== track UpdateDimensionsLines Shape.ArcLine-> AdjustLineEnd')


    var i = {
      x: this.EndPoint.x,
      y: this.EndPoint.y
    };
    if (
      this.EndPoint.x = t,
      this.EndPoint.y = a,
      this.EnforceMinimum(!1),
      this.CalcFrame(),
      (this.r.x < 0 || this.r.y < 0) &&
      (this.EndPoint.x = i.x, this.EndPoint.y = i.y, this.CalcFrame()),
      e
    ) {
      this.RegenerateGenerateArc(e),
        - 1 != this.DataID &&
        this.LM_ResizeSVGTextObject(e, this, this.Frame);
      new SelectionAttributes();
      var n = this.EndPoint.x - this.StartPoint.x,
        o = this.EndPoint.y - this.StartPoint.y;
      Utils2.sqrt(n * n + o * o);
      this.UpdateDimensionLines(e),
        T3Gv.optManager.UpdateDisplayCoordinates(
          this.Frame,
          this.EndPoint,
          ConstantData.CursorTypes.Grow,
          this
        ),
        - 1 != this.DataID &&
        this.LM_ResizeSVGTextObject(e, this, this.Frame)
    }
  }

  Flip(e) {

    console.log('== track UpdateDimensionsLines Shape.ArcLine-> Flip')


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
      this.IsReversed = !this.IsReversed;
      var r = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      r &&
        (
          this.UpdateDimensionLines(r),
          - 1 != this.DataID &&
          this.LM_ResizeSVGTextObject(r, this, this.Frame)
        ),
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

  ModifyShape(e, t, a, r, i) {
    var n,
      o,
      s,
      l,
      S = this.FindSide(
        this.StartPoint.x,
        this.StartPoint.y,
        this.EndPoint.x,
        this.EndPoint.y,
        t,
        a
      );
    - 1 === r &&
      (S = this.OriginalLineSide),
      S != this.OriginalLineSide &&
      (
        0 !== this.OriginalLineSide &&
        (this.IsReversed = !this.IsReversed),
        this.OriginalLineSide = S
      ),
      n = this.StartPoint.x + (this.EndPoint.x - this.StartPoint.x) / 2 - t,
      o = this.StartPoint.y + (this.EndPoint.y - this.StartPoint.y) / 2 - a,
      s = (l = Math.sqrt(n * n + o * o)) - this.OriginalCenterPointDistance;
    var c = this.CurveAdjust;
    l < this.OriginalCenterPointDistance ? this.CurveAdjust = this.OriginalCurveAdjust - s : this.CurveAdjust = this.OriginalCurveAdjust + s,
      this.CurveAdjust = this.OriginalCurveAdjust + s,
      this.CurveAdjust < 1 &&
      (this.CurveAdjust = 1),
      this.CurveAdjust > 500 &&
      (this.CurveAdjust = 500),
      this.CalcFrame(),
      - 1 !== r &&
      (this.r.x < 0 || this.r.y < 0) &&
      (this.CurveAdjust = c, this.CalcFrame()),
      (
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select ||
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always
      ) &&
      T3Gv.optManager.AddToDirtyList(this.BlockID),
      e &&
      (
        this.RegenerateGenerateArc(e),
        - 1 != this.DataID &&
        this.LM_ResizeSVGTextObject(e, this, this.Frame)
      )
  }

  FindSide(e, t, a, r, i, n) {
    if (e == a) return i < a ? r > t ? 1 : - 1 : i > a ? r > t ? - 1 : 1 : 0;
    if (t == r) return n < r ? a > e ? 1 : - 1 : n > r ? a > e ? - 1 : 1 : 0;
    var o = (r - t) / (a - e),
      s = o * i + (t - e * o);
    return 0 !== o ? n > s ? a > e ? 1 : - 1 : n < s ? a > e ? - 1 : 1 : 0 : 0
  }

  BeforeModifyShape(e, t, a) {
    var r,
      i,
      n;
    this.OriginalCurveAdjust = this.CurveAdjust,
      r = this.StartPoint.x + (this.EndPoint.x - this.StartPoint.x) / 2 - e,
      i = this.StartPoint.y + (this.EndPoint.y - this.StartPoint.y) / 2 - t,
      n = Math.sqrt(r * r + i * i),
      this.OriginalCenterPointDistance = n,
      this.CurveAdjust <= 1 ? this.OriginalLineSide = 0 : this.OriginalLineSide = this.FindSide(
        this.StartPoint.x,
        this.StartPoint.y,
        this.EndPoint.x,
        this.EndPoint.y,
        e,
        t
      )
  }

  StartNewObjectDrawTrackCommon(e, t, a) {
    console.log('ListManager.ArcLine.prototype.StartNewObjectDrawTrackCommon e, t, a=>', e, t, a);

    var r = T3Gv.optManager.actionStartX,
      i = e - r,
      n = t - T3Gv.optManager.actionStartY,
      o = Math.sqrt(i * i + n * n);
    $.extend(!0, {
    }, T3Gv.optManager.actionBBox);
    this.CurveAdjust = o / 10,
      this.CurveAdjust < 1 &&
      (this.CurveAdjust = 1),
      this.CurveAdjust > 500 &&
      (this.CurveAdjust = 500),
      this.IsReversed = !(e >= r),
      this.AdjustLineEnd(
        T3Gv.optManager.actionSvgObject,
        e,
        t,
        ConstantData.ActionTriggerType.LINEEND
      )
  }

  GetPolyPoints(e, t, a, r, i) {
    var n,
      o = [],
      s = [],
      l = {};
    if (a) return o = ListManager.BaseLine.prototype.GetPolyPoints.call(this, e, t, a, r, i);
    var S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      C = this.StartPoint.x - m.x,
      y = this.StartPoint.y - m.y,
      f = this.EndPoint.x - m.x,
      L = this.EndPoint.y - m.y;
    S = f - C,
      c = L - y,
      p = (u = Math.sqrt(S * S + c * c)) > 0 ? S / u : 0,
      Math.abs(p) < 0.0001 &&
      (p = 0),
      Math.abs(c) < 0.0001 &&
      (c = 0),
      h = Math.asin(p),
      (c > 0 || 0 === c) &&
      (h = - h);
    var I = ListManager.ArcLine.prototype.CalcRadiusAndCenter.call(this, C, y, f, L, this.CurveAdjust, this.IsReversed);
    if (
      l.x = I.centerX,
      l.y = I.centerY,
      s.push(new Point(C, y)),
      s.push(new Point(f, L)),
      Utils3.RotatePointsAboutPoint(l, h, s),
      s[0].y > s[1].y &&
        !this.FromPolygon ? (d = s[1].y, D = s[0].y) : (d = s[0].y, D = s[1].y),
      (
        o = T3Gv.optManager.ArcToPoly(e - 1, l, I.radius, d, D, s[0].x, this.IsReversed, I.centerInside)
      ).push(new Point(o[0].x, D)),
      Utils3.RotatePointsAboutPoint(l, - h, o),
      !t
    ) for (n = o.length, g = 0; g < n; g++) o[g].x += m.x,
      o[g].y += m.y;
    return o
  }

  GetConnectLine() {
    var e,
      t,
      a,
      r,
      i,
      n,
      o = {},
      s = [],
      l = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      S = this.StartPoint.x - l.x,
      c = this.StartPoint.y - l.y,
      u = this.EndPoint.x - l.x,
      p = this.EndPoint.y - l.y,
      d = {
        frame: {
        },
        length: 0,
        startpt: {
        },
        endpt: {
        },
        center: {
        }
      },
      D = this.CalcRadiusAndCenter(S, c, u, p, this.CurveAdjust, this.IsReversed);
    return D.centerInside ? (
      e = u - S,
      t = p - c,
      r = (a = Math.sqrt(e * e + t * t)) > 0 ? e / a : 0,
      Math.abs(r) < 0.0001 &&
      (r = 0),
      Math.abs(t) < 0.0001 &&
      (t = 0),
      i = Math.asin(r),
      t >= 0 &&
      (i = - i),
      o.x = D.centerX,
      o.y = D.centerY,
      s.push(new Point(S, c)),
      s.push(new Point(u, p)),
      Utils3.RotatePointsAboutPoint(o, i, s),
      s[0].y > s[1].y ? (n = s[0].y - s[1].y, t = D.radius - n / 2, s[0].y += t, s[1].y -= t) : (n = s[1].y - s[0].y, t = D.radius - n / 2, s[1].y += t, s[0].y -= t),
      Utils3.RotatePointsAboutPoint(o, - i, s),
      s[0].x += l.x,
      s[1].x += l.x,
      s[0].y += l.y,
      s[1].y += l.y,
      d.frame = Utils2.Pt2Rect(s[0], s[1]),
      e = s[0].x - s[1].x,
      t = s[0].y - s[1].y,
      d.length = Math.sqrt(e * e + t * t),
      d.startpt.x = s[0].x,
      d.startpt.y = s[0].y,
      d.endpt.x = s[1].x,
      d.endpt.y = s[1].y,
      d.center.x = o.x + l.x,
      d.center.y = o.y + l.y,
      d
    ) : null
  }

  GetTargetPoints(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l,
      S,
      c = [
        {
          x: 0,
          y: 0
        }
      ],
      u = {},
      p = {},
      d = {},
      D = ConstantData.HookPts;
    if (
      null != a &&
      null != a &&
      a >= 0 &&
      T3Gv.optManager.GetObjectPtr(a, !1).DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
    ) switch (e.id) {
      case D.SED_KTC:
      case D.SED_KBC:
      case D.SED_KRC:
      case D.SED_KLC:
        return ListManager.BaseLine.prototype.GetTargetPoints.call(this, e, t, a)
    }
    return (S = this.GetConnectLine()) ? (d = S.startpt, p = S.endpt) : (d = this.StartPoint, p = this.EndPoint),
      r = this.EndPoint.x - this.StartPoint.x,
      Math.abs(r) < 1 &&
      (r = 1),
      n = (i = this.EndPoint.y - this.StartPoint.y) / r,
      Math.abs(n) > 1 ||
        t & ConstantData.HookFlags.SED_LC_HOnly ? (o = (u = T3Gv.optManager.ArcToChord(d, p, e, S, this)).y - d.y, s = u.x - d.x) : (s = (u = T3Gv.optManager.ArcToChord(d, p, e, S, this)).x - d.x, o = u.y - d.y),
      i = p.y - d.y,
      r = p.x - d.x,
      Math.abs(i) > 1 ? c[0].y = o / i * ConstantData.Defines.SED_CDim : c[0].y = ConstantData.Defines.SED_CDim,
      Math.abs(r) > 1 ? c[0].x = s / r * ConstantData.Defines.SED_CDim : c[0].x = ConstantData.Defines.SED_CDim,
      c[0].x > ConstantData.Defines.SED_CDim &&
      (c[0].x = ConstantData.Defines.SED_CDim),
      c[0].y > ConstantData.Defines.SED_CDim &&
      (c[0].y = ConstantData.Defines.SED_CDim),
      c[0].x < 0 &&
      (c[0].x = 0),
      c[0].y < 0 &&
      (c[0].y = 0),
      S &&
      (
        l = 2 * Math.round(u.x / 2) != u.x,
        c[0].x = 2 * Math.round((c[0].x + 0.5) / 2),
        l &&
        c[0].x--
      ),
      c
  }

  GetPerimPts(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c = [],
      u = {},
      p = !1,
      d = {},
      D = {},
      g = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      h = this.StartPoint.x - g.x,
      m = this.StartPoint.y - g.y,
      C = this.EndPoint.x - g.x,
      y = this.EndPoint.y - g.y;
    if (
      t &&
      2 === (l = t.length) &&
      t[0].id &&
      t[0].id === ConstantData.HookPts.SED_KTL &&
      t[1].id &&
      t[1].id === ConstantData.HookPts.SED_KTR
    ) return c.push(
      new Point(this.StartPoint.x, this.StartPoint.y)
    ),
      c[0].id = t[0].id,
      c.push(new Point(this.EndPoint.x, this.EndPoint.y)),
      c[1].id = t[1].id,
      c;
    var f = T3Gv.optManager.GetObjectPtr(n, !1);
    if (
      f &&
      f.objecttype === ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY
    ) return c = ListManager.BaseLine.prototype.GetPerimPts.call(this, e, t, a, r, i, n);
    if (
      f &&
      f.objecttype === ConstantData.ObjectTypes.SD_OBJT_EXTRATEXTLABEL &&
      1 === l
    ) return c = ListManager.BaseLine.prototype.GetPerimPts.call(this, e, t, a, r, i, n);
    var L = this.CalcRadiusAndCenter(h, m, C, y, this.CurveAdjust, this.IsReversed);
    u.x = L.centerX + g.x,
      u.y = L.centerY + g.y,
      s = this.IsReversed,
      o = ListManager.BaseLine.prototype.GetPerimPts.call(this, e, t, a, r, i, n),
      (S = this.GetConnectLine()) ? (d = S.startpt, D = S.endpt, p = 2 * Math.round(t[0].x / 2) != t[0].x, s = !1) : (d = this.StartPoint, D = this.EndPoint),
      l = o.length;
    for (var I = 0; I < l; I++) c[I] = T3Gv.optManager.ChordToArc(d, D, u, L.radius, s, p, L.centerInside, o[I]),
      null != o[I].id &&
      (c[I].id = o[I].id);
    return c
  }

  MaintainPoint(e, t, a, r, i) {
    var n,
      o,
      s = {},
      l = {};
    switch (r, r.DrawingObjectBaseClass) {
      case ConstantData.DrawingObjectBaseClass.LINE:
        switch (r.LineType) {
          case ConstantData.LineType.SEGLINE:
          case ConstantData.LineType.ARCSEGLINE:
          case ConstantData.LineType.POLYLINE:
            for (n = - 1, o = 0; o < r.hooks.length; o++) if (r.hooks[o].targetid === t) {
              r.HookToPoint(r.hooks[o].hookpt, s),
                n = 0;
              break
            }
            if (0 !== n) return !0;
            l = Utils1.DeepCopy(r),
              Utils2.CopyRect(l.Frame, s),
              l.StartPoint.x = s.x,
              l.StartPoint.y = s.y,
              l.EndPoint.x = s.x + s.width,
              l.EndPoint.y = s.y + s.height,
              l
        }
        if (T3Gv.optManager.ArcCheckPoint(this, e)) return !0;
        if (T3Gv.optManager.Arc_Intersect(this, r, e)) return !0;
        T3Gv.optManager.Lines_MaintainDist(this, a, i, e);
        break;
      case ConstantData.DrawingObjectBaseClass.SHAPE:
        T3Gv.optManager.Lines_MaintainDist(this, a, i, e)
    }
    return !0
  }

}


export default ArcLine


// ListManager.ArcLine.prototype = new ListManager.BaseLine
// ListManager.ArcLine.prototype.constructor = ListManager.ArcLine
