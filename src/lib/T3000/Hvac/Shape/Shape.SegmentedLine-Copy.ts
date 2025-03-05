





// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import HvacSVG from '../../Hvac.SVG.t2';


import BaseLine from './Shape.BaseLine'
import ListManager from '../Data/ListManager';
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/GlobalData'
import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
import EvtUtil from "../Event/EvtUtil";
import Resources from '../Data/Resources'
// import Element from "../Basic/Basic.Element";


import Document from '../Basic/Basic.Document'

import Element from '../Basic/Basic.Element';
import BaseShape from './Shape.BaseShape';
import ConstantData from '../Data/ConstantData'



import PolySeg from '../Model/PolySeg'
import SelectionAttributes from '../Model/SelectionAttributes'
import SegLine from '../Model/SegLine'


class SegmentedLine extends BaseLine {



  // constructor(e) {
  //   //'use strict';
  //   (e = e || {
  //   }).LineType = e.LineType ||
  //     ListManager.LineType.SEGLINE,
  //     this.segl = e.segl ||
  //     new ListManager.SegLine,
  //     null != e.curveparam &&
  //     (this.segl.curveparam = e.curveparam),
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
  //     this.SegLFormat(this.EndPoint, ConstantData.ActionTriggerType.LINEEND, 0),
  //     this.CalcFrame(),
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


  public segl: any;
  public hoplist: any;
  public ArrowheadData: any;
  public StartArrowID: number;
  public EndArrowID: number;
  public StartArrowDisp: boolean;
  public EndArrowDisp: boolean;
  public ArrowSizeIndex: number;
  public TextDirection: boolean;

  constructor(e) {
    //'use strict';
    e = e || {};
    e.LineType = e.LineType || ConstantData.LineType.SEGLINE;

    super(e);

    this.segl = e.segl || new SegLine();
    if (e.curveparam != null) {
      this.segl.curveparam = e.curveparam;
    }
    this.StartPoint = e.StartPoint || { x: 0, y: 0 };
    this.EndPoint = e.EndPoint || { x: 0, y: 0 };
    this.SegLFormat(this.EndPoint, ConstantData.ActionTriggerType.LINEEND, 0);
    this.CalcFrame();
    this.hoplist = e.hoplist || { nhops: 0, hops: [] };
    this.ArrowheadData = e.ArrowheadData || [];
    this.StartArrowID = e.StartArrowID || 0;
    this.EndArrowID = e.EndArrowID || 0;
    this.StartArrowDisp = e.StartArrowDisp || false;
    this.EndArrowDisp = e.EndArrowDisp || false;
    this.ArrowSizeIndex = e.ArrowSizeIndex || 0;
    this.TextDirection = e.TextDirection || false;
    // var t = ListManager.BaseLine.apply(this, [e]);


    // if (t) return t;
  }

  // ListManager.SegmentedLine.prototype = new ListManager.BaseLine,
  // ListManager.SegmentedLine.prototype.constructor = ListManager.SegmentedLine

  CreateShape(e, t) {
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    var a = [],
      r = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER),
      i = e.CreateShape(Document.CreateShapeType.POLYLINE);
    i.SetID(ConstantData.SVGElementClass.SHAPE);
    var n = e.CreateShape(Document.CreateShapeType.POLYLINE);
    n.SetID(ConstantData.SVGElementClass.SLOP),
      n.ExcludeFromExport(!0),
      this.CalcFrame();
    var o = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      s = this.StyleRecord,
      l = (
        (s = this.SVGTokenizerHook(s)).Fill.Paint.Color,
        s.Line.Paint.Color
      ),
      S = s.Line.Thickness,
      c = s.Line.Paint.Opacity,
      u = s.Line.LinePattern;
    s.Line.Thickness > 0 &&
      s.Line.Thickness < 1 &&
      (S = 1);
    var p = o.width,
      d = o.height;
    if (
      p < S &&
      (p = S),
      d < S &&
      (d = S),
      r.SetSize(p, d),
      r.SetPos(o.x, o.y),
      i.SetSize(p, d),
      a = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, null),
      0 !== this.hoplist.nhops
    ) {
      var D = GlobalData.optManager.InsertHops(this, a, a.length);
      a = a.slice(0, D.npts)
    }
    return this.UpdateSVG(i, a),
      i.SetFillColor('none'),
      i.SetStrokeColor(l),
      i.SetStrokeOpacity(c),
      i.SetStrokeWidth(S),
      0 !== u &&
      i.SetStrokePattern(u),
      n.SetSize(p, d),
      this.UpdateSVG(n, a),
      n.SetStrokeColor('white'),
      n.SetFillColor('none'),
      n.SetOpacity(0),
      t ? n.SetEventBehavior(Element.EventBehavior.HIDDEN_OUT) : n.SetEventBehavior(Element.EventBehavior.NONE),
      n.SetStrokeWidth(S + ConstantData.Defines.SED_Slop),
      r.AddElement(i),
      r.AddElement(n),
      this.ApplyStyles(i, s),
      this.ApplyEffects(r, !1, !0),
      r.isShape = !0,
      this.AddIcons(e, r),
      r
  }

  UpdateSVG(e, t) {
    e &&
      e.SetPoints &&
      e.SetPoints(t)
  }

  AllowHeal() {
    return !0
  }

  CanUseStandOffDimensionLines() {
    return !1
  }

  SegLFormat(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l,
      S,
      c = !1,
      u = !1,
      p = !1,
      d = {},
      D = ConstantData.SegLDir,
      g = function (e, t, a) {
        var r = 0,
          i = Math.abs(a.x - t.x),
          n = Math.abs(a.y - t.y);
        switch (e) {
          case ConstantData.SegLDir.SED_KTC:
            r = a.y < t.y ? n >= i ? D.SED_KBC : a.x < t.x ? D.SED_KRC : D.SED_KLC : D.SED_KTC;
            break;
          case ConstantData.SegLDir.SED_KBC:
            r = a.y >= t.y ? n >= i ? D.SED_KTC : a.x < t.x ? D.SED_KRC : D.SED_KLC : D.SED_KBC;
            break;
          case ConstantData.SegLDir.SED_KLC:
            r = a.x < t.x ? n <= i ? D.SED_KRC : a.y < t.y ? D.SED_KBC : D.SED_KTC : D.SED_KLC;
            break;
          case ConstantData.SegLDir.SED_KRC:
            r = a.x > t.x ? n < i ? D.SED_KLC : a.y < t.y ? D.SED_KBC : D.SED_KTC : D.SED_KRC
        }
        return r
      };
    if (null != this.segl) {
      switch (t) {
        case ConstantData.ActionTriggerType.LINESTART:
          this.StartPoint.x = e.x,
            this.StartPoint.y = e.y;
          break;
        case ConstantData.ActionTriggerType.SEGL_PRESERVE:
        case ConstantData.ActionTriggerType.LINEEND:
          this.EndPoint.x = e.x,
            this.EndPoint.y = e.y
      }
      if (0 !== this.segl.firstdir || 0 !== this.segl.lastdir) {
        if (0 === this.segl.lastdir) {
          switch (t) {
            case ConstantData.ActionTriggerType.LINESTART:
            case ConstantData.ActionTriggerType.SEGL_ONE:
            case ConstantData.ActionTriggerType.SEGL_TWO:
            case ConstantData.ActionTriggerType.SEGL_THREE:
              a = g(this.segl.firstdir, e, this.EndPoint);
              break;
            case ConstantData.ActionTriggerType.SEGL_PRESERVE:
              a = g(this.segl.firstdir, this.StartPoint, this.EndPoint);
              break;
            default:
              a = g(this.segl.firstdir, this.StartPoint, e)
          }
          c = !0,
            this.segl.lastdir = a,
            p = !0
        }
        if (0 === this.segl.firstdir) {
          switch (t) {
            case ConstantData.ActionTriggerType.LINEEND:
            case ConstantData.ActionTriggerType.SEGL_ONE:
            case ConstantData.ActionTriggerType.SEGL_TWO:
            case ConstantData.ActionTriggerType.SEGL_THREE:
              a = g(this.segl.lastdir, e, this.StartPoint);
              break;
            case ConstantData.ActionTriggerType.SEGL_PRESERVE:
              a = g(this.segl.lastdir, this.EndPoint, this.StartPoint);
              break;
            default:
              a = g(this.segl.lastdir, this.EndPoint, e)
          }
          u = !0,
            this.segl.firstdir = a,
            p = !0
        }
        switch (
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CONNECTOR &&
        (p = !0),
        this.segl.firstdir
        ) {
          case ConstantData.SegLDir.SED_KTC:
            switch (this.segl.lastdir) {
              case ConstantData.SegLDir.SED_KTC:
                this.SegLTopToTop(t, e, 1, !1, p);
                break;
              case ConstantData.SegLDir.SED_KBC:
                this.SegLTopToBottom(t, e, 1, !1);
                break;
              case ConstantData.SegLDir.SED_KLC:
                this.SegLTopToLeft(t, e, 1, 1, !1, p);
                break;
              case ConstantData.SegLDir.SED_KRC:
                this.SegLTopToLeft(t, e, 1, - 1, !1, p)
            }
            break;
          case ConstantData.SegLDir.SED_KBC:
            switch (this.segl.lastdir) {
              case ConstantData.SegLDir.SED_KTC:
                this.SegLTopToBottom(t, e, - 1, !1);
                break;
              case ConstantData.SegLDir.SED_KBC:
                this.SegLTopToTop(t, e, - 1, !1, p);
                break;
              case ConstantData.SegLDir.SED_KLC:
                this.SegLTopToLeft(t, e, - 1, 1, !1, p);
                break;
              case ConstantData.SegLDir.SED_KRC:
                this.SegLTopToLeft(t, e, - 1, - 1, !1, p)
            }
            break;
          case ConstantData.SegLDir.SED_KLC:
            switch (this.segl.lastdir) {
              case ConstantData.SegLDir.SED_KTC:
                this.SegLTopToLeft(t, e, 1, 1, !0, p);
                break;
              case ConstantData.SegLDir.SED_KBC:
                this.SegLTopToLeft(t, e, 1, - 1, !0, p);
                break;
              case ConstantData.SegLDir.SED_KLC:
                this.SegLTopToTop(t, e, 1, !0, p);
                break;
              case ConstantData.SegLDir.SED_KRC:
                this.SegLTopToBottom(t, e, 1, !0)
            }
            break;
          case ConstantData.SegLDir.SED_KRC:
            switch (this.segl.lastdir) {
              case ConstantData.SegLDir.SED_KTC:
                this.SegLTopToLeft(t, e, - 1, 1, !0, p);
                break;
              case ConstantData.SegLDir.SED_KBC:
                this.SegLTopToLeft(t, e, - 1, - 1, !0, p);
                break;
              case ConstantData.SegLDir.SED_KLC:
                this.SegLTopToBottom(t, e, - 1, !0);
                break;
              case ConstantData.SegLDir.SED_KRC:
                this.SegLTopToTop(t, e, - 1, !0, p)
            }
        }
        c &&
          (this.segl.lastdir = 0),
          u &&
          (this.segl.firstdir = 0)
      } else for (
        r = this.EndPoint.x - this.StartPoint.x,
        i = this.EndPoint.y - this.StartPoint.y,
        n = Math.abs(r),
        o = Math.abs(i),
        d = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        (o >= 1 || n >= 1) &&
        (
          0 === a &&
          (
            a = n - o > 0.01 ? ConstantData.Defines.SED_HorizOnly : ConstantData.Defines.SED_VertOnly
          ),
          this.segl.pts.splice(0),
          this.segl.lengths.splice(0),
          a === ConstantData.Defines.SED_HorizOnly ? o < 1 ? (
            this.segl.pts.push(
              new Point(this.StartPoint.x, this.StartPoint.y)
            ),
            this.segl.pts.push(new Point(this.EndPoint.x, this.EndPoint.y)),
            this.segl.lengths.push(r)
          ) : (
            S = r / 2,
            this.segl.pts.push(
              new Point(this.StartPoint.x, this.StartPoint.y)
            ),
            this.segl.pts.push(
              new Point(this.StartPoint.x + r / 2, this.StartPoint.y)
            ),
            this.segl.pts.push(
              new Point(this.StartPoint.x + r / 2, this.EndPoint.y)
            ),
            this.segl.pts.push(new Point(this.EndPoint.x, this.EndPoint.y)),
            this.segl.lengths.push(S),
            this.segl.lengths.push(i),
            this.segl.lengths.push(S)
          ) : n < 1 ? (
            this.segl.pts.push(
              new Point(this.StartPoint.x, this.StartPoint.y)
            ),
            this.segl.pts.push(new Point(this.EndPoint.x, this.EndPoint.y)),
            this.segl.lengths.push(i)
          ) : (
            S = i / 2,
            this.segl.pts.push(
              new Point(this.StartPoint.x, this.StartPoint.y)
            ),
            this.segl.pts.push(
              new Point(this.StartPoint.x, this.StartPoint.y + i / 2)
            ),
            this.segl.pts.push(
              new Point(this.EndPoint.x, this.StartPoint.y + i / 2)
            ),
            this.segl.pts.push(new Point(this.EndPoint.x, this.EndPoint.y)),
            this.segl.lengths.push(S),
            this.segl.lengths.push(r),
            this.segl.lengths.push(S)
          )
        ),
        s = this.segl.pts.length,
        l = 0;
        l < s;
        l++
      ) this.segl.pts[l].x -= d.x,
        this.segl.pts[l].y -= d.y
    }
  }

  GetDimensionPoints() {
    //'use strict';
    var e,
      t = 0,
      a = 0,
      r = {},
      i = {},
      n = [];
    if (
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_AllSeg
    ) n = this.segl.pts;
    else if (this.Dimensions & ConstantData.DimensionFlags.SED_DF_Total) {
      var o = Utils1.DeepCopy(this.segl.pts);
      for (e = 0; e < o.length; e++) o[e].x += this.Frame.x,
        o[e].y += this.Frame.y;
      for (e = 1; e < o.length; e++) t = Math.abs(o[e - 1].x - o[e].x),
        a = Math.abs(o[e - 1].y - o[e].y),
        Math.sqrt(t * t + a * a);
      var s = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        l = (this.Frame.y - s.y) / 2,
        S = (this.Frame.x - s.x) / 2,
        c = {
          x: this.Frame.width / 2 + S,
          y: this.Frame.height / 2 + l
        };
      r.x = c.x - 10,
        r.y = c.y,
        n.push(new Point(r.x, r.y)),
        i.x = c.x + 10,
        i.y = c.y,
        n.push(new Point(i.x, i.y)),
        0
    } else {
      s = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
      n.push(
        new Point(this.StartPoint.x - s.x, this.StartPoint.y - s.y)
      ),
        n.push(
          new Point(this.EndPoint.x - s.x, this.EndPoint.y - s.y)
        )
    }
    return n
  }

  SegLTopToTop(e, t, a, r, i) {
    var n,
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
      C,
      y,
      f,
      L,
      I,
      T = {
        x: 0,
        y: 0
      },
      b = {},
      M = 0,
      P = !1,
      R = ConstantData.Defines.SED_CDim;
    if (
      r ? (
        o = Math.abs(this.EndPoint.y - this.StartPoint.y),
        n = Math.abs(this.EndPoint.x - this.StartPoint.x),
        s = this.StartPoint.y,
        l = this.StartPoint.x,
        S = this.EndPoint.y,
        c = this.EndPoint.x,
        y = (b = Utils2.Pt2Rect(this.StartPoint, this.EndPoint)).x,
        b.x = b.y,
        b.y = y,
        GlobalData.optManager.GetMaxDim(T),
        y = T.x,
        T.x = T.y,
        T.y = y
      ) : (
        o = Math.abs(this.EndPoint.x - this.StartPoint.x),
        n = Math.abs(this.EndPoint.y - this.StartPoint.y),
        s = this.StartPoint.x,
        l = this.StartPoint.y,
        S = this.EndPoint.x,
        c = this.EndPoint.y,
        b = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        GlobalData.optManager.GetMaxDim(T)
      ),
      D = this.segl.pts.length,
      this.segl.pts.splice(0),
      this.hooks &&
      this.hooks.length > 0
    ) {
      if (
        r ? - 1 == a ? this.StartPoint.x > this.EndPoint.x : this.StartPoint.x < this.EndPoint.x : - 1 == a ? this.StartPoint.y > this.EndPoint.y : this.StartPoint.y < this.EndPoint.y
      ) {
        for (m = 0; m < this.hooks.length; m++) if (this.hooks[m].hookpt === ConstantData.HookPts.SED_KTL) {
          (h = GlobalData.optManager.GetObjectPtr(this.hooks[m].objid, !1)) &&
            (
              g = h.GetTargetRect(),
              C = r ? this.StartPoint.y + g.height * ((R - this.hooks[m].connect.y) / R) + ConstantData.Defines.SED_SegDefLen : this.StartPoint.x + g.width * ((R - this.hooks[m].connect.x) / R) + ConstantData.Defines.SED_SegDefLen
            );
          break
        }
      } else for (m = 0; m < this.hooks.length; m++) if (this.hooks[m].hookpt === ConstantData.HookPts.SED_KTR) {
        (h = GlobalData.optManager.GetObjectPtr(this.hooks[m].objid, !1)) &&
          (
            g = h.GetTargetRect(),
            C = r ? this.EndPoint.y + g.height * ((R - this.hooks[m].connect.y) / R) + ConstantData.Defines.SED_SegDefLen : this.EndPoint.x + g.width * ((R - this.hooks[m].connect.x) / R) + ConstantData.Defines.SED_SegDefLen
          );
        break
      }
      g &&
        (
          M = r ? o < g.height / 2 + ConstantData.Defines.SED_SegMinLen : o < g.width / 2 + ConstantData.Defines.SED_SegMinLen
        )
    }
    n < ConstantData.Defines.SED_SegMinSeg &&
      (n = 0),
      e === ConstantData.ActionTriggerType.SEGL_PRESERVE &&
      (P = 4 === D),
      i &&
      (P = !0),
      P ||
        (
          o > ConstantData.Defines.SED_SegMinLen ||
          n < ConstantData.Defines.SED_SegMinLen
        ) &&
        !M ? (
        4 != D &&
        this.segl.lengths.splice(0),
        r ? this.segl.pts.push(new Point(l - b.y, s - b.x)) : this.segl.pts.push(new Point(s - b.x, l - b.y)),
        this.segl.lengths.length < 1 &&
        this.segl.lengths.push(ConstantData.Defines.SED_SegDefLen),
        L = this.segl.lengths[0],
        e === ConstantData.ActionTriggerType.SEGL_ONE ? (
          r ? (this.segl.lengths[0] = a * (l - t.x), I = a * (c - t.x)) : (this.segl.lengths[0] = a * (l - t.y), I = a * (c - t.y)),
          this.segl.lengths[0] < ConstantData.Defines.SED_SegMinLen &&
          (this.segl.lengths[0] = ConstantData.Defines.SED_SegMinLen),
          I < ConstantData.Defines.SED_SegMinLen &&
          (I = ConstantData.Defines.SED_SegMinLen),
          I < (L = this.segl.lengths[0]) &&
          (L = I)
        ) : L > ConstantData.Defines.SED_SegDefLen &&
        (L = ConstantData.Defines.SED_SegDefLen),
        (u = l - a * this.segl.lengths[0]) < 0 &&
        (u = 0),
        u > T.y &&
        (u = T.y),
        (p = c - a * L) < 0 &&
        (p = 0),
        p > T.y &&
        (p = T.y),
        - 1 == a ? p > u &&
          (u = p) : p < u &&
        (u = p),
        r ? this.segl.pts.push(new Point(u - b.y, s - b.x)) : this.segl.pts.push(new Point(s - b.x, u - b.y)),
        r ? this.segl.pts.push(new Point(u - b.y, S - b.x)) : this.segl.pts.push(new Point(S - b.x, u - b.y)),
        r ? this.segl.pts.push(new Point(c - b.y, S - b.x)) : this.segl.pts.push(new Point(S - b.x, c - b.y))
      ) : (
        6 != D &&
        this.segl.lengths.splice(0),
        r ? this.segl.pts.push(new Point(l - b.y, s - b.x)) : this.segl.pts.push(new Point(s - b.x, l - b.y)),
        this.segl.lengths.length < 1 &&
        this.segl.lengths.push(ConstantData.Defines.SED_SegDefLen),
        e === ConstantData.ActionTriggerType.SEGL_ONE &&
        (
          this.segl.lengths[0] = r ? a * (l - t.x) : a * (l - t.y),
          this.segl.lengths[0] < ConstantData.Defines.SED_SegMinLen &&
          (this.segl.lengths[0] = ConstantData.Defines.SED_SegMinLen)
        ),
        (u = l - a * this.segl.lengths[0]) < 0 &&
        (u = 0),
        u > T.y &&
        (u = T.y),
        r ? this.segl.pts.push(new Point(u - b.y, s - b.x)) : this.segl.pts.push(new Point(s - b.x, u - b.y)),
        this.segl.lengths.length < 2 &&
        this.segl.lengths.push(ConstantData.Defines.SED_SegDefLen),
        e === ConstantData.ActionTriggerType.SEGL_TWO ? (
          this.segl.lengths[1] = r ? t.y - s : t.x - s,
          this.segl.lengths[1] < ConstantData.Defines.SED_SegMinLen &&
          (this.segl.lengths[1] = ConstantData.Defines.SED_SegMinLen)
        ) : M &&
        (f = C - s, this.segl.lengths[1] < f && (this.segl.lengths[1] = C - s)),
        (d = s + this.segl.lengths[1]) < 0 &&
        (d = 0),
        d > T.x &&
        (d = T.x),
        r ? this.segl.pts.push(new Point(u - b.y, d - b.x)) : this.segl.pts.push(new Point(d - b.x, u - b.y)),
        this.segl.lengths.length < 3 &&
        this.segl.lengths.push(ConstantData.Defines.SED_SegDefLen),
        e === ConstantData.ActionTriggerType.SEGL_THREE &&
        (
          this.segl.lengths[2] = r ? a * (c - t.x) : a * (c - t.y),
          this.segl.lengths[2] < ConstantData.Defines.SED_SegMinLen &&
          (this.segl.lengths[2] = ConstantData.Defines.SED_SegMinLen)
        ),
        (p = c - a * this.segl.lengths[2]) < 0 &&
        (p = 0),
        p > T.y &&
        (p = T.y),
        r ? this.segl.pts.push(new Point(p - b.y, d - b.x)) : this.segl.pts.push(new Point(d - b.x, p - b.y)),
        r ? this.segl.pts.push(new Point(p - b.y, S - b.x)) : this.segl.pts.push(new Point(S - b.x, p - b.y)),
        r ? this.segl.pts.push(new Point(c - b.y, S - b.x)) : this.segl.pts.push(new Point(S - b.x, c - b.y))
      )
  }

  SegLTopToBottom(e, t, a, r) {
    var i,
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
      C,
      y = {
        x: 0,
        y: 0
      },
      f = {},
      L = 0,
      I = ConstantData.Defines.SED_CDim;
    if (
      r ? (
        Math.abs(this.EndPoint.y - this.StartPoint.y),
        S = Math.abs(this.EndPoint.x - this.StartPoint.x),
        c = this.StartPoint.y,
        u = this.StartPoint.x,
        p = this.EndPoint.y,
        d = this.EndPoint.x,
        m = (f = Utils2.Pt2Rect(this.StartPoint, this.EndPoint)).x,
        f.x = f.y,
        f.y = m,
        GlobalData.optManager.GetMaxDim(y),
        m = y.x,
        y.x = y.y,
        y.y = m
      ) : (
        Math.abs(this.EndPoint.x - this.StartPoint.x),
        S = Math.abs(this.EndPoint.y - this.StartPoint.y),
        c = this.StartPoint.x,
        u = this.StartPoint.y,
        p = this.EndPoint.x,
        d = this.EndPoint.y,
        f = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        GlobalData.optManager.GetMaxDim(y)
      ),
      l = - 1 == a ? d - 2 * ConstantData.Defines.SED_SegMinLen > u : d + 2 * ConstantData.Defines.SED_SegMinLen < u,
      s = this.segl.pts.length,
      this.segl.pts.splice(0),
      e === ConstantData.ActionTriggerType.SEGL_PRESERVE &&
      (l = 6 !== s),
      l
    ) Math.abs(c - p) <= 1 ? (
      r ? this.segl.pts.push(new Point(u - f.y, c - f.x)) : this.segl.pts.push(new Point(c - f.x, u - f.y)),
      r ? this.segl.pts.push(new Point(d - f.y, c - f.x)) : this.segl.pts.push(new Point(c - f.x, d - f.y)),
      this.segl.lengths.splice(0)
    ) : (
      4 != s &&
      this.segl.lengths.splice(0),
      r ? this.segl.pts.push(new Point(u - f.y, c - f.x)) : this.segl.pts.push(new Point(c - f.x, u - f.y)),
      this.segl.lengths.length < 1 &&
      this.segl.lengths.push(ConstantData.Defines.SED_SegDefLen),
      e === ConstantData.ActionTriggerType.SEGL_ONE ? (
        this.segl.lengths[0] = r ? a * (u - t.x) : a * (u - t.y),
        this.segl.lengths[0] < ConstantData.Defines.SED_SegMinLen &&
        (this.segl.lengths[0] = ConstantData.Defines.SED_SegMinLen)
      ) : (
        e !== ConstantData.ActionTriggerType.SEGL_PRESERVE &&
        this.segl.lengths[0] < ConstantData.Defines.SED_SegDefLen &&
        (this.segl.lengths[0] = ConstantData.Defines.SED_SegDefLen),
        this.segl.lengths[0] > S - ConstantData.Defines.SED_SegMinLen &&
        (
          this.segl.lengths[0] = S - ConstantData.Defines.SED_SegMinLen
        )
      ),
      (i = u - a * this.segl.lengths[0]) < 0 &&
      (i = 0),
      i > y.y &&
      (i = y.y),
      (n = d + a * ConstantData.Defines.SED_SegMinLen) < 0 &&
      (n = 0),
      n > y.y &&
      (n = y.y),
      - 1 == a ? (
        n < u + ConstantData.Defines.SED_SegMinLen &&
        (n = u + ConstantData.Defines.SED_SegMinLen),
        n < i &&
        (i = n)
      ) : (
        n > u - ConstantData.Defines.SED_SegMinLen &&
        (n = u - ConstantData.Defines.SED_SegMinLen),
        n > i &&
        (i = n)
      ),
      r ? this.segl.pts.push(new Point(i - f.y, c - f.x)) : this.segl.pts.push(new Point(c - f.x, i - f.y)),
      r ? this.segl.pts.push(new Point(i - f.y, p - f.x)) : this.segl.pts.push(new Point(p - f.x, i - f.y)),
      r ? this.segl.pts.push(new Point(d - f.y, p - f.x)) : this.segl.pts.push(new Point(p - f.x, d - f.y))
    );
    else {
      if (this.hooks && this.hooks.length > 0) for (h = 0; h < this.hooks.length; h++) if (this.hooks[h].hookpt === ConstantData.HookPts.SED_KTL) {
        (g = GlobalData.optManager.GetObjectPtr(this.hooks[h].objid, !1)) &&
          (
            D = g.GetTargetRect(),
            L = r ? c <= p ? this.StartPoint.y + D.height * ((I - this.hooks[h].connect.y) / I) + ConstantData.Defines.SED_SegDefLen : this.StartPoint.y + D.height * (this.hooks[h].connect.y / I) + ConstantData.Defines.SED_SegDefLen : c <= p ? this.StartPoint.x + D.width * ((I - this.hooks[h].connect.x) / I) + ConstantData.Defines.SED_SegDefLen : this.StartPoint.x + D.width * (this.hooks[h].connect.x / I) + ConstantData.Defines.SED_SegDefLen
          );
        break
      }
      6 != s &&
        this.segl.lengths.splice(0),
        r ? this.segl.pts.push(new Point(u - f.y, c - f.x)) : this.segl.pts.push(new Point(c - f.x, u - f.y)),
        this.segl.lengths.length < 1 &&
        this.segl.lengths.push(ConstantData.Defines.SED_SegDefLen),
        e === ConstantData.ActionTriggerType.SEGL_ONE &&
        (
          this.segl.lengths[0] = r ? a * (u - t.x) : a * (u - t.y),
          this.segl.lengths[0] < ConstantData.Defines.SED_SegMinLen &&
          (this.segl.lengths[0] = ConstantData.Defines.SED_SegMinLen)
        ),
        (i = u - a * this.segl.lengths[0]) < 0 &&
        (i = 0),
        i > y.y &&
        (i = y.y),
        r ? this.segl.pts.push(new Point(i - f.y, c - f.x)) : this.segl.pts.push(new Point(c - f.x, i - f.y)),
        this.segl.lengths.length < 2 &&
        this.segl.lengths.push(ConstantData.Defines.SED_SegDefLen),
        e === ConstantData.ActionTriggerType.SEGL_TWO ? this.segl.lengths[1] = c <= p ? r ? t.y - c : t.x - c : r ? - (t.y - c) : - (t.x - c) : L &&
          (C = L - c, this.segl.lengths[1] < C && (this.segl.lengths[1] = L - c)),
        c <= p ? (
          o = c + this.segl.lengths[1],
          Math.abs(p - o) < ConstantData.Defines.SED_SegMinLen &&
          (
            o = o < p ? p - ConstantData.Defines.SED_SegMinLen : p + ConstantData.Defines.SED_SegMinLen
          )
        ) : (
          o = c - this.segl.lengths[1],
          Math.abs(o - p) < ConstantData.Defines.SED_SegMinLen &&
          (
            o = o < p ? p - ConstantData.Defines.SED_SegMinLen : p + ConstantData.Defines.SED_SegMinLen
          )
        ),
        o < 0 &&
        (o = 0),
        o > y.x &&
        (o = y.x),
        r ? this.segl.pts.push(new Point(i - f.y, o - f.x)) : this.segl.pts.push(new Point(o - f.x, i - f.y)),
        this.segl.lengths.length < 3 &&
        this.segl.lengths.push(ConstantData.Defines.SED_SegDefLen),
        e === ConstantData.ActionTriggerType.SEGL_THREE &&
        (
          this.segl.lengths[2] = r ? - a * (d - t.x) : - a * (d - t.y),
          this.segl.lengths[2] < ConstantData.Defines.SED_SegMinLen &&
          (this.segl.lengths[2] = ConstantData.Defines.SED_SegMinLen)
        ),
        (i = d + a * this.segl.lengths[2]) < 0 &&
        (i = 0),
        i > y.y &&
        (i = y.y),
        r ? this.segl.pts.push(new Point(i - f.y, o - f.x)) : this.segl.pts.push(new Point(o - f.x, i - f.y)),
        r ? this.segl.pts.push(new Point(i - f.y, p - f.x)) : this.segl.pts.push(new Point(p - f.x, i - f.y)),
        r ? this.segl.pts.push(new Point(d - f.y, p - f.x)) : this.segl.pts.push(new Point(p - f.x, d - f.y))
    }
  }

  SegLTopToLeft(e, t, a, r, i, n) {
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
      L,
      I = 0,
      T = 0,
      b = !1,
      M = {},
      P = {
        x: 0,
        y: 0
      },
      R = ConstantData.Defines.SED_CDim;
    GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    if (
      GlobalData.optManager.AllowAutoInsert() &&
      (b = !0),
      Math.abs(this.EndPoint.x - this.StartPoint.x),
      Math.abs(this.EndPoint.y - this.StartPoint.y),
      i ? (
        m = this.StartPoint.y,
        C = this.StartPoint.x,
        y = this.EndPoint.y,
        f = this.EndPoint.x,
        S = (M = Utils2.Pt2Rect(this.StartPoint, this.EndPoint)).x,
        M.x = M.y,
        M.y = S,
        GlobalData.optManager.GetMaxDim(P),
        S = P.x,
        P.x = P.y,
        P.y = S
      ) : (
        m = this.StartPoint.x,
        C = this.StartPoint.y,
        y = this.EndPoint.x,
        f = this.EndPoint.y,
        M = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        GlobalData.optManager.GetMaxDim(P)
      ),
      h = this.segl.pts.length,
      this.segl.pts.splice(0),
      u = - 1 == r ? m - 2 * ConstantData.Defines.SED_SegMinLen > y : m + 2 * ConstantData.Defines.SED_SegMinLen < y,
      c = - 1 == a ? f - 2 * ConstantData.Defines.SED_SegMinLen > C &&
        u : f + 2 * ConstantData.Defines.SED_SegMinLen < C &&
      u,
      e === ConstantData.ActionTriggerType.SEGL_PRESERVE &&
      (c = 5 !== h),
      n &&
      (c = !0),
      c
    ) this.segl.lengths.splice(0),
      i ? this.segl.pts.push(new Point(C - M.y, m - M.x)) : this.segl.pts.push(new Point(m - M.x, C - M.y)),
      i ? this.segl.pts.push(new Point(f - M.y, m - M.x)) : this.segl.pts.push(new Point(m - M.x, f - M.y)),
      i ? this.segl.pts.push(new Point(f - M.y, y - M.x)) : this.segl.pts.push(new Point(y - M.x, f - M.y));
    else {
      if (p = m < y, 5 != h && this.segl.lengths.splice(0), this.hooks) if (p) {
        if (- 1 === r) {
          for (
            I = i ? this.EndPoint.y + ConstantData.Defines.SED_SegDefLen : this.EndPoint.x + ConstantData.Defines.SED_SegDefLen,
            D = 0;
            D < this.hooks.length;
            D++
          ) if (this.hooks[D].hookpt === ConstantData.HookPts.SED_KTR) {
            (d = GlobalData.optManager.GetObjectPtr(this.hooks[D].objid, !1)) &&
              (
                T = C - ((L = d.GetTargetRect()).y + L.height) < ConstantData.Defines.SED_SegDefLen + ConstantData.Defines.SED_SegMinLen ? i ? this.EndPoint.x - L.width * (this.hooks[D].connect.x / R) - ConstantData.Defines.SED_SegDefLen : this.EndPoint.y - L.height * (this.hooks[D].connect.y / R) - ConstantData.Defines.SED_SegDefLen : i ? this.EndPoint.x + L.width * ((R - this.hooks[D].connect.x) / R) + ConstantData.Defines.SED_SegDefLen : this.EndPoint.y + L.height * ((R - this.hooks[D].connect.y) / R) + ConstantData.Defines.SED_SegDefLen
              );
            break
          }
        } else for (D = 0; D < this.hooks.length; D++) if (this.hooks[D].hookpt === ConstantData.HookPts.SED_KTR) {
          (d = GlobalData.optManager.GetObjectPtr(this.hooks[D].objid, !1)) &&
            (
              L = d.GetTargetRect(),
              I = i ? this.StartPoint.y + L.height / 2 + ConstantData.Defines.SED_SegDefLen : this.StartPoint.x + L.width / 2 + ConstantData.Defines.SED_SegDefLen
            );
          break
        }
      } else for (D = 0; D < this.hooks.length; D++) if (this.hooks[D].hookpt === ConstantData.HookPts.SED_KTR) {
        (d = GlobalData.optManager.GetObjectPtr(this.hooks[D].objid, !1)) &&
          (
            L = d.GetTargetRect(),
            T = i ? this.EndPoint.x - L.width / 2 - ConstantData.Defines.SED_SegDefLen : this.EndPoint.y - L.height / 2 - ConstantData.Defines.SED_SegDefLen
          );
        break
      }
      b &&
        (T = 0, I = 0),
        i ? this.segl.pts.push(new Point(C - M.y, m - M.x)) : this.segl.pts.push(new Point(m - M.x, C - M.y)),
        this.segl.lengths.length < 1 &&
        this.segl.lengths.push(ConstantData.Defines.SED_SegDefLen),
        e === ConstantData.ActionTriggerType.SEGL_ONE &&
        (
          this.segl.lengths[0] = i ? a * (C - t.x) : a * (C - t.y),
          this.segl.lengths[0] < ConstantData.Defines.SED_SegMinLen &&
          (this.segl.lengths[0] = ConstantData.Defines.SED_SegMinLen)
        ),
        g = a * this.segl.lengths[0],
        p ? T &&
          (
            (g = C - T) < ConstantData.Defines.SED_SegDefLen &&
            (g = ConstantData.Defines.SED_SegDefLen),
            g < this.segl.lengths[0] &&
            (g = a * this.segl.lengths[0])
          ) : T &&
        (
          g = C - T,
          - 1 === a ? - g < ConstantData.Defines.SED_SegDefLen &&
            (g = - ConstantData.Defines.SED_SegDefLen) : g < ConstantData.Defines.SED_SegDefLen &&
          (g = ConstantData.Defines.SED_SegDefLen),
          this.segl.lengths[0] < a * g &&
          (g = a * this.segl.lengths[0])
        ),
        this.segl.lengths[0] > a * g &&
        (g = a * this.segl.lengths[0]),
        (o = C - g) < 0 &&
        (o = 0),
        o > P.y &&
        (o = P.y),
        i ? this.segl.pts.push(new Point(o - M.y, m - M.x)) : this.segl.pts.push(new Point(m - M.x, o - M.y)),
        this.segl.lengths.length < 2 &&
        this.segl.lengths.push(ConstantData.Defines.SED_SegDefLen),
        e === ConstantData.ActionTriggerType.SEGL_TWO &&
        (
          p ? i ? (
            - 1 === r ? t.y < y + ConstantData.Defines.SED_SegDefLen &&
              (t.y = y + ConstantData.Defines.SED_SegDefLen) : t.y > y - ConstantData.Defines.SED_SegDefLen &&
            (t.y = y - ConstantData.Defines.SED_SegDefLen),
            this.segl.lengths[1] = Math.abs(t.y - m)
          ) : (
            - 1 === r ? t.x < y + ConstantData.Defines.SED_SegDefLen &&
              (t.x = y + ConstantData.Defines.SED_SegDefLen) : t.x > y - ConstantData.Defines.SED_SegDefLen &&
            (t.x = y - ConstantData.Defines.SED_SegDefLen),
            this.segl.lengths[1] = Math.abs(t.x - m)
          ) : i ? (
            - 1 === r ? t.y < y - ConstantData.Defines.SED_SegMinLen &&
              (t.y = y - ConstantData.Defines.SED_SegMinLen) : t.y > y + ConstantData.Defines.SED_SegMinLen &&
            (t.y = y + ConstantData.Defines.SED_SegMinLen),
            this.segl.lengths[1] = Math.abs(t.y - m)
          ) : (
            t.x > m - ConstantData.Defines.SED_SegMinLen &&
            (t.x = m - ConstantData.Defines.SED_SegMinLen),
            this.segl.lengths[1] = Math.abs(t.x - m)
          )
        ),
        p ? (
          g = this.segl.lengths[1],
          I &&
          I > this.segl.lengths[1] + m &&
          (g = I - m),
          s = m + g,
          - 1 == r ? s <= y &&
            (s = m + g) : s >= y &&
          (s = m - g)
        ) : (
          s = m - this.segl.lengths[1],
          l = y - r * ConstantData.Defines.SED_SegDefLen,
          - 1 == r &&
            this.segl.lengths[1] != ConstantData.Defines.SED_SegDefLen ? l > s &&
          (s = l) : l < s &&
          (s = l)
        ),
        s < 0 &&
        (s = 0),
        s > P.x &&
        (s = P.x),
        i ? this.segl.pts.push(new Point(o - M.y, s - M.x)) : this.segl.pts.push(new Point(s - M.x, o - M.y)),
        i ? this.segl.pts.push(new Point(f - M.y, s - M.x)) : this.segl.pts.push(new Point(s - M.x, f - M.y)),
        i ? this.segl.pts.push(new Point(f - M.y, y - M.x)) : this.segl.pts.push(new Point(y - M.x, f - M.y))
    }
  }

  GetCornerSize(e, t) {
    e > t &&
      (e = t);
    var a = e,
      r = this.segl.curveparam,
      i = 0.4 * a;
    return r > i &&
      (r = i),
      r
  }

  GetPolyPoints(e, t, a, r, i) {
    var n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D = [],
      g = 0;
    if (
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CONNECTOR &&
      (this.segl.curveparam = 0),
      this.segl &&
      this.segl.pts.length
    ) {
      if (o = this.segl.pts.length, this.segl.curveparam > 0 && !a) for (n = 0; n < o; n++) l = 0,
        S = 0,
        c = !1,
        n > 0 &&
          n < o - 1 ? (
          this.segl.pts[n].x === this.segl.pts[n - 1].x ? (
            l = Math.abs(this.segl.pts[n].y - this.segl.pts[n - 1].y),
            c = !0,
            u = this.segl.pts[n].y - this.segl.pts[n - 1].y > 0 ? 1 : - 1
          ) : (
            l = Math.abs(this.segl.pts[n].x - this.segl.pts[n - 1].x),
            u = this.segl.pts[n].x - this.segl.pts[n - 1].x > 0 ? 1 : - 1
          ),
          this.segl.pts[n].x === this.segl.pts[n + 1].x ? (
            S = Math.abs(this.segl.pts[n].y - this.segl.pts[n + 1].y),
            p = this.segl.pts[n + 1].y - this.segl.pts[n].y > 0 ? 1 : - 1
          ) : (
            S = Math.abs(this.segl.pts[n].x - this.segl.pts[n + 1].x),
            p = this.segl.pts[n + 1].x - this.segl.pts[n].x > 0 ? 1 : - 1
          ),
          g = this.GetCornerSize(l, S),
          c ? (
            D.push(
              new Point(this.segl.pts[n].x, this.segl.pts[n].y - g * u)
            ),
            d = GlobalData.optManager.Lines_AddCurve(!0, u, p, this.segl.pts[n].x, this.segl.pts[n].y, g),
            D = D.concat(d)
          ) : (
            D.push(
              new Point(this.segl.pts[n].x - g * u, this.segl.pts[n].y)
            ),
            d = GlobalData.optManager.Lines_AddCurve(!1, u, p, this.segl.pts[n].x, this.segl.pts[n].y, g),
            D = D.concat(d)
          )
        ) : D.push(
          new Point(this.segl.pts[n].x, this.segl.pts[n].y)
        );
      else for (n = 0; n < o; n++) D.push(
        new Point(this.segl.pts[n].x, this.segl.pts[n].y)
      );
      if (
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CONNECTOR &&
        this.hooks.length > 1 &&
        (
          D[0].x = GlobalData.optManager.GetDependencyLineStartX(this),
          s = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
          D[0].x -= s.x,
          D[0].x > D[1].x &&
          (D[0].x = D[1].x)
        ),
        !t
      ) for (
          s = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
          o = D.length,
          n = 0;
          n < o;
          n++
        ) D[n].x += s.x,
          D[n].y += s.y
    } else

      // D = ListManager.BaseLine.prototype.GetPolyPoints.call(this, e, t, !0, i);
      // Double === TODO
      D = super.GetPolyPoints(e, t, !0, i);
    return D
  }

  LM_DrawPreTrack(e) {
    var t;
    return

    // ListManager.BaseLine.prototype.LM_DrawPreTrack.call(this, e),
    // Double === TODO
    super.LM_DrawPreTrack(e),
      GlobalData.optManager.LinkParams &&
      GlobalData.optManager.LinkParams.SConnectIndex >= 0 &&
      (
        t = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.LinkParams.SConnectIndex, !1)
      ) &&
      (
        this.segl.firstdir = t.GetSegLFace(GlobalData.optManager.LinkParams.SConnectPt, this.EndPoint, e)
      ),
      !0
  }

  AdjustLine(e, t, a, r) {


    console.log('== track UpdateDimensionsLines Shape.SegmentedLine-> AdjustLine')


    if (e) var i = e.GetElementByID(ConstantData.SVGElementClass.SHAPE),
      n = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
    var o = new Point(t, a);
    this.SegLFormat(o, r, 0),
      this.CalcFrame();
    var s = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      // l = ListManager.SegmentedLine.prototype.GetPolyPoints.call(this, ConstantData.Defines.NPOLYPTS, !0, !1, !1, null);
      // Double === TODO
      l = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, null);
    if (e) {
      e.SetSize(this.Frame.width, this.Frame.height),
        e.SetPos(s.x, s.y),
        i.SetSize(this.Frame.width, this.Frame.height),
        this.UpdateSVG(i, l),
        n.SetSize(this.Frame.width, this.Frame.height),
        this.UpdateSVG(n, l);
      new SelectionAttributes();
      this.UpdateDimensionLines(e),
        GlobalData.optManager.UpdateDisplayCoordinates(
          this.Frame,
          o,
          ConstantData.CursorTypes.Grow,
          this
        ),
        - 1 != this.DataID &&
        this.LM_ResizeSVGTextObject(e, this, this.Frame)
    }
  }

  AdjustLineEnd(e, t, a, r) {
    var i = {
      x: this.EndPoint.x,
      y: this.EndPoint.y
    };
    this.EndPoint.x = t,
      this.EndPoint.y = a,
      this.EnforceMinimum(!1),
      t = this.EndPoint.x,
      a = this.EndPoint.y,
      this.EndPoint.x = i.x,
      this.EndPoint.y = i.y;
    var n = {
      x: t,
      y: a
    };
    if (
      GlobalData.optManager.LinkParams &&
      GlobalData.optManager.LinkParams.ConnectIndex >= 0
    ) {
      var o = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.LinkParams.ConnectIndex, !1);
      o &&
        (
          this.segl.lastdir = o.GetSegLFace(GlobalData.optManager.LinkParams.ConnectPt, this.StartPoint, n)
        )
    } else GlobalData.optManager.ob &&
      GlobalData.optManager.ob.BlockID === this.BlockID &&
      (
        this.segl.firstdir = GlobalData.optManager.ob.segl.firstdir,
        this.segl.lastdir = GlobalData.optManager.ob.segl.lastdir
      );
    this.AdjustLine(e, t, a, ConstantData.ActionTriggerType.LINEEND)
  }

  AdjustLineStart(e, t, a) {
    var r = {
      x: this.StartPoint.x,
      y: this.StartPoint.y
    },
      i = ConstantData.Defines.SED_MinDim;
    this.StartPoint.x = t,
      this.StartPoint.y = a,
      this.EnforceMinimum(!0),
      t = this.StartPoint.x,
      a = this.StartPoint.y,
      this.StartPoint.x = r.x,
      this.StartPoint.y = r.y,
      this.segl.pts[0].x === this.segl.pts[1].x ? (
        this.segl.lengths[0] += this.StartPoint.y - a,
        this.segl.lengths[0] < i &&
        (this.segl.lengths[0] = i)
      ) : (
        this.segl.lengths[0] += this.StartPoint.x - t,
        this.segl.lengths[0] < i &&
        (this.segl.lengths[0] = i)
      );
    var n = {
      x: t,
      y: a
    };
    if (
      GlobalData.optManager.LinkParams &&
      GlobalData.optManager.LinkParams.ConnectIndex >= 0
    ) {
      var o = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.LinkParams.ConnectIndex, !1);
      o &&
        (
          this.segl.firstdir = o.GetSegLFace(GlobalData.optManager.LinkParams.ConnectPt, this.EndPoint, n)
        )
    } else GlobalData.optManager.ob &&
      GlobalData.optManager.ob.BlockID === this.BlockID &&
      (
        this.segl.firstdir = GlobalData.optManager.ob.segl.firstdir,
        this.segl.lastdir = GlobalData.optManager.ob.segl.lastdir
      );
    this.AdjustLine(e, t, a, ConstantData.ActionTriggerType.LINESTART)
  }

  GetDimensions() {
    var e,
      t,
      a = {};
    return e = Math.abs(this.EndPoint.x - this.StartPoint.x),
      t = Math.abs(this.EndPoint.y - this.StartPoint.y),
      a.x = e,
      a.y = t,
      a
  }

  GetDimensionsForDisplay() {
    //'use strict';
    return {
      x: this.Frame.x,
      y: this.Frame.y,
      width: this.Frame.width,
      height: this.Frame.height
    }
  }

  UpdateDimensions(e, t, a) {
    var r,
      i,
      n = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    r = t ? this.StartPoint.x + t : this.EndPoint.x,
      i = a ? this.StartPoint.y + a : this.EndPoint.y,
      this.AdjustLineEnd(n, r, i, ConstantData.ActionTriggerType.LINEEND)
  }

  SetSize(e, t, a) {
    var r = !1,
      i = 0,
      n = 0;
    e &&
      (i = e - this.Frame.width),
      t &&
      (n = t - this.Frame.height),
      this.rflags &&
      (
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !1
        )
      ),
      (
        this.StartPoint.x < this.EndPoint.x ||
        Utils2.IsEqual(this.StartPoint.x, this.EndPoint.x) &&
        this.StartPoint.y < this.EndPoint.y
      ) &&
      (r = !0);
    var o = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    r ? this.AdjustLineEnd(o, this.EndPoint.x + i, this.EndPoint.y + n, 0) : this.AdjustLineStart(o, this.StartPoint.x + i, this.StartPoint.y + n, 0),
      GlobalData.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE)
  }

  Flip(e) {
    var t,
      a,
      r,
      i,
      n,
      o,
      s,
      l = [],
      S = ConstantData.SegLDir;
    if (
      GlobalData.optManager.ob = Utils1.DeepCopy(this),
      e & ConstantData.ExtraFlags.SEDE_FlipVert
    ) {
      switch (t = !0, this.segl.firstdir) {
        case S.SED_KTC:
          this.segl.firstdir = S.SED_KBC;
          break;
        case S.SED_KBC:
          this.segl.firstdir = S.SED_KTC
      }
      switch (this.segl.lastdir) {
        case S.SED_KTC:
          this.segl.lastdir = S.SED_KBC;
          break;
        case S.SED_KBC:
          this.segl.lastdir = S.SED_KTC
      }
      for (
        i = this.segl.pts.length,
        a = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        r = 0;
        r < i;
        r++
      ) l.push(
        new Point(this.segl.pts[r].x, this.segl.pts[r].y + a.y - this.Frame.y)
      );
      for (o = this.Frame.height, r = 0; r < i; r++) l[r].y = o - l[r].y;
      for (
        this.StartPoint.y = l[0].y + this.Frame.y,
        this.EndPoint.y = l[i - 1].y + this.Frame.y,
        s = this.EndPoint.y < this.StartPoint.y ? this.EndPoint.y - this.Frame.y : this.StartPoint.y - this.Frame.y,
        r = 0;
        r < i;
        r++
      ) this.segl.pts[r].y = l[r].y - s
    }
    if (e & ConstantData.ExtraFlags.SEDE_FlipHoriz) {
      switch (t = !0, this.segl.firstdir) {
        case S.SED_KLC:
          this.segl.firstdir = S.SED_KRC;
          break;
        case S.SED_KRC:
          this.segl.firstdir = S.SED_KLC
      }
      switch (this.segl.lastdir) {
        case S.SED_KLC:
          this.segl.lastdir = S.SED_KRC;
          break;
        case S.SED_KRC:
          this.segl.lastdir = S.SED_KLC
      }
      for (
        i = this.segl.pts.length,
        a = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        r = 0;
        r < i;
        r++
      ) l.push(
        new Point(this.segl.pts[r].x + a.x - this.Frame.x, this.segl.pts[r].y)
      );
      for (n = this.Frame.width, r = 0; r < i; r++) l[r].x = n - l[r].x;
      for (
        this.StartPoint.x = l[0].x + this.Frame.x,
        this.EndPoint.x = l[i - 1].x + this.Frame.x,
        s = this.EndPoint.x < this.StartPoint.x ? this.EndPoint.x - this.Frame.x : this.StartPoint.x - this.Frame.x,
        r = 0;
        r < i;
        r++
      ) this.segl.pts[r].x = l[r].x - s
    }
    if (t) {
      var c = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      - 1 != this.DataID &&
        this.LM_ResizeSVGTextObject(c, this, this.Frame),
        GlobalData.optManager.ob.Frame &&
        GlobalData.optManager.MaintainLink(
          this.BlockID,
          this,
          GlobalData.optManager.ob,
          ConstantData.ActionTriggerType.ROTATE
        ),
        GlobalData.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE)
    }
    GlobalData.optManager.ob = {}
  }

  GetFrameIntersects(e, t, a, r) {
    var i,
      n,
      o,
      s,
      l,
      S,
      c = {},
      u = 2 * ConstantData.Defines.SED_SegMinLen,
      p = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
    for (
      c.x = e.x - p.x,
      c.y = e.y - p.y,
      c.width = e.width,
      c.height = e.height,
      i = this.segl.pts.length,
      n = 1;
      n < i;
      n++
    ) if (this.segl.pts[n].x === this.segl.pts[n - 1].x) {
      if (
        this.segl.pts[n].y < this.segl.pts[n - 1].y ? (o = this.segl.pts[n].y, s = this.segl.pts[n - 1].y) : (o = this.segl.pts[n - 1].y, s = this.segl.pts[n].y),
        l = this.segl.pts[n].x,
        o + u < c.y &&
        s - u > c.y + c.height &&
        l > c.x &&
        l < c.x + c.width
      ) return t.AdjustAutoInsertShape(e, !0),
        r.AutoSeg = n,
        c.x = e.x - p.x,
        c.y = e.y - p.y,
        c.width = e.width,
        c.height = e.height,
        this.segl.pts[n - 1].y < this.segl.pts[n].y ? (
          a.push(new Point(this.segl.pts[n].x + p.x, c.y + p.y)),
          a[0].index = n,
          a.push(
            new Point(this.segl.pts[n].x + p.x, c.y + c.height + p.y)
          ),
          a[1].index = n
        ) : (
          a.push(
            new Point(this.segl.pts[n].x + p.x, c.y + c.height + p.y)
          ),
          a.push(new Point(this.segl.pts[n].x + p.x, c.y + p.y)),
          a[0].index = n,
          a[1].index = n
        ),
        !0
    } else if (
        this.segl.pts[n].x < this.segl.pts[n - 1].x ? (o = this.segl.pts[n].x, s = this.segl.pts[n - 1].x) : (o = this.segl.pts[n - 1].x, s = this.segl.pts[n].x),
        S = this.segl.pts[n].y,
        o + u < c.x &&
        s - u > c.x + c.width &&
        S > c.y &&
        S < c.y + c.height
      ) return t.AdjustAutoInsertShape(e, !1),
        r.AutoSeg = n,
        c.x = e.x - p.x,
        c.y = e.y - p.y,
        c.width = e.width,
        c.height = e.height,
        this.segl.pts[n - 1].x < this.segl.pts[n].x ? (
          a.push(new Point(c.x + p.x, this.segl.pts[n].y + p.y)),
          a.push(
            new Point(c.x + c.width + p.x, this.segl.pts[n].y + p.y)
          ),
          a[0].index = n,
          a[1].index = n
        ) : (
          a.push(
            new Point(c.x + c.width + p.x, this.segl.pts[n].y + p.y)
          ),
          a.push(new Point(c.x + p.x, this.segl.pts[n].y + p.y)),
          a[0].index = n,
          a[1].index = n
        ),
        !0;
    return !1
  }

  NoRotate() {
    return !0
  }

  CalcTextPosition(e) {
    var t,
      a,
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
      d = 1,
      D = 0,
      g = 0,
      h = {},
      m = {},
      C = [];
    for (
      r = {
        x: e.Frame.x + e.Frame.width / 2,
        y: e.Frame.y + e.Frame.height / 2
      },
      n = this.segl.pts.length,
      r.x -= this.Frame.x,
      r.y -= this.Frame.y,
      i = 1;
      i < n;
      i++
    ) o = this.segl.pts[i - 1],
      s = this.segl.pts[i],
      Utils2.IsEqual(o.x, s.x) ? (
        o.y < s.y ? (c = o.y, u = s.y) : (c = s.y, u = o.y),
        t = Math.abs(r.x - o.x),
        (void 0 === l || t < l) &&
        (l = t),
        (void 0 === S || l < S) &&
        l === t &&
        r.y >= c &&
        r.y <= u &&
        (d = i, D = o.y),
        p = Math.abs(o.y - s.y),
        C.push(p),
        g += p
      ) : (
        o.x < s.x ? (c = o.x, u = s.x) : (c = s.x, u = o.x),
        a = Math.abs(r.y - o.y),
        (void 0 === S || a < S) &&
        (S = a),
        (void 0 === l || S < l) &&
        S === a &&
        r.x >= c &&
        r.x <= u &&
        (d = i, D = o.x),
        p = Math.abs(o.x - s.x),
        C.push(p),
        g += p
      );
    h.x = this.segl.pts[d - 1].x,
      h.y = this.segl.pts[d - 1].y,
      m.x = this.segl.pts[d].x,
      m.y = this.segl.pts[d].y,
      Utils2.IsEqual(h.x, m.x) ? ((t = r.y - D) < 0 && (t = - t), a = - (a = r.x - h.x)) : ((t = r.x - D) < 0 && (t = - t), a = r.y - h.y);
    var y = 0;
    for (i = 0; i < d - 1; i++) y += C[i];
    y += t,
      this.LineTextX = y / g,
      this.LineTextY = a,
      this.LineTextX &&
      (this.trect = $.extend(!0, {
      }, e.trect)),
      e.TextGrow = ConstantData.TextGrowBehavior.VERTICAL,
      this.TextFlags = Utils2.SetFlag(
        this.TextFlags,
        ConstantData.TextFlags.SED_TF_HorizText,
        !0
      )
  }

  GetTextOnLineParams(e) {
    var t,
      a,
      r,
      i,
      n,
      o,
      s = {
        Frame: new ListManager.Rect,
        StartPoint: new Point,
        EndPoint: new Point
      },
      l = this.segl.pts.length,
      S = !1,
      c = 0,
      u = 0.5;
    if (
      this.segl.pts[0].x < this.segl.pts[l - 1].x ||
        this.segl.pts[0].x === this.segl.pts[l - 1].x &&
        this.segl.pts[0].y < this.segl.pts[l - 1].y ? (t = 0, a = l - 2) : (t = l - 2, a = 0, S = !0),
      0 !== this.LineTextX
    ) {
      for (l = this.segl.pts.length, o = 1; o < l; o++) Utils2.IsEqual(this.segl.pts[o - 1].x, this.segl.pts[o].x) ? c += Math.abs(this.segl.pts[o - 1].y - this.segl.pts[o].y) : c += Math.abs(this.segl.pts[o - 1].x - this.segl.pts[o].x);
      for (i = this.LineTextX * c, c = 0, r = l - 2, o = 1; o < l; o++) if (
        (
          c += n = Utils2.IsEqual(this.segl.pts[o - 1].x, this.segl.pts[o].x) ? Math.abs(this.segl.pts[o - 1].y - this.segl.pts[o].y) : Math.abs(this.segl.pts[o - 1].x - this.segl.pts[o].x)
        ) > i
      ) {
        r = o - 1,
          u = (n - (c - i)) / n;
        break
      }
      s.CenterProp = u,
        s.Frame = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        s.Frame = Utils1.DeepCopy(this.Frame),
        s.StartPoint.x = s.Frame.x + this.segl.pts[r].x,
        s.StartPoint.y = s.Frame.y + this.segl.pts[r].y,
        s.EndPoint.x = s.Frame.x + this.segl.pts[r + 1].x,
        s.EndPoint.y = s.Frame.y + this.segl.pts[r + 1].y,
        s.Frame = Utils1.DeepCopy(this.Frame)
    } else {
      switch (l) {
        case 2:
          r = 0;
          break;
        case 3:
          Utils2.IsEqual(this.segl.pts[0].x, this.segl.pts[1].x) ? (
            i = Math.abs(this.segl.pts[0].y - this.segl.pts[1].y),
            n = Math.abs(this.segl.pts[1].x - this.segl.pts[2].x)
          ) : (
            i = Math.abs(this.segl.pts[0].x - this.segl.pts[1].x),
            n = Math.abs(this.segl.pts[1].y - this.segl.pts[2].y)
          ),
            r = i > n ? 0 : 1;
          break;
        case 5:
          Utils2.IsEqual(this.segl.pts[1].x, this.segl.pts[2].x) ? (
            i = Math.abs(this.segl.pts[1].y - this.segl.pts[2].y),
            n = Math.abs(this.segl.pts[2].x - this.segl.pts[3].x)
          ) : (
            i = Math.abs(this.segl.pts[1].x - this.segl.pts[2].x),
            n = Math.abs(this.segl.pts[2].y - this.segl.pts[3].y)
          ),
            r = i > n ? 1 : 2;
          break;
        default:
          r = Math.round((l - 1.1) / 2)
      }
      switch (this.TextAlign) {
        case ConstantData.TextAlign.TOPLEFT:
        case ConstantData.TextAlign.LEFT:
        case ConstantData.TextAlign.BOTTOMLEFT:
          S ? (
            s.EndPoint.x = this.Frame.x + this.segl.pts[t].x,
            s.EndPoint.y = this.Frame.y + this.segl.pts[t].y,
            s.StartPoint.x = this.Frame.x + this.segl.pts[t + 1].x,
            s.StartPoint.y = this.Frame.y + this.segl.pts[t + 1].y
          ) : (
            s.StartPoint.x = this.Frame.x + this.segl.pts[t].x,
            s.StartPoint.y = this.Frame.y + this.segl.pts[t].y,
            s.EndPoint.x = this.Frame.x + this.segl.pts[t + 1].x,
            s.EndPoint.y = this.Frame.y + this.segl.pts[t + 1].y
          );
          break;
        case ConstantData.TextAlign.TOPRIGHT:
        case ConstantData.TextAlign.RIGHT:
        case ConstantData.TextAlign.BOTTOMRIGHT:
          S ? (
            s.EndPoint.x = this.Frame.x + this.segl.pts[a].x,
            s.EndPoint.y = this.Frame.y + this.segl.pts[a].y,
            s.StartPoint.x = this.Frame.x + this.segl.pts[a + 1].x,
            s.StartPoint.y = this.Frame.y + this.segl.pts[a + 1].y
          ) : (
            s.StartPoint.x = this.Frame.x + this.segl.pts[a].x,
            s.StartPoint.y = this.Frame.y + this.segl.pts[a].y,
            s.EndPoint.x = this.Frame.x + this.segl.pts[a + 1].x,
            s.EndPoint.y = this.Frame.y + this.segl.pts[a + 1].y
          );
          break;
        default:
          S ? (
            s.EndPoint.x = this.Frame.x + this.segl.pts[r].x,
            s.EndPoint.y = this.Frame.y + this.segl.pts[r].y,
            s.StartPoint.x = this.Frame.x + this.segl.pts[r + 1].x,
            s.StartPoint.y = this.Frame.y + this.segl.pts[r + 1].y
          ) : (
            s.StartPoint.x = this.Frame.x + this.segl.pts[r].x,
            s.StartPoint.y = this.Frame.y + this.segl.pts[r].y,
            s.EndPoint.x = this.Frame.x + this.segl.pts[r + 1].x,
            s.EndPoint.y = this.Frame.y + this.segl.pts[r + 1].y
          )
      }
      s.Frame = Utils1.DeepCopy(this.Frame)
    }
    return s
  }

  CreateActionTriggers(e, t, a, r) {
    var i,
      n,
      o = e.CreateShape(Document.CreateShapeType.GROUP),
      s = ConstantData.Defines.SED_KnobSize;
    ConstantData.Defines.SED_RKnobSize;
    if (
      this.objecttype !== ConstantData.ObjectTypes.SD_OBJT_GANTT_CONNECTOR
    ) {
      var l = e.docInfo.docToScreenScale;
      e.docInfo.docScale <= 0.5 &&
        (l *= 2);
      var S = s / l;
      n = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
      var c = this.Frame.width,
        u = this.Frame.height,
        p = GlobalData.optManager.GetObjectPtr(t, !1);
      c += S,
        u += S;
      var d = $.extend(!0, {
      }, this.Frame);
      d.x -= S / 2,
        d.y -= S / 2,
        d.width += S,
        d.height += S;
      var D,
        g = {
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
          g.fillColor = 'white',
          g.strokeSize = 1,
          g.strokeColor = 'black',
          g.fillOpacity = 0
        ),
        this.flags & ConstantData.ObjFlags.SEDO_Lock ? (g.fillColor = 'gray', g.locked = !0) : this.NoGrow() &&
          (
            g.fillColor = 'red',
            g.strokeColor = 'red',
            g.cursorType = Element.CursorType.DEFAULT
          ),
        g.x = this.StartPoint.x - this.Frame.x,
        g.y = this.StartPoint.y - this.Frame.y,
        g.knobID = ConstantData.ActionTriggerType.LINESTART,
        p &&
        p.hooks
      ) for (D = 0; D < p.hooks.length; D++) if (p.hooks[D].hookpt == ConstantData.HookPts.SED_KTL) {
        g.shapeType = Document.CreateShapeType.OVAL;
        break
      }
      var h = this.GenericKnob(g);
      if (
        o.AddElement(h),
        g.shapeType = Document.CreateShapeType.RECT,
        p &&
        p.hooks
      ) for (D = 0; D < p.hooks.length; D++) if (p.hooks[D].hookpt == ConstantData.HookPts.SED_KTR) {
        g.shapeType = Document.CreateShapeType.OVAL;
        break
      }
      if (
        g.x = this.EndPoint.x - this.Frame.x,
        g.y = this.EndPoint.y - this.Frame.y,
        g.knobID = ConstantData.ActionTriggerType.LINEEND,
        h = this.GenericKnob(g),
        o.AddElement(h),
        g.shapeType = Document.CreateShapeType.RECT,
        this.segl &&
        this.segl.pts &&
        this.segl.firstdir > 0
      ) for (i = this.segl.pts.length, D = 2; D < i - 1; D++) this.segl.pts[D - 1].x === this.segl.pts[D].x ? (
        g.x = this.segl.pts[D].x + n.x - this.Frame.x,
        g.y = (this.segl.pts[D - 1].y + this.segl.pts[D].y) / 2 + n.y - this.Frame.y
      ) : (
        g.y = this.segl.pts[D].y + n.y - this.Frame.y,
        g.x = (this.segl.pts[D - 1].x + this.segl.pts[D].x) / 2 + n.x - this.Frame.x
      ),
        g.cursorType = this.CalcCursorForSegment(this.segl.pts[D], this.segl.pts[D - 1], !0),
        g.knobID = ConstantData.ActionTriggerType.SEGL_ONE + D - 2,
        this.NoGrow() &&
        (g.cursorType = Element.CursorType.DEFAULT),
        h = this.GenericKnob(g),
        o.AddElement(h);
      return o.SetSize(c, u),
        o.SetPos(d.x, d.y),
        o.isShape = !0,
        o.SetID(ConstantData.Defines.Action + t),
        o
    }
  }

  ModifyShape(e, t, a, r, i) {


    console.log('== track UpdateDimensionsLines Shape.SegmentedLine-> ModifyShape')


    var n = e.GetElementByID(ConstantData.SVGElementClass.SHAPE),
      o = e.GetElementByID(ConstantData.SVGElementClass.SLOP),
      s = new Point(t, a);
    this.SegLFormat(s, r, 0),
      this.CalcFrame();
    // var l = ListManager.SegmentedLine.prototype.GetPolyPoints.call(this, ConstantData.Defines.NPOLYPTS, !0, !1, null),
    // Double === TODO
    var l = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, null),
      S = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
    e.SetSize(this.Frame.width, this.Frame.height),
      e.SetPos(S.x, S.y),
      n.SetSize(this.Frame.width, this.Frame.height),
      this.UpdateSVG(n, l),
      o.SetSize(this.Frame.width, this.Frame.height),
      this.UpdateSVG(o, l),
      this.UpdateDimensionLines(e),
      - 1 != this.DataID &&
      this.LM_ResizeSVGTextObject(e, this, this.Frame)
  }

  OnConnect(e, t, a, r, i) {
    var n,
      o,
      s = 0,
      l = GlobalData.optManager.svgObjectLayer.GetElementByID(e);
    switch (a) {
      case ConstantData.HookPts.SED_KTL:
        this.segl.firstdir = t.GetSegLFace(GlobalData.optManager.LinkParams.ConnectPt, this.EndPoint, r),
          s = ConstantData.ActionTriggerType.LINEEND,
          n = this.EndPoint.x,
          o = this.EndPoint.y;
        break;
      case ConstantData.HookPts.SED_KTR:
        this.segl.lastdir = t.GetSegLFace(GlobalData.optManager.LinkParams.ConnectPt, this.StartPoint, r),
          s = ConstantData.ActionTriggerType.LINESTART,
          n = this.StartPoint.x,
          o = this.StartPoint.y
    }
    s &&
      this.AdjustLine(l, n, o, s)
  }

  OnDisconnect(e, t, a, r) {
    var i,
      n,
      o = 0,
      s = GlobalData.optManager.svgObjectLayer.GetElementByID(e);
    switch (
    GlobalData.optManager.ob &&
    GlobalData.optManager.ob.BlockID === this.BlockID &&
    (
      this.segl.firstdir = GlobalData.optManager.ob.segl.firstdir,
      this.segl.lastdir = GlobalData.optManager.ob.segl.lastdir
    ),
    a
    ) {
      case ConstantData.HookPts.SED_KTL:
        o = ConstantData.ActionTriggerType.LINEEND,
          i = this.EndPoint.x,
          n = this.EndPoint.y,
          this.segl.firstdir = 0,
          GlobalData.optManager.ob &&
          GlobalData.optManager.ob.segl &&
          (GlobalData.optManager.ob.segl.firstdir = 0);
        break;
      case ConstantData.HookPts.SED_KTR:
        o = ConstantData.ActionTriggerType.LINESTART,
          i = this.StartPoint.x,
          n = this.StartPoint.y,
          this.segl.lastdir = 0,
          GlobalData.optManager.ob &&
          GlobalData.optManager.ob.segl &&
          (GlobalData.optManager.ob.segl.lastdir = 0)
    }
    o &&
      this.AdjustLine(s, i, n, o)
  }

  LinkGrow(e, t, a) {
    switch (t) {
      case ConstantData.HookPts.SED_KTL:
        Utils2.IsEqual(a.x, this.StartPoint.x) &&
          Utils2.IsEqual(a.y, this.StartPoint.y) ||
          this.SegLFormat(a, ConstantData.ActionTriggerType.LINESTART, 0);
        break;
      case ConstantData.HookPts.SED_KTR:
        Utils2.IsEqual(a.x, this.EndPoint.x) &&
          Utils2.IsEqual(a.y, this.EndPoint.y) ||
          this.SegLFormat(a, ConstantData.ActionTriggerType.LINEEND, 0)
    }
    this.CalcFrame(!0),
      GlobalData.optManager.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
      GlobalData.optManager.AddToDirtyList(e)
  }

  HookToPoint(e, t) {
    var a,
      r = {
        x: 0,
        y: 0
      },
      i = {
        x: 0,
        y: 0
      },
      n = {},
      // o = ListManager;
      // Double === TODO
      o = ListManager;
    switch (e) {
      case o.HookPts.SED_KTL:
        r.x = this.StartPoint.x,
          r.y = this.StartPoint.y,
          t &&
          (
            i.x = this.StartPoint.x + this.segl.pts[1].x,
            i.y = this.StartPoint.y + this.segl.pts[1].y,
            n = Utils2.Pt2Rect(this.StartPoint, i),
            t.x = n.x,
            t.y = n.y,
            t.width = n.width,
            t.height = n.height
          );
        break;
      case o.HookPts.SED_KTR:
      default:
        r.x = this.EndPoint.x,
          r.y = this.EndPoint.y,
          a = this.segl.pts.length,
          t &&
          (
            i.x = this.StartPoint.x + this.segl.pts[a - 2].x,
            i.y = this.StartPoint.y + this.segl.pts[a - 2].y,
            n = Utils2.Pt2Rect(this.EndPoint, i),
            t.x = n.x,
            t.y = n.y,
            t.width = n.width,
            t.height = n.height
          )
    }
    return r
  }

  GetTargetPoints(e, t, a) {
    var r = ConstantData.HookPts,
      i = ConstantData.Defines.SED_CDim,
      n = [
        {
          x: 0,
          y: 0,
          id: r.SED_KTL
        },
        {
          x: i,
          y: i,
          id: r.SED_KTR
        }
      ];
    if (
      null != a &&
      null != a &&
      a >= 0 &&
      GlobalData.optManager.GetObjectPtr(a, !1).DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
    ) {
      var o = e.id;
      switch (e.id >= r.SED_CustomBase && (o = r.SED_CustomBase), o) {
        case r.SED_CustomBase:
        case r.SED_KTC:
        case r.SED_KBC:
        case r.SED_KRC:
        case r.SED_KLC:
          var s = this.Frame.width;
          s <= 0 &&
            (s = 1);
          var l = this.Frame.height;
          if (
            l <= 0 &&
            (l = 1),
            n[0].x = (this.StartPoint.x - this.Frame.x) / s * i,
            n[0].y = (this.StartPoint.y - this.Frame.y) / l * i,
            n[1].x = (this.EndPoint.x - this.Frame.x) / s * i,
            n[1].y = (this.EndPoint.y - this.Frame.y) / l * i,
            0 === this.hooks.length
          ) return n;
          if (1 !== this.hooks.length) return [];
          if (this.hooks[0].hookpt === r.SED_KTR) return n[1].skip = !0,
            n;
          if (this.hooks[0].hookpt === r.SED_KTL) return n[0].skip = !0,
            n[0].x = n[1].x,
            n[0].y = n[1].y,
            n
      }
    }
    // return ListManager.BaseShape.prototype.PolyGetTargets.call(this, e, t, this.Frame)
    // Double === TODO
    // return new BaseShape(this).PolyGetTargets(e, t, this.Frame)
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
      GlobalData.docHandler.documentConfig.enableSnap &&
        0 == (t & ConstantData.HookFlags.SED_LC_NoSnaps) ? (
        (P = GlobalData.docHandler.SnapToGrid(P)).y < a.y &&
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
    var o,
      s,
      l,
      S,
      c = [],
      u = 0;
    ConstantData.ObjectTypes;
    if (t) {
      if (
        2 === (S = t.length) &&
        t[0].id &&
        t[0].id === ConstantData.HookPts.SED_KTL &&
        t[1].id &&
        t[1].id === ConstantData.HookPts.SED_KTR
      ) return null == t[0].skip &&
        (
          c.push(
            new Point(this.StartPoint.x, this.StartPoint.y)
          ),
          c[0].id = t[0].id,
          u = 1
        ),
        null == t[1].skip &&
        (
          c.push(new Point(this.EndPoint.x, this.EndPoint.y)),
          c[u].id = t[1].id
        ),
        c;
      if (n >= 0) {
        var p = GlobalData.optManager.GetObjectPtr(n, !1);
        if (
          p &&
          p.objecttype === ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY &&
          1 === S
        ) {
          var d = 5,
            D = 5;
          if (d += p.Frame.width / 2, 0 === t[0].x) {
            var g = this.segl.pts[0],
              h = this.segl.pts[1];
            g.x === h.x ? (
              p.subtype == ConstantData.ObjectSubTypes.SD_SUBT_MULTIPLICITY_FLIPPED &&
              (d = - d),
              g.y > h.y ? D = - D : D += p.Frame.height,
              c.push(
                new Point(this.StartPoint.x + d, this.StartPoint.y + D)
              ),
              c[0].id = t[0].id
            ) : (
              p.subtype == ConstantData.ObjectSubTypes.SD_SUBT_MULTIPLICITY_FLIPPED &&
              (D = - p.Frame.height - 5),
              D = - D,
              g.x > h.x &&
              (d = - d),
              c.push(
                new Point(this.StartPoint.x + d, this.StartPoint.y + D)
              ),
              c[0].id = t[0].id
            )
          } else {
            var m = this.segl.pts.length;
            g = this.segl.pts[m - 2],
              h = this.segl.pts[m - 1];
            g.x === h.x ? (
              p.subtype == ConstantData.ObjectSubTypes.SD_SUBT_MULTIPLICITY_FLIPPED &&
              (d = - d),
              g.y < h.y ? D = - D : D += p.Frame.height,
              a === ConstantData.HookPts.SED_KCBR &&
              (d = - d),
              c.push(
                new Point(this.EndPoint.x + d, this.EndPoint.y + D)
              ),
              c[0].id = t[0].id
            ) : (
              p.subtype == ConstantData.ObjectSubTypes.SD_SUBT_MULTIPLICITY_FLIPPED &&
              (D = - p.Frame.height - 5),
              D = - D,
              g.x < h.x &&
              (d = - d),
              c.push(
                new Point(this.EndPoint.x + d, this.EndPoint.y + D)
              ),
              c[0].id = t[0].id
            )
          }
          return c
        }
        if (
          p &&
          p.objecttype === ConstantData.ObjectTypes.SD_OBJT_EXTRATEXTLABEL &&
          1 === S
          // ) return c = ListManager.BaseLine.prototype.GetPerimPts.call(this, e, t, a, r, i, n)
        ) return c = super.GetPerimPts(e, t, a, r, i, n)
      }
    }
    l = this.Frame,
      S = t.length;
    for (var C = 0; C < S; C++) c[C] = {
      x: 0,
      y: 0,
      id: 0
    },
      o = l.width,
      s = l.height,
      c[C].x = t[C].x / ConstantData.Defines.SED_CDim * o + l.x,
      c[C].y = t[C].y / ConstantData.Defines.SED_CDim * s + l.y,
      null != t[C].id &&
      (c[C].id = t[C].id);
    return c
  }

  ScaleObject(e, t, a, r, i, n, o) {
    // ListManager.BaseLine.prototype.ScaleObject.call(this, e, t, a, r, i, n, o),
    // Double === TODO
    super.ScaleObject(e, t, a, r, i, n, o),
      this.SegLFormat(
        this.EndPoint,
        ConstantData.ActionTriggerType.SEGL_PRESERVE,
        0
      ),
      this.CalcFrame()
  }

  GetSegLFace(e, t, a) {
    var r,
      i = 0,
      n = {},
      o = {},
      s = {};
    return (
      // r = ListManager.SegmentedLine.prototype.GetPolyPoints.call(this, ConstantData.Defines.NPOLYPTS, !1, !0, null)
      // Double === TODO
      r = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, null)
    ).length,
      o.x = a.x,
      o.y = a.y,
      Utils3.LineDStyleHit(r, o, this.StyleRecord.Line.Thickness, 0, s) &&
      s.lpHit >= 0 &&
      (
        i = (n = Utils2.Pt2Rect(r[s.lpHit], r[s.lpHit + 1])).width >= n.height ? t.y >= a.y ? ConstantData.HookPts.SED_KBC : ConstantData.HookPts.SED_KTC : t.x >= a.x ? ConstantData.HookPts.SED_KRC : ConstantData.HookPts.SED_KLC
      ),
      i
  }

  GetSpacing() {
    var e = ConstantData.HookPts,
      t = {
        width: null,
        height: null
      };
    if (2 === this.hooks.length) var a = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, !1),
      r = GlobalData.optManager.GetObjectPtr(this.hooks[1].objid, !1);
    switch (this.segl.firstdir) {
      case e.SED_KTC:
        if (this.segl.lastdir === e.SED_KBC) t.height = Math.abs(this.StartPoint.y - this.EndPoint.y),
          a &&
          r &&
          (
            a.Frame.y < r.Frame.y ? t.height = r.Frame.y - (a.Frame.y + a.Frame.height) : t.height = a.Frame.y - (r.Frame.y + r.Frame.height)
          );
        break;
      case e.SED_KBC:
        if (this.segl.lastdir === e.SED_KTC) t.height = Math.abs(this.StartPoint.y - this.EndPoint.y),
          a &&
          r &&
          (
            a.Frame.y < r.Frame.y ? t.height = r.Frame.y - (a.Frame.y + a.Frame.height) : t.height = a.Frame.y - (r.Frame.y + r.Frame.height)
          );
        break;
      case e.SED_KLC:
        if (this.segl.lastdir === e.SED_KRC) t.width = Math.abs(this.StartPoint.x - this.EndPoint.x),
          a &&
          r &&
          (
            a.Frame.x < r.Frame.x ? t.width = r.Frame.x - (a.Frame.x + a.Frame.width) : t.width = a.Frame.x - (r.Frame.x + r.Frame.width)
          );
        break;
      case e.SED_KRC:
        if (this.segl.lastdir === e.SED_KLC) t.width = Math.abs(this.StartPoint.x - this.EndPoint.x),
          a &&
          r &&
          (
            a.Frame.x < r.Frame.x ? t.width = r.Frame.x - (a.Frame.x + a.Frame.width) : t.width = a.Frame.x - (r.Frame.x + r.Frame.width)
          )
    }
    return t
  }

  GetShapeConnectPoint(e) {
    var t,
      a,
      r = {},
      i = {},
      n = this.segl.lastdir,
      o = this.segl.firstdir,
      s = ConstantData.Defines.SED_CDim,
      l = this.segl.pts.length;
    return e &&
      e === ConstantData.HookPts.SED_KTL ? (t = this.segl.pts[0], a = this.segl.pts[1]) : (t = this.segl.pts[l - 2], a = this.segl.pts[l - 1]),
      t.x === a.x ? (
        r.x = s / 2,
        i.x = s / 2,
        a.y > t.y ? (
          r.y = 0,
          i.y = s,
          n = ConstantData.HookPts.SED_KTC,
          o = ConstantData.HookPts.SED_KBC
        ) : (
          r.y = s,
          i.y = 0,
          n = ConstantData.HookPts.SED_KBC,
          o = ConstantData.HookPts.SED_KTC
        )
      ) : (
        r.y = s / 2,
        i.y = s / 2,
        a.x > t.x ? (
          r.x = 0,
          i.x = s,
          n = ConstantData.HookPts.SED_KLC,
          o = ConstantData.HookPts.SED_KRC
        ) : (
          r.x = s,
          i.x = 0,
          n = ConstantData.HookPts.SED_KRC,
          o = ConstantData.HookPts.SED_KLC
        )
      ),
      e &&
        e === ConstantData.HookPts.SED_KTL ? (this.segl.firstdir = o, i) : (this.segl.lastdir = n, r)
  }

  ConnectToHook(e, t) {
    return SDF.LineIsReversed(this, null, !1) &&
      (
        t === ConstantData.HookPts.SED_KTL ? t = ConstantData.HookPts.SED_KTR : t === ConstantData.HookPts.SED_KTR &&
          (t = ConstantData.HookPts.SED_KTL)
      ),
      t
  }

  GetBestHook(e, t, a) {
    var r,
      i,
      n,
      o = ConstantData.Defines.SED_CDim,
      s = (
        Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        ConstantData.HookPts
      ),
      l = this.segl.pts.length;
    n = a.x,
      2 === this.segl.pts.length &&
      this.segl.pts[0].x === this.segl.pts[1].x &&
      (n = a.y),
      SDF.LineIsReversed(this, null, !1) ? 0 === n ? (i = this.segl.pts[l - 2], r = this.segl.pts[l - 1]) : (r = this.segl.pts[0], i = this.segl.pts[1]) : n === o ? (i = this.segl.pts[l - 2], r = this.segl.pts[l - 1]) : (r = this.segl.pts[0], i = this.segl.pts[1]);
    var S = GlobalData.optManager.GetObjectPtr(e, !1);
    if (
      S &&
      S.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
    ) switch (t) {
      case s.SED_KTC:
      case s.SED_KBC:
      case s.SED_KRC:
      case s.SED_KLC:
        return r.x === i.x ? r.y < i.y ? s.SED_KBC : s.SED_KTC : r.x < i.x ? s.SED_KRC : s.SED_KLC;
      default:
        return t
    }
    return t
  }

  MaintainPoint(e, t, a, r, i) {
    var n,
      o,
      s,
      l,
      S = {},
      c = {},
      u = {};
    switch (l = r, r.DrawingObjectBaseClass) {
      case ConstantData.DrawingObjectBaseClass.LINE:
        switch (r.LineType) {
          case ConstantData.LineType.SEGLINE:
          case ConstantData.LineType.ARCSEGLINE:
          case ConstantData.LineType.POLYLINE:
            for (n = - 1, o = 0; o < r.hooks.length; o++) if (r.hooks[o].targetid === t) {
              r.HookToPoint(r.hooks[o].hookpt, S),
                n = 0;
              break
            }
            if (0 !== n) return !0;
            c = Utils1.DeepCopy(r),
              Utils2.CopyRect(c.Frame, S),
              c.StartPoint.x = S.x,
              c.StartPoint.y = S.y,
              c.EndPoint.x = S.x + S.width,
              c.EndPoint.y = S.y + S.height,
              l = c
        }
        // var p = ListManager.SegmentedLine.prototype.GetPolyPoints.call(this, ConstantData.Defines.NPOLYPTS, !1, !0, null);
        // Double === TODO
        var p = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, null);
        for (s = p.length, o = 1; o < s; o++) {
          if (
            S = Utils2.Pt2Rect(p[o], p[o - 1]),
            u = Utils1.DeepCopy(this),
            Utils2.CopyRect(u.Frame, S),
            u.StartPoint.x = S.x,
            u.StartPoint.y = S.y,
            u.EndPoint.x = S.x + S.width,
            u.EndPoint.y = S.y + S.height,
            GlobalData.optManager.LineCheckPoint(u, e)
          ) return !0;
          if (GlobalData.optManager.Lines_Intersect(u, l, e)) return !0
        }
        GlobalData.optManager.Lines_MaintainDist(this, a, i, e);
        break;
      case ConstantData.DrawingObjectBaseClass.SHAPE:
        GlobalData.optManager.Lines_MaintainDist(this, a, i, e)
    }
    return !0
  }

  WriteSDFAttributes(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u = this.segl.pts.length;
    l = t.WriteBlocks ? this.BlockID : t.nsegl++;
    var p = SDF.LineIsReversed(this, t, !1);
    if (c = Utils1.DeepCopy(this.segl), (S = u - 1) < 0 && (S = 0), p) {
      for (a = 0; a < u; a++) c.pts[u - 1 - a].x = this.segl.pts[a].x,
        c.pts[u - 1 - a].y = this.segl.pts[a].y;
      for (
        c.firstdir = this.segl.lastdir,
        c.lastdir = this.segl.firstdir,
        n = this.segl.lengths.length,
        a = 0;
        a < u - 1;
        a++
      ) Utils2.IsEqual(c.pts[a + 1].x, c.pts[a].x) ? c.lengths[a] = Math.abs(c.pts[a + 1].y - c.pts[a].y) : c.lengths[a] = Math.abs(c.pts[a + 1].x - c.pts[a].x);
      6 === u &&
        (c.lengths[2] = c.lengths[4])
    }
    if (t.WriteVisio || t.WriteWin32) var d = {
      InstId: l,
      firstdir: c.firstdir,
      lastdir: c.lastdir,
      nsegs: S,
      segr: [],
      lengths: [
        0,
        0,
        0,
        0,
        0
      ],
      lsegr: [],
      llengths: [
        0,
        0,
        0,
        0,
        0
      ]
    };
    else d = {
      InstId: l,
      firstdir: c.firstdir,
      lastdir: c.lastdir,
      curveparam: c.curveparam,
      nsegs: S,
      lsegr: [],
      llengths: [
        0,
        0,
        0,
        0,
        0
      ]
    };
    for (a = 0; a < u; ++a) (0 === a || c.pts[a].x < r) &&
      (r = c.pts[a].x),
      (0 === a || c.pts[a].y < i) &&
      (i = c.pts[a].y);
    for (n = c.lengths.length, a = 0; a < n; ++a) d.llengths[a] = SDF.ToSDWinCoords(c.lengths[a], t.coordScaleFactor);
    for (a = 0; a < u - 1; ++a) {
      var D = {
        right: SDF.ToSDWinCoords(c.pts[a + 1].x - r, t.coordScaleFactor),
        bottom: SDF.ToSDWinCoords(c.pts[a + 1].y - i, t.coordScaleFactor),
        left: SDF.ToSDWinCoords(c.pts[a].x - r, t.coordScaleFactor),
        top: SDF.ToSDWinCoords(c.pts[a].y - i, t.coordScaleFactor)
      };
      if (
        u > 2 &&
        (
          D.left > D.right &&
          (o = D.left, D.left = D.right, D.right = o),
          D.top > D.bottom &&
          (s = D.top, D.top = D.bottom, D.bottom = s)
        ),
        d.lsegr.push(D),
        t.WriteVisio ||
        t.WriteWin32
      ) {
        d.segr.push({
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        })
      }
    }
    for (a = u - 1; a < 5; ++a) {
      if (
        d.lsegr.push({
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }),
        t.WriteVisio ||
        t.WriteWin32
      ) {
        d.segr.push({
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        })
      }
    }
    var g = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWSEGL);
    t.WriteVisio ||
      t.WriteWin32 ? e.writeStruct(FileParser.SDF_SegLine_Struct, d) : e.writeStruct(FileParser.SDF_SegLine_Struct_210, d),
      SDF.Write_LENGTH(e, g),
      // ListManager.BaseLine.prototype.WriteSDFAttributes.call(this, e, t)
      // Double === TODO
      super.WriteSDFAttributes(e, t)
  }


}

export default SegmentedLine;

