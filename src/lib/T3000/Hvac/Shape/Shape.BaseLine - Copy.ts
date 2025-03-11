




// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import T3Svg from '../../Hvac.SVG.t2';
// import '../ListManager/ListManager.Model';
// import HvTimer from '../../GPTimer';

// import {
//   Evt_WorkAreaHammerClick, Evt_WorkAreaHammerDragStart,
//   Evt_DrawTrackHandlerFactory,
//   Evt_DrawReleaseHandlerFactory,Evt_ActionTrackHandlerFactory,
//   Evt_ActionReleaseHandlerFactory,
// } from '../../MouseEvent';

import ListManager from "../Data/ListManager";
import BaseDrawingObject from './S.BaseDrawingObject'
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/T3Gv'
import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
import EvtUtil from "../Event/EvtUtil";
import Resources from '../Data/Resources'
// import Element from "../Basic/Basic.Element";

import $ from 'jquery'
import Global from '../Basic/Basic.Global'
// import Line from '../Basic/Basic.Line'

// import Line from './Shape.Line'
import HvTimer from '../Helper/T3Timer'

// import Line from '../Basic/Basic.Line'

import Point from '../Model/Point'
// import PolyLine from '../Shape/Shape.PolyLine'
import BaseShape from './S.BaseShape'
import Utils4 from '../Helper/Utils3'

import Rect from "./S.Rect";
import Line from "./S.Line";

import Document from '../Basic/B.Document'

import Element from '../Basic/B.Element'
import Business from '../Opt/Business/OptAhUtil'
import Commands from '../Opt/Business/ToolOpt'

import SDF from "../Data/ShapeDataUtil";
import Instance from "../Data/Instance/Instance"
import ConstantData from "../Data/ConstantData"
import PolyList from "../Model/PolyList"

import PolySeg from '../Model/PolySeg'
import HitResult from '../Model/HitResult'
import LinkParameters from '../Model/LinkParameters'
import RightClickData from '../Model/RightClickData'
import ConstantData1 from "../Data/ConstantData1"
import ArrowheadRecord from '../Model/ArrowheadRecord'


class BaseLine extends BaseDrawingObject {


  // ListManager.BaseLine = function (e) {
  //   (e = e || {
  //   }).DrawingObjectBaseClass = ConstantData.DrawingObjectBaseClass.LINE,
  //     e.maxhooks = 2,
  //     void 0 === e.targflags &&
  //     (
  //       e.targflags = ConstantData.HookFlags.SED_LC_Line | ConstantData.HookFlags.SED_LC_AttachToLine
  //     ),
  //     void 0 === e.hookflags &&
  //     (
  //       e.hookflags = ConstantData.HookFlags.SED_LC_Shape | ConstantData.HookFlags.SED_LC_Line
  //     ),
  //     this.LineType = e.LineType,
  //     this.linetrect = {
  //       x: 0,
  //       y: 0,
  //       width: 0,
  //       height: 0
  //     },
  //     this.theMinTextDim = {},
  //     this.theMinTextDim.width = 0,
  //     this.theMinTextDim.height = 0,
  //     this.TextWrapWidth = 0;
  //   var t = ListManager.BaseDrawingObject.apply(this, [
  //     e
  //   ]);
  //   if (this.iconShapeBottomOffset = 20, this.iconShapeRightOffset = 0, t) return t
  // }


  public LineType: any;
  public linetrect: any;
  public theMinTextDim: any;
  public TextWrapWidth: any;
  public polylist: any;

  public StartArrowID: any;
  public EndArrowID: any;
  public StartArrowDisp: any;
  public EndArrowDisp: any;
  public ArrowSizeIndex: any;

  constructor(e) {

    e = e || {};
    e.DrawingObjectBaseClass = ConstantData.DrawingObjectBaseClass.LINE;
    e.maxhooks = 2;
    if (void 0 === e.targflags) {
      e.targflags = ConstantData.HookFlags.SED_LC_Line | ConstantData.HookFlags.SED_LC_AttachToLine;
    }
    if (void 0 === e.hookflags) {
      e.hookflags = ConstantData.HookFlags.SED_LC_Shape | ConstantData.HookFlags.SED_LC_Line;
    }

    super(e);

    this.LineType = e.LineType;
    this.linetrect = { x: 0, y: 0, width: 0, height: 0 };
    this.theMinTextDim = { width: 0, height: 0 };
    this.TextWrapWidth = 0;
    this.iconShapeBottomOffset = 20;
    this.iconShapeRightOffset = 0;
  }

  checkIfPolyLine(t) {
    // const PolyLine = require('./Shape.PolyLine').default;
    // return t instanceof PolyLine;

    const polyLine = Instance.Shape.PolyLine;
    var check = t instanceof polyLine;

    console.log('checkIfPolyLine', check);
    console.log('checkIfPolyLine', t);
    return check;
  }


  // ListManager.BaseLine.prototype = new ListManager.BaseDrawingObject,
  // constructor = ListManager.BaseLine,
  CalcFrame(e) {
    var t = !1;
    this.Frame = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      this.LineType === ConstantData.LineType.SEGLINE &&
      (t = !0);
    var a = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, t, !1, null);
    a &&
      a.length &&
      Utils2.GetPolyRect(this.Frame, a),
      this.UpdateFrame(this.Frame, e)
  }

  GetArrowheadFormat() {
    // var e = new ListManager.ArrowheadRecord;
    // var arrHead = new ArrowheadRecord();
    // return SDF.LineIsReversed(this, null, !1) ? (
    //   arrHead.StartArrowID = this.EndArrowID,
    //   arrHead.EndArrowID = this.StartArrowID,
    //   arrHead.StartArrowDisp = this.EndArrowDisp,
    //   arrHead.EndArrowDisp = this.StartArrowDisp,
    //   arrHead.ArrowSizeIndex = this.ArrowSizeIndex
    // ) : (
    //   arrHead.StartArrowID = this.StartArrowID,
    //   arrHead.EndArrowID = this.EndArrowID,
    //   arrHead.StartArrowDisp = this.StartArrowDisp,
    //   arrHead.EndArrowDisp = this.EndArrowDisp,
    //   arrHead.ArrowSizeIndex = this.ArrowSizeIndex
    // ),
    //   arrHead


    const arrHead = new ArrowheadRecord();
    if (SDF.LineIsReversed(this, null, false)) {
      arrHead.StartArrowID = this.EndArrowID;
      arrHead.EndArrowID = this.StartArrowID;
      arrHead.StartArrowDisp = this.EndArrowDisp;
      arrHead.EndArrowDisp = this.StartArrowDisp;
    } else {
      arrHead.StartArrowID = this.StartArrowID;
      arrHead.EndArrowID = this.EndArrowID;
      arrHead.StartArrowDisp = this.StartArrowDisp;
      arrHead.EndArrowDisp = this.EndArrowDisp;
    }
    arrHead.ArrowSizeIndex = this.ArrowSizeIndex;
    return arrHead;
  }

  GetSVGFrame(e) {
    var t = {};
    return null != e ? Utils2.CopyRect(t, e) : t = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      t
  }

  GetPositionRect() {
    return Utils2.Pt2Rect(this.StartPoint, this.EndPoint)
  }

  AdjustPinRect(e, t, a) {
    return this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR ? T3Gv.optManager.GanttAdjustPinRect(this.BlockID, e, t, a) : e
  }

  GetDimensions() {
    var e,
      t,
      a,
      r = {};
    return e = this.EndPoint.x - this.StartPoint.x,
      t = this.EndPoint.y - this.StartPoint.y,
      a = Utils2.sqrt(e * e + t * t),
      r.x = a,
      r.y = 0,
      r
  }

  GetDimensionsForDisplay() {
    //'use strict';
    var e = this.GetDimensions();
    return {
      x: this.Frame.x,
      y: this.Frame.y,
      width: e.x,
      height: e.y
    }
  }

  GetSnapRect() {
    //'use strict';
    var e = {};
    if (
      Utils2.CopyRect(e, this.Frame),
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
    ) {
      var t = 0,
        a = 0;
      0 === e.width &&
        (t = this.StyleRecord.Line.Thickness / 2),
        0 === e.height &&
        (a = this.StyleRecord.Line.Thickness / 2),
        Utils2.InflateRect(e, t, a)
    }
    return e
  }

  CanSnapToShapes(e) {
    if (
      e &&
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
    ) {
      if (
        Utils2.IsEqual(
          this.StartPoint.x,
          this.EndPoint.x,
          this.StyleRecord.Line.BThick
        )
      ) return e.distanceonly = ConstantData.Guide_DistanceTypes.Vertical_Wall,
        this.BlockID;
      if (
        Utils2.IsEqual(
          this.StartPoint.y,
          this.EndPoint.y,
          this.StyleRecord.Line.BThick
        )
      ) return e.distanceonly = ConstantData.Guide_DistanceTypes.Horizontal_Wall,
        this.BlockID
    }
    return - 1
  }

  IsSnapTarget() {
    //'use strict';
    return !1
  }

  Guide_DistanceOnly() {
    return this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
      ConstantData.Guide_DistanceTypes.PolyWall
  }

  CreateDimension(e, t, a, r, i, n, o, s, l, S, c) {
    if (
      !a ||
      // this instanceof ListManager.PolyLine &&
      // Double === TOOD
      // this instanceof GlobalDataShape.PolyLine &&
      this instanceof Instance.Shape.PolyLine &&
      this.polylist &&
      this.polylist.closed
      // ) return ListManager.BaseDrawingObject.prototype.CreateDimension.call(this, e, t, a, r, i, n, o, s, l, S, c)
    ) return super.CreateDimension(e, t, a, r, i, n, o, s, l, S, c)
  }

  GetDimensionTextForPoints(e, t) {
    //'use strict';
    var a,
      r = [],
      i = 0,
      n = 0,
      o = 0,
      s = 0,
      l = 0;
    if (this.Dimensions & ConstantData.DimensionFlags.SED_DF_Total) {
      var S = this.GetPolyPoints(200, !0, !1, !1, null);
      for (a = 1; a < S.length; a++) s = Math.abs(S[a].x - S[a - 1].x),
        l = Math.abs(S[a].y - S[a - 1].y),
        (s || l) &&
        (o += Math.sqrt(s * s + l * l))
    } else i = 360 - Utils1.CalcAngleFromPoints(e, t),
      n = 2 * Math.PI * (i / 360),
      r.push(new Point(e.x, e.y)),
      r.push(new Point(t.x, t.y)),
      Utils3.RotatePointsAboutCenter(this.Frame, - n, r),
      o = Math.abs(r[0].x - r[1].x);
    return this.GetLengthInRulerUnits(o)
  }

  EnforceMinimum(e) {
    var t,
      a = ConstantData.Defines.SED_MinDim;
    if (Utils2.IsEqual(this.EndPoint.x, this.StartPoint.x)) t = this.EndPoint.y - this.StartPoint.y,
      Math.abs(t) < a &&
      this.hooks.length < 2 &&
      (
        t >= 0 ? e ? this.StartPoint.y = this.EndPoint.y - a : this.EndPoint.y = this.StartPoint.y + a : e ? this.StartPoint.y = this.EndPoint.y + a : this.EndPoint.y = this.StartPoint.y - a
      );
    else if (Utils2.IsEqual(this.EndPoint.y, this.StartPoint.y)) t = this.EndPoint.x - this.StartPoint.x,
      Math.abs(t) < a &&
      this.hooks.length < 2 &&
      (
        t >= 0 ? e ? this.StartPoint.x = this.EndPoint.x - a : this.EndPoint.x = this.StartPoint.x + a : e ? this.StartPoint.x = this.EndPoint.x + a : this.EndPoint.x = this.StartPoint.x - a
      );
    else {
      var r,
        i;
      r = this.EndPoint.x - this.StartPoint.x,
        i = this.EndPoint.y - this.StartPoint.y,
        Math.abs(r) < a &&
        Math.abs(i) < a &&
        this.hooks.length < 2 &&
        (
          Math.abs(r) >= Math.abs(i) ? r >= 0 ? e ? this.StartPoint.x = this.EndPoint.x - a : this.EndPoint.x = this.StartPoint.x + a : e ? this.StartPoint.x = this.EndPoint.x + a : this.EndPoint.x = this.StartPoint.x - a : i >= 0 ? e ? this.StartPoint.y = this.EndPoint.y - a : this.EndPoint.y = this.StartPoint.y + a : e ? this.StartPoint.y = this.EndPoint.y + a : this.EndPoint.y = this.StartPoint.y - a
        )
    }
  }

  UpdateDimensions(e, t, a) {
    var r,
      i = 0,
      n = 0,
      o = 0,
      s = 0,
      l = 0,
      S = [],
      c = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
    S.push(
      new Point(this.StartPoint.x - c.x, this.StartPoint.y - c.y)
    ),
      S.push(
        new Point(this.EndPoint.x - c.x, this.EndPoint.y - c.y)
      ),
      i = 360 - (i = Utils1.CalcAngleFromPoints(S[0], S[1])),
      r = 2 * Math.PI * (i / 360),
      S[1].x,
      S[1].y,
      Utils3.RotatePointsAboutCenter(this.Frame, - r, S),
      S[0].x < S[1].x ? S[1].x = S[0].x + e : S[1].x = S[0].x - e,
      Utils3.RotatePointsAboutCenter(this.Frame, r, S),
      (n = S[1].x + c.x) < 0 &&
      (s = - n, n = 0),
      (o = S[1].y + c.y) < 0 &&
      (
        l += - o,
        (
          this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
          this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select

          //this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always ||
          //this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select
        ) &&
        (l += ConstantData.Defines.DimensionDefaultStandoff),
        o += l
      );
    var u = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    this.AdjustLineEnd(u, n, o, ConstantData.ActionTriggerType.LINEEND, !0),
      (s > 0 || l > 0) &&
      (
        n = this.StartPoint.x + s,
        o = this.StartPoint.y + l,
        this.AdjustLineStart(u, n, o, ConstantData.ActionTriggerType.LINESTART, !0)
      )
  }

  OffsetShape(e, t) {
    this.Frame.x += e,
      this.Frame.y += t,
      this.r.x += e,
      this.r.y += t,
      this.StartPoint.x += e,
      this.StartPoint.y += t,
      this.EndPoint.x += e,
      this.EndPoint.y += t,
      this.CalcFrame()
  }

  SetShapeOrigin(e, t, a) {
    var r = this.GetSVGFrame(),
      i = 0,
      n = 0;
    null != e &&
      (i = r.x - e),
      null != t &&
      (n = r.y - t),
      this.StartPoint.x -= i,
      this.StartPoint.y -= n,
      this.EndPoint.x -= i,
      this.EndPoint.y -= n,
      this.CalcFrame()
  }

  UpdateFrame(e, t) {
    var a,
      r,
      i,
      n = {},
      o = 0,
      s = {};
    if (n = e || this.Frame, this.LineTextX) var l = $.extend(!0, {
    }, this.trect);
    if (
      // ListManager.BaseDrawingObject.prototype.UpdateFrame.call(this, n),
      super.UpdateFrame(n),
      Utils2.CopyRect(s, this.linetrect),
      s.x += this.Frame.x,
      s.y += this.Frame.y,
      null != this.StartPoint &&
      null != this.StartPoint.x ||
      (t = !1),
      T3Gv.optManager
    ) {
      var S = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      if (t) {
        S &&
          (
            T3Gv.optManager.svgObjectLayer.RemoveElement(S),
            Collab.NoRedrawFromSameEditor = !1
          );
        var c = this.CreateShape(T3Gv.optManager.svgDoc, !1)
      } else if (null !== S) {
        var u = this.GetSVGFrame();
        c = S.GetElementByID(ConstantData.SVGElementClass.SHAPE)
      }
      if (c) {
        var p = c.GetArrowheadBounds();
        if (p && p.length) for (i = p.length, r = 0; r < i; r++) p[r].x += u.x,
          p[r].y += u.y,
          this.r = Utils2.UnionRect(p[r], this.r, this.r)
      }
    }
    if (
      this.StyleRecord &&
      this.StyleRecord.Line &&
      this.StyleRecord.Line.Thickness &&
      (o = this.StyleRecord.Line.Thickness),
      o < ConstantData.Defines.SED_MinWid &&
      (o = ConstantData.Defines.SED_MinWid),
      Utils2.InflateRect(this.r, o / 2, o / 2),
      this.StyleRecord &&
      (a = this.CalcEffectSettings(this.Frame, this.StyleRecord, !1)) &&
      Utils2.Add2Rect(this.r, a.extent),
      this.DataID >= 0 &&
      this.linetrect.width &&
      (this.r = Utils2.UnionRect(s, this.r, this.r)),
      this.AddDimensionsToR(),
      this.TextGrow &&
      this.TextGrow === ConstantData.TextGrowBehavior.VERTICAL &&
      !this.LineTextX
    ) {
      var d = this.GetTextOnLineParams(this.BlockID),
        D = Utils2.Pt2Rect(d.StartPoint, d.EndPoint);
      if (this.TextWrapWidth > 0 == !1) {
        var g = n.width * n.width + n.height * n.height;
        this.TextWrapWidth = Math.sqrt(g) / 2
      }
      var h = D.width - this.TextWrapWidth;
      switch (SDF.TextAlignToWin(this.TextAlign).just) {
        case FileParser.TextJust.TA_LEFT:
          this.trect.x = D.x,
            this.trect.width = this.TextWrapWidth;
          break;
        case FileParser.TextJust.TA_RIGHT:
          this.trect.x = D.x + D.width - this.TextWrapWidth,
            this.trect.width = this.TextWrapWidth;
          break;
        default:
          this.trect.x = D.x + h / 2,
            this.trect.width = this.TextWrapWidth
      }
    }
    l &&
      (this.trect.width = l.width, this.trect.height = l.height)
  }

  GetHitTestFrame() {
    var e = {};
    Utils2.CopyRect(e, this.Frame);
    var t = ConstantData.Defines.SED_KnobSize;
    return Utils2.InflateRect(e, t / 2, t / 2),
      e = Utils2.UnionRect(e, this.r, e)
  }

  GetMoveRect(e, t) {
    var a = {};
    if (t) {
      Utils2.CopyRect(a, this.r),
        Utils2.InflateRect(a, 0, 0)
    } else if (
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR
    ) {
      Utils2.CopyRect(a, this.Frame);
      var r = 0;
      this.StyleRecord &&
        this.StyleRecord.Line &&
        this.StyleRecord.Line.Thickness &&
        (r = this.StyleRecord.Line.Thickness),
        Utils2.InflateRect(a, 0, r / 2)
    } else Utils2.CopyRect(a, this.Frame);
    return a
  }

  SetSize(e, t, a) {
    var r = !1,
      i = 0,
      n = 0;
    if (a !== ConstantData.ActionTriggerType.LINELENGTH || null == e) {
      e &&
        (i = e - this.Frame.width),
        t &&
        (n = t - this.Frame.height),
        this.rflags &&
        (
          this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
          this.rflags = Utils2.SetFlag(
            this.rflags,
            ConstantData.FloatingPointDim.SD_FP_Height,
            !1
          )
        ),
        (
          this.StartPoint.x < this.EndPoint.x ||
          Utils2.IsEqual(this.StartPoint.x, this.EndPoint.x) &&
          this.StartPoint.y < this.EndPoint.y
        ) &&
        (r = !0);
      var o = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      r ? this.AdjustLineEnd(o, this.EndPoint.x + i, this.EndPoint.y + n, 0, !0) : this.AdjustLineStart(o, this.StartPoint.x + i, this.StartPoint.y + n, 0, !0),
        T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE)
    } else this.UpdateDimensions(e)
  }

  AdjustForLineAngleSnap(e, t) {
    //'use strict';
    var a,
      r = !1;
    return (
      (a = Utils1.CalcAngleFromPoints(e, t)) >= 358 ||
      a <= 3 ||
      a >= 178 &&
      a <= 183
    ) &&
      (t.y = e.y, r = !0),
      (a >= 88 && a <= 93 || a >= 268 && a <= 273) &&
      (t.x = e.x, r = !0),
      r
  }

  GetAngle(e) {
    //'use strict';
    var t,
      a,
      r,
      i,
      n,
      o = 0,
      s = this.GetTextOnLineParams(e);
    return i = s.StartPoint,
      n = s.EndPoint,
      this.LineType === ConstantData.LineType.LINE ? (
        s.StartPoint.x > s.EndPoint.x &&
        (i = s.EndPoint, n = s.StartPoint),
        t = Math.abs(s.StartPoint.x - s.EndPoint.x),
        (a = Math.abs(s.StartPoint.y - s.EndPoint.y)) < 1 ? o = 0 : t < 1 ? o = 90 : (
          r = Math.atan(a / t),
          o = i.y < n.y ? 180 - (o = 180 * r / Math.PI) : 180 * r / Math.PI
        )
      ) : o = T3Gv.optManager.SD_GetClockwiseAngleBetween2PointsInDegrees(i, n),
      o
  }

  GetDrawNormalizedAngle(e, t) {
    //'use strict';
    var a = 0,
      r = !1;
    return a = Utils1.CalcAngleFromPoints(e, t),
      this.polylist ?
        // this instanceof ListManager.PolyLine ||
        // Double === TODO
        // this instanceof GlobalDataShape.PolyLine ||
        this instanceof Instance.Shape.PolyLine ||
          void 0 === this.IsReversed ? this.IsReverseWinding() &&
        (r = !0) : r = this.IsReversed : a >= 180 &&
        (r = !0),
      r &&
      (a -= 180) < 0 &&
      (a += 360),
      a
  }

  GetApparentAngle(e) {
    //'use strict';
    return this.GetDrawNormalizedAngle(this.StartPoint, this.EndPoint)
  }

  IsReverseWinding() {
    //'use strict';
    var e,
      t,
      a,
      r = 0;
    if (
      2 === (
        e = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null)
      ).length
    ) return e[0].x > e[1].x;
    for (t = e.length - 1, a = 0; a < e.length; t = a++) r += (e[t].x + e[a].x) * (e[t].y - e[a].y);
    return 0.5 * r >= 0
  }

  LinkGrow(e, t, a) {
    switch (t) {
      case ConstantData.HookPts.SED_KTL:
        this.StartPoint.x = a.x,
          this.StartPoint.y = a.y;
        break;
      case ConstantData.HookPts.SED_KTR:
        this.EndPoint.x = a.x,
          this.EndPoint.y = a.y
    }
    this.CalcFrame(!0),
      T3Gv.optManager.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
      T3Gv.optManager.AddToDirtyList(e)
  }

  HandleActionTriggerTrackCommon(e, t, a, r) {
    debugger
    T3Gv.optManager.actionStartX,
      T3Gv.optManager.actionStartY,
      $.extend(!0, {
      }, T3Gv.optManager.actionBBox),
      $.extend(!0, {
      }, T3Gv.optManager.actionBBox);



    var i = {};

    function n(e, t, a) {
      var r = {
        x: e,
        y: t
      };
      return a.x < 0 &&
        (r.x -= a.x),
        a.y < 0 &&
        (r.y -= a.y),
        r
    }


    switch (T3Gv.optManager.actionTriggerId) {
      case ConstantData.ActionTriggerType.LINESTART:
        this.AdjustLineStart(
          T3Gv.optManager.actionSvgObject,
          e,
          t,
          T3Gv.optManager.actionTriggerId,
          a
        ),
          (this.r.x < 0 || this.r.y < 0) &&
          (
            i = n(this.StartPoint.x, this.StartPoint.y, this.r),
            this.AdjustLineStart(
              T3Gv.optManager.actionSvgObject,
              i.x,
              i.y,
              T3Gv.optManager.actionTriggerId,
              a
            )
          );
        break;
      case ConstantData.ActionTriggerType.POLYLEND:
      case ConstantData.ActionTriggerType.LINEEND:
        this.AdjustLineEnd(
          T3Gv.optManager.actionSvgObject,
          e,
          t,
          T3Gv.optManager.actionTriggerId,
          a
        ),
          (this.r.x < 0 || this.r.y < 0) &&
          (
            i = n(this.EndPoint.x, this.EndPoint.y, this.r),
            this.AdjustLineEnd(
              T3Gv.optManager.actionSvgObject,
              i.x,
              i.y,
              T3Gv.optManager.actionTriggerId,
              a
            )
          );
        break;
      case ConstantData.ActionTriggerType.ROTATE:
        this.AdjustRotate(e, t, r);
        break;
      case ConstantData.ActionTriggerType.MODIFYSHAPE:
      case ConstantData.ActionTriggerType.SEGL_ONE:
      case ConstantData.ActionTriggerType.SEGL_TWO:
      case ConstantData.ActionTriggerType.SEGL_THREE:
      case ConstantData.ActionTriggerType.POLYLNODE:
      case ConstantData.ActionTriggerType.POLYLADJ:
      case ConstantData.ActionTriggerType.TOPLEFT:
      case ConstantData.ActionTriggerType.TOPRIGHT:
      case ConstantData.ActionTriggerType.BOTTOMLEFT:
      case ConstantData.ActionTriggerType.BOTTOMRIGHT:
        this.ModifyShape(
          T3Gv.optManager.actionSvgObject,
          e,
          t,
          T3Gv.optManager.actionTriggerId,
          T3Gv.optManager.actionTriggerData,
          a
        ),
          this.UpdateFrame(),
          (this.r.x < 0 || this.r.y < 0) &&
          (
            i = n(e, t, this.r),
            this.ModifyShape(
              T3Gv.optManager.actionSvgObject,
              i.x,
              i.y,
              T3Gv.optManager.actionTriggerId,
              T3Gv.optManager.actionTriggerData
            ),
            this.UpdateFrame()
          );
        break;
      case ConstantData.ActionTriggerType.MOVEPOLYSEG:
        this.MovePolySeg(
          T3Gv.optManager.actionSvgObject,
          e,
          t,
          T3Gv.optManager.actionTriggerId,
          T3Gv.optManager.actionTriggerData
        );
        break;
      case ConstantData.ActionTriggerType.DIMENSION_LINE_ADJ:
        this.DimensionLineDeflectionAdjust(
          T3Gv.optManager.actionSvgObject,
          e,
          t,
          T3Gv.optManager.actionTriggerId,
          T3Gv.optManager.actionTriggerData
        )
    }
  }

  AdjustRotate(e, t, a) {
    var r = e - T3Gv.optManager.rotatePivotX,
      i = t - T3Gv.optManager.rotatePivotY,
      //Double =====
      enhance,
      n = 0;
    0 === r &&
      0 === i ? n = 0 : 0 === r ? n = i > 0 ? 90 : 270 : r >= 0 &&
        i >= 0 ? (n = Math.atan(i / r), n *= 180 / ConstantData.Geometry.PI) : r < 0 &&
          i >= 0 ||
          r < 0 &&
          i < 0 ? n = 180 + (n = Math.atan(i / r)) * (180 / ConstantData.Geometry.PI) : r >= 0 &&
          i < 0 &&
      (n = 360 + (n = Math.atan(i / r)) * (180 / ConstantData.Geometry.PI));
    var o = T3Gv.optManager.OverrideSnaps(a);
    T3Gv.docHandler.documentConfig.enableSnap &&
      !o &&
      (
        enhance = T3Gv.optManager.EnhanceSnaps(a),
        n = enhance ? Math.round(n / T3Gv.optManager.enhanceRotateSnap) * T3Gv.optManager.enhanceRotateSnap : Math.round(n / T3Gv.optManager.rotateSnap) * T3Gv.optManager.rotateSnap
      ),
      this.Rotate(T3Gv.optManager.actionSvgObject, n) &&
      (T3Gv.optManager.rotateEndRotation = n)
  }

  DimensionLineDeflectionAdjust(e, t, a, r, i) {
    console.log('== track UpdateDimensionsLines Shape.BaseLine-> DimensionLineDeflectionAdjust')

    this.dimensionDeflectionH = this.GetDimensionLineDeflection(e, t, a, i);
    this.UpdateDimensionLines(e);

    const isDimSelect = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select;

    if (isDimSelect) {
      this.HideOrShowSelectOnlyDimensions(!0);
    }

  }

  ScaleObject(e, t, a, r, i, n, o) {
    if (
      this.StartPoint.x = e + this.StartPoint.x * i,
      this.StartPoint.y = t + this.StartPoint.y * n,
      this.EndPoint.x = e + this.EndPoint.x * i,
      this.EndPoint.y = t + this.EndPoint.y * n,
      r
    ) {
      var s = 2 * Math.PI * (r / 360);
      this.StartPoint = T3Gv.optManager.RotatePointAroundPoint(a, this.StartPoint, s),
        this.EndPoint = T3Gv.optManager.RotatePointAroundPoint(a, this.EndPoint, s)
    }
    if (
      this.CurveAdjust &&
      (this.CurveAdjust = this.CurveAdjust * ((i + n) / 2)),
      this.rflags &&
      (
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !1
        )
      ),
      o
    ) {
      var l = i;
      n > l &&
        (l = n),
        this.StyleRecord.Line.Thickness = l * this.StyleRecord.Line.Thickness,
        this.StyleRecord.Line.BThick = l * this.StyleRecord.Line.BThick
    }
    this.CalcFrame()
  }

  CanUseStandOffDimensionLines() {
    return !0
  }

  GetDimensionLineDeflection(e, t, a, r) {
    var i,
      n,
      o = 0,
      s = [],
      l = new Point(0, 0),
      S = this.GetDimensionPoints();
    for (i = S.length, o = 0; o < i; o++) S[o].x += this.inside.x,
      S[o].y += this.inside.y;
    if (
      l.x = r.knobPoint.x + this.Frame.x - r.adjustForKnob,
      l.y = r.knobPoint.y + this.Frame.y - r.adjustForKnob,
      s.push(S[r.segmentIndex - 1]),
      s.push(S[r.segmentIndex]),
      s.push(new Point(l.x, l.y)),
      s.push(new Point(t, a)),
      Utils3.RotatePointsAboutCenter(this.Frame, - r.ccAngleRadians, s),
      // this instanceof ListManager.BaseLine &&
      // this instanceof GlobalDataShape.BaseLine &&
      this instanceof Instance.Shape.BaseLine &&
      (!this.polylist || 2 === this.polylist.segs.length)
    ) {
      var c = Math.floor((r.ccAngleRadians - 0.01) / (Math.PI / 2));
      1 != c &&
        2 != c &&
        Utils3.RotatePointsAboutCenter(this.Frame, Math.PI, s)
    } else this.polylist &&
      this.IsReverseWinding() ||
      Utils3.RotatePointsAboutCenter(this.Frame, Math.PI, s);
    return n = s[3].y - s[2].y,
      this.polylist &&
        this.polylist.segs[r.segmentIndex].dimTextAltPositioning ? r.originalDeflection - n : r.originalDeflection + n
  }

  HandleActionTriggerCallResize(e, t) {
    var a = this.Resize(
      T3Gv.optManager.actionSvgObject,
      T3Gv.optManager.actionNewBBox
    );
    T3Gv.optManager.actionBBox.x += a.x,
      T3Gv.optManager.actionBBox.y += a.y,
      T3Gv.optManager.actionStartX += a.x,
      T3Gv.optManager.actionStartY += a.y
  }

  HandleActionTriggerDoAutoScroll() {
    T3Gv.optManager.autoScrollTimerId = T3Gv.optManager.autoScrollTimer.setTimeout('HandleActionTriggerDoAutoScroll', 100);
    var e = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(T3Gv.optManager.autoScrollXPos, T3Gv.optManager.autoScrollYPos);
    T3Gv.optManager.PinRect &&
      T3Gv.optManager.PinTrackPoint(e),
      e = T3Gv.optManager.DoAutoGrowDrag(e),
      T3Gv.docHandler.ScrollToPosition(e.x, e.y),
      this.HandleActionTriggerTrackCommon(e.x, e.y)
  }

  AutoScrollCommon(e, t, a) {
    console.log('4 AutoScrollCommon e, t, a=>', e, t, a);

    var r,
      i,
      n = !1;
    T3Gv.optManager.OverrideSnaps(e) &&
      (t = !1),
      e.gesture ? (r = e.gesture.center.clientX, i = e.gesture.center.clientY) : (r = e.clientX, i = e.clientY);
    var o = r,
      s = i,
      l = T3Gv.optManager.svgDoc.docInfo;
    if (
      r >= l.dispX + l.dispWidth - 4 &&
      (n = !0, o = l.dispX + l.dispWidth - 4 + 32),
      r < l.dispX &&
      (n = !0, o = l.dispX - 32),
      i >= l.dispY + l.dispHeight - 4 &&
      (n = !0, s = l.dispY + l.dispHeight - 4 + 32),
      i < l.dispY &&
      (n = !0, s = l.dispY - 4 - 32),
      n
    ) {
      if (t && T3Gv.docHandler.documentConfig.enableSnap) {
        var S = {
          x: o,
          y: s
        };
        o = (S = T3Gv.docHandler.SnapToGrid(S)).x,
          s = S.y
      }
      return T3Gv.optManager.autoScrollXPos = o,
        T3Gv.optManager.autoScrollYPos = s,
        - 1 != T3Gv.optManager.autoScrollTimerId ? !1 : (
          T3Gv.optManager.autoScrollTimer = new HvTimer(this),/*new GPTimer(this), Double ===== */
          T3Gv.optManager.autoScrollTimerId = T3Gv.optManager.autoScrollTimer.setTimeout(a, 0),
          !1
        )
    }
    return this.ResetAutoScrollTimer(),
      !0
  }

  LM_ActionTrack(e) {
    console.log('11111111============LM_ActionTrack e=>', e);
    debugger
    var t;
    var a;
    var r;
    var i = !1;

    if (
      Utils2.StopPropagationAndDefaults(e),
      - 1 == T3Gv.optManager.actionStoredObjectId
    ) return !1;

    var n = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
    var o = e.gesture.srcEvent.altKey;

    // T3Gv.optManager.PinRect &&
    //   T3Gv.optManager.PinTrackPoint(n),
    //   n = T3Gv.optManager.DoAutoGrowDrag(n),
    //   n = this.LM_ActionDuringTrack(n),
    //   t = T3Gv.optManager.LinkParams &&
    //   T3Gv.optManager.LinkParams.ConnectIndex >= 0,
    //   T3Gv.optManager.OverrideSnaps(e) &&
    //   (t = !0),
    //   T3Gv.optManager.actionTriggerId != ConstantData.ActionTriggerType.MODIFYSHAPE &&
    //   T3Gv.docHandler.documentConfig.enableSnap &&
    //   !t &&
    //   (
    //     a = n.x - T3Gv.optManager.actionStartX,
    //     r = n.y - T3Gv.optManager.actionStartY,
    //     i = T3Gv.optManager.actionTriggerId === ConstantData.ActionTriggerType.MOVEPOLYSEG,
    //     T3Gv.optManager.actionTriggerId === ConstantData.ActionTriggerType.ROTATE ||
    //     this.CustomSnap(this.Frame.x, this.Frame.y, a, r, i, n) ||
    //     i ||
    //     (n = T3Gv.docHandler.SnapToGrid(n))
    //   ),
    //   this.AutoScrollCommon(e, !t, 'HandleActionTriggerDoAutoScroll') &&
    //   this.HandleActionTriggerTrackCommon(n.x, n.y, o, e)





    if (T3Gv.optManager.PinRect) {
      T3Gv.optManager.PinTrackPoint(n);
    }
    n = T3Gv.optManager.DoAutoGrowDrag(n);
    n = this.LM_ActionDuringTrack(n);

    t = T3Gv.optManager.LinkParams && T3Gv.optManager.LinkParams.ConnectIndex >= 0;

    if (T3Gv.optManager.OverrideSnaps(e)) {
      t = true;
    }

    if (T3Gv.optManager.actionTriggerId !== ConstantData.ActionTriggerType.MODIFYSHAPE &&
      T3Gv.docHandler.documentConfig.enableSnap && !t) {
      const a = n.x - T3Gv.optManager.actionStartX;
      const r = n.y - T3Gv.optManager.actionStartY;
      const i = T3Gv.optManager.actionTriggerId === ConstantData.ActionTriggerType.MOVEPOLYSEG;

      if (T3Gv.optManager.actionTriggerId === ConstantData.ActionTriggerType.ROTATE ||
        this.CustomSnap(this.Frame.x, this.Frame.y, a, r, i, n) || i) {
        // Do nothing
      } else {
        n = T3Gv.docHandler.SnapToGrid(n);
      }
    }

    if (this.AutoScrollCommon(e, !t, 'HandleActionTriggerDoAutoScroll')) {
      this.HandleActionTriggerTrackCommon(n.x, n.y, o, e);
    }
  }

  LM_ActionRelease(e, t) {
    // debugger
    if (
      !t &&
      (
        T3Gv.optManager.unbindActionClickHammerEvents(),
        this.ResetAutoScrollTimer(),
        Collab.AllowMessage()
      )
    ) {
      var a = {};
      if (
        a.BlockID = T3Gv.optManager.actionStoredObjectId,
        a.actionTriggerId = T3Gv.optManager.actionTriggerId,
        a.rotateEndRotation = T3Gv.optManager.rotateEndRotation,
        a.rotatePivotX = T3Gv.optManager.rotatePivotX,
        a.rotatePivotY = T3Gv.optManager.rotatePivotY,
        a.rotateStartPoint = Utils1.DeepCopy(T3Gv.optManager.rotateStartPoint),
        a.CurveAdjust = this.CurveAdjust,
        a.IsReversed = this.IsReversed,
        a.Frame = Utils1.DeepCopy(this.Frame),
        a.StartPoint = Utils1.DeepCopy(this.StartPoint),
        a.EndPoint = Utils1.DeepCopy(this.EndPoint),
        T3Gv.optManager.actionTriggerData &&
        (
          a.hitSegment = T3Gv.optManager.actionTriggerData.hitSegment,
          a.moveAngle = T3Gv.optManager.actionTriggerData.moveAngle
        ),
        T3Gv.optManager.ob.Frame &&
        (
          a.ob = {},
          a.ob.StartPoint = Utils1.DeepCopy(T3Gv.optManager.ob.StartPoint),
          a.ob.EndPoint = Utils1.DeepCopy(T3Gv.optManager.ob.EndPoint),
          a.ob.Frame = Utils1.DeepCopy(T3Gv.optManager.ob.Frame),
          a.ob.CurveAdjust = T3Gv.optManager.ob.CurveAdjust,
          a.ob.IsReversed = T3Gv.optManager.ob.IsReversed
        ),
        T3Gv.optManager.LinkParams &&
        (a.LinkParams = Utils1.DeepCopy(T3Gv.optManager.LinkParams)),
        this.segl &&
        (a.segl = Utils1.DeepCopy(this.segl)),
        this.polylist &&
        (a.polylist = Utils1.DeepCopy(this.polylist)),
        this.pointlist &&
        (a.pointlist = Utils1.DeepCopy(this.pointlist)),
        T3Gv.optManager.actionTriggerId === ConstantData.ActionTriggerType.DIMENSION_LINE_ADJ
      ) a.dimensionDeflectionH = this.dimensionDeflectionH,
        a.dimensionDeflectionV = this.dimensionDeflectionV;
      var r = Collab.BuildMessage(ConstantData.CollabMessages.Action_Line, a, !1, !0)
    }
    switch (T3Gv.optManager.actionTriggerId) {
      case ConstantData.ActionTriggerType.ROTATE:
        this.AfterRotateShape(T3Gv.optManager.actionStoredObjectId);
        break;
      case ConstantData.ActionTriggerType.MODIFYSHAPE:
      case ConstantData.ActionTriggerType.SEGL_ONE:
      case ConstantData.ActionTriggerType.SEGL_TWO:
      case ConstantData.ActionTriggerType.SEGL_THREE:
      case ConstantData.ActionTriggerType.POLYLNODE:
      case ConstantData.ActionTriggerType.POLYLADJ:
      case ConstantData.ActionTriggerType.POLYLEND:
      case ConstantData.ActionTriggerType.MOVEPOLYSEG:
        this.AfterModifyShape(
          T3Gv.optManager.actionStoredObjectId,
          T3Gv.optManager.actionTriggerId
        );
        break;
      default:
        if (
          this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR
        ) switch (T3Gv.optManager.actionTriggerId) {
          case ConstantData.ActionTriggerType.LINEEND:
          case ConstantData.ActionTriggerType.LINESTART:
            T3Gv.optManager.GanttAdjustBar(
              T3Gv.optManager.actionStoredObjectId,
              T3Gv.optManager.actionTriggerId
            )
        }
        T3Gv.optManager.ob.Frame &&
          (
            T3Gv.optManager.MaintainLink(
              T3Gv.optManager.actionStoredObjectId,
              this,
              T3Gv.optManager.ob,
              T3Gv.optManager.actionTriggerId
            ),
            T3Gv.optManager.ob = {},
            T3Gv.optManager.SetLinkFlag(
              T3Gv.optManager.actionStoredObjectId,
              ConstantData.LinkFlags.SED_L_MOVE
            ),
            T3Gv.optManager.UpdateLinks()
          )
    }
    this.LM_ActionPostRelease(T3Gv.optManager.actionStoredObjectId),
      r &&
      (
        Collab.IsSecondary() &&
        Collab.CreateList.length &&
        (
          r.Data.CreateList = [],
          r.Data.CreateList = r.Data.CreateList.concat(Collab.CreateList)
        ),
        Collab.SendMessage(r)
      ),
      (
        '' !== this.HyperlinkText ||
        - 1 != this.NoteID ||
        - 1 != this.CommentID ||
        this.HasFieldData()
      ) &&
      T3Gv.optManager.AddToDirtyList(T3Gv.optManager.actionStoredObjectId),
      t ||
      (
        T3Gv.optManager.actionStoredObjectId = - 1,
        T3Gv.optManager.actionSvgObject = null
      ),
      T3Gv.optManager.ShowOverlayLayer(),
      T3Gv.optManager.CompleteOperation(null)
  }

  LM_ActionPreTrack(e, t) {
    var a,
      r,
      i,
      n = - 1;
    if (
      // SDUI.Commands.MainController.Dropdowns.HideAllDropdowns(),
      // Doule === TODO
      null != (a = T3Gv.optManager.GetObjectPtr(e, !1))
    ) {
      switch (T3Gv.optManager.ob = Utils1.DeepCopy(a), t) {
        case ConstantData.ActionTriggerType.LINESTART:
          for (r = 0; r < a.hooks.length; r++) if (
            a.hooks[r].hookpt == ConstantData.HookPts.SED_KTL ||
            a.hooks[r].hookpt == ConstantData.HookPts.SED_WTL ||
            a.hooks[r].hookpt == ConstantData.HookPts.SED_WTR
          ) {
            n = r;
            break
          }
          break;
        case ConstantData.ActionTriggerType.LINEEND:
          for (r = 0; r < a.hooks.length; r++) if (
            a.hooks[r].hookpt == ConstantData.HookPts.SED_KTR ||
            a.hooks[r].hookpt == ConstantData.HookPts.SED_WBL ||
            a.hooks[r].hookpt == ConstantData.HookPts.SED_WBR
          ) {
            n = r;
            break
          }
          break;
        default:
          return
      }
      this.rflags &&
        (
          this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
          this.rflags = Utils2.SetFlag(
            this.rflags,
            ConstantData.FloatingPointDim.SD_FP_Height,
            !1
          )
        ),
        T3Gv.optManager.LinkParams = new LinkParameters(),
        i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
        this.AllowLink() ||
        (T3Gv.optManager.LinkParams.ArraysOnly = !0),
        i &&
        (
          T3Gv.optManager.LinkParams.AllowJoin = i.flags & ConstantData.SessionFlags.SEDS_FreeHand
        ),
        n >= 0 &&
        (
          T3Gv.optManager.LinkParams.ConnectIndex = a.hooks[n].objid,
          T3Gv.optManager.LinkParams.PrevConnect = a.hooks[n].objid,
          T3Gv.optManager.LinkParams.ConnectPt.x = a.hooks[n].connect.x,
          T3Gv.optManager.LinkParams.ConnectPt.y = a.hooks[n].connect.y,
          T3Gv.optManager.LinkParams.ConnectInside = a.hooks[n].cellid,
          T3Gv.optManager.LinkParams.HookIndex = a.hooks[n].hookpt,
          T3Gv.optManager.LinkParams.InitialHook = n
        );
      var o = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLinksBlockID, !1);
      return T3Gv.optManager.LinkParams.lpCircList = T3Gv.optManager.GetHookList(
        o,
        T3Gv.optManager.LinkParams.lpCircList,
        e,
        a,
        ConstantData.ListCodes.SED_LC_CIRCTARG,
        {
        }
      ),
        n < 0 &&
        1 == a.hooks.length &&
        T3Gv.optManager.LinkParams.lpCircList &&
        T3Gv.optManager.LinkParams.lpCircList.push(a.hooks[0].objid),
        !0
    }
  }

  LM_ActionDuringTrack(e) {
    console.log('22222222============LM_ActionTrack e=>', e);

    var t = [
      {
        x: 0,
        y: 0
      }
    ];
    return null == T3Gv.optManager.LinkParams ||
      (
        t[0].x = e.x,
        t[0].y = e.y,
        this.objecttype,
        ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL,
        T3Gv.optManager.actionTriggerId === ConstantData.ActionTriggerType.LINESTART ? t[0].id = ConstantData.HookPts.SED_KTL : t[0].id = ConstantData.HookPts.SED_KTR,
        T3Gv.optManager.dragDeltaX = 0,
        T3Gv.optManager.dragDeltaY = 0,
        T3Gv.optManager.FindConnect(
          T3Gv.optManager.actionStoredObjectId,
          this,
          t,
          !0,
          !1,
          T3Gv.optManager.LinkParams.AllowJoin,
          e
        ) &&
        (
          e.x += T3Gv.optManager.dragDeltaX,
          e.y += T3Gv.optManager.dragDeltaY
        )
      ),
      e
  }

  AfterRotateShape(e) {
    if (this.r.x < 0 || this.r.y < 0) return T3Gv.optManager.Undo(),
      Collab.UnLockMessages(),
      void Collab.UnBlockMessages();
    T3Gv.optManager.ob.Frame &&
      (
        T3Gv.optManager.MaintainLink(
          e,
          this,
          T3Gv.optManager.ob,
          ConstantData.ActionTriggerType.ROTATE
        ),
        T3Gv.optManager.ob = {}
      ),
      T3Gv.optManager.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
      T3Gv.optManager.UpdateLinks()
  }

  AfterModifyShape(e, t) {
    if (T3Gv.optManager.actionSvgObject) {
      var a = T3Gv.optManager.actionSvgObject.GetElementByID(ConstantData.Defines.EllipseAxes);
      null != a &&
        T3Gv.optManager.actionSvgObject.RemoveElement(a)
    }
    T3Gv.optManager.ob.Frame &&
      (
        T3Gv.optManager.MaintainLink(e, this, T3Gv.optManager.ob, t),
        T3Gv.optManager.ob = {}
      ),
      this.rflags &&
      (
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !1
        )
      ),
      T3Gv.optManager.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
      T3Gv.optManager.UpdateLinks(),
      this.arcobj &&
      (this.arcobj = null)
  }

  LM_ActionPostRelease(e) {
    T3Gv.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
      null != T3Gv.optManager.LinkParams &&
      (
        T3Gv.optManager.LinkParams.HiliteConnect >= 0 &&
        (
          T3Gv.optManager.HiliteConnect(
            T3Gv.optManager.LinkParams.HiliteConnect,
            T3Gv.optManager.LinkParams.ConnectPt,
            !1,
            !1,
            this.BlockID,
            T3Gv.optManager.LinkParams.HiliteInside
          ),
          T3Gv.optManager.LinkParams.HiliteConnect = - 1,
          T3Gv.optManager.LinkParams.HiliteInside = null
        ),
        T3Gv.optManager.LinkParams.HiliteJoin >= 0 &&
        (
          T3Gv.optManager.HiliteConnect(
            T3Gv.optManager.LinkParams.HiliteJoin,
            T3Gv.optManager.LinkParams.ConnectPt,
            !1,
            !0,
            this.BlockID,
            null
          ),
          T3Gv.optManager.LinkParams.HiliteJoin = - 1
        ),
        T3Gv.optManager.LinkParams.JoinIndex >= 0 ? T3Gv.optManager.PolyLJoin(
          T3Gv.optManager.LinkParams.JoinIndex,
          T3Gv.optManager.LinkParams.JoinData,
          e,
          T3Gv.optManager.LinkParams.JoinSourceData,
          !1
        ) : T3Gv.optManager.LinkParams &&
        (
          T3Gv.optManager.LinkParams.ConnectIndex >= 0 ||
          T3Gv.optManager.LinkParams.InitialHook >= 0
        ) &&
        T3Gv.optManager.UpdateHook(
          e,
          T3Gv.optManager.LinkParams.InitialHook,
          T3Gv.optManager.LinkParams.ConnectIndex,
          T3Gv.optManager.LinkParams.HookIndex,
          T3Gv.optManager.LinkParams.ConnectPt,
          T3Gv.optManager.LinkParams.ConnectInside
        ),
        T3Gv.optManager.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
        T3Gv.optManager.UpdateLinks(),
        T3Gv.optManager.LinkParams = null
      )
  }

  LM_SetupActionClick(e, t) {
    var a,
      r,
      i;
    if (t) a = T3Gv.optManager.actionStoredObjectId,
      r = T3Gv.optManager.actionTriggerId,
      T3Gv.optManager.PinRect = null,
      i = T3Gv.objectStore.PreserveBlock(a);
    else {
      T3Gv.optManager.SetUIAdaptation(e),
        T3Gv.optManager.theEventTimestamp = Date.now(),
        e.stopPropagation();
      var n = T3Gv.optManager.svgOverlayLayer.FindElementByDOMElement(e.currentTarget);
      if (null === n) return !1;
      var o = n.GetID();
      a = parseInt(
        o.substring(ConstantData.Defines.Action.length, o.length),
        10
      ),
        T3Gv.optManager.actionStoredObjectId = a;
      var s = n.GetTargetForEvent(e);
      if (null == s) return !1;
      i = T3Gv.objectStore.PreserveBlock(a),
        r = s.GetID(),
        T3Gv.optManager.actionTriggerId = r,
        T3Gv.optManager.actionTriggerData = s.GetUserData(),
        T3Gv.optManager.PinRect = null
    }
    i.Data.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR &&
      (
        T3Gv.optManager.PinRect = {},
        T3Gv.optManager.PinRect = this.AdjustPinRect(T3Gv.optManager.PinRect, !1, r)
      ),
      t ||
      T3Gv.optManager.SetControlDragMode(s),
      this.LM_ActionPreTrack(a, r),
      T3Gv.optManager.actionSvgObject = T3Gv.optManager.svgObjectLayer.GetElementByID(a),
      (
        '' !== this.HyperlinkText ||
        - 1 != this.NoteID ||
        - 1 != this.CommentID ||
        this.HasFieldData()
      ) &&
      this.HideAllIcons(T3Gv.optManager.svgDoc, T3Gv.optManager.actionSvgObject);
    var l = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
      S = T3Gv.optManager.LinkParams &&
        T3Gv.optManager.LinkParams.ConnectIndex >= 0;
    T3Gv.optManager.OverrideSnaps(e) &&
      (S = !0),
      T3Gv.docHandler.documentConfig.enableSnap &&
      !S &&
      (l = T3Gv.docHandler.SnapToGrid(l));
    var c = (l = T3Gv.optManager.DoAutoGrowDrag(l)).x,
      u = l.y;
    T3Gv.optManager.actionLockAspectRatio = e.gesture.srcEvent.shiftKey,
      this.ResizeAspectConstrain &&
      (
        T3Gv.optManager.actionLockAspectRatio = !T3Gv.optManager.actionLockAspectRatio
      );
    var p = this.GetSVGFrame();
    return T3Gv.optManager.actionLockAspectRatio &&
      (
        0 === p.height ? T3Gv.optManager.actionLockAspectRatio = !1 : (
          T3Gv.optManager.actionAspectRatioWidth = p.width,
          T3Gv.optManager.actionAspectRatioHeight = p.height
        )
      ),
      T3Gv.optManager.actionBBox = $.extend(!0, {
      }, p),
      T3Gv.optManager.actionNewBBox = $.extend(!0, {
      }, p),
      T3Gv.optManager.HideOverlayLayer(),
      T3Gv.optManager.actionStartX = c,
      T3Gv.optManager.actionStartY = u,
      T3Gv.optManager.actionTriggerId == ConstantData.ActionTriggerType.ROTATE ? this.BeforeRotate(p) : T3Gv.optManager.actionTriggerId !== ConstantData.ActionTriggerType.MODIFYSHAPE &&
        T3Gv.optManager.actionTriggerId !== ConstantData.ActionTriggerType.POLYLADJ ||
        this.BeforeModifyShape(c, u, T3Gv.optManager.actionTriggerData),
      !0
  }

  BeforeRotate(e) {
    T3Gv.optManager.rotateKnobCenterDivisor = this.RotateKnobCenterDivisor(),
      T3Gv.optManager.rotateStartRotation = 180 * Math.atan2(
        this.EndPoint.y - this.StartPoint.y,
        this.EndPoint.x - this.StartPoint.x
      ) / Math.PI,
      T3Gv.optManager.rotateEndRotation = T3Gv.optManager.rotateStartRotation,
      T3Gv.optManager.rotatePivotX = e.x + e.width / T3Gv.optManager.rotateKnobCenterDivisor.x,
      T3Gv.optManager.rotatePivotY = e.y + e.height / T3Gv.optManager.rotateKnobCenterDivisor.y,
      T3Gv.optManager.rotateStartPoint = $.extend(!0, {
      }, this.StartPoint),
      T3Gv.optManager.rotateEndPoint = $.extend(!0, {
      }, this.EndPoint)
  }

  LM_ActionClick_ExceptionCleanup(e) {
    T3Gv.optManager.unbindActionClickHammerEvents(),
      this.ResetAutoScrollTimer(),
      T3Gv.optManager.ob = {},
      T3Gv.optManager.LinkParams = null,
      T3Gv.optManager.actionTriggerId = - 1,
      T3Gv.optManager.actionTriggerData = null,
      T3Gv.optManager.actionStoredObjectId = - 1,
      T3Gv.optManager.actionSvgObject = null,
      Collab.UnBlockMessages()
  }

  LM_ActionClick(e, t) {
    // debugger
    try {
      var a = this.BlockID,
        r = T3Gv.optManager.GetObjectPtr(a, !1);
      // if (!(r && r instanceof ListManager.BaseDrawingObject)) return !1;
      // Double === TODO
      if (!(r && r instanceof BaseDrawingObject)) return !1;
      if (
        T3Gv.optManager.DoAutoGrowDragInit(0, this.BlockID),
        !this.LM_SetupActionClick(e, t)
      ) return;
      Collab.BeginSecondaryEdit();
      var i = T3Gv.optManager.GetObjectPtr(this.BlockID, !1);
      T3Gv.optManager.WorkAreaHammer.on('drag', EvtUtil.Evt_ActionTrackHandlerFactory(i)),

        // T3Gv.optManager.WorkAreaHammer.on('drag', function(ee){
        //   console.log("0000011120200030========================= ee",ee);
        // }),


        T3Gv.optManager.WorkAreaHammer.on('dragend', EvtUtil.Evt_ActionReleaseHandlerFactory(i))
    } catch (e) {
      this.LM_ActionClick_ExceptionCleanup(e);
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  Rotate(e, t) {
    var a = {
      x: T3Gv.optManager.rotatePivotX,
      y: T3Gv.optManager.rotatePivotY
    },
      r = (t - T3Gv.optManager.rotateStartRotation) / (180 / ConstantData.Geometry.PI),
      i = T3Gv.optManager.RotatePointAroundPoint(a, T3Gv.optManager.rotateStartPoint, r),
      n = T3Gv.optManager.RotatePointAroundPoint(a, T3Gv.optManager.rotateEndPoint, r);
    if (i.x < 0 || i.y < 0 || n.x < 0 || n.y < 0) return !1;
    if (
      T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto
    ) {
      var o = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
      if (i.x > o.dim.x || i.y > o.dim.y || n.x > o.dim.x || n.y > o.dim.y) return !1
    }
    return this.AdjustLineStart(e, i.x, i.y, 0, !0),
      this.AdjustLineEnd(e, n.x, n.y, ConstantData.ActionTriggerType.LINEEND, !0),
      !0
  }

  RotateKnobCenterDivisor() {
    return {
      x: 2,
      y: 2
    }
  }

  GetHookFlags() {
    return ConstantData.HookFlags.SED_LC_Shape | ConstantData.HookFlags.SED_LC_Line | ConstantData.HookFlags.SED_LC_CHook
  }


  AllowLink() {


    /*
    var e,
      t;
    return M = ListManager.SessionMoreFlags,
      !(
        (
          t = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1)
        ) &&
        t.activelayer >= 0 &&
        t.layers[t.activelayer].flags & ConstantData.LayerFlags.SDLF_UseEdges
      ) &&
      (
        !!T3Gv.optManager.fromOverlayLayer ||
        !!(
          e = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1)
        ) &&
        e.flags & ListManager.SessionFlags.SEDS_LLink
      )
        */




    const layersManager = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, false);
    const session = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, false);

    const useEdges = layersManager && layersManager.activelayer >= 0 && (layersManager.layers[layersManager.activelayer].flags & ConstantData.LayerFlags.SDLF_UseEdges);
    const fromOverlayLayer = T3Gv.optManager.fromOverlayLayer;
    const sessionLink = session && (session.flags & ConstantData.SessionFlags.SEDS_LLink);

    return !useEdges && (fromOverlayLayer || sessionLink);
  }



  GetHookPoints() {
    var e = ConstantData.Defines.SED_CDim;
    return this.objecttype,
      ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL,
      [
        {
          x: 0,
          y: 0,
          id: ConstantData.HookPts.SED_KTL
        },
        {
          x: e,
          y: e,
          id: ConstantData.HookPts.SED_KTR
        }
      ]
  }

  Pr_GetWidthAdjustment() {
    var e = this.StyleRecord.Line.Thickness / 2,
      t = this.GetAngle(null);
    t >= 90 &&
      (t = 180 - t);
    var a = t / 180 * Math.PI,
      r = Math.cos(a) * e;
    return {
      deltax: Math.sin(a) * e,
      deltay: r
    }
  }

  GetConnectLine() {
    return null
  }

  GetPerimPts(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u = [],
      p = {},
      d = {},
      D = ConstantData.HookPts;
    if (
      l = t.length,
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
      n < 0 &&
      l > 1
    ) {
      for (
        c = this.StyleRecord.Line.Thickness / 2,
        c = this.Pr_GetWidthAdjustment(),
        M = 0;
        M < l;
        M++
      ) {
        switch (t[M].id) {
          case D.SED_WTL:
            S = {
              x: this.StartPoint.x - c.deltax,
              y: this.StartPoint.y - c.deltay,
              id: t[M].id
            };
            break;
          case D.SED_WTR:
            S = {
              x: this.StartPoint.x + c.deltax,
              y: this.StartPoint.y - c.deltay,
              id: t[M].id
            };
            break;
          case D.SED_WBL:
            S = {
              x: this.EndPoint.x - c.deltax,
              y: this.EndPoint.y + c.deltay,
              id: t[M].id
            };
          case D.SED_WBR:
            S = {
              x: this.EndPoint.x + c.deltax,
              y: this.EndPoint.y + c.deltay,
              id: t[M].id
            };
            break;
          case D.SED_KTL:
            S = {
              x: this.StartPoint.x,
              y: this.StartPoint.y,
              id: t[M].id
            };
            break;
          case D.SED_KTR:
            S = {
              x: this.EndPoint.x,
              y: this.EndPoint.y,
              id: t[M].id
            }
        }
        u.push(S)
      }
      return u
    }
    if (n >= 0) {
      var g = T3Gv.optManager.GetObjectPtr(n, !1);
      if (
        g &&
        g.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CONNECTOR
      ) {
        if (g.hooks.length > 1) {
          if (g.hooks[0].objid === this.BlockID) {
            u[0] = {
              x: 0,
              y: this.StartPoint.y
            },
              u[0].x = T3Gv.optManager.GetDependencyLineStartX(g),
              null != t[0].id &&
              (u[0].id = t[0].id);
            var h = this.EndArrowDisp;
            return u[0].x > T3Gv.optManager.GetDependencyLineEndX(g) - h + 1 &&
              (u[0].x = T3Gv.optManager.GetDependencyLineEndX(g) - h + 1),
              u
          }
          if (g.hooks[1].objid === this.BlockID) return u[0] = {
            x: 0,
            y: this.StartPoint.y
          },
            null != t[0].id &&
            (u[0].id = t[0].id),
            u[0].x = T3Gv.optManager.GetDependencyLineEndX(g),
            u
        }
      } else {
        if (
          g &&
          g.objecttype === ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY
        ) {
          var m = 5,
            C = 5;
          m += g.Frame.width / 2;
          var y = this.GetAngle(null);
          y >= 90 &&
            (y = 180 - y);
          var f = y / 180 * Math.PI,
            L = 0;
          if (y <= 45) g.subtype == ConstantData.ObjectSubTypes.SD_SUBT_MULTIPLICITY_FLIPPED &&
            (C = - g.Frame.height - 5),
            L = Math.tan(f) * m,
            0 === t[0].x ? this.StartPoint.y < this.EndPoint.y ? C -= L : C += L : this.StartPoint.y < this.EndPoint.y ? C += L : C -= L,
            C = - C,
            this.StartPoint.x >= this.EndPoint.x &&
            (m = - m);
          else {
            g.subtype == ConstantData.ObjectSubTypes.SD_SUBT_MULTIPLICITY_FLIPPED &&
              (m = - m);
            var I = Math.tan(Math.PI / 2 - f);
            0 === t[0].x ? (
              this.StartPoint.y >= this.EndPoint.y ? C = - C : C += g.Frame.height,
              L = I * Math.abs(C),
              this.StartPoint.x < this.EndPoint.x ? m += L : m -= L
            ) : (
              this.StartPoint.y >= this.EndPoint.y ? C += g.Frame.height : C = - C,
              L = I * Math.abs(C),
              this.StartPoint.x < this.EndPoint.x ? m -= L : m += L,
              m = - m
            )
          }
          return 0 === t[0].x ? (
            u.push(
              new Point(this.StartPoint.x + m, this.StartPoint.y + C)
            ),
            u[0].id = t[0].id
          ) : (
            u.push(
              new Point(this.EndPoint.x - m, this.EndPoint.y + C)
            ),
            u[0].id = t[0].id
          ),
            u
        }
        if (
          g &&
          g.objecttype === ConstantData.ObjectTypes.SD_OBJT_EXTRATEXTLABEL &&
          1 === l
        ) {
          var T = t[0].x / ConstantData.Defines.SED_CDim,
            b = this.GetPointOnLine(T);
          return u.push(b),
            u[0].id = t[0].id,
            u
        }
      }
    } (s = this.GetConnectLine()) ? (p = s.startpt, d = s.endpt) : (p = this.StartPoint, d = this.EndPoint),
      l = t.length;
    for (var M = 0; M < l; M++) u[M] = {
      x: 0,
      y: 0,
      id: 0
    },
      0 === t[M].x &&
        0 === t[M].y ? (u[M].x = p.x, u[M].y = p.y) : t[M].x === ConstantData.Defines.SED_CDim &&
          t[M].y === ConstantData.Defines.SED_CDim ? (u[M].x = d.x, u[M].y = d.y) : (
        c = d.x - p.x,
        o = d.y - p.y,
        u[M].x = t[M].x / ConstantData.Defines.SED_CDim * c + p.x,
        u[M].y = t[M].y / ConstantData.Defines.SED_CDim * o + p.y
      ),
      null != t[M].id &&
      (u[M].id = t[M].id);
    return u
  }

  GetPointOnLine(e) {
    var t = {},
      a = function (e, t) {
        var a,
          r;
        return a = e.x - t.x,
          r = e.y - t.y,
          Utils2.sqrt(a * a + r * r)
      };
    t.x = this.StartPoint.x,
      t.y = this.StartPoint.y;
    for (
      var r = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),
      i = [],
      n = 0,
      o = 1;
      o < r.length;
      o++
    ) {
      var s = r[o - 1],
        l = r[o],
        S = a(s, l);
      i.push({
        pt1: s,
        pt2: l,
        len: S
      }),
        n += S
    }
    e < 0 &&
      (e = 0),
      e > 1 &&
      (e = 1);
    var c,
      u,
      p,
      d = e * n,
      D = 0;
    for (o = 0; o < i.length; o++) {
      var g = i[o];
      if (c = g.pt1, u = g.pt2, D + (p = g.len) >= d) break;
      D += p
    }
    var h = (d - D) / p,
      m = u.x - c.x,
      C = u.y - c.y;
    return t.x = c.x + m * h,
      t.y = c.y + C * h,
      t
  }

  GetTargetPoints(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l = !1,
      S = !1,
      c = [
        {
          x: 0,
          y: 0
        }
      ],
      u = {
        x: 0,
        y: 0
      },
      p = {},
      d = ConstantData.HookPts;
    if (null != a && null != a && a >= 0) {
      var D = T3Gv.optManager.GetObjectPtr(a, !1);
      if (
        D.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CONNECTOR
      ) {
        if (D.hooks.length > 1) {
          if (D.hooks[0].objid === this.BlockID) return c[0].x = ConstantData.Defines.SED_CDim,
            c[0].y = ConstantData.Defines.SED_CDim / 2,
            c;
          if (D.hooks[1].objid === this.BlockID) return c[0].x = 0,
            c[0].y = ConstantData.Defines.SED_CDim / 2,
            c
        }
      } else if (
        D.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
      ) switch (e.id) {
        case d.SED_KTC:
        case d.SED_KBC:
        case d.SED_KRC:
        case d.SED_KLC:
          var g = SDF.LineIsReversed(this, null, !1);
          if (0 === this.hooks.length) return g ? (
            c[0].x = ConstantData.Defines.SED_CDim,
            c[0].y = ConstantData.Defines.SED_CDim,
            c.push({
              x: 0,
              y: 0
            })
          ) : (
            c[0].x = 0,
            c[0].y = 0,
            c.push({
              x: ConstantData.Defines.SED_CDim,
              y: ConstantData.Defines.SED_CDim
            })
          ),
            c;
          if (1 !== this.hooks.length) return [];
          if (this.hooks[0].hookpt === d.SED_KTR) return c[0].x = 0,
            c[0].y = 0,
            c;
          if (this.hooks[0].hookpt === d.SED_KTL) return c[0].x = ConstantData.Defines.SED_CDim,
            c[0].y = ConstantData.Defines.SED_CDim,
            c
      }
    }
    return r = this.EndPoint.x - this.StartPoint.x,
      Utils2.IsEqual(r, 0) &&
      (r = 0),
      0 === r &&
      (l = !0),
      i = this.EndPoint.y - this.StartPoint.y,
      Utils2.IsEqual(i, 0) &&
      (i = 0),
      l ||
      (n = i / r),
      0 === i &&
      (S = !0),
      u.x = e.x,
      u.y = e.y,
      l ||
        Math.abs(n) > 1 ||
        t & ConstantData.HookFlags.SED_LC_HOnly &&
        !S ? (
        T3Gv.docHandler.documentConfig.enableSnap &&
        0 == (t & ConstantData.HookFlags.SED_LC_NoSnaps) &&
        (
          u = T3Gv.docHandler.SnapToGrid(u),
          p = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
          u.y < p.y &&
          (u.y = p.y),
          u.y > p.y + p.height &&
          (u.y = p.y + p.height)
        ),
        o = u.y - this.StartPoint.y,
        s = l ? o : o / n
      ) : (
        T3Gv.docHandler.documentConfig.enableSnap &&
        0 == (t & ConstantData.HookFlags.SED_LC_NoSnaps) &&
        (
          u.x = e.x,
          u.y = e.y,
          u = T3Gv.docHandler.SnapToGrid(u),
          p = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
          u.x < p.x &&
          (u.x = p.x),
          u.x > p.x + p.width &&
          (u.x = p.x + p.width)
        ),
        o = (s = u.x - this.StartPoint.x) * n
      ),
      S ||
      (c[0].y = o / i * ConstantData.Defines.SED_CDim),
      c[0].x = l ? c[0].y : s / r * ConstantData.Defines.SED_CDim,
      S &&
      (c[0].y = c[0].x),
      c[0].x > ConstantData.Defines.SED_CDim &&
      (c[0].x = ConstantData.Defines.SED_CDim),
      c[0].y > ConstantData.Defines.SED_CDim &&
      (c[0].y = ConstantData.Defines.SED_CDim),
      c[0].x < 0 &&
      (c[0].x = 0),
      c[0].y < 0 &&
      (c[0].y = 0),
      c
  }

  AllowHook(e, t, a) {
    var r = ConstantData.HookPts;
    if (
      null != t &&
      null != t &&
      t >= 0 &&
      T3Gv.optManager.GetObjectPtr(t, !1).DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
    ) switch (e.id) {
      case r.SED_KTC:
      case r.SED_KBC:
      case r.SED_KRC:
      case r.SED_KLC:
        if (a > 200) return !1;
        break;
      default:
        if (e.id >= r.SED_CustomBase && e.id < r.SED_CustomBase + 100 && a > 200) return !1
    }
    return !0
  }

  DeleteObject() {
    // ListManager.BaseDrawingObject.prototype.DeleteObject.call(this);
    super.DeleteObject();
    switch (this.objecttype) {
      case ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR:
        if (
          this.datasetElemID >= 0 &&
          - 2 === T3Gv.optManager.GanttDeleteTask(this.datasetTableID, this.datasetElemID, this.BlockID, !0, null)
        ) return;
        if (this.hooks.length) if (
          (e = T3Gv.optManager.GetObjectPtr(this.hooks[0].objid, !1)) &&
          e.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART
        ) return e;
        break;
      case ConstantData.ObjectTypes.SD_OBJT_NG_EVENT:
        var e;
        if (
          this.datasetElemID >= 0 &&
          ListManager.SDData.DeleteRow(this.datasetElemID),
          this.hooks.length
        ) if (
            (e = T3Gv.optManager.GetObjectPtr(this.hooks[0].objid, !1)) &&
            e.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_TIMELINE
          ) return e
    }
  }

  GetSegLFace(e, t, a) {
    return this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CONNECTOR ? this.Frame.x + this.Frame.height <= a.x ? ConstantData.HookPts.SED_KRC : this.y > a.y ? ConstantData.HookPts.SED_KTC : ConstantData.HookPts.SED_KBC : this.Frame.width >= this.Frame.height ? t.y >= a.y ? ConstantData.HookPts.SED_KBC : ConstantData.HookPts.SED_KTC : t.x >= a.x ? ConstantData.HookPts.SED_KRC : ConstantData.HookPts.SED_KLC
  }

  GetSpacing() {
    var e = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      t = {
        width: null,
        height: null
      };
    if (2 === this.hooks.length) var a = T3Gv.optManager.GetObjectPtr(this.hooks[0].objid, !1),
      r = T3Gv.optManager.GetObjectPtr(this.hooks[1].objid, !1);
    return e.width < e.height ? (
      t.height = Math.abs(this.StartPoint.y - this.EndPoint.y),
      a &&
      r &&
      (
        a.Frame.y < r.Frame.y ? t.height = r.Frame.y - (a.Frame.y + a.Frame.height) : t.height = a.Frame.y - (r.Frame.y + r.Frame.height)
      )
    ) : (
      t.width = Math.abs(this.StartPoint.x - this.EndPoint.x),
      a &&
      r &&
      (
        a.Frame.x < r.Frame.x ? t.width = r.Frame.x - (a.Frame.x + a.Frame.width) : t.width = a.Frame.x - (r.Frame.x + r.Frame.width)
      )
    ),
      t
  }

  GetShapeConnectPoint(e) {
    var t = {},
      a = ConstantData.Defines.SED_CDim,
      r = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      i = {};
    return r.width < r.height ? (
      t.x = a / 2,
      i.x = a / 2,
      this.EndPoint.y < this.StartPoint.y ? (t.y = a, i.y = 0) : (t.y = 0, i.y = a)
    ) : (
      t.y = a / 2,
      i.y = a / 2,
      this.EndPoint.x < this.StartPoint.x ? (t.x = a, i.x = 0) : (t.x = 0, i.x = a)
    ),
      e &&
        e === ConstantData.HookPts.SED_KTL ? i : t
  }

  GetBestHook(e, t, a) {
    var r = ConstantData.Defines.SED_CDim,
      i = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      n = ConstantData.HookPts,
      o = !1,
      s = T3Gv.optManager.GetObjectPtr(e, !1);
    if (
      s &&
      s.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
    ) switch (t) {
      case n.SED_KTC:
      case n.SED_KBC:
      case n.SED_KRC:
      case n.SED_KLC:
        return i.width < i.height ? (
          o = i.y === this.EndPoint.y,
          a.y < r / 2 ? o ? n.SED_KTC : n.SED_KBC : o ? n.SED_KBC : n.SED_KTC
        ) : (
          o = i.x === this.EndPoint.x,
          a.x < r / 2 ? o ? n.SED_KLC : n.SED_KRC : o ? n.SED_KRC : n.SED_KLC
        );
      default:
        return t
    }
    return t
  }

  CreateConnectHilites(e, t, a, r, i, n) {
    var o = e.CreateShape(Document.CreateShapeType.GROUP),
      s = e.docInfo.docToScreenScale;
    e.docInfo.docScale <= 0.5 &&
      (s *= 2);
    var l = ConstantData.Defines.CONNECTPT_LINE_DIM / s;
    r &&
      (l = ConstantData.Defines.JOINPT_LINE_DIM / s);
    e.docInfo.docScale;
    var S,
      c = [],
      u = {};
    if (null != a) {
      c.push(a);
      var p = this.GetPerimPts(t, c, null, !0, null, i);
      r &&
        (
          0 === a.x &&
            0 === a.y ? (p[0].x = this.StartPoint.x, p[0].y = this.StartPoint.y) : a.x === ConstantData.Defines.SED_CDim &&
            a.y === ConstantData.Defines.SED_CDim &&
          (p[0].x = this.EndPoint.x, p[0].y = this.EndPoint.y)
        ),
        u.x = p[0].x - l,
        u.y = p[0].y - l,
        u.width = l,
        u.height = l;
      var d = null;
      return T3Gv.optManager.touchInitiated ? (
        d = {
          svgDoc: e,
          shapeType: Document.CreateShapeType.OVAL,
          x: l / 2,
          y: l / 2,
          knobSize: l,
          fillColor: 'black',
          fillOpacity: 0.25,
          strokeSize: 1,
          strokeColor: '#777777',
          KnobID: 0,
          cursorType: Element.CursorType.ANCHOR
        },
        r &&
        (
          d.fillColor = 'none',
          d.strokeSize = 2,
          d.strokeColor = 'black',
          Element.CursorType.CUR_JOIN
        )
      ) : (
        d = {
          svgDoc: e,
          shapeType: Document.CreateShapeType.OVAL,
          x: l / 2,
          y: l / 2,
          knobSize: l,
          fillColor: 'black',
          fillOpacity: 1,
          strokeSize: 1,
          strokeColor: '#777777',
          KnobID: 0,
          cursorType: Element.CursorType.ANCHOR
        },
        r &&
        (
          d.fillColor = 'none',
          d.strokeSize = 1,
          d.strokeColor = 'black',
          Element.CursorType.CUR_JOIN
        )
      ),
        S = this.GenericKnob(d),
        o.AddElement(S),
        o.SetPos(u.x, u.y),
        o.SetSize(u.width, u.height),
        o.isShape = !0,
        o.SetID('hilite_' + t),
        o
    }
  }

  HookToPoint(e, t) {
    var a = {
      x: 0,
      y: 0
    },
      r = {},
      // i = ListManager,
      // Double === TODO
      // i = ListManager,
      i = ConstantData,
      n = this.StyleRecord.Line.Thickness;
    switch (n = this.Pr_GetWidthAdjustment(), e) {
      case i.HookPts.SED_KTL:
        a.x = this.StartPoint.x,
          a.y = this.StartPoint.y;
        break;
      case i.HookPts.SED_KTR:
        a.x = this.EndPoint.x,
          a.y = this.EndPoint.y;
        break;
      case i.HookPts.SED_WTL:
        a.x = this.StartPoint.x - n.deltax,
          a.y = this.StartPoint.y - n.deltay;
        break;
      case i.HookPts.SED_WTR:
        a.x = this.StartPoint.x + n.deltax,
          a.y = this.StartPoint.y - n.deltay;
        break;
      case i.HookPts.SED_WBL:
        a.x = this.EndPoint.x - n.deltax,
          a.y = this.EndPoint.y + n.deltay;
        break;
      case i.HookPts.SED_WBR:
        a.x = this.EndPoint.x + n.deltax,
          a.y = this.EndPoint.y + n.deltay;
        break;
      default:
        a.x = this.EndPoint.x,
          a.y = this.EndPoint.y
    }
    return t &&
      (
        r = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        t.x = r.x,
        t.y = r.y,
        t.width = r.width,
        t.height = r.height
      ),
      a
  }

  MaintainPoint(e, t, a, r, i) {
    var n,
      o,
      s,
      l = {},
      S = {};
    if (
      s = r,
      r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE
    ) {
      switch (r.LineType) {
        case ConstantData.LineType.SEGLINE:
        case ConstantData.LineType.ARCSEGLINE:
        case ConstantData.LineType.POLYLINE:
          for (n = - 1, o = 0; o < r.hooks.length; o++) if (r.hooks[o].targetid === t) {
            r.HookToPoint(r.hooks[o].hookpt, l),
              n = 0;
            break
          }
          if (0 !== n) return !0;
          S = Utils1.DeepCopy(r),
            Utils2.CopyRect(S.Frame, l),
            S.StartPoint.x = l.x,
            S.StartPoint.y = l.y,
            S.EndPoint.x = l.x + l.width,
            S.EndPoint.y = l.y + l.height,
            s = S
      }
      if (T3Gv.optManager.LineCheckPoint(this, e)) return !0;
      if (T3Gv.optManager.Lines_Intersect(this, s, e)) return !0;
      T3Gv.optManager.Lines_MaintainDist(this, a, i, e)
    } else T3Gv.optManager.Lines_MaintainDist(this, a, i, e);
    return !0
  }

  ChangeTarget(e, t, a, r, i, n) {
    //'use strict';
    var o = 0,
      s = null;
    if (
      s = T3Gv.optManager.GetObjectPtr(t, !1),
      this.TextFlags & ConstantData.TextFlags.SED_TF_HorizText &&
      // s instanceof ListManager.BaseShape
      // Double === TODO
      // s instanceof GlobalDataShape.BaseShape
      s instanceof Instance.Shape.BaseShape
    ) {
      o = this.GetApparentAngle(- 1),
        o = Math.abs(o) % 180;
      var l = Math.abs(s.RotationAngle % 180);
      Math.abs(l - o) <= 2 ||
        Math.abs(l - (o - 180)) <= 2 ||
        (
          s.RotationAngle = o,
          T3Gv.optManager.SetLinkFlag(
            this.BlockID,
            ConstantData.LinkFlags.SED_L_MOVE | ConstantData.LinkFlags.SED_L_CHANGE
          ),
          T3Gv.optManager.AddToDirtyList(t)
        )
    }
    T3Gv.optManager.AddToDirtyList(this.BlockID)
  }

  GetPolyPoints(e, isRelative, a, r, i) {

    // t = isRelative to mins the frame point x and y

    // var n = [];
    // if (
    //   n.push(
    //     new Point(this.StartPoint.x, this.StartPoint.y)
    //   ),
    //   n.push(new Point(this.EndPoint.x, this.EndPoint.y)),
    //   t
    // ) for (var o = 0; o < n.length; o++) n[o].x -= this.Frame.x,
    //   n[o].y -= this.Frame.y;
    // return n

    // debugger
    const points = [
      new Point(this.StartPoint.x, this.StartPoint.y),
      new Point(this.EndPoint.x, this.EndPoint.y)
    ];

    if (isRelative) {
      for (const point of points) {
        point.x -= this.Frame.x;
        point.y -= this.Frame.y;
      }
    }

    return points;


  }

  Hit(e, t, a, r, i) {
    var n,
      o,
      s,
      l,
      S,
      c,
      u,
      p = {
        x: 0,
        y: 0
      },
      d = ConstantData.Defines.SED_KnobSize,
      D = 1,
      g = {},
      h = [];
    if (
      D = T3Gv.optManager.svgDoc.docInfo.docToScreenScale,
      T3Gv.optManager.svgDoc.docInfo.docScale <= 0.5 &&
      (D *= 2),
      a
    ) {
      if (
        S = (T3Gv.optManager.touchInitiated, 2 * d / D),
        c = Utils2.InflatePoint(this.StartPoint, S),
        g = Utils2.InflatePoint(this.EndPoint, S),
        i &&
        (
          i === ConstantData.HookPts.SED_KTL &&
          (c = null),
          i === ConstantData.HookPts.SED_KTR &&
          (g = null)
        ),
        this.hooks
      ) for (l = 0; l < this.hooks.length; l++) this.hooks[l].hookpt === ConstantData.HookPts.SED_KTL &&
        (c = null),
        this.hooks[l].hookpt === ConstantData.HookPts.SED_KTR &&
        (g = null);
      if (
        c &&
        Utils2.pointInRect(c, e) &&
        !(
          (u = T3Gv.optManager.GetObjectPtr(r.objectid, !1)) &&
          u.polylist &&
          u.polylist.closed
        )
      ) return r &&
        (
          r.hitcode = ConstantData.HitCodes.SED_PLApp,
          r.segment = ConstantData.HookPts.SED_KTL,
          r.pt.x = this.StartPoint.x,
          r.pt.y = this.StartPoint.y
        ),
        ConstantData.HitCodes.SED_PLApp;
      if (
        g &&
        Utils2.pointInRect(g, e) &&
        !(
          (u = T3Gv.optManager.GetObjectPtr(r.objectid, !1)) &&
          u.polylist &&
          u.polylist.closed
        )
      ) return r &&
        (
          r.hitcode = ConstantData.HitCodes.SED_PLApp,
          r.segment = ConstantData.HookPts.SED_KTR,
          r.pt.x = this.EndPoint.x,
          r.pt.y = this.EndPoint.y
        ),
        ConstantData.HitCodes.SED_PLApp
    }
    n = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !0, h),
      p.x = e.x,
      p.y = e.y;
    var m = {};
    if (
      // o = Utils3.LineDStyleHit(n, p, this.StyleRecord.Line.Thickness, 0, m),
      // Double === TODO
      o = Utils3.LineDStyleHit(n, p, this.StyleRecord.Line.Thickness, 0, m),
      void 0 !== m.lpHit &&
      r
    ) {
      for (s = h.length, l = 0; l < s; l++) if (m.lpHit < h[l]) {
        m.lpHit = l;
        break
      }
      r.segment = m.lpHit
    }
    return r &&
      (r.hitcode = o),
      o
  }

  StartNewObjectDrawDoAutoScroll() {
    T3Gv.optManager.autoScrollTimerId = T3Gv.optManager.autoScrollTimer.setTimeout('StartNewObjectDrawDoAutoScroll', 100);
    var e = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(T3Gv.optManager.autoScrollXPos, T3Gv.optManager.autoScrollYPos);
    e = T3Gv.optManager.DoAutoGrowDrag(e),
      T3Gv.docHandler.ScrollToPosition(e.x, e.y),
      this.StartNewObjectDrawTrackCommon(e.x, e.y, null)
  }

  StartNewObjectDrawTrackCommon(e, t, a) {

    console.log(' 6 =======StartNewObjectDrawTrackCommon e=>', e);

    // var r = e - T3Gv.optManager.actionStartX,
    //   i = t - T3Gv.optManager.actionStartY;
    // Math.sqrt(r * r + i * i),
    //   $.extend(!0, {
    //   }, T3Gv.optManager.actionBBox);
    // this.AdjustLineEnd(
    //   T3Gv.optManager.actionSvgObject,
    //   e,
    //   t,
    //   ConstantData.ActionTriggerType.LINEEND,
    //   a
    // )

    // debugger


    const deltaX = e - T3Gv.optManager.actionStartX;
    const deltaY = t - T3Gv.optManager.actionStartY;
    const distance = Math.sqrt(deltaX * deltaY);
    const actionBBox = $.extend(true, {}, T3Gv.optManager.actionBBox);

    this.AdjustLineEnd(
      T3Gv.optManager.actionSvgObject,
      e,
      t,
      ConstantData.ActionTriggerType.LINEEND,
      a
    );


  }

  LM_DrawTrack(e) {
    console.log('4 LM_DrawTrack e=>', e);

    Utils2.StopPropagationAndDefaults(e);
    var t,
      a = 0;
    if (- 1 == T3Gv.optManager.actionStoredObjectId) return !1;
    e.gesture ? (
      t = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
      a = e.gesture.srcEvent.altKey
    ) : t = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.clientX, e.clientY),
      t = this.LM_DrawDuringTrack(t);
    var r = T3Gv.optManager.LinkParams &&
      T3Gv.optManager.LinkParams.ConnectIndex >= 0;
    if (
      T3Gv.optManager.OverrideSnaps(e) &&
      (r = !0),
      T3Gv.docHandler.documentConfig.enableSnap &&
      !r
    ) {
      var i = t.x - T3Gv.optManager.actionStartX,
        n = t.y - T3Gv.optManager.actionStartY;
      this.CustomSnap(this.Frame.x, this.Frame.y, i, n, !1, t) ||
        (t = T3Gv.docHandler.SnapToGrid(t))
    }
    t = T3Gv.optManager.DoAutoGrowDrag(t),
      this.AutoScrollCommon(e, !r, 'StartNewObjectDrawDoAutoScroll') &&
      this.StartNewObjectDrawTrackCommon(t.x, t.y, a)
  }

  CancelObjectDraw() {
    return T3Gv.optManager.unbindActionClickHammerEvents(),
      T3Gv.optManager.lineStamp &&
      (
        T3Gv.optManager.isMobilePlatform ||
        T3Gv.optManager.WorkAreaHammer &&
        T3Gv.optManager.WorkAreaHammer.off('mousemove'),
        T3Gv.optManager.lineStamp = !1
      ),
      T3Gv.optManager.fromOverlayLayer = !1,
      T3Gv.optManager.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick),
      this.ResetAutoScrollTimer(),
      !0
  }

  LM_DrawRelease(e, t) {

    console.log('7 LM_DrawRelease e=>', e);

    try {
      var a,
        r = {}, minlen;

      //double
      minlen = ConstantData.Defines.SED_SegDefLen,
        t ? (r = t, a = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(t.x, t.y)) : e.gesture ? (
          r.x = e.gesture.center.clientX,
          r.y = e.gesture.center.clientY,
          a = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY)
        ) : (
          r.x = e.clientX,
          r.y = e.clientY,
          a = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.clientX, e.clientY)
        ),
        e &&
        Utils2.StopPropagationAndDefaults(e);
      var i,
        n,
        o = 2 * ConstantData.Defines.SED_MinDim;
      if (
        T3Gv.optManager.fromOverlayLayer ? (
          i = T3Gv.optManager.lineDrawStartX - a.x,
          n = T3Gv.optManager.lineDrawStartY - a.y,
          minlen -= 20
        ) : (
          i = T3Gv.optManager.drawStartX - a.x,
          n = T3Gv.optManager.drawStartY - a.y
        ),
        !T3Gv.optManager.lineStamp &&
        Math.abs(i) < o &&
        Math.abs(n) < o
      ) return T3Gv.optManager.lineStamp = !0,
        void (
          T3Gv.optManager.isMobilePlatform ||
          T3Gv.optManager.WorkAreaHammer &&
          T3Gv.optManager.WorkAreaHammer.on('mousemove', EvtUtil.Evt_DrawTrackHandlerFactory(this))
        );
      if (
        T3Gv.optManager.WorkAreaHammer &&
        (
          T3Gv.optManager.unbindActionClickHammerEvents(),
          T3Gv.optManager.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick)
        ),
        e &&
        e.gesture &&
        e.gesture.stopDetect(),
        this.ResetAutoScrollTimer(),
        T3Gv.optManager.fromOverlayLayer &&
        i * i + n * n < minlen * minlen
      ) return void SDUI.Commands.MainController.Shapes.CancelModalOperation();
      var s = {
        LinkParams: Utils1.DeepCopy(T3Gv.optManager.LinkParams)
      },
        l = this.LM_DrawPostRelease(T3Gv.optManager.actionStoredObjectId),
        S = null;
      if (
        T3Gv.optManager.fromOverlayLayer &&
        (S = gBusinessController.AddLineLabel(this.BlockID)),
        Collab.AllowMessage()
      ) {
        var c = {
          attributes: {
          }
        };
        c.attributes.StyleRecord = Utils1.DeepCopy(T3Gv.optManager.drawShape.StyleRecord),
          c.attributes.StartArrowID = T3Gv.optManager.drawShape.StartArrowID,
          c.attributes.EndArrowID = T3Gv.optManager.drawShape.EndArrowID,
          c.attributes.StartArrowDisp = T3Gv.optManager.drawShape.StartArrowDisp,
          c.attributes.ArrowSizeIndex = T3Gv.optManager.drawShape.ArrowSizeIndex,
          c.attributes.TextGrow = T3Gv.optManager.drawShape.TextGrow,
          c.attributes.TextAlign = T3Gv.optManager.drawShape.TextAlign,
          c.attributes.TextDirection = T3Gv.optManager.drawShape.TextDirection,
          c.attributes.TextFlags = T3Gv.optManager.drawShape.TextFlags,
          c.attributes.Dimensions = T3Gv.optManager.drawShape.Dimensions,
          c.attributes.StartPoint = Utils1.DeepCopy(T3Gv.optManager.drawShape.StartPoint),
          c.attributes.EndPoint = Utils1.DeepCopy(T3Gv.optManager.drawShape.EndPoint),
          c.attributes.Frame = Utils1.DeepCopy(T3Gv.optManager.drawShape.Frame),
          c.attributes.objecttype = this.objecttype,
          c.attributes.ShortRef = this.ShortRef,
          c.attributes.shapeparam = this.shapeparam,
          null != this.CurveAdjust &&
          (c.attributes.CurveAdjust = this.CurveAdjust),
          this.segl &&
          (c.attributes.segl = Utils1.DeepCopy(this.segl)),
          c.UsingWallTool = ConstantData.DocumentContext.UsingWallTool,
          c.LineTool = ConstantData.DocumentContext.LineTool,
          Collab.CreateList.length &&
          Collab.AddNewBlockToSecondary(Collab.CreateList[0]),
          Collab.IsSecondary() &&
          Collab.CreateList.length &&
          (
            c.CreateList = [],
            c.CreateList = c.CreateList.concat(Collab.CreateList)
          ),
          c.LinkParams = s.LinkParams,
          c.Actions = [];
        var u = new Collab.MessageAction(ConstantData.CollabMessageActions.CreateLine);
        c.Actions.push(u),
          u = new Collab.MessageAction(ConstantData.CollabMessageActions.LinkObject),
          c.Actions.push(u),
          S &&
          (
            c.label = S,
            u = new Collab.MessageAction(ConstantData.CollabMessageActions.AddLabel),
            c.Actions.push(u)
          );
        var p = Collab.BuildMessage(ConstantData.CollabMessages.AddLine, c, !1, !0)
      }
      p &&
        Collab.SendMessage(p),
        l ? T3Gv.optManager.PostObjectDraw(null) : T3Gv.optManager.PostObjectDraw(this.LM_DrawRelease),
        T3Gv.optManager.lineStamp &&
        (
          T3Gv.optManager.isMobilePlatform ||
          T3Gv.optManager.WorkAreaHammer &&
          T3Gv.optManager.WorkAreaHammer.off('mousemove'),
          T3Gv.optManager.lineStamp = !1
        ),
        T3Gv.optManager.fromOverlayLayer &&
        (
          T3Gv.optManager.fromOverlayLayer = !1,
          gBusinessController.CompleteAction(this.BlockID, r)
        )
    } catch (e) {
      T3Gv.optManager.CancelModalOperation();
      this.LM_DrawClick_ExceptionCleanup(e);
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  LM_DrawPreTrack(e) {
    var t,
      a,
      r,
      i = {},
      n = [
        {
          x: 0,
          y: 0
        }
      ],
      o = this.AllowLink();
    return t = this.GetHookFlags(),
      o ? (
        T3Gv.optManager.LinkParams = new LinkParameters(),
        (
          a = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1)
        ) &&
        (
          T3Gv.optManager.fromOverlayLayer ||
          (
            T3Gv.optManager.LinkParams.AllowJoin = a.flags & ConstantData.SessionFlags.SEDS_FreeHand
          )
        ),
        t & ConstantData.HookFlags.SED_LC_CHook &&
        (
          n[0].id = ConstantData.HookPts.SED_KTL,
          n[0].x = e.x,
          n[0].y = e.y,
          T3Gv.optManager.dragDeltaX = 0,
          T3Gv.optManager.dragDeltaY = 0,
          r = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLinksBlockID, !1),
          T3Gv.optManager.FindConnect(
            T3Gv.optManager.actionStoredObjectId,
            this,
            n,
            !1,
            !1,
            T3Gv.optManager.LinkParams.AllowJoin,
            e
          ) ? (
            T3Gv.optManager.LinkParams.SConnectIndex = T3Gv.optManager.LinkParams.ConnectIndex,
            T3Gv.optManager.LinkParams.SConnectHookFlag = T3Gv.optManager.LinkParams.ConnectHookFlag,
            T3Gv.optManager.LinkParams.SConnectInside = T3Gv.optManager.LinkParams.ConnectInside,
            T3Gv.optManager.LinkParams.SConnectPt.x = T3Gv.optManager.LinkParams.ConnectPt.x,
            T3Gv.optManager.LinkParams.SConnectPt.y = T3Gv.optManager.LinkParams.ConnectPt.y,
            T3Gv.optManager.LinkParams.ConnectIndex = - 1,
            T3Gv.optManager.LinkParams.Hookindex = - 1,
            T3Gv.optManager.LinkParams.ConnectInside = 0,
            T3Gv.optManager.LinkParams.ConnectHookFlag = 0,
            e.x += T3Gv.optManager.dragDeltaX,
            e.y += T3Gv.optManager.dragDeltaY,
            this.StartPoint.x += T3Gv.optManager.dragDeltaX,
            this.StartPoint.y += T3Gv.optManager.dragDeltaY,
            this.EndPoint.x = this.StartPoint.x,
            this.EndPoint.y = this.StartPoint.y,
            T3Gv.optManager.LinkParams.lpCircList = T3Gv.optManager.GetHookList(
              r,
              T3Gv.optManager.LinkParams.lpCircList,
              T3Gv.optManager.LinkParams.SConnectIndex,
              this,
              ConstantData.ListCodes.SED_LC_TARGONLY,
              i
            )
          ) : T3Gv.optManager.LinkParams.JoinIndex >= 0 &&
          (
            T3Gv.optManager.LinkParams.SJoinIndex = T3Gv.optManager.LinkParams.JoinIndex,
            T3Gv.optManager.LinkParams.SJoinData = T3Gv.optManager.LinkParams.JoinData,
            T3Gv.optManager.LinkParams.SJoinSourceData = T3Gv.optManager.LinkParams.JoinSourceData,
            T3Gv.optManager.LinkParams.SConnectPt.x = T3Gv.optManager.LinkParams.ConnectPt.x,
            T3Gv.optManager.LinkParams.SConnectPt.y = T3Gv.optManager.LinkParams.ConnectPt.y,
            T3Gv.optManager.LinkParams.JoinIndex = - 1,
            T3Gv.optManager.LinkParams.JoinData = 0,
            T3Gv.optManager.LinkParams.JoinSourceData = 0,
            T3Gv.optManager.LinkParams.lpCircList = T3Gv.optManager.GetHookList(
              r,
              T3Gv.optManager.LinkParams.lpCircList,
              T3Gv.optManager.LinkParams.SJoinIndex,
              this,
              ConstantData.ListCodes.SED_LC_CIRCTARG,
              i
            )
          )
        )
      ) : (
        a = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1)
      ) &&
      (
        // this instanceof ListManager.PolyLine ||
        // Double === TODO
        // this instanceof GlobalDataShape.PolyLine ||
        this instanceof Instance.Shape.PolyLine ||
        a.flags & ConstantData.SessionFlags.SEDS_FreeHand
      ) &&
      (
        T3Gv.optManager.LinkParams = new LinkParameters(),
        T3Gv.optManager.LinkParams.ArraysOnly = !0,
        T3Gv.optManager.LinkParams.AllowJoin = a.flags & ConstantData.SessionFlags.SEDS_FreeHand
      ),
      !0
  }

  // LM_DrawDuringTrack(e) { }

  LM_DrawDuringTrack(e) {
    console.log('2 LM_DrawDuringTrack e=>', e);

    var t,
      a,
      r = [
        {
          x: 0,
          y: 0
        }
      ],
      i = !1;
    return null == T3Gv.optManager.LinkParams ||
      (
        r[0].x = e.x,
        r[0].y = e.y,
        r[0].id = ConstantData.HookPts.SED_KTR,
        T3Gv.optManager.dragDeltaX = 0,
        T3Gv.optManager.dragDeltaY = 0,
        T3Gv.optManager.FindConnect(
          T3Gv.optManager.actionStoredObjectId,
          this,
          r,
          !0,
          !1,
          T3Gv.optManager.LinkParams.AllowJoin,
          e
        ) &&
        (
          e.x += T3Gv.optManager.dragDeltaX,
          e.y += T3Gv.optManager.dragDeltaY
        ),
        T3Gv.optManager.LinkParams.SJoinIndex >= 0 &&
        T3Gv.optManager.LinkParams.JoinIndex < 0 &&
        (
          // (
          //   t = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.LinkParams.SJoinIndex)
          // ) instanceof PolyLine &&
          this.checkIfPolyLine(t = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.LinkParams.SJoinIndex)) &&
          (
            (a = new HitResult(- 1, 0, null)).hitcode = t.Hit(e, !1, !0, a),
            a &&
            a.hitcode === ConstantData.HitCodes.SED_PLApp &&
            T3Gv.optManager.LinkParams.SJoinData != a.segment &&
            (i = !0)
          ),
          i ? (
            T3Gv.optManager.LinkParams.JoinIndex = t.BlockID,
            T3Gv.optManager.LinkParams.JoinData = a.segment,
            T3Gv.optManager.LinkParams.HiliteJoin < 0 &&
            (
              T3Gv.optManager.LinkParams.hiliteJoin = t.BlockID,
              T3Gv.optManager.GetEditMode() != ConstantData.EditState.LINKJOIN &&
              (
                T3Gv.optManager.SetEditMode(ConstantData.EditState.LINKJOIN, null, !1),
                t.SetCursors(),
                T3Gv.optManager.SetEditMode(ConstantData.EditState.LINKJOIN, null, !1)
              )
            )
          ) : (
            T3Gv.optManager.LinkParams.HiliteJoin >= 0 &&
            (
              T3Gv.optManager.HiliteConnect(
                T3Gv.optManager.LinkParams.HiliteJoin,
                T3Gv.optManager.LinkParams.ConnectPt,
                !1,
                !0,
                this.BlockID,
                null
              ),
              T3Gv.optManager.LinkParams.HiliteJoin = - 1
            ),
            T3Gv.optManager.SetEditMode(ConstantData.EditState.DEFAULT)
          )
        )
      ),
      e
  }

  LM_DrawPostRelease(e) {
    if (null != T3Gv.optManager.LinkParams) {
      if (
        T3Gv.optManager.LinkParams.SHiliteConnect >= 0 &&
        (
          T3Gv.optManager.HiliteConnect(
            T3Gv.optManager.LinkParams.SHiliteConnect,
            T3Gv.optManager.LinkParams.SConnectPt,
            !1,
            !1,
            this.BlockID,
            T3Gv.optManager.LinkParams.SHiliteInside
          ),
          T3Gv.optManager.LinkParams.SHiliteConnect = - 1,
          T3Gv.optManager.LinkParams.SHiliteInside = null
        ),
        T3Gv.optManager.LinkParams.HiliteConnect >= 0 &&
        (
          T3Gv.optManager.HiliteConnect(
            T3Gv.optManager.LinkParams.HiliteConnect,
            T3Gv.optManager.LinkParams.ConnectPt,
            !1,
            !1,
            this.BlockID,
            T3Gv.optManager.LinkParams.HiliteInside
          ),
          T3Gv.optManager.LinkParams.HiliteConnect = - 1,
          T3Gv.optManager.LinkParams.HiliteInside = null
        ),
        T3Gv.optManager.LinkParams.SHiliteJoin >= 0 &&
        (
          T3Gv.optManager.HiliteConnect(
            T3Gv.optManager.LinkParams.SHiliteJoin,
            T3Gv.optManager.LinkParams.SConnectPt,
            !1,
            !0,
            this.BlockID,
            null
          ),
          T3Gv.optManager.LinkParams.SHiliteJoin = - 1
        ),
        T3Gv.optManager.LinkParams.HiliteJoin >= 0 &&
        (
          T3Gv.optManager.HiliteConnect(
            T3Gv.optManager.LinkParams.HiliteJoin,
            T3Gv.optManager.LinkParams.ConnectPt,
            !1,
            !0,
            this.BlockID,
            null
          ),
          T3Gv.optManager.LinkParams.HiliteJoin = - 1
        ),
        T3Gv.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
        T3Gv.optManager.LinkParams.SJoinIndex >= 0
      ) {
        var t = T3Gv.optManager.PolyLJoin(
          T3Gv.optManager.LinkParams.SJoinIndex,
          T3Gv.optManager.LinkParams.SJoinData,
          e,
          T3Gv.optManager.LinkParams.SJoinSourceData,
          !1
        );
        if (
          t != e &&
          t >= 0 &&
          (
            e = t,
            T3Gv.optManager.LinkParams.ConnectIndex >= 0 &&
            (T3Gv.optManager.LinkParams.ConnectIndex = - 1),
            T3Gv.optManager.LinkParams.JoinIndex
          )
        ) {
          var a = T3Gv.optManager.GetObjectPtr(t, !1);
          Utils2.EqualPt(this.EndPoint, a.StartPoint) ? T3Gv.optManager.LinkParams.JoinSourceData = 1 : T3Gv.optManager.LinkParams.JoinSourceData = 2
        }
      } else T3Gv.optManager.LinkParams &&
        T3Gv.optManager.LinkParams.SConnectIndex >= 0 &&
        (
          T3Gv.optManager.LinkParams.SConnectIndex = T3Gv.optManager.SD_GetVisioTextParent(T3Gv.optManager.LinkParams.SConnectIndex),
          T3Gv.optManager.UpdateHook(
            e,
            - 1,
            T3Gv.optManager.LinkParams.SConnectIndex,
            ConstantData.HookPts.SED_KTL,
            T3Gv.optManager.LinkParams.SConnectPt,
            T3Gv.optManager.LinkParams.SConnectInside
          )
        );
      var r = !1;
      return T3Gv.optManager.LinkParams.JoinIndex >= 0 ? r = - 2 == T3Gv.optManager.PolyLJoin(
        T3Gv.optManager.LinkParams.JoinIndex,
        T3Gv.optManager.LinkParams.JoinData,
        e,
        T3Gv.optManager.LinkParams.JoinSourceData,
        !1
      ) : T3Gv.optManager.LinkParams &&
      T3Gv.optManager.LinkParams.ConnectIndex >= 0 &&
      T3Gv.optManager.UpdateHook(
        e,
        T3Gv.optManager.LinkParams.InitialHook,
        T3Gv.optManager.LinkParams.ConnectIndex,
        T3Gv.optManager.LinkParams.HookIndex,
        T3Gv.optManager.LinkParams.ConnectPt,
        T3Gv.optManager.LinkParams.ConnectInside
      ),
        this.hookflags = Utils2.SetFlag(
          this.hookflags,
          ConstantData.HookFlags.SED_LC_NoContinuous,
          !1
        ),
        T3Gv.optManager.UpdateLinks(),
        T3Gv.optManager.LinkParams = null,
        r
    }
  }

  // LM_DrawClick_ExceptionCleanup(e) {
  //   T3Gv.optManager.unbindActionClickHammerEvents();
  //   T3Gv.optManager.lineStamp &&
  //     (
  //       T3Gv.optManager.isMobilePlatform ||
  //       T3Gv.optManager.WorkAreaHammer &&
  //       T3Gv.optManager.WorkAreaHammer.off('mousemove'),
  //       T3Gv.optManager.lineStamp = !1
  //     ),
  //     T3Gv.optManager.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick),
  //     this.ResetAutoScrollTimer(),
  //     T3Gv.optManager.LinkParams = null,
  //     T3Gv.optManager.actionStoredObjectId = - 1,
  //     T3Gv.optManager.actionSvgObject = null,
  //     T3Gv.optManager.lineStamp = !1,
  //     T3Gv.optManager.fromOverlayLayer = !1,
  //     T3Gv.optManager.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDragStart),
  //     Collab.UnBlockMessages()
  // }


  LM_DrawClick_ExceptionCleanup(e) {
    T3Gv.optManager.unbindActionClickHammerEvents();

    if (T3Gv.optManager.lineStamp) {
      if (!T3Gv.optManager.isMobilePlatform && T3Gv.optManager.WorkAreaHammer) {
        T3Gv.optManager.WorkAreaHammer.off('mousemove');
      }
      T3Gv.optManager.lineStamp = false;
    }

    T3Gv.optManager.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick);
    this.ResetAutoScrollTimer();
    T3Gv.optManager.LinkParams = null;
    T3Gv.optManager.actionStoredObjectId = -1;
    T3Gv.optManager.actionSvgObject = null;
    T3Gv.optManager.lineStamp = false;
    T3Gv.optManager.fromOverlayLayer = false;
    T3Gv.optManager.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDragStart);
    // Collab.UnBlockMessages();
  }


  LM_DrawClick(docCorX, docCorY) {

    //docCorX, docCorY

    console.log('3 ========= LM_DrawClick 1 draw click e=>', docCorX, docCorY);

    try {
      this.Frame.x = docCorX;
      this.Frame.y = docCorY;
      this.StartPoint = { x: docCorX, y: docCorY };
      this.EndPoint = { x: docCorX, y: docCorY };
      T3Gv.optManager.WorkAreaHammer.on('drag', EvtUtil.Evt_DrawTrackHandlerFactory(this));
      T3Gv.optManager.WorkAreaHammer.on('dragend', EvtUtil.Evt_DrawReleaseHandlerFactory(this));
      T3Gv.optManager.WorkAreaHammer.off('tap');
    } catch (error) {

      console.log('3 ========= LM_DrawClick 2 eRRdraw click e=>', error);

      this.LM_DrawClick_ExceptionCleanup(error);
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }
  }

  WriteSDFAttributes(e, t) {
    var a = 0,
      r = - 1;
    if (this.DataID >= 0) {
      switch (SDF.TextAlignToWin(this.TextAlign).vjust) {
        case FileParser.TextJust.TA_TOP:
        case FileParser.TextJust.TA_BOTTOM:
      }
      a = ConstantData.TextFlags.SED_TF_AttachC,
        this.LineTextX &&
        (a = ConstantData.TextFlags.SED_TF_AttachC),
        this.TextFlags = Utils2.SetFlag(
          this.TextFlags,
          ConstantData.TextFlags.SED_TF_AttachA | ConstantData.TextFlags.SED_TF_AttachB | ConstantData.TextFlags.SED_TF_AttachC | ConstantData.TextFlags.SED_TF_AttachD,
          !1
        ),
        this.TextFlags = Utils2.SetFlag(this.TextFlags, a, !0),
        this.TextFlags = Utils2.SetFlag(
          this.TextFlags,
          ConstantData.TextFlags.SED_TF_HorizText,
          !this.TextDirection
        )
    } (t.WriteBlocks || t.WriteVisio) &&
      (r = this.DataID),
      t.WriteVisio &&
      this.polylist &&
      ListManager.PolyLine.prototype.WriteSDFAttributes.call(this, e, t, !1),
      SDF.WriteTextParams(e, this, r, t),
      t.WriteVisio &&
      r >= 0 &&
      SDF.WriteText(e, this, null, null, !1, t),
      SDF.WriteArrowheads(e, t, this)
  }

  ChangeBackgroundColor(e, t) {
    if (
      this.StyleRecord.Fill.Paint.FillType !== ConstantData.FillTypes.SDFILL_TRANSPARENT &&
      this.StyleRecord.Fill.Paint.Color == t
    ) {
      T3Gv.optManager.GetObjectPtr(this.BlockID, !0);
      this.StyleRecord.Fill.Paint.Color = e
    }
  }

  ResizeInTextEdit(e, t) {
    return {
      x: 0,
      y: 0
    }
  }

  CalcTextPosition(e) {
    var t,
      a,
      r,
      i = [];
    r = {
      x: e.Frame.x + e.Frame.width / 2,
      y: e.Frame.y + e.Frame.height / 2
    },
      i.push({
        x: this.StartPoint.x,
        y: this.StartPoint.y
      }),
      i.push({
        x: this.EndPoint.x,
        y: this.EndPoint.y
      });
    var n = {
      x: this.Frame.x + this.Frame.width / 2,
      y: this.Frame.y + this.Frame.height / 2
    },
      o = this.GetAngle(null),
      s = e.RotationAngle;
    this.LineType === ConstantData.LineType.LINE &&
      (s = o + s, s %= 180, Math.abs(s) < 1 && (s = 0)),
      t = this.EndPoint.x - this.StartPoint.x,
      a = this.EndPoint.y - this.StartPoint.y;
    var l = o % 180;
    !1 === Utils2.IsEqual(l, 0) &&
      0 === s &&
      (
        this.TextFlags = Utils2.SetFlag(
          this.TextFlags,
          ConstantData.TextFlags.SED_TF_HorizText,
          !0
        )
      );
    var S = Math.sqrt(t * t + a * a);
    this.TextWrapWidth = S;
    var c = - o * ConstantData.Geometry.PI / 180;
    Utils3.RotatePointsAboutPoint(n, c, i),
      this.LineTextX = (r.x - i[0].x) / S,
      this.LineTextX < 0 &&
      (this.LineTextX = 1 + this.LineTextX),
      this.LineTextY = r.y - i[0].y,
      this.LineTextX &&
      (this.trect = $.extend(!0, {
      }, e.trect))
  }

  SetTextObject(e) {
    this.DataID = e;
    var t = SDF.TextAlignToWin(this.TextAlign),
      a = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
    return this.StyleRecord.Fill.Paint.Color = a.background.Paint.Color,
      t.vjust === FileParser.TextJust.TA_CENTER ? (
        this.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID,
        this.StyleRecord.Fill.Paint.Opacity = 1
      ) : this.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
      !0
  }

  GetTextOnLineParams(e) {

    // Double === TODO
    var t = {
      Frame: new Rect(),
      StartPoint: new Point(),
      EndPoint: new Point()
    };
    return t.StartPoint.x = this.StartPoint.x,
      t.StartPoint.y = this.StartPoint.y,
      t.EndPoint.x = this.EndPoint.x,
      t.EndPoint.y = this.EndPoint.y,
      t.Frame = Utils2.Pt2Rect(t.StartPoint, t.EndPoint),
      0 !== this.LineTextX &&
      (t.CenterProp = this.LineTextX, t.Displacement = this.LineTextY),
      t
  }

  TextDirectionCommon(e, t, a, r) {
    var i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p = e.GetTextMinDimensions(),
      d = p.width,
      D = this.GetTextOnLineParams(r),
      g = D.StartPoint.x,
      h = D.Frame.x,
      m = D.EndPoint.x,
      C = p.height,
      y = D.StartPoint.y,
      f = D.Frame.y,
      L = D.EndPoint.y,
      I = T3Gv.optManager.SD_GetClockwiseAngleBetween2PointsInRadians(D.StartPoint, D.EndPoint),
      T = I * (180 / ConstantData.Geometry.PI),
      b = !1,
      M = 0.5,
      P = {},
      R = 0,
      A = 0;
    if (
      e.SetVerticalAlignment('top'),
      this.linetrect = $.extend(!0, {
      }, this.Frame),
      this.LineTextY &&
      (R = this.LineTextY * Math.cos(I), A = - this.LineTextY * Math.sin(I)),
      this.VisioRotationDiff &&
      (T -= this.VisioRotationDiff),
      T > 90 &&
      T < 270 &&
      (T -= 180, b = !0),
      !a &&
      this.TextDirection ||
      (I = 0, T = 0, i = this.TextAlign, s = this.TextDirection),
      this.LineTextX ||
      this.LineTextY
    ) {
      if (p) {
        this.theMinTextDim.width = p.width,
          this.theMinTextDim.height = p.height,
          a &&
          (this.TextAlign = i);
        var _ = SDF.TextAlignToJust(this.TextAlign);
        if (b && (T += 180, this.LineType === ConstantData.LineType.LINE)) switch (_.just) {
          case ConstantData.TextAlign.LEFT:
            _.just = ConstantData.TextAlign.RIGHT;
            break;
          case ConstantData.TextAlign.RIGHT:
            _.just = ConstantData.TextAlign.LEFT
        }
        t &&
          t.SetSize(d + 2, C + 2),
          c = g + (m - g) * (M = D.CenterProp) - h + A,
          u = y + (L - y) * M - f + R,
          0 === this.trect.height &&
          (this.trect.height = 3 * C);
        var E = C;
        this.trect.height > C &&
          (E = this.trect.height),
          n = this.TextGrow === ConstantData.TextGrowBehavior.HORIZONTAL ? c - p.width / 2 : c - this.trect.width / 2,
          o = u - E / 2,
          e.SetPos(n, o),
          e.SetVerticalAlignment(_.vjust),
          e.SetParagraphAlignment(_.just),
          this.TextDirection ? e.SetRotation(T, c, u) : e.SetRotation(0, c, u),
          P = {
            x: c,
            y: u
          };
        var w = {};
        switch (_.just) {
          case ConstantData.TextAlign.LEFT:
            w.x = n - 1;
            break;
          case ConstantData.TextAlign.RIGHT:
            w.x = n - 1 + this.trect.width - d;
            break;
          default:
            w.x = c - d / 2 - 1
        }
        switch (_.vjust) {
          case 'top':
            w.y = u - 1 - E / 2;
            break;
          case 'bottom':
            w.y = u - C / 2 - 1 + E / 2;
            break;
          default:
            w.y = u - C / 2 - 1
        }
        t &&
          t.SetPos(w.x, w.y),
          this.linetrect.x = w.x,
          this.linetrect.y = w.y,
          this.linetrect.width = d + 2,
          this.linetrect.height = C + 2,
          this.TextDirection ? (
            t &&
            t.SetRotation(T, c, u),
            this.linetrect = T3Gv.optManager.RotateRect(this.linetrect, P, T)
          ) : t &&
          t.SetRotation(0, c, u),
          this.UpdateFrame()
      }
    } else if (p) {
      switch (
      this.theMinTextDim.width = p.width,
      this.theMinTextDim.height = p.height,
      t.SetSize(d + 2, C + 2),
      this.TextAlign
      ) {
        case ConstantData.TextAlign.TOPLEFT:
          l = g - h + d / 2 * Math.cos(I),
            S = y - f + d / 2 * Math.sin(I),
            t.SetPos(l - d / 2 - 1, S - C - this.StyleRecord.Line.Thickness / 2 - 2),
            n = l - d / 2,
            o = S - C - this.StyleRecord.Line.Thickness / 2 - 1,
            e.SetPos(l - d / 2, S - C - this.StyleRecord.Line.Thickness / 2 - 1),
            e.SetRotation(T, l, S),
            P = {
              x: l,
              y: S
            },
            t.SetRotation(T, l, S),
            this.TextGrow === ConstantData.TextGrowBehavior.VERTICAL &&
            (b = !1),
            b ? e.SetParagraphAlignment(ConstantData.TextAlign.RIGHT) : e.SetParagraphAlignment(ConstantData.TextAlign.LEFT);
          break;
        case ConstantData.TextAlign.LEFT:
          l = g - h + d / 2 * Math.cos(I),
            S = y - f + d / 2 * Math.sin(I),
            t.SetPos(l - d / 2 - 1, S - C / 2 - 1),
            n = l - d / 2,
            o = S - C / 2,
            e.SetPos(l - d / 2, S - C / 2),
            e.SetRotation(T, l, S),
            P = {
              x: l,
              y: S
            },
            t.SetRotation(T, l, S),
            this.TextGrow === ConstantData.TextGrowBehavior.VERTICAL &&
            (b = !1),
            b ? e.SetParagraphAlignment(ConstantData.TextAlign.RIGHT) : e.SetParagraphAlignment(ConstantData.TextAlign.LEFT);
          break;
        case ConstantData.TextAlign.BOTTOMLEFT:
          l = g - h + d / 2 * Math.cos(I),
            S = y - f + d / 2 * Math.sin(I),
            t.SetPos(l - d / 2 - 1, S + this.StyleRecord.Line.Thickness / 2 + 1),
            n = l - d / 2,
            o = S + this.StyleRecord.Line.Thickness / 2 + 2,
            e.SetPos(l - d / 2, S + this.StyleRecord.Line.Thickness / 2 + 2),
            t.SetRotation(T, l, S),
            e.SetRotation(T, l, S),
            this.TextGrow === ConstantData.TextGrowBehavior.VERTICAL &&
            (b = !1),
            b ? e.SetParagraphAlignment(ConstantData.TextAlign.RIGHT) : e.SetParagraphAlignment(ConstantData.TextAlign.LEFT),
            P = {
              x: l,
              y: S
            };
          break;
        case ConstantData.TextAlign.TOPCENTER:
          c = (g + m) / 2 - h,
            u = (y + L) / 2 - f,
            t.SetPos(c - d / 2 - 2, u - C - this.StyleRecord.Line.Thickness / 2 - 2),
            n = c - d / 2 - 1,
            o = u - C - this.StyleRecord.Line.Thickness / 2 - 1,
            this.TextGrow === ConstantData.TextGrowBehavior.VERTICAL ? (
              D.CenterProp &&
              (this.trect.x = h + c - this.trect.width / 2),
              n = this.trect.x - h,
              e.SetPos(n, o),
              e.SetRotation(T, n + this.trect.width / 2, u),
              P = {
                x: n + this.trect.width / 2,
                y: u
              }
            ) : (
              e.SetPos(c - d / 2 - 1, u - C - this.StyleRecord.Line.Thickness / 2 - 1),
              e.SetRotation(T, c, u),
              P = {
                x: c,
                y: u
              }
            ),
            t.SetRotation(T, c, u),
            e.SetParagraphAlignment(ConstantData.TextAlign.CENTER),
            P = {
              x: c,
              y: u
            };
          break;
        case ConstantData.TextAlign.CENTER:
          D.CenterProp &&
            (M = D.CenterProp),
            c = g + (m - g) * M - h + A,
            u = y + (L - y) * M - f + R,
            t.SetPos(c - d / 2 - 1, u - C / 2 - 1),
            n = c - d / 2,
            o = u - C / 2,
            this.TextGrow === ConstantData.TextGrowBehavior.VERTICAL ? (
              D.CenterProp &&
              (this.trect.x = h + c - this.trect.width / 2),
              n = this.trect.x - h,
              e.SetPos(n, o),
              e.SetRotation(T, n + this.trect.width / 2, u),
              P = {
                x: n + this.trect.width / 2,
                y: u
              }
            ) : (e.SetPos(n, o), e.SetRotation(T, c, u), P = {
              x: c,
              y: u
            }),
            t.SetRotation(T, c, u),
            e.SetParagraphAlignment(ConstantData.TextAlign.CENTER);
          break;
        case ConstantData.TextAlign.BOTTOMCENTER:
          c = (g + m) / 2 - h,
            u = (y + L) / 2 - f,
            t.SetPos(c - d / 2 - 1, u + this.StyleRecord.Line.Thickness / 2 + 1),
            n = c - d / 2,
            o = u + this.StyleRecord.Line.Thickness / 2 + 2,
            this.TextGrow === ConstantData.TextGrowBehavior.VERTICAL ? (
              D.CenterProp &&
              (this.trect.x = h + c - this.trect.width / 2),
              n = this.trect.x - h,
              e.SetPos(n, o),
              e.SetRotation(T, n + this.trect.width / 2, u),
              P = {
                x: n + this.trect.width / 2,
                y: u
              }
            ) : (
              e.SetPos(c - d / 2, u + this.StyleRecord.Line.Thickness / 2 + 2),
              e.SetRotation(T, c, u),
              P = {
                x: c,
                y: u
              }
            ),
            t.SetRotation(T, c, u),
            e.SetParagraphAlignment(ConstantData.TextAlign.CENTER);
          break;
        case ConstantData.TextAlign.TOPRIGHT:
          M = 1,
            D.CenterProp &&
            (M = D.CenterProp),
            l = (m - h) * M - d / 2 * Math.cos(I) + A,
            S = (L - f) * M - d / 2 * Math.sin(I) + R,
            t.SetPos(l - d / 2 - 1, S - C - this.StyleRecord.Line.Thickness / 2 - 2),
            n = l - d / 2,
            o = S - C - this.StyleRecord.Line.Thickness / 2 - 1,
            this.TextGrow === ConstantData.TextGrowBehavior.VERTICAL ? (
              M = 1,
              D.CenterProp &&
              (M = D.CenterProp),
              n = (m - h) * M - this.trect.width / 2 * Math.cos(I) + A,
              o = (L - f) * M - this.trect.width / 2 * Math.sin(I) + R,
              e.SetPos(n - this.trect.width / 2, o - C),
              e.SetRotation(T, n, o),
              P = {
                x: n,
                y: o
              }
            ) : (
              e.SetPos(l - d / 2, S - C - this.StyleRecord.Line.Thickness / 2 - 1),
              e.SetRotation(T, l, S),
              P = {
                x: l,
                y: S
              }
            ),
            t.SetRotation(T, l, S),
            b ? e.SetParagraphAlignment(ConstantData.TextAlign.LEFT) : e.SetParagraphAlignment(ConstantData.TextAlign.RIGHT),
            P = {
              x: l,
              y: S
            };
          break;
        case ConstantData.TextAlign.RIGHT:
          M = 1,
            D.CenterProp &&
            (M = D.CenterProp),
            l = (m - h) * M - d / 2 * Math.cos(I) + A,
            S = (L - f) * M - d / 2 * Math.sin(I) + R,
            t.SetPos(l - d / 2 - 1, S - C / 2 - 1),
            n = l - d / 2,
            o = S - C / 2,
            this.TextGrow === ConstantData.TextGrowBehavior.VERTICAL ? (
              M = 1,
              D.CenterProp &&
              (M = D.CenterProp),
              n = (m - h) * M - this.trect.width / 2 * Math.cos(I) + A,
              o = (L - f) * M - this.trect.width / 2 * Math.sin(I) + R,
              e.SetPos(n - this.trect.width / 2, o - C / 2),
              e.SetRotation(T, n, o),
              P = {
                x: n,
                y: o
              }
            ) : (e.SetPos(l - d / 2, S - C / 2), e.SetRotation(T, l, S), P = {
              x: l,
              y: S
            }),
            t.SetRotation(T, l, S),
            b ? e.SetParagraphAlignment(ConstantData.TextAlign.LEFT) : e.SetParagraphAlignment(ConstantData.TextAlign.RIGHT);
          break;
        case ConstantData.TextAlign.BOTTOMRIGHT:
          l = m - h - d / 2 * Math.cos(I),
            S = L - f - d / 2 * Math.sin(I),
            t.SetPos(l - d / 2 - 1, S + this.StyleRecord.Line.Thickness / 2 + 1),
            n = l - d / 2,
            o = S + this.StyleRecord.Line.Thickness / 2 + 2,
            this.TextGrow === ConstantData.TextGrowBehavior.VERTICAL ? (
              M = 1,
              D.CenterProp &&
              (M = D.CenterProp),
              n = (m - h) * M - this.trect.width / 2 * Math.cos(I) + A,
              o = (L - f) * M - this.trect.width / 2 * Math.sin(I) + R,
              e.SetPos(n - this.trect.width / 2, o + this.StyleRecord.Line.Thickness / 2 + 2),
              e.SetRotation(T, n, o),
              P = {
                x: n,
                y: o
              }
            ) : (
              e.SetPos(l - d / 2, S + this.StyleRecord.Line.Thickness / 2 + 2),
              e.SetRotation(T, l, S),
              P = {
                x: l,
                y: S
              }
            ),
            t.SetRotation(T, l, S),
            b ? e.SetParagraphAlignment(ConstantData.TextAlign.LEFT) : e.SetParagraphAlignment(ConstantData.TextAlign.RIGHT)
      }
      this.linetrect.x = n + this.Frame.x,
        this.linetrect.y = o + this.Frame.y,
        this.linetrect.width = d,
        this.linetrect.height = C,
        P.x += this.Frame.x,
        P.y += this.Frame.y;
      $.extend(!0, {
      }, this.linetrect);
      this.linetrect = T3Gv.optManager.RotateRect(this.linetrect, P, T);
      var F = $.extend(!0, {
      }, this.linetrect);
      T3Gv.optManager.TextPinFrame(this.linetrect, C),
        this.linetrect.x != F.x ||
        (this.linetrect.y, F.y),
        this.linetrect.x -= this.Frame.x,
        this.linetrect.y -= this.Frame.y,
        this.UpdateFrame()
    }
    a &&
      (this.TextDirection = s, this.TextAlign = i)
  }

  LM_AddSVGTextObject(e, t) {
    this.Frame;
    var a,
      r,
      i,
      n = this.trect,
      o = e.CreateShape(Document.CreateShapeType.RECT);
    o.SetID(ConstantData.SVGElementClass.TEXTBACKGROUND),
      o.SetStrokeWidth(0);
    var s = this.StyleRecord.Fill.Paint.Color;
    o.SetFillColor(s),
      this.StyleRecord.Fill.Paint.FillType === ConstantData.FillTypes.SDFILL_TRANSPARENT ? o.SetOpacity(0) : o.SetOpacity(this.StyleRecord.Fill.Paint.Opacity);
    var l = e.CreateShape(Document.CreateShapeType.TEXT);
    l.SetID(ConstantData.SVGElementClass.TEXT),
      l.SetRenderingEnabled(!1),
      l.SetSize(n.width, n.height),
      l.SetSpellCheck(this.AllowSpell()),
      l.InitDataSettings(this.fieldDataTableID, this.fieldDataElemID),
      t.isText = !0,
      t.textElem = l;
    var S = T3Gv.objectStore.GetObject(this.DataID);
    if (
      S.Data.runtimeText ? l.SetRuntimeText(S.Data.runtimeText) : (
        l.SetText(''),
        l.SetParagraphAlignment(this.TextAlign),
        l.SetVerticalAlignment('top')
      ),
      S.Data.runtimeText ||
      (S.Data.runtimeText = l.GetRuntimeText()),
      this.TextGrow !== ConstantData.TextGrowBehavior.VERTICAL &&
      l.SetConstraints(T3Gv.optManager.theContentHeader.MaxWorkDim.x, 0, n.height),
      this.bInGroup &&
      l.DisableHyperlinks(!0),
      l.SetRenderingEnabled(!0),
      r = (a = l.GetTextMinDimensions()).height,
      this.TextDirection &&
      this.StyleRecord.Line.Thickness >= a.height &&
      o &&
      (s = this.StyleRecord.Line.Paint.Color, o.SetOpacity(0)),
      this.LineTextY ||
      this.LineTextX
    ) switch (SDF.TextAlignToWin(this.TextAlign).vjust) {
      case FileParser.TextJust.TA_TOP:
        i = this.trect.height / 2 - r / 2 + this.LineTextY;
        break;
      case FileParser.TextJust.TA_BOTTOM:
        i = - this.trect.height / 2 + r / 2 + this.LineTextY;
        break;
      default:
        i = this.LineTextY
    }
    Math.abs(i),
      o &&
      t.AddElement(o),
      t.AddElement(l),
      this.TextDirectionCommon(l, o, !1, null),
      l.SetEditCallback(T3Gv.optManager.TextCallback, t)
  }

  LM_ResizeSVGTextObject(e, t, a) {
    if (- 1 != t.DataID) {
      var r = e.GetElementByID(ConstantData.SVGElementClass.TEXTBACKGROUND),
        i = e.GetElementByID(ConstantData.SVGElementClass.TEXT);
      i &&
        t.TextDirectionCommon(i, r, !1, null)
    }
  }

  AdjustTextEditBackground(e, t) {
    if (- 1 != this.DataID) {
      if (t) var a = t;
      else a = T3Gv.optManager.svgObjectLayer.GetElementByID(e);
      var r = a.GetElementByID(ConstantData.SVGElementClass.TEXTBACKGROUND),
        i = a.GetElementByID(ConstantData.SVGElementClass.TEXT);
      if (i) {
        var n = null == t;
        this.TextDirectionCommon(i, r, n, null)
      }
    }
  }

  AddCorner(e, t) {
  }

  SVGTokenizerHook(e) {
    return T3Gv.optManager.bTokenizeStyle &&
      (
        (e = Utils1.DeepCopy(e)).Fill.Paint.Color = Basic.Symbol.CreatePlaceholder(Basic.Symbol.Placeholder.SolidFill, e.Fill.Paint.Color),
        e.Line.Paint.Color = Basic.Symbol.CreatePlaceholder(Basic.Symbol.Placeholder.LineColor, e.Line.Paint.Color),
        0 === this.StartArrowID &&
        0 === this.EndArrowID &&
        (
          e.Line.Thickness = Basic.Symbol.CreatePlaceholder(Basic.Symbol.Placeholder.LineThick, e.Line.Thickness)
        )
      ),
      e
  }

  GetDimensionPoints() {
    var e = [];
    var t = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
    e.push(
      new Point(this.StartPoint.x - t.x, this.StartPoint.y - t.y)
    );
    e.push(
      new Point(this.EndPoint.x - t.x, this.EndPoint.y - t.y)
    );
    return e;
  }

  PostCreateShapeCallback(svgDoc, shapeContainer, a, r) {

    console.log('= S.BaseLine PostCreateShapeCallback svgDoc, shapeContainer, a, r =>', svgDoc, shapeContainer, a, r);

    // e = _Document svgDoc
    // t = ShapeContainer
    // a =false

    // Double === TODO

    // var i = t.GetElementByID(ConstantData.SVGElementClass.SHAPE),
    //   n = t.GetElementByID(ConstantData.SVGElementClass.SLOP),
    //   o = ListManager.ArrowheadLookupTable[this.StartArrowID],
    //   s = ListManager.ArrowheadLookupTable[this.EndArrowID],
    //   l = ListManager.ArrowheadSizeTable[this.ArrowSizeIndex];
    // 0 === o.id &&
    //   (o = null),
    //   0 === s.id &&
    //   (s = null),
    //   (o || s) &&
    //   (
    //     i.SetArrowheads(o, l, s, l, this.StartArrowDisp, this.EndArrowDisp),
    //     n.SetArrowheads(o, l, s, l, this.StartArrowDisp, this.EndArrowDisp)
    //   ),
    //   this.DataID >= 0 &&
    //   this.LM_AddSVGTextObject(e, t),
    //   this.UpdateDimensionLines(t)




    var shapeElement = shapeContainer.GetElementByID(ConstantData.SVGElementClass.SHAPE);
    var slopElement = shapeContainer.GetElementByID(ConstantData.SVGElementClass.SLOP);
    var startArrow = ConstantData1.ArrowheadLookupTable[this.StartArrowID];
    var endArrow = ConstantData1.ArrowheadLookupTable[this.EndArrowID];
    var arrowSize = ConstantData1.ArrowheadSizeTable[this.ArrowSizeIndex];

    if (startArrow.id === 0) {
      startArrow = null;
    }
    if (endArrow.id === 0) {
      endArrow = null;
    }

    if (startArrow || endArrow) {
      shapeElement.SetArrowheads(startArrow, arrowSize, endArrow, arrowSize, this.StartArrowDisp, this.EndArrowDisp);
      slopElement.SetArrowheads(startArrow, arrowSize, endArrow, arrowSize, this.StartArrowDisp, this.EndArrowDisp);
    }

    if (this.DataID >= 0) {
      this.LM_AddSVGTextObject(svgDoc, shapeContainer);
    }

    //debugger;

    this.UpdateDimensionLines(shapeContainer, null);

    // Double === add a new function to show horizontal and vertical lines
    // fixed at start point and to the end of the viewport
    this.UpdateCoordinateLines(shapeContainer, null);

  }

  CreateActionTriggers(e, t, a, r) {
    var i = !0,
      theKnob,//Double =====
      n = e.CreateShape(Document.CreateShapeType.GROUP),
      o = ConstantData.Defines.SED_KnobSize,
      s = ConstantData.Defines.SED_RKnobSize;
    if (
      !(
        // this instanceof ListManager.Line &&
        // Double === TODO
        this instanceof Line &&
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
        (
          T3Gv.gBusinessManager &&
          T3Gv.gBusinessManager.IsAddingWalls &&
          T3Gv.gBusinessManager.IsAddingWalls() ||
          ConstantData.DocumentContext.UsingWallTool
        )
      )
    ) {
      var l = e.docInfo.docToScreenScale;
      e.docInfo.docScale <= 0.5 &&
        (l *= 2);
      var S = o / l,
        c = s / l;
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
        (S *= 2);
      var u = this.Frame,
        p = u.width,
        d = u.height,
        D = T3Gv.optManager.GetObjectPtr(t, !1);
      i = this.LineType != ConstantData.LineType.SEGLINE,
        p += S,
        d += S;
      var g = $.extend(!0, {
      }, u);
      g.x -= S / 2,
        g.y -= S / 2,
        g.width += S,
        g.height += S;
      var h,
        m = {
          svgDoc: e,
          shapeType: Document.CreateShapeType.RECT,
          knobSize: S,
          fillColor: 'black',
          fillOpacity: 1,
          strokeSize: 1,
          strokeColor: '#777777',
          cursorType: this.CalcCursorForSegment(this.StartPoint, this.EndPoint, !1),
          locked: !1
        };
      if (
        t != r &&
        (
          m.fillColor = 'white',
          m.strokeSize = 1,
          m.strokeColor = 'black',
          m.fillOpacity = 0
        ),
        this.flags & ConstantData.ObjFlags.SEDO_Lock ? (m.fillColor = 'gray', m.locked = !0) : this.NoGrow() &&
          (
            m.fillColor = 'red',
            m.strokeColor = 'red',
            m.cursorType = Element.CursorType.DEFAULT
          ),
        m.x = this.StartPoint.x - this.Frame.x,
        m.y = this.StartPoint.y - this.Frame.y,
        m.knobID = ConstantData.ActionTriggerType.LINESTART,
        D &&
        D.hooks
      ) for (h = 0; h < D.hooks.length; h++) if (D.hooks[h].hookpt == ConstantData.HookPts.SED_KTL) {
        m.shapeType = Document.CreateShapeType.OVAL,
          i = !1;
        break
      }
      if (
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
        (m.shapeType = Document.CreateShapeType.IMAGE),
        theKnob = this.GenericKnob(m),
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
        theKnob.SetURL &&
        (
          theKnob.SetURL(
            m.cursorType === Element.CursorType.NWSE_RESIZE ? ConstantData.Constants.FilePath_ImageKnobs + ConstantData.Constants.Knob_ExpandDiag1 : ConstantData.Constants.FilePath_ImageKnobs + ConstantData.Constants.Knob_ExpandDiag2
          ),
          theKnob.ExcludeFromExport(!0)
        ),
        n.AddElement(theKnob),
        m.shapeType = Document.CreateShapeType.RECT,
        D &&
        D.hooks
      ) for (h = 0; h < D.hooks.length; h++) if (D.hooks[h].hookpt == ConstantData.HookPts.SED_KTR) {
        m.shapeType = Document.CreateShapeType.OVAL,
          i = !1;
        break
      }
      if (
        m.x = this.EndPoint.x - this.Frame.x,
        m.y = this.EndPoint.y - this.Frame.y,
        m.knobID = ConstantData.ActionTriggerType.LINEEND,
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
        (m.shapeType = Document.CreateShapeType.IMAGE),
        theKnob = this.GenericKnob(m),
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
        theKnob.SetURL &&
        (
          theKnob.SetURL(
            m.cursorType === Element.CursorType.NWSE_RESIZE ? ConstantData.Constants.FilePath_ImageKnobs + ConstantData.Constants.Knob_ExpandDiag1 : ConstantData.Constants.FilePath_ImageKnobs + ConstantData.Constants.Knob_ExpandDiag2
          ),
          theKnob.ExcludeFromExport(!0)
        ),
        n.AddElement(theKnob),
        T3Gv.optManager.touchInitiated &&
        (i = !1),
        i &&
        !m.locked &&
        !this.NoGrow()
      ) {
        m.shapeType = Document.CreateShapeType.OVAL;
        var C = Math.atan(
          (this.EndPoint.y - this.StartPoint.y) / (this.EndPoint.x - this.StartPoint.x)
        );
        C < 0 &&
          (C *= - 1),
          this.EndPoint.x >= this.StartPoint.x ? m.x = this.EndPoint.x - 3 * c * Math.cos(C) - this.Frame.x + S / 2 - c / 2 : m.x = this.EndPoint.x + 3 * c * Math.cos(C) - this.Frame.x + S / 2 - c / 2,
          this.EndPoint.y >= this.StartPoint.y ? m.y = this.EndPoint.y - 3 * c * Math.sin(C) - this.Frame.y + S / 2 - c / 2 : m.y = this.EndPoint.y + 3 * c * Math.sin(C) - this.Frame.y + S / 2 - c / 2,
          m.cursorType = Element.CursorType.ROTATE,
          m.knobID = ConstantData.ActionTriggerType.ROTATE,
          m.fillColor = 'white',
          m.fillOpacity = 0.001,
          m.strokeSize = 2.5,
          m.knobSize = c,
          m.strokeColor = 'white',
          theKnob = this.GenericKnob(m),
          n.AddElement(theKnob),
          m.strokeSize = 1,
          m.strokeColor = 'black',
          theKnob = this.GenericKnob(m),
          n.AddElement(theKnob),
          m.knobSize = S
      }
      if (
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff &&
        this.CanUseStandOffDimensionLines()
      ) {
        var y = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
        this.CreateDimensionAdjustmentKnobs(n, y, m)
      }
      return n.SetSize(p, d),
        n.SetPos(g.x, g.y),
        n.isShape = !0,
        n.SetID(ConstantData.Defines.Action + t),
        n
    }
  }

  CalcCursorForSegment(e, t, a) {
    var r = Utils1.CalcAngleFromPoints(e, t);
    return this.CalcCursorForAngle(r, a);
  }

  NoRotate() {
    return this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR ||
      this.hooks.length > 1
  }

  SetRuntimeEffects(e) {
    var t = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    t &&
      this.ApplyEffects(t, e, !0)
  }

  ApplyStyles(e, t) {
    var a,
      r,
      i = t.Fill.Paint.FillType,
      n = t.Line.Paint.FillType,
      o = '' !== this.ImageURL;
    if (this.polylist && this.polylist.closed) if (o) {
      var s = 'PROPFILL',
        l = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      this.ImageHeader &&
        (
          this.ImageHeader.croprect &&
          (
            l.x = this.ImageHeader.croprect.left,
            l.y = this.ImageHeader.croprect.top,
            l.width = this.ImageHeader.croprect.right - this.ImageHeader.croprect.left,
            l.height = this.ImageHeader.croprect.bottom - this.ImageHeader.croprect.top
          ),
          void 0 !== this.ImageHeader.imageflags &&
          this.ImageHeader.imageflags === ConstantData.ImageScales.SDIMAGE_ALWAYS_FIT &&
          (s = 'NOPROP')
        ),
        e.SetImageFill(this.ImageURL, {
          scaleType: s,
          cropRect: l
        }),
        e.SetFillOpacity(t.Fill.Paint.Opacity)
    } else i == ConstantData.FillTypes.SDFILL_GRADIENT ? e.SetGradientFill(
      this.CreateGradientRecord(
        t.Fill.Paint.GradientFlags,
        t.Fill.Paint.Color,
        t.Fill.Paint.Opacity,
        t.Fill.Paint.EndColor,
        t.Fill.Paint.EndOpacity
      )
    ) : i == ConstantData.FillTypes.SDFILL_RICHGRADIENT ? e.SetGradientFill(this.CreateRichGradientRecord(t.Fill.Paint.GradientFlags)) : i == ConstantData.FillTypes.SDFILL_TEXTURE ? (
      a = {
        url: '',
        scale: 1,
        alignment: t.Fill.Paint.TextureScale.AlignmentScalar
      },
      r = t.Fill.Paint.Texture,
      T3Gv.optManager.TextureList.Textures[r] &&
      (
        a.dim = T3Gv.optManager.TextureList.Textures[r].dim,
        a.url = T3Gv.optManager.TextureList.Textures[r].ImageURL,
        a.scale = T3Gv.optManager.CalcTextureScale(t.Fill.Paint.TextureScale, a.dim.x),
        t.Fill.Paint.TextureScale.Scale = a.scale,
        a.url ||
        (
          a.url = Constants.FilePath_CMSRoot + Constants.FilePath_Textures + T3Gv.optManager.TextureList.Textures[r].filename
        ),
        e.SetTextureFill(a),
        e.SetFillOpacity(t.Fill.Paint.Opacity)
      )
    ) : i == ConstantData.FillTypes.SDFILL_TRANSPARENT ? e.SetFillColor('none') : (
      e.SetFillColor(t.Fill.Paint.Color),
      e.SetFillOpacity(t.Fill.Paint.Opacity)
    );
    n == ConstantData.FillTypes.SDFILL_GRADIENT ? e.SetGradientStroke(
      this.CreateGradientRecord(
        t.Line.Paint.GradientFlags,
        t.Line.Paint.Color,
        t.Line.Paint.Opacity,
        t.Line.Paint.EndColor,
        t.Line.Paint.EndOpacity
      )
    ) : n == ConstantData.FillTypes.SDFILL_RICHGRADIENT ? e.SetGradientStroke(this.CreateRichGradientRecord(t.Line.Paint.GradientFlags)) : n == ConstantData.FillTypes.SDFILL_TEXTURE ? (
      a = {
        url: '',
        scale: t.Line.Paint.TextureScale.Scale,
        alignment: t.Line.Paint.TextureScale.AlignmentScalar
      },
      r = t.Line.Paint.Texture,
      a.dim = T3Gv.optManager.TextureList.Textures[r].dim,
      a.url = T3Gv.optManager.TextureList.Textures[r].ImageURL,
      a.url ||
      (
        a.url = Constants.FilePath_CMSRoot + Constants.FilePath_Textures + T3Gv.optManager.TextureList.Textures[r].filename
      ),
      e.SetTextureStroke(a),
      e.SetStrokeOpacity(t.Line.Paint.Opacity)
    ) : n == ConstantData.FillTypes.SDFILL_SOLID ? (
      e.SetStrokeColor(t.Line.Paint.Color),
      e.SetStrokeOpacity(t.Line.Paint.Opacity)
    ) : e.SetStrokeColor('none')
  }

  CalcLineHops(e, t) {
    var a,
      r,
      i,
      n,
      o = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),
      s = o.length,
      l = e.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),
      S = l.length;
    for (a = 0; a < s; ++a) {
      if (this.hoplist.nhops > ConstantData.Defines.SDMAXHOPS) return;
      a > 0 ? (i = o[a - 1], n = o[a]) : (i = o[a], n = o[a + 1], a++);
      var c = this.AddHopPoint(i, n, l, S, a, t);
      if (null == c) break;
      if (c.bSuccess) {
        if ((r = c.tindex) >= 1 && S > 2) {
          if (l = l.slice(r), S -= r, null == (c = this.AddHopPoint(i, n, l, S, a, t))) break;
          r = c.tindex
        }
        if (r < S - 1) {
          if (l = l.slice(r), S -= r, null == (c = this.AddHopPoint(i, n, l, S, a, t))) break;
          r = c.tindex
        }
      }
    }
  }

  DebugLineHops(e) {
    var t,
      a,
      r = this.hoplist.nhops,
      i = null,
      n = !1,
      o = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
    if (0 != (o.flags & ConstantData.SessionFlags.SEDS_AllowHops)) {
      var s = o.hopdim.x,
        l = 0,
        S = 0,
        c = 0;
      T3Gv.optManager.svgOverlayLayer;
      for (t = 0; t < r; ++t) if ((i = this.hoplist.hops[t]).cons) n = !0,
        c++,
        l += i.pt.x,
        S += i.pt.y;
      else {
        n ? (
          a = 'green',
          s = 3 * o.hopdim.x,
          c++,
          l += i.pt.x,
          S += i.pt.y,
          l /= c,
          S /= c,
          n = !1
        ) : (a = 'red', s = o.hopdim.x, l = i.pt.x, S = i.pt.y);
        var u = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
          p = {
            svgDoc: e,
            shapeType: Document.CreateShapeType.OVAL,
            x: u.x + (l - s / 2),
            y: u.y + (S - s / 2),
            knobSize: s,
            fillColor: 'none',
            fillOpacity: 1,
            strokeSize: 1,
            strokeColor: a,
            KnobID: 0,
            cursorType: Element.CursorType.CROSSHAIR
          },
          d = this.GenericKnob(p);
        d.SetID('hoptarget'),
          T3Gv.optManager.svgOverlayLayer.AddElement(d),
          l = 0,
          S = 0,
          c = 0
      }
    }
  }

  AddHopPoint(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c = 0,
      u = 0;
    if (!(this.hoplist.nhops > ConstantData.Defines.SDMAXHOPS)) {
      var p = a;
      a = p.slice(c);
      var d = T3Gv.optManager.PolyLIntersect(e, t, a, r);
      s = d.ipt;
      for (var D = d.lpseg; d.bSuccess;) {
        if (
          o = Utils2.Pt2Rect(e, t),
          Utils2.InflateRect(o, 2, 2),
          s.x >= o.x &&
          s.x <= o.x + o.width &&
          s.y >= o.y &&
          s.y <= o.y + o.height
        ) {
          D += c,
            l = s.x - t.x,
            S = s.y - t.y;
          var g = {
            segment: i,
            index: n,
            pt: s,
            dist: Utils2.sqrt(l * l + S * S),
            cons: !1
          };
          return this.hoplist.hops.push(g),
            this.hoplist.nhops++,
          {
            bSuccess: !0,
            tindex: D
          }
        }
        if ((c += D) > r - 1) break;
        if (++u > r) break;
        r = (a = p.slice(c)).length,
          D = (d = T3Gv.optManager.PolyLIntersect(e, t, a, r)).lpseg,
          s = d.ipt
      }
      return {
        bSuccess: !1,
        tindex: D
      }
    }
  }

  RightClick(e) {
    var t,
      a = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
      r = T3Gv.optManager.svgObjectLayer.FindElementByDOMElement(e.currentTarget);
    if (!T3Gv.optManager.SelectObjectFromClick(e, r)) return !1;
    var i = r.GetID();
    if ((t = T3Gv.optManager.GetObjectPtr(i, !1)) && t.GetTextObject() >= 0) {
      var n = r.textElem;
      if (n) (
        s = n.GetSpellAtLocation(e.gesture.center.clientX, e.gesture.center.clientY)
      ) >= 0 &&
        T3Gv.optManager.ActivateTextEdit(r, e, !0)
    }
    if (
      T3Gv.optManager.RightClickParams = new RightClickData(),
      T3Gv.optManager.RightClickParams.TargetID = r.GetID(),
      T3Gv.optManager.RightClickParams.HitPt.x = a.x,
      T3Gv.optManager.RightClickParams.HitPt.y = a.y,
      T3Gv.optManager.RightClickParams.Locked = (this.flags & ConstantData.ObjFlags.SEDO_Lock) > 0,
      null != T3Gv.optManager.GetActiveTextEdit()
    ) {
      var o = T3Gv.optManager.svgDoc.GetActiveEdit(),
        s = - 1;
      o &&
        (
          s = o.GetSpellAtLocation(e.gesture.center.clientX, e.gesture.center.clientY)
        ),
        s >= 0 ? T3Gv.optManager.svgDoc.GetSpellCheck().ShowSpellMenu(o, s, e.gesture.center.clientX, e.gesture.center.clientY) : Commands.MainController.ShowContextualMenu(
          Resources.Controls.ContextMenus.TextMenu.Id.toLowerCase(),
          e.gesture.center.clientX,
          e.gesture.center.clientY
        )
    } else {
      var l = Resources.Controls.ContextMenus.LineSubMenu.Id.toLowerCase();
      if (
        this.LineType === ConstantData.LineType.SEGLINE &&
        (
          l = Resources.Controls.ContextMenus.LineSubMenuCurve.Id.toLowerCase()
        ),
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
      ) l = Resources.Controls.ContextMenus.LineSubMenuSingleWall.Id.toLowerCase(),
        SDUI.Commands.MainController.Selection.SetLastStyleInUse(this.StyleRecord);
      var S = Business.GetSelectionBusinessManager(this.BlockID);
      if (null == S && (S = T3Gv.gBusinessManager), S) {
        var c = S.GetLineRightClickMenuID();
        null != c &&
          (l = c)
      }
      Commands.MainController.ShowContextualMenu(l, e.gesture.center.clientX, e.gesture.center.clientY)
    }
  }

  SetObjectStyle(e) {
    var t = Utils1.DeepCopy(e),
      a = !1;
    this.LineType !== ConstantData.LineType.SEGLINE &&
      null != t.segl &&
      delete t.segl,
      null == e.EndArrowID &&
      null == e.StartArrowID ||
      (
        this.StartPoint.x < this.EndPoint.x ? a = !1 : (
          this.StartPoint.x > this.EndPoint.x ||
          this.StartPoint.y > this.EndPoint.y
        ) &&
          (a = !0),
        a &&
        (
          t.EndArrowID = this.EndArrowID,
          t.StartArrowID = this.StartArrowID,
          t.EndArrowDisp = this.EndArrowDisp,
          t.StartArrowDisp = this.StartArrowDisp,
          null != e.EndArrowID &&
          (t.StartArrowID = e.EndArrowID, t.StartArrowDisp = e.EndArrowDisp),
          null != e.StartArrowID &&
          (t.EndArrowID = e.StartArrowID, t.EndArrowDisp = e.StartArrowDisp)
        )
      ),
      this.polylist &&
      this.polylist.closed ||
      t &&
      t.StyleRecord &&
      t.StyleRecord.Fill &&
      t.StyleRecord.Fill.Hatch &&
      (t.StyleRecord.Fill.Hatch = 0),
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR &&
      t.StyleRecord &&
      t.StyleRecord.Name &&
      t.StyleRecord &&
      t.StyleRecord.Line &&
      t.StyleRecord.Line.Thickness &&
      (t.StyleRecord.Line.Thickness = this.StyleRecord.Line.Thickness);
    // var r = ListManager.BaseDrawingObject.prototype.SetObjectStyle.call(this, t);
    // Double ===
    var r = super.SetObjectStyle(t);
    return r.StyleRecord &&
      r.StyleRecord.Fill &&
      (this.ImageURL = ''),
      r
  }

  GetArrowheadSelection(e) {
    e &&
      (
        function (e) {
          if (Math.abs(e.EndPoint.x - e.StartPoint.x) < 0.01) return e.EndPoint.y < e.StartPoint.y;
          var t = Utils2.Pt2Rect(e.EndPoint, e.StartPoint);
          return Math.abs(e.EndPoint.x - t.x) < 0.01 &&
            Math.abs(e.EndPoint.y - t.y) < 0.01 ||
            Math.abs(e.EndPoint.x - t.x) < 0.01 &&
            Math.abs(e.EndPoint.y - (t.y + t.height)) < 0.01
        }(this) ? (
          e.StartArrowID = this.EndArrowID,
          e.StartArrowDisp = this.EndArrowDisp,
          e.EndArrowID = this.StartArrowID,
          e.EndArrowDisp = this.StartArrowDisp
        ) : (
          e.StartArrowID = this.StartArrowID,
          e.StartArrowDisp = this.StartArrowDisp,
          e.EndArrowID = this.EndArrowID,
          e.EndArrowDisp = this.EndArrowDisp
        ),
        e.ArrowSizeIndex = this.ArrowSizeIndex
      );
    return !0
  }

  UpdateDimensionFromTextObj(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n = null,
      o = - 1;
    T3Gv.objectStore.PreserveBlock(this.BlockID);
    for (
      T3Gv.optManager.ShowSVGSelectionState(this.BlockID, !1),
      i = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID),
      t ? (n = t.text, o = t.userData) : (n = e.GetText(), o = e.GetUserData()),
      this.UpdateDimensionFromText(i, n, o),
      T3Gv.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
      a = this.hooks.length,
      r = 0;
      r < a;
      r++
    ) T3Gv.optManager.SetLinkFlag(this.hooks[r].objid, ConstantData.LinkFlags.SED_L_MOVE);
    (
      '' !== this.HyperlinkText ||
      - 1 != this.NoteID ||
      - 1 != this.CommentID ||
      this.HasFieldData()
    ) &&
      T3Gv.optManager.AddToDirtyList(this.BlockID),
      T3Gv.optManager.CompleteOperation(null),
      (this.Frame.x < 0 || this.Frame.y < 0) &&
      T3Gv.optManager.ScrollObjectIntoView(this.BlockID, !1)
  }

  UpdateDimensionFromText(e, t, a) {
    console.log('== track UpdateDimensionsLines Shape.BaseLine-> UpdateDimensionFromText')

    var r,
      i,
      n,
      o = - 1;
    if (a.hookedObjectInfo) return this.UpdateDimensionsFromTextForHookedObject(e, t, a);
    if (
      i = a.segment,
      (r = this.GetDimensionValueFromString(t, i)) >= 0 &&
      (o = this.GetDimensionLengthFromValue(r)),
      o < 0
    ) return T3Gv.optManager.AddToDirtyList(this.BlockID),
      void T3Gv.optManager.RenderDirtySVGObjects();
    this.UpdateDimensions(o, null, null),
      T3Gv.optManager.SetLinkFlag(
        this.BlockID,
        ConstantData.LinkFlags.SED_L_MOVE | ConstantData.LinkFlags.SED_L_CHANGE
      );
    var s = this.hooks.length;
    for (n = 0; n < s; n++) T3Gv.optManager.SetLinkFlag(
      this.hooks[n].objid,
      ConstantData.LinkFlags.SED_L_MOVE | ConstantData.LinkFlags.SED_L_CHANGE
    );
    T3Gv.optManager.UpdateLinks(),
      this.GetDimensionsForDisplay().width === o &&
      (
        this.rwd = r,
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !0)
      ),
      this.UpdateDimensionLines(e)
  }

  // UpdateSecondaryDimensions(e, t, a) {
  //   this.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ||
  //     this.Dimensions & ConstantData.DimensionFlags.SED_DF_HideHookedObjDimensions ||
  //     (
  //       this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
  //       this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select ||

  //       // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always ||
  //       // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select ||

  //       a
  //     ) &&
  //     this.UpdateHookedObjectDimensionLines(e, t, a)
  // }



  UpdateSecondaryDimensions(shapeContainer, creator, a) {

    // e ShapeContainer
    // t Creator


    const isWall = this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL;

    const isHideHookedDim = !(this.Dimensions & ConstantData.DimensionFlags.SED_DF_HideHookedObjDimensions);

    const isShowAlways = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select || a;

    if (isWall && isHideHookedDim && isShowAlways) {
      this.UpdateHookedObjectDimensionLines(shapeContainer, creator, a);
    }
  }



  GetBoundingBoxesForSecondaryDimensions() {
    //'use strict';
    var e,
      t = {},
      a = 0,
      r = 0,
      i = '',
      n = {},
      o = [];
    if (
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
      !(
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_HideHookedObjDimensions
      ) &&
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_AllSeg
    ) for (a = (t = this.GetHookedObjectDimensionInfo()).length, e = 0; e < a; e++) Utils2.EqualPt(t[e].start, t[e].end) ||
      (
        r = Utils1.CalcAngleFromPoints(t[e].start, t[e].end),
        i = this.GetDimensionTextForPoints(t[e].start, t[e].end),
        (
          n = this.GetPointsForDimension(r, i, t[e].start, t[e].end, t[e].segment, !0)
        ) &&
        (o.push(n.left), o.push(n.right), o.push(n.textFrame))
      );
    return o
  }

  AddIcon(e, t, a) {
    var r,
      i,
      n,
      o;
    this.Frame;
    o = (n = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0)).length,
      this.DataID >= 0 ? (
        2 == o ? (r = n[1].x, i = n[1].y) : 3 == o ? (r = n[2].x, i = n[2].y) : (r = n[o - 1].x, i = n[o - 1].y),
        // this instanceof ListManager.Line ||
        // this instanceof ListManager.ArcLine
        // Double ===
        // this instanceof GlobalDataShape.Line ||
        //   this instanceof GlobalDataShape.ArcLine
        this instanceof Instance.Shape.Line ||
          this instanceof Instance.Shape.ArcLine
          ? (r -= this.iconSize, a.y = i - 2 * this.iconSize) : (
            ListManager.SegmentedLine,
            r -= this.iconSize,
            a.y = i - 2 * this.iconSize
          ),
        a.x = r - this.iconSize * this.nIcons
      ) : (
        2 == o ? (r = (n[0].x + n[1].x) / 2, i = (n[0].y + n[1].y) / 2) : 3 == o ? (r = n[1].x, i = n[1].y) : (r = n[o = Math.floor(o / 2)].x, i = n[o].y),
        // this instanceof ListManager.Line
        // Double ===
        // this instanceof GlobalDataShape.Line
        this instanceof Instance.Shape.Line


          ? this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR ? a.y = i - (this.StyleRecord.Line.Thickness / 2 + this.iconSize / 8) : (r += this.iconSize / 2, a.y = i + this.iconSize / 4) :
          // this instanceof ListManager.ArcLine
          // Double ===
          // this instanceof GlobalDataShape.ArcLine
          this instanceof Instance.Shape.ArcLine
            ? (r += this.iconSize / 2, a.y = i + this.iconSize / 2) :
            // this instanceof ListManager.SegmentedLine

            // Double ===
            // this instanceof GlobalDataShape.SegmentedLine
            this instanceof Instance.Shape.SegmentedLine
              ? a.y = i + this.iconSize / 2 : a.y = i - this.iconSize / 2,
        a.x = r - this.iconSize * this.nIcons
      );
    var s = this.GenericIcon(a);
    return this.nIcons++,
      t.AddElement(s),
      s
  }

  GetNotePos(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s = {};
    return n = (i = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0)).length,
      this.DataID >= 0 ? (
        2 == n ? (a = i[1].x, r = i[1].y) : 3 == n ? (a = i[2].x, r = i[2].y) : (a = i[n - 1].x, r = i[n - 1].y),
        // this instanceof ListManager.Line ||
        //   this instanceof ListManager.ArcLine

        // Double ===
        // this instanceof GlobalDataShape.Line ||
        //   this instanceof GlobalDataShape.ArcLine
        this instanceof Instance.Shape.Line ||
          this instanceof Instance.Shape.ArcLine

          ? (a -= this.iconSize, s.y = r - 2 * this.iconSize) : (
            ListManager.SegmentedLine,
            a -= this.iconSize,
            s.y = r - 2 * this.iconSize
          ),
        s.x = a - this.iconSize * this.nIcons,
        1 == this.nIcons &&
        (s.x += 2 * this.iconSize),
        {
          x: (o = this.GetSVGFrame()).x + s.x,
          y: o.y + s.y + this.iconSize
        }
      ) : (
        2 == n ? (a = (i[0].x + i[1].x) / 2, r = (i[0].y + i[1].y) / 2) : 3 == n ? (a = i[1].x, r = i[1].y) : (a = i[n = Math.floor(n / 2)].x, r = i[n].y),
        // this instanceof ListManager.Line
        // Double ===
        // this instanceof GlobalDataShape.Line
        this instanceof Instance.Shape.Line
          ? (a += this.iconSize / 2, s.y = r + this.iconSize / 4) :
          // this instanceof ListManager.ArcLine
          // this instanceof GlobalDataShape.ArcLine
          this instanceof Instance.Shape.ArcLine
            ? (a += this.iconSize / 2, s.y = r + this.iconSize / 2) :
            // this instanceof ListManager.SegmentedLine
            // this instanceof GlobalDataShape.SegmentedLine
            this instanceof Instance.Shape.SegmentedLine
              ? s.y = r + this.iconSize / 2 : s.y = r - this.iconSize / 2,
        1 == this.nIcons &&
        (a += this.iconSize),
        s.x = a,
        {
          x: (o = this.GetSVGFrame()).x + s.x,
          y: o.y + s.y + this.iconSize
        }
      )
  }

  ConvertToVisio() {
    var e = [
      this.BlockID
    ];
    if (null == this.polylist) {
      var t,
        a,
        r,
        i,
        n,
        o = this.LineType,
        s = new PolyList();
      for (
        a = (
          r = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null)
        ).length,
        t = 0;
        t < a;
        t++
      ) switch (
        i = 0 === t ||
          this.LineType === ConstantData.LineType.SEGLINE ? ConstantData.LineType.LINE : this.LineType,
        s.segs.push(
          new PolySeg(i, r[t].x - this.StartPoint.x, r[t].y - this.StartPoint.y)
        ),
        i
        ) {
          case ConstantData.LineType.ARCLINE:
            this.IsReversed ? s.segs[s.segs.length - 1].param = this.CurveAdjust : s.segs[s.segs.length - 1].param = - this.CurveAdjust;
            break;
          case ConstantData.LineType.ARCSEGLINE:
            // n = ListManager.PolyLine.prototype.Pr_PolyLGetArcQuadrant.call(null, r[t - 1], r[t], 0),
            // Double ===
            n = this.PolyLine_Pr_PolyLGetArcQuadrant(r[t - 1], r[t], 0),
              s.segs[s.segs.length - 1].param = n.param,
              s.segs[s.segs.length - 1].ShortRef = n.ShortRef
        }
      this.polylist = s,
        this.LineType = o
    }
    var l = T3Gv.optManager.SD_GetVisioTextChild(this.BlockID);
    if (l >= 0) {
      var S = T3Gv.optManager.GetObjectPtr(l, !1);
      S &&
        (
          this.DataID = S.DataID,
          this.trect = Utils1.DeepCopy(S.trect),
          this.TextAlign = S.TextAlign
        )
    } else {
      this.TextDirection = !1;
      var c = T3Gv.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      if (c) {
        var u = c.textElem;
        if (u) {
          var p = this.Frame.x,
            d = this.Frame.y;
          // if (this instanceof ListManager.SegmentedLine)
          // Double ===
          // if (this instanceof GlobalDataShape.SegmentedLine) {
          if (this instanceof Instance.Shape.SegmentedLine) {
            var D = this.StartPoint.x - this.EndPoint.x;
            D > 0 &&
              (D = 0);
            var g = this.StartPoint.y - this.EndPoint.y;
            g < 0 &&
              (g = 0),
              p += D,
              d += g
          }
          var h = u.GetPos();
          this.trect.x = p + h.x,
            this.trect.y = d + h.y,
            this.trect.width = this.theMinTextDim.width,
            this.trect.height = this.theMinTextDim.height
        }
      }
    }
    return e
  }

  PolyLine_Pr_PolyLGetArcQuadrant(e, t, a) {
    var r, i, n, o, s, l = {
      param: 0,
      ShortRef: 0
    }, S = [], c = {};
    return S.push(new Point(e.x, e.y)),
      S.push(new Point(t.x, t.y)),
      c.x = e.x,
      c.y = e.y,
      Math.abs(a) >= .01 && (!0,
        r = Math.sin(a),
        i = Math.cos(a),
        n = Math.asin(r),
        i < 0 && (n = -n),
        Utils3.RotatePointsAboutPoint(c, n, S)),
      o = S[0],
      (s = S[1]).x > o.x ? s.y > o.y ? (l.param = -ConstantData.Geometry.PI / 2,
        l.ShortRef = ConstantData.ArcQuad.SD_PLA_BL,
        t.notclockwise && (l.param = 0),
        l) : (l.ShortRef = ConstantData.ArcQuad.SD_PLA_TL,
          t.notclockwise && (l.ShortRef = ConstantData.ArcQuad.SD_PLA_TR,
            l.param = ConstantData.Geometry.PI / 2),
          l) : s.y > o.y ? (l.ShortRef = ConstantData.ArcQuad.SD_PLA_BR,
            t.notclockwise && (l.ShortRef = ConstantData.ArcQuad.SD_PLA_BL,
              l.param = ConstantData.Geometry.PI / 2),
            l) : (l.param = -ConstantData.Geometry.PI / 2,
              l.ShortRef = ConstantData.ArcQuad.SD_PLA_TR,
              t.notclockwise && (l.param = 0),
              l)
  }


  FieldDataAllowed() {
    return !1
  }


}

export default BaseLine
