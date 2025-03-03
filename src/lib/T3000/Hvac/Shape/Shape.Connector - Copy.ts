





// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import HvacSVG from '../../Hvac.SVG.t2';





import BaseDrawingObject from './Shape.BaseDrawingObject'
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/GlobalData'
import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
import DefaultEvt from "../Event/DefaultEvt";
import Resources from '../Data/Resources'
import ListManager from '../Data/ListManager';
import Point from '../Model/Point';
// import Element from "../Basic/Basic.Element";


import Document from '../Basic/Basic.Document'

import Element from '../Basic/Basic.Element'
import ConstantData from '../Data/ConstantData'
import HitResult from '../Model/HitResult'
import Hook from '../Model/Hook'
import SelectionAttributes from '../Model/SelectionAttributes'
import RightClickData from '../Model/RightClickData'

import PathPoint from '../Model/PathPoint'
import Rectangle from '../Model/Rectangle'
import CRect from '../Model/CRect'
import StepRect from '../Model/StepRect'
import SEDAHook from '../Model/SEDAHook'
import SEDArray from '../Model/SEDArray'
import ConstantData1 from "../Data/ConstantData1"
import ArrowheadRecord from '../Model/ArrowheadRecord'


class Connector extends BaseDrawingObject {




  // constructor(e) {
  //   (e = e || {
  //   }).DrawingObjectBaseClass = ConstantData.DrawingObjectBaseClass.CONNECTOR,
  //     this.StartPoint = e.StartPoint ||
  //     {
  //       x: 0,
  //       y: 0
  //     },
  //     this.hoplist = e.hoplist ||
  //     {
  //       nhops: 0,
  //       hops: []
  //     },
  //     this.ArrowheadData = e.ArrowheadData ||
  //     [],
  //     this.StartArrowID = e.StartArrowID ||
  //     0,
  //     this.EndArrowID = e.EndArrowID ||
  //     0,
  //     this.StartArrowDisp = e.StartArrowDisp ||
  //     !1,
  //     this.EndArrowDisp = e.EndArrowDisp ||
  //     !1,
  //     this.ArrowSizeIndex = e.ArrowSizeIndex ||
  //     0,
  //     this.TextDirection = e.TextDirection ||
  //     !1,
  //     this.arraylist = e.arraylist ||
  //     new ListManager.SEDArray,
  //     null != e.styleflags ? this.arraylist.styleflags = e.styleflags : this.arraylist.styleflags = ConstantData.SEDA_Styles.SEDA_PerpConn | ConstantData.SEDA_Styles.SEDA_MinZero,
  //     null == e.arrayht ? this.arraylist.ht = ConstantData.ConnectorDefines.DefaultHt : this.arraylist.ht = e.arrayht,
  //     null == e.arraywd ? this.arraylist.wd = ConstantData.ConnectorDefines.DefaultWd : this.arraylist.wd = e.arraywd,
  //     this.vertical = e.vertical ||
  //     !1,
  //     this.arraylist.curveparam = e.curveparam ||
  //     0;
  //   var t = new ListManager.SEDAHook;
  //   t.startpoint.h = 0,
  //     t.startpoint.v = 0,
  //     t.endpoint.h = this.arraylist.wd,
  //     t.endpoint.v = 0,
  //     this.arraylist.hook.push(t),
  //     e.Frame &&
  //     (
  //       e.Frame.height = this.arraylist.ht,
  //       e.Frame.width = this.arraylist.wd
  //     ),
  //     e.EndPoint &&
  //     (
  //       e.EndPoint.x = this.arraylist.wd,
  //       e.EndPoint.y = this.arraylist.ht
  //     ),
  //     this.EndPoint = e.EndPoint ||
  //     {
  //       x: this.arraylist.wd,
  //       y: this.arraylist.ht
  //     },
  //     e.targflags = ConstantData.HookFlags.SED_LC_Shape,
  //     e.hookflags = ConstantData.HookFlags.SED_LC_Shape;
  //   var a = ListManager.BaseDrawingObject.apply(this, [
  //     e
  //   ]);
  //   if (
  //     this.theMinTextDim = {},
  //     this.theMinTextDim.width = 0,
  //     this.theMinTextDim.height = 0,
  //     this.TextFlags = Utils2.SetFlag(
  //       this.TextFlags,
  //       ConstantData.TextFlags.SED_TF_HorizText,
  //       !this.TextDirection
  //     ),
  //     a
  //   ) return a
  // }




  public StartPoint: { x: number, y: number };
  public hoplist: { nhops: number, hops: any[] };
  public ArrowheadData: any[];
  public StartArrowID: number;
  public EndArrowID: number;
  public StartArrowDisp: boolean;
  public EndArrowDisp: boolean;
  public ArrowSizeIndex: number;
  public TextDirection: boolean;
  public arraylist: any;
  public vertical: boolean;
  public arrayht: number;
  public arraywd: number;
  public curveparam: number;
  public theMinTextDim: { width: number, height: number };
  public TextFlags: number;
  public EndPoint: { x: number, y: number };


  constructor(e) {
    e = e || {};
    e.DrawingObjectBaseClass = ConstantData.DrawingObjectBaseClass.CONNECTOR;
    e.targflags = ConstantData.HookFlags.SED_LC_Shape;
    e.hookflags = ConstantData.HookFlags.SED_LC_Shape;




    // Double ===
    let arraylist = e.arraylist || new SEDArray();
    // this.arraylist = e.arraylist || new ListManager.SEDArray();

    if (e.styleflags != null) {
      arraylist.styleflags = e.styleflags;
    } else {
      arraylist.styleflags = ConstantData.SEDA_Styles.SEDA_PerpConn | ConstantData.SEDA_Styles.SEDA_MinZero;
    }

    arraylist.ht = e.arrayht == null ? ConstantData.ConnectorDefines.DefaultHt : e.arrayht;
    arraylist.wd = e.arraywd == null ? ConstantData.ConnectorDefines.DefaultWd : e.arraywd;

    arraylist.curveparam = e.curveparam || 0;

    var t = new SEDAHook();
    t.startpoint.h = 0;
    t.startpoint.v = 0;
    t.endpoint.h = arraylist.wd;
    t.endpoint.v = 0;
    arraylist.hook.push(t);

    if (e.Frame) {
      e.Frame.height = arraylist.ht;
      e.Frame.width = arraylist.wd;
    }

    if (e.EndPoint) {
      e.EndPoint.x = arraylist.wd;
      e.EndPoint.y = arraylist.ht;
    }

    // var a = ListManager.BaseDrawingObject.apply(this, [e]);

    super(e)

    this.arraylist = arraylist;

    this.StartPoint = e.StartPoint || { x: 0, y: 0 };
    this.hoplist = e.hoplist || { nhops: 0, hops: [] };
    this.ArrowheadData = e.ArrowheadData || [];
    this.StartArrowID = e.StartArrowID || 0;
    this.EndArrowID = e.EndArrowID || 0;
    this.StartArrowDisp = e.StartArrowDisp || false;
    this.EndArrowDisp = e.EndArrowDisp || false;
    this.ArrowSizeIndex = e.ArrowSizeIndex || 0;
    this.TextDirection = e.TextDirection || false;
    this.vertical = e.vertical || false;
    this.EndPoint = e.EndPoint || { x: this.arraylist.wd, y: this.arraylist.ht };


    // if (a) return a;

    this.theMinTextDim = { width: 0, height: 0 };
    this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_HorizText, !this.TextDirection);
  }












  // ListManager.Connector.prototype = new ListManager.BaseDrawingObject,
  //   ListManager.Connector.prototype.constructor = ListManager.Connector



  _IsChildOfAssistant() {
    if (this.hooks.length) {
      var e = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, !1);
      if (
        e &&
        e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR
      ) return e.IsAsstConnector()
    }
    return !1
  }



  LinkNotVisible() {
    var e,
      t = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_CoManager,
      a = this._IsChildOfAssistant();
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return !this.hooks.length ||
      !1 !== t ||
      !1 !== a ||
      !(e = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, !1)) ||
      !1 !== (e.flags & ConstantData.ObjFlags.SEDO_NotVisible)
  }



  GetTextOnLineParams(e) {
    var t = {
      Frame: new ListManager.Rect,
      StartPoint: new Point,
      EndPoint: new Point
    };
    return this.vertical ? (
      t.StartPoint.x = e.startpoint.v + this.StartPoint.x,
      t.StartPoint.y = e.startpoint.h + this.StartPoint.y,
      t.EndPoint.x = e.endpoint.v + this.StartPoint.x,
      t.EndPoint.y = e.endpoint.h + this.StartPoint.y
    ) : (
      t.StartPoint.x = e.startpoint.h + this.StartPoint.x,
      t.StartPoint.y = e.startpoint.v + this.StartPoint.y,
      t.EndPoint.x = e.endpoint.h + this.StartPoint.x,
      t.EndPoint.y = e.endpoint.v + this.StartPoint.y
    ),
      t.Frame = Utils1.DeepCopy(this.Frame),
      t
  }



  ChangeBackgroundColor(e, t) {
    if (
      this.StyleRecord.Fill.Paint.FillType !== ConstantData.FillTypes.SDFILL_TRANSPARENT &&
      this.StyleRecord.Fill.Paint.Color.toLowerCase() == t.toLowerCase()
    ) {
      GlobalData.optManager.GetObjectPtr(this.BlockID, !0);
      this.StyleRecord.Fill.Paint.Color = e,
        GlobalData.optManager.AddToDirtyList(this.BlockID)
    }
  }



  LM_AddSVGTextObject(e, t, a) {
    var r,
      i,
      n = {},
      o = {};
    void 0 === a &&
      (a = this.arraylist.lasttexthook),
      i = this.arraylist.hook[a],
      this.vertical ? (
        n.x = i.startpoint.v,
        n.y = i.startpoint.h,
        o.x = i.endpoint.v,
        o.y = i.endpoint.h,
        r = Utils2.Pt2Rect(n, o),
        Utils2.InflateRect(r, 20, 0)
      ) : (
        n.x = i.startpoint.h,
        n.y = i.startpoint.v,
        o.x = i.endpoint.h,
        o.y = i.endpoint.v,
        r = Utils2.Pt2Rect(n, o),
        Utils2.InflateRect(r, 0, 20)
      ),
      Utils2.Pt2Rect(n, o);
    var s = e.CreateShape(Document.CreateShapeType.RECT);
    s.SetID(ConstantData.SVGElementClass.TEXTBACKGROUND),
      s.SetUserData(a),
      s.SetStrokeWidth(0);
    var l = this.StyleRecord.Fill.Paint.Color;
    s.SetFillColor(l),
      this.StyleRecord.Fill.Paint.FillType === ConstantData.FillTypes.SDFILL_TRANSPARENT ? s.SetOpacity(0) : s.SetOpacity(this.StyleRecord.Fill.Paint.Opacity);
    var S = e.CreateShape(Document.CreateShapeType.TEXT);
    S.SetID(ConstantData.SVGElementClass.TEXT),
      S.SetUserData(a),
      S.SetRenderingEnabled(!1),
      S.SetSize(r.width, r.height),
      S.SetSpellCheck(this.AllowSpell()),
      S.InitDataSettings(this.fieldDataTableID, this.fieldDataElemID),
      t.AddElement(s),
      t.AddElement(S),
      t.isText = !0,
      a === this.arraylist.lasttexthook &&
      (t.textElem = S);
    var c = GlobalData.objectStore.GetObject(i.textid);
    c.Data.runtimeText ? (
      c.Data.runtimeText.vAlign = 'top',
      S.SetRuntimeText(c.Data.runtimeText)
    ) : (
      S.SetText(''),
      S.SetParagraphAlignment(this.TextAlign),
      S.SetVerticalAlignment('top')
    ),
      c.Data.runtimeText ||
      (c.Data.runtimeText = S.GetRuntimeText()),
      S.SetConstraints(GlobalData.optManager.theContentHeader.MaxWorkDim.x, 0, r.height),
      this.bInGroup &&
      S.DisableHyperlinks(!0),
      S.SetRenderingEnabled(!0),
      ListManager.BaseLine.prototype.TextDirectionCommon.call(this, S, s, !1, i),
      S.SetEditCallback(GlobalData.optManager.TextCallback, t)
  }



  CreateShape(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S = ConstantData.ConnectorDefines.SEDA_NSkip;
    GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    if (
      i = (
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_CoManager
      ) > 0,
      n = this._IsChildOfAssistant(),
      o = this._IsFlowChartConnector(),
      l = this.IsGenoConnector(),
      s = this.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_MAIN,
      !1,
      this.flags & ConstantData.ObjFlags.SEDO_NotVisible
    ) return this.hooks.length &&
      !1 === i &&
      !1 === n &&
      !1 === o &&
      !1 === s &&
      !1 === l &&
      (a = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, !1)) &&
      0 == (a.flags & ConstantData.ObjFlags.SEDO_NotVisible) ? (
      r = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER),
      this._CreateCollapseButton(e, r, !0),
      r.ExcludeFromExport(!0),
      r
    ) : null;
    var c = e.CreateShape(Document.CreateShapeType.POLYPOLYLINE);
    c.SetID(ConstantData.SVGElementClass.SHAPE);
    var u = e.CreateShape(Document.CreateShapeType.POLYPOLYLINE);
    u.SetID(ConstantData.SVGElementClass.SLOP),
      u.ExcludeFromExport(!0);
    var p = this.Frame,
      d = this.StyleRecord,
      D = (d.Fill.Paint.Color, d.Line.Paint.Color),
      g = d.Line.Thickness,
      h = d.Line.Paint.Opacity,
      m = d.Line.LinePattern,
      C = p.width,
      y = p.height;
    return (
      r = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER)
    ).SetSize(C, y),
      r.SetPos(this.Frame.x, this.Frame.y),
      c.SetSize(C, y),
      c.SetFillColor('none'),
      c.SetStrokeColor(D),
      c.SetStrokeOpacity(h),
      c.SetStrokeWidth(g),
      0 !== m &&
      c.SetStrokePattern(m),
      u.SetSize(C, y),
      u.SetStrokeColor('white'),
      u.SetFillColor('none'),
      u.SetOpacity(0),
      t ? u.SetEventBehavior(Element.EventBehavior.HIDDEN_OUT) : u.SetEventBehavior(Element.EventBehavior.NONE),
      u.SetStrokeWidth(g + ConstantData.Defines.SED_SlopShapeExtra),
      r.AddElement(c),
      r.AddElement(u),
      this.ApplyStyles(c, d),
      this.ApplyEffects(r, !1, !0),
      !1 === i &&
      !1 === n &&
      !1 === o &&
      !1 === s &&
      !1 === l &&
      this._CreateCollapseButton(e, r, !1),
      r.isShape = !0,
      this.arraylist.hook.length > S &&
      this.AddIcons(e, r),
      r
  }



  AddIcon(e, t, a) {
    if (t) {
      var r = this._IsFlowChartConnector(),
        i = this.Frame;
      this.nIcons;
      r ? this.hooks.length > 0 ? this.hooks[0].hookpt === ConstantData.HookPts.SED_LL ||
        this.hooks[0].hookpt === ConstantData.HookPts.SED_LT ? this.vertical ? (
          a.y = this.iconShapeRightOffset + this.nIcons * this.iconSize,
          a.x = i.width - this.iconShapeBottomOffset - this.iconSize
        ) : (
        a.x = this.iconShapeRightOffset + this.nIcons * this.iconSize,
        a.y = i.height - this.iconShapeBottomOffset - this.iconSize
      ) : (
        a.x = i.width - this.iconShapeRightOffset - this.iconSize - this.nIcons * this.iconSize,
        a.y = i.height - this.iconShapeBottomOffset - this.iconSize
      ) : this.arraylist.hook.length > ConstantData.ConnectorDefines.SEDA_NSkip + 1 &&
      (
        this.vertical ? (
          a.y = this.arraylist.hook[ConstantData.ConnectorDefines.SEDA_NSkip + 1].startpoint.h + this.iconShapeRightOffset + this.nIcons * this.iconSize,
          a.x = i.width - this.iconShapeBottomOffset - this.iconSize
        ) : (
          a.x = this.arraylist.hook[ConstantData.ConnectorDefines.SEDA_NSkip + 1].startpoint.h + this.iconShapeRightOffset + this.nIcons * this.iconSize,
          a.y = i.height - this.iconShapeBottomOffset - this.iconSize
        )
      ) : (
        a.x = i.width - this.iconShapeRightOffset - this.iconSize - this.nIcons * this.iconSize,
        a.y = i.height - this.iconShapeBottomOffset - this.iconSize
      );
      var n = this.GenericIcon(a);
      return this.nIcons++,
        t.AddElement(n),
        n
    }
  }



  PostCreateShapeCallback(e, t, a, r) {
    console.log('= S.Connector PostCreateShapeCallback e, t, a, r =', e, t, a, r);

    if (!(this.flags & ConstantData.ObjFlags.SEDO_NotVisible)) {
      var i,
        n,
        o = ConstantData.ConnectorDefines.SEDA_NSkip,
        s = t.GetElementByID(ConstantData.SVGElementClass.SHAPE),
        l = t.GetElementByID(ConstantData.SVGElementClass.SLOP),
        S = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, null),
        c = !1,
        u = 0;
      if (
        this.arraylist &&
        (
          (
            u = (n = this.arraylist.hook.length) - ConstantData.ConnectorDefines.SEDA_NSkip
          ) < 0 &&
          (u = 0),
          0 === u &&
          n >= o
        )
      ) for (i = 0; i < o; i++) this.arraylist.hook[i].id >= 0 &&
        u++;
      for (
        this.hooks.length &&
        (c = !0),
        !u &&
        c ||
        this.UpdateSVG(e, s, S),
        this.UpdateSVG(e, l, S),
        i = 0;
        i < n;
        i++
      ) this.arraylist.hook[i].textid >= 0 &&
        this.LM_AddSVGTextObject(e, t, i)
    }
  }



  SetRuntimeEffects(e) {
    var t = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    t &&
      this.ApplyEffects(t, e, !0)
  }



  ApplyStyles(e, t) {
    var a,
      r = t.Line.Paint.FillType;
    t.OutsideEffect.OutsideType,
      t.OutsideEffect.OutsideType,
      t.OutsideEffect.Color;
    if (
      e.SetStrokeOpacity(t.Line.Paint.Opacity),
      r == ConstantData.FillTypes.SDFILL_GRADIENT
    ) e.SetGradientStroke(
      this.CreateGradientRecord(
        t.Line.Paint.GradientFlags,
        t.Line.Paint.Color,
        t.Line.Paint.Opacity,
        t.Line.Paint.EndColor,
        t.Line.Paint.EndOpacity
      )
    );
    else if (r == ConstantData.FillTypes.SDFILL_RICHGRADIENT) e.SetGradientStroke(this.CreateRIchGradientRecord(t.Line.Paint.GradientFlags));
    else if (r == ConstantData.FillTypes.SDFILL_TEXTURE) {
      var i = {
        url: '',
        scale: t.Line.Paint.TextureScale.Scale,
        alignment: t.Line.Paint.TextureScale.AlignmentScalar
      };
      a = t.Line.Paint.Texture,
        i.dim = GlobalData.optManager.TextureList.Textures[a].dim,
        i.url = GlobalData.optManager.TextureList.Textures[a].ImageURL,
        i.url ||
        (
          i.url = Constants.FilePath_CMSRoot + Constants.FilePath_Textures + GlobalData.optManager.TextureList.Textures[a].filename
        ),
        e.SetTextureStroke(i)
    } else r == ConstantData.FillTypes.SDFILL_SOLID ? e.SetStrokeColor(t.Line.Paint.Color) : e.SetStrokeColor('none')
  }



  GetDimensionPoints() {
    //'use strict';
    var e,
      t = [],
      a = [],
      r = 0,
      i = 0,
      n = 0,
      o = 0,
      s = {},
      l = {};
    if (
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_EndPts
    ) t.push(
      new Point(
        this.StartPoint.x - this.Frame.x,
        this.StartPoint.y - this.Frame.y
      )
    ),
      t.push(
        new Point(this.EndPoint.x - this.Frame.x, this.EndPoint.y - this.Frame.y)
      );
    else if (this.Dimensions & ConstantData.DimensionFlags.SED_DF_Total) {
      for (
        a = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null),
        r = 1;
        r < a.length;
        r++
      ) n = Math.abs(a[r - 1].x - a[r].x),
        o = Math.abs(a[r - 1].y - a[r].y),
        i += Math.sqrt(n * n + o * o);
      var S = {
        x: this.Frame.width / 2,
        y: this.Frame.height / 2
      };
      s.x = S.x - i / 2,
        s.y = S.y,
        t.push(new Point(s.x, s.y)),
        l.x = S.x + i / 2,
        l.y = S.y,
        t.push(new Point(l.x, l.y)),
        e = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(
          new Point(0, 0),
          new Point(this.Frame.width, this.Frame.height)
        ),
        Utils3.RotatePointsAboutPoint(S, e, t)
    } else t = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null);
    return t
  }



  _FindTextLabel(e) {
    var t = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),
      a = ConstantData.ConnectorDefines.SEDA_NSkip,
      r = {},
      i = - 1,
      n = ConstantData.SEDA_Styles,
      o = this.arraylist.styleflags & n.SEDA_Linear,
      s = this.arraylist.styleflags & n.SEDA_FlowConn;
    if (e) {
      var l = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
        S = GlobalData.optManager.svgObjectLayer.FindElementByDOMElement(e.currentTarget);
      if (S) {
        var c = S.GetTargetForEvent(e),
          u = c.GetID();
        u !== ConstantData.SVGElementClass.TEXTBACKGROUND &&
          u !== ConstantData.SVGElementClass.TEXT ||
          (i = parseInt(c.GetUserData(), 10), o || i < a && (i = a))
      }
      if (i < 0 && this.arraylist.hook.length >= a) {
        var p = Utils3.LineDStyleHit(t, l, this.StyleRecord.Line.Thickness, 0, r);
        void 0 !== r.lpHit &&
          p &&
          (
            i = Math.round((r.lpHit - 0.1) / 2),
            o &&
            i === a &&
            (this.arraylist.hook.length >= a + 1 ? i++ : i = - 1)
          )
      }
    }
    return i < 0 &&
      (i = this.arraylist.lasttexthook),
      i < a &&
      this.arraylist.hook.length >= a &&
      (
        o &&
          s ? this.hooks.length > 0 ? i = this.hooks[0].hookpt === ConstantData.HookPts.SED_LR ||
            this.hooks[0].hookpt === ConstantData.HookPts.SED_LB ? ConstantData.ConnectorDefines.A_Cr : ConstantData.ConnectorDefines.A_Cl : this.arraylist.hook.length >= a + 1 &&
        (i = a + 1) : i < 0 &&
        this.arraylist.hook.length >= a &&
        (i = a)
      ),
      i
  }



  SetTextObject(e) {
    var t = ConstantData.ConnectorDefines.SEDA_NSkip,
      a = this.arraylist.lasttexthook,
      r = this.arraylist.hook.length,
      i = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
      n = SDF.TextAlignToWin(this.TextAlign),
      o = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    if (
      this.StyleRecord.Fill.Paint.Color = o.background.Paint.Color,
      n.vjust === FileParser.TextJust.TA_CENTER ? (
        this.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID,
        this.StyleRecord.Fill.Paint.Opacity = 1
      ) : this.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
      - 2 !== e
    ) return r >= t &&
      (
        i ? a = this._FindTextLabel() : a < t &&
          (a = t),
        a >= r &&
        (a = r - 1),
        this.arraylist.hook[a].textid = e,
        this.DataID = e,
        this.arraylist.lasttexthook = a,
        e < 0 &&
        (this.arraylist.lasttexthook = - 1),
        !0
      )
  }



  GetTextObject(e, t, a) {
    if (null == e && null != a) var r = a.hookindex;
    else {
      r = this._FindTextLabel(e);
      null != a &&
        (a.hookindex = r)
    }
    if (r < 0) return null;
    var i = this.arraylist.hook[r];
    if (void 0 === i) return null;
    this.DataID = i.textid,
      this.arraylist.lasttexthook = r;
    var n = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    return n &&
      (
        n.textElem = n.GetElementByID(ConstantData.SVGElementClass.TEXT, r)
      ),
      i.textid
  }



  AdjustTextEditBackground(e, t) {
    if (- 1 != this.DataID) {
      ConstantData.ConnectorDefines.SEDA_NSkip;
      var a = this.arraylist.hook.length;
      if (
        this.arraylist.lasttexthook >= 0 &&
        this.arraylist.lasttexthook < a
      ) {
        var r = this.arraylist.hook[this.arraylist.lasttexthook];
        if (t) var i = t;
        else i = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
        if (i) {
          var n = i.GetElementByID(
            ConstantData.SVGElementClass.TEXTBACKGROUND,
            this.arraylist.lasttexthook
          ),
            o = i.GetElementByID(
              ConstantData.SVGElementClass.TEXT,
              this.arraylist.lasttexthook
            );
          if (o && n) {
            var s = null == t;
            ListManager.BaseLine.prototype.TextDirectionCommon.call(this, o, n, s, r)
          }
        }
      }
    }
  }



  UpdateSVG(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l,
      S = ConstantData.SEDA_Styles;
    t.Clear();
    var c = this.arraylist.styleflags & S.SEDA_Linear,
      u = ConstantData1.ArrowheadLookupTable[this.StartArrowID],
      p = ConstantData1.ArrowheadLookupTable[this.EndArrowID],
      d = ConstantData1.ArrowheadSizeTable[this.ArrowSizeIndex];
    for (
      0 === u.id &&
      (u = null),
      0 === p.id &&
      (p = null),
      t.SetArrowheads(u, d, p, d, this.StartArrowDisp, this.EndArrowDisp),
      i = a.length,
      r = 0;
      r < i;
    ) {
      if (a[r].curvex || a[r].curvey) {
        s = [];
        var D,
          g = 1,
          h = 1;
        l = this.vertical,
          c &&
          (l = !l),
          l ? (
            a[r].curvey > 0 ? (D = a[r].curvey, a[r].curvex > 0 && (h = - 1), g = - 1) : (D = a[r].curvey, a[r].curvex < 0 && (h = - 1), a[r].curvey < 0 && (g = - 1)),
            s = GlobalData.optManager.Lines_AddCurve(l, g, h, a[r].x + a[r].curvex, a[r].y, D)
          ) : (
            a[r].curvex > 0 ? (D = a[r].curvex, a[r].curvey > 0 && (h = - 1), g = - 1) : (D = a[r].curvex, a[r].curvey < 0 && (h = - 1), a[r].curvex < 0 && (g = - 1)),
            s = GlobalData.optManager.Lines_AddCurve(l, g, h, a[r].x, a[r].y + a[r].curvey, D)
          ),
          t.AddPolyLine(s, !1, !1)
      }
      for (
        (s = []).push({
          x: a[r].x,
          y: a[r].y
        }),
        n = a[r].arrowhead,
        o = !1,
        r++;
        r < i &&
        !a[r].moveto;
      ) s.push({
        x: a[r].x,
        y: a[r].y
      }),
        (r == i - 1 || a[r + 1].moveto) &&
        (o = a[r].arrowhead),
        r++;
      s.length > 1 &&
        t.AddPolyLine(s, n, o)
    }
    t.BuildPath()
  }



  _CreateCollapseButton(e, t, a) {
    var r,
      i,
      n,
      o = ConstantData.Defines.SED_CKnobSize,
      s = ConstantData.SEDA_Styles,
      l = this.arraylist.styleflags & s.SEDA_ReverseCol,
      S = this.arraylist.styleflags & s.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & s.SEDA_PerpConn),
      c = this.arraylist.styleflags & s.SEDA_Radial &&
        !S,
      u = o,
      p = 0,
      d = 0,
      D = {},
      g = !1;
    if (
      this.arraylist &&
      (
        i = this.arraylist.hook.length - ConstantData.ConnectorDefines.SEDA_NSkip
      ) < 0 &&
      (i = 0),
      this.hooks.length
    ) {
      switch (
      g = !0,
      n = this.HookToPoint(this.hooks[0].hookpt, D),
      c ? this.vertical ? (d = 0, p = o) : (p = 0, d = o) : 0 === D.width ? d = o : p = o,
      this.hooks[0].hookpt
      ) {
        case ConstantData.HookPts.SED_LR:
        case ConstantData.HookPts.SED_LB:
          p = - p,
            d = - d
      }
      l &&
        (d = - d),
        n.x += p,
        n.y += d
    }
    if (0 !== i && g) {
      var h = {
        svgDoc: e,
        iconSize: u,
        imageURL: null,
        iconID: ConstantData.Defines.HitAreas,
        userData: ConstantData.HitAreaType.CONNECTOR_EXPAND,
        cursorType: Element.CursorType.ADD_PLUS
      };
      h.x = n.x - this.Frame.x - u / 2,
        h.y = n.y - this.Frame.y - u / 2,
        this.extraflags & ConstantData.ExtraFlags.SEDE_CollapseConn ? (
          h.imageURL = ConstantData.Defines.Connector_PlusPath,
          h.userData = ConstantData.HitAreaType.CONNECTOR_EXPAND
        ) : (
          h.imageURL = ConstantData.Defines.Connector_MinusPath,
          h.userData = ConstantData.HitAreaType.CONNECTOR_COLLAPSE
        ),
        r = this.GenericIcon(h),
        a &&
        (
          t.SetSize(u, u),
          t.SetPos(this.Frame.x, this.Frame.y),
          t.isShape = !0
        ),
        t.AddElement(r)
    }
  }



  CreateActionTriggers(e, t, a, r) {
    var i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m = 0,
      C = e.CreateShape(Document.CreateShapeType.GROUP),
      y = ConstantData.Defines.SED_KnobSize,
      f = ConstantData.SEDA_Styles,
      L = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_ReverseCol,
      I = ConstantData.HookPts,
      T = ConstantData.ConnectorDefines,
      b = e.docInfo.docToScreenScale;
    e.docInfo.docScale <= 0.5 &&
      (b *= 2);
    var M = y / b;
    e.docInfo.docScale;
    if (
      !(
        (
          p = this.arraylist &&
            this.arraylist.hook ? this.arraylist.hook.length : 0
        ) <= ConstantData.ConnectorDefines.SEDA_NSkip &&
        this.objecttype !== ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH
      )
    ) {
      n = this.arraylist.styleflags & f.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & f.SEDA_PerpConn),
        s = this.arraylist.styleflags & f.SEDA_Linear;
      var P = (this.arraylist.styleflags & f.SEDA_BothSides) > 0,
        R = (l = this.Frame).width,
        A = l.height,
        _ = GlobalData.optManager.GetObjectPtr(t, !1);
      R += M,
        A += M;
      var E = $.extend(!0, {
      }, l);
      E.x -= M / 2,
        E.y -= M / 2,
        E.width += M,
        E.height += M,
        this.vertical ? (
          D = Element.CursorType.RESIZE_TB,
          d = Element.CursorType.RESIZE_LR
        ) : (
          d = Element.CursorType.RESIZE_TB,
          D = Element.CursorType.RESIZE_LR
        ),
        c = L ? - 1 : 1;
      var w = {
        svgDoc: e,
        shapeType: Document.CreateShapeType.RECT,
        knobSize: M,
        fillColor: 'black',
        fillOpacity: 1,
        strokeSize: 1,
        strokeColor: '#777777',
        cursorType: D
      };
      if (
        t != r &&
        (
          w.fillColor = 'white',
          w.fillOpacity = 0,
          w.strokeSize = 1,
          w.strokeColor = 'black'
        ),
        this.flags & ConstantData.ObjFlags.SEDO_Lock ? (w.fillColor = 'gray', w.locked = !0) : this.NoGrow() &&
          (
            w.fillColor = 'red',
            sideknobs = !1,
            w.strokeColor = 'red',
            d = Element.CursorType.DEFAULT,
            D = Element.CursorType.DEFAULT
          ),
        function (e) {
          if (
            e.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH &&
            e.hooks.length
          ) switch (e.hooks[0].hookpt) {
            case I.SED_LL:
            case I.SED_LT:
              return !1;
            default:
              return !0
          }
          return !0
        }(this) &&
        (
          w.x = this.StartPoint.x - l.x,
          w.y = this.StartPoint.y - l.y,
          _.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH &&
          (
            i = this.arraylist.hook[T.A_Cl],
            w.x += i.endpoint.v - i.startpoint.v,
            w.y += i.endpoint.h - i.startpoint.h
          ),
          w.knobID = ConstantData.ActionTriggerType.LINESTART,
          g = u = this.GenericKnob(w),
          C.AddElement(u)
        ),
        function (e) {
          if (
            e.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH &&
            e.hooks.length
          ) switch (e.hooks[0].hookpt) {
            case I.SED_LR:
            case I.SED_LB:
              return !1;
            default:
              return !0
          }
          return !0
        }(this) &&
        (
          w.x = this.EndPoint.x - l.x,
          w.y = this.EndPoint.y - l.y,
          _.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH &&
          (
            i = this.arraylist.hook[T.A_Cr],
            w.x += i.endpoint.v - i.startpoint.v,
            w.y += i.endpoint.h - i.startpoint.h
          ),
          w.knobID = ConstantData.ActionTriggerType.LINEEND,
          h = u = this.GenericKnob(w),
          C.AddElement(u)
        ),
        _ &&
        _.hooks &&
        p > 1 &&
        _.objecttype !== ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH
      ) for (m = 0, S = 0; S < _.hooks.length; S++) {
        if (knobCopy = $.extend(!0, {
        }, w), n) {
          switch (_.hooks[S].hookpt) {
            case ConstantData.HookPts.SED_LL:
            case ConstantData.HookPts.SED_LT:
              m = ConstantData.ConnectorDefines.A_Cl,
                C.RemoveElement(g);
              break;
            default:
              m = ConstantData.ConnectorDefines.A_Cr,
                C.RemoveElement(h)
          }
          w.cursorType = D,
            w.shapeType = Document.CreateShapeType.OVAL,
            w.fillColor = 'white',
            w.fillOpacity = 0.01,
            w.strokeSize = 1,
            w.strokeColor = 'green'
        } else m = ConstantData.ConnectorDefines.A_Cl,
          w.cursorType = d;
        m > 0 &&
          (
            i = this.arraylist.hook[m],
            this.vertical ? (
              w.x = i.startpoint.v + this.StartPoint.x - l.x,
              w.y = i.startpoint.h + this.StartPoint.y - l.y,
              n &&
              (w.y += c * (i.endpoint.h - i.startpoint.h) / 2)
            ) : (
              w.x = i.startpoint.h + this.StartPoint.x - l.x,
              w.y = i.startpoint.v + this.StartPoint.y - l.y,
              n &&
              (w.x += c * (i.endpoint.h - i.startpoint.h) / 2)
            ),
            w.knobID = ConstantData.ActionTriggerType.CONNECTOR_HOOK,
            (u = this.GenericKnob(w)).SetUserData(m),
            C.AddElement(u),
            w = $.extend(!0, {
            }, knobCopy)
          )
      }
      if (
        !s &&
        function (e) {
          return e.objecttype !== ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_MAIN
        }(this)
      ) for (
          w.shapeType = Document.CreateShapeType.RECT,
          w.cursorType = d,
          S = ConstantData.ConnectorDefines.SEDA_NSkip;
          S < p;
          S++
        ) i = this.arraylist.hook[S],
          this.vertical ? (
            w.x = i.endpoint.v + this.StartPoint.x - l.x,
            w.y = c * i.endpoint.h + this.StartPoint.y - l.y
          ) : (
            w.x = i.endpoint.h + this.StartPoint.x - l.x,
            w.y = i.endpoint.v + this.StartPoint.y - l.y
          ),
          w.knobID = ConstantData.ActionTriggerType.CONNECTOR_PERP,
          (u = this.GenericKnob(w)).SetUserData(S - ConstantData.ConnectorDefines.SEDA_NSkip),
          C.AddElement(u);
      var F = this.Pr_GetStubIndex();
      if (
        function (e) {
          return e.objecttype !== ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH
        }(this)
      ) for (
          w.shapeType = Document.CreateShapeType.OVAL,
          S = ConstantData.ConnectorDefines.SEDA_NSkip + 1;
          S < p &&
          (s || n || !(p - ConstantData.ConnectorDefines.SEDA_NSkip <= 2)) &&
          !(P && ++S >= p);
          S++
        ) if (
            i = this.arraylist.hook[S - 1],
            o = this.arraylist.hook[S],
            w.cursorType = D,
            w.shapeType = Document.CreateShapeType.OVAL,
            w.fillColor = 'white',
            w.fillOpacity = 0.01,
            w.strokeSize = 1,
            w.strokeColor = 'green',
            this.vertical ? s ? (
              F === T.A_Cr ? w.y = (o.startpoint.h + o.endpoint.h) / 2 + this.StartPoint.y - l.y - o.extra / 2 : w.y = (o.startpoint.h + o.endpoint.h) / 2 + this.StartPoint.y - l.y + o.extra / 2,
              w.x = i.startpoint.v + this.StartPoint.x - l.x
            ) : (
              w.y = c * (i.endpoint.h + o.endpoint.h) / 2 + this.StartPoint.y - l.y + c * o.extra / 2,
              w.x = i.startpoint.v + this.StartPoint.x - l.x + (o.startpoint.v - i.startpoint.v) / 2 + c * o.extra / 2 * this.arraylist.angle
            ) : s ? (
              F === T.A_Cr ? w.x = (o.startpoint.h + o.endpoint.h) / 2 + this.StartPoint.x - l.x - o.extra / 2 : w.x = (o.startpoint.h + o.endpoint.h) / 2 + this.StartPoint.x - l.x + o.extra / 2,
              w.y = i.startpoint.v + this.StartPoint.y - l.y
            ) : (
              w.x = (i.endpoint.h + o.endpoint.h) / 2 + this.StartPoint.x - l.x + o.extra / 2,
              w.y = i.startpoint.v + this.StartPoint.y - l.y
            ),
            w.knobID = ConstantData.ActionTriggerType.CONNECTOR_ADJ,
            (u = this.GenericKnob(w)).SetUserData(S),
            C.AddElement(u),
            this.AllowTextEdit()
          ) {
            var v = u.DOMElement(),
              G = Hammer(v);
            SDJS_LM_ShapeDoubleTap = Evt_ShapeDoubleTapFactory(this),
              G.on('doubletap', SDJS_LM_ShapeDoubleTap)
          }
      return C.SetSize(R, A),
        C.SetPos(E.x, E.y),
        C.isShape = !0,
        C.SetID(ConstantData.Defines.Action + t),
        C
    }
  }



  CreateConnectHilites(e, t, a, r, i, n) {
    var o = ConstantData.SEDA_Styles,
      s = e.CreateShape(Document.CreateShapeType.GROUP),
      l = e.docInfo.docToScreenScale;
    e.docInfo.docScale <= 0.5 &&
      (l *= 2);
    var S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C = ConstantData.Defines.CONNECTPT_DIM / l,
      y = (e.docInfo.docScale, [
        {
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 0
        }
      ]);
    if (
      null != (
        m = this.GetTargetPoints(
          null,
          ConstantData.HookFlags.SED_LC_NoSnaps | ConstantData.HookFlags.SED_LC_HookNoExtra,
          i
        )
      )
    ) {
      var f = this.GetPerimPts(t, m, null, !0, null, i);
      d = this.arraylist.hook.length - ConstantData.ConnectorDefines.SEDA_NSkip;
      var L = this.Frame,
        I = L.width,
        T = L.height,
        b = $.extend(!0, {
        }, L);
      b.x -= C / 2,
        b.y -= C / 2,
        b.width += C,
        b.height += C,
        I += C,
        T += C;
      var M = {
        svgDoc: e,
        shapeType: Document.CreateShapeType.OVAL,
        x: 0,
        y: 0,
        knobSize: C,
        fillColor: 'black',
        fillOpacity: 1,
        strokeSize: 1,
        strokeColor: '#777777',
        KnobID: 0,
        cursorType: Element.CursorType.ANCHOR
      };
      u = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear;
      var P = this.arraylist.styleflags & o.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & o.SEDA_PerpConn);
      D = this.arraylist.styleflags & o.SEDA_Radial &&
        !P;
      var R = (this.arraylist.styleflags & o.SEDA_BothSides) > 0,
        A = this.arraylist.angle;
      D &&
        d > 0 &&
        (
          g = this.vertical ? {
            x: this.StartPoint.x - this.Frame.x,
            y: this.StartPoint.y - this.Frame.y + this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl].startpoint.h
          }
            : {
              x: this.StartPoint.x - this.Frame.x + this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl].startpoint.h,
              y: this.StartPoint.y - this.Frame.y
            }
        );
      for (var _ = 0; _ < f.length; _++) {
        if (
          M.x = f[_].x - this.Frame.x,
          M.y = f[_].y - this.Frame.y,
          y.length = 2,
          S = this.GenericKnob(M),
          p = !1,
          this.vertical
        ) if (0 === _) d <= 0 ? P ? (
          y[0].x = this.StartPoint.x - this.Frame.x + C / 2,
          y[0].y = this.StartPoint.y - this.Frame.y,
          y[1].x = this.StartPoint.x - this.Frame.x + C / 2,
          y[1].y = this.EndPoint.y - this.Frame.y,
          y.push(new Point(M.x + C / 2, M.y + C / 2)),
          p = !0
        ) : (
          y[0].x = this.StartPoint.x - this.Frame.x,
          y[0].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[1].x = this.EndPoint.x - this.Frame.x,
          y[1].y = this.StartPoint.y - this.Frame.y + C / 2,
          y.push(new Point(M.x + C / 2, M.y + C / 2)),
          p = !0
        ) : D ? (y[0].x = g.x, y[0].y = g.y, y[1].x = M.x + C / 2, y[1].y = M.y + C / 2, p = !0) : (
          h = 0,
          this.arraylist.angle &&
          (h = M.y * this.arraylist.angle),
          y[0].x = this.StartPoint.x - this.Frame.x + C / 2 + h,
          y[0].y = this.StartPoint.y - this.Frame.y,
          y[1].x = this.StartPoint.x - this.Frame.x + C / 2 + h,
          y[1].y = M.y + C / 2,
          y.push(new Point(M.x + C / 2, M.y + C / 2)),
          (R || A) &&
          y.shift(),
          p = !0
        );
          else if (_ === d && 0 === D) this.arraylist.angle &&
            (h = M.y * this.arraylist.angle),
            y[0].x = this.StartPoint.x - this.Frame.x + C / 2 + h,
            y[0].y = this.EndPoint.y - this.Frame.y,
            y[1].x = this.StartPoint.x - this.Frame.x + C / 2 + h,
            y[1].y = M.y + C / 2,
            y.push(new Point(M.x + C / 2, M.y + C / 2)),
            (R || A) &&
            y.shift(),
            p = !0;
          else if (u) f[_].x != this.StartPoint.x &&
            (
              y[0].x = this.StartPoint.x - this.Frame.x + C / 2,
              y[0].y = M.y + C / 2,
              y[1].y = M.y + C / 2,
              y[1].x = M.x + C / 2,
              p = !0
            );
          else if (D) {
            switch (m[_].y) {
              case ConstantData.ConnectorDefines.SEDAC_ABOVE:
                y[0].x = this.StartPoint.x - this.Frame.x - this.arraylist.ht,
                  y[0].y = M.y + C / 2,
                  y[1].x = M.x + C / 2,
                  y[1].y = M.y + C / 2;
                break;
              case ConstantData.ConnectorDefines.SEDAC_BELOW:
                y[0].x = this.StartPoint.x - this.Frame.x + this.arraylist.ht,
                  y[0].y = M.y + C / 2,
                  y[1].x = M.x + C / 2,
                  y[1].y = M.y + C / 2;
                break;
              default:
                y[0].x = g.x,
                  y[0].y = g.y,
                  y[1].x = M.x + C / 2,
                  y[1].y = M.y + C / 2
            }
            p = !0
          } else h = 0,
            this.arraylist.angle &&
            (h = M.y * this.arraylist.angle),
            y[0].x = this.StartPoint.x - this.Frame.x + C / 2 + h,
            y[0].y = M.y + C / 2,
            y[1].y = M.y + C / 2,
            y[1].x = M.x + C / 2,
            p = !0;
        else if (0, 0 === _) d <= 0 ? P ? (
          y[0].x = this.StartPoint.x - this.Frame.x,
          y[0].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[1].x = this.EndPoint.x - this.Frame.x,
          y[1].y = this.StartPoint.y - this.Frame.y + C / 2,
          y.push(new Point(M.x + C / 2, M.y + C / 2)),
          p = !0
        ) : (
          y[0].x = this.StartPoint.x - this.Frame.x + C / 2,
          y[0].y = this.StartPoint.y - this.Frame.y,
          y[1].x = this.StartPoint.x - this.Frame.x + C / 2,
          y[1].y = this.EndPoint.y - this.Frame.y,
          y.push(new Point(M.x + C / 2, M.y + C / 2)),
          p = !0
        ) : D ? (y[0].x = g.x, y[0].y = g.y, y[1].x = M.x + C / 2, y[1].y = M.y + C / 2) : (
          y[0].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[0].x = this.StartPoint.x - this.Frame.x,
          y[1].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[1].x = M.x + C / 2,
          u ||
          y.push(new Point(M.x + C / 2, M.y + C / 2))
        ),
          p = !0;
        else if (_ === d && 0 === D) y[0].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[0].x = this.EndPoint.x - this.Frame.x,
          y[1].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[1].x = M.x + C / 2,
          u ||
          y.push(new Point(M.x + C / 2, M.y + C / 2)),
          (R || A) &&
          y.shift(),
          p = !0;
        else if (u) f[_].y != this.StartPoint.y &&
          (
            y[0].y = this.StartPoint.y - this.Frame.y + C / 2,
            y[0].x = M.x + C / 2,
            y[1].y = M.y + C / 2,
            y[1].x = M.x + C / 2,
            p = !0
          );
        else if (D) {
          switch (m[_].y) {
            case ConstantData.ConnectorDefines.SEDAC_ABOVE:
              y[0].y = this.StartPoint.y - this.Frame.y - this.arraylist.ht,
                y[0].x = M.x + C / 2,
                y[1].x = M.x + C / 2,
                y[1].y = M.y + C / 2;
              break;
            case ConstantData.ConnectorDefines.SEDAC_BELOW:
              y[0].y = this.StartPoint.y - this.Frame.y + this.arraylist.ht,
                y[0].x = M.x + C / 2,
                y[1].x = M.x + C / 2,
                y[1].y = M.y + C / 2;
              break;
            default:
              y[0].x = g.x,
                y[0].y = g.y,
                y[1].x = M.x + C / 2,
                y[1].y = M.y + C / 2
          }
          p = !0
        } else y[0].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[0].x = M.x + C / 2,
          y[1].y = M.y + C / 2,
          y[1].x = M.x + C / 2,
          p = !0;
        s.AddElement(S),
          p &&
          (
            c = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.POLYLINE)
          ) &&
          (
            c.SetPoints(y),
            c.SetFillColor('none'),
            c.SetStrokeColor('black'),
            c.SetStrokePattern('2,2'),
            c.SetStrokeWidth(1),
            s.AddElement(c)
          )
      }
      return s.SetSize(I, T),
        s.SetPos(b.x, b.y),
        s.isShape = !0,
        s.SetID('hilite_' + t),
        s
    }
  }



  SetCursors() {
    var e,
      t = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    ListManager.BaseDrawingObject.prototype.SetCursors.call(this),
      GlobalData.optManager.GetEditMode() == ConstantData.EditState.DEFAULT &&
      t &&
      (e = t.GetElementByID(ConstantData.Defines.HitAreas)) &&
      e.SetCursor(Element.CursorType.ADD_PLUS)
  }



  GetArrowheadSelection(e) {
    return e &&
      (
        e.StartArrowID = this.StartArrowID,
        e.StartArrowDisp = this.StartArrowDisp,
        e.EndArrowID = this.EndArrowID,
        e.EndArrowDisp = this.EndArrowDisp,
        e.ArrowSizeIndex = this.ArrowSizeIndex
      ),
      !0
  }



  RightClick(e) {
    var t,
      a = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
      r = (
        new HitResult(- 1, 0, null),
        GlobalData.optManager.svgObjectLayer.FindElementByDOMElement(e.currentTarget)
      );
    if (!GlobalData.optManager.SelectObjectFromClick(e, r)) return !1;
    var i = r.GetID();
    if (t = GlobalData.optManager.GetObjectPtr(i, !1)) {
      if (t.GetTextObject() >= 0) {
        var n = r.textElem;
        if (n) (
          p = n.GetSpellAtLocation(e.gesture.center.clientX, e.gesture.center.clientY)
        ) >= 0 &&
          GlobalData.optManager.ActivateTextEdit(r, e, !0)
      }
      var o = ConstantData.SEDA_Styles,
        s = t.arraylist.styleflags & o.SEDA_CoManager,
        l = (t.arraylist.styleflags & o.SEDA_PerpConn) > 0,
        S = ConstantData.ConnectorDefines.SEDA_NSkip,
        c = t.arraylist.hook.length;
      l &&
        c > S + 1,
        s &&
        !0
    }
    if (
      GlobalData.optManager.RightClickParams = new RightClickData(),
      GlobalData.optManager.RightClickParams.TargetID = r.GetID(),
      GlobalData.optManager.RightClickParams.HitPt.x = a.x,
      GlobalData.optManager.RightClickParams.HitPt.y = a.y,
      GlobalData.optManager.RightClickParams.Locked = (this.flags & ConstantData.ObjFlags.SEDO_Lock) > 0,
      null != GlobalData.optManager.GetActiveTextEdit()
    ) {
      var u = GlobalData.optManager.svgDoc.GetActiveEdit(),
        p = - 1;
      u &&
        (
          p = u.GetSpellAtLocation(e.gesture.center.clientX, e.gesture.center.clientY)
        ),
        p >= 0 ? GlobalData.optManager.svgDoc.GetSpellCheck().ShowSpellMenu(u, p, e.gesture.center.clientX, e.gesture.center.clientY) : Commands.MainController.ShowContextualMenu(
          Resources.Controls.ContextMenus.TextMenu.Id.toLowerCase(),
          e.gesture.center.clientX,
          e.gesture.center.clientY
        )
    } else Commands.MainController.ShowContextualMenu(
      Resources.Controls.ContextMenus.Connector.Id.toLowerCase(),
      e.gesture.center.clientX,
      e.gesture.center.clientY
    )
  }



  HitAreaClick(e) {
    GlobalData.optManager.CloseEdit();
    var t = this;
    if (Collab.AllowMessage()) {
      Collab.BeginSecondaryEdit();
      var a = {
        BlockID: this.BlockID,
        theHitAreaID: e
      };
      t = GlobalData.optManager.GetObjectPtr(t.BlockID, !1)
    }
    switch (e) {
      case ConstantData.HitAreaType.CONNECTOR_COLLAPSE:
        t._CollapseConnector(!0, !1, !0);
        break;
      case ConstantData.HitAreaType.CONNECTOR_EXPAND:
        t._CollapseConnector(!1, !1, !0)
    }
    Business.FindTreeTop(
      t,
      ConstantData.LinkFlags.SED_L_MOVE,
      {
        topconnector: - 1,
        topshape: - 1,
        foundtree: !1
      }
    ),
      Collab.AllowMessage() &&
      Collab.BuildMessage(ConstantData.CollabMessages.HitAreaClick, a, !1, !1),
      GlobalData.optManager.CompleteOperation(null)
  }



  GetPolyPoints(e, t, a, r, i) {
    var n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C = [],
      y = {},
      f = ConstantData.SEDA_Styles,
      L = this.arraylist.styleflags & f.SEDA_CoManager,
      I = (this.arraylist.styleflags & f.SEDA_PerpConn) > 0,
      T = this.arraylist.styleflags & f.SEDA_StartLeft,
      b = this.IsAsstConnector(),
      M = ConstantData.ConnectorDefines.SEDA_NSkip,
      P = this.arraylist.styleflags & f.SEDA_ReverseCol,
      R = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
      A = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn &&
        R,
      _ = 0 !== this.arraylist.angle,
      E = ConstantData.ConnectorDefines.A_Cl,
      w = ConstantData.ConnectorDefines.A_Cr,
      F = this.StartArrowID > 0,
      v = 0 == this.EndArrowID > 0 &&
        1 == F,
      G = !1,
      N = this.arraylist.curveparam,
      k = 0;
    o = this.arraylist.hook.length,
      t ? (
        y.x = this.StartPoint.x - this.Frame.x,
        y.y = this.StartPoint.y - this.Frame.y
      ) : y = this.StartPoint;
    var U = o == M + 1 &&
      0 == (this.arraylist.styleflags & f.SEDA_PerpConn),
      J = {
        index: - 1,
        left: !1
      };
    if (this.AllowCurveOnConnector(J) && (o > M + 1 || U) && N > 0 && !a) {
      k = N;
      var x = this.arraylist.ht - function (e) {
        var t,
          a = 0;
        for (n = 0; n < o; n++) if ((t = e.arraylist.hook[n]).comanagerht > a) {
          a = t.comanagerht;
          break
        }
        return a
      }(this);
      x < 0 &&
        (x = 0),
        b &&
          !this.vertical ? k > this.arraylist.wd &&
        (k = this.arraylist.wd) : k > x &&
        (k = x)
    }
    if (this.vertical) {
      for (d = P ? - 1 : 1, S = this.arraylist.ht, n = 0; n < o; n++) if (
        h = this.arraylist.hook[n],
        D = Utils2.IsEqual(h.startpoint.v + y.x, h.endpoint.v + y.x) &&
        Utils2.IsEqual(d * h.startpoint.h + y.y, d * h.endpoint.h + y.y),
        p = (n >= M || A) &&
        !L &&
        !b &&
        !D &&
        !G,
        n !== E ||
        !v ||
        D ||
        A ||
        _ ||
        (p = !0, G = !0),
        n === M &&
        p &&
        F &&
        A &&
        (p = !1),
        p &&
        n === E
      ) g = !1,
        A &&
        o > M &&
        !F &&
        (
          m = this.arraylist.hook[M],
          g = !Utils2.IsEqual(m.startpoint.h + y.x, m.endpoint.h + y.x) &&
          Utils2.IsEqual(m.startpoint.v + y.y, m.endpoint.v + y.y)
        ),
        g &&
        (p = !1),
        b &&
          k &&
          n === E ? (
          C.push(
            new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !0, p)
          ),
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.v + y.x - k, d * h.startpoint.h + y.y, !1, p)
          ) : C.push(
            new PathPoint(h.startpoint.v + y.x + k, d * h.startpoint.h + y.y, !1, p)
          )
        ) : k &&
          n === E &&
          U ? (
          C.push(
            new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !0, p)
          ),
          C.push(
            new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y - d * k, !1, p)
          )
        ) : (
          C.push(
            new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !0, p)
          ),
          C.push(
            new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y, !1, p)
          )
        );
      else if (n === J.index && k) {
        var O = 1;
        this.arraylist.hook[E].endpoint.v > 0 &&
          (O = - 1),
          J.left ? (
            C.push(
              new PathPoint(h.startpoint.v + y.x, h.startpoint.h + y.y + k, !0, p, - O * k, k)
            ),
            C.push(
              new PathPoint(h.endpoint.v + y.x, h.endpoint.h + y.y - 2 * k, !1, p)
            )
          ) : (
            C.push(
              new PathPoint(h.startpoint.v + y.x, h.startpoint.h + y.y + k, !0, p, - O * k, - k)
            ),
            C.push(
              new PathPoint(h.endpoint.v + y.x, h.endpoint.h + y.y, !1, p)
            )
          )
      } else if (k && n === E && U) C.push(
        new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y - d * k, !0, p)
      ),
        C.push(
          new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !1, p)
        );
      else if (k && 0 === n) {
        if (
          h.endpoint.v === h.startpoint.v &&
          h.endpoint.h === h.startpoint.h &&
          b
        ) {
          C.push(
            new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y, !0, p)
          ),
            C.push(
              new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !1, p)
            );
          continue
        }
        I ? C.push(
          new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y + k, !0, p)
        ) : U ? C.push(
          new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y - k, !0, p)
        ) : C.push(
          new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y, !0, p)
        );
        var B = d * k;
        U &&
          (B = k),
          C.push(
            new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y - B, !1, p)
          )
      } else k &&
        n === M &&
        I ? (
        B = k,
        h.endpoint.h === h.startpoint.h &&
        h.endpoint.v === h.startpoint.v &&
        (B = 0),
        h.endpoint.v < 0 ? C.push(
          new PathPoint(h.startpoint.v + y.x - B, d * h.startpoint.h + y.y, !0, p, B, B)
        ) : C.push(
          new PathPoint(h.startpoint.v + y.x + B, d * h.startpoint.h + y.y, !0, p, - B, B)
        ),
        C.push(
          new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !1, p)
        )
      ) : k &&
        n === o - 1 &&
        0 === R ? (
        h.endpoint.v < 0 ? C.push(
          new PathPoint(h.startpoint.v + y.x - k, d * h.startpoint.h + y.y, !0, p, k, - d * k)
        ) : C.push(
          new PathPoint(h.startpoint.v + y.x + k, d * h.startpoint.h + y.y, !0, p, - k, - d * k)
        ),
        C.push(
          new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !1, p)
        )
      ) : b &&
        k &&
        n === E ? (
        h.endpoint.v < 0 ? C.push(
          new PathPoint(h.startpoint.v + y.x - k, d * h.startpoint.h + y.y, !0, p)
        ) : C.push(
          new PathPoint(h.startpoint.v + y.x + k, d * h.startpoint.h + y.y, !0, p)
        ),
        C.push(
          new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !1, p)
        )
      ) : (
        C.push(
          new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y, !0, p)
        ),
        C.push(
          new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !1, p)
        )
      );
      if (L) for (
        T ? (s = this.arraylist.coprofile.v, u = - 1) : (s = this.arraylist.coprofile.vdist, u = 1),
        n = 0;
        n < o;
        n++
      ) h = this.arraylist.hook[n],
        l = (c = T ? h.pr.v : h.pr.vdist) ? s - (c + 2 * S) : 0,
        k &&
          0 === n ? (
          C.push(
            new PathPoint(h.startpoint.v + y.x + u * s, h.startpoint.h + y.y + k, !0, !1)
          ),
          C.push(
            new PathPoint(- h.endpoint.v - u * l + y.x + u * s, h.endpoint.h + y.y - k, !1, !1)
          )
        ) : k &&
          n === M ? (
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.v + y.x + u * s + k, h.startpoint.h + y.y, !0, !1, - k, k)
          ) : C.push(
            new PathPoint(h.startpoint.v + y.x + u * s - k, h.startpoint.h + y.y, !0, !1, k, k)
          ),
          C.push(
            new PathPoint(- h.endpoint.v - u * l + y.x + u * s, h.endpoint.h + y.y, !1, !1)
          )
        ) : k &&
          n === o - 1 ? (
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.v + y.x + u * s + k, h.startpoint.h + y.y, !0, !1, - k, - k)
          ) : C.push(
            new PathPoint(h.startpoint.v + y.x + u * s - k, h.startpoint.h + y.y, !0, !1, k, - k)
          ),
          C.push(
            new PathPoint(- h.endpoint.v - u * l + y.x + u * s, h.endpoint.h + y.y, !1, !1)
          )
        ) : (
          C.push(
            new PathPoint(h.startpoint.v + y.x + u * s, h.startpoint.h + y.y, !0, !1)
          ),
          C.push(
            new PathPoint(- h.endpoint.v - u * l + y.x + u * s, h.endpoint.h + y.y, !1, !1)
          )
        )
    } else {
      for (S = this.arraylist.ht, n = 0; n < o; n++) h = this.arraylist.hook[n],
        D = Utils2.IsEqual(h.startpoint.h + y.x, h.endpoint.h + y.x) &&
        Utils2.IsEqual(h.startpoint.v + y.y, h.endpoint.v + y.y),
        p = (n >= M || A) &&
        !L &&
        !b &&
        !D &&
        !G,
        n !== E ||
        !v ||
        D ||
        A ||
        _ ||
        (p = !0, G = !0),
        n === M &&
        p &&
        F &&
        A &&
        (p = !1),
        n !== w ||
        this.objecttype != ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_MAIN ||
        !v ||
        D ||
        A ||
        _ ||
        (
          p = !0,
          C.push(
            new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !0, p)
          ),
          C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y, !1, p)
          )
        ),
        n === J.index &&
          k ? (
          d = this.arraylist.hook[E].endpoint.v < 0 ? 1 : - 1,
          J.left ? (
            C.push(
              new PathPoint(h.startpoint.h + y.x + k, h.startpoint.v + y.y, !0, p, k, - d * k)
            ),
            C.push(
              new PathPoint(h.endpoint.h + y.x - 2 * k, h.endpoint.v + y.y, !1, p)
            )
          ) : (
            C.push(
              new PathPoint(h.startpoint.h + y.x + k, h.startpoint.v + y.y, !0, p, - k, - d * k)
            ),
            C.push(
              new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !1, p)
            )
          )
        ) : p &&
          n === E ? (
          g = !1,
          A &&
          o > M &&
          !F &&
          (
            m = this.arraylist.hook[M],
            g = !Utils2.IsEqual(m.startpoint.h + y.x, m.endpoint.h + y.x) &&
            Utils2.IsEqual(m.startpoint.v + y.y, m.endpoint.v + y.y)
          ),
          g &&
          (p = !1),
          b &&
            k ? (
            d = this.arraylist.hook[E].endpoint.v < 0 ? 1 : - 1,
            C.push(
              new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !0, p)
            ),
            C.push(
              new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y - d * k, !1, p)
            )
          ) : (
            C.push(
              new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !0, p)
            ),
            C.push(
              new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y, !1, p)
            )
          )
        ) : k &&
          0 === n ? (
          B = k,
          h.endpoint.v === h.startpoint.v &&
          h.endpoint.h === h.startpoint.h &&
          b &&
          (B = 0),
          C.push(
            new PathPoint(h.startpoint.h + y.x + B, h.startpoint.v + y.y, !0, p)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x - B, h.endpoint.v + y.y, !1, p)
          )
        ) : k &&
          n === M ? (
          B = k,
          h.endpoint.h === h.startpoint.h &&
          h.endpoint.v === h.startpoint.v &&
          (B = 0),
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y - B, !0, p, B, B)
          ) : C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + B, !0, p, B, - B)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !1, p)
          )
        ) : k &&
          n === o - 1 &&
          0 === R ? (
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y - k, !0, p, - k, k)
          ) : C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + k, !0, p, - k, - k)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !1, p)
          )
        ) : b &&
          k &&
          n === E ? (
          d = this.arraylist.hook[E].endpoint.v < 0 ? 1 : - 1,
          C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y - d * k, !0, p)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !1, p)
          )
        ) : (
          C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y, !0, p)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !1, p)
          )
        );
      if (L) for (
        T ? (s = this.arraylist.coprofile.v, u = - 1) : (s = this.arraylist.coprofile.vdist, u = 1),
        n = 0;
        n < o;
        n++
      ) h = this.arraylist.hook[n],
        l = (c = T ? h.pr.v : h.pr.vdist) ? s - (c + 2 * S) : 0,
        k &&
          0 === n ? (
          C.push(
            new PathPoint(h.startpoint.h + y.x + k, h.startpoint.v + y.y + u * s, !0, !1)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x - k, - h.endpoint.v - u * l + y.y + u * s, !1, !1)
          )
        ) : k &&
          n === M ? (
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + u * s + k, !0, !1, k, - k)
          ) : C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + u * s - k, !0, !1, k, k)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, - h.endpoint.v - u * l + y.y + u * s, !1, !1)
          )
        ) : k &&
          n === o - 1 ? (
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + u * s + k, !0, !1, - k, - k)
          ) : C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + u * s - k, !0, !1, - k, k)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, - h.endpoint.v - u * l + y.y + u * s, !1, !1)
          )
        ) : (
          C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + u * s, !0, !1)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, - h.endpoint.v - u * l + y.y + u * s, !1, !1)
          )
        )
    }
    return C
  }



  OffsetShape(e, t, a) {
    this.Frame.x += e,
      this.Frame.y += t,
      this.r.x += e,
      this.r.y += t,
      this.inside.x += e,
      this.inside.y += t,
      this.trect.x += e,
      this.trect.y += t,
      this.StartPoint.x += e,
      this.StartPoint.y += t,
      this.EndPoint.x += e,
      this.EndPoint.y += t
  }



  CalcFrame() {
    var e = [],
      t = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear;
    this.arraylist ? (
      e = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
      t &&
      e.push(this.EndPoint),
      e &&
      e.length &&
      Utils2.GetPolyRect(this.Frame, e)
    ) : this.Frame = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      this.UpdateFrame(this.Frame)
  }



  GetDimensions() {
    var e = {},
      t = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
      a = (
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides
      ) > 0;
    return this.vertical ? (
      e.y = this.arraylist.hook[0].endpoint.h - this.arraylist.hook[0].startpoint.h,
      t ? e.x = 0 : (e.x = this.arraylist.ht, a && (e.x /= 2))
    ) : (
      e.x = this.arraylist.hook[0].endpoint.h - this.arraylist.hook[0].startpoint.h,
      t ? e.y = 0 : (e.y = this.arraylist.ht, a && (e.y /= 2))
    ),
      e
  }



  CanSnapToShapes() {
    //'use strict';
    return this._IsFlowChartConnector() &&
      0 === this.hooks.length &&
      this.arraylist.hook.length === ConstantData.ConnectorDefines.SEDA_NSkip + 1 ? this.arraylist.hook[ConstantData.ConnectorDefines.SEDA_NSkip].id : - 1
  }



  ScaleObject(e, t, a, r, i, n, o) {
    ListManager.BaseLine.prototype.ScaleObject.call(this, e, t, a, r, i, n, o);
    var s = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides ||
      0 == (
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_PerpConn
      ),
      l = ConstantData.ConnectorDefines,
      S = this.arraylist.hook.length,
      c = l.SEDA_NSkip;
    this.vertical ? (
      this.arraylist.ht = this.arraylist.ht * i,
      this.arraylist.wd = this.arraylist.wd * n,
      S >= c &&
      (
        s ? (
          this.arraylist.hook[l.A_Cl].gap &&
          (
            this.arraylist.hook[l.A_Cl].gap = this.arraylist.hook[l.A_Cl].gap * n
          ),
          this.arraylist.hook[l.A_Cr].gap &&
          (
            this.arraylist.hook[l.A_Cr].gap = this.arraylist.hook[l.A_Cr].gap * n
          )
        ) : (
          this.arraylist.hook[l.A_Cl].gap &&
          (
            this.arraylist.hook[l.A_Cl].gap = this.arraylist.hook[l.A_Cl].gap * i
          ),
          this.arraylist.hook[l.A_Cr].gap &&
          (
            this.arraylist.hook[l.A_Cr].gap = this.arraylist.hook[l.A_Cr].gap * i
          )
        )
      )
    ) : (
      this.arraylist.wd = this.arraylist.wd * i,
      this.arraylist.ht = this.arraylist.ht * n,
      S >= c &&
      (
        s ? (
          this.arraylist.hook[l.A_Cl].gap &&
          (
            this.arraylist.hook[l.A_Cl].gap = this.arraylist.hook[l.A_Cl].gap * i
          ),
          this.arraylist.hook[l.A_Cr].gap &&
          (
            this.arraylist.hook[l.A_Cr].gap = this.arraylist.hook[l.A_Cr].gap * i
          )
        ) : (
          this.arraylist.hook[l.A_Cl].gap &&
          (
            this.arraylist.hook[l.A_Cl].gap = this.arraylist.hook[l.A_Cl].gap * n
          ),
          this.arraylist.hook[l.A_Cr].gap &&
          (
            this.arraylist.hook[l.A_Cr].gap = this.arraylist.hook[l.A_Cr].gap * n
          )
        )
      )
    ),
      this.rflags &&
      (
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !1
        )
      )
  }



  SetSize(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l = ConstantData.SEDA_Styles,
      S = (this.arraylist.styleflags & l.SEDA_BothSides) > 0,
      c = (this.arraylist.styleflags & l.SEDA_Linear) > 0;
    s = this.arraylist.hook.length - ConstantData.ConnectorDefines.SEDA_NSkip,
      r = this.Pr_GetNBackBoneSegments(),
      o = this.GetDimensions(),
      S &&
      (r % 2 && r++, r /= 2),
      this.vertical ? (
        t &&
        s > 1 &&
        (
          n = t - o.y,
          this.arraylist.wd += n / r,
          this.arraylist.wd < 0 &&
          (this.arraylist.wd = 0)
        ),
        e &&
        !c &&
        (this.arraylist.ht = e, S && (this.arraylist.ht /= 2))
      ) : (
        e &&
        s > 1 &&
        (
          i = e - o.x,
          this.arraylist.wd += i / r,
          this.arraylist.wd < 0 &&
          (this.arraylist.wd = 0)
        ),
        t &&
        !c &&
        (this.arraylist.ht = t, S && (this.arraylist.ht /= 2))
      ),
      this.Pr_Format(this.BlockID),
      this.rflags &&
      (
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !1
        )
      ),
      GlobalData.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE)
  }



  UpdateFrame(e) {
    var t,
      a = {},
      r = (
        this.arraylist.styleflags,
        ConstantData.SEDA_Styles.SEDA_Linear,
        this.arraylist.styleflags,
        ConstantData.SEDA_Styles.SEDA_StartLeft,
        this.arraylist.styleflags,
        ConstantData.SEDA_Styles.SEDA_FlowConn,
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides ||
        0 == (
          this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_PerpConn
        )
      );
    this.arraylist.styleflags,
      ConstantData.SEDA_Styles.SEDA_Radial;
    if (
      a = e ||
      this.Frame,
      ListManager.BaseDrawingObject.prototype.UpdateFrame.call(this, a),
      gListManager
    ) {
      var n = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      if (null !== n) {
        var o = this.GetSVGFrame(),
          s = n.GetElementByID(ConstantData.SVGElementClass.SHAPE);
        if (s) {
          var l = s.GetArrowheadBounds();
          if (l && l.length) for (len = l.length, i = 0; i < len; i++) l[i].x += o.x,
            l[i].y += o.y,
            this.r = Utils2.UnionRect(l[i], this.r, this.r)
        }
      }
    }
    if (this.StyleRecord) {
      (t = this.StyleRecord.Line.Thickness / 2) < ConstantData.Defines.SED_MinWid &&
        (t = ConstantData.Defines.SED_MinWid),
        Utils2.InflateRect(this.r, t / 2, t / 2);
      var S = this.CalcEffectSettings(this.Frame, this.StyleRecord, !1);
      S &&
        Utils2.Add2Rect(this.r, S.extent)
    }
  }



  GetHitTestFrame() {
    var e = {},
      t = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
      a = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_StartLeft,
      r = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn,
      i = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides ||
        0 == (
          this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_PerpConn
        ),
      n = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Radial &&
        !i;
    return t &&
      r ? this.vertical ? (
        slop = ConstantData.Defines.SED_FlowConnectorSlop,
        vslop = ConstantData.Defines.SED_ConnectorSlop
      ) : (
      slop = ConstantData.Defines.SED_ConnectorSlop,
      vslop = ConstantData.Defines.SED_FlowConnectorSlop
    ) : (slop = ConstantData.Defines.SED_ConnectorSlop, vslop = slop),
      e = Utils1.DeepCopy(this.Frame),
      Utils2.InflateRect(e, slop, vslop),
      n &&
      (
        extraradial = r ? ConstantData.Defines.SED_FlowRadialSlop : ConstantData.Defines.SED_ConnectorSlop,
        this.vertical ? a ? (e.x -= extraradial, e.width += extraradial) : e.width += extraradial : a ? (e.y -= extraradial, e.height += extraradial) : e.height += extraradial
      ),
      e = Utils2.UnionRect(this.r, e, e)
  }



  GetMoveRect(e, t) {
    var a = {};
    if (1 === this.arraylist.hook.length) return Utils2.CopyRect(a, this.Frame),
      a.height = 0,
      a.width = 0,
      a;
    if (t) {
      Utils2.CopyRect(a, this.Frame),
        Utils2.InflateRect(
          a,
          0 + this.StyleRecord.Line.Thickness / 2,
          0 + this.StyleRecord.Line.Thickness / 2
        )
    } else Utils2.CopyRect(a, this.Frame);
    return a
  }



  SetShapeOrigin(e, t) {
    var a = 0,
      r = 0;
    null != e &&
      (a = e - this.Frame.x),
      null != t &&
      (r = t - this.Frame.y),
      this.OffsetShape(a, r)
  }



  Hit(e, t, a, r) {
    if (this.IsCoManager()) return 0;
    if (t) {
      if (Utils2.pointInRect(this.r, e)) return ConstantData.HitCodes.SED_Border
    } else {
      var i = this.GetHitTestFrame();
      if (Utils2.pointInRect(i, e)) return ConstantData.HitCodes.SED_Border
    }
    return 0
  }



  PreventLink() {
    return !!this.hooks.length
  }



  HandleActionTriggerTrackCommon(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C,
      y,
      f,
      L,
      I,
      T,
      b = 0,
      M = 0,
      P = 0,
      R = ConstantData.SEDA_Styles,
      A = 0,
      _ = 0,
      E = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_ReverseCol,
      w = (
        new SelectionAttributes(),
        ConstantData.ConnectorDefines
      ),
      F = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    if (
      null != this.arraylist &&
      null != this.arraylist.hook &&
      !((a = this.arraylist.hook.length) < 1)
    ) {
      var v = GlobalData.optManager.theActionSVGObject,
        G = v.GetElementByID(ConstantData.SVGElementClass.SHAPE),
        N = v.GetElementByID(ConstantData.SVGElementClass.SLOP),
        k = $.extend(!0, {
        }, this.Frame);
      s = this.arraylist.styleflags & R.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & R.SEDA_PerpConn),
        c = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides &&
        0 == (
          this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Stagger
        );
      var U = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Stagger &&
        this.vertical;
      S = this.arraylist.styleflags & R.SEDA_StartLeft,
        u = this.arraylist.styleflags & R.SEDA_Linear,
        d = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn,
        this.vertical ? (
          b = t - GlobalData.optManager.theActionStartY,
          M = e - GlobalData.optManager.theActionStartX
        ) : (
          b = e - GlobalData.optManager.theActionStartX,
          M = t - GlobalData.optManager.theActionStartY
        ),
        L = this.arraylist.ht,
        I = this.arraylist.wd;
      var J = this.Pr_GetStubIndex(),
        x = this.Pr_GetEndShapeIndex(),
        O = u &&
          J === w.A_Cr;
      switch (
      i = this.Pr_GetNBackBoneSegments(),
      c &&
      (i % 2 && i++, i /= 2),
      0 !== J &&
      i++,
      0 !== x &&
      i++,
      GlobalData.optManager.theActionTriggerID
      ) {
        case ConstantData.ActionTriggerType.CONNECTOR_ADJ:
          (E || O) &&
            (b = - b),
            (f = GlobalData.optManager.OldConnectorExtra + b) < - GlobalData.optManager.OldConnectorWd &&
            (f = - GlobalData.optManager.OldConnectorWd),
            b = f - this.arraylist.hook[GlobalData.optManager.theActionTriggerData].extra,
            this.arraylist.hook[GlobalData.optManager.theActionTriggerData].extra = f,
            c &&
            GlobalData.optManager.theActionTriggerData < this.arraylist.hook.length - 1 &&
            (
              this.arraylist.hook[GlobalData.optManager.theActionTriggerData + 1].extra = f
            ),
            (E || O) &&
            (b = - b),
            M = 0;
          break;
        case ConstantData.ActionTriggerType.LINESTART:
          b = - b,
            n = I,
            (I = GlobalData.optManager.OldConnectorWd + b / i) < 0 &&
            (I = 0),
            o = (b = I - n) * i,
            this.vertical ? k.height += o : k.width += o,
            b = - b,
            M = 0;
          break;
        case ConstantData.ActionTriggerType.LINEEND:
          E &&
            (b = - b),
            n = I,
            (I = GlobalData.optManager.OldConnectorWd + b / i) < 0 &&
            (I = 0),
            b = I - n,
            this.vertical ? k.height += b * i : k.width += b * i,
            E &&
            (b = - b),
            M = 0;
          break;
        case ConstantData.ActionTriggerType.CONNECTOR_PERP:
          n = L,
            (c && GlobalData.optManager.theActionTriggerData % 2 || U && S) &&
            (M = - M),
            (S && c || S) &&
            (M = - M),
            (L = GlobalData.optManager.OldConnectorHt + M) < 0 &&
            (L = 0),
            M = L - n,
            (S && c || S) &&
            (M = - M),
            b = 0;
          break;
        case ConstantData.ActionTriggerType.CONNECTOR_HOOK:
          n = (r = this.arraylist.hook[GlobalData.optManager.theActionTriggerData]).gap,
            P = s ? b : M,
            E ? P = - P : S ? s ||
              (P = - P) : GlobalData.optManager.theActionTriggerData === ConstantData.ConnectorDefines.A_Cr &&
            (P = - P),
            r.gap = GlobalData.optManager.OldConnectorGap + P,
            p = GlobalData.optManager.OldConnectorExtra + P,
            r.gap < 0 &&
            (r.gap = 0),
            d &&
            0 === r.gap &&
            (r.gap = 0.01),
            p < 0 &&
            (p = 0),
            P = r.gap - n,
            u &&
            !s &&
            (r.extra = p),
            u &&
            (
              F.moreflags & ConstantData.SessionMoreFlags.SEDSM_Swimlane_Rows ||
              F.moreflags & ConstantData.SessionMoreFlags.SEDSM_Swimlane_Cols
            ) &&
            (r.extra = p),
            E ? P = - P : S ? s ||
              (P = - P) : GlobalData.optManager.theActionTriggerData === ConstantData.ConnectorDefines.A_Cr &&
            (P = - P),
            M = 0,
            b = 0,
            s ? (
              E ? r.startpoint.h -= P : r.startpoint.h += P,
              this.vertical ? (A = 0, _ = P) : (_ = 0, A = P)
            ) : (r.startpoint.v += P, this.vertical ? (_ = 0, A = P) : (A = 0, _ = P));
          break;
        default:
          return M = 0,
            void (b = 0)
      }
      this.arraylist.ht = L,
        this.arraylist.wd = I;
      var B,
        H,
        V = this.Pr_AdjustFormat(
          b,
          M,
          P,
          GlobalData.optManager.theActionTriggerID,
          GlobalData.optManager.theActionTriggerData,
          i,
          J,
          x
        );
      if (
        V &&
        (V.linelen, B = V.linestart, H = V.linedisp),
        0 === P &&
        (this.vertical ? (A = M, _ = b) : (A = b, _ = M)),
        v
      ) {
        var j = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, null);
        if (
          v.SetSize(k.width, k.height),
          v.SetPos(k.x, k.y),
          G.SetSize(k.width, k.height),
          this.UpdateSVG(GlobalData.optManager.svgDoc, G, j),
          N.SetSize(k.width, k.height),
          this.UpdateSVG(GlobalData.optManager.svgDoc, N, j),
          GlobalData.optManager.ConnectorList
        ) switch (
          a = GlobalData.optManager.ConnectorList.length,
          GlobalData.optManager.theActionTriggerID
          ) {
            case ConstantData.ActionTriggerType.CONNECTOR_ADJ:
              for (this.arraylist.angle && (A = _ * this.arraylist.angle), l = 0; l < a; l++) {
                if (g = GlobalData.optManager.ConnectorList[l].locallist) for (h = g.length, m = 0; m < h; m++) D = g[m].GetPos(),
                  g[m].SetPos(D.x + A, D.y + _);
                if (c && l < a - 1 && (l++, g = GlobalData.optManager.ConnectorList[l].locallist)) for (h = g.length, m = 0; m < h; m++) D = g[m].GetPos(),
                  g[m].SetPos(D.x + A, D.y + _)
              }
              break;
            case ConstantData.ActionTriggerType.LINEEND:
            case ConstantData.ActionTriggerType.LINESTART:
              this.arraylist.angle &&
                (A = _ * this.arraylist.angle),
                C = A,
                y = _;
              var z,
                W = - 1;
              GlobalData.optManager.theActionTriggerID === ConstantData.ActionTriggerType.LINEEND &&
                a > 0 &&
                this.arraylist.hook[w.A_Cr].id >= 0 &&
                (W = w.A_Cr),
                GlobalData.optManager.theActionTriggerID === ConstantData.ActionTriggerType.LINESTART &&
                a > 0 &&
                this.arraylist.hook[w.A_Cl].id >= 0 &&
                (W = w.A_Cl);
              var q = c &&
                this.arraylist.hook.length % 2 == 0 &&
                GlobalData.optManager.theActionTriggerID === ConstantData.ActionTriggerType.LINESTART;
              for (l = 0; l < a; l++) {
                if (
                  g = GlobalData.optManager.ConnectorList[l].locallist,
                  z = GlobalData.optManager.ConnectorList[l].Index,
                  g
                ) for (
                    B &&
                    null != B[z] &&
                    (
                      this.vertical ? (
                        D = g[0].GetPos(),
                        y = H[z],
                        this.arraylist.angle &&
                        (C = y * this.arraylist.angle)
                      ) : (D = g[0].GetPos(), C = H[z])
                    ),
                    h = g.length,
                    m = 0;
                    m < h;
                    m++
                  ) D = g[m].GetPos(),
                    g[m].SetPos(D.x + C, D.y + y);
                if (
                  c &&
                  l < a - 1 &&
                  !q &&
                  W !== GlobalData.optManager.ConnectorList[l + 1].Index &&
                  (l++, g = GlobalData.optManager.ConnectorList[l].locallist)
                ) for (h = g.length, m = 0; m < h; m++) D = g[m].GetPos(),
                  g[m].SetPos(D.x + C, D.y + y);
                q = !1,
                  C += A,
                  y += _
              }
              var K = {
                x: this.Frame.x,
                y: this.Frame.y,
                width: T.x,
                height: T.y
              },
                X = {
                  x: e,
                  y: t
                };
              GlobalData.optManager.UpdateDisplayCoordinates(K, X, ConstantData.CursorTypes.Grow, this);
              break;
            case ConstantData.ActionTriggerType.CONNECTOR_PERP:
              var Y = 0;
              for (this._GetTilt() && (Y = - _), l = 0; l < a; l++) D = GlobalData.optManager.ConnectorList[l].GetPos(),
                !(!c && !U) &&
                  (
                    this.vertical ? this.arraylist.angle ? l % 2 : D.x < this.StartPoint.x : D.y < this.StartPoint.y
                  ) ? GlobalData.optManager.ConnectorList[l].SetPos(D.x - A + Y, D.y - _) : GlobalData.optManager.ConnectorList[l].SetPos(D.x + A + Y, D.y + _);
              K = {
                x: this.Frame.x,
                y: this.Frame.y,
                width: T.x,
                height: T.y
              },
                X = {
                  x: e,
                  y: t
                };
              GlobalData.optManager.UpdateDisplayCoordinates(K, X, ConstantData.CursorTypes.Grow, this);
              break;
            default:
              for (l = 0; l < a; l++) D = GlobalData.optManager.ConnectorList[l].GetPos(),
                GlobalData.optManager.ConnectorList[l].SetPos(D.x + A, D.y + _)
          }
      }
    }
  }



  CreateConnectHilites(e, t, a, r, i, n) {
    var o = ConstantData.SEDA_Styles,
      s = e.CreateShape(Document.CreateShapeType.GROUP),
      l = e.docInfo.docToScreenScale;
    e.docInfo.docScale <= 0.5 &&
      (l *= 2);
    var S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C = ConstantData.Defines.CONNECTPT_DIM / l,
      y = (e.docInfo.docScale, [
        {
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 0
        }
      ]);
    if (
      null != (
        m = this.GetTargetPoints(
          null,
          ConstantData.HookFlags.SED_LC_NoSnaps | ConstantData.HookFlags.SED_LC_HookNoExtra,
          i
        )
      )
    ) {
      var f = this.GetPerimPts(t, m, null, !0, null, i);
      d = this.arraylist.hook.length - ConstantData.ConnectorDefines.SEDA_NSkip;
      var L = this.Frame,
        I = L.width,
        T = L.height,
        b = $.extend(!0, {
        }, L);
      b.x -= C / 2,
        b.y -= C / 2,
        b.width += C,
        b.height += C,
        I += C,
        T += C;
      var M = {
        svgDoc: e,
        shapeType: Document.CreateShapeType.OVAL,
        x: 0,
        y: 0,
        knobSize: C,
        fillColor: 'black',
        fillOpacity: 1,
        strokeSize: 1,
        strokeColor: '#777777',
        KnobID: 0,
        cursorType: Element.CursorType.ANCHOR
      };
      u = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear;
      var P = this.arraylist.styleflags & o.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & o.SEDA_PerpConn);
      D = this.arraylist.styleflags & o.SEDA_Radial &&
        !P;
      var R = (this.arraylist.styleflags & o.SEDA_BothSides) > 0,
        A = this.arraylist.angle;
      D &&
        d > 0 &&
        (
          g = this.vertical ? {
            x: this.StartPoint.x - this.Frame.x,
            y: this.StartPoint.y - this.Frame.y + this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl].startpoint.h
          }
            : {
              x: this.StartPoint.x - this.Frame.x + this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl].startpoint.h,
              y: this.StartPoint.y - this.Frame.y
            }
        );
      for (var _ = 0; _ < f.length; _++) {
        if (
          M.x = f[_].x - this.Frame.x,
          M.y = f[_].y - this.Frame.y,
          y.length = 2,
          S = this.GenericKnob(M),
          p = !1,
          this.vertical
        ) if (0 === _) d <= 0 ? P ? (
          y[0].x = this.StartPoint.x - this.Frame.x + C / 2,
          y[0].y = this.StartPoint.y - this.Frame.y,
          y[1].x = this.StartPoint.x - this.Frame.x + C / 2,
          y[1].y = this.EndPoint.y - this.Frame.y,
          y.push(new Point(M.x + C / 2, M.y + C / 2)),
          p = !0
        ) : (
          y[0].x = this.StartPoint.x - this.Frame.x,
          y[0].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[1].x = this.EndPoint.x - this.Frame.x,
          y[1].y = this.StartPoint.y - this.Frame.y + C / 2,
          y.push(new Point(M.x + C / 2, M.y + C / 2)),
          p = !0
        ) : D ? (y[0].x = g.x, y[0].y = g.y, y[1].x = M.x + C / 2, y[1].y = M.y + C / 2, p = !0) : (
          h = 0,
          this.arraylist.angle &&
          (h = M.y * this.arraylist.angle),
          y[0].x = this.StartPoint.x - this.Frame.x + C / 2 + h,
          y[0].y = this.StartPoint.y - this.Frame.y,
          y[1].x = this.StartPoint.x - this.Frame.x + C / 2 + h,
          y[1].y = M.y + C / 2,
          y.push(new Point(M.x + C / 2, M.y + C / 2)),
          (R || A) &&
          y.shift(),
          p = !0
        );
          else if (_ === d && 0 === D) this.arraylist.angle &&
            (h = M.y * this.arraylist.angle),
            y[0].x = this.StartPoint.x - this.Frame.x + C / 2 + h,
            y[0].y = this.EndPoint.y - this.Frame.y,
            y[1].x = this.StartPoint.x - this.Frame.x + C / 2 + h,
            y[1].y = M.y + C / 2,
            y.push(new Point(M.x + C / 2, M.y + C / 2)),
            (R || A) &&
            y.shift(),
            p = !0;
          else if (u) f[_].x != this.StartPoint.x &&
            (
              y[0].x = this.StartPoint.x - this.Frame.x + C / 2,
              y[0].y = M.y + C / 2,
              y[1].y = M.y + C / 2,
              y[1].x = M.x + C / 2,
              p = !0
            );
          else if (D) {
            switch (m[_].y) {
              case ConstantData.ConnectorDefines.SEDAC_ABOVE:
                y[0].x = this.StartPoint.x - this.Frame.x - this.arraylist.ht,
                  y[0].y = M.y + C / 2,
                  y[1].x = M.x + C / 2,
                  y[1].y = M.y + C / 2;
                break;
              case ConstantData.ConnectorDefines.SEDAC_BELOW:
                y[0].x = this.StartPoint.x - this.Frame.x + this.arraylist.ht,
                  y[0].y = M.y + C / 2,
                  y[1].x = M.x + C / 2,
                  y[1].y = M.y + C / 2;
                break;
              default:
                y[0].x = g.x,
                  y[0].y = g.y,
                  y[1].x = M.x + C / 2,
                  y[1].y = M.y + C / 2
            }
            p = !0
          } else h = 0,
            this.arraylist.angle &&
            (h = M.y * this.arraylist.angle),
            y[0].x = this.StartPoint.x - this.Frame.x + C / 2 + h,
            y[0].y = M.y + C / 2,
            y[1].y = M.y + C / 2,
            y[1].x = M.x + C / 2,
            p = !0;
        else if (0, 0 === _) d <= 0 ? P ? (
          y[0].x = this.StartPoint.x - this.Frame.x,
          y[0].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[1].x = this.EndPoint.x - this.Frame.x,
          y[1].y = this.StartPoint.y - this.Frame.y + C / 2,
          y.push(new Point(M.x + C / 2, M.y + C / 2)),
          p = !0
        ) : (
          y[0].x = this.StartPoint.x - this.Frame.x + C / 2,
          y[0].y = this.StartPoint.y - this.Frame.y,
          y[1].x = this.StartPoint.x - this.Frame.x + C / 2,
          y[1].y = this.EndPoint.y - this.Frame.y,
          y.push(new Point(M.x + C / 2, M.y + C / 2)),
          p = !0
        ) : D ? (y[0].x = g.x, y[0].y = g.y, y[1].x = M.x + C / 2, y[1].y = M.y + C / 2) : (
          y[0].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[0].x = this.StartPoint.x - this.Frame.x,
          y[1].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[1].x = M.x + C / 2,
          u ||
          y.push(new Point(M.x + C / 2, M.y + C / 2))
        ),
          p = !0;
        else if (_ === d && 0 === D) y[0].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[0].x = this.EndPoint.x - this.Frame.x,
          y[1].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[1].x = M.x + C / 2,
          u ||
          y.push(new Point(M.x + C / 2, M.y + C / 2)),
          (R || A) &&
          y.shift(),
          p = !0;
        else if (u) f[_].y != this.StartPoint.y &&
          (
            y[0].y = this.StartPoint.y - this.Frame.y + C / 2,
            y[0].x = M.x + C / 2,
            y[1].y = M.y + C / 2,
            y[1].x = M.x + C / 2,
            p = !0
          );
        else if (D) {
          switch (m[_].y) {
            case ConstantData.ConnectorDefines.SEDAC_ABOVE:
              y[0].y = this.StartPoint.y - this.Frame.y - this.arraylist.ht,
                y[0].x = M.x + C / 2,
                y[1].x = M.x + C / 2,
                y[1].y = M.y + C / 2;
              break;
            case ConstantData.ConnectorDefines.SEDAC_BELOW:
              y[0].y = this.StartPoint.y - this.Frame.y + this.arraylist.ht,
                y[0].x = M.x + C / 2,
                y[1].x = M.x + C / 2,
                y[1].y = M.y + C / 2;
              break;
            default:
              y[0].x = g.x,
                y[0].y = g.y,
                y[1].x = M.x + C / 2,
                y[1].y = M.y + C / 2
          }
          p = !0
        } else y[0].y = this.StartPoint.y - this.Frame.y + C / 2,
          y[0].x = M.x + C / 2,
          y[1].y = M.y + C / 2,
          y[1].x = M.x + C / 2,
          p = !0;
        s.AddElement(S),
          p &&
          (
            c = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.POLYLINE)
          ) &&
          (
            c.SetPoints(y),
            c.SetFillColor('none'),
            c.SetStrokeColor('black'),
            c.SetStrokePattern('2,2'),
            c.SetStrokeWidth(1),
            s.AddElement(c)
          )
      }
      return s.SetSize(I, T),
        s.SetPos(b.x, b.y),
        s.isShape = !0,
        s.SetID('hilite_' + t),
        s
    }
  }



  SetCursors() {
    var e,
      t = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    ListManager.BaseDrawingObject.prototype.SetCursors.call(this),
      GlobalData.optManager.GetEditMode() == ConstantData.EditState.DEFAULT &&
      t &&
      (e = t.GetElementByID(ConstantData.Defines.HitAreas)) &&
      e.SetCursor(Element.CursorType.ADD_PLUS)
  }



  GetArrowheadSelection(e) {
    return e &&
      (
        e.StartArrowID = this.StartArrowID,
        e.StartArrowDisp = this.StartArrowDisp,
        e.EndArrowID = this.EndArrowID,
        e.EndArrowDisp = this.EndArrowDisp,
        e.ArrowSizeIndex = this.ArrowSizeIndex
      ),
      !0
  }



  RightClick(e) {
    var t,
      a = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
      r = (
        new HitResult(- 1, 0, null),
        GlobalData.optManager.svgObjectLayer.FindElementByDOMElement(e.currentTarget)
      );
    if (!GlobalData.optManager.SelectObjectFromClick(e, r)) return !1;
    var i = r.GetID();
    if (t = GlobalData.optManager.GetObjectPtr(i, !1)) {
      if (t.GetTextObject() >= 0) {
        var n = r.textElem;
        if (n) (
          p = n.GetSpellAtLocation(e.gesture.center.clientX, e.gesture.center.clientY)
        ) >= 0 &&
          GlobalData.optManager.ActivateTextEdit(r, e, !0)
      }
      var o = ConstantData.SEDA_Styles,
        s = t.arraylist.styleflags & o.SEDA_CoManager,
        l = (t.arraylist.styleflags & o.SEDA_PerpConn) > 0,
        S = ConstantData.ConnectorDefines.SEDA_NSkip,
        c = t.arraylist.hook.length;
      l &&
        c > S + 1,
        s &&
        !0
    }
    if (
      GlobalData.optManager.RightClickParams = new RightClickData(),
      GlobalData.optManager.RightClickParams.TargetID = r.GetID(),
      GlobalData.optManager.RightClickParams.HitPt.x = a.x,
      GlobalData.optManager.RightClickParams.HitPt.y = a.y,
      GlobalData.optManager.RightClickParams.Locked = (this.flags & ConstantData.ObjFlags.SEDO_Lock) > 0,
      null != GlobalData.optManager.GetActiveTextEdit()
    ) {
      var u = GlobalData.optManager.svgDoc.GetActiveEdit(),
        p = - 1;
      u &&
        (
          p = u.GetSpellAtLocation(e.gesture.center.clientX, e.gesture.center.clientY)
        ),
        p >= 0 ? GlobalData.optManager.svgDoc.GetSpellCheck().ShowSpellMenu(u, p, e.gesture.center.clientX, e.gesture.center.clientY) : Commands.MainController.ShowContextualMenu(
          Resources.Controls.ContextMenus.TextMenu.Id.toLowerCase(),
          e.gesture.center.clientX,
          e.gesture.center.clientY
        )
    } else Commands.MainController.ShowContextualMenu(
      Resources.Controls.ContextMenus.Connector.Id.toLowerCase(),
      e.gesture.center.clientX,
      e.gesture.center.clientY
    )
  }



  HitAreaClick(e) {
    GlobalData.optManager.CloseEdit();
    var t = this;
    if (Collab.AllowMessage()) {
      Collab.BeginSecondaryEdit();
      var a = {
        BlockID: this.BlockID,
        theHitAreaID: e
      };
      t = GlobalData.optManager.GetObjectPtr(t.BlockID, !1)
    }
    switch (e) {
      case ConstantData.HitAreaType.CONNECTOR_COLLAPSE:
        t._CollapseConnector(!0, !1, !0);
        break;
      case ConstantData.HitAreaType.CONNECTOR_EXPAND:
        t._CollapseConnector(!1, !1, !0)
    }
    Business.FindTreeTop(
      t,
      ConstantData.LinkFlags.SED_L_MOVE,
      {
        topconnector: - 1,
        topshape: - 1,
        foundtree: !1
      }
    ),
      Collab.AllowMessage() &&
      Collab.BuildMessage(ConstantData.CollabMessages.HitAreaClick, a, !1, !1),
      GlobalData.optManager.CompleteOperation(null)
  }



  GetPolyPoints(e, t, a, r, i) {
    var n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C = [],
      y = {},
      f = ConstantData.SEDA_Styles,
      L = this.arraylist.styleflags & f.SEDA_CoManager,
      I = (this.arraylist.styleflags & f.SEDA_PerpConn) > 0,
      T = this.arraylist.styleflags & f.SEDA_StartLeft,
      b = this.IsAsstConnector(),
      M = ConstantData.ConnectorDefines.SEDA_NSkip,
      P = this.arraylist.styleflags & f.SEDA_ReverseCol,
      R = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
      A = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn &&
        R,
      _ = 0 !== this.arraylist.angle,
      E = ConstantData.ConnectorDefines.A_Cl,
      w = ConstantData.ConnectorDefines.A_Cr,
      F = this.StartArrowID > 0,
      v = 0 == this.EndArrowID > 0 &&
        1 == F,
      G = !1,
      N = this.arraylist.curveparam,
      k = 0;
    o = this.arraylist.hook.length,
      t ? (
        y.x = this.StartPoint.x - this.Frame.x,
        y.y = this.StartPoint.y - this.Frame.y
      ) : y = this.StartPoint;
    var U = o == M + 1 &&
      0 == (this.arraylist.styleflags & f.SEDA_PerpConn),
      J = {
        index: - 1,
        left: !1
      };
    if (this.AllowCurveOnConnector(J) && (o > M + 1 || U) && N > 0 && !a) {
      k = N;
      var x = this.arraylist.ht - function (e) {
        var t,
          a = 0;
        for (n = 0; n < o; n++) if ((t = e.arraylist.hook[n]).comanagerht > a) {
          a = t.comanagerht;
          break
        }
        return a
      }(this);
      x < 0 &&
        (x = 0),
        b &&
          !this.vertical ? k > this.arraylist.wd &&
        (k = this.arraylist.wd) : k > x &&
        (k = x)
    }
    if (this.vertical) {
      for (d = P ? - 1 : 1, S = this.arraylist.ht, n = 0; n < o; n++) if (
        h = this.arraylist.hook[n],
        D = Utils2.IsEqual(h.startpoint.v + y.x, h.endpoint.v + y.x) &&
        Utils2.IsEqual(d * h.startpoint.h + y.y, d * h.endpoint.h + y.y),
        p = (n >= M || A) &&
        !L &&
        !b &&
        !D &&
        !G,
        n !== E ||
        !v ||
        D ||
        A ||
        _ ||
        (p = !0, G = !0),
        n === M &&
        p &&
        F &&
        A &&
        (p = !1),
        p &&
        n === E
      ) g = !1,
        A &&
        o > M &&
        !F &&
        (
          m = this.arraylist.hook[M],
          g = !Utils2.IsEqual(m.startpoint.h + y.x, m.endpoint.h + y.x) &&
          Utils2.IsEqual(m.startpoint.v + y.y, m.endpoint.v + y.y)
        ),
        g &&
        (p = !1),
        b &&
          k &&
          n === E ? (
          C.push(
            new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !0, p)
          ),
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.v + y.x - k, d * h.startpoint.h + y.y, !1, p)
          ) : C.push(
            new PathPoint(h.startpoint.v + y.x + k, d * h.startpoint.h + y.y, !1, p)
          )
        ) : k &&
          n === E &&
          U ? (
          C.push(
            new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !0, p)
          ),
          C.push(
            new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y - d * k, !1, p)
          )
        ) : (
          C.push(
            new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !0, p)
          ),
          C.push(
            new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y, !1, p)
          )
        );
      else if (n === J.index && k) {
        var O = 1;
        this.arraylist.hook[E].endpoint.v > 0 &&
          (O = - 1),
          J.left ? (
            C.push(
              new PathPoint(h.startpoint.v + y.x, h.startpoint.h + y.y + k, !0, p, - O * k, k)
            ),
            C.push(
              new PathPoint(h.endpoint.v + y.x, h.endpoint.h + y.y - 2 * k, !1, p)
            )
          ) : (
            C.push(
              new PathPoint(h.startpoint.v + y.x, h.startpoint.h + y.y + k, !0, p, - O * k, - k)
            ),
            C.push(
              new PathPoint(h.endpoint.v + y.x, h.endpoint.h + y.y, !1, p)
            )
          )
      } else if (k && n === E && U) C.push(
        new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y - d * k, !0, p)
      ),
        C.push(
          new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !1, p)
        );
      else if (k && 0 === n) {
        if (
          h.endpoint.v === h.startpoint.v &&
          h.endpoint.h === h.startpoint.h &&
          b
        ) {
          C.push(
            new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y, !0, p)
          ),
            C.push(
              new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !1, p)
            );
          continue
        }
        I ? C.push(
          new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y + k, !0, p)
        ) : U ? C.push(
          new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y - k, !0, p)
        ) : C.push(
          new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y, !0, p)
        );
        var B = d * k;
        U &&
          (B = k),
          C.push(
            new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y - B, !1, p)
          )
      } else k &&
        n === M &&
        I ? (
        B = k,
        h.endpoint.h === h.startpoint.h &&
        h.endpoint.v === h.startpoint.v &&
        (B = 0),
        h.endpoint.v < 0 ? C.push(
          new PathPoint(h.startpoint.v + y.x - B, d * h.startpoint.h + y.y, !0, p, B, B)
        ) : C.push(
          new PathPoint(h.startpoint.v + y.x + B, d * h.startpoint.h + y.y, !0, p, - B, B)
        ),
        C.push(
          new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !1, p)
        )
      ) : k &&
        n === o - 1 &&
        0 === R ? (
        h.endpoint.v < 0 ? C.push(
          new PathPoint(h.startpoint.v + y.x - k, d * h.startpoint.h + y.y, !0, p, k, - d * k)
        ) : C.push(
          new PathPoint(h.startpoint.v + y.x + k, d * h.startpoint.h + y.y, !0, p, - k, - d * k)
        ),
        C.push(
          new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !1, p)
        )
      ) : b &&
        k &&
        n === E ? (
        h.endpoint.v < 0 ? C.push(
          new PathPoint(h.startpoint.v + y.x - k, d * h.startpoint.h + y.y, !0, p)
        ) : C.push(
          new PathPoint(h.startpoint.v + y.x + k, d * h.startpoint.h + y.y, !0, p)
        ),
        C.push(
          new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !1, p)
        )
      ) : (
        C.push(
          new PathPoint(h.startpoint.v + y.x, d * h.startpoint.h + y.y, !0, p)
        ),
        C.push(
          new PathPoint(h.endpoint.v + y.x, d * h.endpoint.h + y.y, !1, p)
        )
      );
      if (L) for (
        T ? (s = this.arraylist.coprofile.v, u = - 1) : (s = this.arraylist.coprofile.vdist, u = 1),
        n = 0;
        n < o;
        n++
      ) h = this.arraylist.hook[n],
        l = (c = T ? h.pr.v : h.pr.vdist) ? s - (c + 2 * S) : 0,
        k &&
          0 === n ? (
          C.push(
            new PathPoint(h.startpoint.v + y.x + u * s, h.startpoint.h + y.y + k, !0, !1)
          ),
          C.push(
            new PathPoint(- h.endpoint.v - u * l + y.x + u * s, h.endpoint.h + y.y - k, !1, !1)
          )
        ) : k &&
          n === M ? (
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.v + y.x + u * s + k, h.startpoint.h + y.y, !0, !1, - k, k)
          ) : C.push(
            new PathPoint(h.startpoint.v + y.x + u * s - k, h.startpoint.h + y.y, !0, !1, k, k)
          ),
          C.push(
            new PathPoint(- h.endpoint.v - u * l + y.x + u * s, h.endpoint.h + y.y, !1, !1)
          )
        ) : k &&
          n === o - 1 ? (
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.v + y.x + u * s + k, h.startpoint.h + y.y, !0, !1, - k, - k)
          ) : C.push(
            new PathPoint(h.startpoint.v + y.x + u * s - k, h.startpoint.h + y.y, !0, !1, k, - k)
          ),
          C.push(
            new PathPoint(- h.endpoint.v - u * l + y.x + u * s, h.endpoint.h + y.y, !1, !1)
          )
        ) : (
          C.push(
            new PathPoint(h.startpoint.v + y.x + u * s, h.startpoint.h + y.y, !0, !1)
          ),
          C.push(
            new PathPoint(- h.endpoint.v - u * l + y.x + u * s, h.endpoint.h + y.y, !1, !1)
          )
        )
    } else {
      for (S = this.arraylist.ht, n = 0; n < o; n++) h = this.arraylist.hook[n],
        D = Utils2.IsEqual(h.startpoint.h + y.x, h.endpoint.h + y.x) &&
        Utils2.IsEqual(h.startpoint.v + y.y, h.endpoint.v + y.y),
        p = (n >= M || A) &&
        !L &&
        !b &&
        !D &&
        !G,
        n !== E ||
        !v ||
        D ||
        A ||
        _ ||
        (p = !0, G = !0),
        n === M &&
        p &&
        F &&
        A &&
        (p = !1),
        n !== w ||
        this.objecttype != ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_MAIN ||
        !v ||
        D ||
        A ||
        _ ||
        (
          p = !0,
          C.push(
            new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !0, p)
          ),
          C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y, !1, p)
          )
        ),
        n === J.index &&
          k ? (
          d = this.arraylist.hook[E].endpoint.v < 0 ? 1 : - 1,
          J.left ? (
            C.push(
              new PathPoint(h.startpoint.h + y.x + k, h.startpoint.v + y.y, !0, p, k, - d * k)
            ),
            C.push(
              new PathPoint(h.endpoint.h + y.x - 2 * k, h.endpoint.v + y.y, !1, p)
            )
          ) : (
            C.push(
              new PathPoint(h.startpoint.h + y.x + k, h.startpoint.v + y.y, !0, p, - k, - d * k)
            ),
            C.push(
              new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !1, p)
            )
          )
        ) : p &&
          n === E ? (
          g = !1,
          A &&
          o > M &&
          !F &&
          (
            m = this.arraylist.hook[M],
            g = !Utils2.IsEqual(m.startpoint.h + y.x, m.endpoint.h + y.x) &&
            Utils2.IsEqual(m.startpoint.v + y.y, m.endpoint.v + y.y)
          ),
          g &&
          (p = !1),
          b &&
            k ? (
            d = this.arraylist.hook[E].endpoint.v < 0 ? 1 : - 1,
            C.push(
              new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !0, p)
            ),
            C.push(
              new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y - d * k, !1, p)
            )
          ) : (
            C.push(
              new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !0, p)
            ),
            C.push(
              new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y, !1, p)
            )
          )
        ) : k &&
          0 === n ? (
          B = k,
          h.endpoint.v === h.startpoint.v &&
          h.endpoint.h === h.startpoint.h &&
          b &&
          (B = 0),
          C.push(
            new PathPoint(h.startpoint.h + y.x + B, h.startpoint.v + y.y, !0, p)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x - B, h.endpoint.v + y.y, !1, p)
          )
        ) : k &&
          n === M ? (
          B = k,
          h.endpoint.h === h.startpoint.h &&
          h.endpoint.v === h.startpoint.v &&
          (B = 0),
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y - B, !0, p, B, B)
          ) : C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + B, !0, p, B, - B)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !1, p)
          )
        ) : k &&
          n === o - 1 &&
          0 === R ? (
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y - k, !0, p, - k, k)
          ) : C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + k, !0, p, - k, - k)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !1, p)
          )
        ) : b &&
          k &&
          n === E ? (
          d = this.arraylist.hook[E].endpoint.v < 0 ? 1 : - 1,
          C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y - d * k, !0, p)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !1, p)
          )
        ) : (
          C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y, !0, p)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, h.endpoint.v + y.y, !1, p)
          )
        );
      if (L) for (
        T ? (s = this.arraylist.coprofile.v, u = - 1) : (s = this.arraylist.coprofile.vdist, u = 1),
        n = 0;
        n < o;
        n++
      ) h = this.arraylist.hook[n],
        l = (c = T ? h.pr.v : h.pr.vdist) ? s - (c + 2 * S) : 0,
        k &&
          0 === n ? (
          C.push(
            new PathPoint(h.startpoint.h + y.x + k, h.startpoint.v + y.y + u * s, !0, !1)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x - k, - h.endpoint.v - u * l + y.y + u * s, !1, !1)
          )
        ) : k &&
          n === M ? (
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + u * s + k, !0, !1, k, - k)
          ) : C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + u * s - k, !0, !1, k, k)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, - h.endpoint.v - u * l + y.y + u * s, !1, !1)
          )
        ) : k &&
          n === o - 1 ? (
          h.endpoint.v < 0 ? C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + u * s + k, !0, !1, - k, - k)
          ) : C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + u * s - k, !0, !1, - k, k)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, - h.endpoint.v - u * l + y.y + u * s, !1, !1)
          )
        ) : (
          C.push(
            new PathPoint(h.startpoint.h + y.x, h.startpoint.v + y.y + u * s, !0, !1)
          ),
          C.push(
            new PathPoint(h.endpoint.h + y.x, - h.endpoint.v - u * l + y.y + u * s, !1, !1)
          )
        )
    }
    return C
  }



  OffsetShape(e, t, a) {
    this.Frame.x += e,
      this.Frame.y += t,
      this.r.x += e,
      this.r.y += t,
      this.inside.x += e,
      this.inside.y += t,
      this.trect.x += e,
      this.trect.y += t,
      this.StartPoint.x += e,
      this.StartPoint.y += t,
      this.EndPoint.x += e,
      this.EndPoint.y += t
  }



  CalcFrame() {
    var e = [],
      t = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear;
    this.arraylist ? (
      e = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
      t &&
      e.push(this.EndPoint),
      e &&
      e.length &&
      Utils2.GetPolyRect(this.Frame, e)
    ) : this.Frame = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
      this.UpdateFrame(this.Frame)
  }



  GetDimensions() {
    var e = {},
      t = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
      a = (
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides
      ) > 0;
    return this.vertical ? (
      e.y = this.arraylist.hook[0].endpoint.h - this.arraylist.hook[0].startpoint.h,
      t ? e.x = 0 : (e.x = this.arraylist.ht, a && (e.x /= 2))
    ) : (
      e.x = this.arraylist.hook[0].endpoint.h - this.arraylist.hook[0].startpoint.h,
      t ? e.y = 0 : (e.y = this.arraylist.ht, a && (e.y /= 2))
    ),
      e
  }



  CanSnapToShapes() {
    //'use strict';
    return this._IsFlowChartConnector() &&
      0 === this.hooks.length &&
      this.arraylist.hook.length === ConstantData.ConnectorDefines.SEDA_NSkip + 1 ? this.arraylist.hook[ConstantData.ConnectorDefines.SEDA_NSkip].id : - 1
  }



  ScaleObject(e, t, a, r, i, n, o) {
    ListManager.BaseLine.prototype.ScaleObject.call(this, e, t, a, r, i, n, o);
    var s = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides ||
      0 == (
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_PerpConn
      ),
      l = ConstantData.ConnectorDefines,
      S = this.arraylist.hook.length,
      c = l.SEDA_NSkip;
    this.vertical ? (
      this.arraylist.ht = this.arraylist.ht * i,
      this.arraylist.wd = this.arraylist.wd * n,
      S >= c &&
      (
        s ? (
          this.arraylist.hook[l.A_Cl].gap &&
          (
            this.arraylist.hook[l.A_Cl].gap = this.arraylist.hook[l.A_Cl].gap * n
          ),
          this.arraylist.hook[l.A_Cr].gap &&
          (
            this.arraylist.hook[l.A_Cr].gap = this.arraylist.hook[l.A_Cr].gap * n
          )
        ) : (
          this.arraylist.hook[l.A_Cl].gap &&
          (
            this.arraylist.hook[l.A_Cl].gap = this.arraylist.hook[l.A_Cl].gap * i
          ),
          this.arraylist.hook[l.A_Cr].gap &&
          (
            this.arraylist.hook[l.A_Cr].gap = this.arraylist.hook[l.A_Cr].gap * i
          )
        )
      )
    ) : (
      this.arraylist.wd = this.arraylist.wd * i,
      this.arraylist.ht = this.arraylist.ht * n,
      S >= c &&
      (
        s ? (
          this.arraylist.hook[l.A_Cl].gap &&
          (
            this.arraylist.hook[l.A_Cl].gap = this.arraylist.hook[l.A_Cl].gap * i
          ),
          this.arraylist.hook[l.A_Cr].gap &&
          (
            this.arraylist.hook[l.A_Cr].gap = this.arraylist.hook[l.A_Cr].gap * i
          )
        ) : (
          this.arraylist.hook[l.A_Cl].gap &&
          (
            this.arraylist.hook[l.A_Cl].gap = this.arraylist.hook[l.A_Cl].gap * n
          ),
          this.arraylist.hook[l.A_Cr].gap &&
          (
            this.arraylist.hook[l.A_Cr].gap = this.arraylist.hook[l.A_Cr].gap * n
          )
        )
      )
    ),
      this.rflags &&
      (
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !1
        )
      )
  }



  SetSize(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l = ConstantData.SEDA_Styles,
      S = (this.arraylist.styleflags & l.SEDA_BothSides) > 0,
      c = (this.arraylist.styleflags & l.SEDA_Linear) > 0;
    s = this.arraylist.hook.length - ConstantData.ConnectorDefines.SEDA_NSkip,
      r = this.Pr_GetNBackBoneSegments(),
      o = this.GetDimensions(),
      S &&
      (r % 2 && r++, r /= 2),
      this.vertical ? (
        t &&
        s > 1 &&
        (
          n = t - o.y,
          this.arraylist.wd += n / r,
          this.arraylist.wd < 0 &&
          (this.arraylist.wd = 0)
        ),
        e &&
        !c &&
        (this.arraylist.ht = e, S && (this.arraylist.ht /= 2))
      ) : (
        e &&
        s > 1 &&
        (
          i = e - o.x,
          this.arraylist.wd += i / r,
          this.arraylist.wd < 0 &&
          (this.arraylist.wd = 0)
        ),
        t &&
        !c &&
        (this.arraylist.ht = t, S && (this.arraylist.ht /= 2))
      ),
      this.Pr_Format(this.BlockID),
      this.rflags &&
      (
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !1
        )
      ),
      GlobalData.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE)
  }



  UpdateFrame(e) {
    var t,
      a = {},
      r = (
        this.arraylist.styleflags,
        ConstantData.SEDA_Styles.SEDA_Linear,
        this.arraylist.styleflags,
        ConstantData.SEDA_Styles.SEDA_StartLeft,
        this.arraylist.styleflags,
        ConstantData.SEDA_Styles.SEDA_FlowConn,
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides ||
        0 == (
          this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_PerpConn
        )
      );
    this.arraylist.styleflags,
      ConstantData.SEDA_Styles.SEDA_Radial;
    if (
      a = e ||
      this.Frame,
      ListManager.BaseDrawingObject.prototype.UpdateFrame.call(this, a),
      gListManager
    ) {
      var n = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      if (null !== n) {
        var o = this.GetSVGFrame(),
          s = n.GetElementByID(ConstantData.SVGElementClass.SHAPE);
        if (s) {
          var l = s.GetArrowheadBounds();
          if (l && l.length) for (len = l.length, i = 0; i < len; i++) l[i].x += o.x,
            l[i].y += o.y,
            this.r = Utils2.UnionRect(l[i], this.r, this.r)
        }
      }
    }
    if (this.StyleRecord) {
      (t = this.StyleRecord.Line.Thickness / 2) < ConstantData.Defines.SED_MinWid &&
        (t = ConstantData.Defines.SED_MinWid),
        Utils2.InflateRect(this.r, t / 2, t / 2);
      var S = this.CalcEffectSettings(this.Frame, this.StyleRecord, !1);
      S &&
        Utils2.Add2Rect(this.r, S.extent)
    }
  }



  GetHitTestFrame() {
    var e = {},
      t = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
      a = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_StartLeft,
      r = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn,
      i = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides ||
        0 == (
          this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_PerpConn
        ),
      n = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Radial &&
        !i;
    return t &&
      r ? this.vertical ? (
        slop = ConstantData.Defines.SED_FlowConnectorSlop,
        vslop = ConstantData.Defines.SED_ConnectorSlop
      ) : (
      slop = ConstantData.Defines.SED_ConnectorSlop,
      vslop = ConstantData.Defines.SED_FlowConnectorSlop
    ) : (slop = ConstantData.Defines.SED_ConnectorSlop, vslop = slop),
      e = Utils1.DeepCopy(this.Frame),
      Utils2.InflateRect(e, slop, vslop),
      n &&
      (
        extraradial = r ? ConstantData.Defines.SED_FlowRadialSlop : ConstantData.Defines.SED_ConnectorSlop,
        this.vertical ? a ? (e.x -= extraradial, e.width += extraradial) : e.width += extraradial : a ? (e.y -= extraradial, e.height += extraradial) : e.height += extraradial
      ),
      e = Utils2.UnionRect(this.r, e, e)
  }



  GetMoveRect(e, t) {
    var a = {};
    if (1 === this.arraylist.hook.length) return Utils2.CopyRect(a, this.Frame),
      a.height = 0,
      a.width = 0,
      a;
    if (t) {
      Utils2.CopyRect(a, this.Frame),
        Utils2.InflateRect(
          a,
          0 + this.StyleRecord.Line.Thickness / 2,
          0 + this.StyleRecord.Line.Thickness / 2
        )
    } else Utils2.CopyRect(a, this.Frame);
    return a
  }



  SetShapeOrigin(e, t) {
    var a = 0,
      r = 0;
    null != e &&
      (a = e - this.Frame.x),
      null != t &&
      (r = t - this.Frame.y),
      this.OffsetShape(a, r)
  }



  Hit(e, t, a, r) {
    if (this.IsCoManager()) return 0;
    if (t) {
      if (Utils2.pointInRect(this.r, e)) return ConstantData.HitCodes.SED_Border
    } else {
      var i = this.GetHitTestFrame();
      if (Utils2.pointInRect(i, e)) return ConstantData.HitCodes.SED_Border
    }
    return 0
  }



  PreventLink() {
    return !!this.hooks.length
  }



  HandleActionTriggerTrackCommon(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C,
      y,
      f,
      L,
      I,
      T,
      b = 0,
      M = 0,
      P = 0,
      R = ConstantData.SEDA_Styles,
      A = 0,
      _ = 0,
      E = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_ReverseCol,
      w = (
        new SelectionAttributes(),
        ConstantData.ConnectorDefines
      ),
      F = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    if (
      null != this.arraylist &&
      null != this.arraylist.hook &&
      !((a = this.arraylist.hook.length) < 1)
    ) {
      var v = GlobalData.optManager.theActionSVGObject,
        G = v.GetElementByID(ConstantData.SVGElementClass.SHAPE),
        N = v.GetElementByID(ConstantData.SVGElementClass.SLOP),
        k = $.extend(!0, {
        }, this.Frame);
      s = this.arraylist.styleflags & R.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & R.SEDA_PerpConn),
        c = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides &&
        0 == (
          this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Stagger
        );
      var U = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Stagger &&
        this.vertical;
      S = this.arraylist.styleflags & R.SEDA_StartLeft,
        u = this.arraylist.styleflags & R.SEDA_Linear,
        d = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn,
        this.vertical ? (
          b = t - GlobalData.optManager.theActionStartY,
          M = e - GlobalData.optManager.theActionStartX
        ) : (
          b = e - GlobalData.optManager.theActionStartX,
          M = t - GlobalData.optManager.theActionStartY
        ),
        L = this.arraylist.ht,
        I = this.arraylist.wd;
      var J = this.Pr_GetStubIndex(),
        x = this.Pr_GetEndShapeIndex(),
        O = u &&
          J === w.A_Cr;
      switch (
      i = this.Pr_GetNBackBoneSegments(),
      c &&
      (i % 2 && i++, i /= 2),
      0 !== J &&
      i++,
      0 !== x &&
      i++,
      GlobalData.optManager.theActionTriggerID
      ) {
        case ConstantData.ActionTriggerType.CONNECTOR_ADJ:
          (E || O) &&
            (b = - b),
            (f = GlobalData.optManager.OldConnectorExtra + b) < - GlobalData.optManager.OldConnectorWd &&
            (f = - GlobalData.optManager.OldConnectorWd),
            b = f - this.arraylist.hook[GlobalData.optManager.theActionTriggerData].extra,
            this.arraylist.hook[GlobalData.optManager.theActionTriggerData].extra = f,
            c &&
            GlobalData.optManager.theActionTriggerData < this.arraylist.hook.length - 1 &&
            (
              this.arraylist.hook[GlobalData.optManager.theActionTriggerData + 1].extra = f
            ),
            (E || O) &&
            (b = - b),
            M = 0;
          break;
        case ConstantData.ActionTriggerType.LINESTART:
          b = - b,
            n = I,
            (I = GlobalData.optManager.OldConnectorWd + b / i) < 0 &&
            (I = 0),
            o = (b = I - n) * i,
            this.vertical ? k.height += o : k.width += o,
            b = - b,
            M = 0;
          break;
        case ConstantData.ActionTriggerType.LINEEND:
          E &&
            (b = - b),
            n = I,
            (I = GlobalData.optManager.OldConnectorWd + b / i) < 0 &&
            (I = 0),
            b = I - n,
            this.vertical ? k.height += b * i : k.width += b * i,
            E &&
            (b = - b),
            M = 0;
          break;
        case ConstantData.ActionTriggerType.CONNECTOR_PERP:
          n = L,
            (c && GlobalData.optManager.theActionTriggerData % 2 || U && S) &&
            (M = - M),
            (S && c || S) &&
            (M = - M),
            (L = GlobalData.optManager.OldConnectorHt + M) < 0 &&
            (L = 0),
            M = L - n,
            (S && c || S) &&
            (M = - M),
            b = 0;
          break;
        case ConstantData.ActionTriggerType.CONNECTOR_HOOK:
          n = (r = this.arraylist.hook[GlobalData.optManager.theActionTriggerData]).gap,
            P = s ? b : M,
            E ? P = - P : S ? s ||
              (P = - P) : GlobalData.optManager.theActionTriggerData === ConstantData.ConnectorDefines.A_Cr &&
            (P = - P),
            r.gap = GlobalData.optManager.OldConnectorGap + P,
            p = GlobalData.optManager.OldConnectorExtra + P,
            r.gap < 0 &&
            (r.gap = 0),
            d &&
            0 === r.gap &&
            (r.gap = 0.01),
            p < 0 &&
            (p = 0),
            P = r.gap - n,
            u &&
            !s &&
            (r.extra = p),
            u &&
            (
              F.moreflags & ConstantData.SessionMoreFlags.SEDSM_Swimlane_Rows ||
              F.moreflags & ConstantData.SessionMoreFlags.SEDSM_Swimlane_Cols
            ) &&
            (r.extra = p),
            E ? P = - P : S ? s ||
              (P = - P) : GlobalData.optManager.theActionTriggerData === ConstantData.ConnectorDefines.A_Cr &&
            (P = - P),
            M = 0,
            b = 0,
            s ? (
              E ? r.startpoint.h -= P : r.startpoint.h += P,
              this.vertical ? (A = 0, _ = P) : (_ = 0, A = P)
            ) : (r.startpoint.v += P, this.vertical ? (_ = 0, A = P) : (A = 0, _ = P));
          break;
        default:
          return M = 0,
            void (b = 0)
      }
      this.arraylist.ht = L,
        this.arraylist.wd = I;
      var B,
        H,
        V = this.Pr_AdjustFormat(
          b,
          M,
          P,
          GlobalData.optManager.theActionTriggerID,
          GlobalData.optManager.theActionTriggerData,
          i,
          J,
          x
        );
      if (
        V &&
        (V.linelen, B = V.linestart, H = V.linedisp),
        0 === P &&
        (this.vertical ? (A = M, _ = b) : (A = b, _ = M)),
        v
      ) {
        var j = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, null);
        if (
          v.SetSize(k.width, k.height),
          v.SetPos(k.x, k.y),
          G.SetSize(k.width, k.height),
          this.UpdateSVG(GlobalData.optManager.svgDoc, G, j),
          N.SetSize(k.width, k.height),
          this.UpdateSVG(GlobalData.optManager.svgDoc, N, j),
          GlobalData.optManager.ConnectorList
        ) switch (
          a = GlobalData.optManager.ConnectorList.length,
          GlobalData.optManager.theActionTriggerID
          ) {
            case ConstantData.ActionTriggerType.CONNECTOR_ADJ:
              for (this.arraylist.angle && (A = _ * this.arraylist.angle), l = 0; l < a; l++) {
                if (g = GlobalData.optManager.ConnectorList[l].locallist) for (h = g.length, m = 0; m < h; m++) D = g[m].GetPos(),
                  g[m].SetPos(D.x + A, D.y + _);
                if (c && l < a - 1 && (l++, g = GlobalData.optManager.ConnectorList[l].locallist)) for (h = g.length, m = 0; m < h; m++) D = g[m].GetPos(),
                  g[m].SetPos(D.x + A, D.y + _)
              }
              break;
            case ConstantData.ActionTriggerType.LINEEND:
            case ConstantData.ActionTriggerType.LINESTART:
              this.arraylist.angle &&
                (A = _ * this.arraylist.angle),
                C = A,
                y = _;
              var z,
                W = - 1;
              GlobalData.optManager.theActionTriggerID === ConstantData.ActionTriggerType.LINEEND &&
                a > 0 &&
                this.arraylist.hook[w.A_Cr].id >= 0 &&
                (W = w.A_Cr),
                GlobalData.optManager.theActionTriggerID === ConstantData.ActionTriggerType.LINESTART &&
                a > 0 &&
                this.arraylist.hook[w.A_Cl].id >= 0 &&
                (W = w.A_Cl);
              var q = c &&
                this.arraylist.hook.length % 2 == 0 &&
                GlobalData.optManager.theActionTriggerID === ConstantData.ActionTriggerType.LINESTART;
              for (l = 0; l < a; l++) {
                if (
                  g = GlobalData.optManager.ConnectorList[l].locallist,
                  z = GlobalData.optManager.ConnectorList[l].Index,
                  g
                ) for (
                    B &&
                    null != B[z] &&
                    (
                      this.vertical ? (
                        D = g[0].GetPos(),
                        y = H[z],
                        this.arraylist.angle &&
                        (C = y * this.arraylist.angle)
                      ) : (D = g[0].GetPos(), C = H[z])
                    ),
                    h = g.length,
                    m = 0;
                    m < h;
                    m++
                  ) D = g[m].GetPos(),
                    g[m].SetPos(D.x + C, D.y + y);
                if (
                  c &&
                  l < a - 1 &&
                  !q &&
                  W !== GlobalData.optManager.ConnectorList[l + 1].Index &&
                  (l++, g = GlobalData.optManager.ConnectorList[l].locallist)
                ) for (h = g.length, m = 0; m < h; m++) D = g[m].GetPos(),
                  g[m].SetPos(D.x + C, D.y + y);
                q = !1,
                  C += A,
                  y += _
              }
              var K = {
                x: this.Frame.x,
                y: this.Frame.y,
                width: T.x,
                height: T.y
              },
                X = {
                  x: e,
                  y: t
                };
              GlobalData.optManager.UpdateDisplayCoordinates(K, X, ConstantData.CursorTypes.Grow, this);
              break;
            case ConstantData.ActionTriggerType.CONNECTOR_PERP:
              var Y = 0;
              for (this._GetTilt() && (Y = - _), l = 0; l < a; l++) D = GlobalData.optManager.ConnectorList[l].GetPos(),
                !(!c && !U) &&
                  (
                    this.vertical ? this.arraylist.angle ? l % 2 : D.x < this.StartPoint.x : D.y < this.StartPoint.y
                  ) ? GlobalData.optManager.ConnectorList[l].SetPos(D.x - A + Y, D.y - _) : GlobalData.optManager.ConnectorList[l].SetPos(D.x + A + Y, D.y + _);
              K = {
                x: this.Frame.x,
                y: this.Frame.y,
                width: T.x,
                height: T.y
              },
                X = {
                  x: e,
                  y: t
                };
              GlobalData.optManager.UpdateDisplayCoordinates(K, X, ConstantData.CursorTypes.Grow, this);
              break;
            default:
              for (l = 0; l < a; l++) D = GlobalData.optManager.ConnectorList[l].GetPos(),
                GlobalData.optManager.ConnectorList[l].SetPos(D.x + A, D.y + _)
          }
      }
    }
  }



  UpdateDimensions(e, t, a) {
    var r,
      i,
      n,
      o = !1,
      s = this.Pr_GetNBackBoneSegments(),
      l = ConstantData.SEDA_Styles;
    this.arraylist.styleflags & l.SEDA_BothSides &&
      (s % 2 && s++, s /= 2),
      s < 1 &&
      (s = 1),
      this.vertical ? (
        a &&
        (
          i = this.arraylist.wd,
          r = (a - Math.abs(this.EndPoint.y - this.StartPoint.y)) / s,
          this.arraylist.wd += r,
          this.arraylist.wd < 0 &&
          (this.arraylist.wd = 0),
          o = this.arraylist.wd !== i
        ),
        t &&
        (
          t < 0 &&
          (t = 0),
          n = this.arraylist.ht,
          this.arraylist.ht = t,
          o = this.arraylist.ht !== n
        )
      ) : (
        t &&
        (
          i = this.arraylist.wd,
          r = (t - Math.abs(this.EndPoint.x - this.StartPoint.x)) / s,
          this.arraylist.wd += r,
          this.arraylist.wd < 0 &&
          (this.arraylist.wd = 0),
          o = this.arraylist.wd !== i
        ),
        a &&
        (
          n = this.arraylist.ht,
          a < 0 &&
          (a = 0),
          this.arraylist.ht = a,
          o = this.arraylist.ht !== n
        )
      ),
      o &&
      this.Pr_Format(this.BlockID)
  }



  HandleActionTriggerDoAutoScroll() {
    ListManager.BaseLine.prototype.HandleActionTriggerDoAutoScroll.call(this)
  }



  AutoScrollCommon(e, t, a) {
    return ListManager.BaseLine.prototype.AutoScrollCommon.call(this, e, t, a)
  }



  LM_ActionTrack(e) {
    console.log('============ListManager.Connector.prototype.LM_ActionTrack e=>', e);

    ListManager.BaseLine.prototype.LM_ActionTrack.call(this, e)
  }



  LM_ActionRelease(e, t) {
    try {
      var a,
        r,
        i;
      if (
        t ||
        (
          GlobalData.optManager.unbindActionClickHammerEvents(),
          this.ResetAutoScrollTimer()
        ),
        Collab.AllowMessage()
      ) {
        var n = {};
        n.BlockID = GlobalData.optManager.theActionStoredObjectID,
          n.theActionTriggerID = GlobalData.optManager.theActionTriggerID,
          n.Frame = Utils1.DeepCopy(this.Frame),
          n.StartPoint = Utils1.DeepCopy(this.StartPoint),
          n.EndPoint = Utils1.DeepCopy(this.EndPoint),
          n.arraylist = Utils1.DeepCopy(this.arraylist),
          Collab.BuildMessage(ConstantData.CollabMessages.Action_Connector, n, !1)
      }
      switch (GlobalData.optManager.theActionTriggerID) {
        case ConstantData.ActionTriggerType.LINESTART:
        case ConstantData.ActionTriggerType.LINEEND:
          if (
            this.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH
          ) this.hooks.length &&
            (a = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, !0)) &&
            a.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
            a.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_MatchSize &&
            a.MatchSize(!0, this.arraylist.wd);
          else for (r = this.arraylist.hook.length, i = 0; i < r; i++) hook = this.arraylist.hook[i],
            hook.extra < - this.arraylist.wd &&
            (hook.extra = - this.arraylist.wd)
      }
      this.Pr_Format(GlobalData.optManager.theActionStoredObjectID),
        GlobalData.optManager.SetLinkFlag(
          GlobalData.optManager.theActionStoredObjectID,
          ConstantData.LinkFlags.SED_L_MOVE
        ),
        GlobalData.optManager.UpdateLinks(),
        t ||
        (
          this.LM_ActionPostRelease(GlobalData.optManager.theActionStoredObjectID),
          GlobalData.optManager.theActionStoredObjectID = - 1,
          GlobalData.optManager.theActionSVGObject = null
        ),
        GlobalData.optManager.ShowOverlayLayer(),
        GlobalData.optManager.CompleteOperation(null)
    } catch (e) {
      ListManager.BaseShape.prototype.LM_ActionClick_ExceptionCleanup.call(this, e);
      GlobalData.optManager.ExceptionCleanup(e);
      throw e;
    }
  }



  LM_SetupActionClick(e, t) {
    return ListManager.BaseLine.prototype.LM_SetupActionClick.call(this, e, t)
  }



  LM_ActionClick(e, t) {
    ListManager.BaseLine.prototype.LM_ActionClick.call(this, e, t)
  }



  LM_ActionClick_ExceptionCleanup(e) {
    ListManager.BaseLine.prototype.LM_ActionClick_ExceptionCleanup.call(this, e)
  }



  LM_ActionPreTrack(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p = {},
      d = [],
      D = 1,
      g = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !1),
      h = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides &&
        0 == (
          this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Stagger
        ),
      m = (
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear
      ) > 0,
      C = ConstantData.ConnectorDefines,
      y = this,
      f = function (e, t) {
        var a,
          r = e.id;
        if (
          e.id >= 0 ? r = e.id : t === C.A_Cl ? r = y.arraylist.hook[C.SEDA_NSkip].id : t === C.A_Cr &&
            (r = y.arraylist.hook[y.arraylist.hook.length - 1].id),
          s = GlobalData.optManager.GetObjectPtr(r, !1)
        ) {
          for (
            d = [],
            d = GlobalData.optManager.GetHookList(g, d, r, s, ConstantData.ListCodes.SED_LC_MOVEHOOK, p),
            S = d.length,
            u = [],
            l = 0;
            l < S;
            l++
          ) (i = GlobalData.optManager.svgObjectLayer.GetElementByID(d[l])) &&
            (u.push(i), GlobalData.optManager.AddToDirtyList(d[l]));
          a = {
            Index: t,
            locallist: u
          },
            GlobalData.optManager.ConnectorList.push(a)
        }
      },
      L = function (e, t, a, r) {
        var i,
          n,
          o,
          s,
          l = 0;
        if (i = e.hook.length, t) {
          a === C.A_Cr &&
            (
              n = C.A_Cr,
              o = e.hook[n],
              GlobalData.optManager.ConnectorWidthList[n] = o.endpoint.h - o.startpoint.h - o.gap
            );
          for (
            h &&
            (l = 1),
            n = ConstantData.ConnectorDefines.SEDA_NSkip;
            n < i - 1 - l;
            n++
          ) o = e.hook[n + l],
            s = e.hook[n + l + 1],
            GlobalData.optManager.ConnectorWidthList[n + l] = s.endpoint.h - o.endpoint.h - e.wd - s.extra,
            h &&
            n++;
          r === C.A_Cl &&
            (
              n = C.A_Cl,
              o = e.hook[n],
              GlobalData.optManager.ConnectorWidthList[n] = o.startpoint.h - o.endpoint.h - o.gap
            )
        } else {
          var S = 0;
          for (
            a === C.A_Cl &&
            (
              S = 0,
              n = C.A_Cl,
              o = e.hook[n],
              GlobalData.optManager.ConnectorWidthList[n] = o.startpoint.h - o.endpoint.h - o.gap
            ),
            h &&
            (S = 1),
            n = ConstantData.ConnectorDefines.SEDA_NSkip + 1 + S;
            n < i;
            n++
          ) o = e.hook[n],
            s = e.hook[n - 1],
            GlobalData.optManager.ConnectorWidthList[n] = o.endpoint.h - s.endpoint.h - e.wd - o.extra,
            h &&
            n++;
          r === C.A_Cr &&
            (
              n = C.A_Cr,
              o = e.hook[n],
              GlobalData.optManager.ConnectorWidthList[n] = o.endpoint.h - o.startpoint.h - o.gap
            )
        }
      };
    // SDUI.Commands.MainController.Dropdowns.HideAllDropdowns(),
    // Double === TODO
    GlobalData.optManager.OldConnectorWd = this.arraylist.wd,
      GlobalData.optManager.OldConnectorHt = this.arraylist.ht,
      GlobalData.optManager.ConnectorList = [],
      GlobalData.optManager.ConnectorWidthList = [],
      h &&
      (D = 2),
      t === ConstantData.ActionTriggerType.CONNECTOR_HOOK &&
      (
        a = this.arraylist.hook[GlobalData.optManager.theActionTriggerData],
        GlobalData.optManager.OldConnectorGap = a.gap,
        GlobalData.optManager.OldConnectorExtra = a.extra
      );
    var I = this.Pr_GetStubIndex(),
      T = this.Pr_GetEndShapeIndex();
    switch (t) {
      case ConstantData.ActionTriggerType.CONNECTOR_ADJ:
        if (
          D = GlobalData.optManager.theActionTriggerData,
          a = this.arraylist.hook[GlobalData.optManager.theActionTriggerData],
          GlobalData.optManager.OldConnectorExtra = a.extra,
          o = this.arraylist.hook.length,
          m &&
          I === C.A_Cr
        ) for (n = C.SEDA_NSkip; n < D; n++) f(a = this.arraylist.hook[n], n);
        else for (n = D; n < o; n++) f(a = this.arraylist.hook[n], n);
        break;
      case ConstantData.ActionTriggerType.LINEEND:
        for (
          o = this.arraylist.hook.length,
          L(this.arraylist, !1, I, T),
          I !== C.A_Cl &&
          T !== C.A_Cl ||
          (D = 0),
          n = ConstantData.ConnectorDefines.SEDA_NSkip + D;
          n < o;
          n++
        ) f(a = this.arraylist.hook[n], n);
        o &&
          this.arraylist.hook[C.A_Cr].id >= 0 &&
          f(this.arraylist.hook[C.A_Cr], C.A_Cr);
        break;
      case ConstantData.ActionTriggerType.LINESTART:
        for (
          o = this.arraylist.hook.length,
          h &&
          o % 2 == 0 &&
          (D = 1),
          L(this.arraylist, !0, I, T),
          I !== C.A_Cr &&
          T !== C.A_Cr ||
          (D = 0),
          n = o - 1 - D;
          n >= ConstantData.ConnectorDefines.SEDA_NSkip;
          n--
        ) f(a = this.arraylist.hook[n], n);
        o &&
          this.arraylist.hook[C.A_Cl].id >= 0 &&
          f(this.arraylist.hook[C.A_Cl], C.A_Cl);
        break;
      case ConstantData.ActionTriggerType.CONNECTOR_PERP:
      case ConstantData.ActionTriggerType.CONNECTOR_HOOK:
        if ((r = GlobalData.optManager.GetObjectPtr(e, !1)) && g) {
          for (
            o = (
              d = GlobalData.optManager.GetHookList(g, d, e, r, ConstantData.ListCodes.SED_LC_CHILDRENONLY, p)
            ).length,
            this.arraylist.hook[C.A_Cl].id >= 0 &&
            (c = d.indexOf(this.arraylist.hook[C.A_Cl].id)) >= 0 &&
            d.splice(c, 1),
            this.arraylist.hook[C.A_Cr].id >= 0 &&
            (c = d.indexOf(this.arraylist.hook[C.A_Cr].id)) >= 0 &&
            d.splice(c, 1),
            n = 0;
            n < o;
            n++
          ) (i = GlobalData.optManager.svgObjectLayer.GetElementByID(d[n])) &&
            (
              GlobalData.optManager.ConnectorList.push(i),
              GlobalData.optManager.AddToDirtyList(d[n])
            );
          r.hooks.length &&
            GlobalData.optManager.SetLinkFlag(r.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE)
        }
    }
    return !0
  }



  LM_ActionDuringTrack(e) {
    return e
  }



  LM_ActionPostRelease(e) {
    GlobalData.optManager.ConnectorList = [],
      GlobalData.optManager.ConnectorWidthList = [],
      GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT)
  }



  GetBestHook(e, t, a) {
    var r,
      i,
      n,
      o;
    if (
      r = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides,
      n = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
      i = r ? this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_StartLeft ? a.x % 2 - 1 : a.x % 2 : this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_StartLeft,
      this.vertical
    ) {
      if (!n) return - 1 === a.x ? ConstantData.HookPts.SED_AKCB : - 2 === a.x ? ConstantData.HookPts.SED_AKCT : i ? ConstantData.HookPts.SED_AKCR : ConstantData.HookPts.SED_AKCL;
      switch (a.y) {
        case ConstantData.ConnectorDefines.SEDAC_ABOVE:
          return ConstantData.HookPts.SED_AKCR;
        case ConstantData.ConnectorDefines.SEDAC_BELOW:
          return ConstantData.HookPts.SED_AKCL;
        case ConstantData.ConnectorDefines.SEDAC_PARENT:
          return 0 === a.x ? ConstantData.HookPts.SED_AKCB : ConstantData.HookPts.SED_AKCT;
        default:
          return (o = GlobalData.optManager.GetObjectPtr(e, !1)) &&
            o.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ? o.vertical ? ConstantData.HookPts.SED_LL : ConstantData.HookPts.SED_LT : ConstantData.HookPts.SED_AKCT
      }
    } else {
      if (!n) return i ? (o = GlobalData.optManager.GetObjectPtr(e, !1)) &&
        o.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ? o.vertical ? ConstantData.HookPts.SED_LB : ConstantData.HookPts.SED_LR : ConstantData.HookPts.SED_AKCB : (o = GlobalData.optManager.GetObjectPtr(e, !1)) &&
          o.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ? o.vertical ? ConstantData.HookPts.SED_LT : ConstantData.HookPts.SED_LL : ConstantData.HookPts.SED_AKCT;
      switch (a.y) {
        case ConstantData.ConnectorDefines.SEDAC_ABOVE:
          return ConstantData.HookPts.SED_AKCB;
        case ConstantData.ConnectorDefines.SEDAC_BELOW:
          return ConstantData.HookPts.SED_AKCT;
        case ConstantData.ConnectorDefines.SEDAC_PARENT:
          return 0 === a.x ? ConstantData.HookPts.SED_AKCR : ConstantData.HookPts.SED_AKCL;
        default:
          return (o = GlobalData.optManager.GetObjectPtr(e, !1)) &&
            o.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ? o.vertical ? ConstantData.HookPts.SED_LT : ConstantData.HookPts.SED_LL : ConstantData.HookPts.SED_AKCL
      }
    }
  }



  GetHookFlags() {
    return ConstantData.HookFlags.SED_LC_MoveTarget
  }



  HookToPoint(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S = {
        x: 0,
        y: 0
      },
      c = {},
      u = {},
      p = {},
      d = {},
      // D = ListManager,
      // Double === TODO
      // D = ListManager,
      D = ConstantData,
      g = ConstantData.SEDA_Styles,
      h = this.arraylist.styleflags & g.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & g.SEDA_PerpConn),
      m = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_ReverseCol;
    if (
      this.flags & ConstantData.ObjFlags.SEDO_Obj1 &&
      !GlobalData.optManager.InUndo &&
      this.Pr_Format(this.BlockID),
      S.x = this.StartPoint.x,
      S.y = this.StartPoint.y,
      null == this.arraylist
    ) return S;
    if (
      l = m ? - 1 : 1,
      (
        this.arraylist.hook.length <= ConstantData.ConnectorDefines.SEDA_NSkip ||
        this.flags & ConstantData.ObjFlags.SEDO_NotVisible
      ) &&
      this.objecttype !== ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH
    ) return o = this.vertical,
      !1 === h ? (o = !o, (s = this.arraylist.styleflags & g.SEDA_StartLeft) && (o = !o)) : s = this.arraylist.styleflags & g.SEDA_ReverseCol,
      a = s ? this.arraylist.hook[0].endpoint : this.arraylist.hook[0].startpoint,
      o ? (S.y += a.h, S.x += a.v) : (S.y += a.v, S.x += a.h),
      t &&
      (
        n = Utils2.Pt2Rect(this.StartPoint, this.EndPoint),
        t.x = n.x,
        t.y = n.y,
        t.width = n.width,
        t.height = n.height
      ),
      S;
    switch (
    r = this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl],
    i = this.arraylist.hook[ConstantData.ConnectorDefines.A_Cr],
    this.vertical ? (
      c.x = this.StartPoint.x + r.endpoint.v,
      c.y = this.StartPoint.y + l * r.endpoint.h,
      u.x = this.StartPoint.x + i.endpoint.v,
      u.y = this.StartPoint.y + l * i.endpoint.h,
      p.x = this.StartPoint.x + r.startpoint.v,
      p.y = this.StartPoint.y + l * r.startpoint.h,
      d.x = this.StartPoint.x + i.startpoint.v,
      d.y = this.StartPoint.y + l * i.startpoint.h
    ) : (
      c.x = this.StartPoint.x + r.endpoint.h,
      c.y = this.StartPoint.y + r.endpoint.v,
      u.x = this.StartPoint.x + i.endpoint.h,
      u.y = this.StartPoint.y + i.endpoint.v,
      p.x = this.StartPoint.x + r.startpoint.h,
      p.y = this.StartPoint.y + r.startpoint.v,
      d.x = this.StartPoint.x + i.startpoint.h,
      d.y = this.StartPoint.y + i.startpoint.v
    ),
    !1 === h &&
    (e = D.HookPts.SED_LL),
    e
    ) {
      case D.HookPts.SED_LL:
      case D.HookPts.SED_LT:
        S.x = c.x,
          S.y = c.y,
          t &&
          (
            n = Utils2.Pt2Rect(c, p),
            t.x = n.x,
            t.y = n.y,
            t.width = n.width,
            t.height = n.height
          );
        break;
      default:
        S.x = u.x,
          S.y = u.y,
          t &&
          (
            n = Utils2.Pt2Rect(u, d),
            t.x = n.x,
            t.y = n.y,
            t.width = n.width,
            t.height = n.height
          )
    }
    return S
  }



  GetTargetPoints(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l = [];
    if (null == this.arraylist) return l;
    r = this.arraylist.hook.length,
      o = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn,
      s = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear;
    var S = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_StartLeft,
      c = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides ||
        0 == (
          this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_PerpConn
        ),
      u = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Radial &&
        !c,
      p = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_EndConn,
      d = ConstantData.ConnectorDefines,
      D = ConstantData.HookPts;
    switch (this.objecttype) {
      case ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH:
      case ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH:
        o = !1
    }
    if (
      t & ConstantData.HookFlags.SED_LC_HookNoExtra &&
      (p = !1),
      (n = r - ConstantData.ConnectorDefines.SEDA_NSkip) <= 0 &&
      !p
    ) l.push(new Point(- 3, 0));
    else {
      for (i = ConstantData.ConnectorDefines.SEDA_NSkip; i < r + 1; i++) l.push(
        new Point(i - ConstantData.ConnectorDefines.SEDA_NSkip, 0)
      );
      if (p) if (
        0 == (t & ConstantData.HookFlags.SED_LC_ForceEnd) &&
        (
          this.arraylist.hook[d.A_Cl].index >= 0 ||
          this.arraylist.hook[d.A_Cr].index >= 0
        )
      ) p = !1;
      else if (this.hooks.length) switch (this.hooks[0].hookpt) {
        case D.SED_LL:
        case D.SED_LT:
          l.push(new Point(- d.A_Cr, 0));
          break;
        default:
          l.push(new Point(- d.A_Cl, 0))
      } else l.push(new Point(- d.A_Cl, 0));
      if (o && s) {
        for (i = ConstantData.ConnectorDefines.SEDA_NSkip; i < r; i++) a &&
          this.arraylist.hook[i].id === a ||
          (
            l.push(
              new Point(
                i - ConstantData.ConnectorDefines.SEDA_NSkip,
                ConstantData.ConnectorDefines.SEDAC_ABOVE
              )
            ),
            l.push(
              new Point(
                i - ConstantData.ConnectorDefines.SEDA_NSkip,
                ConstantData.ConnectorDefines.SEDAC_BELOW
              )
            )
          );
        if (this.hooks.length) switch (this.hooks[0].hookpt) {
          case ConstantData.HookPts.SED_LL:
          case ConstantData.HookPts.SED_LT:
            l.push(
              new Point(0, ConstantData.ConnectorDefines.SEDAC_PARENT)
            );
            break;
          default:
            l.push(
              new Point(n, ConstantData.ConnectorDefines.SEDAC_PARENT)
            )
        }
      } else if (o && u) for (i = ConstantData.ConnectorDefines.SEDA_NSkip; i < r; i++) a &&
        this.arraylist.hook[i].id === a ||
        (
          S ? l.push(
            new Point(
              i - ConstantData.ConnectorDefines.SEDA_NSkip,
              ConstantData.ConnectorDefines.SEDAC_ABOVE
            )
          ) : l.push(
            new Point(
              i - ConstantData.ConnectorDefines.SEDA_NSkip,
              ConstantData.ConnectorDefines.SEDAC_BELOW
            )
          )
        )
    }
    return l
  }



  AllowMaintainLink() {
    //'use strict';
    return !1
  }



  ChangeHook(e, t, a) {
    var r,
      i,
      n = ConstantData.SEDA_Styles,
      o = Business.FlowChart.AutoFormatFlags,
      s = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      l = (
        this.arraylist.styleflags,
        n.SEDA_GenoConn,
        (this.arraylist.styleflags & n.SEDA_Linear) > 0
      ),
      S = this.arraylist.styleflags & n.SEDA_FlowConn,
      c = - 1;
    s.flags & ConstantData.SessionFlags.SEDS_AutoFormat &&
      S &&
      (
        i = this.hooks[0].objid,
        (r = GlobalData.optManager.GetObjectPtr(i, !1)) &&
        r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
        (
          l ? (
            t ||
            (c = this.BlockID),
            1 === GlobalDatagFlowChartManager.SED_ArrayShapeIsThreeWay(r, this.BlockID, c) &&
            GlobalDatagFlowChartManager.AutoFormatShape(i, o.SD_AutoFF_ToDiamond | o.SD_AutoFF_ToDecStyle)
          ) : t ? GlobalDatagFlowChartManager.AutoFormatShape(i, o.SD_AutoFF_ToDecStyle) : (
            c = this.BlockID,
            0 === GlobalDatagFlowChartManager.SED_ArrayShapeIsThreeWay(r, this.BlockID, c) &&
            GlobalDatagFlowChartManager.AutoFormatShape(i, o.SD_AutoFF_ToDefStyle)
          )
        )
      )
  }



  ChangeTarget(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u,
      p = - 1,
      d = - 1,
      D = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides,
      g = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
      h = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn,
      m = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      C = m.flags & ConstantData.SessionFlags.SEDS_NoTreeOverlap,
      y = ConstantData.ConnectorDefines.SEDA_NSkip;
    if (null != t) {
      for (s = this.arraylist.hook.length, o = 0; o < s; o++) if ((l = this.arraylist.hook[o]).id === t) {
        p = o;
        break
      }
      if (n) p >= 0 ? (S = i.x + ConstantData.ConnectorDefines.SEDA_NSkip) != p &&
        (
          d = l.textid,
          p < S ? (
            D &&
            i.x++,
            this.Pr_AddHookedObject(t, i.x, d),
            this.Pr_RemoveHookedObject(t, p)
          ) : (
            this.Pr_RemoveHookedObject(t, p),
            this.Pr_AddHookedObject(t, i.x, d)
          ),
          m.flags & ConstantData.SessionFlags.SEDS_AutoFormat &&
          h &&
          (
            GlobalDatagFlowChartManager.AutoFormat(this, - 1),
            GlobalDatagFlowChartManager.AutoFormat(this, i.x)
          )
        ) : (
        this.Pr_AddHookedObject(t, i.x, - 1),
        m.flags & ConstantData.SessionFlags.SEDS_AutoFormat &&
        h &&
        GlobalDatagFlowChartManager.AutoFormat(this, i.x)
      );
      else if (p >= 0) {
        var f;
        if (
          l.textid >= 0 &&
          (GlobalData.optManager.DeleteBlock(l.textid), l.textid = - 1),
          this.Pr_RemoveHookedObject(t, p),
          (f = GlobalData.optManager.GetObjectPtr(t, !0)) &&
          f.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASK &&
          (f.subtype = 0),
          m.flags & ConstantData.SessionFlags.SEDS_AutoFormat &&
          h &&
          GlobalDatagFlowChartManager.AutoFormat(this, - 1),
          g &&
          p === y &&
          this.arraylist.hook.length >= y
        ) if (this.arraylist.hook.length === y) for (o = 0; o < y; o++) (c = this.arraylist.hook[o]).textid >= 0 &&
          (GlobalData.optManager.DeleteBlock(c.textid), c.textid = - 1);
          else this.arraylist.hook[y].textid >= 0 &&
            (
              !this.hooks.length ||
                this.hooks[0].hookpt !== ConstantData.HookPts.SED_LL &&
                this.hooks[0].hookpt !== ConstantData.HookPts.SED_LT ? (
                c = this.arraylist.hook[y],
                GlobalData.optManager.DeleteBlock(c.textid),
                c.textid = - 1
              ) : (
                (
                  c = this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl]
                ).textid >= 0 &&
                (GlobalData.optManager.DeleteBlock(l.textid), c.textid = - 1),
                c.textid = this.arraylist.hook[y].textid,
                this.arraylist.hook[y].textid = - 1
              )
            );
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_CoManager ? this._CollapseCoManager(t) : this.IsAsstConnector() &&
          this._CollapseAssistant()
      }
      GlobalData.optManager.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
        C ? Business.FindTreeTop(
          this,
          ConstantData.LinkFlags.SED_L_MOVE,
          {
            topconnector: - 1,
            topshape: - 1,
            foundtree: !1
          }
        ) : (u = GlobalData.optManager.GetObjectPtr(e, !0)) &&
        u.hooks.length &&
        GlobalData.optManager.SetLinkFlag(u.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE),
        this.Pr_Format(e),
        GlobalData.optManager.AddToDirtyList(e)
    } else this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_Obj1, !0)
  }

  DeleteObject() {
    var e,
      t,
      a,
      r,
      i,
      n,
      o = ConstantData.SEDA_Styles,
      s = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      l = this.arraylist.styleflags & o.SEDA_FlowConn,
      S = Business.FlowChart.AutoFormatFlags;
    for (e = this.arraylist.hook.length, t = 0; t < e; t++) if (- 1 != (a = this.arraylist.hook[t]).textid) {
      var c = GlobalData.objectStore.GetObject(a.textid);
      c &&
        c.Delete()
    }
    s.flags & ConstantData.SessionFlags.SEDS_AutoFormat &&
      l &&
      this.hooks.length &&
      (
        r = this.hooks[0].objid,
        (i = GlobalData.optManager.GetObjectPtr(r, !1)) &&
        i.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
        (
          0 === (
            n = GlobalDatagFlowChartManager.SED_ArrayShapeIsThreeWay(i, - 1, this.BlockID)
          ) ? GlobalDatagFlowChartManager.AutoFormatShape(r, S.SD_AutoFF_ToRect | S.SD_AutoFF_ToDefStyle | S.SD_AutFF_Force) : 2 === n &&
          GlobalDatagFlowChartManager.AutoFormatShape(r, S.SD_AutoFF_ToRect | S.SD_AutoFF_ToDecStyle)
        )
      )
  }



  IsAsstConnector() {
    var e = ConstantData.SEDA_Styles;
    return this.arraylist.styleflags & e.SEDA_Linear &&
      this.arraylist.styleflags & e.SEDA_PerpConn
  }



  AllowCurveOnConnector(e) {
    var t = ConstantData.SEDA_Styles,
      a = 0 == (this.arraylist.styleflags & t.SEDA_Linear) &&
        0 == (this.arraylist.styleflags & t.SEDA_BothSides) &&
        0 == (this.arraylist.styleflags & t.SEDA_Radial) &&
        0 === this.arraylist.tilt &&
        0 === this.arraylist.angle;
    if (
      this.IsAsstConnector() &&
      this.arraylist.hook.length > ConstantData.ConnectorDefines.SEDA_NSkip
    ) {
      var r = - 1,
        i = - 1,
        n = !1;
      if (
        this.arraylist.hook[ConstantData.ConnectorDefines.SEDA_NSkip].isasst ? (
          r = this.arraylist.hook[ConstantData.ConnectorDefines.SEDA_NSkip].id,
          i = ConstantData.ConnectorDefines.SEDA_NSkip + 1,
          n = !1
        ) : this.arraylist.hook[this.arraylist.hook.length - 1].isasst &&
        (
          r = this.arraylist.hook[this.arraylist.hook.length - 1].id,
          i = this.arraylist.hook.length - 1,
          n = !0
        ),
        r >= 0
      ) {
        var o = GlobalData.optManager.GetObjectPtr(r, !1);
        if (
          o &&
          o.arraylist &&
          o.arraylist.hook.length <= ConstantData.ConnectorDefines.SEDA_NSkip
        ) return e &&
          (e.index = i, e.left = n),
          !0
      }
    }
    return a
  }



  IsGenoConnector() {
    var e = ConstantData.SEDA_Styles;
    return (
      (this.arraylist.styleflags & e.SEDA_Linear) > 0 &&
      (this.arraylist.styleflags & e.SEDA_GenoConn) > 0
    ) > 0
  }



  IsCoManager(e) {
    var t = (
      this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_CoManager
    ) > 0,
      a = ConstantData.SEDA_Styles,
      r = this.arraylist.styleflags & a.SEDA_StartLeft;
    return t &&
      e &&
      (
        this.flags & ConstantData.ObjFlags.SEDO_Obj1 &&
        this.Pr_Format(this.BlockID),
        this.vertical ? (
          e.y = (this.EndPoint.y + this.StartPoint.y) / 2,
          e.x = r ? this.StartPoint.x - this.arraylist.coprofile.v : this.StartPoint.x + this.arraylist.coprofile.vdist,
          e.ht = this.arraylist.ht
        ) : (
          e.x = (this.EndPoint.x + this.StartPoint.x) / 2,
          e.y = r ? this.StartPoint.y - this.arraylist.coprofile.v : this.StartPoint.y + this.arraylist.coprofile.vdist,
          e.ht = this.arraylist.ht
        )
      ),
      t
  }



  GetChildFrame(e) {
    var t,
      a,
      r = {
        x: 0,
        y: 0,
        width: 150,
        height: 75
      },
      i = this.arraylist.hook.length;
    return (e += ConstantData.ConnectorDefines.SEDA_NSkip) > 0 &&
      e < i &&
      (t = this.arraylist.hook[e].id) >= 0 &&
      (
        a = GlobalData.optManager.GetObjectPtr(t, !1),
        r = Utils1.DeepCopy(a.Frame)
      ),
      r
  }



  GetPerimPts(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C,
      y,
      f,
      L,
      I,
      T,
      b,
      M,
      P,
      R,
      A,
      _,
      E,
      w = [],
      F = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_ReverseCol,
      v = ConstantData.ConnectorDefines,
      G = ConstantData.Defines.SED_FlowConnectorDisp,
      N = ConstantData.Defines.SED_FlowConnectorSlop;
    if (
      s = t.length,
      (
        u = (S = this.arraylist.hook.length) - ConstantData.ConnectorDefines.SEDA_NSkip
      ) < 0 &&
      (u = 0),
      f = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides &&
      0 == (
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Stagger
      ),
      L = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
      E = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_StartLeft,
      R = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides ||
      0 == (
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_PerpConn
      ),
      A = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Radial &&
      !R,
      _ = (
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Stagger
      ) > 0,
      d = F ? - 1 : 1,
      1 === s &&
      this.flags & ConstantData.ObjFlags.SEDO_Obj1 &&
      this.Pr_Format(e),
      t[0].x < 0
    ) {
      for (o = 0; o < s; o++) {
        if (- 3 === t[o].x) {
          if (R && (E = F), c = this.arraylist.hook[0], E) return this.vertical ? w.push(
            new Point(
              c.startpoint.v + this.StartPoint.x,
              c.startpoint.h + this.StartPoint.y
            )
          ) : w.push(
            new Point(
              c.startpoint.h + this.StartPoint.x,
              c.startpoint.v + this.StartPoint.y
            )
          ),
            w
        } else t[o].x === - ConstantData.ConnectorDefines.A_Cl ? c = this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl] : t[o].x === - ConstantData.ConnectorDefines.A_Cr &&
          (
            c = this.arraylist.hook[ConstantData.ConnectorDefines.A_Cr]
          );
        c &&
          (
            this.vertical ? w.push(
              new Point(
                c.endpoint.v + this.StartPoint.x,
                c.endpoint.h + this.StartPoint.y
              )
            ) : w.push(
              new Point(
                c.endpoint.h + this.StartPoint.x,
                c.endpoint.v + this.StartPoint.y
              )
            ),
            void 0 !== t[o].id &&
            (w[o].id = t[o].id)
          )
      }
      return w
    }
    if (1 === s) w.push(new Point(0, 0)),
      (l = t[0].x + ConstantData.ConnectorDefines.SEDA_NSkip) >= S &&
      (l = S - 1),
      c = this.arraylist.hook[l],
      this.vertical ? (w[0].x = c.endpoint.v, w[0].y = d * c.endpoint.h) : (w[0].x = c.endpoint.h, w[0].y = d * c.endpoint.v),
      w[0].x += this.StartPoint.x,
      w[0].y += this.StartPoint.y;
    else for (
      p = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),
      o = 0;
      o < s;
      o++
    ) if (t[o].y === v.SEDAC_PARENT) 0 === t[o].x ? (
      m = 2 * ConstantData.ConnectorDefines.A_Cl,
      w.push(new Point(p[m + 1].x, p[m + 1].y))
    ) : (
      m = 2 * ConstantData.ConnectorDefines.A_Cr,
      w.push(new Point(p[m + 1].x, p[m + 1].y))
    );
      else if (0 === o || 0 === t[o].x) {
        if (
          m = 2 * (t[o].x + ConstantData.ConnectorDefines.SEDA_NSkip),
          P = this.StartPoint.y,
          M = this.StartPoint.x,
          u > 1 ? (
            T = p[C = 2 * (t[o].x + 1 + ConstantData.ConnectorDefines.SEDA_NSkip)].y,
            b = p[C].x
          ) : (T = this.EndPoint.y, b = this.EndPoint.x),
          this.vertical
        ) switch (t[o].y) {
          case v.SEDAC_ABOVE:
            A ? (
              D = this.GetChildFrame(t[o].x),
              w.push(
                new Point(p[m + 1].x - D.width - this.arraylist.ht, p[m + 1].y)
              )
            ) : (g = p[m].x - N, w.push(new Point(g, (T + P) / 2)));
            break;
          case v.SEDAC_BELOW:
            A ? (
              D = this.GetChildFrame(t[o].x),
              w.push(
                new Point(p[m + 1].x + D.width + this.arraylist.ht, p[m + 1].y)
              )
            ) : (g = p[m].x + N, w.push(new Point(g, (T + P) / 2)));
            break;
          default:
            A ? w.push(new Point(p[m + 1].x, p[m + 1].y - 10)) : w.push(new Point(p[m + 1].x, p[m].y - 10))
        } else switch (t[o].y) {
          case v.SEDAC_ABOVE:
            A ? (
              D = this.GetChildFrame(t[o].x),
              w.push(
                new Point(p[m + 1].x, p[m + 1].y - D.height - this.arraylist.ht)
              )
            ) : (I = p[m].y - G, w.push(new Point((b + M) / 2, I)));
            break;
          case v.SEDAC_BELOW:
            A ? (
              D = this.GetChildFrame(t[o].x),
              w.push(
                new Point(p[m + 1].x, p[m + 1].y + D.height + this.arraylist.ht)
              )
            ) : (I = p[m].y + G, w.push(new Point((b + M) / 2, I)));
            break;
          default:
            A ? w.push(new Point(p[m + 1].x - 10, p[m + 1].y)) : w.push(new Point(p[m].x - 10, p[m + 1].y))
        }
        f &&
          o + 1 < s &&
          (m = 2 * (t[++o].x + ConstantData.ConnectorDefines.SEDA_NSkip)) < p.length - 1 &&
          (
            this.vertical ? w.push(new Point(p[m + 1].x, p[m].y - 10)) : w.push(new Point(p[m].x - 10, p[m + 1].y))
          )
      } else if (t[o].x > 0 && t[o].x < u) {
        if (
          m = 2 * (t[o].x - 1 + ConstantData.ConnectorDefines.SEDA_NSkip),
          C = 2 * (t[o].x + ConstantData.ConnectorDefines.SEDA_NSkip),
          t[o].x < u - 1 ? (
            T = p[y = 2 * (t[o].x + 1 + ConstantData.ConnectorDefines.SEDA_NSkip)].y,
            b = p[y].x
          ) : (T = this.EndPoint.y, b = this.EndPoint.x),
          this.vertical
        ) if (L) switch (t[o].y) {
          case v.SEDAC_ABOVE:
            g = p[C + 1].x - N,
              w.push(new Point(g, (T + p[C + 1].y) / 2));
            break;
          case v.SEDAC_BELOW:
            g = p[C + 1].x + N,
              w.push(new Point(g, (T + p[C + 1].y) / 2));
            break;
          default:
            g = p[C + 1].x,
              w.push(new Point(g, (p[C].y + p[C + 1].y) / 2))
        } else if (A) switch (t[o].y) {
          case v.SEDAC_ABOVE:
            D = this.GetChildFrame(t[o].x),
              w.push(
                new Point(p[C + 1].x - D.width - this.arraylist.ht, p[C + 1].y)
              );
            break;
          case v.SEDAC_BELOW:
            D = this.GetChildFrame(t[o].x),
              w.push(
                new Point(p[C + 1].x + D.width + this.arraylist.ht, p[C + 1].y)
              );
            break;
          default:
            w.push(new Point(p[C + 1].x, (p[C + 1].y + p[m + 1].y) / 2))
        } else h = (p[C].y - p[m].y) / 2 * this.arraylist.angle,
          f ? w.push(new Point(p[m - 1].x + h, (p[C].y + p[m].y) / 2)) : (
            h = - h,
            w.push(new Point(p[C + 1].x + h, (p[C].y + p[m].y) / 2))
          );
        else if (L) switch (t[o].y) {
          case v.SEDAC_ABOVE:
            I = p[m].y - G,
              w.push(new Point((b + p[C + 1].x) / 2, I));
            break;
          case v.SEDAC_BELOW:
            I = p[m].y + G,
              w.push(new Point((b + p[C + 1].x) / 2, I));
            break;
          default:
            I = p[m].y,
              w.push(new Point((p[C].x + p[C + 1].x) / 2, I))
        } else if (A) switch (t[o].y) {
          case v.SEDAC_ABOVE:
            D = this.GetChildFrame(t[o].x),
              w.push(
                new Point(p[C + 1].x, p[C + 1].y - D.height - this.arraylist.ht)
              );
            break;
          case v.SEDAC_BELOW:
            D = this.GetChildFrame(t[o].x),
              w.push(
                new Point(p[C + 1].x, p[C + 1].y + D.height + this.arraylist.ht)
              );
            break;
          default:
            w.push(new Point((p[C + 1].x + p[m + 1].x) / 2, p[C + 1].y))
        } else w.push(new Point((p[C].x + p[m].x) / 2, p[C + 1].y));
        f &&
          (
            this.vertical ? (
              h = (p[C].y - p[m].y) / 2 * this.arraylist.angle,
              w.push(new Point(p[C - 1].x + h, (p[C].y + p[m].y) / 2))
            ) : w.push(new Point((p[C].x + p[m].x) / 2, p[m + 1].y)),
            o++
          )
      } else o === u &&
        (
          m = 2 * (t[o - 1].x + ConstantData.ConnectorDefines.SEDA_NSkip),
          this.vertical ? f ? w.push(new Point(p[m - 1].x, p[m].y + 10)) : L ? w.push(new Point(p[m + 1].x, this.EndPoint.y + 10)) : A ? w.push(new Point(p[m + 1].x, p[m + 1].y + 10)) : (
            h = 10 * this.arraylist.angle,
            _ &&
              !E ? w.push(
                new Point(p[m].x - (p[m + 1].x - p[m].x) + h, p[m].y + 10)
              ) : w.push(new Point(p[m + 1].x + h, p[m].y + 10))
          ) : f ? w.push(new Point(p[m].x + 10, p[m - 1].y)) : L ? w.push(new Point(this.EndPoint.x + 10, p[m].y)) : A ? w.push(new Point(p[m + 1].x + 10, p[m + 1].y)) : w.push(new Point(p[m].x + 10, p[m + 1].y)),
          f &&
          o + 1 < s &&
          (m = 2 * (t[++o].x + ConstantData.ConnectorDefines.SEDA_NSkip)) < p.length - 1 &&
          (
            this.vertical ? w.push(new Point(p[m + 1].x, p[m].y - 10)) : w.push(new Point(p[m].x - 10, p[m + 1].y))
          )
        );
    return w
  }

  SetHookAlign(e, t) {
    var a,
      r,
      i = ConstantData.ConnectorDefines;
    this.arraylist.angle &&
      this.arraylist.hook.length &&
      t != e &&
      (
        this.arraylist.hook[i.A_Cl].id >= 0 ? (
          this.arraylist.hook[i.A_Cr].id = this.arraylist.hook[i.A_Cl].id,
          this.arraylist.hook[i.A_Cl].id = - 1,
          r = this.arraylist.hook[i.A_Cr].gap,
          this.arraylist.hook[i.A_Cr].gap = this.arraylist.hook[i.A_Cl].gap,
          this.arraylist.hook[i.A_Cl].gap = r,
          (
            a = GlobalData.optManager.GetObjectPtr(this.arraylist.hook[i.A_Cr].id, !0)
          ) &&
          a.hooks.length &&
          (
            a.hooks[0].hookpt = ConstantData.HookPts.SED_AKCT,
            a.hooks[0].connect.x = - i.A_Cr
          )
        ) : this.arraylist.hook[i.A_Cr].id >= 0 &&
        (
          this.arraylist.hook[i.A_Cl].id = this.arraylist.hook[i.A_Cr].id,
          this.arraylist.hook[i.A_Cr].id = - 1,
          r = this.arraylist.hook[i.A_Cl].gap,
          this.arraylist.hook[i.A_Cl].gap = this.arraylist.hook[i.A_Cr].gap,
          this.arraylist.hook[i.A_Cr].gap = r,
          (
            a = GlobalData.optManager.GetObjectPtr(this.arraylist.hook[i.A_Cl].id, !0)
          ) &&
          a.hooks.length &&
          (
            a.hooks[0].hookpt = ConstantData.HookPts.SED_AKCB,
            a.hooks[0].connect.x = - i.A_Cl
          )
        ),
        this.arraylist.angle = - this.arraylist.angle,
        this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_Obj1, !0)
      )
  }



  GetHookPoints() {
    var e,
      t,
      a,
      r = [],
      i = ConstantData.SEDA_Styles;
    return null == this.arraylist ? null : (
      a = this.arraylist.hook.length,
      e = this.arraylist.styleflags & i.SEDA_BothSides ||
      0 == (this.arraylist.styleflags & i.SEDA_PerpConn),
      t = (this.arraylist.styleflags & i.SEDA_Linear) > 0,
      a > 1 ||
        t ? (
        r.push(new Point(- 1, 0)),
        this.vertical ? r[0].id = ConstantData.HookPts.SED_LT : r[0].id = ConstantData.HookPts.SED_LL,
        0 !== e &&
        (
          r.push(new Point(- 2, 0)),
          this.vertical ? r[1].id = ConstantData.HookPts.SED_LB : r[1].id = ConstantData.HookPts.SED_LR
        )
      ) : (
        r.push(new Point(- 1, 0)),
        this.vertical ? r[0].id = ConstantData.HookPts.SED_LT : r[0].id = ConstantData.HookPts.SED_LL
      ),
      r
    )
  }



  WriteSDFAttributes(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p = {},
      d = !1,
      D = ConstantData.SEDA_Styles,
      g = ConstantData.ConnectorDefines;
    i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWARRAY),
      (
        l = (a = this.arraylist.hook.length) - ConstantData.ConnectorDefines.SEDA_NSkip
      ) < 0 &&
      (l = 0);
    var h = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
      m = ConstantData.ConnectorDefines.SEDA_NSkip,
      C = this.arraylist.styleflags;
    if (
      C & D.SEDA_ReverseCol &&
      this.vertical &&
      (C = Utils2.SetFlag(C, D.SEDA_ReverseCol, !1), d = !0),
      u = t.WriteBlocks ? this.BlockID : t.arrayid++,
      n = Utils2.CRect2Rect(this.arraylist.profile, this.vertical),
      t.WriteVisio ||
      t.WriteWin32
    ) {
      var y = {
        InstID: u,
        styleflags: this.arraylist.styleflags,
        tilt: this.arraylist.tilt,
        ht: 0,
        wd: 0,
        nshapes: l,
        nlines: a,
        lht: SDF.ToSDWinCoords(this.arraylist.ht, t.coordScaleFactor),
        lwd: SDF.ToSDWinCoords(this.arraylist.wd, t.coordScaleFactor),
        profile: {
          x: n.x,
          y: n.y,
          width: n.width,
          height: n.height
        },
        angle: this.arraylist.angle
      };
      e.writeStruct(FileParser.SDF_ARRAY_Struct, y)
    } else {
      y = {
        InstID: u,
        styleflags: this.arraylist.styleflags,
        tilt: this.arraylist.tilt,
        nshapes: l,
        nlines: a,
        lht: SDF.ToSDWinCoords(this.arraylist.ht, t.coordScaleFactor),
        lwd: SDF.ToSDWinCoords(this.arraylist.wd, t.coordScaleFactor),
        angle: this.arraylist.angle,
        curveparam: this.arraylist.curveparam
      };
      e.writeStruct(FileParser.SDF_ARRAY_Struct_34, y)
    }
    SDF.Write_LENGTH(e, i);
    var f = new Point(
      this.StartPoint.x - this.Frame.x,
      this.StartPoint.y - this.Frame.y
    );
    for (this.vertical ? f.x = 0 : f.y = 0, r = 0; r < a; r++) {
      if (
        this.arraylist.hook[r].startpoint.h < this.arraylist.hook[r].endpoint.h ? (
          p.h = this.arraylist.hook[r].startpoint.h,
          p.hdist = this.arraylist.hook[r].endpoint.h - this.arraylist.hook[r].startpoint.h
        ) : (
          p.h = this.arraylist.hook[r].endpoint.h,
          p.hdist = this.arraylist.hook[r].startpoint.h - this.arraylist.hook[r].endpoint.h
        ),
        this.arraylist.hook[r].startpoint.v < this.arraylist.hook[r].endpoint.v ? (
          p.v = this.arraylist.hook[r].startpoint.v,
          p.vdist = this.arraylist.hook[r].endpoint.v - this.arraylist.hook[r].startpoint.v
        ) : (
          p.v = this.arraylist.hook[r].endpoint.v,
          p.vdist = this.arraylist.hook[r].startpoint.v - this.arraylist.hook[r].endpoint.v
        ),
        o = Utils2.CRect2Rect(p, this.vertical),
        s = SDF.ToSDWinRect(o, t.coordScaleFactor, f),
        c = this.arraylist.hook[r].gap,
        d &&
        (
          r === g.A_Cl ? c = 0 : r === g.A_Cr &&
            (c = this.arraylist.hook[g.A_Cl].gap)
        ),
        i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWARRAYHOOK),
        t.WriteVisio ||
        t.WriteWin32
      ) {
        var L = {
          liner: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          },
          uniqueid: SDF.BlockIDtoUniqueID(this.arraylist.hook[r].id, t),
          index: 0,
          gap: 0,
          extra: SDF.ToSDWinCoords(this.arraylist.hook[r].extra, t.coordScaleFactor),
          lliner: {
            left: s.left,
            top: s.top,
            right: s.right,
            bottom: s.bottom
          },
          lgap: SDF.ToSDWinCoords(c, t.coordScaleFactor)
        };
        e.writeStruct(FileParser.SDF_ARRAYHOOK_Struct_38, L)
      } else {
        L = {
          uniqueid: SDF.BlockIDtoUniqueID(this.arraylist.hook[r].id, t),
          extra: SDF.ToSDWinCoords(this.arraylist.hook[r].extra, t.coordScaleFactor),
          lliner: {
            left: s.left,
            top: s.top,
            right: s.right,
            bottom: s.bottom
          },
          lgap: SDF.ToSDWinCoords(c, t.coordScaleFactor)
        };
        e.writeStruct(FileParser.SDF_ARRAYHOOK_Struct_50, L)
      }
      SDF.Write_LENGTH(e, i),
        (
          S = h &&
            r >= m ? r < a - 1 ? this.arraylist.hook[r + 1] : null : this.arraylist.hook[r]
        ) &&
        S.textid >= 0 &&
        (
          L = t.WriteBlocks ||
            t.WriteGroupBlock ? {
            tindex: 0,
            tuniqueid: S.textid
          }
            : {
              tindex: 0,
              tuniqueid: SDF.BlockIDtoUniqueID(- S.textid, t)
            },
          i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWARRAYTEXT),
          e.writeStruct(FileParser.SDF_ArrayHookText_Struct, L),
          SDF.Write_LENGTH(e, i)
        )
    }
    e.writeUint16(FileParser.SDROpCodesByName.SDF_C_DRAWARRAY_END),
      this.TextFlags = Utils2.SetFlag(
        this.TextFlags,
        ConstantData.TextFlags.SED_TF_HorizText,
        !this.TextDirection
      ),
      SDF.WriteTextParams(e, this, - 1, t),
      SDF.WriteArrowheads(e, t, this)
  }



  GetTextIDs() {
    var e,
      t,
      a,
      r = [];
    for (t = this.arraylist.hook.length, e = 0; e < t; e++) (a = this.arraylist.hook[e]).textid >= 0 &&
      r.push(a.textid);
    return r
  }



  NoFlip() {
    return !0
  }



  NoRotate() {
    return !0
  }



  AllowTextEdit() {
    return !(this.flags & ConstantData.ObjFlags.SEDO_Lock) &&
      this.TextFlags & ConstantData.TextFlags.SED_TF_AttachC
  }



  GetArrowheadFormat() {
    // var e = new ListManager.ArrowheadRecord;

    var arrHead = new ArrowheadRecord();

    // return arrHead.StartArrowID = this.StartArrowID,
    //   arrHead.EndArrowID = this.EndArrowID,
    //   arrHead.StartArrowDisp = this.StartArrowDisp,
    //   arrHead.EndArrowDisp = this.EndArrowDisp,
    //   arrHead.ArrowSizeIndex = this.ArrowSizeIndex,
    //   arrHead


    arrHead.StartArrowID = this.StartArrowID;
    arrHead.EndArrowID = this.EndArrowID;
    arrHead.StartArrowDisp = this.StartArrowDisp;
    arrHead.EndArrowDisp = this.EndArrowDisp;
    arrHead.ArrowSizeIndex = this.ArrowSizeIndex;
    return arrHead;
  }



  ChangeTextAttributes(e, t, a, r, i, n, o, s) {
    if ((e || t || a || r || s) && 0 !== this.GetTextIDs().length) {
      if (o) var l = o;
      else l = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      var S,
        c,
        u;
      for (
        t &&
        (
          void 0 !== t.FontName &&
          (this.StyleRecord.Text.FontName = t.FontName),
          void 0 !== t.FontId &&
          (this.StyleRecord.Text.FontId = t.FontId),
          void 0 !== t.FontSize &&
          (this.StyleRecord.Text.FontSize = t.FontSize),
          void 0 !== t.Face &&
          (this.StyleRecord.Text.Face = t.Face),
          void 0 !== t.Color &&
          (this.StyleRecord.Text.Paint.Color = t.Color),
          void 0 !== t.Opacity &&
          (this.StyleRecord.Text.Paint.Opacity = t.Opacity)
        ),
        u = this.arraylist.hook.length,
        c = 0;
        c < u;
        ++c
      ) (S = this.arraylist.hook[c]).textid < 0 ||
        (
          this.DataID = S.textid,
          this.arraylist.lasttexthook = c,
          l &&
          (
            l.textElem = l.GetElementByID(ConstantData.SVGElementClass.TEXT, c)
          ),
          GlobalData.optManager.ChangeObjectTextAttributes(this.BlockID, e, t, i, r, n, l, s)
        );
      this.DataID = - 1,
        this.lasttexthook = - 1
    }
  }



  _CollapseCoManager(e) {
    var t,
      a,
      r,
      i,
      n,
      o,
      s,
      l = [],
      S = {
        x: 0,
        y: 0
      };
    t = this.arraylist.hook.length - ConstantData.ConnectorDefines.SEDA_NSkip,
      (r = GlobalData.optManager.GetObjectPtr(e, !0)) &&
      t >= 1 &&
      (
        a = this.arraylist.hook[ConstantData.ConnectorDefines.SEDA_NSkip].id,
        (i = GlobalData.optManager.FindChildArray(e, - 1)) >= 0 ? (n = GlobalData.optManager.GetObjectPtr(i, !0)) &&
          GlobalData.optManager.UpdateHook(i, 0, a, n.hooks[0].hookpt, n.hooks[0].connect, null) : (i = GlobalData.optManager.FindChildArray(a, - 1)) >= 0 &&
        GlobalData.optManager.SetLinkFlag(a, ConstantData.LinkFlags.SED_L_MOVE)
      ),
      t <= 1 &&
      (
        this.hooks.length ? (o = this.hooks[0].objid, S.x = this.hooks[0].connect.x) : o = - 1,
        o >= 0 &&
        (
          GlobalData.optManager.UpdateHook(
            this.BlockID,
            0,
            - 1,
            this.hooks[0].hookpt,
            this.hooks[0].connect,
            null
          ),
          s = GlobalData.optManager.GetObjectPtr(o, !1)
        ),
        1 === t &&
        (
          a = this.arraylist.hook[ConstantData.ConnectorDefines.SEDA_NSkip].id,
          (r = GlobalData.optManager.GetObjectPtr(a, !0)) &&
          s &&
          (
            r.hooks[0].hookpt = s.GetBestHook(a, r.hooks[0].hookpt, r.hooks[0].connect),
            GlobalData.optManager.UpdateHook(a, 0, o, r.hooks[0].hookpt, S, null)
          ),
          (i = GlobalData.optManager.FindChildArray(a, - 1)) >= 0 &&
          (n = GlobalData.optManager.GetObjectPtr(i, !0)) &&
          n._FixHook(!1, !0)
        ),
        l.push(this.BlockID),
        GlobalData.optManager.DeleteObjects(l, !1)
      )
  }



  _CollapseAssistant() {
    var e,
      t,
      a,
      r,
      i,
      n = [];
    1 === (
      e = this.arraylist.hook.length - ConstantData.ConnectorDefines.SEDA_NSkip
    ) &&
      (
        t = this.arraylist.hook[ConstantData.ConnectorDefines.SEDA_NSkip],
        (a = GlobalData.optManager.GetObjectPtr(t.id, !0)) &&
        a.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
        (r = this.hooks.length ? this.hooks[0].objid : - 1) >= 0 &&
        (
          a._FixHook(!1, !1),
          (i = GlobalData.optManager.GetObjectPtr(r, !0)) &&
          i.IsCoManager() &&
          (
            a.hooks[0].connect.y = - ConstantData.SEDA_Styles.SEDA_CoManager
          ),
          GlobalData.optManager.UpdateHook(t.id, 0, r, a.hooks[0].hookpt, a.hooks[0].connect, null),
          GlobalData.optManager.UpdateHook(
            this.BlockID,
            0,
            - 1,
            this.hooks[0].hookpt,
            this.hooks[0].connect,
            null
          ),
          e = 0,
          GlobalData.optManager.SetLinkFlag(r, ConstantData.LinkFlags.SED_L_MOVE)
        ),
        e < 1 &&
        (n.push(this.BlockID), GlobalData.optManager.DeleteObjects(n, !1))
      )
  }



  Pr_Format(e) {
    var t,
      a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C,
      y,
      f,
      L,
      I,
      T,
      b,
      M,
      P,
      R,
      A,
      _,
      E,
      w,
      F,
      v,
      G,
      N,
      k,
      U,
      J,
      x,
      O,
      B,
      H,
      V,
      j,
      z,
      W,
      q,
      K,
      X,
      Y,
      $ = 0,
      Z = 0,
      Q = ConstantData.SEDA_Styles,
      ee = {},
      te = {},
      ae = {},
      re = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      ie = [],
      ne = !1,
      oe = {},
      se = {
        lgap: 0
      },
      le = 0,
      Se = 0 == (re.flags & ConstantData.SessionFlags.SEDS_NoStepFormatting),
      ce = this.arraylist.styleflags & Q.SEDA_ReverseCol,
      ue = ConstantData.ObjectTypes;
    if (
      this.arraylist.styleflags & Q.SEDA_MatchSize &&
      this.MatchSize(!1, 0),
      this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_Obj1, !1),
      null != this.arraylist &&
      0 !== (t = this.arraylist.hook.length)
    ) {
      if (
        i = ConstantData.ConnectorDefines.SEDA_NSkip,
        J = this.arraylist.styleflags & Q.SEDA_Linear,
        G = this.arraylist.styleflags & Q.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & Q.SEDA_PerpConn),
        N = this.arraylist.styleflags & Q.SEDA_BothSides,
        F = this.arraylist.styleflags & Q.SEDA_Stagger,
        v = this.arraylist.styleflags & Q.SEDA_StartLeft,
        h = this.arraylist.styleflags & Q.SEDA_FlowConn,
        U = this.arraylist.styleflags & Q.SEDA_CoManager,
        x = this.IsAsstConnector(),
        B = this.IsGenoConnector(),
        k = this.arraylist.styleflags & Q.SEDA_Radial &&
        !G,
        Y = 0 == (this.arraylist.styleflags & Q.SEDA_Linear) &&
        this.arraylist.styleflags & Q.SEDA_FlowConn,
        p = re.flags & ConstantData.SessionFlags.SEDS_NoTreeOverlap,
        Se &&
        (p = !0),
        h
      ) p = !1,
        Se = !1;
      else switch (this.objecttype) {
        case ue.SD_OBJT_CAUSEEFFECT_MAIN:
        case ue.SD_OBJT_CAUSEEFFECT_BRANCH:
          p = !0,
            Se = !1;
          break;
        default:
          p = !0,
            Se = !0
      }
      if (
        Y &&
        (p = !0),
        q = this.arraylist.ht,
        K = this.arraylist.wd,
        this.hooks.length &&
        (z = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, !1)) &&
        (
          ne = z.IsCoManager(oe),
          z.IsAsstConnector() &&
          (
            le = z.arraylist.coprofile.vdist,
            t >= i &&
            (
              this.arraylist.hook[1].gap > 0 &&
              (this.arraylist.hook[1].gap = q),
              this.arraylist.hook[2].gap > 0 &&
              (this.arraylist.hook[2].gap = q)
            )
          )
        ),
        (r = t - i) < 0 &&
        (r = 0),
        t >= i
      ) for (a = 1; a < i; a++) this.arraylist.hook[a].id >= 0 &&
        r++;
      if (
        H = new CRect(0, 0, 0, 0),
        ae.h = this.arraylist.profile.h,
        ae.hdist = this.arraylist.profile.hdist,
        ae.v = this.arraylist.profile.v,
        ae.vdist = this.arraylist.profile.vdist,
        t &&
        this.hooks &&
        this.hooks.length
      ) switch (G ? this.hooks[0].hookpt : ConstantData.HookPts.SED_LL) {
        case ConstantData.HookPts.SED_LL:
        case ConstantData.HookPts.SED_LT:
          $ = ConstantData.HookPts.SED_LL,
            0 === r ? (
              n = this.arraylist.hook[0],
              ee.h = n.startpoint.h,
              ee.v = n.startpoint.v
            ) : (
              n = this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl],
              ee.h = n.endpoint.h,
              ee.v = n.endpoint.v
            );
          break;
        default:
          $ = ConstantData.HookPts.SED_LR,
            0 === r ? (n = this.arraylist.hook[0], ee.h = n.endpoint.h, ee.v = n.endpoint.v) : (
              n = this.arraylist.hook[ConstantData.ConnectorDefines.A_Cr],
              ee.h = n.endpoint.h,
              ee.v = n.endpoint.v
            )
      } else ee.h = 0,
        ee.v = 0;
      if (0 === r || this.flags & ConstantData.ObjFlags.SEDO_NotVisible) {
        for (
          G ? (
            this.arraylist.hook[0].startpoint.h = 0,
            this.arraylist.hook[0].startpoint.v = 0,
            this.arraylist.hook[0].endpoint.v = 0,
            this.arraylist.hook[0].endpoint.h = K,
            $ === ConstantData.HookPts.SED_LR &&
            (this.arraylist.hook[0].endpoint.h = - K),
            this.vertical ? (
              this.EndPoint.x = this.StartPoint.x,
              this.EndPoint.y = this.StartPoint.y + this.arraylist.hook[0].endpoint.h
            ) : (
              this.EndPoint.y = this.StartPoint.y,
              this.EndPoint.x = this.StartPoint.x + this.arraylist.hook[0].endpoint.h
            )
          ) : (
            this.arraylist.hook[0].startpoint.h = 0,
            this.arraylist.hook[0].startpoint.v = 0,
            this.arraylist.hook[0].endpoint.h = 0,
            this.arraylist.hook[0].endpoint.v = q,
            $ === ConstantData.HookPts.SED_LR &&
            (this.arraylist.hook[0].endpoint.v = - q),
            this.vertical ? (
              this.EndPoint.y = this.StartPoint.y,
              this.EndPoint.x = this.StartPoint.x + this.arraylist.hook[0].endpoint.v
            ) : (
              this.EndPoint.x = this.StartPoint.x,
              this.EndPoint.y = this.StartPoint.y + this.arraylist.hook[0].endpoint.v
            )
          ),
          a = 1;
          a < t;
          a++
        ) this.arraylist.hook[a].startpoint.h = 0,
          this.arraylist.hook[a].startpoint.v = 0,
          this.arraylist.hook[a].endpoint.h = this.arraylist.hook[0].endpoint.h,
          this.arraylist.hook[a].endpoint.v = this.arraylist.hook[0].endpoint.h;
        return 0 === r &&
          (
            this.arraylist.profile.h = 0,
            this.arraylist.profile.v = 0,
            this.arraylist.profile.hdist = 0,
            this.arraylist.profile.vdist = 0,
            this.arraylist.steps.length = 0
          ),
          void this.CalcFrame()
      }
      for (m = 0, 0, E = 0, P = 0, R = 0, I = N ? 1 : 0, A = v, a = i; a < t; a++) (n = this.arraylist.hook[a]).pr.h = 0,
        n.pr.v = 0,
        n.pr.hdist = 0,
        n.pr.vdist = 0,
        n.steps.splice(0),
        n.comanagerht = 0,
        n.isasst = !1,
        (O = GlobalData.optManager.GetObjectPtr(n.id, !1)) ? (
          C = (o = O.GetArrayRect(this.vertical)).h + o.hdist / 2,
          n.pr.h = C,
          n.pr.hdist = 0,
          J ? (n.pr.v = o.vdist / 2, n.pr.vdist = o.vdist / 2) : (n.pr.v = 0, n.pr.vdist = o.vdist),
          n.gap = o.hdist / 2,
          n.ogap = o.hdist / 2,
          n.steps.push(new StepRect(- o.hdist / 2, 0, o.hdist / 2, o.vdist)),
          n.comanagerht = 0,
          O.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
          (
            O.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_CoManager &&
            (n.comanagerht = O.arraylist.ht),
            this.IsAsstConnector() &&
            (n.isasst = !0)
          ),
          F &&
          (a - i) % 2 == 0 &&
          E < o.vdist &&
          (E = o.vdist),
          p &&
          (
            (d = this._GetElementProfile(n.id, A, Se, null, Y, !1)) &&
            (
              n.pr.h = d.frame.h,
              n.pr.v = d.frame.v,
              n.pr.hdist = d.frame.hdist,
              n.pr.vdist = d.frame.vdist,
              n.gap = n.pr.h,
              n.ogap = n.pr.hdist,
              o = n.pr,
              n.steps = d.steps
            ),
            Y &&
            (n.pr.v = 0, n.pr.vdist = 0)
          )
        ) : (n.gap = 0, n.ogap = 0, o = new Rectangle(0, 0, 0, 0)),
        m < o.vdist &&
        (m = o.vdist),
        N ? (
          A = !A,
          (a - i) % 2 == 0 ? v ? P < o.vdist &&
            (P = o.vdist) : P < o.v &&
          (P = o.v) : v ? R < o.v &&
            (R = o.v) : R < o.vdist &&
          (R = o.vdist)
        ) : v ? P < o.vdist &&
          (P = o.vdist) : P < o.v &&
        (P = o.v);
      if (
        y = 0,
        0,
        E += q < 8 ? 8 : q,
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_MAIN &&
        (P = 0, R = 0),
        J
      ) ie = this._FormatLinear(re, e, Se, H, ie, x, se),
        y = H.x;
      else for (a = i; a < t; a++) T = (n = this.arraylist.hook[a]).gap,
        M = Se ? 0 : n.ogap,
        b = n.extra,
        N &&
          a + 1 < t ? (
          (u = this.arraylist.hook[a + 1]).gap > T &&
          (T = u.gap),
          u.extra > b &&
          (b = u.extra),
          u.ogap > M &&
          (M = u.ogap)
        ) : u = null,
        a > i &&
        (
          Se ? (
            F &&
            !N &&
            (a - i) % 2 == 1 &&
            (
              j = new StepRect(
                - this.StyleRecord.Line.Thickness,
                0,
                this.StyleRecord.Line.Thickness,
                E
              ),
              this._InsertStepIntoProfile(n.steps, j)
            ),
            y = this._CompareSteps(ie, n.steps) + K + b,
            u &&
            (_ = this._CompareSteps(ie, u.steps) + K + b) > y &&
            (y = _)
          ) : (y += b, y += T)
        ),
        n.startpoint.h = y,
        n.startpoint.v = 0,
        n.endpoint.h = y,
        n.endpoint.v = q + P - n.comanagerht,
        n.endpoint.v < 0 &&
        (n.endpoint.v = 0),
        u &&
        (
          u.startpoint.h = y,
          u.startpoint.v = 0,
          u.endpoint.h = y,
          u.endpoint.v = - (q + R)
        ),
        F &&
        (
          N ? u &&
            (M < 0 && (M = 0), y += M + K / 2, M = 0, u.startpoint.h = y, u.endpoint.h = y) : (a - i) % 2 == 1 &&
          (n.endpoint.v += E)
        ),
        v &&
        (n.endpoint.v = - n.endpoint.v, u && (u.endpoint.v = - u.endpoint.v)),
        this._UpdateCurrentProfile(H, n, ce),
        u &&
        this._UpdateCurrentProfile(H, u, ce),
        Se &&
        (
          ie = a === i ? Utils1.DeepCopy(n.steps) : this._AddStepsToProfile(ie, n.steps, !1, !1, n.startpoint.h, 0),
          u &&
          (
            ie = this._AddStepsToProfile(ie, u.steps, !1, !1, u.startpoint.h, 0)
          )
        ),
        (a += I) < t - 1 &&
        (Se || (y += F && N ? M + K / 2 : M + K));
      if (
        (
          D = this.arraylist.hook[ConstantData.ConnectorDefines.A_Bk]
        ).startpoint.h = 0,
        D.startpoint.v = 0,
        D.endpoint.h = J ? 0 : y,
        D.endpoint.v = 0,
        l = this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl],
        s = this.arraylist.hook[ConstantData.ConnectorDefines.A_Cr],
        l.id >= 0 &&
        (O = GlobalData.optManager.GetObjectPtr(l.id, !1)) &&
        (
          C = (o = O.GetArrayRect(this.vertical)).h + o.hdist / 2,
          l.pr.h = C,
          l.pr.hdist = 0,
          l.pr.v = 0,
          l.pr.vdist = o.vdist,
          this._UpdateCurrentProfile(H, l, ce)
        ),
        s.id >= 0 &&
        (O = GlobalData.optManager.GetObjectPtr(s.id, !1)) &&
        (
          C = (o = O.GetArrayRect(this.vertical)).h + o.hdist / 2,
          s.pr.h = C,
          s.pr.hdist = 0,
          s.pr.v = 0,
          s.pr.vdist = o.vdist,
          this._UpdateCurrentProfile(H, s, ce)
        ),
        0 === $ &&
        (l.gap = 0),
        U &&
        (l.gap = 0),
        ne ? (W = oe.ht) > this.arraylist.ht / 2 &&
          (W = this.arraylist.ht / 2) : W = 0,
        G
      ) {
        if (
          t > i ? (
            S = this.arraylist.hook[i],
            N &&
            !F &&
            t > i + 1 &&
            this.arraylist.hook[i + 1].gap > this.arraylist.hook[i].gap &&
            (S = this.arraylist.hook[i + 1]),
            c = this.arraylist.hook[t - 1],
            N &&
            !F &&
            t > i + 1 &&
            this.arraylist.hook[t - 2].gap > this.arraylist.hook[t - 1].gap &&
            (c = this.arraylist.hook[t - 2]),
            f = S.gap,
            L = c.gap
          ) : (f = 0, L = 0),
          w = this._GetTilt(),
          J &&
          (f = 0, L = 0, 0 === $ && (s.gap = 0)),
          this.hooks.length
        ) switch (this.hooks[0].hookpt) {
          case ConstantData.HookPts.SED_LL:
          case ConstantData.HookPts.SED_LT:
            s.gap = 0,
              L = 0,
              f -= W - le,
              J &&
              h &&
              0 == (
                this.arraylist.flags & ConstantData.Array_Flags.Array_LeaveA_Cl
              ) &&
              0 === l.gap &&
              (l.gap = K);
            break;
          case ConstantData.HookPts.SED_LB:
          case ConstantData.HookPts.SED_LR:
            l.gap = 0,
              f = 0,
              L -= W - le,
              J &&
              h &&
              0 == (
                this.arraylist.flags & ConstantData.Array_Flags.Array_LeaveA_Cr
              ) &&
              0 === s.gap &&
              (s.gap = K)
        }
        l.id >= 0 &&
          (
            0 === l.gap &&
            (l.gap = F ? K / 2 : K, S && (l.gap += S.gap)),
            this.arraylist.matchsizelen &&
            (
              Z = l.gap,
              l.gap = this.arraylist.matchsizelen - y,
              l.gap < Z &&
              (l.gap = Z)
            )
          ),
          s.id >= 0 &&
          (
            s.gap = F ? K / 2 : K,
            c &&
            (s.gap += c.gap),
            this.arraylist.matchsizelen &&
            (
              Z = s.gap,
              s.gap = this.arraylist.matchsizelen - y,
              s.gap < Z &&
              (s.gap = Z)
            )
          ),
          l.startpoint.h = 0,
          l.startpoint.v = 0,
          this.arraylist.angle ? l.endpoint.h = - l.gap : (
            l.endpoint.h = - l.gap - f,
            0 == (
              re.moreflags & ConstantData.SessionMoreFlags.SEDSM_Swimlane_Rows
            ) &&
            0 == (
              re.moreflags & ConstantData.SessionMoreFlags.SEDSM_Swimlane_Cols
            ) &&
            h &&
            J &&
            (l.endpoint.h -= l.extra)
          ),
          $ === ConstantData.HookPts.SED_LL &&
          (l.endpoint.h += w),
          l.endpoint.v = 0,
          s.startpoint.h = y + se.lgap,
          s.startpoint.v = 0,
          w ||
            this.arraylist.angle ? s.endpoint.h = y + s.gap : (
            s.endpoint.h = y + s.gap + L,
            0 == (
              re.moreflags & ConstantData.SessionMoreFlags.SEDSM_Swimlane_Rows
            ) &&
            0 == (
              re.moreflags & ConstantData.SessionMoreFlags.SEDSM_Swimlane_Cols
            ) &&
            h &&
            J &&
            (s.endpoint.h += s.extra)
          ),
          s.endpoint.v = 0
      } else if (
        null != H.firstconnector_x ? (
          X = H.firstconnector_x ? 2 * (H.firstconnector_x + K) : 0,
          l.gap = - H.v + q + l.extra
        ) : X = y,
        l.startpoint.h = X / 2,
        l.startpoint.v = 0,
        l.endpoint.h = X / 2,
        l.endpoint.v = v ? l.gap - W + le : - l.gap + W - le,
        s.startpoint.h = X / 2,
        s.startpoint.v = 0,
        s.endpoint.h = X / 2,
        s.endpoint.v = 0,
        k
      ) {
        for (D.startpoint.h = X / 2, D.endpoint.h = X / 2, a = i; a < t; a++) (D = this.arraylist.hook[a]).startpoint.h = X / 2;
        l.endpoint.v = 0
      }
      if (
        this.arraylist.angle ? this._AdjustAngleConnector() : this.arraylist.tilt &&
          this._AdjustTiltConnector(),
        this.vertical ? (
          this.EndPoint.x = this.StartPoint.x + D.endpoint.v,
          this.EndPoint.y = ce ? this.StartPoint.y - y : this.StartPoint.y + y
        ) : (
          this.EndPoint.y = this.StartPoint.y,
          this.EndPoint.x = ce ? this.StartPoint.x - y : this.StartPoint.x + y
        ),
        this.CalcFrame(),
        this.hooks &&
        this.hooks.length
      ) {
        if (G) switch (this.hooks[0].hookpt) {
          case ConstantData.HookPts.SED_LL:
          case ConstantData.HookPts.SED_LT:
            n = this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl];
            break;
          default:
            n = this.arraylist.hook[ConstantData.ConnectorDefines.A_Cr]
        } else n = this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl];
        te.h = n.endpoint.h,
          te.v = n.endpoint.v,
          null != ee.h &&
          (
            Utils2.IsEqual(ee.h, te.h) &&
            Utils2.IsEqual(ee.v, te.v) ||
            GlobalData.optManager.SetLinkFlag(this.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE)
          )
      } else te.h = 0,
        te.v = 0;
      if (
        this.arraylist.coprofile = Utils1.DeepCopy(H),
        this.arraylist.profile.h = te.h - H.h,
        this.arraylist.profile.hdist = H.hdist - te.h,
        this.arraylist.profile.v = te.v - H.v,
        this.arraylist.profile.vdist = H.vdist - te.v,
        U &&
        (
          v ? this.arraylist.profile.v += q : this.arraylist.profile.vdist += q,
          this.arraylist.coprofile = Utils1.DeepCopy(this.arraylist.profile),
          Se &&
          ie.length &&
          (ie[0].vend += 2 * q, ie[0].v -= 2 * q),
          ie = this._AddCoManagerChildren(v, Se, ie)
        ),
        (x || B) &&
        (ie = this._AddAssistantChildren(v, Se, ie)),
        Se
      ) {
        if (G) {
          for (V = (ie = this._BuildSideConnectorSteps()).length, a = 0; a < V; a++) N ||
            (v ? ie[a].hend = te.v : ie[a].h = te.v);
          j = new StepRect(
            - this.StyleRecord.Line.Thickness,
            0,
            this.StyleRecord.Line.Thickness,
            - te.h
          ),
            this._InsertStepIntoProfile(ie, j),
            ie.length > 1 &&
            (ie[0].vend = ie[1].v)
        } else {
          for (V = ie.length, a = 0; a < V; a++) ie[a].h -= te.h,
            ie[a].hend -= te.h;
          x ? (
            g = v ? n.endpoint.v : - n.endpoint.v,
            j = new StepRect(
              - this.StyleRecord.Line.Thickness,
              0,
              this.StyleRecord.Line.Thickness,
              g
            ),
            this._InsertStepIntoProfile(ie, j)
          ) : U ||
          (
            j = new StepRect(- te.h, 0, D.endpoint.h - te.h, q),
            this._InsertStepIntoProfile(ie, j),
            g = v ? n.endpoint.v : - n.endpoint.v,
            j = new StepRect(
              - this.StyleRecord.Line.Thickness,
              0,
              this.StyleRecord.Line.Thickness,
              g
            ),
            this._InsertStepIntoProfile(ie, j)
          )
        }
        this.arraylist.steps = ie
      }
      GlobalData.optManager.AddToDirtyList(e),
        Utils2.IsEqual(this.arraylist.profile.h, ae.h) &&
        Utils2.IsEqual(this.arraylist.profile.v, ae.v) &&
        Utils2.IsEqual(this.arraylist.profile.hdist, ae.hdist) &&
        Utils2.IsEqual(this.arraylist.profile.vdist, ae.vdist) ||
        p &&
        (
          GlobalData.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
          Business.FindTreeTop(
            this,
            ConstantData.LinkFlags.SED_L_MOVE,
            {
              topconnector: - 1,
              topshape: - 1,
              foundtree: !1
            }
          )
        )
    }
  }



  _GetAngleDisp(e) {
    var t = {
      start: 0,
      end: 0
    };
    return this.arraylist.angle &&
      (
        t.start = - e.startpoint.h * this.arraylist.angle,
        t.end = - e.endpoint.h * this.arraylist.angle
      ),
      t
  }



  _AdjustAngleConnector() {
    var e,
      t,
      a,
      r,
      i = ConstantData.ConnectorDefines,
      n = ConstantData.ConnectorDefines.SEDA_NSkip;
    if (!((t = this.arraylist.hook.length) < n)) for (
      a = this.arraylist.hook[i.A_Bk],
      r = this._GetAngleDisp(a),
      a.startpoint.v += r.start,
      a.endpoint.v -= r.end,
      (a = this.arraylist.hook[i.A_Cl]).startpoint.h,
      a.endpoint.h,
      r = this._GetAngleDisp(a),
      a.startpoint.v += r.start,
      a.endpoint.v -= r.end,
      (a = this.arraylist.hook[i.A_Cr]).startpoint.h,
      a.endpoint.h,
      r = this._GetAngleDisp(a),
      a.startpoint.v -= r.start,
      a.endpoint.v -= r.end,
      e = n;
      e < t;
      e++
    ) a = this.arraylist.hook[e],
      r = this._GetAngleDisp(a),
      a.startpoint.v -= r.end,
      a.endpoint.v -= r.end
  }



  _GetTilt(e) {
    var t,
      a,
      r = 0;
    if (this.arraylist.tilt) {
      var i = this.arraylist.tilt / 180 * Math.PI;
      (t = Math.tan(i)) &&
        (a = 1 / t, r = void 0 !== e ? e * a : this.arraylist.ht / a)
    }
    return r
  }



  _AdjustTiltConnector() {
    var e,
      t,
      a = ConstantData.ConnectorDefines.SEDA_NSkip,
      r = this._GetTilt();
    if (r) {
      if ((t = this.arraylist.hook.length) < a) return;
      for (e = a; e < t; e++) this.arraylist.hook[e].endpoint.h -= r
    }
  }



  _FormatLinear(e, t, a, r, i, n, o) {
    var s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C = !1,
      y = 0,
      f = 0,
      L = 0,
      I = !1,
      T = !1,
      b = ConstantData.ConnectorDefines.SEDA_NSkip,
      M = !1;
    if (
      l = this.arraylist.hook.length,
      p = 0,
      D = 0,
      d = this.arraylist.wd,
      e.moreflags & ConstantData.SessionMoreFlags.SEDSM_Swimlane_Rows &&
        this.vertical &&
        !n ? (M = !0, h = 75) : e.moreflags & ConstantData.SessionMoreFlags.SEDSM_Swimlane_Cols &&
        !this.vertical &&
        !n &&
      (M = !0, h = 150),
      l >= b &&
      this.hooks.length &&
      !n &&
      (
        g = this.hooks[0].hookpt === ConstantData.HookPts.SED_LL ||
        this.hooks[0].hookpt === ConstantData.HookPts.SED_LT,
        I = this.arraylist.hook[1].gap > 1 &&
        g,
        T = this.arraylist.hook[2].gap > 1 &&
        !g,
        M
      )
    ) {
      var P = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, !1);
      if (P) {
        var R = h - P.GetArrayRect(this.vertical).hdist;
        I &&
          (
            S = this.arraylist.hook[b].gap,
            m = (h - (u = this.arraylist.hook[b].ogap) - S) / 2,
            this.arraylist.hook[1].gap = d + R / 2 + m + this.arraylist.hook[1].extra,
            this.arraylist.hook[1].gap < d / 2 &&
            (this.arraylist.hook[1].gap = d / 2)
          ),
          T &&
          (
            S = this.arraylist.hook[l - 1].gap,
            m = (h - (u = this.arraylist.hook[l - 1].ogap) - S) / 2,
            this.arraylist.hook[2].gap = d + R / 2 + m + this.arraylist.hook[2].extra,
            this.arraylist.hook[2].gap < d / 2 &&
            (this.arraylist.hook[2].gap = d / 2)
          )
      }
    }
    for (s = b; s < l; s++) m = 0,
      (c = this.arraylist.hook[s]).isasst &&
      !C &&
      (r.firstconnector_x = p, C = !0),
      S = c.gap,
      u = a ? 0 : c.ogap,
      l === b + 1 &&
      (c.extra = 0),
      D += c.extra,
      s > b &&
      M &&
      (- (m = (h - u - S) / 2) > d / 2 && (m = - d / 2), D += m),
      L = this._GetLeftAdjustment(c.id),
      c.startpoint.h = p + f,
      c.startpoint.v = 0,
      c.endpoint.h = D,
      (s > b || I) &&
      (c.endpoint.h += L, a || (L = 0)),
      c.endpoint.v = 0,
      f = this._GetRightAdjustment(c.id),
      this._UpdateCurrentProfile(r, c, !1),
      a &&
      (
        i = s === b ? Utils1.DeepCopy(c.steps) : this._AddStepsToProfile(i, c.steps, !1, !1, c.endpoint.h, 0),
        c.steps.length &&
        (
          c.steps[0].v < y &&
          (y = c.steps[0].v),
          c.steps[0].vend > 0 &&
          c.steps[0].vend
        )
      ),
      a ? (p = this._CompareSteps(i, c.steps), D = (p -= L) + d) : (
        prevx = D,
        p = D,
        p += S + u,
        D = (p -= L) + d,
        M &&
        (- (m = h - S - u) > d / 2 && (m = - d / 2), D += s > b || I ? m / 2 : m)
      );
    return a &&
      n &&
      i.length &&
      (i[0].v > y && (i[0].v = y), i[0].vend < 0 && (i[0].vend = 0)),
      T ? o.lgap = f : p += f,
      r.x = p,
      i
  }



  _AddCoManagerChildren(e, t, a) {
    var r,
      i,
      n,
      o,
      s = ConstantData.ConnectorDefines.SEDA_NSkip;
    if (this.arraylist.hook.length >= s) {
      for (
        r = this.arraylist.hook[s],
        i = a.length,
        this.arraylist.steps.length = 0,
        n = 0;
        n < i;
        n++
      ) this.arraylist.steps.push(
        new StepRect(a[n].h, a[n].v, a[n].hend, a[n].vend)
      );
      (o = this._GetElementProfile(r.id, e, t, this, !1, !1)) &&
        (a = o.steps, this.arraylist.profile = o.frame)
    }
    return a
  }



  _AddAssistantChildren(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p = - 1,
      d = 0,
      D = ConstantData.ConnectorDefines.SEDA_NSkip,
      g = !1;
    for (r = this.arraylist.hook.length, o = D; o < r; o++) if (
      i = this.arraylist.hook[o],
      (s = GlobalData.optManager.GetObjectPtr(i.id, !1)) &&
      s.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR
    ) {
      p = o,
        d = i.endpoint.h,
        g = s.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_ReverseCol;
      break
    }
    if (p >= 0) {
      for (
        i = this.arraylist.hook[p],
        n = a.length,
        this.arraylist.steps.length = 0,
        o = 0;
        o < n;
        o++
      ) this.arraylist.steps.push(
        new StepRect(a[o].h, a[o].v, a[o].hend, a[o].vend)
      );
      if (
        (c = this._GetElementProfile(i.id, e, t, this, !1, !0)) &&
        (
          g &&
          (u = c.frame.v, c.frame.v = c.frame.vdist, c.frame.vdist = u),
          c.frame.h > this.arraylist.profile.h &&
          (this.arraylist.profile.h = c.frame.h),
          c.frame.hdist > this.arraylist.profile.hdist &&
          (this.arraylist.profile.hdist = c.frame.hdist),
          c.frame.v > this.arraylist.profile.v &&
          (this.arraylist.profile.v = c.frame.v),
          c.frame.vdist > this.arraylist.profile.vdist &&
          (this.arraylist.profile.vdist = c.frame.vdist),
          t
        )
      ) for (n = c.steps.length, l = a[0].vend, o = 0; o < n; o++) a.push(
        new StepRect(
          c.steps[o].h + d,
          c.steps[o].v + l,
          c.steps[o].hend + d,
          c.steps[o].vend + l
        )
      );
      for (S = a.length, o = 0; o < S; o++) a[o].h > 0 &&
        (a[o].h = 0)
    }
    return a
  }



  _CompareSteps(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l = 0;
    for (r = e.length, i = t.length, n = 0; n < i; n++) (void 0 === s || t[n].vend > s) &&
      (s = t[n].vend);
    if (i > 0) {
      for (a = 0; a < r && !(e[a].v > s); a++) for (n = 0; n < i; n++) if (t[n].vend > e[a].v && t[n].v < e[a].vend) (o = e[a].hend - t[n].h) > l &&
        (l = o);
      else if (t[n].v > e[a].vend) break
    } else for (a = 0; a < r; a++) e[a].hend > l &&
      (l = e[a].hend);
    return l
  }



  _AddStepsToProfile(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u = [],
      p = 0,
      d = [],
      D = ConstantData.Defines.SD_MAXSTEPS;
    if (o = e.length, 0 === (s = t.length) && i) {
      for (l = 0; l < o; l++) u.push(new StepRect(e[l].h, e[l].v, i, e[l].vend));
      return u
    }
    if (a) {
      for (S = 0; S < s; S++) r ? d.push(
        new StepRect(- t[S].vend, t[S].h + i, t[S].v, t[S].hend + i)
      ) : d.push(
        new StepRect(t[S].v, t[S].h + i, t[S].vend, t[S].hend + i)
      );
      i = n
    } else d = t;
    for (l = 0; l < o; l++) for (
      p < D ? (
        p &&
        (u[p - 1].vend = e[l].v),
        u.push(
          new StepRect(e[l].h, e[l].v, e[l].hend, e[l].vend)
        ),
        p++
      ) : (
        e[l].vend > u[p - 1].vend &&
        (u[p - 1].vend = e[l].vend),
        u[p - 1].h < e[l].h &&
        (u[p - 1].h = e[l].h),
        u[p - 1].hend < e[l].hend &&
        (u[p - 1].hend = e[l].hend)
      ),
      S = 0;
      S < s;
      S++
    ) if (d[S].vend > e[l].v && d[S].v <= e[l].vend) d[S].v <= u[p - 1].v ? (
      u[p - 1].hend < d[S].hend + i &&
      (u[p - 1].hend = d[S].hend + i),
      u[p - 1].h > d[S].h + i &&
      (u[p - 1].h = d[S].h + i)
    ) : p < D ? (
      u[p - 1].vend = d[S].v,
      u.push(
        new StepRect(e[l].h, e[l].v, e[l].hend, e[l].vend)
      ),
      u[p].v = u[p - 1].vend,
      u[p].hend = d[S].hend + i,
      u[p].h > d[S].h + i &&
      (u[p].h = d[S].h + i),
      p++
    ) : (
      d[S].vend > u[p - 1].vend &&
      (u[p - 1].vend = d[S].vend),
      u[p - 1].hend < d[S].hend + i &&
      (u[p - 1].hend = d[S].hend + i),
      u[p - 1].h < d[S].h + i &&
      (u[p - 1].h = d[S].h + i)
    ),
      d[S].vend < e[l].vend &&
      (
        p < D ? (
          u[p - 1].vend = d[S].vend,
          u.push(
            new StepRect(e[l].h, e[l].v, e[l].hend, e[l].vend)
          ),
          u[p].v = d[S].vend,
          p++
        ) : d[S].vend > u[p - 1].vend &&
        (u[p - 1].vend = d[S].vend)
      );
      else if (d[S].v > e[l].vend) break;
    for (p ? c = u[p - 1].vend : (c = 0, s && (c = d[0].v)), S = 0; S < s; S++) d[S].vend > c &&
      (
        p < D ? (
          u.push(
            new StepRect(d[S].h, d[S].v, d[S].hend, d[S].vend)
          ),
          d[S].v < c &&
          (u[p].v = c),
          u[p].hend = d[S].hend + i,
          u[p].h = d[S].h + i,
          p++
        ) : (
          d[S].vend > u[p - 1].vend &&
          (u[p - 1].vend = d[S].vend),
          u[p - 1].hend < d[S].hend + i &&
          (u[p - 1].hend = d[S].hend + i),
          u[p - 1].h < d[S].h + i &&
          (u[p - 1].h = d[S].h + i)
        )
      );
    var g = 1;
    for (l = 1; l < p; l++) u[g - 1].h === u[l].h &&
      u[g - 1].hend === u[l].hend ? u[g - 1].vend = u[l].vend : (g < l && (u[g] = Utils1.DeepCopy(u[l])), g++);
    return u.length = u.length >= g ? g : u.length,
      u
  }



  _BuildSideConnectorSteps() {
    var e,
      t,
      a,
      r,
      i,
      n,
      o,
      s,
      l = [],
      S = ConstantData.SEDA_Styles,
      c = this.arraylist.styleflags & S.SEDA_StartLeft,
      u = this.arraylist.styleflags & S.SEDA_BothSides;
    this.arraylist.styleflags,
      S.SEDA_ReverseCol;
    if (
      s = 1,
      (e = this.arraylist.hook.length) > ConstantData.ConnectorDefines.SEDA_NSkip
    ) for (
        r = (
          a = this.arraylist.hook[ConstantData.ConnectorDefines.SEDA_NSkip]
        ).steps.length,
        i = 0;
        i < r;
        i++
      ) c ? l.push(
        new StepRect(
          - a.steps[i].vend + a.endpoint.v,
          s * a.steps[i].h,
          a.steps[i].v + a.endpoint.v,
          s * a.steps[i].hend
        )
      ) : l.push(
        new StepRect(
          a.steps[i].v + a.endpoint.v,
          s * a.steps[i].h,
          a.steps[i].vend + a.endpoint.v,
          s * a.steps[i].hend
        )
      );
    for (o = c, t = ConstantData.ConnectorDefines.SEDA_NSkip + 1; t < e; t++) u &&
      (o = !o),
      n = (a = this.arraylist.hook[t]).endpoint.v,
      l = this._AddStepsToProfile(l, a.steps, !0, o, s * a.startpoint.h, n);
    return l
  }



  _InsertStepIntoProfile(e, t) {
    var a,
      r,
      i;
    for (e.unshift(t), i = t.vend - t.v, a = e.length, r = 1; r < a; r++) e[r].v += i,
      e[r].vend += i
  }



  _UpdateCurrentProfile(e, t, a) {
    var r,
      i;
    (r = t.endpoint.h - t.pr.h) < e.h &&
      (e.h = r),
      (i = t.endpoint.h + t.pr.hdist) > e.hdist &&
      (e.hdist = i),
      (r = t.endpoint.v - t.pr.v) < e.v &&
      (e.v = r),
      (i = t.endpoint.v + t.pr.vdist) > e.vdist &&
      (e.vdist = i)
  }



  _GetFullShapeProfile(e, t, a, r, i) {
    var n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g = {
        lindex: - 1,
        id: - 1,
        hookpt: 0
      },
      h = [],
      m = {},
      C = ConstantData.ConnectorDefines.SEDA_NSkip;
    if (S = GlobalData.optManager.GetObjectPtr(e, !1)) for (
      Utils2.CopyRect(m, S.Frame),
      m.x += t,
      m.y += a,
      i ? Utils2.CopyRect(r, m) : Utils2.UnionRect(r, m, r);
      GlobalData.optManager.FindChildArrayByIndex(e, g) > 0;
    ) for (
        l = (s = GlobalData.optManager.GetObjectPtr(g.id, !1)).HookToPoint(s.hooks[0].hookpt, null),
        (h = []).push(
          new Point(s.hooks[0].connect.x, s.hooks[0].connect.y)
        ),
        (c = S.GetPerimPts(S.BlockID, h, s.hooks[0].hookpt, !0, null, - 1)) &&
        l &&
        (t += c[0].x - l.x, a += c[0].y - l.y),
        Utils2.CopyRect(m, s.Frame),
        m.x += t,
        m.y += a,
        Utils2.UnionRect(r, m, r),
        u = s.arraylist.hook.length,
        p = C;
        p < u;
        p++
      ) d = s.arraylist.hook[p],
        (D = GlobalData.optManager.GetObjectPtr(d.id, !1)) &&
        (
          l = D.HookToPoint(D.hooks[0].hookpt, null),
          (h = []).push(
            new Point(D.hooks[0].connect.x, D.hooks[0].connect.y)
          ),
          (c = s.GetPerimPts(s.BlockID, h, D.hooks[0].hookpt, !0, null, - 1)) &&
          l &&
          (
            n = t + c[0].x - l.x,
            o = a + c[0].y - l.y,
            s._GetFullShapeProfile(d.id, n, o, r, !1)
          )
        )
  }



  _GetRightAdjustment(e) {
    var t = ConstantData.HookPts,
      a = GlobalData.optManager.GetObjectPtr(e, !1);
    if (null == a) return 0;
    if (0 === a.hooks.length) return 0;
    var r,
      i,
      n = 0;
    switch (a.hooks[0].hookpt) {
      case t.SED_AKCT:
        r = t.SED_AKCB;
        break;
      case t.SED_AKCB:
        r = t.SED_AKCT;
        break;
      case t.SED_AKCR:
        r = t.SED_AKCL;
        break;
      case t.SED_AKCL:
        r = t.SED_AKCR
    }
    if (r) {
      if (i = a.HookToPoint(r, null)) switch (r) {
        case t.SED_AKCT:
          n = i.y - a.Frame.y;
          break;
        case t.SED_AKCB:
          n = i.y - a.Frame.y - a.Frame.height;
          break;
        case t.SED_AKCR:
          n = i.x - a.Frame.x - a.Frame.width;
          break;
        case t.SED_AKCL:
          n = i.x - a.Frame.x
      }
      Utils2.IsEqual(n, 0) &&
        (n = 0)
    }
    return n
  }



  _GetLeftAdjustment(e) {
    var t = ConstantData.HookPts,
      a = GlobalData.optManager.GetObjectPtr(e, !1);
    if (null == a) return 0;
    if (
      a.DrawingObjectBaseClass !== ConstantData.DrawingObjectBaseClass.SHAPE
    ) return 0;
    if (0 === a.hooks.length) return 0;
    var r,
      i = a.hooks[0].hookpt,
      n = 0;
    if (i) {
      if (r = a.HookToPoint(i, null)) switch (i) {
        case t.SED_AKCT:
          n = r.y - a.Frame.y;
          break;
        case t.SED_AKCB:
          n = r.y - a.Frame.y - a.Frame.height;
          break;
        case t.SED_AKCR:
          n = r.x - a.Frame.x - a.Frame.width;
          break;
        case t.SED_AKCL:
          n = r.x - a.Frame.x
      }
      Utils2.IsEqual(n, 0) &&
        (n = 0)
    }
    return n
  }



  _GetElementProfile(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C,
      y,
      f,
      L,
      I,
      T,
      b,
      M,
      P = {},
      R = {},
      A = [],
      _ = {
        h: 0,
        v: 0
      },
      E = {},
      w = {
        frame: {
        },
        nsteps: 0,
        steps: []
      },
      F = ConstantData.SEDA_Styles,
      v = ConstantData.ConnectorDefines.SEDA_NSkip,
      G = GlobalData.optManager.GetObjectPtr(e, !1);
    if (null == G) return null;
    if (
      y = this.arraylist.styleflags & F.SEDA_CoManager,
      r &&
      (y = !1),
      I = this.arraylist.styleflags & F.SEDA_Linear,
      L = this.IsAsstConnector(),
      M = this.IsGenoConnector(),
      n &&
      (M = !1),
      L &&
      r &&
      (L = !1),
      G.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR
    ) {
      if (L || M) return w.frame.h = 0,
        w.frame.hdist = 0,
        w.frame.v = 0,
        w.frame.vdist = 0,
        this.arraylist.hook[v].id != e &&
        (w.frame.v = this.arraylist.hook[v].pr.v),
        w.steps.push(
          new StepRect(- w.frame.h, - w.frame.v, w.frame.hdist, w.frame.vdist)
        ),
        w;
      if (
        m = G.arraylist.styleflags & F.SEDA_BothSides ||
        0 == (G.arraylist.styleflags & F.SEDA_PerpConn),
        G.vertical === this.vertical ? (
          w.frame.h = G.arraylist.profile.h,
          w.frame.hdist = G.arraylist.profile.hdist,
          w.frame.v = G.arraylist.profile.v,
          w.frame.vdist = G.arraylist.profile.vdist
        ) : (
          w.frame.v = G.arraylist.profile.h,
          w.frame.vdist = G.arraylist.profile.hdist,
          G.arraylist.styleflags & F.SEDA_CoManager &&
            this.arraylist.styleflags & F.SEDA_ReverseCol ? (
            w.frame.h = G.arraylist.profile.vdist,
            w.frame.hdist = G.arraylist.profile.v
          ) : (
            w.frame.h = G.arraylist.profile.v,
            w.frame.hdist = G.arraylist.profile.vdist
          )
        ),
        a
      ) if (
          p = G.arraylist.steps.length,
          D = G.arraylist.steps,
          C = G.vertical === this.vertical,
          m &&
          (C = !C),
          C
        ) for (d = 0; d < p; d++) w.steps.push(
          new StepRect(D[d].h, D[d].v, D[d].hend, D[d].vend)
        );
        else for (d = 0; d < p; d++) w.steps.push(
          new StepRect(D[d].v, D[d].h, D[d].vend, D[d].hend)
        );
      return w
    }
    if (G.hooks.length && G.hooks[0].objid === this.BlockID) if (r) {
      for (
        w.frame.h = r.arraylist.profile.h,
        w.frame.v = r.arraylist.profile.v,
        w.frame.hdist = r.arraylist.profile.hdist,
        w.frame.vdist = r.arraylist.profile.vdist,
        f = this.arraylist.steps.length,
        d = 0;
        d < f;
        d++
      ) w.steps.push(
        new StepRect(
          this.arraylist.steps[d].h,
          this.arraylist.steps[d].v,
          this.arraylist.steps[d].hend,
          this.arraylist.steps[d].vend
        )
      );
      a ? (R.x = this.StartPoint.x, R.y = this.StartPoint.y) : R = r.HookToPoint(G.hooks[0].hookpt, null),
        (o = Utils2.Pt2CPoint(R, this.vertical)).v += this.arraylist.ht
    } else R = G.HookToPoint(G.hooks[0].hookpt, null),
      o = Utils2.Pt2CPoint(R, this.vertical),
      i ? (
        this._GetFullShapeProfile(e, 0, 0, P, !0),
        s = Utils2.Rect2CRect(P, this.vertical)
      ) : s = G.GetArrayRect(this.vertical),
      w.frame.h = o.h - s.h,
      w.frame.hdist = s.h + s.hdist - o.h,
      w.frame.v = o.v - s.v,
      w.frame.vdist = s.v + s.vdist - o.v,
      a &&
      (
        t &&
          !I ? w.steps.push(
            new StepRect(- w.frame.h, w.frame.vdist, w.frame.hdist, w.frame.v)
          ) : w.steps.push(
            new StepRect(- w.frame.h, - w.frame.v, w.frame.hdist, w.frame.vdist)
          )
      );
    if (
      l = GlobalData.optManager.FindChildArray(e, - 1),
      !i &&
      !y &&
      !L &&
      l >= 0 &&
      (S = GlobalData.optManager.GetObjectPtr(l, !1)) &&
      S.hooks.length &&
      (
        T = S.arraylist.styleflags & F.SEDA_ReverseCol,
        m = (
          S.arraylist.styleflags & F.SEDA_BothSides ||
          0 == (S.arraylist.styleflags & F.SEDA_PerpConn)
        ) > 0,
        b = S.arraylist.styleflags & F.SEDA_StartLeft,
        S.arraylist.hook.length - ConstantData.ConnectorDefines.SEDA_NSkip > 0 &&
        0 == (S.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
        (
          A.push(
            new Point(S.hooks[0].connect.x, S.hooks[0].connect.y)
          ),
          (c = G.GetPerimPts(G.BlockID, A, S.hooks[0].hookpt, !0, null, - 1)) &&
          o &&
          (
            u = Utils2.Pt2CPoint(c[0], this.vertical),
            _.h = o.h - u.h,
            _.v = o.v - u.v
          ),
          p = S.arraylist.steps.length,
          D = S.arraylist.steps,
          S.vertical === this.vertical ? (
            T &&
            (_.h = - _.h),
            E.h = S.arraylist.profile.h + _.h,
            E.hdist = S.arraylist.profile.hdist - _.h,
            E.v = S.arraylist.profile.v + _.v,
            E.vdist = S.arraylist.profile.vdist - _.v
          ) : (
            T &&
            (_.v = - _.v),
            b &&
              !m ? (
              E.hdist = S.arraylist.profile.v + _.h,
              E.h = S.arraylist.profile.vdist - _.h
            ) : (
              E.h = S.arraylist.profile.v + _.h,
              E.hdist = S.arraylist.profile.vdist - _.h
            ),
            T ? (
              E.vdist = S.arraylist.profile.h + _.v,
              E.v = S.arraylist.profile.hdist - _.v
            ) : (
              E.v = S.arraylist.profile.h + _.v,
              E.vdist = S.arraylist.profile.hdist - _.v
            )
          ),
          E.h > w.frame.h &&
          (w.frame.h = E.h),
          E.v > w.frame.v &&
          (w.frame.v = E.v),
          E.hdist > w.frame.hdist &&
          (w.frame.hdist = E.hdist),
          E.vdist > w.frame.vdist &&
          (w.frame.vdist = E.vdist),
          a
        )
      )
    ) if (C = S.vertical === this.vertical, m && (C = !C), C) for (g = t ? - _.v : _.v, T && (g = - g), d = 0; d < p; d++) w.steps.push(
      new StepRect(D[d].h - _.h, D[d].v - g, D[d].hend - _.h, D[d].vend - g)
    );
      else if (g = t ? - _.v : _.v, h = b && !m ? - _.h : _.h, t) for (d = 0; d < p; d++) w.steps.push(
        new StepRect(D[d].v - h, - D[d].hend - g, D[d].vend - h, - D[d].h - g)
      );
      else for (d = 0; d < p; d++) w.steps.push(
        new StepRect(D[d].v - h, D[d].h - g, D[d].vend - h, D[d].hend - g)
      );
    return w
  }



  Pr_AdjustHooks(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s = ConstantData.ConnectorDefines.SEDA_NSkip;
    for (r = this.arraylist.hook.length, a = e; a < r; a++) (i = this.arraylist.hook[a]).id >= 0 &&
      (n = GlobalData.optManager.GetObjectPtr(i.id, !0)) &&
      n.hooks.length &&
      (
        n.hooks[0].connect.x = a - s,
        o = n.hooks[0].hookpt,
        n.hooks[0].hookpt = this.GetBestHook(i.id, n.hooks[0].hookpt, n.hooks[0].connect),
        n.SetHookAlign(n.hooks[0].hookpt, o)
      )
  }



  Pr_AddHookedObject(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l = new SEDAHook(),
      S = !1,
      c = ConstantData.SEDA_Styles,
      u = this.arraylist.styleflags & c.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & c.SEDA_PerpConn),
      p = this.arraylist.styleflags & c.SEDA_Linear,
      d = this.arraylist.styleflags & c.SEDA_Radial;
    if (null != this.arraylist) {
      this.arraylist.matchsizelen = 0;
      var D = GlobalData.optManager.GetObjectPtr(e, !1);
      if (t === ConstantData.ConnectorDefines.StubHookPt) t = 0,
        S = !0;
      else {
        if (- 1 === t || - 2 === t) return void (this.arraylist.hook[- t].id = e);
        D.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
          D.arraylist.angle &&
          (S = !0)
      }
      if (!(t < 0)) {
        if (
          s = this.vertical,
          u &&
          (s = !s),
          (r = this.arraylist.hook.length) < ConstantData.ConnectorDefines.SEDA_NSkip
        ) for (n = r; n < ConstantData.ConnectorDefines.SEDA_NSkip; n++) i = new SEDAHook(),
          u ? 1 !== this.arraylist.hook.length ||
            p ||
            d ? i.gap = this.arraylist.wd : i.gap = ConstantData.Defines.CITreeSpacingExtra + this.arraylist.wd : 1 !== this.arraylist.hook.length ||
              p ||
              d ? i.gap = this.arraylist.ht : i.gap = ConstantData.Defines.CITreeSpacingExtra + this.arraylist.ht,
          this.arraylist.hook.push(i);
        if (
          o = t + ConstantData.ConnectorDefines.SEDA_NSkip,
          0 === t &&
          a >= 0 &&
          p &&
          (
            0 === this.hooks.length ||
            this.hooks[0].hookpt !== ConstantData.HookPts.SED_LL &&
            this.hooks[0].hookpt !== ConstantData.HookPts.SED_LT
          )
        ) {
          var g = GlobalData.objectStore.GetObject(a);
          g &&
            g.Delete(),
            a = - 1
        }
        l.id = e,
          a &&
          (l.textid = a),
          (r = this.arraylist.hook.length) < o &&
          (o = r, S = !0),
          this.arraylist.hook.splice(o, 0, l),
          r = this.arraylist.hook.length,
          S ? this.Pr_AdjustHooks(o, 0) : (D = GlobalData.optManager.GetObjectPtr(e, !0)) &&
            D.SetHookAlign(D.hooks[0].hookpt, D.hooks[0].hookpt),
          this.Pr_AdjustHooks(o + 1, 1)
      }
    }
  }



  Pr_RemoveHookedObject(e, t) {
    var a,
      r,
      i = 0;
    if (null != this.arraylist) {
      if (
        this.arraylist.matchsizelen = 0,
        a = this.arraylist.hook.length,
        t >= ConstantData.ConnectorDefines.SEDA_NSkip &&
        t < a &&
        (
          t < a - 1 &&
          t > ConstantData.ConnectorDefines.SEDA_NSkip &&
          (i = this.arraylist.hook[t].extra),
          this.arraylist.hook.splice(t, 1)
        ),
        this.arraylist.hook.length === ConstantData.ConnectorDefines.SEDA_NSkip + 2
      ) (
        this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_PerpConn
      ) > 0 &&
        (
          0 === (
            r = this.arraylist.hook[ConstantData.ConnectorDefines.SEDA_NSkip + 1]
          ).extra &&
          0 === i ||
          (
            this.arraylist.wd += r.extra + i,
            this.arraylist.wd < 0 &&
            (this.arraylist.wd = 0),
            r.extra = 0
          )
        );
      this.Pr_AdjustHooks(t, - 1)
    }
  }



  Pr_GetNBackBoneSegments() {
    var e;
    return (
      e = this.arraylist.hook.length - ConstantData.ConnectorDefines.SEDA_NSkip
    ) < 2 &&
      (e = 2),
      e - 1
  }



  Pr_GetStubIndex() {
    var e = 0,
      t = ConstantData.SEDA_Styles,
      a = this.arraylist.styleflags & t.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & t.SEDA_PerpConn),
      r = ConstantData.ConnectorDefines,
      i = ConstantData.HookPts;
    if (a && this.hooks.length) switch (this.hooks[0].hookpt) {
      case i.SED_LL:
      case i.SED_LT:
        e = r.A_Cl;
        break;
      default:
        e = r.A_Cr
    }
    return e
  }



  Pr_GetEndShapeIndex() {
    var e = 0,
      t = ConstantData.SEDA_Styles,
      a = (
        this.arraylist.styleflags & t.SEDA_BothSides ||
        (this.arraylist.styleflags, t.SEDA_PerpConn),
        ConstantData.ConnectorDefines
      ),
      r = ConstantData.HookPts;
    if (
      this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_EndConn &&
      this.hooks.length
    ) switch (this.hooks[0].hookpt) {
      case r.SED_LL:
      case r.SED_LT:
        e = a.A_Cr;
        break;
      default:
        e = a.A_Cl
    }
    return e
  }



  Pr_AdjustFormat(e, t, a, r, i, n, o, s) {
    var l,
      S,
      c,
      u,
      p,
      d,
      D = 0,
      g = ConstantData.SEDA_Styles,
      h = this.arraylist.styleflags & g.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & g.SEDA_PerpConn),
      m = this.arraylist.styleflags & g.SEDA_BothSides &&
        0 == (this.arraylist.styleflags & g.SEDA_Stagger),
      C = this.arraylist.styleflags & g.SEDA_Stagger &&
        this.vertical,
      y = this.arraylist.styleflags & g.SEDA_Linear,
      f = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_ReverseCol,
      L = this.arraylist.styleflags & g.SEDA_StartLeft,
      I = this.arraylist.styleflags & g.SEDA_Radial,
      T = ConstantData.ConnectorDefines,
      b = [],
      M = [],
      P = [],
      R = [],
      A = [],
      _ = this,
      E = function (e, t) {
        var a,
          r,
          i = 0,
          n = 0;
        for (
          o !== T.A_Cl &&
          o !== T.A_Cr ||
          (
            a = o,
            c = _.arraylist.hook[a],
            b[a] = c.startpoint.h,
            T.A_Cl,
            M[a] = c.gap + P[a],
            n++,
            P[a] < 0 ? R[a] < - P[a] &&
              ((r = R[a]) < 0 && (r = 0), i += - P[a] + r, M[a] < 0 && (M[a] = 0), n--, P[a] = 0) : M[a] < P[a] &&
            ((r = M[a]) < 0 && (r = 0), i += P[a] - r, M[a] < 0 && (M[a] = 0), n--, P[a] = 0)
          ),
          a = e;
          a < t;
          a++
        ) 0 !== P[a] &&
          (
            c = _.arraylist.hook[a],
            b[a] = c.startpoint.h,
            M[a] = _.arraylist.wd + c.extra,
            n++,
            P[a] < 0 ? M[a] < - P[a] &&
              ((r = M[a]) < 0 && (r = 0), i += - P[a] + r, M[a] < 0 && (M[a] = 0), n--, P[a] = 0) : M[a] < P[a] &&
            ((r = M[a]) < 0 && (r = 0), i += P[a] - r, M[a] < 0 && (M[a] = 0), n--, P[a] = 0)
          );
        return n <= 0 &&
          (i = 0),
          i / n
      },
      w = function (t, a, r) {
        var i,
          n,
          s = 2,
          l = !1,
          S = 0;
        for (
          o === T.A_Cl ? (
            i = o,
            n = _.arraylist.hook[i],
            R[i] = n.startpoint.h - n.endpoint.h,
            P[i] = e
          ) : o === T.A_Cr &&
          (
            i = o,
            n = _.arraylist.hook[i],
            R[i] = n.endpoint.h - n.startpoint.h,
            P[i] = - e
          ),
          i = t;
          i < a;
          i++
        ) n = _.arraylist.hook[i],
          P[i] = r ? - e : e,
          R[i] = n.endpoint.h - n.startpoint.h;
        for (; Math.abs(s) > 1;) {
          if (s = E(t, a), Math.abs(s > 1)) for (i = t; i < a; i++) 0 !== P[i] &&
            (l = !0, P[i] += s);
          if (!l) break
        }
        if (r) {
          var c = _.arraylist.hook.length;
          for (o === T.A_Cr && (S -= M[i = o] - R[i], b[i] += S, A[c - 1] = S), i = a - 1; i >= t; i--) S -= M[i] - R[i],
            b[i] += S,
            A[i - 1] = S
        } else {
          for (
            o === T.A_Cl &&
            (
              S += M[i = o] - R[i],
              b[i] += S,
              b[T.SEDA_NSkip] += S,
              A[T.SEDA_NSkip] = S,
              M[T.SEDA_NSkip] = 0
            ),
            i = t + 1;
            i < a;
            i++
          ) S += M[i - 1] - R[i - 1],
            b[i] += S,
            A[i - 1] = S;
          S += M[a - 1] - R[a - 1],
            A[a - 1] = S
        }
      },
      F = function (e, t, a) {
        var r,
          i,
          n,
          l,
          S,
          c,
          u,
          p = 0,
          d = 0;
        S = a ? 1 : 0;
        var D = function (e) {
          e !== T.A_Cl &&
            e !== T.A_Cr ||
            (
              r = e,
              n = _.arraylist.hook[r],
              b[r] = n.startpoint.h,
              e === T.A_Cl ? (M[r] = n.gap + P[r], b[T.SEDA_NSkip] = n.startpoint.h) : (
                u = _.arraylist.hook.length,
                M[r] = n.gap + P[r],
                u > T.SEDA_NSkip &&
                (b[u - 1] = n.startpoint.h, M[u - 1] = 0)
              ),
              d++,
              c = R[r] - GlobalData.optManager.ConnectorWidthList[r],
              P[r] < 0 ? c < - P[r] &&
                ((i = c) < 0 && (i = 0), p += - P[r] + i, M[r] < 0 && (M[r] = 0), d--, P[r] = 0) : M[r] < P[r] &&
              ((i = M[r]) < 0 && (i = 0), p += P[r] - i, M[r] < 0 && (M[r] = 0), d--, P[r] = 0),
              M[r] += GlobalData.optManager.ConnectorWidthList[r]
            )
        };
        for (D(o), D(s), r = e; r < t; r++) m &&
          a &&
          r++,
          0 !== P[r] &&
          (
            n = _.arraylist.hook[r],
            l = _.arraylist.hook[r + S],
            b[r] = I ? n.endpoint.h : n.startpoint.h,
            M[r] = _.arraylist.wd + l.extra,
            d++,
            P[r] < 0 ? M[r] < - P[r] &&
              ((i = M[r]) < 0 && (i = 0), p += - P[r] + i, M[r] < 0 && (M[r] = 0), d--, P[r] = 0) : M[r] < P[r] &&
            ((i = M[r]) < 0 && (i = 0), p += P[r] - i, M[r] < 0 && (M[r] = 0), d--, P[r] = 0),
            M[r] += GlobalData.optManager.ConnectorWidthList[r],
            m &&
            !a &&
            r++
          );
        return d <= 0 &&
          (p = 0),
          p / d
      },
      v = function (t, a, r) {
        var i,
          n,
          l = 2,
          S = !1,
          c = 0,
          u = 0;
        if (
          o === T.A_Cl ? (
            i = o,
            n = _.arraylist.hook[i],
            R[i] = n.startpoint.h - n.endpoint.h,
            P[i] = e
          ) : o === T.A_Cr &&
          (
            i = o,
            n = _.arraylist.hook[i],
            R[i] = n.endpoint.h - n.startpoint.h,
            P[i] = - e
          ),
          s === T.A_Cl ? (
            i = s,
            n = _.arraylist.hook[i],
            R[i] = n.startpoint.h - n.endpoint.h,
            P[i] = - e
          ) : s === T.A_Cr &&
          (
            i = s,
            n = _.arraylist.hook[i],
            R[i] = n.endpoint.h - n.startpoint.h,
            P[i] = e
          ),
          r
        ) for (m && (u = 1), i = t; i < a; i++) n = _.arraylist.hook[i],
          P[i + u] = - e,
          R[i + u] = _.arraylist.hook[i + 1 + u].endpoint.h - n.endpoint.h,
          m &&
          i++;
        else for (i = t; i < a; i++) n = _.arraylist.hook[i],
          P[i] = e,
          R[i] = n.endpoint.h - _.arraylist.hook[i - 1].endpoint.h,
          m &&
          i++;
        for (; Math.abs(l) > 1;) {
          if (l = F(t, a, r), Math.abs(l > 1)) for (i = t; i < a; i++) 0 !== P[i] &&
            (S = !0, P[i] += l),
            m &&
            i++;
          if (!S) break
        }
        var p = _.arraylist.hook.length;
        if (r) {
          for (
            o === T.A_Cr &&
            (
              c -= M[i = o] - R[i],
              b[i] += c,
              p > T.SEDA_NSkip &&
              (A[p - 1] = c, M[p - 1] = 0),
              M[i] -= GlobalData.optManager.ConnectorWidthList[i]
            ),
            i = a - 1;
            i >= t;
            i--
          ) m &&
            i++,
            c -= M[i] - R[i],
            A[i] = c,
            b[i] += c,
            m &&
            i--,
            m &&
            i--;
          s === T.A_Cl &&
            (
              c -= M[i = s] - R[i],
              b[i] += c,
              A[i] = f ? - c : c,
              M[i] -= GlobalData.optManager.ConnectorWidthList[i]
            )
        } else {
          for (
            o === T.A_Cl &&
            (
              c += M[i = o] - R[i],
              b[i] += c,
              _.arraylist.hook.length > T.SEDA_NSkip &&
              (b[T.SEDA_NSkip] += c, A[T.SEDA_NSkip] = f ? - c : c),
              M[T.SEDA_NSkip] = 0,
              M[i] -= GlobalData.optManager.ConnectorWidthList[i]
            ),
            i = t;
            i < a;
            i++
          ) c += M[i] - R[i],
            A[i] = f ? - c : c,
            b[i] += c,
            m &&
            i++;
          s === T.A_Cr &&
            (
              c += M[i = s] - R[i],
              b[i] += c,
              A[T.A_Cr] = c,
              M[i] -= GlobalData.optManager.ConnectorWidthList[i]
            )
        }
        for (i = t; i < a; i++) m &&
          r &&
          i++,
          M[i] = 0
      };
    if (S = this.arraylist.hook.length, e) if (
      u = m ? 2 : 1,
      f &&
      (e = - e),
      D = e,
      r === ConstantData.ActionTriggerType.CONNECTOR_ADJ
    ) {
      if (y && o === T.A_Cr) for (l = i; l > T.SEDA_NSkip; l--) c = this.arraylist.hook[l],
        y &&
        l === i ||
        I ||
        (c.endpoint.h += D),
        c.startpoint.h += D;
      else for (l = i; l < S; l++) c = this.arraylist.hook[l],
        y &&
        l === i ||
        I ||
        (c.startpoint.h += D),
        c.endpoint.h += D,
        this.arraylist.angle &&
        (
          c.startpoint.v += D * this.arraylist.angle,
          c.endpoint.v += D * this.arraylist.angle
        ),
        m &&
        l < S - 1 &&
        (
          l++,
          (c = this.arraylist.hook[l]).startpoint.h += D,
          c.endpoint.h += D,
          this.arraylist.angle &&
          (
            c.startpoint.v += D * this.arraylist.angle,
            c.endpoint.v += D * this.arraylist.angle
          )
        );
      y ||
        I ||
        (
          this.arraylist.hook[0].endpoint.h += D,
          this.arraylist.angle &&
          (this.arraylist.hook[0].endpoint.v += D * this.arraylist.angle)
        )
    } else if (r === ConstantData.ActionTriggerType.LINESTART) {
      var G = !1;
      for (
        m &&
          S % 2 == 0 ? (u = 2, G = !0) : m &&
        (u = 3),
        p = y ? 1 : 0,
        y ? w(ConstantData.ConnectorDefines.SEDA_NSkip, S - 1 - u + p + 1, !0) : v(ConstantData.ConnectorDefines.SEDA_NSkip + p, S - 1 - u + p + 1, !0),
        o === T.A_Cr &&
        (
          (c = this.arraylist.hook[o]).gap = M[o],
          D = b[o] - c.startpoint.h,
          c.startpoint.h = b[o],
          this.arraylist.angle &&
          (c.startpoint.v += D * this.arraylist.angle),
          y ||
          (
            u = 0,
            S > T.SEDA_NSkip &&
            (
              (c = this.arraylist.hook[0]).endpoint.h = b[o],
              this.arraylist.angle &&
              (c.endpoint.v += D * this.arraylist.angle)
            )
          )
        ),
        l = S - 1 - u + p;
        l >= ConstantData.ConnectorDefines.SEDA_NSkip + p;
        l--
      ) c = this.arraylist.hook[l],
        I ? (D = b[l] - c.endpoint.h, c.endpoint.h = b[l]) : (
          D = b[l] - c.startpoint.h,
          c.startpoint.h = b[l],
          this.arraylist.tilt ? c.endpoint.h = c.endpoint.h + D : c.endpoint.h = c.startpoint.h + M[l]
        ),
        this.arraylist.angle &&
        (
          c.startpoint.v += D * this.arraylist.angle,
          c.endpoint.v += D * this.arraylist.angle
        ),
        d = c,
        m &&
        l > ConstantData.ConnectorDefines.SEDA_NSkip &&
        !G &&
        (
          l--,
          (c = this.arraylist.hook[l]).startpoint.h += D,
          c.endpoint.h += D,
          this.arraylist.angle &&
          (
            c.startpoint.v += D * this.arraylist.angle,
            c.endpoint.v += D * this.arraylist.angle
          )
        ),
        G = !1;
      y ||
        I ||
        (
          this.arraylist.hook[0].startpoint.h += D,
          this.arraylist.angle &&
          (
            this.arraylist.hook[0].startpoint.v += D * this.arraylist.angle,
            this.arraylist.hook[T.A_Cl].endpoint.h != this.arraylist.hook[T.A_Cl].startpoint.h &&
            (
              l = T.A_Cl,
              (c = this.arraylist.hook[T.A_Cl]).gap = M[l],
              D = b[l] - c.startpoint.h,
              S > T.SEDA_NSkip ? (
                c.startpoint.h = this.arraylist.hook[T.SEDA_NSkip].endpoint.h,
                c.startpoint.v = this.arraylist.hook[T.SEDA_NSkip].startpoint.v
              ) : (
                c.startpoint.h = this.arraylist.hook[T.A_Cr].startpoint.h,
                c.startpoint.v = this.arraylist.hook[T.A_Cr].startpoint.v
              ),
              c.endpoint.h = c.startpoint.h - M[T.A_Cl],
              this.arraylist.angle &&
              (c.endpoint.v += D * this.arraylist.angle)
            )
          )
        )
    } else {
      for (
        y ? (
          o === T.A_Cl &&
          (u = 0),
          w(ConstantData.ConnectorDefines.SEDA_NSkip + u, S, !1)
        ) : v(ConstantData.ConnectorDefines.SEDA_NSkip + u, S, !1),
        o === T.A_Cl &&
        (
          u = 0,
          (c = this.arraylist.hook[o]).gap = M[o],
          D = b[o] - c.startpoint.h,
          c.startpoint.h = b[o],
          this.arraylist.angle &&
          (c.startpoint.v += D * this.arraylist.angle),
          !y &&
          S > T.SEDA_NSkip &&
          (
            (c = this.arraylist.hook[0]).startpoint.h = b[o],
            this.arraylist.angle &&
            (c.startpoint.v += D * this.arraylist.angle)
          )
        ),
        l = ConstantData.ConnectorDefines.SEDA_NSkip + u;
        l < S;
        l++
      ) c = this.arraylist.hook[l],
        I ? (D = b[l] - c.endpoint.h, c.endpoint.h = b[l]) : (
          D = b[l] - c.startpoint.h,
          c.startpoint.h = b[l],
          c.endpoint.h = c.startpoint.h + M[l]
        ),
        this.arraylist.angle &&
        (
          c.startpoint.v += D * this.arraylist.angle,
          c.endpoint.v += D * this.arraylist.angle
        ),
        d = c,
        m &&
        l < S - 1 &&
        (
          l++,
          (c = this.arraylist.hook[l]).startpoint.h = d.startpoint.h,
          c.endpoint.h = d.endpoint.h,
          this.arraylist.angle &&
          (
            c.startpoint.v += D * this.arraylist.angle,
            c.endpoint.v += D * this.arraylist.angle
          )
        );
      y ||
        I ||
        (
          this.arraylist.hook[0].endpoint.h += D,
          this.arraylist.angle &&
          (
            this.arraylist.hook[0].endpoint.v += D * this.arraylist.angle,
            this.arraylist.hook[T.A_Cr].endpoint.h != this.arraylist.hook[T.A_Cr].startpoint.h &&
            (
              c = this.arraylist.hook[T.A_Cr],
              l = T.A_Cr,
              c.gap = M[l],
              D = b[l] - c.startpoint.h,
              S > T.SEDA_NSkip ? (
                c.startpoint.h = this.arraylist.hook[S - 1].endpoint.h,
                c.startpoint.v = this.arraylist.hook[S - 1].startpoint.v
              ) : (
                c.startpoint.h = this.arraylist.hook[T.A_Cl].startpoint.h,
                c.startpoint.v = this.arraylist.hook[T.A_Cl].startpoint.v
              ),
              c.endpoint.h = c.startpoint.h + M[l],
              this.arraylist.angle &&
              (c.endpoint.v += D * this.arraylist.angle)
            )
          )
        )
    }
    if (t) {
      var N = this._GetTilt();
      for (l = ConstantData.ConnectorDefines.SEDA_NSkip; l < S; l++) c = this.arraylist.hook[l],
        C &&
          L ? c.endpoint.v -= t : c.endpoint.v += t,
        N &&
        (c.endpoint.h -= t),
        m &&
        l < S - 1 &&
        (
          l++,
          (c = this.arraylist.hook[l]).endpoint.v -= t,
          N &&
          (c.endpoint.h -= t)
        )
    }
    if (a) if (h) for (
      f &&
      (a = - a),
      this.arraylist.hook[0].startpoint.h += a,
      this.arraylist.hook[0].endpoint.h += a,
      l = ConstantData.ConnectorDefines.SEDA_NSkip;
      l < S;
      l++
    ) (c = this.arraylist.hook[l]).startpoint.h += a,
      c.endpoint.h += a;
    else for (
      this.arraylist.hook[0].startpoint.v += a,
      this.arraylist.hook[0].endpoint.v += a,
      l = ConstantData.ConnectorDefines.SEDA_NSkip;
      l < S;
      l++
    ) (c = this.arraylist.hook[l]).startpoint.v += a,
      c.endpoint.v += a;
    return {
      linestart: b,
      linelen: M,
      linedisp: A
    }
  }



  Pr_GetShapeConnectorInfo(e) {
    var t,
      a,
      r = 0,
      i = ConstantData.SEDA_Styles,
      n = this.arraylist.styleflags & i.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & i.SEDA_PerpConn),
      o = this.arraylist.styleflags & i.SEDA_BothSides,
      s = ConstantData.ConnectorDefines,
      l = ConstantData.HookPts,
      S = ConstantData.ActionTriggerType,
      c = this.arraylist.styleflags & i.SEDA_Linear,
      u = [];
    if (n && this.hooks.length) switch ((t = this.hooks[0]).hookpt) {
      case l.SED_LL:
      case l.SED_LT:
        r = s.A_Cl;
        break;
      default:
        r = s.A_Cr
    }
    var p = e.connect.x;
    if (
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH
    ) switch (p) {
      case - 2:
        return a = {
          knobID: S.LINEEND,
          cursorType: Element.CursorType.RESIZE_T,
          knobData: 0,
          hook: e.hookpt,
          polyType: 'vertical'
        },
          u.push(a),
          u;
      case - 1:
        return a = {
          knobID: S.LINESTART,
          cursorType: Element.CursorType.RESIZE_T,
          knobData: 0,
          hook: e.hookpt,
          polyType: 'vertical'
        },
          u.push(a),
          u;
      default:
        return u
    }
    if (this.vertical) if (c) if (r === s.A_Cr) {
      var d = e.hookpt;
      p + s.SEDA_NSkip < this.arraylist.hook.length - 1 ? p >= 0 &&
        (
          a = {
            knobID: S.CONNECTOR_ADJ,
            cursorType: Element.CursorType.RESIZE_T,
            knobData: p + s.SEDA_NSkip + 1,
            hook: d,
            polyType: 'vertical',
            position: 'bottom'
          },
          u.push(a)
        ) : (
        a = {
          knobID: S.CONNECTOR_HOOK,
          cursorType: Element.CursorType.RESIZE_T,
          knobData: s.A_Cr,
          hook: d,
          polyType: 'vertical',
          position: 'bottom'
        },
        u.push(a)
      )
    } else p > 0 ? (
      a = {
        knobID: S.CONNECTOR_ADJ,
        cursorType: Element.CursorType.RESIZE_T,
        knobData: p + s.SEDA_NSkip,
        hook: e.hookpt,
        polyType: 'vertical'
      },
      u.push(a)
    ) : r === s.A_Cl &&
    (
      a = {
        knobID: S.CONNECTOR_HOOK,
        cursorType: Element.CursorType.RESIZE_T,
        knobData: s.A_Cl,
        hook: e.hookpt,
        polyType: 'vertical'
      },
      u.push(a)
    );
    else a = {
      knobID: S.CONNECTOR_PERP,
      cursorType: Element.CursorType.RESIZE_R,
      knobData: e.connect.x,
      hook: e.hookpt,
      polyType: 'horizontal'
    },
      u.push(a),
      o &&
      p % 2 &&
      p--,
      p > 0 ? (
        a = {
          knobID: S.CONNECTOR_ADJ,
          cursorType: Element.CursorType.RESIZE_T,
          knobData: p + s.SEDA_NSkip,
          hook: e.hookpt,
          polyType: 'vertical'
        },
        u.push(a)
      ) : r === s.A_Cl &&
      (
        a = {
          knobID: S.CONNECTOR_HOOK,
          cursorType: Element.CursorType.RESIZE_T,
          knobData: s.A_Cl,
          hook: e.hookpt,
          polyType: 'vertical'
        },
        u.push(a)
      );
    else if (c) if (r === s.A_Cr) {
      d = e.hookpt;
      p + s.SEDA_NSkip < this.arraylist.hook.length - 1 ? p >= 0 &&
        (
          a = {
            knobID: S.CONNECTOR_ADJ,
            cursorType: Element.CursorType.RESIZE_R,
            knobData: p + s.SEDA_NSkip + 1,
            hook: d,
            polyType: 'horizontal',
            position: 'right'
          },
          u.push(a)
        ) : (
        a = {
          knobID: S.CONNECTOR_HOOK,
          cursorType: Element.CursorType.RESIZE_R,
          knobData: s.A_Cr,
          hook: d,
          polyType: 'horizontal',
          position: 'right'
        },
        u.push(a)
      )
    } else p > 0 ? (
      a = {
        knobID: S.CONNECTOR_ADJ,
        cursorType: Element.CursorType.RESIZE_R,
        knobData: p + s.SEDA_NSkip,
        hook: e.hookpt,
        polyType: 'horizontal'
      },
      u.push(a)
    ) : r === s.A_Cl &&
    (
      a = {
        knobID: S.CONNECTOR_HOOK,
        cursorType: Element.CursorType.RESIZE_R,
        knobData: s.A_Cl,
        hook: e.hookpt,
        polyType: 'horizontal'
      },
      u.push(a)
    );
    else a = {
      knobID: S.CONNECTOR_PERP,
      cursorType: Element.CursorType.RESIZE_T,
      knobData: e.connect.x,
      hook: e.hookpt,
      polyType: 'vertical'
    },
      u.push(a),
      o &&
      p % 2 &&
      p--,
      p > 0 ? (
        a = {
          knobID: S.CONNECTOR_ADJ,
          cursorType: Element.CursorType.RESIZE_R,
          knobData: p + s.SEDA_NSkip,
          hook: e.hookpt,
          polyType: 'horizontal'
        },
        u.push(a)
      ) : r === s.A_Cl &&
      (
        a = {
          knobID: S.CONNECTOR_HOOK,
          cursorType: Element.CursorType.RESIZE_R,
          knobData: s.A_Cl,
          hook: t.hookpt,
          polyType: 'horizontal'
        },
        u.push(a)
      );
    return u
  }



  _GetConnectorOrientation(e) {
    var t = ConstantData.SEDA_Styles,
      a = this.arraylist.styleflags & t.SEDA_StartLeft;
    return (
      this.arraylist.styleflags & t.SEDA_BothSides ||
      0 == (this.arraylist.styleflags & t.SEDA_PerpConn)
    ) &&
      (a = !1, e && (a = !0)),
      this.vertical ? a ? ListManager.ConnectorDir.ORG_HORIZONTALRIGHT : ListManager.ConnectorDir.ORG_HORIZONTAL : a ? ListManager.ConnectorDir.ORG_VERTICALUP : ListManager.ConnectorDir.ORG_VERTICALDOWN
  }



  _IsFlowChartConnector() {
    var e = ConstantData.SEDA_Styles;
    return (this.arraylist.styleflags & e.SEDA_FlowConn) > 0
  }



  _IsOrgChartConnector(e) {
    if (allowtype = 0 === this.objecttype, e) {
      var t,
        a = e.length;
      for (t = 0; t < a; t++) if (this.objecttype === e[t]) {
        allowtype = !0;
        break
      }
    }
    return !this._IsFlowChartConnector() &&
      allowtype
  }



  _IsCauseandEffectChartConnector() {
    return this.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_MAIN ||
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH
  }



  _IsOrgChartTypeConnector() {
    var e = ConstantData.ObjectTypes;
    switch (this.objecttype) {
      case 0:
      case e.SD_OBJT_MINDMAP_CONNECTOR:
      case e.SD_OBJT_DESCENDANT_CONNECTOR:
      case e.SD_OBJT_DECISIONTREE_CONNECTOR:
      case e.SD_OBJT_PEDIGREE_CONNECTOR:
      case e.SD_OBJT_GENOGRAM_BRANCH:
        return !0
    }
    return !1
  }



  _FixHook(e, t) {
    var a,
      r,
      i = ConstantData.SEDA_Styles,
      n = this.arraylist.styleflags & i.SEDA_StartLeft,
      o = this.arraylist.styleflags & i.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & i.SEDA_PerpConn),
      s = this.arraylist.styleflags & i.SEDA_BothSides,
      l = this.arraylist.styleflags & i.SEDA_ReverseCol,
      S = ConstantData.Defines.SED_CDim,
      c = {},
      u = !1;
    this.hooks.length &&
      (
        c.x = this.hooks[0].connect.x,
        c.y = this.hooks[0].connect.y,
        e ||
        (r = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, !1)) &&
        r.IsCoManager(null) &&
        (t || (u = !0)),
        a = this.hooks[0].hookpt === ConstantData.HookPts.SED_LL ||
        this.hooks[0].hookpt === ConstantData.HookPts.SED_LT,
        GlobalData.optManager.SetLinkFlag(this.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE),
        this.vertical ? o ? n ? (
          a ? (
            this.hooks[0].connect.y = l ? 0 : S,
            this.hooks[0].hookpt = ConstantData.HookPts.SED_LT
          ) : (
            this.hooks[0].connect.y = 0,
            this.hooks[0].hookpt = ConstantData.HookPts.SED_LB
          ),
          this.hooks[0].connect.x = s ? S / 2 : 3 * S / 4
        ) : (
          a ? (
            this.hooks[0].connect.y = l ? 0 : S,
            this.hooks[0].hookpt = ConstantData.HookPts.SED_LT
          ) : (
            this.hooks[0].connect.y = 0,
            this.hooks[0].hookpt = ConstantData.HookPts.SED_LB
          ),
          this.hooks[0].connect.x = s ? S / 2 : S / 4
        ) : n ? (
          this.hooks[0].connect.x = 0,
          this.hooks[0].hookpt = ConstantData.HookPts.SED_LR,
          this.hooks[0].connect.y = S / 2
        ) : (
          this.hooks[0].connect.x = S,
          this.hooks[0].hookpt = ConstantData.HookPts.SED_LL,
          this.hooks[0].connect.y = S / 2
        ) : o ? (
          a ? (
            this.hooks[0].connect.x = S,
            this.hooks[0].hookpt = ConstantData.HookPts.SED_LL
          ) : (
            this.hooks[0].connect.y = 0,
            this.hooks[0].hookpt = ConstantData.HookPts.SED_LR
          ),
          this.hooks[0].connect.x = S / 2
        ) : n ? (
          this.hooks[0].connect.y = 0,
          this.hooks[0].hookpt = ConstantData.HookPts.SED_LB,
          this.hooks[0].connect.x = S / 2
        ) : (
          this.hooks[0].connect.y = S,
          this.hooks[0].hookpt = ConstantData.HookPts.SED_LT,
          this.hooks[0].connect.x = S / 2
        ),
        e &&
        (this.hooks[0].connect.x = c.x, this.hooks[0].connect.y = c.y),
        u &&
        (
          this.hooks[0].connect.y = - ConstantData.SEDA_Styles.SEDA_CoManager
        )
      )
  }



  _SetDirection(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l,
      S = ConstantData.SEDA_Styles,
      c = this.arraylist.styleflags & S.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & S.SEDA_PerpConn),
      u = this.arraylist.styleflags & S.SEDA_CoManager,
      p = this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_ReverseCol,
      d = !1;
    for (
      i = this.arraylist.hook.length,
      t &&
      (
        c ? (
          d = (
            this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_ReverseCol
          ) > 0,
          this.arraylist.styleflags = Utils2.SetFlag(
            this.arraylist.styleflags,
            ConstantData.SEDA_Styles.SEDA_PerpConn,
            !0
          ),
          this.arraylist.styleflags = Utils2.SetFlag(
            this.arraylist.styleflags,
            ConstantData.SEDA_Styles.SEDA_StartLeft,
            !1
          ),
          this.arraylist.styleflags = Utils2.SetFlag(
            this.arraylist.styleflags,
            ConstantData.SEDA_Styles.SEDA_ReverseCol,
            !1
          ),
          this.arraylist.styleflags = Utils2.SetFlag(
            this.arraylist.styleflags,
            ConstantData.SEDA_Styles.SEDA_BothSides,
            !1
          ),
          c = !1
        ) : this.vertical = !this.vertical
      ),
      this.arraylist.styleflags = Utils2.SetFlag(
        this.arraylist.styleflags,
        ConstantData.SEDA_Styles.SEDA_ReverseCol,
        !1
      ),
      e ? c ? this.arraylist.styleflags = Utils2.SetFlag(
        this.arraylist.styleflags,
        ConstantData.SEDA_Styles.SEDA_ReverseCol,
        0 === p
      ) : (
        u &&
        a &&
        (l = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, !1)) &&
        (
          l.arraylist.styleflags & S.SEDA_BothSides ||
          0 == (l.arraylist.styleflags & S.SEDA_PerpConn)
        ),
        d ||
        (
          this.arraylist.styleflags = Utils2.SetFlag(
            this.arraylist.styleflags,
            ConstantData.SEDA_Styles.SEDA_StartLeft,
            0 == (
              this.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_StartLeft
            )
          )
        )
      ) : d &&
      (
        this.arraylist.styleflags = Utils2.SetFlag(
          this.arraylist.styleflags,
          ConstantData.SEDA_Styles.SEDA_StartLeft,
          !0
        )
      ),
      GlobalData.optManager.SetLinkFlag(
        this.BlockID,
        ConstantData.LinkFlags.SED_L_MOVE | ConstantData.LinkFlags.SED_L_CHANGE
      ),
      this.flags = Utils2.SetFlag(this.flags, ConstantData.ObjFlags.SEDO_Obj1, !0),
      this._FixHook(a, !1),
      r = ConstantData.ConnectorDefines.SEDA_NSkip;
      r < i;
      r++
    ) o = this.arraylist.hook[r],
      (n = GlobalData.optManager.GetObjectPtr(o.id, !0)) &&
      n.hooks.length &&
      (
        n.hooks[0].hookpt = this.GetBestHook(o.id, n.hooks[0].hookpt, n.hooks[0].connect),
        GlobalData.optManager.SetLinkFlag(o.id, ConstantData.LinkFlags.SED_L_MOVE),
        n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ? n._SetDirection(e, t, !0) : (s = GlobalData.optManager.FindChildArray(o.id, - 1)) >= 0 &&
          (l = GlobalData.optManager.GetObjectPtr(s, !0)) &&
          l._SetDirection(e, t, !1)
      )
  }



  _SetSpacing(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s = ConstantData.SEDA_Styles,
      l = this.arraylist.styleflags & s.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & s.SEDA_PerpConn),
      S = this.arraylist.styleflags & s.SEDA_CoManager,
      c = (
        this.arraylist.styleflags,
        s.SEDA_FlowConn,
        GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
        ConstantData.ConnectorDefines.SEDA_NSkip
      ),
      u = function (e, t) {
        for (o = c; o < r; o++) (i = e.hook[o]).extra + t < 0 &&
          (i.extra = - t)
      };
    if (
      a = t,
      r = this.arraylist.hook.length,
      S &&
      this.vertical !== e &&
      (a = t / 2),
      this.hooks.length
    ) switch (this.hooks[0].hookpt) {
      case ConstantData.HookPts.SED_LT:
      case ConstantData.HookPts.SED_LB:
        e &&
          (
            n = null,
            l ? (
              i = r > 2 ? this.hooks[0].hookpt === ConstantData.HookPts.SED_LT ? this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl] : this.arraylist.hook[ConstantData.ConnectorDefines.A_Cr] : this.arraylist.hook[ConstantData.ConnectorDefines.A_Bk],
              n ? i.gap = n : (i.gap += a - this.arraylist.wd, i.gap < 0 && (i.gap = 0))
            ) : (
              i = r > 2 ? this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl] : this.arraylist.hook[ConstantData.ConnectorDefines.A_Bk],
              n ? i.gap = n : (i.gap += a - this.arraylist.ht, i.gap < 0 && (i.gap = 0))
            )
          );
        break;
      case ConstantData.HookPts.SED_LL:
      case ConstantData.HookPts.SED_LR:
        e ||
          (
            n = null,
            l ? (
              i = r > 2 ? this.hooks[0].hookpt === ConstantData.HookPts.SED_LL ? this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl] : this.arraylist.hook[ConstantData.ConnectorDefines.A_Cr] : this.arraylist.hook[ConstantData.ConnectorDefines.A_Bk],
              n ? i.gap = n : (i.gap += a - this.arraylist.wd, i.gap < 0 && (i.gap = 0))
            ) : (
              i = r > 2 ? this.arraylist.hook[ConstantData.ConnectorDefines.A_Cl] : this.arraylist.hook[ConstantData.ConnectorDefines.A_Bk],
              n ? i.gap = n : (i.gap += a - this.arraylist.ht, i.gap < 0 && (i.gap = 0))
            )
          )
    }
    this.vertical ? e ? (this.arraylist.wd, this.arraylist.wd = a, u(this.arraylist, a)) : (this.arraylist.ht, this.arraylist.ht = a) : e ? (this.arraylist.ht, this.arraylist.ht = a) : (this.arraylist.wd, this.arraylist.wd = a, u(this.arraylist, a))
  }



  _CollapseConnector(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l,
      S = ConstantData.ObjFlags.SEDO_NotVisible,
      c = ConstantData.ExtraFlags.SEDE_CollapseConn,
      u = [];
    if (
      - 1 == e &&
      (e = 0 == (this.extraflags & c)),
      o = this.extraflags & c,
      t &&
      (
        o &&
          0 == (this.flags & S) ? (
          e = !0,
          this.extraflags = Utils2.SetFlag(this.extraflags, c, !1)
        ) : !o &&
          this.flags & S ? (
          e = !1,
          this.extraflags = Utils2.SetFlag(this.extraflags, c, !0)
        ) : e = (this.extraflags & c) > 0
      ),
      a &&
      this.hooks.length > 0 &&
      GlobalData.optManager.SetLinkFlag(this.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE),
      (this.extraflags & c) > 0 != e ||
      !a
    ) for (
        (a || t) &&
        GlobalData.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
        (a || t) &&
        (this.extraflags = Utils2.SetFlag(this.extraflags, c, e)),
        a ||
          e ? this.flags = Utils2.SetFlag(this.flags, S, e) : 0 === o &&
        (this.flags = Utils2.SetFlag(this.flags, S, !1)),
        GlobalData.optManager.AddToDirtyList(this.BlockID),
        GlobalData.optManager.DirtyListReOrder = !0,
        this.flags & S &&
        (u.push(this.BlockID), GlobalData.optManager.DeSelect(u)),
        s = this.arraylist.hook.length,
        i = ConstantData.ConnectorDefines.SEDA_NSkip;
        i < s;
        i++
      ) if (
          this.arraylist.hook[i].id >= 0 &&
          (r = GlobalData.optManager.GetObjectPtr(this.arraylist.hook[i].id, !0))
        ) switch (r.DrawingObjectBaseClass) {
          case ConstantData.DrawingObjectBaseClass.CONNECTOR:
            r._CollapseConnector(e, t, a);
            break;
          default:
            if (
              a ||
                e ? r.flags = Utils2.SetFlag(r.flags, S, e) : 0 === o &&
              (r.flags = Utils2.SetFlag(r.flags, S, !1)),
              GlobalData.optManager.AddToDirtyList(this.arraylist.hook[i].id),
              GlobalData.optManager.DirtyListReOrder = !0,
              r.flags & S &&
              u.push(this.arraylist.hook[i].id),
              r.flags & S &&
              !1 === e
            ) break;
            (n = GlobalData.optManager.FindChildArray(this.arraylist.hook[i].id, - 1)) >= 0 &&
              (
                GlobalData.optManager.GetObjectPtr(n, !0)._CollapseConnector(e, t, !1),
                (l = GlobalData.optManager.FindChildArray(this.arraylist.hook[i].id, n)) >= 0 &&
                GlobalData.optManager.GetObjectPtr(l, !0)._CollapseConnector(e, t, !1)
              )
        }
    GlobalData.optManager.DeSelect(u),
      this.Pr_Format(this.BlockID)
  }



  MatchSize(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p = [],
      d = ConstantData.ConnectorDefines.SEDA_NSkip,
      D = ConstantData.ConnectorDefines,
      g = ConstantData.HookPts,
      h = !1,
      m = !1,
      C = function (e, t, a, r) {
        this.cobj = e,
          this.bkdist = t,
          this.stubindex = a,
          this.stubdist = r
      };
    for (r = this.arraylist.hook.length, a = d; a < r; a++) (i = GlobalData.optManager.GetObjectPtr(this.arraylist.hook[a].id, !1)) &&
      i.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
      (
        void 0 === n ? n = i.arraylist.wd : Utils2.IsEqual(n, i.arraylist.wd) ||
          (h = !0, i.arraylist.wd > n && (n = i.arraylist.wd)),
        s = i.arraylist.hook[D.A_Bk].endpoint.h - i.arraylist.hook[D.A_Bk].startpoint.h,
        S = i.hooks[0].hookpt === g.SED_LL ||
          i.hooks[0].hookpt === g.SED_LT ? D.A_Cr : D.A_Cl,
        u = s + (
          c = Math.abs(
            i.arraylist.hook[S].endpoint.h - i.arraylist.hook[S].startpoint.h
          )
        ),
        void 0 === o ? o = u : Utils2.IsEqual(u, o) ||
          (m = !0, u > o && (o = u)),
        l = new C(i, s, S, c),
        p.push(l)
      );
    if (e && (Utils2.IsEqual(n, t) || (n = t, h = !0)), h) for (r = p.length, o = void 0, m = !0, a = 0; a < r; a++) (i = GlobalData.optManager.GetObjectPtr(p[a].cobj.BlockID, !0)).arraylist.wd = n,
      i.arraylist.matchsizelen = 0,
      GlobalData.optManager.SetLinkFlag(i.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
      S = i.hooks[0].hookpt === g.SED_LL ||
        i.hooks[0].hookpt === g.SED_LT ? D.A_Cl : D.A_Cr,
      i.arraylist.hook[S].gap = n,
      i.Pr_Format(i.BlockID),
      s = i.arraylist.hook[D.A_Bk].endpoint.h - i.arraylist.hook[D.A_Bk].startpoint.h,
      c = Math.abs(
        i.arraylist.hook[p[a].stubindex].endpoint.h - i.arraylist.hook[p[a].stubindex].startpoint.h
      ),
      p[a].bkdist = s,
      p[a].stubdist = c,
      u = s + c,
      void 0 === o ? o = u : Utils2.IsEqual(u, o) ||
        u > o &&
        (o = u);
    if (m) {
      if (r = p.length, !h) for (o = void 0, a = 0; a < r; a++) (i = GlobalData.optManager.GetObjectPtr(p[a].cobj.BlockID, !0)).arraylist.matchsizelen = 0,
        GlobalData.optManager.SetLinkFlag(i.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
        i.Pr_Format(i.BlockID),
        p[a].bkdist = i.arraylist.hook[D.A_Bk].endpoint.h - i.arraylist.hook[D.A_Bk].startpoint.h,
        p[a].stubdist = Math.abs(
          i.arraylist.hook[p[a].stubindex].endpoint.h - i.arraylist.hook[p[a].stubindex].startpoint.h
        ),
        u = p[a].bkdist + p[a].stubdist,
        void 0 === o ? o = u : Utils2.IsEqual(u, o) ||
          u > o &&
          (o = u);
      for (a = 0; a < r; a++) u = p[a].bkdist + p[a].stubdist,
        Utils2.IsEqual(u, o) ||
        (
          (i = p[a].cobj).arraylist.matchsizelen = o,
          i.Pr_Format(i.BlockID)
        )
    }
  }



  FoundText(e, t, a) {
    var r,
      i,
      n,
      o,
      s = 0;
    r = this.arraylist.hook.length;
    var l = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    if (null != l) {
      for (
        a === this.BlockID &&
        (s = this.arraylist.lasttexthook + 1),
        i = s;
        i < r;
        i++
      ) if (
          this.arraylist.hook[i].textid >= 0 &&
          (n = l.GetElementByID(ConstantData.SVGElementClass.TEXT, i)) &&
          (o = n.GetText(0).search(e)) >= 0
        ) return this.arraylist.lasttexthook = i,
          GlobalData.optManager.ActivateTextEdit(l),
          n.SetSelectedRange(o, o + t),
          !0;
      return !1
    }
  }



  ConvertToVisio() {
    var e,
      t,
      a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c = ConstantData.ConnectorDefines.SEDA_NSkip,
      u = ConstantData.SEDA_Styles,
      p = ConstantData.HookPts,
      d = ConstantData.Defines.SED_CDim,
      D = this.arraylist.styleflags & u.SEDA_Linear,
      g = this.arraylist.styleflags & u.SEDA_FlowConn,
      h = this.arraylist.styleflags & u.SEDA_Radial,
      m = this.arraylist.styleflags & u.SEDA_StartLeft,
      C = this.arraylist.styleflags & u.SEDA_CoManager,
      y = this.arraylist.styleflags & u.SEDA_BothSides ||
        0 == (this.arraylist.styleflags & u.SEDA_PerpConn),
      f = this.IsAsstConnector(),
      L = (this.arraylist.styleflags & u.SEDA_ReverseCol) > 0,
      I = [],
      T = {},
      b = {},
      M = {},
      P = this,
      R = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !1),
      A = function (e, t, a, r, i) {
        T = Utils1.DeepCopy(P),
          0 === i ? (T.StartArrowID = 0, T.EndArrowID = 0) : - 1 === i &&
            (o = T.StartArrowID, T.StartArrowID = T.EndArrowID, T.EndArrowID = o),
          P.vertical ? (
            T.StartPoint.x = e.v + P.StartPoint.x,
            T.StartPoint.y = e.h + P.StartPoint.y,
            T.EndPoint.x = t.v + P.StartPoint.x,
            T.EndPoint.y = t.h + P.StartPoint.y,
            T.EndPoint.y < T.StartPoint.y &&
            (o = T.StartArrowID, T.StartArrowID = T.EndArrowID, T.EndArrowID = o)
          ) : (
            T.StartPoint.x = e.h + P.StartPoint.x,
            T.StartPoint.y = e.v + P.StartPoint.y,
            T.EndPoint.x = t.h + P.StartPoint.x,
            T.EndPoint.y = t.v + P.StartPoint.y,
            T.EndPoint.x < T.StartPoint.x &&
            (o = T.StartArrowID, T.StartArrowID = T.EndArrowID, T.EndArrowID = o)
          ),
          T.hooks = [],
          a &&
          T.hooks.push(a),
          r &&
          T.hooks.push(r),
          T.Frame = Utils2.Pt2Rect(T.StartPoint, T.EndPoint);
        var n,
          s,
          l,
          S = new ListManager.Line(T);
        for (
          l = GlobalData.optManager.AddNewObject(S, !1, !1),
          s = S.hooks.length,
          n = 0;
          n < s;
          n++
        ) GlobalData.optManager.InsertLink(R, l, n, 0);
        return l
      },
      _ = function (e, t, a, r, i, n) {
        var s;
        T = Utils1.DeepCopy(P);
        var l,
          S,
          c,
          u,
          p = 0,
          d = 0;
        if (
          0 === n ? (T.StartArrowID = 0, T.EndArrowID = 0) : - 1 === n &&
            (o = T.StartArrowID, T.StartArrowID = T.EndArrowID, T.EndArrowID = o),
          s = e.length,
          L
        ) for (l = 0; l < s; l++) P.vertical ? e[l].y = p - e[l].y : e[l].x = d - e[l].x;
        var D = e[0].x,
          g = e[0].y;
        for (l = 1; l < s; l++) e[l].x < D &&
          (D = e[l].x),
          e[l].y < g &&
          (g = e[l].y);
        for (l = 0; l < s; l++) e[l].x -= D,
          e[l].y -= g,
          e[l].x > d &&
          (d = e[l].x),
          e[l].y > p &&
          (p = e[l].y);
        T.StartPoint.x = e[0].x + P.StartPoint.x + D,
          T.StartPoint.y = e[0].y + P.StartPoint.y + g,
          T.EndPoint.x = e[s - 1].x + P.StartPoint.x + D,
          T.EndPoint.y = e[s - 1].y + P.StartPoint.y + g,
          P.vertical ? T.EndPoint.y < T.StartPoint.y &&
            (o = T.StartArrowID, T.StartArrowID = T.EndArrowID, T.EndArrowID = o) : T.EndPoint.x < T.StartPoint.x &&
          (o = T.StartArrowID, T.StartArrowID = T.EndArrowID, T.EndArrowID = o),
          T.hooks = [],
          r &&
          T.hooks.push(r),
          i &&
          T.hooks.push(i),
          T.Frame = Utils2.Pt2Rect(T.StartPoint, T.EndPoint);
        var h = new ListManager.SegmentedLine(T),
          m = h.segl;
        for (m.pts = [], m.lengths = [], l = 0; l < s; l++) m.pts.push({
          x: e[l].x,
          y: e[l].y
        }),
          l > 0 &&
          (
            u = m.pts[l - 1].x === m.pts[l].x ? Math.abs(m.pts[l].y - m.pts[l - 1].y) : Math.abs(m.pts[l].x - m.pts[l - 1].x),
            m.lengths.push(u)
          );
        for (
          m.firstdir = t,
          m.lastdir = a,
          P.CalcFrame(),
          c = GlobalData.optManager.AddNewObject(h, !1, !1),
          S = h.hooks.length,
          l = 0;
          l < S;
          l++
        ) GlobalData.optManager.InsertLink(R, c, l, 0);
        return GlobalData.optManager.GetObjectPtr(c, !1).ConvertToVisio(),
          c
      },
      E = function (e) {
        switch (e) {
          case p.SED_KTC:
            e = p.SED_KBC;
            break;
          case p.SED_KBC:
            e = p.SED_KTC;
            break;
          case p.SED_KRC:
            e = p.SED_KLC;
            break;
          case p.SED_KLC:
            e = p.SED_KRC
        }
        return e
      };
    return t = this.arraylist.hook.length,
      (a = t - c) <= 0 &&
        0 == (this.arraylist.styleflags & u.SEDA_EndConn) ? I : g &&
          D ? function () {
            if (0 === P.hooks.length && a--, 0 == a) return I;
            if (P.hooks.length) {
              switch (P.hooks[0].hookpt) {
                case p.SED_LL:
                case p.SED_LT:
                  r = 1;
                  break;
                default:
                  r = 2
              }
              if (
                P.vertical ? (b.x = d / 2, b.y = 0, 2 === r && (b.y = d)) : (b.y = d / 2, b.x = 0, 2 === r && (b.x = d)),
                l = new Hook(P.arraylist.hook[c].id, null, - 1, p.SED_KTL, b),
                2 === r &&
                (
                  l = new Hook(
                    P.arraylist.hook[P.arraylist.hook.length - 1].id,
                    null,
                    - 1,
                    p.SED_KTL,
                    b
                  )
                ),
                i = P.arraylist.hook[r],
                (s = P.hooks[0]).hookpt = p.SED_KTR,
                n = A(i.startpoint, i.endpoint, s, l),
                I.push(n),
                P.arraylist.hook[r].textid >= 0 &&
                (S = GlobalData.optManager.GetObjectPtr(n, !1)) &&
                (
                  S.DataID = P.arraylist.hook[r].textid,
                  (u = GlobalData.optManager.svgObjectLayer.GetElementByID(P.BlockID)) &&
                  (D = u.GetElementByID(ConstantData.SVGElementClass.TEXT, r))
                )
              ) {
                var o = D.GetTextMinDimensions();
                S.trect.width = o.width,
                  S.trect.height = o.height
              }
            }
            for (
              P.vertical ? (M.x = d / 2, M.y = d, b.x = d / 2, b.y = 0) : (M.y = d / 2, M.x = d, b.y = d / 2, b.x = 0),
              e = c + 1;
              e < t;
              e++
            ) {
              var u,
                D;
              if (
                s = new Hook(P.arraylist.hook[e - 1].id, null, - 1, p.SED_KTL, M),
                l = new Hook(P.arraylist.hook[e].id, null, - 1, p.SED_KTR, b),
                i = P.arraylist.hook[e],
                n = A(i.startpoint, i.endpoint, s, l),
                I.push(n),
                P.arraylist.hook[e].textid >= 0 &&
                (S = GlobalData.optManager.GetObjectPtr(n, !1)) &&
                (
                  S.DataID = P.arraylist.hook[e].textid,
                  (u = GlobalData.optManager.svgObjectLayer.GetElementByID(P.BlockID)) &&
                  (D = u.GetElementByID(ConstantData.SVGElementClass.TEXT, r))
                )
              ) {
                o = D.GetTextMinDimensions(),
                  S.trect.width = o.width,
                  S.trect.height = o.height;
                var g = D.GetPos();
                S.trect.x = P.Frame.x + g.x,
                  S.trect.y = P.Frame.y + g.y
              }
            }
            return I
          }() : h ? function () {
            s = null;
            var a = 1;
            if (P.hooks.length) {
              switch (P.hooks[0].hookpt) {
                case p.SED_LL:
                case p.SED_LT:
                  r = 1;
                  break;
                default:
                  r = 2
              }
              P.vertical ? (b.y = d / 2, b.x = 0, 2 === r && (b.x = d)) : (b.x = d / 2, b.y = 0, 2 === r && (b.y = d)),
                (s = P.hooks[0]).hookpt = p.SED_KTL
            }
            for (e = c; e < t; e++) if (
              l = new Hook(P.arraylist.hook[e].id, null, - 1, p.SED_KTR, b),
              a = (i = P.arraylist.hook[e]).endpoint.h - i.startpoint.h < - 1 ? - 1 : 1,
              n = A(i.startpoint, i.endpoint, s, l, a),
              I.push(n),
              P.arraylist.hook[e].textid >= 0 &&
              (S = GlobalData.optManager.GetObjectPtr(n, !1))
            ) {
              S.DataID = P.arraylist.hook[e].textid;
              var o = GlobalData.optManager.svgObjectLayer.GetElementByID(P.BlockID);
              if (o) {
                var u = o.GetElementByID(ConstantData.SVGElementClass.TEXT, r);
                if (u) {
                  var D = u.GetTextMinDimensions();
                  S.trect.width = D.width,
                    S.trect.height = D.height;
                  var g = u.GetPos();
                  S.trect.x = P.Frame.x + g.x,
                    S.trect.y = P.Frame.y + g.y
                }
              }
            }
            return I
          }() : this.arraylist.tilt ? function () {
            if (
              o = P.StartArrowID,
              P.StartArrowID = P.EndArrowID,
              P.EndArrowID = o,
              i = P.arraylist.hook[0],
              n = A(i.startpoint, i.endpoint, null, null),
              I.push(n),
              P.hooks.length
            ) {
              switch (P.hooks[0].hookpt) {
                case p.SED_LL:
                case p.SED_LT:
                  r = 1;
                  break;
                default:
                  r = 2
              }
              s = P.hooks[0],
                i = P.arraylist.hook[r],
                n = A(i.startpoint, i.endpoint, s, null),
                I.push(n)
            }
            for (e = c; e < t; e++) i = P.arraylist.hook[e],
              n = A(i.startpoint, i.endpoint, null, null),
              I.push(n);
            return I
          }() : this.arraylist.angle ? function () {
            if (
              (i = P.arraylist.hook[0]).startpoint.h === i.endpoint.h &&
              i.startpoint.v === i.endpoint.v ||
              (n = A(i.startpoint, i.endpoint, null, null, 0), I.push(n)),
              P.hooks.length
            ) switch (P.hooks[0].hookpt) {
              case p.SED_LL:
              case p.SED_LT:
                r = 1;
                break;
              default:
                r = 2
            }
            for (
              (i = P.arraylist.hook[1]).startpoint.h === i.endpoint.h &&
              i.startpoint.v === i.endpoint.v ||
              (
                1 === r &&
                (s = P.hooks[0]),
                n = A(i.startpoint, i.endpoint, s, null, 0),
                I.push(n),
                s = null
              ),
              (i = P.arraylist.hook[2]).startpoint.h === i.endpoint.h &&
              i.startpoint.v === i.endpoint.v ||
              (
                2 === r &&
                (s = P.hooks[0]),
                n = A(i.startpoint, i.endpoint, s, null, 0),
                I.push(n),
                s = null
              ),
              e = c;
              e < t;
              e++
            ) i = P.arraylist.hook[e],
              n = A(i.startpoint, i.endpoint, null, null),
              I.push(n);
            return I
          }() : y ||
            f ? function () {
              s = null;
              var a,
                r,
                o,
                S,
                D = 1,
                g = [],
                h = [];
              for (
                P.vertical ? (
                  a = P.arraylist.hook[1],
                  h.push({
                    x: a.endpoint.v,
                    y: a.endpoint.h
                  }),
                  h.push({
                    x: a.startpoint.v,
                    y: a.startpoint.h
                  }),
                  L ? m ? (r = p.SED_KTC, o = p.SED_KRC, b.y = d / 2, b.x = d) : (r = p.SED_KTC, o = p.SED_KLC, b.y = d / 2, b.x = 0) : m ? f ? (r = p.SED_KLC, o = p.SED_KBC, b.y = d, b.x = d / 2) : (r = p.SED_KBC, o = p.SED_KRC, b.y = d / 2, b.x = d) : f ? (r = p.SED_KRC, o = p.SED_KTC, b.x = d / 2, b.y = 0) : (r = p.SED_KBC, o = p.SED_KBC, b.y = d / 2, b.x = 0)
                ) : (
                  a = P.arraylist.hook[1],
                  h.push({
                    x: a.endpoint.h,
                    y: a.endpoint.v
                  }),
                  h.push({
                    x: a.startpoint.h,
                    y: a.startpoint.v
                  }),
                  m ? (r = p.SED_KTC, o = p.SED_KLC, b.y = d / 2, b.x = 0) : (r = p.SED_KBC, o = p.SED_KLC, b.y = d / 2, b.x = 0)
                ),
                P.hooks.length &&
                (
                  P.hooks[0].connect.y != - u.SEDA_CoManager ? (s = P.hooks[0]).hookpt = p.SED_KTL : s = null
                ),
                e = c;
                e < t;
                e++
              ) (g = []).push({
                x: h[0].x,
                y: h[0].y
              }),
                g.push({
                  x: h[1].x,
                  y: h[1].y
                }),
                i = P.arraylist.hook[e],
                (S = GlobalData.optManager.GetObjectPtr(i.id, !1)) &&
                S.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
                0 == (S.arraylist.styleflags & u.SEDA_CoManager) ||
                (
                  P.vertical ? m ? f &&
                    (i.endpoint.h < g[0].y ? (o = p.SED_KBC, b.y = d) : (o = p.SED_KTC, b.y = 0)) : f ? i.endpoint.h < g[0].y ? (o = p.SED_KBC, b.y = d) : (o = p.SED_KTC, b.y = 0) : i.endpoint.v < 0 ? (b.x = d, o = p.SED_KRC) : (b.x = 0, o = p.SED_KLC) : i.endpoint.h < g[0].x ? (o = p.SED_KRC, b.x = d) : (o = p.SED_KLC, b.x = 0),
                  l = new Hook(P.arraylist.hook[e].id, null, - 1, p.SED_KTR, b),
                  D = L ? - 1 : 1,
                  f &&
                  (D = 0),
                  P.vertical ? f ? g.push({
                    x: i.endpoint.v,
                    y: i.endpoint.h
                  }) : (
                    g[1].y = i.startpoint.h,
                    g.push({
                      x: i.endpoint.v,
                      y: i.startpoint.h
                    })
                  ) : (
                    g[1].x = i.startpoint.v,
                    g.push({
                      x: i.endpoint.h,
                      y: i.endpoint.v
                    })
                  ),
                  n = _(g, r, o, s, l, D),
                  I.push(n)
                );
              return I
            }() : function () {
              s = null;
              var a,
                o,
                S,
                D,
                g,
                h,
                y,
                f,
                L,
                T = 1,
                M = [],
                R = [],
                A = [],
                w = 1;
              for (
                r = 1,
                m &&
                (w = - 1),
                P.vertical ? (
                  2 === r &&
                  (b.x = d),
                  a = P.arraylist.hook[r],
                  R.push({
                    x: a.endpoint.v,
                    y: a.endpoint.h
                  }),
                  R.push({
                    x: a.startpoint.v,
                    y: a.startpoint.h
                  }),
                  m ? (o = p.SED_KLC, S = p.SED_KRC, b.y = d / 2, b.x = d) : (o = p.SED_KRC, S = p.SED_KLC, b.y = d / 2, b.x = 0),
                  y = 0,
                  h = P.Frame.width
                ) : (
                  a = P.arraylist.hook[r],
                  R.push({
                    x: a.endpoint.h,
                    y: a.endpoint.v
                  }),
                  R.push({
                    x: a.startpoint.h,
                    y: a.startpoint.v
                  }),
                  m ? (o = p.SED_KTC, S = p.SED_KBC, b.x = d / 2, b.y = d) : (o = p.SED_KBC, S = p.SED_KTC, b.x = d / 2, b.y = 0),
                  h = 0,
                  y = P.Frame.height
                ),
                P.hooks.length &&
                (
                  P.hooks[0].connect.y != - u.SEDA_CoManager ? (s = P.hooks[0]).hookpt = p.SED_KTL : s = null
                ),
                e = c;
                e < t;
                e++
              ) {
                if (
                  (M = []).push({
                    x: R[0].x,
                    y: R[0].y
                  }),
                  M.push({
                    x: R[1].x,
                    y: R[1].y
                  }),
                  l = new Hook(P.arraylist.hook[e].id, null, - 1, p.SED_KTR, b),
                  i = P.arraylist.hook[e],
                  T = 1,
                  P.vertical ? (
                    M.push({
                      x: M[1].x,
                      y: i.startpoint.h
                    }),
                    M.push({
                      x: i.endpoint.v,
                      y: i.startpoint.h
                    }),
                    M[3].y - M[0].y < - 1 &&
                    (T = - 1)
                  ) : (
                    M.push({
                      x: i.startpoint.h,
                      y: M[1].y
                    }),
                    M.push({
                      x: i.startpoint.h,
                      y: i.endpoint.v
                    }),
                    M[3].x - M[0].x < - 1 &&
                    (T = - 1)
                  ),
                  C
                ) for (T = 0, D = M.length, A = [], g = 0; g < D; g++) A.push({
                  x: M[g].x,
                  y: M[g].y
                }),
                  h &&
                  (A[g].x = w * (h - w * A[g].x)),
                  y &&
                  (A[g].y = w * (y - w * A[g].y));
                n = _(M, o, S, s, l, T),
                  I.push(n),
                  C &&
                  (f = E(o), L = E(S), n = _(A, f, L, null, null, 0), I.push(n))
              }
              return I
            }()
  }



  FieldDataAllowed() {
    return !1
  }
}


export default Connector
