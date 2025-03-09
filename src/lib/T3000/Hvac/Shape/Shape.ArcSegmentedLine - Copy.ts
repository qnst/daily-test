




// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import T3Svg from '../../Hvac.SVG.t2';


import SegmentedLine from './S.SegmentedLine'
import ListManager from '../Data/ListManager';
// import Document from '../Basic/Basic.Document';
// import Utils from '../Helper/Helper.Utils';
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
// import Utils2 from "../Helper/Utils2";
// import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/T3Gv'
// import Collab from '../Data/Collab'
// import FileParser from '../Data/FileParser'
// import EvtUtil from "../Event/Event.Default";
// import Resources from '../Data/Resources'
// import Element from "../Basic/Basic.Element";

import Document from '../Basic/B.Document'

import Element from '../Basic/B.Element';
import ConstantData from '../Data/ConstantData'
import PolySeg from '../Model/PolySeg'

class ArcSegmentedLine extends SegmentedLine {





  // constructor(e) {
  //   //'use strict';
  //   (e = e || {
  //   }).LineType = e.LineType ||
  //     ListManager.LineType.ARCSEGLINE;
  //   var t = ListManager.SegmentedLine.apply(this, [
  //     e
  //   ]);
  //   if (t) return t
  // }



  constructor(e) {
    //'use strict';
    e = e || {};
    e.LineType = e.LineType || ConstantData.LineType.ARCSEGLINE;
    // const t = super(e);
    super(e);
    // if (t) return t;
  }


  // ListManager.ArcSegmentedLine.prototype = new ListManager.SegmentedLine,
  // ListManager.ArcSegmentedLine.prototype.constructor = ListManager.ArcSegmentedLine,
  CreateShape(e, t) {
    var a,
      r,
      i = [];
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    var n,
      o = e.CreateShape(ConstantData.CreateShapeType.SHAPECONTAINER),
      s = 0 === this.hoplist.nhops;
    s ? (
      a = e.CreateShape(ConstantData.CreateShapeType.PATH),
      r = e.CreateShape(ConstantData.CreateShapeType.PATH)
    ) : (
      a = e.CreateShape(ConstantData.CreateShapeType.POLYLINE),
      r = e.CreateShape(ConstantData.CreateShapeType.POLYLINE)
    ),
      a.SetID(ConstantData.SVGElementClass.SHAPE),
      r.SetID(ConstantData.SVGElementClass.SLOP),
      r.ExcludeFromExport(!0),
      this.CalcFrame();
    var l = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      S = this.StyleRecord,
      c = (
        (S = this.SVGTokenizerHook(S)).Fill.Paint.Color,
        S.Line.Paint.Color
      ),
      u = S.Line.Thickness,
      p = S.Line.Paint.Opacity,
      d = S.Line.LinePattern;
    S.Line.Thickness > 0 &&
      S.Line.Thickness < 1 &&
      (u = 1);
    var D = l.width,
      g = l.height;
    if (o.SetSize(D, g), o.SetPos(l.x, l.y), a.SetSize(D, g), s) i = ListManager.SegmentedLine.prototype.GetPolyPoints.call(this, ConstantData.Defines.NPOLYPTS, !0, !0, null),
      n = this.UpdateSVG(a, i);
    else {
      if (
        i = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0),
        0 !== this.hoplist.nhops
      ) {
        var h = T3Gv.optManager.InsertHops(this, i, i.length);
        i = i.slice(0, h.npts)
      }
      a.SetPoints(i)
    }
    return a.SetFillColor('none'),
      a.SetStrokeColor(c),
      a.SetStrokeOpacity(p),
      a.SetStrokeWidth(u),
      0 !== d &&
      a.SetStrokePattern(d),
      r.SetSize(D, g),
      s ? r.SetPath(n) : r.SetPoints(i),
      r.SetStrokeColor('white'),
      r.SetFillColor('none'),
      r.SetOpacity(0),
      t ? r.SetEventBehavior(Element.EventBehavior.HIDDEN_OUT) : r.SetEventBehavior(Element.EventBehavior.NONE),
      r.SetStrokeWidth(u + ConstantData.Defines.SED_Slop),
      o.AddElement(a),
      o.AddElement(r),
      this.ApplyStyles(a, S),
      this.ApplyEffects(o, !1, !0),
      o.isShape = !0,
      this.AddIcons(e, o),
      o
  }

  UpdateSVG(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u = e.PathCreator();
    u.BeginPath(),
      u.MoveTo(t[0].x, t[0].y),
      a = t[0].x,
      r = t[0].y;
    var p = t.length;
    2 === p &&
      u.LineTo(t[1].x, t[1].y);
    for (var d = 2; d < p; d++) S = a,
      c = r,
      t[d - 1].x === t[d].x ? (
        d < p - 1 ? (r = (t[d - 1].y + t[d].y) / 2, n = Math.abs(t[d - 1].y - t[d].y) / 2) : (n = Math.abs(r - t[d].y), r = t[d].y),
        i = Math.abs(a - t[d].x),
        l = r - c,
        o = !((s = (a = t[d].x) - S) >= 0 && l < 0 || s < 0 && l >= 0)
      ) : (
        d < p - 1 ? (i = Math.abs(t[d - 1].x - t[d].x) / 2, a = (t[d - 1].x + t[d].x) / 2) : (i = Math.abs(a - t[d].x), a = t[d].x),
        n = Math.abs(r - t[d].y),
        l = (r = t[d].y) - c,
        o = !((s = a - S) < 0 && l < 0 || s >= 0 && l >= 0)
      ),
      u.ArcTo(a, r, i, n, 0, o, !1, !1);
    var D = u.ToString();
    return e.SetPath(D),
      D
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
      D,
      g,
      h = [];
    if (
      n = ListManager.SegmentedLine.prototype.GetPolyPoints.call(this, ConstantData.Defines.NPOLYPTS, !0, !0, !1, null),
      c = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      0 === this.segl.firstdir &&
      0 === this.segl.lastdir &&
      (
        Utils2.IsEqual(c.height, 0) ||
        Utils2.IsEqual(c.width, 0)
      )
    ) {
      if (h = n, !t) for (s = h.length, o = 0; o < s; o++) h[o].x += c.x,
        h[o].y += c.y;
      return h
    }
    if (this.segl && this.segl.pts.length) {
      for (
        l = n[0].x,
        S = n[0].y,
        s = n.length,
        a &&
        h.push(new Point(l, S)),
        o = 2;
        o < s;
        o++
      ) u = l,
        p = S,
        n[o - 1].x === n[o].x ? (
          o < s - 1 ? (S = (n[o - 1].y + n[o].y) / 2, Math.abs(n[o - 1].y - n[o].y) / 2) : (Math.abs(S - n[o].y), S = n[o].y),
          Math.abs(l - n[o].x),
          D = S - p,
          g = !((d = (l = n[o].x) - u) >= 0 && D < 0 || d < 0 && D >= 0)
        ) : (
          o < s - 1 ? (Math.abs(n[o - 1].x - n[o].x), l = (n[o - 1].x + n[o].x) / 2) : (Math.abs(l - n[o].x), l = n[o].x),
          Math.abs(S - n[o].y),
          D = (S = n[o].y) - p,
          g = !((d = l - u) < 0 && D < 0 || d >= 0 && D >= 0)
        ),
        a ? (
          h.push(new Point(l, S)),
          h[h.length - 1].notclockwise = !g
        ) : T3Gv.optManager.EllipseToPoints(h, e / 2, u, l, p, S, g);
      if (!t) for (s = h.length, o = 0; o < s; o++) h[o].x += c.x,
        h[o].y += c.y
    } else h = ListManager.BaseLine.prototype.GetPolyPoints.call(this, e, t, !0, null);
    return h
  }

  GetTextOnLineParams(e) {
    if (3 !== this.segl.pts.length) return ListManager.SegmentedLine.prototype.GetTextOnLineParams.call(this, e);
    switch (this.TextAlign) {
      case ConstantData.TextAlign.TOPCENTER:
      case ConstantData.TextAlign.CENTER:
      case ConstantData.TextAlign.BOTTOMCENTER:
        var t = this.GetPolyPoints(22, !1, !1, !1, null),
          a = [],
          r = {
            Frame: new ListManager.Rect,
            StartPoint: new Point,
            EndPoint: new Point
          };
        r.Frame = Utils2.Pt2Rect(t[0], t[9]);
        var i = T3Gv.optManager.SD_GetClockwiseAngleBetween2PointsInRadians(t[0], t[9]);
        return a.push(new Point(t[0].x, t[0].y)),
          a.push(new Point(t[9].x, t[9].y)),
          a.push(new Point(t[7].x, t[7].y)),
          Utils3.RotatePointsAboutCenter(r.Frame, i, a),
          a[0].y = a[2].y,
          a[1].y = a[2].y,
          Utils3.RotatePointsAboutCenter(r.Frame, - i, a),
          r.StartPoint.x = a[0].x,
          r.StartPoint.y = a[0].y,
          r.EndPoint.x = a[1].x,
          r.EndPoint.y = a[1].y,
          r.CenterProp = 0.3,
          r;
      default:
        return ListManager.SegmentedLine.prototype.GetTextOnLineParams.call(this, e)
    }
  }

}

export default ArcSegmentedLine
