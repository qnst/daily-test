

import BaseLine from './Shape.BaseLine'
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/GlobalData'
import FileParser from '../Data/FileParser'
import DefaultEvt from "../Event/DefaultEvt";
import Resources from '../Data/Resources'
import Element from '../Basic/Basic.Element';
import ConstantData from '../Data/ConstantData'
import PolySeg from '../Model/PolySeg'
import ConstantData2 from '../Data/ConstantData2';


class FreehandLine extends BaseLine {



  // constructor(e) {
  //   //'use strict';
  //   (e = e || {
  //   }).LineType = ListManager.LineType.FREEHAND,
  //     this.StartPoint = e.StartPoint ||
  //     {
  //       x: 0,
  //       y: 0
  //     },
  //     this.EndPoint = e.EndPoint ||
  //     {
  //       x: 0,
  //       y: 0
  //     },
  //     this.pointlist = e.pointlist ||
  //     [],
  //     this.RotationAngle = e.RotationAngle ||
  //     0,
  //     this.flags = e.flags ||
  //     0,
  //     e.TextFlags = e.TextFlags | ConstantData.TextFlags.SED_TF_None,
  //     this.TextFlags = e.TextFlags ||
  //     0,
  //     this.CalcFrame();
  //   let t = ListManager.BaseLine.apply(this, [
  //     e
  //   ]);
  //   if (t) return t
  // }



  public StartPoint: any;
  public EndPoint: any;
  public pointlist: any;

  constructor(e) {
    //'use strict';
    e = e || {};
    e.LineType = ConstantData.LineType.FREEHAND;
    e.TextFlags = e.TextFlags | ConstantData.TextFlags.SED_TF_None;

    super(e);

    this.TextFlags = e.TextFlags || 0;

    // let t = ListManager.BaseLine.apply(this, [e]);

    this.StartPoint = e.StartPoint || { x: 0, y: 0 };
    this.EndPoint = e.EndPoint || { x: 0, y: 0 };
    this.pointlist = e.pointlist || [];
    this.RotationAngle = e.RotationAngle || 0;
    this.flags = e.flags || 0;

    this.CalcFrame();

    // if (t) return t;
  }

  GetFreehandPoints(e) {
    let t = [],
      a = this.StartPoint.x,
      r = this.StartPoint.y;
    if (!0 === e && (a -= this.Frame.x, r -= this.Frame.y), this.pointlist) for (let e = 0; e < this.pointlist.length; e++) {
      const i = this.pointlist[e];
      let n = {
        x: i.x + a,
        y: i.y + r
      };
      t.push(n)
    }
    return t
  }


  CalcFrame() {
    let e = {},
      t = [];
    this.pointlist &&
      this.pointlist.length &&
      (
        t = this.GetFreehandPoints(!1),
        Utils2.GetPolyRect(e, t),
        e.width < 1 &&
        (e.width = 1),
        e.height < 1 &&
        (e.height = 1),
        this.Frame = $.extend(!0, {
        }, e)
      ),
      this.UpdateFrame(this.Frame)
  }

  GetDimensionsForDisplay() {
    //'use strict';
    return {
      x: this.Frame.x,
      y: this.Frame.y,
      width: this.Frame.width,
      height: this.Frame.height
    }
  }

  GetSVGFrame(e) {
    var t = {};
    return null == e &&
      (e = this.Frame),
      Utils2.CopyRect(t, e),
      t
  }

  UpdateDrawing(e) {
    var t = e.GetElementByID(ConstantData.SVGElementClass.SHAPE),
      a = e.GetElementByID(ConstantData.SVGElementClass.SLOP);
    this.CalcFrame();
    var r = this.GetFreehandPoints(!0);
    e.SetSize(this.Frame.width, this.Frame.height),
      e.SetPos(this.Frame.x, this.Frame.y),
      t.SetSize(this.Frame.width, this.Frame.height),
      this.UpdateSVG(t, r),
      a.SetSize(this.Frame.width, this.Frame.height),
      this.UpdateSVG(a, r)
  }

  UpdateSVG(e, t) {
    //'use strict';
    var a,
      r,
      i = t.length;
    if (e && e.PathCreator) {
      for (
        (a = e.PathCreator()).BeginPath(),
        i > 1 &&
        a.MoveTo(t[0].x, t[0].y),
        r = 1;
        r < i;
        r++
      ) a.LineTo(t[r].x, t[r].y);
      a.Apply()
    }
  }

  CreateShape(e, t) {
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    let a = [],
      r = e.CreateShape(ConstantData.CreateShapeType.SHAPECONTAINER),
      i = e.CreateShape(ConstantData.CreateShapeType.PATH);
    i.SetID(ConstantData.SVGElementClass.SHAPE);
    let n = e.CreateShape(ConstantData.CreateShapeType.PATH);
    n.SetID(ConstantData.SVGElementClass.SLOP),
      n.ExcludeFromExport(!0),
      this.CalcFrame();
    let o = this.Frame,
      s = this.StyleRecord;
    if (s = this.SVGTokenizerHook(s), null == s) {
      let e = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
      e &&
        (s = e.def.style)
    }
    let l = o.width,
      S = o.height;
    r.SetSize(l, S),
      r.SetPos(this.Frame.x, this.Frame.y),
      i.SetSize(l, S),
      a = this.GetFreehandPoints(!0),
      this.UpdateSVG(i, a);
    let c = s.Line.Paint.Color,
      u = s.Line.Thickness;
    s.Line.Thickness > 0 &&
      s.Line.Thickness < 1 &&
      (u = 1);
    let p = s.Line.Paint.Opacity;
    return i.SetFillColor('none'),
      i.SetStrokeColor(c),
      i.SetStrokeOpacity(p),
      i.SetStrokeWidth(u),
      n.SetSize(l, S),
      this.UpdateSVG(n, a),
      n.SetStrokeColor('white'),
      n.SetFillColor('none'),
      n.SetOpacity(0),
      t ? n.SetEventBehavior(ConstantData2.EventBehavior.HIDDEN_OUT) : n.SetEventBehavior(ConstantData2.EventBehavior.NONE),
      n.SetStrokeWidth(u + ConstantData.Defines.SED_Slop),
      r.AddElement(i),
      r.AddElement(n),
      this.ApplyStyles(i, s),
      this.ApplyEffects(r, !1, !0),
      r.isShape = !0,
      r
  }

  PostCreateShapeCallback(e, t, a, r) {
  }

  CreateActionTriggers(e, t, a, r) {
    let i = ConstantData.Defines.SED_KnobSize;
    var n = e.CreateShape(ConstantData.CreateShapeType.GROUP);
    let o = e.docInfo.docToScreenScale;
    e.docInfo.docScale <= 0.5 &&
      (o *= 2);
    let s = i / o,
      l = this.Frame,
      S = l.width,
      c = l.height;
    GlobalData.optManager.GetObjectPtr(t, !1);
    S += s,
      c += s;
    let u = $.extend(!0, {
    }, l);
    u.x -= s / 2,
      u.y -= s / 2,
      u.width += s,
      u.height += s;
    let p = {
      svgDoc: e,
      shapeType: ConstantData.CreateShapeType.RECT,
      knobSize: s,
      fillColor: 'black',
      fillOpacity: 1,
      strokeSize: 1,
      strokeColor: '#777777',
      cursorType: ConstantData2.CursorType.RESIZE_LT,
      locked: !1
    };
    return t !== r &&
      (
        p.fillColor = 'white',
        p.strokeSize = 1,
        p.strokeColor = 'black',
        p.fillOpacity = 0
      ),
      p.knobID = ConstantData.ActionTriggerType.TOPLEFT,
      p.cursorType = ConstantData2.CursorType.RESIZE_LT,
      theKnob = this.GenericKnob(p),
      n.AddElement(theKnob),
      p.x = S - s,
      p.y = 0,
      p.cursorType = ConstantData2.CursorType.RESIZE_RT,
      p.knobID = ConstantData.ActionTriggerType.TOPRIGHT,
      theKnob = this.GenericKnob(p),
      n.AddElement(theKnob),
      p.x = S - s,
      p.y = c - s,
      p.cursorType = ConstantData2.CursorType.RESIZE_RB,
      p.knobID = ConstantData.ActionTriggerType.BOTTOMRIGHT,
      theKnob = this.GenericKnob(p),
      n.AddElement(theKnob),
      p.x = 0,
      p.y = c - s,
      p.cursorType = ConstantData2.CursorType.RESIZE_LB,
      p.knobID = ConstantData.ActionTriggerType.BOTTOMLEFT,
      theKnob = this.GenericKnob(p),
      n.AddElement(theKnob),
      n.SetSize(S, c),
      n.SetPos(u.x, u.y),
      n.isShape = !0,
      n.SetID(ConstantData.Defines.Action + t),
      n
  }

  ModifyShape(e, t, a, r, i) {
    GlobalData.optManager.theActionStartX,
      GlobalData.optManager.theActionStartY;
    var n = {
      x: t,
      y: a
    },
      o = (
        $.extend(!0, {
        }, GlobalData.optManager.theActionBBox),
        $.extend(!0, {
        }, GlobalData.optManager.theActionBBox)
      );
    switch (GlobalData.optManager.theActionTriggerID) {
      case ConstantData.ActionTriggerType.TOPLEFT:
        delx = o.x - t,
          dely = o.y - a,
          o.x = t,
          o.y = a,
          o.width += delx,
          o.height += dely,
          o.width < 0 &&
          (
            o.x = GlobalData.optManager.theActionBBox.x + GlobalData.optManager.theActionBBox.width,
            o.width = - o.width
          ),
          o.height < 0 &&
          (
            o.y = GlobalData.optManager.theActionBBox.y + GlobalData.optManager.theActionBBox.height,
            o.height = - o.height
          ),
          GlobalData.optManager.theActionNewBBox = $.extend(!0, {
          }, o),
          this.HandleActionTriggerCallResize(GlobalData.optManager.theActionNewBBox, !0, n);
        break;
      case ConstantData.ActionTriggerType.TOPRIGHT:
        dely = o.y - a,
          o.y = a,
          o.height = o.height + dely,
          o.width = t - o.x,
          o.width < 0 &&
          (o.x = t, o.width = - o.width),
          o.height < 0 &&
          (
            o.y = GlobalData.optManager.theActionBBox.y + GlobalData.optManager.theActionBBox.height,
            o.height = - o.height
          ),
          GlobalData.optManager.theActionNewBBox = $.extend(!0, {
          }, o),
          this.HandleActionTriggerCallResize(GlobalData.optManager.theActionNewBBox, !0, n);
        break;
      case ConstantData.ActionTriggerType.BOTTOMRIGHT:
        o.width = t - o.x,
          o.height = a - o.y,
          o.width < 0 &&
          (o.x = t, o.width = - o.width),
          o.height < 0 &&
          (o.y = a, o.height = - o.height),
          GlobalData.optManager.theActionNewBBox = $.extend(!0, {
          }, o),
          this.HandleActionTriggerCallResize(GlobalData.optManager.theActionNewBBox, !0, n);
        break;
      case ConstantData.ActionTriggerType.BOTTOMLEFT:
        o.height = a - o.y,
          delx = o.x - t,
          o.x = t,
          o.width += delx,
          o.width < 0 &&
          (
            o.x = GlobalData.optManager.theActionBBox.x + GlobalData.optManager.theActionBBox.width,
            o.width = - o.width
          ),
          o.height < 0 &&
          (o.y = a, o.height = - o.height),
          GlobalData.optManager.theActionNewBBox = $.extend(!0, {
          }, o),
          this.HandleActionTriggerCallResize(GlobalData.optManager.theActionNewBBox, !0, n)
    }
  }

  SetSize(e, t, a) {
    var r,
      i,
      n = {};
    n.x = this.Frame.x,
      n.y = this.Frame.y,
      n.width = this.Frame.width,
      n.height = this.Frame.height,
      e &&
      (n.width = e),
      t &&
      (n.height = t),
      (t || e) &&
      (
        r = GlobalData.optManager.theActionBBox,
        i = GlobalData.optManager.theActionNewBBox,
        GlobalData.optManager.theActionBBox = Utils1.DeepCopy(this.Frame),
        GlobalData.optManager.theActionNewBBox = Utils1.DeepCopy(this.Frame),
        this.HandleActionTriggerCallResize(n, a, null),
        GlobalData.optManager.theActionBBox = r,
        GlobalData.optManager.theActionNewBBox = i,
        GlobalData.optManager.AddToDirtyList(this.BlockID),
        this.rflags &&
        (
          e &&
          (
            this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1)
          ),
          t &&
          (
            this.rflags = Utils2.SetFlag(
              this.rflags,
              ConstantData.FloatingPointDim.SD_FP_Height,
              !1
            )
          )
        )
      )
  }

  HandleActionTriggerCallResize(e, t, a) {
    this.prevBBox = $.extend(!0, {
    }, this.Frame);
    let r = $.extend(!1, {
    }, this.Frame);
    e.width < ConstantData.Defines.SED_MinDim &&
      (e.width = ConstantData.Defines.SED_MinDim),
      e.height < ConstantData.Defines.SED_MinDim &&
      (e.height = ConstantData.Defines.SED_MinDim);
    let i = 1,
      n = 1;
    e.width &&
      (
        Utils2.IsEqual(this.Frame.width, 0) ||
        (i = e.width / this.Frame.width)
      ),
      e.height &&
      (
        Utils2.IsEqual(this.Frame.height, 0) ||
        (n = e.height / this.Frame.height)
      );
    let o = e.x - r.x,
      s = e.y - r.y;
    this.StartPoint.x += o,
      this.StartPoint.y += s;
    let l = this.pointlist.length;
    for (let e = 0; e < l; e++) this.pointlist[e].x *= i,
      this.pointlist[e].y *= n;
    if (
      this.CalcFrame(),
      t === ConstantData.ActionTriggerType.LINELENGTH &&
      (t = 0, noMin = !0),
      GlobalData.optManager.theActionStoredObjectID === this.BlockID &&
      a &&
      GlobalData.optManager.UpdateDisplayCoordinates(e, a, ConstantData.CursorTypes.Grow, this),
      t &&
      GlobalData.optManager.theActionSVGObject &&
      GlobalData.optManager.theActionStoredObjectID === this.BlockID
    ) {
      if (null == GlobalData.optManager.theActionSVGObject) return;
      let e = {
        action: t,
        prevBBox: this.prevBBox,
        trect: $.extend(!0, {
        }, this.trect)
      };
      // Collab.SendSVGEvent(
      //   this.BlockID,
      //   ConstantData.CollabSVGEventTypes.Shape_Grow,
      //   GlobalData.optManager.theActionNewBBox,
      //   e
      // ),
      this.UpdateDrawing(GlobalData.optManager.theActionSVGObject)
    }
  }

  AllowHook(e, t, a) {
    return !1
  }

  AllowLink() {
    return !1
  }

  PreventLink() {
    return !0
  }

  NoRotate() {
    return !0
  }

  CustomSnap(e) {
    return !0
  }

  AdjustLineEnd(e, t, a, r) {
    let i = this.pointlist[this.pointlist.length - 1],
      n = t - i.x,
      o = a - i.y;
    if (Math.sqrt(n * n + o * o) > 3) {
      let e = t - this.StartPoint.x,
        r = a - this.StartPoint.y,
        i = new Point(e, r);
      this.pointlist.push(i)
    }
    this.AdjustLine(e, t, a, r)
  }

  AdjustLine(e, t, a, r) {
    e ? this.UpdateDrawing(e) : this.CalcFrame()
  }

  LM_ActionDuringTrack(e) {
    return e
  }

  LM_DrawDuringTrack(e) {
    return e
  }

  LM_DrawRelease(e) {
    if (
      e &&
      (
        Utils2.StopPropagationAndDefaults(e),
        e.gesture.stopDetect()
      ),
      GlobalData.optManager.UnbindActionClickHammerEvents(),
      GlobalData.optManager.isMobilePlatform ||
      (
        $(window).unbind('mousemove'),
        GlobalData.optManager.WorkAreaHammer.on('tap', Evt_WorkAreaHammerTap)
      ),
      this.ResetAutoScrollTimer()
      // ,
      // Collab.AllowMessage()
    ) {
      var t = {
        attributes: {
        }
      };
      t.attributes.StyleRecord = Utils1.DeepCopy(GlobalData.optManager.theDrawShape.StyleRecord),
        t.attributes.StartArrowID = GlobalData.optManager.theDrawShape.StartArrowID,
        t.attributes.EndArrowID = GlobalData.optManager.theDrawShape.EndArrowID,
        t.attributes.StartArrowDisp = GlobalData.optManager.theDrawShape.StartArrowDisp,
        t.attributes.ArrowSizeIndex = GlobalData.optManager.theDrawShape.ArrowSizeIndex,
        t.attributes.TextGrow = GlobalData.optManager.theDrawShape.TextGrow,
        t.attributes.TextAlign = GlobalData.optManager.theDrawShape.TextAlign,
        t.attributes.TextDirection = GlobalData.optManager.theDrawShape.TextDirection,
        t.attributes.Dimensions = GlobalData.optManager.theDrawShape.Dimensions,
        t.attributes.StartPoint = Utils1.DeepCopy(GlobalData.optManager.theDrawShape.StartPoint),
        t.attributes.EndPoint = Utils1.DeepCopy(GlobalData.optManager.theDrawShape.EndPoint),
        t.attributes.Frame = Utils1.DeepCopy(GlobalData.optManager.theDrawShape.Frame),
        t.attributes.extraflags = ConstantData.ExtraFlags.SEDE_SideKnobs,
        this.pointlist &&
        (t.attributes.pointlist = Utils1.DeepCopy(this.pointlist)),
        t.LineTool = Resources.LineToolTypes.FreehandLine,
        // Collab.AddNewBlockToSecondary(GlobalData.optManager.theDrawShape.BlockID),
        /*Collab.IsSecondary()*/false &&
        (t.CreateList = [
          GlobalData.optManager.theDrawShape.BlockID
        ]),
        t.LinkParams = Utils1.DeepCopy(GlobalData.optManager.LinkParams),
        t.Actions = [];
      // var a = new Collab.MessageAction(ConstantData.CollabMessageActions.CreateLine);
      // t.Actions.push(a)
      // ,
      // a = new Collab.MessageAction(ConstantData.CollabMessageActions.LinkObject),
      // t.Actions.push(a)
      // ,
      // Collab.BuildMessage(ConstantData.CollabMessages.AddLine, t, !1)
    }
    this.LM_DrawPostRelease(GlobalData.optManager.theActionStoredObjectID),
      GlobalData.optManager.PostObjectDraw()
  }

  LM_DrawClick(e, t) {
    console.log('ListManager.FreehandLine.prototype.LM_DrawClick e, t=>', e, t);

    try {
      this.Frame.x = e,
        this.Frame.y = t,
        this.Frame.width = 0,
        this.Frame.height = 0,
        this.StartPoint = {
          x: e,
          y: t
        },
        this.EndPoint = {
          x: e,
          y: t
        },
        GlobalData.optManager.WorkAreaHammer.off('dragstart'),
        GlobalData.optManager.isMobilePlatform ||
        (
          GlobalData.optManager.WorkAreaHammer.on('drag', Evt_DrawTrackHandlerFactory(this)),
          GlobalData.optManager.WorkAreaHammer.on('dragend', Evt_DrawReleaseHandlerFactory(this))
        )
    } catch (e) {
      this.LM_DrawClick_ExceptionCleanup(e);
      GlobalData.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  WriteSDFAttributes(e, t) {
    this.pointlist.length;
    let a = Utils1.DeepCopy(this).GetFreehandPoints(!0);
    if (t.WriteVisio);
    else {
      var r = SDF.Write_CODE(e, ConstantData2.SDROpCodesByName.SDF_C_FREEHANDLINE);
      let t,
        i = {
          InstID: this.BlockID,
          npts: a.length,
          pts: []
        },
        n = a.length;
      for (let e = 0; e < n; e++) t = new Point(a[e].x, a[e].y),
        i.pts.push(t);
      e.writeStruct(FileParser.SDF_FreehandLine_Struct, i),
        SDF.Write_LENGTH(e, r)
    }
  }

}


export default FreehandLine

// ListManager.FreehandLine.prototype = new ListManager.BaseLine,
//   ListManager.FreehandLine.prototype.constructor = ListManager.FreehandLine,
