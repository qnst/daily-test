




// import SDJS from "../../SDJS/SDJS.Index";
// import SDUI from "../../SDUI/SDUI.Index";
// import SDGraphics from "./../../SDGraphics/SDGraphics.Index";
// import GPP from '../../gListManager';
// import $ from 'jquery';
// import HvacSVG from '../../Hvac.SVG.t2';


// import DefaultStyle from '../../SDGraphics/TextFormatter.Index';


import { Type } from 'class-transformer'
import 'reflect-metadata'

import Globals from "../Data/Globals"
import ListManager from "../Data/ListManager"
import Utils1 from '../Helper/Utils1'
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"
import Global from '../Data/Globals'
import GlobalData from '../Data/GlobalData'
import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
import DefaultEvt from "../Event/DefaultEvt"
import Resources from '../Data/Resources'
import DefaultStyle from '../Model/DefaultStyle'

// import Element from "../Basic/Basic.Element";
// import Formatter from '../Basic/Basic.Text.Formatter'

import Point from '../Model/Point'

import $ from 'jquery'

// import { isPolygonType } from '../Shape/Shape.Polygon'
import Document from '../Basic/Basic.Document'

import Element from '../Basic/Basic.Element';
import Effects from "../Basic/Basic.Element.Effects";
import Formatter from '../Basic/Basic.Text.Formatter'
import Utils4 from "../Helper/Utils3";
import ParagraphFormat from '../Model/ParagraphFormat'
import Instance from "../Data/Instance/Instance"
import ConstantData from "../Data/ConstantData"
import TextFormatData from "../Model/TextFormatData"
import QuickStyle from "../Model/QuickStyle"

import PolySeg from '../Model/PolySeg'
import RightClickData from '../Model/RightClickData'
import TextObject from '../Model/TextObject'
import Rectangle from '../Model/Rectangle'

import CRect from '../Model/CRect'
import ConstantData2 from '../Data/ConstantData2'

import PolyList from '../Model/PolyList'






class BaseDrawingObject {





  // constructor(e) {
  //   //'use strict';
  //   return e = e ||
  //   {
  //   },
  //     this.Type = Globals.StoredObjectType.BASE_LM_DRAWING_OBJECT,
  //     this.Frame = e.Frame ||
  //     {
  //       x: 0,
  //       y: 0,
  //       width: 0,
  //       height: 0
  //     },
  //     this.r = e.r ||
  //     {
  //       x: 0,
  //       y: 0,
  //       width: 0,
  //       height: 0
  //     },
  //     this.inside = e.inside ||
  //     {
  //       x: 0,
  //       y: 0,
  //       width: 0,
  //       height: 0
  //     },
  //     this.trect = e.trect ||
  //     {
  //       x: 0,
  //       y: 0,
  //       width: 0,
  //       height: 0
  //     },
  //     this.rtop = e.rtop ||
  //     0,
  //     this.rleft = e.rleft ||
  //     0,
  //     this.rbottom = e.rbottom ||
  //     0,
  //     this.rright = e.rright ||
  //     0,
  //     this.rwd = e.rwd ||
  //     0,
  //     this.rht = e.rht ||
  //     0,
  //     this.rflags = e.rflags ||
  //     0,
  //     this.RotationAngle = e.RotationAngle ||
  //     0,
  //     this.ShortRef = e.ShortRef ||
  //     0,
  //     this.StyleRecord = e.StyleRecord ||
  //     null,
  //     this.Dimensions = e.Dimensions ||
  //     0,
  //     this.bOverrideDefaultStyleOnDraw = e.bOverrideDefaultStyleOnDraw ||
  //     !1,
  //     null == e.UniqueID ? this.UniqueID = - 1 : this.UniqueID = e.UniqueID,
  //     this.flags = e.flags ||
  //     0,
  //     this.extraflags = e.extraflags ||
  //     0,
  //     this.hookflags = e.hookflags ||
  //     [],
  //     this.targflags = e.targflags ||
  //     [],
  //     this.hooks = e.hooks ||
  //     [],
  //     this.maxhooks = e.maxhooks ||
  //     1,
  //     this.associd = e.associd ||
  //     - 1,
  //     this.attachpoint = e.attachpoint ||
  //     {
  //       x: ConstantData.Defines.SED_CDim / 2,
  //       y: ConstantData.Defines.SED_CDim / 2
  //     },
  //     this.hookdisp = {
  //       x: 0,
  //       y: 0
  //     },
  //     this.TextFlags = e.TextFlags ||
  //     0,
  //     this.DrawingObjectBaseClass = e.DrawingObjectBaseClass ||
  //     ConstantData.DrawingObjectBaseClass.SHAPE,
  //     this.objecttype = e.objecttype ||
  //     0,
  //     this.subtype = e.subtype ||
  //     0,
  //     this.dataclass = e.dataclass ||
  //     0,
  //     this.Layer = e.Layer ||
  //     0,
  //     this.SequenceNumber = e.SequenceNumber ||
  //     - 1,
  //     this.BusinessObjectID = e.BusinessObjectId ||
  //     - 1,
  //     this.NoteID = e.NoteID ||
  //     - 1,
  //     this.ExpandedViewID = e.ExpandedViewID ||
  //     - 1,
  //     this.DataID = e.DataID ||
  //     - 1,
  //     this.tindent = e.tindent ||
  //     {
  //       top: 0,
  //       left: 0,
  //       bottom: 0,
  //       right: 0
  //     },
  //     this.TMargins = e.TMargins ||
  //     {
  //       top: 0,
  //       left: 0,
  //       bottom: 0,
  //       right: 0
  //     },
  //     this.left_sindent = e.left_sindent ||
  //     0,
  //     this.right_sindent = e.right_sindent ||
  //     0,
  //     this.top_sindent = e.top_sindent ||
  //     0,
  //     this.bottom_sindent = e.bottom_sindent ||
  //     0,
  //     this.TableID = - 1,
  //     this.GraphID = - 1,
  //     this.GanttInfoID = e.GanttInfoID ||
  //     - 1,
  //     this.RotationAngle = e.RotationAngle ||
  //     0,
  //     this.ImageID = e.ImageID ||
  //     - 1,
  //     this.ContentType = e.ContentType ||
  //     ListManager.ContentType.NONE,
  //     this.ContentID = e.ContentID ||
  //     - 1,
  //     this.CommentID = e.CommentID ||
  //     - 1,
  //     this.TextParams = e.TextParams ||
  //     null,
  //     this.TextGrow = e.TextGrow ||
  //     ConstantData.TextGrowBehavior.PROPORTIONAL,
  //     this.TextAlign = e.TextAlign ||
  //     ConstantData.TextAlign.CENTER,
  //     this.colorfilter = e.colorfilter ||
  //     0,
  //     this.colorchanges = e.colorchanges ||
  //     0,
  //     this.moreflags = e.moreflags ||
  //     0,
  //     this.sizedim = e.sizedim ||
  //     {
  //       width: 0,
  //       height: 0
  //     },
  //     this.ConnectPoints = e.ConnectPoints ||
  //     [],
  //     this.ObjGrow = e.ObjGrow ||
  //     ConstantData.GrowBehavior.ALL,
  //     this.ObjGrow === ConstantData.GrowBehavior.PROPORTIONAL &&
  //     (e.ResizeAspectConstrain = !0),
  //     this.TableID = e.TableID ||
  //     - 1,
  //     this.RowID = e.RowID ||
  //     - 1,
  //     this.datasetType = e.datasetType ||
  //     - 1,
  //     this.datasetID = e.datasetID ||
  //     - 1,
  //     this.datasetTableID = e.datasetTableID ||
  //     - 1,
  //     this.datasetElemID = e.datasetElemID ||
  //     - 1,
  //     this.fieldDataDatasetID = e.fieldDataDatasetID ||
  //     - 1,
  //     this.fieldDataTableID = e.fieldDataTableID ||
  //     - 1,
  //     this.fieldDataElemID = e.fieldDataElemID ||
  //     - 1,
  //     this.dataStyleOverride = null,
  //     this.SymbolURL = e.SymbolURL ||
  //     '',
  //     this.ImageURL = e.ImageURL ||
  //     '',
  //     this.ImageDir = e.ImageDir ||
  //     null,
  //     this.BlobBytesID = e.BlobBytesID ||
  //     - 1,
  //     this.EMFHash = e.EMFHash ||
  //     null,
  //     this.EMFBlobBytesID = e.EMFBlobBytesID ||
  //     - 1,
  //     this.OleBlobBytesID = e.OleBlobBytesID ||
  //     - 1,
  //     this.NativeID = e.NativeID ||
  //     - 1,
  //     this.SymbolData = null,
  //     this.nativeDataArrayBuffer = null,
  //     this.EMFBuffer = null,
  //     this.EMFBufferType = e.EMFBufferType ||
  //     null,
  //     this.SymbolID = e.SymbolID,
  //     this.SVGFragment = e.SVGFragment ||
  //     null,
  //     this.ShapesInGroup = e.ShapesInGroup ||
  //     [],
  //     this.InitialGroupBounds = e.InitialGroupBounds ||
  //     {
  //       x: 0,
  //       y: 0,
  //       width: 0,
  //       height: 0
  //     },
  //     this.ImageHeader = e.ImageHeader ||
  //     null,
  //     this.OleHeader = e.OleHeader ||
  //     null,
  //     this.nIcons = e.nIcons ||
  //     0,
  //     this.iconSize = e.iconSize ||
  //     18,
  //     this.iconShapeBottomOffset = e.iconShapeBottomOffset ||
  //     ConstantData.Defines.IconShapeBottomOffset,
  //     this.iconShapeRightOffset = e.iconShapeRightOffset ||
  //     ConstantData.Defines.iconShapeRightOffset,
  //     this.HyperlinkText = e.HyperlinkText ||
  //     '',
  //     this.AttachmentInfo = e.AttachmentInfo ||
  //     '',
  //     this.NoteID = e.NoteID ||
  //     - 1,
  //     this.ResizeAspectConstrain = e.ResizeAspectConstrain ||
  //     !1,
  //     this.ob = {},
  //     this.prevBBox = e.prevBBox ||
  //     {
  //       x: 0,
  //       y: 0,
  //       width: 0,
  //       height: 0
  //     },
  //     this.bInGroup = !1,
  //     this.LineTextX = e.LineTextX ||
  //     0,
  //     this.LineTextY = e.LineTextX ||
  //     0,
  //     this.VisioRotationDiff = 0,
  //     this.actionArrowHideTimerID = - 1,
  //     this.FramezList = null,
  //     this.ParentFrameID = - 1,
  //     this
  // }



  public Type: string;
  public Frame: Rectangle;
  public r: Point;
  public inside: Point;
  public trect: Point;
  public rtop: number;
  public rleft: number;
  public rbottom: number;
  public rright: number;
  public rwd: number;
  public rht: number;
  public rflags: number;
  public RotationAngle: number;
  public ShortRef: number;

  @Type(() => QuickStyle)
  public StyleRecord: QuickStyle;

  public Dimensions: number;
  public bOverrideDefaultStyleOnDraw: boolean;
  public UniqueID: number;
  public flags: number;
  public extraflags: number;
  public hookflags: any[];
  public targflags: any[];
  public hooks: any[];
  public maxhooks: number;
  public associd: number;
  public attachpoint: Point;

  public hookdisp: Point;
  public TextFlags: number;
  public DrawingObjectBaseClass: number;
  public objecttype: number;
  public subtype: number;
  public dataclass: number;
  public Layer: number;
  public SequenceNumber: number;
  public BusinessObjectID: number;
  public NoteID: number;
  public ExpandedViewID: number;
  public DataID: number;
  public tindent: Point;
  public TMargins: Point;
  public left_sindent: number;
  public right_sindent: number;
  public top_sindent: number;
  public bottom_sindent: number;
  public TableID: number;
  public GraphID: number;
  public GanttInfoID: number;
  public ImageID: number;
  public ContentType: number;
  public ContentID: number;
  public CommentID: number;
  public TextParams: any;
  public TextGrow: number;
  public TextAlign: number;
  public colorfilter: number;
  public colorchanges: number;
  public moreflags: number;
  public sizedim: Point;
  public ConnectPoints: any[];
  public ObjGrow: number;
  public datasetType: number;
  public datasetID: number;
  public datasetTableID: number;
  public datasetElemID: number;
  public fieldDataDatasetID: number;
  public fieldDataTableID: number;
  public fieldDataElemID: number;
  public dataStyleOverride: any;
  public SymbolURL: string;
  public ImageURL: string;
  public ImageDir: any;
  public BlobBytesID: number;
  public EMFHash: any;
  public EMFBlobBytesID: number;
  public OleBlobBytesID: number;
  public NativeID: number;
  public SymbolData: any;
  public nativeDataArrayBuffer: any;
  public EMFBuffer: any;
  public EMFBufferType: any;
  public SymbolID: any;
  public SVGFragment: any;
  public ShapesInGroup: any[];
  public InitialGroupBounds: Point;
  public ImageHeader: any;
  public OleHeader: any;
  public nIcons: number;
  public iconSize: number;
  public iconShapeBottomOffset: any;
  public iconShapeRightOffset: any;
  public HyperlinkText: string;
  public AttachmentInfo: string;
  public ResizeAspectConstrain: boolean;
  public ob: any;

  @Type(() => Point)
  public prevBBox: Point;

  public bInGroup: boolean;
  public LineTextX: number;
  public LineTextY: number;
  public VisioRotationDiff: number;
  public actionArrowHideTimerID: number;
  public FramezList: any;
  public ParentFrameID: number;

  @Type(() => Point)
  public StartPoint: Point;

  @Type(() => Point)
  public EndPoint: Point;

  public LineType: number;

  public BlockID: number;

  @Type(() => PolyList)
  public polylist: PolyList;

  public dimensionDeflectionH: number;
  public dimensionDeflectionV: number;


  constructor(e) {
    e = e || {};
    this.Type = ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT;
    this.Frame = e.Frame || { x: 0, y: 0, width: 0, height: 0 };
    this.r = e.r || { x: 0, y: 0, width: 0, height: 0 };
    this.inside = e.inside || { x: 0, y: 0, width: 0, height: 0 };
    this.trect = e.trect || { x: 0, y: 0, width: 0, height: 0 };
    this.rtop = e.rtop || 0;
    this.rleft = e.rleft || 0;
    this.rbottom = e.rbottom || 0;
    this.rright = e.rright || 0;
    this.rwd = e.rwd || 0;
    this.rht = e.rht || 0;
    this.rflags = e.rflags || 0;
    this.RotationAngle = e.RotationAngle || 0;
    this.ShortRef = e.ShortRef || 0;
    this.StyleRecord = e.StyleRecord || null;
    this.Dimensions = e.Dimensions || 0;
    this.bOverrideDefaultStyleOnDraw = e.bOverrideDefaultStyleOnDraw || false;
    this.UniqueID = e.UniqueID == null ? -1 : e.UniqueID;
    this.flags = e.flags || 0;
    this.extraflags = e.extraflags || 0;
    this.hookflags = e.hookflags || [];
    this.targflags = e.targflags || [];
    this.hooks = e.hooks || [];
    this.maxhooks = e.maxhooks || 1;
    this.associd = e.associd || -1;
    this.attachpoint = e.attachpoint || { x: ConstantData.Defines.SED_CDim / 2, y: ConstantData.Defines.SED_CDim / 2 };
    this.hookdisp = { x: 0, y: 0 };
    this.TextFlags = e.TextFlags || 0;
    this.DrawingObjectBaseClass = e.DrawingObjectBaseClass || ConstantData.DrawingObjectBaseClass.SHAPE;
    this.objecttype = e.objecttype || 0;
    this.subtype = e.subtype || 0;
    this.dataclass = e.dataclass || 0;
    this.Layer = e.Layer || 0;
    this.SequenceNumber = e.SequenceNumber || -1;
    this.BusinessObjectID = e.BusinessObjectId || -1;
    this.NoteID = e.NoteID || -1;
    this.ExpandedViewID = e.ExpandedViewID || -1;
    this.DataID = e.DataID || -1;
    this.tindent = e.tindent || { top: 0, left: 0, bottom: 0, right: 0 };
    this.TMargins = e.TMargins || { top: 0, left: 0, bottom: 0, right: 0 };
    this.left_sindent = e.left_sindent || 0;
    this.right_sindent = e.right_sindent || 0;
    this.top_sindent = e.top_sindent || 0;
    this.bottom_sindent = e.bottom_sindent || 0;
    this.TableID = e.TableID || -1;
    this.GraphID = e.GraphID || -1;
    this.GanttInfoID = e.GanttInfoID || -1;
    this.ImageID = e.ImageID || -1;
    this.ContentType = e.ContentType || ConstantData.ContentType.NONE;
    this.ContentID = e.ContentID || -1;
    this.CommentID = e.CommentID || -1;
    this.TextParams = e.TextParams || null;
    this.TextGrow = e.TextGrow || ConstantData.TextGrowBehavior.PROPORTIONAL;
    this.TextAlign = e.TextAlign || ConstantData.TextAlign.CENTER;
    this.colorfilter = e.colorfilter || 0;
    this.colorchanges = e.colorchanges || 0;
    this.moreflags = e.moreflags || 0;
    this.sizedim = e.sizedim || { width: 0, height: 0 };
    this.ConnectPoints = e.ConnectPoints || [];
    this.ObjGrow = e.ObjGrow || ConstantData.GrowBehavior.ALL;
    if (this.ObjGrow === ConstantData.GrowBehavior.PROPORTIONAL) {
      e.ResizeAspectConstrain = true;
    }
    this.datasetType = e.datasetType || -1;
    this.datasetID = e.datasetID || -1;
    this.datasetTableID = e.datasetTableID || -1;
    this.datasetElemID = e.datasetElemID || -1;
    this.fieldDataDatasetID = e.fieldDataDatasetID || -1;
    this.fieldDataTableID = e.fieldDataTableID || -1;
    this.fieldDataElemID = e.fieldDataElemID || -1;
    this.dataStyleOverride = null;
    this.SymbolURL = e.SymbolURL || '';
    this.ImageURL = e.ImageURL || '';
    this.ImageDir = e.ImageDir || null;
    this.BlobBytesID = e.BlobBytesID || -1;
    this.EMFHash = e.EMFHash || null;
    this.EMFBlobBytesID = e.EMFBlobBytesID || -1;
    this.OleBlobBytesID = e.OleBlobBytesID || -1;
    this.NativeID = e.NativeID || -1;
    this.SymbolData = null;
    this.nativeDataArrayBuffer = null;
    this.EMFBuffer = null;
    this.EMFBufferType = e.EMFBufferType || null;
    this.SymbolID = e.SymbolID;
    this.SVGFragment = e.SVGFragment || null;
    this.ShapesInGroup = e.ShapesInGroup || [];
    this.InitialGroupBounds = e.InitialGroupBounds || { x: 0, y: 0, width: 0, height: 0 };
    this.ImageHeader = e.ImageHeader || null;
    this.OleHeader = e.OleHeader || null;
    this.nIcons = e.nIcons || 0;
    this.iconSize = e.iconSize || 18;
    this.iconShapeBottomOffset = e.iconShapeBottomOffset || ConstantData.Defines.IconShapeBottomOffset;
    this.iconShapeRightOffset = e.iconShapeRightOffset || ConstantData.Defines.iconShapeRightOffset;
    this.HyperlinkText = e.HyperlinkText || '';
    this.AttachmentInfo = e.AttachmentInfo || '';
    this.ResizeAspectConstrain = e.ResizeAspectConstrain || false;
    this.ob = {};
    this.prevBBox = e.prevBBox || { x: 0, y: 0, width: 0, height: 0 };
    this.bInGroup = false;
    this.LineTextX = e.LineTextX || 0;
    this.LineTextY = e.LineTextX || 0;
    this.VisioRotationDiff = 0;
    this.actionArrowHideTimerID = -1;
    this.FramezList = null;
    this.ParentFrameID = -1;

    // return this;
  }






  // ListManager.BaseDrawingObject = function (e) {
  //   //'use strict';
  //   e = e || {};
  //   this.Type = Globals.StoredObjectType.BASE_LM_DRAWING_OBJECT;
  //   this.Frame = e.Frame || { x: 0, y: 0, width: 0, height: 0 };
  //   this.r = e.r || { x: 0, y: 0, width: 0, height: 0 };
  //   this.inside = e.inside || { x: 0, y: 0, width: 0, height: 0 };
  //   this.trect = e.trect || { x: 0, y: 0, width: 0, height: 0 };
  //   this.rtop = e.rtop || 0;
  //   this.rleft = e.rleft || 0;
  //   this.rbottom = e.rbottom || 0;
  //   this.rright = e.rright || 0;
  //   this.rwd = e.rwd || 0;
  //   this.rht = e.rht || 0;
  //   this.rflags = e.rflags || 0;
  //   this.RotationAngle = e.RotationAngle || 0;
  //   this.ShortRef = e.ShortRef || 0;
  //   this.StyleRecord = e.StyleRecord || null;
  //   this.Dimensions = e.Dimensions || 0;
  //   this.bOverrideDefaultStyleOnDraw = e.bOverrideDefaultStyleOnDraw || false;
  //   this.UniqueID = e.UniqueID == null ? -1 : e.UniqueID;
  //   this.flags = e.flags || 0;
  //   this.extraflags = e.extraflags || 0;
  //   this.hookflags = e.hookflags || [];
  //   this.targflags = e.targflags || [];
  //   this.hooks = e.hooks || [];
  //   this.maxhooks = e.maxhooks || 1;
  //   this.associd = e.associd || -1;
  //   this.attachpoint = e.attachpoint || { x: ConstantData.Defines.SED_CDim / 2, y: ConstantData.Defines.SED_CDim / 2 };
  //   this.hookdisp = { x: 0, y: 0 };
  //   this.TextFlags = e.TextFlags || 0;
  //   this.DrawingObjectBaseClass = e.DrawingObjectBaseClass || ConstantData.DrawingObjectBaseClass.SHAPE;
  //   this.objecttype = e.objecttype || 0;
  //   this.subtype = e.subtype || 0;
  //   this.dataclass = e.dataclass || 0;
  //   this.Layer = e.Layer || 0;
  //   this.SequenceNumber = e.SequenceNumber || -1;
  //   this.BusinessObjectID = e.BusinessObjectId || -1;
  //   this.NoteID = e.NoteID || -1;
  //   this.ExpandedViewID = e.ExpandedViewID || -1;
  //   this.DataID = e.DataID || -1;
  //   this.tindent = e.tindent || { top: 0, left: 0, bottom: 0, right: 0 };
  //   this.TMargins = e.TMargins || { top: 0, left: 0, bottom: 0, right: 0 };
  //   this.left_sindent = e.left_sindent || 0;
  //   this.right_sindent = e.right_sindent || 0;
  //   this.top_sindent = e.top_sindent || 0;
  //   this.bottom_sindent = e.bottom_sindent || 0;
  //   this.TableID = e.TableID || -1;
  //   this.GraphID = e.GraphID || -1;
  //   this.GanttInfoID = e.GanttInfoID || -1;
  //   this.ImageID = e.ImageID || -1;
  //   this.ContentType = e.ContentType || ConstantData.ContentType.NONE;
  //   this.ContentID = e.ContentID || -1;
  //   this.CommentID = e.CommentID || -1;
  //   this.TextParams = e.TextParams || null;
  //   this.TextGrow = e.TextGrow || ConstantData.TextGrowBehavior.PROPORTIONAL;
  //   this.TextAlign = e.TextAlign || ConstantData.TextAlign.CENTER;
  //   this.colorfilter = e.colorfilter || 0;
  //   this.colorchanges = e.colorchanges || 0;
  //   this.moreflags = e.moreflags || 0;
  //   this.sizedim = e.sizedim || { width: 0, height: 0 };
  //   this.ConnectPoints = e.ConnectPoints || [];
  //   this.ObjGrow = e.ObjGrow || ConstantData.GrowBehavior.ALL;
  //   if (this.ObjGrow === ConstantData.GrowBehavior.PROPORTIONAL) {
  //     e.ResizeAspectConstrain = true;
  //   }
  //   this.datasetType = e.datasetType || -1;
  //   this.datasetID = e.datasetID || -1;
  //   this.datasetTableID = e.datasetTableID || -1;
  //   this.datasetElemID = e.datasetElemID || -1;
  //   this.fieldDataDatasetID = e.fieldDataDatasetID || -1;
  //   this.fieldDataTableID = e.fieldDataTableID || -1;
  //   this.fieldDataElemID = e.fieldDataElemID || -1;
  //   this.dataStyleOverride = null;
  //   this.SymbolURL = e.SymbolURL || '';
  //   this.ImageURL = e.ImageURL || '';
  //   this.ImageDir = e.ImageDir || null;
  //   this.BlobBytesID = e.BlobBytesID || -1;
  //   this.EMFHash = e.EMFHash || null;
  //   this.EMFBlobBytesID = e.EMFBlobBytesID || -1;
  //   this.OleBlobBytesID = e.OleBlobBytesID || -1;
  //   this.NativeID = e.NativeID || -1;
  //   this.SymbolData = null;
  //   this.nativeDataArrayBuffer = null;
  //   this.EMFBuffer = null;
  //   this.EMFBufferType = e.EMFBufferType || null;
  //   this.SymbolID = e.SymbolID;
  //   this.SVGFragment = e.SVGFragment || null;
  //   this.ShapesInGroup = e.ShapesInGroup || [];
  //   this.InitialGroupBounds = e.InitialGroupBounds || { x: 0, y: 0, width: 0, height: 0 };
  //   this.ImageHeader = e.ImageHeader || null;
  //   this.OleHeader = e.OleHeader || null;
  //   this.nIcons = e.nIcons || 0;
  //   this.iconSize = e.iconSize || 18;
  //   this.iconShapeBottomOffset = e.iconShapeBottomOffset || ConstantData.Defines.IconShapeBottomOffset;
  //   this.iconShapeRightOffset = e.iconShapeRightOffset || ConstantData.Defines.iconShapeRightOffset;
  //   this.HyperlinkText = e.HyperlinkText || '';
  //   this.AttachmentInfo = e.AttachmentInfo || '';
  //   this.ResizeAspectConstrain = e.ResizeAspectConstrain || false;
  //   this.ob = {};
  //   this.prevBBox = e.prevBBox || { x: 0, y: 0, width: 0, height: 0 };
  //   this.bInGroup = false;
  //   this.LineTextX = e.LineTextX || 0;
  //   this.LineTextY = e.LineTextX || 0;
  //   this.VisioRotationDiff = 0;
  //   this.actionArrowHideTimerID = -1;
  //   this.FramezList = null;
  //   this.ParentFrameID = -1;
  //   return this;
  // }








  GenericKnob(e) {

    console.log('SDJS ListManager. BaseDrawingObject. Genericknob', e);

    var t = e.svgDoc.CreateShape(e.shapeType);
    if (e.shapeType === Document.CreateShapeType.POLYGON) {
      if (e.polyPoints) t.SetPoints(e.polyPoints),
        e.polyPoints = null;
      else if ('vertical' === e.polyType) {
        var a = [
          {
            x: 0,
            y: 0
          },
          {
            x: e.knobSize / 2,
            y: - e.knobSize
          },
          {
            x: e.knobSize,
            y: 0
          },
          {
            x: e.knobSize / 2,
            y: e.knobSize
          }
        ];
        t.SetPoints(a)
      } else if ('horizontal' === e.polyType) {
        a = [
          {
            x: - e.knobSize / 2,
            y: 0
          },
          {
            x: e.knobSize / 2,
            y: - e.knobSize / 2
          },
          {
            x: 3 * e.knobSize / 2,
            y: 0
          },
          {
            x: e.knobSize / 2,
            y: e.knobSize / 2
          }
        ];
        t.SetPoints(a)
      } else {
        a = [
          {
            x: 0,
            y: e.knobSize / 2
          },
          {
            x: e.knobSize / 2,
            y: 0
          },
          {
            x: e.knobSize,
            y: e.knobSize / 2
          },
          {
            x: e.knobSize / 2,
            y: e.knobSize
          }
        ];
        t.SetPoints(a)
      }
      t.SetEventBehavior(Element.EventBehavior.ALL)
    }
    return e.locked ? (t.SetFillColor('gray'), t.SetID(0)) : (
      t.SetFillColor(e.fillColor),
      t.SetID(e.knobID),
      t.SetCursor(e.cursorType)
    ),
      t.SetSize(e.knobSize, e.knobSize),
      t.SetPos(e.x, e.y),
      t.SetFillOpacity(e.fillOpacity),
      t.SetStrokeWidth(e.strokeSize),
      t.SetStrokeColor(e.strokeColor),
      t
  }

  CreateActionTriggers(e, t, a, r) {
    return null
  }

  CreateShape(e, t) {
  }

  MoveSVG() {
    var e = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    if (e) {
      var t = this.GetSVGFrame();
      e.SetPos(t.x, t.y)
    }
  }

  CreateConnectHilites(e, t, a, r, i, n) {
    return null
  }

  CreateDimensionAdjustmentKnobs(e, t, a) {
    var r,
      n,
      o = null,
      s = 0,
      l = {},
      S = {},
      c = (l = $.extend(!0, {
      }, a)).knobSize / 2;
    var docToScreenScale;

    // Double ===
    var i, dimLineDeflectUserData, cursorAngle;
    for (
      l.knobID = ConstantData.ActionTriggerType.DIMENSION_LINE_ADJ,
      docToScreenScale = GlobalData.optManager.svgDoc.docInfo.docToScreenScale,
      GlobalData.optManager.svgDoc.docInfo.docScale <= 0.5 &&
      (docToScreenScale *= 2),
      l.knobSize = ConstantData.Defines.SED_KnobSize / docToScreenScale,
      l.shapeType = Document.CreateShapeType.POLYGON,
      l.fillColor = 'black',
      l.fillOpacity = 1,
      n = (r = this.GetDimensionPoints()).length,
      i = 1;
      i < n;
      i++
    ) dimLineDeflectUserData = this.GetDimensionLineDeflectionKnobUserData(t, i, r, c, l.knobSize / 2),
      dimLineDeflectUserData &&
      (
        l.x = dimLineDeflectUserData.knobPoint.x,
        l.y = dimLineDeflectUserData.knobPoint.y,
        s = Utils1.CalcAngleFromPoints(r[i - 1], r[i]),
        l.polyPoints = [
          {
            x: 0,
            y: l.knobSize / 2
          },
          {
            x: l.knobSize / 2,
            y: 0
          },
          {
            x: l.knobSize,
            y: l.knobSize / 2
          },
          {
            x: l.knobSize / 2,
            y: l.knobSize
          }
        ],
        0 != s &&
        (
          Utils2.GetPolyRect(S, l.polyPoints),
          Utils3.RotatePointsAboutCenter(S, - s / (180 / ConstantData.Geometry.PI), l.polyPoints)
        ),
        cursorAngle = s,
        this.RotationAngle &&
        0 != this.RotationAngle &&
        (cursorAngle += this.RotationAngle, cursorAngle %= 360),
        l.cursorType = this.CalcCursorForAngle(cursorAngle, !0),
        (o = this.GenericKnob(l)).SetUserData(dimLineDeflectUserData),
        e.AddElement(o)
      )
  }

  HitAreaClick(e) {
  }

  ChangeTarget(e, t, a, r, i, n) {
  }

  OnConnect(e, t, a, r, i) {
  }

  OnDisconnect(e, t, a, r) {
  }

  GetDimensionsRect() {
    //'use strict';
    var e,
      t,
      a,
      r,
      i,
      n,
      o = 0,
      s = (o = 0, new Rectangle()),
      l = {},
      S = [];

    // var check = true;// this.Dimensions == ConstantData.DimensionFlags.SED_DF_Always || this.Dimensions == ConstantData.DimensionFlags.SED_DF_Select;

    if (
      !(
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select
      )
      // !check
    ) return s;
    if ((a = this.GetDimensionPoints()).length < 2) return s;
    for (r = a.length, e = 1; e < r; e++) (t = this.GetDimensionFloatingPointValue(e)) ||
      (t = this.GetDimensionTextForPoints(a[e - 1], a[e])),
      o = Utils1.CalcAngleFromPoints(a[e - 1], a[e]),
      (l = this.GetPointsForDimension(o, t, a[e - 1], a[e], e)) &&
      (S.push(l.left), S.push(l.right), S.push(l.textFrame));
    for (
      n = this.GetBoundingBoxesForSecondaryDimensions(),
      i = (S = S.concat(n)).length,
      e = 0;
      e < i;
      e++
    ) 0 == s.height &&
      0 === s.width ? Utils2.CopyRect(s, S[e]) : s = Utils2.UnionRect(s, S[e], s);
    return s.x += this.Frame.x,
      s.y += this.Frame.y,
      s
  }

  GetBoundingBoxesForSecondaryDimensions() {
    //'use strict';
    return []
  }

  AddDimensionsToR() {
    var e = this.GetDimensionsRect();
    0 !== e.width &&
      (this.r = Utils2.UnionRect(this.r, e, this.r))
  }

  UpdateFrame(e) {
    e &&
      (
        Utils2.CopyRect(this.Frame, e),
        Utils2.CopyRect(this.r, e),
        Utils2.CopyRect(this.inside, e),
        Utils2.CopyRect(this.trect, e)
      )
  }

  SetSize(e, t) {
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

  OffsetShape(e, t) {
    this.Frame.x += e,
      this.Frame.y += t,
      this.r.x += e,
      this.r.y += t,
      this.inside.x += e,
      this.inside.y += t,
      this.trect.x += e,
      this.trect.y += t
  }

  SetShapeOrigin(e, t, a) {
    var r = 0,
      i = 0;
    null != e &&
      (r = e - this.Frame.x),
      null != t &&
      (i = t - this.Frame.y),
      this.OffsetShape(r, i)
  }

  ApplyCurvature(e) {
  }

  ScaleObject(e, t, a, r, i, n, o) {
    var s = this.Frame;
    if (
      s.x = e + s.x * i,
      s.y = t + s.y * n,
      s.width *= i,
      s.height *= n,
      this.rflags &&
      (
        this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
        this.rflags = Utils2.SetFlag(
          this.rflags,
          ConstantData.FloatingPointDim.SD_FP_Height,
          !1
        )
      ),
      r
    ) {
      var l = {
        x: s.x + s.width / 2,
        y: s.y + s.height / 2
      },
        S = 2 * Math.PI * (r / 360),
        c = GlobalData.optManager.RotatePointAroundPoint(a, l, S);
      s.x = c.x - s.width / 2,
        s.y = c.y - s.height / 2,
        this.RotationAngle += r,
        this.RotationAngle >= 360 &&
        (this.RotationAngle -= 360)
    }
    if (o) {
      var u = i;
      n > u &&
        (u = n),
        this.StyleRecord.Line.Thickness = u * this.StyleRecord.Line.Thickness,
        this.StyleRecord.Line.BThick = u * this.StyleRecord.Line.BThick
    }
    if (this.ContainerList) {
      var p = this.ContainerList;
      p.HorizontalSpacing = u * p.HorizontalSpacing,
        p.VerticalSpacing = u * p.VerticalSpacing,
        p.MinWidth = u * p.MinWidth,
        p.MinHeight = u * p.MinHeight,
        p.childwidth = u * p.childwidth,
        p.childheight = u * p.childheight
    }
    this.UpdateFrame(s),
      this.sizedim.width = this.Frame.width,
      this.sizedim.height = this.Frame.height
  }

  GetDragR() {
    var e = {};
    return Utils2.CopyRect(e, this.r),
      e
  }

  GetHitTestFrame() {
    var e = {};
    return Utils2.CopyRect(e, this.r),
      e
  }

  // GetSVGFrame(e) {
  //   var t = {};
  //   return null == e &&
  //     (e = this.Frame),
  //     Utils2.CopyRect(t, e),
  //     t
  // }

  GetSVGFrame(frame?: Rectangle) {
    let newFrame: Rectangle = new Rectangle();
    if (frame === null) {
      frame = this.Frame;
    }
    Utils2.CopyRect(newFrame, frame);
    return newFrame;
  }

  LinkGrow(e, t) {
  }

  GetMoveRect(e, t) {
    var a = {};
    if (t) {
      Utils2.CopyRect(a, this.r),
        Utils2.InflateRect(a, 0, 0)
    } else Utils2.CopyRect(a, this.Frame);
    return a
  }

  GetPositionRect() {
    var e = {};
    return Utils2.CopyRect(e, this.Frame),
      e
  }

  AdjustPinRect(e, t) {
    return e
  }

  GetArrayRect(e) {
    var t,
      a,
      r = new CRect();
    return t = this.StyleRecord.Line.BThick ? 2 * this.StyleRecord.Line.BThick : this.StyleRecord.Line.Thickness / 2,
      a = $.extend(!0, {
      }, this.Frame),
      Utils2.InflateRect(a, t, t),
      e ? (r.h = a.y, r.v = a.x, r.hdist = a.height, r.vdist = a.width) : (r.h = a.x, r.hdist = a.width, r.v = a.y, r.vdist = a.height),
      r
  }

  GetTargetRect(e, t) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }
  }

  IsOKFlowChartShape(e) {
    return 0
  }

  _IsFlowChartConnector() {
    return !1
  }

  _IsOrgChartConnector() {
    return !1
  }

  GetHookFlags() {
    return 0
  }

  AllowLink() {
    return 0
  }

  IsSwimlane() {
    return !1
  }

  AllowSpell() {
    return !this.bInGroup &&
      0 == (this.TextFlags & ConstantData.TextFlags.SED_TF_NoSpell)
  }

  PreventLink() {
    return !1
  }

  AllowHeal() {
    return !1
  }

  AllowMaintainLink() {
    //'use strict';
    return !0
  }

  GetHookPoints() {
    return null
  }

  GetBestHook(e, t, a) {
    return t
  }

  SetHookAlign(e, t) {
  }

  GetTargetPoints(e, t, a) {
    return null
  }

  AllowHook(e, t, a) {
    return !0
  }

  ConnectToHook(e, t) {
    return t
  }

  HookToPoint(e, t) {
    return {
      x: 0,
      y: 0
    }
  }

  IsCoManager(e) {
    return !1
  }

  LinkNotVisible() {
    return (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) > 0
  }

  IsAsstConnector() {
    return !1
  }

  GetPerimPts(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S = [];
    s = t.length;
    for (
      var c = ConstantData.SDRShapeTypes.SED_S_Tri,
      u = ConstantData.Defines.SED_CDim,
      p = 0;
      p < s;
      p++
    ) S[p] = {
      x: 0,
      y: 0,
      id: 0
    },
      S[p].x = t[p].x / ConstantData.Defines.SED_CDim * this.Frame.width + this.Frame.x,
      l = this.dataclass === c ? u - t[p].y : t[p].y,
      S[p].y = l / ConstantData.Defines.SED_CDim * this.Frame.height + this.Frame.y,
      null != t[p].id &&
      (S[p].id = t[p].id);
    return r ||
      (
        o = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
        Utils3.RotatePointsAboutCenter(this.Frame, o, S)
      ),
      S
  }

  ChangeHook(e, t, a) {
    GlobalData.optManager.CN_ChangeHook(this, e, t, a)
  }

  ChangeShape(e, t, a, r, i) {
    return !1
  }





  GetLineChangeFrame() {
    var e = $.extend(!0, {
    }, this.Frame);
    return e.width < ConstantData.Defines.SED_SegDefLen &&
      (e.width = ConstantData.Defines.SED_SegDefLen),
      e.height < ConstantData.Defines.SED_SegDefLen &&
      (e.height = ConstantData.Defines.SED_SegDefLen),
      e
  }

  DeleteObject() {

    console.log('== track UpdateDimensionsLines Shape.BaseDrawingObject-> DeleteObject')
    var e = null,
      t = null,
      a = null,
      r = [];
    if (- 1 != this.TableID) {
      var i = GlobalData.optManager.GetObjectPtr(this.TableID, !0);
      i &&
        GlobalData.optManager.Table_DeleteObject(i),
        (e = GlobalData.objectStore.GetObject(this.TableID)) &&
        e.Delete()
    }
    - 1 != this.DataID &&
      (e = GlobalData.objectStore.GetObject(this.DataID)) &&
      e.Delete(),
      - 1 != this.NoteID &&
      (e = GlobalData.objectStore.GetObject(this.NoteID)) &&
      e.Delete(),
      - 1 != this.NativeID &&
      (e = GlobalData.objectStore.GetObject(this.NativeID)) &&
      e.Delete(),
      - 1 != this.GanttInfoID &&
      (e = GlobalData.objectStore.GetObject(this.GanttInfoID)) &&
      e.Delete(),
      - 1 != this.BlobBytesID &&
      (
        (e = GlobalData.objectStore.GetObject(this.BlobBytesID)) &&
        e.Delete(),
        GlobalData.optManager.IsBlobURL(this.ImageURL) &&
        GlobalData.optManager.DeleteURL(this.ImageURL)
      ),
      - 1 != this.EMFBlobBytesID &&
      (e = GlobalData.objectStore.GetObject(this.EMFBlobBytesID)) &&
      e.Delete(),
      - 1 != this.OleBlobBytesID &&
      (e = GlobalData.objectStore.GetObject(this.OleBlobBytesID)) &&
      e.Delete(),
      this.RemoveFieldData(!0),
      this.hooks.length &&
      (
        !(t = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, !1)) ||
        t.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ||
        t.Dimensions & ConstantData.DimensionFlags.SED_DF_HideHookedObjDimensions ||
        (
          r = Utils1.DeepCopy(this.hooks),
          this.hooks = [],
          a = GlobalData.optManager.svgObjectLayer.GetElementByID(t.BlockID),
          t.UpdateDimensionLines(a),
          this.hooks = r
        )
      ),
      this.CommentID >= 0 &&
      GlobalData.optManager.CommentObjectDelete(this)
  }

  GetTextIDs() {
    return []
  }

  GetSegLFace(e, t, a) {
    return 0
  }

  GetSpacing() {
    return {
      width: null,
      height: null
    }
  }

  GetShapeConnectPoint() {
    return {
      x: 0,
      y: 0
    }
  }

  ClosePolygon(e, t, a) {
    return !1
  }

  Hit(e, t, a, r) {
    return Utils2.pointInRect(this.Frame, e) ? ConstantData.HitCodes.SED_Border : 0
  }

  AfterModifyShape(e, t) {
    GlobalData.optManager.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
      GlobalData.optManager.UpdateLinks()
  }

  AfterRotateShape(e) {
    GlobalData.optManager.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
      GlobalData.optManager.UpdateLinks()
  }

  PolyGetTargetPointList(e) {
    //'use strict';
    var t,
      a = 0;
    return t = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !0, null),
      0 !== this.RotationAngle &&
      (
        a = - this.RotationAngle / (180 / ConstantData.Geometry.PI),
        Utils3.RotatePointsAboutCenter(this.Frame, a, t)
      ),
      t
  }

  GetPolyPoints(e, t, a, r, i) {
    // var n,
    //   o,
    //   s = 0,
    //   l = [],
    //   S = {};
    // if (
    //   Utils2.CopyRect(S, this.Frame),
    //   o = this.StyleRecord.Line.Thickness / 2,
    //   r &&
    //   Utils2.InflateRect(S, o, o),
    //   l.push(new Point(0, 0)),
    //   l.push(new Point(S.width, 0)),
    //   l.push(new Point(S.width, S.height)),
    //   l.push(new Point(0, S.height)),
    //   l.push(new Point(0, 0)),
    //   !t
    // ) for (n = l.length, s = 0; s < n; s++) l[s].x += S.x,
    //   l[s].y += S.y;
    // return l


    debugger

    let points: Point[] = [];
    let frameCopy: Rectangle = new Rectangle();
    let thickness: number = this.StyleRecord.Line.Thickness / 2;

    Utils2.CopyRect(frameCopy, this.Frame);

    if (r) {
      Utils2.InflateRect(frameCopy, thickness, thickness);
    }

    points.push(new Point(0, 0));
    points.push(new Point(frameCopy.width, 0));
    points.push(new Point(frameCopy.width, frameCopy.height));
    points.push(new Point(0, frameCopy.height));
    points.push(new Point(0, 0));

    if (!t) {
      for (let i = 0; i < points.length; i++) {
        points[i].x += frameCopy.x;
        points[i].y += frameCopy.y;
      }
    }

    return points;











  }

  RightClick(e) {
    var t = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
      a = GlobalData.optManager.svgObjectLayer.FindElementByDOMElement(e.currentTarget);
    if (!GlobalData.optManager.SelectObjectFromClick(e, a)) return !1;
    GlobalData.optManager.RightClickParams = new RightClickData(),
      GlobalData.optManager.RightClickParams.TargetID = a.GetID(),
      GlobalData.optManager.RightClickParams.HitPt.x = t.x,
      GlobalData.optManager.RightClickParams.HitPt.y = t.y,
      GlobalData.optManager.RightClickParams.Locked = (this.flags & ConstantData.ObjFlags.SEDO_Lock) > 0,
      GlobalData.docHandler.IsReadOnly() ? Commands.MainController.ShowContextualMenu(
        Resources.Controls.ContextMenus.DefaultReadOnly.Id.toLowerCase(),
        e.gesture.center.clientX,
        e.gesture.center.clientY
      ) : Commands.MainController.ShowContextualMenu(
        Resources.Controls.ContextMenus.Default.Id.toLowerCase(),
        e.gesture.center.clientX,
        e.gesture.center.clientY
      )
  }

  AdjustTextEditBackground(e, t) {
  }

  SetTextContent(e) {
    if (e) {
      var t = {
        runtimeText: e
      },
        a = new TextObject(t),
        r = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.LM_TEXT_OBJECT, a);
      if (null === r) throw new SDJSError({
        source: 'AddNewObject.CreateBlock',
        message: 'AddNewObject got a null new text block allocation'
      });
      this.DataID = r.ID
    }
  }

  SetNoteContent(e) {
    if (e) {
      var t = {
        runtimeText: e
      },
        a = new TextObject(t),
        r = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.LM_NOTES_OBJECT, a);
      if (null === r) throw new SDJSError({
        source: 'AddNewObject.CreateBlock',
        message: 'AddNewObject got a null new text block allocation'
      });
      this.NoteID = r.ID
    }
  }

  GetArrowheadFormat() {
    return null
  }

  GetTextParaFormat(e) {
    var t,
      a = {},
      r = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID),
      i = GlobalData.optManager.Table_GetActiveID();
    if (
      a.just = this.TextAlign,
      a.bullet = 'none',
      a.spacing = 0,
      t = this.GetTable(!1)
    ) GlobalData.optManager.Table_GetTextParaFormat(t, a, r, this.BlockID !== i, e, null);
    else if (this.DataID && this.DataID >= 0) {
      var n = r.textElem;
      if (n) {
        var o = n.GetVerticalAlignment(),
          s = n.GetSelectedParagraphStyle();
        if (s) if (
          (a = new ParagraphFormat()/*Basic.Text.ParagraphFormat*/).bullet = s.bullet,
          a.spacing = s.spacing,
          // this instanceof ListManager.BaseShape
          // Double === TODO
          // this instanceof GlobalDataShape.BaseShape
          this instanceof Instance.Shape.BaseShape
        ) if (a.vjust = o, e) switch (o) {
          case 'bottom':
          case 'top':
            a.just = o + '-' + s.just;
            break;
          default:
            a.just = s.just
        } else a.just = s.just;
        else a.just = this.TextAlign
      }
    }
    return a
  }

  GetTextFormat(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l = null,
      S = ConstantData.TextFace,
      c = new TextFormatData(),// Resources.TextFormatData,
      u = new DefaultStyle(),// new Formatter.DefaultStyle() /* Basic.Text.Formatter.DefaultStyle*/,
      p = GlobalData.optManager.Table_GetActiveID(),
      d = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    if (
      (c = Utils1.DeepCopy(this.StyleRecord.Text)).FontId = -1/* GlobalData.optManager.GetFontIdByName(d.def.lf.fontName)*/,
      c.FontName = d.def.lf.fontName,
      s = this.GetTable(!1)
    ) GlobalData.optManager.Table_GetTextFormat(s, c, null, p != this.BlockID, t);
    else if (this.DataID && this.DataID >= 0) {
      var D = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      if (D && (l = D.textElem), t && (t.hastext = !0), l) {
        l.GetText();
        var g = l.GetSelectedFormat();
        if (g) return e ? (
          c.FontSize = GlobalData.optManager.FontSizeToPoints(g.size),
          c.FontId = -1,// GlobalData.optManager.GetFontIdByName(g.font),
          c.FontName = g.font,
          r = 'bold' === g.weight,
          c.Face = Utils2.SetFlag(c.Face, S.Bold, r),
          a = 'italic' === g.style,
          c.Face = Utils2.SetFlag(c.Face, S.Italic, a),
          i = 'underline' === g.decoration,
          c.Face = Utils2.SetFlag(c.Face, S.Underline, i),
          n = 'super' === g.baseOffset,
          c.Face = Utils2.SetFlag(c.Face, S.Superscript, n),
          o = 'sub' === g.baseOffset,
          c.Face = Utils2.SetFlag(c.Face, S.Subscript, o),
          g.color ? c.Paint.Color = g.color : c.Paint.Color = '',
          g.colorTrans &&
          (c.Paint.Opacity = g.colorTrans),
          c
        ) : (
          u.font = g.font,
          u.size = g.size,
          u.weight = g.weight,
          u.style = g.style,
          u.decoration = g.decoration,
          u.baseOffset = g.baseOffset,
          u.color = g.color,
          u.colorTrans = g.colorTrans,
          u
        )
      }
    }
    return e ? c : null
  }

  UseTextBlockColor() {
    return !1
  }

  SetTextObject(e) {
    return this.DataID = e,
      !0
  }

  GetTextObject(e, t) {
    return this.DataID
  }

  SetTextFormat(e, t) {
  }

  ExtendLines() {
  }

  ExtendCell(e, t, a) {
    return null
  }

  SetTableProperties(e, t) {
    return !1
  }

  SetShapeProperties(e) {
    var t = !1;
    switch (e.ClickFlag) {
      case ConstantData.TextFlags.SED_TF_OneClick:
        0 == (this.TextFlags & ConstantData.TextFlags.SED_TF_OneClick) &&
          (
            this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_OneClick, !0),
            this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_None, !1),
            t = !0
          );
        break;
      case ConstantData.TextFlags.SED_TF_None:
        0 == (this.TextFlags & ConstantData.TextFlags.SED_TF_None) &&
          (
            this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_OneClick, !1),
            this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_None, !0),
            t = !0
          );
        break;
      case 0:
        (
          this.TextFlags & ConstantData.TextFlags.SED_TF_None ||
          this.TextFlags & ConstantData.TextFlags.SED_TF_OneClick
        ) &&
          (
            this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_OneClick, !1),
            this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_None, !1),
            t = !0
          )
    }
    switch (e.PositionFlag) {
      case ConstantData.TextFlags.SED_TF_AttachA:
        0 == (this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA) &&
          (
            this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_AttachA, !0),
            this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_AttachB, !1),
            t = !0
          );
        break;
      case ConstantData.TextFlags.SED_TF_AttachB:
        0 == (this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB) &&
          (
            this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_AttachB, !0),
            this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_AttachA, !1),
            t = !0
          );
        break;
      case 0:
        0 == (this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB) &&
          0 == (this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA) ||
          (
            this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_AttachB, !1),
            this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_AttachA, !1),
            t = !0
          )
    }
    return !0 === e.CRFlag ? 0 == (this.TextFlags & ConstantData.TextFlags.SED_TF_FormCR) &&
      (
        this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_FormCR, !0),
        t = !0
      ) : !1 === e.CRFlag &&
      this.TextFlags & ConstantData.TextFlags.SED_TF_FormCR &&
    (
      this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_FormCR, !1),
      t = !0
    ),
      !1 === e.AllowSpell ? 0 == (this.TextFlags & ConstantData.TextFlags.SED_TF_NoSpell) &&
        (
          this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_NoSpell, !0),
          t = !0
        ) : !0 === e.AllowSpell &&
        this.TextFlags & ConstantData.TextFlags.SED_TF_NoSpell &&
      (
        this.TextFlags = Utils2.SetFlag(this.TextFlags, ConstantData.TextFlags.SED_TF_NoSpell, !1),
        t = !0
      ),
      t
  }

  SetShapeConnectionPoints(e, t, a) {
    return !1
  }

  GetClosestConnectPoint(e) {
    return !1
  }

  ScaleEndPoints() {
    this.polylist &&
      this.StartPoint &&
      this.EndPoint &&
      // ListManager.PolyLine.prototype.ScaleEndPoints.call(this)
      this.PolyLine_ScaleEndPoints()
  }

  PolyLine_ScaleEndPoints() {

    console.log('ListManager.PolyLine.prototype.ScaleEndPoints');

    "use strict";
    var e, t, a, r, i = {
      x: 0,
      y: 0
    };
    e = this.Frame.width / this.polylist.dim.x,
      t = this.Frame.height / this.polylist.dim.y,
      1 === e && 1 === t || (i.x = this.Frame.x + this.Frame.width / 2,
        i.y = this.Frame.y + this.Frame.height / 2,
        a = i.x - this.StartPoint.x,
        this.StartPoint.x = i.x - a * e,
        r = i.y - this.StartPoint.y,
        this.StartPoint.y = i.y - r * t,
        a = i.x - this.EndPoint.x,
        this.EndPoint.x = i.x - a * e,
        r = i.y - this.EndPoint.y,
        this.EndPoint.y = i.y - r * t)
  }


  ChangeLineThickness(e) {
    this.UpdateFrame(null)
  }

  ChangeEffect() {
    this.UpdateFrame(null)
  }

  ChangeTextAttributes(e, t, a, r, i, n, o, s) {
    (e || t || a || r || s) &&
      (
        this.GetTable(!0) ? GlobalData.optManager.Table_ChangeTextAttributes(this, e, t, i, r, n, null, !1, o, s) : GlobalData.optManager.ChangeObjectTextAttributes(this.BlockID, e, t, i, r, n, o, s)
      )
  }

  SetObjectStyle(e) {
    var t = GlobalData.optManager.ApplyColorFilter(e, this, this.StyleRecord, this.colorfilter),
      a = this.StyleRecord.Line.Thickness;
    return this.GetTable(!1) ? GlobalData.optManager.Table_ApplyProperties(this, t, e, !1) : t.StyleRecord &&
      t.StyleRecord.Fill &&
      t.StyleRecord.Fill.Paint &&
      t.StyleRecord.Fill.Paint.Color &&
      void 0 === t.StyleRecord.Name &&
      void 0 === t.StyleRecord.Fill.Paint.FillType &&
      (
        this.StyleRecord.Fill.Paint.FillType === ConstantData.FillTypes.SDFILL_GRADIENT ? this.StyleRecord.Fill.Paint.Color.toUpperCase() === t.StyleRecord.Fill.Paint.Color.toUpperCase() &&
          (
            t.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID
          ) : t.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID
      ),
      GlobalData.optManager.ApplyProperties(t, this),
      t.StyleRecord &&
      (
        t.StyleRecord.Line &&
        t.StyleRecord.Line.Thickness &&
        this.ChangeLineThickness(a),
        t.StyleRecord.OutsideEffect &&
        this.ChangeEffect()
      ),
      t
  }

  InsertNewTable(e, t, a) {
    return !1
  }

  GetTextDefault(e) {
    if (
      e &&
      (
        $.extend(!0, e, new ParagraphFormat()/*Basic.Text.ParagraphFormat*/),
        e.bullet = 'none',
        e.spacing = 0,
        e.just = 'center',
        e.vjust = 'middle',
        this.TextAlign
      )
    ) {
      var t = this.TextAlign.indexOf('-');
      t >= 0 ? (
        e.vjust = this.TextAlign.slice(0, t),
        e.just = this.TextAlign.slice(t + 1, this.TextAlign.length)
      ) : e.just = this.TextAlign
    }
    var a = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      r = $.extend(!0, {
      }, this.StyleRecord.Text);
    return r.FontId = -1,// GlobalData.optManager.GetFontIdByName(a.def.lf.fontName),
      r.FontName = a.def.lf.fontName,
      r
  }

  GetTextParams(e) {
    var t = {};
    return t.trect = this.trect,
      t.sizedim = this.sizedim,
      t.tsizedim = {},
      t.tsizedim.height = this.sizedim.height - (this.Frame.height - this.trect.height),
      t.tsizedim.width = this.sizedim.width - (this.Frame.width - this.trect.width),
      t
  }

  GetListOfEnclosedObjects(e) {
    return []
  }

  InterceptMoveOperation(e) {
    return !1
  }

  SetupInterceptMove(e) {
    return !1
  }

  IsSelected() {
    //'use strict';
    var e = this.BlockID,
      t = (GlobalData.optManager.theSelectedListBlockID).Data;
    return $.inArray(e, t) >= 0
  }

  RemoveDimensionLines(e) {
    //'use strict';
    if (null != e) {
      var t = 0,
        a = 0,
        r = null,
        i = [
          ConstantData.SVGElementClass.DIMENSIONLINE,
          ConstantData.SVGElementClass.DIMENSIONTEXT,
          ConstantData.SVGElementClass.AREADIMENSIONLINE,
          ConstantData.SVGElementClass.DIMENSIONTEXTNOEDIT
        ];
      for (t = 0; t < i.length; t++) for (r = e.GetElementListWithID(i[t]), a = 0; a < r.length; a++) e.RemoveElement(r[a])
    }
  }

  // Double remove the coordinate lines when do adjust the line
  RemoveCoordinateLines(e) {
    // //'use strict';
    if (null != e) {
      var t = 0,
        a = 0,
        r = null,
        i = [
          // ConstantData.SVGElementClass.DIMENSIONLINE,
          // ConstantData.SVGElementClass.DIMENSIONTEXT,
          // ConstantData.SVGElementClass.AREADIMENSIONLINE,
          // ConstantData.SVGElementClass.DIMENSIONTEXTNOEDIT
          ConstantData.SVGElementClass.CoordinateLine,
        ];
      for (t = 0; t < i.length; t++) for (r = e.GetElementListWithID(i[t]), a = 0; a < r.length; a++) e.RemoveElement(r[a])
    }
  }

  SetDimensionLinesVisibility(e, t) {
    //'use strict';
    function a(e, a, r) {
      var i,
        n = e.GetElementListWithID(a),
        o = n.length;
      for (i = 0; i < o; i++) n[i].SetVisible(t)
    }

    var check = this.Dimensions == ConstantData.DimensionFlags.SED_DF_Always || this.Dimensions == ConstantData.DimensionFlags.SED_DF_Select;
    null != e &&
      (
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select
        // check
      ) &&
      (
        a(e, ConstantData.SVGElementClass.DIMENSIONLINE),
        a(e, ConstantData.SVGElementClass.DIMENSIONTEXT),
        a(e, ConstantData.SVGElementClass.DIMENSIONTEXTNOEDIT)
      )
  }

  NeedsAddLineThicknessToDimension(e) {
    //'use strict';
    return !1
  }

  // GetLengthInRulerUnits(e, t) {

  //   var a = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
  //     r = '',
  //     i = 0,
  //     n = 0,
  //     o = 0,
  //     s = 0,
  //     l = 0,
  //     S = 0,
  //     c = 0,
  //     u = '',
  //     p = 1,
  //     d = Math.pow(10, GlobalData.docHandler.rulerSettings.dp);
  //   if (
  //     t &&
  //     (
  //       t *= 100,
  //       GlobalData.docHandler.rulerSettings.useInches ||
  //       (t /= ConstantData.Defines.MetricConv),
  //       e -= t
  //     ),
  //     GlobalData.docHandler.rulerSettings.showpixels
  //   ) return r = Math.round(e);
  //   if (
  //     GlobalData.docHandler.rulerSettings.useInches &&
  //     GlobalData.docHandler.rulerSettings.units == ConstantData.RulerUnits.SED_Feet
  //   ) {
  //     if (
  //       (s = this.GetLengthInUnits(e, !0)) < 0 &&
  //       (p = - 1, s = - s),
  //       o = (n = 12 * (s - (i = Math.floor(s / 1)))) - (l = Math.floor(n / 1)),
  //       n = l,
  //       12 == Number(n).toFixed() &&
  //       (n = 0, i++),
  //       this.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches &&
  //       (n += 12 * i, i = 0),
  //       this.Dimensions,
  //       ConstantData.DimensionFlags.SED_DF_ShowFractionalInches,
  //       o > 0 &&
  //       (
  //         S = o / (c = this.GetFractionStringGranularity(a)),
  //         (S = Math.round(S)) >= 1 / c &&
  //         (S = 0, 12 == ++n && (i++, n = 0)),
  //         S > 0
  //       )
  //     ) {
  //       for (; S % 2 == 0;) S /= 2,
  //         c *= 2;
  //       u = S + '/' + Math.floor(1 / c / 1)
  //     }
  //     0 !== i &&
  //       (r = (i *= p) + '\''),
  //       (n > 0 || 0 === u.length) &&
  //       (r += 0 !== i ? ' ' + Number(n).toFixed() : Number(n).toFixed()),
  //       u.length > 0 &&
  //       (r += 0 !== i || 0 !== n ? ' ' + u : u),
  //       r += '"'
  //   } else GlobalData.docHandler.rulerSettings.units == ConstantData.RulerUnits.SED_Inches ? (s = this.GetLengthInUnits(e), r = Math.round(s * d) / d) : (
  //     s = this.GetLengthInUnits(e),
  //     GlobalData.docHandler.rulerSettings.units == ConstantData.RulerUnits.SED_M ||
  //       GlobalData.docHandler.rulerSettings.units == ConstantData.RulerUnits.SED_Cm ? r = Math.round(s * d) / d : GlobalData.docHandler.rulerSettings.units == ConstantData.RulerUnits.SED_Mm &&
  //     (r = Math.round(s))
  //   );
  //   return r
  // }





  GetLengthInRulerUnits(length: number, offset?: number): string {
    const sessionBlock = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
    let result = '';
    let feet = 0;
    let inches = 0;
    let fractionalInches = 0;
    let numerator = 0;
    let denominator = 0;
    let fraction = 0;
    let sign = 1;
    const decimalPlaces = Math.pow(10, GlobalData.docHandler.rulerSettings.dp);

    if (offset) {
      offset *= 100;
      if (!GlobalData.docHandler.rulerSettings.useInches) {
        offset /= ConstantData.Defines.MetricConv;
      }
      length -= offset;
    }

    if (GlobalData.docHandler.rulerSettings.showpixels) {
      return result = Math.round(length).toString();
    }

    if (GlobalData.docHandler.rulerSettings.useInches && GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Feet) {
      let totalInches = this.GetLengthInUnits(length, true);
      if (totalInches < 0) {
        sign = -1;
        totalInches = -totalInches;
      }
      feet = Math.floor(totalInches / 12);
      inches = Math.floor(totalInches % 12);
      fractionalInches = totalInches - (feet * 12 + inches);

      if (this.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches) {
        inches += feet * 12;
        feet = 0;
      }

      if (fractionalInches > 0) {
        denominator = this.GetFractionStringGranularity(sessionBlock);
        numerator = Math.round(fractionalInches / denominator);
        if (numerator >= 1 / denominator) {
          numerator = 0;
          if (++inches === 12) {
            inches = 0;
            feet++;
          }
        }
        if (numerator > 0) {
          while (numerator % 2 === 0) {
            numerator /= 2;
            denominator *= 2;
          }
          fraction = `${numerator}/${Math.floor(1 / denominator)}`;
        }
      }

      if (feet !== 0) {
        result = `${feet * sign}'`;
      }
      if (inches > 0 || fraction.length === 0) {
        result += `${feet !== 0 ? ' ' : ''}${inches}`;
      }
      if (fraction.length > 0) {
        result += `${feet !== 0 || inches !== 0 ? ' ' : ''}${fraction}`;
      }
      result += '"';
    } else if (GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Inches) {
      const inches = this.GetLengthInUnits(length);
      result = (Math.round(inches * decimalPlaces) / decimalPlaces).toString();
    } else {
      const units = this.GetLengthInUnits(length);
      if (GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_M || GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Cm) {
        result = (Math.round(units * decimalPlaces) / decimalPlaces).toString();
      } else if (GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Mm) {
        result = Math.round(units).toString();
      }
    }

    return result;
  }























  // GetDimensionTextForPoints(e, t) {
  //   // //'use strict';
  //   var a,
  //     r,
  //     i,
  //     n = [];
  //   return a = 360 - Utils1.CalcAngleFromPoints(e, t),
  //     r = 2 * Math.PI * (a / 360),
  //     n.push(new Point(e.x, e.y)),
  //     n.push(new Point(t.x, t.y)),
  //     GlobalData.optManager.RotatePointsAboutCenter(this.Frame, - r, n),
  //     i = Math.abs(n[0].x - n[1].x),
  //     this.GetLengthInRulerUnits(i)
  // }



  GetDimensionTextForPoints(startPoint, endPoint) {
    // //'use strict';
    // e startPoint
    // t endPoint
    const startAngle = 360 - Utils1.CalcAngleFromPoints(startPoint, endPoint);
    const radians = 2 * Math.PI * (startAngle / 360);
    const points = [new Point(startPoint.x, startPoint.y), new Point(endPoint.x, endPoint.y)];

    Utils3.RotatePointsAboutCenter(this.Frame, -radians, points);

    const distance = Math.abs(points[0].x - points[1].x);
    return this.GetLengthInRulerUnits(distance);
  }


  UpdateDimensionFromTextObj(e) {
  }

  UpdateDimensionFromText(e, t, a) {
  }

  MaintainProportions(e, t) {
    return null
  }

  CanUseRFlags() {
    return !0
  }

  UpdateDimensionsFromTextForHookedObject(e, t, a) {
    //'use strict';
    var r,
      i,
      n,
      o,
      s,
      l = 0,
      S = [],
      c = [],
      u = [],
      p = 0,
      d = [];
    if (
      r = a.segment,
      GlobalData.optManager.ShowSVGSelectionState(this.BlockID, !1),
      (i = this.GetDimensionLengthFromString(t, r)) <= 0
    ) return GlobalData.optManager.AddToDirtyList(this.BlockID),
      void GlobalData.optManager.RenderDirtySVGObjects();
    if (
      n = GlobalData.optManager.GetObjectPtr(a.hookedObjectInfo.hookedObjID, !0)
    ) {
      for (
        s = n.hooks[0].connect,
        d = this.GetPerimPts(this.BlockID, [
          s
        ], n.hooks[0].hookpt, !1, - 1, n.BlockID),
        S.push(
          new Point(a.hookedObjectInfo.start.x, a.hookedObjectInfo.start.y)
        ),
        S.push(
          new Point(a.hookedObjectInfo.end.x, a.hookedObjectInfo.end.y)
        ),
        o = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(S[0], S[1]),
        Utils3.RotatePointsAboutCenter(this.Frame, - o, S),
        p = i - Math.abs(S[1].x - S[0].x),
        1 === a.hookedObjectInfo.side &&
        (p = - p),
        c = this.GetDimensionPoints(),
        l = 0;
        l < c.length;
        l++
      ) c[l].x += this.inside.x,
        c[l].y += this.inside.y;
      u = [
        c[r - 1],
        c[r],
        d[0]
      ],
        Utils3.RotatePointsAboutCenter(this.Frame, - o, u),
        p > 0 &&
          u[2].x + p - n.Frame.width / 2 > u[1].x ? u[2].x = u[1].x - n.Frame.width / 2 - 5 : p < 0 &&
            u[2].x + p - n.Frame.width / 2 < u[0].x ? u[2].x = u[0].x + n.Frame.width / 2 + 5 : u[2].x += p,
        Utils3.RotatePointsAboutCenter(this.Frame, o, u);
      var D = Utils1.DeepCopy(this.Frame);
      Utils2.InflateRect(D, 3, 3);
      var g = Utils2.pointInRect(D, d[0]);
      (
        d = this.GetTargetPoints(
          d[0],
          ConstantData.HookFlags.SED_LC_NoSnaps | ConstantData.HookFlags.SED_LC_HookNoExtra | ConstantData.HookFlags.SED_LC_ShapeOnLine,
          null
        )
      ) &&
        g ? (
        GlobalData.optManager.UpdateHook(n.BlockID, 0, this.BlockID, n.hooks[0].hookpt, d[0]),
        GlobalData.optManager.SetLinkFlag(n.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
        GlobalData.optManager.SetLinkFlag(this.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
        GlobalData.optManager.UpdateLinks(),
        GlobalData.optManager.UpdateHook(n.BlockID, 0, this.BlockID, n.hooks[0].hookpt, d[0])
      ) : setTimeout(
        (
          function () {
            Utils2.Alert(Resources.Strings.CouldNotSetDimension)
          }
        ),
        250
      )
    }
  }

  DimensionEditCallback(e, t, a, r) {
    //'use strict';
    var i = [],
      n = {},
      o = {},
      s = r,
      l = 0,
      S = !1;
    switch (e) {
      case 'edit':
        break;
      case 'keyend':
        if (
          t.keyCode == Resources.Keys.Tab ||
          t.keyCode == Resources.Keys.Enter
        ) return GlobalData.optManager.CloseEdit(),
          !0;
        break;
      case 'charfilter':
        if (a.userData && a.userData.angleChange) {
          if (- 1 === t.search(/(\d|\.|\-)/)) return !1
        } else if (
          GlobalData.docHandler.rulerSettings.useInches &&
          GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Feet
        ) {
          if (- 1 === t.search(/(\d|\.|\/|'|"| )/)) return !1
        } else if (- 1 === t.search(/(\d|\.)/)) return !1;
        break;
      case 'activate':
        if (0 === a.svgObj.SDGObj.svgObj.trans.rotation) break;
        i = s.GetDimensionPoints(),
          S = (
            l = Utils1.CalcAngleFromPoints(i[a.userData.segment - 1], i[a.userData.segment])
          ) <= 45 ||
          l >= 315 ||
          l >= 135 &&
          l <= 225;
        var c = {};
        if (
          Utils2.GetPolyRect(c, a.userData.textFramePts),
          n = a.GetBBox(),
          o.y = c.y + c.height / 2 - n.height / 2,
          !a.userData.hookedObjectInfo ||
          S
        ) o.x = c.x + c.width / 2 - n.width / 2;
        else {
          var u = a.userData.hookedObjectInfo.start.x + (
            a.userData.hookedObjectInfo.end.x - a.userData.hookedObjectInfo.start.x
          ) / 2;
          o.x = c.x > u ? c.x : c.x - n.width
        }
        a.SetPos(o.x, o.y),
          a.SetRotation(0, o.x, o.y);
        break;
      case 'deactivate':
        if (GlobalData.optManager.bInDimensionEdit = !1, Collab.AllowMessage()) {
          Collab.BeginSecondaryEdit();
          r = Utils1.DeepCopy(a.GetUserData());
          var p = {
            BlockID: s.BlockID,
            text: a.GetText(),
            userData: r
          };
          GlobalData.optManager.GetObjectPtr(s.BlockID, !0),
            Collab.BuildMessage(
              ConstantData.CollabMessages.UpdateDimensionFromTextObj,
              p,
              !1,
              !1
            )
        }
        s.UpdateDimensionFromTextObj(a)
    }
  }

  UpdateDimensions(e, t, a) {
  }

  GetDimensions() {
    var e = {};
    return e.x = this.Frame.width,
      e.y = this.Frame.height,
      e
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




  // CreateDimension(e, t, a, r, i, n, o, s, l, S, c) {
  //   //'use strict';
  //   var u,
  //     p = 0,
  //     d = 0,
  //     D = [],
  //     g = {
  //       left: - 1,
  //       top: - 1,
  //       right: - 1,
  //       bottom: - 1
  //     },
  //     h = [],
  //     m = [],
  //     C = [],
  //     y = [],
  //     f = {},
  //     L = {
  //       x: 0,
  //       y: 0,
  //       width: 0,
  //       height: 0
  //     },
  //     I = {},
  //     T = (
  //       L = new Rectangle,
  //       this.flags & ConstantData.ObjFlags.SEDO_Lock
  //     ),
  //     b = [];
  //   if (e) {
  //     if (
  //       f = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.TEXT),
  //       e.AddElement(f),
  //       f.SetRenderingEnabled(!1),
  //       f.SetText(i),
  //       Utils2.HasFlag(
  //         this.Dimensions,
  //         ConstantData.DimensionFlags.SED_DF_Select
  //       ) &&
  //       f.ExcludeFromExport(!0),
  //       I.segment = s,
  //       c &&
  //       (I.hookedObjectInfo = c),
  //       f.SetUserData(I),
  //       !(this.LineType === ConstantData.LineType.LINE) &&
  //         (
  //           a ||
  //           this.Dimensions & ConstantData.DimensionFlags.SED_DF_Total ||
  //           this.Dimensions & ConstantData.DimensionFlags.SED_DF_EndPts ||
  //           this.NoGrow()
  //         ) ? f.SetID(ConstantData.SVGElementClass.DIMENSIONTEXTNOEDIT) : (
  //         f.SetID(ConstantData.SVGElementClass.DIMENSIONTEXT),
  //         f.SetEditCallback(this.DimensionEditCallback, this)
  //       ),
  //       f.SetFormat(GlobalData.optManager.theContentHeader.DimensionFontStyle),
  //       f.SetConstraints(GlobalData.optManager.theContentHeader.MaxWorkDim.x, 0, 0),
  //       f.SetRenderingEnabled(!0),
  //       a
  //     ) {
  //       if (
  //         this.GetDimensionAreaTextInfo(f, r, D, h, m, C, y),
  //         D &&
  //         D.length > 0 &&
  //         (Utils2.GetPolyRect(L, D), L.width >= this.Frame.width)
  //       ) return void e.RemoveElement(f);
  //       I.textFramePts = D,
  //         this.CreateDimensionLineArrowHead(e, a, h, g),
  //         this.CreateDimensionLineArrowHead(e, a, m, g),
  //         this.CreateDimensionLineArrowHead(e, a, C, g),
  //         this.CreateDimensionLineArrowHead(e, a, y, g)
  //     } else {
  //       if (
  //         this.GetDimensionTextInfo(n, o, r, f, s, D, h, m, l),
  //         I.textFramePts = Utils1.DeepCopy(D),
  //         S &&
  //         (
  //           p = o.x - n.x,
  //           d = o.y - n.y,
  //           Utils2.sqrt(p * p + d * d) < f.geometryBBox.width
  //         )
  //       ) return void e.RemoveElement(f);
  //       this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff &&
  //         this.CanUseStandOffDimensionLines() &&
  //         !l ? (
  //         this.CreateDimensionLineSegment(t, a, h, g),
  //         this.CreateDimensionLineSegment(t, a, m, g)
  //       ) : (
  //         this.CreateDimensionLineArrowHead(e, a, h, g, I),
  //         this.CreateDimensionLineArrowHead(e, a, m, g, I)
  //       )
  //     }
  //     var M = this.RotationAngle + r;
  //     if (
  //       M >= 360 &&
  //       (M -= 360),
  //       b = [
  //         new Point(D[0].x, D[0].y)
  //       ],
  //       M >= 89 &&
  //       M < 270
  //     ) {
  //       var P = 360 - r,
  //         R = 2 * Math.PI * (P / 360);
  //       GlobalData.optManager.RotatePointsAboutCenter(this.Frame, - R, D),
  //         L = {},
  //         Utils2.GetPolyRect(L, D);
  //       var A = {
  //         x: L.x + L.width,
  //         y: L.y + L.height
  //       };
  //       (b = []).push(new Point(A.x, A.y)),
  //         GlobalData.optManager.RotatePointsAboutCenter(this.Frame, R, b),
  //         (r += 180) > 360 &&
  //         (r -= 360)
  //     }
  //     f.SetPos(b[0].x, b[0].y);
  //     try {
  //       f.SetRotation(r, b[0].x, b[0].y)
  //     } catch (e) {
  //       throw e;
  //     }
  //     if (u = f.svgObj.SDGObj.DOMElement(), !a && !T && !this.NoGrow()) {
  //       var _ = Hammer(u);
  //       _.on('tap', DefaultEvt.Evt_DimensionTextTapFactory(this, I, !1)),
  //         _.on('doubletap', DefaultEvt.Evt_DimensionTextTapFactory(this, I, !0)),
  //         f.SetEventProxy(_)
  //     }
  //   }
  // }







  CreateDimension(container, pathCreator, isAreaDimension, angle, text, startPoint, endPoint, segmentIndex, isPolygon, isStandoff, hookedObjectInfo?) {

    //e, t, a, r, i, n, o, s, l, S, c

    // e= container
    // t= pathCreator
    // a= isAreaDimension
    // r= angle
    // i= text
    // n= startPoint
    // o= endPoint
    // s= segmentIndex
    // l= isPolygon
    // S= isStandoff
    // c= hookedObjectInfo

    console.log('CreateDimension.container=', container);
    console.log('CreateDimension.pathCreator=', pathCreator);
    console.log('CreateDimension.isAreaDimension=', isAreaDimension);
    console.log('CreateDimension.angle=', angle);
    console.log('CreateDimension.text=', text);
    console.log('CreateDimension.startPoint=', startPoint);
    console.log('CreateDimension.endPoint=', endPoint);
    console.log('CreateDimension.segmentIndex=', segmentIndex);
    console.log('CreateDimension.isPolygon=', isPolygon);
    console.log('CreateDimension.isStandoff=', isStandoff);
    console.log('CreateDimension.hookedObjectInfo=', hookedObjectInfo);

    let textShape, textFramePoints = [], leftArrowPoints = [], rightArrowPoints = [], topArrowPoints = [], bottomArrowPoints = [];
    let boundingBox = new Rectangle(), textFrameRect = new Rectangle(), dimensionBounds = { left: -1, top: -1, right: -1, bottom: -1 };
    let isLocked = this.flags & ConstantData.ObjFlags.SEDO_Lock;
    let rotationAngle = this.RotationAngle + angle;
    let textFrameData = { segment: segmentIndex, hookedObjectInfo: null, textFramePts: [] };

    if (hookedObjectInfo) {
      textFrameData.hookedObjectInfo = hookedObjectInfo;
    }

    if (container) {
      textShape = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.TEXT);
      container.AddElement(textShape);
      textShape.SetRenderingEnabled(false);
      textShape.SetText(text);
      if (Utils2.HasFlag(this.Dimensions, ConstantData.DimensionFlags.SED_DF_Select)) {
        textShape.ExcludeFromExport(true);
      }
      textShape.SetUserData(textFrameData);

      if (this.LineType !== ConstantData.LineType.LINE && (isAreaDimension || this.Dimensions & ConstantData.DimensionFlags.SED_DF_Total || this.Dimensions & ConstantData.DimensionFlags.SED_DF_EndPts || this.NoGrow())) {
        textShape.SetID(ConstantData.SVGElementClass.DIMENSIONTEXTNOEDIT);
      } else {
        textShape.SetID(ConstantData.SVGElementClass.DIMENSIONTEXT);
        textShape.SetEditCallback(this.DimensionEditCallback, this);
      }

      textShape.SetFormat(GlobalData.optManager.theContentHeader.DimensionFontStyle);
      textShape.SetConstraints(GlobalData.optManager.theContentHeader.MaxWorkDim.x, 0, 0);
      textShape.SetRenderingEnabled(true);

      if (isAreaDimension) {
        this.GetDimensionAreaTextInfo(textShape, angle, textFramePoints, leftArrowPoints, rightArrowPoints, topArrowPoints, bottomArrowPoints);
        if (textFramePoints.length > 0 && (Utils2.GetPolyRect(textFrameRect, textFramePoints), textFrameRect.width >= this.Frame.width)) {
          container.RemoveElement(textShape);
          return;
        }
        textFrameData.textFramePts = textFramePoints;
        this.CreateDimensionLineArrowHead(container, pathCreator, leftArrowPoints, dimensionBounds);
        this.CreateDimensionLineArrowHead(container, pathCreator, rightArrowPoints, dimensionBounds);
        this.CreateDimensionLineArrowHead(container, pathCreator, topArrowPoints, dimensionBounds);
        this.CreateDimensionLineArrowHead(container, pathCreator, bottomArrowPoints, dimensionBounds);
      } else {
        this.GetDimensionTextInfo(startPoint, endPoint, angle, textShape, segmentIndex, textFramePoints, leftArrowPoints, rightArrowPoints, isStandoff);
        textFrameData.textFramePts = Utils1.DeepCopy(textFramePoints);
        if (isPolygon && (Utils2.sqrt((endPoint.x - startPoint.x) ** 2 + (endPoint.y - startPoint.y) ** 2) < textShape.geometryBBox.width)) {
          container.RemoveElement(textShape);
          return;
        }
        if (this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff && this.CanUseStandOffDimensionLines() && !isStandoff) {
          this.CreateDimensionLineSegment(pathCreator, isAreaDimension, leftArrowPoints, dimensionBounds);
          this.CreateDimensionLineSegment(pathCreator, isAreaDimension, rightArrowPoints, dimensionBounds);
        } else {
          this.CreateDimensionLineArrowHead(container, pathCreator, leftArrowPoints, dimensionBounds, textFrameData);
          this.CreateDimensionLineArrowHead(container, pathCreator, rightArrowPoints, dimensionBounds, textFrameData);
        }
      }

      if (rotationAngle >= 360) {
        rotationAngle -= 360;
      }

      let textPosition = [new Point(textFramePoints[0].x, textFramePoints[0].y)];
      if (rotationAngle >= 89 && rotationAngle < 270) {
        let reverseAngle = 360 - angle;
        let reverseRadians = 2 * Math.PI * (reverseAngle / 360);
        Utils3.RotatePointsAboutCenter(this.Frame, -reverseRadians, textFramePoints);
        textFrameRect = { x: 0, y: 0, width: 0, height: 0 };
        Utils2.GetPolyRect(textFrameRect, textFramePoints);
        let oppositeCorner = { x: textFrameRect.x + textFrameRect.width, y: textFrameRect.y + textFrameRect.height };
        textPosition = [new Point(oppositeCorner.x, oppositeCorner.y)];
        Utils3.RotatePointsAboutCenter(this.Frame, reverseRadians, textPosition);
        if ((angle += 180) > 360) {
          angle -= 360;
        }
      }

      textShape.SetPos(textPosition[0].x, textPosition[0].y);
      try {
        textShape.SetRotation(angle, textPosition[0].x, textPosition[0].y);
      } catch (error) {
        throw error;
      }

      if (!isAreaDimension && !isLocked && !this.NoGrow()) {
        let hammerInstance = Hammer(textShape.svgObj.SDGObj.DOMElement());
        hammerInstance.on('tap', DefaultEvt.Evt_DimensionTextTapFactory(this, textFrameData, false));
        hammerInstance.on('doubletap', DefaultEvt.Evt_DimensionTextTapFactory(this, textFrameData, true));
        textShape.SetEventProxy(hammerInstance);
      }
    }
  }






  CreateCoordinateLine(container, pathCreator, isAreaDimension, angle, text, startPoint, endPoint, segmentIndex, isPolygon, isStandoff, hookedObjectInfo?) {


    //e, t, a, r, i, n, o, s, l, S, c

    // e= container
    // t= pathCreator
    // a= isAreaDimension
    // r= angle
    // i= text
    // n= startPoint
    // o= endPoint
    // s= segmentIndex
    // l= isPolygon
    // S= isStandoff
    // c= hookedObjectInfo

    console.log('=== wall CreateCoordinateLine.startPoint/endPoint=', startPoint, endPoint);

    // console.log('CreateCoordinateLine.container=', container);
    // console.log('CreateCoordinateLine.pathCreator=', pathCreator);
    // console.log('CreateCoordinateLine.isAreaDimension=', isAreaDimension);
    // console.log('CreateCoordinateLine.angle=', angle);
    // console.log('CreateCoordinateLine.text=', text);
    // console.log('CreateCoordinateLine.startPoint=', startPoint);
    // console.log('CreateCoordinateLine.endPoint=', endPoint);
    // console.log('CreateCoordinateLine.segmentIndex=', segmentIndex);
    // console.log('CreateCoordinateLine.isPolygon=', isPolygon);
    // console.log('CreateCoordinateLine.isStandoff=', isStandoff);
    // console.log('CreateCoordinateLine.hookedObjectInfo=', hookedObjectInfo);

    let textShape, textFramePoints = [], leftArrowPoints = [], rightArrowPoints = [], topArrowPoints = [], bottomArrowPoints = [];
    let boundingBox = new Rectangle(), textFrameRect = new Rectangle(), dimensionBounds = { left: -1, top: -1, right: -1, bottom: -1 };
    let isLocked = this.flags & ConstantData.ObjFlags.SEDO_Lock;
    let rotationAngle = this.RotationAngle + angle;
    let textFrameData = { segment: segmentIndex, hookedObjectInfo: null, textFramePts: [] };

    if (hookedObjectInfo) {
      textFrameData.hookedObjectInfo = hookedObjectInfo;
    }

    // Double
    if (!container) {
      return;
    }

    textShape = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.TEXT);
    container.AddElement(textShape);
    textShape.SetRenderingEnabled(false);
    textShape.SetText(angle);

    const hasSelectFlag = Utils2.HasFlag(this.Dimensions, ConstantData.DimensionFlags.SED_DF_Select);

    if (hasSelectFlag) {
      textShape.ExcludeFromExport(true);
    }

    textShape.SetUserData(textFrameData);

    const isNotLine = this.LineType !== ConstantData.LineType.LINE;
    const isTotalEndPtsFlag = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Total || this.Dimensions & ConstantData.DimensionFlags.SED_DF_EndPts;

    if (isNotLine && (isAreaDimension || isTotalEndPtsFlag || this.NoGrow())) {
      textShape.SetID(ConstantData.SVGElementClass.DIMENSIONTEXTNOEDIT);
    } else {
      textShape.SetID(ConstantData.SVGElementClass.DIMENSIONTEXT);
      textShape.SetEditCallback(this.DimensionEditCallback, this);
    }

    textShape.SetFormat(GlobalData.optManager.theContentHeader.DimensionFontStyle);
    textShape.SetConstraints(GlobalData.optManager.theContentHeader.MaxWorkDim.x, 0, 0);
    textShape.SetRenderingEnabled(true);

    // debugger

    if (isAreaDimension) {

      this.GetDimensionAreaTextInfo(textShape, angle, textFramePoints, leftArrowPoints, rightArrowPoints, topArrowPoints, bottomArrowPoints);

      if (textFramePoints.length > 0 && (Utils2.GetPolyRect(textFrameRect, textFramePoints), textFrameRect.width >= this.Frame.width)) {
        container.RemoveElement(textShape);
        return;
      }

      textFrameData.textFramePts = textFramePoints;
      this.CreateDimensionLineArrowHead(container, pathCreator, leftArrowPoints, dimensionBounds);
      this.CreateDimensionLineArrowHead(container, pathCreator, rightArrowPoints, dimensionBounds);
      this.CreateDimensionLineArrowHead(container, pathCreator, topArrowPoints, dimensionBounds);
      this.CreateDimensionLineArrowHead(container, pathCreator, bottomArrowPoints, dimensionBounds);
    }
    else {

      //GetCoordinateTextInfo

      // this.GetDimensionTextInfo(startPoint, endPoint, angle, textShape, segmentIndex, textFramePoints, leftArrowPoints, rightArrowPoints, isStandoff);

      this.GetCoordinateTextInfo(startPoint, endPoint, angle, textShape, segmentIndex, textFramePoints, leftArrowPoints, rightArrowPoints, isStandoff);


      textFrameData.textFramePts = Utils1.DeepCopy(textFramePoints);

      const check2 = (Utils2.sqrt((endPoint.x - startPoint.x) ** 2 + (endPoint.y - startPoint.y) ** 2) < textShape.geometryBBox.width);

      if (isPolygon && check2) {
        container.RemoveElement(textShape);
        return;
      }

      const isStdOff = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff;
      const check3 = isStdOff && this.CanUseStandOffDimensionLines() && !isStandoff;

      if (check3) {

        console.log('=== wall CreateCoordinateLine.leftArrowPoints=', leftArrowPoints);
        console.log('=== wall CreateCoordinateLine.rightArrowPoints=', rightArrowPoints);

        this.CreateCoordinateLineSegment(pathCreator, isAreaDimension, leftArrowPoints, dimensionBounds);
        this.CreateCoordinateLineSegment(pathCreator, isAreaDimension, rightArrowPoints, dimensionBounds);

      } else {
        this.CreateDimensionLineArrowHead(container, pathCreator, leftArrowPoints, dimensionBounds, textFrameData);
        this.CreateDimensionLineArrowHead(container, pathCreator, rightArrowPoints, dimensionBounds, textFrameData);
      }


    }

    if (rotationAngle >= 360) {
      rotationAngle -= 360;
    }

    let textPosition = [new Point(textFramePoints[0].x, textFramePoints[0].y)];

    if (rotationAngle >= 89 && rotationAngle < 270) {
      let reverseAngle = 360 - angle;
      let reverseRadians = 2 * Math.PI * (reverseAngle / 360);
      Utils3.RotatePointsAboutCenter(this.Frame, -reverseRadians, textFramePoints);

      textFrameRect = { x: 0, y: 0, width: 0, height: 0 };
      Utils2.GetPolyRect(textFrameRect, textFramePoints);

      let oppositeCorner = { x: textFrameRect.x + textFrameRect.width, y: textFrameRect.y + textFrameRect.height };

      textPosition = [new Point(oppositeCorner.x, oppositeCorner.y)];

      Utils3.RotatePointsAboutCenter(this.Frame, reverseRadians, textPosition);

      if ((angle += 180) > 360) {
        angle -= 360;
      }
    }

    textShape.SetPos(textPosition[0].x, textPosition[0].y);

    try {
      textShape.SetRotation(angle, textPosition[0].x, textPosition[0].y);
    } catch (error) {
      throw error;
    }

    if (!isAreaDimension && !isLocked && !this.NoGrow()) {
      let hammerInstance = Hammer(textShape.svgObj.SDGObj.DOMElement());
      hammerInstance.on('tap', DefaultEvt.Evt_DimensionTextTapFactory(this, textFrameData, false));
      hammerInstance.on('doubletap', DefaultEvt.Evt_DimensionTextTapFactory(this, textFrameData, true));
      textShape.SetEventProxy(hammerInstance);
    }
  }




















  DrawDimensionAngle(e, t, a, r) {
    //'use strict';
    var i,
      n,
      o = {},
      s = {};
    if (o = this.GetDimensionAngleInfo(a, r)) {
      if (
        e.AddElement(o.text),
        o.text.SetRenderingEnabled(!1),
        s.angleChange = 1,
        s.segment = a,
        o.text.SetUserData(s),
        o.text.SetID(ConstantData.SVGElementClass.DIMENSIONTEXT),
        o.text.SetEditCallback(this.DimensionEditCallback, this),
        o.text.SetConstraints(GlobalData.optManager.theContentHeader.MaxWorkDim.x, 0, 0),
        o.text.SetRenderingEnabled(!0),
        o.text.SetPos(o.textRect.x, o.textRect.y),
        0 != this.RotationAngle &&
        o.text.SetRotation(- this.RotationAngle),
        (
          i = Utils2.GetDistanceBetween2Points(o.baseLinePts[1], o.targetLinePts[1])
        ) > (n = o.text.GetTextMinDimensions()).width
      ) {
        var l = o.text.svgObj.SDGObj.DOMElement(),
          S = Hammer(l);
        S.on('tap', DefaultEvt.Evt_DimensionTextTapFactory(this, s, !1)),
          S.on('doubletap', DefaultEvt.Evt_DimensionTextTapFactory(this, s, !0)),
          o.text.SetEventProxy(S)
      } else e.RemoveElement(o.text);
      i > n.width + 2 * ConstantData.LineAngleDimensionDefs.ANGLEDIMENSION_ARROWHEAD_SIZE &&
        (
          Utils2.InflateRect(o.textRect, 2, 2),
          this.DrawDimensionAngleArc(
            e,
            t,
            o.targetLinePts[0],
            o.targetLinePts[1],
            o.textRect,
            o.baseLinePts[1]
          ),
          this.DrawDimensionAngleArc(
            e,
            t,
            o.targetLinePts[0],
            o.targetLinePts[1],
            o.textRect,
            o.targetLinePts[1]
          )
        ),
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_InteriorAngles ||
        (
          t.MoveTo(o.baseLinePts[0].x, o.baseLinePts[0].y),
          t.LineTo(o.baseLinePts[1].x, o.baseLinePts[1].y)
        )
    }
  }

  UpdateLineAngleDimensionFromText(e, t, a) {
    console.log('== track UpdateDimensionsLines Shape.BaseDrawingObject-> UpdateLineAngleDimensionFromText')

    var r = 0;
    r = parseFloat(t),
      isNaN(r) ||
        r < - 360 ||
        r > 360 ? this.UpdateDimensionLines(e) : (r < 0 && (r += 360), this.SetSegmentAngle(e, a.segment, r))
  }

  SetSegmentAngle(e, t, a) {
  }

  DrawDimensionAngleArrowhead(e, t, a) {
    var r,
      i = [],
      n = {};
    r = a,
      i.push(new Point(r.x, r.y)),
      i.push(
        new Point(
          r.x - ConstantData.LineAngleDimensionDefs.ANGLEDIMENSION_ARROWHEAD_SIZE,
          r.y + ConstantData.LineAngleDimensionDefs.ANGLEDIMENSION_ARROWHEAD_WIDTH
        )
      ),
      i.push(
        new Point(
          r.x - ConstantData.LineAngleDimensionDefs.ANGLEDIMENSION_ARROWHEAD_SIZE,
          r.y - ConstantData.LineAngleDimensionDefs.ANGLEDIMENSION_ARROWHEAD_WIDTH
        )
      ),
      Utils3.RotatePointsAboutPoint(a, t, i),
      Utils2.GetPolyRect(n, i);
    var o = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.POLYGON);
    o.SetPoints(i),
      o.SetEventBehavior(Element.EventBehavior.ALL),
      o.SetID(ConstantData.SVGElementClass.DIMENSIONLINE),
      o.SetPos(0, 0),
      o.SetSize(n.width, n.height),
      o.SetFillColor(ConstantData.Defines.DimensionLineColor),
      e.AddElement(o)
  }

  GetPerpendicularAngle(e, t, a) {
    var r = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(e, t);
    return (r += a ? Math.PI / 2 : - Math.PI / 2) < 0 &&
      (r += 2 * Math.PI),
      r > 2 * Math.PI &&
      (r -= 2 * Math.PI),
      r
  }

  DrawDimensionAngleArc(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g = {},
      h = [],
      m = {},
      C = null,
      y = (new Rectangle(0, 0, 0, 0), 0),
      f = 0,
      L = 0,
      I = - 1;
    for (
      d = Utils2.GetDistanceBetween2Points(a, r),
      g.x = i.x + i.width / 2,
      g.y = i.y + i.height / 2,
      l = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(a, g),
      y = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(a, n),
      l > Math.PI &&
      0 == y &&
      (y = 2 * Math.PI),
      (y -= l) < 0 &&
      (y += 2 * Math.PI),
      D = y <= Math.PI,
      S = this.GetPerpendicularAngle(a, n, D),
      m = n,
      Utils3.RotatePointsAboutPoint(a, - S, [
        m
      ]),
      p = this.StyleRecord.Line.Thickness / 2,
      m.x -= p,
      Utils3.RotatePointsAboutPoint(a, S, [
        m
      ]),
      o = D ? m : g,
      s = D ? g : m,
      u = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(a, o),
      Utils3.RotatePointsAboutPoint(a, Math.PI / 2 - u, [
        o,
        s
      ]),
      h = GlobalData.optManager.ArcToPoly(ConstantData.Defines.NPOLYPTS, a, d, o.y, s.y, a.x, !1),
      Utils3.RotatePointsAboutPoint(a, - (Math.PI / 2 - u), [
        o,
        s
      ]),
      Utils3.RotatePointsAboutPoint(a, - (Math.PI / 2 - u), h),
      L = h.length,
      f = 0;
      f < L;
      f++
    ) if (I = D ? h.length - 1 - f : f, !Utils2.pointInRect(i, h[I])) {
      D ? h.splice(I) : h.splice(0, I - 1);
      break
    }
    for (L = h.length, f = 1; f < L; f++) t.MoveTo(h[f - 1].x, h[f - 1].y),
      t.LineTo(h[f].x, h[f].y);
    for (m = D ? h[0] : h[h.length - 1], L = h.length, f = 0; f < L; f++) if (
      I = D ? f : h.length - 1 - f,
      Utils2.GetDistanceBetween2Points(m, h[I]) > ConstantData.LineAngleDimensionDefs.ANGLEDIMENSION_ARROWHEAD_SIZE
    ) {
      C = h[I];
      break
    }
    C ||
      (C = h[I = D ? h.length - 1 : 0]),
      c = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(C, m),
      this.DrawDimensionAngleArrowhead(e, c, m)
  }

  GetDimensionAngleInfo(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s = null,
      l = '',
      S = new Rectangle(0, 0, 0, 0),
      c = [],
      u = [],
      p = [],
      d = 0,
      D = 0,
      g = 0,
      h = 0,
      m = - 1,
      C = !1;
    if (
      u.push(new Point(t[e - 1].x, t[e - 1].y)),
      u.push(new Point(t[e].x, t[e].y)),
      C = this.polylist ? this.polylist.closed : t.length > 2 &&
        t[0].x == t[t.length - 1].x &&
        t[0].y == t[t.length - 1].y,
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_InteriorAngles &&
      1 == e &&
      !C
    ) return null;
    if (
      this.polylist &&
      e >= 1 &&
      e < this.polylist.segs.length &&
      (
        m = e > 1 ? e - 1 : this.polylist.segs.length - 1,
        this.polylist.segs[e].LineType != ConstantData.LineType.LINE ||
        this.polylist.segs[m].LineType != ConstantData.LineType.LINE
      )
    ) return null;
    for (
      p.push(new Point(u[0].x, u[0].y)),
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_InteriorAngles ? 1 == e ? p.push(new Point(t[t.length - 2].x, t[t.length - 2].y)) : p.push(new Point(t[e - 2].x, t[e - 2].y)) : (
        n = Utils2.GetDistanceBetween2Points(u[0], u[1]),
        p.push(new Point(p[0].x + n, p[0].y))
      ),
      d = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(u[0], u[1]),
      (
        d -= r = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(p[0], p[1])
      ) < 0 &&
      (d += 2 * Math.PI),
      D = d / 2,
      (g = d) > Math.PI &&
      (g = 2 * Math.PI - g, (D += Math.PI) >= 2 * Math.PI && (D -= 2 * Math.PI), !0),
      (d += r) >= 2 * Math.PI &&
      (d -= 2 * Math.PI),
      (D += r) >= 2 * Math.PI &&
      (D -= 2 * Math.PI),
      c.push(new Point(u[0].x, u[0].y)),
      c.push(new Point(u[1].x, u[1].y)),
      Utils3.RotatePointsAboutPoint(u[0], - d, c),
      o = Math.min(
        Utils2.GetDistanceBetween2Points(u[0], u[1]),
        Utils2.GetDistanceBetween2Points(p[0], p[1])
      ),
      h = ConstantData.LineAngleDimensionDefs.ANGLEDIMENSION_PREFERRED_BISECTOR_LEN < o ? ConstantData.LineAngleDimensionDefs.ANGLEDIMENSION_PREFERRED_BISECTOR_LEN : o,
      c[1].x = c[0].x + h,
      Utils3.RotatePointsAboutPoint(u[0], D, c),
      i = Math.abs(g / (2 * Math.PI) * 360),
      l = (i = Math.round(i)).toString(),
      l += '°',
      (
        s = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.TEXT)
      ).SetFormat(GlobalData.optManager.theContentHeader.DimensionFontStyle),
      s.SetText(l),
      a = s.GetTextMinDimensions();
      h < o &&
      !(
        Math.tan(g / 2) * h >= a.width / 2 + ConstantData.LineAngleDimensionDefs.ANGLEDIMENSION_PREFERRED_ARROWSTEM_MINIMUM + ConstantData.LineAngleDimensionDefs.ANGLEDIMENSION_ARROWHEAD_SIZE
      );
    ) (
      h = h += ConstantData.LineAngleDimensionDefs.ANGLEDIMENSION_PREFERRED_BISECTOR_LEN
    ) >= o &&
      (h = o);
    return GlobalData.optManager.SetLineLength(u[0], u[1], h),
      GlobalData.optManager.SetLineLength(p[0], p[1], h),
      GlobalData.optManager.SetLineLength(c[0], c[1], h),
      S = Utils2.SetRect(0, 0, a.width, a.height),
      Utils2.OffsetRect(S, c[1].x, c[1].y),
      Utils2.OffsetRect(S, - a.width / 2, - a.height / 2),
    {
      text: s,
      textRect: S,
      baseLinePts: p,
      targetLinePts: u
    }
  }

  GetPointsForDimension(e, t, a, r, i, n) {
    //'use strict';
    var o,
      s = [],
      l = [],
      S = [],
      c = new Rectangle(),
      u = new Rectangle(),
      p = new Rectangle();
    return (
      o = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.TEXT)
    ).SetText(t),
      o.SetFormat(GlobalData.optManager.theContentHeader.DimensionFontStyle),
      o.SetConstraints(GlobalData.optManager.theContentHeader.MaxWorkDim.x, 0, 0),
      this.GetDimensionTextInfo(a, r, e, o, i, s, l, S, n),
      o = null,
      Utils2.GetPolyRect(c, l),
      Utils2.GetPolyRect(u, S),
      Utils2.GetPolyRect(p, s),
    {
      left: c,
      textFrame: p,
      right: u
    }
  }

  GetAreaDimension(e) {
    //'use strict';
    return this.Dimensions & ConstantData.DimensionFlags.SED_DF_Area ? this.GetAreaDimensionText(e) : this.Dimensions & ConstantData.DimensionFlags.SED_DF_RectWithAndHeight ? this.GetAreaWidthAndHeightText(e) : void 0
  }

  GetAreaDimensionText(e) {
    //'use strict';
    var t = 0,
      a = 0;
    return a = e ? function (e) {
      var t = 0,
        a = 0,
        r = e.length - 1;
      for (a = 0; a < e.length; a++) t += (e[r].x + e[a].x) * (e[r].y - e[a].y),
        r = a;
      return Math.abs(t / 2)
    }(e) : this.Frame.width * this.Frame.height,
      t = GlobalData.docHandler.rulerSettings.showpixels ? a : this.GetLengthInUnits(a),
      this.GetLengthInRulerUnits(t)
  }

  GetAreaWidthAndHeightText(e) {
    //'use strict';
    return null
  }

  GetDimensionPoints() {
    // var e;
    // if (
    //   e = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, null),
    //   this.RotationAngle
    // ) {
    //   var t = - this.RotationAngle / (180 / ConstantData.Geometry.PI);
    //   GlobalData.optManager.RotatePointsAboutCenter(this.Frame, t, e)
    // }
    // return e


    let points = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, true, false, false, null);
    if (this.RotationAngle) {
      const angleInRadians = -this.RotationAngle / (180 / ConstantData.Geometry.PI);
      Utils3.RotatePointsAboutCenter(this.Frame, angleInRadians, points);
    }
    return points;
  }

  // Horizon and vertial points 0,0 -> horizon x,0 | 0,0 -> vertial y,0

  GetCoordinateLinePoints() {
    // debugger
    let points = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, true, false, false, null);
    if (this.RotationAngle) {
      const angleInRadians = -this.RotationAngle / (180 / ConstantData.Geometry.PI);
      Utils3.RotatePointsAboutCenter(this.Frame, angleInRadians, points);
    }

    // Double === mins 20 for start and end
    // points[0].x -= 20;
    // points[1].x += 20;

    return points;
  }

  GetHookedObjectDescList(e, t) {
    var a,
      r = 0,
      i = 0,
      n = 0,
      o = 0,
      s = - 1,
      l = 0,
      S = {},
      c = 0,
      u = [],
      p = [],
      d = 0,
      D = [],
      g = [],
      h = null,
      m = {},
      C = new Rectangle(0, 0, 0, 0),
      y = {},
      f = null,
      L = null,
      I = null,
      T = (
        new Rectangle(0, 0, 0, 0),
        GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !1)
      );
    if (Utils2.GetPolyRect(C, e), T) for (
      s = GlobalData.optManager.FindLink(T, this.BlockID, !0),
      l = T.length;
      s >= 0 &&
      s < l &&
      T[s].targetid === this.BlockID;
    ) if (f = GlobalData.optManager.GetObjectPtr(T[s].hookid, !1)) {
      for (o = f.hooks.length, r = 0; r < o; r++) if (f.hooks[r].objid === this.BlockID) {
        g.push(T[s].hookid);
        break
      }
      s++
    } else s++;
    var index;//Double ===
    var hobj;//Double ===
    for (
      t &&
      t.linkParams &&
      (
        t.linkParams.ConnectIndex != this.BlockID &&
        (
          t.linkParams.PrevConnect === this.BlockID ||
          t.linkParams.ConnectIndexHistory.indexOf(this.BlockID) >= 0
        ) &&
        (index = g.indexOf(t.movingShapeID), index >= 0 && g.splice(index, 1)),
        t.linkParams.ConnectIndex === this.BlockID &&
        g.indexOf(t.movingShapeID) < 0 &&
        g.push(t.movingShapeID)
      ),
      a = g.length,
      r = 0;
      r < a;
      r++
    ) if (

        hobj = GlobalData.optManager.GetObjectPtr(g[r], !1),
        // hobj instanceof ListManager.BaseShape &&
        // dOULE ===
        // hobj instanceof GlobalDataShape.BaseShape &&
        hobj instanceof Instance.Shape.BaseShape &&
        !(
          t &&
          t.linkParams &&
          t.movingShapeID === hobj.BlockID &&
          t.linkParams.ConnectIndex < 0 &&
          t.linkParams.PrevConnect === this.BlockID
        )
      ) {
        if (t && t.linkParams && t.movingShapeID === hobj.BlockID) y = t.linkParams.ConnectPt;
        else {
          if (!(hobj.hooks.length > 0)) continue;
          y = hobj.hooks[0].connect
        }
        if (h = this.GetPerimPts(this.BlockID, [
          y
        ]), !this.Hit(h[0], !0, !1, m)) {
          if (
            // !(this instanceof ListManager.BaseLine) ||
            // this instanceof ListManager.PolyLine
            // Double ===
            // !(this instanceof GlobalDataShape.BaseLine) ||
            // this instanceof GlobalDataShape.PolyLine
            !(this instanceof Instance.Shape.BaseLine) ||
            this instanceof Instance.Shape.PolyLine
          ) continue;
          if (
            Utils2.IsEqual(h[0].x, this.StartPoint.x, 2) &&
            Utils2.IsEqual(h[0].y, this.StartPoint.y, 2)
          ) m.segment = 0;
          else {
            if (
              !Utils2.IsEqual(h[0].x, this.EndPoint.x, 2) ||
              !Utils2.IsEqual(h[0].y, this.EndPoint.y, 2)
            ) continue;
            m.segment = e.length > 2 ? e.length - 2 : 0
          }
        }
        var b = m.segment + 1;
        if (!(b - 1 >= e.length)) {
          (p = []).push(new Point(e[b - 1].x, e[b - 1].y)),
            p.push(new Point(e[b].x, e[b].y)),
            c = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(p[0], p[1]),
            Utils3.RotatePointsAboutCenter(C, - c, p),
            t &&
              t.movingShapeID === hobj.BlockID ? (u = Utils2.PolyFromRect(t.movingShapeBBox), d = c) : (
              u = hobj.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),
              d = - hobj.RotationAngle / (180 / ConstantData.Geometry.PI)
            );
          var M = {};
          Utils2.GetPolyRect(M, u);
          var P = Utils1.DeepCopy(h[0]);
          for (
            Utils3.RotatePointsAboutCenter(M, d, [
              P
            ]),
            Utils2.OffsetRect(M, h[0].x - P.x, h[0].y - P.y),
            u = Utils2.PolyFromRect(M),
            d &&
            Utils3.RotatePointsAboutPoint(h[0], - d, u),
            n = u.length,
            i = 0;
            i < n;
            i++
          ) u[i].x -= this.Frame.x,
            u[i].y -= this.Frame.y;
          Utils3.RotatePointsAboutCenter(C, - c, u),
            Utils2.GetPolyRect(S, u),
            L = new Point(S.x, p[0].y),
            I = new Point(S.x + S.width, p[0].y),
            segmentSortValue = L.x,
            Utils3.RotatePointsAboutCenter(C, c, [
              L,
              I
            ]),
            D.push({
              id: hobj.BlockID,
              segment: b,
              segmentSortValue: segmentSortValue,
              start: {
                x: L.x,
                y: L.y
              },
              end: {
                x: I.x,
                y: I.y
              }
            })
        }
      }
    return D.sort(
      (
        function (e, t) {
          return e.segment != t.segment ? e.segment < t.segment ? - 1 : 1 : e.segmentSortValue < t.segmentSortValue ? - 1 : 1
        }
      )
    ),
      D
  }

  GetHookedObjectDimensionInfo(e) {
    var t,
      a,
      r = - 1,
      i = new Point(0, 0),
      n = [],
      o = (this.hooks.length, this.GetDimensionPoints());
    for (
      a = this.GetHookedObjectDescList(o, e),
      length = a.length,
      r = - 1,
      t = 0;
      t < length;
      t++
    ) a[t].segment > r ? (
      i = o[(r = a[t].segment) - 1],
      n.push({
        hookedObjID: a[t].id,
        side: 0,
        segment: r,
        start: {
          x: i.x,
          y: i.y
        },
        end: {
          x: a[t].start.x,
          y: a[t].start.y
        }
      })
    ) : n.length > 0 &&
    (n[n.length - 1].end = a[t].start),
      n.push({
        hookedObjID: a[t].id,
        side: 1,
        segment: r,
        start: {
          x: a[t].end.x,
          y: a[t].end.y
        },
        end: {
          x: o[r].x,
          y: o[r].y
        }
      }),
      i = a[t].end;
    return n
  }

  DimensionLineDeflectionAdjust(e, t, a, r, i) {
  }

  GetDimensionLineDeflectionKnobUserData(e, t, a, r, i) {
    var n,
      o,
      s,
      l,
      S,
      c,
      u = null,
      p = {},
      d = 0,
      D = 0,
      g = [],
      h = {},
      m = a ||
        this.GetDimensionPoints(),
      C = 0,
      y = !1;
    for (
      S = (
        l = e.GetElementListWithID(ConstantData.SVGElementClass.DIMENSIONTEXT)
      ).length,
      C = 0;
      C < S;
      C++
    ) if (l[C].userData.segment === t && void 0 === l[C].userData.side) {
      u = l[C];
      break
    }
    if (!u) return null;
    p = {
      x: (n = u.CalcBBox()).x + n.width + 25,
      y: n.y + n.height / 2
    },
      360 === (d = 360 - u.GetRotation()) &&
      (d = 0),
      s = 2 * Math.PI * (d / 360),
      Utils3.RotatePointsAboutPoint({
        x: n.x,
        y: n.y
      }, s, [
        p
      ]),
      g.push(new Point(m[t - 1].x, m[t - 1].y)),
      g.push(new Point(m[t].x, m[t].y)),
      h.x = g[0].x < g[1].x ? g[0].x + (g[1].x - g[0].x) / 2 : g[1].x + (g[0].x - g[1].x) / 2,
      h.y = g[0].y < g[1].y ? g[0].y + (g[1].y - g[0].y) / 2 : g[1].y + (g[0].y - g[1].y) / 2,
      D = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(m[t - 1], m[t]),
      // this instanceof ListManager.Polygon &&
      // Doule === TODO
      // this instanceof GlobalDataShape.Polygon &&
      this instanceof Instance.Shape.Polygon &&
      this.polylist &&
      (
        ob = Utils1.DeepCopy(this),
        (c = GlobalData.optManager.ShapeToPolyLine(this.BlockID, !1, !0, ob)) &&
        c.IsReverseWinding &&
        c.IsReverseWinding() &&
        (y = !0)
      ),
      this.IsReverseWinding &&
      this.IsReverseWinding() &&
      (y = !0),
      y &&
      (D += Math.PI, D %= 2 * Math.PI),
      g.push(new Point(p.x, p.y));
    var f = new Rectangle(0, 0, 0, 0);
    var otherside, minX;
    return Utils2.GetPolyRect(f, g),
      Utils3.RotatePointsAboutCenter(f, - D, g),
      otherside = g[2].y > g[0].y,
      o = Math.max(g[0].x, g[1].x),
      minX = Math.min(g[0].x, g[1].x),
      (g[2].x > o || g[2].x < minX) &&
      (
        g[2].x = Math.abs(D - s) < 2 ? o : minX,
        Utils3.RotatePointsAboutCenter(f, D, g),
        p.x = g[2].x,
        p.y = g[2].y
      ),
      g = null,
      p.x += r - i,
      p.y += r - i,
    {
      segmentIndex: t,
      knobPoint: p,
      ccAngleRadians: D,
      originalDeflection: this.GetDimensionDeflectionValue(t),
      adjustForKnob: r - i
    }
  }

  GetDimensionDeflectionValue(e) {
    return 1 === e ? this.dimensionDeflectionH ? this.dimensionDeflectionH : 0 : this.dimensionDeflectionV ? this.dimensionDeflectionV : 0
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
    return l.x = r.knobPoint.x + this.Frame.x - r.adjustForKnob,
      l.y = r.knobPoint.y + this.Frame.y - r.adjustForKnob,
      s.push(S[r.segmentIndex - 1]),
      s.push(S[r.segmentIndex]),
      s.push(new Point(l.x, l.y)),
      s.push(new Point(t, a)),
      Utils3.RotatePointsAboutCenter(this.Frame, - r.ccAngleRadians, s),
      this.IsReverseWinding() ||
      Utils3.RotatePointsAboutCenter(this.Frame, Math.PI, s),
      n = s[3].y - s[2].y,
      this.polylist &&
        this.polylist.segs[r.segmentIndex].dimTextAltPositioning ? r.originalDeflection - n : r.originalDeflection + n
  }

  UpdateDimensionLines(elem, t) {

    console.log('== track UpdateDimensionsLines Shape.BaseDrawingObject-> UpdateDimensionLines Self======')


    // debugger
    // elem = Basic.ShapeContainer

    // return GlobalData.optManager.bBuildingSymbols ? e : null != e ? (
    //   this.RemoveDimensionLines(e),
    //   (
    //     this.Dimensions & ConstantData.DimensionFlags.SED_DF_Area ||
    //     this.Dimensions & ConstantData.DimensionFlags.SED_DF_RectWithAndHeight
    //   ) &&
    //   this.UpdateAreaDimensionLines(e),
    //   (
    //     this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
    //     this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select ||
    //     // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always ||
    //     // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select ||
    //     t
    //   ) &&
    //   this.UpdateEdgeDimensionLines(e, t),
    //   e
    // ) : void 0

    // elem shapecontainer


    if (GlobalData.optManager.bBuildingSymbols) {
      return elem;
    }

    if (elem != null) {
      this.RemoveDimensionLines(elem);

      const check1 = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Area ||
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_RectWithAndHeight;

      if (check1) {
        this.UpdateAreaDimensionLines(elem);
      }

      const check2 = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select || t;

      if (check2) {
        this.UpdateEdgeDimensionLines(elem, t);
      }

      return elem;
    }

    return;



  }


  UpdateCoordinateLines(elem, t) {


    // debugger
    // elem = Basic.ShapeContainer

    // return GlobalData.optManager.bBuildingSymbols ? e : null != e ? (
    //   this.RemoveDimensionLines(e),
    //   (
    //     this.Dimensions & ConstantData.DimensionFlags.SED_DF_Area ||
    //     this.Dimensions & ConstantData.DimensionFlags.SED_DF_RectWithAndHeight
    //   ) &&
    //   this.UpdateAreaDimensionLines(e),
    //   (
    //     this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
    //     this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select ||
    //     // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always ||
    //     // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select ||
    //     t
    //   ) &&
    //   this.UpdateEdgeDimensionLines(e, t),
    //   e
    // ) : void 0

    // elem shapecontainer


    // Double need to change the Dimensions to CoordinateLines

    if (GlobalData.optManager.bBuildingSymbols) {
      return elem;
    }

    if (elem != null) {
      // this.RemoveDimensionLines(elem);

      this.RemoveCoordinateLines(elem);

      const check1 = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Area ||
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_RectWithAndHeight;

      if (check1) {
        this.UpdateAreaDimensionLines(elem);
      }

      const check2 = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select || t;

      if (check2) {
        // this.UpdateEdgeDimensionLines(elem, t);
        this.UpdateEdgeCoordinateLines(elem, t);
      }

      return elem;
    }

    return;



  }

  // UpdateHookedObjectDimensionLines(e, t, a) {
  //   if (
  //     this.Dimensions & ConstantData.DimensionFlags.SED_DF_AllSeg
  //   ) {
  //     var r,
  //       i = 0,
  //       n = null,
  //       o = 0,
  //       s = this.GetHookedObjectDimensionInfo(a);
  //     for (r = s.length, i = 0; i < r; i++) Utils2.EqualPt(s[i].start, s[i].end) ||
  //       (
  //         o = Utils1.CalcAngleFromPoints(s[i].start, s[i].end),
  //         n = this.GetDimensionTextForPoints(s[i].start, s[i].end),
  //         this.CreateDimension(e, t, !1, o, n, s[i].start, s[i].end, s[i].segment, !0, !0, s[i])
  //       )
  //   }
  // }





  UpdateHookedObjectDimensionLines(container, pathCreator, dimensionInfo) {
    if (this.Dimensions & ConstantData.DimensionFlags.SED_DF_AllSeg) {
      const hookedObjectInfo = this.GetHookedObjectDimensionInfo(dimensionInfo);
      for (let i = 0; i < hookedObjectInfo.length; i++) {
        if (!Utils2.EqualPt(hookedObjectInfo[i].start, hookedObjectInfo[i].end)) {
          const angle = Utils1.CalcAngleFromPoints(hookedObjectInfo[i].start, hookedObjectInfo[i].end);
          const dimensionText = this.GetDimensionTextForPoints(hookedObjectInfo[i].start, hookedObjectInfo[i].end);
          this.CreateDimension(container, pathCreator, false, angle, dimensionText, hookedObjectInfo[i].start, hookedObjectInfo[i].end, hookedObjectInfo[i].segment, true, true, hookedObjectInfo[i]);
        }
      }
    }
  }




  UpdateEdgeDimensionLines(elem, t) {
    // //'use strict';
    // var a,
    //   r,
    //   i,
    //   n,
    //   o = 0,
    //   s = 0,
    //   l = '',
    //   S = null,
    //   c = null;
    // if (e) {
    //   if (
    //     c = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.PATH),
    //     e.AddElement(c),
    //     S = c.PathCreator(),
    //     c.SetID(ConstantData.SVGElementClass.DIMENSIONLINE),
    //     c.SetFillColor('none'),
    //     c.SetStrokeColor(ConstantData.Defines.DimensionLineColor),
    //     c.SetStrokeOpacity(1),
    //     c.SetStrokeWidth(1),
    //     S.BeginPath(),
    //     i = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
    //     this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select,

    //     // i = this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always ||
    //     // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select,

    //     r = (a = this.GetDimensionPoints()).length,
    //     // n = this instanceof ListManager.Polygon,
    //     // Double === TODO
    //     // n = this instanceof GlobalDataShape.Polygon,
    //     n = this instanceof Instance.Shape.Polygon,
    //     i
    //   ) for (o = 1; o < r; o++) Utils2.EqualPt(a[o - 1], a[o]) ||
    //     (
    //       s = Utils1.CalcAngleFromPoints(a[o - 1], a[o]),
    //       (l = this.GetDimensionFloatingPointValue(o)) ||
    //       (l = this.GetDimensionTextForPoints(a[o - 1], a[o])),
    //       this.CreateDimension(e, S, !1, s, l, a[o - 1], a[o], o, !1, n)
    //     );
    //   this.UpdateSecondaryDimensions(e, S, t),
    //     this.ShowOrHideDimensions(!1, t),
    //     S.Apply()
    // }













    //debugger


    let pathShape, pathCreator, dimensionPoints, isPolygon;
    let angle = 0, segmentIndex = 0, dimensionText = '', dimensionLineShape = null, path = null;

    if (!elem) {
      return;
    }

    pathShape = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.PATH);
    elem.AddElement(pathShape);
    pathCreator = pathShape.PathCreator();
    pathShape.SetID(ConstantData.SVGElementClass.DIMENSIONLINE);
    pathShape.SetFillColor('none');
    pathShape.SetStrokeColor(ConstantData.Defines.DimensionLineColor);
    pathShape.SetStrokeOpacity(1);
    pathShape.SetStrokeWidth(1);
    pathCreator.BeginPath();

    const alwaysOrSelectDimension = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always || this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select;
    dimensionPoints = this.GetDimensionPoints();

    console.log('=== wall dimensionPoints', { ...dimensionPoints });

    const pointsLength = dimensionPoints.length;
    isPolygon = this instanceof Instance.Shape.Polygon;

    if (alwaysOrSelectDimension) {
      for (segmentIndex = 1; segmentIndex < pointsLength; segmentIndex++) {
        if (!Utils2.EqualPt(dimensionPoints[segmentIndex - 1], dimensionPoints[segmentIndex])) {
          angle = Utils1.CalcAngleFromPoints(dimensionPoints[segmentIndex - 1], dimensionPoints[segmentIndex]);
          dimensionText = this.GetDimensionFloatingPointValue(segmentIndex) || this.GetDimensionTextForPoints(dimensionPoints[segmentIndex - 1], dimensionPoints[segmentIndex]);

          console.log('=== wall angle', angle);
          console.log('=== wall dimensionText', dimensionText);

          this.CreateDimension(elem, pathCreator, false, angle, dimensionText, dimensionPoints[segmentIndex - 1], dimensionPoints[segmentIndex], segmentIndex, false, isPolygon);
        }
      }
    }

    this.UpdateSecondaryDimensions(elem, pathCreator, t);
    this.ShowOrHideDimensions(false, t);
    pathCreator.Apply();
  }



  // Add coordinate line horizon and vertial
  //AddCoordinateLine
  UpdateEdgeCoordinateLines(shapContainer, t) {

    let pathShape, pathCreator;



    // let dimensionPoints;
    let coordinateLinePoints;


    let isPolygon;
    let angle = 0, segmentIndex = 0, dimensionText = '', dimensionLineShape = null, path = null;

    if (!shapContainer) {
      return;
    }

    pathShape = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.PATH);
    shapContainer.AddElement(pathShape);
    pathCreator = pathShape.PathCreator();
    pathShape.SetID(ConstantData.SVGElementClass.CoordinateLine);
    pathShape.SetFillColor('none');
    pathShape.SetStrokeColor(ConstantData.Defines.CoordinateLineColor);
    pathShape.SetStrokeOpacity(1);
    pathShape.SetStrokeWidth(1);

    // Set the path to dash line
    pathShape.SetStrokePattern("5,5");

    pathCreator.BeginPath();

    /*
    const alwaysOrSelectDimension = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always || this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select;
    dimensionPoints = this.GetDimensionPoints();
    */

    const showCoordinateLine = true;// this.Dimensions & ConstantData.DimensionFlags.SED_DF_CoordinateLine;
    coordinateLinePoints = this.GetCoordinateLinePoints()

    console.log('=== wall coordinateLinePoints', { ...coordinateLinePoints });

    const pointsLength = coordinateLinePoints.length;
    isPolygon = this instanceof Instance.Shape.Polygon;

    if (showCoordinateLine) {
      for (segmentIndex = 1; segmentIndex < pointsLength; segmentIndex++) {

        const check1 = !Utils2.EqualPt(coordinateLinePoints[segmentIndex - 1], coordinateLinePoints[segmentIndex]);

        if (check1) {
          angle = Utils1.CalcAngleFromPoints(coordinateLinePoints[segmentIndex - 1], coordinateLinePoints[segmentIndex]);

          // get the dimension text value
          dimensionText = this.GetDimensionFloatingPointValue(segmentIndex) ||
            this.GetDimensionTextForPoints(coordinateLinePoints[segmentIndex - 1], coordinateLinePoints[segmentIndex]);



          const startPoint = coordinateLinePoints[segmentIndex - 1];
          const endPoint = coordinateLinePoints[segmentIndex];

          // startPoint.x -= 20;
          // endPoint.x += 20;

          console.log('=== wall angle', angle);
          console.log('=== wall dimensionText', dimensionText);
          console.log('=== wall start-end-point', startPoint, endPoint);

          this.CreateCoordinateLine(shapContainer, pathCreator, false, angle, dimensionText, startPoint, endPoint, segmentIndex, false, isPolygon);
        }
      }
    }

    this.UpdateSecondaryDimensions(shapContainer, pathCreator, t);
    this.ShowOrHideDimensions(false, t);
    pathCreator.Apply();
  }


  UpdateSecondaryDimensions(e, t, a) {
  }

  HideOrShowSelectOnlyDimensions(e, t) {
    //'use strict';
    var a,
      r = 0,
      i = null,
      n = null,
      o = !1,
      s = !1,
      l = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    if (null != l) {
      var S = [
        ConstantData.SVGElementClass.DIMENSIONLINE,
        ConstantData.SVGElementClass.DIMENSIONTEXT,
        ConstantData.SVGElementClass.AREADIMENSIONLINE,
        ConstantData.SVGElementClass.DIMENSIONTEXTNOEDIT
      ];
      for (r = l.ElementCount() - 1; r >= 1; r--) a = (i = l.GetElementByIndex(r)).GetID(),
        S.indexOf(a) >= 0 &&
        (
          s = !1,
          t &&
          (n = i.GetUserData()) &&
          n.hookedObjectInfo &&
          n.hookedObjectInfo.hookedObjID === t.movingShapeID &&
          (s = !0),
          o = e,
          o = !!s ||
          (
            !!(
              this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always
            ) ||
            !!(
              this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select
            ) &&
            e
          ),
          i.SetOpacity(o ? 1 : 0)
        )
    }
  }

  ShowOrHideDimensions(e, t) {
    var a = null;
    this.HideOrShowSelectOnlyDimensions(e, t),
      this.hooks.length > 0 &&
      t &&
      t.movingShapeID === this.BlockID &&
      (
        !(a = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, !1)) ||
        a.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ||
        a.Dimensions & ConstantData.DimensionFlags.SED_DF_HideHookedObjDimensions ||
        a.HideOrShowSelectOnlyDimensions(e, t)
      )
  }

  GetPointsForAreaDimension() {
    //'use strict';
    return this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null)
  }

  UpdateAreaDimensionLines(e) {
    //'use strict';
    var t,
      a,
      r = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.PATH);
    if (null != e) {
      e.AddElement(r);
      var i = r.PathCreator();
      r.SetID(ConstantData.SVGElementClass.AREADIMENSIONLINE),
        r.SetFillColor('none'),
        r.SetStrokeColor(ConstantData.Defines.DimensionLineColor),
        r.SetStrokeOpacity(1),
        r.SetStrokeWidth(1),
        i.BeginPath(),
        0,
        a = this.GetPointsForAreaDimension(),
        (t = this.GetAreaDimension(a)) &&
        '' !== t &&
        this.CreateDimension(e, i, !0, 0, t),
        r.SetFillColor('#0000FF'),
        r.SetStrokeWidth(0),
        i.Apply()
    }
  }

  // GetDimensionFloatingPointValue(e) {
  //   var t = 0;
  //   return this.rflags & ConstantData.FloatingPointDim.SD_FP_Width ||
  //     this.rflags & ConstantData.FloatingPointDim.SD_FP_Height ? 1 === e &&
  //       this.rflags & ConstantData.FloatingPointDim.SD_FP_Width ? (
  //     t = this.GetDimensionLengthFromValue(this.rwd),
  //     this.GetLengthInRulerUnits(t)
  //   ) : 2 === e &&
  //     this.rflags & ConstantData.FloatingPointDim.SD_FP_Height ? (
  //     t = this.GetDimensionLengthFromValue(this.rht),
  //     this.GetLengthInRulerUnits(t)
  //   ) : null : null
  // }



  GetDimensionFloatingPointValue(segmentIndex: number): string | null {
    let dimensionValue = 0;

    if (this.rflags & ConstantData.FloatingPointDim.SD_FP_Width || this.rflags & ConstantData.FloatingPointDim.SD_FP_Height) {
      if (segmentIndex === 1 && this.rflags & ConstantData.FloatingPointDim.SD_FP_Width) {
        dimensionValue = this.GetDimensionLengthFromValue(this.rwd);
        return this.GetLengthInRulerUnits(dimensionValue);
      } else if (segmentIndex === 2 && this.rflags & ConstantData.FloatingPointDim.SD_FP_Height) {
        dimensionValue = this.GetDimensionLengthFromValue(this.rht);
        return this.GetLengthInRulerUnits(dimensionValue);
      }
    }

    return null;
  }



  IsTextFrameOverlap(e, t) {
    // //'use strict';
    // return !1
    return false;
  }

  GetExteriorDimensionMeasurementLineThicknessAdjustment(e) {
    // //'use strict';
    return 0;
  }

  CanUseStandOffDimensionLines() {
    // //'use strict';
    // return !0
    return true;
  }

  GetDimensionLengthFromString(e, t) {
    // //'use strict';
    var a;
    return (a = this.GetDimensionValueFromString(e, t)) < 0 ? a : this.GetDimensionLengthFromValue(a)
  }

  GetDimensionValueFromString(e, t) {
    //'use strict';
    var a = 0;
    if (0 === (e = e.trim()).length) return - 1;
    if (!e.match(/^[0-9. \/\'\"]+$/)) return - 1;
    if (
      GlobalData.docHandler.rulerSettings.useInches &&
      GlobalData.docHandler.rulerSettings.units == ConstantData.RulerUnits.SED_Feet &&
      !GlobalData.docHandler.rulerSettings.showpixels
    ) {
      if ((a = this.ConvertToFeet(e)) < 0 || isNaN(a)) return - 1
    } else {
      if (!this.NumberIsFloat(e)) return - 1;
      a = parseFloat(e)
    }
    return isNaN(a) ? - 1 : a
  }

  GetDimensionLengthFromValue(e) {
    //'use strict';
    var t = 0;
    return t = GlobalData.docHandler.rulerSettings.showpixels ? e : this.UnitsToCoord(e, 0),
      isNaN(t) ||
        t > 400000 ? - 1 : t
  }

  AdjustDimensionLength(e) {
    return e
  }

  GetDimensionAreaTextInfo(e, t, a, r, i, n, o) {
    //'use strict';
    var s,
      l = {},
      S = {};
    s = e.GetTextMinDimensions(),
      l.height = s.height,
      l.width = s.width,
      l.y = this.Frame.height / 2,
      l.y -= l.height / 2,
      l.x = this.Frame.width / 2,
      l.x -= l.width / 2,
      this.Frame2Poly(l, a);
    var c = 0.5 * l.height,
      u = 0.5 * c;
    S.x = l.x - u,
      S.y = l.y + (l.height - c) / 2,
      r.push(new Point(S.x, S.y)),
      S.y += c,
      r.push(new Point(S.x, S.y)),
      S.x -= c,
      S.y = l.y + l.height / 2,
      r.push(new Point(S.x, S.y)),
      r.push(new Point(r[0].x, r[0].y)),
      S.x = l.x + l.width + u,
      S.y = l.y + (l.height - c) / 2,
      i.push(new Point(S.x, S.y)),
      S.y += c,
      i.push(new Point(S.x, S.y)),
      S.x += c,
      S.y = l.y + l.height / 2,
      i.push(new Point(S.x, S.y)),
      i.push(new Point(i[0].x, i[0].y)),
      S.x = l.x + l.width / 2 - c / 2,
      S.y = l.y - u,
      n.push(new Point(S.x, S.y)),
      S.x += c,
      n.push(new Point(S.x, S.y)),
      S.x -= c / 2,
      S.y -= c,
      n.push(new Point(S.x, S.y)),
      n.push(new Point(n[0].x, n[0].y)),
      S.x = l.x + l.width / 2 - c / 2,
      S.y = l.y + l.height + u,
      o.push(new Point(S.x, S.y)),
      S.x += c,
      o.push(new Point(S.x, S.y)),
      S.x -= c / 2,
      S.y += c,
      o.push(new Point(S.x, S.y)),
      o.push(new Point(o[0].x, o[0].y))
  }

  GetFrameIntersects(e, t, a) {
    return !1
  }

  AdjustAutoInsertShape(e) {
    return !1
  }

  // Double
  GetDimensionTextInfo1(e, t, a, r, i, n, o, s, l) {
    console.log('=== GetDimensionTextInfo', e, t, a, r, i, n, o, s, l);
    //startPoint, endPoint, angle, textShape, segmentIndex, textFramePoints, leftArrowPoints, rightArrowPoints, isStandoff
    // e point
    // t point
    // a 0
    // r Text
    // i 1
    // n Array
    // o Array
    // s array
    // l boolean

    var S;
    var c;
    var u;
    var p = [];
    var d = {};
    var D = {};
    var g = {};
    var h = { x: 0, y: 0, width: 0, height: 0 };
    var m = 0;
    var C = !1;
    var y = 0;
    var f = !1;


    u = r.GetTextMinDimensions();
    h.height = u.height;
    h.width = u.width;
    p.push(new Point(e.x, e.y));
    p.push(new Point(t.x, t.y));
    S = 360 - a;
    c = 2 * Math.PI * (S / 360);
    Utils3.RotatePointsAboutCenter(this.Frame, - c, p);

    p[0].x < p[1].x ?
      (d = $.extend(!0, {}, p[0]), D = $.extend(!0, {}, p[1]))

      : (d = $.extend(!0, {}, p[1]), D = $.extend(!0, {}, p[0]));


    h.x = d.x + (D.x - d.x) / 2;
    h.y = d.y + (D.y - d.y) / 2;
    h.x -= h.width / 2;
    h.y -= h.height / 2;
    h.y -= h.height / 2;

    const check1 = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior || this.StyleRecord &&
      this.StyleRecord.Line && this.StyleRecord.Line.Thickness;

    if (check1) {
      (h.y -= this.StyleRecord.Line.Thickness);
    }

    // f = 0 != (
    //   this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff
    // ) &&
    //   this.CanUseStandOffDimensionLines();


    f = 0 != (
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff
    ) &&
      this.CanUseStandOffDimensionLines();



    if (
      !l &&
      !(
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_HideHookedObjDimensions
      ) &&
      // this instanceof ListManager.BaseLine &&
      // Double === TODO
      // this instanceof GlobalDataShape.BaseLine &&
      this instanceof Instance.Shape.BaseLine &&
      this.ShortRef != ConstantData2.LineTypes.SED_LS_MeasuringTape &&
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
    ) {
      var L = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !1);
      if (L) GlobalData.optManager.FindLink(L, this.BlockID, !0) >= 0 &&
        (f = !0)
    }
    l &&
      (f = !1);

    var I = f ? ConstantData.Defines.DimensionDefaultStandoff : ConstantData.Defines.DimensionDefaultNonStandoff;

    if (
      h.y -= I,
      m = ConstantData.Defines.DimensionDefaultTextGap,
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior ||
      this.StyleRecord &&
      this.StyleRecord.Line &&
      this.StyleRecord.Line.Thickness &&
      (m += this.StyleRecord.Line.Thickness),
      // this instanceof ListManager.BaseLine &&
      // Double === TODO
      // this instanceof GlobalDataShape.BaseLine &&
      this instanceof Instance.Shape.BaseLine &&
      (!this.polylist || 2 === this.polylist.segs.length)
    ) {
      var T = Math.floor((c - 0.01) / (Math.PI / 2));
      C = 1 == T ||
        2 == T
    } else if (this.polylist && !this.polylist.closed && l) {
      var b = [
        (
          p = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null)
        )[i - 1],
        p[i]
      ];
      Utils3.RotatePointsAboutCenter(this.Frame, - c, b),
        b.push({
          x: h.x + h.width / 2,
          y: h.y + h.height / 2
        }),
        b[2].x = b[0].x + (b[1].x - b[0].x) / 2,
        Utils3.RotatePointsAboutCenter(this.Frame, c, b),
        Utils2.IsPointInPoly(p, b[2]) &&
        (C = !0)
    } else this.IsTextFrameOverlap(h, a) &&
      (C = !0);
    C &&
      (
        h.y += I,
        h.y += h.height,
        this.StyleRecord &&
        this.StyleRecord.Line &&
        this.StyleRecord.Line.Thickness &&
        (h.y += 2 * this.StyleRecord.Line.Thickness),
        h.y += I
      );
    var M = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff;
    if (
      M &&
      !this.CanUseStandOffDimensionLines() &&
      (M = !1),
      l &&
      (M = !1),
      M &&
      (
        y = (
          // this instanceof ListManager.PolyLine ||
          // this instanceof GlobalDataShape.PolyLine ||
          this instanceof Instance.Shape.PolyLine ||
          // this instanceof ListManager.Polygon
          // Double === TODO
          // this instanceof GlobalDataShape.Polygon
          this instanceof Instance.Shape.Polygon
        ) &&
          this.polylist &&
          this.polylist.segs &&
          this.polylist.segs.length > i ? this.polylist.segs[i].dimDeflection :

          // this instanceof ListManager.BaseLine
          // Double === TODO
          // this instanceof GlobalDataShape.BaseLine
          this instanceof Instance.Shape.BaseLine

            ? this.dimensionDeflectionH ? this.dimensionDeflectionH : 0 : (
              y = Math.abs(a % 180) < 5 ? this.dimensionDeflectionH : this.dimensionDeflectionV
            ) ||
            0,
        C ? h.y += y : h.y -= y,
        this.polylist &&
        this.polylist.segs &&
        this.polylist.segs.length > i &&
        (this.polylist.segs[i].dimTextAltPositioning = C)
      ),
      this.Frame2Poly(h, n),
      this.Dimensions & M
    ) g.x = d.x,
      g.y = d.y > h.y ? d.y - m : d.y + m,
      o.push(new Point(g.x, g.y)),
      g.y = h.y + h.height / 2,
      o.push(new Point(g.x, g.y)),
      g.x = h.x - ConstantData.Defines.DimensionDefaultTextGap,
      o.push(new Point(g.x, g.y)),
      g.x = h.x + h.width + ConstantData.Defines.DimensionDefaultTextGap,
      s.push(new Point(g.x, g.y)),
      g.x = D.x,
      s.push(new Point(g.x, g.y)),
      g.y = D.y > h.y ? D.y - m : D.y + m,
      s.push(new Point(g.x, g.y));
    else {
      var P = 0.5 * h.height;
      var R = 0.5 * P;


      g.x = h.x - R;
      g.y = h.y + (h.height - P) / 2;
      o.push(new Point(g.x, g.y));
      g.y += P;
      o.push(new Point(g.x, g.y));
      g.x -= P;
      g.y = h.y + h.height / 2;
      o.push(new Point(g.x, g.y));
      o.push(new Point(o[0].x, o[0].y));
      g.x = h.x + h.width + R;
      g.y = h.y + (h.height - P) / 2;
      s.push(new Point(g.x, g.y));
      g.y += P;
      s.push(new Point(g.x, g.y));
      g.x += P;
      g.y = h.y + h.height / 2;
      s.push(new Point(g.x, g.y));
      s.push(new Point(s[0].x, s[0].y));
    }
    Utils3.RotatePointsAboutCenter(this.Frame, c, n),
      Utils3.RotatePointsAboutCenter(this.Frame, c, o),
      Utils3.RotatePointsAboutCenter(this.Frame, c, s)
  }


  GetDimensionTextInfo(startPoint, endPoint, angle, textShape, segmentIndex, textFramePoints, leftArrowPoints, rightArrowPoints, isStandoff) {
    // console.log('=== GetDimensionTextInfo', e, t, a, r, i, n, o, s, l);
    //startPoint, endPoint, angle, textShape, segmentIndex, textFramePoints, leftArrowPoints, rightArrowPoints, isStandoff
    // e point
    // t point
    // a 0
    // r Text
    // i 1
    // n Array
    // o Array
    // s array
    // l boolean

    var newAngle;//S;
    var arcLength;//c;
    var textMinDim;
    var polyPoints = [];

    // start point
    var pointStart = { x: 0, y: 0 };// d = { x: 0, y: 0 };

    // end point
    var pointEnd = { x: 0, y: 0 };// D = { x: 0, y: 0 };
    var g = { x: 0, y: 0 };
    var textDim = { x: 0, y: 0, width: 0, height: 0 };
    var m = 0;
    var C = false;// !1;
    var y = 0;

    var isStdOff = false;// f = !1;

    // GetTextMinDimensions {width: 0, height: 0}

    textMinDim = textShape.GetTextMinDimensions();
    textDim.height = textMinDim.height;
    textDim.width = textMinDim.width;

    polyPoints.push(new Point(startPoint.x, startPoint.y));
    polyPoints.push(new Point(endPoint.x, endPoint.y));

    newAngle = 360 - angle;

    // this expression calculates the length of the arc on a unit circle that corresponds to an angle S measured in degrees.
    arcLength = 2 * Math.PI * (newAngle / 360);
    Utils3.RotatePointsAboutCenter(this.Frame, - arcLength, polyPoints);

    if (polyPoints[0].x < polyPoints[1].x) {
      pointStart = $.extend(true, {}, polyPoints[0]);
      pointEnd = $.extend(true, {}, polyPoints[1]);
    }
    else {
      pointStart = $.extend(true, {}, polyPoints[1]);
      pointEnd = $.extend(true, {}, polyPoints[0]);

    }

    // polyPoints[0].x < polyPoints[1].x ?
    //   (pointStart = $.extend(!0, {}, polyPoints[0]), pointEnd = $.extend(!0, {}, polyPoints[1]))

    //   : (pointStart = $.extend(!0, {}, polyPoints[1]), pointEnd = $.extend(!0, {}, polyPoints[0]));


    textDim.x = pointStart.x + (pointEnd.x - pointStart.x) / 2;
    textDim.y = pointStart.y + (pointEnd.y - pointStart.y) / 2;
    textDim.x -= textDim.width / 2;
    textDim.y -= textDim.height / 2;
    textDim.y -= textDim.height / 2;

    const check1 = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior || this.StyleRecord &&
      this.StyleRecord.Line && this.StyleRecord.Line.Thickness;

    if (check1) {
      (textDim.y -= this.StyleRecord.Line.Thickness);
    }

    // f = 0 != (
    //   this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff
    // ) &&
    //   this.CanUseStandOffDimensionLines();

    const stdOffFlag = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff;

    // f = 0 != (stdOffFlag ) &&  this.CanUseStandOffDimensionLines();

    isStdOff = stdOffFlag != 0 && this.CanUseStandOffDimensionLines();


    const isHideHookedObjDimensions = this.Dimensions & ConstantData.DimensionFlags.SED_DF_HideHookedObjDimensions;

    const check3 = !isStandoff && !isHideHookedObjDimensions && this instanceof Instance.Shape.BaseLine &&
      this.ShortRef != ConstantData2.LineTypes.SED_LS_MeasuringTape &&
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL;


    if (

      /*
      !isStandoff && !(isHideHookedObjDimensions) &&
      // this instanceof ListManager.BaseLine &&
      // Double === TODO
      // this instanceof GlobalDataShape.BaseLine &&
      this instanceof Instance.Shape.BaseLine &&
      this.ShortRef != ConstantData2.LineTypes.SED_LS_MeasuringTape &&
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
      */

      check3
    ) {
      // var L = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !1);
      // if (L) GlobalData.optManager.FindLink(L, this.BlockID, !0) >= 0 &&
      //   (isStdOff = !0)

      var linkObject = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, false);
      if (linkObject) {

        const fdLink = GlobalData.optManager.FindLink(linkObject, this.BlockID, !0);
        if (fdLink >= 0) {
          isStdOff = true;
        }
      }
    }


    // isStandoff &&
    //   (isStdOff = !1);

    if (isStandoff) {
      isStdOff = false;
    }

    // var I = isStdOff ? ConstantData.Defines.DimensionDefaultStandoff : ConstantData.Defines.DimensionDefaultNonStandoff;
    const stdOffNum = isStdOff ? ConstantData.Defines.DimensionDefaultStandoff : ConstantData.Defines.DimensionDefaultNonStandoff;

    // if (
    //   textDim.y -= stdOffNum,
    //   m = ConstantData.Defines.DimensionDefaultTextGap,
    //   this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior ||
    //   this.StyleRecord &&
    //   this.StyleRecord.Line &&
    //   this.StyleRecord.Line.Thickness &&
    //   (m += this.StyleRecord.Line.Thickness),
    //   // this instanceof ListManager.BaseLine &&
    //   // Double === TODO
    //   // this instanceof GlobalDataShape.BaseLine &&
    //   this instanceof Instance.Shape.BaseLine &&
    //   (!this.polylist || 2 === this.polylist.segs.length)
    // ) {
    //   var T = Math.floor((arcLength - 0.01) / (Math.PI / 2));
    //   C = 1 == T ||
    //     2 == T
    // } else if (this.polylist && !this.polylist.closed && isStandoff) {
    //   var b = [
    //     (
    //       polyPoints = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null)
    //     )[segmentIndex - 1],
    //     polyPoints[segmentIndex]
    //   ];
    //   GlobalData.optManager.RotatePointsAboutCenter(this.Frame, - arcLength, b),
    //     b.push({
    //       x: textDim.x + textDim.width / 2,
    //       y: textDim.y + textDim.height / 2
    //     }),
    //     b[2].x = b[0].x + (b[1].x - b[0].x) / 2,
    //     GlobalData.optManager.RotatePointsAboutCenter(this.Frame, arcLength, b),
    //     Utils2.IsPointInPoly(polyPoints, b[2]) &&
    //     (C = !0)
    // } else this.IsTextFrameOverlap(textDim, angle) &&
    //   (C = !0);
    // C &&
    //   (
    //     textDim.y += stdOffNum,
    //     textDim.y += textDim.height,
    //     this.StyleRecord &&
    //     this.StyleRecord.Line &&
    //     this.StyleRecord.Line.Thickness &&
    //     (textDim.y += 2 * this.StyleRecord.Line.Thickness),
    //     textDim.y += stdOffNum
    //   );




    if (textDim.y -= stdOffNum,
      m = ConstantData.Defines.DimensionDefaultTextGap,
      this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior ||
      this.StyleRecord &&
      this.StyleRecord.Line &&
      this.StyleRecord.Line.Thickness &&
      (m += this.StyleRecord.Line.Thickness),
      this instanceof Instance.Shape.BaseLine &&
      (!this.polylist || 2 === this.polylist.segs.length)) {
      var T = Math.floor((arcLength - 0.01) / (Math.PI / 2));
      C = 1 == T || 2 == T;
    } else if (this.polylist && !this.polylist.closed && isStandoff) {
      var b = [
        (polyPoints = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null))[segmentIndex - 1],
        polyPoints[segmentIndex]
      ];
      Utils3.RotatePointsAboutCenter(this.Frame, -arcLength, b);
      b.push({
        x: textDim.x + textDim.width / 2,
        y: textDim.y + textDim.height / 2
      });
      b[2].x = b[0].x + (b[1].x - b[0].x) / 2;
      Utils3.RotatePointsAboutCenter(this.Frame, arcLength, b);
      Utils2.IsPointInPoly(polyPoints, b[2]) && (C = !0);
    } else if (this.IsTextFrameOverlap(textDim, angle)) {
      C = !0;
    }
    if (C) {
      textDim.y += stdOffNum;
      textDim.y += textDim.height;
      if (this.StyleRecord && this.StyleRecord.Line && this.StyleRecord.Line.Thickness) {
        textDim.y += 2 * this.StyleRecord.Line.Thickness;
      }
      textDim.y += stdOffNum;
    }











    let isStdOff2 = false; //M

    var stdOffFlag2 = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff;

    if (stdOffFlag2 && !this.CanUseStandOffDimensionLines()) {
      isStdOff2 = false;
    }

    if (isStandoff) {
      isStdOff2 = false;
    }

    if (isStdOff2) {
      if (
        (this instanceof Instance.Shape.PolyLine || this instanceof Instance.Shape.Polygon) &&
        this.polylist &&
        this.polylist.segs &&
        this.polylist.segs.length > segmentIndex
      ) {
        y = this.polylist.segs[segmentIndex].dimDeflection;
      } else if (this instanceof Instance.Shape.BaseLine) {
        y = this.dimensionDeflectionH ? this.dimensionDeflectionH : 0;
      } else {
        y = Math.abs(angle % 180) < 5 ? this.dimensionDeflectionH : this.dimensionDeflectionV || 0;
      }

      if (C) {
        textDim.y += y;
      } else {
        textDim.y -= y;
      }

      if (this.polylist && this.polylist.segs && this.polylist.segs.length > segmentIndex) {
        this.polylist.segs[segmentIndex].dimTextAltPositioning = C;
      }
    }

    this.Frame2Poly(textDim, textFramePoints);

    if (this.Dimensions & stdOffFlag2) {
      g.x = pointStart.x;
      g.y = pointStart.y > textDim.y ? pointStart.y - m : pointStart.y + m;
      leftArrowPoints.push(new Point(g.x, g.y));
      g.y = textDim.y + textDim.height / 2;
      leftArrowPoints.push(new Point(g.x, g.y));
      g.x = textDim.x - ConstantData.Defines.DimensionDefaultTextGap;
      leftArrowPoints.push(new Point(g.x, g.y));
      g.x = textDim.x + textDim.width + ConstantData.Defines.DimensionDefaultTextGap;
      rightArrowPoints.push(new Point(g.x, g.y));
      g.x = pointEnd.x;
      rightArrowPoints.push(new Point(g.x, g.y));
      g.y = pointEnd.y > textDim.y ? pointEnd.y - m : pointEnd.y + m;
      rightArrowPoints.push(new Point(g.x, g.y));
    } else {
      var P = 0.5 * textDim.height;
      var R = 0.5 * P;

      g.x = textDim.x - R;
      g.y = textDim.y + (textDim.height - P) / 2;
      leftArrowPoints.push(new Point(g.x, g.y));
      g.y += P;
      leftArrowPoints.push(new Point(g.x, g.y));
      g.x -= P;
      g.y = textDim.y + textDim.height / 2;
      leftArrowPoints.push(new Point(g.x, g.y));
      leftArrowPoints.push(new Point(leftArrowPoints[0].x, leftArrowPoints[0].y));
      g.x = textDim.x + textDim.width + R;
      g.y = textDim.y + (textDim.height - P) / 2;
      rightArrowPoints.push(new Point(g.x, g.y));
      g.y += P;
      rightArrowPoints.push(new Point(g.x, g.y));
      g.x += P;
      g.y = textDim.y + textDim.height / 2;
      rightArrowPoints.push(new Point(g.x, g.y));
      rightArrowPoints.push(new Point(rightArrowPoints[0].x, rightArrowPoints[0].y));
    }


    Utils3.RotatePointsAboutCenter(this.Frame, arcLength, textFramePoints);
    Utils3.RotatePointsAboutCenter(this.Frame, arcLength, leftArrowPoints);
    Utils3.RotatePointsAboutCenter(this.Frame, arcLength, rightArrowPoints);


  }



  GetCoordinateTextInfo(startPoint, endPoint, angle, textShape, segmentIndex, textFramePoints, leftArrowPoints, rightArrowPoints, isStandoff) {
    // console.log('=== GetDimensionTextInfo', e, t, a, r, i, n, o, s, l);
    //startPoint, endPoint, angle, textShape, segmentIndex, textFramePoints, leftArrowPoints, rightArrowPoints, isStandoff
    // e point
    // t point
    // a 0
    // r Text
    // i 1
    // n Array
    // o Array
    // s array
    // l boolean

    var newAngle;//S;
    var arcLength;//c;
    var textMinDim;
    var polyPoints = [];

    // start point
    var pointStart = { x: 0, y: 0 };// d = { x: 0, y: 0 };

    // end point
    var pointEnd = { x: 0, y: 0 };// D = { x: 0, y: 0 };
    var arrowPoint = { x: 0, y: 0 };
    var textDim = { x: 0, y: 0, width: 0, height: 0 };
    var textGap = 0;//m = 0;
    var isFitArc = false;// !1;
    var y = 0;

    var isStdOff = false;// f = !1;

    // GetTextMinDimensions {width: 0, height: 0}

    textMinDim = textShape.GetTextMinDimensions();
    textDim.height = textMinDim.height;
    textDim.width = textMinDim.width;

    polyPoints.push(new Point(startPoint.x, startPoint.y));
    polyPoints.push(new Point(endPoint.x, endPoint.y));

    newAngle = 360 - angle;

    // this expression calculates the length of the arc on a unit circle that corresponds to an angle S measured in degrees.
    arcLength = 2 * Math.PI * (newAngle / 360);
    Utils3.RotatePointsAboutCenter(this.Frame, - arcLength, polyPoints);

    if (polyPoints[0].x < polyPoints[1].x) {
      pointStart = $.extend(true, {}, polyPoints[0]);
      pointEnd = $.extend(true, {}, polyPoints[1]);
    }
    else {
      pointStart = $.extend(true, {}, polyPoints[1]);
      pointEnd = $.extend(true, {}, polyPoints[0]);

    }

    // polyPoints[0].x < polyPoints[1].x ?
    //   (pointStart = $.extend(!0, {}, polyPoints[0]), pointEnd = $.extend(!0, {}, polyPoints[1]))

    //   : (pointStart = $.extend(!0, {}, polyPoints[1]), pointEnd = $.extend(!0, {}, polyPoints[0]));


    textDim.x = pointStart.x + (pointEnd.x - pointStart.x) / 2;
    textDim.y = pointStart.y + (pointEnd.y - pointStart.y) / 2;
    textDim.x -= textDim.width / 2;
    textDim.y -= textDim.height / 2;
    textDim.y -= textDim.height / 2;

    const check1 = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior || this.StyleRecord &&
      this.StyleRecord.Line && this.StyleRecord.Line.Thickness;

    if (check1) {
      (textDim.y -= this.StyleRecord.Line.Thickness);
    }

    // f = 0 != (
    //   this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff
    // ) &&
    //   this.CanUseStandOffDimensionLines();

    const stdOffFlag = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff;

    // f = 0 != (stdOffFlag ) &&  this.CanUseStandOffDimensionLines();

    isStdOff = stdOffFlag != 0 && this.CanUseStandOffDimensionLines();


    const isHideHookedObjDimensions = this.Dimensions & ConstantData.DimensionFlags.SED_DF_HideHookedObjDimensions;

    const check3 = !isStandoff && !isHideHookedObjDimensions && this instanceof Instance.Shape.BaseLine &&
      this.ShortRef != ConstantData2.LineTypes.SED_LS_MeasuringTape &&
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL;


    if (

      /*
      !isStandoff && !(isHideHookedObjDimensions) &&
      // this instanceof ListManager.BaseLine &&
      // Double === TODO
      // this instanceof GlobalDataShape.BaseLine &&
      this instanceof Instance.Shape.BaseLine &&
      this.ShortRef != ConstantData2.LineTypes.SED_LS_MeasuringTape &&
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
      */

      check3
    ) {
      // var L = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !1);
      // if (L) GlobalData.optManager.FindLink(L, this.BlockID, !0) >= 0 &&
      //   (isStdOff = !0)

      var linkObject = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, false);
      if (linkObject) {

        const fdLink = GlobalData.optManager.FindLink(linkObject, this.BlockID, !0);
        if (fdLink >= 0) {
          isStdOff = true;
        }
      }
    }


    // isStandoff &&
    //   (isStdOff = !1);

    if (isStandoff) {
      isStdOff = false;
    }

    // var I = isStdOff ? ConstantData.Defines.DimensionDefaultStandoff : ConstantData.Defines.DimensionDefaultNonStandoff;

    // Double set the stdoff to coordindateLine std off
    //  const stdOffNum = isStdOff ? ConstantData.Defines.DimensionDefaultStandoff : ConstantData.Defines.DimensionDefaultNonStandoff;

    const stdOffNum = isStdOff ? ConstantData.Defines.CoordinateLineDefaultStandoff : ConstantData.Defines.CoordinateLineDefaultNonStandoff;

    // if (
    //   textDim.y -= stdOffNum,
    //   m = ConstantData.Defines.DimensionDefaultTextGap,
    //   this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior ||
    //   this.StyleRecord &&
    //   this.StyleRecord.Line &&
    //   this.StyleRecord.Line.Thickness &&
    //   (m += this.StyleRecord.Line.Thickness),
    //   // this instanceof ListManager.BaseLine &&
    //   // Double === TODO
    //   // this instanceof GlobalDataShape.BaseLine &&
    //   this instanceof Instance.Shape.BaseLine &&
    //   (!this.polylist || 2 === this.polylist.segs.length)
    // ) {
    //   var T = Math.floor((arcLength - 0.01) / (Math.PI / 2));
    //   C = 1 == T ||
    //     2 == T
    // } else if (this.polylist && !this.polylist.closed && isStandoff) {
    //   var b = [
    //     (
    //       polyPoints = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null)
    //     )[segmentIndex - 1],
    //     polyPoints[segmentIndex]
    //   ];
    //   GlobalData.optManager.RotatePointsAboutCenter(this.Frame, - arcLength, b),
    //     b.push({
    //       x: textDim.x + textDim.width / 2,
    //       y: textDim.y + textDim.height / 2
    //     }),
    //     b[2].x = b[0].x + (b[1].x - b[0].x) / 2,
    //     GlobalData.optManager.RotatePointsAboutCenter(this.Frame, arcLength, b),
    //     Utils2.IsPointInPoly(polyPoints, b[2]) &&
    //     (C = !0)
    // } else this.IsTextFrameOverlap(textDim, angle) &&
    //   (C = !0);
    // C &&
    //   (
    //     textDim.y += stdOffNum,
    //     textDim.y += textDim.height,
    //     this.StyleRecord &&
    //     this.StyleRecord.Line &&
    //     this.StyleRecord.Line.Thickness &&
    //     (textDim.y += 2 * this.StyleRecord.Line.Thickness),
    //     textDim.y += stdOffNum
    //   );


    // TODO
    textDim.y -= stdOffNum;

    // move the text up
    // textDim.y += stdOffNum / 2;
    // textDim.y += textDim.height / 2;

    // m = ConstantData.Defines.DimensionDefaultTextGap;
    textGap = ConstantData.Defines.CoordinateLineDefaultTextGap;//3

    const check4 = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior || this.StyleRecord &&
      this.StyleRecord.Line && this.StyleRecord.Line.Thickness;

    if (check4) {
      (textGap += this.StyleRecord.Line.Thickness);
    }

    const check5 = this instanceof Instance.Shape.BaseLine &&
      (!this.polylist || 2 === this.polylist.segs.length);

    if (
      // textDim.y -= stdOffNum,
      // m = ConstantData.Defines.DimensionDefaultTextGap,
      // this.Dimensions & ConstantData.DimensionFlags.SED_DF_Exterior ||
      // this.StyleRecord &&
      // this.StyleRecord.Line &&
      // this.StyleRecord.Line.Thickness &&
      // (m += this.StyleRecord.Line.Thickness),
      // this instanceof Instance.Shape.BaseLine &&
      // (!this.polylist || 2 === this.polylist.segs.length)

      check5
    ) {

      // The entire expression calculates how many π/2 segments fit into the adjusted arcLength, rounding down to the nearest whole number. This could be useful in scenarios where you need to determine the number of complete right-angle segments in an arc.
      var fitArcSegments = Math.floor((arcLength - 0.01) / (Math.PI / 2));
      isFitArc = 1 == fitArcSegments || 2 == fitArcSegments;
    } else if (this.polylist && !this.polylist.closed && isStandoff) {
      var b = [
        (polyPoints = this.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !0, !1, null))[segmentIndex - 1],
        polyPoints[segmentIndex]
      ];
      Utils3.RotatePointsAboutCenter(this.Frame, -arcLength, b);
      b.push({
        x: textDim.x + textDim.width / 2,
        y: textDim.y + textDim.height / 2
      });
      b[2].x = b[0].x + (b[1].x - b[0].x) / 2;
      Utils3.RotatePointsAboutCenter(this.Frame, arcLength, b);
      Utils2.IsPointInPoly(polyPoints, b[2]) && (isFitArc = !0);
    } else if (this.IsTextFrameOverlap(textDim, angle)) {
      isFitArc = !0;
    }
    if (isFitArc) {
      textDim.y += stdOffNum;
      textDim.y += textDim.height;
      if (this.StyleRecord && this.StyleRecord.Line && this.StyleRecord.Line.Thickness) {
        textDim.y += 2 * this.StyleRecord.Line.Thickness;
      }
      textDim.y += stdOffNum;
    }











    let isStdOff2 = false; //M

    var stdOffFlag2 = this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff;

    if (stdOffFlag2 && !this.CanUseStandOffDimensionLines()) {
      isStdOff2 = false;
    }

    if (isStandoff) {
      isStdOff2 = false;
    }

    if (isStdOff2) {
      if (
        (this instanceof Instance.Shape.PolyLine || this instanceof Instance.Shape.Polygon) &&
        this.polylist &&
        this.polylist.segs &&
        this.polylist.segs.length > segmentIndex
      ) {
        y = this.polylist.segs[segmentIndex].dimDeflection;
      } else if (this instanceof Instance.Shape.BaseLine) {
        y = this.dimensionDeflectionH ? this.dimensionDeflectionH : 0;
      } else {
        y = Math.abs(angle % 180) < 5 ? this.dimensionDeflectionH : this.dimensionDeflectionV || 0;
      }

      if (isFitArc) {
        textDim.y += y;
      } else {
        textDim.y -= y;
      }

      if (this.polylist && this.polylist.segs && this.polylist.segs.length > segmentIndex) {
        this.polylist.segs[segmentIndex].dimTextAltPositioning = isFitArc;
      }
    }

    this.Frame2Poly(textDim, textFramePoints);

    if (this.Dimensions & stdOffFlag2) {

      // Double temp point {x:0,y:0}
      // 1st----------------2nd--- txtdim  1st---------------
      // just take 2 points for each arrow (left and right)

      // left arrow's 1st point
      // pointStart {x:0,y:0}
      arrowPoint.x = pointStart.x;
      arrowPoint.y = pointStart.y > textDim.y ? pointStart.y - textGap : pointStart.y + textGap;
      leftArrowPoints.push(new Point(arrowPoint.x, arrowPoint.y));

      // left arrow's 2nd point  up-line

      // arrowPoint.y = textDim.y + textDim.height / 2;

      // TODO do not add this point
      //leftArrowPoints.push(new Point(arrowPoint.x, arrowPoint.y));

      // left arrow's 3rd point
      arrowPoint.x = textDim.x - ConstantData.Defines.CoordinateLineDefaultTextGap;
      leftArrowPoints.push(new Point(arrowPoint.x, arrowPoint.y));


      // right arrow's 1st point
      arrowPoint.x = textDim.x + textDim.width + ConstantData.Defines.CoordinateLineDefaultTextGap;
      rightArrowPoints.push(new Point(arrowPoint.x, arrowPoint.y));

      // right arrow's 2nd point
      arrowPoint.x = pointEnd.x;

      // TODO do not add this point
      // rightArrowPoints.push(new Point(arrowPoint.x, arrowPoint.y));

      // right arrow's 3rd point
      arrowPoint.y = pointEnd.y > textDim.y ? pointEnd.y - textGap : pointEnd.y + textGap;
      rightArrowPoints.push(new Point(arrowPoint.x, arrowPoint.y));

    } else {
      var P = 0.5 * textDim.height;
      var R = 0.5 * P;

      arrowPoint.x = textDim.x - R;
      arrowPoint.y = textDim.y + (textDim.height - P) / 2;
      leftArrowPoints.push(new Point(arrowPoint.x, arrowPoint.y));
      arrowPoint.y += P;
      leftArrowPoints.push(new Point(arrowPoint.x, arrowPoint.y));
      arrowPoint.x -= P;
      arrowPoint.y = textDim.y + textDim.height / 2;
      leftArrowPoints.push(new Point(arrowPoint.x, arrowPoint.y));
      leftArrowPoints.push(new Point(leftArrowPoints[0].x, leftArrowPoints[0].y));
      arrowPoint.x = textDim.x + textDim.width + R;
      arrowPoint.y = textDim.y + (textDim.height - P) / 2;
      rightArrowPoints.push(new Point(arrowPoint.x, arrowPoint.y));
      arrowPoint.y += P;
      rightArrowPoints.push(new Point(arrowPoint.x, arrowPoint.y));
      arrowPoint.x += P;
      arrowPoint.y = textDim.y + textDim.height / 2;
      rightArrowPoints.push(new Point(arrowPoint.x, arrowPoint.y));
      rightArrowPoints.push(new Point(rightArrowPoints[0].x, rightArrowPoints[0].y));
    }


    Utils3.RotatePointsAboutCenter(this.Frame, arcLength, textFramePoints);
    Utils3.RotatePointsAboutCenter(this.Frame, arcLength, leftArrowPoints);
    Utils3.RotatePointsAboutCenter(this.Frame, arcLength, rightArrowPoints);


  }


  // CreateDimensionLineSegment(e, t, a, r) {

  //   var i = 0;
  //   for (i = 0; i < a.length; i++) 0 === i ? e.MoveTo(a[i].x, a[i].y) : e.LineTo(a[i].x, a[i].y),
  //     (a[i].x < r.left || - 1 == r.left) &&
  //     (r.left = a[i].x),
  //     a[i].x > r.right &&
  //     (r.right = a[i].x),
  //     (a[i].y < r.top || - 1 == r.top) &&
  //     (r.top = a[i].y),
  //     a[i].y > r.bottom &&
  //     (r.bottom = a[i].y)
  // }


  CreateDimensionLineSegment(pathCreator, path, points, bounds) {

    // console.log('=== wall CreateDimensionLineSegment pathCreator', pathCreator);
    console.log('=== wall ========================================================');
    console.log('=== wall CreateDimensionLineSegment path,points,bounds', path, points, bounds);

    for (let i = 0; i < points.length; i++) {
      if (i === 0) {
        pathCreator.MoveTo(points[i].x, points[i].y);
      } else {
        pathCreator.LineTo(points[i].x, points[i].y);
      }

      if (points[i].x < bounds.left || bounds.left === -1) {
        bounds.left = points[i].x;
      }
      if (points[i].x > bounds.right) {
        bounds.right = points[i].x;
      }
      if (points[i].y < bounds.top || bounds.top === -1) {
        bounds.top = points[i].y;
      }
      if (points[i].y > bounds.bottom) {
        bounds.bottom = points[i].y;
      }
    }
  }

  CreateCoordinateLineSegment(pathCreator, path, points, bounds) {

    // console.log('=== wall CreateDimensionLineSegment pathCreator', pathCreator);
    // console.log('=== wall ========================================================');
    console.log('=== wall CreateCoordinateLineSegment points/bounds', points, bounds);

    for (let i = 0; i < points.length; i++) {
      if (i === 0) {
        pathCreator.MoveTo(points[i].x, points[i].y);
      } else {
        pathCreator.LineTo(points[i].x, points[i].y);
      }

      if (points[i].x < bounds.left || bounds.left === -1) {
        bounds.left = points[i].x;
      }
      if (points[i].x > bounds.right) {
        bounds.right = points[i].x;
      }
      if (points[i].y < bounds.top || bounds.top === -1) {
        bounds.top = points[i].y;
      }
      if (points[i].y > bounds.bottom) {
        bounds.bottom = points[i].y;
      }
    }
  }






  CreateDimensionLineArrowHead(e, t, a, r, i) {
    console.log('=== wall CreateDimensionLineArrowHead e,t,a,r,i', e, t, a, r, i);
    var n,
      o,
      s = new Rectangle(0, 0, 0, 0),
      l = Utils1.DeepCopy(a);
    for (o = l.length, n = 0; n < o; n++) r.left = Math.min(r.left, l[n].x),
      r.right = Math.max(r.right, l[n].x),
      r.top = Math.min(r.top, l[n].y),
      r.bottom = Math.max(r.right, l[n].y);
    for (Utils2.GetPolyRect(s, l), n = 0; n < o; n++) l[n].x -= s.x,
      l[n].y -= s.y;
    var S = GlobalData.optManager.svgDoc.CreateShape(Document.CreateShapeType.POLYGON);
    S.SetPoints(a),
      S.SetEventBehavior(Element.EventBehavior.ALL),
      S.SetID(ConstantData.SVGElementClass.DIMENSIONLINE),
      S.SetPos(0, 0),
      S.SetSize(s.width, s.height),
      S.SetFillColor('black'),
      Utils2.HasFlag(
        this.Dimensions,
        ConstantData.DimensionFlags.SED_DF_Select
      ) &&
      S.ExcludeFromExport(!0),
      i &&
      S.SetUserData(i),
      e.AddElement(S)
  }

  ConvertToNative(e, t) {
    return null
  }

  ContainsText() {
    return this.DataID >= 0 ||
      GlobalData.optManager.SD_GetVisioTextChild(this.BlockID) >= 0
  }

  GetToUnits() {
    //'use strict';
    var e = GlobalData.docHandler.DocObject().GetWorkArea().docDpi,
      t = 0;
    return e = GlobalData.docHandler.rulerSettings.major,
      t = GlobalData.docHandler.rulerSettings.majorScale / e,
      GlobalData.docHandler.rulerSettings.useInches ||
      (t *= GlobalData.docHandler.rulerSettings.metricConv),
      t
  }

  GetLengthInUnits(e, t) {
    //'use strict';
    var a = 0,
      r = 0;
    return a = e * this.GetToUnits(),
      t ||
      (
        r = Math.pow(10, GlobalData.docHandler.rulerSettings.dp),
        a = Math.round(a * r) / r
      ),
      a
  }

  GetFractionStringGranularity(e) {
    //'use strict';
    return GlobalData.docHandler.rulerSettings.fractionaldenominator >= 1 ? 1 / GlobalData.docHandler.rulerSettings.fractionaldenominator : GlobalData.docHandler.rulerSettings.majorScale <= 1 ? 1 / 16 : GlobalData.docHandler.rulerSettings.majorScale <= 2 ? 1 / 8 : GlobalData.docHandler.rulerSettings.majorScale <= 4 ? 1 / 4 : GlobalData.docHandler.rulerSettings.majorScale <= 8 ? 0.5 : 1
  }

  NumberIsFloat(e) {
    var t,
      a,
      r = '9'.charCodeAt(0),
      i = '0'.charCodeAt(0),
      n = '.'.charCodeAt(0);
    for (t = 0; t < e.length; t++) if (!((a = e.charCodeAt(t)) <= r && a >= i || a == n)) return !1;
    return !0
  }

  ParseInchesString(e) {
    //'use strict';
    var t,
      a,
      r = 0,
      i = - 1;
    return e.Trim(),
      (a = e.indexOf(' ')) >= 0 ? (
        t = e.substring(a + 1),
        r = r.substring(0, a).toFixed(),
        (i = t.indexOf('/')) >= 0 &&
        (r += t.substring(0, i).toFixed() / t.substring(i).toFixed())
      ) : r = e.toFixed(),
      r
  }

  ConvertToFeet(e) {
    //'use strict';
    var t,
      a = '',
      r = '',
      i = '',
      n = 0,
      o = 0,
      s = [],
      l = 0,
      S = 0;
    return (t = (e = e.trim()).indexOf('\'')) >= 0 &&
      t < e.length - 1 &&
      ' ' != e.charAt(t + 1) &&
      (e = e.substr(0, t + 1) + ' ' + e.substr(t + 1)),
      (s = e.split(' '))[s.length - 1].indexOf('/') >= 0 ? (
        a = s[s.length - 1],
        s.length >= 2 &&
        '\'' == (r = s[s.length - 2]).substr(r.length - 1, 1) &&
        (i = s[s.length - 2], r = ''),
        s.length >= 3 &&
        (i = s[s.length - 3])
      ) : 2 == s.length ? (i = s[0], r = s[1]) : '"' == s[0].charAt(s[0].length - 1) ? r = s[0] : i = s[0],
      '\'' == i.charAt(i.length - 1) &&
      (i = i.substring(0, i.length - 1)),
      '"' == r.charAt(r.length - 1) &&
      (r = r.substring(0, r.length - 1)),
      '"' == a.charAt(a.length - 1) &&
      (a = a.substring(0, a.length - 1)),
      i.length > 0 &&
      (n = parseFloat(i)),
      r.length > 0 &&
      (o = parseFloat(r)),
      a.length > 0 &&
      (
        s = a.split('/'),
        l = parseInt(s[0], 10),
        S = parseInt(s[1], 10),
        0 !== l &&
        0 !== S &&
        (o += l / S)
      ),
      o >= 12 &&
        0 === n ? this.Dimensions = Utils2.SetFlag(
          this.Dimensions,
          ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches,
          !0
        ) : n > 0 &&
      (
        this.Dimensions = Utils2.SetFlag(
          this.Dimensions,
          ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches,
          !1
        )
      ),
      n += o / 12
  }

  UnitsToCoord(e, t) {
    //'use strict';
    GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    var a = this.GetToUnits();
    return e += t * GlobalData.docHandler.rulerSettings.majorScale,
      e /= a
  }

  ConvToUnits(e, t) {
    //'use strict';
    GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    return e * this.GetToUnits() - t * GlobalData.docHandler.rulerSettings.majorScale
  }

  Frame2Poly(frame, polyPoints) {

    // left bottom
    polyPoints.push(new Point(frame.x, frame.y));

    // right bottom
    polyPoints.push(new Point(frame.x + frame.width, frame.y));

    // right top
    polyPoints.push(new Point(frame.x + frame.width, frame.y + frame.height));

    // left top
    polyPoints.push(new Point(frame.x, frame.y + frame.height));
  }

  SetBackgroundImageURL(e) {
  }

  WriteSDFAttributes(e, t) {
  }

  CalcTextPosition(e) {
  }

  SetBlobBytes(e, t) {
    var a = new ListManager.BlobBytes(t, e);
    if (this.BlobBytesID >= 0) {
      var r = GlobalData.objectStore.PreserveBlock(this.BlobBytesID);
      r &&
        (r.Data = a)
    } else {
      var i = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, a);
      i &&
        (this.BlobBytesID = i.ID)
    }
  }

  SetEMFBlobBytes(e, t) {
    var a = new ListManager.BlobBytes(t, e);
    if (this.EMFBlobBytesID >= 0) {
      var r = GlobalData.objectStore.PreserveBlock(this.EMFBlobBytesID);
      r &&
        (r.Data = a)
    } else {
      var i = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, a);
      i &&
        (this.EMFBlobBytesID = i.ID)
    }
  }

  SetOleBlobBytes(e, t) {
    var a = new ListManager.BlobBytes(t, e);
    if (this.OleBlobBytesID >= 0) {
      var r = GlobalData.objectStore.PreserveBlock(this.OleBlobBytesID);
      r &&
        (r.Data = a)
    } else {
      var i = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, a);
      i &&
        (this.OleBlobBytesID = i.ID)
    }
  }

  GetBlobBytes() {
    var e = null;
    return this.BlobBytesID >= 0 &&
      (e = GlobalData.optManager.GetObjectPtr(this.BlobBytesID, !1)),
      e
  }

  GetEMFBlobBytes() {
    var e = null;
    return this.EMFBlobBytesID >= 0 &&
      (e = GlobalData.optManager.GetObjectPtr(this.EMFBlobBytesID, !1)),
      e
  }

  GetOleBlobBytes() {
    var e = null;
    return this.OleBlobBytesID >= 0 &&
      (e = GlobalData.optManager.GetObjectPtr(this.OleBlobBytesID, !1)),
      e
  }

  GetTable(e) {
    var t = null;
    return null == e &&
      (e = !1),
      this.TableID >= 0 &&
      (t = GlobalData.optManager.GetObjectPtr(this.TableID, e)),
      t
  }

  SetTable(e) {
    if (this.TableID >= 0) if (null == e) {
      var t = GlobalData.objectStore.GetObject(this.TableID);
      t &&
        t.Delete(),
        this.TableID = - 1
    } else {
      var a = GlobalData.objectStore.PreserveBlock(this.TableID);
      a &&
        (a.Data = e)
    } else {
      var r = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.TABLE_OBJECT, e);
      r &&
        (this.TableID = r.ID)
    }
  }

  GetGraph(e) {
    var t = null;
    return null == e &&
      (e = !1),
      this.GraphID >= 0 &&
      (t = GlobalData.optManager.GetObjectPtr(this.GraphID, e)),
      t
  }

  SetGraph(e) {
    if (this.GraphID >= 0) if (null == e) {
      var t = GlobalData.objectStore.GetObject(this.GraphID);
      t &&
        t.Delete(),
        this.GraphID = - 1
    } else {
      var a = GlobalData.objectStore.PreserveBlock(this.GraphID);
      a &&
        (a.Data = e)
    } else {
      var r = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.GRAPH_OBJECT, e);
      r &&
        (this.GraphID = r.ID)
    }
  }

  GetGanttInfo(e) {
    var t = null;
    return null == e &&
      (e = !1),
      this.GanttInfoID >= 0 &&
      (t = GlobalData.optManager.GetObjectPtr(this.GanttInfoID, e)),
      t
  }



  Flip(e) {
  }

  NoFlip() {
    return !!this.hooks.length
  }

  NoRotate() {
    return !1
  }

  NoGrow() {
    return (
      this.colorfilter & FileParser.SDRColorFilters.SD_NOCOLOR_RESIZE
    ) > 0
  }

  MaintainPoint(e, t, a, r, i) {
    return !1
  }

  AllowTextEdit() {
    if ((this.TextFlags & ConstantData.TextFlags.SED_TF_None) > 0) return !1;
    if (
      this.objecttype === ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER &&
      0 == (this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA) &&
      0 == (this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB)
    ) return !1;
    if (this.flags & ConstantData.ObjFlags.SEDO_Lock) return !1;
    if (this.FromEditShapeOutline) return !1;
    var e = this.GetTable(!1);
    if (e) {
      var t = - 1;
      return GlobalData.optManager.Table_GetActiveID() === e.BlockID &&
        (t = e.select),
        !(t < 0 && (t = GlobalData.optManager.Table_GetFirstTextCell(e)) < 0) &&
        GlobalData.optManager.Table_AllowCellTextEdit(e, t)
    }
    return !0
  }

  AllowDoubleClick() {
    return !1
  }

  ChangeBackgroundColor(e, t) {
    return !1
  }

  UseEdges(e, t, a, r, i, n) {
    return !1
  }

  ApplyStyle(e, t) {
    var a = Utils1.DeepCopy(e),
      r = Resources.FindStyle(ConstantData.Defines.TextBlockStyle);
    if (
      this.objecttype !== ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART &&
      !(
        this.colorfilter & FileParser.SDRColorFilters.SD_NOCOLOR_STYLE
      )
    ) {
      var i = {
        Color: a.Text.Paint.Color
      },
        n = {
          color: a.Text.Paint.Color
        };
      t &&
        (
          this.DrawingObjectBaseClass !== ConstantData.DrawingObjectBaseClass.SHAPE &&
            this.objecttype !== ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR ? (
            a.Fill = Utils1.DeepCopy(this.StyleRecord.Fill),
            a.Text = Utils1.DeepCopy(r.Text),
            i = {
              Color: r.Text.Paint.Color
            },
            n = {
              color: r.Text.Paint.Color
            }
          ) : this.UseTextBlockColor() &&
          (
            a.Text = Utils1.DeepCopy(r.Text),
            i = {
              Color: r.Text.Paint.Color
            },
            n = {
              color: r.Text.Paint.Color
            }
          ),
          this.StyleRecord.Fill.Paint.FillType === ConstantData.FillTypes.SDFILL_TRANSPARENT &&
          (
            a.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
            a.Fill.Hatch = 0
          ),
          0 === this.StyleRecord.Line.Thickness &&
          (a.Line.Thickness = 0),
          0 === a.Line.LinePattern &&
          (a.Line.LinePattern = this.StyleRecord.Line.LinePattern)
        ),
        a.Fill.Paint.Opacity = this.StyleRecord.Fill.Paint.Opacity,
        a.Fill.Paint.EndOpacity = this.StyleRecord.Fill.Paint.EndOpacity,
        a.Line.Paint.Opacity = this.StyleRecord.Line.Paint.Opacity,
        a.Line.Paint.EndOpacity = this.StyleRecord.Line.Paint.EndOpacity,
        a.Text.Paint.Opacity = this.StyleRecord.Text.Paint.Opacity,
        a.Text.Paint.EndOpacity = this.StyleRecord.Text.Paint.EndOpacity,
        this.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR &&
        (
          a.Line.BThick = this.StyleRecord.Line.BThick,
          a.Line.Thickness = this.StyleRecord.Line.Thickness,
          a.Line.Paint.Color = a.Fill.Paint.Color,
          a.Line.Paint.EndColor = a.Fill.Paint.EndColor
        ),
        this.ChangeTextAttributes(n, i),
        this.StyleRecord = a
    }
  }

  GenericIcon(e) {
    var t = e.svgDoc.CreateShape(Document.CreateShapeType.IMAGE);
    return null != e.userData ? t.SetUserData(e.userData) : t.SetUserData(ConstantData.SVGElementClass.ICON),
      t.SetSize(e.iconSize, e.iconSize),
      t.SetPos(e.x, e.y),
      t.SetURL(e.imageURL),
      t.SetFillOpacity(1),
      t.SetStrokeWidth(0),
      t.SetID(e.iconID),
      t.SetCursor(e.cursorType),
      t.ExcludeFromExport(!0),
      t
  }

  AddIcon(e, t, a) {
    if (t) {
      var r = this.Frame;
      this.nIcons;
      a.x = r.width - this.iconShapeRightOffset - this.iconSize - this.nIcons * this.iconSize,
        a.y = r.height - this.iconShapeBottomOffset - this.iconSize;
      var i = this.GenericIcon(a);
      return this.nIcons++,
        t.AddElement(i),
        i
    }
  }

  GetIconShape() {
    return this.BlockID
  }

  HasIcons() {
    if (this.bInGroup) return !1;
    var e = !1;
    this.HasFieldData() &&
      this.fieldDataElemID >= 0 &&
      !SDUI.Commands.MainController.DataPanel.GetHideIconState() &&
      (e = !0);
    var t = !1;
    return this.datasetElemID >= 0 &&
      (
        this.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASKMAP ||
        this.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASK
      ) &&
      (
        s = ListManager.SDData.GetValue(
          this.datasetElemID,
          ListManager.GanttFieldNameList[ListManager.GanttTaskFields.TASK_TRELLO_CARD_URL]
        ),
        s &&
        s.length &&
        (t = !0)
      ),
      !!(
        this.dataStyleOverride &&
        this.dataStyleOverride.iconID ||
        this.CommentID >= 0 ||
        t ||
        e ||
        this.HyperlinkText &&
        Utils1.ResolveHyperlink(this.HyperlinkText) ||
        - 1 != this.NoteID ||
        GlobalData.optManager.NoteIsShowing(this.BlockID, null)
      )
  }

  AddIcons(e, t) {
    if (t) {
      this.nIcons = 0;
      var a = {
        svgDoc: e,
        iconSize: this.iconSize,
        cursorType: Element.CursorType.POINTER
      };
      if (this.dataStyleOverride && this.dataStyleOverride.iconID) {
        var r = Resources.ActionIcons[this.dataStyleOverride.iconID];
        if (r) {
          a.iconID = ConstantData.ShapeIconType.DATAACTION,
            a.imageURL = r,
            a.x = this.Frame.width - this.iconSize,
            a.y = 0;
          var i = this.GenericIcon(a);
          i.ExcludeFromExport(!1),
            t.AddElement(i)
        }
      }
      if (this.nIcons = 0, !this.bInGroup) {
        if (this.CommentID >= 0) {
          a.iconID = ConstantData.ShapeIconType.COMMENT,
            a.imageURL = Constants.FilePath_Icons + Constants.Icon_Comment;
          var n = this.AddIcon(e, t, a),
            o = ConstantData.SVGElementClass.ICON + '.' + this.BlockID;
          n.SetUserData(o)
        }
        if (
          this.datasetElemID >= 0 &&
          (
            this.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASKMAP ||
            this.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASK
          ) &&
          (
            s = ListManager.SDData.GetValue(
              this.datasetElemID,
              ListManager.GanttFieldNameList[ListManager.GanttTaskFields.TASK_TRELLO_CARD_URL]
            ),
            s &&
            s.length &&
            (
              a.iconID = ConstantData.ShapeIconType.TRELLOLINK,
              a.imageURL = Constants.FilePath_Icons + Constants.Icon_TrelloLink,
              this.AddIcon(e, t, a)
            )
          ),
          this.HyperlinkText &&
          Utils1.ResolveHyperlink(this.HyperlinkText)
        ) {
          a.iconID = ConstantData.ShapeIconType.HYPERLINK,
            a.imageURL = Constants.FilePath_Icons + Constants.Icon_Hyperlink;
          var l = this.AddIcon(e, t, a);
          l.SetHyperlinkAttribute(this.HyperlinkText),
            l.SetTooltip(
              Utils1.ResolveHyperlinkForDisplay(this.HyperlinkText)
            )
        }
        if (
          this.AttachmentInfo &&
          (
            a.iconID = ConstantData.ShapeIconType.ATTACHMENT,
            a.imageURL = '../../../Styles/Img/Icons/attachment_icon.png',
            this.AddIcon(e, t, a)
          ),
          this.ExpandedViewID >= 0
        ) a.iconID = ConstantData.ShapeIconType.EXPANDEDVIEW,
          a.imageURL = Constants.FilePath_Icons + Constants.Icon_ExpandedView,
          (S = this.AddIcon(e, t, a)).SetCustomAttribute('_expextendtt_', this.ExpandedViewID);
        if (
          - 1 != this.NoteID ||
          GlobalData.optManager.NoteIsShowing(this.BlockID, null)
        ) {
          var S,
            c;
          a.iconID = ConstantData.ShapeIconType.NOTES,
            a.imageURL = Constants.FilePath_Icons + Constants.Icon_Note,
            this.moreflags & ConstantData.ObjMoreFlags.SED_MF_UseInfoNoteIcon &&
            (
              a.imageURL = Constants.FilePath_Icons + Constants.Icon_Info
            ),
            (S = this.AddIcon(e, t, a)).SetCustomAttribute('_expnotett_', this.NoteID);
          var u = this,
            p = function () {
              GlobalData.optManager.bInNoteEdit ||
                GlobalData.optManager.ShowNote(u.BlockID, null)
            },
            d = S.DOMElement();
          $(d).hover(
            (function () {
              c = setTimeout(p, 750, u)
            }),
            (
              function () {
                GlobalData.optManager.bInNoteEdit ||
                  GlobalData.optManager.HideNote(u.BlockID, null),
                  clearTimeout(c)
              }
            )
          )
        }
        if (
          this.HasFieldData() &&
          this.fieldDataElemID >= 0 &&
          !SDUI.Commands.MainController.DataPanel.GetHideIconState()
        ) {
          a.iconID = ConstantData.ShapeIconType.FIELDDATA,
            a.imageURL = Constants.FilePath_Icons + Constants.Icon_Info;
          var D = this.AddIcon(e, t, a);
          D.SetCustomAttribute('_expdatatt_', this.BlockID);
          var g = null,
            h = this.BlockID,
            m = function () {
              GlobalData.optManager.FieldedDataTooltipVisible(h) ||
                GlobalData.optManager.ShowFieldedDataTooltip(h),
                g = null
            };
          d = D.DOMElement();
          if (
            $(d).hover(
              (
                function () {
                  GlobalData.optManager.FieldedDataTooltipVisible(h) ||
                    (g = setTimeout(m, 750))
                }
              ),
              (
                function () {
                  GlobalData.optManager.HideFieldedDataTooltip(h),
                    g &&
                    (clearTimeout(g), g = null)
                }
              )
            ),
            !GlobalData.docHandler.IsReadOnly()
          ) {
            var C = Hammer(d);
            C.off('doubletap'),
              C.on(
                'doubletap',
                (
                  function (e) {
                    return Utils2.StopPropagationAndDefaults(e),
                      g &&
                      (clearTimeout(g), g = null),
                      GlobalData.optManager.ShowFieldedDataTooltip(h, !0, !0),
                      !1
                  }
                )
              )
          }
        }
      }
    }
  }

  HideAllIcons(e, t) {
    this.nIcons = 0;
    var a = t.GetElementByID(ConstantData.ShapeIconType.HYPERLINK),
      r = t.GetElementByID(ConstantData.ShapeIconType.TRELLOLINK),
      i = t.GetElementByID(ConstantData.ShapeIconType.NOTES),
      n = t.GetElementByID(ConstantData.ShapeIconType.COMMENT),
      o = t.GetElementByID(ConstantData.ShapeIconType.FIELDDATA);
    a &&
      t.RemoveElement(a),
      r &&
      t.RemoveElement(r),
      i &&
      t.RemoveElement(i),
      n &&
      t.RemoveElement(n),
      o &&
      t.RemoveElement(o)
  }

  GetHyperlink(e) {
    var t,
      a = this.GetTable(!1);
    if (e) {
      if (e.split) {
        var r = e.split('.');
        r[1] &&
          (t = parseInt(r[1], 10))
      }
    } else a &&
      a.select >= 0 &&
      (t = a.select);
    return a &&
      t >= 0 &&
      t < a.cells.length ? a.cells[t].hyperlink : this.HyperlinkText
  }

  IsNoteCell(e) {
    var t,
      a = this.GetTable(!1);
    if (e) {
      if (e.split) {
        var r = e.split('.');
        r[1] &&
          (t = parseInt(r[1], 10))
      }
    } else a &&
      a.select >= 0 &&
      (t = a.select);
    return a &&
      t >= 0 &&
      t < a.cells.length ? a.cells[t] : null
  }

  SetCursors() {
    var e,
      t,
      a,
      r,
      i,
      n,
      o = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID),
      s = !1;
    if (!(this.flags & ConstantData.ObjFlags.SEDO_Lock) && o) if (
      GlobalData.optManager.GetEditMode() === ConstantData.EditState.DEFAULT
    ) {
      if (
        (i = o.GetElementByID(ConstantData.SVGElementClass.SHAPE)) &&
        (
          this.objecttype === ConstantData.ObjectTypes.SD_OBJT_FRAME_CONTAINER ? i.SetCursor(Element.CursorType.DEFAULT) : i.SetCursor(Element.CursorType.ADD)
        ),
        (e = o.GetElementByID(ConstantData.ShapeIconType.HYPERLINK)) &&
        e.SetCursor(Element.CursorType.POINTER),
        (
          e = o.GetElementByID(ConstantData.ShapeIconType.TRELLOLINK)
        ) &&
        e.SetCursor(Element.CursorType.POINTER),
        (e = o.GetElementByID(ConstantData.ShapeIconType.NOTES)) &&
        e.SetCursor(Element.CursorType.POINTER),
        (
          e = o.GetElementByID(ConstantData.ShapeIconType.EXPANDEDVIEW)
        ) &&
        e.SetCursor(Element.CursorType.POINTER),
        (e = o.GetElementByID(ConstantData.ShapeIconType.COMMENT)) &&
        e.SetCursor(Element.CursorType.POINTER),
        (
          e = o.GetElementByID(ConstantData.ShapeIconType.ATTACHMENT)
        ) &&
        e.SetCursor(Element.CursorType.POINTER),
        (e = o.GetElementByID(ConstantData.ShapeIconType.FIELDDATA)) &&
        e.SetCursor(Element.CursorType.POINTER),
        (r = o.GetElementByID(ConstantData.SVGElementClass.SLOP)) &&
        r.SetCursor(Element.CursorType.ADD),
        a = GlobalData.optManager.svgDoc.GetActiveEdit(),
        this.DataID &&
        this.DataID >= 0 &&
        o.textElem &&
        (
          o.textElem === a ? (
            i.SetCursor(Element.CursorType.TEXT),
            o.textElem.SetCursorState(ConstantData.CursorState.EDITLINK)
          ) : o.textElem.SetCursorState(ConstantData.CursorState.LINKONLY)
        ),
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
        this.Dimensions & ConstantData.DimensionFlags.SED_DF_Select &&

        //this.Dimensions === ConstantData.DimensionFlags.SED_DF_Always ||
        // this.Dimensions === ConstantData.DimensionFlags.SED_DF_Select &&

        this.IsSelected()
      ) {
        for (
          n = o.GetElementListWithID(ConstantData.SVGElementClass.DIMENSIONTEXT),
          t = 0;
          t < n.length;
          t++
        ) n[t].SetCursorState(ConstantData.CursorState.EDITONLY),
          n[t] === a &&
          (s = !0);
        s &&
          (i.SetCursor(null), r && r.SetCursor(null))
      }
    } else this.ClearCursors()
  }

  ClearCursors() {
    var e = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    e &&
      (
        e.ClearAllCursors(),
        e.textElem &&
        e.textElem.SetCursorState(ConstantData.CursorState.NONE)
      )
  }

  PostCreateShapeCallback(e, t, a, r) {
    console.log('= S.BaseDrawingObject PostCreateShapeCallback e,t,a,r', e, t, a, r);
  }

  SVGTokenizerHook(e) {
    if (GlobalData.optManager.bTokenizeStyle) {
      var t = this.colorfilter;
      if (
        e = Utils1.DeepCopy(e),
        t == FileParser.SDRColorFilters.SD_NOCOLOR_ALL
      ) return e;
      t & FileParser.SDRColorFilters.SD_NOCOLOR_FILL ||
        (
          e.Fill.Paint.FillType == ConstantData.FillTypes.SDFILL_GRADIENT &&
          (e.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID),
          e.Fill.Paint.Color = Basic.Symbol.CreatePlaceholder(Basic.Symbol.Placeholder.FillColor, e.Fill.Paint.Color)
        ),
        t & FileParser.SDRColorFilters.SD_NOCOLOR_LINE ||
        (
          e.Line.Paint.Color = Basic.Symbol.CreatePlaceholder(Basic.Symbol.Placeholder.LineColor, e.Line.Paint.Color)
        ),
        t & FileParser.SDRColorFilters.SD_NOCOLOR_LINETHICK ||
        (
          e.Line.Thickness = Basic.Symbol.CreatePlaceholder(Basic.Symbol.Placeholder.LineThick, e.Line.Thickness)
        )
    }
    return e
  }

  CancelObjectDraw() {
    return GlobalData.optManager.unbindActionClickHammerEvents(),
      this.ResetAutoScrollTimer(),
      !0
  }

  GetAlignRect() {
    return $.extend(!0, {
    }, this.Frame)
  }

  GetCustomConnectPointsDirection() {
    return null
  }

  GetTextures(e) {
    var t,
      a,
      r = this,
      i = ConstantData.FillTypes.SDFILL_TEXTURE;
    r.StyleRecord.Fill.Paint.FillType === i &&
      (
        t = r.StyleRecord.Fill.Paint.Texture,
        - 1 === e.indexOf(t) &&
        e.push(t)
      ),
      r.StyleRecord.Line.Paint.FillType === i &&
      (
        t = r.StyleRecord.Line.Paint.Texture,
        - 1 === e.indexOf(t) &&
        e.push(t)
      ),
      r.StyleRecord.Text.Paint.FillType === i &&
      (
        t = r.StyleRecord.Text.Paint.Texture,
        - 1 === e.indexOf(t) &&
        e.push(t)
      ),
      (a = r.GetTable(!1)) &&
      GlobalData.optManager.Table_GetTextures(a, e)
  }

  GetContrastingColorName(e) {
    return (
      299 * parseInt(this.StyleRecord.Line.Paint.Color.substr(1, 2), 16) + 587 * parseInt(this.StyleRecord.Line.Paint.Color.substr(3, 2), 16) + 114 * parseInt(this.StyleRecord.Line.Paint.Color.substr(5, 2), 16)
    ) / 1000 >= 128 ? 'black' : 'white'
  }

  SetRuntimeEffects(e) {
    var t = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    t &&
      this.ApplyEffects(t, e, !1)
  }

  ApplyEffects(e, t, a) {
    if (
      (
        e = e ||
        GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID)
      ) &&
      GlobalData.optManager.bDrawEffects &&
      !GlobalData.optManager.bTokenizeStyle
    ) {
      var r = e.GetElementByID(ConstantData.SVGElementClass.SHAPE),
        i = e.shapeGroup ||
          e,
        n = this.StyleRecord.OutsideEffect ? this.StyleRecord.OutsideEffect.OutsideType : 0;
      n === ConstantData2.OutEffect.SDOUT_EFFECT_REFL ||
        n === ConstantData2.OutEffect.SDOUT_EFFECT_CAST ? this.SetEffects(r, t, a, null, !1, a) : (
        a ||
        this.SetEffects(r, t, a, null, !0, !1),
        this.SetEffects(i, t, a, null, !1, !0)
      )
    }
  }

  SetEffects(e, t, a, r, i, n) {
    var o,
      s,
      l = this.Frame,
      S = [],
      c = null;
    e &&
      null != (o = r || this.StyleRecord) &&
      (
        this.dataStyleOverride &&
        this.dataStyleOverride.glowColor &&
        (c = this.dataStyleOverride.glowColor),
        s = this.CalcEffectSettings(l, o, a),
        i ||
        (
          s.outside.type &&
          (
            t &&
            s.outside.type.id == Effects.EffectType.GLOW.id ||
            S.push({
              type: s.outside.type,
              params: s.outside.settings
            })
          ),
          t ? S.push({
            type: Effects.EffectType.GLOW,
            params: {
              color: '#FFD64A',
              size: 4,
              asSecondary: !0
            }
          }) : this.collabGlowColor ? S.push({
            type: Effects.EffectType.GLOW,
            params: {
              color: this.collabGlowColor,
              size: 6,
              asSecondary: !0
            }
          }) : c &&
          S.push({
            type: Effects.EffectType.GLOW,
            params: {
              color: c,
              size: 4,
              asSecondary: !0
            }
          })
        ),
        s.inside.type &&
        !n &&
        S.push({
          type: s.inside.type,
          params: s.inside.settings
        }),
        e.Effects().SetEffects(S, l)
      )
  }

  CalcEffectSettings(e, t, a) {
    var r,
      i,
      n,
      o = e.width,
      s = e.height,
      l = t.Line.Thickness,
      S = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      c = {};
    if (
      a &&
      l < 2 &&
      (l = 2),
      o += l,
      s += l,
      r = Math.min(o, s),
      r = a ? l : Math.min(r, 50),
      c.inside = {},
      c.outside = {},
      t.OutsideEffect &&
      t.OutsideEffect.OutsideType
    ) switch (c.outside.settings = {}, t.OutsideEffect.OutsideType) {
      case ConstantData2.OutEffect.SDOUT_EFFECT_DROP:
        S.left = r * t.OutsideEffect.OutsideExtent_Left,
          S.top = r * t.OutsideEffect.OutsideExtent_Top,
          S.right = r * t.OutsideEffect.OutsideExtent_Right,
          S.bottom = r * t.OutsideEffect.OutsideExtent_Bottom,
          a &&
          (
            S.left &&
            (S.left = Math.min(S.left, 2)),
            S.top &&
            (S.top = Math.min(S.top, 2)),
            S.right &&
            (S.right = Math.min(S.right, 2)),
            S.bottom &&
            (S.bottom = Math.min(S.bottom, 2))
          ),
          c.outside.type = Effects.EffectType.DROPSHADOW,
          c.outside.settings.size = Math.min(Math.max((S.left + S.right) / 2, 2), 50),
          c.outside.settings.xOff = S.right / 2 - S.left / 2,
          c.outside.settings.yOff = S.bottom / 2 - S.top / 2,
          c.outside.settings.color = t.OutsideEffect.Color,
          c.outside.settings.asSecondary = !0,
          S.left = Math.max(- c.outside.settings.xOff + c.outside.settings.size, 0),
          S.top = Math.max(- c.outside.settings.yOff + c.outside.settings.size, 0),
          S.right = Math.max(c.outside.settings.xOff + c.outside.settings.size, 0),
          S.bottom = Math.max(c.outside.settings.yOff + c.outside.settings.size, 0);
        break;
      case ConstantData2.OutEffect.SDOUT_EFFECT_GLOW:
        S.left = S.top = S.right = S.bottom = Math.max(r * t.OutsideEffect.OutsideExtent_Left, 2),
          c.outside.type = Effects.EffectType.GLOW,
          c.outside.settings.size = Math.min(Math.max((S.left + S.right) / 2, 2), 50),
          c.outside.settings.color = t.OutsideEffect.Color,
          c.outside.settings.asSecondary = !0,
          S.left = S.top = S.right = S.bottom = c.outside.settings.size;
        break;
      case ConstantData2.OutEffect.SDOUT_EFFECT_REFL:
        S.left = o * t.OutsideEffect.OutsideExtent_Left,
          S.right = o * t.OutsideEffect.OutsideExtent_Right,
          S.bottom = s * t.OutsideEffect.OutsideExtent_Bottom,
          c.outside.type = Effects.EffectType.REFLECT,
          c.outside.settings.xOff = S.right - S.left,
          c.outside.settings.yOff = S.bottom,
          c.outside.settings.asSecondary = !0,
          i = Element.Effects.CalcSecondaryEffectOffset(c.outside.settings.xOff, c.outside.settings.yOff),
          S.left = Math.max(- i, 0),
          S.right = Math.max(i, 0);
        break;
      case ConstantData2.OutEffect.SDOUT_EFFECT_CAST:
        S.left = o * t.OutsideEffect.OutsideExtent_Left,
          S.right = o * t.OutsideEffect.OutsideExtent_Right,
          S.bottom = s * t.OutsideEffect.OutsideExtent_Bottom,
          c.outside.type = Effects.EffectType.CASTSHADOW,
          c.outside.settings.xOff = S.right - S.left,
          c.outside.settings.yOff = S.bottom,
          c.outside.settings.size = Math.min(Math.max(0.1 * Math.abs(S.bottom), 2), 25),
          c.outside.settings.asSecondary = !0,
          i = Element.Effects.CalcSecondaryEffectOffset(c.outside.settings.xOff, c.outside.settings.yOff),
          S.left = Math.max(- i + c.outside.settings.size, 0),
          S.right = Math.max(i + c.outside.settings.size, 0),
          S.bottom = Math.max(c.outside.settings.yOff + c.outside.settings.size, 0)
    }
    if (t.Fill.FillEffect && !a) switch (r = Math.min(o, s), c.inside.settings = {}, t.Fill.FillEffect) {
      case FileParser.FillEffect.SDFILL_EFFECT_GLOSS:
        switch (
        c.inside.type = Effects.EffectType.GLOSS,
        c.inside.settings.size = Math.min(o, s),
        c.inside.settings.type = Element.Effects.GlossType.SOFT,
        c.inside.settings.dir = Element.Effects.FilterDirection.TOP,
        c.inside.settings.color = t.Fill.EffectColor,
        t.Fill.LParam
        ) {
          case 1:
            c.inside.settings.dir = Element.Effects.FilterDirection.LEFTTOP;
            break;
          case 2:
            c.inside.settings.dir = Element.Effects.FilterDirection.RIGHTTOP;
            break;
          case 3:
            c.inside.settings.dir = Element.Effects.FilterDirection.CENTER
        }
        t.Fill.WParam &&
          (
            c.inside.settings.type = Element.Effects.GlossType.HARD
          );
        break;
      case FileParser.FillEffect.SDFILL_EFFECT_BEVEL:
        switch (
        r = Math.max(Math.min(r, 50) / 10, 2),
        c.inside.type = Effects.EffectType.BEVEL,
        c.inside.settings.size = r,
        c.inside.settings.type = Element.Effects.BevelType.SOFT,
        c.inside.settings.dir = Element.Effects.FilterDirection.LEFTTOP,
        t.Fill.WParam
        ) {
          case 0:
            c.inside.settings.type = Element.Effects.BevelType.HARD;
            break;
          case 1:
            c.inside.settings.type = Element.Effects.BevelType.SOFT;
            break;
          case 2:
            c.inside.settings.type = Element.Effects.BevelType.BUMP
        }
        switch (t.Fill.LParam) {
          case 0:
            c.inside.settings.dir = Element.Effects.FilterDirection.LEFT;
            break;
          case 1:
            c.inside.settings.dir = Element.Effects.FilterDirection.LEFTTOP;
            break;
          case 2:
            c.inside.settings.dir = Element.Effects.FilterDirection.TOP;
            break;
          case 3:
            c.inside.settings.dir = Element.Effects.FilterDirection.RIGHTTOP;
            break;
          case 4:
            c.inside.settings.dir = Element.Effects.FilterDirection.RIGHT;
            break;
          case 5:
            c.inside.settings.dir = Element.Effects.FilterDirection.RIGHTBOTTOM;
            break;
          case 6:
            c.inside.settings.dir = Element.Effects.FilterDirection.BOTTOM;
            break;
          case 7:
            c.inside.settings.dir = Element.Effects.FilterDirection.LEFTBOTTOM;
            break;
          case 8:
            c.inside.settings.dir = Element.Effects.FilterDirection.CENTER
        }
        break;
      case FileParser.FillEffect.SDFILL_EFFECT_INSHADOW:
        r = Math.min(r, 50) / 2,
          t.Fill.WParam ? (((n = t.Fill.WParam) < 0 || n > 100) && (n = 20), r = r * n / 100) : r /= 5,
          c.inside.type = Effects.EffectType.INNERSHADOW,
          c.inside.settings.size = r,
          c.inside.settings.dir = Element.Effects.FilterDirection.LEFTTOP;
        break;
      case FileParser.FillEffect.SDFILL_EFFECT_INGLOW:
        r = Math.min(r, 50) / 2,
          t.Fill.WParam ? (((n = t.Fill.WParam) < 0 || n > 100) && (n = 20), r = r * n / 100) : r /= 5,
          c.inside.type = Effects.EffectType.INNERGLOW,
          c.inside.settings.size = r,
          c.inside.settings.color = t.Fill.EffectColor
    }
    return c.extent = S,
      c
  }

  CreateGradientRecord(e, t, a, r, i) {
    var n = {
      type: Basic.Element.Style.GradientStyle.LINEAR,
      startPos: Basic.Element.Style.GradientPos.LEFTTOP,
      stops: []
    },
      o = {
        color: t,
        opacity: a
      },
      s = {
        color: r,
        opacity: i
      };
    return e & ListManager.GradientStyle.GRAD_REV &&
      (o.color = r, o.opacity = i, s.color = t, s.opacity = a),
      e & ListManager.GradientStyle.GRAD_MIDDLE ? (
        n.stops.push({
          offset: 0,
          color: o.color,
          opacity: o.opacity
        }),
        n.stops.push({
          offset: 50,
          color: s.color,
          opacity: s.opacity
        }),
        n.stops.push({
          offset: 100,
          color: o.color,
          opacity: o.opacity
        })
      ) : (
        n.stops.push({
          offset: 0,
          color: o.color,
          opacity: o.opacity
        }),
        n.stops.push({
          offset: 100,
          color: s.color,
          opacity: s.opacity
        })
      ),
      e & ListManager.GradientStyle.GRAD_RADIAL ? (
        n.type = Basic.Element.Style.GradientStyle.RADIAL,
        n.startPos = Basic.Element.Style.GradientPos.CENTER
      ) : e & ListManager.GradientStyle.GRAD_SHAPE ? (
        n.type = Basic.Element.Style.GradientStyle.RADIALFILL,
        n.startPos = Basic.Element.Style.GradientPos.CENTER
      ) : (
        n.type = Basic.Element.Style.GradientStyle.LINEAR,
        e & ListManager.GradientStyle.GRAD_TLBR ? n.startPos = Basic.Element.Style.GradientPos.LEFTTOP : e & ListManager.GradientStyle.GRAD_TRBL ? n.startPos = Basic.Element.Style.GradientPos.RIGHTTOP : e & ListManager.GradientStyle.GRAD_VERT ? n.startPos = Basic.Element.Style.GradientPos.TOP : e & ListManager.GradientStyle.GRAD_HORIZ ? n.startPos = Basic.Element.Style.GradientPos.LEFT : n.startPos = Basic.Element.Style.GradientPos.LEFTTOP
      ),
      n
  }

  CreateRichGradientRecord(e) {
    var t,
      a,
      r = {
        type: Basic.Element.Style.GradientStyle.LINEAR,
        startPos: Basic.Element.Style.GradientPos.LEFTTOP,
        stops: []
      };
    if (e < 0 || e >= GlobalData.optManager.RichGradients.length) return null;
    switch ((a = GlobalData.optManager.RichGradients[e]).gradienttype) {
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_LINEAR:
        r.type = Basic.Element.Style.GradientStyle.LINEAR,
          r.angle = a.angle;
        break;
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_RADIAL_BR:
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_RECT_BR:
        r.type = Basic.Element.Style.GradientStyle.RADIAL,
          r.startPos = Basic.Element.Style.GradientPos.RIGHTBOTTOM;
        break;
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_RADIAL_BL:
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_RECT_BL:
        r.type = Basic.Element.Style.GradientStyle.RADIAL,
          r.startPos = Basic.Element.Style.GradientPos.LEFTBOTTOM;
        break;
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_RADIAL_CENTER:
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_RECT_CENTER:
        r.type = Basic.Element.Style.GradientStyle.RADIAL,
          r.startPos = Basic.Element.Style.GradientPos.CENTER;
        break;
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_RADIAL_TR:
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_RECT_TR:
        r.type = Basic.Element.Style.GradientStyle.RADIAL,
          r.startPos = Basic.Element.Style.GradientPos.RIGHTTOP;
        break;
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_RADIAL_TL:
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_RECT_TL:
        r.type = Basic.Element.Style.GradientStyle.RADIAL,
          r.startPos = Basic.Element.Style.GradientPos.LEFTTOP;
        break;
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_RADIAL_BC:
        r.type = Basic.Element.Style.GradientStyle.RADIAL,
          r.startPos = Basic.Element.Style.GradientPos.BOTTOM;
        break;
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_RADIAL_TC:
        r.type = Basic.Element.Style.GradientStyle.RADIAL,
          r.startPos = Basic.Element.Style.GradientPos.TOP;
        break;
      case Resources.RichGradientTypes.SDFILL_RICHGRADIENT_SHAPE:
        r.type = Basic.Element.Style.GradientStyle.RADIALFILL,
          r.startPos = Basic.Element.Style.GradientPos.CENTER
    }
    for (t = 0; t < a.stops.length; t++) r.stops.push({
      color: a.stops[t].color,
      opacity: a.stops[t].opacity,
      offset: a.stops[t].stop
    });
    return r
  }

  CalcLineHops(e) {
  }

  AddHopPoint(e, t, a, r, i, n) {
    return {
      bSuccess: !1,
      tindex: - 1
    }
  }

  ResetAutoScrollTimer() {
    - 1 != GlobalData.optManager.autoScrollTimerID &&
      (
        GlobalData.optManager.autoScrollTimer.clearTimeout(GlobalData.optManager.autoScrollTimerID),
        GlobalData.optManager.autoScrollTimer.obj = GlobalData.optManager,
        GlobalData.optManager.autoScrollTimerID = - 1
      )
  }

  GetActionButtons() {
    return null
  }

  GetArrowheadSelection(e) {
    return !1
  }

  SetRolloverActions(e, t) {
    // debugger
    if (
      - 1 != GlobalData.optManager.curHiliteShape &&
      GlobalData.optManager.curHiliteShape != this.BlockID
    ) {
      var a = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.curHiliteShape, !1);
      a &&
        (a.SetRuntimeEffects(!1), a.ClearCursors())
    }
    var r = this;
    GlobalData.optManager.isMobilePlatform ? this.SetRuntimeEffects(!1) : this.SetRuntimeEffects(!0),
      this.SetCursors(),
      GlobalData.optManager.curHiliteShape = this.BlockID,
      t.svgObj.mouseout(
        (
          function () {
            r.SetRuntimeEffects(!1),
              r.ClearCursors(),
              GlobalData.optManager.curHiliteShape === r.BlockID &&
              (GlobalData.optManager.curHiliteShape = - 1)
          }
        )
      )
  }

  CalcCursorForAngle(e, t) {
    var a = Element.CursorType.RESIZE_LR;
    if (
      (e = 10 * Math.round(e / 10)) > 0 &&
        e < 90 ||
        e > 180 &&
        e < 270 ? a = Element.CursorType.NWSE_RESIZE : e > 90 &&
          e < 180 ||
          e > 270 &&
          e < 360 ? a = Element.CursorType.NESW_RESIZE : 90 != e &&
          270 != e ||
      (a = Element.CursorType.RESIZE_TB),
      t
    ) switch (a) {
      case Element.CursorType.RESIZE_LR:
        a = Element.CursorType.RESIZE_TB;
        break;
      case Element.CursorType.RESIZE_TB:
        a = Element.CursorType.RESIZE_LR;
        break;
      case Element.CursorType.NWSE_RESIZE:
        a = Element.CursorType.NESW_RESIZE;
        break;
      case Element.CursorType.NESW_RESIZE:
        a = Element.CursorType.NWSE_RESIZE
    }
    return a
  }

  FoundText(e, t, a) {
    if (this.BlockID === a) return !1;
    if (this.DataID >= 0) {
      var r = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      if (r) {
        var i = r.textElem;
        if (i) {
          var n = i.GetText(0).search(e);
          if (n >= 0) return GlobalData.optManager.ActivateTextEdit(r),
            i.SetSelectedRange(n, n + t),
            !0
        }
      }
    }
    return !1
  }

  MoveBehindAllLinked() {
    //'use strict';
    var e,
      t,
      a = !1,
      r = GlobalData.optManager.FrontMostLayerZListPreserve(),
      i = $.inArray(this.BlockID, r),
      n = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !0);
    if (n) for (
      e = GlobalData.optManager.FindLink(n, this.BlockID, !0);
      e >= 0 &&
      e < n.length &&
      n[e].targetid === this.BlockID;
    ) i > (t = $.inArray(n[e].hookid, r)) &&
      (r[t] = this.BlockID, r[i] = n[e].hookid, i = t, a = !0),
      e++;
    return a
  }

  HookedObjectMoving(e) {
    //'use strict';
    return !1
  }

  CustomSnap(e, t, a, r, i) {
    //'use strict';
    return !1
  }

  GetSnapRect() {
    //'use strict';
    var e = {};
    return Utils2.CopyRect(e, this.Frame),
      e
  }

  CanSnapToShapes() {
    //'use strict';
    return - 1
  }

  IsSnapTarget() {
    //'use strict';
    return !1
  }

  GuideDistanceOnly() {
    //'use strict';
    return !1
  }

  ActionApplySnaps(e, t) {
  }

  GetNotePos(e, t) {
    var a = $.extend(!0, {
    }, e.Frame);
    t &&
      (
        a.x += t.frame.x,
        a.y += t.frame.y,
        a.width = t.frame.width - 5,
        a.height = t.frame.height - 6
      );
    var r = a.width,
      i = a.height;
    return {
      x: a.x + r,
      y: a.y + i + e.StyleRecord.Line.Thickness / 2 + 1
    }
  }

  ConvertToVisio() {
    return []
  }

  FieldDataAllowed() {
    return !0
  }

  HasFieldData() {
    return null !== this.fieldDataDatasetID &&
      void 0 !== this.fieldDataDatasetID &&
      null !== this.fieldDataTableID &&
      void 0 !== this.fieldDataTableID &&
      this.fieldDataDatasetID >= 0 &&
      this.fieldDataTableID >= 0
  }

  HasFieldDataForTable(e) {
    return this.fieldDataDatasetID >= 0 &&
      this.fieldDataTableID == e
  }

  HasFieldDataInText(e) {
    if (e && this.fieldDataTableID != e) return !1;
    if (this.fieldDataElemID < 0) return !1;
    var t = this.GetTable(!1);
    if (t) return GlobalData.optManager.Table_HasFieldDataInText(this.BlockID, t);
    if (this.DataID >= 0) {
      var a = GlobalData.optManager.svgObjectLayer.FindElement(this.BlockID),
        r = null;
      if (a && (r = a.textElem), r) return r.HasDataFields()
    }
    return !1
  }

  SetFieldDataRecord(e, t, a) {
    if (a || this.FieldDataAllowed()) {
      GlobalData.optManager.GetObjectPtr(this.BlockID, !0);
      this.fieldDataDatasetID = ListManager.SDData.GetFieldedDataSet(!0),
        this.fieldDataTableID = e,
        this.fieldDataElemID = t,
        GlobalData.optManager.AddToDirtyList(this.BlockID),
        this.RefreshFromFieldData()
    }
  }

  NewFieldDataRecord(e) {
    if (this.FieldDataAllowed()) {
      GlobalData.optManager.GetObjectPtr(this.BlockID, !0);
      this.fieldDataDatasetID = ListManager.SDData.GetFieldedDataSet(!0),
        this.fieldDataTableID = e,
        this.fieldDataElemID = ListManager.SDData.FieldedDataAddRecord(e),
        GlobalData.optManager.AddToDirtyList(this.BlockID)
    }
  }

  HasFieldDataRecord(e, t, a) {
    return this.HasFieldData() &&
      (!e || this.fieldDataTableID == e) &&
      (!t || this.fieldDataElemID == t || - 1 == this.fieldDataElemID)
  }

  ChangeFieldDataTable(e) {
    if (this.FieldDataAllowed()) {
      if (this.bMultiDataRecsAllowed) return GlobalData.optManager.ClearShapesFieldData(e),
        this.HasFieldData() &&
        this.fieldDataTableID != e &&
        ListManager.SDData.DeleteFieldedDataTable(this.fieldDataTableID),
        void this.SetFieldDataRecord(e, - 1);
      if (this.HasFieldData()) {
        GlobalData.optManager.GetObjectPtr(this.BlockID, !0);
        var t = ListManager.SDData.FieldedDataAddRecord(e);
        ListManager.SDData.FieldedDataMoveData(this.fieldDataTableID, this.fieldDataElemID, e, t),
          ListManager.SDData.FieldedDataDelRecord(this.fieldDataTableID, this.fieldDataElemID),
          this.fieldDataDatasetID = ListManager.SDData.GetFieldedDataSet(!0),
          this.fieldDataTableID = e,
          this.fieldDataElemID = t,
          GlobalData.optManager.AddToDirtyList(this.BlockID),
          this.RefreshFromFieldData()
      } else this.NewFieldDataRecord(e)
    }
  }

  RemoveFieldData(e, t) {
    if (this.HasFieldData() && (!t || this.fieldDataTableID == t)) {
      GlobalData.optManager.GetObjectPtr(this.BlockID, !0);
      e &&
        (
          this.fieldDataElemID < 0 ? ListManager.SDData.DeleteFieldedDataTable(this.fieldDataTableID) : ListManager.SDData.FieldedDataDelRecord(this.fieldDataTableID, this.fieldDataElemID)
        ),
        this.fieldDataDatasetID = - 1,
        this.fieldDataTableID = - 1,
        this.fieldDataElemID = - 1,
        this.dataStyleOverride = null,
        GlobalData.optManager.AddToDirtyList(this.BlockID),
        this.RefreshFromFieldData()
    }
  }

  GetFieldDataTable() {
    return this.HasFieldData() ? this.fieldDataTableID : - 1
  }

  GetFieldDataRecord() {
    return this.HasFieldData() ? this.fieldDataElemID : - 1
  }

  HasFieldDataRules(e) {
    return !(!this.HasFieldData() || this.fieldDataElemID < 0) &&
      (
        (!e || this.fieldDataTableID == e) &&
        ListManager.SDData.FieldedDataHasRulesForRecord(this.fieldDataTableID, this.fieldDataElemID)
      )
  }

  GetFieldDataStyleOverride() {
    if (
      !this.HasFieldData() ||
        this.fieldDataElemID < 0 ? this.dataStyleOverride = null : this.dataStyleOverride = ListManager.SDData.FieldedDataProcessRulesForRecord(this.fieldDataTableID, this.fieldDataElemID),
      this.bInGroup
    ) {
      var e = GlobalData.optManager.FindParentGroup(this.BlockID);
      if (e) {
        var t = e.GetFieldDataStyleOverride();
        t &&
          (
            (t = $.extend(!0, {
            }, t)).glowColor = null,
            t.iconID = null,
            this.dataStyleOverride ? this.dataStyleOverride = $.extend(!0, {
            }, t, this.dataStyleOverride) : this.dataStyleOverride = t
          )
      }
    }
    return this.dataStyleOverride
  }

  RefreshFromFieldData(e) {
    if (e && this.fieldDataTableID != e) return !1;
    var t = this.HasFieldDataInText(e),
      a = this.HasFieldDataRules(e),
      r = !1;
    return !(!t && !a) &&
      (
        this.GetFieldDataStyleOverride(),
        t &&
        (
          this.ChangeTextAttributes(null, null, null, null, null, null, null, !0),
          r = !0
        ),
        ListManager.SDData.FieldedDataHasRulesForRecord(this.fieldDataTableID, this.fieldDataElemID) &&
        (GlobalData.optManager.AddToDirtyList(this.BlockID), r = !0),
        r
      )
  }

  RefreshFromRuleChange(e, t) {
    this.HasFieldDataRecord(e, t, !0) &&
      (
        this.GetFieldDataStyleOverride(),
        GlobalData.optManager.AddToDirtyList(this.BlockID)
      )
  }

  RemapDataFields(e) {
    if (this.HasFieldData()) {
      var t,
        a,
        r = this.GetTable(!1),
        i = [];
      if (r) for (t = 0; t < r.cells.length; t++) r.cells[t].DataID >= 0 &&
        i.push(r.cells[t].DataID);
      else if (this.arraylist && this.arraylist.hook) {
        var n;
        for (t = 0; t < this.arraylist.hook.length; ++t) (n = this.arraylist.hook[t]).textid >= 0 &&
          i.push(n.textid)
      } else this.DataID >= 0 &&
        i.push(this.DataID);
      for (t = 0; t < i.length; t++) (a = GlobalData.optManager.GetObjectPtr(i[t], !0)) &&
        Basic.Text.RemapDataFieldsInRuntimeText(a.runtimeText, e)
    }
  }

  RegisterForDataDrop(e) {
    if (this.FieldDataAllowed()) {
      var t = this,
        a = this.BlockID,
        r = e.DOMElement();
      r &&
        (
          $(r).off('dragover'),
          $(r).on(
            'dragover',
            (
              function (e) {
                var a = e.originalEvent;
                a &&
                  a.dataTransfer &&
                  a.dataTransfer.types &&
                  t.FieldDataAllowed() &&
                  (
                    1 != a.dataTransfer.types.length ||
                    0 !== a.dataTransfer.types[0].toString().toLowerCase().indexOf('text') ||
                    SDUI.Commands.MainController.DataPanel.InDrag(),
                    a.dataTransfer.dropEffect = a.dataTransfer.effectAllowed,
                    a.preventDefault()
                  )
              }
            )
          ),
          $(r).off('drop'),
          $(r).on(
            'drop',
            (
              function (e) {
                var r = e.originalEvent;
                if (r && r.dataTransfer && t.FieldDataAllowed()) {
                  var i = r.dataTransfer.getData('Text');
                  i &&
                    SDUI.Commands.MainController.DataPanel.HandleDataDrop(a, i),
                    r.preventDefault()
                }
              }
            )
          )
        )
    }
  }

  IsShapeContainer(e) {
    return !1
  }



  HookedObjectMoving(e) {

    console.log('== track UpdateDimensionsLines Shape.BaseDrawingObject-> HookedObjectMoving')


    // debugger
    var t = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    return this.UpdateDimensionLines(t, e),
      !0
  }

  // HookedObjectMoving = function (e) {
  //   var t = gListManager.svgObjectLayer.GetElementByID(this.BlockID);
  //   return this.UpdateDimensionLines(t, e),
  //       !0
  // }



}

export default BaseDrawingObject
