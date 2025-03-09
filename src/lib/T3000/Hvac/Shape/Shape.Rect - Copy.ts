





// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import T3Svg from '../../Hvac.SVG.t2';





import BaseShape from './S.BaseShape'
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";

import GlobalData from '../Data/T3Gv'
import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
import EvtUtil from "../Event/EvtUtil";
import Resources from '../Data/Resources'
import ListManager from '../Data/ListManager';
// import Element from "../Basic/Basic.Element";
import RRect from './S.RRect'

import $ from 'jquery';
// import ShapeContainer from '../Shape/Shape.ShapeContainer'

import Point from '../Model/Point'
import Document from '../Basic/B.Document'

import Element from '../Basic/B.Element';
import Instance from '../Data/Instance/Instance';
import ConstantData from '../Data/ConstantData'

class Rect extends BaseShape {



  // constructor(e) {
  //   //'use strict';
  //   (e = e || {
  //   }).ShapeType = ConstantData.ShapeType.RECT,
  //     e.moreflags |= ConstantData.ObjMoreFlags.SED_MF_FixedRR;
  //   var t = ListManager.BaseShape.apply(this, [
  //     e
  //   ]);
  //   if (
  //     t.dataclass = e.dataclass ||
  //     ConstantData.SDRShapeTypes.SED_S_Rect,
  //     t
  //   ) return t.nativeDataArrayBuffer = e.nativeDataArrayBuffer ||
  //     null,
  //     t.SymbolData = e.SymbolData ||
  //     null,
  //     t
  // }











  constructor(e) {
    //'use strict';
    e = e || {};
    e.ShapeType = ConstantData.ShapeType.RECT;
    e.moreflags |= ConstantData.ObjMoreFlags.SED_MF_FixedRR;

    // const t = ListManager.BaseShape.apply(this, [e]);

    super(e);

    // if (t) {
    this.dataclass = e.dataclass || ConstantData.SDRShapeTypes.SED_S_Rect;
    this.nativeDataArrayBuffer = e.nativeDataArrayBuffer || null;
    this.SymbolData = e.SymbolData || null;
    // return t;
    // }
  }


  // ListManager.Rect.prototype = new ListManager.BaseShape,
  // ListManager.Rect.prototype.constructor = ListManager.Rect,


  CreateShape(e, t) {
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    var a = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER),
      r = $.extend(!0, {
      }, this.Frame),
      i = this.StyleRecord;
    i.Line.BThick &&
      null == this.polylist &&
      Utils2.InflateRect(r, i.Line.BThick, i.Line.BThick);
    var n = (i = this.SVGTokenizerHook(i)).Line.Paint.Color,
      o = i.Line.Thickness,
      s = i.Line.LinePattern,
      l = i.Line.Paint.Opacity,
      S = r.width,
      c = r.height;
    a.SetSize(S, c),
      a.SetPos(r.x, r.y);
    // var u = ListManager.RRect.prototype.GetCornerSize.apply(this);
    var u = this.RRect_GetCornerSize();
    if (this.SymbolURL) {
      var p = e.CreateShape(Document.CreateShapeType.RECT);
      p.SetID(ConstantData.SVGElementClass.SHAPE),
        p.SetSize(S, c),
        p.SetImageFill(this.SymbolURL, {
          scaleType: 'NOPROP'
        });
      var d = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipHoriz) > 0,
        D = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipVert) > 0;
      d &&
        p.SetMirror(d),
        D &&
        p.SetFlip(D),
        a.AddElement(p),
        this.GetFieldDataStyleOverride()
    } else {
      if (u > 0) (g = e.CreateShape(Document.CreateShapeType.RRECT)).SetRRectSize(S, c, u, u);
      else var g = e.CreateShape(Document.CreateShapeType.RECT);
      g.SetStrokeColor(n),
        g.SetStrokeOpacity(l),
        g.SetStrokeWidth(o),
        0 !== s &&
        g.SetStrokePattern(s),
        g.SetID(ConstantData.SVGElementClass.SHAPE),
        g.SetSize(S, c),
        a.AddElement(g)
    }
    if (
      this.ApplyStyles(g, i),
      this.ApplyEffects(a, !1, !1),
      // !(this instanceof ListManager.ShapeContainer)
      // !(this instanceof GlobalDataShape.ShapeContainer)
      !(this instanceof Instance.Shape.ShapeContainer)
    ) {
      var h = ConstantData.Defines.SED_Slop,
        m = c,
        C = S;
      if (
        (
          this.IsSwimlane() ||
          this.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER
        ) &&
        (h *= 3),
        u > 0
      ) (y = e.CreateShape(Document.CreateShapeType.RRECT)).SetRRectSize(C, m, u, u);
      else var y = e.CreateShape(Document.CreateShapeType.RECT);
      y.SetStrokeColor('white'),
        y.SetFillColor('none'),
        y.SetOpacity(0),
        y.SetStrokeWidth(o + h),
        t ? this.SymbolURL ||
          i.Fill.Paint.FillType == ConstantData.FillTypes.SDFILL_TRANSPARENT &&
          this.DataID >= 0 ? y.SetEventBehavior(Element.EventBehavior.HIDDEN_ALL) : y.SetEventBehavior(Element.EventBehavior.HIDDEN_OUT) : y.SetEventBehavior(Element.EventBehavior.NONE),
        y.SetID(ConstantData.SVGElementClass.SLOP),
        y.ExcludeFromExport(!0),
        y.SetSize(C || 1, m),
        a.AddElement(y)
    }
    var f = i.Fill.Hatch;
    if (f && 0 !== f) {
      if (u > 0) (L = e.CreateShape(Document.CreateShapeType.RRECT)).SetRRectSize(S, c, u, u);
      else var L = e.CreateShape(Document.CreateShapeType.RECT);
      L.SetID(ConstantData.SVGElementClass.HATCH),
        L.SetSize(S, c),
        L.SetStrokeWidth(0),
        this.SetFillHatch(L, f),
        a.AddElement(L)
    }
    a.isShape = !0;
    var I = this.GetTable(!1);
    I &&
      T3Gv.optManager.LM_AddSVGTableObject(this, e, a, I);
    var T = this.GetGraph(!1);
    return T &&
      T3Gv.optManager.LM_AddSVGGraphObject(this, e, a, T),
      this.DataID >= 0 &&
      this.LM_AddSVGTextObject(e, a),
      a
  }

  GetCornerSize(e) {
    // return ListManager.RRect.prototype.GetCornerSize.call(this, e)
    // Double === TODO
    return this.RRect_GetCornerSize(e);
  }

  RRect_GetCornerSize(e) {
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


  GetPolyPoints(e, t, a, r, i) {
    // return ListManager.RRect.prototype.GetCornerSize.apply(this)
    // Double === TODO
    return this.RRect_GetCornerSize()
      > 0 ?
      // ListManager.RRect.prototype.GetPolyPoints.call(this, e, t, a, r, i) :
      this.RRect_GetPolyPoints(e, t, a, r, i) :
      // ListManager.BaseDrawingObject.prototype.GetPolyPoints.call(this, e, t, a, r, i)
      this.BaseDrawingObject_GetPolyPoints(e, t, a, r, i)
  }



  RRect_GetPolyPoints(e, t, a, r, i) {
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
      T3Gv.optManager.PolyYCurve(l, S, e / 2, 0, 0, 0, u, !0),
      S.x = 0,
      S.y = c.height - 2 * u,
      S.width = u,
      S.height = 2 * u,
      T3Gv.optManager.PolyYCurve(l, S, e / 2, 0, 0, u, 0, !0),
      S.x = c.width - u,
      S.y = c.height,
      S.width = u,
      S.height = - 2 * u,
      T3Gv.optManager.PolyYCurve(l, S, e / 2, 0, 0, 0, - u, !1),
      S.x = c.width - u,
      S.y = 2 * u,
      S.width = u,
      S.height = - 2 * u,
      T3Gv.optManager.PolyYCurve(l, S, e / 2, 0, 0, - u, 0, !1),
      l.push(new Point(l[0].x, l[0].y)),
      !t
    ) for (s = l.length, n = 0; n < s; n++) l[n].x += c.x,
      l[n].y += c.y;
    return l
  }

  BaseDrawingObject_GetPolyPoints(e, t, a, r, i) {
    var n,
      o,
      s = 0,
      l = [],
      S = {};
    if (
      Utils2.CopyRect(S, this.Frame),
      o = this.StyleRecord.Line.Thickness / 2,
      r &&
      Utils2.InflateRect(S, o, o),
      l.push(new Point(0, 0)),
      l.push(new Point(S.width, 0)),
      l.push(new Point(S.width, S.height)),
      l.push(new Point(0, S.height)),
      l.push(new Point(0, 0)),
      !t
    ) for (n = l.length, s = 0; s < n; s++) l[s].x += S.x,
      l[s].y += S.y;
    return l
  }

  ExtendLines(e) {
    (
      ListManager.RRect.prototype.GetCornerSize.apply(this) > 0 ||
      e
    ) &&
      // ListManager.RRect.prototype.ExtendLines.call(this)
      // Double === TODO
      this.RRect_ExtendLines()
  }

  RRect_ExtendLines() {
    var e = this.GetTable(!1);
    e &&
      T3Gv.optManager.Table_ExtendLines(this, e)
  }


  ExtendCell(e, t, a) {
    // if (ListManager.RRect.prototype.GetCornerSize.apply(this) > 0)
    if (this.RRect_GetCornerSize() > 0)
      // return ListManager.RRect.prototype.ExtendCell.call(this, e, t, a)
      return this.RRect_ExtendCell(e, t, a)
  }

  RRect_ExtendCell(e, t, a) {
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

  SetShapeIndent(e) {
    // return ListManager.RRect.prototype.GetCornerSize.apply(this) > 0
    return this.RRect_GetCornerSize() > 0
      // ? ListManager.RRect.prototype.SetShapeIndent.call(this, e) :
      ? this.RRect_SetShapeIndent(e) :
      (
        this.left_sindent = 0,
        this.right_sindent = 0,
        this.top_sindent = 0,
        this.bottom_sindent = 0,
        // ListManager.BaseShape.prototype.SetShapeIndent.call(this, e)
        // Double === TODO
        super.SetShapeIndent(e)
      )
  }

  RRect_SetShapeIndent(e) {
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
    if (
      e.hasrrectselected &&
      (
        (this.moreflags & a) > 0 != e.rrectfixed ||
        e.rrectparam != this.shapeparam
      )
    ) {
      this.moreflags = Utils2.SetFlag(this.moreflags, a, e.rrectfixed),
        this.shapeparam = e.rrectparam;
      this.GetTable(!0);
      0 === this.shapeparam &&
        (
          this.left_sindent = 0,
          this.top_sindent = 0,
          this.right_sindent = 0,
          this.bottom_sindent = 0,
          this.tindent.left = 0,
          this.tindent.top = 0,
          this.tindent.right = 0,
          this.tindent.bottom = 0
        ),
        this.SetSize(
          this.Frame.width,
          0,
          ConstantData.ActionTriggerType.LINELENGTH
        ),
        0 === this.shapeparam &&
        this.ExtendLines(!0),
        t = !0
    }
    return ListManager.BaseShape.prototype.SetShapeProperties.call(this, e) &&
      (t = !0),
      t
  }

  ApplyCurvature(e) {
    var t = this.GetTable(!1);
    if (t) {
      var a,
        r = t.rows[0];
      for (a = 0; a < r.ncells; a++) if (
        t.cells[a].flags & ListManager.Table.CellFlags.SDT_F_UseExpandedRectAsFrame
      ) return
    }
    var i = {
      hasrrectselected: !0,
      rrectfixed: !0,
      rrectparam: e
    };
    this.SetShapeProperties(i)
  }

}

export default Rect;
