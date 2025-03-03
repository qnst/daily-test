


// import Basic from "./Basic.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import GPP from "../gListManager";
import $ from "jquery";
// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import HvacSVG from '../../app-t5/Hvac.SVG.t2';
import HvacSVG from "../Helper/SVG.t2";

import Global from "./Basic.Global"
import Effects from "./Basic.Element.Effects"
import Style from "./Basic.Element.Style";
// import Container from "./Basic.Container";
// import Group from './Basic.Group'
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"
import GlobalData from '../Data/GlobalData'
import Instance from "../Data/Instance/Instance";

import ConstantData from "../Data/ConstantData"


class Element {


  public doc: any;
  public parent: any;
  public svgObj: any;
  public ID: any;
  public style: any;
  public effects: any;
  public userData: any;
  public cursor: any;
  public strokeWidth: any;
  public mirrored: any;
  public flipped: any;
  public geometryBBox: any;
  public fillPatternData: any;
  public strokePatternData: any;
  public internalID: any;
  public eventProxy: any;
  public fillGradientData: any;
  public strokeGradientData: any;
  public strokeDashArray: string;

  constructor() {
    this.doc = null;
    this.parent = null;
    this.svgObj = null;
  }

  // GetInstanceName() {
  //   return "Element";
  // }

  InitElement(svgDoc, parent) {

    this.doc = svgDoc;
    this.parent = parent;
    this.svgObj.SDGObj = this;
    this.ID = null;
    this.style = null;
    this.effects = null;
    this.userData = null;
    this.cursor = null;
    this.strokeWidth = 0;
    this.mirrored = false;
    this.flipped = false;
    this.geometryBBox = {};
    this.geometryBBox.x = 0;
    this.geometryBBox.y = 0;
    this.geometryBBox.width = - 1;
    this.geometryBBox.height = - 1;
    this.fillPatternData = null;
    this.strokePatternData = null;;
    this.internalID = null;
  }

  CreateElement(svgDoc, parent) {
    // //'use strict';
    throw this.InitElement(svgDoc, parent);
    // new SDJSError({
    //   source: 'CreateElement',
    //   message: 'Must override method for class'
    // })
  }

  Document() {
    //'use strict';
    return this.doc
  }

  Parent() {
    //'use strict';
    return this.parent
  }

  DOMElement() {
    //'use strict';
    return this.svgObj ? this.svgObj.node : null
  }

  InDocument() {
    //'use strict';
    if (!this.svgObj) return !1;
    for (var e = this.svgObj.parent; e;) {
      if ('svg' == e.type) return !0;
      e = e.parent
    }
    return !1
  }

  SetID(e) {
    //'use strict';
    this.ID = e
  }

  ExcludeFromExport(e) {
    //'use strict';
    e ? this.svgObj.node.setAttribute('no-export', '1') : this.svgObj.node.removeAttribute('no-export')
  }

  SetCustomAttribute(e, t) {
    //'use strict';
    t ? this.svgObj.node.setAttribute(e, t) : this.svgObj.node.removeAttribute(e)
  }

  GetCustomAttribute(e) {
    //'use strict';
    return this.svgObj.node.getAttribute(e)
  }

  SetHyperlinkAttribute(e) {
    //'use strict';
    (e = Global.ResolveHyperlink(e)) &&
      this.SetCustomAttribute('_explink_', e)
  }

  GetID() {
    //'use strict';
    return this.ID
  }

  GetInternalID() {
    //'use strict';
    return this.internalID ||
      (this.internalID = Utils1.MakeGuid()),
      this.internalID
  }

  SetInternalID() {
    //'use strict';
    var e = this.GetInternalID();
    return this.svgObj.attr('id', e),
      e
  }

  SetUserData(e) {
    //'use strict';
    this.userData = e
  }

  GetUserData() {
    //'use strict';
    return this.userData
  }

  SetEventProxy(e) {
    //'use strict';
    this.eventProxy = e
  }

  GetEventProxy() {
    //'use strict';
    return this.eventProxy
  }

  SetSize(e, t) {
    //'use strict';
    e = Global.RoundCoord(e),
      t = Global.RoundCoord(t),
      this.svgObj.size(e, t),
      this.UpdateTransform(),
      this.geometryBBox.width = e,
      this.geometryBBox.height = t,
      this.RefreshPaint()
  }

  SetPos(e, t) {
    //'use strict';
    e = Global.RoundCoord(e),
      t = Global.RoundCoord(t),
      this.svgObj.transform({
        x: e,
        y: t
      }),
      this.GetRotation() &&
      this.SetRotation(this.GetRotation()),
      this.UpdateTransform(),
      this.RefreshPaint(!0)
  }

  GetPos() {
    //'use strict';
    return {
      x: this.svgObj.trans.x,
      y: this.svgObj.trans.y
    }
  }

  SetCenter(e, t) {
    //'use strict';
    var a = this.CalcBBox(),
      r = e - a.width / 2,
      i = t - a.height / 2;
    this.SetPos(r, i)
  }

  SetRotation(e, t, a) {
    //'use strict';
    var r;
    void 0 === t &&
      (t = (r = this.CalcBBox()).cx),
      void 0 === a &&
      (a = (r = r || this.CalcBBox()).cy),
      t = Global.RoundCoord(t),
      a = Global.RoundCoord(a),
      e = Global.RoundCoord(e),
      this.svgObj.transform({
        rotation: e,
        cx: t,
        cy: a
      }),
      this.UpdateTransform()
  }

  GetRotation() {
    //'use strict';
    return this.svgObj.trans.rotation
  }

  SetMirror(e) {
    //'use strict';
    this.mirrored = e,
      this.UpdateTransform()
  }

  GetMirror() {
    //'use strict';
    return this.mirrored
  }

  SetFlip(e) {
    //'use strict';
    this.flipped = e,
      this.UpdateTransform()
  }

  GetFlip() {
    //'use strict';
    return this.flipped
  }

  SetScale(e, t) {
    //'use strict';
    this.GetScaleElement().transform({
      scaleX: e,
      scaleY: t
    }),
      this.UpdateTransform()
  }

  GetScale() {
    //'use strict';
    var e = this.GetScaleElement();
    return {
      scaleX: e.trans.scaleX ||
        1,
      scaleY: e.trans.scaleY ||
        1
    }
  }

  SetVisible(e) {
    //'use strict';
    e ? this.svgObj.show() : this.svgObj.hide()
  }

  GetVisible() {
    //'use strict';
    return this.svgObj.visible()
  }

  GetBBox() {
    //'use strict';
    var e,
      t = null;
    return this.parent ||
      (t = this.doc.GetFormattingLayer()).AddElement(this),
      e = this.svgObj.bbox(),
      t &&
      t.RemoveElement(this),
      e
  }

  CalcBBox() {
    //'use strict';
    var e = this.CalcElementFrame(!0);
    return e.cx = e.x + e.width / 2,
      e.cy = e.y + e.height / 2,
      e
  }

  GetRBox() {
    //'use strict';
    var e,
      t = null;
    return this.parent ||
      (t = this.doc.GetFormattingLayer()).AddElement(this),
      e = this.svgObj.rbox(),
      t &&
      t.RemoveElement(this),
      e
  }

  UpdateTransform() {
    //'use strict';
    var e = null;
    this.parent ||
      (e = this.doc.GetFormattingLayer()).AddElement(this);
    var t = this.GetScaleElement();
    if (t.transform({
    }), this.mirrored || this.flipped) {
      var a,
        r,
        i = this.CalcBBox(),
        n = t.trans.scaleX ||
          1,
        o = t.trans.scaleY ||
          1;
      a = t.node.transform.baseVal.consolidate().matrix,
        i.width /= n,
        i.height /= o,
        this.mirrored &&
        (a = a.flipX().translate(- i.width, 0)),
        this.flipped &&
        (a = a.flipY().translate(0, - i.height)),
        r = 'matrix(' + Global.RoundCoord(a.a) + ' ' + Global.RoundCoord(a.b) + ' ' + Global.RoundCoord(a.c) + ' ' + Global.RoundCoord(a.d) + ' ' + Global.RoundCoord(a.e) + ' ' + Global.RoundCoord(a.f) + ')',
        t.attr('transform', r)
    }
    e &&
      e.RemoveElement(this),
      // Basic.CleanGraphics()
      Utils1.CleanGraphics()
  }

  GetScaleElement() {
    //'use strict';
    return this.svgObj
  }

  CalcElementFrame(e) {
    //'use strict';
    for (
      var t = this.GetGeometryBBox(),
      a = {
        x: t.x,
        y: t.y,
        width: t.width,
        height: t.height
      },
      r = this.svgObj;
      r &&
      r !== this.doc.svgObj &&
      (a.x += r.trans.x, a.y += r.trans.y, r = r.parent, !e);
    );
    return a
  }

  GetGeometryBBox() {
    //'use strict';
    if (this.geometryBBox.width < 0 || this.geometryBBox.height < 0) {
      var e,
        t,
        a = this.doc.GetFormattingLayer(),
        r = {
          x: this.svgObj.trans.x,
          y: this.svgObj.trans.y
        },
        i = this.svgObj.trans.rotation,
        n = this.svgObj.parent,
        o = 0;
      n &&
        (o = this.svgObj.position(), n.remove(this.svgObj)),
        a.svgObj.add(this.svgObj),
        this.svgObj.transform({
          x: 0,
          y: 0,
          rotation: 0
        }),
        e = this.svgObj.rbox(),
        a.svgObj.remove(this.svgObj),
        t = this.doc.ConvertWindowToDocCoords(e.x, e.y),
        this.geometryBBox.x = t.x,
        this.geometryBBox.y = t.y,
        this.geometryBBox.width = e.width,
        this.geometryBBox.height = e.height,
        this.svgObj.transform({
          x: r.x,
          y: r.y,
          rotation: i
        }),
        n &&
        n.add(this.svgObj, o),
        this.UpdateTransform()
    }
    return this.geometryBBox
  }

  GetArrowheadBounds() {
    //'use strict';
    return []
  }

  SetTooltip(e) {
    //'use strict';
    Element.SetTooltipOnElement(this.svgObj, e)
  }

  static SetTooltipOnElement(e, t) {
    //'use strict';
    if (e && e instanceof HvacSVG.Container) {
      var a = new HvacSVG.Element(HvacSVG.create('title'));
      a.node.textContent = t,
        e.add(a)
    }
  }

  Style() {
    //'use strict';
    return this.style ||
      (this.style = new Style(this)),
      this.style
  }

  SetFillColor(e) {
    //'use strict';
    this.svgObj.attr('fill', e),
      this.ClearColorData(!0)
  }

  SetImageFill(e, t) {
    //'use strict';
    if (
      this.ClearColorData(!0),
      t = t ||
      {
      },
      this.fillPatternData = {},
      this.fillPatternData.options = {},
      this.fillPatternData.options.cropRect = t.cropRect ||
      {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      this.fillPatternData.options.scaleType = t.scaleType ||
      'PROPFILL',
      this.fillPatternData.url = e,
      this.fillPatternData.ID = Utils1.MakeGuid(),
      this.fillPatternData.imgWidth = t.imageWidth ||
      0,
      this.fillPatternData.imgHeight = t.imageHeight ||
      0,
      this.fillPatternData.patternElem = null,
      this.fillPatternData.imageElem = null,
      this.fillPatternData.isImage = !0,
      !this.fillPatternData.imgWidth ||
      !this.fillPatternData.imgHeight
    ) {
      var a = Style.GetCachedImageSize(e);
      a ? (
        this.fillPatternData.imgWidth = a.width,
        this.fillPatternData.imgHeight = a.height
      ) : Style.CalcImageSize(
        e,
        (
          function (e, t, a, r) {
            if (!a) {
              if (!r.elem || !r.elem.fillPatternData) return;
              r.elem.fillPatternData.imgWidth = e,
                r.elem.fillPatternData.imgHeight = t,
                r.elem.UpdatePattern(r.ID, r.fill)
            }
          }
        ),
        {
          ID: this.fillPatternData.ID,
          elem: this,
          fill: !0
        }
      )
    }
    this.UpdatePattern(this.fillPatternData.ID, !0)
  }

  UpdateImageFill(e) {
    //'use strict';
    e = e ||
    {
    },
      this.fillPatternData &&
      this.fillPatternData.isImage &&
      (
        this.fillPatternData.options.cropRect = e.cropRect ||
        this.fillPatternData.options.cropRect,
        this.fillPatternData.options.scaleType = e.scaleType ||
        this.fillPatternData.options.scaleType,
        this.UpdatePattern(this.fillPatternData.ID, !0)
      )
  }

  SetTextureFill(e) {
    //'use strict';
    e &&
      e.url &&
      (
        this.ClearColorData(!0),
        this.fillPatternData = {},
        this.fillPatternData.options = {},
        this.fillPatternData.options.scale = e.scale ||
        1,
        this.fillPatternData.options.alignment = e.alignment ||
        0,
        this.fillPatternData.url = e.url,
        this.fillPatternData.ID = Utils1.MakeGuid(),
        this.fillPatternData.imgWidth = e.dim.x,
        this.fillPatternData.imgHeight = e.dim.y,
        this.fillPatternData.patternElem = null,
        this.fillPatternData.imageElem = null,
        this.fillPatternData.isTexture = !0,
        this.UpdatePattern(this.fillPatternData.ID, !0)
      )
  }

  SetGradientFill(e) {
    //'use strict';
    var t,
      a;
    if (e && e.stops && e.stops.length) {
      for (
        this.ClearColorData(!0),
        this.fillGradientData = {},
        this.fillGradientData.settings = {},
        this.fillGradientData.settings.stops = [],
        this.fillGradientData.settings.type = e.type ||
        Style.GradientStyle.LINEAR,
        this.fillGradientData.settings.startPos = e.startPos ||
        Style.GradientPos.LEFTTOP,
        this.fillGradientData.settings.angle = e.angle,
        a = e.stops,
        t = 0;
        t < a.length;
        t++
      ) this.fillGradientData.settings.stops.push({
        offset: a[t].offset ||
          0,
        color: a[t].color ||
          '#fff',
        opacity: void 0 !== a[t].opacity ? a[t].opacity : 1
      });
      this.fillGradientData.ID = Utils1.MakeGuid(),
        this.fillGradientData.gradientElem = null,
        this.UpdateGradient(this.fillGradientData.ID, !0)
    }
  }

  ClearColorData(e) {
    //'use strict';
    var t,
      a;
    e ? (t = this.fillPatternData, a = this.fillGradientData) : (t = this.strokePatternData, a = this.strokeGradientData),
      t &&
      t.patternElem &&
      (
        this.svgObj.remove(t.patternElem),
        t.patternElem = null,
        t.imageElem = null
      ),
      a &&
      a.gradientElem &&
      (this.svgObj.remove(a.gradientElem), a.gradientElem = null),
      e ? (this.fillPatternData = null, this.fillGradientData = null) : (this.strokePatternData = null, this.strokeGradientData = null)
  }

  UpdatePattern(e, t) {
    //'use strict';
    var a;
    if ((a = t ? this.fillPatternData : this.strokePatternData) && a.ID == e) {
      if (
        a.patternElem ||
        (
          a.patternElem = new HvacSVG.Pattern,
          a.imageElem = new HvacSVG.Image,
          a.imageElem.load(a.url),
          a.patternElem.add(a.imageElem),
          a.patternElem.attr('id', a.ID),
          this.svgObj.add(a.patternElem, 0)
        ),
        a.isImage
      ) this.UpdateImagePattern(a);
      else {
        if (!a.isTexture) return;
        this.UpdateTexturePattern(a)
      }
      t ? this.svgObj.attr('fill', 'url(#' + a.ID + ')') : this.svgObj.attr('stroke', 'url(#' + a.ID + ')')
    }
  }

  UpdateImagePattern(e) {
    //'use strict';
    var t,
      a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c = this.CalcElementFrame();
    e.patternElem &&
      e.imageElem &&
      e.isImage &&
      (
        o = e.imgWidth ||
        c.width,
        s = e.imgHeight ||
        c.height,
        t = {
          x: e.options.cropRect.x,
          y: e.options.cropRect.y,
          width: e.options.cropRect.width ||
            o,
          height: e.options.cropRect.height ||
            s
        },
        e.imgWidth &&
        e.imgHeight ||
        (t.x = 0, t.y = 0),
        t.x >= o ||
        t.y >= s ||
        (
          t.width = Math.min(t.width, o - t.x),
          t.height = Math.min(t.height, s - t.y),
          a = c.width / t.width,
          r = c.height / t.height,
          'PROPFILL' == e.options.scaleType ? a > r ? r = a : a = r : 'PROPFIT' == e.options.scaleType ? a < r ? r = a : a = r : 'NONE' == e.options.scaleType &&
            (a = 1, r = 1),
          t.x *= a,
          t.y *= r,
          t.width *= a,
          t.height *= r,
          l = (c.width - t.width) / 2 - t.x,
          S = (c.height - t.height) / 2 - t.y,
          i = t.width - l,
          n = t.height - S,
          i < c.width &&
          (i = c.width),
          n < c.height &&
          (n = c.height),
          l = Global.RoundCoord(l / a),
          S = Global.RoundCoord(S / r),
          i = Global.RoundCoord(i + 1),
          n = Global.RoundCoord(n + 1),
          a = Global.RoundCoord(a),
          r = Global.RoundCoord(r),
          e.patternElem.attr({
            x: 0,
            y: 0,
            width: i,
            height: n,
            patternUnits: 'userSpaceOnUse',
            preserveAspectRatio: 'none meet',
            viewBox: '0 0 ' + i + ' ' + n
          }),
          e.patternElem.node.setAttribute('_isImage_', !0),
          e.imageElem.attr({
            x: 0,
            y: 0,
            width: o,
            height: s,
            transform: 'scale(' + a + ',' + r + ') translate(' + l + ',' + S + ')',
            preserveAspectRatio: 'none'
          })
        )
      )
  }

  UpdateTexturePattern(e) {
    //'use strict';
    var t,
      a,
      r,
      i = this.CalcElementFrame();
    if (
      e.patternElem &&
      e.imageElem &&
      e.isTexture &&
      e.imgWidth &&
      e.imgHeight
    ) {
      switch (
      t = e.options.scale,
      r = {
        x: 0,
        y: 0,
        width: (a = {
          x: 0,
          y: 0,
          width: e.imgWidth * t,
          height: e.imgHeight * t
        }).width,
        height: a.height
      },
      e.options.alignment
      ) {
        case ListManager.TextureAlign.SDTX_TOPLEFT:
          break;
        case ListManager.TextureAlign.SDTX_TOPCENTER:
          r.x += i.width / 2;
          break;
        case ListManager.TextureAlign.SDTX_TOPRIGHT:
          r.x = i.width - a.width;
          break;
        case ListManager.TextureAlign.SDTX_CENLEFT:
          r.y += i.height / 2;
          break;
        case ListManager.TextureAlign.SDTX_CENTER:
          r.x += i.width / 2,
            r.y += i.height / 2;
          break;
        case ListManager.TextureAlign.SDTX_CENRIGHT:
          r.x = i.width - a.width,
            r.y += i.height / 2;
          break;
        case ListManager.TextureAlign.SDTX_BOTLEFT:
          r.y = i.height - a.height;
          break;
        case ListManager.TextureAlign.SDTX_BOTCENTER:
          r.x += i.width / 2,
            r.y = i.height - a.height;
          break;
        case ListManager.TextureAlign.SDTX_BOTRIGHT:
          r.x = i.width - a.width,
            r.y = i.height - a.height;
          break;
        default:
          r.x = - i.x,
            r.y = - i.y
      }
      e.imageElem.attr({
        x: 0,
        y: 0,
        width: a.width,
        height: a.height,
        preserveAspectRatio: 'none'
      }),
        e.patternElem.attr({
          x: r.x,
          y: r.y,
          width: r.width,
          height: r.height,
          patternUnits: 'userSpaceOnUse',
          preserveAspectRatio: 'none meet',
          viewBox: '0 0 ' + a.width + ' ' + a.height
        })
    }
  }

  UpdateGradient(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s = this.GetGeometryBBox(),
      l = {
        x: 0,
        y: 0
      },
      S = {
        x: 0,
        y: 0
      };
    if ((a = t ? this.fillGradientData : this.strokeGradientData) && a.ID == e) {
      if (!a.gradientElem) {
        switch (a.settings.type) {
          case Style.GradientStyle.RADIALFILL:
          case Style.GradientStyle.RADIAL:
            i = 'radial';
            break;
          default:
            i = 'linear'
        }
        for (
          a.gradientElem = new HvacSVG.Gradient(i),
          a.gradientElem.attr('id', a.ID),
          r = 0;
          r < a.settings.stops.length;
          r++
        ) a.gradientElem.at({
          offset: a.settings.stops[r].offset,
          color: a.settings.stops[r].color,
          opacity: a.settings.stops[r].opacity
        });
        this.svgObj.add(a.gradientElem, 0)
      }
      switch (
      n = a.settings.type == Style.GradientStyle.LINEAR,
      l.x = s.x,
      l.y = s.y,
      S.x = l.x + s.width,
      S.y = l.y + s.height,
      o = Math.sqrt(s.width * s.width + s.height * s.height),
      a.settings.startPos
      ) {
        case Style.GradientPos.TOP:
          l.x += s.width / 2,
            S.x = l.x,
            o = s.height;
          break;
        case Style.GradientPos.RIGHTTOP:
          l.x = S.x,
            S.x = s.x;
          break;
        case Style.GradientPos.RIGHT:
          l.x = S.x,
            l.y += s.height / 2,
            S.x = s.x,
            S.y = l.y,
            o = s.width;
          break;
        case Style.GradientPos.RIGHTBOTTOM:
          l.x = S.x,
            l.y = S.y,
            S.x = s.x,
            S.y = s.y;
          break;
        case Style.GradientPos.BOTTOM:
          l.x += s.width / 2,
            l.y = S.y,
            S.x = l.x,
            S.y = s.y,
            o = s.height;
          break;
        case Style.GradientPos.LEFTBOTTOM:
          l.y = S.y,
            S.y = s.y;
          break;
        case Style.GradientPos.LEFT:
          l.y += s.height / 2,
            S.y = l.y,
            o = s.width;
          break;
        case Style.GradientPos.CENTER:
          n ||
            (
              l.x += s.width / 2,
              l.y += s.height / 2,
              S.x = l.x,
              S.y = l.y,
              o = Math.max(s.width, s.height) / 2
            )
      }
      if (void 0 !== a.settings.angle) {
        var c = a.settings.angle / 10;
        if ((c %= 360) < 0 && (c += 360), 0 === c) l.x = s.x,
          l.y = s.y + s.height / 2,
          S.x = s.x + s.width,
          S.y = s.y + s.height / 2;
        else if (180 == c) l.x = s.x + s.width,
          l.y = s.y + s.height / 2,
          S.x = s.x,
          S.y = s.y + s.height / 2;
        else if (90 == c) l.x = s.x + s.width / 2,
          l.y = s.y,
          S.x = s.x + s.width / 2,
          S.y = s.y + s.height;
        else if (270 == c) l.x = s.x + s.width / 2,
          l.y = s.y + s.height,
          S.x = s.x + s.width / 2,
          S.y = s.y;
        else {
          var u,
            p,
            d,
            D,
            g,
            h,
            m = Math.tan(c * Math.PI / 180),
            C = Math.tan((c + 90) * Math.PI / 180),
            y = s.x + s.width / 2,
            f = s.y + s.height / 2 - y * m;
          c < 90 ? (u = s.x, p = s.y, D = s.x + s.width, g = s.y + s.height) : c < 180 ? (u = s.x + s.width, p = s.y, D = s.x, g = s.y + s.height) : c < 270 ? (u = s.x + s.width, p = s.y + s.height, D = s.x, g = s.y) : (u = s.x, p = s.y + s.height, D = s.x + s.width, g = s.y),
            d = p - u * C,
            h = g - D * C,
            l.x = (d - f) / (m - C),
            l.y = l.x * m + f,
            S.x = (h - f) / (m - C),
            S.y = S.x * m + f
        }
      }
      n ? a.gradientElem.attr({
        x1: l.x,
        y1: l.y,
        x2: S.x,
        y2: S.y,
        gradientUnits: 'userSpaceOnUse'
      }) : a.gradientElem.attr({
        cx: l.x,
        cy: l.y,
        r: o,
        gradientUnits: 'userSpaceOnUse'
      }),
        t ? this.svgObj.attr('fill', 'url(#' + a.ID + ')') : this.svgObj.attr('stroke', 'url(#' + a.ID + ')')
    }
  }

  // RefreshPaint(e) {
  //   //'use strict';
  //   if (
  //     this.fillPatternData ? this.UpdatePattern(this.fillPatternData.ID, !0) : this.fillGradientData &&
  //       this.UpdateGradient(this.fillGradientData.ID, !0),
  //     this.strokePatternData ? this.UpdatePattern(this.strokePatternData.ID, !1) : this.strokeGradientData &&
  //       this.UpdateGradient(this.strokeGradientData.ID, !1),
  //     e &&
  //     false // Double move to Group class
  //     // this instanceof Group
  //     // this.GetInstanceName() === "Group"
  //   ) {
  //     var t,
  //       a,
  //       r = this.ElementCount();
  //     for (t = 0; t < r; t++) (a = this.GetElementByIndex(t)) &&
  //       a.RefreshPaint(e)
  //   }
  // }



  RefreshPaint(e) {
    //'use strict';
    if (
      this.fillPatternData ? this.UpdatePattern(this.fillPatternData.ID, !0) : this.fillGradientData &&
        this.UpdateGradient(this.fillGradientData.ID, !0),
      this.strokePatternData ? this.UpdatePattern(this.strokePatternData.ID, !1) : this.strokeGradientData &&
        this.UpdateGradient(this.strokeGradientData.ID, !1),
      e &&
      false // Double move to Group class
      // this instanceof Group
      // this.GetInstanceName() === "Group"
    ) {
      var t,
        a,
        r = this.ElementCount();
      for (t = 0; t < r; t++) (a = this.GetElementByIndex(t)) &&
        a.RefreshPaint(e)
    }
  }



  GetImageFillSize() {
    //'use strict';
    var e = {
      width: 0,
      height: 0
    };
    return this.fillPatternData &&
      this.fillPatternData.isImage &&
      (
        e.width = this.fillPatternData.imgWidth,
        e.height = this.fillPatternData.imgHeight
      ),
      e
  }

  SetStrokeColor(e) {
    //'use strict';
    this.svgObj.attr('stroke', e),
      this.ClearColorData(!1)
  }

  SetTextureStroke(e) {
    //'use strict';
    e &&
      e.url &&
      (
        this.ClearColorData(!1),
        this.strokePatternData = {},
        this.strokePatternData.options = {},
        this.strokePatternData.options.scale = e.scale ||
        1,
        this.strokePatternData.options.alignment = e.alignment ||
        0,
        this.strokePatternData.url = e.url,
        this.strokePatternData.ID = Utils1.MakeGuid(),
        this.strokePatternData.imgWidth = e.dim.x,
        this.strokePatternData.imgHeight = e.dim.y,
        this.strokePatternData.patternElem = null,
        this.strokePatternData.imageElem = null,
        this.strokePatternData.isTexture = !0,
        this.UpdatePattern(this.strokePatternData.ID, !1)
      )
  }

  SetGradientStroke(e) {
    //'use strict';
    var t,
      a;
    if (e && e.stops && e.stops.length) {
      for (
        this.ClearColorData(!1),
        this.strokeGradientData = {},
        this.strokeGradientData.settings = {},
        this.strokeGradientData.settings.stops = [],
        this.strokeGradientData.settings.type = e.type ||
        Style.GradientStyle.LINEAR,
        this.strokeGradientData.settings.startPos = e.startPos ||
        Style.GradientPos.LEFTTOP,
        this.strokeGradientData.settings.angle = e.angle,
        a = e.stops,
        t = 0;
        t < a.length;
        t++
      ) this.strokeGradientData.settings.stops.push({
        offset: a[t].offset ||
          0,
        color: a[t].color ||
          '#fff',
        opacity: void 0 !== a[t].opacity ? a[t].opacity : 1
      });
      this.strokeGradientData.ID = Utils1.MakeGuid(),
        this.strokeGradientData.gradientElem = null,
        this.UpdateGradient(this.strokeGradientData.ID, !1)
    }
  }

  SetStrokeWidth(e) {
    //'use strict';
    this.svgObj.attr('stroke-width', e),
      isNaN(e) &&
      (
        e = Basic.Symbol.ParsePlaceholder(e, Basic.Symbol.Placeholder.LineThick)
      ),
      this.strokeWidth = Number(e),
      this.svgObj.attr('stroke-dasharray', this.GetStrokePatternForWidth())
  }

  SetStrokePattern(e) {
    //'use strict';
    this.strokeDashArray = e,
      this.svgObj.attr('stroke-dasharray', this.GetStrokePatternForWidth())
  }

  GetStrokePatternForWidth() {
    // //'use strict';
    var e;
    var stkw = this.strokeWidth;
    var a = [];

    if (
      this.strokeDashArray &&
      (a = this.strokeDashArray.split(',')),
      !a.length ||
      !stkw
    ) return 'none';
    for (e = 0; e < a.length; e++) a[e] *= stkw;
    return a.join(',')
  }

  SetOpacity(e) {
    //'use strict';
    this.svgObj.attr('opacity', e)
  }

  SetFillOpacity(e) {
    //'use strict';
    this.svgObj.attr('fill-opacity', e)
  }

  SetStrokeOpacity(e) {
    //'use strict';
    this.svgObj.attr('stroke-opacity', e)
  }

  SetFillRule(e) {
    //'use strict';
    this.svgObj.attr('fill-rule', e)
  }

  SetDisplayVisibility(e) {
    //'use strict';
    var t = '';
    e ||
      (t = 'hidden'),
      this.svgObj.attr('visibility', t)
  }

  Effects() {
    //'use strict';
    return this.effects ||
      (this.effects = new Effects(this)),
      this.effects
  }

  SetEffect(e) {
    //'use strict';
    this.svgObj.attr('filter', 'url(#' + e + ')')
  }



  SetEventBehavior(e) {
    //'use strict';
    this.svgObj.attr('pointer-events', e)
  }

  GetEventBehavior() {
    //'use strict';
    return this.svgObj.attr('pointer-events')
  }

  ClearEventBehavior() {
    //'use strict';
    this.svgObj.node.removeAttribute('pointer-events')
  }

  SetCursor(e) {
    console.log('Element.prototype.SetCursor', e);
    //'use strict';
    this.cursor = e,
      e ? this.svgObj.node.setAttribute('class', this.cursor) : this.svgObj.node.removeAttribute('class')
  }

  GetCursor() {
    //'use strict';
    return this.cursor
  }

  ClearAllCursors() {
    //'use strict';
    Element.RemoveCursorsOnSVGObj(this.svgObj)
  }


  static RemoveCursorsOnSVGObj(e) {
    //'use strict';
    var t,
      a;
    if (
      e.SDGObj &&
      (e.SDGObj.cursor = null),
      e.node.removeAttribute('class'),
      e instanceof HvacSVG.Container
    ) for (a = e.children(), t = 0; t < a.length; t++) Element.RemoveCursorsOnSVGObj(a[t])
  }

  GetTargetForEvent2(e) {
    "use strict";
    var t, a, r;
    // if (!(e && this instanceof SDGraphics.Container))
    // Double === TODO
    // if (!(e && this instanceof GlobalDataBasic.Container))
    if (!(e && this instanceof Instance.Basic.Container))
      return this;
    if (t = e.target || e.srcElement,
      r = this.DOMElement(),
      !t || t === r)
      return this;
    for (a = this.FindElementByDOMElement(t); t && !a;)
      a = (t = t.parentNode) === r ? this : this.FindElementByDOMElement(t);
    return a || (a = this),
      a
  }

  GetTargetForEvent1(e) {
    // //'use strict';
    // var t,
    //   a,
    //   r;
    // // if (!(e && this instanceof Container)) return this;
    // if (!(e && this.GetInstanceName() === "Container")) return this;

    // if (t = e.target || e.srcElement, r = this.DOMElement(), !t || t === r) return this;
    // for (a = this.FindElementByDOMElement(t); t && !a;) a = (t = t.parentNode) === r ? this : this.FindElementByDOMElement(t);
    // return a ||
    //   (a = this),
    //   a

    // debugger

    console.log('Element.GetTargetForEvent', e);

    // debugger;

    //'use strict';
    var target, element, rootElement;



    // if (!(e && this.GetInstanceName() === "Container")) return this;

    // Double the code to drived class Group
    // if(!(e && this instanceof Container)) return this;

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

  static EventBehavior = {
    NORMAL: 'visiblePainted',
    INSIDE: 'visibleFill',
    OUTSIDE: 'visibleStroke',
    ALL: 'visible',
    HIDDEN: 'painted',
    HIDDEN_IN: 'fill',
    HIDDEN_OUT: 'stroke',
    HIDDEN_ALL: 'all',
    NONE: 'none'
  }
  // Object.freeze(Element.EventBehavior),
  static CursorType = {
    AUTO: 'cur-auto',
    DEFAULT: 'cur-default',
    NONE: 'cur-none',
    CONTEXT_MENU: 'cur-context-menu',
    HELP: 'cur-help',
    POINTER: 'cur-pointer',
    PROGRESS: 'cur-progress',
    BUSY: 'cur-wait',
    CELL: 'cur-cell',
    CROSSHAIR: 'cur-crosshair',
    TEXT: 'cur-text',
    VERTICAL_TEXT: 'cur-vertical-text',
    ALIAS: 'cur-alias',
    COPY: 'cur-copy',
    MOVE: 'cur-move',
    NO_DROP: 'cur-no-drop',
    NOT_ALLOWED: 'cur-not-allowed',
    ALL_SCROLL: 'cur-all-scroll',
    COL_RESIZE: 'cur-col-resize',
    ROW_RESIZE: 'cur-row-resize',
    RESIZE_T: 'cur-n-resize',
    RESIZE_R: 'cur-e-resize',
    RESIZE_B: 'cur-s-resize',
    RESIZE_L: 'cur-w-resize',
    RESIZE_TB: 'cur-ns-resize',
    RESIZE_LR: 'cur-ew-resize',
    RESIZE_RT: 'cur-ne-resize',
    RESIZE_LT: 'cur-nw-resize',
    RESIZE_RB: 'cur-se-resize',
    RESIZE_LB: 'cur-sw-resize',
    NESW_RESIZE: 'cur-nesw-resize',
    NWSE_RESIZE: 'cur-nwse-resize',
    ZOOM_IN: 'cur-zoom-in',
    ZOOM_OUT: 'cur-zoom-out',
    ZOOM_GRAB: 'cur-zoom-grab',
    ZOOM_GRABBING: 'cur-zoom-grabbing',
    ANCHOR: 'cur-anchor',
    PAINT: 'cur-paint',
    ROTATE: 'cur-rotate',
    DROPLIB: 'cur-droplib',
    EDIT_X: 'cur-pencil-x',
    EDIT: 'cur-pencil',
    EDIT_CLOSE: 'cur-pencil-close',
    ADD: 'cur-add',
    STAMP: 'cur-stamp',
    ARR_DOWN: 'cur-arr-down',
    ARR_RIGHT: 'cur-arr-right',
    BRUSH: 'cur-brush',
    BRUSH_EDIT: 'cur-brush-edit',
    BRUSH_CELL: 'cur-brush-cell',
    BRUSH_TABLE: 'cur-brush-table',
    ADD_RIGHT: 'cur-add-right',
    ADD_LEFT: 'cur-add-left',
    ADD_UP: 'cur-add-up',
    ADD_DOWN: 'cur-add-down',
    ADD_PLUS: 'cur-add-plus',
    GRAB: 'cur-grab'
  }
  // Object.freeze(Element.CursorType)

}

export default Element


// export default Basic.Element;
