// Common functions for HVAC module

import HvacModels from '../Data/Constant';
import StoredObject from '../Data/State/StoredObject';
import Globals from '../Data/Globals';
import GlobalData from '../Data/T3Gv';
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

  /*
  IsObject = function (e) {
    return 'object' == typeof e &&
    null != e
  }
  */

  static isObject(value) {
    return value !== null && typeof value === 'object';
  }

  /*
  CloneBlock = function (e) {
    //'use strict';
    var t = SDJS.Editor.GetObjectInstance;
    if (null === e || 'object' != typeof e) throw new GlobalDataSDJSError({
      source: 'CloneBlock',
      message: Messages.PARAM_MUST_BE_OBJECT.format('source')
    });
    var a = new t(e),
      r = $.extend(!0, a, e);
    return null !== e.Data &&
      e.Data instanceof Object &&
      (r.Data = SDJS.Utils1.DeepCopy(e.Data)),
      r
  }
  */

  /*
  static CloneBlock(e) {
    if (e === null || typeof e !== 'object') {
      throw new Error('CloneBlock');
    }

    const instance = Utils1.GetObjectInstance(e);
    const clonedObject = Object.assign(instance, e);

    if (e.Data !== null && typeof e.Data === 'object') {
      clonedObject.Data = Utils1.DeepCopy(e.Data);
    }

    return clonedObject;
  }
  */

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

  /*
  GetObjectInstance = function (e) {
    //'use strict';
    if (null === e || 'object' != typeof e) throw new GlobalDataSDJSError({
      source: 'GetObjectInstance',
      message: Messages.PARAM_MUST_BE_OBJECT.format('object')
    });
    return e.constructor === SDJS.Editor.StoredObject ? new SDJS.Editor.StoredObject(null, null, null, !1, !1) : e instanceof Array ? [] : (
      $.each(
        SDJS.Globals.StoredObjectType,
        (
          function (a, r) {
            try {
              if (e.Type === r) return t = new e.constructor({
              }),
                !1
            } catch (e) {
              new GlobalDataSDJSError({
                source: 'GetObjectInstance',
                message: Messages.STORED_OBJECT_TYPE_INVALID.format('key')
              })
            }
          }
        )
      ),
      t
    );
    var t
  }
  */

  /*
  static GetObjectInstance(e) {
    if (null === e || 'object' != typeof e) {
      throw new Error('GetObjectInstance');
    }

    let t;
    if (e.constructor === StoredObject) {
      return new StoredObject(null, null, null, false, false);
    } else if (e instanceof Array) {
      return [];
    } else {
      Object.keys(Globals.StoredObjectType).forEach((key) => {
        try {
          if (e.Type === Globals.StoredObjectType[key]) {
            t = new e.constructor({});
            return false;
          }
        } catch (error) {
          throw new Error('GetObjectInstance11');
        }
      });
      return t;
    }
  }
  */

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

  /*
  GenerateObjectID = function () {
    //'use strict';
    return CURRENT_SEQ_OBJECT_ID += 1
  }
  */

  static GenerateObjectID() {
    return T3Gv.CURRENT_SEQ_OBJECT_ID += 1
  }

  /*
  PatchArrayBufferSlice = function () {
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
  */

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

  /*
  IsStateOpen = function () {
    return T3Gv.stateManager.CurrentStateID > 0 &&
      T3Gv.stateManager.States[T3Gv.stateManager.CurrentStateID].IsOpen
  }
  */

  static IsStateOpen() {
    return T3Gv.stateManager.CurrentStateID > 0 &&
      T3Gv.stateManager.States[T3Gv.stateManager.CurrentStateID].IsOpen
  }

  /*
  DeepCopy = function (e) {
    var t,
      a;
    if (null == e) return null;
    var r = typeof e;
    if (e instanceof Array) {
      t = [];
      var i = e.length;
      for (a = 0; a < i; a++) t.push(SDJS.Utils1.DeepCopy(e[a]));
      return t
    }
    if ('string' === r || 'number' === r || 'boolean' === r || 'function' === r) return e;
    if (e instanceof Blob) return e.slice();
    if (e instanceof Uint8Array) return e;
    if ('object' === r) {
      for (var n in t = new e.constructor, e) {
        var o = e[n],
          s = typeof o;
        if (null == o) t[n] = o;
        else if ('string' === s || 'number' === s || 'boolean' === s) t[n] = o;
        else if (o instanceof Array) {
          null == t[n] &&
            (t[n] = []);
          var l = o.length;
          for (a = 0; a < l; a++) t[n].push(SDJS.Utils1.DeepCopy(o[a]))
        } else 'function' !== s &&
          (t[n] = SDJS.Utils1.DeepCopy(o))
      }
      return t
    }
    return null
  }
  */

  /*
  static DeepCopy1 (e){
    if (e === null || e === undefined) return null;

    if (Array.isArray(e)) {
      return e.map(item => this.DeepCopy1(item));
    }

    if (typeof e === 'string' || typeof e === 'number' || typeof e === 'boolean' || typeof e === 'function') {
      return e;
    }

    if (e instanceof Blob) {
      return e.slice();
    }

    if (e instanceof Uint8Array) {
      return new Uint8Array(e);
    }

    if (typeof e === 'object') {
      const copy = new e.constructor();
      for (const key in e) {
        if (e.hasOwnProperty(key)) {
          copy[key] = this.DeepCopy1(e[key]);
        }
      }
      return copy;
    }

    return null;
  }
  */

  /*
  static DeepCopy(obj) {
    if (obj === null || obj === undefined) return obj;

    let copy;

    if (Array.isArray(obj)) {
      copy = [];
      for (let i = 0; i < obj.length; i++) {
        copy[i] = Utils1.DeepCopy(obj[i]);
      }
      return copy;
    }

    if (typeof obj === 'object') {
      copy = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          copy[key] = Utils1.DeepCopy(obj[key]);
        }
      }
      return copy;
    }

    if (obj instanceof Blob) {
      return obj.slice();
    }

    if (obj instanceof Uint8Array) {
      return new Uint8Array(obj);
    }

    return obj;
  }
  */

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

  /*
  export const CalcAngleFromPoints = (point1, point2) => {
    const deltaX = point2.x - point1.x;
    const deltaY = point2.y - point1.y;
    let angle;

    if (deltaX === 0) {
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
  */

  // static CalcAngleFromPoints(e, t) {
  //   var a,
  //     r,
  //     i;
  //   return a = t.x - e.x,
  //     (r = t.y - e.y) ? a ? (i = 180 * Math.atan(r / a) / Math.PI, a < 0 ? i += 180 : r < 0 && (i += 360)) : i = r > 0 ? 90 : 270 : i = a >= 0 ? 0 : 180,
  //     i
  // }


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

  /*
  static CalcAngleFromPoints = (startPoint, endPoint) => {
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
  */

  /*
  static RoundCoord(e) {
    //'use strict';
    var t = Math.round(1000 * Number(e)) / 1000;
    return isNaN(t) ? e : t
  }

  static RoundCoord2(e) {
    //'use strict';
    var t = Math.round(100 * Number(e)) / 100;
    return isNaN(t) ? e : t
  }
  */

  static RoundCoord(value) {
    const roundedValue = Math.round(1000 * Number(value)) / 1000;
    return isNaN(roundedValue) ? value : roundedValue;
  }

  static RoundCoord2(value) {
    const roundedValue = Math.round(100 * Number(value)) / 100;
    return isNaN(roundedValue) ? value : roundedValue;
  }

  /*
  export const RoundCoordLP = (number) => {
    const result = Math.round(10 * Number(number)) / 10;
    return isNaN(result) ? number : result;
  }
  */

  /*
  static RoundCoordLP(e) {
    //'use strict';
    var t = Math.round(10 * Number(e)) / 10;
    return isNaN(t) ? e : t
  }
  */

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

  /*
  static ResolveHyperlinkForDisplay(e) {
    //'use strict';
    var t = e ||
      '';
    if (t.indexOf('\r') >= 0) {
      var a = t.split('\r');
      t = a[0]
    } else 0 == t.indexOf('/#') &&
      (t = t.slice(2));
    return t
  }
  */

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

  /*
  static CopyObj(e) {
    //'use strict';
    return e ? JSON.parse(JSON.stringify(e)) : null
  }
  */

  static CopyObj(obj) {
    if (!obj) return null;
    return JSON.parse(JSON.stringify(obj));
  }

  /*
  function joinUrlElements() {
    var e = new RegExp('^\\/|\\/$', 'g');
    return Array.prototype.slice.call(arguments).map((function (t) {
      return t.replace(e, '')
    })).join('/')
  }
  */

  /*
  function enumToString(e, t) {
    for (var a in e) if (e[a] == t) return a;
    return null
  }
  */

  /*
  String.prototype.format = function () {
    //'use strict';
    for (var e = this, t = arguments.length; t--;) e = e.replace(new RegExp('\\{' + t + '\\}', 'gm'), arguments[t]);
    return e
  }
  */

  /*
  Date.prototype.addDays = function (e) {
    var t = new Date(this.valueOf());
    return t.setDate(t.getDate() + e),
      t
  }
  */

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

  /*
  function StrEscapeRegExp(e) {
    return e.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, '\\$1')
  }
  */

  static StrEscapeRegExp(str) {
    return str.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, '\\$1')
  }

  /*
  function StrReplaceAll(e, t, a) {
    return a.replace(new RegExp(StrEscapeRegExp(e), 'g'), t)
  }
  */

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

  /*
  static cloneToDoc(sourceElement, preserveNamespace) {
    const clonedElement = document.createElementNS(sourceElement.namespaceURI, sourceElement.nodeName);

    for (let i = 0; i < sourceElement.attributes.length; i++) {
      const attribute = sourceElement.attributes[i];
      let attributeName = attribute.nodeName;

      if (attributeName.length) {
        if (attributeName[0] >= 'A' && attributeName[0] <= 'Z') {
          attributeName = attributeName.toLowerCase();
        }

        if (preserveNamespace) {
          if (attribute.nodeValue !== '' && attributeName !== 'xmlns') {
            clonedElement.setAttribute(attributeName, attribute.nodeValue);
          }
        } else {
          if (attribute.nodeValue !== '') {
            clonedElement.setAttribute(attributeName, attribute.nodeValue);
          }
        }
      }
    }

    for (let i = 0; i < sourceElement.childNodes.length; i++) {
      const childNode = sourceElement.childNodes[i];
      if (childNode.nodeType === 1) {
        clonedElement.appendChild(this.cloneToDoc(childNode, preserveNamespace));
      } else {
        clonedElement.appendChild(document.createTextNode(childNode.nodeValue));
      }
    }

    return clonedElement;
  }
  */

  static CalcSegmentAngle(e, t) {
    var a,
      r,
      i,
      n;
    return a = t.x - e.x,
      0 === (r = t.y - e.y) ? n = a >= 0 ? 0 : 180 : 0 === a ? n = r > 0 ? 90 : 270 : (i = r / a, n = 180 * Math.atan(i) / Math.PI, a < 0 ? n += 180 : r < 0 && (n += 360)),
      n
  }

  /*
  static CalcSegmentAngle(startPoint, endPoint) {
    let deltaX = endPoint.x - startPoint.x;
    let deltaY = endPoint.y - startPoint.y;
    let angle;

    if (deltaY === 0) {
      angle = deltaX >= 0 ? 0 : 180;
    } else if (deltaX === 0) {
      angle = deltaY > 0 ? 90 : 270;
    } else {
      let slope = deltaY / deltaX;
      angle = Math.atan(slope) * (180 / Math.PI);
      if (deltaX < 0) {
        angle += 180;
      } else if (deltaY < 0) {
        angle += 360;
      }
    }

    return angle;
  }
  */

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

  /*
  static RotatePoint(origin, point, angle) {
    const radian = Math.PI * -angle / 180;
    const sin = Math.sin(radian);
    const cos = Math.cos(radian);
    const rotatedPoint = {
      x: 0,
      y: 0
    };

    const deltaX = point.x - origin.x;
    const deltaY = point.y - origin.y;

    rotatedPoint.x = deltaX * cos + deltaY * sin + origin.x;
    rotatedPoint.y = -deltaX * sin + deltaY * cos + origin.y;

    return rotatedPoint;
  }
  */

  static OffsetPointAtAngle(e, t, a) {
    var r = Utils1.DeepCopy(e);
    return 0 !== a &&
      (r.x += a, r = this.RotatePoint(e, r, t)),
      r
  }

  /*
  static OffsetPointAtAngle(point, angle, offset) {
    let newPoint = this.DeepCopy(point);
    if (offset !== 0) {
      newPoint.x += offset;
      newPoint = this.RotatePoint(point, newPoint, angle);
    }
    return newPoint;
  }
  */

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

  /*
  static CalcExtendedOffsetSegment(segment, offset, scale, ray) {
    const angle = this.CalcSegmentAngle(segment.origSeg.start, segment.origSeg.end);
    const perpendicularAngle = angle - 90;

    segment.extSeg.start = this.OffsetPointAtAngle(segment.origSeg.start, perpendicularAngle, offset);
    segment.extSeg.end = this.OffsetPointAtAngle(segment.origSeg.end, perpendicularAngle, offset);
    segment.extSeg.startExt = this.OffsetPointAtAngle(segment.extSeg.start, angle, -offset * scale);
    segment.extSeg.startRay = this.OffsetPointAtAngle(segment.extSeg.start, angle, -ray);
    segment.extSeg.endExt = this.OffsetPointAtAngle(segment.extSeg.end, angle, offset * scale);
    segment.extSeg.endRay = this.OffsetPointAtAngle(segment.extSeg.end, angle, ray);
    segment.extSeg.start = this.OffsetPointAtAngle(segment.extSeg.start, angle, -1);
    segment.extSeg.end = this.OffsetPointAtAngle(segment.extSeg.end, angle, 1);
    segment.angle = angle;
  }
  */

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

  /*
  static CalcSegmentIntersect(segment1Start, segment1End, segment2Start, segment2End, intersectionPoint) {
    let denominator, numerator1, numerator2, r, s;

    numerator1 = (segment2End.x - segment2Start.x) * (segment1Start.y - segment2Start.y) - (segment2End.y - segment2Start.y) * (segment1Start.x - segment2Start.x);
    numerator2 = (segment1End.x - segment1Start.x) * (segment1Start.y - segment2Start.y) - (segment1End.y - segment1Start.y) * (segment1Start.x - segment2Start.x);
    denominator = (segment2End.y - segment2Start.y) * (segment1End.x - segment1Start.x) - (segment2End.x - segment2Start.x) * (segment1End.y - segment1Start.y);

    if (denominator === 0) {
      if (numerator1 === 0 && numerator2 === 0) {
        let minX1 = Math.min(segment1Start.x, segment1End.x);
        let maxX1 = Math.max(segment1Start.x, segment1End.x);
        let minY1 = Math.min(segment1Start.y, segment1End.y);
        let maxY1 = Math.max(segment1Start.y, segment1End.y);

        if (segment2Start.x >= minX1 && segment2Start.x <= maxX1 && segment2Start.y >= minY1 && segment2Start.y <= maxY1) {
          intersectionPoint.x = (segment2Start.x + segment1End.x) / 2;
          intersectionPoint.y = (segment2Start.y + segment1End.y) / 2;
          return true;
        }
      }
      return false;
    }

    r = numerator1 / denominator;
    s = numerator2 / denominator;

    if (r >= 0 && r <= 1 && s >= 0 && s <= 1) {
      intersectionPoint.x = segment1Start.x + r * (segment1End.x - segment1Start.x);
      intersectionPoint.y = segment1Start.y + r * (segment1End.y - segment1Start.y);
      return true;
    }

    return false;
  }
  */

  static GetSegmentCenterPoint(e, t) {
    var a;
    return a.x = (e.x + t.x) / 2,
      a.y = (e.y + t.y) / 2,
      a
  }

  /*
  static GetSegmentCenterPoint(startPoint, endPoint) {
    const centerPoint = {
      x: (startPoint.x + endPoint.x) / 2,
      y: (startPoint.y + endPoint.y) / 2
    };
    return centerPoint;
  }
  */

  /*
  function compareAngle(e, t) {
    return t == e ? 0 : e > t ? e < t + 180 ? 1 : - 1 : e < t - 180 ? 1 : - 1
  }
  */

  static compareAngle(angle1, angle2) {
    if (angle1 === angle2) {
      return 0;
    } else if (angle1 > angle2) {
      return angle1 < angle2 + 180 ? 1 : -1;
    } else {
      return angle1 < angle2 - 180 ? 1 : -1;
    }
  }

  /*
  function DeltaAngle(e, t) {
    var a;
    return (a = e - t) > 180 ? a -= 360 : a < - 180 &&
      (a += 360),
      a
  }
  */

  static DeltaAngle(angle1, angle2) {
    let delta = angle1 - angle2;
    if (delta > 180) {
      delta -= 360;
    } else if (delta < -180) {
      delta += 360;
    }
    return delta;
  }

  /*
  function DeltaPoints(e, t) {
    var a,
      r;
    return (a = Math.abs(e.x - t.x)) > (r = Math.abs(e.y - t.y)) ? a : r
  }
  */

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

  /*
  static GetSegmentsDeltaAngle(segments, totalSegments, startIndex, endIndex) {
    let deltaAngleSum = 0;
    let currentIndex = startIndex;

    while (currentIndex !== endIndex) {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = totalSegments - 1;
      }
      deltaAngleSum += this.DeltaAngle(segments[startIndex].angle, segments[currentIndex].angle);
      startIndex = currentIndex;
    }

    return deltaAngleSum;
  }
  */

  /*
  export function AreSegmentsObtuse(e, t, a, r) {
    return GetSegmentsDeltaAngle(e, t, a, r) > 0
  }
  */

  static AreSegmentsObtuse(segments, totalSegments, startIndex, endIndex) {
    return this.GetSegmentsDeltaAngle(segments, totalSegments, startIndex, endIndex) > 0;
  }

  /*
  export function AreSegmentsAjacent(e, t, a) {
    return a < 0 &&
      (a = e - 1),
      a == t - 1
  }
  */

  static AreSegmentsAjacent(totalSegments, currentIndex, adjacentIndex) {
    if (adjacentIndex < 0) {
      adjacentIndex = totalSegments - 1;
    }
    return adjacentIndex === currentIndex - 1;
  }

  /*
  export function InsertSegment(e, t, a, r, i, n, o) {
    var s = new ListManager.SegmentData;
    s.extSeg.start = a,
      s.extSeg.end = r,
      s.clipSeg.start = a,
      s.clipSeg.end = r,
      s.angle = CalcSegmentAngle(a, r),
      s.extSeg.startExt = OffsetPointAtAngle(a, s.angle.angle, - i * n),
      s.extSeg.startRay = OffsetPointAtAngle(a, s.angle.angle, - o),
      s.extSeg.endExt = OffsetPointAtAngle(r, s.angle.angle, i * n),
      s.extSeg.endRay = OffsetPointAtAngle(r, s.angle.angle, o),
      e.splice(t, 0, s)
  }
  */

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

  /*
  static SegmentsInAlignment(segments, startIndex, endIndex, referenceIndex) {
    const referenceAngle = -segments[referenceIndex].angle;
    const referenceStart = segments[referenceIndex].extSeg.start;
    const referenceEnd = this.RotatePoint(referenceStart, segments[referenceIndex].extSeg.end, referenceAngle);
    const startPoint = this.RotatePoint(referenceStart, segments[startIndex].extSeg.start, referenceAngle);
    const endPoint = this.RotatePoint(referenceStart, segments[startIndex].extSeg.end, referenceAngle);

    return startPoint.x > referenceEnd.x &&
      endPoint.x > referenceEnd.x &&
      startPoint.x <= endPoint.x;
  }
  */

  /*
  export function isEmptySeg(e) {
    return e.start.x == e.end.x &&
      e.start.y == e.end.y
  }
  */

  static isEmptySeg(segment) {
    return segment.start.x === segment.end.x &&
      segment.start.y === segment.end.y;
  }

  /*
  export function isStart(e, t) {
    return 0 === e &&
      !t
  }
  */

  static isStart(index, flag) {
    return index === 0 && !flag;
  }

  /*
  export function isEnd(e, t, a) {
  }
  */

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


















