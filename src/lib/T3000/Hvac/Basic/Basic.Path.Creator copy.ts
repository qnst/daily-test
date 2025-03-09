



// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import Basic from "./Basic.Index";
// import GPP from "../gListManager";
import $ from 'jquery';
import T3Svg from "../Helper/T3Svg"

import Global from "./Basic.Global"
import Path from './B.Path'
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"


class Creator {

  public element: any;
  public pathSegs: any[];
  public curPosX: number;
  public curPosY: number;

  constructor(element) {
    this.element = element;
    this.pathSegs = [];
    this.curPosX = 0;
    this.curPosY = 0;
  }


  BeginPath() {
    // //'use strict';
    this.pathSegs = [];
    this.curPosX = 0;
    this.curPosY = 0;
  }


  MoveTo(e, t, a) {
    //'use strict';
    var r = a ? 'm' : 'M';
    r += (e = Global.RoundCoord(e)) + ',' + (t = Global.RoundCoord(t)),
      this.pathSegs.push(r),
      a ? (this.curPosX += e, this.curPosY += t) : (this.curPosX = e, this.curPosY = t)
  }


  LineTo(e, t, a) {
    //'use strict';
    var r = a ? 'l' : 'L';
    r += (e = Global.RoundCoord(e)) + ',' + (t = Global.RoundCoord(t)),
      this.pathSegs.push(r),
      a ? (this.curPosX += e, this.curPosY += t) : (this.curPosX = e, this.curPosY = t)
  }


  CurveTo(e, t, a, r, i) {
    //'use strict';
    var n = i ? 'q' : 'Q';
    n += (e = Global.RoundCoord(e)) + ',' + (t = Global.RoundCoord(t)) + ' ' + (a = Global.RoundCoord(a)) + ',' + (r = Global.RoundCoord(r)),
      this.pathSegs.push(n),
      i ? (this.curPosX += a, this.curPosY += r) : (this.curPosX = a, this.curPosY = r)
  }


  SimpleArcTo(e, t, a, r) {
    //'use strict';
    var i,
      n,
      o = e,
      s = t;
    r &&
      (o += this.curPosX, s += this.curPosY),
      i = Math.abs(o - this.curPosX),
      n = Math.abs(s - this.curPosY),
      i &&
        n ? this.ArcTo(e, t, i, n, 0, a, !1, r) : this.LineTo(e, t, r)
  }


  ArcTo(e, t, a, r, i, n, o, s) {
    //'use strict';
    var l = s ? 'a' : 'A';
    e = Global.RoundCoord(e),
      t = Global.RoundCoord(t),
      l += (a = Global.RoundCoord(a)) + ',' + (r = Global.RoundCoord(r)) + ' ' + i + ' ' + (o ? 1 : 0) + ',' + (n ? 1 : 0) + ' ' + e + ',' + t,
      this.pathSegs.push(l),
      s ? (this.curPosX += e, this.curPosY += t) : (this.curPosX = e, this.curPosY = t)
  }


  ClosePath() {
    //'use strict';
    this.pathSegs.push('z')
  }


  ToString() {
    //'use strict';
    return this.pathSegs.join(' ')
  }


  Apply() {
    // var e = this.ToString();
    // this.element &&
    //   this.element instanceof Path &&
    //   // this.element.GetInstanceName()==="Path" &&
    //   this.element.SetPath(e)


    var pathString = this.ToString();
    if (this.element && this.element instanceof Path) {
      this.element.SetPath(pathString);
    }
  }
}

export default Creator;





// export default Basic.Path.Creator;
