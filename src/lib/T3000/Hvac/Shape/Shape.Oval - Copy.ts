





// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import T3Svg from '../../Hvac.SVG.t2';




import BaseShape from './S.BaseShape'
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";// import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/T3Gv'
// import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
// import EvtUtil from "../Event/Event.Default";
// import Resources from '../Data/Resources'
// import Element from "../Basic/Basic.Element";

import Document from '../Basic/B.Document'

import Element from '../Basic/B.Element';
import ListManager from '../Data/ListManager'
import $ from 'jquery'
import Point from '../Model/Point'
import ConstantData from '../Data/ConstantData'

class Oval extends BaseShape {


  // constructor(e) {
  //   //'use strict';
  //   (e = e || {
  //   }).ShapeType = ConstantData.ShapeType.OVAL,
  //     e.Frame;
  //   var t = ListManager.BaseShape.apply(this, [
  //     e
  //   ]);
  //   if (
  //     t.ObjGrow === ConstantData.GrowBehavior.PROPORTIONAL ? t.dataclass = ConstantData.SDRShapeTypes.SED_S_Circ : t.dataclass = ConstantData.SDRShapeTypes.SED_S_Oval,
  //     t
  //   ) return t
  // }



  constructor(e) {
    //'use strict';
    e = e || {};
    e.ShapeType = ConstantData.ShapeType.OVAL;
    e.Frame;
    // const t = ListManager.BaseShape.apply(this, [e]);
    super(e);
    // if (t) {
    this.dataclass = this.ObjGrow === ConstantData.GrowBehavior.PROPORTIONAL
      ? ConstantData.SDRShapeTypes.SED_S_Circ
      : ConstantData.SDRShapeTypes.SED_S_Oval;
    // return t;
  }








  // ListManager.Oval.prototype = new ListManager.BaseShape,
  // ListManager.Oval.prototype.constructor = ListManager.Oval,


  CreateShape(e, t) {
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    var a = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER),
      r = $.extend(!0, {
      }, this.Frame),
      i = (this.trect, this.StyleRecord);
    i.Line.BThick &&
      Utils2.InflateRect(r, i.Line.BThick, i.Line.BThick);
    var n = (i = this.SVGTokenizerHook(i)).Line.Paint.Color,
      o = i.Line.Thickness,
      s = i.Line.LinePattern,
      l = r.width,
      S = r.height;
    a.SetSize(l, S),
      a.SetPos(r.x, r.y);
    var c = e.CreateShape(Document.CreateShapeType.OVAL);
    c.SetSize(l, S),
      c.SetStrokeColor(n),
      c.SetStrokeWidth(o),
      0 !== s &&
      c.SetStrokePattern(s),
      c.SetID(ConstantData.SVGElementClass.SHAPE),
      a.AddElement(c),
      this.ApplyStyles(c, i),
      this.ApplyEffects(a, !1, !1);
    var u = e.CreateShape(Document.CreateShapeType.OVAL);
    u.SetStrokeColor('white'),
      u.SetFillColor('none'),
      u.SetOpacity(0),
      u.SetStrokeWidth(o + ConstantData.Defines.SED_Slop),
      t ? u.SetEventBehavior(Element.EventBehavior.HIDDEN_OUT) : u.SetEventBehavior(Element.EventBehavior.NONE),
      u.SetID(ConstantData.SVGElementClass.SLOP),
      u.ExcludeFromExport(!0),
      u.SetSize(l, S),
      a.AddElement(u);
    var p = i.Fill.Hatch;
    if (p && 0 !== p) {
      var d = e.CreateShape(Document.CreateShapeType.OVAL);
      d.SetID(ConstantData.SVGElementClass.HATCH),
        d.SetSize(l, S),
        d.SetStrokeWidth(0),
        this.SetFillHatch(d, p),
        a.AddElement(d)
    }
    a.isShape = !0;
    var D = this.GetTable(!1);
    return D &&
      T3Gv.optManager.LM_AddSVGTableObject(this, e, a, D),
      this.DataID >= 0 &&
      this.LM_AddSVGTextObject(e, a),
      a
  }

  GetPolyPoints(e, t, a, r, i) {
    var n,
      o,
      s,
      l = [],
      S = {},
      c = {};
    if (
      Utils2.CopyRect(c, this.Frame),
      o = this.StyleRecord.Line.Thickness / 2,
      r &&
      Utils2.InflateRect(c, o, o),
      S.x = c.width / 2,
      S.y = 0,
      S.height = c.height,
      S.width = c.width / 2,
      T3Gv.optManager.PolyYCurve(l, S, e, 0, 0, 0, 0, !1),
      l.pop(),
      S.x = 0,
      S.y = c.height,
      S.width = c.width / 2,
      S.height = - c.height,
      T3Gv.optManager.PolyYCurve(l, S, e, 0, 0, 0, 0, !0),
      l.pop(),
      !t
    ) for (s = l.length, n = 0; n < s; n++) l[n].x += c.x,
      l[n].y += c.y;
    return l
  }

  ExtendLines() {
    var e = this.GetTable(!1);
    e &&
      T3Gv.optManager.Table_ExtendLines(this, e)
  }

  ExtendCell(e, t, a) {
    var r = this.GetTable(!1);
    if (r) {
      var i = T3Gv.optManager.Table_ExtendCell(this, r, e, t, a);
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
      p,
      d,
      D,
      g,
      h,
      m,
      C,
      y = [],
      f = {};
    if (
      1 === (m = t.length) &&
      t[0].y === - ConstantData.SEDA_Styles.SEDA_CoManager &&
      this.IsCoManager(f)
    ) return y.push(new Point(f.x, f.y)),
      null != t[0].id &&
      (y[0].id = t[0].id),
      y;
    if (a === ConstantData.HookPts.SED_KAT)
      // return y = ListManager.BaseDrawingObject.prototype.GetPerimPts.call(this, e, t, a, !1, i, n);
      // Double === TODO
      return y = this.BaseDrawingObject_GetPerimPts(e, t, a, !1, i, n);
    var L = this.GetTable(!1);
    if (null != i && L) {
      var I = T3Gv.optManager.Table_GetPerimPts(this, L, i, t);
      if (I) return y = I,
        r ||
        (
          h = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
          Utils3.RotatePointsAboutCenter(this.Frame, h, y)
        ),
        y
    }
    l = (o = this.Frame.width) / 2,
      S = (s = this.Frame.height) / 2,
      p = ConstantData.Defines.SED_CDim;
    var T = this.flags & ConstantData.ObjFlags.SEDO_UseConnect,
      b = this.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
        L;
    if (m = t.length, T || b) for (C = 0; C < m; C++) y[C] = {
      x: 0,
      y: 0,
      id: 0
    },
      y[C].x = t[C].x / ConstantData.Defines.SED_CDim * this.Frame.width + this.Frame.x,
      y[C].y = t[C].y / ConstantData.Defines.SED_CDim * this.Frame.height + this.Frame.y,
      null != t[C].id &&
      (y[C].id = t[C].id);
    else for (C = 0; C < m; C++) c = o * (t[C].x - p / 2) / p,
      u = s * (t[C].y - p / 2) / p,
      0 !== c &&
      0 !== u &&
      (
        g = u < 0 ? - 1 : 1,
        d = 1 / (d = (D = c / u) * D / (l * l) + 1 / (S * S)),
        c = D * (u = Math.sqrt(d) * g)
      ),
      y.push(
        new Point(
          c + (this.Frame.x + this.Frame.x + this.Frame.width) / 2,
          u + (this.Frame.y + this.Frame.y + this.Frame.height) / 2
        )
      ),
      null != t[C].id &&
      (y[C].id = t[C].id);
    return r ||
      (
        h = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
        Utils3.RotatePointsAboutCenter(this.Frame, h, y)
      ),
      y
  }

  BaseDrawingObject_GetPerimPts(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S = [];
    s = t.length;
    for (
      var c = ConstantData.SDRShapeTypes.SED_S_Tri,
      u = ConstantData.Defines.SED_CDim,
      p = 0;
      p < s;
      p++
    ) S[p] = {
      x: 0,
      y: 0,
      id: 0
    },
      S[p].x = t[p].x / ConstantData.Defines.SED_CDim * this.Frame.width + this.Frame.x,
      l = this.dataclass === c ? u - t[p].y : t[p].y,
      S[p].y = l / ConstantData.Defines.SED_CDim * this.Frame.height + this.Frame.y,
      null != t[p].id &&
      (S[p].id = t[p].id);
    return r ||
      (
        o = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
        Utils3.RotatePointsAboutCenter(this.Frame, o, S)
      ),
      S
  }


  SetShapeIndent(e) {
    var t,
      a,
      r = 1,
      i = 1,
      n = 1,
      o = 1;
    a = this.inside.width,
      t = this.inside.height,
      this.left_sindent = ConstantData.Defines.SED_RoundFactor / 2,
      this.top_sindent = ConstantData.Defines.SED_RoundFactor / 2,
      this.right_sindent = ConstantData.Defines.SED_RoundFactor / 2,
      this.bottom_sindent = ConstantData.Defines.SED_RoundFactor / 2,
      e &&
      (n = r = 1 - 2 * this.left_sindent, i = r, o = r),
      this.tindent.left = this.left_sindent * a / r,
      this.tindent.top = this.top_sindent * t / n,
      this.tindent.right = this.right_sindent * a / i,
      this.tindent.bottom = this.bottom_sindent * t / o
  }

}

export default Oval;
