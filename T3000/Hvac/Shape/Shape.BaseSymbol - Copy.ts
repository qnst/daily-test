




// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import HvacSVG from '../../Hvac.SVG.t2';


import BaseShape from './Shape.BaseShape'
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";

// import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/GlobalData'
// import Collab from '../Data/Collab'
// import FileParser from '../Data/FileParser'
// import DefaultEvt from "../Event/Event.Default";
// import Resources from '../Data/Resources'
// import Element from "../Basic/Basic.Element";

import Document from '../Basic/Basic.Document'

import Element from '../Basic/Basic.Element';
import ListManager from '../Data/ListManager'
import ConstantData from '../Data/ConstantData'


class BaseSymbol extends BaseShape {

  constructor(e) {
    e = e || {};
    e.ObjGrow = ConstantData.GrowBehavior.PROPORTIONAL;
    e.ResizeAspectConstrain = true;
    // const t = ListManager.BaseShape.apply(this, [e]);

    super(e);

    // if (t) {
    this.nativeDataArrayBuffer = e.nativeDataArrayBuffer || null;
    this.SymbolData = e.SymbolData || null;
    // return t;
  }



  // ListManager.BaseSymbol = function (e) {
  //   (e = e || {
  //   }).ObjGrow = ConstantData.GrowBehavior.PROPORTIONAL,
  //     e.ResizeAspectConstrain = !0;
  //   var t = ListManager.BaseShape.apply(this, [
  //     e
  //   ]);
  //   if (t) return t.nativeDataArrayBuffer = e.nativeDataArrayBuffer ||
  //     null,
  //     t.SymbolData = e.SymbolData ||
  //     null,
  //     t
  // }


  // ListManager.BaseSymbol.prototype = new ListManager.BaseShape,
  // ListManager.BaseSymbol.prototype.constructor = ListManager.BaseSymbol,
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
    ],
      n = e.CreateShape(Document.CreateShapeType.GROUP),
      o = ConstantData.Defines.SED_KnobSize,
      s = ConstantData.Defines.SED_RKnobSize,
      l = e.docInfo.docToScreenScale;
    e.docInfo.docScale <= 0.5 &&
      (l *= 2);
    var S = o / l,
      c = s / l,
      u = this.Frame,
      p = u.width,
      d = u.height;
    p += S,
      d += S;
    var D = $.extend(!0, {
    }, u);
    D.x -= S / 2,
      D.y -= S / 2,
      D.width += S,
      D.height += S;
    var g = a.GetRotation() + 22.5;
    g >= 360 &&
      (g = 0);
    var h = Math.floor(g / 45),
      m = i.slice(h, i.length).concat(i.slice(0, h)),
      C = {
        svgDoc: e,
        shapeType: Document.CreateShapeType.RECT,
        x: 0,
        y: 0,
        knobSize: S,
        fillColor: 'black',
        fillOpacity: 1,
        strokeSize: 1,
        strokeColor: '#777777',
        locked: !1
      };
    t != r &&
      (
        C.fillColor = 'white',
        C.strokeSize = 1,
        C.strokeColor = 'black',
        C.fillOpacity = 0
      ),
      this.flags & ConstantData.ObjFlags.SEDO_Lock ? (C.fillColor = 'gray', C.locked = !0) : this.NoGrow() &&
        (
          C.fillColor = 'red',
          sideknobs = !1,
          C.strokeColor = 'red',
          m = [
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
      C.knobID = ConstantData.ActionTriggerType.TOPLEFT,
      C.cursorType = m[0];
    var y = this.GenericKnob(C);
    return n.AddElement(y),
      C.x = p - S,
      C.y = 0,
      C.cursorType = m[2],
      C.knobID = ConstantData.ActionTriggerType.TOPRIGHT,
      y = this.GenericKnob(C),
      n.AddElement(y),
      C.x = p - S,
      C.y = d - S,
      C.cursorType = m[4],
      C.knobID = ConstantData.ActionTriggerType.BOTTOMRIGHT,
      y = this.GenericKnob(C),
      n.AddElement(y),
      C.x = 0,
      C.y = d - S,
      C.cursorType = m[6],
      C.knobID = ConstantData.ActionTriggerType.BOTTOMLEFT,
      y = this.GenericKnob(C),
      n.AddElement(y),
      GlobalData.optManager.bTouchInitiated ||
      C.locked ||
      this.NoGrow() ||
      (
        C.shapeType = Document.CreateShapeType.OVAL,
        C.x = p - 3 * c,
        C.y = d / 2 - c / 2,
        C.cursorType = Element.CursorType.ROTATE,
        C.knobID = ConstantData.ActionTriggerType.ROTATE,
        C.fillColor = 'white',
        C.fillOpacity = 0.001,
        C.strokeSize = 1.5,
        C.strokeColor = '#555555',
        y = this.GenericKnob(C),
        n.AddElement(y)
      ),
      n.SetSize(p, d),
      n.SetPos(D.x, D.y),
      n.isShape = !0,
      n.SetID(ConstantData.Defines.Action + t),
      n
  }


  ChangeShape(e, t, a, r, i) {
    return !1
  }

  Flip(e) {
    GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
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
  }


  LM_ActionPreTrack(e, t) {
    (
      // SDUI.Commands.MainController.Dropdowns.HideAllDropdowns(),
      // Double === TODO
      - 1 != this.DataID
    ) &&
      (
        (
          this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA ||
          this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB
        ) &&
        GlobalData.optManager.theActionSVGObject.textElem.SetVisible(!1)
      );
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


  LM_ActionPostRelease(e) {
    - 1 != this.DataID &&
      (
        (
          this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA ||
          this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB
        ) &&
        GlobalData.optManager.theActionSVGObject.textElem.SetVisible(!0)
      );
    GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
      GlobalData.optManager.UpdateLinks(),
      GlobalData.optManager.LinkParams = null,
      this.sizedim.width = this.Frame.width,
      this.sizedim.height = this.Frame.height
  }

}

export default BaseSymbol


