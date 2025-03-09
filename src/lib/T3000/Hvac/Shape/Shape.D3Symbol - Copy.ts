


import Element from '../Basic/B.Element';
import BaseSymbol from '../Basic/B.Symbol';
import ListManager from '../Data/ListManager';
import GlobalData from '../Data/T3Gv'
import BaseShape from './S.BaseShape';
import ConstantData from '../Data/ConstantData'

class D3Symbol extends BaseSymbol {


  // constructor(e) {
  //   //'use strict';
  //   (e = e || {
  //   }).ShapeType = ConstantData.ShapeType.D3SYMBOL,
  //     e.objecttype = ListManager.ObjectTypes.SD_OBJT_D3SYMBOL,
  //     e.TextFlags = e.TextFlags ||
  //     ConstantData.TextFlags.SED_TF_AttachB;
  //   var t = ListManager.BaseShape.apply(this, [
  //     e
  //   ]);
  //   if (this.SetD3Settings(e.d3Settings), t) return t
  // }


  constructor(e) {
    //'use strict';
    e = e || {};
    e.ShapeType = ConstantData.ShapeType.D3SYMBOL;
    e.objecttype = ConstantData.ObjectTypes.SD_OBJT_D3SYMBOL;
    e.TextFlags = e.TextFlags || ConstantData.TextFlags.SED_TF_AttachB;

    // const t = ListManager.BaseShape.apply(this, [e]);

    // Double === TODO
    super();

    // if (this.SetD3Settings(e.d3Settings), t) {
    //   return t;
    // }

    this.SetD3Settings(e.d3Settings);
  }







  // ListManager.D3Symbol.prototype = new ListManager.BaseSymbol,
  // ListManager.D3Symbol.prototype.constructor = ListManager.D3Symbol,
  static DefaultD3Settings(e) {
    var t = {
      moduleID: null,
      renderSettings: {
      },
      publicAttributes: []
    };
    return e &&
      (t = $.extend(!0, t, e)),
      t
  }

  static DefaultStyleParams = [
    'fillColor',
    'strokeColor',
    'strokeWidth',
    'textColor'
  ]

  CreateShape(e, t) {
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    var a = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER),
      r = this.Frame;
    this.TextFlags = ConstantData.TextFlags.SED_TF_AttachB,
      a.SetSize(r.width, r.height),
      a.SetPos(r.x, r.y),
      a.isShape = !0;
    var i = e.CreateShape(Document.CreateShapeType.GROUP);
    i.SetSize(r.width, r.height),
      i.SetID(ConstantData.SVGElementClass.SHAPE);
    var n = e.CreateShape(Document.CreateShapeType.RECT);
    n.SetStrokeColor('white'),
      n.SetFillColor('none'),
      n.SetOpacity(0),
      n.SetStrokeWidth(0),
      t ? n.SetEventBehavior(Element.EventBehavior.HIDDEN_ALL) : n.SetEventBehavior(Element.EventBehavior.NONE),
      n.SetID(ConstantData.SVGElementClass.SLOP),
      n.ExcludeFromExport(!0),
      n.SetSize(r.width, r.height),
      a.AddElement(n),
      a.AddElement(i),
      this.RenderControl(e, a),
      - 1 != this.DataID &&
      this.LM_AddSVGTextObject(e, a);
    var o = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipHoriz) > 0,
      s = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipVert) > 0;
    return o &&
      i.SetMirror(o),
      s &&
      i.SetFlip(s),
      T3Gv.optManager.bDrawEffects &&
      this.SetEffects(i, !1, !1),
      a
  }

  RenderControl(e, t) {
    var a = this.Frame,
      r = this.GetRenderParams(),
      i = t.GetElementByID(ConstantData.SVGElementClass.SHAPE),
      n = t.GetElementByID(ConstantData.SVGElementClass.SLOP),
      o = this.LoadCodeLibrary();
    n &&
      n.SetSize(a.width, a.height),
      i &&
      ($(i.DOMElement()).empty(), o && r && o.Render(i.DOMElement(), r))
  }

  LoadCodeLibrary() {
    var e = this.d3Settings,
      t = e ? e.moduleID : null,
      a = t == this.codeLibID ? this.codeLib : null;
    if (!t) return null;
    a &&
      t == this.codeLibID ||
      (a = SDUI.Utils.GetSymbolCode(t)),
      this.codeLibID = t,
      this.codeLib = a;
    var r = !(!a || !a.AllowFullDataTable) &&
      a.AllowFullDataTable(),
      i = !(!a || !a.ProportionalResize) &&
        a.ProportionalResize();
    return this.bMultiDataRecsAllowed = r,
      this.ObjGrow = i ? ConstantData.GrowBehavior.PROPORTIONAL : ConstantData.GrowBehavior.ALL,
      this.ResizeAspectConstrain = 1 == i,
      a
  }

  MapData(e) {
    var t = this.GetPublicParams(),
      a = e;
    if (a && t.length && this.HasFieldData()) {
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
        g = ListManager.SDData.FieldedDataGetFieldList(this.fieldDataTableID, !0),
        h = function (e) {
          var t,
            a = {},
            r = (e = e || '').split(':');
          for (
            a.name = r[0].toLowerCase(),
            a.start = 0,
            a.flags = null,
            t = 1;
            t < r.length;
            t++
          ) isNaN(parseInt(r[t], 10)) ? a.flags = r[t].toLowerCase() : a.start = parseInt(r[t], 10);
          return a
        },
        m = function (e, t, a, r) {
          var i,
            n,
            o;
          if (!e || !a) return null;
          a = a.toLowerCase();
          var s = function (t, a) {
            return 'string' === a ||
              ('number' == t && ('int' == a || 'float' == a) || ('*' == e || '?' == e || t == a))
          };
          for (i = null, n = t = t || 0; n < g.length; n++) if (
            s(a, (o = g[n]).type) &&
            ('*' == e || '?' == e || o.name.toLowerCase() == e)
          ) {
            if (!r) {
              i = n;
              break
            }
            if ((i = i || []).push(n), '?' == e) break
          }
          return i
        },
        C = ListManager.SDData.GetFieldedDataTable(this.fieldDataTableID),
        y = [];
      if (C) {
        for (n = 3; n < C.Rows.length; n++) y.push(C.Rows[n].ID);
        for (n = 0; n < t.length; n++) if (
          (i = a[t[n]]) &&
          i.dataMap &&
          (r = h(i.dataMap)) &&
          null !== (c = m(r.name, r.start, i.type, i.isArray))
        ) {
          for (
            D = null,
            this.fieldDataElemID < 0 ? 'all' == r.flags ? (u = y, D = []) : u = [
              y[0]
            ] : u = [
              this.fieldDataElemID
            ],
            d = 0;
            d < u.length;
            d++
          ) {
            if (p = u[d], l = null, i.isArray) for (l = [], o = 0; o < c.length; o++) S = g[c[o]],
              void 0 !== (
                s = 'label' == r.flags ? S.name : ListManager.SDData.FieldedDataGetFieldValue(this.fieldDataTableID, p, S.fieldID)
              ) &&
              l.push(s);
            else S = g[c],
              void 0 !== (
                s = 'label' == r.flags ? S.name : ListManager.SDData.FieldedDataGetFieldValue(this.fieldDataTableID, p, S.fieldID)
              ) &&
              (l = s);
            null !== l &&
              (D ? D.push(l) : D = l)
          }
          null !== D &&
            (i.value = D)
        }
      }
    }
  }

  SetParamValue(e, t) {
    var a = this.d3Settings ? this.d3Settings.renderSettings : null;
    if (a && a[e]) {
      T3Gv.optManager.GetObjectPtr(this.BlockID, !0);
      a[e].value = t,
        a[e].dataMap = null,
        this.UpdateSizeFromSettings(),
        T3Gv.optManager.AddToDirtyList(this.BlockID)
    }
  }

  UpdateSizeFromSettings() {
    var e = this.GetRenderParams(),
      t = this.LoadCodeLibrary(),
      a = this.Frame;
    if (e && t && t.CalcSizeFromSettings) {
      var r = t.CalcSizeFromSettings(e);
      r.width == a.width &&
        r.height == a.height ||
        (
          a.width = r.width,
          a.height = r.height,
          this.UpdateFrame(a),
          this.Resize(
            T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID),
            a,
            this
          ),
          T3Gv.optManager.AddToDirtyList(this.BlockID)
        )
    }
  }

  GetRenderParams() {
    var e = this.Frame,
      t = this.d3Settings ? this.d3Settings.renderSettings : null,
      a = this;
    if (t) {
      var r = $.extend(!0, {
      }, t);
      return r.width = r.width ||
      {
      },
        r.height = r.height ||
        {
        },
        r.width.value = e.width,
        r.height.value = e.height,
        function (e) {
          var r = a.GetFieldDataStyleOverride(),
            i = r &&
              r.strokeColor ? r.strokeColor : null,
            n = r &&
              r.fillColor ? r.fillColor : null,
            o = r &&
              r.textColor ? r.textColor : null,
            s = a.StyleRecord.Fill.Paint.Color,
            l = a.StyleRecord.Line.Paint.Color,
            S = a.StyleRecord.Text.Paint.Color;
          a.StyleRecord.Fill.Paint.FillType == ConstantData.FillTypes.SDFILL_TRANSPARENT ? s = 'none' : a.StyleRecord.Fill.Paint.FillType != ConstantData.FillTypes.SDFILL_SOLID &&
            a.StyleRecord.Fill.Paint.FillType != ConstantData.FillTypes.SDFILL_GRADIENT &&
            (s = null),
            a.StyleRecord.Line.Paint.FillType == ConstantData.FillTypes.SDFILL_TRANSPARENT &&
            (s = 'none'),
            a.StyleRecord.Line.Paint.FillType != ConstantData.FillTypes.SDFILL_SOLID &&
            a.StyleRecord.Line.Paint.FillType != ConstantData.FillTypes.SDFILL_GRADIENT &&
            (l = null);
          var c = n ||
            s,
            u = i ||
              l,
            p = a.StyleRecord.Line.Thickness,
            d = o ||
              S;
          c &&
            e.fillColor &&
            (e.fillColor.value = c),
            u &&
            e.strokeColor &&
            (e.strokeColor.value = u),
            e.strokeWidth &&
            (e.strokeWidth.value = p),
            d &&
            e.textColor &&
            (e.textColor.value = d),
            s &&
            t.fillColor &&
            (t.fillColor.value = s),
            l &&
            t.strokeColor &&
            (t.strokeColor.value = l),
            t.strokeWidth &&
            (t.strokeWidth.value = p),
            S &&
            t.textColor &&
            (t.textColor.value = S)
        }(r),
        this.MapData(r),
        r
    }
  }

  SetDataMap(e, t) {
    var a = this.d3Settings ? this.d3Settings.renderSettings : null;
    if (a && a[e]) {
      T3Gv.optManager.GetObjectPtr(this.BlockID, !0);
      a[e].dataMap = t,
        this.UpdateSizeFromSettings(),
        T3Gv.optManager.AddToDirtyList(this.BlockID)
    }
  }

  GetPublicParams() {
    var e,
      t,
      a = this.d3Settings ? this.d3Settings.publicAttributes : null,
      r = [];
    if (!a) return r;
    for (e = 0; e < a.length; e++) t = a[e],
      ListManager.D3Symbol.DefaultStyleParams.indexOf(t) >= 0 ||
      r.push(t);
    return r
  }

  ExportD3Settings() {
    var e = '';
    return this.d3Settings &&
      (e = JSON.stringify(this.d3Settings)),
      e
  }

  ImportD3Settings(e) {
    var t = null;
    try {
      t = JSON.parse(e)
    } catch (e) {
      throw e;
    }
    t &&
      this.SetD3Settings(t)
  }

  SetD3Settings(e) {
    this.d3Settings = ListManager.D3Symbol.DefaultD3Settings(e);
    var t = this.LoadCodeLibrary();
    if (t) {
      var a = t.GetRenderParams(!0);
      this.d3Settings = $.extend(!0, this.d3Settings, a)
    }
  }

  WriteSDFAttributes(e, t) {
    if (
      ListManager.BaseSymbol.prototype.WriteSDFAttributes.call(this, e, t),
      this.d3Settings
    ) {
      var a = this.ExportD3Settings();
      a &&
        SDF.WriteString(e, a, FileParser.SDROpCodesByName.SDF_C_D3SETTINGS, t)
    }
  }

  Resize(e, t, a) {
    if (null == e) return null;
    var r = this.GetRenderParams(),
      i = this.LoadCodeLibrary();
    if (i && i.ResizeSettings) {
      var n = i.ResizeSettings(r, t.width, t.height, !0);
      if (n) for (var o = 0; o < n.length; o++) {
        var s = n[o];
        this.d3Settings.renderSettings[s] &&
          r[s] &&
          (this.d3Settings.renderSettings[s].value = r[s].value)
      }
      r.width &&
        (t.width = r.width.value),
        r.height &&
        (t.height = r.height.value),
        this.Frame.width == t.width &&
        this.Frame.height == t.height ||
        this.UpdateFrame(t)
    }
    var l = ListManager.BaseShape.prototype.Resize.call(this, e, t, a);
    return this.RenderControl(T3Gv.optManager.svgDoc, e),
      l
  }

  ChangeTextAttributes(e, t, a, r, i, n, o, s) {
    T3Gv.optManager.GetActiveTextEdit() == this.BlockID ? t = null : e = null,
      ListManager.BaseDrawingObject.prototype.ChangeTextAttributes.call(this, e, t, a, r, i, n, o, s),
      T3Gv.optManager.AddToDirtyList(this.BlockID)
  }

  CreateActionTriggers(e, t, a, r) {
    return ListManager.BaseShape.prototype.CreateActionTriggers.apply(this, [
      e,
      t,
      a,
      r
    ])
  }

  RefreshFromFieldData(e) {
    return (!e || this.fieldDataTableID == e) &&
      (
        ListManager.BaseDrawingObject.prototype.RefreshFromFieldData.call(this, e),
        this.UpdateSizeFromSettings(),
        T3Gv.optManager.AddToDirtyList(this.BlockID),
        !0
      )
  }

  RasterizeSVGShapeForVisio(e) {
    var t = this.BlockID;
    this.UpdateSizeFromSettings();
    var a = T3Gv.optManager.svgObjectLayer.GetElementByID(t);
    if (a || (a = T3Gv.optManager.svgObjectLayer.GetElementByIDInGroup(t))) {
      var r = a.svgObj.node,
        i = r.innerHTML;
      if (i) {
        var n = r.getBBox();
        this.r.width = n.width,
          this.r.height = n.height;
        var o = n.width,
          s = n.height;
        i = (
          i = (
            i = (
              i = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' xlink=\'http://www.w3.org/1999/xlink\' width=\'' + o + '\' height=\'' + s + '\' viewBox=\'' + n.x + ' ' + n.y + ' ' + n.width + ' ' + n.height + '\'>' + i + '</svg>'
            ).replace(/filter="url\(\S*\)"/g, '')
          ).replace(/&nbsp;/g, ' ')
        ).replace(/<image.*<\/image>/g, '');
        var l = new Image;
        l.onload = function () {
          var a = document.createElement('canvas'),
            r = o,
            i = s;
          a.width = r,
            a.height = i;
          var n = a.getContext('2d');
          n.fillStyle = '#fff',
            n.globalAlpha = 0,
            n.fillRect(0, 0, r, i),
            n.globalAlpha = 1,
            n.drawImage(l, 0, 0, r, i);
          a.toBlob(
            (
              function (a) {
                var r = URL.createObjectURL(a),
                  i = new FileReader;
                i.onload = function (a) {
                  var i = new Uint8Array(a.target.result);
                  e(t, r, i, null)
                },
                  i.readAsArrayBuffer(a)
              }
            ),
            'image/png',
            0.8
          )
        },
          l.onerror = function (a) {
            e(t, null, null, null)
          },
          l.src = 'data:image/svg+xml,' + encodeURIComponent(i)
      } else e(t, null, null, null)
    } else e(t, null, null, null)
  }

  ConvertToVisio(e, t) {
    var a = [
      this.BlockID
    ],
      r = T3Gv.objectStore.PreserveBlock(this.BlockID);
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
    var s = Utils1.DeepCopy(this),
      l = new ListManager.Rect(s);
    return l.Frame = Utils1.DeepCopy(this.r),
      n &&
      o &&
      (
        l.ImageURL = n,
        l.SetBlobBytes(o, FileParser.Image_Dir.dir_png)
      ),
      r.Data = l,
      a
  }

}

export default D3Symbol


