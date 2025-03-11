

import ListManager from './ListManager'
import Utils2 from '../Helper/Utils2'
import T3Gv from './T3Gv'
import FileParser from '../Data/FileParser'
import T3DataStream from '../Opt/Business/T3DataStream'
import Resources from '../Data/Resources'
import Utils1 from '../Helper/Utils1'
import Utils3 from '../Helper/Utils3'
import Globals from './Globals'
import HashController from '../Opt/Business/HashController'
import $ from 'jquery'
import RulerConfig from '../Model/RulerConfig'
import Polygon from '../Basic/B.Polygon'
import PolygonShapeGenerator from "../Opt/Business/PolygonUtil"
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
import PolygonConstant from '../Opt/Business/PolygonConstant'

class SDF {

  /**
   * Determines if a line is displayed in reverse direction based on its coordinates
   * @param drawingObject - The object containing line properties and coordinates
   * @param drawOptions - Options that control drawing behavior
   * @param ignoreSegments - Whether to ignore segment direction checks
   * @returns True if the line is reversed, false otherwise
   */
  static LineIsReversed(drawingObject, drawOptions, ignoreSegments) {
    if (drawingObject == null) return false;

    if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE) {
      switch (drawingObject.LineType) {
        case ConstantData.LineType.ARCLINE:
        case ConstantData.LineType.LINE:
          // Check if line is vertical
          if (Math.abs(drawingObject.EndPoint.x - drawingObject.StartPoint.x) < 0.01) {
            return drawingObject.EndPoint.y < drawingObject.StartPoint.y;
          }

          // Check if line is reversed by comparing endpoints
          const rect = Utils2.Pt2Rect(drawingObject.EndPoint, drawingObject.StartPoint);
          if (
            (Math.abs(drawingObject.EndPoint.x - rect.x) < 0.01 && Math.abs(drawingObject.EndPoint.y - rect.y) < 0.01) ||
            (Math.abs(drawingObject.EndPoint.x - rect.x) < 0.01 && Math.abs(drawingObject.EndPoint.y - (rect.y + rect.height)) < 0.01)
          ) {
            return true;
          }
          break;

        case ConstantData.LineType.SEGLINE:
        case ConstantData.LineType.ARCSEGLINE:
          if (ignoreSegments) break;
          if (drawOptions && drawOptions.KeepSegDir) return false;

          // Check if segmented line is reversed based on start and end points
          if (Math.abs(drawingObject.StartPoint.x - drawingObject.EndPoint.x) <= 1) {
            if (drawingObject.StartPoint.y > drawingObject.EndPoint.y) return true;
          } else if (drawingObject.StartPoint.x > drawingObject.EndPoint.x) {
            return true;
          }
      }
    }
    return false;
  }

  /**
   * Converts text alignment constants to Windows text justification format
   * @param textAlign - The text alignment value to convert
   * @returns Object containing horizontal (just) and vertical (vjust) justification values
   */
  static TextAlignToWin(textAlign) {
    const winJustification = {
      just: FileParser.TextJust.TA_CENTER,
      vjust: FileParser.TextJust.TA_CENTER
    };

    switch (textAlign) {
      case ConstantData.TextAlign.LEFT:
        winJustification.just = FileParser.TextJust.TA_LEFT;
        break;
      case ConstantData.TextAlign.RIGHT:
        winJustification.just = FileParser.TextJust.TA_RIGHT;
        break;
      case ConstantData.TextAlign.TOPLEFT:
        winJustification.just = FileParser.TextJust.TA_LEFT;
        winJustification.vjust = FileParser.TextJust.TA_TOP;
        break;
      case ConstantData.TextAlign.TOPCENTER:
        winJustification.vjust = FileParser.TextJust.TA_TOP;
        break;
      case ConstantData.TextAlign.TOPRIGHT:
        winJustification.just = FileParser.TextJust.TA_RIGHT;
        winJustification.vjust = FileParser.TextJust.TA_TOP;
        break;
      case ConstantData.TextAlign.BOTTOMLEFT:
        winJustification.just = FileParser.TextJust.TA_LEFT;
        winJustification.vjust = FileParser.TextJust.TA_BOTTOM;
        break;
      case ConstantData.TextAlign.BOTTOMCENTER:
        winJustification.vjust = FileParser.TextJust.TA_BOTTOM;
        break;
      case ConstantData.TextAlign.BOTTOMRIGHT:
        winJustification.just = FileParser.TextJust.TA_RIGHT;
        winJustification.vjust = FileParser.TextJust.TA_BOTTOM;
    }

    return winJustification;
  }

  /**
   * Converts coordinates based on the provided scale factor
   * @param coordinate - The coordinate value to convert
   * @param scaleFactor - The scale factor to apply to the coordinate
   * @returns The converted coordinate value
   */
  static ToSDWinCoords(coordinate, scaleFactor) {
    return scaleFactor > 1 ? Math.round(scaleFactor * coordinate) : coordinate;
  }

  /**
   * Writes a code to a data stream and reserves space for length
   * @param dataStream - The data stream to write to
   * @param codeValue - The code value to write to the stream
   * @returns The position where length will be written later
   */
  static Write_CODE(dataStream, codeValue) {
    dataStream.writeUint16(codeValue);
    const lengthPosition = dataStream.position;
    dataStream.writeUint32(0); // Reserve space for length
    return lengthPosition;
  }

  /**
   * Writes the length of a block to a data stream at a previously stored position
   * @param dataStream - The data stream to write to
   * @param lengthPosition - The position where the length should be written
   */
  static Write_LENGTH(dataStream, lengthPosition) {
    const currentPosition = dataStream.position;
    dataStream.position = lengthPosition;
    const blockLength = currentPosition - (lengthPosition + 4);
    dataStream.writeUint32(blockLength);
    dataStream.position = currentPosition;
  }

  /**
   * Converts an angle to the Windows angle format (tenths of a degree)
   * @param angle - The angle to convert (in degrees)
   * @returns The converted angle in Windows format (tenths of a degree)
   */
  static ToWinAngle(angle) {
    let winAngle = 10 * angle; // Convert to tenths of a degree

    if (winAngle < 1800) {
      winAngle = -winAngle; // Negative for angles less than 180 degrees
    } else if (winAngle > 1800) {
      winAngle = 3600 - winAngle; // Normalize angles greater than 180 degrees
    }

    return winAngle;
  }

  /**
   * Writes text parameters to a data stream for saving to a file
   * @param dataStream - The data stream to write to
   * @param drawingObject - The drawing object containing text parameters
   * @param textId - The ID of the text block
   * @param options - Configuration options for writing
   */
  static WriteTextParams(dataStream, drawingObject, textId, options) {
    // Use the original object or create a modified version if needed
    let objectToWrite = drawingObject;

    // For shapes with border thickness, create a copy with adjusted frame
    if (
      drawingObject.StyleRecord.Line.BThick &&
      drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
    ) {
      // Create a deep copy of the frame
      const adjustedFrame = $.extend(true, {}, drawingObject.Frame);

      // Create a deep copy of the drawing object
      objectToWrite = Utils1.DeepCopy(drawingObject);

      // Set line thickness to 0 for the copy
      objectToWrite.StyleRecord.Line.Thickness = 0;

      // Adjust frame dimensions by border thickness
      Utils2.InflateRect(adjustedFrame, -drawingObject.StyleRecord.Line.BThick, -drawingObject.StyleRecord.Line.BThick);

      // Update the frame of the copy
      objectToWrite.UpdateFrame(adjustedFrame);
    }

    // Convert text rectangle to Windows coordinate system
    const winRect = SDF.ToSDWinRect(objectToWrite.trect, options.coordScaleFactor, options.GroupOffset);

    // Convert text alignment to Windows format
    const winJustification = SDF.TextAlignToWin(drawingObject.TextAlign);

    // Calculate text wrap width if specified
    let textWrapWidth = 0;
    if (drawingObject.TextWrapWidth > 0) {
      textWrapWidth = SDF.ToSDWinCoords(drawingObject.TextWrapWidth, options.coordScaleFactor);
    }

    // Write the text code and reserve space for length
    const lengthPosition = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_DRAWTEXT);

    // Determine which struct format to write based on options
    if (options.WriteVisio || options.WriteWin32) {
      // Create text parameters object for Win32/Visio format
      const textParams = {
        trect: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        left_sindent: drawingObject.left_sindent,
        top_sindent: drawingObject.top_sindent,
        right_sindent: drawingObject.right_sindent,
        bottom_sindent: drawingObject.bottom_sindent,
        tindent: {
          left: SDF.ToSDWinCoords(drawingObject.tindent.left, options.coordScaleFactor),
          top: SDF.ToSDWinCoords(drawingObject.tindent.top, options.coordScaleFactor),
          right: SDF.ToSDWinCoords(drawingObject.tindent.right, options.coordScaleFactor),
          bottom: SDF.ToSDWinCoords(drawingObject.tindent.bottom, options.coordScaleFactor)
        },
        tmargin: {
          left: SDF.ToSDWinCoords(drawingObject.TMargins.left, options.coordScaleFactor),
          top: SDF.ToSDWinCoords(drawingObject.TMargins.top, options.coordScaleFactor),
          right: SDF.ToSDWinCoords(drawingObject.TMargins.right, options.coordScaleFactor),
          bottom: SDF.ToSDWinCoords(drawingObject.TMargins.bottom, options.coordScaleFactor)
        },
        textid: textId,
        textflags: drawingObject.TextFlags,
        ascent: 0,
        vjust: winJustification.vjust,
        just: winJustification.just,
        textgrow: drawingObject.TextGrow,
        tangle: SDF.ToWinAngle(drawingObject.RotationAngle),
        gtangle: 0,
        ltrect: {
          left: winRect.left,
          top: winRect.top,
          right: winRect.right,
          bottom: winRect.bottom
        },
        commentid: drawingObject.NoteID,
        textwrapwidth: textWrapWidth,
        linetextx: drawingObject.LineTextX,
        linetexty: SDF.ToSDWinCoords(drawingObject.LineTextY, options.coordScaleFactor),
        visiorotationdiff: 10 * drawingObject.VisioRotationDiff
      };

      // Write the parameters using the Win32/Visio struct format
      dataStream.writeStruct(FileParser.SDF_DRAWTEXT_Struct_110, textParams);
    } else {
      // Create text parameters object for default format
      const textParams = {
        left_sindent: drawingObject.left_sindent,
        top_sindent: drawingObject.top_sindent,
        right_sindent: drawingObject.right_sindent,
        bottom_sindent: drawingObject.bottom_sindent,
        tindent: {
          left: SDF.ToSDWinCoords(drawingObject.tindent.left, options.coordScaleFactor),
          top: SDF.ToSDWinCoords(drawingObject.tindent.top, options.coordScaleFactor),
          right: SDF.ToSDWinCoords(drawingObject.tindent.right, options.coordScaleFactor),
          bottom: SDF.ToSDWinCoords(drawingObject.tindent.bottom, options.coordScaleFactor)
        },
        tmargin: {
          left: SDF.ToSDWinCoords(drawingObject.TMargins.left, options.coordScaleFactor),
          top: SDF.ToSDWinCoords(drawingObject.TMargins.top, options.coordScaleFactor),
          right: SDF.ToSDWinCoords(drawingObject.TMargins.right, options.coordScaleFactor),
          bottom: SDF.ToSDWinCoords(drawingObject.TMargins.bottom, options.coordScaleFactor)
        },
        textid: textId,
        textflags: drawingObject.TextFlags,
        ascent: 0,
        vjust: winJustification.vjust,
        just: winJustification.just,
        textgrow: drawingObject.TextGrow,
        tangle: SDF.ToWinAngle(drawingObject.RotationAngle),
        ltrect: {
          left: winRect.left,
          top: winRect.top,
          right: winRect.right,
          bottom: winRect.bottom
        },
        commentid: drawingObject.NoteID,
        textwrapwidth: textWrapWidth,
        linetextx: drawingObject.LineTextX,
        linetexty: drawingObject.LineTextY,
        visiorotationdiff: 10 * drawingObject.VisioRotationDiff
      };

      // Write the parameters using the default struct format
      dataStream.writeStruct(FileParser.SDF_DRAWTEXT_Struct_182, textParams);
    }

    // Write the length of the text data block
    SDF.Write_LENGTH(dataStream, lengthPosition);
  }

  // /**
  //  * Converts a rectangle to Windows coordinate system
  //  * @param rect - The rectangle to convert
  //  * @param scaleFactor - The scale factor to apply
  //  * @param offset - Optional offset to apply to coordinates
  //  * @returns A rectangle in Windows coordinate format
  //  */
  static ToSDWinRect(rect, scaleFactor, offset) {
    const winRect = {};
    let x = rect.x;
    let y = rect.y;

    // Apply offset if provided
    if (offset) {
      x += offset.x;
      y += offset.y;
    }

    // Apply scale factor if greater than 1, otherwise use direct values
    if (scaleFactor > 1) {
      winRect.left = Math.round(x * scaleFactor);
      winRect.top = Math.round(y * scaleFactor);
      winRect.right = Math.round((x + rect.width) * scaleFactor);
      winRect.bottom = Math.round((y + rect.height) * scaleFactor);
    } else {
      winRect.left = x;
      winRect.top = y;
      winRect.right = x + rect.width;
      winRect.bottom = y + rect.height;
    }

    return winRect;
  }



  static WindowSettings = function () {
    this.updated = 0,
      this.worigin = {
        x: 0,
        y: 0
      },
      this.wscale = 0,
      this.wscalemode = 0,
      this.leftpanelmode = 0
  }


  static Result = function () {
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
      this.TextureList = new TextureList(),
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

  // static ArrowSizes = [
  //   'small',
  //   'medium',
  //   'large'
  // ]

  // static SVGFragmentRecord = function (e, t) {
  //   this.fragment = t,
  //     this.EMFHash = e,
  //     this.objectIDs = []
  // }

  // static SVGFragments = []
  // static SVGHashRecord = function (e) {
  //   this.EMFHash = e,
  //     this.cindexes = [],
  //     this.png = !1,
  //     this.svg = !1,
  //     this.svgcolor = !1
  // }

  static Errors = {
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

  static Signature = 'SMARTDRW'
  // static FVERSIONVSM = 37
  // static FVERSION2015 = 38
  // static FVERSION2016 = 39
  // static SDF_FVERSION2018 = 40
  // static SDF_FVERSION2022 = 41
  // static SDF_FVERSION = 41
  // static SDF_MINFVERSION = 3
  // static SDF_MINSVERSION = 5
  // static SDF_POVERSION801 = 801
  // static SDF_PVERSION804 = 804
  // static SDF_PVERSION816 = 816
  // static SDF_PVERSION838 = 838
  // static SDF_PVERSION847 = 847
  // static SDF_PVERSION848 = 848
  // static SDF_PVERSION849 = 849
  // static SDF_PVERSION850 = 850
  // static SDF_PVERSION851 = 851
  // static SDF_PVERSION852 = 852
  // static SDF_PVERSION853 = 853
  // static SDF_PVERSION854 = 854
  // static SDF_PVERSION855 = 855
  // static SDF_PVERSION856 = 856
  // static SDF_PVERSION857 = 857
  // static SDF_PVERSION858 = 858
  // static SDF_PVERSION859 = 859
  // static SDF_PVERSION860 = 860
  // static SDF_PVERSION861 = 861
  // static SDF_PVERSION862 = 862
  // static SDF_PVERSION863 = 863
  // static SDF_PVERSION864 = 864

  // static SDF_PVERSION = 864

  // static PRINTRES = 100

  // static DRAWRES = 600

  // static SDF_BEGIN = 32768

  // static SDF_END = 16384

  // static SDF_MASK = - 49153

  // static FragmentLoad_RefCount = 0

  // static UnsupportedPanels = [
  //   'Web Page Annotations',
  //   'Visual Outline',
  //   'Value Stream Maps',
  //   'Charts',
  //   'Org Charts VPM',
  //   'Kanban',
  //   'LDAP',
  //   'Annual Calendars',
  //   'Calendars',
  //   'Monthly Calendars',
  //   'Photo Annual',
  //   'Photo Monthly',
  //   'Project Team Charts',
  //   'Web Site Maps',
  //   'Presentation',
  //   'Storyboards',
  //   'Story Board'
  // ]

  static UnsupportedTypes = []

  // static ReadFileFromBuffer(e, t) {
  //   T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
  //   var a = SDF.ReadBuffer(e, t, 0, !1, SDF.ReadFileFromBuffer_Complete);
  //   return a &&
  //     a != SDF.Errors.WaitingForCallBack ? (
  //     SDUI.Commands.MainController.ActiveSessionController.ReturnToTemplateDialog = !0,
  //     SDUI.Commands.MainController.ActiveSessionController.UpdateAlertModal(Resources.Strings['SDRRead_Error_' + a], 1),
  //     T3Gv.optManager.ShowLoading(!1),
  //     t.error
  //   ) : (
  //     t.WarnMeta && false,
  //     0 === a &&
  //     (a = SDF.ReadFileFromBuffer_Complete(t)),
  //     T3Gv.optManager.ShowLoading(!1),
  //     a
  //   )
  // }





  // static DeleteOldLayers(e) {
  //   var t,
  //     a,
  //     r = e.tLMB.layers,
  //     i = r.length,
  //     n = ConstantData.LayerTypes,
  //     o = [];
  //   for (t = i - 1; t >= 0; t--) switch ((a = r[t]).layertype) {
  //     case n.SD_LAYERT_TIMELINE:
  //     case n.SD_LAYERT_MEETING:
  //       o = o.concat(a.zList),
  //         T3Gv.optManager.RemoveLayer(t)
  //   }
  //   o.length &&
  //     T3Gv.optManager.DeleteObjects(o, !0)
  // }

  // static ReadFileFromBuffer_Complete(e) {
  //   var t,
  //     a,
  //     r,
  //     i,
  //     n,
  //     o,
  //     s,
  //     l,
  //     S,
  //     c = [],
  //     u = !1,
  //     p = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
  //     d = (ConstantData.DrawingObjectBaseClass.CONNECTOR, 0),
  //     D = ConstantData.LayerTypes,
  //     g = ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL,
  //     h = ConstantData.Defines.STANDARD_INTERIOR_WALL,
  //     m = ConstantData.Defines.STANDARD_EXTERIOR_WALL,
  //     C = ConstantData.Defines.METRIC_INTERIOR_WALL,
  //     y = ConstantData.Defines.METRIC_EXTERIOR_WALL;
  //   if (
  //     e.isTemplate ? (
  //       SDUI.Commands.MainController.Document.IsScaledDrawing(e.rulerConfig) &&
  //       (
  //         e.sdp.moreflags = Utils2.SetFlag(
  //           e.sdp.moreflags,
  //           ConstantData.SessionMoreFlags.SEDSM_ShowGrid,
  //           !0
  //         ),
  //         e.sdp.moreflags = Utils2.SetFlag(
  //           e.sdp.moreflags,
  //           ConstantData.SessionMoreFlags.SEDSM_DrawToScale,
  //           !0
  //         )
  //       ),
  //       ConstantData.DocumentContext.UserSettings &&
  //       (
  //         SDF.GetMetricFromLanguage(),
  //         ConstantData.DocumentContext.UserSettings.Metric &&
  //         0 == (
  //           p.moreflags & ConstantData.SessionMoreFlags.SEDSM_KeepUnits
  //         ) &&
  //         (
  //           e.rulerConfig &&
  //           (
  //             e.rulerConfig = SDUI.Commands.MainController.Document.GetMetricScale(e.rulerConfig)
  //           ),
  //           e.sdp.moreflags & ConstantData.SessionMoreFlags.SEDSM_DrawToScale &&
  //           (u = !0)
  //         ),
  //         1 === ConstantData.DocumentContext.UserSettings.PaperSize &&
  //         T3Gv.optManager.AccomodateDocumentPaperSize('A4')
  //       )
  //     ) : 'letter' !== e.PaperType &&
  //     T3Gv.optManager.AccomodateDocumentPaperSize(e.PaperType),
  //     T3Gv.docUtil.ResizeDocument(p.dim.x, p.dim.y),
  //     e.rulerConfig &&
  //     (
  //       T3Gv.docUtil.SetRulers(e.rulerConfig),
  //       SDUI.Commands.MainController.Document.SetRulerVisibility(e.rulerConfig.show)
  //     ),
  //     e.WindowSettings &&
  //     (
  //       e.WindowSettings.wflags & ListManager.WFlags.W_Stf ? e.WindowSettings.wflags & ListManager.WFlags.W_Page ? T3Gv.docUtil.SetSizeToPage(!0) : T3Gv.docUtil.SetSizeToFit(!0) : T3Gv.docUtil.SetZoomFactor(e.WindowSettings.wscale, !0),
  //       T3Gv.docUtil.SetScroll(e.WindowSettings.worigin.x, e.WindowSettings.worigin.y)
  //     ),
  //     function () {
  //       if (0 !== e.IDMap.length) if (
  //         i = e.IDMap[e.sdp.tselect],
  //         e.sdp.tselect = null != i ? i : - 1,
  //         e.ReadBlocks
  //       ) {
  //         t = e.tLMB.layers.length;
  //         var r = [];
  //         for (a = 0; a < t; a++) {
  //           var s = (n = e.tLMB.layers[a]).zList.length;
  //           for (o = 0; o < s; o++) void 0 !== (i = e.IDMap[n.zList[o]]) ? i < 0 ? (n.zList.splice(o, 1), o--, s--) : (n.zList[o] = i, r[i] = !0) : (
  //             n.zList.splice(o, 1),
  //             o--,
  //             s--,
  //             SDUI.Utils.Logger.LogError('Bad zList')
  //           )
  //         }
  //       } else {
  //         t = e.zList.length;
  //         var l = null;
  //         for (a = 0; a < t; a++) l = T3Gv.optManager.GetObjectPtr(e.zList[a], !1),
  //           e.tLMB.layers[l.Layer].zList.push(e.zList[a])
  //       }
  //     }(),
  //     e.sdp &&
  //     (
  //       e.PVersion <= SDF.SDF_PVERSION862 ? (
  //         SDUI.Commands.MainController.Document.SetSnapEnable((e.sdp.flags & ConstantData.SessionFlags.SEDS_Snap) > 0),
  //         SDUI.Commands.MainController.Document.SetGridVisibility(
  //           (
  //             e.sdp.moreflags & ConstantData.SessionMoreFlags.SEDSM_ShowGrid
  //           ) > 0,
  //           !1
  //         ),
  //         SDUI.Commands.MainController.Document.ForceCenterSnapEnable(e.sdp.centersnapalign),
  //         SDUI.Commands.MainController.Document.SetPageDividerVisibility(
  //           0 == (
  //             e.sdp.flags & ConstantData.SessionFlags.SEDS_NoPageBreakLines
  //           )
  //         ),
  //         SDUI.Commands.MainController.Document.SetSpellCheck(
  //           (
  //             T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_AutoSpell
  //           ) > 0,
  //           !1
  //         ),
  //         SDUI.Commands.MainController.Document.ToggleSnapToShape(!0)
  //       ) : (
  //         SDUI.Commands.MainController.Document.SetSnapEnable(
  //           (
  //             T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_SnapToGridC
  //           ) > 0 ||
  //           (
  //             T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_SnapToGridTL
  //           ) > 0
  //         ),
  //         SDUI.Commands.MainController.Document.ForceCenterSnapEnable(
  //           (
  //             T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_SnapToGridC
  //           ) > 0
  //         ),
  //         SDUI.Commands.MainController.Document.SetGridVisibility(
  //           (
  //             T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_ShowGrid
  //           ) > 0,
  //           !1
  //         ),
  //         SDUI.Commands.MainController.Document.SetPageDividerVisibility(
  //           (
  //             T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_ShowPageDividers
  //           ) > 0
  //         ),
  //         SDUI.Commands.MainController.Document.SetSpellCheck(
  //           (
  //             T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_AutoSpell
  //           ) > 0,
  //           !1
  //         ),
  //         SDUI.Commands.MainController.Document.ToggleSnapToShape(
  //           0 == (
  //             T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_SnapToShapes_Off
  //           )
  //         ),
  //         SDUI.Commands.MainController.Document.SetRulerVisibility(
  //           (
  //             T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_ShowRulers
  //           ) > 0
  //         )
  //       ),
  //       ConstantData.DocumentContext.UserSettings &&
  //       (
  //         SDUI.Commands.MainController.Document.SetSpellDictionary(ConstantData.DocumentContext.UserSettings.SpellDict, !1),
  //         SDUI.Commands.MainController.Document.SetSpellFlags(ConstantData.DocumentContext.UserSettings.SpellFlags, !1)
  //       )
  //     ),
  //     !e.LoadBlockList
  //   ) {
  //     var f = T3Gv.objectStore.GetObject(T3Gv.optManager.theContentHeader.SDDataID);
  //     e.SDData ? f ? f.Data.SDData = e.SDData : (
  //       f = T3Gv.objectStore.CreateBlock(
  //         ConstantData.StoredObjectType.SDDATA_OBJECT,
  //         {
  //           SDData: e.SDData
  //         }
  //       ),
  //       T3Gv.optManager.theContentHeader.SDDataID = f.ID
  //     ) : f &&
  //     (f.Delete(), T3Gv.optManager.theContentHeader.SDDataID = - 1)
  //   }
  //   (e.IsLucid || e.IsVisio) &&
  //     (
  //       'LINEDRAW' === T3Gv.optManager.theContentHeader.BusinessModule ||
  //         'MANUALCHART' === T3Gv.optManager.theContentHeader.BusinessModule ? (
  //         T3Gv.optManager.theContentHeader.BusinessModule = 'LINEDRAW_SWIMLANE',
  //         T3Gv.docUtil.rulerConfig.units === ConstantData.RulerUnits.SED_Feet &&
  //         (
  //           T3Gv.docUtil.rulerConfig.units = ConstantData.RulerUnits.SED_Inches
  //         ),
  //         p.def.h_arraywidth = 75,
  //         p.def.v_arraywidth = 75,
  //         p.def.arraywd = 25,
  //         p.def.arrayht = 25
  //       ) : 'FLOORPLAN' === T3Gv.optManager.theContentHeader.BusinessModule &&
  //       (
  //         p.flags = Utils2.SetFlag(p.flags, ConstantData.SessionFlags.SEDS_FreeHand, !0)
  //       )
  //     );
  //   var L,
  //     I,
  //     T = T3Gv.optManager.theContentHeader.BusinessModule;
  //   if (
  //     T3Gv.optManager.theContentHeader.BusinessModule = '',
  //     SDJS_init_business_manager(T),
  //     T3Gv.optManager.theContentHeader.smartpanelname = 'smartpanel',
  //     T3Gv.optManager.theContentHeader.smartpanelname
  //   ) {
  //     switch (d) {

  //       case D.SD_LAYERT_MINDMAP:
  //         T3Gv.optManager.theContentHeader.smartpanelname = 'mind maps',
  //           p.flags = Utils2.SetFlag(p.flags, ConstantData.SessionFlags.SEDS_LLink, !0)
  //     }
  //     gBusinessManager instanceof Business.LineDraw ||
  //       gBusinessManager instanceof Business.FlowChart ||
  //       (p.def.h_arraywidth = 75, p.def.v_arraywidth = 75);
  //     var M = [],
  //       P = T3Gv.optManager.theContentHeader.lp_list.lib.length;
  //     e.IsVisio &&
  //       0 === P &&
  //       (
  //         T3Gv.optManager.theContentHeader.lp_list.lib.push(
  //           new ListManager.LibListEntry('Office\\Standard Shapes.SDL')
  //         ),
  //         P = 1
  //       );
  //     for (
  //       var R = function (e, t) {
  //         var a,
  //           r;
  //         for (r = e.SearchLibs.length, a = 0; a < r; a++) if (t === e.SearchLibs[a].ItemId) return e.SearchLibs[a];
  //         return null
  //       },
  //       A = 0;
  //       A < P;
  //       A++
  //     ) {
  //       var _ = T3Gv.optManager.theContentHeader.lp_list.lib[A];
  //       if (_.SearchResults) {
  //         var E = R(e, _.libGuid);
  //         E &&
  //           M.push(E)
  //       } else {
  //         var w;
  //         null != (
  //           w = _.libGuid ? _.libGuid : SDUI.Commands.MainController.Symbols.GetLibraryIDFromPath(_.libname)
  //         ) &&
  //           w != Constants.Guid_Empty &&
  //           M.push(w)
  //       }
  //     }
  //     SDUI.Commands.MainController.Symbols.Initialize(M),
  //       null != e.CurrentSymbol &&
  //       SDUI.Commands.MainController.Symbols.SetCurrentSavedSymbol(e.CurrentSymbol),
  //       e.SearchResults.length &&
  //       SDUI.Commands.MainController.Symbols.SymbolSearch_SetList(e.SearchResults)
  //   }
  //   if (
  //     e.LibraryPathTarget.length &&
  //     (
  //       SDUI.Commands.MainController.SymbolLibraryBrowser.LibraryPathTarget = e.LibraryPathTarget
  //     ),
  //     e.PVersion < SDF.SDF_PVERSION864 &&
  //     !e.isTemplate &&
  //     (
  //       T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
  //         T3Gv.optManager.theContentHeader.flags,
  //         ConstantData.ContentHeaderFlags.CT_HideLeftPanel,
  //         !1
  //       )
  //     ),
  //     T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_HideLeftPanel ? SDUI.Commands.MainController.SmartPanels.ToggleLeftPanel(!1, !0) : SDUI.Commands.MainController.SmartPanels.ToggleLeftPanel(!1, !1),

  //     Clipboard &&
  //     Clipboard.FocusOnClipboardInput &&
  //     setTimeout((function () {
  //       Clipboard.FocusOnClipboardInput()
  //     }), 10),
  //     e.LoadBlockList
  //   ) return ConstantData.DocumentContext.AllowLayers = 0 == (e.sdp.flags & ConstantData.SessionFlags.SEDS_LockLayers)

  //       ;
  //   if (
  //     e.tLMB.activelayer < e.tLMB.layers.length &&
  //     (
  //       d = e.tLMB.layers[e.tLMB.activelayer].layertype,
  //       e.tLMB.layers.length > 1
  //     )
  //   ) switch (d) {
  //     default:
  //   }
  //   if (SDF.DeleteOldLayers(e), e.ReadBlocks) {
  //     for (t = e.noteids.length, a = 0; a < t; a++) e.noteids[a] &&
  //       !e.usednoteids[a] &&
  //       (s = T3Gv.objectStore.GetObject(e.noteids[a])) &&
  //       s.Delete();
  //     for (t = e.textids.length, a = 0; a < t; a++) e.textids[a] &&
  //       !e.usedtextids[a] &&
  //       (s = T3Gv.objectStore.GetObject(e.textids[a])) &&
  //       s.Delete();
  //     for (t = e.imageids.length, a = 0; a < t; a++) e.imageids[a] &&
  //       !e.usedimageids[a] &&
  //       (s = T3Gv.objectStore.GetObject(e.imageids[a].id)) &&
  //       s.Delete();
  //     for (t = e.tableids.length, a = 0; a < t; a++) e.tableids[a] &&
  //       !e.usedtableids[a] &&
  //       (s = T3Gv.objectStore.GetObject(e.tableids[a])) &&
  //       s.Delete();
  //     for (t = e.graphids.length, a = 0; a < t; a++) e.graphids[a] &&
  //       !e.usedgraphids[a] &&
  //       (s = T3Gv.objectStore.GetObject(e.graphids[a])) &&
  //       (T3Gv.optManager.graph_DeleteObject(s.Data), s.Delete());
  //     for (t = e.expandedviewids.length, a = 0; a < t; a++) e.expandedviewids[a] &&
  //       !e.usedexpandedviewids[a] &&
  //       (s = T3Gv.objectStore.GetObject(e.expandedviewids[a])) &&
  //       s.Delete();
  //     for (t = e.ganttids.length, a = 0; a < t; a++) e.ganttids[a] &&
  //       !e.usedganttids[a] &&
  //       (s = T3Gv.objectStore.GetObject(e.ganttids[a])) &&
  //       s.Delete()
  //   }
  //   for (
  //     e.sdp &&
  //     e.sdp.def.style.Fill.Paint.FillType === ConstantData.FillTypes.SDFILL_TEXTURE &&
  //     (
  //       e.ReadBlocks ||
  //       (
  //         void 0 === e.sdp.def.style.Fill.Paint.Texture ? e.sdp.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT : e.sdp.def.style.Fill.Paint.Texture < e.TextureList.Textures.length ? e.sdp.def.style.Fill.Paint.Texture = e.TextureList.Textures[e.sdp.def.style.Fill.Paint.Texture].index : e.sdp.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT
  //       )
  //     ),
  //     e.sdp &&
  //     e.sdp.background.Paint.FillType === ConstantData.FillTypes.SDFILL_TEXTURE &&
  //     (
  //       e.ReadBlocks ||
  //       (
  //         void 0 === e.sdp.background.Paint.Texture ? e.sdp.background.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT : e.sdp.background.Paint.Texture < e.TextureList.Textures.length ? e.sdp.background.Paint.Texture = e.TextureList.Textures[e.sdp.background.Paint.Texture].index : e.sdp.background.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT
  //       )
  //     ),
  //     T3Gv.optManager.RichGradients = e.RichGradients,
  //     T3Gv.optManager.HasBlockDirectory = e.HasBlockDirectory,
  //     (r = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLinksBlockID, !0)).length = 0,
  //     t = e.links.length,
  //     a = 0;
  //     a < t;
  //     a++
  //   ) if (e.links[a].targetid === e.links[a].hookid) {
  //     var k = T3Gv.optManager.GetObjectPtr(e.links[a].hookid, !0);
  //     if (k) for (o = k.hooks.length - 1; o >= 0; o--) k.hooks[o].objid === e.links[a].targetid &&
  //       k.hooks.splice(o, 1)
  //   } else r.push(e.links[a]);
  //   for (
  //     (t = e.DeleteList.length) &&
  //     (T3Gv.optManager.DeleteObjects(e.DeleteList, !1), e.DeleteList = []),
  //     a = 0;
  //     a < r.length;
  //     a++
  //   ) {
  //     var U = T3Gv.optManager.GetObjectPtr(r[a].targetid, !1);
  //     U instanceof ListManager.PolyLine &&
  //       U.polylist &&
  //       U.StyleRecord.Line.BThick &&
  //       (
  //         r[a].flags = Utils2.SetFlag(r[a].flags, ConstantData.LinkFlags.SED_L_CHANGE, !0)
  //       )
  //   }
  //   if (
  //     T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto ? (
  //       T3Gv.optManager.theContentHeader.MaxWorkDim.x = e.sdp.dim.x - 2 * ConstantData.Defines.SED_EdgeSlop,
  //       T3Gv.optManager.theContentHeader.MaxWorkDim.y = e.sdp.dim.y - 2 * ConstantData.Defines.SED_EdgeSlop
  //     ) : (
  //       T3Gv.optManager.theContentHeader.MaxWorkDim.x = ConstantData.Defines.MaxWorkDimX,
  //       T3Gv.optManager.theContentHeader.MaxWorkDim.y = ConstantData.Defines.MaxWorkDimY
  //     ),
  //     u
  //   ) for (t = e.zList.length, a = 0; a < t; a++) (l = T3Gv.optManager.GetObjectPtr(e.zList[a], !1)).objecttype === g &&
  //     (
  //       I = l.StyleRecord.Line.Thickness,
  //       Utils2.IsEqual(I, h) ? (
  //         l.StyleRecord.Line.Thickness = C,
  //         l.StyleRecord.Line.BThick = C / 2,
  //         l.ChangeLineThickness(I)
  //       ) : Utils2.IsEqual(I, m) &&
  //       (
  //         l.StyleRecord.Line.Thickness = y,
  //         l.StyleRecord.Line.BThick = y / 2,
  //         l.ChangeLineThickness(I)
  //       )
  //     );
  //   if (
  //     (e.IsLucid || e.IsVisio) &&
  //     'LINEDRAW_SWIMLANE' === T3Gv.optManager.theContentHeader.BusinessModule
  //   ) for (t = e.zList.length, a = 0; a < t; a++) (l = T3Gv.optManager.GetObjectPtr(e.zList[a], !1)).DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
  //     2 === l.hooks.length &&
  //     0 === l.objecttype &&
  //     (
  //       l.objecttype = ConstantData.ObjectTypes.SD_OBJT_BUSLOGIC_LINEDRAW,
  //       l.subtype = ConstantData.ObjectSubTypes.SD_SUBT_LINEDRAW_SWIMLANE
  //     );
  //   if (e.IsLucid) {
  //     for (
  //       'LINEDRAW_SWIMLANE' === T3Gv.optManager.theContentHeader.BusinessModule &&
  //       (
  //         ConstantData.DocumentContext.LineTool = Resources.LineToolTypes.SegmentedLine,
  //         e.sdp.flags = Utils2.SetFlag(e.sdp.flags, ConstantData.SessionFlags.SEDS_AutoInsert, !0)
  //       ),
  //       t = e.zList.length,
  //       a = 0;
  //       a < t;
  //       a++
  //     ) l = T3Gv.optManager.GetObjectPtr(e.zList[a], !1),
  //       T3Gv.optManager.UngroupVisioShapes(l, e.DeleteList),
  //       e.DeleteList.length &&
  //       (T3Gv.optManager.DeleteObjects(e.DeleteList, !1), e.DeleteList = []);
  //     SDUI.MarketingActionLogger.Log(SDUI.MarketingActionCodes.ImportLucid_Complete)
  //   } (e.IsLucid || e.IsVisio) &&
  //     (
  //       !T3Gv.optManager.theContentHeader.SDDataID ||
  //       T3Gv.optManager.theContentHeader.SDDataID < 0
  //     ) &&
  //     ListManager.SDData.CreateDefaultSDData(),
  //     e.sdp.Page = Utils1.DeepCopy(T3Gv.optManager.theContentHeader.Page),
  //     T3Gv.optManager.UpdateLinks(),
  //     T3Gv.optManager.UpdateLineHops(!0),
  //     GlobalDatagFlowChartManager.UpdateSwimlanes(),
  //     T3Gv.optManager.RenderAllSVGObjects();
  //   var J,
  //     x,
  //     O = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theTEDSessionBlockID, !1);
  //   for (
  //     O.theActiveTextEditObjectID = - 1,
  //     O.theActiveTableObjectID = - 1,
  //     O.theActiveTableObjectIndex = - 1,
  //     O.theActiveOutlineObjectID = - 1,
  //     O.theTELastOp = ConstantData.TELastOp.INIT,
  //     e.sdp.tselect >= 0 &&
  //     (c.push(e.sdp.tselect), T3Gv.optManager.SelectObjects(c, !1, !1)),
  //     t = e.zList.length,
  //     a = 0;
  //     a < t;
  //     a++
  //   ) if (l = T3Gv.optManager.GetObjectPtr(e.zList[a], !1)) {
  //     if (
  //       false ? l.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete &&
  //         (
  //           l.extraflags = Utils2.SetFlag(l.extraflags, ConstantData.ExtraFlags.SEDE_NoDelete, !1)
  //         ) : l.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER &&
  //         (x = l.GetTable(!1)) &&
  //       T3Gv.optManager.Table_SortChildContainers(l, x),
  //       l.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT ? T3Gv.optManager.Timeline_UpdateBlockIDEvent(l) : l.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_TIMELINE &&
  //         (
  //           T3Gv.optManager.Timeline_UpdateBlockID(l),
  //           T3Gv.optManager.Timeline_UpdateCellTimes(l)
  //         ),
  //       l.Dimensions &&
  //       e.sdp.tselect != l.BlockID &&
  //       l.Dimensions & ConstantData.DimensionFlags.SED_DF_Select
  //     ) {
  //       var B = T3Gv.optManager.svgObjectLayer.GetElementByID(l.BlockID);
  //       if (B && l.Dimensions) {
  //         var H = null;
  //         for (o = 0, o = B.ElementCount() - 1; o >= 1; o--) (H = B.GetElementByIndex(o)).GetID() != ConstantData.SVGElementClass.DIMENSIONLINE &&
  //           H.GetID() != ConstantData.SVGElementClass.DIMENSIONTEXT ||
  //           H.SetOpacity(0)
  //       }
  //     }
  //     if (
  //       0 === l.objecttype &&
  //       l.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASK
  //       ,
  //       l.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART &&
  //       l.GetGanttInfo()
  //     ) e.FromWindows &&
  //       T3Gv.optManager.GanttCleanUpStyles(l),
  //       T3Gv.optManager.ConfirmPlanningFields(l.datasetTableID),
  //       T3Gv.optManager.Table_EnsureDateFormatCorrect(l.BlockID, e.AddEMFHash),
  //       J = l,
  //       e.isTemplate ? T3Gv.optManager.PlanningTableUpdateStartDate() : e.sdp.moreflags & ConstantData.SessionMoreFlags.SEDSM_HideLayerTabs &&
  //         T3Gv.optManager.UpdateStartDateForHiddenGanttLayer(J.BlockID),
  //       T3Gv.optManager.VisibleZList().indexOf(l.BlockID) >= 0 &&
  //       (
  //         T3Gv.optManager.PlanningTableUpdateGeometry(l, !0, !0),
  //         e.AddEMFHash &&
  //         (
  //           T3Gv.optManager.GanttUpdateDependencyLines(l.BlockID),
  //           T3Gv.optManager.UpdateLinks()
  //         ),
  //         T3Gv.optManager.RenderDirtySVGObjects()
  //       )
  //   }
  //   switch (d) {
  //   }
  //   if (J) switch (d) {
  //   }
  //   T3Gv.optManager.PreserveUndoState(!0),
  //     T3Gv.optManager.ResetStateManager(),
  //     T3Gv.optManager.theContentHeader.Save_HistoryState = - 1,
  //     T3Gv.optManager.ClearFutureUndoStates(),
  //     T3Gv.optManager.SetDocDirtyState(!1),
  //     ConstantData.DocumentContext.AllowLayers = 0 == (e.sdp.flags & ConstantData.SessionFlags.SEDS_LockLayers),
  //     e.WindowSettings &&
  //     T3Gv.optManager.ShowLoading(!1),
  //     T3Gv.optManager.FitDocumentWorkArea(!0, !1);
  //   var z = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !1);
  //   if (T3Gv.optManager.UpdateSelectionAttributes(z), e.isTemplate) {

  //   }
  //   return e.isTemplate &&
  //     e.rulerConfig &&
  //     e.rulerConfig.useInches &&
  //     e.rulerConfig.show &&
  //     ConstantData.DocumentContext.UserSettings &&
  //     0 == (
  //       ConstantData.DocumentContext.UserSettings.HelpTipStatus & Globals.HintFlags.Units
  //     ) &&
  //     SDUI.Commands.MainController.ShowModeless(Resources.Controls.Modals.Hint_Metric.Id),
  //     SDUI.AppSettings.Application !== Resources.Application.Viewer &&
  //     (
  //       ListManager.SDData.StartFieldedDataUpdateService(),
  //       SDUI.Commands.MainController.CollabOverlayController.InitCollabOverlay(),
  //       Collab.Cursors = []
  //     ),
  //     e.error
  // }


  static ReadSymbolFromBuffer(e, t, a, r, i, n, o, s, l, S, c, u, p, d) {
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
    var R = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !0),
      A = [];
    P.isTemplate = !1,
      P.IgnoreHeader = !0,
      P.sdp = new SEDSession(),
      P.sdp.def.style = Utils1.DeepCopy(R.def.style),
      P.isSymbol = 0 != d,
      P.gHash = new HashController(),
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
      var E = T3Gv.optManager.IsPlanningDocument(),
        w = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !0);
      for (
        g = P.zList.length,
        h = 0;
        h < g;
        h++
      ) {
        (C = T3Gv.optManager.GetObjectPtr(P.zList[h], !1)).objecttype === ConstantData.ObjectTypes.SD_OBJT_BPMN_POOL &&
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
          T3Gv.optManager.AddToDirtyList(P.zList[h]),
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
        T3Gv.optManager.DeleteObjects(A),
        P.SDData &&
        T3Gv.optManager.SDData_Transfer(P.zList, P.SDData, M),
        b = P.links.length,
        !l &&
        b > 0
      ) {
        for (
          m = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLinksBlockID, !0),
          h = 0;
          h < b;
          h++
        ) m.push(P.links[h]);
        m.sort((function (e, t) {
          return e.targetid - t.targetid
        }))
      }
      var v = 0;
      for (h = 0; h < g; h++) (C = T3Gv.optManager.GetObjectPtr(P.zList[h], !1)) &&
        0 == (C.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
        (
          0 === v ? y = new Rectangle(C.r.x, C.r.y, C.r.width, C.r.height) : Utils2.UnionRect(C.r, y, y),
          v++
        );
      if (y) {
        if (s ? (f = y.x < 0 ? - y.x : 0, L = y.y < 0 ? - y.y : 0) : (f = 0, L = 0), f || L) for (h = 0; h < g; h++) (C = T3Gv.optManager.GetObjectPtr(P.zList[h], !1)) &&
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
              T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto ? (f = y.x + y.width - R.dim.x, I = 0) : (I = y.x + y.width, R.dim.x = I)
            ),
            y.y + y.height > R.dim.y &&
            (
              T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto ? L = y.y + y.height - R.dim.y : (T = y.y + y.height, R.dim.y = T)
            ),
            I ||
            T
          ) {
            var N = (
              w = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1)
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
              T3Gv.optManager.UpdateEdgeLayers([], G, R.dim),
              T3Gv.docUtil.ResizeDocument(R.dim.x, R.dim.y)
          } else if (f || L) for (h = 0; h < g; h++) (C = T3Gv.optManager.GetObjectPtr(P.zList[h], !1)) &&
            0 == (C.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
            C.OffsetShape(- f, - L)
        }
      }
      return !l &&
        s &&
        T3Gv.optManager.UpdateLinks(),
        n ? T3Gv.optManager.RenderDirtySVGObjects() : 1 === g &&
          T3Gv.optManager.RenderDirtySVGObjectsNoSetMouse(),
        P.error
    }
  }

  // static ReadSymbolFromBuffer_Complete(e) {
  //   debugger
  //   var t,
  //     a,
  //     r,
  //     i,
  //     n,
  //     o,
  //     s,
  //     l,
  //     S,
  //     c,
  //     u,
  //     p,
  //     d = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !0),
  //     D = {
  //       selectedList: []
  //     };
  //   for (
  //     t = T3Gv.optManager.ZListPreserve(),
  //     a = e.zList.length,
  //     Collab.AddToCreateList(null, e.zList),
  //     r = 0;
  //     r < a;
  //     r++
  //   ) t.push(e.zList[r]),
  //     n = T3Gv.optManager.GetObjectPtr(e.zList[r], !1),
  //     T3Gv.optManager.AddToDirtyList(e.zList[r]),
  //     n &&
  //     0 == (n.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
  //     D.selectedList.push(e.zList[r]),
  //     (p = n.GetTable(!1)) &&
  //     T3Gv.optManager.Table_Format(n, p, n.TextGrow, !1);
  //   for (
  //     i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLinksBlockID, !0),
  //     u = e.links.length,
  //     r = 0;
  //     r < u;
  //     r++
  //   ) i.push(e.links[r]);
  //   i.sort((function (e, t) {
  //     return e.targetid - t.targetid
  //   }));
  //   var g = 0;
  //   for (r = 0; r < a; r++) (n = T3Gv.optManager.GetObjectPtr(e.zList[r], !1)) &&
  //     0 == (n.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
  //     (
  //       0 === g ? o = new Rectangle(n.Frame.x, n.Frame.y, n.Frame.width, n.Frame.height) : Utils2.UnionRect(n.Frame, o, o),
  //       g++
  //     );
  //   if (o) {
  //     if (s = o.x < 0 ? - o.x : 0, l = o.y < 0 ? - o.y : 0, s || l) for (r = 0; r < a; r++) (n = T3Gv.optManager.GetObjectPtr(e.zList[r], !1)) &&
  //       0 == (n.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
  //       n.OffsetShape(s, l);
  //     o.x += s,
  //       o.y += l,
  //       o.x + o.width > d.dim.x &&
  //       (S = o.x + o.width, d.dim.x = S),
  //       o.y + o.height > d.dim.y &&
  //       (c = o.y + o.height, d.dim.y = c),
  //       (S || c) &&
  //       T3Gv.docUtil.ResizeDocument(d.dim.x, d.dim.y)
  //   }
  //   return T3Gv.optManager.UpdateLinks(),
  //     T3Gv.optManager.RenderDirtySVGObjects(),
  //     e.error
  // }

  // static ParseGroupBuffer(e, t, a) {
  //   var r,
  //     i = new T3DataStream(e),
  //     n = SDF.SDF_MINFVERSION;
  //   t.isSymbol &&
  //     (n = SDF.SDF_MINSVERSION),
  //     i.endianness = T3DataStream.LITTLE_ENDIAN,
  //     4 === a ? (r = i.readUint32() + 4) < i._byteLength &&
  //       (i._byteLength = r) : a &&
  //     i.readUint8Array(a);
  //   var o = i.readStruct(FileParser.SDR_Parser_HeaderOnly_Struct);
  //   return i = null,
  //     o &&
  //       o.start &&
  //       o.start == SDF.Signature &&
  //       o.codes.length >= 1 ? o.codes[0].code !== FileParser.SDROpCodesByName.SDF_C_VERSION ? (t.error = SDF.Errors.UnknownFile, null) : o.codes[0].data.MinVer > SDF.SDF_FVERSION ? (t.error = SDF.Errors.Version, null) : o.codes[0].data.FVersion < n ? (t.error = SDF.Errors.MinVersion, null) : (
  //         (i = new T3DataStream(e)).endianness = T3DataStream.LITTLE_ENDIAN,
  //         4 === a ? (r = i.readUint32() + 4) < i._byteLength &&
  //           (i._byteLength = r) : a &&
  //         i.readUint8Array(a),
  //         o = i.readStruct(FileParser.SDR_Parser_Struct),
  //         i = null,
  //         o
  //       ) : (t.error = SDF.Errors.UnknownFile, null)
  // }

  // static ValidateObjectHashCodes(e, t, a, r, i, n) {
  //   var o,
  //     s,
  //     l,
  //     S,
  //     c,
  //     u,
  //     p = a,
  //     d = [];
  //   for (d.push(p); t.codes[a].code != n;) {
  //     switch (t.codes[a].code) {
  //       case i.SDF_C_TABLEVP:
  //       case i.SDF_C_TABLEID:
  //         return a;
  //       case i.SDF_C_EMFHASH:
  //         o = t.codes[a].data.name;
  //         break;
  //       case i.SDF_C_NATIVESTORAGE:
  //         t.codes[p].data.nativeindex = a;
  //         break;
  //       case i.SDF_C_DRAWMETA:
  //         if (
  //           void 0 === o &&
  //           (
  //             o = r.gHash.GetHash(t.codes[a].data.BlobBytes),
  //             t.codes[a].data.EMFHash = o
  //           ),
  //           s = r.HashRecords.length,
  //           S = !0,
  //           e
  //         ) {
  //           for (d = [], u = e.length, c = 0; c < u; c++) d.push(e[c]);
  //           d.push(p)
  //         }
  //         for (l = 0; l < s; l++) if (r.HashRecords[l].EMFHash === o) {
  //           r.HashRecords[l].cindexes.push(d),
  //             S = !1;
  //           break
  //         }
  //         if (S) {
  //           var D = new SDF.SVGHashRecord(o);
  //           D.cindexes.push(d),
  //             r.HashRecords.push(D)
  //         }
  //     }
  //     a++
  //   }
  //   return a
  // }

  // static ValidateHashCodes(e, t, a, r, i, n) {
  //   for (
  //     var o = function (e) {
  //       try {
  //         var s,
  //           l,
  //           S,
  //           c,
  //           u,
  //           p,
  //           d,
  //           D,
  //           g,
  //           h,
  //           m,
  //           C,
  //           y = [],
  //           f = [];
  //         if (
  //           SDF.FragmentLoad_RefCount = Math.max(0, SDF.FragmentLoad_RefCount - 1),
  //           e
  //         ) for (l = e.length, s = 0; s < l; s++) for (
  //           SDUI.Commands.MainController.PagedSDRController.LoadingSmartDrawHashes = !0,
  //           c = (p = e[s].cindexes).length,
  //           S = 0;
  //           S < c;
  //           S++
  //         ) {
  //           for (
  //             h = (u = p[S])[0],
  //             d = u.length,
  //             g = t,
  //             D = 1;
  //             D < d &&
  //             null != (g = g.codes[h].data.groupcodelist);
  //             D++
  //           ) h = u[D];
  //           null != g &&
  //             (
  //               e[s].png &&
  //               (g.codes[h].data.UsePNG = !0),
  //               g.codes[h].data.HasSVG = e[s].svg,
  //               g.codes[h].data.HasColorSVG = e[s].svgcolor,
  //               e[s].svg ||
  //                 e[s].svgcolor ||
  //                 e[s].png ? g.codes[h].data.nativeindex &&
  //               delete g.codes[h].data.nativeindex : g.codes[h].data.nativeindex &&
  //               y.push({
  //                 codelist: g,
  //                 index: h,
  //                 cindexes: u
  //               })
  //             )
  //         }
  //         if (l = y.length) {
  //           for (r.HashRecords = [], s = 0; s < l; s++) {
  //             m = y[s].index,
  //               h = (g = y[s].codelist).codes[m].data.nativeindex;
  //             var L = SDF.ParseGroupBuffer(g.codes[h].data.data, r, 0);
  //             if (L) {
  //               for (f = [], c = y[s].cindexes.length, S = 0; S < c; S++) f.push(y[s].cindexes[S]);
  //               if (
  //                 g.codes[m].data.groupcodelist = L,
  //                 g.codes[m].data.groupindex = h,
  //                 g.codes[h].data.groupcodelist = L,
  //                 C = SDF.ValidateHashCodes(f, L, a, r, !0, null)
  //               ) return C
  //             }
  //           }
  //           n &&
  //             (
  //               r.HashRecords.length ? (
  //                 SDF.FragmentLoad_RefCount++,
  //                 SDUI.CMSContent.HashesExist(SDUI.AppSettings.ContentSource, r.HashRecords, o)
  //               ) : (SDF.FragmentLoad_RefCount++, o(r.HashRecords))
  //             )
  //         } else {
  //           if (
  //             (C = SDF.ReadBuffer_Complete(t, r, i)) &&
  //             C != SDF.Errors.WaitingForCallBack
  //           ) return SDUI.Commands.MainController.ActiveSessionController.ReturnToTemplateDialog = !0,
  //             SDUI.Commands.MainController.ActiveSessionController.UpdateAlertModal(Resources.Strings['SDRRead_Error_' + C], 1),
  //             r.error;
  //           n(r),
  //             $(document).trigger(Constants.Event_EMFsLoaded)
  //         }
  //       } catch (e) {
  //         T3Gv.optManager.ExceptionCleanup(e)
  //       }
  //     },
  //     s = 1;
  //     t.codes[s].code != FileParser.SDROpCodesByName.SDF_C_ENDFILE;
  //   ) {
  //     switch (t.codes[s].code) {
  //       case a.SDF_C_DRAWOBJ8:
  //         s = SDF.ValidateObjectHashCodes(
  //           e,
  //           t,
  //           s,
  //           r,
  //           a,
  //           FileParser.SDROpCodesByName.SDF_C_DRAWOBJ8_END
  //         );
  //         break;
  //       case a.SDF_C_DRAWOBJ:
  //         s = SDF.ValidateObjectHashCodes(e, t, s, r, a, FileParser.SDROpCodesByName.SDF_C_DRAWOBJ_END)
  //     }
  //     s++
  //   }
  //   if (n) {
  //     if (SDF.FragmentLoad_RefCount++, !r.HashRecords.length) return o(r.HashRecords);
  //     SDUI.Commands.MainController.PagedSDRController.LoadingSmartDrawHashes = !0,
  //       SDUI.CMSContent.HashesExist(SDUI.AppSettings.ContentSource, r.HashRecords, o)
  //   }
  // }

  static ReadBuffer(e, t, a, r, i) {
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
    t.FVersion < SDF.SDF_FVERSION2022 ? t.coordScaleFactor = T3Gv.docUtil.svgDoc.docInfo.docDpi / S.codes[0].data.drawres : t.coordScaleFactor = 1,
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
        SDF.ReadBuffer_Complete(S, t, r),
        t.error
      )
  }

  static ReadBuffer_Complete(e, t, a) {
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
          SDF.ReMapLinks(t.IDMap, t.links, t, a)

        ),
        i = t.zList.length,
        n = 0;
        n < i;
        n++
      ) if (S = t.zList[n], s = T3Gv.optManager.GetObjectPtr(S, !1)) {
        if (
          t.ReadBlocks,
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
            switch (s.LineType) {
              case ConstantData.LineType.POLYLINE:
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
              s.StyleRecord.Line.BThick &&
              s.polylist &&
              s.polylist.closed &&
              s.polylist.segs &&
              s.polylist.segs.length
            ) {
              var L,
                I = [],
                T = s.StyleRecord.Line.Thickness / 2;

              if (s instanceof Instance.Shape.Polygon && S.polylist) {
                var b = {};
                b.Frame = s.Frame,
                  b.inside = s.inside,
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
              if (!(R = T3Gv.optManager.InflateLine(P, T, !0, !0)) || 0 === R.length) break;
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

              if (s instanceof Instance.Shape.BaseLine)
                s.CalcFrame();

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
                  T3Gv.optManager.CalcPolyVertices(s)
              }
            } else (t.AddEMFHash || t.isTemplate || t.isSymbol) &&
              s.UpdateFrame(s.Frame);
        }
        var theGraph;
        if (
          null != (theGraph = s.GetGraph(!1)) &&
          T3Gv.optManager.GraphFormat(s, theGraph, s.Frame, !0),
          l = s.GetTable(!1)
        ) s.subtype !== ConstantData.ObjectSubTypes.SD_SUBT_MEETINGTASK &&
          s.subtype !== ConstantData.ObjectSubTypes.SD_SUBT_MEETINGPERSON &&
          s.objecttype !== ConstantData.ObjectTypes.SD_OBJT_TIMELINE &&
          T3Gv.optManager.Table_Format(s, l, s.TextGrow, !1);
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
                c = T3Gv.optManager.SD_GetVisioTextParent(s.BlockID),
                (u = T3Gv.optManager.GetObjectPtr(c, !1)) &&
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
            T3Gv.optManager.AddSVGObject(null, S, !0, !1),
            T3Gv.optManager.TextResizeCommon(S, !1, !0),
            p = T3Gv.optManager.svgObjectLayer.GetElementByID(S)
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
                T3Gv.optManager.TextResizeCommon(S, !1, !0)
            }
          }
          T3Gv.optManager.svgObjectLayer.RemoveElement(p),
            Collab.NoRedrawFromSameEditor = !1
        }
      }
      return !1 === t.isSymbol &&
        (
          t.VisioFileVersion &&
          (T3Gv.optManager.FileVersion = SDF.SDF_FVERSION2022),
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
          (T3Gv.optManager.FileVersion = SDF.SDF_FVERSION2022)
        ),
        t.error
    } catch (e) {
      throw e
    }
  }


  // static ConnectedToEdge(e) {
  //   var t,
  //     a,
  //     r,
  //     i,
  //     n = 1000,
  //     o = ConstantData.Defines.SED_CDim;
  //   return t = e.x,
  //     a = o - e.x,
  //     r = e.y,
  //     i = o - e.y,
  //     t < n ||
  //     a < n ||
  //     r < n ||
  //     i < n
  // }




  static ReMapLinks(e, t, a, r) {
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
      if (s = e[n], (o = T3Gv.optManager.GetObjectPtr(s, !1)) && o.hooks) for (S = (c = o.hooks.length) - 1; S >= 0; S--) e[o.hooks[S].objid] &&
        e[o.hooks[S].objid] > 0 ? (
        o.hooks[S].objid = e[o.hooks[S].objid],
        0 !== l ||
        r ||
        (
          null == D &&
          (D = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLinksBlockID, !0)),
          T3Gv.optManager.InsertLink(D, s, S, ConstantData.LinkFlags.SED_L_MOVE)
        ),
        a.IsVisio &&
        o &&
        o.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
        o.LineType === ConstantData.LineType.SEGLINE &&
        o.segl &&
        (
          (u = T3Gv.optManager.GetObjectPtr(o.hooks[S].objid, !1)).RotationAngle &&
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
  }

  // static ReadHeader(e, t, a, r) {
  //   var i;
  //   a.sdp;
  //   for (
  //     null == e.codes[t].data.lworigin ? (
  //       a.WindowSettings.worigin.x = e.codes[t].data.worigin.x,
  //       a.WindowSettings.worigin.y = e.codes[t].data.worigin.y
  //     ) : (
  //       a.WindowSettings.worigin.x = e.codes[t].data.lworigin.x,
  //       a.WindowSettings.worigin.y = e.codes[t].data.lworigin.y
  //     ),
  //     a.WindowSettings.wscale = e.codes[t].data.wscale,
  //     0 === a.WindowSettings.wscale ? a.WindowSettings.wscale = 1 : a.WindowSettings.wscale /= 1000,
  //     a.WindowSettings.wflags = e.codes[t].data.wflags,
  //     null == e.codes[t].data.longflags ? a.IgnoreHeader ||
  //       (T3Gv.optManager.theContentHeader.flags = e.codes[t].data.flags) : a.IgnoreHeader ||
  //     (
  //       T3Gv.optManager.theContentHeader.flags = e.codes[t].data.longflags
  //     ),
  //     null != e.codes[t].data.dateformat &&
  //     (
  //       a.IgnoreHeader ||
  //       (
  //         T3Gv.optManager.theContentHeader.dateformat = e.codes[t].data.dateformat
  //       )
  //     ),
  //     t++;
  //     e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_HEADER_END;
  //   ) {
  //     switch (e.codes[t].code) {
  //       case r.SDF_C_HILITELIST:
  //         t = SDF.ReadHiliteList(e, t, a, r);
  //         break;
  //       case r.SDF_C_SDDATABLOCK:
  //       case r.SDF_C_SDDATA64:
  //         break;
  //       case r.SDF_C_PAGE:
  //         a.IgnoreHeader ||
  //           SDF.ReadPage(e.codes[t].data, a);
  //         break;
  //       case r.SDF_C_SYMBOLSEARCHSTRING:
  //         a.IgnoreHeader ||
  //           (
  //             T3Gv.optManager.theContentHeader.SymbolSearchString = e.codes[t].data.name
  //           );
  //         break;
  //       case r.SDF_C_PARENTPAGEID:
  //         a.IgnoreHeader ||
  //           (
  //             T3Gv.optManager.theContentHeader.ParentPageID = e.codes[t].data.name
  //           );
  //         break;
  //       case r.SDF_C_TASKPANEL:
  //         if (a.IgnoreHeader) break;
  //         if (
  //           T3Gv.optManager.theContentHeader.smartpanelname = e.codes[t].data.name,
  //           SDF.UnsupportedPanels.indexOf(T3Gv.optManager.theContentHeader.smartpanelname) >= 0
  //         ) return a.error = SDF.Errors.UnsupportedPanel,
  //           - 1;
  //         (a.AddEMFHash || a.isTemplate) &&
  //           (
  //             T3Gv.optManager.theContentHeader.smartpanelname = SDF.RemapPanel(T3Gv.optManager.theContentHeader.smartpanelname)
  //           );
  //         break;
  //       case r.SDF_C_BUSINESSMODULE:
  //         if (a.IgnoreHeader) break;
  //         T3Gv.optManager.theContentHeader.BusinessModule = e.codes[t].data.name;
  //         break;
  //       case r.SDF_C_BEGIN_THEME12:
  //         if (a.IgnoreHeader) break;
  //         t = SDF.ReadDocumentTheme(e, t, a, r);
  //         break;
  //       case r.SDF_C_TIMELINEINFO:
  //         break;
  //       case r.SDF_C_LEFTPANELINFO:
  //         if (a.IgnoreHeader) break;
  //         if (
  //           !a.isTemplate &&
  //           (
  //             a.WindowSettings.leftpanelmode = e.codes[t].data.value,
  //             SDUI.AppSettings.NewUI
  //           )
  //         ) switch (a.WindowSettings.leftpanelmode) {
  //           case Resources.LeftPanelMode.LEFTPANELMODE_SYMBOLSEARCH:
  //           case Resources.LeftPanelMode.LEFTPANELMODE_SYMBOLS:
  //             a.WindowSettings.leftpanelmode = Resources.LeftPanelMode.LEFTPANELMODE_SMARTPANEL
  //         }
  //         break;
  //       case r.SDF_C_EXPORTPATH:
  //         a.isTemplate ||
  //           (
  //             T3Gv.optManager.theContentHeader.exportpath = e.codes[t].data.name,
  //             ConstantData.DocumentContext.PublishUrl = e.codes[t].data.name
  //           );
  //         break;
  //       case r.SDF_C_DEFAULTLIBS:
  //         if (a.isTemplate) break;
  //         T3Gv.optManager.theContentHeader.defaultlibs = e.codes[t].data.name;
  //         break;
  //       case r.SDF_C_ORIGTEMPLATE:
  //         T3Gv.optManager.theContentHeader.originaltemplatename = e.codes[t].data.name;
  //         break;
  //       case r.SDF_C_PRESENTATION_BACKGROUND:
  //       case r.SDF_C_PRESENTATION_NAME:
  //         break;
  //       case r.SDF_C_IMPORT_SOURCE_PATH:
  //         T3Gv.optManager.theContentHeader.importSourcePath = e.codes[t].data.name;
  //         break;
  //       case r.SDF_C_LIBLIST:
  //         if (a.IgnoreHeader) break;
  //         t = SDF.ReadLibraryList(e, t, a, r);
  //         break;
  //       case r.SDF_C_TOOLPALETTES_BEGIN:
  //         if (a.IgnoreHeader) break;
  //         t = SDF.ReadToolPalettes(e, t, a, r);
  //         break;
  //       case r.SDF_C_HEAD_UIINFO:
  //         if (a.IgnoreHeader) break;
  //         a.PVersion,
  //           SDF.SDF_PVERSION804,
  //           a.PVersion < SDF.SDF_PVERSION816 ? (
  //             T3Gv.optManager.theContentHeader.nonworkingdays = ConstantData.Defines.DEFAULT_NONWORKINGDAYS,
  //             T3Gv.optManager.theContentHeader.holidaymask = 0
  //           ) : (
  //             T3Gv.optManager.theContentHeader.nonworkingdays = e.codes[t].data.nonworkingdays,
  //             T3Gv.optManager.theContentHeader.holidaymask = e.codes[t].data.holidaymask
  //           ),
  //           a.shapetoolindex = e.codes[t].data.shapetoolindex,
  //           a.linetoolindex = e.codes[t].data.linetoolindex,
  //           null != e.codes[t].data.swimlaneformat &&
  //           (a.swimlaneformat = e.codes[t].data.swimlaneformat),
  //           null != e.codes[t].data.autocontainer &&
  //           (a.autocontainer = e.codes[t].data.autocontainer),
  //           null != e.codes[t].data.actascontainer &&
  //           (a.actascontainer = e.codes[t].data.actascontainer),
  //           null != e.codes[t].data.swimlanenlanes &&
  //           (a.swimlanenlanes = e.codes[t].data.swimlanenlanes),
  //           null != e.codes[t].data.swimlanenvlanes &&
  //           (a.swimlanenvlanes = e.codes[t].data.swimlanenvlanes),
  //           null != e.codes[t].data.swimlanerotate &&
  //           (a.swimlanerotate = e.codes[t].data.swimlanerotate),
  //           null != e.codes[t].data.swimlanetitle &&
  //           (a.swimlanetitle = e.codes[t].data.swimlanetitle),
  //           null != e.codes[t].data.collapsetools &&
  //           (a.collapsetools = e.codes[t].data.collapsetools);
  //         break;
  //       case r.SDF_C_GUIDE:
  //         if (a.IgnoreHeader) break;
  //         T3Gv.optManager.theContentHeader.smarthelpname = e.codes[t].data.name;
  //         break;
  //       case r.SDF_C_ORGCHARTTABLE:
  //         if (a.IgnoreHeader) break;
  //         (
  //           i = ListManager.WinOrgChartTables.indexOf(e.codes[t].data.name)
  //         ) >= 0 ? T3Gv.optManager.theContentHeader.orgcharttable = ListManager.OrgChartTables[i] : (
  //           i = ListManager.WinMindMapTables.indexOf(e.codes[t].data.name)
  //         ) >= 0 &&
  //         (
  //           T3Gv.optManager.theContentHeader.orgcharttable = ListManager.MindMapTables[i]
  //         ),
  //           i < 0 &&
  //           (
  //             T3Gv.optManager.theContentHeader.orgcharttable = e.codes[t].data.name
  //           );
  //         break;
  //       case r.SDF_C_KANBAN_PC_TITLE:
  //       case r.SDF_C_KANBAN_ASSIGN_TITLE:
  //         break;
  //       case r.SDF_C_DIMFONT:
  //         if (a.IgnoreHeader) break;
  //         T3Gv.optManager.theContentHeader.DimensionFont.fontName = e.codes[t].data.lfFaceName,
  //           T3Gv.optManager.theContentHeader.DimensionFont.fontSize = Math.abs(
  //             Math.round(e.codes[t].data.lfHeight * a.coordScaleFactor * 72 / 100)
  //           ),
  //           T3Gv.optManager.theContentHeader.DimensionFont.face = 0,
  //           T3Gv.optManager.theContentHeader.DimensionFont.face = Utils2.SetFlag(
  //             T3Gv.optManager.theContentHeader.DimensionFont.face,
  //             ConstantData.TextFace.Italic,
  //             e.codes[t].data.lfItalic
  //           ),
  //           T3Gv.optManager.theContentHeader.DimensionFont.face = Utils2.SetFlag(
  //             T3Gv.optManager.theContentHeader.DimensionFont.face,
  //             ConstantData.TextFace.Bold,
  //             e.codes[t].data.lfWeight > 400
  //           ),
  //           e.codes[t].data.lfUnderline &&
  //           (
  //             T3Gv.optManager.theContentHeader.DimensionFont.face = Utils2.SetFlag(
  //               T3Gv.optManager.theContentHeader.DimensionFont.face,
  //               ConstantData.TextFace.Underline,
  //               e.codes[t].data.lfUnderline
  //             )
  //           ),
  //           T3Gv.optManager.theContentHeader.DimensionFontStyle = SDF.LogFontToFontStyle(T3Gv.optManager.theContentHeader.DimensionFont),
  //           0;
  //         break;
  //       default:
  //         e.codes[t].code & SDF.SDF_BEGIN &&
  //           (
  //             t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
  //           )
  //     }
  //     t++
  //   }
  //   return t
  // }



  // static WintoJSShapeTool(e) {
  //   var t = SDUI.WindowsShapeTools[e];
  //   null == t &&
  //     (t = SDUI.WindowsShapeTools[0]),
  //     SDUI.Commands.MainController.Selection.SetShapeTool(t)
  // }

  // static LogFontToFontStyle(e) {

  //   var t = new DefaultStyle(),
  //     a = ConstantData.TextFace;
  //   return t.font = e.fontName,
  //     t.size = SDF.PointSizeToFontSize(e.fontSize),
  //     t.type = e.fontType,
  //     e.face & a.Bold ? t.weight = 'bold' : t.weight = 'normal',
  //     e.face & a.Italic ? t.style = 'italic' : t.style = 'normal',
  //     e.face & a.Underline ? t.decoration = 'underline' : t.decoration = 'none',
  //     t
  // }

  // static ReadPage(e, t) {
  //   null == e.lpapersize ? (
  //     T3Gv.optManager.theContentHeader.Page.papersize.x = SDF.ToSDJSCoords(e.papersize.x, t.coordScaleFactor),
  //     T3Gv.optManager.theContentHeader.Page.papersize.y = SDF.ToSDJSCoords(e.papersize.y, t.coordScaleFactor)
  //   ) : (
  //     T3Gv.optManager.theContentHeader.Page.papersize.x = SDF.ToSDJSCoords(e.lpapersize.x, t.coordScaleFactor),
  //     T3Gv.optManager.theContentHeader.Page.papersize.y = SDF.ToSDJSCoords(e.lpapersize.y, t.coordScaleFactor)
  //   ),
  //     T3Gv.optManager.theContentHeader.Page.margins.left = SDF.ToSDJSCoords(e.margins.left, t.coordScaleFactor),
  //     T3Gv.optManager.theContentHeader.Page.margins.top = SDF.ToSDJSCoords(e.margins.top, t.coordScaleFactor),
  //     T3Gv.optManager.theContentHeader.Page.margins.right = SDF.ToSDJSCoords(e.margins.right, t.coordScaleFactor),
  //     T3Gv.optManager.theContentHeader.Page.margins.bottom = SDF.ToSDJSCoords(e.margins.bottom, t.coordScaleFactor),
  //     T3Gv.optManager.theContentHeader.Page.printflags = e.printflags,
  //     null == e.printscale ? T3Gv.optManager.theContentHeader.Page.printscale = 0 : T3Gv.optManager.theContentHeader.Page.printscale = e.printscale,
  //     T3Gv.optManager.theContentHeader.Page.landscape = e.landscape,
  //     null == e.MinSize ? (
  //       T3Gv.optManager.theContentHeader.Page.minsize.x = T3Gv.optManager.theContentHeader.Page.papersize.x - T3Gv.optManager.theContentHeader.Page.margins.left - T3Gv.optManager.theContentHeader.Page.margins.right,
  //       T3Gv.optManager.theContentHeader.Page.minsize.y = T3Gv.optManager.theContentHeader.Page.papersize.y - T3Gv.optManager.theContentHeader.Page.margins.top - T3Gv.optManager.theContentHeader.Page.margins.bottom
  //     ) : (
  //       T3Gv.optManager.theContentHeader.Page.minsize.x = SDF.ToSDJSCoords(e.MinSize.x, t.coordScaleFactor),
  //       T3Gv.optManager.theContentHeader.Page.minsize.y = SDF.ToSDJSCoords(e.MinSize.y, t.coordScaleFactor)
  //     ),
  //     t.PaperType = SDJS.DocumentHandler.PrintHandler.CalcPaperTypeFromSize(
  //       T3Gv.optManager.theContentHeader.Page.papersize.x,
  //       T3Gv.optManager.theContentHeader.Page.papersize.y
  //     )
  // }

  static ToSDJSCoords(e, t, a) {
    var r;
    return 0 === (r = t * e) &&
      0 !== e &&
      (r = t * e),
      r
  }

  static ToSDJSAngle(e) {
    var t = e % 3600,
      a = (t = t <= 0 ? t > - 1800 ? - t : 3600 + t : 3600 - t) % 3600;
    return a /= 10
  }


  static ToSDJSRect(e, t) {
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
  }

  // static ReadHiliteList(e, t, a, r) {
  //   var i;
  //   for (
  //     t++;
  //     e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_HILITELIST_END;
  //   ) {
  //     if (e.codes[t].code === r.SDF_C_HILITE) (i = e.codes[t].data.path) &&
  //       i.length > 4 &&
  //       '.SDL' === i.slice(- 4) &&
  //       (a.LibraryPathTarget = '\\' + i);
  //     else e.codes[t].code & SDF.SDF_BEGIN &&
  //       (
  //         t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
  //       );
  //     t++
  //   }
  //   return t
  // }




  // static ReadFrame(e, t, a) {
  //   switch (t++, a) {
  //     case FileParser.SDROpCodesByName.SDF_C_LONGTEXT8_END:
  //     case 16458:
  //       a = FileParser.SDROpCodesByName.SDF_C_TEXT_END;
  //       break;
  //     case 16565:
  //     case 16566:
  //       a = FileParser.SDROpCodesByName.SDF_C_END_LINE;
  //       break;
  //     case 16567:
  //       a = FileParser.SDROpCodesByName.SDF_C_END_TEXTF;
  //       break;
  //     case 18550:
  //       a = 17526
  //   }
  //   for (; e.codes[t].code != a;) e.codes[t].code,
  //     e.codes[t].code & SDF.SDF_BEGIN &&
  //     (
  //       t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
  //     ),
  //     t++;
  //   return t
  // }

  // static TextFaceToWeight(e) {
  //   var t = 'normal';
  //   return e & FileParser.TextFace.St_Bold &&
  //     (t = 'bold'),
  //     t
  // }

  // static TextFaceToStyle(e) {
  //   var t = 'normal';
  //   return e & FileParser.TextFace.St_Italic &&
  //     (t = 'italic'),
  //     t
  // }

  // static TextExtraToBaseLine(e) {
  //   var t = 'none';
  //   return e > 100000 &&
  //     (e = FileParser.ToInt32(e)),
  //     e > 0 ? t = 'super' : e < 0 &&
  //       (t = 'sub'),
  //     t
  // }

  // static TextFaceToDecoration(e) {
  //   var t = 'none';
  //   return e & FileParser.TextFace.St_Under ? t = 'underline' : e & FileParser.TextFace.St_Strike &&
  //     (t = 'line-through'),
  //     t
  // }

  static WinColorToHTML(e) {
    return '#' + FileParser.decimalToHex(255 & e, 2, !0) + FileParser.decimalToHex((65280 & e) >>> 8, 2, !0) + FileParser.decimalToHex((16711680 & e) >>> 16, 2, !0)
  }

  static WinColorToAlpha(e) {
    return (255 - ((4278190080 & e) >>> 24)) / 255
  }

  // static ReadSearchResultLibrary(e, t, a, r) {
  //   var i,
  //     n = new Resources.PreviewList;
  //   for (
  //     n.ItemId = e.codes[t].data.name,
  //     n.SearchResults = !0,
  //     n.ContentType = Resources.PreviewType.SymbolLibrary,
  //     n.ListContentType = Resources.PreviewType.Symbol,
  //     n.ContentCount = 0,
  //     a.SearchLibs.push(n),
  //     t++;
  //     e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_SEARCHLIB_END;
  //   ) {
  //     switch (e.codes[t].code) {
  //       case r.SDF_C_SEARCHLIB_NAME:
  //         n.ContentTitle = e.codes[t].data.name;
  //         break;
  //       case r.SDF_C_SEARCHLIBSYMBOL_ID:
  //         (i = new Resources.ContentPreviewItem).ItemId = e.codes[t].data.name,
  //           i.ContentImageUrl = Constants.FilePath_CMSRoot + 'symbols/BTN/' + i.ItemId + '.png',
  //           i.ContentType = Resources.PreviewType.Symbol,
  //           n.ContentCount++,
  //           n.Items.push(i);
  //         break;
  //       case r.SDF_C_SEARCHLIBSYMBOL_NAME:
  //         i &&
  //           (i.ContentTitle = e.codes[t].data.name)
  //     }
  //     t++
  //   }
  //   return t
  // }

  // static ReadLibraryList(e, t, a, r) {
  //   var i,
  //     n = - 1,
  //     o = - 1;
  //   for (
  //     T3Gv.optManager.theContentHeader.lp_list.lib.length = 0,
  //     T3Gv.optManager.theContentHeader.lp_list.selected = e.codes[t].data.selected,
  //     a.SearchResults = [],
  //     a.SearchLibs = [],
  //     t++;
  //     e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_LIBLIST_END;
  //   ) {
  //     switch (e.codes[t].code) {
  //       case r.SDF_C_CURRENTSYMBOL_ID:
  //         a.CurrentSymbol = e.codes[t].data.name;
  //         break;
  //       case r.SDF_C_LIBLIST_PATH:
  //         T3Gv.optManager.theContentHeader.lp_list.lib.push(new ListManager.LibListEntry(e.codes[t].data.name)),
  //           n++;
  //         break;
  //       case r.SDF_C_LIBLIST_GUID:
  //         T3Gv.optManager.theContentHeader.lp_list.lib.push(new ListManager.LibListEntry('')),
  //           n++,
  //           T3Gv.optManager.theContentHeader.lp_list.lib[n].libGuid = e.codes[t].data.name;
  //         break;
  //       case r.SDF_C_LIBLIST_ENTRY:
  //         n >= 0 &&
  //           (
  //             T3Gv.optManager.theContentHeader.lp_list.lib[n].scrollpos = e.codes[t].data.value
  //           );
  //         break;
  //       case r.SDF_C_LIB_COLLAPSED:
  //         n >= 0 &&
  //           (
  //             T3Gv.optManager.theContentHeader.lp_list.lib[n].Collapsed = e.codes[t].data.value
  //           );
  //         break;
  //       case r.SDF_C_SEARCHLIB:
  //         i = e.codes[t].data.name,
  //           t = SDF.ReadSearchResultLibrary(e, t, a, r),
  //           T3Gv.optManager.theContentHeader.lp_list.lib.push(new ListManager.LibListEntry('')),
  //           n++,
  //           T3Gv.optManager.theContentHeader.lp_list.lib[n].SearchResults = !0,
  //           T3Gv.optManager.theContentHeader.lp_list.lib[n].libGuid = i;
  //         break;
  //       case r.SDF_C_LIBLIST_SEARCH_RESULT_ID:
  //         a.SearchResults.push(new ListManager.LibListEntry(e.codes[t].data.name)),
  //           o++;
  //         break;
  //       case r.SDF_C_SEARCHLIB_COLLAPSED:
  //         o >= 0 &&
  //           (a.SearchResults[o].Collapsed = e.codes[t].data.value);
  //         break;
  //       case r.SDF_C_SEARCHLIB_HIDDEN:
  //         o >= 0 &&
  //           (a.SearchResults[o].Hidden = e.codes[t].data.value);
  //         break;
  //       default:
  //         e.codes[t].code & SDF.SDF_BEGIN &&
  //           (
  //             t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
  //           )
  //     }
  //     t++
  //   }
  //   return t
  // }

  // static ReadDocumentTheme(e, t, a, r) {
  //   var i = a.sdp,
  //     n = new Resources.SDTheme;
  //   t = SDF.ReadTheme(n, e, t, a, r);
  //   Resources.FindTheme(n.Name);
  //   return i.CurrentTheme = n.Name,
  //     t
  // }

  // static ReadTheme(e, t, a, r, i) {
  //   for (
  //     e.Name = t.codes[a].data.name,
  //     e.EffectStyleIndex = t.codes[a].data.EffectStyleIndex,
  //     a++;
  //     t.codes[a].code != i.SDF_C_END_THEME12;
  //   ) {
  //     switch (t.codes[a].code) {
  //       case i.SDF_C_THEME_CAT:
  //         e.Category = t.codes[a].data.name;
  //         break;
  //       case i.SDF_C_THEME_COLOR:
  //         e.Colors.push(SDF.WinColorToHTML(t.codes[a].data.color));
  //         break;
  //       case i.SDF_C_THEME_TEXTURE:
  //         t.codes[a].data.name;
  //         break;
  //       case i.SDF_C_BEGIN_STYLELIST:
  //         a = SDF.ReadThemeStyleList(e, t, a, r, i);
  //         break;
  //       case i.SDF_C_BEGIN_OUTSIDELIST:
  //         a = SDF.ReadThemeOutsideList(e, t, a, r, i);
  //         break;
  //       case i.SDF_C_BEGIN_INSIDELIST:
  //         a = SDF.ReadThemeInsideList(e, t, a, r, i);
  //         break;
  //       case i.SDF_C_BEGIN_GRADIENTLIST:
  //         a = SDF.ReadThemeGradientList(e, t, a, r, i);
  //         break;
  //       case i.SDF_C_BEGIN_FILL:
  //         a = SDF.ReadSDFill(e.Background, t, a, r, i);
  //         break;
  //       case i.SDF_C_RECENTSTYLES:
  //         break;
  //       default:
  //         t.codes[a].code & SDF.SDF_BEGIN &&
  //           (
  //             a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
  //           )
  //     }
  //     a++
  //   }
  //   return a
  // }

  // static ReadThemeOutsideList(e, t, a, r, i) {
  //   var n;
  //   for (a++; t.codes[a].code != i.SDF_C_END_OUTSIDELIST;) {
  //     if (t.codes[a].code === i.SDF_C_OUTSIDE) n = SDF.ReadOutSide(t.codes[a].data, r.IsVisio),
  //       e.OutsideEffects.push(n);
  //     else t.codes[a].code & SDF.SDF_BEGIN &&
  //       (
  //         a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
  //       );
  //     a++
  //   }
  //   return a
  // }




  static ReadOutSide(e, t) {
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
  }

  // static ReadThemeInsideList(e, t, a, r, i) {
  //   var n;
  //   for (a++; t.codes[a].code != i.SDF_C_END_INSIDELIST;) {
  //     if (t.codes[a].code === i.SDF_C_INSIDEEFFECT) n = SDF.ReadInside(t.codes[a].data),
  //       e.InsideEffects.push(n);
  //     else t.codes[a].code & SDF.SDF_BEGIN &&
  //       (
  //         a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
  //       );
  //     a++
  //   }
  //   return a
  // }

  // static ReadInside(e) {
  //   var t = new Resources.InsideEffectData;
  //   return t.Effect = e.effect,
  //     t.EffectColor = SDF.WinColorToHTML(e.effectcolor),
  //     t.LParam = e.lparam,
  //     t.WParam = e.wparam,
  //     t
  // }
  // static ReadThemeGradientList(e, t, a, r, i) {
  //   var n;
  //   for (a++; t.codes[a].code != i.SDF_C_END_GRADIENTLIST;) {
  //     if (t.codes[a].code === i.SDF_C_THEMEGRADIENT) (n = new Resources.GradientData).Color = SDF.WinColorToHTML(t.codes[a].data.color),
  //       n.EndColor = SDF.WinColorToHTML(t.codes[a].data.endcolor),
  //       n.GradientFlags = t.codes[a].data.gradientflags,
  //       e.Gradients.push(n);
  //     else t.codes[a].code & SDF.SDF_BEGIN &&
  //       (
  //         a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
  //       );
  //     a++
  //   }
  //   return a
  // }

  static ReadSDFill(e, t, a, r, i) {
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
  }

  // static ReadTextureList(e, t, a, r, i) {
  //   console.log('static      ReadTextureList ===========', e, t, a, r, i)
  //   var n,
  //     o = window.URL ||
  //       window.webkitURL;
  //   for (t++; e.codes[t].code != r.SDF_O_TEXTURELIST_END;) {
  //     switch (e.codes[t].code) {
  //       case r.SDF_O_TEXTURE:
  //         var s = new Resources.SDTexture;
  //         s.TextureScale = new Resources.TextureScale,
  //           s.dim.x = SDF.ToSDJSCoords(e.codes[t].data.dim.x, a.coordScaleFactor),
  //           s.dim.y = SDF.ToSDJSCoords(e.codes[t].data.dim.y, a.coordScaleFactor),
  //           s.mr = e.codes[t].data.mr,
  //           s.imagetype = e.codes[t].data.imagetype,
  //           s.flags = e.codes[t].data.flags,
  //           a.TextureList.Textures.push(s);
  //         break;
  //       case r.SDF_O_TEXTUREEXTRA:
  //         s.categoryindex = e.codes[t].data.categoryindex,
  //           s.TextureScale.Units = e.codes[t].data.units,
  //           s.TextureScale.Scale = e.codes[t].data.scale,
  //           s.TextureScale.RWidth = e.codes[t].data.rwidth,
  //           s.TextureScale.AlignmentScalar = e.codes[t].data.alignment,
  //           s.TextureScale.Flags = e.codes[t].data.flags;
  //         break;
  //       case r.SDF_O_TEXTURENAME:
  //         s.name = e.codes[t].data.name,
  //           i ||
  //           (
  //             (
  //               n = T3Gv.optManager.GetStdTextureCategory(a.TextureList.Categories[s.categoryindex])
  //             ) >= 0 ? s.index = T3Gv.optManager.GetStdTextureIndex(n, s.name) : n = T3Gv.optManager.TextureList.Categories.push(a.TextureList.Categories[s.categoryindex]) - 1,
  //             s.categoryindex = n
  //           );
  //         break;
  //       case r.SDF_O_TEXTURECATNAME:
  //         a.TextureList.Categories.push(e.codes[t].data.name);
  //         break;
  //       case r.SDF_O_TEXTUREDATA:
  //         s.ImageURL = e.codes[t].data.URL,
  //           s.BlobBytes = e.codes[t].data.BlobBytes,
  //           s.index < 0 ? (
  //             s.flags = 0,
  //             s.filename = '',
  //             s.index = T3Gv.optManager.TextureList.Textures.push(s) - 1
  //           ) : i ||
  //           o &&
  //           o.revokeObjectURL &&
  //           (o.revokeObjectURL(s.ImageURL), s.ImageURL = '');
  //         break;
  //       default:
  //         e.codes[t].code & SDF.SDF_BEGIN &&
  //           (
  //             t = SDF.ReadFrame(e, t, e.codes[t].code & SDF.SDF_MASK | SDF.SDF_END)
  //           )
  //     }
  //     t++
  //   }
  //   return t
  // }

  // static WinLinePatternToJS(e, t) {
  //   var a = Resources.Windows_LinePatterns;
  //   switch (t) {
  //     case a.SEP_None:
  //       e.Thickness = 0,
  //         e.LinePattern = 0;
  //       break;
  //     case a.SEP_Dotted:
  //     case a.SEP_Dashed:
  //     case a.SEP_DDashed:
  //     case a.SEP_DDDashed:
  //       e.LinePattern = Resources.LinePatternData[t - a.SEP_Solid];
  //       break;
  //     default:
  //       e.LinePattern = 0
  //   }
  // }

  static ReadSDLine(e, t, a, r, i) {
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
  }



  static ReadPaint(e, t, a, r, i) {
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
        e.GradientFlags = T3Gv.optManager.SD_AddRichGradient(r.RichGradients, n)
      ),
      a
  }

  static ReadSDTxf(e, t, a, r, i) {
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
    return e.FontId = -1,
      a
  }

  static ReadStyle(e, t, a, r, i) {
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

  // static ReadThemeStyleList(e, t, a, r, i) {
  //   var n,
  //     o,
  //     s = - 1;
  //   for (a++; t.codes[a].code != i.SDF_C_END_STYLELIST;) {
  //     switch (t.codes[a].code) {
  //       case i.SDF_C_BEGIN_STYLE:
  //         n = new QuickStyle(),
  //           a = SDF.ReadStyle(n, t, a, r, i),
  //           e.Styles.push(n),
  //           s++;
  //         break;
  //       case i.SDF_C_BEGIN_LINE:
  //         o = new Resources.LineData,
  //           a = SDF.ReadSDLine(o, t, a, r, i),
  //           s >= 0 &&
  //           (e.Styles[s].Line = o);
  //         break;
  //       default:
  //         t.codes[a].code & SDF.SDF_BEGIN &&
  //           (
  //             a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
  //           )
  //     }
  //     a++
  //   }
  //   return a
  // }

  static ReadStyleList(e, t, a, r, i) {
    var n;
    for (a++; t.codes[a].code != i.SDF_C_END_STYLELIST;) {
      if (t.codes[a].code === i.SDF_C_BEGIN_STYLE) n = new QuickStyle(),
        a = SDF.ReadStyle(n, t, a, r, i),
        e.push(n);
      else t.codes[a].code & SDF.SDF_BEGIN &&
        (
          a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
        );
      a++
    }
    return a
  }

  static FixDefaults(e, t) {
    var a = ConstantData.SessionFlags;
    t.isSymbol ||
      'Genograms' === T3Gv.optManager.theContentHeader.smartpanelname &&
      (
        e.flags = Utils2.SetFlag(e.flags, a.SEDS_LLink, !0),
        e.flags = Utils2.SetFlag(e.flags, a.SEDS_HideConnExpand, !0)
      )
  }

  static SetCurvatureDefaults(e, t) {
    !t.isSymbol &&
      (t.isTemplate || SDUI.Builder) &&
      t.PVersion < SDF.SDF_PVERSION864 &&
      (
        e.def.curveparam = rrectparam = 100 * ConstantData.Defines.DefFixedRRect,
        e.def.rrectparam = rrectparam = ConstantData.Defines.DefFixedRRect
      )
  }

  static ReadDraw(e, t, a, r, i) {

    console.log('static      ReadDraw ===========', e, t, a, r, i)
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
            n = new QuickStyle(),
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
          a.rulerConfig = new RulerConfig(),
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
  }



  static W32JustToJS(e, t) {
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
  }

  // static W32BulletToJS(e) {
  //   var t = 'none';
  //   switch (e) {
  //     case 1:
  //       t = 'hround';
  //       break;
  //     case 2:
  //       t = 'sround';
  //       break;
  //     case 3:
  //       t = 'hsquare';
  //       break;
  //     case 4:
  //       t = 'ssquare';
  //       break;
  //     case 5:
  //       t = 'diamond';
  //       break;
  //     case 6:
  //       t = 'chevron';
  //       break;
  //     case 7:
  //       t = 'check';
  //       break;
  //     case 8:
  //       t = 'plus'
  //   }
  //   return t
  // }

  static W32JustToTextAlign(e, t) {
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
  }

  // static TextAlignToJust(e) {
  //   var t = {
  //     just: 'center',
  //     vjust: 'middle'
  //   };
  //   switch (e) {
  //     case ConstantData.TextAlign.LEFT:
  //       t.just = 'left';
  //       break;
  //     case ConstantData.TextAlign.RIGHT:
  //       t.just = 'right';
  //       break;
  //     case ConstantData.TextAlign.TOPLEFT:
  //       t.just = 'left',
  //         t.vjust = 'top';
  //       break;
  //     case ConstantData.TextAlign.TOPCENTER:
  //       t.vjust = 'top';
  //       break;
  //     case ConstantData.TextAlign.TOPRIGHT:
  //       t.just = 'right',
  //         t.vjust = 'top';
  //       break;
  //     case ConstantData.TextAlign.BOTTOMLEFT:
  //       t.just = 'left',
  //         t.vjust = 'bottom';
  //       break;
  //     case ConstantData.TextAlign.BOTTOMCENTER:
  //       t.vjust = 'bottom';
  //       break;
  //     case ConstantData.TextAlign.BOTTOMRIGHT:
  //       t.just = 'right',
  //         t.vjust = 'bottom'
  //   }
  //   return t
  // }

  // static ReadDrawExtra(e, t, a) {
  //   e.def.tmargins.left = SDF.ToSDJSCoords(t.tmargins.left, a.coordScaleFactor),
  //     e.def.tmargins.top = SDF.ToSDJSCoords(t.tmargins.top, a.coordScaleFactor),
  //     e.def.tmargins.right = SDF.ToSDJSCoords(t.tmargins.right, a.coordScaleFactor),
  //     e.def.tmargins.bottom = SDF.ToSDJSCoords(t.tmargins.bottom, a.coordScaleFactor),
  //     e.def.textgrow = t.textgrow,
  //     e.def.textflags = t.textflags,
  //     e.def.fsize_min = t.fsize_min
  // }

  // static ReadDraw7(e, t, a, r) {
  //   var i = Resources.Windows_LinePatterns;
  //   switch (
  //   e.hopstyle = a.hopstyle,
  //   e.hopdim.x = SDF.ToSDJSCoords(a.hopdim.x, r.coordScaleFactor),
  //   e.hopdim.y = SDF.ToSDJSCoords(a.hopdim.y, r.coordScaleFactor),
  //   e.dimensions = a.dimensions,
  //   e.shapedimensions = a.shapedimensions,
  //   null != a.activelayer &&
  //   (t.activelayer = a.activelayer),
  //   a.lbpatindex
  //   ) {
  //     case i.SEP_FilledLine:
  //     case i.SEP_DoubleLine:
  //       e.def.style.Line.Thickness = SDF.ToSDJSCoords(2 * a.dbthick, r.coordScaleFactor),
  //         e.def.style.Line.LinePattern = 0
  //   }
  // }

  static ReadDrawSession(e, t, a, r) {
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
  }

  // static ReadDrawSession6(e, t, a) {
  //   var r,
  //     i,
  //     n,
  //     o,
  //     s,
  //     l;
  //   switch (
  //   r = t.ldupdisp ? t.ldupdisp : t.dupdisp,
  //   i = t.ldim ? t.ldim : t.dim,
  //   e.dim.x = SDF.ToSDJSCoords(i.x, a.coordScaleFactor),
  //   e.dim.y = SDF.ToSDJSCoords(i.y, a.coordScaleFactor),
  //   e.flags = t.flags,
  //   e.tselect = t.tselect,
  //   e.dupdisp.x = SDF.ToSDJSCoords(r.x, a.coordScaleFactor),
  //   e.dupdisp.y = SDF.ToSDJSCoords(r.y, a.coordScaleFactor),
  //   e.def.style.Border.Paint.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_BorderIndex]),
  //   e.def.style.Line.Paint.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_LineIndex]),
  //   t.colors[FileParser.v6ColorIndexes.Std_FillIndex] == ConstantData.Colors.Color_Trans ? e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT : (
  //     e.def.style.Fill.Paint.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_FillIndex]),
  //     e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID
  //   ),
  //   e.def.style.OutsideEffect.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_ShadowIndex]),
  //   e.def.style.Text.Paint.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_TextIndex]),
  //   t.colors[FileParser.v6ColorIndexes.Std_BackIndex] == ConstantData.Colors.Color_Trans ? e.background.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT : (
  //     e.background.Paint.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_BackIndex]),
  //     e.background.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID
  //   ),
  //   n = SDF.ToSDJSCoords(t.shaddisp.x, a.coordScaleFactor) / 100,
  //   o = SDF.ToSDJSCoords(t.shaddisp.y, a.coordScaleFactor) / 100,
  //   t.shadowstyle
  //   ) {
  //     case FileParser.v6ShadowStyles.SED_Sh_Drop:
  //     case FileParser.v6ShadowStyles.SED_Sh_FDrop:
  //     case FileParser.v6ShadowStyles.SED_Sh_Cont:
  //       n = 0.2,
  //         o = 0.2,
  //         e.def.style.OutsideEffect.OutsideType = FileParser.OutEffect.SDOUT_EFFECT_DROP,
  //         e.def.style.OutsideEffect.OutsideExtent_Left = 0,
  //         e.def.style.OutsideEffect.OutsideExtent_Top = 0,
  //         e.def.style.OutsideEffect.OutsideExtent_Right = 0,
  //         e.def.style.OutsideEffect.OutsideExtent_Bottom = 0,
  //         t.shaddisp.x < 0 ? e.def.style.OutsideEffect.OutsideExtent_Left = - n : t.shaddisp.x > 0 &&
  //           (e.def.style.OutsideEffect.OutsideExtent_Right = n),
  //         t.shaddisp.y < 0 ? e.def.style.OutsideEffect.OutsideExtent_Top = - o : t.shaddisp.y > 0 &&
  //           (e.def.style.OutsideEffect.OutsideExtent_Bottom = o),
  //         e.def.style.OutsideEffect.Color = SDF.WinColorToHTML(t.colors[FileParser.v6ColorIndexes.Std_ShadowIndex])
  //   }
  //   return e.d_sarrow = t.d_sarrow & FileParser.ArrowMasks.ARROW_T_MASK,
  //     e.d_sarrowdisp = !!(t.d_sarrow & FileParser.ArrowMasks.ARROW_DISP),
  //     e.d_arrowsize = t.d_arrowsize,
  //     e.d_earrow = t.d_earrow & FileParser.ArrowMasks.ARROW_T_MASK,
  //     e.d_earrowdisp = !!(t.d_earrow & FileParser.ArrowMasks.ARROW_DISP),
  //     e.def.style.Line.Thickness = SDF.ToSDJSCoords(t.lbord, a.coordScaleFactor),
  //     0 === e.def.style.Line.Thickness &&
  //     t.lbord &&
  //     (e.def.style.Line.Thickness = 1),
  //     e.def.style.Border.Thickness = SDF.ToSDJSCoords(t.bord, a.coordScaleFactor),
  //     0 === e.def.style.Border.Thickness &&
  //     t.bord &&
  //     (e.def.style.Border.Thickness = 1),
  //     e.def.style.Text.FontSize = t.fsize,
  //     e.def.style.Text.Face = t.face,
  //     e.def.style.Text.FontId = -1,
  //     e.def.just = SDF.W32JustToJS(t.just, !1),
  //     e.def.vjust = SDF.W32JustToJS(t.vjust, !0),
  //     l = void 0 === t.d_fpatindex ? FileParser.v6FillTypes.SEOpaqueIndex : t.d_fpatindex,
  //     s = t.colors[FileParser.v6ColorIndexes.Std_FillIndex],
  //     void 0 === t.ecolor ? e.def.style.Fill.Paint.EndColor = ConstantData.Colors.Color_White : e.def.style.Fill.Paint.EndColor = SDF.WinColorToHTML(t.ecolor),
  //     l === FileParser.v6FillTypes.SEHollowIndex ? (
  //       e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
  //       t.gradientflags &&
  //       (
  //         e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_GRADIENT,
  //         e.def.style.Fill.Paint.GradientFlags = t.gradientflags
  //       )
  //     ) : l == FileParser.v6FillTypes.SEOpaqueIndex &&
  //     (
  //       t.gradientflags ? (
  //         e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_GRADIENT,
  //         e.def.style.Fill.Paint.GradientFlags = t.gradientflags
  //       ) : s === ConstantData.Colors.Color_Trans ? (
  //         e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
  //         e.def.style.Fill.Paint.Color = ConstantData.Colors.Color_White
  //       ) : e.def.style.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID
  //     ),
  //     e
  // }

  static SetDefaults(e, t) {
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
  }

  static DefaultText(e, t) {
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
  }

  static ReadRulers(e, t) {
    t.rulerConfig = new RulerConfig(),
      t.rulerConfig.useInches = e.inches,
      t.rulerConfig.major = SDF.ToSDJSCoords(e.Major, t.coordScaleFactor),
      t.PVersion < SDF.SDF_POVERSION801 &&
      (t.rulerConfig.major *= 6),
      t.rulerConfig.majorScale = e.MajorScale,
      t.rulerConfig.units = e.units,
      t.rulerConfig.nTics = e.MinorDenom,
      t.rulerConfig.nMid = 5 != e.MinorDenom ? 1 : 0,
      t.rulerConfig.nGrid = e.MinorDenom,
      null != e.dp &&
      (t.rulerConfig.dp = e.dp),
      null != e.originx ? (
        t.rulerConfig.originx = e.originx,
        t.rulerConfig.originy = e.originy
      ) : (t.rulerConfig.originx = 0, t.rulerConfig.originy = 0),
      t.rulerConfig.showpixels = !1,
      e.show ? t.rulerConfig.show = !0 : t.rulerConfig.show = !1,
      e.showpixels &&
      (t.rulerConfig.showpixels = !0),
      e.fractionaldenominator ? t.rulerConfig.fractionaldenominator = e.fractionaldenominator : t.rulerConfig.fractionaldenominator = T3Gv.docUtil.rulerConfig.fractionaldenominator
  }

  // static ReadLineDrawList(e, t) {
  //   var a;
  //   6 === e.n &&
  //     (
  //       t.sdp.RecentSymbols = [],
  //       a = new RecentSymbol(e.symbol1, '', !1),
  //       t.sdp.RecentSymbols.push(a),
  //       a = new RecentSymbol(e.symbol2, '', !1),
  //       t.sdp.RecentSymbols.push(a),
  //       a = new RecentSymbol(e.symbol3, '', !1),
  //       t.sdp.RecentSymbols.push(a),
  //       a = new RecentSymbol(e.symbol4, '', !1),
  //       t.sdp.RecentSymbols.push(a),
  //       a = new RecentSymbol(e.symbol5, '', !1),
  //       t.sdp.RecentSymbols.push(a),
  //       a = new RecentSymbol(e.symbol6, '', !1),
  //       t.sdp.RecentSymbols.push(a)
  //     )
  // }

  // static ReadLinkList(e, t) {
  //   var a,
  //     r,
  //     i,
  //     n;
  //   for (a = t.n, r = 0; r < a; r++) null == t.links[r].cellid ? n = null : (
  //     (n = t.links[r].cellid) === ConstantData.Defines.SED_DNULL &&
  //     (n = null),
  //     4294967295 == n &&
  //     (n = null)
  //   ),
  //     (
  //       i = new Link(t.links[r].targetid, t.links[r].hookid, n)
  //     ).flags = t.links[r].flags,
  //     e.push(i)
  // }

  static ObjectIsGroup(e, t, a, r, i) {
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
  }

  static ObjectIsSymbol(e, t, a, r, i) {
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
  }

  static ObjectIsConnectorTextLabel(e, t, a, r) {
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
  }

  static ObjectIsExternalTextLabel(e, t, a, r, i) {
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
              var u = T3Gv.optManager.GetObjectPtr(i.IDMap[s.objid], !1);
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
  }

  // static GetLineText(e, t, a, r) {
  //   var i,
  //     n,
  //     o = - 1;
  //   for (n = e.lineswithtext.length, i = 0; i < n; i++) if (t === e.lineswithtext[i].x && (!a || a === e.lineswithtext[i].z)) return o = e.lineswithtext[i].y,
  //     r &&
  //     (
  //       r.TextGrow = e.lineswithtext[i].TextGrow,
  //       r.TextWrapWidth = e.lineswithtext[i].TextWrapWidth,
  //       r.TextAlign = e.lineswithtext[i].TextAlign,
  //       r.just = e.lineswithtext[i].just,
  //       r.vjust = e.lineswithtext[i].vjust,
  //       r.Paint = e.lineswithtext[i].Paint
  //     ),
  //     e.lineswithtext.splice(i, 1),
  //     o;
  //   return - 1
  // }

  // static GetObjectParent(e, t, a) {
  //   var r,
  //     i,
  //     n,
  //     o,
  //     s,
  //     l;
  //   for (r = t.length, i = 0; i < r; i++) {
  //     if (a === (o = t[i])) return e;
  //     if (
  //       (n = T3Gv.optManager.GetObjectPtr(o, !1)) &&
  //       n.ShapeType === ConstantData.ShapeType.GROUPSYMBOL &&
  //       (
  //         l = e < 0 ? o : e,
  //         (s = SDF.GetObjectParent(l, n.ShapesInGroup, a)) >= 0
  //       )
  //     ) return s
  //   }
  //   return - 1
  // }

  // static GetSVGFragmentFromCache(e) {
  //   var t,
  //     a,
  //     r;
  //   for (a = SDF.SVGFragments.length, t = 0; t < a; t++) if (e === (r = SDF.SVGFragments[t]).EMFHash) return r;
  //   return null
  // }

  // static GetSVGFragment(e, t, a) {
  //   var r = function (e, r) {
  //     var i,
  //       n,
  //       o,
  //       s,
  //       l,
  //       S,
  //       c,
  //       u,
  //       p = [],
  //       d = [],
  //       D = [],
  //       g = [];
  //     if (e && 400 != r && 404 != r) {
  //       if (
  //         i = Utils2.arrayBufferToString(e),
  //         l = JSON.parse(i),
  //         t.InitialGroupBounds.width = l.width,
  //         t.InitialGroupBounds.height = l.height,
  //         t.SVGFragment = Utils1.DeepCopy(l.SVGFragment),
  //         null == t.BlockID
  //       ) {
  //         var h = Utils1.DeepCopy(t);
  //         SDUI.Commands.MainController.Symbols.StoreLMObject(a, h)
  //       } (S = SDF.GetSVGFragmentFromCache(a)) ? (p = S.objectIDs, S.fragment = l) : p.push(t.BlockID)
  //     } else l = {
  //       ID: a,
  //       width: t.Frame.width,
  //       height: t.Frame.height,
  //       SVGFragment: '<g width="' + t.Frame.width + '" height="' + t.Frame.height + '" transform="scale(1,1) translate(0,0)" style="-webkit-user-select: none; touch-action: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><g width="' + t.Frame.width + '" height="' + t.Frame.height + '" transform="scale(1,1) translate(0,0)" fill="none" stroke-opacity="1"><rect fill="#FFEEEE" stroke-opacity="1" stroke="#FF0000" stroke-width="1" width="' + t.Frame.width + '" height="' + t.Frame.height + '"/><path d="M0,0 L' + t.Frame.width + ',' + t.Frame.height + '" stroke="#FF0000" stroke-width="1" stroke-dasharray="none"/><path d="M0,' + t.Frame.height + ' L' + t.Frame.width + ',0" stroke="#FF0000" stroke-width="1" stroke-dasharray="none"/></g></g>'
  //     },
  //       t.InitialGroupBounds.width = l.width,
  //       t.InitialGroupBounds.height = l.height;
  //     for (o = p.length, n = 0; n < o; n++) if (s = p[n], null != (t = T3Gv.optManager.GetObjectPtr(s, !1))) {
  //       t.SVGFragment = Utils1.DeepCopy(l.SVGFragment),
  //         t.InitialGroupBounds.width = l.width,
  //         t.InitialGroupBounds.height = l.height,
  //         0 === t.StyleRecord.Line.Thickness &&
  //         (t.StyleRecord.Line.Thickness = 1);
  //       var m = T3Gv.optManager.GetAllBlockCopies(s);
  //       for (c = m.length, u = 0; u < c; u++) null == m[u].Data.SVGFragment &&
  //         (
  //           m[u].Data.SVGFragment = Utils1.DeepCopy(l.SVGFragment),
  //           0 === m[u].Data.StyleRecord.Line.Thickness &&
  //           (m[u].Data.StyleRecord.Line.Thickness = 1)
  //         );
  //       if (T3Gv.optManager.svgObjectLayer.FindElement(s)) {
  //         var C,
  //           y = T3Gv.optManager.VisibleZList(),
  //           f = T3Gv.optManager.ActiveVisibleZList(),
  //           L = (y.length, y.indexOf(s)),
  //           I = f.indexOf(s);
  //         L < 0 ? (C = SDF.GetObjectParent(- 1, y, s)) >= 0 &&
  //           (L = y.indexOf(C), I = f.indexOf(C)) : C = y[L],
  //           - 1 != L &&
  //           (
  //             T3Gv.optManager.currentModalOperation == ListManager.ModalOperations.STAMP ||
  //               T3Gv.optManager.currentModalOperation == ListManager.ModalOperations.DRAGDROP ? (
  //               T3Gv.optManager.AddSVGObject(L, C, !0, !1),
  //               y[L] == T3Gv.optManager.actionStoredObjectId &&
  //               (
  //                 T3Gv.optManager.actionSvgObject = T3Gv.optManager.svgObjectLayer.GetElementByID(T3Gv.optManager.actionStoredObjectId)
  //               )
  //             ) : d.indexOf(C) < 0 &&
  //             (d.push(C), D.push(L), g.push(I >= 0))
  //           )
  //       }
  //     }
  //     for (c = d.length, u = 0; u < c; u++) T3Gv.optManager.AddSVGObject(D[u], d[u], !0, g[u]);
  //     S &&
  //       (S.objectIDs = []),
  //       SDF.FragmentLoad_RefCount = Math.max(0, SDF.FragmentLoad_RefCount - 1)
  //   },
  //     i = SDF.GetSVGFragmentFromCache(a);
  //   if (i) i.fragment ? (
  //     t.SVGFragment = Utils1.DeepCopy(i.fragment.SVGFragment),
  //     t.InitialGroupBounds.width = i.fragment.width,
  //     t.InitialGroupBounds.height = i.fragment.height,
  //     0 === t.StyleRecord.Line.Thickness &&
  //     (t.StyleRecord.Line.Thickness = 1)
  //   ) : i.objectIDs.push(t.BlockID);
  //   else {
  //     Constants.FilePath_FindHashSVGColor,
  //       t.EMFHash;
  //     if (!1 === e.isSymbol) {
  //       var n = new SDF.SVGFragmentRecord(a, null);
  //       n.objectIDs.push(t.BlockID),
  //         SDF.SVGFragments.push(n)
  //     }
  //     if (!1 === e.AllowAddEMFHash) SDF.FragmentLoad_RefCount++,
  //       SDUI.CMSContent.GetSymbolSVGColorByHash(SDUI.AppSettings.ContentSource, t.EMFHash, r);
  //     else {
  //       var o = SDUI.CMSContent.GetSymbolSVGColorByHash(SDUI.AppSettings.ContentSource, t.EMFHash);
  //       o &&
  //         (SDF.FragmentLoad_RefCount++, r(o, 0))
  //     }
  //   }
  // }

  // static GetPNG(e, t, a) {
  //   var r = function (e, r) {
  //     var i,
  //       n,
  //       o,
  //       s,
  //       l,
  //       S = [];
  //     if (e && 400 != r && 404 != r) {
  //       for (
  //         i = new Uint8Array(e),
  //         (n = SDF.GetSVGFragmentFromCache(a)) ? (S = n.objectIDs, n.fragment = i) : S.push(t.BlockID),
  //         s = S.length,
  //         o = 0;
  //         o < s;
  //         o++
  //       ) {
  //         l = S[o],
  //           (t = T3Gv.optManager.GetObjectPtr(l, !1)).SetBlobBytes(Utils1.DeepCopy(i), FileParser.Image_Dir.dir_png);
  //         var c,
  //           u,
  //           p = T3Gv.optManager.GetAllBlockCopies(l);
  //         for (c = p.length, u = 0; u < c; u++) null == p[u].Data.BlobBytes &&
  //           p[u].Data.BlockID != l &&
  //           p[u].Data.SetBlobBytes(Utils1.DeepCopy(i), FileParser.Image_Dir.dir_png)
  //       }
  //       n &&
  //         (n.objectIDs = []),
  //         SDF.FragmentLoad_RefCount = Math.max(0, SDF.FragmentLoad_RefCount - 1)
  //     } else SDF.FragmentLoad_RefCount = Math.max(0, SDF.FragmentLoad_RefCount - 1)
  //   },
  //     i = SDF.GetSVGFragmentFromCache(a);
  //   if (i) i.fragment ? t.SetBlobBytes(
  //     Utils1.DeepCopy(i.fragment),
  //     FileParser.Image_Dir.dir_png
  //   ) : i.objectIDs.push(t.BlockID);
  //   else {
  //     Constants.FilePath_HashPNG,
  //       t.EMFHash;
  //     if (!1 === e.isSymbol) {
  //       var n = new SDF.SVGFragmentRecord(a, null);
  //       n.objectIDs.push(t.BlockID),
  //         SDF.SVGFragments.push(n)
  //     }
  //     if (!1 === e.AllowAddEMFHash) SDF.FragmentLoad_RefCount++,
  //       SDUI.CMSContent.GetSymbolPNGByHash(SDUI.AppSettings.ContentSource, t.EMFHash, r);
  //     else {
  //       var o = SDUI.CMSContent.GetSymbolPNGByHash(SDUI.AppSettings.ContentSource, t.EMFHash);
  //       o &&
  //         (SDF.FragmentLoad_RefCount++, r(o, 0))
  //     }
  //   }
  // }

  static ReadObject(e, t, a, r, i) {
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

        SDUI.Builder.gInTemplateValidator &&
        SDUI.Builder.gTemplateValidatorReadError(
          'static      ReadObject static      ReadObjectHeader returned a null obj'
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
        var N = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT, n);
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
              (l = T3Gv.optManager.GetObjectPtr(S, !1)) &&
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
        case r.SDF_C_GRAPH:
          h = new ListManager.Graph,
            n.SetGraph(h),
            t = SDF.ReadGraph(h, e, t, a, r, r.SDF_C_GRAPH_END);
          break;
        case r.SDF_C_EXPANDEDVIEW:
          R = T3Gv.objectStore.CreateBlock(
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
  }

  static SetCurvature(e, t, a) {
    !e.isSymbol &&
      (e.isTemplate || SDUI.Builder) &&
      e.PVersion < SDF.SDF_PVERSION864 &&
      (
        a ? t.curveparam = 100 * ConstantData.Defines.DefFixedRRect : (
          t.shapeparam = ConstantData.Defines.DefFixedRRect,
          t.moreflags = Utils2.SetFlag(t.moreflags, ConstantData.ObjMoreFlags.SED_MF_FixedRR, !0)
        )
      )
  }

  static DefaultObject(e, t) {
    t.StyleRecord = new QuickStyle(),
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
  }

  // static ReadHook(e, t, a) {
  //   var r,
  //     i,
  //     n = {};
  //   e.hooks &&
  //     e.hooks.length < e.maxhooks &&
  //     (
  //       void 0 !== t.lconnectx ? (n.x = t.lconnectx, n.y = t.lconnecty) : (n.x = t.connectx, n.y = t.connecty),
  //       (i = null == t.cellid ? null : t.cellid) === ConstantData.Defines.SED_DNULL &&
  //       (i = null),
  //       4294967295 == i &&
  //       (i = null),
  //       r = new Hook(t.objid, i, - 1, t.hookpt, n),
  //       e.hooks.push(r)
  //     )
  // }

  // static ReadImageID(e, t, a, r, i) {
  //   var n,
  //     o = a.blobbytesid,
  //     s = null;
  //   n = e,
  //     t &&
  //     (n = t);
  //   var l = r.imageids[o];
  //   if (l && (s = l.id), null != s) switch ((t || void 0 !== e.BlockID) && (r.usedimageids[o] = !0), a.imagedir) {
  //     case FileParser.Image_Dir.dir_jpg:
  //     case FileParser.Image_Dir.dir_png:
  //     case FileParser.Image_Dir.dir_svg:
  //       n.BlobBytesID = s,
  //         n.ImageURL = r.imageids[o].url;
  //       break;
  //     case FileParser.Image_Dir.dir_meta:
  //       n.EMFBlobBytesID = s,
  //         i ? (
  //           n.ImageURL = Constants.FilePath_RSRC + Constants.MissingImage,
  //           n.ImageURL = n.ImageURL + '.svg',
  //           n.SVGDim = {},
  //           n.SVGDim.width = Constants.MissingImageDim.width,
  //           n.SVGDim.height = Constants.MissingImageDim.height
  //         ) : n.EMFHash &&
  //         n.EMFHash.length &&
  //         (
  //           n.SymbolURL = Constants.FilePath_HashSVG + n.EMFHash + '.svg',
  //           r.usedimageids[o] = !1,
  //           n.EMFBlobBytesID = - 1
  //         );
  //       break;
  //     case FileParser.Image_Dir.dir_store:
  //       n.OleBlobBytesID = s
  //   }
  // }

  // static ReadSegl(e, t, a) {
  //   var r,
  //     i,
  //     n,
  //     o,
  //     s,
  //     l,
  //     S,
  //     c,
  //     u,
  //     p;
  //   if (
  //     e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
  //     (
  //       e.LineType === ConstantData.LineType.SEGLINE ||
  //       e.LineType === ConstantData.LineType.ARCSEGLINE
  //     ) &&
  //     e.segl
  //   ) {
  //     for (
  //       t.lsegr ? (u = t.lsegr, p = t.llengths) : (u = t.segr, p = t.lengths),
  //       e.segl.firstdir = t.firstdir,
  //       e.segl.lastdir = t.lastdir,
  //       null == t.curveparam ? (e.segl.curveparam = 0, SDF.SetCurvature(a, e.segl, !0)) : e.segl.curveparam = t.curveparam,
  //       t.nsegs <= 0 &&
  //       (t.nsegs = 1),
  //       i = 0;
  //       i < t.nsegs;
  //       i++
  //     ) o = (s = u[i].left === u[i].right) ? u[i].bottom - u[i].top : u[i].right - u[i].left,
  //       0 === i ? (
  //         l = !1,
  //         t.nsegs > 1 &&
  //         (
  //           s ? u[i].top === u[i + 1].top &&
  //             (l = !0) : u[i].left === u[i + 1].left &&
  //           (l = !0)
  //         ),
  //         (n = new Point(0, 0)).x = SDF.ToSDJSCoords(u[i].left, a.coordScaleFactor),
  //         n.y = SDF.ToSDJSCoords(u[i].top, a.coordScaleFactor),
  //         (S = new Point(0, 0)).x = SDF.ToSDJSCoords(u[i].right, a.coordScaleFactor),
  //         S.y = SDF.ToSDJSCoords(u[i].bottom, a.coordScaleFactor),
  //         l ? (e.segl.pts.push(S), e.segl.pts.push(n)) : (e.segl.pts.push(n), e.segl.pts.push(S))
  //       ) : (
  //         n = new Point(0, 0),
  //         u[i].top === u[i - 1].top ? n.y = SDF.ToSDJSCoords(u[i].bottom, a.coordScaleFactor) : n.y = SDF.ToSDJSCoords(u[i].top, a.coordScaleFactor),
  //         u[i].left === u[i - 1].left ? n.x = SDF.ToSDJSCoords(u[i].right, a.coordScaleFactor) : n.x = SDF.ToSDJSCoords(u[i].left, a.coordScaleFactor),
  //         e.segl.pts.push(n)
  //       ),
  //       a.AddEMFHash &&
  //         4 == t.nsegs ? e.segl.lengths.push(SDF.ToSDJSCoords(o, a.coordScaleFactor)) : a.AddEMFHash &&
  //           5 == t.nsegs &&
  //           4 == i ? e.segl.lengths[2] = SDF.ToSDJSCoords(o, a.coordScaleFactor) : e.segl.lengths.push(SDF.ToSDJSCoords(p[i], a.coordScaleFactor));
  //     if (r = e.segl.pts.length, a.IsVisio) {
  //       if (l) {
  //         var d = Utils1.DeepCopy(e.segl);
  //         for (c = 0; c < r; c++) d.pts[r - 1 - c].x = e.segl.pts[c].x,
  //           d.pts[r - 1 - c].y = e.segl.pts[c].y;
  //         d.firstdir = e.segl.lastdir,
  //           d.lastdir = e.segl.firstdir,
  //           null == d.curveparam &&
  //           (d.curveparam = 0);
  //         e.segl.lengths.length;
  //         for (c = 0; c < r - 1; c++) Utils2.IsEqual(d.pts[c + 1].x, d.pts[c].x) ? d.lengths[c] = Math.abs(d.pts[c + 1].y - d.pts[c].y) : d.lengths[c] = Math.abs(d.pts[c + 1].x - d.pts[c].x);
  //         if (e.segl = d, e.segl.reversearrows = !0, e.hooks.length) for (c = 0; c < e.hooks.length; c++) switch (e.hooks[c].hookpt) {
  //           case ConstantData.HookPts.SED_KTL:
  //             e.hooks[c].hookpt = ConstantData.HookPts.SED_KTR;
  //             break;
  //           case ConstantData.HookPts.SED_KTR:
  //             e.hooks[c].hookpt = ConstantData.HookPts.SED_KTL
  //         }
  //       }
  //       e.StartPoint.x = e.Frame.x + e.segl.pts[0].x,
  //         e.StartPoint.y = e.Frame.y + e.segl.pts[0].y,
  //         e.EndPoint.x = e.Frame.x + e.segl.pts[r - 1].x,
  //         e.EndPoint.y = e.Frame.y + e.segl.pts[r - 1].y
  //     } else e.StartPoint.x = e.inside.x + e.segl.pts[0].x,
  //       e.StartPoint.y = e.inside.y + e.segl.pts[0].y,
  //       e.EndPoint.x = e.inside.x + e.segl.pts[r - 1].x,
  //       e.EndPoint.y = e.inside.y + e.segl.pts[r - 1].y,
  //       e.Frame = Utils1.DeepCopy(e.inside);
  //     return 0
  //   }
  //   return a.error = SDF.Errors.BadFormat,
  //     SDF.Errors.BadFormat
  // }



  // static ReadFreehand(e, t, a) {
  //   if (
  //     e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
  //     e.LineType === ConstantData.LineType.FREEHAND &&
  //     e.pointlist
  //   ) {
  //     let a = {},
  //       r = {};
  //     if (t.pts && t.npts) {
  //       let i = t.pts.length;
  //       for (let n = 0; n < i; n++) {
  //         let i = t.pts[n],
  //           o = i.x,
  //           s = i.y;
  //         0 === n ? (
  //           a.x = o + e.Frame.x,
  //           a.y = s + e.Frame.y,
  //           o = 0,
  //           s = 0,
  //           delx = a.x - e.Frame.x,
  //           dely = a.y - e.Frame.y
  //         ) : (o -= delx, s -= dely),
  //           r.x = o + a.x,
  //           r.y = s + a.y;
  //         let l = {
  //           x: o,
  //           y: s
  //         };
  //         e.pointlist.push(l),
  //           e.StartPoint = a,
  //           e.EndPoint = r
  //       }
  //     }
  //     return 0
  //   }
  // }

  // static ReadArrow(e, t) {
  //   if (
  //     e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.LINE ||
  //     e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.CONNECTOR
  //   ) {
  //     var a,
  //       r,
  //       i = ConstantData1.ArrowheadLookupTable.length;
  //     if (
  //       e.StartArrowID = t.sarrow & FileParser.ArrowMasks.ARROW_T_MASK,
  //       e.StartArrowDisp = !!(t.sarrow & FileParser.ArrowMasks.ARROW_DISP),
  //       (24 === e.StartArrowID || e.StartArrowID >= i) &&
  //       (e.StartArrowID = 0, e.StartArrowDisp = 0),
  //       e.EndArrowID = t.earrow & FileParser.ArrowMasks.ARROW_T_MASK,
  //       e.EndArrowDisp = !!(t.earrow & FileParser.ArrowMasks.ARROW_DISP),
  //       (24 === e.EndArrowID || e.EndArrowID >= i) &&
  //       (e.EndArrowID = 0, e.EndArrowDisp = 0),
  //       e.segl &&
  //       e.segl.reversearrows
  //     ) a = e.EndArrowID,
  //       r = e.EndArrowDisp,
  //       e.EndArrowID = e.StartArrowID,
  //       e.EndArrowDisp = e.StartArrowDisp,
  //       e.StartArrowID = a,
  //       e.StartArrowDisp = r;
  //     return e.ArrowSizeIndex = t.arrowsize,
  //       0
  //   }
  //   return 0
  // }

  // static Int32PairToLargeInt(e, t) {
  //   var a = 4294967296 * t;
  //   return a += e
  // }

  // static LargeIntToInt32Pair(e) {
  //   for (var t = e.toString(2), a = '', r = 0; r < 64 - t.length; r++) a += '0';
  //   a += t;
  //   var i = parseInt(a.substring(0, 32), 2);
  //   return [parseInt(a.substring(32), 2),
  //     i]
  // }

  // static ReadGanttInfo(e, t, a) {
  //   e.timeScale = t.timeScale,
  //     e.flags = t.flags,
  //     e.configuredStart = SDF.Int32PairToLargeInt(t.configuredStart1, t.configuredStart2),
  //     e.configuredEnd = SDF.Int32PairToLargeInt(t.configuredEnd1, t.configuredEnd2),
  //     e.start = SDF.Int32PairToLargeInt(t.start1, t.start2),
  //     e.end = SDF.Int32PairToLargeInt(t.end1, t.end2),
  //     e.scrollStart = SDF.Int32PairToLargeInt(t.scrollStart1, t.scrollStart2),
  //     e.scrollEnd = SDF.Int32PairToLargeInt(t.scrollEnd1, t.scrollEnd2)
  // }

  // static ReadBorder(e, t, a) {
  //   return e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.SHAPE ? (
  //     e.StyleRecord.Line.Thickness = SDF.ToSDJSCoords(t.bord, a.coordScaleFactor),
  //     t.bord > 0 &&
  //     0 === e.StyleRecord.Line.Thickness &&
  //     (e.StyleRecord.Line.Thickness = 1),
  //     SDF.WinLinePatternToJS(e.StyleRecord.Line, t.patindex),
  //     e.StyleRecord.Line.Paint.Color = SDF.WinColorToHTML(t.color),
  //     0
  //   ) : SDF.Errors.BadFormat
  // }

  // static Readv6Line(e, t, a) {
  //   return e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.LINE ||
  //     e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.CONNECTOR ? (
  //     e.StyleRecord.Line.Thickness = SDF.ToSDJSCoords(t.bord, a.coordScaleFactor),
  //     t.bord > 0 &&
  //     0 === e.StyleRecord.Line.Thickness &&
  //     (e.StyleRecord.Line.Thickness = 1),
  //     SDF.WinLinePatternToJS(e.StyleRecord.Line, t.patindex),
  //     e.StyleRecord.Line.Paint.Color = SDF.WinColorToHTML(t.color),
  //     e.StartArrowID = t.sarrow & FileParser.ArrowMasks.ARROW_T_MASK,
  //     e.StartArrowDisp = !!(t.sarrow & FileParser.ArrowMasks.ARROW_DISP),
  //     24 === e.StartArrowID &&
  //     (e.StartArrowID = 0, e.StartArrowDisp = 0),
  //     e.EndArrowID = t.earrow & FileParser.ArrowMasks.ARROW_T_MASK,
  //     e.EndArrowDisp = !!(t.earrow & FileParser.ArrowMasks.ARROW_DISP),
  //     24 === e.EndArrowID &&
  //     (e.EndArrowID = 0, e.EndArrowDisp = 0),
  //     e.ArrowSizeIndex = t.arrowsize,
  //     0
  //   ) : SDF.Errors.BadFormat
  // }

  // static Readv6Fill(e, t) {
  //   return e.StyleRecord.Fill.Paint.Color = SDF.WinColorToHTML(t.color),
  //     e.StyleRecord.Fill.Paint.EndColor = SDF.WinColorToHTML(t.ecolor),
  //     e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.SHAPE ? (
  //       t.fpatindex == FileParser.v6FillTypes.SEHollowIndex ? (
  //         e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
  //         t.gradientflags &&
  //         (
  //           e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_GRADIENT,
  //           e.StyleRecord.Fill.Paint.GradientFlags = t.gradientflags
  //         )
  //       ) : t.fpatindex == FileParser.v6FillTypes.SEOpaqueIndex ? t.gradientflags ? (
  //         e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_GRADIENT,
  //         e.StyleRecord.Fill.Paint.GradientFlags = t.gradientflags
  //       ) : t.color === ConstantData.Colors.Color_Trans ? (
  //         e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
  //         e.StyleRecord.Fill.Paint.Color = ConstantData.Colors.Color_White
  //       ) : e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID : (
  //         t.color == ConstantData.Colors.Color_Trans ? (
  //           e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
  //           e.StyleRecord.Fill.Paint.Color = ConstantData.Colors.Color_White
  //         ) : e.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID,
  //         e.StyleRecord.Fill.Hatch = t.fpatindex
  //       ),
  //       0
  //     ) : SDF.Errors.BadFormat
  // }

  // static ReadDraw6(e, t, a) {
  //   if (
  //     e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.SHAPE &&
  //     e.ShapeType === ConstantData.ShapeType.GROUPSYMBOL
  //   ) {
  //     var r = SDF.ToSDJSRect(t.hgframe, a.coordScaleFactor);
  //     e.InitialGroupBounds = {},
  //       e.InitialGroupBounds.width = r.width,
  //       e.InitialGroupBounds.height = r.height,
  //       e.InitialGroupBounds.x = r.x,
  //       e.InitialGroupBounds.y = r.y
  //   }
  //   t.extraflags &&
  //     (e.extraflags = t.extraflags),
  //     e.Layer = t.layer,
  //     (e.Layer < 0 || e.Layer > a.tLMB.nlayers - 1) &&
  //     (e.Layer = 0)
  // }

  // static ReadObj7(e, t, a) {
  //   var r = Resources.Windows_LinePatterns;
  //   switch (t.bpatindex) {
  //     case r.SEP_FilledLine:
  //     case r.SEP_DoubleLine:
  //       e.StyleRecord.Line.Thickness = SDF.ToSDJSCoords(2 * t.dbthick, a.coordScaleFactor),
  //         e.StyleRecord.Line.LinePattern = 0
  //   }
  //   e.flags = t.flags,
  //     t.dimensions &&
  //     (e.Dimensions = t.dimensions)
  // }

  // static ReadObj5(e, t, a) {
  //   e.attachpoint.x = t.attachpoint_x,
  //     e.attachpoint.y = t.attachpoint_y,
  //     e.rleft = t.rleft,
  //     e.rtop = t.rtop,
  //     e.rright = t.rright,
  //     e.rbottom = t.rbottom,
  //     e.rwd = t.rwd,
  //     e.rht = t.rht,
  //     e.rflags = t.rflags
  // }

  // static ReadConnectPoints(e, t) {
  //   var a,
  //     r,
  //     i;
  //   if (
  //     e.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.SHAPE
  //   ) {
  //     for (a = t.nconnect, r = 0; r < a; r++) i = new Point(t.connect[r].x, t.connect[r].y),
  //       e.ConnectPoints.push(i);
  //     return 0
  //   }
  //   return SDF.Errors.BadFormat
  // }



  // static ReadGroup(e, t, a) {
  //   var r,
  //     i,
  //     n,
  //     o = new SDF.Result;
  //   var gFmtTextObj;
  //   if (
  //     o.sdp = new SEDSession(),
  //     o.sdp.def.style = Utils1.DeepCopy(a.sdp.def.style),
  //     o.tLMB = new LayersManager(),
  //     o.ReadingGroup = !0,
  //     o.imageids = a.imageids,
  //     o.usedimageids = a.usedimageids,
  //     o.RichGradients = a.RichGradients,
  //     o.IsVisio = a.IsVisio,
  //     o.PVersion = a.PVersion,
  //     o.FVersion = a.FVersion,
  //     gFmtTextObj = null,
  //     o.coordScaleFactor = a.coordScaleFactor * (e.Frame.width / e.InitialGroupBounds.width),
  //     (a.ReadBlocks || a.ReadGroupBlock) &&
  //     (
  //       o.textids = a.textids,
  //       o.usedtextids = a.usedtextids,
  //       o.noteids = a.noteids,
  //       o.usednoteids = a.usednoteids,
  //       o.tableids = a.tableids,
  //       o.graphids = a.graphids,
  //       o.expandedviewids = a.expandedviewids,
  //       o.ganttids = a.ganttids,
  //       o.usedtableids = a.usedtableids,
  //       o.usedgraphids = a.usedgraphids,
  //       o.usedexpandedviewids = a.usedexpandedviewids,
  //       o.usedganttids = a.usedganttids
  //     ),
  //     a.ReadBlocks ? (o.GroupOffset.x = 0, o.GroupOffset.y = 0, o.ReadGroupBlock = !0) : (
  //       o.GroupOffset.x = - e.InitialGroupBounds.x,
  //       o.GroupOffset.y = - e.InitialGroupBounds.y,
  //       o.ReadGroupBlock = a.ReadGroupBlock
  //     ),
  //     o.gHash = a.gHash,
  //     n = (a.ReadBlocks, 0),
  //     e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
  //     e.ShapeType === ConstantData.ShapeType.GROUPSYMBOL
  //   ) {
  //     if (t.groupcodelist) o.coordScaleFactor = T3Gv.docUtil.svgDoc.docInfo.docDpi / t.groupcodelist.codes[0].data.drawres,
  //       o.ValidateHashesAsync = !0,
  //       o.AddEMFHash = !0,
  //       SDF.ReadBuffer_Complete(t.groupcodelist, o, !0);
  //     else if (a.error = SDF.ReadBuffer(t.data, o, n, !0, null), a.error) return a.error === SDF.Errors.MinVersion &&
  //       (a.error = SDF.Errors.GroupVersion),
  //       a.error;
  //     for (e.ShapesInGroup = [], r = o.zList.length, i = 0; i < r; i++) e.ShapesInGroup.push(o.zList[i]);
  //     if (
  //       o.SDData &&
  //       ListManager.SDData.GetSDDataDatasetIDByName(
  //         o.SDData,
  //         ListManager.DataSetNameList[ListManager.DataSetNameListIndexes.DATASET_FIELDEDDATA]
  //       ) >= 0
  //     ) {
  //       var s = T3Gv.objectStore.GetObject(T3Gv.optManager.theContentHeader.SDDataID);
  //       if (a.SDData) if (s) {
  //         var l = s.Data.SDData;
  //         s.Data.SDData = a.SDData
  //       } else s = T3Gv.objectStore.CreateBlock(
  //         ConstantData.StoredObjectType.SDDATA_OBJECT,
  //         {
  //           SDData: a.SDData
  //         }
  //       ),
  //         T3Gv.optManager.theContentHeader.SDDataID = s.ID;
  //       T3Gv.optManager.SDData_Transfer(o.zList, o.SDData, !1),
  //         l &&
  //         (s.Data.SDData = l)
  //     }
  //     return e.ConvertToNative(o.RichGradients, !1),
  //       0
  //   }
  //   return SDF.Errors.BadFormat
  // }

  // static ReadTableBlock(e, t, a) {
  //   var r = e.codes[t].data.value,
  //     i = new ListManager.Table,
  //     n = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.TABLE_OBJECT, i);
  //   return n ? (a.tableids[r] = n.ID, n.Data) : null
  // }

  // static ReadGraphBlock(e, t, a) {
  //   var r = e.codes[t].data.value,
  //     i = new ListManager.Graph,
  //     n = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.GRAPH_OBJECT, i);
  //   return n ? (a.graphids[r] = n.ID, n.Data) : null
  // }

  // static ReadExpandedViewBlock(e, t, a) {
  //   var r = e.codes[t].data.value,
  //     i = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.EXPANDEDVIEW_OBJECT, '');
  //   return i ? (a.expandedviewids[r] = i.ID, i) : null
  // }

  // static ReadCommentBlock(e, t, a) {
  //   var r;
  //   if (
  //     null != (
  //       r = - 1 == e.codes[t].data.ObjectID ? - 1 : a.IDMap[e.codes[t].data.ObjectID]
  //     )
  //   ) {
  //     var i = new ListManager.CommentBlock;
  //     i.userID = e.codes[t].data.UserID,
  //       i.objectID = r,
  //       i.timestamp = e.codes[t].data.timestamp,
  //       i.comment = e.codes[t].data.comment,
  //       a.ThreadIDs.indexOf(i.userID) < 0 &&
  //       a.ThreadIDs.push(i.userID);
  //     var n = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.LM_COMMENT_BLOCK, i);
  //     if (n) {
  //       var o = a.Threads[r];
  //       return null == o &&
  //         (o = [], a.Threads[r] = o),
  //         o.push(n.ID),
  //         n
  //     }
  //   }
  //   return null
  // }


  // static ReadImageBlock(e, t, a, r) {
  //   var i = new ListManager.BlobBytes(e.codes[t].data.imagedir, e.codes[t].data.bytes),
  //     n = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, i);
  //   if (n) {
  //     var o;
  //     if (
  //       e.codes[t].data.imagedir === FileParser.Image_Dir.dir_meta
  //     ) o = {
  //       id: n.ID,
  //       url: ''
  //     };
  //     else if (
  //       e.codes[t].data.imagedir === FileParser.Image_Dir.dir_store
  //     ) o = {
  //       id: n.ID,
  //       url: ''
  //     };
  //     else {
  //       var s = FileParser.GetImageBlobType(e.codes[t].data.imagedir),
  //         l = T3Gv.optManager.MakeURL(e.codes[t].data.data, null, s);
  //       o = {
  //         id: n.ID,
  //         url: l
  //       }
  //     }
  //     a.imageids[e.codes[t].data.imageid] = o
  //   }
  // }

  // static ReadNativeBlock(e, t, a, r, i) {
  //   var n,
  //     o,
  //     s = e.codes[t].data.nativeid,
  //     l = a.nativeids[s];
  //   if (null == l || l < 0);
  //   else if (
  //     i &&
  //     (
  //       n = T3Gv.objectStore.CreateBlock(
  //         ConstantData.StoredObjectType.H_NATIVE_OBJECT,
  //         e.codes[t].data.bytes
  //       ),
  //       o = T3Gv.optManager.GetObjectPtr(l, !1)
  //     )
  //   ) {
  //     o.NativeID = n.ID;
  //     SDF.ReadGroup(o, e.codes[t].data, a)
  //   }
  //   return t
  // }

  // static ReadTextBlock(e, t, a, r, i) {
  //   var n,
  //     o;
  //   e.codes[t].data.InstID,
  //     o = i ? r.SDF_C_COMMENT_END : r.SDF_C_TEXT_END;
  //   return n = new TextObject({
  //   }),
  //     i ? T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.LM_NOTES_OBJECT, n) : T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.LM_TEXT_OBJECT, n),
  //     t = SDF.ReadText(null, null, n, e, t, a, r, i, o)
  // }

  static ReadTextParams(e, t, a) {
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
          (n = T3Gv.optManager.GetObjectPtr(i, !1))
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
        var o = T3Gv.optManager.GetObjectPtr(e.DataID, !1);
        if (o) {
          var s = SDF.TextAlignToJust(e.TextAlign);
          T3Gv.optManager.SetTextAlignment(o, s.vjust, null)
        }
      }
      t.commentid >= 0 &&
        (
          e.NoteID = a.noteids[t.commentid],
          a.usednoteids[t.commentid] = !0
        )
    }
  }



  // static ReadText(e, t, a, r, i, n, o, s, l) {
  //   var gFmtTextObj;
  //   gFmtTextObj ||
  //     (
  //       gFmtTextObj = T3Gv.optManager.svgDoc.CreateShape(ConstantData.CreateShapeType.TEXT)
  //     );
  //   var S,
  //     c,
  //     u,
  //     p,
  //     d,
  //     D,
  //     g,
  //     h,
  //     m = {},
  //     C = [],
  //     y = [],
  //     f = [],
  //     L = [],
  //     I = [],
  //     T = 0,
  //     b = {};
  //   (
  //     m.font = n.DefRun.fontrec.fontName,
  //     m.type = n.DefRun.fontrec.fontType,
  //     m.size = SDF.PointSizeToFontSize(n.DefRun.fontrec.fontSize),
  //     m.weight = SDF.TextFaceToWeight(n.DefRun.fontrec.face),
  //     m.style = SDF.TextFaceToStyle(n.DefRun.fontrec.face),
  //     m.baseOffset = SDF.TextExtraToBaseLine(n.DefRun.extra),
  //     m.decoration = SDF.TextFaceToDecoration(n.DefRun.fontrec.face),
  //     m.color = n.DefRun.paint.Color,
  //     m.colorTrans = n.DefRun.paint.Opacity,
  //     m.spError = !1,
  //     gFmtTextObj.SetRenderingEnabled(!1),
  //     gFmtTextObj.SetText(''),
  //     gFmtTextObj.SetVerticalAlignment('middle'),
  //     c = r.codes[i].data.nstyles,
  //     D = n.DefTStyle.just,
  //     e
  //   ) &&
  //     (
  //       D = (
  //         h = s ? SDF.TextAlignToJust(ConstantData.TextAlign.LEFT) : SDF.TextAlignToJust(e.TextAlign)
  //       ).just,
  //       gFmtTextObj.SetVerticalAlignment(h.vjust)
  //     );
  //   for (
  //     a &&
  //     (
  //       s ? n.noteids[r.codes[i].data.InstID] = a.BlockID : n.textids[r.codes[i].data.InstID] = a.BlockID
  //     ),
  //     u = 0;
  //     u < c;
  //     u++
  //   ) (b = $.extend(!0, {
  //   }, n.DefTStyle)).just = D,
  //     y.push(b);
  //   for (i++, S = {
  //     curLinkIndex: - 1,
  //     run: []
  //   }; r.codes[i].code != l;) {
  //     switch (r.codes[i].code) {
  //       case o.SDF_C_OUTSIDE:
  //         SDF.ReadOutSide(r.codes[i].data, n.IsVisio);
  //         break;
  //       case o.SDF_C_TEXTCHAR:
  //         g = r.codes[i].data.text ? r.codes[i].data.text : ' ',
  //           gFmtTextObj.SetText(g, m),
  //           gFmtTextObj.SetParagraphAlignment(D),
  //           r.codes[i].data.text ||
  //           gFmtTextObj.SetText('');
  //         break;
  //       case o.SDF_C_TEXTRUN:
  //         SDF.ReadRuns(gFmtTextObj, r.codes[i].data, n, m, C, S, L);
  //         break;
  //       case o.SDF_C_TEXTSTYLE:
  //         if ((T = r.codes[i].data.index) < c) for (
  //           SDF.ReadTextStyle(y[T], r.codes[i].data, n),
  //           b = $.extend(!0, {
  //           }, y[T]),
  //           u = T;
  //           u < c;
  //           u++
  //         ) y[u] = $.extend(!0, {
  //         }, b);
  //         break;
  //       case o.SDF_C_TEXTLINK:
  //         f.push(r.codes[i].data.path);
  //         break;
  //       case o.SDF_C_TEXTDATA:
  //         I.push(r.codes[i].data.dataField);
  //         break;
  //       default:
  //         r.codes[i].code & SDF.SDF_BEGIN &&
  //           (
  //             i = SDF.ReadFrame(r, i, r.codes[i].code & SDF.SDF_MASK | SDF.SDF_END)
  //           )
  //     }
  //     i++
  //   }
  //   if (c) for (
  //     (!C.length || C[0].offset > 0) &&
  //     C.splice(0, 0, {
  //       pStyleIndex: 0,
  //       offset: 0
  //     }),
  //     p = C.length,
  //     u = 0;
  //     u < p;
  //     u++
  //   ) (d = C[u].pStyleIndex) >= 0 &&
  //     d < c &&
  //     gFmtTextObj.SetParagraphStyle(y[d], C[u].offset);
  //   for (u = 0; u < S.run.length; u++) S.run[u].linkIndex >= 0 &&
  //     S.run[u].linkIndex < f.length &&
  //     gFmtTextObj.SetHyperlink(f[S.run[u].linkIndex], S.run[u].offset, S.run[u].length);
  //   for (u = 0; u < L.length; u++) L[u].index >= 0 &&
  //     L[u].index < I.length &&
  //     gFmtTextObj.SetFormat({
  //       dataField: I[L[u].index]
  //     }, L[u].offset, L[u].length);
  //   gFmtTextObj.SetRenderingEnabled(!0);
  //   var M = gFmtTextObj.GetRuntimeText();
  //   if (S.run.length && (gFmtTextObj = null), !n.NoTextBlocks) if (t) {
  //     var P = new ListManager.BaseDrawingObject;
  //     s ? (P.SetNoteContent(M), t.NoteID = P.NoteID) : (P.SetTextContent(M), t.DataID = P.DataID)
  //   } else e ? s ? e.SetNoteContent(M) : e.SetTextContent(M) : a &&
  //     (a.runtimeText = M);
  //   return i
  // }

  // static ReadRuns(e, t, a, r, i, n, o) {
  //   var s,
  //     l,
  //     S,
  //     c,
  //     u,
  //     p,
  //     d,
  //     D,
  //     g = e.GetTextLength();
  //   for (S = t.runs.length, l = 0; l < S; l++) {
  //     var h,
  //       m,
  //       C;
  //     if (h = t.runs[l].offset, m = l < S - 1 ? t.runs[l + 1].offset : g, !(h >= g)) {
  //       for (C = !1, c = t.runs[l].op.length, s = 0; s < c; s++) {
  //         var y = t.runs[l].op[s];
  //         switch (y.code) {
  //           case FileParser.TextStyleCodes.SDF_T_FONT:
  //             u = SDF.FontIDtoFontRec(y.value, a),
  //               r.font = u.fontName,
  //               r.type = u.fontType,
  //               C = !0;
  //             break;
  //           case FileParser.TextStyleCodes.SDF_T_SIZE:
  //             r.size = SDF.PointSizeToFontSize(y.value),
  //               C = !0;
  //             break;
  //           case FileParser.TextStyleCodes.SDF_T_SIZE_FLOAT:
  //             r.size = y.value,
  //               C = !0;
  //             break;
  //           case FileParser.TextStyleCodes.SDF_T_FACE:
  //             r.weight = SDF.TextFaceToWeight(y.value),
  //               r.style = SDF.TextFaceToStyle(y.value),
  //               r.decoration = SDF.TextFaceToDecoration(y.value),
  //               C = !0;
  //             break;
  //           case FileParser.TextStyleCodes.SDF_T_EXTRA:
  //             r.baseOffset = SDF.TextExtraToBaseLine(y.value),
  //               C = !0;
  //             break;
  //           case FileParser.TextStyleCodes.SDF_T_COLOR:
  //             r.color = SDF.WinColorToHTML(y.value),
  //               r.colorTrans = SDF.WinColorToAlpha(y.value),
  //               C = !0;
  //             break;
  //           case FileParser.TextStyleCodes.SDF_T_FLAGS:
  //             r.spError = 0 != (y.value & FileParser.TextFlags.TEN_F_BADSPELL),
  //               C = !0;
  //             break;
  //           case FileParser.TextStyleCodes.SDF_T_STYLEID:
  //             i.push({
  //               offset: h,
  //               pStyleIndex: y.value
  //             });
  //             break;
  //           case FileParser.TextStyleCodes.SDF_T_LINKID:
  //             p = FileParser.ToInt32(y.value),
  //               D = null,
  //               n.curLinkIndex >= 0 &&
  //               (D = n.run[n.run.length - 1]),
  //               D &&
  //               p != D.linkIndex &&
  //               (D.length = h - D.offset, D = null),
  //               !D &&
  //               p >= 0 &&
  //               n.run.push({
  //                 linkIndex: p,
  //                 offset: h,
  //                 length: g - h
  //               }),
  //               n.curLinkIndex = p;
  //             break;
  //           case FileParser.TextStyleCodes.SDF_T_DATAID:
  //             d = FileParser.ToInt32(y.value),
  //               D = null,
  //               o.length > 0 &&
  //               (D = o[o.length - 1]),
  //               D &&
  //                 d == D.index ? D.length = m - D.offset : o.push({
  //                   index: d,
  //                   offset: h,
  //                   length: m - h
  //                 })
  //         }
  //       }
  //       C &&
  //         e.SetFormat(r, h)
  //     }
  //   }
  // }

  // static ReadTextStyle(e, t, a) {
  //   var r,
  //     i,
  //     n = FileParser.ParaStyleCodes;
  //   for (i = t.codes.length, r = 0; r < i; r++) switch (t.codes[r].code) {
  //     case n.SDF_S_JUST:
  //       e.just = SDF.W32JustToJS(t.codes[r].value, !1);
  //       break;
  //     case n.SDF_S_LEADING:
  //       e.leading = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
  //       break;
  //     case n.SDF_S_SPACING:
  //       t.codes[r].value < 0 ? e.spacing = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor) : e.spacing = t.codes[r].value / 100;
  //       break;
  //     case n.SDF_S_TRACKING:
  //       e.tracking = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
  //       break;
  //     case n.SDF_S_LINDENT:
  //       e.lindent = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
  //       break;
  //     case n.SDF_S_RINDENT:
  //       e.rindent = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
  //       break;
  //     case n.SDF_S_PINDENT:
  //       e.pindent = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
  //       break;
  //     case n.SDF_S_BINDENT:
  //       e.bindent = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
  //       break;
  //     case n.SDF_S_BULLET:
  //       e.bullet = SDF.W32BulletToJS(t.codes[r].value);
  //       break;
  //     case n.SDF_S_TABSPACE:
  //       e.tabspace = SDF.ToSDJSCoords(t.codes[r].value, a.coordScaleFactor);
  //       break;
  //     case n.SDF_S_HYPHEN:
  //       e.hyphen = t.codes[r].value
  //   }
  // }

  // static otypeToLineType(e, t, a) {
  //   var r = ConstantData.LineType.LINE;
  //   switch (e) {
  //     case FileParser.ObjectTypes.SED_LineD:
  //       r = a === ConstantData2.LineTypes.SED_LS_Chord ? ConstantData.LineType.ARCLINE : ConstantData.LineType.LINE;
  //       break;
  //     case FileParser.ObjectTypes.SED_SegL:
  //       r = ConstantData.LineType.ARCSEGLINE;
  //       break;
  //     case FileParser.ObjectTypes.SED_PolyL:
  //       r = ConstantData.LineType.PARABOLA;
  //       break;
  //     case FileParser.ObjectTypes.SED_NURBS:
  //       r = ConstantData.LineType.NURBS;
  //       break;
  //     case FileParser.ObjectTypes.SED_NURBSSEG:
  //       r = ConstantData.LineType.NURBSSEG;
  //       break;
  //     case FileParser.ObjectTypes.SED_ELLIPSE:
  //       r = ConstantData.LineType.ELLIPSE;
  //       break;
  //     case FileParser.ObjectTypes.SED_ELLIPSEEND:
  //       r = ConstantData.LineType.ELLIPSEEND;
  //       break;
  //     case FileParser.ObjectTypes.SED_QUADBEZ:
  //       r = ConstantData.LineType.QUADBEZ;
  //       break;
  //     case FileParser.ObjectTypes.SED_QUADBEZCON:
  //       r = ConstantData.LineType.QUADBEZCON;
  //       break;
  //     case FileParser.ObjectTypes.SED_CUBEBEZ:
  //       r = ConstantData.LineType.CUBEBEZ;
  //       break;
  //     case FileParser.ObjectTypes.SED_CUBEBEZCON:
  //       r = ConstantData.LineType.CUBEBEZCON;
  //       break;
  //     case FileParser.ObjectTypes.SED_SPLINE:
  //       r = ConstantData.LineType.SPLINE;
  //       break;
  //     case FileParser.ObjectTypes.SED_SPLINECON:
  //       r = ConstantData.LineType.SPLINECON;
  //       break;
  //     case FileParser.ObjectTypes.SED_MOVETO:
  //       r = ConstantData.LineType.MOVETO;
  //       break;
  //     case FileParser.ObjectTypes.SED_MOVETO_NEWPOLY:
  //       r = ConstantData.LineType.MOVETO_NEWPOLY
  //   }
  //   return r
  // }

  static LineTypetoWin32type(e, t, a, r, i, n) {
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
  }

  // static BuildPolygonShape(e, t, a, r) {
  //   var i,
  //     n,
  //     o,
  //     s,
  //     l,
  //     S,
  //     c,
  //     u = {},
  //     p = [],
  //     d = {},
  //     D = ConstantData.PolyListFlags,
  //     g = ConstantData.LineType,
  //     h = ConstantData.PolySegFlags;
  //   u.Frame = e.Frame,
  //     u.inside = e.inside,
  //     (i = new Instance.Shape.PolyLine(u)).polylist = e.polylist,
  //     i.StartPoint = t,
  //     i.EndPoint = a;
  //   var m = [],
  //     C = !1,
  //     y = ConstantData.ObjMoreFlags.SED_MF_VisioPoly;
  //   e.moreflags & y &&
  //     (r = !0),
  //     r ||
  //     0 !== e.StyleRecord.Line.BThick ||
  //     (i.inside = i.Frame),
  //     o = (
  //       n = i.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, m)
  //     ).length;
  //   var f,
  //     L,
  //     I,
  //     T = [];
  //   if (
  //     e.polylist.flags & D.SD_PLF_HasMoveTo ||
  //     e.polylist.flags & D.SD_PLF_HasPolyPoly
  //   ) {
  //     var b = e.polylist.segs.length;
  //     for (
  //       C = !0,
  //       L = e.polylist.segs[0],
  //       f = new ListManager.PolyGeometry(
  //         (L.flags & h.SD_PLS_NoFill) > 0,
  //         (L.flags & h.SD_PLS_NoLine) > 0,
  //         !1,
  //         0,
  //         0
  //       ),
  //       I = e.polylist.segs[0],
  //       s = 1;
  //       s < b;
  //       s++
  //     ) switch ((L = e.polylist.segs[s]).LineType) {
  //       case g.MOVETO_NEWPOLY:
  //         f.NPoints = m[s - 1] - f.Offset,
  //           f.Closed = Utils2.EqualPt(e.polylist.segs[s - 1].pt, I.pt),
  //           T.push(f),
  //           f = new ListManager.PolyGeometry(
  //             (L.flags & h.SD_PLS_NoFill) > 0,
  //             (L.flags & h.SD_PLS_NoLine) > 0,
  //             !1,
  //             m[s - 1],
  //             0
  //           ),
  //           I = L;
  //         break;
  //       case g.MOVETO:
  //         f.MoveTo.push(m[s - 1] - f.Offset),
  //           s < b - 1 ? f.MoveTo.push(m[s] - f.Offset) : f.MoveTo.push(o - f.Offset)
  //     }
  //     L = e.polylist.segs[b - 1],
  //       f.NPoints = o - f.Offset,
  //       f.Closed = Utils2.EqualPt(L.pt, I.pt),
  //       T.push(f),
  //       e.Geometries = T
  //   }
  //   for (
  //     (S = e.Frame.width) < 0.1 &&
  //     (S = 1),
  //     (c = e.Frame.height) < 0.1 &&
  //     (c = 1),
  //     Utils2.GetPolyRect(d, n),
  //     r &&
  //     (
  //       d.x < 0 &&
  //       (d.x = 0),
  //       d.y < 0 &&
  //       (d.y = 0),
  //       d.x = 0,
  //       d.y = 0,
  //       e.moreflags = Utils2.SetFlag(e.moreflags, y, !0)
  //     ),
  //     s = 0;
  //     s < o;
  //     s++
  //   ) s > 0 &&
  //     !C &&
  //     n[s].x === n[s - 1].x &&
  //     n[s].y === n[s - 1].y ||
  //     (
  //       n[s].x -= d.x,
  //       n[s].y -= d.y,
  //       l = new Point(n[s].x / S, n[s].y / c),
  //       p.push(l)
  //     );
  //   e.VertexArray = p
  // }

  // static ConvertToPolyL(e) {
  //   if (
  //     e.polylist &&
  //     0 == (
  //       e.polylist.flags & ConstantData.PolyListFlags.SD_PLF_FreeHand
  //     )
  //   ) {
  //     var t,
  //       a,
  //       r,
  //       i,
  //       n = ConstantData.LineType,
  //       o = ConstantData.ArcQuad,
  //       s = Math.PI;
  //     for (t = e.polylist.segs.length, a = 0; a < t; a++) switch (r = e.polylist.segs[a], i = e.polylist.segs[a - 1], r.LineType) {
  //       case n.ARCLINE:
  //         r.ShortRef === ConstantData2.LineTypes.SED_LS_Chord &&
  //           (r.param = - r.param);
  //         break;
  //       case n.ARCSEGLINE:
  //         if (a > 0) switch (r.ShortRef) {
  //           case o.SD_PLA_TR:
  //             r.pt.x > i.pt.x &&
  //               (r.param = s / 2, r.ShortRef = o.SD_PLA_TL);
  //             break;
  //           case o.SD_PLA_BR:
  //             r.pt.x > i.pt.x &&
  //               (r.param = - s / 2);
  //             break;
  //           case o.SD_PLA_TL:
  //             r.pt.x < i.pt.x &&
  //               (r.param = - s / 2);
  //             break;
  //           case o.SD_PLA_BL:
  //             r.pt.x < i.pt.x &&
  //               (r.param = s / 2)
  //         }
  //     }
  //     e.polylist.flag = Utils2.SetFlag(
  //       e.polylist.flags,
  //       ConstantData.PolyListFlags.SD_PLF_FreeHand,
  //       !0
  //     )
  //   }
  // }

  // static ReadPolyLine(e, t, a, r, i) {
  //   var n,
  //     o,
  //     s,
  //     l,
  //     S,
  //     c,
  //     u,
  //     p,
  //     d,
  //     D = !0,
  //     g = !1,
  //     h = {
  //       x: 0,
  //       y: 0
  //     },
  //     m = {
  //       x: 0,
  //       y: 0
  //     };
  //   if (
  //     r.IsVisio &&
  //     (e.inside = Utils1.DeepCopy(e.Frame)),
  //     e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
  //     e.LineType !== ConstantData.LineType.POLYLINE &&
  //     (
  //       d = !0,
  //       null == e.polylist &&
  //       (e.polylist = new PolyList())
  //     ),
  //     e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
  //     e.ShapeType === ConstantData.ShapeType.POLYGON &&
  //     (
  //       g = !0,
  //       null == e.polylist &&
  //       (e.polylist = new PolyList())
  //     ),
  //     (
  //       e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
  //       e.LineType === ConstantData.LineType.POLYLINE ||
  //       g ||
  //       d
  //     ) &&
  //     e.polylist
  //   ) {
  //     for (
  //       t.codes[a].data.flags ? e.polylist.flags = t.codes[a].data.flags : e.polylist.flags = 0,
  //       t.codes[a].data.ldim ? (
  //         e.polylist.dim.x = SDF.ToSDJSCoords(t.codes[a].data.ldim.x, r.coordScaleFactor),
  //         e.polylist.dim.y = SDF.ToSDJSCoords(t.codes[a].data.ldim.y, r.coordScaleFactor)
  //       ) : (
  //         e.polylist.dim.x = SDF.ToSDJSCoords(t.codes[a].data.dim.x, r.coordScaleFactor),
  //         e.polylist.dim.y = SDF.ToSDJSCoords(t.codes[a].data.dim.y, r.coordScaleFactor)
  //       ),
  //       a++;
  //       t.codes[a].code != FileParser.SDROpCodesByName.SDF_C_DRAWPOLY_END;
  //     ) {
  //       switch (t.codes[a].code) {
  //         case i.SDF_C_DRAWPOLYSEG:
  //           switch (
  //           l = t.codes[a].data,
  //           n = SDF.ToSDJSCoords(l.lpt.x, r.coordScaleFactor, !0),
  //           o = SDF.ToSDJSCoords(l.lpt.y, r.coordScaleFactor, !0),
  //           D ? (
  //             h.x = n + e.Frame.x,
  //             h.y = o + e.Frame.y,
  //             n = 0,
  //             o = 0,
  //             D = !1,
  //             S = h.x - e.Frame.x,
  //             c = h.y - e.Frame.y
  //           ) : (n -= S, o -= c),
  //           m.x = n + h.x,
  //           m.y = o + h.y,
  //           (
  //             s = new PolySeg(SDF.otypeToLineType(l.otype, l.dataclass, l.ShortRef), n, o)
  //           ).dataclass = l.dataclass,
  //           0 === (p = e.polylist.segs.length) &&
  //           (s.LineType = ConstantData.LineType.LINE),
  //           s.LineType
  //           ) {
  //             case ConstantData.LineType.PARABOLA:
  //               s.param = SDF.ToSDJSCoords(l.param, r.coordScaleFactor, !0),
  //                 s.ShortRef = SDF.ToSDJSCoords(l.ShortRef, r.coordScaleFactor, !0);
  //               break;
  //             case ConstantData.LineType.NURBS:
  //             case ConstantData.LineType.NURBSSEG:
  //             case ConstantData.LineType.ELLIPSE:
  //             case ConstantData.LineType.ELLIPSEEND:
  //             case ConstantData.LineType.QUADBEZ:
  //             case ConstantData.LineType.QUADBEZCON:
  //             case ConstantData.LineType.CUBEBEZ:
  //             case ConstantData.LineType.CUBEBEZCON:
  //             case ConstantData.LineType.SPLINE:
  //             case ConstantData.LineType.SPLINECON:
  //               s.param = l.param,
  //                 s.ShortRef = l.ShortRef,
  //                 s.weight = l.weight,
  //                 s.dataclass = l.dataclass,
  //                 r.VisioFileVersion = !0;
  //               break;
  //             case ConstantData.LineType.ARCLINE:
  //               s.param = SDF.ToSDJSCoords(l.param, r.coordScaleFactor, !0),
  //                 s.ShortRef = l.ShortRef,
  //                 p = e.polylist.segs.length,
  //                 Math.abs(s.pt.y - e.polylist.segs[p - 1].pt.y) < 1 / 6 &&
  //                 s.pt.x < e.polylist.segs[p - 1].pt.x &&
  //                 (s.param = - s.param);
  //               break;
  //             case ConstantData.LineType.MOVETO:
  //               e.polylist.flags = Utils2.SetFlag(
  //                 e.polylist.flags,
  //                 ConstantData.PolyListFlags.SD_PLF_HasMoveTo,
  //                 !0
  //               ),
  //                 s.param = l.param,
  //                 s.ShortRef = l.ShortRef,
  //                 r.VisioFileVersion = !0;
  //               break;
  //             case ConstantData.LineType.MOVETO_NEWPOLY:
  //               e.polylist.flags = Utils2.SetFlag(
  //                 e.polylist.flags,
  //                 ConstantData.PolyListFlags.SD_PLF_HasPolyPoly,
  //                 !0
  //               ),
  //                 s.param = l.param,
  //                 s.ShortRef = l.ShortRef,
  //                 g = !0,
  //                 r.VisioFileVersion = !0;
  //               break;
  //             default:
  //               s.param = l.param,
  //                 s.ShortRef = l.ShortRef
  //           }
  //           s.dimDeflection = SDF.ToSDJSCoords(l.dimDeflection, r.coordScaleFactor, !0),
  //             l.flags ? s.flags = l.flags : s.flags = 0,
  //             e.polylist.segs.push(s);
  //           break;
  //         case i.SDF_C_POLYSEGEXPLICITPOINTS:
  //           for (
  //             l = t.codes[a].data,
  //             e.polylist.flags = Utils2.SetFlag(
  //               e.polylist.flags,
  //               ConstantData.PolyListFlags.SD_PLF_WasExplict,
  //               !0
  //             ),
  //             u = 0;
  //             u < l.npts;
  //             u++
  //           ) n = SDF.ToSDJSCoords(l.pt[u].x, r.coordScaleFactor, !0),
  //             o = SDF.ToSDJSCoords(l.pt[u].y, r.coordScaleFactor, !0),
  //             D ? (
  //               h.x = n + e.Frame.x,
  //               h.y = o + e.Frame.y,
  //               n = 0,
  //               o = 0,
  //               D = !1,
  //               S = h.x - e.Frame.x,
  //               c = h.y - e.Frame.y
  //             ) : (n -= S, o -= c),
  //             m.x = n + h.x,
  //             m.y = o + h.y,
  //             (
  //               s = new PolySeg(ConstantData.LineType.LINE, n, o)
  //             ).dataclass = 0,
  //             s.ShortRef = 0,
  //             s.param = 0,
  //             s.dimDeflection = 0,
  //             s.flags = 0,
  //             e.polylist.segs.push(s);
  //           break;
  //         default:
  //           t.codes[a].code & SDF.SDF_BEGIN &&
  //             (
  //               a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
  //             )
  //       }
  //       a++
  //     }
  //     if (
  //       0 == (
  //         e.polylist.flags & ConstantData.PolyListFlags.SD_PLF_FreeHand
  //       ) &&
  //       SDF.ConvertToPolyL(e),
  //       (g || Math.abs(h.x - m.x) < 0.001 && Math.abs(h.y - m.y) < 0.001) &&
  //       (e.polylist.closed = !0),
  //       r.IsVisio
  //     ) {
  //       var C = ConstantData.ExtraFlags;
  //       e.extraflags & (C.SEDE_FlipHoriz | C.SEDE_FlipVert) &&
  //         (
  //           g ? (
  //             e.StartPoint = h,
  //             e.EndPoint = m,
  //             e.polylist.offset.x = h.x - e.Frame.x,
  //             e.polylist.offset.y = h.y - e.Frame.y,
  //             e.Flip(e.extraflags, !0),
  //             h = e.StartPoint,
  //             m = e.EndPoint
  //           ) : (
  //             e.StartPoint = h,
  //             e.EndPoint = m,
  //             e.Flip(e.extraflags, !0),
  //             h = e.StartPoint,
  //             m = e.EndPoint
  //           ),
  //           e.extraflags = Utils2.SetFlag(e.extraflags, C.SEDE_FlipHoriz, !1),
  //           e.extraflags = Utils2.SetFlag(e.extraflags, C.SEDE_FlipVert, !1)
  //         ),
  //         e.StartPoint = h,
  //         e.EndPoint = m,
  //         g &&
  //         (
  //           e.polylist.offset.x = h.x - e.Frame.x,
  //           e.polylist.offset.y = h.y - e.Frame.y
  //         ),
  //         h = e.StartPoint,
  //         m = e.EndPoint
  //     }
  //     g ? (
  //       SDF.BuildPolygonShape(e, h, m, r.IsVisio),
  //       e.StartPoint = h,
  //       e.EndPoint = m,
  //       e.polylist.offset.x = h.x - e.Frame.x,
  //       e.polylist.offset.y = h.y - e.Frame.y
  //     ) : (e.StartPoint = h, e.EndPoint = m)
  //   } else r.error = SDF.Errors.BadFormat,
  //     a = - 1;
  //   return a
  // }




  // static ReadArrayList(e, t, a, r, i) {
  //   var n,
  //     o,
  //     s,
  //     l,
  //     S,
  //     c = 0,
  //     u = 0,
  //     p = 0,
  //     d = ConstantData.ConnectorDefines.SEDA_NSkip,
  //     D = ConstantData.SEDA_Styles,
  //     g = ConstantData.HookPts,
  //     h = ConstantData.ConnectorDefines;
  //   if (
  //     e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
  //     e.arraylist
  //   ) {
  //     for (
  //       e.arraylist.styleflags = t.codes[a].data.styleflags,
  //       e.arraylist.angle = t.codes[a].data.angle,
  //       e.arraylist.tilt = t.codes[a].data.tilt,
  //       null != t.codes[a].data.curveparam ? e.arraylist.curveparam = t.codes[a].data.curveparam : SDF.SetCurvature(r, e.arraylist, !0),
  //       null == t.codes[a].data.lwd ? (
  //         e.arraylist.wd = SDF.ToSDJSCoords(t.codes[a].data.wd, r.coordScaleFactor),
  //         e.arraylist.wd = 25,
  //         e.arraylist.ht = SDF.ToSDJSCoords(t.codes[a].data.ht, r.coordScaleFactor)
  //       ) : (
  //         e.arraylist.wd = SDF.ToSDJSCoords(t.codes[a].data.lwd, r.coordScaleFactor),
  //         e.arraylist.ht = SDF.ToSDJSCoords(t.codes[a].data.lht, r.coordScaleFactor)
  //       ),
  //       e.arraylist.hook.length = 0,
  //       0,
  //       e.arraylist.styleflags & D.SEDA_Linear,
  //       s = (e.arraylist.styleflags & D.SEDA_Radial) > 0,
  //       l = e.arraylist.styleflags & D.SEDA_BothSides ||
  //       0 == (e.arraylist.styleflags & D.SEDA_PerpConn),
  //       S = e.arraylist.styleflags & D.SEDA_FlowConn &&
  //       e.arraylist.styleflags & D.SEDA_Linear,
  //       a++;
  //       t.codes[a].code != FileParser.SDROpCodesByName.SDF_C_DRAWARRAY_END;
  //     ) {
  //       switch (t.codes[a].code) {
  //         case i.SDF_C_DRAWARRAYHOOK:
  //           (n = new SEDAHook()).id = t.codes[a].data.uniqueid,
  //             null == t.codes[a].data.extra ? n.extra = 0 : n.extra = SDF.ToSDJSCoords(t.codes[a].data.extra, r.coordScaleFactor),
  //             null == t.codes[a].data.lgap ? n.gap = SDF.ToSDJSCoords(t.codes[a].data.gap, r.coordScaleFactor) : n.gap = SDF.ToSDJSCoords(t.codes[a].data.lgap, r.coordScaleFactor),
  //             r.AddEMFHash &&
  //             S &&
  //             (
  //               1 !== e.arraylist.hook.length &&
  //               2 !== e.arraylist.hook.length ||
  //               (n.gap += n.extra)
  //             ),
  //             (
  //               o = t.codes[a].data.lliner ? SDF.ToSDJSRect(t.codes[a].data.lliner, r.coordScaleFactor) : SDF.ToSDJSRect(t.codes[a].data.liner, r.coordScaleFactor)
  //             ).left = o.x,
  //             o.right = o.x + o.width,
  //             o.top = o.y,
  //             o.bottom = o.y + o.height,
  //             e.vertical ? Utils2.IsEqual(o.left, o.right) ? (
  //               0 === c &&
  //               (e.StartPoint.y += o.top, u = e.StartPoint.y - e.Frame.y),
  //               c++,
  //               o.top -= u,
  //               o.bottom -= u,
  //               n.startpoint.v = o.left,
  //               n.endpoint.v = o.left,
  //               n.startpoint.h = o.top,
  //               n.endpoint.h = o.bottom
  //             ) : (
  //               o.top -= u,
  //               o.bottom -= u,
  //               e.arraylist.hook.length >= d &&
  //               (p = e.arraylist.hook[1].startpoint.h),
  //               Utils2.IsEqual(o.left, 0) ? s &&
  //                 Utils2.IsEqual(o.bottom, p) ? (
  //                 n.startpoint.v = o.left,
  //                 n.endpoint.v = o.right,
  //                 n.startpoint.h = o.bottom,
  //                 n.endpoint.h = o.top
  //               ) : (
  //                 n.startpoint.v = o.left,
  //                 n.endpoint.v = o.right,
  //                 n.startpoint.h = o.top,
  //                 n.endpoint.h = o.bottom
  //               ) : s &&
  //                 Utils2.IsEqual(o.bottom, p) ? (
  //                 n.endpoint.v = o.left,
  //                 n.startpoint.v = o.right,
  //                 n.startpoint.h = o.bottom,
  //                 n.endpoint.h = o.top
  //               ) : (
  //                 n.endpoint.v = o.left,
  //                 n.startpoint.v = o.right,
  //                 n.startpoint.h = o.top,
  //                 n.endpoint.h = o.bottom
  //               )
  //             ) : Utils2.IsEqual(o.top, o.bottom) ? (
  //               0 === c &&
  //               (e.StartPoint.x += o.left, u = e.StartPoint.x - e.Frame.x),
  //               c++,
  //               o.left -= u,
  //               o.right -= u,
  //               n.startpoint.v = o.top,
  //               n.endpoint.v = o.top,
  //               n.startpoint.h = o.left,
  //               n.endpoint.h = o.right
  //             ) : (
  //               o.left -= u,
  //               o.right -= u,
  //               e.arraylist.hook.length >= d &&
  //               (p = e.arraylist.hook[1].startpoint.h),
  //               Utils2.IsEqual(o.top, 0) ? s &&
  //                 Utils2.IsEqual(o.right, p) ? (
  //                 n.startpoint.v = o.top,
  //                 n.endpoint.v = o.bottom,
  //                 n.startpoint.h = o.right,
  //                 n.endpoint.h = o.left
  //               ) : (
  //                 n.startpoint.v = o.top,
  //                 n.endpoint.v = o.bottom,
  //                 n.startpoint.h = o.left,
  //                 n.endpoint.h = o.right
  //               ) : s &&
  //                 Utils2.IsEqual(o.right, p) ? (
  //                 n.endpoint.v = o.top,
  //                 n.startpoint.v = o.bottom,
  //                 n.startpoint.h = o.right,
  //                 n.endpoint.h = o.left
  //               ) : (
  //                 n.endpoint.v = o.top,
  //                 n.startpoint.v = o.bottom,
  //                 n.startpoint.h = o.left,
  //                 n.endpoint.h = o.right
  //               )
  //             ),
  //             e.arraylist.hook.push(n);
  //           break;
  //         case i.SDF_C_DRAWARRAYTEXT:
  //           n &&
  //             (
  //               r.ReadBlocks ||
  //                 r.ReadGroupBlock ? t.codes[a].data.tuniqueid >= 0 &&
  //               (
  //                 n.textid = r.textids[t.codes[a].data.tuniqueid],
  //                 r.usedtextids[t.codes[a].data.tuniqueid] = !0,
  //                 r.PVersion < SDF.SDF_PVERSION859 &&
  //                 e.SetTextObject(- 2)
  //               ) : n.textid = t.codes[a].data.tuniqueid
  //             );
  //           break;
  //         default:
  //           t.codes[a].code & SDF.SDF_BEGIN &&
  //             (
  //               a = SDF.ReadFrame(t, a, t.codes[a].code & SDF.SDF_MASK | SDF.SDF_END)
  //             )
  //       }
  //       a++
  //     }
  //     e.vertical &&
  //       l &&
  //       !S &&
  //       0 === e.arraylist.angle &&
  //       e.hooks.length &&
  //       (e.hooks[0].hookpt === g.SED_LR || e.hooks[0].hookpt === g.SED_LB) &&
  //       (
  //         e.hooks[0].hookpt === g.SED_LR ? e.hooks[0].hookpt = g.SED_LL : e.hooks[0].hookpt = g.SED_LT,
  //         e.arraylist.styleflags = Utils2.SetFlag(e.arraylist.styleflags, D.SEDA_ReverseCol, !0),
  //         e.arraylist.hook.length >= d &&
  //         (
  //           e.arraylist.hook[h.A_Cl].gap = e.arraylist.hook[h.A_Cr].gap,
  //           e.arraylist.hook[h.A_Cr].gap = 0
  //         )
  //       ),
  //       S &&
  //       e.hooks.length &&
  //       e.arraylist.hook.length >= d &&
  //       (
  //         e.hooks[0].hookpt !== g.SED_LL &&
  //         e.hooks[0].hookpt !== g.SED_LT ||
  //         e.arraylist.hook[h.A_Cl].gap !== e.arraylist.wd &&
  //         (
  //           e.arraylist.flags = ConstantData.Array_Flags.Array_LeaveA_Cl
  //         ),
  //         e.hooks[0].hookpt !== g.SED_LR &&
  //         e.hooks[0].hookpt !== g.SED_LB ||
  //         e.arraylist.hook[h.A_Cl].gap !== e.arraylist.wd &&
  //         (
  //           e.arraylist.flags = ConstantData.Array_Flags.Array_LeaveA_Cr
  //         )
  //       )
  //   } else r.error = SDF.Errors.BadFormat,
  //     a = - 1;
  //   return a
  // }

  // static ReadContainerList(e, t, a, r, i) {
  //   if (e.ContainerList) {
  //     var n,
  //       o = e.ContainerList;
  //     for (
  //       o.Arrangement = t.codes[a].data.Arrangement,
  //       o.HorizontalSpacing = t.codes[a].data.HorizontalSpacing,
  //       o.VerticalSpacing = t.codes[a].data.VerticalSpacing,
  //       o.AlignH = t.codes[a].data.AlignH,
  //       o.AlignV = t.codes[a].data.AlignV,
  //       o.Wrap = t.codes[a].data.Wrap,
  //       o.height = t.codes[a].data.height,
  //       o.width = t.codes[a].data.width,
  //       o.MinWidth = t.codes[a].data.MinWidth,
  //       o.MinHeight = t.codes[a].data.MinHeight,
  //       o.flags = t.codes[a].data.flags,
  //       o.nacross = t.codes[a].data.nacross,
  //       o.ndown = t.codes[a].data.ndown,
  //       o.childwidth = t.codes[a].data.childwidth,
  //       o.childheight = t.codes[a].data.childheight,
  //       a++;
  //       t.codes[a].code != FileParser.SDROpCodesByName.SDF_C_DRAWCONTAINER_END;
  //     ) {
  //       if (t.codes[a].code === i.SDF_C_DRAWCONTAINERHOOK) (n = new ContainerListShape()).id = t.codes[a].data.id,
  //         n.pt.x = t.codes[a].data.x,
  //         n.pt.y = t.codes[a].data.y,
  //         null != t.codes[a].data.extra &&
  //         (n.extra = t.codes[a].data.extra),
  //         o.List.push(n);
  //       a++
  //     }
  //   }
  //   return a
  // }

  // static CreateLineObject(e, t, a) {
  //   var r,
  //     i;
  //   switch (
  //   e.StartPoint = {},
  //   e.EndPoint = {},
  //   i = t.lfixedpoint ? SDF.ToSDJSCoords(t.lfixedpoint, a.coordScaleFactor) : SDF.ToSDJSCoords(t.fixedpoint, a.coordScaleFactor),
  //   t.dataclass
  //   ) {
  //     case FileParser.LineSubclass.SED_LCH:
  //       a.GroupOffset.y &&
  //         (i += a.GroupOffset.y),
  //         e.StartPoint.x = e.Frame.x,
  //         e.StartPoint.y = i,
  //         e.EndPoint.x = e.Frame.x + e.Frame.width,
  //         e.EndPoint.y = i;
  //       break;
  //     case FileParser.LineSubclass.SED_LCD:
  //       t.flags & ConstantData.ObjFlags.SEDO_Obj1 ? (
  //         e.StartPoint.x = e.Frame.x,
  //         e.StartPoint.y = e.Frame.y + e.Frame.height,
  //         e.EndPoint.x = e.Frame.x + e.Frame.width,
  //         e.EndPoint.y = e.Frame.y,
  //         t.flags = Utils2.SetFlag(t.flags, ConstantData.ObjFlags.SEDO_Obj1, !1)
  //       ) : (
  //         e.StartPoint.x = e.Frame.x,
  //         e.StartPoint.y = e.Frame.y,
  //         e.EndPoint.x = e.Frame.x + e.Frame.width,
  //         e.EndPoint.y = e.Frame.y + e.Frame.height
  //       );
  //       break;
  //     case FileParser.LineSubclass.SED_LCV:
  //       a.GroupOffset.x &&
  //         (i += a.GroupOffset.x),
  //         e.StartPoint.y = e.Frame.y,
  //         e.StartPoint.x = i,
  //         e.EndPoint.y = e.Frame.y + e.Frame.height,
  //         e.EndPoint.x = i
  //   }
  //   switch (t.ShortRef) {
  //     case ConstantData2.LineTypes.SED_LS_None:
  //     case ConstantData2.LineTypes.SED_LS_Comm:
  //     case ConstantData2.LineTypes.SED_LS_Digi:
  //     case ConstantData2.LineTypes.SED_LS_Wall:
  //     case ConstantData2.LineTypes.SED_LS_MeasuringTape:
  //       e.ShortRef = t.ShortRef,
  //         r = new Instance.Shape.Line(e);
  //       break;
  //     case ConstantData2.LineTypes.SED_LS_Chord:
  //       e.CurveAdjust = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
  //         t.dataclass === ConstantData2.LineSubclass.SED_LCV &&
  //         (e.CurveAdjust = - e.CurveAdjust),
  //         e.CurveAdjust < 0 &&
  //         (e.IsReversed = !0, e.CurveAdjust = - e.CurveAdjust),

  //         r = new Instance.Shape.ArcLine(e)
  //   }
  //   return r
  // }

  static CreateShapeObject(e, t, a, r) {
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
      case PolygonConstant.ShapeTypes.RECTANGLE:
        SDF.SetCurvature(a, e, !1);
      case PolygonConstant.ShapeTypes.OVAL:
      case PolygonConstant.ShapeTypes.CIRCLE:
      case PolygonConstant.ShapeTypes.ROUNDED_RECTANGLE:
        i = t.dataclass;
        break;
      case PolygonConstant.ShapeTypes.POLYGON:
        i = PolygonConstant.ShapeTypes.POLYGON;
        break;
      case PolygonConstant.ShapeTypes.DIAMOND:
        i = PolygonConstant.ShapeTypes.POLYGON,
          n = PolygonShapeGenerator.generateDiamond(e.Frame, 0);
        break;
      case PolygonConstant.ShapeTypes.TRIANGLE:
        i = PolygonConstant.ShapeTypes.POLYGON,
          n = PolygonShapeGenerator.generateTriangle(e.Frame, 0);
        break;
      case PolygonConstant.ShapeTypes.TRIANGLE_BOTTOM:
        i = PolygonConstant.ShapeTypes.POLYGON,
          n = PolygonShapeGenerator.generateTriangleDown(e.Frame, 0);
        break;
      case PolygonConstant.ShapeTypes.PARALLELOGRAM:
        i = PolygonConstant.ShapeTypes.POLYGON,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          n = PolygonShapeGenerator.generateParallelogram(e.Frame, l);
        break;
      case PolygonConstant.ShapeTypes.PENTAGON:
        i = PolygonConstant.ShapeTypes.POLYGON,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          (s = S / 2) &&
          (l = S / 2 * (l / s)),
          n = PolygonShapeGenerator.generatePentagon(e.Frame, l);
        break;
      case PolygonConstant.ShapeTypes.PENTAGON_LEFT:
        i = PolygonConstant.ShapeTypes.POLYGON,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          (s = c / 2) &&
          (l = c / 2 * (l / s)),
          n = PolygonShapeGenerator.generatePentagonLeft(e.Frame, l);
        break;
      case PolygonConstant.ShapeTypes.HEXAGON:
        i = PolygonConstant.ShapeTypes.POLYGON,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          (s = c / 2) &&
          (l = c / 2 * (l / s)),
          n = PolygonShapeGenerator.generateHexagon(e.Frame, l);
        break;
      case PolygonConstant.ShapeTypes.OCTAGON:
        i = PolygonConstant.ShapeTypes.POLYGON,
          (o = l * c) < (u = l * S) &&
          (u = o),
          c &&
          (u = c * (u / c)),
          e.shapeparam = l,
          l = u / S,
          o = u / c,
          n = PolygonShapeGenerator.generateOctagon(e.Frame, l, o);
        break;
      case PolygonConstant.ShapeTypes.ARROW_RIGHT:
        i = PolygonConstant.ShapeTypes.POLYGON,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          n = PolygonShapeGenerator.generateRightArrow(e.Frame, l);
        break;
      case PolygonConstant.ShapeTypes.ARROW_LEFT:
        i = PolygonConstant.ShapeTypes.POLYGON,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          n = PolygonShapeGenerator.generateLeftArrow(e.Frame, l);
        break;
      case PolygonConstant.ShapeTypes.ARROW_TOP:
        i = PolygonConstant.ShapeTypes.POLYGON,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          n = PolygonShapeGenerator.generateTopArrow(e.Frame, l);
        break;
      case PolygonConstant.ShapeTypes.ARROW_BOTTOM:
        i = PolygonConstant.ShapeTypes.POLYGON,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          n = PolygonShapeGenerator.generateBottomArrow(e.Frame, l);
        break;
      case PolygonConstant.ShapeTypes.TRAPEZOID:
        i = PolygonConstant.ShapeTypes.POLYGON,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          n = PolygonShapeGenerator.generateTrapezoid(e.Frame, l);
        break;
      case PolygonConstant.ShapeTypes.TRAPEZOID_BOTTOM:
        i = PolygonConstant.ShapeTypes.POLYGON,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          n = PolygonShapeGenerator.generateTrapezoidDown(e.Frame, l);
        break;
      case PolygonConstant.ShapeTypes.INPUT:
        i = PolygonConstant.ShapeTypes.POLYGON,
          l = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = l,
          n = PolygonShapeGenerator.generateInput(e.Frame, l);
        break;
      case PolygonConstant.ShapeTypes.TERMINAL:
        i = PolygonConstant.ShapeTypes.POLYGON,
          n = PolygonShapeGenerator.generateTerminal(e.Frame, l);
        break;
      case PolygonConstant.ShapeTypes.STORAGE:
        i = PolygonConstant.ShapeTypes.POLYGON,
          u = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = u,
          n = PolygonShapeGenerator.generateStorage(e.Frame, e.shapeparam, u);
        break;
      case PolygonConstant.ShapeTypes.DOCUMENT:
        i = PolygonConstant.ShapeTypes.POLYGON,
          u = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = u,
          n = PolygonShapeGenerator.generateDocument(e.Frame, u);
        break;
      case PolygonConstant.ShapeTypes.DELAY:
        i = PolygonConstant.ShapeTypes.POLYGON,
          u = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = u,
          n = PolygonShapeGenerator.generateDelay(e.Frame, u);
        break;
      case PolygonConstant.ShapeTypes.DISPLAY:
        i = PolygonConstant.ShapeTypes.POLYGON,
          u = SDF.ToSDJSCoords(e.shapeparam, a.coordScaleFactor),
          e.shapeparam = u,
          n = PolygonShapeGenerator.generateDisplay(e.Frame, u)
    }
    switch (
    r & (
      ConstantData.ExtraFlags.SEDE_FlipHoriz | ConstantData.ExtraFlags.SEDE_FlipVert
    ) &&
    n &&
    (n = T3Gv.optManager.FlipVertexArray(n, r)),
    i
    ) {
      case PolygonConstant.ShapeTypes.RECTANGLE:
        p = new Instance.Shape.Rect(e);
        break;
      case PolygonConstant.ShapeTypes.ROUNDED_RECTANGLE:
        p = new Instance.Shape.RRect(e);
        break;
      case PolygonConstant.ShapeTypes.OVAL:
      case PolygonConstant.ShapeTypes.CIRCLE:
        (p = new Instance.Shape.Oval(e)).dataclass = i;
        break;
      default:
        e.VertexArray = n,
          (p = new Instance.Shape.Polygon(e)).dataclass = i
    }
    return p
  }



  // static ReadGraph(e, t, a, r, i, n) {

  //   console.log('static      ReadGraph === ', e, t, a, r, i, n)
  //   var o,
  //     s,
  //     l,
  //     S,
  //     c,
  //     u = null,
  //     p = null,
  //     d = null,
  //     D = null,
  //     g = null,
  //     h = null,
  //     m = 0;
  //   r.lpStyles.length;
  //   for (
  //     o = t.codes[a].data,
  //     e.stackScale = o.stackScale,
  //     e.valuePrecision = o.valuePrecision,
  //     e.pieChartCategory = o.pieChartCategory,
  //     e.pieOriginTangle = SDF.ToWinAngle(o.pieOriginTangle),
  //     e.flags = o.flags,
  //     e.pointflags = o.pointflags,
  //     e.prefixChar = o.prefixChar,
  //     e.graphtype = o.graphtype,
  //     e.quadrant = o.quadrant,
  //     e.barAreaAmount = o.barAreaAmount,
  //     e.barAreaAmountStacked = o.barAreaAmountStacked,
  //     e.imageValueRep = o.imageValueRep,
  //     e.graphLegendType = o.graphLegendType,
  //     e.npoints = 0,
  //     e.index = - 1,
  //     e.areaBGImageID = - 1,
  //     e.bgImageID = - 1,
  //     e.perspectiveView3D = o.perspectiveView3D,
  //     e.effectLightDirection3D = o.effectLightDirection3D,
  //     e.suffixChar = o.suffixChar,
  //     e.style = Utils1.DeepCopy(r.sdp.def.style),
  //     e.areaStyle = Utils1.DeepCopy(r.sdp.def.style),
  //     e.gridStyle = Utils1.DeepCopy(r.sdp.def.style),
  //     g = null,
  //     u = e.style,
  //     D = e.graphtitle,
  //     a++;
  //     t.codes[a].code != n;
  //   ) {
  //     switch (t.codes[a].code) {
  //       case i.SDF_C_GRAPH_AXIS:
  //         s = SDF.ReadGraphAxis(t.codes[a].data, r, i),
  //           e.axes.push(s),
  //           D = e.axes[e.axes.length - 1].title,
  //           u = e.axes[e.axes.length - 1].style,
  //           h = e.axes[e.axes.length - 1];
  //         break;
  //       case i.SDF_C_GRAPH_TITLE:
  //         SDF.ReadGraphTitle(D, t.codes[a].data, r, i),
  //           u = D.style,
  //           g = D;
  //         break;
  //       case i.SDF_C_GRAPH_LABEL:
  //         S = SDF.ReadGraphAxisLabel(t.codes[a].data, r, i),
  //           h.labels.push(S),
  //           g = h.labels[h.labels.length - 1];
  //         break;
  //       case i.SDF_C_GRAPH_LEGEND_BEGIN:
  //         D = e.graphlegendTitle;
  //         break;
  //       case i.SDF_C_GRAPH_LEGEND:
  //         c = SDF.ReadGraphLegendEntry(t.codes[a].data, r, i),
  //           e.graphLegend.push(c),
  //           g = e.graphLegend[e.graphLegend.length - 1],
  //           u = e.graphLegend[e.graphLegend.length - 1].style,
  //           p = e.graphLegend[e.graphLegend.length - 1];
  //         break;
  //       case i.SDF_C_GRAPH_LEGEND_END:
  //         D = null,
  //           p = null;
  //         break;
  //       case i.SDF_C_GRAPH_POINT:
  //         l = SDF.ReadGraphPoint(t.codes[a].data, r, i),
  //           e.gpoint.push(l),
  //           g = e.gpoint[e.gpoint.length - 1].label,
  //           pointToReceiveComment = e.gpoint[e.gpoint.length - 1],
  //           d = e.gpoint[e.gpoint.length - 1],
  //           u = e.gpoint[e.gpoint.length - 1].style;
  //         break;
  //       case i.SDF_C_DRAWJUMP:
  //         g.HyperlinkText = t.codes[a].data.name;
  //         break;
  //       case i.SDF_C_COMMENT:
  //         a = SDF.ReadText(null, g, null, t, a, r, i, !0, i.SDF_C_COMMENT_END);
  //         break;
  //       case i.SDF_C_BEGIN_STYLE:
  //         a = SDF.ReadStyle(u, t, a, r, i),
  //           1 === ++m ? u = e.areaStyle : 2 === m ? u = e.gridStyle : null !== p ? u = p.labelStyle : null !== d &&
  //             (u = d.label.style);
  //         break;
  //       case i.SDF_C_LONGTEXT8:
  //         a = SDF.ReadText(null, g, null, t, a, r, i, !1, i.SDF_C_TEXT_END);
  //         break;
  //       case i.SDF_O_TEXTURELIST:
  //         a = SDF.ReadTextureList(t, a, r, i, !1),
  //           e.txList = r.TextureList.Textures
  //     }
  //     a++
  //   }
  //   return a
  // }

  // static ReadGraphAxis(e, t, a) {
  //   var r = new ListManager.Graph.Axis;
  //   return r.orientation = e.orientation,
  //     r.flags = e.flags,
  //     r.lflags = e.lflags,
  //     r.summaryflags = e.summaryflags,
  //     r.fixedpoint = e.fixedpoint,
  //     r.frame = SDF.ToSDJSRect(e.frame, t.coordScaleFactor),
  //     r.margin = SDF.ToSDJSCoords(e.margin, t.coordScaleFactor),
  //     r.startpref = e.startpref,
  //     r.endpref = e.endpref,
  //     r.start = e.start,
  //     r.end = e.end,
  //     r.major = e.major,
  //     r.majorscale = SDF.ToSDJSCoords(e.majorscale, t.coordScaleFactor),
  //     r.minor = e.minor,
  //     r.minorscale = SDF.ToSDJSCoords(e.minorscale, t.coordScaleFactor),
  //     r.tickstyles = e.tickstyles,
  //     r.labelformat = e.labelformat,
  //     r.majorpref = e.majorpref,
  //     r.minorpref = e.minorpref,
  //     r.style = Utils1.DeepCopy(t.sdp.def.style),
  //     r
  // }

  // static ReadGraphPoint(e, t, a) {
  //   var r = new ListManager.Graph.Point;
  //   return r.dataid = e.dataid,
  //     r.seriesid = e.seriesid,
  //     r.categoryid = e.categoryid,
  //     r.value = e.value,
  //     r.frame = SDF.ToSDJSRect(e.frame, t.coordScaleFactor),
  //     r.tangle = SDF.ToSDJSAngle(e.tangle),
  //     r.flags = e.flags,
  //     r.labelformat = e.labelformat,
  //     r.explodeAmt = SDF.ToSDJSCoords(e.explodeAmt, t.coordScaleFactor),
  //     r.labelstyle = e.labelstyle,
  //     r.imagescale = e.imagescale,
  //     r.imagerect = SDF.ToSDJSRect(e.imagerect, t.coordScaleFactor),
  //     r.label = new ListManager.Graph.Axis.Label,
  //     r.label.textid = e.labelTextId,
  //     r.label.tangle = SDF.ToSDJSAngle(e.labelTangle),
  //     r.label.frame = SDF.ToSDJSRect(e.labelFrame, t.coordScaleFactor),
  //     r.label.center.x = SDF.ToSDJSCoords(e.labelCenter.x, t.coordScaleFactor),
  //     r.label.center.y = SDF.ToSDJSCoords(e.labelCenter.y, t.coordScaleFactor),
  //     r
  // }

  // static ReadGraphTitle(e, t, a, r) {
  //   return e.lflags = t.lflags,
  //     e.just = t.just,
  //     e.margin = SDF.ToSDJSCoords(t.margin, a.coordScaleFactor),
  //     e.frame = SDF.ToSDJSRect(t.frame, a.coordScaleFactor),
  //     e.tangle = SDF.ToSDJSAngle(t.tangle),
  //     e.drawpt = SDF.ToSDJSRect(t.drawpt, a.coordScaleFactor),
  //     e.center.x = SDF.ToSDJSCoords(t.center.x, a.coordScaleFactor),
  //     e.center.y = SDF.ToSDJSCoords(t.center.y, a.coordScaleFactor),
  //     e
  // }

  // static ReadGraphAxisLabel(e, t, a) {
  //   var r = new ListManager.Graph.Axis.Label;
  //   return r.lflags = e.lflags,
  //     r.categoryid = e.categoryid,
  //     r.frame = SDF.ToSDJSRect(e.frame, t.coordScaleFactor),
  //     r.tangle = SDF.ToSDJSAngle(e.tangle),
  //     r.center.x = SDF.ToSDJSCoords(e.center.x, t.coordScaleFactor),
  //     r.center.y = SDF.ToSDJSCoords(e.center.y, t.coordScaleFactor),
  //     r.just = e.just,
  //     r.vjust = e.vjust,
  //     r
  // }

  // static ReadGraphLegendEntry(e, t, a) {
  //   var r = new ListManager.Graph.LegendEntry;
  //   return r.seriesid = e.seriesid,
  //     r.flags = e.flags,
  //     r.lflags = e.lflags,
  //     r.imgIndx = e.imgIndx,
  //     r.textFrame = SDF.ToSDJSRect(e.textFrame, t.coordScaleFactor),
  //     r.swatchFrame = SDF.ToSDJSRect(e.swatchFrame, t.coordScaleFactor),
  //     r
  // }



  // static BuildColorChanges(e, t) {
  //   if (t.SetColorChanges) {
  //     var a = FileParser.SDRColorFilters;
  //     0 === t.ColorFilter &&
  //       (
  //         e.colorchanges = a.SD_NOCOLOR_FILL | a.SD_NOCOLOR_TEXTURE | a.SD_NOCOLOR_LINE | a.SD_NOCOLOR_LINETHICK | a.SD_NOCOLOR_LINEPAT | a.SD_NOCOLOR_STYLE
  //       )
  //   }
  // }

  static ReadObjectHeader(e, t, a, r, i, n, o, s) {
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
        (g = T3Gv.optManager.GetObjectPtr(D, !1)) &&
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
              new Instance.Shape.GroupSymbol(m)
              : m.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ?
                new Instance.Shape.PolyLineContainer(m)
                : n ?
                  new Instance.Shape.SVGFragmentSymbol(m)
                  : m.objecttype === ConstantData.ObjectTypes.SD_OBJT_D3SYMBOL ?
                    new Instance.Shape.D3Symbol(m)
                    : m.objecttype === ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER ?
                      new Instance.Shape.ShapeContainer(m)
                      : SDF.CreateShapeObject(m, a, r, a.extraflags)
          ).ResizeAspectConstrain = a.objgrow === ConstantData.GrowBehavior.PROPORTIONAL;
        break;
      case FileParser.ObjectTypes.SED_LineD:
        l = SDF.CreateLineObject(m, a, r);
        break;
      case FileParser.ObjectTypes.SED_SegL:
        l = a.dataclass === FileParser.SeglTypes.SED_L_Arc ?
          new Instance.Shape.ArcSegmentedLine(m) :
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
          l = new Instance.Shape.Connector(m);
        break;
      case FileParser.ObjectTypes.SED_PolyL:
        l = m.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ?
          new Instance.Shape.PolyLineContainer(m) :
          new Instance.Shape.PolyLine(m);
        break;
      case FileParser.ObjectTypes.SED_Freehand:
        l = new Instance.Shape.FreehandLine(m);
    }
    if (l) if (
      SDF.DefaultObject(e, l),
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
  }



  static ReadLayers(e, t, a, r) {
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
  }

  // static ReadRecentSymbols(e, t, a, r) {
  //   var i,
  //     n,
  //     o = !1,
  //     s = null;
  //   for (
  //     t++,
  //     a.sdp.RecentSymbols = [];
  //     e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_RECENTSYMBOLS_END;
  //   ) {
  //     switch (e.codes[t].code) {
  //       case r.SDF_C_RECENTSYMBOL_ID:
  //         s = e.codes[t].data.name;
  //         break;
  //       case r.SDF_C_RECENTSYMBOL_NOMENU:
  //         n = e.codes[t].data.name,
  //           o = !!parseInt(n);
  //         break;
  //       case r.SDF_C_RECENTSYMBOL_NAME:
  //         i = new RecentSymbol(s, e.codes[t].data.name, o),
  //           a.sdp.RecentSymbols.push(i)
  //     }
  //     t++
  //   }
  //   return t
  // }

  // static ReadToolPalettes(e, t, a, r) {
  //   var i,
  //     n;
  //   for (
  //     t++;
  //     e.codes[t].code != FileParser.SDROpCodesByName.SDF_C_TOOLPALETTES_END;
  //   ) {
  //     switch (e.codes[t].code) {
  //       case r.SDF_C_TOOLPALETTES_NAME:
  //         i = e.codes[t].data.name;
  //         break;
  //       case r.SDF_C_TOOLPALETTES_COLLAPSED:
  //         n = 1 === (n = e.codes[t].data.collapsed),
  //           a.PaletteStatus[i] = n
  //     }
  //     t++
  //   }
  //   return t
  // }

  // static WriteLocalFile(e) {
  //   var t = function (e) {
  //   },
  //     a = function (a) {
  //       function r(e) {
  //         e.createWriter(i, t)
  //       }
  //       function i(t) {
  //         t.write(e)
  //       }
  //       a.root.getFile(
  //         'test.sdr',
  //         {
  //           create: !0
  //         },
  //         (
  //           function (e) {
  //             e.remove((function () {
  //               a.root.getFile('test.sdr', {
  //                 create: !0
  //               }, r, t)
  //             }), t)
  //           }
  //         ),
  //         t
  //       )
  //     };
  //   navigator.webkitPersistentStorage.requestQuota(
  //     4194304,
  //     (
  //       function (e) {
  //         (window.requestFileSystem || window.webkitRequestFileSystem)(PERSISTENT, e, a, t)
  //       }
  //     )
  //   )
  // }



  static WriteSelect(e, t, a, r, i) {
    var n = new SDF.WResult;
    n.sdp = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
      n.tLMB = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1),
      n.ctp = T3Gv.optManager.theContentHeader,
      n.selectonly = !0,
      r &&
      (n.KeepSegDir = !0);
    T3Gv.docUtil.svgDoc.GetWorkArea();
    return n.docDpi = T3Gv.docUtil.svgDoc.docInfo.docDpi,
      n.zList = e,
      n.noTables = t,
      n.RichGradients = T3Gv.optManager.RichGradients,
      T3Gv.optManager.UpdateObjectLayerIndices(n),
      SDF.WriteBuffer(n, !0, !0, i)
  }

  static WResult = function () {
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
      this.rulerConfig = null,
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
  }

  static WriteBuffer(e, t, a, r) {
    FileParser.SDROpCodesByName;
    var i = new ArrayBuffer(10),
      n = new T3DataStream(i);
    if (
      n.endianness = T3DataStream.LITTLE_ENDIAN,
      n.writeCString(SDF.Signature, SDF.Signature.length),
      e.WriteVisio ||
        e.WriteWin32 ? (
        SDF.Write_SDF_C_VERSION(n, FileParser.Platforms.SDF_SDJS, SDF.FVERSION2015),
        e.coordScaleFactor = SDF.DRAWRES / T3Gv.docUtil.svgDoc.docInfo.docDpi
      ) : SDF.Write_SDF_C_VERSION(
        n,
        FileParser.Platforms.SDF_SDJS,
        T3Gv.optManager.FileVersion
      ),
      e.rulerConfig = T3Gv.docUtil.rulerConfig,
      e.rulerConfig.show = T3Gv.docUtil.docConfig.showRulers,
      t
    ) {
      if (SDF.WriteSelectHeader(n, e), e.error) return null
    } else if (SDF.WriteHeader(n, e, null), e.error) return null;
    return T3Gv.optManager.theContentHeader.SDDataID >= 0 &&
      !r &&
      SDF.WriteSDDATA(n, e),
      SDF.WriteDraw(n, e),
      e.error ? null : (
        n.writeUint16(FileParser.SDROpCodesByName.SDF_C_ENDFILE),
        t ||
          a ? n.buffer : new Blob([n.buffer])
      )
  }



  static HTMLColorToWin(e, t) {
    for (var a, r = e.replace('#', ''); r.length < 6;) r += r[0];
    return a = parseInt(r.slice(0, 2), 16) + (parseInt(r.slice(2, 4), 16) << 8) + (parseInt(r.slice(4, 6), 16) << 16),
      void 0 === t &&
      (t = 1),
      t = 1 - t,
      (t = Math.round(255 * t)) &&
      (a |= t << 24),
      a
  }



  static BlockIDtoUniqueID(e, t) {
    return t.WriteBlocks ? e : t.UniqueMap.indexOf(e) + 1
  }

  static Write_SDF_C_VERSION(e, t, a) {
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
  }

  static WriteHeader(e, t, a) {
    var r,
      i = FileParser.SDROpCodesByName,
      n = "";
    SDF.write_SDF_C_HEADER(e, t),
      SDF.write_SDF_C_PAGE(e, t),
      null == a &&
      (
        t.WriteBlocks ||
        SDF.WriteString(
          e,
          T3Gv.optManager.theContentHeader.importSourcePath,
          i.SDF_C_IMPORT_SOURCE_PATH,
          t
        ),
        SDF.WriteString(e, n, i.SDF_C_EXPORTPATH, t)
      ),
      // null != a &&
      // - 1 == a.indexOf(i.SDF_C_LEFTPANELINFO) ||
      // SDF.WriteLeftPanelMode(e, t),
      // null != a &&
      // - 1 == a.indexOf(i.SDF_C_HILITELIST) ||
      // SDF.WriteHiliteList(e, t),
      // null != a &&
      // - 1 == a.indexOf(i.SDF_C_TOOLPALETTES_BEGIN) ||
      // SDF.WritePaletteList(e, t),
      // (
      //   null == a ||
      //   - 1 != a.indexOf(i.SDF_C_LIBLIST) ||
      //   - 1 != a.indexOf(i.SDF_C_LIBLIST7)
      // ) &&
      // SDF.WriteLibraryListFromContentHeader(e, t),
      // null != a &&
      // - 1 == a.indexOf(i.SDF_C_HILITELIST) ||
      // SDF.WriteHiliteList(e, t),
      // false === true &&
      // (
      //   null != a &&
      //   - 1 == a.indexOf(i.SDF_C_TASKPANEL) ||
      //   SDF.WriteString(
      //     e,
      //     T3Gv.optManager.theContentHeader.smartpanelname,
      //     i.SDF_C_TASKPANEL,
      //     t
      //   )
      // ),
      null != a &&
      - 1 == a.indexOf(i.SDF_C_BUSINESSMODULE) ||
      SDF.WriteString(
        e,
        T3Gv.optManager.theContentHeader.BusinessModule,
        i.SDF_C_BUSINESSMODULE,
        t
      ),
      null != a &&
      - 1 == a.indexOf(i.SDF_C_SYMBOLSEARCHSTRING) ||
      SDF.WriteString(
        e,
        T3Gv.optManager.theContentHeader.SymbolSearchString,
        FileParser.SDROpCodesByName.SDF_C_SYMBOLSEARCHSTRING,
        t
      ),
      // null != a &&
      // - 1 == a.indexOf(i.SDF_C_HEAD_UIINFO) ||
      // SDF.WriteUIInfo(e, t),
      null != a &&
      - 1 == a.indexOf(i.SDF_C_ORGCHARTTABLE) ||
      T3Gv.optManager.theContentHeader.orgcharttable.length &&
      (
        (
          r = ListManager.OrgChartTables.indexOf(T3Gv.optManager.theContentHeader.orgcharttable)
        ) >= 0 ? SDF.WriteString(
          e,
          ListManager.WinOrgChartTables[r],
          i.SDF_C_ORGCHARTTABLE,
          t
        ) : (
          r = ListManager.MindMapTables.indexOf(T3Gv.optManager.theContentHeader.orgcharttable)
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
          T3Gv.optManager.theContentHeader.orgcharttable,
          i.SDF_C_ORGCHARTTABLE,
          t
        )
      ),
      // null != a &&
      // - 1 == a.indexOf(i.SDF_C_BEGIN_THEME12) ||
      // SDF.WriteTheme(e, Resources.CurrentTheme, t),
      null == a &&
      SDF.WriteString(
        e,
        T3Gv.optManager.theContentHeader.smarthelpname,
        FileParser.SDROpCodesByName.SDF_C_GUIDE,
        t
      ),
      null == a &&
      T3Gv.optManager.theContentHeader.ParentPageID.length &&
      SDF.WriteString(
        e,
        T3Gv.optManager.theContentHeader.ParentPageID,
        FileParser.SDROpCodesByName.SDF_C_PARENTPAGEID,
        t
      ),
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_HEADER_END)
  }

  static WriteString(e, t, a, r) {
    if (null != t && t.length) {
      var i = SDF.Write_CODE(e, a);
      e.writeUCS2String(t, T3DataStream.LITTLE_ENDIAN, t.length + 1),
        SDF.Write_LENGTH(e, i)
    }
  }

  static WriteString8(e, t, a, r) {
    if (t.length) {
      var i = SDF.Write_CODE(e, a);
      e.writeString(t, 'ASCII', t.length + 1),
        SDF.Write_LENGTH(e, i)
    }
  }

  static WriteSelectHeader(e, t) {
    t.WriteGroupBlock ||
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_HEADER_END)
  }

  static write_SDF_C_HEADER(e, t) {
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
  }

  static write_SDF_C_PAGE(e, t) {
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
  }

  static JStoWinLineTool(e) {
    var t = SDUI.WindowsLineTools.indexOf(e);
    return t < 0 &&
      (t = 0),
      t === SDUI.WindowsLineTools.indexOf(Resources.LineToolTypes.PolyLine) &&
      t++,
      t
  }

  static JStoWinShapeTool(e) {
    var t = SDUI.WindowsShapeTools.indexOf(e);
    return t < 0 &&
      (t = 0),
      t
  }




  static WriteUIInfo(e, t) {
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
      holidaymask: T3Gv.optManager.theContentHeader.holidaymask,
      datetime1: 0,
      datetime2: 0,
      nonworkingdays: T3Gv.optManager.theContentHeader.nonworkingdays,
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
  }

  static WriteSearchResultLibrary(e, t, a) {
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
  }

  // static WriteLibraryListFromContentHeader(e, t) {
  //   var a,
  //     r,
  //     i,
  //     n,
  //     o = T3Gv.optManager.theContentHeader.lp_list;
  //   r = o.lib.length,
  //     o.selected;
  //   var s = {
  //     selected: 0,
  //     nacross: 3
  //   },
  //     l = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_LIBLIST);
  //   e.writeStruct(FileParser.SDF_LibList_Struct, s),
  //     SDF.Write_LENGTH(e, l);
  //   var S,
  //     c = SDUI.Commands.MainController.Symbols.GetSelectedButton();
  //   for (
  //     null != c &&
  //     gBusinessManager.UsesCurrentSymbol() &&
  //     SDF.WriteString(
  //       e,
  //       c,
  //       FileParser.SDROpCodesByName.SDF_C_CURRENTSYMBOL_ID,
  //       t
  //     ),
  //     a = 0;
  //     a < r;
  //     a++
  //   ) null != o.lib[a] &&
  //     (
  //       o.lib[a].SearchResults ? (
  //         n = SDUI.Commands.MainController.Symbols.GetLibrary(o.lib[a].libGuid)
  //       ) &&
  //         SDF.WriteSearchResultLibrary(e, t, n) : o.lib[a].libGuid ? SDF.WriteString(
  //           e,
  //           o.lib[a].libGuid,
  //           FileParser.SDROpCodesByName.SDF_C_LIBLIST_GUID,
  //           t
  //         ) : (i = o.lib[a].libname) &&
  //       SDF.WriteString(e, i, FileParser.SDROpCodesByName.SDF_C_LIBLIST_PATH, t),
  //       o.lib[a].Collapsed &&
  //       SDF.WriteLongValue(e, FileParser.SDROpCodesByName.SDF_C_LIB_COLLAPSED, 1, t)
  //     );
  //   for (
  //     r = SDUI.Commands.MainController.Symbols.SymbolSearch_GetNumberOfLibraries(),
  //     a = 0;
  //     a < r;
  //     a++
  //   ) (
  //     S = SDUI.Commands.MainController.Symbols.SymbolSearch_GetLibraryInfo(a)
  //   ).ID.length > 0 &&
  //     (
  //       SDF.WriteString(
  //         e,
  //         S.ID,
  //         FileParser.SDROpCodesByName.SDF_C_LIBLIST_SEARCH_RESULT_ID,
  //         t
  //       ),
  //       S.Collapsed &&
  //       SDF.WriteLongValue(
  //         e,
  //         FileParser.SDROpCodesByName.SDF_C_SEARCHLIB_COLLAPSED,
  //         1,
  //         t
  //       ),
  //       S.Hidden &&
  //       SDF.WriteLongValue(
  //         e,
  //         FileParser.SDROpCodesByName.SDF_C_SEARCHLIB_HIDDEN,
  //         1,
  //         t
  //       )
  //     );
  //   e.writeUint16(FileParser.SDROpCodesByName.SDF_C_LIBLIST_END)
  // }

  // static WritePaletteList(e, t) {
  //   var a = SDUI.Commands.MainController.SmartPanels.GetPaletteList();
  //   if (a.length) {
  //     var r,
  //       i,
  //       n,
  //       o = a.length,
  //       s = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TOOLPALETTES_BEGIN);
  //     for (SDF.Write_LENGTH(e, s), r = 0; r < o; r++) SDF.WriteString(
  //       e,
  //       a[r].Name,
  //       FileParser.SDROpCodesByName.SDF_C_TOOLPALETTES_NAME,
  //       t
  //     ),
  //       n = SDF.Write_CODE(
  //         e,
  //         FileParser.SDROpCodesByName.SDF_C_TOOLPALETTES_COLLAPSED
  //       ),
  //       i = {
  //         value: a[r].Collapsed
  //       },
  //       e.writeStruct(FileParser.LONGVALUE_Struct, i),
  //       SDF.Write_LENGTH(e, n);
  //     e.writeUint16(FileParser.SDROpCodesByName.SDF_C_TOOLPALETTES_END)
  //   }
  // }

  // static WriteLeftPanelMode(e, t) {
  //   var a = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_LEFTPANELINFO),
  //     r = {
  //       value: SDUI.Commands.MainController.SmartPanels.GetLeftPanelMode()
  //     };
  //   e.writeStruct(FileParser.LONGVALUE_Struct, r),
  //     SDF.Write_LENGTH(e, a)
  // }

  static WriteNativeID(e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_NATIVEID),
      i = {
        value: t
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, r)
  }

  static WriteTableID(e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TABLEID),
      i = {
        value: t
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, r)
  }

  static WriteLongValue(e, t, a, r) {
    var i = SDF.Write_CODE(e, t),
      n = {
        value: a
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, n),
      SDF.Write_LENGTH(e, i)
  }

  static WriteGraphID(e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPHID),
      i = {
        value: t
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, r)
  }

  static WriteExpandedViewID(e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_EXPANDEDVIEWID),
      i = {
        value: t
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, r)
  }

  static WriteGanttInfoID(e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GANTTINFOID),
      i = {
        value: t
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, r)
  }

  static WriteCellNoteID(e, t, a) {
    var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_NOTEID),
      i = {
        value: t
      };
    e.writeStruct(FileParser.LONGVALUE_Struct, i),
      SDF.Write_LENGTH(e, r)
  }

  static WriteBlobBytesID(e, t, a, r) {
    var i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_IMAGEID),
      n = {
        value: t,
        type: a
      };
    e.writeStruct(FileParser.LONGVALUE2_Struct, n),
      SDF.Write_LENGTH(e, i)
  }

  static WriteEMFBlobBytesID(e, t, a, r) {
    var i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_EMFID),
      n = {
        value: t,
        type: a
      };
    e.writeStruct(FileParser.LONGVALUE2_Struct, n),
      SDF.Write_LENGTH(e, i)
  }

  static WriteOleBlobBytesID(e, t, a, r) {
    var i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_OLESTORAGEID),
      n = {
        value: t,
        type: a
      };
    e.writeStruct(FileParser.LONGVALUE2_Struct, n),
      SDF.Write_LENGTH(e, i)
  }

  static GetFontID(e, t) {
    var a,
      r;
    for (a = t.length, r = 0; r < a; r++) if (e === t[r].fontName) return r;
    return 0
  }

  static BuildBlockFontList(e) {
    var t,
      a,
      r;
    for (t = Resources.WebFonts.length, a = 0; a < t; a++) r = new SDF.FontRecord(
      a,
      Resources.WebFonts[a].Name,
      Resources.WebFonts[a].Category
    ),
      e.fontlist.push(r)
  }

  static FontRecToLogFont(e, t, a) {
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
  }



  static JSJustToWin(e) {
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
  }


  // static WriteFontList(e, t) {
  //   var a,
  //     r,
  //     i,
  //     n,
  //     o;
  //   for (
  //     a = t.fontlist.length,
  //     r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_FONTLIST),
  //     e.writeUint16(a),
  //     SDF.Write_LENGTH(e, r),
  //     i = 0;
  //     i < a;
  //     i++
  //   ) n = SDF.FontRecToLogFont(t.fontlist[i], i, t),
  //     o = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_FONTNAME15),
  //     e.writeStruct(FileParser.SDF_FONTNAME15_Struct, n),
  //     SDF.Write_LENGTH(e, o);
  //   e.writeUint16(FileParser.SDROpCodesByName.SDF_C_FONTLIST_END)
  // }

  // static WriteHiliteList(e, t) {
  //   var a,
  //     r,
  //     i,
  //     n,
  //     o,
  //     s,
  //     l = [];
  //   if (
  //     null != t.LibraryPathTarget &&
  //     !((a = t.LibraryPathTarget.length) < 2)
  //   ) {
  //     n = 'SYMBOL LIBRARIES',
  //       l.push(n),
  //       o = n = t.LibraryPathTarget.slice(1, a);
  //     do {
  //       (s = o.split('\\')).length > 1 &&
  //         (l.push(s[0].toUpperCase()), o = s[1])
  //     } while (s.length >= 2);
  //     for (
  //       l.push(n.toUpperCase()),
  //       a = l.length,
  //       r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_HILITELIST),
  //       e.writeUint32(a),
  //       SDF.Write_LENGTH(e, r),
  //       i = 0;
  //       i < a;
  //       i++
  //     ) r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_HILITE),
  //       e.writeUint32(0),
  //       e.writeUint32(0),
  //       e.writeUCS2String(l[i], T3DataStream.LITTLE_ENDIAN, l[i].length + 1),
  //       SDF.Write_LENGTH(e, r);
  //     e.writeUint16(FileParser.SDROpCodesByName.SDF_C_HILITELIST_END)
  //   }
  // }

  // static WriteLogFont(e, t, a, r) {
  //   var i = 0;
  //   switch (t.fontType) {
  //     case 'serif':
  //       i = FileParser.FontFamily.FF_ROMAN;
  //       break;
  //     case 'sanserif':
  //       i = FileParser.FontFamily.FF_SWISS;
  //       break;
  //     case 'fixed':
  //       i = FileParser.FontFamily.FF_MODERN;
  //       break;
  //     case 'script':
  //       i = FileParser.FontFamily.FF_SCRIPT;
  //       break;
  //     case 'decorative':
  //       i = FileParser.FontFamily.FF_DECORATIVE
  //   }
  //   var n = {
  //     lfHeight: - 36,
  //     lfWidth: 0,
  //     lfEscapement: 0,
  //     lfOrientation: 0,
  //     lfWeight: 400,
  //     lfItalic: 0,
  //     lfUnderline: 0,
  //     lfStrikeOut: 0,
  //     lfCharSet: 0,
  //     lfOutPrecision: 3,
  //     lfClipPrecision: 2,
  //     lfQuality: 1,
  //     lfPitchAndFamily: i,
  //     lfFaceName: t.fontName
  //   };
  //   t.fontSize &&
  //     (n.lfHeight = - 100 * t.fontSize * r.coordScaleFactor / 72),
  //     t.face &&
  //     (
  //       t.face & ConstantData.TextFace.Italic &&
  //       (n.lfItalic = 1),
  //       t.face & ConstantData.TextFace.Bold &&
  //       (n.lfWeight = 700),
  //       t.face & ConstantData.TextFace.Underline &&
  //       (n.lfUnderline = 1)
  //     );
  //   var o = SDF.Write_CODE(e, a);
  //   e.writeStruct(FileParser.SDF_LOGFONT_Struct, n),
  //     SDF.Write_LENGTH(e, o)
  // }

  static WriteTextureList(e, t, a) {
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
  }

  // static SetHookByJust(e, t, a) {
  //   var r,
  //     i = FileParser.TextJust,
  //     n = ConstantData.HookPts,
  //     o = ConstantData.TextFlags,
  //     s = ConstantData.Defines.SED_CDim,
  //     l = {
  //       hookpt: 0,
  //       attach: 0
  //     };
  //   switch (e) {
  //     case i.TA_LEFT:
  //       switch (t) {
  //         case i.TA_TOP:
  //           r = n.SED_KCBL,
  //             l.attach = o.SED_TF_AttachA;
  //           break;
  //         case i.TA_BOTTOM:
  //           l.attach = o.SED_TF_AttachB,
  //             r = n.SED_KCTL;
  //           break;
  //         default:
  //           l.attach = o.SED_TF_AttachC,
  //             r = n.SED_KCL
  //       }
  //       a.x = 0,
  //         a.y = 0;
  //       break;
  //     case i.TA_RIGHT:
  //       switch (t) {
  //         case i.TA_TOP:
  //           r = n.SED_KCBR,
  //             l.attach = o.SED_TF_AttachA;
  //           break;
  //         case i.TA_BOTTOM:
  //           l.attach = o.SED_TF_AttachB,
  //             r = n.SED_KCTR;
  //           break;
  //         default:
  //           l.attach = o.SED_TF_AttachC,
  //             r = n.SED_KCR
  //       }
  //       a.x = s,
  //         a.y = s;
  //       break;
  //     default:
  //       switch (t) {
  //         case i.TA_TOP:
  //           l.attach = o.SED_TF_AttachA,
  //             r = n.SED_KCB;
  //           break;
  //         case i.TA_BOTTOM:
  //           l.attach = o.SED_TF_AttachB,
  //             r = n.SED_KCT;
  //           break;
  //         default:
  //           l.attach = o.SED_TF_AttachC,
  //             r = n.SED_KCC
  //       }
  //       a.x = s / 2,
  //         a.y = s / 2
  //   }
  //   return l.hookpt = r,
  //     l
  // }

  static WriteDraw(e, t) {
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
      SDF.WriteTextureList(e, T3Gv.optManager.TextureList, t),
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
            d = (n = T3Gv.optManager.GetObjectPtr(t.UniqueMap[h], !1)).arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear,
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
        } else (n = T3Gv.optManager.GetObjectPtr(t.UniqueMap[i - 1], !1)) &&
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
      } else (n = T3Gv.optManager.GetObjectPtr(D, !1)) &&
        (
          n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ? (h = i, m = n.BlockID) : (h = - 1, m = n.BlockID)
        );
      n &&
        SDF.WriteObject(e, i, n, t)
    }
    0 == t.WriteBlocks &&
      0 == t.selectonly,
      e.writeUint16(FileParser.SDROpCodesByName.SDF_C_DRAW12_END)
  }

  static WriteRulers(e, t) {
    var a = {
      show: t.rulerConfig.show,
      inches: t.rulerConfig.useInches,
      Major: SDF.ToSDWinCoords(t.rulerConfig.major, t.coordScaleFactor),
      MajorScale: t.rulerConfig.majorScale,
      MinorDenom: t.rulerConfig.nTics,
      units: t.rulerConfig.units,
      dp: t.rulerConfig.dp,
      originx: t.rulerConfig.originx,
      originy: t.rulerConfig.originy,
      showpixels: t.rulerConfig.showpixels,
      fractionaldenominator: t.rulerConfig.fractionaldenominator
    },
      r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_O_RULER);
    e.writeStruct(FileParser.SDF_RULER_Struct_52, a),
      SDF.Write_LENGTH(e, r)
  }

  static WriteRecentList(e, t) {
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
  }

  static WriteLayers(e, t) {
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
  }

  static WriteLinks(e, t) {
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
  }

  static BuildStyleList(e) {
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
        (a = T3Gv.optManager.GetObjectPtr(n[r], !1)).tstyleindex = d(a.StyleRecord),
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
  }

  static write_SDF_C_DRAW12(e, t) {
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
  }


  static WriteStyle(e, t, a, r, i) {
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
  }

  static WriteStyleList(e, t, a, r) {
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
  }

  static WriteSDFill(e, t, a) {
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
  }

  static WriteSDLine(e, t, a, r, i) {
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
  }

  static WriteSDTxf(e, t, a) {
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

  static WriteOutside(e, t) {
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

  // static WriteEffect(e, t, a) {
  //   var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_EFFECT),
  //     i = {
  //       effecttype: a,
  //       effectcolor: t.EffectColor ? SDF.HTMLColorToWin(t.EffectColor) : ConstantData.Colors.Color_Trans,
  //       wparam: t.WParam,
  //       lparam: t.LParam
  //     };
  //   e.writeStruct(FileParser.SDF_EFFECT_Struct, i),
  //     SDF.Write_LENGTH(e, r)
  // }

  static WritePaint(e, t, a, r) {
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
  }

  static ShapeParamToSDR(e, t) {
    var a = 0,
      r = PolygonConstant.ShapeTypes;
    switch (e.dataclass) {
      case r.PARALLELOGRAM:
      case r.PENTAGON:
      case r.PENTAGON_LEFT:
      case r.HEXAGON:
        a = SDF.ToSDWinCoords(e.shapeparam, t.coordScaleFactor);
        break;
      case r.OCTAGON:
        a = e.shapeparam;
        break;
      case r.ARROW_LEFT:
      case r.ARROW_RIGHT:
      case r.ARROW_TOP:
      case r.ARROW_BOTTOM:
      case r.TRAPEZOID_BOTTOM:
      case r.TRAPEZOID:
      case r.INPUT:
      case r.TRAPEZOID_BOTTOM:
      case r.DOCUMENT:
      case r.STORAGE:
      case r.DELAY:
      case r.DISPLAY:
        a = SDF.ToSDWinCoords(e.shapeparam, t.coordScaleFactor)
    }
    return a
  }

  static WriteObject(e, t, a, r) {
    debugger
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
              D = PolygonConstant.ShapeTypes.POLYGON;
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
            b = T3Gv.optManager.InflateLine(M, u.StyleRecord.Line.BThick, !0, !1),
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
            D = PolygonConstant.ShapeTypes.RECTANGLE;
            break;
          case ConstantData.ShapeType.RRECT:
            D = PolygonConstant.ShapeTypes.ROUNDED_RECTANGLE;
            break;
          case ConstantData.ShapeType.OVAL:
            D = Math.abs(a.Frame.x - a.Frame.y) < 0.2 &&
              a.ObjGrow === ConstantData.GrowBehavior.PROPORTIONAL ? PolygonConstant.ShapeTypes.CIRCLE : PolygonConstant.ShapeTypes.OVAL;
            break;
          case ConstantData.ShapeType.POLYGON:
            a.dataclass ? (D = a.dataclass, n = SDF.ShapeParamToSDR(a, r)) : (
              a.dataclass = PolygonConstant.ShapeTypes.POLYGON,
              D = a.dataclass
            );
            break;
          case 'CLOSEDPOLY':
            D = PolygonConstant.ShapeTypes.POLYGON;
            break;
          case ConstantData.ShapeType.GROUPSYMBOL:
            D = PolygonConstant.ShapeTypes.RECTANGLE,
              T = I.GROUPSYMBOL;
            break;
          case ConstantData.ShapeType.SVGFRAGMENTSYMBOL:
            D = PolygonConstant.ShapeTypes.RECTANGLE,
              T = I.SVGFRAGMENTSYMBOL;
            break;
          default:
            D = PolygonConstant.ShapeTypes.RECTANGLE
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
  }

  static WriteNotes(e, t, a) {
    - 1 != t.NoteID &&
      SDF.WriteText(e, t, null, null, !0, a)
  }

  static WriteHooks(e, t, a) {
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
        l = T3Gv.optManager.GetObjectPtr(t.hooks[i].objid, !1),
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
  }


  // static PStyleListAdd(e, t) {
  //   var a,
  //     r;
  //   for (r = e.length, a = 0; a < r; a++) if (
  //     e[a].just == t.just &&
  //     e[a].bullet == t.bullet &&
  //     e[a].spacing == t.spacing &&
  //     e[a].pindent == t.pindent &&
  //     e[a].lindent == t.lindent &&
  //     e[a].rindent == t.rindent &&
  //     e[a].bindent == t.bindent &&
  //     e[a].tabspace == t.tabspace
  //   ) return a;
  //   return e.push(t),
  //     r
  // }

  // static TextSizeToPointSize(e, t) {
  //   var a = 0;
  //   t ? a = t.docDpi : a = T3Gv.optManager.svgDoc.GetWorkArea().docDpi;
  //   return Math.round(72 * e / a)
  // }

  // static WriteText(e, t, a, r, i, n) {
  //   var o,
  //     s;
  //   if (
  //     r ? (o = r, s = r.ID) : i ? t ? (o = T3Gv.objectStore.GetObject(t.NoteID), s = t.NoteID) : a &&
  //       (o = T3Gv.objectStore.GetObject(a.NoteID), s = a.NoteID) : t ? (o = T3Gv.objectStore.GetObject(t.DataID), s = t.DataID) : a &&
  //         (o = T3Gv.objectStore.GetObject(a.DataID), s = a.DataID),
  //     null != o
  //   ) {
  //     var l,
  //       S,
  //       c,
  //       u,
  //       p,
  //       d,
  //       D,
  //       g,
  //       h,
  //       m,
  //       C,
  //       y,
  //       f,
  //       L,
  //       I,
  //       T,
  //       b = o.Data.runtimeText,
  //       M = [],
  //       P = [];
  //     if (!b) {
  //       if (!r) return;
  //       b = T3Gv.optManager.svgDoc.CreateShape(ConstantData.CreateShapeType.TEXT).GetRuntimeText()
  //     }
  //     for (C = [], 0, d = 0, c = b.charStyles.length, M = new Array(c), l = 0; l < c; l++) M[l] = d;
  //     for (l = 0; l < b.paraInfo.length; l++) for (
  //       d = SDF.PStyleListAdd(C, b.paraInfo[l].pStyle),
  //       S = b.paraInfo[l].offset;
  //       S < c;
  //       S++
  //     ) M[S] = d;
  //     if (m = [], u = - 1, D = - 1, 0 === c) u = 0,
  //       D = b.paraInfo[0],
  //       m.push({
  //         style: 0,
  //         para: D,
  //         offset: 0
  //       });
  //     else for (l = 0; l < c; l++) u == b.charStyles[l] &&
  //       D == M[l] ||
  //       (u = b.charStyles[l], D = M[l], m.push({
  //         style: u,
  //         para: D,
  //         offset: l
  //       }));
  //     if (n.WriteVisio || n.WriteWin32) {
  //       var R = {
  //         InstID: s,
  //         nruns: m.length,
  //         nstyles: C.length,
  //         nchar: b.text.length,
  //         flags: 2,
  //         margins: {
  //           left: 0,
  //           top: 0,
  //           right: 0,
  //           bottom: 0
  //         },
  //         nlinks: 0,
  //         nlinkchar: 0,
  //         markupobjid: - 1
  //       },
  //         A = FileParser.SDF_LONGTEXT8_Struct;
  //       for (R.nlinks = b.hyperlinks.length, l = 0; l < b.hyperlinks.length; l++) R.nlinkchar += b.hyperlinks[l].length + 1
  //     } else R = {
  //       InstID: s,
  //       nstyles: C.length
  //     },
  //       A = FileParser.SDF_LONGTEXT8_Struct_8;
  //     for (
  //       i ? (
  //         p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_COMMENT),
  //         e.writeStruct(A, R),
  //         SDF.Write_LENGTH(e, p)
  //       ) : (
  //         p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_LONGTEXT8),
  //         e.writeStruct(A, R),
  //         SDF.Write_LENGTH(e, p)
  //       ),
  //       p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TEXTCHAR),
  //       h = String(b.text).replace(/\n/g, '\r'),
  //       e.writeUCS2String(h, T3DataStream.LITTLE_ENDIAN),
  //       SDF.Write_LENGTH(e, p),
  //       p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TEXTRUN),
  //       y = {
  //         nruns: m.length
  //       },
  //       e.writeStruct(FileParser.SDF_TEXTRUNS_Header, y),
  //       l = 0;
  //       l < m.length;
  //       l++
  //     ) f = {
  //       ncodes: 9,
  //       offset: m[l].offset
  //     },
  //       u = b.styles[m[l].style],
  //       D = m[l].para,
  //       u.dataField &&
  //       f.ncodes++,
  //       e.writeStruct(FileParser.SDF_TEXTCHANGE_Header, f),
  //       L = {
  //         code: FileParser.TextStyleCodes.SDF_T_FONT,
  //         value: SDF.GetFontID(u.font, n.fontlist)
  //       },
  //       e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
  //       n.WriteVisio ||
  //         n.WriteWin32 ? (
  //         L = {
  //           code: FileParser.TextStyleCodes.SDF_T_SIZE,
  //           value: SDF.TextSizeToPointSize(u.size, n)
  //         },
  //         e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L)
  //       ) : (
  //         L = {
  //           code: FileParser.TextStyleCodes.SDF_T_SIZE_FLOAT,
  //           value: u.size
  //         },
  //         e.writeStruct(FileParser.SDF_TEXTCODE_Struct_Float, L)
  //       ),
  //       L = {
  //         code: FileParser.TextStyleCodes.SDF_T_FACE,
  //         value: 0
  //       },
  //       'bold' == u.weight &&
  //       (L.value += FileParser.TextFace.St_Bold),
  //       'italic' == u.style &&
  //       (L.value += FileParser.TextFace.St_Italic),
  //       'underline' == u.decoration ? L.value += FileParser.TextFace.St_Under : 'line-through' == u.decoration &&
  //         (L.value += FileParser.TextFace.St_Strike),
  //       e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
  //       L = {
  //         code: FileParser.TextStyleCodes.SDF_T_EXTRA,
  //         value: 0
  //       },
  //       'sub' == u.baseOffset ? L.value = FileParser.ToUInt32(- 1) : 'super' == u.baseOffset &&
  //         (L.value = 1),
  //       e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
  //       L = {
  //         code: FileParser.TextStyleCodes.SDF_T_PAINTTYPE,
  //         value: 1
  //       },
  //       e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
  //       L = {
  //         code: FileParser.TextStyleCodes.SDF_T_COLOR,
  //         value: SDF.HTMLColorToWin(u.color, u.colorTrans)
  //       },
  //       e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
  //       L = {
  //         code: FileParser.TextStyleCodes.SDF_T_FLAGS,
  //         value: u.spError ? FileParser.TextFlags.TEN_F_BADSPELL : 0
  //       },
  //       e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
  //       L = {
  //         code: FileParser.TextStyleCodes.SDF_T_STYLEID,
  //         value: D
  //       },
  //       e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
  //       L = {
  //         code: FileParser.TextStyleCodes.SDF_T_LINKID,
  //         value: FileParser.ToUInt32(u.hyperlink)
  //       },
  //       e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L),
  //       u.dataField &&
  //       (
  //         (g = P.indexOf(u.dataField)) < 0 &&
  //         (g = P.length, P.push(u.dataField)),
  //         L = {
  //           code: FileParser.TextStyleCodes.SDF_T_DATAID,
  //           value: g
  //         },
  //         e.writeStruct(FileParser.SDF_TEXTCODE_Struct, L)
  //       );
  //     for (SDF.Write_LENGTH(e, p), l = 0; l < C.length; l++) {
  //       switch (
  //       p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TEXTSTYLE),
  //       I = {
  //         index: l,
  //         ncodes: 7
  //       },
  //       e.writeStruct(FileParser.SDF_TEXTSTYLE_Header, I),
  //       T = {
  //         code: FileParser.ParaStyleCodes.SDF_S_JUST,
  //         value: 0
  //       },
  //       C[l].just
  //       ) {
  //         case 'left':
  //           T.value = FileParser.TextJust.TA_LEFT;
  //           break;
  //         case 'right':
  //           T.value = FileParser.TextJust.TA_RIGHT;
  //           break;
  //         default:
  //           T.value = FileParser.TextJust.TA_CENTER
  //       }
  //       switch (
  //       e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
  //       T.code = FileParser.ParaStyleCodes.SDF_S_BULLET,
  //       C[l].bullet
  //       ) {
  //         case 'hround':
  //           T.value = 1;
  //           break;
  //         case 'sround':
  //           T.value = 2;
  //           break;
  //         case 'hsquare':
  //           T.value = 3;
  //           break;
  //         case 'ssquare':
  //           T.value = 4;
  //           break;
  //         case 'diamond':
  //           T.value = 5;
  //           break;
  //         case 'chevron':
  //           T.value = 6;
  //           break;
  //         case 'check':
  //           T.value = 7;
  //           break;
  //         case 'plus':
  //           T.value = 8;
  //           break;
  //         default:
  //           T.value = 0
  //       }
  //       e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
  //         T.code = FileParser.ParaStyleCodes.SDF_S_SPACING,
  //         C[l].spacing < 0 ? T.value = SDF.ToSDWinCoords(C[l].spacing, n.coordScaleFactor) : T.value = Math.round(100 * C[l].spacing),
  //         e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
  //         T.code = FileParser.ParaStyleCodes.SDF_S_PINDENT,
  //         T.value = SDF.ToSDWinCoords(C[l].pindent, n.coordScaleFactor),
  //         e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
  //         SDF.Write_LENGTH(e, p),
  //         T.code = FileParser.ParaStyleCodes.SDF_S_LINDENT,
  //         T.value = SDF.ToSDWinCoords(C[l].bindent ? C[l].bindent : C[l].lindent, n.coordScaleFactor),
  //         e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
  //         SDF.Write_LENGTH(e, p),
  //         T.code = FileParser.ParaStyleCodes.SDF_S_RINDENT,
  //         T.value = SDF.ToSDWinCoords(C[l].rindent, n.coordScaleFactor),
  //         e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
  //         SDF.Write_LENGTH(e, p),
  //         T.code = FileParser.ParaStyleCodes.SDF_S_TABSPACE,
  //         T.value = SDF.ToSDWinCoords(C[l].tabspace, n.coordScaleFactor),
  //         e.writeStruct(FileParser.SDF_STYLECODE_Struct, T),
  //         SDF.Write_LENGTH(e, p)
  //     }
  //     for (l = 0; l < b.hyperlinks.length; l++) p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TEXTLINK),
  //       e.writeUint16(l),
  //       e.writeUint16(2),
  //       e.writeUCS2String(
  //         b.hyperlinks[l],
  //         T3DataStream.LITTLE_ENDIAN,
  //         b.hyperlinks[l].length + 1
  //       ),
  //       SDF.Write_LENGTH(e, p);
  //     for (l = 0; l < P.length; l++) p = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TEXTDATA),
  //       e.writeUint16(l),
  //       e.writeUCS2String(P[l], T3DataStream.LITTLE_ENDIAN, P[l].length + 1),
  //       SDF.Write_LENGTH(e, p);
  //     i ? e.writeUint16(FileParser.SDROpCodesByName.SDF_C_COMMENT_END) : e.writeUint16(FileParser.SDROpCodesByName.SDF_C_TEXT_END)
  //   }
  // }

  // static WriteSDDATA(e, t) {
  //   var a;
  //   a = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_SDDATA64C);
  //   var r = '';
  //   r = T3Gv.optManager.theContentHeader.SDDataID >= 0 ? ListManager.SDData.SaveDataSets(!0, !0) : '<SDDATA></SDDATA>',
  //     e.writeUCS2String(r, T3DataStream.LITTLE_ENDIAN, r.length + 1),
  //     SDF.Write_LENGTH(e, a)
  // }

  static WriteObjData(e, t, a) {
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
  }

  // static WriteGraph(e, t, a) {
  //   var r,
  //     i,
  //     n = {
  //       stackScale: t.stackScale,
  //       valuePrecision: t.valuePrecision,
  //       pieChartCategory: t.pieChartCategory,
  //       pieOriginTangle: SDF.ToWinAngle(t.pieOriginTangle),
  //       flags: t.flags,
  //       pointflags: t.pointflags,
  //       prefixChar: t.prefixChar,
  //       suffixChar: t.suffixChar,
  //       graphtype: t.graphtype,
  //       quadrant: t.quadrant,
  //       barAreaAmount: t.barAreaAmount,
  //       barAreaAmountStacked: t.barAreaAmountStacked,
  //       imageValueRep: t.imageValueRep,
  //       graphLegendType: t.graphLegendType,
  //       perspectiveView3D: t.perspectiveView3D,
  //       effectLightDirection3D: t.effectLightDirection3D,
  //       npoints: t.gpoint.length
  //     };
  //   for (
  //     i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH),
  //     e.writeStruct(FileParser.SDF_GRAPH_Struct, n),
  //     SDF.Write_LENGTH(e, i),
  //     SDF.WriteStyle(e, t.style, !1, a),
  //     SDF.WriteStyle(e, t.areaStyle, !1, a),
  //     SDF.WriteStyle(e, t.gridStyle, !1, a),
  //     SDF.WriteGraphTitle(e, t.graphtitle, a),
  //     r = 0;
  //     r < t.axes.length;
  //     r++
  //   ) SDF.WriteGraphAxis(e, t.axes[r], a);
  //   for (
  //     SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH_LEGEND_BEGIN),
  //     SDF.WriteGraphTitle(e, t.graphlegendTitle, a),
  //     r = 0;
  //     r < t.graphLegend.length;
  //     r++
  //   ) SDF.WriteGraphLegendEntry(e, t.graphLegend[r], a);
  //   for (
  //     e.writeUint16(FileParser.SDROpCodesByName.SDF_C_GRAPH_LEGEND_END),
  //     r = 0;
  //     r < t.gpoint.length;
  //     r++
  //   ) SDF.WriteGraphPoint(e, t.gpoint[r], a);
  //   e.writeUint16(FileParser.SDROpCodesByName.SDF_C_GRAPH_END)
  // }

  // static WriteGraphTitle(e, t, a) {
  //   var r,
  //     i = {
  //       lflags: t.lflags,
  //       just: t.just,
  //       margin: t.margin,
  //       frame: SDF.ToSDWinRect(t.frame, a.coordScaleFactor, 0),
  //       tangle: SDF.ToWinAngle(t.tangle),
  //       drawpt: SDF.ToSDWinRect(t.drawpt, a.coordScaleFactor, 0),
  //       center: {
  //         x: SDF.ToSDWinCoords(t.center.x, a.coordScaleFactor),
  //         y: SDF.ToSDWinCoords(t.center.y, a.coordScaleFactor)
  //       }
  //     };
  //   r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH_TITLE),
  //     e.writeStruct(FileParser.SDF_GRAPH_AXIS_TITLE_Struct, i),
  //     SDF.Write_LENGTH(e, r),
  //     SDF.WriteStyle(e, t.style, !1, a),
  //     SDF.WriteText(e, t, null, null, !1, a)
  // }

  // static WriteGraphAxis(e, t, a) {
  //   var r,
  //     i,
  //     n = {
  //       orientation: t.orientation,
  //       flags: t.flags,
  //       lflags: t.lflags,
  //       fixedpoint: t.fixedpoint,
  //       frame: SDF.ToSDWinRect(t.title.frame, a.coordScaleFactor, 0),
  //       margin: t.margin,
  //       startpref: t.startpref,
  //       endpref: t.endpref,
  //       start: t.start,
  //       end: t.end,
  //       major: SDF.ToSDWinCoords(t.major, a.coordScaleFactor),
  //       majorscale: t.majorscale,
  //       minor: SDF.ToSDWinCoords(t.minor, a.coordScaleFactor),
  //       minorscale: t.minorscale,
  //       tickstyles: t.tickstyles,
  //       labelformat: t.labelformat,
  //       summaryflags: t.summaryflags,
  //       majorpref: t.majorpref,
  //       minorpref: t.minorpref
  //     };
  //   for (
  //     r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH_AXIS),
  //     e.writeStruct(FileParser.SDF_GRAPH_AXIS_Struct, n),
  //     SDF.Write_LENGTH(e, r),
  //     SDF.WriteStyle(e, t.style, !1, a),
  //     SDF.WriteGraphTitle(e, t.title, a),
  //     i = 0;
  //     i < t.labels.length;
  //     i++
  //   ) SDF.WriteGraphLabel(e, t.labels[i], a)
  // }

  // static WriteGraphLabel(e, t, a) {
  //   var r,
  //     i = {
  //       categoryid: t.categoryid,
  //       lflags: t.lflags,
  //       frame: SDF.ToSDWinRect(t.frame, a.coordScaleFactor, 0),
  //       tangle: SDF.ToWinAngle(t.tangle),
  //       center: {
  //         x: SDF.ToSDWinCoords(t.center.x, a.coordScaleFactor),
  //         y: SDF.ToSDWinCoords(t.center.y, a.coordScaleFactor)
  //       },
  //       textid: - 1,
  //       just: t.just,
  //       vjust: t.vjust
  //     };
  //   r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH_LABEL),
  //     e.writeStruct(FileParser.SDF_GRAPH_AXIS_LABEL_Struct, i),
  //     SDF.Write_LENGTH(e, r),
  //     SDF.WriteText(e, t, null, null, !1, a)
  // }

  // static WriteGraphLegendEntry(e, t, a) {
  //   var r,
  //     i = {
  //       seriesid: t.seriesid,
  //       lflags: t.lflags,
  //       textid: - 1,
  //       imgindx: t.imgindx,
  //       textFrame: SDF.ToSDWinRect(t.textFrame, a.coordScaleFactor, 0),
  //       swatchFrame: SDF.ToSDWinRect(t.swatchFrame, a.coordScaleFactor, 0),
  //       flags: t.flags
  //     };
  //   r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH_LEGEND),
  //     e.writeStruct(FileParser.SDF_GRAPH_LEGEND_ENTRY_Struct, i),
  //     SDF.Write_LENGTH(e, r),
  //     SDF.WriteText(e, t, null, null, !1, a)
  // }

  // static WriteGraphPoint(e, t, a) {
  //   var r,
  //     i = {
  //       dataid: t.DataID,
  //       seriesid: t.seriesid,
  //       categoryid: t.categoryid,
  //       value: t.value,
  //       frame: SDF.ToSDWinRect(t.frame, a.coordScaleFactor, 0),
  //       tangle: SDF.ToWinAngle(t.tangle),
  //       flags: t.flags,
  //       labelformat: t.labelformat,
  //       explodeAmt: SDF.ToSDWinCoords(t.explodeAmt, a.coordScaleFactor),
  //       labelstyle: t.labelstyle,
  //       imagescale: t.imagescale,
  //       imagerect: SDF.ToSDWinRect(t.imagerect, a.coordScaleFactor, 0),
  //       labelTextId: t.DataID,
  //       labelTangle: SDF.ToWinAngle(t.label.tangle),
  //       labelFrame: SDF.ToSDWinRect(t.label.frame, a.coordScaleFactor, 0),
  //       labelCenter: {
  //         x: SDF.ToSDWinCoords(t.label.center.x, a.coordScaleFactor),
  //         y: SDF.ToSDWinCoords(t.label.center.y, a.coordScaleFactor)
  //       }
  //     };
  //   r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GRAPH_POINT),
  //     e.writeStruct(FileParser.SDF_GRAPH_POINT_Struct, i),
  //     SDF.Write_LENGTH(e, r),
  //     SDF.WriteStyle(e, t.style, !1, a),
  //     SDF.WriteStyle(e, t.label.style, !1, a),
  //     SDF.WriteText(e, t.label, null, null, !1, a),
  //     t.NoteID >= 0 &&
  //     SDF.WriteText(e, t.label, null, null, !0, a),
  //     t.HyperlinkText.length > 0 &&
  //     SDF.WriteString(e, t.HyperlinkText, Op.SDF_C_DRAWJUMP, a)
  // }

  // static WriteGanttInfo(e, t, a) {
  //   var r = SDF.LargeIntToInt32Pair(t.configuredStart),
  //     i = SDF.LargeIntToInt32Pair(t.configuredEnd),
  //     n = SDF.LargeIntToInt32Pair(t.start),
  //     o = SDF.LargeIntToInt32Pair(t.end),
  //     s = SDF.LargeIntToInt32Pair(t.scrollStart),
  //     l = SDF.LargeIntToInt32Pair(t.scrollEnd),
  //     S = {
  //       timeScale: t.timeScale,
  //       flags: t.flags,
  //       configuredStart1: r[0],
  //       configuredStart2: r[1],
  //       configuredEnd1: i[0],
  //       configuredEnd2: i[1],
  //       start1: n[0],
  //       start2: n[1],
  //       end1: o[0],
  //       end2: o[1],
  //       scrollStart1: s[0],
  //       scrollStart2: s[1],
  //       scrollEnd1: l[0],
  //       scrollEnd2: l[1]
  //     };
  //   offset = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_GANTTINFO),
  //     e.writeStruct(FileParser.SDF_GANTTINFO_Struct, S),
  //     SDF.Write_LENGTH(e, offset)
  // }

  // static WriteTable(e, t, a) {
  //   var r,
  //     i,
  //     n,
  //     o,
  //     s,
  //     l;
  //   r = t.rows.length;
  //   var S = {
  //     ncells: i = t.cells.length,
  //     nrows: r,
  //     ht: SDF.ToSDWinCoords(t.ht, a.coordScaleFactor),
  //     wd: SDF.ToSDWinCoords(t.wd, a.coordScaleFactor),
  //     tmargin: {
  //       left: SDF.ToSDWinCoords(t.tmargin.left, a.coordScaleFactor),
  //       top: SDF.ToSDWinCoords(t.tmargin.top, a.coordScaleFactor),
  //       right: SDF.ToSDWinCoords(t.tmargin.right, a.coordScaleFactor),
  //       bottom: SDF.ToSDWinCoords(t.tmargin.bottom, a.coordScaleFactor)
  //     },
  //     tabletype: t.timelineflags,
  //     flags: t.flags
  //   };
  //   for (
  //     l = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TABLEVP),
  //     a.WriteVisio ||
  //       a.WriteWin32 ? e.writeStruct(FileParser.SDF_TABLE_Struct_32, S) : e.writeStruct(FileParser.SDF_TABLE_Struct_64, S),
  //     SDF.Write_LENGTH(e, l),
  //     n = 0;
  //     n < r;
  //     n++
  //   ) s = t.rows[n],
  //     l = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TABLEROWVP),
  //     a.WriteVisio ||
  //       a.WriteWin32 ? (
  //       o = {
  //         ncells: s.ncells,
  //         start: s.start,
  //         frame: SDF.ToSDWinRect(s.frame, a.coordScaleFactor, 0),
  //         lframe: SDF.ToSDWinRect(s.frame, a.coordScaleFactor, 0)
  //       },
  //       e.writeStruct(FileParser.SDF_TABLE_ROW_Struct_32, o)
  //     ) : (
  //       o = {
  //         ncells: s.ncells,
  //         start: s.start,
  //         lframe: SDF.ToSDWinRect(s.frame, a.coordScaleFactor, 0)
  //       },
  //       e.writeStruct(FileParser.SDF_TABLE_ROW_Struct_40, o)
  //     ),
  //     SDF.Write_LENGTH(e, l);
  //   for (n = 0; n < i; n++) {
  //     var c = t.cells[n];
  //     SDF.WriteTableCell(e, c, a)
  //   }
  //   e.writeUint16(FileParser.SDROpCodesByName.SDF_C_TABLEVP_END)
  // }

  // static WriteTableCell(e, t, a) {
  //   var r,
  //     i,
  //     n,
  //     o,
  //     s = - 1,
  //     l = t.flags;
  //   t.nextra &&
  //     (
  //       l = Utils2.SetFlag(l, ListManager.Table.CellFlags.SDT_F_SilentL, !1)
  //     ),
  //     l = Utils2.SetFlag(l, ListManager.Table.CellFlags.SDT_F_Select, !1),
  //     a.WriteBlocks &&
  //     (s = t.DataID, t.tstyleindex = - 1),
  //     o = t.childcontainer >= 0 ? SDF.BlockIDtoUniqueID(t.childcontainer, a) : - 1;
  //   var S = {
  //     textht: SDF.ToSDWinCoords(t.textht, a.coordScaleFactor),
  //     textwd: SDF.ToSDWinCoords(t.textwd, a.coordScaleFactor),
  //     minwd: SDF.ToSDWinCoords(t.minwd, a.coordScaleFactor),
  //     sizedim: {
  //       x: SDF.ToSDWinCoords(t.sizedim.width, a.coordScaleFactor),
  //       y: SDF.ToSDWinCoords(t.sizedim.height, a.coordScaleFactor)
  //     },
  //     frame: SDF.ToSDWinRect(t.frame, a.coordScaleFactor, 0),
  //     trect: SDF.ToSDWinRect(t.trect, a.coordScaleFactor, 0),
  //     textid: s,
  //     vjust: SDF.JSJustToWin(t.vjust),
  //     just: SDF.JSJustToWin(t.just),
  //     flags: l,
  //     fontid: 0,
  //     associd: - 1,
  //     associndex: - 1,
  //     nextra: t.nextra,
  //     vdisp: SDF.ToSDWinCoords(t.vdisp, a.coordScaleFactor),
  //     hdisp: SDF.ToSDWinCoords(t.hdisp, a.coordScaleFactor),
  //     sequence: t.sequence,
  //     framewd: 0,
  //     trectwd: 0,
  //     childcontainer: o
  //   };
  //   r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TABLECELL8),
  //     a.WriteVisio ||
  //       a.WriteWin32 ? e.writeStruct(FileParser.SDF_TABLE_CELL_Struct_108, S) : e.writeStruct(FileParser.SDF_TABLE_CELL_Struct_176, S),
  //     SDF.Write_LENGTH(e, r);
  //   var c = {
  //     celltype: t.celltype,
  //     dwold: 0,
  //     styleindex: t.tstyleindex,
  //     celltime: 0,
  //     datarecordID: t.datarecordID
  //   };
  //   if (
  //     r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TABLECELLEXTRA),
  //     e.writeStruct(FileParser.SDF_TABLE_CELLEXTRA_Struct, c),
  //     SDF.Write_LENGTH(e, r),
  //     t.DataID >= 0 &&
  //     (a.WriteBlocks || SDF.WriteText(e, null, t, null, !1, a)),
  //     t.NoteID >= 0 &&
  //     (
  //       a.WriteBlocks ? SDF.WriteCellNoteID(e, t.NoteID, a) : SDF.WriteText(e, null, t, null, !0, a)
  //     ),
  //     t.ExpandedViewID >= 0 &&
  //     (
  //       a.WriteBlocks ? SDF.WriteExpandedViewID(e, t.ExpandedViewID, a) : (
  //         n = T3Gv.optManager.GetObjectPtr(t.ExpandedViewID, !1),
  //         SDF.WriteExpandedView(e, n, a)
  //       )
  //     ),
  //     t.Image
  //   ) {
  //     var u = T3Gv.optManager.GetObjectPtr(t.EMFBlobBytesID, !1);
  //     if (u) SDF.WriteCellImageHeader(e, t, a),
  //       this.EMFHash &&
  //       SDF.WriteString8(e, t.EMFHash, FileParser.SDROpCodesByName.SDF_C_EMFHASH, a),
  //       a.WriteBlocks ? SDF.WriteEMFBlobBytesID(e, t.EMFBlobBytesID, FileParser.Image_Dir.dir_meta, a) : SDF.WriteBlob(e, u.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWMETA),
  //       (i = T3Gv.optManager.GetObjectPtr(t.BlobBytesID, !1)) &&
  //       (
  //         a.WriteBlocks ? SDF.WriteBlobBytesID(e, t.BlobBytesID, FileParser.Image_Dir.dir_png, a) : SDF.WriteBlob(
  //           e,
  //           i.Bytes,
  //           FileParser.SDROpCodesByName.SDF_C_DRAWPREVIEWPNG
  //         )
  //       );
  //     else if (
  //       i = T3Gv.optManager.GetObjectPtr(t.BlobBytesID, !1),
  //       SDF.WriteCellImageHeader(e, t, a),
  //       i
  //     ) switch (i.ImageDir) {
  //       case FileParser.Image_Dir.dir_jpg:
  //         a.WriteBlocks ? SDF.WriteBlobBytesID(e, t.BlobBytesID, FileParser.Image_Dir.dir_jpg, a) : SDF.WriteBlob(e, i.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWJPG);
  //         break;
  //       case FileParser.Image_Dir.dir_png:
  //         a.WriteBlocks ? SDF.WriteBlobBytesID(e, t.BlobBytesID, FileParser.Image_Dir.dir_png, a) : SDF.WriteBlob(e, i.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWPNG);
  //         break;
  //       case FileParser.Image_Dir.dir_svg:
  //         a.WriteBlocks ? SDF.WriteBlobBytesID(e, t.BlobBytesID, FileParser.Image_Dir.dir_svg, a) : SDF.WriteBlob(e, i.Bytes, FileParser.SDROpCodesByName.SDF_C_DRAWSVG)
  //     }
  //   }
  //   var p = {
  //     fieldindex: - 1,
  //     uniqueid: t.uniqueid,
  //     namelabel: 0,
  //     nfontid: 0,
  //     nfsize: 10,
  //     nface: 0,
  //     ntcolor: 0,
  //     namewidth: 0
  //   };
  //   r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_TABLECELLPROP),
  //     e.writeStruct(FileParser.SDF_TABLE_CELLPROP_Struct, p),
  //     SDF.Write_LENGTH(e, r),
  //     t.hyperlink &&
  //     SDF.WriteString(
  //       e,
  //       t.hyperlink,
  //       FileParser.SDROpCodesByName.SDF_C_DRAWJUMP,
  //       a
  //     )
  // }

  // static WriteConnectPoints(e, t) {
  //   var a,
  //     r,
  //     i,
  //     n;
  //   if (
  //     t.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.SHAPE
  //   ) {
  //     var o = {
  //       nconnect: a = t.ConnectPoints.length,
  //       connect: []
  //     };
  //     for (r = 0; r < a; r++) i = new Point(t.ConnectPoints[r].x, t.ConnectPoints[r].y),
  //       o.connect.push(i);
  //     for (r = a; r < FileParser.SDF_MAXCONNECT; r++) i = new Point(0, 0),
  //       o.connect.push(i);
  //     n = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_CONNECTPOINT),
  //       e.writeStruct(FileParser.SDF_CONNECTPOINT_Struct, o),
  //       SDF.Write_LENGTH(e, n)
  //   }
  // }

  static WriteStyleOverrides(e, t, a) {
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
  }


  static WriteArrowheads(e, t, a) {
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
  }

  // static WriteBlob(e, t, a) {
  //   var r = SDF.Write_CODE(e, a);
  //   e.writeUint8Array(t),
  //     SDF.Write_LENGTH(e, r)
  // }

  // static WriteImageHeader(e, t, a) {
  //   var r,
  //     i,
  //     n,
  //     o,
  //     s = 0;
  //   t.ImageHeader ? (
  //     r = t.ImageHeader.mr,
  //     i = t.ImageHeader.croprect,
  //     n = t.ImageHeader.scale,
  //     o = t.ImageHeader.imageflags,
  //     s = t.ImageHeader.iconid
  //   ) : (
  //     r = SDF.ToSDWinRect(t.Frame, a.coordScaleFactor, null),
  //     i = {
  //       left: 0,
  //       top: 0,
  //       right: 0,
  //       bottom: 0
  //     },
  //     n = 1,
  //     o = ConstantData.ImageScales.SDIMAGE_ALWAYS_FIT
  //   );
  //   var l = {
  //     mr: r,
  //     croprect: i,
  //     imageflags: o,
  //     scale: n,
  //     uniqueid: 0,
  //     iconid: s
  //   },
  //     S = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWIMAGE8);
  //   a.WriteVisio ||
  //     a.WriteWin32 ? e.writeStruct(FileParser.SDF_DRAWIMAGE8_Struct_50, l) : e.writeStruct(FileParser.SDF_DRAWIMAGE8_Struct_82, l),
  //     SDF.Write_LENGTH(e, S)
  // }

  // static WriteOleHeader(e, t, a) {
  //   var r = {
  //     dva: t.dva,
  //     linked: t.linked,
  //     scale: t.scale
  //   },
  //     i = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_OLEHEADER);
  //   e.writeStruct(FileParser.SDF_OLEHEADER_Struct, r),
  //     SDF.Write_LENGTH(e, i)
  // }

  static BlockNames = {
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
  }

  static BlockIDs = {
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
  }

  static BlockActions = {
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
  }

  // static Block = function (e, t, a) {
  //   this.Name = e,
  //     this.Length = t,
  //     this.bytes = a
  // }

  static BlockHeader = function (e, t, a, r, i, n) {
    this.state = e,
      this.delta = t,
      this.action = SDF.BlockActions.Normal,
      this.blocktype = a,
      this.blockid = r,
      this.index = i,
      this.nblocks = n
  }

  // static GetBlocksByName(e, t) {
  //   var a,
  //     r,
  //     i,
  //     n,
  //     o = [];
  //   for (
  //     a = TestServer.currentblocklist.length,
  //     r = 0;
  //     r < a &&
  //     (
  //       (
  //         'sdr' === (n = (i = TestServer.currentblocklist[r]).Name.split('.'))[1] ? i.Name : n[0] + '.'
  //       ) !== e ||
  //       (o.push(i), !t)
  //     );
  //     r++
  //   );
  //   return o
  // }

  // static DeleteInstances(e) {
  //   var t,
  //     a,
  //     r = T3Gv.objectStore.GetObjects(e);
  //   for (t = r.length, a = 0; a < t; a++) r[a].Delete()
  // }

  // static ReplaceBlock(e) {
  //   var t,
  //     a;
  //   for (t = TestServer.currentblocklist.length, a = 0; a < t; a++) if (TestServer.currentblocklist[a].Name === e.Name) return e.Length < 0 ? void TestServer.currentblocklist.splice(a, 1) : void (TestServer.currentblocklist[a] = e);
  //   TestServer.currentblocklist.push(e)
  // }

  // static HeaderFilters = []

  // static Header2Count = 0

  // static WriteAllBlocks() {
  //   try {
  //     var e,
  //       t,
  //       a,
  //       r,
  //       i,
  //       n,
  //       o = new SDF.WResult,
  //       s = new ArrayBuffer(10),
  //       l = new T3DataStream(s),
  //       S = 6;
  //     l.endianness = T3DataStream.LITTLE_ENDIAN,
  //       o.sdp = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
  //       o.ctp = T3Gv.optManager.theContentHeader,
  //       o.tLMB = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1),
  //       SDUI.Commands.MainController.SymbolLibraryBrowser.CurrentLibraryPath ? o.LibraryPathTarget = SDUI.Commands.MainController.SymbolLibraryBrowser.CurrentLibraryPath : o.LibraryPathTarget = SDUI.Commands.MainController.SymbolLibraryBrowser.LibraryPathTarget,
  //       o.WriteBlocks = !0;
  //     var c = T3Gv.docUtil.svgDoc.GetWorkArea();
  //     o.WindowSettings.wscale = T3Gv.docUtil.GetZoomFactor(),
  //       o.WindowSettings.worigin.x = c.scrollX,
  //       o.WindowSettings.worigin.y = c.scrollY,
  //       o.WindowSettings.wflags = 0,
  //       T3Gv.docUtil.scaleToFit ? o.WindowSettings.wflags = ListManager.WFlags.W_Stf : T3Gv.docUtil.scaleToPage &&
  //         (o.WindowSettings.wflags = ListManager.WFlags.W_Page),
  //       o.docDpi = T3Gv.docUtil.svgDoc.docInfo.docDpi,
  //       T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
  //         T3Gv.optManager.theContentHeader.flags,
  //         ConstantData.ContentHeaderFlags.CT_ShowGrid,
  //         T3Gv.docUtil.docConfig.showGrid
  //       ),
  //       T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
  //         T3Gv.optManager.theContentHeader.flags,
  //         ConstantData.ContentHeaderFlags.CT_ShowRulers,
  //         T3Gv.docUtil.docConfig.showRulers
  //       ),
  //       T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
  //         T3Gv.optManager.theContentHeader.flags,
  //         ConstantData.ContentHeaderFlags.CT_SnapToGridC,
  //         T3Gv.docUtil.docConfig.centerSnap &&
  //         T3Gv.docUtil.docConfig.enableSnap
  //       ),
  //       T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
  //         T3Gv.optManager.theContentHeader.flags,
  //         ConstantData.ContentHeaderFlags.CT_SnapToGridTL,
  //         !T3Gv.docUtil.docConfig.centerSnap &&
  //         T3Gv.docUtil.docConfig.enableSnap
  //       ),
  //       T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
  //         T3Gv.optManager.theContentHeader.flags,
  //         ConstantData.ContentHeaderFlags.CT_ShowPageDividers,
  //         T3Gv.docUtil.docConfig.showPageDivider
  //       ),
  //       T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
  //         T3Gv.optManager.theContentHeader.flags,
  //         ConstantData.ContentHeaderFlags.CT_SnapToShapes_Off,
  //         0 == T3Gv.docUtil.docConfig.snapToShapes
  //       ),
  //       T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
  //         T3Gv.optManager.theContentHeader.flags,
  //         ConstantData.ContentHeaderFlags.CT_ShowRulers,
  //         T3Gv.docUtil.docConfig.showRulers
  //       ),
  //       1 === o.WindowSettings.wscale ? o.WindowSettings.wscale = 0 : o.WindowSettings.wscale *= 1000,
  //       o.ctp.smartpanelname = SDF.ToSDWinPanelName(ConstantData.DocumentContext.CurrentSmartPanel),
  //       o.rulerConfig = T3Gv.docUtil.rulerConfig,
  //       o.rulerConfig.show = T3Gv.docUtil.docConfig.showRulers,
  //       o.fontlist = T3Gv.optManager.theContentHeader.FontList,
  //       o.RichGradients = T3Gv.optManager.RichGradients,
  //       l.endianness = T3DataStream.LITTLE_ENDIAN;
  //     var u = T3Gv.objectStore.GetObjects(ConstantData.StoredObjectType.BLOBBYTES_OBJECT),
  //       p = T3Gv.objectStore.GetObjects(ConstantData.StoredObjectType.LM_TEXT_OBJECT),
  //       d = T3Gv.objectStore.GetObjects(ConstantData.StoredObjectType.LM_NOTES_OBJECT),
  //       D = T3Gv.objectStore.GetObjects(ConstantData.StoredObjectType.TABLE_OBJECT),
  //       g = T3Gv.objectStore.GetObjects(ConstantData.StoredObjectType.GRAPH_OBJECT),
  //       m = T3Gv.objectStore.GetObjects(ConstantData.StoredObjectType.EXPANDEDVIEW_OBJECT),
  //       C = T3Gv.objectStore.GetObjects(ConstantData.StoredObjectType.LM_COMMENT_BLOCK),
  //       y = T3Gv.optManager.ZList(),
  //       f = T3Gv.objectStore.GetObjects(ConstantData.StoredObjectType.H_NATIVE_OBJECT),
  //       L = T3Gv.objectStore.GetObjects(ConstantData.StoredObjectType.H_NATIVEWIN_OBJECT);
  //     for (r = y.length, i = 0, n = 0; n < r; n++) (t = T3Gv.optManager.GetObjectPtr(y[n], !1)).bInGroup ||
  //       i++;
  //     var I = S + u.length + p.length + d.length + h.length + D.length + g.length + m.length + C.length + i + f.length + L.length;
  //     o.nblocks = I,
  //       o.BlockAction = SDF.BlockActions.NewDoc,
  //       o.state = T3Gv.stateManager.CurrentStateID + T3Gv.stateManager.DroppedStates,
  //       o.delta = 0,
  //       SDF.WriteBlockWrapper(
  //         l,
  //         o.state,
  //         o.delta,
  //         SDF.BlockIDs.Version,
  //         0,
  //         0,
  //         I,
  //         o.BlockAction
  //       ),
  //       l.writeCString(SDF.Signature, SDF.Signature.length),
  //       SDF.Write_SDF_C_VERSION(
  //         l,
  //         FileParser.Platforms.SDF_SDJSBLOCK,
  //         T3Gv.optManager.FileVersion
  //       ),
  //       a = SDF.WriteHeaderBlock(o, 1, null),
  //       a = SDF.WriteSDPBlock(o, 2),
  //       a = SDF.WriteSDDataBlock(o, 3);
  //     var T = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1);
  //     for (
  //       a = SDF.WriteLayersBlock(T, o, 4),

  //       e = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLinksBlockID, !1),
  //       a = SDF.WriteLinksBlock(e, o, 5),

  //       r = u.length,
  //       n = 0;
  //       n < r;
  //       n++
  //     ) a = SDF.WriteImageBlock(u[n], o, S + n);


  //     for (S += r, r = p.length, n = 0; n < r; n++) a = SDF.WriteTextBlock(p[n], o, !1, S + n)

  //       ;
  //     for (S += r, r = d.length, n = 0; n < r; n++) a = SDF.WriteTextBlock(d[n], o, !0, S + n)

  //       ;
  //     for (S += r, r = h.length, n = 0; n < r; n++) a = SDF.WriteGanttInfoBlock(h[n], o, S + n)

  //       ;
  //     for (S += r, r = g.length, n = 0; n < r; n++) a = SDF.WriteGraphBlock(g[n], o, S + n)

  //       ;
  //     for (S += r, r = m.length, n = 0; n < r; n++) a = SDF.WriteExpandedViewBlock(m[n], o, S + n)

  //       ;
  //     for (S += r, r = C.length, n = 0; n < r; n++) a = SDF.WriteCommentBlock(C[n], o, S + n)

  //       ;
  //     for (S += r, r = D.length, n = 0; n < r; n++) a = SDF.WriteTableBlock(D[n], o, S + n)

  //       ;
  //     for (S += r, r = y.length, i = 0, n = 0; n < r; n++) (t = T3Gv.optManager.GetObjectPtr(y[n], !1)).bInGroup ||
  //       (
  //         a = SDF.WriteOBJBlock(t, o, S + i),
  //         i++
  //       );
  //     for (S += i, r = f.length, n = 0; n < r; n++) a = SDF.WriteNativeBlock(
  //       f[n],
  //       FileParser.SDROpCodesByName.SDF_C_NATIVEBLOCK,
  //       o,
  //       S + n
  //     )
  //       ;
  //     for (S += r, r = L.length, n = 0; n < r; n++) a = SDF.WriteNativeBlock(
  //       L[n],
  //       FileParser.SDROpCodesByName.SDF_C_NATIVEWINBLOCK,
  //       o,
  //       S + n
  //     )
  //       ;
  //     return S += r
  //   } catch (e) {
  //     T3Gv.optManager.Export_ExceptionCleanup(e)
  //   }
  // }

  static SaveAllBlocks(e, t) {
    if (true
    ) if (false) {
      var a,
        r,
        i,
        n = T3Gv.optManager.SocketAction.length,
        o = ListManager.SocketActions;
      if (n) {
        var s = {
          state: 0,
          delta: 0,
          nblocks: 1
        };
        for (a = 0; a < n; a++) switch (T3Gv.optManager.SocketAction[a]) {
          case o.SaveAllBlocks:
            SDF.WriteAllBlocks(),
              SDF.HeaderFilters = [],
              SDF.Header2Count = 0;
            break;
        }
        T3Gv.optManager.SocketAction = []
      } else {
        SDF.WriteAllBlocks();
        SDF.HeaderFilters = [],
          SDF.Header2Count = 0
      }
    }

  }



  static GetBlockName(e, t, a) {
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
  }


  static BuildObjectBlock(e, t, a, r) {
    var i,
      n,
      o = ConstantData.StoredObjectType;
    switch (e.Type) {
      case o.BASE_LM_DRAWING_OBJECT:
        if ((i = T3Gv.objectStore.GetObject(e.ID)) && !i.Data.bInGroup) {
          if (a) return !0;
          n = SDF.WriteOBJBlock(i.Data, t, r)
        }
        break;
      case o.LM_TEXT_OBJECT:
        if (i = T3Gv.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteTextBlock(i, t, !1, r)
        }
        break;
      case o.LM_NOTES_OBJECT:
        if (i = T3Gv.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteTextBlock(i, t, !0, r)
        }
        break;
      case o.TABLE_OBJECT:
        if (i = T3Gv.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteTableBlock(i, t, r)
        }
        break;
      case o.GRAPH_OBJECT:
        if (i = T3Gv.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteGraphBlock(i, t, r)
        }
        break;
      case o.EXPANDEDVIEW_OBJECT:
        if (i = T3Gv.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteExpandedViewBlock(i, t, r)
        }
        break;
      case o.LM_COMMENT_BLOCK:
        if (i = T3Gv.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteCommentBlock(i, t, r)
        }
        break;

      case o.BLOBBYTES_OBJECT:
        if (i = T3Gv.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteImageBlock(i, t, r)
        }
        break;
      case o.H_NATIVE_OBJECT:
        if (i = T3Gv.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteNativeBlock(i, FileParser.SDROpCodesByName.SDF_C_NATIVEBLOCK, t, r)
        }
        break;
      case o.H_NATIVEWIN_OBJECT:
        if (i = T3Gv.objectStore.GetObject(e.ID)) {
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
        T3Gv.optManager.theContentHeader.SDDataID >= 0 &&
          (n = SDF.WriteSDDataBlock(t, r));
        break;
      case o.LAYERS_MANAGER_OBJECT:
        if (a) return !0;
        n = SDF.WriteLayersBlock(t.tLMB, t, r);
        break;
      case o.LINKLIST_OBJECT:
        if (i = T3Gv.objectStore.GetObject(e.ID)) {
          if (a) return !0;
          n = SDF.WriteLinksBlock(i.Data, t, r)
        }
    }
    return n
  }

  static SaveChangedBlocks(e, t, a, r) {
    try {
      if (
        false
      ) return;
      if (false) return;
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
        p = (d = T3Gv.stateManager.States[e].StoredObjects).length,
        D.sdp = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
        D.ctp = T3Gv.optManager.theContentHeader,
        D.tLMB = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1),
        D.fontlist = T3Gv.optManager.theContentHeader.FontList,
        D.RichGradients = T3Gv.optManager.RichGradients,


        D.WriteBlocks = !0;
      var m = T3Gv.docUtil.svgDoc.GetWorkArea();
      if (
        D.WindowSettings.wscale = T3Gv.docUtil.GetZoomFactor(),
        D.WindowSettings.worigin.x = m.scrollX,
        D.WindowSettings.worigin.y = m.scrollY,
        D.WindowSettings.wflags = 0,
        T3Gv.docUtil.scaleToFit ? D.WindowSettings.wflags = ListManager.WFlags.W_Stf : T3Gv.docUtil.scaleToPage &&
          (D.WindowSettings.wflags = ListManager.WFlags.W_Page),
        D.docDpi = T3Gv.docUtil.svgDoc.docInfo.docDpi,
        1 === D.WindowSettings.wscale ? D.WindowSettings.wscale = 0 : D.WindowSettings.wscale *= 1000,
        T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
          T3Gv.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_ShowGrid,
          T3Gv.docUtil.docConfig.showGrid
        ),
        T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
          T3Gv.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_ShowRulers,
          T3Gv.docUtil.docConfig.showRulers
        ),
        T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
          T3Gv.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_SnapToGridC,
          T3Gv.docUtil.docConfig.centerSnap &&
          T3Gv.docUtil.docConfig.enableSnap
        ),
        T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
          T3Gv.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_SnapToGridTL,
          !T3Gv.docUtil.docConfig.centerSnap &&
          T3Gv.docUtil.docConfig.enableSnap
        ),
        T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
          T3Gv.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_ShowPageDividers,
          T3Gv.docUtil.docConfig.showPageDivider
        ),
        T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
          T3Gv.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_SnapToShapes_Off,
          0 == T3Gv.docUtil.docConfig.snapToShapes
        ),
        T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
          T3Gv.optManager.theContentHeader.flags,
          ConstantData.ContentHeaderFlags.CT_ShowRulers,
          T3Gv.docUtil.docConfig.showRulers
        ),
        D.rulerConfig = T3Gv.docUtil.rulerConfig,
        D.rulerConfig.show = T3Gv.docUtil.docConfig.showRulers,
        l = 1,
        t < 0 &&
        e + 1 < T3Gv.stateManager.States.length
      ) for (i = T3Gv.stateManager.States[e + 1].StoredObjects.length, n = 0; n < i; n++) if (
        (o = T3Gv.stateManager.States[e + 1].StoredObjects[n]).StateOperationTypeID === Globals.StateOperationType.CREATE
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
        i = (d = r || T3Gv.stateManager.States[e].StoredObjects).length,
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
        D.state = a + T3Gv.stateManager.DroppedStates,
        1 === t &&
        (t = 0),
        D.delta = t,
        g = [],
        S = 0,
        T3Gv.gTestException
      ) {
        var C = new Error(Resources.Strings.Error_InComplete);
        throw C.name = '1',
        C
      }
      if (
        s = SDF.WriteHeaderBlock(D, S, SDF.HeaderFilters),
        S++,
        t < 0 &&
        e + 1 < T3Gv.stateManager.States.length
      ) for (i = T3Gv.stateManager.States[e + 1].StoredObjects.length, n = 0; n < i; n++) if (
        (o = T3Gv.stateManager.States[e + 1].StoredObjects[n]).StateOperationTypeID === Globals.StateOperationType.CREATE
      ) SDF.GetBlockName(o, !0, h) &&
        (
          s = SDF.WriteActionBlock(D, h.type, h.id, SDF.BlockActions.Delete, S),
          S++
        );
      else if (
        o.StateOperationTypeID === Globals.StateOperationType.DELETE
      ) o = T3Gv.objectStore.GetObject(o.ID),
        (s = SDF.BuildObjectBlock(o, D, !1, S))

      else {
        for (u = !1, c = 0; c < p; c++) if (d[c].ID === o.ID) {
          u = !0;
          break
        }
        u ||
          (
            o = T3Gv.objectStore.GetObject(o.ID),
            (s = SDF.BuildObjectBlock(o, D, !1, S))
          )
      }
      for (i = d.length, n = 0; n < i; n++) (o = d[n]).StateOperationTypeID === Globals.StateOperationType.DELETE ? SDF.GetBlockName(o, !0, h) &&
        (
          s = SDF.WriteActionBlock(D, h.type, h.id, SDF.BlockActions.Delete, S)
          ,
          S++
        ) : - 1 === g.indexOf(o.ID) &&
      (s = SDF.BuildObjectBlock(o, D, !1, S))
    } catch (C) {
      T3Gv.optManager.Export_ExceptionCleanup(C)
    }
  }

  static WriteBlockWrapper(e, t, a, r, i, n, o, s) {
    var l = new SDF.BlockHeader(t, a, r, i, n, o);
    l.action = s,
      e.writeStruct(FileParser.BLOCK_HEADER_Struct, l)
  }

  static WriteActionBlock(e, t, a, r, i) {
    var n = new ArrayBuffer(10),
      o = new T3DataStream(n);
    return o.endianness = T3DataStream.LITTLE_ENDIAN,
      SDF.WriteBlockWrapper(o, e.state, e.delta, t, a, i, e.nblocks, r),
      new Uint8Array(o.buffer)
  }

  static WriteSDPBlock(e, t) {
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
      (r = T3Gv.optManager.TextureList.Textures.length) > T3Gv.optManager.NStdTextures
    ) {
      for (a = T3Gv.optManager.NStdTextures; a < r; a++) e.TextureList.push(a);
      SDF.WriteTextureList(n, T3Gv.optManager.TextureList, e)
    }
    return SDF.WriteRulers(n, e),
      SDF.WriteRecentList(n, e),
      new Uint8Array(n.buffer)
  }

  static WriteOBJBlock(e, t, a) {
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
  }

  static WriteLinksBlock(e, t, a) {
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
  }

  static WriteLayersBlock(e, t, a) {
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
  }

  // static WriteTextBlock(e, t, a, r) {
  //   var i = new ArrayBuffer(10),
  //     n = new T3DataStream(i);
  //   return n.endianness = T3DataStream.LITTLE_ENDIAN,
  //     SDF.WriteBlockWrapper(
  //       n,
  //       t.state,
  //       t.delta,
  //       SDF.BlockIDs.Text,
  //       e.ID,
  //       r,
  //       t.nblocks,
  //       t.BlockAction
  //     ),
  //     SDF.WriteText(n, null, null, e, a, t),
  //     new Uint8Array(n.buffer)
  // }

  static WriteNativeBlock(e, t, a, r) {
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
  }


  // static WriteTableBlock(e, t, a) {
  //   var r = new ArrayBuffer(10),
  //     i = new T3DataStream(r);
  //   i.endianness = T3DataStream.LITTLE_ENDIAN,
  //     SDF.WriteBlockWrapper(
  //       i,
  //       t.state,
  //       t.delta,
  //       SDF.BlockIDs.Table,
  //       e.ID,
  //       a,
  //       t.nblocks,
  //       t.BlockAction
  //     );
  //   var n = SDF.Write_CODE(i, FileParser.SDROpCodesByName.SDF_C_TABLEBLOCK),
  //     o = {
  //       value: e.ID
  //     };
  //   return i.writeStruct(FileParser.LONGVALUE_Struct, o),
  //     SDF.Write_LENGTH(i, n),
  //     SDF.WriteTable(i, e.Data, t),
  //     new Uint8Array(i.buffer)
  // }

  // static WriteGanttInfoBlock(e, t, a) {
  //   var r = new ArrayBuffer(10),
  //     i = new T3DataStream(r);
  //   i.endianness = T3DataStream.LITTLE_ENDIAN,
  //     SDF.WriteBlockWrapper(
  //       i,
  //       t.state,
  //       t.delta,
  //       SDF.BlockIDs.GanttInfo,
  //       e.ID,
  //       a,
  //       t.nblocks,
  //       t.BlockAction
  //     );
  //   var n = SDF.Write_CODE(i, FileParser.SDROpCodesByName.SDF_C_GANTTINFOBLOCK),
  //     o = {
  //       value: e.ID
  //     };
  //   return i.writeStruct(FileParser.LONGVALUE_Struct, o),
  //     SDF.Write_LENGTH(i, n),
  //     SDF.WriteGanttInfo(i, e.Data, t),
  //     new Uint8Array(i.buffer)
  // }

  // static WriteGraphBlock(e, t, a) {
  //   var r = new ArrayBuffer(10),
  //     i = new T3DataStream(r);
  //   i.endianness = T3DataStream.LITTLE_ENDIAN,
  //     SDF.WriteBlockWrapper(
  //       i,
  //       t.state,
  //       t.delta,
  //       SDF.BlockIDs.Graph,
  //       e.ID,
  //       a,
  //       t.nblocks,
  //       t.BlockAction
  //     );
  //   var n = SDF.Write_CODE(i, FileParser.SDROpCodesByName.SDF_C_GRAPHBLOCK),
  //     o = {
  //       value: e.ID
  //     };
  //   return i.writeStruct(FileParser.LONGVALUE_Struct, o),
  //     SDF.Write_LENGTH(i, n),
  //     SDF.WriteGraph(i, e.Data, t),
  //     new Uint8Array(i.buffer)
  // }

  // static WriteSDDataBlock(e, t) {
  //   var a = new ArrayBuffer(10),
  //     r = new T3DataStream(a);
  //   return r.endianness = T3DataStream.LITTLE_ENDIAN,
  //     SDF.WriteBlockWrapper(
  //       r,
  //       e.state,
  //       e.delta,
  //       SDF.BlockIDs.SDData,
  //       0,
  //       t,
  //       e.nblocks,
  //       e.BlockAction
  //     ),
  //     SDF.WriteSDDATA(r, e),
  //     new Uint8Array(r.buffer)
  // }

  // static WriteImageBlock(e, t, a) {
  //   var r = new ArrayBuffer(10),
  //     i = new T3DataStream(r);
  //   i.endianness = T3DataStream.LITTLE_ENDIAN,
  //     SDF.WriteBlockWrapper(
  //       i,
  //       t.state,
  //       t.delta,
  //       SDF.BlockIDs.Image,
  //       e.ID,
  //       a,
  //       t.nblocks,
  //       t.BlockAction
  //     );
  //   var n = SDF.Write_CODE(i, FileParser.SDROpCodesByName.SDF_C_IMAGEBLOCK),
  //     o = {
  //       value: e.ID,
  //       type: e.Data.ImageDir
  //     };
  //   return i.writeStruct(FileParser.LONGVALUE2_Struct, o),
  //     FileParser.write_nativebytearray(i, e.Data.Bytes),
  //     SDF.Write_LENGTH(i, n),
  //     new Uint8Array(i.buffer)
  // }

  static WriteHeaderBlock(e, t, a) {
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

  // static WriteManifestBlock(e, t) {
  //   var a = new ArrayBuffer(10),
  //     r = new T3DataStream(a);
  //   r.endianness = T3DataStream.LITTLE_ENDIAN,
  //     SDF.WriteBlockWrapper(r, 0, 0, SDF.BlockIDs.Manifest, 0, 0, 1, t),
  //     null == e &&
  //     SDUI.Utils.Logger.LogMessage('NULL Manifest Sent to Client Via Socket');
  //   var i = JSON.stringify(e);
  //   return r.writeUCS2String(i, T3DataStream.LITTLE_ENDIAN, i.length),
  //     new Uint8Array(r.buffer)
  // }

  // static WriteSVGBlock(e) {
  //   var t = new ArrayBuffer(10),
  //     a = new T3DataStream(t);
  //   return a.endianness = T3DataStream.LITTLE_ENDIAN,
  //     SDF.WriteBlockWrapper(a, 0, 0, SDF.BlockIDs.SVG, 0, 0, 1, 0),
  //     a.writeUCS2String(e, T3DataStream.LITTLE_ENDIAN, e.length),
  //     new Uint8Array(a.buffer)
  // }

  // static WriteExpandedViewBlock(e, t, a) {
  //   var r = new ArrayBuffer(10),
  //     i = new T3DataStream(r);
  //   i.endianness = T3DataStream.LITTLE_ENDIAN,
  //     SDF.WriteBlockWrapper(
  //       i,
  //       t.state,
  //       t.delta,
  //       SDF.BlockIDs.ExpandedView,
  //       e.ID,
  //       a,
  //       t.nblocks,
  //       t.BlockAction
  //     );
  //   var n = SDF.Write_CODE(i, FileParser.SDROpCodesByName.SDF_C_EXPANDEDVIEWBLOCK),
  //     o = {
  //       value: e.ID
  //     };
  //   i.writeStruct(FileParser.LONGVALUE_Struct, o),
  //     SDF.Write_LENGTH(i, n);
  //   var s = e.Data;
  //   return SDF.WriteExpandedView(i, s, t),
  //     new Uint8Array(i.buffer)
  // }

  // static WriteCommentBlock(e, t, a) {
  //   var r = new ArrayBuffer(10),
  //     i = new T3DataStream(r);
  //   i.endianness = T3DataStream.LITTLE_ENDIAN,
  //     SDF.WriteBlockWrapper(
  //       i,
  //       t.state,
  //       t.delta,
  //       SDF.BlockIDs.Comment,
  //       e.ID,
  //       a,
  //       t.nblocks,
  //       t.BlockAction
  //     );
  //   var n = SDF.Write_CODE(i, FileParser.SDROpCodesByName.SDF_C_CLOUDCOMMENTBLOCK);
  //   return i.writeUint32(e.Data.objectID),
  //     i.writeUint32(e.Data.userID),
  //     i.writeFloat64(e.Data.timestamp),
  //     i.writeUCS2String(
  //       e.Data.comment,
  //       T3DataStream.LITTLE_ENDIAN,
  //       e.Data.comment.length + 1
  //     ),
  //     SDF.Write_LENGTH(i, n),
  //     new Uint8Array(i.buffer)
  // }

  // static WriteExpandedView(e, t, a) {
  //   var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_EXPANDEDVIEW);
  //   e.writeUCS2String(t, T3DataStream.LITTLE_ENDIAN, t.length),
  //     SDF.Write_LENGTH(e, r)
  // }

  // static WriteContainerList(e, t, a) {
  //   var r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWCONTAINER),
  //     i = {
  //       Arrangement: t.Arrangement,
  //       HorizontalSpacing: t.HorizontalSpacing,
  //       VerticalSpacing: t.VerticalSpacing,
  //       AlignH: t.AlignH,
  //       AlignV: t.AlignV,
  //       Wrap: t.Wrap,
  //       height: t.height,
  //       width: t.width,
  //       MinWidth: t.MinWidth,
  //       MinHeight: t.MinHeight,
  //       flags: t.flags,
  //       nacross: t.nacross,
  //       ndown: t.ndown,
  //       childwidth: t.childwidth,
  //       childheight: t.childheight
  //     };
  //   e.writeStruct(FileParser.SDF_CONTAINERLIST_Struct_100, i),
  //     SDF.Write_LENGTH(e, r);
  //   var n,
  //     o,
  //     s,
  //     l = t.List.length;
  //   for (n = 0; n < l; n++) o = {
  //     x: (s = t.List[n]).pt.x,
  //     y: s.pt.y,
  //     id: SDF.BlockIDtoUniqueID(s.id, a),
  //     extra: s.extra
  //   },
  //     r = SDF.Write_CODE(e, FileParser.SDROpCodesByName.SDF_C_DRAWCONTAINERHOOK),
  //     e.writeStruct(FileParser.SDF_CONTAINERHOOK_Struct_28, o),
  //     SDF.Write_LENGTH(e, r);
  //   e.writeUint16(FileParser.SDROpCodesByName.SDF_C_DRAWCONTAINER_END)
  // }


}

export default SDF
