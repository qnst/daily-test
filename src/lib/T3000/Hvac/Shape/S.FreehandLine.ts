

import BaseLine from './S.BaseLine'
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import T3Gv from '../Data/T3Gv'
import ConstantData from '../Data/Constant/ConstantData'
import ConstantData2 from '../Data/Constant/ConstantData2';
import ShapeDataUtil from '../Util/ShapeDataUtil';
import ShapeConstant from '../Util/ShapeConstant';
import Point from '../Model/Point';

class FreehandLine extends BaseLine {

  public StartPoint: any;
  public EndPoint: any;
  public pointlist: any;

  constructor(e) {
    e = e || {};
    e.LineType = ConstantData.LineType.FREEHAND;
    e.TextFlags = e.TextFlags | ConstantData.TextFlags.SED_TF_None;

    super(e);

    this.TextFlags = e.TextFlags || 0;


    this.StartPoint = e.StartPoint || { x: 0, y: 0 };
    this.EndPoint = e.EndPoint || { x: 0, y: 0 };
    this.pointlist = e.pointlist || [];
    this.RotationAngle = e.RotationAngle || 0;
    this.flags = e.flags || 0;

    this.CalcFrame();

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
      let e = T3Gv.opt.GetObjectPtr(T3Gv.opt.sedSessionBlockId, !1);
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
    T3Gv.opt.GetObjectPtr(t, !1);
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
    T3Gv.opt.actionStartX,
      T3Gv.opt.actionStartY;
    var n = {
      x: t,
      y: a
    },
      o = (
        $.extend(!0, {
        }, T3Gv.opt.actionBBox),
        $.extend(!0, {
        }, T3Gv.opt.actionBBox)
      );
    switch (T3Gv.opt.actionTriggerId) {
      case ConstantData.ActionTriggerType.TOPLEFT:
        delx = o.x - t,
          dely = o.y - a,
          o.x = t,
          o.y = a,
          o.width += delx,
          o.height += dely,
          o.width < 0 &&
          (
            o.x = T3Gv.opt.actionBBox.x + T3Gv.opt.actionBBox.width,
            o.width = - o.width
          ),
          o.height < 0 &&
          (
            o.y = T3Gv.opt.actionBBox.y + T3Gv.opt.actionBBox.height,
            o.height = - o.height
          ),
          T3Gv.opt.actionNewBBox = $.extend(!0, {
          }, o),
          this.HandleActionTriggerCallResize(T3Gv.opt.actionNewBBox, !0, n);
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
            o.y = T3Gv.opt.actionBBox.y + T3Gv.opt.actionBBox.height,
            o.height = - o.height
          ),
          T3Gv.opt.actionNewBBox = $.extend(!0, {
          }, o),
          this.HandleActionTriggerCallResize(T3Gv.opt.actionNewBBox, !0, n);
        break;
      case ConstantData.ActionTriggerType.BOTTOMRIGHT:
        o.width = t - o.x,
          o.height = a - o.y,
          o.width < 0 &&
          (o.x = t, o.width = - o.width),
          o.height < 0 &&
          (o.y = a, o.height = - o.height),
          T3Gv.opt.actionNewBBox = $.extend(!0, {
          }, o),
          this.HandleActionTriggerCallResize(T3Gv.opt.actionNewBBox, !0, n);
        break;
      case ConstantData.ActionTriggerType.BOTTOMLEFT:
        o.height = a - o.y,
          delx = o.x - t,
          o.x = t,
          o.width += delx,
          o.width < 0 &&
          (
            o.x = T3Gv.opt.actionBBox.x + T3Gv.opt.actionBBox.width,
            o.width = - o.width
          ),
          o.height < 0 &&
          (o.y = a, o.height = - o.height),
          T3Gv.opt.actionNewBBox = $.extend(!0, {
          }, o),
          this.HandleActionTriggerCallResize(T3Gv.opt.actionNewBBox, !0, n)
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
        r = T3Gv.opt.actionBBox,
        i = T3Gv.opt.actionNewBBox,
        T3Gv.opt.actionBBox = Utils1.DeepCopy(this.Frame),
        T3Gv.opt.actionNewBBox = Utils1.DeepCopy(this.Frame),
        this.HandleActionTriggerCallResize(n, a, null),
        T3Gv.opt.actionBBox = r,
        T3Gv.opt.actionNewBBox = i,
        T3Gv.opt.AddToDirtyList(this.BlockID),
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
      T3Gv.opt.actionStoredObjectId === this.BlockID &&
      a &&
      T3Gv.opt.UpdateDisplayCoordinates(e, a, ConstantData.CursorTypes.Grow, this),
      t &&
      T3Gv.opt.actionSvgObject &&
      T3Gv.opt.actionStoredObjectId === this.BlockID
    ) {
      if (null == T3Gv.opt.actionSvgObject) return;
      let e = {
        action: t,
        prevBBox: this.prevBBox,
        trect: $.extend(!0, {
        }, this.trect)
      };

      this.UpdateDrawing(T3Gv.opt.actionSvgObject)
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
      T3Gv.opt.UnbindActionClickHammerEvents(),
      T3Gv.opt.isMobilePlatform ||
      (
        $(window).unbind('mousemove'),
        T3Gv.opt.WorkAreaHammer.on('tap', Evt_WorkAreaHammerClick)
      ),
      this.ResetAutoScrollTimer()
      // ,
      // Collab.AllowMessage()
    ) {
      var t = {
        attributes: {
        }
      };
      t.attributes.StyleRecord = Utils1.DeepCopy(T3Gv.opt.drawShape.StyleRecord),
        t.attributes.StartArrowID = T3Gv.opt.drawShape.StartArrowID,
        t.attributes.EndArrowID = T3Gv.opt.drawShape.EndArrowID,
        t.attributes.StartArrowDisp = T3Gv.opt.drawShape.StartArrowDisp,
        t.attributes.ArrowSizeIndex = T3Gv.opt.drawShape.ArrowSizeIndex,
        t.attributes.TextGrow = T3Gv.opt.drawShape.TextGrow,
        t.attributes.TextAlign = T3Gv.opt.drawShape.TextAlign,
        t.attributes.TextDirection = T3Gv.opt.drawShape.TextDirection,
        t.attributes.Dimensions = T3Gv.opt.drawShape.Dimensions,
        t.attributes.StartPoint = Utils1.DeepCopy(T3Gv.opt.drawShape.StartPoint),
        t.attributes.EndPoint = Utils1.DeepCopy(T3Gv.opt.drawShape.EndPoint),
        t.attributes.Frame = Utils1.DeepCopy(T3Gv.opt.drawShape.Frame),
        t.attributes.extraflags = ConstantData.ExtraFlags.SEDE_SideKnobs,
        this.pointlist &&
        (t.attributes.pointlist = Utils1.DeepCopy(this.pointlist)),
        t.LineTool = ShapeConstant.LineToolTypes.FreehandLine, false &&
        (t.CreateList = [
          T3Gv.opt.drawShape.BlockID
        ]),
        t.linkParams = Utils1.DeepCopy(T3Gv.opt.linkParams),
        t.Actions = [];
    }
    this.LM_DrawPostRelease(T3Gv.opt.actionStoredObjectId),
      T3Gv.opt.PostObjectDraw()
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
        T3Gv.opt.WorkAreaHammer.off('dragstart'),
        T3Gv.opt.isMobilePlatform ||
        (
          T3Gv.opt.WorkAreaHammer.on('drag', Evt_DrawTrackHandlerFactory(this)),
          T3Gv.opt.WorkAreaHammer.on('dragend', Evt_DrawReleaseHandlerFactory(this))
        )
    } catch (e) {
      this.LM_DrawClick_ExceptionCleanup(e);
      T3Gv.opt.ExceptionCleanup(e);
      throw e;
    }
  }

  /**
   * Writes the freehand line attributes to the Shape Format Util file
   * @param writer - The file writer object
   * @param options - Options for writing
   */
  WriteShapeData(outputStream, options) {
    console.log('S.FreehandLine.WriteShapeData - Input:', { outputStream, options });

    // Get a copy of freehand points (true means relative to frame)
    let freehandPoints = Utils1.DeepCopy(this).GetFreehandPoints(true);

    // Write the freehand line opcode
    let codePosition = ShapeDataUtil.WriteCode(outputStream, ShapeConstant.OpNameCode.cFreeHandLine);

    // Prepare the data structure
    let pointData,
      lineData = {
        InstID: this.BlockID,
        npts: freehandPoints.length,
        pts: []
      };

    // Convert all points
    let pointCount = freehandPoints.length;
    for (let i = 0; i < pointCount; i++) {
      pointData = new Point(freehandPoints[i].x, freehandPoints[i].y);
      lineData.pts.push(pointData);
    }

    // Write the structure to the file
    outputStream.writeStruct(ShapeConstant.FreehandLineStruct, lineData);
    ShapeDataUtil.WriteLength(outputStream, codePosition);

    console.log('S.FreehandLine.WriteShapeData - Output:', { freehandPoints });
  }
}

export default FreehandLine
