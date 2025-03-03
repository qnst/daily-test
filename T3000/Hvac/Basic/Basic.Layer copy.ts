

// import Basic from "./Basic.Index";

import HvacSVG from "../Helper/SVG.t2"
import $ from "jquery";
// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";

import Container from "./Basic.Container";

import Global from "./Basic.Global";
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"


class Layer extends Container {
  public scaleOKFlag: boolean;
  public dpiScaleOnlyFlag: boolean;

  constructor() {
    super()
    //'use strict';
    this.scaleOKFlag = !0,
      this.dpiScaleOnlyFlag = !1
  }

  // GetInstanceName(){
  //   return "Layer";
  // }

  // Basic.Layer.prototype = new Basic.Container,
  //   Basic.Layer.prototype.constructor = Basic.Layer,
  CreateElement(e, t) {
    //'use strict';
    return this.svgObj = new HvacSVG.Container(HvacSVG.create('g')),
      this.InitElement(e, t),
      this.svgObj
  }

  AllowScaling(e) {
    //'use strict';
    this.scaleOKFlag = e,
      e &&
      (this.dpiScaleOnlyFlag = !1)
  }

  AllowDpiScalingOnly(e) {
    //'use strict';
    this.dpiScaleOnlyFlag = e,
      e &&
      (this.scaleOKFlag = !1)
  }

  IsScalingAllowed() {
    //'use strict';
    return this.scaleOKFlag
  }

  IsDpiScalingAllowed() {
    //'use strict';
    return this.dpiScaleOnlyFlag
  }



}

export default Layer;

// export default Basic.Layer;
