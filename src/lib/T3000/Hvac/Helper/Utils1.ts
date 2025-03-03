// Common functions for HVAC module

import HvacModels from '../Data/Constant';
import StoredObject from '../Data/State/StoredObject';
import Globals from '../Data/Globals';
import GlobalData from '../Data/GlobalData';
import SegmentData from '../Model/SegmentData'
import ListManager from '../Data/ListManager'
import Utils2 from './Utils2'
import $ from 'jquery'
import ConstantData from '../Data/ConstantData'

class Utils1 {

  static Log = (e, ...t) => {
    if ("prd" !== HvacModels.Default.Environment.toLowerCase()) {
      if (t == null || t.length === 0) {
        this.Log.apply(console, [e]);
      } else {
        this.Log.apply(console, [e].concat(t));
      }
    }
  }

  static UtilsTest = (a, b) => {
    console.log('This is a test function', a, b);
  }

  static isObject(value) {
    return value !== null && typeof value === 'object';
  }

  static CloneBlock(e) {
    var t = Utils1.GetObjectInstance;
    if (null === e || "object" != typeof e)
      throw new Error("param is not an object");
    // var a = new t(e),
    var a = t(e),
      r = $.extend(!0, a, e);
    return (
      null !== e.Data &&
      e.Data instanceof Object &&
      (r.Data = Utils1.DeepCopy(e.Data)),
      r
    );
  }

  static GetObjectInstance(storedObject) {
    console.log('===ObjectStore.GetObjectInstance storedObject', storedObject);
    if (null === storedObject || "object" != typeof storedObject) {
      throw new Error("param is not an object");
    }
    return storedObject.constructor === StoredObject
      ? new StoredObject(null, null, null, false, false, true)
      : storedObject instanceof Array
        ? []
        : ($.each(ConstantData.StoredObjectType, function (a, type) {
          try {
            // Double === TODO check if need to add true at the end of the constructor
            if (storedObject.Type === type) return (t = new storedObject.constructor({})), false, true;
          } catch (error) {
            throw error;
          }
        }),
          t);
    var t;
  }

  static GenerateObjectID() {
    return GlobalData.CURRENT_SEQ_OBJECT_ID += 1
  }

  static PatchArrayBufferSlice() {
    ArrayBuffer.prototype.slice ||
      (
        ArrayBuffer.prototype.slice = function (e, t) {
          var a = new Uint8Array(this);
          void 0 === t &&
            (t = a.length);
          for (
            var r = new ArrayBuffer(t - e),
            i = new Uint8Array(r),
            n = 0;
            n < i.length;
            n++
          ) i[n] = a[n + e];
          return r
        }
      )
  }

  static IsStateOpen() {
    return GlobalData.stateManager.CurrentStateID > 0 &&
      GlobalData.stateManager.States[GlobalData.stateManager.CurrentStateID].IsOpen
  }

  static DeepCopy(e) {
    var t, a;
    if (null == e) return null;
    var r = typeof e;
    if (e instanceof Array) {
      t = [];
      var i = e.length;
      for (a = 0; a < i; a++) t.push(Utils1.DeepCopy(e[a]));
      return t;
    }
    if ("string" === r || "number" === r || "boolean" === r || "function" === r)
      return e;
    if (e instanceof Blob) return e.slice();
    if (e instanceof Uint8Array) return e;
    if ("object" === r) {
      for (var n in ((t = new e.constructor()), e)) {
        var o = e[n],
          s = typeof o;
        if (null == o) t[n] = o;
        else if ("string" === s || "number" === s || "boolean" === s) t[n] = o;
        else if (o instanceof Array) {
          null == t[n] && (t[n] = []);
          var l = o.length;
          for (a = 0; a < l; a++) t[n].push(Utils1.DeepCopy(o[a]));
        } else "function" !== s && (t[n] = Utils1.DeepCopy(o));
      }
      return t;
    }
    return null;
  }

  static GenerateUUID() {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && performance.now() * 1000) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  static CalcAngleFromPoints(startPoint, endPoint) {
    let deltaX = endPoint.x - startPoint.x;
    let deltaY = endPoint.y - startPoint.y;
    let angle;

    if (deltaY === 0) {
      angle = deltaX >= 0 ? 0 : 180;
    } else if (deltaX === 0) {
      angle = deltaY > 0 ? 90 : 270;
    } else {
      angle = Math.atan(deltaY / deltaX) * (180 / Math.PI);
      if (deltaX < 0) {
        angle += 180;
      } else if (deltaY < 0) {
        angle += 360;
      }
    }

    return angle;
  }

  static RoundCoord(value) {
    const roundedValue = Math.round(1000 * Number(value)) / 1000;
    return isNaN(roundedValue) ? value : roundedValue;
  }

  static RoundCoord2(value) {
    const roundedValue = Math.round(100 * Number(value)) / 100;
    return isNaN(roundedValue) ? value : roundedValue;
  }

  static RoundCoordLP(value) {
    const roundedValue = Math.round(10 * Number(value)) / 10;
    return isNaN(roundedValue) ? value : roundedValue;
  }

  static ResolveHyperlink(e) {
    // //'use strict';
    // var t = e ||
    //   '';
    // if (t && 0 != t.indexOf('http')) {
    //   var a = SDUI.Commands.MainController.Hyperlinks.ParseSDRHyperlink(t, !0);
    //   a ? (
    //     t = SDUI.Commands.MainController.Hyperlinks.MakeWebHyperlink(
    //       a.relativePath,
    //       a.ownerId,
    //       a.depository,
    //       SDUI.Commands.MainController.PagedSDRController.Manifest
    //     ),
    //     t = window.location.origin + t
    //   ) : t = 1 == t.indexOf(':') ||
    //     0 == t.indexOf('\\\\') ? null : 0 == t.indexOf('mailto:') ? e : t.indexOf('://') < 0 ? 'http://' + t : null
    // }
    // return t
    return null;
  }

  static ResolveHyperlinkForDisplay = (hyperlink) => {
    let resolvedLink = hyperlink || '';
    if (resolvedLink.indexOf('\r') >= 0) {
      const parts = resolvedLink.split('\r');
      resolvedLink = parts[0];
    } else if (resolvedLink.indexOf('/#') === 0) {
      resolvedLink = resolvedLink.slice(2);
    }
    return resolvedLink;
  }

  static CopyObj(obj) {
    if (!obj) return null;
    return JSON.parse(JSON.stringify(obj));
  }

  static toTitleCase(title) {
    return title.replace(
      /([^\W_]+[^\s-]*) */g,
      (
        function (e) {
          return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
        }
      )
    )
  }

  static StrEscapeRegExp(str) {
    return str.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, '\\$1')
  }

  static StrReplaceAll(find, replace, str) {
    return str.replace(new RegExp(this.StrEscapeRegExp(find), 'g'), replace)
  }

  static XML2Str(xml) {
    return (new XMLSerializer).serializeToString(xml)
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

  static CalcSegmentAngle(e, t) {
    var a,
      r,
      i,
      n;
    return a = t.x - e.x,
      0 === (r = t.y - e.y) ? n = a >= 0 ? 0 : 180 : 0 === a ? n = r > 0 ? 90 : 270 : (i = r / a, n = 180 * Math.atan(i) / Math.PI, a < 0 ? n += 180 : r < 0 && (n += 360)),
      n
  }

  static RotatePoint(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l = {
        x: 0,
        y: 0
      };
    return r = Math.PI * - a / 180,
      i = Math.sin(r),
      n = Math.cos(r),
      Math.abs(i) < 0.0001 &&
      (i = 0),
      Math.abs(n) < 0.0001 &&
      (n = 0),
      o = t.x - e.x,
      s = t.y - e.y,
      l.x = o * n + s * i + e.x,
      l.y = - o * i + s * n + e.y,
      l
  }

  static OffsetPointAtAngle(e, t, a) {
    var r = Utils1.DeepCopy(e);
    return 0 !== a &&
      (r.x += a, r = this.RotatePoint(e, r, t)),
      r
  }

  static CalcExtendedOffsetSegment(e, t, a, r) {
    var i,
      n;
    n = (i = this.CalcSegmentAngle(e.origSeg.start, e.origSeg.end)) - 90,
      e.extSeg.start = this.OffsetPointAtAngle(e.origSeg.start, n, t),
      e.extSeg.end = this.OffsetPointAtAngle(e.origSeg.end, n, t),
      e.extSeg.startExt = this.OffsetPointAtAngle(e.extSeg.start, i, - t * a),
      e.extSeg.startRay = this.OffsetPointAtAngle(e.extSeg.start, i, - r),
      e.extSeg.endExt = this.OffsetPointAtAngle(e.extSeg.end, i, t * a),
      e.extSeg.endRay = this.OffsetPointAtAngle(e.extSeg.end, i, r),
      e.extSeg.start = this.OffsetPointAtAngle(e.extSeg.start, i, - 1),
      e.extSeg.end = this.OffsetPointAtAngle(e.extSeg.end, i, 1),
      e.angle = i
  }

  static CalcSegmentIntersect(e, t, a, r, i) {
    var n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d;
    return o = (r.x - a.x) * (e.y - a.y) - (r.y - a.y) * (e.x - a.x),
      s = (t.x - e.x) * (e.y - a.y) - (t.y - e.y) * (e.x - a.x),
      0 === (n = (r.y - a.y) * (t.x - e.x) - (r.x - a.x) * (t.y - e.y)) ? 0 === o &&
        0 === s &&
        (
          e.x <= t.x ? (c = e.x, u = t.x) : (c = t.x, u = e.x),
          e.y <= t.y ? (p = e.y, d = t.y) : (p = t.y, d = e.y),
          a.x >= c &&
          a.x <= u &&
          a.y >= p &&
          a.y <= d
        ) &&
        (i.x = (a.x + t.x) / 2, i.y = (a.y + t.y) / 2, !0) : (
        S = s / n,
        !((l = o / n) < 0 || l > 1 || S < 0 || S > 1) &&
        (i.x = e.x + l * (t.x - e.x), i.y = e.y + l * (t.y - e.y), !0)
      )
  }

  static GetSegmentCenterPoint(e, t) {
    var a;
    return a.x = (e.x + t.x) / 2,
      a.y = (e.y + t.y) / 2,
      a
  }

  static compareAngle(angle1, angle2) {
    if (angle1 === angle2) {
      return 0;
    } else if (angle1 > angle2) {
      return angle1 < angle2 + 180 ? 1 : -1;
    } else {
      return angle1 < angle2 - 180 ? 1 : -1;
    }
  }

  static DeltaAngle(angle1, angle2) {
    let delta = angle1 - angle2;
    if (delta > 180) {
      delta -= 360;
    } else if (delta < -180) {
      delta += 360;
    }
    return delta;
  }

  static DeltaPoints(point1, point2) {
    const deltaX = Math.abs(point1.x - point2.x);
    const deltaY = Math.abs(point1.y - point2.y);
    return deltaX > deltaY ? deltaX : deltaY;
  }

  static GetSegmentsDeltaAngle(e, t, a, r) {
    var i,
      n = 0;
    for (i = a; i != r;) --i < 0 &&
      (i = t - 1),
      n += this.DeltaAngle(e[a].angle, e[i].angle),
      a = i;
    return n
  }

  static AreSegmentsObtuse(segments, totalSegments, startIndex, endIndex) {
    return this.GetSegmentsDeltaAngle(segments, totalSegments, startIndex, endIndex) > 0;
  }

  static AreSegmentsAjacent(totalSegments, currentIndex, adjacentIndex) {
    if (adjacentIndex < 0) {
      adjacentIndex = totalSegments - 1;
    }
    return adjacentIndex === currentIndex - 1;
  }

  static InsertSegment(segments, index, start, end, offset, scale, ray) {
    const newSegment = new SegmentData();
    newSegment.extSeg.start = start;
    newSegment.extSeg.end = end;
    newSegment.clipSeg.start = start;
    newSegment.clipSeg.end = end;
    newSegment.angle = this.CalcSegmentAngle(start, end);
    newSegment.extSeg.startExt = this.OffsetPointAtAngle(start, newSegment.angle, -offset * scale);
    newSegment.extSeg.startRay = this.OffsetPointAtAngle(start, newSegment.angle, -ray);
    newSegment.extSeg.endExt = this.OffsetPointAtAngle(end, newSegment.angle, offset * scale);
    newSegment.extSeg.endRay = this.OffsetPointAtAngle(end, newSegment.angle, ray);
    segments.splice(index, 0, newSegment);
  }

  static SegmentsInAlignment(e, t, a, r) {
    var i,
      n,
      o,
      s,
      l;
    return l = - e[r].angle,
      s = this.RotatePoint(o = e[r].extSeg.start, e[r].extSeg.end, l),
      i = this.RotatePoint(o, e[a].extSeg.start, l),
      n = this.RotatePoint(o, e[a].extSeg.end, l),
      i.x > s.x &&
      n.x > s.x &&
      i.x <= n.x
  }

  static isEmptySeg(segment) {
    return segment.start.x === segment.end.x &&
      segment.start.y === segment.end.y;
  }

  static isStart(index, flag) {
    return index === 0 && !flag;
  }

  static isEnd(index, length, flag) {
    return index === length - 1 && !flag;
  }

  static TrimTrailing(e) {

    return e.replace(/\s+$/g, '')
  }

  static TrimLeading(e) {

    return e.replace(/^\s+/g, '')
  }

  static CleanGraphics() {
    /*
    if (
      navigator.userAgent.search(/(edge)/i) > - 1 &&
      !SDGraphics._InGraphicsClean
    ) {
      var e = $('div#mainApp');
      e.css('visibility', ''),
        SDGraphics._InGraphicsClean = !0,
        setTimeout(
          (
            function () {
              e.css('visibility', 'visible'),
                SDGraphics._InGraphicsClean = !1
            }
          ),
          10
        )
    }
    */
  }

  static MakeGuid() {
    return 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'.replace(
      /a/g,
      (
        function () {
          var e = 16 * Math.random();
          return (e = Math.floor(e)).toString(16)
        }
      )
    )
  }
}

export default Utils1


















