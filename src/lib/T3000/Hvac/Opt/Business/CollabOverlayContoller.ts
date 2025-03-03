

import ConstantData from '../../Data/ConstantData'



const CollabOverlayContoller = function () {
  var e = {
    DEFAULT: {
      path: 'sdui/cursors/collabcursor.svg',
      hotspot: {
        x: 0,
        y: 0
      },
      size: {
        width: 24,
        height: 24
      }
    },
    PLUS: {
      path: 'sdui/cursors/collabcursor-plus.svg',
      hotspot: {
        x: 0,
        y: 0
      },
      size: {
        width: 24,
        height: 24
      }
    },
    GROW: {
      path: 'sdui/cursors/collabcursor-grow.svg',
      hotspot: {
        x: 0,
        y: 0
      },
      size: {
        width: 24,
        height: 24
      }
    },
    MOVE: {
      path: 'sdui/cursors/collabcursor-move.svg',
      hotspot: {
        x: 0,
        y: 0
      },
      size: {
        width: 24,
        height: 24
      }
    }
  },
    t = [],
    a = {
      timeout: 5000,
      cursorType: 'DEFAULT',
      color: '#FFFFFF',
      pos: {
        x: 0,
        y: 0
      },
      fontName: '\'IBM Plex Sans\', -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      fontSize: 12,
      fontBold: !1,
      backShape: ConstantData.CreateShapeType.RRECT,
      backConstrain: !1,
      fontColor: '#FFFFFF',
      borderRadius: 6
    },
    r = null;
  this.InitCollabOverlay = function () {
    r = gListManager.svgCollabLayer,
      t = [],
      r.RemoveAll()
  },
    this.UpdateCursorName = function (e, t) {
      var a = this.GetCursorByID(e);
      a &&
        (
          this.ClearCursorTimer(a),
          a.label !== t &&
          (
            this.HideCursor(a),
            this.RemoveCursorElement(a),
            a.label = t,
            this.CreateCursorElement(a)
          ),
          this.SetCursorTimer(a)
        )
    },
    this.AddUserCursor = function (e, r, i, n, o, s, l) {
      this.DeleteUserCursor(e);
      var S = s ||
        a.timeout;
      S < 0 &&
        (S = 0);
      var c = {
        ID: e,
        label: r ||
          '',
        color: i ||
          a.color,
        cursorType: n ||
          a.cursorType,
        pos: o ||
          a.pos,
        hideTime: S,
        timer: null,
        elem: null,
        settings: l
      };
      t.push(c),
        this.CreateCursorElement(c),
        this.SetCursorTimer(c)
    },
    this.MoveUserCursor = function (e, t, a) {
      var r = this.GetCursorByID(e);
      r &&
        (
          this.ClearCursorTimer(r),
          r.pos = t,
          a &&
            r.cursorType !== a ? (
            this.RemoveCursorElement(r),
            r.cursorType = a,
            this.CreateCursorElement(r)
          ) : (
            this.SetCursorPos(r),
            ConstantData.DocumentContext.UserSettings.CursorDisplayMode !== Resources.CursorDisplayMode.Hide ? this.ShowCursor(r) : this.HideCursor(r)
          ),
          this.SetCursorTimer(r)
        )
    },
    this.HideUserCursor = function (e) {
      var t = this.GetCursorByID(e);
      t &&
        (this.ClearCursorTimer(t), this.HideCursor(t))
    },
    this.ShowUserCursor = function (e, t) {
      var a = this.GetCursorByID(e);
      a &&
        (
          this.ClearCursorTimer(a),
          this.ShowCursor(a),
          t < 0 ? a.hideTime = 0 : t > 0 &&
            (a.hideTime = t),
          this.SetCursorTimer(a)
        )
    },
    this.UpdateUserCursorType = function (e, t) {
      var a = this.GetCursorByID(e);
      a &&
        (
          this.ClearCursorTimer(a),
          this.RemoveCursorElement(a),
          a.cursorType = t,
          this.CreateCursorElement(a),
          this.SetCursorTimer(a)
        )
    },
    this.DeleteUserCursor = function (e) {
      var a = this.GetCursorByID(e);
      if (a) if (
        this.ClearCursorTimer(a),
        this.RemoveCursorElement(a),
        1 === t.length
      ) t = [];
      else {
        var r = this.GetCursorIndex(a.ID);
        r >= 0 &&
          t.splice(r, 1)
      }
    },
    this.ClearAllUserCursors = function () {
      for (var e = 0; e < t.length; e++) this.ClearCursorTimer(t[e]),
        this.RemoveCursorElement(t[e]);
      t = []
    },
    this.GetCursorByID = function (e) {
      for (var a = 0; a < t.length; a++) if (t[a].ID === e) return t[a];
      return null
    },
    this.CreateCursorElement = function (e) {
      this.RemoveCursorElement(e);
      var t = this.GetCursorDef(e.cursorType);
      if (t) {
        var i = {
          ...a,
          ...e.settings
        },
          n = gListManager.svgDoc.CreateShape(ConstantData.CreateShapeType.GROUP),
          o = gListManager.svgDoc.CreateShape(ConstantData.CreateShapeType.IMAGE),
          s = t.hotspot.x,
          l = t.hotspot.y;
        o.SetURL(t.path),
          o.SetSize(t.size.width, t.size.height),
          o.SetPos(s, l),
          n.AddElement(o);
        var S = gListManager.svgDoc.CreateShape(ConstantData.CreateShapeType.TEXT),
          c = gListManager.svgDoc.CreateShape(i.backShape),
          u = {
            font: i.fontName,
            size: i.fontSize,
            color: i.fontColor
          };
        i.fontBold &&
          (u.weight = 'bold'),
          S.SetText(e.label, u);
        var p = S.GetTextMinDimensions(),
          d = p.width + 16,
          D = p.height + 16;
        i.backConstrain &&
          (d = D = Math.max(d, D)),
          s += t.size.width,
          c.SetRRectSize(d, D, i.borderRadius, i.borderRadius),
          c.SetPos(s, l),
          c.SetFillColor(e.color),
          c.SetStrokeWidth(0),
          n.AddElement(c),
          s += (d - p.width) / 2,
          l += (D - p.height) / 2,
          S.SetSize(p.width, p.height),
          S.SetPos(s, l),
          n.AddElement(S),
          r &&
          r.AddElement(n),
          e.elem = n,
          e.elem.SetVisible(!1),
          this.SetCursorPos(e)
      }
    },
    this.RemoveCursorElement = function (e) {
      e.elem &&
        r &&
        (r.RemoveElement(e.elem), e.elem = null)
    },
    this.SetCursorPos = function (e) {
      if (e.elem && r) {
        var t = gListManager.svgDoc.ConvertDocToWindowCoords(e.pos.x, e.pos.y);
        t = gListManager.svgDoc.ConvertWindowToElemCoords(t.x, t.y, r.DOMElement()),
          e.elem.SetPos(t.x, t.y)
      }
    },
    this.SetCursorTimer = function (e) {
      if (this.ClearCursorTimer(e), e.hideTime) {
        var t = this;
        e.timer = setTimeout((function () {
          t.HideCursor(e),
            e.timer = null
        }), e.hideTime)
      }
    },
    this.ClearCursorTimer = function (e) {
      e.timer &&
        (clearTimeout(e.timer), e.timer = null)
    },
    this.HideAllCursors = function () {
      let e = t.length;
      for (let a = 0; a < e; a++) {
        let e = t[a];
        this.HideCursor(e)
      }
    },
    this.ShowAllCursors = function () {
      let e = t.length;
      for (let a = 0; a < e; a++) {
        let e = t[a];
        this.ShowCursor(e)
      }
    },
    this.HideCursor = function (e) {
      e.elem &&
        e.elem.SetVisible(!1)
    },
    this.ShowCursor = function (e) {
      e.elem &&
        e.elem.SetVisible(!0)
    },
    this.GetCursorIndex = function (e) {
      for (var a = 0; a < t.length; a++) if (t[a].ID === e) return a;
      return - 1
    },
    this.GetCursorDef = function (t) {
      var a = (
        t.toString() ||
        ConstantData.CursorTypes.Default
      ).toUpperCase(),
        r = e[a];
      return r ||
        (r = e[ConstantData.CursorTypes.Default]),
        r
    }
}

CollabOverlayContoller.CursorTypes = {
  Default: 'DEFAULT',
  Plus: 'PLUS',
  Move: 'MOVE',
  Grow: 'GROW'
}

export default CollabOverlayContoller
