





// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import T3Svg from '../../Hvac.SVG.t2';


// import {Evt_WorkAreaHammerClick,
//   Evt_WorkAreaHammerDragStart,
//   Evt_PolyLineDrawDragStart,
//   SDJS_LM_PolyLineDrawExtendHandlerFactory,
//   Evt_DrawReleaseHandlerFactory,
//   Evt_DrawTrackHandlerFactory
// }
// from '../../MouseEvent';

import { Type } from 'class-transformer'
import 'reflect-metadata'

import BaseLine from './S.BaseLine'
import EvtUtil from "../Event/EvtUtil";

import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/T3Gv'
import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
import Resources from '../Data/Resources'
import Element from "../Basic/B.Element";

import $ from 'jquery';

import ListManager from '../Data/ListManager'
import Global from '../Basic/Basic.Global';
import OptHandler from '../Opt/Opt.OptHandler';


import BaseShape from './S.BaseShape'






import Point from '../Model/Point'

import Document from '../Basic/B.Document'

import SDF from '../Data/ShapeDataUtil'
import Instance from '../Data/Instance/Instance'
import ConstantData from '../Data/ConstantData'
import PolyList from '../Model/PolyList'


import PolySeg from '../Model/PolySeg'
import HitResult from '../Model/HitResult'
import SelectionAttributes from '../Model/SelectionAttributes'
import RightClickData from '../Model/RightClickData'
import ConstantData1 from '../Data/ConstantData1'

class PolyLine extends BaseLine {


  // ListManager.PolyList = function () {
  //   "use strict";
  //   this.dim = {
  //     x: 0,
  //     y: 0
  //   },
  //     this.offset = {
  //       x: 0,
  //       y: 0
  //     },
  //     this.flags = 0,
  //     this.closed = 0,
  //     this.wasline = !0,
  //     this.Shape_Rotation = 0,
  //     this.Shape_DataID = -1,
  //     this.Shape_TableID = -1,
  //     this.segs = []
  // }

  // constructor(e) {

  //   console.log('ListManager.PolyLine', e);

  //   (e = e || {}).DrawingObjectBaseClass = ConstantData.DrawingObjectBaseClass.LINE,
  //     e.LineType = e.LineType || ConstantData.LineType.POLYLINE,
  //     this.polylist = e.polylist || new ListManager.PolyList,
  //     this.polylist.flags = ListManager.PolyListFlags.SD_PLF_FreeHand,
  //     this.StartPoint = e.StartPoint || {
  //       x: 0,
  //       y: 0
  //     },
  //     this.EndPoint = e.EndPoint || {
  //       x: 0,
  //       y: 0
  //     },
  //     this.CalcFrame(),
  //     this.hoplist = e.hoplist || {
  //       nhops: 0,
  //       hops: []
  //     },
  //     this.ArrowheadData = e.ArrowheadData || [],
  //     this.StartArrowID = e.StartArrowID || 0,
  //     this.EndArrowID = e.EndArrowID || 0,
  //     this.StartArrowDisp = e.StartArrowDisp || !1,
  //     this.EndArrowDisp = e.EndArrowDisp || !1,
  //     this.ArrowSizeIndex = e.ArrowSizeIndex || 0,
  //     this.RotateKnobPt = {
  //       x: 0,
  //       y: 0
  //     },
  //     this.TextDirection = e.TextDirection || !1;
  //   var t = ListManager.BaseLine.apply(this, [e]);
  //   if (t)
  //     return t
  // }


  @Type(() => PolyList)
  public polylist: any;

  public StartPoint: any;
  public EndPoint: any;
  public hoplist: any;
  public ArrowheadData: any;
  public StartArrowID: any;
  public EndArrowID: any;
  public StartArrowDisp: any;
  public EndArrowDisp: any;
  public ArrowSizeIndex: any;
  public RotateKnobPt: any;
  public TextDirection: any;


  constructor(e) {
    console.log('ListManager.PolyLine', e);

    e = e || {};
    e.DrawingObjectBaseClass = ConstantData.DrawingObjectBaseClass.LINE;
    e.LineType = e.LineType || ConstantData.LineType.POLYLINE;

    super(e);

    this.polylist = e.polylist || new PolyList();
    this.polylist.flags = ConstantData.PolyListFlags.SD_PLF_FreeHand;

    this.StartPoint = e.StartPoint || { x: 0, y: 0 };
    this.EndPoint = e.EndPoint || { x: 0, y: 0 };



    this.hoplist = e.hoplist || { nhops: 0, hops: [] };
    this.ArrowheadData = e.ArrowheadData || [];
    this.StartArrowID = e.StartArrowID || 0;
    this.EndArrowID = e.EndArrowID || 0;
    this.StartArrowDisp = e.StartArrowDisp || false;
    this.EndArrowDisp = e.EndArrowDisp || false;
    this.ArrowSizeIndex = e.ArrowSizeIndex || 0;
    this.RotateKnobPt = { x: 0, y: 0 };
    this.TextDirection = e.TextDirection || false;

    // var t = ListManager.BaseLine.apply(this, [e]);

    this.CalcFrame();

    // if (t) return t;
  }













  // ListManager.PolyLine.prototype = new ListManager.BaseLine,
  //   ListManager.PolyLine.prototype.constructor = ListManager.PolyLine,


  CreateShape(e, t) {

    console.log('ListManager.PolyLine.prototype.CreateShape', e, t);

    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible)
      return null;
    var a, r = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER), i = e.CreateShape(Document.CreateShapeType.PATH);
    i.SetID(ConstantData.SVGElementClass.SHAPE);
    var n = e.CreateShape(Document.CreateShapeType.POLYLINE);
    n.SetID(ConstantData.SVGElementClass.SLOP),
      n.ExcludeFromExport(!0),
      this.CalcFrame();
    var o = this.Frame
      , s = this.StyleRecord;
    if (null == (s = this.SVGTokenizerHook(s))) {
      var l = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
      l && (s = l.def.style)
    }
    s.Fill.Paint.Color;
    var S = s.Line.Paint.Color
      , c = s.Line.Thickness;
    s.Line.Thickness > 0 && s.Line.Thickness < 1 && (c = 1);
    var u = s.Line.Paint.Opacity
      , p = s.Line.LinePattern
      , d = o.width
      , D = o.height;
    r.SetSize(d, D),
      r.SetPos(this.Frame.x, this.Frame.y),
      i.SetSize(d, D),
      a = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, null),
      this.UpdateSVG(i, a),
      i.SetFillColor("none"),
      i.SetStrokeColor(S),
      i.SetStrokeOpacity(u),
      i.SetStrokeWidth(c),
      0 !== p && i.SetStrokePattern(p),
      n.SetSize(d, D),
      this.UpdateSVG(n, a),
      n.SetStrokeColor("white"),
      n.SetFillColor("none"),
      n.SetOpacity(0),
      t ? n.SetEventBehavior(Element.EventBehavior.HIDDEN_OUT) : n.SetEventBehavior(Element.EventBehavior.NONE),
      n.SetStrokeWidth(c + ConstantData.Defines.SED_Slop),
      r.AddElement(i),
      r.AddElement(n),
      this.ApplyStyles(i, s),
      this.ApplyEffects(r, !1, !0);
    var g = s.Fill.Hatch;
    if (g && 0 !== g && this.polylist && this.polylist.closed) {
      var h = e.CreateShape(Document.CreateShapeType.POLYGON);
      h.SetPoints(a),
        h.SetID(ConstantData.SVGElementClass.HATCH),
        h.SetSize(d, D),
        h.SetStrokeWidth(0),
        this.SetFillHatch(h, g),
        r.AddElement(h)
    }
    return r.isShape = !0,
      this.AddIcons(e, r),
      r
  }



  PostCreateShapeCallback(e, t, a, r) {

    console.log('= S.PolyLine PostCreateShapeCallback e,t,a,r', e, t, a, r);


    var i = t.GetElementByID(ConstantData.SVGElementClass.SHAPE)
      , n = t.GetElementByID(ConstantData.SVGElementClass.SLOP)
      , o = ConstantData1.ArrowheadLookupTable[this.StartArrowID]
      , s = ConstantData1.ArrowheadLookupTable[this.EndArrowID]
      , l = ConstantData1.ArrowheadSizeTable[this.ArrowSizeIndex];
    0 === o.id && (o = null),
      0 === s.id && (s = null),
      (o || s) && (i.SetArrowheads(o, l, s, l, this.StartArrowDisp, this.EndArrowDisp),
        n.SetArrowheads(o, l, s, l, this.StartArrowDisp, this.EndArrowDisp)),
      this.DataID >= 0 && this.LM_AddSVGTextObject(e, t),
      null != this.polylist && null != this.polylist.segs && this.polylist.segs.length > 1 && this.UpdateDimensionLines(t)
  }

  UpdateSVG(e, t) {

    console.log('ListManager.PolyLine.prototype.UpdateSVG', e, t);

    "use strict";
    var a, r, i = t.length;
    if (e && e.PathCreator) {
      for ((a = e.PathCreator()).BeginPath(),
        i > 1 && a.MoveTo(t[0].x, t[0].y),
        r = 1; r < i; r++)
        a.LineTo(t[r].x, t[r].y);
      this.polylist.closed && a.ClosePath(),
        a.Apply()
    }
  }

  SetFillHatch(e, t, a) {

    console.log('ListManager.PolyLine.prototype.SetFillHatch', e, t, a);

    if (-1 != t && 0 !== t) {
      var r = t - 1
        , i = {}
        , n = [];
      r < 10 && (r = "0" + r),
        i.url = Constants.FilePath_Hatches + Constants.HatchName + r + ".png",
        i.scale = 1,
        i.alignment = 0,
        i.dim = {
          x: 128,
          y: 128
        },
        e.SetTextureFill(i);
      var o = this.StyleRecord.Line.Paint.Color;
      a && (o = a),
        n.push({
          type: Effects.EffectType.RECOLOR,
          params: {
            color: o
          }
        }),
        e.Effects().SetEffects(n, this.Frame)
    } else
      e.SetFillColor("none")
  }

  GetDimensionPoints() {

    console.log('ListManager.PolyLine.prototype.GetDimensionPoints');

    "use strict";
    var e, t = [], a = [], r = 0, i = 0, n = 0, o = 0, s = {}, l = {};
    if (!this.polylist.closed && this.Dimensions & ConstantData.DimensionFlags.SED_DF_EndPts)
      t.push(new Point(this.StartPoint.x - this.Frame.x, this.StartPoint.y - this.Frame.y)),
        t.push(new Point(this.EndPoint.x - this.Frame.x, this.EndPoint.y - this.Frame.y));
    else if (!this.polylist.closed && this.Dimensions & ConstantData.DimensionFlags.SED_DF_Total) {
      for (a = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null),
        r = 1; r < a.length; r++)
        n = Math.abs(a[r - 1].x - a[r].x),
          o = Math.abs(a[r - 1].y - a[r].y),
          i += Math.sqrt(n * n + o * o);
      var S = {
        x: this.Frame.width / 2,
        y: this.Frame.height / 2
      };
      s.x = S.x - i / 2,
        s.y = S.y,
        t.push(new Point(s.x, s.y)),
        l.x = S.x + i / 2,
        l.y = S.y,
        t.push(new Point(l.x, l.y)),
        e = T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(new Point(0, 0), new Point(this.Frame.width, this.Frame.height)),
        Utils3.RotatePointsAboutPoint(S, e, t)
    } else
      t = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null);
    return t
  }

  DimensionLineDeflectionAdjust(e, t, a, r, i) {

    console.log('== track UpdateDimensionsLines Shape.PolyLine-> DimensionLineDeflectionAdjust')


    var n = i.segmentIndex;
    this.polylist && this.polylist.segs && 0 !== this.polylist.segs.length && (n < 0 || n >= this.polylist.segs.length || (this.polylist.segs[n].dimDeflection = this.GetDimensionLineDeflection(e, t, a, i),
      this.UpdateDimensionLines(e),
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select && this.HideOrShowSelectOnlyDimensions(!0)))
  }

  GetDimensionDeflectionValue(e) {
    if (!(!this.polylist || !this.polylist.segs || 0 === this.polylist.segs.length || e < 0 || e >= this.polylist.segs.length))
      return this.polylist.segs[e].dimDeflection
  }

  GetDimensionFloatingPointValue(e) {
    "use strict";
    var t = 0
      , a = {};
    if (!(this.rflags & ConstantData.FloatingPointDim.SD_FP_Width || this.rflags & ConstantData.FloatingPointDim.SD_FP_Height))
      return null;
    if (!this.GetPolyRectangularInfo(a))
      return null;
    if (a.wdDim === e || a.wdDim + 2 === e) {
      if (this.rflags & ConstantData.FloatingPointDim.SD_FP_Width)
        return t = this.GetDimensionLengthFromValue(this.rwd),
          this.GetLengthInRulerUnits(t)
    } else if ((a.htDim === e || a.htDim + 2 === e) && this.rflags & ConstantData.FloatingPointDim.SD_FP_Height)
      return t = this.GetDimensionLengthFromValue(this.rht),
        this.GetLengthInRulerUnits(t);
    return null
  }

  UpdateDrawing(e) {

    console.log('ListManager.PolyLine.prototype.UpdateDrawing', e);

    console.log('== track UpdateDimensionsLines Shape.PolyLine-> UpdateDrawing')


    var t = e.GetElementByID(ConstantData.SVGElementClass.SHAPE)
      , a = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
    this.CalcFrame();
    var r = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, null);
    e.SetSize(this.Frame.width, this.Frame.height),
      e.SetPos(this.Frame.x, this.Frame.y),
      t.SetSize(this.Frame.width, this.Frame.height),
      this.UpdateSVG(t, r),
      a.SetSize(this.Frame.width, this.Frame.height),
      this.UpdateSVG(a, r);
    var i = e.GetElementByID(ConstantData.SVGElementClass.HATCH);
    i && (i.SetPoints(r),
      i.SetSize(this.Frame.width, this.Frame.height)),
      null != this.polylist && null != this.polylist.segs && this.polylist.segs.length > 1 && this.UpdateDimensionLines(e)
  }

  ScaleEndPoints() {

    console.log('ListManager.PolyLine.prototype.ScaleEndPoints');

    "use strict";
    var e, t, a, r, i = {
      x: 0,
      y: 0
    };
    e = this.Frame.width / this.polylist.dim.x,
      t = this.Frame.height / this.polylist.dim.y,
      1 === e && 1 === t || (i.x = this.Frame.x + this.Frame.width / 2,
        i.y = this.Frame.y + this.Frame.height / 2,
        a = i.x - this.StartPoint.x,
        this.StartPoint.x = i.x - a * e,
        r = i.y - this.StartPoint.y,
        this.StartPoint.y = i.y - r * t,
        a = i.x - this.EndPoint.x,
        this.EndPoint.x = i.x - a * e,
        r = i.y - this.EndPoint.y,
        this.EndPoint.y = i.y - r * t)
  }

  UpdateFrame(e) {

    // ListManager.BaseLine.prototype.UpdateFrame.call(this, e),
    //   this.polylist.closed && this.StyleRecord && this.StyleRecord.Line

    // ListManager.BaseLine.prototype.UpdateFrame.call(this, e);
    super.UpdateFrame(e);
    if (this.polylist.closed && this.StyleRecord && this.StyleRecord.Line) {
      // Additional logic can be added here if needed
    }
  }

  CalcFrame() {

    console.log('ListManager.PolyLine.prototype.CalcFrame');

    var e, t = [], a = {};
    this.polylist && (this.polylist.dim.x = 0,
      this.polylist.dim.y = 0,
      (t = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null)) && t.length && (Utils2.GetPolyRect(a, t),
        a.width < 1 && (a.width = 1),
        a.height < 1 && (a.height = 1),
        this.polylist.closed ? (this.polylist.dim.x = a.width,
          this.polylist.dim.y = a.height,
          this.StyleRecord && this.StyleRecord.Line &&
            (this.StyleRecord.Line.BThick ||
              // this instanceof ListManager.PolyLineContainer
              // this instanceof GlobalDataShape.PolyLineContainer
              this instanceof Instance.Shape.PolyLineContainer

            ) ? (this.inside = $.extend(!0, {}, a),
              this.Frame = $.extend(!0, {}, a),
              e = this.StyleRecord.Line.Thickness,
              Utils2.InflateRect(this.inside, -e / 2, -e / 2)) : (this.inside = $.extend(!0, {}, a),
                this.Frame = $.extend(!0, {}, a),
                this.StyleRecord && this.StyleRecord.Line && (e = this.StyleRecord.Line.Thickness))) : this.Frame = $.extend(!0, {}, a)));
    this.UpdateFrame(this.Frame)
  }

  GetSVGFrame(e) {

    console.log('ListManager.PolyLine.prototype.GetSVGFrame', e);

    var t = {};
    return null == e && (e = this.Frame),
      Utils2.CopyRect(t, e),
      t
  }

  GetDimensions() {
    var e = {};
    return e.x = this.Frame.width,
      e.y = this.Frame.height,
      e
  }

  SetSize(e, t, a) {
    var r, i, n = !1, o = !1, s = 0, l = 0, S = 1, c = 1, u = {};
    if (e && (Utils2.IsEqual(this.Frame.width, 0) || (S = e / this.Frame.width)),
      t && (Utils2.IsEqual(this.Frame.height, 0) || (c = t / this.Frame.height)),
      r = this.polylist.segs.length,
      1 != S || 1 != c)
      for (i = 0; i < r; i++)
        this.polylist.segs[i].pt.x *= S,
          this.polylist.segs[i].pt.y *= c;
    this.StartPoint.x <= this.EndPoint.x && (n = !0),
      this.StartPoint.y <= this.EndPoint.y && (o = !0),
      u.x = this.EndPoint.x,
      u.y = this.EndPoint.y,
      this.EndPoint.x = this.StartPoint.x + this.polylist.segs[r - 1].pt.x,
      this.EndPoint.y = this.StartPoint.y + this.polylist.segs[r - 1].pt.y,
      n || (s = u.x - this.EndPoint.x) && (this.StartPoint.x += s,
        this.EndPoint.x += s),
      o || (l = u.y - this.EndPoint.y) && (this.StartPoint.y += l,
        this.EndPoint.y += l),
      this.rflags && (this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !1)),
      this.CalcFrame(),
      T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE)
  }

  UpdateDimensions(e, t, a) {
    var r, i, n = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    r = t ? this.StartPoint.x + t : this.EndPoint.x,
      i = a ? this.StartPoint.y + a : this.EndPoint.y,
      this.AdjustLineEnd(n, r, i, ConstantData.ActionTriggerType.LINEEND)
  }

  GetApparentAngle(e) {
    "use strict";
    var t, a;
    return a = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
      (t = this.PolyHitSeg(e)) < 0 ? 0 : this.GetDrawNormalizedAngle(a[t - 1], a[t])
  }

  SnapPointToSegment(e, t) {
    "use strict";
    var a = {}
      , r = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null)
      , i = 360 - Utils1.CalcAngleFromPoints(r[e - 1], r[e]);
    i >= 360 && (i = 0);
    var n = 2 * Math.PI * (i / 360);
    Utils2.GetPolyRect(a, r),
      Utils3.RotatePointsAboutCenter(a, -n, r),
      Utils3.RotatePointsAboutCenter(a, -n, [t]),
      t.y = r[e].y,
      Utils3.RotatePointsAboutCenter(a, n, [t])
  }

  CalcTextPosition = function (e) {
    var t, a, r, i, n, o, s, l, S, c, u, p, d, D, g = [], h = {}, m = {}, C = [], y = {}, f = {}, L = 0, I = {}, T = 0, b = Utils1.DeepCopy(this), M = new SDF.Result;
    b.BlockID = -1,
      SDF.SD_UpdateVisioGroupFrame(b, M, !0);
    var P = b.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, g);
    tcenter = {
      x: e.Frame.x + e.Frame.width / 2,
      y: e.Frame.y + e.Frame.height / 2
    },
      t = g.length;
    var R = function (e, t, a) {
      var r, i, n, o = 0;
      for (n = t; n < a; n++)
        r = e[n - 1].x - e[n].x,
          i = e[n - 1].y - e[n].y,
          o += Utils2.sqrt(r * r + i * i);
      return o
    };
    for (a = 0; a < t; a++) {
      if (0 == a)
        h.x = P[0].x,
          h.y = P[0].y,
          n = 0;
      else {
        if (g[a] === g[a - 1])
          continue;
        h.x = P[g[a - 1]].x,
          h.y = P[g[a - 1]].y,
          n = g[a - 1]
      }
      if (m.x = P[g[a]].x,
        m.y = P[g[a]].y,
        o = g[a] + 1,
        Utils2.GetPolyRect(I, P, n, o),
        d = R(P, n + 1, o),
        0 === I.width && Utils2.InflateRect(I, 5, 0),
        0 === I.height && Utils2.InflateRect(I, 0, 5),
        y.x = tcenter.x,
        y.y = I.y,
        f.y = tcenter.y,
        f.x = I.x,
        Utils2.pointInRect(I, y) || Utils2.pointInRect(I, f))
        for (S = 0,
          s = n + 1; s < o; s++) {
          h.x = P[s - 1].x,
            h.y = P[s - 1].y,
            m.x = P[s].x,
            m.y = P[s].y,
            c = h.x - m.x,
            u = h.y - m.y,
            l = Math.sqrt(c * c + u * u),
            i = {
              x: (h.x + m.x) / 2,
              y: (h.y + m.y) / 2
            },
            (C = []).push(h),
            D = $.extend(!0, {}, tcenter),
            C.push(D),
            C.push(m);
          var A = (r = T3Gv.optManager.SD_GetClockwiseAngleBetween2PointsInRadians(h, m)) * (180 / ConstantData.Geometry.PI) % 180;
          !1 === Utils2.IsEqual(A, 0) && 0 === e.RotationAngle && (this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_HorizText, !0)),
            Utils3.RotatePointsAboutPoint(i, r, C),
            u = C[1].y - C[0].y,
            (void 0 === p || Math.abs(u) < Math.abs(p)) && (a,
              p = u,
              T = L + S + C[1].x - h.x),
            S += l
        }
      L += d
    }
    0 === T && (T = L / 2),
      this.LineTextX = T / L,
      this.LineTextY = p,
      this.LineTextX && (this.trect = $.extend(!0, {}, e.trect))
  }

  GetTextOnLineParams(e) {
    var t, a, r, i = {
      Frame: new ListManager.Rect,
      StartPoint: new Point,
      EndPoint: new Point
    }, n = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null), o = n.length;
    n[0].x < n[o - 1].x ? (t = 0,
      a = o - 2) : (t = o - 2,
        a = 0),
      r = Math.round((o - 1.1) / 2);
    var s = .5
      , l = this.TextAlign;
    switch (this.LineTextX && (s = this.LineTextX,
      l = ConstantData.TextAlign.CENTER),
    l) {
      case ConstantData.TextAlign.TOPLEFT:
      case ConstantData.TextAlign.LEFT:
      case ConstantData.TextAlign.BOTTOMLEFT:
        i.StartPoint.x = n[t].x,
          i.StartPoint.y = n[t].y,
          i.EndPoint.x = n[t + 1].x,
          i.EndPoint.y = n[t + 1].y;
        break;
      case ConstantData.TextAlign.TOPRIGHT:
      case ConstantData.TextAlign.RIGHT:
      case ConstantData.TextAlign.BOTTOMRIGHT:
        i.StartPoint.x = n[a].x,
          i.StartPoint.y = n[a].y,
          i.EndPoint.x = n[a + 1].x,
          i.EndPoint.y = n[a + 1].y;
        break;
      default:
        r = function (e, t) {
          var a, r, i, s, l, S, c, u = 0, p = [];
          for (a = 1; a < o; a++)
            s = n[a],
              l = n[a - 1],
              S = void 0,
              c = void 0,
              S = s.x - l.x,
              c = s.y - l.y,
              r = Utils2.sqrt(S * S + c * c),
              p.push(r),
              u += r;
          for (i = e * u,
            a = 0; a < o - 1; a++) {
            if (i < p[a]) {
              var d = i / p[a];
              return t.CenterProp = d,
                a
            }
            i -= p[a]
          }
          return Math.round((o - 1.1) / 2)
        }(s, i),
          i.StartPoint.x = n[r].x,
          i.StartPoint.y = n[r].y,
          i.EndPoint.x = n[r + 1].x,
          i.EndPoint.y = n[r + 1].y
    }
    return i.Frame = Utils1.DeepCopy(this.Frame),
      i
  }

  AddCorner(e, t) {

    console.log('ListManager.PolyLine.prototype.AddCorner', e, t);


    "use strict";
    var a, r, i, n, o, s, l, S, c, u = !1, p = this.PolyHitSeg(t), d = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLinksBlockID, !1), D = (Utils1.DeepCopy(this),
      []);
    if (null == e && (e = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID)),
      null != e && void 0 !== this.polylist.segs[p]) {
      if (Collab.AllowMessage()) {
        Collab.BeginSecondaryEdit();
        var g = {
          BlockID: this.BlockID
        };
        g.point = {
          x: t.x,
          y: t.y
        }
      }
      for (D = T3Gv.optManager.GetHookList(d, D, this.BlockID, this, ConstantData.ListCodes.SED_LC_MOVEHOOK, {}),
        S = 0; S < D.length; S++)
        T3Gv.objectStore.PreserveBlock(D[S]);
      this.polylist.segs[p].LineType == ConstantData.LineType.LINE && this.SnapPointToSegment(p, t),
        n = p + 1;
      if (this.polylist.closed || (1 === p && (n = 1,
        u = !0),
        p === this.polylist.segs.length - 1 && (u = !0)),
        u) {
        var h = []
          , m = {
            x: this.polylist.segs[p - 1].pt.x,
            y: this.polylist.segs[p - 1].pt.y
          };
        h.push(m);
        var C = {
          x: this.polylist.segs[p].pt.x,
          y: this.polylist.segs[p].pt.y
        };
        h.push(C);
        var y = {
          x: t.x - this.StartPoint.x,
          y: t.y - this.StartPoint.y
        };
        h.push(y),
          (c = 360 - (c = Utils1.CalcAngleFromPoints(h[0], h[1]))) >= 360 && (c -= 360);
        var f = 2 * Math.PI * (c / 360);
        if (Utils3.RotatePointsAboutCenter(this.Frame, -f, h),
          i = new PolySeg(this.polylist.segs[p].LineType, t.x - this.StartPoint.x, t.y - this.StartPoint.y),
          this.polylist.segs.splice(p, 0, i),
          this.polylist.segs.length,
          1 === p) {
          h[0].x = h[2].x,
            h[0].y += 50,
            Utils3.RotatePointsAboutCenter(this.Frame, f, h);
          var L = h[0].x + this.StartPoint.x
            , I = h[0].y + this.StartPoint.y;
          this.polylist.segs[0].pt.x = 0,
            this.polylist.segs[0].pt.y = 0,
            this.AdjustLineStart(null, L, I, ConstantData.ActionTriggerType.LINESTART)
        } else {
          h[1].x = h[2].x,
            h[1].y += 50,
            Utils3.RotatePointsAboutCenter(this.Frame, f, h);
          L = h[1].x + this.StartPoint.x,
            I = h[1].y + this.StartPoint.y;
          this.AdjustLineEnd(null, L, I, ConstantData.ActionTriggerType.LINEEND)
        }
      } else {
        switch (i = new PolySeg(this.polylist.segs[p].LineType, t.x - this.StartPoint.x, t.y - this.StartPoint.y),
        this.polylist.segs.splice(p, 0, i),
        u || (i = new PolySeg(this.polylist.segs[p].LineType, t.x - this.StartPoint.x, t.y - this.StartPoint.y),
          this.polylist.segs.splice(p, 0, i)),
        (o = Number(gDocumentHandler.rulerSettings.majorScale)) >= 2 ? (s = Math.abs(o - this.polylist.segs.length),
          s %= o,
          s++) : s = o / (this.polylist.segs.length % 4 + 1),
        l = s.toString(),
        gDocumentHandler.rulerSettings.units) {
          case ConstantData.RulerUnits.SED_Feet:
            l += "'";
            break;
          case ConstantData.RulerUnits.SED_Inches:
            l += '"'
        }
        var T = this.Dimensions;
        this.UpdateDimensionFromText(e, l, {
          segment: n
        }),
          this.Dimensions = T
      }
      T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE);
      var b = this.hooks.length;
      for (S = 0; S < b; S++)
        T3Gv.optManager.SetLinkFlag(this.hooks[S].objid, ConstantData.LinkFlags.SED_L_MOVE);
      if (T3Gv.optManager.ActionTriggerData = p,
        this.Frame.x < 0 || this.Frame.y < 0) {
        var M = this.Frame;
        M.x < 0 && (a = -M.x,
          M.x += a),
          M.y < 0 && (r = -M.y,
            (

              this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always || this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select
              // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always || this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select

            ) && (r += ConstantData.Defines.DimensionDefaultStandoff),
            M.y += r),
          this.StartPoint.x += a,
          this.StartPoint.y += r,
          this.EndPoint.x += a,
          this.EndPoint.y += r,
          T3Gv.optManager.SetObjectFrame(this.BlockID, M)
      }
      if (this.UpdateDrawing(e),
        -1 != this.DataID) {
        var P = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
        this.LM_ResizeSVGTextObject(P, this, this.Frame)
      }
      T3Gv.optManager.ShowSVGSelectionState(e.GetID(), !0),
        Collab.AllowMessage() && Collab.BuildMessage(ConstantData.CollabMessages.AddCorner, g, !1),
        T3Gv.optManager.CompleteOperation(null)
    }
  }

  GetKnobSize(e) {
    return ConstantData.Defines.SED_KnobSize
  }

  GetCornerKnobImages() {
    return null
  }

  CreateActionTriggers(e, t, a, r) {

    console.log('ListManager.PolyLine.prototype.CreateActionTriggers', e, t, a, r);


    var i, n, o, s, l, S, c, u, p, d, D, g, h, m, C = !this.NoRotate(), y = {}, f = e.CreateShape(Document.CreateShapeType.GROUP), L = ConstantData.Defines.SED_RKnobSize, I = {}, T = {}, b = this.GetCornerKnobImages();
    o = this.GetKnobSize(e);
    var M = e.docInfo.docToScreenScale;
    e.docInfo.docScale <= .5 && (M *= 2);
    var P = o / M
      , R = L / M;
    if (0 !== (D = this.polylist && this.polylist.segs ? this.polylist.segs.length : 0)) {
      this.polylist.closed && this.polylist.dim.x && this.polylist.dim.y ? (S = this.polylist.dim.x,
        (c = this.polylist.dim.y) < 1 && (c = 1),
        S < 1 && (S = 1),
        u = this.Frame.width / S,
        p = this.Frame.height / c) : (u = 1,
          p = 1);
      var A = (n = this.Frame).width
        , _ = n.height
        , E = T3Gv.optManager.GetObjectPtr(t, !1);
      A += P,
        _ += P;
      var w = $.extend(!0, {}, n);
      w.x -= P / 2,
        w.y -= P / 2,
        w.width += P,
        w.height += P;
      var F, v, G = {
        svgDoc: e,
        shapeType: Document.CreateShapeType.RECT,
        knobSize: P,
        fillColor: "black",
        fillOpacity: 1,
        strokeSize: 1,
        strokeColor: "#777777",
        cursorType: this.CalcCursorForSegment(this.StartPoint, this.EndPoint, !1),
        locked: !1
      };
      if (b && (G.strokeSize = 0,
        delete G.strokeColor,
        delete G.fillColor,
        G.shapeType = Document.CreateShapeType.IMAGE),
        t != r && (G.fillColor = "white",
          G.fillOpacity = 0,
          G.strokeSize = 1,
          G.strokeColor = "black"),
        this.flags & ConstantData.ObjFlags.SEDO_Lock ? (G.fillColor = "gray",
          G.locked = !0) : this.NoGrow() && (G.fillColor = "red",
            G.strokeColor = "red",
            G.cursorType = Element.CursorType.DEFAULT),
        !this.polylist.closed) {
        if (G.x = this.StartPoint.x - n.x,
          G.y = this.StartPoint.y - n.y,
          G.knobID = ConstantData.ActionTriggerType.LINESTART,
          D > 1 && (G.cursorType = this.CalcCursorForSegment(this.polylist.segs[0].pt, this.polylist.segs[1].pt, !1)),
          E && E.hooks)
          for (l = 0; l < E.hooks.length; l++)
            if (E.hooks[l].hookpt == ConstantData.HookPts.SED_KTL) {
              G.shapeType = Document.CreateShapeType.OVAL,
                C = !1;
              break
            }
        this.NoGrow() && (G.cursorType = Element.CursorType.DEFAULT),
          d = this.GenericKnob(G),
          b && d && d.SetURL && d.SetURL(G.cursorType === Element.CursorType.NWSE_RESIZE ? b.nwse : b.nesw),
          f.AddElement(d)
      }
      if (G.shapeType = Document.CreateShapeType.RECT,
        b && (G.shapeType = Document.CreateShapeType.IMAGE),
        E && E.hooks)
        for (l = 0; l < E.hooks.length; l++)
          if (E.hooks[l].hookpt == ConstantData.HookPts.SED_KTR) {
            G.shapeType = Document.CreateShapeType.OVAL,
              C = !1;
            break
          }
      for (G.x = this.EndPoint.x - n.x,
        G.y = this.EndPoint.y - n.y,
        this.polylist.closed ? (G.knobID = ConstantData.ActionTriggerType.POLYLEND,
          D > 3 ? G.cursorType = this.CalcCursorForSegment(this.polylist.segs[1].pt, this.polylist.segs[D - 2].pt, !0) : D > 1 && (G.cursorType = this.CalcCursorForSegment(this.polylist.segs[D - 1].pt, this.polylist.segs[D - 2].pt, !1))) : (G.knobID = ConstantData.ActionTriggerType.LINEEND,
            D > 1 && (G.cursorType = this.CalcCursorForSegment(this.polylist.segs[D - 1].pt, this.polylist.segs[D - 2].pt, !1))),
        this.NoGrow() && (G.cursorType = Element.CursorType.DEFAULT),
        d = this.GenericKnob(G),
        b && d.SetURL && (d.SetURL(G.cursorType === Element.CursorType.NWSE_RESIZE ? b.nwse : b.nesw),
          d.ExcludeFromExport(!0)),
        f.AddElement(d),
        G.shapeType = Document.CreateShapeType.RECT,
        b && (G.shapeType = Document.CreateShapeType.IMAGE),
        l = 1; l < D; l++)
        switch (G.cursorType = this.CalcCursorForSegment(this.polylist.segs[l - 1].pt, this.polylist.segs[l].pt, !0),
        this.NoGrow() && (G.cursorType = Element.CursorType.DEFAULT),
        this.polylist.segs[l].LineType) {
          case ConstantData.LineType.NURBS:
          case ConstantData.LineType.QUADBEZ:
          case ConstantData.LineType.CUBEBEZ:
          case ConstantData.LineType.ELLIPSE:
          case ConstantData.LineType.SPLINE:
            var N = this.polylist.segs[l + 1].LineType;
            for (i = 0; l + i + 1 < this.polylist.segs.length && this.polylist.segs[l + i + 1].LineType == N;)
              i++;
            for (i++,
              v = G.knobSize / 2,
              s = l; s < l + i; s++)
              (F = e.CreateShape(Document.CreateShapeType.LINE)).SetPoints(this.polylist.segs[s - 1].pt.x + this.StartPoint.x - n.x + v, this.polylist.segs[s - 1].pt.y + this.StartPoint.y - n.y + v, this.polylist.segs[s].pt.x + this.StartPoint.x - n.x + v, this.polylist.segs[s].pt.y + this.StartPoint.y - n.y + v),
                F.SetFillColor("none"),
                F.SetStrokeColor("#A0A0A0"),
                F.SetStrokePattern("2,1"),
                F.SetStrokeOpacity(1),
                F.SetStrokeWidth(1),
                f.AddElement(F)
        }
      if (this.polylist && this.polylist.segs)
        for (i = this.polylist.segs.length,
          l = 1; l < i - 1; l++) {
          if (1 == l)
            switch (this.polylist.segs[l].LineType) {
              case ConstantData.LineType.QUADBEZ:
              case ConstantData.LineType.CUBEBEZ:
              case ConstantData.LineType.NURBS:
              case ConstantData.LineType.ELLIPSE:
              case ConstantData.LineType.SPLINE:
                continue
            }
          if (2 == l)
            switch (this.polylist.segs[l].LineType) {
              case ConstantData.LineType.NURBSSEG:
              case ConstantData.LineType.SPLINECON:
                continue
            }
          G.x = this.polylist.segs[l].pt.x + this.StartPoint.x - n.x,
            G.y = this.polylist.segs[l].pt.y + this.StartPoint.y - n.y,
            G.cursorType = this.CalcCursorForSegment(this.polylist.segs[l - 1].pt, this.polylist.segs[l + 1].pt, !0),
            this.NoGrow() && (G.cursorType = Element.CursorType.DEFAULT),
            G.knobID = ConstantData.ActionTriggerType.POLYLNODE,
            (d = this.GenericKnob(G)).SetUserData(l),
            b && d.SetURL && (d.SetURL(G.cursorType === Element.CursorType.NWSE_RESIZE ? b.nwse : b.nesw),
              d.ExcludeFromExport(!0)),
            f.AddElement(d)
        }
      for (I.StartPoint = new Point(0, 0),
        I.EndPoint = new Point(0, 0),
        g = this.StartPoint.x - n.x,
        h = this.StartPoint.y - n.y,
        G.shapeType = Document.CreateShapeType.OVAL,
        G.knobID = ConstantData.ActionTriggerType.POLYLADJ,
        G.fillColor = "white",
        G.fillOpacity = .001,
        G.strokeSize = 1,
        G.strokeColor = "green",
        l = 1; l < D; l++)
        switch (G.cursorType = this.CalcCursorForSegment(this.polylist.segs[l - 1].pt, this.polylist.segs[l].pt, !0),
        this.NoGrow() && (G.cursorType = Element.CursorType.DEFAULT),
        this.polylist.segs[l].LineType) {
          case ConstantData.LineType.ARCLINE:
            I.StartPoint.x = this.polylist.segs[l - 1].pt.x * u + g,
              I.StartPoint.y = this.polylist.segs[l - 1].pt.y * p + h,
              I.EndPoint.x = this.polylist.segs[l].pt.x * u + g,
              I.EndPoint.y = this.polylist.segs[l].pt.y * p + h,
              this.polylist.segs[l].param >= 0 ? (I.CurveAdjust = this.polylist.segs[l].param,
                I.IsReversed = !0) : (I.CurveAdjust = -this.polylist.segs[l].param,
                  I.IsReversed = !1),
              I.FromPolygon = !0,
              T = (m = new ListManager.ArcLine(I)).CalcRadiusAndCenter(m.StartPoint.x, m.StartPoint.y, m.EndPoint.x, m.EndPoint.y, m.CurveAdjust, m.IsReversed),
              G.x = T.actionX,
              G.y = T.actionY,
              (d = this.GenericKnob(G)).SetUserData(l),
              f.AddElement(d);
            break;
          case ConstantData.LineType.PARABOLA:
            (y = this.Pr_PolyLGetParabolaAdjPoint(!0, l)) && (G.x = y.x + this.StartPoint.x - n.x,
              G.y = y.y + this.StartPoint.y - n.y,
              (d = this.GenericKnob(G)).SetUserData(l),
              f.AddElement(d));
            break;
          case ConstantData.LineType.ARCSEGLINE:
            y = this.Pr_PolyLGetEllipseAdjPoint(!0, l),
              G.x = y.x + this.StartPoint.x - n.x,
              G.y = y.y + this.StartPoint.y - n.y,
              (d = this.GenericKnob(G)).SetUserData(l),
              f.AddElement(d)
        }
      return T3Gv.optManager.touchInitiated && (C = !1),
        !C || G.locked || this.NoGrow() || (G.shapeType = Document.CreateShapeType.OVAL,
          n.width < n.height ? (G.x = n.width / 2,
            G.y = n.height - 2 * R) : (G.y = n.height / 2,
              G.x = n.width - 2 * R),
          this.RotateKnobPt.x = G.x + n.x,
          this.RotateKnobPt.y = G.y + n.y,
          G.cursorType = Element.CursorType.ROTATE,
          G.knobID = ConstantData.ActionTriggerType.ROTATE,
          G.fillColor = "white",
          G.fillOpacity = .5,
          G.strokeSize = 1.5,
          G.strokeColor = "black",
          G.knobSize = R,
          d = this.GenericKnob(G),
          f.AddElement(d),
          G.knobSize = P),
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff && this.CanUseStandOffDimensionLines() && this.CreateDimensionAdjustmentKnobs(f, a, G),
        f.SetSize(A, _),
        f.SetPos(w.x, w.y),
        f.isShape = !0,
        f.SetID(ConstantData.Defines.Action + t),
        f
    }
  }

  ScaleObject(e, t, a, r, i, n, o) {
    var s, l, S, c, u = {}, p = {}, d = {}, D = {}, g = [];
    if (0 === i) {
      if (!(this.polylist.dim.x > 0 && this.polylist.dim.y > 0))
        return;
      i = this.inside.width / this.polylist.dim.x,
        n = this.inside.height / this.polylist.dim.y,
        this.StartPoint.x = this.Frame.x + this.polylist.offset.x,
        this.StartPoint.y = this.Frame.y + this.polylist.offset.y
    }
    if (this.rflags && (this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
      this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !1)),
      1 != i || 1 != n) {
      if (o) {
        var h = i;
        n > h && (h = n),
          this.StyleRecord.Line.Thickness = h * this.StyleRecord.Line.Thickness,
          this.StyleRecord.Line.BThick = h * this.StyleRecord.Line.BThick
      }
      for (p.x = this.StartPoint.x - this.Frame.x,
        p.y = this.StartPoint.y - this.Frame.y,
        d.x = p.x * i,
        d.y = p.y * n,
        s = this.polylist.segs.length,
        l = 1; l < s; l++)
        switch (this.polylist.segs[l].LineType) {
          case ConstantData.LineType.PARABOLA:
            0 !== this.polylist.segs[l].param && l > 0 && ((S = this.Pr_PolyLGetParabolaAdjPoint(!0, l)) ? (S.x += this.StartPoint.x,
              S.y += this.StartPoint.y,
              g[l] = new Point(S.x, S.y)) : (this.polylist.segs[l].param = 0,
                this.polylist.segs[l].ShortRef = 0));
            break;
          case ConstantData.LineType.ARCLINE:
            0 !== this.polylist.segs[l].param && l > 0 && (c = this.Pr_PolyLGetArc(l, p),
              g[l] = c.pt)
        }
      for (this.StartPoint.x = this.StartPoint.x * i,
        this.StartPoint.y = this.StartPoint.y * n,
        this.EndPoint.x = this.EndPoint.x * i,
        this.EndPoint.y = this.EndPoint.y * n,
        l = 0; l < s; l++)
        switch (this.polylist.segs[l].LineType) {
          case ConstantData.LineType.PARABOLA:
            this.polylist.segs[l].pt.x *= i,
              this.polylist.segs[l].pt.y *= n,
              0 !== this.polylist.segs[l].param && l > 0 && (D.x = g[l].x * i,
                D.y = g[l].y * n,
                this.Pr_PolyLGetParabolaParam(D, l));
            break;
          case ConstantData.LineType.ARCLINE:
            this.polylist.segs[l].pt.x *= i,
              this.polylist.segs[l].pt.y *= n,
              0 !== this.polylist.segs[l].param && l > 0 && (c = this.Pr_PolyLGetArc(l, d),
                u.x = g[l].x * i,
                u.y = g[l].y * n,
                this.Pr_PolyLGetArcParam(c.arcobj, u, l));
            break;
          default:
            this.polylist.segs[l].pt.x *= i,
              this.polylist.segs[l].pt.y *= n
        }
      // if (this instanceof ListManager.BaseShape)
      if (this instanceof BaseShape)
        return this.polylist.offset.x = d.x,
          this.polylist.offset.y = d.y,
          this.polylist.dim.x = this.inside.width,
          void (this.polylist.dim.y = this.inside.height)
    } else if
      //DOUBLE === TODO
      // (this instanceof ListManager.BaseShape)
      (this instanceof BaseShape)
      return;
    var m = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null);
    for (s = m.length,
      l = 0; l < s; l++)
      m[l].x += e,
        m[l].y += t;
    if (r) {
      var C = 2 * Math.PI * (r / 360);
      Utils3.RotatePointsAboutPoint(a, 2 * Math.PI - C, m)
    }
    for (this.StartPoint.x = m[0].x,
      this.StartPoint.y = m[0].y,
      l = 0; l < s; l++)
      this.polylist.segs[l].pt.x = m[l].x - this.StartPoint.x,
        this.polylist.segs[l].pt.y = m[l].y - this.StartPoint.y;
    this.EndPoint.x = m[s - 1].x,
      this.EndPoint.y = m[s - 1].y,
      this.CalcFrame()
  }

  GetScale() {
    var e, t, a, r = {
      x: 0,
      y: 0
    };
    return this.polylist.closed && this.polylist.dim.x && this.polylist.dim.y ? (e = this.polylist.dim.x,
      (t = this.polylist.dim.y) < 1 && (t = 1),
      e < 1 && (e = 1),
      a = this.inside.width / e,
      this.inside.height / t) : (a = 1,
        1),
      r.x = a,
      r.y = a,
      r
  }

  GetPolyPoints(e, t, a, r, i) {
    var n, o, s, l, S, c, u, p, d, D, g, h, m, C = [], y = {}, f = 0, L = 0, I = 0;
    if (p = this.StartPoint.x - this.Frame.x,
      d = this.StartPoint.y - this.Frame.y,
      this.polylist && this.polylist.segs.length) {
      if (this.polylist.closed && this.polylist.dim.x && this.polylist.dim.y ? (l = this.polylist.dim.x,
        (S = this.polylist.dim.y) < 1 && (S = 1),
        l < 1 && (l = 1),
        c = this.inside.width / l,
        u = this.inside.height / S) : (c = 1,
          u = 1),
        s = this.polylist.segs.length,
        a)
        for (o = 0; o < s; o++)
          C.push(new Point(this.polylist.segs[o].pt.x * c + p, this.polylist.segs[o].pt.y * u + d));
      else
        for (C.push(new Point(this.polylist.segs[0].pt.x * c + p, this.polylist.segs[0].pt.y * u + d)),
          o = 1; o < s; o++) {
          switch (!1,
          this.polylist.segs[o].LineType) {
            case ConstantData.LineType.LINE:
            case ConstantData.LineType.MOVETO:
            case ConstantData.LineType.MOVETO_NEWPOLY:
              C.push(new Point(this.polylist.segs[o].pt.x * c + p, this.polylist.segs[o].pt.y * u + d));
              break;
            case ConstantData.LineType.NURBS:
              if (o < s - 1 && this.polylist.segs[o + 1].LineType == ConstantData.LineType.NURBSSEG) {
                for (var T = 0; o + T + 1 < s && this.polylist.segs[o + T + 1].LineType == ConstantData.LineType.NURBSSEG;)
                  T++;
                if (T) {
                  for (h = o; h < o + T; ++h)
                    L = this.polylist.segs[h].pt.x - this.polylist.segs[h - 1].pt.x,
                      I = this.polylist.segs[h].pt.y - this.polylist.segs[h - 1].pt.y,
                      f += Math.sqrt(L * L + I * I);
                  var b = T3Gv.optManager.svgDoc.docInfo.docScale
                    , M = Math.floor(f / 8 * b);
                  M < e && (M = e),
                    n = this.Pr_GetNURBSPoints(o, M, p, d, c, u),
                    C = C.concat(n)
                }
              }
              break;
            case ConstantData.LineType.QUADBEZ:
              n = this.Pr_GetQuadraticBezierPoints(o, e, p, d, c, u),
                C = C.concat(n);
              break;
            case ConstantData.LineType.CUBEBEZ:
              n = this.Pr_GetCubicBezierPoints(o, e, p, d, c, u),
                C = C.concat(n);
              break;
            case ConstantData.LineType.ELLIPSE:
              n = this.Pr_GetEllipticalArcPoints(o, e, p, d, c, u),
                C = C.concat(n);
              break;
            case ConstantData.LineType.SPLINE:
              if (o < s - 1 && this.polylist.segs[o + 1].LineType == ConstantData.LineType.SPLINECON) {
                for (var P = 0; o + P + 1 < s && this.polylist.segs[o + P + 1].LineType == ConstantData.LineType.SPLINECON;)
                  P++;
                if (P) {
                  for (h = o; h < o + P; ++h)
                    L = this.polylist.segs[h].pt.x - this.polylist.segs[h - 1].pt.x,
                      I = this.polylist.segs[h].pt.y - this.polylist.segs[h - 1].pt.y,
                      f += Math.sqrt(L * L + I * I);
                  var R = T3Gv.optManager.svgDoc.docInfo.docScale
                    , A = Math.floor(f / 8 * R);
                  A < e && (A = e),
                    n = this.Pr_GetSPLINEPoints(o, A, p, d, c, u),
                    C = C.concat(n)
                }
              }
              break;
            case ConstantData.LineType.NURBSSEG:
            case ConstantData.LineType.QUADBEZCON:
            case ConstantData.LineType.CUBEBEZCON:
            case ConstantData.LineType.ELLIPSEEND:
            case ConstantData.LineType.SPLINECON:
              !0;
              break;
            case ConstantData.LineType.PARABOLA:
              n = this.Pr_GetParabolaPoints(e, !0, o, this.polylist.segs[o].param, this.polylist.segs[o].ShortRef, c, u),
                (C = C.concat(n)).push(new Point(this.polylist.segs[o].pt.x * c + p, this.polylist.segs[o].pt.y * u + d));
              break;
            case ConstantData.LineType.ARCSEGLINE:
              n = this.Pr_GetEllipsePoints(e, !0, o, this.polylist.segs[o].param, this.polylist.segs[o].ShortRef, c, u),
                (C = C.concat(n)).push(new Point(this.polylist.segs[o].pt.x * c + p, this.polylist.segs[o].pt.y * u + d));
              break;
            case ConstantData.LineType.ARCLINE:
              if (0 === this.polylist.segs[o].param)
                C.push(new Point(this.polylist.segs[o].pt.x * c + p, this.polylist.segs[o].pt.y * u + d));
              else {
                for (y.StartPoint = new Point(this.polylist.segs[o - 1].pt.x, this.polylist.segs[o - 1].pt.y),
                  y.EndPoint = new Point(this.polylist.segs[o].pt.x, this.polylist.segs[o].pt.y),
                  D = this.polylist.segs[o].param,
                  Math.abs(y.StartPoint.y - y.EndPoint.y),
                  D >= 0 ? (y.CurveAdjust = D,
                    y.IsReversed = !0) : (y.CurveAdjust = -D,
                      y.IsReversed = !1),
                  y.FromPolygon = !0,
                  (g = new ListManager.ArcLine(y)).Frame = Utils2.Pt2Rect(y.StartPoint, y.EndPoint),
                  m = (n = g.GetPolyPoints(Math.ceil(ConstantData.Defines.NPOLYPTS / 2), !1, !1, !1, null)).length,
                  h = 0; h < m; h++)
                  n[h].x = n[h].x * c + p,
                    n[h].y = n[h].y * u + d;
                (C = C.concat(n)).push(new Point(this.polylist.segs[o].pt.x * c + p, this.polylist.segs[o].pt.y * u + d))
              }
          }
          i && i.push(C.length - 1)
        }
      if (!t)
        for (s = C.length,
          o = 0; o < s; o++)
          C[o].x += this.Frame.x,
            C[o].y += this.Frame.y
    } else
      // C = ListManager.BaseLine.prototype.GetPolyPoints.call(this, e, t, !0);
      // Double === TODO
      C = super.GetPolyPoints(e, t, !0);
    return C
  }

  BeforeModifyShape(e, t, a) {
    var r, i, n, o, s, l, S, c, u = {};
    if (0 !== (r = this.polylist && this.polylist.segs ? this.polylist.segs.length : 0) && (this.polylist.closed && this.polylist.dim.x && this.polylist.dim.y ? (n = this.polylist.dim.x,
      (o = this.polylist.dim.y) < 1 && (o = 1),
      n < 1 && (n = 1),
      s = this.Frame.width / n,
      l = this.Frame.height / o) : (s = 1,
        l = 1),
      S = this.StartPoint.x,
      c = this.StartPoint.y,
      a > 0 && a <= r - 1))
      switch (this.polylist.segs[a].LineType) {
        case ConstantData.LineType.PARABOLA:
          break;
        case ConstantData.LineType.ARCLINE:
          u.StartPoint = new Point(this.polylist.segs[a - 1].pt.x * s + S, this.polylist.segs[a - 1].pt.y * l + c),
            u.EndPoint = new Point(this.polylist.segs[a].pt.x * s + S, this.polylist.segs[a].pt.y * l + c),
            (i = this.polylist.segs[a].param) >= 0 ? (u.CurveAdjust = i,
              u.IsReversed = !0) : (u.CurveAdjust = -i,
                u.IsReversed = !1),
            u.FromPolygon = !0,
            this.arcobj = new ListManager.ArcLine(u),
            this.arcobj.Frame = Utils2.Pt2Rect(u.StartPoint, u.EndPoint),
            this.arcobj.BeforeModifyShape(e, t, a)
      }
  }

  SnapNewPointTo90Degrees(e, t) {
    "use strict";
    var a, r = -1, i = -1, n = !1;
    return (!window.event || !window.event.ctrlKey) && (a = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
      e - 1 >= 0 ? i = e - 1 : this.polylist.closed && this.polylist.segs.length > 2 && (i = this.polylist.segs.length - 2),
      i >= 0 && this.AdjustForLineAngleSnap(a[i], t) && (n = !0),
      (r = e + 1) >= this.polylist.segs.length && (r = this.polylist.closed ? 1 : -1),
      r >= 0 && this.AdjustForLineAngleSnap(a[r], t) && (n = !0),
      n)
  }

  ModifyShape(e, t, a, r, i, n) {
    var o, s, l = {}, S = null;
    if (0 !== (o = this.polylist && this.polylist.segs ? this.polylist.segs.length : 0)) {
      if (r === ConstantData.ActionTriggerType.POLYLNODE)
        i >= 1 && i < o && (S = new Point(t, a),
          n || this.SnapNewPointTo90Degrees(i, S) && (t = S.x,
            a = S.y),
          this.polylist.segs[i].pt.x = t - this.StartPoint.x,
          this.polylist.segs[i].pt.y = a - this.StartPoint.y,
          this.polylist.segs[i].LineType === ConstantData.LineType.ARCSEGLINE && (s = this.Pr_PolyLGetArcQuadrant(this.polylist.segs[i - 1].pt, this.polylist.segs[i].pt, this.polylist.segs[i].param),
            this.polylist.segs[i].ShortRef = s.ShortRef),
          i < o - 1 && this.polylist.segs[i + 1].LineType === ConstantData.LineType.ARCSEGLINE && (s = this.Pr_PolyLGetArcQuadrant(this.polylist.segs[i].pt, this.polylist.segs[i + 1].pt, this.polylist.segs[i + 1].param),
            this.polylist.segs[i + 1].ShortRef = s.ShortRef));
      else if (r === ConstantData.ActionTriggerType.POLYLADJ && i > 0 && i <= o - 1)
        switch (this.polylist.segs[i].LineType) {
          case ConstantData.LineType.PARABOLA:
            l.x = t,
              l.y = a,
              this.Pr_PolyLGetParabolaParam(l, i);
            break;
          case ConstantData.LineType.ARCSEGLINE:
            l.x = t,
              l.y = a,
              this.Pr_PolyLGetEllipseParam(l, i, e);
            break;
          case ConstantData.LineType.ARCLINE:
            this.arcobj && (this.arcobj.ModifyShape(null, t, a, r, i),
              this.arcobj.IsReversed ? this.polylist.segs[i].param = this.arcobj.CurveAdjust : this.polylist.segs[i].param = -this.arcobj.CurveAdjust)
        }
      var c = {
        x: t,
        y: a
      }
        , u = this.GetDimensionsForDisplay();
      T3Gv.optManager.UpdateDisplayCoordinates(u, c, ConstantData.CursorTypes.Grow, this),
        this.UpdateDrawing(e),
        -1 != this.DataID && this.LM_ResizeSVGTextObject(e, this, this.Frame)
    }
  }

  BeforeRotate(e) {
    var t;
    T3Gv.optManager.rotateKnobCenterDivisor = this.RotateKnobCenterDivisor(),
      T3Gv.optManager.rotateStartRotation = 0,
      T3Gv.optManager.rotateEndRotation = T3Gv.optManager.rotateStartRotation,
      t = this.Frame,
      T3Gv.optManager.rotateStartPoint.x = this.RotateKnobPt.x,
      T3Gv.optManager.rotateStartPoint.y = this.RotateKnobPt.y,
      T3Gv.optManager.rotatePivotX = t.x + t.width / T3Gv.optManager.rotateKnobCenterDivisor.x,
      T3Gv.optManager.rotatePivotY = t.y + t.height / T3Gv.optManager.rotateKnobCenterDivisor.y
  }

  AdjustRotate(e, t, a) {
    T3Gv.optManager.rotateEndRotation;
    var r, i = e - T3Gv.optManager.rotatePivotX, n = t - T3Gv.optManager.rotatePivotY;
    if (T3Gv.optManager.rotateStartPoint.x === T3Gv.optManager.rotatePivotX)
      Math.abs(n) < 1e-4 && (n = 1e-4),
        r = -Math.atan(i / n),
        r *= 180 / ConstantData.Geometry.PI,
        n < 0 && (r = 180 + r);
    else {
      if (T3Gv.optManager.rotateStartPoint.y !== T3Gv.optManager.rotatePivotY)
        return;
      Math.abs(i) < 1e-4 && (i = 1e-4),
        r = Math.atan(n / i),
        r *= 180 / ConstantData.Geometry.PI,
        i < 0 && (r = 180 + r)
    }
    var o = T3Gv.optManager.OverrideSnaps(a);
    gDocumentHandler.documentConfig.enableSnap && !o && (r = Math.round(r / T3Gv.optManager.rotateSnap) * T3Gv.optManager.rotateSnap),
      r < 0 && (r += 360);
    var s, l = {};
    if (s = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
      Utils3.RotatePointsAboutCenter(this.Frame, r / 360 * (2 * Math.PI), s),
      Utils2.GetPolyRect(l, s),
      !(l.x < 0 || l.y < 0)) {
      if (T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto) {
        var S = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
        if (l.x + l.width > S.dim.x)
          return;
        if (l.y + l.height > S.dim.y)
          return
      }
      T3Gv.optManager.rotateEndRotation = r,
        this.Rotate(T3Gv.optManager.actionSvgObject, r)
    }
  }

  Rotate(e, t) {
    e.SetRotation(t, T3Gv.optManager.rotatePivotX, T3Gv.optManager.rotatePivotY)
  }

  AfterRotateShape(e, t) {
    var a, r, i = T3Gv.optManager.rotateEndRotation, n = {
      x: T3Gv.optManager.rotatePivotX,
      y: T3Gv.optManager.rotatePivotY
    }, o = -(i - T3Gv.optManager.rotateStartRotation) / (180 / ConstantData.Geometry.PI), s = (T3Gv.optManager.RotatePointAroundPoint(n, T3Gv.optManager.rotateStartPoint, o),
      this.polylist.segs.length);
    for (a = 0; a < s; ++a)
      this.polylist.segs[a].LineType == ConstantData.LineType.ELLIPSE && (this.polylist.segs[a].weight += 10 * i);
    var l = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null);
    for (Utils3.RotatePointsAboutPoint(n, o, l),
      r = l.length,
      this.StartPoint.x = l[0].x,
      this.StartPoint.y = l[0].y,
      a = 0; a < r; a++)
      this.polylist.segs[a].pt.x = l[a].x - this.StartPoint.x,
        this.polylist.segs[a].pt.y = l[a].y - this.StartPoint.y;
    if (this.EndPoint.x = l[r - 1].x,
      this.EndPoint.y = l[r - 1].y,
      t !== ConstantData.ActionTriggerType.MOVEPOLYSEG) {
      if (this.CalcFrame(),
        T3Gv.optManager.AddToDirtyList(e),
        T3Gv.optManager.RenderDirtySVGObjects(),
        this.UpdateFrame(),
        this.r.x < 0 || this.r.y < 0)
        return T3Gv.optManager.Undo(),
          Collab.UnLockMessages(),
          void Collab.UnBlockMessages();
      T3Gv.optManager.ob && T3Gv.optManager.ob.Frame && (T3Gv.optManager.MaintainLink(e, this, T3Gv.optManager.ob, ConstantData.ActionTriggerType.ROTATE),
        T3Gv.optManager.ob = {}),
        this.rflags && (this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
          this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !1)),
        T3Gv.optManager.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
        T3Gv.optManager.UpdateLinks(),
        T3Gv.optManager.AddToDirtyList(e)
    }
  }

  IsAdjustingToClosed(e, t) {
    "use strict";
    var a = new HitResult(-1, 0, null)
      , r = [{
        id: T3Gv.optManager.actionTriggerId === ConstantData.ActionTriggerType.LINESTART ? ConstantData.HookPts.SED_KTL : ConstantData.HookPts.SED_KTR,
        x: e,
        y: t
      }];
    return this.ClosePolygon(this.BlockID, r, a)
  }

  AdjustLine(e, t, a, r, i) {
    var n, o, s, l, S = {}, c = new Point(t, a);
    switch (n = this.polylist.segs.length,
    this.polylist.closed && r === ConstantData.ActionTriggerType.POLYLEND && (r = ConstantData.ActionTriggerType.LINESTART),
    r) {
      case ConstantData.ActionTriggerType.LINEEND:
        if (i || this.SnapNewPointTo90Degrees(n - 1, c) && (t = c.x,
          a = c.y),
          this.polylist.segs[n - 1].pt.x = t - this.StartPoint.x,
          this.polylist.segs[n - 1].pt.y = a - this.StartPoint.y,
          this.EndPoint.x = t,
          this.EndPoint.y = a,
          this.polylist.segs[n - 1].LineType === ConstantData.LineType.ARCSEGLINE)
          S = this.Pr_PolyLGetArcQuadrant(this.polylist.segs[n - 2].pt, this.polylist.segs[n - 1].pt, this.polylist.segs[n - 1].param),
            this.polylist.segs[n - 1].ShortRef = S.ShortRef;
        break;
      case ConstantData.ActionTriggerType.LINESTART:
        for (i || this.SnapNewPointTo90Degrees(0, c) && (t = c.x,
          a = c.y),
          o = t - this.StartPoint.x,
          s = a - this.StartPoint.y,
          this.StartPoint.x = t,
          this.StartPoint.y = a,
          l = 1; l < n; l++)
          this.polylist.segs[l].pt.x -= o,
            this.polylist.segs[l].pt.y -= s;
        switch (this.polylist.closed && (this.EndPoint.x = this.StartPoint.x,
          this.EndPoint.y = this.StartPoint.y,
          this.polylist.segs[n - 1].pt.x = 0,
          this.polylist.segs[n - 1].pt.y = 0),
        this.polylist.segs[1].LineType) {
          case ConstantData.LineType.ARCSEGLINE:
            S = this.Pr_PolyLGetArcQuadrant(this.polylist.segs[0].pt, this.polylist.segs[1].pt, this.polylist.segs[1].param),
              this.polylist.segs[1].ShortRef = S.ShortRef;
            break;
          case ConstantData.LineType.QUADBEZ:
          case ConstantData.LineType.CUBEBEZ:
          case ConstantData.LineType.ELLIPSE:
            this.polylist.segs[1].pt.x = this.polylist.segs[0].pt.x,
              this.polylist.segs[1].pt.y = this.polylist.segs[0].pt.y;
            break;
          case ConstantData.LineType.NURBS:
          case ConstantData.LineType.SPLINE:
            this.polylist.segs[1].pt.x = this.polylist.segs[0].pt.x,
              this.polylist.segs[1].pt.y = this.polylist.segs[0].pt.y,
              this.polylist.segs[2].pt.x = this.polylist.segs[0].pt.x,
              this.polylist.segs[2].pt.y = this.polylist.segs[0].pt.y
        }
    }
    e ? (this.UpdateDrawing(e),
      -1 != this.DataID && this.LM_ResizeSVGTextObject(e, this, this.Frame)) : this.CalcFrame();
    var u = this.GetDimensionsForDisplay();
    T3Gv.optManager.UpdateDisplayCoordinates(u, c, ConstantData.CursorTypes.Grow, this)
  }

  AdjustLineEnd(e, t, a, r, i) {
    if (2 === this.polylist.segs.length) {
      var n = {
        x: this.EndPoint.x,
        y: this.EndPoint.y
      };
      this.EndPoint.x = t,
        this.EndPoint.y = a,
        this.EnforceMinimum(!1),
        t = this.EndPoint.x,
        a = this.EndPoint.y,
        this.EndPoint.x = n.x,
        this.EndPoint.y = n.y
    }
    this.AdjustLine(e, t, a, r, i)
  }

  AdjustLineStart(e, t, a, r, i) {
    if (2 === this.polylist.segs.length) {
      var n = {
        x: this.StartPoint.x,
        y: this.StartPoint.y
      };
      this.StartPoint.x = t,
        this.StartPoint.y = a,
        this.EnforceMinimum(!0),
        t = this.StartPoint.x,
        a = this.StartPoint.y,
        this.StartPoint.x = n.x,
        this.StartPoint.y = n.y
    }
    this.AdjustLine(e, t, a, ConstantData.ActionTriggerType.LINESTART, i)
  }

  Flip(e, t) {
    var a, r, i, n, o, s, l, S, c = [], u = [], p = {};
    if (t || (T3Gv.optManager.ob = Utils1.DeepCopy(this)),
      a = this.polylist.segs.length,
      s = this.Frame,
      this.polylist.closed && this.polylist.dim.x && this.polylist.dim.y ? (o = this.polylist.dim.x,
        n = this.polylist.dim.y,
        // this instanceof ListManager.Polygon
        // double === TODO
        // this instanceof GlobalDataShape.Polygon
        this instanceof Instance.Shape.Polygon
        && (this.StartPoint.x = this.Frame.x + this.polylist.offset.x,
          this.StartPoint.y = this.Frame.y + this.polylist.offset.y)) : (o = s.width,
            n = s.height),
      e & ConstantData.ExtraFlags.SEDE_FlipVert) {
      for (i = !0,
        l = this.StartPoint.y - s.y,
        r = 0; r < a; r++)
        if (c.push(new Point(this.polylist.segs[r].pt.x, this.polylist.segs[r].pt.y + l)),
          this.polylist.segs[r].LineType === ConstantData.LineType.PARABOLA)
          u[r] = this.Pr_PolyLGetParabolaAdjPoint(!1, r),
            u[r].y -= s.y;
      for (r = 0; r < a; r++)
        c[r].y = n - c[r].y,
          u[r] && (u[r].y = n - u[r].y,
            u[r].y += s.y);
      for (l = c[0].y,
        r = 0; r < a; r++)
        this.polylist.segs[r].pt.y = c[r].y - l;
      this.StartPoint.y = c[0].y + this.Frame.y,
        this.EndPoint.y = c[a - 1].y + this.Frame.y
    }
    if (e & ConstantData.ExtraFlags.SEDE_FlipHoriz) {
      for (i = !0,
        l = this.StartPoint.x - s.x,
        r = 0; r < a; r++)
        if (c.push(new Point(this.polylist.segs[r].pt.x + l, this.polylist.segs[r].pt.y)),
          this.polylist.segs[r].LineType === ConstantData.LineType.PARABOLA)
          r > 0 && (u[r] = this.Pr_PolyLGetParabolaAdjPoint(!1, r),
            u[r].x -= s.x);
      for (r = 0; r < a; r++)
        c[r].x = o - c[r].x,
          u[r] && (u[r].x = o - u[r].x,
            u[r].x += s.x);
      for (l = c[0].x,
        r = 0; r < a; r++)
        this.polylist.segs[r].pt.x = c[r].x - l;
      this.StartPoint.x = c[0].x + this.Frame.x,
        this.EndPoint.x = c[a - 1].x + this.Frame.x
    }
    if (i) {
      for (r = 0; r < a; r++)
        switch (this.polylist.segs[r].LineType) {
          case ConstantData.LineType.ARCLINE:
            this.polylist.segs[r].param = -this.polylist.segs[r].param;
            break;
          case ConstantData.LineType.ARCSEGLINE:
            S = this.Pr_PolyLGetArcQuadrant(this.polylist.segs[r - 1].pt, this.polylist.segs[r].pt, this.polylist.segs[r].param),
              this.polylist.segs[r].ShortRef = S.ShortRef;
            break;
          case ConstantData.LineType.PARABOLA:
            u[r] && (p.x = u[r].x,
              p.y = u[r].y,
              this.Pr_PolyLGetParabolaParam(p, r));
            break;
          case ConstantData.LineType.ELLIPSE:
            var d = this.polylist.segs[r].weight;
            d = 3600 - d,
              this.polylist.segs[r].weight = d
        }
      t || (T3Gv.optManager.ob && T3Gv.optManager.ob.Frame && T3Gv.optManager.MaintainLink(this.BlockID, this, T3Gv.optManager.ob, ConstantData.ActionTriggerType.FLIP),
        T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE)),
        this.polylist.closed && (this.polylist.offset.x = this.StartPoint.x - this.Frame.x,
          this.polylist.offset.y = this.StartPoint.y - this.Frame.y)
    }
    T3Gv.optManager.ob = {}
  }

  LinkGrow(e, t, a) {
    switch (t) {
      case ConstantData.HookPts.SED_KTL:
        this.AdjustLineStart(null, a.x, a.y);
        break;
      case ConstantData.HookPts.SED_KTR:
        this.AdjustLineEnd(null, a.x, a.y, ConstantData.ActionTriggerType.LINEEND)
    }
    T3Gv.optManager.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
      T3Gv.optManager.AddToDirtyList(e)
  }

  ClosePolygon(e, t, a) {
    if (t && t.length && this.polylist && this.polylist.segs.length > 3 && !this.polylist.closed && (this.Hit(t[0], !1, !0, a, t[0].id),
      a.hitcode === ConstantData.HitCodes.SED_PLApp)) {
      if (t[0].id === ConstantData.HookPts.SED_KTL && a.segment === ConstantData.HookPts.SED_KTR)
        return a.objectid = e,
          a.pt.x = this.polylist.segs[this.polylist.segs.length - 1].pt.x + this.StartPoint.x,
          a.pt.y = this.polylist.segs[this.polylist.segs.length - 1].pt.y + this.StartPoint.y,
          !0;
      if (t[0].id === ConstantData.HookPts.SED_KTR && a.segment === ConstantData.HookPts.SED_KTL)
        return a.objectid = e,
          a.pt.x = this.polylist.segs[0].pt.x + this.StartPoint.x,
          a.pt.y = this.polylist.segs[0].pt.y + this.StartPoint.y,
          !0
    }
    return !1
  }

  PolyGetTargetPointList(e) {
    "use strict";
    var t, a = [], r = [], i = [], n = 0;
    return a = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !0, null),
      this.polylist && this.polylist.closed && this.StyleRecord.Line.BThick && !(e & ConstantData.HookFlags.SED_LC_ShapeOnLine) ? (r = T3Gv.optManager.InflateLine(a, this.StyleRecord.Line.BThick, !0, !0),
        i = T3Gv.optManager.InflateLine(a, this.StyleRecord.Line.BThick, !0, !1),
        t = r.concat(i),
        a = a.concat(t)) : 0 !== this.RotationAngle && (n = -this.RotationAngle / (180 / ConstantData.Geometry.PI),
          Utils3.RotatePointsAboutCenter(this.Frame, n, a)),
      a
  }


  GetTargetPoints(e, t, a) {
    var r = ConstantData.HookPts;
    if (null != a && null != a && a >= 0 && T3Gv.optManager.GetObjectPtr(a, !1).DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE)
      switch (e.id) {
        case r.SED_KTC:
        case r.SED_KBC:
        case r.SED_KRC:
        case r.SED_KLC:
          return null
      }


    // return ListManager.BaseShape.prototype.PolyGetTargets.call(this, e, t, this.Frame)
    // Double === TODO Need to check
    // return new BaseShape(this).PolyGetTargets(e, t, this.Frame)
    // super.PolyGetTargets(e, t, this.Frame)
    // return new BaseShape(this).PolyGetTargets(e, t, this.Frame)
    // return new BaseShape(this).PolyGetTargets(e, t, this.Frame)

    // Copy the BaseShape PolyGetTargets to this class

    return this.BaseShape_PolyGetTargets(e, t, this.Frame)
  }


  BaseShape_PolyGetTargets(e, t, a) {

    var r,
      i,
      n,
      o,
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
      C = [
        {
          x: 0,
          y: 0
        }
      ],
      y = [],
      f = - 1,
      L = {},
      I = {}.ept = {},
      T = {},
      b = {},
      M = {},
      P = {},
      R = ConstantData.Defines.LongIntMax;
    if (r = this.PolyGetTargetPointList(t), null == e) return null;
    for (
      P.x = e.x,
      P.y = e.y,
      T3Gv.docHandler.documentConfig.enableSnap &&
        0 == (t & ConstantData.HookFlags.SED_LC_NoSnaps) ? (
        (P = T3Gv.docHandler.SnapToGrid(P)).y < a.y &&
        (P.y = a.y),
        P.y > a.y + a.height &&
        (P.y = a.y + a.height),
        P.x < a.x &&
        (P.x = a.x),
        P.x > a.x + a.width &&
        (P.x = a.x + a.width),
        u = !0
      ) : u = !1,
      p = r.length,
      i = 1;
      i < p;
      i++
    ) L.x = e.x,
      L.y = e.y,
      I = r[i - 1],
      d = r[i],
      Utils2.EqualPt(I, d) ||
      (
        0 === (n = S = d.x - I.x) &&
        (n = 1),
        0 === (o = c = d.y - I.y) &&
        (o = 1),
        Math.abs(c / n) > 1 ? (
          u &&
          (L.y = P.y),
          s = S / o * (L.y - I.y) + I.x,
          D = Math.abs(s - L.x),
          L.x = s,
          I.x < d.x ? (h = I.x, m = d.x) : (m = I.x, h = d.x),
          s < h ||
            s > m ? D = R : (
            T = Utils2.Pt2Rect(I, d),
            Utils2.InflateRect(T, 1, 1),
            Utils2.pointInRect(T, L) ||
            (D = R)
          ),
          D < R &&
          (f = i, b.y = L.y, b.x = s, R = D)
        ) : (
          u &&
          (L.x = P.x),
          l = c / n * (L.x - I.x) + I.y,
          g = Math.abs(l - L.y),
          L.y = l,
          I.y < d.y ? (h = I.y, m = d.y) : (m = I.y, h = d.y),
          l < h ||
            l > m ? g = R : (
            T = Utils2.Pt2Rect(I, d),
            Utils2.InflateRect(T, 1, 1),
            Utils2.pointInRect(T, L) ||
            (g = R)
          ),
          g < R &&
          (f = i, R = g, b.x = L.x, b.y = l)
        )
      );
    if (f >= 0) {
      if (C[0].x = b.x, C[0].y = b.y, M = a, 0 !== this.RotationAngle) {
        var A = this.RotationAngle / (180 / ConstantData.Geometry.PI);
        Utils3.RotatePointsAboutCenter(M, A, C)
      }
      return S = M.width,
        c = M.height,
        s = 0 === S ? 0 : (C[0].x - M.x) / S,
        l = 0 === c ? 0 : (C[0].y - M.y) / c,
        y.push(
          new Point(
            s * ConstantData.Defines.SED_CDim,
            l * ConstantData.Defines.SED_CDim
          )
        ),
        y
    }
    return null
  }



  GetPerimPts(e, t, a, r, i, n) {
    var o, s, l, S, c, u = [];
    if (t && 2 === (S = t.length) && t[0].id && t[0].id === ConstantData.HookPts.SED_KTL && t[1].id && t[1].id === ConstantData.HookPts.SED_KTR)
      return u.push(new Point(this.StartPoint.x, this.StartPoint.y)),
        u[0].id = t[0].id,
        u.push(new Point(this.EndPoint.x, this.EndPoint.y)),
        u[1].id = t[1].id,
        u;
    var p = T3Gv.optManager.GetObjectPtr(n, !1);
    if (p && p.objecttype === ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY && t) {
      var d, D = this.GetPolyPoints(1, !1, !0, !1, null), g = {}, h = D.length;
      if (0 === t[0].x)
        g.StartPoint = D[0],
          g.EndPoint = D[1],
          g.LineType = ConstantData.LineType.LINE,
          (d = new ListManager.BaseLine(g)).StartPoint = g.StartPoint,
          d.EndPoint = g.EndPoint,
          d.Frame = Utils2.Pt2Rect(g.StartPoint, g.EndPoint),
          // u = ListManager.BaseLine.prototype.GetPerimPts.call(d, e, t, a, r, i, n);
          // double === TODO
          u = super.GetPerimPts(e, t, a, r, i, n);
      else
        g.StartPoint = D[h - 2],
          g.EndPoint = D[h - 1],
          g.LineType = ConstantData.LineType.LINE,
          (d = new ListManager.BaseLine(g)).StartPoint = g.StartPoint,
          d.EndPoint = g.EndPoint,
          d.Frame = Utils2.Pt2Rect(g.StartPoint, g.EndPoint),
          // u = ListManager.BaseLine.prototype.GetPerimPts.call(d, e, t, a, r, i, n);
          // Double === TODO
          u = super.GetPerimPts(e, t, a, r, i, n);
      return u
    }
    if (p && p.objecttype === ConstantData.ObjectTypes.SD_OBJT_EXTRATEXTLABEL && 1 === S)
      // return u = ListManager.BaseLine.prototype.GetPerimPts.call(this, e, t, a, r, i, n);
      // Double === TODO
      return u = super.GetPerimPts(e, t, a, r, i, n);
    if (a >= ConstantData.HookPts.SED_KCTL && a <= ConstantData.HookPts.SED_KCC) {
      if (0 === t[0].x)
        return u[0] = {
          x: 0,
          y: 0,
          id: 0
        },
          u[0].x = this.StartPoint.x,
          u[0].y = this.StartPoint.y,
          null != t[0].id && (u[0].id = t[0].id),
          u;
      if (t[0].x === ConstantData.Defines.SED_CDim)
        return u[0] = {
          x: 0,
          y: 0,
          id: 0
        },
          u[0].x = this.EndPoint.x,
          u[0].y = this.EndPoint.y,
          null != t[0].id && (u[0].id = t[0].id),
          u
    }
    for (l = this.Frame,
      c = 0; c < t.length; c++)
      u[c] = {
        x: 0,
        y: 0,
        id: 0
      },
        o = l.width,
        s = l.height,
        u[c].x = t[c].x / ConstantData.Defines.SED_CDim * o + l.x,
        u[c].y = t[c].y / ConstantData.Defines.SED_CDim * s + l.y,
        null != t[c].id && (u[c].id = t[c].id);
    return u
  }


  HookToPoint(e, t) {
    var a, r = {
      x: 0,
      y: 0
    }, i = {
      x: 0,
      y: 0
    }, n = {};
    if (e === ConstantData.HookPts.SED_KTL)
      r.x = this.StartPoint.x,
        r.y = this.StartPoint.y,
        i.x = this.StartPoint.x + this.polylist.segs[1].pt.x,
        i.y = this.StartPoint.y + this.polylist.segs[1].pt.y,
        t && (n = Utils2.Pt2Rect(this.StartPoint, i),
          t.x = n.x,
          t.y = n.y,
          t.width = n.width,
          t.height = n.height);
    else
      r.x = this.EndPoint.x,
        r.y = this.EndPoint.y,
        a = this.polylist.segs.length,
        i.x = this.StartPoint.x + this.polylist.segs[a - 2].pt.x,
        i.y = this.StartPoint.y + this.polylist.segs[a - 2].pt.y,
        t && (n = Utils2.Pt2Rect(this.EndPoint, i),
          t.x = n.x,
          t.y = n.y,
          t.width = n.width,
          t.height = n.height);
    return r
  }


  GetSegLFace(e, t, a) {
    var r, i = 0, n = {}, o = {}, s = {};
    return (r = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null)).length,
      o.x = a.x,
      o.y = a.y,
      Utils3.LineDStyleHit(r, o, this.StyleRecord.Line.Thickness, 0, s) && s.lpHit >= 0 && (i = (n = Utils2.Pt2Rect(r[s.lpHit], r[s.lpHit + 1])).width >= n.height ? t.y >= a.y ? ConstantData.HookPts.SED_KBC : ConstantData.HookPts.SED_KTC : t.x >= a.x ? ConstantData.HookPts.SED_KRC : ConstantData.HookPts.SED_KLC),
      i
  }

  PolyHitSeg(e) {
    var t, a, r, i = {}, n = {
      x: 0,
      y: 0
    }, o = [];
    if (t = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, o),
      n.x = e.x,
      n.y = e.y,
      Utils3.LineDStyleHit(t, n, this.StyleRecord.Line.Thickness, 0, i) && i.lpHit >= 0) {
      for (r = o.length,
        a = 0; a < r; a++)
        if (i.lpHit < o[a]) {
          i.lpHit = a;
          break
        }
      return i.lpHit + 1
    }
    return -1
  }

  MaintainPoint(e, t, a, r, i) {
    var n, o, s, l, S, c = {}, u = {}, p = {}, d = [], D = {}, g = [];
    if (s = r,
      null == a && (a = this),
      r.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.LINE)
      switch (r.LineType) {
        case ConstantData.LineType.SEGLINE:
        case ConstantData.LineType.ARCSEGLINE:
        case ConstantData.LineType.POLYLINE:
          for (n = -1,
            o = 0; o < r.hooks.length; o++)
            if (r.hooks[o].objid === t) {
              r.HookToPoint(r.hooks[o].hookpt, c),
                n = 0;
              break
            }
          if (0 !== n)
            return !0;
          u = Utils1.DeepCopy(r),
            Utils2.CopyRect(u.Frame, c),
            u.StartPoint.x = c.x,
            u.StartPoint.y = c.y,
            u.EndPoint.x = c.x + c.width,
            u.EndPoint.y = c.y + c.height,
            s = u
      }
    if (S = a.PolyHitSeg(e),
      a.polylist.segs.length != this.polylist.segs.length || i === ConstantData.ActionTriggerType.FLIP ? ((l = this.PolyHitSeg(e)) < 0 && (l = a.PolyHitSeg(e)),
        l >= this.polylist.segs.length && (l = this.polylist.segs.length - 1)) : l = S,
      d = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
      this.polylist && this.polylist.closed && this.StyleRecord.Line.BThick &&
      //  r instanceof ListManager.BaseLine)
      // Double === TODO
      r instanceof BaseLine) {
      var h = {}
        , m = a.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null)
        , C = Utils3.LineDStyleHit(m, {
          x: e.x,
          y: e.y
        }, 2, -12, h);
      if (!C || h.lpHit < 0) {
        var y = T3Gv.optManager.InflateLine(m, a.StyleRecord.Line.BThick, !0, !1);
        if ((C = Utils3.LineDStyleHit(y, {
          x: e.x,
          y: e.y
        }, 2, -12, h)) && h.lpHit >= 0)
          d = T3Gv.optManager.InflateLine(d, this.StyleRecord.Line.BThick, !0, !1);
        else {
          var f = T3Gv.optManager.InflateLine(m, a.StyleRecord.Line.BThick, !0, !0);
          (C = Utils3.LineDStyleHit(f, {
            x: e.x,
            y: e.y
          }, 2, -12, h)) && h.lpHit >= 0 && (d = T3Gv.optManager.InflateLine(d, this.StyleRecord.Line.BThick, !0, !0))
        }
      }
    }
    if (l >= 0 && S >= 0) {
      if (c = Utils2.Pt2Rect(d[l], d[l - 1]),
        p = Utils1.DeepCopy(this),
        Utils2.CopyRect(p.Frame, c),
        p.StartPoint.x = d[l - 1].x,
        p.StartPoint.y = d[l - 1].y,
        p.EndPoint.x = d[l].x,
        p.EndPoint.y = d[l].y,
        g = a.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
        D = Utils1.DeepCopy(a),
        c = Utils2.Pt2Rect(g[S], g[S - 1]),
        Utils2.CopyRect(D.Frame, c),
        D.StartPoint.x = g[S - 1].x,
        D.StartPoint.y = g[S - 1].y,
        D.EndPoint.x = g[S].x,
        D.EndPoint.y = g[S].y,
        r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE)
        return T3Gv.optManager.LineCheckPoint(p, e) || T3Gv.optManager.Lines_MaintainDist(p, D, i, e),
          !0;
      switch (i) {
        case ConstantData.ActionTriggerType.POLYLNODE:
          i = (T3Gv.optManager.actionTriggerData === l - 1 || T3Gv.optManager.actionTriggerData === l) && p.StartPoint.x === d[T3Gv.optManager.actionTriggerData].x && p.StartPoint.y === d[T3Gv.optManager.actionTriggerData].y ? ConstantData.ActionTriggerType.LINESTART : ConstantData.ActionTriggerType.LINEEND;
          break;
        case ConstantData.ActionTriggerType.ROTATE:
          return T3Gv.optManager.Lines_MaintainDist(p, D, i, e),
            !0;
        default:
          i = ConstantData.ActionTriggerType.LINEEND
      }
      return !!T3Gv.optManager.LineCheckPoint(p, e) || (a.polylist.segs.length == this.polylist.segs.length ? (T3Gv.optManager.Lines_MaintainDistWithinSegment(this, a, l, e),
        !0) : (T3Gv.optManager.Lines_Intersect(p, s, e) || T3Gv.optManager.Lines_MaintainDist(p, D, i, e),
          !0))
    }
    return !0
  }


  ChangeTarget(e, t, a, r, i, n) {
    "use strict";
    var o = 0
      , s = null
      , l = {}
      , S = null
      , c = 0;
    if (s = T3Gv.optManager.GetObjectPtr(t, !1),
      this.TextFlags & ConstantData.TextFlags.SED_TF_HorizText && s
      // instanceof ListManager.BaseShape
      // Double === TODO
      instanceof BaseShape

    ) {
      for (c = 0; c < s.hooks.length; c++)
        if (s.hooks[c].objid == e) {
          S = s.HookToPoint(s.hooks[c].hookpt, l);
          break
        }
      if (null != S && this.PolyHitSeg(S) >= 0) {
        o = this.GetApparentAngle(S),
          o = Math.abs(o) % 180;
        var u = Math.abs(s.RotationAngle % 180);
        Math.abs(u - o) <= 2 || Math.abs(u - (o - 180)) <= 2 || (s.RotationAngle = o,
          T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE | ConstantData.LinkFlags.SED_L_CHANGE),
          T3Gv.optManager.AddToDirtyList(t))
      }
    }
    T3Gv.optManager.AddToDirtyList(this.BlockID)
  }


  LM_DrawPreTrack(e) {
    return T3Gv.optManager.LinkParams && (
      T3Gv.optManager.LinkParams.ConnectIndex >= 0 ||
      T3Gv.optManager.LinkParams.JoinIndex >= 0) ?
      (this.LM_DrawRelease(),
        !1) : (
        // ListManager.BaseLine.prototype.LM_DrawPreTrack.call(this, e),
        // Double === TODO
        super.LM_DrawPreTrack(e),
        !0)
  }


  LM_DrawClick_ExceptionCleanup(e) {
    T3Gv.optManager.unbindActionClickHammerEvents(),
      T3Gv.optManager.isMobilePlatform || ($(window).unbind("mousemove"),
        T3Gv.optManager.WorkAreaHammer.on("tap", EvtUtil.Evt_WorkAreaHammerClick)),
      this.ResetAutoScrollTimer(),
      T3Gv.optManager.LinkParams = null,
      T3Gv.optManager.actionStoredObjectId = -1,
      T3Gv.optManager.actionSvgObject = null,
      T3Gv.optManager.WorkAreaHammer.on("dragstart", EvtUtil.Evt_WorkAreaHammerDragStart)
  }



  LM_DrawClick(e, t) {


    console.log("PolyLine.prototype.LM_DrawClick", e, t);

    try {
      this.Frame.x = e,
        this.Frame.y = t,
        this.Frame.width = 0,
        this.Frame.height = 0,
        this.StartPoint = {
          x: e,
          y: t
        },
        this.EndPoint = {
          x: e,
          y: t
        };
      var a = this;
      T3Gv.optManager.WorkAreaHammer.off("dragstart"),
        T3Gv.optManager.isMobilePlatform && (T3Gv.optManager.WorkAreaHammer.on("dragstart", EvtUtil.Evt_PolyLineDrawDragStart),
          T3Gv.optManager.WorkAreaHammer.on("drag", EvtUtil.Evt_DrawTrackHandlerFactory(this)),
          T3Gv.optManager.WorkAreaHammer.on("dragend", EvtUtil.SDJS_LM_PolyLineDrawExtendHandlerFactory(this))),
        T3Gv.optManager.WorkAreaHammer.on("doubletap", EvtUtil.Evt_DrawReleaseHandlerFactory(this)),
        T3Gv.optManager.isMobilePlatform || (T3Gv.optManager.WorkAreaHammer.on("tap", EvtUtil.SDJS_LM_PolyLineDrawExtendHandlerFactory(this)),
          T3Gv.optManager.WorkAreaHammer.on("drag", EvtUtil.Evt_DrawTrackHandlerFactory(this)),
          T3Gv.optManager.WorkAreaHammer.on("dragend", EvtUtil.SDJS_LM_PolyLineDrawExtendHandlerFactory(this)),
          $(window).bind("mousemove", (function (e) {
            try {
              a.LM_DrawTrack(e)
            } catch (e) {
              a.LM_DrawClick_ExceptionCleanup(e);
              T3Gv.optManager.ExceptionCleanup(e);
              throw e;
            }
          }
          )))
    } catch (e) {
      this.LM_DrawClick_ExceptionCleanup(e);
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }


  LM_DrawRelease(e) {
    var t, a, r, i;
    e && e.gesture.stopDetect(),
      T3Gv.optManager.unbindActionClickHammerEvents(),
      T3Gv.optManager.isMobilePlatform || ($(window).unbind("mousemove"),
        T3Gv.optManager.WorkAreaHammer.on("tap", EvtUtil.Evt_WorkAreaHammerClick));
    if (i = this.polylist.segs.length,
      a = this.polylist.segs[i - 2].pt.x - this.polylist.segs[i - 1].pt.x,
      r = this.polylist.segs[i - 2].pt.y - this.polylist.segs[i - 1].pt.y,
      t = Math.sqrt(a * a + r * r),
      i > 2 && t < 5 && this.polylist.segs.pop(),
      this.ResetAutoScrollTimer(),
      Collab.AllowMessage()) {
      var n = {
        attributes: {}
      };
      n.attributes.StyleRecord = Utils1.DeepCopy(T3Gv.optManager.drawShape.StyleRecord),
        n.attributes.StartArrowID = T3Gv.optManager.drawShape.StartArrowID,
        n.attributes.EndArrowID = T3Gv.optManager.drawShape.EndArrowID,
        n.attributes.StartArrowDisp = T3Gv.optManager.drawShape.StartArrowDisp,
        n.attributes.ArrowSizeIndex = T3Gv.optManager.drawShape.ArrowSizeIndex,
        n.attributes.TextGrow = T3Gv.optManager.drawShape.TextGrow,
        n.attributes.TextAlign = T3Gv.optManager.drawShape.TextAlign,
        n.attributes.TextDirection = T3Gv.optManager.drawShape.TextDirection,
        n.attributes.Dimensions = T3Gv.optManager.drawShape.Dimensions,
        n.attributes.StartPoint = Utils1.DeepCopy(T3Gv.optManager.drawShape.StartPoint),
        n.attributes.EndPoint = Utils1.DeepCopy(T3Gv.optManager.drawShape.EndPoint),
        n.attributes.Frame = Utils1.DeepCopy(T3Gv.optManager.drawShape.Frame),
        n.attributes.extraflags = ConstantData.ExtraFlags.SEDE_SideKnobs,
        this.polylist && (n.attributes.polylist = Utils1.DeepCopy(this.polylist)),
        n.LineTool = ConstantData.DocumentContext.LineTool,
        Collab.AddNewBlockToSecondary(T3Gv.optManager.drawShape.BlockID),
        Collab.IsSecondary() && (n.CreateList = [T3Gv.optManager.drawShape.BlockID]),
        n.LinkParams = Utils1.DeepCopy(T3Gv.optManager.LinkParams),
        n.Actions = [];
      var o = new Collab.MessageAction(ConstantData.CollabMessageActions.CreateLine);
      n.Actions.push(o),
        o = new Collab.MessageAction(ConstantData.CollabMessageActions.LinkObject),
        n.Actions.push(o),
        Collab.BuildMessage(ConstantData.CollabMessages.AddLine, n, !1)
    }
    this.LM_DrawPostRelease(T3Gv.optManager.actionStoredObjectId),
      T3Gv.optManager.PostObjectDraw()
  }


  LM_DrawExtend(e) {
    var t, a, r, i = {};
    if (T3Gv.optManager.LinkParams && (T3Gv.optManager.LinkParams.ConnectIndex >= 0 || T3Gv.optManager.LinkParams.JoinIndex >= 0))
      this.LM_DrawRelease(e);
    else {
      var n = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
      r = this.polylist.segs.length,
        i.x = this.polylist.segs[r - 2].pt.x + this.StartPoint.x,
        i.y = this.polylist.segs[r - 2].pt.y + this.StartPoint.y,
        t = n.x - i.x,
        a = n.y - i.y,
        Math.sqrt(t * t + a * a) >= 10 && (this.polylist.segs.push(new PolySeg(ConstantData.LineType.LINE, n.x - this.StartPoint.x, n.y - this.StartPoint.y)),
          this.polylist.segs.length >= ConstantData.Defines.SED_MaxPolySegs) && this.LM_DrawRelease(e)
    }
  }


  RightClick(e) {
    var t, a, r = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY), i = new HitResult(-1, 0, null), n = T3Gv.optManager.svgObjectLayer.FindElementByDOMElement(e.currentTarget);
    if (!T3Gv.optManager.SelectObjectFromClick(e, n))
      return !1;
    var o = n.GetID();
    if ((t = T3Gv.optManager.GetObjectPtr(o, !1)) && t.GetTextObject() >= 0) {
      var s = n.textElem;
      s && (a = s.GetSpellAtLocation(e.gesture.center.clientX, e.gesture.center.clientY)) >= 0 && T3Gv.optManager.ActivateTextEdit(n, e, !0)
    }
    if (T3Gv.optManager.RightClickParams = new RightClickData(),
      T3Gv.optManager.RightClickParams.TargetID = n.GetID(),
      T3Gv.optManager.RightClickParams.HitPt.x = r.x,
      T3Gv.optManager.RightClickParams.HitPt.y = r.y,
      T3Gv.optManager.RightClickParams.Locked = (this.flags & ConstantData.ObjFlags.SEDO_Lock) > 0,
      this.Hit(r, !1, !1, i),
      i.hitcode && (T3Gv.optManager.RightClickParams.segment = i.segment),
      null != T3Gv.optManager.GetActiveTextEdit()) {
      var l = T3Gv.optManager.svgDoc.GetActiveEdit();
      a = -1,
        l && (a = l.GetSpellAtLocation(e.gesture.center.clientX, e.gesture.center.clientY)),
        a >= 0 ? T3Gv.optManager.svgDoc.GetSpellCheck().ShowSpellMenu(l, a, e.gesture.center.clientX, e.gesture.center.clientY) : Commands.MainController.ShowContextualMenu(Resources.Controls.ContextMenus.TextMenu.Id.toLowerCase(), e.gesture.center.clientX, e.gesture.center.clientY)
    } else
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ? Commands.MainController.ShowContextualMenu(Resources.Controls.ContextMenus.PolyWall.Id.toLowerCase(), e.gesture.center.clientX, e.gesture.center.clientY) : Commands.MainController.ShowContextualMenu(Resources.Controls.ContextMenus.PolyLine.Id.toLowerCase(), e.gesture.center.clientX, e.gesture.center.clientY)
  }


  SimplifyForVisioExport(e) {
    var t, a = !1, r = [], i = [], n = [];
    for (t = 0; t < e.polylist.segs.length; t++)
      switch (e.polylist.segs[t].LineType) {
        case ConstantData.LineType.NURBS:
          a = !0;
          break;
        case ConstantData.LineType.MOVETO:
        case ConstantData.LineType.MOVETO_NEWPOLY:
          n.push(t - 1)
      }
    if (a) {
      var o = e.StartPoint.x
        , s = e.StartPoint.y
        , l = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, r)
        , S = l.length
        , c = ConstantData.LineType.LINE
        , u = 0;
      for (lasti = 0,
        t = 0; t < S; t++)
        if (r[n[u]] === t)
          i.push(new PolySeg(e.polylist.segs[n[u] + 1].LineType, l[t].x - o, l[t].y - s)),
            u++,
            lasti = t;
        else {
          if (t > 0 && Utils2.IsEqual(l[t].x, l[lasti].x, .1) && Utils2.IsEqual(l[t].y, l[lasti].y, .1))
            continue;
          i.push(new PolySeg(c, l[t].x - o, l[t].y - s)),
            lasti = t
        }
      e.polylist.segs = i
    }
  }


  WriteSDFAttributes(e, t, a) {
    "use strict";
    var r, i, n, o, s, l, S, c, u, p, d, D, g = -1, h = null, m = [], C = [], y = [], f = Utils1.DeepCopy(this), L = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWPOLY), I = !1;
    if (f.StyleRecord.Line.BThick && f.polylist && f.polylist.closed && f.polylist.segs && f.polylist.segs.length && !t.WriteVisio) {
      // if (f instanceof ListManager.Polygon)
      // if (f instanceof GlobalDataShape.Polygon)
      if (f instanceof Instance.Shape.Polygon)
        (_ = {}).Frame = f.Frame,
          _.inside = f.inside,
          (D = new ListManager.PolyLine(_)).polylist = f.polylist,
          D.StartPoint = f.StartPoint,
          D.EndPoint = f.EndPoint;
      else
        D = f;
      if (m = D.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, y),
        y.length > 0)
        for (C.push(new Point(m[0].x, m[0].y)),
          r = 0; r < y.length; r++)
          C.push(new Point(m[y[r]].x, m[y[r]].y));
      else
        C = Utils1.DeepCopy(m);
      m = T3Gv.optManager.InflateLine(C, f.StyleRecord.Line.BThick, !0, !1),
        f.StartPoint.x = m[0].x,
        f.StartPoint.y = m[0].y,
        f.EndPoint.x = m[m.length - 1].x,
        f.EndPoint.y = m[m.length - 1].y;
      var T = Utils1.DeepCopy(f.polylist.segs);
      for (f.polylist.segs = [],
        r = 0; r < m.length; r++)
        f.polylist.segs.push(new PolySeg(1, m[r].x - f.StartPoint.x, m[r].y - f.StartPoint.y)),
          r < T.length && (f.polylist.segs[r].LineType = T[r].LineType,
            f.polylist.segs[r].ShortRef = T[r].ShortRef,
            f.polylist.segs[r].dataclass = T[r].dataclass,
            f.polylist.segs[r].dimDeflection = T[r].dimDeflection,
            f.polylist.segs[r].flags = T[r].flags,
            f.polylist.segs[r].param = T[r].param,
            f.polylist.segs[r].weight = T[r].weight);
      // if (f instanceof ListManager.BaseLine)
      if (f instanceof BaseLine)
        f.CalcFrame();
      // else if (f instanceof ListManager.Polygon)
      // else if (f instanceof GlobalDataShape.Polygon) {
      else if (f instanceof Instance.Shape.Polygon) {
        var b = f.StyleRecord.Line.BThick
          , M = f.Frame.width / (f.Frame.width + 2 * b)
          , P = f.Frame.height / (f.Frame.height + 2 * b)
          , R = f.Frame.x * M - f.Frame.x + b
          , A = f.Frame.y * P - f.Frame.y + b;
        f.ScaleObject(R, A, null, 0, M, P, !1)
      }
    }
    if (a ? (n = SDF.ToSDWinCoords(f.polylist.dim.x, t.coordScaleFactor),
      o = SDF.ToSDWinCoords(f.polylist.dim.y, t.coordScaleFactor),
      p = f.polylist.offset.x,
      d = f.polylist.offset.y) : (n = SDF.ToSDWinCoords(f.Frame.width, t.coordScaleFactor),
        o = SDF.ToSDWinCoords(f.Frame.height, t.coordScaleFactor),
        p = f.StartPoint.x - f.Frame.x,
        d = f.StartPoint.y - f.Frame.y),
      t.WriteVisio) {
      var _;
      // if (f instanceof ListManager.PolyLine == 0)
      if (f instanceof PolyLine == 0)
        (_ = {}).Frame = f.Frame,
          _.inside = f.inside,
          (D = new ListManager.PolyLine(_)).polylist = f.polylist,
          D.StartPoint = f.StartPoint,
          D.EndPoint = f.EndPoint;
      else
        D = f;
      D.SimplifyForVisioExport(f)
    }
    if (S = t.WriteBlocks ? this.BlockID : t.polyid++,
      t.WriteVisio || t.WriteWin32) {
      var E = {
        InstID: S,
        n: f.polylist.segs.length,
        dim: {
          x: 0,
          y: 0
        },
        flags: f.polylist.flags,
        ldim: {
          x: n,
          y: o
        }
      };
      e.writeStruct(FileParser.SDF_PolyList_Struct_20, E)
    } else {
      E = {
        InstID: S,
        n: f.polylist.segs.length,
        flags: f.polylist.flags,
        ldim: {
          x: n,
          y: o
        }
      };
      e.writeStruct(FileParser.SDF_PolyList_Struct_24, E)
    }
    for (SDF.Write_LENGTH(e, L),
      r = 0; r < f.polylist.segs.length; r++) {
      if (s = SDF.ToSDWinCoords(f.polylist.segs[r].pt.x + p, t.coordScaleFactor),
        l = SDF.ToSDWinCoords(f.polylist.segs[r].pt.y + d, t.coordScaleFactor),
        i = SDF.LineTypetoWin32type(f.polylist.segs[r].LineType, f.polylist.segs[r].dataclass, f.polylist.segs[r].ShortRef, f.polylist.segs[r].param, f.polylist.segs[r].weight, t),
        f.polylist.segs[r].LineType === ConstantData.LineType.ARCLINE)
        r > 0 && Math.abs(f.polylist.segs[r].pt.y - f.polylist.segs[r - 1].pt.y) < 1 / 6 && f.polylist.segs[r].pt.x < f.polylist.segs[r - 1].pt.x && (i.param = -i.param);
      if (t.WriteVisio || t.WriteWin32) {
        var w = {
          otype: i.otype,
          dataclass: i.dataclass,
          ShortRef: i.ShortRef,
          param: i.param,
          pt: {
            x: 0,
            y: 0
          },
          lpt: {
            x: s,
            y: l
          },
          dimDeflection: SDF.ToSDWinCoords(f.polylist.segs[r].dimDeflection, t.coordScaleFactor),
          flags: f.polylist.segs[r].flags,
          weight: f.polylist.segs[r].weight
        };
        if (t.WriteVisio && f.polylist.segs[r].LineType === ConstantData.LineType.ARCSEGLINE) {
          // var F = ListManager.PolyLine.prototype.Pr_GetEllipsePoints.call(f, 5, !0, r, f.polylist.segs[r].param, f.polylist.segs[r].ShortRef, 1, 1);
          var F = this.Pr_GetEllipsePoints(5, !0, r, f.polylist.segs[r].param, f.polylist.segs[r].ShortRef, 1, 1);
          //Double === TODO
          F && 5 === F.length && (w.pt.x = SDF.ToSDWinCoords(F[2].x, t.coordScaleFactor),
            w.pt.y = SDF.ToSDWinCoords(F[2].y, t.coordScaleFactor))
        }
        L = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWPOLYSEG),
          e.writeStruct(FileParser.SDF_PolySeg_Struct_40, w)
      } else {
        w = {
          otype: i.otype,
          dataclass: i.dataclass,
          ShortRef: i.ShortRef,
          param: i.param,
          lpt: {
            x: s,
            y: l
          },
          dimDeflection: SDF.ToSDWinCoords(f.polylist.segs[r].dimDeflection, t.coordScaleFactor),
          flags: f.polylist.segs[r].flags,
          weight: f.polylist.segs[r].weight
        };
        L = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWPOLYSEG),
          e.writeStruct(FileParser.SDF_PolySeg_Struct_50, w)
      }
      SDF.Write_LENGTH(e, L)
    }
    if (e.writeUint16(FileParser.SDROpCodesByName.SDF_C_DRAWPOLY_END),
      !(a || t.WriteVisio && this.LineType !== ConstantData.LineType.POLYLINE)) {
      if (this.DataID >= 0) {
        switch (SDF.TextAlignToWin(this.TextAlign).vjust) {
          case FileParser.TextJust.TA_TOP:
          case FileParser.TextJust.TA_BOTTOM:
        }
        c = ConstantData.TextFlags.SED_TF_AttachC,
          this.LineTextX && (c = ConstantData.TextFlags.SED_TF_AttachC),
          this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_AttachA | ConstantData.TextFlags.SED_TF_AttachB | ConstantData.TextFlags.SED_TF_AttachC | ConstantData.TextFlags.SED_TF_AttachD, !1),
          this.TextFlags = Utils2.SetFlag(this.TextFlags, c, !0),
          this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_HorizText, !this.TextDirection)
      }
      if ((t.WriteBlocks || t.WriteVisio) && (g = this.DataID),
        SDF.WriteTextParams(e, this, g, t),
        t.WriteVisio && g >= 0 && SDF.WriteText(e, this, null, null, !1, t),
        this.EMFHash && !I && (SDF.WriteString8(e, this.EMFHash, FileParser.SDROpCodesByName.SDF_C_EMFHASH, t),
          I = !0),
        u = this.GetEMFBlobBytes())
        SDF.WriteImageHeader(e, this, t),
          this.EMFHash && !I && SDF.WriteString8(e, this.EMFHash, FileParser.SDROpCodesByName.SDF_C_EMFHASH, t),
          t.WriteBlocks || t.WriteGroupBlock ? SDF.WriteEMFBlobBytesID(e, this.EMFBlobBytesID, FileParser.Image_Dir.dir_meta, t) : SDF.WriteBlob(e, u.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWMETA),
          (h = this.GetBlobBytes()) && (t.WriteBlocks || t.WriteGroupBlock ? SDF.WriteBlobBytesID(e, this.BlobBytesID, FileParser.Image_Dir.dir_png, t) : SDF.WriteBlob(e, h.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWPREVIEWPNG));
      else if (h = this.GetBlobBytes())
        switch (SDF.WriteImageHeader(e, this, t),
        h.ImageDir) {
          case FileParser.Image_Dir.dir_jpg:
            SDF.WriteImageHeader(e, this, t),
              t.WriteBlocks || t.WriteGroupBlock ? SDF.WriteBlobBytesID(e, this.BlobBytesID, FileParser.Image_Dir.dir_jpg, t) : SDF.WriteBlob(e, h.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWJPG);
            break;
          case FileParser.Image_Dir.dir_png:
            SDF.WriteImageHeader(e, this, t),
              t.WriteBlocks || t.WriteGroupBlock ? SDF.WriteBlobBytesID(e, this.BlobBytesID, FileParser.Image_Dir.dir_png, t) : SDF.WriteBlob(e, h.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWPNG)
        }
      SDF.WriteArrowheads(e, t, this)
    }
  }


  Pr_GetNURBSPoints(e, t, a, r, i, n) {
    function o() {
      var e, t, a, r, i, n, o, s, l, S;
      for (l = (y[m - 1] - y[0]) / L,
        t = 0,
        S = y[0],
        r = 0; r < L; r++) {
        for (; S >= y[t];)
          t++;
        for (T[(e = t - 1) + (o = f * r)] = 1,
          i = 2; i <= c; i++)
          for ((n = e - i + 1) < 0 && (n = 0),
            a = n; a <= e; a++) {
            var u = y[a + i - 1] - y[a]
              , d = y[a + i] - y[a + 1];
            0 === u && (u = 1e-11),
              0 === d && (d = 1e-11),
              a + o + 1 < I && (T[a + o] = T[a + o] * (S - y[a]) / u + T[a + 1 + o] * (y[a + i] - S) / d)
          }
        for (s = 0,
          i = 0; i < p; i++)
          s += D[i] * T[i + o];
        for (i = 0; i < p; i++)
          T[i + o] = D[i] * T[i + o] / s;
        S += l
      }
      return T
    }
    var s, l, S, c, u = [], p = 0;
    l = [],
      S = [];
    var d = !1;
    for (s = e; s < this.polylist.segs.length && (this.polylist.segs[s].LineType == ConstantData.LineType.NURBS || this.polylist.segs[s].LineType == ConstantData.LineType.NURBSSEG); ++s) {
      if (this.polylist.segs[s].LineType == ConstantData.LineType.NURBS) {
        if (d)
          break;
        d = !0
      }
      this.polylist.segs[s].LineType == ConstantData.LineType.NURBSSEG && p++
    }
    c = this.polylist.segs[e].ShortRef + 1;
    var D = [];
    for (s = 0; s < p; ++s)
      D.push(this.polylist.segs[s + e + 1].weight);
    var g, h, m, C, y = [];
    if (-1 == this.polylist.segs[e].param) {
      for (C = 0,
        s = 0; s < c; ++s)
        y.push(C);
      for (C++,
        s = c; s < p + 1; ++s)
        y.push(C),
          C++;
      for (h = y[s - 1] - y[0],
        s = 1; s < c; ++s)
        y.push(h);
      m = y.length
    } else {
      for (s = 0; s < p - 1; ++s)
        y.push(this.polylist.segs[s + e + 1].param);
      for (y.push(this.polylist.segs[e].param),
        g = this.polylist.segs[s + e + 1].param,
        y.push(g),
        h = g - y[0],
        s = 0; s < c - 1; ++s)
        y.push(y[s + 1] + h);
      m = p + c
    }
    var f = p;
    for (s = 0; s < p; ++s)
      l.push(this.polylist.segs[s + e + 1].pt.x),
        S.push(this.polylist.segs[s + e + 1].pt.y);
    var L = t
      , I = p * L
      , T = new Float64Array(I)
      , b = new Float64Array(l)
      , M = new Float64Array(S);
    D = new Float64Array(D);
    var P = (y = new Float64Array(y))[0]
      , R = y[m - 1] - P;
    for (s = 0; s < m; s++)
      y[s] = (y[s] - P) / R;
    for (s = 0; s < y.length; ++s)
      y[s] = Math.floor(1e4 * y[s]),
        y[s] /= 1e4,
        s > 0 ? y[s] < y[s - 1] && (y[s] = y[s - 1]) : y[0] > y[1] && (y[0] = 0);
    return this.polylist.closed ? o() : null == this.polylist.segs[e].UserData || this.polylist.segs[e].UserData.nPoints != t || 0 === this.polylist.segs[e].UserData.basis.length ? (o(),
      this.polylist.segs[e].UserData = {
        nPoints: t,
        basis: T
      }) : T = this.polylist.segs[e].UserData.basis,
      function () {
        var e, o, s, l, S, d, g, h, C, L;
        for (s = (y[m - 1] - y[0]) / t,
          d = 0,
          g = 0,
          h = (l = Math.floor((y[c - 1] - y[0]) / s) + 1) * f,
          C = 0; C < p; C++)
          L = D[C] * T[C + h],
            d += b[C] * L,
            g += M[C] * L;
        for (u.push(new Point(d * i + a, g * n + r)),
          o = c - 1; o < p; o++) {
          for (S = Math.floor((y[o + 1] - y[0]) / s),
            e = l; e < S; e++)
            if (d = 0,
              g = 0,
              (h += f) + p - 1 < I) {
              for (C = 0; C < p; C++)
                L = T[C + h],
                  d += b[C] * L,
                  g += M[C] * L;
              u.push(new Point(d * i + a, g * n + r))
            }
          l = S
        }
      }(),
      u
  }


  Pr_GetSPLINEPoints(e, t, a, r, i, n) {
    function o() {
      var e, t, a, r, i, n, o, s, l, S;
      for (l = (g[D - 1] - g[0]) / C,
        t = 0,
        S = g[0],
        r = 0; r < C; r++) {
        for (; S >= g[t];)
          t++;
        for (f[(e = t - 1) + (o = m * r)] = 1,
          i = 2; i <= c; i++)
          for ((n = e - i + 1) < 0 && (n = 0),
            a = n; a <= e; a++) {
            var u = g[a + i - 1] - g[a]
              , h = g[a + i] - g[a + 1];
            0 === u && (u = 1e-11),
              0 === h && (h = 1e-11),
              a + o + 1 < y && (f[a + o] = f[a + o] * (S - g[a]) / u + f[a + 1 + o] * (g[a + i] - S) / h)
          }
        for (s = 0,
          i = 0; i < p; i++)
          s += d[i] * f[i + o];
        for (i = 0; i < p; i++)
          f[i + o] = d[i] * f[i + o] / s;
        S += l
      }
    }
    var s, l, S, c, u = [], p = 0;
    for (l = [],
      S = [],
      p = 1,
      s = e + 1; s < this.polylist.segs.length && this.polylist.segs[s].LineType == ConstantData.LineType.SPLINECON; ++s)
      p++;
    c = this.polylist.segs[e].ShortRef + 1;
    var d = [];
    for (s = 0; s < p; ++s)
      d.push(1);
    var D, g = [];
    g.push(this.polylist.segs[e].param),
      g.push(this.polylist.segs[e].weight);
    var h = this.polylist.segs[e].dataclass;
    for (s = 2; s < p; ++s)
      g.push(this.polylist.segs[s + e].weight);
    for (g.push(h),
      s = 0; s < c - 1; ++s)
      g.push(h);
    D = g.length;
    var m = p;
    for (l.push(this.polylist.segs[e].pt.x),
      S.push(this.polylist.segs[e].pt.y),
      s = 1; s < p; ++s)
      l.push(this.polylist.segs[s + e].pt.x),
        S.push(this.polylist.segs[s + e].pt.y);
    var C = t
      , y = p * C
      , f = new Float64Array(y)
      , L = new Float64Array(l)
      , I = new Float64Array(S);
    d = new Float64Array(d);
    var T = (g = new Float64Array(g))[0]
      , b = g[D - 1] - T;
    for (s = 0; s < D; s++)
      g[s] = (g[s] - T) / b;
    for (s = 0; s < g.length; ++s)
      g[s] = Math.floor(1e4 * g[s]),
        g[s] /= 1e4,
        s > 0 ? g[s] < g[s - 1] && (g[s] = g[s - 1]) : g[0] > g[1] && (g[0] = 0);
    return this.polylist.closed ? o() : null == this.polylist.segs[e].UserData || this.polylist.segs[e].UserData.nPoints != t || 0 === this.polylist.segs[e].UserData.basis.length ? (o(),
      this.polylist.segs[e].UserData = {
        nPoints: t,
        basis: f
      }) : f = this.polylist.segs[e].UserData.basis,
      function () {
        var e, o, s, l, S, h, C, T, b, M;
        for (s = (g[D - 1] - g[0]) / t,
          h = 0,
          C = 0,
          T = (l = Math.floor((g[c - 1] - g[0]) / s) + 1) * m,
          b = 0; b < p; b++)
          M = d[b] * f[b + T],
            h += L[b] * M,
            C += I[b] * M;
        for (u.push(new Point(h * i + a, C * n + r)),
          o = c - 1; o < p; o++) {
          for (S = Math.floor((g[o + 1] - g[0]) / s),
            e = l; e < S; e++)
            if (h = 0,
              C = 0,
              (T += m) + p - 1 < y) {
              for (b = 0; b < p; b++)
                M = f[b + T],
                  h += L[b] * M,
                  C += I[b] * M;
              u.push(new Point(h * i + a, C * n + r))
            }
          l = S
        }
      }(),
      u
  }


  Pr_GetQuadraticBezierPoints(e, t, a, r, i, n) {
    var o, s, l, S, c, u = this.polylist.segs[e].pt.x, p = this.polylist.segs[e].pt.y, d = this.polylist.segs[e + 1].pt.x, D = this.polylist.segs[e + 1].pt.y, g = this.polylist.segs[e + 2].pt.x, h = this.polylist.segs[e + 2].pt.y, m = [];
    for (o = 1 / (t - 1),
      s = 0,
      c = 0; c < t; ++c)
      (S = {}).x = (l = 1 - s) * l * u + 2 * l * s * d + s * s * g,
        S.y = l * l * p + 2 * l * s * D + s * s * h,
        m.push(new Point(S.x * i + a, S.y * n + r)),
        s += o;
    return m
  }


  Pr_GetCubicBezierPoints(e, t, a, r, i, n) {
    var o, s, l, S, c, u = this.polylist.segs[e].pt.x, p = this.polylist.segs[e].pt.y, d = this.polylist.segs[e + 1].pt.x, D = this.polylist.segs[e + 1].pt.y, g = this.polylist.segs[e + 2].pt.x, h = this.polylist.segs[e + 2].pt.y, m = this.polylist.segs[e + 3].pt.x, C = this.polylist.segs[e + 3].pt.y, y = [];
    for (o = 1 / (t - 1),
      s = 0,
      c = 0; c < t; ++c)
      (S = {}).x = (l = 1 - s) * l * l * u + l * l * 3 * s * d + 3 * l * s * s * g + s * s * s * m,
        S.y = l * l * l * p + l * l * 3 * s * D + 3 * l * s * s * h + s * s * s * C,
        y.push(new Point(S.x * i + a, S.y * n + r)),
        s += o;
    return y
  }


  Pr_GetEllipticalArcPoints(e, t, a, r, i, n) {
    var o, s, l, S, c, u, p, d, D, g, h, m, C = [];
    if (o = this.polylist.segs[e].pt.x,
      s = this.polylist.segs[e].pt.y,
      c = this.polylist.segs[e + 1].pt.x,
      u = this.polylist.segs[e + 1].pt.y,
      l = this.polylist.segs[e + 2].pt.x,
      S = this.polylist.segs[e + 2].pt.y,
      o = Math.floor(o),
      s = Math.floor(s),
      c = Math.floor(c),
      u = Math.floor(u),
      l = Math.floor(l),
      S = Math.floor(S),
      c == o && u == s || c == l && u == S)
      return C.push(new Point(o * i + a, s * n + r)),
        C.push(new Point(l * i + a, S * n + r)),
        C;
    p = this.polylist.segs[e].weight / 10,
      d = this.polylist.segs[e].param;
    var y = function (e, t, a, r, i, n) {
      if (e = Math.floor(e),
        t = Math.floor(t),
        a = Math.floor(a),
        r = Math.floor(r),
        i = Math.floor(i),
        n = Math.floor(n),
        e == a)
        return i < a ? r > t ? 1 : -1 : i > a ? r > t ? -1 : 1 : 0;
      if (t == r)
        return n < r ? a > e ? -1 : 1 : n > r ? a > e ? 1 : -1 : 0;
      var o = (r - t) / (a - e)
        , s = o * i + (t - e * o);
      return Math.abs(n - s) > .001 && 0 !== o ? n > s ? a > e ? 1 : -1 : n < s ? a > e ? -1 : 1 : 0 : 0
    }(o, s, l, S, c, u);
    if (0 === y)
      return C.push(new Point(c * i + a, u * n + r)),
        C.push(new Point(l * i + a, S * n + r)),
        C;
    var f = function (e, t, a, r, i, n, o, s) {
      var l = {}
        , S = 2 * Math.PI * (o / 360)
        , c = Math.sqrt(e * e + t * t) * Math.cos(Math.atan2(t, e) - S)
        , u = Math.sqrt(e * e + t * t) * Math.sin(Math.atan2(t, e) - S)
        , p = Math.sqrt(a * a + r * r) * Math.cos(Math.atan2(r, a) - S)
        , d = Math.sqrt(a * a + r * r) * Math.sin(Math.atan2(r, a) - S)
        , D = Math.sqrt(i * i + n * n) * Math.cos(Math.atan2(n, i) - S)
        , g = Math.sqrt(i * i + n * n) * Math.sin(Math.atan2(n, i) - S)
        , h = (c - p) * (c + p) * (d - g) - (p - D) * (p + D) * (u - d) + s * s * (u - d) * (d - g) * (u - g)
        , m = (c - p) * (p - D) * (c - D) / (s * s) + (p - D) * (u - d) * (u + d) - (c - p) * (d - g) * (d + g)
        , C = c
        , y = u
        , f = h /= 2 * ((c - p) * (d - g) - (p - D) * (u - d))
        , L = m /= 2 * ((p - D) * (u - d) - (c - p) * (d - g));
      h = Math.sqrt(f * f + L * L) * Math.cos(Math.atan2(L, f) + S),
        m = Math.sqrt(f * f + L * L) * Math.sin(Math.atan2(L, f) + S);
      var I = Math.sqrt((C - f) * (C - f) + (y - L) * (y - L) * (s * s))
        , T = I / s;
      return l.centerX = h,
        l.centerY = m,
        l.majorAxis = I,
        l.minorAxis = T,
        l.angle = S,
        l.eccentricity = s,
        l
    }(o, s, l, S, c, u, p, d);
    D = f.centerX,
      g = f.centerY;
    h = f.majorAxis;
    m = f.minorAxis;
    var L, I, T = -2 * Math.PI * (p / 360), b = 2 * Math.PI;
    if (0 === T)
      L = Math.atan2(g - s, 1 / d * (o - D)),
        Math.atan2(g - u, 1 / d * (c - D)),
        I = Math.atan2(g - S, 1 / d * (l - D));
    else {
      var M = [{
        x: o,
        y: s
      }, {
        x: c,
        y: u
      }, {
        x: l,
        y: S
      }];
      !function (e, t, a) {
        var r, i, n, o, s, l;
        if (0 !== t)
          for (r = Math.sin(t),
            i = Math.cos(t),
            Math.abs(i) < 1e-4 && (i = 0),
            Math.abs(r) < 1e-4 && (r = 0),
            l = a.length,
            s = 0; s < l; s++)
            n = a[s].x - e.x,
              o = a[s].y - e.y,
              a[s].x = n * i + o * r + e.x,
              a[s].y = -n * r + o * i + e.y
      }({
        x: D,
        y: g
      }, -T, M),
        L = Math.atan2(g - M[0].y, (M[0].x - D) * (1 / d)),
        Math.atan2(g - M[1].y, (M[1].x - D) * (1 / d)),
        I = Math.atan2(g - M[2].y, (M[2].x - D) * (1 / d))
    }
    var P = !0;
    return I < L && (I += b),
      1 == y && (P = !0),
      -1 == y && (P = !1),
      C = function (e, t, o, s, l, S, c, u, p) {
        var d, D, g, h, m, C = [];
        for (d = S,
          m = u ? (c - S) / (p - 1) : -(b - (c - S)) / (p - 1),
          D = 0; D < p; ++D)
          g = o + e * Math.cos(d) * Math.cos(l) - t * Math.sin(d) * Math.sin(l),
            h = s + e * Math.cos(d) * Math.sin(-l) - t * Math.sin(d) * Math.cos(l),
            C.push(new Point(g * i + a, h * n + r)),
            d += m;
        return C
      }(h, m, D, g, T, L, I, P, t),
      C
  }


  Pr_GetParabolaPoints(e, t, a, r, i, n, o) {
    var s, l, S, c, u, p, d, D, g, h, m, C, y, f, L, I = [], T = {}, b = {}, M = [{
      x: 0,
      y: 0
    }], P = !1, R = 0, A = 0, _ = [];
    if (f = this.StartPoint.x - this.Frame.x,
      L = this.StartPoint.y - this.Frame.y,
      t || (R = this.StartPoint.x,
        A = this.StartPoint.y),
      Math.abs(r) < 1)
      return _.push(new Point(this.polylist.segs[a - 1].pt.x * n + R + f, this.polylist.segs[a - 1].pt.y * o + A + L)),
        _.push(new Point(this.polylist.segs[a].pt.x * n + R + f, this.polylist.segs[a].pt.y * o + A + L)),
        _;
    if (I.push(new Point(this.polylist.segs[a - 1].pt.x * n + f, this.polylist.segs[a - 1].pt.y * o + L)),
      I.push(new Point(this.polylist.segs[a].pt.x * n + f, this.polylist.segs[a].pt.y * o + L)),
      s = I[1].x - I[0].x,
      l = I[1].y - I[0].y,
      (S = Math.sqrt(s * s + l * l)) < 1)
      return _;
    for (Math.round(6 * Math.abs(l)) >= 1 ? (P = !0,
      c = l / S,
      u = s / S,
      p = Math.asin(c),
      u < 0 && (p = -p,
        r = -r,
        i = -i),
      T.x = (I[0].x + I[1].x) / 2,
      T.y = (I[0].y + I[1].y) / 2,
      Utils3.RotatePointsAboutPoint(T, p, I),
      I[0].y !== I[1].y && (C = 0)) : p = 0,
      I.push(new Point((I[0].x + I[1].x) / 2, I[0].y + r)),
      d = I[2].x,
      D = I[2].y,
      y = 0; y < 3; y++)
      I[y].x -= d,
        I[y].y -= D;
    for (T.x = (I[0].x + I[1].x) / 2,
      T.y = (I[0].y + I[1].y) / 2,
      g = I[0].y / (I[0].x * I[0].x),
      C = i / r,
      s = (I[1].x - I[0].x) / (e - 1),
      y = 0; y < e; y++)
      h = I[0].x + s * y,
        h += C * (r + (m = g * h * h)),
        P ? (M[0].x = h,
          M[0].y = m,
          Utils3.RotatePointsAboutPoint(T, -p, M),
          b.x = M[0].x + d,
          b.y = M[0].y + D) : (b.x = h + d,
            b.y = m + D),
        _.push(new Point(b.x + R, b.y + A));
    return _
  }


  Pr_PolyLGetParabolaAdjPoint(e, t) {
    var a, r, i, n, o, s, l, S, c = {}, u = !1, p = [], d = {};
    if (p.push(new Point(this.polylist.segs[t - 1].pt.x, this.polylist.segs[t - 1].pt.y)),
      p.push(new Point(this.polylist.segs[t].pt.x, this.polylist.segs[t].pt.y)),
      a = p[1].x - p[0].x,
      r = p[1].y - p[0].y,
      !((i = Math.sqrt(a * a + r * r)) < 1))
      return l = this.polylist.segs[t].param,
        S = this.polylist.segs[t].ShortRef,
        Math.abs(r) >= 1 ? (u = !0,
          n = r / i,
          o = a / i,
          s = Math.asin(n),
          o < 0 && (s = -s,
            l = -l,
            S = -S),
          c.x = (p[0].x + p[1].x) / 2,
          c.y = (p[0].y + p[1].y) / 2,
          Utils3.RotatePointsAboutPoint(c, s, p)) : s = 0,
        p.push(new Point((p[0].x + p[1].x) / 2 + S, p[0].y + l)),
        u && Utils3.RotatePointsAboutPoint(c, -s, p),
        d.x = p[2].x,
        d.y = p[2].y,
        e || (d.x += this.StartPoint.x,
          d.y += this.StartPoint.y),
        d
  }


  Pr_PolyLGetParabolaParam(e, t) {
    var a, r, i, n, o, s, l, S, c, u, p = {}, d = 1, D = [];
    if (D.push(new Point(this.polylist.segs[t - 1].pt.x, this.polylist.segs[t - 1].pt.y)),
      D.push(new Point(this.polylist.segs[t].pt.x, this.polylist.segs[t].pt.y)),
      a = D[1].x - D[0].x,
      r = D[1].y - D[0].y,
      !((i = Math.sqrt(a * a + r * r)) < 1)) {
      l = e.x - this.StartPoint.x,
        S = e.y - this.StartPoint.y,
        D.push(new Point(l, S)),
        Math.abs(r) >= 1 ? (!0,
          n = r / i,
          o = a / i,
          s = Math.asin(n),
          o < 0 && (s = -s,
            d = -d),
          p.x = (D[0].x + D[1].x) / 2,
          p.y = (D[0].y + D[1].y) / 2,
          Utils3.RotatePointsAboutPoint(p, s, D)) : s = 0,
        c = (D[0].x + D[1].x) / 2,
        u = D[0].y,
        this.polylist.segs[t].param = (D[2].y - u) * d,
        this.polylist.segs[t].ShortRef = (D[2].x - c) * d;
      var g = 6 * this.polylist.segs[t].ShortRef;
      g = Math.floor(g),
        this.polylist.segs[t].ShortRef = g / 6
    }
  }


  Pr_PolyLGetArc(e, t) {
    var a, r, i = {
      StartPoint: {},
      EndPoint: {}
    }, n = {}, o = {
      arcobj: null,
      pt: {
        x: 0,
        y: 0
      }
    };
    return i.StartPoint.x = this.polylist.segs[e - 1].pt.x + t.x,
      i.StartPoint.y = this.polylist.segs[e - 1].pt.y + t.y,
      i.EndPoint.x = this.polylist.segs[e].pt.x + t.x,
      i.EndPoint.y = this.polylist.segs[e].pt.y + t.y,
      this.polylist.segs[e].param >= 0 ? (i.CurveAdjust = this.polylist.segs[e].param,
        i.IsReversed = !0) : (i.CurveAdjust = -this.polylist.segs[e].param,
          i.IsReversed = !1),
      i.FromPolygon = !0,
      (a = new ListManager.ArcLine(i)).Frame = Utils2.Pt2Rect(i.StartPoint, i.EndPoint),
      r = a.CalcRadiusAndCenter(a.StartPoint.x, a.StartPoint.y, a.EndPoint.x, a.EndPoint.y, a.CurveAdjust, a.IsReversed),
      n.x = r.actionX,
      n.y = r.actionY,
      a.BeforeModifyShape(n.x, n.y, 0),
      o.arcobj = a,
      o.pt = n,
      o
  }


  Pr_PolyLGetArcParam(e, t, a) {
    e && (e.ModifyShape(null, t.x, t.y, -1, 0),
      e.IsReversed ? this.polylist.segs[a].param = e.CurveAdjust : this.polylist.segs[a].param = -e.CurveAdjust)
  }


  Pr_GetEllipsePoints(e, t, a, r, i, n, o) {
    var s, l, S, c, u, p, d, D, g, h, m, C, y, f, L, I = [], T = 1, b = !1, M = {}, P = 0, R = 0, A = [], _ = {};
    if (y = this.StartPoint.x - this.Frame.x,
      f = this.StartPoint.y - this.Frame.y,
      I.push(new Point(this.polylist.segs[a - 1].pt.x + y, this.polylist.segs[a - 1].pt.y + f)),
      I.push(new Point(this.polylist.segs[a].pt.x + y, this.polylist.segs[a].pt.y + f)),
      s = I[1].x - I[0].x,
      l = I[1].y - I[0].y,
      S = Math.sqrt(s * s + l * l),
      M.x = this.polylist.segs[a - 1].pt.x,
      M.y = this.polylist.segs[a - 1].pt.y,
      t || (P = this.StartPoint.x,
        R = this.StartPoint.y),
      S < 1)
      return A.push(new Point(this.polylist.segs[a - 1].pt.x * n + P + y, this.polylist.segs[a - 1].pt.y * o + R + f)),
        A.push(new Point(this.polylist.segs[a].pt.x * n + P + y, this.polylist.segs[a].pt.y * o + R + f)),
        A;
    switch (Math.abs(r) >= .01 && (b = !0,
      D = Math.sin(r),
      g = Math.cos(r),
      L = Math.asin(D),
      Utils3.RotatePointsAboutPoint(M, L, I)),
    i) {
      case ConstantData.ArcQuad.SD_PLA_TL:
      case ConstantData.ArcQuad.SD_PLA_TR:
        c = I[1].x,
          u = I[0].y,
          T = -1;
        break;
      case ConstantData.ArcQuad.SD_PLA_BR:
      default:
        c = I[1].x,
          u = I[0].y
    }
    for (C = 0; C < 2; C++)
      I[C].x -= c,
        I[C].y -= u;
    if (h = Math.abs(I[1].x - I[0].x),
      m = Math.abs(I[1].y - I[0].y),
      (h *= h) < 1e-4)
      return A.push(new Point(this.polylist.segs[a - 1].pt.x * n + P + y, this.polylist.segs[a - 1].pt.y * n + R + f)),
        A.push(new Point(this.polylist.segs[a].pt.x * n + P + y, this.polylist.segs[a].pt.y * o + R + f)),
        A;
    for (s = (I[1].x - I[0].x) / (e - 1),
      C = 0; C < e; C++)
      p = I[0].x + s * C,
        d = T * Utils2.sqrt(1 - p * p / h) * m,
        b ? (_.x = (p + c - M.x) * g - (d + u - M.y) * D + M.x,
          _.y = (p + c - M.x) * D + (d + u - M.y) * g + M.y) : (_.x = p + c,
            _.y = d + u),
        A.push(new Point(_.x * n + P, _.y * o + R));
    return A
  }


  Pr_PolyLGetEllipseAdjPoint(e, t) {
    var a, r, i, n, o = {}, s = !1, l = [], S = {};
    return l.push(new Point(this.polylist.segs[t - 1].pt.x, this.polylist.segs[t - 1].pt.y)),
      l.push(new Point(this.polylist.segs[t].pt.x, this.polylist.segs[t].pt.y)),
      o.x = this.polylist.segs[t - 1].pt.x,
      o.y = this.polylist.segs[t - 1].pt.y,
      S.x = (l[0].x + l[1].x) / 2,
      S.x = (l[0].y + l[1].y) / 2,
      n = this.polylist.segs[t].param,
      Math.abs(n) >= .01 ? (s = !0,
        a = Math.sin(n),
        r = Math.cos(n),
        i = Math.asin(a),
        r < 0 && (i = -i),
        Utils3.RotatePointsAboutPoint(o, i, l)) : i = 0,
      l.push(new Point(l[1].x, l[0].y)),
      s && Utils3.RotatePointsAboutPoint(o, -i, l),
      S.x = l[2].x,
      S.y = l[2].y,
      e || (S.x += this.StartPoint.x,
        S.y += this.StartPoint.y),
      S
  }


  Pr_PolyLGetEllipseParam(e, t, a) {
    var r, i, n, o, s, l, S, c, u, p, d, D, g, h = [], m = {}, C = {};
    if (h.push(new Point(this.polylist.segs[t - 1].pt.x, this.polylist.segs[t - 1].pt.y)),
      h.push(new Point(this.polylist.segs[t].pt.x, this.polylist.segs[t].pt.y)),
      r = h[1].x - h[0].x,
      i = h[1].y - h[0].y,
      !(Math.sqrt(r * r + i * i) < 1) && !(Math.abs(i) <= 1) && (o = e.x - this.StartPoint.x,
        s = e.y - this.StartPoint.y,
        h.push(new Point(o, s)),
        i = h[2].y - h[0].y,
        r = h[2].x - h[0].x,
        Math.abs(r) < .001 ? D = ConstantData.Geometry.PI / 2 : (g = i / r,
          D = Math.atan(g)),
        this.polylist.segs[t].param = D,
        (l = this.Pr_PolyLGetArcQuadrant(h[0], h[1], D)).ShortRef !== this.polylist.segs[t].ShortRef && (this.polylist.segs[t].ShortRef = l.ShortRef),
        n = this.Pr_PolyLGetEllipseAdjPoint(!0, t),
        h.pop(),
        h.splice(1, 0, n),
        Utils2.GetPolyRect(m, h),
        u = this.StartPoint.x - this.Frame.x,
        p = this.StartPoint.y - this.Frame.y,
        S = ConstantData.Defines.EllipseAxes,
        null == (C = a.GetElementByID(S)) && null != (C = T3Gv.optManager.svgDoc.CreateShape(Document.CreateShapeType.POLYLINE)) && (C.SetFillColor("none"),
          C.SetStrokeColor("green"),
          C.SetStrokePattern("4,2"),
          C.SetID(S),
          a.AddElement(C)),
        C)) {
      for (C.SetSize(m.width, m.height),
        c = h.length,
        d = 0; d < c; d++)
        h[d].x += u,
          h[d].y += p;
      C.SetPoints(h)
    }
  }


  Pr_PolyLGetArcQuadrant(e, t, a) {
    var r, i, n, o, s, l = {
      param: 0,
      ShortRef: 0
    }, S = [], c = {};
    return S.push(new Point(e.x, e.y)),
      S.push(new Point(t.x, t.y)),
      c.x = e.x,
      c.y = e.y,
      Math.abs(a) >= .01 && (!0,
        r = Math.sin(a),
        i = Math.cos(a),
        n = Math.asin(r),
        i < 0 && (n = -n),
        Utils3.RotatePointsAboutPoint(c, n, S)),
      o = S[0],
      (s = S[1]).x > o.x ? s.y > o.y ? (l.param = -ConstantData.Geometry.PI / 2,
        l.ShortRef = ConstantData.ArcQuad.SD_PLA_BL,
        t.notclockwise && (l.param = 0),
        l) : (l.ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          t.notclockwise && (l.ShortRef = ConstantData.ArcQuad.SD_PLA_TR,
            l.param = ConstantData.Geometry.PI / 2),
          l) : s.y > o.y ? (l.ShortRef = ConstantData.ArcQuad.SD_PLA_BR,
            t.notclockwise && (l.ShortRef = ConstantData.ArcQuad.SD_PLA_BL,
              l.param = ConstantData.Geometry.PI / 2),
            l) : (l.param = -ConstantData.Geometry.PI / 2,
              l.ShortRef = ConstantData.ArcQuad.SD_PLA_TR,
              t.notclockwise && (l.param = 0),
              l)
  }


  NeedsAddLineThicknessToDimension(e, t) {
    "use strict";
    return !!this.polylist.closed
  }


  GetExteriorDimensionMeasurementLineThicknessAdjustment(e) {
    "use strict";
    var t = this.ConvToUnits(this.StyleRecord.Line.Thickness, gDocumentHandler.rulerSettings.originx);
    return t /= 2,
      this.IsTerminalSegment(e) || (t *= 2),
      t
  }


  CanUseStandOffDimensionLines() {
    "use strict";
    return !!this.polylist.closed || !(this.Dimensions & ConstantData.DimensionFlags.SED_DF_Total) && !(this.Dimensions & ConstantData.DimensionFlags.SED_DF_EndPts)
  }


  GetDimensionTextForPoints(e, t) {
    "use strict";
    var a, r = [], i = 0, n = 0, o = 0, s = 0, l = 0;
    if (!this.polylist.closed && this.Dimensions & ConstantData.DimensionFlags.SED_DF_Total) {
      var S = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, null);
      for (a = 1; a < S.length; a++)
        s = Math.abs(S[a - 1].x - S[a].x),
          l = Math.abs(S[a - 1].y - S[a].y),
          o += Math.sqrt(s * s + l * l)
    } else
      i = 360 - Utils1.CalcAngleFromPoints(e, t),
        n = 2 * Math.PI * (i / 360),
        r.push(new Point(e.x, e.y)),
        r.push(new Point(t.x, t.y)),
        Utils3.RotatePointsAboutCenter(this.Frame, -n, r),
        o = Math.abs(r[0].x - r[1].x);
    return this.GetLengthInRulerUnits(o)
  }


  UpdateSecondaryDimensions(e, t, a) {
    "use strict";
    var r, i = [], n = 0,
      o = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always || this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select;

    // o = this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always || this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select;



    if (this.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL || this.Dimensions & ConstantData.DimensionFlags.SED_DF_HideHookedObjDimensions || (o || a) && this.UpdateHookedObjectDimensionLines(e, t, a),
      o && this.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowLineAngles && this.polylist)
      for (r = (i = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null)).length,
        n = 1; n < r; n++)
        this.DrawDimensionAngle(e, t, n, i)
  }


  GetBoundingBoxesForSecondaryDimensions() {
    "use strict";
    var e, t, a, r = {}, i = [];
    // if (i = ListManager.BaseLine.prototype.GetBoundingBoxesForSecondaryDimensions.call(this),
    // Double === TODO
    if (i = super.GetBoundingBoxesForSecondaryDimensions(),
      !(this.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowLineAngles))
      return i;
    for (a = (t = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null)).length,
      e = 1; e < a; e++)
      (r = this.GetDimensionAngleInfo(e, t)) && (r.text = null,
        i.push(r.textRect));
    return i
  }


  GetAreaWidthAndHeightText(e) {
    "use strict";
    var t, a, r, i, n, o = "";
    return this.polylist && this.polylist.closed && T3Gv.optManager.IsRectangularPolygon(e) ? ((t = T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(e[0], e[1])) < Math.PI / 4 || t > 1.5 * Math.PI || t > .75 * Math.PI && t < 1.25 * Math.PI ? (i = 1,
      n = 2) : (i = 2,
        n = 1),
      a = Utils2.GetDistanceBetween2Points(e[i - 1], e[i]),
      r = Utils2.GetDistanceBetween2Points(e[n - 1], e[n]),
      o = this.GetLengthInRulerUnits(r),
      o += " x ",
      o += this.GetLengthInRulerUnits(a)) : null
  }


  SetSegmentAngle(e, t, a) {


    console.log('ListManager.PolyLine.prototype.SetSegmentAngle', e, t, a);


    var r, n, o, s, l, S = [], c = [], u = -1, p = 0, d = 0;
    if (!(t <= 0 || t >= this.polylist.segs.length)) {
      if (T3Gv.optManager.GetObjectPtr(this.BlockID, !0),
        r = Utils1.DeepCopy(this),
        S.push(new Point(this.polylist.segs[t - 1].pt.x, this.polylist.segs[t - 1].pt.y)),
        S.push(new Point(this.polylist.segs[t].pt.x, this.polylist.segs[t].pt.y)),
        S[0].x += this.StartPoint.x,
        S[1].x += this.StartPoint.x,
        S[0].y += this.StartPoint.y,
        S[1].y += this.StartPoint.y,
        new Point(S[1].x, S[1].y),
        o = T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(S[0], S[1]),
        Utils3.RotatePointsAboutPoint(S[0], -o, S),
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_InteriorAngles) {
        if (c.push(new Point(S[0].x, S[0].y)),
          1 === t) {
          if (!this.polylist.closed)
            return;
          c.push(new Point(this.polylist.segs[this.polylist.segs.length - 2].pt.x, this.polylist.segs[this.polylist.segs.length - 2].pt.y))
        } else
          c.push(new Point(this.polylist.segs[t - 2].pt.x, this.polylist.segs[t - 2].pt.y));
        c[1].x += this.StartPoint.x,
          c[1].y += this.StartPoint.y,
          s = T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(c[0], c[1]),
          Utils3.RotatePointsAboutPoint(S[0], s, S)
      } else
        s = 0;
      for (l = a / 360 * (2 * Math.PI),
        (n = o - s) < 0 && (n += 2 * Math.PI),
        n > Math.PI && (l = 2 * Math.PI - l),
        Utils3.RotatePointsAboutPoint(S[0], l, S),
        t == this.polylist.segs.length - 1 ? (u = this.polylist.closed ? ConstantData.ActionTriggerType.POLYLEND : ConstantData.ActionTriggerType.LINEEND,
          this.AdjustLineEnd(e, S[1].x, S[1].y, u)) : 0 == t ? this.AdjustLineStart(e, S[1].x, S[1].y, ConstantData.ActionTriggerType.LINESTART) : this.ModifyShape(e, S[1].x, S[1].y, ConstantData.ActionTriggerType.POLYLNODE, t),
        T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
        hlen = this.hooks.length,
        i = 0; i < hlen; i++)
        T3Gv.optManager.SetLinkFlag(this.hooks[i].objid, ConstantData.LinkFlags.SED_L_MOVE);
      T3Gv.optManager.ActionTriggerData = t,
        T3Gv.optManager.MaintainLink(this.BlockID, this, r, ConstantData.ActionTriggerType.POLYLNODE),
        (this.Frame.x < 0 || this.Frame.y < 0) && (frame = this.Frame,
          frame.x < 0 && (p = -frame.x,
            frame.x += p),
          frame.y < 0 && (d = -frame.y,
            (

              this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
              this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select

              // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always ||
              // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select

            )

            && (d += ConstantData.Defines.DimensionDefaultStandoff),
            frame.y += d),
          this.StartPoint.x += p,
          this.StartPoint.y += d,
          this.EndPoint.x += p,
          this.EndPoint.y += d,
          T3Gv.optManager.SetObjectFrame(this.BlockID, frame)),
        this.UpdateDrawing(e),
        -1 != this.DataID && this.LM_ResizeSVGTextObject(e, this, this.Frame)
    }
  }


  IsTextFrameOverlap(e, t) {
    "use strict";
    var a, r, i = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null);
    return a = 360 - t,
      r = 2 * Math.PI * (a / 360),
      Utils3.RotatePointsAboutCenter(this.Frame, -r, i),
      Utils2.IsFrameCornersInPoly(i, e)
  }


  IsTerminalSegment(e) {
    "use strict";
    return !this.polylist.closed && (1 === e || e == this.polylist.segs.length - 1)
  }


  UpdateDimensionFromTextObj(e, t) {
    "use strict";
    var a, r = 0;
    T3Gv.objectStore.PreserveBlock(this.BlockID);
    if (t)
      var i = t.text
        , n = t.userData;
    else
      i = e.GetText(),
        n = e.GetUserData();
    var o = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    for (this.UpdateDimensionFromText(o, i, n),
      T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
      a = this.hooks.length,
      r = 0; r < a; r++)
      T3Gv.optManager.SetLinkFlag(this.hooks[r].objid, ConstantData.LinkFlags.SED_L_MOVE);
    ("" !== this.HyperlinkText || -1 != this.NoteID || -1 != this.CommentID || this.HasFieldData()) && T3Gv.optManager.AddToDirtyList(this.BlockID),
      T3Gv.optManager.CompleteOperation(null)
  }


  UpdateEndPointDimensionFromText(e, t) {
    "use strict";
    var a = [this.StartPoint, this.EndPoint];
    if (!this.closed) {
      var r = Utils1.CalcAngleFromPoints(this.StartPoint, this.EndPoint);
      r = 360 - r;
      var i = 2 * Math.PI * (r / 360);
      Utils3.RotatePointsAboutCenter(this.Frame, -i, a),
        a[1].x = a[0].x + t,
        Utils3.RotatePointsAboutCenter(this.Frame, i, a),
        this.AdjustLineEnd(null, a[1].x, a[1].y, ConstantData.ActionTriggerType.LINEEND)
    }
  }


  UpdateTotalDimensionFromText(e, t) {
    "use strict";
    var a = 0
      , r = 0
      , i = 0
      , n = 0
      , o = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null);
    for (a = 1; a < o.length; a++)
      i = Math.abs(o[a - 1].x - o[a].x),
        n = Math.abs(o[a - 1].y - o[a].y),
        r += Math.sqrt(i * i + n * n);
    var s = t / r
      , l = -(this.Frame.x * s - this.Frame.x);
    l -= (this.Frame.width * s - this.Frame.width) / 2;
    var S = -(this.Frame.y * s - this.Frame.y);
    S -= (this.Frame.height * s - this.Frame.height) / 2,
      this.ScaleObject(l, S, null, 0, s, s, !1)
  }


  UpdateSegmentDimensionFromText(e, t, a) {
    "use strict";
    var r, i, n, o, s, l, S, c, u, p = 0, d = [], D = 0, g = 0, h = 0, m = 0, C = 0, y = 0, f = new HitResult(-1, 0, null);
    T3Gv.optManager.ob = Utils1.DeepCopy(this),
      p = Utils1.CalcAngleFromPoints(this.polylist.segs[a - 1].pt, this.polylist.segs[a].pt),
      this.polylist.segs[a - 1].pt.x === this.polylist.segs[a].pt.x && this.polylist.segs[a - 1].pt.y === this.polylist.segs[a].pt.y && (S = 1 == a ? 2 : a - 1,
        p = Utils1.CalcAngleFromPoints(this.polylist.segs[S - 1].pt, this.polylist.segs[S].pt),
        (p += 90) >= 360 && (p -= 360)),
      r = 360 - p,
      i = 2 * Math.PI * (r / 360);
    var L = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null);
    for (d = this.polylist.closed &&
      // this instanceof ListManager.PolyLineContainer
      // this instanceof GlobalDataShape.PolyLineContainer
      this instanceof Instance.Shape.PolyLineContainer

      ? T3Gv.optManager.InflateLine(L, this.StyleRecord.Line.BThick, this.polylist.closed, this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior) : Utils1.DeepCopy(L),
      c = 0; c < d.length; c++)
      d[c].x += this.Frame.x,
        d[c].y += this.Frame.y;
    var I = a
      , T = a - 1;
    !this.polylist.closed && 1 === a && d.length > 2 && (I = 0,
      T = 1),
      n = d[I].x,
      o = d[I].y,
      Utils3.RotatePointsAboutCenter(this.Frame, -i, d),
      d[T].x < d[I].x ? d[I].x = d[T].x + t : d[I].x = d[T].x - t,
      Utils3.RotatePointsAboutCenter(this.Frame, i, d),
      s = d[I].x,
      l = d[I].y,
      a === this.polylist.segs.length - 1 ? (this.AdjustLineEnd(null, s, l, this.polylist.closed ? ConstantData.ActionTriggerType.POLYLEND : ConstantData.ActionTriggerType.LINEEND),
        this.polylist.closed || (u = [{
          id: ConstantData.HookPts.SED_KTR,
          x: s,
          y: l
        }],
          this.ClosePolygon(this.BlockID, u, f) && (this.polylist.segs[this.polylist.segs.length - 1].pt = Utils1.DeepCopy(this.polylist.segs[0].pt),
            this.polylist.closed = !0,
            // this instanceof ListManager.PolyLine
            this instanceof PolyLine
            && this.MaintainDimensionThroughPolygonOpennessChange(this.polylist.closed)))) : this.polylist.closed || 1 !== a ? (h = s - n,
              m = l - o,
              this.polylist.closed && this.polylist.dim.x && this.polylist.dim.y ? (D = this.polylist.dim.x,
                (g = this.polylist.dim.y) < 1 && (g = 1),
                D < 1 && (D = 1),
                C = this.Frame.width / D,
                y = this.Frame.height / g) : (C = 1,
                  y = 1),
              this.polylist.segs[a].pt.x += h * C,
              this.polylist.segs[a].pt.y += m * y) : (this.AdjustLineStart(null, s, l, ConstantData.ActionTriggerType.LINESTART),
                u = [{
                  id: ConstantData.HookPts.SED_KTL,
                  x: s,
                  y: l
                }],
                this.ClosePolygon(this.BlockID, u, f) && (this.polylist.segs[0].pt = Utils1.DeepCopy(this.polylist.segs[this.polylist.segs.length - 1].pt),
                  this.polylist.closed = !0,
                  // this instanceof ListManager.PolyLine
                  this instanceof PolyLine

                  && this.MaintainDimensionThroughPolygonOpennessChange(this.polylist.closed)))
  }


  UpdateDimensionFromText(e, t, a) {
    "use strict";
    var r, i, n, o, s, l = -1, S = 0, c = 0;
    if (a.angleChange)
      return this.UpdateLineAngleDimensionFromText(e, t, a);
    if (s = a.segment,
      T3Gv.optManager.ShowSVGSelectionState(this.BlockID, !1),
      (i = this.GetDimensionValueFromString(t, s)) >= 0 && (l = this.GetDimensionLengthFromValue(i)),
      l < 0)
      return T3Gv.optManager.AddToDirtyList(this.BlockID),
        void T3Gv.optManager.RenderDirtySVGObjects();
    if (r = Utils1.DeepCopy(this),
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_AllSeg || 0 == (this.Dimensions & ConstantData.DimensionFlags.SED_DF_EndPts) && 0 == (this.Dimensions & ConstantData.DimensionFlags.SED_DF_Total)) {
      this.UpdateSegmentDimensionFromText(e, l, s);
      var u = {
        wdDim: -1,
        htDim: -1
      };
      this.GetPolyRectangularInfo(u) ? s === u.wdDim || s === u.wdDim + 2 ? (this.rwd = i,
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !0)) : s !== u.htDim && s !== u.htDim + 2 || (this.rht = i,
          this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !0)) : (this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
            this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !1))
    } else if (this.Dimensions & ConstantData.DimensionFlags.SED_DF_EndPts)
      this.UpdateEndPointDimensionFromText(e, l);
    else {
      if (!(this.Dimensions & ConstantData.DimensionFlags.SED_DF_Total))
        return;
      this.UpdateTotalDimensionFromText(e, l)
    }
    for (T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
      n = this.hooks.length,
      o = 0; o < n; o++)
      T3Gv.optManager.SetLinkFlag(this.hooks[o].objid, ConstantData.LinkFlags.SED_L_MOVE);
    if (T3Gv.optManager.ActionTriggerData = s,
      T3Gv.optManager.MaintainLink(this.BlockID, this, r, ConstantData.ActionTriggerType.POLYLNODE),
      this.Frame.x < 0 || this.Frame.y < 0) {
      var p = this.Frame;
      p.x < 0 && (S = -p.x,
        p.x += S),
        p.y < 0 && (c = -p.y,
          (

            this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
            this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select

            // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always ||
            // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select

          ) && (c += ConstantData.Defines.DimensionDefaultStandoff),
          p.y += c),
        this.StartPoint.x += S,
        this.StartPoint.y += c,
        this.EndPoint.x += S,
        this.EndPoint.y += c,
        T3Gv.optManager.SetObjectFrame(this.BlockID, p)
    }
    this.UpdateDrawing(e),
      -1 != this.DataID && this.LM_ResizeSVGTextObject(e, this, this.Frame)
  }


  GetLineChangeFrame() {
    var e = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
    return e.width < ConstantData.Defines.SED_SegDefLen && (e.width = ConstantData.Defines.SED_SegDefLen),
      e.height < ConstantData.Defines.SED_SegDefLen && (e.height = ConstantData.Defines.SED_SegDefLen),
      e
  }



  CancelObjectDraw() {
    return T3Gv.optManager.unbindActionClickHammerEvents(),
      T3Gv.optManager.WorkAreaHammer.off("doubletap"),
      T3Gv.optManager.isMobilePlatform || ($(window).unbind("mousemove"),
        T3Gv.optManager.WorkAreaHammer.on("tap", EvtUtil.Evt_WorkAreaHammerClick)),
      this.ResetAutoScrollTimer(),
      T3Gv.optManager.AddToDirtyList(this.BlockID),
      T3Gv.optManager.RenderDirtySVGObjects(),
      T3Gv.optManager.SelectObjects([this.BlockID], !1, !0),
      !0
  }


  GetBBox() {
    return this.Frame
  }



  IsRightAngle(e, t) {
    "use strict";
    var a, r, i, n, o;
    if ((a = e - 1) < 0) {
      if (!this.polylist.closed)
        return !1;
      a = this.polylist.segs.length - 1
    }
    if ((r = e + 1) > this.polylist.segs.length - 1) {
      if (!this.polylist.closed)
        return;
      r = 1
    }
    return i = Utils1.CalcAngleFromPoints(this.polylist.segs[a].pt, this.polylist.segs[e].pt),
      n = Utils1.CalcAngleFromPoints(this.polylist.segs[e].pt, this.polylist.segs[r].pt),
      o = Math.abs(i - n),
      Math.abs(90 - o) <= t || Math.abs(270 - o) <= t
  }


  GetPolyRectangularInfo(e) {
    "use strict";
    var t, a, r, i, n, o, s, l, S = [], c = !0;
    if (S = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null),
      this.polylist.segs.length,
      5 != this.polylist.segs.length || !this.polylist.closed)
      return !1;
    var u = []
      , p = S.length;
    for (o = 0; o < p; o++)
      o < p - 1 && S[o].x == S[o + 1].x && S[o].y == S[o + 1].y || u.push(S[o]);
    if (5 != (S = u).length)
      return !1;
    for (p = S.length,
      o = 0; o < p - 1 && c; o++)
      t = T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(S[o], S[o + 1]),
        o > 0 && (a = t,
          (a -= r) < 0 && (a += 2 * Math.PI),
          a > Math.PI && (a -= Math.PI),
          a >= Math.PI / 2 - .052 && a <= Math.PI / 2 + .052 || (c = !1)),
        r = t;
    return !!c && ((i = Utils2.GetDistanceBetween2Points(S[0], S[1])) / (n = Utils2.GetDistanceBetween2Points(S[2], S[3])) > .99 && i / n < 1.01 && ((i = Utils2.GetDistanceBetween2Points(S[1], S[2])) / (n = Utils2.GetDistanceBetween2Points(S[3], S[4])) > .99 && i / n < 1.01 && ((t = T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(S[0], S[1])) < Math.PI / 4 || t > 1.5 * Math.PI || t > .75 * Math.PI && t < 1.25 * Math.PI ? (s = 1,
      l = 2) : (s = 2,
        l = 1),
      e && (e.wdDim = s,
        e.htDim = l),
      !0)))
  }


  GetSegmentsBeforeAndAfter(e, t) {
    "use strict";
    t.segAfter = e + 1,
      t.segAfter >= this.polylist.segs.length && (this.polylist.closed ? t.segAfter = 1 : t.segAfter = -1),
      t.segBefore = e - 1,
      0 === t.segBefore && (this.polylist.closed ? t.segBefore = this.polylist.segs.length - 1 : t.segBefore = -1)
  }



  MaintainDimensionThroughPolygonOpennessChange(e) {
    "use strict";
    e && (this.Dimensions = Utils2.SetFlag(this.Dimensions, ConstantData.DimensionFlags.SED_DF_Total | ConstantData.DimensionFlags.SED_DF_EndPts, !1),
      this.Dimensions = Utils2.SetFlag(this.Dimensions, ConstantData.DimensionFlags.SED_DF_AllSeg, !0))
  }


  GetUnrotatedBoundingBoxOfProposedFrame(e) {
    var t, a = 0, r = 0;
    t = Utils1.DeepCopy(e);
    var i = this.GetDimensionsRect();
    return i.width > 0 ? (r = i.width - this.Frame.width,
      a = i.height - this.Frame.height) : this.StyleRecord && this.StyleRecord.Line && this.StyleRecord.Line.Thickness > ConstantData.Defines.SED_KnobSize ? (r = this.StyleRecord.Line.Thickness,
        a = this.StyleRecord.Line.Thickness) : (r = ConstantData.Defines.SED_KnobSize,
          a = ConstantData.Defines.SED_KnobSize),
      Utils2.InflateRect(t, r / 2, a / 2),
      t
  }



  AdjustPolySeg(e, t, a, r, i, n, o, s, l) {
    "use strict";
    var S, c, u, p, d, D, g, h, m, C, y, f, L, I, T = 0, b = {
      x: 0,
      y: 0
    }, M = [], P = [], R = [], A = {}, _ = {}, E = {}, w = {
      x: 0,
      y: 0
    }, F = !1, v = [];
    if (D = Utils1.DeepCopy(this.polylist),
      g = Utils1.DeepCopy(this.Frame),
      h = Utils1.DeepCopy(this.StartPoint),
      m = Utils1.DeepCopy(this.EndPoint),
      L = (f = this.GetUnrotatedBoundingBoxOfProposedFrame(this.Frame)).x < 0 || f.y < 0,
      R.x = t,
      R.y = a,
      b.x = r,
      b.y = i,
      P.push(R),
      P.push(b),
      T = n.moveAngle,
      d = n.hitSegment,
      9999 == T && (T = this.GetSegmentAdjustAngle(d),
        n.moveAngle = T),
      T = 360 - T,
      c = 2 * Math.PI * (T / 360),
      M = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
      A.x = M[d].x,
      A.y = M[d].y,
      Utils3.RotatePointsAboutCenter(this.Frame, -c, M),
      Utils3.RotatePointsAboutCenter(this.Frame, -c, P),
      Math.abs(P[1].x - P[0].x) < s)
      return !1;
    if (l && l > 0 && Math.abs(P[1].x - P[0].x) > l)
      return !1;
    if (isNaN(P[1].x - P[0].x),
      M[d - 1].x += P[1].x - P[0].x,
      M[d].x += P[1].x - P[0].x,
      Utils3.RotatePointsAboutCenter(this.Frame, c, M),
      u = M[d].x - A.x,
      p = M[d].y - A.y,
      C = this.GetScale(),
      d - 1 != 0 && (_.x = this.polylist.segs[d - 1].pt.x + u / C.x,
        _.y = this.polylist.segs[d - 1].pt.y + p / C.y,
        this.polylist.segs[d - 1].pt = $.extend(!0, {}, _)),
      d != this.polylist.segs.length - 1 && (E.x = this.polylist.segs[d].pt.x + u / C.x,
        E.y = this.polylist.segs[d].pt.y + p / C.y,
        this.polylist.segs[d].pt = $.extend(!0, {}, E)),
      I = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID),
      d - 1 == 0 && (this.AdjustLineStart(I, M[d - 1].x, M[d - 1].y, ConstantData.ActionTriggerType.LINESTART),
        F = !0),
      d == this.polylist.segs.length - 1 && (this.AdjustLineEnd(I, M[d].x, M[d].y, this.polylist.closed ? ConstantData.ActionTriggerType.POLYLEND : ConstantData.ActionTriggerType.LINEEND),
        F = !0),
      this.rflags && (this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !1)),
      F ? this.CalcFrame() : (this.UpdateDrawing(e),
        -1 != this.DataID && this.LM_ResizeSVGTextObject(e, this, this.Frame)),
      y = this.GetUnrotatedBoundingBoxOfProposedFrame(this.Frame),
      !L && (y.x < 0 || y.y < 0))
      if (o) {
        for (y.x < 0 && (w.x = -y.x),
          y.y < 0 && (w.y = -y.y),
          this.OffsetShape(w.x, w.y),
          v = this.GetListOfEnclosedObjects(!1),
          S = 0; S < v.length; S++)
          T3Gv.optManager.GetObjectPtr(v[S], !0).OffsetShape(w.x, w.y),
            T3Gv.optManager.SetLinkFlag(v[S], ConstantData.LinkFlags.SED_L_MOVE),
            T3Gv.optManager.AddToDirtyList(v[S]);
        this.UpdateDrawing(e)
      } else
        this.polylist = Utils1.DeepCopy(D),
          this.Frame = Utils1.DeepCopy(g),
          this.StartPoint = Utils1.DeepCopy(h),
          this.EndPoint = Utils1.DeepCopy(m),
          this.UpdateDrawing(e),
          -1 != this.DataID && this.LM_ResizeSVGTextObject(e, this, this.Frame);
    var G = new SelectionAttributes()
      , N = this.GetDimensionsForDisplay();
    return G.width = N.width,
      G.height = N.height,
      G.left = N.x,
      G.top = N.y,
      T3Gv.optManager.UpdateDisplayCoordinates(N, b, ConstantData.CursorTypes.Grow, this),
      !0
  }


  GetSegmentAdjustAngle(e) {
    "use strict";
    var t = 9999
      , a = {
        segBefore: 0,
        segAfter: 0
      }
      , r = 0
      , i = 0;
    return this.polylist.segs.length <= 5 && (this.GetSegmentsBeforeAndAfter(e, a),
      i = a.segAfter,
      -1 != (r = a.segBefore) && (this.GetSegmentsBeforeAndAfter(r, a),
        -1 != a.segBefore && this.IsRightAngle(a.segBefore, 3) && (t = Utils1.CalcAngleFromPoints(this.polylist.segs[r - 1].pt, this.polylist.segs[r].pt))),
      9999 == t && -1 != i && this.IsRightAngle(i, 3) && (t = Utils1.CalcAngleFromPoints(this.polylist.segs[i - 1].pt, this.polylist.segs[i].pt)),
      9999 != t && function (e, t) {
        var a = 90 - e;
        return e += a,
          (t += a) >= 360 && (t -= 360),
          t < 0 && (t += 360),
          Math.abs(90 - t) < 5 || Math.abs(180 - t) < 5
      }(Utils1.CalcAngleFromPoints(this.polylist.segs[e - 1].pt, this.polylist.segs[e].pt), t) && (t = 9999)),
      9999 == t && (t = Utils1.CalcAngleFromPoints(this.polylist.segs[e - 1].pt, this.polylist.segs[e].pt),
        (t += 90) >= 360 && (t -= 360)),
      t
  }


}

export default PolyLine
