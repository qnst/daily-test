

import NvConstant from '../../Data/Constant/NvConstant';
import OptConstant from "../../Data/Constant/OptConstant";
import Instance from '../../Data/Instance/Instance';
import T3Gv from '../../Data/T3Gv';
import Point from '../../Model/Point';
import PolyList from "../../Model/PolyList";
import PolySeg from "../../Model/PolySeg";
import '../../Util/T3Hammer';
import T3Util from "../../Util/T3Util";
import Utils1 from "../../Util/Utils1";
import Utils2 from "../../Util/Utils2";
import Utils3 from "../../Util/Utils3";
import DataUtil from "../Data/DataUtil";
import DSConstant from "../DS/DSConstant";
import PolygonConstant from "../Polygon/PolygonConstant";
import DrawUtil from './DrawUtil';
import HookUtil from './HookUtil';
import LayerUtil from "./LayerUtil";
import OptCMUtil from "./OptCMUtil";
import SelectUtil from "./SelectUtil";
import SvgUtil from "./SvgUtil";

class PolyUtil {

  /**
   * Converts an arc to a sequence of polyline points
   * @param segments - Number of segments to divide the arc into
   * @param center - Center point of the arc
   * @param radius - Radius of the arc
   * @param startY - Starting Y coordinate
   * @param endY - Ending Y coordinate
   * @param targetX - Target X coordinate
   * @param flipArc - Whether to flip the arc
   * @param isComplexArc - Whether this is a complex arc that requires multiple segments
   * @returns Array of points representing the arc
   */
  static ArcToPoly(segments, center, radius, startY, endY, targetX, flipArc, isComplexArc) {
    T3Util.Log("O.Opt: ArcToPoly inputs:", {
      segments,
      center: { x: center.x, y: center.y },
      radius,
      startY,
      endY,
      targetX,
      flipArc,
      isComplexArc
    });

    let isRightSide,
      midY1,
      midY2,
      points = [];

    // The following expression has no effect, but keeping it for compatibility
    endY - startY;

    if (isComplexArc) {
      // For complex arcs, divide into three segments
      if (startY > endY) {
        midY2 = center.y - radius;
        midY1 = center.y + radius;
      } else {
        midY1 = center.y - radius;
        midY2 = center.y + radius;
      }

      isRightSide = targetX < center.x;
      flipArc = false;

      // Generate three segments of the complex arc
      this.ArcToPolySeg(points, segments / 2, center, radius, startY, midY1, targetX, flipArc, !isRightSide);
      this.ArcToPolySeg(points, segments, center, radius, midY1, midY2, center.x, flipArc, isRightSide);
      this.ArcToPolySeg(points, segments / 2, center, radius, midY2, endY, targetX, flipArc, !isRightSide);
    } else {
      // For simple arcs, generate a single segment
      isRightSide = targetX >= center.x;
      this.ArcToPolySeg(points, segments, center, radius, startY, endY, targetX, flipArc, isRightSide);
    }

    T3Util.Log("O.Opt: ArcToPoly output points:", points.length);
    return points;
  }

  /**
   * Generates points along an arc segment and adds them to an array
   * @param points - Array to store the generated points
   * @param segments - Number of segments to divide the arc into
   * @param center - Center point of the arc
   * @param radius - Radius of the arc
   * @param startY - Starting Y coordinate
   * @param endY - Ending Y coordinate
   * @param targetX - Target X coordinate
   * @param flipArc - Whether to flip the arc
   * @param isRightSide - Whether the arc is on the right side
   * @returns Array of points representing the arc segment
   */
  static ArcToPolySeg(points, segments, center, radius, startY, endY, targetX, flipArc, isRightSide) {
    T3Util.Log("O.Opt: ArcToPolySeg inputs:", {
      segments,
      center: { x: center.x, y: center.y },
      radius,
      startY,
      endY,
      targetX,
      flipArc,
      isRightSide
    });

    const radiusSquared = radius * radius;
    const yStep = (endY - startY) / segments;

    for (let i = 0; i < segments; i++) {
      const yOffset = yStep * i;
      const yDist = center.y - (startY + yOffset);
      const xDist = Utils2.sqrt(radiusSquared - yDist * yDist);

      const point = new Point(0, 0);
      point.y = center.y - yDist;

      if (isRightSide) {
        point.x = center.x + xDist;
        const diff = point.x - targetX;
        if (flipArc) {
          point.x = targetX - diff;
        }
      } else {
        point.x = center.x - xDist;
        const diff = targetX - point.x;
        if (flipArc) {
          point.x = targetX + diff;
        }
      }

      points.push(point);
    }

    T3Util.Log("O.Opt: ArcToPolySeg output points count:", points.length);
    return points;
  }

  /**
     * Gets intersection points between a line and a polyline
     * @param polylinePoints - Array of points defining the polyline
     * @param intersectValue - Value to test for intersection (x or y coordinate)
     * @param resultPoints - Array to store intersection points
     * @param resultIndices - Optional array to store indices of intersecting segments
     * @param isHorizontal - True for horizontal intersection line, false for vertical
     * @returns Number of intersection points found
     */
  static PolyGetIntersect(
    polylinePoints: Point[],
    intersectValue: number,
    resultPoints: number[],
    resultIndices?: number[],
    isHorizontal?: boolean
  ): number {
    T3Util.Log("O.Opt PolyGetIntersect - Input:", {
      pointCount: polylinePoints.length,
      intersectValue,
      isHorizontal
    });

    let currentIndex = 0;
    let nextIndex = 1;
    let foundIntersection = false;
    let checkIndex = 0;
    let pointCount = polylinePoints.length;
    let intersectionCount = 0;
    let currentPoint = {};
    let nextPoint = {};
    let deltaX, deltaY, tempValue;
    let minValue, maxValue;
    let intersectX, intersectY;
    let rangeStart, rangeEnd;

    // Process each line segment in the polyline
    for (; nextIndex < pointCount + 1; nextIndex++) {
      let segmentEndIndex = nextIndex;
      currentPoint = polylinePoints[currentIndex];

      // Handle wrapping to start point for closed polylines
      if (nextIndex === pointCount) {
        nextPoint = polylinePoints[0];
        segmentEndIndex = 0;
      } else {
        nextPoint = polylinePoints[nextIndex];
      }

      // Skip zero-length segments
      if (Utils2.IsEqual(nextPoint.x, currentPoint.x) &&
        Utils2.IsEqual(nextPoint.y, currentPoint.y)) {
        continue;
      }

      currentIndex = nextIndex;
      deltaX = nextPoint.x - currentPoint.x;
      deltaY = nextPoint.y - currentPoint.y;

      // Handle horizontal intersection line
      if (isHorizontal) {
        // Determine x range of segment
        if (currentPoint.x < nextPoint.x) {
          minValue = currentPoint.x;
          maxValue = nextPoint.x;
        } else {
          minValue = nextPoint.x;
          maxValue = currentPoint.x;
        }

        // Skip if intersection line is outside segment x range
        if (intersectValue < minValue || intersectValue > maxValue) {
          continue;
        }

        // Prevent division by zero
        if (deltaX === 0) {
          deltaX = 1;
        }

        // Calculate intersection y coordinate
        intersectY = deltaY / deltaX * (intersectValue - currentPoint.x) + currentPoint.y;

        // Determine valid y range for intersection
        if (currentPoint.y < nextPoint.y) {
          rangeStart = currentPoint.y;
          rangeEnd = nextPoint.y;
        } else {
          rangeEnd = currentPoint.y;
          rangeStart = nextPoint.y;
        }

        // Check if intersection is within valid range
        if (intersectY >= rangeStart && intersectY <= rangeEnd) {
          // Check if this point is distinct from previous intersections
          if (intersectionCount > 0) {
            for (checkIndex = 0; checkIndex < intersectionCount; checkIndex++) {
              foundIntersection = Math.abs(intersectY - resultPoints[checkIndex]) > 1;
            }
          } else {
            foundIntersection = true;
          }

          if (foundIntersection) {
            // Stop if we've found too many intersections
            if (intersectionCount >= 2) {
              T3Util.Log("O.Opt PolyGetIntersect - Output: Too many intersections", intersectionCount + 1);
              return intersectionCount + 1;
            }

            // Store the intersection point
            resultPoints[intersectionCount] = intersectY;
            if (resultIndices) {
              resultIndices[intersectionCount] = segmentEndIndex;
            }
            intersectionCount++;
          }
        }
      }
      // Handle vertical intersection line
      else {
        // Similar logic but for vertical intersection
        if (currentPoint.y < nextPoint.y) {
          minValue = currentPoint.y;
          maxValue = nextPoint.y;
        } else {
          minValue = nextPoint.y;
          maxValue = currentPoint.y;
        }

        if (intersectValue < minValue || intersectValue > maxValue) {
          continue;
        }

        if (deltaY === 0) {
          deltaY = 1;
        }

        intersectX = deltaX / deltaY * (intersectValue - currentPoint.y) + currentPoint.x;

        if (currentPoint.x < nextPoint.x) {
          rangeStart = currentPoint.x;
          rangeEnd = nextPoint.x;
        } else {
          rangeEnd = currentPoint.x;
          rangeStart = nextPoint.x;
        }

        if (intersectX >= rangeStart && intersectX <= rangeEnd) {
          if (intersectionCount > 0) {
            for (checkIndex = 0; checkIndex < intersectionCount; checkIndex++) {
              foundIntersection = Math.abs(intersectX - resultPoints[checkIndex]) > 1;
            }
          } else {
            foundIntersection = true;
          }

          if (foundIntersection) {
            if (intersectionCount >= 2) {
              T3Util.Log("O.Opt PolyGetIntersect - Output: Too many intersections", intersectionCount + 1);
              return intersectionCount + 1;
            }

            resultPoints[intersectionCount] = intersectX;
            if (resultIndices) {
              resultIndices[intersectionCount] = segmentEndIndex;
            }
            intersectionCount++;
          }
        }
      }
    }

    // Sort intersection points in ascending order
    if (intersectionCount === 2 && resultPoints[0] > resultPoints[1]) {
      tempValue = resultPoints[1];
      resultPoints[1] = resultPoints[0];
      resultPoints[0] = tempValue;

      if (resultIndices) {
        tempValue = resultIndices[1];
        resultIndices[1] = resultIndices[0];
        resultIndices[0] = tempValue;
      }
    }

    T3Util.Log("O.Opt PolyGetIntersect - Output: Found", intersectionCount, "intersections");
    return intersectionCount;
  }

  static ArcToChord(e, t, a, r, i) {
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
      g = {},
      h = {},
      m = {},
      C = {},
      y = {};
    (g.x = (t.x + e.x) / 2),
      (g.y = (t.y + e.y) / 2),
      (o = t.x - e.x),
      (l = (s = t.y - e.y) / (n = Math.sqrt(o * o + s * s))),
      (S = o / n),
      Math.abs(l) < 1e-4 && (l = 0),
      Math.abs(o) < 1e-4 && (o = 0),
      (p = Math.asin(l)),
      (D = Math.acos(S));
    var f = {},
      L = {};
    return (
      o < 0 && s < 0 ? (p = -D) : p > 0 && o < 0 && (p = -p),
      (l = Math.sin(p)),
      (S = Math.cos(p)),
      (c = e.x - g.x),
      (u = e.y - g.y),
      (f.x = c * S + u * l + g.x),
      (f.y = -c * l + u * S + g.y),
      (c = t.x - g.x),
      (u = t.y - g.y),
      (L.x = c * S + u * l + g.x),
      (L.y = -c * l + u * S + g.y),
      (C.x = i.StartPoint.x),
      (C.y = i.StartPoint.y),
      (y.x = i.EndPoint.x),
      (y.y = i.EndPoint.y),
      (c = C.x - g.x),
      (u = C.y - g.y),
      (C.x = c * S + u * l + g.x),
      (C.y = -c * l + u * S + g.y),
      (c = y.x - g.x),
      (u = y.y - g.y),
      (y.x = c * S + u * l + g.x),
      (y.y = -c * l + u * S + g.y),
      (c = a.x - g.x),
      (u = a.y - g.y),
      (h.x = c * S + u * l + g.x),
      (h.y = -c * l + u * S + g.y),
      r &&
      ((c = r.center.x - g.x),
        (u = r.center.y - g.y),
        (m.x = c * S + u * l + g.x),
        (m.y = -c * l + u * S + g.y),
        (d = g.y < m.y ? h.y < m.y : h.y > m.y) &&
        (C.x < y.x
          ? h.x > C.x &&
          h.x < y.x &&
          (y.x - h.x < h.x - C.x ? (h.x = y.x) : (h.x = C.x))
          : h.x > y.x &&
          h.x < C.x &&
          (C.x - h.x < h.x - y.x ? (h.x = C.x) : (h.x = y.x)))),
      (h.y = g.y),
      (c = h.x - g.x),
      (u = h.y - g.y),
      (l = Math.sin(-p)),
      (S = Math.cos(-p)),
      (h.x = c * S + u * l + g.x),
      (h.y = -c * l + u * S + g.y),
      (c = f.x - g.x),
      (u = f.y - g.y),
      (f.x = c * S + u * l + g.x),
      (f.y = -c * l + u * S + g.y),
      r && ((h.x = 2 * Math.round((h.x + 0.5) / 2)), !0 === d && h.x--),
      h
    );
  }

  static ChordToArc(e, t, a, r, i, n, o, s) {
    var l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m = {},
      C = {},
      y = {},
      f = {};
    return (
      (S = t.x - e.x),
      (u = (c = t.y - e.y) / (l = Math.sqrt(S * S + c * c))),
      (p = S / l),
      Math.abs(u) < 1e-4 && (u = 0),
      Math.abs(S) < 1e-4 && (S = 0),
      (((g = Math.asin(u)) > 0 && S < 0) || (g < 0 && S < 0 && c < 0)) &&
      (g = -g),
      (u = Math.sin(g)),
      (p = Math.cos(g)),
      (d = e.x - a.x),
      (D = e.y - a.y),
      (y.x = d * p + D * u + a.x),
      (y.y = -d * u + D * p + a.y),
      (d = t.x - a.x),
      (D = t.y - a.y),
      (f.x = d * p + D * u + a.x),
      (f.y = -d * u + D * p + a.y),
      (d = s.x - a.x),
      (D = s.y - a.y),
      (m.x = d * p + D * u + a.x),
      (m.y = -d * u + D * p + a.y),
      (d = e.x - a.x),
      (D = e.y - a.y),
      (C.x = d * p + D * u + a.x),
      (C.y = -d * u + D * p + a.y),
      (h = (C.y > a.y && !o) || (C.y <= a.y && o)),
      n && (h = !h),
      (d = m.x - a.x),
      Math.abs(d) > r && (d = r),
      (D = SDJS.Utils.sqrt(r * r - d * d)),
      h
        ? ((m.y = a.y + D), i && ((D = C.y - m.y), (m.y = C.y + D)))
        : ((m.y = a.y - D), i && ((D = C.y - m.y), (m.y = C.y + D))),
      (d = m.x - a.x),
      (D = m.y - a.y),
      (u = Math.sin(-g)),
      (p = Math.cos(-g)),
      (m.x = d * p + D * u + a.x),
      (m.y = -d * u + D * p + a.y),
      m
    );
  }

  static ArcIntersect(e, t, a) {
    var r,
      i,
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
      C,
      y,
      f = !1,
      L = {},
      I = {},
      T = [];
    return (
      (r = e.EndPoint.x - e.StartPoint.x),
      (i = e.EndPoint.y - e.StartPoint.y),
      0 === r ? (!0, (l = e.EndPoint.x), 1) : i / r,
      e.StartPoint.x,
      e.StartPoint.y,
      (L = e.IsReversed
        ? e.CalcRadiusAndCenter(
          e.EndPoint.x,
          e.EndPoint.y,
          e.StartPoint.x,
          e.StartPoint.y,
          e.CurveAdjust,
          e.IsReversed
        )
        : e.CalcRadiusAndCenter(
          e.StartPoint.x,
          e.StartPoint.y,
          e.EndPoint.x,
          e.EndPoint.y,
          e.CurveAdjust,
          e.IsReversed
        )),
      (I.x = L.centerX),
      (I.y = L.centerY),
      (C = L.radius),
      (n = t.EndPoint.x - t.StartPoint.x),
      (o = t.EndPoint.y - t.StartPoint.y),
      0 === n ? ((f = !0), (l = t.EndPoint.x), (s = 1)) : (s = o / n),
      (p = t.StartPoint.x),
      (u = t.StartPoint.y),
      0 === s
        ? !((c = C * C - (m = (S = t.StartPoint.y) - I.y) * m) < 0) &&
        ((l = (h = SDJS.Utils.sqrt(c)) + I.x),
          (a.x = l),
          (a.y = S),
          (T = e.GetPolyPoints(
            SDJS.ListManager.Defines.NPOLYPTS,
            !1,
            !1,
            !1,
            null
          )),
          !!SDJS.ListManager.LM.prototype.LineDStyleHit(
            T,
            a,
            e.StyleRecord.lineThickness,
            0,
            null
          ) ||
          !!SDJS.Utils.PtInRect(e.Frame, a) ||
          ((l = -h + I.x),
            (a.x = l),
            (a.y = S),
            !!SDJS.ListManager.LM.prototype.LineDStyleHit(
              T,
              a,
              e.StyleRecord.lineThickness,
              0,
              null
            ) || !!SDJS.Utils.PtInRect(e.Frame, a)))
        : f
          ? !((c = C * C - (h = (l = t.StartPoint.x) - I.x) * h) < 0) &&
          ((S = (m = SDJS.Utils.sqrt(c)) + I.y),
            (a.x = l),
            (a.y = S),
            (T = e.GetPolyPoints(
              SDJS.ListManager.Defines.NPOLYPTS,
              !1,
              !1,
              !1,
              null
            )),
            !!SDJS.ListManager.LM.prototype.LineDStyleHit(
              T,
              a,
              e.StyleRecord.lineThickness,
              0,
              null
            ) ||
            !!SDJS.Utils.PtInRect(e.Frame, a) ||
            ((S = -m + I.y),
              (a.x = l),
              (a.y = S),
              !!SDJS.ListManager.LM.prototype.LineDStyleHit(
                T,
                a,
                e.StyleRecord.lineThickness,
                0,
                null
              ) || !!SDJS.Utils.PtInRect(e.Frame, a)))
          : ((d = s * s + 1),
            !(
              (g =
                (D = 2 * s * (y = u - I.y - s * p) - 2 * I.x) * D -
                4 * d * (I.x * I.x + y * y - C * C)) < 0
            ) &&
            ((S = u + s * ((l = (-D + (g = SDJS.Utils.sqrt(g))) / (2 * d)) - p)),
              (a.x = l),
              (a.y = S),
              (T = e.GetPolyPoints(
                SDJS.ListManager.Defines.NPOLYPTS,
                !1,
                !1,
                !1,
                null
              )),
              !!SDJS.ListManager.LM.prototype.LineDStyleHit(
                T,
                a,
                e.StyleRecord.lineThickness,
                0,
                null
              ) ||
              !!SDJS.Utils.PtInRect(e.Frame, a) ||
              ((S = u + s * ((l = (-D - g) / (2 * d)) - p)),
                (a.x = l),
                (a.y = S),
                !!SDJS.ListManager.LM.prototype.LineDStyleHit(
                  T,
                  a,
                  e.StyleRecord.lineThickness,
                  0,
                  null
                ) || !!SDJS.Utils.PtInRect(e.Frame, a))))
    );
  }

  static LinesMaintainDist(e, t, a, r) {
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
      g = {},
      h = {
        x: 0,
        y: 0,
      },
      m = {};
    if (
      (null === t && (t = e),
        (g = t.GetConnectLine())
          ? ((D = g.startpt), (d = g.endpt))
          : ((D = t.StartPoint), (d = t.EndPoint)),
        (i = d.x - D.x),
        (n = d.y - D.y),
        Math.sqrt(i * i + n * n),
        (h.x = r.x),
        (h.y = r.y),
        t.LineType === SDJS.ListManager.LineType.ARCLINE &&
        (h = this.ArcToChord(D, d, h, g, t)),
        a === SDJS.ListManager.ActionTriggerType.LINESTART
          ? ((i = h.x - d.x), (n = h.y - d.y))
          : ((i = h.x - D.x), (n = h.y - D.y)),
        (o = Math.sqrt(i * i + n * n)),
        (g = e.GetConnectLine())
          ? ((D = g.startpt), (d = g.endpt))
          : ((D = e.StartPoint), (d = e.EndPoint)),
        a === SDJS.ListManager.ActionTriggerType.LINESTART
          ? ((c = d), (i = -(d.x - D.x)), (n = -(d.y - D.y)))
          : ((c = D), (i = d.x - D.x), (n = d.y - D.y)),
        o > (s = Math.sqrt(i * i + n * n)) && (o = s),
        s < 1
          ? ((r.x = D.x), (r.y = D.y))
          : ((l = n / s), (S = i / s), (r.x = c.x + S * o), (r.y = c.y + l * o)),
        e.LineType === SDJS.ListManager.LineType.ARCLINE)
    ) {
      var C = e.CalcRadiusAndCenter(
        e.StartPoint.x,
        e.StartPoint.y,
        e.EndPoint.x,
        e.EndPoint.y,
        e.CurveAdjust,
        e.IsReversed
      );
      g ? ((u = !1), (p = !1)) : ((u = !1), (p = e.IsReversed)),
        (m.x = C.centerX),
        (m.y = C.centerY),
        (r = this.ChordToArc(D, d, m, C.radius, p, u, C.centerInside, r));
    }
  }

  static GetMaxDim(e) {
    return (
      (e.x = SDJS.ListManager.Defines.SD_MaxLongDim),
      (e.y = SDJS.ListManager.Defines.SD_MaxLongDim),
      !0
    );
  }

  static LinesAddCurve(e, t, a, r, i, n) {
    var o,
      s = [],
      l = [],
      S = {};
    if (e)
      if (t > 0 && a > 0)
        for (
          S.x = r,
          S.y = i,
          S.width = n,
          S.height = -2 * n,
          gListManager.PolyYCurve(l, S, 20, 0, 0, 0, -n, !0),
          o = l.length - 1;
          o >= 0;
          o--
        )
          s.push(l[o]);
      else
        t < 0 && a > 0
          ? ((S.x = r),
            (S.y = i + 2 * n),
            (S.width = n),
            (S.height = -2 * n),
            gListManager.PolyYCurve(s, S, 20, 0, 0, -n, 0, !0))
          : t > 0 && a < 0
            ? ((S.x = r),
              (S.y = i - 2 * n),
              (S.width = -n),
              (S.height = 2 * n),
              gListManager.PolyYCurve(s, S, 20, 0, 0, n, 0, !0))
            : t < 0 &&
            a < 0 &&
            ((S.x = r),
              (S.y = i + 2 * n),
              (S.width = -n),
              (S.height = -2 * n),
              gListManager.PolyYCurve(s, S, 20, 0, 0, -n, 0, !0));
    else if (t > 0 && a > 0)
      (S.x = r - n),
        (S.y = i),
        (S.width = n),
        (S.height = 2 * n),
        gListManager.PolyYCurve(s, S, 20, 0, 0, 0, n, !1);
    else if (t < 0 && a > 0)
      (S.x = r),
        (S.y = i),
        (S.width = n),
        (S.height = 2 * n),
        gListManager.PolyYCurve(s, S, 20, 0, 0, 0, n, !0);
    else if (t > 0 && a < 0)
      (S.x = r - n),
        (S.y = i),
        (S.width = n),
        (S.height = -2 * n),
        gListManager.PolyYCurve(s, S, 20, 0, 0, 0, -n, !1);
    else if (t < 0 && a < 0)
      for (
        S.x = r,
        S.y = i - 2 * n,
        S.width = n,
        S.height = 2 * n,
        gListManager.PolyYCurve(l, S, 20, 0, 0, n, 0, !0),
        o = l.length - 1;
        o >= 0;
        o--
      )
        s.push(l[o]);
    return s;
  }

  static PolyLJoin(e, t, a, r, i) {
    var n, o, s, l, S, c, u, p, d, D, g, h, m, C, y, f = null, L = null, I = null, T = null, b = [], M = [], P = !1, R = [], A = !1, _ = OptConstant.ActionTriggerType.LineEnd, E = {
      x: 0,
      y: 0
    }, w = {}, F = OptConstant.Common.KnobSize, v = -1, G = LayerUtil.ActiveVisibleZList(), N = !1;

    f = DataUtil.GetObjectPtr(e, !0);
    if (f == null) return -1;

    L = DataUtil.GetObjectPtr(a, !0);
    if (L == null) return -1;

    h = f.DataID;
    if (L.DataID >= 0) h = L.DataID;

    m = f.NoteID;
    if (L.NoteID >= 0) m = L.NoteID;

    y = f.CommentID;
    if (L.CommentID >= 0) y = L.CommentID;

    C = f.HyperlinkText;
    if (L.HyperlinkText) C = L.HyperlinkText;

    if (r === OptConstant.HookPts.WTL || r === OptConstant.HookPts.WTR) r = OptConstant.HookPts.KTL;

    if (e === a && f.LineType === OptConstant.LineType.POLYLINE) {
      A = f.polylist.closed;
      f.polylist.closed = !0;
      s = f.polylist.segs.length;
      f.polylist.segs[s - 1].pt.x = f.polylist.segs[0].pt.x;
      f.polylist.segs[s - 1].pt.y = f.polylist.segs[0].pt.y;
      f.EndPoint.x = f.StartPoint.x;
      f.EndPoint.y = f.StartPoint.y;
      if (f.objecttype !== NvConstant.FNObjectTypes.FlWall) this.OpenShapeEdit(e);

      var k = -1;
      if (f instanceof Instance.Shape.PolyLineContainer && !A && i !== !0) {
        f.MaintainDimensionThroughPolygonOpennessChange(f.polylist.closed);
        k = -2;
      }

      f.CalcFrame();
      DataUtil.AddToDirtyList(f.BlockID);
      OptCMUtil.SetLinkFlag(e, DSConstant.LinkFlags.Move);
      HookUtil.MaintainLink(e, f, null, _, !1);
      return k;
    }
    if (f.LineType === OptConstant.LineType.POLYLINE) {
      I = f;
      T = L;
      M.push(a);
      c = e;
    } else if (L.LineType === OptConstant.LineType.POLYLINE) {
      I = L;
      T = f;
      u = t;
      t = r;
      r = u;
      M.push(e);
      c = a;
    }

    if (I == null) {
      M.push(a);
      M.push(e);
      v = Math.min(G.indexOf(a), G.indexOf(e));
      var U = {
        Frame: {
          x: f.Frame.x,
          y: f.Frame.x,
          width: f.Frame.width,
          height: f.Frame.height
        },
        inside: {
          x: f.inside.x,
          y: f.inside.x,
          width: f.inside.width,
          height: f.inside.height
        },
        StartPoint: {
          x: f.StartPoint.x,
          y: f.StartPoint.y
        },
        EndPoint: {
          x: f.EndPoint.x,
          y: f.EndPoint.y
        },
        flags: NvConstant.ObjFlags.Erase | NvConstant.ObjFlags.EraseOnGrow,
        extraflags: OptConstant.ExtraFlags.SideKnobs,
        StartArrowID: L.StartArrowID,
        EndArrowID: L.EndArrowID,
        StartArrowDisp: L.StartArrowDisp,
        EndArrowDisp: L.EndArrowDisp,
        ArrowSizeIndex: L.ArrowSizeIndex,
        TextFlags: f.TextFlags,
        objecttype: f.objecttype,
        Dimensions: f.Dimensions,
        dataclass: PolygonConstant.ShapeTypes.POLYGON,
        polylist: new PolyList()
      };

      if (L.StartArrowID === 0 && f.StartArrowID > 0) {
        U.StartArrowID = f.StartArrowID;
        U.StartArrowDisp = f.StartArrowDisp;
        U.ArrowSizeIndex = f.ArrowSizeIndex;
      }

      if (L.EndArrowID === 0 && f.EndArrowID > 0) {
        U.EndArrowID = f.EndArrowID;
        U.EndArrowDisp = f.EndArrowDisp;
        U.ArrowSizeIndex = f.ArrowSizeIndex;
      }

      U.StyleRecord = Utils1.DeepCopy(f.StyleRecord);

      if (U.objecttype === NvConstant.FNObjectTypes.FlWall) {
        U.StyleRecord.Fill.Paint.FillType = NvConstant.FillTypes.Transparent;
      }

      U.StyleRecord.Fill.Hatch = 0;

      var polyPoints = f.GetPolyPoints(OptConstant.Common.MaxPolyPoints, false, true, false, null);
      var numPoints = polyPoints.length;

      for (var n = 0; n < numPoints; n++) {
        var lineType = (n === 0 || f.LineType === OptConstant.LineType.SEGLINE) ? OptConstant.LineType.LINE : f.LineType;
        U.polylist.segs.push(new PolySeg(lineType, polyPoints[n].x - f.StartPoint.x, polyPoints[n].y - f.StartPoint.y));

        if (lineType === OptConstant.LineType.ARCLINE) {
          U.polylist.segs[U.polylist.segs.length - 1].param = f.IsReversed ? f.CurveAdjust : -f.CurveAdjust;
        } else if (lineType === OptConstant.LineType.ARCSEGLINE) {

          var arcQuadrant = this.PolyLinePrPolyLGetArcQuadrant(polyPoints[n - 1], polyPoints[n], 0);

          U.polylist.segs[U.polylist.segs.length - 1].param = arcQuadrant.param;
          U.polylist.segs[U.polylist.segs.length - 1].ShortRef = arcQuadrant.ShortRef;
        }
      }

      I = wallOpt.AddNewPolyLine(f.objecttype, U) || new Instance.Shape.PolyLine(U);
      T = L;
      P = true;
    }
    if (t === OptConstant.HookPts.KTL)
      var J = {
        x: I.StartPoint.x,
        y: I.StartPoint.y
      };
    else
      J = {
        x: I.EndPoint.x,
        y: I.EndPoint.y
      };
    if (r === OptConstant.HookPts.KTL)
      var x = {
        x: T.StartPoint.x,
        y: T.StartPoint.y
      };
    else
      x = {
        x: T.EndPoint.x,
        y: T.EndPoint.y
      };
    if (l = J.x - x.x,
      S = J.y - x.y,
      T.StartPoint.x += l,
      T.StartPoint.y += S,
      T.EndPoint.x += l,
      T.EndPoint.y += S,
      (o = (b = T.GetPolyPoints(OptConstant.Common.MaxPolyPoints, !1, !0, !1, null)).length) + (s = I.polylist.segs.length) > OptConstant.Common.MaxPolySegs)
      -1;
    if (t === OptConstant.HookPts.KTL) {
      if (_ = OptConstant.ActionTriggerType.LineStart,
        r === OptConstant.HookPts.KTL) {
        for (l = I.StartPoint.x - b[o - 1].x,
          S = I.StartPoint.y - b[o - 1].y,
          n = 0; n < s; n++)
          I.polylist.segs[n].pt.x += l,
            I.polylist.segs[n].pt.y += S;
        for (I.StartPoint.x = b[o - 1].x,
          I.StartPoint.y = b[o - 1].y,
          n = 1; n < o; n++) {
          switch (T.LineType) {
            case OptConstant.LineType.POLYLINE:
              E.x = I.polylist.segs[0].pt.x,
                E.y = I.polylist.segs[0].pt.y,
                I.polylist.segs[0] = Utils1.DeepCopy(T.polylist.segs[n]),
                I.polylist.segs[0].pt.x = E.x,
                I.polylist.segs[0].pt.y = E.y,
                I.polylist.segs[0].param = -I.polylist.segs[0].param;
              break;
            case OptConstant.LineType.ARCLINE:
              I.polylist.segs[0].LineType = T.LineType,
                T.IsReversed ? I.polylist.segs[0].param = -T.CurveAdjust : I.polylist.segs[0].param = T.CurveAdjust;
              break;
            case OptConstant.LineType.ARCSEGLINE:
              I.polylist.segs[0].LineType = T.LineType,
                I.polylist.segs[0].param = 0,
                g = I.PrPolyLGetArcQuadrant(b[n], b[n - 1], 0),
                I.polylist.segs[0].param = g.param,
                I.polylist.segs[0].ShortRef = g.ShortRef;
              break;
            default:
              I.polylist.segs[0].LineType = OptConstant.LineType.LINE
          }
          I.polylist.segs.unshift(new PolySeg(OptConstant.LineType.LINE, b[n].x - I.StartPoint.x, b[n].y - I.StartPoint.y))
        }
      } else {
        for (l = I.StartPoint.x - b[0].x,
          S = I.StartPoint.y - b[0].y,
          n = 0; n < s; n++)
          I.polylist.segs[n].pt.x += l,
            I.polylist.segs[n].pt.y += S;
        switch (I.StartPoint.x = b[0].x,
        I.StartPoint.y = b[0].y,
        T.LineType) {
          case OptConstant.LineType.POLYLINE:
            E.x = I.polylist.segs[0].pt.x,
              E.y = I.polylist.segs[0].pt.y,
              I.polylist.segs[0] = Utils1.DeepCopy(T.polylist.segs[o - 1]),
              I.polylist.segs[0].pt.x = E.x,
              I.polylist.segs[0].pt.y = E.y;
            break;
          case OptConstant.LineType.ARCLINE:
            I.polylist.segs[0].LineType = T.LineType,
              T.IsReversed ? I.polylist.segs[0].param = T.CurveAdjust : I.polylist.segs[0].param = -T.CurveAdjust;
            break;
          case OptConstant.LineType.ARCSEGLINE:
            I.polylist.segs[0].LineType = T.LineType,
              I.polylist.segs[0].param = 0,
              g = I.PrPolyLGetArcQuadrant(b[o - 2], b[o - 1], 0),
              I.polylist.segs[0].param = g.param,
              I.polylist.segs[0].ShortRef = g.ShortRef;
            break;
          default:
            I.polylist.segs[0].LineType = OptConstant.LineType.LINE
        }
        for (n = o - 2; n >= 0; n--)
          if (I.polylist.segs.unshift(new PolySeg(OptConstant.LineType.LINE, b[n].x - I.StartPoint.x, b[n].y - I.StartPoint.y)),
            n > 0)
            switch (T.LineType) {
              case OptConstant.LineType.POLYLINE:
                E.x = I.polylist.segs[0].pt.x,
                  E.y = I.polylist.segs[0].pt.y,
                  I.polylist.segs[0] = Utils1.DeepCopy(T.polylist.segs[n]),
                  I.polylist.segs[0].pt.x = E.x,
                  I.polylist.segs[0].pt.y = E.y;
                break;
              case OptConstant.LineType.ARCSEGLINE:
                I.polylist.segs[0].LineType = T.LineType,
                  w.x = b[n].x - I.StartPoint.x,
                  w.y = b[n].y - I.StartPoint.y,
                  I.polylist.segs[0].param = 0,
                  g = I.PrPolyLGetArcQuadrant(b[n - 1], b[n], 0),
                  I.polylist.segs[0].param = g.param,
                  I.polylist.segs[0].ShortRef = g.ShortRef
            }
      }
      D = Utils2.InflatePoint(I.polylist.segs[0].pt, F),
        !I.polylist.closed && Utils2.pointInRect(D, I.polylist.segs[I.polylist.segs.length - 1].pt) && (I.polylist.closed = !0,
          I.polylist.segs[I.polylist.segs.length - 1].pt.x = I.polylist.segs[0].pt.x,
          I.polylist.segs[I.polylist.segs.length - 1].pt.y = I.polylist.segs[0].pt.y,
          I.EndPoint.x = I.StartPoint.x,
          I.EndPoint.y = I.StartPoint.y,
          I instanceof Instance.Shape.PolyLine && !0 !== i && I.MaintainDimensionThroughPolygonOpennessChange(I.polylist.closed),
          I.objecttype !== NvConstant.FNObjectTypes.FlWall && this.OpenShapeEdit(I.BlockID),
          DataUtil.AddToDirtyList(I.BlockID))
    } else {
      if (r === OptConstant.HookPts.KTL) {
        for (n = 1; n < o; n++) {
          switch (T.LineType) {
            case OptConstant.LineType.POLYLINE:
              p = T.polylist.segs[n].LineType;
              break;
            case OptConstant.LineType.ARCLINE:
            case OptConstant.LineType.ARCSEGLINE:
              p = T.LineType;
              break;
            default:
              p = OptConstant.LineType.LINE
          }
          switch (I.polylist.segs.push(new PolySeg(p, b[n].x - I.StartPoint.x, b[n].y - I.StartPoint.y)),
          T.LineType) {
            case OptConstant.LineType.ARCLINE:
              T.IsReversed ? I.polylist.segs[I.polylist.segs.length - 1].param = T.CurveAdjust : I.polylist.segs[I.polylist.segs.length - 1].param = -T.CurveAdjust;
              break;
            case OptConstant.LineType.POLYLINE:
              I.polylist.segs[I.polylist.segs.length - 1] = Utils1.DeepCopy(T.polylist.segs[n]),
                I.polylist.segs[I.polylist.segs.length - 1].pt.x = b[n].x - I.StartPoint.x,
                I.polylist.segs[I.polylist.segs.length - 1].pt.y = b[n].y - I.StartPoint.y;
              break;
            case OptConstant.LineType.ARCSEGLINE:
              w.x = b[n].x - I.StartPoint.x,
                w.y = b[n].y - I.StartPoint.y,
                d = I.polylist.segs.length,
                I.polylist.segs[d - 1].param = 0,
                g = I.PrPolyLGetArcQuadrant(b[n - 1], b[n], 0),
                I.polylist.segs[d - 1].param = g.param,
                I.polylist.segs[d - 1].ShortRef = g.ShortRef
          }
        }
        I.EndPoint.x = b[o - 1].x,
          I.EndPoint.y = b[o - 1].y
      } else {
        for (n = o - 2; n >= 0; n--) {
          switch (T.LineType) {
            case OptConstant.LineType.POLYLINE:
              p = T.polylist.segs[n + 1].LineType;
              break;
            case OptConstant.LineType.ARCLINE:
            case OptConstant.LineType.ARCSEGLINE:
              p = T.LineType;
              break;
            default:
              p = OptConstant.LineType.LINE
          }
          switch (I.polylist.segs.push(new PolySeg(p, b[n].x - I.StartPoint.x, b[n].y - I.StartPoint.y)),
          T.LineType) {
            case OptConstant.LineType.ARCLINE:
              T.IsReversed ? I.polylist.segs[I.polylist.segs.length - 1].param = -T.CurveAdjust : I.polylist.segs[I.polylist.segs.length - 1].param = T.CurveAdjust;
              break;
            case OptConstant.LineType.POLYLINE:
              I.polylist.segs[I.polylist.segs.length - 1] = Utils1.DeepCopy(T.polylist.segs[n + 1]),
                I.polylist.segs[I.polylist.segs.length - 1].pt.x = b[n].x - I.StartPoint.x,
                I.polylist.segs[I.polylist.segs.length - 1].pt.y = b[n].y - I.StartPoint.y,
                I.polylist.segs[I.polylist.segs.length - 1].param = -I.polylist.segs[I.polylist.segs.length - 1].param;
              break;
            case OptConstant.LineType.ARCSEGLINE:
              d = I.polylist.segs.length,
                I.polylist.segs[d - 1].param = 0,
                g = I.PrPolyLGetArcQuadrant(b[n + 1], b[n], 0),
                I.polylist.segs[d - 1].param = g.param,
                I.polylist.segs[d - 1].ShortRef = g.ShortRef
          }
        }
        I.EndPoint.x = b[0].x,
          I.EndPoint.y = b[0].y
      }
      D = Utils2.InflatePoint(I.polylist.segs[I.polylist.segs.length - 1].pt, F),
        Utils2.pointInRect(D, I.polylist.segs[0].pt) && (I.polylist.closed = !0,
          I.polylist.segs[I.polylist.segs.length - 1].pt.x = I.polylist.segs[0].pt.x,
          I.polylist.segs[I.polylist.segs.length - 1].pt.y = I.polylist.segs[0].pt.y,
          I.EndPoint.x = I.StartPoint.x,
          I.EndPoint.y = I.StartPoint.y,
          I.objecttype !== NvConstant.FNObjectTypes.FlWall && this.OpenShapeEdit(I.BlockID),
          I instanceof Instance.Shape.PolyLine && !0 !== i && I.MaintainDimensionThroughPolygonOpennessChange(I.polylist.closed),
          DataUtil.AddToDirtyList(I.BlockID))
    }
    if (I.CalcFrame(),
      P)
      c = DrawUtil.AddNewObject(I, !1, !0),
        // Collab.AddNewBlockToSecondary(c),
        // Collab.ClearCreateList(),
        // Collab.AddToCreateList(c),
        N = !0,
        DataUtil.AddToDirtyList(c);
    else {
      var O = LayerUtil.VisibleZList().indexOf(c);
      O >= 0 && SvgUtil.AddSVGObject(O, c, !0, !0)
    }
    for ((I = DataUtil.GetObjectPtr(c, !1)) && I.DataID < 0 && (I.DataID = h,
      f.DataID === h ? (I.TextDirection = f.TextDirection,
        f.DataID = -1) : L.DataID === h && (I.TextDirection = L.TextDirection,
          L.DataID = -1),
      I.TextFlags = Utils2.SetFlag(I.TextFlags, NvConstant.TextFlags.HorizText, !I.TextDirection)),
      I && I.NoteID < 0 && (I.NoteID = m,
        f.NoteID === m ? f.NoteID = -1 : L.NoteID === m && (L.NoteID = -1),
        I.TextFlags = Utils2.SetFlag(I.TextFlags, NvConstant.TextFlags.HorizText, !I.TextDirection)),
      I && I.CommentID < 0 && (I.CommentID = y,
        f.CommentID === y ? f.CommentID = -1 : L.CommentID === y && (L.CommentID = -1),
        I.TextFlags = Utils2.SetFlag(I.TextFlags, NvConstant.TextFlags.HorizText, !I.TextDirection)),
      I && !I.HyperlinkText && (I.HyperlinkText = C),
      n = 0; n < M.length; n++)
      HookUtil.MoveLinks(c, M[n], null, null);
    if (DataUtil.DeleteObjects(M, !1),
      OptCMUtil.SetLinkFlag(c, DSConstant.LinkFlags.Move),
      HookUtil.MaintainLink(c, I, null, _, !1),
      T3Gv.opt.UpdateLinks(),
      R.push(c),
      SelectUtil.SelectObjects(R, !1, !0),
      P && v >= 0) {
      var B = G.indexOf(c);
      G.splice(B, 1),
        G.splice(v, 0, c),
        N = !0,
        DataUtil.AddToDirtyList(c)
    }
    return I instanceof Instance.Shape.PolyLineContainer && I.MoveBehindAllLinked() && (N = !0),
      N && (LayerUtil.IsTopMostVisibleLayer() ? SvgUtil.RenderDirtySVGObjects() : SvgUtil.RenderAllSVGObjects()),
      c
  }

  /**
 * Determines the arc quadrant based on two points and an angle
 * @param startPoint - The starting point of the arc
 * @param endPoint - The ending point of the arc
 * @param arcAngle - The angle of the arc in radians
 * @returns Object containing quadrant parameters and reference
 */
  static PolyLinePrPolyLGetArcQuadrant(startPoint, endPoint, arcAngle) {
    T3Util.Log("O.Opt PolyLinePrPolyLGetArcQuadrant - Input:", {
      startPoint,
      endPoint,
      arcAngle
    });

    const result = {
      param: 0,
      ShortRef: 0
    };

    const points = [];
    const rotationCenter = {};

    // Add the points to the array
    points.push(new Point(startPoint.x, startPoint.y));
    points.push(new Point(endPoint.x, endPoint.y));

    // Set the rotation center to the start point
    rotationCenter.x = startPoint.x;
    rotationCenter.y = startPoint.y;

    // Apply rotation if the angle is significant
    if (Math.abs(arcAngle) >= 0.01) {
      const sinValue = Math.sin(arcAngle);
      const cosValue = Math.cos(arcAngle);
      const arcSin = Math.asin(sinValue);

      // Adjust the arc sine based on cosine sign
      const adjustedArcSin = cosValue < 0 ? -arcSin : arcSin;

      // Rotate the points around the center
      Utils3.RotatePointsAboutPoint(rotationCenter, adjustedArcSin, points);
    }

    const origin = points[0];
    const target = points[1];

    // Determine quadrant based on relative positions
    if (target.x > origin.x) {
      if (target.y > origin.y) {
        // Bottom-left quadrant
        result.param = -NvConstant.Geometry.PI / 2;
        result.ShortRef = OptConstant.ArcQuad.PLA_BL;

        if (endPoint.notclockwise) {
          result.param = 0;
        }
      } else {
        // Top-left quadrant
        result.ShortRef = OptConstant.ArcQuad.PLA_TL;

        if (endPoint.notclockwise) {
          result.ShortRef = OptConstant.ArcQuad.PLA_TR;
          result.param = NvConstant.Geometry.PI / 2;
        }
      }
    } else {
      if (target.y > origin.y) {
        // Bottom-right quadrant
        result.ShortRef = OptConstant.ArcQuad.SD_PLA_BR;

        if (endPoint.notclockwise) {
          result.ShortRef = OptConstant.ArcQuad.PLA_BL;
          result.param = NvConstant.Geometry.PI / 2;
        }
      } else {
        // Top-right quadrant
        result.param = -NvConstant.Geometry.PI / 2;
        result.ShortRef = OptConstant.ArcQuad.PLA_TR;

        if (endPoint.notclockwise) {
          result.param = 0;
        }
      }
    }

    T3Util.Log("O.Opt PolyLinePrPolyLGetArcQuadrant - Output:", result);
    return result;
  }

  /**
     * Calculates points along a Y-curve (vertical semi-ellipse)
     *
     * @param points - Array to store calculated points
     * @param rect - The bounding rectangle for the curve
     * @param segmentCount - Number of segments in the curve
     * @param minOffset - Minimum offset from the top of the rectangle
     * @param maxOffset - Maximum offset from the bottom of the rectangle
     * @param startOffset - Offset for the first point
     * @param endOffset - Offset for the last point
     * @param isRightSide - Whether to place points on the right side of the rectangle
     * @returns The input points array with new points added
     */
  static PolyYCurve(points, rect, segmentCount, minOffset, maxOffset, startOffset, endOffset, isRightSide) {
    T3Util.Log("O.Opt PolyYCurve - Input:", {
      pointCount: points.length,
      rect,
      segmentCount,
      minOffset,
      maxOffset,
      startOffset,
      endOffset,
      isRightSide
    });

    // Calculate vertical center and width
    const verticalHalf = rect.height / 2;
    let rectWidth = rect.width;

    // Ensure minimum segment count
    if (segmentCount < 2) {
      segmentCount = 2;
    }

    // Calculate vertical spacing between points
    const verticalSpacing = (2 * verticalHalf - startOffset - endOffset) / (segmentCount - 1);

    // Track if we've already processed special case points
    let minLimitProcessed = false;
    let maxLimitProcessed = false;

    // Create points along the curve
    for (let i = 0; i < segmentCount; i++) {
      // Calculate raw vertical offset from top
      let verticalOffset = verticalSpacing * i + startOffset;

      // Apply minimum offset constraint
      if (minOffset && verticalOffset < minOffset) {
        if (minLimitProcessed) {
          continue; // Skip duplicate minimum points
        }
        verticalOffset = minOffset;
        minLimitProcessed = true;
      }

      // Calculate distance from horizontal center
      let distanceFromCenter = verticalHalf - verticalOffset;

      // Apply maximum offset constraint
      if (maxOffset && distanceFromCenter - maxOffset < -verticalHalf) {
        if (maxLimitProcessed) {
          break; // Stop if we're past the maximum
        }
        distanceFromCenter = -(verticalHalf - maxOffset);
        maxLimitProcessed = true;
      }

      // Create new point
      const point = new Point(0, 0);

      // Calculate Y position
      point.y = rect.y + (verticalHalf - distanceFromCenter);

      // Calculate ratio for X position
      let ratio = 0;
      if (verticalHalf) {
        ratio = distanceFromCenter / verticalHalf;
      } else {
        rectWidth = 0;
      }

      // Calculate X using ellipse formula and place on correct side
      const horizontalOffset = Utils2.sqrt(1 - ratio * ratio) * rectWidth;
      point.x = isRightSide ? rect.x + rect.width - horizontalOffset : rect.x + horizontalOffset;

      // Add point to result array
      points.push(point);
    }

    T3Util.Log("O.Opt PolyYCurve - Output: Generated points:", points.length);
    return points;
  }

  /**
   * Determines if a point is inside a polygon using ray-casting algorithm
   * @param polygonPoints - Array of points defining the polygon
   * @param testPoint - The point to test for containment
   * @returns True if the point is inside the polygon, false otherwise
   */
  static PolyPtInPolygon(polygonPoints, testPoint) {
    T3Util.Log("O.Opt PolyPtInPolygon - Input:", { polygonPointsCount: polygonPoints.length, testPoint });

    // Initialize triangle points
    const trianglePoints = [
      {}, {}, {}
    ];

    // Counter for number of intersections
    let intersectionCount = 0;

    trianglePoints[0] = polygonPoints[0];
    const pointCount = polygonPoints.length;

    // Check each possible triangle formed by consecutive points
    for (let i = 1; i < pointCount - 1; i++) {
      // Flag to track if point is within current triangle
      let isPointInTriangle = true;

      trianglePoints[1] = polygonPoints[i];
      trianglePoints[2] = polygonPoints[i + 1];

      // Check if test point is within the triangle angles
      for (let j = 0; j < 3; j++) {
        // Get angle from triangle point to test point
        const angleToTestPoint = T3Gv.opt.GetCounterClockwiseAngleBetween2Points(
          trianglePoints[j],
          testPoint
        );

        // Get indices for adjacent points (wrapping around)
        const prevIndex = j - 1 >= 0 ? j - 1 : 2;
        const nextIndex = j + 1 < 3 ? j + 1 : 0;

        // Calculate angles to adjacent points
        const angleToPrevPoint = T3Gv.opt.GetCounterClockwiseAngleBetween2Points(
          trianglePoints[j],
          trianglePoints[prevIndex]
        );

        const angleToNextPoint = T3Gv.opt.GetCounterClockwiseAngleBetween2Points(
          trianglePoints[j],
          trianglePoints[nextIndex]
        );

        // Get the larger of the two angles
        const largerAngle = angleToPrevPoint > angleToNextPoint ?
          angleToPrevPoint : angleToNextPoint;

        // Calculate complementary angle
        const complementaryAngle = NvConstant.Geometry.PI - largerAngle;

        // Normalize all angles to the same range
        const normalizedPrevAngle = T3Gv.opt.NormalizeAngle(angleToPrevPoint, complementaryAngle);
        const normalizedNextAngle = T3Gv.opt.NormalizeAngle(angleToNextPoint, complementaryAngle);

        // Ensure proper ordering of angles
        let smallerAngle = normalizedPrevAngle;
        let greaterAngle = normalizedNextAngle;

        if (normalizedPrevAngle > normalizedNextAngle) {
          smallerAngle = normalizedNextAngle;
          greaterAngle = normalizedPrevAngle;
        }

        // Normalize test point angle
        const normalizedTestPointAngle = T3Gv.opt.NormalizeAngle(angleToTestPoint, complementaryAngle);

        // Check if test point angle is outside the range
        if (normalizedTestPointAngle < smallerAngle || normalizedTestPointAngle > greaterAngle) {
          isPointInTriangle = false;
          break;
        }
      }

      // If point is in triangle, increment intersection counter
      if (isPointInTriangle) {
        intersectionCount++;
      }
    }

    // Point is inside if number of intersections is odd
    const isInside = (intersectionCount % 2) !== 0;
    T3Util.Log("O.Opt PolyPtInPolygon - Output:", isInside);
    return isInside;
  }

  static PolyLIntersect(e, t, a, r) {
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
      C = null,
      y = -1,
      f = -1,
      L = {
        x: 0,
        y: 0,
      },
      I = {
        x: 0,
        y: 0,
      },
      T = 0;
    if (((S = Math.abs(t.x - e.x)), Math.abs(t.y - e.y) < 1 && S >= 1)) {
      for (i = 1; i < r; i++)
        if (
          (a[i].y > a[i - 1].y
            ? ((s = a[i - 1].y), (l = a[i].y))
            : ((s = a[i].y), (l = a[i - 1].y)),
            t.y >= s && t.y < l)
        ) {
          (y = i), (I.y = t.y);
          break;
        }
      if (y >= 0)
        return (
          (T = y),
          a[y].x - a[y - 1].x == 0
            ? ((I.x = a[y].x),
            {
              bSuccess: !0,
              ipt: I,
              lpseg: T,
            })
            : a[y].y - a[y - 1].y == 0
              ? (a[y].x > a[y - 1].x
                ? ((n = a[y - 1].x), (o = a[y].x))
                : ((n = a[y].x), (o = a[y - 1].x)),
                I.x < n && (I.x = n),
                I.x > o && (I.x = o),
              {
                bSuccess: !0,
                ipt: I,
                lpseg: T,
              })
              : ((c = a[y].x - a[y - 1].x),
                (d = (a[y].y - a[y - 1].y) / c),
                (D = a[y].y - d * a[y].x),
                (I.x = (I.y - D) / d),
              {
                bSuccess: !0,
                ipt: I,
                lpseg: T,
              })
        );
    } else if (S < 1) {
      for (i = 1; i < r; i++)
        if (
          (a[i].x > a[i - 1].x
            ? ((n = a[i - 1].x), (o = a[i].x))
            : ((n = a[i].x), (o = a[i - 1].x)),
            t.x >= n && t.x < o)
        ) {
          (f = i), (I.x = t.x);
          break;
        }
      if (f >= 0)
        return (
          (T = f),
          a[f].y - a[f - 1].y == 0
            ? ((I.y = a[f].y),
            {
              bSuccess: !0,
              ipt: I,
              lpseg: T,
            })
            : a[f].x - a[f - 1].x == 0
              ? (a[f].y > a[f - 1].y
                ? ((s = a[f - 1].y), (l = a[f].y))
                : ((s = a[f].y), (l = a[f - 1].y)),
                I.y < s && (I.y = s),
                I.y > l && (I.y = l),
              {
                bSuccess: !0,
                ipt: I,
                lpseg: T,
              })
              : ((c = a[f].x - a[f - 1].x),
                (d = (a[f].y - a[f - 1].y) / c),
                (D = a[f].y - d * a[f].x),
                (I.y = d * I.x + D),
              {
                bSuccess: !0,
                ipt: I,
                lpseg: T,
              })
        );
    } else
      for (
        c = t.x - e.x, u = (t.y - e.y) / c, p = t.y - u * t.x, i = 1;
        i < r;
        i++
      ) {
        if (a[i].x - a[i - 1].x == 0) (L.x = a[i].x), (L.y = u * L.x + p);
        else if (a[i].y - a[i - 1].y == 0) (L.y = a[i].y), (L.x = (L.y - p) / u);
        else {
          if (
            ((c = a[i].x - a[i - 1].x),
              (h = u - (d = (a[i].y - a[i - 1].y) / c)),
              (m = (D = a[i].y - d * a[i].x) - p),
              Math.abs(h) < 0.001)
          )
            continue;
          (g = m / h), (L.y = u * g + p), (L.x = g);
        }
        if (
          ((C = Utils2.Pt2Rect(a[i], a[i - 1])).y + C.height == C.y &&
            C.height++,
            C.x + C.width == C.x && C.width++,
            Utils2.pointInRect(C, L))
        )
          return {
            bSuccess: !0,
            ipt: (I = L),
            lpseg: (T = i),
          };
      }
    return {
      bSuccess: !1,
      ipt: I,
      lpseg: T,
    };
  }
}

export default PolyUtil
