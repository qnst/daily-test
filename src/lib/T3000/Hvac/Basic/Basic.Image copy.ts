



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



import Element from "./B.Element";

class Image extends Element {

  // public svgObj: any;

  constructor() {
    super()
  }

  // GetInstanceName() {
  //   return "Image";
  // }

  // Basic.Image = function () {
  // },
  // Basic.Image.prototype = new Basic.Element,
  // Basic.Image.prototype.constructor = Basic.Image,
  CreateElement(e, t) {
    //'use strict';
    return this.svgObj = new T3Svg.Container(T3Svg.create('image')),
      this.InitElement(e, t),
      this.svgObj
  }

  SetURL(e) {
    //'use strict';
    this.svgObj.attr({
      preserveAspectRatio: 'none'
    }),
      this.svgObj.src = e,
      this.svgObj.attr('xlink:href', e, T3Svg.xlink)
  }

}

export default Image




// export default Basic.Image;
