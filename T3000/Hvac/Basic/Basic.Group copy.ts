

// import Basic from "./Basic.Index";
import HvacSVG from "../Helper/SVG.t2"
import $ from "jquery";
// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";

import Container from "./Basic.Container";

import Global from "./Basic.Global";
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"


class Group extends Container {

  public clipElem: any;

  constructor() {
    super()
  }


  // GetInstanceName() {
  //   return "Group";
  // }
  // Basic.Group = function () {
  // },
  // Basic.Group.prototype = new Basic.Container,
  // Basic.Group.prototype.constructor = Basic.Group,
  CreateElement(e, t) {
    //'use strict';
    return this.svgObj = new HvacSVG.Container(HvacSVG.create('g')),
      this.clipElem = null,
      this.InitElement(e, t),
      this.svgObj
  }

  GetGeometryBBox() {
    //'use strict';
    if (this.geometryBBox.width < 0 || this.geometryBBox.height < 0) {
      var e,
        t,
        a,
        r = this.doc.GetFormattingLayer(),
        i = [],
        n = {
          x: this.svgObj.trans.x,
          y: this.svgObj.trans.y
        },
        o = this.svgObj.trans.rotation,
        s = this.svgObj.parent,
        l = 0;
      s &&
        (l = this.svgObj.position(), s.remove(this.svgObj));
      var S = function (e, t) {
        var a,
          r = e.parentNode;
        if (
          e.hasAttribute &&
          e.removeAttribute &&
          'ELEMENT_NODE' === e.nodeType
        ) {
          if (e.hasAttribute('no-export') || e.hasAttribute('sfx')) return t.push({
            node: e,
            parent: r,
            sibling: e.nextSibling
          }),
            void r.removeChild(e);
          if ('pattern' === e.nodeName) return t.push({
            node: e,
            parent: r,
            sibling: e.nextSibling
          }),
            void r.removeChild(e);
          for (a = e.childNodes.length - 1; a >= 0; a--) S(e.childNodes[a], t)
        }
      };
      for (
        S(this.svgObj.node, i),
        r.svgObj.add(this.svgObj),
        this.svgObj.transform({
          x: 0,
          y: 0,
          rotation: 0
        }),
        e = this.svgObj.rbox(),
        r.svgObj.remove(this.svgObj),
        t = this.doc.ConvertWindowToDocCoords(e.x, e.y),
        this.geometryBBox.x = t.x,
        this.geometryBBox.y = t.y,
        this.geometryBBox.width = e.width,
        this.geometryBBox.height = e.height,
        this.svgObj.transform({
          x: n.x,
          y: n.y,
          rotation: o
        }),
        a = 0;
        a < i.length;
        a++
      ) i[a].parent.insertBefore(i[a].node, i[a].sibling);
      s &&
        s.add(this.svgObj, l),
        this.UpdateTransform()
    }
    return this.geometryBBox
  }

  SetClipRect(e, t, a, r) {
    //'use strict';
    if (this.ClearClipRect(), a && r) {
      var i = Utils1.MakeGuid(),
        n = new HvacSVG.Container(HvacSVG.create('clipPath'));
      n.attr('id', i);
      var o = new HvacSVG.Rect;
      o.transform({
        x: Global.RoundCoord(e),
        y: Global.RoundCoord(t)
      }),
        o.size(
          Global.RoundCoord(a),
          Global.RoundCoord(r)
        ),
        n.add(o),
        this.svgObj.add(n),
        this.svgObj.attr('clip-path', 'url(#' + i + ')'),
        this.clipElem = n
    }
  }

  ClearClipRect() {
    //'use strict';
    this.clipElem &&
      (
        this.svgObj.remove(this.clipElem),
        this.svgObj.node.removeAttribute('clip-path'),
        this.clipElem = null
      )
  }

  // Double move functions from Basic.Element to Basic.Group
  GetTargetForEvent(e: any) {
    // debugger

    console.log('Element.GetTargetForEvent', e);

    // debugger;

    //'use strict';
    var target, element, rootElement;



    // if (!(e && this.GetInstanceName() === "Container")) return this;
    if (!(e && this instanceof Container)) return this;

    target = e.target || e.srcElement;
    rootElement = this.DOMElement();

    if (!target || target === rootElement) return this;

    element = this.FindElementByDOMElement(target);

    while (target && !element) {
      target = target.parentNode;
      element = (target === rootElement) ? this : this.FindElementByDOMElement(target);
    }

    return element || this;
  }

  // Double move functions from Basic.Element to Basic.Group
  RefreshPaint(e) {
    //'use strict';
    if (
      this.fillPatternData ? this.UpdatePattern(this.fillPatternData.ID, !0) : this.fillGradientData &&
        this.UpdateGradient(this.fillGradientData.ID, !0),
      this.strokePatternData ? this.UpdatePattern(this.strokePatternData.ID, !1) : this.strokeGradientData &&
        this.UpdateGradient(this.strokeGradientData.ID, !1),
      e &&
      this instanceof Group
      // this.GetInstanceName() === "Group"
    ) {
      var t,
        a,
        r = this.ElementCount();
      for (t = 0; t < r; t++) (a = this.GetElementByIndex(t)) &&
        a.RefreshPaint(e)
    }
  }
}

export default Group;


// export default Basic.Group;
