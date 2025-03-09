






// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import T3Svg from '../../Hvac.SVG.t2';




import BaseSymbol from './S.BaseSymbol'
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/T3Gv'
import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
import EvtUtil from "../Event/EvtUtil";
import Resources from '../Data/Resources'
import ListManager from '../Data/ListManager';
import { List } from 'echarts';
// import Element from "../Basic/Basic.Element";

import Document from '../Basic/B.Document'

import Element from '../Basic/B.Element';

import WResult from '../Model/WResult'

import SDF from '../Data/SDF'
import Globals from '../Data/Globals'
import $ from 'jquery'
import Effects from '../Basic/B.Element.Effects'
import Instance from '../Data/Instance/Instance'
import ConstantData from '../Data/ConstantData'

class GroupSymbol extends BaseSymbol {


  constructor(e) {
    //'use strict';
    e = e || {};
    e.ShapeType = ConstantData.ShapeType.GROUPSYMBOL;
    e.flags = ConstantData.ObjFlags.SEDO_ImageOnly;
    // const t = ListManager.BaseSymbol.apply(this, [e]);
    super(e)
    // if (t) return t;
  }
  // ListManager.GroupSymbol.prototype = new ListManager.BaseSymbol,
  // ListManager.GroupSymbol.prototype.constructor = ListManager.GroupSymbol

  CreateShape(e, t) {
    return this.flags & ConstantData.ObjFlags.SEDO_NotVisible ? null : (
      this.GetFieldDataStyleOverride(),
      e.CreateShape(Document.CreateShapeType.SHAPECONTAINER)
    )
  }


  PostCreateShapeCallback(e, t, a, r) {

    console.log('== track UpdateDimensionsLines Shape.GroupSymbol-> PostCreateShapeCallback')


    if (!(this.flags & ConstantData.ObjFlags.SEDO_NotVisible)) {
      var i = e.CreateShape(Document.CreateShapeType.GROUP);
      i.SetID(ConstantData.SVGElementClass.SHAPE),
        t.AddElement(i);
      var n,
        o = this.Frame,
        s = (this.trect, this.StyleRecord, o.width),
        l = o.height;
      t.SetSize(s, l),
        t.SetPos(o.x, o.y);
      var S,
        c = this.ShapesInGroup.length,
        u = null,
        p = null,
        d = 0,
        D = null,
        g = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipHoriz) > 0,
        h = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipVert) > 0,
        m = g,
        C = h,
        y = 0;
      for (
        null != r &&
        (
          (r & ConstantData.ExtraFlags.SEDE_FlipHoriz) > 0 &&
          (m = !m),
          (r & ConstantData.ExtraFlags.SEDE_FlipVert) > 0 &&
          (C = !C)
        ),
        y = Utils2.SetFlag(y, ConstantData.ExtraFlags.SEDE_FlipHoriz, m),
        y = Utils2.SetFlag(y, ConstantData.ExtraFlags.SEDE_FlipVert, C),
        n = 0;
        n < c;
        ++n
      ) {
        var f = this.ShapesInGroup[n];
        S = (u = T3Gv.optManager.GetObjectPtr(f, !1)).Dimensions,
          u.Dimensions = 0,
          (p = u.CreateShape(e)) &&
          (
            p.SetID(f),
            i.AddElement(p),
            u.PostCreateShapeCallback(e, p, null, y)
          ),
          u.Dimensions = S,
          d = u.RotationAngle,
          // u instanceof ListManager.BaseShape &&
          // u instanceof GlobalDataShape.BaseShape &&
          u instanceof Instance.Shape.BaseShape &&
          (
            0 !== d &&
            p.SetRotation(d),
            u.DataID >= 0 &&
            (m || C) &&
            (D = p.GetElementByID(ConstantData.SVGElementClass.TEXT)) &&
            (m && D.SetMirror(m), C && D.SetFlip(C))
          )
      }
      i.SetSize(s, l),
        t.isShape = !0;
      var L = e.CreateShape(Document.CreateShapeType.RECT);
      L.SetStrokeColor('white'),
        L.SetFillColor('none'),
        L.SetOpacity(0),
        L.SetStrokeWidth(5),
        a ? L.SetEventBehavior(Element.EventBehavior.HIDDEN_ALL) : L.SetEventBehavior(Element.EventBehavior.NONE),
        t.AddElement(L),
        L.SetID(ConstantData.SVGElementClass.SLOP),
        L.ExcludeFromExport(!0),
        L.SetSize(s, l),
        i.SetScale(
          s / this.InitialGroupBounds.width,
          l / this.InitialGroupBounds.height
        ),
        g &&
        i.SetMirror(g),
        h &&
        i.SetFlip(h),
        - 1 != this.DataID &&
        this.LM_AddSVGTextObject(e, t),
        this.UpdateDimensionLines(t),
        this.AddIcons(e, t),
        this.ApplyEffects(t, !1, !1)
    }
  }

  SetObjectStyle(e) {
    if (!e.ImageURL || '' === e.ImageURL) {
      var t = T3Gv.optManager.ApplyColorFilter(e, this, this.StyleRecord, this.colorfilter);
      T3Gv.optManager.ApplyGroupProperties(t, this)
    }
  }

  ChangeTextAttributes(e, t, a, r, i, n, o, s) {
    var l,
      S,
      c = this.ShapesInGroup,
      u = c.length,
      p = !1;
    if (0 !== u) {
      if (o) var d = o;
      else d = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      var D,
        g;
      if (
        d &&
        (D = d.GetElementByID(ConstantData.SVGElementClass.SHAPE)),
        null != D
      ) {
        var h;
        for (
          this.AllowTextEdit() &&
          ListManager.BaseSymbol.prototype.ChangeTextAttributes.call(this, e, t, a, r, i, n, g, s),
          t &&
          (
            void 0 !== t.FontName &&
            (this.StyleRecord.Text.FontName = t.FontName),
            void 0 !== t.FontId &&
            (this.StyleRecord.Text.FontId = t.FontId),
            void 0 !== t.FontSize &&
            (this.StyleRecord.Text.FontSize = t.FontSize),
            void 0 !== t.Face &&
            (this.StyleRecord.Text.Face = t.Face),
            void 0 !== t.Color &&
            (this.StyleRecord.Text.Paint.Color = t.Color),
            void 0 !== t.Opacity &&
            (this.StyleRecord.Text.Paint.Opacity = t.Opacity)
          ),
          h = 0;
          h < u;
          ++h
        ) {
          var m;
          (m = T3Gv.optManager.GetObjectPtr(c[h], !0)) &&
            0 == (
              m.colorfilter & FileParser.SDRColorFilters.SD_NOCOLOR_TEXT
            ) &&
            (g = D.GetElementByID(m.BlockID)) &&
            (
              l = m.Frame.height,
              S = m.Frame.width,
              m.ChangeTextAttributes(e, t, a, r, i, n, g, s),
              m.Frame.width !== S &&
              (p = !0),
              m.Frame.height !== l &&
              (p = !0)
            )
        }
        if (p) {
          T3Gv.optManager.AddToDirtyList(this.BlockID);
          var C = this.Frame.width / this.InitialGroupBounds.width,
            y = this.Frame.height / this.InitialGroupBounds.height;
          if (
            this.InitialGroupBounds = T3Gv.optManager.GetListSRect(c),
            !isNaN(C) &&
            !isNaN(y)
          ) {
            var f = Utils1.DeepCopy(this.Frame);
            f.width = C * this.InitialGroupBounds.width,
              f.height = y * this.InitialGroupBounds.height,
              this.UpdateFrame(f)
          }
        }
        this.ConvertToNative(T3Gv.optManager.RichGradients, !1)
      }
    }
  }

  GetTextures(e) {
    var t,
      a,
      r = this.ShapesInGroup.length;
    for (t = 0; t < r; t++) (a = T3Gv.optManager.GetObjectPtr(this.ShapesInGroup[t], !1)) &&
      a.GetTextures(e)
  }

  Resize(e, t, a) {

    console.log('== track UpdateDimensionsLines Shape.GroupSymbol-> Resize')


    var r = e.GetRotation(),
      i = $.extend(!0, {
      }, this.prevBBox),
      n = $.extend(!0, {
      }, t),
      o = T3Gv.optManager.svgDoc.CalculateRotatedOffsetForResize(i, n, r);
    e.SetSize(t.width, t.height),
      e.SetPos(t.x + o.x, t.y + o.y);
    var s = e.GetElementByID(ConstantData.SVGElementClass.SHAPE);
    return s.SetSize(t.width, t.height),
      s.SetScale(
        t.width / this.InitialGroupBounds.width,
        t.height / this.InitialGroupBounds.height
      ),
      e.GetElementByID(ConstantData.SVGElementClass.SLOP).SetSize(t.width, t.height),
      this.LM_ResizeSVGTextObject(e, a, t),
      e.SetRotation(r),
      this.UpdateDimensionLines(e),
      o
  }

  CreateActionTriggers(e, t, a, r) {
    // return ListManager.BaseShape.prototype.CreateActionTriggers.apply(this, [
    //   e,
    //   t,
    //   a,
    //   r
    // ])

    // Double ===

    this.BaseShape_CreateActionTriggers(e, t, a, r)
  }

  BaseShape_CreateActionTriggers(e, t, a, r) {
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
      s = e.CreateShape(Document.CreateShapeType.GROUP),
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
      shapeType: Document.CreateShapeType.RECT,
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
        R.shapeType = Document.CreateShapeType.OVAL,
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
        T3Gv.optManager.bTouchInitiated ||
        R.locked ||
        N ||
        k
      )
    ) {
      var J = this.TextGrow === ConstantData.TextGrowBehavior.HORIZONTAL &&
        this.flags & ConstantData.ObjFlags.SEDO_TextOnly &&
        SDF.TextAlignToWin(this.TextAlign).just === FileParser.TextJust.TA_LEFT;
      R.shapeType = Document.CreateShapeType.OVAL,
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

  InsertNewTable(e, t, a) {
    return !1
  }

  ContainsText() {
    if (this.DataID >= 0) return !1;
    if (T3Gv.optManager.SD_GetVisioTextChild(this.BlockID) >= 0) return !1;
    var e,
      t = this.ShapesInGroup.length;
    for (e = 0; e < t; e++) if (
      T3Gv.optManager.GetObjectPtr(this.ShapesInGroup[e], !1).ContainsText()
    ) return !0;
    return !1
  }

  ConvertToNative(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l = null,
      S = new WResult();
    if (S.RichGradients = e, i = this.ShapesInGroup.length) {
      for (n = 0; n < i; n++) s = this.ShapesInGroup[n],
        S.zList.push(this.ShapesInGroup[n]),
        (o = T3Gv.optManager.GetObjectPtr(s, !1)).layer = this.Layer,
        o.GetTextures(S.TextureList);
      S.sdp = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
        S.tLMB = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1),
        S.ctp = T3Gv.optManager.theContentHeader,
        S.GroupOffset.x = 0,
        S.GroupOffset.y = 0,
        S.WriteGroupBlock = !0,
        S.fontlist = T3Gv.optManager.theContentHeader.FontList,
        t &&
        (S.WriteVisio = !0);
      T3Gv.docHandler.svgDoc.GetWorkArea();
      S.docDpi = T3Gv.docHandler.svgDoc.docInfo.docDpi;
      var c = SDF.WriteBuffer(S, !0, !0, !0);
      if (!0 === a) return c;
      c &&
        (l = new Uint8Array(c)) &&
        (
          this.NativeID >= 0 ? (r = T3Gv.objectStore.PreserveBlock(this.NativeID)) &&
            (r.Data = l) : (
            r = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.H_NATIVE_OBJECT, l),
            this.NativeID = r.ID
          )
        )
    }
  }

  WriteSDFAttributes(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s = /*new SDF.WResult,*/ new WResult,
      l = this.DataID;
    if (
      (
        this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB ||
        this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA
      ) &&
      (t.WriteBlocks || (l = - 1)),
      s.RichGradients = T3Gv.optManager.RichGradients,
      SDF.WriteTextParams(e, this, l, t),
      t.WriteBlocks
    ) SDF.WriteNativeID(e, this.NativeID, t);
    else if (this.NativeID, a = this.ShapesInGroup.length) {
      for (r = 0; r < a; r++) o = this.ShapesInGroup[r],
        s.zList.push(this.ShapesInGroup[r]),
        (n = T3Gv.optManager.GetObjectPtr(o, !1)).layer = this.Layer,
        n.GetTextures(s.TextureList);
      s.sdp = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
        s.tLMB = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1),
        s.ctp = T3Gv.optManager.theContentHeader,
        this.InitialGroupBounds.x > 0 ||
          this.InitialGroupBounds.y > 0 ? (
          s.GroupOffset.x = this.Frame.x + t.GroupOffset.x,
          s.GroupOffset.y = this.Frame.y + t.GroupOffset.y
        ) : (
          s.GroupOffset.x = t.GroupOffset.x,
          s.GroupOffset.y = t.GroupOffset.y
        ),
        s.WriteGroupBlock = t.WriteGroupBlock,
        s.WriteVisio = t.WriteVisio,
        s.WriteWin32 = t.WriteWin32;
      T3Gv.docHandler.svgDoc.GetWorkArea();
      s.docDpi = T3Gv.docHandler.svgDoc.docInfo.docDpi;
      var S = SDF.WriteBuffer(s, !0, !0, !0);
      i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_NATIVESTORAGE),
        FileParser.write_nativebuffer(e, S),
        SDF.Write_LENGTH(e, i)
    }
  }

  ConvertToVisio(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s = [
        this.BlockID
      ],
      l = [],
      S = [],
      c = !1,
      u = this,
      p = T3Gv.optManager.SD_GetVisioTextChild(this.BlockID);
    if (p > 0) {
      var d = T3Gv.optManager.GetObjectPtr(p, !1);
      d &&
        (
          r = this.ShapesInGroup[0],
          (i = T3Gv.optManager.GetObjectPtr(r, !1)).DataID < 0 &&
          (
            i.DataID = d.DataID,
            i.trect = Utils1.DeepCopy(d.trect),
            i.TextAlign = d.TextAlign,
            d.associd = r,
            i.associd = p
          )
        )
    }
    var D = this.ShapesInGroup.length,
      g = u.Frame.width / u.InitialGroupBounds.width,
      h = u.Frame.height / u.InitialGroupBounds.height;
    isNaN(g) &&
      (g = 1),
      isNaN(h) &&
      (h = 1);
    var m = {
      x: u.Frame.x + u.Frame.width / 2,
      y: u.Frame.y + u.Frame.height / 2
    };
    for (
      0,
      0,
      Utils2.IsEqual(g, 1) &&
      Utils2.IsEqual(h, 1) ||
      (
        c = !0,
        u.InitialGroupBounds.width = u.Frame.width,
        u.InitialGroupBounds.height = u.Frame.height
      ),
      a = 0;
      a < D;
      ++a
    ) if (
        r = this.ShapesInGroup[a],
        i = T3Gv.optManager.GetObjectPtr(r, !1),
        c &&
        i.ScaleObject(0, 0, m, 0, g, h, !0),
        l = i.ConvertToVisio(e, t)
      ) for (n = l.length, o = 0; o < n; o++) S.push(l[o]);
    return this.ShapesInGroup = S,
      s
  }

  DeleteObject() {
    var e,
      t,
      a,
      r = this.ShapesInGroup,
      i = r.length;
    for (e = 0; e < i; ++e) (t = T3Gv.optManager.GetObjectPtr(r[e], !1)) &&
      (a = T3Gv.objectStore.GetObject(r[e]), t.DeleteObject(), a && a.Delete());
    // ListManager.BaseDrawingObject.prototype.DeleteObject.call(this)
    // Double === TODO
    this.BaseDrawingObject_DeleteObject()
  }


  BaseDrawingObject_DeleteObject() {


    console.log('== track UpdateDimensionsLines Shape.GroupSymbol-> BaseDrawingObject_DeleteObject')


    var e = null,
      t = null,
      a = null,
      r = [];
    if (- 1 != this.TableID) {
      var i = T3Gv.optManager.GetObjectPtr(this.TableID, !0);
      i &&
        T3Gv.optManager.Table_DeleteObject(i),
        (e = T3Gv.objectStore.GetObject(this.TableID)) &&
        e.Delete()
    }
    - 1 != this.DataID &&
      (e = T3Gv.objectStore.GetObject(this.DataID)) &&
      e.Delete(),
      - 1 != this.NoteID &&
      (e = T3Gv.objectStore.GetObject(this.NoteID)) &&
      e.Delete(),
      - 1 != this.NativeID &&
      (e = T3Gv.objectStore.GetObject(this.NativeID)) &&
      e.Delete(),
      - 1 != this.GanttInfoID &&
      (e = T3Gv.objectStore.GetObject(this.GanttInfoID)) &&
      e.Delete(),
      - 1 != this.BlobBytesID &&
      (
        (e = T3Gv.objectStore.GetObject(this.BlobBytesID)) &&
        e.Delete(),
        T3Gv.optManager.IsBlobURL(this.ImageURL) &&
        T3Gv.optManager.DeleteURL(this.ImageURL)
      ),
      - 1 != this.EMFBlobBytesID &&
      (e = T3Gv.objectStore.GetObject(this.EMFBlobBytesID)) &&
      e.Delete(),
      - 1 != this.OleBlobBytesID &&
      (e = T3Gv.objectStore.GetObject(this.OleBlobBytesID)) &&
      e.Delete(),
      // this.RemoveFieldData(!0),
      // Double === TODO
      this.BaseDrawingObject_RemoveFieldData(!0),
      this.hooks.length &&
      (
        !(t = T3Gv.optManager.GetObjectPtr(this.hooks[0].objid, !1)) ||
        t.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ||
        t.Dimensions & ConstantData.DimensionFlags.SED_DF_HideHookedObjDimensions ||
        (
          r = Utils1.DeepCopy(this.hooks),
          this.hooks = [],
          a = T3Gv.optManager.svgObjectLayer.GetElementByID(t.BlockID),
          t.UpdateDimensionLines(a),
          this.hooks = r
        )
      ),
      this.CommentID >= 0 &&
      T3Gv.optManager.CommentObjectDelete(this)
  }

  BaseDrawingObject_RemoveFieldData(e, t) {
    if (this.HasFieldData() && (!t || this.fieldDataTableID == t)) {
      T3Gv.optManager.GetObjectPtr(this.BlockID, !0);
      e &&
        (
          this.fieldDataElemID < 0 ? ListManager.SDData.DeleteFieldedDataTable(this.fieldDataTableID) : ListManager.SDData.FieldedDataDelRecord(this.fieldDataTableID, this.fieldDataElemID)
        ),
        this.fieldDataDatasetID = - 1,
        this.fieldDataTableID = - 1,
        this.fieldDataElemID = - 1,
        this.dataStyleOverride = null,
        T3Gv.optManager.AddToDirtyList(this.BlockID),
        // this.RefreshFromFieldData()
        // Double === TODO
        this.BaseDrawingObject_RefreshFromFieldData()
    }
  }

  BaseDrawingObject_RefreshFromFieldData(e) {
    if (e && this.fieldDataTableID != e) return !1;
    var t = this.HasFieldDataInText(e),
      a = this.HasFieldDataRules(e),
      r = !1;
    return !(!t && !a) &&
      (
        this.GetFieldDataStyleOverride(),
        t &&
        (
          this.ChangeTextAttributes(null, null, null, null, null, null, null, !0),
          r = !0
        ),
        ListManager.SDData.FieldedDataHasRulesForRecord(this.fieldDataTableID, this.fieldDataElemID) &&
        (T3Gv.optManager.AddToDirtyList(this.BlockID), r = !0),
        r
      )
  }

  ApplyEffects(e, t, a) {
    if (
      (
        e = e ||
        T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID)
      ) &&
      T3Gv.optManager.bDrawEffects &&
      !T3Gv.optManager.bTokenizeStyle
    ) {
      var r = e.shapeGroup ||
        e,
        i = [],
        n = null,
        o = 4;
      t ? n = '#FFD64A' : this.collabGlowColor ? (n = this.collabGlowColor, o = 6) : this.dataStyleOverride &&
        this.dataStyleOverride.glowColor &&
        (n = this.dataStyleOverride.glowColor),
        n &&
        i.push({
          type: Effects.EffectType.GLOW,
          params: {
            color: n,
            size: o,
            asSecondary: !0
          }
        }),
        r.Effects().SetEffects(i, this.Frame)
    }
  }

  AllowTextEdit() {
    return !!(
      this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB ||
      this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA ||
      this.TextFlags & ConstantData.TextFlags.SED_TF_AttachD ||
      this.DataID >= 0
    )
  }

  RemoveFieldData(e, t) {
    ListManager.BaseSymbol.prototype.RemoveFieldData.call(this, e, t);
    var a,
      r,
      i = this.ShapesInGroup,
      n = i.length;
    for (a = 0; a < n; ++a) (r = T3Gv.optManager.GetObjectPtr(i[a], !1)) &&
      r.RemoveFieldData(e, t)
  }

  HasFieldDataInText(e) {
    var t,
      a,
      r = this.ShapesInGroup,
      i = r.length;
    if (
      ListManager.BaseSymbol.prototype.HasFieldDataInText.call(this, e)
    ) return !0;
    for (t = 0; t < i; ++t) if (
      (a = T3Gv.optManager.GetObjectPtr(r[t], !1)) &&
      a.HasFieldDataInText(e)
    ) return !0;
    return !1
  }

  HasFieldDataRules(e) {
    var t,
      a,
      r = this.ShapesInGroup,
      i = r.length;
    if (
      ListManager.BaseSymbol.prototype.HasFieldDataRules.call(this, e)
    ) return !0;
    for (t = 0; t < i; ++t) if (
      (a = T3Gv.optManager.GetObjectPtr(r[t], !1)) &&
      a.HasFieldDataRules(e)
    ) return !0;
    return !1
  }

  HasFieldDataForTable(e) {
    var t,
      a,
      r = this.ShapesInGroup,
      i = r.length;
    if (
      ListManager.BaseSymbol.prototype.HasFieldDataForTable.call(this, e)
    ) return !0;
    for (t = 0; t < i; ++t) if (
      (a = T3Gv.optManager.GetObjectPtr(r[t], !1)) &&
      a.HasFieldDataForTable(e)
    ) return !0;
    return !1
  }

  HasFieldDataRecord(e, t, a) {
    var r,
      i,
      n = this.ShapesInGroup,
      o = n.length;
    if (
      ListManager.BaseSymbol.prototype.HasFieldDataRecord.call(this, e, t, a)
    ) return !0;
    if (!a) return !1;
    for (r = 0; r < o; ++r) if (
      (i = T3Gv.optManager.GetObjectPtr(n[r], !1)) &&
      i.HasFieldDataRecord(e, t, a)
    ) return !0;
    return !1
  }

  RefreshFromFieldData(e) {
    var t = !1;
    return ListManager.BaseSymbol.prototype.RefreshFromFieldData.call(this, e) &&
      (t = !0),
      this.HasFieldDataInText(e) &&
      (
        this.GetFieldDataStyleOverride(),
        this.ChangeTextAttributes(null, null, null, null, null, null, null, !0),
        t = !0
      ),
      this.HasFieldDataRules(e) &&
      (T3Gv.optManager.AddToDirtyList(this.BlockID), t = !0),
      t
  }

  RemapDataFields(e) {
    var t,
      a,
      r = this.ShapesInGroup,
      i = r.length;
    for (
      ListManager.BaseSymbol.prototype.RemapDataFields.call(this, e),
      t = 0;
      t < i;
      ++t
    ) (a = T3Gv.optManager.GetObjectPtr(r[t], !1)) &&
      a.RemapDataFields(e)
  }

}

export default GroupSymbol;

