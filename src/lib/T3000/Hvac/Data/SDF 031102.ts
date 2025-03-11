

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
   * Converts a rectangle to Windows coordinate system
   * @param rect - The rectangle to convert
   * @param scaleFactor - The scale factor to apply
   * @param offset - Optional offset to apply to coordinates
   * @returns A rectangle in Windows coordinate format
   */
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

  static Signature = '00000000'

  static UnsupportedTypes = []

  /**
   * Reads a symbol from a buffer and creates objects in the document
   * @param buffer - The source buffer containing symbol data
   * @param positionX - X position for the symbol placement
   * @param positionY - Y position for the symbol placement
   * @param offset - Buffer offset value
   * @param ignoreErrors - Whether to ignore read errors
   * @param renderObjects - Whether to render objects after creation
   * @param selectedObjects - Object containing array to store selected object IDs
   * @param adjustPosition - Whether to adjust position based on document boundaries
   * @param skipLinks - Whether to skip link creation
   * @param noTextBlocks - Whether to skip text block creation
   * @param libraryFlags - Library flags for symbol customization
   * @param allowAddEMFHash - Whether to allow adding EMF hash
   * @param outputDimensions - Object to receive the dimensions of the symbol
   * @param isSymbolFlag - Flag indicating whether the data represents a symbol
   * @returns Error code if an error occurred, 0 otherwise
   */
  static ReadSymbolFromBuffer(buffer, positionX, positionY, offset, ignoreErrors, renderObjects,
    selectedObjects, adjustPosition, skipLinks, noTextBlocks,
    libraryFlags, allowAddEMFHash, outputDimensions, isSymbolFlag) {
    let objectsToDelete;
    let objectCount;
    let index;
    let linksCount;
    let object;
    let boundingRect;
    let offsetX;
    let offsetY;
    let newWidth;
    let newHeight;
    let changedObject;
    let applyColorChanges = false;
    let result = new SDF.Result();

    let formattedTextObject = null;
    let sessionBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, true);
    let objectsToRemove = [];

    result.isTemplate = false;
    result.IgnoreHeader = true;
    result.sdp = new SEDSession();
    result.sdp.def.style = Utils1.DeepCopy(sessionBlock.def.style);
    result.isSymbol = isSymbolFlag !== 0;
    result.gHash = new HashController();
    result.tLMB = new LayersManager();
    result.AllowAddEMFHash = allowAddEMFHash;
    SDF.FragmentLoad_RefCount = 0;

    if (libraryFlags) {
      if ((libraryFlags.ObjectAttributeFlags & ListManager.LibraryFlags.SEDL_NoColor) === 0) {
        result.SetColorChanges = true;
        result.ColorFilter = libraryFlags.ColorFilter;
      }
      applyColorChanges = true;
    }

    if (noTextBlocks) {
      result.NoTextBlocks = true;
    }

    if (positionX != null) {
      result.SymbolPosition.x = positionX;
    }

    if (positionY != null) {
      result.SymbolPosition.y = positionY;
    }

    let errorCode = SDF.ReadBuffer(buffer, result, offset, false, SDF.ReadSymbolFromBuffer_Complete);
    if (errorCode && errorCode != SDF.Errors.WaitingForCallBack) {
      return ignoreErrors ? result.error : errorCode;
    }

    if (result.WarnMeta) {
      if (ignoreErrors) return SDF.Errors.WarnMeta;
      alert('Metafile not read');
    }

    if (outputDimensions && errorCode !== SDF.Errors.WaitingForCallBack) {
      outputDimensions.x = result.sdp.dim.x;
      outputDimensions.y = result.sdp.dim.y;
    }

    if (errorCode !== SDF.Errors.WaitingForCallBack) {
      const isPlanningDocument = T3Gv.optManager.IsPlanningDocument();
      const layersManager = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, true);

      objectCount = result.zList.length;
      for (index = 0; index < objectCount; index++) {
        object = T3Gv.optManager.GetObjectPtr(result.zList[index], false);

        if (object.objecttype === ConstantData.ObjectTypes.SD_OBJT_BPMN_POOL) {
          SDF.ConvertBPMNPool(object);
        }

        let tableID = -1;
        if (object.datasetID >= 0) {
          tableID = ListManager.SDData.GetTableID(object.datasetID, ListManager.DataTableNames.PLANNING_TASKS);
        }

        let targetLayer;
        if (isPlanningDocument && object.Layer != null &&
          (tableID >= 0 || object.objecttype === ConstantData.ObjectTypes.SD_OBJT_MINDMAP_CONNECTOR)) {
          targetLayer = layersManager.layers[object.Layer].zList;
        } else {
          targetLayer = layersManager.layers[layersManager.activelayer].zList;
          object.Layer = layersManager.activelayer;
        }

        targetLayer.push(result.zList[index]);

        if (result.IsVisio && object && object.ShapeType === ConstantData.ShapeType.GROUPSYMBOL &&
          object.InitialGroupBounds.x < 0) {
          object.InitialGroupBounds.x = 1;
        }

        T3Gv.optManager.AddToDirtyList(result.zList[index]);

        if (object && (object.flags & ConstantData.ObjFlags.SEDO_NotVisible) === 0) {
          selectedObjects.selectedList.push(result.zList[index]);
        }

        if (result.SDData == null) {
          object.datasetTableID = -1;
          object.datasetElemID = -1;
          object.datasetID = -1;
          object.datasetType = -1;
          object.dataStyleOverride = null;
        }
      }

      if (objectsToRemove.length) {
        T3Gv.optManager.DeleteObjects(objectsToRemove);
      }

      if (result.SDData && T3Gv.optManager.SDData_Transfer) {
        T3Gv.optManager.SDData_Transfer(result.zList, result.SDData, applyColorChanges);
      }

      linksCount = result.links.length;
      if (!skipLinks && linksCount > 0) {
        let linksBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLinksBlockID, true);
        for (index = 0; index < linksCount; index++) {
          linksBlock.push(result.links[index]);
        }

        linksBlock.sort(function (a, b) {
          return a.targetid - b.targetid;
        });
      }

      // Calculate bounding rectangle for all objects
      let objectWithBoundsCount = 0;
      for (index = 0; index < objectCount; index++) {
        object = T3Gv.optManager.GetObjectPtr(result.zList[index], false);
        if (object && (object.flags & ConstantData.ObjFlags.SEDO_NotVisible) === 0) {
          if (objectWithBoundsCount === 0) {
            boundingRect = new Rectangle(object.r.x, object.r.y, object.r.width, object.r.height);
          } else {
            Utils2.UnionRect(object.r, boundingRect, boundingRect);
          }
          objectWithBoundsCount++;
        }
      }

      if (boundingRect) {
        if (adjustPosition) {
          offsetX = boundingRect.x < 0 ? -boundingRect.x : 0;
          offsetY = boundingRect.y < 0 ? -boundingRect.y : 0;
        } else {
          offsetX = 0;
          offsetY = 0;
        }

        // Apply offset if needed
        if (offsetX || offsetY) {
          for (index = 0; index < objectCount; index++) {
            object = T3Gv.optManager.GetObjectPtr(result.zList[index], false);
            if (object && (object.flags & ConstantData.ObjFlags.SEDO_NotVisible) === 0) {
              object.OffsetShape(offsetX, offsetY);
            }
          }
        }

        if (adjustPosition) {
          boundingRect.x += offsetX;
          boundingRect.y += offsetY;
          offsetX = 0;
          offsetY = 0;
          newWidth = 0;
          newHeight = 0;

          const originalDimensions = {
            x: sessionBlock.dim.x,
            y: sessionBlock.dim.y
          };

          // Check if we need to adjust document size
          if (boundingRect.x + boundingRect.width > sessionBlock.dim.x) {
            if (T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto) {
              offsetX = boundingRect.x + boundingRect.width - sessionBlock.dim.x;
              newWidth = 0;
            } else {
              newWidth = boundingRect.x + boundingRect.width;
              sessionBlock.dim.x = newWidth;
            }
          }

          if (boundingRect.y + boundingRect.height > sessionBlock.dim.y) {
            if (T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto) {
              offsetY = boundingRect.y + boundingRect.height - sessionBlock.dim.y;
            } else {
              newHeight = boundingRect.y + boundingRect.height;
              sessionBlock.dim.y = newHeight;
            }
          }

          if (newWidth || newHeight) {
            const layersManagerBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, false);
            const layerCount = layersManagerBlock.nlayers;
            let activeLayerUsesEdges = false;
            let anyVisibleLayerUsesEdges = false;

            if (layersManagerBlock.layers[layersManagerBlock.activelayer].flags & ConstantData.LayerFlags.SDLF_UseEdges) {
              activeLayerUsesEdges = true;
            }

            for (index = 0; index < layerCount; index++) {
              if ((layersManagerBlock.layers[index].flags & ConstantData.LayerFlags.SDLF_UseEdges) &&
                (layersManagerBlock.layers[index].flags & ConstantData.LayerFlags.SDLF_Visible) ||
                activeLayerUsesEdges) {
                anyVisibleLayerUsesEdges = true;
                break;
              }
            }

            if (anyVisibleLayerUsesEdges) {
              T3Gv.optManager.UpdateEdgeLayers([], originalDimensions, sessionBlock.dim);
            }

            T3Gv.docUtil.ResizeDocument(sessionBlock.dim.x, sessionBlock.dim.y);
          } else if (offsetX || offsetY) {
            // If we need to shift objects to stay within bounds
            for (index = 0; index < objectCount; index++) {
              object = T3Gv.optManager.GetObjectPtr(result.zList[index], false);
              if (object && (object.flags & ConstantData.ObjFlags.SEDO_NotVisible) === 0) {
                object.OffsetShape(-offsetX, -offsetY);
              }
            }
          }
        }
      }

      if (!skipLinks && adjustPosition) {
        T3Gv.optManager.UpdateLinks();
      }

      if (renderObjects) {
        T3Gv.optManager.RenderDirtySVGObjects();
      } else if (objectCount === 1) {
        T3Gv.optManager.RenderDirtySVGObjectsNoSetMouse();
      }

      return result.error;
    }
  }

  /**
   * Reads data from a buffer and parses it into structured format
   * @param buffer - The source buffer containing data to parse
   * @param result - The object where parsing results will be stored
   * @param offset - Buffer offset to start reading from
   * @param ignoreErrors - Whether to ignore certain error types
   * @param callback - Optional callback function for async operations
   * @returns Error code if an error occurred, or SDF.Errors.WaitingForCallBack for async operations
   */
  static ReadBuffer(buffer, result, offset, ignoreErrors, callback) {
    // Initialize a data stream from the buffer
    const opCodes = FileParser.SDROpCodesByName;
    let dataStream = new T3DataStream(buffer);
    let minimumFileVersion = SDF.SDF_MINFVERSION;

    // Symbol files require a higher minimum version
    if (result.isSymbol) {
      minimumFileVersion = SDF.SDF_MINSVERSION;
    }

    // Set endianness and handle offset
    dataStream.endianness = T3DataStream.LITTLE_ENDIAN;

    // Handle offset logic
    if (offset === 4) {
      // Get content length from first 4 bytes
      const contentLength = dataStream.readUint32() + 4;
      if (contentLength < dataStream._byteLength) {
        dataStream._byteLength = contentLength;
      }
    } else if (offset) {
      // Skip specified number of bytes
      dataStream.readUint8Array(offset);
    }

    // Read header structure
    let fileHeader = dataStream.readStruct(FileParser.SDR_Parser_HeaderOnly_Struct);
    dataStream = null;

    // Validate file header and signature
    if (!fileHeader || !fileHeader.start || fileHeader.start != SDF.Signature) {
      result.error = SDF.Errors.UnknownFile;
      return result.error;
    }

    // Check that codes array exists and has elements
    if (!(fileHeader.codes.length >= 1)) {
      result.error = SDF.Errors.UnknownFile;
      return result.error;
    }

    // Check for version code
    if (fileHeader.codes[0].code !== FileParser.SDROpCodesByName.SDF_C_VERSION) {
      result.error = SDF.Errors.UnknownFile;
      return result.error;
    }

    // Check minimum version compatibility
    if (fileHeader.codes[0].data.MinVer > SDF.SDF_FVERSION) {
      result.error = SDF.Errors.Version;
      return result.error;
    }

    // Check if file version is too old
    if (fileHeader.codes[0].data.FVersion < minimumFileVersion) {
      result.error = SDF.Errors.MinVersion;
      return result.error;
    }

    // Set conversion flags based on file version
    if (fileHeader.codes[0].data.FVersion < SDF.SDF_FVERSION) {
      result.ConvertOnSave = true;
      if (fileHeader.codes[0].data.FVersion <= SDF.FVERSIONVSM &&
        (!result.isTemplate && !result.isSymbol || result.AllowAddEMFHash)) {
        result.AddEMFHash = true;
      }
    }

    // Handle different source platform formats
    switch (fileHeader.codes[0].data.Platform) {
      case FileParser.Platforms.SDF_SDJSBLOCK:
      case FileParser.Platforms.SDF_SDJS:
        // Native format, no special handling needed
        break;
      case FileParser.Platforms.SDF_VISIO:
        result.IsVisio = true;
        break;
      case FileParser.Platforms.SDF_VISIOLUCID:
        result.IsVisio = true;
        result.IsLucid = true;
        break;
      default:
        // Add EMF hash for non-template, non-symbol content, if allowed
        if ((!result.isTemplate && !result.isSymbol || result.AllowAddEMFHash)) {
          result.AddEMFHash = true;
        }
        result.FromWindows = true;
    }

    // Set async validation flag if needed
    if (result.AddEMFHash && !result.isSymbol && !ignoreErrors) {
      result.ValidateHashesAsync = true;
    }

    // Store version information
    result.PVersion = fileHeader.codes[0].data.PVersion;
    result.FVersion = fileHeader.codes[0].data.FVersion;

    // Calculate coordinate scale factor based on resolution
    if (result.FVersion < SDF.SDF_FVERSION2022) {
      result.coordScaleFactor = T3Gv.docUtil.svgDoc.docInfo.docDpi / fileHeader.codes[0].data.drawres;
    } else {
      result.coordScaleFactor = 1;
    }

    // Set block reading flag for block format
    if (fileHeader.codes[0].data.Platform === FileParser.Platforms.SDF_SDJSBLOCK) {
      result.ReadBlocks = true;
    }

    // Enable text updating
    result.updatetext = true;

    // Read full file structure
    dataStream = new T3DataStream(buffer);
    dataStream.endianness = T3DataStream.LITTLE_ENDIAN;

    // Handle offset logic (repeated)
    if (offset === 4) {
      const contentLength = dataStream.readUint32() + 4;
      if (contentLength < dataStream._byteLength) {
        dataStream._byteLength = contentLength;
      }
    } else if (offset) {
      dataStream.readUint8Array(offset);
    }

    // Read full file structure
    fileHeader = dataStream.readStruct(FileParser.SDR_Parser_Struct);
    dataStream = null;

    // Process file contents
    if (result.ValidateHashesAsync && callback) {
      // Handle asynchronous validation
      return SDF.ValidateHashCodes(null, fileHeader, opCodes, result, ignoreErrors, callback) ||
        SDF.Errors.WaitingForCallBack;
    } else {
      // Process synchronously
      SDF.ReadBuffer_Complete(fileHeader, result, ignoreErrors);
      return result.error;
    }
  }

  /**
   * Processes parsed buffer data and creates drawing objects from it
   * @param parsedData - The parsed file header and data structures
   * @param result - Object containing processing results and generated content
   * @param ignoreErrors - Whether to ignore certain types of errors during processing
   * @returns Error code if an error occurred, 0 otherwise
   */
  static ReadBuffer_Complete(parsedData, result, ignoreErrors) {
    try {
      const opCodes = FileParser.SDROpCodesByName;
      const CDim = ConstantData.Defines.SED_CDim;
      const minConnectorSegments = ConstantData.ConnectorDefines.SEDA_NSkip;
      let dataBlockLoaded = false;
      let codeIndex, objectCount, objectIndex, segmentIndex, objectId, object, layer;
      let hookLength, hookCount, textTable, textParent, svgElement, ganttInfo;

      // Process all codes until end of file
      for (codeIndex = 1; parsedData.codes[codeIndex].code != opCodes.SDF_C_ENDFILE; codeIndex++) {
        switch (parsedData.codes[codeIndex].code) {
          // Block directory information
          case opCodes.SDF_C_BLOCKDIRECTORY:
            result.HasBlockDirectory = true;
            break;

          // Process Smart Draw data blocks
          case opCodes.SDF_C_SDDATABLOCK:
            ListManager.SDData.LoadDataSets(parsedData.codes[codeIndex].data.bytes, true, true, result);
            dataBlockLoaded = true;
            break;

          // Process compressed data block
          case opCodes.SDF_C_SDDATA64C:
            if (!dataBlockLoaded) {
              ListManager.SDData.LoadDataSets(parsedData.codes[codeIndex].data.bytes, true, true, result);
              dataBlockLoaded = true;
            }
            break;

          // Process 64-bit data block if version supports it
          case opCodes.SDF_C_SDDATA64:
            if (!dataBlockLoaded && result.PVersion >= SDF.SDF_PVERSION861) {
              ListManager.SDData.LoadDataSets(parsedData.codes[codeIndex].data.bytes, true, false, result);
              dataBlockLoaded = true;
            }
            break;

          // Skip metadata blocks
          case opCodes.SDF_C_SDDATA:
          case opCodes.SDF_C_GUIDSTR:
          case opCodes.SDF_C_SDTS_TIMESTAMPS:
          case opCodes.SDF_C_THUMBNAIL:
          case opCodes.SDF_C_CTHUMBNAIL:
          case opCodes.SDF_C_KEYWORDS:
          case opCodes.SDF_C_DESCRIPTION:
          case opCodes.SDF_C_FILEPATH:
          case opCodes.SDF_C_TRIALDATA:
          case opCodes.SDF_C_CMSDATA:
          case opCodes.SDF_C_TLICENSE:
            break;

          // Process header section
          case opCodes.SDF_C_HEADER:
            codeIndex = SDF.ReadHeader(parsedData, codeIndex, result, opCodes);
            if (result.error) {
              return result.error;
            }
            break;

          // Process drawing objects in different file versions
          case opCodes.SDF_C_DRAW12:
            codeIndex = SDF.ReadDraw(parsedData, codeIndex, result, opCodes, opCodes.SDF_C_DRAW12_END);
            if (codeIndex < 0) break;
            break;

          case opCodes.SDF_C_DRAW8:
            codeIndex = SDF.ReadDraw(parsedData, codeIndex, result, opCodes, opCodes.SDF_C_DRAW8_END);
            if (codeIndex < 0) break;
            break;

          case opCodes.SDF_C_DRAW:
            codeIndex = SDF.ReadDraw(parsedData, codeIndex, result, opCodes, opCodes.SDF_C_DRAW_END);
            if (codeIndex < 0) break;
            break;

          // Process any other blocks with begin/end structure
          default:
            if (parsedData.codes[codeIndex].code & SDF.SDF_BEGIN) {
              codeIndex = SDF.ReadFrame(
                parsedData,
                codeIndex,
                (parsedData.codes[codeIndex].code & SDF.SDF_MASK) | SDF.SDF_END
              );
            }
        }

        if (codeIndex < 0) break;
      }

      // Remap links if no errors so far
      if (result.error === 0) {
        SDF.ReMapLinks(result.IDMap, result.links, result, ignoreErrors);
      }

      // Process all objects in the list
      objectCount = result.zList.length;
      for (objectIndex = 0; objectIndex < objectCount; objectIndex++) {
        objectId = result.zList[objectIndex];
        object = T3Gv.optManager.GetObjectPtr(objectId, false);

        if (!object) continue;

        // Fix texture fill type if needed
        if (object.StyleRecord.Fill.Paint.FillType === ConstantData.FillTypes.SDFILL_TEXTURE &&
          object.StyleRecord.Fill.Paint.Texture === undefined) {
          object.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT;
        }

        // Determine object base class, handling special case for closed polylines
        let baseClass = object.DrawingObjectBaseClass;
        if (baseClass === ConstantData.DrawingObjectBaseClass.LINE &&
          object.LineType === ConstantData.LineType.POLYLINE &&
          object.polylist && object.polylist.closed) {
          baseClass = ConstantData.DrawingObjectBaseClass.SHAPE;
        }

        // Check for Gantt chart with incompatible version
        if (result.PVersion < SDF.SDF_PVERSION861 &&
          object.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART) {
          result.error = SDF.Errors.MinVersionProjectChart;
          return -1;
        }

        // Process objects based on their base class
        switch (baseClass) {
          case ConstantData.DrawingObjectBaseClass.LINE:
            // Handle different line types
            switch (object.LineType) {
              case ConstantData.LineType.POLYLINE:
                break;

              case ConstantData.LineType.SEGLINE:
              case ConstantData.LineType.ARCSEGLINE:
                // Ensure segmented lines are properly formatted
                const originalOrigin = {
                  x: object.Frame.x,
                  y: object.Frame.y
                };

                if (originalOrigin.x < 0 || originalOrigin.y < 0) {
                  object.SetShapeOrigin(30000, 30000);
                }

                object.SegLFormat(
                  object.EndPoint,
                  ConstantData.ActionTriggerType.SEGL_PRESERVE,
                  0
                );

                object.CalcFrame();

                if (originalOrigin.x < 0 || originalOrigin.y < 0) {
                  object.SetShapeOrigin(originalOrigin.x, originalOrigin.y);
                }
            }

            // Set text object for older versions
            if (object.DataID >= 0 && result.PVersion < SDF.SDF_PVERSION859 && result.ReadBlocks) {
              object.SetTextObject(object.DataID);
            }
            break;

          case ConstantData.DrawingObjectBaseClass.CONNECTOR:
            // Clean up connectors with no hooks
            if (object.hooks.length === 0) {
              hookLength = object.arraylist.hook.length;
              hookCount = hookLength - minConnectorSegments;

              if (hookCount < 0) {
                hookCount = 0;
              }

              if (hookLength >= minConnectorSegments) {
                for (segmentIndex = 1; segmentIndex < minConnectorSegments; segmentIndex++) {
                  if (object.arraylist.hook[segmentIndex].id >= 0) {
                    hookCount++;
                  }
                }
              }

              if (hookCount === 0) {
                result.DeleteList.push(objectId);
              }
            }
            break;

          case ConstantData.DrawingObjectBaseClass.SHAPE:
            // Handle shapes with line thickness (border)
            if (object.StyleRecord.Line.BThick &&
              object.polylist &&
              object.polylist.closed &&
              object.polylist.segs &&
              object.polylist.segs.length) {

              let polygonLine;
              let vertices = [];
              const borderThickness = object.StyleRecord.Line.Thickness / 2;

              // Handle different shape types
              if (object instanceof Instance.Shape.Polygon && objectId.polylist) {
                const polygonData = {
                  Frame: object.Frame,
                  inside: object.inside
                };

                polygonLine = new Instance.Shape.PolyLine(polygonData);
                polygonLine.polylist = object.polylist;
                polygonLine.StartPoint = object.StartPoint;
                polygonLine.EndPoint = object.EndPoint;
              } else {
                polygonLine = object;
              }

              const points = polygonLine.GetPolyPoints(ConstantData.Defines.NPOLYPTS, false, true, false, vertices);
              let polyPoints = [];

              // Extract vertices from points
              if (vertices.length > 0) {
                polyPoints.push(new Point(points[0].x, points[0].y));
                for (segmentIndex = 0; segmentIndex < vertices.length; segmentIndex++) {
                  polyPoints.push(new Point(points[vertices[segmentIndex]].x, points[vertices[segmentIndex]].y));
                }
              } else {
                polyPoints = Utils1.DeepCopy(points);
              }

              // Inflate the line to create border
              const inflatedPoints = T3Gv.optManager.InflateLine(polyPoints, borderThickness, true, true);
              if (!inflatedPoints || inflatedPoints.length === 0) break;

              // Update start and end points
              object.StartPoint.x = inflatedPoints[0].x;
              object.StartPoint.y = inflatedPoints[0].y;
              object.EndPoint.x = inflatedPoints[inflatedPoints.length - 1].x;
              object.EndPoint.y = inflatedPoints[inflatedPoints.length - 1].y;

              // Copy and update segment data
              const originalSegments = Utils1.DeepCopy(object.polylist.segs);
              object.polylist.segs = [];

              for (segmentIndex = 0; segmentIndex < points.length; segmentIndex++) {
                object.polylist.segs.push(
                  new PolySeg(1,
                    inflatedPoints[segmentIndex].x - object.StartPoint.x,
                    inflatedPoints[segmentIndex].y - object.StartPoint.y
                  )
                );

                // Copy properties from original segments if available
                if (segmentIndex < originalSegments.length) {
                  object.polylist.segs[segmentIndex].LineType = originalSegments[segmentIndex].LineType;
                  object.polylist.segs[segmentIndex].ShortRef = originalSegments[segmentIndex].ShortRef;
                  object.polylist.segs[segmentIndex].dataclass = originalSegments[segmentIndex].dataclass;
                  object.polylist.segs[segmentIndex].dimDeflection = originalSegments[segmentIndex].dimDeflection;
                  object.polylist.segs[segmentIndex].flags = originalSegments[segmentIndex].flags;
                  object.polylist.segs[segmentIndex].param = originalSegments[segmentIndex].param;
                  object.polylist.segs[segmentIndex].weight = originalSegments[segmentIndex].weight;
                }
              }

              // Recalculate frame for BaseLine objects
              if (object instanceof Instance.Shape.BaseLine) {
                object.CalcFrame();
              }
              // Scale and adjust polygon shapes
              else if (object instanceof Instance.Shape.Polygon && object.polylist) {
                const thickness = object.StyleRecord.Line.BThick;
                let width = object.Frame.width;

                if (width <= 0) {
                  width = 1;
                }

                const scaleX = (width + 2 * thickness) / width;

                let height = object.Frame.height;
                if (height <= 0) {
                  height = 1;
                }

                const scaleY = (height + 2 * thickness) / height;
                const offsetX = -(object.Frame.x * scaleX - object.Frame.x + thickness);
                const offsetY = -(object.Frame.y * scaleY - object.Frame.y + thickness);

                object.ScaleObject(offsetX, offsetY, null, 0, scaleX, scaleY, false);
                T3Gv.optManager.CalcPolyVertices(object);
              }
            } else if (result.AddEMFHash || result.isTemplate || result.isSymbol) {
              object.UpdateFrame(object.Frame);
            }
        }

        // Handle graph formatting if needed
        const graph = object.GetGraph(false);
        if (graph !== null) {
          T3Gv.optManager.GraphFormat(object, graph, object.Frame, true);
        }

        // Handle table formatting if needed
        textTable = object.GetTable(false);
        if (textTable) {
          if (object.subtype !== ConstantData.ObjectSubTypes.SD_SUBT_MEETINGTASK &&
            object.subtype !== ConstantData.ObjectSubTypes.SD_SUBT_MEETINGPERSON &&
            object.objecttype !== ConstantData.ObjectTypes.SD_OBJT_TIMELINE) {
            T3Gv.optManager.Table_Format(object, textTable, object.TextGrow, false);
          }
        }
        // Handle text formatting for Visio objects
        else if (object.DataID >= 0 && result.updatetext) {
          if (result.IsVisio) {
            object.StyleRecord.name = ConstantData.Defines.TextBlockStyle;

            if (object.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText && !result.ReadingGroup) {
              object.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT;
              object.StyleRecord.Line.Thickness = 0;

              const parentId = T3Gv.optManager.SD_GetVisioTextParent(object.BlockID);
              textParent = T3Gv.optManager.GetObjectPtr(parentId, false);

              if (textParent) {
                textParent.just = object.just;
                textParent.vjust = object.vjust;

                // Center alignment handling for Visio text
                if (object.hookdisp.x === 0 &&
                  object.hookdisp.y === 0 &&
                  object.hooks[0].connect.x === CDim / 2 &&
                  object.hooks[0].connect.y === CDim / 2 &&
                  textParent.ShapeType !== ConstantData.ShapeType.GROUPSYMBOL &&
                  textParent.DrawingObjectBaseClass !== ConstantData.DrawingObjectBaseClass.LINE) {
                  object.sizedim.width = object.trect.width;
                  object.sizedim.height = object.trect.height;
                }

                if (textParent.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE) {
                  textParent.TextDirection = false;
                }
              }
            }
          }

          // Render and resize text
          T3Gv.optManager.AddSVGObject(null, objectId, true, false);
          T3Gv.optManager.TextResizeCommon(objectId, false, true);
          svgElement = T3Gv.optManager.svgObjectLayer.GetElementByID(objectId);

          if (svgElement) {
            // Special handling for Visio line text
            if (result.IsVisio &&
              object.DrawingObjectBaseClass == ConstantData.DrawingObjectBaseClass.LINE) {
              const textAlignment = SDF.TextAlignToJust(object.TextAlign);

              if (svgElement.textElem.formatter.renderedLines.length === 1 &&
                textAlignment.just === ConstantData.TextAlign.CENTER) {
                object.TextGrow = ConstantData.TextGrowBehavior.HORIZONTAL;
                object.sizedim.width = ConstantData.Defines.SED_MinDim;
                T3Gv.optManager.TextResizeCommon(objectId, false, true);
              }
            }

            // Clean up SVG element and reset collab flag
            T3Gv.optManager.svgObjectLayer.RemoveElement(svgElement);
            Collab.NoRedrawFromSameEditor = false;
          }
        }
      }

      // Set file version information for non-symbol files
      if (result.isSymbol === false) {
        if (result.VisioFileVersion) {
          T3Gv.optManager.FileVersion = SDF.SDF_FVERSION2022;
        }

        // Check for planning or fielded data datasets and update version
        const hasPlanningData = ListManager.SDData.GetSDDataDatasetIDByName(
          result.SDData,
          ListManager.DataSetNameList[ListManager.DataSetNameListIndexes.DATASET_PLANNING]
        ) >= 0;

        const hasFieldedData = ListManager.SDData.GetSDDataDatasetIDByName(
          result.SDData,
          ListManager.DataSetNameList[ListManager.DataSetNameListIndexes.DATASET_FIELDEDDATA]
        ) >= 0;

        if (hasPlanningData || hasFieldedData) {
          T3Gv.optManager.FileVersion = SDF.SDF_FVERSION2022;
        }
      }

      return result.error;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Converts an angle from Windows format (tenths of degrees) to document format (degrees)
   * @param winAngle - The angle in Windows format (tenths of degrees)
   * @returns The normalized angle in degrees, between 0 and 360
   */
  static ToSDJSAngle(winAngle) {
    // Normalize to 0-3600 range (tenths of degrees)
    let normalizedAngle = winAngle % 3600;

    // Apply angle conversion formula
    if (normalizedAngle <= 0) {
      normalizedAngle = normalizedAngle > -1800 ? -normalizedAngle : 3600 + normalizedAngle;
    } else {
      normalizedAngle = 3600 - normalizedAngle;
    }

    normalizedAngle = normalizedAngle % 3600;

    // Convert from tenths of degrees to degrees
    return normalizedAngle / 10;
  }

  /**
   * Remaps object links in a document by updating their IDs and connections
   *
   * This function processes all links in a document, updating object references to
   * use new IDs from the ID map. It handles special cases for different object types
   * including connectors, shapes, and container objects. It also manages hooks between
   * objects and handles connection geometry for segmented lines and connectors.
   *
   * @param idMap - Mapping from original IDs to new IDs
   * @param links - Array of links between objects to be remapped
   * @param resultObject - Object containing processing results and context
   * @param ignoreErrors - Whether to ignore errors during link remapping
   */
  static ReMapLinks(idMap, links, resultObject, ignoreErrors) {
    let idMapLength;
    let linkIndex;
    let currentObject;
    let objectId;
    let hookCount;
    let currentHook;
    let targetObject;
    let rotationRect;
    let rotationAngle;
    let rotatedPoints;
    let linksBlock;
    let tableObject;
    let connectorsToProcess = [];
    let linkFlags = ConstantData.LinkFlags.SED_L_MOVE;
    let skipCount = ConstantData.ConnectorDefines.SEDA_NSkip;
    let textData = {};
    let coordinateDimension = ConstantData.Defines.SED_CDim;
    idMapLength = idMap.length;

    /**
     * Updates container references in table cells
     *
     * @param table - The table object containing cells
     */
    const updateTableContainers = function (table) {
      let cellIndex;
      let currentCell;
      let cellCount = table.cells.length;

      for (cellIndex = 0; cellIndex < cellCount; cellIndex++) {
        currentCell = table.cells[cellIndex];
        if (currentCell.childcontainer >= 0) {
          currentCell.childcontainer = idMap[currentCell.childcontainer];
        }
      }
    };

    // Remove invalid links (where either end has a negative ID)
    for (linkIndex = links.length - 1; linkIndex >= 0; linkIndex--) {
      if (idMap[links[linkIndex].hookid] < 0 || idMap[links[linkIndex].targetid] < 0) {
        links.splice(linkIndex, 1);
      }
    }

    // Process all objects in the ID map
    for (let idIndex = 0; idIndex < idMapLength; idIndex++) {
      if (idMap[idIndex]) {
        objectId = idMap[idIndex];
        currentObject = T3Gv.optManager.GetObjectPtr(objectId, false);

        // Process hooks for each object
        if (currentObject && currentObject.hooks) {
          hookCount = currentObject.hooks.length;

          // Process each hook, working backwards to allow safe removal
          for (currentHook = hookCount - 1; currentHook >= 0; currentHook--) {
            if (idMap[currentObject.hooks[currentHook].objid] &&
              idMap[currentObject.hooks[currentHook].objid] > 0) {

              // Update hook's object ID reference
              currentObject.hooks[currentHook].objid = idMap[currentObject.hooks[currentHook].objid];

              // Insert link if needed
              if (links.length === 0 && !ignoreErrors) {
                if (linksBlock == null) {
                  linksBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLinksBlockID, true);
                }
                T3Gv.optManager.InsertLink(linksBlock, objectId, currentHook, ConstantData.LinkFlags.SED_L_MOVE);
              }

              // Special handling for Visio segmented lines
              if (resultObject.IsVisio &&
                currentObject &&
                currentObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
                currentObject.LineType === ConstantData.LineType.SEGLINE &&
                currentObject.segl) {

                targetObject = T3Gv.optManager.GetObjectPtr(currentObject.hooks[currentHook].objid, false);

                // Adjust connection point for rotated objects
                if (targetObject.RotationAngle) {
                  rotationRect = {
                    x: 0,
                    y: 0,
                    width: coordinateDimension,
                    height: coordinateDimension
                  };

                  rotationAngle = targetObject.RotationAngle / (180 / ConstantData.Geometry.PI);
                  rotatedPoints = [];
                  rotatedPoints.push(currentObject.hooks[currentHook].connect);
                  Utils3.RotatePointsAboutCenter(rotationRect, rotationAngle, rotatedPoints);
                }

                // Handle edge connections for shapes
                if (targetObject &&
                  targetObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
                  SDF.ConnectedToEdge(currentObject.hooks[currentHook].connect)) {

                  if (currentObject.hooks[currentHook].hookpt === ConstantData.HookPts.SED_KTL) {
                    currentObject.segl.firstdir = targetObject.GetSegLFace(
                      currentObject.hooks[currentHook].connect,
                      currentObject.StartPoint,
                      currentObject.StartPoint
                    );
                  } else {
                    currentObject.segl.lastdir = targetObject.GetSegLFace(
                      currentObject.hooks[currentHook].connect,
                      currentObject.EndPoint,
                      currentObject.EndPoint
                    );
                  }
                }
              }
            } else {
              // Remove invalid hooks and clear container child flag
              currentObject.hooks.splice(currentHook, 1);
              currentObject.moreflags = Utils2.SetFlag(
                currentObject.moreflags,
                ConstantData.ObjMoreFlags.SED_MF_ContainerChild,
                false
              );
            }
          }
        }

        // Update associated object reference
        if (currentObject && currentObject.associd >= 0) {
          if (idMap[currentObject.associd] && idMap[currentObject.associd] > 0) {
            currentObject.associd = idMap[currentObject.associd];
          } else {
            currentObject.associd = -1;
          }
        }

        // Process connector objects
        if (currentObject &&
          currentObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
          currentObject.arraylist) {

          hookCount = currentObject.arraylist.hook.length;
          let isLinearConnector = currentObject.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear;
          skipCount = ConstantData.ConnectorDefines.SEDA_NSkip;

          // For linear connectors, shift text IDs
          if (isLinearConnector) {
            for (currentHook = hookCount - 1; currentHook > skipCount; currentHook--) {
              currentObject.arraylist.hook[currentHook].textid = currentObject.arraylist.hook[currentHook - 1].textid;
              currentObject.arraylist.hook[currentHook - 1].textid = -1;
            }
          }

          // Process hook IDs and text IDs
          for (currentHook = 0; currentHook < hookCount; currentHook++) {
            // Update hook ID
            if (currentObject.arraylist.hook[currentHook].id === 65535) {
              currentObject.arraylist.hook[currentHook].id = -1;
            } else if (currentObject.arraylist.hook[currentHook].id >= 0) {
              currentObject.arraylist.hook[currentHook].id = idMap[currentObject.arraylist.hook[currentHook].id];
            }

            // Process text on connector
            if (currentObject.arraylist.hook[currentHook].textid >= 0) {
              if (!resultObject.ReadBlocks && !resultObject.ReadGroupBlock) {
                currentObject.arraylist.hook[currentHook].textid = SDF.GetLineText(
                  resultObject,
                  idIndex,
                  currentObject.arraylist.hook[currentHook].textid,
                  textData
                );

                if (textData.Paint) {
                  currentObject.StyleRecord.Fill.Paint = textData.Paint;
                }
              }
            }
          }

          // Queue connector for formatting if not ignoring errors
          if (!ignoreErrors) {
            connectorsToProcess.push(currentObject);
            currentObject.flags = Utils2.SetFlag(currentObject.flags, ConstantData.ObjFlags.SEDO_Obj1, true);
          }
        }

        // Update container references in tables
        if (currentObject &&
          currentObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
          currentObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER &&
          (tableObject = currentObject.GetTable(false))) {

          updateTableContainers(tableObject);
        }

        // Update container list references
        if (currentObject &&
          currentObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
          currentObject.ContainerList) {

          hookCount = currentObject.ContainerList.List.length;
          const containerItems = currentObject.ContainerList.List;

          for (currentHook = 0; currentHook < hookCount; currentHook++) {
            if (containerItems[currentHook].id == null) {
              containerItems[currentHook].id = -1;
            }

            if (containerItems[currentHook].id >= 0) {
              containerItems[currentHook].id = idMap[containerItems[currentHook].id];
            }
          }
        }
      }
    }

    // Update all links with new IDs
    for (linkIndex = 0; linkIndex < links.length; linkIndex++) {
      links[linkIndex].targetid = idMap[links[linkIndex].targetid];
      links[linkIndex].hookid = idMap[links[linkIndex].hookid];
      links[linkIndex].flags = linkFlags;
    }

    // Sort links by target ID for efficient lookup
    links.sort(function (firstLink, secondLink) {
      return firstLink.targetid - secondLink.targetid;
    });

    // Format all connector objects if not ignoring errors
    if (!ignoreErrors) {
      const connectorCount = connectorsToProcess.length;

      for (linkIndex = 0; linkIndex < connectorCount; linkIndex++) {
        currentObject = connectorsToProcess[linkIndex];
        hookCount = currentObject.arraylist.hook.length;

        if (hookCount < skipCount) {
          currentObject.Pr_Format(currentObject.BlockID);
        }
      }
    }
  }

  /**
   * Converts coordinates from Windows format to document format with proper scaling
   *
   * This function applies scaling to coordinate values to convert them between
   * different coordinate systems. It handles special cases where scaling might
   * result in zero values when the original value is non-zero.
   *
   * @param coordinateValue - The coordinate value to be converted
   * @param scaleFactor - The scaling factor to apply
   * @returns The converted coordinate value with proper scaling applied
   */
  static ToSDJSCoords(coordinateValue, scaleFactor) {
    let convertedValue = scaleFactor * coordinateValue;

    // Handle case where scaling results in zero, but original value isn't zero
    if (convertedValue === 0 && coordinateValue !== 0) {
      convertedValue = scaleFactor * coordinateValue; // Recalculate to avoid precision loss
    }

    return convertedValue;
  }

  /**
   * Converts a rectangle from Windows coordinate system to document coordinate system
   * @param winRect - The rectangle in Windows format with left, top, right, bottom properties
   * @param scaleFactor - The scale factor to apply to the coordinates
   * @returns A rectangle object with x, y, width, and height properties
   */
  static ToSDJSRect(winRect, scaleFactor) {
    const rect = {};

    // Convert position
    rect.x = winRect.left * scaleFactor;
    rect.y = winRect.top * scaleFactor;

    // Calculate and convert dimensions
    const width = winRect.right - winRect.left;
    const height = winRect.bottom - winRect.top;

    rect.width = width * scaleFactor;
    rect.height = height * scaleFactor;

    return rect;
  }

  /**
   * Converts a Windows color value to HTML hexadecimal color format
   * @param colorValue - The Windows color value in ABGR format (0xAARRGGBB)
   * @returns A string representing the color in HTML hex format (#RRGGBB)
   */
  static WinColorToHTML(colorValue) {
    // Extract RGB components from the color value
    const red = colorValue & 0xFF;                    // Extract red (lowest byte)
    const green = (colorValue & 0xFF00) >>> 8;        // Extract green (second byte)
    const blue = (colorValue & 0xFF0000) >>> 16;      // Extract blue (third byte)

    // Convert each component to hex and concatenate to form the HTML color string
    return '#' +
      FileParser.decimalToHex(red, 2, true) +
      FileParser.decimalToHex(green, 2, true) +
      FileParser.decimalToHex(blue, 2, true);
  }

  /**
   * Extracts the alpha channel from a Windows 32-bit color value and converts it to a 0-1 opacity value
   *
   * This function takes a Windows format color value (0xAARRGGBB) and extracts the alpha channel,
   * which uses 0 for fully opaque and 255 for fully transparent. It then converts this to the standard
   * web opacity format where 0 is fully transparent and 1 is fully opaque.
   *
   * @param colorValue - The Windows 32-bit color value with alpha channel in the high byte
   * @returns A value between 0 and 1 representing the opacity (1 = opaque, 0 = transparent)
   */
  static WinColorToAlpha(colorValue) {
    // Extract alpha value from the high byte and convert from Windows format (0=opaque, 255=transparent)
    // to standard web format (0=transparent, 1=opaque)
    return (255 - ((colorValue & 0xFF000000) >>> 24)) / 255;
  }

  /**
   * Reads outside effect data from the input object and creates an OutsideEffectData instance
   * @param outsideData - The source data containing outside effect properties
   * @param isVisio - Flag indicating whether the source is from Visio format
   * @returns A new OutsideEffectData object with properties set from the source
   */
  static ReadOutSide(outsideData, isVisio) {
    const effectData = new OutsideEffectData();

    // Set the type of outside effect (shadow, glow, etc.)
    effectData.OutsideType = outsideData.outsidetype;

    // Set the extent values for each side, ensuring they are valid numbers
    effectData.OutsideExtent_Right = isValidValue(outsideData.extent.right) ? outsideData.extent.right : 0;
    effectData.OutsideExtent_Left = isValidValue(outsideData.extent.left) ? outsideData.extent.left : 0;
    effectData.OutsideExtent_Top = isValidValue(outsideData.extent.top) ? outsideData.extent.top : 0;
    effectData.OutsideExtent_Bottom = isValidValue(outsideData.extent.bottom) ? outsideData.extent.bottom : 0;

    // Convert Windows color format to HTML color format
    effectData.Color = SDF.WinColorToHTML(outsideData.color);

    // Set additional effect parameters
    effectData.LParam = outsideData.lparam;
    effectData.WParam = outsideData.wparam;

    return effectData;

    /**
     * Checks if a value is a valid number considering Visio format requirements
     * @param value - The value to validate
     * @returns True if the value is valid, false otherwise
     */
    function isValidValue(value) {
      return !isVisio ||
        (value !== Infinity && !isNaN(value));
    }
  }

  /**
   * Reads fill data properties from the input structure and populates the fill object
   * @param fillObject - The destination fill object that will be populated with properties
   * @param codeData - The code data structure containing fill information
   * @param codeIndex - The current index/position in the code structure
   * @param resultObject - The result object containing global state and settings
   * @param opCodes - Object containing operation code constants and references
   * @returns Updated code index position after processing
   */
  static ReadSDFill(fillObject, codeData, codeIndex, resultObject, opCodes) {
    // Move past the BEGIN_FILL code
    codeIndex++;

    // Initialize fill properties with default values
    fillObject.Hatch = 0;
    fillObject.FillEffect = 0;
    fillObject.EffectColor = ConstantData.Colors.Color_White;
    fillObject.LParam = 0;
    fillObject.WParam = 0;

    // Process fill properties until we reach the END_FILL code
    while (codeData.codes[codeIndex].code != opCodes.SDF_C_END_FILL) {
      switch (codeData.codes[codeIndex].code) {
        case opCodes.SDF_C_BEGIN_PAINT:
          // Process paint information (color, pattern, etc.)
          codeIndex = SDF.ReadPaint(fillObject.Paint, codeData, codeIndex, resultObject, opCodes);
          break;

        case opCodes.SDF_C_HATCH:
          // Set hatch pattern if it's a valid hatch style
          if (codeData.codes[codeIndex].data.hatch >= 0 &&
            codeData.codes[codeIndex].data.hatch < Resources.SDGHatchStyleTotal) {
            fillObject.Hatch = codeData.codes[codeIndex].data.hatch;
          }
          break;

        case opCodes.SDF_C_EFFECT:
          // Set fill effect properties
          fillObject.FillEffect = codeData.codes[codeIndex].data.effecttype;
          fillObject.EffectColor = SDF.WinColorToHTML(codeData.codes[codeIndex].data.effectcolor);
          fillObject.LParam = codeData.codes[codeIndex].data.lparam;
          fillObject.WParam = codeData.codes[codeIndex].data.wparam;
          break;

        default:
          // Handle nested structures by recursively reading frames
          if (codeData.codes[codeIndex].code & SDF.SDF_BEGIN) {
            codeIndex = SDF.ReadFrame(
              codeData,
              codeIndex,
              codeData.codes[codeIndex].code & SDF.SDF_MASK | SDF.SDF_END
            );
          }
      }
      codeIndex++;
    }

    return codeIndex;
  }

  /**
   * Reads line style data from a code structure and populates a line style object
   * @param lineStyleObject - The destination line style object to be populated
   * @param codeData - The code data structure containing line style information
   * @param codeIndex - The current index in the code structure
   * @param resultObject - Object containing parsing results and global settings
   * @param opCodes - Object containing operation code constants
   * @returns Updated code index position after processing
   */
  static ReadSDLine(lineStyleObject, codeData, codeIndex, resultObject, opCodes) {
    const linePatterns = Resources.Windows_LinePatterns;
    let linePattern, colorValue;

    // Process line thickness with scale factor
    lineStyleObject.Thickness = SDF.ToSDJSCoords(
      codeData.codes[codeIndex].data.thickness,
      resultObject.coordScaleFactor
    );

    // Fix Visio-specific thickness issues
    if (lineStyleObject.Thickness !== 0 &&
      lineStyleObject.Thickness < 0.333 &&
      resultObject.IsVisio) {
      lineStyleObject.Thickness = 0.333;
    }

    // Handle case when source thickness is positive but scaled thickness is zero
    if (codeData.codes[codeIndex].data.thickness > 0 &&
      lineStyleObject.Thickness === 0) {
      lineStyleObject.Thickness = 1;
    }

    // Initialize border thickness
    lineStyleObject.BThick = 0;

    // Store pattern for later use
    linePattern = codeData.codes[codeIndex].data.pattern;

    // Process line pattern
    switch (linePattern) {
      case linePatterns.SEP_None:
        // No line
        lineStyleObject.Thickness = 0;
        lineStyleObject.LinePattern = 0;
        break;
      case linePatterns.SEP_Dotted:
      case linePatterns.SEP_Dashed:
      case linePatterns.SEP_DDashed:
      case linePatterns.SEP_DDDashed:
        // Use predefined pattern data
        lineStyleObject.LinePattern = Resources.LinePatternData[
          linePattern - linePatterns.SEP_Solid
        ];
        break;
      default:
        // Solid line
        lineStyleObject.LinePattern = 0;
    }

    // Initialize additional line properties
    lineStyleObject.Hatch = 0;
    lineStyleObject.LineEffect = 0;
    lineStyleObject.LParam = 0;
    lineStyleObject.WParam = 0;

    // Move to next code
    codeIndex++;

    // Process line properties until end marker is reached
    while (codeData.codes[codeIndex].code != opCodes.SDF_C_END_LINE) {
      switch (codeData.codes[codeIndex].code) {
        case opCodes.SDF_C_BEGIN_PAINT:
          // Read paint information (color, pattern, etc.)
          codeIndex = SDF.ReadPaint(
            lineStyleObject.Paint,
            codeData,
            codeIndex,
            resultObject,
            opCodes
          );
          break;

        case opCodes.SDF_C_HATCH:
          // Set hatch pattern
          lineStyleObject.Hatch = codeData.codes[codeIndex].data.hatch;
          break;

        case opCodes.SDF_C_EFFECT:
          // Set line effect properties
          lineStyleObject.LineEffect = codeData.codes[codeIndex].data.effecttype;
          lineStyleObject.LParam = codeData.codes[codeIndex].data.lparam;
          lineStyleObject.WParam = codeData.codes[codeIndex].data.wparam;
          break;

        case opCodes.SDF_C_FILLEDLINE:
          // Process filled line properties
          if (codeData.codes[codeIndex].data.bthick == 0) break;

          switch (linePattern) {
            case linePatterns.SEP_None:
            case linePatterns.SEP_Solid:
            case linePatterns.SEP_Dotted:
            case linePatterns.SEP_Dashed:
            case linePatterns.SEP_DDashed:
            case linePatterns.SEP_DDDashed:
            case linePatterns.SEP_FilledLine:
              // Store original thickness
              const originalThickness = lineStyleObject.Thickness;

              // Calculate new thickness based on border thickness
              lineStyleObject.Thickness = SDF.ToSDJSCoords(
                2 * codeData.codes[codeIndex].data.bthick,
                resultObject.coordScaleFactor
              );

              // Clear pattern for filled lines
              if (linePattern === linePatterns.SEP_FilledLine) {
                lineStyleObject.LinePattern = 0;
              }

              // Set border thickness to half of line thickness
              lineStyleObject.BThick = lineStyleObject.Thickness / 2;

              // Update color if needed
              if (lineStyleObject.Paint.Color === ConstantData.Colors.Color_White &&
                originalThickness > 0) {
                colorValue = SDF.WinColorToHTML(codeData.codes[codeIndex].data.color);
                if (colorValue != ConstantData.Colors.Color_White) {
                  lineStyleObject.Paint.Color = colorValue;
                  lineStyleObject.Paint.Opacity = SDF.WinColorToAlpha(
                    codeData.codes[codeIndex].data.color
                  );
                }
              }
              break;

            case linePatterns.SEP_DoubleLine:
              // Process double line
              lineStyleObject.Thickness = SDF.ToSDJSCoords(
                2 * codeData.codes[codeIndex].data.bthick,
                resultObject.coordScaleFactor
              );
              lineStyleObject.LinePattern = 0;
              lineStyleObject.BThick = lineStyleObject.Thickness / 2;
              break;
          }
          break;

        default:
          // Handle nested structures by recursively reading frames
          if (codeData.codes[codeIndex].code & SDF.SDF_BEGIN) {
            codeIndex = SDF.ReadFrame(
              codeData,
              codeIndex,
              codeData.codes[codeIndex].code & SDF.SDF_MASK | SDF.SDF_END
            );
          }
      }
      codeIndex++;
    }

    return codeIndex;
  }

  /**
   * Reads paint properties from a code structure and populates a paint data object
   * @param paintObject - The destination paint object to populate with properties
   * @param codeData - The source data structure containing paint information
   * @param codeIndex - The current position in the code structure
   * @param resultObject - Object containing parsing results and global settings
   * @param opCodes - Object containing operation code constants and references
   * @returns Updated code index after processing the paint information
   */
  static ReadPaint(paintObject, codeData, codeIndex, resultObject, opCodes) {
    let richGradient;
    let gradientStop;
    let stopColor;
    let stopOpacity;

    // Initialize paint properties with source data
    paintObject.FillType = codeData.codes[codeIndex].data.filltype;
    paintObject.Color = SDF.WinColorToHTML(codeData.codes[codeIndex].data.color);
    paintObject.Opacity = SDF.WinColorToAlpha(codeData.codes[codeIndex].data.color);

    // Set default values for other properties
    paintObject.EndColor = ConstantData.Colors.Color_White;
    paintObject.GradientFlags = 0;
    paintObject.Texture = 0;
    paintObject.TextureScale = new Resources.TextureScale;
    paintObject.EndOpacity = 1;

    // Fix fully opaque colors (remove alpha channel)
    if ((paintObject.Color & 0xFF000000) === 0xFF000000) {
      paintObject.Color = paintObject.Color & 0xFFFFFF;
      paintObject.Opacity = 1;
    }

    // Move past the PAINT code
    codeIndex++;

    // Process all paint properties until END_PAINT code
    while (codeData.codes[codeIndex].code != opCodes.SDF_C_END_PAINT) {
      switch (codeData.codes[codeIndex].code) {
        case opCodes.SDF_C_GRADIENT:
          // Process gradient information
          paintObject.EndColor = SDF.WinColorToHTML(codeData.codes[codeIndex].data.ecolor);
          paintObject.GradientFlags = codeData.codes[codeIndex].data.gradientflags;
          paintObject.EndOpacity = SDF.WinColorToAlpha(codeData.codes[codeIndex].data.ecolor);

          // Fix fully opaque end colors
          if ((paintObject.EndColor & 0xFF000000) === 0xFF000000) {
            paintObject.EndColor = paintObject.EndColor & 0xFFFFFF;
            paintObject.EndOpacity = 1;
          }
          break;

        case opCodes.SDF_C_RICHGRADIENT:
          // Create a rich gradient with specified type and angle
          richGradient = new Resources.SDRichGradient(
            codeData.codes[codeIndex].data.gradienttype,
            codeData.codes[codeIndex].data.angle
          );
          break;

        case opCodes.SDF_C_RICHGRADIENTSTOP:
          // Add a gradient stop if a rich gradient exists
          if (richGradient !== undefined) {
            stopColor = SDF.WinColorToHTML(codeData.codes[codeIndex].data.color);
            stopOpacity = SDF.WinColorToAlpha(codeData.codes[codeIndex].data.color);

            gradientStop = new Resources.SDRichGradientStop(
              stopColor,
              stopOpacity,
              codeData.codes[codeIndex].data.stop
            );

            richGradient.stops.push(gradientStop);
          }
          break;

        case opCodes.SDF_C_TEXTURE:
          // Handle texture index references
          if (resultObject.ReadBlocks) {
            paintObject.Texture = codeData.codes[codeIndex].data.textureindex;
          } else if (resultObject.TextureList.Textures[codeData.codes[codeIndex].data.textureindex]) {
            paintObject.Texture = resultObject.TextureList.Textures[codeData.codes[codeIndex].data.textureindex].index;
          } else {
            resultObject.ReadTexture = codeData.codes[codeIndex].data.textureindex;
            paintObject.Texture = undefined;
          }
          break;

        case opCodes.SDF_C_THEME_TEXTURE:
          // Theme textures handled elsewhere
          break;

        case opCodes.SDF_O_TEXTUREEXTRA:
          // Set texture scale and alignment properties
          paintObject.TextureScale.Units = codeData.codes[codeIndex].data.units;
          paintObject.TextureScale.Scale = codeData.codes[codeIndex].data.scale;
          paintObject.TextureScale.RWidth = codeData.codes[codeIndex].data.rwidth;
          paintObject.TextureScale.AlignmentScalar = codeData.codes[codeIndex].data.alignment;
          paintObject.TextureScale.Flags = codeData.codes[codeIndex].data.flags;
          break;

        default:
          // Handle nested structures by recursively reading frames
          if (codeData.codes[codeIndex].code & SDF.SDF_BEGIN) {
            codeIndex = SDF.ReadFrame(
              codeData,
              codeIndex,
              (codeData.codes[codeIndex].code & SDF.SDF_MASK) | SDF.SDF_END
            );
          }
      }
      codeIndex++;
    }

    // If a rich gradient was defined, add it to the rich gradients collection
    if (richGradient !== undefined) {
      paintObject.GradientFlags = T3Gv.optManager.SD_AddRichGradient(
        resultObject.RichGradients,
        richGradient
      );
    }

    return codeIndex;
  }

  /**
   * Reads text formatting properties and populates a text format object
   * @param textFormatObject - The destination text format object to populate
   * @param codeData - The source data structure containing text format information
   * @param codeIndex - The current position in the code structure
   * @param resultObject - Object containing parsing results and global settings
   * @param opCodes - Object containing operation code constants and references
   * @returns Updated code index after processing text format information
   */
  static ReadSDTxf(textFormatObject, codeData, codeIndex, resultObject, opCodes) {
    // Handle font information from font list or direct ID
    if (resultObject.fontlist.length) {
      const fontRecord = SDF.FontIDtoFontRec(codeData.codes[codeIndex].data.fontid, resultObject);
      textFormatObject.FontName = fontRecord.fontName;
    } else {
      textFormatObject.FontId = codeData.codes[codeIndex].data.fontid;

      if (textFormatObject.FontId >= 0 && textFormatObject.FontId < resultObject.fontlist.length) {
        textFormatObject.FontName = resultObject.fontlist[textFormatObject.FontId].fontName;
      }
    }

    // Set basic text properties
    textFormatObject.FontSize = codeData.codes[codeIndex].data.fsize;
    textFormatObject.Face = codeData.codes[codeIndex].data.face;

    // Move past the TEXTF code
    codeIndex++;

    // Process all text format properties until END_TEXTF code
    while (codeData.codes[codeIndex].code != opCodes.SDF_C_END_TEXTF) {
      switch (codeData.codes[codeIndex].code) {
        case opCodes.SDF_C_BEGIN_PAINT:
          // Process paint information for text
          codeIndex = SDF.ReadPaint(
            textFormatObject.Paint,
            codeData,
            codeIndex,
            resultObject,
            opCodes
          );
          break;

        case opCodes.SDF_C_THEME_FONT12:
          // Set font name from theme
          textFormatObject.FontName = codeData.codes[codeIndex].data.fontname;
          break;

        case opCodes.SDF_C_OUTSIDE:
          // Process outside effects for text (shadows, outlines, etc.)
          textFormatObject.Effect = SDF.ReadOutSide(
            codeData.codes[codeIndex].data,
            resultObject.IsVisio
          );
          break;

        default:
          // Handle nested structures by recursively reading frames
          if (codeData.codes[codeIndex].code & SDF.SDF_BEGIN) {
            codeIndex = SDF.ReadFrame(
              codeData,
              codeIndex,
              (codeData.codes[codeIndex].code & SDF.SDF_MASK) | SDF.SDF_END
            );
          }
      }
      codeIndex++;
    }

    // Reset font ID after processing (font name takes precedence)
    textFormatObject.FontId = -1;

    return codeIndex;
  }

  /**
   * Reads style information from a code structure and populates a style object
   * @param styleObject - The destination style object to be populated with properties
   * @param codeData - The code data structure containing style information
   * @param codeIndex - The current index in the code structure
   * @param resultObject - Object containing parsing results and global settings
   * @param opCodes - Object containing operation code constants
   * @returns Updated code index position after processing
   */
  static ReadStyle(styleObject, codeData, codeIndex, resultObject, opCodes) {
    // Set the style name from the data
    styleObject.Name = codeData.codes[codeIndex].data.stylename;

    // Move past the BEGIN_STYLE code
    codeIndex++;

    // Process all style properties until END_STYLE code is reached
    while (codeData.codes[codeIndex].code != opCodes.SDF_C_END_STYLE) {
      switch (codeData.codes[codeIndex].code) {
        case opCodes.SDF_C_BEGIN_FILL:
          // Process fill properties (color, pattern, etc.)
          codeIndex = SDF.ReadSDFill(styleObject.Fill, codeData, codeIndex, resultObject, opCodes);
          break;

        case opCodes.SDF_C_BEGIN_LINE:
          // Process both border and line properties
          SDF.ReadSDLine(styleObject.Border, codeData, codeIndex, resultObject, opCodes);
          codeIndex = SDF.ReadSDLine(styleObject.Line, codeData, codeIndex, resultObject, opCodes);
          break;

        case opCodes.SDF_C_BEGIN_TEXTF:
          // Process text formatting properties
          codeIndex = SDF.ReadSDTxf(styleObject.Text, codeData, codeIndex, resultObject, opCodes);
          break;

        case opCodes.SDF_C_OUTSIDE:
          // Process outside effects (shadows, outlines, etc.)
          styleObject.OutsideEffect = SDF.ReadOutSide(codeData.codes[codeIndex].data, resultObject.IsVisio);
          break;

        default:
          // Handle nested structures by recursively reading frames
          if (codeData.codes[codeIndex].code & SDF.SDF_BEGIN) {
            codeIndex = SDF.ReadFrame(
              codeData,
              codeIndex,
              (codeData.codes[codeIndex].code & SDF.SDF_MASK) | SDF.SDF_END
            );
          }
      }
      codeIndex++;
    }

    return codeIndex;
  }

  /**
   * Reads a list of styles from the data structure and populates a style array
   * @param styleArray - The array to populate with style objects
   * @param codeData - The code data structure containing style information
   * @param codeIndex - The current index in the code structure
   * @param resultObject - Object containing parsing results and global settings
   * @param opCodes - Object containing operation code constants
   * @returns Updated code index position after processing
   */
  static ReadStyleList(styleArray, codeData, codeIndex, resultObject, opCodes) {
    let styleObject;

    // Move past the BEGIN_STYLELIST code
    codeIndex++;

    // Process all styles until END_STYLELIST code is reached
    while (codeData.codes[codeIndex].code != opCodes.SDF_C_END_STYLELIST) {
      if (codeData.codes[codeIndex].code === opCodes.SDF_C_BEGIN_STYLE) {
        // Create a new style object and read its properties
        styleObject = new QuickStyle();
        codeIndex = SDF.ReadStyle(styleObject, codeData, codeIndex, resultObject, opCodes);
        styleArray.push(styleObject);
      } else if (codeData.codes[codeIndex].code & SDF.SDF_BEGIN) {
        // Handle nested structures by recursively reading frames
        codeIndex = SDF.ReadFrame(
          codeData,
          codeIndex,
          (codeData.codes[codeIndex].code & SDF.SDF_MASK) | SDF.SDF_END
        );
      }
      codeIndex++;
    }

    return codeIndex;
  }

  /**
   * Fixes session flag defaults based on document type and context
   * @param sessionObject - The session object to modify
   * @param resultObject - Object containing parsing results and global settings
   */
  static FixDefaults(sessionObject, resultObject) {
    const sessionFlags = ConstantData.SessionFlags;

    // Special handling for Genograms panel if not a symbol
    if (!resultObject.isSymbol &&
      T3Gv.optManager.theContentHeader.smartpanelname === 'Genograms') {
      // Enable linking lines
      sessionObject.flags = Utils2.SetFlag(sessionObject.flags, sessionFlags.SEDS_LLink, true);
      // Hide connector expansion handles
      sessionObject.flags = Utils2.SetFlag(sessionObject.flags, sessionFlags.SEDS_HideConnExpand, true);
    }
  }

  /**
   * Sets default curvature parameters for templates and builder documents
   * @param sessionObject - The session object to modify
   * @param resultObject - Object containing parsing results and global settings
   */
  static SetCurvatureDefaults(sessionObject, resultObject) {
    // Apply curvature defaults for older documents in template mode or builder
    if (!resultObject.isSymbol &&
      (resultObject.isTemplate || SDUI.Builder) &&
      resultObject.PVersion < SDF.SDF_PVERSION864) {

      // Define fixed round rectangle parameter
      const roundRectParam = ConstantData.Defines.DefFixedRRect;

      // Set curvature parameter (scaled by 100)
      sessionObject.def.curveparam = 100 * roundRectParam;

      // Set round rectangle parameter
      sessionObject.def.rrectparam = roundRectParam;
    }
  }

  /**
   * Reads and processes drawing configuration data from a code structure
   * @param codeData - The source data structure containing drawing information
   * @param codeIndex - The current index in the code structure
   * @param resultObject - Object containing parsing results and settings
   * @param opCodes - Object containing operation code constants
   * @param endCodeMarker - The code marker that indicates the end of the drawing section
   * @returns The updated code index position after processing
   */
  static ReadDraw(codeData, codeIndex, resultObject, opCodes, endCodeMarker) {
    let styleCount = 0;
    let imageRecord = null;
    let graphBlock = null;
    let ganttInfoBlock = null;
    let expandedViewBlock = null;
    let tableBlock = null;
    const sessionData = resultObject.sdp;
    const layerManager = resultObject.tLMB;

    // Initialize session data based on file format version
    if (endCodeMarker != opCodes.SDF_C_DRAW_END) {
      // Modern format - read session data directly
      SDF.ReadDrawSession(sessionData, layerManager, codeData.codes[codeIndex].data, resultObject);

      // Apply special handling for Visio imports
      if (resultObject.IsVisio) {
        SDF.SetDefaults(sessionData, resultObject);
      }
    } else {
      // Legacy format (version 6) - read and convert session data
      SDF.SetDefaults(sessionData, resultObject);
      SDF.ReadDrawSession6(sessionData, codeData.codes[codeIndex].data, resultObject);
      SDF.SetDefaults(sessionData, resultObject);
    }

    // Apply additional defaults and fixes
    SDF.FixDefaults(sessionData, resultObject);
    SDF.SetCurvatureDefaults(sessionData, resultObject);

    // Move past the header code
    codeIndex++;

    // Process all drawing components until end marker is reached
    while (codeData.codes[codeIndex].code != endCodeMarker) {
      switch (codeData.codes[codeIndex].code) {
        case opCodes.SDF_C_DRAW7:
          // Process version 7 drawing data
          SDF.ReadDraw7(sessionData, layerManager, codeData.codes[codeIndex].data, resultObject);
          break;

        case opCodes.SDF_C_DRAWEXTRA:
          // Process extended drawing properties
          SDF.ReadDrawExtra(sessionData, codeData.codes[codeIndex].data, resultObject);
          break;

        case opCodes.SDF_C_SDDATA64C:
          // Load structured data sets
          ListManager.SDData.LoadDataSets(codeData.codes[codeIndex].data.bytes, true, true, resultObject);
          break;

        case opCodes.SDF_C_BEGIN_STYLE:
          // Process style information
          if (styleCount === 0) {
            // First style is the default style for session
            codeIndex = SDF.ReadStyle(sessionData.def.style, codeData, codeIndex, resultObject, opCodes);
            SDF.SetDefaults(sessionData, resultObject);
          } else {
            // Additional styles
            let newStyle = new QuickStyle();
            codeIndex = SDF.ReadStyle(newStyle, codeData, codeIndex, resultObject, opCodes);
          }
          styleCount++;
          break;

        case opCodes.SDF_C_BEGIN_FILL:
          // Process background fill properties
          codeIndex = SDF.ReadSDFill(sessionData.background, codeData, codeIndex, resultObject, opCodes);

          // Fix texture references if needed
          if (resultObject.sdp.background.Paint.FillType === ConstantData.FillTypes.SDFILL_TEXTURE &&
            resultObject.sdp.background.Paint.Texture == null) {
            resultObject.sdp.background.Paint.Texture = resultObject.ReadTexture;
          }
          break;

        case opCodes.SDF_C_BEGIN_LINE:
          // Process line style properties
          codeIndex = SDF.ReadSDLine(sessionData.def.style.Line, codeData, codeIndex, resultObject, opCodes);
          SDF.SetDefaults(sessionData, resultObject);
          break;

        case opCodes.SDF_C_BEGIN_STYLELIST:
          // Process list of styles
          codeIndex = SDF.ReadStyleList(resultObject.lpStyles, codeData, codeIndex, resultObject, opCodes);
          break;

        case opCodes.SDF_C_DRAWLINK:
        case opCodes.SDF_C_DRAWLINK6:
          // Process object links
          SDF.ReadLinkList(resultObject.links, codeData.codes[codeIndex].data);
          break;

        case opCodes.SDF_C_DRAWGROUP:
          // Group definition (handled elsewhere)
          break;

        case opCodes.SDF_C_DRAWOBJ8:
          // Process version 8 drawing object
          codeIndex = SDF.ReadObject(codeData, codeIndex, resultObject, opCodes,
            FileParser.SDROpCodesByName.SDF_C_DRAWOBJ8_END);

          if (codeIndex < 0) {
            return -1; // Error occurred while reading object
          }
          break;

        case opCodes.SDF_C_DRAWOBJ:
          // Process standard drawing object
          codeIndex = SDF.ReadObject(codeData, codeIndex, resultObject, opCodes,
            FileParser.SDROpCodesByName.SDF_C_DRAWOBJ_END);

          if (codeIndex < 0) {
            return -1; // Error occurred while reading object
          }
          break;

        case opCodes.SDF_C_TABLEBLOCK:
          // Process table block
          tableBlock = SDF.ReadTableBlock(codeData, codeIndex, resultObject);
          break;

        case opCodes.SDF_C_GRAPHBLOCK:
          // Process graph block
          graphBlock = SDF.ReadGraphBlock(codeData, codeIndex, resultObject);
          break;

        case opCodes.SDF_C_GRAPH:
          // Process graph data
          if (graphBlock == null) {
            graphBlock = new ListManager.Graph();
          }
          codeIndex = SDF.ReadGraph(graphBlock, codeData, codeIndex, resultObject, opCodes, opCodes.SDF_C_GRAPH_END);
          break;

        case opCodes.SDF_C_EXPANDEDVIEWBLOCK:
          // Process expanded view block
          expandedViewBlock = SDF.ReadExpandedViewBlock(codeData, codeIndex, resultObject);
          break;

        case opCodes.SDF_C_EXPANDEDVIEW:
          // Process expanded view SVG data
          if (expandedViewBlock) {
            expandedViewBlock.Data = codeData.codes[codeIndex].data.svg;
          }
          break;

        case opCodes.SDF_C_GANTTINFOBLOCK:
          // Process Gantt chart info block
          ganttInfoBlock = SDF.ReadGanttInfoBlock(codeData, codeIndex, resultObject);
          break;

        case opCodes.SDF_C_CLOUDCOMMENTBLOCK:
          // Process cloud comment block
          SDF.ReadCommentBlock(codeData, codeIndex, resultObject);
          break;

        case opCodes.SDF_C_GANTTINFO:
          // Process Gantt chart information
          if (ganttInfoBlock == null) {
            ganttInfoBlock = new ListManager.Table.GanttInfo();
          }
          SDF.ReadGanttInfo(ganttInfoBlock, codeData.codes[codeIndex].data, resultObject);
          break;

        case opCodes.SDF_C_LONGTEXT8:
          // Process text block
          codeIndex = SDF.ReadTextBlock(codeData, codeIndex, resultObject, opCodes, false);
          break;

        case opCodes.SDF_C_COMMENT:
          // Process comment text
          codeIndex = SDF.ReadTextBlock(codeData, codeIndex, resultObject, opCodes, true);
          break;

        case opCodes.SDF_C_IMAGEBLOCK:
          // Process image block
          SDF.ReadImageBlock(codeData, codeIndex, resultObject, opCodes, true);
          break;

        case opCodes.SDF_C_NATIVEBLOCK:
          // Process native format block
          codeIndex = SDF.ReadNativeBlock(codeData, codeIndex, resultObject, opCodes, true);
          break;

        case opCodes.SDF_C_NATIVEWINBLOCK:
          // Process native Windows format block
          codeIndex = SDF.ReadNativeBlock(codeData, codeIndex, resultObject, opCodes, false);
          break;

        case opCodes.SDF_O_RULER:
          // Process ruler configuration
          resultObject.rulerConfig = new RulerConfig();
          SDF.ReadRulers(codeData.codes[codeIndex].data, resultObject);
          break;

        case opCodes.SDF_C_LINEDRAWLIST:
          // Process line drawing list
          SDF.ReadLineDrawList(codeData.codes[codeIndex].data, resultObject);
          break;

        case opCodes.SDF_C_RECENTSYMBOLS_BEGIN:
          // Process recent symbols list
          codeIndex = SDF.ReadRecentSymbols(codeData, codeIndex, resultObject, opCodes);
          break;

        case opCodes.SDF_C_BEGIN_LAYER:
          // Process layer definitions
          codeIndex = SDF.ReadLayers(codeData, codeIndex, resultObject, opCodes);
          break;

        case opCodes.SDF_C_DRAWIMAGE8:
          // Process image record data
          imageRecord = new ListManager.ImageRecord();
          imageRecord.croprect = codeData.codes[codeIndex].data.croprect;
          imageRecord.scale = codeData.codes[codeIndex].data.scale;
          imageRecord.imageflags = codeData.codes[codeIndex].data.imageflags;
          imageRecord.iconid = 0;

          // Handle icon IDs in newer file versions
          if (resultObject.PVersion >= SDF.SDF_PVERSION838 &&
            codeData.codes[codeIndex].data.iconid) {
            imageRecord.iconid = codeData.codes[codeIndex].data.iconid;
          }
          break;

        case opCodes.SDF_C_DRAWPNG:
        case opCodes.SDF_C_DRAWJPG:
        case opCodes.SDF_C_DRAWMETA:
          // Image data (handled elsewhere)
          break;

        case opCodes.SDF_O_TEXTURELIST:
          // Process texture list
          codeIndex = SDF.ReadTextureList(codeData, codeIndex, resultObject, opCodes, false);
          break;

        case opCodes.SDF_C_DEFTXSCALE:
        case opCodes.SDF_C_DEFLBTXSCALE:
        case opCodes.SDF_C_DEFSBTXSCALE:
          // Texture scale settings (handled elsewhere)
          break;

        default:
          // Handle nested structures by recursively reading frames
          if (codeData.codes[codeIndex].code & SDF.SDF_BEGIN) {
            codeIndex = SDF.ReadFrame(
              codeData,
              codeIndex,
              (codeData.codes[codeIndex].code & SDF.SDF_MASK) | SDF.SDF_END
            );
          }
      }
      codeIndex++;
    }

    return codeIndex;
  }

  /**
   * Converts Windows text justification constants to JavaScript/CSS alignment format
   *
   * This function translates numeric Windows justification codes to corresponding
   * CSS-style alignment strings for both horizontal and vertical text alignment.
   *
   * @param winJustification - The Windows justification constant (0=left/top, 2=right, 6=center/middle, 8=bottom)
   * @param isVertical - Flag indicating whether to return vertical alignment values (true) or horizontal (false)
   * @returns Text alignment value in CSS format ('left', 'right', 'center', 'top', 'middle', 'bottom')
   */
  static W32JustToJS(winJustification, isVertical) {
    let alignment = 'center';

    switch (winJustification) {
      case 0:
        alignment = isVertical ? 'top' : 'left';
        break;
      case 2:
        alignment = 'right';
        break;
      case 6:
        alignment = isVertical ? 'middle' : 'center';
        break;
      case 8:
        alignment = 'bottom';
    }

    return alignment;
  }

  /**
   * Converts Windows text justification values to internal text alignment constants
   *
   * This function maps horizontal and vertical text justification values from Windows format
   * to the application's internal TextAlign constants. It handles nine possible combinations:
   * top-left, top-center, top-right, middle-left, middle-center, middle-right,
   * bottom-left, bottom-center, and bottom-right.
   *
   * @param horizontalAlignment - The horizontal alignment value from Windows (TA_LEFT, TA_RIGHT, etc.)
   * @param verticalAlignment - The vertical alignment value from Windows (TA_TOP, TA_BOTTOM, etc.)
   * @returns A combined text alignment constant from ConstantData.TextAlign
   */
  static W32JustToTextAlign(horizontalAlignment, verticalAlignment) {
    let textAlignment = ConstantData.TextAlign.CENTER;

    switch (verticalAlignment) {
      case FileParser.TextJust.TA_TOP:
        // Handle top alignment combined with horizontal alignment
        switch (horizontalAlignment) {
          case FileParser.TextJust.TA_LEFT:
            textAlignment = ConstantData.TextAlign.TOPLEFT;
            break;
          case FileParser.TextJust.TA_RIGHT:
            textAlignment = ConstantData.TextAlign.TOPRIGHT;
            break;
          default:
            textAlignment = ConstantData.TextAlign.TOPCENTER;
        }
        break;

      case FileParser.TextJust.TA_BOTTOM:
        // Handle bottom alignment combined with horizontal alignment
        switch (horizontalAlignment) {
          case FileParser.TextJust.TA_LEFT:
            textAlignment = ConstantData.TextAlign.BOTTOMLEFT;
            break;
          case FileParser.TextJust.TA_RIGHT:
            textAlignment = ConstantData.TextAlign.BOTTOMRIGHT;
            break;
          default:
            textAlignment = ConstantData.TextAlign.BOTTOMCENTER;
        }
        break;

      default:
        // Handle middle vertical alignment (default) with horizontal alignment
        switch (horizontalAlignment) {
          case FileParser.TextJust.TA_LEFT:
            textAlignment = ConstantData.TextAlign.LEFT;
            break;
          case FileParser.TextJust.TA_RIGHT:
            textAlignment = ConstantData.TextAlign.RIGHT;
            break;
          default:
            textAlignment = ConstantData.TextAlign.CENTER;
        }
    }

    return textAlignment;
  }

  /**
   * Reads drawing session data from a source object and populates the destination session object with properly scaled values
   *
   * This function translates drawing session information from source data format to the application's internal format,
   * handling coordinate scaling, text alignment, arrow properties, and various drawing preferences.
   *
   * @param sessionObject - The destination session object to be populated with drawing settings
   * @param layerManager - The layer manager object that manages drawing layers
   * @param sourceData - The source data containing drawing session information
   * @param resultObject - Object containing scaling factors and processing settings
   * @returns The populated session object with all properties set
   */
  static ReadDrawSession(sessionObject, layerManager, sourceData, resultObject) {
    // Handle displacement and dimensions, preferring "l" prefixed properties if available
    const displacement = sourceData.ldupdisp ? sourceData.ldupdisp : sourceData.dupdisp;
    const dimensions = sourceData.ldim ? sourceData.ldim : sourceData.dim;

    // Set dimensions with minimum defaults
    sessionObject.dim.x = SDF.ToSDJSCoords(dimensions.x, resultObject.coordScaleFactor);
    sessionObject.dim.y = SDF.ToSDJSCoords(dimensions.y, resultObject.coordScaleFactor);
    if (sessionObject.dim.x <= 0) {
      sessionObject.dim.x = 400;
    }
    if (sessionObject.dim.y <= 0) {
      sessionObject.dim.y = 400;
    }

    // Initialize comment IDs
    sessionObject.CommentListID = -1;
    sessionObject.CommentID = -1;

    // Copy basic properties
    sessionObject.flags = sourceData.flags;
    sessionObject.tselect = sourceData.tselect;

    // Set duplication displacement
    sessionObject.dupdisp.x = SDF.ToSDJSCoords(displacement.x, resultObject.coordScaleFactor);
    sessionObject.dupdisp.y = SDF.ToSDJSCoords(displacement.y, resultObject.coordScaleFactor);

    // Process arrow properties
    sessionObject.d_sarrow = sourceData.d_sarrow & FileParser.ArrowMasks.ARROW_T_MASK;
    sessionObject.d_sarrowdisp = !!(sourceData.d_sarrow & FileParser.ArrowMasks.ARROW_DISP);
    sessionObject.d_arrowsize = sourceData.d_arrowsize;
    sessionObject.d_earrow = sourceData.d_earrow & FileParser.ArrowMasks.ARROW_T_MASK;
    sessionObject.d_earrowdisp = !!(sourceData.d_earrow & FileParser.ArrowMasks.ARROW_DISP);

    // Set text justification/alignment
    sessionObject.def.just = SDF.W32JustToJS(sourceData.just, false);
    sessionObject.def.vjust = SDF.W32JustToJS(sourceData.vjust, true);

    // Set snap alignment
    sessionObject.centersnapalign = sourceData.snapalign ? true : false;

    // Set hop style and dimensions for line crossing
    sessionObject.hopstyle = sourceData.hopstyle;
    sessionObject.hopdim.x = SDF.ToSDJSCoords(sourceData.hopdim.x, resultObject.coordScaleFactor);
    sessionObject.hopdim.y = SDF.ToSDJSCoords(sourceData.hopdim.y, resultObject.coordScaleFactor);

    // Set dimension flags
    sessionObject.dimensions = sourceData.dimensions;
    sessionObject.shapedimensions = sourceData.shapedimensions;

    // Set active layer
    layerManager.activelayer = sourceData.activelayer;

    // Set default flags and text margins
    sessionObject.def.flags = sourceData.defflags;
    sessionObject.def.tmargins.left = SDF.ToSDJSCoords(sourceData.tmargins.left, resultObject.coordScaleFactor);
    sessionObject.def.tmargins.top = SDF.ToSDJSCoords(sourceData.tmargins.top, resultObject.coordScaleFactor);
    sessionObject.def.tmargins.right = SDF.ToSDJSCoords(sourceData.tmargins.right, resultObject.coordScaleFactor);
    sessionObject.def.tmargins.bottom = SDF.ToSDJSCoords(sourceData.tmargins.bottom, resultObject.coordScaleFactor);

    // Set text properties
    sessionObject.def.textgrow = sourceData.textgrow;
    sessionObject.def.textflags = sourceData.textflags;
    sessionObject.def.fsize_min = sourceData.fsize_min;
    sessionObject.def.lastcommand = sourceData.lastcommand;

    // Set array dimensions if available
    if (sourceData.h_arraywidth) {
      sessionObject.def.h_arraywidth = SDF.ToSDJSCoords(sourceData.h_arraywidth, resultObject.coordScaleFactor);
      sessionObject.def.v_arraywidth = SDF.ToSDJSCoords(sourceData.v_arraywidth, resultObject.coordScaleFactor);
    }

    if (sourceData.arrayht) {
      sessionObject.def.arraywd = SDF.ToSDJSCoords(sourceData.arraywd, resultObject.coordScaleFactor);
      sessionObject.def.arrayht = SDF.ToSDJSCoords(sourceData.arrayht, resultObject.coordScaleFactor);
    }

    // Set optional flags if available
    if (sourceData.sequenceflags) {
      sessionObject.sequenceflags = sourceData.sequenceflags;
    }

    if (sourceData.chartdirection) {
      sessionObject.chartdirection = sourceData.chartdirection;
    }

    if (sourceData.copyPasteTrialVers) {
      sessionObject.copyPasteTrialVers = sourceData.copyPasteTrialVers;
    }

    if (sourceData.taskmanagementflags) {
      sessionObject.taskmanagementflags = sourceData.taskmanagementflags;
    }

    if (sourceData.taskdays) {
      sessionObject.taskdays = sourceData.taskdays;
    }

    // Set more flags with defaults
    sessionObject.moreflags = sourceData.moreflags ? sourceData.moreflags : 0;
    sessionObject.moreflags = Utils2.SetFlag(
      sessionObject.moreflags,
      ConstantData.SessionMoreFlags.SEDSM_Swimlane_Rows,
      true
    );
    sessionObject.moreflags = Utils2.SetFlag(
      sessionObject.moreflags,
      ConstantData.SessionMoreFlags.SEDSM_Swimlane_Cols,
      true
    );

    // Set field mask
    sessionObject.fieldmask = sourceData.fieldmask ? sourceData.fieldmask : 0;

    // Set wall thickness for architectural drawings
    sessionObject.def.wallThickness = sourceData.wallThickness ? sourceData.wallThickness : 0;

    // Set curve parameters for rounded shapes
    sessionObject.def.curveparam = (sourceData.curveparam != null) ? sourceData.curveparam : 0;
    sessionObject.def.rrectparam = (sourceData.rrectparam != null) ? sourceData.rrectparam : ConstantData.Defines.DefFixedRRect;

    return sessionObject;
  }

  /**
   * Sets default style properties for drawing objects in a session
   *
   * This function configures default values for borders, lines, fills, and text styles
   * that will be used when creating new objects in the drawing session.
   *
   * @param session - The drawing session containing default style definitions
   * @param defaults - The object to be populated with default values
   */
  static SetDefaults(session, defaults) {
    // Set border defaults
    defaults.DefBorder.bord = session.def.style.Border.Thickness;
    defaults.DefBorder.color = session.def.style.Border.Paint.Color;
    defaults.DefBorder.patindex = 0;

    // Set line defaults
    defaults.DefLine.bord = session.def.style.Line.Thickness;
    defaults.DefLine.color = session.def.style.Line.Paint.Color;
    defaults.DefLine.patindex = 0;
    defaults.DefLine.arrowsize = 0;
    defaults.DefLine.sarrow = 0;
    defaults.DefLine.earrow = 0;

    // Set fill defaults
    defaults.DefFill.Hatch = 0;
    defaults.DefFill.color = session.def.style.Fill.Paint.Color;
    defaults.DefFill.ecolor = session.def.style.Fill.Paint.EndColor;
    defaults.DefFill.gradientflags = session.def.style.Fill.Paint.GradientFlags;

    // Set text defaults
    SDF.DefaultText(session, defaults);
  }

  /**
   * Sets default text properties for drawing objects
   *
   * This function configures default values for text formatting including
   * font, size, alignment, indentation, and other text styling properties.
   *
   * @param session - The drawing session containing default text style definitions (can be null)
   * @param defaults - The object to be populated with default text values
   */
  static DefaultText(session, defaults) {
    if (session) {
      // Copy values from the session
      defaults.DefFont = $.extend(true, {}, session.def.lf);
      defaults.SDF_DefFSize = session.def.style.Text.FontSize;
      defaults.DefRun.fontrec = $.extend(true, {}, session.def.lf);
      defaults.DefRun.fontrec.fontSize = session.def.style.Text.FontSize;
      defaults.DefRun.fontrec.face = session.def.style.Text.Face;
      defaults.DefRun.paint = $.extend(true, {}, session.def.style.Text.Paint);
    } else {
      // Create new default objects
      defaults.DefRun.fontrec = new FontRecord();
      defaults.DefFont = new FontRecord();
      defaults.DefRun.paint = new PaintData(ConstantData.Colors.Color_Black);
    }

    // Set text run properties
    defaults.DefRun.styleid = 0;
    defaults.DefRun.linkid = -1;
    defaults.DefRun.flags = 0;
    defaults.DefRun.orient = 0;
    defaults.DefRun.start = 0;
    defaults.DefRun.nchar = 0;
    defaults.DefRun.fonth = 0;
    defaults.DefRun.extra = 0;
    defaults.DefRun.hyph = 0;

    // Set text style properties
    defaults.DefTStyle.tracking = 0;
    defaults.DefTStyle.spacing = 0;
    defaults.DefTStyle.just = 'left';
    defaults.DefTStyle.leading = 0;
    defaults.DefTStyle.lindent = 0;
    defaults.DefTStyle.bindent = 20;
    defaults.DefTStyle.hyphen = 1;
    defaults.DefTStyle.rindent = 0;
    defaults.DefTStyle.pindent = 0;
    defaults.DefTStyle.tabspace = 6;
    defaults.DefTStyle.bullet = 'none';
  }

  /**
   * Reads ruler configuration data and populates a ruler config object
   *
   * This function processes ruler settings from a data source and sets up the
   * ruler configuration including units, scales, grid settings, and display options.
   *
   * @param rulerData - The source data containing ruler settings
   * @param resultObject - The result object containing the ruler configuration and scaling factors
   */
  static ReadRulers(rulerData, resultObject) {
    resultObject.rulerConfig = new RulerConfig();

    // Set basic ruler properties
    resultObject.rulerConfig.useInches = rulerData.inches;
    resultObject.rulerConfig.major = SDF.ToSDJSCoords(rulerData.Major, resultObject.coordScaleFactor);

    // Handle version-specific scaling
    if (resultObject.PVersion < SDF.SDF_POVERSION801) {
      resultObject.rulerConfig.major *= 6;
    }

    // Set ruler scale and units
    resultObject.rulerConfig.majorScale = rulerData.MajorScale;
    resultObject.rulerConfig.units = rulerData.units;

    // Set tick marks and grid settings
    resultObject.rulerConfig.nTics = rulerData.MinorDenom;
    resultObject.rulerConfig.nMid = rulerData.MinorDenom != 5 ? 1 : 0;
    resultObject.rulerConfig.nGrid = rulerData.MinorDenom;

    // Set decimal places if provided
    if (rulerData.dp != null) {
      resultObject.rulerConfig.dp = rulerData.dp;
    }

    // Set ruler origin
    if (rulerData.originx != null) {
      resultObject.rulerConfig.originx = rulerData.originx;
      resultObject.rulerConfig.originy = rulerData.originy;
    } else {
      resultObject.rulerConfig.originx = 0;
      resultObject.rulerConfig.originy = 0;
    }

    // Set visibility options
    resultObject.rulerConfig.showpixels = false;
    resultObject.rulerConfig.show = rulerData.show ? true : false;

    if (rulerData.showpixels) {
      resultObject.rulerConfig.showpixels = true;
    }

    // Set fractional denominator
    resultObject.rulerConfig.fractionaldenominator = rulerData.fractionaldenominator ||
      T3Gv.docUtil.rulerConfig.fractionaldenominator;
  }

  /**
   * Determines if an object is a group by examining its properties in the code structure
   *
   * This function analyzes the object data to determine if it represents a group,
   * checking for various indicators like group code lists, SVG fragments, and object class types.
   * It supports both synchronous checks and asynchronous validation.
   *
   * @param resultObject - Object containing processing results and state
   * @param codeData - The code data structure containing object information
   * @param codeIndex - The current position in the code structure
   * @param opCodes - Object containing operation code constants and references
   * @param endCodeMarker - The code that marks the end of the object definition
   * @returns True if the object is a group, false otherwise
   */
  static ObjectIsGroup(resultObject, codeData, codeIndex, opCodes, endCodeMarker) {
    let hasMeta = false;
    let hashValue;
    let isGroup = false;

    // For async validation, check group code list directly
    if (resultObject.ValidateHashesAsync) {
      return !codeData.codes[codeIndex].data.HasSVG &&
        !codeData.codes[codeIndex].data.UsePNG &&
        !!codeData.codes[codeIndex].data.groupcodelist;
    }

    // If object class is directly defined, check if it's a group symbol
    if (codeData.codes[codeIndex].data.objclass) {
      return codeData.codes[codeIndex].data.objclass === ConstantData.ShapeClass.GROUPSYMBOL;
    }

    // Search through object properties for group indicators
    codeIndex++;
    while (codeData.codes[codeIndex].code != endCodeMarker) {
      switch (codeData.codes[codeIndex].code) {
        case opCodes.SDF_C_TABLEVP:
        case opCodes.SDF_C_TABLEID:
          // These indicate a different object type, not a group
          return isGroup;

        case opCodes.SDF_C_EMFHASH:
          // Store hash for enhanced metafile
          if (resultObject.AddEMFHash) {
            hashValue = codeData.codes[codeIndex].data.name;
          } else {
            hasMeta = true;
          }
          break;

        case opCodes.SDF_C_NATIVESTORAGE:
          // Native storage indicates a group, unless it has metadata
          if (hasMeta) return false;
          if (!resultObject.AddEMFHash) return true;
          isGroup = true;
          break;

        case opCodes.SDF_C_NATIVEID:
          // If there's a native ID without metadata, it's a group
          return !hasMeta;

        case opCodes.SDF_C_DRAWMETA:
          // Process drawing metadata
          if (resultObject.AddEMFHash && !hasMeta) {
            if (hashValue === undefined) {
              hashValue = resultObject.gHash.GetHash(codeData.codes[codeIndex].data.BlobBytes);
            }

            // Check if hash exists in content system
            const foundHash = null != SDUI.CMSContent.GetSymbolSVGByHash(SDUI.AppSettings.ContentSource, hashValue);

            if (hasMeta) {
              codeData.codes[codeIndex].data.EMFHash = hashValue;
              return false;
            }
          }
          break;
      }
      codeIndex++;
    }

    return isGroup;
  }

  /**
   * Determines if an object is a symbol by examining its properties in the code structure
   *
   * This function analyzes the object data to determine if it represents a symbol,
   * checking for SVG fragments, EMF hashes, and other symbol indicators.
   * It supports both synchronous checks and asynchronous validation.
   *
   * @param resultObject - Object containing processing results and state
   * @param codeData - The code data structure containing object information
   * @param codeIndex - The current position in the code structure
   * @param opCodes - Object containing operation code constants and references
   * @param endCodeMarker - The code that marks the end of the object definition
   * @returns True if the object is a symbol, false otherwise
   */
  static ObjectIsSymbol(resultObject, codeData, codeIndex, opCodes, endCodeMarker) {
    // For async validation, check for color SVG directly
    if (resultObject.ValidateHashesAsync) {
      return !!codeData.codes[codeIndex].data.HasColorSVG;
    }

    // If object class is directly defined, check if it's an SVG fragment symbol
    if (codeData.codes[codeIndex].data.objclass) {
      return codeData.codes[codeIndex].data.objclass === ConstantData.ShapeClass.SVGFRAGMENTSYMBOL;
    }

    // Move past initial code
    codeIndex++;

    // Search through object properties for symbol indicators
    let hasMeta = false;
    let hashValue;
    let isSymbol = false;

    while (codeData.codes[codeIndex].code != endCodeMarker) {
      switch (codeData.codes[codeIndex].code) {
        case opCodes.SDF_C_SVGFRAGMENTID:
          // SVG fragment ID indicates it's a symbol
          isSymbol = true;
          break;

        case opCodes.SDF_C_EMFHASH:
          // EMF hash handling
          if (resultObject.AddEMFHash) {
            hashValue = codeData.codes[codeIndex].data.name;
          } else {
            hasMeta = true;
          }
          isSymbol = true;
          break;

        case opCodes.SDF_C_DRAWMETA:
          // Process drawing metadata
          if (resultObject.AddEMFHash && !hasMeta) {
            if (hashValue === undefined) {
              hashValue = resultObject.gHash.GetHash(codeData.codes[codeIndex].data.BlobBytes);
            }

            // Check if hash exists in content system
            hasMeta = null != SDUI.CMSContent.GetSymbolSVGColorByHash(SDUI.AppSettings.ContentSource, hashValue);

            if (hasMeta) {
              isSymbol = true;
            }
          }
        /* falls through */
        case opCodes.SDF_C_NATIVESTORAGE:
        case opCodes.SDF_C_NATIVEID:
          return !!isSymbol;
      }
      codeIndex++;
    }

    return false;
  }

  /**
   * Determines if an object is a text label connected to a connector object
   *
   * This function examines the object structure to identify if it's a text label
   * specifically attached to a connector object, checking for hook points and text content.
   *
   * @param codeData - The code data structure containing object information
   * @param codeIndex - The current position in the code structure
   * @param opCodes - Object containing operation code constants and references
   * @param endCodeMarker - The code that marks the end of the object definition
   * @returns True if the object is a connector text label, false otherwise
   */
  static ObjectIsConnectorTextLabel(codeData, codeIndex, opCodes, endCodeMarker) {
    const objectData = codeData.codes[codeIndex].data;
    codeIndex++;

    let hookData;
    let associatedObjectId;
    let hasHook = false;
    let hasText = false;

    // Search through object properties for connector text label indicators
    while (codeData.codes[codeIndex].code != endCodeMarker) {
      switch (codeData.codes[codeIndex].code) {
        case opCodes.SDF_C_DRAWHOOK:
          // Check if the hook point is at the bottom (connecty = 1)
          hookData = codeData.codes[codeIndex].data;
          if (hookData.connecty === 1) {
            hasHook = true;
            associatedObjectId = hookData.objid;
          }
          break;

        case opCodes.SDF_C_LONGTEXT8:
        case opCodes.SDF_C_LONGTEXT:
          // Indicates this object has text content
          hasText = true;
          break;
      }

      codeIndex++;

      // Exit early if we've found text
      if (hasText) break;
    }

    // If both conditions are met, set association flags
    if (hasHook && hasText) {
      objectData.associd = associatedObjectId;
      objectData.flags = Utils2.SetFlag(objectData.flags, ConstantData.ObjFlags.SEDO_Assoc, true);
    }

    return hasHook && hasText;
  }

  /**
   * Determines if an object is an external text label connected to another object
   *
   * This function examines the object structure to identify if it's a standalone text label
   * that is associated with another object through hook points. It checks various
   * connection points and text content to make the determination.
   *
   * @param codeData - The code data structure containing object information
   * @param codeIndex - The current position in the code structure
   * @param opCodes - Object containing operation code constants and references
   * @param endCodeMarker - The code that marks the end of the object definition
   * @param resultObject - Object containing processing results and state
   * @returns True if the object is an external text label, false otherwise
   */
  static ObjectIsExternalTextLabel(codeData, codeIndex, opCodes, endCodeMarker, resultObject) {
    const objectData = codeData.codes[codeIndex].data;
    const coordinateDimension = ConstantData.Defines.SED_CDim;

    codeIndex++;

    let hookData;
    let isVisioCallout = false;
    let hasValidHook = false;
    let hasText = false;

    // Search through object properties for external text label indicators
    while (codeData.codes[codeIndex].code != endCodeMarker) {
      switch (codeData.codes[codeIndex].code) {
        case opCodes.SDF_C_DRAWHOOK:
          hookData = codeData.codes[codeIndex].data;

          // Check if this is a Visio callout
          if (objectData.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioCallOut) {
            isVisioCallout = true;
          }

          // Check for specific attachment point (tied directly)
          if (hookData.hookpt === ConstantData.HookPts.SED_KATD) {
            hasValidHook = true;

            // If not a Visio callout, perform additional check
            if (!isVisioCallout) {
              const targetObject = T3Gv.optManager.GetObjectPtr(
                resultObject.IDMap[hookData.objid],
                false
              );

              // If the target is a line, this isn't an external text label
              if (targetObject &&
                targetObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE) {
                return false;
              }
            }
          }
          // Check for corner connection points
          else if (hookData.connecty === 0 && hookData.connectx === 0) {
            if (hookData.hookpt === ConstantData.HookPts.SED_KCR ||
              hookData.hookpt === ConstantData.HookPts.SED_KCB ||
              isVisioCallout) {
              hasValidHook = true;
              hasText = true;
            }
          }
          // Check for opposite corner connection points
          else if (hookData.connecty === coordinateDimension &&
            hookData.connectx === coordinateDimension) {
            if (hookData.hookpt === ConstantData.HookPts.SED_KCL ||
              hookData.hookpt === ConstantData.HookPts.SED_KCT ||
              isVisioCallout) {
              hasValidHook = true;
              hasText = true;
            }
          }
          break;

        case opCodes.SDF_C_DRAWTEXT:
          // Check for text ID reference
          if (codeData.codes[codeIndex].data.textid >= 0) {
            hasText = true;
          }
          break;

        case opCodes.SDF_C_LONGTEXT8:
        case opCodes.SDF_C_LONGTEXT:
          // Indicates this object has text content
          hasText = true;
          break;
      }

      codeIndex++;

      // Exit early if we've found text
      if (hasText) break;
    }

    return hasValidHook && hasText;
  }

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

  /**
   * Sets the curvature parameters for shapes based on document version and type
   *
   * This function applies appropriate curvature settings for rounded rectangles and
   * other shapes with curved edges based on the document version and template status.
   *
   * @param resultObject - Object containing document properties and processing settings
   * @param targetObject - The target object to set curvature parameters on
   * @param isLineObject - Flag indicating if the object is a line (true) or a shape (false)
   */
  static SetCurvature(resultObject, targetObject, isLineObject) {
    // Apply only for non-symbol objects in template mode or builder with older versions
    if (!resultObject.isSymbol &&
      (resultObject.isTemplate || SDUI.Builder) &&
      resultObject.PVersion < SDF.SDF_PVERSION864) {

      if (isLineObject) {
        // For lines, set curve parameter directly
        targetObject.curveparam = 100 * ConstantData.Defines.DefFixedRRect;
      } else {
        // For shapes, set shape parameter and fixed rounded rectangle flag
        targetObject.shapeparam = ConstantData.Defines.DefFixedRRect;
        targetObject.moreflags = Utils2.SetFlag(
          targetObject.moreflags,
          ConstantData.ObjMoreFlags.SED_MF_FixedRR,
          true
        );
      }
    }
  }

  /**
   * Applies default properties to a drawing object from session defaults
   *
   * This function initializes a new object with default style, text alignment,
   * growth behavior, and other standard properties from the drawing session.
   *
   * @param sessionObject - The drawing session containing default properties
   * @param targetObject - The object to initialize with default properties
   */
  static DefaultObject(sessionObject, targetObject) {
    // Initialize with default style
    targetObject.StyleRecord = new QuickStyle();

    // Copy text alignment from session defaults
    targetObject.just = sessionObject.def.just;
    targetObject.vjust = sessionObject.def.vjust;

    // Set text growth behavior
    targetObject.TextGrow = sessionObject.def.textgrow;
    targetObject.ObjGrow = ConstantData.GrowBehavior.ALL;

    // Set text direction (left-to-right)
    targetObject.TextDirection = true;

    // Initialize text flags
    targetObject.TextFlags = 0;

    // Set form carriage return flag if present in session defaults
    targetObject.TextFlags = Utils2.SetFlag(
      targetObject.TextFlags,
      ConstantData.TextFlags.SED_TF_FormCR,
      (sessionObject.def.textflags & ConstantData.TextFlags.SED_TF_FormCR) > 0
    );

    // Copy text margins from session defaults
    targetObject.TMargins = $.extend(true, {}, sessionObject.def.tmargins);
  }

  /**
   * Reads text parameters from a source object and applies them to a target object
   *
   * This function processes text-related parameters from a source data structure
   * and sets them on a target object with proper scaling. It handles text rectangle
   * dimensions, margins, indentation, alignment, rotation, and text behavior settings.
   * It also manages text content references through IDs for blocks and groups.
   *
   * @param targetObject - The target object to populate with text parameters
   * @param sourceData - The source data containing text parameter information
   * @param resultObject - Object containing scaling factors and processing context
   */
  static ReadTextParams(targetObject, sourceData, resultObject) {
    // Get text rectangle (prefer 'ltrect' if available, otherwise use 'trect')
    const textRect = sourceData.ltrect ? sourceData.ltrect : sourceData.trect;

    // Convert the rectangle with proper scaling and offset
    targetObject.trect = SDF.ToSDJSRect(textRect, resultObject.coordScaleFactor);
    targetObject.trect.x += resultObject.GroupOffset.x;
    targetObject.trect.y += resultObject.GroupOffset.y;

    // Set text indentation values with proper scaling
    targetObject.tindent.left = SDF.ToSDJSCoords(sourceData.tindent.left, resultObject.coordScaleFactor);
    targetObject.tindent.top = SDF.ToSDJSCoords(sourceData.tindent.top, resultObject.coordScaleFactor);
    targetObject.tindent.right = SDF.ToSDJSCoords(sourceData.tindent.right, resultObject.coordScaleFactor);
    targetObject.tindent.bottom = SDF.ToSDJSCoords(sourceData.tindent.bottom, resultObject.coordScaleFactor);

    // Set text margins with proper scaling
    targetObject.TMargins.left = SDF.ToSDJSCoords(sourceData.tmargin.left, resultObject.coordScaleFactor);
    targetObject.TMargins.top = SDF.ToSDJSCoords(sourceData.tmargin.top, resultObject.coordScaleFactor);
    targetObject.TMargins.right = SDF.ToSDJSCoords(sourceData.tmargin.right, resultObject.coordScaleFactor);
    targetObject.TMargins.bottom = SDF.ToSDJSCoords(sourceData.tmargin.bottom, resultObject.coordScaleFactor);

    // Set shape indentation values
    targetObject.left_sindent = sourceData.left_sindent;
    targetObject.top_sindent = sourceData.top_sindent;
    targetObject.right_sindent = sourceData.right_sindent;
    targetObject.bottom_sindent = sourceData.bottom_sindent;

    // Set text alignment and flags
    targetObject.TextAlign = SDF.W32JustToTextAlign(sourceData.just, sourceData.vjust);
    targetObject.TextFlags = sourceData.textflags;

    // Special handling for floor plan wall objects
    if (targetObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) {
      targetObject.TextFlags = Utils2.SetFlag(
        targetObject.TextFlags,
        ConstantData.TextFlags.SED_TF_HorizText,
        true
      );
    }

    // Set text growth behavior
    targetObject.TextGrow = sourceData.textgrow;

    // Set text wrap width if available
    if (sourceData.textwrapwidth > 0) {
      targetObject.TextWrapWidth = SDF.ToSDJSCoords(sourceData.textwrapwidth, resultObject.coordScaleFactor);
    }

    // Set line text positioning if available
    if (sourceData.linetextx !== undefined) {
      targetObject.LineTextX = sourceData.linetextx;
    }

    if (sourceData.linetexty !== undefined) {
      targetObject.LineTextY = SDF.ToSDJSCoords(sourceData.linetexty, resultObject.coordScaleFactor);
    }

    // Set Visio rotation difference if available
    if (sourceData.visiorotationdiff !== undefined) {
      targetObject.VisioRotationDiff = sourceData.visiorotationdiff / 10;
    }

    // Set rotation angle with special handling for Visio line text labels
    if (targetObject.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioLineTextLabel && resultObject.IsVisio) {
      targetObject.RotationAngle = sourceData.tangle / 10;
    } else {
      targetObject.RotationAngle = SDF.ToSDJSAngle(sourceData.tangle);
    }

    // Handle block and group content references
    if (resultObject.ReadBlocks || resultObject.ReadGroupBlock) {
      let objectWithData, objectPtr;

      // Handle text content ID
      if (sourceData.textid >= 0) {
        // Set the text data ID and mark it as used
        targetObject.DataID = resultObject.textids[sourceData.textid];
        resultObject.usedtextids[sourceData.textid] = true;

        // Special handling for text on lines
        if (resultObject.textonline >= 0 &&
          resultObject.textonline < resultObject.objectcount &&
          (objectWithData = resultObject.IDMap[resultObject.textonline]) >= 0 &&
          (objectPtr = T3Gv.optManager.GetObjectPtr(objectWithData, false))) {

          // Handle different object types differently
          switch (objectPtr.DrawingObjectBaseClass) {
            case ConstantData.DrawingObjectBaseClass.CONNECTOR:
              // No special handling for connectors
              break;

            case ConstantData.DrawingObjectBaseClass.SHAPE:
              // Transfer the text to the shape and clear it from the current object
              objectPtr.DataID = targetObject.DataID;
              targetObject.DataID = -1;
              targetObject = objectPtr;
              resultObject.textonline = -1;
              break;

            default:
              // Default transfer behavior
              objectPtr.DataID = targetObject.DataID;
              targetObject.DataID = -1;
              targetObject = objectPtr;
              objectPtr.TextDirection = (objectPtr.TextFlags & ConstantData.TextFlags.SED_TF_HorizText) == 0;
              resultObject.textonline = -1;
          }
        }

        // Apply text alignment to the referenced text object
        const textObject = T3Gv.optManager.GetObjectPtr(targetObject.DataID, false);
        if (textObject) {
          const textAlignment = SDF.TextAlignToJust(targetObject.TextAlign);
          T3Gv.optManager.SetTextAlignment(textObject, textAlignment.vjust, null);
        }
      }

      // Handle comment/note ID
      if (sourceData.commentid >= 0) {
        targetObject.NoteID = resultObject.noteids[sourceData.commentid];
        resultObject.usednoteids[sourceData.commentid] = true;
      }
    }
  }

  /**
   * Converts internal line type constants to Windows 32-bit format object type information
   *
   * This function translates the application's internal line type constants into the
   * corresponding Windows format object type information used by the file parser.
   * For each line type, it sets the appropriate object type, data class, reference value,
   * parameter value, and weight based on the input line type.
   *
   * @param lineType - The internal line type constant from ConstantData.LineType
   * @param dataClass - The data class for the line
   * @param shortReference - The short reference value
   * @param paramValue - The parameter value that may need coordinate scaling
   * @param weightValue - The weight value for the line
   * @param resultObject - Object containing coordinate scale factors and other context
   * @returns Object containing Windows format object type information
   */
  static LineTypeToWin32Type(lineType, dataClass, shortReference, paramValue, weightValue, resultObject) {
    // Initialize with default object type of a direct line
    const win32TypeInfo = {
      otype: FileParser.ObjectTypes.SED_LineD,
      dataClass: dataClass,
      shortReference: shortReference,
      param: paramValue,
      weight: weightValue
    };

    // Set specific object type properties based on the input line type
    switch (lineType) {
      case ConstantData.LineType.ARCLINE:
        // Arc line is a special type of chord
        win32TypeInfo.shortReference = ConstantData2.LineTypes.SED_LS_Chord;
        win32TypeInfo.param = SDF.ToSDJSCoords(paramValue, resultObject.coordScaleFactor);
        break;

      case ConstantData.LineType.SEGLINE:
        // Segmented straight line
        win32TypeInfo.otype = ConstantData2.ObjectTypes.SED_SegL;
        win32TypeInfo.dataClass = FileParser.SeglTypes.SED_L_Line;
        break;

      case ConstantData.LineType.ARCSEGLINE:
        // Segmented arc line
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_SegL;
        win32TypeInfo.dataClass = FileParser.SeglTypes.SED_L_Arc;
        break;

      case ConstantData.LineType.PARABOLA:
        // Parabolic curve
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_PolyL;
        win32TypeInfo.param = SDF.ToSDJSCoords(paramValue, resultObject.coordScaleFactor);
        win32TypeInfo.shortReference = SDF.ToSDJSCoords(shortReference, resultObject.coordScaleFactor);
        break;

      case ConstantData.LineType.NURBS:
        // Non-Uniform Rational B-Spline
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_NURBS;
        break;

      case ConstantData.LineType.NURBSSEG:
        // Segmented NURBS
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_NURBSSEG;
        break;

      case ConstantData.LineType.ELLIPSE:
        // Elliptical curve
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_ELLIPSE;
        break;

      case ConstantData.LineType.ELLIPSEEND:
        // End segment of elliptical curve
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_ELLIPSEEND;
        break;

      case ConstantData.LineType.QUADBEZ:
        // Quadratic Bezier curve
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_QUADBEZ;
        break;

      case ConstantData.LineType.QUADBEZCON:
        // Connected quadratic Bezier curve
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_QUADBEZCON;
        break;

      case ConstantData.LineType.CUBEBEZ:
        // Cubic Bezier curve
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_CUBEBEZ;
        break;

      case ConstantData.LineType.CUBEBEZCON:
        // Connected cubic Bezier curve
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_CUBEBEZCON;
        break;

      case ConstantData.LineType.SPLINE:
        // Spline curve
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_SPLINE;
        break;

      case ConstantData.LineType.SPLINECON:
        // Connected spline curve
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_SPLINECON;
        break;

      case ConstantData.LineType.MOVETO:
        // Move to point (without drawing)
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_MOVETO;
        break;

      case ConstantData.LineType.MOVETO_NEWPOLY:
        // Move to point and start a new polygon
        win32TypeInfo.otype = FileParser.ObjectTypes.SED_MOVETO_NEWPOLY;
        break;
    }

    return win32TypeInfo;
  }

  /**
   * Creates a shape object of the appropriate type based on input parameters
   *
   * This function generates different shapes based on the provided shape type (dataclass).
   * It handles geometry creation, parameter scaling, and returns the appropriate shape instance.
   * For polygon shapes, it creates vertex arrays using the PolygonShapeGenerator.
   *
   * @param shapeConfig - Configuration containing frame dimensions and shape parameters
   * @param shapeData - Data containing the shape type (dataclass) and other properties
   * @param resultObject - Object containing coordinate scaling factors and other context
   * @param extraFlags - Flags controlling special behaviors like flipping
   * @returns Instance of the appropriate shape object (Rect, RRect, Oval, or Polygon)
   */
  static CreateShapeObject(shapeConfig, shapeData, resultObject, extraFlags) {
    let shapeType;
    let vertexArray;
    let scale;
    let minDimension;
    let shapeParam;
    let width;
    let height;
    let scaleFactor;
    let outputShape;

    // Extract shape parameters and dimensions
    shapeParam = shapeConfig.shapeparam;
    width = shapeConfig.Frame.width;
    height = shapeConfig.Frame.height;

    // Determine shape type and create appropriate vertex arrays for polygons
    switch (shapeData.dataclass) {
      case PolygonConstant.ShapeTypes.RECTANGLE:
        SDF.SetCurvature(resultObject, shapeConfig, false);
      // fall through

      case PolygonConstant.ShapeTypes.OVAL:
      case PolygonConstant.ShapeTypes.CIRCLE:
      case PolygonConstant.ShapeTypes.ROUNDED_RECTANGLE:
        shapeType = shapeData.dataclass;
        break;

      case PolygonConstant.ShapeTypes.POLYGON:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        break;

      case PolygonConstant.ShapeTypes.DIAMOND:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        vertexArray = PolygonShapeGenerator.generateDiamond(shapeConfig.Frame, 0);
        break;

      case PolygonConstant.ShapeTypes.TRIANGLE:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        vertexArray = PolygonShapeGenerator.generateTriangle(shapeConfig.Frame, 0);
        break;

      case PolygonConstant.ShapeTypes.TRIANGLE_BOTTOM:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        vertexArray = PolygonShapeGenerator.generateTriangleDown(shapeConfig.Frame, 0);
        break;

      case PolygonConstant.ShapeTypes.PARALLELOGRAM:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        shapeParam = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = shapeParam;
        vertexArray = PolygonShapeGenerator.generateParallelogram(shapeConfig.Frame, shapeParam);
        break;

      case PolygonConstant.ShapeTypes.PENTAGON:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        shapeParam = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = shapeParam;
        minDimension = width / 2;
        if (minDimension) {
          shapeParam = width / 2 * (shapeParam / minDimension);
        }
        vertexArray = PolygonShapeGenerator.generatePentagon(shapeConfig.Frame, shapeParam);
        break;

      case PolygonConstant.ShapeTypes.PENTAGON_LEFT:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        shapeParam = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = shapeParam;
        minDimension = height / 2;
        if (minDimension) {
          shapeParam = height / 2 * (shapeParam / minDimension);
        }
        vertexArray = PolygonShapeGenerator.generatePentagonLeft(shapeConfig.Frame, shapeParam);
        break;

      case PolygonConstant.ShapeTypes.HEXAGON:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        shapeParam = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = shapeParam;
        minDimension = height / 2;
        if (minDimension) {
          shapeParam = height / 2 * (shapeParam / minDimension);
        }
        vertexArray = PolygonShapeGenerator.generateHexagon(shapeConfig.Frame, shapeParam);
        break;

      case PolygonConstant.ShapeTypes.OCTAGON:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        scale = shapeParam * height;
        scaleFactor = shapeParam * width;
        if (scale < scaleFactor) {
          scaleFactor = scale;
        }
        if (height) {
          scaleFactor = height * (scaleFactor / height);
        }
        shapeConfig.shapeparam = shapeParam;
        shapeParam = scaleFactor / width;
        scale = scaleFactor / height;
        vertexArray = PolygonShapeGenerator.generateOctagon(shapeConfig.Frame, shapeParam, scale);
        break;

      case PolygonConstant.ShapeTypes.ARROW_RIGHT:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        shapeParam = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = shapeParam;
        vertexArray = PolygonShapeGenerator.generateRightArrow(shapeConfig.Frame, shapeParam);
        break;

      case PolygonConstant.ShapeTypes.ARROW_LEFT:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        shapeParam = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = shapeParam;
        vertexArray = PolygonShapeGenerator.generateLeftArrow(shapeConfig.Frame, shapeParam);
        break;

      case PolygonConstant.ShapeTypes.ARROW_TOP:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        shapeParam = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = shapeParam;
        vertexArray = PolygonShapeGenerator.generateTopArrow(shapeConfig.Frame, shapeParam);
        break;

      case PolygonConstant.ShapeTypes.ARROW_BOTTOM:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        shapeParam = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = shapeParam;
        vertexArray = PolygonShapeGenerator.generateBottomArrow(shapeConfig.Frame, shapeParam);
        break;

      case PolygonConstant.ShapeTypes.TRAPEZOID:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        shapeParam = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = shapeParam;
        vertexArray = PolygonShapeGenerator.generateTrapezoid(shapeConfig.Frame, shapeParam);
        break;

      case PolygonConstant.ShapeTypes.TRAPEZOID_BOTTOM:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        shapeParam = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = shapeParam;
        vertexArray = PolygonShapeGenerator.generateTrapezoidDown(shapeConfig.Frame, shapeParam);
        break;

      case PolygonConstant.ShapeTypes.INPUT:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        shapeParam = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = shapeParam;
        vertexArray = PolygonShapeGenerator.generateInput(shapeConfig.Frame, shapeParam);
        break;

      case PolygonConstant.ShapeTypes.TERMINAL:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        vertexArray = PolygonShapeGenerator.generateTerminal(shapeConfig.Frame, shapeParam);
        break;

      case PolygonConstant.ShapeTypes.STORAGE:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        scaleFactor = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = scaleFactor;
        vertexArray = PolygonShapeGenerator.generateStorage(shapeConfig.Frame, shapeConfig.shapeparam, scaleFactor);
        break;

      case PolygonConstant.ShapeTypes.DOCUMENT:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        scaleFactor = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = scaleFactor;
        vertexArray = PolygonShapeGenerator.generateDocument(shapeConfig.Frame, scaleFactor);
        break;

      case PolygonConstant.ShapeTypes.DELAY:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        scaleFactor = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = scaleFactor;
        vertexArray = PolygonShapeGenerator.generateDelay(shapeConfig.Frame, scaleFactor);
        break;

      case PolygonConstant.ShapeTypes.DISPLAY:
        shapeType = PolygonConstant.ShapeTypes.POLYGON;
        scaleFactor = SDF.ToSDJSCoords(shapeConfig.shapeparam, resultObject.coordScaleFactor);
        shapeConfig.shapeparam = scaleFactor;
        vertexArray = PolygonShapeGenerator.generateDisplay(shapeConfig.Frame, scaleFactor);
        break;
    }

    // Apply flipping to vertex array if needed
    const flipFlags = ConstantData.ExtraFlags.SEDE_FlipHoriz | ConstantData.ExtraFlags.SEDE_FlipVert;
    if ((extraFlags & flipFlags) && vertexArray) {
      vertexArray = T3Gv.optManager.FlipVertexArray(vertexArray, extraFlags);
    }

    // Create and return the appropriate shape instance
    switch (shapeType) {
      case PolygonConstant.ShapeTypes.RECTANGLE:
        outputShape = new Instance.Shape.Rect(shapeConfig);
        break;

      case PolygonConstant.ShapeTypes.ROUNDED_RECTANGLE:
        outputShape = new Instance.Shape.RRect(shapeConfig);
        break;

      case PolygonConstant.ShapeTypes.OVAL:
      case PolygonConstant.ShapeTypes.CIRCLE:
        outputShape = new Instance.Shape.Oval(shapeConfig);
        outputShape.dataclass = shapeType;
        break;

      default:
        shapeConfig.VertexArray = vertexArray;
        outputShape = new Instance.Shape.Polygon(shapeConfig);
        outputShape.dataclass = shapeType;
    }

    return outputShape;
  }

  /**
   * Reads object header information and creates the appropriate shape instance
   *
   * This function processes object header data from the file format and creates the
   * corresponding shape instance based on the object type. It handles coordinate
   * scaling, offset application, and various property assignments. It supports shapes,
   * lines, connectors, polylines, and other object types.
   *
   * @param sessionObject - The drawing session object containing default properties
   * @param layerManager - The layer management object containing layer definitions
   * @param sourceData - Source data containing object header information from the file
   * @param resultObject - Object containing coordinate scale factors and processing context
   * @param isGroup - Flag indicating if the object is a group
   * @param isSymbol - Flag indicating if the object is a symbol
   * @param skipAssociationCheck - Flag to skip text association checking
   * @param applyStyles - Flag to apply style information
   * @returns The created shape instance with properties initialized from the source data
   */
  static ReadObjectHeader(sessionObject, layerManager, sourceData, resultObject, isGroup, isSymbol, skipAssociationCheck, applyStyles) {
    let shapeInstance;
    let stylesheetCount;
    let frame;
    let rect;
    let insideRect;
    let sizeDimensions;
    let destinationID;
    let targetObject;
    let skipTextLink;
    let groupBounds;
    let objectConfig = {};
    let initialBounds = {};

    // Get rectangle data (prefer long versions if available)
    if (sourceData.lr) {
      rect = sourceData.lr;
      frame = sourceData.lframe;
      insideRect = sourceData.linside;
      sizeDimensions = sourceData.lsizedim;
    } else {
      rect = sourceData.r;
      frame = sourceData.frame;
      insideRect = sourceData.inside;
      sizeDimensions = sourceData.sizedim;
    }

    // Convert coordinates to drawing space
    objectConfig.Frame = SDF.ToSDJSRect(frame, resultObject.coordScaleFactor);
    objectConfig.r = SDF.ToSDJSRect(rect, resultObject.coordScaleFactor);

    // Store original rectangle data
    objectConfig.originalr = SDF.ToSDJSRect(rect, resultObject.coordScaleFactor);
    objectConfig.originalframe = SDF.ToSDJSRect(frame, resultObject.coordScaleFactor);

    objectConfig.inside = SDF.ToSDJSRect(insideRect, resultObject.coordScaleFactor);

    // Set symbol origin if needed
    if (resultObject.isSymbol && resultObject.SetSymbolOrigin === false) {
      resultObject.GroupOffset.x = resultObject.SymbolPosition.x - objectConfig.Frame.x;
      resultObject.GroupOffset.y = resultObject.SymbolPosition.y - objectConfig.Frame.y;
      resultObject.SetSymbolOrigin = true;
    }

    // Mark as Visio file if needed
    if (sourceData.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText) {
      resultObject.VisioFileVersion = true;
    }

    // Handle text on line objects
    if (!skipAssociationCheck &&
      sourceData.associd >= 0 &&
      sourceData.flags & ConstantData.ObjFlags.SEDO_Assoc &&
      sourceData.otype === FileParser.ObjectTypes.SED_Shape &&
      (sourceData.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText) == 0) {

      skipTextLink = true;

      if ((destinationID = resultObject.IDMap[sourceData.associd]) >= 0) {
        targetObject = T3Gv.optManager.GetObjectPtr(destinationID, false);

        if (targetObject && targetObject.DataID >= 0) {
          skipTextLink = false;
        }
      }

      if (skipTextLink) {
        resultObject.textonline = sourceData.associd;
        resultObject.textonlineid = sourceData.uniqueid;
        resultObject.LineTextObject = true;
      } else {
        resultObject.LineTextObject = false;
      }
    } else {
      resultObject.LineTextObject = false;
    }

    // Apply group offsets if needed
    if (resultObject.GroupOffset.x || resultObject.GroupOffset.y) {
      objectConfig.Frame.x += resultObject.GroupOffset.x;
      objectConfig.Frame.y += resultObject.GroupOffset.y;
      objectConfig.r.x += resultObject.GroupOffset.x;
      objectConfig.r.y += resultObject.GroupOffset.y;

      objectConfig.originalr.x += resultObject.GroupOffset.x;
      objectConfig.originalr.y += resultObject.GroupOffset.y;
      objectConfig.originalframe.x += resultObject.GroupOffset.x;
      objectConfig.originalframe.y += resultObject.GroupOffset.y;

      objectConfig.inside.x += resultObject.GroupOffset.x;
      objectConfig.inside.y += resultObject.GroupOffset.y;
    }

    // Set additional properties
    objectConfig.shapeparam = sourceData.shapeparam;
    objectConfig.objecttype = sourceData.objecttype;
    objectConfig.UniqueID = sourceData.uniqueid;

    // Check for unsupported object types
    if (SDF.UnsupportedTypes.indexOf(sourceData.objecttype) >= 0) {
      resultObject.error = SDF.Errors.UnsupportedPanel;
      const error = new Error(Resources.Strings.SDRRead_Error_6);
      error.name = '1';
      throw error;
    }

    objectConfig.ObjGrow = sourceData.objgrow;

    // Create appropriate shape instance based on object type
    switch (sourceData.otype) {
      case FileParser.ObjectTypes.SED_Shape:
        // Handle shape objects (rectangle, oval, polygon, etc.)
        initialBounds = sourceData.hgframe ?
          SDF.ToSDJSRect(sourceData.hgframe, resultObject.coordScaleFactor) :
          SDF.ToSDJSRect(frame, resultObject.coordScaleFactor);

        objectConfig.InitialGroupBounds = {};
        objectConfig.InitialGroupBounds.width = initialBounds.width;
        objectConfig.InitialGroupBounds.height = initialBounds.height;
        objectConfig.InitialGroupBounds.x = initialBounds.x;
        objectConfig.InitialGroupBounds.y = initialBounds.y;

        // Create appropriate shape instance based on object type
        if (isGroup) {
          shapeInstance = new Instance.Shape.GroupSymbol(objectConfig);
        } else if (objectConfig.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) {
          shapeInstance = new Instance.Shape.PolyLineContainer(objectConfig);
        } else if (isSymbol) {
          shapeInstance = new Instance.Shape.SVGFragmentSymbol(objectConfig);
        } else if (objectConfig.objecttype === ConstantData.ObjectTypes.SD_OBJT_D3SYMBOL) {
          shapeInstance = new Instance.Shape.D3Symbol(objectConfig);
        } else if (objectConfig.objecttype === ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER) {
          shapeInstance = new Instance.Shape.ShapeContainer(objectConfig);
        } else {
          shapeInstance = SDF.CreateShapeObject(objectConfig, sourceData, resultObject, sourceData.extraflags);
        }

        shapeInstance.ResizeAspectConstrain = sourceData.objgrow === ConstantData.GrowBehavior.PROPORTIONAL;
        break;

      case FileParser.ObjectTypes.SED_LineD:
        // Handle direct line objects
        shapeInstance = SDF.CreateLineObject(objectConfig, sourceData, resultObject);
        break;

      case FileParser.ObjectTypes.SED_SegL:
        // Handle segmented line objects
        shapeInstance = sourceData.dataclass === FileParser.SeglTypes.SED_L_Arc ?
          new Instance.Shape.ArcSegmentedLine(objectConfig) :
          new Instance.Shape.SegmentedLine(objectConfig);
        break;

      case FileParser.ObjectTypes.SED_Array:
        // Handle connector array objects
        objectConfig.fixedpoint = sourceData.lfixedpoint ?
          SDF.ToSDJSCoords(sourceData.lfixedpoint, resultObject.coordScaleFactor) :
          SDF.ToSDJSCoords(sourceData.fixedpoint, resultObject.coordScaleFactor);

        objectConfig.StartPoint = {};
        objectConfig.EndPoint = {};

        if (sourceData.dataclass === FileParser.LineSubclass.SED_LCV) {
          // Vertical connector
          if (resultObject.GroupOffset.x) {
            objectConfig.fixedpoint += resultObject.GroupOffset.x;
          }

          objectConfig.vertical = true;
          objectConfig.StartPoint.x = objectConfig.fixedpoint;
          objectConfig.StartPoint.y = objectConfig.Frame.y;
          objectConfig.EndPoint.x = objectConfig.fixedpoint;
          objectConfig.EndPoint.y = objectConfig.Frame.y;
        } else {
          // Horizontal connector
          objectConfig.vertical = false;

          if (resultObject.GroupOffset.y) {
            objectConfig.fixedpoint += resultObject.GroupOffset.y;
          }

          objectConfig.StartPoint.y = objectConfig.fixedpoint;
          objectConfig.StartPoint.x = objectConfig.Frame.x;
          objectConfig.EndPoint.y = objectConfig.fixedpoint;
          objectConfig.EndPoint.x = objectConfig.Frame.x;
        }

        shapeInstance = new Instance.Shape.Connector(objectConfig);
        break;

      case FileParser.ObjectTypes.SED_PolyL:
        // Handle polyline objects
        shapeInstance = objectConfig.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL ?
          new Instance.Shape.PolyLineContainer(objectConfig) :
          new Instance.Shape.PolyLine(objectConfig);
        break;

      case FileParser.ObjectTypes.SED_Freehand:
        // Handle freehand line objects
        shapeInstance = new Instance.Shape.FreehandLine(objectConfig);
        break;
    }

    // Apply common properties to the created shape
    if (shapeInstance) {
      // Set default properties from session
      SDF.DefaultObject(sessionObject, shapeInstance);

      // Store original rectangle data
      if (objectConfig.originalr) {
        shapeInstance.originalr = {
          x: objectConfig.originalr.x,
          y: objectConfig.originalr.y,
          width: objectConfig.originalr.width,
          height: objectConfig.originalr.height
        };
      }

      if (objectConfig.originalframe) {
        shapeInstance.originalframe = {
          x: objectConfig.originalframe.x,
          y: objectConfig.originalframe.y,
          width: objectConfig.originalframe.width,
          height: objectConfig.originalframe.height
        };
      }

      // Set common shape properties
      shapeInstance.dataclass = sourceData.dataclass;
      shapeInstance.flags = sourceData.flags;

      // Handle flags for older file versions
      if (resultObject.PVersion < SDF.SDF_PVERSION849) {
        shapeInstance.flags = Utils2.SetFlag(shapeInstance.flags, ConstantData.ObjFlags.SEDO_NoTableLink, false);
      }

      shapeInstance.extraflags = sourceData.extraflags;
      shapeInstance.sizedim.width = SDF.ToSDJSCoords(sizeDimensions.x, resultObject.coordScaleFactor);
      shapeInstance.sizedim.height = SDF.ToSDJSCoords(sizeDimensions.y, resultObject.coordScaleFactor);
      shapeInstance.ObjGrow = sourceData.objgrow;

      // Set hook properties for non-array objects
      if (sourceData.otype !== FileParser.ObjectTypes.SED_Array) {
        shapeInstance.hookflags = sourceData.hookflags;
        shapeInstance.targflags = sourceData.targflags;
      }

      shapeInstance.maxhooks = sourceData.maxhooks;
      shapeInstance.associd = sourceData.associd;
      shapeInstance.ShortRef = sourceData.ShortRef;

      // Mark as being in a group if reading a group
      if (resultObject.ReadingGroup) {
        shapeInstance.bInGroup = true;
      }

      // Apply advanced style properties if requested
      if (applyStyles) {
        // Set attachment point properties
        shapeInstance.attachpoint.x = sourceData.attachpoint_x;
        shapeInstance.attachpoint.y = sourceData.attachpoint_y;
        shapeInstance.rleft = sourceData.rleft;
        shapeInstance.rtop = sourceData.rtop;
        shapeInstance.rright = sourceData.rright;
        shapeInstance.rbottom = sourceData.rbottom;
        shapeInstance.rwd = sourceData.rwd;
        shapeInstance.rht = sourceData.rht;
        shapeInstance.rflags = sourceData.rflags;

        // Set layer information
        shapeInstance.Layer = sourceData.layer;
        if (shapeInstance.Layer < 0 || shapeInstance.Layer > layerManager.nlayers - 1) {
          shapeInstance.Layer = 0;
        }

        // Set dimension flags
        shapeInstance.Dimensions = sourceData.dimensions;
        if (shapeInstance.Dimensions & ConstantData.DimensionFlags.SED_DF_Always &&
          shapeInstance.Dimensions & ConstantData.DimensionFlags.SED_DF_Select) {
          shapeInstance.Dimensions = Utils2.SetFlag(
            shapeInstance.Dimensions,
            ConstantData.DimensionFlags.SED_DF_Select,
            false
          );
        }

        // Set style index and object type
        shapeInstance.tstyleindex = sourceData.styleindex;
        shapeInstance.objecttype = sourceData.objecttype;

        // Apply special handling for specific object types
        if (shapeInstance.objecttype) {
          switch (shapeInstance.objecttype) {
            case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_ROWS:
            case ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_COLS:
              // Set auto container flag for older file versions
              if (resultObject.PVersion < SDF.SDF_PVERSION864) {
                shapeInstance.moreflags = Utils2.SetFlag(
                  shapeInstance.moreflags,
                  ConstantData.ObjMoreFlags.SED_MF_AutoContainer,
                  true
                );
              }
              break;
          }
        }

        // Set color properties
        shapeInstance.colorfilter = sourceData.colorfilter;
        if (sourceData.colorchanges !== undefined) {
          shapeInstance.colorchanges = sourceData.colorchanges;
        } else {
          shapeInstance.colorchanges = 0;
          SDF.BuildColorChanges(shapeInstance, resultObject);
        }

        // Set additional flags
        if (sourceData.moreflags) {
          shapeInstance.moreflags = sourceData.moreflags;
        }

        // Set sequence and dimension properties
        shapeInstance.sequence = sourceData.sequence;
        shapeInstance.dimensionDeflectionH = SDF.ToSDJSCoords(sourceData.dimensionDeflectionH, resultObject.coordScaleFactor);
        shapeInstance.dimensionDeflectionV = SDF.ToSDJSCoords(sourceData.dimensionDeflectionV, resultObject.coordScaleFactor);

        // Set hook displacement
        if (sourceData.hookdisp_x || sourceData.hookdisp_y) {
          shapeInstance.hookdisp.x = SDF.ToSDJSCoords(sourceData.hookdisp_x, resultObject.coordScaleFactor);
          shapeInstance.hookdisp.y = SDF.ToSDJSCoords(sourceData.hookdisp_y, resultObject.coordScaleFactor);
        } else {
          shapeInstance.hookdisp.x = 0;
          shapeInstance.hookdisp.y = 0;
        }

        // Set presentation and subtype properties
        shapeInstance.pptLayout = sourceData.pptLayout ? sourceData.pptLayout : 0;
        shapeInstance.subtype = sourceData.subtype ? sourceData.subtype : 0;

        // Apply style from style library if available
        stylesheetCount = resultObject.lpStyles.length;
        if (shapeInstance.tstyleindex >= 0 && shapeInstance.tstyleindex < stylesheetCount) {
          shapeInstance.StyleRecord = Utils1.DeepCopy(resultObject.lpStyles[shapeInstance.tstyleindex]);
        } else if (stylesheetCount) {
          shapeInstance.tstyleindex = 0;
          shapeInstance.StyleRecord = Utils1.DeepCopy(resultObject.lpStyles[shapeInstance.tstyleindex]);
        }
      } else {
        // Apply default style when not using style library
        shapeInstance.StyleRecord = Utils1.DeepCopy(resultObject.sdp.def.style);

        // For shape objects, copy border style to line style
        if (sourceData.otype === FileParser.ObjectTypes.SED_Shape) {
          shapeInstance.StyleRecord.Line = Utils1.DeepCopy(resultObject.sdp.def.style.Border);
        }
      }
    }

    return shapeInstance;
  }

  /**
   * Reads layer information from a code structure and populates the layer manager
   *
   * This function processes layer definitions from a data source and populates the layer
   * manager with layer information including flags, names, types, and object lists.
   * It handles the tracking of layer counts and ensures proper default layer naming.
   *
   * @param codeData - The source data containing layer information and codes
   * @param codeIndex - The current position in the code structure
   * @param resultObject - Object containing the layer manager to be populated
   * @param opCodes - Object containing operation code constants and references
   * @returns The updated code index position after processing layers
   */
  static ReadLayers(codeData, codeIndex, resultObject, opCodes) {
    let currentLayerIndex = -1;

    // Move past the layer begin marker
    codeIndex++;

    // Initialize layers array
    resultObject.tLMB.layers = [];

    // Process layer data until we reach the end marker
    while (codeData.codes[codeIndex].code != FileParser.SDROpCodesByName.SDF_C_END_LAYER) {
      switch (codeData.codes[codeIndex].code) {
        case opCodes.SDF_C_LAYERFLAGS:
          // Create a new layer when we encounter layer flags
          currentLayerIndex++;
          resultObject.tLMB.layers.push(new Layer());
          resultObject.tLMB.layers[currentLayerIndex].flags = codeData.codes[codeIndex].data.flags;
          break;

        case opCodes.SDF_C_LAYERNAME:
          // Set the layer name if we have a valid layer
          if (currentLayerIndex >= 0) {
            resultObject.tLMB.layers[currentLayerIndex].name = codeData.codes[codeIndex].data.name;
          }
          break;

        case opCodes.SDF_C_LAYERTYPE:
          // Set the layer type if we have a valid layer
          if (currentLayerIndex >= 0) {
            resultObject.tLMB.layers[currentLayerIndex].layertype = codeData.codes[codeIndex].data.type;
          }
          break;

        case opCodes.SDF_C_LAYERLIST:
          // Add objects to the layer and to the block list
          if (currentLayerIndex >= 0) {
            resultObject.tLMB.layers[currentLayerIndex].zList = codeData.codes[codeIndex].data.zList;
            resultObject.BlockzList = resultObject.BlockzList.concat(codeData.codes[codeIndex].data.zList);
          }
          break;
      }

      codeIndex++;
    }

    // Set total layer count
    resultObject.tLMB.nlayers = currentLayerIndex + 1;

    // Reset active layer if out of bounds
    if (resultObject.tLMB.activelayer >= resultObject.tLMB.nlayers) {
      resultObject.tLMB.activelayer = 0;
    }

    // Rename default layer to use proper constant name
    if (resultObject.tLMB.nlayers === 1 && resultObject.tLMB.layers[0].name === 'Default') {
      resultObject.tLMB.layers[0].name = ConstantData.Defines.DefaultLayerName;
    }

    return codeIndex;
  }

  /**
   * Writes selected objects to a buffer in the SDF file format
   *
   * This function serializes the selected objects to a buffer that can be used
   * for clipboard operations, file saving, or other data transfer needs. It captures
   * the current state of the objects including their properties, styles, and layer information.
   *
   * @param selectedObjects - Array of objects to be written to the buffer
   * @param skipTables - Flag indicating whether to skip table data
   * @param unused - Unused parameter (maintained for compatibility)
   * @param preserveSegmentDirection - Flag to preserve the direction of segments
   * @param ignoreDataCheck - Flag to ignore data validation checks
   * @returns Buffer containing the serialized objects in SDF format
   */
  static WriteSelect(selectedObjects, skipTables, unused, preserveSegmentDirection, ignoreDataCheck) {
    // Create a new write result object to hold serialization state
    const result = new SDF.WResult;

    // Get current session, layer manager and content header
    result.sdp = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, false);
    result.tLMB = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, false);
    result.ctp = T3Gv.optManager.theContentHeader;

    // Mark as selection-only operation
    result.selectonly = true;

    // Preserve segment direction if requested
    if (preserveSegmentDirection) {
      result.KeepSegDir = true;
    }

    // Get work area information (unused result)
    T3Gv.docUtil.svgDoc.GetWorkArea();

    // Configure result with current document settings
    result.docDpi = T3Gv.docUtil.svgDoc.docInfo.docDpi;
    result.zList = selectedObjects;
    result.noTables = skipTables;
    result.RichGradients = T3Gv.optManager.RichGradients;

    // Update layer information for selected objects
    T3Gv.optManager.UpdateObjectLayerIndices(result);

    // Write objects to buffer with selection-only flag
    return SDF.WriteBuffer(result, true, true, ignoreDataCheck);
  }

  /**
   * Result object used for writing SDF file format data
   *
   * This class stores all the necessary state, configuration, and references
   * required during the SDF file writing process. It holds references to document
   * components, tracking maps, style information, and special processing flags.
   */
  static WResult = function () {
    // Error and scaling
    this.error = 0;
    this.coordScaleFactor = 1;

    // Core document components
    this.sdp = null;                   // Session data pointer
    this.tLMB = null;                  // Layer manager block reference
    this.ctp = null;                   // Content header pointer
    this.WindowSettings = new SDF.WindowSettings;
    this.docDpi = 100;

    // Style and font information
    this.fontlist = [];                // List of fonts used in the document
    this.lpStyles = [];                // List of styles

    // Object tracking and mapping
    this.UniqueMap = [];               // Maps object IDs to unique identifiers
    this.zList = [];                   // List of objects in z-order
    this.links = [];                   // Object links/connections
    this.textlinks = [];               // Text links

    // Object counters
    this.polyid = 0;                   // Polygon ID counter
    this.nsegl = 0;                    // Segmented line counter
    this.arrayid = 0;                  // Array ID counter

    // Positioning and layout
    this.GroupOffset = {               // Offset for grouped objects
      x: 0,
      y: 0
    };
    this.rulerConfig = null;           // Ruler configuration

    // Processing flags
    this.WriteBlocks = false;          // Whether to write blocks
    this.noTables = false;             // Whether to skip tables
    this.WriteGroupBlock = false;      // Whether writing a group block
    this.selectonly = false;           // Whether only writing selected objects
    this.nblocks = 0;                  // Number of blocks
    this.BlockAction = 0;              // Block action type

    // State tracking
    this.state = 0;                    // Current state
    this.delta = 0;                    // Delta value for incremental operations

    // Additional resources
    this.TextureList = [];             // List of textures
    this.LibraryPathTarget = '';       // Target library path
    this.RichGradients = [];           // Enhanced gradient definitions

    // Format flags
    this.WriteVisio = false;           // Whether to write in Visio format
    this.KeepSegDir = false;           // Whether to preserve segment direction
    this.WriteWin32 = false;           // Whether to write in Win32 format
  }

  /**
   * Serializes drawing data to an SDF format buffer for file storage or clipboard operations
   *
   * This function creates a binary data stream in the Smart Draw Format (SDF), containing all
   * necessary document information including objects, styles, layers, and metadata.
   * It can produce either a complete document or just selected objects for clipboard/drag operations.
   *
   * @param resultObject - Object containing document data, styling, and processing context
   * @param isSelectOnly - Flag indicating if only selected objects should be written
   * @param returnRawBuffer - Flag indicating if raw buffer should be returned instead of Blob
   * @param ignoreDataCheck - Flag to ignore data validation checks
   * @returns Buffer or Blob containing the serialized document, or null if an error occurred
   */
  static WriteBuffer(resultObject, isSelectOnly, returnRawBuffer, ignoreDataCheck) {
    // Create a new data stream buffer
    const buffer = new ArrayBuffer(10);
    const dataStream = new T3DataStream(buffer);

    // Set endianness and write signature
    dataStream.endianness = T3DataStream.LITTLE_ENDIAN;
    dataStream.writeCString(SDF.Signature, SDF.Signature.length);

    // Handle special file format versions and set coordinate scale factor
    if (resultObject.WriteVisio || resultObject.WriteWin32) {
      SDF.Write_SDF_C_VERSION(dataStream, FileParser.Platforms.SDF_SDJS, SDF.FVERSION2015);
      resultObject.coordScaleFactor = SDF.DRAWRES / T3Gv.docUtil.svgDoc.docInfo.docDpi;
    } else {
      SDF.Write_SDF_C_VERSION(
        dataStream,
        FileParser.Platforms.SDF_SDJS,
        T3Gv.optManager.FileVersion
      );
    }

    // Set ruler configuration
    resultObject.rulerConfig = T3Gv.docUtil.rulerConfig;
    resultObject.rulerConfig.show = T3Gv.docUtil.docConfig.showRulers;

    // Write appropriate header based on operation mode
    if (isSelectOnly) {
      SDF.WriteSelectHeader(dataStream, resultObject);
      if (resultObject.error) return null;
    } else {
      SDF.WriteHeader(dataStream, resultObject, null);
      if (resultObject.error) return null;
    }

    // Write structured data if available and not ignored
    if (T3Gv.optManager.theContentHeader.SDDataID >= 0 && !ignoreDataCheck) {
      SDF.WriteSDDATA(dataStream, resultObject);
    }

    // Write the drawing content
    SDF.WriteDraw(dataStream, resultObject);

    // Return null on error, otherwise return the appropriate buffer format
    if (resultObject.error) {
      return null;
    } else {
      // Write end of file marker
      dataStream.writeUint16(FileParser.SDROpCodesByName.SDF_C_ENDFILE);

      // Return raw buffer or Blob based on parameters
      return (isSelectOnly || returnRawBuffer) ? dataStream.buffer : new Blob([dataStream.buffer]);
    }
  }

  /**
   * Converts an HTML color string to a Windows 32-bit color value
   *
   * This function takes an HTML color code (with or without the # prefix) and
   * converts it to a 32-bit integer value suitable for Windows color representation.
   * It also handles opacity/transparency as the alpha channel in the resulting value.
   *
   * @param htmlColor - The HTML color string to convert (e.g. '#FF0000' or 'FF0000')
   * @param opacity - Optional opacity value between 0-1 (default: 1 = fully opaque)
   * @returns 32-bit integer representation of the color with alpha channel
   */
  static HTMLColorToWin(htmlColor, opacity) {
    // Remove # prefix if present and ensure color string is at least 6 characters
    let colorString = htmlColor.replace('#', '');
    while (colorString.length < 6) {
      colorString += colorString[0];
    }

    // Convert RGB hex components to a 32-bit integer (0x00RRGGBB format)
    let colorValue = parseInt(colorString.slice(0, 2), 16) +
      (parseInt(colorString.slice(2, 4), 16) << 8) +
      (parseInt(colorString.slice(4, 6), 16) << 16);

    // Apply opacity as alpha channel if provided
    if (opacity === undefined) {
      opacity = 1;
    }

    // Convert opacity to alpha (0 = opaque, 255 = transparent in this implementation)
    let alpha = 1 - opacity;
    alpha = Math.round(255 * alpha);

    // Add alpha channel to the color value if it's not fully opaque
    if (alpha) {
      colorValue |= alpha << 24;
    }

    return colorValue;
  }

  /**
   * Maps a block ID to a unique identifier in the file format
   *
   * This function translates internal block IDs to sequential unique identifiers
   * for the SDF file format. When writing blocks, it uses the original ID;
   * otherwise, it looks up the position in the UniqueMap array and adds 1.
   *
   * @param blockId - The internal block identifier to convert
   * @param resultObject - Object containing mapping information and writing context
   * @returns A unique identifier suitable for the file format
   */
  static BlockIDtoUniqueID(blockId, resultObject) {
    if (resultObject.WriteBlocks) {
      return blockId;
    } else {
      return resultObject.UniqueMap.indexOf(blockId) + 1;
    }
  }

  /**
   * Writes version information to the data stream
   *
   * This function writes the SDF version struct to the data stream, including file format version,
   * platform information, resolution settings, and encoding format flags. It provides compatibility
   * information for applications reading the file.
   *
   * @param dataStream - The data stream to write to
   * @param platform - The platform identifier for the file format
   * @param fileVersion - The version number of the file format
   */
  static Write_SDF_C_VERSION(dataStream, platform, fileVersion) {
    // Create version information structure
    const versionInfo = {
      FVersion: fileVersion,
      PVersion: SDF.SDF_PVERSION,
      Platform: platform,
      MinVer: fileVersion,
      printres: SDF.PRINTRES,
      drawres: SDF.DRAWRES,
      LongFormat: 1,
      TrialVersion: 0,
      Unicode: 1
    };

    // Write version code to the data stream
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_VERSION);

    // Write the version structure and its length
    dataStream.writeStruct(FileParser.SDF_VERSION_Struct, versionInfo);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes header information to the data stream for a document in SDF format
   *
   * This function writes all necessary header information to identify the document,
   * including page settings, import paths, business module information,
   * symbol search strings, and organization chart configurations.
   *
   * @param dataStream - The data stream to write header information to
   * @param resultObject - Object containing document properties and metadata
   * @param skipCodes - Array of codes to skip during header writing (optional)
   */
  static WriteHeader(dataStream, resultObject, skipCodes) {
    const opCodes = FileParser.SDROpCodesByName;
    const exportPath = "";

    // Write basic header information
    SDF.write_SDF_C_HEADER(dataStream, resultObject);
    SDF.write_SDF_C_PAGE(dataStream, resultObject);

    // Write import source path if not in block-writing mode
    if (skipCodes == null) {
      if (!resultObject.WriteBlocks) {
        SDF.WriteString(
          dataStream,
          T3Gv.optManager.theContentHeader.importSourcePath,
          opCodes.SDF_C_IMPORT_SOURCE_PATH,
          resultObject
        );
      }
      SDF.WriteString(dataStream, exportPath, opCodes.SDF_C_EXPORTPATH, resultObject);
    }

    // Write business module information if not explicitly skipped
    if (skipCodes == null || skipCodes.indexOf(opCodes.SDF_C_BUSINESSMODULE) == -1) {
      SDF.WriteString(
        dataStream,
        T3Gv.optManager.theContentHeader.BusinessModule,
        opCodes.SDF_C_BUSINESSMODULE,
        resultObject
      );
    }

    // Write symbol search string if not explicitly skipped
    if (skipCodes == null || skipCodes.indexOf(opCodes.SDF_C_SYMBOLSEARCHSTRING) == -1) {
      SDF.WriteString(
        dataStream,
        T3Gv.optManager.theContentHeader.SymbolSearchString,
        opCodes.SDF_C_SYMBOLSEARCHSTRING,
        resultObject
      );
    }

    // Write organization chart table information if not explicitly skipped
    if (skipCodes == null || skipCodes.indexOf(opCodes.SDF_C_ORGCHARTTABLE) == -1) {
      if (T3Gv.optManager.theContentHeader.orgcharttable.length) {
        let tableIndex = ListManager.OrgChartTables.indexOf(T3Gv.optManager.theContentHeader.orgcharttable);

        if (tableIndex >= 0) {
          // Write standard org chart table
          SDF.WriteString(
            dataStream,
            ListManager.WinOrgChartTables[tableIndex],
            opCodes.SDF_C_ORGCHARTTABLE,
            resultObject
          );
        } else {
          // Check if it's a mind map table
          tableIndex = ListManager.MindMapTables.indexOf(T3Gv.optManager.theContentHeader.orgcharttable);

          if (tableIndex >= 0) {
            SDF.WriteString(
              dataStream,
              ListManager.WinMindMapTables[tableIndex],
              opCodes.SDF_C_ORGCHARTTABLE,
              resultObject
            );
          }
        }

        // Write custom table name if not found in standard tables
        if (tableIndex < 0) {
          SDF.WriteString(
            dataStream,
            T3Gv.optManager.theContentHeader.orgcharttable,
            opCodes.SDF_C_ORGCHARTTABLE,
            resultObject
          );
        }
      }
    }

    // Write smart help name if not in skipped codes mode
    if (skipCodes == null) {
      SDF.WriteString(
        dataStream,
        T3Gv.optManager.theContentHeader.smarthelpname,
        opCodes.SDF_C_GUIDE,
        resultObject
      );

      // Write parent page ID if available
      if (T3Gv.optManager.theContentHeader.ParentPageID.length) {
        SDF.WriteString(
          dataStream,
          T3Gv.optManager.theContentHeader.ParentPageID,
          opCodes.SDF_C_PARENTPAGEID,
          resultObject
        );
      }
    }

    // Write end of header marker
    dataStream.writeUint16(opCodes.SDF_C_HEADER_END);
  }

  /**
   * Writes a Unicode string to the data stream with proper formatting
   *
   * This function writes a UCS-2 encoded string to the data stream with
   * the appropriate opcode and length information. It handles null check
   * and only writes non-empty strings.
   *
   * @param dataStream - The data stream to write the string to
   * @param stringValue - The string to be written
   * @param opCode - The operation code indicating the string type
   * @param resultObject - Object containing context information
   */
  static WriteString(dataStream, stringValue, opCode, resultObject) {
    if (stringValue != null && stringValue.length) {
      const codeOffset = SDF.Write_CODE(dataStream, opCode);
      dataStream.writeUCS2String(stringValue, T3DataStream.LITTLE_ENDIAN, stringValue.length + 1);
      SDF.Write_LENGTH(dataStream, codeOffset);
    }
  }

  /**
   * Writes an ASCII string to the data stream with proper formatting
   *
   * This function writes an ASCII encoded string to the data stream with
   * the appropriate opcode and length information. It only writes non-empty strings.
   *
   * @param dataStream - The data stream to write the string to
   * @param stringValue - The ASCII string to be written
   * @param opCode - The operation code indicating the string type
   * @param resultObject - Object containing context information
   */
  static WriteString8(dataStream, stringValue, opCode, resultObject) {
    if (stringValue.length) {
      const codeOffset = SDF.Write_CODE(dataStream, opCode);
      dataStream.writeString(stringValue, 'ASCII', stringValue.length + 1);
      SDF.Write_LENGTH(dataStream, codeOffset);
    }
  }

  /**
   * Writes minimal header information for selection operations
   *
   * This function writes a minimal header for clipboard operations or
   * when only a selection of objects is being written, not a full document.
   * It simply writes the header end marker if we're not writing a group block.
   *
   * @param dataStream - The data stream to write the header end marker to
   * @param resultObject - Object containing context information and flags
   */
  static WriteSelectHeader(dataStream, resultObject) {
    if (!resultObject.WriteGroupBlock) {
      dataStream.writeUint16(FileParser.SDROpCodesByName.SDF_C_HEADER_END);
    }
  }

  /**
   * Writes the SDF header information to the data stream
   *
   * This function writes header metadata for the SDF file format, including window
   * settings, origin coordinates, scaling factors, flags and date format settings.
   * The header provides essential document configuration information.
   *
   * @param dataStream - The data stream to write the header data to
   * @param resultObject - The object containing window settings and configuration data
   */
  static write_SDF_C_HEADER(dataStream, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_HEADER);

    const headerData = {
      flags: 0,
      worigin: {
        x: 0,
        y: 0
      },
      wscale: resultObject.WindowSettings.wscale,
      wflags: resultObject.WindowSettings.wflags,
      oleback: -1,
      lworigin: {
        x: resultObject.WindowSettings.worigin.x,
        y: resultObject.WindowSettings.worigin.y
      },
      longflags: resultObject.ctp.flags,
      dateformat: resultObject.ctp.dateformat
    };

    dataStream.writeStruct(FileParser.SDF_HEADER_Struct, headerData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes page configuration information to the data stream
   *
   * This function serializes page settings including paper size, margins, orientation,
   * print flags, minimum dimensions, and scaling factors. It handles different format
   * versions (Windows vs. standard) by using the appropriate structure definition.
   *
   * @param dataStream - The data stream to write the page settings to
   * @param resultObject - The object containing page configuration and document settings
   */
  static write_SDF_C_PAGE(dataStream, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_PAGE);

    // Calculate minimum size dimensions
    const minSizeDimensions = {
      x: resultObject.ctp.Page.papersize.x - 2 * ConstantData.Defines.DefMargin,
      y: resultObject.ctp.Page.papersize.y - 2 * ConstantData.Defines.DefMargin
    };

    // Use actual minimum size if defined
    minSizeDimensions.x = resultObject.ctp.Page.minsize.x;
    minSizeDimensions.y = resultObject.ctp.Page.minsize.y;

    // Create full page data structure (used for Windows/Visio formats)
    const fullPageData = {
      PadDim: {
        x: 0,
        y: 0
      },
      papersize: {
        x: 0,
        y: 0
      },
      margins: {
        left: SDF.ToSDWinCoords(resultObject.ctp.Page.margins.left, resultObject.coordScaleFactor),
        right: SDF.ToSDWinCoords(resultObject.ctp.Page.margins.right, resultObject.coordScaleFactor),
        top: SDF.ToSDWinCoords(resultObject.ctp.Page.margins.top, resultObject.coordScaleFactor),
        bottom: SDF.ToSDWinCoords(resultObject.ctp.Page.margins.bottom, resultObject.coordScaleFactor)
      },
      minmarg: {
        left: ConstantData.Defines.DefMargin * resultObject.coordScaleFactor,
        right: ConstantData.Defines.DefMargin * resultObject.coordScaleFactor,
        top: ConstantData.Defines.DefMargin * resultObject.coordScaleFactor,
        bottom: ConstantData.Defines.DefMargin * resultObject.coordScaleFactor
      },
      landscape: resultObject.ctp.Page.landscape,
      wpapersize: 1,
      overlap: 0,
      printflags: resultObject.ctp.Page.printflags,
      lPadDim: {
        x: SDF.ToSDWinCoords(resultObject.sdp.dim.x, resultObject.coordScaleFactor),
        y: SDF.ToSDWinCoords(resultObject.sdp.dim.y, resultObject.coordScaleFactor)
      },
      lpapersize: {
        x: SDF.ToSDWinCoords(resultObject.ctp.Page.papersize.x, resultObject.coordScaleFactor),
        y: SDF.ToSDWinCoords(resultObject.ctp.Page.papersize.y, resultObject.coordScaleFactor)
      },
      MinSize: {
        x: SDF.ToSDWinCoords(minSizeDimensions.x, resultObject.coordScaleFactor),
        y: SDF.ToSDWinCoords(minSizeDimensions.y, resultObject.coordScaleFactor)
      },
      printscale: resultObject.ctp.Page.printscale
    };

    // Create standard page data structure (used for standard format)
    const standardPageData = {
      margins: {
        left: SDF.ToSDWinCoords(resultObject.ctp.Page.margins.left, resultObject.coordScaleFactor),
        right: SDF.ToSDWinCoords(resultObject.ctp.Page.margins.right, resultObject.coordScaleFactor),
        top: SDF.ToSDWinCoords(resultObject.ctp.Page.margins.top, resultObject.coordScaleFactor),
        bottom: SDF.ToSDWinCoords(resultObject.ctp.Page.margins.bottom, resultObject.coordScaleFactor)
      },
      minmarg: {
        left: ConstantData.Defines.DefMargin * resultObject.coordScaleFactor,
        right: ConstantData.Defines.DefMargin * resultObject.coordScaleFactor,
        top: ConstantData.Defines.DefMargin * resultObject.coordScaleFactor,
        bottom: ConstantData.Defines.DefMargin * resultObject.coordScaleFactor
      },
      landscape: resultObject.ctp.Page.landscape,
      printflags: resultObject.ctp.Page.printflags,
      lPadDim: {
        x: SDF.ToSDWinCoords(resultObject.sdp.dim.x, resultObject.coordScaleFactor),
        y: SDF.ToSDWinCoords(resultObject.sdp.dim.y, resultObject.coordScaleFactor)
      },
      lpapersize: {
        x: SDF.ToSDWinCoords(resultObject.ctp.Page.papersize.x, resultObject.coordScaleFactor),
        y: SDF.ToSDWinCoords(resultObject.ctp.Page.papersize.y, resultObject.coordScaleFactor)
      },
      MinSize: {
        x: SDF.ToSDWinCoords(minSizeDimensions.x, resultObject.coordScaleFactor),
        y: SDF.ToSDWinCoords(minSizeDimensions.y, resultObject.coordScaleFactor)
      },
      printscale: resultObject.ctp.Page.printscale
    };

    // Write appropriate structure based on format
    if (resultObject.WriteVisio || resultObject.WriteWin32) {
      dataStream.writeStruct(FileParser.SDF_PAGE_Struct_62, fullPageData);
    } else {
      dataStream.writeStruct(FileParser.SDF_PAGE_Struct_126, standardPageData);
    }

    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Converts a JavaScript line tool identifier to Windows platform line tool index
   *
   * This function maps the JavaScript line tool identifiers to their corresponding
   * Windows platform indices for file format compatibility. It includes special handling
   * for the PolyLine tool, incrementing its index to maintain proper mapping.
   *
   * @param lineToolId - The JavaScript line tool identifier to convert
   * @returns The corresponding Windows platform line tool index
   */
  static JStoWinLineTool(lineToolId) {
    let windowsLineIndex = SDUI.WindowsLineTools.indexOf(lineToolId);

    // Set default index if not found
    if (windowsLineIndex < 0) {
      windowsLineIndex = 0;
    }

    // Special handling for PolyLine tool
    if (windowsLineIndex === SDUI.WindowsLineTools.indexOf(Resources.LineToolTypes.PolyLine)) {
      windowsLineIndex++;
    }

    return windowsLineIndex;
  }

  /**
   * Converts a JavaScript shape tool identifier to Windows platform shape tool index
   *
   * This function maps JavaScript shape tool identifiers to their corresponding
   * Windows platform indices for file format compatibility.
   *
   * @param shapeToolId - The JavaScript shape tool identifier to convert
   * @returns The corresponding Windows platform shape tool index
   */
  static JStoWinShapeTool(shapeToolId) {
    let windowsShapeIndex = SDUI.WindowsShapeTools.indexOf(shapeToolId);

    // Set default index if not found
    if (windowsShapeIndex < 0) {
      windowsShapeIndex = 0;
    }

    return windowsShapeIndex;
  }

  /**
   * Writes user interface configuration information to the data stream
   *
   * This function writes UI state information including selected tools, container behaviors,
   * swimlane configuration, and other display preferences to the SDF file format.
   * When called with no data stream, it only returns the UI configuration object.
   *
   * @param dataStream - The data stream to write UI information to (optional)
   * @param resultObject - Object containing context information (unused)
   * @returns The UI configuration object if no dataStream is provided
   */
  static WriteUIInfo(dataStream, resultObject) {
    let codeOffset;
    if (dataStream) {
      codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_HEAD_UIINFO);
    }

    // Initialize flags
    let autoContainer = 0;
    let actAsContainer = 0;
    let swimlaneRotate = 0;
    let swimlaneTitle = 0;
    let collapseTools = 0;

    // Set flags based on document context
    if (ConstantData.DocumentContext.CollapseTools) {
      collapseTools = 1;
    }
    if (ConstantData.DocumentContext.AutoContainer) {
      autoContainer = 1;
    }
    if (ConstantData.DocumentContext.ActAsContainer) {
      actAsContainer = 1;
    }
    if (ConstantData.DocumentContext.SwimlaneRotate) {
      swimlaneRotate = 1;
    }
    if (ConstantData.DocumentContext.SwimlaneTitle) {
      swimlaneTitle = 1;
    }

    // Create UI info structure
    const uiInfoData = {
      linetoolindex: SDF.JStoWinLineTool(ConstantData.DocumentContext.LineTool),
      shapetoolindex: ConstantData.DocumentContext.ShapeTool,
      datetime2007: 0,
      holidaymask: T3Gv.optManager.theContentHeader.holidaymask,
      datetime1: 0,
      datetime2: 0,
      nonworkingdays: T3Gv.optManager.theContentHeader.nonworkingdays,
      swimlaneformat: ConstantData.DocumentContext.SwimlaneFormat,
      autocontainer: autoContainer,
      actascontainer: actAsContainer,
      swimlanenlanes: ConstantData.DocumentContext.SwimlaneNLanes,
      swimlanenvlanes: ConstantData.DocumentContext.SwimlaneNVLanes,
      swimlanerotate: swimlaneRotate,
      swimlanetitle: swimlaneTitle,
      collapsetools: collapseTools
    };

    // If no dataStream provided, just return the UI info data
    if (!dataStream) {
      return uiInfoData;
    }

    // Write UI info data to the stream
    dataStream.writeStruct(FileParser.SDF_UIInfo_Struct_60, uiInfoData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes search result library information to the data stream
   *
   * This function serializes a search result library and its symbols to the data stream,
   * including IDs and content titles for both the library and its contained items.
   * It helps preserve search result references in saved documents.
   *
   * @param dataStream - The data stream to write library information to
   * @param resultObject - Object containing context information
   * @param library - The search result library to write
   */
  static WriteSearchResultLibrary(dataStream, resultObject, library) {
    let itemIndex;
    let itemCount;
    let currentItem;

    // Get total number of items in the library
    itemCount = library.Items.length;

    // Write library ID and title
    SDF.WriteString(
      dataStream,
      library.ItemId,
      FileParser.SDROpCodesByName.SDF_C_SEARCHLIB,
      resultObject
    );

    SDF.WriteString(
      dataStream,
      library.ContentTitle,
      FileParser.SDROpCodesByName.SDF_C_SEARCHLIB_NAME,
      resultObject
    );

    // Write each symbol in the library
    for (itemIndex = 0; itemIndex < itemCount; itemIndex++) {
      currentItem = library.Items[itemIndex];

      SDF.WriteString(
        dataStream,
        currentItem.ItemId,
        FileParser.SDROpCodesByName.SDF_C_SEARCHLIBSYMBOL_ID,
        resultObject
      );

      SDF.WriteString(
        dataStream,
        currentItem.ContentTitle,
        FileParser.SDROpCodesByName.SDF_C_SEARCHLIBSYMBOL_NAME,
        resultObject
      );
    }

    // Write library end marker
    dataStream.writeUint16(FileParser.SDROpCodesByName.SDF_C_SEARCHLIB_END);
  }

  /**
   * Writes a native object identifier to the data stream
   *
   * This function serializes a native object identifier to the data stream using
   * the SDF_C_NATIVEID opcode. Native IDs are used to identify platform-specific
   * or native format components within the file.
   *
   * @param dataStream - The data stream to write the native ID to
   * @param nativeId - The native object identifier to write
   * @param resultObject - Object containing context information for serialization
   */
  static WriteNativeID(dataStream, nativeId, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_NATIVEID);
    const nativeIdData = {
      value: nativeId
    };
    dataStream.writeStruct(FileParser.LONGVALUE_Struct, nativeIdData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes a table identifier to the data stream
   *
   * This function serializes a table identifier to the data stream using
   * the SDF_C_TABLEID opcode. Table IDs reference tabular data structures
   * within the document, allowing objects to display and interact with
   * structured information.
   *
   * @param dataStream - The data stream to write the table ID to
   * @param tableId - The table identifier to write
   * @param resultObject - Object containing context information for serialization
   */
  static WriteTableID(dataStream, tableId, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_TABLEID);
    const tableIdData = {
      value: tableId
    };
    dataStream.writeStruct(FileParser.LONGVALUE_Struct, tableIdData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes a 32-bit integer value to the data stream with a specified opcode
   *
   * This function is a generic serializer for 32-bit integer values, allowing
   * the caller to specify which operation code should be used. It's used for
   * various numeric properties throughout the file format.
   *
   * @param dataStream - The data stream to write the value to
   * @param operationCode - The operation code indicating the value type
   * @param longValue - The 32-bit integer value to write
   * @param resultObject - Object containing context information for serialization
   */
  static WriteLongValue(dataStream, operationCode, longValue, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, operationCode);
    const longValueData = {
      value: longValue
    };
    dataStream.writeStruct(FileParser.LONGVALUE_Struct, longValueData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes a graph identifier to the data stream
   *
   * This function serializes a graph identifier to the data stream using
   * the SDF_C_GRAPHID opcode. Graph IDs reference chart and graph data
   * structures within the document.
   *
   * @param dataStream - The data stream to write the graph ID to
   * @param graphId - The graph identifier to write
   * @param resultObject - Object containing context information for serialization
   */
  static WriteGraphID(dataStream, graphId, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_GRAPHID);
    const graphIdData = {
      value: graphId
    };
    dataStream.writeStruct(FileParser.LONGVALUE_Struct, graphIdData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes an expanded view identifier to the data stream
   *
   * This function serializes an expanded view identifier to the data stream using
   * the SDF_C_EXPANDEDVIEWID opcode. Expanded view IDs reference detailed or
   * expanded visualizations of objects within the document.
   *
   * @param dataStream - The data stream to write the expanded view ID to
   * @param expandedViewId - The expanded view identifier to write
   * @param resultObject - Object containing context information for serialization
   */
  static WriteExpandedViewID(dataStream, expandedViewId, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_EXPANDEDVIEWID);
    const expandedViewData = {
      value: expandedViewId
    };
    dataStream.writeStruct(FileParser.LONGVALUE_Struct, expandedViewData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes a Gantt information identifier to the data stream
   *
   * This function serializes a Gantt chart information identifier to the data stream
   * using the SDF_C_GANTTINFOID opcode. Gantt info IDs reference project scheduling
   * and timeline data within the document.
   *
   * @param dataStream - The data stream to write the Gantt info ID to
   * @param ganttInfoId - The Gantt information identifier to write
   * @param resultObject - Object containing context information for serialization
   */
  static WriteGanttInfoID(dataStream, ganttInfoId, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_GANTTINFOID);
    const ganttInfoData = {
      value: ganttInfoId
    };
    dataStream.writeStruct(FileParser.LONGVALUE_Struct, ganttInfoData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes a cell note identifier to the data stream
   *
   * This function serializes a cell note identifier to the data stream using
   * the SDF_C_NOTEID opcode. Cell note IDs reference annotations or comments
   * attached to cells in tables or grids.
   *
   * @param dataStream - The data stream to write the cell note ID to
   * @param cellNoteId - The cell note identifier to write
   * @param resultObject - Object containing context information for serialization
   */
  static WriteCellNoteID(dataStream, cellNoteId, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_NOTEID);
    const cellNoteData = {
      value: cellNoteId
    };
    dataStream.writeStruct(FileParser.LONGVALUE_Struct, cellNoteData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes a blob bytes identifier and type to the data stream
   *
   * This function serializes a binary large object (blob) identifier and its type
   * to the data stream using the SDF_C_IMAGEID opcode. Blob bytes typically
   * represent embedded images or other binary data in the document.
   *
   * @param dataStream - The data stream to write the blob bytes ID to
   * @param blobBytesId - The blob bytes identifier to write
   * @param blobType - The type of blob data
   * @param resultObject - Object containing context information for serialization
   */
  static WriteBlobBytesID(dataStream, blobBytesId, blobType, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_IMAGEID);
    const blobBytesData = {
      value: blobBytesId,
      type: blobType
    };
    dataStream.writeStruct(FileParser.LONGVALUE2_Struct, blobBytesData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes an EMF blob bytes identifier and type to the data stream
   *
   * This function serializes an Enhanced Metafile Format (EMF) blob identifier and its type
   * to the data stream using the SDF_C_EMFID opcode. EMF blobs contain vector graphics
   * in the Windows Enhanced Metafile format.
   *
   * @param dataStream - The data stream to write the EMF blob bytes ID to
   * @param emfBlobBytesId - The EMF blob bytes identifier to write
   * @param emfBlobType - The type of EMF blob data
   * @param resultObject - Object containing context information for serialization
   */
  static WriteEMFBlobBytesID(dataStream, emfBlobBytesId, emfBlobType, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_EMFID);
    const emfBlobData = {
      value: emfBlobBytesId,
      type: emfBlobType
    };
    dataStream.writeStruct(FileParser.LONGVALUE2_Struct, emfBlobData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes an OLE blob bytes identifier and type to the data stream
   *
   * This function serializes an Object Linking and Embedding (OLE) blob identifier
   * and its type to the data stream using the SDF_C_OLESTORAGEID opcode. OLE blobs
   * contain embedded OLE objects from Windows applications.
   *
   * @param dataStream - The data stream to write the OLE blob bytes ID to
   * @param oleBlobBytesId - The OLE blob bytes identifier to write
   * @param oleBlobType - The type of OLE blob data
   * @param resultObject - Object containing context information for serialization
   */
  static WriteOleBlobBytesID(dataStream, oleBlobBytesId, oleBlobType, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_OLESTORAGEID);
    const oleBlobData = {
      value: oleBlobBytesId,
      type: oleBlobType
    };
    dataStream.writeStruct(FileParser.LONGVALUE2_Struct, oleBlobData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Gets the index of a font in a font list by name
   *
   * This function searches through a font list to find a font with the specified name
   * and returns its index. If the font is not found, it returns the default font index (0).
   * The index is used when referencing fonts in the file format.
   *
   * @param fontName - The name of the font to find
   * @param fontList - The array of fonts to search through
   * @returns The index of the font in the list, or 0 if not found
   */
  static GetFontID(fontName, fontList) {
    const fontCount = fontList.length;

    for (let fontIndex = 0; fontIndex < fontCount; fontIndex++) {
      if (fontName === fontList[fontIndex].fontName) {
        return fontIndex;
      }
    }

    return 0; // Return default font if not found
  }

  /**
   * Builds a font list for blocks from web fonts
   *
   * This function populates the font list in the result object with font records
   * created from the application's web fonts resource. Each font record includes
   * the font's ID, name, and category. This list is used to reference fonts in
   * blocks and throughout the document.
   *
   * @param resultObject - The result object whose fontlist will be populated
   */
  static BuildBlockFontList(resultObject) {
    const fontCount = Resources.WebFonts.length;

    for (let fontIndex = 0; fontIndex < fontCount; fontIndex++) {
      const fontRecord = new SDF.FontRecord(
        fontIndex,
        Resources.WebFonts[fontIndex].Name,
        Resources.WebFonts[fontIndex].Category
      );

      resultObject.fontlist.push(fontRecord);
    }
  }

  /**
   * Converts a font record to a Windows logical font structure
   *
   * This function translates an internal font record object into a Windows logical font
   * structure that can be used in file formats. It maps font types to Windows font family
   * constants, calculates height values based on font size, and applies text styling
   * attributes like bold and italic.
   *
   * @param fontRecord - The font record containing font name, type, size and face attributes
   * @param fontIndex - The index of the font in the font list
   * @param resultObject - Object containing coordinate scale factors and other context
   * @returns A Windows logical font structure ready for serialization
   */
  static FontRecToLogFont(fontRecord, fontIndex, resultObject) {
    let fontFamilyValue = 0;

    // Map font type to Windows font family constants
    switch (fontRecord.fontType) {
      case 'serif':
        fontFamilyValue = FileParser.FontFamily.FF_ROMAN;
        break;
      case 'sanserif':
        fontFamilyValue = FileParser.FontFamily.FF_SWISS;
        break;
      case 'fixed':
        fontFamilyValue = FileParser.FontFamily.FF_MODERN;
        break;
      case 'script':
        fontFamilyValue = FileParser.FontFamily.FF_SCRIPT;
        break;
      case 'decorative':
        fontFamilyValue = FileParser.FontFamily.FF_DECORATIVE;
        break;
    }

    // Create logical font structure with default values
    const logicalFont = {
      id: fontIndex,
      lfCharSet: 0,
      lfFaceName: fontRecord.fontName,
      lfHeight: -36,                 // Default height value
      lfWidth: 0,                    // Auto-calculated width
      lfEscapement: 0,               // No rotation
      lfOrientation: 0,              // No character rotation
      lfWeight: 400,                 // Normal weight
      lfItalic: 0,                   // No italic
      lfUnderline: 0,                // No underline
      lfStrikeOut: 0,                // No strikeout
      lfOutPrecision: 3,             // DEFAULT_PRECIS
      lfClipPrecision: 2,            // DEFAULT_CLIPPREC
      lfQuality: 1,                  // DRAFT_QUALITY
      lfPitchAndFamily: fontFamilyValue,
      dummy: 0                        // Padding value
    };

    // Apply font size if specified
    if (fontRecord.fontSize) {
      // Convert point size to logical units based on coordinate scale factor
      logicalFont.lfHeight = 100 * fontRecord.fontSize * resultObject.coordScaleFactor / 72;
    }

    // Apply text style attributes (bold, italic) if specified
    if (fontRecord.face) {
      if (fontRecord.face & ConstantData.TextFace.Italic) {
        logicalFont.lfItalic = 1;
      }
      if (fontRecord.face & ConstantData.TextFace.Bold) {
        logicalFont.lfWeight = 700;  // FW_BOLD value
      }
    }

    return logicalFont;
  }

  /**
   * Converts JavaScript text justification values to Windows format constants
   *
   * This function maps the text alignment values used in the JavaScript application
   * to their corresponding Windows text alignment constants used in the file format.
   * It handles horizontal ('left', 'right') and vertical ('top', 'bottom') alignments,
   * with 'center' as the default when no match is found.
   *
   * @param justificationValue - The JavaScript justification value to convert
   * @returns The corresponding Windows text justification constant
   */
  static JSJustToWin(justificationValue) {
    let windowsJustValue;

    switch (justificationValue) {
      case 'top':
        windowsJustValue = FileParser.TextJust.TA_TOP;
        break;
      case 'left':
        windowsJustValue = FileParser.TextJust.TA_LEFT;
        break;
      case 'bottom':
        windowsJustValue = FileParser.TextJust.TA_BOTTOM;
        break;
      case 'right':
        windowsJustValue = FileParser.TextJust.TA_RIGHT;
        break;
      default:
        windowsJustValue = FileParser.TextJust.TA_CENTER;
    }

    return windowsJustValue;
  }

  /**
   * Writes texture information to the data stream in SDF format
   *
   * This function serializes texture definitions and their categories to the data stream.
   * It manages texture categories, dimensions, margins, scaling properties, and embedded
   * image data. For custom (non-standard) textures, it also writes the associated binary
   * blob data to the stream.
   *
   * @param dataStream - The data stream to write texture information to
   * @param textureContainer - Object containing texture definitions and category mappings
   * @param resultObject - Object containing coordinate scale factors and context information
   */
  static WriteTextureList(dataStream, textureContainer, resultObject) {
    // Only proceed if there are textures to write
    if (resultObject.TextureList.length === 0) {
      return;
    }

    const opCodes = FileParser.SDROpCodesByName;

    // Write texture list header
    const listCodeOffset = SDF.Write_CODE(dataStream, opCodes.SDF_O_TEXTURELIST);
    dataStream.writeUint32(0);
    SDF.Write_LENGTH(dataStream, listCodeOffset);

    // Collect unique categories used by the textures
    const uniqueCategories = [];
    const textureCount = resultObject.TextureList.length;

    // Find all unique category indices
    for (let textureIndex = 0; textureIndex < textureCount; textureIndex++) {
      const texture = textureContainer.Textures[resultObject.TextureList[textureIndex]];
      const categoryIndex = texture.categoryindex;

      if (uniqueCategories.indexOf(categoryIndex) === -1) {
        uniqueCategories.push(categoryIndex);
      }
    }

    // Write category names
    const categoryCount = uniqueCategories.length;
    for (let catIndex = 0; catIndex < categoryCount; catIndex++) {
      SDF.WriteString(
        dataStream,
        textureContainer.Categories[uniqueCategories[catIndex]],
        opCodes.SDF_O_TEXTURECATNAME,
        resultObject
      );
    }

    // Write each texture definition
    for (let textureIndex = 0; textureIndex < textureCount; textureIndex++) {
      const texture = textureContainer.Textures[resultObject.TextureList[textureIndex]];
      const mappedCategoryIndex = uniqueCategories.indexOf(texture.categoryindex);

      // Create and write texture structure
      const textureData = {
        dim: {
          x: SDF.ToSDWinCoords(texture.dim.x, resultObject.coordScaleFactor),
          y: SDF.ToSDWinCoords(texture.dim.y, resultObject.coordScaleFactor)
        },
        mr: {
          left: texture.mr.left,
          top: texture.mr.top,
          right: texture.mr.right,
          bottom: texture.mr.bottom
        },
        imagetype: texture.imagetype,
        flags: texture.flags
      };

      // Write texture properties
      let codeOffset = SDF.Write_CODE(dataStream, opCodes.SDF_O_TEXTURE);
      dataStream.writeStruct(FileParser.SDF_TEXTURE_Struct, textureData);
      SDF.Write_LENGTH(dataStream, codeOffset);

      // Write texture scaling information
      const textureScaleData = {
        categoryindex: mappedCategoryIndex,
        units: texture.TextureScale.Units,
        scale: texture.TextureScale.Scale,
        rwidth: texture.TextureScale.RWidth,
        alignment: texture.TextureScale.AlignmentScalar,
        flags: texture.TextureScale.Flags
      };

      codeOffset = SDF.Write_CODE(dataStream, opCodes.SDF_O_TEXTUREEXTRA);
      dataStream.writeStruct(FileParser.SDF_TextureExtra_Struct, textureScaleData);
      SDF.Write_LENGTH(dataStream, codeOffset);

      // Write texture name
      SDF.WriteString(dataStream, texture.name, opCodes.SDF_O_TEXTURENAME, resultObject);

      // Write binary data for custom textures
      if (!(texture.flags & Resources.TextureFlags.SD_Tx_Std) && texture.BlobBytes) {
        SDF.WriteBlob(dataStream, texture.BlobBytes, opCodes.SDF_O_TEXTUREDATA);
      }
    }

    // Write end marker
    dataStream.writeUint16(opCodes.SDF_O_TEXTURELIST_END);
  }

  /**
   * Writes drawing objects and their properties to a data stream in SDF format
   *
   * This function serializes a complete drawing to the data stream, including styles,
   * layers, text objects, connectors, and all visual elements. It handles the proper
   * sequence of operations needed to create a valid SDF format file structure, and
   * processes object relationships such as attachments and connections.
   *
   * @param dataStream - The data stream to write drawing content to
   * @param resultObject - Object containing the objects to write and context information
   */
  static WriteDraw(dataStream, resultObject) {
    let sessionData;
    let uniqueMapLength;
    let uniqueMapIndex;
    let currentObject;
    let connectorObject;
    let textAlign;
    let hookData;
    let hookIndex;
    let connectorHookCount;
    let connectorHook;
    let lastConnectorIndex = -1;
    let connectorBlockId = -1;
    let textObject = {};
    let skipCount = ConstantData.ConnectorDefines.SEDA_NSkip;

    // Build style list for all objects to be written
    SDF.BuildStyleList(resultObject);

    // Get session data reference
    sessionData = resultObject.sdp;

    // Write primary drawing structure and elements
    SDF.write_SDF_C_DRAW12(dataStream, resultObject);
    SDF.WriteStyle(dataStream, sessionData.def.style, true, resultObject, null);
    SDF.WriteSDLine(
      dataStream,
      sessionData.def.style.Line,
      resultObject,
      FileParser.SDROpCodesByName.SDF_C_BEGIN_LINE,
      null
    );
    SDF.WriteSDFill(dataStream, sessionData.background, resultObject);
    SDF.WriteRulers(dataStream, resultObject);
    SDF.WriteRecentList(dataStream, resultObject);
    SDF.WriteLayers(dataStream, resultObject);
    SDF.WriteLinks(dataStream, resultObject);
    SDF.WriteTextureList(dataStream, T3Gv.optManager.TextureList, resultObject);
    SDF.WriteStyleList(dataStream, resultObject.lpStyles, false, resultObject);

    // Create text object template if text style index is defined
    if (resultObject.TextStyleIndex >= 0) {
      textObject.Frame = {
        x: 0,
        y: 0,
        width: 100,
        height: 30
      };

      let rectObject = new ListManager.Rect(textObject);
      rectObject.tstyleindex = resultObject.TextStyleIndex;
      rectObject.flags = Utils2.SetFlag(rectObject.flags, ConstantData.ObjFlags.SEDO_Assoc, true);
      rectObject.flags = Utils2.SetFlag(rectObject.flags, ConstantData.ObjFlags.SEDO_TextOnly, true);
      rectObject.TextGrow = ConstantData.TextGrowBehavior.HORIZONTAL;
      rectObject.hooks.push(new Hook(0, null, -1, 0, {
        x: 0,
        y: 0
      }));
      rectObject.StyleRecord = Utils1.DeepCopy(resultObject.lpStyles[resultObject.TextStyleIndex]);
    }

    // Process each object in the unique map
    uniqueMapLength = resultObject.UniqueMap.length;
    for (uniqueMapIndex = 0; uniqueMapIndex < uniqueMapLength; uniqueMapIndex++) {
      let objectId = resultObject.UniqueMap[uniqueMapIndex];

      // Handle text objects (negative IDs represent text objects)
      if (objectId < 0) {
        rectObject.DataID = -objectId;
        rectObject.TextFlags = 0;
        rectObject.associd = connectorBlockId;
        rectObject.TextGrow = ConstantData.TextGrowBehavior.HORIZONTAL;
        rectObject.Frame.width = 100;
        rectObject.inside.width = 100;
        rectObject.trect.width = 100;
        rectObject.r.width = 100;

        if (lastConnectorIndex >= 0) {
          // Process connector text
          rectObject.associd = connectorBlockId;
          connectorObject = T3Gv.optManager.GetObjectPtr(resultObject.UniqueMap[lastConnectorIndex], false);

          let isLinearConnector = connectorObject.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_Linear;
          textAlign = SDF.TextAlignToWin(connectorObject.TextAlign);
          hookData = SDF.SetHookByJust(textAlign.just, textAlign.vjust, rectObject.hooks[0].connect);

          rectObject.hooks[0].hookpt = hookData.hookpt;
          rectObject.hooks[0].objid = resultObject.UniqueMap[lastConnectorIndex];

          let textId = -objectId;
          connectorHookCount = connectorObject.arraylist.hook.length;
          rectObject.hooks[0].connect.y = 1;

          // Find the hook with matching text ID
          for (hookIndex = 0; hookIndex < connectorHookCount; hookIndex++) {
            connectorHook = connectorObject.arraylist.hook[hookIndex];

            if (isLinearConnector && hookIndex >= skipCount) {
              if (!(hookIndex < connectorHookCount - 1)) break;
              connectorHook = connectorObject.arraylist.hook[hookIndex + 1];
            }

            if (connectorHook.textid === textId) {
              rectObject.hooks[0].connect.x = hookIndex >= skipCount ? hookIndex - skipCount : -hookIndex;
              break;
            }
          }

          // Set fill type based on vertical justification
          if (textAlign.vjust === FileParser.TextJust.TA_CENTER) {
            rectObject.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID;
          } else {
            rectObject.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT;
          }
        } else {
          // Handle text for non-connector objects
          currentObject = T3Gv.optManager.GetObjectPtr(resultObject.UniqueMap[uniqueMapIndex - 1], false);

          if (currentObject && currentObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE) {
            // Handle line text
            textAlign = SDF.TextAlignToWin(currentObject.TextAlign);
            hookData = SDF.SetHookByJust(textAlign.just, textAlign.vjust, rectObject.hooks[0].connect);
            rectObject.hooks[0].hookpt = hookData.hookpt;
            rectObject.hooks[0].objid = resultObject.UniqueMap[uniqueMapIndex - 1];
            rectObject.StyleRecord.Fill.Paint = $.extend(true, {}, currentObject.StyleRecord.Fill.Paint);

            if (currentObject.TextGrow === ConstantData.TextGrowBehavior.VERTICAL) {
              rectObject.TextGrow = currentObject.TextGrow;
              rectObject.Frame.width = currentObject.TextWrapWidth;
              rectObject.inside.width = currentObject.TextWrapWidth;
              rectObject.trect.width = currentObject.TextWrapWidth;
              rectObject.r.width = currentObject.TextWrapWidth;
            }
          } else if (currentObject && currentObject.TextFlags & ConstantData.TextFlags.SED_TF_AttachB) {
            // Handle bottom-attached text
            rectObject.hooks[0].hookpt = ConstantData.HookPts.SED_KTC;
            rectObject.hooks[0].connect = new Point(
              ConstantData.Defines.SED_CDim / 2,
              ConstantData.Defines.SED_CDim
            );
            rectObject.hooks[0].objid = resultObject.UniqueMap[uniqueMapIndex - 1];
            rectObject.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT;
          } else if (currentObject && currentObject.TextFlags & ConstantData.TextFlags.SED_TF_AttachA) {
            // Handle top-attached text
            rectObject.hooks[0].hookpt = ConstantData.HookPts.SED_KBC;
            rectObject.hooks[0].connect = new Point(ConstantData.Defines.SED_CDim / 2, 0);
            rectObject.hooks[0].objid = resultObject.UniqueMap[uniqueMapIndex - 1];
            rectObject.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT;
          }

          currentObject = rectObject;
        }
      } else {
        // Handle regular objects
        currentObject = T3Gv.optManager.GetObjectPtr(objectId, false);

        if (currentObject) {
          if (currentObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
            lastConnectorIndex = uniqueMapIndex;
            connectorBlockId = currentObject.BlockID;
          } else {
            lastConnectorIndex = -1;
            connectorBlockId = currentObject.BlockID;
          }
        }
      }

      // Write the object to the data stream
      if (currentObject) {
        SDF.WriteObject(dataStream, uniqueMapIndex, currentObject, resultObject);
      }
    }

    // If not writing blocks or selections, additional processing could be done here
    if (resultObject.WriteBlocks == 0 && resultObject.selectonly == 0) {
      // Additional processing (commented in original)
    }

    // Write the drawing end marker
    dataStream.writeUint16(FileParser.SDROpCodesByName.SDF_C_DRAW12_END);
  }

  /**
   * Writes ruler configuration information to the data stream
   *
   * This function serializes ruler settings including units, scale, grid intervals,
   * and display preferences to the SDF file format. The ruler configuration controls
   * how measurement guides and grid lines appear in the document.
   *
   * @param dataStream - The data stream to write ruler information to
   * @param resultObject - Object containing ruler configuration and coordinate scale factors
   */
  static WriteRulers(dataStream, resultObject) {
    const rulerData = {
      show: resultObject.rulerConfig.show,
      inches: resultObject.rulerConfig.useInches,
      Major: SDF.ToSDWinCoords(resultObject.rulerConfig.major, resultObject.coordScaleFactor),
      MajorScale: resultObject.rulerConfig.majorScale,
      MinorDenom: resultObject.rulerConfig.nTics,
      units: resultObject.rulerConfig.units,
      dp: resultObject.rulerConfig.dp,
      originx: resultObject.rulerConfig.originx,
      originy: resultObject.rulerConfig.originy,
      showpixels: resultObject.rulerConfig.showpixels,
      fractionaldenominator: resultObject.rulerConfig.fractionaldenominator
    };

    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_O_RULER);
    dataStream.writeStruct(FileParser.SDF_RULER_Struct_52, rulerData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes recently used symbols list to the data stream
   *
   * This function serializes the list of recently used symbols to the SDF file format.
   * Each symbol record includes its ID, display settings (menu visibility), and content title.
   * This allows applications to maintain a history of frequently accessed symbols.
   *
   * @param dataStream - The data stream to write recent symbols list to
   * @param resultObject - Object containing session data with recent symbols information
   */
  static WriteRecentList(dataStream, resultObject) {
    // Only write recent symbols if they exist and we're not writing a group block
    if (
      resultObject.sdp.RecentSymbols &&
      resultObject.sdp.RecentSymbols.length > 0 &&
      resultObject.WriteGroupBlock === 0
    ) {
      // Write list begin marker
      const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_RECENTSYMBOLS_BEGIN);
      SDF.Write_LENGTH(dataStream, codeOffset);

      const symbolCount = resultObject.sdp.RecentSymbols.length;

      // Write each recent symbol entry
      for (let symbolIndex = 0; symbolIndex < symbolCount; symbolIndex++) {
        const symbolItem = resultObject.sdp.RecentSymbols[symbolIndex];

        // Write symbol identifier
        SDF.WriteString(
          dataStream,
          symbolItem.ItemId,
          FileParser.SDROpCodesByName.SDF_C_RECENTSYMBOL_ID,
          resultObject
        );

        // Write menu visibility setting
        const menuVisibilitySetting = symbolItem.NoMenu ? '1' : '0';
        SDF.WriteString(
          dataStream,
          menuVisibilitySetting,
          FileParser.SDROpCodesByName.SDF_C_RECENTSYMBOL_NOMENU,
          resultObject
        );

        // Write symbol title
        SDF.WriteString(
          dataStream,
          symbolItem.ContentTitle,
          FileParser.SDROpCodesByName.SDF_C_RECENTSYMBOL_NAME,
          resultObject
        );
      }

      // Write list end marker
      dataStream.writeUint16(FileParser.SDROpCodesByName.SDF_C_RECENTSYMBOLS_END);
    }
  }

  /**
   * Writes layer information to a data stream in SDF format
   *
   * This function serializes layer definitions to the data stream, including
   * layer flags, names, types, and object lists. It creates a structured
   * representation of all drawing layers with their properties.
   *
   * @param dataStream - The data stream to write layer information to
   * @param resultObject - Object containing the layer manager and context information
   */
  static WriteLayers(dataStream, resultObject) {
    const layerCount = resultObject.tLMB.nlayers;
    const layerArray = resultObject.tLMB.layers;
    let currentLayer = null;
    const layerListData = {
      n: 0,
      zList: []
    };

    // Write layer begin marker
    const beginCodeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_BEGIN_LAYER);
    SDF.Write_LENGTH(dataStream, beginCodeOffset);

    // Write each layer definition
    for (let layerIndex = 0; layerIndex < layerCount; ++layerIndex) {
      currentLayer = layerArray[layerIndex];

      // Write layer flags
      const flagsCodeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_LAYERFLAGS);
      dataStream.writeUint32(currentLayer.flags);
      SDF.Write_LENGTH(dataStream, flagsCodeOffset);

      // Write layer name
      SDF.WriteString(
        dataStream,
        currentLayer.name,
        FileParser.SDROpCodesByName.SDF_C_LAYERNAME,
        resultObject
      );

      // Write layer type
      const typeCodeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_LAYERTYPE);
      dataStream.writeUint32(currentLayer.layertype);
      SDF.Write_LENGTH(dataStream, typeCodeOffset);

      // Write layer object list when writing blocks
      if (resultObject.WriteBlocks) {
        layerListData.n = currentLayer.zList.length;
        layerListData.zList = currentLayer.zList;

        const listCodeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_LAYERLIST);
        dataStream.writeStruct(FileParser.SDF_LayerList_Struct, layerListData);
        SDF.Write_LENGTH(dataStream, listCodeOffset);
      }
    }

    // Write layer end marker
    dataStream.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_LAYER);
  }

  /**
   * Writes link information to a data stream in SDF format
   *
   * This function serializes connection links between objects to the data stream,
   * including both standard object links and text-specific links. For each link,
   * it writes the source and target object IDs, connection flags, and cell ID if applicable.
   * The links define relationships and connections between objects in the document.
   *
   * @param dataStream - The data stream to write link information to
   * @param resultObject - Object containing links array and context information
   */
  static WriteLinks(dataStream, resultObject) {
    // Get links from the result object
    const standardLinks = resultObject.links;
    const textLinks = resultObject.textlinks;
    const standardLinkCount = standardLinks.length;
    const textLinkCount = textLinks.length;
    let linkListData = {};
    let cellId;
    let linkData;

    // Only write links if there are some or we're writing blocks format
    if (standardLinkCount || textLinkCount || resultObject.WriteBlocks) {
      // Create link list structure with total count and link array
      linkListData = {
        n: standardLinkCount + textLinkCount,
        size: 14,
        links: []
      };

      // Process standard object links
      for (let linkIndex = 0; linkIndex < standardLinkCount; linkIndex++) {
        // Use SED_DNULL if cellId is null
        cellId = standardLinks[linkIndex].cellid;
        if (cellId == null) {
          cellId = ConstantData.Defines.SED_DNULL;
        }

        // Create link data structure for this link
        linkData = {
          targetid: SDF.BlockIDtoUniqueID(standardLinks[linkIndex].targetid, resultObject),
          tindex: -1,
          hookid: SDF.BlockIDtoUniqueID(standardLinks[linkIndex].hookid, resultObject),
          hindex: -1,
          flags: standardLinks[linkIndex].flags,
          cellid: cellId
        };

        // Add link to the collection
        linkListData.links.push(linkData);
      }

      // Process text links
      for (let linkIndex = 0; linkIndex < textLinkCount; linkIndex++) {
        // Text links always use SED_DNULL for cellId
        cellId = ConstantData.Defines.SED_DNULL;

        // Create link data structure for this text link
        linkData = {
          targetid: textLinks[linkIndex].targetid,
          tindex: -1,
          hookid: textLinks[linkIndex].hookid,
          hindex: -1,
          flags: 0,
          cellid: cellId
        };

        // Add text link to the collection
        linkListData.links.push(linkData);
      }

      // Write the links to the data stream
      const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_DRAWLINK);
      dataStream.writeStruct(FileParser.SDF_LinkList_Struct, linkListData);
      SDF.Write_LENGTH(dataStream, codeOffset);
    }
  }

  /**
   * Builds a list of styles used by objects in the document
   *
   * This function creates a comprehensive list of all styles used throughout the document,
   * including object styles, table cell styles, and text styles. It identifies unique styles,
   * creates a mapping between objects and their styles, and establishes relationships between
   * text objects and their containing elements. The function populates the styles array in the
   * result object for later serialization to the file format.
   *
   * @param resultObject - Object containing document properties and the styles collection to populate
   */
  static BuildStyleList(resultObject) {
    let objectCount;
    let currentObject;
    let childTextCount;
    let index;
    let objectsProcessed;
    let linkObject;
    let tableObject;
    let cellCount;
    let uniqueStyleIndex;
    let cellIndex;
    let currentCell;
    let styleObject;

    /**
     * Adds a style to the style list if it's not already present
     * @param style - The style to add to the list
     * @returns Index of the style in the style list
     */
    function addUniqueStyle(style) {
      let styleIndex;
      let styleCount;
      let styleCopy;

      // Check if the style already exists in the list
      styleCount = resultObject.lpStyles.length;
      for (styleIndex = 0; styleIndex < styleCount; styleIndex++) {
        if (style.Name === resultObject.lpStyles[styleIndex].Name) {
          return styleIndex;
        }
      }

      // Create a deep copy of the style and add to the list
      styleCopy = Utils1.DeepCopy(style);
      resultObject.lpStyles.push(styleCopy);
      return styleCount;
    }

    // Get object list and count
    objectCount = resultObject.zList.length;

    // Get default text block style and create variants for text objects
    const defaultTextStyle = Resources.FindStyle(ConstantData.Defines.TextBlockStyle);
    const transparentTextStyle = Utils1.DeepCopy(defaultTextStyle);
    const tableCellStyle = Utils1.DeepCopy(defaultTextStyle);

    // Ensure the styles have line properties
    if (defaultTextStyle.Line == null) {
      transparentTextStyle.Line = Utils1.DeepCopy(defaultTextStyle.Border);
      tableCellStyle.Line = Utils1.DeepCopy(defaultTextStyle.Border);
    }

    // Configure transparent text style for line labels
    transparentTextStyle.Line.Thickness = 0;
    transparentTextStyle.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_SOLID;
    transparentTextStyle.Fill.Paint.Color = resultObject.sdp.background.Paint.Color;

    // Process each object in the list
    objectsProcessed = 0;
    for (index = 0; index < objectCount; index++) {
      // Get object and add its style to the style list
      currentObject = T3Gv.optManager.GetObjectPtr(resultObject.zList[index], false);
      currentObject.tstyleindex = addUniqueStyle(currentObject.StyleRecord);

      // Handle table cell styles if this object has a table
      tableObject = currentObject.GetTable(false);
      if (tableObject) {
        cellCount = tableObject.cells.length;

        // Process each cell's style
        for (cellIndex = 0; cellIndex < cellCount; cellIndex++) {
          currentCell = tableObject.cells[cellIndex];

          // Create style from cell properties
          tableCellStyle.Name = currentCell.stylename;
          tableCellStyle.Fill = Utils1.DeepCopy(currentCell.fill);
          tableCellStyle.Line = Utils1.DeepCopy(currentCell.hline);
          tableCellStyle.Text = Utils1.DeepCopy(currentCell.Text);

          // Add cell's style to the style list
          currentCell.tstyleindex = addUniqueStyle(tableCellStyle);
        }
      }

      // Add object to the unique map and increment counter
      resultObject.UniqueMap.push(resultObject.zList[index]);
      objectsProcessed++;

      // Handle text objects associated with lines or with attachment points
      if ((currentObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE ||
        currentObject.TextFlags & ConstantData.TextFlags.SED_TF_AttachB ||
        currentObject.TextFlags & ConstantData.TextFlags.SED_TF_AttachA) &&
        currentObject.DataID > 0 &&
        !resultObject.WriteVisio) {

        // Add text object ID (negative to indicate it's a text object)
        resultObject.UniqueMap.push(-currentObject.DataID);
        objectsProcessed++;

        // Use transparent text style for text objects
        if (resultObject.TextStyleIndex == null) {
          resultObject.TextStyleIndex = addUniqueStyle(transparentTextStyle);
        }

        // Create link between line and text object
        linkObject = new Link(objectsProcessed - 1, objectsProcessed, null);
        resultObject.textlinks.push(linkObject);
      }

      // Handle additional text objects when not in Visio format
      if (!resultObject.WriteVisio) {
        const textIdArray = currentObject.GetTextIDs();
        childTextCount = textIdArray.length;
        uniqueStyleIndex = objectsProcessed;

        // Process each text ID
        for (styleObject = 0; styleObject < childTextCount; styleObject++) {
          resultObject.UniqueMap.push(-textIdArray[styleObject]);
          objectsProcessed++;

          // Use transparent text style for text objects
          if (resultObject.TextStyleIndex == null) {
            resultObject.TextStyleIndex = addUniqueStyle(transparentTextStyle);
          }

          // Create link between container and text object
          linkObject = new Link(uniqueStyleIndex, objectsProcessed, null);
          resultObject.textlinks.push(linkObject);
        }
      }
    }
  }

  /**
   * Writes a drawing document structure to a data stream in SDF format
   *
   * This function serializes the core drawing document structure including dimensions,
   * default styles, object counts, text properties, and drawing settings. It creates
   * the main container that holds all graphical elements, styles, and relationships
   * between objects.
   *
   * @param dataStream - The data stream to write the drawing structure to
   * @param resultObject - Object containing drawing properties, style information, and serialization context
   */
  static write_SDF_C_DRAW12(dataStream, resultObject) {
    // Calculate sizes and reference document components
    const objectCount = resultObject.UniqueMap.length;
    const linkCount = resultObject.links.length + resultObject.textlinks.length;
    const sessionData = resultObject.sdp;
    const layerManager = resultObject.tLMB;

    // Get selected object ID, converting if writing blocks
    const selectedObjectId = sessionData.tselect >= 0
      ? (resultObject.WriteBlocks ? sessionData.tselect : SDF.BlockIDtoUniqueID(sessionData.tselect, resultObject))
      : -1;

    // Convert snap alignment flag to numeric value
    const snapAlignFlag = sessionData.centersnapalign ? 1 : 0;

    // Prepare font information
    const fontList = [];
    fontList.push(sessionData.def.lf);
    const logicalFont = SDF.FontRecToLogFont(fontList[0], 0, resultObject);

    // Process arrow styles and flags
    let startArrow = sessionData.d_sarrow;
    if (sessionData.d_sarrowdisp) {
      startArrow += FileParser.ArrowMasks.ARROW_DISP;
    }

    let endArrow = sessionData.d_earrow;
    if (sessionData.d_earrowdisp) {
      endArrow += FileParser.ArrowMasks.ARROW_DISP;
    }

    // Create default graph settings
    const defaultGraph = new SEDGraphDefault();

    // Create the drawing structure with all properties
    const drawingData = {
      nobjects: objectCount,
      ngroups: 0,
      nlinks: linkCount,
      dim: {
        x: SDF.ToSDWinCoords(resultObject.sdp.dim.x, resultObject.coordScaleFactor),
        y: SDF.ToSDWinCoords(resultObject.sdp.dim.y, resultObject.coordScaleFactor)
      },
      flags: resultObject.sdp.flags,
      tselect: selectedObjectId,
      unique: objectCount,
      dupdisp: {
        x: SDF.ToSDWinCoords(resultObject.sdp.dupdisp.x, resultObject.coordScaleFactor),
        y: SDF.ToSDWinCoords(resultObject.sdp.dupdisp.y, resultObject.coordScaleFactor)
      },
      just: SDF.JSJustToWin(sessionData.def.just),
      vjust: SDF.JSJustToWin(sessionData.def.vjust),
      d_sarrow: startArrow,
      d_earrow: endArrow,
      d_arrowsize: sessionData.d_arrowsize,
      snapalign: snapAlignFlag,
      lf: logicalFont,
      hopstyle: sessionData.hopstyle,
      hopdim: {
        x: SDF.ToSDWinCoords(resultObject.sdp.hopdim.x, resultObject.coordScaleFactor),
        y: SDF.ToSDWinCoords(resultObject.sdp.hopdim.y, resultObject.coordScaleFactor)
      },
      defflags: sessionData.def.flags,
      dimensions: sessionData.dimensions,
      shapedimensions: sessionData.shapedimensions,
      activelayer: layerManager.activelayer,
      tmargins: {
        left: SDF.ToSDWinCoords(sessionData.def.tmargins.left, resultObject.coordScaleFactor),
        right: SDF.ToSDWinCoords(sessionData.def.tmargins.right, resultObject.coordScaleFactor),
        top: SDF.ToSDWinCoords(sessionData.def.tmargins.top, resultObject.coordScaleFactor),
        bottom: SDF.ToSDWinCoords(sessionData.def.tmargins.bottom, resultObject.coordScaleFactor)
      },
      textgrow: sessionData.def.textgrow,
      textflags: sessionData.def.textflags,
      fsize_min: sessionData.def.fsize_min,
      styleindex: -1,
      h_arraywidth: SDF.ToSDWinCoords(sessionData.def.h_arraywidth, resultObject.coordScaleFactor),
      v_arraywidth: SDF.ToSDWinCoords(sessionData.def.v_arraywidth, resultObject.coordScaleFactor),
      lastcommand: sessionData.def.lastcommand,
      graphtype: defaultGraph.type,
      graphflags: defaultGraph.flags,
      graphpointflags: defaultGraph.pointflags,
      graphcataxisflags: defaultGraph.catAxisflags,
      graphmagaxisflags: defaultGraph.magAxisflags,
      graphlegendtype: defaultGraph.legendType,
      graphlegendlayoutflags: defaultGraph.legendlayoutflags,
      graphimagevaluerep: defaultGraph.imagevaluerep,
      graphquadrant: defaultGraph.quadrant,
      arraywd: SDF.ToSDWinCoords(sessionData.def.arraywd, resultObject.coordScaleFactor),
      arrayht: SDF.ToSDWinCoords(sessionData.def.arrayht, resultObject.coordScaleFactor),
      sequenceflags: sessionData.sequenceflags,
      chartdirection: sessionData.chartdirection,
      copyPasteTrialVers: sessionData.copyPasteTrialVers,
      taskmanagementflags: sessionData.taskmanagementflags,
      taskdays: sessionData.taskdays,
      moreflags: sessionData.moreflags,
      fieldmask: sessionData.fieldmask,
      wallThickness: sessionData.def.wallThickness,
      curveparam: sessionData.def.curveparam,
      rrectparam: sessionData.def.rrectparam
    };

    // Write appropriate structure based on format
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_DRAW12);
    if (resultObject.WriteVisio || resultObject.WriteWin32) {
      dataStream.writeStruct(FileParser.SDF_C_DRAW12_Struct364, drawingData);
    } else {
      dataStream.writeStruct(FileParser.SDF_C_DRAW12_Struct440, drawingData);
    }

    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes style information to a data stream in SDF format
   *
   * This function serializes style definitions including name, fill properties,
   * line properties, text formatting, and visual effects. It organizes the style
   * components in the proper sequence for the file format, handling both standard
   * and border style variants.
   *
   * @param dataStream - The data stream to write the style information to
   * @param styleRecord - The style record containing properties to serialize
   * @param useBorder - Flag indicating whether to use Border or Line properties
   * @param resultObject - Object containing coordinate scale factors and context information
   * @param styleObject - Optional object associated with the style (used for special formatting)
   */
  static WriteStyle(dataStream, styleRecord, useBorder, resultObject, styleObject) {
    // Write style begin code and name
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_BEGIN_STYLE);
    dataStream.writeUCS2String(styleRecord.Name, T3DataStream.LITTLE_ENDIAN, styleRecord.Name.length + 1);
    SDF.Write_LENGTH(dataStream, codeOffset);

    // Write fill information if present
    if (styleRecord.Fill) {
      SDF.WriteSDFill(dataStream, styleRecord.Fill, resultObject);
    }

    // Write line or border information based on useBorder flag
    if (useBorder) {
      SDF.WriteSDLine(
        dataStream,
        styleRecord.Border,
        resultObject,
        FileParser.SDROpCodesByName.SDF_C_BEGIN_LINE,
        styleObject
      );
    } else {
      SDF.WriteSDLine(
        dataStream,
        styleRecord.Line,
        resultObject,
        FileParser.SDROpCodesByName.SDF_C_BEGIN_LINE,
        styleObject
      );
    }

    // Write text formatting information
    SDF.WriteSDTxf(dataStream, styleRecord.Text, resultObject);

    // Write outside effect information
    SDF.WriteOutside(dataStream, styleRecord.OutsideEffect);

    // Write style end marker
    dataStream.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_STYLE);
  }

  /**
   * Writes a list of styles to the data stream in SDF format
   *
   * This function serializes an array of style definitions to the data stream,
   * writing each style in sequence with proper begin/end markers. Styles define
   * the visual appearance of objects including fills, lines, and text formatting.
   *
   * @param dataStream - The data stream to write the style list to
   * @param styleArray - Array of style objects to be written
   * @param useBorder - Flag indicating whether to use Border or Line properties
   * @param resultObject - Object containing context information for serialization
   */
  static WriteStyleList(dataStream, styleArray, useBorder, resultObject) {
    let styleCount;
    let styleIndex;

    // Write style list begin marker
    SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_BEGIN_STYLELIST);

    // Write each style in the array
    styleCount = styleArray.length;
    for (styleIndex = 0; styleIndex < styleCount; styleIndex++) {
      SDF.WriteStyle(dataStream, styleArray[styleIndex], useBorder, resultObject, null);
    }

    // Write style list end marker
    dataStream.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_STYLELIST);
  }

  /**
   * Writes fill information to a data stream in SDF format
   *
   * This function serializes fill properties including fill type, color, pattern,
   * and special effects. It handles solid fills, gradients, textures, and hatching
   * patterns that define how shapes are filled.
   *
   * @param dataStream - The data stream to write the fill information to
   * @param fillData - The fill data containing paint properties and effects
   * @param resultObject - Object containing context information and color mappings
   */
  static WriteSDFill(dataStream, fillData, resultObject) {
    // Write fill begin marker
    SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_BEGIN_FILL);

    // Write paint properties with white as default color
    SDF.WritePaint(dataStream, fillData.Paint, ConstantData.Colors.Color_White, resultObject);

    // Write hatch pattern if present
    if (fillData.Hatch) {
      const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_HATCH);
      dataStream.writeUint32(fillData.Hatch);
      SDF.Write_LENGTH(dataStream, codeOffset);
    }

    // Write fill effect if present
    if (fillData.FillEffect) {
      SDF.WriteEffect(dataStream, fillData, fillData.FillEffect);
    }

    // Write fill end marker
    dataStream.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_FILL);
  }

  /**
   * Writes line information to a data stream in SDF format
   *
   * This function serializes line properties including thickness, pattern, color,
   * and special effects. It handles different line types, including filled lines
   * for special object types like Gantt bars and floor plan walls. It applies
   * appropriate scaling to coordinate values.
   *
   * @param dataStream - The data stream to write the line information to
   * @param lineData - The line data containing style properties
   * @param resultObject - Object containing coordinate scale factors and context information
   * @param opCode - The operation code for the line type
   * @param styleObject - Optional object associated with the style (for special formatting)
   */
  static WriteSDLine(dataStream, lineData, resultObject, opCode, styleObject) {
    let linePattern;
    let lineThickness;
    let fillLineThickness = 0;

    // Write line begin marker with the specified opcode
    const codeOffset = SDF.Write_CODE(dataStream, opCode);

    // Scale line thickness using coordinate scale factor
    lineThickness = SDF.ToSDWinCoords(lineData.Thickness, resultObject.coordScaleFactor);

    // Ensure minimum thickness for visible lines
    if (lineThickness === 0 && lineData.Thickness > 0) {
      lineThickness = 1;
    }

    // Special handling for Gantt bars - use filled line
    if (styleObject && styleObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR) {
      fillLineThickness = lineThickness / 2;
      lineThickness = 0;
      linePattern = resultObject.WriteWin32
        ? Resources.Windows_LinePatterns.SEP_FilledLine
        : Resources.LinePatternData.indexOf(lineData.LinePattern) + 1;
    }
    // Normal line pattern handling
    else {
      linePattern = Resources.LinePatternData.indexOf(lineData.LinePattern) + 1;
      if (linePattern < 1) {
        linePattern = 1;  // Default to solid line if pattern not found
      }
    }

    // Special handling for floor plan walls
    if (styleObject && styleObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
      fillLineThickness === 0 &&
      (styleObject.StyleRecord.Line.LinePattern === Resources.Windows_LinePatterns.SEP_Solid ||
        styleObject.StyleRecord.Line.LinePattern === Resources.Windows_LinePatterns.SEP_None)) {
      fillLineThickness = lineThickness / 2;
      lineThickness = 0;
      linePattern = resultObject.WriteWin32
        ? Resources.Windows_LinePatterns.SEP_FilledLine
        : Resources.LinePatternData.indexOf(lineData.LinePattern) + 1;
    }

    // Create and write line data structure
    const lineStruct = {
      thickness: lineThickness,
      pattern: linePattern
    };

    // Write appropriate structure based on format
    if (resultObject.WriteVisio || resultObject.WriteWin32) {
      dataStream.writeStruct(FileParser.SDF_BEGIN_LINE_Struct_8, lineStruct);
    } else {
      dataStream.writeStruct(FileParser.SDF_BEGIN_LINE_Struct_14, lineStruct);
    }

    SDF.Write_LENGTH(dataStream, codeOffset);

    // Write line paint properties with black as default color
    SDF.WritePaint(dataStream, lineData.Paint, ConstantData.Colors.Color_Black, resultObject);

    // Write filled line data if thickness is specified
    if (fillLineThickness) {
      const filledLineData = {
        bthick: fillLineThickness,
        color: SDF.HTMLColorToWin(lineData.Paint.Color)
      };

      const filledLineOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_FILLEDLINE);
      dataStream.writeStruct(FileParser.SDF_FILLED_LINE_Struct, filledLineData);
      SDF.Write_LENGTH(dataStream, filledLineOffset);
    }

    // Write hatch pattern if present
    if (lineData.Hatch) {
      const hatchOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_HATCH);
      dataStream.writeUint32(lineData.Hatch);
      SDF.Write_LENGTH(dataStream, hatchOffset);
    }

    // Write line effect if present
    if (lineData.LineEffect) {
      SDF.WriteEffect(dataStream, lineData, lineData.LineEffect);
    }

    // Write line end marker
    dataStream.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_LINE);
  }

  /**
   * Writes text formatting information to a data stream in SDF format
   *
   * This function serializes text formatting properties including font, size, style,
   * and color effects to the data stream. It handles the writing of font ID references,
   * text sizes, style attributes (bold, italic, etc.), and any special text effects.
   *
   * @param dataStream - The data stream to write text formatting information to
   * @param textFormatting - The text formatting properties to serialize
   * @param resultObject - Object containing font lists, coordinate scale factors, and context information
   */
  static WriteSDTxf(dataStream, textFormatting, resultObject) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_BEGIN_TEXTF);

    const textFormattingData = {
      fontid: SDF.GetFontID(textFormatting.FontName, resultObject.fontlist),
      fsize: textFormatting.FontSize,
      face: textFormatting.Face
    };

    dataStream.writeStruct(FileParser.SDF_BEGIN_TEXTF_Struct, textFormattingData);
    SDF.Write_LENGTH(dataStream, codeOffset);

    // Write text color properties
    SDF.WritePaint(dataStream, textFormatting.Paint, ConstantData.Colors.Color_Black, resultObject);

    // Write text effects if present
    if (textFormatting.Effect.OutsideType) {
      SDF.WriteOutside(dataStream, textFormatting.Effect);
    }

    // Write text formatting end marker
    dataStream.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_TEXTF);
  }

  /**
   * Writes outside effect information to a data stream in SDF format
   *
   * This function serializes outside effects such as shadows, glows, or outlines to the data stream.
   * It handles effect type, extent dimensions, colors, and effect-specific parameters.
   * Outside effects provide visual enhancements to text and shape objects.
   *
   * @param dataStream - The data stream to write the outside effect information to
   * @param outsideEffect - The outside effect properties to serialize
   */
  static WriteOutside(dataStream, outsideEffect) {
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_OUTSIDE);

    // Ensure color is properly formatted
    if (typeof outsideEffect.Color !== 'string') {
      outsideEffect.Color = null;
    }

    // Get color value, using black as default if no color specified
    const colorValue = outsideEffect.Color
      ? SDF.HTMLColorToWin(outsideEffect.Color)
      : SDF.HTMLColorToWin(ConstantData.Colors.Color_Black);

    // Create outside effect data structure
    const outsideEffectData = {
      outsidetype: outsideEffect.OutsideType,
      extent: {
        left: outsideEffect.OutsideExtent_Left,
        top: outsideEffect.OutsideExtent_Top,
        right: outsideEffect.OutsideExtent_Right,
        bottom: outsideEffect.OutsideExtent_Bottom
      },
      color: colorValue,
      lparam: outsideEffect.LParam,
      wparam: outsideEffect.WParam
    };

    // Write the effect data and length
    dataStream.writeStruct(FileParser.SDF_OUTSIDE_EFFECT_Struct, outsideEffectData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes paint information to a data stream in SDF format
   *
   * This function serializes paint properties including fill type, color, gradient information,
   * and textures to the data stream. It handles solid colors, gradients, rich gradients
   * (with multiple color stops), and texture fills with proper opacity handling.
   *
   * @param dataStream - The data stream to write paint information to
   * @param paintData - The paint data containing fill type, colors, and other properties
   * @param defaultColor - Default color to use if no color is specified
   * @param resultObject - Object containing texture lists, gradient definitions, and context info
   */
  static WritePaint(dataStream, paintData, defaultColor, resultObject) {
    // Write paint begin marker
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_BEGIN_PAINT);

    // Use default color if none provided
    if (paintData.Color == null) {
      paintData.Color = defaultColor;
    }

    // Create basic paint properties structure
    const paintStruct = {
      filltype: paintData.FillType,
      color: SDF.HTMLColorToWin(paintData.Color, paintData.Opacity)
    };

    // Write paint properties and length
    dataStream.writeStruct(FileParser.SDF_BEGIN_PAINT_Struct, paintStruct);
    SDF.Write_LENGTH(dataStream, codeOffset);

    // Set default end color if none provided
    if (paintData.EndColor == null) {
      paintData.EndColor = ConstantData.Colors.Color_White;
    }

    // Write additional information based on fill type
    switch (paintData.FillType) {
      case ConstantData.FillTypes.SDFILL_GRADIENT:
        // Write standard two-color gradient
        const gradientData = {
          ecolor: SDF.HTMLColorToWin(paintData.EndColor, paintData.EndOpacity),
          gradientflags: paintData.GradientFlags
        };

        const gradientOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_GRADIENT);
        dataStream.writeStruct(FileParser.SDF_GRADIENT_Struct, gradientData);
        SDF.Write_LENGTH(dataStream, gradientOffset);
        break;

      case ConstantData.FillTypes.SDFILL_RICHGRADIENT:
        // Write multi-stop rich gradient
        const richGradient = resultObject.RichGradients[paintData.GradientFlags];

        if (richGradient) {
          const stopCount = richGradient.stops.length;

          // Write rich gradient header
          const richGradientData = {
            gradienttype: richGradient.gradienttype,
            angle: richGradient.angle,
            nstops: stopCount
          };

          const richGradientOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_RICHGRADIENT);
          dataStream.writeStruct(FileParser.SDF_RICHGRADIENT_Struct, richGradientData);
          SDF.Write_LENGTH(dataStream, richGradientOffset);

          // Write each gradient stop
          for (let stopIndex = 0; stopIndex < stopCount; stopIndex++) {
            const stopData = {
              color: SDF.HTMLColorToWin(richGradient.stops[stopIndex].color, richGradient.stops[stopIndex].opacity),
              stop: richGradient.stops[stopIndex].stop
            };

            const stopOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_RICHGRADIENTSTOP);
            dataStream.writeStruct(FileParser.SDF_RICHGRADIENTSTOP_Struct, stopData);
            SDF.Write_LENGTH(dataStream, stopOffset);
          }
        }
        break;

      case ConstantData.FillTypes.SDFILL_TEXTURE:
        // Write texture fill
        const textureOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_TEXTURE);
        let textureId = paintData.Texture;

        // Convert texture name to index if not in block-writing mode
        if (!resultObject.WriteBlocks) {
          textureId = resultObject.TextureList.indexOf(textureId);
          if (textureId < 0) {
            textureId = 0; // Use default texture if not found
          }
        }

        dataStream.writeUint32(textureId);
        SDF.Write_LENGTH(dataStream, textureOffset);
        break;
    }

    // Write paint end marker
    dataStream.writeUint16(FileParser.SDROpCodesByName.SDF_C_END_PAINT);
  }

  /**
   * Converts shape-specific parameters to SDF format values with proper scaling
   *
   * This function handles the conversion of shape parameters to the appropriate SDF format values,
   * applying coordinate scaling based on the shape type. Different shapes may require
   * different parameter transformations to ensure correct rendering in the file format.
   *
   * @param shapeData - Object containing shape information including dataclass (shape type) and shapeparam
   * @param resultObject - Object containing coordinate scale factors and context information
   * @returns The shape parameter value appropriately scaled for SDF file format
   */
  static ShapeParamToSDR(shapeData, resultObject) {
    let convertedParam = 0;
    const shapeTypes = PolygonConstant.ShapeTypes;

    switch (shapeData.dataclass) {
      // Multi-sided polygons that need coordinate scaling
      case shapeTypes.PARALLELOGRAM:
      case shapeTypes.PENTAGON:
      case shapeTypes.PENTAGON_LEFT:
      case shapeTypes.HEXAGON:
        convertedParam = SDF.ToSDWinCoords(shapeData.shapeparam, resultObject.coordScaleFactor);
        break;

      // Octagon uses raw parameter without scaling
      case shapeTypes.OCTAGON:
        convertedParam = shapeData.shapeparam;
        break;

      // Directional and special shapes requiring coordinate scaling
      case shapeTypes.ARROW_LEFT:
      case shapeTypes.ARROW_RIGHT:
      case shapeTypes.ARROW_TOP:
      case shapeTypes.ARROW_BOTTOM:
      case shapeTypes.TRAPEZOID_BOTTOM:
      case shapeTypes.TRAPEZOID:
      case shapeTypes.INPUT:
      case shapeTypes.DOCUMENT:
      case shapeTypes.STORAGE:
      case shapeTypes.DELAY:
      case shapeTypes.DISPLAY:
        convertedParam = SDF.ToSDWinCoords(shapeData.shapeparam, resultObject.coordScaleFactor);
    }

    return convertedParam;
  }

  static WriteObject(e, t, a, r) {
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

  /**
   * Writes notes associated with an object to the data stream in SDF format
   *
   * This function checks if the object has associated notes (via NoteID) and writes
   * them to the data stream. Notes provide additional textual information attached
   * to drawing objects that can be displayed separately from the object itself.
   *
   * @param dataStream - The data stream to write the notes to
   * @param drawingObject - The object that may have associated notes
   * @param resultObject - Object containing context information for serialization
   */
  static WriteNotes(dataStream, drawingObject, resultObject) {
    if (drawingObject.NoteID !== -1) {
      SDF.WriteText(dataStream, drawingObject, null, null, true, resultObject);
    }
  }

  /**
   * Writes hook information to a data stream in SDF format
   *
   * This function serializes connection hooks between objects, handling direction
   * reversal for lines and connectors. Hooks define how objects connect to each other,
   * including connection points, cell attachments, and connection geometry.
   *
   * @param dataStream - The data stream to write hook information to
   * @param drawingObject - The object containing hooks to be written
   * @param resultObject - Object containing context information and unique mapping
   */
  static WriteHooks(dataStream, drawingObject, resultObject) {
    let hookCount;
    let hookIndex;
    let codeOffset;
    let cellId;
    let hookPoint;
    let targetObject;
    let hookData = {};
    let isLineReversed = false;
    let connectPoint = {};
    let isReverseColumn = false;
    const centerDimension = ConstantData.Defines.SED_CDim;

    // Check if the line or connector is reversed (affects hook point direction)
    if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE) {
      isLineReversed = SDF.LineIsReversed(drawingObject, resultObject, false);
    } else if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
      isReverseColumn = (drawingObject.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_ReverseCol) &&
        drawingObject.vertical;
    }

    // Process all hooks on the drawing object
    hookCount = drawingObject.hooks.length;
    if (hookCount) {
      for (hookIndex = 0; hookIndex < hookCount; hookIndex++) {
        // Get hook point and adjust for reversal if needed
        hookPoint = drawingObject.hooks[hookIndex].hookpt;

        if (isLineReversed) {
          // Adjust hook points for reversed lines
          switch (hookPoint) {
            case ConstantData.HookPts.SED_KTL:
              hookPoint = ConstantData.HookPts.SED_KTR;
              break;
            case ConstantData.HookPts.SED_KTR:
              hookPoint = ConstantData.HookPts.SED_KTL;
              break;
          }
        } else if (isReverseColumn) {
          // Adjust hook points for reversed columns
          switch (hookPoint) {
            case ConstantData.HookPts.SED_LL:
              hookPoint = ConstantData.HookPts.SED_LR;
              break;
            case ConstantData.HookPts.SED_LT:
              hookPoint = ConstantData.HookPts.SED_LB;
              break;
          }
        }

        // Get connection point coordinates
        connectPoint.x = drawingObject.hooks[hookIndex].connect.x;
        connectPoint.y = drawingObject.hooks[hookIndex].connect.y;

        // Get target object and adjust connection point if it's reversed
        targetObject = T3Gv.optManager.GetObjectPtr(drawingObject.hooks[hookIndex].objid, false);
        if (SDF.LineIsReversed(targetObject, resultObject, true)) {
          connectPoint.x = centerDimension - connectPoint.x;
          connectPoint.y = centerDimension - connectPoint.y;
        }

        // Get cell ID or use default if null
        cellId = (drawingObject.hooks[hookIndex].cellid == null) ?
          ConstantData.Defines.SED_DNULL :
          drawingObject.hooks[hookIndex].cellid;

        // Write hook data to stream
        codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_DRAWHOOK);
        hookData = {
          objid: SDF.BlockIDtoUniqueID(drawingObject.hooks[hookIndex].objid, resultObject),
          index: -1,
          connectx: connectPoint.x,
          connecty: connectPoint.y,
          hookpt: hookPoint,
          cellid: cellId
        };

        dataStream.writeStruct(FileParser.SDF_DRAWHOOK_Struct, hookData);
        SDF.Write_LENGTH(dataStream, codeOffset);
      }
    }
  }

  /**
   * Writes object data information to the data stream in SDF format
   *
   * This function serializes data binding information for an object, including dataset
   * references, element IDs, and field mappings. It ensures data integrity by validating
   * table references before writing them to the stream, resetting invalid references to
   * prevent errors when loading the document later.
   *
   * @param dataStream - The data stream to write object data to
   * @param drawingObject - The object containing data binding information
   * @param resultObject - Object containing context information for serialization
   */
  static WriteObjData(dataStream, drawingObject, resultObject) {
    // Create object data structure with default values for null/undefined fields
    const objectDataInfo = {
      datasetID: drawingObject.datasetID ? drawingObject.datasetID : -1,
      datasetType: drawingObject.datasetType ? drawingObject.datasetType : -1,
      datasetElemID: drawingObject.datasetElemID ? drawingObject.datasetElemID : -1,
      datasetTableID: drawingObject.datasetTableID ? drawingObject.datasetTableID : -1,
      fieldDataElemID: drawingObject.fieldDataElemID ? drawingObject.fieldDataElemID : -1,
      fieldDataTableID: drawingObject.fieldDataTableID ? drawingObject.fieldDataTableID : -1,
      fieldDataDatasetID: drawingObject.fieldDataDatasetID ? drawingObject.fieldDataDatasetID : -1
    };

    // Validate table references - if table doesn't exist, reset all table references
    if (drawingObject.datasetTableID >= 0 &&
      !ListManager.SDData.GetTable(drawingObject.datasetTableID)) {
      objectDataInfo.datasetID = -1;
      objectDataInfo.datasetType = -1;
      objectDataInfo.datasetElemID = -1;
      objectDataInfo.datasetTableID = -1;
    }

    // Write object data structure to stream
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_OBJDATA);
    dataStream.writeStruct(FileParser.SDF_OBJDATA_Struct32, objectDataInfo);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

  /**
   * Writes style overrides to the data stream in SDF format
   *
   * This function serializes style overrides for objects that have customized styling
   * different from their base style. It efficiently handles the differences by comparing
   * the object's style to its reference style and only writing the modified components
   * (fill, line, text, effects) to minimize file size and processing time.
   *
   * @param dataStream - The data stream to write style override information to
   * @param drawingObject - The object containing style overrides
   * @param resultObject - Object containing style list references and context information
   */
  static WriteStyleOverrides(dataStream, drawingObject, resultObject) {
    const matchFlags = Resources.MatchFlags;
    const styleCount = resultObject.lpStyles.length;

    // Special case for Visio format - always write full style information
    if (resultObject.WriteVisio) {
      SDF.WriteSDFill(dataStream, drawingObject.StyleRecord.Fill, resultObject);
      SDF.WriteSDLine(
        dataStream,
        drawingObject.StyleRecord.Line,
        resultObject,
        FileParser.SDROpCodesByName.SDF_C_BEGIN_LINE,
        drawingObject
      );
      SDF.WriteSDTxf(dataStream, drawingObject.StyleRecord.Text, resultObject);
      SDF.WriteOutside(dataStream, drawingObject.StyleRecord.OutsideEffect);
      return;
    }

    // For other formats, check if the object has a valid style index and isn't a floor plan wall
    if (drawingObject.tstyleindex >= 0 &&
      drawingObject.tstyleindex < styleCount &&
      drawingObject.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) {

      // Compare the object's style to the reference style to find differences
      const styleDifferences = Resources.SD_CompareStyles(
        drawingObject.StyleRecord,
        resultObject.lpStyles[drawingObject.tstyleindex],
        true
      );

      // Only write fill if it differs from the reference style
      if (styleDifferences & matchFlags.SDSTYLE_NOMATCH_FILL) {
        SDF.WriteSDFill(dataStream, drawingObject.StyleRecord.Fill, resultObject);
      }

      // Only write line properties if any line attribute differs
      if (styleDifferences & (
        matchFlags.SDSTYLE_NOMATCH_LINETHICK |
        matchFlags.SDSTYLE_NOMATCH_LINEPAT |
        matchFlags.SDSTYLE_NOMATCH_LINEFILL
      )) {
        SDF.WriteSDLine(
          dataStream,
          drawingObject.StyleRecord.Line,
          resultObject,
          FileParser.SDROpCodesByName.SDF_C_BEGIN_LINE,
          drawingObject
        );
      }

      // Only write text properties if any text attribute differs
      if (styleDifferences & (
        matchFlags.SDSTYLE_NOMATCH_TEXTFONT |
        matchFlags.SDSTYLE_NOMATCH_TEXTSIZE |
        matchFlags.SDSTYLE_NOMATCH_TEXTFACE |
        matchFlags.SDSTYLE_NOMATCH_TEXTFILL
      )) {
        SDF.WriteSDTxf(dataStream, drawingObject.StyleRecord.Text, resultObject);
      }

      // Only write outside effects if they differ
      if (styleDifferences & matchFlags.SDSTYLE_NOMATCH_OUTSIDE) {
        SDF.WriteOutside(dataStream, drawingObject.StyleRecord.OutsideEffect);
      }
    }
    // If no valid style reference exists, write the complete style
    else {
      SDF.WriteStyle(dataStream, drawingObject.StyleRecord, false, resultObject, drawingObject);
    }
  }

  /**
   * Writes arrowhead information to the data stream in SDF format
   *
   * This function serializes arrowhead properties for the start and end of lines or connectors.
   * It handles display flags, arrow type IDs, size information, and special cases for reversed
   * lines where the start and end arrowheads need to be swapped. Arrow display flags indicate
   * whether arrowheads should be visible.
   *
   * @param dataStream - The data stream to write arrowhead information to
   * @param resultObject - Object containing context information for serialization
   * @param drawingObject - The object containing arrowhead properties
   */
  static WriteArrowheads(dataStream, resultObject, drawingObject) {
    // Get arrow identifiers from the drawing object
    let startArrowId = drawingObject.StartArrowID;
    let endArrowId = drawingObject.EndArrowID;

    // Add display flags to arrows if they should be displayed
    if (drawingObject.StartArrowDisp) {
      startArrowId += FileParser.ArrowMasks.ARROW_DISP;
    }

    if (drawingObject.EndArrowDisp) {
      endArrowId += FileParser.ArrowMasks.ARROW_DISP;
    }

    // For reversed lines, swap start and end arrowheads
    if (SDF.LineIsReversed(drawingObject, resultObject, false)) {
      const tempArrowId = endArrowId;
      endArrowId = startArrowId;
      startArrowId = tempArrowId;
    }

    // Create arrowhead data structure
    const arrowheadData = {
      arrowsize: drawingObject.ArrowSizeIndex,
      sarrow: startArrowId,
      earrow: endArrowId,
      sarrowid: 0,
      earrowid: 0
    };

    // Write the arrow data to the stream
    const codeOffset = SDF.Write_CODE(dataStream, FileParser.SDROpCodesByName.SDF_C_DRAWARROW);
    dataStream.writeStruct(FileParser.SDF_DRAWARROW_Struct, arrowheadData);
    SDF.Write_LENGTH(dataStream, codeOffset);
  }

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

  static BlockHeader = function (e, t, a, r, i, n) {
    this.state = e,
      this.delta = t,
      this.action = SDF.BlockActions.Normal,
      this.blocktype = a,
      this.blockid = r,
      this.index = i,
      this.nblocks = n
  }

  /**
   * Saves all blocks to the storage format
   *
   * This function coordinates the complete serialization of all document blocks
   * when a full save is required. It manages the saving process, resets header filters,
   * and handles any socket actions that might be pending for the save operation.
   *
   * @param stateId - The state identifier to save from
   * @param deltaState - The delta state information
   */
  static SaveAllBlocks(stateId, deltaState) {
    if (true) {
      if (false) {
        const pendingActionCount = T3Gv.optManager.SocketAction.length;
        const socketActions = ListManager.SocketActions;

        if (pendingActionCount) {
          const saveContext = {
            state: 0,
            delta: 0,
            nblocks: 1
          };

          for (let actionIndex = 0; actionIndex < pendingActionCount; actionIndex++) {
            switch (T3Gv.optManager.SocketAction[actionIndex]) {
              case socketActions.SaveAllBlocks:
                SDF.WriteAllBlocks();
                SDF.HeaderFilters = [];
                SDF.Header2Count = 0;
                break;
            }
          }

          T3Gv.optManager.SocketAction = [];
        } else {
          SDF.WriteAllBlocks();
          SDF.HeaderFilters = [];
          SDF.Header2Count = 0;
        }
      }
    }
  }

  /**
   * Gets the block name for a specified object type
   *
   * This function determines the appropriate file block name for a given object type,
   * which is used in the block serialization process. It also optionally populates
   * block metadata including the block ID and type in the provided container.
   *
   * @param storedObject - The object for which to get the block name
   * @param skipSystemObjects - Flag indicating whether to skip system objects
   * @param blockMetadata - Optional container to receive block metadata
   * @returns The block name string, or null if the object should be skipped
   */
  static GetBlockName(storedObject, skipSystemObjects, blockMetadata) {
    let blockName;
    const objectTypes = ConstantData.StoredObjectType;

    switch (storedObject.Type) {
      case objectTypes.BASE_LM_DRAWING_OBJECT:
        blockName = SDF.BlockNames.LMObject + storedObject.ID;
        if (blockMetadata) {
          blockMetadata.id = storedObject.ID;
          blockMetadata.type = SDF.BlockIDs.LMObject;
        }
        break;

      case objectTypes.LM_TEXT_OBJECT:
      case objectTypes.LM_NOTES_OBJECT:
        blockName = SDF.BlockNames.Text + storedObject.ID;
        if (blockMetadata) {
          blockMetadata.id = storedObject.ID;
          blockMetadata.type = SDF.BlockIDs.Text;
        }
        break;

      case objectTypes.TABLE_OBJECT:
        blockName = SDF.BlockNames.Table + storedObject.ID;
        if (blockMetadata) {
          blockMetadata.id = storedObject.ID;
          blockMetadata.type = SDF.BlockIDs.Table;
        }
        break;

      case objectTypes.GRAPH_OBJECT:
        blockName = SDF.BlockNames.Graph + storedObject.ID;
        if (blockMetadata) {
          blockMetadata.id = storedObject.ID;
          blockMetadata.type = SDF.BlockIDs.Graph;
        }
        break;

      case objectTypes.EXPANDEDVIEW_OBJECT:
        blockName = SDF.BlockNames.ExpandedView + storedObject.ID;
        if (blockMetadata) {
          blockMetadata.id = storedObject.ID;
          blockMetadata.type = SDF.BlockIDs.ExpandedView;
        }
        break;

      case objectTypes.LM_COMMENT_BLOCK:
        blockName = SDF.BlockNames.Comment + storedObject.ID;
        if (blockMetadata) {
          blockMetadata.id = storedObject.ID;
          blockMetadata.type = SDF.BlockIDs.Comment;
        }
        break;

      case objectTypes.H_NATIVE_OBJECT:
      case objectTypes.H_NATIVEWIN_OBJECT:
        blockName = SDF.BlockNames.Native + storedObject.ID;
        if (blockMetadata) {
          blockMetadata.id = storedObject.ID;
          blockMetadata.type = SDF.BlockIDs.Native;
        }
        break;

      case objectTypes.BLOBBYTES_OBJECT:
        blockName = SDF.BlockNames.Image + storedObject.ID;
        if (blockMetadata) {
          blockMetadata.id = storedObject.ID;
          blockMetadata.type = SDF.BlockIDs.Image;
        }
        break;

      case objectTypes.SED_SESSION_OBJECT:
        if (skipSystemObjects) return null;
        blockName = SDF.BlockNames.sdp;
        if (blockMetadata) {
          blockMetadata.id = storedObject.ID;
          blockMetadata.type = SDF.BlockIDs.sdp;
        }
        break;

      case objectTypes.LAYERS_MANAGER_OBJECT:
        if (skipSystemObjects) return null;
        blockName = SDF.BlockNames.Layers;
        if (blockMetadata) {
          blockMetadata.id = storedObject.ID;
          blockMetadata.type = SDF.BlockIDs.Layers;
        }
        break;

      case objectTypes.SDDATA_OBJECT:
        if (skipSystemObjects) return null;
        blockName = SDF.BlockNames.SDData;
        if (blockMetadata) {
          blockMetadata.id = storedObject.ID;
          blockMetadata.type = SDF.BlockIDs.SDData;
        }
        break;

      case objectTypes.LINKLIST_OBJECT:
        if (skipSystemObjects) return null;
        blockName = SDF.BlockNames.Links;
        if (blockMetadata) {
          blockMetadata.id = storedObject.ID;
          blockMetadata.type = SDF.BlockIDs.Links;
        }
    }

    return blockName;
  }

  /**
   * Builds a serialized object block for storage or transmission
   *
   * This function creates a serialized representation of a stored object based on its type,
   * handling various object types like drawing objects, text, tables, graphs, etc.
   * It either checks if the object can be serialized (when countOnly is true) or
   * performs the actual serialization by calling the appropriate writer function.
   *
   * @param storedObject - The object to be serialized
   * @param resultObject - The context object containing serialization settings and references
   * @param countOnly - When true, only checks if object can be serialized without writing it
   * @param blockIndex - The index of the block in the serialization sequence
   * @returns True if countOnly is true and object can be serialized, otherwise the serialized block
   */
  static BuildObjectBlock(storedObject, resultObject, countOnly, blockIndex) {
    let objectInstance;
    let serializedBlock;
    const objectTypes = ConstantData.StoredObjectType;

    switch (storedObject.Type) {
      case objectTypes.BASE_LM_DRAWING_OBJECT:
        // Handle base drawing objects
        objectInstance = T3Gv.objectStore.GetObject(storedObject.ID);
        if (objectInstance && !objectInstance.Data.bInGroup) {
          if (countOnly) return true;
          serializedBlock = SDF.WriteOBJBlock(objectInstance.Data, resultObject, blockIndex);
        }
        break;

      case objectTypes.LM_TEXT_OBJECT:
        // Handle text objects
        objectInstance = T3Gv.objectStore.GetObject(storedObject.ID);
        if (objectInstance) {
          if (countOnly) return true;
          serializedBlock = SDF.WriteTextBlock(objectInstance, resultObject, false, blockIndex);
        }
        break;

      case objectTypes.LM_NOTES_OBJECT:
        // Handle note objects
        objectInstance = T3Gv.objectStore.GetObject(storedObject.ID);
        if (objectInstance) {
          if (countOnly) return true;
          serializedBlock = SDF.WriteTextBlock(objectInstance, resultObject, true, blockIndex);
        }
        break;

      case objectTypes.TABLE_OBJECT:
        // Handle table objects
        objectInstance = T3Gv.objectStore.GetObject(storedObject.ID);
        if (objectInstance) {
          if (countOnly) return true;
          serializedBlock = SDF.WriteTableBlock(objectInstance, resultObject, blockIndex);
        }
        break;

      case objectTypes.GRAPH_OBJECT:
        // Handle graph objects
        objectInstance = T3Gv.objectStore.GetObject(storedObject.ID);
        if (objectInstance) {
          if (countOnly) return true;
          serializedBlock = SDF.WriteGraphBlock(objectInstance, resultObject, blockIndex);
        }
        break;

      case objectTypes.EXPANDEDVIEW_OBJECT:
        // Handle expanded view objects
        objectInstance = T3Gv.objectStore.GetObject(storedObject.ID);
        if (objectInstance) {
          if (countOnly) return true;
          serializedBlock = SDF.WriteExpandedViewBlock(objectInstance, resultObject, blockIndex);
        }
        break;

      case objectTypes.LM_COMMENT_BLOCK:
        // Handle comment block objects
        objectInstance = T3Gv.objectStore.GetObject(storedObject.ID);
        if (objectInstance) {
          if (countOnly) return true;
          serializedBlock = SDF.WriteCommentBlock(objectInstance, resultObject, blockIndex);
        }
        break;

      case objectTypes.BLOBBYTES_OBJECT:
        // Handle binary blob objects (images, etc.)
        objectInstance = T3Gv.objectStore.GetObject(storedObject.ID);
        if (objectInstance) {
          if (countOnly) return true;
          serializedBlock = SDF.WriteImageBlock(objectInstance, resultObject, blockIndex);
        }
        break;

      case objectTypes.H_NATIVE_OBJECT:
        // Handle native objects
        objectInstance = T3Gv.objectStore.GetObject(storedObject.ID);
        if (objectInstance) {
          if (countOnly) return true;
          serializedBlock = SDF.WriteNativeBlock(
            objectInstance,
            FileParser.SDROpCodesByName.SDF_C_NATIVEBLOCK,
            resultObject,
            blockIndex
          );
        }
        break;

      case objectTypes.H_NATIVEWIN_OBJECT:
        // Handle Windows-specific native objects
        objectInstance = T3Gv.objectStore.GetObject(storedObject.ID);
        if (objectInstance) {
          if (countOnly) return true;
          serializedBlock = SDF.WriteNativeBlock(
            objectInstance,
            FileParser.SDROpCodesByName.SDF_C_NATIVEWINBLOCK,
            resultObject,
            blockIndex
          );
        }
        break;

      case objectTypes.SED_SESSION_OBJECT:
        // Handle session objects
        if (countOnly) return true;
        serializedBlock = SDF.WriteSDPBlock(resultObject, blockIndex);
        break;

      case objectTypes.SDDATA_OBJECT:
        // Handle data objects
        if (countOnly) return true;
        if (T3Gv.optManager.theContentHeader.SDDataID >= 0) {
          serializedBlock = SDF.WriteSDDataBlock(resultObject, blockIndex);
        }
        break;

      case objectTypes.LAYERS_MANAGER_OBJECT:
        // Handle layer manager objects
        if (countOnly) return true;
        serializedBlock = SDF.WriteLayersBlock(resultObject.tLMB, resultObject, blockIndex);
        break;

      case objectTypes.LINKLIST_OBJECT:
        // Handle link list objects
        objectInstance = T3Gv.objectStore.GetObject(storedObject.ID);
        if (objectInstance) {
          if (countOnly) return true;
          serializedBlock = SDF.WriteLinksBlock(objectInstance.Data, resultObject, blockIndex);
        }
        break;
    }

    return serializedBlock;
  }

  /**
   * Saves blocks that have changed between states to the storage format
   *
   * This function analyzes changes between states in a document and serializes
   * the modified objects. It handles object creation, deletion, and modification
   * by comparing state information and generating appropriate block data for storage
   * or transmission. It maintains document consistency by tracking objects across
   * state transitions.
   *
   * @param stateId - The source state identifier to compare from
   * @param deltaState - Change in state value (negative for reverse changes)
   * @param targetStateId - Optional target state ID (defaults to source state if not provided)
   * @param customStoredObjects - Optional specific objects to save instead of all from the state
   */
  static SaveChangedBlocks(stateId, deltaState, targetStateId, customStoredObjects) {
    try {
      // Early returns for unsupported conditions
      if (false) return;
      if (false) return;

      // Prepare result object and track deleted objects
      const resultObject = new SDF.WResult();
      const deletedObjectIds = [];
      const blockMetadata = {};

      // Use source state as target if not specified
      if (targetStateId == null) {
        targetStateId = stateId;
      }

      // Get objects from the state
      const stateObjects = T3Gv.stateManager.States[stateId].StoredObjects;
      const objectCount = stateObjects.length;

      // Initialize result object with document context
      resultObject.sdp = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, false);
      resultObject.ctp = T3Gv.optManager.theContentHeader;
      resultObject.tLMB = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, false);
      resultObject.fontlist = T3Gv.optManager.theContentHeader.FontList;
      resultObject.RichGradients = T3Gv.optManager.RichGradients;
      resultObject.WriteBlocks = true;

      // Get current view settings from the work area
      const workArea = T3Gv.docUtil.svgDoc.GetWorkArea();
      resultObject.WindowSettings.wscale = T3Gv.docUtil.GetZoomFactor();
      resultObject.WindowSettings.worigin.x = workArea.scrollX;
      resultObject.WindowSettings.worigin.y = workArea.scrollY;
      resultObject.WindowSettings.wflags = 0;

      // Set appropriate view flags based on current state
      if (T3Gv.docUtil.scaleToFit) {
        resultObject.WindowSettings.wflags = ListManager.WFlags.W_Stf;
      } else if (T3Gv.docUtil.scaleToPage) {
        resultObject.WindowSettings.wflags = ListManager.WFlags.W_Page;
      }

      // Store document resolution
      resultObject.docDpi = T3Gv.docUtil.svgDoc.docInfo.docDpi;

      // Handle zoom scaling
      if (resultObject.WindowSettings.wscale === 1) {
        resultObject.WindowSettings.wscale = 0;
      } else {
        resultObject.WindowSettings.wscale *= 1000;
      }

      // Update content header flags with current configuration
      T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
        T3Gv.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_ShowGrid,
        T3Gv.docUtil.docConfig.showGrid
      );

      T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
        T3Gv.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_ShowRulers,
        T3Gv.docUtil.docConfig.showRulers
      );

      T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
        T3Gv.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_SnapToGridC,
        T3Gv.docUtil.docConfig.centerSnap && T3Gv.docUtil.docConfig.enableSnap
      );

      T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
        T3Gv.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_SnapToGridTL,
        !T3Gv.docUtil.docConfig.centerSnap && T3Gv.docUtil.docConfig.enableSnap
      );

      T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
        T3Gv.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_ShowPageDividers,
        T3Gv.docUtil.docConfig.showPageDivider
      );

      T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
        T3Gv.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_SnapToShapes_Off,
        T3Gv.docUtil.docConfig.snapToShapes == 0
      );

      T3Gv.optManager.theContentHeader.flags = Utils2.SetFlag(
        T3Gv.optManager.theContentHeader.flags,
        ConstantData.ContentHeaderFlags.CT_ShowRulers,
        T3Gv.docUtil.docConfig.showRulers
      );

      // Configure ruler settings
      resultObject.rulerConfig = T3Gv.docUtil.rulerConfig;
      resultObject.rulerConfig.show = T3Gv.docUtil.docConfig.showRulers;

      // Start counting blocks with header
      let blockCount = 1;
      let blockIndex = 0;
      let serializedBlock;

      // Process objects from next state if delta is negative (undoing changes)
      if (deltaState < 0 && stateId + 1 < T3Gv.stateManager.States.length) {
        const nextStateObjects = T3Gv.stateManager.States[stateId + 1].StoredObjects;
        const nextStateObjectCount = nextStateObjects.length;

        for (let objIndex = 0; objIndex < nextStateObjectCount; objIndex++) {
          const currentObject = nextStateObjects[objIndex];

          // Handle created objects in the next state
          if (currentObject.StateOperationTypeID === Globals.StateOperationType.CREATE) {
            if (SDF.GetBlockName(currentObject, true)) {
              blockCount++;
            }
          }
          // Handle deleted objects in the next state
          else if (currentObject.StateOperationTypeID === Globals.StateOperationType.DELETE) {
            if (SDF.GetBlockName(currentObject, true)) {
              if (SDF.BuildObjectBlock(currentObject, resultObject, true, 0)) {
                blockCount++;
                deletedObjectIds.push(currentObject.ID);
              }
            }
          }
          // Handle modified objects
          else {
            let foundInCurrentState = false;

            // Check if this object exists in the current state
            for (let currentStateIndex = 0; currentStateIndex < objectCount; currentStateIndex++) {
              if (stateObjects[currentStateIndex].ID === currentObject.ID) {
                foundInCurrentState = true;
                break;
              }
            }

            // If not in current state, count it
            if (!foundInCurrentState) {
              if (SDF.BuildObjectBlock(currentObject, resultObject, true, 0)) {
                blockCount++;
              }
            }
          }
        }
      }

      // Process objects from the current state
      const objectsToProcess = customStoredObjects || stateObjects;
      const processCount = objectsToProcess.length;

      for (let objIndex = 0; objIndex < processCount; objIndex++) {
        const currentObject = objectsToProcess[objIndex];

        // Handle deleted objects
        if (currentObject.StateOperationTypeID === Globals.StateOperationType.DELETE) {
          if (SDF.GetBlockName(currentObject, true)) {
            blockCount++;
          }
        }
        // Handle other objects not already processed
        else if (deletedObjectIds.indexOf(currentObject.ID) === -1) {
          if (SDF.BuildObjectBlock(currentObject, resultObject, true, 0)) {
            blockCount++;
          }
        }
      }

      // Set block count and operation properties
      resultObject.nblocks = blockCount;
      resultObject.BlockAction = SDF.BlockActions.Normal;
      resultObject.state = targetStateId + T3Gv.stateManager.DroppedStates;

      // Adjust delta state
      if (deltaState === 1) {
        deltaState = 0;
      }
      resultObject.delta = deltaState;

      // Reset deleted object tracking
      deletedObjectIds.length = 0;

      // Testing exception hook
      if (T3Gv.gTestException) {
        const error = new Error(Resources.Strings.Error_InComplete);
        error.name = '1';
        throw error;
      }

      // Write header block
      serializedBlock = SDF.WriteHeaderBlock(resultObject, blockIndex, SDF.HeaderFilters);
      blockIndex++;

      // Process objects from the next state if working with negative delta
      if (deltaState < 0 && stateId + 1 < T3Gv.stateManager.States.length) {
        const nextStateObjects = T3Gv.stateManager.States[stateId + 1].StoredObjects;
        const nextStateObjectCount = nextStateObjects.length;

        for (let objIndex = 0; objIndex < nextStateObjectCount; objIndex++) {
          const currentObject = nextStateObjects[objIndex];

          // Handle created objects in next state - mark for deletion
          if (currentObject.StateOperationTypeID === Globals.StateOperationType.CREATE) {
            if (SDF.GetBlockName(currentObject, true, blockMetadata)) {
              serializedBlock = SDF.WriteActionBlock(
                resultObject,
                blockMetadata.type,
                blockMetadata.id,
                SDF.BlockActions.Delete,
                blockIndex
              );
              blockIndex++;
            }
          }
          // Handle deleted objects in next state
          else if (currentObject.StateOperationTypeID === Globals.StateOperationType.DELETE) {
            const objectInstance = T3Gv.objectStore.GetObject(currentObject.ID);
            serializedBlock = SDF.BuildObjectBlock(objectInstance, resultObject, false, blockIndex);
            // Increment handled in BuildObjectBlock
          }
          // Handle modified objects
          else {
            let foundInCurrentState = false;

            // Check if object exists in current state
            for (let currentStateIndex = 0; currentStateIndex < objectCount; currentStateIndex++) {
              if (stateObjects[currentStateIndex].ID === currentObject.ID) {
                foundInCurrentState = true;
                break;
              }
            }

            // If not in current state, build object block
            if (!foundInCurrentState) {
              const objectInstance = T3Gv.objectStore.GetObject(currentObject.ID);
              serializedBlock = SDF.BuildObjectBlock(objectInstance, resultObject, false, blockIndex);
              // Increment handled in BuildObjectBlock
            }
          }
        }
      }

      // Process objects from the current state
      for (let objIndex = 0; objIndex < processCount; objIndex++) {
        const currentObject = objectsToProcess[objIndex];

        // Handle deleted objects
        if (currentObject.StateOperationTypeID === Globals.StateOperationType.DELETE) {
          if (SDF.GetBlockName(currentObject, true, blockMetadata)) {
            serializedBlock = SDF.WriteActionBlock(
              resultObject,
              blockMetadata.type,
              blockMetadata.id,
              SDF.BlockActions.Delete,
              blockIndex
            );
            blockIndex++;
          }
        }
        // Handle other objects not already processed
        else if (deletedObjectIds.indexOf(currentObject.ID) === -1) {
          serializedBlock = SDF.BuildObjectBlock(currentObject, resultObject, false, blockIndex);
          // Increment handled in BuildObjectBlock
        }
      }
    } catch (error) {
      T3Gv.optManager.Export_ExceptionCleanup(error);
    }
  }

  /**
   * Writes a block header to a data stream in SDF format
   *
   * This function writes block wrapper information to the data stream that identifies
   * and describes the block structure. It includes state information, block type,
   * identification, indexing, and action flags that determine how the block
   * should be processed when loaded.
   *
   * @param dataStream - The data stream to write block header information to
   * @param stateId - The state identifier for document history tracking
   * @param delta - The state delta value (change increment)
   * @param blockType - The type of block being written
   * @param blockId - The identifier for this specific block
   * @param blockIndex - The index of this block in the sequence
   * @param totalBlocks - The total number of blocks in the document
   * @param actionType - The action to perform with this block (create, delete, etc.)
   */
  static WriteBlockWrapper(dataStream, stateId, delta, blockType, blockId, blockIndex, totalBlocks, actionType) {
    const blockHeader = new SDF.BlockHeader(stateId, delta, blockType, blockId, blockIndex, totalBlocks);
    blockHeader.action = actionType;
    dataStream.writeStruct(FileParser.BLOCK_HEADER_Struct, blockHeader);
  }

  /**
   * Creates an action block for command operations in SDF format
   *
   * This function creates a standalone block that represents a command or action
   * to be performed when the document is loaded. These blocks can trigger operations
   * like page changes, document operations, or state transitions without containing
   * actual document content.
   *
   * @param resultObject - Object containing state information and context
   * @param blockType - The type of action block to create
   * @param blockId - The identifier for this specific action block
   * @param actionType - The specific action to perform
   * @param blockIndex - The index of this block in the sequence
   * @returns A buffer containing the serialized action block
   */
  static WriteActionBlock(resultObject, blockType, blockId, actionType, blockIndex) {
    const buffer = new ArrayBuffer(10);
    const dataStream = new T3DataStream(buffer);
    dataStream.endianness = T3DataStream.LITTLE_ENDIAN;

    SDF.WriteBlockWrapper(
      dataStream,
      resultObject.state,
      resultObject.delta,
      blockType,
      blockId,
      blockIndex,
      resultObject.nblocks,
      actionType
    );

    return new Uint8Array(dataStream.buffer);
  }

  /**
   * Writes the session data properties block to the SDF format
   *
   * This function serializes the core document session data (SDP) including drawing properties,
   * styles, background settings, textures, rulers, and recent items. The SDP block contains
   * fundamental document configuration that applies to the entire file.
   *
   * @param resultObject - Object containing session data and document context
   * @param blockIndex - The index of this block in the document sequence
   * @returns A buffer containing the serialized session data properties
   */
  static WriteSDPBlock(resultObject, blockIndex) {
    const buffer = new ArrayBuffer(10);
    const dataStream = new T3DataStream(buffer);
    dataStream.endianness = T3DataStream.LITTLE_ENDIAN;

    // Write block header
    SDF.WriteBlockWrapper(
      dataStream,
      resultObject.state,
      resultObject.delta,
      SDF.BlockIDs.sdp,
      0,
      blockIndex,
      resultObject.nblocks,
      resultObject.BlockAction
    );

    // Write drawing structure
    SDF.write_SDF_C_DRAW12(dataStream, resultObject);

    // Write style information
    SDF.WriteStyle(dataStream, resultObject.sdp.def.style, true, resultObject, null);

    // Write line properties
    SDF.WriteSDLine(
      dataStream,
      resultObject.sdp.def.style.Line,
      resultObject,
      FileParser.SDROpCodesByName.SDF_C_BEGIN_LINE,
      null
    );

    // Write background fill if not transparent
    if (resultObject.sdp.background.Paint.FillType !== ConstantData.FillTypes.SDFILL_TRANSPARENT) {
      SDF.WriteSDFill(dataStream, resultObject.sdp.background, resultObject);
    }

    // Write custom textures (non-standard ones)
    const textureCount = T3Gv.optManager.TextureList.Textures.length;
    const standardTextureCount = T3Gv.optManager.NStdTextures;

    if (textureCount > standardTextureCount) {
      for (let textureIndex = standardTextureCount; textureIndex < textureCount; textureIndex++) {
        resultObject.TextureList.push(textureIndex);
      }
      SDF.WriteTextureList(dataStream, T3Gv.optManager.TextureList, resultObject);
    }

    // Write rulers and recent items
    SDF.WriteRulers(dataStream, resultObject);
    SDF.WriteRecentList(dataStream, resultObject);

    return new Uint8Array(dataStream.buffer);
  }

  /**
   * Writes a drawing object to a block in SDF format
   *
   * This function serializes a drawing object to an SDF block structure,
   * writing all properties, styles, and relationships to the block. The object
   * is identified by its unique block ID and properly wrapped with block header
   * information for storage or transmission.
   *
   * @param drawingObject - The drawing object to serialize
   * @param resultObject - Object containing context information and serialization settings
   * @param blockIndex - The index of this block in the sequence
   * @returns A buffer containing the serialized drawing object block
   */
  static WriteOBJBlock(drawingObject, resultObject, blockIndex) {
    // Create a buffer and data stream for serialization
    const buffer = new ArrayBuffer(10);
    const dataStream = new T3DataStream(buffer);
    dataStream.endianness = T3DataStream.LITTLE_ENDIAN;

    // Reset style index to force full style serialization
    drawingObject.tstyleindex = -1;

    // Write the block header with document state information
    SDF.WriteBlockWrapper(
      dataStream,
      resultObject.state,
      resultObject.delta,
      SDF.BlockIDs.LMObject,
      drawingObject.BlockID,
      blockIndex,
      resultObject.nblocks,
      resultObject.BlockAction
    );

    // Write the object content to the block
    SDF.WriteObject(dataStream, 0, drawingObject, resultObject);

    // Return the serialized block data
    return new Uint8Array(dataStream.buffer);
  }

  /**
   * Writes link information to a block in SDF format
   *
   * This function serializes connection links between objects into an SDF block structure.
   * Links define relationships between objects in the drawing, such as connector
   * attachments and object associations. The block includes proper header information
   * for identification during loading.
   *
   * @param linksObject - The links data object containing connection information
   * @param resultObject - Object containing context information and serialization settings
   * @param blockIndex - The index of this block in the sequence
   * @returns A buffer containing the serialized links block
   */
  static WriteLinksBlock(linksObject, resultObject, blockIndex) {
    // Create a buffer and data stream for serialization
    const buffer = new ArrayBuffer(10);
    const dataStream = new T3DataStream(buffer);
    dataStream.endianness = T3DataStream.LITTLE_ENDIAN;

    // Store links in the result object for access during serialization
    resultObject.links = linksObject;

    // Write the block header with document state information
    SDF.WriteBlockWrapper(
      dataStream,
      resultObject.state,
      resultObject.delta,
      SDF.BlockIDs.Links,
      0,
      blockIndex,
      resultObject.nblocks,
      resultObject.BlockAction
    );

    // Write the links content to the block
    SDF.WriteLinks(dataStream, resultObject);

    // Return the serialized block data
    return new Uint8Array(dataStream.buffer);
  }

  /**
   * Writes layer information to a block in SDF format
   *
   * This function serializes layer definitions into an SDF block structure.
   * Layers organize drawing objects into manageable groups with visibility
   * and selection properties. The block includes layer names, flags, relationships,
   * and proper header information for identification during loading.
   *
   * @param layerManagerObject - The layer manager object containing layer definitions
   * @param resultObject - Object containing context information and serialization settings
   * @param blockIndex - The index of this block in the sequence
   * @returns A buffer containing the serialized layers block
   */
  static WriteLayersBlock(layerManagerObject, resultObject, blockIndex) {
    // Create a buffer and data stream for serialization
    const buffer = new ArrayBuffer(10);
    const dataStream = new T3DataStream(buffer);
    dataStream.endianness = T3DataStream.LITTLE_ENDIAN;

    // Store layer manager in the result object for access during serialization
    resultObject.tLMB = layerManagerObject;

    // Write the block header with document state information
    SDF.WriteBlockWrapper(
      dataStream,
      resultObject.state,
      resultObject.delta,
      SDF.BlockIDs.Layers,
      0,
      blockIndex,
      resultObject.nblocks,
      resultObject.BlockAction
    );

    // Write the layers content to the block
    SDF.WriteLayers(dataStream, resultObject);

    // Return the serialized block data
    return new Uint8Array(dataStream.buffer);
  }

  /**
   * Writes a native object to a block in SDF format
   *
   * This function serializes a native object (platform-specific data) into an SDF block
   * structure. Native objects contain binary data that may be specific to particular
   * platforms or applications. The block includes header information and the native
   * binary content, properly formatted for storage and later retrieval.
   *
   * @param nativeObject - The native object to serialize
   * @param opCode - The operation code indicating the native block type
   * @param resultObject - Object containing context information and serialization settings
   * @param blockIndex - The index of this block in the sequence
   * @returns A buffer containing the serialized native object block
   */
  static WriteNativeBlock(nativeObject, opCode, resultObject, blockIndex) {
    // Create a buffer and data stream for serialization
    const buffer = new ArrayBuffer(10);
    const dataStream = new T3DataStream(buffer);
    dataStream.endianness = T3DataStream.LITTLE_ENDIAN;

    // Write the block header with document state information
    SDF.WriteBlockWrapper(
      dataStream,
      resultObject.state,
      resultObject.delta,
      SDF.BlockIDs.Native,
      nativeObject.ID,
      blockIndex,
      resultObject.nblocks,
      resultObject.BlockAction
    );

    // Write operation code for this native block type
    const codeOffset = SDF.Write_CODE(dataStream, opCode);

    // Write native object ID
    const idData = {
      value: nativeObject.ID
    };
    dataStream.writeStruct(FileParser.LONGVALUE_Struct, idData);

    // Write native binary data to the block
    FileParser.write_nativebytearray(dataStream, nativeObject.Data);

    // Finalize the block
    SDF.Write_LENGTH(dataStream, codeOffset);

    // Return the serialized block data
    return new Uint8Array(dataStream.buffer);
  }

  /**
   * Writes the document header information to an SDF format block
   *
   * This function serializes the document header information into a structured SDF block.
   * It includes document metadata, view settings, and configuration information needed
   * when the document is loaded. The function can create either standard headers (Header)
   * or specialized headers (Header2) with filtered information.
   *
   * @param resultObject - The object containing document properties and serialization context
   * @param blockIndex - The index of this block in the document block sequence
   * @param headerFilters - Optional array of codes to filter from the header (for Header2)
   * @returns A Uint8Array containing the serialized header block
   */
  static WriteHeaderBlock(resultObject, blockIndex, headerFilters) {
    const buffer = new ArrayBuffer(10);
    const dataStream = new T3DataStream(buffer);
    dataStream.endianness = T3DataStream.LITTLE_ENDIAN;

    // Decide whether to write a standard header or a specialized Header2
    if (headerFilters == null) {
      // Write a standard header block
      SDF.WriteBlockWrapper(
        dataStream,
        resultObject.state,
        resultObject.delta,
        SDF.BlockIDs.Header,
        0,
        blockIndex,
        resultObject.nblocks,
        resultObject.BlockAction
      );
    } else {
      // Write a specialized Header2 block with filtered information
      SDF.WriteBlockWrapper(
        dataStream,
        resultObject.state,
        resultObject.delta,
        SDF.BlockIDs.Header2,
        SDF.Header2Count++,
        blockIndex,
        resultObject.nblocks,
        resultObject.BlockAction
      );
    }

    // Write the actual header content
    SDF.WriteHeader(dataStream, resultObject, headerFilters);

    // Reset the header filters for subsequent operations
    SDF.HeaderFilters = [];

    // Return the serialized header block
    return new Uint8Array(dataStream.buffer);
  }

}

export default SDF
