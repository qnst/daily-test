
import ConstantData from "../../Data/ConstantData"
import RecentSymbol from '../../Model/RecentSymbol'
import Rectangle from '../../Model/Rectangle'
import Utils1 from "../../Helper/Utils1"
import Utils2 from "../../Helper/Utils2"
import Utils3 from "../../Helper/Utils3"

Business.LineDraw.prototype = new Business.Base,
  Business.LineDraw.prototype.constructor = Business.LineDraw,
  Business.LineDraw.prototype.GetToolList = function () {
    var e,
      t = [];
    return e = new Business.ToolItem('ConnectorFormat', !0),
      t.push(e),
      e = new Business.ToolItem('RecentSymbols', !1),
      t.push(e),
      t
  },
  Business.LineDraw.prototype.GetFrameBusinessName = function () {
    return SDJS_Business_GetModuleName(this)
  },
  Business.LineDraw.prototype.Initialize = function () {
    var e,
      t,
      a = [
        '0fa969c7-e115-46dd-812a-e14fd1f8ff7a',
        '66a3793e-74f1-4f86-bc96-b1dadb81f057',
        '1bcf277e-5433-4c7c-8ca2-a314d49988fb',
        '8c30a1e0-cd98-401e-bb6c-813f425108c5',
        '20b488f4-1c92-4725-98bb-01668dc744ea',
        '7a2607ef-e894-4766-b80f-902328ea8bfd'
      ],
      r = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      i = a.length;
    if (r.RecentSymbols && 0 === r.RecentSymbols.length) for (r.RecentSymbols = [], e = 0; e < i; e++) t = new RecentSymbol(a[e], '', !1),
      r.RecentSymbols.push(t);
    for (i = r.RecentSymbols.length, e = 0; e < i; e++) SDUI.Commands.MainController.Symbols.StoreSpecialSymbol(r.RecentSymbols[e].ItemId, r.RecentSymbols[e])
  },
  Business.LineDraw.prototype.CloseEdit = function (e) {
    e &&
      (GlobalData.optManager.FromOverlayLayer = !0),
      GlobalData.optManager.CloseEdit()
  },
  Business.LineDraw.prototype.AllowAdd = function (e, t) {
    var a = ConstantData.ActionArrow,
      r = GlobalData.optManager.GetObjectPtr(e, !1);
    if (r) {
      var i;
      if (null == (i = this.AllowActionButtons(r, !0))) return !1;
      if (i = r.GetCustomConnectPointsDirection()) switch (t) {
        case a.RIGHT:
          return i.right;
        case a.LEFT:
          return i.left;
        case a.UP:
          return i.top;
        case a.DOWN:
          return i.bottom
      }
    }
    return !1
  },
  Business.LineDraw.prototype.Pr_InsertSymbol = function (e, t, a, r, i, n, o, s) {
    var l = this.AddSymbol(e);
    i >= 0 &&
      Business.ShiftConnectedShapes(a, i, r, t, !0, l),
      GlobalData.optManager.LineDrawLineID = r;
    if (Collab.AllowMessage()) {
      var S = {
        BlockID: a,
        LineDrawLineID: GlobalData.optManager.LineDrawLineID,
        symbolID: e,
        ArrowID: t,
        lineid: r,
        shapeid: i
      };
      S.EndPoint = Utils1.DeepCopy(n),
        S.StartPoint = Utils1.DeepCopy(o),
        S.connect = Utils1.DeepCopy(s),
        S.Def = Utils1.DeepCopy(sdp.def),
        Collab.BuildMessage(ConstantData.CollabMessages.Pr_InsertSymbol, S, !1)
    }
    this.Pr_AddLine(o, n, s, 'segLine', a, t, l)
  },
  Business.LineDraw.prototype.Pr_GetCurrentSymbolID = function () {
    var e,
      t,
      a = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    t = a.RecentSymbols.length;
    var r = SDUI.Commands.MainController.Symbols.GetSelectedButton();
    if (r) for (e = 0; e < t; e++) if (a.RecentSymbols[e].ItemId === r && a.RecentSymbols[e].NoMenu) {
      r = null;
      break
    }
    if (null == r) {
      if (a.RecentSymbols.length) for (e = 0; e < t; e++) if (!a.RecentSymbols[e].NoMenu) {
        r = a.RecentSymbols[e].ItemId;
        break
      }
      null == r &&
        (this.Initialize(), r = a.RecentSymbols[0].ItemId)
    }
    return r
  },
  Business.LineDraw.prototype.Pr_AddLine = function (e, t, a, r, i, n, o) {
    var s,
      l,
      S = ConstantData.HookPts,
      c = ConstantData.ActionArrow;
    switch (r) {
      case 'line':
        s = SDUI.Commands.MainController.Shapes.DrawNewLine(!1, 0, !0, null);
        break;
      case 'arcLine':
        s = SDUI.Commands.MainController.Shapes.DrawNewArcLine(!0, !1, null);
        break;
      case 'segLine':
        l = (
          s = SDUI.Commands.MainController.Shapes.DrawNewSegLine(!0, !1, null)
        ).segl;
        break;
      case 'arcSegLine':
        l = (
          s = SDUI.Commands.MainController.Shapes.DrawNewArcSegLine(!0, !1, null)
        ).segl
    }
    s.StartPoint = e,
      s.EndPoint = {
        x: e.x,
        y: e.y
      };
    var u = GlobalData.optManager.AddNewObject(s, !s.bOverrideDefaultStyleOnDraw, !0);
    if (Collab.AddNewBlockToSecondary(u), l) switch (n) {
      case c.LEFT:
        l.firstdir = S.SED_KLC,
          l.lastdir = S.SED_KRC;
        break;
      case c.RIGHT:
        l.firstdir = S.SED_KRC,
          l.lastdir = S.SED_KLC;
        break;
      case c.UP:
        l.firstdir = S.SED_KTC,
          l.lastdir = S.SED_KBC;
        break;
      case c.DOWN:
        l.firstdir = S.SED_KBC,
          l.lastdir = S.SED_KTC
    }
    GlobalData.optManager.UpdateHook(u, - 1, i, ConstantData.HookPts.SED_KTL, a, null),
      s.AdjustLineEnd(null, t.x, t.y, ConstantData.ActionTriggerType.LINEEND),
      GlobalData.optManager.LineDrawID = u,
      this.InsertShape(- 1, null, !0, o)
  },
  Business.LineDraw.prototype.AddLeftRight = function (e, t, a, r) {
    var i,
      n,
      o = [],
      s = ConstantData.Defines.SED_CDim,
      l = 'segLine',
      S = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      c = ConstantData.ActionArrow,
      u = !1;
    if (
      r = GlobalData.optManager.SD_GetVisioTextParent(r),
      (D = GlobalData.optManager.GetObjectPtr(r, !1)) &&
      null == a
    ) {
      u = D.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        D.ConnectPoints;
      var p = D.GetTable(!1),
        d = D.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
          p;
      if (u || d) return void this.AddCustomFromKeyboard(D, e, !0, d)
    }
    switch (ConstantData.DocumentContext.LineTool) {
      case 'line':
      case 'arcLine':
      case 'segLine':
      case 'arcSegLine':
        l = ConstantData.DocumentContext.LineTool
    }
    var D,
      g = {},
      h = S.def.h_arraywidth;
    if (
      h < ConstantData.Defines.MinLineDrawGap &&
      (h = ConstantData.Defines.MinLineDrawGap),
      e ? (g.y = s / 2, g.x = 0, n = c.LEFT, i = - h) : (g.y = s / 2, g.x = s - 5, n = c.RIGHT, i = h),
      D.RotationAngle &&
      null == a
    ) {
      var m = {
        x: 0,
        y: 0,
        width: s,
        height: s
      },
        C = D.RotationAngle / (180 / ConstantData.Geometry.PI),
        y = [];
      y.push(g),
        Utils3.RotatePointsAboutCenter(m, C, y),
        g.x = y[0].x,
        g.y = y[0].y
    }
    if (a && a.gesture) {
      0 === S.RecentSymbols.length &&
        this.Initialize(),
        GlobalData.optManager.FromOverlayLayer = !0;
      var f = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(a.gesture.center.clientX, a.gesture.center.clientY);
      GlobalData.optManager.theLineDrawStartX = f.x,
        GlobalData.optManager.theLineDrawStartY = f.y,
        SDUI.Commands.MainController.Shapes.DrawNewLineShape(l, !1, !0)
    } else {
      var L,
        I,
        T,
        b,
        M,
        P = GlobalData.optManager.FindAllChildObjects(r, ConstantData.DrawingObjectBaseClass.LINE, null);
      I = P.length;
      var R,
        A = - 1,
        _ = - 1;
      for (L = 0; L < I; L++) if (T = GlobalData.optManager.GetObjectPtr(P[L], !1)) for (M = T.hooks.length, b = 0; b < M; b++) if (
        T.hooks[b].objid === r &&
        (
          R = this.Pr_NormalizeConnect(T.hooks[b].connect),
          Utils2.IsEqual(R.x, g.x, 10) &&
          Utils2.IsEqual(R.y, g.y, 10) &&
          (A = P[L], M > 1)
        )
      ) {
        _ = 0 === b ? T.hooks[1].objid : T.hooks[0].objid;
        break
      }
      if (A >= 0) {
        if (_ >= 0) {
          var E = this.Pr_GetCurrentSymbolID(),
            w = this.AddSymbol(E);
          Business.ShiftConnectedShapes(r, _, A, n, !0, w)
        }
        GlobalData.optManager.LineDrawLineID = A
      }
    }
    if (D = GlobalData.optManager.GetObjectPtr(r, !1)) {
      o.push(g);
      var F = D.GetPerimPts(r, o, 1, !1, null, - 1),
        v = GlobalData.optManager.svgDoc.ConvertDocToWindowCoords(F[0].x, F[0].y);
      if (a && a.gesture) a.gesture.center.clientX = v.x,
        a.gesture.center.clientY = v.y;
      else {
        var G = {
          x: F[0].x,
          y: F[0].y
        };
        0 === D.RotationAngle &&
          (F[0].x = e ? D.Frame.x : D.Frame.x + D.Frame.width);
        var N = {
          x: F[0].x + i,
          y: F[0].y
        };
        this.Pr_AddLine(G, N, g, l, r, n, w)
      }
    }
  },
  Business.LineDraw.prototype.AddAboveBelow = function (e, t, a, r) {
    var i,
      n,
      o = [],
      s = ConstantData.Defines.SED_CDim,
      l = 'segLine',
      S = ConstantData.ActionArrow,
      c = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    if (
      (
        r = GlobalData.optManager.SD_GetVisioTextParent(r),
        (p = GlobalData.optManager.GetObjectPtr(r, !1)) &&
        null == a
      ) &&
      (
        p.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        p.ConnectPoints
      )
    ) return void this.AddCustomFromKeyboard(p, e, !1, !1);
    var u = c.def.v_arraywidth;
    u < ConstantData.Defines.MinLineDrawGap &&
      (u = ConstantData.Defines.MinLineDrawGap);
    var p,
      d = {};
    if (
      e ? (d.x = s / 2, d.y = 0, n = - u, i = S.UP) : (d.x = s / 2, d.y = s - 5, n = u, i = S.DOWN),
      p.RotationAngle &&
      null == a
    ) {
      var D = {
        x: 0,
        y: 0,
        width: s,
        height: s
      },
        g = p.RotationAngle / (180 / ConstantData.Geometry.PI),
        h = [];
      h.push(d),
        Utils3.RotatePointsAboutCenter(D, g, h),
        d.x = h[0].x,
        d.y = h[0].y
    }
    switch (ConstantData.DocumentContext.LineTool) {
      case 'line':
      case 'arcLine':
      case 'segLine':
      case 'arcSegLine':
        l = ConstantData.DocumentContext.LineTool
    }
    if (a) {
      GlobalData.optManager.FromOverlayLayer = !0,
        0 === c.RecentSymbols.length &&
        this.Initialize();
      var m = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(a.gesture.center.clientX, a.gesture.center.clientY);
      GlobalData.optManager.theLineDrawStartX = m.x,
        GlobalData.optManager.theLineDrawStartY = m.y,
        SDUI.Commands.MainController.Shapes.DrawNewLineShape(l, !1, !0),
        GlobalData.optManager.theDrawShape &&
        (
          GlobalData.optManager.theDrawShape.hookflags = Utils2.SetFlag(
            GlobalData.optManager.theDrawShape.hookflags,
            ConstantData.HookFlags.SED_LC_NoContinuous,
            !0
          )
        )
    } else {
      var C,
        y,
        f,
        L,
        I,
        T = GlobalData.optManager.FindAllChildObjects(r, ConstantData.DrawingObjectBaseClass.LINE, null);
      y = T.length;
      var b,
        M = - 1,
        P = - 1;
      for (C = 0; C < y; C++) if (f = GlobalData.optManager.GetObjectPtr(T[C], !1)) for (I = f.hooks.length, L = 0; L < I; L++) if (
        f.hooks[L].objid === r &&
        (
          b = this.Pr_NormalizeConnect(f.hooks[L].connect),
          Utils2.IsEqual(b.x, d.x, 10) &&
          Utils2.IsEqual(b.y, d.y, 10) &&
          (M = T[C], I > 1)
        )
      ) {
        P = 0 === L ? f.hooks[1].objid : f.hooks[0].objid;
        break
      }
      if (M >= 0) {
        if (P >= 0) {
          var R = this.Pr_GetCurrentSymbolID(),
            A = this.AddSymbol(R);
          Business.ShiftConnectedShapes(r, P, M, i, !0, A)
        }
        GlobalData.optManager.LineDrawLineID = M
      }
    }
    if (p = GlobalData.optManager.GetObjectPtr(r, !1)) {
      o.push(d);
      var _ = p.GetPerimPts(r, o, 1, !1, null, - 1);
      if (a) {
        var E = GlobalData.optManager.svgDoc.ConvertDocToWindowCoords(_[0].x, _[0].y);
        a.gesture.center.clientX = E.x,
          a.gesture.center.clientY = E.y
      } else {
        var w = {
          x: _[0].x,
          y: _[0].y
        };
        0 === p.RotationAngle &&
          (_[0].y = e ? p.Frame.y : p.Frame.y + p.Frame.height);
        var F = {
          x: _[0].x,
          y: _[0].y + n
        };
        this.Pr_AddLine(w, F, d, l, r, i, A)
      }
    }
  },
  Business.LineDraw.prototype.AddCustomFromKeyboard = function (e, t, a, r) {
    var i,
      n,
      o,
      s = ConstantData.ActionArrow,
      l = {},
      S = [],
      c = 0,
      u = 0,
      p = 'segLine',
      d = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      D = ConstantData.Defines.SED_CDim;
    a ? (
      (o = d.def.h_arraywidth) < ConstantData.Defines.MinLineDrawGap &&
      (o = ConstantData.Defines.MinLineDrawGap),
      t ? (i = s.LEFT, c = - o) : (i = s.RIGHT, c = o)
    ) : (
      (o = d.def.v_arraywidth) < ConstantData.Defines.MinLineDrawGap &&
      (o = ConstantData.Defines.MinLineDrawGap),
      t ? (i = s.UP, u = - o) : (i = s.DOWN, u = o)
    );
    var g = [];
    if (r) {
      var h = e.GetTable(!1);
      g = GlobalData.optManager.Table_GetRowConnectPoints(e, h);
      var m = GlobalData.optManager.Table_GetSelectedRange(h).rowstart;
      m < 0 &&
        (m = 0),
        n = t ? 2 + m : 2 + h.rows.length + m
    } else {
      n = e.GetCustomConnectPointsDirection(i).index;
      var C = new Rectangle(0, 0, D, D);
      g = Utils1.DeepCopy(e.ConnectPoints),
        GlobalData.optManager.FlipPoints(C, e.extraflags, g)
    }
    l.x = g[n].x,
      l.y = g[n].y;
    var y,
      f,
      L,
      I,
      T,
      b = GlobalData.optManager.FindAllChildObjects(e.BlockID, ConstantData.DrawingObjectBaseClass.LINE, null);
    f = b.length;
    var M,
      P = - 1,
      R = - 1;
    for (y = 0; y < f; y++) if (L = GlobalData.optManager.GetObjectPtr(b[y], !1)) for (T = L.hooks.length, I = 0; I < T; I++) if (
      L.hooks[I].objid === e.BlockID &&
      (
        M = this.Pr_NormalizeConnect(L.hooks[I].connect),
        Utils2.IsEqual(M.x, l.x, 10) &&
        Utils2.IsEqual(M.y, l.y, 10) &&
        (P = b[y], T > 1)
      )
    ) {
      R = 0 === I ? L.hooks[1].objid : L.hooks[0].objid;
      break
    }
    if (P >= 0) {
      if (R >= 0) {
        var A = this.Pr_GetCurrentSymbolID(),
          _ = this.AddSymbol(A);
        Business.ShiftConnectedShapes(e.BlockID, R, P, i, !0, _)
      }
      GlobalData.optManager.LineDrawLineID = P
    }
    S.push(l);
    var E = e.GetPerimPts(e.BlockID, S, 1, !1, null, - 1),
      w = {
        x: E[0].x + c,
        y: E[0].y + u
      };
    switch (ConstantData.DocumentContext.LineTool) {
      case 'line':
      case 'arcLine':
      case 'segLine':
      case 'arcSegLine':
        p = ConstantData.DocumentContext.LineTool
    }
    this.Pr_AddLine(E[0], w, l, p, e.BlockID, i, _)
  },
  Business.LineDraw.prototype.AddCustom = function (e, t, a, r) {
    var i = [],
      n = ConstantData.Defines.SED_CDim,
      o = 'segLine';
    switch (ConstantData.DocumentContext.LineTool) {
      case 'line':
      case 'arcLine':
      case 'segLine':
      case 'arcSegLine':
        o = ConstantData.DocumentContext.LineTool
    }
    GlobalData.optManager.FromOverlayLayer = !0;
    var s = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(a.gesture.center.clientX, a.gesture.center.clientY);
    GlobalData.optManager.theLineDrawStartX = s.x,
      GlobalData.optManager.theLineDrawStartY = s.y,
      SDUI.Commands.MainController.Shapes.DrawNewLineShape(o, !1, !0);
    var l = {},
      S = GlobalData.optManager.GetObjectPtr(r, !1);
    if (S) {
      var c = S.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        S.ConnectPoints,
        u = S.GetTable(!1),
        p = S.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
          u;
      if (c) {
        l.x = S.ConnectPoints[e].x,
          l.y = S.ConnectPoints[e].y;
        var d = new Rectangle(0, 0, n, n),
          D = [];
        D.push(l),
          GlobalData.optManager.FlipPoints(d, S.extraflags, D)
      } else if (p) {
        var g = GlobalData.optManager.Table_GetRowConnectPoints(S, u);
        e < g.length &&
          (l.x = g[e].x, l.y = g[e].y)
      }
      i.push(l);
      var h = S.GetPerimPts(r, i, 1, !1, null, - 1),
        m = GlobalData.optManager.svgDoc.ConvertDocToWindowCoords(h[0].x, h[0].y);
      a.gesture.center.clientX = m.x,
        a.gesture.center.clientY = m.y
    }
  },
  Business.LineDraw.prototype.ChangeTarget = function (e) {
    var t = GlobalData.optManager.GetObjectPtr(e, !1);
    t &&
      t.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
      0 === t.objecttype &&
      (
        (t = GlobalData.optManager.GetObjectPtr(e, !0)).objecttype = ConstantData.ObjectTypes.SD_OBJT_BUSLOGIC_LINEDRAW
      )
  },
  Business.LineDraw.prototype.Pr_NormalizeConnect = function (e) {
    var t = ConstantData.Defines.SED_CDim,
      a = Utils1.DeepCopy(e);
    return a.x < 0 ? a.x = 0 : a.x > t &&
      (a.x = t),
      a.y < 0 ? a.y = 0 : a.y > t &&
        (a.y = t),
      a
  },
  Business.LineDraw.prototype.ActionClick = function (e, t, a) {
    var r,
      i,
      n = {},
      o = ConstantData.Defines.SED_CDim,
      s = [],
      l = 0,
      S = 0,
      c = ConstantData.ActionArrow,
      u = function (e, t) {
        var a = {
          x: t.x,
          y: t.y
        };
        if (e.RotationAngle) {
          var r = {
            x: 0,
            y: 0,
            width: o,
            height: o
          },
            i = - e.RotationAngle / (180 / ConstantData.Geometry.PI),
            n = [];
          n.push(a),
            Utils3.RotatePointsAboutCenter(r, i, n),
            a.x = n[0].x,
            a.y = n[0].y
        }
        var s = 0;
        return a.x >= 5 * o / 6 ? s = c.RIGHT : a.x < o / 6 ? s = c.LEFT : a.y < o / 6 ? s = c.UP : a.y >= 5 * o / 6 &&
          (s = c.DOWN),
          s
      },
      p = function (e) {
        e.x === o - 5 &&
          (e.x = o),
          e.y === o - 5 &&
          (e.y = o);
        var t = {
          x: 0,
          y: 0,
          width: o,
          height: o
        },
          a = D.RotationAngle / (180 / ConstantData.Geometry.PI),
          r = [];
        r.push(e),
          Utils3.RotatePointsAboutCenter(t, a, r),
          e.x = r[0].x,
          e.y = r[0].y,
          e.x === o &&
          (e.x = o - 5),
          e.y === o &&
          (e.y = o - 5)
      },
      d = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      D = GlobalData.optManager.GetObjectPtr(t, !1),
      g = D.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        D.ConnectPoints,
      h = D.GetTable(!1),
      m = D.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
        h;
    if (
      Collab.AllowMessage() &&
      Collab.BeginSecondaryEdit(),
      D.RotationAngle
    ) {
      switch (a) {
        case ConstantData.ActionArrow.RIGHT:
          n.y = o / 2,
            n.x = o;
          break;
        case ConstantData.ActionArrow.LEFT:
          n.y = o / 2,
            n.x = 0;
          break;
        case ConstantData.ActionArrow.DOWN:
          n.x = o / 2,
            n.y = o;
          break;
        case ConstantData.ActionArrow.UP:
          n.x = o / 2,
            n.y = 0
      }
      null != n.x &&
        (a = u(D, n))
    }
    var C = d.def.h_arraywidth;
    C < ConstantData.Defines.MinLineDrawGap &&
      (C = ConstantData.Defines.MinLineDrawGap);
    var y = d.def.v_arraywidth;
    switch (
    y < ConstantData.Defines.MinLineDrawGap &&
    (y = ConstantData.Defines.MinLineDrawGap),
    a
    ) {
      case ConstantData.ActionArrow.RIGHT:
        n.y = o / 2,
          n.x = o - 5,
          D.RotationAngle &&
          p(n),
          l = C;
        break;
      case ConstantData.ActionArrow.LEFT:
        n.y = o / 2,
          n.x = 0,
          D.RotationAngle &&
          p(n),
          l = - C;
        break;
      case ConstantData.ActionArrow.DOWN:
        n.x = o / 2,
          n.y = o - 5,
          D.RotationAngle &&
          p(n),
          S = y;
        break;
      case ConstantData.ActionArrow.UP:
        n.x = o / 2,
          n.y = 0,
          D.RotationAngle &&
          p(n),
          S = - y;
        break;
      default:
        if (!(a >= ConstantData.ActionArrow.CUSTOM)) return;
        var f = a - ConstantData.ActionArrow.CUSTOM,
          L = new Rectangle(0, 0, o, o),
          I = [];
        g ? (
          I = Utils1.DeepCopy(D.ConnectPoints),
          GlobalData.optManager.FlipPoints(L, D.extraflags, I)
        ) : m &&
        f < (I = GlobalData.optManager.Table_GetRowConnectPoints(D, h)).length &&
        (n.x = I[f].x, n.y = I[f].y),
          n.x = I[f].x,
          n.y = I[f].y;
        var T = u(D, n);
        switch (T) {
          case c.LEFT:
            l = - C;
            break;
          case c.RIGHT:
            l = C;
            break;
          case c.UP:
            S = - y;
            break;
          case c.DOWN:
            S = y;
            break;
          default:
            return
        }
        a = T
    }
    s.push(n);
    var b,
      M,
      P,
      R,
      A,
      _ = D.GetPerimPts(t, s, 1, !1, null, - 1),
      E = function (e, t) {
        var r = {
          x: 0,
          y: 0
        };
        if (0 === t.RotationAngle) switch (a) {
          case ConstantData.ActionArrow.RIGHT:
            r.x = t.Frame.x + t.Frame.width - e[0].x;
            break;
          case ConstantData.ActionArrow.LEFT:
            r.x = t.Frame.x - e[0].x;
            break;
          case ConstantData.ActionArrow.DOWN:
            r.y = t.Frame.y + t.Frame.height - e[0].y;
            break;
          case ConstantData.ActionArrow.UP:
            r.y = t.Frame.y - e[0].y
        }
        return r
      }(_, D),
      w = GlobalData.optManager.FindAllChildObjects(t, ConstantData.DrawingObjectBaseClass.LINE, null);
    M = w.length;
    var F = - 1,
      v = - 1;
    for (b = 0; b < M; b++) if (P = GlobalData.optManager.GetObjectPtr(w[b], !1)) for (A = P.hooks.length, R = 0; R < A; R++) if (P.hooks[R].objid === t) {
      var G = this.Pr_NormalizeConnect(P.hooks[R].connect);
      if (
        Utils2.IsEqual(G.x, n.x, 10) &&
        Utils2.IsEqual(G.y, n.y, 10) &&
        (F = w[b], A > 1)
      ) {
        v = 0 === R ? P.hooks[1].objid : P.hooks[0].objid;
        break
      }
    }
    if (F >= 0) {
      SDUI.Commands.MainController.Shapes.CancelModalOperation(!0);
      var N = {
        x: _[0].x + l + E.x,
        y: _[0].y + S + E.y
      },
        k = this.Pr_GetCurrentSymbolID();
      this.Pr_InsertSymbol(k, a, t, F, v, N, _[0], n)
    } else {
      var U = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theActionStoredObjectID, !1);
      if (U) {
        switch (a) {
          case ConstantData.ActionArrow.RIGHT:
            r = _[0].x + C + E.x,
              i = _[0].y;
            break;
          case ConstantData.ActionArrow.LEFT:
            r = _[0].x - C + E.x,
              i = _[0].y;
            break;
          case ConstantData.ActionArrow.DOWN:
            i = _[0].y + y + E.y,
              r = _[0].x;
            break;
          case ConstantData.ActionArrow.UP:
            i = _[0].y - y + E.y,
              r = _[0].x;
            break;
          default:
            return
        }
        U.StartNewObjectDrawTrackCommon(r, i, !1);
        var J = 0,
          x = 0;
        r < 0 &&
          (J = - r, r = 0),
          i < 0 &&
          (x = - i, i = 0),
          (J || x) &&
          (
            this.Pr_ShiftDiagram(U, J, x, t, null),
            GlobalData.optManager.OffsetShape(GlobalData.optManager.theActionStoredObjectID, J, x, 0)
          );
        var O = GlobalData.optManager.svgDoc.ConvertDocToWindowCoords(r, i);
        U.LM_DrawRelease(e, O)
      }
    }
  },
  Business.LineDraw.prototype.Pr_ShiftDiagram = function (e, t, a, r, i) {
    if (0 !== t || 0 !== a) {
      var n,
        o = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !1);
      if (
        n = r ? GlobalData.optManager.GetObjectPtr(r, !1) : GlobalData.optManager.GetObjectPtr(e.hooks[0].objid, !1)
      ) {
        var s,
          l,
          S = [];
        for (
          l = (
            S = GlobalData.optManager.GetHookList(
              o,
              S,
              n.BlockID,
              n,
              ConstantData.ListCodes.SED_LC_MOVETARGANDLINES,
              {
              }
            )
          ).length,
          s = 0;
          s < l;
          s++
        ) GlobalData.optManager.OffsetShape(S[s], t, a, 0);
        GlobalData.optManager.FlowchartShift = {
          x: t,
          y: a,
          id: e.BlockID,
          theMoveList: S,
          newshapeid: i
        }
      }
    }
  },
  Business.LineDraw.prototype.AddLineLabel = function (e) {
    var t = null,
      a = GlobalData.optManager.GetObjectPtr(e, !1);
    if (
      a &&
      (
        a.hooks.length >= 1 &&
        GlobalData.optManager.GetObjectPtr(a.hooks[0].objid, !1).dataclass === ConstantData.SDRShapeTypes.SED_S_Diam
      )
    ) {
      t = Resources.Strings.Decision_Tree_Label;
      var r = GlobalData.optManager.CreateTextBlock(a, t);
      (a = GlobalData.optManager.GetObjectPtr(e, !0)).SetTextObject(r)
    }
    return t
  },
  Business.LineDraw.prototype.CompleteAction = function (e, t) {
    var a = GlobalData.optManager.GetObjectPtr(e, !1);
    a &&
      1 === a.hooks.length &&
      (
        GlobalData.optManager.LineDrawID = e,
        SDUI.Commands.MainController.ShowDropdown(
          Resources.Controls.Dropdowns.InsertShape.Id,
          t.x,
          t.y,
          'below'
        )
      )
  },
  Business.LineDraw.prototype.InsertShape = function (e, t, a, r) {
    var i = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.LineDrawID, !1),
      n = ConstantData.Defines.Shape_Width,
      o = ConstantData.Defines.Shape_Height,
      s = ConstantData.Defines.SED_CDim,
      l = 0,
      S = 0,
      c = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      u = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !1),
      p = '',
      d = !1;
    if (
      null == t &&
      (
        e < 0 ? t = this.Pr_GetCurrentSymbolID() : c.RecentSymbols.length &&
          (t = c.RecentSymbols[e].ItemId)
      ),
      null != t
    ) {
      if (i && 1 == i.hooks.length) {
        var D;
        if (a || Collab.BeginSecondaryEdit(), (A = i.hooks[0].objid) >= 0) {
          var g = GlobalData.optManager.GetObjectPtr(A, !1),
            h = [],
            m = {};
          h = GlobalData.optManager.GetHookList(u, h, A, g, ConstantData.ListCodes.SED_LC_MOVETARGANDLINES, m)
        }
        null != r ? (D = r, t = this.Pr_GetCurrentSymbolID()) : D = this.AddSymbol(t);
        var C = GlobalData.optManager.GetObjectPtr(D, !1);
        C.SymbolData &&
          (p = C.SymbolData.Title, d = !0);
        var y = i.GetShapeConnectPoint(),
          f = y.x === s / 2;
        if (
          (w = {}).width = n,
          w.height = o,
          C.AdjustAutoInsertShape(C.Frame, f),
          C &&
          (
            w.width = C.Frame.width,
            w.height = C.Frame.height,
            n = w.width,
            o = w.height
          ),
          C.GetClosestConnectPoint(y)
        ) {
          var L = y.x / s * n,
            I = y.y / s * o;
          if (C.RotationAngle) {
            var T = {
              x: 0,
              y: 0,
              width: n,
              height: o
            },
              b = - C.RotationAngle / (180 / ConstantData.Geometry.PI);
            (E = []).push({
              x: L,
              y: I
            }),
              Utils3.RotatePointsAboutCenter(T, b, E),
              L = E[0].x,
              I = E[0].y
          }
          w.x = i.EndPoint.x - L,
            w.y = i.EndPoint.y - I
        } else y.x === s / 2 ? y.y === s ? (
          w.x = i.EndPoint.x - n / 2,
          w.y = i.EndPoint.y - o,
          m.y > 0 &&
          (m.y -= C.Frame.height)
        ) : (w.x = i.EndPoint.x - n / 2, w.y = i.EndPoint.y) : y.x === s ? (
          w.x = i.EndPoint.x - n,
          w.y = i.EndPoint.y - o / 2,
          m.x > 0 &&
          (m.x -= C.Frame.width)
        ) : (w.x = i.EndPoint.x, w.y = i.EndPoint.y - o / 2);
        m.x < 0 &&
          (l = 10 - m.x, w.x += l),
          m.y < 0 &&
          (S = 10 - m.y, w.y += S),
          w.y < 0 &&
          (S += 10 - w.y, w.y = 10),
          w.x < 0 &&
          (l += 10 - w.x, w.x = 10),
          this.Pr_ShiftDiagram(i, l, S, null, D),
          C &&
          (C.SetShapeOrigin(w.x, w.y), GlobalData.optManager.AddToDirtyList(D));
        var M = [];
        if (
          M.push(D),
          GlobalData.optManager.UpdateHook(
            GlobalData.optManager.LineDrawID,
            - 1,
            D,
            ConstantData.HookPts.SED_KTR,
            y,
            null
          ),
          GlobalData.optManager.SetLinkFlag(D, ConstantData.LinkFlags.SED_L_MOVE),
          GlobalData.optManager.LineDrawLineID >= 0
        ) {
          var P,
            R = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.LineDrawLineID, !0),
            A = i.hooks[0].objid;
          for (P = 0; P < R.hooks.length; P++) if (R.hooks[P].objid === A) {
            var _ = R.GetShapeConnectPoint(R.hooks[P].hookpt);
            if (
              !C.GetClosestConnectPoint(_) &&
              (_ = R.hooks[P].connect, g.RotationAngle)
            ) {
              var E,
                w = {
                  x: 0,
                  y: 0,
                  width: s,
                  height: s
                };
              b = - (g = GlobalData.optManager.GetObjectPtr(A, !0)).RotationAngle / (180 / ConstantData.Geometry.PI);
              (E = []).push(_),
                Utils3.RotatePointsAboutCenter(w, b, E),
                _.x = E[0].x,
                _.y = E[0].y
            }
            GlobalData.optManager.UpdateHook(GlobalData.optManager.LineDrawLineID, P, D, R.hooks[P].hookpt, _, null),
              GlobalData.optManager.SetLinkFlag(D, ConstantData.LinkFlags.SED_L_MOVE);
            break
          }
        }
        if (
          d &&
          (
            t !== SDUI.Commands.MainController.Symbols.GetSelectedButton() &&
            SDUI.Commands.MainController.Symbols.SetCurrentSymbol(t),
            GlobalData.gBaseManager.UpdateShapeList(C, t, p, !1)
          ),
          GlobalData.optManager.CompleteOperation(M),
          Collab.AllowMessage() &&
          !a
        ) {
          var F = {
            LineDrawID: GlobalData.optManager.LineDrawID,
            symbolID: t
          };
          F.StyleRecord = Utils1.DeepCopy(c.def.style),
            Collab.IsSecondary() &&
            Collab.CreateList.length &&
            (
              F.CreateList = [],
              F.CreateList = F.CreateList.concat(Collab.CreateList)
            ),
            Collab.BuildMessage(ConstantData.CollabMessages.LineDraw_InsertShape, F, !1)
        }
      }
      GlobalData.optManager.LineDrawID = - 1,
        GlobalData.optManager.LineDrawLineID = - 1
    }
  },
  Business.LineDraw.prototype.IdleShapeMenu = function (e) {
    var t,
      a,
      r,
      i = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      n = i.RecentSymbols.length,
      o = function (e) {
        var t,
          a = [];
        for (t in e) a.push(e[t]);
        return a
      }(e),
      s = 0;
    for (t = 0; t < n; t++) i.RecentSymbols[t].NoMenu ||
      (
        (a = o[s].GetControl(e)).removeClass('hide'),
        (
          r = a[0].attributes.getNamedItem(Constants.Attr_ShapeType)
        ) &&
        (r.value = t.toString()),
        a[0].innerHTML = '<img src="/cmsstorage//Symbols/BTN/' + i.RecentSymbols[t].ItemId + '.png?nc=1592581838">',
        s++
      );
    for (n = 8, t = s; t < n; t++) (a = o[t].GetControl()).addClass('hide'),
      a[0].innerHTML = ''
  },
  Business.LineDraw.prototype.CreateActionButton = function (e, t, a) {
    var r = e.docInfo.docToScreenScale;
    e.docInfo.docScale <= 0.5 &&
      (r *= 2);
    var i = ConstantData.Defines.ActionArrowSizeV / r,
      n = e.CreateShape(ConstantData.CreateShapeType.OVAL);
    return n.SetSize(i, i),
      n.SetPos(t - i / 2, a - i / 2),
      n.SetFillColor('#FFD64A'),
      n.SetStrokeWidth(0),
      n.SetCursor(ListManager.CursorType.CROSSHAIR),
      n
  },
  Business.LineDraw.prototype.CreateCustomActionButtons = function (e, t) {
    var a,
      r,
      i,
      n,
      o,
      s = [],
      l = t.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        t.ConnectPoints,
      S = t.GetTable(!1),
      c = t.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
        S,
      u = ConstantData.Defines.SED_CDim,
      p = (ConstantData.Defines.ActionArrowSizeV, []);
    if (l) {
      var d = new Rectangle(0, 0, u, u);
      p = Utils1.DeepCopy(t.ConnectPoints);
      GlobalData.optManager.FlipPoints(d, t.extraflags, p)
    } else c &&
      (p = GlobalData.optManager.Table_GetRowConnectPoints(t, S));
    if ((l || c) && ((a = p.length) <= 4 || c)) for (r = 0; r < a; r++) n = p[r].x / u * t.Frame.width,
      o = p[r].y / u * t.Frame.height,
      (i = this.CreateActionButton(e, n, o)) &&
      s.push(i);
    return s
  },
  Business.LineDraw.prototype.RotateActionButtons = function () {
    return !0
  },
  Business.LineDraw.prototype.SwimlaneAction = function (e, t) {
    GlobalDatagFlowChartManager.SwimlaneAction(e, t)
  },
  Business.LineDraw.prototype.AddShape = function (e, t) {
    var a = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    null == t &&
      (t = {
        x: 0,
        y: 0,
        width: 150,
        height: 75
      });
    var r = {
      Frame: {
        x: t.x,
        y: t.y,
        width: t.width,
        height: t.height
      },
      TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL,
      shapeparam: a.def.rrectparam,
      moreflags: ConstantData.ObjMoreFlags.SED_MF_FixedRR
    },
      i = new ListManager.Rect(r);
    return GlobalData.optManager.AddNewObject(i, !0, !0)
  },
  Business.LineDraw.prototype.NavRightLeft = function (e) {
    this.Navigate(e, !1)
  },
  Business.LineDraw.prototype.NavUpDown = function (e) {
    this.Navigate(e, !0)
  },
  Business.LineDraw.prototype.Tab = function (e) {
    return this.Navigate(e, !1) ||
      this.Navigate(e, !0),
      !1
  },
  Business.LineDraw.prototype.Navigate = function (e, t) {
    var a,
      r = !1,
      i = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theTEDSessionBlockID, !1),
      n = {},
      o = ConstantData.Defines.SED_CDim,
      s = [];
    if (
      t ? e ? (n.y = 0, n.x = o / 2) : (n.y = o, n.x = o / 2) : e ? (n.x = 0, n.y = o / 2) : (n.x = o, n.y = o / 2),
      i.theActiveTextEditObjectID >= 0 &&
      (r = !0),
      (a = Business.GetTargetShape(!1, !0)) >= 0
    ) {
      var l,
        S = GlobalData.optManager.GetObjectPtr(a, !1);
      l = S.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        S.ConnectPoints ? 1500 : 10;
      var c,
        u,
        p,
        d,
        D,
        g = GlobalData.optManager.FindAllChildObjects(a, ConstantData.DrawingObjectBaseClass.LINE, null);
      u = g.length;
      var h,
        m,
        C,
        y = - 1,
        f = - 1,
        L = null;
      for (c = 0; c < u; c++) if ((p = GlobalData.optManager.GetObjectPtr(g[c], !1)) && p.hooks.length > 1) for (D = p.hooks.length, d = 0; d < D; d++) p.hooks[d].objid === a &&
        (
          t ? (
            C = this.Pr_NormalizeConnect(p.hooks[d].connect),
            Utils2.IsEqual(C.y, n.y, l) &&
            (
              y < 0 ? (y = g[c], L = Math.abs(p.hooks[d].connect.x - n.x), h = p) : (m = Math.abs(p.hooks[d].connect.x - n.x)) < L &&
                (y = g[c], L = m, h = p)
            )
          ) : (
            C = this.Pr_NormalizeConnect(p.hooks[d].connect),
            Utils2.IsEqual(C.x, n.x, l) &&
            (
              y < 0 ? (y = g[c], L = Math.abs(p.hooks[d].connect.y - n.y), h = p) : (m = Math.abs(p.hooks[d].connect.y - n.y)) < L &&
                (y = g[c], L = m, h = p)
            )
          )
        );
      if (
        y >= 0 &&
        (f = h.hooks[0].objid === a ? h.hooks[1].objid : h.hooks[0].objid),
        f >= 0
      ) {
        var I = GlobalData.optManager.GetObjectPtr(f, !1);
        return !(I && I instanceof ListManager.BaseDrawingObject) ||
          (
            GlobalData.optManager.CloseEdit(),
            r &&
              f >= 0 ? GlobalData.optManager.OpenTextEdit(f) : (s.push(f), GlobalData.optManager.SelectObjects(s, !1, !0)),
            GlobalData.optManager.ScrollObjectIntoView(- 1, !1),
            !0
          )
      }
    }
  },
  Business.LineDraw.prototype.AllowActionButtons = function (e, t) {
    if (e.IsSwimlane() || GlobalData.optManager.NudgeOpen) return null;
    if (e.flags & ConstantData.ObjFlags.SEDO_NoLinking) return null;
    if (!t && GlobalData.optManager.SD_GetVisioTextChild(e.BlockID) >= 0) return null;
    var a = e.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
      e.ConnectPoints,
      r = e.GetTable(!1),
      i = e.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
        r,
      n = [];
    return a ? n = e.ConnectPoints : i &&
      (n = []),
      (a || i) &&
        (n.length <= 4 || i) ? {
        custom: !0
      }
        : {
          left: !0,
          right: !0,
          up: !0,
          down: !0
        }
  },
  Business.LineDraw.prototype.GetChartObjectList = function (e) {
    return zList = Business.GetObjectsInChart(
      null,
      e,
      ListManager.Connector.prototype._IsFlowChartConnector,
      !0
    ),
      zList
  },
  Business.LineDraw.prototype.SetConnectorSpacing = function (e, t, a) {
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
      d = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      D = [],
      g = ConstantData.ObjectTypes,
      h = ConstantData.HookPts,
      m = !0,
      C = {},
      y = function (t) {
        if (t && (l = t.GetTable(!0))) switch (t.objecttype) {
          case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_COLS:
            e ||
              (
                S = l.cols.length,
                s = (I - o) * S + t.Frame.width,
                t.SetSize(s, null, ConstantData.ActionTriggerType.LINELENGTH)
              );
            break;
          case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_ROWS:
            e &&
              (
                c = l.rows.length,
                s = (I - o) * c + t.Frame.height,
                t.SetSize(null, s, ConstantData.ActionTriggerType.LINELENGTH)
              );
            break;
          case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_GRID:
            e ? (
              c = l.rows.length,
              s = (I - o) * c - 1 + t.Frame.height,
              t.SetSize(null, s, ConstantData.ActionTriggerType.LINELENGTH)
            ) : (
              S = l.cols.length,
              s = (I - o) * S - 1 + t.Frame.width,
              t.SetSize(s, null, ConstantData.ActionTriggerType.LINELENGTH)
            )
        }
      },
      f = function (t) {
        var a,
          r,
          i = 0,
          n = 0,
          o = ConstantData.ActionArrow,
          s = t.GetSpacing();
        if (
          e &&
          null != s.height &&
          (
            n = L.x - s.height,
            i = L.x - s.width,
            0 !== n &&
            2 === t.hooks.length &&
            (
              t.StartPoint.y < t.EndPoint.y ? t.hooks[0].hookpt === h.SED_KTL ? (a = t.hooks[0].objid, r = t.hooks[1].objid) : (a = t.hooks[1].objid, r = t.hooks[0].objid) : t.hooks[0].hookpt === h.SED_KTL ? (a = t.hooks[1].objid, r = t.hooks[0].objid) : (a = t.hooks[0].objid, r = t.hooks[1].objid),
              - 1 === Business.ShiftConnectedShapes(a, r, t.BlockID, o.DOWN, n > 0, null, Math.abs(n))
            )
          )
        ) return - 1;
        if (
          !e &&
          null != s.width &&
          (
            0 !== (i = L.x - s.width) &&
            2 === t.hooks.length &&
            (
              t.StartPoint.x < t.EndPoint.x ? t.hooks[0].hookpt === h.SED_KTL ? (a = t.hooks[0].objid, r = t.hooks[1].objid) : (a = t.hooks[1].objid, r = t.hooks[0].objid) : t.hooks[0].hookpt === h.SED_KTL ? (a = t.hooks[1].objid, r = t.hooks[0].objid) : (a = t.hooks[0].objid, r = t.hooks[1].objid),
              - 1 === Business.ShiftConnectedShapes(a, r, t.BlockID, o.RIGHT, i > 0, null, Math.abs(i))
            )
          )
        ) return - 1
      },
      L = {};
    GlobalData.docHandler.rulerSettings.showpixels &&
      (t /= 100),
      GlobalDataGlobalData.optManager.ScaleToRuler(t, t, GlobalData.docHandler.rulerSettings.units, L, !1, !0),
      L.x > ConstantData.Defines.MAXARRAYSPACING &&
      (L.x = ConstantData.Defines.MAXARRAYSPACING, u = !0);
    var I = L.x;
    o = e ? d.def.v_arraywidth : d.def.h_arraywidth;
    var T,
      b = GlobalDataGlobalData.optManager.GetTargetSelect(),
      M = GlobalDataGlobalData.optManager.GetObjectPtr(GlobalDataGlobalData.optManager.theSelectedListBlockID, !1);
    if (D = Utils1.DeepCopy(M)) for (i = D.length, r = 0; r < i; r++) if (n = GlobalData.optManager.GetObjectPtr(D[r], !0)) if (
      n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
      n.objecttype === g.SD_OBJT_BUSLOGIC_LINEDRAW
    ) p = f(n),
      D[r] === b &&
      - 1 === p &&
      (m = !1, u = !0);
    else switch (n.objecttype) {
      case g.SD_OBJT_SWIMLANE_COLS:
      case g.SD_OBJT_SWIMLANE_ROWS:
      case g.SD_OBJT_SWIMLANE_GRID:
        y(n);
        break;
      default:
        n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
          (
            null != (T = Business.GetShapeLines(D[r], C)).vline &&
            e &&
            D.indexOf(T.vline) < 0 &&
            (D.push(T.vline), D[r] === b && (b = T.vline), i++),
            null == T.hline ||
            e ||
            D.indexOf(T.hline) < 0 &&
            (D.push(T.hline), D[r] === b && (b = T.hline), i++)
          )
    }
    m &&
      (
        d = GlobalDataGlobalData.optManager.GetObjectPtr(GlobalDataGlobalData.optManager.theSEDSessionBlockID, !0),
        I < 20 &&
        (I = 20),
        e ? d.def.v_arraywidth = I : d.def.h_arraywidth = I
      ),
      u &&
      a ||
      GlobalDataGlobalData.optManager.CompleteOperation(null)
  },
  Business.LineDraw.prototype.StopActionEventPropagation = function () {
    return !0
  },
  Business.LineDraw.prototype.SubProcess_Selection = function (e) {
    var t,
      a,
      r,
      i,
      n,
      o,
      s,
      l,
      S = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1);
    for (t = S.length - 1; t >= 0; t--) if (r = S[t], a = GlobalData.optManager.GetObjectPtr(r, !1)) if (
      a.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE
    ) (
      a.hooks.length < 2 ||
      S.indexOf(a.hooks[0].objid) < 0 ||
      S.indexOf(a.hooks[1].objid) < 0
    ) &&
      S.splice(t, 1);
    else if (
      a.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
    ) for (n = (i = GlobalData.optManager.FindAllChildLines(r)).length, o = 0; o < n; o++) s = i[o],
      S.indexOf(s) < 0 &&
      (l = GlobalData.optManager.GetObjectPtr(s, !1)) &&
      2 === l.hooks.length &&
      S.indexOf(l.hooks[0].objid) >= 0 &&
      S.indexOf(l.hooks[1].objid) >= 0 &&
      S.push(s)
  },
