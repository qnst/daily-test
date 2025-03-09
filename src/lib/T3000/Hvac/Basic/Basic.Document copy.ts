


import T3Svg from "../Helper/T3Svg"
// import Basic from "./Basic.Index";
import $ from 'jquery';
// import BasicTextFormatter from "./Basic.Text.Formatter";
// import '../Basic/Text.Spell';
// import '../Basic/Basic.Container';
// Basic.Document = {};

// (this.parentElem = '#' + this.parentElem),
// this.svgObj = svg($(this.parentElem)[0]),


import Rect from './B.Rect';
import Container from './B.Container';
import RRect from './B.RRect';
import Oval from './B.Oval';
import Line from './B.Line';
import PolyLine from './B.PolyLine';
import PolyPolyLine from './B.PolyPolyLine';
import Polygon from './B.Polygon';
import Path from './B.Path';
import Group from './B.Group';
import Layer from './B.Layer';
import Symbol from './B.Symbol';
import ShapeCopy from './Basic.ShapeCopy';
import ShapeContainer from './B.ShapeContainer';
import Text from './B.Text';
import Formatter from "./B.Text.Formatter";
import Spell from "./B.Text.Spell";
import Global from "./Basic.Global";
import Image from './B.Image'
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"



class Document extends Container {

  public parentElem: any;
  public svgObj: any;
  public docInfo: any;
  public fontList: any;
  public activeEdit: any;
  public spellChecker: any;
  public documentLayerID: any;
  public imageLoadRefCount: number;

  constructor(e, t) {


    super()
    console.log('Basic.Document constructor', this)

    //'use strict';
    this.parentElem = e,
      '#' !== this.parentElem.charAt(0) &&
      '.' !== this.parentElem.charAt(0) &&
      (this.parentElem = '#' + this.parentElem),
      this.svgObj = T3Svg.svg($(this.parentElem)[0]),
      this.docInfo = {
        dispX: 0,
        dispY: 0,
        dispWidth: 0,
        dispHeight: 0,
        dispDpiX: 0,
        dispDpiY: 0,
        scrollX: 0,
        scrollY: 0,
        docDpi: 0,
        docScale: 1,
        docWidth: 0,
        docHeight: 0,
        docToScreenScale: 0,
        docDpiScale: 0,
        docVisX: 0,
        docVisY: 0,
        docVisWidth: 0,
        docVisHeight: 0,
        docScreenX: 0,
        docScreenY: 0,
        docScreenWidth: 0,
        docScreenHeight: 0,
        maxScrollX: 0,
        maxScrollY: 0
      },
      this.fontList = t,
      this.activeEdit = null,
      this.spellChecker = null,
      this.documentLayerID = null,
      this.imageLoadRefCount = 0,

      console.log('Basic.Document constructor', this)
    this.InitElement(this, null),
      this.InitializeContainer()
  }


  // GetInstanceName() {
  //   return "Document";
  // }

  // Document.prototype = new Basic.Container;

  // Document.prototype.constructor = Basic.Document;

  CreateShape(shapeType) {
    // debugger
    console.log('CreateShape ----------------------------- shapeType', shapeType)
    //'use strict';
    var basicShape = null;
    switch (shapeType) {
      case Document.CreateShapeType.RECT:
        basicShape = new Rect();
        break;
      case Document.CreateShapeType.RRECT:
        basicShape = new RRect();
        break;
      case Document.CreateShapeType.OVAL:
        basicShape = new Oval();
        break;
      case Document.CreateShapeType.LINE:
        basicShape = new Line();
        break;
      case Document.CreateShapeType.POLYLINE:
        basicShape = new PolyLine();
        break;
      case Document.CreateShapeType.POLYPOLYLINE:
        basicShape = new PolyPolyLine();
        break;
      case Document.CreateShapeType.POLYLINECONTAINER:
        basicShape = new PolyLine();
        break;
      case Document.CreateShapeType.POLYGON:
        basicShape = new Polygon();
        break;
      case Document.CreateShapeType.PATH:
        basicShape = new Path();
        break;
      case Document.CreateShapeType.TEXT:
        basicShape = new Text();
        break;
      case Document.CreateShapeType.IMAGE:
        basicShape = new Image();
        break;
      case Document.CreateShapeType.GROUP:
        basicShape = new Group();
        break;
      case Document.CreateShapeType.LAYER:
        basicShape = new Layer();
        break;
      case Document.CreateShapeType.SYMBOL:
        basicShape = new Symbol();
        break;
      case Document.CreateShapeType.SHAPECOPY:
        basicShape = new ShapeCopy();
        break;
      case Document.CreateShapeType.SHAPECONTAINER:
        basicShape = new ShapeContainer();
    }

    try {
      return basicShape ? (basicShape.CreateElement(this, null), basicShape) : null
    }
    catch (error) {

      console.log('========= CreateShape error basicShape', basicShape)
      console.log('========= CreateShape error', error)
      throw error;
    }
  }

  InitializeContainer() {
    //'use strict';
    this.GetDeviceInfo(),
      this.docInfo.docDpi = this.docInfo.dispDpiX,
      this.docInfo.docWidth = this.docInfo.dispWidth,
      this.docInfo.docHeight = this.docInfo.dispHeight,
      this.docInfo.docScale = 1,
      this.docInfo.scrollX = 0,
      this.docInfo.scrollY = 0,
      this.CalcWorkArea(),
      this.ApplyDocumentTransform()
  }

  GetDeviceInfo() {
    //'use strict';
    var e,
      t;
    (e = this.CreateShape(Document.CreateShapeType.RECT)).SetFillOpacity(0),
      e.SetStrokeWidth(0),
      e.SetSize('100in', '100in'),
      this.AddElement(e),
      t = e.GetBBox(),
      this.docInfo.dispDpiX = t.width / 100,
      this.docInfo.dispDpiY = t.height / 100,
      this.RemoveElement(e),
      this.docInfo.dispWidth = $(this.parentElem).innerWidth(),
      this.docInfo.dispHeight = $(this.parentElem).innerHeight()
  }

  CalcWorkArea() {

    //'use strict';
    var e = $(this.parentElem).offset();
    console.log('CalcWorkArea -----------------------------', e)
    this.docInfo.dispX = e.left,
      this.docInfo.dispY = e.top,
      this.docInfo.dispWidth = $(this.parentElem).innerWidth(),
      this.docInfo.dispHeight = $(this.parentElem).innerHeight(),
      this.docInfo.scrollX = $(this.parentElem).scrollLeft(),
      this.docInfo.scrollY = $(this.parentElem).scrollTop(),
      this.docInfo.docToScreenScale = this.docInfo.dispDpiX / this.docInfo.docDpi * this.docInfo.docScale,
      this.docInfo.docDpiScale = this.docInfo.dispDpiX / this.docInfo.docDpi,
      this.docInfo.docScreenX = this.docInfo.dispX - this.docInfo.scrollX,
      this.docInfo.docScreenY = this.docInfo.dispY - this.docInfo.scrollY,
      this.docInfo.docScreenWidth = this.docInfo.docWidth * this.docInfo.docToScreenScale,
      this.docInfo.docScreenHeight = this.docInfo.docHeight * this.docInfo.docToScreenScale,
      this.docInfo.maxScrollX = Math.max(0, this.docInfo.docScreenWidth - this.docInfo.dispWidth),
      this.docInfo.maxScrollY = Math.max(0, this.docInfo.docScreenHeight - this.docInfo.dispHeight),
      this.docInfo.docVisWidth = Math.min(
        this.docInfo.dispWidth / this.docInfo.docToScreenScale,
        this.docInfo.docWidth
      ),
      this.docInfo.docVisHeight = Math.min(
        this.docInfo.dispHeight / this.docInfo.docToScreenScale,
        this.docInfo.docHeight
      ),
      this.docInfo.docVisX = Math.min(
        this.docInfo.scrollX / this.docInfo.docToScreenScale,
        this.docInfo.docWidth - this.docInfo.docVisWidth
      ),
      this.docInfo.docVisY = Math.min(
        this.docInfo.scrollY / this.docInfo.docToScreenScale,
        this.docInfo.docHeight - this.docInfo.docVisHeight
      )
  }

  ApplyDocumentTransform(e) {
    //'use strict';
    var t,
      a,
      r = this.ElementCount();
    if (
      this.svgObj.attr({
        width: this.docInfo.docScreenWidth,
        height: this.docInfo.docScreenHeight
      }),
      !e
    ) for (a = 0; a < r; a++) (t = this.GetElementByIndex(a)) instanceof Layer &&
      (
        t.IsScalingAllowed() ? t.svgObj.transform({
          scaleX: this.docInfo.docToScreenScale,
          scaleY: this.docInfo.docToScreenScale
        }) : t.IsDpiScalingAllowed() &&
        t.svgObj.transform({
          scaleX: this.docInfo.docDpiScale,
          scaleY: this.docInfo.docDpiScale
        })
      )
  }

  CalcScaleToFit(e, t, a, r) {
    var i,
      n,
      o;
    return a ||
      (a = this.docInfo.docWidth),
      r ||
      (r = this.docInfo.docHeight),
      (n = e / (a *= i = this.docInfo.dispDpiX / this.docInfo.docDpi)) > (o = t / (r *= i)) &&
      (n = o),
      n > 1 &&
      (n = 1),
    {
      scale: n,
      width: this.docInfo.docWidth * i * n,
      height: this.docInfo.docHeight * i * n
    }
  }

  SetDocumentSize(e, t) {
    //'use strict';
    this.SetDocumentMetrics({
      width: e,
      height: t
    })
  }

  GetDocumentSize() {
    //'use strict';
    return {
      width: this.docInfo.docWidth,
      height: this.docInfo.docHeight
    }
  }

  SetDocumentDPI(e) {
    //'use strict';
    this.SetDocumentMetrics({
      dpi: e
    })
  }

  SetDocumentScale(e) {
    //'use strict';
    this.SetDocumentMetrics({
      scale: e
    })
  }

  SetDocumentMetrics(e) {
    //'use strict';
    this.docInfo.docWidth = e.width ||
      this.docInfo.docWidth,
      this.docInfo.docHeight = e.height ||
      this.docInfo.docHeight,
      this.docInfo.docDpi = e.dpi ||
      this.docInfo.docDpi,
      this.docInfo.docScale = e.scale ||
      this.docInfo.docScale,
      this.CalcWorkArea(),
      this.ApplyDocumentTransform()
  }

  CalcScrollToVisible(e, t) {
    //'use strict';
    var a = 0,
      r = 0,
      i = this.docInfo.docVisX + this.docInfo.docVisWidth,
      n = this.docInfo.docVisY + this.docInfo.docVisHeight;
    if (
      e = Math.max(0, Math.min(e, this.docInfo.docWidth)),
      t = Math.max(0, Math.min(t, this.docInfo.docHeight)),
      e < this.docInfo.docVisX ? a = e - this.docInfo.docVisX : e > i &&
        (a = e - i),
      t < this.docInfo.docVisY ? r = t - this.docInfo.docVisY : t > n &&
        (r = t - n),
      a ||
      r
    ) return {
      xOff: this.docInfo.scrollX + a * this.docInfo.docToScreenScale,
      yOff: this.docInfo.scrollY + r * this.docInfo.docToScreenScale
    }
  }

  GetWorkArea() {
    //'use strict';
    return this.docInfo
  }

  ConvertDocToWindowCoords(e, t) {
    //'use strict';
    return {
      x: e * this.docInfo.docToScreenScale + this.docInfo.docScreenX,
      y: t * this.docInfo.docToScreenScale + this.docInfo.docScreenY
    }
  }

  ConvertDocToWindowLength(e) {
    //'use strict';
    return e * this.docInfo.docToScreenScale
  }

  ConvertOffsetToDocCoords(e, t) {
    //'use strict';
    return {
      x: e / this.docInfo.docToScreenScale,
      y: t / this.docInfo.docToScreenScale
    }
  }

  ConvertWindowToDocCoords(e, t) {
    //'use strict';
    return {
      x: (e - this.docInfo.docScreenX) / this.docInfo.docToScreenScale,
      y: (t - this.docInfo.docScreenY) / this.docInfo.docToScreenScale
    }
  }

  ConverWindowToDocLength(e) {
    //'use strict';
    return e / this.docInfo.docToScreenScale
  }

  ConvertWindowToElemCoords(e, t, a) {

    console.log('======== Document.prototype.ConvertWindowToElemCoords e, t, a', e, t, a)


    //'use strict';
    var r = this.DOMElement().createSVGPoint(),
      i = this.DOMElement();
    return r.x = e,
      r.y = t,
    {
      x: (
        r = (r = r.matrixTransform(i.getScreenCTM().inverse())).matrixTransform(a.getTransformToElement(i).inverse())
      ).x,
      y: r.y
    }
  }

  ConvertElemToWindowCoords(e, t, a) {
    //'use strict';
    var r = this.DOMElement().createSVGPoint(),
      i = this.DOMElement();
    return r.x = e,
      r.y = t,
    {
      x: (
        r = (r = r.matrixTransform(a.getTransformToElement(i))).matrixTransform(i.getScreenCTM())
      ).x,
      y: r.y
    }
  }

  RotateAroundCenterPt(e, t, a) {
    //'use strict';
    var r,
      i = this.DOMElement().createSVGPoint(),
      n = this.DOMElement().createSVGMatrix();
    return i.x = e.x - t.x,
      i.y = e.y - t.y,
      n = n.rotate(a),
    {
      x: (r = i.matrixTransform(n)).x + t.x,
      y: r.y + t.y
    }
  }

  CalculateRotatedOffsetForResize(e, t, a) {
    //'use strict';
    var r,
      i = {
        x: e.x + e.width / 2,
        y: e.y + e.height / 2
      },
      n = {
        x: t.x + t.width / 2,
        y: t.y + t.height / 2
      };
    return {
      x: (r = this.RotateAroundCenterPt(n, i, a)).x - n.x,
      y: r.y - n.y
    }
  }


  AddLayer(e) {
    //'use strict';
    var t = this.CreateShape(Document.CreateShapeType.LAYER);
    return t.SetID(e),
      this.AddElement(t),
      this.ApplyDocumentTransform(),
      $(t.svgObj.node).data('layerID', e),
      t
  }

  RemoveLayer(e) {
    //'use strict';
    var t = this.GetElementByID(e);
    t &&
      this.RemoveElement(t)
  }

  GetLayer(e) {
    //'use strict';
    var t,
      a,
      r = null,
      i = this.ElementCount();
    for (a = 0; a < i; a++) if (
      (t = this.GetElementByIndex(a)) instanceof Layer &&
      t.GetID() === e
    ) {
      r = t;
      break
    }
    return r
  }

  GetDocumentLayer() {
    //'use strict';
    var e,
      t,
      a = null,
      r = this.ElementCount();
    for (
      t = 0;
      t < r &&
      !(
        (e = this.GetElementByIndex(t)) instanceof Layer &&
        (
          this.documentLayerID ? this.documentLayerID == e.GetID() &&
            (a = e) : e.IsScalingAllowed() &&
          (a = e),
          a
        )
      );
      t++
    );
    return a
  }

  SetDocumentLayer(e) {
    //'use strict';
    this.documentLayerID = e
  }

  GetFormattingLayer() {
    //'use strict';
    var e = this.GetLayer('__FORMATTING__');
    return e &&
      !e.IsDpiScalingAllowed() &&
      (e = null),
      e ||
      (
        (e = this.AddLayer('__FORMATTING__')).AllowDpiScalingOnly(!0),
        e.ExcludeFromExport(!0),
        this.MoveLayer('__FORMATTING__', Document.LayerMoveType.BOTTOM),
        e.SetOpacity(0),
        this.ApplyDocumentTransform()
      ),
      e
  }

  GetPreviousLayer(e) {
    //'use strict';
    var t,
      a,
      r = null,
      i = this.ElementCount();
    for (a = 0; a < i; a++) if ((t = this.GetElementByIndex(a)) instanceof Layer) {
      if (t.GetID() === e) break;
      r = t
    }
    return r
  }

  GetNextLayer(e) {
    //'use strict';
    var t,
      a = null,
      r = null,
      i = 0,
      n = this.ElementCount();
    for (
      e &&
      (r = this.GetLayer(e)),
      r &&
      (i = this.GetElementIndex(r) + 1),
      t = i;
      t < n;
      t++
    ) if (
        (r = this.GetElementByIndex(t)) instanceof Layer &&
        r.GetID() === e
      ) {
        a = r;
        break
      }
    return a
  }

  MoveLayer(e, t, a) {
    //'use strict';
    var r,
      i = this.GetLayer(e),
      n = this.ElementCount() - 1,
      o = n,
      s = 0,
      l = null;
    if (i) {
      switch (
      r = this.GetElementIndex(i),
      a &&
      (l = this.GetLayer(a)) &&
      r < (s = this.GetElementIndex(l)) &&
      s--,
      t
      ) {
        case Document.LayerMoveType.BOTTOM:
          o = 0;
          break;
        case Document.LayerMoveType.BEFORE:
          o = s;
          break;
        case Document.LayerMoveType.AFTER:
          o = s + 1;
          break;
        case Document.LayerMoveType.TOP:
          o = n
      }
      o !== r &&
        (this.RemoveElement(i), this.AddElement(i, o))
    }
  }

  AddDocumentFontToList(e, t, a) {
    //'use strict';
    var r,
      i = - 1,
      n = e.length;
    for (r = 0; r < n; r++) if (e[r].name === t) {
      i = r;
      break
    }
    return i < 0 &&
      (e.push({
        name: t,
        type: a
      }), i = n),
      i
  }

  MapFont(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o = this.fontList.length;
    for (t || (t = 'sanserif'), n = '\'' + e + '\'', a = 0; a < o; a++) {
      if (this.fontList[a].name === e) {
        i = this.fontList[a].fallback;
        break
      }
      !r &&
        this.fontList[a].default &&
        this.fontList[a].category === t &&
        (r = this.fontList[a].fallback)
    }
    return i &&
      (n += ',' + i),
      n
  }

  GetFontType(e) {
    //'use strict';
    var t,
      a = this.fontList.length,
      r = 'sanserif';
    for (t = 0; t < a; t++) if (this.fontList[t].name === e) {
      r = this.fontList[t].category;
      break
    }
    return r
  }

  static _TextMetricsCache = {}

  GetTextCacheForStyle(e) {
    //'use strict';
    var t =/* Basic.Text.Formatter*/Formatter.MakeIDFromStyle(e),
      a = Document._TextMetricsCache[t];
    a ||
      (
        a = {
          metrics: /*Basic.Text.Formatter*/Formatter.CalcStyleMetrics(e, this),
          textCache: {
          }
        },
        Document._TextMetricsCache[t] = a
      );
    return a
  }

  CalcStyleMetrics(e) {
    //'use strict';
    var t = this.GetTextCacheForStyle(e);
    return Utils1.CopyObj(t.metrics)
  }

  GetTextRunCache(e, t) {
    // var a = this.GetTextCacheForStyle(e);
    // 'symbol' != typeof t &&
    //   (t = Symbol.for(t));
    // var r = a.textCache[t];
    // if (!r) {
    //   var i = Symbol.keyFor(t).length;
    //   r = {
    //     startOffsets: new Array(i),
    //     endOffsets: new Array(i)
    //   },
    //     a.textCache[t] = r
    // }
    // return r

    return { startOffsets: [], endOffsets: [] }
  }

  SetActiveEdit(e) {
    //'use strict';
    var t = this.GetActiveEdit();
    t &&
      t !== e &&
      t.Deactivate(),
      this.activeEdit = e
  }

  ClearActiveEdit(e) {
    //'use strict';
    var t = this.GetActiveEdit();
    t &&
      t.Deactivate(e),
      this.activeEdit = null
  }

  GetActiveEdit() {
    //'use strict';
    return this.activeEdit &&
      !this.activeEdit.InDocument() &&
      (this.activeEdit = null),
      this.activeEdit
  }

  InitSpellCheck() {
    console.log('InitSpellCheck -----------------------------', Text)
    //'use strict';
    this.spellChecker ||
      (
        this.spellChecker = new Spell(this),
        this.spellChecker.Initialize()
      )
  }

  InitSpellCheckUser() {
    //'use strict';
    this.spellChecker &&
      this.spellChecker.UserInitialize()
  }

  GetSpellCheck() {
    //'use strict';
    return this.spellChecker ||
      this.InitSpellCheck(),
      this.spellChecker
  }

  DefExists(e) {
    //'use strict';
    var t,
      a = this.svgObj.defs().children(),
      r = !1;
    for (t = 0; t < a.length; t++) if (a[t].attrs.id == e) {
      r = !0;
      break
    }
    return r
  }

  Defs() {
    //'use strict';
    return this.svgObj.defs()
  }

  ClearDefs() {
    //'use strict';
    var e = this.Defs();
    e &&
      e.clear()
  }

  ImageLoad_AddRef() {
    //'use strict';
    this.imageLoadRefCount++
  }

  ImageLoad_DecRef() {
    //'use strict';
    this.imageLoadRefCount = Math.max(0, this.imageLoadRefCount - 1)
  }

  ImageLoad_GetRefCount() {
    //'use strict';
    return this.imageLoadRefCount
  }

  ImageLoad_ResetRefCount() {
    //'use strict';
    this.imageLoadRefCount = 0
  }


  static CreateShapeType = {
    RECT: 1,
    RRECT: 2,
    OVAL: 3,
    LINE: 4,
    POLYLINE: 5,
    POLYGON: 6,
    PATH: 7,
    TEXT: 8,
    IMAGE: 9,
    GROUP: 10,
    LAYER: 11,
    SYMBOL: 12,
    POLYLINECONTAINER: 13,
    POLYPOLYLINE: 14,
    SHAPECOPY: 15,
    SHAPECONTAINER: 16
  }

  // Object.freeze(Document.CreateShapeType);

  static LayerMoveType = {
    BOTTOM: 0,
    BEFORE: 1,
    AFTER: 2,
    TOP: 3
  }

}

export default Document



// Object.freeze(Document.LayerMoveType);

// export default Basic.Document;
