



// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import Basic from "./Basic.Index";
// import GPP from "../gListManager";
import $ from 'jquery';
import HvacSVG from "../Helper/SVG.t2"

import Global from "./Basic.Global";


import Path from "./Basic.Path";
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"


class PolyPolyLine extends Path {

  public pList: any;

  constructor() {
    super();
    this.pList = [];
    this.arrowElems = [];
  }

  // GetInstanceName(){
  //   return "PolyPolyLine";
  // }

  // Basic.PolyPolyLine = function () {
  //   //'use strict';
  //   this.pList = [],
  //     this.arrowElems = []
  // // },
  //   Basic.PolyPolyLine.prototype = new Basic.Path,
  //   Basic.PolyPolyLine.prototype.constructor = Basic.PolyPolyLine,
  Clear() {
    //'use strict';
    this.pList = [],
      this.BuildPath()
  }

  AddPolyLine(e, t, a) {
    //'use strict';
    this.pList.push({
      points: e,
      sArrowFlag: t,
      eArrowFlag: a
    })
  }

  BuildPath() {
    //'use strict';
    for (
      var e,
      t,
      a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c = this.PathCreator(),
      u = null,
      p = {
        x: 0,
        y: 0
      },
      d = {
        x: 0,
        y: 0
      },
      D = !0,
      g = !0;
      this.arrowAreaElem.children().length;
    ) this.arrowAreaElem.removeAt(0);
    for (
      this.arrowElems.length = 0,
      c.BeginPath(),
      this.arrowheadBounds = [],
      a = this.pList.length,
      e = 0;
      e < a;
      e++
    ) {
      for (i = null, n = null, r = this.pList[e].points.length, t = 0; t < r - 1; t++) s = 0 === t,
        l = t === r - 2,
        u = this.pList[e].points[t],
        o = this.pList[e].points[t + 1],
        s &&
        this.pList[e].sArrowFlag &&
        this.sArrowRec &&
        (
          (i = {}).arrowRec = this.sArrowRec,
          i.arrowSize = this.sArrowSize,
          i.arrowDisp = this.sArrowDisp
        ),
        l &&
        this.pList[e].eArrowFlag &&
        this.eArrowRec &&
        (
          (n = {}).arrowRec = this.eArrowRec,
          n.arrowSize = this.eArrowSize,
          n.arrowDisp = this.eArrowDisp
        ),
        (i || n) &&
        (this.GenerateArrowheads(u, o, i, n), g = !1),
        D ? (
          p.x = Math.min(u.x, o.x),
          p.y = Math.min(u.y, o.y),
          d.x = Math.max(u.x, o.x),
          d.y = Math.max(u.y, o.y)
        ) : (
          p.x = Math.min(p.x, u.x, o.x),
          p.y = Math.min(p.y, u.y, o.y),
          d.x = Math.max(d.x, u.x, o.x),
          d.y = Math.max(d.y, u.y, o.y)
        ),
        D = !1,
        i &&
        (u = i.segPt),
        n &&
        (o = n.segPt),
        s ? c.MoveTo(u.x, u.y) : l ||
          c.LineTo(u.x, u.y),
        l &&
        c.LineTo(o.x, o.y);
      i &&
        (
          this.arrowAreaElem.add(i.arrowElem),
          this.arrowElems.push(i.arrowElem)
        ),
        n &&
        (
          this.arrowAreaElem.add(n.arrowElem),
          this.arrowElems.push(n.arrowElem)
        )
    }
    g &&
      u &&
      (
        (i = {}).arrowRec = this.EmptyArrowhead(),
        i.arrowSize = this.sArrowSize,
        i.arrowDisp = !1,
        this.GenerateArrowheads(u, o, i, null),
        this.arrowAreaElem.add(i.arrowElem),
        this.arrowElems.push(i.arrowElem)
      ),
      S = c.ToString(),
      this.origPathData = S,
      this.pathElem.plot(S),
      this.UpdateTransform(),
      this.geometryBBox.x = p.x,
      this.geometryBBox.y = p.y,
      this.geometryBBox.width = d.x - p.x,
      this.geometryBBox.height = d.y - p.y,
      this.RefreshPaint()
  }

  UpdateArrowheads() {
    //'use strict';
    this.BuildPath()
  }

  GenerateArrowheads(e, t, a, r) {
    //'use strict';
    var i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p = null,
      d = null;
    (a || r) &&
      (
        a &&
        (
          a.segPt = {
            x: e.x,
            y: e.y
          },
          a.attachPt = {
            x: e.x,
            y: e.y
          },
          a.offset = {
            x: e.x,
            y: e.y
          },
          a.arrowElem = null,
          a.angle = 180
        ),
        r &&
        (
          r.segPt = {
            x: t.x,
            y: t.y
          },
          r.attachPt = {
            x: t.x,
            y: t.y
          },
          r.offset = {
            x: t.x,
            y: t.y
          },
          r.arrowElem = null,
          r.angle = 0
        ),
        l = t.x - e.x,
        S = t.y - e.y,
        i = Math.sqrt(l * l + S * S),
        a &&
        (p = this.CalcArrowheadDim(a.arrowRec, a.arrowSize, a.arrowDisp)),
        r &&
        (d = this.CalcArrowheadDim(r.arrowRec, r.arrowSize, r.arrowDisp)),
        (s = (n = p ? p.trimAmount : 0) + (o = d ? d.trimAmount : 0)) > i &&
        (n = n / s * i, o = o / s * i),
        i &&
        (
          c = l / i,
          u = S / i,
          p &&
          (
            a.segPt.x = e.x + n * c,
            a.segPt.y = e.y + n * u,
            a.arrowRec.centered ? (a.attachPt.x = e.x + i / 2 * c, a.attachPt.y = e.y + i / 2 * u) : (a.attachPt.x = a.segPt.x, a.attachPt.y = a.segPt.y),
            a.arrowRec.noRotate ? a.angle = 0 : a.angle = Utils1.CalcAngleFromPoints(t, e),
            a.offset.x = a.attachPt.x - p.attachX,
            a.offset.y = a.attachPt.y - p.attachY
          ),
          d &&
          (
            r.segPt.x = e.x + (i - o) * c,
            r.segPt.y = e.y + (i - o) * u,
            r.arrowRec.centered ? (r.attachPt.x = e.x + i / 2 * c, r.attachPt.y = e.y + i / 2 * u) : (r.attachPt.x = r.segPt.x, r.attachPt.y = r.segPt.y),
            r.arrowRec.noRotate ? r.angle = 0 : r.angle = Utils1.CalcAngleFromPoints(e, t),
            r.offset.x = r.attachPt.x - d.attachX,
            r.offset.y = r.attachPt.y - d.attachY
          )
        ),
        p &&
        (
          p.offsetX = a.offset.x,
          p.offsetY = a.offset.y,
          p.angle = a.angle,
          p.rotatePt = a.attachPt,
          a.arrowElem = this.CreateArrowheadElem(a.arrowRec, p, !0, this.arrowheadBounds)
        ),
        d &&
        (
          d.offsetX = r.offset.x,
          d.offsetY = r.offset.y,
          d.angle = r.angle,
          d.rotatePt = r.attachPt,
          r.arrowElem = this.CreateArrowheadElem(r.arrowRec, d, !1, this.arrowheadBounds)
        )
      )
  }

}




export default PolyPolyLine;
