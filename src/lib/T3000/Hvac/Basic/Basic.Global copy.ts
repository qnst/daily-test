
// import Basic from "./Basic.Index";
import $ from "jquery";
// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"


class Global {

  // Basic.Global = function () {
  // }

  static CalcAngleFromPoints = function (e, t) {
    //'use strict';
    var a,
      r,
      i;
    return a = t.x - e.x,
      (r = t.y - e.y) ? a ? (i = 180 * Math.atan(r / a) / Math.PI, a < 0 ? i += 180 : r < 0 && (i += 360)) : i = r > 0 ? 90 : 270 : i = a >= 0 ? 0 : 180,
      i
  }

  static RoundCoord = function (e) {
    //'use strict';
    var t = Math.round(1000 * Number(e)) / 1000;
    return isNaN(t) ? e : t
  }

  static RoundCoord2 = function (e) {
    //'use strict';
    var t = Math.round(100 * Number(e)) / 100;
    return isNaN(t) ? e : t
  }

  static RoundCoordLP = function (e) {
    //'use strict';
    var t = Math.round(10 * Number(e)) / 10;
    return isNaN(t) ? e : t
  }

  static ResolveHyperlink = function (e) {
    //'use strict';
    var t = e ||
      '';
    if (t && 0 != t.indexOf('http')) {
      var a = SDUI.Commands.MainController.Hyperlinks.ParseSDRHyperlink(t, !0);
      a ? (
        t = SDUI.Commands.MainController.Hyperlinks.MakeWebHyperlink(
          a.relativePath,
          a.ownerId,
          a.depository,
          SDUI.Commands.MainController.PagedSDRController.Manifest
        ),
        t = window.location.origin + t
      ) : t = 1 == t.indexOf(':') ||
        0 == t.indexOf('\\\\') ? null : 0 == t.indexOf('mailto:') ? e : t.indexOf('://') < 0 ? 'http://' + t : null
    }
    return t
  }

  static ResolveHyperlinkForDisplay = function (e) {
    //'use strict';
    var t = e ||
      '';
    if (t.indexOf('\r') >= 0) {
      var a = t.split('\r');
      t = a[0]
    } else 0 == t.indexOf('/#') &&
      (t = t.slice(2));
    return t
  }


}

export default Global;

// export default Basic.Global;
