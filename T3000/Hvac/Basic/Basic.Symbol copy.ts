



// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import Basic from "./Basic.Index";
// import GPP from "../gListManager";
import $ from 'jquery';
import HvacSVG from "../Helper/SVG.t2"

import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"


import Global from "./Basic.Global";
import Element from './Basic.Element';

import ConstantData from "../Data/ConstantData"



class Symbol extends Element {

  public shapeElem: any;
  public fillColors: any;

  public lineColors: any;
  public lineWidths: any;
  public solidFills: any;
  public fillTrans: any;
  public lineTrans: any;
  public srcSymbolSVG: any;


  constructor() {
    super()
  }

  // GetInstanceName(){
  //   return "Symbol";
  // }
  // Basic.Symbol = function () {
  // },
  // Basic.Symbol.prototype = new Basic.Element,
  // Basic.Symbol.prototype.constructor = Basic.Symbol

  CreateElement(element, type) {
    //'use strict';
    console.log("= B.Symbol CreateElement input:", { element, type });

    this.svgObj = new HvacSVG.Container(HvacSVG.create('g'));
    this.shapeElem = new HvacSVG.Container(HvacSVG.create('g'));
    this.svgObj.add(this.shapeElem);
    this.InitElement(element, type);
    this.fillColors = [];
    this.lineColors = [];
    this.lineWidths = [];
    this.solidFills = [];
    this.fillTrans = [];
    this.lineTrans = [];
    this.srcSymbolSVG = '';

    console.log("= B.Symbol CreateElement output:", this.svgObj);
    return this.svgObj;
  }

  SetSymbolSource(source: string) {
    //'use strict';
    console.log("= B.Symbol SetSymbolSource input:", { source });

    this.srcSymbolSVG = source;
    this.fillColors = Basic.Symbol.GetPlaceholders(Basic.Symbol.Placeholder.FillColor, source);
    this.lineColors = Basic.Symbol.GetPlaceholders(Basic.Symbol.Placeholder.LineColor, source);
    this.lineWidths = Basic.Symbol.GetPlaceholders(Basic.Symbol.Placeholder.LineThick, source);
    this.solidFills = Basic.Symbol.GetPlaceholders(Basic.Symbol.Placeholder.SolidFill, source);
    this.fillTrans = Basic.Symbol.GetPlaceholders(Basic.Symbol.Placeholder.FillTrans, source);
    this.lineTrans = Basic.Symbol.GetPlaceholders(Basic.Symbol.Placeholder.LineTrans, source);

    if (source) {
      source = source.replace(/fill-opacity="[\d.]*"/g, '').replace(/stroke-opacity="[\d.]*"/g, '');

      const fillTransPlaceholder = Basic.Symbol.CreatePlaceholder(
        Basic.Symbol.Placeholder.FillTrans,
        Basic.Symbol.PlaceholderDefaults[Basic.Symbol.Placeholder.FillTrans]
      );
      source = source.replace(
        new RegExp('fill="##FILLCOLOR', 'g'),
        'fill-opacity="' + fillTransPlaceholder + '" fill="##FILLCOLOR'
      );
      this.fillTrans = Basic.Symbol.GetPlaceholders(Basic.Symbol.Placeholder.FillTrans, source);

      const lineTransPlaceholder = Basic.Symbol.CreatePlaceholder(
        Basic.Symbol.Placeholder.LineTrans,
        Basic.Symbol.PlaceholderDefaults[Basic.Symbol.Placeholder.LineTrans]
      );
      source = source.replace(
        new RegExp('stroke="##LINECOLOR', 'g'),
        'stroke-opacity="' + lineTransPlaceholder + '" stroke="##LINECOLOR'
      ).replace(
        new RegExp('fill="##LINECOLOR', 'g'),
        'fill-opacity="' + lineTransPlaceholder + '" fill="##LINECOLOR'
      );
      this.lineTrans = Basic.Symbol.GetPlaceholders(Basic.Symbol.Placeholder.LineTrans, source);

      this.srcSymbolSVG = source;
    }

    this.RebuildSymbol();
    console.log("= B.Symbol SetSymbolSource output:", { srcSymbolSVG: this.srcSymbolSVG });
  }

  RebuildSymbol() {
    //'use strict';
    var e,
      t = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' xlink=\'http://www.w3.org/1999/xlink\'>' + this.srcSymbolSVG + '</svg>',
      a = new DOMParser;
    for (
      this.shapeElem.clear(),
      this.svgObj.clear(),
      this.svgObj.add(this.shapeElem),
      t = Basic.Symbol.ReplacePlaceholder(this.fillColors, t),
      t = Basic.Symbol.ReplacePlaceholder(this.lineColors, t),
      t = Basic.Symbol.ReplacePlaceholder(this.lineWidths, t),
      t = Basic.Symbol.ReplacePlaceholder(this.solidFills, t),
      t = Basic.Symbol.ReplacePlaceholder(this.fillTrans, t),
      t = Basic.Symbol.ReplacePlaceholder(this.lineTrans, t),
      a.async = !1,
      e = a.parseFromString(t, 'text/xml').documentElement.firstChild;
      e;
    ) this.shapeElem.node.appendChild(this.doc.svgObj.node.ownerDocument.importNode(e, !0)),
      e = e.nextSibling
  }

  GetScaleElement() {
    //'use strict';
    return this.shapeElem
  }

  SetFillColor(e, t) {
    //'use strict';
    var a,
      r = !1;
    for (t || this.ClearColorData(!0), a = 0; a < this.fillColors.length; a++) this.fillColors[a].val = e,
      r = !0;
    if (0 === String(e).indexOf('#')) for (a = 0; a < this.solidFills.length; a++) this.solidFills[a].val = e,
      r = !0;
    r &&
      this.RebuildSymbol()
  }

  SetTextureFill(e) {
    //'use strict';
    Basic.Element.prototype.SetTextureFill.call(this, e);
    var t = this.svgObj.attr('fill');
    this.svgObj.attr('fill', ''),
      this.fillPatternData &&
      this.fillPatternData.patternElem &&
      (
        this.svgObj.remove(this.fillPatternData.patternElem),
        this.SetFillColor(t, !0),
        this.svgObj.add(this.fillPatternData.patternElem, 0)
      )
  }

  SetGradientFill(e) {
    //'use strict';
    Basic.Element.prototype.SetGradientFill.call(this, e);
    var t = this.svgObj.attr('fill');
    this.svgObj.attr('fill', ''),
      this.fillGradientData &&
      this.fillGradientData.gradientElem &&
      (
        this.svgObj.remove(this.fillGradientData.gradientElem),
        this.SetFillColor(t, !0),
        this.svgObj.add(this.fillGradientData.gradientElem, 0)
      )
  }

  SetStrokeColor(e, t) {
    //'use strict';
    var a;
    for (t || this.ClearColorData(!1), a = 0; a < this.lineColors.length; a++) this.lineColors[a].val = e;
    this.lineColors.length &&
      this.RebuildSymbol()
  }

  SetTextureStroke(e) {
    //'use strict';
    Basic.Element.prototype.SetTextureStroke.call(this, e);
    var t = this.svgObj.attr('stroke');
    this.svgObj.attr('stroke', ''),
      this.strokePatternData &&
      this.strokePatternData.patternElem &&
      (
        this.svgObj.remove(this.strokePatternData.patternElem),
        this.SetStrokeColor(t, !0),
        this.svgObj.add(this.strokePatternData.patternElem, 0)
      )
  }

  SetGradientStroke(e) {
    //'use strict';
    Basic.Element.prototype.SetGradientStroke.call(this, e);
    var t = this.svgObj.attr('stroke');
    this.svgObj.attr('stroke', ''),
      this.strokeGradientData &&
      this.strokeGradientData.gradientElem &&
      (
        this.svgObj.remove(this.strokeGradientData.gradientElem),
        this.SetStrokeColor(t, !0),
        this.svgObj.add(this.strokeGradientData.gradientElem, 0)
      )
  }

  SetStrokeWidth(e) {
    //'use strict';
    var t;
    for (
      isNaN(e) &&
      (
        e = Number(
          Basic.Symbol.ParsePlaceholder(e, Basic.Symbol.Placeholder.LineThick)
        )
      ),
      t = 0;
      t < this.lineWidths.length;
      t++
    ) this.lineWidths[t].val = e;
    this.lineWidths.length &&
      this.RebuildSymbol()
  }

  SetFillOpacity(e) {
    //'use strict';
    var t;
    for (t = 0; t < this.fillTrans.length; t++) this.fillTrans[t].val = e;
    this.fillTrans.length &&
      this.RebuildSymbol()
  }

  SetStrokeOpacity(e) {
    //'use strict';
    var t;
    for (t = 0; t < this.lineTrans.length; t++) this.lineTrans[t].val = e;
    this.lineTrans.length &&
      this.RebuildSymbol()
  }

  SetStrokePattern(e) {
  }

  static Placeholder = {
    FillColor: '##FILLCOLOR',
    EndColor: '##ENDCOLOR',
    FillTrans: '##FILLTRANS',
    LineColor: '##LINECOLOR',
    LineTrans: '##LINETRANS',
    LineThick: '##LINETHICK',
    SolidFill: '##SOLIDFILL',
    Terminator: '##'
  }


  // Object.freeze(Basic.Symbol.Placeholder),
  static PlaceholderDefaults = {
    '##FILLCOLOR': '#FFFFFF',
    '##ENDCOLOR': '#FFFFFF',
    '##FILLTRANS': 1,
    '##LINECOLOR': '#000',
    '##LINETRANS': 1,
    '##LINETHICK': 1,
    '##SOLIDFILL': '#000'
  }

  // Object.freeze(Basic.Symbol.PlaceholderDefaults),
  static CreatePlaceholder(e, t) {
    return void 0 === t &&
      (t = ''),
      e + '=' + t + Basic.Symbol.Placeholder.Terminator
  }

  static ParsePlaceholder(e, t) {
    var a = e.indexOf('='),
      r = e.lastIndexOf(Basic.Symbol.Placeholder.Terminator),
      i = Basic.Symbol.PlaceholderDefaults[t];
    return ++a > 0 &&
      r > a &&
      (i = e.slice(a, r)),
      i
  }

  static GetPlaceholders(e, t) {
    var a,
      r,
      i = [];
    if (!t) return i;
    if (a = t.match(new RegExp(e + '.*?##', 'g'))) for (r = 0; r < a.length; r++) i.push({
      placeholder: a[r],
      val: Basic.Symbol.ParsePlaceholder(a[r], e)
    });
    return i
  }

  static ReplacePlaceholder(e, t) {
    var a,
      r = t;
    if (!t) return r;
    for (a = 0; a < e.length; a++) r = r.replace(new RegExp(e[a].placeholder, 'g'), e[a].val);
    return r

  }

}

export default Symbol


// export default Basic.Symbol
