

import ListManager from './ListManager'
import Utils2 from '../Helper/Utils2'
import GlobalData from '../Data/GlobalData'
import FileParser from '../Data/FileParser'
// import DataStream from '../Opt/Business/DataStream'
import T3DataStream from '../Opt/Business/DataStream2'
//import DataStream from 'datastream-js'
import Resources from '../Data/Resources'
import Utils1 from '../Helper/Utils1'
import Utils3 from '../Helper/Utils3'
import Globals from './Globals'
import HashController from '../Opt/Business/HashController'
import $ from 'jquery'
import RulerSettings from '../Model/RulerSettings'
// import Collab from '../Data/Collab'
import Polygon from '../Basic/Basic.Polygon'
import PolygonShapeGenerator from "../Opt/Business/PolygonShapeGenerator"
import QuickStyle from '../Model/QuickStyle'
import SEDSession from '../Model/SEDSession'
import LayersManager from '../Model/LayersManager'
import Point from '../Model/Point'
import Instance from './Instance/Instance'
import ConstantData from '../Data/ConstantData'
import RecentSymbol from '../Model/RecentSymbol'
import FillData from '../Model/FillData'
import TextFormatData from '../Model/TextFormatData'
import PaintData from '../Model/PaintData'
import FontRecord from '../Model/FontRecord'
import SEDGraphDefault from '../Model/SEDGraphDefault'
import OutsideEffectData from '../Model/OutsideEffectData'
import PolyList from '../Model/PolyList'
import PolySeg from '../Model/PolySeg'
import Link from '../Model/Link'
import Hook from '../Model/Hook'
import TextObject from '../Model/TextObject'
import Rectangle from '../Model/Rectangle'
import SEDAHook from '../Model/SEDAHook'
import Layer from '../Model/Layer'
import ConstantData1 from "../Data/ConstantData1"
import ConstantData2 from './ConstantData2'
import TextureList from '../Model/TextureList'


class SDF {

  static LineIsReversed(e, t, a) {
    if (null == e) return !1;
    if (
      e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE
    ) switch (e.LineType) {
      case ConstantData.LineType.ARCLINE:
      case ConstantData.LineType.LINE:
        if (Math.abs(e.EndPoint.x - e.StartPoint.x) < 0.01) return e.EndPoint.y < e.StartPoint.y;
        var r = Utils2.Pt2Rect(e.EndPoint, e.StartPoint);
        if (
          Math.abs(e.EndPoint.x - r.x) < 0.01 &&
          Math.abs(e.EndPoint.y - r.y) < 0.01 ||
          Math.abs(e.EndPoint.x - r.x) < 0.01 &&
          Math.abs(e.EndPoint.y - (r.y + r.height)) < 0.01
        ) return !0;
        break;
      case ConstantData.LineType.SEGLINE:
      case ConstantData.LineType.ARCSEGLINE:
        if (a) break;
        if (t && t.KeepSegDir) return !1;
        if (Math.abs(e.StartPoint.x - e.EndPoint.x) <= 1) {
          if (e.StartPoint.y > e.EndPoint.y) return !0
        } else if (e.StartPoint.x > e.EndPoint.x) return !0
    }
    return !1
  }

  static TextAlignToWin = function (e) {
    var t = {
      just: FileParser.TextJust.TA_CENTER,
      vjust: FileParser.TextJust.TA_CENTER
    };
    switch (e) {
      case ConstantData.TextAlign.LEFT:
        t.just = FileParser.TextJust.TA_LEFT;
        break;
      case ConstantData.TextAlign.RIGHT:
        t.just = FileParser.TextJust.TA_RIGHT;
        break;
      case ConstantData.TextAlign.TOPLEFT:
        t.just = FileParser.TextJust.TA_LEFT,
          t.vjust = FileParser.TextJust.TA_TOP;
        break;
      case ConstantData.TextAlign.TOPCENTER:
        t.vjust = FileParser.TextJust.TA_TOP;
        break;
      case ConstantData.TextAlign.TOPRIGHT:
        t.just = FileParser.TextJust.TA_RIGHT,
          t.vjust = FileParser.TextJust.TA_TOP;
        break;
      case ConstantData.TextAlign.BOTTOMLEFT:
        t.just = FileParser.TextJust.TA_LEFT,
          t.vjust = FileParser.TextJust.TA_BOTTOM;
        break;
      case ConstantData.TextAlign.BOTTOMCENTER:
        t.vjust = FileParser.TextJust.TA_BOTTOM;
        break;
      case ConstantData.TextAlign.BOTTOMRIGHT:
        t.just = FileParser.TextJust.TA_RIGHT,
          t.vjust = FileParser.TextJust.TA_BOTTOM
    }
    return t
  }

  static ToSDWinCoords = function (e, t) {
    return t > 1 ? Math.round(t * e) : e
  }

  static Write_CODE = function (e, t) {
    e.writeUint16(t);
    var a = e.position;
    return e.writeUint32(0),
      a
  }

  static Write_LENGTH = function (e, t) {
    var a = e.position;
    e.position = t;
    var r = a - (t + 4);
    e.writeUint32(r),
      e.position = a
  }

  static ToWinAngle = function (e) {
    var t = 10 * e;
    return t < 1800 ? t = - t : t > 1800 &&
      (t = 3600 - t),
      t
  }

  static WriteTextParams = function (e, t, a, r) {
    var i = t;
    if (
      t.StyleRecord.Line.BThick &&
      t.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
    ) {
      var n = $.extend(!0, {
      }, t.Frame);
      (i = Utils1.DeepCopy(t)).StyleRecord.Line.Thickness = 0,
        Utils2.InflateRect(n, - t.StyleRecord.Line.BThick, - t.StyleRecord.Line.BThick),
        i.UpdateFrame(n)
    }
    var o = SDF.ToSDWinRect(i.trect, r.coordScaleFactor, r.GroupOffset),
      s = SDF.TextAlignToWin(t.TextAlign),
      l = 0;
    t.TextWrapWidth > 0 &&
      (l = SDF.ToSDWinCoords(t.TextWrapWidth, r.coordScaleFactor));
    var S = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWTEXT);
    if (r.WriteVisio || r.WriteWin32) {
      var c = {
        trect: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        left_sindent: t.left_sindent,
        top_sindent: t.top_sindent,
        right_sindent: t.right_sindent,
        bottom_sindent: t.bottom_sindent,
        tindent: {
          left: SDF.ToSDWinCoords(t.tindent.left, r.coordScaleFactor),
          top: SDF.ToSDWinCoords(t.tindent.top, r.coordScaleFactor),
          right: SDF.ToSDWinCoords(t.tindent.right, r.coordScaleFactor),
          bottom: SDF.ToSDWinCoords(t.tindent.bottom, r.coordScaleFactor)
        },
        tmargin: {
          left: SDF.ToSDWinCoords(t.TMargins.left, r.coordScaleFactor),
          top: SDF.ToSDWinCoords(t.TMargins.top, r.coordScaleFactor),
          right: SDF.ToSDWinCoords(t.TMargins.right, r.coordScaleFactor),
          bottom: SDF.ToSDWinCoords(t.TMargins.bottom, r.coordScaleFactor)
        },
        textid: a,
        textflags: t.TextFlags,
        ascent: 0,
        vjust: s.vjust,
        just: s.just,
        textgrow: t.TextGrow,
        tangle: SDF.ToWinAngle(t.RotationAngle),
        gtangle: 0,
        ltrect: {
          left: o.left,
          top: o.top,
          right: o.right,
          bottom: o.bottom
        },
        commentid: t.NoteID,
        textwrapwidth: l,
        linetextx: t.LineTextX,
        linetexty: SDF.ToSDWinCoords(t.LineTextY, r.coordScaleFactor),
        visiorotationdiff: 10 * t.VisioRotationDiff
      };
      e.writeStruct(FileParser.SDF_DRAWTEXT_Struct_110, c)
    } else {
      c = {
        left_sindent: t.left_sindent,
        top_sindent: t.top_sindent,
        right_sindent: t.right_sindent,
        bottom_sindent: t.bottom_sindent,
        tindent: {
          left: SDF.ToSDWinCoords(t.tindent.left, r.coordScaleFactor),
          top: SDF.ToSDWinCoords(t.tindent.top, r.coordScaleFactor),
          right: SDF.ToSDWinCoords(t.tindent.right, r.coordScaleFactor),
          bottom: SDF.ToSDWinCoords(t.tindent.bottom, r.coordScaleFactor)
        },
        tmargin: {
          left: SDF.ToSDWinCoords(t.TMargins.left, r.coordScaleFactor),
          top: SDF.ToSDWinCoords(t.TMargins.top, r.coordScaleFactor),
          right: SDF.ToSDWinCoords(t.TMargins.right, r.coordScaleFactor),
          bottom: SDF.ToSDWinCoords(t.TMargins.bottom, r.coordScaleFactor)
        },
        textid: a,
        textflags: t.TextFlags,
        ascent: 0,
        vjust: s.vjust,
        just: s.just,
        textgrow: t.TextGrow,
        tangle: SDF.ToWinAngle(t.RotationAngle),
        ltrect: {
          left: o.left,
          top: o.top,
          right: o.right,
          bottom: o.bottom
        },
        commentid: t.NoteID,
        textwrapwidth: l,
        linetextx: t.LineTextX,
        linetexty: t.LineTextY,
        visiorotationdiff: 10 * t.VisioRotationDiff
      };
      e.writeStruct(FileParser.SDF_DRAWTEXT_Struct_182, c)
    }
    SDF.Write_LENGTH(e, S)
  }

  static ToSDWinRect = function (e, t, a) {
    var r,
      i,
      n = {};
    return r = e.x,
      i = e.y,
      a &&
      (r += a.x, i += a.y),
      t > 1 ? (
        n.left = Math.round(r * t),
        n.top = Math.round(i * t),
        n.right = Math.round((r + e.width) * t),
        n.bottom = Math.round((i + e.height) * t)
      ) : (n.left = r, n.top = i, n.right = r + e.width, n.bottom = i + e.height),
      n
  }
}

export default SDF


SDF.WindowSettings = function () {
  this.updated = 0,
    this.worigin = {
      x: 0,
      y: 0
    },
    this.wscale = 0,
    this.wscalemode = 0,
    this.leftpanelmode = 0
}

SDF.FontRecord = function (e, t, a) {
  this.fontID = e,
    this.fontName = t,
    this.fontType = a
}

SDF.Result = function () {
  this.error = 0,
    this.ConvertOnSave = !1,
    this.isTemplate = !1,
    this.isSymbol = !1,
    this.IgnoreHeader = !1,
    this.PVersion = 0,
    this.FVersion = 0,
    this.coordScaleFactor = 1,
    this.sdp = null,
    this.GroupOffset = {
      x: 0,
      y: 0
    },
    this.ReadingGroup = !1,
    this.WindowSettings = new SDF.WindowSettings,
    this.DefTStyle = {},
    this.DefRun = {},
    this.DefFont = new SDF.FontRecord,
    this.DefFSize = 10,
    this.DefLine = {},
    this.DefBorder = {},
    this.DefFill = {},
    this.fontlist = [],
    this.zList = [],
    this.lpStyles = [],
    this.links = [],
    this.IDMap = [],
    this.textids = [],
    this.usedtextids = [],
    this.noteids = [],
    this.usednoteids = [],
    this.nativeids = [],
    this.imageids = [],
    this.usedimageids = [],
    this.tableids = [],
    this.usedtableids = [],
    this.graphids = [],
    this.usedgraphids = [],
    this.expandedviewids = [],
    this.usedexpandedviewids = [],
    this.Threads = [],
    this.ThreadIDs = [],
    this.objectcount = 0,
    this.textonline = - 1,
    this.textonlineid = - 1,
    this.lineswithtext = [],
    this.SymbolPosition = {
      x: 100,
      y: 100
    },
    this.SetSymbolOrigin = !1,
    this.WarnMeta = !1,
    this.gHash = null,
    this.AddEMFHash = !1,
    this.AllowAddEMFHash = !1,
    this.ValidateHashesAsync = !1,
    this.shapetoolindex = null,
    this.linetoolindex = null,
    this.swimlaneformat = null,
    this.autocontainer = null,
    this.actascontainer = null,
    this.swimlanenlanes = null,
    this.swimlanenvlanes = null,
    this.swimlanerotate = null,
    this.swimlanetitle = null,
    this.collapsetools = null,
    this.TextureList = new TextureList(),// new Resources.SDTextureList,
    this.NoTextBlocks = !1,
    this.ReadBlocks = !1,
    this.ReadGroupBlock = !1,
    this.tLMB = null,
    this.BlockzList = [],
    this.DeleteList = [],
    this.RichGradients = [],
    this.HasBlockDirectory = !1,
    this.updatetext = !1,
    this.LibraryPathTarget = '',
    this.SetColorChanges = !1,
    this.ColorFilter = 0,
    this.HashRecords = [],
    this.PaperType = 'letter',
    this.IsVisio = !1,
    this.IsLucid = !1,
    this.VisioFileVersion = !1,
    this.ReadTexture = - 1,
    this.SDData = null,
    this.FromWindows = !1,
    this.SearchLibs = [],
    this.CurrentSymbol = null,
    this.SearchResults = [],
    this.LoadBlockList = !1,
    this.RecentSymbols = [],
    this.PaletteStatus = {}
}

SDF.ArrowSizes = [
  'small',
  'medium',
  'large'
]

SDF.SVGFragmentRecord = function (e, t) {
  this.fragment = t,
    this.EMFHash = e,
    this.objectIDs = []
}

SDF.SVGFragments = [],
  SDF.SVGHashRecord = function (e) {
    this.EMFHash = e,
      this.cindexes = [],
      this.png = !1,
      this.svg = !1,
      this.svgcolor = !1
  }

SDF.Errors = {
  WaitingForCallBack: - 2,
  NoError: 0,
  UnknownFile: 1,
  Version: 2,
  BadFormat: 3,
  MinVersion: 4,
  GroupVersion: 5,
  UnsupportedPanel: 6,
  NoShapesinGroup: 7,
  WarnMeta: 9,
  TooBig: 11,
  MinVersionProjectChart: 12
}

SDF.Signature = 'SMARTDRW',
  SDF.FVERSIONVSM = 37,
  SDF.FVERSION2015 = 38,
  SDF.FVERSION2016 = 39,
  SDF.SDF_FVERSION2018 = 40,
  SDF.SDF_FVERSION2022 = 41,
  SDF.SDF_FVERSION = 41,
  SDF.SDF_MINFVERSION = 3,
  SDF.SDF_MINSVERSION = 5,
  SDF.SDF_POVERSION801 = 801,
  SDF.SDF_PVERSION804 = 804,
  SDF.SDF_PVERSION816 = 816,
  SDF.SDF_PVERSION838 = 838,
  SDF.SDF_PVERSION847 = 847,
  SDF.SDF_PVERSION848 = 848,
  SDF.SDF_PVERSION849 = 849,
  SDF.SDF_PVERSION850 = 850,
  SDF.SDF_PVERSION851 = 851,
  SDF.SDF_PVERSION852 = 852,
  SDF.SDF_PVERSION853 = 853,
  SDF.SDF_PVERSION854 = 854,
  SDF.SDF_PVERSION855 = 855,
  SDF.SDF_PVERSION856 = 856,
  SDF.SDF_PVERSION857 = 857,
  SDF.SDF_PVERSION858 = 858,
  SDF.SDF_PVERSION859 = 859,
  SDF.SDF_PVERSION860 = 860,
  SDF.SDF_PVERSION861 = 861,
  SDF.SDF_PVERSION862 = 862,
  SDF.SDF_PVERSION863 = 863,
  SDF.SDF_PVERSION864 = 864,
  SDF.SDF_PVERSION = 864,
  SDF.PRINTRES = 100,
  SDF.DRAWRES = 600,
  SDF.SDF_BEGIN = 32768,
  SDF.SDF_END = 16384,
  SDF.SDF_MASK = - 49153,
  SDF.FragmentLoad_RefCount = 0,
  SDF.UnsupportedPanels = [
    'Web Page Annotations',
    'Visual Outline',
    'Value Stream Maps',
    'Charts',
    'Org Charts VPM',
    'Kanban',
    'LDAP',
    'Annual Calendars',
    'Calendars',
    'Monthly Calendars',
    'Photo Annual',
    'Photo Monthly',
    'Project Team Charts',
    'Web Site Maps',
    'Presentation',
    'Storyboards',
    'Story Board'
  ]

SDF.FlowchartPanels = [
  'Data Flow',
  'Event Driven Process Chain',
  'Free Form Flowchart',
  'SDL Diagrams'
]



SDF.FlyersPanels = [
  'Action Plan',
  'Cabinet Design',
  'Petri Nets',
  'Healthcare Flyers',
  'Interrelationship Diagram',
  'Lippincott Flyers',
  'Marketing Diagrams',
  'Netter Flyers',
  'Photo Flyers',
  'Simple Diagrams',
  'Web Page Layouts'
]

SDF.CrimeScenes = [
  'Crime Scenes Outdoor',
  'Indoor Crime Scenes',
  'Outdoor Crime Scenes'
]

SDF.Network = [
  'Cisco Diagrams'
]

SDF.Pedigree = [
  'Family Tree - Ancestry'
]

SDF.DecendentTree = [
  'Family Tree - Descendant'
],
  SDF.RackDiagram = [
    'Network Racks'
  ],
  SDF.Maps = [
    'Sales Maps'
  ],
  SDF.OldProjectLayers = [
    'TimeLines',
    'Timelines',
    'Meeting Agenda'
  ],
  SDF.Engineering = [
    'Electrical Engineering',
    'Logic Diagrams',
    'Mechanical Illustrations',
    'Mechanical Schematics'
  ],
  SDF.UnsupportedTypes = [],
  SDF.ReadFileFromBuffer = function (e, t) {
    GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    var a = SDF.ReadBuffer(e, t, 0, !1, SDF.ReadFileFromBuffer_Complete);
    return a &&
      a != SDF.Errors.WaitingForCallBack ? (
      SDUI.Commands.MainController.ActiveSessionController.ReturnToTemplateDialog = !0,
      SDUI.Commands.MainController.ActiveSessionController.UpdateAlertModal(Resources.Strings['SDRRead_Error_' + a], 1),
      GlobalData.optManager.ShowLoading(!1),
      t.error
    ) : (
      t.WarnMeta && false,
      // Utils.Alert('Metafile not read', null),
      0 === a &&
      (a = SDF.ReadFileFromBuffer_Complete(t)),
      GlobalData.optManager.ShowLoading(!1),
      a
    )
  },




  SDF.GetMetricFromLanguage = function () {
    ConstantData.DocumentContext.UserSettings &&
      (
        navigator.languages &&
          navigator.languages[0] ? 'en-us' === navigator.languages[0].toLowerCase() ? (
            ConstantData.DocumentContext.UserSettings.Metric = !1,
            ConstantData.DocumentContext.UserSettings.PaperSize = 0
          ) : (
          ConstantData.DocumentContext.UserSettings.Metric = !0,
          ConstantData.DocumentContext.UserSettings.PaperSize = 1
        ) : navigator.language &&
        (
          'en-us' === navigator.language.toLowerCase() ? (
            ConstantData.DocumentContext.UserSettings.Metric = !1,
            ConstantData.DocumentContext.UserSettings.PaperSize = 0
          ) : (
            ConstantData.DocumentContext.UserSettings.Metric = !0,
            ConstantData.DocumentContext.UserSettings.PaperSize = 1
          )
        )
      )
  },
  SDF.OptimizeLinks = function (e, t) {
    var a,
      r,
      i;
    for (a = e.length, r = 0; r < a; r++) i = e[r],
      t.indexOf(i.targetid) < 0 &&
      (e[r].flags = 0)
  },
  SDF.MapSmartPanelToBusinessModule = function (e, t) {
    var a = function (e) {
      var a,
        r,
        i,
        n,
        o = t.zList.length;
      for (a = 0; a < o; a++) if (
        (r = GlobalData.optManager.GetObjectPtr(t.zList[a], !1)) &&
        0 === r.objecttype
      ) {
        var s = r.GetTable(!1);
        if (s) for (n = s.cells.length, i = 0; i < n; i++) if (
          s.cells[i].celltype === ListManager.Table.CellTypes.SDT_CT_ROWREPEATER
        ) return void (r.objecttype = e)
      }
    };
    switch (SDF.ToSDJSPanelName(e)) {
      case Resources.Controls.SmartPanels.Flowchart.Id:
      case Resources.Controls.SmartPanels.InfluenceDiagram.Id:
      case Resources.Controls.SmartPanels.NetworkDiagram.Id:
      case Resources.Controls.SmartPanels.SoftwareDesign.Id:
      case Resources.Controls.SmartPanels.StrategyMap.Id:
      case Resources.Controls.SmartPanels.Swimlane.Id:
      case Resources.Controls.SmartPanels.UML.Id:
      case Resources.Controls.SmartPanels.WorkflowDiagram.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'FLOWCHART';
        break;
      case Resources.Controls.SmartPanels.StepChart.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'STEPCHART';
        break;
      case Resources.Controls.SmartPanels.StepChartVertical.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'STEPCHARTV';
        break;
      case Resources.Controls.SmartPanels.Orgchart.Id:
      case Resources.Controls.SmartPanels.Sitemap.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'ORGCHART';
        break;
      case Resources.Controls.SmartPanels.BPMN.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'LINEDRAW_BPMN';
        break;
      case Resources.Controls.SmartPanels.ERD.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'LINEDRAW_ERD';
        break;
      case Resources.Controls.SmartPanels.UMLClass.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'LINEDRAW_UMLCLASS';
        break;
      case Resources.Controls.SmartPanels.UMLComponent.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'LINEDRAW_UMLCOMPONENT';
        break;
      case Resources.Controls.SmartPanels.UMLDiagram.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'LINEDRAW_UML';
        break;
      case Resources.Controls.SmartPanels.CauseandEffect.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'CAUSEANDEFFECT';
        break;
      case Resources.Controls.SmartPanels.Class.Id:
      case Resources.Controls.SmartPanels.DescendantTree.Id:
      case Resources.Controls.SmartPanels.Hierarchy.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'DESCENDANT';
        break;
      case Resources.Controls.SmartPanels.PedigreeChart.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'PEDIGREE';
        break;
      case Resources.Controls.SmartPanels.DecisionTree.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'DECISIONTREE';
        break;
      case Resources.Controls.SmartPanels.Ecomap.Id:
      case Resources.Controls.SmartPanels.Genograms.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'GENOGRAM';
        break;
      case Resources.Controls.SmartPanels.Landscape.Id:
      case Resources.Controls.SmartPanels.FloorPlan.Id:
      case Resources.Controls.SmartPanels.Blueprint.Id:
      case Resources.Controls.SmartPanels.CrimeScene.Id:
      case Resources.Controls.SmartPanels.Elevation.Id:
      case Resources.Controls.SmartPanels.Planogram.Id:
      case Resources.Controls.SmartPanels.StorageDesign.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'FLOORPLAN';
        break;
      case Resources.Controls.SmartPanels.LineDraw.Id:
      case Resources.Controls.SmartPanels.NetworkDiagramManual.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'LINEDRAW';
        break;
      case Resources.Controls.SmartPanels.Engineering.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'LINEDRAW_ENGINEERING';
        break;
      case Resources.Controls.SmartPanels.SwimLaneLineDraw.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'LINEDRAW_SWIMLANE';
        break;
      case Resources.Controls.SmartPanels.AWS.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'LINEDRAW_AWS';
        break;
      case Resources.Controls.SmartPanels.Azure.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'LINEDRAW_AZURE';
        break;
      case Resources.Controls.SmartPanels.Hubs.Id:
      case Resources.Controls.SmartPanels.Timeline.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'MINDMAP';
        break;
      case Resources.Controls.SmartPanels.ProjectPlanning.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'TASKMAP';
        break;
      case Resources.Controls.SmartPanels.ProjectChart.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'PROJECTCHART';
        break;
      case Resources.Controls.SmartPanels.Table.Id:
      case Resources.Controls.SmartPanels.Matrix.Id:
      case Resources.Controls.SmartPanels.AffinityDiagram.Id:
      case Resources.Controls.SmartPanels.AuthorityMatrix.Id:
      case Resources.Controls.SmartPanels.BasicMatrix.Id:
      case Resources.Controls.SmartPanels.ResourceTaskMatrix.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'TABLE',
          a(ConstantData.ObjectTypes.SD_OBJT_BUSLOGIC_TABLE);
        break;
      case Resources.Controls.SmartPanels.PyramidChart.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'TABLEROW',
          a(ConstantData.ObjectTypes.SD_OBJT_BUSLOGIC_TABLEROW);
        break;
      case Resources.Controls.SmartPanels.WireframeDiagram.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'UIELEMENT';
        break;
      case Resources.Controls.SmartPanels.Charts.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'GRAPH';
        break;
      case Resources.Controls.SmartPanels.Gauges.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'GAUGE';
        break;
      case Resources.Controls.SmartPanels.Kanban.Id:
      case Resources.Controls.SmartPanels.StickyNotes.Id:
      case Resources.Controls.SmartPanels.Whiteboarding.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'CONTAINER';
        break;
      case Resources.Controls.SmartPanels.Jira.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'JIRA_ISSUESCONTAINER';
        break;
      case Resources.Controls.SmartPanels.JiraBlockingIssue.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'JIRA_BLOCKINGISSUE';
        break;
      case Resources.Controls.SmartPanels.JiraEpicDependency.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'JIRA_EPICDEPENDENCY';
        break;
      case Resources.Controls.SmartPanels.JiraProductRoadmap.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'JIRA_PRODUCTROADMAP';
        break;
      case Resources.Controls.SmartPanels.JiraPIBoard.Id:
        GlobalData.optManager.theContentHeader.BusinessModule = 'JIRA_PIBOARD';
        break;
      default:
        GlobalData.optManager.theContentHeader.BusinessModule = 'MANUALCHART'
    }
  },
  SDF.DeleteOldLayers = function (e) {
    var t,
      a,
      r = e.tLMB.layers,
      i = r.length,
      n = ConstantData.LayerTypes,
      o = [];
    for (t = i - 1; t >= 0; t--) switch ((a = r[t]).layertype) {
      case n.SD_LAYERT_TIMELINE:
      case n.SD_LAYERT_MEETING:
        o = o.concat(a.zList),
          GlobalData.optManager.RemoveLayer(t)
    }
    o.length &&
      GlobalData.optManager.DeleteObjects(o, !0)
  },
  SDF.ReadFileFromBuffer_Complete = function (e) {
    var t,
      a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c = [],
      u = !1,
      p = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      d = (ConstantData.DrawingObjectBaseClass.CONNECTOR, 0),
      D = ConstantData.LayerTypes,
      g = ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL,
      h = ConstantData.Defines.STANDARD_INTERIOR_WALL,
      m = ConstantData.Defines.STANDARD_EXTERIOR_WALL,
      C = ConstantData.Defines.METRIC_INTERIOR_WALL,
      y = ConstantData.Defines.METRIC_EXTERIOR_WALL;
    if (
      e.isTemplate ? (
        SDUI.Commands.MainController.Document.IsScaledDrawing(e.rulerSettings) &&
        (
          e.sdp.moreflags = Utils2.SetFlag(
            e.sdp.moreflags,
            ConstantData.SessionMoreFlags.SEDSM_ShowGrid,
            !0
          ),
          e.sdp.moreflags = Utils2.SetFlag(
            e.sdp.moreflags,
            ConstantData.SessionMoreFlags.SEDSM_DrawToScale,
            !0
          )
        ),
        ConstantData.DocumentContext.UserSettings &&
        (
          SDF.GetMetricFromLanguage(),
          ConstantData.DocumentContext.UserSettings.Metric &&
          0 == (
            p.moreflags & ConstantData.SessionMoreFlags.SEDSM_KeepUnits
          ) &&
          (
            e.rulerSettings &&
            (
              e.rulerSettings = SDUI.Commands.MainController.Document.GetMetricScale(e.rulerSettings)
            ),
            e.sdp.moreflags & ConstantData.SessionMoreFlags.SEDSM_DrawToScale &&
            (u = !0)
          ),
          1 === ConstantData.DocumentContext.UserSettings.PaperSize &&
          GlobalData.optManager.AccomodateDocumentPaperSize('A4')
        )
      ) : 'letter' !== e.PaperType &&
      GlobalData.optManager.AccomodateDocumentPaperSize(e.PaperType),
      GlobalData.docHandler.ResizeDocument(p.dim.x, p.dim.y),
      e.rulerSettings &&
      (
        GlobalData.docHandler.SetRulers(e.rulerSettings),
        SDUI.Commands.MainController.Document.SetRulerVisibility(e.rulerSettings.show)
      ),
      e.WindowSettings &&
      (
        e.WindowSettings.wflags & ListManager.WFlags.W_Stf ? e.WindowSettings.wflags & ListManager.WFlags.W_Page ? GlobalData.docHandler.SetSizeToPage(!0) : GlobalData.docHandler.SetSizeToFit(!0) : GlobalData.docHandler.SetZoomFactor(e.WindowSettings.wscale, !0),
        GlobalData.docHandler.SetScroll(e.WindowSettings.worigin.x, e.WindowSettings.worigin.y)
      ),
      function () {
        if (0 !== e.IDMap.length) if (
          i = e.IDMap[e.sdp.tselect],
          e.sdp.tselect = null != i ? i : - 1,
          e.ReadBlocks
        ) {
          t = e.tLMB.layers.length;
          var r = [];
          for (a = 0; a < t; a++) {
            var s = (n = e.tLMB.layers[a]).zList.length;
            for (o = 0; o < s; o++) void 0 !== (i = e.IDMap[n.zList[o]]) ? i < 0 ? (n.zList.splice(o, 1), o--, s--) : (n.zList[o] = i, r[i] = !0) : (
              n.zList.splice(o, 1),
              o--,
              s--,
              SDUI.Utils.Logger.LogError('Bad zList')
            )
          }
        } else {
          t = e.zList.length;
          var l = null;
          for (a = 0; a < t; a++) l = GlobalData.optManager.GetObjectPtr(e.zList[a], !1),
            e.tLMB.layers[l.Layer].zList.push(e.zList[a])
        }
      }(),
      e.sdp &&
      (
        e.PVersion <= SDF.SDF_PVERSION862 ? (
          SDUI.Commands.MainController.Document.SetSnapEnable((e.sdp.flags & ConstantData.SessionFlags.SEDS_Snap) > 0),
          SDUI.Commands.MainController.Document.SetGridVisibility(
            (
              e.sdp.moreflags & ConstantData.SessionMoreFlags.SEDSM_ShowGrid
            ) > 0,
            !1
          ),
          SDUI.Commands.MainController.Document.ForceCenterSnapEnable(e.sdp.centersnapalign),
          SDUI.Commands.MainController.Document.SetPageDividerVisibility(
            0 == (
              e.sdp.flags & ConstantData.SessionFlags.SEDS_NoPageBreakLines
            )
          ),
          SDUI.Commands.MainController.Document.SetSpellCheck(
            (
              GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_AutoSpell
            ) > 0,
            !1
          ),
          SDUI.Commands.MainController.Document.ToggleSnapToShape(!0)
        ) : (
          SDUI.Commands.MainController.Document.SetSnapEnable(
            (
              GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_SnapToGridC
            ) > 0 ||
            (
              GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_SnapToGridTL
            ) > 0
          ),
          SDUI.Commands.MainController.Document.ForceCenterSnapEnable(
            (
              GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_SnapToGridC
            ) > 0
          ),
          SDUI.Commands.MainController.Document.SetGridVisibility(
            (
              GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_ShowGrid
            ) > 0,
            !1
          ),
          SDUI.Commands.MainController.Document.SetPageDividerVisibility(
            (
              GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_ShowPageDividers
            ) > 0
          ),
          SDUI.Commands.MainController.Document.SetSpellCheck(
            (
              GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_AutoSpell
            ) > 0,
            !1
          ),
          SDUI.Commands.MainController.Document.ToggleSnapToShape(
            0 == (
              GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_SnapToShapes_Off
            )
          ),
          SDUI.Commands.MainController.Document.SetRulerVisibility(
            (
              GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_ShowRulers
            ) > 0
          )
        ),
        ConstantData.DocumentContext.UserSettings &&
        (
          SDUI.Commands.MainController.Document.SetSpellDictionary(ConstantData.DocumentContext.UserSettings.SpellDict, !1),
          SDUI.Commands.MainController.Document.SetSpellFlags(ConstantData.DocumentContext.UserSettings.SpellFlags, !1)
        )
      ),
      !e.LoadBlockList
    ) {
      var f = GlobalData.objectStore.GetObject(GlobalData.optManager.theContentHeader.SDDataID);
      e.SDData ? f ? f.Data.SDData = e.SDData : (
        f = GlobalData.objectStore.CreateBlock(
          ConstantData.StoredObjectType.SDDATA_OBJECT,
          {
            SDData: e.SDData
          }
        ),
        GlobalData.optManager.theContentHeader.SDDataID = f.ID
      ) : f &&
      (f.Delete(), GlobalData.optManager.theContentHeader.SDDataID = - 1)
    }
    SDF.SetTheme(p),
      S = GlobalData.optManager.theContentHeader.smartpanelname,
      GlobalData.optManager.theContentHeader.smartpanelname &&
      'smartpanel' !== GlobalData.optManager.theContentHeader.smartpanelname &&
      SDF.MapSmartPanelToBusinessModule(GlobalData.optManager.theContentHeader.smartpanelname, e),
      (e.IsLucid || e.IsVisio) &&
      (
        'LINEDRAW' === GlobalData.optManager.theContentHeader.BusinessModule ||
          'MANUALCHART' === GlobalData.optManager.theContentHeader.BusinessModule ? (
          GlobalData.optManager.theContentHeader.BusinessModule = 'LINEDRAW_SWIMLANE',
          GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Feet &&
          (
            GlobalData.docHandler.rulerSettings.units = ConstantData.RulerUnits.SED_Inches
          ),
          p.def.h_arraywidth = 75,
          p.def.v_arraywidth = 75,
          p.def.arraywd = 25,
          p.def.arrayht = 25
        ) : 'FLOORPLAN' === GlobalData.optManager.theContentHeader.BusinessModule &&
        (
          p.flags = Utils2.SetFlag(p.flags, ConstantData.SessionFlags.SEDS_FreeHand, !0)
        )
      );
    var L,
      I,
      T = GlobalData.optManager.theContentHeader.BusinessModule;
    if (
      GlobalData.optManager.theContentHeader.BusinessModule = '',
      SDJS_init_business_manager(T),
      GlobalData.optManager.theContentHeader.smartpanelname = 'smartpanel',
      GlobalData.optManager.theContentHeader.smartpanelname
    ) {
      switch (d) {

        case D.SD_LAYERT_MINDMAP:
          GlobalData.optManager.theContentHeader.smartpanelname = 'mind maps',
            p.flags = Utils2.SetFlag(p.flags, ConstantData.SessionFlags.SEDS_LLink, !0)
      }
      gBusinessManager instanceof Business.LineDraw ||
        gBusinessManager instanceof Business.FlowChart ||
        (p.def.h_arraywidth = 75, p.def.v_arraywidth = 75);
      var b = SDF.ToSDJSPanelName(GlobalData.optManager.theContentHeader.smartpanelname);
      SDUI.Commands.MainController.SmartPanels.SetPaletteStatus(e.PaletteStatus),
        SDUI.Commands.MainController.SmartPanels.SetLeftPanelMode(Resources.LeftPanelMode.LEFTPANELMODE_SMARTPANEL),
        SDUI.Commands.MainController.LoadSmartPanel(b);
      var M = [],
        P = GlobalData.optManager.theContentHeader.lp_list.lib.length;
      e.IsVisio &&
        0 === P &&
        (
          GlobalData.optManager.theContentHeader.lp_list.lib.push(
            new ListManager.LibListEntry('Office\\Standard Shapes.SDL')
          ),
          P = 1
        );
      for (
        var R = function (e, t) {
          var a,
            r;
          for (r = e.SearchLibs.length, a = 0; a < r; a++) if (t === e.SearchLibs[a].ItemId) return e.SearchLibs[a];
          return null
        },
        A = 0;
        A < P;
        A++
      ) {
        var _ = GlobalData.optManager.theContentHeader.lp_list.lib[A];
        if (_.SearchResults) {
          var E = R(e, _.libGuid);
          E &&
            M.push(E)
        } else {
          var w;
          null != (
            w = _.libGuid ? _.libGuid : SDUI.Commands.MainController.Symbols.GetLibraryIDFromPath(_.libname)
          ) &&
            w != Constants.Guid_Empty &&
            M.push(w)
        }
      }
      SDUI.Commands.MainController.Symbols.Initialize(M),
        null != e.CurrentSymbol &&
        SDUI.Commands.MainController.Symbols.SetCurrentSavedSymbol(e.CurrentSymbol),
        e.SearchResults.length &&
        SDUI.Commands.MainController.Symbols.SymbolSearch_SetList(e.SearchResults)
    }
    if (
      e.LibraryPathTarget.length &&
      (
        SDUI.Commands.MainController.SymbolLibraryBrowser.LibraryPathTarget = e.LibraryPathTarget
      ),
      e.PVersion < SDF.SDF_PVERSION864 &&
      !e.isTemplate &&
      (
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_HideLeftPanel,
          !1
        )
      ),
      GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_HideLeftPanel ? SDUI.Commands.MainController.SmartPanels.ToggleLeftPanel(!1, !0) : SDUI.Commands.MainController.SmartPanels.ToggleLeftPanel(!1, !1),
      null != e.linetoolindex &&
      SDF.WintoJSLineTool(e.linetoolindex),
      null != e.shapetoolindex &&
      (
        e.PVersion <= SDF.SDF_PVERSION863 ? (
          SDF.WintoJSShapeTool(e.shapetoolindex),
          SDUI.Commands.MainController.Selection.SetShapeTool(ConstantData.SDRShapeTypes.SED_S_Rect)
        ) : SDUI.Commands.MainController.Selection.SetShapeTool(e.shapetoolindex)
      ),
      null != e.swimlaneformat &&
      (
        ConstantData.DocumentContext.SwimlaneFormat = e.swimlaneformat
      ),
      null != e.autocontainer &&
      (ConstantData.DocumentContext.AutoContainer = e.autocontainer),
      null != e.actascontainer &&
      (
        ConstantData.DocumentContext.ActAsContainer = e.actascontainer
      ),
      null != e.swimlanenlanes &&
      (
        ConstantData.DocumentContext.SwimlaneNLanes = e.swimlanenlanes
      ),
      null != e.swimlanenvlanes &&
      (
        ConstantData.DocumentContext.SwimlaneNVLanes = e.swimlanenvlanes
      ),
      null != e.swimlanerotate &&
      (
        ConstantData.DocumentContext.SwimlaneRotate = e.swimlanerotate
      ),
      null != e.swimlanetitle &&
      (ConstantData.DocumentContext.SwimlaneTitle = e.swimlanetitle),
      null != e.collapsetools ? ConstantData.DocumentContext.CollapseTools = e.collapsetools : ConstantData.DocumentContext.CollapseTools = !1,
      SDUI.Commands.MainController.Selection.ShowTools(!ConstantData.DocumentContext.CollapseTools),
      Clipboard &&
      Clipboard.FocusOnClipboardInput &&
      setTimeout((function () {
        Clipboard.FocusOnClipboardInput()
      }), 10),
      e.LoadBlockList
    ) return ConstantData.DocumentContext.AllowLayers = 0 == (e.sdp.flags & ConstantData.SessionFlags.SEDS_LockLayers),
      SDUI.Commands.MainController.Document.IdleLayersTabs(),
      void $(document).trigger('SDJS.FileReadComplete', {
        Result: e.error
      });
    if (
      e.tLMB.activelayer < e.tLMB.layers.length &&
      (
        d = e.tLMB.layers[e.tLMB.activelayer].layertype,
        e.tLMB.layers.length > 1
      )
    ) switch (d) {
      case D.SD_LAYERT_TIMELINE:
      case D.SD_LAYERT_MEETING:
        L = GlobalData.optManager.GetLayerIndex(D.SD_LAYERT_GANTT),
          e.tLMB.activelayer = L,
          d = D.SD_LAYERT_GANTT;
      case D.SD_LAYERT_GANTT:
        L = GlobalData.optManager.GetLayerIndex(D.SD_LAYERT_GANTT),
          SDF.OptimizeLinks(e.links, e.tLMB.layers[L].zList);
        break;
      case D.SD_LAYERT_MINDMAP:
        L = GlobalData.optManager.GetLayerIndex(D.SD_LAYERT_MINDMAP),
          SDF.OptimizeLinks(e.links, e.tLMB.layers[L].zList);
        break;
      default:
        if ('swim lanes' === S.toLowerCase()) {
          var F,
            v,
            G,
            N = e.tLMB.layers[1].zList;
          for (v = N.length, F = 0; F < v; F++) if ((G = GlobalData.optManager.GetObjectPtr(N[F], !1)) && G.IsSwimlane()) {
            GlobalData.optManager.RemoveLayer(1),
              e.sdp.flags = Utils2.SetFlag(e.sdp.flags, ConstantData.SessionFlags.SEDS_LockLayers, !1),
              G.moreflags = Utils2.SetFlag(
                G.moreflags,
                ConstantData.ObjMoreFlags.SED_MF_AutoContainer,
                !0
              );
            break
          }
        }
    }
    if (SDF.DeleteOldLayers(e), e.ReadBlocks) {
      for (t = e.noteids.length, a = 0; a < t; a++) e.noteids[a] &&
        !e.usednoteids[a] &&
        (s = GlobalData.objectStore.GetObject(e.noteids[a])) &&
        s.Delete();
      for (t = e.textids.length, a = 0; a < t; a++) e.textids[a] &&
        !e.usedtextids[a] &&
        (s = GlobalData.objectStore.GetObject(e.textids[a])) &&
        s.Delete();
      for (t = e.imageids.length, a = 0; a < t; a++) e.imageids[a] &&
        !e.usedimageids[a] &&
        (s = GlobalData.objectStore.GetObject(e.imageids[a].id)) &&
        s.Delete();
      for (t = e.tableids.length, a = 0; a < t; a++) e.tableids[a] &&
        !e.usedtableids[a] &&
        (s = GlobalData.objectStore.GetObject(e.tableids[a])) &&
        s.Delete();
      for (t = e.graphids.length, a = 0; a < t; a++) e.graphids[a] &&
        !e.usedgraphids[a] &&
        (s = GlobalData.objectStore.GetObject(e.graphids[a])) &&
        (GlobalData.optManager.graph_DeleteObject(s.Data), s.Delete());
      for (t = e.expandedviewids.length, a = 0; a < t; a++) e.expandedviewids[a] &&
        !e.usedexpandedviewids[a] &&
        (s = GlobalData.objectStore.GetObject(e.expandedviewids[a])) &&
        s.Delete();
      for (t = e.ganttids.length, a = 0; a < t; a++) e.ganttids[a] &&
        !e.usedganttids[a] &&
        (s = GlobalData.objectStore.GetObject(e.ganttids[a])) &&
        s.Delete()
    }
    for (
      e.sdp &&
      e.sdp.def.style.Fill.Paint.FillType === ConstantData.FillTypes.SDFILL_TEXTURE &&
      (
        e.ReadBlocks ||
        (
          void 0 === e.sdp.def.style.Fill.Paint.Texture ? e.sdp.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT : e.sdp.def.style.Fill.Paint.Texture < e.TextureList.Textures.length ? e.sdp.def.style.Fill.Paint.Texture = e.TextureList.Textures[e.sdp.def.style.Fill.Paint.Texture].index : e.sdp.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT
        )
      ),
      e.sdp &&
      e.sdp.background.Paint.FillType === ConstantData.FillTypes.SDFILL_TEXTURE &&
      (
        e.ReadBlocks ||
        (
          void 0 === e.sdp.background.Paint.Texture ? e.sdp.background.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT : e.sdp.background.Paint.Texture < e.TextureList.Textures.length ? e.sdp.background.Paint.Texture = e.TextureList.Textures[e.sdp.background.Paint.Texture].index : e.sdp.background.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT
        )
      ),
      GlobalData.optManager.RichGradients = e.RichGradients,
      GlobalData.optManager.HasBlockDirectory = e.HasBlockDirectory,
      (r = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !0)).length = 0,
      t = e.links.length,
      a = 0;
      a < t;
      a++
    ) if (e.links[a].targetid === e.links[a].hookid) {
      var k = GlobalData.optManager.GetObjectPtr(e.links[a].hookid, !0);
      if (k) for (o = k.hooks.length - 1; o >= 0; o--) k.hooks[o].objid === e.links[a].targetid &&
        k.hooks.splice(o, 1)
    } else r.push(e.links[a]);
    for (
      (t = e.DeleteList.length) &&
      (GlobalData.optManager.DeleteObjects(e.DeleteList, !1), e.DeleteList = []),
      a = 0;
      a < r.length;
      a++
    ) {
      var U = GlobalData.optManager.GetObjectPtr(r[a].targetid, !1);
      U instanceof ListManager.PolyLine &&
        U.polylist &&
        U.StyleRecord.Line.BThick &&
        (
          r[a].flags = Utils2.SetFlag(r[a].flags, ConstantData.LinkFlags.SED_L_CHANGE, !0)
        )
    }
    if (
      GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto ? (
        GlobalData.optManager.theContentHeader.MaxWorkDim.x = e.sdp.dim.x - 2 * ConstantData.Defines.SED_EdgeSlop,
        GlobalData.optManager.theContentHeader.MaxWorkDim.y = e.sdp.dim.y - 2 * ConstantData.Defines.SED_EdgeSlop
      ) : (
        GlobalData.optManager.theContentHeader.MaxWorkDim.x = ConstantData.Defines.MaxWorkDimX,
        GlobalData.optManager.theContentHeader.MaxWorkDim.y = ConstantData.Defines.MaxWorkDimY
      ),
      u
    ) for (t = e.zList.length, a = 0; a < t; a++) (l = GlobalData.optManager.GetObjectPtr(e.zList[a], !1)).objecttype === g &&
      (
        I = l.StyleRecord.Line.Thickness,
        Utils2.IsEqual(I, h) ? (
          l.StyleRecord.Line.Thickness = C,
          l.StyleRecord.Line.BThick = C / 2,
          l.ChangeLineThickness(I)
        ) : Utils2.IsEqual(I, m) &&
        (
          l.StyleRecord.Line.Thickness = y,
          l.StyleRecord.Line.BThick = y / 2,
          l.ChangeLineThickness(I)
        )
      );
    if (
      (e.IsLucid || e.IsVisio) &&
      'LINEDRAW_SWIMLANE' === GlobalData.optManager.theContentHeader.BusinessModule
    ) for (t = e.zList.length, a = 0; a < t; a++) (l = GlobalData.optManager.GetObjectPtr(e.zList[a], !1)).DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
      2 === l.hooks.length &&
      0 === l.objecttype &&
      (
        l.objecttype = ConstantData.ObjectTypes.SD_OBJT_BUSLOGIC_LINEDRAW,
        l.subtype = ConstantData.ObjectSubTypes.SD_SUBT_LINEDRAW_SWIMLANE
      );
    if (e.IsLucid) {
      for (
        'LINEDRAW_SWIMLANE' === GlobalData.optManager.theContentHeader.BusinessModule &&
        (
          ConstantData.DocumentContext.LineTool = Resources.LineToolTypes.SegmentedLine,
          e.sdp.flags = Utils2.SetFlag(e.sdp.flags, ConstantData.SessionFlags.SEDS_AutoInsert, !0)
        ),
        t = e.zList.length,
        a = 0;
        a < t;
        a++
      ) l = GlobalData.optManager.GetObjectPtr(e.zList[a], !1),
        GlobalData.optManager.UngroupVisioShapes(l, e.DeleteList),
        e.DeleteList.length &&
        (GlobalData.optManager.DeleteObjects(e.DeleteList, !1), e.DeleteList = []);
      SDUI.MarketingActionLogger.Log(SDUI.MarketingActionCodes.ImportLucid_Complete)
    } (e.IsLucid || e.IsVisio) &&
      (
        !GlobalData.optManager.theContentHeader.SDDataID ||
        GlobalData.optManager.theContentHeader.SDDataID < 0
      ) &&
      ListManager.SDData.CreateDefaultSDData(),
      e.sdp.Page = Utils1.DeepCopy(GlobalData.optManager.theContentHeader.Page),
      GlobalData.optManager.UpdateLinks(),
      GlobalData.optManager.UpdateLineHops(!0),
      GlobalDatagFlowChartManager.UpdateSwimlanes(),
      GlobalData.optManager.RenderAllSVGObjects();
    var J,
      x,
      O = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theTEDSessionBlockID, !1);
    for (
      O.theActiveTextEditObjectID = - 1,
      O.theActiveTableObjectID = - 1,
      O.theActiveTableObjectIndex = - 1,
      O.theActiveOutlineObjectID = - 1,
      O.theTELastOp = ConstantData.TELastOp.INIT,
      e.sdp.tselect >= 0 &&
      (c.push(e.sdp.tselect), GlobalData.optManager.SelectObjects(c, !1, !1)),
      t = e.zList.length,
      a = 0;
      a < t;
      a++
    ) if (l = GlobalData.optManager.GetObjectPtr(e.zList[a], !1)) {
      if (
        l.IsSwimlane() ? l.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete &&
          (
            l.extraflags = Utils2.SetFlag(l.extraflags, ConstantData.ExtraFlags.SEDE_NoDelete, !1)
          ) : l.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER &&
          (x = l.GetTable(!1)) &&
        GlobalData.optManager.Table_SortChildContainers(l, x),
        l.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT ? GlobalData.optManager.Timeline_UpdateBlockIDEvent(l) : l.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_TIMELINE &&
          (
            GlobalData.optManager.Timeline_UpdateBlockID(l),
            GlobalData.optManager.Timeline_UpdateCellTimes(l)
          ),
        l.Dimensions &&
        e.sdp.tselect != l.BlockID &&
        l.Dimensions & ConstantData.DimensionFlags.SED_DF_Select
      ) {
        var B = GlobalData.optManager.svgObjectLayer.GetElementByID(l.BlockID);
        if (B && l.Dimensions) {
          var H = null;
          for (o = 0, o = B.ElementCount() - 1; o >= 1; o--) (H = B.GetElementByIndex(o)).GetID() != ConstantData.SVGElementClass.DIMENSIONLINE &&
            H.GetID() != ConstantData.SVGElementClass.DIMENSIONTEXT ||
            H.SetOpacity(0)
        }
      }
      if (
        0 === l.objecttype &&
        l.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASK &&
        GlobalData.optManager.FixMindmapCelltypes(l),
        SDF.FixObjecttypes(l),
        l.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART &&
        l.GetGanttInfo()
      ) e.FromWindows &&
        GlobalData.optManager.GanttCleanUpStyles(l),
        GlobalData.optManager.ConfirmPlanningFields(l.datasetTableID),
        GlobalData.optManager.Table_EnsureDateFormatCorrect(l.BlockID, e.AddEMFHash),
        J = l,
        e.isTemplate ? GlobalData.optManager.PlanningTableUpdateStartDate() : e.sdp.moreflags & ConstantData.SessionMoreFlags.SEDSM_HideLayerTabs &&
          GlobalData.optManager.UpdateStartDateForHiddenGanttLayer(J.BlockID),
        GlobalData.optManager.VisibleZList().indexOf(l.BlockID) >= 0 &&
        (
          GlobalData.optManager.PlanningTableUpdateGeometry(l, !0, !0),
          e.AddEMFHash &&
          (
            GlobalData.optManager.GanttUpdateDependencyLines(l.BlockID),
            GlobalData.optManager.UpdateLinks()
          ),
          GlobalData.optManager.RenderDirtySVGObjects()
        )
    }
    switch (d) {
      case D.SD_LAYERT_TIMELINE:
      case D.SD_LAYERT_MEETING:
        GlobalData.optManager.MakeLayerActiveByIndex(GlobalData.optManager.GetLayerIndex(D.SD_LAYERT_GANTT)),
          GlobalData.optManager.RenderAllSVGObjects()
    }
    if (J) switch (d) {
      case D.SD_LAYERT_GANTT:
      case D.SD_LAYERT_MINDMAP:
      case D.SD_LAYERT_TIMELINE:
      case D.SD_LAYERT_MEETING:
        GlobalData.optManager.TrimPersonTable(J.datasetID, J.datasetTableID)
    }
    if (
      GlobalData.optManager.theContentHeader.ParentPageID.length &&
      !0 === SDUI.AppSettings.UseBackplane
    ) {
      var V = SDUI.SDBackplane.CurrentClientSession.PageID,
        j = SDUI.BackplaneEditorMainController.BackplanePages.GetPageName(GlobalData.optManager.theContentHeader.ParentPageID);
      V !== GlobalData.optManager.theContentHeader.ParentPageID &&
        SDF.SubProcess_UpdateChild(j),
        GlobalData.optManager.theContentHeader.ParentPageID = '',
        SDF.WriteAllBlocks()
    }
    GlobalData.optManager.PreserveUndoState(!0),
      GlobalData.optManager.ResetStateManager(),
      GlobalData.optManager.theContentHeader.Save_HistoryState = - 1,
      GlobalData.optManager.ClearFutureUndoStates(),
      GlobalData.optManager.SetDocDirtyState(!1),
      TestServer.currentblocklist.length = 0,
      TestServer.StateSent = 0,
      ConstantData.DocumentContext.AllowLayers = 0 == (e.sdp.flags & ConstantData.SessionFlags.SEDS_LockLayers),
      e.WindowSettings &&
      SDUI.Commands.MainController.SmartPanels.SetLeftPanelMode(e.WindowSettings.leftpanelmode),
      SDUI.Commands.MainController.SmartPanels.IdleSmartPanel(!0),
      SDUI.Commands.MainController.Document.IdleLayersTabs(),
      GlobalData.optManager.ShowLoading(!1),
      GlobalData.optManager.FitDocumentWorkArea(!0, !1);
    var z = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1);
    if (GlobalData.optManager.UpdateSelectionAttributes(z), e.isTemplate) {
      var W = null;
      if (
        null == (
          W = !0 === SDUI.AppSettings.PagedSDR2 ? SDUI.Commands.MainController.PagedSDRController.GetManifest2() : SDUI.Commands.MainController.PagedSDRController.GetManifest()
        ) ||
        0 === W.TabOrder.length
      ) {
        var q = Resources.Controls.WA_PagesToolbar.PageList.GetControl(),
          K = Resources.Controls.Modal_TemplateDialogIframe.Iframe.GetControl();
        if (
          SDUI.Commands.MainController.PagedSDRController.Initialize(q, K),
          !0 === SDUI.AppSettings.PagedSDR2
        ) {
          var X = new Resources.PagedSDRManifest2;
          SDUI.Commands.MainController.PagedSDRController.Build2(X)
        } else {
          X = new Resources.PagedSDRManifest;
          SDUI.Commands.MainController.PagedSDRController.Build(X)
        }
      }
    }
    return e.isTemplate &&
      e.rulerSettings &&
      e.rulerSettings.useInches &&
      e.rulerSettings.show &&
      ConstantData.DocumentContext.UserSettings &&
      0 == (
        ConstantData.DocumentContext.UserSettings.HelpTipStatus & Globals.HintFlags.Units
      ) &&
      SDUI.Commands.MainController.ShowModeless(Resources.Controls.Modals.Hint_Metric.Id),
      SDUI.AppSettings.Application !== Resources.Application.Viewer &&
      (
        ListManager.SDData.StartFieldedDataUpdateService(),
        SDUI.Commands.MainController.CollabOverlayController.InitCollabOverlay(),
        Collab.Cursors = []
      ),
      $(document).trigger('SDJS.FileReadComplete', {
        Result: e.error
      }),
      $(document).trigger(Constants.Event_HideLoadScreen),
      e.error
  },
  SDF.SetTheme = function (e) {
    SDUI &&
      SDUI.Commands &&
      SDUI.Commands.MainController &&
      SDUI.Commands.MainController.Theme ? SDUI.Commands.MainController.Theme.LoadCustomThemes(
        (
          function () {
            if (
              !SDUI.Commands.MainController.Theme.ValidateThemeName(e.CurrentTheme)
            ) return void (e.CurrentThemeName = '');
            Resources.CurrentTheme.Name != e.CurrentTheme &&
              SDUI.Commands.MainController.Theme.SwitchTheme(e.CurrentTheme)
          }
        )
      ) : setTimeout((() => SDF.SetTheme(e)), 250)
  },
  SDF.IsSDON = function (e) {
    var t = e.slice(0, 500),
      a = String.fromCharCode.apply(null, new Uint8Array(t));
    return !(!a || !a.length || '{' != a[0])
  },
  SDF.IsJSNFJSON = function (e) {
    var t = e.slice(0, 100),
      a = String.fromCharCode.apply(null, new Uint8Array(t));
    return !!(
      a &&
      a.length &&
      '{' == a[0] &&
      a.indexOf &&
      a.indexOf('"Document":') >= 0
    )
  },
  SDF.ConvertBPMNPool = function (e) {
    var t = ConstantData.ObjectTypes;
    e.objecttype === t.SD_OBJT_BPMN_POOL &&
      (
        e.objecttype = t.SD_OBJT_SWIMLANE_COLS,
        e.GetTable(!1).cells[0].celltype = ListManager.Table.CellTypes.SD_CT_SWIMLANE_TITLE
      )
  },


  SDF.ReadFile = function (e, t, a, r) {
    var i = new FileReader,
      n = new SDF.Result;
    gFmtTextObj = null;
    var o,
      s = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      l = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1);
    return n.isTemplate = t,
      n.sdp = s,
      n.tLMB = l,
      n.gHash = new HashController(),// new SDUI.HashController,
      SDF.FragmentLoad_RefCount = 0,
      i.onload = function (t) {
        try {
          o = this,
            GlobalData.optManager.ShowLoading(!0),
            setTimeout(
              (
                function () {
                  try {
                    if (SDF.IsJSNFJSON(o.result)) {
                      var t = new Blob([o.result]);
                      return ConstantData.DocumentContext.ImportingJSNF = !0,
                        GlobalData.optManager.ShowLoading(!0),
                        S(),
                        void setTimeout(
                          (
                            function () {
                              SDUI.Commands.MainController.JSNFImport.ReadJSONFile(t, !0)
                            }
                          ),
                          100
                        )
                    }
                    return SDF.IsSDON(o.result) ? (
                      t = new Blob([o.result]),
                      SDUI.Commands.MainController.ShowModal(Resources.Controls.Modals.Loading.Id, (function () {
                      })),
                      S(),
                      void setTimeout((function () {
                        SDJS.API.ReadJSONFile(t, !0)
                      }), 100)
                    ) : (
                      SDF.ReadFileFromBuffer(o.result, n),
                      void 0 !== e.msClose &&
                      e.msClose(),
                      a &&
                      a(r, n.error),
                      n.error
                    )
                  } catch (t) {
                    void 0 !== e.msClose &&
                      e.msClose(),
                      GlobalData.optManager.ExceptionCleanup(t)
                  }
                }
              ),
              100
            )
        } catch (t) {
          void 0 !== e.msClose &&
            e.msClose(),
            GlobalData.optManager.ExceptionCleanup(t)
        }
      },
      i.readAsArrayBuffer(e),
      n.error;
    function S() {
      var e = function () {
        window.setTimeout(
          (
            function () {
              var e = Resources.Controls.Modals.Loading.GetControl();
              null != e &&
                - 1 !== SDUI.Commands.MainController.Modals.ActiveModals.indexOf(Resources.Controls.Modals.Loading.Id) &&
                e.modal('hide'),
                GlobalData.optManager.ShowLoading(!1)
            }
          ),
          2000
        ),
          !0 === SDUI.AppSettings.UseBackplane ? SDUI.CustomEvents.Off(SDUI.BP.Constants.Event_FileReadComplete, e) : $(document).off(Constants.Event_HideLoadScreen, e)
      };
      !0 === SDUI.AppSettings.UseBackplane ? SDUI.CustomEvents.On(SDUI.BP.Constants.Event_FileReadComplete, e) : $(document).on(Constants.Event_HideLoadScreen, e)
    }
  },



  SDF.ReadSymbolFromBuffer = function (e, t, a, r, i, n, o, s, l, S, c, u, p, d) {
    var D,
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
      M = !1,
      P = new SDF.Result;

    var gFmtTextObj = null;
    var R = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !0),
      A = [];
    P.isTemplate = !1,
      P.IgnoreHeader = !0,
      // P.sdp = new ListManager.SEDSession,
      P.sdp = new SEDSession(),
      P.sdp.def.style = Utils1.DeepCopy(R.def.style),
      P.isSymbol = 0 != d,
      P.gHash = new HashController(),// new SDUI.HashController,
      // P.tLMB = new ListManager.LayersManager,
      P.tLMB = new LayersManager(),
      P.AllowAddEMFHash = u,
      SDF.FragmentLoad_RefCount = 0,
      c &&
      (
        0 == (
          c.ObjectAttributeFlags & ListManager.LibraryFlags.SEDL_NoColor
        ) &&
        (P.SetColorChanges = !0, P.ColorFilter = c.ColorFilter),
        M = !0
      ),
      S &&
      (P.NoTextBlocks = !0),
      null != t &&
      (P.SymbolPosition.x = t),
      null != a &&
      (P.SymbolPosition.y = a);
    var _ = SDF.ReadBuffer(e, P, r, !1, SDF.ReadSymbolFromBuffer_Complete);
    if (_ && _ != SDF.Errors.WaitingForCallBack) return i ||
      // Utils2.Alert(Resources.Strings['SDRRead_Error_' + _], null),
      P.error;
    if (P.WarnMeta) {
      if (i) return SDF.Errors.WarnMeta;
      alert('Metafile not read')
    }
    if (
      p &&
      (p.x = P.sdp.dim.x, p.y = P.sdp.dim.y),
      _ !== SDF.Errors.WaitingForCallBack
    ) {
      var E = GlobalData.optManager.IsPlanningDocument(),
        w = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !0);
      for (
        g = P.zList.length,
        // Collab.AddToCreateList(null, P.zList),
        h = 0;
        h < g;
        h++
      ) {
        (C = GlobalData.optManager.GetObjectPtr(P.zList[h], !1)).objecttype === ConstantData.ObjectTypes.SD_OBJT_BPMN_POOL &&
          SDF.ConvertBPMNPool(C);
        var F = - 1;
        C.datasetID >= 0 &&
          (
            F = ListManager.SDData.GetTableID(C.datasetID, ListManager.DataTableNames.PLANNING_TASKS)
          ),
          E &&
            null != C.Layer &&
            (
              F >= 0 ||
              C.objecttype === ConstantData.ObjectTypes.SD_OBJT_MINDMAP_CONNECTOR
            ) ? D = w.layers[C.Layer].zList : (D = w.layers[w.activelayer].zList, C.Layer = w.activelayer),
          D.push(P.zList[h]),
          P.IsVisio &&
          C &&
          C.ShapeType === ConstantData.ShapeType.GROUPSYMBOL &&
          C.InitialGroupBounds.x < 0 &&
          (C.InitialGroupBounds.x = 1),
          GlobalData.optManager.AddToDirtyList(P.zList[h]),
          C &&
          0 == (C.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
          o.selectedList.push(P.zList[h]),
          null == P.SDData &&
          (
            C.datasetTableID = - 1,
            C.datasetElemID = - 1,
            C.datasetID = - 1,
            C.datasetType = - 1,
            C.dataStyleOverride = null
          )
      }
      if (
        A.length &&
        GlobalData.optManager.DeleteObjects(A),
        P.SDData &&
        GlobalData.optManager.SDData_Transfer(P.zList, P.SDData, M),
        b = P.links.length,
        !l &&
        b > 0
      ) {
        for (
          m = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !0),
          h = 0;
          h < b;
          h++
        ) m.push(P.links[h]);
        m.sort((function (e, t) {
          return e.targetid - t.targetid
        }))
      }
      var v = 0;
      for (h = 0; h < g; h++) (C = GlobalData.optManager.GetObjectPtr(P.zList[h], !1)) &&
        0 == (C.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
        (
          0 === v ? y = new Rectangle(C.r.x, C.r.y, C.r.width, C.r.height) : Utils2.UnionRect(C.r, y, y),
          // 0 === v ? y = new GlobalDataShape.Rectangle(C.r.x, C.r.y, C.r.width, C.r.height) : Utils2.UnionRect(C.r, y, y),
          v++
        );
      if (y) {
        if (s ? (f = y.x < 0 ? - y.x : 0, L = y.y < 0 ? - y.y : 0) : (f = 0, L = 0), f || L) for (h = 0; h < g; h++) (C = GlobalData.optManager.GetObjectPtr(P.zList[h], !1)) &&
          0 == (C.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
          C.OffsetShape(f, L);
        if (s) {
          y.x += f,
            y.y += L,
            f = 0,
            L = 0,
            I = 0,
            T = 0;
          var G = {
            x: R.dim.x,
            y: R.dim.y
          };
          if (
            y.x + y.width > R.dim.x &&
            (
              GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto ? (f = y.x + y.width - R.dim.x, I = 0) : (I = y.x + y.width, R.dim.x = I)
            ),
            y.y + y.height > R.dim.y &&
            (
              GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto ? L = y.y + y.height - R.dim.y : (T = y.y + y.height, R.dim.y = T)
            ),
            I ||
            T
          ) {
            var N = (
              w = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1)
            ).nlayers,
              k = !1,
              U = !1;
            for (
              w.layers[w.activelayer].flags & ConstantData.LayerFlags.SDLF_UseEdges &&
              (k = !0),
              h = 0;
              h < N;
              h++
            ) if (
                w.layers[h].flags & ConstantData.LayerFlags.SDLF_UseEdges &&
                w.layers[h].flags & ConstantData.LayerFlags.SDLF_Visible ||
                k
              ) {
                U = !0;
                break
              }
            U &&
              GlobalData.optManager.UpdateEdgeLayers([], G, R.dim),
              GlobalData.docHandler.ResizeDocument(R.dim.x, R.dim.y)
          } else if (f || L) for (h = 0; h < g; h++) (C = GlobalData.optManager.GetObjectPtr(P.zList[h], !1)) &&
            0 == (C.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
            C.OffsetShape(- f, - L)
        }
      }
      return !l &&
        s &&
        GlobalData.optManager.UpdateLinks(),
        n ? GlobalData.optManager.RenderDirtySVGObjects() : 1 === g &&
          GlobalData.optManager.RenderDirtySVGObjectsNoSetMouse(),
        P.error
    }
  },
  SDF.ReadSymbolFromBuffer_Complete = function (e) {
    debugger
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
      d = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !0),
      D = {
        selectedList: []
      };
    for (
      t = GlobalData.optManager.ZListPreserve(),
      a = e.zList.length,
      Collab.AddToCreateList(null, e.zList),
      r = 0;
      r < a;
      r++
    ) t.push(e.zList[r]),
      n = GlobalData.optManager.GetObjectPtr(e.zList[r], !1),
      GlobalData.optManager.AddToDirtyList(e.zList[r]),
      n &&
      0 == (n.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
      D.selectedList.push(e.zList[r]),
      (p = n.GetTable(!1)) &&
      GlobalData.optManager.Table_Format(n, p, n.TextGrow, !1);
    for (
      i = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !0),
      u = e.links.length,
      r = 0;
      r < u;
      r++
    ) i.push(e.links[r]);
    i.sort((function (e, t) {
      return e.targetid - t.targetid
    }));
    var g = 0;
    for (r = 0; r < a; r++) (n = GlobalData.optManager.GetObjectPtr(e.zList[r], !1)) &&
      0 == (n.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
      (
        0 === g ? o = new Rectangle(n.Frame.x, n.Frame.y, n.Frame.width, n.Frame.height) : Utils2.UnionRect(n.Frame, o, o),
        g++
      );
    if (o) {
      if (s = o.x < 0 ? - o.x : 0, l = o.y < 0 ? - o.y : 0, s || l) for (r = 0; r < a; r++) (n = GlobalData.optManager.GetObjectPtr(e.zList[r], !1)) &&
        0 == (n.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
        n.OffsetShape(s, l);
      o.x += s,
        o.y += l,
        o.x + o.width > d.dim.x &&
        (S = o.x + o.width, d.dim.x = S),
        o.y + o.height > d.dim.y &&
        (c = o.y + o.height, d.dim.y = c),
        (S || c) &&
        GlobalData.docHandler.ResizeDocument(d.dim.x, d.dim.y)
    }
    return GlobalData.optManager.UpdateLinks(),
      GlobalData.optManager.RenderDirtySVGObjects(),
      e.error
  },
  SDF.ReadTableFromBuffer = function (e) {
    var t,
      a = null,
      r = FileParser.SDROpCodesByName,
      i = new T3DataStream(e),
      n = SDF.SDF_MINFVERSION,
      o = new SDF.Result;
    gFmtTextObj = null;
    var s = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    SDF.SetDefaults(s, o),
      o.isTemplate = !1,
      // o.sdp = new ListManager.SEDSession,
      o.sdp = new SEDSession(),
      o.sdp.def.style = Utils1.DeepCopy(s.def.style),
      o.isSymbol = !0,
      o.gHash = new HashController(),// new SDUI.HashController,
      // o.tLMB = new ListManager.LayersManager,
      o.tLMB = new LayersManager(),
      o.NoTextBlocks = !0;
    new Uint8Array(e);
    i.endianness = T3DataStream.LITTLE_ENDIAN;
    var l = i.readStruct(FileParser.SDR_Parser_HeaderOnly_Struct);
    if (i = null, !l || !l.start || l.start != SDF.Signature) return o.error = SDF.Errors.UnknownFile,
      null;
    if (!(l.codes.length >= 1)) return o.error = SDF.Errors.UnknownFile,
      null;
    if (
      l.codes[0].code !== FileParser.SDROpCodesByName.SDF_C_VERSION
    ) return o.error = SDF.Errors.UnknownFile,
      null;
    if (l.codes[0].data.MinVer > SDF.SDF_FVERSION) return o.error = SDF.Errors.Version,
      o.error;
    if (l.codes[0].data.FVersion < n) return o.error = SDF.Errors.MinVersion,
      null;
    for (
      l.codes[0].data.FVersion < SDF.SDF_FVERSION &&
      (
        o.ConvertOnSave = !0,
        l.codes[0].data.FVersion <= SDF.FVERSIONVSM &&
        (o.AddEMFHash = !0)
      ),
      o.PVersion = l.codes[0].data.PVersion,
      o.FVersion = l.codes[0].data.FVersion,
      o.coordScaleFactor = GlobalData.docHandler.svgDoc.docInfo.docDpi / l.codes[0].data.drawres,
      (i = new T3DataStream(e)).endianness = T3DataStream.LITTLE_ENDIAN,
      l = i.readStruct(FileParser.SDR_Parser_Struct),
      i = null,
      t = 1;
      l.codes[t].code != FileParser.SDROpCodesByName.SDF_C_ENDFILE;
    ) {
      switch (l.codes[t].code) {
        case r.SDF_C_FONTLIST:
          t = SDF.ReadFontList(l, t, o, r);
          break;
        case r.SDF_C_TABLEVP:
          a = new ListManager.Table,
            t = SDF.ReadTable(a, l, t, o, r, r.SDF_C_TABLEVP_END);
          break;
        default:
          l.codes[t].code & SDF.SDF_BEGIN &&
            (
              t = SDF.ReadFrame(l, t, l.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      if (t < 0) break;
      t++
    }
    return a
  },
  SDF.ReadTexturesFromBuffer = function (e) {
    console.log('SDF.ReadTexturesFromBuffer -------- ', e);
    var t = FileParser.SDROpCodesByName;
    var a = new SDF.Result();
    var r = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);

    a.isTemplate = !1;
    // a.sdp = new ListManager.SEDSession();
    a.sdp = new SEDSession();
    a.sdp.def.style = Utils1.DeepCopy(r.def.style);
    a.isSymbol = !0;
    a.gHash = new HashController();// new SDUI.HashController();
    a.coordScaleFactor = GlobalData.docHandler.svgDoc.docInfo.docDpi / SDF.DRAWRES;
    // a.tLMB = new ListManager.LayersManager();
    a.tLMB = new LayersManager();

    var i = new T3DataStream(e);
    console.log('SDJS_SDF.js ReadTexturesFromBuffer i1', i);

    i.endianness = T3DataStream.LITTLE_ENDIAN;
    console.log('SDJS_SDF.js ReadTexturesFromBuffer i2', i);
    var n = i.readStruct(FileParser.SDR_Parser_Struct);
    console.log('SDJS_SDF.js ReadTexturesFromBuffer n', n);
    i = null;

    SDF.ReadTextureList(n, 0, a, t, !0);
    return a.TextureList;
  },
  SDF.ReadSymbolFile = function (e, t, a) {
    var r = new FileReader;
    return r.onload = function (r) {
      var i = SDF.ReadSymbolFromBuffer(this.result, t, a, 4, !1, !0, {
        selectedList: []
      }, !0, !1, !1, !1, !0);
      return void 0 !== e.msClose &&
        e.msClose(),
        i
    },
      r.readAsArrayBuffer(e),
      0
  },
  SDF.ParseGroupBuffer = function (e, t, a) {
    var r,
      i = new T3DataStream(e),
      n = SDF.SDF_MINFVERSION;
    t.isSymbol &&
      (n = SDF.SDF_MINSVERSION),
      i.endianness = T3DataStream.LITTLE_ENDIAN,
      4 === a ? (r = i.readUint32() + 4) < i._byteLength &&
        (i._byteLength = r) : a &&
      i.readUint8Array(a);
    var o = i.readStruct(FileParser.SDR_Parser_HeaderOnly_Struct);
    return i = null,
      o &&
        o.start &&
        o.start == SDF.Signature &&
        o.codes.length >= 1 ? o.codes[0].code !== FileParser.SDROpCodesByName.SDF_C_VERSION ? (t.error = SDF.Errors.UnknownFile, null) : o.codes[0].data.MinVer > SDF.SDF_FVERSION ? (t.error = SDF.Errors.Version, null) : o.codes[0].data.FVersion < n ? (t.error = SDF.Errors.MinVersion, null) : (
          (i = new T3DataStream(e)).endianness = T3DataStream.LITTLE_ENDIAN,
          4 === a ? (r = i.readUint32() + 4) < i._byteLength &&
            (i._byteLength = r) : a &&
          i.readUint8Array(a),
          o = i.readStruct(FileParser.SDR_Parser_Struct),
          i = null,
          o
        ) : (t.error = SDF.Errors.UnknownFile, null)
  },
  SDF.ValidateObjectHashCodes = function (e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u,
      p = a,
      d = [];
    for (d.push(p); t.codes[a].code != n;) {
      switch (t.codes[a].code) {
        case i.SDF_C_TABLEVP:
        case i.SDF_C_TABLEID:
          return a;
        case i.SDF_C_EMFHASH:
          o = t.codes[a].data.name;
          break;
        case i.SDF_C_NATIVESTORAGE:
          t.codes[p].data.nativeindex = a;
          break;
        case i.SDF_C_DRAWMETA:
          if (
            void 0 === o &&
            (
              o = r.gHash.GetHash(t.codes[a].data.BlobBytes),
              t.codes[a].data.EMFHash = o
            ),
            s = r.HashRecords.length,
            S = !0,
            e
          ) {
            for (d = [], u = e.length, c = 0; c < u; c++) d.push(e[c]);
            d.push(p)
          }
          for (l = 0; l < s; l++) if (r.HashRecords[l].EMFHash === o) {
            r.HashRecords[l].cindexes.push(d),
              S = !1;
            break
          }
          if (S) {
            var D = new SDF.SVGHashRecord(o);
            D.cindexes.push(d),
              r.HashRecords.push(D)
          }
      }
      a++
    }
    return a
  },
  SDF.ValidateHashCodes = function (e, t, a, r, i, n) {
    for (
      var o = function (e) {
        try {
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
            C,
            y = [],
            f = [];
          if (
            SDF.FragmentLoad_RefCount = Math.max(0, SDF.FragmentLoad_RefCount - 1),
            e
          ) for (l = e.length, s = 0; s < l; s++) for (
            SDUI.Commands.MainController.PagedSDRController.LoadingSmartDrawHashes = !0,
            c = (p = e[s].cindexes).length,
            S = 0;
            S < c;
            S++
          ) {
            for (
              h = (u = p[S])[0],
              d = u.length,
              g = t,
              D = 1;
              D < d &&
              null != (g = g.codes[h].data.groupcodelist);
              D++
            ) h = u[D];
            null != g &&
              (
                e[s].png &&
                (g.codes[h].data.UsePNG = !0),
                g.codes[h].data.HasSVG = e[s].svg,
                g.codes[h].data.HasColorSVG = e[s].svgcolor,
                e[s].svg ||
                  e[s].svgcolor ||
                  e[s].png ? g.codes[h].data.nativeindex &&
                delete g.codes[h].data.nativeindex : g.codes[h].data.nativeindex &&
                y.push({
                  codelist: g,
                  index: h,
                  cindexes: u
                })
              )
          }
          if (l = y.length) {
            for (r.HashRecords = [], s = 0; s < l; s++) {
              m = y[s].index,
                h = (g = y[s].codelist).codes[m].data.nativeindex;
              var L = SDF.ParseGroupBuffer(g.codes[h].data.data, r, 0);
              if (L) {
                for (f = [], c = y[s].cindexes.length, S = 0; S < c; S++) f.push(y[s].cindexes[S]);
                if (
                  g.codes[m].data.groupcodelist = L,
                  g.codes[m].data.groupindex = h,
                  g.codes[h].data.groupcodelist = L,
                  C = SDF.ValidateHashCodes(f, L, a, r, !0, null)
                ) return C
              }
            }
            n &&
              (
                r.HashRecords.length ? (
                  SDF.FragmentLoad_RefCount++,
                  SDUI.CMSContent.HashesExist(SDUI.AppSettings.ContentSource, r.HashRecords, o)
                ) : (SDF.FragmentLoad_RefCount++, o(r.HashRecords))
              )
          } else {
            if (
              (C = SDF.ReadBuffer_Complete(t, r, i)) &&
              C != SDF.Errors.WaitingForCallBack
            ) return SDUI.Commands.MainController.ActiveSessionController.ReturnToTemplateDialog = !0,
              SDUI.Commands.MainController.ActiveSessionController.UpdateAlertModal(Resources.Strings['SDRRead_Error_' + C], 1),
              r.error;
            n(r),
              $(document).trigger(Constants.Event_EMFsLoaded)
          }
        } catch (e) {
          GlobalData.optManager.ExceptionCleanup(e)
        }
      },
      s = 1;
      t.codes[s].code != FileParser.SDROpCodesByName.SDF_C_ENDFILE;
    ) {
      switch (t.codes[s].code) {
        case a.SDF_C_DRAWOBJ8:
          s = SDF.ValidateObjectHashCodes(
            e,
            t,
            s,
            r,
            a,
            FileParser.SDROpCodesByName.SDF_C_DRAWOBJ8_END
          );
          break;
        case a.SDF_C_DRAWOBJ:
          s = SDF.ValidateObjectHashCodes(e, t, s, r, a, FileParser.SDROpCodesByName.SDF_C_DRAWOBJ_END)
      }
      s++
    }
    if (n) {
      if (SDF.FragmentLoad_RefCount++, !r.HashRecords.length) return o(r.HashRecords);
      SDUI.Commands.MainController.PagedSDRController.LoadingSmartDrawHashes = !0,
        SDUI.CMSContent.HashesExist(SDUI.AppSettings.ContentSource, r.HashRecords, o)
    }
  },
  SDF.ReadBuffer = function (e, t, a, r, i) {
    // debugger
    var n,
      o = FileParser.SDROpCodesByName,
      s = new T3DataStream(e),
      l = SDF.SDF_MINFVERSION;
    t.isSymbol &&
      (l = SDF.SDF_MINSVERSION),
      s.endianness = T3DataStream.LITTLE_ENDIAN,
      4 === a ? (n = s.readUint32() + 4) < s._byteLength &&
        (s._byteLength = n) : a &&
      s.readUint8Array(a);
    // var S = s.readStruct(FileParser.SDR_Parser_HeaderOnly_Struct);
    var S = s.readStruct(FileParser.SDR_Parser_HeaderOnly_Struct);
    if (s = null, !S || !S.start || S.start != SDF.Signature) return t.error = SDF.Errors.UnknownFile,
      t.error;
    if (!(S.codes.length >= 1)) return t.error = SDF.Errors.UnknownFile,
      t.error;
    if (
      S.codes[0].code !== FileParser.SDROpCodesByName.SDF_C_VERSION
    ) return t.error = SDF.Errors.UnknownFile,
      t.error;
    if (S.codes[0].data.MinVer > SDF.SDF_FVERSION) return t.error = SDF.Errors.Version,
      t.error;
    if (S.codes[0].data.FVersion < l) return t.error = SDF.Errors.MinVersion,
      t.error;
    switch (
    S.codes[0].data.FVersion < SDF.SDF_FVERSION &&
    (
      t.ConvertOnSave = !0,
      S.codes[0].data.FVersion <= SDF.FVERSIONVSM &&
      (!1 === t.isTemplate && !1 === t.isSymbol || t.AllowAddEMFHash) &&
      (t.AddEMFHash = !0)
    ),
    S.codes[0].data.Platform
    ) {
      case FileParser.Platforms.SDF_SDJSBLOCK:
      case FileParser.Platforms.SDF_SDJS:
        break;
      case FileParser.Platforms.SDF_VISIO:
        t.IsVisio = !0;
        break;
      case FileParser.Platforms.SDF_VISIOLUCID:
        t.IsVisio = !0,
          t.IsLucid = !0;
        break;
      default:
        (!1 === t.isTemplate && !1 === t.isSymbol || t.AllowAddEMFHash) &&
          (t.AddEMFHash = !0),
          t.FromWindows = !0
    }
    switch (
    !t.AddEMFHash ||
    t.isSymbol ||
    r ||
    (t.ValidateHashesAsync = !0),
    t.PVersion = S.codes[0].data.PVersion,
    t.FVersion = S.codes[0].data.FVersion,
    t.FVersion < SDF.SDF_FVERSION2022 ? t.coordScaleFactor = GlobalData.docHandler.svgDoc.docInfo.docDpi / S.codes[0].data.drawres : t.coordScaleFactor = 1,
    S.codes[0].data.Platform === FileParser.Platforms.SDF_SDJSBLOCK &&
    (t.ReadBlocks = !0),
    S.codes[0].data.Platform
    ) {
      case FileParser.Platforms.SDF_SDJSBLOCK:
      case FileParser.Platforms.SDF_SDJS:
    }
    return t.updatetext = !0,
      (s = new T3DataStream(e)).endianness = T3DataStream.LITTLE_ENDIAN,
      4 === a ? (n = s.readUint32() + 4) < s._byteLength &&
        (s._byteLength = n) : a &&
      s.readUint8Array(a),
      S = s.readStruct(FileParser.SDR_Parser_Struct),
      s = null,
      1,
      t.ValidateHashesAsync &&
        i ? SDF.ValidateHashCodes(null, S, o, t, r, i) ||
      SDF.Errors.WaitingForCallBack : (
        // SDUI.Commands.MainController.PagedSDRController.LoadingSmartDrawHashes = !1,
        SDF.ReadBuffer_Complete(S, t, r),
        t.error
      )
  },
  SDF.ReadBuffer_Complete = function (e, t, a) {
    try {
      var r,
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
        D = FileParser.SDROpCodesByName,
        g = 0,
        h = ConstantData.Defines.SED_CDim,
        m = ConstantData.ConnectorDefines.SEDA_NSkip,
        C = !1;
      for (
        r = 1;
        e.codes[r].code != FileParser.SDROpCodesByName.SDF_C_ENDFILE;
      ) {
        switch (e.codes[r].code) {
          case D.SDF_C_BLOCKDIRECTORY:
            t.HasBlockDirectory = !0;
            break;
          case D.SDF_C_SDDATABLOCK:
            ListManager.SDData.LoadDataSets(e.codes[r].data.bytes, !0, !0, t),
              C = !0;
          case D.SDF_C_SDDATA64C:
            if (C) break;
            ListManager.SDData.LoadDataSets(e.codes[r].data.bytes, !0, !0, t),
              C = !0;
            break;
          case D.SDF_C_SDDATA64:
            if (C) break;
            if (t.PVersion < SDF.SDF_PVERSION861) break;
            ListManager.SDData.LoadDataSets(e.codes[r].data.bytes, !0, !1, t),
              C = !0;
          case D.SDF_C_SDDATA:
          case D.SDF_C_GUIDSTR:
          case D.SDF_C_SDTS_TIMESTAMPS:
          case D.SDF_C_THUMBNAIL:
          case D.SDF_C_CTHUMBNAIL:
          case D.SDF_C_KEYWORDS:
          case D.SDF_C_DESCRIPTION:
          case D.SDF_C_FILEPATH:
          case D.SDF_C_TRIALDATA:
          case D.SDF_C_CMSDATA:
          case D.SDF_C_TLICENSE:
            break;
          case D.SDF_C_FONTLIST:
            r = SDF.ReadFontList(e, r, t, D);
            break;
          case D.SDF_C_HEADER:
            if (r = SDF.ReadHeader(e, r, t, D), t.error) return t.error;
            break;
          case D.SDF_C_DRAW12:
            if ((r = SDF.ReadDraw(e, r, t, D, D.SDF_C_DRAW12_END)) < 0) break;
            break;
          case D.SDF_C_DRAW8:
            if ((r = SDF.ReadDraw(e, r, t, D, D.SDF_C_DRAW8_END)) < 0) break;
            break;
          case D.SDF_C_DRAW:
            if ((r = SDF.ReadDraw(e, r, t, D, D.SDF_C_DRAW_END)) < 0) break;
            break;
          default:
            e.codes[r].code & SDF.SDF_BEGIN &&
              (
                r = SDF.ReadFrame(e, r, e.codes[r].code & SDF.SDF_MASK | SDF.SDF_END)
              )
        }
        if (r < 0) break;
        r++
      }
      for (
        0 === t.error &&
        (
          SDF.AppendFontList(GlobalData.optManager.theContentHeader.FontList, t.fontlist),
          SDF.ReMapLinks(t.IDMap, t.links, t, a),
          SDF.UpdateComments(t)
        ),
        i = t.zList.length,
        n = 0;
        n < i;
        n++
      ) if (S = t.zList[n], s = GlobalData.optManager.GetObjectPtr(S, !1)) {
        if (
          t.ReadBlocks,
          SDF.ConvertFomOldFF(t, s),
          s.StyleRecord.Fill.Paint.FillType === ConstantData.FillTypes.SDFILL_TEXTURE &&
          void 0 === s.StyleRecord.Fill.Paint.Texture &&
          (
            s.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT
          ),
          g = s.DrawingObjectBaseClass,
          s.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
          s.LineType === ConstantData.LineType.POLYLINE &&
          s.polylist &&
          s.polylist.closed &&
          (g = ConstantData.DrawingObjectBaseClass.SHAPE),
          t.PVersion < SDF.SDF_PVERSION861 &&
          s.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART
        ) return t.error = SDF.Errors.MinVersionProjectChart,
          - 1;
        switch (g) {
          case ConstantData.DrawingObjectBaseClass.LINE:
            if (t.IsVisio && null == s.StartPoint.x) {
              t.zList.splice(n, 1),
                i--,
                n--;
              continue
            }
            switch (s.LineType) {
              case ConstantData.LineType.POLYLINE:
                s.polylist &&
                  t.IsVisio &&
                  SDF.SD_UpdateVisioGroupFrame(s, t, !0);
                break;
              case ConstantData.LineType.SEGLINE:
              case ConstantData.LineType.ARCSEGLINE:
                var y = {
                  x: s.Frame.x,
                  y: s.Frame.y
                };
                (y.x < 0 || y.y < 0) &&
                  s.SetShapeOrigin(30000, 30000),
                  s.SegLFormat(
                    s.EndPoint,
                    ConstantData.ActionTriggerType.SEGL_PRESERVE,
                    0
                  ),
                  s.CalcFrame(),
                  (y.x < 0 || y.y < 0) &&
                  s.SetShapeOrigin(y.x, y.y)
            }
            s.DataID >= 0 &&
              t.PVersion < SDF.SDF_PVERSION859 &&
              t.ReadBlocks &&
              s.SetTextObject(s.DataID);
            break;
          case ConstantData.DrawingObjectBaseClass.CONNECTOR:
            if (0 === s.hooks.length) {
              var f = (d = s.arraylist.hook.length) - m;
              if (f < 0 && (f = 0), d >= m) for (o = 1; o < m; o++) s.arraylist.hook[o].id >= 0 &&
                f++;
              0 === f &&
                t.DeleteList.push(S)
            }
            break;
          case ConstantData.DrawingObjectBaseClass.SHAPE:
            if (
              s.polylist &&
              s.polylist.closed &&
              t.IsVisio &&
              SDF.SD_UpdateVisioGroupFrame(s, t, !0) &&
              (
                SDF.BuildPolygonShape(s, s.StartPoint, s.EndPoint, t.IsVisio),
                s.polylist.offset.x = s.StartPoint.x - s.Frame.x,
                s.polylist.offset.y = s.StartPoint.y - s.Frame.y
              ),
              s.StyleRecord.Line.BThick &&
              s.polylist &&
              s.polylist.closed &&
              s.polylist.segs &&
              s.polylist.segs.length
            ) {
              var L,
                I = [],
                T = s.StyleRecord.Line.Thickness / 2;
              // if (s instanceof ListManager.Polygon && s.polylist) {
              if (s instanceof Instance.Shape.Polygon && S.polylist) {
                var b = {};
                b.Frame = s.Frame,
                  b.inside = s.inside,
                  // (L = new ListManager.PolyLine(b)).polylist = s.polylist,
                  // (L = new GlobalDataShape.PolyLine(b)).polylist = s.polylist,
                  (L = new Instance.Shape.PolyLine(b)).polylist = s.polylist,
                  L.StartPoint = s.StartPoint,
                  L.EndPoint = s.EndPoint
              } else L = s;
              var M = L.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, I),
                P = [];
              if (I.length > 0) for (
                P.push(new Point(M[0].x, M[0].y)),
                o = 0;
                o < I.length;
                o++
              ) P.push(new Point(M[I[o]].x, M[I[o]].y));
              else P = Utils1.DeepCopy(M);
              var R;
              if (!(R = GlobalData.optManager.InflateLine(P, T, !0, !0)) || 0 === R.length) break;
              s.StartPoint.x = R[0].x,
                s.StartPoint.y = R[0].y,
                s.EndPoint.x = R[R.length - 1].x,
                s.EndPoint.y = R[R.length - 1].y;
              var A = Utils1.DeepCopy(s.polylist.segs);
              for (s.polylist.segs = [], o = 0; o < M.length; o++) s.polylist.segs.push(
                new PolySeg(1, R[o].x - s.StartPoint.x, R[o].y - s.StartPoint.y)
              ),
                o < A.length &&
                (
                  s.polylist.segs[o].LineType = A[o].LineType,
                  s.polylist.segs[o].ShortRef = A[o].ShortRef,
                  s.polylist.segs[o].dataclass = A[o].dataclass,
                  s.polylist.segs[o].dimDeflection = A[o].dimDeflection,
                  s.polylist.segs[o].flags = A[o].flags,
                  s.polylist.segs[o].param = A[o].param,
                  s.polylist.segs[o].weight = A[o].weight
                );
              // if (s instanceof ListManager.BaseLine)
              if (s instanceof Instance.Shape.BaseLine)
                s.CalcFrame();
              // else if (s instanceof ListManager.Polygon && s.polylist) {
              else if (s instanceof Instance.Shape.Polygon && s.polylist) {
                T = s.StyleRecord.Line.BThick;
                var _ = s.Frame.width;
                _ <= 0 &&
                  (_ = 1);
                var E = (s.Frame.width + 2 * T) / _;
                (_ = s.Frame.height) <= 0 &&
                  (_ = 1);
                var w = (s.Frame.height + 2 * T) / _,
                  F = - (s.Frame.x * E - s.Frame.x + T),
                  v = - (s.Frame.y * w - s.Frame.y + T);
                s.ScaleObject(F, v, null, 0, E, w, !1),
                  GlobalData.optManager.CalcPolyVertices(s)
              }
            } else (t.AddEMFHash || t.isTemplate || t.isSymbol || t.IsVisio) &&
              s.UpdateFrame(s.Frame);
            t.IsVisio &&
              s.ShapeType === ConstantData.ShapeType.GROUPSYMBOL &&
              (
                SDF.SD_UpdateVisioGroupFrame(s, t, !1),
                s.flags = Utils2.SetFlag(s.flags, ConstantData.ObjFlags.SEDO_ImageOnly, !0),
                s.ConvertToNative(t.RichGradients, !1)
              ),
              t.IsVisio &&
              s.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText &&
              (
                c = GlobalData.optManager.SD_GetVisioTextParent(s.BlockID),
                (u = GlobalData.optManager.GetObjectPtr(c, !1)) &&
                (
                  '' !== u.HyperlinkText &&
                  (s.HyperlinkText = u.HyperlinkText, u.HyperlinkText = ''),
                  s.RotationAngle != u.RotationAngle &&
                  (s.VisioRotationDiff = u.RotationAngle - s.RotationAngle)
                )
              )
        }
        var theGraph;
        if (
          null != (theGraph = s.GetGraph(!1)) &&
          GlobalData.optManager.GraphFormat(s, theGraph, s.Frame, !0),
          l = s.GetTable(!1)
        ) s.subtype !== ConstantData.ObjectSubTypes.SD_SUBT_MEETINGTASK &&
          s.subtype !== ConstantData.ObjectSubTypes.SD_SUBT_MEETINGPERSON &&
          s.objecttype !== ConstantData.ObjectTypes.SD_OBJT_TIMELINE &&
          GlobalData.optManager.Table_Format(s, l, s.TextGrow, !1);
        else if (
          s.DataID >= 0 &&
          t.updatetext &&
          (
            t.IsVisio &&
            (
              s.StyleRecord.name = ConstantData.Defines.TextBlockStyle,
              s.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText &&
              !t.ReadingGroup &&
              (
                s.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
                s.StyleRecord.Line.Thickness = 0,
                c = GlobalData.optManager.SD_GetVisioTextParent(s.BlockID),
                (u = GlobalData.optManager.GetObjectPtr(c, !1)) &&
                (
                  u.just = s.just,
                  u.vjust = s.vjust,
                  0 === s.hookdisp.x &&
                  0 === s.hookdisp.y &&
                  s.hooks[0].connect.x === h / 2 &&
                  s.hooks[0].connect.y === h / 2 &&
                  u.ShapeType !== ConstantData.ShapeType.GROUPSYMBOL &&
                  u.DrawingObjectBaseClass !== ConstantData.DrawingObjectBaseClass.LINE &&
                  (
                    s.sizedim.width = s.trect.width,
                    s.sizedim.height = s.trect.height
                  ),
                  u.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
                  (u.TextDirection = !1)
                )
              )
            ),
            GlobalData.optManager.AddSVGObject(null, S, !0, !1),
            GlobalData.optManager.TextResizeCommon(S, !1, !0),
            p = GlobalData.optManager.svgObjectLayer.GetElementByID(S)
          )
        ) {
          if (
            t.IsVisio &&
            s.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.LINE
          ) {
            var G = SDF.TextAlignToJust(s.TextAlign);
            if (
              1 === p.textElem.formatter.renderedLines.length &&
              G.just === ConstantData.TextAlign.CENTER
            ) {
              s.Frame.x,
                s.Frame.width,
                s.Frame.y,
                s.Frame.height;
              s.TextGrow = ConstantData.TextGrowBehavior.HORIZONTAL,
                s.sizedim.width = ConstantData.Defines.SED_MinDim,
                GlobalData.optManager.TextResizeCommon(S, !1, !0)
            }
          }
          GlobalData.optManager.svgObjectLayer.RemoveElement(p),
            Collab.NoRedrawFromSameEditor = !1
        }
      }
      return !1 === t.isSymbol &&
        (
          t.VisioFileVersion &&
          (GlobalData.optManager.FileVersion = SDF.SDF_FVERSION2022),
          (
            ListManager.SDData.GetSDDataDatasetIDByName(
              t.SDData,
              ListManager.DataSetNameList[ListManager.DataSetNameListIndexes.DATASET_PLANNING]
            ) >= 0 ||
            ListManager.SDData.GetSDDataDatasetIDByName(
              t.SDData,
              ListManager.DataSetNameList[ListManager.DataSetNameListIndexes.DATASET_FIELDEDDATA]
            ) >= 0
          ) &&
          (GlobalData.optManager.FileVersion = SDF.SDF_FVERSION2022)
        ),
        t.error
    } catch (e) {
      // SDUI.Commands.MainController.ActiveSessionController.ReturnToTemplateDialog = !0,
      //   '1' === e.name ? SDUI.Commands.MainController.ActiveSessionController.UpdateAlertModal(e.message, 1) : 'PRD' === SDUI.Environment ? SDUI.Commands.MainController.ActiveSessionController.UpdateAlertModal(Resources.Strings.Error_InComplete, 1) : SDUI.Commands.MainController.ActiveSessionController.UpdateAlertModal(e.stack, 1),
      //   SDUI.Utils.Logger.LogError(e.stack)
      throw e
    }
  },


  SDF.ConvertFomOldFF = function (e, t) {
    var a,
      r = ConstantData.ConnectorDefines;
    if (!e.isSymbol) {
      if (
        'Pedigree Charts' === GlobalData.optManager.theContentHeader.smartpanelname &&
        t.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.CONNECTOR &&
        (
          t.objecttype = ConstantData.ObjectTypes.SD_OBJT_PEDIGREE_CONNECTOR
        ),
        GlobalData.optManager.theContentHeader.smartpanelname &&
        'descendant trees' === GlobalData.optManager.theContentHeader.smartpanelname.toLowerCase() &&
        t.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.CONNECTOR &&
        (
          t.objecttype = ConstantData.ObjectTypes.SD_OBJT_DESCENDANT_CONNECTOR
        ),
        e.PVersion <= SDF.SDF_PVERSION850 &&
        'Decision Trees' === GlobalData.optManager.theContentHeader.smartpanelname &&
        t.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.CONNECTOR &&
        t.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Radial &&
        (
          t.objecttype = ConstantData.ObjectTypes.SD_OBJT_DECISIONTREE_CONNECTOR
        ),
        e.PVersion <= SDF.SDF_PVERSION851
      ) {
        if (
          'Cause & Effect' === GlobalData.optManager.theContentHeader.smartpanelname
        ) {
          if (
            t.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.CONNECTOR
          ) {
            if (
              0 === t.objecttype &&
              t.arraylist.angle &&
              (
                t.objecttype = ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH,
                t.hooks.length &&
                t.arraylist.hook.length >= ConstantData.ConnectorDefines.SEDA_NSkip
              )
            ) {
              var i = GlobalData.optManager.GetObjectPtr(t.hooks[0].objid, !1);
              i &&
                i.arraylist &&
                i.arraylist.ht > 0 &&
                (
                  t.hooks[0].hookpt === ConstantData.HookPts.SED_LT ? t.arraylist.hook[r.A_Cl].gap = 0 : t.hooks[0].hookpt === ConstantData.HookPts.SED_LB &&
                    (t.arraylist.hook[r.A_Cr].gap = 0)
                )
            }
            t.arraylist.hook.length <= ConstantData.ConnectorDefines.SEDA_NSkip &&
              e.DeleteList.push(t.BlockID)
          }
          e.sdp.flags = Utils2.SetFlag(
            e.sdp.flags,
            ConstantData.SessionFlags.SEDS_NoStepFormatting,
            !0
          )
        }
        'Genograms' !== GlobalData.optManager.theContentHeader.smartpanelname &&
          'Ecomaps' !== GlobalData.optManager.theContentHeader.smartpanelname ||
          (
            t.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.CONNECTOR &&
            (
              t.objecttype = ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH,
              t.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear &&
              (
                t.extraflags = Utils2.SetFlag(t.extraflags, ConstantData.ExtraFlags.SEDE_ConnToConn, !0)
              )
            ),
            e.sdp.flags = Utils2.SetFlag(
              e.sdp.flags,
              ConstantData.SessionFlags.SEDS_NoStepFormatting,
              !0
            )
          )
      }
      if (
        e.PVersion < SDF.SDF_PVERSION853 &&
        (
          'Step Charts' === GlobalData.optManager.theContentHeader.smartpanelname &&
          t.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.CONNECTOR &&
          (
            a = t.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn &&
            t.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear
          ) &&
          !t.vertical &&
          (
            t.objecttype = ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH
          ),
          'Step Charts Vertical' === GlobalData.optManager.theContentHeader.smartpanelname &&
          t.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.CONNECTOR &&
          (
            t.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear &&
            (
              t.arraylist.styleflags = Utils2.SetFlag(
                t.arraylist.styleflags,
                ConstantData.SEDA_Styles.SEDA_FlowConn,
                !0
              )
            ),
            (
              a = t.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn &&
              t.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear
            ) &&
              t.vertical ? t.objecttype = ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH : a &&
              t.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete &&
            (
              t.objecttype = ConstantData.ObjectTypes.SD_OBJT_BAD_STEPCHART_BRANCH,
              t.extraflags = Utils2.SetFlag(t.extraflags, ConstantData.ExtraFlags.SEDE_NoDelete, !1)
            )
          )
        ),
        t.objecttype === ConstantData.ObjectTypes.SD_OBJT_BPMN_POOL &&
        SDF.ConvertBPMNPool(t),
        t.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_MAIN
      ) if (t.arraylist && t.arraylist.ht) {
        var n,
          o,
          s,
          l,
          S,
          c,
          u,
          p,
          d;
        for (
          S = t.arraylist.ht,
          t.arraylist.ht = 0,
          t.hooks.length &&
          t.arraylist.hook.length >= ConstantData.ConnectorDefines.SEDA_NSkip &&
          (
            t.hooks[0].hookpt === ConstantData.HookPts.SED_LL ? t.arraylist.hook[r.A_Cl].gap = 0 : t.hooks[0].hookpt === ConstantData.HookPts.SED_LR &&
              (t.arraylist.hook[r.A_Cr].gap = 0)
          ),
          o = (s = GlobalData.optManager.FindAllChildConnectors(t.BlockID, e.links)).length,
          n = 0;
          n < o;
          n++
        ) c = (l = GlobalData.optManager.GetObjectPtr(s[n], !0)).arraylist.hook.length - r.SEDA_NSkip,
          l.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_BothSides &&
            0 == (
              l.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Stagger
            ) ? (u = Math.ceil(c / 2) - 1) < 1 &&
          (u = 1) : (u = c - 1) < 1 &&
          (u = 1),
          u += 2,
          d = S,
          p = (d -= l.arraylist.wd) / u,
          l.arraylist.wd += p,
          l &&
          l.hooks.length &&
          (
            l.hooks[0].hookpt === ConstantData.HookPts.SED_LT ? l.arraylist.hook[r.A_Cl].gap += l.arraylist.wd : l.hooks[0].hookpt === ConstantData.HookPts.SED_LB &&
              (l.arraylist.hook[r.A_Cr].gap += l.arraylist.wd)
          )
      } else e.FromWindows &&
        t.hooks.length &&
        t.arraylist.hook.length >= ConstantData.ConnectorDefines.SEDA_NSkip &&
        (
          t.hooks[0].hookpt === ConstantData.HookPts.SED_LL ? t.arraylist.hook[r.A_Cl].gap = 0 : t.hooks[0].hookpt === ConstantData.HookPts.SED_LR &&
            (t.arraylist.hook[r.A_Cr].gap = 0)
        )
    }
  },
  SDF.FixObjecttypes = function (e) {
    if (
      0 == e.objecttype &&
      (
        'JIRA_ISSUESCONTAINER' !== GlobalData.optManager.theContentHeader.BusinessModule ||
        GlobalData.optManager.IsJiraIssueShape(e)
      )
    ) switch (GlobalData.optManager.theContentHeader.BusinessModule) {
      case 'JIRA_ISSUESCONTAINER':
        e.objecttype = ConstantData.ObjectTypes.SD_OBJT_JIRA_ISSUES_CONTAINER_ISSUE;
        break;
      case 'JIRA_BLOCKINGISSUE':
        e.objecttype = ConstantData.ObjectTypes.SD_OBJT_JIRA_BLOCKINGISSUE;
        break;
      case 'JIRA_EPICDEPENDENCY':
        e.objecttype = ConstantData.ObjectTypes.SD_OBJT_JIRA_EPICDEPENDENCY;
        break;
      case 'JIRA_PRODUCTROADMAP':
        e.objecttype = ConstantData.ObjectTypes.SD_OBJT_JIRA_PRODUCTROADMAP;
        break;
      case 'JIRA_PIBOARD':
        e.objecttype = ConstantData.ObjectTypes.SD_OBJT_JIRA_PIBOARD
    }
  },
  SDF.ReMapDataID = function (e, t) {
    var a,
      r,
      i;
    e.GetTable(!1) ||
      (
        e.DataID >= 0 &&
        (
          (i = t.textids[e.DataID]) >= 0 ? (
            e.DataID = i,
            (a = GlobalData.optManager.GetObjectPtr(i, !1)) &&
            (
              r = SDF.TextAlignToJust(e.TextAlign),
              GlobalData.optManager.SetTextAlignment(a, r.vjust, r.just)
            )
          ) : e.DataID = - 1
        ),
        e.NoteID >= 0 &&
        (i = t.noteids[e.NoteID], e.NoteID = i >= 0 ? i : - 1)
      )
  },
  SDF.AppendFontList = function (e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l;
    for (n = t.length, a = e.length, r = 0; r < n; r++) {
      for (o = t[r], l = !1, i = 0; i < a; i++) if (s = e[i], o.fontName === s.fontName) {
        l = !0;
        break
      }
      l ||
        (o.fontID = e.length, e.push(o))
    }
  },
  SDF.ConnectedToEdge = function (e) {
    var t,
      a,
      r,
      i,
      n = 1000,
      o = ConstantData.Defines.SED_CDim;
    return t = e.x,
      a = o - e.x,
      r = e.y,
      i = o - e.y,
      t < n ||
      a < n ||
      r < n ||
      i < n
  },
  SDF.UpdateComments = function (e) {
    var t,
      a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c = !1,
      u = (r = e.Threads).length,
      p = function (e, t) {
        var a = GlobalData.optManager.GetObjectPtr(e, !1),
          r = GlobalData.optManager.GetObjectPtr(t, !1);
        return a.timestamp - r.timestamp
      };
    for (l = e.ThreadIDs.length, t = 0; t < l; t++) S = e.ThreadIDs[t],
      SDUI.Utils.GetUser(S, GlobalData.optManager.CommentUserIDs);
    for (t = - 1; t < u; t++) if (null != r[t]) {
      if (i = r[t], - 1 === t) a = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !0);
      else a = GlobalData.optManager.GetObjectPtr(t, !0);
      if (a) {
        if (
          n = GlobalData.optManager.Comment_CreateThread(i[0], e.ReadingGroup).Data
        ) {
          for (n.objID = t, s = i.length, o = 1; o < s; o++) n.blocks.push(i[o]);
          s > 1 &&
            n.blocks.sort(p)
        }
        a.CommentID = n.BlockID,
          c = !0
      }
    }
    e.isSymbol ? c &&
      GlobalData.optManager.CommentShowTab(c) : GlobalData.optManager.CommentShowTab(c)
  },



  SDF.ReMapLinks = function (e, t, a, r) {
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
      h = [],
      m = ConstantData.LinkFlags.SED_L_MOVE,
      C = ConstantData.ConnectorDefines.SEDA_NSkip,
      y = [],
      f = {},
      L = ConstantData.Defines.SED_CDim;
    i = e.length;
    var I = function (t) {
      var a,
        r,
        i = t.cells.length;
      for (a = 0; a < i; a++) (r = t.cells[a]).childcontainer >= 0 &&
        (r.childcontainer = e[r.childcontainer])
    };
    for (n = (l = t.length) - 1; n >= 0; n--) (e[t[n].hookid] < 0 || e[t[n].targetid] < 0) &&
      t.splice(n, 1);
    for (l = t.length, n = 0; n < i; n++) if (e[n]) {
      if (s = e[n], (o = GlobalData.optManager.GetObjectPtr(s, !1)) && o.hooks) for (S = (c = o.hooks.length) - 1; S >= 0; S--) e[o.hooks[S].objid] &&
        e[o.hooks[S].objid] > 0 ? (
        o.hooks[S].objid = e[o.hooks[S].objid],
        0 !== l ||
        r ||
        (
          null == D &&
          (D = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !0)),
          GlobalData.optManager.InsertLink(D, s, S, ConstantData.LinkFlags.SED_L_MOVE)
        ),
        a.IsVisio &&
        o &&
        o.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
        o.LineType === ConstantData.LineType.SEGLINE &&
        o.segl &&
        (
          (u = GlobalData.optManager.GetObjectPtr(o.hooks[S].objid, !1)).RotationAngle &&
          (
            p = {
              x: 0,
              y: 0,
              width: L,
              height: L
            },
            d = u.RotationAngle / (180 / ConstantData.Geometry.PI),
            (h = []).push(o.hooks[S].connect),
            Utils3.RotatePointsAboutCenter(p, d, h)
          ),
          u &&
          u.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
          SDF.ConnectedToEdge(o.hooks[S].connect) &&
          (
            o.hooks[S].hookpt === ConstantData.HookPts.SED_KTL ? o.segl.firstdir = u.GetSegLFace(o.hooks[S].connect, o.StartPoint, o.StartPoint) : o.segl.lastdir = u.GetSegLFace(o.hooks[S].connect, o.EndPoint, o.EndPoint)
          )
        )
      ) : (
        o.hooks.splice(S, 1),
        o.moreflags = Utils2.SetFlag(
          o.moreflags,
          ConstantData.ObjMoreFlags.SED_MF_ContainerChild,
          !1
        )
      );
      if (
        o &&
        o.associd >= 0 &&
        (
          e[o.associd] &&
            e[o.associd] > 0 ? o.associd = e[o.associd] : o.associd = - 1
        ),
        o &&
        o.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
        o.arraylist
      ) {
        c = o.arraylist.hook.length;
        var T = o.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear;
        if (C = ConstantData.ConnectorDefines.SEDA_NSkip, T) for (S = c - 1; S > C; S--) o.arraylist.hook[S].textid = o.arraylist.hook[S - 1].textid,
          o.arraylist.hook[S - 1].textid = - 1;
        for (S = 0; S < c; S++) 65535 === o.arraylist.hook[S].id ? o.arraylist.hook[S].id = - 1 : o.arraylist.hook[S].id >= 0 &&
          (o.arraylist.hook[S].id = e[o.arraylist.hook[S].id]),
          o.arraylist.hook[S].textid >= 0 &&
          (
            a.ReadBlocks ||
            a.ReadGroupBlock ||
            (
              o.arraylist.hook[S].textid = SDF.GetLineText(a, n, o.arraylist.hook[S].textid, f),
              f.Paint &&
              (o.StyleRecord.Fill.Paint = f.Paint)
            )
          );
        r ||
          (
            y.push(o),
            o.flags = Utils2.SetFlag(o.flags, ConstantData.ObjFlags.SEDO_Obj1, !0)
          )
      }
      if (
        o &&
        o.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
        o.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER &&
        (g = o.GetTable(!1)) &&
        I(g),
        o &&
        o.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
        o.ContainerList
      ) {
        c = o.ContainerList.List.length;
        var b = o.ContainerList.List;
        for (S = 0; S < c; S++) null == b[S].id &&
          (b[S].id = - 1),
          b[S].id >= 0 &&
          (b[S].id = e[b[S].id])
      }
    }
    for (n = 0; n < l; n++) t[n].targetid = e[t[n].targetid],
      t[n].hookid = e[t[n].hookid],
      t[n].flags = m;
    if (t.sort((function (e, t) {
      return e.targetid - t.targetid
    })), !r) for (i = y.length, n = 0; n < i; n++) (c = (o = y[n]).arraylist.hook.length) < C &&
      o.Pr_Format(o.BlockID)
  },
  SDF.RemapPanel = function (e) {
    return SDF.FlowchartPanels.indexOf(e) >= 0 ? 'Flowcharts' : SDF.FlyersPanels.indexOf(e) >= 0 ? 'Flyers' : SDF.CrimeScenes.indexOf(e) >= 0 ? 'Crime Scenes Floorplan' : SDF.Engineering.indexOf(e) >= 0 ? 'Engineering' : SDF.Network.indexOf(e) >= 0 ? 'Network Diagrams' : SDF.Pedigree.indexOf(e) >= 0 ? 'Pedigree Charts' : SDF.DecendentTree.indexOf(e) >= 0 ? 'Descendant Trees' : SDF.RackDiagram.indexOf(e) >= 0 ? 'Rack Diagrams' : SDF.Maps.indexOf(e) >= 0 ? 'Maps' : SDF.OldProjectLayers.indexOf(e) >= 0 ? 'Project Chart' : e
  },
  SDF.ReadHeader = function (e, t, a, r) {
    var i;
    a.sdp;
    for (
      null == e.codes[t].data.lworigin ? (
        a.WindowSettings.worigin.x = e.codes[t].data.worigin.x,
        a.WindowSettings.worigin.y = e.codes[t].data.worigin.y
      ) : (
        a.WindowSettings.worigin.x = e.codes[t].data.lworigin.x,
        a.WindowSettings.worigin.y = e.codes[t].data.lworigin.y
      ),
      a.WindowSettings.wscale = e.codes[t].data.wscale,
      0 === a.WindowSettings.wscale ? a.WindowSettings.wscale = 1 : a.WindowSettings.wscale /= 1000,
      a.WindowSettings.wflags = e.codes[t].data.wflags,
      null == e.codes[t].data.longflags ? a.IgnoreHeader ||
        (GlobalData.optManager.theContentHeader.flags = e.codes[t].data.flags) : a.IgnoreHeader ||
      (
        GlobalData.optManager.theContentHeader.flags = e.codes[t].data.longflags
      ),
      null != e.codes[t].data.dateformat &&
      (
        a.IgnoreHeader ||
        (
          GlobalData.optManager.theContentHeader.dateformat = e.codes[t].data.dateformat
        )
      ),
      t++;
      e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_HEADER_END;
    ) {
      switch (e.codes[t].code) {
        case r.SDF_C_HILITELIST:
          t = SDF.ReadHiliteList(e, t, a, r);
          break;
        case r.SDF_C_SDDATABLOCK:
        case r.SDF_C_SDDATA64:
          break;
        case r.SDF_C_PAGE:
          a.IgnoreHeader ||
            SDF.ReadPage(e.codes[t].data, a);
          break;
        case r.SDF_C_FONTLIST:
          t = SDF.ReadFontList(e, t, a, r);
          break;
        case r.SDF_C_SYMBOLSEARCHSTRING:
          a.IgnoreHeader ||
            (
              GlobalData.optManager.theContentHeader.SymbolSearchString = e.codes[t].data.name
            );
          break;
        case r.SDF_C_PARENTPAGEID:
          a.IgnoreHeader ||
            (
              GlobalData.optManager.theContentHeader.ParentPageID = e.codes[t].data.name
            );
          break;
        case r.SDF_C_TASKPANEL:
          if (a.IgnoreHeader) break;
          if (
            GlobalData.optManager.theContentHeader.smartpanelname = e.codes[t].data.name,
            SDF.UnsupportedPanels.indexOf(GlobalData.optManager.theContentHeader.smartpanelname) >= 0
          ) return a.error = SDF.Errors.UnsupportedPanel,
            - 1;
          (a.AddEMFHash || a.isTemplate) &&
            (
              GlobalData.optManager.theContentHeader.smartpanelname = SDF.RemapPanel(GlobalData.optManager.theContentHeader.smartpanelname)
            );
          break;
        case r.SDF_C_BUSINESSMODULE:
          if (a.IgnoreHeader) break;
          GlobalData.optManager.theContentHeader.BusinessModule = e.codes[t].data.name;
          break;
        case r.SDF_C_BEGIN_THEME12:
          if (a.IgnoreHeader) break;
          t = SDF.ReadDocumentTheme(e, t, a, r);
          break;
        case r.SDF_C_TIMELINEINFO:
          break;
        case r.SDF_C_LEFTPANELINFO:
          if (a.IgnoreHeader) break;
          if (
            !a.isTemplate &&
            (
              a.WindowSettings.leftpanelmode = e.codes[t].data.value,
              SDUI.AppSettings.NewUI
            )
          ) switch (a.WindowSettings.leftpanelmode) {
            case Resources.LeftPanelMode.LEFTPANELMODE_SYMBOLSEARCH:
            case Resources.LeftPanelMode.LEFTPANELMODE_SYMBOLS:
              a.WindowSettings.leftpanelmode = Resources.LeftPanelMode.LEFTPANELMODE_SMARTPANEL
          }
          break;
        case r.SDF_C_EXPORTPATH:
          a.isTemplate ||
            (
              GlobalData.optManager.theContentHeader.exportpath = e.codes[t].data.name,
              ConstantData.DocumentContext.PublishUrl = e.codes[t].data.name
            );
          break;
        case r.SDF_C_DEFAULTLIBS:
          if (a.isTemplate) break;
          GlobalData.optManager.theContentHeader.defaultlibs = e.codes[t].data.name;
          break;
        case r.SDF_C_ORIGTEMPLATE:
          GlobalData.optManager.theContentHeader.originaltemplatename = e.codes[t].data.name;
          break;
        case r.SDF_C_PRESENTATION_BACKGROUND:
        case r.SDF_C_PRESENTATION_NAME:
          break;
        case r.SDF_C_IMPORT_SOURCE_PATH:
          GlobalData.optManager.theContentHeader.importSourcePath = e.codes[t].data.name;
          break;
        case r.SDF_C_LIBLIST:
          if (a.IgnoreHeader) break;
          t = SDF.ReadLibraryList(e, t, a, r);
          break;
        case r.SDF_C_TOOLPALETTES_BEGIN:
          if (a.IgnoreHeader) break;
          t = SDF.ReadToolPalettes(e, t, a, r);
          break;
        case r.SDF_C_HEAD_UIINFO:
          if (a.IgnoreHeader) break;
          a.PVersion,
            SDF.SDF_PVERSION804,
            a.PVersion < SDF.SDF_PVERSION816 ? (
              GlobalData.optManager.theContentHeader.nonworkingdays = ConstantData.Defines.DEFAULT_NONWORKINGDAYS,
              GlobalData.optManager.theContentHeader.holidaymask = 0
            ) : (
              GlobalData.optManager.theContentHeader.nonworkingdays = e.codes[t].data.nonworkingdays,
              GlobalData.optManager.theContentHeader.holidaymask = e.codes[t].data.holidaymask
            ),
            a.shapetoolindex = e.codes[t].data.shapetoolindex,
            a.linetoolindex = e.codes[t].data.linetoolindex,
            null != e.codes[t].data.swimlaneformat &&
            (a.swimlaneformat = e.codes[t].data.swimlaneformat),
            null != e.codes[t].data.autocontainer &&
            (a.autocontainer = e.codes[t].data.autocontainer),
            null != e.codes[t].data.actascontainer &&
            (a.actascontainer = e.codes[t].data.actascontainer),
            null != e.codes[t].data.swimlanenlanes &&
            (a.swimlanenlanes = e.codes[t].data.swimlanenlanes),
            null != e.codes[t].data.swimlanenvlanes &&
            (a.swimlanenvlanes = e.codes[t].data.swimlanenvlanes),
            null != e.codes[t].data.swimlanerotate &&
            (a.swimlanerotate = e.codes[t].data.swimlanerotate),
            null != e.codes[t].data.swimlanetitle &&
            (a.swimlanetitle = e.codes[t].data.swimlanetitle),
            null != e.codes[t].data.collapsetools &&
            (a.collapsetools = e.codes[t].data.collapsetools);
          break;
        case r.SDF_C_GUIDE:
          if (a.IgnoreHeader) break;
          GlobalData.optManager.theContentHeader.smarthelpname = e.codes[t].data.name;
          break;
        case r.SDF_C_ORGCHARTTABLE:
          if (a.IgnoreHeader) break;
          (
            i = ListManager.WinOrgChartTables.indexOf(e.codes[t].data.name)
          ) >= 0 ? GlobalData.optManager.theContentHeader.orgcharttable = ListManager.OrgChartTables[i] : (
            i = ListManager.WinMindMapTables.indexOf(e.codes[t].data.name)
          ) >= 0 &&
          (
            GlobalData.optManager.theContentHeader.orgcharttable = ListManager.MindMapTables[i]
          ),
            i < 0 &&
            (
              GlobalData.optManager.theContentHeader.orgcharttable = e.codes[t].data.name
            );
          break;
        case r.SDF_C_KANBAN_PC_TITLE:
        case r.SDF_C_KANBAN_ASSIGN_TITLE:
          break;
        case r.SDF_C_DIMFONT:
          if (a.IgnoreHeader) break;
          GlobalData.optManager.theContentHeader.DimensionFont.fontName = e.codes[t].data.lfFaceName,
            GlobalData.optManager.theContentHeader.DimensionFont.fontSize = Math.abs(
              Math.round(e.codes[t].data.lfHeight * a.coordScaleFactor * 72 / 100)
            ),
            GlobalData.optManager.theContentHeader.DimensionFont.face = 0,
            GlobalData.optManager.theContentHeader.DimensionFont.face = Utils2.SetFlag(
              GlobalData.optManager.theContentHeader.DimensionFont.face,
              ConstantData.TextFace.Italic,
              e.codes[t].data.lfItalic
            ),
            GlobalData.optManager.theContentHeader.DimensionFont.face = Utils2.SetFlag(
              GlobalData.optManager.theContentHeader.DimensionFont.face,
              ConstantData.TextFace.Bold,
              e.codes[t].data.lfWeight > 400
            ),
            e.codes[t].data.lfUnderline &&
            (
              GlobalData.optManager.theContentHeader.DimensionFont.face = Utils2.SetFlag(
                GlobalData.optManager.theContentHeader.DimensionFont.face,
                ConstantData.TextFace.Underline,
                e.codes[t].data.lfUnderline
              )
            ),
            GlobalData.optManager.theContentHeader.DimensionFontStyle = SDF.LogFontToFontStyle(GlobalData.optManager.theContentHeader.DimensionFont),
            0;
          break;
        default:
          e.codes[t].code & SDF.SDF_BEGIN &&
            (
              t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      t++
    }
    return t
  },



  SDF.ToSDJSPanelName = function (e) {
    var t;
    return e &&
      (
        t = 'sp-' + (
          t = (t = (t = e.toLowerCase(e)).replace(' & ', '_and_')).replace(/ /g, '_')
        )
      ),
      t
  }
SDF.WintoJSLineTool = function (e) {
  var t = SDUI.WindowsLineTools[e];
  null != t &&
    'moveWall' !== t ||
    (t = SDUI.WindowsLineTools[0]),
    SDUI.Commands.MainController.Selection.SetLineTool(t)
}
SDF.WintoJSShapeTool = function (e) {
  var t = SDUI.WindowsShapeTools[e];
  null == t &&
    (t = SDUI.WindowsShapeTools[0]),
    SDUI.Commands.MainController.Selection.SetShapeTool(t)
},
  SDF.LogFontToFontStyle = function (e) {
    //Double
    var t = new /*SDGraphics.Text.Formatter.DefaultStyle()*/ DefaultStyle(),
      a = ConstantData.TextFace;
    return t.font = e.fontName,
      t.size = SDF.PointSizeToFontSize(e.fontSize),
      t.type = e.fontType,
      e.face & a.Bold ? t.weight = 'bold' : t.weight = 'normal',
      e.face & a.Italic ? t.style = 'italic' : t.style = 'normal',
      e.face & a.Underline ? t.decoration = 'underline' : t.decoration = 'none',
      t
  },
  SDF.ReadPage = function (e, t) {
    null == e.lpapersize ? (
      GlobalData.optManager.theContentHeader.Page.papersize.x = SDF.ToSDJSCoords(e.papersize.x, t.coordScaleFactor),
      GlobalData.optManager.theContentHeader.Page.papersize.y = SDF.ToSDJSCoords(e.papersize.y, t.coordScaleFactor)
    ) : (
      GlobalData.optManager.theContentHeader.Page.papersize.x = SDF.ToSDJSCoords(e.lpapersize.x, t.coordScaleFactor),
      GlobalData.optManager.theContentHeader.Page.papersize.y = SDF.ToSDJSCoords(e.lpapersize.y, t.coordScaleFactor)
    ),
      GlobalData.optManager.theContentHeader.Page.margins.left = SDF.ToSDJSCoords(e.margins.left, t.coordScaleFactor),
      GlobalData.optManager.theContentHeader.Page.margins.top = SDF.ToSDJSCoords(e.margins.top, t.coordScaleFactor),
      GlobalData.optManager.theContentHeader.Page.margins.right = SDF.ToSDJSCoords(e.margins.right, t.coordScaleFactor),
      GlobalData.optManager.theContentHeader.Page.margins.bottom = SDF.ToSDJSCoords(e.margins.bottom, t.coordScaleFactor),
      GlobalData.optManager.theContentHeader.Page.printflags = e.printflags,
      null == e.printscale ? GlobalData.optManager.theContentHeader.Page.printscale = 0 : GlobalData.optManager.theContentHeader.Page.printscale = e.printscale,
      GlobalData.optManager.theContentHeader.Page.landscape = e.landscape,
      null == e.MinSize ? (
        GlobalData.optManager.theContentHeader.Page.minsize.x = GlobalData.optManager.theContentHeader.Page.papersize.x - GlobalData.optManager.theContentHeader.Page.margins.left - GlobalData.optManager.theContentHeader.Page.margins.right,
        GlobalData.optManager.theContentHeader.Page.minsize.y = GlobalData.optManager.theContentHeader.Page.papersize.y - GlobalData.optManager.theContentHeader.Page.margins.top - GlobalData.optManager.theContentHeader.Page.margins.bottom
      ) : (
        GlobalData.optManager.theContentHeader.Page.minsize.x = SDF.ToSDJSCoords(e.MinSize.x, t.coordScaleFactor),
        GlobalData.optManager.theContentHeader.Page.minsize.y = SDF.ToSDJSCoords(e.MinSize.y, t.coordScaleFactor)
      ),
      t.PaperType = SDJS.DocumentHandler.PrintHandler.CalcPaperTypeFromSize(
        GlobalData.optManager.theContentHeader.Page.papersize.x,
        GlobalData.optManager.theContentHeader.Page.papersize.y
      )
  },
  SDF.ToSDJSCoords = function (e, t, a) {
    var r;
    return 0 === (r = t * e) &&
      0 !== e &&
      (r = t * e),
      r
  },
  SDF.ToSDJSAngle = function (e) {
    var t = e % 3600,
      a = (t = t <= 0 ? t > - 1800 ? - t : 3600 + t : 3600 - t) % 3600;
    return a /= 10
  },

  SDF.ToSDJSRect = function (e, t) {
    var a,
      r,
      i = {};
    return i.x = e.left * t,
      i.y = e.top * t,
      a = e.right - e.left,
      r = e.bottom - e.top,
      i.width = a * t,
      i.height = r * t,
      i
  },
  SDF.ReadFontList = function (e, t, a, r) {

    /*
    for (
      t++;
      e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_FONTLIST_END;
    ) {
      switch (e.codes[t].code) {
        case r.SDF_C_FONTNAME12:
        case r.SDF_C_FONTNAME15:
        case r.SDF_C_FONTNAME:
          var i = SDF.GetFontTypeFromLogFont(e.codes[t].data);
          a.fontlist.push(
            new SDF.FontRecord(e.codes[t].data.id, e.codes[t].data.lfFaceName, i)
          );
          break;
        default:
          e.codes[t].code & SDF.SDF_BEGIN &&
            (
              t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      t++
    }
    return t
    */

    //debugger

    // a.fontlist.push(new SDF.FontRecord(0, "Arial", "sanserif"))
    // return t

    for (
      t++;
      e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_FONTLIST_END;
    ) {
      switch (e.codes[t].code) {
        case r.SDF_C_FONTNAME12:
        case r.SDF_C_FONTNAME15:
        case r.SDF_C_FONTNAME:
          var i = SDF.GetFontTypeFromLogFont(e.codes[t].data);
          a.fontlist.push(
            new SDF.FontRecord(e.codes[t].data.id, e.codes[t].data.lfFaceName, i)
          );
          break;
        default:
          e.codes[t].code & SDF.SDF_BEGIN &&
            (
              t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      t++
    }
    return t



  },
  SDF.ReadHiliteList = function (e, t, a, r) {
    var i;
    for (
      t++;
      e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_HILITELIST_END;
    ) {
      if (e.codes[t].code === r.SDF_C_HILITE) (i = e.codes[t].data.path) &&
        i.length > 4 &&
        '.SDL' === i.slice(- 4) &&
        (a.LibraryPathTarget = '\\' + i);
      else e.codes[t].code & SDF.SDF_BEGIN &&
        (
          t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
        );
      t++
    }
    return t
  },



  SDF.ReadFrame = function (e, t, a) {
    switch (t++, a) {
      case FileParser.SDROpCodesByName.SDF_C_LONGTEXT8_END:
      case 16458:
        a = FileParser.SDROpCodesByName.SDF_C_TEXT_END;
        break;
      case 16565:
      case 16566:
        a = FileParser.SDROpCodesByName.SDF_C_END_LINE;
        break;
      case 16567:
        a = FileParser.SDROpCodesByName.SDF_C_END_TEXTF;
        break;
      case 18550:
        a = 17526
    }
    for (; e.codes[t].code != a;) e.codes[t].code,
      e.codes[t].code & SDF.SDF_BEGIN &&
      (
        t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
      ),
      t++;
    return t
  },
  SDF.GetFontTypeFromLogFont = function (e) {
    var t = 'sanserif';
    switch (240 & e.lfPitchAndFamily) {
      case FileParser.FontFamily.FF_ROMAN:
        t = 'serif';
        break;
      case FileParser.FontFamily.FF_SWISS:
        t = 'sanserif';
        break;
      case FileParser.FontFamily.FF_MODERN:
        t = 'fixed';
        break;
      case FileParser.FontFamily.FF_SCRIPT:
        t = 'script';
        break;
      case FileParser.FontFamily.ff_DECORATIVE:
        t = 'decorative'
    }
    return t
  },
  SDF.TextFaceToWeight = function (e) {
    var t = 'normal';
    return e & FileParser.TextFace.St_Bold &&
      (t = 'bold'),
      t
  },
  SDF.TextFaceToStyle = function (e) {
    var t = 'normal';
    return e & FileParser.TextFace.St_Italic &&
      (t = 'italic'),
      t
  },
  SDF.TextExtraToBaseLine = function (e) {
    var t = 'none';
    return e > 100000 &&
      (e = FileParser.ToInt32(e)),
      e > 0 ? t = 'super' : e < 0 &&
        (t = 'sub'),
      t
  },
  SDF.TextFaceToDecoration = function (e) {
    var t = 'none';
    return e & FileParser.TextFace.St_Under ? t = 'underline' : e & FileParser.TextFace.St_Strike &&
      (t = 'line-through'),
      t
  },
  SDF.WinColorToHTML = function (e) {
    return '#' + FileParser.decimalToHex(255 & e, 2, !0) + FileParser.decimalToHex((65280 & e) >>> 8, 2, !0) + FileParser.decimalToHex((16711680 & e) >>> 16, 2, !0)
  },
  SDF.WinColorToAlpha = function (e) {
    return (255 - ((4278190080 & e) >>> 24)) / 255
  },
  SDF.FontIDtoFontRec = function (e, t) {
    var a,
      r;
    for (r = t.fontlist.length, a = 0; a < r; a++) if (t.fontlist[a].fontID == e) return t.fontlist[a];
    return 0 === r ? t.DefFont : t.fontlist[0]
  },
  SDF.PointSizeToFontSize = function (e) {
    return e * GlobalData.optManager.svgDoc.GetWorkArea().docDpi / 72
  },
  SDF.LogFontToFontRecord = function (e, t, a) {
    e.fontName = t.lfFaceName,
      e.fontSize = Math.abs(Math.round(t.lfHeight * a.coordScaleFactor * 72 / 100)),
      e.face = 0,
      e.face = Utils2.SetFlag(e.face, ConstantData.TextFace.Italic, t.lfItalic),
      e.face = Utils2.SetFlag(e.face, ConstantData.TextFace.Bold, t.lfWeight > 400),
      e.fontType = SDF.GetFontTypeFromLogFont(t)
  },
  SDF.ReadSearchResultLibrary = function (e, t, a, r) {
    var i,
      n = new Resources.PreviewList;
    for (
      n.ItemId = e.codes[t].data.name,
      n.SearchResults = !0,
      n.ContentType = Resources.PreviewType.SymbolLibrary,
      n.ListContentType = Resources.PreviewType.Symbol,
      n.ContentCount = 0,
      a.SearchLibs.push(n),
      t++;
      e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_SEARCHLIB_END;
    ) {
      switch (e.codes[t].code) {
        case r.SDF_C_SEARCHLIB_NAME:
          n.ContentTitle = e.codes[t].data.name;
          break;
        case r.SDF_C_SEARCHLIBSYMBOL_ID:
          (i = new Resources.ContentPreviewItem).ItemId = e.codes[t].data.name,
            i.ContentImageUrl = Constants.FilePath_CMSRoot + 'symbols/BTN/' + i.ItemId + '.png',
            i.ContentType = Resources.PreviewType.Symbol,
            n.ContentCount++,
            n.Items.push(i);
          break;
        case r.SDF_C_SEARCHLIBSYMBOL_NAME:
          i &&
            (i.ContentTitle = e.codes[t].data.name)
      }
      t++
    }
    return t
  },
  SDF.ReadLibraryList = function (e, t, a, r) {
    var i,
      n = - 1,
      o = - 1;
    for (
      GlobalData.optManager.theContentHeader.lp_list.lib.length = 0,
      GlobalData.optManager.theContentHeader.lp_list.selected = e.codes[t].data.selected,
      a.SearchResults = [],
      a.SearchLibs = [],
      t++;
      e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_LIBLIST_END;
    ) {
      switch (e.codes[t].code) {
        case r.SDF_C_CURRENTSYMBOL_ID:
          a.CurrentSymbol = e.codes[t].data.name;
          break;
        case r.SDF_C_LIBLIST_PATH:
          GlobalData.optManager.theContentHeader.lp_list.lib.push(new ListManager.LibListEntry(e.codes[t].data.name)),
            n++;
          break;
        case r.SDF_C_LIBLIST_GUID:
          GlobalData.optManager.theContentHeader.lp_list.lib.push(new ListManager.LibListEntry('')),
            n++,
            GlobalData.optManager.theContentHeader.lp_list.lib[n].libGuid = e.codes[t].data.name;
          break;
        case r.SDF_C_LIBLIST_ENTRY:
          n >= 0 &&
            (
              GlobalData.optManager.theContentHeader.lp_list.lib[n].scrollpos = e.codes[t].data.value
            );
          break;
        case r.SDF_C_LIB_COLLAPSED:
          n >= 0 &&
            (
              GlobalData.optManager.theContentHeader.lp_list.lib[n].Collapsed = e.codes[t].data.value
            );
          break;
        case r.SDF_C_SEARCHLIB:
          i = e.codes[t].data.name,
            t = SDF.ReadSearchResultLibrary(e, t, a, r),
            GlobalData.optManager.theContentHeader.lp_list.lib.push(new ListManager.LibListEntry('')),
            n++,
            GlobalData.optManager.theContentHeader.lp_list.lib[n].SearchResults = !0,
            GlobalData.optManager.theContentHeader.lp_list.lib[n].libGuid = i;
          break;
        case r.SDF_C_LIBLIST_SEARCH_RESULT_ID:
          a.SearchResults.push(new ListManager.LibListEntry(e.codes[t].data.name)),
            o++;
          break;
        case r.SDF_C_SEARCHLIB_COLLAPSED:
          o >= 0 &&
            (a.SearchResults[o].Collapsed = e.codes[t].data.value);
          break;
        case r.SDF_C_SEARCHLIB_HIDDEN:
          o >= 0 &&
            (a.SearchResults[o].Hidden = e.codes[t].data.value);
          break;
        default:
          e.codes[t].code & SDF.SDF_BEGIN &&
            (
              t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      t++
    }
    return t
  },
  SDF.ReadDocumentTheme = function (e, t, a, r) {
    var i = a.sdp,
      n = new Resources.SDTheme;
    t = SDF.ReadTheme(n, e, t, a, r);
    Resources.FindTheme(n.Name);
    return i.CurrentTheme = n.Name,
      t
  },
  SDF.ReadTheme = function (e, t, a, r, i) {
    for (
      e.Name = t.codes[a].data.name,
      e.EffectStyleIndex = t.codes[a].data.EffectStyleIndex,
      a++;
      t.codes[a].code != i.SDF_C_END_THEME12;
    ) {
      switch (t.codes[a].code) {
        case i.SDF_C_THEME_CAT:
          e.Category = t.codes[a].data.name;
          break;
        case i.SDF_C_THEME_COLOR:
          e.Colors.push(SDF.WinColorToHTML(t.codes[a].data.color));
          break;
        case i.SDF_C_THEME_TEXTURE:
          t.codes[a].data.name;
          break;
        case i.SDF_C_BEGIN_STYLELIST:
          a = SDF.ReadThemeStyleList(e, t, a, r, i);
          break;
        case i.SDF_C_BEGIN_OUTSIDELIST:
          a = SDF.ReadThemeOutsideList(e, t, a, r, i);
          break;
        case i.SDF_C_BEGIN_INSIDELIST:
          a = SDF.ReadThemeInsideList(e, t, a, r, i);
          break;
        case i.SDF_C_BEGIN_GRADIENTLIST:
          a = SDF.ReadThemeGradientList(e, t, a, r, i);
          break;
        case i.SDF_C_BEGIN_FILL:
          a = SDF.ReadSDFill(e.Background, t, a, r, i);
          break;
        case i.SDF_C_RECENTSTYLES:
          break;
        default:
          t.codes[a].code & SDF.SDF_BEGIN &&
            (
              a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      a++
    }
    return a
  },
  SDF.ReadThemeOutsideList = function (e, t, a, r, i) {
    var n;
    for (a++; t.codes[a].code != i.SDF_C_END_OUTSIDELIST;) {
      if (t.codes[a].code === i.SDF_C_OUTSIDE) n = SDF.ReadOutSide(t.codes[a].data, r.IsVisio),
        e.OutsideEffects.push(n);
      else t.codes[a].code & SDF.SDF_BEGIN &&
        (
          a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
        );
      a++
    }
    return a
  },



  SDF.ReadOutSide = function (e, t) {
    var a = new OutsideEffectData;
    return a.OutsideType = e.outsidetype,
      a.OutsideExtent_Right = r(e.extent.right) ? e.extent.right : 0,
      a.OutsideExtent_Left = r(e.extent.left) ? e.extent.left : 0,
      a.OutsideExtent_Top = r(e.extent.top) ? e.extent.top : 0,
      a.OutsideExtent_Bottom = r(e.extent.bottom) ? e.extent.bottom : 0,
      a.Color = SDF.WinColorToHTML(e.color),
      a.LParam = e.lparam,
      a.WParam = e.wparam,
      a;
    function r(e) {
      return !t ||
        e !== 1 / 0 &&
        !isNaN(e)
    }
  },
  SDF.ReadThemeInsideList = function (e, t, a, r, i) {
    var n;
    for (a++; t.codes[a].code != i.SDF_C_END_INSIDELIST;) {
      if (t.codes[a].code === i.SDF_C_INSIDEEFFECT) n = SDF.ReadInside(t.codes[a].data),
        e.InsideEffects.push(n);
      else t.codes[a].code & SDF.SDF_BEGIN &&
        (
          a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
        );
      a++
    }
    return a
  },
  SDF.ReadInside = function (e) {
    var t = new Resources.InsideEffectData;
    return t.Effect = e.effect,
      t.EffectColor = SDF.WinColorToHTML(e.effectcolor),
      t.LParam = e.lparam,
      t.WParam = e.wparam,
      t
  },
  SDF.ReadThemeGradientList = function (e, t, a, r, i) {
    var n;
    for (a++; t.codes[a].code != i.SDF_C_END_GRADIENTLIST;) {
      if (t.codes[a].code === i.SDF_C_THEMEGRADIENT) (n = new Resources.GradientData).Color = SDF.WinColorToHTML(t.codes[a].data.color),
        n.EndColor = SDF.WinColorToHTML(t.codes[a].data.endcolor),
        n.GradientFlags = t.codes[a].data.gradientflags,
        e.Gradients.push(n);
      else t.codes[a].code & SDF.SDF_BEGIN &&
        (
          a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
        );
      a++
    }
    return a
  },
  SDF.ReadSDFill = function (e, t, a, r, i) {
    for (
      a++,
      e.Hatch = 0,
      e.FillEffect = 0,
      e.EffectColor = ConstantData.Colors.Color_White,
      e.LParam = 0,
      e.WParam = 0;
      t.codes[a].code != i.SDF_C_END_FILL;
    ) {
      switch (t.codes[a].code) {
        case i.SDF_C_BEGIN_PAINT:
          a = SDF.ReadPaint(e.Paint, t, a, r, i);
          break;
        case i.SDF_C_HATCH:
          t.codes[a].data.hatch >= 0 &&
            t.codes[a].data.hatch < Resources.SDGHatchStyleTotal &&
            (e.Hatch = t.codes[a].data.hatch);
          break;
        case i.SDF_C_EFFECT:
          e.FillEffect = t.codes[a].data.effecttype,
            e.EffectColor = SDF.WinColorToHTML(t.codes[a].data.effectcolor),
            e.LParam = t.codes[a].data.lparam,
            e.WParam = t.codes[a].data.wparam;
          break;
        default:
          t.codes[a].code & SDF.SDF_BEGIN &&
            (
              a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      a++
    }
    return a
  },
  SDF.ReadTextureList = function (e, t, a, r, i) {
    console.log('SDF.ReadTextureList ===========', e, t, a, r, i)
    var n,
      o = window.URL ||
        window.webkitURL;
    for (t++; e.codes[t].code != r.SDF_O_TEXTURELIST_END;) {
      switch (e.codes[t].code) {
        case r.SDF_O_TEXTURE:
          var s = new Resources.SDTexture;
          s.TextureScale = new Resources.TextureScale,
            s.dim.x = SDF.ToSDJSCoords(e.codes[t].data.dim.x, a.coordScaleFactor),
            s.dim.y = SDF.ToSDJSCoords(e.codes[t].data.dim.y, a.coordScaleFactor),
            s.mr = e.codes[t].data.mr,
            s.imagetype = e.codes[t].data.imagetype,
            s.flags = e.codes[t].data.flags,
            a.TextureList.Textures.push(s);
          break;
        case r.SDF_O_TEXTUREEXTRA:
          s.categoryindex = e.codes[t].data.categoryindex,
            s.TextureScale.Units = e.codes[t].data.units,
            s.TextureScale.Scale = e.codes[t].data.scale,
            s.TextureScale.RWidth = e.codes[t].data.rwidth,
            s.TextureScale.AlignmentScalar = e.codes[t].data.alignment,
            s.TextureScale.Flags = e.codes[t].data.flags;
          break;
        case r.SDF_O_TEXTURENAME:
          s.name = e.codes[t].data.name,
            i ||
            (
              (
                n = GlobalData.optManager.GetStdTextureCategory(a.TextureList.Categories[s.categoryindex])
              ) >= 0 ? s.index = GlobalData.optManager.GetStdTextureIndex(n, s.name) : n = GlobalData.optManager.TextureList.Categories.push(a.TextureList.Categories[s.categoryindex]) - 1,
              s.categoryindex = n
            );
          break;
        case r.SDF_O_TEXTURECATNAME:
          a.TextureList.Categories.push(e.codes[t].data.name);
          break;
        case r.SDF_O_TEXTUREDATA:
          s.ImageURL = e.codes[t].data.URL,
            s.BlobBytes = e.codes[t].data.BlobBytes,
            s.index < 0 ? (
              s.flags = 0,
              s.filename = '',
              s.index = GlobalData.optManager.TextureList.Textures.push(s) - 1
            ) : i ||
            o &&
            o.revokeObjectURL &&
            (o.revokeObjectURL(s.ImageURL), s.ImageURL = '');
          break;
        default:
          e.codes[t].code & SDF.SDF_BEGIN &&
            (
              t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      t++
    }
    return t
  },
  SDF.WinLinePatternToJS = function (e, t) {
    var a = Resources.Windows_LinePatterns;
    switch (t) {
      case a.SEP_None:
        e.Thickness = 0,
          e.LinePattern = 0;
        break;
      case a.SEP_Dotted:
      case a.SEP_Dashed:
      case a.SEP_DDashed:
      case a.SEP_DDDashed:
        e.LinePattern = Resources.LinePatternData[t - a.SEP_Solid];
        break;
      default:
        e.LinePattern = 0
    }
  },
  SDF.ReadSDLine = function (e, t, a, r, i) {
    var n,
      o,
      s = Resources.Windows_LinePatterns;
    switch (
    e.Thickness = SDF.ToSDJSCoords(t.codes[a].data.thickness, r.coordScaleFactor),
    0 !== e.Thickness &&
    e.Thickness < 0.333 &&
    r.IsVisio &&
    (e.Thickness = 0.333),
    t.codes[a].data.thickness > 0 &&
    0 === e.Thickness &&
    (e.Thickness = 1),
    e.BThick = 0,
    n = t.codes[a].data.pattern,
    t.codes[a].data.pattern
    ) {
      case s.SEP_None:
        e.Thickness = 0,
          e.LinePattern = 0;
        break;
      case s.SEP_Dotted:
      case s.SEP_Dashed:
      case s.SEP_DDashed:
      case s.SEP_DDDashed:
        e.LinePattern = Resources.LinePatternData[t.codes[a].data.pattern - s.SEP_Solid];
        break;
      default:
        e.LinePattern = 0
    }
    for (
      e.Hatch = 0,
      e.LineEffect = 0,
      e.LParam = 0,
      e.WParam = 0,
      a++;
      t.codes[a].code != i.SDF_C_END_LINE;
    ) {
      switch (t.codes[a].code) {
        case i.SDF_C_BEGIN_PAINT:
          a = SDF.ReadPaint(e.Paint, t, a, r, i);
          break;
        case i.SDF_C_HATCH:
          e.Hatch = t.codes[a].data.hatch;
          break;
        case i.SDF_C_EFFECT:
          e.LineEffect = t.codes[a].data.effecttype,
            e.LParam = t.codes[a].data.lparam,
            e.WParam = t.codes[a].data.wparam;
          break;
        case i.SDF_C_FILLEDLINE:
          if (0 == t.codes[a].data.bthick) break;
          switch (n) {
            case s.SEP_None:
            case s.SEP_Solid:
            case s.SEP_Dotted:
            case s.SEP_Dashed:
            case s.SEP_DDashed:
            case s.SEP_DDDashed:
            case s.SEP_FilledLine:
              var l = e.Thickness;
              e.Thickness = SDF.ToSDJSCoords(2 * t.codes[a].data.bthick, r.coordScaleFactor),
                n === s.SEP_FilledLine &&
                (e.LinePattern = 0),
                e.BThick = e.Thickness / 2,
                e.Paint.Color === ConstantData.Colors.Color_White &&
                l > 0 &&
                (o = SDF.WinColorToHTML(t.codes[a].data.color)) != ConstantData.Colors.Color_White &&
                (
                  e.Paint.Color = o,
                  e.Paint.Opacity = SDF.WinColorToAlpha(t.codes[a].data.color)
                );
              break;
            case s.SEP_DoubleLine:
              e.Thickness = SDF.ToSDJSCoords(2 * t.codes[a].data.bthick, r.coordScaleFactor),
                e.LinePattern = 0,
                e.BThick = e.Thickness / 2
          }
          break;
        default:
          t.codes[a].code & SDF.SDF_BEGIN &&
            (
              a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      a++
    }
    return a
  },


  SDF.ReadPaint = function (e, t, a, r, i) {
    var n,
      o,
      s,
      l;
    for (
      e.FillType = t.codes[a].data.filltype,
      e.Color = SDF.WinColorToHTML(t.codes[a].data.color),
      e.Opacity = SDF.WinColorToAlpha(t.codes[a].data.color),
      e.EndColor = ConstantData.Colors.Color_White,
      e.GradientFlags = 0,
      e.Texture = 0,
      e.TextureScale = new Resources.TextureScale,
      e.EndOpacity = 1,
      4278190080 == (4278190080 & e.Color) &&
      (e.Color = 16777215 & e.Color, e.Opacity = 1),
      a++;
      t.codes[a].code != i.SDF_C_END_PAINT;
    ) {
      switch (t.codes[a].code) {
        case i.SDF_C_GRADIENT:
          e.EndColor = SDF.WinColorToHTML(t.codes[a].data.ecolor),
            e.GradientFlags = t.codes[a].data.gradientflags,
            e.EndOpacity = SDF.WinColorToAlpha(t.codes[a].data.ecolor),
            4278190080 == (4278190080 & e.EndColor) &&
            (e.EndColor = 16777215 & e.EndColor, e.EndOpacity = 1);
          break;
        case i.SDF_C_RICHGRADIENT:
          n = new Resources.SDRichGradient(t.codes[a].data.gradienttype, t.codes[a].data.angle);
          break;
        case i.SDF_C_RICHGRADIENTSTOP:
          void 0 !== n &&
            (
              s = SDF.WinColorToHTML(t.codes[a].data.color),
              l = SDF.WinColorToAlpha(t.codes[a].data.color),
              o = new Resources.SDRichGradientStop(s, l, t.codes[a].data.stop),
              n.stops.push(o)
            );
          break;
        case i.SDF_C_TEXTURE:
          r.ReadBlocks ? e.Texture = t.codes[a].data.textureindex : r.TextureList.Textures[t.codes[a].data.textureindex] ? e.Texture = r.TextureList.Textures[t.codes[a].data.textureindex].index : (r.ReadTexture = t.codes[a].data.textureindex, e.Texture = void 0);
          break;
        case i.SDF_C_THEME_TEXTURE:
          break;
        case i.SDF_O_TEXTUREEXTRA:
          e.TextureScale.Units = t.codes[a].data.units,
            e.TextureScale.Scale = t.codes[a].data.scale,
            e.TextureScale.RWidth = t.codes[a].data.rwidth,
            e.TextureScale.AlignmentScalar = t.codes[a].data.alignment,
            e.TextureScale.Flags = t.codes[a].data.flags;
          break;
        default:
          t.codes[a].code & SDF.SDF_BEGIN &&
            (
              a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      a++
    }
    return void 0 !== n &&
      (
        e.GradientFlags = GlobalData.optManager.SD_AddRichGradient(r.RichGradients, n)
      ),
      a
  },
  SDF.ReadSDTxf = function (e, t, a, r, i) {
    if (r.fontlist.length) {
      var n = SDF.FontIDtoFontRec(t.codes[a].data.fontid, r);
      e.FontName = n.fontName
    } else e.FontId = t.codes[a].data.fontid,
      e.FontId >= 0 &&
      e.FontId < r.fontlist.length &&
      (e.FontName = r.fontlist[e.FontId].fontName);
    for (
      e.FontSize = t.codes[a].data.fsize,
      e.Face = t.codes[a].data.face,
      a++;
      t.codes[a].code != i.SDF_C_END_TEXTF;
    ) {
      switch (t.codes[a].code) {
        case i.SDF_C_BEGIN_PAINT:
          a = SDF.ReadPaint(e.Paint, t, a, r, i);
          break;
        case i.SDF_C_THEME_FONT12:
          e.FontName = t.codes[a].data.fontname;
          break;
        case i.SDF_C_OUTSIDE:
          e.Effect = SDF.ReadOutSide(t.codes[a].data, r.IsVisio);
          break;
        default:
          t.codes[a].code & SDF.SDF_BEGIN &&
            (
              a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      a++
    }
    return e.FontId = -1/* GlobalData.optManager.GetFontIdByName(e.FontName)*/,
      a
  },
  SDF.ReadStyle = function (e, t, a, r, i) {
    for (
      e.Name = t.codes[a].data.stylename,
      a++;
      t.codes[a].code != i.SDF_C_END_STYLE;
    ) {
      switch (t.codes[a].code) {
        case i.SDF_C_BEGIN_FILL:
          a = SDF.ReadSDFill(e.Fill, t, a, r, i);
          break;
        case i.SDF_C_BEGIN_LINE:
          SDF.ReadSDLine(e.Border, t, a, r, i),
            a = SDF.ReadSDLine(e.Line, t, a, r, i);
          break;
        case i.SDF_C_BEGIN_TEXTF:
          a = SDF.ReadSDTxf(e.Text, t, a, r, i);
          break;
        case i.SDF_C_OUTSIDE:
          e.OutsideEffect = SDF.ReadOutSide(t.codes[a].data, r.IsVisio);
          break;
        default:
          t.codes[a].code & SDF.SDF_BEGIN &&
            (
              a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      a++
    }
    return a
  }

SDF.ReadThemeStyleList = function (e, t, a, r, i) {
  var n,
    o,
    s = - 1;
  for (a++; t.codes[a].code != i.SDF_C_END_STYLELIST;) {
    switch (t.codes[a].code) {
      case i.SDF_C_BEGIN_STYLE:
        n = new QuickStyle(),// new Resources.QuickStyle,
          // Double
          a = SDF.ReadStyle(n, t, a, r, i),
          e.Styles.push(n),
          s++;
        break;
      case i.SDF_C_BEGIN_LINE:
        o = new Resources.LineData,
          a = SDF.ReadSDLine(o, t, a, r, i),
          s >= 0 &&
          (e.Styles[s].Line = o);
        break;
      default:
        t.codes[a].code & SDF.SDF_BEGIN &&
          (
            a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
          )
    }
    a++
  }
  return a
},
  SDF.ReadStyleList = function (e, t, a, r, i) {
    var n;
    for (a++; t.codes[a].code != i.SDF_C_END_STYLELIST;) {
      if (t.codes[a].code === i.SDF_C_BEGIN_STYLE) n = new QuickStyle(),// new Resources.QuickStyle,
        a = SDF.ReadStyle(n, t, a, r, i),
        e.push(n);
      else t.codes[a].code & SDF.SDF_BEGIN &&
        (
          a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
        );
      a++
    }
    return a
  },
  SDF.FixDefaults = function (e, t) {
    var a = ConstantData.SessionFlags;
    t.isSymbol ||
      'Genograms' === GlobalData.optManager.theContentHeader.smartpanelname &&
      (
        e.flags = Utils2.SetFlag(e.flags, a.SEDS_LLink, !0),
        e.flags = Utils2.SetFlag(e.flags, a.SEDS_HideConnExpand, !0)
      )
  },
  SDF.SetCurvatureDefaults = function (e, t) {
    !t.isSymbol &&
      (t.isTemplate || SDUI.Builder) &&
      t.PVersion < SDF.SDF_PVERSION864 &&
      (
        e.def.curveparam = rrectparam = 100 * ConstantData.Defines.DefFixedRRect,
        e.def.rrectparam = rrectparam = ConstantData.Defines.DefFixedRRect
      )
  },
  SDF.ReadDraw = function (e, t, a, r, i) {

    console.log('SDF.ReadDraw ===========', e, t, a, r, i)
    var n,
      o,
      s,
      l = 0,
      S = a.sdp,
      c = a.tLMB,
      u = null,
      p = null,
      d = null;
    for (
      i != r.SDF_C_DRAW_END ? (
        SDF.ReadDrawSession(S, c, e.codes[t].data, a),
        a.IsVisio &&
        SDF.SetDefaults(S, a)
      ) : (
        SDF.SetDefaults(S, a),
        SDF.ReadDrawSession6(S, e.codes[t].data, a),
        SDF.SetDefaults(S, a)
      ),
      SDF.FixDefaults(S, a),
      SDF.SetCurvatureDefaults(S, a),
      t++;
      e.codes[t].code != i;
    ) {
      switch (e.codes[t].code) {
        case r.SDF_C_DRAW7:
          SDF.ReadDraw7(S, c, e.codes[t].data, a);
          break;
        case r.SDF_C_DRAWEXTRA:
          SDF.ReadDrawExtra(S, e.codes[t].data, a);
          break;
        case r.SDF_C_SDDATA64C:
          ListManager.SDData.LoadDataSets(e.codes[t].data.bytes, !0, !0, a);
          break;
        case r.SDF_C_BEGIN_STYLE:
          0 === l ? (
            t = SDF.ReadStyle(S.def.style, e, t, a, r),
            SDF.SetDefaults(S, a)
          ) : (
            n = new QuickStyle(),// new Resources.QuickStyle,
            t = SDF.ReadStyle(n, e, t, a, r)
          ),
            l++;
          break;
        case r.SDF_C_BEGIN_FILL:
          t = SDF.ReadSDFill(S.background, e, t, a, r),
            a.sdp.background.Paint.FillType === ConstantData.FillTypes.SDFILL_TEXTURE &&
            null == a.sdp.background.Paint.Texture &&
            (a.sdp.background.Paint.Texture = a.ReadTexture);
          break;
        case r.SDF_C_BEGIN_LINE:
          t = SDF.ReadSDLine(S.def.style.Line, e, t, a, r),
            SDF.SetDefaults(S, a);
          break;
        case r.SDF_C_BEGIN_STYLELIST:
          t = SDF.ReadStyleList(a.lpStyles, e, t, a, r);
          break;
        case r.SDF_C_DRAWLINK:
        case r.SDF_C_DRAWLINK6:
          SDF.ReadLinkList(a.links, e.codes[t].data);
          break;
        case r.SDF_C_DRAWGROUP:
          break;
        case r.SDF_C_DRAWOBJ8:
          if (
            (
              t = SDF.ReadObject(e, t, a, r, FileParser.SDROpCodesByName.SDF_C_DRAWOBJ8_END)
            ) < 0
          ) return - 1;
          break;
        case r.SDF_C_DRAWOBJ:
          if (
            (
              t = SDF.ReadObject(e, t, a, r, FileParser.SDROpCodesByName.SDF_C_DRAWOBJ_END)
            ) < 0
          ) return - 1;
          break;
        case r.SDF_C_TABLEBLOCK:
          s = SDF.ReadTableBlock(e, t, a);
          break;
        case r.SDF_C_TABLEVP:
          null == s &&
            (s = new ListManager.Table),
            t = SDF.ReadTable(s, e, t, a, r, r.SDF_C_TABLEVP_END);
          break;
        case r.SDF_C_GRAPHBLOCK:
          u = SDF.ReadGraphBlock(e, t, a);
          break;
        case r.SDF_C_GRAPH:
          null == u &&
            (u = new ListManager.Graph),
            t = SDF.ReadGraph(u, e, t, a, r, r.SDF_C_GRAPH_END);
          break;
        case r.SDF_C_EXPANDEDVIEWBLOCK:
          d = SDF.ReadExpandedViewBlock(e, t, a);
          break;
        case r.SDF_C_EXPANDEDVIEW:
          d &&
            (d.Data = e.codes[t].data.svg);
          break;
        case r.SDF_C_GANTTINFOBLOCK:
          p = SDF.ReadGanttInfoBlock(e, t, a);
          break;
        case r.SDF_C_CLOUDCOMMENTBLOCK:
          SDF.ReadCommentBlock(e, t, a);
          break;
        case r.SDF_C_GANTTINFO:
          null == p &&
            (p = new ListManager.Table.GanttInfo),
            SDF.ReadGanttInfo(p, e.codes[t].data, a);
          break;
        case r.SDF_C_LONGTEXT8:
          t = SDF.ReadTextBlock(e, t, a, r, !1);
          break;
        case r.SDF_C_COMMENT:
          t = SDF.ReadTextBlock(e, t, a, r, !0);
          break;
        case r.SDF_C_IMAGEBLOCK:
          SDF.ReadImageBlock(e, t, a, r, !0);
          break;
        case r.SDF_C_NATIVEBLOCK:
          t = SDF.ReadNativeBlock(e, t, a, r, !0);
          break;
        case r.SDF_C_NATIVEWINBLOCK:
          t = SDF.ReadNativeBlock(e, t, a, r, !1);
          break;
        case r.SDF_O_RULER:
          a.rulerSettings = new RulerSettings(),// new SDJS.DocumentHandler.rulerSettings,
            SDF.ReadRulers(e.codes[t].data, a);
          break;
        case r.SDF_C_LINEDRAWLIST:
          SDF.ReadLineDrawList(e.codes[t].data, a);
          break;
        case r.SDF_C_RECENTSYMBOLS_BEGIN:
          t = SDF.ReadRecentSymbols(e, t, a, r);
          break;
        case r.SDF_C_BEGIN_LAYER:
          t = SDF.ReadLayers(e, t, a, r);
          break;
        case r.SDF_C_DRAWIMAGE8:
          (o = new ListManager.ImageRecord).croprect = e.codes[t].data.croprect,
            o.scale = e.codes[t].data.scale,
            o.imageflags = e.codes[t].data.imageflags,
            o.iconid = 0,
            a.PVersion >= SDF.SDF_PVERSION838 &&
            e.codes[t].data.iconid &&
            (o.iconid = e.codes[t].data.iconid);
          break;
        case r.SDF_C_DRAWPNG:
        case r.SDF_C_DRAWJPG:
        case r.SDF_C_DRAWMETA:
          break;
        case r.SDF_O_TEXTURELIST:
          t = SDF.ReadTextureList(e, t, a, r, !1);
          break;
        case r.SDF_C_DEFTXSCALE:
        case r.SDF_C_DEFLBTXSCALE:
        case r.SDF_C_DEFSBTXSCALE:
          break;
        default:
          e.codes[t].code & SDF.SDF_BEGIN &&
            (
              t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      t++
    }
    return t
  },


  SDF.W32JustToJS = function (e, t) {
    var a = 'center';
    switch (e) {
      case 0:
        a = t ? 'top' : 'left';
        break;
      case 2:
        a = 'right';
        break;
      case 6:
        a = t ? 'middle' : 'center';
        break;
      case 8:
        a = 'bottom'
    }
    return a
  },
  SDF.W32BulletToJS = function (e) {
    var t = 'none';
    switch (e) {
      case 1:
        t = 'hround';
        break;
      case 2:
        t = 'sround';
        break;
      case 3:
        t = 'hsquare';
        break;
      case 4:
        t = 'ssquare';
        break;
      case 5:
        t = 'diamond';
        break;
      case 6:
        t = 'chevron';
        break;
      case 7:
        t = 'check';
        break;
      case 8:
        t = 'plus'
    }
    return t
  },
  SDF.W32JustToTextAlign = function (e, t) {
    var a = ConstantData.TextAlign.CENTER;
    switch (t) {
      case FileParser.TextJust.TA_TOP:
        switch (e) {
          case FileParser.TextJust.TA_LEFT:
            a = ConstantData.TextAlign.TOPLEFT;
            break;
          case FileParser.TextJust.TA_RIGHT:
            a = ConstantData.TextAlign.TOPRIGHT;
            break;
          default:
            a = ConstantData.TextAlign.TOPCENTER
        }
        break;
      case FileParser.TextJust.TA_BOTTOM:
        switch (e) {
          case FileParser.TextJust.TA_LEFT:
            a = ConstantData.TextAlign.BOTTOMLEFT;
            break;
          case FileParser.TextJust.TA_RIGHT:
            a = ConstantData.TextAlign.BOTTOMRIGHT;
            break;
          default:
            a = ConstantData.TextAlign.BOTTOMCENTER
        }
        break;
      default:
        switch (e) {
          case FileParser.TextJust.TA_LEFT:
            a = ConstantData.TextAlign.LEFT;
            break;
          case FileParser.TextJust.TA_RIGHT:
            a = ConstantData.TextAlign.RIGHT;
            break;
          default:
            a = ConstantData.TextAlign.CENTER
        }
    }
    return a
  },
  SDF.TextAlignToJust = function (e) {
    var t = {
      just: 'center',
      vjust: 'middle'
    };
    switch (e) {
      case ConstantData.TextAlign.LEFT:
        t.just = 'left';
        break;
      case ConstantData.TextAlign.RIGHT:
        t.just = 'right';
        break;
      case ConstantData.TextAlign.TOPLEFT:
        t.just = 'left',
          t.vjust = 'top';
        break;
      case ConstantData.TextAlign.TOPCENTER:
        t.vjust = 'top';
        break;
      case ConstantData.TextAlign.TOPRIGHT:
        t.just = 'right',
          t.vjust = 'top';
        break;
      case ConstantData.TextAlign.BOTTOMLEFT:
        t.just = 'left',
          t.vjust = 'bottom';
        break;
      case ConstantData.TextAlign.BOTTOMCENTER:
        t.vjust = 'bottom';
        break;
      case ConstantData.TextAlign.BOTTOMRIGHT:
        t.just = 'right',
          t.vjust = 'bottom'
    }
    return t
  },
  SDF.ReadDrawExtra = function (e, t, a) {
    e.def.tmargins.left = SDF.ToSDJSCoords(t.tmargins.left, a.coordScaleFactor),
      e.def.tmargins.top = SDF.ToSDJSCoords(t.tmargins.top, a.coordScaleFactor),
      e.def.tmargins.right = SDF.ToSDJSCoords(t.tmargins.right, a.coordScaleFactor),
      e.def.tmargins.bottom = SDF.ToSDJSCoords(t.tmargins.bottom, a.coordScaleFactor),
      e.def.textgrow = t.textgrow,
      e.def.textflags = t.textflags,
      e.def.fsize_min = t.fsize_min
  },
  SDF.ReadDraw7 = function (e, t, a, r) {
    var i = Resources.Windows_LinePatterns;
    switch (
    e.hopstyle = a.hopstyle,
    e.hopdim.x = SDF.ToSDJSCoords(a.hopdim.x, r.coordScaleFactor),
    e.hopdim.y = SDF.ToSDJSCoords(a.hopdim.y, r.coordScaleFactor),
    e.dimensions = a.dimensions,
    e.shapedimensions = a.shapedimensions,
    null != a.activelayer &&
    (t.activelayer = a.activelayer),
    a.lbpatindex
    ) {
      case i.SEP_FilledLine:
      case i.SEP_DoubleLine:
        e.def.style.Line.Thickness = SDF.ToSDJSCoords(2 * a.dbthick, r.coordScaleFactor),
          e.def.style.Line.LinePattern = 0
    }
  },
  SDF.ReadDrawSession = function (e, t, a, r) {
    var i,
      n;
    return i = a.ldupdisp ? a.ldupdisp : a.dupdisp,
      n = a.ldim ? a.ldim : a.dim,
      e.dim.x = SDF.ToSDJSCoords(n.x, r.coordScaleFactor),
      e.dim.y = SDF.ToSDJSCoords(n.y, r.coordScaleFactor),
      e.dim.x <= 0 &&
      (e.dim.x = 400),
      e.dim.y <= 0 &&
      (e.dim.y = 400),
      e.CommentListID = - 1,
      e.CommentID = - 1,
      e.flags = a.flags,
      e.tselect = a.tselect,
      e.dupdisp.x = SDF.ToSDJSCoords(i.x, r.coordScaleFactor),
      e.dupdisp.y = SDF.ToSDJSCoords(i.y, r.coordScaleFactor),
      e.d_sarrow = a.d_sarrow & FileParser.ArrowMasks.ARROW_T_MASK,
      e.d_sarrowdisp = !!(a.d_sarrow & FileParser.ArrowMasks.ARROW_DISP),
      e.d_arrowsize = a.d_arrowsize,
      e.d_earrow = a.d_earrow & FileParser.ArrowMasks.ARROW_T_MASK,
      e.d_earrowdisp = !!(a.d_earrow & FileParser.ArrowMasks.ARROW_DISP),
      e.def.just = SDF.W32JustToJS(a.just, !1),
      e.def.vjust = SDF.W32JustToJS(a.vjust, !0),
      SDF.LogFontToFontRecord(e.def.lf, a.lf, r),
      a.snapalign ? e.centersnapalign = !0 : e.centersnapalign = !1,
      e.hopstyle = a.hopstyle,
      e.hopdim.x = SDF.ToSDJSCoords(a.hopdim.x, r.coordScaleFactor),
      e.hopdim.y = SDF.ToSDJSCoords(a.hopdim.y, r.coordScaleFactor),
      e.dimensions = a.dimensions,
      e.shapedimensions = a.shapedimensions,
      t.activelayer = a.activelayer,
      e.def.flags = a.defflags,
      e.def.tmargins.left = SDF.ToSDJSCoords(a.tmargins.left, r.coordScaleFactor),
      e.def.tmargins.top = SDF.ToSDJSCoords(a.tmargins.top, r.coordScaleFactor),
      e.def.tmargins.right = SDF.ToSDJSCoords(a.tmargins.right, r.coordScaleFactor),
      e.def.tmargins.bottom = SDF.ToSDJSCoords(a.tmargins.bottom, r.coordScaleFactor),
      e.def.textgrow = a.textgrow,
      e.def.textflags = a.textflags,
      e.def.fsize_min = a.fsize_min,
      e.def.lastcommand = a.lastcommand,
      a.h_arraywidth &&
      (
        e.def.h_arraywidth = SDF.ToSDJSCoords(a.h_arraywidth, r.coordScaleFactor),
        e.def.v_arraywidth = SDF.ToSDJSCoords(a.v_arraywidth, r.coordScaleFactor)
      ),
      a.arrayht &&
      (
        e.def.arraywd = SDF.ToSDJSCoords(a.arraywd, r.coordScaleFactor),
        e.def.arrayht = SDF.ToSDJSCoords(a.arrayht, r.coordScaleFactor)
      ),
      a.sequenceflags &&
      (e.sequenceflags = a.sequenceflags),
      a.chartdirection &&
      (e.chartdirection = a.chartdirection),
      a.copyPasteTrialVers &&
      (e.copyPasteTrialVers = a.copyPasteTrialVers),
      a.taskmanagementflags &&
      (e.taskmanagementflags = a.taskmanagementflags),
      a.taskdays &&
      (e.taskdays = a.taskdays),
      a.moreflags ? e.moreflags = a.moreflags : e.moreflags = 0,
      e.moreflags = Utils2.SetFlag(
        e.moreflags,
        ConstantData.SessionMoreFlags.SEDSM_Swimlane_Rows,
        !0
      ),
      e.moreflags = Utils2.SetFlag(
        e.moreflags,
        ConstantData.SessionMoreFlags.SEDSM_Swimlane_Cols,
        !0
      ),
      a.fieldmask ? e.fieldmask = a.fieldmask : e.fieldmask = 0,
      a.wallThickness ? e.def.wallThickness = a.wallThickness : e.def.wallThickness = 0,
      null != a.curveparam ? e.def.curveparam = a.curveparam : e.def.curveparam = 0,
      null != a.rrectparam ? e.def.rrectparam = a.rrectparam : e.def.rrectparam = ConstantData.Defines.DefFixedRRect,
      e
  },
  SDF.ReadDrawSession6 = function (e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l;
    switch (
    r = t.ldupdisp ? t.ldupdisp : t.dupdisp,
    i = t.ldim ? t.ldim : t.dim,
    e.dim.x = SDF.ToSDJSCoords(i.x, a.coordScaleFactor),
    e.dim.y = SDF.ToSDJSCoords(i.y, a.coordScaleFactor),
    e.flags = t.flags,
    e.tselect = t.tselect,
    e.dupdisp.x = SDF.ToSDJSCoords(r.x, a.coordScaleFactor),
    e.dupdisp.y = SDF.ToSDJSCoords(r.y, a.coordScaleFactor),
    e.def.style.Border.Paint.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_BorderIndex]),
    e.def.style.Line.Paint.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_LineIndex]),
    t.colors[FileParser.v6ColorIndexes.Std_FillIndex] == ConstantData.Colors.Color_Trans ? e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT : (
      e.def.style.Fill.Paint.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_FillIndex]),
      e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID
    ),
    e.def.style.OutsideEffect.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_ShadowIndex]),
    e.def.style.Text.Paint.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_TextIndex]),
    t.colors[FileParser.v6ColorIndexes.Std_BackIndex] == ConstantData.Colors.Color_Trans ? e.background.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT : (
      e.background.Paint.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_BackIndex]),
      e.background.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID
    ),
    n = SDF.ToSDJSCoords(t.shaddisp.x, a.coordScaleFactor) / 100,
    o = SDF.ToSDJSCoords(t.shaddisp.y, a.coordScaleFactor) / 100,
    t.shadowstyle
    ) {
      case FileParser.v6ShadowStyles.SED_Sh_Drop:
      case FileParser.v6ShadowStyles.SED_Sh_FDrop:
      case FileParser.v6ShadowStyles.SED_Sh_Cont:
        n = 0.2,
          o = 0.2,
          e.def.style.OutsideEffect.OutsideType = FileParser.OutEffect.SDOUT_EFFECT_DROP,
          e.def.style.OutsideEffect.OutsideExtent_Left = 0,
          e.def.style.OutsideEffect.OutsideExtent_Top = 0,
          e.def.style.OutsideEffect.OutsideExtent_Right = 0,
          e.def.style.OutsideEffect.OutsideExtent_Bottom = 0,
          t.shaddisp.x < 0 ? e.def.style.OutsideEffect.OutsideExtent_Left = - n : t.shaddisp.x > 0 &&
            (e.def.style.OutsideEffect.OutsideExtent_Right = n),
          t.shaddisp.y < 0 ? e.def.style.OutsideEffect.OutsideExtent_Top = - o : t.shaddisp.y > 0 &&
            (e.def.style.OutsideEffect.OutsideExtent_Bottom = o),
          e.def.style.OutsideEffect.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_ShadowIndex])
    }
    return e.d_sarrow = t.d_sarrow & FileParser.ArrowMasks.ARROW_T_MASK,
      e.d_sarrowdisp = !!(t.d_sarrow & FileParser.ArrowMasks.ARROW_DISP),
      e.d_arrowsize = t.d_arrowsize,
      e.d_earrow = t.d_earrow & FileParser.ArrowMasks.ARROW_T_MASK,
      e.d_earrowdisp = !!(t.d_earrow & FileParser.ArrowMasks.ARROW_DISP),
      SDF.LogFontToFontRecord(e.def.lf, t.lf, a),
      e.def.style.Line.Thickness = SDF.ToSDJSCoords(t.lbord, a.coordScaleFactor),
      0 === e.def.style.Line.Thickness &&
      t.lbord &&
      (e.def.style.Line.Thickness = 1),
      e.def.style.Border.Thickness = SDF.ToSDJSCoords(t.bord, a.coordScaleFactor),
      0 === e.def.style.Border.Thickness &&
      t.bord &&
      (e.def.style.Border.Thickness = 1),
      e.def.style.Text.FontSize = t.fsize,
      e.def.style.Text.Face = t.face,
      e.def.style.Text.FontId = -1/* GlobalData.optManager.GetFontIdByName(e.def.fontName)*/,
      e.def.just = SDF.W32JustToJS(t.just, !1),
      e.def.vjust = SDF.W32JustToJS(t.vjust, !0),
      l = void 0 === t.d_fpatindex ? FileParser.v6FillTypes.SEOpaqueIndex : t.d_fpatindex,
      s = t.colors[FileParser.v6ColorIndexes.Std_FillIndex],
      void 0 === t.ecolor ? e.def.style.Fill.Paint.EndColor = ConstantData.Colors.Color_White : e.def.style.Fill.Paint.EndColor = SDF.WinColorToHTML(t.ecolor),
      l === FileParser.v6FillTypes.SEHollowIndex ? (
        e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
        t.gradientflags &&
        (
          e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_GRADIENT,
          e.def.style.Fill.Paint.GradientFlags = t.gradientflags
        )
      ) : l == FileParser.v6FillTypes.SEOpaqueIndex &&
      (
        t.gradientflags ? (
          e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_GRADIENT,
          e.def.style.Fill.Paint.GradientFlags = t.gradientflags
        ) : s === ConstantData.Colors.Color_Trans ? (
          e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
          e.def.style.Fill.Paint.Color = ConstantData.Colors.Color_White
        ) : e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID
      ),
      e
  },
  SDF.SetDefaults = function (e, t) {
    t.DefBorder.bord = e.def.style.Border.Thickness,
      t.DefBorder.color = e.def.style.Border.Paint.Color,
      t.DefBorder.patindex = 0,
      t.DefLine.bord = e.def.style.Line.Thickness,
      t.DefLine.color = e.def.style.Line.Paint.Color,
      t.DefLine.patindex = 0,
      t.DefLine.arrowsize = 0,
      t.DefLine.sarrow = 0,
      t.DefLine.earrow = 0,
      t.DefFill.Hatch = 0,
      t.DefFill.color = e.def.style.Fill.Paint.Color,
      t.DefFill.ecolor = e.def.style.Fill.Paint.EndColor,
      t.DefFill.gradientflags = e.def.style.Fill.Paint.GradientFlags,
      SDF.DefaultText(e, t)
  },
  SDF.DefaultText = function (e, t) {
    e ? (
      t.DefFont = $.extend(!0, {
      }, e.def.lf),
      t.SDF_DefFSize = e.def.style.Text.FontSize,
      t.DefRun.fontrec = $.extend(!0, {
      }, e.def.lf),
      t.DefRun.fontrec.fontSize = e.def.style.Text.FontSize,
      t.DefRun.fontrec.face = e.def.style.Text.Face,
      t.DefRun.paint = $.extend(!0, {
      }, e.def.style.Text.Paint)
    ) : (
      t.DefRun.fontrec = new FontRecord(),
      t.DefFont = new FontRecord(),
      t.DefRun.paint = new PaintData(ConstantData.Colors.Color_Black)
    ),
      t.DefRun.styleid = 0,
      t.DefRun.linkid = - 1,
      t.DefRun.flags = 0,
      t.DefRun.orient = 0,
      t.DefRun.start = 0,
      t.DefRun.nchar = 0,
      t.DefRun.fonth = 0,
      t.DefRun.extra = 0,
      t.DefRun.hyph = 0,
      t.DefTStyle.tracking = 0,
      t.DefTStyle.spacing = 0,
      t.DefTStyle.just = 'left',
      t.DefTStyle.leading = 0,
      t.DefTStyle.lindent = 0,
      t.DefTStyle.bindent = 20,
      t.DefTStyle.hyphen = 1,
      t.DefTStyle.rindent = 0,
      t.DefTStyle.pindent = 0,
      t.DefTStyle.tabspace = 6,
      t.DefTStyle.bullet = 'none'
  },
  SDF.ReadRulers = function (e, t) {
    t.rulerSettings = new RulerSettings(),// SDJS.DocumentHandler.rulerSettings,
      t.rulerSettings.useInches = e.inches,
      t.rulerSettings.major = SDF.ToSDJSCoords(e.Major, t.coordScaleFactor),
      t.PVersion < SDF.SDF_POVERSION801 &&
      (t.rulerSettings.major *= 6),
      t.rulerSettings.majorScale = e.MajorScale,
      t.rulerSettings.units = e.units,
      t.rulerSettings.nTics = e.MinorDenom,
      t.rulerSettings.nMid = 5 != e.MinorDenom ? 1 : 0,
      t.rulerSettings.nGrid = e.MinorDenom,
      null != e.dp &&
      (t.rulerSettings.dp = e.dp),
      null != e.originx ? (
        t.rulerSettings.originx = e.originx,
        t.rulerSettings.originy = e.originy
      ) : (t.rulerSettings.originx = 0, t.rulerSettings.originy = 0),
      t.rulerSettings.showpixels = !1,
      e.show ? t.rulerSettings.show = !0 : t.rulerSettings.show = !1,
      e.showpixels &&
      (t.rulerSettings.showpixels = !0),
      e.fractionaldenominator ? t.rulerSettings.fractionaldenominator = e.fractionaldenominator : t.rulerSettings.fractionaldenominator = GlobalData.docHandler.rulerSettings.fractionaldenominator
  },
  SDF.ReadLineDrawList = function (e, t) {
    var a;
    6 === e.n &&
      (
        t.sdp.RecentSymbols = [],
        // a = new ListManager.RecentSymbol(e.symbol1, '', !1),
        a = new RecentSymbol(e.symbol1, '', !1),
        t.sdp.RecentSymbols.push(a),
        a = new RecentSymbol(e.symbol2, '', !1),
        t.sdp.RecentSymbols.push(a),
        a = new RecentSymbol(e.symbol3, '', !1),
        t.sdp.RecentSymbols.push(a),
        a = new RecentSymbol(e.symbol4, '', !1),
        t.sdp.RecentSymbols.push(a),
        a = new RecentSymbol(e.symbol5, '', !1),
        t.sdp.RecentSymbols.push(a),
        a = new RecentSymbol(e.symbol6, '', !1),
        t.sdp.RecentSymbols.push(a)
      )
  },
  SDF.ReadLinkList = function (e, t) {
    var a,
      r,
      i,
      n;
    for (a = t.n, r = 0; r < a; r++) null == t.links[r].cellid ? n = null : (
      (n = t.links[r].cellid) === ConstantData.Defines.SED_DNULL &&
      (n = null),
      4294967295 == n &&
      (n = null)
    ),
      (
        i = new Link(t.links[r].targetid, t.links[r].hookid, n)
      ).flags = t.links[r].flags,
      e.push(i)
  },
  SDF.ObjectIsGroup = function (e, t, a, r, i) {
    var n,
      o,
      s = !1;
    if (e.ValidateHashesAsync) return !t.codes[a].data.HasSVG &&
      !t.codes[a].data.UsePNG &&
      !!t.codes[a].data.groupcodelist;
    if (t.codes[a].data.objclass) return t.codes[a].data.objclass === ConstantData.ShapeClass.GROUPSYMBOL;
    for (a++; t.codes[a].code != i;) {
      switch (t.codes[a].code) {
        case r.SDF_C_TABLEVP:
        case r.SDF_C_TABLEID:
          return s;
        case r.SDF_C_EMFHASH:
          e.AddEMFHash ? o = t.codes[a].data.name : n = !0;
          break;
        case r.SDF_C_NATIVESTORAGE:
          if (n) return !1;
          if (!e.AddEMFHash) return !0;
          s = !0;
          break;
        case r.SDF_C_NATIVEID:
          return !n;
        case r.SDF_C_DRAWMETA:
          if (e.AddEMFHash && !n) {
            void 0 === o &&
              (o = e.gHash.GetHash(t.codes[a].data.BlobBytes));
            Constants.FilePath_FindHashSVG;
            if (
              foundHash = null != SDUI.CMSContent.GetSymbolSVGByHash(SDUI.AppSettings.ContentSource, o),
              n
            ) return t.codes[a].data.EMFHash = o,
              !1
          }
      }
      a++
    }
    return s
  },
  SDF.ObjectIsSymbol = function (e, t, a, r, i) {
    if (e.ValidateHashesAsync) return !!t.codes[a].data.HasColorSVG;
    if (t.codes[a].data.objclass) return t.codes[a].data.objclass === ConstantData.ShapeClass.SVGFRAGMENTSYMBOL;
    a++;
    for (var n, o, s = !1; t.codes[a].code != i;) {
      switch (t.codes[a].code) {
        case r.SDF_C_SVGFRAGMENTID:
          s = !0;
          break;
        case r.SDF_C_EMFHASH:
          e.AddEMFHash ? o = t.codes[a].data.name : n = !0,
            s = !0;
          break;
        case r.SDF_C_DRAWMETA:
          if (e.AddEMFHash && !n) {
            void 0 === o &&
              (o = e.gHash.GetHash(t.codes[a].data.BlobBytes));
            Constants.FilePath_FindHashSVGColor;
            (
              n = null != SDUI.CMSContent.GetSymbolSVGColorByHash(SDUI.AppSettings.ContentSource, o)
            ) &&
              (s = !0)
          }
        case r.SDF_C_NATIVESTORAGE:
        case r.SDF_C_NATIVEID:
          return !!s
      }
      a++
    }
    return !1
  },
  SDF.ObjectIsConnectorTextLabel = function (e, t, a, r) {
    var i = e.codes[t].data;
    t++;
    for (var n, o, s = !1, l = !1; e.codes[t].code != r;) {
      switch (e.codes[t].code) {
        case a.SDF_C_DRAWHOOK:
          1 === (n = e.codes[t].data).connecty &&
            (s = !0, o = n.objid);
          break;
        case a.SDF_C_LONGTEXT8:
        case a.SDF_C_LONGTEXT:
          l = !0
      }
      if (t++, l) break
    }
    return s &&
      l &&
      (
        i.associd = o,
        i.flags = Utils2.SetFlag(i.flags, ConstantData.ObjFlags.SEDO_Assoc, !0)
      ),
      s &&
      l
  },
  SDF.ObjectIsExternalTextLabel = function (e, t, a, r, i) {
    var n = e.codes[t].data,
      o = ConstantData.Defines.SED_CDim;
    ConstantData.HookPts;
    t++;
    for (var s, l, S = !1, c = !1; e.codes[t].code != r;) {
      switch (e.codes[t].code) {
        case a.SDF_C_DRAWHOOK:
          if (
            s = e.codes[t].data,
            n.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioCallOut &&
            (l = !0),
            s.hookpt === ConstantData.HookPts.SED_KATD
          ) {
            if (S = !0, !l) {
              var u = GlobalData.optManager.GetObjectPtr(i.IDMap[s.objid], !1);
              if (
                u &&
                u.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE
              ) return !1
            }
          } else 0 === s.connecty &&
            0 === s.connectx ? (
              s.hookpt === ConstantData.HookPts.SED_KCR ||
              s.hookpt === ConstantData.HookPts.SED_KCB ||
              l
            ) &&
          (S = !0, c = !0) : s.connecty === o &&
          s.connectx === o &&
          (
            s.hookpt === ConstantData.HookPts.SED_KCL ||
            s.hookpt === ConstantData.HookPts.SED_KCT ||
            l
          ) &&
          (S = !0, c = !0);
          break;
        case a.SDF_C_DRAWTEXT:
          e.codes[t].data.textid >= 0 &&
            (c = !0);
          break;
        case a.SDF_C_LONGTEXT8:
        case a.SDF_C_LONGTEXT:
          c = !0
      }
      if (t++, c) break
    }
    return S &&
      c
  },
  SDF.GetLineText = function (e, t, a, r) {
    var i,
      n,
      o = - 1;
    for (n = e.lineswithtext.length, i = 0; i < n; i++) if (t === e.lineswithtext[i].x && (!a || a === e.lineswithtext[i].z)) return o = e.lineswithtext[i].y,
      r &&
      (
        r.TextGrow = e.lineswithtext[i].TextGrow,
        r.TextWrapWidth = e.lineswithtext[i].TextWrapWidth,
        r.TextAlign = e.lineswithtext[i].TextAlign,
        r.just = e.lineswithtext[i].just,
        r.vjust = e.lineswithtext[i].vjust,
        r.Paint = e.lineswithtext[i].Paint
      ),
      e.lineswithtext.splice(i, 1),
      o;
    return - 1
  },
  SDF.GetObjectParent = function (e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l;
    for (r = t.length, i = 0; i < r; i++) {
      if (a === (o = t[i])) return e;
      if (
        (n = GlobalData.optManager.GetObjectPtr(o, !1)) &&
        n.ShapeType === ConstantData.ShapeType.GROUPSYMBOL &&
        (
          l = e < 0 ? o : e,
          (s = SDF.GetObjectParent(l, n.ShapesInGroup, a)) >= 0
        )
      ) return s
    }
    return - 1
  },
  SDF.GetSVGFragmentFromCache = function (e) {
    var t,
      a,
      r;
    for (a = SDF.SVGFragments.length, t = 0; t < a; t++) if (e === (r = SDF.SVGFragments[t]).EMFHash) return r;
    return null
  },
  SDF.GetSVGFragment = function (e, t, a) {
    var r = function (e, r) {
      var i,
        n,
        o,
        s,
        l,
        S,
        c,
        u,
        p = [],
        d = [],
        D = [],
        g = [];
      if (e && 400 != r && 404 != r) {
        if (
          i = Utils2.arrayBufferToString(e),
          l = JSON.parse(i),
          t.InitialGroupBounds.width = l.width,
          t.InitialGroupBounds.height = l.height,
          t.SVGFragment = Utils1.DeepCopy(l.SVGFragment),
          null == t.BlockID
        ) {
          var h = Utils1.DeepCopy(t);
          SDUI.Commands.MainController.Symbols.StoreLMObject(a, h)
        } (S = SDF.GetSVGFragmentFromCache(a)) ? (p = S.objectIDs, S.fragment = l) : p.push(t.BlockID)
      } else l = {
        ID: a,
        width: t.Frame.width,
        height: t.Frame.height,
        SVGFragment: '<g width="' + t.Frame.width + '" height="' + t.Frame.height + '" transform="scale(1,1) translate(0,0)" style="-webkit-user-select: none; touch-action: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><g width="' + t.Frame.width + '" height="' + t.Frame.height + '" transform="scale(1,1) translate(0,0)" fill="none" stroke-opacity="1"><rect fill="#FFEEEE" stroke-opacity="1" stroke="#FF0000" stroke-width="1" width="' + t.Frame.width + '" height="' + t.Frame.height + '"/><path d="M0,0 L' + t.Frame.width + ',' + t.Frame.height + '" stroke="#FF0000" stroke-width="1" stroke-dasharray="none"/><path d="M0,' + t.Frame.height + ' L' + t.Frame.width + ',0" stroke="#FF0000" stroke-width="1" stroke-dasharray="none"/></g></g>'
      },
        t.InitialGroupBounds.width = l.width,
        t.InitialGroupBounds.height = l.height;
      for (o = p.length, n = 0; n < o; n++) if (s = p[n], null != (t = GlobalData.optManager.GetObjectPtr(s, !1))) {
        t.SVGFragment = Utils1.DeepCopy(l.SVGFragment),
          t.InitialGroupBounds.width = l.width,
          t.InitialGroupBounds.height = l.height,
          0 === t.StyleRecord.Line.Thickness &&
          (t.StyleRecord.Line.Thickness = 1);
        var m = GlobalData.optManager.GetAllBlockCopies(s);
        for (c = m.length, u = 0; u < c; u++) null == m[u].Data.SVGFragment &&
          (
            m[u].Data.SVGFragment = Utils1.DeepCopy(l.SVGFragment),
            0 === m[u].Data.StyleRecord.Line.Thickness &&
            (m[u].Data.StyleRecord.Line.Thickness = 1)
          );
        if (GlobalData.optManager.svgObjectLayer.FindElement(s)) {
          var C,
            y = GlobalData.optManager.VisibleZList(),
            f = GlobalData.optManager.ActiveVisibleZList(),
            L = (y.length, y.indexOf(s)),
            I = f.indexOf(s);
          L < 0 ? (C = SDF.GetObjectParent(- 1, y, s)) >= 0 &&
            (L = y.indexOf(C), I = f.indexOf(C)) : C = y[L],
            - 1 != L &&
            (
              GlobalData.optManager.currentModalOperation == ListManager.ModalOperations.STAMP ||
                GlobalData.optManager.currentModalOperation == ListManager.ModalOperations.DRAGDROP ? (
                GlobalData.optManager.AddSVGObject(L, C, !0, !1),
                y[L] == GlobalData.optManager.theActionStoredObjectID &&
                (
                  GlobalData.optManager.theActionSVGObject = GlobalData.optManager.svgObjectLayer.GetElementByID(GlobalData.optManager.theActionStoredObjectID)
                )
              ) : d.indexOf(C) < 0 &&
              (d.push(C), D.push(L), g.push(I >= 0))
            )
        }
      }
      for (c = d.length, u = 0; u < c; u++) GlobalData.optManager.AddSVGObject(D[u], d[u], !0, g[u]);
      S &&
        (S.objectIDs = []),
        SDF.FragmentLoad_RefCount = Math.max(0, SDF.FragmentLoad_RefCount - 1)
    },
      i = SDF.GetSVGFragmentFromCache(a);
    if (i) i.fragment ? (
      t.SVGFragment = Utils1.DeepCopy(i.fragment.SVGFragment),
      t.InitialGroupBounds.width = i.fragment.width,
      t.InitialGroupBounds.height = i.fragment.height,
      0 === t.StyleRecord.Line.Thickness &&
      (t.StyleRecord.Line.Thickness = 1)
    ) : i.objectIDs.push(t.BlockID);
    else {
      Constants.FilePath_FindHashSVGColor,
        t.EMFHash;
      if (!1 === e.isSymbol) {
        var n = new SDF.SVGFragmentRecord(a, null);
        n.objectIDs.push(t.BlockID),
          SDF.SVGFragments.push(n)
      }
      if (!1 === e.AllowAddEMFHash) SDF.FragmentLoad_RefCount++,
        SDUI.CMSContent.GetSymbolSVGColorByHash(SDUI.AppSettings.ContentSource, t.EMFHash, r);
      else {
        var o = SDUI.CMSContent.GetSymbolSVGColorByHash(SDUI.AppSettings.ContentSource, t.EMFHash);
        o &&
          (SDF.FragmentLoad_RefCount++, r(o, 0))
      }
    }
  },
  SDF.GetPNG = function (e, t, a) {
    var r = function (e, r) {
      var i,
        n,
        o,
        s,
        l,
        S = [];
      if (e && 400 != r && 404 != r) {
        for (
          i = new Uint8Array(e),
          (n = SDF.GetSVGFragmentFromCache(a)) ? (S = n.objectIDs, n.fragment = i) : S.push(t.BlockID),
          s = S.length,
          o = 0;
          o < s;
          o++
        ) {
          l = S[o],
            (t = GlobalData.optManager.GetObjectPtr(l, !1)).SetBlobBytes(Utils1.DeepCopy(i), FileParser.Image_Dir.dir_png);
          var c,
            u,
            p = GlobalData.optManager.GetAllBlockCopies(l);
          for (c = p.length, u = 0; u < c; u++) null == p[u].Data.BlobBytes &&
            p[u].Data.BlockID != l &&
            p[u].Data.SetBlobBytes(Utils1.DeepCopy(i), FileParser.Image_Dir.dir_png)
        }
        n &&
          (n.objectIDs = []),
          SDF.FragmentLoad_RefCount = Math.max(0, SDF.FragmentLoad_RefCount - 1)
      } else SDF.FragmentLoad_RefCount = Math.max(0, SDF.FragmentLoad_RefCount - 1)
    },
      i = SDF.GetSVGFragmentFromCache(a);
    if (i) i.fragment ? t.SetBlobBytes(
      Utils1.DeepCopy(i.fragment),
      FileParser.Image_Dir.dir_png
    ) : i.objectIDs.push(t.BlockID);
    else {
      Constants.FilePath_HashPNG,
        t.EMFHash;
      if (!1 === e.isSymbol) {
        var n = new SDF.SVGFragmentRecord(a, null);
        n.objectIDs.push(t.BlockID),
          SDF.SVGFragments.push(n)
      }
      if (!1 === e.AllowAddEMFHash) SDF.FragmentLoad_RefCount++,
        SDUI.CMSContent.GetSymbolPNGByHash(SDUI.AppSettings.ContentSource, t.EMFHash, r);
      else {
        var o = SDUI.CMSContent.GetSymbolPNGByHash(SDUI.AppSettings.ContentSource, t.EMFHash);
        o &&
          (SDF.FragmentLoad_RefCount++, r(o, 0))
      }
    }
  },
  SDF.ReadObject = function (e, t, a, r, i) {
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
      A = !1,
      _ = !0,
      E = !1,
      w = a.sdp,
      F = a.tLMB,
      v = !1,
      G = !1;
    if (
      a.ValidateHashesAsync &&
      (
        e.codes[t].data.UsePNG &&
        (A = !0),
        e.codes[t].data.HasSVG ||
        (_ = !1),
        u = e.codes[t].data.EMFHash
      ),
      e.codes[t].data.objclass === ConstantData.ShapeClass.MISSINGEMF &&
      (E = !0),
      o = SDF.ObjectIsGroup(a, e, t, r, i),
      p = (
        e.codes[t].data.colorfilter & FileParser.SDRColorFilters.SD_NOCOLOR_ALL
      ) === FileParser.SDRColorFilters.SD_NOCOLOR_ALL,
      o ||
      p ||
      A ||
      (d = SDF.ObjectIsSymbol(a, e, t, r, i)),
      e.codes[t].data.otype === FileParser.ObjectTypes.SED_Shape &&
      (
        0 == (
          e.codes[t].data.moreflags & ConstantData.ObjMoreFlags.SED_MF_ContainerChild
        ) &&
        SDF.ObjectIsConnectorTextLabel(e, t, r, i) ||
        (
          e.codes[t].data.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT_LABEL ||
            e.codes[t].data.objecttype === ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY ||
            e.codes[t].data.objecttype === ConstantData.ObjectTypes.SD_OBJT_MANUAL_EVENT_LABEL ? m = !0 : (m = SDF.ObjectIsExternalTextLabel(e, t, r, i, a)) &&
            0 === e.codes[t].data.objecttype &&
          (
            e.codes[t].data.objecttype = ConstantData.ObjectTypes.SD_OBJT_MANUAL_EVENT_LABEL
          )
        )
      ),
      !(
        n = SDF.ReadObjectHeader(
          w,
          F,
          e.codes[t].data,
          a,
          o,
          d,
          m,
          i != FileParser.SDROpCodesByName.SDF_C_DRAWOBJ_END
        )
      )
    ) {
      for (
        // SDUI.Builder &&
        SDUI.Builder.gInTemplateValidator &&
        SDUI.Builder.gTemplateValidatorReadError(
          'SDF.ReadObject SDF.ReadObjectHeader returned a null obj'
        );
        e.codes[++t].code != i;
      );
      return t
    }
    if (a.LineTextObject) {
      if (a.textonline < 0) return - 1;
      a.objectcount = e.codes[t].data.uniqueid,
        a.IDMap[e.codes[t].data.uniqueid] = - 2,
        a.LineTextObject = !1
    } else {
      if (!a.ReadBlocks || a.BlockzList.indexOf(n.UniqueID) >= 0) {
        var N = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT, n);
        n = N.Data,
          a.zList.push(N.ID),
          a.objectcount = n.UniqueID,
          a.IDMap[n.UniqueID] = N.ID
      }
      n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
        (
          b = {},
          (c = SDF.GetLineText(a, a.objectcount, null, b)) >= 0 &&
          (
            n.DataID = c,
            a.IsVisio &&
            (n.TextAlign = b.TextAlign, n.just = b.just, n.vjust = b.vjust),
            b.TextGrow === ConstantData.TextGrowBehavior.VERTICAL &&
            (n.TextGrow = b.TextGrow, n.TextWrapWidth = b.TextWrapWidth),
            b.Paint &&
            (n.StyleRecord.Fill.Paint = b.Paint)
          )
        )
    }
    for (t++, n && u && (n.EMFHash = u); e.codes[t].code != i;) {
      switch (e.codes[t].code) {
        case r.SDF_C_SDDATABLOCK:
        case r.SDF_C_SDDATA64:
          break;
        case r.SDF_C_DRAWSEGL:
          if (SDF.ReadSegl(n, e.codes[t].data, a)) return - 1;
          break;
        case r.SDF_C_DRAWPOLY:
          if ((t = SDF.ReadPolyLine(n, e, t, a, r)) < 0) return t;
          break;
        case r.SDF_C_FREEHANDLINE:
          if (SDF.ReadFreehand(n, e.codes[t].data, a)) return - 1;
          break;
        case r.SDF_C_DRAWARRAY:
          if ((t = SDF.ReadArrayList(n, e, t, a, r)) < 0) return t;
          break;
        case r.SDF_C_DRAWCONTAINER:
          if ((t = SDF.ReadContainerList(n, e, t, a, r)) < 0) return t;
          break;
        case r.SDF_C_DRAWHOOK:
          SDF.ReadHook(n, e.codes[t].data, a);
          break;
        case r.SDF_C_BEGIN_STYLE:
          t = SDF.ReadStyle(n.StyleRecord, e, t, a, r);
          break;
        case r.SDF_C_BEGIN_LINE:
          t = SDF.ReadSDLine(n.StyleRecord.Line, e, t, a, r);
          break;
        case r.SDF_C_BEGIN_FILL:
          t = SDF.ReadSDFill(n.StyleRecord.Fill, e, t, a, r);
          break;
        case r.SDF_C_BEGIN_TEXTF:
          t = SDF.ReadSDTxf(n.StyleRecord.Text, e, t, a, r);
          break;
        case r.SDF_C_OUTSIDE:
          n.StyleRecord.OutsideEffect = SDF.ReadOutSide(e.codes[t].data, a.IsVisio);
          break;
        case r.SDF_C_DRAWARROW:
          if (a.error = SDF.ReadArrow(n, e.codes[t].data), a.error) return - 1;
          break;
        case r.SDF_C_CONNECTPOINT:
          SDF.ReadConnectPoints(n, e.codes[t].data);
          break;
        case r.SDF_C_DRAWTEXT:
          SDF.ReadTextParams(n, e.codes[t].data, a),
            n.DrawingObjectBaseClass !== ConstantData.DrawingObjectBaseClass.LINE &&
            n.DrawingObjectBaseClass !== ConstantData.DrawingObjectBaseClass.CONNECTOR ||
            (
              n.TextDirection = 0 == (n.TextFlags & ConstantData.TextFlags.SED_TF_HorizText),
              b &&
              b.TextGrow &&
              (n.TextGrow = b.TextGrow, n.TextWrapWidth = b.TextWrapWidth)
            );
          break;
        case r.SDF_C_LONGTEXT8:
        case r.SDF_C_LONGTEXT:
        case r.SDF_C_TEXT:
          if (a.textonline >= 0) if (a.textonline < a.objectcount) {
            if ((S = a.IDMap[a.textonline]) >= 0) if (
              (l = GlobalData.optManager.GetObjectPtr(S, !1)) &&
              l.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR
            ) l = n;
            else {
              if (
                l &&
                l.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE
              ) {
                if (
                  a.IsVisio &&
                  (
                    l.vjust = n.vjust,
                    l.just = n.just,
                    l.TextAlign = n.TextAlign,
                    0 == (
                      n.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioDefaultText
                    ) &&
                    l.CalcTextPosition(n)
                  ),
                  l.StyleRecord.Fill.Paint = $.extend(!0, {
                  }, n.StyleRecord.Fill.Paint),
                  l.TextDirection = 0 == (l.TextFlags & ConstantData.TextFlags.SED_TF_HorizText),
                  a.IsVisio &&
                  l.TextDirection
                ) {
                  var k = l.GetAngle(null);
                  l.LineType === ConstantData.LineType.LINE ? (
                    l.VisioRotationDiff = n.RotationAngle,
                    n.RotationAngle = k + l.VisioRotationDiff
                  ) : l.VisioRotationDiff = k - n.RotationAngle,
                    0 != n.RotationAngle ||
                    Utils2.IsEqual(k, 0) ||
                    (
                      l.TextFlags = Utils2.SetFlag(l.TextFlags, ConstantData.TextFlags.SED_TF_HorizText, !0),
                      l.TextDirection = !1
                    ),
                    l.VisioRotationDiff %= 180,
                    Math.abs(l.VisioRotationDiff) < 1 &&
                    (l.VisioRotationDiff = 0)
                }
                if (n.TextGrow === ConstantData.TextGrowBehavior.VERTICAL) if (l.LineTextX) l.TextGrow = ConstantData.TextGrowBehavior.VERTICAL,
                  l.trect = $.extend(!0, {
                  }, n.trect);
                else {
                  l.TextGrow = ConstantData.TextGrowBehavior.VERTICAL,
                    l.TextWrapWidth = n.trect.width,
                    M = l.Frame.width,
                    P = l.Frame.height;
                  var U = Utils2.sqrt(M * M + P * P) - 40;
                  U < ConstantData.Defines.SED_MinDim &&
                    (U = ConstantData.Defines.SED_MinDim),
                    l.TextWrapWidth > U &&
                    (l.TextWrapWidth = U),
                    a.IsVisio &&
                    n.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioDefaultText &&
                    (l.TextWrapWidth = U)
                } else l.TextGrow = ConstantData.TextGrowBehavior.HORIZONTAL
              }
              a.textonline = - 1
            }
          } else l = n;
          else l = n;
          t = SDF.ReadText(l, null, null, e, t, a, r, !1, r.SDF_C_TEXT_END),
            a.textonline >= 0 &&
            (
              a.lineswithtext.push({
                x: a.textonline,
                y: n.DataID,
                z: a.textonlineid,
                TextGrow: n.TextGrow,
                TextWrapWidth: n.trect.width,
                just: n.just,
                vjust: n.vjust,
                TextAlign: n.TextAlign,
                RotationAngle: n.RotationAngle,
                Paint: $.extend(!0, {
                }, n.StyleRecord.Fill.Paint)
              }),
              a.textonline = - 1,
              a.textonlineid = - 1
            ),
            n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
            (
              n.TextFlags & ConstantData.TextFlags.SED_TF_AttachB &&
              (
                n.TextFlags = Utils2.SetFlag(n.TextFlags, ConstantData.TextFlags.SED_TF_AttachB, !1),
                n.TextFlags = Utils2.SetFlag(n.TextFlags, ConstantData.TextFlags.SED_TF_None, !0)
              ),
              n.TextFlags & ConstantData.TextFlags.SED_TF_AttachA &&
              (
                n.TextFlags = Utils2.SetFlag(n.TextFlags, ConstantData.TextFlags.SED_TF_AttachA, !1),
                n.TextFlags = Utils2.SetFlag(n.TextFlags, ConstantData.TextFlags.SED_TF_None, !0)
              )
            );
          break;
        case r.SDF_C_NATIVESTORAGE:
          if (o) {
            if (SDF.ReadGroup(n, e.codes[t].data, a)) return - 1
          } else if (G) break;
          break;
        case r.SDF_C_NATIVEID:
          (D = e.codes[t].data.nativeid) >= 0 &&
            (a.nativeids[D] = n.BlockID);
          break;
        case r.SDF_C_TABLEID:
          (y = e.codes[t].data.value) >= 0 &&
            (
              n.TableID = a.tableids[y],
              a.usedtableids[y] = !0,
              null == n.TableID &&
              (n.TableID = - 1),
              n.TableID >= 0 &&
              (n.DataID = - 1)
            );
          break;
        case r.SDF_C_GRAPHID:
          (f = e.codes[t].data.value) >= 0 &&
            (
              n.GraphID = a.graphids[f],
              a.usedgraphids[f] = !0,
              null == n.GraphID &&
              (n.GraphID = - 1),
              n.GraphID >= 0 &&
              (n.DataID = - 1)
            );
          break;
        case r.SDF_C_EXPANDEDVIEWID:
          (I = e.codes[t].data.value) >= 0 &&
            (
              n.ExpandedViewID = a.expandedviewids[I],
              a.expandedviewids[I] = !0,
              null == n.ExpandedViewID &&
              (n.ExpandedViewID = - 1)
            );
          break;
        case r.SDF_C_GANTTINFOID:
          (L = e.codes[t].data.value) >= 0 &&
            (
              n.GanttInfoID = a.ganttids[L],
              a.usedganttids[L] = !0,
              null == n.GanttInfoID &&
              (n.GanttInfoID = - 1),
              n.GanttInfoID >= 0 &&
              (n.DataID = - 1)
            );
          break;
        case r.SDF_C_OBJDATA:
          n.datasetType = e.codes[t].data.datasetType,
            n.datasetID = e.codes[t].data.datasetID,
            n.datasetTableID = e.codes[t].data.datasetTableID,
            n.datasetElemID = e.codes[t].data.datasetElemID,
            void 0 !== e.codes[t].data.fieldDataElemID ? (
              n.fieldDataElemID = e.codes[t].data.fieldDataElemID,
              n.fieldDataTableID = e.codes[t].data.fieldDataTableID,
              n.fieldDataDatasetID = e.codes[t].data.fieldDataDatasetID
            ) : n.datasetType == ListManager.DataSetNameListIndexes.DATASET_FIELDEDDATA ? (
              n.fieldDataElemID = n.datasetElemID,
              n.fieldDataTableID = n.datasetTableID,
              n.fieldDataDatasetID = n.datasetID,
              n.datasetType = - 1,
              n.datasetID = - 1,
              n.datasetTableID = - 1,
              n.datasetElemID = - 1
            ) : (
              n.fieldDataElemID = - 1,
              n.fieldDataTableID = - 1,
              n.fieldDataDatasetID = - 1
            );
          break;
        case r.SDF_C_DRAWJUMP:
          n.HyperlinkText = e.codes[t].data.name;
          break;
        case r.SDF_C_BUSINESSNAME_STR:
          n.BusinessName = e.codes[t].data.name;
          break;
        case r.SDF_C_IMAGEURL:
          n.ImageURL = e.codes[t].data.name;
          break;
        case r.SDF_C_DRAWIMAGE8:
          (s = new ListManager.ImageRecord).mr = e.codes[t].data.mr,
            s.croprect = e.codes[t].data.croprect,
            s.scale = e.codes[t].data.scale,
            s.imageflags = e.codes[t].data.imageflags,
            e.codes[t].data.iconid &&
            (s.iconid = e.codes[t].data.iconid),
            n.ImageHeader = s;
          break;
        case r.SDF_C_OLEHEADER:
          (C = new ListManager.OleHeader).dva = e.codes[t].data.dva,
            C.linked = e.codes[t].data.linked,
            C.scale = e.codes[t].data.scale,
            n.OleHeader = C;
          break;
        case r.SDF_C_EMFID:
        case r.SDF_C_IMAGEID:
        case r.SDF_C_OLESTORAGEID:
          SDF.ReadImageID(n, null, e.codes[t].data, a, E);
          break;
        case r.SDF_C_SVGFRAGMENTID:
          n.SVGFragment = e.codes[t].data.name;
          break;
        case r.SDF_C_SVGIMAGEID:
          n.ImageID = e.codes[t].data.name,
            n.ImageDir = FileParser.Image_Dir.dir_svg,
            n.ImageURL = Constants.FilePath_SymbolSVG + n.ImageID + '.svg';
          break;
        case r.SDF_C_EMFHASH:
          n.EMFHash = e.codes[t].data.name,
            n.ShapeType === ConstantData.ShapeType.SVGFRAGMENTSYMBOL &&
              null == n.SVGFragment ? SDF.GetSVGFragment(a, n, n.EMFHash) : (
              n.SymbolURL = Constants.FilePath_HashSVG + n.EMFHash,
              n.SymbolURL = n.SymbolURL + '.svg'
            );
          break;
        case r.SDF_C_DRAWJPG:
          n.ImageURL = e.codes[t].data.URL,
            n.SetBlobBytes(e.codes[t].data.BlobBytes, FileParser.Image_Dir.dir_jpg);
          break;
        case r.SDF_C_DRAWPNG:
        case r.SDF_C_DRAWPREVIEWPNG:
          n.ImageURL = e.codes[t].data.URL,
            n.SetBlobBytes(e.codes[t].data.BlobBytes, FileParser.Image_Dir.dir_png);
          break;
        case r.SDF_C_OLESTORAGE:
          n.SetOleBlobBytes(
            e.codes[t].data.BlobBytes,
            FileParser.Image_Dir.dir_store
          );
          break;
        case r.SDF_C_DRAWSVG:
          n.ImageURL = e.codes[t].data.URL;
          var J = e.codes[t].data.BlobBytes;
          n.SetBlobBytes(J, FileParser.Image_Dir.dir_svg),
            n.SVGDim = Utils2.ParseSVGDimensions(J);
          break;
        case r.SDF_C_DRAWMETA:
          if (!o) {
            if (!a.AddEMFHash || A || a.ValidateHashesAsync) A &&
              null == (T = n.EMFHash) &&
              (T = e.codes[t].data.EMFHash);
            else if (null == (T = n.EMFHash) && (T = e.codes[t].data.EMFHash), T) {
              Constants.FilePath_FindHashPNG;
              A = null != SDUI.CMSContent.GetSymbolPNGByHash(SDUI.AppSettings.ContentSource, T)
            }
            if (A && T) {
              n.ImageURL = Constants.FilePath_HashPNG + T + '.png',
                G = !0,
                SDF.GetPNG(a, n, T);
              break
            }
            null == n.EMFHash &&
              a.AddEMFHash &&
              e.codes[t].data.EMFHash &&
              (n.EMFHash = e.codes[t].data.EMFHash, v = !0),
              n.EMFHash &&
              n.EMFHash.length &&
              (
                n.ShapeType === ConstantData.ShapeType.SVGFRAGMENTSYMBOL ? null == n.SVGFragment &&
                  v &&
                  SDF.GetSVGFragment(a, n, n.EMFHash) : _ ? (
                    n.SymbolURL = Constants.FilePath_HashSVG + n.EMFHash,
                    n.SymbolURL = n.SymbolURL + '.svg'
                  ) : (
                  n.ImageURL = Constants.FilePath_RSRC + Constants.MissingImage,
                  n.ImageURL = n.ImageURL + '.svg',
                  n.SVGDim.width = Constants.MissingImageDim.width,
                  n.SVGDim.height = Constants.MissingImageDim.height
                ),
                // SDUI.Builder &&
                (
                  SDUI.Builder.bBuilderRunning ? n.ShapeType != ConstantData.ShapeType.SVGFRAGMENTSYMBOL ? SDUI.Builder.CheckSymbolURL('\\Symbols\\Hashes\\SVG\\' + n.EMFHash.toUpperCase() + '.svg') : SDUI.Builder.CheckSymbolURL(
                    '\\Symbols\\Hashes\\SVGColor\\' + n.EMFHash.toUpperCase() + '.svg'
                  ) : SDUI.Builder.gInTemplateValidator &&
                  n.ShapeType != ConstantData.ShapeType.SVGFRAGMENTSYMBOL &&
                  SDUI.Builder.gCheckSymbolURL('\\Symbols\\Hashes\\SVG\\' + n.EMFHash.toUpperCase() + '.svg')
                )
              )
          }
          break;
        case r.SDF_C_COMMENT:
          a.ReadBlocks ||
            a.ReadGroupBlock ? t++ : t = SDF.ReadText(n, null, null, e, t, a, r, !0, r.SDF_C_COMMENT_END);
          break;
        case r.SDF_C_NATIVEEMBEDSTORAGE:
        case r.SDF_C_MARKUP:
          break;
        case r.SDF_C_DRAWOBJ5:
          SDF.ReadObj5(n, e.codes[t].data, a);
          break;
        case r.SDF_C_DRAWOBJ6:
          SDF.ReadDraw6(n, e.codes[t].data, a);
          break;
        case r.SDF_C_DRAWOBJ7:
          SDF.ReadObj7(n, e.codes[t].data, a);
          break;
        case r.SDF_C_DRAWBORDER:
          SDF.ReadBorder(n, e.codes[t].data, a);
          break;
        case r.SDF_C_DRAWLINE:
          SDF.Readv6Line(n, e.codes[t].data, a);
          break;
        case r.SDF_C_DRAWFILL:
          SDF.Readv6Fill(n, e.codes[t].data);
          break;
        case r.SDF_C_TABLE:
          g = new ListManager.Table,
            n.SetTable(g),
            t = SDF.ReadTable(g, e, t, a, r, r.SDF_C_TABLE_END);
          break;
        case r.SDF_C_TABLEVP:
          g = new ListManager.Table,
            n.SetTable(g),
            t = SDF.ReadTable(g, e, t, a, r, r.SDF_C_TABLEVP_END);
          break;
        case r.SDF_C_GRAPH:
          h = new ListManager.Graph,
            n.SetGraph(h),
            t = SDF.ReadGraph(h, e, t, a, r, r.SDF_C_GRAPH_END);
          break;
        case r.SDF_C_EXPANDEDVIEW:
          R = GlobalData.objectStore.CreateBlock(
            ConstantData.StoredObjectType.EXPANDEDVIEW_OBJECT,
            e.codes[t].data.svg
          ),
            n.ExpandedViewID = R.ID;
          break;
        case r.SDF_C_GANTTINFO:
          theGanttInfo = new ListManager.Table.GanttInfo,
            n.SetGanttInfo(theGanttInfo),
            SDF.ReadGanttInfo(theGanttInfo, e.codes[t].data, a);
          break;
        case r.SDF_C_D3SETTINGS:
          n.ImportD3Settings &&
            n.ImportD3Settings(e.codes[t].data.settings);
          break;
        default:
          e.codes[t].code & SDF.SDF_BEGIN &&
            (
              t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      t++
    }
    return n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
      (
        n.TextFlags & ConstantData.TextFlags.SED_TF_AttachB ||
        n.TextFlags & ConstantData.TextFlags.SED_TF_AttachA
      ) &&
      (c = SDF.GetLineText(a, a.objectcount, null, null)) >= 0 &&
      (n.DataID = c),
      t
  },
  SDF.SetCurvature = function (e, t, a) {
    !e.isSymbol &&
      (e.isTemplate || SDUI.Builder) &&
      e.PVersion < SDF.SDF_PVERSION864 &&
      (
        a ? t.curveparam = 100 * ConstantData.Defines.DefFixedRRect : (
          t.shapeparam = ConstantData.Defines.DefFixedRRect,
          t.moreflags = Utils2.SetFlag(t.moreflags, ConstantData.ObjMoreFlags.SED_MF_FixedRR, !0)
        )
      )
  },
  SDF.DefaultObject = function (e, t) {
    t.StyleRecord = new QuickStyle(),// new Resources.QuickStyle,
      t.just = e.def.just,
      t.vjust = e.def.vjust,
      t.TextGrow = e.def.textgrow,
      t.ObjGrow = ConstantData.GrowBehavior.ALL,
      t.TextDirection = !0,
      t.TextFlags = 0,
      t.TextFlags = Utils2.SetFlag(
        t.TextFlags,
        ConstantData.TextFlags.SED_TF_FormCR,
        (e.def.textflags & ConstantData.TextFlags.SED_TF_FormCR) > 0
      ),
      t.TMargins = $.extend(!0, {
      }, e.def.tmargins)
  },
  SDF.ReadHook = function (e, t, a) {
    var r,
      i,
      n = {};
    e.hooks &&
      e.hooks.length < e.maxhooks &&
      (
        void 0 !== t.lconnectx ? (n.x = t.lconnectx, n.y = t.lconnecty) : (n.x = t.connectx, n.y = t.connecty),
        (i = null == t.cellid ? null : t.cellid) === ConstantData.Defines.SED_DNULL &&
        (i = null),
        4294967295 == i &&
        (i = null),
        r = new Hook(t.objid, i, - 1, t.hookpt, n),
        e.hooks.push(r)
      )
  },
  SDF.ReadImageID = function (e, t, a, r, i) {
    var n,
      o = a.blobbytesid,
      s = null;
    n = e,
      t &&
      (n = t);
    var l = r.imageids[o];
    if (l && (s = l.id), null != s) switch ((t || void 0 !== e.BlockID) && (r.usedimageids[o] = !0), a.imagedir) {
      case FileParser.Image_Dir.dir_jpg:
      case FileParser.Image_Dir.dir_png:
      case FileParser.Image_Dir.dir_svg:
        n.BlobBytesID = s,
          n.ImageURL = r.imageids[o].url;
        break;
      case FileParser.Image_Dir.dir_meta:
        n.EMFBlobBytesID = s,
          i ? (
            n.ImageURL = Constants.FilePath_RSRC + Constants.MissingImage,
            n.ImageURL = n.ImageURL + '.svg',
            n.SVGDim = {},
            n.SVGDim.width = Constants.MissingImageDim.width,
            n.SVGDim.height = Constants.MissingImageDim.height
          ) : n.EMFHash &&
          n.EMFHash.length &&
          (
            n.SymbolURL = Constants.FilePath_HashSVG + n.EMFHash + '.svg',
            r.usedimageids[o] = !1,
            n.EMFBlobBytesID = - 1
          );
        break;
      case FileParser.Image_Dir.dir_store:
        n.OleBlobBytesID = s
    }
  },
  SDF.ReadSegl = function (e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p;
    if (
      e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
      (
        e.LineType === ConstantData.LineType.SEGLINE ||
        e.LineType === ConstantData.LineType.ARCSEGLINE
      ) &&
      e.segl
    ) {
      for (
        t.lsegr ? (u = t.lsegr, p = t.llengths) : (u = t.segr, p = t.lengths),
        e.segl.firstdir = t.firstdir,
        e.segl.lastdir = t.lastdir,
        null == t.curveparam ? (e.segl.curveparam = 0, SDF.SetCurvature(a, e.segl, !0)) : e.segl.curveparam = t.curveparam,
        t.nsegs <= 0 &&
        (t.nsegs = 1),
        i = 0;
        i < t.nsegs;
        i++
      ) o = (s = u[i].left === u[i].right) ? u[i].bottom - u[i].top : u[i].right - u[i].left,
        0 === i ? (
          l = !1,
          t.nsegs > 1 &&
          (
            s ? u[i].top === u[i + 1].top &&
              (l = !0) : u[i].left === u[i + 1].left &&
            (l = !0)
          ),
          (n = new Point(0, 0)).x = SDF.ToSDJSCoords(u[i].left, a.coordScaleFactor),
          n.y = SDF.ToSDJSCoords(u[i].top, a.coordScaleFactor),
          (S = new Point(0, 0)).x = SDF.ToSDJSCoords(u[i].right, a.coordScaleFactor),
          S.y = SDF.ToSDJSCoords(u[i].bottom, a.coordScaleFactor),
          l ? (e.segl.pts.push(S), e.segl.pts.push(n)) : (e.segl.pts.push(n), e.segl.pts.push(S))
        ) : (
          n = new Point(0, 0),
          u[i].top === u[i - 1].top ? n.y = SDF.ToSDJSCoords(u[i].bottom, a.coordScaleFactor) : n.y = SDF.ToSDJSCoords(u[i].top, a.coordScaleFactor),
          u[i].left === u[i - 1].left ? n.x = SDF.ToSDJSCoords(u[i].right, a.coordScaleFactor) : n.x = SDF.ToSDJSCoords(u[i].left, a.coordScaleFactor),
          e.segl.pts.push(n)
        ),
        a.AddEMFHash &&
          4 == t.nsegs ? e.segl.lengths.push(SDF.ToSDJSCoords(o, a.coordScaleFactor)) : a.AddEMFHash &&
            5 == t.nsegs &&
            4 == i ? e.segl.lengths[2] = SDF.ToSDJSCoords(o, a.coordScaleFactor) : e.segl.lengths.push(SDF.ToSDJSCoords(p[i], a.coordScaleFactor));
      if (r = e.segl.pts.length, a.IsVisio) {
        if (l) {
          var d = Utils1.DeepCopy(e.segl);
          for (c = 0; c < r; c++) d.pts[r - 1 - c].x = e.segl.pts[c].x,
            d.pts[r - 1 - c].y = e.segl.pts[c].y;
          d.firstdir = e.segl.lastdir,
            d.lastdir = e.segl.firstdir,
            null == d.curveparam &&
            (d.curveparam = 0);
          e.segl.lengths.length;
          for (c = 0; c < r - 1; c++) Utils2.IsEqual(d.pts[c + 1].x, d.pts[c].x) ? d.lengths[c] = Math.abs(d.pts[c + 1].y - d.pts[c].y) : d.lengths[c] = Math.abs(d.pts[c + 1].x - d.pts[c].x);
          if (e.segl = d, e.segl.reversearrows = !0, e.hooks.length) for (c = 0; c < e.hooks.length; c++) switch (e.hooks[c].hookpt) {
            case ConstantData.HookPts.SED_KTL:
              e.hooks[c].hookpt = ConstantData.HookPts.SED_KTR;
              break;
            case ConstantData.HookPts.SED_KTR:
              e.hooks[c].hookpt = ConstantData.HookPts.SED_KTL
          }
        }
        e.StartPoint.x = e.Frame.x + e.segl.pts[0].x,
          e.StartPoint.y = e.Frame.y + e.segl.pts[0].y,
          e.EndPoint.x = e.Frame.x + e.segl.pts[r - 1].x,
          e.EndPoint.y = e.Frame.y + e.segl.pts[r - 1].y
      } else e.StartPoint.x = e.inside.x + e.segl.pts[0].x,
        e.StartPoint.y = e.inside.y + e.segl.pts[0].y,
        e.EndPoint.x = e.inside.x + e.segl.pts[r - 1].x,
        e.EndPoint.y = e.inside.y + e.segl.pts[r - 1].y,
        e.Frame = Utils1.DeepCopy(e.inside);
      return 0
    }
    return a.error = SDF.Errors.BadFormat,
      SDF.Errors.BadFormat
  },


  SDF.ReadFreehand = function (e, t, a) {
    if (
      e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
      e.LineType === ConstantData.LineType.FREEHAND &&
      e.pointlist
    ) {
      let a = {},
        r = {};
      if (t.pts && t.npts) {
        let i = t.pts.length;
        for (let n = 0; n < i; n++) {
          let i = t.pts[n],
            o = i.x,
            s = i.y;
          0 === n ? (
            a.x = o + e.Frame.x,
            a.y = s + e.Frame.y,
            o = 0,
            s = 0,
            delx = a.x - e.Frame.x,
            dely = a.y - e.Frame.y
          ) : (o -= delx, s -= dely),
            r.x = o + a.x,
            r.y = s + a.y;
          let l = {
            x: o,
            y: s
          };
          e.pointlist.push(l),
            e.StartPoint = a,
            e.EndPoint = r
        }
      }
      return 0
    }
  },
  SDF.ReadArrow = function (e, t) {
    if (
      e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.LINE ||
      e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.CONNECTOR
    ) {
      var a,
        r,
        i = ConstantData1.ArrowheadLookupTable.length;
      if (
        e.StartArrowID = t.sarrow & FileParser.ArrowMasks.ARROW_T_MASK,
        e.StartArrowDisp = !!(t.sarrow & FileParser.ArrowMasks.ARROW_DISP),
        (24 === e.StartArrowID || e.StartArrowID >= i) &&
        (e.StartArrowID = 0, e.StartArrowDisp = 0),
        e.EndArrowID = t.earrow & FileParser.ArrowMasks.ARROW_T_MASK,
        e.EndArrowDisp = !!(t.earrow & FileParser.ArrowMasks.ARROW_DISP),
        (24 === e.EndArrowID || e.EndArrowID >= i) &&
        (e.EndArrowID = 0, e.EndArrowDisp = 0),
        e.segl &&
        e.segl.reversearrows
      ) a = e.EndArrowID,
        r = e.EndArrowDisp,
        e.EndArrowID = e.StartArrowID,
        e.EndArrowDisp = e.StartArrowDisp,
        e.StartArrowID = a,
        e.StartArrowDisp = r;
      return e.ArrowSizeIndex = t.arrowsize,
        0
    }
    return 0
  },
  SDF.Int32PairToLargeInt = function (e, t) {
    var a = 4294967296 * t;
    return a += e
  }

SDF.LargeIntToInt32Pair = function (e) {
  for (var t = e.toString(2), a = '', r = 0; r < 64 - t.length; r++) a += '0';
  a += t;
  var i = parseInt(a.substring(0, 32), 2);
  return [parseInt(a.substring(32), 2),
    i]
},
  SDF.ReadGanttInfo = function (e, t, a) {
    e.timeScale = t.timeScale,
      e.flags = t.flags,
      e.configuredStart = SDF.Int32PairToLargeInt(t.configuredStart1, t.configuredStart2),
      e.configuredEnd = SDF.Int32PairToLargeInt(t.configuredEnd1, t.configuredEnd2),
      e.start = SDF.Int32PairToLargeInt(t.start1, t.start2),
      e.end = SDF.Int32PairToLargeInt(t.end1, t.end2),
      e.scrollStart = SDF.Int32PairToLargeInt(t.scrollStart1, t.scrollStart2),
      e.scrollEnd = SDF.Int32PairToLargeInt(t.scrollEnd1, t.scrollEnd2)
  },
  SDF.ReadBorder = function (e, t, a) {
    return e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.SHAPE ? (
      e.StyleRecord.Line.Thickness = SDF.ToSDJSCoords(t.bord, a.coordScaleFactor),
      t.bord > 0 &&
      0 === e.StyleRecord.Line.Thickness &&
      (e.StyleRecord.Line.Thickness = 1),
      SDF.WinLinePatternToJS(e.StyleRecord.Line, t.patindex),
      e.StyleRecord.Line.Paint.Color = SDF.WinColorToHTML(t.color),
      0
    ) : SDF.Errors.BadFormat
  },
  SDF.Readv6Line = function (e, t, a) {
    return e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.LINE ||
      e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.CONNECTOR ? (
      e.StyleRecord.Line.Thickness = SDF.ToSDJSCoords(t.bord, a.coordScaleFactor),
      t.bord > 0 &&
      0 === e.StyleRecord.Line.Thickness &&
      (e.StyleRecord.Line.Thickness = 1),
      SDF.WinLinePatternToJS(e.StyleRecord.Line, t.patindex),
      e.StyleRecord.Line.Paint.Color = SDF.WinColorToHTML(t.color),
      e.StartArrowID = t.sarrow & FileParser.ArrowMasks.ARROW_T_MASK,
      e.StartArrowDisp = !!(t.sarrow & FileParser.ArrowMasks.ARROW_DISP),
      24 === e.StartArrowID &&
      (e.StartArrowID = 0, e.StartArrowDisp = 0),
      e.EndArrowID = t.earrow & FileParser.ArrowMasks.ARROW_T_MASK,
      e.EndArrowDisp = !!(t.earrow & FileParser.ArrowMasks.ARROW_DISP),
      24 === e.EndArrowID &&
      (e.EndArrowID = 0, e.EndArrowDisp = 0),
      e.ArrowSizeIndex = t.arrowsize,
      0
    ) : SDF.Errors.BadFormat
  },
  SDF.Readv6Fill = function (e, t) {
    return e.StyleRecord.Fill.Paint.Color = SDF.WinColorToHTML(t.color),
      e.StyleRecord.Fill.Paint.EndColor = SDF.WinColorToHTML(t.ecolor),
      e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.SHAPE ? (
        t.fpatindex == FileParser.v6FillTypes.SEHollowIndex ? (
          e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
          t.gradientflags &&
          (
            e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_GRADIENT,
            e.StyleRecord.Fill.Paint.GradientFlags = t.gradientflags
          )
        ) : t.fpatindex == FileParser.v6FillTypes.SEOpaqueIndex ? t.gradientflags ? (
          e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_GRADIENT,
          e.StyleRecord.Fill.Paint.GradientFlags = t.gradientflags
        ) : t.color === ConstantData.Colors.Color_Trans ? (
          e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
          e.StyleRecord.Fill.Paint.Color = ConstantData.Colors.Color_White
        ) : e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID : (
          t.color == ConstantData.Colors.Color_Trans ? (
            e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
            e.StyleRecord.Fill.Paint.Color = ConstantData.Colors.Color_White
          ) : e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID,
          e.StyleRecord.Fill.Hatch = t.fpatindex
        ),
        0
      ) : SDF.Errors.BadFormat
  },
  SDF.ReadDraw6 = function (e, t, a) {
    if (
      e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.SHAPE &&
      e.ShapeType === ConstantData.ShapeType.GROUPSYMBOL
    ) {
      var r = SDF.ToSDJSRect(t.hgframe, a.coordScaleFactor);
      e.InitialGroupBounds = {},
        e.InitialGroupBounds.width = r.width,
        e.InitialGroupBounds.height = r.height,
        e.InitialGroupBounds.x = r.x,
        e.InitialGroupBounds.y = r.y
    }
    t.extraflags &&
      (e.extraflags = t.extraflags),
      e.Layer = t.layer,
      (e.Layer < 0 || e.Layer > a.tLMB.nlayers - 1) &&
      (e.Layer = 0)
  },
  SDF.ReadObj7 = function (e, t, a) {
    var r = Resources.Windows_LinePatterns;
    switch (t.bpatindex) {
      case r.SEP_FilledLine:
      case r.SEP_DoubleLine:
        e.StyleRecord.Line.Thickness = SDF.ToSDJSCoords(2 * t.dbthick, a.coordScaleFactor),
          e.StyleRecord.Line.LinePattern = 0
    }
    e.flags = t.flags,
      t.dimensions &&
      (e.Dimensions = t.dimensions)
  },
  SDF.ReadObj5 = function (e, t, a) {
    e.attachpoint.x = t.attachpoint_x,
      e.attachpoint.y = t.attachpoint_y,
      e.rleft = t.rleft,
      e.rtop = t.rtop,
      e.rright = t.rright,
      e.rbottom = t.rbottom,
      e.rwd = t.rwd,
      e.rht = t.rht,
      e.rflags = t.rflags
  },
  SDF.ReadConnectPoints = function (e, t) {
    var a,
      r,
      i;
    if (
      e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.SHAPE
    ) {
      for (a = t.nconnect, r = 0; r < a; r++) i = new Point(t.connect[r].x, t.connect[r].y),
        e.ConnectPoints.push(i);
      return 0
    }
    return SDF.Errors.BadFormat
  },
  SDF.SD_UpdateVisioGroupFrame = function (e, t, a) {
    var r,
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
      R = {},
      A = {},
      _ = {},
      E = {},
      w = {},
      F = {},
      v = ConstantData.Defines.SED_CDim,
      G = ConstantData.ExtraFlags,
      N = e.Frame.height,
      k = e.Frame.width;
    if (a) {
      var U = {};
      U.Frame = e.Frame,
        U.inside = U.Frame;
      // var J = new ListManager.PolyLine(U);
      // var J = new GlobalDataShape.PolyLine(U);
      var J = new Instance.Shape.PolyLine(U);
      J.polylist = e.polylist,
        J.StartPoint = e.StartPoint,
        J.EndPoint = e.EndPoint;
      var x = J.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, null);
      Utils2.GetPolyRect(R, x),
        s = R.height - e.Frame.height,
        Math.abs(s) < 0.1 &&
        (s = 0),
        o = R.width - e.Frame.width,
        Math.abs(o) < 0.1 &&
        (o = 0),
        n = 0,
        Math.abs(R.x) > 0.1 &&
        (n = R.x),
        i = 0,
        Math.abs(R.y) > 0.1 &&
        (i = R.y)
    } else {
      for (S = e.ShapesInGroup.length, r = 0; r < S; r++) 0 !== (m = GlobalData.optManager.GetObjectPtr(e.ShapesInGroup[r], !1)).RotationAngle ? (
        p = m.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !0, null),
        d = - m.RotationAngle / (180 / ConstantData.Geometry.PI),
        Utils3.RotatePointsAboutCenter(m.Frame, d, p),
        Utils2.GetPolyRect(A, p)
      ) : A = $.extend(!0, {
      }, m.Frame),
        0 == r ? R = $.extend(!0, {
        }, A) : Utils2.UnionRect(R, A, R);
      n = 0,
        n = R.x,
        i = 0,
        i = R.y,
        o = R.width - e.Frame.width,
        s = R.height - e.Frame.height
    }
    if (
      _.x = 0,
      _.y = 0,
      E.x = e.Frame.x + e.Frame.width / 2,
      E.y = e.Frame.y + e.Frame.height / 2,
      g = $.extend(!0, {
      }, e.Frame),
      (e.extraflags & G.SEDE_FlipVert || e.extraflags & G.SEDE_FlipHoriz) &&
      (
        h = $.extend(!0, {
        }, E),
        (D = $.extend(!0, {
        }, e.Frame)).x += n + _.x,
        D.y += i + _.y,
        D.width += o,
        D.height += s,
        w.x = D.x + D.width / 2,
        w.y = D.y + D.height / 2,
        e.extraflags & G.SEDE_FlipHoriz &&
        (F.x = h.x + 2 * (w.x - h.x), _.x -= F.x - h.x),
        e.extraflags & G.SEDE_FlipVert &&
        (F.y = h.y + 2 * (w.y - h.y), _.y -= F.y - h.y),
        (_.y || _.x) &&
        (
          e.Frame.x += _.x,
          e.Frame.y += _.y,
          e.inside.x += _.x,
          e.inside.y += _.y,
          e.r.x += _.x,
          e.r.y += _.y,
          e.trect.x += _.x,
          e.trect.y += _.y
        ),
        _.x = 0,
        _.y = 0
      ),
      e.RotationAngle &&
      (o || s || n || i)
    ) {
      h = $.extend(!0, {
      }, E),
        (D = $.extend(!0, {
        }, e.Frame)).x += n,
        D.y += i,
        D.width += o,
        D.height += s,
        w.x = D.x + D.width / 2,
        w.y = D.y + D.height / 2,
        T = h.x - w.x,
        b = h.y - w.y;
      var O = SDF.ToWinAngle(e.RotationAngle);
      f = Math.PI * O / 1800,
        L = Math.sin(f),
        I = Math.cos(f),
        w.x = h.x - (T * I + b * L),
        w.y = h.y - (- T * L + b * I),
        _.x = T + w.x - h.x,
        _.y = b + w.y - h.y
    }
    if (
      (n || i || _.y || _.x) &&
      (
        e.Frame.x += n + _.x,
        e.Frame.y += i + _.y,
        e.inside.x += n + _.x,
        e.inside.y += i + _.y,
        e.r.x += n + _.x,
        e.r.y += i + _.y,
        e.trect.x += n + _.x,
        e.trect.y += i + _.y
      ),
      a ||
      (
        e.InitialGroupBounds.x = e.Frame.x,
        e.InitialGroupBounds.y = e.Frame.y
      ),
      o &&
      (
        e.Frame.width += o,
        e.inside.width += o,
        e.r.width += o,
        e.trect.width += o,
        a ? e.polylist.dim.x &&
          (e.polylist.dim.x = e.Frame.width) : (
          e.InitialGroupBounds.width += o,
          e.InitialGroupBounds.width < 0 &&
          (e.InitialGroupBounds.width = 0)
        )
      ),
      s &&
      (
        e.Frame.height += s,
        e.inside.height += s,
        e.r.height += s,
        e.trect.height += s,
        a ? e.polylist.dim.y &&
          (e.polylist.dim.y = e.Frame.height) : (
          e.InitialGroupBounds.height += s,
          e.InitialGroupBounds.height < 0 &&
          (e.InitialGroupBounds.height = 0)
        )
      ),
      !a &&
      (n || i)
    ) for (n = - n, i = - i, r = 0; r < S; r++) (m = GlobalData.optManager.GetObjectPtr(e.ShapesInGroup[r], !1)).OffsetShape(n, i),
      // m instanceof ListManager.GroupSymbol &&
      // Double ===
      // m instanceof GlobalDataShape.GroupSymbol &&
      m instanceof Instance.Shape.GroupSymbol &&
      (m.InitialGroupBounds.x += n, m.InitialGroupBounds.y += i);
    w.x = e.Frame.x + e.Frame.width / 2,
      w.y = e.Frame.y + e.Frame.height / 2;
    var B = e.Frame.width;
    B <= 0 &&
      (B = k);
    var H = e.Frame.height;
    H <= 0 &&
      (H = N),
      (l = GlobalData.optManager.SD_GetVisioTextChild(e.BlockID)) >= 0 &&
      (
        0 !== (C = GlobalData.optManager.GetObjectPtr(l, !1)).hookdisp.x ||
          0 !== C.hookdisp.y ? (C.hookdisp.x -= w.x - E.x, C.hookdisp.y -= w.y - E.y) : (
          T = ((M = g.width * C.hooks[0].connect.x / v + g.x) - e.Frame.x) / B,
          C.hooks[0].connect.x = T * v,
          b = ((P = g.height * C.hooks[0].connect.y / v + g.y) - e.Frame.y) / H,
          C.hooks[0].connect.y = b * v,
          (T > 1 || b > 1) &&
          C.hooks[0].hookpt === ConstantData.HookPts.SED_KATD &&
          (
            C.hookdisp.x = M - w.x,
            C.hookdisp.y = P - w.y,
            C.hooks[0].connect.x = v / 2,
            C.hooks[0].connect.y = v / 2
          )
        )
      );
    var V = t.links;
    if (
      e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
    ) {
      if (
        0 == (e.flags & ConstantData.ObjFlags.SEDO_UseConnect) &&
        (
          e.flags = Utils2.SetFlag(e.flags, ConstantData.ObjFlags.SEDO_ContConn, !0)
        ),
        e.flags & ConstantData.ObjFlags.SEDO_UseConnect
      ) for (u = e.ConnectPoints.length, c = 0; c < u; c++) T = ((M = g.width * e.ConnectPoints[c].x / v + g.x) - e.Frame.x) / B,
        e.ConnectPoints[c].x = T * v,
        b = ((P = g.height * e.ConnectPoints[c].y / v + g.y) - e.Frame.y) / H,
        e.ConnectPoints[c].y = b * v;
      var j = GlobalData.optManager.FindLink(V, e.BlockID, !0);
      if (j >= 0) for (; j < V.length && V[j].targetid === e.BlockID;) {
        if (
          V[j].hookid !== l &&
          (y = GlobalData.optManager.GetObjectPtr(V[j].hookid, !1))
        ) for (u = y.hooks.length, c = 0; c < u; c++) y.hooks[c].objid === e.BlockID &&
          (
            T = ((M = g.width * y.hooks[c].connect.x / v + g.x) - e.Frame.x) / B,
            y.hooks[c].connect.x = T * v,
            b = ((P = g.height * y.hooks[c].connect.y / v + g.y) - e.Frame.y) / H,
            y.hooks[c].connect.y = b * v
          );
        j++
      }
    }
    return n ||
      i ||
      o ||
      s
  },


  SDF.ReadGroup = function (e, t, a) {
    var r,
      i,
      n,
      o = new SDF.Result;
    if (
      // o.sdp = new ListManager.SEDSession,
      o.sdp = new SEDSession(),
      o.sdp.def.style = Utils1.DeepCopy(a.sdp.def.style),
      // o.tLMB = new ListManager.LayersManager,
      o.tLMB = new LayersManager(),
      o.ReadingGroup = !0,
      o.imageids = a.imageids,
      o.usedimageids = a.usedimageids,
      o.RichGradients = a.RichGradients,
      o.IsVisio = a.IsVisio,
      o.PVersion = a.PVersion,
      o.FVersion = a.FVersion,
      gFmtTextObj = null,
      o.coordScaleFactor = a.coordScaleFactor * (e.Frame.width / e.InitialGroupBounds.width),
      (a.ReadBlocks || a.ReadGroupBlock) &&
      (
        o.textids = a.textids,
        o.usedtextids = a.usedtextids,
        o.noteids = a.noteids,
        o.usednoteids = a.usednoteids,
        o.tableids = a.tableids,
        o.graphids = a.graphids,
        o.expandedviewids = a.expandedviewids,
        o.ganttids = a.ganttids,
        o.usedtableids = a.usedtableids,
        o.usedgraphids = a.usedgraphids,
        o.usedexpandedviewids = a.usedexpandedviewids,
        o.usedganttids = a.usedganttids
      ),
      a.ReadBlocks ? (o.GroupOffset.x = 0, o.GroupOffset.y = 0, o.ReadGroupBlock = !0) : (
        o.GroupOffset.x = - e.InitialGroupBounds.x,
        o.GroupOffset.y = - e.InitialGroupBounds.y,
        o.ReadGroupBlock = a.ReadGroupBlock
      ),
      o.gHash = a.gHash,
      n = (a.ReadBlocks, 0),
      e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
      e.ShapeType === ConstantData.ShapeType.GROUPSYMBOL
    ) {
      if (t.groupcodelist) o.coordScaleFactor = GlobalData.docHandler.svgDoc.docInfo.docDpi / t.groupcodelist.codes[0].data.drawres,
        o.ValidateHashesAsync = !0,
        o.AddEMFHash = !0,
        SDF.ReadBuffer_Complete(t.groupcodelist, o, !0);
      else if (a.error = SDF.ReadBuffer(t.data, o, n, !0, null), a.error) return a.error === SDF.Errors.MinVersion &&
        (a.error = SDF.Errors.GroupVersion),
        a.error;
      for (e.ShapesInGroup = [], r = o.zList.length, i = 0; i < r; i++) e.ShapesInGroup.push(o.zList[i]);
      if (
        o.SDData &&
        ListManager.SDData.GetSDDataDatasetIDByName(
          o.SDData,
          ListManager.DataSetNameList[ListManager.DataSetNameListIndexes.DATASET_FIELDEDDATA]
        ) >= 0
      ) {
        var s = GlobalData.objectStore.GetObject(GlobalData.optManager.theContentHeader.SDDataID);
        if (a.SDData) if (s) {
          var l = s.Data.SDData;
          s.Data.SDData = a.SDData
        } else s = GlobalData.objectStore.CreateBlock(
          ConstantData.StoredObjectType.SDDATA_OBJECT,
          {
            SDData: a.SDData
          }
        ),
          GlobalData.optManager.theContentHeader.SDDataID = s.ID;
        GlobalData.optManager.SDData_Transfer(o.zList, o.SDData, !1),
          l &&
          (s.Data.SDData = l)
      }
      return e.ConvertToNative(o.RichGradients, !1),
        0
    }
    return SDF.Errors.BadFormat
  },
  SDF.ReadTableBlock = function (e, t, a) {
    var r = e.codes[t].data.value,
      i = new ListManager.Table,
      n = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.TABLE_OBJECT, i);
    return n ? (a.tableids[r] = n.ID, n.Data) : null
  },
  SDF.ReadGraphBlock = function (e, t, a) {
    var r = e.codes[t].data.value,
      i = new ListManager.Graph,
      n = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.GRAPH_OBJECT, i);
    return n ? (a.graphids[r] = n.ID, n.Data) : null
  },
  SDF.ReadExpandedViewBlock = function (e, t, a) {
    var r = e.codes[t].data.value,
      i = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.EXPANDEDVIEW_OBJECT, '');
    return i ? (a.expandedviewids[r] = i.ID, i) : null
  },
  SDF.ReadCommentBlock = function (e, t, a) {
    var r;
    if (
      null != (
        r = - 1 == e.codes[t].data.ObjectID ? - 1 : a.IDMap[e.codes[t].data.ObjectID]
      )
    ) {
      var i = new ListManager.CommentBlock;
      i.userID = e.codes[t].data.UserID,
        i.objectID = r,
        i.timestamp = e.codes[t].data.timestamp,
        i.comment = e.codes[t].data.comment,
        a.ThreadIDs.indexOf(i.userID) < 0 &&
        a.ThreadIDs.push(i.userID);
      var n = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.LM_COMMENT_BLOCK, i);
      if (n) {
        var o = a.Threads[r];
        return null == o &&
          (o = [], a.Threads[r] = o),
          o.push(n.ID),
          n
      }
    }
    return null
  },

  SDF.ReadImageBlock = function (e, t, a, r) {
    var i = new ListManager.BlobBytes(e.codes[t].data.imagedir, e.codes[t].data.bytes),
      n = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, i);
    if (n) {
      var o;
      if (
        e.codes[t].data.imagedir === FileParser.Image_Dir.dir_meta
      ) o = {
        id: n.ID,
        url: ''
      };
      else if (
        e.codes[t].data.imagedir === FileParser.Image_Dir.dir_store
      ) o = {
        id: n.ID,
        url: ''
      };
      else {
        var s = FileParser.GetImageBlobType(e.codes[t].data.imagedir),
          l = GlobalData.optManager.MakeURL(e.codes[t].data.data, null, s);
        o = {
          id: n.ID,
          url: l
        }
      }
      a.imageids[e.codes[t].data.imageid] = o
    }
  },
  SDF.ReadNativeBlock = function (e, t, a, r, i) {
    var n,
      o,
      s = e.codes[t].data.nativeid,
      l = a.nativeids[s];
    if (null == l || l < 0);
    else if (
      i &&
      (
        n = GlobalData.objectStore.CreateBlock(
          ConstantData.StoredObjectType.H_NATIVE_OBJECT,
          e.codes[t].data.bytes
        ),
        o = GlobalData.optManager.GetObjectPtr(l, !1)
      )
    ) {
      o.NativeID = n.ID;
      SDF.ReadGroup(o, e.codes[t].data, a)
    }
    return t
  },
  SDF.ReadTextBlock = function (e, t, a, r, i) {
    var n,
      o;
    e.codes[t].data.InstID,
      o = i ? r.SDF_C_COMMENT_END : r.SDF_C_TEXT_END;
    return n = new TextObject({
    }),
      i ? GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.LM_NOTES_OBJECT, n) : GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.LM_TEXT_OBJECT, n),
      t = SDF.ReadText(null, null, n, e, t, a, r, i, o)
  },
  SDF.ReadTextParams = function (e, t, a) {
    var r,
      i,
      n;
    if (
      r = t.ltrect ? t.ltrect : t.trect,
      e.trect = SDF.ToSDJSRect(r, a.coordScaleFactor),
      e.trect.x += a.GroupOffset.x,
      e.trect.y += a.GroupOffset.y,
      e.tindent.left = SDF.ToSDJSCoords(t.tindent.left, a.coordScaleFactor),
      e.tindent.top = SDF.ToSDJSCoords(t.tindent.top, a.coordScaleFactor),
      e.tindent.right = SDF.ToSDJSCoords(t.tindent.right, a.coordScaleFactor),
      e.tindent.bottom = SDF.ToSDJSCoords(t.tindent.bottom, a.coordScaleFactor),
      e.TMargins.left = SDF.ToSDJSCoords(t.tmargin.left, a.coordScaleFactor),
      e.TMargins.top = SDF.ToSDJSCoords(t.tmargin.top, a.coordScaleFactor),
      e.TMargins.right = SDF.ToSDJSCoords(t.tmargin.right, a.coordScaleFactor),
      e.TMargins.bottom = SDF.ToSDJSCoords(t.tmargin.bottom, a.coordScaleFactor),
      e.left_sindent = t.left_sindent,
      e.top_sindent = t.top_sindent,
      e.right_sindent = t.right_sindent,
      e.bottom_sindent = t.bottom_sindent,
      e.TextAlign = SDF.W32JustToTextAlign(t.just, t.vjust),
      e.TextFlags = t.textflags,
      e.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
      (
        e.TextFlags = Utils2.SetFlag(e.TextFlags, ConstantData.TextFlags.SED_TF_HorizText, !0)
      ),
      e.TextGrow = t.textgrow,
      t.textwrapwidth > 0 &&
      (
        e.TextWrapWidth = SDF.ToSDJSCoords(t.textwrapwidth, a.coordScaleFactor)
      ),
      void 0 !== t.linetextx &&
      (e.LineTextX = t.linetextx),
      void 0 !== t.linetexty &&
      (
        e.LineTextY = SDF.ToSDJSCoords(t.linetexty, a.coordScaleFactor)
      ),
      void 0 !== t.visiorotationdiff &&
      (e.VisioRotationDiff = t.visiorotationdiff / 10),
      e.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioLineTextLabel &&
        a.IsVisio ? e.RotationAngle = t.tangle / 10 : e.RotationAngle = SDF.ToSDJSAngle(t.tangle),
      a.ReadBlocks ||
      a.ReadGroupBlock
    ) {
      if (t.textid >= 0) {
        if (
          e.DataID = a.textids[t.textid],
          a.usedtextids[t.textid] = !0,
          a.textonline >= 0 &&
          a.textonline < a.objectcount &&
          (i = a.IDMap[a.textonline]) >= 0 &&
          (n = GlobalData.optManager.GetObjectPtr(i, !1))
        ) switch (n.DrawingObjectBaseClass) {
          case ConstantData.DrawingObjectBaseClass.CONNECTOR:
            break;
          case ConstantData.DrawingObjectBaseClass.SHAPE:
            n.DataID = e.DataID,
              e.DataID = - 1,
              e = n,
              a.textonline = - 1;
            break;
          default:
            n.DataID = e.DataID,
              e.DataID = - 1,
              e = n,
              n.TextDirection = 0 == (n.TextFlags & ConstantData.TextFlags.SED_TF_HorizText),
              a.textonline = - 1
        }
        var o = GlobalData.optManager.GetObjectPtr(e.DataID, !1);
        if (o) {
          var s = SDF.TextAlignToJust(e.TextAlign);
          GlobalData.optManager.SetTextAlignment(o, s.vjust, null)
        }
      }
      t.commentid >= 0 &&
        (
          e.NoteID = a.noteids[t.commentid],
          a.usednoteids[t.commentid] = !0
        )
    }
  },


  SDF.ReadText = function (e, t, a, r, i, n, o, s, l) {
    var gFmtTextObj;
    gFmtTextObj ||
      (
        gFmtTextObj = GlobalData.optManager.svgDoc.CreateShape(ConstantData.CreateShapeType.TEXT)
      );
    var S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m = {},
      C = [],
      y = [],
      f = [],
      L = [],
      I = [],
      T = 0,
      b = {};
    (
      m.font = n.DefRun.fontrec.fontName,
      m.type = n.DefRun.fontrec.fontType,
      m.size = SDF.PointSizeToFontSize(n.DefRun.fontrec.fontSize),
      m.weight = SDF.TextFaceToWeight(n.DefRun.fontrec.face),
      m.style = SDF.TextFaceToStyle(n.DefRun.fontrec.face),
      m.baseOffset = SDF.TextExtraToBaseLine(n.DefRun.extra),
      m.decoration = SDF.TextFaceToDecoration(n.DefRun.fontrec.face),
      m.color = n.DefRun.paint.Color,
      m.colorTrans = n.DefRun.paint.Opacity,
      m.spError = !1,
      gFmtTextObj.SetRenderingEnabled(!1),
      gFmtTextObj.SetText(''),
      gFmtTextObj.SetVerticalAlignment('middle'),
      c = r.codes[i].data.nstyles,
      D = n.DefTStyle.just,
      e
    ) &&
      (
        D = (
          h = s ? SDF.TextAlignToJust(ConstantData.TextAlign.LEFT) : SDF.TextAlignToJust(e.TextAlign)
        ).just,
        gFmtTextObj.SetVerticalAlignment(h.vjust)
      );
    for (
      a &&
      (
        s ? n.noteids[r.codes[i].data.InstID] = a.BlockID : n.textids[r.codes[i].data.InstID] = a.BlockID
      ),
      u = 0;
      u < c;
      u++
    ) (b = $.extend(!0, {
    }, n.DefTStyle)).just = D,
      y.push(b);
    for (i++, S = {
      curLinkIndex: - 1,
      run: []
    }; r.codes[i].code != l;) {
      switch (r.codes[i].code) {
        case o.SDF_C_OUTSIDE:
          SDF.ReadOutSide(r.codes[i].data, n.IsVisio);
          break;
        case o.SDF_C_TEXTCHAR:
          g = r.codes[i].data.text ? r.codes[i].data.text : ' ',
            gFmtTextObj.SetText(g, m),
            gFmtTextObj.SetParagraphAlignment(D),
            r.codes[i].data.text ||
            gFmtTextObj.SetText('');
          break;
        case o.SDF_C_TEXTRUN:
          SDF.ReadRuns(gFmtTextObj, r.codes[i].data, n, m, C, S, L);
          break;
        case o.SDF_C_TEXTSTYLE:
          if ((T = r.codes[i].data.index) < c) for (
            SDF.ReadTextStyle(y[T], r.codes[i].data, n),
            b = $.extend(!0, {
            }, y[T]),
            u = T;
            u < c;
            u++
          ) y[u] = $.extend(!0, {
          }, b);
          break;
        case o.SDF_C_TEXTLINK:
          f.push(r.codes[i].data.path);
          break;
        case o.SDF_C_TEXTDATA:
          I.push(r.codes[i].data.dataField);
          break;
        default:
          r.codes[i].code & SDF.SDF_BEGIN &&
            (
              i = SDF.ReadFrame(r, i, r.codes[i].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      i++
    }
    if (c) for (
      (!C.length || C[0].offset > 0) &&
      C.splice(0, 0, {
        pStyleIndex: 0,
        offset: 0
      }),
      p = C.length,
      u = 0;
      u < p;
      u++
    ) (d = C[u].pStyleIndex) >= 0 &&
      d < c &&
      gFmtTextObj.SetParagraphStyle(y[d], C[u].offset);
    for (u = 0; u < S.run.length; u++) S.run[u].linkIndex >= 0 &&
      S.run[u].linkIndex < f.length &&
      gFmtTextObj.SetHyperlink(f[S.run[u].linkIndex], S.run[u].offset, S.run[u].length);
    for (u = 0; u < L.length; u++) L[u].index >= 0 &&
      L[u].index < I.length &&
      gFmtTextObj.SetFormat({
        dataField: I[L[u].index]
      }, L[u].offset, L[u].length);
    gFmtTextObj.SetRenderingEnabled(!0);
    var M = gFmtTextObj.GetRuntimeText();
    if (S.run.length && (gFmtTextObj = null), !n.NoTextBlocks) if (t) {
      var P = new ListManager.BaseDrawingObject;
      s ? (P.SetNoteContent(M), t.NoteID = P.NoteID) : (P.SetTextContent(M), t.DataID = P.DataID)
    } else e ? s ? e.SetNoteContent(M) : e.SetTextContent(M) : a &&
      (a.runtimeText = M);
    return i
  },
  SDF.ReadRuns = function (e, t, a, r, i, n, o) {
    var s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g = e.GetTextLength();
    for (S = t.runs.length, l = 0; l < S; l++) {
      var h,
        m,
        C;
      if (h = t.runs[l].offset, m = l < S - 1 ? t.runs[l + 1].offset : g, !(h >= g)) {
        for (C = !1, c = t.runs[l].op.length, s = 0; s < c; s++) {
          var y = t.runs[l].op[s];
          switch (y.code) {
            case FileParser.TextStyleCodes.SDF_T_FONT:
              u = SDF.FontIDtoFontRec(y.value, a),
                r.font = u.fontName,
                r.type = u.fontType,
                C = !0;
              break;
            case FileParser.TextStyleCodes.SDF_T_SIZE:
              r.size = SDF.PointSizeToFontSize(y.value),
                C = !0;
              break;
            case FileParser.TextStyleCodes.SDF_T_SIZE_FLOAT:
              r.size = y.value,
                C = !0;
              break;
            case FileParser.TextStyleCodes.SDF_T_FACE:
              r.weight = SDF.TextFaceToWeight(y.value),
                r.style = SDF.TextFaceToStyle(y.value),
                r.decoration = SDF.TextFaceToDecoration(y.value),
                C = !0;
              break;
            case FileParser.TextStyleCodes.SDF_T_EXTRA:
              r.baseOffset = SDF.TextExtraToBaseLine(y.value),
                C = !0;
              break;
            case FileParser.TextStyleCodes.SDF_T_COLOR:
              r.color = SDF.WinColorToHTML(y.value),
                r.colorTrans = SDF.WinColorToAlpha(y.value),
                C = !0;
              break;
            case FileParser.TextStyleCodes.SDF_T_FLAGS:
              r.spError = 0 != (y.value & FileParser.TextFlags.TEN_F_BADSPELL),
                C = !0;
              break;
            case FileParser.TextStyleCodes.SDF_T_STYLEID:
              i.push({
                offset: h,
                pStyleIndex: y.value
              });
              break;
            case FileParser.TextStyleCodes.SDF_T_LINKID:
              p = FileParser.ToInt32(y.value),
                D = null,
                n.curLinkIndex >= 0 &&
                (D = n.run[n.run.length - 1]),
                D &&
                p != D.linkIndex &&
                (D.length = h - D.offset, D = null),
                !D &&
                p >= 0 &&
                n.run.push({
                  linkIndex: p,
                  offset: h,
                  length: g - h
                }),
                n.curLinkIndex = p;
              break;
            case FileParser.TextStyleCodes.SDF_T_DATAID:
              d = FileParser.ToInt32(y.value),
                D = null,
                o.length > 0 &&
                (D = o[o.length - 1]),
                D &&
                  d == D.index ? D.length = m - D.offset : o.push({
                    index: d,
                    offset: h,
                    length: m - h
                  })
          }
        }
        C &&
          e.SetFormat(r, h)
      }
    }
  },
  SDF.ReadTextStyle = function (e, t, a) {
    var r,
      i,
      n = FileParser.ParaStyleCodes;
    for (i = t.codes.length, r = 0; r < i; r++) switch (t.codes[r].code) {
      case n.SDF_S_JUST:
        e.just = SDF.W32JustToJS(t.codes[r].value, !1);
        break;
      case n.SDF_S_LEADING:
        e.leading = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
        break;
      case n.SDF_S_SPACING:
        t.codes[r].value < 0 ? e.spacing = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor) : e.spacing = t.codes[r].value / 100;
        break;
      case n.SDF_S_TRACKING:
        e.tracking = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
        break;
      case n.SDF_S_LINDENT:
        e.lindent = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
        break;
      case n.SDF_S_RINDENT:
        e.rindent = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
        break;
      case n.SDF_S_PINDENT:
        e.pindent = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
        break;
      case n.SDF_S_BINDENT:
        e.bindent = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
        break;
      case n.SDF_S_BULLET:
        e.bullet = SDF.W32BulletToJS(t.codes[r].value);
        break;
      case n.SDF_S_TABSPACE:
        e.tabspace = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
        break;
      case n.SDF_S_HYPHEN:
        e.hyphen = t.codes[r].value
    }
  },
  SDF.otypeToLineType = function (e, t, a) {
    var r = ConstantData.LineType.LINE;
    switch (e) {
      case FileParser.ObjectTypes.SED_LineD:
        r = a === ConstantData2.LineTypes.SED_LS_Chord ? ConstantData.LineType.ARCLINE : ConstantData.LineType.LINE;
        break;
      case FileParser.ObjectTypes.SED_SegL:
        r = ConstantData.LineType.ARCSEGLINE;
        break;
      case FileParser.ObjectTypes.SED_PolyL:
        r = ConstantData.LineType.PARABOLA;
        break;
      case FileParser.ObjectTypes.SED_NURBS:
        r = ConstantData.LineType.NURBS;
        break;
      case FileParser.ObjectTypes.SED_NURBSSEG:
        r = ConstantData.LineType.NURBSSEG;
        break;
      case FileParser.ObjectTypes.SED_ELLIPSE:
        r = ConstantData.LineType.ELLIPSE;
        break;
      case FileParser.ObjectTypes.SED_ELLIPSEEND:
        r = ConstantData.LineType.ELLIPSEEND;
        break;
      case FileParser.ObjectTypes.SED_QUADBEZ:
        r = ConstantData.LineType.QUADBEZ;
        break;
      case FileParser.ObjectTypes.SED_QUADBEZCON:
        r = ConstantData.LineType.QUADBEZCON;
        break;
      case FileParser.ObjectTypes.SED_CUBEBEZ:
        r = ConstantData.LineType.CUBEBEZ;
        break;
      case FileParser.ObjectTypes.SED_CUBEBEZCON:
        r = ConstantData.LineType.CUBEBEZCON;
        break;
      case FileParser.ObjectTypes.SED_SPLINE:
        r = ConstantData.LineType.SPLINE;
        break;
      case FileParser.ObjectTypes.SED_SPLINECON:
        r = ConstantData.LineType.SPLINECON;
        break;
      case FileParser.ObjectTypes.SED_MOVETO:
        r = ConstantData.LineType.MOVETO;
        break;
      case FileParser.ObjectTypes.SED_MOVETO_NEWPOLY:
        r = ConstantData.LineType.MOVETO_NEWPOLY
    }
    return r
  },
  SDF.LineTypetoWin32type = function (e, t, a, r, i, n) {
    var o = {
      otype: FileParser.ObjectTypes.SED_LineD,
      dataclass: t,
      ShortRef: a,
      param: r,
      weight: i
    };
    switch (e) {
      case ConstantData.LineType.ARCLINE:
        o.ShortRef = ConstantData2.LineTypes.SED_LS_Chord,
          o.param = SDF.ToSDJSCoords(r, n.coordScaleFactor);
        break;
      case ConstantData.LineType.SEGLINE:
        o.otype = ConstantData2.ObjectTypes.SED_SegL,
          o.dataclass = FileParser.SeglTypes.SED_L_Line;
        break;
      case ConstantData.LineType.ARCSEGLINE:
        o.otype = FileParser.ObjectTypes.SED_SegL,
          o.dataclass = FileParser.SeglTypes.SED_L_Arc;
        break;
      case ConstantData.LineType.PARABOLA:
        o.otype = FileParser.ObjectTypes.SED_PolyL,
          o.param = SDF.ToSDJSCoords(r, n.coordScaleFactor),
          o.ShortRef = SDF.ToSDJSCoords(a, n.coordScaleFactor);
        break;
      case ConstantData.LineType.NURBS:
        o.otype = FileParser.ObjectTypes.SED_NURBS;
        break;
      case ConstantData.LineType.NURBSSEG:
        o.otype = FileParser.ObjectTypes.SED_NURBSSEG;
        break;
      case ConstantData.LineType.ELLIPSE:
        o.otype = FileParser.ObjectTypes.SED_ELLIPSE;
        break;
      case ConstantData.LineType.ELLIPSEEND:
        o.otype = FileParser.ObjectTypes.SED_ELLIPSEEND;
        break;
      case ConstantData.LineType.QUADBEZ:
        o.otype = FileParser.ObjectTypes.SED_QUADBEZ;
        break;
      case ConstantData.LineType.QUADBEZCON:
        o.otype = FileParser.ObjectTypes.SED_QUADBEZCON;
        break;
      case ConstantData.LineType.CUBEBEZ:
        o.otype = FileParser.ObjectTypes.SED_CUBEBEZ;
        break;
      case ConstantData.LineType.CUBEBEZCON:
        o.otype = FileParser.ObjectTypes.SED_CUBEBEZCON;
        break;
      case ConstantData.LineType.SPLINE:
        o.otype = FileParser.ObjectTypes.SED_SPLINE;
        break;
      case ConstantData.LineType.SPLINECON:
        o.otype = FileParser.ObjectTypes.SED_SPLINECON;
        break;
      case ConstantData.LineType.MOVETO:
        o.otype = FileParser.ObjectTypes.SED_MOVETO;
        break;
      case ConstantData.LineType.MOVETO_NEWPOLY:
        o.otype = FileParser.ObjectTypes.SED_MOVETO_NEWPOLY
    }
    return o
  },
  SDF.BuildPolygonShape = function (e, t, a, r) {
    var i,
      n,
      o,
      s,
      l,
      S,
      c,
      u = {},
      p = [],
      d = {},
      D = ConstantData.PolyListFlags,
      g = ConstantData.LineType,
      h = ConstantData.PolySegFlags;
    u.Frame = e.Frame,
      u.inside = e.inside,
      // (i = new ListManager.PolyLine(u)).polylist = e.polylist,
      // (i = new GlobalDataShape.PolyLine(u)).polylist = e.polylist,
      (i = new Instance.Shape.PolyLine(u)).polylist = e.polylist,
      i.StartPoint = t,
      i.EndPoint = a;
    var m = [],
      C = !1,
      y = ConstantData.ObjMoreFlags.SED_MF_VisioPoly;
    e.moreflags & y &&
      (r = !0),
      r ||
      0 !== e.StyleRecord.Line.BThick ||
      (i.inside = i.Frame),
      o = (
        n = i.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, m)
      ).length;
    var f,
      L,
      I,
      T = [];
    if (
      e.polylist.flags & D.SD_PLF_HasMoveTo ||
      e.polylist.flags & D.SD_PLF_HasPolyPoly
    ) {
      var b = e.polylist.segs.length;
      for (
        C = !0,
        L = e.polylist.segs[0],
        f = new ListManager.PolyGeometry(
          (L.flags & h.SD_PLS_NoFill) > 0,
          (L.flags & h.SD_PLS_NoLine) > 0,
          !1,
          0,
          0
        ),
        I = e.polylist.segs[0],
        s = 1;
        s < b;
        s++
      ) switch ((L = e.polylist.segs[s]).LineType) {
        case g.MOVETO_NEWPOLY:
          f.NPoints = m[s - 1] - f.Offset,
            f.Closed = Utils2.EqualPt(e.polylist.segs[s - 1].pt, I.pt),
            T.push(f),
            f = new ListManager.PolyGeometry(
              (L.flags & h.SD_PLS_NoFill) > 0,
              (L.flags & h.SD_PLS_NoLine) > 0,
              !1,
              m[s - 1],
              0
            ),
            I = L;
          break;
        case g.MOVETO:
          f.MoveTo.push(m[s - 1] - f.Offset),
            s < b - 1 ? f.MoveTo.push(m[s] - f.Offset) : f.MoveTo.push(o - f.Offset)
      }
      L = e.polylist.segs[b - 1],
        f.NPoints = o - f.Offset,
        f.Closed = Utils2.EqualPt(L.pt, I.pt),
        T.push(f),
        e.Geometries = T
    }
    for (
      (S = e.Frame.width) < 0.1 &&
      (S = 1),
      (c = e.Frame.height) < 0.1 &&
      (c = 1),
      Utils2.GetPolyRect(d, n),
      r &&
      (
        d.x < 0 &&
        (d.x = 0),
        d.y < 0 &&
        (d.y = 0),
        d.x = 0,
        d.y = 0,
        e.moreflags = Utils2.SetFlag(e.moreflags, y, !0)
      ),
      s = 0;
      s < o;
      s++
    ) s > 0 &&
      !C &&
      n[s].x === n[s - 1].x &&
      n[s].y === n[s - 1].y ||
      (
        n[s].x -= d.x,
        n[s].y -= d.y,
        l = new Point(n[s].x / S, n[s].y / c),
        p.push(l)
      );
    e.VertexArray = p
  },
  SDF.ConvertToPolyL = function (e) {
    if (
      e.polylist &&
      0 == (
        e.polylist.flags & ConstantData.PolyListFlags.SD_PLF_FreeHand
      )
    ) {
      var t,
        a,
        r,
        i,
        n = ConstantData.LineType,
        o = ConstantData.ArcQuad,
        s = Math.PI;
      for (t = e.polylist.segs.length, a = 0; a < t; a++) switch (r = e.polylist.segs[a], i = e.polylist.segs[a - 1], r.LineType) {
        case n.ARCLINE:
          r.ShortRef === ConstantData2.LineTypes.SED_LS_Chord &&
            (r.param = - r.param);
          break;
        case n.ARCSEGLINE:
          if (a > 0) switch (r.ShortRef) {
            case o.SD_PLA_TR:
              r.pt.x > i.pt.x &&
                (r.param = s / 2, r.ShortRef = o.SD_PLA_TL);
              break;
            case o.SD_PLA_BR:
              r.pt.x > i.pt.x &&
                (r.param = - s / 2);
              break;
            case o.SD_PLA_TL:
              r.pt.x < i.pt.x &&
                (r.param = - s / 2);
              break;
            case o.SD_PLA_BL:
              r.pt.x < i.pt.x &&
                (r.param = s / 2)
          }
      }
      e.polylist.flag = Utils2.SetFlag(
        e.polylist.flags,
        ConstantData.PolyListFlags.SD_PLF_FreeHand,
        !0
      )
    }
  },
  SDF.ReadPolyLine = function (e, t, a, r, i) {
    var n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D = !0,
      g = !1,
      h = {
        x: 0,
        y: 0
      },
      m = {
        x: 0,
        y: 0
      };
    if (
      r.IsVisio &&
      (e.inside = Utils1.DeepCopy(e.Frame)),
      e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
      e.LineType !== ConstantData.LineType.POLYLINE &&
      (
        d = !0,
        null == e.polylist &&
        (e.polylist = new PolyList())
      ),
      e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
      e.ShapeType === ConstantData.ShapeType.POLYGON &&
      (
        g = !0,
        null == e.polylist &&
        (e.polylist = new PolyList())
      ),
      (
        e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
        e.LineType === ConstantData.LineType.POLYLINE ||
        g ||
        d
      ) &&
      e.polylist
    ) {
      for (
        t.codes[a].data.flags ? e.polylist.flags = t.codes[a].data.flags : e.polylist.flags = 0,
        t.codes[a].data.ldim ? (
          e.polylist.dim.x = SDF.ToSDJSCoords(t.codes[a].data.ldim.x, r.coordScaleFactor),
          e.polylist.dim.y = SDF.ToSDJSCoords(t.codes[a].data.ldim.y, r.coordScaleFactor)
        ) : (
          e.polylist.dim.x = SDF.ToSDJSCoords(t.codes[a].data.dim.x, r.coordScaleFactor),
          e.polylist.dim.y = SDF.ToSDJSCoords(t.codes[a].data.dim.y, r.coordScaleFactor)
        ),
        a++;
        t.codes[a].code != FileParser.SDROpCodesByName.SDF_C_DRAWPOLY_END;
      ) {
        switch (t.codes[a].code) {
          case i.SDF_C_DRAWPOLYSEG:
            switch (
            l = t.codes[a].data,
            n = SDF.ToSDJSCoords(l.lpt.x, r.coordScaleFactor, !0),
            o = SDF.ToSDJSCoords(l.lpt.y, r.coordScaleFactor, !0),
            D ? (
              h.x = n + e.Frame.x,
              h.y = o + e.Frame.y,
              n = 0,
              o = 0,
              D = !1,
              S = h.x - e.Frame.x,
              c = h.y - e.Frame.y
            ) : (n -= S, o -= c),
            m.x = n + h.x,
            m.y = o + h.y,
            (
              s = new PolySeg(SDF.otypeToLineType(l.otype, l.dataclass, l.ShortRef), n, o)
            ).dataclass = l.dataclass,
            0 === (p = e.polylist.segs.length) &&
            (s.LineType = ConstantData.LineType.LINE),
            s.LineType
            ) {
              case ConstantData.LineType.PARABOLA:
                s.param = SDF.ToSDJSCoords(l.param, r.coordScaleFactor, !0),
                  s.ShortRef = SDF.ToSDJSCoords(l.ShortRef, r.coordScaleFactor, !0);
                break;
              case ConstantData.LineType.NURBS:
              case ConstantData.LineType.NURBSSEG:
              case ConstantData.LineType.ELLIPSE:
              case ConstantData.LineType.ELLIPSEEND:
              case ConstantData.LineType.QUADBEZ:
              case ConstantData.LineType.QUADBEZCON:
              case ConstantData.LineType.CUBEBEZ:
              case ConstantData.LineType.CUBEBEZCON:
              case ConstantData.LineType.SPLINE:
              case ConstantData.LineType.SPLINECON:
                s.param = l.param,
                  s.ShortRef = l.ShortRef,
                  s.weight = l.weight,
                  s.dataclass = l.dataclass,
                  r.VisioFileVersion = !0;
                break;
              case ConstantData.LineType.ARCLINE:
                s.param = SDF.ToSDJSCoords(l.param, r.coordScaleFactor, !0),
                  s.ShortRef = l.ShortRef,
                  p = e.polylist.segs.length,
                  Math.abs(s.pt.y - e.polylist.segs[p - 1].pt.y) < 1 / 6 &&
                  s.pt.x < e.polylist.segs[p - 1].pt.x &&
                  (s.param = - s.param);
                break;
              case ConstantData.LineType.MOVETO:
                e.polylist.flags = Utils2.SetFlag(
                  e.polylist.flags,
                  ConstantData.PolyListFlags.SD_PLF_HasMoveTo,
                  !0
                ),
                  s.param = l.param,
                  s.ShortRef = l.ShortRef,
                  r.VisioFileVersion = !0;
                break;
              case ConstantData.LineType.MOVETO_NEWPOLY:
                e.polylist.flags = Utils2.SetFlag(
                  e.polylist.flags,
                  ConstantData.PolyListFlags.SD_PLF_HasPolyPoly,
                  !0
                ),
                  s.param = l.param,
                  s.ShortRef = l.ShortRef,
                  g = !0,
                  r.VisioFileVersion = !0;
                break;
              default:
                s.param = l.param,
                  s.ShortRef = l.ShortRef
            }
            s.dimDeflection = SDF.ToSDJSCoords(l.dimDeflection, r.coordScaleFactor, !0),
              l.flags ? s.flags = l.flags : s.flags = 0,
              e.polylist.segs.push(s);
            break;
          case i.SDF_C_POLYSEGEXPLICITPOINTS:
            for (
              l = t.codes[a].data,
              e.polylist.flags = Utils2.SetFlag(
                e.polylist.flags,
                ConstantData.PolyListFlags.SD_PLF_WasExplict,
                !0
              ),
              u = 0;
              u < l.npts;
              u++
            ) n = SDF.ToSDJSCoords(l.pt[u].x, r.coordScaleFactor, !0),
              o = SDF.ToSDJSCoords(l.pt[u].y, r.coordScaleFactor, !0),
              D ? (
                h.x = n + e.Frame.x,
                h.y = o + e.Frame.y,
                n = 0,
                o = 0,
                D = !1,
                S = h.x - e.Frame.x,
                c = h.y - e.Frame.y
              ) : (n -= S, o -= c),
              m.x = n + h.x,
              m.y = o + h.y,
              (
                s = new PolySeg(ConstantData.LineType.LINE, n, o)
              ).dataclass = 0,
              s.ShortRef = 0,
              s.param = 0,
              s.dimDeflection = 0,
              s.flags = 0,
              e.polylist.segs.push(s);
            break;
          default:
            t.codes[a].code & SDF.SDF_BEGIN &&
              (
                a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
              )
        }
        a++
      }
      if (
        0 == (
          e.polylist.flags & ConstantData.PolyListFlags.SD_PLF_FreeHand
        ) &&
        SDF.ConvertToPolyL(e),
        (g || Math.abs(h.x - m.x) < 0.001 && Math.abs(h.y - m.y) < 0.001) &&
        (e.polylist.closed = !0),
        r.IsVisio
      ) {
        var C = ConstantData.ExtraFlags;
        e.extraflags & (C.SEDE_FlipHoriz | C.SEDE_FlipVert) &&
          (
            g ? (
              e.StartPoint = h,
              e.EndPoint = m,
              e.polylist.offset.x = h.x - e.Frame.x,
              e.polylist.offset.y = h.y - e.Frame.y,
              e.Flip(e.extraflags, !0),
              h = e.StartPoint,
              m = e.EndPoint
            ) : (
              e.StartPoint = h,
              e.EndPoint = m,
              e.Flip(e.extraflags, !0),
              h = e.StartPoint,
              m = e.EndPoint
            ),
            e.extraflags = Utils2.SetFlag(e.extraflags, C.SEDE_FlipHoriz, !1),
            e.extraflags = Utils2.SetFlag(e.extraflags, C.SEDE_FlipVert, !1)
          ),
          e.StartPoint = h,
          e.EndPoint = m,
          g &&
          (
            e.polylist.offset.x = h.x - e.Frame.x,
            e.polylist.offset.y = h.y - e.Frame.y
          ),
          h = e.StartPoint,
          m = e.EndPoint
      }
      g ? (
        SDF.BuildPolygonShape(e, h, m, r.IsVisio),
        e.StartPoint = h,
        e.EndPoint = m,
        e.polylist.offset.x = h.x - e.Frame.x,
        e.polylist.offset.y = h.y - e.Frame.y
      ) : (e.StartPoint = h, e.EndPoint = m)
    } else r.error = SDF.Errors.BadFormat,
      a = - 1;
    return a
  },



  SDF.ReadArrayList = function (e, t, a, r, i) {
    var n,
      o,
      s,
      l,
      S,
      c = 0,
      u = 0,
      p = 0,
      d = ConstantData.ConnectorDefines.SEDA_NSkip,
      D = ConstantData.SEDA_Styles,
      g = ConstantData.HookPts,
      h = ConstantData.ConnectorDefines;
    if (
      e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
      e.arraylist
    ) {
      for (
        e.arraylist.styleflags = t.codes[a].data.styleflags,
        e.arraylist.angle = t.codes[a].data.angle,
        e.arraylist.tilt = t.codes[a].data.tilt,
        null != t.codes[a].data.curveparam ? e.arraylist.curveparam = t.codes[a].data.curveparam : SDF.SetCurvature(r, e.arraylist, !0),
        null == t.codes[a].data.lwd ? (
          e.arraylist.wd = SDF.ToSDJSCoords(t.codes[a].data.wd, r.coordScaleFactor),
          e.arraylist.wd = 25,
          e.arraylist.ht = SDF.ToSDJSCoords(t.codes[a].data.ht, r.coordScaleFactor)
        ) : (
          e.arraylist.wd = SDF.ToSDJSCoords(t.codes[a].data.lwd, r.coordScaleFactor),
          e.arraylist.ht = SDF.ToSDJSCoords(t.codes[a].data.lht, r.coordScaleFactor)
        ),
        e.arraylist.hook.length = 0,
        0,
        e.arraylist.styleflags & D.SEDA_Linear,
        s = (e.arraylist.styleflags & D.SEDA_Radial) > 0,
        l = e.arraylist.styleflags & D.SEDA_BothSides ||
        0 == (e.arraylist.styleflags & D.SEDA_PerpConn),
        S = e.arraylist.styleflags & D.SEDA_FlowConn &&
        e.arraylist.styleflags & D.SEDA_Linear,
        a++;
        t.codes[a].code != FileParser.SDROpCodesByName.SDF_C_DRAWARRAY_END;
      ) {
        switch (t.codes[a].code) {
          case i.SDF_C_DRAWARRAYHOOK:
            (n = new SEDAHook()).id = t.codes[a].data.uniqueid,
              null == t.codes[a].data.extra ? n.extra = 0 : n.extra = SDF.ToSDJSCoords(t.codes[a].data.extra, r.coordScaleFactor),
              null == t.codes[a].data.lgap ? n.gap = SDF.ToSDJSCoords(t.codes[a].data.gap, r.coordScaleFactor) : n.gap = SDF.ToSDJSCoords(t.codes[a].data.lgap, r.coordScaleFactor),
              r.AddEMFHash &&
              S &&
              (
                1 !== e.arraylist.hook.length &&
                2 !== e.arraylist.hook.length ||
                (n.gap += n.extra)
              ),
              (
                o = t.codes[a].data.lliner ? SDF.ToSDJSRect(t.codes[a].data.lliner, r.coordScaleFactor) : SDF.ToSDJSRect(t.codes[a].data.liner, r.coordScaleFactor)
              ).left = o.x,
              o.right = o.x + o.width,
              o.top = o.y,
              o.bottom = o.y + o.height,
              e.vertical ? Utils2.IsEqual(o.left, o.right) ? (
                0 === c &&
                (e.StartPoint.y += o.top, u = e.StartPoint.y - e.Frame.y),
                c++,
                o.top -= u,
                o.bottom -= u,
                n.startpoint.v = o.left,
                n.endpoint.v = o.left,
                n.startpoint.h = o.top,
                n.endpoint.h = o.bottom
              ) : (
                o.top -= u,
                o.bottom -= u,
                e.arraylist.hook.length >= d &&
                (p = e.arraylist.hook[1].startpoint.h),
                Utils2.IsEqual(o.left, 0) ? s &&
                  Utils2.IsEqual(o.bottom, p) ? (
                  n.startpoint.v = o.left,
                  n.endpoint.v = o.right,
                  n.startpoint.h = o.bottom,
                  n.endpoint.h = o.top
                ) : (
                  n.startpoint.v = o.left,
                  n.endpoint.v = o.right,
                  n.startpoint.h = o.top,
                  n.endpoint.h = o.bottom
                ) : s &&
                  Utils2.IsEqual(o.bottom, p) ? (
                  n.endpoint.v = o.left,
                  n.startpoint.v = o.right,
                  n.startpoint.h = o.bottom,
                  n.endpoint.h = o.top
                ) : (
                  n.endpoint.v = o.left,
                  n.startpoint.v = o.right,
                  n.startpoint.h = o.top,
                  n.endpoint.h = o.bottom
                )
              ) : Utils2.IsEqual(o.top, o.bottom) ? (
                0 === c &&
                (e.StartPoint.x += o.left, u = e.StartPoint.x - e.Frame.x),
                c++,
                o.left -= u,
                o.right -= u,
                n.startpoint.v = o.top,
                n.endpoint.v = o.top,
                n.startpoint.h = o.left,
                n.endpoint.h = o.right
              ) : (
                o.left -= u,
                o.right -= u,
                e.arraylist.hook.length >= d &&
                (p = e.arraylist.hook[1].startpoint.h),
                Utils2.IsEqual(o.top, 0) ? s &&
                  Utils2.IsEqual(o.right, p) ? (
                  n.startpoint.v = o.top,
                  n.endpoint.v = o.bottom,
                  n.startpoint.h = o.right,
                  n.endpoint.h = o.left
                ) : (
                  n.startpoint.v = o.top,
                  n.endpoint.v = o.bottom,
                  n.startpoint.h = o.left,
                  n.endpoint.h = o.right
                ) : s &&
                  Utils2.IsEqual(o.right, p) ? (
                  n.endpoint.v = o.top,
                  n.startpoint.v = o.bottom,
                  n.startpoint.h = o.right,
                  n.endpoint.h = o.left
                ) : (
                  n.endpoint.v = o.top,
                  n.startpoint.v = o.bottom,
                  n.startpoint.h = o.left,
                  n.endpoint.h = o.right
                )
              ),
              e.arraylist.hook.push(n);
            break;
          case i.SDF_C_DRAWARRAYTEXT:
            n &&
              (
                r.ReadBlocks ||
                  r.ReadGroupBlock ? t.codes[a].data.tuniqueid >= 0 &&
                (
                  n.textid = r.textids[t.codes[a].data.tuniqueid],
                  r.usedtextids[t.codes[a].data.tuniqueid] = !0,
                  r.PVersion < SDF.SDF_PVERSION859 &&
                  e.SetTextObject(- 2)
                ) : n.textid = t.codes[a].data.tuniqueid
              );
            break;
          default:
            t.codes[a].code & SDF.SDF_BEGIN &&
              (
                a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
              )
        }
        a++
      }
      e.vertical &&
        l &&
        !S &&
        0 === e.arraylist.angle &&
        e.hooks.length &&
        (e.hooks[0].hookpt === g.SED_LR || e.hooks[0].hookpt === g.SED_LB) &&
        (
          e.hooks[0].hookpt === g.SED_LR ? e.hooks[0].hookpt = g.SED_LL : e.hooks[0].hookpt = g.SED_LT,
          e.arraylist.styleflags = Utils2.SetFlag(e.arraylist.styleflags, D.SEDA_ReverseCol, !0),
          e.arraylist.hook.length >= d &&
          (
            e.arraylist.hook[h.A_Cl].gap = e.arraylist.hook[h.A_Cr].gap,
            e.arraylist.hook[h.A_Cr].gap = 0
          )
        ),
        S &&
        e.hooks.length &&
        e.arraylist.hook.length >= d &&
        (
          e.hooks[0].hookpt !== g.SED_LL &&
          e.hooks[0].hookpt !== g.SED_LT ||
          e.arraylist.hook[h.A_Cl].gap !== e.arraylist.wd &&
          (
            e.arraylist.flags = ConstantData.Array_Flags.Array_LeaveA_Cl
          ),
          e.hooks[0].hookpt !== g.SED_LR &&
          e.hooks[0].hookpt !== g.SED_LB ||
          e.arraylist.hook[h.A_Cl].gap !== e.arraylist.wd &&
          (
            e.arraylist.flags = ConstantData.Array_Flags.Array_LeaveA_Cr
          )
        )
    } else r.error = SDF.Errors.BadFormat,
      a = - 1;
    return a
  },
  SDF.ReadContainerList = function (e, t, a, r, i) {
    if (e.ContainerList) {
      var n,
        o = e.ContainerList;
      for (
        o.Arrangement = t.codes[a].data.Arrangement,
        o.HorizontalSpacing = t.codes[a].data.HorizontalSpacing,
        o.VerticalSpacing = t.codes[a].data.VerticalSpacing,
        o.AlignH = t.codes[a].data.AlignH,
        o.AlignV = t.codes[a].data.AlignV,
        o.Wrap = t.codes[a].data.Wrap,
        o.height = t.codes[a].data.height,
        o.width = t.codes[a].data.width,
        o.MinWidth = t.codes[a].data.MinWidth,
        o.MinHeight = t.codes[a].data.MinHeight,
        o.flags = t.codes[a].data.flags,
        o.nacross = t.codes[a].data.nacross,
        o.ndown = t.codes[a].data.ndown,
        o.childwidth = t.codes[a].data.childwidth,
        o.childheight = t.codes[a].data.childheight,
        a++;
        t.codes[a].code != FileParser.SDROpCodesByName.SDF_C_DRAWCONTAINER_END;
      ) {
        if (t.codes[a].code === i.SDF_C_DRAWCONTAINERHOOK) (n = new ContainerListShape()).id = t.codes[a].data.id,
          n.pt.x = t.codes[a].data.x,
          n.pt.y = t.codes[a].data.y,
          null != t.codes[a].data.extra &&
          (n.extra = t.codes[a].data.extra),
          o.List.push(n);
        a++
      }
    }
    return a
  },
  SDF.CreateLineObject = function (e, t, a) {
    // debugger
    var r,
      i;
    switch (
    e.StartPoint = {},
    e.EndPoint = {},
    i = t.lfixedpoint ? SDF.ToSDJSCoords(t.lfixedpoint, a.coordScaleFactor) : SDF.ToSDJSCoords(t.fixedpoint, a.coordScaleFactor),
    t.dataclass
    ) {
      case FileParser.LineSubclass.SED_LCH:
        a.GroupOffset.y &&
          (i += a.GroupOffset.y),
          e.StartPoint.x = e.Frame.x,
          e.StartPoint.y = i,
          e.EndPoint.x = e.Frame.x + e.Frame.width,
          e.EndPoint.y = i;
        break;
      case FileParser.LineSubclass.SED_LCD:
        t.flags & ConstantData.ObjFlags.SEDO_Obj1 ? (
          e.StartPoint.x = e.Frame.x,
          e.StartPoint.y = e.Frame.y + e.Frame.height,
          e.EndPoint.x = e.Frame.x + e.Frame.width,
          e.EndPoint.y = e.Frame.y,
          t.flags = Utils2.SetFlag(t.flags, ConstantData.ObjFlags.SEDO_Obj1, !1)
        ) : (
          e.StartPoint.x = e.Frame.x,
          e.StartPoint.y = e.Frame.y,
          e.EndPoint.x = e.Frame.x + e.Frame.width,
          e.EndPoint.y = e.Frame.y + e.Frame.height
        );
        break;
      case FileParser.LineSubclass.SED_LCV:
        a.GroupOffset.x &&
          (i += a.GroupOffset.x),
          e.StartPoint.y = e.Frame.y,
          e.StartPoint.x = i,
          e.EndPoint.y = e.Frame.y + e.Frame.height,
          e.EndPoint.x = i
    }
    switch (t.ShortRef) {
      case ConstantData2.LineTypes.SED_LS_None:
      case ConstantData2.LineTypes.SED_LS_Comm:
      case ConstantData2.LineTypes.SED_LS_Digi:
      case ConstantData2.LineTypes.SED_LS_Wall:
      case ConstantData2.LineTypes.SED_LS_MeasuringTape:
        e.ShortRef = t.ShortRef,
          // r = new ListManager.Line(e);
          // r = new GlobalDataShape.Line(e);
          r = new Instance.Shape.Line(e);
        break;
      case ConstantData2.LineTypes.SED_LS_Chord:
        e.CurveAdjust = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          t.dataclass === ConstantData2.LineSubclass.SED_LCV &&
          (e.CurveAdjust = - e.CurveAdjust),
          e.CurveAdjust < 0 &&
          (e.IsReversed = !0, e.CurveAdjust = - e.CurveAdjust),
          // r = new ListManager.ArcLine(e)
          // r = new GlobalDataShape.ArcLine(e)
          r = new Instance.Shape.ArcLine(e)
    }
    return r
  },
  SDF.CreateShapeObject = function (e, t, a, r) {
    // debugger
    var i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p;
    switch (l = e.shapeparam, S = e.Frame.width, c = e.Frame.height, t.dataclass) {
      case ConstantData.SDRShapeTypes.SED_S_Rect:
        SDF.SetCurvature(a, e, !1);
      case ConstantData.SDRShapeTypes.SED_S_Oval:
      case ConstantData.SDRShapeTypes.SED_S_Circ:
      case ConstantData.SDRShapeTypes.SED_S_RRect:
        i = t.dataclass;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Poly:
        i = ConstantData.SDRShapeTypes.SED_S_Poly;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Diam:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          // n = ListManager.PolygonShapeGenerator.SED_S_Diam(e.Frame, 0);
          n = PolygonShapeGenerator.SED_S_Diam(e.Frame, 0);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Tri:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          // n = ListManager.PolygonShapeGenerator.SED_S_Tri(e.Frame, 0);
          n = PolygonShapeGenerator.SED_S_Tri(e.Frame, 0);
        break;
      case ConstantData.SDRShapeTypes.SED_S_TriB:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          // n = ListManager.PolygonShapeGenerator.SED_S_TriB(e.Frame, 0);
          n = PolygonShapeGenerator.SED_S_TriB(e.Frame, 0);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Pgm:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          // n = ListManager.PolygonShapeGenerator.SED_S_Pgm(e.Frame, l);
          n = PolygonShapeGenerator.SED_S_Pgm(e.Frame, l);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Pent:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          (s = S / 2) &&
          (l = S / 2 * (l / s)),
          // n = ListManager.PolygonShapeGenerator.SED_S_Pent(e.Frame, l);
          n = PolygonShapeGenerator.SED_S_Pent(e.Frame, l);
        break;
      case ConstantData.SDRShapeTypes.SED_S_PentL:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          (s = c / 2) &&
          (l = c / 2 * (l / s)),
          // n = ListManager.PolygonShapeGenerator.SED_S_PentL(e.Frame, l);
          n = PolygonShapeGenerator.SED_S_PentL(e.Frame, l);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Hex:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          (s = c / 2) &&
          (l = c / 2 * (l / s)),
          // n = ListManager.PolygonShapeGenerator.SED_S_Hex(e.Frame, l);
          n = PolygonShapeGenerator.SED_S_Hex(e.Frame, l);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Oct:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          (o = l * c) < (u = l * S) &&
          (u = o),
          c &&
          (u = c * (u / c)),
          e.shapeparam = l,
          l = u / S,
          o = u / c,
          // n = ListManager.PolygonShapeGenerator.SED_S_Oct(e.Frame, l, o);
          n = PolygonShapeGenerator.SED_S_Oct(e.Frame, l, o);
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrR:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          // n = ListManager.PolygonShapeGenerator.SED_S_ArrR(e.Frame, l);
          n = PolygonShapeGenerator.SED_S_ArrR(e.Frame, l);
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrL:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          // n = ListManager.PolygonShapeGenerator.SED_S_ArrL(e.Frame, l);
          n = PolygonShapeGenerator.SED_S_ArrL(e.Frame, l);
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrT:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          // n = ListManager.PolygonShapeGenerator.SED_S_ArrT(e.Frame, l);
          n = PolygonShapeGenerator.SED_S_ArrT(e.Frame, l);
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrB:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          // n = ListManager.PolygonShapeGenerator.SED_S_ArrB(e.Frame, l);
          n = PolygonShapeGenerator.SED_S_ArrB(e.Frame, l);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Trap:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          // n = ListManager.PolygonShapeGenerator.SED_S_Trap(e.Frame, l);
          n = PolygonShapeGenerator.SED_S_Trap(e.Frame, l);
        break;
      case ConstantData.SDRShapeTypes.SED_S_TrapB:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          // n = ListManager.PolygonShapeGenerator.SED_S_TrapB(e.Frame, l);
          n = PolygonShapeGenerator.SED_S_TrapB(e.Frame, l);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Input:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          // n = ListManager.PolygonShapeGenerator.SED_S_Input(e.Frame, l);
          n = PolygonShapeGenerator.SED_S_Input(e.Frame, l);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Term:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          // n = ListManager.PolygonShapeGenerator.SED_S_Term(e.Frame, l);
          n = PolygonShapeGenerator.SED_S_Term(e.Frame, l);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Store:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          u = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = u,
          // n = ListManager.PolygonShapeGenerator.SED_S_Store(e.Frame, e.shapeparam, u);
          n = PolygonShapeGenerator.SED_S_Store(e.Frame, e.shapeparam, u);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Doc:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          u = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = u,
          // n = ListManager.PolygonShapeGenerator.SED_S_Doc(e.Frame, u);
          n = PolygonShapeGenerator.SED_S_Doc(e.Frame, u);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Delay:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          u = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = u,
          // n = ListManager.PolygonShapeGenerator.SED_S_Delay(e.Frame, u);
          n = PolygonShapeGenerator.SED_S_Delay(e.Frame, u);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Disp:
        i = ConstantData.SDRShapeTypes.SED_S_Poly,
          u = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = u,
          // n = ListManager.PolygonShapeGenerator.SED_S_Disp(e.Frame, u)
          n = PolygonShapeGenerator.SED_S_Disp(e.Frame, u)
    }
    switch (
    r & (
      ConstantData.ExtraFlags.SEDE_FlipHoriz | ConstantData.ExtraFlags.SEDE_FlipVert
    ) &&
    n &&
    (n = GlobalData.optManager.FlipVertexArray(n, r)),
    i
    ) {
      case ConstantData.SDRShapeTypes.SED_S_Rect:
        // p = new ListManager.Rect(e);
        // p = new GlobalDataShape.Rect(e);
        p = new Instance.Shape.Rect(e);
        break;
      case ConstantData.SDRShapeTypes.SED_S_RRect:
        // p = new ListManager.RRect(e);
        // p = new GlobalDataShape.RRect(e);
        p = new Instance.Shape.RRect(e);
        break;
      case ConstantData.SDRShapeTypes.SED_S_Oval:
      case ConstantData.SDRShapeTypes.SED_S_Circ:
        // (p = new ListManager.Oval(e)).dataclass = i;
        // (p = new GlobalDataShape.Oval(e)).dataclass = i;
        (p = new Instance.Shape.Oval(e)).dataclass = i;
        break;
      default:
        e.VertexArray = n,
          // (p = new ListManager.Polygon(e)).dataclass = i
          // (p = new GlobalDataShape.Polygon(e)).dataclass = i
          (p = new Instance.Shape.Polygon(e)).dataclass = i
    }
    return p
  },


  SDF.ReadGraph = function (e, t, a, r, i, n) {

    console.log('SDF.ReadGraph === ', e, t, a, r, i, n)
    var o,
      s,
      l,
      S,
      c,
      u = null,
      p = null,
      d = null,
      D = null,
      g = null,
      h = null,
      m = 0;
    r.lpStyles.length;
    for (
      o = t.codes[a].data,
      e.stackScale = o.stackScale,
      e.valuePrecision = o.valuePrecision,
      e.pieChartCategory = o.pieChartCategory,
      e.pieOriginTangle = SDF.ToWinAngle(o.pieOriginTangle),
      e.flags = o.flags,
      e.pointflags = o.pointflags,
      e.prefixChar = o.prefixChar,
      e.graphtype = o.graphtype,
      e.quadrant = o.quadrant,
      e.barAreaAmount = o.barAreaAmount,
      e.barAreaAmountStacked = o.barAreaAmountStacked,
      e.imageValueRep = o.imageValueRep,
      e.graphLegendType = o.graphLegendType,
      e.npoints = 0,
      e.index = - 1,
      e.areaBGImageID = - 1,
      e.bgImageID = - 1,
      e.perspectiveView3D = o.perspectiveView3D,
      e.effectLightDirection3D = o.effectLightDirection3D,
      e.suffixChar = o.suffixChar,
      e.style = Utils1.DeepCopy(r.sdp.def.style),
      e.areaStyle = Utils1.DeepCopy(r.sdp.def.style),
      e.gridStyle = Utils1.DeepCopy(r.sdp.def.style),
      g = null,
      u = e.style,
      D = e.graphtitle,
      a++;
      t.codes[a].code != n;
    ) {
      switch (t.codes[a].code) {
        case i.SDF_C_GRAPH_AXIS:
          s = SDF.ReadGraphAxis(t.codes[a].data, r, i),
            e.axes.push(s),
            D = e.axes[e.axes.length - 1].title,
            u = e.axes[e.axes.length - 1].style,
            h = e.axes[e.axes.length - 1];
          break;
        case i.SDF_C_GRAPH_TITLE:
          SDF.ReadGraphTitle(D, t.codes[a].data, r, i),
            u = D.style,
            g = D;
          break;
        case i.SDF_C_GRAPH_LABEL:
          S = SDF.ReadGraphAxisLabel(t.codes[a].data, r, i),
            h.labels.push(S),
            g = h.labels[h.labels.length - 1];
          break;
        case i.SDF_C_GRAPH_LEGEND_BEGIN:
          D = e.graphlegendTitle;
          break;
        case i.SDF_C_GRAPH_LEGEND:
          c = SDF.ReadGraphLegendEntry(t.codes[a].data, r, i),
            e.graphLegend.push(c),
            g = e.graphLegend[e.graphLegend.length - 1],
            u = e.graphLegend[e.graphLegend.length - 1].style,
            p = e.graphLegend[e.graphLegend.length - 1];
          break;
        case i.SDF_C_GRAPH_LEGEND_END:
          D = null,
            p = null;
          break;
        case i.SDF_C_GRAPH_POINT:
          l = SDF.ReadGraphPoint(t.codes[a].data, r, i),
            e.gpoint.push(l),
            g = e.gpoint[e.gpoint.length - 1].label,
            pointToReceiveComment = e.gpoint[e.gpoint.length - 1],
            d = e.gpoint[e.gpoint.length - 1],
            u = e.gpoint[e.gpoint.length - 1].style;
          break;
        case i.SDF_C_DRAWJUMP:
          g.HyperlinkText = t.codes[a].data.name;
          break;
        case i.SDF_C_COMMENT:
          a = SDF.ReadText(null, g, null, t, a, r, i, !0, i.SDF_C_COMMENT_END);
          break;
        case i.SDF_C_BEGIN_STYLE:
          a = SDF.ReadStyle(u, t, a, r, i),
            1 === ++m ? u = e.areaStyle : 2 === m ? u = e.gridStyle : null !== p ? u = p.labelStyle : null !== d &&
              (u = d.label.style);
          break;
        case i.SDF_C_LONGTEXT8:
          a = SDF.ReadText(null, g, null, t, a, r, i, !1, i.SDF_C_TEXT_END);
          break;
        case i.SDF_O_TEXTURELIST:
          a = SDF.ReadTextureList(t, a, r, i, !1),
            e.txList = r.TextureList.Textures
      }
      a++
    }
    return a
  },
  SDF.ReadGraphAxis = function (e, t, a) {
    var r = new ListManager.Graph.Axis;
    return r.orientation = e.orientation,
      r.flags = e.flags,
      r.lflags = e.lflags,
      r.summaryflags = e.summaryflags,
      r.fixedpoint = e.fixedpoint,
      r.frame = SDF.ToSDJSRect(e.frame, t.coordScaleFactor),
      r.margin = SDF.ToSDJSCoords(e.margin, t.coordScaleFactor),
      r.startpref = e.startpref,
      r.endpref = e.endpref,
      r.start = e.start,
      r.end = e.end,
      r.major = e.major,
      r.majorscale = SDF.ToSDJSCoords(e.majorscale, t.coordScaleFactor),
      r.minor = e.minor,
      r.minorscale = SDF.ToSDJSCoords(e.minorscale, t.coordScaleFactor),
      r.tickstyles = e.tickstyles,
      r.labelformat = e.labelformat,
      r.majorpref = e.majorpref,
      r.minorpref = e.minorpref,
      r.style = Utils1.DeepCopy(t.sdp.def.style),
      r
  },
  SDF.ReadGraphPoint = function (e, t, a) {
    var r = new ListManager.Graph.Point;
    return r.dataid = e.dataid,
      r.seriesid = e.seriesid,
      r.categoryid = e.categoryid,
      r.value = e.value,
      r.frame = SDF.ToSDJSRect(e.frame, t.coordScaleFactor),
      r.tangle = SDF.ToSDJSAngle(e.tangle),
      r.flags = e.flags,
      r.labelformat = e.labelformat,
      r.explodeAmt = SDF.ToSDJSCoords(e.explodeAmt, t.coordScaleFactor),
      r.labelstyle = e.labelstyle,
      r.imagescale = e.imagescale,
      r.imagerect = SDF.ToSDJSRect(e.imagerect, t.coordScaleFactor),
      r.label = new ListManager.Graph.Axis.Label,
      r.label.textid = e.labelTextId,
      r.label.tangle = SDF.ToSDJSAngle(e.labelTangle),
      r.label.frame = SDF.ToSDJSRect(e.labelFrame, t.coordScaleFactor),
      r.label.center.x = SDF.ToSDJSCoords(e.labelCenter.x, t.coordScaleFactor),
      r.label.center.y = SDF.ToSDJSCoords(e.labelCenter.y, t.coordScaleFactor),
      r
  },
  SDF.ReadGraphTitle = function (e, t, a, r) {
    return e.lflags = t.lflags,
      e.just = t.just,
      e.margin = SDF.ToSDJSCoords(t.margin, a.coordScaleFactor),
      e.frame = SDF.ToSDJSRect(t.frame, a.coordScaleFactor),
      e.tangle = SDF.ToSDJSAngle(t.tangle),
      e.drawpt = SDF.ToSDJSRect(t.drawpt, a.coordScaleFactor),
      e.center.x = SDF.ToSDJSCoords(t.center.x, a.coordScaleFactor),
      e.center.y = SDF.ToSDJSCoords(t.center.y, a.coordScaleFactor),
      e
  }

SDF.ReadGraphAxisLabel = function (e, t, a) {
  var r = new ListManager.Graph.Axis.Label;
  return r.lflags = e.lflags,
    r.categoryid = e.categoryid,
    r.frame = SDF.ToSDJSRect(e.frame, t.coordScaleFactor),
    r.tangle = SDF.ToSDJSAngle(e.tangle),
    r.center.x = SDF.ToSDJSCoords(e.center.x, t.coordScaleFactor),
    r.center.y = SDF.ToSDJSCoords(e.center.y, t.coordScaleFactor),
    r.just = e.just,
    r.vjust = e.vjust,
    r
},
  SDF.ReadGraphLegendEntry = function (e, t, a) {
    var r = new ListManager.Graph.LegendEntry;
    return r.seriesid = e.seriesid,
      r.flags = e.flags,
      r.lflags = e.lflags,
      r.imgIndx = e.imgIndx,
      r.textFrame = SDF.ToSDJSRect(e.textFrame, t.coordScaleFactor),
      r.swatchFrame = SDF.ToSDJSRect(e.swatchFrame, t.coordScaleFactor),
      r
  },
  SDF.ReadTable = function (e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u,
      p;
    l = t.codes[a].data,
      e.tmargin.left = SDF.ToSDJSCoords(l.tmargin.left, r.coordScaleFactor),
      e.tmargin.right = SDF.ToSDJSCoords(l.tmargin.right, r.coordScaleFactor),
      e.tmargin.top = SDF.ToSDJSCoords(l.tmargin.top, r.coordScaleFactor),
      e.tmargin.bottom = SDF.ToSDJSCoords(l.tmargin.bottom, r.coordScaleFactor),
      e.wd = SDF.ToSDJSCoords(l.wd, r.coordScaleFactor),
      e.ht = SDF.ToSDJSCoords(l.ht, r.coordScaleFactor),
      l.tabletype &&
      (e.timelineflags = l.tabletype),
      l.flags &&
      (e.flags = l.flags),
      a++;
    for (var d = r.lpStyles.length; t.codes[a].code != n;) {
      switch (t.codes[a].code) {
        case i.SDF_C_TABLEROWVP:
        case i.SDF_C_TABLEROW:
          s = SDF.ReadTableRow(t.codes[a].data, r, i),
            e.rows.push(s);
          break;
        case i.SDF_C_TABLECELL8:
          (o = SDF.ReadTableCell(t.codes[a].data, r, i)).uniqueid = ++e.tunique,
            o.fill = new FillData(),//Resources.FillData,
            o.hline = new Resources.LineData,
            o.vline = new Resources.LineData,
            o.Text = new TextFormatData(),
            e.cells.push(o);
          break;
        case i.SDF_C_TABLECELL:
          (o = SDF.ReadTableCell7(t.codes[a].data, r, i)).uniqueid = ++e.tunique,
            e.cells.push(o);
          break;
        case i.SDF_C_TABLECELLEXTRAOLD:
          S = t.codes[a].data,
            o.celltype = S.celltype,
            o.tstyleindex = - 1,
            o.stylename = S.stylename;
          break;
        case i.SDF_C_TABLECELLPROP:
          o.uniqueid = t.codes[a].data.uniqueid,
            o.uniqueid > e.tunique &&
            (e.tunique = o.uniqueid + 1);
          break;
        case i.SDF_C_TABLECELLEXTRA:
          S = t.codes[a].data,
            o.celltype = S.celltype,
            o.tstyleindex = S.styleindex,
            o.datarecordID = S.datarecordID,
            o.tstyleindex >= 0 &&
            o.tstyleindex < d &&
            (
              o.hline = Utils1.DeepCopy(r.lpStyles[o.tstyleindex].Line),
              o.vline = Utils1.DeepCopy(r.lpStyles[o.tstyleindex].Line),
              o.fill = Utils1.DeepCopy(r.lpStyles[o.tstyleindex].Fill),
              o.Text = Utils1.DeepCopy(r.lpStyles[o.tstyleindex].Text)
            );
          break;
        case i.SDF_C_CELL_STYLENAME:
          o.stylename = t.codes[a].data.name;
          break;
        case i.SDF_C_BEGIN_HLINE:
          a = SDF.ReadSDLine(o.hline, t, a, r, i);
          break;
        case i.SDF_C_BEGIN_VLINE:
          a = SDF.ReadSDLine(o.vline, t, a, r, i);
          break;
        case i.SDF_C_BEGIN_FILL:
          a = SDF.ReadSDFill(o.fill, t, a, r, i);
          break;
        case i.SDF_C_BEGIN_TEXTF:
          a = SDF.ReadSDTxf(o.Text, t, a, r, i);
          break;
        case i.SDF_C_LONGTEXT8:
        case i.SDF_C_LONGTEXT:
        case i.SDF_C_TEXT:
          a = SDF.ReadText(null, o, null, t, a, r, i, !1, i.SDF_C_TEXT_END);
          break;
        case i.SDF_C_DRAWIMAGE8:
          if (o.flags & ListManager.Table.CellFlags.SDT_F_SilentF) break;
          o.Image = new ListManager.ImageRecord,
            o.Image.mr = t.codes[a].data.mr,
            o.Image.croprect = t.codes[a].data.croprect,
            o.Image.scale = t.codes[a].data.scale,
            o.Image.imageflags = t.codes[a].data.imageflags,
            o.Image.iconid = 0,
            r.PVersion >= SDF.SDF_PVERSION838 &&
            t.codes[a].data.iconid &&
            (
              o.Image.iconid = t.codes[a].data.iconid,
              1 === o.Image.iconid &&
              (o.Image.iconid = 100)
            );
          break;
        case i.SDF_C_IMAGEID:
        case i.SDF_C_EMFID:
          SDF.ReadImageID(null, o, t.codes[a].data, r, !0);
          break;
        case i.SDF_C_NOTEID:
          null != (c = r.noteids[t.codes[a].data.value]) &&
            (o.NoteID = c, r.usednoteids[t.codes[a].data.value] = !0);
          break;
        case i.SDF_C_EXPANDEDVIEWID:
          null != (u = r.expandedviewids[t.codes[a].data.value]) &&
            (
              o.ExpandedViewID = u,
              r.usedexpandedviewids[t.codes[a].data.value] = - 1
            );
          break;
        case i.SDF_C_EXPANDEDVIEW:
          p = GlobalData.objectStore.CreateBlock(
            ConstantData.StoredObjectType.EXPANDEDVIEW_OBJECT,
            t.codes[a].data.svg
          ),
            o.ExpandedViewID = p.ID;
          break;
        case i.SDF_C_EMFHASH:
          o.EMFHash = t.codes[a].data.name;
          break;
        case i.SDF_C_DRAWJPG:
          o.ImageURL = t.codes[a].data.URL,
            GlobalData.optManager.Table_CellSetBlobBytes(
              o,
              t.codes[a].data.BlobBytes,
              FileParser.Image_Dir.dir_jpg
            );
          break;
        case i.SDF_C_DRAWPREVIEWPNG:
        case i.SDF_C_DRAWPNG:
          o.ImageURL = t.codes[a].data.URL,
            GlobalData.optManager.Table_CellSetBlobBytes(
              o,
              t.codes[a].data.BlobBytes,
              FileParser.Image_Dir.dir_png
            );
          break;
        case i.SDF_C_DRAWSVG:
          o.ImageURL = t.codes[a].data.URL;
          var D = t.codes[a].data.BlobBytes;
          GlobalData.optManager.Table_CellSetBlobBytes(o, D, FileParser.Image_Dir.dir_svg),
            o.SVGDim = Utils2.ParseSVGDimensions(D);
          break;
        case i.SDF_C_DRAWMETA:
          o.ImageURL = Constants.FilePath_RSRC + Constants.MissingImage,
            o.ImageURL = o.ImageURL + '.svg',
            o.SVGDim = {},
            o.SVGDim.width = Constants.MissingImageDim.width,
            o.SVGDim.height = Constants.MissingImageDim.height;
          break;
        case i.SDF_C_COMMENT:
          a = SDF.ReadText(null, o, null, t, a, r, i, !0, i.SDF_C_COMMENT_END);
          break;
        case i.SDF_C_DRAWJUMP:
          o.hyperlink = t.codes[a].data.name;
          break;
        case i.SDF_C_IMAGEURL:
          o.ImageURL = t.codes[a].data.name;
          break;
        default:
          t.codes[a].code & SDF.SDF_BEGIN &&
            (
              a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
            )
      }
      a++
    }
    return a
  },
  SDF.ReadTableRow = function (e, t, a) {
    var r = new ListManager.Table.Row(e.start, e.ncells);
    return e.lframe ? r.frame = SDF.ToSDJSRect(e.lframe, t.coordScaleFactor) : r.frame = SDF.ToSDJSRect(e.frame, t.coordScaleFactor),
      r
  },
  SDF.ReadTableCell = function (e, t, a) {
    var r = new ListManager.Table.Cell;
    if (
      r.textht = SDF.ToSDJSCoords(e.textht, t.coordScaleFactor),
      r.textwd = SDF.ToSDJSCoords(e.textwd, t.coordScaleFactor),
      r.minwd = SDF.ToSDJSCoords(e.minwd, t.coordScaleFactor),
      r.sizedim.width = SDF.ToSDJSCoords(e.sizedim.x, t.coordScaleFactor),
      r.sizedim.height = SDF.ToSDJSCoords(e.sizedim.y, t.coordScaleFactor),
      r.frame = SDF.ToSDJSRect(e.frame, t.coordScaleFactor),
      r.trect = SDF.ToSDJSRect(e.trect, t.coordScaleFactor),
      r.just = SDF.W32JustToJS(e.just, !1),
      r.vjust = SDF.W32JustToJS(e.vjust, !0),
      r.flags = e.flags,
      r.nextra = e.nextra,
      r.vdisp = SDF.ToSDJSCoords(e.vdisp, t.coordScaleFactor),
      r.hdisp = SDF.ToSDJSCoords(e.hdisp, t.coordScaleFactor),
      r.sequence = e.sequence,
      null != e.childcontainer &&
      (r.childcontainer = e.childcontainer),
      t.ReadBlocks &&
      e.textid >= 0
    ) {
      var i = t.textids[e.textid];
      null != i &&
        (r.DataID = i, t.usedtextids[e.textid] = !0)
    }
    return r.nextra &&
      (
        r.flags = Utils2.SetFlag(r.flags, ListManager.Table.CellFlags.SDT_F_SilentL, !0)
      ),
      r
  },
  SDF.ReadTableCell7 = function (e, t, a) {
    var r = new ListManager.Table.Cell;
    e.ltextht ? r.textht = SDF.ToSDJSCoords(e.ltextht, t.coordScaleFactor) : r.textht = SDF.ToSDJSCoords(e.textht, t.coordScaleFactor),
      e.ltextwd ? r.textwd = SDF.ToSDJSCoords(e.ltextwd, t.coordScaleFactor) : r.textwd = SDF.ToSDJSCoords(e.textwd, t.coordScaleFactor),
      r.minwd = SDF.ToSDJSCoords(e.minwd, t.coordScaleFactor),
      e.lsizedim ? (
        r.sizedim.width = SDF.ToSDJSCoords(e.lsizedim.x, t.coordScaleFactor),
        r.sizedim.height = SDF.ToSDJSCoords(e.lsizedim.y, t.coordScaleFactor)
      ) : (
        r.sizedim.width = SDF.ToSDJSCoords(e.sizedim.x, t.coordScaleFactor),
        r.sizedim.height = SDF.ToSDJSCoords(e.sizedim.y, t.coordScaleFactor)
      ),
      e.lframe ? r.frame = SDF.ToSDJSRect(e.lframe, t.coordScaleFactor) : r.frame = SDF.ToSDJSRect(e.frame, t.coordScaleFactor),
      e.ltrect ? r.trect = SDF.ToSDJSRect(e.ltrect, t.coordScaleFactor) : r.trect = SDF.ToSDJSRect(e.trect, t.coordScaleFactor),
      r.just = SDF.W32JustToJS(e.just, !1),
      r.vjust = SDF.W32JustToJS(e.vjust, !0),
      r.flags = e.flags,
      r.nextra = e.nextra,
      r.vdisp = SDF.ToSDJSCoords(e.vdisp, t.coordScaleFactor),
      r.hdisp = SDF.ToSDJSCoords(e.hdisp, t.coordScaleFactor),
      r.fill = new FillData(),//Resources.FillData,
      r.hline = new Resources.LineData,
      r.vline = new Resources.LineData,
      r.Text = new TextFormatData(),
      r.hline.Thickness = SDF.ToSDJSCoords(e.hbord, t.coordScaleFactor),
      r.hline.LinePattern = Resources.LinePatternData[e.hpatindex - Resources.Windows_LinePatterns.SEP_Solid],
      r.hline.Paint.Color = SDF.WinColorToHTML(e.hlcolor),
      r.hline.Paint.Opacity = SDF.WinColorToAlpha(e.hlcolor),
      r.vline.Thickness = SDF.ToSDJSCoords(e.vbord, t.coordScaleFactor),
      r.vline.LinePattern = Resources.LinePatternData[e.vpatindex - Resources.Windows_LinePatterns.SEP_Solid],
      r.vline.Paint.Color = SDF.WinColorToHTML(e.vlcolor),
      r.vline.Paint.Opacity = SDF.WinColorToAlpha(e.vlcolor),
      r.fill.Paint.Color = SDF.WinColorToHTML(e.bcolor),
      r.fill.Paint.Opacity = SDF.WinColorToAlpha(e.bcolor),
      e.fpatindex === FileParser.v6FillTypes.SEHollowIndex ? r.fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT : e.fpatindex === FileParser.v6FillTypes.SEOpaqueIndex &&
        (
          e.color === ConstantData.Colors.Color_Trans ? (
            r.fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
            r.fill.Paint.Color = ConstantData.Colors.Color_White
          ) : r.fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID
        );
    var i = SDF.FontIDtoFontRec(e.fontid, t);
    return r.Text.FontName = i.fontName,
      r.Text.FontId = -1/* GlobalData.optManager.GetFontIdByName(r.Text.FontName)*/,
      r.Text.FontSize = e.fsize,
      r.Text.Face = e.face,
      r.Text.Paint.Color = SDF.WinColorToHTML(e.tcolor),
      r.Text.Paint.Opacity = SDF.WinColorToAlpha(e.tcolor),
      r.nextra &&
      (
        r.flags = Utils2.SetFlag(r.flags, ListManager.Table.CellFlags.SDT_F_SilentL, !0)
      ),
      r
  },


  SDF.BuildColorChanges = function (e, t) {
    if (t.SetColorChanges) {
      var a = FileParser.SDRColorFilters;
      0 === t.ColorFilter &&
        (
          e.colorchanges = a.SD_NOCOLOR_FILL | a.SD_NOCOLOR_TEXTURE | a.SD_NOCOLOR_LINE | a.SD_NOCOLOR_LINETHICK | a.SD_NOCOLOR_LINEPAT | a.SD_NOCOLOR_STYLE
        )
    }
  },
  SDF.ReadObjectHeader = function (e, t, a, r, i, n, o, s) {
    var l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m = {},
      C = {};
    if (
      a.lr ? (u = a.lr, c = a.lframe, p = a.linside, d = a.lsizedim) : (u = a.r, c = a.frame, p = a.inside, d = a.sizedim),
      m.Frame = SDF.ToSDJSRect(c, r.coordScaleFactor),
      m.r = SDF.ToSDJSRect(u, r.coordScaleFactor),
      //SDUI.Builder &&

      (
        m.originalr = SDF.ToSDJSRect(u, r.coordScaleFactor),
        m.originalframe = SDF.ToSDJSRect(c, r.coordScaleFactor)
      ),
      m.inside = SDF.ToSDJSRect(p, r.coordScaleFactor),
      r.isSymbol &&
      !1 === r.SetSymbolOrigin &&
      (
        r.GroupOffset.x = r.SymbolPosition.x - m.Frame.x,
        r.GroupOffset.y = r.SymbolPosition.y - m.Frame.y,
        r.SetSymbolOrigin = !0
      ),
      a.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText &&
      (r.VisioFileVersion = !0),
      !o &&
        a.associd >= 0 &&
        a.flags & ConstantData.ObjFlags.SEDO_Assoc &&
        a.otype === FileParser.ObjectTypes.SED_Shape &&
        0 == (a.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText) ? (
        h = !0,
        (D = r.IDMap[a.associd]) >= 0 &&
        (g = GlobalData.optManager.GetObjectPtr(D, !1)) &&
        g.DataID >= 0 &&
        (h = !1),
        h ? (
          r.textonline = a.associd,
          r.textonlineid = a.uniqueid,
          r.LineTextObject = !0
        ) : r.LineTextObject = !1
      ) : r.LineTextObject = !1,
      (r.GroupOffset.x || r.GroupOffset.y) &&
      (
        m.Frame.x += r.GroupOffset.x,
        m.Frame.y += r.GroupOffset.y,
        m.r.x += r.GroupOffset.x,
        m.r.y += r.GroupOffset.y,
        // SDUI.Builder &&
        (
          m.originalr.x += r.GroupOffset.x,
          m.originalr.y += r.GroupOffset.y,
          m.originalframe.x += r.GroupOffset.x,
          m.originalframe.y += r.GroupOffset.y
        ),
        m.inside.x += r.GroupOffset.x,
        m.inside.y += r.GroupOffset.y
      ),
      m.shapeparam = a.shapeparam,
      m.objecttype = a.objecttype,
      m.UniqueID = a.uniqueid,
      SDF.UnsupportedTypes.indexOf(a.objecttype) >= 0
    ) {
      r.error = SDF.Errors.UnsupportedPanel;
      var y = new Error(Resources.Strings.SDRRead_Error_6);
      throw y.name = '1',
      y
    }
    switch (m.ObjGrow = a.objgrow, a.otype) {
      case FileParser.ObjectTypes.SED_Shape:
        C = a.hgframe ? SDF.ToSDJSRect(a.hgframe, r.coordScaleFactor) : SDF.ToSDJSRect(c, r.coordScaleFactor),
          m.InitialGroupBounds = {},
          m.InitialGroupBounds.width = C.width,
          m.InitialGroupBounds.height = C.height,
          m.InitialGroupBounds.x = C.x,
          m.InitialGroupBounds.y = C.y,
          (
            l = i ?
              // new ListManager.GroupSymbol(m)
              // new GlobalDataShape.GroupSymbol(m)
              new Instance.Shape.GroupSymbol(m)
              : m.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ?
                //new ListManager.PolyLineContainer(m)
                new Instance.Shape.PolyLineContainer(m)
                : n ?
                  // new ListManager.SVGFragmentSymbol(m)
                  new Instance.Shape.SVGFragmentSymbol(m)
                  : m.objecttype === ConstantData.ObjectTypes.SD_OBJT_D3SYMBOL ?
                    // new ListManager.D3Symbol(m)
                    new Instance.Shape.D3Symbol(m)
                    : m.objecttype === ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER ?
                      // new ListManager.ShapeContainer(m)
                      new Instance.Shape.ShapeContainer(m)
                      : SDF.CreateShapeObject(m, a, r, a.extraflags)
          ).ResizeAspectConstrain = a.objgrow === ConstantData.GrowBehavior.PROPORTIONAL;
        break;
      case FileParser.ObjectTypes.SED_LineD:
        l = SDF.CreateLineObject(m, a, r);
        break;
      case FileParser.ObjectTypes.SED_SegL:
        l = a.dataclass === FileParser.SeglTypes.SED_L_Arc ?
          // new ListManager.ArcSegmentedLine(m) :
          new Instance.Shape.ArcSegmentedLine(m) :
          // new ListManager.SegmentedLine(m);
          new Instance.Shape.SegmentedLine(m);
        break;
      case FileParser.ObjectTypes.SED_Array:
        a.lfixedpoint ? m.fixedpoint = SDF.ToSDJSCoords(a.lfixedpoint, r.coordScaleFactor) : m.fixedpoint = SDF.ToSDJSCoords(a.fixedpoint, r.coordScaleFactor),
          m.StartPoint = {},
          m.EndPoint = {},
          a.dataclass === FileParser.LineSubclass.SED_LCV ? (
            r.GroupOffset.x &&
            (m.fixedpoint += r.GroupOffset.x),
            m.vertical = !0,
            m.StartPoint.x = m.fixedpoint,
            m.StartPoint.y = m.Frame.y,
            m.EndPoint.x = m.fixedpoint,
            m.EndPoint.y = m.Frame.y
          ) : (
            m.vertical = !1,
            r.GroupOffset.y &&
            (m.fixedpoint += r.GroupOffset.y),
            m.StartPoint.y = m.fixedpoint,
            m.StartPoint.x = m.Frame.x,
            m.EndPoint.y = m.fixedpoint,
            m.EndPoint.x = m.Frame.x
          ),
          // l = new ListManager.Connector(m);
          l = new Instance.Shape.Connector(m);
        break;
      case FileParser.ObjectTypes.SED_PolyL:
        l = m.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ?
          // new ListManager.PolyLineContainer(m) :
          new Instance.Shape.PolyLineContainer(m) :
          // new ListManager.PolyLine(m);
          new Instance.Shape.PolyLine(m);
        break;
      case FileParser.ObjectTypes.SED_Freehand:
        // l = new ListManager.FreehandLine(m)
        l = new Instance.Shape.FreehandLine(m);
    }
    if (l) if (
      SDF.DefaultObject(e, l),
      // SDUI.Builder &&
      (
        m.originalr &&
        (
          l.originalr = {
            x: m.originalr.x,
            y: m.originalr.y,
            width: m.originalr.width,
            height: m.originalr.height
          }
        ),
        m.originalframe &&
        (
          l.originalframe = {
            x: m.originalframe.x,
            y: m.originalframe.y,
            width: m.originalframe.width,
            height: m.originalframe.height
          }
        )
      ),
      l.dataclass = a.dataclass,
      l.flags = a.flags,
      r.PVersion < SDF.SDF_PVERSION849 &&
      (
        l.flags = Utils2.SetFlag(l.flags, ConstantData.ObjFlags.SEDO_NoTableLink, !1)
      ),
      l.extraflags = a.extraflags,
      l.sizedim.width = SDF.ToSDJSCoords(d.x, r.coordScaleFactor),
      l.sizedim.height = SDF.ToSDJSCoords(d.y, r.coordScaleFactor),
      l.ObjGrow = a.objgrow,
      a.otype !== FileParser.ObjectTypes.SED_Array &&
      (l.hookflags = a.hookflags, l.targflags = a.targflags),
      l.maxhooks = a.maxhooks,
      l.associd = a.associd,
      l.ShortRef = a.ShortRef,
      r.ReadingGroup &&
      (l.bInGroup = !0),
      s
    ) {
      if (
        l.attachpoint.x = a.attachpoint_x,
        l.attachpoint.y = a.attachpoint_y,
        l.rleft = a.rleft,
        l.rtop = a.rtop,
        l.rright = a.rright,
        l.rbottom = a.rbottom,
        l.rwd = a.rwd,
        l.rht = a.rht,
        l.rflags = a.rflags,
        l.Layer = a.layer,
        (l.Layer < 0 || l.Layer > t.nlayers - 1) &&
        (l.Layer = 0),
        l.Dimensions = a.dimensions,
        l.Dimensions & ConstantData.DimensionFlags.SED_DF_Always &&
        l.Dimensions & ConstantData.DimensionFlags.SED_DF_Select &&
        (
          l.Dimensions = Utils2.SetFlag(
            l.Dimensions,
            ConstantData.DimensionFlags.SED_DF_Select,
            !1
          )
        ),
        l.tstyleindex = a.styleindex,
        l.objecttype = a.objecttype,
        l.objecttype
      ) switch (l.objecttype) {
        case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_ROWS:
        case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_COLS:
          r.PVersion < SDF.SDF_PVERSION864 &&
            (
              l.moreflags = Utils2.SetFlag(
                l.moreflags,
                ConstantData.ObjMoreFlags.SED_MF_AutoContainer,
                !0
              )
            )
      }
      l.colorfilter = a.colorfilter,
        void 0 !== a.colorchanges ? l.colorchanges = a.colorchanges : (l.colorchanges = 0, SDF.BuildColorChanges(l, r)),
        a.moreflags &&
        (l.moreflags = a.moreflags),
        l.sequence = a.sequence,
        l.dimensionDeflectionH = SDF.ToSDJSCoords(a.dimensionDeflectionH, r.coordScaleFactor),
        l.dimensionDeflectionV = SDF.ToSDJSCoords(a.dimensionDeflectionV, r.coordScaleFactor),
        a.hookdisp_x ||
          a.hookdisp_y ? (
          l.hookdisp.x = SDF.ToSDJSCoords(a.hookdisp_x, r.coordScaleFactor),
          l.hookdisp.y = SDF.ToSDJSCoords(a.hookdisp_y, r.coordScaleFactor)
        ) : (l.hookdisp.x = 0, l.hookdisp.y = 0),
        a.pptLayout ? l.pptLayout = a.pptLayout : l.pptLayout = 0,
        a.subtype ? l.subtype = a.subtype : l.subtype = 0,
        S = r.lpStyles.length,
        l.tstyleindex >= 0 &&
          l.tstyleindex < S ? l.StyleRecord = Utils1.DeepCopy(r.lpStyles[l.tstyleindex]) : S &&
        (
          l.tstyleindex = 0,
          l.StyleRecord = Utils1.DeepCopy(r.lpStyles[l.tstyleindex])
        )
    } else l.StyleRecord = Utils1.DeepCopy(r.sdp.def.style),
      a.otype === FileParser.ObjectTypes.SED_Shape &&
      (
        l.StyleRecord.Line = Utils1.DeepCopy(r.sdp.def.style.Border)
      );
    return l
  },


  SDF.ReadLayers = function (e, t, a, r) {
    var i = - 1;
    for (
      t++,
      a.tLMB.layers = [];
      e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_END_LAYER;
    ) {
      switch (e.codes[t].code) {
        case r.SDF_C_LAYERFLAGS:
          i++,
            a.tLMB.layers.push(new Layer()),
            a.tLMB.layers[i].flags = e.codes[t].data.flags;
          break;
        case r.SDF_C_LAYERNAME:
          i >= 0 &&
            (a.tLMB.layers[i].name = e.codes[t].data.name);
          break;
        case r.SDF_C_LAYERTYPE:
          i >= 0 &&
            (a.tLMB.layers[i].layertype = e.codes[t].data.type);
          break;
        case r.SDF_C_LAYERLIST:
          i >= 0 &&
            (
              a.tLMB.layers[i].zList = e.codes[t].data.zList,
              a.BlockzList = a.BlockzList.concat(e.codes[t].data.zList)
            )
      }
      t++
    }
    return a.tLMB.nlayers = i + 1,
      a.tLMB.activelayer >= a.tLMB.nlayers &&
      (a.tLMB.activelayer = 0),
      1 === a.tLMB.nlayers &&
      'Default' === a.tLMB.layers[0].name &&
      (
        a.tLMB.layers[0].name = ConstantData.Defines.DefaultLayerName
      ),
      t
  },
  SDF.ReadRecentSymbols = function (e, t, a, r) {
    var i,
      n,
      o = !1,
      s = null;
    for (
      t++,
      a.sdp.RecentSymbols = [];
      e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_RECENTSYMBOLS_END;
    ) {
      switch (e.codes[t].code) {
        case r.SDF_C_RECENTSYMBOL_ID:
          s = e.codes[t].data.name;
          break;
        case r.SDF_C_RECENTSYMBOL_NOMENU:
          n = e.codes[t].data.name,
            o = !!parseInt(n);
          break;
        case r.SDF_C_RECENTSYMBOL_NAME:
          i = new RecentSymbol(s, e.codes[t].data.name, o),
            a.sdp.RecentSymbols.push(i)
      }
      t++
    }
    return t
  },
  SDF.ReadToolPalettes = function (e, t, a, r) {
    var i,
      n;
    for (
      t++;
      e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_TOOLPALETTES_END;
    ) {
      switch (e.codes[t].code) {
        case r.SDF_C_TOOLPALETTES_NAME:
          i = e.codes[t].data.name;
          break;
        case r.SDF_C_TOOLPALETTES_COLLAPSED:
          n = 1 === (n = e.codes[t].data.collapsed),
            a.PaletteStatus[i] = n
      }
      t++
    }
    return t
  },
  SDF.WriteLocalFile = function (e) {
    var t = function (e) {
    },
      a = function (a) {
        function r(e) {
          e.createWriter(i, t)
        }
        function i(t) {
          t.write(e)
        }
        a.root.getFile(
          'test.sdr',
          {
            create: !0
          },
          (
            function (e) {
              e.remove((function () {
                a.root.getFile('test.sdr', {
                  create: !0
                }, r, t)
              }), t)
            }
          ),
          t
        )
      };
    navigator.webkitPersistentStorage.requestQuota(
      4194304,
      (
        function (e) {
          (window.requestFileSystem || window.webkitRequestFileSystem)(PERSISTENT, e, a, t)
        }
      )
    )
  },


  SDF.WriteFile = function (e, t, a, r) {
    var i;
    Collab.CloseSecondaryEdit();
    var n,
      o = new SDF.WResult,
      s = [];
    o.sdp = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      o.tLMB = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1),
      o.ctp = GlobalData.optManager.theContentHeader,
      o.WriteVisio = t,
      r &&
      (o.WriteWin32 = !0),
      SDUI.Commands.MainController.SymbolLibraryBrowser.CurrentLibraryPath ? o.LibraryPathTarget = SDUI.Commands.MainController.SymbolLibraryBrowser.CurrentLibraryPath : o.LibraryPathTarget = SDUI.Commands.MainController.SymbolLibraryBrowser.LibraryPathTarget;
    var l = GlobalData.docHandler.svgDoc.GetWorkArea();
    o.WindowSettings.wscale = GlobalData.docHandler.GetZoomFactor(),
      o.WindowSettings.worigin.x = l.scrollX,
      o.WindowSettings.worigin.y = l.scrollY,
      o.WindowSettings.wflags = 0,
      GlobalData.docHandler.scaleToFit ? o.WindowSettings.wflags = ListManager.WFlags.W_Stf : GlobalData.docHandler.scaleToPage &&
        (o.WindowSettings.wflags = ListManager.WFlags.W_Page),
      o.docDpi = GlobalData.docHandler.svgDoc.docInfo.docDpi,
      1 === o.WindowSettings.wscale ? o.WindowSettings.wscale = 0 : o.WindowSettings.wscale *= 1000,
      GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
        GlobalData.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_ShowGrid,
        GlobalData.docHandler.documentConfig.showGrid
      ),
      GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
        GlobalData.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_ShowRulers,
        GlobalData.docHandler.documentConfig.showRulers
      ),
      GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
        GlobalData.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_SnapToGridC,
        GlobalData.docHandler.documentConfig.centerSnap &&
        GlobalData.docHandler.documentConfig.enableSnap
      ),
      GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
        GlobalData.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_SnapToGridTL,
        !GlobalData.docHandler.documentConfig.centerSnap &&
        GlobalData.docHandler.documentConfig.enableSnap
      ),
      GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
        GlobalData.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_ShowPageDividers,
        GlobalData.docHandler.documentConfig.showPageDivider
      ),
      GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
        GlobalData.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_SnapToShapes_Off,
        0 == GlobalData.docHandler.documentConfig.snapToShapes
      ),
      GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
        GlobalData.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_ShowRulers,
        GlobalData.docHandler.documentConfig.showRulers
      ),
      o.ctp.smartpanelname = SDF.ToSDWinPanelName(ConstantData.DocumentContext.CurrentSmartPanel),
      GlobalData.optManager.UpdateObjectLayerIndices(o),
      o.RichGradients = GlobalData.optManager.RichGradients;
    var S = GlobalData.optManager.ZList();
    if (
      o.zList = S,
      n = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !1),
      o.links = Utils1.DeepCopy(n),
      t
    ) {
      stateManagerPrimary = stateManager,
        objectStorePrimary = objectStore;
      var c = new SDJS.Editor.BaseStateManager,
        u = new SDJS.Editor.ObjectStore;
      if (
        GlobalData.optManager.SwitchToAlternateStateManager(c, u, !0),
        GlobalData.optManager.IsPlanningDocument()
      ) {
        o.zList = o.tLMB.layers[o.tLMB.activelayer].zList;
        var p = Utils1.DeepCopy(o.tLMB);
        p.layers = o.tLMB.layers.slice(o.tLMB.activelayer, o.tLMB.activelayer + 1),
          p.activelayer = 0,
          p.nlayers = 1,
          o.tLMB = p
      } else o.zList = GlobalData.optManager.ZList();
      SDF.ConvertToVisio(o, a),
        n = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !1),
        o.links = Utils1.DeepCopy(n)
    }
    if (
      i = SDF.WriteBuffer(o, !1, !e),
      t &&
      (
        window.setTimeout((function () {
          SDF.CleanupVisioRasterization(a)
        }), 3000),
        GlobalData.optManager.RestorePrimaryStateManager()
      ),
      !e
    ) return i;
    window.webkitRequestFileSystem ? SDF.WriteLocalFile(i) : (
      s = S.slice(0),
      GlobalData.optManager.DeleteObjects(s, !1),
      GlobalData.optManager.UpdateLinks(),
      SDF.ReadFile(i, !1),
      TestServer.currentblocklist.length = 0,
      TestServer.StateSent = 0
    )
  },
  SDF.WriteSelect = function (e, t, a, r, i) {
    var n = new SDF.WResult;
    n.sdp = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      n.tLMB = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1),
      n.ctp = GlobalData.optManager.theContentHeader,
      n.selectonly = !0,
      r &&
      (n.KeepSegDir = !0);
    GlobalData.docHandler.svgDoc.GetWorkArea();
    return n.docDpi = GlobalData.docHandler.svgDoc.docInfo.docDpi,
      n.zList = e,
      n.noTables = t,
      n.RichGradients = GlobalData.optManager.RichGradients,
      GlobalData.optManager.UpdateObjectLayerIndices(n),
      SDF.WriteBuffer(n, !0, !0, i)
  },
  SDF.WriteTableFile = function (e) {
    FileParser.SDROpCodesByName;
    var t = new ArrayBuffer(10),
      a = new T3DataStream(t),
      r = new SDF.WResult,
      i = e.GetTable(!1);
    if (null == i) return null;
    r.sdp = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      r.tLMB = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1),
      r.ctp = GlobalData.optManager.theContentHeader,
      r.zList.push(e.BlockID);
    GlobalData.docHandler.svgDoc.GetWorkArea();
    r.docDpi = GlobalData.docHandler.svgDoc.docInfo.docDpi,
      r.coordScaleFactor = SDF.DRAWRES / GlobalData.docHandler.svgDoc.docInfo.docDpi,
      a.endianness = T3DataStream.LITTLE_ENDIAN,
      a.writeCString(SDF.Signature, SDF.Signature.length),
      SDF.Write_SDF_C_VERSION(
        a,
        FileParser.Platforms.SDF_SDJS,
        SDF.SDF_FVERSION2022
      ),
      SDF.BuildFontList(r),
      SDF.WriteFontList(a, r),
      SDF.WriteTable(a, i, r),
      a.writeUint16(FileParser.SDROpCodesByName.SDF_C_ENDFILE);
    var n = new Blob([a.buffer]);
    return window.webkitRequestFileSystem &&
      SDF.WriteLocalFile(n),
      a.buffer
  },
  SDF.WResult = function () {
    this.error = 0,
      this.coordScaleFactor = 1,
      this.sdp = null,
      this.tLMB = null,
      this.ctp = null,
      this.WindowSettings = new SDF.WindowSettings,
      this.docDpi = 100,
      this.fontlist = [],
      this.lpStyles = [],
      this.UniqueMap = [],
      this.zList = [],
      this.links = [],
      this.textlinks = [],
      this.polyid = 0,
      this.nsegl = 0,
      this.arrayid = 0,
      this.GroupOffset = {
        x: 0,
        y: 0
      },
      this.rulerSettings = null,
      this.WriteBlocks = !1,
      this.noTables = !1,
      this.WriteGroupBlock = !1,
      this.selectonly = !1,
      this.nblocks = 0,
      this.BlockAction = 0,
      this.state = 0,
      this.delta = 0,
      this.TextureList = [],
      this.LibraryPathTarget = '',
      this.RichGradients = [],
      this.WriteVisio = !1,
      this.KeepSegDir = !1,
      this.WriteWin32 = !1
  },
  SDF.WriteBuffer = function (e, t, a, r) {
    FileParser.SDROpCodesByName;
    var i = new ArrayBuffer(10),
      n = new T3DataStream(i);
    if (
      n.endianness = T3DataStream.LITTLE_ENDIAN,
      n.writeCString(SDF.Signature, SDF.Signature.length),
      e.WriteVisio ||
        e.WriteWin32 ? (
        SDF.Write_SDF_C_VERSION(n, FileParser.Platforms.SDF_SDJS, SDF.FVERSION2015),
        e.coordScaleFactor = SDF.DRAWRES / GlobalData.docHandler.svgDoc.docInfo.docDpi
      ) : SDF.Write_SDF_C_VERSION(
        n,
        FileParser.Platforms.SDF_SDJS,
        GlobalData.optManager.FileVersion
      ),
      e.rulerSettings = GlobalData.docHandler.rulerSettings,
      e.rulerSettings.show = GlobalData.docHandler.documentConfig.showRulers,
      t
    ) {
      if (SDF.WriteSelectHeader(n, e), e.error) return null
    } else if (SDF.WriteHeader(n, e, null), e.error) return null;
    return GlobalData.optManager.theContentHeader.SDDataID >= 0 &&
      !r &&
      SDF.WriteSDDATA(n, e),
      SDF.WriteDraw(n, e),
      e.error ? null : (
        n.writeUint16(FileParser.SDROpCodesByName.SDF_C_ENDFILE),
        t ||
          a ? n.buffer : new Blob([n.buffer])
      )
  },



  SDF.ToSDWinPanelName = function (e) {
    var t;
    return e &&
      (t = (t = (t = e.slice(3)).replace('_and_', ' & ')).replace('_', ' ')),
      t
  },

  SDF.HTMLColorToWin = function (e, t) {
    for (var a, r = e.replace('#', ''); r.length < 6;) r += r[0];
    return a = parseInt(r.slice(0, 2), 16) + (parseInt(r.slice(2, 4), 16) << 8) + (parseInt(r.slice(4, 6), 16) << 16),
      void 0 === t &&
      (t = 1),
      t = 1 - t,
      (t = Math.round(255 * t)) &&
      (a |= t << 24),
      a
  },


  SDF.BlockIDtoUniqueID = function (e, t) {
    return t.WriteBlocks ? e : t.UniqueMap.indexOf(e) + 1
  },
  SDF.Write_SDF_C_VERSION = function (e, t, a) {
    var r = {
      FVersion: a,
      PVersion: SDF.SDF_PVERSION,
      Platform: t,
      MinVer: a,
      printres: SDF.PRINTRES,
      drawres: SDF.DRAWRES,
      LongFormat: 1,
      TrialVersion: 0,
      Unicode: 1
    },
      i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_VERSION);
    e.writeStruct(FileParser.SDF_VERSION_Struct, r),
      SDF.Write_LENGTH(e, i)
  },
  SDF.WriteHeader = function (e, t, a) {
    var r,
      i = FileParser.SDROpCodesByName,
      n = ConstantData.DocumentContext.PublishUrl;
    SDF.write_SDF_C_HEADER(e, t),
      SDF.write_SDF_C_PAGE(e, t),
      null == a &&
      (
        t.WriteBlocks ||
        SDF.BuildFontList(t),
        SDF.WriteFontList(e, t),
        SDF.WriteString(
          e,
          GlobalData.optManager.theContentHeader.importSourcePath,
          i.SDF_C_IMPORT_SOURCE_PATH,
          t
        ),
        SDF.WriteString(e, n, i.SDF_C_EXPORTPATH, t)
      ),
      null != a &&
      - 1 == a.indexOf(i.SDF_C_LEFTPANELINFO) ||
      SDF.WriteLeftPanelMode(e, t),
      null != a &&
      - 1 == a.indexOf(i.SDF_C_HILITELIST) ||
      SDF.WriteHiliteList(e, t),
      null != a &&
      - 1 == a.indexOf(i.SDF_C_TOOLPALETTES_BEGIN) ||
      SDF.WritePaletteList(e, t),
      (
        null == a ||
        - 1 != a.indexOf(i.SDF_C_LIBLIST) ||
        - 1 != a.indexOf(i.SDF_C_LIBLIST7)
      ) &&
      SDF.WriteLibraryListFromContentHeader(e, t),
      null != a &&
      - 1 == a.indexOf(i.SDF_C_HILITELIST) ||
      SDF.WriteHiliteList(e, t),
      false === true/* SDUI.AppSettings.NewUI*/ &&
      (
        null != a &&
        - 1 == a.indexOf(i.SDF_C_TASKPANEL) ||
        SDF.WriteString(
          e,
          GlobalData.optManager.theContentHeader.smartpanelname,
          i.SDF_C_TASKPANEL,
          t
        )
      ),
      null != a &&
      - 1 == a.indexOf(i.SDF_C_BUSINESSMODULE) ||
      SDF.WriteString(
        e,
        GlobalData.optManager.theContentHeader.BusinessModule,
        i.SDF_C_BUSINESSMODULE,
        t
      ),
      null != a &&
      - 1 == a.indexOf(i.SDF_C_SYMBOLSEARCHSTRING) ||
      SDF.WriteString(
        e,
        GlobalData.optManager.theContentHeader.SymbolSearchString,
        FileParser.SDROpCodesByName.SDF_C_SYMBOLSEARCHSTRING,
        t
      ),
      null != a &&
      - 1 == a.indexOf(i.SDF_C_HEAD_UIINFO) ||
      SDF.WriteUIInfo(e, t),
      null != a &&
      - 1 == a.indexOf(i.SDF_C_ORGCHARTTABLE) ||
      GlobalData.optManager.theContentHeader.orgcharttable.length &&
      (
        (
          r = ListManager.OrgChartTables.indexOf(GlobalData.optManager.theContentHeader.orgcharttable)
        ) >= 0 ? SDF.WriteString(
          e,
          ListManager.WinOrgChartTables[r],
          i.SDF_C_ORGCHARTTABLE,
          t
        ) : (
          r = ListManager.MindMapTables.indexOf(GlobalData.optManager.theContentHeader.orgcharttable)
        ) >= 0 &&
        SDF.WriteString(
          e,
          ListManager.WinMindMapTables[r],
          i.SDF_C_ORGCHARTTABLE,
          t
        ),
        r < 0 &&
        SDF.WriteString(
          e,
          GlobalData.optManager.theContentHeader.orgcharttable,
          i.SDF_C_ORGCHARTTABLE,
          t
        )
      ),
      null != a &&
      - 1 == a.indexOf(i.SDF_C_BEGIN_THEME12) ||
      SDF.WriteTheme(e, Resources.CurrentTheme, t),
      null == a &&
      SDF.WriteString(
        e,
        GlobalData.optManager.theContentHeader.smarthelpname,
        FileParser.SDROpCodesByName.SDF_C_GUIDE,
        t
      ),
      null == a &&
      GlobalData.optManager.theContentHeader.ParentPageID.length &&
      SDF.WriteString(
        e,
        GlobalData.optManager.theContentHeader.ParentPageID,
        FileParser.SDROpCodesByName.SDF_C_PARENTPAGEID,
        t
      ),
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_HEADER_END)
  },
  SDF.WriteString = function (e, t, a, r) {
    if (null != t && t.length) {
      var i = SDF.Write_CODE(e, a);
      e.writeUCS2String(t, T3DataStream.LITTLE_ENDIAN, t.length + 1),
        SDF.Write_LENGTH(e, i)
    }
  },
  SDF.WriteString8 = function (e, t, a, r) {
    if (t.length) {
      var i = SDF.Write_CODE(e, a);
      e.writeString(t, 'ASCII', t.length + 1),
        SDF.Write_LENGTH(e, i)
    }
  },
  SDF.WriteSelectHeader = function (e, t) {
    t.WriteGroupBlock ||
      SDF.BuildFontList(t),
      SDF.WriteFontList(e, t),
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_HEADER_END)
  },
  SDF.write_SDF_C_HEADER = function (e, t) {
    var a = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_HEADER),
      r = {
        flags: 0,
        worigin: {
          x: 0,
          y: 0
        },
        wscale: t.WindowSettings.wscale,
        wflags: t.WindowSettings.wflags,
        oleback: - 1,
        lworigin: {
          x: t.WindowSettings.worigin.x,
          y: t.WindowSettings.worigin.y
        },
        longflags: t.ctp.flags,
        dateformat: t.ctp.dateformat
      };
    e.writeStruct(FileParser.SDF_HEADER_Struct, r),
      SDF.Write_LENGTH(e, a)
  },
  SDF.write_SDF_C_PAGE = function (e, t) {
    var a = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_PAGE),
      r = {
        x: t.ctp.Page.papersize.x - 2 * ConstantData.Defines.DefMargin,
        y: t.ctp.Page.papersize.y - 2 * ConstantData.Defines.DefMargin
      };
    r.x = t.ctp.Page.minsize.x,
      r.y = t.ctp.Page.minsize.y;
    var i = {
      PadDim: {
        x: 0,
        y: 0
      },
      papersize: {
        x: 0,
        y: 0
      },
      margins: {
        left: SDF.ToSDWinCoords(t.ctp.Page.margins.left, t.coordScaleFactor),
        right: SDF.ToSDWinCoords(t.ctp.Page.margins.right, t.coordScaleFactor),
        top: SDF.ToSDWinCoords(t.ctp.Page.margins.top, t.coordScaleFactor),
        bottom: SDF.ToSDWinCoords(t.ctp.Page.margins.bottom, t.coordScaleFactor)
      },
      minmarg: {
        left: ConstantData.Defines.DefMargin * t.coordScaleFactor,
        right: ConstantData.Defines.DefMargin * t.coordScaleFactor,
        top: ConstantData.Defines.DefMargin * t.coordScaleFactor,
        bottom: ConstantData.Defines.DefMargin * t.coordScaleFactor
      },
      landscape: t.ctp.Page.landscape,
      wpapersize: 1,
      overlap: 0,
      printflags: t.ctp.Page.printflags,
      lPadDim: {
        x: SDF.ToSDWinCoords(t.sdp.dim.x, t.coordScaleFactor),
        y: SDF.ToSDWinCoords(t.sdp.dim.y, t.coordScaleFactor)
      },
      lpapersize: {
        x: SDF.ToSDWinCoords(t.ctp.Page.papersize.x, t.coordScaleFactor),
        y: SDF.ToSDWinCoords(t.ctp.Page.papersize.y, t.coordScaleFactor)
      },
      MinSize: {
        x: SDF.ToSDWinCoords(r.x, t.coordScaleFactor),
        y: SDF.ToSDWinCoords(r.y, t.coordScaleFactor)
      },
      printscale: t.ctp.Page.printscale
    },
      n = {
        margins: {
          left: SDF.ToSDWinCoords(t.ctp.Page.margins.left, t.coordScaleFactor),
          right: SDF.ToSDWinCoords(t.ctp.Page.margins.right, t.coordScaleFactor),
          top: SDF.ToSDWinCoords(t.ctp.Page.margins.top, t.coordScaleFactor),
          bottom: SDF.ToSDWinCoords(t.ctp.Page.margins.bottom, t.coordScaleFactor)
        },
        minmarg: {
          left: ConstantData.Defines.DefMargin * t.coordScaleFactor,
          right: ConstantData.Defines.DefMargin * t.coordScaleFactor,
          top: ConstantData.Defines.DefMargin * t.coordScaleFactor,
          bottom: ConstantData.Defines.DefMargin * t.coordScaleFactor
        },
        landscape: t.ctp.Page.landscape,
        printflags: t.ctp.Page.printflags,
        lPadDim: {
          x: SDF.ToSDWinCoords(t.sdp.dim.x, t.coordScaleFactor),
          y: SDF.ToSDWinCoords(t.sdp.dim.y, t.coordScaleFactor)
        },
        lpapersize: {
          x: SDF.ToSDWinCoords(t.ctp.Page.papersize.x, t.coordScaleFactor),
          y: SDF.ToSDWinCoords(t.ctp.Page.papersize.y, t.coordScaleFactor)
        },
        MinSize: {
          x: SDF.ToSDWinCoords(r.x, t.coordScaleFactor),
          y: SDF.ToSDWinCoords(r.y, t.coordScaleFactor)
        },
        printscale: t.ctp.Page.printscale
      };
    t.WriteVisio ||
      t.WriteWin32 ? e.writeStruct(FileParser.SDF_PAGE_Struct_62, i) : e.writeStruct(FileParser.SDF_PAGE_Struct_126, n),
      SDF.Write_LENGTH(e, a)
  },
  SDF.JStoWinLineTool = function (e) {
    var t = SDUI.WindowsLineTools.indexOf(e);
    return t < 0 &&
      (t = 0),
      t === SDUI.WindowsLineTools.indexOf(Resources.LineToolTypes.PolyLine) &&
      t++,
      t
  },
  SDF.JStoWinShapeTool = function (e) {
    var t = SDUI.WindowsShapeTools.indexOf(e);
    return t < 0 &&
      (t = 0),
      t
  },



  SDF.WriteUIInfo = function (e, t) {
    if (e) var a = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_HEAD_UIINFO);
    var r = 0,
      i = 0,
      n = 0,
      o = 0,
      s = 0;
    ConstantData.DocumentContext.CollapseTools &&
      (s = 1),
      ConstantData.DocumentContext.AutoContainer &&
      (r = 1),
      ConstantData.DocumentContext.ActAsContainer &&
      (i = 1),
      ConstantData.DocumentContext.SwimlaneRotate &&
      (n = 1),
      ConstantData.DocumentContext.SwimlaneTitle &&
      (o = 1);
    var l = {
      linetoolindex: SDF.JStoWinLineTool(ConstantData.DocumentContext.LineTool),
      shapetoolindex: ConstantData.DocumentContext.ShapeTool,
      datetime2007: 0,
      holidaymask: GlobalData.optManager.theContentHeader.holidaymask,
      datetime1: 0,
      datetime2: 0,
      nonworkingdays: GlobalData.optManager.theContentHeader.nonworkingdays,
      swimlaneformat: ConstantData.DocumentContext.SwimlaneFormat,
      autocontainer: r,
      actascontainer: i,
      swimlanenlanes: ConstantData.DocumentContext.SwimlaneNLanes,
      swimlanenvlanes: ConstantData.DocumentContext.SwimlaneNVLanes,
      swimlanerotate: n,
      swimlanetitle: o,
      collapsetools: s
    };
    if (!e) return l;
    e.writeStruct(FileParser.SDF_UIInfo_Struct_60, l),
      SDF.Write_LENGTH(e, a)
  },
  SDF.WriteSearchResultLibrary = function (e, t, a) {
    var r,
      i,
      n;
    for (
      i = a.Items.length,
      SDF.WriteString(
        e,
        a.ItemId,
        FileParser.SDROpCodesByName.SDF_C_SEARCHLIB,
        t
      ),
      SDF.WriteString(
        e,
        a.ContentTitle,
        FileParser.SDROpCodesByName.SDF_C_SEARCHLIB_NAME,
        t
      ),
      r = 0;
      r < i;
      r++
    ) n = a.Items[r],
      SDF.WriteString(
        e,
        n.ItemId,
        FileParser.SDROpCodesByName.SDF_C_SEARCHLIBSYMBOL_ID,
        t
      ),
      SDF.WriteString(
        e,
        n.ContentTitle,
        FileParser.SDROpCodesByName.SDF_C_SEARCHLIBSYMBOL_NAME,
        t
      );
    e.writeUint16(FileParser.SDROpCodesByName.SDF_C_SEARCHLIB_END)
  },
  SDF.WriteLibraryListFromContentHeader = function (e, t) {
    var a,
      r,
      i,
      n,
      o = GlobalData.optManager.theContentHeader.lp_list;
    r = o.lib.length,
      o.selected;
    var s = {
      selected: 0,
      nacross: 3
    },
      l = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_LIBLIST);
    e.writeStruct(FileParser.SDF_LibList_Struct, s),
      SDF.Write_LENGTH(e, l);
    var S,
      c = SDUI.Commands.MainController.Symbols.GetSelectedButton();
    for (
      null != c &&
      gBusinessManager.UsesCurrentSymbol() &&
      SDF.WriteString(
        e,
        c,
        FileParser.SDROpCodesByName.SDF_C_CURRENTSYMBOL_ID,
        t
      ),
      a = 0;
      a < r;
      a++
    ) null != o.lib[a] &&
      (
        o.lib[a].SearchResults ? (
          n = SDUI.Commands.MainController.Symbols.GetLibrary(o.lib[a].libGuid)
        ) &&
          SDF.WriteSearchResultLibrary(e, t, n) : o.lib[a].libGuid ? SDF.WriteString(
            e,
            o.lib[a].libGuid,
            FileParser.SDROpCodesByName.SDF_C_LIBLIST_GUID,
            t
          ) : (i = o.lib[a].libname) &&
        SDF.WriteString(e, i, FileParser.SDROpCodesByName.SDF_C_LIBLIST_PATH, t),
        o.lib[a].Collapsed &&
        SDF.WriteLongValue(e, FileParser.SDROpCodesByName.SDF_C_LIB_COLLAPSED, 1, t)
      );
    for (
      r = SDUI.Commands.MainController.Symbols.SymbolSearch_GetNumberOfLibraries(),
      a = 0;
      a < r;
      a++
    ) (
      S = SDUI.Commands.MainController.Symbols.SymbolSearch_GetLibraryInfo(a)
    ).ID.length > 0 &&
      (
        SDF.WriteString(
          e,
          S.ID,
          FileParser.SDROpCodesByName.SDF_C_LIBLIST_SEARCH_RESULT_ID,
          t
        ),
        S.Collapsed &&
        SDF.WriteLongValue(
          e,
          FileParser.SDROpCodesByName.SDF_C_SEARCHLIB_COLLAPSED,
          1,
          t
        ),
        S.Hidden &&
        SDF.WriteLongValue(
          e,
          FileParser.SDROpCodesByName.SDF_C_SEARCHLIB_HIDDEN,
          1,
          t
        )
      );
    e.writeUint16(FileParser.SDROpCodesByName.SDF_C_LIBLIST_END)
  }

SDF.WritePaletteList = function (e, t) {
  var a = SDUI.Commands.MainController.SmartPanels.GetPaletteList();
  if (a.length) {
    var r,
      i,
      n,
      o = a.length,
      s = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TOOLPALETTES_BEGIN);
    for (SDF.Write_LENGTH(e, s), r = 0; r < o; r++) SDF.WriteString(
      e,
      a[r].Name,
      FileParser.SDROpCodesByName.SDF_C_TOOLPALETTES_NAME,
      t
    ),
      n = SDF.Write_CODE(
        e,
        FileParser.SDROpCodesByName.SDF_C_TOOLPALETTES_COLLAPSED
      ),
      i = {
        value: a[r].Collapsed
      },
      e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, n);
    e.writeUint16(FileParser.SDROpCodesByName.SDF_C_TOOLPALETTES_END)
  }
}

SDF.WriteLeftPanelMode = function (e, t) {
  var a = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_LEFTPANELINFO),
    r = {
      value: SDUI.Commands.MainController.SmartPanels.GetLeftPanelMode()
    };
  e.writeStruct(FileParser.LONGVALUE_Struct, r),
    SDF.Write_LENGTH(e, a)
},
  SDF.WriteNativeID = function (e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_NATIVEID),
      i = {
        value: t
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, r)
  },
  SDF.WriteTableID = function (e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TABLEID),
      i = {
        value: t
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, r)
  },
  SDF.WriteLongValue = function (e, t, a, r) {
    var i = SDF.Write_CODE(e, t),
      n = {
        value: a
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, n),
      SDF.Write_LENGTH(e, i)
  },
  SDF.WriteGraphID = function (e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPHID),
      i = {
        value: t
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, r)
  },
  SDF.WriteExpandedViewID = function (e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_EXPANDEDVIEWID),
      i = {
        value: t
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, r)
  },
  SDF.WriteGanttInfoID = function (e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GANTTINFOID),
      i = {
        value: t
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, r)
  },
  SDF.WriteCellNoteID = function (e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_NOTEID),
      i = {
        value: t
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, r)
  },
  SDF.WriteBlobBytesID = function (e, t, a, r) {
    var i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_IMAGEID),
      n = {
        value: t,
        type: a
      };
    e.writeStruct(FileParser.LONGVALUE2_Struct, n),
      SDF.Write_LENGTH(e, i)
  },
  SDF.WriteEMFBlobBytesID = function (e, t, a, r) {
    var i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_EMFID),
      n = {
        value: t,
        type: a
      };
    e.writeStruct(FileParser.LONGVALUE2_Struct, n),
      SDF.Write_LENGTH(e, i)
  },
  SDF.WriteOleBlobBytesID = function (e, t, a, r) {
    var i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_OLESTORAGEID),
      n = {
        value: t,
        type: a
      };
    e.writeStruct(FileParser.LONGVALUE2_Struct, n),
      SDF.Write_LENGTH(e, i)
  },
  SDF.GetFontID = function (e, t) {
    var a,
      r;
    for (a = t.length, r = 0; r < a; r++) if (e === t[r].fontName) return r;
    return 0
  },
  SDF.BuildBlockFontList = function (e) {
    var t,
      a,
      r;
    for (t = Resources.WebFonts.length, a = 0; a < t; a++) r = new SDF.FontRecord(
      a,
      Resources.WebFonts[a].Name,
      Resources.WebFonts[a].Category
    ),
      e.fontlist.push(r)
  },
  SDF.BuildFontList = function (e) {
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
      p;
    function d(t, a) {
      var r,
        i,
        n;
      if (null != t) {
        for (i = e.fontlist.length, r = 0; r < i; r++) if (t === e.fontlist[r].fontName) return r;
        return n = new SDF.FontRecord(i, t, a),
          e.fontlist.push(n),
          i
      }
    }
    for (
      e.sdp &&
      d(e.sdp.def.style.Text.FontName, e.sdp.def.style.Text.FontType),
      t = (l = e.zList).length,
      n = 0;
      n < t;
      n++
    ) {
      if (
        S = (r = GlobalData.optManager.GetObjectPtr(l[n], !1)) ? r.GetTable(!1) : null,
        d(r.StyleRecord.Text.FontName, r.StyleRecord.Text.FontType),
        r &&
        r.DataID >= 0 &&
        (i = GlobalData.optManager.GetObjectPtr(r.DataID, !1))
      ) for (o = (s = i.runtimeText).styles.length, a = 0; a < o; a++) d(s.styles[a].font, s.styles[a].type);
      if (r && r.NoteID >= 0 && (i = GlobalData.optManager.GetObjectPtr(r.NoteID, !1))) for (o = (s = i.runtimeText).styles.length, a = 0; a < o; a++) d(s.styles[a].font, s.styles[a].type);
      if (S) for (u = S.cells.length, p = 0; p < u; p++) {
        if (
          d((c = S.cells[p]).Text.FontName, c.Text.FontType),
          c.DataID >= 0 &&
          (i = GlobalData.optManager.GetObjectPtr(c.DataID, !1))
        ) for (o = (s = i.runtimeText).styles.length, a = 0; a < o; a++) d(s.styles[a].font, s.styles[a].type);
        if (c.NoteID >= 0 && (i = GlobalData.optManager.GetObjectPtr(c.NoteID, !1))) for (o = (s = i.runtimeText).styles.length, a = 0; a < o; a++) d(s.styles[a].font, s.styles[a].type)
      }
    }
  },
  SDF.FontRecToLogFont = function (e, t, a) {
    var r = 0;
    switch (e.fontType) {
      case 'serif':
        r = FileParser.FontFamily.FF_ROMAN;
        break;
      case 'sanserif':
        r = FileParser.FontFamily.FF_SWISS;
        break;
      case 'fixed':
        r = FileParser.FontFamily.FF_MODERN;
        break;
      case 'script':
        r = FileParser.FontFamily.FF_SCRIPT;
        break;
      case 'decorative':
        r = FileParser.FontFamily.FF_DECORATIVE
    }
    var i = {
      id: t,
      lfCharSet: 0,
      lfFaceName: e.fontName,
      lfHeight: - 36,
      lfWidth: 0,
      lfEscapement: 0,
      lfOrientation: 0,
      lfWeight: 400,
      lfItalic: 0,
      lfUnderline: 0,
      lfStrikeOut: 0,
      lfOutPrecision: 3,
      lfClipPrecision: 2,
      lfQuality: 1,
      lfPitchAndFamily: r,
      dummy: 0
    };
    return e.fontSize &&
      (i.lfHeight = 100 * e.fontSize * a.coordScaleFactor / 72),
      e.face &&
      (
        e.face & ConstantData.TextFace.Italic &&
        (i.lfItalic = 1),
        e.face & ConstantData.TextFace.Bold &&
        (i.lfWeight = 700)
      ),
      i
  },


  SDF.JSJustToWin = function (e) {
    var t;
    switch (e) {
      case 'top':
        t = FileParser.TextJust.TA_TOP;
        break;
      case 'left':
        t = FileParser.TextJust.TA_LEFT;
        break;
      case 'bottom':
        t = FileParser.TextJust.TA_BOTTOM;
        break;
      case 'right':
        t = FileParser.TextJust.TA_RIGHT;
        break;
      default:
        t = FileParser.TextJust.TA_CENTER
    }
    return t
  },

  SDF.WriteFontList = function (e, t) {
    var a,
      r,
      i,
      n,
      o;
    for (
      a = t.fontlist.length,
      r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_FONTLIST),
      e.writeUint16(a),
      SDF.Write_LENGTH(e, r),
      i = 0;
      i < a;
      i++
    ) n = SDF.FontRecToLogFont(t.fontlist[i], i, t),
      o = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_FONTNAME15),
      e.writeStruct(FileParser.SDF_FONTNAME15_Struct, n),
      SDF.Write_LENGTH(e, o);
    e.writeUint16(FileParser.SDROpCodesByName.SDF_C_FONTLIST_END)
  },
  SDF.WriteHiliteList = function (e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l = [];
    if (
      null != t.LibraryPathTarget &&
      !((a = t.LibraryPathTarget.length) < 2)
    ) {
      n = 'SYMBOL LIBRARIES',
        l.push(n),
        o = n = t.LibraryPathTarget.slice(1, a);
      do {
        (s = o.split('\\')).length > 1 &&
          (l.push(s[0].toUpperCase()), o = s[1])
      } while (s.length >= 2);
      for (
        l.push(n.toUpperCase()),
        a = l.length,
        r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_HILITELIST),
        e.writeUint32(a),
        SDF.Write_LENGTH(e, r),
        i = 0;
        i < a;
        i++
      ) r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_HILITE),
        e.writeUint32(0),
        e.writeUint32(0),
        e.writeUCS2String(l[i], T3DataStream.LITTLE_ENDIAN, l[i].length + 1),
        SDF.Write_LENGTH(e, r);
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_HILITELIST_END)
    }
  },
  SDF.WriteLogFont = function (e, t, a, r) {
    var i = 0;
    switch (t.fontType) {
      case 'serif':
        i = FileParser.FontFamily.FF_ROMAN;
        break;
      case 'sanserif':
        i = FileParser.FontFamily.FF_SWISS;
        break;
      case 'fixed':
        i = FileParser.FontFamily.FF_MODERN;
        break;
      case 'script':
        i = FileParser.FontFamily.FF_SCRIPT;
        break;
      case 'decorative':
        i = FileParser.FontFamily.FF_DECORATIVE
    }
    var n = {
      lfHeight: - 36,
      lfWidth: 0,
      lfEscapement: 0,
      lfOrientation: 0,
      lfWeight: 400,
      lfItalic: 0,
      lfUnderline: 0,
      lfStrikeOut: 0,
      lfCharSet: 0,
      lfOutPrecision: 3,
      lfClipPrecision: 2,
      lfQuality: 1,
      lfPitchAndFamily: i,
      lfFaceName: t.fontName
    };
    t.fontSize &&
      (n.lfHeight = - 100 * t.fontSize * r.coordScaleFactor / 72),
      t.face &&
      (
        t.face & ConstantData.TextFace.Italic &&
        (n.lfItalic = 1),
        t.face & ConstantData.TextFace.Bold &&
        (n.lfWeight = 700),
        t.face & ConstantData.TextFace.Underline &&
        (n.lfUnderline = 1)
      );
    var o = SDF.Write_CODE(e, a);
    e.writeStruct(FileParser.SDF_LOGFONT_Struct, n),
      SDF.Write_LENGTH(e, o)
  },
  SDF.WriteTextureList = function (e, t, a) {
    if (0 !== a.TextureList.length) {
      var r = FileParser.SDROpCodesByName,
        i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_O_TEXTURELIST);
      e.writeUint32(0),
        SDF.Write_LENGTH(e, i);
      var n,
        o,
        s,
        l,
        S = [];
      for (o = a.TextureList.length, n = 0; n < o; n++) l = (s = t.Textures[a.TextureList[n]]).categoryindex,
        - 1 === S.indexOf(l) &&
        S.push(l);
      var c = S.length;
      for (n = 0; n < c; n++) SDF.WriteString(e, t.Categories[S[n]], r.SDF_O_TEXTURECATNAME, a);
      var u,
        p,
        d,
        D = {};
      for (n = 0; n < o; n++) s = t.Textures[a.TextureList[n]],
        d = S.indexOf(s.categoryindex),
        D = {
          dim: {
            x: SDF.ToSDWinCoords(s.dim.x, a.coordScaleFactor),
            y: SDF.ToSDWinCoords(s.dim.y, a.coordScaleFactor)
          },
          mr: {
            left: s.mr.left,
            top: s.mr.top,
            right: s.mr.right,
            bottom: s.mr.bottom
          },
          imagetype: s.imagetype,
          flags: s.flags
        },
        u = SDF.Write_CODE(e, r.SDF_O_TEXTURE),
        e.writeStruct(FileParser.SDF_TEXTURE_Struct, D),
        SDF.Write_LENGTH(e, u),
        p = {
          categoryindex: d,
          units: s.TextureScale.Units,
          scale: s.TextureScale.Scale,
          rwidth: s.TextureScale.RWidth,
          alignment: s.TextureScale.AlignmentScalar,
          flags: s.TextureScale.Flags
        },
        u = SDF.Write_CODE(e, r.SDF_O_TEXTUREEXTRA),
        e.writeStruct(FileParser.SDF_TextureExtra_Struct, p),
        SDF.Write_LENGTH(e, u),
        SDF.WriteString(e, s.name, r.SDF_O_TEXTURENAME, a),
        0 == (s.flags & Resources.TextureFlags.SD_Tx_Std) &&
        s.BlobBytes &&
        SDF.WriteBlob(e, s.BlobBytes, r.SDF_O_TEXTUREDATA);
      e.writeUint16(r.SDF_O_TEXTURELIST_END)
    }
  },
  SDF.SetHookByJust = function (e, t, a) {
    var r,
      i = FileParser.TextJust,
      n = ConstantData.HookPts,
      o = ConstantData.TextFlags,
      s = ConstantData.Defines.SED_CDim,
      l = {
        hookpt: 0,
        attach: 0
      };
    switch (e) {
      case i.TA_LEFT:
        switch (t) {
          case i.TA_TOP:
            r = n.SED_KCBL,
              l.attach = o.SED_TF_AttachA;
            break;
          case i.TA_BOTTOM:
            l.attach = o.SED_TF_AttachB,
              r = n.SED_KCTL;
            break;
          default:
            l.attach = o.SED_TF_AttachC,
              r = n.SED_KCL
        }
        a.x = 0,
          a.y = 0;
        break;
      case i.TA_RIGHT:
        switch (t) {
          case i.TA_TOP:
            r = n.SED_KCBR,
              l.attach = o.SED_TF_AttachA;
            break;
          case i.TA_BOTTOM:
            l.attach = o.SED_TF_AttachB,
              r = n.SED_KCTR;
            break;
          default:
            l.attach = o.SED_TF_AttachC,
              r = n.SED_KCR
        }
        a.x = s,
          a.y = s;
        break;
      default:
        switch (t) {
          case i.TA_TOP:
            l.attach = o.SED_TF_AttachA,
              r = n.SED_KCB;
            break;
          case i.TA_BOTTOM:
            l.attach = o.SED_TF_AttachB,
              r = n.SED_KCT;
            break;
          default:
            l.attach = o.SED_TF_AttachC,
              r = n.SED_KCC
        }
        a.x = s / 2,
          a.y = s / 2
    }
    return l.hookpt = r,
      l
  },
  SDF.WriteDraw = function (e, t) {
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
      g = {},
      h = - 1,
      m = - 1,
      C = ConstantData.ConnectorDefines.SEDA_NSkip;
    for (
      SDF.BuildStyleList(t),
      a = t.sdp,
      SDF.write_SDF_C_DRAW12(e, t),
      SDF.WriteStyle(e, a.def.style, !0, t, null),
      SDF.WriteSDLine(
        e,
        a.def.style.Line,
        t,
        FileParser.SDROpCodesByName.SDF_C_BEGIN_LINE,
        null
      ),
      SDF.WriteSDFill(e, a.background, t),
      SDF.WriteRulers(e, t),
      SDF.WriteRecentList(e, t),
      SDF.WriteLayers(e, t),
      SDF.WriteLinks(e, t),
      SDF.WriteTextureList(e, GlobalData.optManager.TextureList, t),
      SDF.WriteStyleList(e, t.lpStyles, !1, t),
      t.TextStyleIndex >= 0 &&
      (
        g.Frame = {
          x: 0,
          y: 0,
          width: 100,
          height: 30
        },
        (o = new ListManager.Rect(g)).tstyleindex = t.TextStyleIndex,
        o.flags = Utils2.SetFlag(o.flags, ConstantData.ObjFlags.SEDO_Assoc, !0),
        o.flags = Utils2.SetFlag(o.flags, ConstantData.ObjFlags.SEDO_TextOnly, !0),
        o.TextGrow = ConstantData.TextGrowBehavior.HORIZONTAL,
        o.hooks.push(new Hook(0, null, - 1, 0, {
          x: 0,
          y: 0
        })),
        o.StyleRecord = Utils1.DeepCopy(t.lpStyles[t.TextStyleIndex])
      ),
      r = t.UniqueMap.length,
      i = 0;
      i < r;
      i++
    ) {
      if ((D = t.UniqueMap[i]) < 0) {
        if (
          o.DataID = - D,
          o.TextFlags = 0,
          o.associd = m,
          o.TextGrow = ConstantData.TextGrowBehavior.HORIZONTAL,
          o.Frame.width = 100,
          o.inside.width = 100,
          o.trect.width = 100,
          o.r.width = 100,
          h >= 0
        ) {
          for (
            o.associd = m,
            d = (n = GlobalData.optManager.GetObjectPtr(t.UniqueMap[h], !1)).arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
            s = SDF.TextAlignToWin(n.TextAlign),
            l = SDF.SetHookByJust(s.just, s.vjust, o.hooks[0].connect),
            o.hooks[0].hookpt = l.hookpt,
            o.hooks[0].objid = t.UniqueMap[h],
            S = - D,
            u = n.arraylist.hook.length,
            o.hooks[0].connect.y = 1,
            c = 0;
            c < u;
            c++
          ) {
            if (p = n.arraylist.hook[c], d && c >= C) {
              if (!(c < u - 1)) break;
              p = n.arraylist.hook[c + 1]
            }
            if (p.textid === S) {
              o.hooks[0].connect.x = c >= C ? c - C : - c;
              break
            }
          }
          s.vjust === FileParser.TextJust.TA_CENTER ? o.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID : o.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT
        } else (n = GlobalData.optManager.GetObjectPtr(t.UniqueMap[i - 1], !1)) &&
          n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE ? (
          s = SDF.TextAlignToWin(n.TextAlign),
          l = SDF.SetHookByJust(s.just, s.vjust, o.hooks[0].connect),
          o.hooks[0].hookpt = l.hookpt,
          o.hooks[0].objid = t.UniqueMap[i - 1],
          o.StyleRecord.Fill.Paint = $.extend(!0, {
          }, n.StyleRecord.Fill.Paint),
          n.TextGrow === ConstantData.TextGrowBehavior.VERTICAL &&
          (
            o.TextGrow = n.TextGrow,
            o.Frame.width = n.TextWrapWidth,
            o.inside.width = n.TextWrapWidth,
            o.trect.width = n.TextWrapWidth,
            o.r.width = n.TextWrapWidth
          )
        ) : n &&
          n.TextFlags & ConstantData.TextFlags.SED_TF_AttachB ? (
          o.hooks[0].hookpt = ConstantData.HookPts.SED_KTC,
          o.hooks[0].connect = new Point(
            ConstantData.Defines.SED_CDim / 2,
            ConstantData.Defines.SED_CDim
          ),
          o.hooks[0].objid = t.UniqueMap[i - 1],
          o.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT
        ) : n &&
        n.TextFlags & ConstantData.TextFlags.SED_TF_AttachA &&
        (
          o.hooks[0].hookpt = ConstantData.HookPts.SED_KBC,
          o.hooks[0].connect = new Point(ConstantData.Defines.SED_CDim / 2, 0),
          o.hooks[0].objid = t.UniqueMap[i - 1],
          o.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT
        );
        n = o
      } else (n = GlobalData.optManager.GetObjectPtr(D, !1)) &&
        (
          n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ? (h = i, m = n.BlockID) : (h = - 1, m = n.BlockID)
        );
      n &&
        SDF.WriteObject(e, i, n, t)
    }
    0 == t.WriteBlocks &&
      0 == t.selectonly &&
      SDF.WriteCommentList(e, t),
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_DRAW12_END)
  },
  SDF.WriteRulers = function (e, t) {
    var a = {
      show: t.rulerSettings.show,
      inches: t.rulerSettings.useInches,
      Major: SDF.ToSDWinCoords(t.rulerSettings.major, t.coordScaleFactor),
      MajorScale: t.rulerSettings.majorScale,
      MinorDenom: t.rulerSettings.nTics,
      units: t.rulerSettings.units,
      dp: t.rulerSettings.dp,
      originx: t.rulerSettings.originx,
      originy: t.rulerSettings.originy,
      showpixels: t.rulerSettings.showpixels,
      fractionaldenominator: t.rulerSettings.fractionaldenominator
    },
      r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_O_RULER);
    e.writeStruct(FileParser.SDF_RULER_Struct_52, a),
      SDF.Write_LENGTH(e, r)
  },
  SDF.WriteRecentList = function (e, t) {
    if (
      t.sdp.RecentSymbols &&
      t.sdp.RecentSymbols.length > 0 &&
      0 == t.WriteGroupBlock
    ) {
      var a = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_RECENTSYMBOLS_BEGIN);
      SDF.Write_LENGTH(e, a);
      var r,
        i,
        n,
        o = t.sdp.RecentSymbols.length;
      for (r = 0; r < o; r++) i = t.sdp.RecentSymbols[r],
        SDF.WriteString(
          e,
          i.ItemId,
          FileParser.SDROpCodesByName.SDF_C_RECENTSYMBOL_ID,
          t
        ),
        n = i.NoMenu ? '1' : '0',
        SDF.WriteString(
          e,
          n,
          FileParser.SDROpCodesByName.SDF_C_RECENTSYMBOL_NOMENU,
          t
        ),
        SDF.WriteString(
          e,
          i.ContentTitle,
          FileParser.SDROpCodesByName.SDF_C_RECENTSYMBOL_NAME,
          t
        );
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_RECENTSYMBOLS_END)
    }
  },
  SDF.WriteLayers = function (e, t) {
    var a,
      r,
      i = t.tLMB.nlayers,
      n = t.tLMB.layers,
      o = null,
      s = {
        n: 0,
        zList: []
      },
      l = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_BEGIN_LAYER);
    for (SDF.Write_LENGTH(e, l), a = 0; a < i; ++a) o = n[a],
      r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_LAYERFLAGS),
      e.writeUint32(o.flags),
      SDF.Write_LENGTH(e, r),
      SDF.WriteString(e, o.name, FileParser.SDROpCodesByName.SDF_C_LAYERNAME, t),
      r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_LAYERTYPE),
      e.writeUint32(o.layertype),
      SDF.Write_LENGTH(e, r),
      t.WriteBlocks &&
      (
        s.n = o.zList.length,
        s.zList = o.zList,
        r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_LAYERLIST),
        e.writeStruct(FileParser.SDF_LayerList_Struct, s),
        SDF.Write_LENGTH(e, r)
      );
    e.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_LAYER)
  },
  SDF.WriteLinks = function (e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c = {};
    if (
      n = t.links,
      l = t.textlinks,
      a = t.links.length,
      s = t.textlinks.length,
      a ||
      s ||
      t.WriteBlocks
    ) {
      for (c = {
        n: a + s,
        size: 14,
        links: []
      }, r = 0; r < a; r++) null == (o = n[r].cellid) &&
        (o = ConstantData.Defines.SED_DNULL),
        S = {
          targetid: SDF.BlockIDtoUniqueID(n[r].targetid, t),
          tindex: - 1,
          hookid: SDF.BlockIDtoUniqueID(n[r].hookid, t),
          hindex: - 1,
          flags: n[r].flags,
          cellid: o
        },
        c.links.push(S);
      for (r = 0; r < s; r++) o = ConstantData.Defines.SED_DNULL,
        S = {
          targetid: l[r].targetid,
          tindex: - 1,
          hookid: l[r].hookid,
          hindex: - 1,
          flags: 0,
          cellid: o
        },
        c.links.push(S);
      i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWLINK),
        e.writeStruct(FileParser.SDF_LinkList_Struct, c),
        SDF.Write_LENGTH(e, i)
    }
  },
  SDF.BuildStyleList = function (e) {
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
      p;
    function d(t) {
      var a,
        r,
        i;
      for (r = e.lpStyles.length, a = 0; a < r; a++) if (t.Name === e.lpStyles[a].Name) return a;
      return i = Utils1.DeepCopy(t),
        e.lpStyles.push(i),
        r
    }
    t = (n = e.zList).length;
    var D = Resources.FindStyle(ConstantData.Defines.TextBlockStyle),
      g = Utils1.DeepCopy(D),
      h = Utils1.DeepCopy(D);
    for (
      null == D.Line &&
      (
        g.Line = Utils1.DeepCopy(D.Border),
        h.Line = Utils1.DeepCopy(D.Border)
      ),
      g.Line.Thickness = 0,
      g.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID,
      g.Fill.Paint.Color = e.sdp.background.Paint.Color,
      s = 0,
      r = 0;
      r < t;
      r++
    ) {
      if (
        (a = GlobalData.optManager.GetObjectPtr(n[r], !1)).tstyleindex = d(a.StyleRecord),
        p = a.GetTable(!1)
      ) {
        var m = p.cells.length;
        for (c = 0; c < m; c++) u = p.cells[c],
          h.Name = u.stylename,
          h.Fill = Utils1.DeepCopy(u.fill),
          h.Line = Utils1.DeepCopy(u.hline),
          h.Text = Utils1.DeepCopy(u.Text),
          u.tstyleindex = d(h)
      }
      if (
        e.UniqueMap.push(n[r]),
        s++,
        (
          a.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE ||
          a.TextFlags & ConstantData.TextFlags.SED_TF_AttachB ||
          a.TextFlags & ConstantData.TextFlags.SED_TF_AttachA
        ) &&
        a.DataID > 0 &&
        !e.WriteVisio &&
        (
          e.UniqueMap.push(- a.DataID),
          s++,
          null == e.TextStyleIndex &&
          (e.TextStyleIndex = d(g)),
          o = new Link(s - 1, s, null),
          e.textlinks.push(o)
        ),
        !e.WriteVisio
      ) {
        var C = a.GetTextIDs();
        for (i = C.length, S = s, l = 0; l < i; l++) e.UniqueMap.push(- C[l]),
          s++,
          null == e.TextStyleIndex &&
          (e.TextStyleIndex = d(g)),
          o = new Link(S, s, null),
          e.textlinks.push(o)
      }
    }
  },
  SDF.write_SDF_C_DRAW12 = function (e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u = [],
      p = new SEDGraphDefault(),
      d = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAW12);
    a = t.UniqueMap.length,
      r = t.links.length + t.textlinks.length,
      n = t.sdp,
      o = t.tLMB,
      i = n.tselect >= 0 ? t.WriteBlocks ? n.tselect : SDF.BlockIDtoUniqueID(n.tselect, t) : - 1,
      s = n.centersnapalign ? 1 : 0,
      u.push(n.def.lf),
      l = SDF.FontRecToLogFont(u[0], 0, t),
      S = n.d_sarrow,
      n.d_sarrowdisp &&
      (S += FileParser.ArrowMasks.ARROW_DISP),
      c = n.d_earrow,
      n.d_earrowdisp &&
      (c += FileParser.ArrowMasks.ARROW_DISP);
    var D = {
      nobjects: a,
      ngroups: 0,
      nlinks: r,
      dim: {
        x: SDF.ToSDWinCoords(t.sdp.dim.x, t.coordScaleFactor),
        y: SDF.ToSDWinCoords(t.sdp.dim.y, t.coordScaleFactor)
      },
      flags: t.sdp.flags,
      tselect: i,
      unique: a,
      dupdisp: {
        x: SDF.ToSDWinCoords(t.sdp.dupdisp.x, t.coordScaleFactor),
        y: SDF.ToSDWinCoords(t.sdp.dupdisp.y, t.coordScaleFactor)
      },
      just: SDF.JSJustToWin(n.def.just),
      vjust: SDF.JSJustToWin(n.def.vjust),
      d_sarrow: S,
      d_earrow: c,
      d_arrowsize: n.d_arrowsize,
      snapalign: s,
      lf: l,
      hopstyle: n.hopstyle,
      hopdim: {
        x: SDF.ToSDWinCoords(t.sdp.hopdim.x, t.coordScaleFactor),
        y: SDF.ToSDWinCoords(t.sdp.hopdim.y, t.coordScaleFactor)
      },
      defflags: n.def.flags,
      dimensions: n.dimensions,
      shapedimensions: n.shapedimensions,
      activelayer: o.activelayer,
      tmargins: {
        left: SDF.ToSDWinCoords(n.def.tmargins.left, t.coordScaleFactor),
        right: SDF.ToSDWinCoords(n.def.tmargins.right, t.coordScaleFactor),
        top: SDF.ToSDWinCoords(n.def.tmargins.top, t.coordScaleFactor),
        bottom: SDF.ToSDWinCoords(n.def.tmargins.bottom, t.coordScaleFactor)
      },
      textgrow: n.def.textgrow,
      textflags: n.def.textflags,
      fsize_min: n.def.fsize_min,
      styleindex: - 1,
      h_arraywidth: SDF.ToSDWinCoords(n.def.h_arraywidth, t.coordScaleFactor),
      v_arraywidth: SDF.ToSDWinCoords(n.def.v_arraywidth, t.coordScaleFactor),
      lastcommand: n.def.lastcommand,
      graphtype: p.type,
      graphflags: p.flags,
      graphpointflags: p.pointflags,
      graphcataxisflags: p.catAxisflags,
      graphmagaxisflags: p.magAxisflags,
      graphlegendtype: p.legendType,
      graphlegendlayoutflags: p.legendlayoutflags,
      graphimagevaluerep: p.imagevaluerep,
      graphquadrant: p.quadrant,
      arraywd: SDF.ToSDWinCoords(n.def.arraywd, t.coordScaleFactor),
      arrayht: SDF.ToSDWinCoords(n.def.arrayht, t.coordScaleFactor),
      sequenceflags: n.sequenceflags,
      chartdirection: n.chartdirection,
      copyPasteTrialVers: n.copyPasteTrialVers,
      taskmanagementflags: n.taskmanagementflags,
      taskdays: n.taskdays,
      moreflags: n.moreflags,
      fieldmask: n.fieldmask,
      wallThickness: n.def.wallThickness,
      curveparam: n.def.curveparam,
      rrectparam: n.def.rrectparam
    };
    t.WriteVisio ||
      t.WriteWin32 ? e.writeStruct(FileParser.SDF_C_DRAW12_Struct364, D) : e.writeStruct(FileParser.SDF_C_DRAW12_Struct440, D),
      SDF.Write_LENGTH(e, d)
  },
  SDF.WriteTheme = function (e, t, a) {
    var r = {
      name: t.Name,
      ncolorrows: 10,
      ncolorcols: 8,
      EffectStyleIndex: t.EffectStyleIndex
    },
      i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_BEGIN_THEME12);
    e.writeStruct(FileParser.SDF_BEGIN_THEME12_Struct, r),
      SDF.Write_LENGTH(e, i),
      SDF.WriteString(
        e,
        t.Category,
        FileParser.SDROpCodesByName.SDF_C_THEME_CAT,
        a
      );
    var n,
      o = t.Colors.length,
      s = {
        color: 0
      };
    for (n = 0; n < o; n++) s.color = SDF.HTMLColorToWin(t.Colors[n]),
      i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_THEME_COLOR),
      e.writeStruct(FileParser.SDF_THEME_COLOR_Struct, s),
      SDF.Write_LENGTH(e, i);
    SDF.WriteStyleList(e, t.Styles, !0, a),
      SDF.WriteSDFill(e, t.Background, a);
    var l = t.OutsideEffects.length;
    if (l) {
      for (
        SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_BEGIN_OUTSIDELIST),
        n = 0;
        n < l;
        n++
      ) SDF.WriteOutside(e, t.OutsideEffects[n]);
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_OUTSIDELIST)
    }
    var S = t.InsideEffects.length;
    if (S) {
      for (
        SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_BEGIN_INSIDELIST),
        n = 0;
        n < S;
        n++
      ) SDF.WriteEffect(e, t.InsideEffects[n], t.InsideEffects[n].Effect);
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_INSIDELIST)
    }
    var c = t.Gradients.length;
    if (c) {
      SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_BEGIN_GRADIENTLIST);
      var u = {
        color: 0,
        endcolor: 0,
        gradientflags: 0
      };
      for (n = 0; n < c; n++) u.color = SDF.HTMLColorToWin(t.Gradients[n].Color),
        u.endcolor = SDF.HTMLColorToWin(t.Gradients[n].EndColor),
        u.gradientflags = t.Gradients[n].GradientFlags,
        i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_THEMEGRADIENT),
        e.writeStruct(FileParser.SDF_THEMEGRADIENT_Struct, u),
        SDF.Write_LENGTH(e, i);
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_GRADIENTLIST)
    }
    e.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_THEME12)
  },
  SDF.WriteStyle = function (e, t, a, r, i) {
    var n = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_BEGIN_STYLE);
    e.writeUCS2String(t.Name, T3DataStream.LITTLE_ENDIAN, t.Name.length + 1),
      SDF.Write_LENGTH(e, n),
      t.Fill &&
      SDF.WriteSDFill(e, t.Fill, r),
      a ? SDF.WriteSDLine(
        e,
        t.Border,
        r,
        FileParser.SDROpCodesByName.SDF_C_BEGIN_LINE,
        i
      ) : SDF.WriteSDLine(
        e,
        t.Line,
        r,
        FileParser.SDROpCodesByName.SDF_C_BEGIN_LINE,
        i
      ),
      SDF.WriteSDTxf(e, t.Text, r),
      SDF.WriteOutside(e, t.OutsideEffect),
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_STYLE)
  },
  SDF.WriteStyleList = function (e, t, a, r) {
    var i,
      n;
    for (
      SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_BEGIN_STYLELIST),
      i = t.length,
      n = 0;
      n < i;
      n++
    ) SDF.WriteStyle(e, t[n], a, r, null);
    e.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_STYLELIST)
  },
  SDF.WriteSDFill = function (e, t, a) {
    SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_BEGIN_FILL);
    if (
      SDF.WritePaint(e, t.Paint, ConstantData.Colors.Color_White, a),
      t.Hatch
    ) {
      var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_HATCH);
      e.writeUint32(t.Hatch),
        SDF.Write_LENGTH(e, r)
    }
    t.FillEffect &&
      SDF.WriteEffect(e, t, t.FillEffect),
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_FILL)
  },
  SDF.WriteSDLine = function (e, t, a, r, i) {
    var n,
      o,
      s = SDF.Write_CODE(e, r),
      l = 0;
    0 === (o = SDF.ToSDWinCoords(t.Thickness, a.coordScaleFactor)) &&
      t.Thickness > 0 &&
      (o = 1),
      i &&
        i.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR ? (
        l = o / 2,
        o = 0,
        n = a.WriteWin32 ? Resources.Windows_LinePatterns.SEP_FilledLine : Resources.LinePatternData.indexOf(t.LinePattern) + 1
      ) : (n = Resources.LinePatternData.indexOf(t.LinePattern) + 1) < 1 &&
      (n = 1),
      !i ||
      i.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ||
      0 !== l ||
      i.StyleRecord.Line.LinePattern !== Resources.Windows_LinePatterns.SEP_Solid &&
      i.StyleRecord.Line.LinePattern !== Resources.Windows_LinePatterns.SEP_None ||
      (
        l = o / 2,
        o = 0,
        n = a.WriteWin32 ? Resources.Windows_LinePatterns.SEP_FilledLine : Resources.LinePatternData.indexOf(t.LinePattern) + 1
      );
    var S = {
      thickness: o,
      pattern: n
    };
    if (
      a.WriteVisio ||
        a.WriteWin32 ? e.writeStruct(FileParser.SDF_BEGIN_LINE_Struct_8, S) : e.writeStruct(FileParser.SDF_BEGIN_LINE_Struct_14, S),
      SDF.Write_LENGTH(e, s),
      SDF.WritePaint(e, t.Paint, ConstantData.Colors.Color_Black, a),
      l
    ) {
      var c = {
        bthick: l,
        color: SDF.HTMLColorToWin(t.Paint.Color)
      },
        u = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_FILLEDLINE);
      e.writeStruct(FileParser.SDF_FILLED_LINE_Struct, c),
        SDF.Write_LENGTH(e, u)
    }
    if (t.Hatch) {
      var p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_HATCH);
      e.writeUint32(t.Hatch),
        SDF.Write_LENGTH(e, p)
    }
    t.LineEffect &&
      SDF.WriteEffect(e, t, t.LineEffect),
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_LINE)
  },
  SDF.WriteSDTxf = function (e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_BEGIN_TEXTF),
      i = {
        fontid: SDF.GetFontID(t.FontName, a.fontlist),
        fsize: t.FontSize,
        face: t.Face
      };
    e.writeStruct(FileParser.SDF_BEGIN_TEXTF_Struct, i),
      SDF.Write_LENGTH(e, r),
      SDF.WritePaint(e, t.Paint, ConstantData.Colors.Color_Black, a),
      t.Effect.OutsideType &&
      SDF.WriteOutside(e, t.Effect),
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_TEXTF)
  }

SDF.WriteOutside = function (e, t) {
  var a,
    r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_OUTSIDE);
  'string' != typeof t.Color &&
    (t.Color = null),
    a = t.Color ? SDF.HTMLColorToWin(t.Color) : SDF.HTMLColorToWin(ConstantData.Colors.Color_Black);
  var i = {
    outsidetype: t.OutsideType,
    extent: {
      left: t.OutsideExtent_Left,
      top: t.OutsideExtent_Top,
      right: t.OutsideExtent_Right,
      bottom: t.OutsideExtent_Bottom
    },
    color: a,
    lparam: t.LParam,
    wparam: t.WParam
  };
  e.writeStruct(FileParser.SDF_OUTSIDE_EFFECT_Struct, i),
    SDF.Write_LENGTH(e, r)
}

SDF.WriteEffect = function (e, t, a) {
  var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_EFFECT),
    i = {
      effecttype: a,
      effectcolor: t.EffectColor ? SDF.HTMLColorToWin(t.EffectColor) : ConstantData.Colors.Color_Trans,
      wparam: t.WParam,
      lparam: t.LParam
    };
  e.writeStruct(FileParser.SDF_EFFECT_Struct, i),
    SDF.Write_LENGTH(e, r)
},
  SDF.WritePaint = function (e, t, a, r) {
    var i,
      n,
      o,
      s,
      l = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_BEGIN_PAINT);
    null == t.Color &&
      (t.Color = a);
    var S = {
      filltype: t.FillType,
      color: SDF.HTMLColorToWin(t.Color, t.Opacity)
    };
    switch (
    e.writeStruct(FileParser.SDF_BEGIN_PAINT_Struct, S),
    SDF.Write_LENGTH(e, l),
    null == t.EndColor &&
    (t.EndColor = ConstantData.Colors.Color_White),
    t.FillType
    ) {
      case ConstantData.FillTypes.SDFILL_GRADIENT:
        var c = {
          ecolor: SDF.HTMLColorToWin(t.EndColor, t.EndOpacity),
          gradientflags: t.GradientFlags
        };
        o = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRADIENT),
          e.writeStruct(FileParser.SDF_GRADIENT_Struct, c),
          SDF.Write_LENGTH(e, o);
        break;
      case ConstantData.FillTypes.SDFILL_RICHGRADIENT:
        if (i = r.RichGradients[t.GradientFlags]) {
          n = i.stops.length;
          var u,
            p = {
              gradienttype: i.gradienttype,
              angle: i.angle,
              nstops: n
            };
          for (
            o = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_RICHGRADIENT),
            e.writeStruct(FileParser.SDF_RICHGRADIENT_Struct, p),
            SDF.Write_LENGTH(e, o),
            s = 0;
            s < n;
            s++
          ) u = {
            color: SDF.HTMLColorToWin(i.stops[s].color, i.stops[s].opacity),
            stop: i.stops[s].stop
          },
            o = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_RICHGRADIENTSTOP),
            e.writeStruct(FileParser.SDF_RICHGRADIENTSTOP_Struct, u),
            SDF.Write_LENGTH(e, o)
        }
        break;
      case ConstantData.FillTypes.SDFILL_TEXTURE:
        var d = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TEXTURE),
          D = t.Texture;
        r.WriteBlocks ||
          (D = r.TextureList.indexOf(D)) < 0 &&
          (D = 0),
          e.writeUint32(D),
          SDF.Write_LENGTH(e, d)
    }
    e.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_PAINT)
  },
  SDF.ShapeParamToSDR = function (e, t) {
    var a = 0,
      r = ConstantData.SDRShapeTypes;
    switch (e.dataclass) {
      case r.SED_S_Pgm:
      case r.SED_S_Pent:
      case r.SED_S_PentL:
      case r.SED_S_Hex:
        a = SDF.ToSDWinCoords(e.shapeparam, t.coordScaleFactor);
        break;
      case r.SED_S_Oct:
        a = e.shapeparam;
        break;
      case r.SED_S_ArrL:
      case r.SED_S_ArrR:
      case r.SED_S_ArrT:
      case r.SED_S_ArrB:
      case r.SED_S_TrapB:
      case r.SED_S_Trap:
      case r.SED_S_Input:
      case r.SED_S_TrapB:
      case r.SED_S_Doc:
      case r.SED_S_Store:
      case r.SED_S_Delay:
      case r.SED_S_Disp:
        a = SDF.ToSDWinCoords(e.shapeparam, t.coordScaleFactor)
    }
    return a
  },
  SDF.WriteObject = function (e, t, a, r) {
    // debugger
    var i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d = 0,
      D = 1,
      g = 0,
      h = {
        x: 0,
        y: 0
      },
      m = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      C = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      y = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWOBJ8),
      f = - 1,
      L = FileParser.SDROpCodesByName,
      I = ConstantData.ShapeClass,
      T = I.PLAIN;
    switch (
    i = a.ShortRef,
    n = a.shapeparam ||
    0,
    o = a.flags,
    s = a.Frame,
    u = a,
    a.associd > 0 &&
    (f = SDF.BlockIDtoUniqueID(a.associd, r)),
    l = r.WriteBlocks ? a.BlockID : t + 1,
    S = a.DrawingObjectBaseClass,
    c = a.ShapeType,
    a.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
    a.LineType === ConstantData.LineType.POLYLINE &&
    a.polylist.closed &&
    (
      S = ConstantData.DrawingObjectBaseClass.SHAPE,
      c = 'CLOSEDPOLY'
    ),
    a.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR &&
    a.flags & ConstantData.ObjFlags.SEDO_NotVisible &&
    (
      o = Utils2.SetFlag(o, ConstantData.ObjFlags.SEDO_NotVisible, !1)
    ),
    S
    ) {
      case ConstantData.DrawingObjectBaseClass.LINE:
        switch (a.DataID >= 0 && !r.WriteBlocks && (f = t + 2), a.LineType) {
          case ConstantData.LineType.ARCLINE:
          case ConstantData.LineType.LINE:
            a.LineType == ConstantData.LineType.ARCLINE &&
              (
                s = Utils2.Pt2Rect(a.EndPoint, a.StartPoint),
                i = ConstantData2.LineTypes.SED_LS_Chord,
                n = SDF.ToSDWinCoords(a.CurveAdjust, r.coordScaleFactor),
                a.IsReversed &&
                (n = - n),
                (
                  Math.abs(a.EndPoint.x - s.x) < 0.01 &&
                  Math.abs(a.EndPoint.y - s.y) < 0.01 ||
                  Math.abs(a.EndPoint.x - s.x) < 0.01 &&
                  Math.abs(a.EndPoint.y - (s.y + s.height)) < 0.01
                ) &&
                (n = - n)
              ),
              s = Utils2.Pt2Rect(a.EndPoint, a.StartPoint),
              g = ConstantData2.ObjectTypes.SED_LineD,
              Math.abs(a.StartPoint.x - a.EndPoint.x) < ConstantData.Defines.MinLineDistanceForDeterminingOrientation ? (
                d = SDF.ToSDWinCoords(a.StartPoint.x + r.GroupOffset.x, r.coordScaleFactor),
                D = ConstantData2.LineSubclass.SED_LCV
              ) : Math.abs(a.StartPoint.y - a.EndPoint.y) < ConstantData.Defines.MinLineDistanceForDeterminingOrientation ? (
                d = SDF.ToSDWinCoords(a.StartPoint.y + r.GroupOffset.y, r.coordScaleFactor),
                D = ConstantData2.LineSubclass.SED_LCH
              ) : (
                D = ConstantData2.LineSubclass.SED_LCD,
                (
                  Math.abs(a.StartPoint.x - (s.x + s.width)) < 0.01 &&
                  Math.abs(a.StartPoint.y - s.y) < 0.01 ||
                  Math.abs(a.StartPoint.y - (s.y + s.height)) < 0.01 &&
                  Math.abs(a.StartPoint.x - s.x) < 0.01
                ) &&
                (
                  o = Utils2.SetFlag(o, ConstantData.ObjFlags.SEDO_Obj1, !0)
                )
              );
            break;
          case ConstantData.LineType.ARCSEGLINE:
            g = ConstantData2.ObjectTypes.SED_SegL,
              D = ConstantData2.SeglTypes.SED_L_Arc;
            break;
          case ConstantData.LineType.SEGLINE:
            g = ConstantData2.ObjectTypes.SED_SegL,
              D = ConstantData2.SeglTypes.SED_L_Line;
            break;
          case ConstantData.LineType.POLYLINE:
            g = ConstantData2.ObjectTypes.SED_PolyL,
              D = ConstantData.SDRShapeTypes.SED_S_Poly;
            break;
          case ConstantData.LineType.FREEHAND:
            g = ConstantData2.ObjectTypes.SED_Freehand
        }
        break;
      case ConstantData.DrawingObjectBaseClass.SHAPE:
        if (
          g = ConstantData2.ObjectTypes.SED_Shape,
          (
            a.TextFlags & ConstantData.TextFlags.SED_TF_AttachB ||
            a.TextFlags & ConstantData.TextFlags.SED_TF_AttachA
          ) &&
          a.DataID >= 0 &&
          !r.WriteBlocks &&
          (f = t + 2),
          !r.WriteVisio &&
          a.StyleRecord.Line.BThick &&
          a.polylist &&
          a.polylist.closed &&
          a.polylist.segs &&
          a.polylist.segs.length
        ) {
          if (u = Utils1.DeepCopy(a), 'CLOSEDPOLY' != c) s = $.extend(!0, {
          }, a.Frame),
            u = Utils1.DeepCopy(a),
            Utils2.InflateRect(s, - a.StyleRecord.Line.BThick, - a.StyleRecord.Line.BThick);
          else {
            var b = [],
              M = [],
              P = [];
            if (
              b = u.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, P),
              P.length > 0
            ) for (
                M.push(new Point(b[0].x, b[0].y)),
                p = 0;
                p < P.length;
                p++
              ) M.push(new Point(b[P[p]].x, b[P[p]].y));
            else M = Utils1.DeepCopy(b);
            b = GlobalData.optManager.InflateLine(M, u.StyleRecord.Line.BThick, !0, !1),
              u.StartPoint = Utils1.DeepCopy(b[0]),
              u.EndPoint = Utils1.DeepCopy(b[b.length - 1]);
            var R = Utils1.DeepCopy(u.polylist.segs);
            for (u.polylist.segs = [], p = 0; p < b.length; p++) u.polylist.segs.push(
              new PolySeg(1, b[p].x - u.StartPoint.x, b[p].y - u.StartPoint.y)
            ),
              p < R.length &&
              (
                u.polylist.segs[p].LineType = R[p].LineType,
                u.polylist.segs[p].ShortRef = R[p].ShortRef,
                u.polylist.segs[p].dataclass = R[p].dataclass,
                u.polylist.segs[p].dimDeflection = R[p].dimDeflection,
                u.polylist.segs[p].flags = R[p].flags,
                u.polylist.segs[p].param = R[p].param,
                u.polylist.segs[p].weight = R[p].weight
              );
            u.CalcFrame(),
              s = Utils1.DeepCopy(u.Frame)
          }
          u.StyleRecord.Line.Thickness = 0,
            u.UpdateFrame(s)
        }
        switch (
        m.x = a.InitialGroupBounds.x,
        m.y = a.InitialGroupBounds.y,
        m.width = a.InitialGroupBounds.width,
        m.height = a.InitialGroupBounds.height,
        C = SDF.ToSDWinRect(m, r.coordScaleFactor, {
          x: 0,
          y: 0
        }),
        a.ShapeType === ConstantData.ShapeType.GROUPSYMBOL &&
        (
          a.InitialGroupBounds.x > 0 ||
          a.InitialGroupBounds.y > 0 ||
          r.WriteVisio &&
          (r.GroupOffset.x > 0 || r.GroupOffset.y > 0)
        ) &&
        (
          m.x = a.Frame.x,
          m.y = a.Frame.y,
          C = SDF.ToSDWinRect(m, r.coordScaleFactor, r.GroupOffset)
        ),
        a.SymbolURL.length ? 'SVG' === a.SymbolURL.slice(- 3).toUpperCase() &&
          (T = I.SVGSYMBOL) : a.ImageURL.length &&
          'SVG' === a.ImageURL.slice(- 3).toUpperCase() &&
        (T = I.MISSINGEMF),
        c
        ) {
          case ConstantData.ShapeType.RECT:
            D = ConstantData.SDRShapeTypes.SED_S_Rect;
            break;
          case ConstantData.ShapeType.RRECT:
            D = ConstantData.SDRShapeTypes.SED_S_RRect;
            break;
          case ConstantData.ShapeType.OVAL:
            D = Math.abs(a.Frame.x - a.Frame.y) < 0.2 &&
              a.ObjGrow === ConstantData.GrowBehavior.PROPORTIONAL ? ConstantData.SDRShapeTypes.SED_S_Circ : ConstantData.SDRShapeTypes.SED_S_Oval;
            break;
          case ConstantData.ShapeType.POLYGON:
            a.dataclass ? (D = a.dataclass, n = SDF.ShapeParamToSDR(a, r)) : (
              a.dataclass = ConstantData.SDRShapeTypes.SED_S_Poly,
              D = a.dataclass
            );
            break;
          case 'CLOSEDPOLY':
            D = ConstantData.SDRShapeTypes.SED_S_Poly;
            break;
          case ConstantData.ShapeType.GROUPSYMBOL:
            D = ConstantData.SDRShapeTypes.SED_S_Rect,
              T = I.GROUPSYMBOL;
            break;
          case ConstantData.ShapeType.SVGFRAGMENTSYMBOL:
            D = ConstantData.SDRShapeTypes.SED_S_Rect,
              T = I.SVGFRAGMENTSYMBOL;
            break;
          default:
            D = ConstantData.SDRShapeTypes.SED_S_Rect
        }
        break;
      case ConstantData.DrawingObjectBaseClass.CONNECTOR:
        g = ConstantData2.ObjectTypes.SED_Array,
          a.vertical ? (
            d = SDF.ToSDWinCoords(a.StartPoint.x + r.GroupOffset.x, r.coordScaleFactor),
            D = ConstantData2.LineSubclass.SED_LCV
          ) : (
            d = SDF.ToSDWinCoords(a.StartPoint.y + r.GroupOffset.y, r.coordScaleFactor),
            D = ConstantData2.LineSubclass.SED_LCH
          )
    }
    a.attachpoint &&
      (h.x = a.attachpoint.x, h.y = a.attachpoint.y);
    var A = a.extraflags;
    r.selectonly &&
      (
        A = Utils2.SetFlag(A, ConstantData.ExtraFlags.SEDE_NoDelete, !1)
      );
    var _ = {
      otype: g,
      r: SDF.ToSDWinRect(u.r, r.coordScaleFactor, r.GroupOffset),
      frame: SDF.ToSDWinRect(s, r.coordScaleFactor, r.GroupOffset),
      inside: SDF.ToSDWinRect(u.inside, r.coordScaleFactor, r.GroupOffset),
      dataclass: D,
      flags: o,
      extraflags: A,
      fixedpoint: d,
      shapeparam: n,
      objgrow: a.ObjGrow,
      sizedim: {
        x: SDF.ToSDWinCoords(a.sizedim.width, r.coordScaleFactor),
        y: SDF.ToSDWinCoords(a.sizedim.height, r.coordScaleFactor)
      },
      hookflags: a.hookflags,
      targflags: a.targflags,
      maxhooks: a.maxhooks,
      associd: f,
      associndex: - 1,
      uniqueid: l,
      ShortRef: i,
      gframe: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      gflags: 0,
      attachpoint_x: h.x,
      attachpoint_y: h.y,
      rleft: a.rleft ||
        0,
      rtop: a.rtop ||
        0,
      rright: a.rright ||
        0,
      rbottom: a.rbottom ||
        0,
      rwd: a.rwd ||
        0,
      rht: a.rht ||
        0,
      rflags: a.rflags,
      hgframe: C,
      layer: a.Layer,
      breverse: 0,
      dimensions: a.Dimensions,
      hiliter: SDF.ToSDWinRect(a.Frame, r.coordScaleFactor, r.GroupOffset),
      styleindex: a.tstyleindex,
      objecttype: a.objecttype,
      colorfilter: a.colorfilter,
      perspective: 0,
      extendedSnapRect: SDF.ToSDWinRect(a.Frame, r.coordScaleFactor, r.GroupOffset),
      dimensionDeflectionH: a.dimensionDeflectionH ? SDF.ToSDWinCoords(a.dimensionDeflectionH, r.coordScaleFactor) : 0,
      dimensionDeflectionV: a.dimensionDeflectionV ? SDF.ToSDWinCoords(a.dimensionDeflectionV, r.coordScaleFactor) : 0,
      commentdir: FileParser.SDWFileDir.dir_text,
      sequence: 0,
      hookdisp_x: SDF.ToSDWinCoords(a.hookdisp.x, r.coordScaleFactor),
      hookdisp_y: SDF.ToSDWinCoords(a.hookdisp.y, r.coordScaleFactor),
      pptLayout: 0,
      subtype: a.subtype,
      colorchanges: a.colorchanges,
      moreflags: a.moreflags,
      objclass: T
    };
    if (
      r.WriteVisio ||
        r.WriteWin32 ? e.writeStruct(FileParser.SDF_DRAWOBJ8_Struct_316, _) : e.writeStruct(FileParser.SDF_DRAWOBJ8_Struct_448, _),
      SDF.Write_LENGTH(e, y),
      SDF.WriteHooks(e, a, r),
      SDF.WriteObjData(e, a, r),
      a.HyperlinkText &&
      SDF.WriteString(e, a.HyperlinkText, L.SDF_C_DRAWJUMP, r),
      SDF.ShouldWriteImageUrl(a.ImageURL, a.BlobBytesID) &&
      SDF.WriteString(e, a.ImageURL, L.SDF_C_IMAGEURL, r),
      r.WriteBlocks ||
      r.WriteGroupBlock ||
      SDF.WriteNotes(e, a, r),
      a.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
      SDF.WriteConnectPoints(e, a),
      a.StyleRecord
    ) {
      var E = a.StyleRecord.Fill.Paint.FillType;
      r.WriteVisio &&
        a.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
        (
          a.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT
        ),
        SDF.WriteStyleOverrides(e, a, r),
        a.StyleRecord.Fill.Paint.FillType = E
    }
    a.BusinessName &&
      SDF.WriteString(e, a.BusinessName, L.SDF_C_BUSINESSNAME_STR, r),
      a.WriteSDFAttributes(e, r),
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_DRAWOBJ8_END)
  },
  SDF.WriteNotes = function (e, t, a) {
    - 1 != t.NoteID &&
      SDF.WriteText(e, t, null, null, !0, a)
  },
  SDF.WriteHooks = function (e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l,
      S = {},
      c = !1,
      u = {},
      p = !1,
      d = ConstantData.Defines.SED_CDim;
    if (
      t.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE ? c = SDF.LineIsReversed(t, a, !1) : t.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
        (
          p = t.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_ReverseCol &&
          t.vertical
        ),
      r = t.hooks.length
    ) for (i = 0; i < r; i++) {
      if (s = t.hooks[i].hookpt, c) switch (s) {
        case ConstantData.HookPts.SED_KTL:
          s = ConstantData.HookPts.SED_KTR;
          break;
        case ConstantData.HookPts.SED_KTR:
          s = ConstantData.HookPts.SED_KTL
      } else if (p) switch (s) {
        case ConstantData.HookPts.SED_LL:
          s = ConstantData.HookPts.SED_LR;
          break;
        case ConstantData.HookPts.SED_LT:
          s = ConstantData.HookPts.SED_LB
      }
      u.x = t.hooks[i].connect.x,
        u.y = t.hooks[i].connect.y,
        l = GlobalData.optManager.GetObjectPtr(t.hooks[i].objid, !1),
        SDF.LineIsReversed(l, a, !0) &&
        (u.x = d - u.x, u.y = d - u.y),
        o = null == t.hooks[i].cellid ? ConstantData.Defines.SED_DNULL : t.hooks[i].cellid,
        n = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWHOOK),
        S = {
          objid: SDF.BlockIDtoUniqueID(t.hooks[i].objid, a),
          index: - 1,
          connectx: u.x,
          connecty: u.y,
          hookpt: s,
          cellid: o
        },
        e.writeStruct(FileParser.SDF_DRAWHOOK_Struct, S),
        SDF.Write_LENGTH(e, n)
    }
  },

  SDF.PStyleListAdd = function (e, t) {
    var a,
      r;
    for (r = e.length, a = 0; a < r; a++) if (
      e[a].just == t.just &&
      e[a].bullet == t.bullet &&
      e[a].spacing == t.spacing &&
      e[a].pindent == t.pindent &&
      e[a].lindent == t.lindent &&
      e[a].rindent == t.rindent &&
      e[a].bindent == t.bindent &&
      e[a].tabspace == t.tabspace
    ) return a;
    return e.push(t),
      r
  },
  SDF.TextSizeToPointSize = function (e, t) {
    var a = 0;
    t ? a = t.docDpi : a = GlobalData.optManager.svgDoc.GetWorkArea().docDpi;
    return Math.round(72 * e / a)
  },
  SDF.WriteText = function (e, t, a, r, i, n) {
    var o,
      s;
    if (
      r ? (o = r, s = r.ID) : i ? t ? (o = GlobalData.objectStore.GetObject(t.NoteID), s = t.NoteID) : a &&
        (o = GlobalData.objectStore.GetObject(a.NoteID), s = a.NoteID) : t ? (o = GlobalData.objectStore.GetObject(t.DataID), s = t.DataID) : a &&
          (o = GlobalData.objectStore.GetObject(a.DataID), s = a.DataID),
      null != o
    ) {
      var l,
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
        b = o.Data.runtimeText,
        M = [],
        P = [];
      if (!b) {
        if (!r) return;
        b = GlobalData.optManager.svgDoc.CreateShape(ConstantData.CreateShapeType.TEXT).GetRuntimeText()
      }
      for (C = [], 0, d = 0, c = b.charStyles.length, M = new Array(c), l = 0; l < c; l++) M[l] = d;
      for (l = 0; l < b.paraInfo.length; l++) for (
        d = SDF.PStyleListAdd(C, b.paraInfo[l].pStyle),
        S = b.paraInfo[l].offset;
        S < c;
        S++
      ) M[S] = d;
      if (m = [], u = - 1, D = - 1, 0 === c) u = 0,
        D = b.paraInfo[0],
        m.push({
          style: 0,
          para: D,
          offset: 0
        });
      else for (l = 0; l < c; l++) u == b.charStyles[l] &&
        D == M[l] ||
        (u = b.charStyles[l], D = M[l], m.push({
          style: u,
          para: D,
          offset: l
        }));
      if (n.WriteVisio || n.WriteWin32) {
        var R = {
          InstID: s,
          nruns: m.length,
          nstyles: C.length,
          nchar: b.text.length,
          flags: 2,
          margins: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          },
          nlinks: 0,
          nlinkchar: 0,
          markupobjid: - 1
        },
          A = FileParser.SDF_LONGTEXT8_Struct;
        for (R.nlinks = b.hyperlinks.length, l = 0; l < b.hyperlinks.length; l++) R.nlinkchar += b.hyperlinks[l].length + 1
      } else R = {
        InstID: s,
        nstyles: C.length
      },
        A = FileParser.SDF_LONGTEXT8_Struct_8;
      for (
        i ? (
          p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_COMMENT),
          e.writeStruct(A, R),
          SDF.Write_LENGTH(e, p)
        ) : (
          p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_LONGTEXT8),
          e.writeStruct(A, R),
          SDF.Write_LENGTH(e, p)
        ),
        p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TEXTCHAR),
        h = String(b.text).replace(/\n/g, '\r'),
        e.writeUCS2String(h, T3DataStream.LITTLE_ENDIAN),
        SDF.Write_LENGTH(e, p),
        p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TEXTRUN),
        y = {
          nruns: m.length
        },
        e.writeStruct(FileParser.SDF_TEXTRUNS_Header, y),
        l = 0;
        l < m.length;
        l++
      ) f = {
        ncodes: 9,
        offset: m[l].offset
      },
        u = b.styles[m[l].style],
        D = m[l].para,
        u.dataField &&
        f.ncodes++,
        e.writeStruct(FileParser.SDF_TEXTCHANGE_Header, f),
        L = {
          code: FileParser.TextStyleCodes.SDF_T_FONT,
          value: SDF.GetFontID(u.font, n.fontlist)
        },
        e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
        n.WriteVisio ||
          n.WriteWin32 ? (
          L = {
            code: FileParser.TextStyleCodes.SDF_T_SIZE,
            value: SDF.TextSizeToPointSize(u.size, n)
          },
          e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L)
        ) : (
          L = {
            code: FileParser.TextStyleCodes.SDF_T_SIZE_FLOAT,
            value: u.size
          },
          e.writeStruct(FileParser.SDF_TEXTCODE_Struct_Float, L)
        ),
        L = {
          code: FileParser.TextStyleCodes.SDF_T_FACE,
          value: 0
        },
        'bold' == u.weight &&
        (L.value += FileParser.TextFace.St_Bold),
        'italic' == u.style &&
        (L.value += FileParser.TextFace.St_Italic),
        'underline' == u.decoration ? L.value += FileParser.TextFace.St_Under : 'line-through' == u.decoration &&
          (L.value += FileParser.TextFace.St_Strike),
        e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
        L = {
          code: FileParser.TextStyleCodes.SDF_T_EXTRA,
          value: 0
        },
        'sub' == u.baseOffset ? L.value = FileParser.ToUInt32(- 1) : 'super' == u.baseOffset &&
          (L.value = 1),
        e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
        L = {
          code: FileParser.TextStyleCodes.SDF_T_PAINTTYPE,
          value: 1
        },
        e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
        L = {
          code: FileParser.TextStyleCodes.SDF_T_COLOR,
          value: SDF.HTMLColorToWin(u.color, u.colorTrans)
        },
        e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
        L = {
          code: FileParser.TextStyleCodes.SDF_T_FLAGS,
          value: u.spError ? FileParser.TextFlags.TEN_F_BADSPELL : 0
        },
        e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
        L = {
          code: FileParser.TextStyleCodes.SDF_T_STYLEID,
          value: D
        },
        e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
        L = {
          code: FileParser.TextStyleCodes.SDF_T_LINKID,
          value: FileParser.ToUInt32(u.hyperlink)
        },
        e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
        u.dataField &&
        (
          (g = P.indexOf(u.dataField)) < 0 &&
          (g = P.length, P.push(u.dataField)),
          L = {
            code: FileParser.TextStyleCodes.SDF_T_DATAID,
            value: g
          },
          e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L)
        );
      for (SDF.Write_LENGTH(e, p), l = 0; l < C.length; l++) {
        switch (
        p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TEXTSTYLE),
        I = {
          index: l,
          ncodes: 7
        },
        e.writeStruct(FileParser.SDF_TEXTSTYLE_Header, I),
        T = {
          code: FileParser.ParaStyleCodes.SDF_S_JUST,
          value: 0
        },
        C[l].just
        ) {
          case 'left':
            T.value = FileParser.TextJust.TA_LEFT;
            break;
          case 'right':
            T.value = FileParser.TextJust.TA_RIGHT;
            break;
          default:
            T.value = FileParser.TextJust.TA_CENTER
        }
        switch (
        e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
        T.code = FileParser.ParaStyleCodes.SDF_S_BULLET,
        C[l].bullet
        ) {
          case 'hround':
            T.value = 1;
            break;
          case 'sround':
            T.value = 2;
            break;
          case 'hsquare':
            T.value = 3;
            break;
          case 'ssquare':
            T.value = 4;
            break;
          case 'diamond':
            T.value = 5;
            break;
          case 'chevron':
            T.value = 6;
            break;
          case 'check':
            T.value = 7;
            break;
          case 'plus':
            T.value = 8;
            break;
          default:
            T.value = 0
        }
        e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
          T.code = FileParser.ParaStyleCodes.SDF_S_SPACING,
          C[l].spacing < 0 ? T.value = SDF.ToSDWinCoords(C[l].spacing, n.coordScaleFactor) : T.value = Math.round(100 * C[l].spacing),
          e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
          T.code = FileParser.ParaStyleCodes.SDF_S_PINDENT,
          T.value = SDF.ToSDWinCoords(C[l].pindent, n.coordScaleFactor),
          e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
          SDF.Write_LENGTH(e, p),
          T.code = FileParser.ParaStyleCodes.SDF_S_LINDENT,
          T.value = SDF.ToSDWinCoords(C[l].bindent ? C[l].bindent : C[l].lindent, n.coordScaleFactor),
          e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
          SDF.Write_LENGTH(e, p),
          T.code = FileParser.ParaStyleCodes.SDF_S_RINDENT,
          T.value = SDF.ToSDWinCoords(C[l].rindent, n.coordScaleFactor),
          e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
          SDF.Write_LENGTH(e, p),
          T.code = FileParser.ParaStyleCodes.SDF_S_TABSPACE,
          T.value = SDF.ToSDWinCoords(C[l].tabspace, n.coordScaleFactor),
          e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
          SDF.Write_LENGTH(e, p)
      }
      for (l = 0; l < b.hyperlinks.length; l++) p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TEXTLINK),
        e.writeUint16(l),
        e.writeUint16(2),
        e.writeUCS2String(
          b.hyperlinks[l],
          T3DataStream.LITTLE_ENDIAN,
          b.hyperlinks[l].length + 1
        ),
        SDF.Write_LENGTH(e, p);
      for (l = 0; l < P.length; l++) p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TEXTDATA),
        e.writeUint16(l),
        e.writeUCS2String(P[l], T3DataStream.LITTLE_ENDIAN, P[l].length + 1),
        SDF.Write_LENGTH(e, p);
      i ? e.writeUint16(FileParser.SDROpCodesByName.SDF_C_COMMENT_END) : e.writeUint16(FileParser.SDROpCodesByName.SDF_C_TEXT_END)
    }
  },
  SDF.WriteSDDATA = function (e, t) {
    var a;
    a = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_SDDATA64C);
    var r = '';
    r = GlobalData.optManager.theContentHeader.SDDataID >= 0 ? ListManager.SDData.SaveDataSets(!0, !0) : '<SDDATA></SDDATA>',
      e.writeUCS2String(r, T3DataStream.LITTLE_ENDIAN, r.length + 1),
      SDF.Write_LENGTH(e, a)
  },
  SDF.WriteObjData = function (e, t, a) {
    var r,
      i = {
        datasetID: t.datasetID ? t.datasetID : - 1,
        datasetType: t.datasetType ? t.datasetType : - 1,
        datasetElemID: t.datasetElemID ? t.datasetElemID : - 1,
        datasetTableID: t.datasetTableID ? t.datasetTableID : - 1,
        fieldDataElemID: t.fieldDataElemID ? t.fieldDataElemID : - 1,
        fieldDataTableID: t.fieldDataTableID ? t.fieldDataTableID : - 1,
        fieldDataDatasetID: t.fieldDataDatasetID ? t.fieldDataDatasetID : - 1
      };
    t.datasetTableID >= 0 &&
      (
        ListManager.SDData.GetTable(t.datasetTableID) ||
        (
          i.datasetID = - 1,
          i.datasetType = - 1,
          i.datasetElemID = - 1,
          i.datasetTableID = - 1
        )
      );
    r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_OBJDATA),
      e.writeStruct(FileParser.SDF_OBJDATA_Struct32, i),
      SDF.Write_LENGTH(e, r)
  },
  SDF.WriteGraph = function (e, t, a) {
    var r,
      i,
      n = {
        stackScale: t.stackScale,
        valuePrecision: t.valuePrecision,
        pieChartCategory: t.pieChartCategory,
        pieOriginTangle: SDF.ToWinAngle(t.pieOriginTangle),
        flags: t.flags,
        pointflags: t.pointflags,
        prefixChar: t.prefixChar,
        suffixChar: t.suffixChar,
        graphtype: t.graphtype,
        quadrant: t.quadrant,
        barAreaAmount: t.barAreaAmount,
        barAreaAmountStacked: t.barAreaAmountStacked,
        imageValueRep: t.imageValueRep,
        graphLegendType: t.graphLegendType,
        perspectiveView3D: t.perspectiveView3D,
        effectLightDirection3D: t.effectLightDirection3D,
        npoints: t.gpoint.length
      };
    for (
      i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH),
      e.writeStruct(FileParser.SDF_GRAPH_Struct, n),
      SDF.Write_LENGTH(e, i),
      SDF.WriteStyle(e, t.style, !1, a),
      SDF.WriteStyle(e, t.areaStyle, !1, a),
      SDF.WriteStyle(e, t.gridStyle, !1, a),
      SDF.WriteGraphTitle(e, t.graphtitle, a),
      r = 0;
      r < t.axes.length;
      r++
    ) SDF.WriteGraphAxis(e, t.axes[r], a);
    for (
      SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH_LEGEND_BEGIN),
      SDF.WriteGraphTitle(e, t.graphlegendTitle, a),
      r = 0;
      r < t.graphLegend.length;
      r++
    ) SDF.WriteGraphLegendEntry(e, t.graphLegend[r], a);
    for (
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_GRAPH_LEGEND_END),
      r = 0;
      r < t.gpoint.length;
      r++
    ) SDF.WriteGraphPoint(e, t.gpoint[r], a);
    e.writeUint16(FileParser.SDROpCodesByName.SDF_C_GRAPH_END)
  },
  SDF.WriteGraphTitle = function (e, t, a) {
    var r,
      i = {
        lflags: t.lflags,
        just: t.just,
        margin: t.margin,
        frame: SDF.ToSDWinRect(t.frame, a.coordScaleFactor, 0),
        tangle: SDF.ToWinAngle(t.tangle),
        drawpt: SDF.ToSDWinRect(t.drawpt, a.coordScaleFactor, 0),
        center: {
          x: SDF.ToSDWinCoords(t.center.x, a.coordScaleFactor),
          y: SDF.ToSDWinCoords(t.center.y, a.coordScaleFactor)
        }
      };
    r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH_TITLE),
      e.writeStruct(FileParser.SDF_GRAPH_AXIS_TITLE_Struct, i),
      SDF.Write_LENGTH(e, r),
      SDF.WriteStyle(e, t.style, !1, a),
      SDF.WriteText(e, t, null, null, !1, a)
  },
  SDF.WriteGraphAxis = function (e, t, a) {
    var r,
      i,
      n = {
        orientation: t.orientation,
        flags: t.flags,
        lflags: t.lflags,
        fixedpoint: t.fixedpoint,
        frame: SDF.ToSDWinRect(t.title.frame, a.coordScaleFactor, 0),
        margin: t.margin,
        startpref: t.startpref,
        endpref: t.endpref,
        start: t.start,
        end: t.end,
        major: SDF.ToSDWinCoords(t.major, a.coordScaleFactor),
        majorscale: t.majorscale,
        minor: SDF.ToSDWinCoords(t.minor, a.coordScaleFactor),
        minorscale: t.minorscale,
        tickstyles: t.tickstyles,
        labelformat: t.labelformat,
        summaryflags: t.summaryflags,
        majorpref: t.majorpref,
        minorpref: t.minorpref
      };
    for (
      r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH_AXIS),
      e.writeStruct(FileParser.SDF_GRAPH_AXIS_Struct, n),
      SDF.Write_LENGTH(e, r),
      SDF.WriteStyle(e, t.style, !1, a),
      SDF.WriteGraphTitle(e, t.title, a),
      i = 0;
      i < t.labels.length;
      i++
    ) SDF.WriteGraphLabel(e, t.labels[i], a)
  },
  SDF.WriteGraphLabel = function (e, t, a) {
    var r,
      i = {
        categoryid: t.categoryid,
        lflags: t.lflags,
        frame: SDF.ToSDWinRect(t.frame, a.coordScaleFactor, 0),
        tangle: SDF.ToWinAngle(t.tangle),
        center: {
          x: SDF.ToSDWinCoords(t.center.x, a.coordScaleFactor),
          y: SDF.ToSDWinCoords(t.center.y, a.coordScaleFactor)
        },
        textid: - 1,
        just: t.just,
        vjust: t.vjust
      };
    r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH_LABEL),
      e.writeStruct(FileParser.SDF_GRAPH_AXIS_LABEL_Struct, i),
      SDF.Write_LENGTH(e, r),
      SDF.WriteText(e, t, null, null, !1, a)
  },
  SDF.WriteGraphLegendEntry = function (e, t, a) {
    var r,
      i = {
        seriesid: t.seriesid,
        lflags: t.lflags,
        textid: - 1,
        imgindx: t.imgindx,
        textFrame: SDF.ToSDWinRect(t.textFrame, a.coordScaleFactor, 0),
        swatchFrame: SDF.ToSDWinRect(t.swatchFrame, a.coordScaleFactor, 0),
        flags: t.flags
      };
    r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH_LEGEND),
      e.writeStruct(FileParser.SDF_GRAPH_LEGEND_ENTRY_Struct, i),
      SDF.Write_LENGTH(e, r),
      SDF.WriteText(e, t, null, null, !1, a)
  },
  SDF.WriteGraphPoint = function (e, t, a) {
    var r,
      i = {
        dataid: t.DataID,
        seriesid: t.seriesid,
        categoryid: t.categoryid,
        value: t.value,
        frame: SDF.ToSDWinRect(t.frame, a.coordScaleFactor, 0),
        tangle: SDF.ToWinAngle(t.tangle),
        flags: t.flags,
        labelformat: t.labelformat,
        explodeAmt: SDF.ToSDWinCoords(t.explodeAmt, a.coordScaleFactor),
        labelstyle: t.labelstyle,
        imagescale: t.imagescale,
        imagerect: SDF.ToSDWinRect(t.imagerect, a.coordScaleFactor, 0),
        labelTextId: t.DataID,
        labelTangle: SDF.ToWinAngle(t.label.tangle),
        labelFrame: SDF.ToSDWinRect(t.label.frame, a.coordScaleFactor, 0),
        labelCenter: {
          x: SDF.ToSDWinCoords(t.label.center.x, a.coordScaleFactor),
          y: SDF.ToSDWinCoords(t.label.center.y, a.coordScaleFactor)
        }
      };
    r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH_POINT),
      e.writeStruct(FileParser.SDF_GRAPH_POINT_Struct, i),
      SDF.Write_LENGTH(e, r),
      SDF.WriteStyle(e, t.style, !1, a),
      SDF.WriteStyle(e, t.label.style, !1, a),
      SDF.WriteText(e, t.label, null, null, !1, a),
      t.NoteID >= 0 &&
      SDF.WriteText(e, t.label, null, null, !0, a),
      t.HyperlinkText.length > 0 &&
      SDF.WriteString(e, t.HyperlinkText, Op.SDF_C_DRAWJUMP, a)
  },
  SDF.WriteGanttInfo = function (e, t, a) {
    var r = SDF.LargeIntToInt32Pair(t.configuredStart),
      i = SDF.LargeIntToInt32Pair(t.configuredEnd),
      n = SDF.LargeIntToInt32Pair(t.start),
      o = SDF.LargeIntToInt32Pair(t.end),
      s = SDF.LargeIntToInt32Pair(t.scrollStart),
      l = SDF.LargeIntToInt32Pair(t.scrollEnd),
      S = {
        timeScale: t.timeScale,
        flags: t.flags,
        configuredStart1: r[0],
        configuredStart2: r[1],
        configuredEnd1: i[0],
        configuredEnd2: i[1],
        start1: n[0],
        start2: n[1],
        end1: o[0],
        end2: o[1],
        scrollStart1: s[0],
        scrollStart2: s[1],
        scrollEnd1: l[0],
        scrollEnd2: l[1]
      };
    offset = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GANTTINFO),
      e.writeStruct(FileParser.SDF_GANTTINFO_Struct, S),
      SDF.Write_LENGTH(e, offset)
  },
  SDF.WriteTable = function (e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l;
    r = t.rows.length;
    var S = {
      ncells: i = t.cells.length,
      nrows: r,
      ht: SDF.ToSDWinCoords(t.ht, a.coordScaleFactor),
      wd: SDF.ToSDWinCoords(t.wd, a.coordScaleFactor),
      tmargin: {
        left: SDF.ToSDWinCoords(t.tmargin.left, a.coordScaleFactor),
        top: SDF.ToSDWinCoords(t.tmargin.top, a.coordScaleFactor),
        right: SDF.ToSDWinCoords(t.tmargin.right, a.coordScaleFactor),
        bottom: SDF.ToSDWinCoords(t.tmargin.bottom, a.coordScaleFactor)
      },
      tabletype: t.timelineflags,
      flags: t.flags
    };
    for (
      l = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TABLEVP),
      a.WriteVisio ||
        a.WriteWin32 ? e.writeStruct(FileParser.SDF_TABLE_Struct_32, S) : e.writeStruct(FileParser.SDF_TABLE_Struct_64, S),
      SDF.Write_LENGTH(e, l),
      n = 0;
      n < r;
      n++
    ) s = t.rows[n],
      l = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TABLEROWVP),
      a.WriteVisio ||
        a.WriteWin32 ? (
        o = {
          ncells: s.ncells,
          start: s.start,
          frame: SDF.ToSDWinRect(s.frame, a.coordScaleFactor, 0),
          lframe: SDF.ToSDWinRect(s.frame, a.coordScaleFactor, 0)
        },
        e.writeStruct(FileParser.SDF_TABLE_ROW_Struct_32, o)
      ) : (
        o = {
          ncells: s.ncells,
          start: s.start,
          lframe: SDF.ToSDWinRect(s.frame, a.coordScaleFactor, 0)
        },
        e.writeStruct(FileParser.SDF_TABLE_ROW_Struct_40, o)
      ),
      SDF.Write_LENGTH(e, l);
    for (n = 0; n < i; n++) {
      var c = t.cells[n];
      SDF.WriteTableCell(e, c, a)
    }
    e.writeUint16(FileParser.SDROpCodesByName.SDF_C_TABLEVP_END)
  },
  SDF.WriteTableCell = function (e, t, a) {
    var r,
      i,
      n,
      o,
      s = - 1,
      l = t.flags;
    t.nextra &&
      (
        l = Utils2.SetFlag(l, ListManager.Table.CellFlags.SDT_F_SilentL, !1)
      ),
      l = Utils2.SetFlag(l, ListManager.Table.CellFlags.SDT_F_Select, !1),
      a.WriteBlocks &&
      (s = t.DataID, t.tstyleindex = - 1),
      o = t.childcontainer >= 0 ? SDF.BlockIDtoUniqueID(t.childcontainer, a) : - 1;
    var S = {
      textht: SDF.ToSDWinCoords(t.textht, a.coordScaleFactor),
      textwd: SDF.ToSDWinCoords(t.textwd, a.coordScaleFactor),
      minwd: SDF.ToSDWinCoords(t.minwd, a.coordScaleFactor),
      sizedim: {
        x: SDF.ToSDWinCoords(t.sizedim.width, a.coordScaleFactor),
        y: SDF.ToSDWinCoords(t.sizedim.height, a.coordScaleFactor)
      },
      frame: SDF.ToSDWinRect(t.frame, a.coordScaleFactor, 0),
      trect: SDF.ToSDWinRect(t.trect, a.coordScaleFactor, 0),
      textid: s,
      vjust: SDF.JSJustToWin(t.vjust),
      just: SDF.JSJustToWin(t.just),
      flags: l,
      fontid: 0,
      associd: - 1,
      associndex: - 1,
      nextra: t.nextra,
      vdisp: SDF.ToSDWinCoords(t.vdisp, a.coordScaleFactor),
      hdisp: SDF.ToSDWinCoords(t.hdisp, a.coordScaleFactor),
      sequence: t.sequence,
      framewd: 0,
      trectwd: 0,
      childcontainer: o
    };
    r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TABLECELL8),
      a.WriteVisio ||
        a.WriteWin32 ? e.writeStruct(FileParser.SDF_TABLE_CELL_Struct_108, S) : e.writeStruct(FileParser.SDF_TABLE_CELL_Struct_176, S),
      SDF.Write_LENGTH(e, r);
    var c = {
      celltype: t.celltype,
      dwold: 0,
      styleindex: t.tstyleindex,
      celltime: 0,
      datarecordID: t.datarecordID
    };
    if (
      r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TABLECELLEXTRA),
      e.writeStruct(FileParser.SDF_TABLE_CELLEXTRA_Struct, c),
      SDF.Write_LENGTH(e, r),
      SDF.WriteCellStyleOverrides(e, t, a),
      t.DataID >= 0 &&
      (a.WriteBlocks || SDF.WriteText(e, null, t, null, !1, a)),
      t.NoteID >= 0 &&
      (
        a.WriteBlocks ? SDF.WriteCellNoteID(e, t.NoteID, a) : SDF.WriteText(e, null, t, null, !0, a)
      ),
      t.ExpandedViewID >= 0 &&
      (
        a.WriteBlocks ? SDF.WriteExpandedViewID(e, t.ExpandedViewID, a) : (
          n = GlobalData.optManager.GetObjectPtr(t.ExpandedViewID, !1),
          SDF.WriteExpandedView(e, n, a)
        )
      ),
      t.Image
    ) {
      var u = GlobalData.optManager.GetObjectPtr(t.EMFBlobBytesID, !1);
      if (u) SDF.WriteCellImageHeader(e, t, a),
        this.EMFHash &&
        SDF.WriteString8(e, t.EMFHash, FileParser.SDROpCodesByName.SDF_C_EMFHASH, a),
        a.WriteBlocks ? SDF.WriteEMFBlobBytesID(e, t.EMFBlobBytesID, FileParser.Image_Dir.dir_meta, a) : SDF.WriteBlob(e, u.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWMETA),
        (i = GlobalData.optManager.GetObjectPtr(t.BlobBytesID, !1)) &&
        (
          a.WriteBlocks ? SDF.WriteBlobBytesID(e, t.BlobBytesID, FileParser.Image_Dir.dir_png, a) : SDF.WriteBlob(
            e,
            i.Bytes,
            FileParser.SDROpCodesByName.SDF_C_DRAWPREVIEWPNG
          )
        );
      else if (
        i = GlobalData.optManager.GetObjectPtr(t.BlobBytesID, !1),
        SDF.WriteCellImageHeader(e, t, a),
        i
      ) switch (i.ImageDir) {
        case FileParser.Image_Dir.dir_jpg:
          a.WriteBlocks ? SDF.WriteBlobBytesID(e, t.BlobBytesID, FileParser.Image_Dir.dir_jpg, a) : SDF.WriteBlob(e, i.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWJPG);
          break;
        case FileParser.Image_Dir.dir_png:
          a.WriteBlocks ? SDF.WriteBlobBytesID(e, t.BlobBytesID, FileParser.Image_Dir.dir_png, a) : SDF.WriteBlob(e, i.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWPNG);
          break;
        case FileParser.Image_Dir.dir_svg:
          a.WriteBlocks ? SDF.WriteBlobBytesID(e, t.BlobBytesID, FileParser.Image_Dir.dir_svg, a) : SDF.WriteBlob(e, i.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWSVG)
      }
    }
    var p = {
      fieldindex: - 1,
      uniqueid: t.uniqueid,
      namelabel: 0,
      nfontid: 0,
      nfsize: 10,
      nface: 0,
      ntcolor: 0,
      namewidth: 0
    };
    r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TABLECELLPROP),
      e.writeStruct(FileParser.SDF_TABLE_CELLPROP_Struct, p),
      SDF.Write_LENGTH(e, r),
      t.hyperlink &&
      SDF.WriteString(
        e,
        t.hyperlink,
        FileParser.SDROpCodesByName.SDF_C_DRAWJUMP,
        a
      ),
      SDF.ShouldWriteImageUrl(t.ImageURL, t.BlobBytesID) &&
      SDF.WriteString(
        e,
        t.ImageURL,
        FileParser.SDROpCodesByName.SDF_C_IMAGEURL,
        a
      )
  },
  SDF.WriteConnectPoints = function (e, t) {
    var a,
      r,
      i,
      n;
    if (
      t.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.SHAPE
    ) {
      var o = {
        nconnect: a = t.ConnectPoints.length,
        connect: []
      };
      for (r = 0; r < a; r++) i = new Point(t.ConnectPoints[r].x, t.ConnectPoints[r].y),
        o.connect.push(i);
      for (r = a; r < FileParser.SDF_MAXCONNECT; r++) i = new Point(0, 0),
        o.connect.push(i);
      n = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_CONNECTPOINT),
        e.writeStruct(FileParser.SDF_CONNECTPOINT_Struct, o),
        SDF.Write_LENGTH(e, n)
    }
  },
  SDF.WriteStyleOverrides = function (e, t, a) {
    var r,
      i,
      n = Resources.MatchFlags;
    if (i = a.lpStyles.length, a.WriteVisio) return SDF.WriteSDFill(e, t.StyleRecord.Fill, a),
      SDF.WriteSDLine(
        e,
        t.StyleRecord.Line,
        a,
        FileParser.SDROpCodesByName.SDF_C_BEGIN_LINE,
        t
      ),
      SDF.WriteSDTxf(e, t.StyleRecord.Text, a),
      void SDF.WriteOutside(e, t.StyleRecord.OutsideEffect);
    t.tstyleindex >= 0 &&
      t.tstyleindex < i &&
      t.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ? (
      (
        r = Resources.SD_CompareStyles(t.StyleRecord, a.lpStyles[t.tstyleindex], !0)
      ) & n.SDSTYLE_NOMATCH_FILL &&
      SDF.WriteSDFill(e, t.StyleRecord.Fill, a),
      r & (
        n.SDSTYLE_NOMATCH_LINETHICK | n.SDSTYLE_NOMATCH_LINEPAT | n.SDSTYLE_NOMATCH_LINEFILL
      ) &&
      SDF.WriteSDLine(
        e,
        t.StyleRecord.Line,
        a,
        FileParser.SDROpCodesByName.SDF_C_BEGIN_LINE,
        t
      ),
      r & (
        n.SDSTYLE_NOMATCH_TEXTFONT | n.SDSTYLE_NOMATCH_TEXTSIZE | n.SDSTYLE_NOMATCH_TEXTFACE | n.SDSTYLE_NOMATCH_TEXTFILL
      ) &&
      SDF.WriteSDTxf(e, t.StyleRecord.Text, a),
      r & n.SDSTYLE_NOMATCH_OUTSIDE &&
      SDF.WriteOutside(e, t.StyleRecord.OutsideEffect)
    ) : SDF.WriteStyle(e, t.StyleRecord, !1, a, t)
  },
  SDF.WriteCellStyleOverrides = function (e, t, a) {
    var r,
      i,
      n = Resources.MatchFlags;
    i = a.lpStyles.length;
    var o = new QuickStyle();// new Resources.QuickStyle;
    if (
      o.Fill = t.fill,
      o.Line = t.hline,
      o.Text = t.Text,
      t.tstyleindex >= 0 &&
      t.tstyleindex < i
    ) (
      r = Resources.SD_CompareStyles(o, a.lpStyles[t.tstyleindex], !0)
    ) & n.SDSTYLE_NOMATCH_FILL &&
      SDF.WriteSDFill(e, t.fill, a),
      r & (
        n.SDSTYLE_NOMATCH_LINETHICK | n.SDSTYLE_NOMATCH_LINEPAT | n.SDSTYLE_NOMATCH_LINEFILL
      ) &&
      SDF.WriteSDLine(
        e,
        t.hline,
        a,
        FileParser.SDROpCodesByName.SDF_C_BEGIN_HLINE,
        null
      ),
      r & (
        n.SDSTYLE_NOMATCH_TEXTFONT | n.SDSTYLE_NOMATCH_TEXTSIZE | n.SDSTYLE_NOMATCH_TEXTFACE | n.SDSTYLE_NOMATCH_TEXTFILL
      ) &&
      SDF.WriteSDTxf(e, t.Text, a),
      (
        r = Resources.SD_CompareLines(t.vline, a.lpStyles[t.tstyleindex].Line, !0)
      ) & (
        n.SDSTYLE_NOMATCH_LINETHICK | n.SDSTYLE_NOMATCH_LINEPAT | n.SDSTYLE_NOMATCH_LINEFILL | n.SDSTYLE_NOMATCH_BTHICK
      ) &&
      SDF.WriteSDLine(
        e,
        t.vline,
        a,
        FileParser.SDROpCodesByName.SDF_C_BEGIN_VLINE,
        null
      );
    else {
      var s = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_CELL_STYLENAME);
      e.writeUCS2String(t.stylename, T3DataStream.LITTLE_ENDIAN, t.stylename.length + 1),
        SDF.Write_LENGTH(e, s),
        SDF.WriteSDFill(e, t.fill, a),
        SDF.WriteSDLine(
          e,
          t.hline,
          a,
          FileParser.SDROpCodesByName.SDF_C_BEGIN_HLINE,
          null
        ),
        SDF.WriteSDTxf(e, t.Text, a),
        SDF.WriteSDLine(
          e,
          t.vline,
          a,
          FileParser.SDROpCodesByName.SDF_C_BEGIN_VLINE,
          null
        )
    }
  },

  SDF.WriteArrowheads = function (e, t, a) {
    var r,
      i,
      n;
    r = a.StartArrowID,
      i = a.EndArrowID,
      a.StartArrowDisp &&
      (r += FileParser.ArrowMasks.ARROW_DISP),
      a.EndArrowDisp &&
      (i += FileParser.ArrowMasks.ARROW_DISP),
      SDF.LineIsReversed(a, t, !1) &&
      (n = i, i = r, r = n);
    var o = {
      arrowsize: a.ArrowSizeIndex,
      sarrow: r,
      earrow: i,
      sarrowid: 0,
      earrowid: 0
    },
      s = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWARROW);
    e.writeStruct(FileParser.SDF_DRAWARROW_Struct, o),
      SDF.Write_LENGTH(e, s)
  },
  SDF.WriteBlob = function (e, t, a) {
    var r = SDF.Write_CODE(e, a);
    e.writeUint8Array(t),
      SDF.Write_LENGTH(e, r)
  },
  SDF.WriteImageHeader = function (e, t, a) {
    var r,
      i,
      n,
      o,
      s = 0;
    t.ImageHeader ? (
      r = t.ImageHeader.mr,
      i = t.ImageHeader.croprect,
      n = t.ImageHeader.scale,
      o = t.ImageHeader.imageflags,
      s = t.ImageHeader.iconid
    ) : (
      r = SDF.ToSDWinRect(t.Frame, a.coordScaleFactor, null),
      i = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      n = 1,
      o = ConstantData.ImageScales.SDIMAGE_ALWAYS_FIT
    );
    var l = {
      mr: r,
      croprect: i,
      imageflags: o,
      scale: n,
      uniqueid: 0,
      iconid: s
    },
      S = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWIMAGE8);
    a.WriteVisio ||
      a.WriteWin32 ? e.writeStruct(FileParser.SDF_DRAWIMAGE8_Struct_50, l) : e.writeStruct(FileParser.SDF_DRAWIMAGE8_Struct_82, l),
      SDF.Write_LENGTH(e, S)
  },
  SDF.WriteCellImageHeader = function (e, t, a) {
    var r,
      i,
      n;
    r = t.Image.mr,
      i = t.Image.croprect,
      n = t.Image.scale;
    var o = {
      mr: r,
      croprect: i,
      imageflags: t.Image.imageflags,
      scale: n,
      uniqueid: 0,
      iconid: t.Image.iconid
    },
      s = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWIMAGE8);
    a.WriteVisio ||
      a.WriteWin32 ? e.writeStruct(FileParser.SDF_DRAWIMAGE8_Struct_50, o) : e.writeStruct(FileParser.SDF_DRAWIMAGE8_Struct_82, o),
      SDF.Write_LENGTH(e, s)
  },
  SDF.WriteOleHeader = function (e, t, a) {
    var r = {
      dva: t.dva,
      linked: t.linked,
      scale: t.scale
    },
      i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_OLEHEADER);
    e.writeStruct(FileParser.SDF_OLEHEADER_Struct, r),
      SDF.Write_LENGTH(e, i)
  },
  SDF.BlockNames = {
    Version: 'Version.sdr',
    Header: 'Header.sdr',
    Header2: 'Header2.sdr',
    sdp: 'SDP.sdr',
    SDData: 'SDData.',
    Layers: 'Layers.sdr',
    Links: 'Links.sdr',
    Image: 'Image.',
    Text: 'Text.',
    Graph: 'Graph.',
    Table: 'Table.',
    GanttInfo: 'GanttInfo',
    LMObject: 'Obj.',
    Native: 'Native.',
    GanttInfo: 'GanttInfo',
    ExpandedView: 'ExpandedView',
    Comment: 'Comment'
  },
  SDF.BlockIDs = {
    Version: 1,
    Header: 2,
    Header2: 3,
    sdp: 4,
    SDData: 5,
    Layers: 6,
    Links: 7,
    Image: 8,
    Text: 9,
    ExpandedView: 10,
    Graph: 11,
    Table: 12,
    GanttInfo: 13,
    LMObject: 14,
    Native: 15,
    Manifest: 16,
    Command: 17,
    SVG: 18,
    Metadata: 19,
    Comment: 20
  },
  SDF.BlockActions = {
    Normal: 0,
    NewDoc: 1,
    Delete: 2,
    UnDelete: 3,
    PartialBlock: 4,
    PartialBlockEnd: 5,
    AddPage: 6,
    ChangePage: 7,
    ClosePage: 8,
    CurrentPage: 9,
    RenamePage: 10,
    DeletePage: 11,
    ReorderPages: 12,
    SaveAs: 13
  },
  SDF.Block = function (e, t, a) {
    this.Name = e,
      this.Length = t,
      this.bytes = a
  },
  SDF.BlockHeader = function (e, t, a, r, i, n) {
    this.state = e,
      this.delta = t,
      this.action = SDF.BlockActions.Normal,
      this.blocktype = a,
      this.blockid = r,
      this.index = i,
      this.nblocks = n
  },
  SDF.ServerState = function () {
    this.StateSent = 0,
      this.currentblocklist = []
  };
var TestServer = new SDF.ServerState;
SDF.GetBlocksByName = function (e, t) {
  var a,
    r,
    i,
    n,
    o = [];
  for (
    a = TestServer.currentblocklist.length,
    r = 0;
    r < a &&
    (
      (
        'sdr' === (n = (i = TestServer.currentblocklist[r]).Name.split('.'))[1] ? i.Name : n[0] + '.'
      ) !== e ||
      (o.push(i), !t)
    );
    r++
  );
  return o
},
  SDF.WriteBlockSDRTest = function (e) {
    var t,
      a,
      r,
      i,
      n = new ArrayBuffer(10),
      o = new T3DataStream(n);
    for (
      GlobalData.optManager.Table_Release(!1),
      e ||
        0 === TestServer.currentblocklist.length ? t = SDF.WriteAllBlocks() : (
        t = [],
        a = SDF.GetBlocksByName(SDF.BlockNames.Header, !0),
        t = t.concat(a),
        a = SDF.GetBlocksByName(SDF.BlockNames.Header2, !0),
        t = t.concat(a),
        a = SDF.GetBlocksByName(SDF.BlockNames.sdp, !0),
        t = t.concat(a),
        a = SDF.GetBlocksByName(SDF.BlockNames.SDData, !0),
        t = t.concat(a),
        a = SDF.GetBlocksByName(SDF.BlockNames.Layers, !0),
        t = t.concat(a),
        a = SDF.GetBlocksByName(SDF.BlockNames.Links, !0),
        t = t.concat(a),
        a = SDF.GetBlocksByName(SDF.BlockNames.Image, !1),
        t = t.concat(a),
        a = SDF.GetBlocksByName(SDF.BlockNames.Text, !1),
        t = t.concat(a),
        a = SDF.GetBlocksByName(SDF.BlockNames.Table, !1),
        t = t.concat(a),
        a = SDF.GetBlocksByName(SDF.BlockNames.Graph, !1),
        t = t.concat(a),
        a = SDF.GetBlocksByName(SDF.BlockNames.GanttInfo, !1),
        t = t.concat(a),
        a = SDF.GetBlocksByName(SDF.BlockNames.LMObject, !1),
        t = t.concat(a),
        a = SDF.GetBlocksByName(SDF.BlockNames.Native, !1),
        t = t.concat(a)
      ),
      o.endianness = T3DataStream.LITTLE_ENDIAN,
      r = t.length,
      i = 0;
      i < r;
      i++
    ) o.writeUint8Array(t[i].bytes);
    if (
      o.writeUint16(FileParser.SDROpCodesByName.SDF_C_DRAW12_END),
      o.writeUint16(FileParser.SDROpCodesByName.SDF_C_ENDFILE),
      window.webkitRequestFileSystem
    ) {
      var s = new Blob([o.buffer]);
      SDF.WriteLocalFile(s)
    } else {
      var l,
        S = new SDF.Result,
        c = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
        u = GlobalData.optManager.ZList();
      S.isTemplate = !1,
        S.sdp = c,
        S.gHash = new HashController(),// new SDUI.HashController,
        S.tLMB = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1),
        l = u.slice(0),
        GlobalData.optManager.DeleteObjects(l, !1),
        GlobalData.optManager.UpdateLinks(),
        SDF.DeleteInstances(ConstantData.StoredObjectType.H_NATIVE_OBJECT),
        SDF.ReadFileFromBuffer(o.buffer, S)
    }
  },
  SDF.DeleteInstances = function (e) {
    var t,
      a,
      r = GlobalData.objectStore.GetObjects(e);
    for (t = r.length, a = 0; a < t; a++) r[a].Delete()
  },
  SDF.ReplaceBlock = function (e) {
    var t,
      a;
    for (t = TestServer.currentblocklist.length, a = 0; a < t; a++) if (TestServer.currentblocklist[a].Name === e.Name) return e.Length < 0 ? void TestServer.currentblocklist.splice(a, 1) : void (TestServer.currentblocklist[a] = e);
    TestServer.currentblocklist.push(e)
  },
  SDF.HeaderFilters = [],
  // SDF_StateSent = 0,
  SDF.Header2Count = 0,
  SDF.SendState = function (e, t) {
    // SDJS.SocketClient.SendBlock(e),
    //   SDF_StateSent = t
  },
  SDF.WriteAllBlocks = function () {
    try {
      var e,
        t,
        a,
        r,
        i,
        n,
        o = new SDF.WResult,
        s = new ArrayBuffer(10),
        l = new T3DataStream(s),
        S = 6;
      l.endianness = T3DataStream.LITTLE_ENDIAN,
        o.sdp = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
        o.ctp = GlobalData.optManager.theContentHeader,
        o.tLMB = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1),
        SDUI.Commands.MainController.SymbolLibraryBrowser.CurrentLibraryPath ? o.LibraryPathTarget = SDUI.Commands.MainController.SymbolLibraryBrowser.CurrentLibraryPath : o.LibraryPathTarget = SDUI.Commands.MainController.SymbolLibraryBrowser.LibraryPathTarget,
        o.WriteBlocks = !0;
      var c = GlobalData.docHandler.svgDoc.GetWorkArea();
      o.WindowSettings.wscale = GlobalData.docHandler.GetZoomFactor(),
        o.WindowSettings.worigin.x = c.scrollX,
        o.WindowSettings.worigin.y = c.scrollY,
        o.WindowSettings.wflags = 0,
        GlobalData.docHandler.scaleToFit ? o.WindowSettings.wflags = ListManager.WFlags.W_Stf : GlobalData.docHandler.scaleToPage &&
          (o.WindowSettings.wflags = ListManager.WFlags.W_Page),
        o.docDpi = GlobalData.docHandler.svgDoc.docInfo.docDpi,
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_ShowGrid,
          GlobalData.docHandler.documentConfig.showGrid
        ),
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_ShowRulers,
          GlobalData.docHandler.documentConfig.showRulers
        ),
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_SnapToGridC,
          GlobalData.docHandler.documentConfig.centerSnap &&
          GlobalData.docHandler.documentConfig.enableSnap
        ),
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_SnapToGridTL,
          !GlobalData.docHandler.documentConfig.centerSnap &&
          GlobalData.docHandler.documentConfig.enableSnap
        ),
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_ShowPageDividers,
          GlobalData.docHandler.documentConfig.showPageDivider
        ),
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_SnapToShapes_Off,
          0 == GlobalData.docHandler.documentConfig.snapToShapes
        ),
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_ShowRulers,
          GlobalData.docHandler.documentConfig.showRulers
        ),
        1 === o.WindowSettings.wscale ? o.WindowSettings.wscale = 0 : o.WindowSettings.wscale *= 1000,
        o.ctp.smartpanelname = SDF.ToSDWinPanelName(ConstantData.DocumentContext.CurrentSmartPanel),
        o.rulerSettings = GlobalData.docHandler.rulerSettings,
        o.rulerSettings.show = GlobalData.docHandler.documentConfig.showRulers,
        o.fontlist = GlobalData.optManager.theContentHeader.FontList,
        o.RichGradients = GlobalData.optManager.RichGradients,
        l.endianness = T3DataStream.LITTLE_ENDIAN;
      var u = GlobalData.objectStore.GetObjects(ConstantData.StoredObjectType.BLOBBYTES_OBJECT),
        p = GlobalData.objectStore.GetObjects(ConstantData.StoredObjectType.LM_TEXT_OBJECT),
        d = GlobalData.objectStore.GetObjects(ConstantData.StoredObjectType.LM_NOTES_OBJECT),
        D = GlobalData.objectStore.GetObjects(ConstantData.StoredObjectType.TABLE_OBJECT),
        g = GlobalData.objectStore.GetObjects(ConstantData.StoredObjectType.GRAPH_OBJECT),
        m = GlobalData.objectStore.GetObjects(ConstantData.StoredObjectType.EXPANDEDVIEW_OBJECT),
        C = GlobalData.objectStore.GetObjects(ConstantData.StoredObjectType.LM_COMMENT_BLOCK),
        y = GlobalData.optManager.ZList(),
        f = GlobalData.objectStore.GetObjects(ConstantData.StoredObjectType.H_NATIVE_OBJECT),
        L = GlobalData.objectStore.GetObjects(ConstantData.StoredObjectType.H_NATIVEWIN_OBJECT);
      for (r = y.length, i = 0, n = 0; n < r; n++) (t = GlobalData.optManager.GetObjectPtr(y[n], !1)).bInGroup ||
        i++;
      var I = S + u.length + p.length + d.length + h.length + D.length + g.length + m.length + C.length + i + f.length + L.length;
      o.nblocks = I,
        o.BlockAction = SDF.BlockActions.NewDoc,
        o.state = GlobalData.stateManager.CurrentStateID + GlobalData.stateManager.DroppedStates,
        o.delta = 0,
        SDF.WriteBlockWrapper(
          l,
          o.state,
          o.delta,
          SDF.BlockIDs.Version,
          0,
          0,
          I,
          o.BlockAction
        ),
        l.writeCString(SDF.Signature, SDF.Signature.length),
        SDF.Write_SDF_C_VERSION(
          l,
          FileParser.Platforms.SDF_SDJSBLOCK,
          GlobalData.optManager.FileVersion
        ),
        SDF.SendState(new Uint8Array(l.buffer), o.state),
        a = SDF.WriteHeaderBlock(o, 1, null),
        SDF.SendState(a, o.state),
        a = SDF.WriteSDPBlock(o, 2),
        SDF.SendState(a, o.state),
        a = SDF.WriteSDDataBlock(o, 3),
        SDF.SendState(a, o.state);
      var T = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1);
      for (
        a = SDF.WriteLayersBlock(T, o, 4),
        SDF.SendState(a, o.state),
        e = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, !1),
        a = SDF.WriteLinksBlock(e, o, 5),
        SDF.SendState(a, o.state),
        r = u.length,
        n = 0;
        n < r;
        n++
      ) a = SDF.WriteImageBlock(u[n], o, S + n),
        SDF.SendState(a, o.state);
      for (S += r, r = p.length, n = 0; n < r; n++) a = SDF.WriteTextBlock(p[n], o, !1, S + n),
        SDF.SendState(a, o.state);
      for (S += r, r = d.length, n = 0; n < r; n++) a = SDF.WriteTextBlock(d[n], o, !0, S + n),
        SDF.SendState(a, o.state);
      for (S += r, r = h.length, n = 0; n < r; n++) a = SDF.WriteGanttInfoBlock(h[n], o, S + n),
        SDF.SendState(a, o.state);
      for (S += r, r = g.length, n = 0; n < r; n++) a = SDF.WriteGraphBlock(g[n], o, S + n),
        SDF.SendState(a, o.state);
      for (S += r, r = m.length, n = 0; n < r; n++) a = SDF.WriteExpandedViewBlock(m[n], o, S + n),
        SDF.SendState(a, o.state);
      for (S += r, r = C.length, n = 0; n < r; n++) a = SDF.WriteCommentBlock(C[n], o, S + n),
        SDF.SendState(a, o.state);
      for (S += r, r = D.length, n = 0; n < r; n++) a = SDF.WriteTableBlock(D[n], o, S + n),
        SDF.SendState(a, o.state);
      for (S += r, r = y.length, i = 0, n = 0; n < r; n++) (t = GlobalData.optManager.GetObjectPtr(y[n], !1)).bInGroup ||
        (
          a = SDF.WriteOBJBlock(t, o, S + i),
          i++,
          SDF.SendState(a, o.state)
        );
      for (S += i, r = f.length, n = 0; n < r; n++) a = SDF.WriteNativeBlock(
        f[n],
        FileParser.SDROpCodesByName.SDF_C_NATIVEBLOCK,
        o,
        S + n
      ),
        SDF.SendState(a, o.state);
      for (S += r, r = L.length, n = 0; n < r; n++) a = SDF.WriteNativeBlock(
        L[n],
        FileParser.SDROpCodesByName.SDF_C_NATIVEWINBLOCK,
        o,
        S + n
      ),
        SDF.SendState(a, o.state);
      return S += r
    } catch (e) {
      GlobalData.optManager.Export_ExceptionCleanup(e)
    }
  },
  SDF.SaveAllBlocks = function (e, t) {
    if (
      // false !== SDUI.AppSettings.SocketEnabled &&
      // true !== SDUI.AppSettings.ReadOnly &&
      // Double ===
      /*!Collab.IsSecondary()*/ true
    ) if (/*SDJS.SocketClient.GetStatus() == WebSocket.OPEN*/false) {
      var a,
        r,
        i,
        n = GlobalData.optManager.SocketAction.length,
        o = ListManager.SocketActions;
      if (n) {
        var s = {
          state: 0,
          delta: 0,
          nblocks: 1
        };
        for (a = 0; a < n; a++) switch (GlobalData.optManager.SocketAction[a]) {
          case o.SaveAllBlocks:
            SDF.WriteAllBlocks(),
              SDF.HeaderFilters = [],
              SDF.Header2Count = 0;
            break;
          case o.ClosePage:
            r = SDF.WriteActionBlock(
              s,
              SDF.BlockIDs.Command,
              0,
              SDF.BlockActions.ClosePage,
              0
            ),
              SDF.SendState(r, - 1);
            break;
          case o.AddDupPage:
          case o.AddNewPage:
            SDF.AddPage_Initiate(GlobalData.optManager.SocketAction[a], GlobalData.optManager.SocketAction[a + 1]);
            break;
          case o.Insert_Template:
          case o.Insert_Document:
            SDF.AddPage_Initiate(
              GlobalData.optManager.SocketAction[a],
              GlobalData.optManager.SocketAction[a + 1],
              GlobalData.optManager.SocketAction[a + 2]
            );
            break;
          case o.ChangePage:
            SDF.ChangePage_Initiate(- 1, GlobalData.optManager.SocketAction[a + 1]);
            break;
          case o.RenamePage:
            SDF.RenamePage_Initiate(
              GlobalData.optManager.SocketAction[a + 1],
              GlobalData.optManager.SocketAction[a + 2]
            );
            break;
          case o.RenamePage_NoSocket:
            SDF.RenamePage_InitiateSocketOpen(
              GlobalData.optManager.SocketAction[a + 1],
              GlobalData.optManager.SocketAction[a + 2]
            );
            break;
          case o.DeletePage_NoSocket:
            SDF.DeletePage_InitiateSocketOpen(GlobalData.optManager.SocketAction[a + 1]);
            break;
          case o.DeletePage:
            SDF.DeletePage_Initiate(GlobalData.optManager.SocketAction[a + 1]);
            break;
          case o.ReorderPages:
            SDF.ReorderPages_Initiate(GlobalData.optManager.SocketAction[a + 1])
        }
        GlobalData.optManager.SocketAction = []
      } else {
        SDF.WriteAllBlocks();
        SDF.HeaderFilters = [],
          SDF.Header2Count = 0,
          t ||
          (
            i = SDUI.Commands.MainController.PagedSDRController.GetManifest()
          ) &&
          i.TabOrder.length &&
          (
            r = SDF.WriteManifestBlock(i, SDF.BlockActions.CurrentPage),
            SDF.SendState(r, - 1)
          ),
          GlobalData.optManager.OldFileMetaData &&
          (
            SDF.WriteFileMetadata(GlobalData.optManager.OldFileMetaData),
            GlobalData.optManager.OldFileMetaData = null
          )
      }
      // SDUI.Commands.MainController.PagedSDRController.SetOperationInProgress(!0),
      //   SDF.SetCurrentPageNumber(
      //     (
      //       function () {
      //         SDUI.Commands.MainController.PagedSDRController.SetOperationInProgress(!1)
      //       }
      //     )
      //   )
    }

    // else SDJS.SocketClient.GetStatus() == WebSocket.CLOSED &&
    //   (
    //     null != ConstantData.DocumentContext.CloudFileMetadata &&
    //       null != ConstantData.DocumentContext.CloudFileMetadata.DepositoryID &&
    //       !0 !== SDJS.SocketClient.retryPending ? SDUI.Commands.MainController.ActiveSessionController.CheckDocumentBeforeOpenSocket() : SDJS.SocketClient.Init({
    //       }, SDF.GetSocketClientOptions)
    //   )
  },


  SDF.GetBlockName = function (e, t, a) {
    var r,
      i = ConstantData.StoredObjectType;
    switch (e.Type) {
      case i.BASE_LM_DRAWING_OBJECT:
        r = SDF.BlockNames.LMObject + e.ID,
          a &&
          (a.id = e.ID, a.type = SDF.BlockIDs.LMObject);
        break;
      case i.LM_TEXT_OBJECT:
      case i.LM_NOTES_OBJECT:
        r = SDF.BlockNames.Text + e.ID,
          a &&
          (a.id = e.ID, a.type = SDF.BlockIDs.Text);
        break;
      case i.TABLE_OBJECT:
        r = SDF.BlockNames.Table + e.ID,
          a &&
          (a.id = e.ID, a.type = SDF.BlockIDs.Table);
        break;
      case i.GRAPH_OBJECT:
        r = SDF.BlockNames.Graph + e.ID,
          a &&
          (a.id = e.ID, a.type = SDF.BlockIDs.Graph);
        break;
      case i.EXPANDEDVIEW_OBJECT:
        r = SDF.BlockNames.ExpandedView + e.ID,
          a &&
          (a.id = e.ID, a.type = SDF.BlockIDs.ExpandedView);
        break;
      case i.LM_COMMENT_BLOCK:
        r = SDF.BlockNames.Comment + e.ID,
          a &&
          (a.id = e.ID, a.type = SDF.BlockIDs.Comment);
        break;

      case i.H_NATIVE_OBJECT:
      case i.H_NATIVEWIN_OBJECT:
        r = SDF.BlockNames.Native + e.ID,
          a &&
          (a.id = e.ID, a.type = SDF.BlockIDs.Native);
        break;
      case i.BLOBBYTES_OBJECT:
        r = SDF.BlockNames.Image + e.ID,
          a &&
          (a.id = e.ID, a.type = SDF.BlockIDs.Image);
        break;
      case i.SED_SESSION_OBJECT:
        if (t) return null;
        r = SDF.BlockNames.sdp,
          a &&
          (a.id = e.ID, a.type = SDF.BlockIDs.sdp);
        break;
      case i.LAYERS_MANAGER_OBJECT:
        if (t) return null;
        r = SDF.BlockNames.Layers,
          a &&
          (a.id = e.ID, a.type = SDF.BlockIDs.Layers);
        break;
      case i.SDDATA_OBJECT:
        if (t) return null;
        r = SDF.BlockNames.SDData,
          a &&
          (a.id = e.ID, a.type = SDF.BlockIDs.SDData);
        break;
      case i.LINKLIST_OBJECT:
        if (t) return null;
        r = SDF.BlockNames.Links,
          a &&
          (a.id = e.ID, a.type = SDF.BlockIDs.Links)
    }
    return r
  },





  SDF.BuildObjectBlock = function (e, t, a, r) {
    var i,
      n,
      o = ConstantData.StoredObjectType;
    switch (e.Type) {
      case o.BASE_LM_DRAWING_OBJECT:
        if ((i = GlobalData.objectStore.GetObject(e.ID)) && !i.Data.bInGroup) {
          if (a) return !0;
          n = SDF.WriteOBJBlock(i.Data, t, r)
        }
        break;
      case o.LM_TEXT_OBJECT:
        if (i = GlobalData.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteTextBlock(i, t, !1, r)
        }
        break;
      case o.LM_NOTES_OBJECT:
        if (i = GlobalData.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteTextBlock(i, t, !0, r)
        }
        break;
      case o.TABLE_OBJECT:
        if (i = GlobalData.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteTableBlock(i, t, r)
        }
        break;
      case o.GRAPH_OBJECT:
        if (i = GlobalData.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteGraphBlock(i, t, r)
        }
        break;
      case o.EXPANDEDVIEW_OBJECT:
        if (i = GlobalData.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteExpandedViewBlock(i, t, r)
        }
        break;
      case o.LM_COMMENT_BLOCK:
        if (i = GlobalData.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteCommentBlock(i, t, r)
        }
        break;

      case o.BLOBBYTES_OBJECT:
        if (i = GlobalData.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteImageBlock(i, t, r)
        }
        break;
      case o.H_NATIVE_OBJECT:
        if (i = GlobalData.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteNativeBlock(i, FileParser.SDROpCodesByName.SDF_C_NATIVEBLOCK, t, r)
        }
        break;
      case o.H_NATIVEWIN_OBJECT:
        if (i = GlobalData.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteNativeBlock(i, FileParser.SDROpCodesByName.SDF_C_NATIVEWINBLOCK, t, r)
        }
        break;
      case o.SED_SESSION_OBJECT:
        if (a) return !0;
        n = SDF.WriteSDPBlock(t, r);
        break;
      case o.SDDATA_OBJECT:
        if (a) return !0;
        GlobalData.optManager.theContentHeader.SDDataID >= 0 &&
          (n = SDF.WriteSDDataBlock(t, r));
        break;
      case o.LAYERS_MANAGER_OBJECT:
        if (a) return !0;
        n = SDF.WriteLayersBlock(t.tLMB, t, r);
        break;
      case o.LINKLIST_OBJECT:
        if (i = GlobalData.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteLinksBlock(i.Data, t, r)
        }
    }
    return n
  },
  SDF.SaveChangedBlocks = function (e, t, a, r) {
    try {
      if (
        // !1 === SDUI.AppSettings.SocketEnabled ||
        // !0 === SDUI.AppSettings.ReadOnly
        false
      ) return;
      if (/*Collab.IsSecondary()*/false) return;
      // if (SDJS.SocketClient.GetStatus() != WebSocket.OPEN) return void (
      //   SDJS.SocketClient.GetStatus() == WebSocket.CLOSED &&
      //   (
      //     null != ConstantData.DocumentContext.CloudFileMetadata &&
      //       null != ConstantData.DocumentContext.CloudFileMetadata.DepositoryID &&
      //       !0 !== SDJS.SocketClient.retryPending ? SDUI.Commands.MainController.ActiveSessionController.CheckDocumentBeforeOpenSocket() : SDJS.SocketClient.Init({
      //       }, SDF.GetSocketClientOptions)
      //   )
      // );
      ConstantData.StoredObjectType;
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
        D = new SDF.WResult,
        g = [],
        h = {};
      null == a &&
        (a = e),
        p = (d = GlobalData.stateManager.States[e].StoredObjects).length,
        D.sdp = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
        D.ctp = GlobalData.optManager.theContentHeader,
        D.tLMB = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1),
        D.fontlist = GlobalData.optManager.theContentHeader.FontList,
        D.RichGradients = GlobalData.optManager.RichGradients,

        // Double ===
        // SDUI.Commands.MainController.SymbolLibraryBrowser.CurrentLibraryPath ?
        //  D.LibraryPathTarget = SDUI.Commands.MainController.SymbolLibraryBrowser.CurrentLibraryPath :
        //   D.LibraryPathTarget = SDUI.Commands.MainController.SymbolLibraryBrowser.LibraryPathTarget,
        D.WriteBlocks = !0;
      var m = GlobalData.docHandler.svgDoc.GetWorkArea();
      if (
        D.WindowSettings.wscale = GlobalData.docHandler.GetZoomFactor(),
        D.WindowSettings.worigin.x = m.scrollX,
        D.WindowSettings.worigin.y = m.scrollY,
        D.WindowSettings.wflags = 0,
        GlobalData.docHandler.scaleToFit ? D.WindowSettings.wflags = ListManager.WFlags.W_Stf : GlobalData.docHandler.scaleToPage &&
          (D.WindowSettings.wflags = ListManager.WFlags.W_Page),
        D.docDpi = GlobalData.docHandler.svgDoc.docInfo.docDpi,
        1 === D.WindowSettings.wscale ? D.WindowSettings.wscale = 0 : D.WindowSettings.wscale *= 1000,
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_ShowGrid,
          GlobalData.docHandler.documentConfig.showGrid
        ),
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_ShowRulers,
          GlobalData.docHandler.documentConfig.showRulers
        ),
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_SnapToGridC,
          GlobalData.docHandler.documentConfig.centerSnap &&
          GlobalData.docHandler.documentConfig.enableSnap
        ),
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_SnapToGridTL,
          !GlobalData.docHandler.documentConfig.centerSnap &&
          GlobalData.docHandler.documentConfig.enableSnap
        ),
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_ShowPageDividers,
          GlobalData.docHandler.documentConfig.showPageDivider
        ),
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_SnapToShapes_Off,
          0 == GlobalData.docHandler.documentConfig.snapToShapes
        ),
        GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
          GlobalData.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_ShowRulers,
          GlobalData.docHandler.documentConfig.showRulers
        ),
        D.ctp.smartpanelname = SDF.ToSDWinPanelName(ConstantData.DocumentContext.CurrentSmartPanel),
        D.rulerSettings = GlobalData.docHandler.rulerSettings,
        D.rulerSettings.show = GlobalData.docHandler.documentConfig.showRulers,
        l = 1,
        t < 0 &&
        e + 1 < GlobalData.stateManager.States.length
      ) for (i = GlobalData.stateManager.States[e + 1].StoredObjects.length, n = 0; n < i; n++) if (
        (o = GlobalData.stateManager.States[e + 1].StoredObjects[n]).StateOperationTypeID === Globals.StateOperationType.CREATE
      ) SDF.GetBlockName(o, !0) &&
        l++;
      else if (
        o.StateOperationTypeID === Globals.StateOperationType.DELETE
      ) SDF.GetBlockName(o, !0) &&
        SDF.GetBlockName(o, !0) &&
        (s = SDF.BuildObjectBlock(o, D, !0, 0)) &&
        (l++, g.push(o.ID));
      else {
        for (u = !1, c = 0; c < p; c++) if (d[c].ID === o.ID) {
          u = !0;
          break
        }
        u ||
          (s = SDF.BuildObjectBlock(o, D, !0, 0)) &&
          l++
      }
      for (
        i = (d = r || GlobalData.stateManager.States[e].StoredObjects).length,
        n = 0;
        n < i;
        n++
      ) (o = d[n]).StateOperationTypeID === Globals.StateOperationType.DELETE ? SDF.GetBlockName(o, !0) &&
        l++ : - 1 === g.indexOf(o.ID) &&
        (s = SDF.BuildObjectBlock(o, D, !0, 0)) &&
      l++;
      if (
        D.nblocks = l,
        D.BlockAction = SDF.BlockActions.Normal,
        D.state = a + GlobalData.stateManager.DroppedStates,
        // D.state === SDF_StateSent &&
        1 === t &&
        (t = 0),
        D.delta = t,
        g = [],
        S = 0,
        GlobalData.gTestException
      ) {
        var C = new Error(Resources.Strings.Error_InComplete);
        throw C.name = '1',
        C
      }
      if (
        s = SDF.WriteHeaderBlock(D, S, SDF.HeaderFilters),
        // SDF.SendState(s, D.state),
        S++,
        t < 0 &&
        e + 1 < GlobalData.stateManager.States.length
      ) for (i = GlobalData.stateManager.States[e + 1].StoredObjects.length, n = 0; n < i; n++) if (
        (o = GlobalData.stateManager.States[e + 1].StoredObjects[n]).StateOperationTypeID === Globals.StateOperationType.CREATE
      ) SDF.GetBlockName(o, !0, h) &&
        (
          s = SDF.WriteActionBlock(D, h.type, h.id, SDF.BlockActions.Delete, S),
          // SDF.SendState(s, D.state),
          S++
        );
      else if (
        o.StateOperationTypeID === Globals.StateOperationType.DELETE
      ) o = GlobalData.objectStore.GetObject(o.ID),
        (s = SDF.BuildObjectBlock(o, D, !1, S))
      //&&
      // (SDF.SendState(s, D.state), S++, g.push(o.ID));

      else {
        for (u = !1, c = 0; c < p; c++) if (d[c].ID === o.ID) {
          u = !0;
          break
        }
        u ||
          (
            o = GlobalData.objectStore.GetObject(o.ID),
            (s = SDF.BuildObjectBlock(o, D, !1, S))
            // &&
            // (SDF.SendState(s, D.state), S++)
          )
      }
      for (i = d.length, n = 0; n < i; n++) (o = d[n]).StateOperationTypeID === Globals.StateOperationType.DELETE ? SDF.GetBlockName(o, !0, h) &&
        (
          s = SDF.WriteActionBlock(D, h.type, h.id, SDF.BlockActions.Delete, S)
          // ,
          // SDF.SendState(s, D.state)
          ,
          S++
        ) : - 1 === g.indexOf(o.ID) &&
      (s = SDF.BuildObjectBlock(o, D, !1, S))
      //&&
      // (SDF.SendState(s, D.state), S++);
      // 0 != (
      //   ConstantData.DocumentContext.HintSeen & Globals.HintFlags.Save
      // ) ||
      //   SDUI.AppSettings.AnonymousTrial ||
      //   (
      //     ConstantData.DocumentContext.HintSeen = Utils2.SetFlag(
      //       ConstantData.DocumentContext.HintSeen,
      //       Globals.HintFlags.Save,
      //       !0
      //     ),
      //     // SDUI.Commands.MainController.ShowModeless(Resources.Controls.Modals.Hint_AutoSave.Id)
      //   )
    } catch (C) {
      GlobalData.optManager.Export_ExceptionCleanup(C)
    }
  },
  SDF.WriteBlockWrapper = function (e, t, a, r, i, n, o, s) {
    var l = new SDF.BlockHeader(t, a, r, i, n, o);
    l.action = s,
      e.writeStruct(FileParser.BLOCK_HEADER_Struct, l)
  },
  SDF.WriteActionBlock = function (e, t, a, r, i) {
    var n = new ArrayBuffer(10),
      o = new T3DataStream(n);
    return o.endianness = T3DataStream.LITTLE_ENDIAN,
      SDF.WriteBlockWrapper(o, e.state, e.delta, t, a, i, e.nblocks, r),
      new Uint8Array(o.buffer)
  },
  SDF.WriteSDPBlock = function (e, t) {
    var a,
      r,
      i = new ArrayBuffer(10),
      n = new T3DataStream(i);
    if (
      n.endianness = T3DataStream.LITTLE_ENDIAN,
      SDF.WriteBlockWrapper(
        n,
        e.state,
        e.delta,
        SDF.BlockIDs.sdp,
        0,
        t,
        e.nblocks,
        e.BlockAction
      ),
      SDF.write_SDF_C_DRAW12(n, e),
      SDF.WriteStyle(n, e.sdp.def.style, !0, e, null),
      SDF.WriteSDLine(
        n,
        e.sdp.def.style.Line,
        e,
        FileParser.SDROpCodesByName.SDF_C_BEGIN_LINE,
        null
      ),
      e.sdp.background.Paint.FillType !== ConstantData.FillTypes.SDFILL_TRANSPARENT &&
      SDF.WriteSDFill(n, e.sdp.background, e),
      (r = GlobalData.optManager.TextureList.Textures.length) > GlobalData.optManager.NStdTextures
    ) {
      for (a = GlobalData.optManager.NStdTextures; a < r; a++) e.TextureList.push(a);
      SDF.WriteTextureList(n, GlobalData.optManager.TextureList, e)
    }
    return SDF.WriteRulers(n, e),
      SDF.WriteRecentList(n, e),
      new Uint8Array(n.buffer)
  },
  SDF.WriteOBJBlock = function (e, t, a) {
    var r = new ArrayBuffer(10),
      i = new T3DataStream(r);
    return i.endianness = T3DataStream.LITTLE_ENDIAN,
      e.tstyleindex = - 1,
      SDF.WriteBlockWrapper(
        i,
        t.state,
        t.delta,
        SDF.BlockIDs.LMObject,
        e.BlockID,
        a,
        t.nblocks,
        t.BlockAction
      ),
      SDF.WriteObject(i, 0, e, t),
      new Uint8Array(i.buffer)
  },
  SDF.WriteLinksBlock = function (e, t, a) {
    var r = new ArrayBuffer(10),
      i = new T3DataStream(r);
    return i.endianness = T3DataStream.LITTLE_ENDIAN,
      t.links = e,
      SDF.WriteBlockWrapper(
        i,
        t.state,
        t.delta,
        SDF.BlockIDs.Links,
        0,
        a,
        t.nblocks,
        t.BlockAction
      ),
      SDF.WriteLinks(i, t),
      SDF.BlockNames.Links,
      new Uint8Array(i.buffer)
  },
  SDF.WriteLayersBlock = function (e, t, a) {
    var r = new ArrayBuffer(10),
      i = new T3DataStream(r);
    return i.endianness = T3DataStream.LITTLE_ENDIAN,
      t.tLMB = e,
      SDF.WriteBlockWrapper(
        i,
        t.state,
        t.delta,
        SDF.BlockIDs.Layers,
        0,
        a,
        t.nblocks,
        t.BlockAction
      ),
      SDF.WriteLayers(i, t),
      SDF.BlockNames.Layers,
      new Uint8Array(i.buffer)
  },
  SDF.WriteTextBlock = function (e, t, a, r) {
    var i = new ArrayBuffer(10),
      n = new T3DataStream(i);
    return n.endianness = T3DataStream.LITTLE_ENDIAN,
      SDF.WriteBlockWrapper(
        n,
        t.state,
        t.delta,
        SDF.BlockIDs.Text,
        e.ID,
        r,
        t.nblocks,
        t.BlockAction
      ),
      SDF.WriteText(n, null, null, e, a, t),
      new Uint8Array(n.buffer)
  },
  SDF.WriteNativeBlock = function (e, t, a, r) {
    var i = new ArrayBuffer(10),
      n = new T3DataStream(i);
    n.endianness = T3DataStream.LITTLE_ENDIAN,
      SDF.WriteBlockWrapper(
        n,
        a.state,
        a.delta,
        SDF.BlockIDs.Native,
        e.ID,
        r,
        a.nblocks,
        a.BlockAction
      );
    var o = SDF.Write_CODE(n, t),
      s = {
        value: e.ID
      };
    return n.writeStruct(FileParser.LONGVALUE_Struct, s),
      FileParser.write_nativebytearray(n, e.Data),
      SDF.Write_LENGTH(n, o),
      new Uint8Array(n.buffer)
  },
  SDF.WriteTableBlock = function (e, t, a) {
    var r = new ArrayBuffer(10),
      i = new T3DataStream(r);
    i.endianness = T3DataStream.LITTLE_ENDIAN,
      SDF.WriteBlockWrapper(
        i,
        t.state,
        t.delta,
        SDF.BlockIDs.Table,
        e.ID,
        a,
        t.nblocks,
        t.BlockAction
      );
    var n = SDF.Write_CODE(i, FileParser.SDROpCodesByName.SDF_C_TABLEBLOCK),
      o = {
        value: e.ID
      };
    return i.writeStruct(FileParser.LONGVALUE_Struct, o),
      SDF.Write_LENGTH(i, n),
      SDF.WriteTable(i, e.Data, t),
      new Uint8Array(i.buffer)
  }

SDF.WriteGanttInfoBlock = function (e, t, a) {
  var r = new ArrayBuffer(10),
    i = new T3DataStream(r);
  i.endianness = T3DataStream.LITTLE_ENDIAN,
    SDF.WriteBlockWrapper(
      i,
      t.state,
      t.delta,
      SDF.BlockIDs.GanttInfo,
      e.ID,
      a,
      t.nblocks,
      t.BlockAction
    );
  var n = SDF.Write_CODE(i, FileParser.SDROpCodesByName.SDF_C_GANTTINFOBLOCK),
    o = {
      value: e.ID
    };
  return i.writeStruct(FileParser.LONGVALUE_Struct, o),
    SDF.Write_LENGTH(i, n),
    SDF.WriteGanttInfo(i, e.Data, t),
    new Uint8Array(i.buffer)
}

SDF.WriteGraphBlock = function (e, t, a) {
  var r = new ArrayBuffer(10),
    i = new T3DataStream(r);
  i.endianness = T3DataStream.LITTLE_ENDIAN,
    SDF.WriteBlockWrapper(
      i,
      t.state,
      t.delta,
      SDF.BlockIDs.Graph,
      e.ID,
      a,
      t.nblocks,
      t.BlockAction
    );
  var n = SDF.Write_CODE(i, FileParser.SDROpCodesByName.SDF_C_GRAPHBLOCK),
    o = {
      value: e.ID
    };
  return i.writeStruct(FileParser.LONGVALUE_Struct, o),
    SDF.Write_LENGTH(i, n),
    SDF.WriteGraph(i, e.Data, t),
    new Uint8Array(i.buffer)
}

SDF.WriteSDDataBlock = function (e, t) {
  var a = new ArrayBuffer(10),
    r = new T3DataStream(a);
  return r.endianness = T3DataStream.LITTLE_ENDIAN,
    SDF.WriteBlockWrapper(
      r,
      e.state,
      e.delta,
      SDF.BlockIDs.SDData,
      0,
      t,
      e.nblocks,
      e.BlockAction
    ),
    SDF.WriteSDDATA(r, e),
    new Uint8Array(r.buffer)
}

SDF.WriteImageBlock = function (e, t, a) {
  var r = new ArrayBuffer(10),
    i = new T3DataStream(r);
  i.endianness = T3DataStream.LITTLE_ENDIAN,
    SDF.WriteBlockWrapper(
      i,
      t.state,
      t.delta,
      SDF.BlockIDs.Image,
      e.ID,
      a,
      t.nblocks,
      t.BlockAction
    );
  var n = SDF.Write_CODE(i, FileParser.SDROpCodesByName.SDF_C_IMAGEBLOCK),
    o = {
      value: e.ID,
      type: e.Data.ImageDir
    };
  return i.writeStruct(FileParser.LONGVALUE2_Struct, o),
    FileParser.write_nativebytearray(i, e.Data.Bytes),
    SDF.Write_LENGTH(i, n),
    new Uint8Array(i.buffer)
}

SDF.WriteHeaderBlock = function (e, t, a) {
  var r = new ArrayBuffer(10),
    i = new T3DataStream(r);
  return i.endianness = T3DataStream.LITTLE_ENDIAN,
    null == a ? SDF.WriteBlockWrapper(
      i,
      e.state,
      e.delta,
      SDF.BlockIDs.Header,
      0,
      t,
      e.nblocks,
      e.BlockAction
    ) : SDF.WriteBlockWrapper(
      i,
      e.state,
      e.delta,
      SDF.BlockIDs.Header2,
      SDF.Header2Count++,
      t,
      e.nblocks,
      e.BlockAction
    ),
    SDF.WriteHeader(i, e, a),
    SDF.HeaderFilters = [],
    new Uint8Array(i.buffer)
}

SDF.WriteManifestBlock = function (e, t) {
  var a = new ArrayBuffer(10),
    r = new T3DataStream(a);
  r.endianness = T3DataStream.LITTLE_ENDIAN,
    SDF.WriteBlockWrapper(r, 0, 0, SDF.BlockIDs.Manifest, 0, 0, 1, t),
    null == e &&
    SDUI.Utils.Logger.LogMessage('NULL Manifest Sent to Client Via Socket');
  var i = JSON.stringify(e);
  return r.writeUCS2String(i, T3DataStream.LITTLE_ENDIAN, i.length),
    new Uint8Array(r.buffer)
}

SDF.WriteFileMetadata = function (e) {
  var t,
    a = new ArrayBuffer(10),
    r = new T3DataStream(a);
  if (r.endianness = T3DataStream.LITTLE_ENDIAN, null != e) {
    e.DateModified = null,
      void 0 !== e.DateModified &&
      delete e.DateModified,
      void 0 !== e.DateCreated &&
      delete e.DateCreated,
      SDF.WriteBlockWrapper(
        r,
        0,
        0,
        SDF.BlockIDs.Metadata,
        0,
        0,
        1,
        SDF.BlockActions.SaveAs
      );
    var i = JSON.stringify(e);
    r.writeUCS2String(i, T3DataStream.LITTLE_ENDIAN, i.length),
      t = new Uint8Array(r.buffer),
      SDF.SendState(t, - 1)
  }
}

SDF.WriteSVGBlock = function (e) {
  var t = new ArrayBuffer(10),
    a = new T3DataStream(t);
  return a.endianness = T3DataStream.LITTLE_ENDIAN,
    SDF.WriteBlockWrapper(a, 0, 0, SDF.BlockIDs.SVG, 0, 0, 1, 0),
    a.writeUCS2String(e, T3DataStream.LITTLE_ENDIAN, e.length),
    new Uint8Array(a.buffer)
}

SDF.WriteExpandedViewBlock = function (e, t, a) {
  var r = new ArrayBuffer(10),
    i = new T3DataStream(r);
  i.endianness = T3DataStream.LITTLE_ENDIAN,
    SDF.WriteBlockWrapper(
      i,
      t.state,
      t.delta,
      SDF.BlockIDs.ExpandedView,
      e.ID,
      a,
      t.nblocks,
      t.BlockAction
    );
  var n = SDF.Write_CODE(i, FileParser.SDROpCodesByName.SDF_C_EXPANDEDVIEWBLOCK),
    o = {
      value: e.ID
    };
  i.writeStruct(FileParser.LONGVALUE_Struct, o),
    SDF.Write_LENGTH(i, n);
  var s = e.Data;
  return SDF.WriteExpandedView(i, s, t),
    new Uint8Array(i.buffer)
}

SDF.WriteCommentBlock = function (e, t, a) {
  var r = new ArrayBuffer(10),
    i = new T3DataStream(r);
  i.endianness = T3DataStream.LITTLE_ENDIAN,
    SDF.WriteBlockWrapper(
      i,
      t.state,
      t.delta,
      SDF.BlockIDs.Comment,
      e.ID,
      a,
      t.nblocks,
      t.BlockAction
    );
  var n = SDF.Write_CODE(i, FileParser.SDROpCodesByName.SDF_C_CLOUDCOMMENTBLOCK);
  return i.writeUint32(e.Data.objectID),
    i.writeUint32(e.Data.userID),
    i.writeFloat64(e.Data.timestamp),
    i.writeUCS2String(
      e.Data.comment,
      T3DataStream.LITTLE_ENDIAN,
      e.Data.comment.length + 1
    ),
    SDF.Write_LENGTH(i, n),
    new Uint8Array(i.buffer)
}

SDF.WriteCommentList = function (e, t) {
  var a,
    r,
    i,
    n = GlobalData.objectStore.GetObjects(ConstantData.StoredObjectType.LM_COMMENT_BLOCK);
  if (n && n.length) for (a = n.length, r = 0; r < a; r++) if (i = n[r]) {
    var o = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_CLOUDCOMMENTBLOCK);
    e.writeUint32(SDF.BlockIDtoUniqueID(i.Data.objectID, t)),
      e.writeUint32(i.Data.userID),
      e.writeFloat64(i.Data.timestamp),
      e.writeUCS2String(
        i.Data.comment,
        T3DataStream.LITTLE_ENDIAN,
        i.Data.comment.length + 1
      ),
      SDF.Write_LENGTH(e, o)
  }
}

SDF.WriteExpandedView = function (e, t, a) {
  var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_EXPANDEDVIEW);
  e.writeUCS2String(t, T3DataStream.LITTLE_ENDIAN, t.length),
    SDF.Write_LENGTH(e, r)
}

SDF.WriteContainerList = function (e, t, a) {
  var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWCONTAINER),
    i = {
      Arrangement: t.Arrangement,
      HorizontalSpacing: t.HorizontalSpacing,
      VerticalSpacing: t.VerticalSpacing,
      AlignH: t.AlignH,
      AlignV: t.AlignV,
      Wrap: t.Wrap,
      height: t.height,
      width: t.width,
      MinWidth: t.MinWidth,
      MinHeight: t.MinHeight,
      flags: t.flags,
      nacross: t.nacross,
      ndown: t.ndown,
      childwidth: t.childwidth,
      childheight: t.childheight
    };
  e.writeStruct(FileParser.SDF_CONTAINERLIST_Struct_100, i),
    SDF.Write_LENGTH(e, r);
  var n,
    o,
    s,
    l = t.List.length;
  for (n = 0; n < l; n++) o = {
    x: (s = t.List[n]).pt.x,
    y: s.pt.y,
    id: SDF.BlockIDtoUniqueID(s.id, a),
    extra: s.extra
  },
    r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWCONTAINERHOOK),
    e.writeStruct(FileParser.SDF_CONTAINERHOOK_Struct_28, o),
    SDF.Write_LENGTH(e, r);
  e.writeUint16(FileParser.SDROpCodesByName.SDF_C_DRAWCONTAINER_END)
}

SDF.ChangeHeader = function (e, t) {
  SDF.HeaderFilters.push(e)
}

SDF.GetSocketClientOptions = function () {
  var e = 'root' === ConstantData.DocumentContext.CloudFileMetadata.ContainingFolderDepositoryID &&
    ConstantData.DocumentContext.CloudFileMetadata.Depository === Resources.Depositories.MSFTSharePoint,
    t = '0' === ConstantData.DocumentContext.CloudFileMetadata.ContainingFolderDepositoryID &&
      ConstantData.DocumentContext.CloudFileMetadata.Depository === Resources.Depositories.Box,
    a = 'root' === ConstantData.DocumentContext.CloudFileMetadata.ContainingFolderDepositoryID &&
      ConstantData.DocumentContext.CloudFileMetadata.Depository === Resources.Depositories.Egnyte,
    r = '' === ConstantData.DocumentContext.CloudFileMetadata.ContainingFolderDepositoryID &&
      ConstantData.DocumentContext.CloudFileMetadata.Depository === Resources.Depositories.DropBox,
    i = e ||
      t ||
      a ||
      r;
  return {
    userId: ConstantData.DocumentContext.UserId,
    token: ConstantData.DocumentContext.UserToken,
    docType: SDUI.Commands.MainController.SmartPanels.GetCurrentSmartPanel() ||
      (
        GlobalData.optManager.theContentHeader.smartpanelname ? GlobalData.optManager.theContentHeader.smartpanelname.replaceAll(' ', '_') : null
      ),
    docId: null == ConstantData.DocumentContext.CloudFileMetadata.DepositoryID ? - 1 : ConstantData.DocumentContext.CloudFileMetadata.DepositoryID,
    docOwner: ConstantData.DocumentContext.CloudFileMetadata.SmartDrawUserID,
    fileName: ConstantData.DocumentContext.CloudFileMetadata.Name,
    loginId: ConstantData.DocumentContext.UserLoginId,
    enabled: !0 === SDUI.AppSettings.SocketEnabled &&
      !1 === SDUI.AppSettings.ReadOnly, //!Constants.In_Debug,
    maxBlockSize: 100000,
    depository: i ? Resources.Depositories.SDJS : ConstantData.DocumentContext.CloudFileMetadata.Depository,
    credId: i ? - ConstantData.DocumentContext.UserId : ConstantData.DocumentContext.CloudFileMetadata.CredentialID,
    folderId: i ? - 1 : ConstantData.DocumentContext.CloudFileMetadata.ContainingFolderDepositoryID
  }
}




SDF.AddPage_Initiate = function (e, t, a) {
  var r = SDUI.Commands.MainController.PagedSDRController.GetManifest(),
    i = !1,
    n = ListManager.SocketActions;
  GlobalData.optManager.SocketAction = [];
  var o,
    s = !1;
  if (r) {
    if (
      GlobalData.optManager.CloseEdit(),
      GlobalData.optManager.svgDoc.GetSpellCheck().InAsyncSpellCheck()
    ) return void setTimeout((function () {
      SDF.AddPage_Initiate(e, t, a)
    }), 2000);
    if (GlobalData.optManager.svgDoc.GetSpellCheck().InAsyncSpellCheck()) return;
    if (
      0 === r.TabOrder.length &&
      (i = !0, s = !1 === GlobalData.optManager.GetDocDirtyState()),
      SDJS.SocketClient.GetStatus() != WebSocket.OPEN &&
      (
        GlobalData.optManager.SocketAction = [],
        i ? (
          GlobalData.optManager.SocketAction.push(n.SaveAllBlocks),
          GlobalData.optManager.SocketAction.push(e),
          GlobalData.optManager.SocketAction.push(t),
          GlobalData.optManager.SocketAction.push(a)
        ) : (
          GlobalData.optManager.SocketAction.push(e),
          GlobalData.optManager.SocketAction.push(t),
          GlobalData.optManager.SocketAction.push(a)
        ),
        SDJS.SocketClient.GetStatus() == WebSocket.CLOSED
      )
    ) return void (
      null != ConstantData.DocumentContext.CloudFileMetadata &&
        null != ConstantData.DocumentContext.CloudFileMetadata.DepositoryID ? SDUI.Commands.MainController.ActiveSessionController.CheckDocumentBeforeOpenSocket() : SDJS.SocketClient.Init({
        }, SDF.GetSocketClientOptions)
    );
    SDUI.Commands.MainController.PagedSDRController.SetOperationInProgress(!0);
    var l = {
      state: 0,
      delta: 0,
      nblocks: 1
    };
    return GlobalData.optManager.SetDocReplaceState(!1),
      i ? (
        s &&
        SDF.SaveAllBlocks(null, !0),
        0 === r.TabOrder.length &&
        (
          r = SDUI.Commands.MainController.PagedSDRController.InitManifest()
        ),
        o = SDF.WriteManifestBlock(r, SDF.BlockActions.AddPage),
        SDF.SendState(o, - 1),
        GlobalData.optManager.PageAction = [],
        e = e === n.AddDupPage ? n.AddDupPage_Init : e === n.Insert_Template ? n.Insert_Template_Init : e === n.Insert_Document ? n.Insert_Document_Init : n.AddNewPage_Init,
        GlobalData.optManager.PageAction.push(e),
        GlobalData.optManager.PageAction.push(t),
        void GlobalData.optManager.PageAction.push(a)
      ) : (
        o = SDF.WriteActionBlock(
          l,
          SDF.BlockIDs.Command,
          0,
          SDF.BlockActions.ClosePage,
          0
        ),
        SDF.SendState(o, - 1),
        GlobalData.optManager.PageAction = [],
        GlobalData.optManager.PageAction.push(e),
        GlobalData.optManager.PageAction.push(t),
        void GlobalData.optManager.PageAction.push(a)
      )
  }
}

SDF.AddPage_Create = function (e, t, a) {
  var r,
    i,
    n = ListManager.SocketActions,
    o = SDUI.Commands.MainController.PagedSDRController.GetManifest();
  GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !0),
    GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1),
    GlobalData.optManager.ZList();
  switch (GlobalData.optManager.ClearAllObjects(e !== n.AddDupPage), e) {
    case n.Insert_Template:
    case n.Insert_Document:
      GlobalData.optManager.DeleteAllObjects(),
        GlobalData.optManager.ResetgListManager()
  }
  var s = o.TabOrder.length;
  for (
    t >= s - 1 ? t = null : null != t &&
      t++;
    r = Resources.Strings.PageName + (s + 1) + '.sdr',
    !(o.TabOrder.indexOf(r) < 0);
  ) s++;
  switch (
  null != t ? (o.TabOrder.splice(t, 0, r), o.Initial = r) : (o.TabOrder.push(r), o.Initial = r),
  GlobalData.optManager.PreserveUndoState(!0),
  GlobalData.optManager.ResetStateManager(),
  GlobalData.optManager.ClearFutureUndoStates(),
  GlobalData.optManager.UpdateLinks(),
  GlobalData.optManager.RenderAllSVGObjects(),
  e
  ) {
    case n.Insert_Template:
    case n.Insert_Document:
      return SDUI.Commands.MainController.HintController.UI_Hide(),
        SDUI.Commands.MainController.Symbols.RemoveAllLibraries(),
        gBusinessController.StopAddingWalls(),
        GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
        void SDF.ReadFile(a, !0, SDF.AddPage_CallBack, o)
  }
  GlobalData.optManager.SocketAction = [],
    SDF.SaveAllBlocks(null, !0),
    i = SDF.WriteManifestBlock(o, SDF.BlockActions.AddPage),
    SDF.SendState(i, - 1),
    GlobalData.optManager.PageAction = [],
    GlobalData.optManager.PageAction.push(n.CompleteAdd),
    GlobalData.optManager.SetDocDirtyState(!0)
}

SDF.AddPage_CallBack = function (e) {
  var t,
    a = ListManager.SocketActions;
  GlobalData.optManager.SocketAction = [],
    SDF.SaveAllBlocks(null, !0),
    SDF.HeaderFilters.push(FileParser.SDROpCodesByName.SDF_C_LIBLIST7),
    SDF.SaveChangedBlocks(GlobalData.stateManager.CurrentStateID, 0),
    t = SDF.WriteManifestBlock(e, SDF.BlockActions.AddPage),
    SDF.SendState(t, - 1),
    GlobalData.optManager.PageAction = [],
    GlobalData.optManager.PageAction.push(a.CompleteAdd),
    GlobalData.optManager.SetDocDirtyState(!0)
}

SDF.AddPage_Complete = function () {
  var e = SDUI.Commands.MainController.PagedSDRController.GetManifest();
  GlobalData.optManager.PageAction = [],
    SDUI.Commands.MainController.PagedSDRController.Build(e),
    SDUI.Commands.MainController.PagedSDRController.SetOperationInProgress(!1)
}

SDF.ChangePage_Initiate = function (e, t) {
  var a,
    r = SDUI.Commands.MainController.PagedSDRController.GetManifest(),
    i = ListManager.SocketActions;
  if (GlobalData.optManager.SocketAction = [], null !== r) {
    if (null == t) {
      var n = r.TabOrder.length;
      if (e < 0 || e >= n) return;
      a = r.TabOrder[e]
    } else a = t;
    if (a !== r.Initial) if (
      GlobalData.optManager.CloseEdit(),
      GlobalData.optManager.svgDoc.GetSpellCheck().InAsyncSpellCheck()
    ) setTimeout((function () {
      SDF.ChangePage_Initiate(e, t)
    }), 2000);
    else if (
      SDJS.SocketClient.GetStatus() == WebSocket.OPEN ||
      (
        GlobalData.optManager.SocketAction = [],
        GlobalData.optManager.SocketAction.push(i.ChangePage),
        GlobalData.optManager.SocketAction.push(a),
        SDJS.SocketClient.GetStatus() != WebSocket.CLOSED
      )
    ) {
      SDUI.Commands.MainController.PagedSDRController.SetOperationInProgress(!0);
      var o = Utils1.DeepCopy(r);
      o.Initial = a,
        GlobalData.optManager.SetDocReplaceState(!1);
      var s = SDF.WriteManifestBlock(o, SDF.BlockActions.ChangePage);
      SDF.SendState(s, - 1),
        GlobalData.optManager.PageAction = [],
        GlobalData.optManager.PageAction.push(ListManager.SocketActions.CompleteChange)
    } else null != ConstantData.DocumentContext.CloudFileMetadata &&
      null != ConstantData.DocumentContext.CloudFileMetadata.DepositoryID ? SDUI.Commands.MainController.ActiveSessionController.CheckDocumentBeforeOpenSocket() : SDJS.SocketClient.Init({
      }, SDF.GetSocketClientOptions)
  }
}

SDF.ChangePage_Complete = function (e) {
  SDUI.Commands.MainController.PagedSDRController.SetManifest(e),
    GlobalData.optManager.PageAction = [];
  var t,
    a = - 1;
  GlobalData.optManager.PagesToDelete.length &&
    (
      t = GlobalData.optManager.PagesToDelete[0],
      (
        a = SDUI.Commands.MainController.PagedSDRController.GetPageNumber(e.Initial)
      ) >= t &&
      --a < 0 &&
      (a = 0)
    ),
    SDUI.Commands.MainController.PagedSDRController.ChangePage(a),
    GlobalData.optManager.PagesToDelete.length &&
    (
      GlobalData.optManager.PagesToDelete = [],
      SDF.DeletePage_Initiate(t)
    )
}

SDF.RenamePage_Initiate = function (e, t) {
  var a = SDUI.Commands.MainController.PagedSDRController.GetManifest(),
    r = ListManager.SocketActions;
  if (
    GlobalData.optManager.SocketAction = [],
    SDJS.SocketClient.GetStatus() == WebSocket.OPEN ||
    (
      GlobalData.optManager.SocketAction = [],
      GlobalData.optManager.SocketAction.push(r.RenamePage_NoSocket),
      GlobalData.optManager.SocketAction.push(e),
      GlobalData.optManager.SocketAction.push(t),
      SDJS.SocketClient.GetStatus() != WebSocket.CLOSED
    )
  ) {
    SDUI.Commands.MainController.PagedSDRController.SetOperationInProgress(!0),
      GlobalData.optManager.SetDocReplaceState(!1);
    var i = Utils1.DeepCopy(a);
    i.TabOrder[e].toLowerCase() === i.Initial.toLowerCase() &&
      (i.Initial = t),
      i.TabOrder[e] = t;
    var n = SDF.WriteManifestBlock(i, SDF.BlockActions.RenamePage);
    SDF.SendState(n, - 1),
      GlobalData.optManager.PageAction = [],
      GlobalData.optManager.PageAction.push(ListManager.SocketActions.CompleteRename)
  } else null != ConstantData.DocumentContext.CloudFileMetadata &&
    null != ConstantData.DocumentContext.CloudFileMetadata.DepositoryID ? SDUI.Commands.MainController.ActiveSessionController.CheckDocumentBeforeOpenSocket() : SDJS.SocketClient.Init({
    }, SDF.GetSocketClientOptions)
}

SDF.RenamePage_InitiateSocketOpen = function (e, t) {
  var a = SDUI.Commands.MainController.PagedSDRController.GetManifest();
  ListManager.SocketActions;
  if (
    GlobalData.optManager.SocketAction = [],
    SDJS.SocketClient.GetStatus() == WebSocket.OPEN
  ) {
    var r = SDF.WriteManifestBlock(a, SDF.BlockActions.CurrentPage);
    SDF.SendState(r, - 1),
      GlobalData.optManager.PageAction = [],
      GlobalData.optManager.PageAction.push(ListManager.SocketActions.RenamePage),
      GlobalData.optManager.PageAction.push(e),
      GlobalData.optManager.PageAction.push(t)
  }
}

SDF.RenamePage_Complete = function (e) {
  SDUI.Commands.MainController.PagedSDRController.SetManifest(e),
    GlobalData.optManager.PageAction = [],
    SDUI.Commands.MainController.PagedSDRController.Build(e),
    SDUI.Commands.MainController.PagedSDRController.SetOperationInProgress(!1)
}

SDF.DeletePage_Initiate = function (e) {
  var t = SDUI.Commands.MainController.PagedSDRController.GetManifest(),
    a = ListManager.SocketActions;
  if (
    GlobalData.optManager.SocketAction = [],
    SDJS.SocketClient.GetStatus() == WebSocket.OPEN ||
    (
      GlobalData.optManager.SocketAction = [],
      GlobalData.optManager.SocketAction.push(a.DeletePage_NoSocket),
      GlobalData.optManager.SocketAction.push(e),
      SDJS.SocketClient.GetStatus() != WebSocket.CLOSED
    )
  ) {
    SDUI.Commands.MainController.PagedSDRController.SetOperationInProgress(!0),
      GlobalData.optManager.SetDocReplaceState(!1);
    var r = Utils1.DeepCopy(t);
    r.TabOrder.splice(e, 1);
    var i = SDF.WriteManifestBlock(r, SDF.BlockActions.DeletePage);
    SDF.SendState(i, - 1),
      GlobalData.optManager.PageAction = [],
      GlobalData.optManager.PageAction.push(ListManager.SocketActions.CompleteDelete)
  } else null != ConstantData.DocumentContext.CloudFileMetadata &&
    null != ConstantData.DocumentContext.CloudFileMetadata.DepositoryID ? SDUI.Commands.MainController.ActiveSessionController.CheckDocumentBeforeOpenSocket() : SDJS.SocketClient.Init({
    }, SDF.GetSocketClientOptions)
}

SDF.DeletePage_InitiateSocketOpen = function (e) {
  var t = SDUI.Commands.MainController.PagedSDRController.GetManifest();
  ListManager.SocketActions;
  if (
    GlobalData.optManager.SocketAction = [],
    SDJS.SocketClient.GetStatus() == WebSocket.OPEN
  ) {
    var a = SDF.WriteManifestBlock(t, SDF.BlockActions.CurrentPage);
    SDF.SendState(a, - 1),
      GlobalData.optManager.PageAction = [],
      GlobalData.optManager.PageAction.push(ListManager.SocketActions.DeletePage),
      GlobalData.optManager.PageAction.push(e)
  }
}

SDF.DeletePage_Complete = function (e) {
  SDUI.Commands.MainController.PagedSDRController.SetManifest(e),
    GlobalData.optManager.PageAction = [],
    null != e &&
    1 !== e.TabOrder.length ||
    (e = new Resources.PagedSDRManifest),
    SDUI.Commands.MainController.PagedSDRController.Build(e),
    SDUI.Commands.MainController.PagedSDRController.SetOperationInProgress(!1)
}

SDF.ReorderPages_Initiate = function (e) {
  var t = ListManager.SocketActions;
  if (
    GlobalData.optManager.SocketAction = [],
    SDJS.SocketClient.GetStatus() == WebSocket.OPEN ||
    (
      GlobalData.optManager.SocketAction = [],
      GlobalData.optManager.SocketAction.push(t.ReorderPages),
      GlobalData.optManager.SocketAction.push(e),
      SDJS.SocketClient.GetStatus() != WebSocket.CLOSED
    )
  ) {
    SDUI.Commands.MainController.PagedSDRController.SetOperationInProgress(!0),
      GlobalData.optManager.SetDocReplaceState(!1);
    var a = SDF.WriteManifestBlock(e, SDF.BlockActions.ReorderPages);
    SDF.SendState(a, - 1),
      GlobalData.optManager.PageAction = [],
      GlobalData.optManager.PageAction.push(ListManager.SocketActions.CompleteReorder)
  } else null != ConstantData.DocumentContext.CloudFileMetadata &&
    null != ConstantData.DocumentContext.CloudFileMetadata.DepositoryID ? SDUI.Commands.MainController.ActiveSessionController.CheckDocumentBeforeOpenSocket() : SDJS.SocketClient.Init({
    }, SDF.GetSocketClientOptions)
}

SDF.ReorderPages_Complete = function (e) {
  SDUI.Commands.MainController.PagedSDRController.SetManifest(e),
    GlobalData.optManager.PageAction = [],
    SDUI.Commands.MainController.PagedSDRController.Build(e),
    SDUI.Commands.MainController.PagedSDRController.SetOperationInProgress(!1)
}

SDF.ConvertToVisio = function (e, t) {
  var a,
    r,
    i,
    n,
    o,
    s,
    l,
    S = [],
    c = [],
    u = [],
    p = ConstantData.ObjFlags.SEDO_NotVisible;
  for (a = e.zList.length, r = 0; r < a; r++) if (
    n = e.zList[r],
    !((i = GlobalData.optManager.GetObjectPtr(n, !1)).flags & p) &&
    (c = i.ConvertToVisio(u, t))
  ) for (s = c.length, o = 0; o < s; o++) S.push(c[o]);
  if (e.zList = S, u.length) for (a = e.zList.length, r = 0; r < a; r++) for (
    n = e.zList[r],
    s = (i = GlobalData.optManager.GetObjectPtr(n, !1)).hooks.length,
    o = 0;
    o < s;
    o++
  ) (l = u[i.hooks[o].objid]) &&
    (i.hooks[o].objid = l)
}

SDF.RasterizeSVGObjectsForVisioExport = function (e) {
  var t,
    a,
    r,
    i,
    n = [],
    o = [],
    s = GlobalData.optManager.ZList(),
    l = [];
  !function e(t, a) {
    var r,
      i,
      n = t.length;
    for (r = 0; r < n; ++r) {
      var o;
      i = t[r],
        (o = GlobalData.optManager.GetObjectPtr(i, !1)).ShapesInGroup &&
          o.ShapesInGroup.length ? e(o.ShapesInGroup, a) : a.push(i)
    }
  }(s, l),
    t = (s = l).length;
  var S = 0;
  for (a = 0; a < t; a++) {
    if (
      i = s[a],
      (r = GlobalData.optManager.GetObjectPtr(i, !1)).RasterizeSVGShapeForVisio
    ) if (- 1 != r.TableID) {
      var c,
        u,
        p,
        d = GlobalData.optManager.GetObjectPtr(r.TableID, !1);
      for (c = d.cells.length, u = 0; u < c; u++) if ((p = d.cells[u]).BlobBytesID >= 0) {
        if (
          GlobalData.optManager.IsBlobURL(p.ImageURL) &&
          p.SVGDim &&
          p.SVGDim.width &&
          p.SVGDim.height
        ) {
          S++,
            o.push(i);
          break
        }
      } else if (p.Image && p.Image.iconid) {
        if (p.Image.iconid >= ConstantData.Defines.SVGIconIndex) {
          S++,
            o.push(i);
          break
        }
      }
    } else {
        var D = r.ImageURL &&
          r.SVGDim.width &&
          r.SVGDim.height,
          g = r.SVGFragment,
          h = r.d3Settings,
          m = r.ImageURL &&
            - 1 != r.ImageURL.indexOf('/cmsstorage/symbols/svg');
        (D || g || h || m) &&
          (S++, o.push(i))
      }
  }
  if (0 != S) {
    var C = 0;
    i = o[0],
      (r = GlobalData.optManager.GetObjectPtr(i, !1)).RasterizeSVGShapeForVisio(
        (
          function t(a, r, i, s) {
            if (
              null != a &&
              null != a &&
              (r && i || s) &&
              (n[a] = {
                imageURL: r,
                blobBytes: i,
                cellInfo: s
              }),
              ++C == S
            ) e(n);
            else {
              var l = o[C];
              GlobalData.optManager.GetObjectPtr(l, !1).RasterizeSVGShapeForVisio(t)
            }
          }
        )
      )
  } else e(n)
}

SDF.CleanupVisioRasterization = function (e) {
  if (e) {
    var t = e.length,
      a = window.URL ||
        window.webkitURL;
    if (a && a.revokeObjectURL) for (var r = 0; r < t; ++r) if (e[r]) {
      var i = e[r].imageURL;
      i &&
        a.revokeObjectURL(i);
      var n = e[r].cellInfo;
      if (n) for (var o = n.length, s = 0; s < o; ++s) (i = n[s].imageURL) &&
        a.revokeObjectURL(i)
    }
  }
}

SDF.ShouldWriteImageUrl = function (e, t) {
  return !!e &&
    (!(t >= 0) && !!e.toLowerCase().startsWith('http'))
}

SDF.CleanDataURLs = function () {
  var e,
    t,
    a,
    r,
    i = GlobalData.optManager.ZList();
  for (e = i.length, t = 0; t < e; t++) if (
    r = i[t],
    null != (a = GlobalData.optManager.GetObjectPtr(r, !1)) &&
    (
      GlobalData.optManager.IsBlobURL(a.ImageURL) &&
      GlobalData.optManager.DeleteURL(a.ImageURL),
      a.UserData &&
      a.UserData.shape &&
      a.UserData.shape.SymbolURL &&
      GlobalData.optManager.IsBlobURL(a.UserData.shape.SymbolURL) &&
      GlobalData.optManager.DeleteURL(a.UserData.shape.SymbolURL),
      - 1 != a.TableID
    )
  ) {
    var n,
      o,
      s,
      l = GlobalData.optManager.GetObjectPtr(a.TableID, !1);
    for (n = l.cells.length, o = 0; o < n; o++) (s = l.cells[o]).BlobBytesID >= 0 &&
      GlobalData.optManager.IsBlobURL(s.ImageURL) &&
      GlobalData.optManager.DeleteURL(s.ImageURL)
  }
}


SDF.BuildBlockList = function () {
  var e = new SDF.WindowSettings,
    t = GlobalData.docHandler.svgDoc.GetWorkArea();
  e.wscale = GlobalData.docHandler.GetZoomFactor(),
    e.worigin.x = t.scrollX,
    e.worigin.y = t.scrollY,
    e.wflags = 0,
    e.leftpanelmode = SDUI.Commands.MainController.SmartPanels.GetLeftPanelMode(),
    GlobalData.docHandler.scaleToFit ? e.wflags = ListManager.WFlags.W_Stf : GlobalData.docHandler.scaleToPage &&
      (e.wflags = ListManager.WFlags.W_Page),
    1 === e.wscale &&
    (e.wscale = 0);
  var a = SDF.WriteUIInfo(null, null);
  GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
    GlobalData.optManager.theContentHeader.flags,
    ConstantData.ContentHeaderFlags.CT_ShowGrid,
    GlobalData.docHandler.documentConfig.showGrid
  ),
    GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
      GlobalData.optManager.theContentHeader.flags,
      ConstantData.ContentHeaderFlags.CT_ShowRulers,
      GlobalData.docHandler.documentConfig.showRulers
    ),
    GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
      GlobalData.optManager.theContentHeader.flags,
      ConstantData.ContentHeaderFlags.CT_SnapToGridC,
      GlobalData.docHandler.documentConfig.centerSnap &&
      GlobalData.docHandler.documentConfig.enableSnap
    ),
    GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
      GlobalData.optManager.theContentHeader.flags,
      ConstantData.ContentHeaderFlags.CT_SnapToGridTL,
      !GlobalData.docHandler.documentConfig.centerSnap &&
      GlobalData.docHandler.documentConfig.enableSnap
    ),
    GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
      GlobalData.optManager.theContentHeader.flags,
      ConstantData.ContentHeaderFlags.CT_ShowPageDividers,
      GlobalData.docHandler.documentConfig.showPageDivider
    ),
    GlobalData.optManager.theContentHeader.flags = Utils2.SetFlag(
      GlobalData.optManager.theContentHeader.flags,
      ConstantData.ContentHeaderFlags.CT_SnapToShapes_Off,
      0 == GlobalData.docHandler.documentConfig.snapToShapes
    );
  var r = {
    StoredObjects: GlobalData.objectStore.StoredObjects,
    stateManager: stateManager,
    theContentHeader: GlobalData.optManager.theContentHeader,
    RichGradients: GlobalData.optManager.RichGradients,
    rulerSettings: GlobalData.docHandler.rulerSettings,
    CommentUserIDs: Utils1.DeepCopy(GlobalData.optManager.CommentUserIDs),
    WindowSettings: e,
    UI_Info: a,
    CURRENT_SEQ_OBJECT_ID: CURRENT_SEQ_OBJECT_ID
  },
    i = Collab.DeepCopyMessage(r);
  return JSON.stringify(i)
}

SDF.ReadBlockList = function (e) {
  var t,
    a,
    r,
    i,
    n,
    o = function (e) {
      C = ConstantData.DrawingObjectBaseClass;
      var t = ConstantData.StoredObjectType;
      switch (e.Type) {
        case t.BASE_LM_DRAWING_OBJECT:
          e.Data = function (e) {
            var t,
              a = ConstantData.ShapeType,
              r = ConstantData.LineType;
            switch (e.DrawingObjectBaseClass) {
              case C.SHAPE:
                switch (e.ShapeType) {
                  case a.RECT:
                    t = e.objecttype === ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER ?
                      //  new ListManager.ShapeContainer :
                      new Instance.Shape.ShapeContainer() :
                      // new ListManager.Rect;
                      new Instance.Shape.Rect();
                    break;
                  case a.RRECT:
                    // t = new ListManager.RRect;
                    t = new Instance.Shape.RRect();
                    break;
                  case a.OVAL:
                    // t = new ListManager.Oval;
                    t = new Instance.Shape.Oval();
                    break;
                  case a.POLYGON:
                    // t = new ListManager.Polygon;
                    t = new Instance.Shape.Polygon();
                    break;
                  case a.VECTORSYMBOL:
                    // t = new ListManager.VectorSymbol;
                    t = new Instance.Shape.VectorSymbol();
                    break;
                  case a.BITMAPSYMBOL:
                    // t = new ListManager.BitmapSymbol;
                    t = new Instance.Shape.BitmapSymbol();
                    break;
                  case a.GROUPSYMBOL:
                    // t = new ListManager.GroupSymbol;
                    t = new Instance.Shape.GroupSymbol();
                    break;
                  case a.SVGFRAGMENTSYMBOL:
                    // t = new ListManager.SVGFragmentSymbol;
                    t = new Instance.Shape.SVGFragmentSymbol();
                    break;
                  case a.D3SYMBOL:
                    // t = new ListManager.D3Symbol,
                    t = new Instance.Shape.D3Symbol(),
                      e.codeLib = null
                }
                break;
              case C.LINE:
                switch (e.LineType) {
                  case r.LINE:
                    // t = new ListManager.Line;
                    t = new Instance.Shape.Line();
                    break;
                  case r.ARCLINE:
                  case r.ARCLINE:
                    // t = new ListManager.ArcLine;
                    t = new Instance.Shape.ArcLine();
                    break;
                  case r.ARCSEGLINE:
                    // t = new ListManager.ArcSegmentedLine;
                    t = new Instance.Shape.ArcSegmentedLine();
                    break;
                  case r.SEGLINE:
                    // t = new ListManager.SegmentedLine;
                    t = new Instance.Shape.SegmentedLine();
                    break;
                  case r.POLYLINE:
                    t = e.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ?
                      // new ListManager.PolyLineContainer :
                      new Instance.Shape.PolyLineContainer() :
                      // new ListManager.PolyLine;
                      new Instance.Shape.PolyLine();
                    break;
                  case r.FREEHAND:
                    // t = new ListManager.FreehandLine
                    t = new Instance.Shape.FreehandLine()
                }
                break;
              case C.CONNECTOR:
                // t = new ListManager.Connector
                t = new Instance.Shape.Connector()
            }
            return t &&
              (t = Object.assign(t, e)),
              t
          }(e.Data);
          break;
        case t.BLOBBYTES_OBJECT:
          var a = Collab.StringToBuffer(e.Data.Bytes);
          e.Data.Bytes = new Uint8Array(a);
          break;
        case t.H_NATIVE_OBJECT:
        case t.H_NATIVEWIN_OBJECT:
          e.Data = Collab.StringToBuffer(e.Data),
            e.Data instanceof ArrayBuffer &&
            (e.Data = new Uint8Array(e.Data))
      }
      var r = new SDJS.Editor.StoredObject(e.ID, e.Type, e.Data, !1, !1);
      return r = Object.assign(r, e)
    };
  if (e) {
    var s = JSON.parse(e),
      l = s.StoredObjects,
      S = function (e) {
        var t,
          a,
          r,
          i,
          n,
          s,
          l,
          S = new SDJS.Editor.StateManager,
          c = (S = Object.assign(S, e)).States.length;
        for (t = 0; t < c; t++) {
          for (i = (l = S.States[t]).StoredObjects.length, r = 0; r < i; r++) a = l.StoredObjects[r],
            n = o(a),
            l.StoredObjects[r] = n;
          s = new SDJS.Editor.State,
            s = Object.assign(s, l),
            S.States[t] = s
        }
        return S
      }(s.stateManager);
    for (a = l.length, t = 0; t < a; t++) r = l[t],
      l[t] = o(r);
    GlobalData.objectStore.StoredObjects = l,
      stateManager = S,
      CURRENT_SEQ_OBJECT_ID = s.CURRENT_SEQ_OBJECT_ID,
      GlobalData.optManager.theContentHeader = s.theContentHeader,
      GlobalData.optManager.RichGradients = s.RichGradients,
      GlobalData.optManager.CommentUserIDs = s.CommentUserIDs;
    var c = new SDF.Result;
    c.LoadBlockList = !0,
      c.PaperType = SDJS.DocumentHandler.PrintHandler.CalcPaperTypeFromSize(
        GlobalData.optManager.theContentHeader.Page.papersize.x,
        GlobalData.optManager.theContentHeader.Page.papersize.y
      ),
      c.rulerSettings = s.rulerSettings,
      c.WindowSettings = s.WindowSettings,
      c.sdp = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      c.PVersion = SDF.SDF_PVERSION,
      c.FVersion = SDF.SDF_FVERSION,
      s.UI_Info &&
      (
        c.linetoolindex = s.UI_Info.linetoolindex,
        c.shapetoolindex = s.UI_Info.shapetoolindex,
        c.swimlaneformat = s.UI_Info.swimlaneformat,
        c.autocontainer = s.UI_Info.autocontainer,
        c.actascontainer = s.UI_Info.actascontainer,
        c.swimlanenlanes = s.UI_Info.shapetoolindex,
        c.swimlanenvlanes = s.UI_Info.swimlanenvlanes,
        c.swimlanerotate = s.UI_Info.swimlanerotate,
        c.swimlanetitle = s.UI_Info.swimlanetitle,
        c.collapsetools = s.UI_Info.collapsetools
      ),
      SDF.ReadFileFromBuffer_Complete(c),
      Collab.Cursors = [];
    var u,
      p,
      d = ConstantData.StoredObjectType;
    for (GlobalData.optManager.CommentIdleTab(), t = 0; t < a; t++) switch ((r = l[t]).Type) {
      case d.TABLE_OBJECT:
        GlobalData.optManager.Table_RebuildURLs(r.Data);
        break;
      case d.BASE_LM_DRAWING_OBJECT:
        (i = r.Data) &&
          i.BlobBytesID >= 0 &&
          GlobalData.optManager.IsBlobURL(i.ImageURL) &&
          (
            u = i.GetBlobBytes(),
            p = FileParser.GetImageBlobType(u.ImageDir),
            i.ImageURL = GlobalData.optManager.MakeURL(null, u.Bytes, p)
          );
        break;
      case d.TED_SESSION_OBJECT:
        (n = r.Data).theActiveTextEditObjectID = - 1,
          n.theActiveTableObjectID >= 0 &&
          (
            GlobalData.optManager.Table_Release(!1, !0),
            (i = GlobalData.optManager.GetObjectPtr(n.theActiveTableObjectID, !1)) &&
            (i.DataID = - 1)
          ),
          n.theActiveTableObjectID = - 1,
          n.theActiveTableObjectIndex = - 1,
          n.theTELastOp = ConstantData.TELastOp.INIT;
        break;
      case d.SELECTEDLIST_OBJECT:
        r.Data.length = 0;
        break;
      case d.SED_SESSION_OBJECT:
        r.Data.tselect = - 1
    }
    SDUI.Commands.MainController.CollabOverlayController.InitCollabOverlay(),
      GlobalData.optManager.RenderAllSVGObjects()
  }
}


