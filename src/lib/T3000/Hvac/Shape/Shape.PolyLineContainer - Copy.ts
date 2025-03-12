





// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import T3Svg from '../../Hvac.SVG.t2';

import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/T3Gv'
import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
import EvtUtil from "../Event/EvtUtil";
import Resources from '../Data/Resources'
// import Element from "../Basic/Basic.Element";

import PolyLine from "./S.PolyLine"

import ListManager from '../Data/ListManager'
import Global from '../Basic/Basic.Global'
import BaseLine from "./S.BaseLine";
import Point from '../Model/Point'
import BaseShape from './S.BaseShape'

import Document from '../Basic/B.Document'

import Element from '../Basic/B.Element';
import Instance from '../Data/Instance/Instance';
import ConstantData from '../Data/ConstantData'
import PolySeg from '../Model/PolySeg'
import HitResult from '../Model/HitResult'


class PolyLineContainer extends PolyLine {

  // constructor(e) {
  //   "use strict";
  //   void 0 === (e = e || {}).Dimensions && (e.Dimensions = ConstantData.DimensionFlags.SED_DF_Always),
  //     void 0 === e.objecttype && (e.objecttype = ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL),
  //     void 0 === e.TextFlags && (e.TextFlags = 0),
  //     e.TextFlags = Utils2.SetFlag(e.TextFlags, ConstantData.TextFlags.SED_TF_None, !0);
  //   var t = ListManager.PolyLine.apply(this, [e]);
  //   if (t)
  //     return t
  // }

  public T3Type: string;




  constructor(e) {
    "use strict";
    e = e || {};
    if (e.Dimensions === undefined) {
      e.Dimensions = ConstantData.DimensionFlags.SED_DF_Always;
    }
    if (e.objecttype === undefined) {
      e.objecttype = ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL;
    }
    if (e.TextFlags === undefined) {
      e.TextFlags = 0;
    }
    e.TextFlags = Utils2.SetFlag(e.TextFlags, ConstantData.TextFlags.SED_TF_None, true);
    // const t = ListManager.PolyLine.apply(this, [e]);


    super(e);

    this.T3Type = "PolyLineContainer";

    // if (t) {
    //   return t;
    // }
  }










  // ListManager.PolyLineContainer.prototype = new ListManager.PolyLine,
  //   constructor = ListManager.PolyLineContainer,

  // ListManager.PolyLineContainer = function (e) {
  //   //'use strict';
  //   void 0 === (e = e || {
  //   }).Dimensions &&
  //     (e.Dimensions = ConstantData.DimensionFlags.SED_DF_Always),
  //     void 0 === e.objecttype &&
  //     (
  //       e.objecttype = ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
  //     ),
  //     void 0 === e.TextFlags &&
  //     (e.TextFlags = 0),
  //     e.TextFlags = Utils2.SetFlag(e.TextFlags, ConstantData.TextFlags.SED_TF_None, !0);
  //   var t = ListManager.PolyLine.apply(this, [
  //     e
  //   ]);
  //   if (t) return t
  // },
  //   ListManager.PolyLineContainer.prototype = new ListManager.PolyLine,
  //   constructor = ListManager.PolyLineContainer

  CreateShape(e, t) {
    //'use strict';
    // return ListManager.PolyLine.prototype.CreateShape.call(this, e, t)
    return super.CreateShape(e, t);
  }

  // ListManager.PolyLineContainer.prototype = new ListManager.PolyLine,
  // constructor = ListManager.PolyLineContainer,


  NoRotate() {
    return this.polylist.closed,
      !1
  }

  GetKnobSize(e) {
    return 2 * (1 * ConstantData.Defines.SED_KnobSize / 1)
  }

  GetCornerKnobImages() {
    return {
      nwse: ConstantData.Constants.FilePath_ImageKnobs + ConstantData.Constants.Knob_ExpandDiag1,
      nesw: ConstantData.Constants.FilePath_ImageKnobs + ConstantData.Constants.Knob_ExpandDiag2
    }
  }

  CreateActionTriggers(e, t, a, r) {
    var i, n = 0, o = 0, s = null, l = null, S = 0, c = -1 != navigator.userAgent.toLowerCase().indexOf("firefox");
    if (this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL && (gBusinessManager && gBusinessManager.IsAddingWalls && gBusinessManager.IsAddingWalls() || ConstantData.DocumentContext.UsingWallTool))
      return null;
    S = this.GetKnobSize(e);
    var u = e.docInfo.docToScreenScale;
    if (e.docInfo.docScale <= .5 && (u *= 2),
      S /= u,
      // !(l = ListManager.PolyLine.prototype.CreateActionTriggers.call(this, e, t, a, r)))
      //Double === TODO
      !(l = super.CreateActionTriggers.call(this, e, t, a, r)))
      return null;
    var halfKnobSize = S / 2;
    var p = {
      svgDoc: e,
      shapeType: Document.CreateShapeType.IMAGE,
      knobSize: S,
      fillOpacity: 1,
      strokeSize: 0,
      knobID: ConstantData.ActionTriggerType.MOVEPOLYSEG,
      cursorType: this.CalcCursorForSegment(this.StartPoint, this.EndPoint, !1),
      locked: !1
    };
    if (this.flags & ConstantData.ObjFlags.SEDO_Lock ? (p.fillColor = "gray",
      p.locked = !0) : this.NoGrow() && (p.fillColor = "red",
        p.strokeColor = "red",
        p.cursorType = SDGraphics.Element.CursorType.DEFAULT),
      0 !== (i = this.polylist.segs.length)) {
      if (i > 2 && 0 == (this.flags & ConstantData.ObjFlags.SEDO_Lock))
        for (n = 1; n < i; n++) {
          switch (p.cursorType = this.CalcCursorForAngle(this.GetSegmentAdjustAngle(n)),
          this.NoGrow() && (p.cursorType = SDGraphics.Element.CursorType.DEFAULT),
          this.polylist.segs[n].LineType) {
            case ConstantData.LineType.LINE:
              p.x = this.polylist.segs[n - 1].pt.x + (this.polylist.segs[n].pt.x - this.polylist.segs[n - 1].pt.x) / 2 + halfKnobSize + (this.StartPoint.x - this.Frame.x),
                p.y = this.polylist.segs[n - 1].pt.y + (this.polylist.segs[n].pt.y - this.polylist.segs[n - 1].pt.y) / 2 + halfKnobSize + (this.StartPoint.y - this.Frame.y),
                p.x -= S / 2,
                p.y -= S / 2;
              break;
            case ConstantData.LineType.ARCLINE:
            case ConstantData.LineType.PARABOLA:
            case ConstantData.LineType.ARCSEGLINE:
              var d = l.GetElementByID(ConstantData.ActionTriggerType.POLYLADJ, n);
              if (d) {
                var D = d.GetPos()
                  , g = [];
                g.push(new Point(this.polylist.segs[n - 1].pt.x, this.polylist.segs[n - 1].pt.y)),
                  g.push(D),
                  g.push(new Point(this.polylist.segs[n].pt.x, this.polylist.segs[n].pt.y));
                o = T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(g[0], g[2]);
                Utils3.RotatePointsAboutPoint(g[1], -o, g);
                var h = new Point(g[1].x, g[1].y)
                  , m = d.GetGeometryBBox();
                h.x += m.width + 3,
                  g.push(h),
                  Utils3.RotatePointsAboutPoint(g[1], o, g),
                  p.x = g[3].x,
                  p.y = g[3].y
              }
          }
          (s = this.GenericKnob(p)).SetUserData({
            hitSegment: n,
            moveAngle: 9999
          }),
            s && s.SetURL && (s.SetURL(ConstantData.Constants.FilePath_ImageKnobs + ConstantData.Constants.Knob_ExpandVert),
              s.ExcludeFromExport(!0)),
            0 != (o = Utils1.CalcAngleFromPoints(this.polylist.segs[n - 1].pt, this.polylist.segs[n].pt)) && (c ? (o >= 45 && o <= 135 || o >= 235 && o < 315) && s && s.SetURL
              && s.SetURL(ConstantData.Constants.FilePath_ImageKnobs + ConstantData.Constants.Knob_ExpandHoriz) : s.SetRotation(o)),
            l.AddElement(s)
        }
      return l
    }
  }

  PostCreateShapeCallback(e, t, a, r) {

    // ListManager.PolyLine.prototype.PostCreateShapeCallback.call(this, e, t, a)
    super.PostCreateShapeCallback(e, t, a);
  }

  UpdateSVG(e, t) {
    "use strict";
    var a, r = e.PathCreator();
    for (r.BeginPath(),
      t.length > 1 && r.MoveTo(t[0].x, t[0].y),
      a = 1; a < t.length; a++)
      r.LineTo(t[a].x, t[a].y);
    this.polylist.closed && r.ClosePath(),
      r.Apply()
  }

  MostlyContains(e) {
    "use strict";
    var t, a = 0, r = !1, i = {}, n = e.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1);
    if (T3Gv.optManager.ActiveVisibleZList().indexOf(e.BlockID) < 0)
      return !1;
    0 !== e.RotationAngle && (a = -e.RotationAngle / (180 / ConstantData.Geometry.PI),
      Utils3.RotatePointsAboutCenter(e.Frame, a, n));
    var o = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1)
      , s = n.length;
    for (t = 0; t < s; t++)
      if (T3Gv.optManager.PolyPtInPolygon(o, n[t])) {
        r = !0;
        break
      }
    if (!r)
      return !1;
    if (Utils2.GetPolyRect(i, n),
      !i)
      return !1;
    0 === i.width && (i.width = 1),
      0 === i.height && (i.height = 1);
    var l = Utils2.IntersectRect(this.Frame, i);
    return !!l && l.width * l.height > i.width * i.height * .75
  }

  InterceptMoveOperation(e) {
    "use strict";
    var t, a = [], r = T3Gv.optManager.ZList(), i = 0, n = !1;
    try {
      var o = T3Gv.optManager.svgObjectLayer.FindElementByDOMElement(e.currentTarget);
      if (!o)
        return !1;
      var s = o.GetTargetForEvent(e).GetID()
        , l = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
      if (s === ConstantData.SVGElementClass.DIMENSIONTEXT)
        return !0;
      if (-1 === this.PolyHitSeg(l) && (n = !0),
        n) {
        for (T3Gv.optManager.ClearSelectionClick(),
          a.push(this.BlockID),
          i = 0; i < r.length; i++)
          if (t = T3Gv.optManager.GetObjectPtr(r[i], !1)) {
            if (this.BlockID === t.BlockID)
              continue;
            if (t.hooks.length)
              continue;
            this.MostlyContains(t) && a.push(t.BlockID)
          }
        return T3Gv.optManager.SelectObjects(a, !1, !1),
          T3Gv.optManager.postMoveSelectId = this.BlockID,
          T3Gv.optManager.HideAllSVGSelectionStates(),
          !1
      }
      return !1
    } catch (e) {
      this.LM_ActionClick_ExceptionCleanup(e);
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
    return !0
  }

  SetupInterceptMove(e) {
    "use strict";
    var t;
    T3Gv.optManager.eventTimestamp = Date.now(),
      e.stopPropagation();
    var a = T3Gv.optManager.svgObjectLayer.FindElementByDOMElement(e.currentTarget);
    if (null === a)
      return !1;
    var r = a.ID;
    T3Gv.optManager.actionStoredObjectId = r;
    T3Gv.objectStore.PreserveBlock(r);
    var i = ConstantData.ActionTriggerType.MOVEPOLYSEG;
    T3Gv.optManager.actionTriggerId = i,
      this.LM_ActionPreTrack(r, i),
      T3Gv.optManager.actionSvgObject = a;
    var n = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
    n = T3Gv.optManager.DoAutoGrowDrag(n),
      t = new HitResult(-1, 0, null),
      this.Hit(n, !1, !1, t),
      T3Gv.optManager.actionTriggerData = {
        hitSegment: t.segment + 1,
        moveAngle: 9999
      };
    var o = n.x
      , s = n.y
      , l = this.GetSVGFrame();
    return T3Gv.optManager.actionBBox = $.extend(!0, {}, l),
      T3Gv.optManager.actionNewBBox = $.extend(!0, {}, l),
      T3Gv.optManager.HideAllSVGSelectionStates(),
      T3Gv.optManager.actionStartX = o,
      T3Gv.optManager.actionStartY = s,
      t = new HitResult(-1, 0, null),
      this.Hit(n, !1, !1, t),
      !0
  }

  Inflate(e, t, a) {
    var r, i, n, o = {}, s = Utils1.DeepCopy(e), l = [];
    function S(e, t, a) {
      var r, i;
      return r = e[a].x - e[t].x,
        i = e[a].y - e[t].y,
        Utils2.sqrt(r * r + i * i)
    }
    function c(e, t, a) {
      var r;
      for (r = t + 1; r < e.length; r++)
        if (S(e, t, r) > 1e-5)
          return r;
      return a && t === e.length - 1 && S(e, t, 1) > 1e-5 ? 1 : -1
    }
    function u(e, t) {
      var a;
      for (a = t - 1; a >= 0; a--)
        if (S(e, t, a) > 1e-5)
          return a;
      return -1
    }
    function p(e, t, a, r) {
      var i, n, o = [];
      return (i = 360 - Utils1.CalcAngleFromPoints(t, a)) >= 360 && (i -= 360),
        n = 2 * Math.PI * (i / 360),
        o = [{
          x: t.x,
          y: t.y
        }, {
          x: a.x,
          y: a.y
        }],
        Utils3.RotatePointsAboutCenter(e, -n, o),
        o[0].y += r,
        o[1].y += r,
        Utils3.RotatePointsAboutCenter(e, n, o),
        o
    }
    function d(e, t) {
      var a, r, i, n = [], o = {
        x: 0,
        y: 0
      };
      (a = 360 - Utils1.CalcAngleFromPoints(e[0], e[1])) >= 360 && (a -= 360),
        r = 2 * Math.PI * (a / 360),
        o.x = e[0].x + (e[1].x - e[0].x) / 2,
        o.y = e[0].y + (e[1].y - e[0].y) / 2,
        Utils3.RotatePointsAboutPoint(o, -r, n),
        i = Math.abs(t),
        e[0].x < e[1].x ? (e[0].x -= i,
          e[1].x += i) : (e[0].x += i,
            e[1].x -= i),
        Utils3.RotatePointsAboutPoint(o, r, n)
    }
    function D(e, t, a, r) {
      var i;
      return i = 360 - Utils1.CalcAngleFromPoints(e[a], e[t]),
        360 - Utils1.CalcAngleFromPoints(e[a], e[r]) - i
    }
    for (Utils2.GetPolyRect(o, e),
      r = 0; r < e.length; r++) {
      var g = []
        , h = []
        , m = [];
      if ((i = u(s, r)) >= 0 && (h = p(o, s[i], s[r], t)),
        (n = c(s, r, a)) >= 0 && (m = p(o, s[r], s[n], t)),
        i >= 0 && n >= 0) {
        var C = D(s, i, r, n);
        if (C < 0 && (C += 360),
          C >= 30 && C <= 330) {
          var y = {
            x: 0,
            y: 0
          };
          T3Gv.optManager.GetIntersectPt(h[0], h[1], m[0], m[1], null, y) && g.push(new Point(y.x, y.y))
        } else {
          var f = [];
          d(f = Utils1.DeepCopy(h), t),
            g.push(new Point(f[1].x, f[1].y)),
            d(f = Utils1.DeepCopy(m), t),
            g.push(new Point(f[0].x, f[0].y))
        }
      }
      0 === g.length && (i >= 0 ? g.push(new Point(h[1].x, h[1].y)) : n >= 0 && g.push(new Point(m[0].x, m[0].y))),
        l = l.concat(g)
    }
    return a && l && l.length > 0 && (l[0] = l[l.length - 1]),
      l
  }

  InflatePolyLine(e, t, a) {
    var r = null;
    return r = this.Inflate(e, -t, a),
      Utils2.IsPointInPoly(e, r[1]) && (r = this.Inflate(e, t, a)),
      r
  }


  MovePolySeg(e, t, a, r, i) {
    "use strict";
    this.AdjustPolySeg(e, T3Gv.optManager.actionStartX, T3Gv.optManager.actionStartY, t, a, i, !1, 2, 1e3) && (this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
      this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !1),
      T3Gv.optManager.actionStartX = t,
      T3Gv.optManager.actionStartY = a)
  }

  AfterModifyShape(e, t) {
    var a = this;
    t === ConstantData.ActionTriggerType.MOVEPOLYSEG && function (e) {
      var t, r, i = T3Gv.optManager.actionTriggerData.moveAngle, n = a.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null), o = n.length, s = 0, l = -1, S = !1, c = a.StyleRecord.Line.Thickness;
      if (0 !== i) {
        i = 360 - i;
        var u = 2 * Math.PI * (i / 360);
        Utils3.RotatePointsAboutCenter(a.Frame, -u, n)
      }
      if (r = n[e].x,
        a.polylist.closed) {
        var p = !0;
        for (t = 0; t < o; t++)
          Utils2.IsEqual(n[t].x, r, c) || (p = !1);
        if (p)
          return
      }
      for (t = e + 1; t < o && Utils2.IsEqual(n[t].x, r, c); t++)
        s++;
      var d = !0;
      if (0 === s && 1 === e && Utils2.IsEqual(n[o - 1].x, r, c) && Utils2.IsEqual(n[o - 2].x, r, c) && (e = o - 2,
        s = 1,
        Utils2.IsEqual(n[0].y, n[o - 2].y, c) || (d = !1)),
        s > 0 && (d && a.polylist.segs.splice(e, s),
          S = !0,
          e + 1 + s >= o && 1 === s && a.polylist.closed && Utils2.IsEqual(n[0].x, r, c))) {
        a.polylist.segs.splice(0, 1);
        var D = a.polylist.segs[0].pt.x + a.StartPoint.x
          , g = a.polylist.segs[0].pt.y + a.StartPoint.y;
        a.polylist.segs[0].pt.x = 0,
          a.polylist.segs[0].pt.y = 0,
          a.AdjustLineStart(null, D, g, ConstantData.ActionTriggerType.LINESTART)
      }
      for (t = e - 2; t > 0 && Utils2.IsEqual(n[t].x, r, c); t--)
        l = t;
      if (!a.polylist.closed && e === o - 1 && 3 === o && l < 0 && Utils2.IsEqual(n[0].x, r, c) && (l = 0),
        a.polylist.closed && 1 === l ? Utils2.IsEqual(n[0].x, r, c) && (l = 0) : 1 === l && a.polylist.segs.length > 2 && Utils2.IsEqual(n[0].x, r, c) && (l = 0),
        l >= 0 && (a.polylist.segs.splice(l + 1, e - 1 - l),
          S = !0),
        a.polylist.closed && 0 === s && l < 0 && (e === o - 1 || e <= 2)) {
        r = n[2].x;
        var h = !0;
        2 !== e || Utils2.IsEqual(n[1].y, n[0].y, c) || (h = !1),
          Utils2.IsEqual(n[1].x, r, c) && Utils2.IsEqual(n[0].x, r, c) && h ? (a.polylist.segs.splice(0, 2),
            S = !0,
            o -= 2,
            D = a.polylist.segs[0].pt.x + a.StartPoint.x,
            g = a.polylist.segs[0].pt.y + a.StartPoint.y,
            a.polylist.segs[0].pt.x = 0,
            a.polylist.segs[0].pt.y = 0,
            a.AdjustLineStart(null, D, g, ConstantData.ActionTriggerType.LINESTART)) : e === o - 1 ? (r = n[e].x,
              Utils2.IsEqual(n[1].x, r, c) && Utils2.IsEqual(n[0].x, r, c) && (a.polylist.segs.splice(0, 1),
                S = !0,
                o -= 1,
                D = a.polylist.segs[0].pt.x + a.StartPoint.x,
                g = a.polylist.segs[0].pt.y + a.StartPoint.y,
                a.polylist.segs[0].pt.x = 0,
                a.polylist.segs[0].pt.y = 0,
                a.AdjustLineStart(null, D, g, ConstantData.ActionTriggerType.LINESTART))) : 2 === e && Utils2.IsEqual(n[1].x, r, c) && Utils2.IsEqual(n[0].x, r, c) && (a.polylist.segs.splice(1, 1),
                  S = !0)
      }
      S && T3Gv.optManager.AddToDirtyList(a.BlockID)
    }(T3Gv.optManager.actionTriggerData.hitSegment);
    // ListManager.BaseLine.prototype.AfterModifyShape.call(this, e, t)
    // Double === TODO
    // super.AfterModifyShape(e, t);
    this.BaseLine_AfterModifyShape(e, t);
  }


  BaseLine_AfterModifyShape(e, t) {
    if (T3Gv.optManager.actionSvgObject) {
      var a = T3Gv.optManager.actionSvgObject.GetElementByID(ConstantData.Defines.EllipseAxes);
      null != a &&
        T3Gv.optManager.actionSvgObject.RemoveElement(a)
    }
    T3Gv.optManager.ob.Frame &&
      (
        T3Gv.optManager.MaintainLink(e, this, T3Gv.optManager.ob, t),
        T3Gv.optManager.ob = {}
      ),
      this.rflags &&
      (
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !1
        )
      ),
      T3Gv.optManager.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
      T3Gv.optManager.UpdateLinks(),
      this.arcobj &&
      (this.arcobj = null)
  }


  UpdateDimensionFromText(e, t, a) {
    "use strict";
    var r, i, n, o, s, l, S, c, u, p, d, D = 0, g = {
      hitSegment: 0,
      moveAngle: 0
    }, h = [], m = 0, C = 0, y = 0, f = {}, L = 0, I = 0, T = !1, b = -1;
    if (a.hookedObjectInfo)
      return this.UpdateDimensionsFromTextForHookedObject(e, t, a);
    if (a.angleChange)
      return this.UpdateLineAngleDimensionFromText(e, t, a);
    if (d = a.segment,
      c = T3Gv.optManager.ob = Utils1.DeepCopy(this),
      T3Gv.optManager.GetObjectPtr(this.BlockID, !0),
      T3Gv.optManager.ShowSVGSelectionState(this.BlockID, !1),
      (r = this.GetDimensionValueFromString(t, d)) >= 0 && (D = this.GetDimensionLengthFromValue(r)),
      D <= 0 || r < 0)
      return T3Gv.optManager.AddToDirtyList(this.BlockID),
        void T3Gv.optManager.RenderDirtySVGObjects();
    for (g.hitSegment = d + 1,
      g.hitSegment >= this.polylist.segs.length && (this.polylist.closed ? g.hitSegment = 1 : (g.hitSegment = d,
        T = !0)),
      this.polylist.closed || 1 != d && d != this.polylist.segs.length - 1 || (g.hitSegment = d,
        T = !0),
      g.moveAngle = this.GetSegmentAdjustAngle(g.hitSegment),
      n = 360 - g.moveAngle,
      o = 2 * Math.PI * (n / 360),
      i = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null),
      h = this.polylist.closed &&
        // this instanceof ListManager.PolyLineContainer
        this instanceof PolyLineContainer
        ? T3Gv.optManager.InflateLine(i, this.StyleRecord.Line.BThick, this.polylist.closed, this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior) : Utils1.DeepCopy(i),
      p = 0; p < h.length; p++)
      h[p].x += this.Frame.x,
        h[p].y += this.Frame.y;
    if (s = h[d].x,
      l = h[d].y,
      Utils3.RotatePointsAboutCenter(this.Frame, -o, h),
      S = Math.abs(h[d].y - h[d - 1].y),
      Math.abs(D) <= S || T)
      return this.Dimensions & ConstantData.DimensionFlags.SED_DF_AllSeg || (b = this.Dimensions,
        this.Dimensions = Utils2.SetFlag(this.Dimensions, ConstantData.DimensionFlags.SED_DF_AllSeg, !0),
        this.Dimensions = Utils2.SetFlag(this.Dimensions, ConstantData.DimensionFlags.SED_DF_Total, !1),
        this.Dimensions = Utils2.SetFlag(this.Dimensions, ConstantData.DimensionFlags.SED_DF_EndPts, !1)),
        // ListManager.PolyLine.prototype.UpdateDimensionFromText.call(this, e, t, a),
        // Double === TODO
        super.UpdateDimensionFromText(e, t, a),
        void (b > 0 && (this.Dimensions = Utils2.SetFlag(this.Dimensions, ConstantData.DimensionFlags.SED_DF_AllSeg, b & ConstantData.DimensionFlags.SED_DF_AllSeg),
          this.Dimensions = Utils2.SetFlag(this.Dimensions, ConstantData.DimensionFlags.SED_DF_Total, b & ConstantData.DimensionFlags.SED_DF_Total),
          this.Dimensions = Utils2.SetFlag(this.Dimensions, ConstantData.DimensionFlags.SED_DF_EndPts, b & ConstantData.DimensionFlags.SED_DF_EndPts)));
    for (y = 0 === S ? D : Math.sqrt(Math.pow(D, 2) - Math.pow(S, 2)),
      h[d].x > h[d - 1].x ? h[d].x = h[d - 1].x + y : h[d].x = h[d - 1].x - y,
      Utils3.RotatePointsAboutCenter(this.Frame, o, h),
      m = h[d].x,
      C = h[d].y,
      this.AdjustPolySeg(e, s, l, m, C, g, !0, 0),
      T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
      u = this.hooks.length,
      p = 0; p < u; p++)
      T3Gv.optManager.SetLinkFlag(this.hooks[p].objid, ConstantData.LinkFlags.SED_L_MOVE);
    T3Gv.optManager.ActionTriggerData = d,
      T3Gv.optManager.MaintainLink(this.BlockID, this, c, ConstantData.ActionTriggerType.POLYLNODE);
    var M = {
      wdDim: -1,
      htDim: -1
    };
    this.GetPolyRectangularInfo(M) ? d === M.wdDim || d === M.wdDim + 2 ? (this.rwd = r,
      this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !0)) : d !== M.htDim && d !== M.htDim + 2 || (this.rht = r,
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !0)) : (this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
          this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !1)),
      (this.Frame.x < 0 || this.Frame.y < 0) && ((f = this.Frame).x < 0 && (L = -f.x,
        f.x += L),
        f.y < 0 && (I = -f.y,
          (

            this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
            this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select

            // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always ||
            // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select

          ) && (I += ConstantData.Defines.DimensionDefaultStandoff),
          f.y += I),
        this.StartPoint.x += L,
        this.StartPoint.y += I,
        this.EndPoint.x += L,
        this.EndPoint.y += I,
        T3Gv.optManager.SetObjectFrame(this.BlockID, f)),
      this.UpdateDrawing(e),
      -1 != this.DataID && this.LM_ResizeSVGTextObject(e, this, this.Frame)
  }



  GetDimensionsForDisplay() {
    "use strict";
    if (this.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL)
      // return ListManager.BaseLine.prototype.GetDimensions.call(this);

      // Double ===
      return this.BaseLine_GetDimensions();

    var e = this.GetDimensionPoints()
      , t = {};
    return Utils2.GetPolyRect(t, e),
    {
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height
    }
  }

  BaseLine_GetDimensions() {
    var e,
      t,
      a,
      r = {};
    return e = this.EndPoint.x - this.StartPoint.x,
      t = this.EndPoint.y - this.StartPoint.y,
      a = Utils2.sqrt(e * e + t * t),
      r.x = a,
      r.y = 0,
      r
  }



  CanSnapToShapes(e) {
    "use strict";
    return e && !this.polylist.closed ? (e.distanceonly = ConstantData.Guide_DistanceTypes.PolyWall,
      this.BlockID) : this.BlockID
  }

  IsSnapTarget() {
    "use strict";
    return !1
  }

  Guide_DistanceOnly() {
    "use strict";
    return this.polylist.closed ? ConstantData.Guide_DistanceTypes.Room : ConstantData.Guide_DistanceTypes.PolyWall
  }

  SetCursors() {
    var e, t = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    T3Gv.optManager.currentModalOperation === ListManager.ModalOperations.SPLITWALL &&
      this.polylist && this.polylist.segs.length >= 3 ||
      T3Gv.optManager.currentModalOperation === ListManager.ModalOperations.ADDCORNER ?
      (e = t.GetElementByID(ConstantData.SVGElementClass.SLOP)) &&
      e.SetCursor(SDGraphics.Element.CursorType.CROSSHAIR) :

      // Double === TODO need to check
      // ListManager.BaseShape.prototype.SetCursors.call(this)
      // new BaseShape(this).SetCursors()
      // super.SetCursors()
      // new BaseShape(this).SetCursors()
      // super.SetCursors()
      this.BaseShape_SetCursors()
  }

  BaseShape_SetCursors() {
    var e,
      t,
      a = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID),
      r = (this.TextFlags & ConstantData.TextFlags.SED_TF_OneClick) > 0;
    switch (T3Gv.optManager.GetEditMode()) {
      case ConstantData.EditState.DEFAULT:
        var i = T3Gv.optManager.Table_GetActiveID(),
          n = this.GetTable(!1);
        n &&
          (r || this.BlockID === i) ? T3Gv.optManager.Table_SetCursors(a, this, n, !1) : (
          n &&
          T3Gv.optManager.Table_SetCursors(a, this, n, !0),
          // ListManager.BaseDrawingObject.prototype.SetCursors.call(this),
          // Double === TODO
          // super.SetCursors(),
          this.BaseDrawingObject_SetCursors(),
          r &&
          (
            (t = a.GetElementByID(ConstantData.SVGElementClass.SHAPE)) &&
            t.SetCursor(Element.CursorType.TEXT),
            e = a.GetElementByID(ConstantData.SVGElementClass.SLOP)
          )
        );
        break;
      case ConstantData.EditState.FORMATPAINT:
        (t = a.GetElementByID(ConstantData.SVGElementClass.SHAPE)) &&
          t.SetCursor(Element.CursorType.PAINT),
          (e = a.GetElementByID(ConstantData.SVGElementClass.SLOP)) &&
          e.SetCursor(Element.CursorType.PAINT);
        break;
      default:
        // ListManager.BaseDrawingObject.prototype.SetCursors.call(this)
        // Double === TODO
        // super.SetCursors()
        this.BaseDrawingObject_SetCursors()
    }
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

  GetListOfEnclosedObjects(e, t) {
    "use strict";
    var a, r, i = T3Gv.optManager.ActiveVisibleZList(), n = [];
    if (!this.polylist.closed)
      return n;
    this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !0, null);
    for (a = 0; a < i.length; a++)
      r = T3Gv.optManager.GetObjectPtr(i[a], !1),
        this.BlockID !== r.BlockID && (!t && r.hooks.length || (this.MostlyContains(r) || t && 1 === r.hooks.length && r.hooks[0].objid === this.BlockID) && n.push(r.BlockID));
    return n
  }

  AfterRotateShape(e) {
    "use strict";
    var t = T3Gv.optManager.rotateEndRotation;
    this.RotateAllInContainer(e, t),
      this.rflags && (this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !1)),
      T3Gv.optManager.AddToDirtyList(e),
      T3Gv.optManager.RenderDirtySVGObjects()
  }

  RotateAllInContainer(e, t) {
    "use strict";
    T3Gv.optManager.ActiveVisibleZList();
    var a, r, i, n, o = [];
    T3Gv.objectStore.PreserveBlock(T3Gv.optManager.theSelectedListBlockID);
    var s = T3Gv.objectStore.GetObject(T3Gv.optManager.theSelectedListBlockID)
      , l = s.Data;
    if (n = Utils1.DeepCopy(l),
      T3Gv.optManager.ClearSelectionClick(),
      (o = this.GetListOfEnclosedObjects(!1, !0)).push(this.BlockID),
      o.length <= 1) {
      var S = T3Gv.optManager.rotateStartRotation
        , c = T3Gv.optManager.rotateEndRotation;
      return T3Gv.optManager.ob = Utils1.DeepCopy(this),
        T3Gv.optManager.rotateStartRotation = 0,
        T3Gv.optManager.rotateEndRotation = t,
        T3Gv.optManager.rotateStartPoint.x = this.RotateKnobPt.x,
        T3Gv.optManager.rotateStartPoint.y = this.RotateKnobPt.y,
        T3Gv.optManager.rotatePivotX = this.Frame.x + this.Frame.width / 2,
        T3Gv.optManager.rotatePivotY = this.Frame.y + this.Frame.height / 2,
        // ListManager.PolyLine.prototype.AfterRotateShape.call(this, e),
        // Double === TODO
        super.AfterRotateShape(e),
        T3Gv.optManager.rotateStartRotation = S,
        T3Gv.optManager.rotateEndRotation = c,
        T3Gv.optManager.SelectObjects(o, !1, !1),
        T3Gv.optManager.ob = {},
        o
    }
    T3Gv.optManager.SelectObjects(o, !1, !1);
    var u = T3Gv.optManager.GroupSelectedShapes(!0, null, !1, !1, !1);
    (l = (s = T3Gv.objectStore.GetObject(T3Gv.optManager.theSelectedListBlockID)).Data).length;
    return a = T3Gv.optManager.GetObjectPtr(u, !0),
      T3Gv.optManager.svgObjectLayer.GetElementByID(a.BlockID).SetRotation(t),
      a.RotationAngle = t,
      T3Gv.optManager.UngroupShape(a.BlockID, !0),
      i = o.pop(),
      T3Gv.optManager.SelectObjects(n, !1, !1),
      (r = T3Gv.optManager.GetObjectPtr(i, !1)).UpdateFrame(),
      r && (r.r.x < 0 || r.r.y < 0) && (T3Gv.optManager.Undo(),
        Collab.UnLockMessages(),
        Collab.UnBlockMessages()),
      o
  }

  GetPointsForAreaDimension() {
    "use strict";
    var e = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null);
    return this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior ? T3Gv.optManager.InflateLine(e, this.StyleRecord.Line.BThick, this.polylist.closed, !0) : T3Gv.optManager.InflateLine(e, this.StyleRecord.Line.BThick, this.polylist.closed, !1)
  }

  GetDimensionPoints() {
    "use strict";
    var e, t = [], a = [], r = [], i = 0, n = 0, o = 0, s = 0, l = {}, S = {};
    if (!this.polylist.closed && this.Dimensions & ConstantData.DimensionFlags.SED_DF_EndPts)
      t.push(new Point(this.StartPoint.x - this.Frame.x, this.StartPoint.y - this.Frame.y)),
        t.push(new Point(this.EndPoint.x - this.Frame.x, this.EndPoint.y - this.Frame.y));
    else if (!this.polylist.closed && this.Dimensions & ConstantData.DimensionFlags.SED_DF_Total) {
      for (a = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null),
        i = 1; i < a.length; i++)
        o = Math.abs(a[i - 1].x - a[i].x),
          s = Math.abs(a[i - 1].y - a[i].y),
          n += Math.sqrt(o * o + s * s);
      var c = {
        x: this.Frame.width / 2,
        y: this.Frame.height / 2
      };
      l.x = c.x - n / 2,
        l.y = c.y,
        t.push(new Point(l.x, l.y)),
        S.x = c.x + n / 2,
        S.y = c.y,
        t.push(new Point(S.x, S.y)),
        e = T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(new Point(0, 0), new Point(this.Frame.width, this.Frame.height)),
        Utils3.RotatePointsAboutPoint(c, e, t)
    } else
      r = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null),
        t = this.polylist.closed ? T3Gv.optManager.InflateLine(r, this.StyleRecord.Line.BThick, this.polylist.closed, this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior) : Utils1.DeepCopy(r);
    return t
  }

  CustomSnap(e, t, a, r, i, n) {
    "use strict";
    var o, s, l, S, c, u, p, d, D, g, h, m = null, C = 32768, y = 32768, f = 32768, L = 32768, I = -1, T = T3Gv.optManager.ZList(), b = [], M = {};
    for (b = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null),
      o = 0; o < b.length; o++)
      b[o].x += e,
        b[o].y += t;
    if (i) {
      var P = {};
      Utils3.LineDStyleHit(b, {
        x: n.x + a,
        y: n.y + r
      }, this.StyleRecord.Line.Thickness, 0, P) && P.lpHit >= 0 && (I = P.lpHit)
    }
    for (o = 0; o < b.length; o++)
      b[o].x += a,
        b[o].y += r;
    for (Utils2.GetPolyRect(M, b),
      o = 0; o < T.length; o++)
      if (T[o] !== this.BlockID) {
        if (T3Gv.optManager.moveList && T3Gv.optManager.moveList.length) {
          var R = !1;
          for (s = 0; s < T3Gv.optManager.moveList.length; s++)
            if (T3Gv.optManager.moveList[s] === T[o]) {
              R = !0;
              break
            }
          if (R)
            continue
        }
        if ((m = T3Gv.optManager.GetObjectPtr(T[o], !1))
          // instanceof ListManager.PolyLineContainer)
          instanceof PolyLineContainer)
          for (I >= 0 ? (l = I,
            S = I) : (l = 1,
              S = b.length),
            s = l; s < S; s++) {
            var A = new HitResult(-1, 0, null)
              , _ = {
                x: b[s - 1].x,
                y: b[s - 1].y
              };
            if (A.hitcode = m.Hit(_, !1, !1, A),
              A.hitcode || (_ = {
                x: b[s].x,
                y: b[s].y
              },
                A.hitcode = m.Hit(_, !1, !1, A)),
              A.hitcode) {
              var E = A.segment + 1;
              if (c = b,
                u = s,
                p = m.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
                d = E,
                D = void 0,
                g = void 0,
                h = void 0,
                D = Utils1.CalcAngleFromPoints(c[u - 1], c[u]),
                g = Utils1.CalcAngleFromPoints(p[d - 1], p[d]),
                D += h = 90 - D,
                (g += h) >= 360 && (g -= 360),
                g < 0 && (g += 360),
                Math.abs(90 - g) <= 1 || Math.abs(270 - g) <= 1) {
                var w = {
                  x: _.x,
                  y: _.y
                };
                m.SnapPointToSegment(E, w),
                  C = w.x - _.x,
                  y = w.y - _.y;
                var F = T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(b[s - 1], b[s]);
                (F = F / (2 * Math.PI) * 360) > 180 && (F -= 180),
                  F % 90 < 1 || F % 90 > 89 ? F >= 89 && F <= 91 ? Math.abs(C) > .02 && (Math.min(Math.abs(f), Math.abs(C)) === Math.abs(C) && (f = C),
                    y = 32768,
                    Math.abs(m.Frame.y - M.y) < 10 ? y = m.Frame.y - M.y : Math.abs(m.Frame.y - (M.y + M.height)) < 10 ? y = m.Frame.y - (M.y + M.height) : Math.abs(m.Frame.y + m.Frame.height - M.y) < 10 ? y = m.Frame.y + m.Frame.height - M.y : Math.abs(m.Frame.y + m.Frame.height - (M.y + M.height)) < 10 && (y = m.Frame.y + m.Frame.height - (M.y + M.height)),
                    Math.min(Math.abs(L), Math.abs(y)) === Math.abs(y) && (L = y)) : Math.abs(y) > .02 && (Math.min(Math.abs(L), Math.abs(y)) === Math.abs(y) && (L = y),
                      C = 32768,
                      Math.abs(m.Frame.x - M.x) < 10 ? C = m.Frame.x - M.x : Math.abs(m.Frame.x - (M.x + M.width)) < 10 ? C = m.Frame.x - (M.x + M.width) : Math.abs(m.Frame.x + m.Frame.width - M.x) < 10 ? C = m.Frame.x + m.Frame.width - M.x : Math.abs(m.Frame.x + m.Frame.width - (M.x + M.width)) < 10 && (C = m.Frame.x + m.Frame.width - (M.x + M.width)),
                      Math.min(Math.abs(f), Math.abs(C)) === Math.abs(C) && (f = C)) : (Math.abs(C) > .02 || Math.abs(y) > .02) && (Math.min(Math.abs(f), Math.abs(C)) === Math.abs(C) && (f = C),
                        Math.min(Math.abs(L), Math.abs(y)) === Math.abs(y) && (L = y))
              }
            }
          }
      }
    return (32768 !== f || 32768 !== L) && (f < 32768 && (n.x += f),
      L < 32768 && (n.y += L),
      !0)
  }

  CanUseRFlags() {
    return this.GetPolyRectangularInfo(null)
  }

  SetSize(e, t, a) {
    "use strict";
    return null !== e ? null === t && 1 === Math.abs(e - this.Frame.width) && !0 : null !== t && null === e && 1 === Math.abs(t - this.Frame.height) && !0,
      this.rflags && (this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !1)),
      // ListManager.PolyLine.prototype.SetSize.call(this, e, t, a)
      // Double === TODO
      super.SetSize(e, t, a)
  }

  AdjustDimensionLength(e) {
    var t;
    return this.polylist && this.polylist.closed && null != this.GetPolyRectangularInfo(null) && (t = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior ? -this.StyleRecord.Line.Thickness : this.StyleRecord.Line.Thickness,
      null != e && (e += t)),
      e
  }

  GetDimensionsForDisplay() {
    var e = {};
    return e.width = this.Frame.width,
      e.height = this.Frame.height,
      e.x = this.Frame.x,
      e.y = this.Frame.y,
      this.polylist && this.polylist.closed && (this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior ? (e.x -= this.StyleRecord.Line.Thickness / 2,
        e.y -= this.StyleRecord.Line.Thickness / 2,
        e.width += this.StyleRecord.Line.Thickness,
        e.height += this.StyleRecord.Line.Thickness) : (e.x += this.StyleRecord.Line.Thickness / 2,
          e.y += this.StyleRecord.Line.Thickness / 2,
          e.width -= this.StyleRecord.Line.Thickness,
          e.height -= this.StyleRecord.Line.Thickness)),
      e
  }

  GetSnapRect() {
    "use strict";
    return this.GetDimensionsForDisplay()
  }

  GetDragR() {
    var e = {};
    if (Utils2.CopyRect(e, this.r),
      this.polylist && this.polylist.closed && this.StyleRecord && this.StyleRecord.Line) {
      var t = this.StyleRecord.Line.BThick;
      Utils2.InflateRect(e, 2 * t, 2 * t)
    }
    return e
  }

  SetShapeOrigin(e, t, a, r) {
    var i = this.GetSVGFrame()
      , n = 0
      , o = 0;
    this.polylist && this.polylist.closed && r && (this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior ? (i.x -= this.StyleRecord.Line.Thickness / 2,
      i.y -= this.StyleRecord.Line.Thickness / 2,
      i.width += this.StyleRecord.Line.Thickness,
      i.height += this.StyleRecord.Line.Thickness) : (i.x += this.StyleRecord.Line.Thickness / 2,
        i.y += this.StyleRecord.Line.Thickness / 2,
        i.width -= this.StyleRecord.Line.Thickness,
        i.height -= this.StyleRecord.Line.Thickness)),
      null != e && (n = i.x - e),
      null != t && (o = i.y - t),
      this.StartPoint.x -= n,
      this.StartPoint.y -= o,
      this.EndPoint.x -= n,
      this.EndPoint.y -= o,
      this.CalcFrame()
  }

  MaintainDimensionThroughPolygonOpennessChange(e) {
    "use strict";
    var t, a = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1), r = !1;
    e && (this.Dimensions = Utils2.SetFlag(this.Dimensions, ConstantData.DimensionFlags.SED_DF_Total | ConstantData.DimensionFlags.SED_DF_EndPts, !1),
      this.Dimensions = Utils2.SetFlag(this.Dimensions, ConstantData.DimensionFlags.SED_DF_AllSeg, !0)),
      r = e ? !(this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior) : this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior;
    var i;
    if ((i = T3Gv.optManager.InflateLine(a, this.StyleRecord.Line.Thickness / 2, !0, r)) && i.length === this.polylist.segs.length)
      for (this.StartPoint.x = i[0].x,
        this.StartPoint.y = i[0].y,
        this.EndPoint.x = i[i.length - 1].x,
        this.EndPoint.y = i[i.length - 1].y,
        t = 0; t < this.polylist.segs.length; t++)
        this.polylist.segs[t].pt.x = i[t].x - this.StartPoint.x,
          this.polylist.segs[t].pt.y = i[t].y - this.StartPoint.y
  }

  ChangeLineThickness(e) {
    "use strict";
    var t, a, r, i, n, o = [], s = [], l = this.StyleRecord.Line.Thickness;
    if (this.UpdateFrame(null),
      n = (l - e) / 2,
      (i = this).StyleRecord.Line.BThick && i.polylist && i.polylist.closed && i.polylist.segs && i.polylist.segs.length) {
      // if (i instanceof ListManager.Polygon) {
      // if (i instanceof GlobalDataShape.Polygon) {
      if (i instanceof Instance.Shape.Polygon) {
        var S = {};
        S.Frame = i.Frame,
          (a = new ListManager.PolyLine(S)).polylist = i.polylist,
          a.StartPoint = i.StartPoint,
          a.EndPoint = i.EndPoint
      } else
        a = i;
      if (r = a.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, s),
        s.length > 0)
        for (o.push(new Point(r[0].x, r[0].y)),
          t = 0; t < s.length; t++)
          o.push(new Point(r[s[t]].x, r[s[t]].y));
      else
        o = Utils1.DeepCopy(r);
      r = T3Gv.optManager.InflateLine(o, Math.abs(n), !0, n >= 0),
        i.StartPoint.x = r[0].x,
        i.StartPoint.y = r[0].y,
        i.EndPoint.x = r[r.length - 1].x,
        i.EndPoint.y = r[r.length - 1].y;
      var c = Utils1.DeepCopy(i.polylist.segs);
      for (i.polylist.segs = [],
        t = 0; t < r.length; t++)
        i.polylist.segs.push(new PolySeg(1, r[t].x - i.StartPoint.x, r[t].y - i.StartPoint.y)),
          t < c.length && (i.polylist.segs[t].LineType = c[t].LineType,
            i.polylist.segs[t].ShortRef = c[t].ShortRef,
            i.polylist.segs[t].dataclass = c[t].dataclass,
            i.polylist.segs[t].dimDeflection = c[t].dimDeflection,
            i.polylist.segs[t].flags = c[t].flags,
            i.polylist.segs[t].param = c[t].param,
            i.polylist.segs[t].weight = c[t].weight);
      // if (i instanceof ListManager.BaseLine)
      // if (i instanceof GlobalDataShape.BaseLine)
      if (i instanceof Instance.Shape.BaseLine)
        i.CalcFrame();
      // else if (i instanceof ListManager.Polygon) {
      // else if (i instanceof GlobalDataShape.Polygon) {
      else if (i instanceof Instance.Shape.Polygon) {
        l = i.StyleRecord.Line.BThick;
        var u = i.Frame.width / (i.Frame.width + 2 * l)
          , p = i.Frame.height / (i.Frame.height + 2 * l)
          , d = i.Frame.x * u - i.Frame.x + l
          , D = i.Frame.y * p - i.Frame.y + l;
        i.ScaleObject(d, D, null, 0, u, p, !1)
      }
    }
    this.UpdateFrame(null)
  }

  ChangeLineThickness(e) {
    "use strict";
    var t, a, r, i, n, o = [], s = [], l = this.StyleRecord.Line.Thickness;
    if (this.UpdateFrame(null),
      n = (l - e) / 2,
      (i = this).StyleRecord.Line.BThick && i.polylist && i.polylist.closed && i.polylist.segs && i.polylist.segs.length) {
      // if (i instanceof ListManager.Polygon) {
      // if (i instanceof GlobalDataShape.Polygon) {
      if (i instanceof Instance.Shape.Polygon) {
        var S = {};
        S.Frame = i.Frame,
          (a = new ListManager.PolyLine(S)).polylist = i.polylist,
          a.StartPoint = i.StartPoint,
          a.EndPoint = i.EndPoint
      } else
        a = i;
      if (r = a.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, s),
        s.length > 0)
        for (o.push(new Point(r[0].x, r[0].y)),
          t = 0; t < s.length; t++)
          o.push(new Point(r[s[t]].x, r[s[t]].y));
      else
        o = Utils1.DeepCopy(r);
      r = T3Gv.optManager.InflateLine(o, Math.abs(n), !0, n >= 0),
        i.StartPoint.x = r[0].x,
        i.StartPoint.y = r[0].y,
        i.EndPoint.x = r[r.length - 1].x,
        i.EndPoint.y = r[r.length - 1].y;
      var c = Utils1.DeepCopy(i.polylist.segs);
      for (i.polylist.segs = [],
        t = 0; t < r.length; t++)
        i.polylist.segs.push(new PolySeg(1, r[t].x - i.StartPoint.x, r[t].y - i.StartPoint.y)),
          t < c.length && (i.polylist.segs[t].LineType = c[t].LineType,
            i.polylist.segs[t].ShortRef = c[t].ShortRef,
            i.polylist.segs[t].dataclass = c[t].dataclass,
            i.polylist.segs[t].dimDeflection = c[t].dimDeflection,
            i.polylist.segs[t].flags = c[t].flags,
            i.polylist.segs[t].param = c[t].param,
            i.polylist.segs[t].weight = c[t].weight);
      // if (i instanceof ListManager.BaseLine)
      // if (i instanceof GlobalDataShape.BaseLine)
      if (i instanceof Instance.Shape.BaseLine)
        i.CalcFrame();
      // else if (i instanceof ListManager.Polygon) {
      // else if (i instanceof GlobalDataShape.Polygon) {
      else if (i instanceof Instance.Shape.Polygon) {
        l = i.StyleRecord.Line.BThick;
        var u = i.Frame.width / (i.Frame.width + 2 * l)
          , p = i.Frame.height / (i.Frame.height + 2 * l)
          , d = i.Frame.x * u - i.Frame.x + l
          , D = i.Frame.y * p - i.Frame.y + l;
        i.ScaleObject(d, D, null, 0, u, p, !1)
      }
    }
    this.UpdateFrame(null)
  }
}

export default PolyLineContainer
