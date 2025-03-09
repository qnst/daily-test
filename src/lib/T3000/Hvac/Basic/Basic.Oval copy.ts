



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

class Oval extends Element {
  public shapeElem: any;


  constructor() {
    super();
    //'use strict';
    this.svgObj = null,
      this.shapeElem = null
  }

  // GetInstanceName(){
  //   return "Oval";
  // }
  // Basic.Oval.prototype = new Basic.Element,
  // Basic.Oval.prototype.constructor = Basic.Oval,
  CreateElement(e, t) {
    //'use strict';
    return this.svgObj = new T3Svg.Container(T3Svg.create('g')),
      this.shapeElem = new T3Svg.Ellipse,
      this.svgObj.add(this.shapeElem),
      this.InitElement(e, t),
      this.svgObj
  }

  SetSize(e, t) {
    //'use strict';
    e = Global.RoundCoord(e),
      t = Global.RoundCoord(t),
      this.geometryBBox.width = e,
      this.geometryBBox.height = t,
      this.svgObj.size(e, t),
      this.shapeElem.size(e, t),
      this.UpdateTransform(),
      this.RefreshPaint()
  }

}

export default Oval


// export default Basic.Oval;
