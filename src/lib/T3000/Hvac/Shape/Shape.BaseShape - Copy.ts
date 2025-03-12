





// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import T3Svg from '../../Hvac.SVG.t2';
import HvTimer from '../Helper/T3Timer'

// import {Evt_ActionTrackHandlerFactory,

//   Evt_ActionReleaseHandlerFactory,
//   Evt_WorkAreaHammerDragStart,
//   Evt_DrawTrackHandlerFactory,
//   Evt_DrawReleaseHandlerFactory
// } from '../../MouseEvent';

import BaseDrawingObject from './S.BaseDrawingObject'
import GlobalData from '../Data/T3Gv'
// import ShapeContainer from './Shape.ShapeContainer'
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import EvtUtil from "../Event/EvtUtil";

import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'

import Resources from '../Data/Resources'
import ListManager from '../Data/ListManager';

// import Element from "../Basic/Basic.Element";

import $ from 'jquery';
import Point from '../Model/Point';


import Document from '../Basic/B.Document'


import Element from '../Basic/B.Element';
// import Business from '../Opt/Business/Business';

import Business from '../Opt/Business/OptAhUtil';
import SDF from '../Data/ShapeDataUtil'

import Commands from '../Opt/Business/ToolOpt'

import Instance from '../Data/Instance/Instance'
import ConstantData from '../Data/ConstantData'
import PolyList from '../Model/PolyList'



import PolySeg from '../Model/PolySeg'
import RightClickData from '../Model/RightClickData'
import Rectangle from '../Model/Rectangle'

class BaseShape extends BaseDrawingObject {

  /*
    ListManager.BaseShape = function (e) {
      (e = e || {
      }).DrawingObjectBaseClass = ConstantData.DrawingObjectBaseClass.SHAPE,
        0 !== e.hookflags &&
        (
          e.hookflags = ConstantData.HookFlags.SED_LC_Shape | ConstantData.HookFlags.SED_LC_AttachToLine
        ),
        0 !== e.targflags &&
        (
          e.targflags = ConstantData.HookFlags.SED_LC_Shape | ConstantData.HookFlags.SED_LC_Line
        );
      var t = ListManager.BaseDrawingObject.apply(this, [
        e
      ]);
      if (
        t.ShapeType = e.ShapeType,
        t.shapeparam = e.shapeparam ||
        0,
        t.SVGDim = e.SVGDim ||
        {
        },
        t
      ) return t
    }
      */

  public ShapeType: any;
  public shapeparam: any;
  public SVGDim: any;

  constructor(e) {

    e = e || {};
    e.DrawingObjectBaseClass = ConstantData.DrawingObjectBaseClass.SHAPE;

    if (e.hookflags !== 0) {
      e.hookflags = ConstantData.HookFlags.SED_LC_Shape | ConstantData.HookFlags.SED_LC_AttachToLine;
    }

    if (e.targflags !== 0) {
      e.targflags = ConstantData.HookFlags.SED_LC_Shape | ConstantData.HookFlags.SED_LC_Line;
    }

    // var t =  ListManager.BaseDrawingObject.apply(this, [e]);
    super(e);

    // if (t) {
    this.ShapeType = e.ShapeType;
    this.shapeparam = e.shapeparam || 0;
    this.SVGDim = e.SVGDim || {};
    //   return t;
    // }
  }



  // ListManager.BaseShape = function (e) {
  //   (e = e || {
  //   }).DrawingObjectBaseClass = ConstantData.DrawingObjectBaseClass.SHAPE,
  //     0 !== e.hookflags &&
  //     (
  //       e.hookflags = ConstantData.HookFlags.SED_LC_Shape | ConstantData.HookFlags.SED_LC_AttachToLine
  //     ),
  //     0 !== e.targflags &&
  //     (
  //       e.targflags = ConstantData.HookFlags.SED_LC_Shape | ConstantData.HookFlags.SED_LC_Line
  //     );
  //   var t = ListManager.BaseDrawingObject.apply(this, [
  //     e
  //   ]);
  //   if (
  //     t.ShapeType = e.ShapeType,
  //     t.shapeparam = e.shapeparam ||
  //     0,
  //     t.SVGDim = e.SVGDim ||
  //     {
  //     },
  //     t
  //   ) return t
  // }

  // ListManager.BaseShape.prototype = new ListManager.BaseDrawingObject,
  //   ListManager.BaseShape.prototype.constructor = ListManager.BaseShape,

  CreateActionTriggers(e, t, a, r) {
    var i = [
      Element.CursorType.RESIZE_LT,
      Element.CursorType.RESIZE_T,
      Element.CursorType.RESIZE_RT,
      Element.CursorType.RESIZE_R,
      Element.CursorType.RESIZE_RB,
      Element.CursorType.RESIZE_B,
      Element.CursorType.RESIZE_LB,
      Element.CursorType.RESIZE_L
    ];
    if (T3Gv.optManager.Table_GetActiveID() === this.BlockID) return null;
    var n,
      o,
      s = e.CreateShape(ConstantData.CreateShapeType.GROUP),
      l = ConstantData.Defines.SED_KnobSize,
      S = ConstantData.Defines.SED_RKnobSize,
      c = (
        this.extraflags & ConstantData.ExtraFlags.SEDE_SideKnobs &&
        this.dataclass === ConstantData.SDRShapeTypes.SED_S_Poly
      ) > 0,
      u = ConstantData.Defines.MinSidePointLength,
      p = (ConstantData.HookPts, e.docInfo.docToScreenScale);
    e.docInfo.docScale <= 0.5 &&
      (p *= 2);
    var d = l / p,
      D = S / p,
      g = (e.docInfo.docScale, 'black'),
      h = this.Frame,
      m = h.width,
      C = h.height;
    m += d,
      C += d;
    var y = $.extend(!0, {
    }, h);
    y.x -= d / 2,
      y.y -= d / 2,
      y.width += d,
      y.height += d;
    var f = a.GetRotation() + 22.5;
    f >= 360 &&
      (f = 0);
    var L,
      I = Math.floor(f / 45),
      T = i.slice(I, i.length).concat(i.slice(0, I)),
      b = !0,
      M = !c,
      P = !c;
    switch (this.ObjGrow) {
      case ConstantData.GrowBehavior.HCONSTRAIN:
        b = !1,
          P = !1;
        break;
      case ConstantData.GrowBehavior.VCONSTRAIN:
        b = !1,
          M = !1;
        break;
      case ConstantData.GrowBehavior.PROPORTIONAL:
        b = !0,
          M = !1,
          P = !1
    }
    var R = {
      svgDoc: e,
      shapeType: ConstantData.CreateShapeType.RECT,
      x: 0,
      y: 0,
      knobSize: d,
      fillColor: g,
      fillOpacity: 1,
      strokeSize: 1,
      strokeColor: '#777777',
      locked: !1
    };
    if (
      t != r &&
      (
        R.fillColor = 'white',
        R.strokeSize = 1,
        R.strokeColor = 'black',
        R.fillOpacity = '0.0'
      ),
      this.flags & ConstantData.ObjFlags.SEDO_Lock ? (R.fillColor = 'gray', R.locked = !0, c = !1) : this.NoGrow() &&
        (
          R.fillColor = 'red',
          c = !1,
          R.strokeColor = 'red',
          T = [
            Element.CursorType.DEFAULT,
            Element.CursorType.DEFAULT,
            Element.CursorType.DEFAULT,
            Element.CursorType.DEFAULT,
            Element.CursorType.DEFAULT,
            Element.CursorType.DEFAULT,
            Element.CursorType.DEFAULT,
            Element.CursorType.DEFAULT
          ]
        ),
      b &&
      (
        R.knobID = ConstantData.ActionTriggerType.TOPLEFT,
        R.cursorType = T[0],
        L = this.GenericKnob(R),
        s.AddElement(L),
        R.x = m - d,
        R.y = 0,
        R.cursorType = T[2],
        R.knobID = ConstantData.ActionTriggerType.TOPRIGHT,
        L = this.GenericKnob(R),
        s.AddElement(L),
        R.x = m - d,
        R.y = C - d,
        R.cursorType = T[4],
        R.knobID = ConstantData.ActionTriggerType.BOTTOMRIGHT,
        L = this.GenericKnob(R),
        s.AddElement(L),
        R.x = 0,
        R.y = C - d,
        R.cursorType = T[6],
        R.knobID = ConstantData.ActionTriggerType.BOTTOMLEFT,
        L = this.GenericKnob(R),
        s.AddElement(L)
      ),
      P &&
      (
        R.x = m / 2 - d / 2,
        R.y = 0,
        R.cursorType = T[1],
        R.knobID = ConstantData.ActionTriggerType.TOPCENTER,
        L = this.GenericKnob(R),
        s.AddElement(L),
        R.x = m / 2 - d / 2,
        R.y = C - d,
        R.cursorType = T[5],
        R.knobID = ConstantData.ActionTriggerType.BOTTOMCENTER,
        L = this.GenericKnob(R),
        s.AddElement(L)
      ),
      M &&
      (
        R.x = 0,
        R.y = C / 2 - d / 2,
        R.cursorType = T[7],
        R.knobID = ConstantData.ActionTriggerType.CENTERLEFT,
        L = this.GenericKnob(R),
        s.AddElement(L),
        R.x = m - d,
        R.y = C / 2 - d / 2,
        R.cursorType = T[3],
        R.knobID = ConstantData.ActionTriggerType.CENTERRIGHT,
        L = this.GenericKnob(R),
        s.AddElement(L)
      ),
      (
        n = function (e) {
          var t,
            a = null;
          return e.hooks.length &&
            (
              (t = T3Gv.optManager.GetObjectPtr(e.hooks[0].objid, !1)) &&
              t.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ||
              t &&
              // t instanceof ListManager.ShapeContainer
              // t instanceof GlobalDataShape.ShapeContainer
              t instanceof Instance.Shape.ShapeContainer
            ) &&
            (a = t.Pr_GetShapeConnectorInfo(e.hooks[0])),
            a
        }(this)
      ) &&
      n.length
    ) {
      var A = {
        svgDoc: e,
        iconSize: 14,
        imageURL: null,
        iconID: 0,
        userData: 0,
        cursorType: 0
      };
      for (w = n.length, A.x = d + 1, A.y = d + 1, o = 0; o < w; o++) 'right' === n[o].position &&
        (A.x = m - 14 - 1 - d),
        'bottom' === n[o].position &&
        (A.y = C - 14 - 1 - d),
        A.cursorType = n[o].cursorType,
        A.iconID = n[o].knobID,
        'vertical' === n[o].polyType ? A.imageURL = ConstantData.Defines.Connector_Move_Vertical_Path : A.imageURL = ConstantData.Defines.Connector_Move_Horizontal_Path,
        A.userData = n[o].knobData,
        L = this.GenericIcon(A),
        s.AddElement(L),
        A.x += 16
    }
    if (c) {
      var _;
      (_ = Utils1.DeepCopy(this)).inside = $.extend(!0, {
      }, _.Frame);
      var E,
        w,
        F,
        v,
        G = T3Gv.optManager.ShapeToPolyLine(this.BlockID, !1, !0, _).GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, []);
      if (G) for (
        R.shapeType = ConstantData.CreateShapeType.OVAL,
        R.knobID = ConstantData.ActionTriggerType.MOVEPOLYSEG,
        R.fillColor = 'green',
        R.strokeColor = 'green',
        w = G.length,
        E = 1;
        E < w;
        E++
      ) F = G[E].x - G[E - 1].x,
        v = G[E].y - G[E - 1].y,
        Utils2.sqrt(F * F + v * v) > u &&
        (
          R.cursorType = F * F > v * v ? Element.CursorType.RESIZE_TB : Element.CursorType.RESIZE_LR,
          R.x = G[E - 1].x + F / 2,
          R.y = G[E - 1].y + v / 2,
          (L = this.GenericKnob(R)).SetUserData(E),
          s.AddElement(L)
        )
    }
    var N = h.width < 44,
      k = this.hooks.length > 0;
    if (k) {
      var U = T3Gv.optManager.GetObjectPtr(this.hooks[0].objid, !1);
      U &&
        U.DrawingObjectBaseClass !== ConstantData.DrawingObjectBaseClass.CONNECTOR &&
        (k = !1)
    }
    if (
      !(
        this.NoRotate() ||
        this.NoGrow() ||
        T3Gv.optManager.touchInitiated ||
        R.locked ||
        N ||
        k
      )
    ) {
      var J = this.TextGrow === ConstantData.TextGrowBehavior.HORIZONTAL &&
        this.flags & ConstantData.ObjFlags.SEDO_TextOnly &&
        SDF.TextAlignToWin(this.TextAlign).just === FileParser.TextJust.TA_LEFT;
      R.shapeType = ConstantData.CreateShapeType.OVAL,
        R.x = J ? m + D : m - 3 * D,
        R.y = C / 2 - D / 2,
        R.cursorType = Element.CursorType.ROTATE,
        R.knobID = ConstantData.ActionTriggerType.ROTATE,
        R.fillColor = 'white',
        R.fillOpacity = 0.001,
        R.strokeSize = 1.5,
        R.strokeColor = 'black',
        L = this.GenericKnob(R),
        s.AddElement(L)
    }
    if (
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff &&
      this.CanUseStandOffDimensionLines()
    ) {
      var x = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      this.CreateDimensionAdjustmentKnobs(s, x, R)
    }
    return s.SetSize(m, C),
      s.SetPos(y.x, y.y),
      s.isShape = !0,
      s.SetID(ConstantData.Defines.Action + t),
      s
  }

  CreateConnectHilites(e, t, a, r, i, n) {
    var o = e.CreateShape(ConstantData.CreateShapeType.GROUP),
      s = e.docInfo.docToScreenScale;
    e.docInfo.docScale <= 0.5 &&
      (s *= 2);
    var l,
      S,
      c = ConstantData.Defines.CONNECTPT_DIM / s,
      u = (e.docInfo.docScale, []);
    this.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
      this.ConnectPoints;
    if (
      S = this.flags & ConstantData.ObjFlags.SEDO_ContConn ||
      null != n
    ) u.push(a);
    else if (
      null == (
        u = this.GetTargetPoints(null, ConstantData.HookFlags.SED_LC_NoSnaps, null)
      )
    ) return;
    var p = this.GetPerimPts(t, u, null, !S, n, i),
      d = this.Frame,
      D = d.width,
      g = d.height,
      h = $.extend(!0, {
      }, d);
    h.x -= c / 2,
      h.y -= c / 2,
      h.width += c,
      h.height += c,
      D += c,
      g += c;
    var m = {
      svgDoc: e,
      shapeType: ConstantData.CreateShapeType.OVAL,
      x: 0,
      y: 0,
      knobSize: c,
      fillColor: 'black',
      fillOpacity: 1,
      strokeSize: 1,
      strokeColor: '#777777',
      KnobID: 0,
      cursorType: Element.CursorType.ANCHOR
    };
    if (S) h.x = p[0].x,
      h.y = p[0].y,
      h.x -= c,
      h.y -= c,
      m.x = c / 2,
      m.y = c / 2,
      l = this.GenericKnob(m),
      o.AddElement(l),
      o.SetSize(h.width, h.height),
      o.SetPos(h.x, h.y);
    else {
      for (var C = 0; C < p.length; C++) m.x = p[C].x - this.Frame.x,
        m.y = p[C].y - this.Frame.y,
        l = this.GenericKnob(m),
        o.AddElement(l);
      o.SetSize(D, g),
        o.SetPos(h.x, h.y)
    }
    return o.isShape = !0,
      o.SetEventBehavior(Element.EventBehavior.NONE),
      o.SetID('hilite_' + t),
      o
  }

  SetCursors() {
    var e,
      t,
      a = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID),
      r = (this.TextFlags & ConstantData.TextFlags.SED_TF_OneClick) > 0;
    switch (T3Gv.optManager.GetEditMode()) {
      case ConstantData.EditState.DEFAULT:
        var i = T3Gv.optManager.Table_GetActiveID(),
          n = this.GetTable(!1);
        n &&
          (r || this.BlockID === i) ? T3Gv.optManager.Table_SetCursors(a, this, n, !1) : (
          n &&
          T3Gv.optManager.Table_SetCursors(a, this, n, !0),
          // ListManager.BaseDrawingObject.prototype.SetCursors.call(this),
          // Double === TODO
          super.SetCursors(),
          r &&
          (
            (t = a.GetElementByID(ConstantData.SVGElementClass.SHAPE)) &&
            t.SetCursor(Element.CursorType.TEXT),
            e = a.GetElementByID(ConstantData.SVGElementClass.SLOP)
          )
        );
        break;
      case ConstantData.EditState.FORMATPAINT:
        (t = a.GetElementByID(ConstantData.SVGElementClass.SHAPE)) &&
          t.SetCursor(Element.CursorType.PAINT),
          (e = a.GetElementByID(ConstantData.SVGElementClass.SLOP)) &&
          e.SetCursor(Element.CursorType.PAINT);
        break;
      default:
        // ListManager.BaseDrawingObject.prototype.SetCursors.call(this)
        // Double === TODO
        super.SetCursors()
    }
  }

  GetTextObject(e, t) {
    var a,
      r = this.GetTable(!1),
      i = this.GetGraph(!1);
    if (r) r.select >= 0 ? (
      t ||
      T3Gv.optManager.Table_Release(!0),
      a = r.select,
      T3Gv.optManager.Table_AllowCellTextEdit(r, a) ||
      (
        a = T3Gv.optManager.Table_GetNextTextCell(r, a, Resources.Keys.Right_Arrow)
      ) < 0 &&
      (
        a = T3Gv.optManager.Table_GetNextTextCell(r, 0, Resources.Keys.Right_Arrow)
      ),
      a >= 0 &&
      (r.select = a, this.DataID = r.cells[r.select].DataID)
    ) : (
      e ? (a = T3Gv.optManager.Table_GetCellClicked(this, e)) >= 0 &&
        (
          T3Gv.optManager.Table_AllowCellTextEdit(r, a) ||
          (
            a = T3Gv.optManager.Table_GetNextTextCell(r, a, Resources.Keys.Right_Arrow)
          )
        ) : a = T3Gv.optManager.Table_GetFirstTextCell(r),
      a >= 0 &&
      (r.select = a, this.DataID = r.cells[r.select].DataID)
    ),
      this.DataID >= 0 &&
      null == T3Gv.optManager.GetObjectPtr(this.DataID, !1) &&
      (this.DataID = - 1, r.cells[r.select].DataID = - 1),
      (n = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID)) &&
      (
        n.textElem = n.GetElementByID(ConstantData.SVGElementClass.TEXT, this.DataID)
      );
    else if (i) {
      var n;
      this.DataID = i.selectedText,
        (n = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID)) &&
        (
          n.textElem = n.GetElementByID(ConstantData.SVGElementClass.TEXT, this.DataID)
        )
    } else this.DataID >= 0 &&
      null == T3Gv.optManager.GetObjectPtr(this.DataID, !1) &&
      (this.DataID = - 1);
    return this.DataID
  }

  UseTextBlockColor() {
    var e = this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA ||
      this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB,
      t = this.StyleRecord.Fill.Paint.FillType === ConstantData.FillTypes.SDFILL_TRANSPARENT,
      a = this.StyleRecord.Fill.Paint.FillType === ConstantData.FillTypes.SDFILL_SOLID &&
        this.StyleRecord.Text.Paint.Color.toUpperCase() === this.StyleRecord.Fill.Paint.Color.toUpperCase();
    return e ||
      t ||
      a
  }

  SetTextObject(e) {
    var t = this.GetTable(!0);
    t &&
      (t.select >= 0 && (t.cells[t.select].DataID = e));
    if (this.UseTextBlockColor()) {
      var a = Resources.FindStyle(ConstantData.Defines.TextBlockStyle);
      a &&
        (
          this.StyleRecord.Text.Paint = Utils1.DeepCopy(a.Text.Paint)
        )
    }
    return this.DataID = e,
      !0
  }

  GetTextParams(e) {
    var t = {},
      a = this.GetTable(!1),
      r = this.GetGraph(!1);
    return a &&
      a.select >= 0 ? t = T3Gv.optManager.Table_GetTRect(this, a, e) : r &&
        r.selectedText >= 0 ? t = T3Gv.optManager.Graph_GetTRect(this, r, e) : (
      t.trect = Utils1.DeepCopy(this.trect),
      t.sizedim = Utils1.DeepCopy(this.sizedim),
      t.tsizedim = {},
      t.tsizedim.height = this.sizedim.height - (this.Frame.height - this.trect.height),
      t.tsizedim.width = this.sizedim.width - (this.Frame.width - this.trect.width)
    ),
      t
  }

  GetTextDefault(e) {
    var t = this.GetTable(!1);
    return t ? T3Gv.optManager.Table_GetCellTextFormat(t, t.select, e) :
      //  ListManager.BaseDrawingObject.prototype.GetTextDefault.call(this, e)
      // Double === TODO
      super.GetTextDefault(e)
  }

  SetTableProperties(e, t) {
    if (this.GetTable(!1)) return T3Gv.optManager.Table_SetProperties(this, e, t, !0)
  }

  SetTextGrow(e) {
    if (this.GetTable(!1)) T3Gv.optManager.Table_ChangeTextAttributes(this, null, null, null, null, null, e, !1);
    else if (this.TextGrow = e, this.DataID >= 0) {
      var t = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      if (t) {
        var a = t.textElem;
        if (this.TextGrow === ConstantData.TextGrowBehavior.HORIZONTAL) a.SetConstraints(
          T3Gv.optManager.contentHeader.MaxWorkDim.x,
          this.trect.width,
          this.trect.height
        );
        else {
          var r = Utils1.DeepCopy(this),
            i = Utils1.DeepCopy(this.Frame);
          i.width = this.sizedim.width,
            r.UpdateFrame(i),
            a.SetConstraints(r.trect.width, r.trect.width, this.trect.height)
        }
      }
      T3Gv.optManager.TextResizeCommon(this.BlockID, !0)
    }
  }

  ChangeShape(e, t, a, r, i) {
    //debugger
    var n,
      o,
      s,
      l,
      S,
      c = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !1);
    if (this.SymbolURL && this.SymbolURL.length > 0) return !1;
    if (
      e != this.dataclass ||
      t === ConstantData.SDRShapeTypes.SED_S_Rect
    ) {
      var u = $.extend(!0, {
      }, this);
      if (i) {
        var p = u.Frame.x + u.Frame.width / 2,
          d = u.Frame.y + u.Frame.height / 2;
        u.Frame.width > u.Frame.height ? (u.Frame.x = p - u.Frame.height / 2, u.Frame.width = u.Frame.height) : (u.Frame.y = d - u.Frame.width / 2, u.Frame.height = u.Frame.width)
      }
      switch (t) {
        case ConstantData.SDRShapeTypes.SED_S_Rect:
        case ConstantData.SDRShapeTypes.SED_S_MeasureArea:
          n = new ListManager.Rect(u);
          break;
        case ConstantData.SDRShapeTypes.SED_S_RRect:
          u.shapeparam = c.def.rrectparam,
            (n = new ListManager.RRect(u)).moreflags = Utils2.SetFlag(n.moreflags, ConstantData.ObjMoreFlags.SED_MF_FixedRR, !0),
            r = c.def.rrectparam;
          break;
        case ConstantData.SDRShapeTypes.SED_S_Oval:
        case ConstantData.SDRShapeTypes.SED_S_Circ:
          n = new ListManager.Oval(u);
          break;
        case ConstantData.SDRShapeTypes.SED_S_Poly:
          var D = a(this.Frame, r);
          u.VertexArray = D,
            (n = new ListManager.Polygon(u)).NeedsSIndentCount = !0
      }
      if (
        o = T3Gv.objectStore.PreserveBlock(this.BlockID),
        n.dataclass = e,
        n.shapeparam = r,
        n.ResizeAspectConstrain = i,
        '' === n.ImageURL &&
        (
          n.extraflags = Utils2.SetFlag(
            n.extraflags,
            ConstantData.ExtraFlags.SEDE_FlipHoriz | ConstantData.ExtraFlags.SEDE_FlipVert,
            !1
          )
        ),
        n.ObjGrow = i ? ConstantData.GrowBehavior.PROPORTIONAL : ConstantData.GrowBehavior.ALL,
        n.BlockID = o.Data.BlockID,
        n.left_sindent = 0,
        n.top_sindent = 0,
        n.right_sindent = 0,
        n.bottom_sindent = 0,
        o.Data = n,
        n.moreflags = Utils2.SetFlag(n.moreflags, ConstantData.ObjMoreFlags.SED_MF_FixedRR, !1),
        s = n.GetTable(!0)
      ) {
        if (
          this.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
          (
            n.hookflags = Utils2.SetFlag(n.hookflags, ConstantData.HookFlags.SED_LC_TableRows, !0)
          ),
          n.UpdateFrame(n.Frame),
          l = Utils1.DeepCopy(n.trect),
          n.sizedim.width = n.Frame.width,
          n.sizedim.height = n.Frame.height,
          T3Gv.optManager.theActionTable = Utils1.DeepCopy(s),
          (
            S = T3Gv.optManager.Table_Resize(n, s, T3Gv.optManager.theActionTable, l.width, l.height)
          ).x > l.width + 0.1 ||
          S.y > l.height + 0.1
        ) {
          var g = n.sizedim.width / n.sizedim.height;
          l.width = S.x,
            l.height = S.y,
            n.TRectToFrame(l);
          var h = n.Frame.width / n.Frame.height;
          h > g ? (
            n.Frame.height = n.Frame.width / g,
            n.UpdateFrame(n.Frame),
            T3Gv.optManager.Table_Resize(n, s, T3Gv.optManager.theActionTable, n.trect.width, n.trect.height)
          ) : h < g &&
          (
            n.Frame.width = n.Frame.height * g,
            n.UpdateFrame(n.Frame),
            T3Gv.optManager.Table_Resize(n, s, T3Gv.optManager.theActionTable, n.trect.width, n.trect.height)
          )
        }
        T3Gv.optManager.theActionTable = null
      } else if (n.DataID >= 0) {
        n.UpdateFrame(n.Frame),
          n.sizedim.width = n.Frame.width,
          n.sizedim.height = n.Frame.height;
        var m = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
        if (m) var C = m.textElem;
        l = Utils1.DeepCopy(n.trect),
          C &&
            (S = C.CalcTextFit(l.width)).height > l.height ? (
            S = T3Gv.optManager.FitProp(n, C, S.height - l.height, - 1),
            n.Frame.width = S.x,
            n.Frame.height = S.y
          ) : n.TRectToFrame(l, !1)
      }
      return n.SetSize(n.Frame.width, n.Frame.height, 0),
        !0
    }
    return !1
  }

  SetShapeProperties(e) {
    var t = !1,
      a = 0,
      r = 0,
      i = !1,
      n = this.TextFlags,
      o = ConstantData.TextFlags;
    if (
      // ListManager.BaseDrawingObject.prototype.SetShapeProperties.call(this, e) &&
      // Double === TODO
      super.SetShapeProperties(e) &&
      (
        t = !0,
        (this.TextFlags & o.SED_TF_AttachA + o.SED_TF_AttachB) != (n & o.SED_TF_AttachA + o.SED_TF_AttachB) &&
        this.DataID >= 0
      )
    ) {
      if (i = !0, this.TextFlags & o.SED_TF_AttachA + o.SED_TF_AttachB) var s = Resources.FindStyle(ConstantData.Defines.TextBlockStyle);
      else s = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !1).def.style;
      var l = {
        StyleRecord: {
          Text: {
            Paint: {
              Color: s.Text.Paint.Color
            }
          }
        }
      },
        S = {
          Color: l.StyleRecord.Text.Paint.Color
        },
        c = {
          color: l.StyleRecord.Text.Paint.Color
        };
      this.ChangeTextAttributes(c, S)
    }
    var u = this.GetTable(!1);
    if (null != e.tmargin) if (u) t = T3Gv.optManager.Table_ChangeTextMargin(this, e.tmargin);
    else if (this.TMargins.left !== e.tmargin) {
      this.TMargins.left = e.tmargin,
        this.TMargins.right = e.tmargin,
        this.TMargins.top = e.tmargin,
        this.TMargins.bottom = e.tmargin,
        t = !0;
      var p = $.extend(!0, {
      }, this.Frame);
      this.UpdateFrame(p),
        this.trect.width < 0 &&
        (a = - this.trect.width),
        this.trect.height < 0 &&
        (r = - this.trect.height),
        (a || r) &&
        (
          Utils2.InflateRect(this.trect, a / 2, r / 2),
          this.TRectToFrame(this.trect, !0),
          T3Gv.optManager.AddToDirtyList(this.BlockID)
        ),
        this.DataID >= 0 &&
        (i = !0),
        t = !0
    }
    return null != e.SideConn &&
      this.ShapeType === ConstantData.ShapeType.POLYGON &&
      e.AdjSides !== (this.extraflags & ConstantData.ExtraFlags.SEDE_SideKnobs) > 0 &&
      (
        this.extraflags = Utils2.SetFlag(
          this.extraflags,
          ConstantData.ExtraFlags.SEDE_SideKnobs,
          e.SideConn
        ),
        T3Gv.optManager.AddToDirtyList(this.BlockID),
        t = !0
      ),
      null != e.Container &&
      e.Container !== (
        this.moreflags & ConstantData.ObjMoreFlags.SED_MF_Container
      ) > 0 &&
      (
        this.moreflags = Utils2.SetFlag(
          this.moreflags,
          ConstantData.ObjMoreFlags.SED_MF_Container,
          e.Container
        ),
        t = !0
      ),
      null != e.ObjGrow &&
      e.ObjGrow !== this.ObjGrow &&
      (
        this.ObjGrow = e.ObjGrow,
        T3Gv.optManager.AddToDirtyList(this.BlockID),
        t = !0,
        this.ResizeAspectConstrain = this.ObjGrow === ConstantData.GrowBehavior.PROPORTIONAL
      ),
      null != e.TextGrow &&
      e.TextGrow !== this.TextGrow &&
      (this.SetTextGrow(e.TextGrow), t = !0, i = !1),
      i &&
      (this.SetTextGrow(this.TextGrow), t = !0),
      t
  }

  ApplyStyle(e, t) {
    var a;
    ConstantData.ObjectTypes;
    this.IsSwimlane() ||
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER ||
      (
        e &&
        e.Line &&
        e.Border &&
        (
          a = Utils1.DeepCopy(e.Line),
          e.Line = Utils1.DeepCopy(e.Border)
        ),
        // ListManager.BaseDrawingObject.prototype.ApplyStyle.call(this, e, t),
        super.ApplyStyle(e, t),
        null != a &&
        (e.Line = Utils1.DeepCopy(a))
      )
  }

  SetObjectStyle(e) {
    var t;
    e.StyleRecord &&
      e.StyleRecord.Line &&
      e.StyleRecord.Border &&
      (
        t = Utils1.DeepCopy(e.StyleRecord.Line),
        e.StyleRecord.Line = Utils1.DeepCopy(e.StyleRecord.Border)
      );
    // var a = ListManager.BaseDrawingObject.prototype.SetObjectStyle.call(this, e);
    var a = super.SetObjectStyle(e);
    return a.StyleRecord &&
      a.StyleRecord.Line &&
      a.StyleRecord.Line.Thickness &&
      this.SetSize(
        this.Frame.width,
        this.Frame.height,
        ConstantData.ActionTriggerType.LINE_THICKNESS
      ),
      null != t &&
      (e.StyleRecord.Line = Utils1.DeepCopy(t)),
      a.StyleRecord &&
      a.StyleRecord.Fill &&
      a.StyleRecord.Fill.FillType &&
      (
        T3Gv.optManager.ClearImage(this.BlockID, !1, !0),
        this.flags & ConstantData.ObjFlags.SEDO_TextOnly &&
        this.StyleRecord.Fill.Paint.FillType !== ConstantData.FillTypes.SDFILL_TRANSPARENT &&
        (
          this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_TextOnly, !1)
        )
      ),
      a
  }

  SetShapeConnectionPoints(e, t, a) {
    var r = !1;
    switch (
    this.attachpoint.x == a.x &&
    this.attachpoint.y == a.y ||
    (this.attachpoint.x = a.x, this.attachpoint.y = a.y, r = !0),
    e
    ) {
      case ConstantData.ObjFlags.SEDO_ContConn:
        0 == (this.flags & e) &&
          (
            this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_UseConnect, !1),
            this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_ContConn, !0),
            r = !0
          );
        break;
      case ConstantData.ObjFlags.SEDO_UseConnect:
        this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_ContConn, !1),
          this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_UseConnect, !0),
          this.ConnectPoints = Utils1.DeepCopy(t),
          r = !0;
        break;
      default:
        (
          this.flags & ConstantData.ObjFlags.SEDO_ContConn ||
          this.flags & ConstantData.ObjFlags.SEDO_UseConnect
        ) &&
          (
            this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_UseConnect, !1),
            this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_ContConn, !1),
            r = !0
          )
    }
    return r
  }

  GetClosestConnectPoint(e) {
    var t = this.GetTable(!1),
      a = this.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
        t,
      r = this.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        this.ConnectPoints,
      i = [],
      n = ConstantData.Defines.SED_CDim;
    if (r) {
      var o = {
        x: 0,
        y: 0,
        width: n,
        height: n
      };
      if (
        i = Utils1.DeepCopy(this.ConnectPoints),
        T3Gv.optManager.FlipPoints(o, this.extraflags, i),
        0 !== this.RotationAngle
      ) {
        var s = - this.RotationAngle / (180 / ConstantData.Geometry.PI);
        Utils3.RotatePointsAboutCenter(o, s, i)
      }
    } else if (a) {
      if (i = T3Gv.optManager.Table_GetRowConnectPoints(this, t), e.x < 10) return e.x = i[2].x,
        e.y = i[2].y,
        !0;
      if (e.x > n - 10) return e.x = i[2 + t.rows.length].x,
        e.y = i[2 + t.rows.length].y,
        !0
    }
    if (r || a) {
      var l,
        S,
        c,
        u,
        p,
        d,
        D;
      for (l = i.length, S = 0; S < l; S++) d = i[S],
        p = (c = e.x - d.x) * c + (u = e.y - d.y) * u,
        (void 0 === D || p < D) &&
        (D = p, bestconnect = i[S]);
      return e.x = bestconnect.x,
        e.y = bestconnect.y,
        !0
    }
    return !1
  }

  GetPolyList() {
    var e,
      t,
      a,
      r,
      i,
      n = ConstantData.SDRShapeTypes,
      o = new PolyList(),
      s = ConstantData.LineType;
    switch (this.dataclass) {
      case n.SED_S_Rect:
        e = new PolySeg(s.LINE, 0, 0),
          o.segs.push(e),
          e = new PolySeg(s.LINE, this.inside.width, 0),
          o.segs.push(e),
          e = new PolySeg(s.LINE, this.inside.width, this.inside.height),
          o.segs.push(e),
          e = new PolySeg(s.LINE, 0, this.inside.height),
          o.segs.push(e),
          e = new PolySeg(s.LINE, 0, 0),
          o.segs.push(e);
        break;
      case n.SED_S_RRect:
        t = this.Frame.width,
          this.Frame.height < t &&
          (t = this.Frame.height),
          a = this.GetCornerSize(),
          e = new PolySeg(s.LINE, 0, 0),
          o.segs.push(e),
          e = new PolySeg(s.LINE, this.inside.width - 2 * a, 0),
          o.segs.push(e),
          (
            e = new PolySeg(s.ARCSEGLINE, this.inside.width - a, a)
          ).ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          e.param = Math.PI / 2,
          o.segs.push(e),
          e = new PolySeg(s.LINE, this.inside.width - a, this.inside.height - a),
          o.segs.push(e),
          e = new PolySeg(s.ARCSEGLINE, this.inside.width - 2 * a, this.inside.height),
          o.segs.push(e),
          e.ShortRef = ConstantData.ArcQuad.SD_PLA_BR,
          e = new PolySeg(s.LINE, 0, this.inside.height),
          o.segs.push(e),
          (
            e = new PolySeg(s.ARCSEGLINE, - a, this.inside.height - a)
          ).ShortRef = ConstantData.ArcQuad.SD_PLA_BL,
          e.param = Math.PI / 2,
          o.segs.push(e),
          e = new PolySeg(s.LINE, - a, a),
          o.segs.push(e),
          (e = new PolySeg(s.ARCSEGLINE, 0, 0)).ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          o.segs.push(e),
          o.offset.x = a,
          o.offset.y = 0;
        break;
      case n.SED_S_Oval:
      case n.SED_S_Circ:
        e = new PolySeg(s.LINE, 0, 0),
          o.segs.push(e),
          e = new PolySeg(s.ARCSEGLINE, this.inside.width / 2, this.inside.height / 2),
          o.segs.push(e),
          e.ShortRef = ConstantData.ArcQuad.SD_PLA_BR,
          e.param = - Math.PI / 2,
          (
            e = new PolySeg(s.ARCSEGLINE, 0, this.inside.height)
          ).ShortRef = ConstantData.ArcQuad.SD_PLA_BL,
          o.segs.push(e),
          e = new PolySeg(s.ARCSEGLINE, - this.inside.width / 2, this.inside.height / 2),
          o.segs.push(e),
          e.ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          e.param = - Math.PI / 2,
          e = new PolySeg(s.ARCSEGLINE, 0, 0),
          o.segs.push(e),
          e.ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          o.offset.x = this.inside.width / 2,
          o.offset.y = 0;
        break;
      case n.SED_S_Doc:
        a = this.shapeparam,
          e = new PolySeg(s.LINE, 0, 0),
          o.segs.push(e),
          e = new PolySeg(s.LINE, this.inside.width, 0),
          o.segs.push(e),
          e = new PolySeg(s.LINE, this.inside.width, this.inside.height - a),
          o.segs.push(e),
          (
            e = new PolySeg(s.ARCLINE, this.inside.width / 2, this.inside.height - a)
          ).param = a,
          o.segs.push(e),
          (
            e = new PolySeg(s.ARCLINE, 0, this.inside.height - a)
          ).param = - a,
          o.segs.push(e),
          e = new PolySeg(s.LINE, 0, 0),
          o.segs.push(e);
        break;
      case n.SED_S_Term:
        this.inside.width > this.inside.height ? (
          a = this.inside.height / 2,
          e = new PolySeg(s.LINE, 0, 0),
          o.segs.push(e),
          e = new PolySeg(s.LINE, this.inside.width - 2 * a, 0),
          o.segs.push(e),
          (
            e = new PolySeg(s.ARCSEGLINE, this.inside.width - a, a)
          ).ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          e.param = Math.PI / 2,
          o.segs.push(e),
          e = new PolySeg(s.ARCSEGLINE, this.inside.width - 2 * a, this.inside.height),
          o.segs.push(e),
          e.ShortRef = ConstantData.ArcQuad.SD_PLA_BR,
          e = new PolySeg(s.LINE, 0, this.inside.height),
          o.segs.push(e),
          (
            e = new PolySeg(s.ARCSEGLINE, - a, this.inside.height - a)
          ).ShortRef = ConstantData.ArcQuad.SD_PLA_BL,
          e.param = Math.PI / 2,
          o.segs.push(e),
          (e = new PolySeg(s.ARCSEGLINE, 0, 0)).ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          o.segs.push(e)
        ) : (
          a = this.inside.width / 2,
          e = new PolySeg(s.LINE, 0, 0),
          o.segs.push(e),
          (
            e = new PolySeg(s.ARCSEGLINE, this.inside.width - a, a)
          ).ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          e.param = Math.PI / 2,
          o.segs.push(e),
          e = new PolySeg(s.LINE, this.inside.width - a, this.inside.height - a),
          o.segs.push(e),
          e = new PolySeg(s.ARCSEGLINE, this.inside.width - 2 * a, this.inside.height),
          o.segs.push(e),
          e.ShortRef = ConstantData.ArcQuad.SD_PLA_BR,
          (
            e = new PolySeg(s.ARCSEGLINE, - a, this.inside.height - a)
          ).ShortRef = ConstantData.ArcQuad.SD_PLA_BL,
          e.param = Math.PI / 2,
          o.segs.push(e),
          e = new PolySeg(s.LINE, - a, a),
          o.segs.push(e),
          e = new PolySeg(s.ARCSEGLINE, 0, 0),
          o.segs.push(e),
          e.ShortRef = ConstantData.ArcQuad.SD_PLA_TL
        ),
          o.offset.x = a,
          o.offset.y = 0;
        break;
      case n.SED_S_Store:
        a = this.shapeparam,
          e = new PolySeg(s.LINE, 0, 0),
          o.segs.push(e),
          e = new PolySeg(s.LINE, this.inside.width - a, 0),
          o.segs.push(e),
          (
            e = new PolySeg(s.ARCSEGLINE, this.inside.width - 2 * a, this.inside.height / 2)
          ).ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          e.param = - Math.PI / 2,
          o.segs.push(e),
          e = new PolySeg(s.ARCSEGLINE, this.inside.width - a, this.inside.height),
          o.segs.push(e),
          e.ShortRef = ConstantData.ArcQuad.SD_PLA_BL,
          e = new PolySeg(s.LINE, 0, this.inside.height),
          o.segs.push(e),
          (
            e = new PolySeg(s.ARCSEGLINE, - a, this.inside.height / 2)
          ).ShortRef = ConstantData.ArcQuad.SD_PLA_BL,
          e.param = Math.PI / 2,
          o.segs.push(e),
          (e = new PolySeg(s.ARCSEGLINE, 0, 0)).ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          o.segs.push(e),
          o.offset.x = a,
          o.offset.y = 0;
        break;
      case n.SED_S_Delay:
        a = this.shapeparam,
          e = new PolySeg(s.LINE, 0, 0),
          o.segs.push(e),
          e = new PolySeg(s.LINE, this.inside.width - a, 0),
          o.segs.push(e),
          (
            e = new PolySeg(s.ARCSEGLINE, this.inside.width, this.inside.height / 2)
          ).ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          e.param = Math.PI / 2,
          o.segs.push(e),
          e = new PolySeg(s.ARCSEGLINE, this.inside.width - a, this.inside.height),
          o.segs.push(e),
          e.ShortRef = ConstantData.ArcQuad.SD_PLA_BR,
          e = new PolySeg(s.LINE, 0, this.inside.height),
          o.segs.push(e),
          e = new PolySeg(s.LINE, 0, 0),
          o.offset.x = 0,
          o.offset.y = 0;
        break;
      case n.SED_S_Disp:
        a = this.shapeparam,
          e = new PolySeg(s.LINE, 0, 0),
          o.segs.push(e),
          e = new PolySeg(s.LINE, this.inside.width - 2 * a, 0),
          o.segs.push(e),
          (
            e = new PolySeg(s.ARCSEGLINE, this.inside.width - a, this.inside.height / 2)
          ).ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          e.param = Math.PI / 2,
          o.segs.push(e),
          e = new PolySeg(s.ARCSEGLINE, this.inside.width - 2 * a, this.inside.height),
          o.segs.push(e),
          e.ShortRef = ConstantData.ArcQuad.SD_PLA_BR,
          e = new PolySeg(s.LINE, 0, this.inside.height),
          o.segs.push(e),
          e = new PolySeg(s.LINE, - a, this.inside.height / 2),
          o.segs.push(e),
          e = new PolySeg(s.LINE, 0, 0),
          o.offset.x = a,
          o.offset.y = 0;
        break;
      default:
        var l = this.Frame;
        this.Frame = this.inside;
        var S = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null);
        for (
          this.Frame = l,
          i = S.length,
          o.offset.x = S[0].x,
          o.offset.y = S[0].y,
          r = 0;
          r < i;
          r++
        ) e = new PolySeg(s.LINE, S[r].x - o.offset.x, S[r].y - o.offset.y),
          o.segs.push(e)
    }
    return o.closed = !0,
      o.dim.x = this.inside.width,
      o.dim.y = this.inside.height,
      o.wasline = !1,
      o
  }

  GetListOfEnclosedObjects(e) {
    var t,
      a = [],
      r = ConstantData.ObjMoreFlags.SED_MF_Container;
    if (this.moreflags & r) {
      if (this.IsSwimlane()) return null == (a = this.FramezList) &&
        (a = []),
        a;
      var i,
        n,
        o,
        s,
        l,
        S,
        c,
        u = T3Gv.optManager.VisibleZList(),
        p = {};
      n = u.length,
        c = this.trect;
      var d = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null);
      if (0 !== this.RotationAngle) {
        var D = - this.RotationAngle / (180 / ConstantData.Geometry.PI);
        Utils3.RotatePointsAboutCenter(this.Frame, D, d)
      }
      var g = this.StyleRecord.Fill.Paint.FillType === ConstantData.FillTypes.SDFILL_TRANSPARENT;
      if (g = !1) {
        var h = this.GetTable(!1);
        if (h) {
          var m,
            C,
            y = h.cells.length,
            f = - 1;
          for (i = 0; i < y; i++) if (
            (m = h.cells[i]).fill.Paint.FillType === ConstantData.FillTypes.SDFILL_TRANSPARENT
          ) - 1 === f &&
            (f = i);
          else if (f >= 0) {
            f = - 2;
            break
          }
          if (f >= 0) {
            if (
              C = {
                x: (m = h.cells[f]).frame.x,
                y: m.frame.y,
                width: h.wd - m.frame.x,
                height: h.ht - m.frame.y
              },
              Utils2.OffsetRect(C, this.trect.x, this.trect.y),
              c = C,
              0 !== this.RotationAngle
            ) {
              var L = $.extend(!0, {
              }, this.Frame);
              this.Frame = C,
                d = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
                this.Frame = L,
                Utils3.RotatePointsAboutCenter(this.Frame, D, d)
            }
          } else g = !1
        }
      }
      var I = 0;
      if (!g) for (i = 0; i < n; i++) if (u[i] === this.BlockID) {
        I = i + 1;
        break
      }
      var T,
        b,
        M,
        P = [];
      for (i = I; i < n; i++) (s = u[i]) !== this.BlockID &&
        (
          0 !== (o = T3Gv.optManager.GetObjectPtr(s, !1)).RotationAngle ? (
            l = o.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
            S = - o.RotationAngle / (180 / ConstantData.Geometry.PI),
            Utils3.RotatePointsAboutCenter(o.Frame, S, l),
            Utils2.GetPolyRect(p, l)
          ) : p = $.extend(!0, {
          }, o.Frame),
          (
            0 !== this.RotationAngle ? 0 != o.RotationAngle ? Utils2.IsAllPolyPointsInPoly(d, l) : Utils2.IsAllFrameCornersInPoly(d, p) : 0 != o.RotationAngle ? Utils2.IsAllPolyPointsInPoly(d, l) : Utils2.RectInsideRect(c, p)
          ) &&
          (
            a.push(s),
            2 === o.hooks.length &&
            P.push(s),
            o.moreflags & r &&
            e &&
            (t = o.GetListOfEnclosedObjects(!0)).length &&
            a.concat(t)
          )
        );
      for (n = P.length, i = 0; i < n; i++) T = (o = T3Gv.optManager.GetObjectPtr(P[i], !1)).hooks[0].objid,
        b = o.hooks[1].objid,
        (a.indexOf(T) < 0 || a.indexOf(b) < 0) &&
        (M = a.indexOf(P[i])) >= 0 &&
        a.splice(M, 1)
    }
    return a
  }

  InsertNewTable(e, t, a) {
    return this.GetTable(!1) ? T3Gv.optManager.Table_SetProperties(this, e, t) : null == this.ImageURL ||
      '' === this.ImageURL ? (
      T3Gv.optManager.Table_Create(this.BlockID, e, t, this.TextGrow, a),
      !0
    ) : void 0
  }

  PinProportional(e) {
    var t,
      a,
      r = {},
      i = {},
      n = ConstantData.Defines.SED_KnobSize;
    if (0 !== this.RotationAngle) {
      var o = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !0, null),
        s = - this.RotationAngle / (180 / ConstantData.Geometry.PI);
      Utils3.RotatePointsAboutCenter(this.Frame, s, o),
        Utils2.GetPolyRect(i, o)
    } else i = this.Frame;
    r.left = i.x - this.r.x + n / 2,
      r.top = i.y - this.r.y + n / 2,
      r.right = this.r.x + this.r.width - (i.x + i.width),
      r.bottom = this.r.y + this.r.height - (i.y + i.height),
      e.y < r.top &&
      (
        t = (a = r.top - e.y) * (
          T3Gv.optManager.actionAspectRatioWidth / T3Gv.optManager.actionAspectRatioHeight
        ),
        e.height -= a,
        e.width -= t,
        e.y = r.left
      ),
      e.x < r.left &&
      (
        a = (t = r.left - e.x) * (
          T3Gv.optManager.actionAspectRatioHeight / T3Gv.optManager.actionAspectRatioWidth
        ),
        e.height -= a,
        e.width -= t,
        e.x = r.left
      )
  }

  HandleActionTriggerTrackCommon(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      //Double ====
      enhance,
      u = T3Gv.optManager.actionStartX,
      p = T3Gv.optManager.actionStartY,
      d = e - u,
      D = t - p,
      g = {
        x: e,
        y: t
      },
      h = {},
      m = - 1,
      C = this.GetTable(!1),
      y = this,
      f = T3Gv.optManager.OverrideSnaps(a),
      L = $.extend(!0, {
      }, T3Gv.optManager.actionBBox),
      I = $.extend(!0, {
      }, T3Gv.optManager.actionBBox),
      T = function (e) {
        var t;
        if (y.RotationAngle) {
          var a = Utils2.PolyFromRect(e),
            r = - y.RotationAngle / (180 / ConstantData.Geometry.PI);
          t = $.extend(!0, {
          }, e),
            Utils3.RotatePointsAboutCenter(y.Frame, r, a),
            Utils2.GetPolyRect(t, a)
        } else t = e;
        if (Math.floor(t.x) < 0) return !0;
        if (Math.floor(t.y) < 0) return !0;
        if (
          T3Gv.optManager.contentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto
        ) {
          var i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !1);
          if (t.x + t.width > i.dim.x) return !0;
          if (t.y + t.height > i.dim.y) return !0
        }
        return !1
      };
    switch (T3Gv.optManager.actionTriggerId) {
      case ConstantData.ActionTriggerType.TOPLEFT:
        if (
          S = I.x - e,
          c = I.y - t,
          I.x = e,
          I.y = t,
          I.width += S,
          I.height += c,
          T3Gv.docHandler.documentConfig.enableSnap,
          T3Gv.optManager.actionLockAspectRatio ? (
            I.width < 0 &&
            (
              I.x = T3Gv.optManager.actionBBox.x + T3Gv.optManager.actionBBox.width,
              I.width = - I.width
            ),
            r = I.width * T3Gv.optManager.actionAspectRatioHeight / T3Gv.optManager.actionAspectRatioWidth,
            I.height < 0 ? (
              I.y = T3Gv.optManager.actionBBox.y + T3Gv.optManager.actionBBox.height,
              I.height = r
            ) : (
              I.y = T3Gv.optManager.actionBBox.y + T3Gv.optManager.actionBBox.height - r,
              I.height = r
            ),
            this.PinProportional(I)
          ) : (
            I.width < 0 &&
            (
              I.x = T3Gv.optManager.actionBBox.x + T3Gv.optManager.actionBBox.width,
              I.width = - I.width
            ),
            I.height < 0 &&
            (
              I.y = T3Gv.optManager.actionBBox.y + T3Gv.optManager.actionBBox.height,
              I.height = - I.height
            )
          ),
          T(I)
        ) break;
        T3Gv.optManager.actionNewBBox = $.extend(!0, {
        }, I),
          this.HandleActionTriggerCallResize(T3Gv.optManager.actionNewBBox, !0, g);
        break;
      case ConstantData.ActionTriggerType.TOPCENTER:
        if (
          c = I.y - t,
          I.y = t,
          I.height = I.height + c,
          T3Gv.docHandler.documentConfig.enableSnap,
          T3Gv.optManager.actionLockAspectRatio ? (
            I.height < 0 &&
            (
              I.y = T3Gv.optManager.actionBBox.y + T3Gv.optManager.actionBBox.height,
              I.height = - I.height
            ),
            i = I.height * T3Gv.optManager.actionAspectRatioWidth / T3Gv.optManager.actionAspectRatioHeight,
            I.x = T3Gv.optManager.actionBBox.x + T3Gv.optManager.actionBBox.width / 2 - i / 2,
            I.width = i,
            this.PinProportional(I)
          ) : I.height < 0 &&
          (
            I.y = T3Gv.optManager.actionBBox.y + T3Gv.optManager.actionBBox.height,
            I.height = - I.height
          ),
          T(I)
        ) break;
        T3Gv.optManager.actionNewBBox = $.extend(!0, {
        }, I),
          this.HandleActionTriggerCallResize(T3Gv.optManager.actionNewBBox, !0, g);
        break;
      case ConstantData.ActionTriggerType.TOPRIGHT:
        if (
          c = I.y - t,
          I.y = t,
          I.height = I.height + c,
          I.width = e - I.x,
          T3Gv.docHandler.documentConfig.enableSnap,
          T3Gv.optManager.actionLockAspectRatio ? (
            I.width < 0 &&
            (I.x = e, I.width = - I.width),
            r = I.width * T3Gv.optManager.actionAspectRatioHeight / T3Gv.optManager.actionAspectRatioWidth,
            I.height < 0 ? (
              I.y = T3Gv.optManager.actionBBox.y + T3Gv.optManager.actionBBox.height,
              I.height = r
            ) : (
              I.y = T3Gv.optManager.actionBBox.y + T3Gv.optManager.actionBBox.height - r,
              I.height = r
            ),
            I.height = r,
            this.PinProportional(I)
          ) : (
            I.width < 0 &&
            (I.x = e, I.width = - I.width),
            I.height < 0 &&
            (
              I.y = T3Gv.optManager.actionBBox.y + T3Gv.optManager.actionBBox.height,
              I.height = - I.height
            )
          ),
          T(I)
        ) break;
        T3Gv.optManager.actionNewBBox = $.extend(!0, {
        }, I),
          this.HandleActionTriggerCallResize(T3Gv.optManager.actionNewBBox, !0, g);
        break;
      case ConstantData.ActionTriggerType.CENTERRIGHT:
        if (
          I.width = e - I.x,
          T3Gv.docHandler.documentConfig.enableSnap,
          T3Gv.optManager.actionLockAspectRatio ? (
            I.width < 0 &&
            (I.x = e, I.width = - I.width),
            r = I.width * T3Gv.optManager.actionAspectRatioHeight / T3Gv.optManager.actionAspectRatioWidth,
            I.y = T3Gv.optManager.actionBBox.y + T3Gv.optManager.actionBBox.height / 2 - r / 2,
            I.height = r,
            this.PinProportional(I)
          ) : I.width < 0 &&
          (I.x = e, I.width = - I.width),
          T(I)
        ) break;
        T3Gv.optManager.actionNewBBox = $.extend(!0, {
        }, I),
          this.HandleActionTriggerCallResize(T3Gv.optManager.actionNewBBox, !0, g);
        break;
      case ConstantData.ActionTriggerType.BOTTOMRIGHT:
        if (
          I.width = e - I.x,
          I.height = t - I.y,
          T3Gv.docHandler.documentConfig.enableSnap,
          T3Gv.optManager.actionLockAspectRatio ? (
            I.width < 0 &&
            (I.x = e, I.width = - I.width),
            r = I.width * T3Gv.optManager.actionAspectRatioHeight / T3Gv.optManager.actionAspectRatioWidth,
            I.height < 0 &&
            (I.y = L.y - r),
            I.height = r,
            this.PinProportional(I)
          ) : (
            I.width < 0 &&
            (I.x = e, I.width = - I.width),
            I.height < 0 &&
            (I.y = t, I.height = - I.height)
          ),
          T(I)
        ) break;
        T3Gv.optManager.actionNewBBox = $.extend(!0, {
        }, I),
          this.HandleActionTriggerCallResize(T3Gv.optManager.actionNewBBox, !0, g);
        break;
      case ConstantData.ActionTriggerType.BOTTOMCENTER:
        if (
          I.height = t - I.y,
          T3Gv.docHandler.documentConfig.enableSnap,
          T3Gv.optManager.actionLockAspectRatio ? (
            I.height < 0 &&
            (I.y = t, I.height = - I.height),
            i = I.height * T3Gv.optManager.actionAspectRatioWidth / T3Gv.optManager.actionAspectRatioHeight,
            I.x = T3Gv.optManager.actionBBox.x + T3Gv.optManager.actionBBox.width / 2 - i / 2,
            I.width = i,
            this.PinProportional(I)
          ) : I.height < 0 &&
          (I.y = t, I.height = - I.height),
          T(I)
        ) break;
        T3Gv.optManager.actionNewBBox = $.extend(!0, {
        }, I),
          this.HandleActionTriggerCallResize(T3Gv.optManager.actionNewBBox, !0, g);
        break;
      case ConstantData.ActionTriggerType.TABLE_SELECT:
      case ConstantData.ActionTriggerType.TABLE_ROWSELECT:
      case ConstantData.ActionTriggerType.TABLE_COLSELECT:
        if (null == C) break;
        C = this.GetTable(!0),
          C = this.GetTable(!0),
          g.x = e - this.trect.x,
          g.y = t - this.trect.y,
          T3Gv.optManager.Table_Select(this, C, g, !0, T3Gv.optManager.actionTriggerId, !1);
        break;
      case ConstantData.ActionTriggerType.MOVEPOLYSEG:
        g.x = e,
          g.y = t,
          R = T3Gv.optManager.GetObjectPtr(this.BlockID, !1);
        var b = $.extend(!0, {
        }, R.Frame);
        T3Gv.docHandler.documentConfig.enableSnap &&
          !f &&
          (g = T3Gv.docHandler.SnapToGrid(g)),
          T3Gv.optManager.ShapeToPolyLine(this.BlockID, !0, !0),
          (R = T3Gv.optManager.GetObjectPtr(this.BlockID, !1)).MovePolySeg(
            T3Gv.optManager.actionSvgObject,
            g.x,
            g.y,
            T3Gv.optManager.actionTriggerId,
            T3Gv.optManager.actionTriggerData
          ),
          T3Gv.optManager.PolyLineToShape(R.BlockID, !0);
        if (
          s = (R = T3Gv.optManager.GetObjectPtr(this.BlockID, !1)).trect,
          l = this.TextGrow === ConstantData.TextGrowBehavior.HORIZONTAL ? T3Gv.optManager.contentHeader.MaxWorkDim.x : s.width,
          T3Gv.optManager.actionSvgObject &&
          T3Gv.optManager.actionSvgObject.textElem
        ) {
          var M = T3Gv.optManager.actionSvgObject.textElem;
          theMinDim = M.CalcTextFit(l);
          var P = theMinDim.width;
          if (theMinDim.height > s.height || P > s.width) {
            T3Gv.optManager.ShapeToPolyLine(this.BlockID, !0, !0);
            var R = T3Gv.optManager.GetObjectPtr(this.BlockID, !1);
            g.x = T3Gv.optManager.actionTableLastX,
              g.y = T3Gv.optManager.actionTableLastY,
              R.MovePolySeg(
                T3Gv.optManager.actionSvgObject,
                g.x,
                g.y,
                T3Gv.optManager.actionTriggerId,
                T3Gv.optManager.actionTriggerData
              ),
              T3Gv.optManager.PolyLineToShape(this.BlockID, !0),
              R = T3Gv.optManager.GetObjectPtr(this.BlockID, !1)
          }
        }
        if (
          T3Gv.optManager.actionNewBBox = $.extend(!0, {
          }, R.Frame),
          R.HandleActionTriggerCallResize(
            T3Gv.optManager.actionNewBBox,
            ConstantData.ActionTriggerType.MOVEPOLYSEG,
            g
          ),
          T3Gv.optManager.actionTableLastX = g.x,
          T3Gv.optManager.actionTableLastY = g.y,
          R.RotationAngle
        ) {
          var A = T3Gv.optManager.actionSvgObject.GetRotation(),
            _ = $.extend(!0, {
            }, R.Frame),
            E = (
              h = T3Gv.optManager.svgDoc.CalculateRotatedOffsetForResize(b, _, A),
              T3Gv.optManager.actionSvgObject.GetPos()
            );
          E.x += h.x,
            E.y += h.y,
            T3Gv.optManager.actionSvgObject.SetPos(E.x, E.y),
            T3Gv.optManager.actionBBox.x += h.x,
            T3Gv.optManager.actionBBox.y += h.y,
            T3Gv.optManager.actionStartX += h.x,
            T3Gv.optManager.actionStartY += h.y,
            R.Frame.x += h.x,
            R.Frame.y += h.y
        }
        break;
      case ConstantData.ActionTriggerType.TABLE_COL:
        if (null == C) break;
        C = this.GetTable(!0),
          g.x = e,
          g.y = t,
          T3Gv.docHandler.documentConfig.enableSnap &&
          !f &&
          (g = T3Gv.docHandler.SnapToGrid(g)),
          d = g.x - u;
        var w = T3Gv.optManager.Table_GetColumnAndSegment(T3Gv.optManager.actionTriggerData);
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_COLS &&
          this.RotationAngle &&
          (d = - d, w.column++),
          n = T3Gv.optManager.Table_GrowColumn(this, C, w.column, d, this.TextGrow, !1, !1, !1, this.IsSwimlane());
        $.extend(!0, {
        }, this.trect);
        var F = {
          column: w.column,
          theDeltaX: d
        };
        Collab.SendSVGEvent(
          this.BlockID,
          ConstantData.CollabSVGEventTypes.Table_GrowColumn,
          null,
          F
        ),
          (o = Utils1.DeepCopy(this)).trect.width = n.x,
          o.trect.height = n.y,
          o.TRectToFrame(o.trect, !0),
          n.x = o.Frame.width,
          n.y = o.Frame.height;
        var v = I.width;
        if (
          I.width = n.x,
          I.height = n.y,
          this.objecttype === ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_COLS &&
          this.RotationAngle &&
          (I.x -= I.width - v),
          T3Gv.optManager.actionLockAspectRatio ? (
            I.width < 0 &&
            (I.x = e, I.width = - I.width),
            r = I.width * T3Gv.optManager.actionAspectRatioHeight / T3Gv.optManager.actionAspectRatioWidth,
            I.y = T3Gv.optManager.actionBBox.y + T3Gv.optManager.actionBBox.height / 2 - r / 2,
            I.height = r,
            this.PinProportional(I),
            m = ConstantData.ActionTriggerType.TABLE_COL
          ) : I.width < 0 &&
          (I.x = e, I.width = - I.width),
          T(I)
        ) {
          d = T3Gv.optManager.actionTableLastX - u,
            T3Gv.optManager.Table_GrowColumn(this, C, w.column, d, this.TextGrow, !1, !0, !1);
          break
        }
        T3Gv.optManager.actionNewBBox = $.extend(!0, {
        }, I),
          T3Gv.optManager.actionTableLastX = e,
          T3Gv.optManager.actionTableLastY = t,
          this.HandleActionTriggerCallResize(T3Gv.optManager.actionNewBBox, m, g);
        break;
      case ConstantData.ActionTriggerType.TABLE_ROW:
        if (null == C) break;
        C = this.GetTable(!0),
          g.x = e,
          g.y = t,
          T3Gv.docHandler.documentConfig.enableSnap &&
          !f &&
          (g = T3Gv.docHandler.SnapToGrid(g));
        var G = T3Gv.optManager.Table_GetRowAndSegment(T3Gv.optManager.actionTriggerData);
        if (
          D = g.y - p,
          n = T3Gv.optManager.Table_GrowRow(C, G.row, D, !1),
          (o = Utils1.DeepCopy(this)).trect.width = n.x,
          o.trect.height = n.y,
          o.TRectToFrame(o.trect, !0),
          n.x = o.Frame.width,
          n.y = o.Frame.height,
          I.height = n.y,
          T3Gv.optManager.actionLockAspectRatio ? (
            I.height < 0 &&
            (I.y = t, I.height = - I.height),
            i = I.height * T3Gv.optManager.actionAspectRatioWidth / T3Gv.optManager.actionAspectRatioHeight,
            I.x = T3Gv.optManager.actionBBox.x + T3Gv.optManager.actionBBox.width / 2 - i / 2,
            I.width = i,
            this.PinProportional(I),
            m = ConstantData.ActionTriggerType.TABLE_ROW
          ) : I.height < 0 &&
          (I.y = t, I.height = - I.height),
          T(I)
        ) {
          D = T3Gv.optManager.actionTableLastY - p,
            T3Gv.optManager.Table_GrowRow(C, G.row, D, !1);
          break
        }
        T3Gv.optManager.actionNewBBox = $.extend(!0, {
        }, I),
          T3Gv.optManager.actionTableLastX = e,
          T3Gv.optManager.actionTableLastY = t,
          this.HandleActionTriggerCallResize(T3Gv.optManager.actionNewBBox, m, g);
        break;
      case ConstantData.ActionTriggerType.BOTTOMLEFT:
        if (
          I.height = t - I.y,
          S = I.x - e,
          I.x = e,
          I.width += S,
          T3Gv.docHandler.documentConfig.enableSnap,
          T3Gv.optManager.actionLockAspectRatio ? (
            I.width < 0 &&
            (
              I.x = T3Gv.optManager.actionBBox.x + T3Gv.optManager.actionBBox.width,
              I.width = - I.width
            ),
            r = I.width * T3Gv.optManager.actionAspectRatioHeight / T3Gv.optManager.actionAspectRatioWidth,
            I.height < 0 &&
            (I.y = L.y - r),
            I.height = r,
            this.PinProportional(I)
          ) : (
            I.width < 0 &&
            (
              I.x = T3Gv.optManager.actionBBox.x + T3Gv.optManager.actionBBox.width,
              I.width = - I.width
            ),
            I.height < 0 &&
            (I.y = t, I.height = - I.height)
          ),
          T(I)
        ) break;
        T3Gv.optManager.actionNewBBox = $.extend(!0, {
        }, I),
          this.HandleActionTriggerCallResize(T3Gv.optManager.actionNewBBox, !0, g);
        break;
      case ConstantData.ActionTriggerType.CENTERLEFT:
        if (
          S = I.x - e,
          I.x = e,
          I.width += S,
          T3Gv.docHandler.documentConfig.enableSnap,
          T3Gv.optManager.actionLockAspectRatio ? (
            I.width < 0 &&
            (
              I.x = T3Gv.optManager.actionBBox.x + T3Gv.optManager.actionBBox.width,
              I.width = - I.width
            ),
            r = I.width * T3Gv.optManager.actionAspectRatioHeight / T3Gv.optManager.actionAspectRatioWidth,
            I.y = T3Gv.optManager.actionBBox.y + T3Gv.optManager.actionBBox.height / 2 - r / 2,
            I.height = r,
            this.PinProportional(I)
          ) : I.width < 0 &&
          (
            I.x = T3Gv.optManager.actionBBox.x + T3Gv.optManager.actionBBox.width,
            I.width = - I.width
          ),
          T(I)
        ) break;
        T3Gv.optManager.actionNewBBox = $.extend(!0, {
        }, I),
          this.HandleActionTriggerCallResize(T3Gv.optManager.actionNewBBox, !0, g);
        break;
      case ConstantData.ActionTriggerType.CONTAINER_ADJ:
        var N,
          k,
          U,
          J;
        for (
          N = T3Gv.optManager.dragElementList.length,
          T3Gv.optManager.theActionContainerArrangement === ConstantData.ContainerListArrangements.Column ? (
            - D > T3Gv.optManager.actionOldExtra &&
            (D = - T3Gv.optManager.actionOldExtra),
            T3Gv.optManager.actionTableLastY = D,
            d = 0
          ) : (
            - d > T3Gv.optManager.actionOldExtra &&
            (d = - T3Gv.optManager.actionOldExtra),
            T3Gv.optManager.actionTableLastY = d,
            D = 0
          ),
          k = 0;
          k < N;
          k++
        ) J = T3Gv.optManager.dragBBoxList[k],
          (U = T3Gv.optManager.GetSVGDragElement(k)) &&
          U.SetPos(J.x + d, J.y + D);
        break;
      case ConstantData.ActionTriggerType.ROTATE:
        var x = e - T3Gv.optManager.rotatePivotX,
          O = t - T3Gv.optManager.rotatePivotY,
          B = 0;
        0 === x &&
          0 === O ? B = 0 : 0 === x ? B = O > 0 ? 90 : 270 : x >= 0 &&
            O >= 0 ? (B = Math.atan(O / x), B *= 180 / ConstantData.Geometry.PI) : x < 0 &&
              O >= 0 ||
              x < 0 &&
              O < 0 ? B = 180 + (B = Math.atan(O / x)) * (180 / ConstantData.Geometry.PI) : x >= 0 &&
              O < 0 &&
          (B = 360 + (B = Math.atan(O / x)) * (180 / ConstantData.Geometry.PI)),
          T3Gv.docHandler.documentConfig.enableSnap &&
          !f &&
          (
            enhance = T3Gv.optManager.EnhanceSnaps(a),
            B = enhance ? Math.round(B / T3Gv.optManager.enhanceRotateSnap) * T3Gv.optManager.enhanceRotateSnap : Math.round(B / T3Gv.optManager.rotateSnap) * T3Gv.optManager.rotateSnap
          );
        var H = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !0, null),
          V = - B / (180 / ConstantData.Geometry.PI),
          j = {};
        if (
          Utils3.RotatePointsAboutCenter(this.Frame, V, H),
          Utils2.GetPolyRect(j, H),
          j.x < 0
        ) break;
        if (j.y < 0) break;
        if (
          T3Gv.optManager.contentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto
        ) {
          var z = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !1);
          if (j.x + j.width > z.dim.x) break;
          if (j.y + j.height > z.dim.y) break
        }
        T3Gv.optManager.rotateEndRotation = B,
          this.Rotate(T3Gv.optManager.actionSvgObject, B);
        var W = T3Gv.optManager.SD_GetVisioTextChild(this.BlockID);
        if (W >= 0) {
          var q = T3Gv.optManager.GetObjectPtr(W, !0);
          if (q) {
            var K = T3Gv.optManager.svgObjectLayer.GetElementByID(q.BlockID);
            K &&
              (B -= q.VisioRotationDiff, q.Rotate(K, B))
          }
        }
        break;
      case ConstantData.ActionTriggerType.DIMENSION_LINE_ADJ:
        this.DimensionLineDeflectionAdjust(
          T3Gv.optManager.actionSvgObject,
          e,
          t,
          T3Gv.optManager.actionTriggerId,
          T3Gv.optManager.actionTriggerData
        )
    }
  }

  HandleActionTriggerCallResize(e, t, a, r) {
    var i,
      n,
      o,
      s = !1,
      l = !1;
    this.prevBBox = r ? $.extend(!0, {
    }, r) : $.extend(!0, {
    }, this.Frame);
    var S = $.extend(!1, {
    }, this.Frame);
    e.width < ConstantData.Defines.SED_MinDim &&
      (e.width = ConstantData.Defines.SED_MinDim),
      e.height < ConstantData.Defines.SED_MinDim &&
      (e.height = ConstantData.Defines.SED_MinDim),
      this.UpdateFrame(e),
      t === ConstantData.ActionTriggerType.LINELENGTH &&
      (t = 0, l = !0),
      t === ConstantData.ActionTriggerType.LINE_THICKNESS &&
      (t = 0, s = !0),
      T3Gv.optManager.actionStoredObjectId === this.BlockID &&
      a &&
      T3Gv.optManager.UpdateDisplayCoordinates(e, a, ConstantData.CursorTypes.Grow, this);
    var c = !0,
      u = this.GetTable(!1);
    if (
      - 1 === t ? (c = !1, t = !0) : t === ConstantData.ActionTriggerType.TABLE_EDIT &&
        (c = !1, t = !1),
      u &&
      c
    ) {
      var p = e.width - T3Gv.optManager.actionBBox.width;
      t ||
        (T3Gv.optManager.theActionTable = Utils1.DeepCopy(u)),
        Utils2.IsEqual(p, 0) &&
          !s ? (
          p = null,
          this.trect.width = u.wd,
          this.TRectToFrame(this.trect, t || l)
        ) : p = this.trect.width;
      var d = e.height - T3Gv.optManager.actionBBox.height;
      switch (
      Utils2.IsEqual(d, 0) &&
        !s ? (
        d = null,
        this.trect.height = u.ht,
        this.TRectToFrame(this.trect, t || l)
      ) : d = this.trect.height,
      t
      ) {
        case ConstantData.ActionTriggerType.TABLE_ROW:
          d = null;
          break;
        case ConstantData.ActionTriggerType.TABLE_COL:
          p = null
      }
      if (p || d) {
        if (
          o = T3Gv.optManager.theActionTable.ht,
          u = this.GetTable(!0),
          i = T3Gv.optManager.Table_Resize(this, u, T3Gv.optManager.theActionTable, p, d),
          !Utils2.IsEqual(i.y, o) &&
          (t || s)
        ) {
          var D = Utils1.DeepCopy(this);
          D.trect.width = i.x,
            D.trect.height = i.y,
            D.TRectToFrame(D.trect, !0),
            T3Gv.optManager.actionNewBBox.height = D.Frame.height
        }
        if (
          i.x - this.trect.width > 0.1 ||
          i.y - this.trect.height > 0.1 ||
          !Utils2.IsEqual(i.y, o) &&
          l
        ) {
          if (
            n = {
              x: this.trect.x,
              y: this.trect.y,
              width: i.x,
              height: i.y
            },
            this.TRectToFrame(n, t || l),
            e = $.extend(!1, {
            }, this.Frame),
            !1 != (i.x - this.trect.width > 0.1 && i.y - this.trect.height > 0.1) ||
            !t
          ) return;
          T3Gv.optManager.actionNewBBox = $.extend(!1, {
          }, this.Frame)
        }
      }
    } else if (
      - 1 != this.DataID &&
      !(
        this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA ||
        this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB
      )
    ) {
      var g = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      if (g) {
        var h,
          m = g.textElem;
        n = this.trect,
          h = this.TextGrow === ConstantData.TextGrowBehavior.HORIZONTAL ? T3Gv.optManager.contentHeader.MaxWorkDim.x : n.width,
          i = m ? m.CalcTextFit(h) : {
            width: 0,
            height: 0
          };
        var C = Utils2.TrimDP(i.width, T3Gv.docHandler.rulerSettings.dp),
          y = Utils2.TrimDP(i.height, T3Gv.docHandler.rulerSettings.dp),
          f = Utils2.TrimDP(i.width, 0),
          L = Utils2.TrimDP(i.height, 0),
          I = Utils2.TrimDP(n.height, 0),
          T = Utils2.TrimDP(n.width, 0);
        if (
          0 !== L &&
          Math.abs(I - L) <= 1 &&
          (L = I),
          0 !== f &&
          Math.abs(T - f) <= 1 &&
          (f = T),
          L > I ||
          f > T
        ) return t ||
          (
            y > (n = Utils1.DeepCopy(this.trect)).height &&
            (n.height = y),
            C > n.width &&
            (n.width = C),
            this.TRectToFrame(n, t)
          ),
          void this.UpdateFrame(S)
      }
    }
    if (
      t &&
      T3Gv.optManager.actionSvgObject &&
      T3Gv.optManager.actionStoredObjectId === this.BlockID
    ) {
      var b = this.Resize(
        T3Gv.optManager.actionSvgObject,
        T3Gv.optManager.actionNewBBox,
        this,
        t
      );
      T3Gv.optManager.actionBBox.x += b.x,
        T3Gv.optManager.actionBBox.y += b.y,
        T3Gv.optManager.actionStartX += b.x,
        T3Gv.optManager.actionStartY += b.y,
        this.Frame.x += b.x,
        this.Frame.y += b.y,
        this.inside.x += b.x,
        this.inside.y += b.y,
        this.trect.x += b.x,
        this.trect.y += b.y
    }
    var M = T3Gv.optManager.SD_GetVisioTextChild(this.BlockID);
    if (M >= 0) {
      var P = T3Gv.optManager.GetObjectPtr(M, !0);
      if (
        0 === P.hookdisp.x &&
        0 === P.hookdisp.y &&
        this.ShapeType !== ConstantData.ShapeType.GROUPSYMBOL
      ) {
        P.sizedim.width = this.trect.width,
          P.sizedim.height = this.trect.height,
          P.HandleActionTriggerCallResize(this.trect, 0, null);
        var R = T3Gv.optManager.svgObjectLayer.GetElementByID(P.BlockID);
        if (R) P.Resize(R, P.Frame, P)
      }
    }
  }

  HandleActionTriggerDoAutoScroll() {
    T3Gv.optManager.autoScrollTimerId = T3Gv.optManager.autoScrollTimer.setTimeout('HandleActionTriggerDoAutoScroll', 100);
    var e = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(T3Gv.optManager.autoScrollXPos, T3Gv.optManager.autoScrollYPos);
    if (
      this.PinAction(e),
      e = T3Gv.optManager.DoAutoGrowDrag(e),
      T3Gv.docHandler.ScrollToPosition(e.x, e.y),
      T3Gv.optManager.actionTriggerId != ConstantData.ActionTriggerType.ROTATE &&
      T3Gv.optManager.rotateObjectRadians
    ) {
      var t,
        a = e.x,
        r = e.y,
        i = {},
        n = {},
        o = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.actionStoredObjectId, !1).Frame;
      i.x = a,
        i.y = r,
        n.x = o.x + o.width / 2,
        n.y = o.y + o.height / 2,
        a = (
          t = T3Gv.optManager.RotatePointAroundPoint(n, i, T3Gv.optManager.rotateObjectRadians)
        ).x,
        r = t.y,
        e.x = a,
        e.y = r
    }
    this.HandleActionTriggerTrackCommon(e.x, e.y)
  }

  AutoScrollCommon(e, t, a) {
    var r = !1;
    T3Gv.optManager.OverrideSnaps(e) &&
      (t = !1);
    var i = e.gesture.center.clientX,
      n = e.gesture.center.clientY,
      o = i,
      s = n,
      l = T3Gv.optManager.svgDoc.docInfo;
    if (
      i >= l.dispX + l.dispWidth - 4 &&
      (r = !0, o = l.dispX + l.dispWidth - 4 + 32),
      i < l.dispX &&
      (r = !0, o = l.dispX - 32),
      n >= l.dispY + l.dispHeight - 4 &&
      (r = !0, s = l.dispY + l.dispHeight - 4 + 32),
      n < l.dispY &&
      (r = !0, s = l.dispY - 32),
      r
    ) {
      if (t && T3Gv.docHandler.documentConfig.enableSnap) {
        var S = {
          x: o,
          y: s
        };
        o = (S = T3Gv.docHandler.SnapToGrid(S)).x,
          s = S.y
      }
      return T3Gv.optManager.autoScrollXPos = o,
        T3Gv.optManager.autoScrollYPos = s,
        - 1 != T3Gv.optManager.autoScrollTimerId ? !1 : (
          T3Gv.optManager.autoScrollTimer = new HvTimer(this)/* GPTimer(this)*/,
          T3Gv.optManager.autoScrollTimerId = T3Gv.optManager.autoScrollTimer.setTimeout(a, 0),
          !1
        )
    }
    return this.ResetAutoScrollTimer(),
      !0
  }

  PinAction(e) {
    var t = {},
      a = {},
      r = ConstantData.Defines.SED_KnobSize;
    if (0 !== this.RotationAngle) {
      var i = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !0, null),
        n = - this.RotationAngle / (180 / ConstantData.Geometry.PI);
      Utils3.RotatePointsAboutCenter(this.Frame, n, i),
        Utils2.GetPolyRect(a, i)
    } else a = this.Frame;
    if (
      t.left = a.x - this.r.x + r / 2,
      t.top = a.y - this.r.y + r / 2,
      t.right = this.r.x + this.r.width - (a.x + a.width) + r / 2,
      t.bottom = this.r.y + this.r.height - (a.y + a.height) + r / 2,
      e.x < t.left &&
      (e.x = t.left),
      e.y < t.top &&
      (e.y = t.top),
      T3Gv.optManager.contentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto
    ) {
      var o = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data;
      return e.x > o.dim.x - t.right &&
        (e.x = o.dim.x - t.right),
        e.y > o.dim.y - t.bottomn &&
        (e.y = o.dim.y - t.bottom),
        e
    }
  }

  ActionApplySnaps(e, t) {
    var a = {},
      r = !1,
      i = [],
      n = this.GetSnapRect(),
      o = ConstantData.ActionTriggerType,
      s = function (t) {
        a.x = t.x,
          a.y = t.y,
          a.width = t.width,
          a.height = e.y - t.y,
          a.height < 0 ? (
            a.y = e.y,
            a.height = t.y - e.y,
            i.push('left_top'),
            i.push('right_top')
          ) : (i.push('left_bottom'), i.push('right_bottom')),
          r = !0
      },
      l = function (t) {
        a.x = t.x,
          a.y = e.y,
          a.width = t.width,
          a.height = t.y + t.height - e.y,
          a.height < 0 ? (
            a.y = t.y,
            a.height = e.y - t.y,
            i.push('left_bottom'),
            i.push('right_bottom')
          ) : (i.push('left_top'), i.push('right_top')),
          r = !0
      },
      S = function (t) {
        a.y = t.y,
          a.x = e.x,
          a.height = t.height,
          a.width = t.x + t.width - e.x,
          a.height < 0 ? (
            a.x = t.x,
            a.width = e.x - t.x,
            i.push('above_right'),
            i.push('below_right')
          ) : (i.push('above_left'), i.push('below_left')),
          r = !0
      },
      c = function (t) {
        a.y = t.y,
          a.x = t.x,
          a.height = t.height,
          a.width = e.x - t.x,
          a.width < 0 ? (
            a.x = e.x,
            a.width = t.x - e.x,
            i.push('above_left'),
            i.push('below_left')
          ) : (i.push('above_right'), i.push('below_right')),
          r = !0
      },
      u = {
        x: null,
        y: null
      };
    if (T3Gv.optManager.AllowSnapToShapes()) {
      switch (t) {
        case o.BOTTOMCENTER:
          s(n);
          break;
        case o.BOTTOMLEFT:
          s(n),
            S(Utils1.DeepCopy(a));
          break;
        case o.BOTTOMRIGHT:
          s(n),
            c(Utils1.DeepCopy(a));
          break;
        case o.CENTERLEFT:
          S(n);
          break;
        case o.CENTERRIGHT:
          c(n);
          break;
        case o.TOPCENTER:
          l(n);
          break;
        case o.TOPRIGHT:
          l(n),
            c(Utils1.DeepCopy(a));
          break;
        case o.TOPLEFT:
          l(n),
            S(Utils1.DeepCopy(a))
      }
      if (r) {
        var p = new ListManager.Dynamic_Guides;
        if (
          this.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
        ) null != (
          u = T3Gv.optManager.DynamicSnaps_GetSnapObjects(this.BlockID, a, p, null, i)
        ).x &&
          (e.x += u.x),
          null != u.y &&
          (e.y += u.y)
      }
    }
    if (T3Gv.docHandler.documentConfig.enableSnap) {
      var d = T3Gv.docHandler.SnapToGrid(e);
      null == u.x &&
        (e.x = d.x),
        null == u.y &&
        (e.y = d.y)
    }
    return p
  }

  LM_ActionTrack(e) {
    console.log('============ListManager.BaseShape.prototype.LM_ActionTrack e=>', e);
    if (
      Utils2.StopPropagationAndDefaults(e),
      - 1 == T3Gv.optManager.actionStoredObjectId
    ) return !1;
    var t = null,
      a = ConstantData.ActionTriggerType;
    t = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.actionStoredObjectId, !1),
      T3Gv.optManager.actionTriggerId != ConstantData.ActionTriggerType.ROTATE &&
      t.SetDimensionLinesVisibility(T3Gv.optManager.actionSvgObject, !1);
    var r = t.Frame,
      i = (
        e.target,
        T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY)
      );
    this.PinAction(i),
      i = T3Gv.optManager.DoAutoGrowDrag(i);
    var n = T3Gv.optManager.OverrideSnaps(e),
      o = !1;
    switch (T3Gv.optManager.actionTriggerId) {
      case a.MODIFYSHAPE:
      case a.ROTATE:
        o = !0
    }
    if (!o && !n) var s = this.ActionApplySnaps(i, T3Gv.optManager.actionTriggerId);
    var l = i.x,
      S = i.y,
      c = {},
      u = {},
      p = {};
    if (
      T3Gv.optManager.actionTriggerId != ConstantData.ActionTriggerType.ROTATE &&
      T3Gv.optManager.rotateObjectRadians &&
      (
        c.x = l,
        c.y = S,
        u.x = r.x + r.width / 2,
        u.y = r.y + r.height / 2,
        l = (
          p = T3Gv.optManager.RotatePointAroundPoint(u, c, T3Gv.optManager.rotateObjectRadians)
        ).x,
        S = p.y,
        i.x = l,
        i.y = S
      ),
      this.AutoScrollCommon(e, !0, 'HandleActionTriggerDoAutoScroll') &&
      (
        i = this.LM_ActionDuringTrack(i),
        this.HandleActionTriggerTrackCommon(i.x, i.y, e),
        T3Gv.optManager.actionTriggerId != ConstantData.ActionTriggerType.ROTATE &&
        t &&
        t.SetDimensionLinesVisibility(T3Gv.optManager.actionSvgObject, !0),
        s
      )
    ) {
      var d = Utils1.DeepCopy(this.Frame);
      this.Frame = T3Gv.optManager.actionNewBBox;
      var D = this.GetSnapRect();
      this.Frame = d,
        T3Gv.optManager.DynamicSnaps_UpdateGuides(s, this.BlockID, D)
    }
  }

  LM_ActionRelease(e, t) {

    console.log('== track UpdateDimensionsLines Shape.BaseShape-> LM_ActionRelease')

    try {
      var a = this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART,
        r = this.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_TIMELINE,
        i = !1,
        n = !1,
        o = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.actionStoredObjectId, !1);
      if (null == o) return;
      if (null == t) {
        if (
          T3Gv.optManager.unbindActionClickHammerEvents(),
          this.ResetAutoScrollTimer(),
          null == T3Gv.optManager.actionSvgObject
        ) return;
        if (T3Gv.optManager.actionStoredObjectId < 0) return;
        var s;
        n = !1;
        if (Collab.AllowMessage()) {
          var l = {
            BlockID: T3Gv.optManager.actionStoredObjectId,
            ActionTriggerID: T3Gv.optManager.actionTriggerId,
            ActionData: T3Gv.optManager.actionTriggerData
          };
          l.Frame = Utils1.DeepCopy(o.Frame),
            l.rotateEndRotation = T3Gv.optManager.rotateEndRotation
        }
        switch (
        T3Gv.optManager.DynamicSnaps_RemoveGuides(T3Gv.optManager.Dynamic_Guides),
        T3Gv.optManager.Dynamic_Guides = null,
        T3Gv.optManager.actionTriggerId
        ) {
          case ConstantData.ActionTriggerType.TABLE_ROW:
            if (s = o.GetTable(!1)) {
              var S = T3Gv.optManager.Table_GetRowAndSegment(T3Gv.optManager.actionTriggerData);
              T3Gv.optManager.Table_SelectRowDivider(o, S.row, !1)
            }
            n = !0;
            break;
          case ConstantData.ActionTriggerType.TABLE_COL:
            if (s = o.GetTable(!1)) {
              var c = T3Gv.optManager.Table_GetColumnAndSegment(T3Gv.optManager.actionTriggerData),
                u = c.column;
              this.objecttype === ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_COLS &&
                this.RotationAngle &&
                c.column++,
                u >= 0 &&
                T3Gv.optManager.Table_SelectColDivider(o, u, !1),
                Collab.AllowMessage() &&
                (
                  l.ColumnWidth = s.cols[c.column].x,
                  c.column > 0 &&
                  (l.ColumnWidth -= s.cols[c.column - 1].x)
                )
            }
            n = !0,
              i = !0;
            break;
          case ConstantData.ActionTriggerType.TABLE_SELECT:
          case ConstantData.ActionTriggerType.TABLE_ROWSELECT:
          case ConstantData.ActionTriggerType.TABLE_COLSELECT:
            n = !0,
              !0,
              Collab.IsPrimary() ||
              (l = null);
            break;
          case ConstantData.ActionTriggerType.MOVEPOLYSEG:
            if (n = !0, Collab.AllowMessage()) {
              var p = T3Gv.optManager.GetObjectPtr(this.BlockID, !1);
              l.left_sindent = p.left_sindent,
                l.right_sindent = p.right_sindent,
                l.top_sindent = p.top_sindent,
                l.bottom_sindent = p.bottom_sindent,
                l.tindent = {},
                l.tindent.left = p.tindent.left,
                l.tindent.right = p.tindent.right,
                l.tindent.top = p.tindent.top,
                l.tindent.bottom = p.tindent.bottom,
                p.polylist &&
                (l.polylist = Utils1.DeepCopy(p.polylist)),
                p.VertexArray &&
                (l.VertexArray = Utils1.DeepCopy(p.VertexArray))
            }
            break;
          case ConstantData.ActionTriggerType.DIMENSION_LINE_ADJ:
            Collab.AllowMessage() &&
              (
                l.dimensionDeflectionH = this.dimensionDeflectionH,
                l.dimensionDeflectionV = this.dimensionDeflectionV
              );
            break;
          case ConstantData.ActionTriggerType.CONTAINER_ADJ:
            Collab.AllowMessage() &&
              (l.actionTableLastY = T3Gv.optManager.actionTableLastY)
        }
        Collab.AllowMessage() &&
          null != l &&
          Collab.BuildMessage(ConstantData.CollabMessages.Action_Shape, l, !1),
          o.SetDimensionLinesVisibility(T3Gv.optManager.actionSvgObject, !1)
      } else if (
        T3Gv.optManager.actionTriggerId === ConstantData.ActionTriggerType.MOVEPOLYSEG
      ) n = !0;
      if (
        T3Gv.optManager.actionTriggerId == ConstantData.ActionTriggerType.CONTAINER_ADJ
      ) T3Gv.optManager.moveList = [],
        T3Gv.optManager.dragElementList.length = 0,
        T3Gv.optManager.dragBBoxList.length = 0,
        T3Gv.optManager.actionOldExtra = 0,
        this.Pr_UpdateExtra(T3Gv.optManager.actionTableLastY);
      else if (
        T3Gv.optManager.actionTriggerId == ConstantData.ActionTriggerType.ROTATE
      ) {
        T3Gv.optManager.rotateEndRotation = T3Gv.optManager.rotateEndRotation % 360,
          T3Gv.optManager.SetObjectAttributes(
            T3Gv.optManager.actionStoredObjectId,
            {
              RotationAngle: T3Gv.optManager.rotateEndRotation
            }
          );
        var d = T3Gv.optManager.SD_GetVisioTextChild(this.BlockID);
        if (d >= 0) {
          var D = T3Gv.optManager.GetObjectPtr(d, !0);
          if (D) {
            var g = 0;
            D.VisioRotationDiff &&
              (g = - D.VisioRotationDiff),
              T3Gv.optManager.SetObjectAttributes(d, {
                RotationAngle: T3Gv.optManager.rotateEndRotation + g
              }),
              T3Gv.optManager.SetObjectFrame(d, D.Frame)
          }
        }
        T3Gv.optManager.SetObjectFrame(T3Gv.optManager.actionStoredObjectId, o.Frame),
          this.UpdateDimensionLines(T3Gv.optManager.actionSvgObject)
      } else if (!n) {
        var h = $.extend(!0, {
        }, o.Frame);
        T3Gv.optManager.SetObjectFrame(T3Gv.optManager.actionStoredObjectId, h),
          this.polylist &&
          this.ShapeType === ConstantData.ShapeType.POLYGON &&
          this.ScaleObject(0, 0, 0, 0, 0, 0),
          i = !0
      }
      this.LM_ActionPostRelease(T3Gv.optManager.actionStoredObjectId),
        i &&
          a ? T3Gv.optManager.PlanningTableUpdateGeometry(this, !0) : i &&
          r &&
        T3Gv.optManager.Timeline_SetScale(this),
        null == t &&
        o.SetDimensionLinesVisibility(T3Gv.optManager.actionSvgObject, !0),
        (
          '' !== this.HyperlinkText ||
          - 1 != this.NoteID ||
          this.HasFieldData()
        ) &&
        T3Gv.optManager.AddToDirtyList(T3Gv.optManager.actionStoredObjectId),
        T3Gv.optManager.actionStoredObjectId = - 1,
        T3Gv.optManager.actionSvgObject = null,
        T3Gv.optManager.theActionTable = null,
        T3Gv.optManager.ShowOverlayLayer(),
        T3Gv.optManager.CompleteOperation(null)
    } catch (e) {
      this.LM_ActionClick_ExceptionCleanup(e);
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  LM_ActionPreTrack(e, t) {
    // SDUI.Commands.MainController.Dropdowns.HideAllDropdowns(),
    // Doulbe === TODO
    this.rflags &&
      (
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !1
        )
      )
  }

  LM_ActionDuringTrack(e) {
    return e
  }

  LM_ActionPostRelease(e) {
    var t = function () {
      if (
        T3Gv.optManager.currentModalOperation === ListManager.ModalOperations.FORMATPAINTER
      ) {
        if (
          T3Gv.optManager.formatPainterMode === ListManager.formatPainterModes.TABLE ||
          T3Gv.optManager.formatPainterMode === ListManager.formatPainterModes.OBJECT
        ) {
          var e = T3Gv.optManager.Table_GetActiveID();
          T3Gv.optManager.Table_PasteFormat(e, T3Gv.optManager.formatPainterStyle, !1)
        }
        !0 !== T3Gv.optManager.formatPainterSticky &&
          T3Gv.optManager.SetFormatPainter(!0, !1)
      }
    };
    this.objecttype !== ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER &&
      T3Gv.optManager.UpdateLinks(),
      T3Gv.optManager.linkParams = null;
    var a = this.GetTable(!1);
    switch (
    T3Gv.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
    T3Gv.optManager.actionTriggerId
    ) {
      case ConstantData.ActionTriggerType.TABLE_ROW:
        T3Gv.optManager.theActionTable &&
          a &&
          T3Gv.optManager.theActionTable.ht != a.ht &&
          (this.sizedim.height = this.Frame.height),
          T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
          t();
        break;
      case ConstantData.ActionTriggerType.TABLE_COL:
        T3Gv.optManager.theActionTable &&
          a &&
          T3Gv.optManager.theActionTable.wd != a.wd &&
          (this.sizedim.width = this.Frame.width),
          T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
          t();
        break;
      case ConstantData.ActionTriggerType.TABLE_SELECT:
      case ConstantData.ActionTriggerType.TABLE_ROWSELECT:
      case ConstantData.ActionTriggerType.TABLE_COLSELECT:
        if (
          T3Gv.optManager.currentModalOperation === ListManager.ModalOperations.FORMATPAINTER
        ) {
          if (
            T3Gv.optManager.formatPainterMode === ListManager.formatPainterModes.TABLE ||
            T3Gv.optManager.formatPainterMode === ListManager.formatPainterModes.OBJECT
          ) {
            var r = T3Gv.optManager.Table_GetActiveID();
            T3Gv.optManager.Table_PasteFormat(r, T3Gv.optManager.formatPainterStyle, !1)
          }
          !0 !== T3Gv.optManager.formatPainterSticky &&
            T3Gv.optManager.SetFormatPainter(!0, !1)
        }
        break;
      case ConstantData.ActionTriggerType.TABLE_EDIT:
        T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE);
        break;
      case ConstantData.ActionTriggerType.CENTERLEFT:
      case ConstantData.ActionTriggerType.CENTERRIGHT:
        this.sizedim.width = this.Frame.width;
        break;
      case ConstantData.ActionTriggerType.TOPCENTER:
      case ConstantData.ActionTriggerType.BOTTOMCENTER:
        this.sizedim.height = this.Frame.height,
          this.GetGanttInfo() &&
          T3Gv.optManager.GanttFormat(this.BlockID, !1, !1, !1, null);
        break;
      default:
        this.sizedim.width = this.Frame.width,
          this.sizedim.height = this.Frame.height,
          this.GetGanttInfo() &&
          T3Gv.optManager.GanttFormat(this.BlockID, !1, !1, !1, null)
    }
  }

  LM_SetupActionClick(e, t, a, r, i) {

    console.log('LM_SetupActionClick', e, t, a, r, i);

    T3Gv.optManager.eventTimestamp = Date.now(),
      T3Gv.optManager.SetUIAdaptation(e);
    var n,
      o,
      s,
      l = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
      S = (
        T3Gv.optManager.OverrideSnaps(e),
        (l = T3Gv.optManager.DoAutoGrowDrag(l)).x
      ),
      c = l.y;
    if (r) {
      n = a,
        o = r,
        s = i;
      var u = 0,
        p = !1;
      switch (
      obj = T3Gv.optManager.GetObjectPtr(a, !1),
      obj &&
      (
        (u = obj.RotationAngle) > 180 &&
        (u = 360 - u),
        u >= 90 &&
        (u = 180 - u),
        u > 45 &&
        (p = !0)
      ),
      r
      ) {
        case ConstantData.ActionTriggerType.TABLE_ROW:
          p ? T3Gv.optManager.SetEditMode(
            ConstantData.EditState.DRAGCONTROL,
            Element.CursorType.COL_RESIZE
          ) : T3Gv.optManager.SetEditMode(
            ConstantData.EditState.DRAGCONTROL,
            Element.CursorType.ROW_RESIZE
          );
          break;
        case ConstantData.ActionTriggerType.TABLE_COL:
          p ? T3Gv.optManager.SetEditMode(
            ConstantData.EditState.DRAGCONTROL,
            Element.CursorType.ROW_RESIZE
          ) : T3Gv.optManager.SetEditMode(
            ConstantData.EditState.DRAGCONTROL,
            Element.CursorType.COL_RESIZE
          )
      }
    } else {
      var d = T3Gv.optManager.svgOverlayLayer.FindElementByDOMElement(e.currentTarget);
      if (null === d) return !1;
      var D = d.GetID();
      n = parseInt(
        D.substring(ConstantData.Defines.Action.length, D.length),
        10
      );
      var g = d.GetTargetForEvent(e);
      if (null == g) return !1;
      o = g.GetID(),
        s = g.GetUserData(),
        T3Gv.optManager.SetControlDragMode(g)
    }
    T3Gv.optManager.actionStoredObjectId = n;
    var h = T3Gv.optManager.GetObjectPtr(n, !0);
    T3Gv.optManager.actionTriggerId = o,
      T3Gv.optManager.actionTriggerData = s;
    var m = ConstantData.ActionTriggerType;
    switch (o) {
      case m.CONNECTOR_PERP:
      case m.CONNECTOR_ADJ:
      case m.CONNECTOR_HOOK:
      case m.LINESTART:
      case m.LINEEND:
        var C = function (e) {
          if (e.hooks.length) {
            var t = e.hooks[0].objid;
            return T3Gv.optManager.GetObjectPtr(t, !1)
          }
          return null
        }(this);
        return C &&
          (
            T3Gv.optManager.actionStoredObjectId = C.BlockID,
            // ListManager.Connector.prototype.LM_ActionClick.call(C, e, !0)
            // Double ===
            this.Connector_LM_ActionClick(e, !0)
          ),
          !1
    }
    o === ConstantData.ActionTriggerType.MOVEPOLYSEG &&
      (
        T3Gv.optManager.actionTriggerData = {
          hitSegment: s,
          moveAngle: 9999
        }
      ),
      T3Gv.optManager.actionSvgObject = T3Gv.optManager.svgObjectLayer.GetElementByID(n),
      h.SetDimensionLinesVisibility(T3Gv.optManager.actionSvgObject, !1),
      this.LM_ActionPreTrack(n, o),
      (
        '' !== this.HyperlinkText ||
        - 1 != this.NoteID ||
        this.HasFieldData()
      ) &&
      this.HideAllIcons(T3Gv.optManager.svgDoc, T3Gv.optManager.actionSvgObject),
      T3Gv.optManager.actionLockAspectRatio = e.gesture.srcEvent.shiftKey,
      this.ResizeAspectConstrain &&
      (
        T3Gv.optManager.actionLockAspectRatio = !T3Gv.optManager.actionLockAspectRatio
      );
    var y = h.Frame;
    T3Gv.optManager.actionLockAspectRatio &&
      (
        0 === y.height ? T3Gv.optManager.actionLockAspectRatio = !1 : (
          T3Gv.optManager.actionAspectRatioWidth = y.width,
          T3Gv.optManager.actionAspectRatioHeight = y.height
        )
      ),
      T3Gv.optManager.actionBBox = $.extend(!0, {
      }, y),
      T3Gv.optManager.actionNewBBox = $.extend(!0, {
      }, y);
    var f = this.GetTable(!1);
    f &&
      (T3Gv.optManager.theActionTable = Utils1.DeepCopy(f)),
      T3Gv.optManager.HideOverlayLayer();
    var L = {},
      I = {},
      T = {};
    if (
      T3Gv.optManager.rotateObjectRadians = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
      T3Gv.optManager.actionTriggerId == ConstantData.ActionTriggerType.CONTAINER_ADJ
    ) {
      L.x = S,
        L.y = c,
        T3Gv.optManager.actionStartX = L.x,
        T3Gv.optManager.actionStartY = L.y;
      var b = this.Pr_GetAdjustShapeList();
      if (!b) return !1;
      T3Gv.optManager.moveList = b.list,
        T3Gv.optManager.dragElementList = b.svglist,
        T3Gv.optManager.dragBBoxList = b.framelist,
        T3Gv.optManager.actionTableLastY = 0,
        T3Gv.optManager.actionOldExtra = b.oldextra,
        T3Gv.optManager.theActionContainerArrangement = b.arrangement
    } else T3Gv.optManager.actionTriggerId == ConstantData.ActionTriggerType.ROTATE ? (
      T3Gv.optManager.rotateKnobCenterDivisor = this.RotateKnobCenterDivisor(),
      T3Gv.optManager.rotateStartRotation = this.RotationAngle,
      T3Gv.optManager.rotateEndRotation = T3Gv.optManager.rotateStartRotation,
      T3Gv.optManager.rotatePivotX = y.x + y.width / T3Gv.optManager.rotateKnobCenterDivisor.x,
      T3Gv.optManager.rotatePivotY = y.y + y.height / T3Gv.optManager.rotateKnobCenterDivisor.y,
      T3Gv.optManager.actionStartX = S,
      T3Gv.optManager.actionStartY = c
    ) : (
      L.x = S,
      L.y = c,
      I.x = y.x + y.width / 2,
      I.y = y.y + y.height / 2,
      T = T3Gv.optManager.RotatePointAroundPoint(I, L, T3Gv.optManager.rotateObjectRadians),
      T3Gv.optManager.actionStartX = T.x,
      T3Gv.optManager.actionStartY = T.y,
      T3Gv.optManager.actionTableLastX = T.x,
      T3Gv.optManager.actionTableLastY = T.y
    );
    return !0
  }



  Connector_LM_ActionClick(e, t) {
    // ListManager.BaseLine.prototype.LM_ActionClick.call(this, e, t)

    this.BaseLine_LM_ActionClick(e, t)
  }

  BaseLine_LM_ActionClick(e, t) {
    // debugger
    try {
      var a = this.BlockID,
        r = T3Gv.optManager.GetObjectPtr(a, !1);
      // if (!(r && r instanceof ListManager.BaseDrawingObject)) return !1;
      // Double === TODO
      if (!(r && r instanceof BaseDrawingObject)) return !1;
      if (
        T3Gv.optManager.DoAutoGrowDragInit(0, this.BlockID),
        !this.LM_SetupActionClick(e, t)
      ) return;
      Collab.BeginSecondaryEdit();
      var i = T3Gv.optManager.GetObjectPtr(this.BlockID, !1);
      T3Gv.optManager.WorkAreaHammer.on('drag', EvtUtil.Evt_ActionTrackHandlerFactory(i)),

        // T3Gv.optManager.WorkAreaHammer.on('drag', function(ee){
        //   console.log("0000011120200030========================= ee",ee);
        // }),


        T3Gv.optManager.WorkAreaHammer.on('dragend', EvtUtil.Evt_ActionReleaseHandlerFactory(i))
    } catch (e) {
      this.LM_ActionClick_ExceptionCleanup(e);
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }


  LM_ActionClick_ExceptionCleanup(e) {
    T3Gv.optManager.unbindActionClickHammerEvents(),
      this.ResetAutoScrollTimer(),
      T3Gv.optManager.ob = {},
      T3Gv.optManager.linkParams = null,
      T3Gv.optManager.actionTriggerId = - 1,
      T3Gv.optManager.actionTriggerData = null,
      T3Gv.optManager.actionStoredObjectId = - 1,
      T3Gv.optManager.actionSvgObject = null,
      T3Gv.optManager.HideOverlayLayer()
  }



  LM_ActionClick(e, t, a, r, i) {
    Utils2.StopPropagationAndDefaults(e);
    try {
      var n = this.BlockID,
        o = T3Gv.optManager.GetObjectPtr(n, !1);
      // if (!(o && o instanceof ListManager.BaseDrawingObject)) return !1;
      if (!(o && o instanceof BaseDrawingObject)) return !1;
      if (
        T3Gv.optManager.DoAutoGrowDragInit(r),
        !this.LM_SetupActionClick(e, t, a, r, i)
      ) return;
      Collab.BeginSecondaryEdit();
      var s = T3Gv.optManager.GetObjectPtr(this.BlockID, !1);
      T3Gv.optManager.WorkAreaHammer.on('drag', EvtUtil.Evt_ActionTrackHandlerFactory(s)),
        T3Gv.optManager.WorkAreaHammer.on('dragend', EvtUtil.Evt_ActionReleaseHandlerFactory(s))
    } catch (e) {
      this.LM_ActionClick_ExceptionCleanup(e);
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  RightClick(e) {
    var t,
      a = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
      r = (ConstantData.ObjectSubTypes, ConstantData.ShapeType),
      i = T3Gv.optManager.svgObjectLayer.FindElementByDOMElement(e.currentTarget),
      n = i.GetID();
    if (
      (t = T3Gv.optManager.GetObjectPtr(n, !1)) &&
      // t instanceof ListManager.BaseDrawingObject
      t instanceof BaseDrawingObject
    ) {
      if (
        t &&
        t.objecttype === ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER
      ) {
        if (
          SDUI.AppSettings.Application === Resources.Application.Builder
        ) return T3Gv.optManager.SelectObjectFromClick(e, i),
          ConstantData.DocumentContext.CurrentContainerList = t.ContainerList,
          T3Gv.optManagerrightClickParams = new RightClickData(),
          T3Gv.optManagerrightClickParams.TargetID = i.GetID(),
          T3Gv.optManagerrightClickParams.HitPt.x = a.x,
          T3Gv.optManagerrightClickParams.HitPt.y = a.y,
          T3Gv.optManagerrightClickParams.Locked = (this.flags & ConstantData.ObjFlags.SEDO_Lock) > 0,
          void Commands.MainController.ShowContextualMenu(
            Resources.Controls.ContextMenus.BuilderSmartContainer.Id.toLowerCase(),
            e.gesture.center.clientX,
            e.gesture.center.clientY
          );
        var o = T3Gv.optManager.ContainerIsInCell(t);
        if (o) return T3Gv.optManagerrightClickParams = new RightClickData(),
          T3Gv.optManagerrightClickParams.TargetID = i.GetID(),
          T3Gv.optManagerrightClickParams.HitPt.x = a.x,
          T3Gv.optManagerrightClickParams.HitPt.y = a.y,
          T3Gv.optManagerrightClickParams.Locked = (this.flags & ConstantData.ObjFlags.SEDO_Lock) > 0,
          void T3Gv.optManager.Table_ShowContainerMenu(o, e)
      }
      if (!T3Gv.optManager.SelectObjectFromClick(e, i)) return !1;
      if (T3Gv.docHandler.IsReadOnly()) return T3Gv.optManagerrightClickParams = new RightClickData(),
        T3Gv.optManagerrightClickParams.TargetID = i.GetID(),
        T3Gv.optManagerrightClickParams.HitPt.x = a.x,
        T3Gv.optManagerrightClickParams.HitPt.y = a.y,
        T3Gv.optManagerrightClickParams.Locked = (this.flags & ConstantData.ObjFlags.SEDO_Lock) > 0,
        Commands.MainController.ShowContextualMenu(
          Resources.Controls.ContextMenus.DefaultReadOnly.Id.toLowerCase(),
          e.gesture.center.clientX,
          e.gesture.center.clientY
        ),
        !1;
      var s = T3Gv.optManager.Table_GetActiveID(),
        l = this.GetTable(!1),
        S = i.GetID(),
        c = i.GetTargetForEvent(e).GetID(),
        u = !1;
      if (
        l &&
        l.flags & ListManager.Table.TableFlags.SDT_TF_LOCK &&
        (u = !0),
        t = T3Gv.optManager.GetObjectPtr(S, !1)
      ) {
        var p = (t.TextFlags & ConstantData.TextFlags.SED_TF_OneClick) > 0 &&
          s < 0 &&
          c !== ConstantData.SVGElementClass.SLOP;
        if (t.AllowTextEdit() || (p = !1), this.IsSwimlane()) switch (u = !0, c) {
          case ConstantData.Defines.TableColHit:
          case ConstantData.Defines.TableRowHit:
            p = !1
        }
        if (t.GetTextObject(e, !0) >= 0 || p) {
          var d = i.textElem;
          (d || p) &&
            (
              d &&
              (
                g = d.GetSpellAtLocation(e.gesture.center.clientX, e.gesture.center.clientY)
              ),
              (g >= 0 || p) &&
              (
                T3Gv.optManager.ActivateTextEdit(i, e, !0),
                s = T3Gv.optManager.Table_GetActiveID()
              )
            )
        }
      }
      if (
        T3Gv.optManagerrightClickParams = new RightClickData(),
        T3Gv.optManagerrightClickParams.TargetID = i.GetID(),
        T3Gv.optManagerrightClickParams.HitPt.x = a.x,
        T3Gv.optManagerrightClickParams.HitPt.y = a.y,
        T3Gv.optManagerrightClickParams.Locked = (this.flags & ConstantData.ObjFlags.SEDO_Lock) > 0,
        - 1 === s &&
        l &&
        (l.select = - 1, t.DataID = - 1),
        null != T3Gv.optManager.GetActiveTextEdit()
      ) {
        var D = T3Gv.optManager.svgDoc.GetActiveEdit(),
          g = - 1,
          h = D.GetSelectedRange(),
          m = this.HasFieldData() ? Resources.Controls.ContextMenus.TextMenuData : Resources.Controls.ContextMenus.TextMenu;
        D &&
          (
            g = D.GetSpellAtLocation(e.gesture.center.clientX, e.gesture.center.clientY)
          ),
          g >= 0 ? T3Gv.optManager.svgDoc.GetSpellCheck().ShowSpellMenu(D, g, e.gesture.center.clientX, e.gesture.center.clientY) : h.end > h.start ? Commands.MainController.ShowContextualMenu(
            m.Id.toLowerCase(),
            e.gesture.center.clientX,
            e.gesture.center.clientY
          ) : this.objecttype === ConstantData.ObjectTypes.SD_OBJT_UIELEMENT ? Commands.MainController.ShowContextualMenu(
            Resources.Controls.ContextMenus.Wireframe.Id.toLowerCase(),
            e.gesture.center.clientX,
            e.gesture.center.clientY
          ) : this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART ? Commands.MainController.ShowContextualMenu(
            Resources.Controls.ContextMenus.Gantt.Id.toLowerCase(),
            e.gesture.center.clientX,
            e.gesture.center.clientY
          ) : l &&
            this.BlockID === s ? t.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER &&
              SDUI.AppSettings.Application !== Resources.Application.Builder ? T3Gv.optManager.Table_ShowContainerMenu(null, e) : T3Gv.optManager.Table_HideUI(this) ||
                T3Gv.optManager.Table_NoTableUI(l) ||
                u ? Commands.MainController.ShowContextualMenu(
                  m.Id.toLowerCase(),
                  e.gesture.center.clientX,
                  e.gesture.center.clientY
                ) : Commands.MainController.ShowContextualMenu(
                  Resources.Controls.ContextMenus.Table.Id.toLowerCase(),
                  e.gesture.center.clientX,
                  e.gesture.center.clientY
                ) : Commands.MainController.ShowContextualMenu(
                  m.Id.toLowerCase(),
                  e.gesture.center.clientX,
                  e.gesture.center.clientY
                )
      } else if (l && this.BlockID === s) {
        this.DataID >= 0 &&
          (this.DataID = - 1);
        var C = this.objecttype;
        switch (
        t.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER &&
        SDUI.AppSettings.Application === Resources.Application.Builder &&
        (C = 0),
        C
        ) {
          case ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER:
            T3Gv.optManager.Table_ShowContainerMenu(null, e);
            break;
          case ConstantData.ObjectTypes.SD_OBJT_UIELEMENT:
          case ConstantData.ObjectTypes.SD_OBJT_UIELEMENT:
            Commands.MainController.ShowContextualMenu(
              Resources.Controls.ContextMenus.Wireframe.Id.toLowerCase(),
              e.gesture.center.clientX,
              e.gesture.center.clientY
            );
            break;
          case ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART:
            Commands.MainController.ShowContextualMenu(
              Resources.Controls.ContextMenus.Gantt.Id.toLowerCase(),
              e.gesture.center.clientX,
              e.gesture.center.clientY
            );
            break;
          case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_COLS:
          case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_ROWS:
          case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_GRID:
            Commands.MainController.ShowContextualMenu(
              Resources.Controls.ContextMenus.Swimlane.Id.toLowerCase(),
              e.gesture.center.clientX,
              e.gesture.center.clientY
            );
            break;
          case ConstantData.ObjectTypes.SD_OBJT_FRAME_CONTAINER:
            Commands.MainController.ShowContextualMenu(
              Resources.Controls.ContextMenus.Frame.Id.toLowerCase(),
              e.gesture.center.clientX,
              e.gesture.center.clientY
            );
            break;
          default:
            if (
              T3Gv.optManager.Table_HideUI(this) ||
              T3Gv.optManager.Table_NoTableUI(l) ||
              u
            ) switch (this.ShapeType) {
              case r.RECT:
              case r.RRECT:
                this.ImageURL &&
                  this.ImageURL.length ||
                  this.EMFHash &&
                  this.EMFHash.length ? Commands.MainController.ShowContextualMenu(
                    Resources.Controls.ContextMenus.Default.Id.toLowerCase(),
                    e.gesture.center.clientX,
                    e.gesture.center.clientY
                  ) : Commands.MainController.ShowContextualMenu(
                    Resources.Controls.ContextMenus.RectContextMenu.Id.toLowerCase(),
                    e.gesture.center.clientX,
                    e.gesture.center.clientY
                  );
                break;
              default:
                Commands.MainController.ShowContextualMenu(
                  Resources.Controls.ContextMenus.Default.Id.toLowerCase(),
                  e.gesture.center.clientX,
                  e.gesture.center.clientY
                )
            } else Commands.MainController.ShowContextualMenu(
              Resources.Controls.ContextMenus.Table.Id.toLowerCase(),
              e.gesture.center.clientX,
              e.gesture.center.clientY
            )
        }
      } else switch (
      S = T3Gv.optManager.SD_GetVisioTextParent(S),
      T3Gv.optManagerrightClickParams.TargetID = S,
      (t = T3Gv.optManager.GetObjectPtr(S, !1)).objecttype
      ) {
        case ConstantData.ObjectTypes.SD_OBJT_D3SYMBOL:
          switch (t.codeLibID) {
            case 'RadialGauge':
            case 'LinearGauge':
              Commands.MainController.ShowContextualMenu(
                Resources.Controls.ContextMenus.Gauge.Id.toLowerCase(),
                e.gesture.center.clientX,
                e.gesture.center.clientY
              );
              break;
            case 'BarChart':
            case 'PieChart':
            case 'LineChart':
            case 'SankeyChart':
              Commands.MainController.ShowContextualMenu(
                Resources.Controls.ContextMenus.Graph.Id.toLowerCase(),
                e.gesture.center.clientX,
                e.gesture.center.clientY
              )
          }
          break;
        case ConstantData.ObjectTypes.SD_OBJT_UIELEMENT:
          Commands.MainController.ShowContextualMenu(
            Resources.Controls.ContextMenus.Wireframe.Id.toLowerCase(),
            e.gesture.center.clientX,
            e.gesture.center.clientY
          );
          break;
        case ConstantData.ObjectTypes.SD_OBJT_BPMN_ACTIVITY:
          Commands.MainController.ShowContextualMenu(
            Resources.Controls.ContextMenus.BPMN_Activity.Id.toLowerCase(),
            e.gesture.center.clientX,
            e.gesture.center.clientY
          );
          break;
        case ConstantData.ObjectTypes.SD_OBJT_BPMN_EVENT_START:
        case ConstantData.ObjectTypes.SD_OBJT_BPMN_EVENT_INTERMEDIATE:
        case ConstantData.ObjectTypes.SD_OBJT_BPMN_EVENT_END:
        case ConstantData.ObjectTypes.SD_OBJT_BPMN_EVENT_START_NI:
        case ConstantData.ObjectTypes.SD_OBJT_BPMN_EVENT_INTERMEDIATE_NI:
        case ConstantData.ObjectTypes.SD_OBJT_BPMN_EVENT_INTERMEDIATE_THROW:
          gLineDrawBPMNEventManager.GetLineRightClickMenuID(t.objecttype),
            Commands.MainController.ShowContextualMenu(
              Resources.Controls.ContextMenus.BPMN_Event.Id.toLowerCase(),
              e.gesture.center.clientX,
              e.gesture.center.clientY
            );
          break;
        case ConstantData.ObjectTypes.SD_OBJT_BPMN_GATEWAY:
          Commands.MainController.ShowContextualMenu(
            Resources.Controls.ContextMenus.BPMN_Gateway.Id.toLowerCase(),
            e.gesture.center.clientX,
            e.gesture.center.clientY
          );
          break;
        case ConstantData.ObjectTypes.SD_OBJT_BPMN_DATAOBJECT:
          Commands.MainController.ShowContextualMenu(
            Resources.Controls.ContextMenus.BPMN_Data.Id.toLowerCase(),
            e.gesture.center.clientX,
            e.gesture.center.clientY
          );
          break;
        case ConstantData.ObjectTypes.SD_OBJT_BPMN_CHOREOGRAPHY:
          Commands.MainController.ShowContextualMenu(
            Resources.Controls.ContextMenus.BPMN_Choreo.Id.toLowerCase(),
            e.gesture.center.clientX,
            e.gesture.center.clientY
          );
          break;
        case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_COLS:
        case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_ROWS:
        case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_GRID:
          Commands.MainController.ShowContextualMenu(
            Resources.Controls.ContextMenus.Swimlane.Id.toLowerCase(),
            e.gesture.center.clientX,
            e.gesture.center.clientY
          );
          break;
        case ConstantData.ObjectTypes.SD_OBJT_FRAME_CONTAINER:
          Commands.MainController.ShowContextualMenu(
            Resources.Controls.ContextMenus.Frame.Id.toLowerCase(),
            e.gesture.center.clientX,
            e.gesture.center.clientY
          );
          break;
        case ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY:
          Commands.MainController.ShowContextualMenu(
            Resources.Controls.ContextMenus.Multiplicity.Id.toLowerCase(),
            e.gesture.center.clientX,
            e.gesture.center.clientY
          );
          break;
        case ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER:
          if (
            SDUI.AppSettings.Application === Resources.Application.Builder
          ) {
            Commands.MainController.ShowContextualMenu(
              Resources.Controls.ContextMenus.SmartContainer.Id.toLowerCase(),
              e.gesture.center.clientX,
              e.gesture.center.clientY
            );
            break
          }
        default:
          switch (t.ShapeType) {
            case r.RECT:
            case r.RRECT:
              t.ImageURL &&
                t.ImageURL.length ||
                t.EMFHash &&
                t.EMFHash.length ? Commands.MainController.ShowContextualMenu(
                  Resources.Controls.ContextMenus.Default.Id.toLowerCase(),
                  e.gesture.center.clientX,
                  e.gesture.center.clientY
                ) : Commands.MainController.ShowContextualMenu(
                  Resources.Controls.ContextMenus.RectContextMenu.Id.toLowerCase(),
                  e.gesture.center.clientX,
                  e.gesture.center.clientY
                );
              break;
            default:
              Commands.MainController.ShowContextualMenu(
                Resources.Controls.ContextMenus.Default.Id.toLowerCase(),
                e.gesture.center.clientX,
                e.gesture.center.clientY
              )
          }
      }
    }
  }

  StartNewObjectDrawTrackCommon(e, t, a) {
    var r = e - T3Gv.optManager.actionStartX,
      i = t - T3Gv.optManager.actionStartY,
      n = {},
      o = (
        Math.sqrt(r * r + i * i),
        $.extend(!0, {
        }, T3Gv.optManager.actionBBox)
      );
    o.width = o.width + r,
      o.height = o.height + i,
      n.x = o.x + o.width,
      n.y = o.y + o.height;
    var s = T3Gv.optManager.OverrideSnaps(a);
    T3Gv.docHandler.documentConfig.enableSnap &&
      !s &&
      (
        n = T3Gv.docHandler.SnapToGrid(n),
        o.width = n.x - o.x,
        o.height = n.y - o.y
      ),
      o.width < 0 &&
      (o.x = e, o.width = - o.width),
      o.height < 0 &&
      (o.y = t, o.height = - o.height),
      T3Gv.optManager.actionNewBBox = $.extend(!0, {
      }, o),
      this.UpdateFrame(T3Gv.optManager.actionNewBBox),
      this.Resize(T3Gv.optManager.actionSvgObject, o, this)
  }

  StartNewObjectDrawDoAutoScroll() {
    T3Gv.optManager.autoScrollTimerId = T3Gv.optManager.autoScrollTimer.setTimeout('StartNewObjectDrawDoAutoScroll', 100);
    var e = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(T3Gv.optManager.autoScrollXPos, T3Gv.optManager.autoScrollYPos);
    e = T3Gv.optManager.DoAutoGrowDrag(e),
      T3Gv.docHandler.ScrollToPosition(e.x, e.y),
      this.StartNewObjectDrawTrackCommon(e.x, e.y, null)
  }

  LM_DrawTrack(e) {
    if (- 1 == T3Gv.optManager.actionStoredObjectId) return !1;
    var t = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
      a = T3Gv.optManager.OverrideSnaps(e);
    T3Gv.docHandler.documentConfig.enableSnap &&
      !a &&
      (t = T3Gv.docHandler.SnapToGrid(t));
    var r = (t = T3Gv.optManager.DoAutoGrowDrag(t)).x,
      i = t.y;
    this.AutoScrollCommon(e, !0, 'StartNewObjectDrawDoAutoScroll') &&
      (
        this.LM_DrawDuringTrack(r, i),
        this.StartNewObjectDrawTrackCommon(r, i, e)
      )
  }

  LM_DrawRelease(e) {
    T3Gv.optManager.unbindActionClickHammerEvents(),
      this.ResetAutoScrollTimer();
    var t = {};
    var Collab_Data = {};
    t.x = T3Gv.optManager.actionNewBBox.x,
      t.y = T3Gv.optManager.actionNewBBox.y,
      t.width = T3Gv.optManager.actionNewBBox.width,
      t.height = T3Gv.optManager.actionNewBBox.height,
      T3Gv.optManager.SetObjectFrame(T3Gv.optManager.actionStoredObjectId, t),
      this.LM_DrawPostRelease(T3Gv.optManager.actionStoredObjectId),
      Collab_Data = {},
      T3Gv.optManager.BuildCreateMessage(Collab_Data, !0),
      T3Gv.optManager.PostObjectDraw()
  }

  LM_DrawPreTrack() {
    return !0
  }

  LM_DrawDuringTrack(e, t) {
  }

  LM_DrawPostRelease() {
  }

  LM_DrawClick_ExceptionCleanup(e) {
    T3Gv.optManager.unbindActionClickHammerEvents(),
      this.ResetAutoScrollTimer(),
      T3Gv.optManager.linkParams = null,
      T3Gv.optManager.actionStoredObjectId = - 1,
      T3Gv.optManager.actionSvgObject = null,
      T3Gv.optManager.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDragStart)
  }



  LM_DrawClick(e, t) {

    console.log('ListManager.BaseShape.prototype.LM_DrawClick', e, t);

    try {
      this.Frame.x = e,
        this.Frame.y = t,
        this.prevBBox = $.extend(!0, {
        }, this.Frame),
        T3Gv.optManager.WorkAreaHammer.on('drag', EvtUtil.Evt_DrawTrackHandlerFactory(this)),
        T3Gv.optManager.WorkAreaHammer.on('dragend', EvtUtil.Evt_DrawReleaseHandlerFactory(this))
    } catch (e) {
      this.LM_DrawClick_ExceptionCleanup(e);
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }


  RotateKnobCenterDivisor() {
    return {
      x: 2,
      y: 2
    }
  }

  OffsetShape(e, t, a, r) {
    var i,
      n,
      o,
      s,
      l;
    if (
      this.moreflags & ConstantData.ObjMoreFlags.SED_MF_Container &&
      a
    ) for (n = a.length, i = 0; i < n; i++) s = a[i],
      (o = T3Gv.optManager.GetObjectPtr(s, !0)) &&
      (
        l = r ? r[o.BlockID] : null,
        o.OffsetShape(e, t, l),
        T3Gv.optManager.SetLinkFlag(s, ConstantData.LinkFlags.SED_L_MOVE),
        T3Gv.optManager.AddToDirtyList(s)
      );
    this.Frame.x += e,
      this.Frame.y += t,
      this.r.x += e,
      this.r.y += t,
      this.inside.x += e,
      this.inside.y += t,
      this.trect.x += e,
      this.trect.y += t,
      this.GetGraph(!0) &&
      T3Gv.optManager.GraphShift(this, e, t)
  }

  SetShapeOrigin(e, t, a) {
    var r = 0,
      i = 0;
    null != e &&
      (r = e - this.Frame.x),
      null != t &&
      (i = t - this.Frame.y),
      this.OffsetShape(r, i, a)
  }

  SetShapeIndent(e) {
    var t,
      a,
      r = 1,
      i = 1,
      n = 1,
      o = 1;
    a = this.inside.width,
      t = this.inside.height,
      e &&
      (
        r = 1 - (this.left_sindent + this.right_sindent),
        n = 1 - (this.bottom_sindent + this.top_sindent),
        i = 1 - (this.left_sindent + this.right_sindent),
        o = 1 - (this.bottom_sindent + this.top_sindent)
      ),
      this.tindent.left = this.left_sindent * a / r,
      this.tindent.top = this.top_sindent * t / n,
      this.tindent.right = this.right_sindent * a / i,
      this.tindent.bottom = this.bottom_sindent * t / o
  }

  UpdateFrame(e) {
    var t = 0,
      a = 0;
    this.inside.width,
      this.inside.height,
      e &&
      // ListManager.BaseDrawingObject.prototype.UpdateFrame.call(this, e),
      // Double
      super.UpdateFrame(e),
      Utils2.CopyRect(this.r, this.Frame),
      this.StyleRecord &&
      (
        this.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
        (this.StyleRecord.Line.BThick = 0),
        this.StyleRecord.Line.BThick ? null == this.polylist ? (this.StyleRecord.Line.Thickness, t = 0) : a = this.StyleRecord.Line.Thickness / 2 : a = t = this.StyleRecord.Line.Thickness / 2,
        this.CalcEffectSettings(this.Frame, this.StyleRecord, !1)
      ),
      T3Gv.optManager.SetShapeR(this),
      Utils2.CopyRect(this.inside, this.Frame),
      Utils2.InflateRect(this.inside, - t, - t),
      Utils2.CopyRect(this.trect, this.Frame),
      Utils2.InflateRect(this.trect, - a, - a),
      this.SetShapeIndent(!1),
      Utils2.SubRect(this.trect, this.tindent),
      null == this.GetTable(!1) &&
      Utils2.SubRect(this.trect, this.TMargins)
  }

  GetSVGFrame(e) {
    var t = {};
    return null == e &&
      (e = this.Frame),
      Utils2.CopyRect(t, e),
      this.StyleRecord.Line.BThick &&
      null == this.polylist &&
      Utils2.InflateRect(t, this.StyleRecord.Line.BThick, this.StyleRecord.Line.BThick),
      t
  }

  GetSnapRect() {
    //'use strict';
    var e = {};
    if (0 !== this.RotationAngle) {
      var t = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !0, null),
        a = - this.RotationAngle / (180 / ConstantData.Geometry.PI);
      Utils3.RotatePointsAboutCenter(this.Frame, a, t),
        Utils2.GetPolyRect(e, t)
    } else Utils2.CopyRect(e, this.Frame);
    return e
  }

  CanSnapToShapes() {
    var e = ConstantData.ObjectTypes;
    switch (this.objecttype) {
      case e.SD_OBJT_SWIMLANE_ROWS:
      case e.SD_OBJT_SWIMLANE_COLS:
      case e.SD_OBJT_SWIMLANE_GRID:
      case e.SD_OBJT_BPMN_POOL:
      case e.SD_OBJT_SHAPECONTAINER:
      case e.SD_OBJT_TABLE_WITH_SHAPECONTAINER:
        return - 1
    }
    return this.BlockID
  }

  IsSnapTarget() {
    var e = ConstantData.ObjectTypes;
    switch (this.objecttype) {
      case e.SD_OBJT_SWIMLANE_ROWS:
      case e.SD_OBJT_SWIMLANE_COLS:
      case e.SD_OBJT_SWIMLANE_GRID:
      case e.SD_OBJT_BPMN_POOL:
      case e.SD_OBJT_SHAPECONTAINER:
      case e.SD_OBJT_TABLE_WITH_SHAPECONTAINER:
        return !1
    }
    return !this.hooks.length &&
      !(T3Gv.optManager.FindChildArray(this.BlockID, - 1) >= 0)
  }

  GetAlignRect() {
    var e = $.extend(!0, {
    }, this.Frame);
    if (0 !== this.RotationAngle) {
      var t = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !0, null),
        a = - this.RotationAngle / (180 / ConstantData.Geometry.PI);
      Utils3.RotatePointsAboutCenter(this.Frame, a, t),
        Utils2.GetPolyRect(e, t)
    }
    return e
  }

  GetCustomConnectPointsDirection(e) {
    var t,
      a,
      r,
      i,
      n = this.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        this.ConnectPoints,
      o = this.GetTargetPoints(
        null,
        ConstantData.HookFlags.SED_LC_NoSnaps | ConstantData.HookFlags.SED_LC_ForceEnd,
        null
      ),
      s = 1,
      l = 1,
      S = 1,
      c = 1,
      u = - 1,
      p = ConstantData.Defines.SED_CDim,
      d = !1,
      D = ConstantData.ActionArrow,
      g = {
        x: 0,
        y: 0,
        width: p = ConstantData.Defines.SED_CDim,
        height: p
      };
    if (this.RotationAngle) {
      var h = - this.RotationAngle / (180 / ConstantData.Geometry.PI);
      Utils3.RotatePointsAboutCenter(g, h, o)
    }
    var m = function (e, t) {
      null == r ? (u = t, r = Math.abs(e - p / 2)) : (i = Math.abs(e - p / 2)) < r &&
        (u = t, r = i)
    };
    if (o.length < 2 && (d = !0), n) {
      s = 0,
        l = 0,
        S = 0,
        c = 0;
      g = new Rectangle(0, 0, 0, 0);
      for (t = o.length, Utils2.GetPolyRect(g, o), a = 0; a < t; a++) o[a].x -= g.x,
        o[a].y -= g.y;
      if (
        g.width < 1000 &&
        Utils2.InflateRect(g, 1000, 0),
        g.height < 1000 &&
        Utils2.InflateRect(g, 0, 1000),
        g.height > g.width
      ) {
        for (a = 0; a < t; a++) o[a].y < g.height / 6 ? (s++, e === D.UP && m(o[a].x, a)) : o[a].y >= 5 * g.height / 6 ? (l++, e === D.DOWN && m(o[a].x, a)) : o[a].x < g.width / 6 ? (c++, e === D.LEFT && m(o[a].y, a)) : o[a].x >= 5 * g.width / 6 &&
          (S++, e === D.RIGHT && m(o[a].y, a));
        0 === c &&
          0 === S &&
          s &&
          l ? !0 : 0 === c &&
          0 === S &&
          d &&
          (s || l) &&
        !0
      } else {
        for (a = 0; a < t; a++) o[a].x < g.width / 6 ? (c++, e === D.LEFT && m(o[a].y, a)) : o[a].x >= 5 * g.width / 6 ? (S++, e === D.RIGHT && m(o[a].y, a)) : o[a].y < g.height / 6 ? (s++, e === D.UP && m(o[a].x, a)) : o[a].y >= 5 * g.height / 6 &&
          (l++, e === D.DOWN && m(o[a].x, a));
        0 === s &&
          0 === l &&
          c &&
          S ? !0 : 0 === s &&
          0 === l &&
          d &&
          (c || S) &&
        !0
      }
    }
    return {
      left: c,
      right: S,
      top: s,
      bottom: l,
      index: u
    }
  }

  AdjustAutoInsertShape(e, t, a) {
    var r,
      i,
      n,
      o,
      s = this.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        this.ConnectPoints,
      l = 0,
      S = 0,
      c = 0,
      u = 0,
      p = 0,
      d = 0,
      D = (ConstantData.Defines.SED_CDim, []),
      g = !1;
    if (
      pts = this.GetTargetPoints(
        null,
        ConstantData.HookFlags.SED_LC_NoSnaps | ConstantData.HookFlags.SED_LC_ForceEnd,
        null
      ),
      pts.length < 2 ? (
        T3Gv.optManager.linkParams &&
        (T3Gv.optManager.linkParams.AutoSinglePoint = !0),
        o = !0
      ) : (
        T3Gv.optManager.linkParams &&
        (T3Gv.optManager.linkParams.AutoSinglePoint = !1),
        o = !1
      ),
      s
    ) {
      var h = new Rectangle(0, 0, 0, 0);
      for (r = pts.length, Utils2.GetPolyRect(h, pts), i = 0; i < r; i++) pts[i].x -= h.x,
        pts[i].y -= h.y;
      if (
        h.width < 1000 &&
        Utils2.InflateRect(h, 1000, 0),
        h.height < 1000 &&
        Utils2.InflateRect(h, 0, 1000),
        h.height > h.width
      ) {
        for (i = 0; i < r; i++) pts[i].y < h.height / 6 ? c++ : pts[i].y >= 5 * h.height / 6 ? u++ : pts[i].x < h.width / 6 ? d++ : pts[i].x >= 5 * h.width / 6 &&
          p++;
        0 === d &&
          0 === p &&
          c &&
          u ? l = !0 : 0 === d &&
          0 === p &&
          o &&
          (c || u) &&
        (S = !0)
      } else {
        for (i = 0; i < r; i++) pts[i].x < h.width / 6 ? d++ : pts[i].x >= 5 * h.width / 6 ? p++ : pts[i].y < h.height / 6 ? c++ : pts[i].y >= 5 * h.height / 6 &&
          u++;
        0 === c &&
          0 === u &&
          d &&
          p ? S = !0 : 0 === c &&
          0 === u &&
          o &&
          (d || p) &&
        (l = !0)
      }
      D.push(this.BlockID),
        this.Frame.x - e.x,
        this.Frame.y - e.y,
        o ||
        (
          l ? t ? 0 !== this.RotationAngle &&
            180 !== this.RotationAngle &&
            (
              a ||
              (
                T3Gv.optManager.RotateShapes(0, D),
                (n = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID)) &&
                this.Rotate(n, 0)
              ),
              g = !0
            ) : - 90 !== this.RotationAngle &&
            90 !== this.RotationAngle &&
          (
            a ||
            (
              T3Gv.optManager.RotateShapes(- 90, D),
              (n = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID)) &&
              this.Rotate(n, - 90)
            ),
            g = !0
          ) : S &&
          (
            t ? - 90 !== this.RotationAngle &&
              90 !== this.RotationAngle &&
              (
                a ||
                (
                  T3Gv.optManager.RotateShapes(- 90, D),
                  (n = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID)) &&
                  this.Rotate(n, - 90)
                ),
                g = !0
              ) : 0 !== this.RotationAngle &&
              180 !== this.RotationAngle &&
            (
              a ||
              (
                T3Gv.optManager.RotateShapes(0, D),
                g = !0,
                (n = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID)) &&
                this.Rotate(n, 0)
              ),
              g = !0
            )
          )
        )
    }
    return g
  }

  TRectToFrame(e, t) {
    var a,
      r,
      i = 0,
      n = 0;
    if (
      this.StyleRecord.Line.BThick &&
        null == this.polylist ? (this.StyleRecord.Line.Thickness, r = 0) : r = this.StyleRecord.Line.Thickness / 2,
      this.trect = Utils1.DeepCopy(e),
      a = Utils1.DeepCopy(this.Frame),
      this.inside = new Rectangle(e.x, e.y, e.width, e.height),
      null == this.GetTable(!1) &&
      Utils2.Add2Rect(this.inside, this.TMargins),
      this.SetShapeIndent(!0),
      Utils2.Add2Rect(this.inside, this.tindent),
      this.Frame = Utils1.DeepCopy(this.inside),
      Utils2.InflateRect(this.Frame, r, r),
      t ||
      (
        this.Frame.width < this.sizedim.width &&
        (i = this.sizedim.width - this.Frame.width, this.Frame.x = a.x),
        this.Frame.height < this.sizedim.height &&
        (n = this.sizedim.height - this.Frame.height, this.Frame.y = a.y)
      ),
      i > 0 ||
      n > 0
    ) {
      var o = Utils1.DeepCopy(this.Frame);
      return o.width += i,
        o.height += n,
        void this.UpdateFrame(o)
    }
    Utils2.CopyRect(this.r, this.Frame),
      T3Gv.optManager.SetShapeR(this)
  }

  SetSize(e, t, a) {
    var r,
      i,
      n,
      o = {};
    o.x = this.Frame.x,
      o.y = this.Frame.y,
      o.width = this.Frame.width,
      o.height = this.Frame.height;
    var s = this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART,
      l = !1;
    if (e && (o.width = e), t && (o.height = t), t || e) {
      for (
        r = T3Gv.optManager.actionBBox,
        n = T3Gv.optManager.actionNewBBox,
        T3Gv.optManager.actionBBox = Utils1.DeepCopy(this.Frame),
        T3Gv.optManager.actionNewBBox = Utils1.DeepCopy(this.Frame),
        this.HandleActionTriggerCallResize(o, a, null),
        T3Gv.optManager.actionBBox = r,
        T3Gv.optManager.actionNewBBox = n,
        a != ConstantData.ActionTriggerType.TABLE_EDIT &&
        a != ConstantData.ActionTriggerType.LINE_THICKNESS &&
        (
          e &&
          (this.sizedim.width = this.Frame.width, l = !0),
          t &&
          (this.sizedim.height = this.Frame.height, l = !0)
        ),
        T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
        l &&
        s &&
        T3Gv.optManager.PlanningTableUpdateGeometry(this, !0),
        i = 0;
        i < this.hooks.length;
        i++
      ) T3Gv.optManager.SetLinkFlag(this.hooks[i].objid, ConstantData.LinkFlags.SED_L_MOVE);
      // if (this instanceof ListManager.Polygon) {
      // Double === TODO
      // if (this instanceof GlobalDataShape.Polygon) {
      if (this instanceof Instance.Shape.Polygon) {
        var S = this.RegenerateVectors(o.width, o.height);
        S &&
          (this.VertexArray = S),
          this.polylist &&
          this.ShapeType === ConstantData.ShapeType.POLYGON &&
          this.ScaleObject(0, 0, 0, 0, 0, 0)
      }
      T3Gv.optManager.AddToDirtyList(this.BlockID),
        T3Gv.optManager.theActionTable = null,
        this.rflags &&
        (
          e &&
          (
            this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1)
          ),
          t &&
          (
            this.rflags = Utils2.SetFlag(
              this.rflags,
              ConstantData.FloatingPointDim.SD_FP_Height,
              !1
            )
          )
        )
    }
  }

  UpdateDimensions(e, t, a) {
    var r = {};
    r.x = this.Frame.x,
      r.y = this.Frame.y,
      r.width = this.Frame.width,
      r.height = this.Frame.height,
      t &&
      (r.width = t),
      a &&
      (r.height = a),
      this.UpdateFrame(r)
  }

  GetHookFlags() {
    return ConstantData.HookFlags.SED_LC_Shape | ConstantData.HookFlags.SED_LC_ArrayMod | ConstantData.HookFlags.SED_LC_AttachToLine
  }

  AllowLink() {
    var e,
      t;
    return t = this.flags & ConstantData.ObjFlags.SEDO_DropOnTable,
      !!(
        e = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !1)
      ) &&
      (
        e.flags & ConstantData.SessionFlags.SEDS_SLink ||
        e.flags & ConstantData.SessionFlags.SEDS_AttLink ||
        t
      )
  }

  IsSwimlane() {
    var e = ConstantData.ObjectTypes;
    switch (this.objecttype) {
      case e.SD_OBJT_SWIMLANE_COLS:
      case e.SD_OBJT_SWIMLANE_ROWS:
      case e.SD_OBJT_SWIMLANE_GRID:
      case e.SD_OBJT_FRAME_CONTAINER:
        return !0
    }
    return !1
  }

  IsOKFlowChartShape(e) {
    var t = T3Gv.optManager.GetObjectPtr(e, !1);
    return t &&
      t.flags & ConstantData.ObjFlags.SEDO_TextOnly ||
      t.IsSwimlane() ? 0 : e
  }

  PreventLink() {
    return !!this.IsSwimlane()
  }

  GetHookPoints(e) {
    e = this.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
      this.ConnectPoints;
    var t = this.GetTable(!1),
      a = this.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
        t;
    if (e || a) {
      var r = [];
      e ? r = this.ConnectPoints : a &&
        (r = T3Gv.optManager.Table_GetRowConnectPoints(this, t));
      var i,
        n,
        o,
        s = [];
      ConstantData.Defines.SED_CDim;
      for (n = r.length, i = 0; i < n; i++) o = {
        x: r[i].x,
        y: r[i].y,
        id: ConstantData.HookPts.SED_CustomBase + i
      },
        s.push(o);
      return s
    }
    return [{
      x: ConstantData.Defines.SED_CDim / 2,
      y: 0,
      id: ConstantData.HookPts.SED_KTC
    },
    {
      x: ConstantData.Defines.SED_CDim,
      y: ConstantData.Defines.SED_CDim / 2,
      id: ConstantData.HookPts.SED_KRC
    },
    {
      x: ConstantData.Defines.SED_CDim / 2,
      y: ConstantData.Defines.SED_CDim,
      id: ConstantData.HookPts.SED_KBC
    },
    {
      x: 0,
      y: ConstantData.Defines.SED_CDim / 2,
      id: ConstantData.HookPts.SED_KLC
    }
    ]
  }

  SetHookAlign(e, t) {
    var a,
      r,
      i;
    switch (e) {
      case ConstantData.HookPts.SED_AKCL:
        (a = T3Gv.optManager.FindChildArray(this.BlockID, - 1)) >= 0 &&
          (r = T3Gv.optManager.GetObjectPtr(a, !1)) &&
          (
            i = r.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn &&
            0 == (
              r.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear
            ),
            r.hooks.length &&
            0 === r.hooks[0].connect.x &&
            !i &&
            r._SetDirection(!0, !1, !1)
          );
        break;
      case ConstantData.HookPts.SED_AKCR:
        (a = T3Gv.optManager.FindChildArray(this.BlockID, - 1)) >= 0 &&
          (r = T3Gv.optManager.GetObjectPtr(a, !1)) &&
          (
            i = r.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn &&
            0 == (
              r.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear
            ),
            r.hooks.length &&
            r.hooks[0].connect.x === ConstantData.Defines.SED_CDim &&
            !i &&
            r._SetDirection(!0, !1, !1)
          )
    }
  }

  HookToPoint(e, t) {
    var a = [],
      r = [
        {
          x: 0,
          y: 0
        }
      ],
      i = {},
      n = - 1,
      o = !1,
      s = 0,
      l = ConstantData.HookPts,
      S = ConstantData.Defines.SED_CDim,
      c = ConstantData.HookFlags;
    if (
      this.flags & ConstantData.ObjFlags.SEDO_Obj1 &&
      this.Pr_Format &&
      this.Pr_Format(this.BlockID),
      e === l.SED_KAT
    ) r[0].x = this.attachpoint.x,
      r[0].y = this.attachpoint.y,
      this.extraflags & ConstantData.ExtraFlags.SEDE_FlipHoriz &&
      (r[0].x = S - r[0].x),
      this.extraflags & ConstantData.ExtraFlags.SEDE_FlipVert &&
      (r[0].y = S - r[0].y);
    else if (e === l.SED_KATD) r[0].x = this.attachpoint.x,
      r[0].y = this.attachpoint.y;
    else switch (
    e >= ConstantData.HookPts.SED_AKCT &&
    e < ConstantData.HookPts.SED_CustomBase &&
    (
      e -= ConstantData.HookPts.SED_AKCT - ConstantData.HookPts.SED_KCT,
      o = !0
    ),
    e
    ) {
      case l.SED_KCTL:
        r[0].x = 0,
          r[0].y = 0;
        break;
      case l.SED_KCTR:
        r[0].x = S,
          r[0].y = 0;
        break;
      case l.SED_KCBL:
        r[0].x = 0,
          r[0].y = S;
        break;
      case l.SED_KCBR:
        r[0].x = S,
          r[0].y = S;
        break;
      case l.SED_KCT:
        r[0].x = S / 2,
          r[0].y = 0,
          s = c.SED_LC_VOnly;
        break;
      case l.SED_KCB:
        r[0].x = S / 2,
          r[0].y = S,
          s = c.SED_LC_VOnly;
        break;
      case l.SED_KCL:
        r[0].x = 0,
          r[0].y = S / 2,
          s = c.SED_LC_HOnly;
        break;
      case l.SED_KCC:
        r[0].x = S / 2,
          r[0].y = S / 2;
        break;
      case l.SED_KCR:
        r[0].x = S,
          r[0].y = S / 2,
          s = c.SED_LC_HOnly;
        break;
      default:
        if (null == (a = this.GetHookPoints())) return null;
        for (var u = 0; u < a.length; u++) if (e === a[u].id) {
          n = u,
            r[0].x = a[u].x,
            r[0].y = a[u].y;
          break
        }
        if (n < 0) switch (e) {
          case 1:
            n = 1,
              r[0].x = S / 2,
              r[0].y = 0;
            break;
          case 2:
            n = 1,
              r[0].x = S,
              r[0].y = S / 2;
            break;
          case 3:
            n = 1,
              r[0].x = S / 2,
              r[0].y = S;
            break;
          case 4:
            n = 1,
              r[0].x = 0,
              r[0].y = S / 2
        }
        if (n < 0) return null
    }
    if (
      (
        this.RotationAngle ||
        this.extraflags & (
          ConstantData.ExtraFlags.SEDE_FlipHoriz | ConstantData.ExtraFlags.SEDE_FlipVert
        )
      ) &&
      o &&
      (
        i = this.GetPerimPts(- 1, r, e, !0, null, - 1),
        null == (r = this.PolyGetTargets(i[0], s, this.Frame))
      )
    ) return i[0];
    if (i = this.GetPerimPts(- 1, r, e, !1, null, - 1), e === l.SED_KATD) if (
      this.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText
    ) {
      if (this.hookdisp.x || this.hookdisp.y) {
        var p = T3Gv.optManager.GetObjectPtr(this.hooks[0].objid, !1);
        if (p) {
          var d = {
            x: p.Frame.x + p.Frame.width / 2,
            y: p.Frame.y + p.Frame.height / 2
          },
            D = [];
          D.push({
            x: d.x + this.hookdisp.x,
            y: d.y + this.hookdisp.y
          });
          var g = - p.RotationAngle / (180 / ConstantData.Geometry.PI);
          Utils3.RotatePointsAboutCenter(p.Frame, g, D),
            D[0].x -= d.x,
            D[0].y -= d.y,
            i[0].x -= D[0].x,
            i[0].y -= D[0].y
        }
      }
    } else i[0].x -= this.hookdisp.x,
      i[0].y -= this.hookdisp.y;
    return i[0]
  }

  IsCoManager(e) {
    var t,
      a = !1;
    return this.hooks &&
      this.hooks.length &&
      (t = T3Gv.optManager.GetObjectPtr(this.hooks[0].objid, !1)) &&
      t.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
      (a = t.IsCoManager(e)),
      a
  }


  RRect_GetCornerSize(e) {
    var t = this.Frame.width,
      a = this.Frame.height,
      r = t;
    if (
      a < r &&
      (r = a),
      e &&
      (r = e),
      this.moreflags & ConstantData.ObjMoreFlags.SED_MF_FixedRR
    ) {
      var i = ConstantData.Defines.RRectFixedDim * this.shapeparam,
        n = 0.4 * r;
      return i > n &&
        (i = n),
        i
    }
    return r * this.shapeparam
  }


  GetPerimPts(e, t, a, r, i, n) {
    var o,
      s,
      l = [],
      S = {},
      c = !1;
    s = t.length;
    var u = 0;
    if (
      this.ShapeType === ConstantData.ShapeType.RECT &&
      // (u = ListManager.RRect.prototype.GetCornerSize.apply(this)),
      // Double ===
      (u = this.RRect_GetCornerSize()),
      u > 0
      // ) return ListManager.RRect.prototype.GetPerimPts.call(this, e, t, a, r, i, n);
      // Double ===
    ) return this.RRect_GetPerimPts(e, t, a, r, i, n);
    if (
      1 === s &&
      t[0].y === - ConstantData.SEDA_Styles.SEDA_CoManager &&
      this.IsCoManager(S)
    ) return l.push(new Point(S.x, S.y)),
      null != t[0].id &&
      (l[0].id = t[0].id),
      l;
    var p = this.GetTable(!1);
    if (null != i && p) {
      var d = T3Gv.optManager.Table_GetPerimPts(this, p, i, t);
      d &&
        (l = d, c = !0)
    }
    if (!c) for (var D = 0; D < s; D++) l[D] = {
      x: 0,
      y: 0,
      id: 0
    },
      l[D].x = t[D].x / ConstantData.Defines.SED_CDim * this.Frame.width + this.Frame.x,
      l[D].y = t[D].y / ConstantData.Defines.SED_CDim * this.Frame.height + this.Frame.y,
      null != t[D].id &&
      (l[D].id = t[D].id);
    return r ||
      (
        o = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
        Utils3.RotatePointsAboutCenter(this.Frame, o, l)
      ),
      l
  }

  RRect_GetPerimPts(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u,
      p = [],
      d = [],
      D = {},
      g = [
        0,
        0
      ],
      h = ConstantData.Defines.SED_CDim;
    if (
      1 === (S = t.length) &&
      t[0].y === - ConstantData.SEDA_Styles.SEDA_CoManager &&
      this.IsCoManager(D)
    ) return p.push(new Point(D.x, D.y)),
      null != t[0].id &&
      (p[0].id = t[0].id),
      p;
    if (a === ConstantData.HookPts.SED_KAT && null == i)
      // return p = ListManager.BaseDrawingObject.prototype.GetPerimPts.call(this, e, t, a, !1, i, n);
      // DOUBLE === todo
      return p = new BaseDrawingObject(this).GetPerimPts(e, t, a, !1, i, n);

    var m = this.GetTable(!1);
    if (null != i && m) {
      var C = T3Gv.optManager.Table_GetPerimPts(this, m, i, t);
      if (C) return p = C,
        !0,
        r ||
        (
          l = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
          Utils3.RotatePointsAboutCenter(this.Frame, l, p)
        ),
        p
    }
    S = t.length;
    var y = this.flags & ConstantData.ObjFlags.SEDO_UseConnect,
      f = this.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
        m;
    if (y || f) for (u = 0; u < S; u++) p[u] = {
      x: 0,
      y: 0,
      id: 0
    },
      p[u].x = t[u].x / ConstantData.Defines.SED_CDim * this.Frame.width + this.Frame.x,
      p[u].y = t[u].y / ConstantData.Defines.SED_CDim * this.Frame.height + this.Frame.y,
      null != t[u].id &&
      (p[u].id = t[u].id);
    else for (
      // p = ListManager.BaseDrawingObject.prototype.GetPerimPts.call(this, e, t, a, !0, i, n),
      // Double === todo
      p = new BaseDrawingObject(this).GetPerimPts(e, t, a, !0, i, n),

      s = this.Frame.width,
      this.Frame.height < s &&
      (s = this.Frame.height),
      o = this.GetCornerSize() * ConstantData.Defines.SED_RoundFactor,
      d = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),
      S = p.length,
      u = 0;
      u < S;
      u++
    ) 0 === t[u].x &&
      0 === t[u].y ? (p[u].x += o, p[u].y += o) : 0 === t[u].x &&
        t[u].y === h ? (p[u].x += o, p[u].y -= o) : t[u].x === h &&
          0 === t[u].y ? (p[u].x -= o, p[u].y += o) : t[u].x === h &&
            t[u].y === h ? (p[u].x -= o, p[u].y -= o) : t[u].x < h / 4 ? (c = T3Gv.optManager.PolyGetIntersect(d, p[u].y, g, null, !1)) &&
              (p[u].x = g[0], c > 1 && g[1] < p[u].x && (p[u].x = g[1])) : t[u].x > 3 * h / 4 ? (c = T3Gv.optManager.PolyGetIntersect(d, p[u].y, g, null, !1)) &&
                (p[u].x = g[0], c > 1 && g[1] > p[u].x && (p[u].x = g[1])) : t[u].y < h / 4 ? (c = T3Gv.optManager.PolyGetIntersect(d, p[u].x, g, null, !0)) &&
                  (p[u].y = g[0], c > 1 && g[1] < p[u].y && (p[u].y = g[1])) : t[u].y > 3 * h / 4 &&
                  (c = T3Gv.optManager.PolyGetIntersect(d, p[u].x, g, null, !0)) &&
    (p[u].y = g[0], c > 1 && g[1] > p[u].y && (p[u].y = g[1])),
      null != t[u].id &&
      (p[u].id = t[u].id);
    return r ||
      (
        l = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
        Utils3.RotatePointsAboutCenter(this.Frame, l, p)
      ),
      p
  }


  ChangeTarget(e, t, a, r, i, needChangeTarget) {

    // e, t, a, r, i, n

    // e=6
    // t=7
    // a=null
    // r=0
    // i= {x:15000,y:30000}
    // n =true


    if (needChangeTarget) {
      var businessMgr = Business.GetSelectionBusinessManager(this.BlockID);

      if (businessMgr === null) {
        businessMgr = T3Gv.gBusinessManager;
      }

      businessMgr.ChangeTarget(t);

      // null == o &&
      //   (o = T3Gv.gBusinessManager),
      //   o.ChangeTarget(t)
    }
  }

  GetTargetPoints(e, t, a) {
    var r = [],
      i = [
        {
          x: 0,
          y: 0
        },
        {
          x: ConstantData.Defines.SED_CDim / 4,
          y: 0
        },
        {
          x: ConstantData.Defines.SED_CDim / 2,
          y: 0
        },
        {
          x: 3 * ConstantData.Defines.SED_CDim / 4,
          y: 0
        },
        {
          x: ConstantData.Defines.SED_CDim,
          y: 0
        },
        {
          x: ConstantData.Defines.SED_CDim,
          y: ConstantData.Defines.SED_CDim / 4
        },
        {
          x: ConstantData.Defines.SED_CDim,
          y: ConstantData.Defines.SED_CDim / 2
        },
        {
          x: ConstantData.Defines.SED_CDim,
          y: 3 * ConstantData.Defines.SED_CDim / 4
        },
        {
          x: ConstantData.Defines.SED_CDim,
          y: ConstantData.Defines.SED_CDim
        },
        {
          x: 3 * ConstantData.Defines.SED_CDim / 4,
          y: ConstantData.Defines.SED_CDim
        },
        {
          x: ConstantData.Defines.SED_CDim / 2,
          y: ConstantData.Defines.SED_CDim
        },
        {
          x: ConstantData.Defines.SED_CDim / 4,
          y: ConstantData.Defines.SED_CDim
        },
        {
          x: 0,
          y: ConstantData.Defines.SED_CDim
        },
        {
          x: 0,
          y: 3 * ConstantData.Defines.SED_CDim / 4
        },
        {
          x: 0,
          y: ConstantData.Defines.SED_CDim / 2
        },
        {
          x: 0,
          y: ConstantData.Defines.SED_CDim / 4
        }
      ],
      n = this.flags & ConstantData.ObjFlags.SEDO_ContConn &&
        null !== e,
      o = this.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
        this.ConnectPoints,
      s = this.GetTable(!1),
      l = this.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
        s,
      S = !l &&
        (this.flags, ConstantData.ObjFlags.SEDO_NoTableLink);
    S = this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART;
    var c = {},
      u = !1,
      p = ConstantData.Defines.SED_CDim;
    s = this.GetTable(!1);
    if (
      S &&
      s &&
      e &&
      (u = T3Gv.optManager.Table_GetTargetPoints(this, s, e, t, c, a)),
      a >= 0
    ) {
      var d = T3Gv.optManager.GetObjectPtr(a, !1);
      if (
        d &&
        d.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText
      ) {
        var D = [];
        return D.push(new Point(p / 2, p / 2)),
          D
      }
    }
    if (u) return r.push(c),
      r;
    if (n) return this.PolyGetTargets(e, t, this.Frame);
    if (o || l) {
      var g = [];
      o ? g = this.ConnectPoints : l &&
        (g = T3Gv.optManager.Table_GetRowConnectPoints(this, s));
      for (var h = ConstantData.ExtraFlags, m = 0; m < g.length; m++) r.push({
        x: g[m].x,
        y: g[m].y
      });
      if (this.extraflags & (h.SEDE_FlipHoriz | h.SEDE_FlipVert)) {
        var C = new Rectangle(0, 0, p, p);
        T3Gv.optManager.FlipPoints(C, this.extraflags, r)
      }
      return r
    }
    return i
  }

  GetSegLFace(e, t, a) {
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
      d = 0,
      D = [],
      g = [],
      h = {
        x: e.x,
        y: e.y
      },
      m = ConstantData.Defines.SED_CDim,
      C = function (e, t) {
        var a,
          r;
        return (a = e.x - t.x) * a + (r = e.y - t.y) * r
      };
    if (this.RotationAngle) {
      var y = {
        x: 0,
        y: 0,
        width: m,
        height: m
      },
        f = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
        L = [];
      L.push(h),
        Utils3.RotatePointsAboutCenter(y, f, L)
    }
    var I = this.flags & ConstantData.ObjFlags.SEDO_UseConnect,
      T = this.GetTable(!1),
      b = this.hookflags & ConstantData.HookFlags.SED_LC_TableRows &&
        T;
    if (I || b) {
      var M = [];
      for (
        I ? M = this.ConnectPoints : b &&
          (M = T3Gv.optManager.Table_GetRowConnectPoints(this, T)),
        l = M.length,
        s = 0;
        s < l;
        s++
      ) D.push({
        x: M[s].x,
        y: M[s].y
      });
      for (
        this.RotationAngle &&
        Utils3.RotatePointsAboutCenter(y, f, D),
        S = new Rectangle(0, 0, 0, 0),
        Utils2.GetPolyRect(S, D),
        S.height < 1000 ||
          S.width < 1000 ? (
          g[0] = {
            x: m / 2,
            y: 0
          },
          g[1] = {
            x: m / 2,
            y: m
          },
          g[2] = {
            x: 0,
            y: m / 2
          },
          g[3] = {
            x: m,
            y: m / 2
          }
        ) : (
          g[0] = {
            x: S.x + S.width / 2,
            y: S.y
          },
          g[1] = {
            x: S.x + S.width / 2,
            y: S.y + S.height
          },
          g[2] = {
            x: S.x,
            y: S.y + S.height / 2
          },
          g[3] = {
            x: S.x + S.width,
            y: S.y + S.height / 2
          }
        ),
        u = m * m * m,
        s = 0;
        s < 4;
        s++
      ) (c = C(g[s], h)) < u &&
        (u = c, p = s);
      return d = ConstantData.HookPts.SED_KTC + p
    }
    return i = ConstantData.Defines.SED_CDim - h.x,
      o = ConstantData.Defines.SED_CDim - h.y,
      n = h.y,
      i < (r = h.x) ? (
        d = ConstantData.SegLDir.SED_KRC,
        n < i ? (
          d = ConstantData.SegLDir.SED_KTC,
          o < n &&
          (d = ConstantData.SegLDir.SED_KBC)
        ) : o < i &&
        (d = ConstantData.SegLDir.SED_KBC)
      ) : (
        d = ConstantData.SegLDir.SED_KLC,
        n < r ? (
          d = ConstantData.SegLDir.SED_KTC,
          o < n &&
          (d = ConstantData.SegLDir.SED_KBC)
        ) : o < r &&
        (d = ConstantData.SegLDir.SED_KBC)
      ),
      d
  }

  Resize(e, t, a, r, i) {

    console.log('== track UpdateDimensionsLines Shape.BaseShape-> Resize')

    if (null != e) {
      a.SetDimensionLinesVisibility(e, !1);
      var n = e.GetRotation();
      null == i &&
        (i = this.prevBBox);
      var o = {
        action: r,
        prevBBox: i,
        trect: $.extend(!0, {
        }, this.trect)
      };
      Collab.SendSVGEvent(
        this.BlockID,
        ConstantData.CollabSVGEventTypes.Shape_Grow,
        t,
        o
      );
      var s = $.extend(!0, {
      }, i),
        l = $.extend(!0, {
        }, t),
        S = $.extend(!0, {
        }, t),
        c = T3Gv.optManager.svgDoc.CalculateRotatedOffsetForResize(s, l, n);
      if (
        this.StyleRecord.Line.BThick &&
        null == this.polylist &&
        Utils2.InflateRect(S, this.StyleRecord.Line.BThick, this.StyleRecord.Line.BThick),
        r !== ConstantData.ActionTriggerType.MOVEPOLYSEG
      ) {
        e.SetSize(S.width, S.height),
          e.SetPos(S.x + c.x, S.y + c.y);
        var u = 0;
        this.ShapeType === ConstantData.ShapeType.RECT &&
          // (u = ListManager.RRect.prototype.GetCornerSize.apply(this));
          // Double ===
          (u = this.RRect_GetCornerSize());
        var p = e.GetElementByID(ConstantData.SVGElementClass.SHAPE);
        p.SetSize(S.width, S.height);
        var d = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
        d &&
          d.SetSize(S.width, S.height);
        var D = e.GetElementByID(ConstantData.SVGElementClass.HATCH);
        D &&
          D.SetSize(S.width, S.height),
          u > 0 &&
          p.SetRRectSize &&
          (
            p.SetRRectSize(S.width, S.height, u, u),
            d &&
            d.SetRRectSize(S.width, S.height, u, u),
            D &&
            D.SetRRectSize(S.width, S.height, u, u)
          )
      }
      var g = this.GetTable(!1),
        h = this.GetGraph(!0);
      return g ? T3Gv.optManager.Table_ResizeSVGTableObject(e, a, t) : h ? (
        T3Gv.optManager.GraphFormat(this, h, this.Frame, !0),
        T3Gv.optManager.AddToDirtyList(this.BlockID),
        T3Gv.optManager.RenderDirtySVGObjects()
      ) : this.LM_ResizeSVGTextObject(e, a, t),
        e.SetRotation(n),
        this.UpdateDimensionLines(e),
        c
    }
  }

  ResizeInTextEdit(e, t) {

    console.log('== track UpdateDimensionsLines Shape.BaseShape-> ResizeInTextEdit')

    var a = e.GetRotation();
    this.SetDimensionLinesVisibility(e, !1);
    var r = $.extend(!0, {
    }, this.Frame),
      i = $.extend(!0, {
      }, t),
      n = $.extend(!0, {
      }, t),
      o = T3Gv.optManager.svgDoc.CalculateRotatedOffsetForResize(r, i, a);
    this.StyleRecord.Line.BThick &&
      null == this.polylist &&
      Utils2.InflateRect(n, this.StyleRecord.Line.BThick, this.StyleRecord.Line.BThick),
      e.SetSize(n.width, n.height),
      e.SetPos(n.x + o.x, n.y + o.y);
    var s = 0;
    this.ShapeType === ConstantData.ShapeType.RECT &&
      // (s = ListManager.RRect.prototype.GetCornerSize.apply(this));
      // Double ===
      (s = this.RRect_GetCornerSize());
    var l = e.GetElementByID(ConstantData.SVGElementClass.SHAPE);
    l &&
      l.SetSize(n.width, n.height);
    var S = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
    S &&
      S.SetSize(n.width, n.height),
      this.GetTable(!1) &&
      T3Gv.optManager.Table_ResizeSVGTableObject(e, this, t, !0);
    var c = e.GetElementByID(ConstantData.SVGElementClass.HATCH);
    return c &&
      c.SetSize(t.width, t.height),
      s > 0 &&
      (
        l &&
        l.SetRRectSize &&
        l.SetRRectSize(n.width, n.height, s, s),
        S &&
        S.SetRRectSize &&
        S.SetRRectSize(n.width, n.height, s, s),
        c &&
        c.SetRRectSize &&
        c.SetRRectSize(n.width, n.height, s, s)
      ),
      e.SetRotation(a),
      T3Gv.optManager.UpdateDisplayCoordinates(t, null, null, this),
      this.UpdateDimensionLines(e),
      o
  }

  Rotate(e, t) {
    e.SetRotation(t)
  }

  ApplyStyles(e, t) {
    var a,
      r,
      i = t.Fill.Paint.FillType,
      n = t.Line.Paint.FillType,
      o = '' !== this.ImageURL,
      s = t.Fill.Paint.Color,
      l = t.Line.Paint.Color,
      S = this.GetFieldDataStyleOverride();
    if (
      S &&
      S.fillColor &&
      i !== ConstantData.FillTypes.SDFILL_TRANSPARENT &&
      (i = ConstantData.FillTypes.SDFILL_SOLID, s = S.fillColor),
      S &&
      S.strokeColor &&
      (n = ConstantData.FillTypes.SDFILL_SOLID, l = S.strokeColor),
      !this.SymbolURL
    ) {
      if (o) {
        var c = 'PROPFILL',
          u = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        if (
          this.ImageHeader &&
          (
            this.ImageHeader.croprect &&
            (
              u.x = this.ImageHeader.croprect.left,
              u.y = this.ImageHeader.croprect.top,
              u.width = this.ImageHeader.croprect.right - this.ImageHeader.croprect.left,
              u.height = this.ImageHeader.croprect.bottom - this.ImageHeader.croprect.top
            ),
            void 0 !== this.ImageHeader.imageflags &&
              this.ImageHeader.imageflags === ConstantData.ImageScales.SDIMAGE_ALWAYS_FIT ? c = 'NOPROP' : void 0 !== this.ImageHeader.imageflags &&
              this.ImageHeader.imageflags === ConstantData.ImageScales.SDIMAGE_PROP_FIT &&
            (c = 'PROPFIT')
          ),
          - 1 != this.BlobBytesID
        ) {
          var p = T3Gv.optManager.GetObjectPtr(this.BlobBytesID, !1);
          p &&
            p.ImageDir == FileParser.Image_Dir.dir_svg ? (
            null == this.SVGDim.width &&
            (this.SVGDim = Utils2.ParseSVGDimensions(p.Bytes)),
            e.SetImageFill(
              this.ImageURL,
              {
                scaleType: c,
                cropRect: u,
                imageWidth: this.SVGDim.width,
                imageHeight: this.SVGDim.height
              }
            )
          ) : e.SetImageFill(this.ImageURL, {
            scaleType: c,
            cropRect: u
          })
        } else {
          'SVG' === this.ImageURL.slice(- 3).toUpperCase() ? e.SetImageFill(
            this.ImageURL,
            {
              scaleType: c,
              cropRect: u,
              imageWidth: this.SVGDim.width,
              imageHeight: this.SVGDim.height
            }
          ) : e.SetImageFill(this.ImageURL, {
            scaleType: c,
            cropRect: u
          })
        }
        var d = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipHoriz) > 0,
          D = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipVert) > 0;
        d &&
          e.SetMirror(d),
          D &&
          e.SetFlip(D),
          e.SetFillOpacity(t.Fill.Paint.Opacity)
      } else i == ConstantData.FillTypes.SDFILL_GRADIENT ? e.SetGradientFill(
        this.CreateGradientRecord(
          t.Fill.Paint.GradientFlags,
          s,
          t.Fill.Paint.Opacity,
          t.Fill.Paint.EndColor,
          t.Fill.Paint.EndOpacity
        )
      ) : i == ConstantData.FillTypes.SDFILL_RICHGRADIENT ? e.SetGradientFill(this.CreateRichGradientRecord(t.Fill.Paint.GradientFlags)) : i == ConstantData.FillTypes.SDFILL_TEXTURE ? (
        a = {
          url: '',
          scale: 1,
          alignment: t.Fill.Paint.TextureScale.AlignmentScalar
        },
        r = t.Fill.Paint.Texture,
        T3Gv.optManager.TextureList.Textures[r] &&
        (
          a.dim = T3Gv.optManager.TextureList.Textures[r].dim,
          a.url = T3Gv.optManager.TextureList.Textures[r].ImageURL,
          a.scale = T3Gv.optManager.CalcTextureScale(t.Fill.Paint.TextureScale, a.dim.x),
          t.Fill.Paint.TextureScale.Scale = a.scale,
          a.url ||
          (
            a.url = Constants.FilePath_CMSRoot + Constants.FilePath_Textures + T3Gv.optManager.TextureList.Textures[r].filename
          ),
          e.SetTextureFill(a),
          e.SetFillOpacity(t.Fill.Paint.Opacity)
        )
      ) : i == ConstantData.FillTypes.SDFILL_TRANSPARENT ? e.SetFillColor('none') : 0 == t.Fill.Paint.Color.indexOf('#0102') ? (
        e.SetFillColor('none'),
        T3Gv.optManager.Test3DGraph(
          e.parent,
          this.Frame.width,
          this.Frame.height,
          t.Fill.Paint.Color
        )
      ) : (e.SetFillColor(s), e.SetFillOpacity(t.Fill.Paint.Opacity));
      n == ConstantData.FillTypes.SDFILL_GRADIENT ? e.SetGradientStroke(
        this.CreateGradientRecord(
          t.Line.Paint.GradientFlags,
          l,
          t.Line.Paint.Opacity,
          t.Line.Paint.EndColor,
          t.Line.Paint.EndOpacity
        )
      ) : n == ConstantData.FillTypes.SDFILL_RICHGRADIENT ? e.SetGradientStroke(this.CreateRichGradientRecord(t.Line.Paint.GradientFlags)) : n == ConstantData.FillTypes.SDFILL_TEXTURE ? (
        a = {
          url: '',
          scale: t.Line.Paint.TextureScale.Scale,
          alignment: t.Line.Paint.TextureScale.AlignmentScalar
        },
        r = t.Line.Paint.Texture,
        a.dim = T3Gv.optManager.TextureList.Textures[r].dim,
        a.url = T3Gv.optManager.TextureList.Textures[r].ImageURL,
        a.url ||
        (
          a.url = Constants.FilePath_CMSRoot + Constants.FilePath_Textures + T3Gv.optManager.TextureList.Textures[r].filename
        ),
        e.SetTextureStroke(a),
        e.SetStrokeOpacity(t.Line.Paint.Opacity)
      ) : (e.SetStrokeColor(l), e.SetStrokeOpacity(t.Line.Paint.Opacity))
    }
  }

  SetFillHatch(e, t, a) {
    if (- 1 != t && 0 !== t) {
      var r = t - 1,
        i = {},
        n = [];
      r < 10 &&
        (r = '0' + r),
        i.url = Constants.FilePath_Hatches + Constants.HatchName + r + '.png',
        i.scale = 1,
        i.alignment = 0,
        i.dim = {
          x: 128,
          y: 128
        },
        e.SetTextureFill(i);
      var o = this.StyleRecord.Line.Paint.Color;
      a &&
        (o = a),
        n.push({
          type: Effects.EffectType.RECOLOR,
          params: {
            color: o
          }
        }),
        e.Effects().SetEffects(n, this.Frame)
    } else e.SetFillColor('none')
  }

  IsTransparent() {
    return this.StyleRecord.Fill.Paint.FillType === ConstantData.FillTypes.SDFILL_TRANSPARENT
  }

  GetTargetRect() {
    var e = {};
    return Utils2.CopyRect(e, this.Frame),
      e
  }

  Hit(e, t, a, r) {
    var i,
      n,
      o,
      s = {},
      l = [],
      S = [],
      c = [
        {
        }
      ],
      u = {};
    return this.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
      this.ConnectPoints &&
      (t = !1),
      c[0].x = e.x,
      c[0].y = e.y,
      0 !== this.RotationAngle &&
      (
        n = this.RotationAngle / (180 / ConstantData.Geometry.PI),
        Utils3.RotatePointsAboutCenter(this.Frame, n, c)
      ),
      s.x = c[0].x,
      s.y = c[0].y,
      o = this.StyleRecord.Line.Thickness / 2,
      Utils2.CopyRect(u, this.Frame),
      Utils2.InflateRect(u, o, o),
      (
        i = Utils2.pointInRect(u, s) ? ConstantData.HitCodes.SED_Border : 0
      ) &&
      (
        l = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !0, null),
        T3Gv.optManager.fromOverlayLayer ||
          T3Gv.optManager.PolyPtInPolygon(l, s) ? (
          i = ConstantData.HitCodes.SED_Inside,
          (this.IsTransparent() || t) &&
          (i = 0, t = !0),
          S = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),
          t &&
          Utils3.LineDStyleHit(S, s, this.StyleRecord.Line.Thickness / 2, 0, null) &&
          (i = ConstantData.HitCodes.SED_Border)
        ) : i = 0
      ),
      r &&
      (r.hitcode = i),
      i
  }

  AllowMaintainLink() {
    //'use strict';
    return !!(
      // this instanceof ListManager.Polygon &&
      // Double === TODO
      // this instanceof GlobalDataShape.Polygon &&
      this instanceof Instance.Shape.Polygon &&
      this.hookflags & ConstantData.HookFlags.SED_LC_AttachToLine
    )
  }

  PolyGetTargetPointList(e) {
    //'use strict';
    var t,
      a = 0;
    return t = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !0, null),
      0 !== this.RotationAngle &&
      (
        a = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
        Utils3.RotatePointsAboutCenter(this.Frame, a, t)
      ),
      t
  }

  PolyGetTargets(e, t, a) {
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
      C = [
        {
          x: 0,
          y: 0
        }
      ],
      y = [],
      f = - 1,
      L = {},
      I = {}.ept = {},
      T = {},
      b = {},
      M = {},
      P = {},
      R = ConstantData.Defines.LongIntMax;
    if (r = this.PolyGetTargetPointList(t), null == e) return null;
    for (
      P.x = e.x,
      P.y = e.y,
      T3Gv.docHandler.documentConfig.enableSnap &&
        0 == (t & ConstantData.HookFlags.SED_LC_NoSnaps) ? (
        (P = T3Gv.docHandler.SnapToGrid(P)).y < a.y &&
        (P.y = a.y),
        P.y > a.y + a.height &&
        (P.y = a.y + a.height),
        P.x < a.x &&
        (P.x = a.x),
        P.x > a.x + a.width &&
        (P.x = a.x + a.width),
        u = !0
      ) : u = !1,
      p = r.length,
      i = 1;
      i < p;
      i++
    ) L.x = e.x,
      L.y = e.y,
      I = r[i - 1],
      d = r[i],
      Utils2.EqualPt(I, d) ||
      (
        0 === (n = S = d.x - I.x) &&
        (n = 1),
        0 === (o = c = d.y - I.y) &&
        (o = 1),
        Math.abs(c / n) > 1 ? (
          u &&
          (L.y = P.y),
          s = S / o * (L.y - I.y) + I.x,
          D = Math.abs(s - L.x),
          L.x = s,
          I.x < d.x ? (h = I.x, m = d.x) : (m = I.x, h = d.x),
          s < h ||
            s > m ? D = R : (
            T = Utils2.Pt2Rect(I, d),
            Utils2.InflateRect(T, 1, 1),
            Utils2.pointInRect(T, L) ||
            (D = R)
          ),
          D < R &&
          (f = i, b.y = L.y, b.x = s, R = D)
        ) : (
          u &&
          (L.x = P.x),
          l = c / n * (L.x - I.x) + I.y,
          g = Math.abs(l - L.y),
          L.y = l,
          I.y < d.y ? (h = I.y, m = d.y) : (m = I.y, h = d.y),
          l < h ||
            l > m ? g = R : (
            T = Utils2.Pt2Rect(I, d),
            Utils2.InflateRect(T, 1, 1),
            Utils2.pointInRect(T, L) ||
            (g = R)
          ),
          g < R &&
          (f = i, R = g, b.x = L.x, b.y = l)
        )
      );
    if (f >= 0) {
      if (C[0].x = b.x, C[0].y = b.y, M = a, 0 !== this.RotationAngle) {
        var A = this.RotationAngle / (180 / ConstantData.Geometry.PI);
        Utils3.RotatePointsAboutCenter(M, A, C)
      }
      return S = M.width,
        c = M.height,
        s = 0 === S ? 0 : (C[0].x - M.x) / S,
        l = 0 === c ? 0 : (C[0].y - M.y) / c,
        y.push(
          new Point(
            s * ConstantData.Defines.SED_CDim,
            l * ConstantData.Defines.SED_CDim
          )
        ),
        y
    }
    return null
  }




  LM_AddSVGTextObject(e, t) {
    var a,
      r = $.extend(!0, {
      }, this.Frame),
      i = Utils1.DeepCopy(this.trect),
      n = - 1,
      o = this.GetTable(!1);
    if (o) {
      if (!(o.select >= 0)) return;
      var s = o.cells[o.select];
      if (s.DataID !== this.DataID) {
        var l = T3Gv.optManager.Table_CellFromDataID(o, this.DataID);
        l >= 0 &&
          (s = o.cells[l])
      }
      a = s.trect,
        s.nextra &&
        (a = T3Gv.optManager.Table_GetJoinedCellFrame(o, o.select, !0, !1)),
        i.x = this.trect.x + a.x,
        i.y = this.trect.y + a.y,
        i.width = a.width,
        i.height = a.height,
        n = s.DataID
    }
    var S = T3Gv.objectStore.GetObject(this.DataID);
    if (null != S) {
      var c = e.CreateShape(ConstantData.CreateShapeType.TEXT);
      c.SetRenderingEnabled(!1),
        c.SetID(ConstantData.SVGElementClass.TEXT),
        c.SetUserData(n);
      var u = this.StyleRecord;
      u.Line.BThick &&
        null == this.polylist &&
        Utils2.InflateRect(r, u.Line.BThick, u.Line.BThick),
        c.SetSpellCheck(this.AllowSpell()),
        c.InitDataSettings(
          this.fieldDataTableID,
          this.fieldDataElemID,
          this.dataStyleOverride
        ),
        this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA ||
        this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB ||
        (c.SetPos(i.x - r.x, i.y - r.y), c.SetSize(i.width, i.height)),
        t &&
        (t.AddElement(c), t.isText = !0, t.textElem = c),
        S.Data.runtimeText ? c.SetRuntimeText(S.Data.runtimeText) : (
          c.SetText(''),
          c.SetParagraphAlignment(this.TextAlign),
          c.SetVerticalAlignment('middle')
        ),
        S.Data.runtimeText ||
        (S.Data.runtimeText = c.GetRuntimeText());
      var p = null;
      if (
        this.bInGroup &&
        c.DisableHyperlinks(!0),
        this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA
      ) switch (
        c.SetRenderingEnabled(!0),
        c.SetConstraints(T3Gv.optManager.contentHeader.MaxWorkDim.x, 0, 0),
        (p = c.GetTextMinDimensions()).width,
        p.height,
        this.TextAlign
        ) {
          case ConstantData.TextAlign.TOPLEFT:
          case ConstantData.TextAlign.LEFT:
          case ConstantData.TextAlign.BOTTOMLEFT:
            c.SetPos(0, - p.height - this.TMargins.top),
              c.SetParagraphAlignment(ConstantData.TextAlign.LEFT);
            break;
          case ConstantData.TextAlign.TOPRIGHT:
          case ConstantData.TextAlign.RIGHT:
          case ConstantData.TextAlign.BOTTOMRIGHT:
            c.SetPos(this.Frame.width - p.width, - p.height - this.TMargins.top),
              c.SetParagraphAlignment(ConstantData.TextAlign.RIGHT);
            break;
          default:
            c.SetPos(this.Frame.width / 2 - p.width / 2, - p.height - this.TMargins.top),
              c.SetParagraphAlignment(ConstantData.TextAlign.CENTER)
        } else if (this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB) switch (
          c.SetRenderingEnabled(!0),
          c.SetConstraints(T3Gv.optManager.contentHeader.MaxWorkDim.x, 0, 0),
          (p = c.GetTextMinDimensions()).width,
          this.TextAlign
        ) {
            case ConstantData.TextAlign.TOPLEFT:
            case ConstantData.TextAlign.LEFT:
            case ConstantData.TextAlign.BOTTOMLEFT:
              c.SetPos(0, this.Frame.height + this.TMargins.bottom),
                c.SetParagraphAlignment(ConstantData.TextAlign.LEFT);
              break;
            case ConstantData.TextAlign.TOPRIGHT:
            case ConstantData.TextAlign.RIGHT:
            case ConstantData.TextAlign.BOTTOMRIGHT:
              c.SetPos(
                this.Frame.width - p.width,
                this.Frame.height + this.TMargins.bottom
              ),
                c.SetParagraphAlignment(ConstantData.TextAlign.RIGHT);
              break;
            default:
              c.SetPos(
                this.Frame.width / 2 - p.width / 2,
                this.Frame.height + this.TMargins.bottom
              ),
                c.SetParagraphAlignment(ConstantData.TextAlign.CENTER)
          } else this.TextGrow == ConstantData.TextGrowBehavior.HORIZONTAL ? c.SetConstraints(T3Gv.optManager.contentHeader.MaxWorkDim.x, i.width, i.height) : c.SetConstraints(i.width, i.width, i.height);
      c.SetRenderingEnabled(!0),
        c.SetEditCallback(T3Gv.optManager.TextCallback, t)
    }
  }

  LM_ResizeSVGTextObject(e, t, a) {
    if (- 1 != t.DataID) {
      var r = e.GetElementByID(ConstantData.SVGElementClass.TEXT);
      if (r) {
        var i = t.trect,
          n = null;
        if (this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA) {
          switch ((n = r.GetTextMinDimensions()).width, n.height, this.TextAlign) {
            case ConstantData.TextAlign.TOPLEFT:
            case ConstantData.TextAlign.LEFT:
            case ConstantData.TextAlign.BOTTOMLEFT:
              r.SetPos(0, - n.height - this.TMargins.top),
                r.SetParagraphAlignment(ConstantData.TextAlign.LEFT);
              break;
            case ConstantData.TextAlign.TOPRIGHT:
            case ConstantData.TextAlign.RIGHT:
            case ConstantData.TextAlign.BOTTOMRIGHT:
              r.SetPos(a.width - n.width, - n.height - this.TMargins.top),
                r.SetParagraphAlignment(ConstantData.TextAlign.RIGHT);
              break;
            default:
              r.SetPos(a.width / 2 - n.width / 2, - n.height - this.TMargins.top),
                r.SetParagraphAlignment(ConstantData.TextAlign.CENTER)
          }
          r.SetConstraints(T3Gv.optManager.contentHeader.MaxWorkDim.x, 0, 0)
        } else if (this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB) {
          switch ((n = r.GetTextMinDimensions()).width, this.TextAlign) {
            case ConstantData.TextAlign.TOPLEFT:
            case ConstantData.TextAlign.LEFT:
            case ConstantData.TextAlign.BOTTOMLEFT:
              r.SetPos(0, a.height + this.TMargins.bottom),
                r.SetParagraphAlignment(ConstantData.TextAlign.LEFT);
              break;
            case ConstantData.TextAlign.TOPRIGHT:
            case ConstantData.TextAlign.RIGHT:
            case ConstantData.TextAlign.BOTTOMRIGHT:
              r.SetPos(a.width - n.width, a.height + this.TMargins.bottom),
                r.SetParagraphAlignment(ConstantData.TextAlign.RIGHT);
              break;
            default:
              r.SetPos(a.width / 2 - n.width / 2, a.height + this.TMargins.bottom),
                r.SetParagraphAlignment(ConstantData.TextAlign.CENTER)
          }
          r.SetConstraints(T3Gv.optManager.contentHeader.MaxWorkDim.x, 0, 0)
        } else {
          r.SetPos(i.x - a.x, i.y - a.y);
          var o = i.width;
          this.TextGrow == ConstantData.TextGrowBehavior.HORIZONTAL &&
            (o = T3Gv.optManager.contentHeader.MaxWorkDim.x),
            r.SetConstraints(o, i.width, i.height)
        }
      }
    }
  }

  WriteSDFAttributes(e, t) {
    var a,
      r,
      i = this.DataID,
      n = this.GetTable(!1),
      o = this.GetGraph(!1),
      s = this.GetGanttInfo(!1),
      l = !1;
    if (
      (
        this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB ||
        this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA
      ) &&
      (t.WriteBlocks || t.WriteVisio || (i = - 1)),
      SDF.WriteTextParams(e, this, i, t),
      n
    ) {
      var S = t.WriteGroupBlock &&
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER;
      t.noTables ||
        t.WriteBlocks ||
        t.WriteGroupBlock &&
        !S ? (t.WriteBlocks || t.WriteGroupBlock) &&
      (
        SDF.WriteTableID(e, this.TableID, t),
        s &&
        SDF.WriteGanttInfoID(e, this.GanttInfoID, t)
      ) : (SDF.WriteTable(e, n, t), s && SDF.WriteGanttInfo(e, s, t))
    } else o ? /*!SDFWResult.noTables &&*/ t.WriteBlocks ||
      t.WriteGroupBlock ? (t.WriteBlocks || t.WriteGroupBlock) &&
    SDF.WriteGraphID(e, this.GraphID, t) : SDF.WriteGraph(e, o, t) : i >= 0 &&
    !t.WriteBlocks &&
    !t.WriteGroupBlock &&
    SDF.WriteText(e, this, null, null, !1, t);
    if (
      // this instanceof ListManager.SVGFragmentSymbol &&
      // Double === TODO
      // this instanceof GlobalDataShape.SVGFragmentSymbol &&
      this instanceof Instance.Shape.SVGFragmentSymbol &&
      this.EMFHash &&
      (
        SDF.WriteString8(
          e,
          this.EMFHash,
          FileParser.SDROpCodesByName.SDF_C_EMFHASH,
          t
        ),
        l = !0
      ),
      (r = this.GetEMFBlobBytes()) &&
      !t.noTables
    ) SDF.WriteImageHeader(e, this, t),
      this.EMFHash &&
      !l &&
      SDF.WriteString8(
        e,
        this.EMFHash,
        FileParser.SDROpCodesByName.SDF_C_EMFHASH,
        t
      ),
      t.WriteBlocks ||
        t.WriteGroupBlock ? SDF.WriteEMFBlobBytesID(e, this.EMFBlobBytesID, FileParser.Image_Dir.dir_meta, t) : SDF.WriteBlob(e, r.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWMETA),
      (a = this.GetBlobBytes()) &&
      (
        t.WriteBlocks ||
          t.WriteGroupBlock ? SDF.WriteBlobBytesID(e, this.BlobBytesID, FileParser.Image_Dir.dir_png, t) : SDF.WriteBlob(
            e,
            a.Bytes,
            FileParser.SDROpCodesByName.SDF_C_DRAWPREVIEWPNG
          )
      );
    else if ((a = this.GetBlobBytes()) && !t.noTables) switch (SDF.WriteImageHeader(e, this, t), a.ImageDir) {
      case FileParser.Image_Dir.dir_jpg:
        SDF.WriteImageHeader(e, this, t),
          t.WriteBlocks ||
            t.WriteGroupBlock ? SDF.WriteBlobBytesID(e, this.BlobBytesID, FileParser.Image_Dir.dir_jpg, t) : SDF.WriteBlob(e, a.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWJPG);
        break;
      case FileParser.Image_Dir.dir_png:
        SDF.WriteImageHeader(e, this, t),
          t.WriteBlocks ||
            t.WriteGroupBlock ? SDF.WriteBlobBytesID(e, this.BlobBytesID, FileParser.Image_Dir.dir_png, t) : SDF.WriteBlob(e, a.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWPNG);
        break;
      case FileParser.Image_Dir.dir_svg:
        SDF.WriteImageHeader(e, this, t),
          t.WriteBlocks ? SDF.WriteBlobBytesID(e, this.BlobBytesID, FileParser.Image_Dir.dir_svg, t) : SDF.WriteBlob(e, a.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWSVG)
    } else if (
      null != this.ImageID &&
      this.ImageID.length > 0 &&
      !t.noTables &&
      this.ImageDir === FileParser.Image_Dir.dir_svg
    ) SDF.WriteString(
      e,
      this.ImageID,
      FileParser.SDROpCodesByName.SDF_C_SVGIMAGEID,
      t
    ),
      l = !0;
    if (
      this.EMFHash &&
      !l &&
      (
        SDF.WriteString8(
          e,
          this.EMFHash,
          FileParser.SDROpCodesByName.SDF_C_EMFHASH,
          t
        ),
        l = !0
      ),
      this.OleHeader &&
      SDF.WriteOleHeader(e, this.OleHeader, t),
      this.OleBlobBytesID >= 0 &&
      (
        a = this.GetOleBlobBytes(),
        t.WriteBlocks ? SDF.WriteOleBlobBytesID(e, this.OleBlobBytesID, FileParser.Image_Dir.dir_store, t) : SDF.WriteBlob(e, a.Bytes, FileParser.SDROpCodesByName.SDF_C_OLESTORAGE)
      ),
      this.NativeID >= 0
    ) if (t.WriteBlocks) SDF.WriteNativeID(e, this.NativeID, t);
      else {
        var c = T3Gv.optManager.GetObjectPtr(this.NativeID, !1);
        if (c) {
          var u = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_NATIVESTORAGE);
          FileParser.write_nativesdfbuffer(e, c),
            SDF.Write_LENGTH(e, u)
        }
      }
    if (this.ExpandedViewID >= 0) {
      var p = T3Gv.optManager.GetObjectPtr(this.ExpandedViewID, !1);
      t.WriteBlocks ||
        t.WriteGroupBlock ? (t.WriteBlocks || t.WriteGroupBlock) &&
      SDF.WriteExpandedViewID(e, this.ExpandedViewID, t) : SDF.WriteExpandedView(e, p, t)
    }
    this.ContainerList &&
      SDF.WriteContainerList(e, this.ContainerList, t)
  }

  GetIconShape() {
    var e = this.GetTable(!1);
    if (e) {
      var t = e.cells[e.cells.length - 1];
      if (t.childcontainer >= 0) return t.childcontainer
    }
    return this.BlockID
  }

  PostCreateShapeCallback(e, t, a, r) {

    console.log('= S.BaseShape PostCreateShapeCallback e,t,a,r', e, t, a, r)

    if (this.UpdateDimensionLines(t), this.HasIcons()) {
      var i = this.GetTable(!1);
      if (i) if (i.cells[i.cells.length - 1].childcontainer >= 0) return
    } else if

      // (this instanceof ListManager.ShapeContainer)
      // (this instanceof GlobalDataShape.ShapeContainer) {
      (this instanceof Instance.Shape.ShapeContainer) {
      var n = T3Gv.optManager.ContainerIsInCell(this);
      if (n && n.cellindex === n.theTable.cells.length - 1) return void n.obj.AddIcons(e, t)
    }
    this.AddIcons(e, t)
  }

  GetDimensionPoints() {
    //'use strict';
    var e = [],
      t = 0;
    e.push(new Point(this.Frame.x, this.Frame.y)),
      this.Frame.width > 0 &&
      e.push(
        new Point(this.Frame.x + this.Frame.width, this.Frame.y)
      ),
      this.Frame.height > 0 &&
      e.push(
        new Point(this.Frame.x + this.Frame.width, this.Frame.y + this.Frame.height)
      );
    var a = 360 - this.RotationAngle;
    Math.PI;
    for (t = 0; t < e.length; t++) e[t].x -= this.Frame.x,
      e[t].y -= this.Frame.y;
    return e
  }

  GetDimensionLineDeflection(e, t, a, r) {
    var i,
      n,
      o = 0,
      s = [],
      l = new Point(0, 0),
      S = this.GetDimensionPoints();
    for (i = S.length, o = 0; o < i; o++) S[o].x += this.inside.x,
      S[o].y += this.inside.y;
    return l.x = r.knobPoint.x + this.Frame.x - r.adjustForKnob,
      l.y = r.knobPoint.y + this.Frame.y - r.adjustForKnob,
      s.push(S[r.segmentIndex - 1]),
      s.push(S[r.segmentIndex]),
      s.push(new Point(l.x, l.y)),
      s.push(new Point(t, a)),
      Utils3.RotatePointsAboutCenter(this.Frame, - r.ccAngleRadians, s),
      Utils3.RotatePointsAboutCenter(this.Frame, Math.PI, s),
      n = s[3].y - s[2].y,
      r.originalDeflection + n
  }

  DimensionLineDeflectionAdjust(e, t, a, r, i) {

    console.log('== track UpdateDimensionsLines Shape.BaseShape-> DimensionLineDeflectionAdjust')


    var n = this.GetDimensionLineDeflection(e, t, a, i);
    1 === i.segmentIndex ? this.dimensionDeflectionH = n : this.dimensionDeflectionV = n,
      this.UpdateDimensionLines(e),
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select &&
      this.HideOrShowSelectOnlyDimensions(!0)
  }

  MaintainProportions(e, t) {
    var a,
      r;
    if (this.ResizeAspectConstrain) {
      if (r = this.Frame.height, a = this.Frame.width, null != e && a > 0) return e * (r / a);
      if (null != t && r > 0) return t * (a / r)
    }
    return null
  }

  UpdateDimensionFromTextObj(e, t) {
    //'use strict';
    T3Gv.objectStore.PreserveBlock(this.BlockID);
    var a,
      r,
      i,
      n = 0,
      o = - 1,
      s = null,
      l = null;
    if (t) var S = t.text,
      c = t.userData;
    else S = e.GetText(),
      c = e.GetUserData();
    if (
      a = c.segment,
      (i = this.GetDimensionValueFromString(S, a)) >= 0 &&
      (o = this.GetDimensionLengthFromValue(i)),
      o < 0
    ) return T3Gv.optManager.AddToDirtyList(this.BlockID),
      void T3Gv.optManager.RenderDirtySVGObjects();
    1 === a ? (
      s = this.MaintainProportions(o, null),
      this.SetSize(o, s, ConstantData.ActionTriggerType.LINELENGTH),
      this.GetDimensionsForDisplay().width === o &&
      (
        this.rwd = i,
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !0)
      )
    ) : (
      l = this.MaintainProportions(null, o),
      this.SetSize(l, o, ConstantData.ActionTriggerType.LINELENGTH),
      this.GetDimensionsForDisplay().height === o &&
      (
        this.rht = i,
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !0
        )
      )
    );
    for (
      T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
      r = this.hooks.length,
      n = 0;
      n < r;
      n++
    ) T3Gv.optManager.SetLinkFlag(this.hooks[n].objid, ConstantData.LinkFlags.SED_L_MOVE);
    T3Gv.optManager.AddToDirtyList(this.BlockID),
      (this.Frame.x < 0 || this.Frame.y < 0) &&
      T3Gv.optManager.ScrollObjectIntoView(this.BlockID, !1),
      T3Gv.optManager.CompleteOperation(null)
  }

  DimensionEditCallback(e, t, a, r) {
    //'use strict';
    var i = r;
    switch (e) {
      case 'edit':
        break;
      case 'keyend':
        if (
          t.keyCode == Resources.Keys.Tab ||
          t.keyCode == Resources.Keys.Enter
        ) return T3Gv.optManager.CloseEdit(),
          !0;
        break;
      case 'charfilter':
        if (
          T3Gv.docHandler.rulerSettings.useInches &&
          T3Gv.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Feet
        ) {
          if (- 1 === t.search(/(\d|\.|'|"| )/)) return !1
        } else if (- 1 === t.search(/(\d|\.)/)) return !1;
        break;
      case 'activate':
        var n = a.svgObj.SDGObj.svgObj.trans.rotation;
        if ((n += i.RotationAngle) >= 360 && (n -= 360), 0 !== n) {
          var o = i.GetDimensionPoints(),
            s = [],
            l = Utils1.CalcAngleFromPoints(o[a.userData.segment - 1], o[a.userData.segment]);
          i.GetDimensionTextInfo(
            o[a.userData.segment - 1],
            o[a.userData.segment],
            l,
            a,
            a.userData.segment,
            s,
            [],
            []
          );
          var S = 360 - i.RotationAngle,
            c = 2 * Math.PI * (S / 360);
          Utils3.RotatePointsAboutCenter(i.Frame, c, s);
          var u = {};
          Utils2.GetPolyRect(u, s);
          var p = {},
            d = [];
          p.x = u.x + u.width / 2 - a.lastFmtSize.width / 2,
            p.y = u.y + u.height / 2 - a.lastFmtSize.height / 2,
            d.push(new Point(p.x, p.y)),
            Utils3.RotatePointsAboutCenter(i.Frame, - c, d),
            a.SetPos(d[0].x, d[0].y),
            a.SetRotation(- i.RotationAngle, d[0].x, d[0].y)
        }
        break;
      case 'deactivate':
        if (T3Gv.optManager.bInDimensionEdit = !1, Collab.AllowMessage()) {
          Collab.BeginSecondaryEdit();
          r = Utils1.DeepCopy(a.GetUserData());
          var D = {
            BlockID: i.BlockID,
            text: a.GetText(),
            userData: r
          };
          T3Gv.optManager.GetObjectPtr(i.BlockID, !0),
            Collab.BuildMessage(
              ConstantData.CollabMessages.UpdateDimensionFromTextObj,
              D,
              !1,
              !1
            ),
            i = T3Gv.optManager.GetObjectPtr(i.BlockID, !1)
        }
        i.UpdateDimensionFromTextObj(a)
    }
  }

  NoFlip() {
    return this.hooks.length ? this.hooks[0].hookpt !== ConstantData.HookPts.SED_KAT &&
      !(this.hooks[0].hookpt > ConstantData.HookPts.SED_AK) : !!(this.extraflags & ConstantData.ExtraFlags.SEDE_NoRotate)
  }

  Flip(e) {
    '' == this.SymbolURL &&
      '' === this.ImageURL ||
      (
        e & ConstantData.ExtraFlags.SEDE_FlipHoriz &&
        (
          this.extraflags = Utils2.SetFlag(
            this.extraflags,
            ConstantData.ExtraFlags.SEDE_FlipHoriz,
            0 == (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipHoriz)
          )
        ),
        e & ConstantData.ExtraFlags.SEDE_FlipVert &&
        (
          this.extraflags = Utils2.SetFlag(
            this.extraflags,
            ConstantData.ExtraFlags.SEDE_FlipVert,
            0 == (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipVert)
          )
        )
      )
  }

  NoRotate() {
    var e,
      t,
      a,
      r = T3Gv.optManager.FindAllChildConnectors(this.BlockID);
    if (this.IsSwimlane()) return !0;
    if (
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER
    ) return !0;
    if (
      this.hooks.length &&
      (a = T3Gv.optManager.GetObjectPtr(this.hooks[0].objid, !1)) &&
      a.objecttype === ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER
    ) return !0;
    if (this.extraflags & ConstantData.ExtraFlags.SEDE_NoRotate) return !0;
    for (t = r.length, e = 0; e < t; e++) if (
      !(a = T3Gv.optManager.GetObjectPtr(r[e], !1))._IsFlowChartConnector() &&
      a.arraylist.hook.length - ConstantData.ConnectorDefines.SEDA_NSkip > 0
    ) return !0;
    return !1
  }

  MaintainPoint(e, t, a, r, i) {
    //'use strict';
    return !1
  }

  AddIcon(e, t, a) {
    if (t) {
      var r = t.GetID(),
        i = this.Frame;
      if (r !== this.BlockID) {
        var n = T3Gv.optManager.GetObjectPtr(r, !1);
        n &&
          (i = n.Frame)
      } else i = this.Frame;
      this.nIcons;
      a.x = i.width - this.iconShapeRightOffset - this.iconSize - this.nIcons * this.iconSize,
        a.y = i.height - this.iconShapeBottomOffset - this.iconSize;
      var o = this.GenericIcon(a);
      return this.nIcons++,
        t.AddElement(o),
        o
    }
  }

  GetActionButtons() {

    console.log(' ========== ListManager.BaseShape.prototype.GetActionButtons');

    var e,
      t = !1,
      a = !1,
      r = !1,
      i = !1,
      n = !1;
    if (
      T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !1).moreflags & ConstantData.SessionMoreFlags.SEDSM_NoActionButton
    ) return null;
    if (this.flags & ConstantData.ObjFlags.SEDO_Lock) return null;
    var o = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.tedSessionBlockId, !1);
    if (
      this.BlockID === o.theActiveTextEditObjectID ||
      this.BlockID === o.theActiveTableObjectID ||
      this.BlockID === o.theActiveOutlineObjectID
    ) return null;
    var s = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.layersManagerBlockId, !1);
    if (
      s &&
      s.layers[s.activelayer].flags & ConstantData.LayerFlags.SDLF_UseEdges
    ) return null;
    var l = Business.GetSelectionBusinessManager(this.BlockID);
    (
      null == l &&
      (l = T3Gv.gBusinessManager),
      l &&
      !Business.ShapeCannotHaveActionButtons(this)
    ) &&
      (
        e = l.AllowActionButtons(this),
        T3Gv.optManager.SD_GetVisioTextChild(this.BlockID) >= 0 &&
        (e = !1),
        /*T3Gv.optManager.IsJiraIssueShape(this)*/false &&
        (e = !1),
        e &&
        (
          t = e.up,
          a = e.down,
          r = e.left,
          i = e.right,
          e.custom &&
          (n = !0),
          e.table &&
          (n = !0)
        )
      );
    return t ||
      a ||
      r ||
      i ||
      n ? {
      left: r,
      right: i,
      up: t,
      down: a,
      custom: n
    }
      : null
  }

  SetRolloverActions(e, t, a) {
    // debuggesr
    console.log('ListManager.BaseShape.prototype.SetRolloverActions e, t, a', e, t, a);

    var r = T3Gv.optManager.GetObjectPtr(this.BlockID, !1);
    // if (r && r instanceof ListManager.BaseDrawingObject) {
    // Doulbe === TODO
    if (r && r instanceof BaseDrawingObject) {
      var i = ConstantData.ObjectTypes;
      switch (this.objecttype) {
        case i.SD_OBJT_SWIMLANE_ROWS:
        case i.SD_OBJT_SWIMLANE_COLS:
        case i.SD_OBJT_SWIMLANE_GRID:
        case i.SD_OBJT_FRAME_CONTAINER:
          if (a) {
            var n = T3Gv.optManager.svgObjectLayer.FindElementByDOMElement(a.currentTarget).GetTargetForEvent(a);
            n.GetID() === ConstantData.SVGElementClass.SLOP &&
              // ListManager.BaseDrawingObject.prototype.SetRolloverActions.apply(this, [e,n]);
              // Double === TODO
              super.SetRolloverActions(
                e,
                n
              )
          }
          return void this.SetCursors();
        case i.SD_OBJT_SHAPECONTAINER:
          var o = T3Gv.optManager.ContainerIsInCell(this);
          if (o) return t = T3Gv.optManager.svgObjectLayer.GetElementByID(o.obj.BlockID),
            void o.obj.SetRolloverActions(e, t)
      }
      if (
        - 1 != T3Gv.optManager.curHiliteShape &&
        T3Gv.optManager.curHiliteShape != this.BlockID
      ) {
        var s = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.curHiliteShape, !1);
        s &&
          (s.SetRuntimeEffects(!1), s.ClearCursors())
      }
      var l = 'actionArrow' + this.BlockID;
      this.actionArrowHideTimerID >= 0 &&
        T3Gv.optManager.ClearActionArrowTimer(this.BlockID),
        T3Gv.optManager.RemoveActionArrows(this.BlockID, !0);
      var S = this.GetActionButtons();
      if (S) {
        var c = !(S.up || S.left || S.down || S.right || S.custom);
        if (this.flags & ConstantData.ObjFlags.SEDO_TextOnly || c)
          //  ListManager.BaseDrawingObject.prototype.SetRolloverActions.apply(this, [e,t]);
          super.SetRolloverActions(
            e,
            t
          );
        else {
          var u = this.BlockID,
            p = this;
          T3Gv.optManager.isMobilePlatform ? this.SetRuntimeEffects(!1) : this.SetRuntimeEffects(!0),
            this.SetCursors(),
            T3Gv.optManager.curHiliteShape = this.BlockID;
          var d = [],
            D = e.docInfo.docToScreenScale;
          e.docInfo.docScale <= 0.5 &&
            (D *= 2);
          var g = ConstantData.Defines.baseArrowSlop / D,
            h = ConstantData.Defines.connectorArrowSlop / D,
            m = 0;
          - 1 !== T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !1).indexOf(u) &&
            (m = ConstantData.Defines.SED_KnobSize / 2);
          var C = 0,
            y = 0;
          if (
            - 1 !== T3Gv.optManager.actionStoredObjectId ||
            0 !== T3Gv.optManager.dragBBoxList.length ||
            T3Gv.optManager.rubberBand
          ) t.svgObj.mouseout(
            (
              function () {
                p.SetRuntimeEffects(!1),
                  p.ClearCursors(),
                  T3Gv.optManager.curHiliteShape = - 1
              }
            )
          );
          else {
            for (
              var f = g,
              L = g,
              I = g,
              T = g,
              b = null,
              M = {
                lindex: - 1,
                id: - 1,
                hookpt: 0
              };
              T3Gv.optManager.FindChildArrayByIndex(this.BlockID, M) > 0;
            ) {
              var P = (
                (b = T3Gv.optManager.GetObjectPtr(M.id, !1)).arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_CoManager
              ) > 0,
                R = b._IsChildOfAssistant(),
                A = b._IsFlowChartConnector(),
                _ = b.arraylist.hook.length - ConstantData.ConnectorDefines.SEDA_NSkip;
              if (_ < 0 && (_ = 0), 0 !== _ && !A && !P && !R && M.hookpt) switch (M.hookpt) {
                case ConstantData.HookPts.SED_LL:
                  I = h,
                    C += h - g;
                  break;
                case ConstantData.HookPts.SED_LR:
                  L = h,
                    C -= h - g;
                  break;
                case ConstantData.HookPts.SED_LT:
                  T = h,
                    y += h - g;
                  break;
                case ConstantData.HookPts.SED_LB:
                  f = h,
                    y -= h - g
              }
            }
            var E = e.CreateShape(ConstantData.CreateShapeType.GROUP);
            E.SetID(l),
              E.SetUserData(u);
            var w,
              F = T3Gv.optManager.SD_GetVisioTextParent(this.BlockID);
            w = T3Gv.optManager.GetObjectPtr(F, !1);
            var v = $.extend(!0, {
            }, w.Frame),
              G = ConstantData.Defines.ActionArrowSizeV / D,
              N = ConstantData.Defines.ActionArrowSizeH / D;
            v.x -= G + L + m,
              v.y -= G + f + m,
              v.width += 2 * G + (L + I) + 2 * m,
              v.height += 2 * G + (f + T) + 2 * m;
            var k = v.width / 2 - C / 2,
              U = v.height / 2 - y / 2,
              J = null;
            if (S.custom) {
              var x,
                O,
                B,
                H = gBusinessController.CreateCustomActionButtons(e, this, 0, this.BlockID);
              if (H) for (v = $.extend(!0, {
              }, this.Frame), O = H.length, x = 0; x < O; x++) (B = H[x]).SetID(ConstantData.ActionArrow.CUSTOM + x),
                B.SetUserData(u),
                E.AddElement(B),
                d.push(B.DOMElement())
            }
            if (S.left) {
              var V = gBusinessController.CreateActionButton(e, L, U, this.BlockID);
              null == V &&
                (
                  (
                    J = (V = e.CreateShape(ConstantData.CreateShapeType.PATH)).PathCreator()
                  ).BeginPath(),
                  J.MoveTo(0, U),
                  J.LineTo(G, U - N / 2),
                  J.LineTo(G, U + N / 2),
                  J.LineTo(0, U),
                  J.ClosePath(),
                  J.Apply(),
                  // V.SetFillColor('#FFD64A'),
                  V.SetFillColor('#FF0000'),
                  V.SetStrokeWidth(0),
                  V.SetCursor(Element.CursorType.ADD_LEFT)
                ),
                V.SetID(ConstantData.ActionArrow.LEFT),
                V.SetUserData(u),
                E.AddElement(V),
                d.push(V.DOMElement())
            }
            if (S.up) {
              var j = gBusinessController.CreateActionButton(e, k, f, this.BlockID);
              null == j &&
                (
                  (
                    J = (j = e.CreateShape(ConstantData.CreateShapeType.PATH)).PathCreator()
                  ).BeginPath(),
                  J.MoveTo(k, 0),
                  J.LineTo(k - N / 2, G),
                  J.LineTo(k + N / 2, G),
                  J.LineTo(k, 0),
                  J.ClosePath(),
                  J.Apply(),
                  j.SetFillColor('#FFD64A'),
                  j.SetStrokeWidth(0),
                  j.SetCursor(Element.CursorType.ADD_UP)
                ),
                j.SetID(ConstantData.ActionArrow.UP),
                j.SetUserData(u),
                E.AddElement(j),
                d.push(j.DOMElement())
            }
            if (S.right) {
              var z = gBusinessController.CreateActionButton(e, v.width - L, U, this.BlockID);
              null == z &&
                (
                  (
                    J = (z = e.CreateShape(ConstantData.CreateShapeType.PATH)).PathCreator()
                  ).BeginPath(),
                  J.MoveTo(v.width, U),
                  J.LineTo(v.width - G, U - N / 2),
                  J.LineTo(v.width - G, U + N / 2),
                  J.LineTo(v.width, U),
                  J.ClosePath(),
                  J.Apply(),
                  z.SetFillColor('#FFD64A'),
                  z.SetStrokeWidth(0),
                  z.SetCursor(Element.CursorType.ADD_RIGHT)
                ),
                z.SetID(ConstantData.ActionArrow.RIGHT),
                z.SetUserData(u),
                E.AddElement(z),
                d.push(z.DOMElement())
            }
            if (S.down) {
              var W = gBusinessController.CreateActionButton(e, k, v.height - f, this.BlockID);
              null == W &&
                (
                  (
                    J = (W = e.CreateShape(ConstantData.CreateShapeType.PATH)).PathCreator()
                  ).BeginPath(),
                  J.MoveTo(k, v.height),
                  J.LineTo(k - N / 2, v.height - G),
                  J.LineTo(k + N / 2, v.height - G),
                  J.LineTo(k, v.height),
                  J.ClosePath(),
                  J.Apply(),
                  W.SetFillColor('#FFD64A'),
                  W.SetStrokeWidth(0),
                  W.SetCursor(Element.CursorType.ADD_DOWN)
                ),
                W.SetID(ConstantData.ActionArrow.DOWN),
                W.SetUserData(u),
                E.AddElement(W),
                d.push(W.DOMElement())
            }
            E.SetSize(v.width, v.height),
              E.SetPos(v.x, v.y),
              gBusinessController.RotateActionButtons() &&
              E.SetRotation(this.RotationAngle),
              T3Gv.optManager.svgOverlayLayer.AddElement(E);
            var q,
              K = function (e) {
                Utils2.StopPropagationAndDefaults(e);
                var t = T3Gv.optManager.svgOverlayLayer.FindElementByDOMElement(e.currentTarget);
                if (t) {
                  var a = t.GetTargetForEvent(e);
                  if (a) var r = a.GetID(),
                    i = t.GetUserData()
                }
                var n = T3Gv.optManager.GetObjectPtr(i, !1);
                n &&
                  // n instanceof ListManager.BaseDrawingObject &&
                  n instanceof BaseDrawingObject &&
                  null != r &&
                  null != i &&
                  gBusinessController.ActionClick(e, i, r, null)
              },
              X = function (e) {
                if (
                  T3Gv.optManager.IsWheelClick(e) ||
                  ConstantData.DocumentContext.SpacebarDown
                ) return Evt_WorkAreaHammerDragStart(e),
                  Utils2.StopPropagationAndDefaults(e),
                  !1;
                var t;
                ConstantData.DocumentContext.HTMLFocusControl &&
                  ConstantData.DocumentContext.HTMLFocusControl.blur &&
                  ConstantData.DocumentContext.HTMLFocusControl.blur(),
                  SDUI.Commands.MainController.Dropdowns.HideAllDropdowns();
                var a = T3Gv.optManager.svgOverlayLayer.FindElementByDOMElement(e.currentTarget);
                if (a) {
                  var r = a.GetTargetForEvent(e);
                  if (r) {
                    T3Gv.optManager.isMobilePlatform &&
                      (
                        t = T3Gv.optManager.svgOverlayLayer.GetElementByID('actionArrow' + this.BlockID)
                      );
                    var i = r.GetID(),
                      n = a.GetUserData(),
                      o = T3Gv.optManager.GetObjectPtr(n, !1);
                    // if (!(o && o instanceof ListManager.BaseDrawingObject)) return !1;
                    if (!(o && o instanceof BaseDrawingObject)) return !1;
                    switch (
                    gBusinessController.StopActionEventPropagation(n) ||
                    (
                      Utils2.StopPropagationAndDefaults(e),
                      T3Gv.optManager.SelectObjects([n], !1, !1)
                    ),
                    i
                    ) {
                      case ConstantData.ActionArrow.UP:
                        gBusinessController.AddAbove(e, n);
                        break;
                      case ConstantData.ActionArrow.LEFT:
                        gBusinessController.AddLeft(e, n);
                        break;
                      case ConstantData.ActionArrow.DOWN:
                        gBusinessController.AddBelow(e, n);
                        break;
                      case ConstantData.ActionArrow.RIGHT:
                        gBusinessController.AddRight(e, n);
                        break;
                      default:
                        i >= ConstantData.ActionArrow.CUSTOM &&
                          gBusinessController.AddCustom(e, n, i - ConstantData.ActionArrow.CUSTOM)
                    }
                    return T3Gv.optManager.isMobilePlatform &&
                      (
                        T3Gv.optManager.svgOverlayLayer.AddElement(t),
                        setTimeout(
                          (
                            function () {
                              T3Gv.optManager.RemoveActionArrows(u);
                              var e = T3Gv.optManager.ZList(),
                                t = e.length;
                              if (t) {
                                T3Gv.optManager.SelectObjects([e[t - 1]], !1, !1);
                                var a = T3Gv.optManager.GetObjectPtr(e[t - 1], !1),
                                  r = T3Gv.optManager.svgObjectLayer.GetElementByID(a.BlockID);
                                a.SetRolloverActions(T3Gv.optManager.svgDoc, r)
                              }
                            }
                          ),
                          0
                        )
                      ),
                      !1
                  }
                }
              },
              Y = function (e) {
                T3Gv.optManager.SetActionArrowTimer(u)
              },
              Z = function (e) {
                T3Gv.optManager.ClearActionArrowTimer(u)
              },
              Q = null,
              ee = null;
            for (q = 0; q < d.length; ++q) Q = d[q],

              // Double ===
              (ee = Hammer(Q)).on('dragstart', X),
              ee.on('click', K),
              Q.onmouseout = Y,
              Q.onmouseover = Z;
            t.svgObj.mouseout(
              (
                function () {
                  T3Gv.optManager.SetActionArrowTimer(u),
                    p.SetRuntimeEffects(!1),
                    p.ClearCursors(),
                    T3Gv.optManager.curHiliteShape = - 1
                }
              )
            )
          }
        }
      } else
        // ListManager.BaseDrawingObject.prototype.SetRolloverActions.apply(this, [e,t]);
        // Double === TODO
        super.SetRolloverActions(
          e,
          t
        )
    }
  }



  UseEdges(e, t, a, r, i, n) {
    var o,
      s = 0,
      l = 0,
      S = 0,
      c = 0,
      u = 0,
      p = 0,
      d = !1;
    if (
      i.x !== n.x &&
      (
        e &&
          a ? (s = n.x - i.x, d = !0) : (
          o = this.Frame.x + this.Frame.width / 2,
          Math.abs(o - i.x / 2) < 100 ? (u = (n.x - i.x) / 2, d = !0) : this.Frame.x > i.x / 2 &&
            (u = n.x - i.x, d = !0)
        )
      ),
      i.y !== n.y &&
      (
        t &&
          r ? (l = n.y - i.y, d = !0) : (
          o = this.Frame.y + this.Frame.height / 2,
          Math.abs(o - i.y / 2) < 100 ? (p = (n.y - i.y) / 2, d = !0) : this.Frame.y > i.y / 2 &&
            (p = n.y - i.y, d = !0)
        )
      ),
      d
    ) {
      T3Gv.optManager.GetObjectPtr(this.BlockID, !0),
        (u || p) &&
        this.OffsetShape(u, p);
      r = this.Frame.y + this.Frame.height;
      if (s || l) if (
        s &&
        (S = this.Frame.width + s),
        l &&
        (c = this.Frame.height + l),
        this.SetSize(S, c, ConstantData.ActionTriggerType.LINELENGTH),
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_ANNOTATION
      ) p = r - (this.Frame.y + this.Frame.height),
        ((u = 0) || p) &&
        this.OffsetShape(u, p);
      return T3Gv.optManager.AddToDirtyList(this.BlockID),
        !0
    }
    return !1
  }

























  Pr_UpdateExtra(e) {
    var t = this.BlockID,
      a = T3Gv.optManager.GetObjectPtr(this.hooks[0].objid, !0);
    // if (a && a instanceof ListManager.ShapeContainer) {
    // if (a && a instanceof GlobalDataShape.ShapeContainer) {
    if (a && a instanceof Instance.Shape.ShapeContainer) {
      var r,
        i = a.ContainerList;
      if (!(i.flags & ConstantData.ContainerListFlags.Sparse)) for (len = i.List.length, r = 0; r < len; r++) if (i.List[r].id === t) return i.List[r].extra += e,
        i.List[r].extra < 0 &&
        (i.List[r].extra = 0),
        T3Gv.optManager.SetLinkFlag(a.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
        void (
          a.flags = Utils2.SetFlag(a.flags, ConstantData.ObjFlags.SEDO_Obj1, !0)
        )
    }
  }

  Pr_GetAdjustShapeList() {
    var e,
      t,
      a,
      r,
      i = [],
      n = [],
      o = [],
      s = function (e) {
        (r = T3Gv.optManager.GetObjectPtr(e, !1)) &&
          (a = r.GetSVGFrame(), o.push(a), i.push(e), n.push(e))
      };
    if (this.hooks.length) {
      var l = this.BlockID,
        S = 0,
        c = !1,
        u = T3Gv.optManager.GetObjectPtr(this.hooks[0].objid, !1);
      // if (u && u instanceof ListManager.ShapeContainer) {
      // if (u && u instanceof GlobalDataShape.ShapeContainer) {
      if (u && u instanceof Instance.Shape.ShapeContainer) {
        var p = u.ContainerList;
        if (!(p.flags & ConstantData.ContainerListFlags.Sparse)) {
          for (t = p.List.length, e = 0; e < t; e++) p.List[e].id === l ? (S = p.List[e].extra, s(l), c = !0) : c &&
            s(p.List[e].id);
          return {
            list: i,
            svglist: n,
            framelist: o,
            framelist: o,
            oldextra: S,
            arrangement: p.Arrangement
          }
        }
      }
    }
    return null
  }

  OnDisconnect(e, t, a, r) {
    if (
      // t instanceof ListManager.ShapeContainer &&
      // t instanceof GlobalDataShape.ShapeContainer &&
      t instanceof Instance.Shape.ShapeContainer &&
      null != this.zListIndex &&
      this.zListIndex >= 0
    ) {
      var i = T3Gv.optManager.svgObjectLayer.GetElementByID(e);
      i &&
        (
          T3Gv.optManager.svgObjectLayer.RemoveElement(i),
          T3Gv.optManager.svgObjectLayer.AddElement(i, this.zListIndex),
          this.zListIndex = - 1
        )
    }
  }


}

export default BaseShape
