




// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import Basic from "./Basic.Index";
// import GPP from "../gListManager";
import $ from 'jquery';
import T3Svg from "../Helper/T3Svg"


import Global from "./Basic.Global";
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"





class Style {

  public element: any;
  public width: number;
  public height: number;

  constructor(e) {
    //'use strict';
    this.element = e
  }

  static imageSizeRequest: any;
  static imageSizeCache: any;


  DefineColor(e, t, a) {
    //'use strict';
    return e = Math.min(255, Math.max(0, e)),
      t = Math.min(255, Math.max(0, t)),
      a = Math.min(255, Math.max(0, a)),
      '#' + Number(e).toString(16) + Number(t).toString(16) + Number(a).toString(16)
  }

  static CalcImageSize(e, t, a, r) {
    //'use strict';
    var i = T3Gv.docHandler ? T3Gv.docHandler.svgDoc : null,
      n = Style.GetCachedImageSize(e);
    if (n) return i &&
      i.ImageLoad_AddRef(),
      void setTimeout(
        (
          function () {
            t(n.width, n.height, null, a),
              i &&
              i.ImageLoad_DecRef()
          }
        ),
        0
      );
    void 0 === r &&
      (r = 'SVG' === e.slice(- 3).toUpperCase());
    Style.imageSizeRequest = Style.imageSizeRequest ||
    {
    },
      Style.imageSizeRequest[e.toUpperCase()] ? Style.imageSizeRequest[e.toUpperCase()].push({
        callback: t,
        data: a
      }) : (
        Style.imageSizeRequest[e.toUpperCase()] = [],
        Style.imageSizeRequest[e.toUpperCase()].push({
          callback: t,
          data: a
        }),
        r ? Style.GetSVGDimensions(e) : Style.GetBitmapDimensions(e)
      )
  }

  static CacheImageSize(e, t, a) {
    //'use strict';
    Style.imageSizeCache = Style.imageSizeCache ||
    {
    },
      Style.imageSizeCache[e.toUpperCase()] = {
        width: t,
        height: a
      }
  }

  static GetCachedImageSize(e) {
    //'use strict';
    return Style.imageSizeCache &&
      Style.imageSizeCache[e.toUpperCase()] ||
      null
  }

  static ProcessImageSizeRequest(e, t, a, r) {
    //'use strict';
    if (Style.imageSizeRequest) {
      var i,
        n,
        o = Style.imageSizeRequest[e.toUpperCase()];
      if (o) for (
        delete Style.imageSizeRequest[e.toUpperCase()],
        i = 0;
        i < o.length;
        i++
      ) (n = o[i]) &&
        n.callback &&
        n.callback(t, a, r, n.data)
    }
  }

  static GetBitmapDimensions(e, t, a) {
    //'use strict';
    var r = new Image,
      i = T3Gv.docHandler ? T3Gv.docHandler.svgDoc : null;
    i &&
      i.ImageLoad_AddRef(),
      r.onload = function () {
        this.width &&
          this.height ? (
          Style.CacheImageSize(e, this.width, this.height),
          Style.ProcessImageSizeRequest(e, this.width, this.height, null),
          t &&
          t(this.width, this.height, null, a)
        ) : (
          i &&
          i.ImageLoad_DecRef(),
          Style.GetSVGDimensions(e, t, a)
        ),
          i &&
          i.ImageLoad_DecRef()
      },
      r.onerror = function (r) {
        Style.ProcessImageSizeRequest(e, 0, 0, {
          success: !1
        }),
          t &&
          t(0, 0, {
            success: !1
          }, a),
          i &&
          i.ImageLoad_DecRef()
      },
      r.src = e
  }

  static GetSVGDimensions(e, t, a) {
    //'use strict';
    var r = T3Gv.docHandler ? T3Gv.docHandler.svgDoc : null;
    r &&
      r.ImageLoad_AddRef(),
      $.ajax({
        type: 'GET',
        url: e,
        async: !0,
        contentType: 'image/svg',
        dataType: 'text',
        success: function (i) {
          var n = Style.ExtractSVGSize(i);
          Style.CacheImageSize(e, n.width, n.height),
            Style.ProcessImageSizeRequest(e, n.width, n.height, null),
            t &&
            t(n.width, n.height, null, a),
            r &&
            r.ImageLoad_DecRef()
        },
        error: function (i) {
          Style.ProcessImageSizeRequest(e, 0, 0, {
            success: !1
          }),
            t &&
            t(0, 0, {
              success: !1
            }, a),
            r &&
            r.ImageLoad_DecRef()
        }
      })
  }

  static ExtractSVGSize(e) {
    //'use strict';
    var t = {
      width: 100,
      height: 100
    },
      a = e.match(/<svg([\s\S]*?)>/i);
    if (!a || !a[1]) return t;
    var r,
      i,
      n = a[1];
    function o(e, t) {
      var a = 0;
      if (!t || !e) return e;
      switch (t) {
        case 'in':
          a = 100 * e;
          break;
        case 'mm':
          a = 100 * e / 25.4;
          break;
        case 'cm':
          a = 100 * e / 2.54;
          break;
        case 'pt':
          a = 100 * e / 72;
          break;
        case 'pc':
          a = 100 * e / 6;
          break;
        case 'px':
          a = e
      }
      return a
    }
    return (a = n.match(/width=\"(\d*\.?\d*)(\w*)\"/i)) &&
      a[1] &&
      (r = o(r = parseFloat(a[1]), a[2])),
      (a = n.match(/height=\"(\d*\.?\d*)(\w*)\"/i)) &&
      a[1] &&
      (i = o(i = parseFloat(a[1]), a[2])),
      r &&
      i ||
      (
        a = n.match(
          /viewbox=\"(\d*\.?\d*)\s+(\d*\.?\d*)\s+(\d*\.?\d*)\s+(\d*\.?\d*)/i
        )
      ) &&
      a[3] &&
      a[4] &&
      (r = parseFloat(a[3]), i = parseFloat(a[4])),
      r &&
      i &&
      (t.width = r, t.height = i),
      t
  }


  static GradientStyle = {
    LINEAR: 'linear',
    RADIAL: 'radial',
    RADIALFILL: 'radialfill'
  }

  // Object.freeze(Style.GradientStyle),
  static GradientPos = {
    LEFTTOP: 'ltop',
    TOP: 'top',
    RIGHTTOP: 'rtop',
    RIGHT: 'right',
    RIGHTBOTTOM: 'rbottom',
    BOTTOM: 'bottom',
    LEFTBOTTOM: 'lbottom',
    LEFT: 'left',
    CENTER: 'center'
  }

  // Object.freeze(Style.GradientPos)

}

export default Style




// export default Basic.Element.Style;
