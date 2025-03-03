
// import Basic from "./Basic.Index";
import HvacSVG from "../Helper/SVG.t2"
// import { RotatePoint } from "../Common";
import $ from "jquery";
// import GPP from "../gListManager";
// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import '../../app-t5/pathseg';
import "../Helper/pathseg"

import Container from "./Basic.Container";
import Global from "./Basic.Global"
import Creator from "./Basic.Path.Creator";
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"
import ConstantData1 from "../Data/ConstantData1"
import ConstantData2 from "../Data/ConstantData2"


class Path extends Container {

  public pathCreator: any;
  public pathElem: any;
  public arrowAreaElem: any;
  public arrowElems: any[];
  public sArrowRec: any;
  public eArrowRec: any;
  public origPathData: any;
  public sArrowSize: number;
  public eArrowSize: number;
  public sArrowDisp: boolean;
  public eArrowDisp: any;
  public sArrowMetrics: any;
  public eArrowMetrics: any;
  public arrowheadBounds: any;

  constructor() {
    super()
    this.pathCreator = null;
    this.svgObj = null;
    this.pathElem = null;
    this.arrowAreaElem = null;
    this.arrowElems = [];
    this.sArrowRec = null;
    this.eArrowRec = null;
    this.origPathData = null;
    this.strokeWidth = 0;
    this.sArrowSize = 0;
    this.eArrowSize = 0;
    this.sArrowDisp = !1;
    this.eArrowDisp = !1;
    this.sArrowMetrics = {};
    this.eArrowMetrics = {};
    this.arrowheadBounds = [];
  }

  // GetInstanceName(){
  //   return "Path";
  // }

  // Basic.Path.prototype = new Basic.Container,
  // Basic.Path.prototype.constructor = Basic.Path,
  CreateElement(svgDoc, parent) {
    // return this.svgObj = new HvacSVG.Container(HvacSVG.create('g')),
    //   this.pathElem = new HvacSVG.Path,
    //   this.svgObj.add(this.pathElem),
    //   this.arrowAreaElem = new HvacSVG.Container(HvacSVG.create('g')),
    //   this.svgObj.add(this.arrowAreaElem),
    //   this.InitElement(e, t),
    //   this.svgObj


    this.svgObj = new HvacSVG.Container(HvacSVG.create('g'));
    this.pathElem = new HvacSVG.Path;
    this.svgObj.add(this.pathElem);
    this.arrowAreaElem = new HvacSVG.Container(HvacSVG.create('g'));
    this.svgObj.add(this.arrowAreaElem);
    this.InitElement(svgDoc, parent);
    return this.svgObj;
  }


  SetArrowheads(sArrowRec, sArrowSize, eArrowRec, eArrowSize, sArrowDisp, eArrowDisp) {

    // //'use strict';
    // e
    // {
    //     "id": 32,
    //     "desc": "Slash",
    //     "defArea": {
    //         "width": 10,
    //         "height": 10
    //     },
    //     "endPt": {
    //         "x": 5,
    //         "y": 5
    //     },
    //     "attachPt": {
    //         "x": 5,
    //         "y": 5
    //     },
    //     "centered": false,
    //     "geometry": [
    //         {
    //             "type": "PATH",
    //             "filled": false,
    //             "stroke": 0.5,
    //             "pathData": [
    //                 [
    //                     "M",
    //                     0,
    //                     10
    //                 ],
    //                 [
    //                     "L",
    //                     10,
    //                     0
    //                 ]
    //             ]
    //         }
    //     ]
    // }

    // this.IsClosed() ||
    //   (
    //     this.sArrowRec = e,
    //     this.eArrowRec = a,
    //     this.sArrowSize = t,
    //     this.eArrowSize = r,
    //     this.sArrowDisp = i ||
    //     !1,
    //     this.eArrowDisp = n ||
    //     !1,
    //     this.UpdateArrowheads()
    //   )

    if (!this.IsClosed()) {
      this.sArrowRec = sArrowRec;
      this.eArrowRec = eArrowRec;
      this.sArrowSize = sArrowSize;
      this.eArrowSize = eArrowSize;
      this.sArrowDisp = sArrowDisp || false;
      this.eArrowDisp = eArrowDisp || false;
      this.UpdateArrowheads();
    }
  }


  SetStrokeWidth(stkWidth) {
    // //'use strict';
    // isNaN(e) &&
    //   'string' == typeof e &&
    //   (
    //     e = Basic.Symbol.ParsePlaceholder(e, Basic.Symbol.Placeholder.LineThick)
    //   ),
    //   e = Global.RoundCoord(e),
    //   this.pathElem.attr('stroke-width', e),
    //   this.strokeWidth = Number(e),
    //   this.pathElem.attr('stroke-dasharray', this.GetStrokePatternForWidth()),
    //   this.UpdateArrowheads()

    if (isNaN(stkWidth) && typeof stkWidth === 'string') {
      stkWidth = Basic.Symbol.ParsePlaceholder(stkWidth, Basic.Symbol.Placeholder.LineThick);
    }
    stkWidth = Global.RoundCoord(stkWidth);
    this.pathElem.attr('stroke-width', stkWidth);
    this.strokeWidth = Number(stkWidth);
    this.pathElem.attr('stroke-dasharray', this.GetStrokePatternForWidth());
    this.UpdateArrowheads();
  }


  SetStrokeColor(stkColor) {
    // //'use strict';
    // this.svgObj.attr('stroke', stkColor);
    // this.IsClosed() ||
    //   (this.svgObj.attr('fill', stkColor), this.pathElem.attr('fill', 'none')),
    //   this.ClearColorData(false)

    this.svgObj.attr('stroke', stkColor);
    if (!this.IsClosed()) {
      this.svgObj.attr('fill', stkColor);
      this.pathElem.attr('fill', 'none');
    }
    this.ClearColorData(false);
  }


  UpdatePattern(id, isFill) {

    // e == id
    // t == isFill

    // console.log('B111111 === Basic.Path.UpdatePattern === e, t', e, t)
    // //'use strict';
    // var a;
    // Basic.Element.prototype.UpdatePattern.call(this, e, t),
    //   t ||
    //   (
    //     a = this.svgObj.attr('stroke'),
    //     this.IsClosed() ||
    //     (this.svgObj.attr('fill', a), this.pathElem.attr('fill', 'none'))
    //   )


    console.log('B111111 === Basic.Path.UpdatePattern === e, t', id, isFill);

    // //'use strict';
    let strokeColor;
    Basic.Element.prototype.UpdatePattern.call(this, id, isFill);
    if (!isFill) {
      strokeColor = this.svgObj.attr('stroke');
      if (!this.IsClosed()) {
        this.svgObj.attr('fill', strokeColor);
        this.pathElem.attr('fill', 'none');
      }
    }
  }


  UpdateGradient(e, t) {
    console.log('B111111 === Basic.Path.UpdateGradient === e, t', e, t)
    //'use strict';
    var a;
    Basic.Element.prototype.UpdateGradient.call(this, e, t),
      t ||
      (
        a = this.svgObj.attr('stroke'),
        this.IsClosed() ||
        (this.svgObj.attr('fill', a), this.pathElem.attr('fill', 'none'))
      )
  }


  SetStrokePattern(dasharray) {
    // //'use strict';
    this.strokeDashArray = dasharray;
    this.pathElem.attr('stroke-dasharray', this.GetStrokePatternForWidth());
  }


  SetSize(e, t) {
  }


  GetArrowheadBounds() {
    // //'use strict';
    // return $.extend(!0, [], this.arrowheadBounds)

    // //'use strict';
    return $.extend(!0, [], this.arrowheadBounds);
  }


  UpdateArrowheads() {
    // //'use strict';
    // for (
    //   var e = this.sArrowRec,
    //   t = this.eArrowRec,
    //   a = this.sArrowSize,
    //   r = this.eArrowSize,
    //   i = null,
    //   n = null;
    //   this.arrowAreaElem.children().length;
    // ) this.arrowAreaElem.removeAt(0);
    // this.arrowElems.length = 0,
    //   this.arrowheadBounds = [],
    //   this.IsClosed() ||
    //   this.origPathData &&
    //   (
    //     this.pathElem.plot(this.origPathData),
    //     e ||
    //     t ||
    //     (e = this.EmptyArrowhead()),
    //     e &&
    //     (
    //       this.sArrowMetrics = this.CalcArrowheadDim(e, a, this.sArrowDisp)
    //     ),
    //     t &&
    //     (
    //       this.eArrowMetrics = this.CalcArrowheadDim(t, r, this.eArrowDisp)
    //     ),
    //     this.CalcArrowheadPlacement(e, t),
    //     e &&
    //     (
    //       i = this.CreateArrowheadElem(e, this.sArrowMetrics, !0, this.arrowheadBounds)
    //     ),
    //     t &&
    //     (
    //       n = this.CreateArrowheadElem(t, this.eArrowMetrics, !1, this.arrowheadBounds)
    //     ),
    //     e &&
    //     this.sArrowMetrics.trimAmount &&
    //     this.TrimPath('start', this.sArrowMetrics.trimAmount),
    //     t &&
    //     this.eArrowMetrics.trimAmount &&
    //     this.TrimPath('end', this.eArrowMetrics.trimAmount),
    //     i &&
    //     (this.arrowElems.push(i), this.arrowAreaElem.add(i)),
    //     n &&
    //     (this.arrowElems.push(n), this.arrowAreaElem.add(n))
    //   )







    // //'use strict';
    const sArrowRec = this.sArrowRec;
    const eArrowRec = this.eArrowRec;
    const sArrowSize = this.sArrowSize;
    const eArrowSize = this.eArrowSize;
    let sArrowElem = null;
    let eArrowElem = null;

    while (this.arrowAreaElem.children().length) {
      this.arrowAreaElem.removeAt(0);
    }

    this.arrowElems.length = 0;
    this.arrowheadBounds = [];

    if (!this.IsClosed() && this.origPathData) {
      this.pathElem.plot(this.origPathData);

      const sArrow = sArrowRec || this.EmptyArrowhead();
      const eArrow = eArrowRec || this.EmptyArrowhead();

      if (sArrow) {
        this.sArrowMetrics = this.CalcArrowheadDim(sArrow, sArrowSize, this.sArrowDisp);
      }

      if (eArrow) {
        this.eArrowMetrics = this.CalcArrowheadDim(eArrow, eArrowSize, this.eArrowDisp);
      }

      this.CalcArrowheadPlacement(sArrow, eArrow);

      if (sArrow) {
        sArrowElem = this.CreateArrowheadElem(sArrow, this.sArrowMetrics, true, this.arrowheadBounds);
      }

      if (eArrow) {
        eArrowElem = this.CreateArrowheadElem(eArrow, this.eArrowMetrics, false, this.arrowheadBounds);
      }

      if (sArrow && this.sArrowMetrics.trimAmount) {
        this.TrimPath('start', this.sArrowMetrics.trimAmount);
      }

      if (eArrow && this.eArrowMetrics.trimAmount) {
        this.TrimPath('end', this.eArrowMetrics.trimAmount);
      }

      if (sArrowElem) {
        this.arrowElems.push(sArrowElem);
        this.arrowAreaElem.add(sArrowElem);
      }

      if (eArrowElem) {
        this.arrowElems.push(eArrowElem);
        this.arrowAreaElem.add(eArrowElem);
      }
    }
  }


  CalcArrowheadDim(e, t, a) {
    //'use strict';
    var r,
      i,
      // n = {};
      // Double ====
      n = { width: 0, height: 0, scaleFactor: 0, attachX: 0, attachY: 0, endX: 0, endY: 0, trimAmount: 0 };
    return r = 2 * (this.strokeWidth + t),
      e.fixedSizeScale &&
      (r = this.strokeWidth * e.fixedSizeScale),
      i = r / e.defArea.height,
      n.width = e.defArea.width * i,
      n.height = r,
      n.scaleFactor = i,
      n.attachX = e.attachPt.x * i,
      n.attachY = e.attachPt.y * i,
      n.endX = e.endPt.x * i,
      n.endY = e.endPt.y * i,
      e.centered &&
      (n.endX = n.attachX, n.endY = n.attachY),
      n.trimAmount = n.endX - n.attachX,
      a &&
      !e.centered &&
      (n.trimAmount += 10),
      n
  }


  CreateArrowheadElem(e, t, a, r) {
    //'use strict';
    this.pathElem.attr('stroke');
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
      m = this.pathElem.attr('stroke-width'),
      C = this.svgObj.attr('stroke-opacity'),
      y = {
        x: t.offsetX,
        y: t.offsetY
      },
      f = t.rotatePt,
      L = t.angle,
      I = t.scaleFactor,
      T = e.geometry;
    for (
      isNaN(m) &&
      (
        m = Number(
          Basic.Symbol.ParsePlaceholder(m, Basic.Symbol.Placeholder.LineThick)
        )
      ),
      isNaN(C) &&
      (C = 1),
      (u = new HvacSVG.Container(HvacSVG.create('g'))).parts = [],
      a &&
      e.flippedGeometry &&
      (T = e.flippedGeometry),
      i = 0;
      i < T.length;
      i++
    ) {
      switch (g = !1, T[i].type) {
        case 'RECT':
          h = new HvacSVG.Path,
            d = 'M',
            o = T[i].pathData.x * I + y.x,
            s = T[i].pathData.y * I + y.y,
            l = T[i].pathData.width * I,
            S = T[i].pathData.height * I,
            c = Utils1.RotatePoint(f, {
              x: o,
              y: s
            }, L),
            d += Global.RoundCoord(c.x) + ',' + Global.RoundCoord(c.y) + 'L',
            c = Utils1.RotatePoint(f, {
              x: o + l,
              y: s
            }, L),
            d += Global.RoundCoord(c.x) + ',' + Global.RoundCoord(c.y) + 'L',
            c = Utils1.RotatePoint(f, {
              x: o + l,
              y: s + S
            }, L),
            d += Global.RoundCoord(c.x) + ',' + Global.RoundCoord(c.y) + 'L',
            c = Utils1.RotatePoint(f, {
              x: o,
              y: s + S
            }, L),
            d += Global.RoundCoord(c.x) + ',' + Global.RoundCoord(c.y) + 'z',
            h.plot(d),
            g = !0;
          break;
        case 'OVAL':
          h = new HvacSVG.Path,
            d = 'M',
            o = T[i].pathData.x * I + y.x,
            s = T[i].pathData.y * I + y.y,
            l = T[i].pathData.width * I / 2,
            c = Utils1.RotatePoint(f, {
              x: o,
              y: (s += S = T[i].pathData.height * I / 2) - 0.5
            }, L),
            d += Global.RoundCoord(c.x) + ',' + Global.RoundCoord(c.y) + 'A',
            d += Global.RoundCoord(l) + ',' + Global.RoundCoord(S) + ' ' + Global.RoundCoord(L) + ' 1 1 ',
            c = Utils1.RotatePoint(f, {
              x: o,
              y: s + 0.5
            }, L),
            d += Global.RoundCoord(c.x) + ',' + Global.RoundCoord(c.y) + 'z',
            h.plot(d),
            g = !0;
          break;
        case 'PATH':
          if (h = new HvacSVG.Path, d = '', p = T[i].pathData, !Array.isArray(p)) continue;
          for (n = 0; n < p.length; n++) {
            if (D = p[n], !Array.isArray(D) || D.length < 1) {
              d = '';
              break
            }
            switch (D[0]) {
              case 'M':
              case 'L':
                if (D.length < 3) break;
                c = Utils1.RotatePoint(f, {
                  x: o = D[1] * I + y.x,
                  y: s = D[2] * I + y.y
                }, L),
                  d += D[0] + Global.RoundCoord(c.x) + ',' + Global.RoundCoord(c.y);
                break;
              case 'A':
                if (D.length < 8) break;
                o = D[6] * I + y.x,
                  s = D[7] * I + y.y,
                  l = D[1] * I,
                  S = D[2] * I,
                  c = Utils1.RotatePoint(f, {
                    x: o,
                    y: s
                  }, L),
                  d += 'A' + Global.RoundCoord(l) + ',' + Global.RoundCoord(S) + ' ' + Global.RoundCoord(D[3] + L),
                  d += ' ' + D[4] + ' ' + D[5] + ' ' + Global.RoundCoord(c.x) + ',' + Global.RoundCoord(c.y);
                break;
              case 'z':
                d += 'z',
                  g = !0
            }
          }
          h.plot(d);
          break;
        default:
          h = null
      }
      T[i].noWhiteFill &&
        (g = !1),
        h &&
        (
          u.add(h),
          u.parts.push({
            elem: h,
            filled: T[i].filled
          }),
          T[i].filled ? (h.attr('stroke', 'none'), h.attr('fill-opacity', C)) : (
            h.attr('stroke-width', m * T[i].stroke),
            g ? (h.attr('fill-opacity', 1), h.attr('fill', '#FFFFFF')) : h.attr('fill', 'none')
          )
        )
    }
    if (u.attr('stroke-dasharray', 'none'), r && 'empty' !== e.desc) {
      var b,
        M,
        P,
        R;
      if (o = y.x, s = y.y, l = e.defArea.width * I, S = e.defArea.height * I, L) b = P = (c = Utils1.RotatePoint(f, {
        x: o,
        y: s
      }, L)).x,
        M = R = c.y,
        b = (c = Utils1.RotatePoint(f, {
          x: o + l,
          y: s
        }, L)).x < b ? c.x : b,
        P = c.x > P ? c.x : P,
        M = c.y < M ? c.y : M,
        R = c.y > R ? c.y : R,
        b = (c = Utils1.RotatePoint(f, {
          x: o,
          y: s + S
        }, L)).x < b ? c.x : b,
        P = c.x > P ? c.x : P,
        M = c.y < M ? c.y : M,
        R = c.y > R ? c.y : R,
        b = (c = Utils1.RotatePoint(f, {
          x: o + l,
          y: s + S
        }, L)).x < b ? c.x : b,
        P = c.x > P ? c.x : P,
        o = b,
        s = M = c.y < M ? c.y : M,
        l = P - b,
        S = (R = c.y > R ? c.y : R) - M;
      r.push({
        x: o,
        y: s,
        width: l,
        height: S
      })
    }
    return u
  }


  CalcArrowheadPlacement(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S;
    (e || t) &&
      (
        a = this.pathElem.node.getTotalLength(),
        n = this.pathElem.node.getPointAtLength(0),
        o = this.pathElem.node.getPointAtLength(a),
        (r = e ? this.sArrowMetrics.trimAmount : 0) + (i = t ? this.eArrowMetrics.trimAmount : 0) >= a &&
        (
          S = l = this.pathElem.node.getPointAtLength(a / 2),
          r &&
            i ? (
            this.sArrowMetrics.trimAmount = a / 2,
            this.eArrowMetrics.trimAmount = a / 2,
            r = i = a / 2
          ) : r ? (this.sArrowMetrics.trimAmount = a, r = a) : (this.eArrowMetrics.trimAmount = a, i = a)
        ),
        e &&
        (
          l = e.centered ? this.pathElem.node.getPointAtLength(a / 2) : this.pathElem.node.getPointAtLength(r)
        ),
        t &&
        (
          S = t.centered ? this.pathElem.node.getPointAtLength(a / 2) : this.pathElem.node.getPointAtLength(a - i)
        ),
        e &&
        (
          s = l.x === n.x &&
            l.y === n.y ? a < 2 ? {
              x: n.x + 2,
              y: n.y
            }
            : this.pathElem.node.getPointAtLength(2) : l,
          e.centered &&
          a >= 4 &&
          (n = this.pathElem.node.getPointAtLength(a / 2 - 2)),
          e.noRotate ? this.sArrowMetrics.angle = 0 : this.sArrowMetrics.angle = Utils1.CalcAngleFromPoints(s, n),
          this.sArrowMetrics.rotatePt = l,
          this.sArrowMetrics.offsetX = l.x - this.sArrowMetrics.attachX,
          this.sArrowMetrics.offsetY = l.y - this.sArrowMetrics.attachY
        ),
        t &&
        (
          s = S.x === o.x &&
            S.y === o.y ? a < 2 ? {
              x: o.x - 2,
              y: o.y
            }
            : this.pathElem.node.getPointAtLength(a - 2) : S,
          t.centered &&
          a >= 4 &&
          (o = this.pathElem.node.getPointAtLength(a / 2 + 2)),
          t.noRotate ? this.eArrowMetrics.angle = 0 : this.eArrowMetrics.angle = Utils1.CalcAngleFromPoints(s, o),
          this.eArrowMetrics.rotatePt = S,
          this.eArrowMetrics.offsetX = S.x - this.eArrowMetrics.attachX,
          this.eArrowMetrics.offsetY = S.y - this.eArrowMetrics.attachY
        )
      )
  }


  EmptyArrowhead() {
    return {
      id: 0,
      desc: 'empty',
      defArea: {
        width: 10,
        height: 10
      },
      endPt: {
        x: 5,
        y: 5
      },
      attachPt: {
        x: 5,
        y: 5
      },
      centered: !1,
      noRotate: !0,
      geometry: [
        {
          type: 'RECT',
          filled: !1,
          noWhiteFill: !0,
          stroke: 0,
          pathData: {
            x: 0,
            y: 0,
            width: 10,
            height: 10
          }
        }
      ]
    }
  }


  TrimPath(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S = this.pathElem.node.pathSegList.numberOfItems,
      c = this.pathElem.node.getTotalLength(),
      u = {
        x: 0,
        y: 0
      };
    if (t) if (t >= c) this.pathElem.plot();
    else if (
      s = 'start' === e ? t : c - t,
      i = this.pathElem.node.getPathSegAtLength(s),
      l = this.pathElem.node.getPointAtLength(s),
      l = {
        x: Global.RoundCoord(l.x),
        y: Global.RoundCoord(l.y)
      },
      a = this.pathElem.node.pathSegList.getItem(i),
      'start' === e
    ) {
      for (
        (o = this.IsSegmentAbs(a)) ||
        (
          (u = this.CalcSegEndpoint(this.pathElem, i)).x = Global.RoundCoord(u.x),
          u.y = Global.RoundCoord(u.y)
        ),
        n = 1;
        n < i;
        n++
      ) this.pathElem.node.pathSegList.removeItem(1);
      if (
        r = this.pathElem.node.createSVGPathSegMovetoAbs(l.x, l.y),
        this.pathElem.node.pathSegList.replaceItem(r, 0),
        !o
      ) {
        switch (a.pathSegType) {
          case ConstantData2.SVGPathSeg.PATHSEG_LINETO_ABS:
          case ConstantData2.SVGPathSeg.PATHSEG_LINETO_REL:
          case ConstantData2.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
          case ConstantData2.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
          case ConstantData2.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
          case ConstantData2.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
            r = this.pathElem.node.createSVGPathSegLinetoAbs(u.x, u.y);
            break;
          case ConstantData2.SVGPathSeg.PATHSEG_ARC_ABS:
          case ConstantData2.SVGPathSeg.PATHSEG_ARC_REL:
            r = this.pathElem.node.createSVGPathSegArcAbs(u.x, u.y, a.r1, a.r2, a.angle, a.largeArcFlag, a.sweepFlag);
            break;
          default:
            r = null
        }
        r &&
          this.pathElem.node.pathSegList.replaceItem(r, 1)
      }
    } else {
      for (n = i + 1; n < S; n++) this.pathElem.node.pathSegList.removeItem(i + 1);
      switch (a.pathSegType) {
        case ConstantData2.SVGPathSeg.PATHSEG_LINETO_ABS:
        case ConstantData2.SVGPathSeg.PATHSEG_LINETO_REL:
        case ConstantData2.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
        case ConstantData2.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
        case ConstantData2.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
        case ConstantData2.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
          r = this.pathElem.node.createSVGPathSegLinetoAbs(l.x, l.y);
          break;
        case ConstantData2.SVGPathSeg.PATHSEG_ARC_ABS:
        case ConstantData2.SVGPathSeg.PATHSEG_ARC_REL:
          r = this.pathElem.node.createSVGPathSegArcAbs(l.x, l.y, a.r1, a.r2, a.angle, a.largeArcFlag, a.sweepFlag);
          break;
        default:
          r = null
      }
      r &&
        this.pathElem.node.pathSegList.replaceItem(r, i)
    }
  }


  CalcSegEndpoint(e, t) {
    //'use strict';
    var a,
      r,
      i = {
        x: 0,
        y: 0
      };
    for (r = 0; r <= t; r++) switch ((a = e.node.pathSegList.getItem(r)).pathSegType) {
      case ConstantData2.SVGPathSeg.PATHSEG_MOVETO_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_LINETO_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_ARC_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
        void 0 !== a.x &&
          (i.x = a.x),
          void 0 !== a.y &&
          (i.y = a.y);
        break;
      case ConstantData2.SVGPathSeg.PATHSEG_MOVETO_REL:
        0 === r ? (i.x = a.x, i.y = a.y) : (i.x += a.x, i.y += a.y);
        break;
      default:
        void 0 !== a.x &&
          (i.x += a.x),
          void 0 !== a.y &&
          (i.y += a.y)
    }
    return i
  }


  GetGeometryBBox() {
    //'use strict';
    if (this.geometryBBox.width < 0 || this.geometryBBox.height < 0) {
      var e,
        t,
        a = this.doc.GetFormattingLayer();
      (t = new HvacSVG.Path).plot(this.origPathData),
        a.svgObj.add(t),
        e = t.node.getBBox(),
        a.svgObj.remove(t),
        this.geometryBBox.x = e.x,
        this.geometryBBox.y = e.y,
        this.geometryBBox.width = e.width,
        this.geometryBBox.height = e.height
    }
    return this.geometryBBox
  }


  IsSegmentAbs(e) {
    //'use strict';
    var t = !1;
    switch (e.pathSegType) {
      case ConstantData2.SVGPathSeg.PATHSEG_MOVETO_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_LINETO_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_ARC_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
      case ConstantData2.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
        t = !0
    }
    return t
  }


  IsClosed() {
    // //'use strict';
    // var e;
    // return !((e = this.pathElem.node.pathSegList.numberOfItems) < 1) &&
    //   this.pathElem.node.pathSegList.getItem(e - 1).pathSegType === ConstantData2.SVGPathSeg.PATHSEG_CLOSEPATH
    const numberOfItems = this.pathElem.node.pathSegList.numberOfItems;
    if (numberOfItems < 1) {
      return false;
    }
    const lastSegment = this.pathElem.node.pathSegList.getItem(numberOfItems - 1);
    return lastSegment.pathSegType === ConstantData2.SVGPathSeg.PATHSEG_CLOSEPATH;
  }


  // SetPath(e, t) {
  //   // //'use strict';
  //   this.origPathData = e,
  //     this.pathElem.plot(e),
  //     this.UpdateArrowheads(),
  //     this.UpdateTransform(),
  //     t ? (
  //       this.geometryBBox.x = t.x,
  //       this.geometryBBox.y = t.y,
  //       this.geometryBBox.width = t.width,
  //       this.geometryBBox.height = t.height
  //     ) : (this.geometryBBox.width = - 1, this.geometryBBox.height = - 1),
  //     this.RefreshPaint()
  // }


  SetPath(pathData, bbox) {
    // //'use strict';
    //debugger
    this.origPathData = pathData;
    this.pathElem.plot(pathData);
    this.UpdateArrowheads();
    this.UpdateTransform();
    if (bbox) {
      this.geometryBBox.x = bbox.x;
      this.geometryBBox.y = bbox.y;
      this.geometryBBox.width = bbox.width;
      this.geometryBBox.height = bbox.height;
    } else {
      this.geometryBBox.width = -1;
      this.geometryBBox.height = -1;
    }
    this.RefreshPaint();
  }




  // PathCreator() {
  //   //'use strict';
  //   return this.pathCreator ||
  //     (this.pathCreator = new Creator(this)),
  //     this.pathCreator
  // }

  PathCreator() {
    if (!this.pathCreator) {
      this.pathCreator = new Creator(this);
    }
    return this.pathCreator;
  }

}

export default Path

// export default Basic.Path;
