

import Utils2 from "./Utils2"
import ListManager from "../Data/ListManager"
import SegmentData from '../Model/SegmentData'
import ConstantData from "../Data/ConstantData"

class Utils3 {

  static LineDStyleHit(e, t, a, r, i) {
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
      f = - 1,
      L = 0,
      I = {};
    for (c = a + 12 + r, u = e.length, y = 0; y < u - 1; y++) I = Utils2.Pt2Rect(e[y], e[y + 1]),
      Utils2.InflateRect(I, c, c),
      Utils2.pointInRect(I, t) &&
      (
        e[y].x === e[y + 1].x ? (
          I = e[y].y < e[y + 1].y ? Utils2.SetRect(e[y].x - c, e[y].y, e[y].x + c, e[y + 1].y) : Utils2.SetRect(e[y].x - c, e[y + 1].y, e[y].x + c, e[y].y),
          Utils2.pointInRect(I, t) &&
          (L = ConstantData.HitCodes.SED_Border, f = y, m = e[y].x, C = t.y)
        ) : e[y].y == e[y + 1].y ? (
          I = e[y].x < e[y + 1].x ? Utils2.SetRect(e[y].x, e[y].y - c, e[y + 1].x, e[y].y + c) : Utils2.SetRect(e[y + 1].x, e[y].y - c, e[y].x, e[y].y + c),
          Utils2.pointInRect(I, t) &&
          (L = ConstantData.HitCodes.SED_Border, f = y, C = e[y].y, m = t.x)
        ) : (
          D = Math.abs(e[y].x - e[y + 1].x),
          g = Math.abs(e[y].y - e[y + 1].y),
          h = Utils2.sqrt(g * g + D * D),
          d = t.x - e[y].x,
          g / D < 1 ? (
            e[y].x <= e[y + 1].x ? (s = e[y].y, l = e[y + 1].y) : (l = e[y].y, s = e[y + 1].y, d = t.x - e[y + 1].x),
            o = s > l ? s - g * d / D : s + g * d / D,
            p = (D ? h / D : 1) * c,
            t.y <= o + p &&
            t.y >= o - p &&
            (L = ConstantData.HitCodes.SED_Border, f = y, C = o, m = t.x)
          ) : (
            e[y].x <= e[y + 1].x ? (s = e[y].y, l = e[y + 1].y, S = e[y].x) : (l = e[y].y, s = e[y + 1].y, S = e[y + 1].x),
            n = s > l ? S + D * (s - t.y) / g : S + D * (t.y - s) / g,
            p = (g ? h / g : 1) * c,
            t.x <= n + p &&
            t.x >= n - p &&
            (L = ConstantData.HitCodes.SED_Border, f = y, m = n, C = t.y)
          )
        )
      );
    return void 0 !== m &&
      (t.x = m),
      void 0 !== C &&
      (t.y = C),
      i &&
      (i.lpHit = f),
      L
  }

  static CloneToDoc(e, t) {
    for (
      var a = document.createElementNS(e.namespaceURI, e.nodeName),
      r = 0,
      i = e.attributes.length;
      r < i;
      ++r
    ) {
      var n = e.attributes[r],
        o = n.nodeName;
      o.length &&
        (
          o[0] >= 'A' &&
          o[0] <= 'Z' &&
          (o = o.toLowerCase()),
          t ? '' !== n.nodeValue &&
            'xmlns' != o &&
            a.setAttribute(o, n.nodeValue) : '' !== n.nodeValue &&
          a.setAttribute(o, n.nodeValue)
        )
    }
    for (r = 0, i = e.childNodes.length; r < i; ++r) {
      var s = e.childNodes[r];
      1 == s.nodeType ? a.insertBefore(this.CloneToDoc(s, t), null) : a.insertBefore(document.createTextNode(s.nodeValue), null)
    }
    return a
  }

  static XML2Str(e) {
    try {
      return (new XMLSerializer).serializeToString(e)
    } catch (t) {
      try {
        return e.xml
      } catch (e) {
        throw e;
      }
    }
    return !1
  }

  static StrEscapeRegExp(e) {
    return e.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, '\\$1')
  }

  static StrReplaceAll(e, t, a) {
    return a.replace(new RegExp(this.StrEscapeRegExp(e), 'g'), t)
  }

  static RotatePointsAboutPoint(center, angle, points) {
    if (angle === 0) return;

    const sinAngle = Math.sin(angle);
    const cosAngle = Math.cos(angle);

    const adjustedCosAngle = Math.abs(cosAngle) < 0.0001 ? 0 : cosAngle;
    const adjustedSinAngle = Math.abs(sinAngle) < 0.0001 ? 0 : sinAngle;

    for (let i = 0; i < points.length; i++) {
      const dx = points[i].x - center.x;
      const dy = points[i].y - center.y;

      points[i].x = dx * adjustedCosAngle + dy * adjustedSinAngle + center.x;
      points[i].y = -dx * adjustedSinAngle + dy * adjustedCosAngle + center.y;
    }
  }

  static RotatePointsAboutCenter(frame, angle, points) {

    var center = { x: 0, y: 0 };

    if (angle !== 0) {
      center.x = (frame.x + frame.x + frame.width) / 2;
      center.y = (frame.y + frame.y + frame.height) / 2;
      Utils3.RotatePointsAboutPoint(center, angle, points);
    }
  }
}

export default Utils3
