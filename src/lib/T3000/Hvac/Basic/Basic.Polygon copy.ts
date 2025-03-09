



// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import Basic from "./Basic.Index";
// import GPP from "../gListManager";
import $ from 'jquery';
import T3Svg from "../Helper/T3Svg"


import Global from "./Basic.Global";


import Path from "./B.Path";
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"


class Polygon extends Path {

  constructor() {
    super()
  }

  // GetInstanceName(){
  //   return "Polygon";
  // }

  // Basic.Polygon = function () {
  // },
  // Basic.Polygon.prototype = new Basic.Path,
  // Basic.Polygon.prototype.constructor = Basic.Polygon,
  SetPoints(e) {
    var t,
      a = this.PathCreator(),
      r = {
        x: 0,
        y: 0
      },
      i = {
        x: 0,
        y: 0
      },
      n = e.length;
    for (
      a.BeginPath(),
      n > 1 &&
      (a.MoveTo(e[0].x, e[0].y), r.x = i.x = e[0].x, r.y = i.y = e[0].y),
      t = 1;
      t < n;
      t++
    ) a.LineTo(e[t].x, e[t].y),
      r.x = Math.min(r.x, e[t].x),
      r.y = Math.min(r.y, e[t].y),
      i.x = Math.max(i.x, e[t].x),
      i.y = Math.max(i.y, e[t].y);
    n > 1 &&
      a.ClosePath();
    var o = a.ToString();
    this.SetPath(o, {
      x: r.x,
      y: r.y,
      width: i.x - r.x,
      height: i.y - r.y
    })
  }

}

export default Polygon



// export default Basic.Polygon
