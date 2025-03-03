



import Rect from './Shape.Rect'
import ListManager from '../Data/ListManager';
import FileParser from '../Data/FileParser';
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/GlobalData'
import Collab from '../Data/Collab'
import DefaultEvt from "../Event/DefaultEvt";

import Document from '../Basic/Basic.Document'

import Element from '../Basic/Basic.Element';
import ConstantData from '../Data/ConstantData'
import ContainerListShape from '../Model/ContainerListShape'


class ShapeContainer extends Rect {


  // constructor(e) {
  //   //'use strict';
  //   (e = e || {
  //   }).ShapeType = ConstantData.ShapeType.RECT;
  //   var t = ListManager.Rect.apply(this, [
  //     e
  //   ]);
  //   if (
  //     t.dataclass = e.dataclass ||
  //     ConstantData.SDRShapeTypes.SED_S_Rect,
  //     t.ContainerList = e.ContainerList ||
  //     new ListManager.ContainerList,
  //     t.objecttype = ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER,
  //     t
  //   ) return t.nativeDataArrayBuffer = e.nativeDataArrayBuffer ||
  //     null,
  //     t.SymbolData = e.SymbolData ||
  //     null,
  //     t
  // }


  // constructor(e) {
  //   //'use strict';
  //   e = e || {};
  //   e.ShapeType = ConstantData.ShapeType.RECT;
  //   super(e);

  //   this.dataclass = e.dataclass || ConstantData.SDRShapeTypes.SED_S_Rect;
  //   this.ContainerList = e.ContainerList || new ListManager.ContainerList();
  //   this.objecttype = ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER;
  //   this.nativeDataArrayBuffer = e.nativeDataArrayBuffer || null;
  //   this.SymbolData = e.SymbolData || null;
  // }

  public ContainerList: any;

  constructor(e) {
    //'use strict';
    e = e || {};
    e.ShapeType = ConstantData.ShapeType.RECT;
    super(e);

    this.dataclass = e.dataclass || ConstantData.SDRShapeTypes.SED_S_Rect;
    this.ContainerList = e.ContainerList || new ListManager.ContainerList();
    this.objecttype = ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER;
    this.nativeDataArrayBuffer = e.nativeDataArrayBuffer || null;
    this.SymbolData = e.SymbolData || null;
  }


  // ListManager.ShapeContainer.prototype = new ListManager.Rect,
  // ListManager.ShapeContainer.prototype.constructor = ListManager.ShapeContainer

  IsShapeContainer(e, t) {
    var a = ConstantData.ContainerListFlags;
    if (null == e) return !1;
    if (
      e.ParentFrameID >= 0 &&
      GlobalData.optManager.GetObjectPtr(e.ParentFrameID, !1)
    ) return !1;
    if (e.IsSwimlane()) return !1;
    if (e.flags & ConstantData.ObjFlags.SEDO_TextOnly) return !1;
    if (
      e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
    ) {
      var r = this.ContainerList,
        i = r.flags & a.Sparse;
      return t &&
        (
          i ||
            r.Arrangement !== ConstantData.ContainerListArrangements.Row ? t.id = ConstantData.HookPts.SED_KCT : (
            t.x -= e.Frame.width / 2,
            t.y += e.Frame.height / 2,
            t.id = ConstantData.HookPts.SED_KCL
          )
        ),
        r.flags & a.AllowOnlyContainers ? e
          // instanceof ListManager.ShapeContainer ||
          instanceof ShapeContainer ||
          e.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER : !(r.flags & a.AllowOnlyNonContainers) ||
        // e instanceof ListManager.ShapeContainer == !1
        e instanceof ShapeContainer == !1

        &&
        e.objecttype !== ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER
    }
  }

  CreateConnectHilites(e, t, a, r, i, n) {
  }

  GetBestHook(e, t, a) {
    return t
  }

  GetTargetPoints(e, t, a) {
    var r,
      i,
      n,
      o = [],
      s = this.ContainerList,
      l = s.List,
      S = l.length,
      c = ConstantData.Defines.SED_CDim,
      u = {
        x: c / 2,
        y: 0
      },
      p = s.flags & ConstantData.ContainerListFlags.Sparse,
      d = this.Pr_GetContainerFrame().frame,
      D = GlobalData.optManager.ContainerIsInCell(this);
    n = d.width;
    var g = s.ndown,
      h = s.nacross;
    if (D && p) {
      var m = d.height - s.height,
        C = Math.floor(m / s.childheight);
      C < 0 &&
        (C = 0),
        g += C;
      var y = d.width - s.width,
        f = Math.floor(y / s.childwidth);
      f < 0 &&
        (f = 0),
        h += f
    }
    if (p) {
      var L;
      for (L = 0; L <= g; L++) for (r = - 1; r <= h; r++) u = new Point(r, L),
        o.push(u);
      return o
    }
    if (
      s.Arrangement === ConstantData.ContainerListArrangements.Column
    ) for (S > 0 && (u.x = l[0].pt.x / n * c), o.push(u), r = 0; r < S; r++) i = l[r].pt.x / n * c,
      u = new Point(i, r + 1),
      o.push(u);
    else for (
      u.x = s.HorizontalSpacing,
      u.y = 0,
      S > 0 &&
      (u.x = 0),
      o.push(u),
      r = 0;
      r < S;
      r++
    ) i = l[r].pt.y / n * c,
      u = new Point(i, r + 1),
      o.push(u);
    return o
  }

  Pr_GetContainerFrame() {
    return {
      frame: Utils1.DeepCopy(this.trect),
      StartY: 0
    }
  }

  GetHitTestFrame(e) {
    var t = {},
      a = this.ContainerList,
      r = a.flags & ConstantData.ContainerListFlags.Sparse;
    return Utils2.CopyRect(t, this.r),
      e &&
      e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
      (
        r ? (
          t.width += a.HorizontalSpacing + a.childwidth,
          t.x -= a.HorizontalSpacing + a.childwidth / 2
        ) : t.width += a.HorizontalSpacing + e.Frame.width / 2,
        t.height += 2 * a.VerticalSpacing
      ),
      t
  }

  AllowDoubleClick() {
    return !!(
      this.ContainerList.flags & ConstantData.ContainerListFlags.Sparse
    )
  }

  DoubleClick(e, t) {
    var a,
      r,
      i = this.ContainerList,
      n = i.List,
      o = n.length,
      s = i.flags & ConstantData.ContainerListFlags.Sparse,
      l = 0,
      S = 0,
      c = null,
      u = function (e) {
        var t,
          a,
          r,
          o,
          s = 0;
        for (t = 0; t < i.ndown; t++) {
          if (a = t * i.nacross + e, n[a].id >= 0) {
            if (!(r = GlobalData.optManager.GetObjectPtr(n[a].id, !1))) continue;
            o = r.Frame.width
          } else o = i.childwidth;
          o > s &&
            (s = o)
        }
        return s += 2 * i.HorizontalSpacing
      };
    if (!t) {
      var p = e.gesture.srcEvent.ctrlKey,
        d = e.gesture.srcEvent.shiftKey,
        D = GlobalData.optManager.ContainerIsInCell(this);
      if (D && (d || p)) return void GlobalData.optManager.Table_SetupAction(e, D.obj.BlockID, ConstantData.Defines.TableCellHit, null)
    }
    if (s) {
      if (t) {
        l = t.Data.row,
          S = t.Data.col,
          foundslot = !0;
        var g = Utils1.DeepCopy(t.Data.theNewPoint)
      } else {
        foundslot = !1;
        g = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
        var h = Utils1.DeepCopy(g);
        if (
          g.x -= this.Frame.x,
          g.y -= this.Frame.y,
          (
            this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA ||
            this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB
          ) &&
          (g.y < 10 || g.y > this.Frame.height - 10)
        ) {
          var m = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
          return void GlobalData.optManager.ActivateTextEdit(m.svgObj.SDGObj, e)
        }
        if (D) for (
          var C,
          y,
          f,
          L = this.GetTargetPoints(),
          I = this.GetPerimPts(null, L, null, !0, null, 1),
          T = 1e+30,
          b = - 1,
          M = 0;
          M < I.length;
          M++
        ) (f = (C = I[M].x - h.x) * C + (y = I[M].y - h.y) * y) < T &&
          (T = f, b = M),
          b >= 0 &&
          (S = L[b].x, l = L[b].y, foundslot = !0);
        else {
          var P = !1;
          for (a = 1; a < i.ndown; a++) if (r = a * i.nacross, n[r].pt.y > g.y) {
            l = a - 1,
              P = !0;
            break
          }
          for (P || (l = i.ndown - 1), P = !1, M = 1; M < i.nacross; M++) if (n[M].pt.x > g.x) {
            P = !0;
            var R = u(M - 1),
              A = n[M - 1].pt.x + R / 2;
            S = g.x < A ? M - 1 : M;
            break
          }
          P ||
            (S = i.nacross - 1),
            r = i.nacross * l + S,
            foundslot = n[r].id < 0
        }
      }
      if (foundslot) {
        if (
          Collab.AllowMessage() &&
          Collab.BeginSecondaryEdit(),
          t
        ) var _ = t.Data.closest;
        else _ = function (e, t) {
          var a,
            s = - 1;
          if (
            i.Arrangement === ConstantData.ContainerListArrangements.Column
          ) {
            if (t <= i.nacross && (t = i.nacross - 1) < 0) return - 1;
            for (a = 0; a < i.ndown; a++) if ((r = a * i.nacross + t) < n.length && n[r].id >= 0) {
              if (!(a < e)) return s < 0 &&
                (s = n[r].id),
                s;
              s = n[r].id
            }
          } else for (a = 0; a < i.nacross; a++) {
            if (e <= i.ndown && (e = i.ndown - 1) < 0) return - 1;
            if ((r = e * i.nacross + a) < n.length && n[r].id >= 0) {
              if (!(a < t)) return s < 0 &&
                (s = n[r].id),
                s;
              s = n[r].id
            }
          }
          if (s < 0) for (a = 0; a < o; a++) if (n[a].id >= 0) return n[a].id;
          return s
        }(l, S);
        if (_ < 0) {
          c = t ? t.Data.SymbolID : SDUI.Commands.MainController.Symbols.GetSelectedButton();
          var E = gBaseManager.AddSymbol(c),
            w = GlobalData.optManager.GetObjectPtr(E, !0),
            F = i.childwidth,
            v = i.childheight,
            G = {
              x: g.x,
              y: g.y,
              width: F,
              height: v
            };
          w.UpdateFrame(G),
            w.sizedim.width = F,
            w.sizedim.height = v
        } else E = gBaseManager.DuplicateShape(_, !0, !1);
        GlobalData.optManager.AddToDirtyList(E);
        L = {
          x: S,
          y: l
        };
        var N = ConstantData.HookPts.SED_KCT,
          k = [];
        if (
          GlobalData.optManager.UpdateHook(E, - 1, this.BlockID, N, L, null),
          k.push(E),
          GlobalData.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
          Collab.AllowMessage()
        ) {
          var U = [];
          U.push(E);
          var J = {
            BlockID: this.BlockID,
            closest: _,
            SymbolID: c,
            row: l,
            col: S
          };
          J.CreateList = U,
            J.theNewPoint = {
              x: g.x,
              y: g.y
            },
            Collab.BuildMessage(ConstantData.CollabMessages.ContainerDoubleClick, J, !1)
        }
        GlobalData.optManager.CompleteOperation(k)
      }
    }
  }

  NoRotate() {
    return !0
  }

  FieldDataAllowed() {
    return !GlobalData.optManager.ContainerIsInCell(this)
  }

  GetPerimPts(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u = t.length,
      p = this.ContainerList,
      d = p.List,
      D = d.length,
      g = ConstantData.Defines.SED_CDim,
      h = [],
      m = ConstantData.ContainerListArrangements,
      C = (
        ConstantData.HookPts,
        p.flags & ConstantData.ContainerListFlags.Sparse
      );
    1 === u &&
      this.flags & ConstantData.ObjFlags.SEDO_Obj1 &&
      this.Pr_Format();
    var y = this.Pr_GetContainerFrame(),
      f = y.frame;
    S = p.VerticalSpacing + y.StartY;
    var L = GlobalData.optManager.ContainerIsInCell(this);
    if (1 === u && n < 0) return a === ConstantData.HookPts.SED_KCTL ? (l = f.x, S = f.y) : a === ConstantData.HookPts.SED_KCL ? (l = f.x, S = f.y + f.height / 2) : (l = f.x + f.width / 2, S = f.y),
      s = new Point(l, S),
      null != t[0].id &&
      (s.id = t[0].id),
      h.push(s),
      h;
    if (C && n >= 0) {
      for (o = 0; o < u; o++) l = 0,
        S = 0,
        t[o].y < p.ndown ? t[o].x < 0 ? (
          S = d[c = t[o].y * p.nacross].pt.y,
          l = L ? p.HorizontalSpacing / 2 : - p.childwidth / 2
        ) : t[o].x < p.nacross ? (S = d[c = t[o].y * p.nacross + t[o].x].pt.y, l = d[c].pt.x) : (
          S = d[c = t[o].y * p.nacross + p.nacross - 1].pt.y,
          l = p.width + (t[o].x - p.nacross) * p.childwidth + p.childwidth / 2,
          L &&
          l > f.width - p.HorizontalSpacing / 2 &&
          (l = f.width - p.HorizontalSpacing / 2)
        ) : (
          S = p.height + (t[o].y - p.ndown) * p.childheight + p.VerticalSpacing,
          L &&
          S > f.height - p.VerticalSpacing / 2 &&
          (l = f.height - p.VerticalSpacing / 2),
          t[o].x < 0 ? (c = t[o].y * p.nacross, l = L ? p.HorizontalSpacing / 2 : - p.childwidth / 2) : t[o].x < p.nacross ? l = d[c = t[o].y >= p.ndown ? (p.ndown - 1) * p.nacross + t[o].x : (t[o].y - 1) * p.nacross + t[o].x].pt.x : (
            l = p.width + (t[o].x - p.nacross) * p.childwidth + p.childwidth / 2,
            L &&
            l > f.width - p.HorizontalSpacing / 2 &&
            (l = f.width - p.HorizontalSpacing / 2)
          )
        ),
        s = new Point(l + f.x, S + f.y),
        h.push(s);
      return h
    }
    for (o = 0; o < u; o++) c = t[o].y,
      p.Arrangement === ConstantData.ContainerListArrangements.Column ? l = t[o].x / g * f.width : S = t[o].x / g * f.height,
      c < D ? (S = d[c].pt.y, l = d[c].pt.x) : 0 === D ? p.Arrangement === ConstantData.ContainerListArrangements.Column ? S = p.VerticalSpacing : (l = p.HorizontalSpacing, S = this.Frame.height / 2) : (
        c = D - 1,
        obj = GlobalData.optManager.GetObjectPtr(d[c].id, !1),
        p.Arrangement === m.Row ? (
          l = p.width,
          S = d[c].pt.y,
          obj &&
          (l = d[c].pt.x + obj.Frame.width + p.HorizontalSpacing) > p.width &&
          (l = p.width)
        ) : (
          S = p.height,
          obj &&
          (S = d[c].pt.y + obj.Frame.height + p.VerticalSpacing),
          l = d[c].pt.x
        )
      ),
      a === ConstantData.HookPts.SED_KAT &&
      (S = 0),
      s = new Point(l + f.x, S + f.y),
      u > 1 &&
      (
        p.Arrangement === ConstantData.ContainerListArrangements.Column ? s.y -= p.VerticalSpacing / 2 : s.x -= p.HorizontalSpacing / 2
      ),
      null != t[o].id &&
      (s.id = t[o].id),
      h.push(s);
    return h
  }

  Pr_Format(e) {
    var t,
      a,
      r,
      i,
      n = this.ContainerList,
      o = n.List,
      s = o.length,
      l = 0,
      S = n.VerticalSpacing,
      c = 0,
      u = S,
      p = ConstantData.ContainerListArrangements,
      d = this,
      D = 0,
      g = n.flags & ConstantData.ContainerListFlags.Sparse,
      h = n.flags & ConstantData.ContainerListFlags.LeftChanged,
      m = n.flags & ConstantData.ContainerListFlags.TopChanged,
      C = null;
    n.flags = Utils2.SetFlag(n.flags, ConstantData.ContainerListFlags.LeftChanged, !1),
      n.flags = Utils2.SetFlag(n.flags, ConstantData.ContainerListFlags.TopChanged, !1);
    var y = function (e, r, i) {
      var l,
        S = n.VerticalSpacing + D,
        c = n.Wrap,
        u = 0,
        p = 0;
      for (
        t = e;
        t < s &&
        (
          S += o[t].extra,
          o[t].pt = {
            x: r,
            y: S
          },
          (a = GlobalData.optManager.GetObjectPtr(o[t].id, !1)) &&
          (
            a.Frame.y !== S &&
            GlobalData.optManager.SetLinkFlag(a.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
            a.Frame.width > p &&
            (p = a.Frame.width),
            S += a.Frame.height + n.VerticalSpacing,
            u++
          ),
          !(c > 0 && u >= c)
        );
        t++
      );
      (p += 2 * n.HorizontalSpacing) < n.MinWidth &&
        (p = n.MinWidth),
        l = p,
        i &&
        l < i.width &&
        (l = i.width);
      var g = !1;
      for (t = e; t < s; t++) o[t].pt.x += l / 2,
        (a = GlobalData.optManager.GetObjectPtr(o[t].id, !1)) &&
        a.Frame.x + a.Frame.width / 2 !== d.Frame.x + o[t].pt.x &&
        (
          GlobalData.optManager.SetLinkFlag(a.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
          g = !0
        );
      return g &&
        GlobalData.optManager.SetLinkFlag(d.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
      {
        start: u + e,
        colwidth: p,
        top: S
      }
    },
      f = function (e, r, i, l) {
        var S,
          c,
          u = n.HorizontalSpacing,
          p = n.Wrap,
          D = 0,
          g = 0,
          h = i;
        for (
          t = e;
          t < s &&
          (
            u += o[t].extra,
            o[t].pt = {
              x: u,
              y: h
            },
            (a = GlobalData.optManager.GetObjectPtr(o[t].id, !1)) ? (
              a.Frame.y / 2 !== h &&
              GlobalData.optManager.SetLinkFlag(a.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
              S = a.Frame.width,
              c = a.Frame.height
            ) : (S = n.childwidth, c = n.childheight),
            c > g &&
            (g = c),
            u += S + n.HorizontalSpacing,
            D++,
            !(p > 0 && D >= p)
          );
          t++
        );
        (g += 2 * n.VerticalSpacing) < n.MinHeight &&
          (g = n.MinHeight);
        var m = g;
        l &&
          m < l.height &&
          (m = l.height);
        var C = !1;
        for (t = e; t < s; t++) o[t].pt.y += m / 2,
          (a = GlobalData.optManager.GetObjectPtr(o[t].id, !1)) &&
          a.Frame.y + a.Frame.height / 2 !== r.y + o[t].pt.y &&
          (
            GlobalData.optManager.SetLinkFlag(a.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
            C = !0
          );
        return C &&
          GlobalData.optManager.SetLinkFlag(d.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
        {
          start: D + e,
          rowht: g,
          left: u
        }
      },
      L = GlobalData.optManager.ContainerIsInCell(this);
    L &&
      (C = {
        width: this.trect.width,
        height: this.trect.height
      });
    var I,
      T = this.Pr_GetContainerFrame();
    i = T.frame,
      D = T.StartY,
      r = 0;
    var b = n.VerticalSpacing + D;
    if (g) I = function (e) {
      var t,
        r,
        i,
        o,
        s,
        l,
        S = e,
        c = n.HorizontalSpacing,
        u = [],
        p = [];
      for (t = 0; t < n.ndown; t++) for (r = 0; r < n.nacross; r++) i = t * n.nacross + r,
        null == (o = n.List[i]).id &&
        (o.id = - 1),
        (a = GlobalData.optManager.GetObjectPtr(o.id, !1)) ? (s = a.Frame.width, l = a.Frame.height) : (s = n.childwidth, l = n.childheight),
        (null == u[r] || u[r] < s) &&
        (u[r] = s),
        (null == p[t] || p[t] < l) &&
        (p[t] = l);
      for (t = 0; t < n.ndown; t++) {
        for (c = n.HorizontalSpacing, r = 0; r < n.nacross; r++) i = t * n.nacross + r,
          (o = n.List[i]).pt.x = c + u[r] / 2,
          o.pt.y = S,
          c += u[r] + n.HorizontalSpacing;
        S += p[t] + n.VerticalSpacing
      }
      return {
        left: c,
        top: S
      }
    }(b),
      c = I.left,
      u = I.top;
    else switch (n.Arrangement) {
      case p.Column:
        for (; r < s;) r = (I = y(r, l, C)).start,
          c += I.colwidth,
          l += I.colwidth,
          r < s &&
          (c -= n.HorizontalSpacing, l -= n.HorizontalSpacing),
          I.top > u &&
          (u = I.top);
        break;
      case p.Row:
        for (; r < s;) u -= n.VerticalSpacing,
          r = (I = f(r, i, b -= n.VerticalSpacing, C)).start,
          u += I.rowht,
          b += I.rowht,
          I.left > c &&
          (c = I.left)
    }
    if (!e) {
      n.width = c,
        u += D,
        n.height = u,
        c < n.MinWidth &&
        (c = n.MinWidth),
        u < n.MinHeight &&
        (u = n.MinHeight);
      var M = c - i.width,
        P = u - i.height;
      if (
        Utils2.IsEqual(P, 0, 1) &&
        (P = 0),
        Utils2.IsEqual(M, 0, 1) &&
        (M = 0),
        L &&
        (M || P)
      ) {
        var R = GlobalData.optManager.GetObjectPtr(L.obj.BlockID, !0),
          A = R.GetTable(!0);
        Business.SizeContainerCell(R, A, L.cell, L.cellindex, c, u),
          g ||
          (
            P = L.cell.frame.height - L.cell.vdisp - i.height,
            u = L.cell.frame.height - L.cell.vdisp
          ),
          M < 0 &&
          (M = 0),
          P < 0 &&
          g &&
          (P = 0)
      }
      var _ = 0,
        E = 0;
      if (trect = i, M || P) {
        var w = 0,
          F = 0;
        if (
          M &&
          (w = c, trect.width = w, h && (_ = - M)),
          P &&
          (F = u, trect.height = F, m && (E = - P)),
          this.TRectToFrame(trect, !0),
          GlobalData.optManager.AddToDirtyList(this.BlockID),
          L ||
          (
            this.sizedim.width = this.Frame.width,
            this.sizedim.height = this.Frame.height
          ),
          !L
        ) {
          if (
            GlobalData.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
            this.hooks.length
          ) {
            var v = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, !1);
            // v instanceof ListManager.ShapeContainer &&
            v instanceof ShapeContainer &&
              (
                v.flags = Utils2.SetFlag(v.flags, ConstantData.ObjFlags.SEDO_Obj1, !0),
                GlobalData.optManager.SetLinkFlag(v.BlockID, ConstantData.LinkFlags.SED_L_MOVE)
              )
          } (_ || E) &&
            this.OffsetShape(_, E)
        }
      }
      this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_Obj1, !1)
    }
  }

  OnConnect(e, t, a, r, i) {
    if (
      // t instanceof ListManager.ShapeContainer &&
      t instanceof ShapeContainer &&
      (null == this.zListIndex || this.zListIndex < 0)
    ) {
      var n = GlobalData.optManager.svgObjectLayer.GetElementByID(e);
      n &&
        (
          this.zListIndex = GlobalData.optManager.svgObjectLayer.GetElementIndex(n),
          GlobalData.optManager.svgObjectLayer.MoveElementToFront(n)
        )
    }
  }

  Pr_GetShapeConnectorInfo(e) {
    var t,
      a = this.ContainerList,
      r = a.flags & ConstantData.ContainerListFlags.Sparse,
      i = a.flags & ConstantData.ContainerListFlags.Adjust,
      n = [],
      o = ConstantData.ActionTriggerType;
    return r ||
      !i ? null : (
      t = a.Arrangement === ConstantData.ContainerListArrangements.Row ? {
        knobID: o.CONTAINER_ADJ,
        cursorType: Element.CursorType.RESIZE_R,
        knobData: 0,
        hook: e.hookpt,
        polyType: 'horizontal'
      }
        : {
          knobID: o.CONTAINER_ADJ,
          cursorType: Element.CursorType.RESIZE_B,
          knobData: 0,
          hook: e.hookpt,
          polyType: 'vertical'
        },
      n.push(t),
      n
    )
  }


  GetListOfEnclosedObjects(e) {
    return []
  }

  ChangeTarget(e, t, a, r, i, n) {
    var o = ConstantData.ContainerListFlags,
      s = GlobalData.optManager.ContainerIsInCell(this),
      l = function (e, t) {
        var a = C.ContainerList.List,
          r = a.length,
          i = new ContainerListShape();
        if (i.id = e, t >= r) a.push(i);
        else {
          var n = a[t].extra;
          a[t].extra = 0,
            i.extra = n,
            a.splice(t, 0, i)
        }
      },
      S = function (e) {
        var t,
          a = C.ContainerList.List,
          r = a.length,
          i = - 1;
        for (t = 0; t < r; t++) if (a[t].id === e) {
          i = t;
          break
        }
        i >= 0 &&
          a.splice(i, 1)
      },
      c = function (e, t) {
        var a,
          r,
          i,
          n = C.ContainerList,
          o = n.List,
          l = 0,
          S = 0,
          c = [],
          u = [];
        for (a = 0; a < n.ndown; a++) for (r = 0; r < n.nacross; r++) (i = o[n.nacross * a + r]).id === e &&
          (i.id = - 1),
          i.id >= 0 &&
          (u[r] = !0, c[a] = !0),
          0 === r &&
          i.id >= 0 &&
          !0,
          r === n.nacross - 1 &&
          i.id >= 0 &&
          !0,
          0 === a &&
          i.id >= 0 &&
          !0,
          a === n.ndown - 1 &&
          i.id >= 0 &&
          !0;
        var p = - 1;
        for (a = 0; a < n.nacross; a++) 1 == u[a] &&
          p < 0 &&
          (p = a);
        var d = - 1;
        for (a = n.nacross - 1; a >= 0; a--) 1 == u[a] &&
          d < 0 &&
          (d = a);
        var D = - 1;
        for (null == c[0] && t && 0 === t.y && (c[0] = !0), a = 0; a < n.ndown; a++) 1 == c[a] &&
          D < 0 &&
          (D = a);
        var g = - 1;
        for (a = n.ndown - 1; a >= 0; a--) 1 == c[a] &&
          g < 0 &&
          (g = a);
        for (a = n.ndown - 1; a > g; a--) n.ndown > 1 &&
          (o.splice(a * n.nacross, n.nacross), n.ndown--);
        if (null == s) for (a = D - 1; a >= 0; a--) n.ndown > 1 &&
          (o.splice(a * n.nacross, n.nacross), n.ndown--, S--);
        for (r = n.nacross - 1; r > d; r--) if (n.nacross > 1) {
          for (a = n.ndown - 1; a >= 0; a--) o.splice(n.nacross * a + r, 1);
          n.nacross--
        }
        if (null == s) for (r = p - 1; r >= 0; r--) if (n.nacross > 1) {
          for (a = n.ndown - 1; a >= 0; a--) o.splice(n.nacross * a + r, 1);
          n.nacross--,
            l--
        }
        return {
          dx: l,
          dy: S
        }
      };
    if (null != t) {
      var u = GlobalData.optManager.GetObjectPtr(t, !1);
      u.OnDisconnect(t, this);
      var p,
        d,
        D,
        g = this.ContainerList,
        h = g.List,
        m = h.length,
        C = this,
        y = g.flags & ConstantData.ContainerListFlags.Sparse,
        f = - 1;
      for (p = 0; p < m; p++) if (h[p].id === t) {
        f = p;
        break
      }
      if (y) {
        var L;
        if (n) f >= 0 &&
          (D = c(t, i), i.x += D.dx, i.y += D.dy),
          L = function (e, t) {
            var a = C.ContainerList,
              r = a.List,
              i = 0;
            T = 0;
            var n = ConstantData.ContainerListArrangements,
              o = function (e, t) {
                var o,
                  s,
                  l,
                  S,
                  c,
                  u,
                  p = - 1;
                for (o = t; o < 0; o++) {
                  for (s = 0; s < a.nacross; s++) S = new ContainerListShape(),
                    r.unshift(S);
                  a.ndown++,
                    T++
                }
                for (o = e; o < 0; o++) {
                  for (s = a.ndown - 1; s >= 0; s--) l = s * a.nacross,
                    S = new ContainerListShape(),
                    r.splice(l, 0, S);
                  a.nacross++,
                    i++
                }
                if (t < 0 || e < 0) return {
                  dx: i,
                  dy: T
                };
                if (a.Arrangement === n.Column) {
                  for (o = t + 1; o < a.ndown; o++) l = o * a.nacross + e,
                    r[l].id < 0 &&
                    (p = o);
                  if (p < 0) {
                    for (s = 0; s < a.nacross; s++) S = new ContainerListShape(),
                      r.push(S);
                    a.ndown++,
                      p = a.ndown - 1
                  }
                  for (o = p; o > t; o--) c = (o - 1) * a.nacross + e,
                    l = o * a.nacross + e,
                    r[l].id = r[c].id;
                  l = t * a.nacross + e,
                    r[l].id = - 1
                } else if (a.Arrangement === n.Row) {
                  for (o = e + 1; o < a.nacross; o++) l = t * a.nacross + o,
                    r[l].id < 0 &&
                    (p = o);
                  if (p < 0) {
                    for (s = a.ndown; s > 0; s--) l = s * a.nacross,
                      S = new ContainerListShape(),
                      r.splice(l, 0, S);
                    a.nacross++,
                      p = a.nacross - 1
                  }
                  for (o = p; o > e; o--) u = t * a.nacross + (o - 1),
                    l = t * a.nacross + o,
                    r[l].id = r[u].id;
                  l = t * a.nacross + e,
                    r[l].id = - 1
                }
              };
            if (!(e >= a.nacross || t >= a.ndown && e >= 0)) {
              if (t < 0 || e < 0) return o(e, t);
              var s = a.nacross * t + e;
              r[s].id >= 0 &&
                o(e, t)
            }
          }(i.x, i.y),
          i.y < 0 &&
          (i.y = 0),
          i.x < 0 &&
          (i.x = 0),
          function (e, t, a) {
            var r,
              i,
              n,
              o,
              s,
              l = C.ContainerList,
              S = l.List;
            if (a >= l.ndown) {
              for (r = l.ndown; r <= a; r++) for (n = 0; n < l.nacross; n++) i = new ContainerListShape(),
                S.push(i);
              l.ndown = a + 1
            }
            if (t >= l.nacross) {
              for (s = l.nacross, r = l.ndown - 1; r >= 0; r--) for (o = s * (r + 1), n = s; n <= t; n++) i = new ContainerListShape(),
                S.splice(o, 0, i);
              l.nacross = t + 1
            } (i = S[o = a * l.nacross + t]).id = e
          }(t, i.x, i.y),
          GlobalData.optManager.PutInFrontofObject(C.BlockID, t),
          u.moreflags = Utils2.SetFlag(
            u.moreflags,
            ConstantData.ObjMoreFlags.SED_MF_ContainerChild,
            !0
          );
        else D = c(t, null),
          u.moreflags = Utils2.SetFlag(
            u.moreflags,
            ConstantData.ObjMoreFlags.SED_MF_ContainerChild,
            !1
          );
        var I = 0,
          T = 0;
        D &&
          (I = D.dx, T = D.dy),
          L &&
          (I += L.dx, T += L.dy),
          I &&
          (g.flags = Utils2.SetFlag(g.flags, o.LeftChanged, !0)),
          T &&
          (g.flags = Utils2.SetFlag(g.flags, o.TopChanged, !0))
      } else n ? f >= 0 ? (d = i.y) > f ? (l(t, i.y), S(t)) : d < f &&
        (S(t), l(t, d)) : (
        l(t, i.y),
        GlobalData.optManager.PutInFrontofObject(C.BlockID, t),
        u.moreflags = Utils2.SetFlag(
          u.moreflags,
          ConstantData.ObjMoreFlags.SED_MF_ContainerChild,
          !0
        )
      ) : (
        S(t),
        u.moreflags = Utils2.SetFlag(
          u.moreflags,
          ConstantData.ObjMoreFlags.SED_MF_ContainerChild,
          !1
        ),
        GlobalData.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE)
      );
      y ? function () {
        var e,
          t,
          a,
          r,
          i = C.ContainerList,
          n = i.List;
        for (e = 0; e < i.ndown; e++) for (t = 0; t < i.nacross; t++) r = e * i.nacross + t,
          obj = GlobalData.optManager.GetObjectPtr(n[r].id, !1),
          obj &&
          obj.hooks.length &&
          (
            (a = obj.hooks[0].connect).x === t &&
            a.y === e ||
            (
              obj = GlobalData.optManager.GetObjectPtr(n[r].id, !0),
              obj.hooks[0].connect.x = t,
              obj.hooks[0].connect.y = e
            )
          )
      }() : function () {
        var e,
          t = C.ContainerList.List,
          a = t.length;
        for (e = 0; e < a; e++) obj = GlobalData.optManager.GetObjectPtr(t[e].id, !0),
          obj &&
          obj.hooks.length &&
          (obj.hooks[0].connect.y = e)
      }(),
        this.Pr_Format()
    } else this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_Obj1, !0)
  }

}

export default ShapeContainer;
