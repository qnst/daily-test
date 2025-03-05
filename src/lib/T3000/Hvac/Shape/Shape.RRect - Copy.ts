





// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import HvacSVG from '../../Hvac.SVG.t2';

import BaseShape from './Shape.BaseShape'
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/GlobalData'
import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
import EvtUtil from "../Event/EvtUtil";
import Resources from '../Data/Resources'
import ListManager from '../Data/ListManager';
// import Element from "../Basic/Basic.Element";
import Point from '../Model/Point'

import Document from '../Basic/Basic.Document'

import Element from '../Basic/Basic.Element';
import BaseDrawingObject from './Shape.BaseDrawingObject'
import $ from 'jquery'
import ConstantData from '../Data/ConstantData'




class RRect extends BaseShape {




  // constructor(e) {
  //   //'use strict';
  //   (e = e || {
  //   }).ShapeType = ConstantData.ShapeType.RRECT;
  //   var t = ListManager.BaseShape.apply(this, [
  //     e
  //   ]);
  //   if (t.dataclass = ConstantData.SDRShapeTypes.SED_S_RRect, t) return t
  // }




  constructor(e) {
    //'use strict';
    e = e || {};
    e.ShapeType = ConstantData.ShapeType.RRECT;
    // const t = ListManager.BaseShape.apply(this, [e]);
    super(e);
    // if (t) {
    this.dataclass = ConstantData.SDRShapeTypes.SED_S_RRect;
    // return t;
  }


  // ListManager.RRect.prototype = new ListManager.BaseShape,
  // ListManager.RRect.prototype.constructor = ListManager.RRect,


  GetCornerSize(e) {
    var t = this.Frame.width,
      a = this.Frame.height,
      r = t;
    if (
      a < r &&
      (r = a),
      e &&
      (r = e),
      this.moreflags & ConstantData.ObjMoreFlags.SED_MF_FixedRR
    ) {
      var i = ConstantData.Defines.RRectFixedDim * this.shapeparam,
        n = 0.4 * r;
      return i > n &&
        (i = n),
        i
    }
    return r * this.shapeparam
  }

  CreateShape(e, t) {
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    var a = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER),
      r = e.CreateShape(Document.CreateShapeType.RRECT);
    r.SetID(ConstantData.SVGElementClass.SHAPE);
    var i = $.extend(!0, {
    }, this.Frame),
      n = this.StyleRecord;
    n.Line.BThick &&
      Utils2.InflateRect(i, n.Line.BThick, n.Line.BThick);
    var o = (n = this.SVGTokenizerHook(n)).Line.Paint.Color,
      s = n.Line.Thickness,
      l = n.Line.LinePattern,
      S = i.width,
      c = i.height;
    this.shapeparam;
    a.SetSize(S, c),
      a.SetPos(i.x, i.y),
      r.SetSize(S, c);
    var u = this.GetCornerSize();
    r.SetRRectSize(S, c, u, u),
      r.SetStrokeColor(o),
      r.SetStrokeWidth(s),
      0 !== l &&
      r.SetStrokePattern(l),
      a.AddElement(r),
      this.ApplyStyles(r, n),
      this.ApplyEffects(a, !1, !1);
    var p = e.CreateShape(Document.CreateShapeType.RRECT);
    p.SetStrokeColor('white'),
      p.SetFillColor('none'),
      p.SetOpacity(0),
      p.SetStrokeWidth(s + ConstantData.Defines.SED_Slop),
      t ? p.SetEventBehavior(Element.EventBehavior.HIDDEN_OUT) : p.SetEventBehavior(Element.EventBehavior.NONE),
      p.SetID(ConstantData.SVGElementClass.SLOP),
      p.ExcludeFromExport(!0),
      p.SetRRectSize(S, c, u, u),
      a.AddElement(p);
    var d = n.Fill.Hatch;
    if (d && 0 !== d) {
      var D = e.CreateShape(Document.CreateShapeType.RRECT);
      D.SetID(ConstantData.SVGElementClass.HATCH),
        D.SetSize(S, c),
        D.SetRRectSize(S, c, u, u),
        D.SetStrokeWidth(0),
        this.SetFillHatch(D, d),
        a.AddElement(D)
    }
    a.isShape = !0;
    var g = this.GetTable(!1);
    return g &&
      GlobalData.optManager.LM_AddSVGTableObject(this, e, a, g),
      this.DataID >= 0 &&
      this.LM_AddSVGTextObject(e, a),
      a
  }

  Resize(e, t, a) {


    console.log('== track UpdateDimensionsLines Shape.RRect-> Resize')


    a.SetDimensionLinesVisibility(e, !1);
    var r = e.GetRotation(),
      i = $.extend(!0, {
      }, this.prevBBox),
      n = $.extend(!0, {
      }, t),
      o = $.extend(!0, {
      }, t),
      s = GlobalData.optManager.svgDoc.CalculateRotatedOffsetForResize(i, n, r);
    this.StyleRecord.Line.BThick &&
      null == this.polylist &&
      Utils2.InflateRect(o, this.StyleRecord.Line.BThick, this.StyleRecord.Line.BThick),
      e.SetSize(o.width, o.height),
      e.SetPos(o.x + s.x, o.y + s.y);
    var l = e.GetElementByID(ConstantData.SVGElementClass.SHAPE);
    l.SetSize(o.width, o.height);
    var S = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
    S &&
      S.SetSize(o.width, o.height);
    var c = e.GetElementByID(ConstantData.SVGElementClass.HATCH);
    c &&
      c.SetSize(t.width, t.height);
    this.shapeparam;
    var u = o.width;
    o.height < u &&
      (u = o.height);
    var p = this.GetCornerSize();
    return l.SetRRectSize(o.width, o.height, p, p),
      c &&
      c.SetRRectSize(o.width, o.height, p, p),
      S &&
      S.SetRRectSize(o.width, o.height, p, p),
      this.GetTable(!1) ? GlobalData.optManager.Table_ResizeSVGTableObject(e, a, t) : this.LM_ResizeSVGTextObject(e, a, t),
      e.SetRotation(r),
      this.UpdateDimensionLines(e),
      GlobalData.optManager.UpdateDisplayCoordinates(t, null, null, this),
      s
  }

  ResizeInTextEdit(e, t) {

    console.log('== track UpdateDimensionsLines Shape.RRect-> ResizeInTextEdit')


    var a = e.GetRotation();
    this.SetDimensionLinesVisibility(e, !1);
    var r = $.extend(!0, {
    }, this.Frame),
      i = $.extend(!0, {
      }, t),
      n = $.extend(!0, {
      }, t),
      o = GlobalData.optManager.svgDoc.CalculateRotatedOffsetForResize(r, i, a);
    this.StyleRecord.Line.BThick &&
      null == this.polylist &&
      Utils2.InflateRect(n, this.StyleRecord.Line.BThick, this.StyleRecord.Line.BThick),
      e.SetSize(n.width, n.height),
      e.SetPos(n.x + o.x, n.y + o.y);
    var s = e.GetElementByID(ConstantData.SVGElementClass.SHAPE);
    s &&
      s.SetSize(n.width, n.height);
    var l = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
    l &&
      l.SetSize(n.width, n.height),
      this.GetTable(!1) &&
      GlobalData.optManager.Table_ResizeSVGTableObject(e, this, t, !0);
    var S = e.GetElementByID(ConstantData.SVGElementClass.HATCH);
    S &&
      S.SetSize(n.width, n.height);
    this.shapeparam;
    var c = n.width;
    n.height < c &&
      (c = n.height);
    var u = this.GetCornerSize();
    return s &&
      s.SetRRectSize(n.width, n.height, u, u),
      S &&
      S.SetRRectSize(n.width, n.height, u, u),
      l &&
      l.SetRRectSize(n.width, n.height, u, u),
      e.SetRotation(a),
      this.UpdateDimensionLines(e),
      GlobalData.optManager.UpdateDisplayCoordinates(t, null, null, this),
      o
  }

  GetPolyPoints(e, t, a, r, i) {
    var n,
      o,
      s,
      l = [],
      S = {},
      c = {};
    Utils2.CopyRect(c, this.Frame),
      o = this.StyleRecord.Line.Thickness / 2,
      r &&
      Utils2.InflateRect(c, o, o);
    var u = this.GetCornerSize();
    if (
      S.x = 0,
      S.y = 0,
      S.x = 0,
      S.y = 0,
      S.width = u,
      S.height = 2 * u,
      GlobalData.optManager.PolyYCurve(l, S, e / 2, 0, 0, 0, u, !0),
      S.x = 0,
      S.y = c.height - 2 * u,
      S.width = u,
      S.height = 2 * u,
      GlobalData.optManager.PolyYCurve(l, S, e / 2, 0, 0, u, 0, !0),
      S.x = c.width - u,
      S.y = c.height,
      S.width = u,
      S.height = - 2 * u,
      GlobalData.optManager.PolyYCurve(l, S, e / 2, 0, 0, 0, - u, !1),
      S.x = c.width - u,
      S.y = 2 * u,
      S.width = u,
      S.height = - 2 * u,
      GlobalData.optManager.PolyYCurve(l, S, e / 2, 0, 0, - u, 0, !1),
      l.push(new Point(l[0].x, l[0].y)),
      !t
    ) for (s = l.length, n = 0; n < s; n++) l[n].x += c.x,
      l[n].y += c.y;
    return l
  }

  ExtendLines() {
    var e = this.GetTable(!1);
    e &&
      GlobalData.optManager.Table_ExtendLines(this, e)
  }

  ExtendCell(e, t, a) {
    var r = this.GetTable(!1);
    if (r) {
      var i = GlobalData.optManager.Table_ExtendCell(this, r, e, t, a);
      if (i) {
        var n,
          o,
          s,
          l,
          S = this.GetSVGFrame(this.Frame);
        if (n = this.inside.x - S.x, o = this.inside.y - S.y, n || o) for (l = i.length, s = 0; s < l; s++) i[s].x += n,
          i[s].y += o
      }
      return i
    }
  }

  GetPerimPts(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u,
      p = [],
      d = [],
      D = {},
      g = [
        0,
        0
      ],
      h = ConstantData.Defines.SED_CDim;
    if (
      1 === (S = t.length) &&
      t[0].y === - ConstantData.SEDA_Styles.SEDA_CoManager &&
      this.IsCoManager(D)
    ) return p.push(new Point(D.x, D.y)),
      null != t[0].id &&
      (p[0].id = t[0].id),
      p;
    if (a === ConstantData.HookPts.SED_KAT && null == i)
      // return p = ListManager.BaseDrawingObject.prototype.GetPerimPts.call(this, e, t, a, !1, i, n);
      // DOUBLE === todo
      return p = new BaseDrawingObject(this).GetPerimPts(e, t, a, !1, i, n);

    var m = this.GetTable(!1);
    if (null != i && m) {
      var C = GlobalData.optManager.Table_GetPerimPts(this, m, i, t);
      if (C) return p = C,
        !0,
        r ||
        (
          l = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
          Utils3.RotatePointsAboutCenter(this.Frame, l, p)
        ),
        p
    }
    S = t.length;
    var y = this.flags & ConstantData.ObjFlags.SEDO_UseConnect,
      f = this.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
        m;
    if (y || f) for (u = 0; u < S; u++) p[u] = {
      x: 0,
      y: 0,
      id: 0
    },
      p[u].x = t[u].x / ConstantData.Defines.SED_CDim * this.Frame.width + this.Frame.x,
      p[u].y = t[u].y / ConstantData.Defines.SED_CDim * this.Frame.height + this.Frame.y,
      null != t[u].id &&
      (p[u].id = t[u].id);
    else for (
      // p = ListManager.BaseDrawingObject.prototype.GetPerimPts.call(this, e, t, a, !0, i, n),
      // Double === todo
      p = new BaseDrawingObject(this).GetPerimPts(e, t, a, !0, i, n),

      s = this.Frame.width,
      this.Frame.height < s &&
      (s = this.Frame.height),
      o = this.GetCornerSize() * ConstantData.Defines.SED_RoundFactor,
      d = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),
      S = p.length,
      u = 0;
      u < S;
      u++
    ) 0 === t[u].x &&
      0 === t[u].y ? (p[u].x += o, p[u].y += o) : 0 === t[u].x &&
        t[u].y === h ? (p[u].x += o, p[u].y -= o) : t[u].x === h &&
          0 === t[u].y ? (p[u].x -= o, p[u].y += o) : t[u].x === h &&
            t[u].y === h ? (p[u].x -= o, p[u].y -= o) : t[u].x < h / 4 ? (c = GlobalData.optManager.PolyGetIntersect(d, p[u].y, g, null, !1)) &&
              (p[u].x = g[0], c > 1 && g[1] < p[u].x && (p[u].x = g[1])) : t[u].x > 3 * h / 4 ? (c = GlobalData.optManager.PolyGetIntersect(d, p[u].y, g, null, !1)) &&
                (p[u].x = g[0], c > 1 && g[1] > p[u].x && (p[u].x = g[1])) : t[u].y < h / 4 ? (c = GlobalData.optManager.PolyGetIntersect(d, p[u].x, g, null, !0)) &&
                  (p[u].y = g[0], c > 1 && g[1] < p[u].y && (p[u].y = g[1])) : t[u].y > 3 * h / 4 &&
                  (c = GlobalData.optManager.PolyGetIntersect(d, p[u].x, g, null, !0)) &&
    (p[u].y = g[0], c > 1 && g[1] > p[u].y && (p[u].y = g[1])),
      null != t[u].id &&
      (p[u].id = t[u].id);
    return r ||
      (
        l = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
        Utils3.RotatePointsAboutCenter(this.Frame, l, p)
      ),
      p
  }

  SetShapeIndent(e) {
    var t,
      a,
      r,
      i,
      n,
      o = 1,
      s = 1,
      l = 1,
      S = 1;
    a = this.inside.width,
      r = (t = this.inside.height) > a ? a : t,
      i = this.shapeparam,
      this.moreflags & ConstantData.ObjMoreFlags.SED_MF_FixedRR &&
      (
        n = r,
        e &&
        (
          n += 2 * (
            this.GetCornerSize() * ConstantData.Defines.SED_RoundFactor
          ),
          n = r + 2 * (
            this.GetCornerSize(n) * ConstantData.Defines.SED_RoundFactor
          )
        ),
        i = this.GetCornerSize(n) / n
      ),
      this.left_sindent = i * ConstantData.Defines.SED_RoundFactor,
      this.top_sindent = this.left_sindent,
      this.right_sindent = this.left_sindent,
      this.bottom_sindent = this.left_sindent,
      a = r,
      t = r,
      e &&
      (l = o = 1 - 2 * this.left_sindent, s = o, S = o),
      this.tindent.left = this.left_sindent * a / o,
      this.tindent.top = this.top_sindent * t / l,
      this.tindent.right = this.right_sindent * a / s,
      this.tindent.bottom = this.bottom_sindent * t / S
  }

  SetShapeProperties(e) {
    var t = !1,
      a = ConstantData.ObjMoreFlags.SED_MF_FixedRR;
    return e.hasrrectselected &&
      (
        (this.moreflags & a) > 0 == e.rrectfixed &&
        e.rrectparam == this.shapeparam ||
        (
          this.moreflags = Utils2.SetFlag(this.moreflags, a, e.rrectfixed),
          this.shapeparam = e.rrectparam,
          this.SetSize(
            this.Frame.width,
            0,
            ConstantData.ActionTriggerType.LINELENGTH
          ),
          t = !0
        )
      ),
      // ListManager.BaseShape.prototype.SetShapeProperties.call(this, e) &&
      // Double === todo
      super.SetShapeProperties(e) &&
      (t = !0),
      t
  }
}

export default RRect
