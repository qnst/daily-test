





// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import HvacSVG from '../../Hvac.SVG.t2';





import BaseSymbol from './Shape.BaseSymbol'
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/GlobalData'
import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
import DefaultEvt from "../Event/DefaultEvt";
import Resources from '../Data/Resources'
import Element from "../Basic/Basic.Element";

import ListManager from '../Data/ListManager';

import ConstantData from '../Data/ConstantData'





class SVGFragmentSymbol extends BaseSymbol {

  constructor(e) {

    (e = e || {}).ShapeType = ConstantData.ShapeType.SVGFRAGMENTSYMBOL;
    // var t = ListManager.BaseSymbol.apply(this, [e]);
    super(e)
    // if (t) return t;
  }



  CreateShape(e, t) {
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    var a = e.CreateShape(ConstantData.CreateShapeType.SHAPECONTAINER),
      r = e.CreateShape(ConstantData.CreateShapeType.SYMBOL);
    r.SetSymbolSource(this.SVGFragment),
      r.SetID(ConstantData.SVGElementClass.SHAPE);
    var i = this.Frame,
      n = (this.trect, this.StyleRecord),
      o = n.Line.Paint.Color,
      s = n.Line.Thickness,
      l = (
        n.Line.LinePattern,
        n.Line.Opacity,
        this.GetFieldDataStyleOverride()
      ),
      S = l &&
        l.strokeColor;
    S &&
      (o = l.strokeColor),
      (
        S ||
        this.colorchanges & (
          FileParser.SDRColorFilters.SD_NOCOLOR_LINE | FileParser.SDRColorFilters.SD_NOCOLOR_STYLE
        )
      ) &&
      r.SetStrokeColor(o),
      this.colorchanges & (
        FileParser.SDRColorFilters.SD_NOCOLOR_LINETHICK | FileParser.SDRColorFilters.SD_NOCOLOR_STYLE
      ) &&
      r.SetStrokeWidth(s),
      r.SetFillOpacity(n.Fill.Paint.Opacity),
      r.SetStrokeOpacity(n.Line.Paint.Opacity);
    var c = i.width,
      u = i.height;
    a.SetSize(c, u),
      a.SetPos(i.x, i.y),
      r.SetSize(c, u),
      r.SetScale(
        c / this.InitialGroupBounds.width,
        u / this.InitialGroupBounds.height
      );
    var p = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipHoriz) > 0,
      d = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipVert) > 0;
    p &&
      r.SetMirror(p),
      d &&
      r.SetFlip(d),
      a.AddElement(r),
      this.ApplyStyles(r, n),
      this.ApplyEffects(a, !1, !1);
    var D = e.CreateShape(ConstantData.CreateShapeType.RECT);
    return D.SetStrokeColor('white'),
      D.SetFillColor('none'),
      D.SetOpacity(0),
      D.SetStrokeWidth(0),
      t ? D.SetEventBehavior(ConstantData.EventBehavior.HIDDEN_ALL) : D.SetEventBehavior(ConstantData.EventBehavior.NONE),
      D.SetID(ConstantData.SVGElementClass.SLOP),
      D.ExcludeFromExport(!0),
      D.SetSize(c, u),
      a.AddElement(D),
      a.isShape = !0,
      - 1 != this.DataID &&
      this.LM_AddSVGTextObject(e, a),
      a
  }

  ApplyStyles(e, t) {
    var a = this.GetFieldDataStyleOverride(),
      r = a &&
        a.fillColor;
    if (
      r ||
      this.colorchanges & (
        FileParser.SDRColorFilters.SD_NOCOLOR_FILL | FileParser.SDRColorFilters.SD_NOCOLOR_STYLE
      )
    ) {
      var i = t.Fill.Paint.FillType,
        n = (
          t.Fill.FillEffect,
          t.Fill.EffectColor,
          t.OutsideEffect.Color,
          t.Fill.Paint.Color
        );
      if (
        r &&
        (i = ConstantData.FillTypes.SDFILL_SOLID, n = a.fillColor),
        i == ConstantData.FillTypes.SDFILL_GRADIENT
      ) e.SetFillColor(t.Fill.Paint.Color),
        e.SetGradientFill(
          this.CreateGradientRecord(
            t.Fill.Paint.GradientFlags,
            n,
            t.Fill.Paint.Opacity,
            t.Fill.Paint.EndColor,
            t.Fill.Paint.EndOpacity
          )
        ),
        e.fillPaintType = i;
      else if (i == ConstantData.FillTypes.SDFILL_TEXTURE) {
        var o = {
          url: '',
          scale: 1,
          alignment: t.Fill.Paint.TextureScale.AlignmentScalar
        },
          s = t.Fill.Paint.Texture;
        GlobalData.optManager.TextureList.Textures[s] &&
          (
            o.dim = GlobalData.optManager.TextureList.Textures[s].dim,
            o.url = GlobalData.optManager.TextureList.Textures[s].ImageURL,
            o.scale = GlobalData.optManager.CalcTextureScale(t.Fill.Paint.TextureScale, o.dim.x),
            t.Fill.Paint.TextureScale.Scale = o.scale,
            o.url ||
            (
              o.url = Constants.FilePath_CMSRoot + Constants.FilePath_Textures + GlobalData.optManager.TextureList.Textures[s].filename
            ),
            e.SetTextureFill(o)
          )
      } else i == ConstantData.FillTypes.SDFILL_TRANSPARENT ? e.SetFillColor('none') : (e.SetFillColor(n), e.SetFillOpacity(t.Fill.Paint.Opacity))
    }
  }

  Resize(e, t, a) {

    console.log('== track UpdateDimensionsLines Shape.SVGFragmentSymbol-> Resize')


    var r = e.GetRotation(),
      i = $.extend(!0, {
      }, this.prevBBox),
      n = $.extend(!0, {
      }, t),
      o = GlobalData.optManager.svgDoc.CalculateRotatedOffsetForResize(i, n, r);
    e.SetSize(t.width, t.height),
      e.SetPos(t.x + o.x, t.y + o.y);
    var s = e.GetElementByID(ConstantData.SVGElementClass.SHAPE);
    s.SetSize(t.width, t.height),
      s.SetScale(
        t.width / this.InitialGroupBounds.width,
        t.height / this.InitialGroupBounds.height
      );
    var l = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
    return l &&
      l.SetSize(t.width, t.height),
      this.LM_ResizeSVGTextObject(e, a, t),
      e.SetRotation(r),
      this.UpdateDimensionLines(e),
      o
  }

  ResizeInTextEdit(e, t) {
    if (e) {
      var a = e.GetID();
      if (a >= 0) {
        var r = GlobalData.optManager.GetObjectPtr(a, !1);
        return this.prevBBox = $.extend(!0, {
        }, this.Frame),
          this.Resize(e, t, r)
      }
    }
    return {
      x: 0,
      y: 0
    }
  }

  CreateActionTriggers(e, t, a, r) {
    return ListManager.BaseShape.prototype.CreateActionTriggers.apply(this, [
      e,
      t,
      a,
      r
    ])
  }

  RasterizeSVGShapeForVisio(e) {
    var t = [],
      a = [],
      r = [],
      i = [],
      n = [],
      o = [];
    function s(e) {
      var t;
      for (t = 0; t < n.length; t++) n[t].val = e
    }
    function l(e) {
      var a;
      for (a = 0; a < t.length; a++) t[a].val = e;
      if (0 === String(e).indexOf('#')) for (a = 0; a < i.length; a++) i[a].val = e
    }
    var S = this.BlockID,
      c = this.SVGFragment;
    if (c) {
      var u = this.Frame.width,
        p = this.Frame.height;
      if (0 != c.indexOf('<svg')) {
        var d = this.InitialGroupBounds.width,
          D = this.InitialGroupBounds.height;
        c = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' xlink=\'http://www.w3.org/1999/xlink\' width=\'' + d + '\' height=\'' + D + '\' viewBox=\'0 0 ' + d + ' ' + D + '\'>' + c + '</svg>'
      }
      c = function (e, S) {
        t = SDGraphics.Symbol.GetPlaceholders(SDGraphics.Symbol.Placeholder.FillColor, S),
          a = SDGraphics.Symbol.GetPlaceholders(SDGraphics.Symbol.Placeholder.LineColor, S),
          r = SDGraphics.Symbol.GetPlaceholders(SDGraphics.Symbol.Placeholder.LineThick, S),
          i = SDGraphics.Symbol.GetPlaceholders(SDGraphics.Symbol.Placeholder.SolidFill, S),
          S = (S = S.replace(/fill-opacity="[\d.]*"/g, '')).replace(/stroke-opacity="[\d.]*"/g, '');
        var c = SDGraphics.Symbol.CreatePlaceholder(
          SDGraphics.Symbol.Placeholder.FillTrans,
          SDGraphics.Symbol.PlaceholderDefaults[SDGraphics.Symbol.Placeholder.FillTrans]
        );
        S = S.replace(
          new RegExp('fill="##FILLCOLOR', 'g'),
          'fill-opacity="' + c + '" fill="##FILLCOLOR'
        ),
          n = SDGraphics.Symbol.GetPlaceholders(SDGraphics.Symbol.Placeholder.FillTrans, S);
        var u = SDGraphics.Symbol.CreatePlaceholder(
          SDGraphics.Symbol.Placeholder.LineTrans,
          SDGraphics.Symbol.PlaceholderDefaults[SDGraphics.Symbol.Placeholder.LineTrans]
        );
        S = (
          S = S.replace(
            new RegExp('stroke="##LINECOLOR', 'g'),
            'stroke-opacity="' + u + '" stroke="##LINECOLOR'
          )
        ).replace(
          new RegExp('fill="##LINECOLOR', 'g'),
          'fill-opacity="' + u + '" fill="##LINECOLOR'
        ),
          o = SDGraphics.Symbol.GetPlaceholders(SDGraphics.Symbol.Placeholder.LineTrans, S);
        var p = e.colorchanges,
          d = e.GetFieldDataStyleOverride(),
          D = d &&
            d.strokeColor;
        if (
          D ||
          p & (
            FileParser.SDRColorFilters.SD_NOCOLOR_LINE | FileParser.SDRColorFilters.SD_NOCOLOR_STYLE
          )
        ) {
          var g = e.StyleRecord.Line.Paint.Color;
          D &&
            (g = d.strokeColor),
            function (e) {
              var t;
              for (t = 0; t < a.length; t++) a[t].val = e
            }(g),
            function (e) {
              var t;
              for (t = 0; t < o.length; t++) o[t].val = e
            }(e.StyleRecord.Line.Paint.Opacity)
        }
        return p & (
          FileParser.SDRColorFilters.SD_NOCOLOR_LINETHICK | FileParser.SDRColorFilters.SD_NOCOLOR_STYLE
        ) &&
          function (e) {
            var t;
            for (
              isNaN(e) &&
              (
                e = Number(
                  SDGraphics.Symbol.ParsePlaceholder(e, SDGraphics.Symbol.Placeholder.LineThick)
                )
              ),
              t = 0;
              t < r.length;
              t++
            ) r[t].val = e
          }(e.StyleRecord.Line.Thickness),
          p & (
            FileParser.SDRColorFilters.SD_NOCOLOR_FILL | FileParser.SDRColorFilters.SD_NOCOLOR_STYLE
          ) &&
          (
            e.StyleRecord.Fill.Paint.FillType == ConstantData.FillTypes.SDFILL_TRANSPARENT ? (l(e.StyleRecord.Fill.Paint.Color), s(0)) : (
              l(e.StyleRecord.Fill.Paint.Color),
              s(e.StyleRecord.Fill.Paint.Opacity)
            )
          ),
          S = SDGraphics.Symbol.ReplacePlaceholder(t, S),
          S = SDGraphics.Symbol.ReplacePlaceholder(a, S),
          S = SDGraphics.Symbol.ReplacePlaceholder(r, S),
          S = SDGraphics.Symbol.ReplacePlaceholder(i, S),
          S = SDGraphics.Symbol.ReplacePlaceholder(n, S),
          S = SDGraphics.Symbol.ReplacePlaceholder(o, S)
      }(this, c);
      var g = new Image;
      g.onload = function () {
        var t = document.createElement('canvas'),
          a = u,
          r = p;
        t.width = a,
          t.height = r;
        var i = t.getContext('2d');
        i.fillStyle = '#fff',
          i.globalAlpha = 0,
          i.fillRect(0, 0, a, r),
          i.globalAlpha = 1,
          i.drawImage(g, 0, 0, a, r);
        t.toBlob(
          (
            function (t) {
              var a = URL.createObjectURL(t),
                r = new FileReader;
              r.onload = function (t) {
                var r = new Uint8Array(t.target.result);
                e(S, a, r, null)
              },
                r.readAsArrayBuffer(t)
            }
          ),
          'image/png',
          0.8
        )
      },
        g.onerror = function (t) {
          e(S, null, null, null)
        },
        g.src = 'data:image/svg+xml,' + encodeURIComponent(c)
    } else e(S, null, null, null)
  }

  RasterizeSVGShapeForVisio(e) {
    var t = [],
      a = [],
      r = [],
      i = [],
      n = [],
      o = [];
    function s(e) {
      var t;
      for (t = 0; t < n.length; t++) n[t].val = e
    }
    function l(e) {
      var a;
      for (a = 0; a < t.length; a++) t[a].val = e;
      if (0 === String(e).indexOf('#')) for (a = 0; a < i.length; a++) i[a].val = e
    }
    var S = this.BlockID,
      c = this.SVGFragment;
    if (c) {
      var u = this.Frame.width,
        p = this.Frame.height;
      if (0 != c.indexOf('<svg')) {
        var d = this.InitialGroupBounds.width,
          D = this.InitialGroupBounds.height;
        c = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' xlink=\'http://www.w3.org/1999/xlink\' width=\'' + d + '\' height=\'' + D + '\' viewBox=\'0 0 ' + d + ' ' + D + '\'>' + c + '</svg>'
      }
      c = function (e, S) {
        t = SDGraphics.Symbol.GetPlaceholders(SDGraphics.Symbol.Placeholder.FillColor, S),
          a = SDGraphics.Symbol.GetPlaceholders(SDGraphics.Symbol.Placeholder.LineColor, S),
          r = SDGraphics.Symbol.GetPlaceholders(SDGraphics.Symbol.Placeholder.LineThick, S),
          i = SDGraphics.Symbol.GetPlaceholders(SDGraphics.Symbol.Placeholder.SolidFill, S),
          S = (S = S.replace(/fill-opacity="[\d.]*"/g, '')).replace(/stroke-opacity="[\d.]*"/g, '');
        var c = SDGraphics.Symbol.CreatePlaceholder(
          SDGraphics.Symbol.Placeholder.FillTrans,
          SDGraphics.Symbol.PlaceholderDefaults[SDGraphics.Symbol.Placeholder.FillTrans]
        );
        S = S.replace(
          new RegExp('fill="##FILLCOLOR', 'g'),
          'fill-opacity="' + c + '" fill="##FILLCOLOR'
        ),
          n = SDGraphics.Symbol.GetPlaceholders(SDGraphics.Symbol.Placeholder.FillTrans, S);
        var u = SDGraphics.Symbol.CreatePlaceholder(
          SDGraphics.Symbol.Placeholder.LineTrans,
          SDGraphics.Symbol.PlaceholderDefaults[SDGraphics.Symbol.Placeholder.LineTrans]
        );
        S = (
          S = S.replace(
            new RegExp('stroke="##LINECOLOR', 'g'),
            'stroke-opacity="' + u + '" stroke="##LINECOLOR'
          )
        ).replace(
          new RegExp('fill="##LINECOLOR', 'g'),
          'fill-opacity="' + u + '" fill="##LINECOLOR'
        ),
          o = SDGraphics.Symbol.GetPlaceholders(SDGraphics.Symbol.Placeholder.LineTrans, S);
        var p = e.colorchanges,
          d = e.GetFieldDataStyleOverride(),
          D = d &&
            d.strokeColor;
        if (
          D ||
          p & (
            FileParser.SDRColorFilters.SD_NOCOLOR_LINE | FileParser.SDRColorFilters.SD_NOCOLOR_STYLE
          )
        ) {
          var g = e.StyleRecord.Line.Paint.Color;
          D &&
            (g = d.strokeColor),
            function (e) {
              var t;
              for (t = 0; t < a.length; t++) a[t].val = e
            }(g),
            function (e) {
              var t;
              for (t = 0; t < o.length; t++) o[t].val = e
            }(e.StyleRecord.Line.Paint.Opacity)
        }
        return p & (
          FileParser.SDRColorFilters.SD_NOCOLOR_LINETHICK | FileParser.SDRColorFilters.SD_NOCOLOR_STYLE
        ) &&
          function (e) {
            var t;
            for (
              isNaN(e) &&
              (
                e = Number(
                  SDGraphics.Symbol.ParsePlaceholder(e, SDGraphics.Symbol.Placeholder.LineThick)
                )
              ),
              t = 0;
              t < r.length;
              t++
            ) r[t].val = e
          }(e.StyleRecord.Line.Thickness),
          p & (
            FileParser.SDRColorFilters.SD_NOCOLOR_FILL | FileParser.SDRColorFilters.SD_NOCOLOR_STYLE
          ) &&
          (
            e.StyleRecord.Fill.Paint.FillType == ConstantData.FillTypes.SDFILL_TRANSPARENT ? (l(e.StyleRecord.Fill.Paint.Color), s(0)) : (
              l(e.StyleRecord.Fill.Paint.Color),
              s(e.StyleRecord.Fill.Paint.Opacity)
            )
          ),
          S = SDGraphics.Symbol.ReplacePlaceholder(t, S),
          S = SDGraphics.Symbol.ReplacePlaceholder(a, S),
          S = SDGraphics.Symbol.ReplacePlaceholder(r, S),
          S = SDGraphics.Symbol.ReplacePlaceholder(i, S),
          S = SDGraphics.Symbol.ReplacePlaceholder(n, S),
          S = SDGraphics.Symbol.ReplacePlaceholder(o, S)
      }(this, c);
      var g = new Image;
      g.onload = function () {
        var t = document.createElement('canvas'),
          a = u,
          r = p;
        t.width = a,
          t.height = r;
        var i = t.getContext('2d');
        i.fillStyle = '#fff',
          i.globalAlpha = 0,
          i.fillRect(0, 0, a, r),
          i.globalAlpha = 1,
          i.drawImage(g, 0, 0, a, r);
        t.toBlob(
          (
            function (t) {
              var a = URL.createObjectURL(t),
                r = new FileReader;
              r.onload = function (t) {
                var r = new Uint8Array(t.target.result);
                e(S, a, r, null)
              },
                r.readAsArrayBuffer(t)
            }
          ),
          'image/png',
          0.8
        )
      },
        g.onerror = function (t) {
          e(S, null, null, null)
        },
        g.src = 'data:image/svg+xml,' + encodeURIComponent(c)
    } else e(S, null, null, null)
  }

  ConvertToVisio(e, t) {
    var a = [
      this.BlockID
    ],
      r = GlobalData.objectStore.PreserveBlock(this.BlockID);
    if (null == r) return a;
    if (!t) return a;
    var i = t[this.BlockID];
    if (!i) return a;
    var n = i.imageURL,
      o = i.blobBytes;
    n ||
      (o = null),
      o ||
      (n = null);
    var s = new ListManager.Rect;
    if (
      s.r = Utils1.DeepCopy(this.r),
      s.Frame = Utils1.DeepCopy(this.Frame),
      s.inside = Utils1.DeepCopy(this.inside),
      s.trect = Utils1.DeepCopy(this.trect),
      s.TextFlags = this.TextFlags,
      s.DataID = this.DataID,
      s.RotationAngle = this.RotationAngle,
      s.extraflags = this.extraflags,
      s.StyleRecord = Utils1.DeepCopy(this.StyleRecord),
      GlobalData.optManager.SD_GetVisioTextChild(this.BlockID) < 0 &&
      this.DataID >= 0 &&
      this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB
    ) {
      var l = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      if (l) {
        var S = l.GetElementByID(ConstantData.SVGElementClass.TEXT).GetTextMinDimensions();
        s.trect.y += this.Frame.height,
          s.trect.height = S.height
      }
    }
    return n &&
      o &&
      (
        s.ImageURL = n,
        s.SetBlobBytes(o, FileParser.Image_Dir.dir_png)
      ),
      r.Data = s,
      a
  }
}

export default SVGFragmentSymbol





// ListManager.SVGFragmentSymbol.prototype = new ListManager.BaseSymbol,
//   ListManager.SVGFragmentSymbol.prototype.constructor = ListManager.SVGFragmentSymbol,


