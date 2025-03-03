

import Utils2 from "./Utils2"
import ListManager from "../Data/ListManager"
import SegmentData from '../Model/SegmentData'
import ConstantData from "../Data/ConstantData"

class Utils3 {

  /*
  static LineDStyleHit = function (points, targetPoint, lineWidth, hitPadding, hitInfo) {
    let rect, distance, slope, hypotenuse, deltaX, deltaY, adjustedX, adjustedY, hitCode = -1, hitIndex = 0, hitPoint = {};
    const inflatedPadding = lineWidth + 12 + hitPadding;
    const pointsLength = points.length;

    for (let i = 0; i < pointsLength - 1; i++) {
      rect = Utils2.Pt2Rect(points[i], points[i + 1]);
      Utils2.InflateRect(rect, inflatedPadding, inflatedPadding);

      if (Utils2.pointInRect(rect, targetPoint)) {
        if (points[i].x === points[i + 1].x) {
          rect = points[i].y < points[i + 1].y ?
            Utils2.SetRect(points[i].x - inflatedPadding, points[i].y, points[i].x + inflatedPadding, points[i + 1].y) :
            Utils2.SetRect(points[i].x - inflatedPadding, points[i + 1].y, points[i].x + inflatedPadding, points[i].y);

          if (Utils2.pointInRect(rect, targetPoint)) {
            hitCode = ConstantData.HitCodes.SED_Border;
            hitIndex = i;
            adjustedX = points[i].x;
            adjustedY = targetPoint.y;
          }
        } else if (points[i].y === points[i + 1].y) {
          rect = points[i].x < points[i + 1].x ?
            Utils2.SetRect(points[i].x, points[i].y - inflatedPadding, points[i + 1].x, points[i].y + inflatedPadding) :
            Utils2.SetRect(points[i + 1].x, points[i].y - inflatedPadding, points[i].x, points[i].y + inflatedPadding);

          if (Utils2.pointInRect(rect, targetPoint)) {
            hitCode = ConstantData.HitCodes.SED_Border;
            hitIndex = i;
            adjustedY = points[i].y;
            adjustedX = targetPoint.x;
          }
        } else {
          deltaX = Math.abs(points[i].x - points[i + 1].x);
          deltaY = Math.abs(points[i].y - points[i + 1].y);
          hypotenuse = Utils2.sqrt(deltaY * deltaY + deltaX * deltaX);
          distance = targetPoint.x - points[i].x;

          if (deltaY / deltaX < 1) {
            if (points[i].x <= points[i + 1].x) {
              slope = points[i].y;
              adjustedY = points[i + 1].y;
            } else {
              adjustedY = points[i].y;
              slope = points[i + 1].y;
              distance = targetPoint.x - points[i + 1].x;
            }

            adjustedY = slope > adjustedY ? slope - deltaY * distance / deltaX : slope + deltaY * distance / deltaX;
            hitPadding = (deltaX ? hypotenuse / deltaX : 1) * inflatedPadding;

            if (targetPoint.y <= adjustedY + hitPadding && targetPoint.y >= adjustedY - hitPadding) {
              hitCode = ConstantData.HitCodes.SED_Border;
              hitIndex = i;
              adjustedY = adjustedY;
              adjustedX = targetPoint.x;
            }
          } else {
            if (points[i].x <= points[i + 1].x) {
              slope = points[i].y;
              adjustedY = points[i + 1].y;
              adjustedX = points[i].x;
            } else {
              adjustedY = points[i].y;
              slope = points[i + 1].y;
              adjustedX = points[i + 1].x;
            }

            adjustedX = slope > adjustedY ? adjustedX + deltaX * (slope - targetPoint.y) / deltaY : adjustedX + deltaX * (targetPoint.y - slope) / deltaY;
            hitPadding = (deltaY ? hypotenuse / deltaY : 1) * inflatedPadding;

            if (targetPoint.x <= adjustedX + hitPadding && targetPoint.x >= adjustedX - hitPadding) {
              hitCode = ConstantData.HitCodes.SED_Border;
              hitIndex = i;
              adjustedX = adjustedX;
              adjustedY = targetPoint.y;
            }
          }
        }
      }
    }

    if (adjustedX !== undefined) {
      targetPoint.x = adjustedX;
    }
    if (adjustedY !== undefined) {
      targetPoint.y = adjustedY;
    }
    if (hitInfo) {
      hitInfo.lpHit = hitIndex;
    }
    return hitCode;
  }
  */

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
        // alert('Xmlserializer not supported')
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


  // OptHandler.prototype.RotatePointsAboutPoint = function (center, angle, points) {
  //   if (angle === 0) return;

  //   const sinAngle = Math.sin(angle);
  //   const cosAngle = Math.cos(angle);

  //   const adjustedCosAngle = Math.abs(cosAngle) < 0.0001 ? 0 : cosAngle;
  //   const adjustedSinAngle = Math.abs(sinAngle) < 0.0001 ? 0 : sinAngle;

  //   for (let i = 0; i < points.length; i++) {
  //     const dx = points[i].x - center.x;
  //     const dy = points[i].y - center.y;

  //     points[i].x = dx * adjustedCosAngle + dy * adjustedSinAngle + center.x;
  //     points[i].y = -dx * adjustedSinAngle + dy * adjustedCosAngle + center.y;
  //   }
  // }

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
    // e t a
    // e = frame
    // t =angle
    // a = points

    var center = { x: 0, y: 0 };

    if (angle !== 0) {


      center.x = (frame.x + frame.x + frame.width) / 2;
      center.y = (frame.y + frame.y + frame.height) / 2;

      // e t a = center, angle, points
      Utils3.RotatePointsAboutPoint(center, angle, points);

    }
  }











}

export default Utils3
