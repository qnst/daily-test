



// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import Basic from "./Basic.Index";
// import GPP from "../gListManager";
import $ from 'jquery';
import T3Svg from "../Helper/T3Svg"


import Path from "./B.Path";

import Global from "./Basic.Global";
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"


class Line extends Path {

  constructor() {
    super()
  }

  // GetInstanceName(){
  //   return "Line";
  // }


  // Basic.Line = function () {
  // },
  //   Basic.Line.prototype = new Basic.Path,
  //   Basic.Line.prototype.constructor = Basic.Line,
  SetPoints(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    console.log('= B.Line SetPoints startX,startY,endX,endY', startX, startY, endX, endY);

    const pathCreator = this.PathCreator();
    pathCreator.BeginPath();
    pathCreator.MoveTo(startX, startY);
    pathCreator.LineTo(endX, endY);

    const pathString = pathCreator.ToString();

    this.SetPath(pathString, {
      x: Math.min(startX, endX),
      y: Math.min(startY, endY),
      width: Math.abs(endX - startX),
      height: Math.abs(endY - startY),
    });
  }

}

export default Line;




// export default Basic.Line;
