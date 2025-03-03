





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
import DefaultEvt from "../Event/DefaultEvt";
import Resources from '../Data/Resources'
// import Element from "../Basic/Basic.Element";
import ListManager from '../Data/ListManager';

import Document from '../Basic/Basic.Document'

import Element from '../Basic/Basic.Element';
import PolygonShapeGenerator from '../Opt/Business/PolygonShapeGenerator'
import $ from 'jquery'
import ConstantData from '../Data/ConstantData'


import PolySeg from '../Model/PolySeg'



class Polygon extends BaseShape {



  // constructor(e) {
  //   //'use strict';
  //   (e = e || {
  //   }).ShapeType = ConstantData.ShapeType.POLYGON,
  //     this.VertexArray = e.VertexArray ||
  //     [],
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
  //     [];
  //   var t = ListManager.BaseShape.apply(this, [
  //     e
  //   ]);
  //   if (t.dataclass = ConstantData.SDRShapeTypes.SED_S_Poly, t) return t
  // }

  public VertexArray: any;
  public FixedPoint: any;
  public LineOrientation: any;
  public hoplist: any;
  public ArrowheadData: any;

  constructor(e) {
    e = e || {};
    e.ShapeType = ConstantData.ShapeType.POLYGON;


    // var t = ListManager.BaseShape.apply(this, [e]);
    super(e);

    this.VertexArray = e.VertexArray || [];
    this.FixedPoint = e.FixedPoint || [0, 0];
    this.LineOrientation = e.LineOrientation || ConstantData.LineOrientation.NONE;
    this.hoplist = e.hoplist || { nhops: 0, hops: [] };
    this.ArrowheadData = e.ArrowheadData || [];

    // if (t) {
    this.dataclass = ConstantData.SDRShapeTypes.SED_S_Poly;
    // return t;
  }

















  // ListManager.Polygon.prototype = new ListManager.BaseShape,
  // ListManager.Polygon.prototype.constructor = ListManager.Polygon

  ScaleGeometries(e, t, a, r) {
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
      C = this.Geometries.length,
      y = 0;
    for (S = 0; S < C; S++) {
      if (
        g !== (o = this.Geometries[S]).shapeid &&
        (
          n &&
          n.Apply(),
          l = e.GetElementByID(ConstantData.SVGElementClass.SHAPE, o.shapeid),
          g = o.shapeid,
          l &&
          (l.SetSize(a, r), (n = l.PathCreator()).BeginPath())
        ),
        !o.NoFill ||
        0 === o.MoveTo.length
      ) for (s = t[o.Offset], n.MoveTo(s.x, s.y), D = 1; D < o.NPoints; D++) s = t[o.Offset + D],
        n.LineTo(s.x, s.y);
      if (o.Closed && n.ClosePath(), (c = o.MoveTo.length) > 0) {
        if (
          i = g + '.' + y,
          y++,
          null == (h = e.GetElementByID(ConstantData.SVGElementClass.SHAPE, i))
        ) continue;
        for (
          u = 0,
          d = 1,
          s = t[o.Offset],
          h.SetSize(a, r),
          (m = h.PathCreator()).BeginPath();
          u <= c;
        ) {
          for (m.MoveTo(s.x, s.y), p = u < c ? o.MoveTo[u] : o.NPoints, D = d; D < p; D++) s = t[o.Offset + D],
            m.LineTo(s.x, s.y);
          ++u < c &&
            (s = t[o.MoveTo[u - 1] + o.Offset], d = u < c ? o.MoveTo[u] : o.NPoints, u++)
        }
        m.Apply()
      }
    }
    n.Apply()
  }

  CreateShape(e, t) {
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    var a = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER),
      r = e.CreateShape(Document.CreateShapeType.POLYGON);
    r.SetID(ConstantData.SVGElementClass.SHAPE);
    var i,
      n,
      o = $.extend(!0, {
      }, this.Frame),
      s = (this.trect, this.StyleRecord);
    s.Line.BThick &&
      null == this.polylist &&
      Utils2.InflateRect(o, s.Line.BThick, s.Line.BThick);
    var l = (s = this.SVGTokenizerHook(s)).Line.Paint.Color,
      S = s.Line.Paint.Opacity,
      c = s.Line.Thickness,
      u = s.Line.LinePattern;
    this.GetFieldDataStyleOverride();
    var p = o.width,
      d = o.height;
    a.SetSize(p, d),
      a.SetPos(o.x, o.y),
      r.SetSize(p, d);
    var D,
      g,
      h = this.VertexArray,
      m = h.length,
      C = 0,
      y = 0,
      f = [],
      L = {},
      I = {};
    for (C = 0; C < m; ++C) L = h[C],
      (I = {}).x = L.x * p,
      I.y = L.y * d,
      f.push(I);
    if (this.Geometries && this.Geometries.length) {
      var T,
        b,
        M,
        P,
        R,
        A,
        _,
        E = this.Geometries.length,
        w = 1;
      (r = e.CreateShape(Document.CreateShapeType.PATH)).SetID(ConstantData.SVGElementClass.SHAPE),
        r.SetUserData(w),
        r.SetSize(p, d),
        (T = r.PathCreator()).BeginPath();
      var F = this.Geometries[0].NoFill,
        v = this.Geometries[0].NoLine ||
          this.Geometries[0].MoveTo.length > 0;
      for (C = 0; C < E; C++) {
        if (
          (b = this.Geometries[C]).NoFill === F &&
          (b.NoLine || b.MoveTo.length > 0) === v ||
          (
            1 === T.pathSegs.length &&
              'z' == T.pathSegs[0] ? T = null : T.Apply(),
            v ? r.SetStrokeWidth(0) : (
              r.SetStrokeColor(l),
              r.SetStrokeWidth(c),
              0 !== u &&
              r.SetStrokePattern(u)
            ),
            a.AddElement(r),
            F ? r.SetFillColor('none') : this.ApplyStyles(r, s),
            (r = e.CreateShape(Document.CreateShapeType.PATH)).SetID(ConstantData.SVGElementClass.SHAPE),
            w++,
            r.SetUserData(w),
            r.SetSize(p, d),
            (T = r.PathCreator()).BeginPath(),
            F = b.NoFill,
            v = b.NoLine ||
            b.MoveTo.length > 0
          ),
          b.shapeid = w,
          !F ||
          0 === b.MoveTo.length
        ) for (M = f[b.Offset], T.MoveTo(M.x, M.y), D = 1; D < b.NPoints; D++) M = f[b.Offset + D],
          T.LineTo(M.x, M.y);
        if (b.Closed && T.ClosePath(), (P = b.MoveTo.length) > 0) {
          for (
            R = 0,
            _ = 1,
            M = f[b.Offset],
            (i = e.CreateShape(Document.CreateShapeType.PATH)).SetID(ConstantData.SVGElementClass.SHAPE),
            g = w + '.' + y,
            y++,
            i.SetUserData(g),
            i.SetSize(p, d),
            (n = i.PathCreator()).BeginPath();
            R <= P;
          ) {
            for (n.MoveTo(M.x, M.y), A = R < P ? b.MoveTo[R] : b.NPoints, D = _; D < A; D++) M = f[b.Offset + D],
              n.LineTo(M.x, M.y);
            ++R < P &&
              (M = f[b.MoveTo[R - 1] + b.Offset], _ = R < P ? b.MoveTo[R] : b.NPoints, R++)
          }
          n.Apply(),
            i.SetStrokeColor(l),
            i.SetStrokeWidth(c),
            i.SetStrokeOpacity(S),
            0 !== u &&
            i.SetStrokePattern(u),
            a.AddElement(i)
        }
      }
      var G,
        N,
        k = !1;
      for (N = T.pathSegs.length, G = 0; G < N; G++) 'z' != T.pathSegs[G] &&
        (k = !0);
      1 === T.pathSegs.length &&
        'z' == T.pathSegs[0] ||
        !k ? T = null : T.Apply(),
        v ? r.SetStrokeWidth(0) : (
          r.SetStrokeColor(l),
          r.SetStrokeWidth(c),
          0 !== u &&
          r.SetStrokePattern(u)
        ),
        a.AddElement(r),
        F ? r.SetFillColor('none') : this.ApplyStyles(r, s)
    } else r.SetPoints(f),
      r.SetStrokeColor(l),
      r.SetStrokeWidth(c),
      0 !== u &&
      r.SetStrokePattern(u),
      a.AddElement(r),
      this.ApplyStyles(r, s);
    this.ApplyEffects(a, !1, !1);
    var U = e.CreateShape(Document.CreateShapeType.POLYGON);
    U.SetPoints(f),
      U.SetStrokeColor('white'),
      U.SetFillColor('none'),
      U.SetOpacity(0),
      U.SetStrokeWidth(c + ConstantData.Defines.SED_Slop),
      t ? U.SetEventBehavior(Element.EventBehavior.HIDDEN_OUT) : U.SetEventBehavior(Element.EventBehavior.NONE),
      U.SetID(ConstantData.SVGElementClass.SLOP),
      U.ExcludeFromExport(!0),
      U.SetSize(p, d),
      a.AddElement(U);
    var J = s.Fill.Hatch;
    if (J && 0 !== J) {
      var x = e.CreateShape(Document.CreateShapeType.POLYGON);
      x.SetPoints(f),
        x.SetID(ConstantData.SVGElementClass.HATCH),
        x.SetSize(p, d),
        x.SetStrokeWidth(0),
        this.SetFillHatch(x, J),
        a.AddElement(x)
    }
    a.isShape = !0;
    var O = this.GetTable(!1);
    return O &&
      GlobalData.optManager.LM_AddSVGTableObject(this, e, a, O),
      this.DataID >= 0 &&
      this.LM_AddSVGTextObject(e, a),
      a
  }

  Resize(e, t, a, r) {

    console.log('== track UpdateDimensionsLines Shape.Polygon-> Resize')


    if (null != e) {
      var i = e.GetRotation(),
        n = $.extend(!0, {
        }, this.prevBBox),
        o = $.extend(!0, {
        }, t),
        s = $.extend(!0, {
        }, t),
        l = GlobalData.optManager.svgDoc.CalculateRotatedOffsetForResize(n, o, i);
      if (
        this.StyleRecord.Line.BThick &&
        null == this.polylist &&
        Utils2.InflateRect(s, this.StyleRecord.Line.BThick, this.StyleRecord.Line.BThick),
        r !== ConstantData.ActionTriggerType.MOVEPOLYSEG
      ) {
        e.SetSize(s.width, s.height),
          e.SetPos(s.x + l.x, s.y + l.y);
        var S = e.GetElementByID(ConstantData.SVGElementClass.SHAPE),
          c = this.RegenerateVectors(s.width, s.height);
        c &&
          (this.VertexArray = c);
        var u = this.VertexArray,
          p = u.length,
          d = 0,
          D = [],
          g = {},
          h = {};
        for (d = 0; d < p; ++d) g = u[d],
          (h = {}).x = g.x * s.width,
          h.y = g.y * s.height,
          D.push(h);
        this.Geometries &&
          this.Geometries.length ? this.ScaleGeometries(e, D, s.width, s.height) : (S.SetPoints(D), S.SetSize(s.width, s.height));
        var m = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
        m &&
          (m.SetPoints(D), m.SetSize(s.width, s.height));
        var C = e.GetElementByID(ConstantData.SVGElementClass.HATCH);
        C &&
          (C.SetPoints(D), C.SetSize(t.width, t.height))
      }
      return this.GetTable(!1) ? GlobalData.optManager.Table_ResizeSVGTableObject(e, a, t) : this.LM_ResizeSVGTextObject(e, a, t),
        e.SetRotation(i),
        this.UpdateDimensionLines(e),
        GlobalData.optManager.UpdateDisplayCoordinates(t, null, null, this),
        l
    }
  }

  ResizeInTextEdit(e, t) {

    console.log('== track UpdateDimensionsLines Shape.Polygon-> ResizeInTextEdit')

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
    var s = e.GetElementByID(ConstantData.SVGElementClass.SHAPE),
      l = this.RegenerateVectors(n.width, n.height);
    l &&
      (this.VertexArray = l),
      this.polylist &&
      this.ScaleObject(0, 0, 0, 0, 0, 0);
    var S = this.VertexArray,
      c = S.length,
      u = 0,
      p = [],
      d = {},
      D = {};
    for (u = 0; u < c; ++u) d = S[u],
      (D = {}).x = d.x * n.width,
      D.y = d.y * n.height,
      p.push(D);
    s &&
      (
        this.Geometries &&
          this.Geometries.length ? this.ScaleGeometries(e, p, n.width, n.height) : s.SetPoints(p),
        s.SetSize(n.width, n.height)
      );
    var g = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
    g &&
      (g.SetPoints(p), g.SetSize(n.width, n.height)),
      this.GetTable(!1) &&
      GlobalData.optManager.Table_ResizeSVGTableObject(e, this, t, !0);
    var h = e.GetElementByID(ConstantData.SVGElementClass.HATCH);
    return h &&
      (h.SetPoints(p), h.SetSize(t.width, t.height)),
      e.SetRotation(a),
      this.UpdateDimensionLines(e),
      GlobalData.optManager.UpdateDisplayCoordinates(t, null, null, this),
      o
  }

  GetTargetPoints(e, t, a) {
    var r = [],
      i = [
        {
          x: ConstantData.Defines.SED_CDim / 2,
          y: 0
        },
        {
          x: ConstantData.Defines.SED_CDim,
          y: ConstantData.Defines.SED_CDim / 2
        },
        {
          x: ConstantData.Defines.SED_CDim / 2,
          y: ConstantData.Defines.SED_CDim
        },
        {
          x: 0,
          y: ConstantData.Defines.SED_CDim / 2
        }
      ],
      n = this.flags & ConstantData.ObjFlags.SEDO_ContConn &&
        null !== e &&
        0 == (t & ConstantData.HookFlags.SED_LC_NoContinuous),
      o = this.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        this.ConnectPoints,
      s = this.GetTable(!1),
      l = this.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
        s,
      S = !l &&
        (this.flags, ConstantData.ObjFlags.SEDO_NoTableLink);
    S = this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART;
    var c = {},
      u = !1,
      p = ConstantData.Defines.SED_CDim;
    if (
      S &&
      s &&
      e &&
      (u = GlobalData.optManager.Table_GetTargetPoints(this, s, e, t, c, a)),
      a >= 0
    ) {
      var d = GlobalData.optManager.GetObjectPtr(a, !1);
      if (
        d &&
        d.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText
      ) {
        var D = [];
        return D.push(new Point(p / 2, p / 2)),
          D
      }
    }
    if (u) return r.push(c),
      r;
    if (n) return this.PolyGetTargets(e, t, this.Frame);
    if (o || l) {
      var g = [];
      return o ? g = this.ConnectPoints : l &&
        (g = GlobalData.optManager.Table_GetRowConnectPoints(this, s)),
        r = Utils1.DeepCopy(g)
    }
    return i
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
      u = [],
      p = [],
      d = {},
      D = [
        0,
        0
      ],
      g = ConstantData.Defines.SED_CDim;
    if (
      1 === (l = t.length) &&
      t[0].y === - ConstantData.SEDA_Styles.SEDA_CoManager &&
      this.IsCoManager(d)
    ) return u.push(new Point(d.x, d.y)),
      null != t[0].id &&
      (u[0].id = t[0].id),
      u;
    if (
      a === ConstantData.HookPts.SED_KAT ||
      a === ConstantData.HookPts.SED_KATD
      // ) return u = ListManager.BaseDrawingObject.prototype.GetPerimPts.call(this, e, t, a, !1, i);
      // Double ===
    ) return u = this.BaseDrawingObject_GetPerimPts(e, t, a, !1, i);
    var h = this.GetTable(!1);
    if (null != i && h) {
      var m = GlobalData.optManager.Table_GetPerimPts(this, h, i, t);
      if (m) return u = m,
        r ||
        (
          s = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
          Utils3.RotatePointsAboutCenter(this.Frame, s, u)
        ),
        u
    }
    l = t.length;
    var C = this.flags & ConstantData.ObjFlags.SEDO_UseConnect,
      y = this.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
        h;
    if (C || y) for (c = 0; c < l; c++) u[c] = {
      x: 0,
      y: 0,
      id: 0
    },
      u[c].x = t[c].x / ConstantData.Defines.SED_CDim * this.Frame.width + this.Frame.x,
      u[c].y = t[c].y / ConstantData.Defines.SED_CDim * this.Frame.height + this.Frame.y,
      null != t[c].id &&
      (u[c].id = t[c].id);
    else {
      if (
        this.flags & ConstantData.ObjFlags.SEDO_ContConn &&
        !GlobalData.optManager.FromOverlayLayer
        // ) return u = ListManager.BaseDrawingObject.prototype.GetPerimPts.call(this, e, t, a, r, i, n);
      ) return u = this.BaseDrawingObject_GetPerimPts(e, t, a, r, i, n);
      for (
        // u = ListManager.BaseDrawingObject.prototype.GetPerimPts.call(this, e, t, a, !0, i, n),
        u = this.BaseDrawingObject_GetPerimPts(e, t, a, !0, i, n),
        S = (
          p = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null)
        ).length,
        Utils2.EqualPt(p[0], p[S - 1]) ||
        p.push(new Point(p[0].x, p[0].y)),
        l = u.length,
        c = 0;
        c < l;
        c++
      ) t[c].x < g / 4 ? (o = GlobalData.optManager.PolyGetIntersect(p, u[c].y, D, null, !1)) &&
        (u[c].x = D[0], o > 1 && D[1] < u[c].x && (u[c].x = D[1])) : t[c].x > 3 * g / 4 ? (o = GlobalData.optManager.PolyGetIntersect(p, u[c].y, D, null, !1)) &&
          (u[c].x = D[0], o > 1 && D[1] > u[c].x && (u[c].x = D[1])) : t[c].y < g / 4 ? (o = GlobalData.optManager.PolyGetIntersect(p, u[c].x, D, null, !0)) &&
            (u[c].y = D[0], o > 1 && D[1] < u[c].y && (u[c].y = D[1])) : t[c].y > 3 * g / 4 &&
            (o = GlobalData.optManager.PolyGetIntersect(p, u[c].x, D, null, !0)) &&
      (u[c].y = D[0], o > 1 && D[1] > u[c].y && (u[c].y = D[1])),
        null != t[c].id &&
        (u[c].id = t[c].id)
    }
    return r ||
      (
        s = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
        Utils3.RotatePointsAboutCenter(this.Frame, s, u)
      ),
      u
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

  GetPolyPoints(e, t, a, r, i) {
    var n,
      o,
      s = 0,
      l = [],
      S = {},
      c = {},
      u = {};
    for (
      Utils2.CopyRect(u, this.Frame),
      o = this.StyleRecord.Line.Thickness / 2,
      r &&
      Utils2.InflateRect(u, o, o),
      s = 0;
      s < this.VertexArray.length;
      ++s
    ) S = this.VertexArray[s],
      (c = {}).x = S.x * u.width,
      c.y = S.y * u.height,
      l.push(c);
    if (!t) for (n = l.length, s = 0; s < n; s++) l[s].x += u.x,
      l[s].y += u.y;
    return l
  }

  SetShapeIndent(e) {
    var t,
      a,
      r = 1,
      i = 1,
      n = 1,
      o = 1,
      s = [],
      l = {};
    a = this.inside.width,
      t = this.inside.height,
      this.NeedsSIndentCount &&
      (
        s = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, null),
        l = GlobalData.optManager.GuessTextIndents(s, this.Frame),
        this.left_sindent = l.left_sindent,
        this.right_sindent = l.right_sindent,
        this.top_sindent = l.top_sindent,
        this.bottom_sindent = l.bottom_sindent,
        this.NeedsSIndentCount = !1
      ),
      e &&
      (
        r = 1 - (this.left_sindent + this.right_sindent),
        n = 1 - (this.bottom_sindent + this.top_sindent),
        i = 1 - (this.left_sindent + this.right_sindent),
        o = 1 - (this.bottom_sindent + this.top_sindent)
      ),
      this.tindent.left = this.left_sindent * a / r,
      this.tindent.top = this.top_sindent * t / n,
      this.tindent.right = this.right_sindent * a / i,
      this.tindent.bottom = this.bottom_sindent * t / o
  }

  WriteSDFAttributes(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S;
    if (
      this.dataclass &&
      this.dataclass === ConstantData.SDRShapeTypes.SED_S_Poly
    ) if (this.polylist) ListManager.PolyLine.prototype.WriteSDFAttributes.call(this, e, t, !0);
      else {
        if (
          i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWPOLY),
          a = this.VertexArray.length,
          n = SDF.ToSDWinCoords(this.Frame.width, t.coordScaleFactor),
          o = SDF.ToSDWinCoords(this.Frame.height, t.coordScaleFactor),
          S = t.WriteBlocks ? this.BlockID : t.polyid++,
          t.WriteVisio ||
          t.WriteWin32
        ) {
          var c = {
            InstID: S,
            n: a,
            dim: {
              x: 0,
              y: 0
            },
            flags: ConstantData.PolyListFlags.SD_PLF_FreeHand,
            ldim: {
              x: n,
              y: o
            }
          };
          e.writeStruct(FileParser.SDF_PolyList_Struct_20, c)
        } else {
          c = {
            InstID: S,
            n: a,
            flags: ConstantData.PolyListFlags.SD_PLF_FreeHand,
            ldim: {
              x: n,
              y: o
            }
          };
          e.writeStruct(FileParser.SDF_PolyList_Struct_24, c)
        }
        for (SDF.Write_LENGTH(e, i), r = 0; r < a; r++) {
          s = this.VertexArray[r].x * n,
            l = this.VertexArray[r].y * o;
          var u = {
            otype: ConstantData.ObjectTypes.SED_LineD,
            dataclass: 0,
            ShortRef: 0,
            param: 0,
            pt: {
              x: 0,
              y: 0
            },
            lpt: {
              x: s,
              y: l
            },
            dimDeflection: 0
          };
          i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWPOLYSEG),
            e.writeStruct(FileParser.SDF_PolySeg_Struct, u),
            SDF.Write_LENGTH(e, i)
        }
        e.writeUint16(FileParser.SDROpCodesByName.SDF_C_DRAWPOLY_END)
      }
    // ListManager.BaseShape.prototype.WriteSDFAttributes.call(this, e, t)
    // Double === TODO
    super.WriteSDFAttributes(e, t)
  }

  Flip(e) {
    var t,
      a,
      r,
      i = ConstantData.SDRShapeTypes,
      n = ConstantData.Defines.SED_CDim;
    if (
      this.VertexArray = GlobalData.optManager.FlipVertexArray(this.VertexArray, e),
      this.polylist &&
      ListManager.PolyLine.prototype.Flip.call(this, e),
      e & ConstantData.ExtraFlags.SEDE_FlipVert &&
      null != this.dataclass
    ) {
      switch (t = !0, this.dataclass) {
        case i.SED_S_ArrT:
          this.dataclass = i.SED_S_ArrB;
          break;
        case i.SED_S_ArrB:
          this.dataclass = i.SED_S_ArrT;
          break;
        case i.SED_S_Tri:
          this.dataclass = i.SED_S_TriB;
          break;
        case i.SED_S_TriB:
          this.dataclass = i.SED_S_Tri;
          break;
        case i.SED_S_Trap:
          this.dataclass = i.SED_S_TrapB;
          break;
        case i.SED_S_TrapB:
          this.dataclass = i.SED_S_Trap;
          break;
        case i.SED_S_Poly:
        case i.SED_S_MeasureArea:
          t = !1;
          break;
        default:
          this.extraflags = Utils2.SetFlag(
            this.extraflags,
            ConstantData.ExtraFlags.SEDE_FlipVert,
            0 == (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipVert)
          ),
            t = !1
      }
      if (
        t &&
        this.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        this.ConnectPoints
      ) for (a = this.ConnectPoints.length, r = 0; r < a; r++) this.ConnectPoints[r].y = n - this.ConnectPoints[r].y
    }
    if (
      e & ConstantData.ExtraFlags.SEDE_FlipHoriz &&
      null != this.dataclass
    ) {
      switch (t = !0, this.dataclass) {
        case i.SED_S_ArrL:
          this.dataclass = i.SED_S_ArrR;
          break;
        case i.SED_S_ArrR:
          this.dataclass = i.SED_S_ArrL;
          break;
        case i.SED_S_Poly:
        case i.SED_S_MeasureArea:
          t = !1;
          break;
        default:
          this.extraflags = Utils2.SetFlag(
            this.extraflags,
            ConstantData.ExtraFlags.SEDE_FlipHoriz,
            0 == (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipHoriz)
          ),
            t = !1
      }
      if (
        t &&
        this.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        this.ConnectPoints
      ) for (a = this.ConnectPoints.length, r = 0; r < a; r++) this.ConnectPoints[r].x = n - this.ConnectPoints[r].x
    }
    GlobalData.optManager.SetLinkFlag(
      this.BlockID,
      ConstantData.LinkFlags.SED_L_MOVE | ConstantData.LinkFlags.SED_L_CHANGE
    ),
      this.hooks.length &&
      GlobalData.optManager.SetLinkFlag(this.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE),
      this.NeedsSIndentCount = !0,
      this.UpdateFrame(this.Frame),
      this.Resize(
        GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID),
        this.Frame,
        this
      )
  }

  RegenerateVectors(e, t) {
    var a,
      r,
      i,
      n,
      o = null;
    switch (i = this.shapeparam, this.dataclass) {
      case ConstantData.SDRShapeTypes.SED_S_Pgm:
        o = PolygonShapeGenerator.SED_S_Pgm(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Term:
        // o = ListManager.PolygonShapeGenerator.SED_S_Term(this.Frame, i);
        o = PolygonShapeGenerator.SED_S_Term(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Pent:
        (r = e / 2) &&
          (i = e / 2 * (i / r)),
          o = PolygonShapeGenerator.SED_S_Pent(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_PentL:
        (r = t / 2) &&
          (i = t / 2 * (i / r)),
          o = PolygonShapeGenerator.SED_S_PentL(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Hex:
        (r = t / 2) &&
          (i = t / 2 * (i / r)),
          o = PolygonShapeGenerator.SED_S_Hex(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Oct:
        (a = i * t) < (n = i * e) &&
          (n = a),
          t &&
          (n = t * (n / t)),
          i = n / e,
          a = n / t,
          o = PolygonShapeGenerator.SED_S_Oct(this.Frame, i, a);
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrR:
        o = PolygonShapeGenerator.SED_S_ArrR(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrL:
        o = PolygonShapeGenerator.SED_S_ArrL(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrT:
        o = PolygonShapeGenerator.SED_S_ArrT(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrB:
        o = PolygonShapeGenerator.SED_S_ArrB(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Trap:
        o = PolygonShapeGenerator.SED_S_Trap(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_TrapB:
        o = PolygonShapeGenerator.SED_S_TrapB(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Input:
        o = PolygonShapeGenerator.SED_S_Input(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Store:
        n = i,
          o = PolygonShapeGenerator.SED_S_Store(this.Frame, i, n);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Delay:
        o = PolygonShapeGenerator.SED_S_Delay(this.Frame, i);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Disp:
        o = PolygonShapeGenerator.SED_S_Disp(this.Frame, i)
    }
    var s = this.extraflags;
    return this.extraflags & (
      ConstantData.ExtraFlags.SEDE_FlipHoriz | ConstantData.ExtraFlags.SEDE_FlipVert
    ) &&
      o &&
      (o = GlobalData.optManager.FlipVertexArray(o, s)),
      o
  }

  Pr_PolyLGetParabolaAdjPoint(e, t) {
    return ListManager.PolyLine.prototype.Pr_PolyLGetParabolaAdjPoint.call(this, e, t)
  }

  Pr_PolyLGetArc(e, t) {
    return ListManager.PolyLine.prototype.Pr_PolyLGetArc.call(this, e, t)
  }

  Pr_PolyLGetParabolaParam(e, t) {
    ListManager.PolyLine.prototype.Pr_PolyLGetParabolaParam.call(this, e, t)
  }

  Pr_PolyLGetArcParam(e, t, a) {
    ListManager.PolyLine.prototype.Pr_PolyLGetArcParam.call(this, e, t, a)
  }

  Pr_PolyLGetArcQuadrant(e, t, a) {
    return ListManager.PolyLine.prototype.Pr_PolyLGetArcQuadrant.call(this, e, t, a)
  }

  ScaleObject(e, t, a, r, i, n, o) {
    var s = Utils1.DeepCopy(this.Frame);
    if (
      i &&
      n &&
      (s.x = e + s.x * i, s.y = t + s.y * n, s.width *= i, s.height *= n),
      this.rflags &&
      (
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !1
        )
      ),
      r
    ) {
      var l = {
        x: s.x + s.width / 2,
        y: s.y + s.height / 2
      },
        S = 2 * Math.PI * (r / 360),
        c = GlobalData.optManager.RotatePointAroundPoint(a, l, S);
      s.x = c.x - s.width / 2,
        s.y = c.y - s.height / 2,
        this.RotationAngle += r,
        this.RotationAngle >= 360 &&
        (this.RotationAngle -= 360)
    }
    if (o) {
      var u = i;
      n > u &&
        (u = n),
        this.StyleRecord.Line.Thickness = u * this.StyleRecord.Line.Thickness,
        this.StyleRecord.Line.BThick = u * this.StyleRecord.Line.BThick
    }
    this.UpdateFrame(s);
    var p = this.RegenerateVectors(s.width, s.height);
    p &&
      (this.VertexArray = p),
      this.polylist &&
      ListManager.PolyLine.prototype.ScaleObject.call(this, 0, 0, 0, 0, 0, 0),
      i &&
      n &&
      (
        this.sizedim.width = this.Frame.width,
        this.sizedim.height = this.Frame.height
      )
  }

  UpdateSecondaryDimensions(e, t, a) {
    //'use strict';
    var r,
      i = [],
      n = 0;
    if (
      (
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select

        // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always ||
        // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select

      ) &&
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowLineAngles &&
      this.polylist
    ) for (
        r = (
          i = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null)
        ).length,
        n = 1;
        n < r;
        n++
      ) this.DrawDimensionAngle(e, t, n, i)
  }

  SetSegmentAngle(e, t, a) {
    GlobalData.optManager.ShapeToPolyLine(this.BlockID, !1, !0),
      GlobalData.optManager.GetObjectPtr(this.BlockID, !1).SetSegmentAngle(e, t, a),
      GlobalData.optManager.PolyLineToShape(this.BlockID)
  }

  DimensionLineDeflectionAdjust(e, t, a, r, i) {
    if (!this.polylist) return ListManager.BaseShape.prototype.DimensionLineDeflectionAdjust.call(this, e, t, a, r, i);
    GlobalData.optManager.ShapeToPolyLine(this.BlockID, !1, !0),
      GlobalData.optManager.GetObjectPtr(this.BlockID, !1).DimensionLineDeflectionAdjust(e, t, a, r, i),
      GlobalData.optManager.PolyLineToShape(this.BlockID)
  }

  GetDimensionDeflectionValue(e) {
    return this.polylist ? !this.polylist ||
      !this.polylist.segs ||
      0 === this.polylist.segs.length ||
      e < 0 ||
      e >= this.polylist.segs.length ? void 0 : this.polylist.segs[e].dimDeflection : ListManager.BaseShape.prototype.GetDimensionDeflectionValue.call(this, e)
  }

  UpdateDimensionFromTextObj(e, t) {
    //'use strict';
    GlobalData.objectStore.PreserveBlock(this.BlockID);
    if (t) var a = t.text,
      r = t.userData;
    else a = e.GetText(),
      r = e.GetUserData();
    var i = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    if (r.angleChange) return this.UpdateLineAngleDimensionFromText(i, a, r),
      GlobalData.optManager.AddToDirtyList(this.BlockID),
      (this.Frame.x < 0 || this.Frame.y < 0) &&
      GlobalData.optManager.ScrollObjectIntoView(this.BlockID, !1),
      void GlobalData.optManager.CompleteOperation(null);
    this.polylist &&
      (this.extraflags & ConstantData.ExtraFlags.SEDE_SideKnobs) > 0 ? (
      GlobalData.optManager.ShapeToPolyLine(this.BlockID, !1, !0),
      GlobalData.optManager.GetObjectPtr(this.BlockID, !1).UpdateDimensionFromText(i, a, r),
      GlobalData.optManager.PolyLineToShape(this.BlockID)
    ) : ListManager.BaseShape.prototype.UpdateDimensionFromTextObj.call(this, e, t)
  }

  GetDimensionPoints() {
    var e;
    return this.polylist &&
      (this.extraflags & ConstantData.ExtraFlags.SEDE_SideKnobs) > 0 ? (
      e = Utils1.DeepCopy(this),
      (e = GlobalData.optManager.ShapeToPolyLine(this.BlockID, !1, !0, e)).GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null)
    ) : ListManager.BaseShape.prototype.GetDimensionPoints.call(this)
  }

  GetPolyRectangularInfo() {
    //'use strict';
    var e,
      t,
      a,
      r,
      i,
      n,
      o = [];
    if (!this.polylist) return null;
    if (
      o = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null),
      this.polylist.segs.length,
      5 != this.polylist.segs.length ||
      !this.polylist.closed
    ) return null;
    var s = [],
      l = o.length;
    for (r = 0; r < l; r++) r < l - 1 &&
      o[r].x == o[r + 1].x &&
      o[r].y == o[r + 1].y ||
      s.push(o[r]);
    return o = s,
      Utils2.IsRectangular(o) ? 5 != o.length ? null : (t = Utils2.GetDistanceBetween2Points(o[0], o[1])) / (a = Utils2.GetDistanceBetween2Points(o[2], o[3])) > 0.99 &&
        t / a < 1.01 &&
        (t = Utils2.GetDistanceBetween2Points(o[1], o[2])) / (a = Utils2.GetDistanceBetween2Points(o[3], o[4])) > 0.99 &&
        t / a < 1.01 ? (
        (
          e = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(o[0], o[1])
        ) < Math.PI / 4 ||
          e > 1.5 * Math.PI ||
          e > 0.75 * Math.PI &&
          e < 1.25 * Math.PI ? (i = 1, n = 2) : (i = 2, n = 1),
        {
          wdDim: i,
          htDim: n
        }
      ) : null : null
  }

  GetDimensionFloatingPointValue(e) {
    //'use strict';
    var t,
      a = 0;
    if (!this.polylist) return null;
    if (
      !(
        this.rflags & ConstantData.FloatingPointDim.SD_FP_Width ||
        this.rflags & ConstantData.FloatingPointDim.SD_FP_Height
      )
    ) return null;
    if (!(t = this.GetPolyRectangularInfo())) return null;
    if (t.wdDim === e || t.wdDim + 2 === e) {
      if (this.rflags & ConstantData.FloatingPointDim.SD_FP_Width) return a = this.GetDimensionLengthFromValue(this.rwd),
        this.GetLengthInRulerUnits(a)
    } else if (
      (t.htDim === e || t.htDim + 2 === e) &&
      this.rflags & ConstantData.FloatingPointDim.SD_FP_Height
    ) return a = this.GetDimensionLengthFromValue(this.rht),
      this.GetLengthInRulerUnits(a);
    return null
  }

  IsTextFrameOverlap(e, t) {
    //'use strict';
    var a,
      r,
      i;
    return !!this.polylist &&
      (
        i = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null),
        a = 360 - t,
        r = 2 * Math.PI * (a / 360),
        Utils3.RotatePointsAboutCenter(this.Frame, - r, i),
        Utils2.IsFrameCornersInPoly(i, e)
      )
  }

}

export default Polygon;
