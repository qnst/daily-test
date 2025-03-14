

import GlobalData from '../../Data/T3Gv'
import Utils1 from '../../Helper/Utils1'
import Utils2 from '../../Helper/Utils2'
import Utils4 from '../../Helper/Utils4'
import ListManager from '../../Data/ListManager'
import Resources from '../../Data/Resources'
import Line from '../../Shape/S.Line'
import Rect from '../../Shape/S.Rect'
import $ from 'jquery'
import Polygon from '../../Shape/S.Polygon'
import Commands from './ToolOpt'
import RRect from '../../Shape/S.RRect'
import Oval from '../../Shape/S.Oval'
import Clipboard from './Clipboard'
import ConstantData from '../../Data/ConstantData'
import PolySeg from '../../Model/PolySeg'
import ConstantData2 from '../../Data/ConstantData2'
import SVGFragmentSymbol from '../../Shape/S.SVGFragmentSymbol'
import QuickStyle from '../../Model/QuickStyle'
import Instance from '../../Data/Instance/Instance'
import PolyList from '../../Model/PolyList'
import DataOpt from '../../Data/DataOpt'
import ToolConstant from './ToolConstant'

class ToolUtil {

  /**
   * Sets the current selection tool and manages related states
   * @param toolType - The type of selection tool to set
   * @param isSticky - Whether the tool should be sticky
   */
  SetSelectionTool(toolType, isSticky) {
    console.log('O.ActiveSelection.SetSelectionTool - Input:', { toolType, isSticky });

    // Initial render of all SVG selection states
    T3Gv.optManager.RenderAllSVGSelectionStates();

    /*
    // Check if we're currently using the wall tool
    const isCurrentlyWallTool = ConstantData.DocumentContext.SelectionTool === Resources.Tools.Tool_Wall;

    // Update context with new tool settings
    ConstantData.DocumentContext.SelectionTool = toolType;
    ConstantData.DocumentContext.SelectionToolSticky = isSticky;
    ConstantData.DocumentContext.SelectionToolMultiple = false;

    // Additional handling for wall tool transitions
    if (toolType !== Resources.Tools.Tool_Wall) {
      ConstantData.DocumentContext.UsingWallTool = false;

      // If we were previously using the wall tool, re-render all states
      if (isCurrentlyWallTool) {
        T3Gv.optManager.RenderAllSVGSelectionStates();
      }
    }

    console.log('O.ActiveSelection.SetSelectionTool - Output:', {
      updatedTool: ConstantData.DocumentContext.SelectionTool,
      isSticky: ConstantData.DocumentContext.SelectionToolSticky,
      usingWallTool: ConstantData.DocumentContext.UsingWallTool
    });
    */
  }

  /**
   * Cancels the current modal operation
   * @param skipMessageHandling - If true, skips handling of collaboration messages
   * @returns false to indicate operation was cancelled
   */
  CancelModalOperation = function (skipMessageHandling?) {
    console.log("O.ToolOpt CancelModalOperation input:", skipMessageHandling);

    // Commands.MainController.Selection.SetSelectionTool(Resources.Tools.Tool_Select, false);
    this.SetSelectionTool(ToolConstant.Tools.Tool_Select, false);
    T3Gv.optManager.CancelModalOperation();

    if (!skipMessageHandling) {
      // Collab.UnLockMessages();
      // Collab.UnBlockMessages();
    }

    console.log("O.ToolOpt CancelModalOperation output: false");
    return false;
  }

  /**
   * Sets the default wall thickness for the document
   * @param thickness - The wall thickness value
   * @param wallObj - Optional wall object containing thickness data
   * @returns void
   */
  SetDefaultWallThickness = function (thickness, wallObj) {
    console.log("O.ToolOpt SetDefaultWallThickness input:", thickness, wallObj);

    var conversionFactor = 1;
    if (!T3Gv.docHandler.rulerSettings.useInches) {
      conversionFactor = ConstantData.Defines.MetricConv;
    }

    if (wallObj) {
      thickness = wallObj.Data.thick;
    }

    var wallThickness = thickness * T3Gv.docHandler.rulerSettings.major /
      (T3Gv.docHandler.rulerSettings.majorScale * conversionFactor);

    var sessionBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, false);

    if (!Utils2.IsEqual(sessionBlock.def.wallThickness, wallThickness, 0.01) || wallObj) {
      T3Gv.optManager.CloseEdit(true, true);
      sessionBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, true);

      if (!wallObj) {
        sessionBlock.def.wallThickness = wallThickness;
      }

      var sessionBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, false);
      T3Gv.optManager.CompleteOperation(null);
    }

    console.log("O.ToolOpt SetDefaultWallThickness output: void");
  }

  /**
   * Creates a new wall shape in the drawing
   * @param event - The drawing event
   * @param target - Target position or context
   * @returns The created wall object if isTargetValid is true
   */
  DrawNewWallShape = function (event, target) {
    console.log("O.ToolOpt DrawNewWallShape input:", event, target);

    var wallObject;
    var isTargetValid = target != null;
    var businessManager = null;

    if (businessManager == null) {
      businessManager = T3Gv.gBusinessManager;
    }

    if (businessManager && businessManager.AddWall) {
      T3Gv.optManager.CloseEdit();
      businessManager.ToggleAddingWalls(true);
      wallObject = businessManager.AddWall(isTargetValid, target);
      // ConstantData.DocumentContext.UsingWallTool = true;
    }

    if (isTargetValid) {
      console.log("O.ToolOpt DrawNewWallShape output:", wallObject);
      return wallObject;
    }
    console.log("O.ToolOpt DrawNewWallShape output: undefined");
  }

  /**
   * Prepares and initiates the stamping or drag-dropping of a new shape
   * @param uiAdaptationFlag - Flag to control UI adaptation
   * @param shapeType - The type of shape to stamp or drag-drop
   * @returns void
   */
  StampOrDragDropNewShape1(uiAdaptationFlag, shapeType) {
    console.log("O.ToolOpt StampOrDragDropNewShape input:", uiAdaptationFlag, shapeType);

    var callback;
    var thisReference;

    // Set UI adaptation based on the flag
    T3Gv.optManager.SetUIAdaptation(uiAdaptationFlag);

    // Initialize drag-drop or stamp operation
    T3Gv.optManager.PreDragDropOrStamp();

    // Store reference to this context and callback
    thisReference = this;
    callback = this.StampOrDragDropCallback;

    // Set timeout to trigger the callback after 200ms
    T3Gv.optManager.stampTimeout = window.setTimeout(callback, 200, thisReference, shapeType);

    console.log("O.ToolOpt StampOrDragDropNewShape output: void");
  }



  StampOrDragDropNewShape = function (t, a) {
    console.log('StampOrDragDropNewShape', t, a);

    var r, i;
    T3Gv.optManager.SetUIAdaptation(t);
    var e = false;
    T3Gv.optManager.PreDragDropOrStamp();
    r = this;
    i = this.StampOrDragDropCallback;
    T3Gv.optManager.stampTimeout = window.setTimeout(i, 200, r, a);


  }

  /**
   * Creates and draws a new line shape based on the specified type
   * @param lineType - The type of line to draw
   * @param targetPosition - The target position or context
   * @param eventObject - The event object for drawing
   * @param referenceObject - Reference object for line properties
   * @returns The created line shape object if in drawing mode
   */
  DrawNewLineShape = function (lineType, targetPosition, eventObject, referenceObject?) {
    console.log("O.ToolOpt DrawNewLineShape input:", lineType, targetPosition, eventObject, referenceObject);

    let isDrawing = false;
    let newShape = null;

    // Force line type to 'line'
    lineType = "line";

    switch (lineType) {
      case 'line':
        newShape = this.DrawNewLine(eventObject, 0, isDrawing, referenceObject);
        break;
      case 'commline':
        newShape = this.DrawNewLine(eventObject, 1, isDrawing, referenceObject);
        break;
      case 'digiline':
        newShape = this.DrawNewLine(eventObject, 2, isDrawing, referenceObject);
        break;
      case 'arcLine':
        newShape = this.DrawNewArcLine(isDrawing, eventObject, referenceObject);
        break;
      case 'segLine':
        newShape = this.DrawNewSegLine(isDrawing, eventObject, referenceObject);
        break;
      case 'arcSegLine':
        newShape = this.DrawNewArcSegLine(isDrawing, eventObject, referenceObject);
        break;
      case 'polyLine':
        newShape = this.DrawNewPolyLine(isDrawing, eventObject, referenceObject);
        break;
      case 'polyLineContainer':
        newShape = this.DrawNewPolyLineContainer(isDrawing, eventObject, referenceObject);
        break;
      case 'freehandLine':
        newShape = this.DrawNewFreehandLine(isDrawing, eventObject, referenceObject);
        break;
      case 'moveWall':
        if (T3Gv.gBusinessManager && T3Gv.gBusinessManager.AddWall) {
          newShape = T3Gv.gBusinessManager.AddWall(isDrawing, referenceObject);
        } else {
          newShape = this.DrawNewLine(eventObject, 0, isDrawing, referenceObject);
        }
        break;
    }

    console.log("O.ToolOpt DrawNewLineShape output:", newShape);

    if (isDrawing) {
      return newShape;
    }
  }

  /**
   * Creates and draws a new line based on specified parameters
   * @param event - The drawing event
   * @param lineType - The type of line to create (regular, communication, digital)
   * @param isDrawing - Whether in drawing mode
   * @param referenceObject - Optional reference object to copy properties from
   * @returns The created line object if in drawing mode
   */
  DrawNewLine = function (event, lineType, isDrawing, referenceObject) {
    console.log("O.ToolOpt DrawNewLine input:", event, lineType, isDrawing, referenceObject);

    const sessionData = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data;
    const isVerticalText = 0 == (sessionData.def.textflags & ConstantData.TextFlags.SED_TF_HorizText);
    let startArrowID = sessionData.d_sarrow;
    let endArrowID = sessionData.d_earrow;
    let startArrowDisplay = sessionData.d_sarrowdisp;
    let endArrowDisplay = sessionData.d_earrowdisp;
    let shapeParameter = 0;

    // Set shape parameter based on line type
    switch (lineType) {
      case ConstantData2.LineTypes.SED_LS_Comm:
      case ConstantData2.LineTypes.SED_LS_Digi:
        shapeParameter = 0.25;
        break;
    }

    // Make arrow settings consistent
    if ((startArrowID > 0) != (endArrowID > 0)) {
      if (endArrowID === 0) {
        endArrowID = startArrowID;
        endArrowDisplay = startArrowDisplay;
      }
      startArrowID = 0;
      startArrowDisplay = false;
    }

    // Create line attributes
    let lineAttributes;
    if (referenceObject) {
      lineAttributes = Utils1.DeepCopy(referenceObject.Data.attributes);
    } else {
      lineAttributes = {
        Frame: {
          x: 0,
          y: 0,
          width: 1,
          height: 1
        },
        StartPoint: {
          x: 0,
          y: 0
        },
        EndPoint: {
          x: 0,
          y: 0
        },
        StartArrowID: startArrowID,
        StartArrowDisp: startArrowDisplay,
        EndArrowID: endArrowID,
        EndArrowDisp: endArrowDisplay,
        ArrowSizeIndex: sessionData.d_arrowsize,
        TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
        TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
        TextDirection: isVerticalText,
        Dimensions: sessionData.dimensions,
        ShortRef: lineType,
        shapeparam: shapeParameter,
        bOverrideDefaultStyleOnDraw: true
      };
    }

    // Create the line shape
    const lineShape = new Line(lineAttributes);
    let lineStyle = Utils1.DeepCopy(sessionData.def.style);

    // Set style from reference object or defaults
    if (referenceObject && referenceObject.Data &&
      referenceObject.Data.attributes && referenceObject.Data.attributes.StyleRecord) {
      lineStyle = Utils1.DeepCopy(referenceObject.Data.attributes.StyleRecord);
    } else {
      const textBlockStyle = Utils4.FindStyle(ConstantData.Defines.TextBlockStyle);
      lineStyle.Text.Paint.Color = '#000000';
    }

    lineShape.StyleRecord = lineStyle;

    // Set line hopping if allowed
    if (sessionData.flags & ConstantData.SessionFlags.SEDS_AllowHops) {
      lineShape.flags = Utils2.SetFlag(lineShape.flags, ConstantData.ObjFlags.SEDO_LineHop, true);
    }

    // Return shape if in drawing mode, otherwise draw it
    if (isDrawing) {
      console.log("O.ToolOpt DrawNewLine output:", lineShape);
      return lineShape;
    }

    T3Gv.optManager.DrawNewObject(lineShape, event);
    console.log("O.ToolOpt DrawNewLine output: void");
  }

  /**
   * Callback function that processes shape stamping or drag-drop operations
   * @param context - The context object (typically 'this' reference)
   * @param shapeType - The type of shape to stamp or drag-drop
   * @returns void
   */
  StampOrDragDropCallback1 = function (context, shapeType) {
    console.log("O.ToolOpt StampOrDragDropCallback input:", context, shapeType);

    var result;
    var shapeTypes = ConstantData.SDRShapeTypes;

    T3Gv.optManager.stampTimeout = null;

    if (shapeType !== 'textLabel') {
      // ConstantData.DocumentContext.ShapeTool = shapeType;
    }

    var isDragDropMode = false;

    if (isDragDropMode) {
      result = false;
      T3Gv.optManager.UnbindDragDropOrStamp();
    } else {
      result = true;
    }

    switch (shapeType) {
      case 'textLabel':
        context.StampTextLabel(false, false);
        break;
      case shapeTypes.SED_S_Rect:
        context.StampRectangle(result, false);
        break;
      case shapeTypes.SED_S_RRect:
        context.StampRoundRect(result, false);
        break;
      case shapeTypes.SED_S_Circ:
        context.StampCircle(result, true);
        break;
      case shapeTypes.SED_S_Oval:
        context.StampCircle(result, false);
        break;
      default:
        context.StampShape(shapeType, result, false);
    }

    console.log("O.ToolOpt StampOrDragDropCallback output: void");
  }

  StampOrDragDropCallback = function (t, a) {
    console.log('StampOrDragDropCallback 1 t=', t);
    console.log('StampOrDragDropCallback 2 a=', a);
    //debugger
    var r;
    var i = ConstantData.SDRShapeTypes;

    T3Gv.optManager.stampTimeout = null;
    // SDUI.Commands.MainController.Dropdowns.HideAllDropdowns(),
    if (a !== 'textLabel') {
      ConstantData.DocumentContext.ShapeTool = a;
    }

    //Double ===
    var e = false;

    if (e) {
      r = false;
      T3Gv.optManager.UnbindDragDropOrStamp();
    } else {
      r = true;
    }

    switch (a) {
      case 'textLabel':
        t.StampTextLabel(false, false);
        break;
      case i.SED_S_Rect:
        t.StampRectangle(r, false);
        break;
      case i.SED_S_RRect:
        t.StampRoundRect(r, false);
        break;
      case i.SED_S_Circ:
        t.StampCircle(r, true);
        break;
      case i.SED_S_Oval:
        t.StampCircle(r, false);
        break;
      default:
        t.StampShape(a, r, false);
    }
  }

  /**
   * Creates and stamps a rectangle shape onto the drawing
   * @param isDragDropMode - Whether to use drag-drop mode or mouse stamp mode
   * @param isSquare - Whether to create a square (true) or rectangle (false)
   * @returns void
   */
  StampRectangle = function (isDragDropMode, isSquare) {
    console.log("O.ToolOpt StampRectangle input:", isDragDropMode, isSquare);

    let width, height;
    const sessionBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, false);

    // Set dimensions based on whether we want a square or rectangle
    if (isSquare) {
      width = ConstantData.Defines.Shape_Square;
      height = ConstantData.Defines.Shape_Square;
    } else {
      width = ConstantData.Defines.Shape_Width;
      height = ConstantData.Defines.Shape_Height;
    }

    // Create shape attributes
    const shapeAttributes = {
      Frame: {
        x: -1000,
        y: -1000,
        width: width,
        height: height
      },
      TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL,
      shapeparam: sessionBlock.def.rrectparam,
      moreflags: ConstantData.ObjMoreFlags.SED_MF_FixedRR,
      ObjGrow: ConstantData.GrowBehavior.ALL
    };

    // Add proportional growth behavior if it's a square
    if (isSquare) {
      shapeAttributes.ObjGrow = ConstantData.GrowBehavior.PROPORTIONAL;
    }

    // Create the rectangle shape
    const rectangleShape = new Rect(shapeAttributes);

    // Use mouse stamp method to place the shape
    T3Gv.optManager.MouseStampNewShape(rectangleShape, true, true, true, null, null);

    console.log("O.ToolOpt StampRectangle output: void");
  }

  /**
   * Creates and stamps a round rectangle shape onto the drawing
   * @param isDragDropMode - Whether to use drag-drop mode or mouse stamp mode
   * @param isSquare - Whether to create a square (true) or rectangle (false)
   * @returns void
   */
  StampRoundRect = function (isDragDropMode, isSquare) {
    console.log("O.ToolOpt StampRoundRect input:", isDragDropMode, isSquare);

    let width, height;
    const sessionBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, false);

    // Set dimensions based on whether we want a square or rectangle
    if (isSquare) {
      width = ConstantData.Defines.Shape_Square;
      height = ConstantData.Defines.Shape_Square;
    } else {
      width = ConstantData.Defines.Shape_Width;
      height = ConstantData.Defines.Shape_Height;
    }

    // Create shape attributes
    const shapeAttributes = {
      Frame: {
        x: -1000,
        y: -1000,
        width: width,
        height: height
      },
      TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL,
      shapeparam: sessionBlock.def.rrectparam,
      moreflags: ConstantData.ObjMoreFlags.SED_MF_FixedRR,
      ObjGrow: ConstantData.GrowBehavior.ALL
    };

    // Add proportional growth behavior if it's a square
    if (isSquare) {
      shapeAttributes.ObjGrow = ConstantData.GrowBehavior.PROPORTIONAL;
    }

    // Create the rounded rectangle shape
    const roundRectShape = new RRect(shapeAttributes);

    // Use mouse stamp method to place the shape
    T3Gv.optManager.MouseStampNewShape(roundRectShape, true, true, true, null, null);

    console.log("O.ToolOpt StampRoundRect output: void");
  }

  /**
   * Creates and stamps a circle or oval shape onto the drawing
   * @param isDragDropMode - Whether to use drag-drop mode or mouse stamp mode
   * @param isCircle - Whether to create a circle (true) or oval (false)
   * @returns void
   */
  StampCircle = function (isDragDropMode, isCircle) {
    console.log("O.ToolOpt StampCircle input:", isDragDropMode, isCircle);

    let width, height;

    // Set dimensions based on whether we want a circle or oval
    if (isCircle) {
      width = ConstantData.Defines.Shape_Square;
      height = ConstantData.Defines.Shape_Square;
    } else {
      width = ConstantData.Defines.Shape_Width;
      height = ConstantData.Defines.Shape_Height;
    }

    // Initial position off-screen
    const initialX = -1000;
    const initialY = -1000;
    let shapeAttributes = null;

    // Configure shape attributes
    if (isCircle) {
      shapeAttributes = {
        Frame: {
          x: initialX,
          y: initialY,
          width: 100,
          height: 100
        },
        TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL,
        ObjGrow: ConstantData.GrowBehavior.PROPORTIONAL
      };
    } else {
      shapeAttributes = {
        Frame: {
          x: initialX,
          y: initialY,
          width: width,
          height: height
        },
        TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL
      };
    }

    // Create the oval shape
    const ovalShape = new Oval(shapeAttributes);

    // Use mouse stamp method to place the shape
    T3Gv.optManager.MouseStampNewShape(ovalShape, true, true, true, null, null);

    console.log("O.ToolOpt StampCircle output: void");
  }

  /**
   * Creates and stamps a text label shape onto the drawing
   * @param isDragDropMode - Whether to use drag-drop mode
   * @param skipTargetCheck - Whether to skip target selection check
   * @returns void
   */
  StampTextLabel = function (isDragDropMode, skipTargetCheck) {
    console.log("O.ToolOpt StampTextLabel input:", isDragDropMode, skipTargetCheck);

    // Get the text edit session block
    var textEditSession = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.tedSessionBlockId, false);

    // Check if we need to handle existing active text editing
    if (skipTargetCheck || textEditSession.theActiveTextEditObjectID == -1) {
      // If not skipping target check, try to activate text edit on selected object
      if (!skipTargetCheck) {
        var targetID = T3Gv.optManager.GetTargetSelect();
        if (targetID >= 0) {
          var targetObject = T3Gv.optManager.GetObjectPtr(targetID, false);
          if (targetObject && targetObject.AllowTextEdit()) {
            var svgElement = T3Gv.optManager.svgObjectLayer.GetElementByID(targetID);
            T3Gv.optManager.ActivateTextEdit(svgElement);
            console.log("O.ToolOpt StampTextLabel output: void - activated edit on existing text");
            return;
          }
        }
      }
    } else {
      T3Gv.optManager.DeactivateTextEdit();
    }

    // Get session data and default text style
    var sessionData = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data;
    var defaultTextStyle = Utils4.FindStyle(ConstantData.Defines.TextBlockStyle);

    if (defaultTextStyle == null) {
      defaultTextStyle = sessionData.def.style;
    }

    // Create text shape attributes
    var textAttributes = {
      StyleRecord: $.extend(true, {}, defaultTextStyle),
      Frame: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      TMargins: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
      TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
      TextAlign: ConstantData.TextAlign.LEFT,
      flags: ConstantData.ObjFlags.SEDO_TextOnly
    };

    // Ensure Line style exists and set thickness to 0 (no border)
    if (textAttributes.StyleRecord.Line == null) {
      textAttributes.StyleRecord.Line = Utils1.DeepCopy(defaultTextStyle.Border);
    }
    textAttributes.StyleRecord.Line.Thickness = 0;

    // Create the text rectangle shape
    var textShape = new Rect(textAttributes);
    var textStyle = Utils1.DeepCopy(sessionData.def.style);
    textStyle.Text.Paint = Utils1.DeepCopy(defaultTextStyle.Text.Paint);
    textShape.StyleRecord.Text = textStyle.Text;

    // Calculate text metrics for proper sizing
    var initialTextStyle = T3Gv.optManager.CalcDefaultInitialTextStyle(textShape.StyleRecord.Text);
    var textMetrics = T3Gv.optManager.svgDoc.CalcStyleMetrics(initialTextStyle);

    // Set shape offset and height
    T3Gv.optManager.stampShapeOffsetX = 0;
    T3Gv.optManager.stampShapeOffsetY = textMetrics.ascent;
    textShape.Frame.height = textMetrics.height;

    // Deactivate text edit if not in drag-drop mode
    if (!isDragDropMode) {
      T3Gv.optManager.DeactivateTextEdit(false);
    }

    // Stamp the text shape and activate text editing
    T3Gv.optManager.StampNewTextShapeOnTap(
      textShape,
      false,
      false,
      false,
      isDragDropMode,
      this.StampCallback,
      { bActivateText: true }
    );

    console.log("O.ToolOpt StampTextLabel output: void");
  }

  /**
   * Creates and stamps a shape onto the drawing
   * @param shapeType - The type of shape to stamp
   * @param isDragDropMode - Whether to use drag-drop mode or mouse stamp mode
   * @returns void
   */
  StampShape = function (shapeType, isDragDropMode) {
    console.log("O.ToolOpt StampShape input:", shapeType, isDragDropMode);

    const shapeTypeConstants = ConstantData.SDRShapeTypes;

    // Initial frame positioned off-screen
    const initialFrame = {
      x: -1000,
      y: -1000,
      width: ConstantData.Defines.Shape_Width,
      height: ConstantData.Defines.Shape_Height
    };

    // Get shape parameters for the specific shape type
    const shapeParams = T3Gv.optManager.GetShapeParams(shapeType, initialFrame);
    console.log('O.ToolOpt StampShape shapeParams:', shapeParams);

    // Determine dimensions based on whether shape is square or not
    if (shapeParams.bIsSquare) {
      initialFrame.width = ConstantData.Defines.Shape_Square;
      initialFrame.height = ConstantData.Defines.Shape_Square;
    } else {
      initialFrame.width = ConstantData.Defines.Shape_Width;
      initialFrame.height = ConstantData.Defines.Shape_Height;
    }

    // Create attributes for the shape
    const shapeAttributes = {
      Frame: initialFrame,
      TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL,
      dataclass: shapeParams.dataclass,
      shapeparam: shapeParams.shapeparam,
      ObjGrow: ConstantData.GrowBehavior.ALL,
      VertexArray: null
    };

    // Add proportional growth attribute if it's a square
    if (shapeParams.bIsSquare) {
      shapeAttributes.ObjGrow = ConstantData.GrowBehavior.PROPORTIONAL;
    }

    // Create the appropriate shape object based on type
    let shapeObject;

    switch (shapeParams.dataclass) {
      case shapeTypeConstants.SED_S_Rect:
        shapeObject = new Rect(shapeAttributes);
        break;

      case shapeTypeConstants.SED_S_RRect:
        shapeObject = new RRect(shapeAttributes);
        break;

      case shapeTypeConstants.SED_S_Oval:
        shapeObject = new Oval(shapeAttributes);
        break;

      default:
        // For polygon shapes, get the vertices
        const vertices = shapeParams.polyVectorMethod(initialFrame, shapeParams.shapeparam);
        shapeAttributes.VertexArray = vertices;
        shapeObject = new Polygon(shapeAttributes);
        shapeObject.dataclass = shapeParams.dataclass;
    }

    // Use drag drop or mouse stamp to add the shape to the drawing
    if (isDragDropMode) {
      T3Gv.optManager.DragDropNewShape(shapeObject, true, true, true, null, null);
    } else {
      T3Gv.optManager.MouseStampNewShape(shapeObject, true, true, true, null, null);
    }

    console.log("O.ToolOpt StampShape output: void");
  }

  /**
   * Rotates the selected shapes by a specified angle
   * @param rotationAngle - The angle (in degrees) to rotate the selected shapes
   * @returns void
   */
  RotateShapes = function (rotationAngle) {
    console.log("O.ToolOpt RotateShapes input:", rotationAngle);

    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.RotateShapes(parseInt(rotationAngle, 10));
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }

    console.log("O.ToolOpt RotateShapes output: void");
  }

  /**
   * Aligns selected shapes based on the specified alignment type
   * @param alignmentType - The type of alignment to apply to selected shapes
   * @returns void
   */
  AlignShapes = function (alignmentType) {
    console.log("O.ToolOpt AlignShapes input:", alignmentType);

    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.AlignShapes(alignmentType);
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }

    console.log("O.ToolOpt AlignShapes output: void");
  }

  /**
   * Deletes the currently selected objects from the drawing
   * @returns void
   */
  DeleteSelectedObjects = function () {
    console.log("O.ToolOpt DeleteSelectedObjects input: no parameters");

    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.DeleteSelectedObjects();
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }

    console.log("O.ToolOpt DeleteSelectedObjects output: void");
  }

  /**
   * Undoes the last operation in the drawing
   * @returns void
   */
  Undo = function () {
    console.log("O.ToolOpt Undo input: no parameters");

    try {
      T3Gv.optManager.Undo();
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }

    console.log("O.ToolOpt Undo output: void");
  }

  /**
   * Redoes the last undone operation in the drawing
   * @returns void
   */
  Redo = function () {
    console.log("O.ToolOpt Redo input: no parameters");

    try {
      T3Gv.optManager.Redo();
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }

    console.log("O.ToolOpt Redo output: void");
  }

  /**
   * Copies the currently selected objects to the clipboard
   * @returns void
   */
  Copy = function () {
    console.log("O.ToolOpt Copy input: no parameters");

    try {
      let clipboardSuccess = false;

      try {
        clipboardSuccess = document.execCommand('copy');
      } catch (error) {
        throw error;
      }

      if (!clipboardSuccess) {
        T3Gv.optManager.CopyObjects();
      }
    } catch (error) {
      T3Gv.optManager.RestorePrimaryStateManager();
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }

    console.log("O.ToolOpt Copy output: void");
  }

  /**
   * Cuts the currently selected objects to the clipboard
   * @returns void
   */
  Cut = function () {
    console.log("O.ToolOpt Cut input: no parameters");

    try {
      let clipboardSuccess = false;

      try {
        clipboardSuccess = document.execCommand('cut');
      } catch (error) {
        throw error;
      }

      if (!clipboardSuccess) {
        T3Gv.optManager.CutObjects();
      }
    } catch (error) {
      T3Gv.optManager.RestorePrimaryStateManager();
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }

    console.log("O.ToolOpt Cut output: void");
  }

  /**
   * Pastes previously copied objects from the clipboard to the drawing
   * @param eventData - Optional event data containing paste position information
   * @returns void
   */
  Paste = function (eventData) {
    console.log("O.ToolOpt Paste input:", eventData);

    try {
      T3Gv.optManager.PastePoint = null;

      if (eventData && T3Gv.optManagerrightClickParams) {
        T3Gv.optManager.PastePoint = T3Gv.optManagerrightClickParams.HitPt;
      }

      Clipboard.PasteFromUIaction();
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }

    console.log("O.ToolOpt Paste output: void");
  }

  /**
   * Sends the selected objects to the back of the drawing order
   * @returns void
   */
  SendToBackOf = function () {
    console.log("O.ToolOpt SendToBackOf input: no parameters");

    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.SendToBackOf();
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }

    console.log("O.ToolOpt SendToBackOf output: void");
  }

  /**
   * Brings the selected objects to the front of the drawing order
   * @returns void
   */
  BringToFrontOf = function () {
    console.log("O.ToolOpt BringToFrontOf input: no parameters");

    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.BringToFrontOf();
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }

    console.log("O.ToolOpt BringToFrontOf output: void");
  }

  /**
   * Groups the currently selected shapes together
   * @returns void
   */
  GroupSelectedShapes = function () {
    console.log("O.ToolOpt GroupSelectedShapes input: no parameters");

    try {
      T3Gv.optManager.CloseEdit();
      // Parameters: autoAddShapes, additionalObjects, createOuterFrame, preserveOriginals, createVisualGroup
      T3Gv.optManager.GroupSelectedShapes(false, null, false, false, true);
    } catch (error) {
      throw error;
      T3Gv.optManager.ExceptionCleanup(error);
    }

    console.log("O.ToolOpt GroupSelectedShapes output: void");
  }

  /**
   * Ungroups the currently selected grouped shapes
   * @returns void
   */
  UngroupSelectedShapes = function () {
    console.log("O.ToolOpt UngroupSelectedShapes input: no parameters");

    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.UngroupSelectedShapes();
    } catch (error) {
      throw error;
      T3Gv.optManager.ExceptionCleanup(error);
    }

    console.log("O.ToolOpt UngroupSelectedShapes output: void");
  }

  /**
   * Flips the selected objects horizontally
   * @returns void
   */
  FlipHorizontal = function () {
    console.log("O.ToolOpt FlipHorizontal input: no parameters");

    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.FlipShapes(ConstantData.ExtraFlags.SEDE_FlipHoriz);
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }

    console.log("O.ToolOpt FlipHorizontal output: void");
  }

  /**
   * Flips the selected objects vertically
   * @returns void
   */
  FlipVertical = function () {
    console.log("O.ToolOpt FlipVertical input: no parameters");

    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.FlipShapes(ConstantData.ExtraFlags.SEDE_FlipVert);
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }

    console.log("O.ToolOpt FlipVertical output: void");
  }

  /**
   * Makes selected objects the same size according to specified dimension type
   * @param dimensionType - Integer specifying which dimension to make the same (width, height, or both)
   * @returns void
   */
  MakeSameSize = function (dimensionType) {
    console.log("O.ToolOpt MakeSameSize input:", dimensionType);

    try {
      T3Gv.optManager.CloseEdit();
      T3Gv.optManager.MakeSameSize(parseInt(dimensionType, 10));
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
    }

    console.log("O.ToolOpt MakeSameSize output: void");
  }

  /**
   * Gets the current selection context information
   * @returns Object containing information about the current selection state
   */
  GetSelectionContext = function () {
    console.log("O.ToolOpt GetSelectionContext input: no parameters");

    try {
      const context = T3Gv.optManager.GetSelectionContext();
      console.log("O.ToolOpt GetSelectionContext output:", context);
      return context;
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
    }
  }

  /**
   * Checks if text editing is currently active
   * @returns Boolean indicating whether text editing is active
   */
  IsActiveTextEdit = function () {
    console.log("O.ToolOpt IsActiveTextEdit input: no parameters");

    try {
      const textEditSession = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.tedSessionBlockId, false);
      const isActive = textEditSession.theActiveTextEditObjectID !== -1;

      console.log("O.ToolOpt IsActiveTextEdit output:", isActive);
      return isActive;
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      console.log("O.ToolOpt IsActiveTextEdit output: undefined (error)");
    }
  }

  /**
   * Handles keyboard key down events
   * @param keyEvent - The keyboard event object
   * @param targetElement - The DOM element target
   * @param eventModifier - Additional event modifiers
   * @returns Result of the key down handling operation
   */
  HandleKeyDown = function (keyEvent, targetElement, eventModifier) {
    console.log("O.ToolOpt HandleKeyDown input:", keyEvent, targetElement, eventModifier);

    try {
      const result = T3Gv.optManager.HandleKeyDown(keyEvent, targetElement, eventModifier);
      console.log("O.ToolOpt HandleKeyDown output:", result);
      return result;
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      console.log("O.ToolOpt HandleKeyDown output: undefined (error)");
    }
  }

  /**
   * Duplicates the currently selected objects
   * @returns void
   */
  Duplicate = function () {
    console.log("O.ToolOpt Duplicate input: no parameters");

    try {
      T3Gv.optManager.DuplicateObjects();
      console.log("O.ToolOpt Duplicate output: void");
    } catch (error) {
      T3Gv.optManager.RestorePrimaryStateManager();
      T3Gv.optManager.ExceptionCleanup(error);
      console.log("O.ToolOpt Duplicate output: void (error)");
    }
  }

  /**
   * Handles keyboard key press events
   * @param keyEvent - The keyboard event object
   * @param targetElement - The DOM element target
   * @returns Result of the key press handling operation
   */
  HandleKeyPress = function (keyEvent, targetElement) {
    console.log("O.ToolOpt HandleKeyPress input:", keyEvent, targetElement);

    try {
      const result = T3Gv.optManager.HandleKeyPress(keyEvent, targetElement);
      console.log("O.ToolOpt HandleKeyPress output:", result);
      return result;
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
      console.log("O.ToolOpt HandleKeyPress output: undefined (error)");
    }
  }

  SD_PreLoad_Symbol = function (e, t, a, r) {

    this.StampOrDragDropNewSymbol(e, t)
  }


  DragDropSymbol = function (r, i) {

    this.StampOrDragDropSymbolCallback(r, i)
  }

  StampOrDragDropSymbolCallback = function (r, i) {

    this.SD_PreLoad_Symbol(i, !0, r.StampOrDragDropNewSymbol, !0)
  }

  /**
   * Creates and handles stamping or drag-dropping of a new SVG symbol onto the drawing
   * @param symbolData - The symbol data or identifier
   * @param useDragDrop - Whether to use drag-drop mode (true) or stamp mode (false)
   * @returns void
   */
  StampOrDragDropNewSymbol = function (symbolData, useDragDrop) {
    console.log("O.ToolOpt StampOrDragDropNewSymbol input:", symbolData, useDragDrop);

    // Clear any previous replace symbol ID
    T3Gv.optManager.ReplaceSymbolID = null;

    // SVG fragment definitions
    const pumpSymbolSVG = '<g><g fill="##FILLCOLOR=#7F7F7F##" transform="translate(0,0)"><g class="pump"> <circle stroke="##LINECOLOR=#000000##" cy="16" cx="15.955" r="9.9609003" class="pump-background" /> <g transform="translate(16,16)"> <path d="M -5,8.1369 V -8.1191 L 9.078,0.0091 Z" class="rotating-middle" stroke="##LINECOLOR=#000000##" stroke-width="##LINETHICK=1##"/></g></g></g></g>';
    const heatPumpSymbolSVG = '<g class="heat-pump" stroke-linejoin="round" stroke="#000" transform="translate(39 -2.3842e-7)" fill="currentColor"> <rect class="inner" height="27.718" width="27.718" y="2.141" x="-36.859" stroke-width="1.0868"></rect> <g transform="matrix(1.0276 0 0 1.0276 -39.441 -.44130)" stroke-linecap="round" stroke-miterlimit="1" stroke-width="1.3509"> <path d="m16.234 16.944 8.6837-6.894-8.6837-6.894v3.447h-13.152v6.894h13.152z" fill="#ce2824"></path> <path d="m15.766 28.844-8.6837-6.894 8.6837-6.894v3.447h13.152v6.894h-13.152z" fill="#3238db"></path></g></g>';

    // Create a new SVG Fragment Symbol
    const symbolObject = new SVGFragmentSymbol(null);
    symbolObject.StyleRecord = new QuickStyle();

    // Use the heat pump SVG fragment
    symbolObject.SVGFragment = heatPumpSymbolSVG;

    // Add the symbol to the drawing using drag-drop mode
    if (symbolObject) {
      T3Gv.optManager.DragDropNewShape(symbolObject, true, true, false, null, null);
    }

    console.log("O.ToolOpt StampOrDragDropNewSymbol output: void");
  }

  /**
   * Creates and draws a new segmented line shape
   * @param isDrawing - Whether in drawing mode
   * @param eventObject - The event object for drawing
   * @param referenceObject - Reference object for line properties
   * @returns The created segmented line shape if in drawing mode
   */
  DrawNewSegLine = function (isDrawing, eventObject, referenceObject) {
    console.log("O.ToolOpt DrawNewSegLine input:", isDrawing, eventObject, referenceObject);

    let attributes;
    const sessionData = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data;
    const isVerticalText = 0 == (sessionData.def.textflags & ConstantData.TextFlags.SED_TF_HorizText);
    let startArrowID = sessionData.d_sarrow;
    let endArrowID = sessionData.d_earrow;
    let startArrowDisplay = sessionData.d_sarrowdisp;
    let endArrowDisplay = sessionData.d_earrowdisp;

    // Make arrow settings consistent
    if ((startArrowID > 0) != (endArrowID > 0)) {
      if (endArrowID === 0) {
        endArrowID = startArrowID;
        endArrowDisplay = startArrowDisplay;
      }
      startArrowID = 0;
      startArrowDisplay = false;
    }

    // Create line attributes
    if (referenceObject) {
      attributes = Utils1.DeepCopy(referenceObject.Data.attributes);
    } else {
      attributes = {
        Frame: {
          x: 0,
          y: 0,
          width: 1,
          height: 1
        },
        StartPoint: {
          x: 0,
          y: 0
        },
        EndPoint: {
          x: 0,
          y: 0
        },
        StartArrowID: startArrowID,
        EndArrowID: endArrowID,
        StartArrowDisp: startArrowDisplay,
        EndArrowDisp: endArrowDisplay,
        ArrowSizeIndex: sessionData.d_arrowsize,
        CurveAdjust: 7,
        TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
        TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
        TextDirection: isVerticalText,
        Dimensions: sessionData.dimensions,
        curveparam: sessionData.def.curveparam,
        bOverrideDefaultStyleOnDraw: true
      };
    }

    // Create the segmented line shape
    const segmentedLineShape = new Instance.Shape.SegmentedLine(attributes);
    let lineStyle = Utils1.DeepCopy(sessionData.def.style);

    // Set style from reference object or defaults
    if (referenceObject && referenceObject.Data &&
      referenceObject.Data.attributes && referenceObject.Data.attributes.StyleRecord) {
      lineStyle = Utils1.DeepCopy(referenceObject.Data.attributes.StyleRecord);
    } else {
      const textBlockStyle = Utils4.FindStyle(ConstantData.Defines.TextBlockStyle);
      lineStyle.Text.Paint.Color = textBlockStyle.Text.Paint.Color;
    }

    segmentedLineShape.StyleRecord = lineStyle;

    // Set line hopping if allowed
    if (sessionData.flags & ConstantData.SessionFlags.SEDS_AllowHops) {
      segmentedLineShape.flags = Utils2.SetFlag(segmentedLineShape.flags, ConstantData.ObjFlags.SEDO_LineHop, true);
    }

    // Return shape if in drawing mode, otherwise draw it
    if (isDrawing) {
      console.log("O.ToolOpt DrawNewSegLine output:", segmentedLineShape);
      return segmentedLineShape;
    }

    T3Gv.optManager.DrawNewObject(segmentedLineShape, eventObject);
    console.log("O.ToolOpt DrawNewSegLine output: void");
  }

  /**
   * Creates and draws a new arc segmented line shape
   * @param isDrawing - Whether in drawing mode
   * @param eventObject - The event object for drawing
   * @param referenceObject - Reference object for line properties
   * @returns The created arc segmented line shape if in drawing mode
   */
  DrawNewArcSegLine = function (isDrawing, eventObject, referenceObject) {
    console.log("O.ToolOpt DrawNewArcSegLine input:", isDrawing, eventObject, referenceObject);

    let attributes;
    const sessionData = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data;
    const isVerticalText = 0 == (sessionData.def.textflags & ConstantData.TextFlags.SED_TF_HorizText);
    let startArrowID = sessionData.d_sarrow;
    let endArrowID = sessionData.d_earrow;
    let startArrowDisplay = sessionData.d_sarrowdisp;
    let endArrowDisplay = sessionData.d_earrowdisp;

    // Make arrow settings consistent
    if ((startArrowID > 0) != (endArrowID > 0)) {
      if (endArrowID === 0) {
        endArrowID = startArrowID;
        endArrowDisplay = startArrowDisplay;
      }
      startArrowID = 0;
      startArrowDisplay = false;
    }

    // Create line attributes
    if (referenceObject) {
      attributes = Utils1.DeepCopy(referenceObject.Data.attributes);
    } else {
      attributes = {
        Frame: {
          x: 0,
          y: 0,
          width: 1,
          height: 1
        },
        StartPoint: {
          x: 0,
          y: 0
        },
        EndPoint: {
          x: 0,
          y: 0
        },
        StartArrowID: startArrowID,
        EndArrowID: endArrowID,
        StartArrowDisp: startArrowDisplay,
        EndArrowDisp: endArrowDisplay,
        ArrowSizeIndex: sessionData.d_arrowsize,
        CurveAdjust: 7,
        TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
        TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
        TextDirection: isVerticalText,
        Dimensions: sessionData.dimensions,
        bOverrideDefaultStyleOnDraw: true
      };
    }

    // Create the arc segmented line shape
    const arcSegmentedLineShape = new Instance.Shape.ArcSegmentedLine(attributes);
    let lineStyle = Utils1.DeepCopy(sessionData.def.style);

    // Set style from reference object or defaults
    if (referenceObject && referenceObject.Data &&
      referenceObject.Data.attributes && referenceObject.Data.attributes.StyleRecord) {
      lineStyle = Utils1.DeepCopy(referenceObject.Data.attributes.StyleRecord);
    } else {
      const textBlockStyle = Utils4.FindStyle(ConstantData.Defines.TextBlockStyle);
      lineStyle.Text.Paint.Color = textBlockStyle.Text.Paint.Color;
    }

    arcSegmentedLineShape.StyleRecord = lineStyle;

    // Set line hopping if allowed
    if (sessionData.flags & ConstantData.SessionFlags.SEDS_AllowHops) {
      arcSegmentedLineShape.flags = Utils2.SetFlag(arcSegmentedLineShape.flags, ConstantData.ObjFlags.SEDO_LineHop, true);
    }

    // Return shape if in drawing mode, otherwise draw it
    if (isDrawing) {
      console.log("O.ToolOpt DrawNewArcSegLine output:", arcSegmentedLineShape);
      return arcSegmentedLineShape;
    }

    T3Gv.optManager.DrawNewObject(arcSegmentedLineShape, eventObject);
    console.log("O.ToolOpt DrawNewArcSegLine output: void");
  }

  /**
   * Creates and draws a new polyline shape
   * @param isDrawing - Whether in drawing mode
   * @param eventObject - The event object for drawing
   * @param referenceObject - Reference object for polyline properties
   * @returns The created polyline shape if in drawing mode
   */
  DrawNewPolyLine = function (isDrawing, eventObject, referenceObject) {
    console.log("O.ToolOpt DrawNewPolyLine input:", isDrawing, eventObject, referenceObject);

    let attributes;
    const sessionData = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data;
    const isVerticalText = 0 == (sessionData.def.textflags & ConstantData.TextFlags.SED_TF_HorizText);
    let startArrowID = sessionData.d_sarrow;
    let endArrowID = sessionData.d_earrow;
    let startArrowDisplay = sessionData.d_sarrowdisp;
    let endArrowDisplay = sessionData.d_earrowdisp;

    // Make arrow settings consistent
    if ((startArrowID > 0) != (endArrowID > 0)) {
      if (endArrowID === 0) {
        endArrowID = startArrowID;
        endArrowDisplay = startArrowDisplay;
      }
      startArrowID = 0;
      startArrowDisplay = false;
    }

    // Create polyline attributes
    if (referenceObject) {
      attributes = Utils1.DeepCopy(referenceObject.Data.attributes);
    } else {
      attributes = {
        Frame: {
          x: 0,
          y: 0,
          width: 1,
          height: 1
        },
        StartPoint: {
          x: 0,
          y: 0
        },
        EndPoint: {
          x: 0,
          y: 0
        },
        StartArrowID: startArrowID,
        EndArrowID: endArrowID,
        StartArrowDisp: startArrowDisplay,
        EndArrowDisp: endArrowDisplay,
        ArrowSizeIndex: sessionData.d_arrowsize,
        CurveAdjust: 7,
        polylist: new PolyList(),
        TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
        TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
        TextDirection: isVerticalText,
        Dimensions: sessionData.dimensions,
        extraflags: ConstantData.ExtraFlags.SEDE_SideKnobs,
        bOverrideDefaultStyleOnDraw: true
      };

      // Add initial line segments
      attributes.polylist.segs.push(
        new PolySeg(ConstantData.LineType.LINE, 0, 0)
      );
      attributes.polylist.segs.push(
        new PolySeg(ConstantData.LineType.LINE, 0, 0)
      );
    }

    // Create the polyline shape
    const polyLineShape = new Instance.Shape.PolyLine(attributes);
    let lineStyle = Utils1.DeepCopy(sessionData.def.style);

    // Set style from reference object or defaults
    if (referenceObject && referenceObject.Data &&
      referenceObject.Data.attributes && referenceObject.Data.attributes.StyleRecord) {
      lineStyle = Utils1.DeepCopy(referenceObject.Data.attributes.StyleRecord);
    } else {
      const textBlockStyle = Utils4.FindStyle(ConstantData.Defines.TextBlockStyle);
      lineStyle.Text.Paint.Color = textBlockStyle.Text.Paint.Color;
    }

    polyLineShape.StyleRecord = lineStyle;

    // Return shape if in drawing mode, otherwise draw it
    if (isDrawing) {
      console.log("O.ToolOpt DrawNewPolyLine output:", polyLineShape);
      return polyLineShape;
    }

    T3Gv.optManager.DrawNewObject(polyLineShape, eventObject);
    console.log("O.ToolOpt DrawNewPolyLine output: void");
  }

  /**
   * Creates and draws a new polyline container shape
   * @param isDrawing - Whether in drawing mode
   * @param eventObject - The event object for drawing
   * @param referenceObject - Reference object for polyline container properties
   * @returns The created polyline container shape if in drawing mode
   */
  DrawNewPolyLineContainer = function (isDrawing, eventObject, referenceObject) {
    console.log("O.ToolOpt DrawNewPolyLineContainer input:", isDrawing, eventObject, referenceObject);

    let attributes;
    const sessionData = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data;
    const sessionBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, false);
    const isVerticalText = 0 == (sessionData.def.textflags & ConstantData.TextFlags.SED_TF_HorizText);

    // Create attributes from reference or defaults
    if (referenceObject) {
      attributes = Utils1.DeepCopy(referenceObject.Data.attributes);
    } else {
      attributes = {
        Frame: {
          x: 0,
          y: 0,
          width: 1,
          height: 1
        },
        StartPoint: {
          x: 0,
          y: 0
        },
        EndPoint: {
          x: 0,
          y: 0
        },
        StartArrowID: sessionData.d_sarrow,
        EndArrowID: sessionData.d_earrow,
        StartArrowDisp: sessionData.d_sarrowdisp,
        EndArrowDisp: sessionData.d_earrowdisp,
        ArrowSizeIndex: sessionData.d_arrowsize,
        CurveAdjust: 7,
        polylist: new PolyList(),
        TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
        TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
        TextDirection: isVerticalText,
        Dimensions: sessionData.dimensions
      };

      // Add initial line segments
      attributes.polylist.segs.push(
        new PolySeg(ConstantData.LineType.LINE, 0, 0)
      );
      attributes.polylist.segs.push(
        new PolySeg(ConstantData.LineType.LINE, 0, 0)
      );
    }

    // Create the polyline container shape
    const polyLineContainerShape = new Instance.Shape.PolyLineContainer(attributes);

    // Return shape if in drawing mode, otherwise draw it
    if (isDrawing) {
      console.log("O.ToolOpt DrawNewPolyLineContainer output:", polyLineContainerShape);
      return polyLineContainerShape;
    }

    T3Gv.optManager.DrawNewObject(polyLineContainerShape, eventObject);
    console.log("O.ToolOpt DrawNewPolyLineContainer output: void");
  }

  /**
   * Creates and draws a new freehand line shape
   * @param isDrawing - Whether in drawing mode
   * @param eventObject - The event object for drawing
   * @param referenceObject - Reference object for line properties
   * @returns The created freehand line shape if in drawing mode
   */
  DrawNewFreehandLine = function (isDrawing, eventObject, referenceObject) {
    console.log("O.ToolOpt DrawNewFreehandLine input:", isDrawing, eventObject, referenceObject);

    let attributes;
    const sessionData = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data;

    if (referenceObject) {
      attributes = Utils1.DeepCopy(referenceObject.Data.attributes);
    } else {
      attributes = {
        Frame: {
          x: 0,
          y: 0,
          width: 1,
          height: 1
        },
        StartPoint: {
          x: 0,
          y: 0
        },
        EndPoint: {
          x: 0,
          y: 0
        },
        pointlist: [],
        bOverrideDefaultStyleOnDraw: true
      };

      attributes.pointlist.push({
        x: 0,
        y: 0
      });
    }

    const freehandLineShape = new Instance.Shape.FreehandLine(attributes);
    let lineStyle = Utils1.DeepCopy(sessionData.def.style);

    if (referenceObject &&
      referenceObject.Data &&
      referenceObject.Data.attributes &&
      referenceObject.Data.attributes.StyleRecord) {
      lineStyle = Utils1.DeepCopy(referenceObject.Data.attributes.StyleRecord);
    }

    freehandLineShape.StyleRecord = lineStyle;

    // Return shape if in drawing mode, otherwise draw it
    if (isDrawing) {
      console.log("O.ToolOpt DrawNewFreehandLine output:", freehandLineShape);
      return freehandLineShape;
    }

    T3Gv.optManager.DrawNewObject(freehandLineShape, eventObject);
    console.log("O.ToolOpt DrawNewFreehandLine output: void");
  }

  /**
   * Creates and draws a new arc line shape
   * @param isDrawing - Whether in drawing mode
   * @param eventObject - The event object for drawing
   * @param referenceObject - Reference object for line properties
   * @returns The created arc line shape if in drawing mode
   */
  DrawNewArcLine = function (isDrawing, eventObject, referenceObject) {
    console.log("O.ToolOpt DrawNewArcLine input:", isDrawing, eventObject, referenceObject);

    let attributes;
    const sessionData = T3Gv.objectStore.GetObject(T3Gv.optManager.sedSessionBlockId).Data;
    const isVerticalText = 0 == (sessionData.def.textflags & ConstantData.TextFlags.SED_TF_HorizText);
    let startArrowID = sessionData.d_sarrow;
    let endArrowID = sessionData.d_earrow;
    let startArrowDisplay = sessionData.d_sarrowdisp;
    let endArrowDisplay = sessionData.d_earrowdisp;

    // Make arrow settings consistent
    if ((startArrowID > 0) != (endArrowID > 0)) {
      if (endArrowID === 0) {
        endArrowID = startArrowID;
        endArrowDisplay = startArrowDisplay;
      }
      startArrowID = 0;
      startArrowDisplay = false;
    }

    // Create line attributes
    if (referenceObject) {
      attributes = Utils1.DeepCopy(referenceObject.Data.attributes);
    } else {
      attributes = {
        Frame: {
          x: 0,
          y: 0,
          width: 1,
          height: 1
        },
        StartPoint: {
          x: 0,
          y: 0
        },
        EndPoint: {
          x: 0,
          y: 0
        },
        StartArrowID: startArrowID,
        EndArrowID: endArrowID,
        StartArrowDisp: startArrowDisplay,
        EndArrowDisp: endArrowDisplay,
        ArrowSizeIndex: sessionData.d_arrowsize,
        CurveAdjust: 7,
        TextGrow: ConstantData.TextGrowBehavior.HORIZONTAL,
        TextAlign: ConstantData.DocumentContext.CurrentTextAlignment,
        TextDirection: isVerticalText,
        Dimensions: sessionData.dimensions,
        bOverrideDefaultStyleOnDraw: true
      };
    }

    // Create the arc line shape
    const arcLineShape = new Instance.Shape.ArcLine(attributes);
    let lineStyle = Utils1.DeepCopy(sessionData.def.style);

    // Set style from reference object or defaults
    if (referenceObject && referenceObject.Data &&
      referenceObject.Data.attributes && referenceObject.Data.attributes.StyleRecord) {
      lineStyle = Utils1.DeepCopy(referenceObject.Data.attributes.StyleRecord);
    } else {
      const textBlockStyle = Utils4.FindStyle(ConstantData.Defines.TextBlockStyle);
      lineStyle.Text.Paint.Color = textBlockStyle.Text.Paint.Color;
    }

    arcLineShape.StyleRecord = lineStyle;

    // Set line hopping if allowed
    if (sessionData.flags & ConstantData.SessionFlags.SEDS_AllowHops) {
      arcLineShape.flags = Utils2.SetFlag(arcLineShape.flags, ConstantData.ObjFlags.SEDO_LineHop, true);
    }

    // Return shape if in drawing mode, otherwise draw it
    if (isDrawing) {
      console.log("O.ToolOpt DrawNewArcLine output:", arcLineShape);
      return arcLineShape;
    }

    T3Gv.optManager.DrawNewObject(arcLineShape, eventObject);
    console.log("O.ToolOpt DrawNewArcLine output: void");
  }

  /**
   * Selects all objects in the drawing
   * @returns void
   */
  SelectAllObjects = function () {
    console.log("O.ToolOpt SelectAllObjects input: no parameters");

    try {
      T3Gv.optManager.SelectAllObjects();
    } catch (error) {
      T3Gv.optManager.ExceptionCleanup(error);
    }

    console.log("O.ToolOpt SelectAllObjects output: void");
  }

  /**
   * Saves the current drawing to local storage
   * @returns void
   */
  SaveAs = function () {
    console.log("U.ToolUtil SaveAs input: no parameters");

    T3Gv.optManager.CloseEdit();

    // save data to local storage
    DataOpt.SaveToLocal();

    console.log("U.ToolUtil SaveAs output: void");
  }

}

export default ToolUtil

