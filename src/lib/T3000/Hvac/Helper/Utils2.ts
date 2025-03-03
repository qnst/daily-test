
import $ from 'jquery'
import Point from '../Model/Point'

class Utils2 {

  static HasFlag(e, t) {
    return 'number' == typeof e &&
      'number' == typeof t &&
      (e & t) === t
  }

  static AddFlag(e, t) {
    return 'number' != typeof e ||
      'number' != typeof t ? e : e | t
  }

  static RemoveFlag(e, t) {
    return 'number' != typeof e ||
      'number' != typeof t ? e : e &= ~t
  }

  static SetFlag(e, t, a) {
    var r = e;
    return a ? r |= t : e & t &&
      (r &= ~t),
      r
  }

  static CopyRect(newFrame, frame) {
    newFrame.x = frame.x;
    newFrame.y = frame.y;
    newFrame.width = frame.width;
    newFrame.height = frame.height;
  }

  static pointInRect(
    rect: { x: number; y: number; width: number; height: number },
    point: { x: number; y: number }
  ): boolean {
    console.log("= S.BaseDrawingObject - Input rect:", rect, "point:", point);
    const isInside =
      point.x >= rect.x &&
      point.x < rect.x + rect.width &&
      point.y >= rect.y &&
      point.y < rect.y + rect.height;
    console.log("= S.BaseDrawingObject - Output:", isInside);
    return isInside;
  }

  static EqualPt(point1, point2) {
    return this.IsEqual(point1.x, point2.x) && this.IsEqual(point1.y, point2.y);
  }

  static TrimDP(e, t) {
    var a = e.toFixed(t);
    return parseFloat(a)
  }

  static Pt2CPoint(e, t) {
    var a = {};
    return t ? (a.h = e.y, a.v = e.x) : (a.h = e.x, a.v = e.y),
      a
  }

  static Rect2CRect(e, t) {
    var a = {
      h: 0,
      v: 0,
      hdist: 0,
      vdist: 0
    };
    return t ? (a.h = e.y, a.v = e.x, a.hdist = e.height, a.vdist = e.width) : (a.h = e.x, a.hdist = e.width, a.v = e.y, a.vdist = e.height),
      a
  }

  static CRect2Rect(e, t) {
    var a = {};
    return t ? (a.x = e.v, a.y = e.h, a.width = e.vdist, a.height = e.hdist) : (a.x = e.h, a.width = e.hdist, a.y = e.v, a.height = e.vdist),
      a
  }

  static Pt2Rect(e, t) {
    var a,
      r,
      i = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return null == e ||
      null == t ? null : (
      i.x = e.x,
      t.x < i.x &&
      (i.x = t.x),
      i.y = e.y,
      t.y < i.y &&
      (i.y = t.y),
      i.width = e.x - i.x,
      (a = t.x - i.x) > i.width &&
      (i.width = a),
      i.height = e.y - i.y,
      (r = t.y - i.y) > i.height &&
      (i.height = r),
      i
    )
  }

  static Add2Rect(e, t) {
    e.x -= t.left,
      e.width += t.right + t.left,
      e.y -= t.top,
      e.height += t.bottom + t.top
  }

  static SubRect(e, t) {
    e.x += t.left,
      e.width -= t.right + t.left,
      e.y += t.top,
      e.height -= t.bottom + t.top
  }

  static GetPolyRect(e, t) {
    var a,
      r,
      i;
    if (i = t.length) {
      e.x = t[0].x,
        e.y = t[0].y,
        a = e.x,
        r = e.y,
        e.width = 0,
        e.height = 0;
      for (var n = 1; n < i; n++) t[n].x < e.x &&
        (e.x = t[n].x),
        t[n].x > a &&
        (a = t[n].x),
        t[n].y < e.y &&
        (e.y = t[n].y),
        t[n].y > r &&
        (r = t[n].y);
      e.width = a - e.x,
        e.height = r - e.y
    }
  }

  static GetPolyRect1(e, t, a, r) {
    var i,
      n;
    if (e.x = 0, e.y = 0, e.width = 0, e.height = 0, 0 !== (n = t.length)) {
      void 0 === a &&
        (a = 0),
        void 0 === r &&
        (r = n),
        e.x = t[a].x,
        e.y = t[a].y;
      for (var o = 1 + a; o < r; o++) t[o].x < e.x ? (i = e.x - t[o].x, e.x = t[o].x, e.width += i) : t[o].x > e.x + e.width &&
        (i = t[o].x - (e.x + e.width), e.width += i),
        t[o].y < e.y ? (i = e.y - t[o].y, e.y = t[o].y, e.height += i) : t[o].y > e.y + e.height &&
          (i = t[o].y - (e.y + e.height), e.height += i)
    }
  }

  static IsRectEmpty(e) {
    return e.width <= 0 ||
      e.height <= 0
  }

  static InflateRect(e, t, a) {
    e.x -= t,
      e.width += 2 * t,
      e.y -= a,
      e.height += 2 * a
  }

  static OffsetRect(e, t, a) {
    e.x += t,
      e.y += a
  }

  static EqualRect(e, t, a) {
    return null == a &&
      (a = 0.001),
      !(Math.abs(e.x - t.x) > a) &&
      (
        !(Math.abs(e.y - t.y) > a) &&
        (
          !(Math.abs(e.width - t.width) > a) &&
          !(Math.abs(e.height - t.height) > a)
        )
      )
  }

  static InflatePoint(e, t) {
    var a = t / 2,
      r = {};
    return r.x = e.x - a,
      r.width = 2 * a,
      r.y = e.y - a,
      r.height = 2 * a,
      r
  }

  static sqrt(e) {
    return e < 1e-9 ? 0 : Math.sqrt(e)
  }

  static parseFloat(e) {
    if (null == e) return 0;
    if (0 === e.length) return 0;
    '.' === e.charAt(0) &&
      (e = '0' + e);
    var t = parseFloat(e);
    return isNaN(t) &&
      (t = 0),
      t
  }

  static UnionRect(e, t, a) {
    var r,
      i,
      n,
      o,
      s = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return e.x < t.x ? s.x = e.x : s.x = t.x,
      e.y < t.y ? s.y = e.y : s.y = t.y,
      r = e.x + e.width,
      i = t.x + t.width,
      s.width = r > i ? r - s.x : i - s.x,
      n = e.y + e.height,
      o = t.y + t.height,
      s.height = n > o ? n - s.y : o - s.y,
      a.x = s.x,
      a.y = s.y,
      a.width = s.width,
      a.height = s.height,
      a
  }

  static IntersectRect(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s;
    return e.y <= t.y ? (o = e, s = t) : (o = t, s = e),
      a = o.x + o.width,
      r = s.x + s.width,
      i = o.y + o.height,
      n = s.y + s.height,
      s.y >= o.y &&
        s.y - i < - 0.01 ? o.x >= s.x ? o.x - r < - 0.01 ? {
          x: o.x,
          width: Math.min(a, r) - o.x,
          y: s.y,
          height: Math.min(i, n) - s.y
        }
          : null : s.x - a < - 0.01 ? {
            x: s.x,
            width: Math.min(a, r) - s.x,
            y: s.y,
            height: Math.min(i, n) - s.y
          }
        : null : null
  }

  static RectInsideRect(e, t) {
    var a = e.x + e.width,
      r = t.x + t.width,
      i = e.y + e.height,
      n = t.y + t.height;
    return t.x >= e.x &&
      r <= a &&
      t.y >= e.y &&
      n <= i
  }

  static CN_UnionRect(e, t, a) {
    var r,
      i,
      n,
      o,
      s = {
        h: 0,
        v: 0,
        hdist: 0,
        vdist: 0
      };
    return e.h < t.h ? s.h = e.h : s.h = t.h,
      e.v < t.v ? s.v = e.v : s.v = t.v,
      r = e.h + e.hdist,
      i = t.h + t.hdist,
      s.hdist = r > i ? r - s.h : i - s.h,
      n = e.v + e.vdist,
      o = t.v + t.vdist,
      s.vdist = n > o ? n - s.v : o - s.v,
      a.h = s.h,
      a.v = s.v,
      a.hdist = s.hdist,
      a.vdist = s.vdist,
      a
  }

  static SetRect(e, t, a, r) {
    var i = {};
    return i.x = e,
      i.width = a - e,
      i.y = t,
      i.height = r - t,
      i
  }

  static PolyFromRect(e) {
    var t = [];

    // ListManager.Point
    // Double === TODO update to use Point class
    return t.push(new Point(e.x, e.y)),
      t.push(new Point(e.x + e.width, e.y)),
      t.push(new Point(e.x + e.width, e.y + e.height)),
      t.push(new Point(e.x, e.y + e.height)),
      t.push(new Point(e.x, e.y)),
      t
  }

  static GetRectFromDiagonal(e, t) {
    var a,
      r,
      i;
    return this.IsEqual(e.height, 0) ? (r = t, i = 0) : this.IsEqual(e.width, 0) ? (r = 0, i = t) : i = (a = e.height / e.width) * (r = this.sqrt(t * t / (1 + a * a))),
    {
      width: r,
      height: i
    }
  }

  static IsPointInPoly(e, t) {
    //'use strict';
    var a,
      r,
      i = !1,
      n = e.length;
    for (a = - 1, r = n - 1; ++a < n; r = a) (e[a].y <= t.y && t.y < e[r].y || e[r].y <= t.y && t.y < e[a].y) &&
      t.x < (e[r].x - e[a].x) * (t.y - e[a].y) / (e[r].y - e[a].y) + e[a].x &&
      (i = !i);
    return i
  }

  static IsFrameCornersInPoly(e, t) {
    var a = { x: 0, y: 0 };
    return a.x = t.x,
      a.y = t.y,
      // Double ===
      !!this.IsPointInPoly(e, a) ||
      (
        a.x += t.width,
        !!this.IsPointInPoly(e, a) ||
        (
          a.y += t.height,
          !!this.IsPointInPoly(e, a) ||
          (a.x -= t.width, !!this.IsPointInPoly(e, a))
        )
      )
  }

  static IsAllFrameCornersInPoly(e, t) {
    //'use strict';
    var a = {};
    return a.x = t.x,
      a.y = t.y,
      !!SDJS.Utils.IsPointInPoly(e, a) &&
      (
        a.x += t.width,
        !!SDJS.Utils.IsPointInPoly(e, a) &&
        (
          a.y += t.height,
          !!SDJS.Utils.IsPointInPoly(e, a) &&
          (a.x -= t.width, !!SDJS.Utils.IsPointInPoly(e, a))
        )
      )
  }

  static IsAllPolyPointsInPoly(e, t) {
    //'use strict';
    var a,
      r = t.length;
    for (a = 0; a < r; a++) if (!SDJS.Utils.IsPointInPoly(e, t[a])) return !1;
    return !0
  }

  static StringtoCSV(e) {
    var t,
      a,
      r = e.split('"');
    if ((t = r.length) < 2) return e;
    for (e = '', a = 0; a < t - 1; a++) e = e + r[a] + '""';
    return e += r[t - 1]
  }

  static IsEqual(value1: number, value2: number, tolerance?: number): boolean {
    const tol = tolerance !== undefined ? tolerance : 0.5;
    return Math.abs(value1 - value2) < tol;
  }

  static SpliceArray(e, t, a, r) {
    var i = [],
      n = e.length;
    if (t >= n) i = e.concat(r);
    else {
      var o = e.slice(0, t),
        s = e.slice(t + a, n);
      i = (i = o.concat(r)).concat(s)
    }
    return i
  }

  static EqualDate(e, t) {
    return e.year === t.year ? e.month === t.month ? e.day === t.day ? 0 : e.day < t.day ? - 1 : 1 : e.month < t.month ? - 1 : 1 : e.year < t.year ? - 1 : 1
  }

  static ArrayToString(e) {
    var t,
      a,
      r = '';
    for (t = e.length, a = 0; a < t; a++) r += e[a];
    return r
  }

  static BrowserDetect() {

  }

  static PolyYCurve(e, t, a, r, i, n, o, s, l, S) {
    var c,
      u,
      p,
      d,
      D,
      g,
      h,
      m;
    D = 0;
    var C = {};
    for (
      u = (t.bottom - t.top) / 2,
      c = t.right - t.left,
      p = (2 * u - n - o) / (a - 1),
      h = 0;
      h < a;
      ++h
    ) {
      g = p * h + n,
        r &&
        g < r &&
        (g = r),
        d = u - g,
        i &&
        d - i < - u &&
        (d = - (u - i)),
        C.y = t.top + (u - d),
        u ? D = d / u : c = 0,
        m = this.sqrt(1 - D * D) * c,
        C.x = s ? t.right - m : t.left + m;
      var y = $.extend(!0, {
      }, C);
      l &&
        (y.x /= l),
        S &&
        (y.y /= S),
        e.push(y)
    }
    return e
  }

  static ArrayBufferToBase64(e) {
    for (var t = '', a = new Uint8Array(e), r = a.byteLength, i = 0; i < r; i++) t += String.fromCharCode(a[i]);
    return window.btoa(t)
  }

  static UInt8ToString(e) {
    for (var t = [], a = 0; a < e.length; a += 32768) t.push(String.fromCharCode.apply(null, e.subarray(a, a + 32768)));
    return t.join('')
  }

  static RegExpEscape(e) {
    var t,
      a,
      r = '';
    for (t = e.length, a = 0; a < t; a++) switch (e[a]) {
      case '$':
      case '*':
      case '^':
      case '?':
      case '+':
        r = r + '\\' + e[a];
        break;
      default:
        r += e[a]
    }
    return r
  }

  static StopPropagationAndDefaults(e) {
    e.preventDefault(),
      e.stopPropagation(),
      e.gesture &&
      (e.gesture.preventDefault(), e.gesture.stopPropagation())
  }

  static UTF8_to_B64(e) {
    var t;
    try {
      t = window.btoa(unescape(encodeURIComponent(e)))
    } catch (e) {
      t = '';
      throw e;
    }
    return t
  }

  static B64_to_UTF8(e) {
    var t;
    try {
      t = decodeURIComponent(escape(window.atob(e)))
    } catch (e) {
      t = '';
      throw e;
    }
    return t
  }

  static arrayBufferToString(e) {
    for (var t = new Uint8Array(e), a = t.length, r = '', i = 0; i < a; i += 65535) {
      var n = 65535;
      i + 65535 > a &&
        (n = a - i),
        r += String.fromCharCode.apply(null, t.subarray(i, i + n))
    }
    return r
  }

  static toCDNUrl(e) {
    return 'undefined' == typeof ServerPage ||
      void 0 === ServerPage.CDNUrl ||
      0 === ServerPage.CDNUrl.length ||
      e.match(/^(http|\/\/)/gi) ? e : (0 !== e.indexOf('/') && (e = '/' + e), ServerPage.CDNUrl + e)
  }

  static cacheBustUrl(e) {
    return void 0 === SDUI.Constants.BuildNumber ||
      SDUI.Constants.BuildNumber <= 0 ? e : (
      (e = e.replace(/[\?\&]nc=[0-9]*/gi, '')).match(/\?/gi) ? e += '&nc=' : e += '?nc=',
      e += SDUI.Constants.BuildNumber
    )
  }

  static InTemplateDialog() {
    return 'undefined' != typeof SDTD &&
      void 0 !== SDTD.Commands
  }

  static InEditor() {
    return 'undefined' != typeof SDUI &&
      void 0 !== SDUI.Commands
  }

  static ParseSVGDimensions(e) {
    var t = SDJS.Utils.UInt8ToString(e);
    return Basic.Element.Style.ExtractSVGSize(t)
  }

  static ObjectDiff(e, t, a, r, i) {
    if (e === t) return {
      changed: 'equal',
      value: e
    };
    var n = {},
      o = !0;
    for (var s in e) if (void 0 !== e[s]) if (s in t) if (e[s] === t[s]) a ||
      (n[s] = {
        changed: 'equal',
        value: e[s]
      });
    else {
      var l = typeof e[s],
        S = typeof t[s];
      if (
        !e[s] ||
        !t[s] ||
        'object' != l &&
        'function' != l ||
        'object' != S &&
        'function' != S
      ) {
        if (
          a &&
          r &&
          !isNaN(e[s]) &&
          !isNaN(t[s]) &&
          Math.round(e[s]) == Math.round(t[s])
        ) continue;
        o = !1,
          n[s] = {
            changed: 'primitive change',
            removed: e[s],
            added: t[s]
          }
      } else {
        var c = SDJS.Utils.ObjectDiff(e[s], t[s], a, r, i);
        'equal' == c.changed ? a ||
          (n[s] = {
            changed: 'equal',
            value: e[s]
          }) : (o = !1, n[s] = c)
      }
    } else o = !1,
      n[s] = {
        changed: 'removed',
        value: e[s]
      };
    if (!a || !i) for (s in t) void 0 !== t[s] &&
      (s in e || (o = !1, n[s] = {
        changed: 'added',
        value: t[s]
      }));
    return o ? {
      changed: 'equal',
      value: e
    }
      : {
        changed: 'object change',
        value: n
      }
  }

  static ParseSDRDate(e, t, a) {
    var r,
      i,
      n,
      o,
      s = {},
      l = null;
    function S(e) {
      return e.trim().replace(/[^\x00-\x7F]/g, '')
    }
    if (!e || 0 == e.length) return null;
    if ((o = e.split('/')).length < 2) return null;
    if (
      a == ListManager.DateCodes.SDEURODATE ? (s.wDay = parseInt(S(o[0])), s.wMonth = parseInt(S(o[1]))) : (s.wMonth = parseInt(S(o[0])), s.wDay = parseInt(S(o[1]))),
      s.wDay < 0 ||
      s.wDay > 31 ||
      s.wMonth < 1 ||
      s.wMonth > 12
    ) return null;
    if (o.length < 3) n = new Date,
      s.wYear = n.getFullYear();
    else if ((r = parseInt(S(o[2]))) > 1200) {
      if (r > 2400) return null;
      s.wYear = r
    } else if (r > 70 && r < 100) s.wYear = r + 1900;
    else {
      if (!(r >= 0 && r < 100)) return null;
      s.wYear = r + 2000
    }
    return i = SDJS.Utils.GetMonthDays(s.wMonth, s.wYear),
      s.wDay > i ? null : (
        s.wHour = t,
        l = new Date(s.wYear, s.wMonth - 1, s.wDay, s.wHour),
        isNaN(l.getTime()) ? 0 : SDJS.Utils.JSDateToFiletime(l)
      )
  }

  static ParseShapeDataDate(e) {
    var t,
      a,
      r,
      i,
      n = '',
      o = '',
      s = '';
    if (null == e) return null;
    if (null == (t = e.length)) return null;
    if (t < 8) return null;
    if (4 !== (r = e.indexOf('-'))) return null;
    if ((i = e.lastIndexOf('-')) <= r + 1) return null;
    if (t - i < 2) return null;
    for (a = 0; a < r; a++) {
      if (isNaN(e[a])) return null;
      n = n.concat(e[a])
    }
    for (a = r + 1; a < i; a++) {
      if (isNaN(e[a])) return null;
      o = o.concat(e[a])
    }
    for (a = i + 1; a < t; a++) {
      if (isNaN(e[a])) return null;
      s = s.concat(e[a])
    }
    var l = o + '/' + s + '/' + n;
    return SDJS.Utils.ParseSDRDate(l, 0, ListManager.DateCodes.SDUSDATE)
  }

  static ParseShapeDataTime(e) {
    var t,
      a,
      r,
      i,
      n = '',
      o = '',
      s = '';
    if (null == e) return null;
    if (null == (t = e.length)) return null;
    if (t < 3) return null;
    if ((r = e.indexOf(':')) < 1) return null;
    for ((i = e.lastIndexOf(':')) === r && (i = t, s = '0'), a = 0; a < r; a++) {
      if (isNaN(e[a])) return null;
      n = n.concat(e[a])
    }
    for (a = r + 1; a < i; a++) {
      if (isNaN(e[a])) return null;
      o = o.concat(e[a])
    }
    for (a = i + 1; a < t; a++) {
      if (isNaN(e[a])) return null;
      s = s.concat(e[a])
    }
    var l = 60 * parseInt(n) * 60 + 60 * parseInt(o) + parseInt(s);
    return isNaN(l) ? null : l *= ListManager.TimeAmounts.OneSecondNS
  }

  static FiletimeToJSDate(e) {
    var t = parseInt((e - 116444736000000000) / 10000),
      a = new Date(t);
    return new Date(
      a.getUTCFullYear(),
      a.getUTCMonth(),
      a.getUTCDate(),
      a.getUTCHours(),
      a.getUTCMinutes(),
      a.getUTCSeconds(),
      0
    )
  }

  static JSDateToFiletime(e) {
    var t = Date.UTC(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      0
    );
    return FileTimeUnitsSince1601 = 10000 * t + 116444736000000000,
      FileTimeUnitsSince1601
  }

  static SDRLocalTime(e) {
    var t,
      a = {
        wYear: 0,
        wMonth: 0,
        wDay: 0,
        wHour: 0,
        wMinute: 0,
        wSecond: 0,
        wMilliseconds: 0,
        wDayOfWeek: 0
      };
    return (t = SDJS.Utils.FiletimeToJSDate(e)) ? (
      a.wYear = t.getFullYear(),
      a.wMonth = t.getMonth() + 1,
      a.wDay = t.getDate(),
      a.wHour = t.getHours(),
      a.wMinute = t.getMinutes(),
      a.wSecond = t.getSeconds(),
      a.wMilliseconds = t.getMilliseconds(),
      a.wDayOfWeek = t.getDay(),
      a
    ) : null
  }

  static SDRmktime(e) {
    var t;
    t = SDJS.Utils1.DeepCopy({
      wYear: 0,
      wMonth: 0,
      wDay: 1,
      wHour: 0,
      wMinute: 0,
      wSecond: 0,
      wMilliseconds: 0
    }),
      $.extend(t, e);
    var a = new Date(
      t.wYear,
      t.wMonth - 1,
      t.wDay,
      t.wHour,
      t.wMinute,
      t.wSecond,
      t.wMilliseconds
    );
    return SDJS.Utils.JSDateToFiletime(a)
  }

  static SDRTimeToStringYY(e, t) {
    var a;
    return a = e.wYear.toString(),
      t == ListManager.DateCodes.SDEURODATE ? e.wDay.toString() + '/' + e.wMonth.toString() + '/' + a.substr(2) : e.wMonth.toString() + '/' + e.wDay.toString() + '/' + a.substr(2)
  }

  static SDRTimeToString(e, t) {
    var a;
    return a = e.wYear.toString(),
      t == ListManager.DateCodes.SDEURODATE ? e.wDay.toString() + '/' + e.wMonth.toString() + '/' + a : e.wMonth.toString() + '/' + e.wDay.toString() + '/' + a
  }

  static TimeLineNumericStringValidate(e, t, a) {
    var r,
      i;
    for (r = 0; r < e.length; r++) if (isNaN(e.charAt(r))) return !1;
    return !((i = parseInt(e)) < t || i > a)
  }

  static ParseTimeField(e) {
    var t,
      a,
      r = !0,
      i = 0,
      n = 0,
      o = '',
      s = 0,
      l = '',
      S = {
        hour: '',
        minutes: '',
        seconds: '',
        amOrPm: '',
        separator: ''
      };
    if (t = 'am', a = 'pm', 0 === e.length) return null;
    if (!(S = SDJS.Utils.ParseTime(e.toUpperCase()))) return null;
    if (!S.hour || !S.hour.length) return null;
    if (S.amOrPm && S.amOrPm.length) {
      if (!SDJS.Utils.TimeLineNumericStringValidate(S.hour, 0, 12)) return null
    } else if (!SDJS.Utils.TimeLineNumericStringValidate(S.hour, 0, 23)) return null;
    if (i = parseInt(S.hour), !S.minutes || !S.minutes.length) return null;
    if (!SDJS.Utils.TimeLineNumericStringValidate(S.minutes, 0, 59)) return null;
    if (n = parseInt(S.minutes), S.amOrPm && S.amOrPm.length) if (
      S.amOrPm = S.amOrPm.toUpperCase(),
      t = t.toUpperCase(),
      a = a.toUpperCase(),
      - 1 != t.indexOf(S.amOrPm)
    ) r = !0;
    else {
      if (- 1 == a.indexOf(S.amOrPm)) return null;
      r = !1
    }
    return i > 12 &&
      (r = !0),
      r &&
      12 === i &&
      (i = 0),
      s = i * ListManager.TimeAmounts.OneHourNS + n * ListManager.TimeAmounts.OneMinNS,
      r ||
      12 == i ||
      (s += 12 * ListManager.TimeAmounts.OneHourNS),
      0 === i &&
      S.amOrPm &&
      S.amOrPm.length &&
      (i = 12),
      1 === (l = n.toString()).length &&
      (l = '0' + l),
      o = i.toString() + S.separator.charAt(0) + l,
      S.amOrPm &&
      S.amOrPm.length &&
      (o += ' ' + S.amOrPm),
    {
      time: o,
      secs: s
    }
  }

  static ParseTime(e) {
    var t,
      a,
      r,
      i,
      n = '0',
      o = '0',
      s = '0',
      l = null;
    return 'AM',
      'PM',
      i = a = SDJS.Utils.GetTimeSeparators(!0),
      t = SDJS.Utils1.DeepCopy(e),
      tokens = t.split(' '),
      tokens.length > 1 &&
      (l = tokens[1], t = tokens[0]),
      a.length < 2 ? null : (
        (r = t.indexOf(a.charAt(0))) < 0 &&
        (r = t.indexOf('.')),
        r < 0 &&
        (r = t.indexOf(':')),
        r >= 0 &&
        (
          n = t.substr(0, r),
          (r = (t = t.substr(r + 1)).indexOf(a.charAt(1))) < 0 &&
          (r = t.indexOf('.')),
          r < 0 &&
          (r = t.indexOf(':')),
          r < 0 ? o = t : (
            lpstrMins = t.substr(0, r),
            s = (r = (t = t.substr(r + 1)).indexOf(' ')) < 0 ? SDJS.Utils1.DeepCopy(t) : t.substr(0, r)
          )
        ),
        {
          hour: n,
          minutes: o,
          seconds: s,
          amOrPm: l,
          separator: i
        }
      )
  }

  static GetTimeSeparators(e) {
    var t,
      a = '';
    if (e) return '::';
    var r = (new Date).toTimeString();
    for (t = 0; t < r.length && ' ' !== r.charAt(t); t++) isNaN(r.charAt(t)) &&
      (a += r.charAt(t));
    return a
  }

  static SDRtime() {
    var e = new Date;
    return SDJS.Utils.JSDateToFiletime(e)
  }

  static GetMonthDays(e, t) {
    var a,
      r,
      i,
      n,
      o = {};
    for (
      o.wMonth = e,
      o.wYear = t,
      o.wDay = 1,
      o.wHour = 12,
      o.wMilliseconds = 0,
      a = SDJS.Utils.SDRmktime(o),
      i = 28;
      i < 31 &&
      (
        n = i,
        r = a + (n *= ListManager.TimeAmounts.OneDayNS),
        !(SDJS.Utils.SDRLocalTime(r).wMonth > e)
      );
    ) i++;
    return i
  }

  static GetWeekNumber(e) {
    var t = SDJS.Utils.FiletimeToJSDate(e);
    return t.setHours(0, 0, 0, 0),
      t.setDate(t.getDate() + 4 - (t.getDay() || 7)),
      Math.ceil(((t - new Date(t.getFullYear(), 0, 1)) / 86400000 + 1) / 7)
  }

  static GetMonthName(e) {
    var t = new Date(Date.UTC(2013, e - 1, 25, 14, 0, 0));
    return locale = 'en-us',
      t.toLocaleString(locale, {
        month: 'long'
      })
  }

  static GetWeekdayName(e) {
    for (
      var t = 0,
      a = new Date(Date.UTC(2013, 1, 1, 14, 0, 0));
      a.getDay() != e &&
      ++t <= 7;
    ) a.setDate(a.getDate() + 1);
    return locale = 'en-us',
      a.toLocaleString(locale, {
        weekday: 'short'
      })
  }

  static GetLongWeekdayName(e) {
    for (
      var t = 0,
      a = new Date(Date.UTC(2013, 1, 1, 14, 0, 0));
      a.getDay() != e &&
      ++t <= 7;
    ) a.setDate(a.getDate() + 1);
    return locale = 'en-us',
      a.toLocaleString(locale, {
        weekday: 'long'
      })
  }

  static GetNumberOfYears(e, t) {
    var a = SDJS.Utils.SDRLocalTime(e);
    return SDJS.Utils.SDRLocalTime(t).wYear - a.wYear
  }

  static GetNumberOfMonths(e, t) {
    var a = SDJS.Utils.SDRLocalTime(e),
      r = SDJS.Utils.SDRLocalTime(t);
    return r.wMonth + 12 * r.wYear - (a.wMonth + 12 * a.wYear)
  }

  static GetNumberOfDays(e, t) {
    var a = (t - e) / ListManager.TimeAmounts.OneDayNS + 0.5;
    return Math.floor(a)
  }

  static GetNumberOfWeeks(e, t, a) {
    var r,
      i,
      n;
    return SDJS.Utils.GetNumberOfDays(e, t),
      n = 0,
      r = 7 - SDJS.Utils.SDRLocalTime(e).wDayOfWeek,
      r += a,
      e += r * ListManager.TimeAmounts.OneDayNS,
      n += i = SDJS.Utils.GetNumberOfDays(e, t) / 7,
      e += 7 * i * ListManager.TimeAmounts.OneDayNS,
      SDJS.Utils.GetNumberOfDays(e, t) > 0 &&
      n++,
      n
  }

  static GetActiveDateFormat(e) {
    if (e >= 0) return e;
    if (SDUI.AppSettings.IsElectronApp()) return SDJS.Globals.CurrentLocale.SDIDate = SDJS.Utils.ElectronIsUsingMMDDYYYY() ? ListManager.DateCodes.SDUSDATE : ListManager.DateCodes.SDEURODATE,
      SDJS.Globals.CurrentLocale.SDIDate;
    if (SDJS.Globals.CurrentLocale.SDIDate < 0) {
      var t = new Date(Date.UTC(2013, 1, 25, 14, 0, 0)),
        a = t.toLocaleDateString('en-US'),
        r = t.toLocaleDateString();
      SDJS.Globals.CurrentLocale.SDIDate = a === r ? ListManager.DateCodes.SDUSDATE : ListManager.DateCodes.SDEURODATE
    }
    return SDJS.Globals.CurrentLocale.SDIDate
  }

  static ElectronIsUsingMMDDYYYY() {
    const e = localStorage.getItem('CountryCode');
    return !e ||
      [
        'US',
        'CA',
        'FM',
        'PW',
        'PH'
      ].includes(e)
  }

  static FlipDate(e) {
    var t,
      a = 0,
      r = 0,
      i = null,
      n = null,
      o = '';
    for (r = e.length, a = 0; a < r; a++) if (isNaN(e[a])) {
      n = e[a];
      break
    }
    if (!n) return null;
    if ((i = e.split(n)).length < 2) return null;
    for (t = i.splice(1, 1), i.unshift(t[0]), r = i.length, a = 0; a < r; a++) o.length > 0 &&
      (o += n),
      o += i[a];
    return o
  }

  static QualifyURL(e) {
    return e &&
      e.length > 0 &&
      '/#' !== e.substring(0, 2) &&
      - 1 == e.indexOf('http://') &&
      - 1 == e.indexOf('https://') &&
      (e = 'http://' + e),
      e
  }

  static GetDistanceBetween2Points(e, t) {
    var a,
      r;
    return a = t.x - e.x,
      r = t.y - e.y,
      this.sqrt(a * a + r * r)
  }

  static IsRectangular(e) {
    var t,
      a,
      r,
      i;
    for (a = e.length, t = 0; t < a - 1; t++) {
      if (
        angle = gListManager.SD_GetCounterClockwiseAngleBetween2Points(e[t], e[t + 1]),
        t > 0 &&
        (
          r = angle,
          (r -= i) < 0 &&
          (r += 2 * Math.PI),
          r > Math.PI &&
          (r -= Math.PI),
          !(r >= Math.PI / 2 - 0.052 && r <= Math.PI / 2 + 0.052)
        )
      ) return !1;
      i = angle
    }
    return !0
  }

  static GetPathExtension(e) {
    if (null == e) return null;
    var t = e.length;
    if (t > 4) {
      var a = e.lastIndexOf('.');
      if (a >= 0) {
        var r = e.slice(a, t);
        return (a = r.indexOf('?')) >= 0 &&
          (r = r.slice(0, a)),
          r.toLowerCase()
      }
    }
    return null
  }

  static RemoveExtension(e) {
    if (null == e) return null;
    var t = e.lastIndexOf('.');
    return - 1 === t ? e : e.slice(0, t)
  }

  static HTMLEncode(e) {
    return $('<div>').text(e).html()
  }

}

export default Utils2
