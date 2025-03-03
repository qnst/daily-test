





// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import HvacSVG from '../../Hvac.SVG.t2';

import GlobalData from '../Data/GlobalData'
// import Utils2 from "../Helper/Utils2";
// import Utils3 from "../Helper/Utils3";
// import Collab from '../Data/Collab'
// import FileParser from '../Data/FileParser'
// import DefaultEvt from "../Event/Event.Default";
// import Resources from '../Data/Resources'
// import Element from "../Basic/Basic.Element";

import Element from '../Basic/Basic.Element';




class Bitmap_Importer {

  // Bitmap_Importer = function () {
  // },

  importBitmap(e, t, a, r, i) {
    var n;
    if (e && i && !(r <= 0)) {
      GlobalData.optManager.bitmapImportDestWidth = t,
        GlobalData.optManager.bitmapImportDestHeight = a,
        GlobalData.optManager.bitmapImportDPI = r;
      var o = e.type;
      GlobalData.optManager.bitmapImportMimeType = o,
        e instanceof File ? 'image/jpeg' == o ||
          'image/png' == o ? (
          GlobalData.optManager.bitmapImportOriginalSize = e.size,
          GlobalData.optManager.scaledBitmapCallback = i,
          (n = new FileReader).onload = function (t) {
            GlobalData.optManager.bitmapImportEXIFdata = null,
              GlobalData.optManager.bitmapImportFile = e,
              GlobalData.optManager.bitmapImportResult = t.target.result,
              EXIF.getData(e, GotEXIF)
          },
          n.readAsDataURL(e)
        ) : 'image/svg+xml' == o &&
        (
          (n = new FileReader).onload = function (e) {
            var t = new Blob([this.result], {
              type: o
            }),
              a = new Uint8Array(this.result),
              r = window.URL ||
                window.webkitURL,
              n = '';
            r &&
              r.createObjectURL &&
              (n = r.createObjectURL(t), i && i(n, t, a))
          },
          n.readAsArrayBuffer(e)
        ) : (
          (n = new FileReader).onload = function (e) {
            var t = new Blob([this.result], {
              type: o
            }),
              a = new Uint8Array(this.result),
              r = window.URL ||
                window.webkitURL,
              n = '';
            r &&
              r.createObjectURL &&
              (n = r.createObjectURL(t), i && i(n, t, a))
          },
          n.readAsArrayBuffer(e)
        )
    }
  }


}

export default Bitmap_Importer;



