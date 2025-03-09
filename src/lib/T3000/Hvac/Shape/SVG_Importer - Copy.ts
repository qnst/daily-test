






// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import T3Svg from '../../Hvac.SVG.t2';


import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/T3Gv'
import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
import EvtUtil from "../Event/EvtUtil";
import Resources from '../Data/Resources'
import Element from "../Basic/B.Element";









class SVGImporter {

  importSVG(e: any, t: (url: string, blob: Blob, uint8Array: Uint8Array) => void) {
    const fileType = e.type;
    if (fileType === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = function () {
        const blob = new Blob([reader.result as ArrayBuffer], { type: fileType });
        const uint8Array = new Uint8Array(reader.result as ArrayBuffer);
        const urlCreator = window.URL || window.webkitURL;
        let url = '';
        if (urlCreator && urlCreator.createObjectURL) {
          url = urlCreator.createObjectURL(blob);
          if (t) {
            t(url, blob, uint8Array);
          }
        }
        if (e.msClose !== undefined) {
          e.msClose();
        }
      };
      reader.readAsArrayBuffer(e);
    }
  }

}

export default SVGImporter







// ListManager.SVGImporter = function () {
// },
//   ListManager.SVGImporter.prototype.importSVG = function (e, t) {
//     var a = e.type;
//     if ('image/svg+xml' == a) {
//       var r = new FileReader;
//       r.onload = function (r) {
//         var i = new Blob([this.result], {
//           type: a
//         }),
//           n = new Uint8Array(this.result),
//           o = window.URL ||
//             window.webkitURL,
//           s = '';
//         o &&
//           o.createObjectURL &&
//           (s = o.createObjectURL(i), t && t(s, i, n)),
//           void 0 !== e.msClose &&
//           e.msClose()
//       },
//         r.readAsArrayBuffer(e)
//     }
//   }
