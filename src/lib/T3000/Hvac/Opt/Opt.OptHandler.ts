

import HvTimer from "../Helper/HvTimer";
import QuickStyle from "../Model/QuickStyle";
import ListManager from '../Data/ListManager';
import ParagraphFormat from '../Model/ParagraphFormat';
import GlobalData from '../Data/GlobalData';
import Globals from "../Data/Globals";
import TextureList from "../Model/TextureList";
import SDF from '../Data/SDF';
import ContentHeader from '../Model/ContentHeader';
import SEDSession from '../Model/SEDSession';
import LayersManager from "../Model/LayersManager";
import Layer from "../Model/Layer";
import $ from 'jquery';
import DefaultEvt from "../Event/DefaultEvt";
// import Collab from "../Data/Collab";
import Collaboration from "../Data/Collaboration";
import Resources from "../Data/Resources";
import ArrowDefs from '../Model/ArrowDefs';
import ArrowSizes from '../Model/ArrowSizes';
// import CollabOverlayContoller from "../Opt/Business/CollabOverlayContoller";
import Commands from '../Opt/Business/Commands';
import Document from '../Basic/Basic.Document';
import Utils1 from "../Helper/Utils1";
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3"
import BaseLine from '../Shape/Shape.BaseLine';
import FileParser from "../Data/FileParser";
import '../Helper/HammerTest2'
import PolyLine from '../Shape/Shape.PolyLine';
import PolyLineContainer from '../Shape/Shape.PolyLineContainer';
import BaseDrawingObject from '../Shape/Shape.BaseDrawingObject';
import Business from '../Opt/Business/Business';
import GroupSymbol from '../Shape/Shape.GroupSymbol';
import Connector from '../Shape/Shape.Connector';
import FloorPlan from '../Opt/Business/FloorPlan'
import Point from '../Model/Point';
import ShapeContainer from '../Shape/Shape.ShapeContainer'
import SegmentedLine from '../Shape/Shape.SegmentedLine';
import BaseShape from '../Shape/Shape.BaseShape';
import SegmentData from '../Model/SegmentData'
import PolygonShapeGenerator from "./Business/PolygonShapeGenerator"
import DefaultStyle from "../Model/DefaultStyle"
import TextParams from "../Model/TextParams"
import Style from '../Basic/Basic.Element.Style'
import Instance from "../Data/Instance/Instance"
import ConstantData from '../Data/ConstantData'
import TEDSession from "../Model/TEDSession"
import TextFormatData from "../Model/TextFormatData"
import PolyList from "../Model/PolyList"
import PolySeg from "../Model/PolySeg"
import HitResult from "../Model/HitResult"
import LinkParameters from "../Model/LinkParameters"
import Link from '../Model/Link'
import SelectionAttributes from "../Model/SelectionAttributes"
import Rectangle from "../Model/Rectangle"
import Hook from "../Model/Hook"
import ConstantData1 from "../Data/ConstantData1"
import TextObject from "../Model/TextObject"
import DynamicGuides from "../Model/DynamicGuides"
import ConstantData2 from "../Data/ConstantData2"

class OptHandler {

  //#region  Variables

  public bIsInitialized: boolean;
  public theSVGDocumentID: string;
  public sendstate: number;
  public theRubberBand: any;
  public theRubberBandStartX: number;
  public theRubberBandStartY: number;
  public theRubberBandFrame: any;
  public theDragBBoxList: any[];
  public theDragElementList: any[];
  public theDragEnclosingRect: any;
  public theDragStartX: number;
  public theDragStartY: number;
  public theDragDeltaX: number;
  public theDragDeltaY: number;
  public theDragTargetID: any;
  public theDragTargetBBox: any;
  public theDragGotMove: boolean;
  public theDragGotAutoResizeRight: boolean;
  public theDragGotAutoResizeBottom: boolean;
  public theDragGotAutoResizeOldX: any[];
  public theDragGotAutoResizeOldY: any[];
  public theNudgeDelta: number;
  public NoUndo: boolean;
  public theActionStoredObjectID: number;
  public theActionSVGObject: any;
  public theActionTriggerID: number;
  public theActionTriggerData: number;
  public theActionStartX: number;
  public theActionStartY: number;
  public theActionTableLastX: number;
  public theActionTableLastY: number;
  public theActionOldExtra: number;
  public theActionBBox: any;
  public theActionNewBBox: any;
  public theActionLockAspectRatio: boolean;
  public theActionAspectRatioWidth: number;
  public theActionAspectRatioHeight: number;
  public bUseDefaultStyle: boolean;
  public NewObjectVisible: boolean;
  public EmptySymbolList: any[];
  public EmptyEMFList: any[];
  public AddCount: number;
  public LineStamp: boolean;
  public theDrawStartX: number;
  public theDrawStartY: number;
  public theLineDrawStartX: number;
  public theLineDrawStartY: number;
  public FromOverlayLayer: boolean;
  public LineDrawID: number;
  public LineDrawLineID: number;
  public dynamicGuides: any;
  public theRotateKnobCenterDivisor: any;
  public theRotateStartPoint: any;
  public theRotateEndPoint: any;
  public theRotateStartRotation: number;
  public theRotateObjectRadians: number;
  public theRotateEndRotation: number;
  public theRotatePivotX: number;
  public theRotatePivotY: number;
  public theRotateSnap: number;
  public enhanceRotateSnap: number;
  public theDrawShape: any;
  public StampTimeout: any;
  public wasClickInShape: boolean;
  public autoScrollTimer: HvTimer;
  public autoScrollTimerID: number;
  public autoScrollXPos: number;
  public autoScrollYPos: number;
  public bInAutoScroll: boolean;
  public textEntryTimer: any;
  public isGestureCapable: boolean;
  public bTouchInitiated: boolean;
  public MainAppElement: any;
  public MainAppHammer: any;
  public WorkAreaElement: any;
  public WorkAreaHammer: any;
  public WorkAreaTextInputProxy: any;
  public theVirtualKeyboardLifterElementFrame: any;
  public bTouchPanStarted: boolean;
  public touchPanX: number;
  public touchPanY: number;
  public bIsFullScreen: boolean;
  public TEHammer: any;
  public TEWorkAreaHammer: any;
  public TEClickAreaHammer: any;
  public TEDecAreaHammer: any;
  public TENoteAreaHammer: any;
  public theSelectedListBlockID: number;
  public theSEDSessionBlockID: number;
  public theTEDSessionBlockID: number;
  public theLayersManagerBlockID: number;
  public stampCompleteCallback: any;
  public stampCompleteUserData: any;
  public stampHCenter: boolean;
  public stampVCenter: boolean;
  public stampShapeOffsetX: number;
  public stampShapeOffsetY: number;
  public stampSticky: boolean;
  public LastOpDuplicate: boolean;
  public NudgeOpen: boolean;
  public NudgeX: number;
  public NudgeY: number;
  public NudgeGrowX: number;
  public NudgeGrowY: number;
  public currentModalOperation: number;
  public FormatPainterMode: number;
  public FormatPainterStyle: QuickStyle;
  public FormatPainterSticky: boolean;
  public FormatPainterText: QuickStyle;
  public FormatPainterParaFormat: ParagraphFormat;
  public FormatPainterArrows: any;
  public svgDoc: Document;
  public svgObjectLayer: any;
  public svgOverlayLayer: any;
  public svgHighlightLayer: any;
  public theEventTimestamp: number;
  public actionArrowHideTimer: HvTimer;
  public uniqueID: number;
  public theTextClipboard: any;
  public theHtmlClipboard: any;
  public CutFromButton: boolean;
  public theImageClipboard: any;
  public SVGroot: any;
  public theDirtyList: any[];
  public theDirtyListMoveOnly: any[];
  public DirtyListReOrder: boolean;
  public theMoveList: any[];
  public theMoveBounds: any;
  public PinRect: any;
  public LinkParams: any;
  public RightClickParams: any;
  public PostMoveSelectID: any;
  public bBuildingSymbols: boolean;
  public bTokenizeStyle: boolean;
  public bDrawEffects: boolean;
  public initialStateID: number;
  public nObjectStoreStart: number;
  public cachedHeight: any;
  public cachedWidth: any;
  public bInDimensionEdit: boolean;
  public curNoteShape: number;
  public curNoteTableCell: any;
  public curNoteGraphPint: any;
  public bInNoteEdit: boolean;
  public bNoteChanged: boolean;
  public OldAllowSave: boolean;
  public SocketAction: any[];
  public PageAction: any[];
  public PagesToDelete: any[];
  public TextureList: TextureList;
  public RichGradients: any[];
  public NStdTextures: number;
  public HasBlockDirectory: boolean;
  public FileVersion: number;
  public ActiveExpandedView: any;
  public CommentUserIDs: any[];
  public theContentHeader: ContentHeader;
  public theLinksBlockID: number;
  public SelectionState: any;
  public OldFileMetaData: any;
  public curHiliteShape: number;
  public alternateStateManagerVars: any;
  public bitmapImportCanvas: any;
  public bitmapImportCanvasCTX: any;
  public bitmapScaledCanvas: any;
  public bitmapScaledCanvasCTX: any;
  public bitmapImportSourceWidth: number;
  public bitmapImportSourceHeight: number;
  public bitmapImportDestWidth: number;
  public bitmapImportDestHeight: number;
  public bitmapImportMaxScaledWidth: number;
  public bitmapImportMaxScaledHeight: number;
  public bitmapImportDPI: number;
  public bitmapImportMimeType: string;
  public bitmapImportOriginalSize: number;
  public bitmapImportScaledSize: number;
  public scaledBitmapCallback: any;
  public bitmapImportEXIFdata: any;
  public bitmapImportFile: any;
  public bitmapImportResult: any;
  public symbolLibraryItemID: number;
  public TopLeftPastePos: any;
  public TopLeftPasteScrollPos: any;
  public PasteCount: number;
  public DoubleClickSymbolTimeStamp: number;
  public ImportContext: any;
  public svgCollabLayer: any;
  public DocumentElement: any;
  public DocumentElementHammer: any;
  public editModeList: any;
  public TETextHammer: any;

  public collaboration: Collaboration;

  //#endregion

  Initialize() {

    if (this.bIsInitialized) { return; }

    //Selector for the SVG element container ('#svg-area')
    this.theSVGDocumentID = '#svg-area';

    //Reference to the SVG document after initialization
    this.svgDoc = null;

    //Main layer for drawing content
    this.svgObjectLayer = null;

    //Layer for UI elements that shouldn't be exported
    this.svgOverlayLayer = null;

    //Layer for highlighting selected elements
    this.svgHighlightLayer = null;

    //Reference to the selection rectangle element
    this.theRubberBand = null;

    //Starting coordinates for selection rectangle
    this.theRubberBandStartX = 0;
    this.theRubberBandStartY = 0;

    //The rectangular bounds of the selection area
    this.theRubberBandFrame = { x: 0, y: 0, width: 0, height: 0 };

    //Elements being dragged
    this.theDragElementList = [];

    //Starting coordinates for drag operations
    this.theDragStartX = 0;
    this.theDragStartY = 0;

    //Movement distance during dragging
    this.theDragDeltaX = 0;
    this.theDragDeltaY = 0;

    //ID of the primary drag target
    this.theDragTargetID = null;

    //Flag indicating movement has occurred
    this.theDragGotMove = false;

    this.theDragGotAutoResizeRight = false;
    this.theDragGotAutoResizeBottom = false;
    this.theDragGotAutoResizeOldX = [];
    this.theDragGotAutoResizeOldY = [];

    this.theDragBBoxList = [];
    this.theDragTargetBBox = {};
    this.theDragEnclosingRect = null;

    this.theNudgeDelta = 10;

    this.NoUndo = false;
    this.theActionStoredObjectID = -1;
    this.theActionSVGObject = null;
    this.theActionTriggerID = 0;
    this.theActionTriggerData = 0;
    this.theActionStartX = 0;
    this.theActionStartY = 0;
    this.theActionTableLastX = 0;
    this.theActionTableLastY = 0;
    this.theActionOldExtra = 0;
    this.theActionBBox = {};
    this.theActionNewBBox = {};
    this.theActionLockAspectRatio = false;
    this.theActionAspectRatioWidth = 0;
    this.theActionAspectRatioHeight = 0;
    this.bUseDefaultStyle = false;
    this.NewObjectVisible = false;
    this.EmptySymbolList = [];
    this.EmptyEMFList = [];
    this.AddCount = 0;
    this.LineStamp = false;
    this.theDrawStartX = 0;
    this.theDrawStartY = 0;
    this.theLineDrawStartX = 0;
    this.theLineDrawStartY = 0;
    this.FromOverlayLayer = false;
    this.LineDrawID = -1;
    this.LineDrawLineID = -1;
    this.dynamicGuides = null;

    // Rotation Variables
    this.theRotateKnobCenterDivisor = { x: 2, y: 2 };
    this.theRotateStartPoint = {};
    this.theRotateEndPoint = {};
    this.theRotateObjectRadians = 0;

    //Start/end rotation angles
    this.theRotateStartRotation = 0;
    this.theRotateEndRotation = 0;

    //Center point for rotation operations
    this.theRotatePivotX = 0;
    this.theRotatePivotY = 0;

    //Angle for rotation snapping (5 degrees)
    this.theRotateSnap = 5;

    //Enhanced rotation snapping (45 degrees)
    this.enhanceRotateSnap = 45;

    this.theDrawShape = null;
    this.StampTimeout = null;
    this.wasClickInShape = false;
    this.autoScrollTimer = new HvTimer(this);
    this.autoScrollTimerID = -1;
    this.autoScrollXPos = 0;
    this.autoScrollYPos = 0;
    this.bInAutoScroll = false;
    this.textEntryTimer = null;

    //Detects if device supports touch/gestures
    this.isGestureCapable = 'ontouchstart' in window || ('onpointerdown' in window && navigator.maxTouchPoints && navigator.maxTouchPoints > 1);

    //Flag for touch interaction initiation
    this.bTouchInitiated = false;

    this.MainAppElement = null;
    this.MainAppHammer = null;
    this.WorkAreaElement = null;
    this.WorkAreaHammer = null;
    this.WorkAreaTextInputProxy = null;
    this.theVirtualKeyboardLifterElementFrame = null;
    this.bTouchPanStarted = false;
    this.touchPanX = 0;
    this.touchPanY = 0;
    this.bIsFullScreen = false;
    this.TEHammer = null;
    this.TEWorkAreaHammer = null;
    this.TEClickAreaHammer = null;
    this.TEDecAreaHammer = null;
    this.TENoteAreaHammer = null;

    //ID for object selection storage
    this.theSelectedListBlockID = -1;

    //ID for shape editing session data
    this.theSEDSessionBlockID = -1;

    //ID for text editing session data
    this.theTEDSessionBlockID = -1;

    //ID for layer management data
    this.theLayersManagerBlockID = -1;

    this.stampCompleteCallback = null;
    this.stampCompleteUserData = null;
    this.stampHCenter = true;
    this.stampVCenter = true;
    this.stampShapeOffsetX = 0;
    this.stampShapeOffsetY = 0;
    this.stampSticky = false;
    this.LastOpDuplicate = false;
    this.NudgeOpen = false;
    this.NudgeX = 0;
    this.NudgeY = 0;
    this.NudgeGrowX = 0;
    this.NudgeGrowY = 0;
    this.currentModalOperation = ConstantData2.ModalOperations.NONE;

    //Current format painter mode
    this.FormatPainterMode = ConstantData2.FormatPainterModes.NONE;

    //Style information for format painter
    this.FormatPainterStyle = new QuickStyle();

    //Whether format painter persists after use
    this.FormatPainterSticky = false;
    this.FormatPainterText = new QuickStyle();
    this.FormatPainterParaFormat = new ParagraphFormat();
    this.FormatPainterArrows = null;

    this.theEventTimestamp = 0;
    this.actionArrowHideTimer = new HvTimer(this);
    this.uniqueID = 0;
    this.theTextClipboard = null;
    this.theHtmlClipboard = null;
    this.CutFromButton = false;
    this.theImageClipboard = null;
    const selectedListBlock = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.SELECTEDLIST_OBJECT, []);
    this.theSelectedListBlockID = selectedListBlock.ID;

    this.TextureList = new TextureList();
    this.NStdTextures = 0;
    this.RichGradients = [];
    this.HasBlockDirectory = false;
    this.FileVersion = 41;
    this.ActiveExpandedView = null;
    this.CommentUserIDs = [];
    this.theContentHeader = new ContentHeader();

    const sedSession = new SEDSession();
    sedSession.def.style = new QuickStyle();
    sedSession.def.pen = Utils1.DeepCopy(ConstantData.Defines.PenStylingDefault);
    sedSession.def.highlighter = Utils1.DeepCopy(ConstantData.Defines.HighlighterStylingDefault);
    sedSession.d_sarrow = 0;
    sedSession.d_sarrowdisp = false;
    sedSession.d_earrow = 0;
    sedSession.d_earrowdisp = false;
    sedSession.d_arrowsize = 1;
    sedSession.CurrentTheme = null;

    const sedSessionBlock = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.SED_SESSION_OBJECT, sedSession);
    this.theSEDSessionBlockID = sedSessionBlock.ID;

    const layersManager = new LayersManager();
    const defaultLayer = new Layer();
    defaultLayer.name = ConstantData.Defines.DefaultLayerName;
    layersManager.layers.push(defaultLayer);
    layersManager.nlayers = 1;
    layersManager.activelayer = 0;

    const layersManagerBlock = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.LAYERS_MANAGER_OBJECT, layersManager);
    this.theLayersManagerBlockID = layersManagerBlock.ID;

    this.SelectionState = new SelectionAttributes();

    const tedSession = new TEDSession();
    const tedSessionBlock = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.TED_SESSION_OBJECT, tedSession);
    this.theTEDSessionBlockID = tedSessionBlock.ID;

    const linksBlock = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.LINKLIST_OBJECT, []);
    this.theLinksBlockID = linksBlock.ID;

    this.theDirtyList = [];
    this.theDirtyListMoveOnly = [];
    this.DirtyListReOrder = false;
    this.theMoveList = [];
    this.theMoveBounds = null;
    this.PinRect = null;
    this.LinkParams = null;
    this.RightClickParams = null;
    this.PostMoveSelectID = null;
    this.bBuildingSymbols = false;
    this.bTokenizeStyle = false;
    this.bDrawEffects = true;
    this.initialStateID = GlobalData.stateManager.CurrentStateID;
    this.nObjectStoreStart = GlobalData.objectStore.StoredObjects.length;
    this.cachedHeight = null;
    this.cachedWidth = null;
    this.bInDimensionEdit = false;
    this.curNoteShape = -1;
    this.curNoteTableCell = null;
    this.curNoteGraphPint = null;
    this.bInNoteEdit = false;
    this.bNoteChanged = false;
    this.OldAllowSave = true;
    this.SocketAction = [];
    this.PageAction = [];
    this.PagesToDelete = [];
    this.OldFileMetaData = null;
    this.curHiliteShape = -1;

    this.alternateStateManagerVars = [];
    this.alternateStateManagerVars.bHasBeenSaved = false;
    this.bitmapImportCanvas = null;
    this.bitmapImportCanvasCTX = null;
    this.bitmapScaledCanvas = null;
    this.bitmapScaledCanvasCTX = null;
    this.bitmapImportSourceWidth = 0;
    this.bitmapImportSourceHeight = 0;
    this.bitmapImportDestWidth = 800;
    this.bitmapImportDestHeight = 800;
    this.bitmapImportMaxScaledWidth = 1200;
    this.bitmapImportMaxScaledHeight = 1200;
    this.bitmapImportDPI = 200;
    this.bitmapImportMimeType = '';
    this.bitmapImportOriginalSize = 0;
    this.bitmapImportScaledSize = 0;
    this.scaledBitmapCallback = null;
    this.bitmapImportEXIFdata = null;
    this.bitmapImportFile = null;
    this.bitmapImportResult = null;
    this.symbolLibraryItemID = -1;
    this.bIsInitialized = true;
    this.TopLeftPastePos = { x: 0, y: 0 };
    this.TopLeftPasteScrollPos = { x: 0, y: 0 };
    this.PasteCount = 0;
    this.DoubleClickSymbolTimeStamp = 0;
    this.ImportContext = null;
    this.sendstate = 0;

    this.PreserveUndoState(true);
    this.InitSVGDocument();
    this.SVGroot = this.svgDoc.svgObj.node;
    this.UpdateSelectionAttributes(null);
    this.BuildArrowheadLookupTables();
    this.SetEditMode(ConstantData.EditState.DEFAULT);

    this.collaboration = new Collaboration();
  }

  PreserveUndoState(preserveState) {
    console.log('O.Opt PreserveUndoState - Input:', { preserveState });

    if (!GlobalData.optManager.NoUndo) {
      // Check if the state manager exists
      if (null === GlobalData.stateManager) {
        throw new Error('stateManager is null');
      }

      // Only proceed if we have a valid state ID
      if (GlobalData.stateManager.CurrentStateID >= 0) {
        // Check if state is currently open
        const isStateOpen = Utils1.IsStateOpen();

        // Preserve the current state
        GlobalData.stateManager.PreserveState();

        // Add to history state if state was open
        if (isStateOpen) {
          GlobalData.stateManager.AddToHistoryState();
        }

        // Save blocks and update dirty state if needed
        if (!preserveState && isStateOpen) {
          if (this.GetDocDirtyState()) {
            SDF.SaveChangedBlocks(GlobalData.stateManager.CurrentStateID, 1);
          } else {
            SDF.SaveAllBlocks();
          }
          this.SetDocDirtyState(true);
        }
      }
    }

    console.log('O.Opt PreserveUndoState - Output: State preserved');
  }

  InitSVGDocument() {
    console.log("O.Opt InitSVGDocument - Input: Starting SVG document initialization");

    // Get the session data from stored object
    const sessionData = GlobalData.objectStore.GetObject(this.theSEDSessionBlockID).Data;

    // Get current screen dimensions
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    console.log("O.Opt InitSVGDocument - Screen dimensions:", { width: screenWidth, height: screenHeight });

    // Initialize the document work area
    GlobalData.docHandler.InitializeWorkArea({
      svgAreaID: this.theSVGDocumentID,
      documentWidth: screenWidth,
      documentHeight: screenHeight,
      documentDPI: 100
    });

    // Get document object and initialize layers
    this.svgDoc = GlobalData.docHandler.DocObject();
    console.log("O.Opt InitSVGDocument - Created SVG document object");

    // Add and configure the object layer (main content layer)
    this.svgObjectLayer = this.svgDoc.AddLayer('svgObjectLayer');
    this.svgDoc.SetDocumentLayer('svgObjectLayer');
    console.log("O.Opt InitSVGDocument - Added object layer");

    // Add and configure the overlay layer (for UI elements)
    this.svgOverlayLayer = this.svgDoc.AddLayer('svgOverlayLayer');
    this.svgOverlayLayer.ExcludeFromExport(true);
    console.log("O.Opt InitSVGDocument - Added overlay layer");

    // Add and configure the highlight layer (for highlighting elements)
    this.svgHighlightLayer = this.svgDoc.AddLayer('svgHighlightLayer');
    this.svgHighlightLayer.ExcludeFromExport(true);
    console.log("O.Opt InitSVGDocument - Added highlight layer");

    // Add and configure the collaboration layer
    this.svgCollabLayer = this.svgDoc.AddLayer('svgCollabLayer');
    this.svgCollabLayer.ExcludeFromExport(true);
    this.svgCollabLayer.AllowScaling(false);
    console.log("O.Opt InitSVGDocument - Added collaboration layer");

    // Get DOM elements
    this.MainAppElement = document.getElementById('main-app');
    this.WorkAreaElement = document.getElementById('svg-area');
    this.DocumentElement = document.getElementById('document-area');
    console.log("O.Opt InitSVGDocument - DOM elements acquired");

    // Initialize Hammer.js for touch/gesture events
    this.WorkAreaHammer = new Hammer(this.WorkAreaElement);
    this.DocumentElementHammer = new Hammer(this.DocumentElement);
    console.log("O.Opt InitSVGDocument - Hammer instances created");

    // Bind event handlers
    this.WorkAreaHammer.on('tap', DefaultEvt.Evt_WorkAreaHammerTap);
    this.WorkAreaHammer.on('wheel', DefaultEvt.Evt_WorkAreaMouseWheel);
    this.DocumentElementHammer.on('wheel', DefaultEvt.Evt_WorkAreaMouseWheel);
    this.WorkAreaHammer.on('dragstart', DefaultEvt.Evt_WorkAreaHammerDragStart);
    console.log("O.Opt InitSVGDocument - Event handlers registered");

    console.log("O.Opt InitSVGDocument - Output: SVG document initialization completed");
  }

  GetFractionDenominator() {
    console.log('O.Opt GetFractionDenominator - Input: No parameters');

    let denominator;
    const rulerScale = GlobalData.docHandler.rulerSettings.majorScale;

    // Determine denominator based on ruler scale
    if (rulerScale <= 1) {
      denominator = 16;
    } else if (rulerScale <= 2) {
      denominator = 8;
    } else if (rulerScale <= 4) {
      denominator = 4;
    } else if (rulerScale <= 8) {
      denominator = 2;
    } else {
      denominator = 1;
    }

    console.log('O.Opt GetFractionDenominator - Output:', denominator);
    return denominator;
  }

  UpdateSelectionAttributes(selectedObjects) {
    console.log('O.Opt UpdateSelectionAttributes - Input:', selectedObjects);

    if (!selectedObjects) {
      console.log('O.Opt UpdateSelectionAttributes - Output: No selection objects provided, exiting early');
      return;
    }

    // Constants for better readability
    const DRAWING_OBJECT_CLASS = ConstantData.DrawingObjectBaseClass;
    const TEXT_FACE = ConstantData.TextFace;
    const OBJECT_TYPES = ConstantData.ObjectTypes;
    const SHAPE_TYPE = ConstantData.ShapeType;
    const DIMENSION_FLAGS = ConstantData.DimensionFlags;
    const TEXT_FLAGS = ConstantData.TextFlags;

    // Local variables with descriptive names
    let targetObjectId;
    let objectIndex;
    let currentObject;
    let targetObject;
    let moveList;
    let businessManager;
    let currentTable;
    let currentTextFormat;
    let objectCount = 0;
    let dimensions;
    let objectBaseClass;
    let cornerRadiusValue;
    let textDirectionValue;
    let hasFoundTreeTop = false;
    let textData = {};
    let activeTableId;

    // Tree tracking
    const treeTopInfo = {
      topconnector: -1,
      topshape: -1,
      foundtree: false
    };

    // Get session data
    const sessionData = GlobalData.optManager.GetObjectPtr(this.theSEDSessionBlockID, false);

    // Get selection count if we have selected objects
    if (selectedObjects && (objectCount = selectedObjects.length)) {
      const firstSelectedObject = selectedObjects[0];

      // // Handle collaborator animations for selection changes
      // if (Collab.IsCollaborating() && Collab.Animation_AllowSelectionMessage(undefined)) {
      //   Collab.Animation_BuildMessage(
      //     0, 0,
      //     ConstantData.Collab_AnimationMessages.ChangeSelection,
      //     selectedObjects
      //   );
      // }
    }

    // Reset selection state properties
    this.ResetSelectionState();

    // Handle undo/redo state
    // const undoState = Collab.GetUndoState();
    const undoState = GlobalData.stateManager.GetUndoState();

    this.SelectionState.undo = undoState.undo;
    this.SelectionState.redo = undoState.redo;

    // Special case: dimension editing mode
    if (GlobalData.optManager.bInDimensionEdit) {
      this.HandleDimensionEditMode(sessionData);
      console.log('O.Opt UpdateSelectionAttributes - Output: Dimension edit mode handled');
      return;
    }

    // No selection or note editing mode
    if (objectCount === 0 || this.bInNoteEdit) {
      this.HandleEmptySelectionOrNoteEditMode(sessionData);
      console.log('O.Opt UpdateSelectionAttributes - Output: Empty selection or note edit mode handled');
      return;
    }

    // Get target selection object
    targetObjectId = this.GetTargetSelect();
    this.SelectionState.nselect = objectCount;

    // Validate target object
    if (targetObjectId >= 0) {
      targetObject = this.GetObjectPtr(targetObjectId, false);
      if (!(targetObject && targetObject instanceof BaseDrawingObject)) {
        targetObjectId = -1;
        sessionData.tselect = -1;
      }
    }

    // Process target object if valid
    if (targetObjectId >= 0) {
      this.ProcessTargetObject(targetObjectId, targetObject);

      // // Find tree top if applicable
      // if (Business.FindTreeTop(targetObject, 0, treeTopInfo)) {
      //   const topNodeId = treeTopInfo.topshape >= 0 ? treeTopInfo.topshape : treeTopInfo.topconnector;
      //   moveList = this.GetMoveList(topNodeId, false, true, false, null, false);
      // } else {
      //   moveList = this.GetMoveList(targetObjectId, false, true, false, null, false);
      // }
    }

    // Process each selected object
    for (objectIndex = 0; objectIndex < objectCount; objectIndex++) {
      const objectId = selectedObjects[objectIndex];

      // Check if selection allows alignment
      if (moveList) {
        if (moveList.indexOf(objectId) === -1) {
          this.SelectionState.allowalign = true;
        }
      } else if (objectId !== targetObjectId) {
        this.SelectionState.allowalign = true;
      }

      // Get and process the current object
      currentObject = this.GetObjectPtr(objectId, false);
      if (!(currentObject instanceof BaseDrawingObject)) continue;

      const objectToProcess = currentObject;
      // Process the object based on its type and properties
      this.ProcessSelectedObject(currentObject, objectToProcess, objectIndex);
    }

    // Clean up and finalize
    this.theMoveList = null;
    this.SelectionState.allowcopy = this.SelectionState.nselect > 0;

    // Create copy of selection attributes for UI
    const selectionAttributes = new SelectionAttributes();
    $.extend(true, selectionAttributes, this.SelectionState);

    // Handle pixel to point conversion for font size if needed
    if (GlobalData.docHandler.rulerSettings.showpixels && selectionAttributes.fontsize >= 0) {
      selectionAttributes.fontsize = this.PixelstoPoints(selectionAttributes.fontsize);
    }

    // Update UI with selection state (commented out as it's referencing SDUI)
    // SDUI.Commands.MainController.UpdateActiveSelection(selectionAttributes, false);

    console.log('O.Opt UpdateSelectionAttributes - Output:', {
      nselect: this.SelectionState.nselect,
      nshapeselected: this.SelectionState.nshapeselected,
      nlineselected: this.SelectionState.nlineselected,
      nconnectorselected: this.SelectionState.nconnectorselected,
      hastext: this.SelectionState.selectionhastext
    });
  }

  // Helper methods for UpdateSelectionAttributes would go here
  ResetSelectionState() {
    console.log('O.Opt ResetSelectionState - Input: No parameters');

    this.SelectionState.nselect = 0;
    this.SelectionState.nlineselected = 0;
    this.SelectionState.nshapeselected = 0;
    this.SelectionState.nconnectorselected = 0;
    this.SelectionState.ngroupsselected = 0;
    this.SelectionState.nimageselected = 0;
    this.SelectionState.IsTargetTable = false;
    this.SelectionState.allowalign = 0;
    this.SelectionState.width = 0;
    this.SelectionState.widthstr = '';
    this.SelectionState.height = 0;
    this.SelectionState.heightstr = '';
    this.SelectionState.left = 0;
    this.SelectionState.leftstr = '';
    this.SelectionState.top = 0;
    this.SelectionState.topstr = '';
    this.SelectionState.paste = this.GetClipboardType();
    this.SelectionState.TextDirection = 0;
    this.SelectionState.dimensions = 0;
    this.SelectionState.ncells_selected = 0;
    this.SelectionState.cell_notext = false;
    this.SelectionState.celltype = 0;
    this.SelectionState.cellselected = false;
    this.SelectionState.cellflags = 0;
    this.SelectionState.ntablesselected = 0;
    this.SelectionState.bInNoteEdit = this.bInNoteEdit;
    this.SelectionState.allowcopy = false;
    this.SelectionState.selectionhastext = false;
    this.SelectionState.npolylinecontainerselected = 0;
    this.SelectionState.projectTableSelected = false;
    this.SelectionState.lockedTableSelected = false;
    this.SelectionState.nsegs = 0;
    this.SelectionState.polyclosed = false;
    this.SelectionState.iswallselected = false;
    this.SelectionState.WallThickness = 0;
    this.SelectionState.subtype = 0;
    this.SelectionState.objecttype = 0;
    this.SelectionState.datasetElemID = -1;
    this.SelectionState.tselect = -1;
    this.SelectionState.fixedCornerRadius = -2;
    this.SelectionState.lineCornerRadius = -2;
    this.SelectionState.connectorCanHaveCurve = false;
    this.SelectionState.CurrentSelectionBusinessManager = GlobalData.gBusinessManager;
    this.SelectionState.isJiraCard = false;

    console.log('O.Opt ResetSelectionState - Output: Selection state reset');
  }

  HandleDimensionEditMode(sessionData) {
    console.log('O.Opt HandleDimensionEditMode - Input:', sessionData);

    const TEXT_FACE = ConstantData.TextFace;

    this.SelectionState.fontid = -1; // GlobalData.optManager.GetFontIdByName(GlobalData.optManager.theContentHeader.DimensionFont.fontName)
    this.SelectionState.fontsize = GlobalData.optManager.theContentHeader.DimensionFont.fontSize;
    this.SelectionState.bold = (GlobalData.optManager.theContentHeader.DimensionFont.face & TEXT_FACE.Bold) > 0;
    this.SelectionState.italic = (GlobalData.optManager.theContentHeader.DimensionFont.face & TEXT_FACE.Italic) > 0;
    this.SelectionState.underline = (GlobalData.optManager.theContentHeader.DimensionFont.face & TEXT_FACE.Underline) > 0;
    this.SelectionState.superscript = (GlobalData.optManager.theContentHeader.DimensionFont.face & TEXT_FACE.Subscript) > 0;
    this.SelectionState.subscript = (GlobalData.optManager.theContentHeader.DimensionFont.face & TEXT_FACE.Subscript) > 0;
    this.SelectionState.CurrentSelectionBusinessManager = null;

    console.log('O.Opt HandleDimensionEditMode - Output: Dimension edit mode processed');
  }


  HandleEmptySelectionOrNoteEditMode(sessionData) {
    console.log('O.Opt HandleEmptySelectionOrNoteEditMode - Input:', sessionData);

    const TEXT_FACE = ConstantData.TextFace;

    this.SelectionState.fontid = -1; // GlobalData.optManager.GetFontIdByName(sessionData.def.lf.fontName)
    this.SelectionState.fontsize = sessionData.def.style.Text.FontSize;
    this.SelectionState.bold = (sessionData.def.style.Text.Face & TEXT_FACE.Bold) > 0;
    this.SelectionState.italic = (sessionData.def.style.Text.Face & TEXT_FACE.Italic) > 0;
    this.SelectionState.underline = (sessionData.def.style.Text.Face & TEXT_FACE.Underline) > 0;
    this.SelectionState.superscript = (sessionData.def.style.Text.Face & TEXT_FACE.Subscript) > 0;
    this.SelectionState.subscript = (sessionData.def.style.Text.Face & TEXT_FACE.Subscript) > 0;
    this.SelectionState.TextDirection = (sessionData.def.textflags & ConstantData.TextFlags.SED_TF_HorizText) === 0;
    this.SelectionState.dimensions =
      (sessionData.dimensions & ConstantData.DimensionFlags.SED_DF_Always) ||
      (sessionData.dimensions & ConstantData.DimensionFlags.SED_DF_Select);

    // Handle business manager for note edit
    if (this.bInNoteEdit && this.curNoteShape >= 0) {
      const businessManager = Business.GetSelectionBusinessManager(this.curNoteShape);
      if (businessManager) {
        this.SelectionState.CurrentSelectionBusinessManager = businessManager;
      }
    }

    console.log('O.Opt HandleEmptySelectionOrNoteEditMode - Output: Empty selection or note edit mode processed');
  }


  ProcessTargetObject(targetId, targetObject) {
    console.log('O.Opt ProcessTargetObject - Input:', { targetId, targetObject });

    // Get the business manager for the target object
    const businessManager = Business.GetSelectionBusinessManager(targetId);
    if (businessManager) {
      this.SelectionState.CurrentSelectionBusinessManager = businessManager;
    }

    this.SelectionState.tselect = targetId;

    if (targetObject) {
      this.SelectionState.colorfilter = targetObject.colorfilter;
      targetObject.GetPositionRect();
      this.SelectionState.subtype = targetObject.subtype;
      this.SelectionState.objecttype = targetObject.objecttype;
      this.SelectionState.datasetElemID = targetObject.datasetElemID;

      // Get dimensions for display
      const dimensions = targetObject.GetDimensionsForDisplay();
      this.SelectionState.left = dimensions.x;
      this.SelectionState.top = dimensions.y;
      this.SelectionState.width = dimensions.width;
      this.SelectionState.height = dimensions.height;

      // Handle wall objects
      if (targetObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) {
        this.SelectionState.WallThickness = targetObject.StyleRecord.Line.Thickness;
      }

      // Format dimensions as strings
      this.SelectionState.leftstr = targetObject.GetLengthInRulerUnits(
        this.SelectionState.left,
        GlobalData.docHandler.rulerSettings.originx
      );
      this.SelectionState.topstr = targetObject.GetLengthInRulerUnits(
        this.SelectionState.top,
        GlobalData.docHandler.rulerSettings.originy
      );
      this.SelectionState.widthstr = targetObject.GetLengthInRulerUnits(this.SelectionState.width);

      if (dimensions.height !== 0) {
        this.SelectionState.heightstr = targetObject.GetLengthInRulerUnits(this.SelectionState.height);
      } else {
        this.SelectionState.heightstr = '';
      }

      // Handle table objects
      const table = GlobalData.optManager.Table_HideUI(targetObject) ? null : targetObject.GetTable(false);
      if (table) {
        this.SelectionState.IsTargetTable = true;
        this.SelectionState.NTableRows = table.rows.length;
        this.SelectionState.NTableCols = table.cols.length;
        this.SelectionState.ntablesselected++;
      }

      // Check if selection has text
      this.SelectionState.selectionhastext = targetObject.DataID >= 0;
    }

    console.log('O.Opt ProcessTargetObject - Output: Target object processed');
  }

  ProcessSelectedObject(object, textObject, objectIndex) {
    console.log('O.Opt ProcessSelectedObject - Input:', { object, textObject, objectIndex });

    const TEXT_FACE = ConstantData.TextFace;
    const DRAWING_OBJECT_CLASS = ConstantData.DrawingObjectBaseClass;

    // Handle image URLs
    if (object.ImageURL && object.ImageURL.length) {
      this.SelectionState.nimageselected++;
    }

    // Handle swimlane or shape container
    if (object.IsSwimlane() || object instanceof ShapeContainer) {
      this.SelectionState.lockedTableSelected = true;
      this.SelectionState.IsTargetTable = true;
    }

    // Handle tables
    const table = object.GetTable(false);
    if (table) {
      if ((table.flags & ListManager.Table.TableFlags.SDT_TF_LOCK) > 0) {
        this.SelectionState.lockedTableSelected = true;
      }

      if (SDUI.AppSettings.Application !== Resources.Application.Builder &&
        object.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER) {
        this.SelectionState.lockedTableSelected = true;
      }

      if (GlobalData.optManager.Table_GetCellWithType(table, ListManager.Table.CellTypes.SD_CT_JIRA_ISSUEKEY)) {
        this.SelectionState.isJiraCard = true;
      }
    }

    // Handle wall objects
    if (object.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) {
      this.SelectionState.iswallselected = true;
    }

    // Get base class, handling special cases
    let objectClass = object.DrawingObjectBaseClass;
    if (object instanceof PolyLineContainer) {
      objectClass = DRAWING_OBJECT_CLASS.SHAPE;
    }

    // Process object based on its class
    switch (objectClass) {
      case DRAWING_OBJECT_CLASS.SHAPE:
        this.ProcessShapeObject(object, table);
        break;

      case DRAWING_OBJECT_CLASS.CONNECTOR:
        this.ProcessConnectorObject(object);
      // Fall through to LINE case

      case DRAWING_OBJECT_CLASS.LINE:
        this.ProcessLineObject(object);
        break;
    }

    // Handle text and group objects
    if (textObject.DataID >= 0) {
      this.SelectionState.selectionhastext = true;
    }

    if (object instanceof GroupSymbol || object.NativeID >= 0) {
      this.SelectionState.ngroupsselected++;
    }

    // Handle active table
    const activeTableId = this.Table_GetActiveID();
    if (activeTableId === object.BlockID) {
      this.Table_UpdateSelectionAttributes(activeTableId, false);
    } else {
      this.HandleTextFormatAttributes(textObject, objectIndex);
    }

    // Handle special object types
    if (object instanceof PolyLineContainer) {
      this.SelectionState.npolylinecontainerselected++;
    }

    if (object.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASK) {
      this.SelectionState.projectTableSelected = true;
    }

    // Handle polyline objects
    if (object instanceof PolyLine && object.polylist && object.polylist.segs) {
      this.SelectionState.nsegs = object.polylist.segs.length;
      this.SelectionState.polyclosed = object.polylist.closed;
    }

    // Update dimensions flags
    this.SelectionState.dimensions |= object.Dimensions & (
      ConstantData.DimensionFlags.SED_DF_Always | ConstantData.DimensionFlags.SED_DF_Select
    );

    console.log('O.Opt ProcessSelectedObject - Output: Object processed');
  }

  ProcessShapeObject(shape, table) {
    console.log('O.Opt ProcessShapeObject - Input:', { shape, hasTable: !!table });

    this.SelectionState.nshapeselected++;

    if (table) {
      this.SelectionState.ntablesselected++;
    }

    // Handle rectangle corner radius
    if (shape.ShapeType === ConstantData.ShapeType.RECT || shape.ShapeType === ConstantData.ShapeType.RRECT) {
      if (shape.moreflags & ConstantData.ObjMoreFlags.SED_MF_FixedRR) {
        if (this.SelectionState.fixedCornerRadius === -2) {
          this.SelectionState.fixedCornerRadius = 100 * shape.shapeparam;
        } else if (this.SelectionState.fixedCornerRadius !== 100 * shape.shapeparam) {
          this.SelectionState.fixedCornerRadius = -1;
        }
      } else if (this.SelectionState.fixedCornerRadius === -2 && shape.shapeparam === 0) {
        this.SelectionState.fixedCornerRadius = 0;
      } else {
        this.SelectionState.fixedCornerRadius = -1;
      }
    }

    console.log('O.Opt ProcessShapeObject - Output: Shape object processed');
  }

  ProcessConnectorObject(connector) {
    console.log('O.Opt ProcessConnectorObject - Input:', connector);

    this.SelectionState.nconnectorselected++;

    if (connector.AllowCurveOnConnector()) {
      this.SelectionState.connectorCanHaveCurve = true;

      if (this.SelectionState.lineCornerRadius === -2) {
        this.SelectionState.lineCornerRadius = connector.arraylist.curveparam;
      } else if (this.SelectionState.lineCornerRadius !== connector.arraylist.curveparam) {
        this.SelectionState.lineCornerRadius = -1;
      }
    }

    console.log('O.Opt ProcessConnectorObject - Output: Connector object processed');
  }

  ProcessLineObject(lineObject) {
    console.log('O.Opt ProcessLineObject - Input:', lineObject);

    // Increment count of selected line objects
    this.SelectionState.nlineselected++;

    // Handle text direction consistency across selected objects
    const lineTextDirection = lineObject.TextDirection;
    if (this.SelectionState.TextDirection === 0) {
      // First line sets the direction
      this.SelectionState.TextDirection = lineTextDirection;
    } else if (this.SelectionState.TextDirection !== lineTextDirection) {
      // If directions don't match, mark as inconsistent
      this.SelectionState.TextDirection = -1;
    }

    // Handle corner radius for segmented lines
    if (lineObject.LineType === ConstantData.LineType.SEGLINE) {
      if (this.SelectionState.lineCornerRadius === -2) {
        // First segmented line sets the corner radius
        this.SelectionState.lineCornerRadius = lineObject.segl.curveparam;
      } else if (this.SelectionState.lineCornerRadius !== lineObject.segl.curveparam) {
        // If corner radii don't match, mark as inconsistent
        this.SelectionState.lineCornerRadius = -1;
      }
    }

    console.log('O.Opt ProcessLineObject - Output: Line processed', {
      lineCount: this.SelectionState.nlineselected,
      textDirection: this.SelectionState.TextDirection,
      cornerRadius: this.SelectionState.lineCornerRadius
    });
  }

  HandleTextFormatAttributes(textObject, objectIndex) {
    console.log('O.Opt HandleTextFormatAttributes - Input:', { textObject, objectIndex });

    const TEXT_FACE = ConstantData.TextFace;
    const textData = {};

    const textFormat = textObject.GetTextFormat(true, textData);
    if (textData.hastext) {
      this.SelectionState.selectionhastext = true;
    }

    if (objectIndex === 0) {
      // First object sets the initial values
      this.SelectionState.fontid = textFormat.FontId;
      this.SelectionState.fontsize = textFormat.FontSize;
      this.SelectionState.bold = (textFormat.Face & TEXT_FACE.Bold) > 0;
      this.SelectionState.italic = (textFormat.Face & TEXT_FACE.Italic) > 0;
      this.SelectionState.underline = (textFormat.Face & TEXT_FACE.Underline) > 0;
      this.SelectionState.superscript = (textFormat.Face & TEXT_FACE.Superscript) > 0;
      this.SelectionState.subscript = (textFormat.Face & TEXT_FACE.Subscript) > 0;
    } else {
      // Subsequent objects may cause values to be cleared if they differ
      if (this.SelectionState.fontid !== textFormat.FontId) {
        this.SelectionState.fontid = -1;
      }
      if (this.SelectionState.fontsize !== textFormat.FontSize) {
        this.SelectionState.fontsize = -1;
      }
      if (this.SelectionState.bold !== ((textFormat.Face & TEXT_FACE.Bold) > 0)) {
        this.SelectionState.bold = false;
      }
      if (this.SelectionState.italic !== ((textFormat.Face & TEXT_FACE.Italic) > 0)) {
        this.SelectionState.italic = false;
      }
      if (this.SelectionState.underline !== ((textFormat.Face & TEXT_FACE.Underline) > 0)) {
        this.SelectionState.underline = false;
      }
      if (this.SelectionState.superscript !== ((textFormat.Face & TEXT_FACE.Superscript) > 0)) {
        this.SelectionState.superscript = false;
      }
      if (this.SelectionState.subscript !== ((textFormat.Face & TEXT_FACE.Subscript) > 0)) {
        this.SelectionState.subscript = false;
      }
    }

    console.log('O.Opt HandleTextFormatAttributes - Output: Text format attributes processed');
  }

  GetObjectPtr(blockId, isPreserveBlock) {
    // console.log('O.Opt GetObjectPtr - Input:', { blockId, isPreserveBlock });

    const object = GlobalData.objectStore.GetObject(blockId);
    if (object == null || blockId < 0) {
      console.log('O.Opt GetObjectPtr - Output: null (invalid block ID or not found)');
      return null;
    }

    const result = isPreserveBlock ?
      GlobalData.objectStore.PreserveBlock(blockId).Data :
      object.Data;

    // console.log('O.Opt GetObjectPtr - Output:', result);
    return result;
  }

  GetClipboardType() {
    console.log('O.Opt GetClipboardType - Input: No parameters');

    // Get the text edit session data
    const tedSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);

    // Initialize clipboard manager
    GlobalData.clipboardManager.Get();

    let clipboardType;

    // Handle case when text editing is active or note editing is active
    if (tedSession.theActiveTextEditObjectID !== -1 || this.bInNoteEdit) {
      if (tedSession.theActiveTableObjectID >= 0 &&
        this.theContentHeader.ClipboardType === ConstantData.ClipboardType.Table &&
        this.theContentHeader.ClipboardBuffer) {
        clipboardType = ConstantData.ClipboardType.Table;
      } else if (this.theTextClipboard && this.theTextClipboard.text) {
        clipboardType = ConstantData.ClipboardType.Text;
      } else {
        clipboardType = ConstantData.ClipboardType.None;
      }
    }
    // Handle case when table is active
    else if (tedSession.theActiveTableObjectID >= 0 &&
      ((this.theContentHeader.ClipboardType === ConstantData.ClipboardType.Table &&
        this.theContentHeader.ClipboardBuffer) ||
        (this.theTextClipboard && this.theTextClipboard.text))) {
      clipboardType = ConstantData.ClipboardType.Table;
    }
    // Handle case when LM content is in clipboard
    else if (GlobalData.optManager.theContentHeader.ClipboardBuffer &&
      this.theContentHeader.ClipboardType === ConstantData.ClipboardType.LM) {
      clipboardType = ConstantData.ClipboardType.LM;
    }
    // Handle case when text is selected and text is in clipboard
    else if (this.GetTargetSelect() >= 0 && this.theTextClipboard && this.theTextClipboard.text) {
      clipboardType = ConstantData.ClipboardType.Text;
    }
    // Default case: no valid clipboard content
    else {
      clipboardType = ConstantData.ClipboardType.None;
    }

    console.log('O.Opt GetClipboardType - Output:', clipboardType);
    return clipboardType;
  }

  GetTargetSelect() {
    console.log('O.Opt GetTargetSelect - Input: No parameters');

    // Get session data
    const sessionData = this.GetObjectPtr(this.theSEDSessionBlockID, false);

    // Check if table is active and update target select if needed
    const activeTableId = this.Table_GetActiveID();
    if (activeTableId >= 0) {
      sessionData.tselect = activeTableId;
    }

    // Default to no selection
    let targetSelectId = -1;

    // Verify the selected object is valid
    if (sessionData.tselect >= 0) {
      const selectedObject = GlobalData.optManager.GetObjectPtr(sessionData.tselect, false);
      if (selectedObject && selectedObject instanceof BaseDrawingObject) {
        targetSelectId = sessionData.tselect;
      }
    }

    console.log('O.Opt GetTargetSelect - Output:', targetSelectId);
    return targetSelectId;
  }

  Table_GetActiveID() {
    console.log('O.Opt Table_GetActiveID - Input: No parameters');

    const activeTableId = this.GetObjectPtr(this.theTEDSessionBlockID, false).theActiveTableObjectID;

    console.log('O.Opt Table_GetActiveID - Output:', activeTableId);
    return activeTableId;
  }

  BuildArrowheadLookupTables() {
    console.log("O.Opt BuildArrowheadLookupTables - Input: No parameters");

    const arrowDefs = new ArrowDefs().uiArrowDefs;
    const arrowSizes = new ArrowSizes().uiarrowSizes;

    // Initialize lookup tables to the correct size
    ConstantData1.ArrowheadLookupTable.length = arrowDefs.length;
    for (let index = 0; index < arrowDefs.length; index++) {
      ConstantData1.ArrowheadLookupTable[arrowDefs[index].id] = arrowDefs[index];
    }

    // Initialize size table to the correct size
    ConstantData1.ArrowheadSizeTable.length = arrowSizes.length;
    for (let index = 0; index < arrowSizes.length; index++) {
      ConstantData1.ArrowheadSizeTable[index] = arrowSizes[index];
    }

    console.log("O.Opt BuildArrowheadLookupTables - Output: Arrowhead lookup tables built");
  }

  SetEditMode(stateMode, cursorType?, shouldAddToList?, preserveExisting?) {
    console.log("O.Opt SetEditMode - Input:", { stateMode, cursorType, shouldAddToList, preserveExisting });

    let actualCursorType = cursorType;

    // Initialize edit mode list if needed
    if (this.editModeList && (shouldAddToList || preserveExisting)) {
      // Keep existing list
    } else {
      this.editModeList = [];
    }

    // Notify business manager if available
    if (GlobalData.gBusinessManager && GlobalData.gBusinessManager.NotifySetEditMode) {
      GlobalData.gBusinessManager.NotifySetEditMode(stateMode);
    }

    // If no cursor type provided, determine it based on state mode
    if (!actualCursorType) {
      switch (stateMode) {
        case ConstantData.EditState.STAMP:
          actualCursorType = ConstantData.CursorType.STAMP;
          break;
        case ConstantData.EditState.TEXT:
          actualCursorType = ConstantData.CursorType.TEXT;
          break;
        case ConstantData.EditState.FORMATPAINT:
          actualCursorType = ConstantData.CursorType.PAINT;
          break;
        case ConstantData.EditState.LINKCONNECT:
          actualCursorType = ConstantData.CursorType.ANCHOR;
          break;
        case ConstantData.EditState.LINKJOIN:
          actualCursorType = ConstantData.CursorType.EDIT_CLOSE;
          break;
        case ConstantData.EditState.EDIT:
          actualCursorType = ConstantData.CursorType.EDIT;
          break;
        case ConstantData.EditState.DRAGCONTROL:
          actualCursorType = ConstantData.CursorType.NESW_RESIZE;
          break;
        case ConstantData.EditState.DRAGSHAPE:
          actualCursorType = ConstantData.CursorType.MOVE;
          break;
        case ConstantData.EditState.GRAB:
          actualCursorType = ConstantData.CursorType.GRAB;
          break;
        default:
          actualCursorType = ConstantData.CursorType.DEFAULT;
      }
    }

    // Set the cursor
    this.svgDoc.SetCursor(actualCursorType);

    // Update edit mode list
    if (shouldAddToList || !this.editModeList.length) {
      this.editModeList.push({
        mode: stateMode,
        cursor: actualCursorType
      });
    } else {
      this.editModeList[this.editModeList.length - 1].mode = stateMode;
      this.editModeList[this.editModeList.length - 1].cursor = actualCursorType;
    }

    // Update cursors for highlighted shape
    if (this.curHiliteShape >= 0) {
      const highlightedObject = GlobalData.objectStore.GetObject(this.curHiliteShape);
      if (highlightedObject) {
        highlightedObject.Data.SetCursors();
      }
    }

    console.log("O.Opt SetEditMode - Output:", { mode: stateMode, cursor: actualCursorType });
  }

  ShowXY(showCoordinates) {
    // console.log("O.Opt ShowXY - Input:", { showCoordinates });
    // Show the x and y coordinates of the mouse pointer
    // console.log("O.Opt ShowXY - Output: Coordinates display updated");
  }

  UpdateDisplayCoordinates(dimensions, position, cursorType, drawingObject) {
    // console.log("O.Opt UpdateDisplayCoordinates - Input:", {
    //   dimensions,
    //   position,
    //   cursorType,
    //   drawingObject: drawingObject ? drawingObject.BlockID : null
    // });

    // Set default cursor type if not provided
    if (cursorType == null) {
      // cursorType = CollabOverlayContoller.CursorTypes.Default;
      cursorType = "DEFAULT";
    }

    // // Handle collaboration cursor movement
    // if (Collab.IsCollaborating() && position) {
    //   const currentTime = Date.now();
    //   if (currentTime - Collab.MoveTimestamp > Collab.MoveDelay) {
    //     const message = {
    //       CursorType: cursorType
    //     };
    //     Collab.Animation_BuildMessage(
    //       position.x,
    //       position.y,
    //       ConstantData.Collab_AnimationMessages.CursorMove,
    //       message
    //     );
    //     Collab.MoveTimestamp = currentTime;
    //   }
    // }

    // Update ruler displays if rulers are enabled
    if (GlobalData.docHandler.documentConfig.showRulers) {
      let showFractionalInches = 0;
      let showFeetAsInches = 0;
      const useFeet = GlobalData.docHandler.rulerSettings.useInches &&
        GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Feet;

      // Configure display options for feet/inch mode
      if (useFeet) {
        showFractionalInches = showFeetAsInches = ConstantData.DimensionFlags.SED_DF_ShowFractionalInches;
        if (drawingObject) {
          showFeetAsInches = Utils.SetFlag(
            showFractionalInches,
            ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches,
            (drawingObject.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches) > 0
          );
        }
      }

      // Update dimension display
      if (dimensions) {
        const xLength = this.GetLengthInRulerUnits(dimensions.x, false, GlobalData.docHandler.rulerSettings.originx, showFractionalInches);
        const yLength = this.GetLengthInRulerUnits(dimensions.y, false, GlobalData.docHandler.rulerSettings.originy, showFractionalInches);
        const width = this.GetLengthInRulerUnits(dimensions.width, false, null, showFeetAsInches);
        const height = this.GetLengthInRulerUnits(dimensions.height, false, null, showFeetAsInches);

        // Helper function to format number values for display (assuming it's defined elsewhere)
        const formatValue = (value) => value ? value : "";

        // // Update UI controls with the dimension values
        // const workArea = Resources.Controls.WorkArea;

        // const leftEdit = workArea.LeftEdit;
        // leftEdit.GetControl();
        // if (leftEdit.Control) {
        //   leftEdit.Control[0].value = formatValue(NumberToString(xLength, useFeet));
        // }

        // const topEdit = workArea.TopEdit;
        // topEdit.GetControl();
        // if (topEdit.Control) {
        //   topEdit.Control[0].value = formatValue(NumberToString(yLength, useFeet));
        // }

        // const widthEdit = workArea.WidthEdit;
        // widthEdit.GetControl();
        // if (widthEdit.Control) {
        //   widthEdit.Control[0].value = formatValue(NumberToString(width, useFeet));
        // }

        // const heightEdit = workArea.HeightEdit;
        // heightEdit.GetControl();
        // if (heightEdit.Control) {
        //   heightEdit.Control[0].value = formatValue(NumberToString(height, useFeet));
        // }
      }

      // Constrain position to document bounds
      if (position) {
        position.x = Math.max(0, position.x);
        position.y = Math.max(0, position.y);

        const sessionBlock = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
        position.x = Math.min(sessionBlock.dim.x, position.x);
        position.y = Math.min(sessionBlock.dim.y, position.y);
      }
    }

    // console.log("O.Opt UpdateDisplayCoordinates - Output: Coordinates updated in UI");
  }

  IsWheelClick(event) {
    console.log("O.Opt IsWheelClick - Input:", event);

    let isMiddleButtonClick = false;

    // Handle different event types
    if (event.gesture) {
      event = event.gesture.srcEvent;
    }

    if (event instanceof MouseEvent) {
      // Button 2 is middle button
      isMiddleButtonClick = (event.which === 2);
    } else if ('onpointerdown' in window && event instanceof PointerEvent) {
      isMiddleButtonClick = (event.which === 2);
    }

    console.log("O.Opt IsWheelClick - Output:", isMiddleButtonClick);
    return isMiddleButtonClick;
  }

  RubberBandSelect_Cancel(event) {
    console.log("O.Opt RubberBandSelect_Cancel - Input:", event);

    if (GlobalData.optManager.theRubberBand) {
      // Unbind related event handlers
      GlobalData.optManager.WorkAreaHammer.off('drag');
      GlobalData.optManager.WorkAreaHammer.off('dragend');

      // Restore default drag start handler
      GlobalData.optManager.WorkAreaHammer.on('dragstart', DefaultEvt.Evt_WorkAreaHammerDragStart);

      // Clean up resources
      GlobalData.optManager.ResetAutoScrollTimer();
      GlobalData.optManager.svgOverlayLayer.RemoveElement(GlobalData.optManager.theRubberBand);

      // Reset rubber band properties
      GlobalData.optManager.theRubberBand = null;
      GlobalData.optManager.theRubberBandStartX = 0;
      GlobalData.optManager.theRubberBandStartY = 0;
      GlobalData.optManager.theRubberBandFrame = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }

    console.log("O.Opt RubberBandSelect_Cancel - Output: Rubber band selection canceled");
  }

  SetUIAdaptation(event) {
  }


  SetDocumentScale(scaleFactor, isAnimated) {
    console.log('O.Opt SetDocumentScale: input', { scaleFactor, isAnimated });

    if (this.svgDoc) {
      GlobalData.docHandler.SetZoomFactor(scaleFactor, isAnimated);
    }

    console.log('O.Opt SetDocumentScale: output');
  }

  UpdateDocumentScale() {
    console.log('O.Opt UpdateDocumentScale: input');

    if (this.svgDoc) {
      const activeEdit = this.svgDoc.GetActiveEdit();

      if (!activeEdit) {
        this.HideAllSVGSelectionStates();
        this.RenderAllSVGSelectionStates();
      }

      // Double IdleZoomControls();
    }

    console.log('O.Opt UpdateDocumentScale: output');
  }

  HideAllSVGSelectionStates() {
    console.log('O.Opt HideAllSVGSelectionStates: input');

    const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, false);
    this.SetDimensionVisibility(selectedList, false);

    if (!GlobalData.optManager.FromOverlayLayer) {
      this.svgOverlayLayer.RemoveAll();
    }

    this.ClearAllActionArrowTimers();
    this.ShowOverlayLayer();

    console.log('O.Opt HideAllSVGSelectionStates: output');
  }

  SetDimensionVisibility(objects, isVisible) {
    console.log('O.Opt SetDimensionVisibility: input', { objects, isVisible });

    let objectCount = objects.length;
    for (let i = 0; i < objectCount; i++) {
      let object = GlobalData.optManager.GetObjectPtr(objects[i], false);
      if (object && object.ShowOrHideDimensions) {
        object.ShowOrHideDimensions(isVisible);
      }
    }

    console.log('O.Opt SetDimensionVisibility: output');
  }

  IsRightClick(event) {
    console.log('O.Opt isRightClick: input', event);

    let isRightClick = false;

    if (event.gesture) {
      event = event.gesture.srcEvent;
    }

    if (event instanceof MouseEvent) {
      isRightClick = (event.which === 3 || (event.ctrlKey && event.metaKey));
    } else if ('onpointerdown' in window && event instanceof PointerEvent) {
      isRightClick = (event.which === 3);
    }

    console.log('O.Opt isRightClick: output', isRightClick);
    return isRightClick;
  }

  ClearSelectionClick() {
    console.log('O.Opt ClearSelectionClick: input');

    this.CloseEdit();
    this.ClearAnySelection(false);
    this.UpdateSelectionAttributes(null);

    console.log('O.Opt ClearSelectionClick: output');
  }

  CloseEdit(skipShapeClose: boolean, closeOption: any, skipTooltipProcessing: boolean) {
    console.log("O.Opt CloseEdit - Input:", { skipShapeClose, closeOption, skipTooltipProcessing });

    const isProcessingMessage = false;

    if (!isProcessingMessage/*Collab.IsProcessingMessage()*/) {
      let isNudgeActive = false;
      if (this.NudgeOpen) {
        isNudgeActive = true;
        GlobalData.optManager.CloseOpenNudge();
      }
      if (!skipTooltipProcessing) {
        this.HandleDataTooltipClose(true);
      }
      this.SetFormatPainter(true, false);
      this.DeactivateAllTextEdit(false, !skipShapeClose);
      if (this.bInNoteEdit) {
        this.Note_CloseEdit();
      }
      if (!skipShapeClose) {
        this.CloseShapeEdit(closeOption);
      }
    }
    console.log("O.Opt CloseEdit - Output: done");
  }

  ClearAnySelection(preserveBlock: boolean) {
    console.log("O.Opt ClearAnySelection - Input:", { preserveBlock });
    const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, preserveBlock);
    if (selectedList.length !== 0) {
      this.SetTargetSelect(-1, preserveBlock);
      this.HideAllSVGSelectionStates();
      selectedList.length = 0;
    }
    console.log("O.Opt ClearAnySelection - Output: selection cleared");
  }

  SetTargetSelect(targetId: number, preserveSession: boolean) {
    console.log("O.Opt SetTargetSelect - Input:", { targetId, preserveSession });
    let sessionData = this.GetObjectPtr(this.theSEDSessionBlockID, preserveSession);
    sessionData.tselect = targetId;
    let dimensions: any = null;
    if (targetId > 0) {
      const drawingObject = this.GetObjectPtr(targetId, false);
      if (drawingObject && drawingObject instanceof BaseDrawingObject) {
        dimensions = drawingObject.GetDimensionsForDisplay();
      } else {
        targetId = -1;
        sessionData.tselect = targetId;
      }
    }
    if (dimensions) {
      this.ShowFrame(true);
      this.UpdateDisplayCoordinates(dimensions, null, null, /* drawingObject */ null);
    } else {
      this.ShowFrame(false);
    }
    console.log("O.Opt SetTargetSelect - Output:", { targetId: sessionData.tselect, dimensions });
  }

  ShowFrame(isShowFrame: boolean) {
    console.log('O.Opt ShowFrame - Input:', { isShowFrame });

    const isShowRulers = GlobalData.docHandler.documentConfig.showRulers;

    if (!isShowRulers) {
      console.log('O.Opt ShowFrame - Output: Rulers are not shown');
      return;
    }

    // Double show frame details

    console.log('O.Opt ShowFrame - Output: Frame visibility set to', isShowFrame);
  }


  StartRubberBandSelect(event: any) {
    console.log('O.Opt StartRubberBandSelect - Input event:', event);
    try {
      if (GlobalData.docHandler.IsReadOnly()) {
        console.log('O.Opt StartRubberBandSelect - Document is read-only; aborting.');
        return;
      }

      if (this.cachedWidth) {
        try {
          GlobalData.optManager.CloseEdit();
          GlobalData.optManager.ChangeWidth(this.cachedWidth);
        } catch (error) {
          GlobalData.optManager.ExceptionCleanup(error);
          throw error;
        }
      }
      if (this.cachedHeight) {
        try {
          GlobalData.optManager.CloseEdit();
          GlobalData.optManager.ChangeHeight(this.cachedHeight);
        } catch (error) {
          GlobalData.optManager.ExceptionCleanup(error);
          throw error;
        }
      }
      if (this.currentModalOperation === ConstantData2.ModalOperations.FORMATPAINTER) {
        if (this.FormatPainterSticky) {
          console.log('O.Opt StartRubberBandSelect - FormatPainterSticky active; aborting.');
          return;
        }
        this.SetFormatPainter(true, false);
      }

      // Ensure any active edit is closed
      this.GetObjectPtr(this.theTEDSessionBlockID, false);
      GlobalData.optManager.CloseEdit();

      // Create the rubber band shape as a rectangle
      const rubberBandShape = this.svgDoc.CreateShape(ConstantData.CreateShapeType.RECT);
      rubberBandShape.SetStrokeColor('black');
      if (GlobalData.optManager.isAndroid) {
        rubberBandShape.SetFillColor('none');
        rubberBandShape.SetFillOpacity(0);
      } else {
        rubberBandShape.SetFillColor('black');
        rubberBandShape.SetFillOpacity(0.03);
      }

      const zoomFactorInverse = 1 / GlobalData.docHandler.GetZoomFactor();
      rubberBandShape.SetStrokeWidth(1 * zoomFactorInverse);

      if (!GlobalData.optManager.isAndroid) {
        const strokePattern = 2 * zoomFactorInverse + ',' + zoomFactorInverse;
        rubberBandShape.SetStrokePattern(strokePattern);
      }

      // Convert window coordinates to document coordinates
      const startCoordinates = this.svgDoc.ConvertWindowToDocCoords(
        event.gesture.center.clientX,
        event.gesture.center.clientY
      );
      GlobalData.optManager.theRubberBandStartX = startCoordinates.x;
      GlobalData.optManager.theRubberBandStartY = startCoordinates.y;
      rubberBandShape.SetSize(1, 1);
      rubberBandShape.SetPos(startCoordinates.x, startCoordinates.y);
      GlobalData.optManager.svgOverlayLayer.AddElement(rubberBandShape);

      console.log('O.Opt StartRubberBandSelect - Rubber band shape created:', rubberBandShape);
      GlobalData.optManager.theRubberBand = rubberBandShape;
      GlobalData.optManager.EndStampSession();

      // Bind hammer events for the rubber band dragging
      GlobalData.optManager.WorkAreaHammer.on('drag', DefaultEvt.Evt_RubberBandDrag);
      GlobalData.optManager.WorkAreaHammer.on('dragend', DefaultEvt.Evt_RubberBandDragEnd);

      console.log('O.Opt StartRubberBandSelect - Output rubber band set successfully:', GlobalData.optManager.theRubberBand);
    } catch (error) {
      console.log('O.Opt StartRubberBandSelect - Error:', error);
      GlobalData.optManager.RubberBandSelectExceptionCleanup(error);
      GlobalData.optManager.ExceptionCleanup(error);
      throw error;
    }
  }

  HandleDataTooltipClose(isCompleteOperation) {
    console.log('O.Opt HandleDataTooltipClose - Input:', { isCompleteOperation });

    this.ClearFieldDataDatePicker();

    if (this.ActiveDataTT && this.ActiveDataTT.dataChanged) {
      this.CompleteOperation(null, isCompleteOperation);
      this.ActiveDataTT.dataChanged = false;
    }

    console.log('O.Opt HandleDataTooltipClose - Output: done');
  }

  ClearFieldDataDatePicker() {
    console.log('O.Opt ClearFieldDataDatePicker - Input:');

    if (this._curDatePickerElem && this._curDatePickerElem.datepicker) {
      this._curDatePickerElem.datepicker('hide');
    }

    this._curDatePickerElem = null;

    console.log('O.Opt ClearFieldDataDatePicker - Output: DatePicker cleared');
  }



  ClearAllActionArrowTimers() {
    console.log('O.Opt ClearAllActionArrowTimers: input');

    const visibleObjects = this.VisibleZList();
    for (let i = 0; i < visibleObjects.length; i++) {
      const object = this.GetObjectPtr(visibleObjects[i], false);
      if (object && object.actionArrowHideTimerID !== -1) {
        this.actionArrowHideTimer.clearTimeout(object.actionArrowHideTimerID);
        object.actionArrowHideTimerID = -1;
      }
    }

    console.log('O.Opt ClearAllActionArrowTimers: output');
  }

  VisibleZList() {
    console.log('O.Opt VisibleZList: input');

    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, false);
    const layers = layersManager.layers;
    const numberOfLayers = layersManager.nlayers;
    const activeLayerIndex = layersManager.activelayer;
    let visibleZList = [];

    for (let i = numberOfLayers - 1; i >= 0; i--) {
      const layer = layers[i];
      if (i === activeLayerIndex || (layer.flags & ConstantData.LayerFlags.SDLF_Visible)) {
        visibleZList = visibleZList.concat(layer.zList);
      }
    }

    console.log('O.Opt VisibleZList: output', visibleZList);
    return visibleZList;
  }

  ShowOverlayLayer() {
    console.log('O.Opt ShowOverlayLayer: input');
    this.svgOverlayLayer.SetVisible(true);
    console.log('O.Opt ShowOverlayLayer: output');
  }

  RenderAllSVGSelectionStates() {
    console.log('O.Opt RenderAllSVGSelectionStates - Input: No parameters');

    // Get the visible objects list and the currently selected objects
    const visibleObjectIds = this.ActiveVisibleZList();
    const visibleObjectCount = visibleObjectIds.length;
    const selectedList = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data;

    let objectIndex = 0;
    let indexInSelectedList = -1;
    let objectId = 0;
    let drawingObject = null;
    let svgElement = null;
    let actionTriggerElement = null;
    let actionTriggerId = null;
    const targetSelectedId = this.GetTargetSelect();

    // List of dimension element types to check for visibility
    const dimensionElementTypes = [
      ConstantData.SVGElementClass.DIMENSIONLINE,
      ConstantData.SVGElementClass.DIMENSIONTEXT,
      ConstantData.SVGElementClass.AREADIMENSIONLINE,
      ConstantData.SVGElementClass.DIMENSIONTEXTNOEDIT
    ];

    // Create action click handler factory
    const createActionClickHandler = function (drawingObject) {
      return function (event) {
        if (ConstantData.DocumentContext.HTMLFocusControl &&
          ConstantData.DocumentContext.HTMLFocusControl.blur) {
          ConstantData.DocumentContext.HTMLFocusControl.blur();
        }
        drawingObject.LM_ActionClick(event);
        return false;
      };
    };

    // Process each visible object
    for (objectIndex = 0; objectIndex < visibleObjectCount; ++objectIndex) {
      objectId = visibleObjectIds[objectIndex];

      // Skip if object is not in selection list or has issues
      indexInSelectedList = selectedList.indexOf(objectId);
      if (indexInSelectedList < 0 ||
        (drawingObject = GlobalData.optManager.GetObjectPtr(objectId, false)) === null ||
        drawingObject.flags & ConstantData.ObjFlags.SEDO_NotVisible ||
        (svgElement = this.svgObjectLayer.GetElementByID(objectId)) === null ||
        svgElement.GetElementByID(ConstantData.SVGElementClass.SHAPE) === null) {
        continue;
      }

      // Handle action triggers
      actionTriggerId = ConstantData.Defines.Action + objectId;
      actionTriggerElement = this.svgOverlayLayer.GetElementByID(actionTriggerId);

      if (actionTriggerElement === null &&
        (actionTriggerElement = drawingObject.CreateActionTriggers(this.svgDoc, objectId, svgElement, targetSelectedId)) !== null) {

        this.svgOverlayLayer.AddElement(actionTriggerElement);

        try {
          actionTriggerElement.SetRotation(drawingObject.RotationAngle);
        } catch (error) {
          throw error;
        }

        // Add interaction events if object is not locked
        if ((drawingObject.flags & ConstantData.ObjFlags.SEDO_Lock) === 0 &&
          !GlobalData.docHandler.IsReadOnly() &&
          !drawingObject.NoGrow()) {

          const domElement = actionTriggerElement.DOMElement();
          const hammerInstance = new Hammer(domElement);

          hammerInstance.on('tap', DefaultEvt.Evt_ActionTriggerTap);
          hammerInstance.on('dragstart', createActionClickHandler(drawingObject));

          if (this.isGestureCapable) {
            hammerInstance.on('pinchin', DefaultEvt.Evt_WorkAreaHammerPinchIn);
            hammerInstance.on('pinchout', DefaultEvt.Evt_WorkAreaHammerPinchOut);
            hammerInstance.on('transformend', DefaultEvt.Evt_WorkAreaHammerPinchEnd);
          }

          actionTriggerElement.SetEventProxy(hammerInstance);
        }
      }

      // Handle dimension visibility
      if (drawingObject.Dimensions & ConstantData.DimensionFlags.SED_DF_Select) {
        let elementId;
        let currentElement = null;

        // Set opacity for dimension elements based on selection state
        for (let elementIndex = svgElement.ElementCount() - 1; elementIndex >= 1; elementIndex--) {
          currentElement = svgElement.GetElementByIndex(elementIndex);
          elementId = currentElement.GetID();

          if (dimensionElementTypes.indexOf(elementId) >= 0) {
            currentElement.SetOpacity(indexInSelectedList >= 0 ? 1 : 0);
          }
        }
      }
    }

    console.log('O.Opt RenderAllSVGSelectionStates - Output: Selection states rendered');
  }


  ActiveVisibleZList() {
    console.log('O.Opt ActiveVisibleZList: input');

    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, false);
    const layers = layersManager.layers;
    const numberOfLayers = layersManager.nlayers;
    const activeLayerIndex = layersManager.activelayer;
    let visibleZList = [];

    for (let i = numberOfLayers - 1; i >= 0; i--) {
      const layer = layers[i];
      if (i === activeLayerIndex || (layer.flags & ConstantData.LayerFlags.SDLF_Visible && layer.flags & ConstantData.LayerFlags.SDLF_Active)) {
        visibleZList = visibleZList.concat(layer.zList);
      }
    }

    console.log('O.Opt ActiveVisibleZList: output', visibleZList);
    return visibleZList;
  }



  UpdateFieldDataTooltipPos = function (e, t) {
    // if (this.FieldedDataTooltipVisible() && (e || t)) {
    //   var a = SDUI.Commands.MainController.Dropdowns.GetDropdown(Resources.Controls.Dropdowns.EditDataValues.Id);
    //   if (a && a.Control) {
    //     var r = a.Control.css('left').replace('px', ''),
    //       i = a.Control.css('top').replace('px', '');
    //     r = parseFloat(r),
    //       i = parseFloat(i),
    //       isNaN(r) ||
    //       isNaN(i) ||
    //       (
    //         r += e,
    //         i += t,
    //         a.Control.css('left', r + 'px'),
    //         a.Control.css('top', i + 'px')
    //       )
    //   }
    // }
  }

  SetFormatPainter(shouldDisable: boolean, makeSticky: boolean) {
    console.log("O.Opt SetFormatPainter - Input:", { shouldDisable, makeSticky });

    let targetObject;
    let tableObject;
    let activeTableId;
    let tableCell;
    let tableRow;
    let tableCol;

    // If format painter is already active, disable it
    if (this.currentModalOperation === ConstantData2.ModalOperations.FORMATPAINTER) {
      this.currentModalOperation = ConstantData2.ModalOperations.NONE;
      this.SetEditMode(ConstantData.EditState.DEFAULT);
      this.FormatPainterSticky = false;
      console.log("O.Opt SetFormatPainter - Output: Format painter disabled");
      return;
    }

    // If not disabling, set up format painter based on current selection/context
    if (!shouldDisable) {
      // Cancel any existing modal operation
      this.CancelModalOperation();

      // Get current text edit and active table
      const activeTextEdit = GlobalData.optManager.GetActiveTextEdit();
      activeTableId = GlobalData.optManager.Table_GetActiveID();

      // CASE 1: If text is being edited, set up text format painter
      if (activeTextEdit != null) {
        this.currentModalOperation = ConstantData2.ModalOperations.FORMATPAINTER;
        this.FormatPainterMode = ConstantData2.FormatPainterModes.TEXT;
        this.FormatPainterSticky = makeSticky;

        const activeEdit = this.svgDoc.GetActiveEdit();
        if (activeEdit) {
          this.FormatPainterText = activeEdit.GetSelectedFormat();
          this.FormatPainterStyle = {
            StyleRecord: {}
          };
          this.FormatPainterStyle.Text = new TextFormatData();
          this.TextStyleToSDText(this.FormatPainterStyle.Text, this.FormatPainterText);
          this.SetEditMode(ConstantData.EditState.FORMATPAINT);
        }
      }
      // CASE 2: If a table is active, set up table format painter
      else if (activeTableId >= 0) {
        if ((tableObject = this.GetObjectPtr(activeTableId, false)) &&
          (tableCell = tableObject.GetTable(false))) {

          // If a cell is selected
          if (tableCell.select >= 0) {
            this.currentModalOperation = ConstantData2.ModalOperations.FORMATPAINTER;
            this.FormatPainterSticky = makeSticky;
            this.FormatPainterMode = ConstantData2.FormatPainterModes.TABLE;
            this.FormatPainterStyle = {
              StyleRecord: {}
            };

            const selectedCell = tableCell.cells[tableCell.select];
            this.FormatPainterStyle.Text = Utils1.DeepCopy(selectedCell.Text);
            this.FormatPainterStyle.hline = Utils1.DeepCopy(selectedCell.hline);
            this.FormatPainterStyle.vline = Utils1.DeepCopy(selectedCell.vline);
            this.FormatPainterStyle.Fill = Utils1.DeepCopy(selectedCell.fill);
            this.FormatPainterStyle.vjust = selectedCell.vjust;
            this.FormatPainterStyle.just = selectedCell.just;
            this.FormatPainterText = this.CalcDefaultInitialTextStyle(this.FormatPainterStyle.Text);

            const paraFormat = {};
            paraFormat.just = selectedCell.just;
            paraFormat.bullet = 'none';
            paraFormat.spacing = 0;

            const tableElement = this.svgObjectLayer.GetElementByID(tableObject.BlockID);
            this.Table_GetTextParaFormat(tableCell, paraFormat, tableElement, false, false, tableCell.select);
            this.FormatPainterParaFormat = paraFormat;
            this.SetEditMode(ConstantData.EditState.FORMATPAINT);
          }
          // If a row is selected
          else if (tableCell.rselect >= 0) {
            this.currentModalOperation = ConstantData2.ModalOperations.FORMATPAINTER;
            this.FormatPainterSticky = makeSticky;
            this.FormatPainterMode = ConstantData2.FormatPainterModes.TABLE;
            this.FormatPainterStyle = {
              StyleRecord: {}
            };

            tableRow = tableCell.rows[tableCell.rselect];
            const firstCell = tableCell.cells[tableRow.start + tableRow.segments[0].start];
            this.FormatPainterStyle.hline = Utils1.DeepCopy(firstCell.hline);
            this.SetEditMode(ConstantData.EditState.FORMATPAINT);
          }
          // If a column is selected
          else if (tableCell.cselect >= 0) {
            this.currentModalOperation = ConstantData2.ModalOperations.FORMATPAINTER;
            this.FormatPainterSticky = makeSticky;
            this.FormatPainterMode = ConstantData2.FormatPainterModes.TABLE;
            this.FormatPainterStyle = {
              StyleRecord: {}
            };

            tableCol = tableCell.cols[tableCell.cselect];
            this.FormatPainterStyle.vline = Utils1.DeepCopy(tableCol.vline);
            this.SetEditMode(ConstantData.EditState.FORMATPAINT);
          }
        }
      }
      // CASE 3: If a shape/object is selected, set up object format painter
      else if ((targetObject = this.GetTargetSelect()) >= 0 &&
        (tableObject = this.GetObjectPtr(targetObject, false))) {

        this.currentModalOperation = ConstantData2.ModalOperations.FORMATPAINTER;
        this.FormatPainterSticky = makeSticky;
        this.FormatPainterMode = ConstantData2.FormatPainterModes.OBJECT;
        this.FormatPainterStyle = Utils1.DeepCopy(tableObject.StyleRecord);
        this.FormatPainterStyle.Border = Utils1.DeepCopy(tableObject.StyleRecord.Line);

        // Special handling for images, symbols, and groups
        if ((tableObject.ImageURL ||
          tableObject.SymbolURL ||
          tableObject instanceof GroupSymbol) &&
          !(tableObject instanceof SVGFragmentSymbol)) {

          delete this.FormatPainterStyle.Fill;
          delete this.FormatPainterStyle.Name;

          if (tableObject.StyleRecord.Line.Thickness === 0 ||
            tableObject instanceof GroupSymbol) {
            delete this.FormatPainterStyle.Line;
            delete this.FormatPainterStyle.Border;
          }
        }

        this.FormatPainterText = tableObject.GetTextFormat(false, null);

        if (this.FormatPainterText === null) {
          this.FormatPainterText = this.CalcDefaultInitialTextStyle(this.FormatPainterStyle.Text);
        }

        this.FormatPainterParaFormat = tableObject.GetTextParaFormat(false);
        this.FormatPainterArrows = tableObject.GetArrowheadFormat();
        this.SetEditMode(ConstantData.EditState.FORMATPAINT);
      }
    }

    console.log("O.Opt SetFormatPainter - Output:", {
      mode: this.FormatPainterMode,
      isSticky: this.FormatPainterSticky,
      currentModalOperation: this.currentModalOperation
    });
  }

  DeactivateAllTextEdit(skipShapeClose: boolean, closeOption: any) {
    console.log('O.Opt DeactivateAllTextEdit - Input:', { skipShapeClose, closeOption });

    const tedSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);
    if (tedSession.theActiveTextEditObjectID !== -1) {
      this.DeactivateTextEdit(skipShapeClose, closeOption);
    } else {
      const activeEdit = this.svgDoc.GetActiveEdit();
      if (activeEdit != null && activeEdit.ID === ConstantData.SVGElementClass.DIMENSIONTEXT) {
        this.TEUnregisterEvents();
      }
    }

    console.log('O.Opt DeactivateAllTextEdit - Output: done');
  }

  TEUnregisterEvents(event) {
    console.log('O.Opt TEUnregisterEvents - Input:', event);

    this.svgDoc.ClearActiveEdit(event);

    if (this.textEntryTimer != null) {
      clearTimeout(this.textEntryTimer);
      this.textEntryTimer = null;
    }

    if (this.TETextHammer) {
      this.TETextHammer.off('dragstart');
      this.TETextHammer.dispose();
      this.TETextHammer = null;
    }

    if (this.TEClickAreaHammer) {
      this.TEClickAreaHammer.off('dragstart');
      this.TEClickAreaHammer.dispose();
      this.TEClickAreaHammer = null;
    }

    if (this.TEDecAreaHammer) {
      this.TEDecAreaHammer.off('dragstart');
      this.TEDecAreaHammer.dispose();
      this.TEDecAreaHammer = null;
    }

    if (this.TEWorkAreaHammer) {
      this.TEWorkAreaHammer.off('drag');
      this.TEWorkAreaHammer.off('dragend');
      this.TEWorkAreaHammer.dispose();
      this.TEWorkAreaHammer = null;
    }

    console.log('O.Opt TEUnregisterEvents - Output: done');
  }

  CloseShapeEdit(providedOutlineId, useAlternate, alternateOutlineId) {
    console.log("O.Opt CloseShapeEdit - Input:", { providedOutlineId, useAlternate, alternateOutlineId });

    let sessionData = this.GetObjectPtr(this.theTEDSessionBlockID, false);
    let activeOutlineId = sessionData.theActiveOutlineObjectID;

    // If using the alternate outline id then override activeOutlineId.
    if (useAlternate) {
      activeOutlineId = alternateOutlineId;
    }

    if (activeOutlineId >= 0) {
      // If the provided outline id is boolean true or already the active id, do nothing.
      if (providedOutlineId === true) {
        console.log("O.Opt CloseShapeEdit - Output: Skipping close because providedOutlineId is true");
        return;
      }
      if (providedOutlineId === activeOutlineId) {
        console.log("O.Opt CloseShapeEdit - Output: Provided outline id equals active outline id, no action taken");
        return;
      }
      let shapeObject = this.GetObjectPtr(activeOutlineId, false);
      if (shapeObject) {
        if (shapeObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) {
          console.log("O.Opt CloseShapeEdit - Output: Active outline is a floorplan wall, skipping close");
          return;
        }
        // Begin secondary edit and re-fetch the shape object.
        // Collab.BeginSecondaryEdit();

        shapeObject = this.GetObjectPtr(activeOutlineId, false);
        if (
          shapeObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
          shapeObject.LineType === ConstantData.LineType.POLYLINE &&
          shapeObject.polylist.closed &&
          (this.PolyLineToShape(activeOutlineId)/*, Collab.AllowMessage()*/)
        ) {
          const messagePayload = { BlockID: activeOutlineId };
          // Collab.BuildMessage(ConstantData.CollabMessages.CloseShapeEdit, messagePayload, false);
        }
      }
      if (!useAlternate) {
        // Reset the active outline id.
        sessionData = this.GetObjectPtr(this.theTEDSessionBlockID, true);
        sessionData.theActiveOutlineObjectID = -1;
      }
      this.CompleteOperation();
    }
    console.log("O.Opt CloseShapeEdit - Output: Operation complete");
  }

  EndStampSession() {
    console.log('O.Opt EndStampSession - Input');

    const editMode = GlobalData.optManager.GetEditMode();
    if (editMode === ConstantData.EditState.STAMP) {
      this.theActionStoredObjectID = -1;
      this.CancelObjectDragDrop(true);

      if (GlobalData.optManager.MainAppHammer) {
        GlobalData.optManager.UnbindDragDropOrStamp();
      }
    }

    console.log('O.Opt EndStampSession - Output: done');
  }

  GetEditMode() {
    console.log('O.Opt GetEditMode - Input');

    const editModeList = this.editModeList || [];
    let currentEditMode = ConstantData.EditState.DEFAULT;

    if (editModeList.length) {
      currentEditMode = editModeList[editModeList.length - 1].mode;
    }

    console.log('O.Opt GetEditMode - Output:', currentEditMode);
    return currentEditMode;
  }

  AutoScrollCommon(event, snapEnabled, callback) {
    console.log("O.Opt AutoScrollCommon - Input:", { event, snapEnabled, callback });

    let clientX: number, clientY: number;
    let requiresAutoScroll = false;

    // Disable snap if override key is pressed
    if (this.OverrideSnaps(event)) {
      snapEnabled = false;
    }

    // Get client coordinates from gesture or mouse event
    if (event.gesture) {
      clientX = event.gesture.center.clientX;
      clientY = event.gesture.center.clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    // Initialize new positions with the current coordinates
    let newX = clientX;
    let newY = clientY;

    // Cache document display info for readability
    const docInfo = GlobalData.optManager.svgDoc.docInfo;
    const dispX = docInfo.dispX;
    const dispY = docInfo.dispY;
    const dispWidth = docInfo.dispWidth;
    const dispHeight = docInfo.dispHeight;

    // Check horizontal boundaries
    if (clientX >= dispX + dispWidth - 8) {
      requiresAutoScroll = true;
      newX = dispX + dispWidth - 8 + 32;
    }
    if (clientX < dispX) {
      requiresAutoScroll = true;
      newX = dispX - 32;
    }

    // Check vertical boundaries
    if (clientY >= dispY + dispHeight - 8) {
      requiresAutoScroll = true;
      newY = dispY + dispHeight - 8 + 32;
    }
    if (clientY < dispY) {
      requiresAutoScroll = true;
      newY = dispY - 32;
    }

    if (requiresAutoScroll) {
      // Apply snapping if enabled and allowed
      if (snapEnabled && GlobalData.docHandler.documentConfig.enableSnap) {
        let snapPoint = { x: newX, y: newY };
        snapPoint = GlobalData.docHandler.SnapToGrid(snapPoint);
        newX = snapPoint.x;
        newY = snapPoint.y;
      }
      GlobalData.optManager.autoScrollXPos = newX;
      GlobalData.optManager.autoScrollYPos = newY;
      if (GlobalData.optManager.autoScrollTimerID !== -1) {
        console.log("O.Opt AutoScrollCommon - Output: Auto scroll already scheduled");
        return false;
      } else {
        GlobalData.optManager.autoScrollTimerID = GlobalData.optManager.autoScrollTimer.setTimeout(callback, 0);
        console.log("O.Opt AutoScrollCommon - Output: Auto scroll timer set", { newX, newY });
        return false;
      }
    } else {
      GlobalData.optManager.ResetAutoScrollTimer();
      console.log("O.Opt AutoScrollCommon - Output: No auto scroll needed, timer reset");
      return true;
    }
  }

  RubberBandSelectExceptionCleanup(exception: any): never {
    console.log("O.Opt RubberBandSelectExceptionCleanup - Input:", exception);

    try {
      // Unbind rubber band related hammer events and reset auto-scroll timer.
      GlobalData.optManager.UnbindRubberBandHammerEvents();
      GlobalData.optManager.ResetAutoScrollTimer();

      // Remove the rubber band element from the overlay layer if it exists.
      if (GlobalData.optManager.theRubberBand) {
        GlobalData.optManager.svgOverlayLayer.RemoveElement(GlobalData.optManager.theRubberBand);
      }

      // Reset rubber band properties.
      GlobalData.optManager.theRubberBand = null;
      GlobalData.optManager.theRubberBandStartX = 0;
      GlobalData.optManager.theRubberBandStartY = 0;
      GlobalData.optManager.theRubberBandFrame = { x: 0, y: 0, width: 0, height: 0 };

      // Unlock and unblock collaboration messages, and reset undo state.
      Collab.UnLockMessages();
      Collab.UnBlockMessages();
      GlobalData.optManager.InUndo = false;
    } catch (cleanupError) {
      console.error("O.Opt RubberBandSelectExceptionCleanup - Cleanup Error:", cleanupError);
      throw cleanupError;
    }

    console.log("O.Opt RubberBandSelectExceptionCleanup - Output: Cleanup completed");
    throw exception;
  }

  /**
   * Checks if snap behavior should be overridden (based on Alt key)
   * @param inputEvent - The input event to check for Alt key state
   * @returns True if snapping should be overridden, false otherwise
   */
  OverrideSnaps(inputEvent) {
    console.log('O.Opt OverrideSnaps - Input:', inputEvent);

    // Early return if no event provided
    if (inputEvent == null) {
      console.log('O.Opt OverrideSnaps - Output: false (no event)');
      return false;
    }

    // Check for Alt key in either direct event or gesture event
    let altKeyIsPressed = inputEvent.altKey;

    if (inputEvent.gesture && inputEvent.gesture.srcEvent) {
      altKeyIsPressed = inputEvent.gesture.srcEvent.altKey;
    }

    console.log('O.Opt OverrideSnaps - Output:', altKeyIsPressed);
    return altKeyIsPressed === true;
  }


  UnbindRubberBandHammerEvents() {
    console.log('O.Opt UnbindRubberBandHammerEvents - Input');

    if (GlobalData.optManager.WorkAreaHammer) {
      GlobalData.optManager.WorkAreaHammer.off('drag');
      GlobalData.optManager.WorkAreaHammer.off('dragend');
    }

    console.log('O.Opt UnbindRubberBandHammerEvents - Output: done');
  }

  ResetAutoScrollTimer() {
    console.log('O.Opt ResetAutoScrollTimer - Input:');

    if (this.autoScrollTimerID !== -1) {
      this.autoScrollTimer.clearTimeout(this.autoScrollTimerID);
      this.autoScrollTimerID = -1;
    }

    console.log('O.Opt ResetAutoScrollTimer - Output: Timer reset');
  }

  RubberBandSelectMoveCommon(mouseX: number, mouseY: number) {
    console.log('O.Opt RubberBandSelectMoveCommon - Input:', { mouseX, mouseY });

    if (GlobalData.optManager.theRubberBand === null) {
      return;
    }

    const currentX = mouseX;
    const currentY = mouseY;
    const startX = GlobalData.optManager.theRubberBandStartX;
    const startY = GlobalData.optManager.theRubberBandStartY;

    if (currentX >= startX && currentY >= startY) {
      GlobalData.optManager.theRubberBand.SetSize(currentX - startX, currentY - startY);
      GlobalData.optManager.theRubberBandFrame = {
        x: startX,
        y: startY,
        width: currentX - startX,
        height: currentY - startY
      };
    } else if (currentY < startY) {
      if (currentX >= startX) {
        GlobalData.optManager.theRubberBand.SetSize(currentX - startX, startY - currentY);
        GlobalData.optManager.theRubberBand.SetPos(startX, currentY);
        GlobalData.optManager.theRubberBandFrame = {
          x: startX,
          y: currentY,
          width: currentX - startX,
          height: startY - currentY
        };
      } else {
        GlobalData.optManager.theRubberBand.SetSize(startX - currentX, startY - currentY);
        GlobalData.optManager.theRubberBand.SetPos(currentX, currentY);
        GlobalData.optManager.theRubberBandFrame = {
          x: currentX,
          y: currentY,
          width: startX - currentX,
          height: startY - currentY
        };
      }
    } else if (currentX < startX) {
      GlobalData.optManager.theRubberBand.SetSize(startX - currentX, currentY - startY);
      GlobalData.optManager.theRubberBand.SetPos(currentX, startY);
      GlobalData.optManager.theRubberBandFrame = {
        x: currentX,
        y: startY,
        width: startX - currentX,
        height: currentY - startY
      };
    }

    console.log('O.Opt RubberBandSelectMoveCommon - Output:', { rubberBandFrame: GlobalData.optManager.theRubberBandFrame });
  }

  ExceptionCleanup(error) {
    console.log('O.Opt ExceptionCleanup - Input:', error);

    try {
      this.TEUnregisterEvents();
      this.DeactivateAllTextEdit(true);
      this.CloseEdit(false, true);
      GlobalData.stateManager.ExceptionCleanup();
      this.ResizeSVGDocument();
      this.RenderAllSVGObjects();

      const sessionData = this.GetObjectPtr(this.theSEDSessionBlockID, false);
      const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, false);
      this.UpdateSelectionAttributes(selectedList);

      console.log('O.Opt ExceptionCleanup - Output: done');
    } catch (cleanupError) {
      console.error('O.Opt ExceptionCleanup - Cleanup Error:', cleanupError);
      throw cleanupError;
    }

    throw error;
  }













  SelectAllInRect(selectionRect, allowMultipleSelection) {
    console.log("O.Opt SelectAllInRect - Input:", { selectionRect, allowMultipleSelection });

    // Get all visible objects and filter out objects flagged as not visible
    const visibleObjects = this.ActiveVisibleZList();
    const filteredObjects = this.RemoveNotVisible(visibleObjects);
    const objectCount = filteredObjects.length;
    const shapeContainerType = ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER;

    if (objectCount !== 0) {
      // Create a clean copy of the selection rectangle
      const searchRect = {
        x: selectionRect.x,
        y: selectionRect.y,
        width: selectionRect.width,
        height: selectionRect.height
      };
      const selectedObjects = [];

      // Check each object against the selection rectangle
      for (let i = 0; i < objectCount; ++i) {
        const object = GlobalData.objectStore.GetObject(filteredObjects[i]);
        if (object != null) {
          const objectData = object.Data;

          // Skip shape containers that are in cells
          if (objectData.objecttype !== shapeContainerType || !this.ContainerIsInCell(objectData)) {
            let objectFrame = objectData.Frame;

            // If the object is rotated, calculate its actual bounding box
            if (objectData.RotationAngle) {
              const center = {
                x: objectFrame.x + objectFrame.width / 2,
                y: objectFrame.y + objectFrame.height / 2
              };
              objectFrame = GlobalData.optManager.RotateRectAboutCenter(
                objectFrame,
                center,
                objectData.RotationAngle
              );
            }

            // Add to selection if fully enclosed by the selection rectangle
            if (this.IsRectangleFullyEnclosed(searchRect, objectFrame)) {
              selectedObjects.push(filteredObjects[i]);
            }
          }
        }
      }

      // Handle the selection results
      if (selectedObjects.length === 0) {
        console.log("O.Opt SelectAllInRect - No objects found in selection rectangle");
        this.ClearSelectionClick();
      } else {
        console.log("O.Opt SelectAllInRect - Found objects:", selectedObjects.length);
        this.SelectObjects(selectedObjects, allowMultipleSelection, false);
      }
    } else {
      console.log("O.Opt SelectAllInRect - No visible objects to select");
    }

    console.log("O.Opt SelectAllInRect - Output: Selection processing completed");
  }

  RemoveNotVisible(objects) {
    console.log('O.Opt RemoveNotVisible - Input:', objects);

    const notVisibleFlag = ConstantData.ObjFlags.SEDO_NotVisible;
    const visibleObjects = [];

    for (let i = 0; i < objects.length; i++) {
      const objectId = objects[i];
      const object = this.GetObjectPtr(objectId, false);

      if (object && !(object.flags & notVisibleFlag)) {
        visibleObjects.push(objectId);
      }
    }

    console.log('O.Opt RemoveNotVisible - Output:', visibleObjects);
    return visibleObjects;
  }

  IsCtrlClick(event) {
    console.log('O.Opt IsCtrlClick - Input:', event);

    let isCtrlClick = false;

    if (event.gesture) {
      event = event.gesture.srcEvent;
    }

    if (event instanceof MouseEvent) {
      isCtrlClick = event.ctrlKey;
    } else if ('onpointerdown' in window && event instanceof PointerEvent) {
      isCtrlClick = event.ctrlKey;
    }

    console.log('O.Opt IsCtrlClick - Output:', isCtrlClick);
    return isCtrlClick;
  }

  RubberBandSelectDoAutoScroll() {
    console.log("O.Opt RubberBandSelectDoAutoScroll - Input: starting auto scroll");

    // Schedule auto-scroll callback to run every 100ms
    GlobalData.optManager.autoScrollTimerID = this.autoScrollTimer.setTimeout("RubberBandSelectDoAutoScroll", 100);

    // Convert window coordinates (autoScrollXPos, autoScrollYPos) to document coordinates
    const documentCoords = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(
      GlobalData.optManager.autoScrollXPos,
      GlobalData.optManager.autoScrollYPos
    );
    console.log(`O.Opt RubberBandSelectDoAutoScroll - Converted Coordinates: x=${documentCoords.x}, y=${documentCoords.y}`);

    // Scroll the document to the computed position
    GlobalData.docHandler.ScrollToPosition(documentCoords.x, documentCoords.y);
    console.log(`O.Opt RubberBandSelectDoAutoScroll - Scrolled to position: x=${documentCoords.x}, y=${documentCoords.y}`);

    // Move the rubber band selection rectangle based on the new coordinates
    GlobalData.optManager.RubberBandSelectMoveCommon(documentCoords.x, documentCoords.y);
    console.log("O.Opt RubberBandSelectDoAutoScroll - Output: Rubber band selection moved");
  }


  CompleteOperation(
    selectionObjects: any,
    preserveUndoState: boolean,
    fitOption: any,
    unusedParameter: any
  ) {
    console.log("O.Opt CompleteOperation - Input:", { selectionObjects, preserveUndoState, fitOption, unusedParameter });

    // if (!Collab.NoRedrawFromSameEditor) {
    //   this.HideAllSVGSelectionStates();
    // }

    if (!this.collaboration.NoRedrawFromSameEditor) {
      this.HideAllSVGSelectionStates();
    }

    this.DynamicSnapsRemoveGuides(this.dynamicGuides);
    this.dynamicGuides = null;
    this.UpdateLinks();
    this.UpdateLineHops(true);

    // const noRedraw = Collab.NoRedrawFromSameEditor;
    const noRedraw = this.collaboration.NoRedrawFromSameEditor;

    this.RenderDirtySVGObjects();
    this.FitDocumentWorkArea(false, false, false, fitOption);

    if (GlobalData.gTestException) {
      const error = new Error(Resources.Strings.Error_InComplete);
      error.name = '1';
      throw error;
    }

    if (selectionObjects /*&& Collab.AllowSelectionChange()*/) {
      this.SelectObjects(selectionObjects, false, true);
    } else if (!noRedraw) {
      this.RenderAllSVGSelectionStates();
    }

    if (!preserveUndoState) {
      this.PreserveUndoState(false);
    }

    const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, false);
    GlobalData.docHandler.ShowCoordinates(true);

    // if (Collab.AllowSelectionChange()) {
    //   this.UpdateSelectionAttributes(selectedList);
    // }

    this.LastOpDuplicate = false;
    this.ScrollObjectIntoView(-1, false);

    if (Clipboard && Clipboard.FocusOnClipboardInput) {
      Clipboard.FocusOnClipboardInput();
    }

    console.log("O.Opt CompleteOperation - Output: Operation completed.");
  }

  DrawNewObject(newShape, clearExistingSection) {
    console.log("O.Opt DrawNewObject - Input:", { newShape, clearExistingSection });

    this.SetModalOperation(ConstantData2.ModalOperations.DRAW);
    this.GetObjectPtr(this.theTEDSessionBlockID, false);
    this.CloseEdit();

    this.LineDrawID = -1;
    this.theDrawShape = newShape;
    this.ClearAnySelection(!clearExistingSection);
    this.SetEditMode(ConstantData.EditState.EDIT);
    this.WorkAreaHammer.on('dragstart', DefaultEvt.Evt_WorkAreaHammerDrawStart);

    console.log("O.Opt DrawNewObject - Output: Draw new object initialized");
  }

  SetModalOperation(operation) {
    console.log("O.Opt SetModalOperation - Input:", { operation });

    if (
      operation !== ConstantData2.ModalOperations.NONE &&
      this.currentModalOperation !== ConstantData2.ModalOperations.NONE &&
      this.currentModalOperation !== operation
    ) {
      this.CancelModalOperation();
    }
    this.currentModalOperation = operation;

    console.log("O.Opt SetModalOperation - Output:", { currentModalOperation: operation });
  }

  StartNewObjectDraw(inputEvent) {
    console.log("O.Opt StartNewObjectDraw - Input:", inputEvent);

    // Abort drawing if LineStamp is active
    if (GlobalData.optManager.LineStamp) {
      console.log("O.Opt StartNewObjectDraw - Output: LineStamp active, aborting draw");
      return;
    }

    // Convert client coordinates to document coordinates
    let docCoords = this.svgDoc.ConvertWindowToDocCoords(
      inputEvent.gesture.center.clientX,
      inputEvent.gesture.center.clientY
    );
    console.log("O.Opt StartNewObjectDraw: Client coords and Doc coords", inputEvent.gesture.center.clientX, inputEvent.gesture.center.clientY, docCoords);

    // Set the starting point for drawing
    this.theDrawStartX = docCoords.x;
    this.theDrawStartY = docCoords.y;
    console.log("O.Opt StartNewObjectDraw: Draw start coordinates set", this.theDrawStartX, this.theDrawStartY);

    // Pre-track check before drawing
    const preTrackCheck = this.theDrawShape.LM_DrawPreTrack(docCoords);
    if (!preTrackCheck) {
      console.log("O.Opt StartNewObjectDraw - Output: Pre-track check failed");
      return;
    }

    // Determine if snapping should be enabled
    let hasLinkParam = this.LinkParams && this.LinkParams.SConnectIndex >= 0;
    let needOverrideSnaps = this.OverrideSnaps(inputEvent);
    hasLinkParam = hasLinkParam || needOverrideSnaps;
    const isSnapEnabled = GlobalData.docHandler.documentConfig.enableSnap && !hasLinkParam;

    if (isSnapEnabled) {
      let snapRect = this.theDrawShape.GetSnapRect();
      let dragRectCopy = this.theDragEnclosingRect ? Utils1.DeepCopy(this.theDragEnclosingRect) : snapRect;
      let actionBBoxCopy = Utils1.DeepCopy(this.theActionBBox);
      let offsetX = dragRectCopy.x - actionBBoxCopy.x;
      let offsetY = dragRectCopy.y - actionBBoxCopy.y;

      // Reposition the drag rectangle to center around the document coordinates
      dragRectCopy.x = docCoords.x - dragRectCopy.width / 2;
      dragRectCopy.y = docCoords.y - dragRectCopy.height / 2;

      // Calculate the adjusted offset for custom snap
      let adjustedOffset = {
        x: dragRectCopy.x - offsetX,
        y: dragRectCopy.y - offsetY
      };

      if (!this.theDrawShape.CustomSnap(adjustedOffset.x, adjustedOffset.y, 0, 0, false, docCoords)) {
        if (GlobalData.docHandler.documentConfig.centerSnap) {
          let snapPoint = GlobalData.docHandler.SnapToGrid(docCoords);
          docCoords.x = snapPoint.x;
          docCoords.y = snapPoint.y;
        } else {
          let tempSnapRect = $.extend(true, {}, snapRect);
          tempSnapRect.x = docCoords.x - snapRect.width / 2;
          tempSnapRect.y = docCoords.y - snapRect.height / 2;
          let snapAdjustment = GlobalData.docHandler.SnapRect(tempSnapRect);
          docCoords.x += snapAdjustment.x;
          docCoords.y += snapAdjustment.y;
        }
      }
    }

    // Set action coordinates based on document coordinates
    let docX = docCoords.x;
    let docY = docCoords.y;
    this.ClearAnySelection(true);
    this.theActionStartX = docX;
    this.theActionStartY = docY;
    this.theActionBBox = { x: docX, y: docY, width: 1, height: 1 };
    this.theActionNewBBox = { x: docX, y: docY, width: 1, height: 1 };

    // Begin drawing the new shape
    let drawShape = this.theDrawShape;
    this.InitializeAutoGrowDrag();
    this.ShowFrame(true);
    drawShape.LM_DrawClick(docX, docY);
    this.AddNewObject(drawShape, !drawShape.bOverrideDefaultStyleOnDraw, false);

    // Retrieve the new object's ID from the active layer
    let layerZList = this.ActiveLayerZList();
    let layerCount = layerZList.length;
    this.theActionStoredObjectID = layerZList[layerCount - 1];

    // If a circular link list exists, add the new object to it
    if (this.LinkParams && this.LinkParams.lpCircList) {
      this.LinkParams.lpCircList.push(this.theActionStoredObjectID);
    }

    // Get the corresponding SVG object for the new object
    this.theActionSVGObject = this.svgObjectLayer.GetElementByID(this.theActionStoredObjectID);

    // Handle connection highlights if there is a connect index
    if (this.LinkParams && this.LinkParams.SConnectIndex >= 0) {
      this.HiliteConnect(this.LinkParams.SConnectIndex, this.LinkParams.SConnectPt, true, false, drawShape.BlockID, this.LinkParams.SConnectInside);
      this.LinkParams.SHiliteConnect = this.LinkParams.SConnectIndex;
      this.LinkParams.SHiliteInside = this.LinkParams.SConnectInside;
    }

    // Handle join highlights if there is a join index
    if (this.LinkParams && this.LinkParams.SJoinIndex >= 0) {
      this.HiliteConnect(this.LinkParams.SJoinIndex, this.LinkParams.SConnectPt, true, true, drawShape.BlockID, null);
      this.LinkParams.SHiliteJoin = this.LinkParams.SJoinIndex;
    }

    console.log("O.Opt StartNewObjectDraw - Output: New object drawn with ID", this.theActionStoredObjectID);
  }


  FindConnect(targetObjectId, drawingObject, hookPoints, showVisuals, isAttachMode, allowJoin, eventPosition) {
    console.log("O.Opt FindConnect - Input:", {
      targetObjectId,
      drawingObject: drawingObject ? drawingObject.BlockID : null,
      hookPointsCount: hookPoints ? hookPoints.length : 0,
      showVisuals,
      isAttachMode,
      allowJoin,
      eventPosition
    });

    // Variables for tracking state during connection finding
    let hitCode = 0;
    let deltaX, deltaY, distance;
    let hookIndex, bestIndex, bestDistance;
    let foundConnection = false;
    let hitResult = {};
    let connectionPoints = [];
    let targetPoints = [];
    let minDistance = 1e+30;
    let hookFlags = 0;
    let previousPoint = { x: 0, y: 0 };
    let currentPoint = {};
    let classFilters = [];
    let lineClassFilters = [];
    let objectClassesToFind = null;
    let sessionFlags = 0;
    let connectHookFlag = ConstantData.HookFlags.SED_LC_HookNoExtra;
    let hookPointTypes = ConstantData.HookPts;
    let isContainerHit = false;
    let targetObject;

    // Helper function to check if a hook point is a center type
    const isCenterHookPoint = (hookType) => {
      switch (hookType) {
        case hookPointTypes.SED_KTC:
        case hookPointTypes.SED_KBC:
        case hookPointTypes.SED_KRC:
        case hookPointTypes.SED_KLC:
          return true;
        default:
          if (hookType >= hookPointTypes.SED_CustomBase &&
            hookType < hookPointTypes.SED_CustomBase + 100) {
            return true;
          }
      }
      return false;
    };

    const isLineObject = drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE;

    // Input validation
    if (hookPoints == null) {
      console.log("O.Opt FindConnect - Output: false (No hook points)");
      return false;
    }

    // Get list of objects to check for connections
    const circularList = this.LinkParams.lpCircList;
    if (circularList == null) {
      console.log("O.Opt FindConnect - Output: false (No circular list)");
      return false;
    }

    // Store the previous connection point
    previousPoint.x = this.LinkParams.ConnectPt.x;
    previousPoint.y = this.LinkParams.ConnectPt.y;

    // Get hook flags and clear attachment flag
    hookFlags = drawingObject.hookflags;
    hookFlags = Utils2.SetFlag(hookFlags, ConstantData.HookFlags.SED_LC_AttachToLine, false);

    // Get session data and flags
    const sessionData = this.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
    if (sessionData) {
      sessionFlags = sessionData.flags;
    }

    // Set up class filters based on mode
    if (isAttachMode) {
      // In attach mode, only consider line objects
      classFilters.push(ConstantData.DrawingObjectBaseClass.LINE);
      objectClassesToFind = classFilters;
    } else if (this.LinkParams.ArraysOnly) {
      // In arrays-only mode, filter based on object type
      if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
        classFilters.push(ConstantData.DrawingObjectBaseClass.SHAPE);
        objectClassesToFind = classFilters;
      } else if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE) {
        classFilters.push(ConstantData.DrawingObjectBaseClass.CONNECTOR);

        if (sessionFlags & ConstantData.SessionFlags.SEDS_LLink) {
          classFilters.push(ConstantData.DrawingObjectBaseClass.LINE);
        }

        objectClassesToFind = classFilters;
      } else {
        objectClassesToFind = classFilters;
      }
    }

    // In join mode, include line objects in the filter
    if (allowJoin) {
      lineClassFilters.push(ConstantData.DrawingObjectBaseClass.LINE);
    }

    // When drawing from overlay layer, include shapes in the filter
    if (GlobalData.optManager.FromOverlayLayer) {
      classFilters.push(ConstantData.DrawingObjectBaseClass.SHAPE);
      objectClassesToFind = classFilters;
    }

    // Reset join index for new search
    this.LinkParams.JoinIndex = -1;

    // For each hook point, look for potential connections
    for (let pointIndex = 0; pointIndex < hookPoints.length; pointIndex++) {
      hitCode = 0;

      // Check for polygon closing if join is allowed
      if (allowJoin ||
        (hitResult = new HitResult(-1, 0, null),
          drawingObject.ClosePolygon(targetObjectId, hookPoints, hitResult) &&
          (allowJoin = true))) {

        // Try to find a polygon join point
        if (allowJoin &&
          (hitResult = new HitResult(-1, 0, null),
            drawingObject.ClosePolygon(targetObjectId, hookPoints, hitResult) ||
            (hitResult = this.FindObject(hookPoints[pointIndex], circularList, lineClassFilters, false, true, null)),
            hitResult && hitResult.hitcode === ConstantData.HitCodes.SED_PLApp)) {

          // Found a valid polygon join point
          this.LinkParams.JoinIndex = hitResult.objectid;
          this.LinkParams.JoinData = hitResult.segment;
          this.LinkParams.JoinSourceData = hookPoints[pointIndex].id;

          // Calculate position offset
          deltaX = hitResult.pt.x - hookPoints[pointIndex].x;
          deltaY = hitResult.pt.y - hookPoints[pointIndex].y;
          this.theDragDeltaX = deltaX;
          this.theDragDeltaY = deltaY;

          // Set connection point based on join data
          if (this.LinkParams.JoinData === ConstantData.HookPts.SED_KTL) {
            this.LinkParams.ConnectPt.x = 0;
            this.LinkParams.ConnectPt.y = 0;
          } else {
            this.LinkParams.ConnectPt.x = ConstantData.Defines.SED_CDim;
            this.LinkParams.ConnectPt.y = ConstantData.Defines.SED_CDim;
          }

          break;
        }
      }

      // Check for previous connection if available
      if (this.LinkParams.PrevConnect >= 0) {
        const prevConnectObject = this.GetObjectPtr(this.LinkParams.PrevConnect, false);
        if (prevConnectObject) {
          // Check if object is a container
          const containerPoint = Utils1.DeepCopy(GlobalData.optManager.LinkParams.ContainerPt[0]);
          if (prevConnectObject.IsShapeContainer(drawingObject, containerPoint)) {
            const hitTestFrame = prevConnectObject.GetHitTestFrame(drawingObject);
            if (Utils2.pointInRect(hitTestFrame, containerPoint)) {
              hitResult.objectid = this.LinkParams.PrevConnect;
              hitResult.hitcode = ConstantData.HitCodes.SED_InContainer;
              hitResult.cellid = null;
            }
          }
          // Check if point is inside object
          else if (Utils2.pointInRect(prevConnectObject.r, hookPoints[pointIndex])) {
            hitCode = prevConnectObject.Hit(hookPoints[pointIndex], isLineObject, false, null);
            if (hitCode) {
              if (hitResult == null) {
                hitResult = { cellid: null };
              }
              hitResult.objectid = this.LinkParams.PrevConnect;
              hitResult.hitcode = hitCode;
              hitResult.cellid = null;
            }
          }
        }
      }

      // If no hit yet, find an object at this point
      if (hitCode === 0) {
        hitResult = this.FindObject(
          hookPoints[pointIndex],
          circularList,
          objectClassesToFind,
          isLineObject,
          false,
          drawingObject
        );
      }

      // Process the hit if found
      if (hitResult && hitResult.hitcode) {
        targetObject = this.GetObjectPtr(hitResult.objectid, false);
        if (targetObject == null) {
          console.log("O.Opt FindConnect - Output: false (Target object not found)");
          return false;
        }

        // Handle container hit
        if (hitResult.hitcode === ConstantData.HitCodes.SED_InContainer) {
          isContainerHit = true;
          containerPoint = hitResult.theContainerPt;
        }

        // Process non-container hits
        if (!isContainerHit) {
          // In attach mode, check if auto-insert is allowed
          if (isAttachMode) {
            if (this.LinkParams.AutoInsert) {
              // Only shapes can be auto-inserted
              if (drawingObject.DrawingObjectBaseClass !== ConstantData.DrawingObjectBaseClass.SHAPE) {
                continue;
              }

              // Skip if already hooked
              let alreadyHooked = false;
              for (let h = 0; h < targetObject.hooks.length; h++) {
                if (targetObject.hooks[h].objid == drawingObject.BlockID) {
                  alreadyHooked = true;
                  break;
                }
              }
              if (alreadyHooked) {
                continue;
              }

              // Only segmented lines can have objects auto-inserted
              if (targetObject.LineType !== ConstantData.LineType.SEGLINE) {
                continue;
              }
            }

            // Only allow attaching to lines with the proper flag
            if ((targetObject.targflags & ConstantData.HookFlags.SED_LC_AttachToLine) === 0) {
              continue;
            }
          }
          // Not in attach mode, check compatibility
          else {
            let targetFlags = targetObject.targflags;

            // Adjust flags based on mode
            if (this.LinkParams.ArraysOnly ||
              (sessionFlags & ConstantData.SessionFlags.SEDS_SLink) !== 0) {
              // In arrays-only mode, allow attaching shapes to lines
              if (this.LinkParams.ArraysOnly &&
                targetObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE) {
                targetFlags = Utils2.SetFlag(targetFlags, ConstantData.HookFlags.SED_LC_Shape, true);
              }
            } else {
              // In normal mode, don't allow attaching shapes to other objects
              targetFlags = Utils2.SetFlag(targetFlags, ConstantData.HookFlags.SED_LC_Shape, false);
            }

            // Check if hook flags are compatible
            if ((hookFlags & targetFlags) === 0) {
              continue;
            }
          }
        }

        // Set up the appropriate flags for target points calculation
        hookFlags = Utils2.SetFlag(hookFlags, ConstantData.HookFlags.SED_LC_ShapeOnLine, isAttachMode);

        // Special handling for floorplan walls
        if (drawingObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) {
          hookFlags = Utils2.SetFlag(hookFlags, ConstantData.HookFlags.SED_LC_NoSnaps, true);
        }

        // Get target connection points
        targetPoints = targetObject.GetTargetPoints(
          hookPoints[pointIndex],
          hookFlags | connectHookFlag,
          targetObjectId
        );

        if (!targetPoints || targetPoints.length === 0) {
          console.log("O.Opt FindConnect - Output: false (No target points)");
          return false;
        }

        // Get perimeter points
        connectionPoints = targetObject.GetPerimPts(
          hitResult.objectid,
          targetPoints,
          null,
          false,
          targetPoints[0].cellid,
          targetObjectId
        );

        // Determine which point to use
        let currentPt = hookPoints[pointIndex];

        // Use container point if applicable
        if (isContainerHit) {
          currentPoint = currentPt = containerPoint;
          hookIndex = containerPoint.id;
        }

        // Find closest connection point
        for (let j = 0; j < connectionPoints.length; j++) {
          const dx = connectionPoints[j].x - currentPt.x;
          const dy = connectionPoints[j].y - currentPt.y;
          distance = dx * dx + dy * dy;

          if (distance < minDistance) {
            minDistance = distance;
            bestIndex = j;
          }
        }

        // For polygons, ensure segment consistency
        if (targetObject.polylist && hitResult.segment >= 0) {
          const segmentCheck = this.FindObject(
            connectionPoints[bestIndex],
            circularList,
            objectClassesToFind,
            false,
            false,
            drawingObject
          );

          if (!segmentCheck) {
            console.log("O.Opt FindConnect - Output: false (Segment check failed)");
            return false;
          }

          if (segmentCheck.segment != hitResult.segment) {
            console.log("O.Opt FindConnect - Output: false (Segment mismatch)");
            return false;
          }
        }

        // Get best hook point
        if (!isContainerHit) {
          hookIndex = hookPoints[pointIndex].id;
          hookIndex = targetObject.GetBestHook(targetObjectId, hookPoints[pointIndex].id, targetPoints[bestIndex]);

          if (hookIndex != hookPoints[pointIndex].id) {
            currentPoint = drawingObject.HookToPoint(hookIndex, null);
            currentPoint.x += eventPosition.x - this.theDragStartX;
            currentPoint.y += eventPosition.y - this.theDragStartY;
          } else {
            currentPoint = hookPoints[pointIndex];
          }
        }

        // Check hook permission
        const hookDistanceSq = (deltaX = connectionPoints[bestIndex].x - currentPoint.x) * deltaX +
          (deltaY = connectionPoints[bestIndex].y - currentPoint.y) * deltaY;

        if (!targetObject.AllowHook(hookPoints[pointIndex], targetObjectId, hookDistanceSq)) {
          continue;
        }

        // Set position offsets
        this.theDragDeltaX = deltaX;
        this.theDragDeltaY = deltaY;

        // Handle auto-insert for lines
        if (isAttachMode && this.LinkParams.AutoInsert) {
          this.LinkParams.AutoPoints = [];
          let frameRect = $.extend(true, {}, drawingObject.Frame);

          // Adjust frame for rotation
          const rotationQuadrant = Math.floor((drawingObject.RotationAngle + 45) / 90);
          if (rotationQuadrant) {
            const radians = 90 / (180 / ConstantData.Geometry.PI);
            const corners = [];

            corners.push(new Point(frameRect.x, frameRect.y));
            corners.push(new Point(frameRect.x + frameRect.width, frameRect.y + frameRect.height));
            Utils3.RotatePointsAboutCenter(frameRect, radians, corners);
            frameRect = Utils2.Pt2Rect(corners[0], corners[1]);
          }

          // Apply position offset
          frameRect.x += deltaX;
          frameRect.y += deltaY;

          // Check for intersections
          if (!targetObject.GetFrameIntersects(
            frameRect,
            drawingObject,
            this.LinkParams.AutoPoints,
            this.LinkParams)) {
            continue;
          }
        }

        // Connection found
        foundConnection = true;
        this.LinkParams.ConnectIndex = hitResult.objectid;

        // Track connection history
        if (this.LinkParams.ConnectIndex >= 0 &&
          this.LinkParams.ConnectIndexHistory.indexOf(this.LinkParams.ConnectIndex) < 0) {
          this.LinkParams.ConnectIndexHistory.push(this.LinkParams.ConnectIndex);
        }

        // Store connection details
        this.LinkParams.ConnectPt.x = targetPoints[bestIndex].x;
        this.LinkParams.ConnectPt.y = targetPoints[bestIndex].y;
        this.LinkParams.ConnectInside = targetPoints[bestIndex].cellid;
        this.LinkParams.HookIndex = hookIndex;

        // Set appropriate hook flag
        if (this.LinkParams.AutoInsert && isAttachMode && !GlobalData.optManager.LinkParams.AutoSinglePoint) {
          this.LinkParams.ConnectHookFlag = ConstantData.HookFlags.SED_LC_AutoInsert;
        } else if (this.LinkParams.ArraysOnly &&
          targetObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
          drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
          isCenterHookPoint(hookIndex)) {
          this.LinkParams.ConnectHookFlag = ConstantData.HookFlags.SED_LC_HookReverse;
        } else {
          this.LinkParams.ConnectHookFlag = 0;
        }

        break;
      }
    }

    // Update connection state if no connection found
    if (!foundConnection) {
      // Add current connect index to history if not already there
      if (this.LinkParams.ConnectIndex >= 0 &&
        this.LinkParams.ConnectIndexHistory.indexOf(this.LinkParams.ConnectIndex) < 0) {
        this.LinkParams.ConnectIndexHistory.push(this.LinkParams.ConnectIndex);
      }

      // Reset current connection
      this.LinkParams.ConnectIndex = -1;
    }

    // Update visuals for join mode
    if (this.LinkParams.JoinIndex != this.LinkParams.HiliteJoin && showVisuals) {
      // Hide any current connection highlight
      if (this.LinkParams.HiliteConnect >= 0) {
        this.HiliteConnect(
          this.LinkParams.HiliteConnect,
          this.LinkParams.ConnectPt,
          false,
          false,
          targetObjectId,
          this.LinkParams.HiliteInside
        );
        this.LinkParams.HiliteConnect = -1;
        this.LinkParams.HiliteInside = null;
        this.UndoEditMode();
      }

      // Update join highlights
      if (this.LinkParams.JoinIndex >= 0 && this.LinkParams.HiliteJoin < 0) {
        // Show join mode if not already active
        if (this.GetEditMode() != ConstantData.EditState.LINKJOIN) {
          this.SetEditMode(ConstantData.EditState.LINKJOIN, null, true);
        }
      } else if (this.LinkParams.JoinIndex < 0 && this.LinkParams.HiliteJoin >= 0) {
        this.UndoEditMode();
      }

      // Hide old join highlight if any
      if (this.LinkParams.HiliteJoin >= 0) {
        this.HiliteConnect(
          this.LinkParams.HiliteJoin,
          this.LinkParams.ConnectPt,
          false,
          true,
          targetObjectId,
          null
        );
        this.LinkParams.HiliteJoin = -1;
        this.UndoEditMode();
      }

      // Show new join highlight if available
      if (this.LinkParams.JoinIndex >= 0) {
        this.HiliteConnect(
          this.LinkParams.JoinIndex,
          this.LinkParams.ConnectPt,
          true,
          true,
          targetObjectId,
          null
        );
        this.LinkParams.HiliteJoin = this.LinkParams.JoinIndex;

        // Set edit mode to join if not already
        if (this.GetEditMode() != ConstantData.EditState.LINKJOIN) {
          this.SetEditMode(ConstantData.EditState.LINKJOIN, null, true);
        }
      }
    }

    // Update visuals for connect mode
    if (this.LinkParams.HiliteConnect == this.LinkParams.ConnectIndex &&
      this.LinkParams.HiliteInside == this.LinkParams.ConnectInside ||
      !showVisuals) {
      // If connection already highlighted, just update position if needed
      if (foundConnection &&
        showVisuals &&
        this.LinkParams.HiliteConnect === this.LinkParams.ConnectIndex &&
        this.LinkParams.HiliteInside === this.LinkParams.ConnectInside &&
        connectionPoints.length === 1) {

        if (previousPoint.x != this.LinkParams.ConnectPt.x ||
          previousPoint.y != this.LinkParams.ConnectPt.y) {
          this.MoveConnectHilite(
            this.LinkParams.ConnectIndex,
            this.LinkParams.ConnectPt,
            this.LinkParams.ConnectInside
          );
        }
      }
    } else {
      // Hide join highlight if any
      if (this.LinkParams.HiliteJoin >= 0) {
        this.HiliteConnect(
          this.LinkParams.HiliteJoin,
          this.LinkParams.ConnectPt,
          false,
          true,
          targetObjectId,
          null
        );
        this.LinkParams.HiliteJoin = -1;
        this.UndoEditMode();
      }

      // Update connection mode based on current state
      if (this.LinkParams.ConnectIndex >= 0 && this.LinkParams.HiliteConnect < 0) {
        // Show connect mode if not already active
        if (this.GetEditMode() != ConstantData.EditState.LINKCONNECT) {
          this.SetEditMode(ConstantData.EditState.LINKCONNECT, null, true);
        }
      } else if (this.LinkParams.ConnectIndex < 0 && this.LinkParams.HiliteConnect >= 0) {
        // Handle disconnection if needed
        const prevConnect = this.GetObjectPtr(this.LinkParams.HiliteConnect, false);
        drawingObject.OnDisconnect(
          targetObjectId,
          prevConnect,
          this.LinkParams.HookIndex,
          connectionPoints[bestIndex]
        );
        this.UndoEditMode();
      }

      // Hide old connection highlight if any
      if (this.LinkParams.HiliteConnect >= 0) {
        this.HiliteConnect(
          this.LinkParams.HiliteConnect,
          this.LinkParams.ConnectPt,
          false,
          false,
          targetObjectId,
          this.LinkParams.HiliteInside
        );
        this.LinkParams.HiliteConnect = -1;
        this.LinkParams.HiliteInside = null;
        this.UndoEditMode();
      }

      // Show new connection highlight if available
      if (this.LinkParams.ConnectIndex >= 0) {
        this.HiliteConnect(
          this.LinkParams.ConnectIndex,
          this.LinkParams.ConnectPt,
          true,
          false,
          targetObjectId,
          this.LinkParams.ConnectInside
        );
        this.LinkParams.HiliteConnect = this.LinkParams.ConnectIndex;
        this.LinkParams.HiliteInside = this.LinkParams.ConnectInside;

        // Notify object of connection
        drawingObject.OnConnect(
          targetObjectId,
          targetObject,
          this.LinkParams.HookIndex,
          connectionPoints[bestIndex],
          eventPosition
        );

        // Set edit mode to connect if not already
        if (this.GetEditMode() != ConstantData.EditState.LINKCONNECT) {
          this.SetEditMode(ConstantData.EditState.LINKCONNECT, null, true);
        }
      }
    }

    console.log("O.Opt FindConnect - Output:", foundConnection);
    return foundConnection;
  }

  FindObject(
    point: { x: number; y: number },
    objectIdFilter?: number[],
    classFilter?: any[],
    hitTestOptions?: any,
    usePreciseHitTest?: boolean,
    containerObject?: any
  ) {
    console.log("O.Opt FindObject - Input:", {
      point,
      objectIdFilter,
      classFilter,
      hitTestOptions,
      usePreciseHitTest,
      containerObject,
    });

    let currentObject: any;
    let isFiltered: boolean;
    let hitFrame: any;
    let result: any = {};
    const hitResult = new HitResult(-1, 0, null);
    const visibleObjects = this.ActiveVisibleZList();

    if (visibleObjects == null) {
      console.log("O.Opt FindObject - Output: no visible objects");
      return -1;
    }

    // Loop through the visible objects from topmost (end) to bottom
    for (let idx = visibleObjects.length - 1; idx >= 0; idx--) {
      // Check if an object filter is provided and if the current object's ID is in the filter.
      if (!(isFiltered = objectIdFilter && objectIdFilter.indexOf(visibleObjects[idx]) !== -1)) {
        currentObject = this.GetObjectPtr(visibleObjects[idx], false);
        if (currentObject != null) {
          // If containerObject is provided and is a ShapeContainer type, skip connectors.
          if (
            containerObject &&
            (containerObject instanceof ShapeContainer ||
              containerObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER) &&
            currentObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR
          ) {
            continue;
          }
          if (
            currentObject.flags & ConstantData.ObjFlags.SEDO_Lock ||
            currentObject.flags & ConstantData.ObjFlags.SEDO_NoLinking
          ) {
            currentObject = null;
          }
        }

        if (currentObject != null) {
          // Skip if the object is not visible or is not meant for connection‐to‐connection linking.
          if (currentObject.flags & ConstantData.ObjFlags.SEDO_NotVisible) continue;
          if (currentObject.extraflags & ConstantData.ExtraFlags.SEDE_ConnToConn) continue;
          if (
            containerObject &&
            containerObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
            GlobalData.optManager.FindChildArray(visibleObjects[idx], -1) >= 0
          ) {
            continue;
          }

          // If a class filter array is provided, check if the object's class is excluded.
          if (classFilter) {
            isFiltered = classFilter.indexOf(currentObject.DrawingObjectBaseClass) === -1;
          }

          // Get and adjust the hit-test frame for the object.
          const hitTestFrame = currentObject.GetHitTestFrame(containerObject);
          if (hitTestFrame.width < ConstantData.Defines.FindObjectMinHitSpot) {
            hitTestFrame.width = ConstantData.Defines.FindObjectMinHitSpot;
            hitTestFrame.x -= ConstantData.Defines.FindObjectMinHitSpot / 2;
          }
          if (hitTestFrame.height < ConstantData.Defines.FindObjectMinHitSpot) {
            hitTestFrame.height = ConstantData.Defines.FindObjectMinHitSpot;
            hitTestFrame.y -= ConstantData.Defines.FindObjectMinHitSpot / 2;
          }

          // If the object is a ShapeContainer, check if the point is inside its container point.
          if (currentObject instanceof ShapeContainer) {
            const containerPoint = Utils1.DeepCopy(GlobalData.optManager.LinkParams.ContainerPt[0]);
            if (currentObject.IsShapeContainer(containerObject, containerPoint) && Utils2.pointInRect(hitTestFrame, containerPoint)) {
              hitResult.objectid = visibleObjects[idx];
              hitResult.hitcode = ConstantData.HitCodes.SED_InContainer;
              hitResult.theContainerPt = containerPoint;
              console.log("O.Opt FindObject - Output:", hitResult);
              return hitResult;
            }
            continue;
          }

          // For swimlanes, if the point is inside the hit frame, return null.
          if (currentObject.IsSwimlane() && Utils2.pointInRect(hitTestFrame, point)) {
            console.log("O.Opt FindObject - Output: found swimlane containment is null");
            return null;
          }

          // If the point is within the hit frame and passes the filter, perform precise hit testing.
          if (!isFiltered && Utils2.pointInRect(hitTestFrame, point)) {
            hitResult.objectid = visibleObjects[idx];
            hitResult.hitcode = currentObject.Hit(point, hitTestOptions, usePreciseHitTest, hitResult);
            if (hitResult.hitcode) {
              console.log("O.Opt FindObject - Output:", hitResult);
              return hitResult;
            }
          }
        }
      }
    }

    console.log("O.Opt FindObject - Output: result null");
    return null;
  }


  InitializeAutoGrowDrag(actionType, shouldCloseEdit) {
    console.log('O.Opt InitializeAutoGrowDrag - Input:', { actionType, shouldCloseEdit });

    this.theDragGotAutoResizeRight = false;
    this.theDragGotAutoResizeBottom = false;
    this.theDragGotAutoResizeOldX = [];
    this.theDragGotAutoResizeOldY = [];

    console.log('O.Opt InitializeAutoGrowDrag - Output: Auto grow drag initialized');
  }









  UnbindActionClickHammerEvents() {
    console.log('O.Opt UnbindActionClickHammerEvents - Input:');

    const workAreaHammer = GlobalData.optManager.WorkAreaHammer;
    if (workAreaHammer) {
      workAreaHammer.off('drag');
      workAreaHammer.off('dragend');
      workAreaHammer.off('doubletap');
    }

    console.log('O.Opt UnbindActionClickHammerEvents - Output: Events unbound');
  }










  AddNewObject(drawingObject, shouldStyleCopy, renderSelection, textContent) {
    console.log("O.Opt AddNewObject - Input:", { drawingObject, shouldStyleCopy, renderSelection, textContent });

    let nativeSymbolResult;
    let symbolTitle;
    let layerFlag = 0;
    let symbolData = null;
    let isStandardShape = false;

    // Ensure textContent defaults to null if not provided
    textContent = textContent || null;
    let symbolId = null;
    let symbolTitleForUpdate = '';

    if (drawingObject == null) {
      throw new Error('The drawing object is null');
    }

    const sessionData = GlobalData.objectStore.GetObject(this.theSEDSessionBlockID).Data;

    if (shouldStyleCopy === undefined) {
      shouldStyleCopy = true;
    }

    // Copy default style if required.
    if (shouldStyleCopy) {
      drawingObject.StyleRecord = Utils1.DeepCopy(sessionData.def.style);
      if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE) {
        drawingObject.StyleRecord.Line = Utils1.DeepCopy(drawingObject.StyleRecord.Border);
        drawingObject.TMargins = Utils1.DeepCopy(sessionData.def.tmargins);
        drawingObject.TextFlags = Utils2.SetFlag(
          drawingObject.TextFlags,
          ConstantData.TextFlags.SED_TF_FormCR,
          (sessionData.def.textflags & ConstantData.TextFlags.SED_TF_FormCR) > 0
        );
      }
      let justification = sessionData.def.just;
      if (sessionData.def.vjust !== 'middle' && sessionData.def.vjust !== 'center') {
        justification = sessionData.def.vjust + '-' + sessionData.def.just;
      }
      drawingObject.TextAlign = justification;
    }

    // Apply forced dotted pattern if necessary.
    if (this.forcedotted && drawingObject.StyleRecord) {
      drawingObject.StyleRecord.Line.LinePattern = this.forcedotted;
      this.forcedotted = null;
    }

    drawingObject.UpdateFrame(drawingObject.Frame);
    drawingObject.sizedim.width = drawingObject.Frame.width;
    drawingObject.sizedim.height = drawingObject.Frame.height;
    drawingObject.UniqueID = this.uniqueID++;

    if (drawingObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) {
      layerFlag = ConstantData.LayerFlags.SDLF_UseEdges;
    }

    drawingObject.DataID = textContent ? GlobalData.optManager.CreateTextBlock(drawingObject, textContent) : -1;

    // Create new graphics block.
    const newBlock = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT, drawingObject);
    if (newBlock == null) {
      throw new Error('AddNewObject got a null new graphics block allocation');
    }

    // Collab.AddToCreateList(newBlock.Data.BlockID);

    if (symbolId) {
      GlobalData.gBaseManager.UpdateShapeList(drawingObject, symbolId, symbolTitleForUpdate, isStandardShape);
    }

    this.ZListPreserve(layerFlag).push(newBlock.ID);

    const isBaseline = drawingObject instanceof BaseLine;
    const layersData = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, false);

    const isSpecialLayer = false;

    if (this.IsTopMostVisibleLayer() || isBaseline || isSpecialLayer) {
      this.RenderLastSVGObject(renderSelection);
    } else {
      this.RenderLastSVGObject(renderSelection);
      this.MarkAllAllVisibleHigherLayerObjectsDirty();
      this.RenderDirtySVGObjectsNoSetMouse();
    }

    this.theActionBBox = $.extend(true, {}, drawingObject.Frame);
    this.theDragEnclosingRect = drawingObject.GetDragR();

    console.log("O.Opt AddNewObject - Output:", newBlock.ID);
    return newBlock.ID;
  }






































































































































  AllowAddToRecent(item) {
    console.log('O.Opt allowAddToRecent - Input:', item);
    if (item) {
      if (item.flags & ConstantData.ObjFlags.SEDO_TextOnly) {
        console.log('O.Opt allowAddToRecent - Output:', false);
        return false;
      }
      if (item.IsSwimlane()) {
        console.log('O.Opt allowAddToRecent - Output:', false);
        return false;
      }
    }
    console.log('O.Opt allowAddToRecent - Output:', true);
    return true;
  }


  ZListPreserve(additionalLayerFlag) {
    console.log('O.Opt zListPreserve - Input:', additionalLayerFlag);
    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, true);
    const layers = layersManager.layers;
    const activeLayerIndex = layersManager.activelayer;
    let currentLayer = layers[activeLayerIndex];
    if ((currentLayer.flags & ConstantData.LayerFlags.SDLF_NoAdd) || (currentLayer.flags & additionalLayerFlag)) {
      const totalLayers = layers.length;
      for (let index = 0; index < totalLayers; index++) {
        if ((layers[index].flags & ConstantData.LayerFlags.SDLF_NoAdd) === 0) {
          this.MakeLayerActiveByIndex(index);
          GlobalData.optManager.DirtyObjectsOnLayer(activeLayerIndex, currentLayer);
          GlobalData.optManager.DirtyObjectsOnLayer(index, layers[index]);
          GlobalData.optManager.RenderDirtySVGObjects();
          currentLayer = layers[index];
          break;
        }
      }
    }
    console.log('O.Opt zListPreserve - Output:', currentLayer.zList);
    return currentLayer.zList;
  }

  IsTopMostVisibleLayer() {
    console.log('O.Opt isTopMostVisibleLayer - Input');
    const layersManager = this.GetObjectPtr(this.theLayersManagerBlockID, false);
    const result = layersManager.activelayer === this.GetTopMostVisibleLayer();
    console.log('O.Opt isTopMostVisibleLayer - Output:', result);
    return result;
  }

  GetTopMostVisibleLayer() {
    console.log('O.Opt getTopMostVisibleLayer - Input');
    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, false);
    const layers = layersManager.layers;
    const totalLayers = layersManager.nlayers;
    for (let i = 0; i < totalLayers; ++i) {
      if (layers[i].flags & ConstantData.LayerFlags.SDLF_Visible) {
        console.log('O.Opt getTopMostVisibleLayer - Output:', i);
        return i;
      }
    }
    console.log('O.Opt getTopMostVisibleLayer - Output:', -1);
    return -1;
  }


  RenderLastSVGObject(shouldRenderSelectionStates) {

    console.log('= Opt RenderLastSVGObject shouldRenderSelectionStates', shouldRenderSelectionStates);

    const isFromOverlayLayer = GlobalData.optManager.FromOverlayLayer;
    const activeLayerZList = this.ActiveLayerZList();
    const lastObjectId = activeLayerZList[activeLayerZList.length - 1];

    this.AddSVGObject(undefined, lastObjectId, false, shouldRenderSelectionStates);

    if (shouldRenderSelectionStates) {
      this.RenderAllSVGSelectionStates();
    }
  }

  ActiveLayerZList() {
    console.log('O.Opt ActiveLayerZList - Input');

    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, false);
    const activeLayerZList = layersManager.layers[layersManager.activelayer].zList;

    console.log('O.Opt ActiveLayerZList - Output:', activeLayerZList);
    return activeLayerZList;
  }

  AddSVGObject(containerElement, objectId, removeExisting, renderCallback) {
    console.log("O.Opt: AddSVGObject - Input:", { containerElement, objectId, removeExisting, renderCallback });

    let svgDocument = this.svgDoc;
    let drawingObject = GlobalData.objectStore.GetObject(objectId);

    console.log("O.Opt: AddSVGObject - Drawing object:", drawingObject);

    if (!drawingObject) {
      console.log("O.Opt: AddSVGObject - Output: No drawing object found.");
      return;
    }

    let drawingData = drawingObject.Data;
    drawingData.tag = objectId;
    let existingSvgElement;
    let shapeContainer = drawingData.CreateShape(svgDocument, renderCallback);

    if (shapeContainer) {
      shapeContainer.SetID(objectId);

      if (removeExisting) {
        existingSvgElement = this.svgObjectLayer.GetElementByID(objectId);
        if (shapeContainer) {
          this.svgObjectLayer.AddElement(shapeContainer, containerElement);
        }
        if (existingSvgElement) {
          this.svgObjectLayer.RemoveElement(existingSvgElement);
        }
      } else if (shapeContainer) {
        this.svgObjectLayer.AddElement(shapeContainer);
      }

      if (shapeContainer) {
        drawingData.PostCreateShapeCallback(svgDocument, shapeContainer, renderCallback);
      }

      try {
        shapeContainer.SetRotation(
          drawingData.RotationAngle,
          drawingData.Frame.x + drawingData.Frame.width / 2,
          drawingData.Frame.y + drawingData.Frame.height / 2
        );
      } catch (error) {
        console.log("O.Opt: AddSVGObject - SetRotation error:", error);
        throw error;
      }

      if (shapeContainer !== null) {
        if (renderCallback) {
          let domElement = shapeContainer.DOMElement();
          let hammerInstance = Hammer(domElement);

          let shapeTapHandler = DefaultEvt.Evt_ShapeTapFactory(drawingData);
          hammerInstance.on('tap', shapeTapHandler);

          if (!GlobalData.docHandler.IsReadOnly()) {
            GlobalData.Evt_ShapeDragStart = DefaultEvt.Evt_ShapeDragStartFactory(drawingData);
            hammerInstance.on('dragstart', GlobalData.Evt_ShapeDragStart);

            if (this.isMobilePlatform) {
              GlobalData.SDJS_LM_ShapeHold = DefaultEvt.Evt_ShapeHoldFactory(drawingData);
              hammerInstance.on('hold', GlobalData.SDJS_LM_ShapeHold);
            }

            if (drawingData.AllowTextEdit() || drawingData.AllowDoubleClick()) {
              GlobalData.SDJS_LM_ShapeDoubleTap = DefaultEvt.Evt_ShapeDoubleTapFactory(drawingData);
              hammerInstance.on('doubletap', GlobalData.SDJS_LM_ShapeDoubleTap);
            }

            shapeContainer.SetEventProxy(hammerInstance);
          }

          if (!this.isMobilePlatform && !GlobalData.docHandler.IsReadOnly()) {
            shapeContainer.svgObj.mouseover(function (event) {
              let elementId = this.SDGObj.GetID();
              let drawingObj = GlobalData.optManager.GetObjectPtr(elementId, false);
              if (drawingObj) {
                drawingObj.SetRolloverActions(svgDocument, shapeContainer, event);
              }
            });
          }

          drawingData.RegisterForDataDrop(shapeContainer);
        } else {
          shapeContainer.SetEventBehavior(ConstantData.EventBehavior.NONE);
        }
      }
    }

    console.log("O.Opt: AddSVGObject - Output: Completed adding SVG object for objectId", objectId);
  }

  NoteIsShowing(noteShapeId, noteTableCell) {
    console.log('O.Opt NoteIsShowing - Input:', { noteShapeId, noteTableCell });

    let isShowing = false;

    if (this.curNoteShape === noteShapeId) {
      if (noteTableCell) {
        if (this.curNoteTableCell && this.curNoteTableCell.uniqueid === noteTableCell.uniqueid) {
          isShowing = true;
        }
      } else if (this.curNoteTableCell == null) {
        isShowing = true;
      }
    }

    console.log('O.Opt NoteIsShowing - Output:', isShowing);
    return isShowing;
  }

  DoAutoGrowDrag(dragPoint: { x: number; y: number }): { x: number; y: number } {
    console.log("O.Opt DoAutoGrowDrag - Input:", dragPoint);

    // Ensure the drag point coordinates are non-negative
    if (dragPoint.x < 0) {
      dragPoint.x = 0;
    }
    if (dragPoint.y < 0) {
      dragPoint.y = 0;
    }

    let sessionData = GlobalData.objectStore.GetObject(GlobalData.optManager.theSEDSessionBlockID).Data;

    // If auto-grow is disabled by content header flags, constrain coordinates to session dimensions
    if (GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto) {
      if (dragPoint.x > sessionData.dim.x) {
        dragPoint.x = sessionData.dim.x;
      }
      if (dragPoint.y > sessionData.dim.y) {
        dragPoint.y = sessionData.dim.y;
      }
      console.log("O.Opt DoAutoGrowDrag - Output:", dragPoint);
      return dragPoint;
    } else {
      let newDimension: { x: number; y: number };

      // Grow the document width if dragPoint.x exceeds the current dimension
      if (dragPoint.x > sessionData.dim.x) {
        GlobalData.optManager.theDragGotAutoResizeOldX.push(sessionData.dim.x);

        // Refresh session data from the preserved block
        sessionData = GlobalData.objectStore.PreserveBlock(GlobalData.optManager.theSEDSessionBlockID).Data;
        newDimension = {
          x: sessionData.dim.x +
            GlobalData.optManager.theContentHeader.Page.papersize.x -
            (GlobalData.optManager.theContentHeader.Page.margins.left +
              GlobalData.optManager.theContentHeader.Page.margins.right),
          y: sessionData.dim.y
        };

        GlobalData.optManager.UpdateEdgeLayers([], sessionData.dim, newDimension);
        sessionData.dim.x += GlobalData.optManager.theContentHeader.Page.papersize.x -
          (GlobalData.optManager.theContentHeader.Page.margins.left +
            GlobalData.optManager.theContentHeader.Page.margins.right);
        GlobalData.optManager.bInAutoScroll = true;
        GlobalData.optManager.ResizeSVGDocument();
        GlobalData.optManager.bInAutoScroll = false;
        GlobalData.optManager.theDragGotAutoResizeRight = true;
      }
      // Shrink the document width if auto-resizing was active and dragPoint.x is less than the last increased value
      else if (
        GlobalData.optManager.theDragGotAutoResizeRight &&
        dragPoint.x < GlobalData.optManager.theDragGotAutoResizeOldX.slice(-1).pop()
      ) {
        sessionData = GlobalData.objectStore.PreserveBlock(GlobalData.optManager.theSEDSessionBlockID).Data;
        newDimension = {
          x: GlobalData.optManager.theDragGotAutoResizeOldX.pop(),
          y: sessionData.dim.y
        };

        GlobalData.optManager.UpdateEdgeLayers([], sessionData.dim, newDimension);
        sessionData.dim.x = newDimension.x;
        GlobalData.optManager.bInAutoScroll = true;
        GlobalData.optManager.ResizeSVGDocument();
        GlobalData.optManager.bInAutoScroll = false;
        if (GlobalData.optManager.theDragGotAutoResizeOldX.length === 0) {
          GlobalData.optManager.theDragGotAutoResizeRight = false;
        }
      }

      // Grow the document height if dragPoint.y exceeds the current dimension
      if (dragPoint.y > sessionData.dim.y) {
        GlobalData.optManager.theDragGotAutoResizeOldY.push(sessionData.dim.y);

        sessionData = GlobalData.objectStore.PreserveBlock(GlobalData.optManager.theSEDSessionBlockID).Data;
        newDimension = {
          x: sessionData.dim.x,
          y: sessionData.dim.y +
            GlobalData.optManager.theContentHeader.Page.papersize.y -
            (GlobalData.optManager.theContentHeader.Page.margins.top +
              GlobalData.optManager.theContentHeader.Page.margins.bottom)
        };

        GlobalData.optManager.UpdateEdgeLayers([], sessionData.dim, newDimension);
        sessionData.dim.y += GlobalData.optManager.theContentHeader.Page.papersize.y -
          (GlobalData.optManager.theContentHeader.Page.margins.top +
            GlobalData.optManager.theContentHeader.Page.margins.bottom);
        GlobalData.optManager.bInAutoScroll = true;
        GlobalData.optManager.ResizeSVGDocument();
        GlobalData.optManager.bInAutoScroll = false;
        GlobalData.optManager.theDragGotAutoResizeBottom = true;
      }
      // Shrink the document height if auto-resizing was active and dragPoint.y is less than the last increased value
      else if (
        GlobalData.optManager.theDragGotAutoResizeBottom &&
        dragPoint.y < GlobalData.optManager.theDragGotAutoResizeOldY.slice(-1).pop()
      ) {
        sessionData = GlobalData.objectStore.PreserveBlock(GlobalData.optManager.theSEDSessionBlockID).Data;
        newDimension = {
          x: sessionData.dim.x,
          y: GlobalData.optManager.theDragGotAutoResizeOldY.pop()
        };

        GlobalData.optManager.UpdateEdgeLayers([], sessionData.dim, newDimension);
        sessionData.dim.y = newDimension.y;
        GlobalData.optManager.bInAutoScroll = true;
        GlobalData.optManager.ResizeSVGDocument();
        GlobalData.optManager.bInAutoScroll = false;
        if (GlobalData.optManager.theDragGotAutoResizeOldY.length === 0) {
          GlobalData.optManager.theDragGotAutoResizeBottom = false;
        }
      }
      console.log("O.Opt DoAutoGrowDrag - Output:", dragPoint);
      return dragPoint;
    }
  }


  IsRectangleFullyEnclosed(outerRect: { x: number; y: number; width: number; height: number }, innerRect: { x: number; y: number; width: number; height: number }): boolean {
    console.log("O.Opt IsRectangleFullyEnclosed - Input:", { outerRect, innerRect });
    const isEnclosed = innerRect.x >= outerRect.x &&
      innerRect.x + innerRect.width <= outerRect.x + outerRect.width &&
      innerRect.y >= outerRect.y &&
      innerRect.y + innerRect.height <= outerRect.y + outerRect.height;
    console.log("O.Opt IsRectangleFullyEnclosed - Output:", isEnclosed);
    return isEnclosed;
  }

  GetLengthInRulerUnits(
    lengthInUnits: number,
    skipFeetConversion: boolean,
    offset: number,
    displayFlags: number
  ): string {
    console.log("O.Opt GetLengthInRulerUnits - Input:", { lengthInUnits, skipFeetConversion, offset, displayFlags });

    // Get session data for ruler settings
    let sessionData = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
    let resultString = "";
    let feetPart = 0;
    let inchPart = 0;
    let fractionalInches = 0;
    let totalUnits = 0;
    let tempFloor = 0;
    let remainder = 0;
    let fractionalDisplay = 0;
    let denominator = 0;
    let fractionString = "";
    let sign = 1;
    // Determine whether to show fractional inches by default
    let showFractionalInches = false;
    if (displayFlags) {
      showFractionalInches = (displayFlags & ConstantData.DimensionFlags.SED_DF_ShowFractionalInches) > 0;
    }
    let useFeetAsInches = false;
    if (displayFlags) {
      useFeetAsInches = (displayFlags & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches) > 0;
    }
    // Adjust for offset if provided
    if (offset) {
      offset *= 100;
      if (!GlobalData.docHandler.rulerSettings.useInches) {
        offset /= ConstantData.Defines.MetricConv;
      }
      lengthInUnits -= offset;
    }
    // If showing pixels, simply round the value
    if (GlobalData.docHandler.rulerSettings.showpixels) {
      resultString = String(Math.round(lengthInUnits));
      console.log("O.Opt GetLengthInRulerUnits - Output:", resultString);
      return resultString;
    }
    // Get converted length in display units
    totalUnits = this.GetLengthInUnits(lengthInUnits);
    // Process conversion if the settings use inches but display in feet and conversion is not skipped
    if (
      GlobalData.docHandler.rulerSettings.useInches &&
      GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Feet &&
      !skipFeetConversion
    ) {
      if (totalUnits < 0) {
        sign = -1;
        totalUnits = -totalUnits;
      }
      feetPart = Math.floor(totalUnits / 1);
      inchPart = 12 * (totalUnits - feetPart);
      if (showFractionalInches) {
        fractionalInches = inchPart - Math.floor(inchPart);
        inchPart = Math.floor(inchPart);
      }
      // Adjust inches and feet if inches reach 12
      if (Number(inchPart).toFixed() === "12") {
        inchPart = 0;
        feetPart++;
      }
      if (useFeetAsInches) {
        inchPart += 12 * feetPart;
        feetPart = 0;
      }
      // Process fractional part if any exists
      if (fractionalInches > 0) {
        denominator = this.GetFractionStringGranularity(sessionData);
        fractionalDisplay = fractionalInches / (denominator);
        fractionalDisplay = Math.round(fractionalDisplay);
        if (fractionalDisplay >= 1 / denominator) {
          fractionalDisplay = 0;
          if (++inchPart !== 12 || useFeetAsInches) {
            // No extra adjustment needed
          } else {
            feetPart++;
            inchPart = 0;
          }
        }
        if (fractionalDisplay > 0) {
          // Simplify the fraction by dividing by 2 until not even
          while (fractionalDisplay % 2 === 0) {
            fractionalDisplay /= 2;
            denominator *= 2;
          }
          fractionString = fractionalDisplay + '/' + Math.floor(1 / denominator);
        }
      }
      feetPart *= sign;
      if (feetPart !== 0) {
        resultString = feetPart + "'";
      }
      if (fractionString.length > 0) {
        resultString += ' ' + Number(inchPart).toFixed();
        resultString += ' ' + fractionString;
        resultString += '"';
      } else if (inchPart > 0) {
        inchPart = Math.round(inchPart);
        resultString += ' ' + inchPart + '"';
      }
    }
    // If display units are not feet, simply format the number with specified decimal places
    else if (
      GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Inches ||
      GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_M ||
      GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Cm ||
      GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Mm
    ) {
      resultString = totalUnits.toFixed(GlobalData.docHandler.rulerSettings.dp);
    }
    console.log("O.Opt GetLengthInRulerUnits - Output:", resultString);
    return resultString;
  }

  GetLengthInUnits(length: number): number {
    console.log("O.Opt GetLengthInUnits - Input:", { length });
    const result = length * this.GetToUnits();
    console.log("O.Opt GetLengthInUnits - Output:", result);
    return result;
  }


  GetToUnits(): number {
    console.log("O.Opt GetToUnits - Input");
    let dpi = GlobalData.docHandler.DocObject().GetWorkArea().docDpi;
    let conversionFactor = 0;
    dpi = GlobalData.docHandler.rulerSettings.major;
    conversionFactor = GlobalData.docHandler.rulerSettings.majorScale / dpi;
    if (!GlobalData.docHandler.rulerSettings.useInches) {
      conversionFactor *= GlobalData.docHandler.rulerSettings.metricConv;
    }
    console.log("O.Opt GetToUnits - Output:", conversionFactor);
    return conversionFactor;
  }

  CancelModalOperation(): void {
    console.log("O.Opt CancelModalOperation - Input: currentModalOperation =", this.currentModalOperation);
    switch (this.currentModalOperation) {
      case ConstantData2.ModalOperations.NONE:
        break;
      case ConstantData2.ModalOperations.STAMP:
        this.CancelObjectStamp(true);
        break;
      case ConstantData2.ModalOperations.STAMPTEXTONTAP:
        this.CancelObjectStampTextOnTap(true);
        break;
      case ConstantData2.ModalOperations.DRAGDROP:
        this.CancelObjectDragDrop(true);
        break;
      case ConstantData2.ModalOperations.DRAW:
        this.CancelObjectDraw();
        break;
      case ConstantData2.ModalOperations.FORMATPAINTER:
        this.SetFormatPainter(true, false);
        break;
      case ConstantData2.ModalOperations.ADDCORNER:
        if (GlobalData.gBusinessManager && GlobalData.gBusinessManager.AddCorner) {
          this.ResetHammerGesture('dragstart', GlobalData.gBusinessManager.AddCorner, GlobalData.Evt_ShapeDragStart);
        }
        break;
      case ConstantData2.ModalOperations.SPLITWALL:
        if (GlobalData.gBusinessManager && GlobalData.gBusinessManager.SplitWall) {
          this.ResetHammerGesture('dragstart', GlobalData.gBusinessManager.SplitWall, GlobalData.Evt_ShapeDragStart);
          GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT);
        }
        break;
    }
    console.log("O.Opt CancelModalOperation - Output: completed");
  }

  CancelObjectDraw(): void {
    console.log("O.Opt CancelObjectDraw - Input: No parameters");

    const actionObject = this.GetObjectPtr(this.theActionStoredObjectID, false);
    const isPolyLineOrContainer = actionObject instanceof PolyLine || actionObject instanceof PolyLineContainer;

    // Clear modal operation and release stamp if needed.
    this.SetModalOperation(ConstantData2.ModalOperations.NONE);
    this.LM_StampPostRelease(false);

    if (this.theActionStoredObjectID >= 0 && !isPolyLineOrContainer) {
      this.Undo(true);
      this.ClearFutureUndoStates();
      this.theActionStoredObjectID = -1;
      this.theDragBBoxList = [];
      this.theDragElementList = [];
      this.theActionSVGObject = null;
    } else {
      // Force update when there is an object, but it is a polyline type.
      this.GetObjectPtr(this.theActionStoredObjectID, true);
    }

    // Reset to default edit mode
    this.SetEditMode(ConstantData.EditState.DEFAULT);

    // Unbind drag/drop or stamp events.
    GlobalData.optManager.UnbindDragDropOrStamp();

    // Rebind work area events.
    this.WorkAreaHammer.on('dragstart', DefaultEvt.Evt_WorkAreaHammerDragStart);
    this.WorkAreaHammer.on('tap', DefaultEvt.Evt_WorkAreaHammerTap);

    // Call cancel on the drawing object if present.
    if (actionObject) {
      actionObject.CancelObjectDraw();
    }

    // Invoke any business manager cancellation routines if present.
    if (GlobalData.gBusinessManager.CancelObjectDraw) {
      GlobalData.gBusinessManager.CancelObjectDraw();
    }

    // Set the selection tool to the default select tool.
    // Commands.MainController.Selection.SetSelectionTool(Resources.Tools.Tool_Select, false);

    console.log("O.Opt CancelObjectDraw - Output: Object draw canceled.");
  }

  LM_StampPostRelease(completeOperation: boolean): void {
    console.log("O.Opt LM_StampPostRelease - Input:", { completeOperation });

    let hookUpdateStatus: number;
    let flowHookResult: boolean = false;

    // Process HiliteConnect if available
    if (this.LinkParams && this.LinkParams.HiliteConnect >= 0) {
      this.HiliteConnect(
        GlobalData.optManager.LinkParams.HiliteConnect,
        this.LinkParams.ConnectPt,
        false,
        false,
        this.theDragTargetID,
        this.LinkParams.HiliteInside
      );
      this.LinkParams.HiliteConnect = -1;
      // Fix potential typo: resetting HiliteInside to null
      this.LinkParams.HiliteInside = null;
    }

    // Process HiliteJoin if available
    if (this.LinkParams && this.LinkParams.HiliteJoin >= 0) {
      this.HiliteConnect(
        GlobalData.optManager.LinkParams.HiliteJoin,
        this.LinkParams.ConnectPt,
        false,
        true,
        this.theDragTargetID,
        null
      );
      this.LinkParams.HiliteJoin = -1;
    }

    // Reset edit mode to default
    this.SetEditMode(ConstantData.EditState.DEFAULT);

    if (completeOperation) {
      if (this.LinkParams && this.LinkParams.JoinIndex >= 0) {
        // If a join index exists, perform PolyLJoin
        this.PolyLJoin(
          this.LinkParams.JoinIndex,
          this.LinkParams.JoinData,
          this.theDragTargetID,
          this.LinkParams.JoinSourceData,
          false
        );
      } else if (this.LinkParams && (this.LinkParams.ConnectIndex >= 0 || this.LinkParams.InitialHook >= 0)) {
        // If connection indexes or an initial hook exists, handle flow chart hook logic
        if (GlobalData.gFlowChartManager) {
          flowHookResult = GlobalData.gFlowChartManager.FlowChartHook(
            this.theActionStoredObjectID,
            this.LinkParams.InitialHook,
            this.LinkParams.ConnectIndex,
            this.LinkParams.HookIndex,
            this.LinkParams.ConnectPt
          );
        }
        if (!flowHookResult) {
          if (this.LinkParams.ConnectHookFlag === ConstantData.HookFlags.SED_LC_AutoInsert) {
            this.SD_AutoInsertShape(this.theActionStoredObjectID, this.LinkParams.ConnectIndex);
          } else if (this.LinkParams.ConnectHookFlag === ConstantData.HookFlags.SED_LC_HookReverse) {
            this.LM_ReverseHook(this.theActionStoredObjectID);
          } else {
            hookUpdateStatus = this.UpdateHook(
              this.theActionStoredObjectID,
              this.LinkParams.InitialHook,
              this.LinkParams.ConnectIndex,
              this.LinkParams.HookIndex,
              this.LinkParams.ConnectPt,
              this.LinkParams.ConnectInside
            );
            if ((hookUpdateStatus !== 0 && hookUpdateStatus !== undefined) === false) {
              this.SetLinkFlag(this.LinkParams.ConnectIndex, ConstantData.LinkFlags.SED_L_MOVE);
            }
          }
        }
      }
    }

    // Reset LinkParams
    this.LinkParams = null;

    console.log("O.Opt LM_StampPostRelease - Output: Operation completed");
  }

  Undo(restoreSequence: boolean, cancelModalOperation: boolean): boolean {
    console.log("O.Opt Undo - Input:", { restoreSequence, cancelModalOperation });

    // Cancel modal operation if required
    if (cancelModalOperation) {
      GlobalData.optManager.CancelModalOperation();
    } else if (this.currentModalOperation !== ConstantData2.ModalOperations.NONE) {
      console.log("O.Opt Undo - Output:", false);
      return false;
    }

    // Make sure state manager exists
    if (GlobalData.stateManager === null) {
      throw new Error('stateManager is null');
    }

    // Close nudge if open and check state ID
    if (this.NudgeOpen) {
      GlobalData.optManager.CloseOpenNudge();
    }
    if (GlobalData.stateManager.CurrentStateID <= 0) {
      console.log("O.Opt Undo - Output:", false);
      return false;
    }

    // Get session and layer data
    const sessionObject = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
    const spellCheckEnabled = sessionObject.EnableSpellCheck;
    const layersManager = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, false);
    const activeLayerType = layersManager.layers[layersManager.activelayer].layertype;
    const tedSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);

    // Check if text editing is active; flush text and preserve undo state if necessary
    const isTextEditingActive = tedSession.theActiveTextEditObjectID !== -1 &&
      tedSession.theTELastOp !== ConstantData.TELastOp.INIT &&
      tedSession.theTELastOp !== ConstantData.TELastOp.TIMEOUT &&
      tedSession.theTELastOp !== ConstantData.TELastOp.SELECT;
    if (isTextEditingActive) {
      this.FlushTextToLMBlock();
      this.PreserveUndoState(false);
    }

    // Determine if the state was open before undo
    const isStateOpen = Utils1.IsStateOpen();

    // Update sequence ID if required
    if (restoreSequence) {
      GlobalData.CURRENT_SEQ_OBJECT_ID = GlobalData.stateManager.States[GlobalData.stateManager.CurrentStateID].CURRENT_SEQ_OBJECT_ID;
    }

    // Restore previous state and update history if necessary
    GlobalData.stateManager.RestorePrevState();
    if (!restoreSequence) {
      GlobalData.stateManager.AddToHistoryState();
    }

    const currentStateID = GlobalData.stateManager.CurrentStateID;
    this.RebuildURLs(currentStateID + 1, false);
    this.ResizeSVGDocument();
    this.UpdateLineHops(true);

    // Update spell check settings if changed
    const sessionBlock = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
    if (spellCheckEnabled !== sessionBlock.EnableSpellCheck) {
      SDUI.Commands.MainController.Document.SetSpellCheck(sessionBlock.EnableSpellCheck, false);
    }

    // Update ruler settings if necessary
    const rulerSettings = GlobalData.docHandler.rulerSettings;
    if (GlobalData.docHandler.RulersNotEqual(sessionObject.rulerSettings, rulerSettings)) {
      GlobalData.docHandler.SetRulers(sessionObject.rulerSettings, true);
    }

    // Update page settings if changed
    if (GlobalData.docHandler.PagesNotEqual(sessionObject.Page, GlobalData.optManager.theContentHeader.Page)) {
      GlobalData.optManager.theContentHeader.Page = Utils1.DeepCopy(sessionObject.Page);
    }

    // Ensure an active outline is selected if no selection exists
    const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, false);
    const tedSessionAfter = this.GetObjectPtr(this.theTEDSessionBlockID, false);
    if (tedSessionAfter.theActiveOutlineObjectID !== -1 && selectedList.length === 0) {
      const activeOutlineObjects: number[] = [];
      activeOutlineObjects.push(tedSessionAfter.theActiveOutlineObjectID);
      this.SelectObjects(activeOutlineObjects, false, false);
    }

    // Unregister text editor events, render objects and restore active text edit if necessary
    this.TEUnregisterEvents(true);
    GlobalData.optManager.InUndo = true;
    this.RenderAllSVGObjects();
    GlobalData.optManager.InUndo = false;

    if (tedSessionAfter.theActiveTextEditObjectID !== -1) {
      this.ResetActiveTextEditAfterUndo();
    }

    // Update display coordinates based on target selection if available
    const targetSelect = GlobalData.optManager.GetTargetSelect();
    if (targetSelect >= 0) {
      const selectedObject = this.GetObjectPtr(targetSelect, false);
      let dimensions = null;
      if (selectedObject) {
        dimensions = selectedObject.GetDimensionsForDisplay();
        this.ShowFrame(true);
      }
      GlobalData.optManager.UpdateDisplayCoordinates(dimensions, null, null, selectedObject);
    } else {
      this.ShowFrame(false);
    }

    // Update selection attributes and comments panels
    this.UpdateSelectionAttributes(selectedList);
    // GlobalData.optManager.CommentIdleTab();
    // GlobalData.optManager.Comment_UpdatePanel(null);
    // GlobalData.optManager.Comment_UpdateDropDown();

    // Save changed blocks if state was not open before undo
    if (!isStateOpen) {
      SDF.SaveChangedBlocks(currentStateID, -1);
    }

    console.log("O.Opt Undo - Output:", true);
    return true;
  }

  Redo_DeleteURLs = function () {
    var e,
      t,
      a,
      r,
      i,
      n,
      o,
      s,
      l;
    if (
      !(
        (r = GlobalData.stateManager.CurrentStateID) + 1 >= GlobalData.stateManager.States.length
      )
    ) for (e = GlobalData.stateManager.States[r + 1].StoredObjects.length, t = 0; t < e; t++) (a = GlobalData.stateManager.States[r + 1].StoredObjects[t]).Type === ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT ? a.StateOperationTypeID === Globals.StateOperationType.DELETE ? (i = GlobalData.objectStore.GetObject(a.ID)) &&
      (
        n = i.Data,
        this.IsBlobURL(n.ImageURL) &&
        this.DeleteURL(n.ImageURL)
      ) : (i = GlobalData.objectStore.GetObject(a.ID)) &&
    (
      n = i.Data,
      this.IsBlobURL(n.ImageURL) &&
      a.Data.ImageURL !== n.ImageURL &&
      this.DeleteURL(n.ImageURL)
    ) : a.Type === ConstantData.StoredObjectType.TABLE_OBJECT &&
    (
      a.StateOperationTypeID === Globals.StateOperationType.DELETE ? (o = GlobalData.objectStore.GetObject(a.ID)) &&
        (s = o.Data, this.Table_DeleteURLs(s)) : (o = GlobalData.objectStore.GetObject(a.ID)) &&
      (s = o.Data, l = a.Data, this.Table_RefreshURLs(s, l, !0))
    )
  }

  ClearFutureUndoStates() {
    GlobalData.stateManager.ClearFutureUndoStates();
  }

  UnbindDragDropOrStamp() {
    console.log('O.Opt UnbindDragDropOrStamp - Input: No parameters');

    if (GlobalData.optManager.MainAppHammer) {
      GlobalData.optManager.MainAppHammer.dispose();
      GlobalData.optManager.MainAppHammer = null;
    }

    console.log('O.Opt UnbindDragDropOrStamp - Output: DragDrop or Stamp unbound');
  }

  UpdateLinks() {
    console.log("O.Opt UpdateLinks - Input: No parameters");

    let objectFrame;
    let linkCount;
    let linkIndex;
    let targetNodeId;
    let targetObject;
    let hookPoint;
    let targetPoints;
    let numTargetPoints;
    let pointIndex;
    let bestPointIndex;
    let distanceSquared;
    let deltaY;
    let deltaX;
    let bestDistance;
    let hookObject;
    let hookTargetObject;
    let hookIndex;
    let moveList;
    let currentObject;
    let moveListLength;
    let continueProcessing = true;
    let needsBoundsCheck = false;
    let hasDeletedLinks = false;
    let hookFlags = 0;
    let hookPosition = {
      x: 0,
      y: 0
    };
    let perimeterPoints = [
      {
        x: 0,
        y: 0
      }
    ];
    let moveBounds = {};
    const constantData = ConstantData;
    const links = this.GetObjectPtr(this.theLinksBlockID, false);
    let isLinksModified = false;

    // Early return if no links exist
    if (links == null) {
      this.UpdateLineHops(true);
      console.log("O.Opt UpdateLinks - Output: 1 (No links found)");
      return 1;
    }

    // Fix any circular references in hooks
    GlobalData.optManager.FixAnyCircularHooks();

    // Get session data and save original snap setting
    const sessionData = this.GetObjectPtr(this.theSEDSessionBlockID, false);
    const originalSnapEnabled = GlobalData.docHandler.documentConfig.enableSnap;

    // Disable snapping during link updates
    GlobalData.docHandler.documentConfig.enableSnap = false;

    // First pass: Delete marked links
    for (linkIndex = links.length - 1; linkIndex >= 0 && !(linkIndex >= links.length); linkIndex--) {
      // Handle links marked for deletion
      if (links[linkIndex].flags & constantData.LinkFlags.SED_L_DELT) {
        // Ensure we're working with a modifiable copy of links
        if (!isLinksModified) {
          links = this.GetObjectPtr(this.theLinksBlockID, true);
          isLinksModified = true;
        }

        this.DeleteLink(links, links[linkIndex].targetid, -1, null, 0, false);
        linkIndex = links.length;
      }
      // Handle links with missing or broken hook objects
      else if (
        links[linkIndex].flags & constantData.LinkFlags.SED_L_DELL ||
        links[linkIndex].flagss & constantData.LinkFlags.SED_L_BREAK ||
        (hookObject = this.GetObjectPtr(links[linkIndex].hookid, false)) == null
      ) {
        if (!isLinksModified) {
          links = this.GetObjectPtr(this.theLinksBlockID, true);
          isLinksModified = true;
        }

        this.DeleteLink(
          links,
          links[linkIndex].targetid,
          links[linkIndex].hookid,
          links[linkIndex].cellid,
          0,
          false
        );

        linkIndex = links.length;
      }
    }

    // Special handling for tree and flowchart layouts
    if (
      sessionData.flags & constantData.SessionFlags.SEDS_NoTreeOverlap ||
      sessionData.flags & constantData.SessionFlags.SEDS_IsFlowChart
    ) {
      let linkHasMoveFlag;
      linkCount = links.length;

      const treeTopInfo = {
        topconnector: -1,
        topshape: -1,
        foundtree: false
      };

      for (linkIndex = 0; linkIndex < linkCount; linkIndex++) {
        linkHasMoveFlag = links[linkIndex].flags & constantData.LinkFlags.SED_L_MOVE;

        if (linkHasMoveFlag) {
          targetObject = this.GetObjectPtr(links[linkIndex].targetid, false);

          // If tree top is found, mark it for movement
          if (/*Business.FindTreeTop(targetObject, linkHasMoveFlag, treeTopInfo)*/ 1 &&
            treeTopInfo.topshape >= 0) {
            GlobalData.optManager.SetLinkFlag(
              treeTopInfo.topshape,
              ConstantData.LinkFlags.SED_L_MOVE
            );
          }

          // Reset tree top info for next iteration
          treeTopInfo.topshape = -1;
          treeTopInfo.foundtree = false;
        }
      }
    }

    // Process links with move flags
    while (continueProcessing) {
      continueProcessing = false;

      for (linkIndex = 0; linkIndex < links.length; linkIndex++) {
        if (links[linkIndex].flags & constantData.LinkFlags.SED_L_MOVE) {
          // Ensure we're working with a modifiable copy of links
          if (!isLinksModified) {
            links = this.GetObjectPtr(this.theLinksBlockID, true);
            isLinksModified = true;
          }

          hookObject = this.GetObjectPtr(links[linkIndex].hookid, true);

          // If hook object is missing, mark link for deletion
          if (hookObject == null) {
            links[linkIndex].flags = Utils2.SetFlag(
              links[linkIndex].flags,
              constantData.LinkFlags.SED_L_DELL,
              true
            );
            links[linkIndex].flags = Utils2.SetFlag(
              links[linkIndex].flags,
              constantData.LinkFlags.SED_L_MOVE,
              false
            );
            hasDeletedLinks = true;
            continue;
          }

          // Verify link and get hook index
          hookIndex = this.VerifyLink(hookObject, links[linkIndex]);
          if (hookIndex >= 0) {
            // Set hook object to not be visible when linked
            hookObject.LinkNotVisible();

            hookTargetObject = this.GetObjectPtr(links[linkIndex].targetid, false);

            // Special handling for multiplicity objects
            if (hookObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY) {
              links[linkIndex].flags = Utils2.SetFlag(
                links[linkIndex].flags,
                constantData.LinkFlags.SED_L_CHANGE,
                false
              );
            }

            // If the link has the change flag set, update connection points
            if (links[linkIndex].flags & constantData.LinkFlags.SED_L_CHANGE) {
              hookPoint = hookObject.HookToPoint(hookObject.hooks[hookIndex].hookpt, null);

              hookFlags = ConstantData.HookFlags.SED_LC_NoSnaps |
                ConstantData.HookFlags.SED_LC_ForceEnd;

              hookFlags = Utils2.SetFlag(
                hookFlags,
                ConstantData.HookFlags.SED_LC_ShapeOnLine,
                !(hookObject instanceof BaseLine)
              );

              targetPoints = hookTargetObject.GetTargetPoints(
                hookPoint,
                hookFlags,
                hookObject.BlockID
              );

              // Find the closest target point
              if (targetPoints) {
                numTargetPoints = targetPoints.length;
                bestDistance = null;

                for (pointIndex = 0; pointIndex < numTargetPoints; pointIndex++) {
                  deltaX = targetPoints[pointIndex].x - hookObject.hooks[hookIndex].connect.x;
                  deltaY = targetPoints[pointIndex].y - hookObject.hooks[hookIndex].connect.y;

                  distanceSquared = deltaX * deltaX + deltaY * deltaY;

                  if (bestDistance == null || distanceSquared < bestDistance) {
                    bestDistance = distanceSquared;
                    bestPointIndex = pointIndex;
                  }
                }

                // Update with best connection point
                if (bestPointIndex != null) {
                  hookObject.hooks[hookIndex].connect.x = targetPoints[bestPointIndex].x;

                  if (hookObject.DrawingObjectBaseClass != ConstantData.DrawingObjectBaseClass.CONNECTOR) {
                    hookObject.hooks[hookIndex].connect.y = targetPoints[bestPointIndex].y;
                  }
                }
              }

              // Update the hook point to the best one for the target
              hookObject.hooks[hookIndex].hookpt = hookTargetObject.GetBestHook(
                links[linkIndex].hookid,
                hookObject.hooks[hookIndex].hookpt,
                hookObject.hooks[hookIndex].connect
              );

              // Clear the change flag
              links[linkIndex].flags = Utils2.SetFlag(
                links[linkIndex].flags,
                constantData.LinkFlags.SED_L_CHANGE,
                false
              );
            }

            // Get the current hook position
            hookPosition = hookObject.HookToPoint(hookObject.hooks[hookIndex].hookpt, null);
            if (hookPosition == null) continue;

            // Update connection points for the target object
            if (hookTargetObject != null) {
              perimeterPoints[0].x = hookObject.hooks[hookIndex].connect.x;
              perimeterPoints[0].y = hookObject.hooks[hookIndex].connect.y;

              perimeterPoints = hookTargetObject.GetPerimPts(
                links[linkIndex].targetid,
                perimeterPoints,
                hookObject.hooks[hookIndex].hookpt,
                false,
                links[linkIndex].cellid,
                links[linkIndex].hookid
              );

              // Handle special cases based on hook count
              if (hookObject.hooks.length === 1) {
                // Calculate offset needed to align with perimeter point
                deltaX = perimeterPoints[0].x - hookPosition.x;
                if (Math.abs(deltaX) < 0.1) deltaX = 0;

                deltaY = perimeterPoints[0].y - hookPosition.y;
                if (Math.abs(deltaY) < 0.1) deltaY = 0;

                // Apply offset if needed
                if (deltaX || deltaY) {
                  this.OffsetShape(
                    links[linkIndex].hookid,
                    deltaX,
                    deltaY,
                    ConstantData.ActionTriggerType.UPDATELINKS
                  );

                  // Check if object went out of bounds
                  objectFrame = hookObject.Frame;
                  if (
                    objectFrame.x < 0 ||
                    objectFrame.y < 0 ||
                    objectFrame.x + objectFrame.width > sessionData.dim.x ||
                    objectFrame.y + objectFrame.height > sessionData.dim.y
                  ) {
                    needsBoundsCheck = true;
                    targetNodeId = this.GetTargetNode(links[linkIndex].hookid);

                    targetObject = this.GetObjectPtr(targetNodeId, false);
                    if (targetObject) {
                      targetObject.flags = Utils2.SetFlag(
                        targetObject.flags,
                        ConstantData.ObjFlags.SEDO_Bounds,
                        true
                      );
                    }
                  }
                }
              }
              // For objects with exactly 2 hooks, use LinkGrow
              else if (hookObject.hooks.length === 2) {
                hookObject.LinkGrow(
                  links[linkIndex].hookid,
                  hookObject.hooks[hookIndex].hookpt,
                  perimeterPoints[0]
                );
              }
            }

            // Clear move flag and continue processing
            links[linkIndex].flags = Utils2.SetFlag(
              links[linkIndex].flags,
              constantData.LinkFlags.SED_L_MOVE,
              false
            );
            continueProcessing = true;
          } else {
            hasDeletedLinks = true;
          }
        }
      }
    }

    // Clean up any links marked for deletion
    if (hasDeletedLinks) {
      for (linkIndex = links.length - 1; linkIndex >= 0 && !(linkIndex >= links.length); linkIndex--) {
        if (links[linkIndex].flags & constantData.LinkFlags.SED_L_DELT) {
          this.DeleteLink(links, links[linkIndex].targetid, -1, null, 0, false);
          linkIndex = links.length;
        }
        else if (
          links[linkIndex].flags & constantData.LinkFlags.SED_L_DELL ||
          links[linkIndex].flagss & constantData.LinkFlags.SED_L_BREAK ||
          (hookObject = this.GetObjectPtr(links[linkIndex].hookid, false)) == null
        ) {
          this.DeleteLink(
            links,
            links[linkIndex].targetid,
            links[linkIndex].hookid,
            links[linkIndex].cellid,
            0,
            false
          );
          linkIndex = links.length;
        }
      }
    }

    // Handle objects that went out of bounds
    if (needsBoundsCheck) {
      const zList = this.ZList();

      this.InitializeAutoGrowDrag();
      linkCount = zList.length;

      for (linkIndex = 0; linkIndex < linkCount; linkIndex++) {
        currentObject = this.GetObjectPtr(zList[linkIndex], false);

        if (currentObject &&
          currentObject.flags & ConstantData.ObjFlags.SEDO_Bounds) {

          // Clear bounds flag
          currentObject.flags = Utils2.SetFlag(
            currentObject.flags,
            ConstantData.ObjFlags.SEDO_Bounds,
            false
          );

          // Get objects to move together
          moveList = this.GetMoveList(
            zList[linkIndex],
            false,
            true,
            false,
            moveBounds,
            false
          );

          // Calculate needed offsets to fit in document bounds
          deltaX = 0;
          if (moveBounds.x + moveBounds.width > sessionData.dim.x) {
            deltaX = sessionData.dim.x - (moveBounds.x + moveBounds.width);
          }
          if (deltaX < -moveBounds.x) {
            deltaX = -moveBounds.x;
          }

          deltaY = 0;
          if (moveBounds.y + moveBounds.height > sessionData.dim.y) {
            deltaY = sessionData.dim.y - (moveBounds.y + moveBounds.height);
          }
          if (deltaY < -moveBounds.y) {
            deltaY = -moveBounds.y;
          }

          // Apply offsets if needed
          moveListLength = moveList.length;
          if ((deltaX || deltaY) && moveListLength) {
            for (pointIndex = 0; pointIndex < moveListLength; pointIndex++) {
              this.OffsetShape(
                moveList[pointIndex],
                deltaX,
                deltaY,
                ConstantData.ActionTriggerType.UPDATELINKS
              );
            }
          }
        }
      }

      this.theMoveList = null;
    }

    // Restore original snap setting
    GlobalData.docHandler.documentConfig.enableSnap = originalSnapEnabled;

    console.log("O.Opt UpdateLinks - Output: 0 (Success)");
    return 0;
  }


  FixAnyCircularHooks(initialLinkObject?: any): void {
    console.log("O.Opt FixAnyCircularHooks - Input:", { initialLinkObject });

    // Determine the initial hook IDs
    const hookIds = initialLinkObject
      ? [initialLinkObject.BlockID]
      : (() => {
        const links = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, false);
        let ids: number[] = [];
        const linksCount = links.length;
        for (let i = 0; i < linksCount; i++) {
          if (!ids.includes(links[i].hookid)) {
            ids.push(links[i].hookid);
          }
        }
        return ids;
      })();

    // Array to store circular hook pairs
    let circularHookPairs: Array<{ objectId: number; hookObjectId: number }> = [];

    // Traverse each hook id to find circular references
    const hookIdsCount = hookIds.length;
    for (let i = 0; i < hookIdsCount; i++) {
      traverseHooks(circularHookPairs, hookIds[i]);
    }

    // Function to recursively traverse hooks
    function traverseHooks(
      result: Array<{ objectId: number; hookObjectId: number }>,
      currentId: number,
      visited: number[] = []
    ) {
      // Add current id to visited list
      visited.push(currentId);
      const currentObject = GlobalData.optManager.GetObjectPtr(currentId, false);
      if (!currentObject) return;
      const hooksCount = currentObject.hooks.length;
      for (let j = 0; j < hooksCount; j++) {
        const nextHookId = currentObject.hooks[j].objid;
        if (visited.indexOf(nextHookId) >= 0) {
          addHookPair(result, currentId, nextHookId);
        } else {
          traverseHooks(result, nextHookId, copyArray(visited));
        }
      }
    }

    // Helper function to copy an array
    function copyArray(arr: number[]): number[] {
      let newArr: number[] = [];
      for (let i = 0; i < arr.length; i++) {
        newArr[i] = arr[i];
      }
      return newArr;
    }

    // Helper function to add a hook pair if not already present
    function addHookPair(
      result: Array<{ objectId: number; hookObjectId: number }>,
      objectId: number,
      hookObjectId: number
    ) {
      if (!result.some(item => item.objectId === objectId && item.hookObjectId === hookObjectId)) {
        result.push({ objectId, hookObjectId });
      }
    }

    // Process the found circular hook pairs
    (function processCircularHooks(hookPairs: Array<{ objectId: number; hookObjectId: number }>) {
      const links = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLinksBlockID, false);
      const hookPairsCount = hookPairs.length;
      for (let i = 0; i < hookPairsCount; i++) {
        const currentObj = GlobalData.optManager.GetObjectPtr(hookPairs[i].objectId, true);
        const hookObj = GlobalData.optManager.GetObjectPtr(hookPairs[i].hookObjectId);
        if (hookObj instanceof Connector) {
          GlobalData.optManager.DeleteObjects([hookObj.BlockID], false);
          continue;
        }
        currentObj.hooks = currentObj.hooks.filter(h => h.objid != hookPairs[i].hookObjectId);
        const linkIndex = GlobalData.optManager.FindExactLink(links, hookPairs[i].hookObjectId, hookPairs[i].objectId);
        if (linkIndex >= 0) {
          links[linkIndex].flags = Utils2.SetFlag(links[linkIndex].flags, ConstantData.LinkFlags.SED_L_DELT, true);
        }
      }
    })(circularHookPairs);

    console.log("O.Opt FixAnyCircularHooks - Output: Circular hooks fixed", { circularHookPairs });
  }


  PostObjectDraw(event) {
    console.log('O.Opt PostObjectDraw - Input:', event);

    let affectedObjects = [];
    let actionObject = GlobalData.objectStore.GetObject(this.theActionStoredObjectID);

    if (actionObject != null) {
      if (actionObject.Data.Frame == null || (actionObject.Data.Frame.width < 10 && actionObject.Data.Frame.height < 10)) {
        this.Undo(true);
        this.ClearFutureUndoStates();
      } else {
        actionObject.Data.sizedim.width = actionObject.Data.Frame.width;
        actionObject.Data.sizedim.height = actionObject.Data.Frame.height;
        GlobalData.stateManager.ReplaceInCurrentState(this.theActionStoredObjectID, actionObject);

        if (actionObject.Data.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) {
          affectedObjects.push(this.theActionStoredObjectID);
        }

        if (!this.IsTopMostVisibleLayer()) {
          this.MarkAllAllVisibleHigherLayerObjectsDirty();
        }

        this.AddToDirtyList(this.theActionStoredObjectID);
      }

      this.PostObjectDrawCommon(affectedObjects, event);
      console.log('O.Opt PostObjectDraw - Output:', affectedObjects.length);
      return affectedObjects.length;
    }

    this.PostObjectDrawCommon(null, event);
    console.log('O.Opt PostObjectDraw - Output: 0');
    return 0;
  }


  AddToDirtyList(objectId: number, isMoveOnly: boolean) {
    console.log('O.Opt AddToDirtyList - Input:', { objectId, isMoveOnly });

    if (this.theDirtyList.indexOf(objectId) < 0) {
      this.theDirtyList.push(objectId);
      this.theDirtyListMoveOnly[objectId] = !!isMoveOnly;
    } else if (!isMoveOnly) {
      this.theDirtyListMoveOnly[objectId] = false;
    }

    console.log('O.Opt AddToDirtyList - Output: Dirty list updated');
  }

  PostObjectDrawCommon(affectedObjects, event) {
    console.log('O.Opt PostObjectDrawCommon - Input:', { affectedObjects, event });

    this.CompleteOperation(affectedObjects);
    this.ResetObjectDraw();
    // this.UpdateTools();

    if (GlobalData.gBusinessManager.PostObjectDrawHook) {
      GlobalData.gBusinessManager.PostObjectDrawHook(event);
    }

    this.theActionStoredObjectID = -1;
    this.theActionSVGObject = null;

    console.log('O.Opt PostObjectDrawCommon - Output: Operation completed');
  }

  DynamicSnaps_UpdateGuides(e, t, a) {

  }

  DynamicSnapsRemoveGuides(guides: any) {
    console.log('O.Opt DynamicSnapsRemoveGuides - Input:', guides);
    if (guides) {
      for (const guideKey in guides) {
        if (guides[guideKey]) {
          const labelId = guideKey + 'label';
          const backgroundId = guideKey + 'back';
          let guideElement = GlobalData.optManager.svgHighlightLayer.GetElementByID(guideKey);
          let labelElement = GlobalData.optManager.svgHighlightLayer.GetElementByID(labelId);
          let backgroundElement = GlobalData.optManager.svgHighlightLayer.GetElementByID(backgroundId);

          if (guideElement) {
            GlobalData.optManager.svgHighlightLayer.RemoveElement(guideElement);
          }
          if (labelElement) {
            GlobalData.optManager.svgHighlightLayer.RemoveElement(labelElement);
          }
          if (backgroundElement) {
            GlobalData.optManager.svgHighlightLayer.RemoveElement(backgroundElement);
          }

          if (guides[guideKey].otherhits) {
            const otherHits = guides[guideKey].otherhits;
            for (let index = 0; index < otherHits.length; index++) {
              const otherHit = otherHits[index];
              const otherLabelId = guideKey + otherHit.ID.toString() + 'label';
              const otherBackgroundId = guideKey + otherHit.ID.toString() + 'back';
              guideElement = GlobalData.optManager.svgHighlightLayer.GetElementByID(guideKey + otherHit.ID.toString());
              labelElement = GlobalData.optManager.svgHighlightLayer.GetElementByID(otherLabelId);
              backgroundElement = GlobalData.optManager.svgHighlightLayer.GetElementByID(otherBackgroundId);

              if (guideElement) {
                GlobalData.optManager.svgHighlightLayer.RemoveElement(guideElement);
              }
              if (labelElement) {
                GlobalData.optManager.svgHighlightLayer.RemoveElement(labelElement);
              }
              if (backgroundElement) {
                GlobalData.optManager.svgHighlightLayer.RemoveElement(backgroundElement);
              }
            }
          }
        }
      }
    }
    guides = null;
    console.log('O.Opt DynamicSnapsRemoveGuides - Output: guides cleared');
  }

  UpdateLineHops(forceUpdate: boolean) {
    console.log("O.Opt UpdateLineHops - Input:", { forceUpdate });

    // Retrieve the session object and check if hops are allowed
    const session = this.GetObjectPtr(this.theSEDSessionBlockID, false);
    if (session.flags & ConstantData.SessionFlags.SEDS_AllowHops) {
      this.HideHopTargets();
      const visibleObjects = this.VisibleZList();
      const totalVisible = visibleObjects.length;

      // Arrays to store candidate line IDs and candidate lines with hops
      const candidateLineIds: number[] = [];
      const candidateLineHopIds: number[] = [];
      const hopDimension = session.hopdim.x;

      // Counters and mode flag variables for processing
      let allLineCount = 0;
      let hopLineCount = 0;
      let modeFlag = -1; // -1: initial, -2: found modified, -3: found hop
      let startHopIndex = 0;

      // Iterate through all visible objects to find BaseLine objects that need hop updates
      for (let i = 0; i < totalVisible; i++) {
        const objId = visibleObjects[i];
        const obj = this.GetObjectPtr(objId, false);
        if (obj instanceof BaseLine && !(obj instanceof PolyLine)) {
          // Check if object is modified or force update is enabled.
          if ((obj.flags & ConstantData.ObjFlags.SEDO_LineMod || forceUpdate) && modeFlag === -1) {
            modeFlag = -2;
          }
          candidateLineIds.push(objId);
          allLineCount++;

          // Check if object has hop flag set
          if (obj.flags & ConstantData.ObjFlags.SEDO_LineHop) {
            if (modeFlag === -2) {
              startHopIndex = hopLineCount;
              modeFlag = -3;
            }
            candidateLineHopIds.push(objId);
            hopLineCount++;
          }

          // Clear the modified flag for the object
          obj.flags = Utils2.SetFlag(obj.flags, ConstantData.ObjFlags.SEDO_LineMod, false);
        }
      }

      // Process candidate lines with hops if any are found and modeFlag indicates hops
      if (hopLineCount && modeFlag === -3) {
        for (let j = startHopIndex; j < hopLineCount; j++) {
          const lineId = candidateLineHopIds[j];
          const lineObject = this.GetObjectPtr(lineId, false);

          // Reset hop list on the line
          lineObject.hoplist.nhops = 0;
          lineObject.hoplist.hops = [];

          // For each candidate line (up to the current one) that comes before the hop candidate,
          // check if there's any valid hook connection.
          for (let k = 0; k < allLineCount && candidateLineIds[k] !== lineId; k++) {
            let linkFound = false;

            // Check in the current object's hooks for a link to candidateLineIds[k]
            for (let hook of lineObject.hooks) {
              if (hook.objid === candidateLineIds[k]) {
                linkFound = true;
                break;
              }
            }
            // If no link is found, check the candidate object's hooks for a link to the current object
            if (!linkFound) {
              const candidateObj = this.GetObjectPtr(candidateLineIds[k], false);
              for (let hook of candidateObj.hooks) {
                if (hook.objid === lineId) {
                  linkFound = true;
                  break;
                }
              }
            }
            // If still not found, test the physical intersection of their bounding rectangles
            if (!linkFound) {
              const rectLine = {};
              const rectCandidate = {};
              Utils2.CopyRect(rectLine, lineObject.r);
              Utils2.CopyRect(rectCandidate, this.GetObjectPtr(candidateLineIds[k], false).r);
              if (rectLine["width"] === 0) rectLine["width"] = 1;
              if (rectLine["height"] === 0) rectLine["height"] = 1;
              if (rectCandidate["width"] === 0) rectCandidate["width"] = 1;
              if (rectCandidate["height"] === 0) rectCandidate["height"] = 1;

              if (Utils2.IntersectRect(rectLine, rectCandidate)) {
                lineObject.CalcLineHops(this.GetObjectPtr(candidateLineIds[k], false), 0);
              }
            }
          }

          // If more than one hop is recorded, sort and consolidate close hops
          if (lineObject.hoplist.nhops > 1) {
            lineObject.hoplist.hops.sort(this.Hop_Compare);
            for (let a = lineObject.hoplist.nhops - 1; a > 0; a--) {
              const deltaX = lineObject.hoplist.hops[a - 1].pt.x - lineObject.hoplist.hops[a].pt.x;
              const deltaY = lineObject.hoplist.hops[a - 1].pt.y - lineObject.hoplist.hops[a].pt.y;
              if (Utils2.sqrt(deltaX * deltaX + deltaY * deltaY) < 3 * hopDimension) {
                lineObject.hoplist.hops[a - 1].cons = true;
              }
            }
          }

          // Adjust hop positions relative to the line's start and end points and mark the object as dirty
          if (lineObject.hoplist.nhops || lineObject.hoplist.hops.length) {
            const baseRect = Utils2.Pt2Rect(lineObject.StartPoint, lineObject.EndPoint);
            for (let a = 0; a < lineObject.hoplist.nhops; a++) {
              lineObject.hoplist.hops[a].pt.x -= baseRect.x;
              lineObject.hoplist.hops[a].pt.y -= baseRect.y;
            }
            this.AddToDirtyList(lineId);
          }
        }
      }
    }
    console.log("O.Opt UpdateLineHops - Output: Completed updating line hops");
  }

  RenderDirtySVGObjects() {
    this.RenderDirtySVGObjectsCommon(true);
  }

  RenderDirtySVGObjectsCommon(renderSelectionStates: boolean) {
    console.log("O.Opt RenderDirtySVGObjectsCommon - Input:", { renderSelectionStates });

    // If no redraw is set from the same editor, clear dirty list and reset flag.
    // if (Collab.NoRedrawFromSameEditor) {
    //   this.theDirtyList.length = 0;
    //   Collab.NoRedrawFromSameEditor = false;
    // }

    if (this.collaboration.NoRedrawFromSameEditor) {
      this.theDirtyList.length = 0;
      this.collaboration.NoRedrawFromSameEditor = false;
    }

    // Process if there are dirty objects.
    if (this.theDirtyList.length !== 0) {
      // Get all visible object IDs and active visible object IDs.
      const visibleObjectIds = this.VisibleZList();
      const activeVisibleObjectIds = this.ActiveVisibleZList();

      // Filter visible objects that are not flagged as "not visible".
      const filteredVisibleObjectIds = (function (objectIds: number[]): number[] {
        const result: number[] = [];
        const notVisibleFlag = ConstantData.ObjFlags.SEDO_NotVisible;
        for (let index = 0; index < objectIds.length; index++) {
          const objectRef = GlobalData.optManager.GetObjectPtr(objectIds[index], false);
          if (objectRef && (objectRef.flags & notVisibleFlag) === 0) {
            result.push(objectIds[index]);
          }
        }
        return result;
      })(visibleObjectIds);

      // Sort the dirty list based on the ordering in the visible list.
      GlobalData.optManager.theDirtyList.sort((objectId1, objectId2) => {
        return visibleObjectIds.indexOf(objectId1) < visibleObjectIds.indexOf(objectId2) ? -1 : 1;
      });

      // Loop through each dirty object.
      const dirtyCount = this.theDirtyList.length;
      for (let index = 0; index < dirtyCount; index++) {
        let hasSelectionState = false;
        const objectId = this.theDirtyList[index];
        const isMoveOnly = this.theDirtyListMoveOnly[objectId];

        // Find the position of the object in the filtered visible list; if not found, search in the full visible list.
        let positionIndex = filteredVisibleObjectIds.indexOf(objectId);
        if (positionIndex < 0) {
          positionIndex = visibleObjectIds.indexOf(objectId);
        }

        // If the object is found in the visible list.
        if (positionIndex >= 0) {
          if (renderSelectionStates) {
            hasSelectionState = activeVisibleObjectIds.indexOf(objectId) !== -1;
          }
          // If "move-only", call MoveSVG; otherwise add the SVG object.
          if (isMoveOnly) {
            const drawingObject = this.GetObjectPtr(objectId, false);
            if (drawingObject) {
              drawingObject.MoveSVG();
            }
          } else {
            this.AddSVGObject(positionIndex, objectId, true, hasSelectionState);
          }
        }
      }

      // If a reordering of the dirty list is needed, reassign each SVG element to its new position.
      if (GlobalData.optManager.DirtyListReOrder) {
        const count = filteredVisibleObjectIds.length;
        for (let idx = 0; idx < count; idx++) {
          const id = filteredVisibleObjectIds[idx];
          const svgElement = this.svgObjectLayer.GetElementByID(id);
          if (svgElement) {
            this.svgObjectLayer.RemoveElement(svgElement);
            this.svgObjectLayer.AddElement(svgElement, idx);
          }
        }
      }
      // Finally, clear the dirty list.
      this.ClearDirtyList();
    }
    console.log("O.Opt RenderDirtySVGObjectsCommon - Output: Completed rendering dirty SVG objects");
  }

  ClearDirtyList() {
    console.log('O.Opt ClearDirtyList - Input: No parameters');

    this.theDirtyList = [];
    this.theDirtyListMoveOnly = [];
    this.DirtyListReOrder = false;

    console.log('O.Opt ClearDirtyList - Output: Dirty list cleared');
  }

  FitDocumentWorkArea(preserveState, forceFlag, allowOverride, fitOptions) {
    console.log('O.Opt FitDocumentWorkArea - Input:', { preserveState, forceFlag, allowOverride, fitOptions });

    let objectEnclosingRect;
    let layerIndex;
    let layerCount;
    let isEdgeLayerVisible;
    let documentSizeChanged;
    let isUsingEdgeLayer = false;
    let shouldUseEdges = false;
    let needMinHeightEnforcement = false;
    let needMinWidthEnforcement = false;

    // Get the layers manager to check layer settings
    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, false);

    // Check for edge layers and their visibility
    if (layersManager.layers[layersManager.activelayer].flags & ConstantData.LayerFlags.SDLF_UseEdges) {
      isUsingEdgeLayer = true;
      isEdgeLayerVisible = layersManager.layers[layersManager.activelayer].flags & ConstantData.LayerFlags.SDLF_Visible;
    }

    // Check if any visible layer uses edges
    layerCount = layersManager.nlayers;
    for (layerIndex = 0; layerIndex < layerCount; layerIndex++) {
      if ((layersManager.layers[layerIndex].flags & ConstantData.LayerFlags.SDLF_UseEdges) &&
        (layersManager.layers[layerIndex].flags & ConstantData.LayerFlags.SDLF_Visible) ||
        isUsingEdgeLayer) {
        shouldUseEdges = true;
        break;
      }
    }

    // Calculate the enclosing rectangle for all objects
    objectEnclosingRect = this.CalcAllObjectEnclosingRect(shouldUseEdges && !isUsingEdgeLayer, fitOptions);

    let newWidth;
    let newHeight;
    let sessionData = this.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
    let paperSize = GlobalData.optManager.theContentHeader.Page.papersize;
    let margins = GlobalData.optManager.theContentHeader.Page.margins;
    let pageWidth = paperSize.x - (margins.left + margins.right);
    let pageHeight = paperSize.y - (margins.top + margins.bottom);
    let newDocumentSize = {};

    // Ensure non-negative coordinates
    if (objectEnclosingRect.x < 0) {
      objectEnclosingRect.x = 0;
    }
    if (objectEnclosingRect.y < 0) {
      objectEnclosingRect.y = 0;
    }

    // Calculate new dimensions
    newWidth = Math.floor(objectEnclosingRect.x + objectEnclosingRect.width);
    newHeight = Math.floor(objectEnclosingRect.y + objectEnclosingRect.height);

    // Apply minimum size constraints if using edges but not on edge layer
    if (shouldUseEdges && !isUsingEdgeLayer) {
      if (newHeight < GlobalData.optManager.theContentHeader.Page.minsize.y) {
        newHeight = GlobalData.optManager.theContentHeader.Page.minsize.y;
        needMinHeightEnforcement = true;
      }
      if (newWidth < GlobalData.optManager.theContentHeader.Page.minsize.x) {
        newWidth = GlobalData.optManager.theContentHeader.Page.minsize.x;
        needMinWidthEnforcement = true;
      }
    }

    // Handle page-based layouts
    if (this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_Pages && !isUsingEdgeLayer) {
      let widthInPages = Math.ceil(newWidth / pageWidth);
      let heightInPages = Math.ceil(newHeight / pageHeight);

      if (widthInPages < 1) widthInPages = 1;
      if (heightInPages < 1) heightInPages = 1;

      let currentWidthInPages, currentHeightInPages;

      if (shouldUseEdges) {
        currentWidthInPages = Math.ceil(sessionData.dim.x / pageWidth);
        currentHeightInPages = Math.ceil(sessionData.dim.y / pageHeight);
      } else {
        currentWidthInPages = Math.round(sessionData.dim.x / pageWidth);
        currentHeightInPages = Math.round(sessionData.dim.y / pageHeight);
      }

      if (currentWidthInPages < 1) currentWidthInPages = 1;
      if (currentHeightInPages < 1) currentHeightInPages = 1;

      // Check if we need to resize
      if (
        newWidth <= sessionData.dim.x &&
        newHeight <= sessionData.dim.y &&
        !forceFlag &&
        widthInPages >= currentWidthInPages &&
        heightInPages >= currentHeightInPages &&
        currentWidthInPages === 1 &&
        currentHeightInPages === 1
      ) {
        console.log('O.Opt FitDocumentWorkArea - Output: No resize needed');
        return;
      }

      // Calculate new document size in pages
      newDocumentSize = {
        x: widthInPages * pageWidth,
        y: heightInPages * pageHeight
      };

      if (needMinWidthEnforcement) {
        newDocumentSize.x = newWidth;
      }
      if (needMinHeightEnforcement) {
        newDocumentSize.y = newHeight;
      }

      // Honor no-auto-grow flag
      if (this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto) {
        if (newDocumentSize.x < sessionData.dim.x) newDocumentSize.x = sessionData.dim.x;
        if (newDocumentSize.y < sessionData.dim.y) newDocumentSize.y = sessionData.dim.y;
      }
    } else {
      // Handle non-page based layouts
      if (isUsingEdgeLayer) {
        objectEnclosingRect.width += 12;
        objectEnclosingRect.height += 12;
      }

      newDocumentSize.x = objectEnclosingRect.x + objectEnclosingRect.width;
      newDocumentSize.y = objectEnclosingRect.y + objectEnclosingRect.height;

      // Special handling for edge layers
      if (isUsingEdgeLayer &&
        (!Utils2.IsEqual(newDocumentSize.x, sessionData.dim.x, 2) ||
          !Utils2.IsEqual(newDocumentSize.y, sessionData.dim.y, 2))) {

        if (isEdgeLayerVisible) {
          if (newDocumentSize.x < pageWidth) {
            newDocumentSize.x = pageWidth;
          }
          if (newDocumentSize.y < pageHeight) {
            newDocumentSize.y = pageHeight;
          }

          if (!(this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto)) {
            GlobalData.optManager.theContentHeader.Page.minsize.y = newDocumentSize.y;
            GlobalData.optManager.theContentHeader.Page.minsize.x = newDocumentSize.x;
          }
        } else {
          GlobalData.optManager.theContentHeader.Page.minsize.x = pageWidth;
          GlobalData.optManager.theContentHeader.Page.minsize.y = pageHeight;
        }
      }

      // Apply minimum size constraints
      if (newDocumentSize.x < GlobalData.optManager.theContentHeader.Page.minsize.x) {
        newDocumentSize.x = GlobalData.optManager.theContentHeader.Page.minsize.x;
      }
      if (newDocumentSize.y < GlobalData.optManager.theContentHeader.Page.minsize.y) {
        newDocumentSize.y = GlobalData.optManager.theContentHeader.Page.minsize.y;
      }
    }

    // Check if dimensions actually changed
    documentSizeChanged = Utils2.IsEqual(newDocumentSize.x, sessionData.dim.x) &&
      Utils2.IsEqual(newDocumentSize.y, sessionData.dim.y);

    const isGrowing = newDocumentSize.x > sessionData.dim.x ||
      newDocumentSize.y > sessionData.dim.y;

    // Handle document resize
    if (documentSizeChanged) {
      if (GlobalData.docHandler.CheckScaleToFit()) {
        this.ResizeSVGDocument();
      }
    } else {
      // Handle no-auto-grow constraint
      if (
        this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto &&
        !allowOverride &&
        (!isGrowing || isExactPageMultiple(sessionData.dim, pageWidth, pageHeight))
      ) {
        if (isGrowing) {
          const error = new Error(Resources.Strings.Error_Bounds);
          error.name = '1';
          throw error;
        }
        console.log('O.Opt FitDocumentWorkArea - Output: No resize needed (NoAuto constraint)');
        return;
      }

      let shouldPreserve = true;
      if (preserveState) {
        shouldPreserve = false;
      }

      sessionData = this.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, shouldPreserve);
      this.UpdateEdgeLayers([], sessionData.dim, newDocumentSize);
      sessionData.dim.x = newDocumentSize.x;
      sessionData.dim.y = newDocumentSize.y;
      this.ResizeSVGDocument();
    }

    console.log('O.Opt FitDocumentWorkArea - Output:', {
      newSize: newDocumentSize,
      documentSizeChanged,
      isGrowing
    });

    // Helper function to check if a dimension is an exact page multiple
    function isExactPageMultiple(dimension, pageW, pageH) {
      const widthRemainder = dimension.x % pageW;
      return Utils2.IsEqual(widthRemainder, 0);
    }
  }

  CalcAllObjectEnclosingRect(shouldUseEdges, fitOptions) {
    console.log("O.Opt CalcAllObjectEnclosingRect - Input:", { shouldUseEdges, fitOptions });

    // Get all visible objects and their count
    const visibleObjects = this.VisibleZList();
    const visibleObjectCount = visibleObjects.length;

    // Default padding values
    let widthPadding = 0;
    let heightPadding = 0;

    // Get layers manager to check layer settings
    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, false);

    // Initialize empty enclosing rectangle
    let enclosingRect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };

    // If no visible objects, return empty rect
    if (visibleObjectCount === 0) {
      console.log("O.Opt CalcAllObjectEnclosingRect - Output:", enclosingRect);
      return enclosingRect;
    }

    let layerIndex = 0;
    let objectId = 0;
    let objectData = null;
    let objectRect = null;
    let objectsFromEdgeLayers = [];

    // Collect objects from edge layers if needed
    for (layerIndex = 0; layerIndex < layersManager.nlayers; layerIndex++) {
      if (layerIndex !== layersManager.activelayer &&
        layersManager.layers[layerIndex].flags & ConstantData.LayerFlags.SDLF_UseEdges) {

        // Add objects from this edge layer to our collection
        objectsFromEdgeLayers = objectsFromEdgeLayers.concat(layersManager.layers[layerIndex].zList);

        if (shouldUseEdges) {
          // Add padding for edge layers
          widthPadding = 25;
          heightPadding = 25;

          const objectsInEdgeLayer = objectsFromEdgeLayers.length;
          const sessionData = this.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);

          // Check for annotations near the bottom of the document
          for (let i = 0; i < objectsInEdgeLayer; i++) {
            objectData = GlobalData.optManager.GetObjectPtr(objectsFromEdgeLayers[i], false);
            if (objectData &&
              objectData.objecttype === ConstantData.ObjectTypes.SD_OBJT_ANNOTATION &&
              objectData.Frame.y + objectData.Frame.height >= sessionData.dim.y - ConstantData.Defines.AnnoHotDist) {

              heightPadding = 10 + sessionData.dim.y - objectData.Frame.y;
            }
          }
        }
      }
    }

    // Process all visible objects to calculate the enclosing rectangle
    let processedObjectCount = 0;

    for (let i = 0; i < visibleObjectCount; i++) {
      objectId = visibleObjects[i];

      // Skip objects already processed from edge layers
      if (objectsFromEdgeLayers.indexOf(objectId) >= 0) {
        continue;
      }

      const objectBlock = GlobalData.objectStore.GetObject(objectId);
      if (objectBlock == null) {
        continue;
      }

      objectData = objectBlock.Data;

      // Skip invisible objects
      if (objectData.flags & ConstantData.ObjFlags.SEDO_NotVisible) {
        continue;
      }

      // Get the appropriate rectangle based on the fitOptions parameter
      objectRect = fitOptions ?
        Utils1.DeepCopy(objectData.Frame) :
        Utils1.DeepCopy(objectData.r);

      // If this is the first object, use its rect as the initial enclosing rect
      if (processedObjectCount === 0) {
        enclosingRect = Utils1.DeepCopy(objectRect);
      } else {
        // Otherwise, expand the enclosing rect to include this object
        Utils2.UnionRect(objectRect, enclosingRect, enclosingRect);
      }

      processedObjectCount++;
    }

    // Apply padding for edge layers if needed
    if (shouldUseEdges) {
      enclosingRect.width += widthPadding;
      enclosingRect.height += heightPadding;
    }

    console.log("O.Opt CalcAllObjectEnclosingRect - Output:", enclosingRect);
    return enclosingRect;
  }

  SelectObjects(objectsToSelect, isMultipleSelection, preserveSelectionState) {
    console.log("O.Opt SelectObjects - Input:", { objectsToSelect, isMultipleSelection, preserveSelectionState });

    let selectedIndex = -1;

    if (objectsToSelect && objectsToSelect.length > 0) {
      const tedSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);

      // Close text editing if active
      if (tedSession.theActiveTextEditObjectID !== -1) {
        this.DeactivateTextEdit(false, true);
      }

      // Release table editing if active
      if (tedSession.theActiveTableObjectID !== -1) {
        this.Table_Release(false);
      }

      const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, preserveSelectionState);
      selectedIndex = this.GetTargetSelect();

      // If not multiple selection mode, clear existing selection
      if (!isMultipleSelection) {
        this.SetDimensionVisibility(selectedList, false);
        selectedList.length = 0;
      }

      // Handle current selection state
      if (selectedIndex >= 0) {
        const indexInSelectedList = $.inArray(selectedIndex, selectedList);
        if (isMultipleSelection) {
          if (indexInSelectedList >= 0) {
            selectedIndex = -1;
          }
        } else {
          if (indexInSelectedList < 0) {
            selectedIndex = -1;
          }
        }
      }

      // Process each object to select
      for (let i = 0; i < objectsToSelect.length; i++) {
        let objectId = objectsToSelect[i];
        const object = this.GetObjectPtr(objectId, false);

        if (object) {
          const indexInSelectedList = $.inArray(objectId, selectedList);

          // If object not in selection list, add it
          if (indexInSelectedList === -1) {
            if (selectedIndex < 0) {
              selectedIndex = objectId;
            }
            selectedList.push(objectId);
          }
          // If in multiple selection mode and object already selected, remove it
          else if (isMultipleSelection) {
            const objectInList = GlobalData.optManager.GetObjectPtr(objectId, false);
            if (objectInList) {
              objectInList.ShowOrHideDimensions(false);
            }
            selectedList.splice(indexInSelectedList, 1);
          }
        }
      }

      // Ensure selectedIndex is valid
      if (selectedIndex >= 0) {
        const indexInSelectedList = $.inArray(selectedIndex, selectedList);
        if (indexInSelectedList < 0) {
          selectedIndex = -1;
        }
      }

      // If no selection index but we have objects selected, use the first one
      if (selectedIndex < 0 && selectedList.length > 0) {
        selectedIndex = selectedList[0];
      }

      // Update the target selection
      this.SetTargetSelect(selectedIndex, preserveSelectionState);
      this.LastOpDuplicate = false;
      this.UpdateSelectionAttributes(selectedList);
      this.HideAllSVGSelectionStates();
      this.RenderAllSVGSelectionStates();
    }

    console.log("O.Opt SelectObjects - Output:", { selectedIndex, selectedCount: objectsToSelect?.length || 0 });
  }

  /**
   * Gets a list of objects to move based on specified criteria.
   *
   * @param objectId - ID of the object to move
   * @param useSelectedList - Whether to use the selected list
   * @param includeEnclosedObjects - Whether to include enclosed objects
   * @param useVisibleList - Whether to use visible objects list
   * @param boundsRect - Optional rectangle to accumulate bounds
   * @param targetOnlyMode - Whether to use target-only mode
   * @returns Array of object IDs that should move together
   */
  GetMoveList(objectId, useSelectedList, includeEnclosedObjects, useVisibleList, boundsRect, targetOnlyMode) {
    console.log("O.Opt GetMoveList - Input:", {
      objectId,
      useSelectedList,
      includeEnclosedObjects,
      useVisibleList,
      boundsRect,
      targetOnlyMode
    });

    let index, currentObject;
    this.theMoveList = [];

    let objectsList, hookFlags, listCode, objectCount, enclosedObjects, enclosedCount, enclosedIndex;
    const links = this.GetObjectPtr(this.theLinksBlockID, false);

    if (links == null) {
      console.log("O.Opt GetMoveList - Output: No links found, returning empty list");
      return this.theMoveList;
    }

    // Determine the list code to use based on mode
    listCode = targetOnlyMode
      ? ConstantData.ListCodes.SED_LC_TARGONLY
      : ConstantData.ListCodes.SED_LC_MOVETARG;

    // Check for special move target handling
    if (objectId >= 0) {
      currentObject = this.GetObjectPtr(objectId, false);

      if (currentObject) {
        hookFlags = currentObject.GetHookFlags();

        // If object has MoveTarget flag and hooks, get the target node
        if (hookFlags & ConstantData.HookFlags.SED_LC_MoveTarget &&
          useSelectedList &&
          currentObject.hooks.length) {
          objectId = this.GetTargetNode(currentObject.hooks[0].objid);
        }
      }
    }

    // Process lists of objects
    if (useSelectedList || useVisibleList) {
      // Get either visible objects or selected objects based on flag
      objectsList = useVisibleList
        ? this.ActiveVisibleZList().slice(0)
        : this.GetObjectPtr(this.theSelectedListBlockID, false).slice(0);

      // Process each object in the list
      for (index = 0; index < objectsList.length; index++) {
        currentObject = this.GetObjectPtr(objectsList[index], false);

        if (currentObject) {
          // Handle special case for event labels
          if (currentObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT_LABEL) {
            if (objectsList.indexOf(currentObject.associd) === -1) {
              objectsList.push(currentObject.associd);
            }
            continue;
          }

          // Add to move list if object has no hooks or we're including enclosed objects
          if (currentObject.hooks.length === 0 || includeEnclosedObjects) {
            this.theMoveList = this.GetHookList(
              links,
              this.theMoveList,
              objectsList[index],
              currentObject,
              listCode,
              boundsRect
            );
          }
        }
      }
    }

    // Process the target object if provided
    if (objectId >= 0) {
      currentObject = this.GetObjectPtr(objectId, false);

      if (currentObject && (currentObject.hooks.length === 0 || includeEnclosedObjects)) {
        this.theMoveList = this.GetHookList(
          links,
          this.theMoveList,
          objectId,
          currentObject,
          listCode,
          boundsRect
        );
      }
    }

    // Include enclosed objects if requested
    if (includeEnclosedObjects) {
      objectCount = this.theMoveList.length;

      for (index = 0; index < objectCount; index++) {
        currentObject = this.GetObjectPtr(this.theMoveList[index], false);

        // Get objects enclosed by this object
        enclosedObjects = currentObject.GetListOfEnclosedObjects(true);
        enclosedCount = enclosedObjects.length;

        // Add any enclosed objects that aren't already in the move list
        for (enclosedIndex = 0; enclosedIndex < enclosedCount; enclosedIndex++) {
          const enclosedId = enclosedObjects[enclosedIndex];

          if (this.theMoveList.indexOf(enclosedId) < 0) {
            this.theMoveList.push(enclosedId);
          }
        }
      }
    }

    console.log("O.Opt GetMoveList - Output:", {
      objectCount: this.theMoveList.length,
      moveList: this.theMoveList
    });

    return this.theMoveList;
  }

  GetHookList(links, hookList, objectId, object, listCode, boundsRect) {
    console.log("O.Opt GetHookList - Input:", {
      objectId,
      listCode,
      hookListLength: hookList ? hookList.length : 0,
      boundsRect
    });

    let targetOnly = false;
    let skipObject = false;
    let linkIndex = -1;
    let objectRect = {};

    // Handle special list codes by mapping them to standard codes
    if (listCode === ConstantData.ListCodes.SED_LC_CHILDRENONLY) {
      skipObject = true;
      listCode = ConstantData.ListCodes.SED_LC_CIRCTARG;
    }

    if (listCode === ConstantData.ListCodes.SED_LC_LINESONLY) {
      skipObject = true;
      listCode = ConstantData.ListCodes.SED_LC_TOPONLY;
    }

    // Process based on list code type
    switch (listCode) {
      case ConstantData.ListCodes.SED_LC_MOVETARG:
        // For move targets, check if we need to switch to move hook mode
        if ((object.hooks.length > 1 ||
          (object.hooks.length === 1 &&
            object.flags & ConstantData.ObjFlags.SEDO_Assoc))) {
          listCode = ConstantData.ListCodes.SED_LC_MOVEHOOK;
        }

        // Return if objectId is already in the list
        if (hookList.indexOf(objectId) >= 0) {
          console.log("O.Opt GetHookList - Output: Object already in list", hookList);
          return hookList;
        }
        break;

      case ConstantData.ListCodes.SED_LC_MOVEHOOK:
        // Return if objectId is already in the list
        if (hookList.indexOf(objectId) >= 0) {
          console.log("O.Opt GetHookList - Output: Object already in list", hookList);
          return hookList;
        }
        break;

      case ConstantData.ListCodes.SED_LC_MOVETARGANDLINES:
      case ConstantData.ListCodes.SED_LC_CIRCTARG:
        // No special handling for these codes
        break;

      case ConstantData.ListCodes.SED_LC_TARGONLY:
        targetOnly = true;
        linkIndex = -1;
        break;
    }

    // Find the link index if not target-only mode
    if (!targetOnly) {
      linkIndex = this.FindLink(links, objectId, true);
    }

    // Add the object to the hook list if not already present and not skipped
    if (hookList.indexOf(objectId) < 0 && !skipObject) {
      hookList.push(objectId);

      // Update bounds rectangle if provided and object is visible
      if (boundsRect &&
        !(object.flags & ConstantData.ObjFlags.SEDO_NotVisible)) {
        objectRect = object.GetMoveRect(true, true);

        if (hookList.length === 1) {
          Utils2.CopyRect(boundsRect, objectRect);
        } else {
          boundsRect = Utils2.UnionRect(boundsRect, objectRect, boundsRect);
        }
      }

      // Add enclosed objects to the hook list
      const enclosedObjects = object.GetListOfEnclosedObjects(true);
      if (enclosedObjects.length) {
        GlobalData.optManager.JoinHookList(hookList, enclosedObjects);
      }
    }

    // Process linked objects if found
    if (linkIndex >= 0) {
      this.AddToHookList(links, hookList, linkIndex, objectId, listCode, 0, boundsRect);
    }

    // Handle special case for move hooks with multiple hooks or associated objects
    if (listCode === ConstantData.ListCodes.SED_LC_MOVEHOOK &&
      (object.hooks.length >= 2 ||
        object.flags & ConstantData.ObjFlags.SEDO_Assoc)) {
      this.GetTargetList(objectId, links, hookList, boundsRect, listCode);
    }

    console.log("O.Opt GetHookList - Output: Hook list updated", {
      hookListLength: hookList.length,
      boundsRect
    });

    return hookList;
  }

  FindLink(links, targetId, exactMatchOnly) {
    console.log("O.Opt FindLink - Input:", { links, targetId, exactMatchOnly });

    if (links.length === 0) {
      const result = exactMatchOnly ? -1 : 0;
      console.log("O.Opt FindLink - Output (empty links):", result);
      return result;
    }

    for (let index = 0; index < links.length; index++) {
      // If we find an exact match for the target ID
      if (links[index].targetid === targetId) {
        console.log("O.Opt FindLink - Output (exact match):", index);
        return index;
      }

      // If we're not requiring an exact match and found a target ID that's greater
      // than what we're looking for (used for sorted insertion)
      if (!exactMatchOnly && links[index].targetid > targetId) {
        console.log("O.Opt FindLink - Output (insertion point):", index);
        return index;
      }
    }

    // No match found - return appropriate value based on exactMatchOnly
    const result = exactMatchOnly ? -1 : links.length;
    console.log("O.Opt FindLink - Output (no match):", result);
    return result;
  }

  ScrollObjectIntoView(objectId, shouldCenterObject, customRect) {
    console.log("O.Opt ScrollObjectIntoView - Input:", { objectId, shouldCenterObject, customRect });

    let objectRect;

    // If no object ID provided, use the target selection
    if (objectId == null || objectId == -1) {
      objectId = this.GetTargetSelect();
    }

    // Exit if no valid object ID
    if (objectId == -1) {
      console.log("O.Opt ScrollObjectIntoView - Output: No valid object ID");
      return;
    }

    // Get the rectangle for the object
    if (customRect) {
      objectRect = customRect;
    } else {
      const object = this.GetObjectPtr(objectId, false);
      if (object == null) {
        console.log("O.Opt ScrollObjectIntoView - Output: Object not found");
        return;
      }
      objectRect = object.r;
    }

    // Get current visible area
    const docInfo = this.svgDoc.docInfo;
    const visibleRect = {
      x: docInfo.docVisX,
      y: docInfo.docVisY,
      width: docInfo.docVisWidth,
      height: docInfo.docVisHeight
    };

    // Check if object is already fully visible and we don't need to center it
    if (this.IsRectangleFullyEnclosed(visibleRect, objectRect) && !shouldCenterObject) {
      console.log("O.Opt ScrollObjectIntoView - Output: Object already visible");
      return;
    }

    let scrollX, scrollY;

    // Handle oversized objects
    if (objectRect.width >= visibleRect.width || objectRect.height >= visibleRect.height) {
      if (Utils2.UnionRect(visibleRect, objectRect, visibleRect) && !shouldCenterObject) {
        console.log("O.Opt ScrollObjectIntoView - Output: Oversized object, no scroll needed");
        return;
      }
    }

    // Center object if requested
    if (shouldCenterObject) {
      const viewportCenterX = visibleRect.x + visibleRect.width / 2;
      const viewportCenterY = visibleRect.y + visibleRect.height / 2;
      const objectCenterX = objectRect.x + objectRect.width / 2;
      const objectCenterY = objectRect.y + objectRect.height / 2;

      // Calculate offset to center object
      const offsetY = viewportCenterY - objectCenterY;
      scrollX = (visibleRect.x - (viewportCenterX - objectCenterX)) * docInfo.docToScreenScale;
      scrollY = (visibleRect.y - offsetY) * docInfo.docToScreenScale;

      GlobalData.docHandler.SetScroll(scrollX, scrollY);
      console.log("O.Opt ScrollObjectIntoView - Output: Centered object", { scrollX, scrollY });
      return;
    }

    // Otherwise, scroll to make object visible with padding
    scrollX = visibleRect.x;
    scrollY = visibleRect.y;

    // Adjust padding based on document size
    let verticalPadding = 20;
    let horizontalPadding = 20;

    if (docInfo.docVisWidth < docInfo.docWidth) {
      horizontalPadding = 30;
    }

    if (docInfo.docVisHeight < docInfo.docHeight) {
      verticalPadding = 30;
    }

    // Adjust horizontal scroll if needed
    if (objectRect.x < visibleRect.x) {
      scrollX = objectRect.x - 20;
    }

    if (objectRect.x + objectRect.width > visibleRect.x + visibleRect.width) {
      scrollX = objectRect.x + objectRect.width - visibleRect.width + horizontalPadding;
    }

    // Adjust vertical scroll if needed
    if (objectRect.y < visibleRect.y) {
      scrollY = objectRect.y - 20;
    }

    if (objectRect.y + objectRect.height > visibleRect.y + visibleRect.height) {
      scrollY = objectRect.y + objectRect.height - visibleRect.height + verticalPadding;
    }

    // Convert to screen coordinates and scroll
    scrollX *= docInfo.docToScreenScale;
    scrollY *= docInfo.docToScreenScale;

    GlobalData.docHandler.SetScroll(scrollX, scrollY);
    console.log("O.Opt ScrollObjectIntoView - Output: Scrolled to make object visible", { scrollX, scrollY });
  }

  ResetObjectDraw() {
    console.log('O.Opt ResetObjectDraw - Input: No parameters');

    // Reset object references
    this.theActionStoredObjectID = -1;
    this.theActionSVGObject = null;

    // Force update of object data
    this.GetObjectPtr(this.theActionStoredObjectID, true);

    // Reset edit mode to default
    this.SetEditMode(ConstantData.EditState.DEFAULT);

    // Rebind default work area events
    this.WorkAreaHammer.on('dragstart', DefaultEvt.Evt_WorkAreaHammerDragStart);
    this.WorkAreaHammer.on('tap', DefaultEvt.Evt_WorkAreaHammerTap);

    // Clear any modal operations
    this.SetModalOperation(ConstantData2.ModalOperations.NONE);

    console.log('O.Opt ResetObjectDraw - Output: Object draw state reset');
  }

  /**
   * Updates the active drawing tool based on current selection state.
   * This function handles tool persistence when sticky selection is enabled,
   * and resets to the default selection tool when sticky selection is disabled.
   */
  UpdateTools() {
    console.log("O.Opt UpdateTools - Input: No parameters");

    let mouseEvent;

    if (!ConstantData.DocumentContext.SelectionToolSticky) {
      // If sticky selection is not enabled, set tool back to Select
      if (ConstantData.DocumentContext.SelectionTool !== Resources.Tools.Tool_Select) {
        // SDUI.Commands.MainController.Selection.SetSelectionTool(Resources.Tools.Tool_Select, false);
      }
    } else {
      // If sticky selection is enabled, maintain the current drawing tool
      switch (ConstantData.DocumentContext.SelectionTool) {
        case Resources.Tools.Tool_Line:
          Commands.MainController.Shapes.DrawNewLineShape(null, false, true);
          break;

        case Resources.Tools.Tool_Shape:
          mouseEvent = { type: 'mousedown' };
          Commands.MainController.Shapes.StampOrDragDropNewShape(mouseEvent, null);
          mouseEvent = { type: 'mouseup' };
          Commands.MainController.Shapes.StampOrDragDropNewShape(mouseEvent, null);
          break;

        case Resources.Tools.Tool_Text:
          Commands.MainController.Shapes.StampTextLabel(true, true);
          break;

        case Resources.Tools.Tool_Wall:
          Commands.MainController.Shapes.DrawNewWallShape(true, null);
          break;

        case Resources.Tools.Tool_Symbol:
          mouseEvent = { type: 'mousedown' };
          const selectedButton = Commands.MainController.Symbols.GetSelectedButton();
          Commands.MainController.Shapes.DragDropSymbol(mouseEvent, selectedButton);
          mouseEvent = { type: 'click' };
          Commands.MainController.Shapes.DragDropSymbol(mouseEvent, selectedButton);
          break;

        case Resources.Tools.Tool_StyledLine:
          Commands.MainController.Shapes.DrawNewStyledLineShape(null, true);
          break;
      }
    }

    console.log("O.Opt UpdateTools - Output: Tool selection updated");
  }

  LM_MoveClick(event) {
    console.log("O.Opt LM_MoveClick - Input:", event);

    if (
      GlobalData.optManager.IsWheelClick(event) ||
      ConstantData.DocumentContext.SpacebarDown
    ) {
      DefaultEvt.Evt_WorkAreaHammerDragStart(event);
      Utils2.StopPropagationAndDefaults(event);
      console.log("O.Opt LM_MoveClick - Output: Wheel click or spacebar down detected, redirected to WorkAreaHammerDragStart");
      return;
    }

    Utils2.StopPropagationAndDefaults(event);

    try {
      // Blur any focused HTML control
      if (ConstantData.DocumentContext.HTMLFocusControl &&
        ConstantData.DocumentContext.HTMLFocusControl.blur) {
        ConstantData.DocumentContext.HTMLFocusControl.blur();
      }

      // Close nudge panel if open
      if (this.NudgeOpen) {
        GlobalData.optManager.CloseOpenNudge();
      }

      // Set up the move operation
      const setupResult = this.LM_SetupMove(event);

      // Handle different setup results
      if (setupResult !== true) {
        if (setupResult === -1) {
          // Collab.UnLockMessages();
          console.log("O.Opt LM_MoveClick - Output: Setup failed with -1, unlocked messages");
          return;
        } else {
          // Collab.UnLockMessages();
          // Collab.UnBlockMessages();
          console.log("O.Opt LM_MoveClick - Output: Setup failed, unlocked and unblocked messages");
          return;
        }
      }

      // // If setup was successful, continue with move operation
      // Collab.UnLockMessages();

      // Set edit mode if not in a modal operation
      if (this.currentModalOperation === ConstantData2.ModalOperations.NONE) {
        GlobalData.optManager.SetEditMode(ConstantData.EditState.DRAGSHAPE);
      }

      // Register event handlers for drag operations
      GlobalData.optManager.WorkAreaHammer.on('drag', DefaultEvt.Evt_ShapeDrag);
      GlobalData.optManager.WorkAreaHammer.on('dragend', DefaultEvt.Evt_ShapeDragEnd);

      console.log("O.Opt LM_MoveClick - Output: Move operation set up successfully");
    } catch (error) {
      GlobalData.optManager.LM_Move_ExceptionCleanup(error);
      GlobalData.optManager.ExceptionCleanup(error);
      console.log("O.Opt LM_MoveClick - Error:", error);
      throw error;
    }
  }

  SetControlDragMode(controlElement) {
    console.log("O.Opt SetControlDragMode - Input:", controlElement);

    // Get the appropriate cursor type from the element
    const cursorType = controlElement.GetCursor();

    // Set the edit mode to DRAGCONTROL with the element's cursor type
    this.SetEditMode(ConstantData.EditState.DRAGCONTROL, cursorType);

    console.log("O.Opt SetControlDragMode - Output: Mode set to DRAGCONTROL with cursor type:", cursorType);
  }

  HideOverlayLayer() {
    console.log("O.Opt HideOverlayLayer - Input: No parameters");

    this.svgOverlayLayer.SetVisible(false);

    console.log("O.Opt HideOverlayLayer - Output: Overlay layer hidden");
  }

  LM_SetupMove(event) {
    console.log("O.Opt LM_SetupMove - Input:", event);

    // Variables for target tracking
    let svgElement;
    let targetElement;
    let targetId;
    let targetObject = null;
    let drawingObject = null;
    let tableObject = null;
    let isOneClickTextObject = false;

    // Reset move state
    GlobalData.optManager.MoveDuplicated = false;

    // Find the SVG element from the event target
    svgElement = this.svgObjectLayer.FindElementByDOMElement(event.currentTarget);
    if (!svgElement) {
      console.log("O.Opt LM_SetupMove - Output: false (No SVG element found)");
      return false;
    }

    // Get target element and prevent default event behavior
    targetElement = svgElement.GetTargetForEvent(event);
    this.theEventTimestamp = Date.now();
    Utils2.StopPropagationAndDefaults(event);

    // Get object ID and verify it's a valid drawing object
    const objectId = svgElement.GetID();
    const drawingObjectRef = GlobalData.optManager.GetObjectPtr(objectId, false);
    if (!(drawingObjectRef && drawingObjectRef instanceof BaseDrawingObject)) {
      console.log("O.Opt LM_SetupMove - Output: false (Not a valid drawing object)");
      return false;
    }

    // Handle dimension editing
    if (this.bInDimensionEdit) {
      this.CloseEdit(false, true);
      this.bInDimensionEdit = false;
      console.log("O.Opt LM_SetupMove - Output: false (Was in dimension edit)");
      return false;
    }

    // Prevent moving dimension text elements
    if (
      targetElement instanceof Text &&
      (targetElement.ID === ConstantData.SVGElementClass.DIMENSIONTEXT ||
        targetElement.ID === ConstantData.SVGElementClass.DIMENSIONTEXTNOEDIT)
    ) {
      console.log("O.Opt LM_SetupMove - Output: false (Is dimension text)");
      return false;
    }

    // Prevent moving icon elements
    if (targetElement instanceof Image && this.UserDataisIcon(targetElement.GetUserData())) {
      console.log("O.Opt LM_SetupMove - Output: false (Is icon element)");
      return false;
    }

    // // Lock messages and begin secondary edit for collaboration
    // if (Collab.AllowMessage()) {
    //   Collab.LockMessages();
    //   Collab.BeginSecondaryEdit();
    // }

    // Handle format painter mode
    if (this.currentModalOperation === ConstantData2.ModalOperations.FORMATPAINTER) {
      targetId = svgElement.GetID();
      if (this.FormatPainterClick(targetId, event)) {
        console.log("O.Opt LM_SetupMove - Output: false (Format painter handled click)");
        return false;
      }
      svgElement = this.svgObjectLayer.GetElementByID(targetId);
    }

    // Get document coordinates for the event
    const docCoordinates = this.svgDoc.ConvertWindowToDocCoords(
      event.gesture.center.clientX,
      event.gesture.center.clientY
    );

    // Only process if not in format painter object mode
    if (
      this.currentModalOperation !== ConstantData2.ModalOperations.FORMATPAINTER ||
      this.FormatPainterMode !== ConstantData2.FormatPainterModes.OBJECT
    ) {
      const clickedElement = svgElement.GetTargetForEvent(event);
      const clickedElementId = clickedElement.GetID();
      const clickedElementUserData = clickedElement.GetUserData();

      // Determine drag target ID with special parent handling
      this.theDragTargetID = svgElement.GetID();
      this.theDragTargetID = this.GetEventShapeParent(this.theDragTargetID);
      this.theDragTargetID = Business.SelectContainerParent(this.theDragTargetID);

      targetObject = GlobalData.objectStore.GetObject(this.theDragTargetID);
      const isRightClick = this.IsRightClick(event);

      // Handle special cases for target object
      if (targetObject) {
        drawingObject = targetObject.Data;

        if (drawingObject.IsSwimlane()) {
          if (clickedElementId === ConstantData.Defines.TableCellNoHit) {
            tableObject = drawingObject.GetTable(false);
            const cellIndex = this.Table_GetCellClicked(drawingObject, event);

            if (
              cellIndex >= 0 &&
              tableObject.cells[cellIndex].flags & ListManager.Table.CellFlags.SDT_F_NoText &&
              !isRightClick
            ) {
              GlobalData.optManager.StartRubberBandSelect(event);
              console.log("O.Opt LM_SetupMove - Output: false (Started rubber band select on swimlane)");
              return false;
            }
          } else if (
            drawingObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_FRAME_CONTAINER &&
            clickedElementId === ConstantData.SVGElementClass.SHAPE &&
            !isRightClick
          ) {
            GlobalData.optManager.StartRubberBandSelect(event);
            console.log("O.Opt LM_SetupMove - Output: false (Started rubber band select on frame container)");
            return false;
          }
        }

        // Check for one-click text objects
        isOneClickTextObject = (drawingObject.TextFlags & ConstantData.TextFlags.SED_TF_OneClick) > 0;
        if (isRightClick) {
          isOneClickTextObject = false;
        } else if (drawingObject.flags & ConstantData.ObjFlags.SEDO_Lock) {
          this.SelectObjectFromClick(event, svgElement);
          console.log("O.Opt LM_SetupMove - Output: false (Object is locked)");
          return false;
        }
      }

      // Handle active table and special element types
      const activeTableId = this.Table_GetActiveID();
      tableObject = drawingObject.GetTable(false);

      if (activeTableId === this.theDragTargetID || (isOneClickTextObject && tableObject !== null)) {
        switch (clickedElementId) {
          case ConstantData.SVGElementClass.SHAPE:
          case ConstantData.Defines.TableSelection:
          case ConstantData.Defines.TableCells:
            const windowCoordinates = this.svgDoc.ConvertWindowToDocCoords(
              event.gesture.center.clientX,
              event.gesture.center.clientY
            );
            if (Utils2.pointInRect(drawingObject.trect, windowCoordinates)) {
              clickedElementId = ConstantData.Defines.TableCellHit;
            }
            break;
          case ConstantData.SVGElementClass.TEXT:
            if (clickedElementUserData >= 0) {
              clickedElementId = ConstantData.Defines.TableTextHit;
            }
            break;
          case ConstantData.SVGElementClass.SLOP:
          case ConstantData.SVGElementClass.BACKGROUNDIMAGE:
            isOneClickTextObject = false;
            break;
        }
      } else {
        // Handle non-active table elements
        switch (clickedElementId) {
          case ConstantData.Defines.TableRowHitHidden:
          case ConstantData.Defines.TableRowHit:
          case ConstantData.Defines.TableRowSelection:
          case ConstantData.Defines.TableColHit:
          case ConstantData.Defines.TableColHitHidden:
          case ConstantData.Defines.TableColSelection:
          case ConstantData.Defines.TableCellHit:
          case ConstantData.Defines.TableCells:
          case ConstantData.SVGElementClass.BACKGROUNDIMAGE:
            clickedElementId = '';
            break;
          case ConstantData.SVGElementClass.SLOP:
            this.DeactivateAllTextEdit(false);
            isOneClickTextObject = false;
            break;
        }
      }

      // Handle actions based on the clicked element type
      switch (clickedElementId) {
        case ConstantData.Defines.GraphTextHit:
          this.Graph_SetupAction(event, this.theDragTargetID, clickedElementId, clickedElementUserData);
          console.log("O.Opt LM_SetupMove - Output: false (Graph text hit)");
          return false;

        case ConstantData.SVGElementClass.BACKGROUNDIMAGE:
        case ConstantData.Defines.TableCellHit:
        case ConstantData.Defines.TableTextHit:
        case ConstantData.Defines.TableCells:
        case ConstantData.Defines.TableRowZone:
        case ConstantData.Defines.TableColZone:
          const actionResult = this.Table_SetupAction(event, this.theDragTargetID, clickedElementId, clickedElementUserData);
          if (actionResult === true || actionResult === -1) {
            console.log("O.Opt LM_SetupMove - Output: Setup action handled");
            return actionResult;
          }
          break;

        case ConstantData.Defines.TableRowHitHidden:
        case ConstantData.Defines.TableRowHit:
        case ConstantData.Defines.TableRowSelection:
          if (drawingObject && this.Table_HideUI(drawingObject)) {
            console.log("O.Opt LM_SetupMove - Output: false (Table UI hidden)");
            return false;
          }
          const rowData = clickedElement.GetUserData();
          this.Table_SetupAction(event, this.theDragTargetID, ConstantData.Defines.TableRowHit, rowData);
          console.log("O.Opt LM_SetupMove - Output: false (Table row action)");
          return false;

        case ConstantData.Defines.TableColHit:
        case ConstantData.Defines.TableColHitHidden:
        case ConstantData.Defines.TableColSelection:
          if (drawingObject && this.Table_HideUI(drawingObject)) {
            console.log("O.Opt LM_SetupMove - Output: false (Table UI hidden)");
            return false;
          }
          const colData = clickedElement.GetUserData();
          this.Table_SetupAction(event, this.theDragTargetID, ConstantData.Defines.TableColHit, colData);
          console.log("O.Opt LM_SetupMove - Output: false (Table column action)");
          return false;

        case ConstantData.Defines.HitAreas:
          const hitAreaData = clickedElement.GetUserData();
          this.LM_HitAreaClick(this.theDragTargetID, hitAreaData);
          if (event.gesture) {
            event.gesture.stopDetect();
          }
          console.log("O.Opt LM_SetupMove - Output: false (Hit area click)");
          return false;
      }

      // Handle one-click text objects
      if (isOneClickTextObject) {
        GlobalData.optManager.ActivateTextEdit(svgElement.svgObj.SDGObj, event, false);
        console.log("O.Opt LM_SetupMove - Output: false (Activated text edit)");
        return false;
      }
    }

    // Close table editing if needed
    if (tableObject && targetObject && this.Table_CloseEdit(targetObject, tableObject)) {
      const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, false);
      this.UpdateSelectionAttributes(selectedList);
    }

    // Handle selection
    if (!this.SelectObjectFromClick(event, svgElement, true)) {
      console.log("O.Opt LM_SetupMove - Output: false (Selection failed)");
      return false;
    }

    // Get updated target object
    targetObject = GlobalData.objectStore.GetObject(this.theDragTargetID);
    if (targetObject == null) {
      console.log("O.Opt LM_SetupMove - Output: false (Target object is null)");
      return false;
    }

    // Get drawing object and check special cases
    drawingObject = targetObject.Data;

    // Hide selection states and prepare for drag operation
    this.HideAllSVGSelectionStates();
    this.InitializeAutoGrowDrag();

    // Allow object to intercept the move operation
    if (drawingObject.InterceptMoveOperation(event)) {
      console.log("O.Opt LM_SetupMove - Output: false (Move intercepted by object)");
      return false;
    }

    // Check for special object types
    const connectorEndInfo = {};
    const genogramPartnerInfo = {};
    const flowchartShapeInfo = {};

    // Handle special object types
    if (this.IsLoneFlowchartShape(drawingObject, flowchartShapeInfo)) {
      this.theDragTargetID = flowchartShapeInfo.id;
    } else if (this.IsConnectorEndShape(drawingObject, null, connectorEndInfo)) {
      this.theDragTargetID = connectorEndInfo.id;
    } else if (this.IsGenogramPartner(drawingObject, genogramPartnerInfo)) {
      this.theDragTargetID = genogramPartnerInfo.id;
    }

    // Initialize move bounds
    this.theMoveBounds = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };

    this.PinRect = null;
    this.dynamicGuides = new DynamicGuides();

    let objectsToMove = [];

    // Get list of objects to move together
    objectsToMove = this.GetMoveList(
      this.theDragTargetID,
      true,
      true,
      false,
      this.theMoveBounds,
      false
    );

    // Store start position
    this.theDragStartX = docCoordinates.x;
    this.theDragStartY = docCoordinates.y;

    // Initialize drag lists
    let objectCount = objectsToMove ? objectsToMove.length : 0;
    this.theDragBBoxList = [];
    this.theDragElementList = [];
    this.dragGotMove = false;

    // Filter objects: first pass - exclude connectors and invisible objects
    let filteredObjects = [];
    for (let i = 0; i < objectCount; ++i) {
      const currentId = objectsToMove[i];
      const currentObject = this.GetObjectPtr(currentId, false);

      if (currentObject &&
        !(currentObject instanceof Connector) &&
        !(currentObject.flags & ConstantData.ObjFlags.SEDO_NotVisible)) {
        filteredObjects.push(currentId);
      }
    }

    // Filter objects: second pass - handle connector objects
    for (let i = 0; i < objectCount; ++i) {
      const currentId = objectsToMove[i];
      const currentObject = this.GetObjectPtr(currentId, false);

      if (currentObject instanceof Connector) {
        // Use complex connector logic to determine if it should be included
        if (currentObject.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn) {
          filteredObjects.push(currentId);
        } else if (currentObject.hooks.length) {
          const hookId = currentObject.hooks[0].objid;
          const hookObject = this.GetObjectPtr(hookId);

          if (hookObject instanceof Connector) {
            if (!(currentObject.flags & ConstantData.ObjFlags.SEDO_NotVisible)) {
              filteredObjects.push(currentId);
            }
          } else if (
            (currentObject.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
            (!currentObject.hooks || filteredObjects.indexOf(hookId) === -1)
          ) {
            // Skip
          } else {
            filteredObjects.push(currentId);
          }
        } else if (!(currentObject.flags & ConstantData.ObjFlags.SEDO_NotVisible)) {
          filteredObjects.push(currentId);
        }
      }
    }

    // Update the move list with filtered objects
    objectsToMove = filteredObjects;
    objectCount = objectsToMove.length;
    this.theMoveList = objectsToMove;

    // Create bounding box list for all objects being moved
    for (let i = 0; i < objectCount; ++i) {
      const currentId = objectsToMove[i];
      const currentObject = this.GetObjectPtr(currentId, false);
      const objectFrame = currentObject.GetSVGFrame();

      this.theDragBBoxList.push(objectFrame);
      this.theDragElementList.push(currentId);

      // Store target bounding box for snapping
      if (GlobalData.docHandler.documentConfig.enableSnap &&
        currentId === this.theDragTargetID) {
        this.theDragTargetBBox = $.extend(true, {}, objectFrame);
      }
    }

    // Handle auto-grow constraints
    if (this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto) {
      this.theDragEnclosingRect = GlobalData.optManager.GetListSRect(this.theMoveList);
    }

    // Setup move tracking
    this.LM_MovePreTrack(objectsToMove, event);

    console.log("O.Opt LM_SetupMove - Output: true (Move setup complete)");
    return true;
  }

  LM_Move_ExceptionCleanup(error) {
    console.log('O.Opt LM_Move_ExceptionCleanup - Input:', error);

    // Clean up resources
    GlobalData.optManager.LinkParams = null;
    GlobalData.optManager.theDragBBoxList = [];
    GlobalData.optManager.theDragElementList = [];
    GlobalData.optManager.theMoveList = null;
    GlobalData.optManager.theDragEnclosingRect = null;
    GlobalData.optManager.dragGotMove = false;
    GlobalData.optManager.UnbindShapeMoveHammerEvents();
    GlobalData.optManager.ResetAutoScrollTimer();
    // Collab.UnLockMessages();
    // Collab.UnBlockMessages();

    console.log('O.Opt LM_Move_ExceptionCleanup - Output: Cleanup completed');

    // Re-throw the exception after cleanup
    throw error;
  }

  UnbindShapeMoveHammerEvents() {
    console.log('O.Opt UnbindShapeMoveHammerEvents - Input: No parameters');

    if (GlobalData.optManager.WorkAreaHammer) {
      GlobalData.optManager.WorkAreaHammer.off('drag');
      GlobalData.optManager.WorkAreaHammer.off('dragend');
      GlobalData.optManager.WorkAreaHammer.off('mousemove');
    }

    console.log('O.Opt UnbindShapeMoveHammerEvents - Output: Events unbound');
  }

  GetEventShapeParent(objectId) {
    console.log('O.Opt GetEventShapeParent - Input:', objectId);

    const object = GlobalData.optManager.GetObjectPtr(objectId);

    if (object && object.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT_LABEL) {
      const associatedObject = GlobalData.optManager.GetObjectPtr(object.associd);

      if (associatedObject && associatedObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT) {
        console.log('O.Opt GetEventShapeParent - Output:', object.associd);
        return object.associd;
      }
    }

    console.log('O.Opt GetEventShapeParent - Output:', objectId);
    return objectId;
  }

  Table_Release = function (e, t) {
    return false;

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
      d = GlobalData.optManager.Table_GetActiveID();
    if (d >= 0) {
      if ((a = this.GetObjectPtr(d, !1)) && a.GetTable) {
        var D,
          g,
          h = a.GetTable(!t);
        if (a && h) {
          var m = this.svgObjectLayer.GetElementByID(a.BlockID);
          for (r = h.cells.length, i = 0; i < r; i++) (n = h.cells[i]).flags = Utils2.SetFlag(n.flags, ListManager.Table.CellFlags.SDT_F_Select, !1),
            n.childcontainer >= 0 &&
            (D = this.svgObjectLayer.GetElementByID(n.childcontainer)) &&
            (g = D.GetElementByID(ConstantData.Defines.TableSelection)) &&
            D.RemoveElement(g);
          for (
            m &&
            (g = m.GetElementByID(ConstantData.Defines.TableSelection)) &&
            m.RemoveElement(g),
            r = h.rows.length,
            i = 0;
            i < r;
            i++
          ) {
            if ((o = h.rows[i]).selected && m) for (l = o.segments.length, S = 0; S < l; S++) c = i + '.' + S,
              (
                g = m.GetElementByID(ConstantData.Defines.TableRowSelection, c)
              ) &&
              m.RemoveElement(g);
            o.selected = !1
          }
          if (
            m &&
            (
              u = m.GetElementListWithID(ConstantData.Defines.TableRowHitHidden)
            )
          ) for (r = u.length, i = 0; i < r; i++) u[i].SetStrokeOpacity(0);
          for (r = h.cols.length, i = 0; i < r; i++) {
            if ((s = h.cols[i]).selected && m) for (l = s.segments.length, S = 0; S < l; S++) c = i + '.' + S,
              (
                g = m.GetElementByID(ConstantData.Defines.TableColSelection, c)
              ) &&
              m.RemoveElement(g);
            s.selected = !1
          }
          if (
            m &&
            (
              u = m.GetElementListWithID(ConstantData.Defines.TableColHitHidden)
            )
          ) for (r = u.length, i = 0; i < r; i++) u[i].SetStrokeOpacity(0);
          e ||
            (h.select = - 1),
            h.rselect = - 1,
            h.cselect = - 1,
            (p = this.GetObjectPtr(this.theTEDSessionBlockID, !1)).theActiveTableObjectIndex >= 0 &&
            m &&
            (
              GlobalData.optManager.svgObjectLayer.RemoveElement(m),
              GlobalData.optManager.svgObjectLayer.AddElement(m, p.theActiveTableObjectIndex)
            )
        }
      }
      if (!e && !t) return p = this.GetObjectPtr(this.theTEDSessionBlockID, !0),
        this.ShowSVGSelectionState(p.theActiveTableObjectID, !0),
        p.theActiveTableObjectID = - 1,
        p.theActiveTableObjectIndex = - 1,
        !0
    }
    return !1
  }

  /**
 * Handles selection of an object when clicked
 * @param event - The click event
 * @param svgElement - The SVG element that was clicked
 * @param preserveSelection - Whether to preserve existing selection state
 * @returns Boolean indicating whether object was selected successfully
 */
  SelectObjectFromClick(event, svgElement, preserveSelection) {
    console.log('O.Opt SelectObjectFromClick - Input:', { event, svgElement, preserveSelection });

    const visibleObjectCount = this.ActiveVisibleZList().length;
    const shapeContainerType = ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER;

    // Exit if no visible objects or no SVG element provided
    if (visibleObjectCount === 0) {
      console.log('O.Opt SelectObjectFromClick - Output: false (no visible objects)');
      return false;
    }

    if (svgElement === null) {
      console.log('O.Opt SelectObjectFromClick - Output: false (no SVG element)');
      return false;
    }

    // Get the object ID and corresponding data object
    const objectId = svgElement.GetID();
    const object = this.GetObjectPtr(objectId, false);

    // Verify the object is a valid drawing object
    if (!(object && object instanceof BaseDrawingObject)) {
      console.log('O.Opt SelectObjectFromClick - Output: false (not a drawing object)');
      return false;
    }

    // Exclude shape container objects in cells
    if (object && object.objecttype === shapeContainerType && this.ContainerIsInCell(object)) {
      console.log('O.Opt SelectObjectFromClick - Output: false (container in cell)');
      return false;
    }

    // Determine if this is a multiple selection operation
    let isMultipleSelection = event.gesture.srcEvent.shiftKey ||
      event.gesture.srcEvent.ctrlKey ||
      ConstantData.DocumentContext.SelectionToolMultiple;

    // Special case: Ctrl+Meta keys together cancel multiple selection
    if (event.gesture.srcEvent.ctrlKey && event.gesture.srcEvent.metaKey) {
      isMultipleSelection = false;
    }

    // Get the selected list and check if object is already selected
    const selectedList = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data;
    var indexInSelectedList = $.inArray(objectId, selectedList);

    // Prepare array with object to select
    let objectsToSelect = [];
    objectsToSelect.push(objectId);

    // Handle object selection depending on whether it's already selected
    if (indexInSelectedList == -1) {
      // Object is not already selected - select it
      this.SelectObjects(objectsToSelect, isMultipleSelection, false);
      console.log('O.Opt SelectObjectFromClick - Output: true (object selected)');
      return true;
    }
    else {
      if (!isMultipleSelection) {
        // Object is already selected and this isn't a multiple selection
        return true;
      }
      else {
        // Object is already selected and this is a multiple selection
        this.SelectObjects(objectsToSelect, isMultipleSelection, false);
        return !!preserveSelection;
      }

      // return !isMultipleSelection || (this.SelectObjects(objectsToSelect, isMultipleSelection, !1), !!preserveSelection);
    }
  }

  /**
   * Handles selection of an object when clicked
   * @param event - The click event
   * @param svgElement - The SVG element that was clicked
   * @param preserveSelection - Whether to preserve existing selection state
   * @returns Boolean indicating whether object was selected successfully
   */
  SelectObjectFromClick2(event, svgElement, preserveSelection) {
    console.log('O.Opt SelectObjectFromClick - Input:', { event, svgElement, preserveSelection });

    const visibleObjectCount = this.ActiveVisibleZList().length;
    const shapeContainerType = ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER;

    // Exit if no visible objects or no SVG element provided
    if (visibleObjectCount === 0) {
      console.log('O.Opt SelectObjectFromClick - Output: false (no visible objects)');
      return false;
    }

    if (svgElement === null) {
      console.log('O.Opt SelectObjectFromClick - Output: false (no SVG element)');
      return false;
    }

    // Get the object ID and corresponding data object
    const objectId = svgElement.GetID();
    const object = this.GetObjectPtr(objectId, false);

    // Verify the object is a valid drawing object
    if (!(object && object instanceof BaseDrawingObject)) {
      console.log('O.Opt SelectObjectFromClick - Output: false (not a drawing object)');
      return false;
    }

    // Exclude shape container objects in cells
    if (object && object.objecttype === shapeContainerType && this.ContainerIsInCell(object)) {
      console.log('O.Opt SelectObjectFromClick - Output: false (container in cell)');
      return false;
    }

    // Get the selected list and check if object is already selected
    const selectedList = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data;
    const indexInSelectedList = $.inArray(objectId, selectedList);

    // Prepare array with object to select
    let objectsToSelect = [];
    objectsToSelect.push(objectId);

    // Determine if this is a multiple selection operation
    let isMultipleSelection = event.gesture.srcEvent.shiftKey ||
      event.gesture.srcEvent.ctrlKey ||
      ConstantData.DocumentContext.SelectionToolMultiple;

    // Special case: Ctrl+Meta keys together cancel multiple selection
    if (event.gesture.srcEvent.ctrlKey && event.gesture.srcEvent.metaKey) {
      isMultipleSelection = false;
    }

    // Handle object selection depending on whether it's already selected
    if (indexInSelectedList == -1) {
      // Object is not already selected - select it
      this.SelectObjects(objectsToSelect, isMultipleSelection, false);
      console.log('O.Opt SelectObjectFromClick - Output: true (object selected)');
      return true;
    } else if (!isMultipleSelection) {
      // Object is already selected and this isn't a multiple selection
      console.log('O.Opt SelectObjectFromClick - Output: false (already selected, not multiple selection)');
      return false;
    } else {
      // Object is already selected and this is a multiple selection
      this.SelectObjects(objectsToSelect, isMultipleSelection, false);
      const result = !!preserveSelection;
      console.log('O.Opt SelectObjectFromClick - Output:', result, '(multiple selection)');
      return result;
    }
  }

  SelectObjectFromClick1(event, svgElement, preserveSelection) {
    console.log('O.Opt SelectObjectFromClick - Input:', { event, svgElement, preserveSelection });

    const visibleObjectCount = this.ActiveVisibleZList().length;
    const shapeContainerType = ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER;

    // Exit if no visible objects or no SVG element provided
    if (visibleObjectCount === 0) {
      console.log('O.Opt SelectObjectFromClick - Output: false (no visible objects)');
      return false;
    }

    if (svgElement === null) {
      console.log('O.Opt SelectObjectFromClick - Output: false (no SVG element)');
      return false;
    }

    // Get the object ID and corresponding data object
    const objectId = svgElement.GetID();
    const object = this.GetObjectPtr(objectId, false);

    // Verify the object is a valid drawing object
    if (!(object && object instanceof BaseDrawingObject)) {
      console.log('O.Opt SelectObjectFromClick - Output: false (not a drawing object)');
      return false;
    }

    // Exclude shape container objects in cells
    if (object && object.objecttype === shapeContainerType && this.ContainerIsInCell(object)) {
      console.log('O.Opt SelectObjectFromClick - Output: false (container in cell)');
      return false;
    }

    // Get the selected list and check if object is already selected
    const selectedList = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data;
    const indexInSelectedList = $.inArray(objectId, selectedList);

    // Prepare array with object to select
    const objectsToSelect = [];
    objectsToSelect.push(objectId);

    // Determine if this is a multiple selection operation
    let isMultipleSelection = event.gesture.srcEvent.shiftKey ||
      event.gesture.srcEvent.ctrlKey ||
      ConstantData.DocumentContext.SelectionToolMultiple;

    // Special case: Ctrl+Meta keys together cancel multiple selection
    if (event.gesture.srcEvent.ctrlKey && event.gesture.srcEvent.metaKey) {
      isMultipleSelection = false;
    }

    // Handle object selection depending on whether it's already selected
    if (indexInSelectedList == -1) {
      // Object is not already selected - select it
      this.SelectObjects(objectsToSelect, isMultipleSelection, false);
      console.log('O.Opt SelectObjectFromClick - Output: true (object selected)');
      return true;
    } else if (!isMultipleSelection) {
      // Object is already selected and this isn't a multiple selection
      console.log('O.Opt SelectObjectFromClick - Output: false (already selected, not multiple selection)');
      return false;
    } else {
      // Object is already selected and this is a multiple selection
      this.SelectObjects(objectsToSelect, isMultipleSelection, false);
      const result = !!preserveSelection;
      console.log('O.Opt SelectObjectFromClick - Output:', result, '(multiple selection)');
      return result;
    }
  }

  IsLoneFlowchartShape(objectToCheck, resultContainer) {
    console.log("O.Opt IsLoneFlowchartShape - Input:", { objectToCheck, resultContainer });

    // If object doesn't exist or has no hooks, return false
    if (!objectToCheck || !objectToCheck.hooks.length) {
      console.log("O.Opt IsLoneFlowchartShape - Output: false (no object or no hooks)");
      return false;
    }

    // Get the connected object from the first hook
    const connectedObject = this.GetObjectPtr(objectToCheck.hooks[0].objid, false);

    // Check if this is a lone flowchart connector
    const isLoneFlowchart = !!(
      connectedObject &&
      connectedObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
      connectedObject._IsFlowChartConnector() &&
      connectedObject.hooks.length === 0 &&
      connectedObject.arraylist.hook.length === ConnectorDefines.SEDA_NSkip + 1
    );

    // If it's a lone flowchart, set the ID in the result container
    if (isLoneFlowchart) {
      resultContainer.id = connectedObject.BlockID;
    }

    console.log("O.Opt IsLoneFlowchartShape - Output:", isLoneFlowchart);
    return isLoneFlowchart;
  }

  IsConnectorEndShape(objectData, connectorObject, resultContainer) {
    console.log("O.Opt IsConnectorEndShape - Input:", { objectData, connectorObject, resultContainer });

    let parentConnector;

    // Check if object has hooks with specific coordinates
    const isConnectorEnd = !!(
      objectData &&
      objectData.hooks.length &&
      objectData.hooks[0].connect.y === 0 &&
      objectData.hooks[0].connect.x < 0 &&
      (
        // Get connector object if not provided
        (connectorObject === null &&
          (connectorObject = this.GetObjectPtr(objectData.hooks[0].objid, false))),

        // Check if resultContainer exists and if connector object has valid hooks and parent
        resultContainer &&
        connectorObject &&
        connectorObject.hooks.length &&
        (parentConnector = this.GetObjectPtr(connectorObject.hooks[0].objid, false)) &&
        parentConnector.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR
      )
    );

    // If it's a connector end, set additional properties in the result container
    if (isConnectorEnd) {
      resultContainer.id = connectorObject.hooks[0].objid;

      if (parentConnector.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete) {
        resultContainer.nshapes = parentConnector.arraylist.hook.length - ConnectorDefines.SEDA_NSkip;
        if (resultContainer.nshapes < 0) {
          resultContainer.nshapes = 0;
        }
        resultContainer.pasted = false;
      } else {
        resultContainer.pasted = true;
      }
    }

    console.log("O.Opt IsConnectorEndShape - Output:", isConnectorEnd);
    return isConnectorEnd;
  }

  IsGenogramPartner(objectData, resultContainer) {
    console.log("O.Opt IsGenogramPartner - Input:", { objectData, resultContainer });

    let connectedObject;
    let childArrayID;

    // Case 1: Check if object has hooks connecting to a genogram connector
    if (objectData && objectData.hooks.length) {
      connectedObject = this.GetObjectPtr(objectData.hooks[0].objid, false);

      if (connectedObject &&
        connectedObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {

        // Check if it's a genogram connector
        if (connectedObject.IsGenoConnector()) {
          resultContainer.id = objectData.hooks[0].objid;
          console.log("O.Opt IsGenogramPartner - Output: true (genogram connector found)");
          return true;
        }

        // Check if it's a genogram branch with child lines
        if (connectedObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH &&
          this.FindChildObject(objectData.BlockID, ConstantData.DrawingObjectBaseClass.LINE, -1) >= 0) {
          resultContainer.id = objectData.hooks[0].objid;
          console.log("O.Opt IsGenogramPartner - Output: true (genogram branch found)");
          return true;
        }
      }
    }
    // Case 2: Check if object has a child array with a genogram connector
    else if ((childArrayID = this.FindChildArray(objectData.BlockID, -1)) >= 0 &&
      (connectedObject = this.GetObjectPtr(childArrayID, false)).IsGenoConnector()) {
      resultContainer.id = childArrayID;
      console.log("O.Opt IsGenogramPartner - Output: true (child genogram connector found)");
      return true;
    }

    console.log("O.Opt IsGenogramPartner - Output: false");
    return false;
  }

  FindChildArray(objectId: number, excludeConnectorId?: number): number {
    console.log("O.Opt FindChildArray - Input:", { objectId, excludeConnectorId });

    // Get the links block
    const links = this.GetObjectPtr(this.theLinksBlockID, false);

    // Find the starting link index for this object
    const linkIndex = this.FindLink(links, objectId, true);

    const totalLinks = links.length;

    // If we found a link for this object
    if (linkIndex >= 0) {
      let currentIndex = linkIndex;

      // Process all links for this object
      while (currentIndex < totalLinks && links[currentIndex].targetid === objectId) {
        const hookId = links[currentIndex].hookid;

        // Check if this is not the excluded connector and is a connector
        if (hookId !== excludeConnectorId) {
          const hookObject = this.GetObjectPtr(hookId, false);

          if (hookObject &&
            hookObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
            console.log("O.Opt FindChildArray - Output: Found connector:", hookId);
            return hookId;
          }
        }

        currentIndex++;
      }
    }

    console.log("O.Opt FindChildArray - Output: No connector found (-1)");
    return -1;
  }

  LM_MovePreTrack(objectsToMove, event) {
    console.log("O.Opt LM_MovePreTrack - Input:", { objectsToMove, event });

    // Get the session data
    const sessionData = GlobalData.optManager.GetObjectPtr(this.theSEDSessionBlockID, false);

    // Check for alt key press
    const isAltKeyPressed = event.gesture && event.gesture.srcEvent && event.gesture.srcEvent.altKey;

    // Initialize link parameters
    this.LinkParams = new LinkParameters();
    this.LinkParams.AutoInsert = this.AllowAutoInsert();

    // Disable auto-insert if multiple objects are selected or alt key is pressed
    if (this.LinkParams.AutoInsert) {
      const selectedObjects = this.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, false);
      if (selectedObjects.length > 1) {
        this.LinkParams.AutoInsert = false;
      }

      if (event.gesture && event.gesture.srcEvent && event.gesture.srcEvent.altKey) {
        // Additional condition that was empty in original code
      }
    }

    // Get the target object being dragged
    const drawingObject = this.GetObjectPtr(this.theDragTargetID, false);
    if (drawingObject) {
      // Store original object state for reference
      GlobalData.optManager.ob = Utils1.DeepCopy(drawingObject);

      // Handle case where object has a single hook that's not a move target
      if (drawingObject.hooks.length === 1 &&
        (drawingObject.GetHookFlags() & ConstantData.HookFlags.SED_LC_MoveTarget) === 0 &&
        objectsToMove.indexOf(drawingObject.hooks[0].objid) < 0) {

        // Store connection information
        this.LinkParams.ConnectIndex = drawingObject.hooks[0].objid;
        this.LinkParams.PrevConnect = drawingObject.hooks[0].objid;
        this.LinkParams.ConnectIndexHistory.push(drawingObject.hooks[0].objid);
        this.LinkParams.ConnectPt.x = drawingObject.hooks[0].connect.x;
        this.LinkParams.ConnectPt.y = drawingObject.hooks[0].connect.y;
        this.LinkParams.ConnectInside = drawingObject.hooks[0].cellid;
        this.LinkParams.HookIndex = drawingObject.hooks[0].hookpt;
        this.LinkParams.InitialHook = 0;
      }

      // Get links and build the circular list
      const links = this.GetObjectPtr(this.theLinksBlockID, false);
      this.LinkParams.lpCircList = this.GetHookList(
        links,
        this.LinkParams.lpCircList,
        this.theDragTargetID,
        drawingObject,
        ConstantData.ListCodes.SED_LC_CIRCTARG,
        {}
      );

      // Join the lists
      this.JoinHookList(this.LinkParams.lpCircList, objectsToMove);

      // Handle auto-insertion for shapes with healing
      if (this.LinkParams.AutoInsert &&
        drawingObject instanceof BaseShape &&
        this.HealLine(drawingObject, true, null) > 0 &&
        isAltKeyPressed) {

        this.LinkParams.lpCircList = [];
        this.LinkParams.lpCircList.push(this.theDragTargetID);
        this.theMoveList = [];
        this.theMoveList.push(this.theDragTargetID);
        this.LinkParams.AutoHeal = true;
      }

      // Handle snapping to shapes if enabled
      if (this.AllowSnapToShapes()) {
        const objectRect = drawingObject.GetSnapRect();
        const offsetRect = $.extend(true, {}, objectRect);

        // Apply current drag offsets
        offsetRect.x += GlobalData.optManager.theDragDeltaX;
        offsetRect.y += GlobalData.optManager.theDragDeltaY;

        // Check for potential snap targets
        const snapOptions = {};
        const snapTargetId = drawingObject.CanSnapToShapes(snapOptions);

        if (snapTargetId >= 0) {
          // Get snap target rectangle
          const targetRect = this.GetObjectPtr(snapTargetId, false).GetSnapRect();
          const targetRectCopy = $.extend(true, {}, targetRect);

          // Initialize dynamic guides for snapping
          const dynamicGuides = new DynamicGuides();
          const objectIds = [this.theDragTargetID];

          // Calculate snap points and update guides
          this.DynamicSnaps_GetSnapObjects(snapTargetId, targetRectCopy, dynamicGuides, objectIds, null, snapOptions);

          if (dynamicGuides) {
            this.DynamicSnaps_UpdateGuides(dynamicGuides, snapTargetId, targetRectCopy);
          }
        }
      }
    }

    console.log("O.Opt LM_MovePreTrack - Output: Link parameters initialized");
  }

  AllowAutoInsert() {
    console.log("O.Opt AllowAutoInsert - Input: No parameters");
    const result = GlobalData.gBusinessManager.AllowAutoInsert();
    console.log("O.Opt AllowAutoInsert - Output:", result);
    return result;
  }

  JoinHookList(targetList, sourceList) {
    console.log("O.Opt JoinHookList - Input:", { targetList, sourceList });

    if (targetList != null && sourceList != null) {
      for (let i = 0; i < sourceList.length; i++) {
        if (targetList.indexOf(sourceList[i]) < 0) {
          targetList.push(sourceList[i]);
        }
      }
    }

    console.log("O.Opt JoinHookList - Output: Lists joined");
  }

  AllowSnapToShapes() {
    console.log("O.Opt AllowSnapToShapes - Input: No parameters");

    // Get session data (unused in function but was in original code)
    GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);

    const result = GlobalData.docHandler.documentConfig.snapToShapes;
    console.log("O.Opt AllowSnapToShapes - Output:", result);
    return result;
  }

  CheckDragIsOverCustomLibrary(event) {
    console.log("O.Opt CheckDragIsOverCustomLibrary - Input:", event);

    // Always return false as the commented out code depends on SDUI which might not be available
    console.log("O.Opt CheckDragIsOverCustomLibrary - Output: false");
    return false;

    /* Original implementation:
    return event != null &&
      (SDUI.Commands.MainController.Symbols &&
       SDUI.Commands.MainController.Symbols.IsCursorOverSymbolLibraryGallery(
       event.gesture.center.clientX,
       event.gesture.center.clientY,
       true)
      );
    */
  }

  /**
   * Handles object movement tracking during drag operations
   * @param event - The movement event
   * @param skipScrolling - Flag to indicate if scrolling should be skipped
   */
  LM_MoveTrack(event, skipScrolling) {
    console.log("O.Opt LM_MoveTrack - Input:", { event, skipScrolling });

    // Prevent too frequent updates (throttling)
    if (Date.now() - this.theEventTimestamp < 250) {
      console.log("O.Opt LM_MoveTrack - Output: Throttled (skipping)");
      return;
    }

    // Handle first movement - initialize drag operation
    if (!this.dragGotMove) {
      const objectsToMove = this.theMoveList;

      if (objectsToMove && objectsToMove.length) {
        // Check if we need to duplicate objects (Ctrl+drag)
        if (this.DragDuplicate(event)) {
          // Get selection list and session data
          const selectedList = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, true);
          const sessionData = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, true);

          // Store current selection for duplication
          selectedList.length = 0;
          for (let i = 0; i < objectsToMove.length; i++) {
            selectedList.push(objectsToMove[i]);
          }

          // Get target object information
          const targetObject = this.GetObjectPtr(this.theDragTargetID, false);
          let targetObjectBaseClass = -1;
          let targetObjectFrame = null;

          if (targetObject) {
            targetObjectFrame = targetObject.Frame;
            targetObjectBaseClass = targetObject.DrawingObjectBaseClass;
          }

          // Duplicate the objects
          const duplicatedObjects = this.DuplicateObjects(true);

          // Update selection list to duplicated objects
          selectedList.length = 0;
          for (let i = 0; i < duplicatedObjects.length; i++) {
            selectedList.push(duplicatedObjects[i]);
          }

          // Reset lists and prepare for moving the duplicates
          GlobalData.optManager.MoveDuplicated = true;
          this.theMoveList.length = 0;
          this.theDragElementList.length = 0;
          this.theDragBBoxList.length = 0;
          this.LinkParams.lpCircList = [];
          this.LinkParams.InitialHook = -1;

          // Rebuild lists with duplicated objects
          for (let i = duplicatedObjects.length - 1; i >= 0; i--) {
            const duplicatedObject = this.GetObjectPtr(duplicatedObjects[i], false);
            if (duplicatedObject) {
              this.theMoveList.push(duplicatedObjects[i]);
              this.LinkParams.lpCircList.push(duplicatedObjects[i]);
              this.theDragElementList.push(duplicatedObjects[i]);

              const objectFrame = duplicatedObject.GetSVGFrame();

              // If this duplicated object matches the target, make it the new target
              if (targetObjectFrame &&
                Utils2.EqualRect(objectFrame, targetObjectFrame, 2) &&
                duplicatedObject.DrawingObjectBaseClass === targetObjectBaseClass) {
                this.theDragTargetID = duplicatedObjects[i];
                sessionData.tselect = duplicatedObjects[i];
              }

              this.theDragBBoxList.push(objectFrame);
            }
          }

          // Update reference to use duplicated objects
          objectsToMove = this.theMoveList;
        }

        // Remove dimension lines for all objects being moved
        const objectCount = objectsToMove.length;
        for (let i = 0; i < objectCount; i++) {
          const objectId = objectsToMove[i];
          const drawingObject = this.GetObjectPtr(objectId, false);

          if (drawingObject) {
            const svgElement = this.svgObjectLayer.GetElementByID(objectId);
            drawingObject.RemoveDimensionLines(svgElement);
          }
        }
      }
    }

    // Mark as dragging now in progress
    this.dragGotMove = true;

    // Check if we're in connection mode
    const isConnecting = this.LinkParams && this.LinkParams.ConnectIndex >= 0;

    // Handle auto-scrolling if needed
    if (skipScrolling) {
      this.ResetAutoScrollTimer();
    } else if (!this.AutoScrollCommon(event, !isConnecting, 'HandleObjectDragDoAutoScroll')) {
      console.log("O.Opt LM_MoveTrack - Output: Auto-scroll in progress");
      return;
    }

    // Convert window coordinates to document coordinates
    const docCoordinates = this.svgDoc.ConvertWindowToDocCoords(
      event.gesture.center.clientX,
      event.gesture.center.clientY
    );

    // Process any adjustments from connection finding
    const adjustedCoordinates = this.LM_MoveDuringTrack(docCoordinates, event);

    // Handle the actual movement
    this.HandleObjectDragMoveCommon(
      adjustedCoordinates.x,
      adjustedCoordinates.y,
      skipScrolling,
      event
    );

    console.log("O.Opt LM_MoveTrack - Output: Objects moved to", adjustedCoordinates);
  }

  /**
  * Handles the end of a move operation
  * @param event - The release event
  * @param moveData - Optional data from a collaborative move
  */
  LM_MoveRelease(event, moveData) {
    console.log("O.Opt LM_MoveRelease - Input:", { event, moveData });

    let wasLastOpDuplicate = false;

    // Handle early exit conditions
    if (!moveData && (
      Utils2.StopPropagationAndDefaults(event),
      GlobalData.optManager.UnbindShapeMoveHammerEvents(),
      this.ResetAutoScrollTimer(),
      GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
      this.DynamicSnapsRemoveGuides(this.dynamicGuides),
      this.dynamicGuides = null,
      !this.dragGotMove || this.CheckDragIsOverCustomLibrary(event)
    )) {
      // Handle dropping over custom library
      if (this.CheckDragIsOverCustomLibrary(event)) {
        const selectedList = this.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, false);

        // Add moved objects to selection if not already there
        for (let i = 0; i < this.theMoveList.length; i++) {
          const objectId = this.theMoveList[i];
          if (selectedList.indexOf(objectId) === -1) {
            selectedList.push(objectId);
          }
        }

        // Add all moved objects to dirty list for rendering
        for (let i = 0; i < this.theMoveList.length; i++) {
          this.AddToDirtyList(this.theMoveList[i]);
        }

        this.RenderDirtySVGObjects();
      }

      this.LM_MovePostRelease(false);
      this.RenderAllSVGSelectionStates();
      this.theMoveList = null;
      // Collab.UnBlockMessages();

      console.log("O.Opt LM_MoveRelease - Output: Early exit condition met");
      return;
    }

    // Process normal move completion
    const objectCount = this.theMoveList ? this.theMoveList.length : 0;

    if (objectCount === 0) {
      console.log("O.Opt LM_MoveRelease - Output: No objects to move");
      return;
    }

    // Prepare collaboration message data
    let objectFrame = null;
    let objectPosition = {};
    const moveMessageData = {
      theMoveList: [],
      thePointList: [],
      theDragDeltaX: this.theDragDeltaX,
      MoveDuplicated: GlobalData.optManager.MoveDuplicated
    };

    // Update positions of all moved objects
    for (let i = 0; i < objectCount; i++) {
      const objectId = this.theMoveList[i];
      const drawingObject = GlobalData.objectStore.GetObject(objectId).Data;

      // Get the object's new position either from collaboration data or from drag operation
      if (moveData) {
        objectPosition = moveData.Data.thePointList[i];
      } else {
        objectFrame = this.theDragBBoxList[i];
        if (!objectFrame) continue;

        objectPosition = {
          x: objectFrame.x + this.theDragDeltaX,
          y: objectFrame.y + this.theDragDeltaY
        };
      }

      // Apply adjustments for shapes with thick borders
      if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
        drawingObject.polylist === null &&
        drawingObject.StyleRecord.Line.BThick) {
        objectPosition.x += drawingObject.StyleRecord.Line.BThick;
        objectPosition.y += drawingObject.StyleRecord.Line.BThick;
      }

      // Handle notes (when coming from collaboration data)
      if (moveData) {
        const noteId = 'note_' + objectId;
        const noteElement = this.svgHighlightLayer.GetElementByID(noteId);

        if (noteElement) {
          const notePosition = noteElement.GetPos();
          const deltaX = objectPosition.x - drawingObject.Frame.x;
          const deltaY = objectPosition.y - drawingObject.Frame.y;

          notePosition.x += deltaX;
          notePosition.y += deltaY;
          noteElement.SetPos(notePosition.x, notePosition.y);
        }
      }

      // Update object position
      this.SetShapeOriginNoDirty(objectId, objectPosition.x, objectPosition.y);

      // Additional updates for auto-inserted shapes
      if (this.LinkParams.ConnectHookFlag === ConstantData.HookFlags.SED_LC_AutoInsert) {
        drawingObject.UpdateFrame(drawingObject.Frame);
      }

      // Mark for rendering if object has dimensions or comes from collaboration
      if (drawingObject.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
        drawingObject.Dimensions & ConstantData.DimensionFlags.SED_DF_Select ||
        moveData ||
        drawingObject.Dimensions & ConstantData.DimensionFlags.SED_DF_Area) {
        this.AddToDirtyList(objectId);
      }

      // // Add to collaboration message data if needed
      // if (Collab.AllowMessage()) {
      //   moveMessageData.theMoveList.push(objectId);
      //   moveMessageData.thePointList.push(Utils1.DeepCopy(objectPosition));
      // }
    }

    // // Build and send collaboration message
    // let collabMessage = null;
    // if (Collab.AllowMessage()) {
    //   moveMessageData.LinkParams = Utils1.DeepCopy(GlobalData.optManager.LinkParams);
    //   collabMessage = Collab.BuildMessage(
    //     ConstantData.CollabMessages.MoveObjects,
    //     moveMessageData,
    //     false,
    //     true
    //   );
    // }

    // Finalize the move operation
    this.LM_MovePostRelease(true, moveData);

    // // Send collaboration message if needed
    // if (collabMessage) {
    //   if (Collab.IsSecondary() && Collab.CreateList.length) {
    //     collabMessage.Data.CreateList = [];
    //     collabMessage.Data.CreateList = collabMessage.Data.CreateList.concat(Collab.CreateList);
    //   }
    //   Collab.SendMessage(collabMessage);
    // }

    // Handle duplicate operation tracking
    if (!moveData && this.LastOpDuplicate) {
      wasLastOpDuplicate = true;
      const sessionData = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, true);
      sessionData.dupdisp.x += this.theDragDeltaX;
      sessionData.dupdisp.y += this.theDragDeltaY;
    }

    // Complete the operation and clean up
    this.CompleteOperation(null);

    if (!moveData) {
      if (wasLastOpDuplicate) {
        this.LastOpDuplicate = true;
      }
      this.theMoveList = null;
    }

    console.log("O.Opt LM_MoveRelease - Output: Move operation completed");
  }

  /**
   * Handles post-processing after a move operation is complete
   * @param completeOperation - Whether to complete the operation (true) or cancel (false)
   * @param moveData - Optional data from a collaborative move operation
   */
  LM_MovePostRelease(completeOperation, moveData) {
    console.log("O.Opt LM_MovePostRelease - Input:", { completeOperation, moveData });

    let flowChartHookResult = false;
    const objectsToSelect = [];

    // Clean up any highlighted connections
    if (this.LinkParams && this.LinkParams.HiliteConnect >= 0) {
      this.HiliteConnect(
        this.LinkParams.HiliteConnect,
        this.LinkParams.ConnectPt,
        false,
        false,
        this.theDragTargetID,
        this.LinkParams.ConnectPt,
        this.LinkParams.HiliteInside
      );
      this.LinkParams.HiliteConnect = -1;
      this.LinkParams.HiliteInside = null;
    }

    // Clean up any highlighted joins
    if (this.LinkParams && this.LinkParams.HiliteJoin >= 0) {
      this.HiliteConnect(
        this.LinkParams.HiliteJoin,
        this.LinkParams.ConnectPt,
        false,
        true,
        this.theDragTargetID,
        null
      );
      this.LinkParams.HiliteJoin = -1;
    }

    // Reset edit mode if not a collaborative move
    if (!moveData) {
      this.SetEditMode(ConstantData.EditState.DEFAULT);
    }

    // Process the completed move if requested
    if (completeOperation) {
      // Get the target object that was dragged
      let targetObject = this.GetObjectPtr(this.theDragTargetID);

      // Special handling for timeline events
      if (targetObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT ||
        targetObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT_LABEL) {

        let dragDeltaX = this.theDragDeltaX;
        let objectsToMove = this.theMoveList;

        // If this is a collaborative move, use the data from there
        if (moveData?.Data?.theDragDeltaX != null) {
          dragDeltaX = moveData.Data.theDragDeltaX;
        }
        if (moveData?.Data?.theMoveList != null) {
          objectsToMove = moveData.Data.theMoveList;
        }

        flowChartHookResult = this.TimelineMoveEvent(this.theDragTargetID, objectsToMove, dragDeltaX, true);
      }
      // Handle joining polylines
      else if (this.LinkParams.JoinIndex >= 0) {
        this.PolyLJoin(
          this.LinkParams.JoinIndex,
          this.LinkParams.JoinData,
          this.theDragTargetID,
          this.LinkParams.JoinSourceData,
          false
        );
      }
      // Handle object connections
      else if (this.LinkParams &&
        (this.LinkParams.ConnectIndex >= 0 || this.LinkParams.InitialHook >= 0)) {

        // Allow flow chart business logic to handle the hook if needed
        if (GlobalData.gFlowChartManager) {
          flowChartHookResult = GlobalData.gFlowChartManager.FlowChartHook(
            this.theDragTargetID,
            this.LinkParams.InitialHook,
            this.LinkParams.ConnectIndex,
            this.LinkParams.HookIndex,
            this.LinkParams.ConnectPt
          );
        }

        // If flow chart handling didn't succeed, handle the connection based on hook flag
        if (!flowChartHookResult) {
          if (this.LinkParams.ConnectHookFlag === ConstantData.HookFlags.SED_LC_AutoInsert) {
            // Auto-insert the shape into the line
            this.SD_AutoInsertShape(this.theDragTargetID, this.LinkParams.ConnectIndex);
          } else if (this.LinkParams.ConnectHookFlag === ConstantData.HookFlags.SED_LC_HookReverse) {
            // Reverse the hook direction
            this.LM_ReverseHook(this.theDragTargetID);
          } else {
            // Handle multiple selections that need to be hooked
            flowChartHookResult = this.HandleMultipleSelectionHooks();

            // If multiple selection hook handling didn't succeed, update single hook
            if (!flowChartHookResult) {
              this.UpdateHook(
                this.theDragTargetID,
                this.LinkParams.InitialHook,
                this.LinkParams.ConnectIndex,
                this.LinkParams.HookIndex,
                this.LinkParams.ConnectPt,
                this.LinkParams.ConnectInside
              );

              this.SetLinkFlag(
                this.LinkParams.ConnectIndex,
                ConstantData.LinkFlags.SED_L_MOVE
              );

              this.CleanupHooks(this.theDragTargetID, this.LinkParams.ConnectIndex);
            }
          }
        }
      } else {
        // Get business manager for the object
        const businessManager = Business.GetSelectionBusinessManager(this.theDragTargetID);
        const activeManager = businessManager || GlobalData.gBusinessManager;

        // Handle floor plan specific logic
        if (activeManager instanceof FloorPlan) {
          activeManager.EnsureCubicleBehindOutline(this.theDragTargetID);
        }
      }

      // Handle post-move selection
      if (!moveData && this.PostMoveSelectID != null) {
        objectsToSelect.push(this.PostMoveSelectID);
        this.SelectObjects(objectsToSelect, false, false);
        this.PostMoveSelectID = null;
      }
    }

    // Update links if operation was completed
    if (completeOperation) {
      this.UpdateLinks();
    }

    // Clean up if not a collaborative move
    if (!moveData) {
      this.LinkParams = null;
      this.ob = {};
      this.theDragEnclosingRect = null;
      this.theDragElementList = [];
      this.theDragBBoxList = [];
    }

    console.log("O.Opt LM_MovePostRelease - Output: Move post-processing completed");
  }

  /**
 * Handles hooking for multiple selected objects
 * @returns {boolean} True if handled successfully
 */
  HandleMultipleSelectionHooks() {
    console.log("O.Opt HandleMultipleSelectionHooks - Input: No parameters");

    // Get selected objects
    const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, false);
    if (selectedList.length <= 1) {
      console.log("O.Opt HandleMultipleSelectionHooks - Output: false (Only one object selected)");
      return false;
    }

    // Variables for processing
    let currentObject, connectId, objectId, selectedCount, objectIndex, newX, newY;
    let connectObject = null;
    let objectsToUpdate = [];
    let connectionPoints = [];

    // Get the target object that was dragged
    const targetObject = this.GetObjectPtr(this.theDragTargetID, false);

    // Process connection when we have a valid connection index
    if (this.LinkParams.ConnectIndex >= 0) {
      // Get the connection target object
      connectObject = this.GetObjectPtr(this.LinkParams.ConnectIndex, false);

      if (connectObject && connectObject instanceof ShapeContainer) {
        connectId = this.LinkParams.ConnectIndex;
        selectedCount = selectedList.length;

        // Flag for sparse container layout
        const isSparseContainer = connectObject.ContainerList.flags &
          ConstantData.ContainerListFlags.Sparse;

        // Handle case when target object already has a hook to the connect object
        if (targetObject.hooks.length && targetObject.hooks[0].objid === connectId) {
          // Process all other selected objects
          for (objectIndex = 0; objectIndex < selectedCount; objectIndex++) {
            objectId = selectedList[objectIndex];

            if (objectId !== this.theDragTargetID) {
              currentObject = this.GetObjectPtr(objectId, false);

              // If this object also hooks to the same container
              if (currentObject.hooks.length &&
                currentObject.hooks[0].objid === connectId) {

                if (isSparseContainer) {
                  // For sparse containers, maintain relative positioning
                  const deltaX = this.LinkParams.ConnectPt.x - targetObject.hooks[0].connect.x;
                  const deltaY = this.LinkParams.ConnectPt.y - targetObject.hooks[0].connect.y;

                  if (deltaX || deltaY) {
                    objectsToUpdate.push(objectId);

                    newX = currentObject.hooks[0].connect.x + deltaX;
                    newY = currentObject.hooks[0].connect.y + deltaY;

                    if (newX < 0) {
                      newX = 0;
                    }

                    connectionPoints.push({
                      x: newX,
                      y: newY
                    });
                  }
                } else {
                  // For regular containers, stack vertically
                  newX = this.LinkParams.ConnectPt.x;
                  if (newX < 0) {
                    newX = 0;
                  }

                  objectsToUpdate.push(objectId);
                  connectionPoints.push({
                    x: newX,
                    y: this.LinkParams.ConnectPt.y + objectsToUpdate.length
                  });
                }
              }
            }
          }
        } else {
          // Find other shapes that could connect to this container
          for (objectIndex = 0; objectIndex < selectedCount; objectIndex++) {
            objectId = selectedList[objectIndex];

            if (objectId !== this.theDragTargetID) {
              currentObject = this.GetObjectPtr(objectId, false);

              if (connectObject.IsShapeContainer(currentObject)) {
                objectsToUpdate.push(objectId);

                newX = this.LinkParams.ConnectPt.x;
                if (newX < 0) {
                  newX = 0;
                }

                connectionPoints.push({
                  x: newX,
                  y: this.LinkParams.ConnectPt.y + objectsToUpdate.length
                });
              }
            }
          }
        }
      }
    } else if (targetObject.hooks.length > 0) {
      // If target has hooks but no connection index, check if it's connected to a container
      connectId = targetObject.hooks[0].objid;
      connectObject = this.GetObjectPtr(connectId, false);

      if (connectObject && connectObject instanceof ShapeContainer) {
        // Find other objects hooked to the same container
        selectedCount = selectedList.length;

        for (objectIndex = 0; objectIndex < selectedCount; objectIndex++) {
          objectId = selectedList[objectIndex];

          if (objectId !== this.theDragTargetID) {
            currentObject = this.GetObjectPtr(objectId, false);

            if (currentObject.hooks.length &&
              currentObject.hooks[0].objid === connectId) {

              objectsToUpdate.push(objectId);
              connectionPoints.push(currentObject.hooks[0].connect);
            }
          }
        }
      }
    }

    // If we found additional objects to update, update their hooks
    const objectCount = objectsToUpdate.length;
    if (objectCount > 0) {
      // Add the target object to the beginning of the lists
      objectsToUpdate.unshift(this.theDragTargetID);
      connectionPoints.unshift(this.LinkParams.ConnectPt);

      // Update each object's hook
      for (objectIndex = 0; objectIndex < objectCount + 1; objectIndex++) {
        objectId = objectsToUpdate[objectIndex];

        this.UpdateHook(
          objectId,
          this.LinkParams.InitialHook,
          this.LinkParams.ConnectIndex,
          this.LinkParams.HookIndex,
          connectionPoints[objectIndex],
          this.LinkParams.ConnectInside
        );

        this.SetLinkFlag(
          this.LinkParams.ConnectIndex,
          ConstantData.LinkFlags.SED_L_MOVE
        );

        this.CleanupHooks(
          this.theDragTargetID,
          this.LinkParams.ConnectIndex
        );
      }

      console.log("O.Opt HandleMultipleSelectionHooks - Output: true (Multiple hooks updated)");
      return true;
    }

    console.log("O.Opt HandleMultipleSelectionHooks - Output: false (No matching objects found)");
    return false;
  }

  /**
   * Determines if the current drag operation should duplicate objects.
   * @param event - The event that triggered the drag
   * @returns True if duplication should occur, false otherwise
   */
  DragDuplicate(event) {
    console.log("O.Opt DragDuplicate - Input:", event);

    if (event == null) {
      console.log("O.Opt DragDuplicate - Output: false (null event)");
      return false;
    }

    // Check for ctrl key press
    let isCtrlKeyPressed = event.ctrlKey;

    // Get ctrl key state from gesture event if available
    if (event.gesture && event.gesture.srcEvent) {
      isCtrlKeyPressed = event.gesture.srcEvent.ctrlKey;
    }

    // If ctrl key is pressed, check if the object type allows duplication
    if (isCtrlKeyPressed) {
      const targetObject = this.GetObjectPtr(this.theDragTargetID, false);
      const objectTypes = ConstantData.ObjectTypes;
      const objectSubTypes = ConstantData.ObjectSubTypes;

      if (targetObject) {

        // Tasks don't support duplication
        if (targetObject.subtype === objectSubTypes.SD_SUBT_TASK) {
          isCtrlKeyPressed = false;
        }

        // Objects with dataset elements don't support duplication
        if (targetObject.datasetElemID >= 0) {
          isCtrlKeyPressed = false;
        }
      }
    }

    console.log("O.Opt DragDuplicate - Output:", isCtrlKeyPressed);
    return isCtrlKeyPressed;
  }

  /**
   * Handles movement tracking during a drag operation
   * @param position - The current position to track
   * @returns The adjusted position based on connections and snapping
   */
  LM_MoveDuringTrack(position) {
    console.log("O.Opt LM_MoveDuringTrack - Input:", position);

    let hasConnection;
    let targetObject;
    let hookPoints;
    let healedLineId;
    let horizontalDistance;
    let verticalDistance;
    let frameCopy = {};
    let objectsToDelete = [];

    // Early return if there's no valid drag target
    if (this.theDragTargetID < 0) {
      console.log("O.Opt LM_MoveDuringTrack - Output: Invalid drag target");
      return position;
    }

    // Get the object being dragged
    targetObject = this.GetObjectPtr(this.theDragTargetID, false);
    if (targetObject == null) {
      console.log("O.Opt LM_MoveDuringTrack - Output: Target object not found");
      return position;
    }

    // Handle auto-healing lines if needed
    if (this.LinkParams && this.LinkParams.AutoHeal) {
      horizontalDistance = Math.abs(position.x - this.theDragStartX);
      verticalDistance = Math.abs(position.y - this.theDragStartY);

      // Auto-heal if moved far enough or there's an active connection
      if (horizontalDistance > 50 ||
        verticalDistance > 50 ||
        (this.LinkParams.AutoInsert && this.LinkParams.ConnectIndex >= 0)) {

        healedLineId = this.HealLine(targetObject, false, objectsToDelete);
        this.LinkParams.AutoHeal = false;
        this.LinkParams.AutoHealID = targetObject.BlockID;

        // Delete objects that were healed
        if (healedLineId >= 0) {
          objectsToDelete.push(healedLineId);
          this.DeleteObjects(objectsToDelete, false);
        }

        // Update dirty list to redraw correctly
        let indexInDirtyList = this.theDirtyList.indexOf(this.theDragTargetID);
        if (indexInDirtyList >= 0) {
          this.theDirtyList.splice(indexInDirtyList, 1);
          this.RenderDirtySVGObjects();
          this.AddToDirtyList(this.theDragTargetID);
        }

        // Regenerate the move list
        this.GetMoveList(this.theDragTargetID, true, true, false, this.theMoveBounds, false);
      }
    }

    // Apply pin rect constraints if present
    if (this.PinRect) {
      this.PinMoveRect(position);
    }

    // Get hook points for connections
    hookPoints = this.Move_GetHookPoints(
      this.theDragTargetID,
      targetObject,
      position.x - this.theDragStartX,
      position.y - this.theDragStartY
    );

    if (hookPoints) {
      // Reset drag deltas
      this.theDragDeltaX = 0;
      this.theDragDeltaY = 0;

      // Handle drop-on-line or auto-insert modes
      if (GlobalData.optManager.LinkParams.DropOnLine ||
        GlobalData.optManager.LinkParams.AutoInsert) {

        // Create a copy of the frame at the new position
        frameCopy = $.extend(true, {}, targetObject.Frame);
        frameCopy.x += position.x - this.theDragStartX;
        frameCopy.y += position.y - this.theDragStartY;

        // Store original frame to restore later
        const originalFrame = targetObject.Frame;

        // Temporarily update the frame to check connection
        targetObject.Frame = frameCopy;

        // Find connection at the new position
        hasConnection = this.FindConnect(
          this.theDragTargetID,
          targetObject,
          GlobalData.optManager.LinkParams.cpt,
          true,
          true,
          false,
          position
        );

        // Restore original frame
        targetObject.Frame = originalFrame;

        // Apply drag deltas if a connection was found
        if (hasConnection) {
          position.x += this.theDragDeltaX;
          position.y += this.theDragDeltaY;
          console.log("O.Opt LM_MoveDuringTrack - Output (drop connection):", position);
          return position;
        }
      }

      // Reset drag deltas for other connection types
      this.theDragDeltaX = 0;
      this.theDragDeltaY = 0;

      // Check for standard connections or joins
      hasConnection = this.FindConnect(
        GlobalData.optManager.theDragTargetID,
        targetObject,
        hookPoints,
        true,
        false,
        GlobalData.optManager.LinkParams.AllowJoin,
        position
      );

      // Apply drag deltas if a connection or join was found
      if (hasConnection || GlobalData.optManager.LinkParams.JoinIndex >= 0) {
        position.x += this.theDragDeltaX;
        position.y += this.theDragDeltaY;
      }
    }

    console.log("O.Opt LM_MoveDuringTrack - Output:", position);
    return position;
  }

  /**
   * Gets hook points for an object being moved
   * @param objectId - ID of the target object
   * @param drawingObject - The drawing object being moved
   * @param deltaX - Change in X position
   * @param deltaY - Change in Y position
   * @returns Array of hook points or null if hooking not allowed
   */
  Move_GetHookPoints(objectId, drawingObject, deltaX, deltaY) {
    console.log("O.Opt Move_GetHookPoints - Input:", {
      objectId,
      drawingObject: drawingObject ? drawingObject.BlockID : null,
      deltaX,
      deltaY
    });

    // Arrays to store various point types
    const hookPoints = [];
    const attachmentPoints = [];
    const containerPoints = [];

    // Flags for different hooking behaviors
    let allowDropOnLine = false;
    let isFreeHandMode = false;
    let allowAutoInsert = false;

    // Constants for readability
    const extraFlags = ConstantData.ExtraFlags;
    const centerDimension = ConstantData.Defines.SED_CDim;

    // Early return conditions
    if (drawingObject == null) {
      console.log("O.Opt Move_GetHookPoints - Output: null (No drawing object)");
      return null;
    }

    if (this.LinkParams == null) {
      console.log("O.Opt Move_GetHookPoints - Output: null (No link parameters)");
      return null;
    }

    if (drawingObject.hooks && drawingObject.hooks.length === 2) {
      console.log("O.Opt Move_GetHookPoints - Output: null (Object already has 2 hooks)");
      return null;
    }

    if (drawingObject.flags & ConstantData.ObjFlags.SEDO_Assoc) {
      console.log("O.Opt Move_GetHookPoints - Output: null (Object is associated)");
      return null;
    }

    if (drawingObject.PreventLink()) {
      console.log("O.Opt Move_GetHookPoints - Output: null (Object prevents linking)");
      return null;
    }

    // Set array-only mode if object doesn't allow linking
    if (!drawingObject.AllowLink() && this.LinkParams) {
      this.LinkParams.ArraysOnly = true;
    }

    // Get session data and check flags
    const sessionData = this.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
    if (sessionData) {
      // Check if attach-to-line is allowed
      allowDropOnLine = sessionData.flags & ConstantData.SessionFlags.SEDS_AttLink &&
        drawingObject.hookflags & ConstantData.HookFlags.SED_LC_AttachToLine;

      // Check if we're in freehand mode
      isFreeHandMode = sessionData.flags & ConstantData.SessionFlags.SEDS_FreeHand;

      // Check if auto-insert is allowed
      allowAutoInsert = this.AllowAutoInsert();
    }

    // Override drop-on-line flag based on object flags
    allowDropOnLine = !!(
      drawingObject.flags & ConstantData.ObjFlags.SEDO_DropOnBorder ||
      drawingObject.flags & ConstantData.ObjFlags.SEDO_DropOnTable
    );

    // Handle drop-on-line or auto-insert mode
    if (allowDropOnLine || allowAutoInsert) {
      // Set flag in link parameters
      if (allowDropOnLine) {
        this.LinkParams.DropOnLine = true;
      }

      // Create attachment point
      attachmentPoints.push(new Point(drawingObject.attachpoint.x, drawingObject.attachpoint.y));

      // Apply flipping if needed
      if (drawingObject.extraflags & (extraFlags.SEDE_FlipHoriz | extraFlags.SEDE_FlipVert)) {
        const flipRect = new Rectangle(0, 0, centerDimension, centerDimension);
        GlobalData.optManager.FlipPoints(flipRect, drawingObject.extraflags, attachmentPoints);
      }

      // Get perimeter points and adjust for movement
      this.LinkParams.cpt = drawingObject.GetPerimPts(
        objectId,
        attachmentPoints,
        ConstantData.HookPts.SED_KAT,
        false,
        null,
        -1
      );

      if (this.LinkParams.cpt && this.LinkParams.cpt.length > 0) {
        this.LinkParams.cpt[0].id = ConstantData.HookPts.SED_KAT;
        this.LinkParams.cpt[0].x += deltaX;
        this.LinkParams.cpt[0].y += deltaY;
      }
    }

    // Special handling for shapes
    if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE) {
      containerPoints.push(new Point(centerDimension / 2, 0));

      this.LinkParams.ContainerPt = drawingObject.GetPerimPts(
        objectId,
        containerPoints,
        ConstantData.HookPts.SED_KAT,
        false,
        null,
        -1
      );

      if (this.LinkParams.ContainerPt && this.LinkParams.ContainerPt.length > 0) {
        this.LinkParams.ContainerPt[0].id = ConstantData.HookPts.SED_KAT;
        this.LinkParams.ContainerPt[0].x += deltaX;
        this.LinkParams.ContainerPt[0].y += deltaY;
      }
    }

    // Set join flag for line objects in freehand mode
    this.LinkParams.AllowJoin = isFreeHandMode &&
      drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE;

    // Get hook points and adjust for movement
    const points = drawingObject.GetHookPoints(true);
    const perimeterPoints = drawingObject.GetPerimPts(objectId, points, 0, false, null, -1);

    // Adjust coordinates for movement delta
    for (let i = 0; i < perimeterPoints.length; i++) {
      perimeterPoints[i].x += deltaX;
      perimeterPoints[i].y += deltaY;
    }

    console.log("O.Opt Move_GetHookPoints - Output:", {
      pointCount: perimeterPoints.length,
      allowDropOnLine: this.LinkParams.DropOnLine,
      allowJoin: this.LinkParams.AllowJoin
    });

    return perimeterPoints;
  }

  HandleObjectDragMoveCommon(mouseX, mouseY, skipScrolling, event) {
    console.log("O.Opt HandleObjectDragMoveCommon - Input:", { mouseX, mouseY, skipScrolling, event });

    // Helper function to constrain movement within bounds
    const constrainMovementToBounds = () => {
      if (GlobalData.optManager.theDragDeltaX < -GlobalData.optManager.theMoveBounds.x) {
        GlobalData.optManager.theDragDeltaX = -GlobalData.optManager.theMoveBounds.x;
      }
      if (GlobalData.optManager.theDragDeltaY < -GlobalData.optManager.theMoveBounds.y) {
        GlobalData.optManager.theDragDeltaY = -GlobalData.optManager.theMoveBounds.y;
      }
    };

    // Handle pinned rectangle constraints if applicable
    if (GlobalData.optManager.PinRect) {
      const position = {
        x: mouseX,
        y: mouseY
      };
      this.PinMoveRect(position);
      mouseX = position.x;
      mouseY = position.y;
    }

    // Calculate the delta (amount of movement)
    GlobalData.optManager.theDragDeltaX = mouseX - GlobalData.optManager.theDragStartX;
    GlobalData.optManager.theDragDeltaY = mouseY - GlobalData.optManager.theDragStartY;
    constrainMovementToBounds();

    // Calculate new bounds after movement for auto-growth
    let newBoundsLimit = {
      x: GlobalData.optManager.theDragDeltaX + GlobalData.optManager.theMoveBounds.x + GlobalData.optManager.theMoveBounds.width,
      y: GlobalData.optManager.theDragDeltaY + GlobalData.optManager.theMoveBounds.y + GlobalData.optManager.theMoveBounds.height
    };

    // Apply auto-growth if necessary
    newBoundsLimit = GlobalData.optManager.DoAutoGrowDrag(newBoundsLimit);

    // Get the list of objects being moved
    const objectsToMove = this.theMoveList;
    const objectCount = objectsToMove ? objectsToMove.length : 0;

    // Early exit if no objects to move
    if (objectCount === 0) {
      console.log("O.Opt HandleObjectDragMoveCommon - Output: No objects to move");
      return;
    }

    // Variables for object tracking
    let index = 0;
    let svgElement = null;
    let objectRect = null;
    let mousePosition = { x: mouseX, y: mouseY };
    let targetRect = { x: 0, y: 0 };
    let adjustedTargetRect = { x: 0, y: 0 };

    // Determine if we should skip snapping
    let isSnapDisabled = this.LinkParams &&
      (this.LinkParams.ConnectIndex >= 0 || this.LinkParams.JoinIndex >= 0) ||
      skipScrolling;

    const isEnhancedSnap = this.EnhanceSnaps(event);
    const isOverrideSnap = this.OverrideSnaps(event);

    if (isOverrideSnap) {
      isSnapDisabled = true;
    }

    // Get the target object being dragged
    let targetObject = GlobalData.optManager.GetObjectPtr(this.theDragTargetID, false);
    let snapOffset = { x: null, y: null };
    const currentPosition = { x: mouseX, y: mouseY };

    // Ensure we don't drag to negative coordinates
    if (currentPosition.x < 0) {
      currentPosition.x = 0;
    }

    // Remove any existing dynamic guides if snapping is disabled
    if (isSnapDisabled && this.dynamicGuides) {
      this.DynamicSnapsRemoveGuides(this.dynamicGuides);
      this.dynamicGuides = null;
    }

    // Create dynamic guides for snapping
    let dynamicGuides = new DynamicGuides();
    let snapTargetId;

    // Handle snap-to-shapes if enabled
    if (!isSnapDisabled && this.AllowSnapToShapes()) {
      objectRect = targetObject.GetSnapRect();
      targetRect = $.extend(true, {}, objectRect);
      targetRect.x += GlobalData.optManager.theDragDeltaX;
      targetRect.y += GlobalData.optManager.theDragDeltaY;

      const snapOptions = {};
      snapTargetId = targetObject.CanSnapToShapes(snapOptions);

      if (snapTargetId >= 0) {
        // Get snap target rectangle
        objectRect = this.GetObjectPtr(snapTargetId, false).GetSnapRect();
        adjustedTargetRect = $.extend(true, {}, objectRect);
        adjustedTargetRect.x += GlobalData.optManager.theDragDeltaX;
        adjustedTargetRect.y += GlobalData.optManager.theDragDeltaY;

        // Calculate snap points and adjust position
        snapOffset = this.DynamicSnaps_GetSnapObjects(
          snapTargetId,
          adjustedTargetRect,
          dynamicGuides,
          this.theMoveList,
          null,
          snapOptions
        );

        if (snapOffset.x !== null) {
          currentPosition.x += snapOffset.x;
          adjustedTargetRect.x += snapOffset.x;
          GlobalData.optManager.theDragDeltaX = currentPosition.x - GlobalData.optManager.theDragStartX;
        }

        if (snapOffset.y !== null) {
          currentPosition.y += snapOffset.y;
          adjustedTargetRect.y += snapOffset.y;
          GlobalData.optManager.theDragDeltaY = currentPosition.y - GlobalData.optManager.theDragStartY;
        }

        constrainMovementToBounds();
      }
    }

    // Handle grid snapping if enabled
    if (GlobalData.docHandler.documentConfig.enableSnap && !isSnapDisabled) {
      objectRect = targetObject.GetSnapRect();
      targetRect = $.extend(true, {}, objectRect);
      targetRect.x += GlobalData.optManager.theDragDeltaX;
      targetRect.y += GlobalData.optManager.theDragDeltaY;

      // Try custom snapping first
      if (targetObject && targetObject.CustomSnap(
        targetObject.Frame.x,
        targetObject.Frame.y,
        GlobalData.optManager.theDragDeltaX,
        GlobalData.optManager.theDragDeltaY,
        false,
        currentPosition
      )) {
        if (snapOffset.x === null) {
          GlobalData.optManager.theDragDeltaX = currentPosition.x - GlobalData.optManager.theDragStartX;
        }

        if (snapOffset.y === null) {
          GlobalData.optManager.theDragDeltaY = currentPosition.y - GlobalData.optManager.theDragStartY;
        }

        constrainMovementToBounds();
      }
      // Use center snapping if enabled
      else if (GlobalData.docHandler.documentConfig.centerSnap) {
        // Snap based on object center
        mousePosition.x = objectRect.x + GlobalData.optManager.theDragDeltaX + objectRect.width / 2;
        mousePosition.y = objectRect.y + GlobalData.optManager.theDragDeltaY + objectRect.height / 2;
        mousePosition = GlobalData.docHandler.SnapToGrid(mousePosition);

        if (snapOffset.x === null) {
          GlobalData.optManager.theDragDeltaX = mousePosition.x - objectRect.x - objectRect.width / 2;
        }

        if (snapOffset.y === null) {
          GlobalData.optManager.theDragDeltaY = mousePosition.y - objectRect.y - objectRect.height / 2;
        }
      }
      // Use regular rect snapping
      else {
        targetRect = $.extend(true, {}, objectRect);
        targetRect.x += GlobalData.optManager.theDragDeltaX;
        targetRect.y += GlobalData.optManager.theDragDeltaY;

        const snapResult = GlobalData.docHandler.SnapRect(targetRect);

        if (snapOffset.x === null) {
          GlobalData.optManager.theDragDeltaX += snapResult.x;
        }

        if (snapOffset.y === null) {
          GlobalData.optManager.theDragDeltaY += snapResult.y;
        }
      }

      // Handle enhanced snap (shift key) - constrain to horizontal or vertical
      if (isEnhancedSnap) {
        if (Math.abs(GlobalData.optManager.theDragDeltaX) >= Math.abs(GlobalData.optManager.theDragDeltaY)) {
          GlobalData.optManager.theDragDeltaY = 0;
        } else {
          GlobalData.optManager.theDragDeltaX = 0;
        }
      }
    }

    // Get session data and check if auto-grow is disabled
    const sessionData = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);

    if (GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto) {
      // Constrain to document dimensions
      const rightEdge = GlobalData.optManager.theMoveBounds.x +
        GlobalData.optManager.theMoveBounds.width +
        GlobalData.optManager.theDragDeltaX;

      if (rightEdge > sessionData.dim.x) {
        GlobalData.optManager.theDragDeltaX -= rightEdge - sessionData.dim.x;
      }

      const bottomEdge = GlobalData.optManager.theMoveBounds.y +
        GlobalData.optManager.theMoveBounds.height +
        GlobalData.optManager.theDragDeltaY;

      if (bottomEdge > sessionData.dim.y) {
        GlobalData.optManager.theDragDeltaY -= bottomEdge - sessionData.dim.y;
      }
    }

    // Get target selection ID
    let targetSelectionId = this.GetTargetSelect();
    if (targetSelectionId < 0) {
      targetSelectionId = this.theDragTargetID;
    }

    // Zero out deltas if skip scrolling is requested
    if (skipScrolling === true) {
      GlobalData.optManager.theDragDeltaX = 0;
      GlobalData.optManager.theDragDeltaY = 0;
    }

    // Move each object in the move list
    for (index = 0; index < objectCount; ++index) {
      objectRect = GlobalData.optManager.theDragBBoxList[index];

      // Special handling for the target selection
      if (objectsToMove[index] === targetSelectionId) {
        targetObject = this.GetObjectPtr(targetSelectionId, false);

        let displayDimensions = {
          x: objectRect.x + GlobalData.optManager.theDragDeltaX,
          y: objectRect.y + GlobalData.optManager.theDragDeltaY,
          width: objectRect.width,
          height: objectRect.height
        };

        if (targetObject) {
          // Get dimensions for display from the object
          displayDimensions = targetObject.GetDimensionsForDisplay();
          displayDimensions.x += GlobalData.optManager.theDragDeltaX;
          displayDimensions.y += GlobalData.optManager.theDragDeltaY;

          // Update hooked objects if connected
          if ((this.LinkParams && this.LinkParams.ConnectIndex >= 0) ||
            this.LinkParams.ConnectIndexHistory.length > 0) {
            this.HandleHookedObjectMoving(targetObject, displayDimensions);
          }
        }

        // Update coordinates display
        this.UpdateDisplayCoordinates(
          displayDimensions,
          mousePosition,
          ConstantData.CursorTypes.Move,
          targetObject
        );

        // Update selection attributes for the ribbon
        const selectionAttributes = new SelectionAttributes();
        selectionAttributes.left = displayDimensions.x;
        selectionAttributes.top = displayDimensions.y;

        // Check if we need to display dimensions as feet/inches
        const showFeetAsInches = targetObject.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches;

        // Format the dimensions as strings
        selectionAttributes.widthstr = ConstantData.DocumentContext.CurrentWidth;
        selectionAttributes.heightstr = ConstantData.DocumentContext.CurrentHeight;
        selectionAttributes.leftstr = this.GetLengthInRulerUnits(
          selectionAttributes.left,
          false,
          GlobalData.docHandler.rulerSettings.originx,
          showFeetAsInches
        );
        selectionAttributes.topstr = this.GetLengthInRulerUnits(
          selectionAttributes.top,
          false,
          GlobalData.docHandler.rulerSettings.originy,
          showFeetAsInches
        );

        // Update ribbon dimensions (commented out as it's using SDUI)
        // SDUI.Commands.MainController.UpdateRibbonDimensions(selectionAttributes);

        // Update guides display if they exist
        if (dynamicGuides) {
          this.DynamicSnaps_UpdateGuides(dynamicGuides, snapTargetId, adjustedTargetRect);
        }
      }

      // Update SVG element position
      svgElement = GlobalData.optManager.GetSVGDragElement(index);
      if (svgElement) {
        svgElement.SetPos(
          objectRect.x + GlobalData.optManager.theDragDeltaX,
          objectRect.y + GlobalData.optManager.theDragDeltaY
        );

        // Send collaboration event for the move
        const newRect = {
          x: objectRect.x + GlobalData.optManager.theDragDeltaX,
          y: objectRect.y + GlobalData.optManager.theDragDeltaY,
          width: objectRect.width,
          height: objectRect.height
        };

        // Collab.SendSVGEvent(
        //   this.theMoveList[index],
        //   ConstantData.CollabSVGEventTypes.Object_Move,
        //   newRect
        // );
      }
    }

    console.log("O.Opt HandleObjectDragMoveCommon - Output:", {
      deltaX: GlobalData.optManager.theDragDeltaX,
      deltaY: GlobalData.optManager.theDragDeltaY,
      objectsProcessed: objectCount
    });
  }

  /**
     * Checks if enhanced snapping should be enabled (shift key pressed)
     * @param event - The input event
     * @returns True if shift key is pressed, false otherwise
     */
  EnhanceSnaps(event) {
    console.log("O.Opt EnhanceSnaps - Input:", event);

    if (event == null) {
      console.log("O.Opt EnhanceSnaps - Output: false (null event)");
      return false;
    }

    let isShiftKeyPressed = event.shiftKey;

    if (event.gesture && event.gesture.srcEvent) {
      isShiftKeyPressed = event.gesture.srcEvent.shiftKey;
    }

    console.log("O.Opt EnhanceSnaps - Output:", isShiftKeyPressed);
    return isShiftKeyPressed === true;
  }

  /**
     * Gets an SVG element from the drag element list
     * @param index - Index of the element to retrieve
     * @returns The SVG element or null if index is invalid
     */
  GetSVGDragElement(index) {
    console.log("O.Opt GetSVGDragElement - Input:", index);

    if (!this.theDragElementList ||
      index < 0 ||
      index >= this.theDragElementList.length) {
      console.log("O.Opt GetSVGDragElement - Output: null (invalid index)");
      return null;
    }

    const element = this.svgObjectLayer.GetElementByID(this.theDragElementList[index]);
    console.log("O.Opt GetSVGDragElement - Output:", element ? "Element found" : "null");
    return element;
  }

  /**
     * Sets a shape's origin without marking it as dirty
     * @param objectId - ID of the shape object
     * @param newX - New X coordinate
     * @param newY - New Y coordinate
     */
  SetShapeOriginNoDirty(objectId, newX, newY) {
    console.log("O.Opt SetShapeOriginNoDirty - Input:", { objectId, newX, newY });

    const originalPosition = {};
    const objectData = GlobalData.objectStore.PreserveBlock(objectId).Data;

    originalPosition.x = objectData.Frame.x;
    originalPosition.y = objectData.Frame.y;

    objectData.SetShapeOrigin(newX, newY);

    // If position changed, set the link flag
    if (newX - originalPosition.x || newY - originalPosition.y) {
      this.SetLinkFlag(objectId, ConstantData.LinkFlags.SED_L_MOVE);
    }

    console.log("O.Opt SetShapeOriginNoDirty - Output: Shape origin updated");
  }

  /**
     * Sets a flag on a link
     * @param targetId - ID of the target object
     * @param flagValue - Flag value to set
     * @returns 0 on success, 1 on failure
     */
  SetLinkFlag(targetId, flagValue) {
    console.log("O.Opt SetLinkFlag - Input:", { targetId, flagValue });

    const links = this.GetObjectPtr(this.theLinksBlockID, false);

    if (links == null) {
      console.log("O.Opt SetLinkFlag - Output: 1 (links not found)");
      return 1;
    }

    // Find the link for the target object
    let linkIndex = this.FindLink(links, targetId, true);

    if (linkIndex >= 0) {
      // Get a preserved copy of the links for modification
      const preservedLinks = this.GetObjectPtr(this.theLinksBlockID, true);

      // Get the target object and ensure it exists
      const targetObject = this.GetObjectPtr(targetId, true);
      if (targetObject == null) {
        console.log("O.Opt SetLinkFlag - Output: 1 (target object not found)");
        return 1;
      }

      // Update the target object
      targetObject.ChangeTarget(targetId, null, null, null, null, false);

      // Set the flag for all links to this target
      while (linkIndex < preservedLinks.length && preservedLinks[linkIndex].targetid == targetId) {
        preservedLinks[linkIndex].flags = Utils2.SetFlag(preservedLinks[linkIndex].flags, flagValue, true);
        linkIndex++;
      }
    }

    console.log("O.Opt SetLinkFlag - Output: 0 (success)");
    return 0;
  }

  /**
     * Sets a link flag during resize operations
     * @param objectId - ID of the object being resized
     * @param flagValue - Flag value to set
     */
  Resize_SetLinkFlag(objectId, flagValue) {
    console.log("O.Opt Resize_SetLinkFlag - Input:", { objectId, flagValue });

    const object = this.GetObjectPtr(objectId, false);

    // If object has hooks, update the hook's link flag
    if (object && object.hooks.length) {
      const hookObjectId = object.hooks[0].objid;
      const hookObject = this.GetObjectPtr(hookObjectId, false);

      if (hookObject &&
        (hookObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ||
          hookObject instanceof ShapeContainer)) {
        this.SetLinkFlag(hookObjectId, ConstantData.LinkFlags.SED_L_MOVE);
      }
    }

    // Set the flag for the object itself
    this.SetLinkFlag(objectId, flagValue);

    console.log("O.Opt Resize_SetLinkFlag - Output: Link flags updated");
  }

  /**
   * Maintains links between objects when one object moves or changes
   * @param targetId - ID of the target object
   * @param drawingObject - The drawing object being modified
   * @param changeEvent - Optional change event data
   * @param triggerType - Trigger type for the change
   * @param maintainMode - Mode for maintaining the link
   */
  MaintainLink(targetId, drawingObject, changeEvent, triggerType, maintainMode) {
    console.log("O.Opt MaintainLink - Input:", { targetId, drawingObject: drawingObject.BlockID, triggerType, maintainMode });

    let linkIndex, hookObject;
    let hookFlags = 0;
    let connectionPoint = {};
    let targetPoints = [];
    const links = this.GetObjectPtr(this.theLinksBlockID, true);

    // Exit if no links or object doesn't allow maintaining links
    if (!links || !drawingObject.AllowMaintainLink()) {
      console.log("O.Opt MaintainLink - Output: No links or link maintenance not allowed");
      return;
    }

    // Find the first link for this target
    linkIndex = this.FindLink(links, targetId, true);
    if (linkIndex < 0) {
      console.log("O.Opt MaintainLink - Output: No links found for targetId", targetId);
      return;
    }

    // Process all links to this target
    while (linkIndex < links.length && links[linkIndex].targetid === targetId) {
      hookObject = this.GetObjectPtr(links[linkIndex].hookid, false);

      // Skip if hook object doesn't exist or has special flags
      if (!hookObject) {
        linkIndex++;
        continue;
      }

      // Skip associated objects
      if (hookObject.associd === targetId && (hookObject.flags & ConstantData.ObjFlags.SEDO_Assoc)) {
        linkIndex++;
        continue;
      }

      // Skip objects that don't allow link maintenance
      if (hookObject.flags & ConstantData.ObjFlags.SEDO_NoMaintainLink) {
        linkIndex++;
        continue;
      }

      // Check each hook on the object
      for (let hookIndex = 0; hookIndex < hookObject.hooks.length; hookIndex++) {
        if (hookObject.hooks[hookIndex].objid === targetId) {
          // Determine if special mode handling is needed
          let actualMaintainMode = maintainMode;
          if (maintainMode === 2) {
            actualMaintainMode = !(
              hookObject.hooks[hookIndex].hookpt !== ConstantData.HookPts.SED_KAT ||
              hookObject.DrawingObjectBaseClass !== ConstantData.DrawingObjectBaseClass.SHAPE ||
              drawingObject instanceof PolyLineContainer
            );
          }

          // Get hook connection point
          connectionPoint = hookObject.HookToPoint(hookObject.hooks[hookIndex].hookpt, null);

          // Try to maintain the point connection
          if (drawingObject.MaintainPoint(connectionPoint, targetId, changeEvent, hookObject, triggerType) === false) {
            linkIndex++;
            continue;
          }

          // Update hook coordinates if not in special mode
          if (!actualMaintainMode) {
            hookFlags = ConstantData.HookFlags.SED_LC_NoSnaps;
            hookFlags = Utils2.SetFlag(
              hookFlags,
              ConstantData.HookFlags.SED_LC_ShapeOnLine,
              !(hookObject instanceof BaseLine)
            );

            targetPoints = drawingObject.GetTargetPoints(connectionPoint, hookFlags, null);
            if (targetPoints) {
              hookObject.hooks[hookIndex].connect.x = targetPoints[0].x;
              hookObject.hooks[hookIndex].connect.y = targetPoints[0].y;
            }
          }

          // Handle text orientation alignment
          if (drawingObject.TextFlags & ConstantData.TextFlags.SED_TF_HorizText &&
            hookObject instanceof BaseShape) {

            let textAngle = drawingObject.GetApparentAngle(connectionPoint);
            textAngle %= 180;

            let shapeAngle = hookObject.RotationAngle;
            let angle180 = (textAngle + 180) % 360;

            // Choose the angle with the smallest difference to current rotation
            textAngle = GlobalData.optManager.GetAngleSmallestDiff(textAngle, shapeAngle) <
              GlobalData.optManager.GetAngleSmallestDiff(angle180, shapeAngle) ?
              textAngle : angle180;

            // Only update if angle difference is significant
            if (Math.abs(shapeAngle - textAngle) > 2 &&
              Math.abs(shapeAngle - Math.abs(textAngle - 180)) > 2) {

              GlobalData.objectStore.PreserveBlock(links[linkIndex].hookid);
              hookObject.RotationAngle = textAngle;
              GlobalData.optManager.AddToDirtyList(hookObject.BlockID);
            }
          }
        }
      }
      linkIndex++;
    }

    console.log("O.Opt MaintainLink - Output: Links maintained successfully");
  }

  /**
     * Rotates a point around another point by a given angle
     * @param centerPoint - Point to rotate around
     * @param targetPoint - Point to be rotated
     * @param angleRadians - Rotation angle in radians
     * @returns The rotated point
     */
  RotatePointAroundPoint(centerPoint, targetPoint, angleRadians) {
    console.log("O.Opt RotatePointAroundPoint - Input:", { centerPoint, targetPoint, angleRadians });

    // Create a new point to avoid modifying original
    const rotatedPoint = {
      x: targetPoint.x,
      y: targetPoint.y
    };

    // Get sine and cosine of the angle
    const sinAngle = Math.sin(angleRadians);
    const cosAngle = Math.cos(angleRadians);

    // Translate point to origin
    rotatedPoint.x -= centerPoint.x;
    rotatedPoint.y -= centerPoint.y;

    // Apply rotation
    const newX = rotatedPoint.x * cosAngle - rotatedPoint.y * sinAngle;
    const newY = rotatedPoint.x * sinAngle + rotatedPoint.y * cosAngle;

    // Translate back
    rotatedPoint.x = newX + centerPoint.x;
    rotatedPoint.y = newY + centerPoint.y;

    console.log("O.Opt RotatePointAroundPoint - Output:", rotatedPoint);
    return rotatedPoint;
  }

  /**
   * Checks if a text hyperlink was clicked
   * @param drawingObject - The drawing object containing the text
   * @param eventPosition - Position of the click event
   * @returns True if a hyperlink was clicked, false otherwise
   */
  CheckTextHyperlinkHit(drawingObject, eventPosition) {
    console.log("O.Opt CheckTextHyperlinkHit - Input:", {
      drawingObject: drawingObject.BlockID,
      eventPosition
    });

    // Return false if object has no text data or is locked
    if (drawingObject.DataID === -1 && drawingObject.TableID === -1) {
      console.log("O.Opt CheckTextHyperlinkHit - Output: false (no text data)");
      return false;
    }

    if (drawingObject.flags & ConstantData.ObjFlags.SEDO_Lock) {
      console.log("O.Opt CheckTextHyperlinkHit - Output: false (object locked)");
      return false;
    }

    // Return false if not in default edit mode
    if (this.GetEditMode() !== ConstantData.EditState.DEFAULT) {
      console.log("O.Opt CheckTextHyperlinkHit - Output: false (not in default edit mode)");
      return false;
    }

    // Get SVG element for the object
    const svgElement = this.svgObjectLayer.GetElementByID(drawingObject.tag);

    // Find the text element to check
    if (this.GetObjectPtr(this.theTEDSessionBlockID, false).theActiveTextEditObjectID !== drawingObject.BlockID) {
      const table = drawingObject.GetTable(false);

      if (table) {
        const cellIndex = GlobalData.optManager.Table_GetCellClicked(drawingObject, eventPosition);

        if (cellIndex >= 0) {
          const cell = table.cells[cellIndex];
          if (cell.DataID >= 0 && svgElement) {
            svgElement.textElem = svgElement.GetElementByID(
              ConstantData.SVGElementClass.TEXT,
              cell.DataID
            );
          }
        }
      }
    }

    // Get the text element
    const textElement = svgElement ? svgElement.textElem : null;

    if (!textElement) {
      console.log("O.Opt CheckTextHyperlinkHit - Output: false (no text element)");
      return false;
    }

    // Check for hyperlink at the click location
    const hyperlinkUrl = textElement.GetHyperlinkAtLocation(eventPosition);

    if (hyperlinkUrl) {
      // Handle hyperlink click - commented out as it references SDUI
      // SDUI.Commands.MainController.Hyperlinks.FollowHyperlink(hyperlinkUrl);

      console.log("O.Opt CheckTextHyperlinkHit - Output: true (hyperlink found)");
      return true;
    }

    console.log("O.Opt CheckTextHyperlinkHit - Output: false (no hyperlink found)");
    return false;
  }

  /**
   * Updates edge layers based on dimension changes.
   * @param objectsToExclude - Objects to exclude from updates
   * @param originalDimensions - Original document dimensions
   * @param newDimensions - New document dimensions
   */
  UpdateEdgeLayers(objectsToExclude, originalDimensions, newDimensions) {
    console.log("O.Opt UpdateEdgeLayers - Input:", { objectsToExclude, originalDimensions, newDimensions });

    let layerIndex, objectList, objectCount, objectIndex, objectId, currentObject;
    let needsLeftEdge, needsTopEdge, needsRightEdge, needsBottomEdge;
    let needsRedraw = false;

    // Constants for edge annotations
    const edgeAnnotationDistance = ConstantData.Defines.AnnoHotDist;
    const leftEdgeOffset = edgeAnnotationDistance;
    const topEdgeOffset = edgeAnnotationDistance;
    const usableWidth = originalDimensions.x - 2 * edgeAnnotationDistance;
    const usableHeight = originalDimensions.y - 2 * edgeAnnotationDistance;

    // Get layers manager from the object store
    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, false);
    const layers = layersManager.layers;
    const numberOfLayers = layersManager.nlayers;

    // Save current dirty list to restore later
    const savedDirtyList = Utils1.DeepCopy(this.theDirtyList);
    this.theDirtyList = [];

    // Process each layer
    for (layerIndex = 0; layerIndex < numberOfLayers; layerIndex++) {
      // Skip active layer and non-edge layers
      if (layerIndex !== layersManager.activelayer &&
        layers[layerIndex].flags & ConstantData.LayerFlags.SDLF_UseEdges) {

        objectList = layers[layerIndex].zList;
        objectCount = objectList.length;

        // Process each object in the layer
        for (objectIndex = 0; objectIndex < objectCount; objectIndex++) {
          objectId = objectList[objectIndex];

          // Skip excluded objects
          if (objectsToExclude.indexOf(objectId) >= 0) {
            continue;
          }

          // Get the object and check if it needs edge updates
          currentObject = GlobalData.optManager.GetObjectPtr(objectId, false);
          if (currentObject) {
            // Determine which edges the object needs
            needsLeftEdge = currentObject.Frame.x < leftEdgeOffset;
            needsTopEdge = currentObject.Frame.y < topEdgeOffset;
            needsRightEdge = currentObject.Frame.x + currentObject.Frame.width > leftEdgeOffset + usableWidth;
            needsBottomEdge = currentObject.Frame.y + currentObject.Frame.height > topEdgeOffset + usableHeight;

            // Update edges if needed
            if (currentObject.UseEdges(needsLeftEdge, needsTopEdge, needsRightEdge, needsBottomEdge,
              originalDimensions, newDimensions)) {
              needsRedraw = true;
            }
          }
        }
      }
    }

    // Redraw if any objects were updated
    if (needsRedraw) {
      GlobalData.optManager.RenderDirtySVGObjects();
    }

    // Restore the original dirty list
    this.theDirtyList = savedDirtyList;

    console.log("O.Opt UpdateEdgeLayers - Output: Edge layers updated, needsRedraw:", needsRedraw);
  }

  /**
     * Resizes the SVG document based on session dimensions
     */
  ResizeSVGDocument() {
    console.log("O.Opt ResizeSVGDocument - Input: No parameters");

    // Get the session data from stored object
    const sessionData = GlobalData.objectStore.GetObject(this.theSEDSessionBlockID).Data;

    // Resize the document to the dimensions specified in session data
    GlobalData.docHandler.ResizeDocument(sessionData.dim.x, sessionData.dim.y);

    console.log("O.Opt ResizeSVGDocument - Output: Document resized to", sessionData.dim);
  }

  /**
   * Handles clicks on test icons in the SVG document
   * @param event - The event that triggered the icon click
   */
  LM_TestIconClick(event) {
    console.log("O.Opt LM_TestIconClick - Input:", event);

    // Find the SVG element corresponding to the clicked DOM element
    const svgElement = this.svgObjectLayer.FindElementByDOMElement(event.currentTarget);

    if (svgElement) {
      // Get target element and its metadata
      const targetElement = svgElement.GetTargetForEvent(event);
      const elementId = targetElement.GetID();
      const elementUserData = targetElement.GetUserData();
      const objectId = svgElement.GetID();
      const drawingObject = GlobalData.optManager.GetObjectPtr(objectId, false);

      // Validate that we have a drawing object
      if (!(drawingObject && drawingObject instanceof BaseDrawingObject)) {
        console.log("O.Opt LM_TestIconClick - Output: false (no valid drawing object)");
        return false;
      }

      // Handle different element types
      switch (elementId) {
        case ConstantData.Defines.TableRowHit:
        case ConstantData.Defines.TableRowHitHidden:
        case ConstantData.Defines.TableRowSelection:
          // Table row handling - no default action
          break;

        case ConstantData.Defines.HitAreas:
          // Handle hit area click
          const hitAreaData = targetElement.GetUserData();
          this.LM_HitAreaClick(objectId, hitAreaData);
          break;

        default:
          // Handle shape icon click
          this.LM_ShapeIconClick(event, objectId, elementId, elementUserData);
      }
    }

    console.log("O.Opt LM_TestIconClick - Output: Operation completed");
  }

  /**
   * Handles auto-scrolling during drag operations
   */
  HandleObjectDragDoAutoScroll() {
    console.log("O.Opt HandleObjectDragDoAutoScroll - Input: Starting auto-scroll");

    // Schedule next auto-scroll
    GlobalData.optManager.autoScrollTimerID = this.autoScrollTimer.setTimeout("HandleObjectDragDoAutoScroll", 100);

    // Convert window coordinates to document coordinates
    const documentCoords = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(
      GlobalData.optManager.autoScrollXPos,
      GlobalData.optManager.autoScrollYPos
    );

    // Scroll to the position
    GlobalData.docHandler.ScrollToPosition(documentCoords.x, documentCoords.y);

    // Continue object dragging at the new position
    GlobalData.optManager.HandleObjectDragMoveCommon(documentCoords.x, documentCoords.y);

    console.log("O.Opt HandleObjectDragDoAutoScroll - Output: Position updated", documentCoords);
  }

  /**
   * Prepares the application for drag-drop or stamp operations
   */
  PreDragDropOrStamp() {
    console.log("O.Opt PreDragDropOrStamp - Input: No parameters");

    // Clean up existing hammer instance if it exists
    if (GlobalData.optManager.MainAppHammer) {
      GlobalData.optManager.UnbindDragDropOrStamp();
    }

    // Create a new hammer instance for the main application element
    GlobalData.optManager.MainAppHammer = Hammer(GlobalData.optManager.MainAppElement);

    console.log("O.Opt PreDragDropOrStamp - Output: Hammer manager created for drag/drop operations");
  }

  /**
   * Handles clicks on shape icons in the SVG document
   * @param event - The event that triggered the icon click
   * @param objectId - ID of the object containing the icon
   * @param iconType - Type of icon that was clicked
   * @param userData - Additional data related to the icon
   * @returns True if the click was handled, false otherwise
   */
  LM_ShapeIconClick(event, objectId, iconType, userData) {
    console.log("O.Opt LM_ShapeIconClick - Input:", { event, objectId, iconType, userData });

    // Get the object corresponding to the icon
    let drawingObject = this.GetObjectPtr(objectId, false);
    if (drawingObject == null) {
      console.log("O.Opt LM_ShapeIconClick - Output: false (Object not found)");
      return false;
    }

    // Check if object is inside a container cell
    if (drawingObject instanceof ShapeContainer) {
      const cellContainer = GlobalData.optManager.ContainerIsInCell(drawingObject);
      if (cellContainer) {
        drawingObject = cellContainer.obj;
        objectId = drawingObject.BlockID;
      }
    }

    // Prevent clicking on locked objects
    if (drawingObject.flags & ConstantData.ObjFlags.SEDO_Lock) {
      console.log("O.Opt LM_ShapeIconClick - Output: false (Object is locked)");
      return false;
    }

    // Only handle clicks in default edit mode
    if (this.GetEditMode() !== ConstantData.EditState.DEFAULT) {
      console.log("O.Opt LM_ShapeIconClick - Output: false (Not in default edit mode)");
      return false;
    }

    // Handle based on icon type
    switch (iconType) {
      case ConstantData.ShapeIconType.HYPERLINK:
        // Handle regular hyperlink
        const hyperlinkUrl = drawingObject.GetHyperlink(userData);

        if (hyperlinkUrl !== '') {
          if (event.gesture) {
            event.gesture.stopDetect();
          }
          return true;
        }
        return true;

      case ConstantData.ShapeIconType.EXPANDEDVIEW:
        // Handle expanded view
        let expandedViewId;
        const cellForExpandedView = drawingObject.IsNoteCell(userData);
        expandedViewId = cellForExpandedView ? cellForExpandedView.ExpandedViewID : drawingObject.ExpandedViewID;
        GlobalData.optManager.ShowExpandedView(expandedViewId, event);
        console.log("O.Opt LM_ShapeIconClick - Output: false (Expanded view shown)");
        break;

      case ConstantData.ShapeIconType.COMMENT:
        // Handle comment icon
        let commentId = null;

        // Extract comment ID from user data if available
        if (userData && userData.split) {
          const parts = userData.split('.');
          if (parts[1]) {
            commentId = parseInt(parts[1], 10);
          }
        }

        GlobalData.optManager.EditComments(commentId);
        console.log("O.Opt LM_ShapeIconClick - Output: false (Comment edit opened)");
        break;

      case ConstantData.ShapeIconType.NOTES:
        // Handle notes icon
        const cellForNote = drawingObject.IsNoteCell(userData);

        // Close any active text edit
        if (!this.bInNoteEdit) {
          this.DeactivateAllTextEdit(false);
        } else if (this.curNoteShape == objectId && this.curNoteTableCell == cellForNote) {
          // Toggle off current note if clicking the same one
          this.ToggleNote(this.curNoteShape, this.curNoteTableCell);
        }

        // Toggle on the new note
        this.ToggleNote(objectId, cellForNote, userData);
        console.log("O.Opt LM_ShapeIconClick - Output: true (Note toggled)");
        return true;

      case ConstantData.ShapeIconType.EXPANDTABLE:
        // Handle expand table icon
        const cellForExpand = drawingObject.IsNoteCell(userData);
        console.log("O.Opt LM_ShapeIconClick - Output: false (Table expanded)");
        break;

      case ConstantData.ShapeIconType.COLLAPSETABLE:
        // Handle collapse table icon
        const cellForCollapse = drawingObject.IsNoteCell(userData);
        console.log("O.Opt LM_ShapeIconClick - Output: false (Table collapsed)");
        break;

      case ConstantData.ShapeIconType.FIELDDATA:
        // Handle field data icon
        let isShiftPressed = event.shiftKey;

        // Check for shift key in gesture events
        if (event.gesture && event.gesture.srcEvent) {
          isShiftPressed = event.gesture.srcEvent.shiftKey;
        }

        this.ToggleFieldedDataTooltip(objectId, isShiftPressed);
        console.log("O.Opt LM_ShapeIconClick - Output: true (Field data tooltip toggled)");
        return true;

      case ConstantData.ShapeIconType.ATTACHMENT:
        // Handle attachment icon (no action defined in original code)
        console.log("O.Opt LM_ShapeIconClick - Output: true (Attachment icon clicked)");
        return true;
    }

    console.log("O.Opt LM_ShapeIconClick - Output: false (Default return)");
    return false;
  }

  /**
     * Activates text editing for the specified drawing object
     * @param drawingElement - The SVG drawing element
     * @param event - The event that triggered activation (can be null)
     * @param preventSelectionChange - Flag to prevent selection change
     * @param textData - Optional data for collaborative text editing
     */
  ActivateTextEdit(drawingElement, event, preventSelectionChange, textData) {
    console.log('O.Opt ActivateTextEdit - Input:', {
      drawingElementId: drawingElement?.ID,
      hasEvent: !!event,
      preventSelectionChange,
      hasTextData: !!textData
    });

    let targetSelectionId;
    let textBlock;
    let textObject;
    let drawingObject;
    let selectedRange;

    const objectId = drawingElement.ID;
    const textEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);
    const objectsToSelect = [];
    const eventData = {};

    // Check if the object exists and is not locked
    drawingObject = this.GetObjectPtr(objectId, false);
    if (!drawingObject || !(drawingObject instanceof BaseDrawingObject) ||
      (drawingObject.flags & ConstantData.ObjFlags.SEDO_Lock)) {
      console.log('O.Opt ActivateTextEdit - Output: Object invalid or locked');
      return;
    }

    // Handle tables
    const table = drawingObject.GetTable(false);
    if (table && event) {
      const cellIndex = GlobalData.optManager.Table_GetCellClicked(drawingObject, event);
      if (cellIndex >= 0 && !GlobalData.optManager.Table_AllowCellTextEdit(table, cellIndex)) {
        console.log('O.Opt ActivateTextEdit - Output: Cell text editing not allowed');
        return;
      }
    } else if (table && this.Table_GetFirstTextCell(table) < 0) {
      console.log('O.Opt ActivateTextEdit - Output: No text cells available in table');
      return;
    }

    eventData.BlockID = objectId;

    // Handle case when no text data is provided
    if (!textData) {
      // If the object is already being edited, just return
      if (objectId == textEditSession.theActiveTextEditObjectID) {
        console.log('O.Opt ActivateTextEdit - Output: Object already being edited');
        return;
      }

      // Close any existing text edit
      if (textEditSession.theActiveTextEditObjectID != -1) {
        this.CloseEdit();
      }

      // Handle selection state
      const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, false);
      if (selectedList.indexOf(objectId) === -1 || selectedList.length > 1) {
        objectsToSelect.push(objectId);
        this.SelectObjects(objectsToSelect, false, true);
        targetSelectionId = selectedList[0];
      } else {
        targetSelectionId = objectId;
      }
    } else {
      eventData = textData.Data;
    }

    // // Begin collaborative editing session
    // Collab.BeginSecondaryEdit();

    // Get a preserved copy of the object
    const preservedObject = this.GetObjectPtr(objectId, true);
    const textObjectId = preservedObject.GetTextObject(event, false, eventData);

    if (textObjectId != null) {
      // Prepare the text edit session
      if (!textData) {
        preservedTextEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, true);
      } else if (textData.EditorID === Collab.EditorID) {
        const tempSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);
        tempSession.theActiveTextEditObjectID = -1;

        const activeTableId = tempSession.theActiveTableObjectID;
        tempSession.theTEWasResized = false;
        tempSession.theTEWasEdited = false;

        preservedTextEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, true);
        preservedTextEditSession.theActiveTextEditObjectID = objectId;
        preservedTextEditSession.theActiveTableObjectID = activeTableId;
      } else {
        const tempSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);
        tempSession.EditorID = textData.EditorID;

        preservedTextEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, true);
        preservedTextEditSession.EditorID = Collab.EditorID;
      }

      // Get the SVG element for the object
      const svgElement = this.svgObjectLayer.GetElementByID(objectId);

      // Create a new text object if needed
      if (textObjectId == -1) {
        const updatedObject = this.GetObjectPtr(objectId, true);

        // Create a new text object
        const newTextObject = new TextObject({});
        const newTextBlock = GlobalData.objectStore.CreateBlock(
          ConstantData.StoredObjectType.LM_TEXT_OBJECT,
          newTextObject
        );

        if (newTextBlock === null) {
          console.log('O.Opt ActivateTextEdit - Output: Failed to create text block');
          throw new Error('ActivateTextEdit got a null new text block allocation');
        }

        if (!updatedObject.SetTextObject(newTextBlock.ID)) {
          console.log('O.Opt ActivateTextEdit - Output: Failed to set text object');
          return;
        }

        updatedObject.LM_AddSVGTextObject(this.svgDoc, svgElement);
        textObject = newTextBlock.Data;
      } else {
        textObject = this.GetObjectPtr(textObjectId, true);
        if (!svgElement.textElem) {
          preservedObject.LM_AddSVGTextObject(this.svgDoc, svgElement);
        }
      }

      // Set up text editing session
      if (!textData) {
        preservedTextEditSession.theActiveTextEditObjectID = objectId;
        preservedTextEditSession.theTEWasResized = false;
        preservedTextEditSession.theTEWasEdited = false;
      }

      // Handle table selection
      if (table) {
        if (table.select >= 0) {
          eventData.TableSelect = table.cells[table.select].uniqueid;
        } else {
          eventData.TableSelect = -1;
        }
      }

      // Configure editing environment based on whether it's a table
      if (!textData) {
        if (table) {
          this.Table_Load(objectId);
        } else {
          this.Table_Release(false);

          // Move text element to front if not attached to something
          if ((drawingObject.TextFlags & ConstantData.TextFlags.SED_TF_AttachA) == 0 &&
            (drawingObject.TextFlags & ConstantData.TextFlags.SED_TF_AttachB) == 0) {
            GlobalData.optManager.svgObjectLayer.MoveElementToFront(svgElement);
          }
        }
      }

      // Register events and handle text selection
      if (!textData) {
        if (event && event.gesture) {
          this.TERegisterEvents(svgElement.textElem, event.gesture.srcEvent, preventSelectionChange);
        } else {
          this.TERegisterEvents(svgElement.textElem, event);
        }

        const activeEdit = this.svgDoc.GetActiveEdit();
        selectedRange = activeEdit.GetSelectedRange();
        eventData.theSelectedRange = Utils1.DeepCopy(selectedRange);

        // If no event, select all text
        if (event == null) {
          const textLength = activeEdit.GetText().length;
          eventData.theSelectedRange.start = 0;
          eventData.theSelectedRange.anchor = 0;
          eventData.theSelectedRange.end = textLength;
        }
      } else if (textData && textData.EditorID === Collab.EditorID) {
        selectedRange = textData.Data.theSelectedRange;
      }

      // Handle empty text
      const currentText = svgElement.textElem.GetText();
      if (currentText === '') {
        if (textObjectId < 0) {
          // Set up default text styles
          const textStyleParams = {};
          const defaultTextStyle = preservedObject.GetTextDefault(textStyleParams);
          eventData.TextStyle = Utils1.DeepCopy(defaultTextStyle);

          const initialTextStyle = this.CalcDefaultInitialTextStyle(defaultTextStyle);
          eventData.theDefaultStyle = Utils1.DeepCopy(initialTextStyle);

          const verticalAlignment = textStyleParams.vjust;
          eventData.vjust = verticalAlignment;

          // Apply styles to the text element
          const activeEdit = this.svgDoc.GetActiveEdit();
          eventData.theSelectedRange = selectedRange;

          // Initialize the text element with a space, apply styles, then clear it
          svgElement.textElem.SetText(' ');
          svgElement.textElem.SetFormat(initialTextStyle);
          svgElement.textElem.SetParagraphStyle(textStyleParams);

          if (preservedObject instanceof BaseShape) {
            svgElement.textElem.SetVerticalAlignment(verticalAlignment);
          }

          svgElement.textElem.SetText('');
          textObject.runtimeText = svgElement.textElem.GetRuntimeText();
        }

        // Clear the click-here flag
        preservedObject.TextFlags = Utils2.SetFlag(
          preservedObject.TextFlags,
          ConstantData.TextFlags.SED_TF_Clickhere,
          false
        );
      } else {
        // Replace standard placeholder text if needed
        if ((!textData && !Collab.IsSecondary()) ||
          (textData && textData.EditorID === Collab.EditorID)) {
          this.ReplaceStdText(preservedObject, currentText, svgElement.textElem);
        }
      }

      // Update selection range
      if (selectedRange) {
        textObject.selrange = selectedRange;
      }

      // Finalize UI setup
      if (!textData) {
        svgElement.SetCursor(ConstantData.CursorType.TEXT);

        if (targetSelectionId) {
          this.ShowSVGSelectionState(targetSelectionId, false);
        }

        this.RegisterLastTEOp(ConstantData.TELastOp.INIT);
      }

      // Preserve undo state and send collaboration message
      this.PreserveUndoState(false);

      // if (Collab.AllowMessage()) {
      //   Collab.BuildMessage(ConstantData.CollabMessages.Text_Init, eventData, false);
      // }

      // if ((event && event.type !== 'dragstart') || event == null) {
      //   Collab.UnBlockMessages();
      // }

      console.log('O.Opt ActivateTextEdit - Output: Text editing activated for object', objectId);
    } else {
      console.log('O.Opt ActivateTextEdit - Output: Failed to get text object');
    }
  }

  /**
 * Handles the movement of an object being stamped on the canvas
 * @param event - The mouse or touch event that triggered the movement
 */
  StampObjectMove(event) {
    console.log(`O.Opt StampObjectMove - Input:`, event);

    // Prevent default browser behavior
    Utils2.StopPropagationAndDefaults(event);

    let clientX = 0;
    let clientY = 0;

    // Extract client coordinates from either gesture or regular event
    if (!event.gesture) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      clientX = event.gesture.center.clientX;
      clientY = event.gesture.center.clientY;
    }

    // Convert window coordinates to document coordinates
    const documentCoordinates = this.svgDoc.ConvertWindowToDocCoords(clientX, clientY);
    console.log(`O.Opt StampObjectMove - Converted coordinates:`, documentCoordinates);

    // If no object has been created yet, create it when cursor is within document boundaries
    if (this.theActionStoredObjectID < 0) {
      // Check if cursor is within document boundaries
      if (clientX < GlobalData.optManager.svgDoc.docInfo.dispX ||
        clientY < GlobalData.optManager.svgDoc.docInfo.dispY) {
        console.log(`O.Opt StampObjectMove - Output: Cursor outside document boundaries`);
        return;
      }

      // // Begin collaborative edit session and create new shape
      // Collab.BeginSecondaryEdit();

      this.MouseAddNewShape(this.bUseDefaultStyle);
      this.NewObjectVisible = true;
      console.log(`O.Opt StampObjectMove - Created new shape with ID:`, this.theActionStoredObjectID);
    }

    // Handle auto-scrolling and movement
    if (this.AutoScrollCommon(event, true, 'HandleStampDragDoAutoScroll')) {
      this.StampObjectMoveCommon(documentCoordinates.x, documentCoordinates.y, event);
    }

    console.log(`O.Opt StampObjectMove - Output: Movement processed`);
  }

  /**
   * Sets up a new shape for drag and drop operation
   * @param drawingShape - The shape to be dragged and dropped
   * @param horizontalCenter - Whether to center the shape horizontally
   * @param verticalCenter - Whether to center the shape vertically
   * @param useDefaultStyle - Whether to use the default style for the shape
   * @param completionCallback - Callback function to execute after completion
   * @param callbackUserData - User data to pass to the completion callback
   */
  DragDropNewShape(drawingShape, horizontalCenter, verticalCenter, useDefaultStyle, completionCallback, callbackUserData) {
    console.log("O.Opt DragDropNewShape - Input:", {
      drawingShape: drawingShape ? drawingShape.BlockID : null,
      horizontalCenter,
      verticalCenter,
      useDefaultStyle,
      hasCallback: !!completionCallback
    });

    try {
      // Set modal operation mode
      this.SetModalOperation(ConstantData2.ModalOperations.DRAGDROP);
      this.GetObjectPtr(this.theTEDSessionBlockID, false);
      this.CloseEdit();

      // Store parameters for later use
      this.stampCompleteCallback = completionCallback || null;
      this.stampCompleteUserData = callbackUserData || null;
      this.stampHCenter = horizontalCenter;
      this.stampVCenter = verticalCenter;
      this.bUseDefaultStyle = useDefaultStyle;

      // Reset tracking variables
      this.theActionStoredObjectID = -1;
      this.theDragBBoxList = [];
      this.theDragElementList = [];
      this.NewObjectVisible = false;
      this.theDrawShape = drawingShape;

      // Set appropriate edit mode based on shape type
      if (drawingShape.flags & ConstantData.ObjFlags.SEDO_TextOnly) {
        this.SetEditMode(ConstantData.EditState.TEXT);
      } else {
        this.SetEditMode(ConstantData.EditState.STAMP);
      }

      // Set up drag end handler
      GlobalData.Evt_StampObjectDragEnd = DefaultEvt.Evt_StampObjectDragEndFactory(useDefaultStyle);

      // Initialize hammer.js for gesture handling
      if (!GlobalData.optManager.MainAppHammer) {
        GlobalData.optManager.PreDragDropOrStamp();
      }

      // Disable default work area hammer to prevent conflicts
      this.WorkAreaHammer.enable(false);

      // Register event handlers for shape dragging
      GlobalData.optManager.MainAppHammer.on('mousemove', DefaultEvt.Evt_StampObjectDrag);
      GlobalData.optManager.MainAppHammer.on('dragend', GlobalData.Evt_StampObjectDragEnd);

      // Initialize tracking and prepare for movement
      this.LM_StampPreTrack();
      this.InitializeAutoGrowDrag();

      console.log("O.Opt DragDropNewShape - Output: Drag and drop initialized");
    } catch (error) {
      console.log("O.Opt DragDropNewShape - Error:", error);
      GlobalData.optManager.CancelModalOperation();
      GlobalData.optManager.ExceptionCleanup(error);
      throw error;
    }
  }

  /**
     * Prepares a new shape for stamping onto the document
     * @param drawingShape - The shape to be stamped
     * @param centerHorizontally - Whether to center the shape horizontally
     * @param centerVertically - Whether to center the shape vertically
     * @param useDefaultStyle - Whether to use default styling
     * @param completionCallback - Callback function to execute after stamping
     * @param userData - User data to pass to the callback function
     */
  MouseStampNewShape(drawingShape, centerHorizontally, centerVertically, useDefaultStyle, completionCallback, userData) {
    console.log("O.Opt MouseStampNewShape - Input:", {
      drawingShape: drawingShape ? drawingShape.BlockID : null,
      centerHorizontally,
      centerVertically,
      useDefaultStyle,
      hasCallback: !!completionCallback,
      hasUserData: !!userData
    });

    // Set modal operation to STAMP mode
    this.SetModalOperation(ConstantData2.ModalOperations.STAMP);
    this.GetObjectPtr(this.theTEDSessionBlockID, false);

    // Close any active text editing
    this.DeactivateTextEdit(false);

    // Store parameters for later use
    this.stampCompleteCallback = completionCallback || null;
    this.stampCompleteUserData = userData || null;
    this.stampHCenter = centerHorizontally;
    this.stampVCenter = centerVertically;
    this.bUseDefaultStyle = useDefaultStyle;

    // Initialize tracking variables
    this.theActionStoredObjectID = -1;
    this.theDragBBoxList = [];
    this.theDragElementList = [];
    this.NewObjectVisible = false;
    this.theDrawShape = drawingShape;

    // Set appropriate edit mode based on shape type
    if (drawingShape.flags & ConstantData.ObjFlags.SEDO_TextOnly) {
      this.SetEditMode(ConstantData.EditState.TEXT);
    } else {
      this.SetEditMode(ConstantData.EditState.STAMP, ConstantData.CursorType.STAMP);
    }

    // Disable WorkAreaHammer to prevent conflicts with stamp operation
    this.WorkAreaHammer.enable(false);

    // Bind mouse event handlers for stamping operation
    $(window).bind('mousemove', DefaultEvt.Evt_MouseStampObjectMove);
    GlobalData.SDJS_LM_MouseStampObjectDone = DefaultEvt.Evt_MouseStampObjectDoneFactory(useDefaultStyle);
    $(window).bind('mousedown', GlobalData.SDJS_LM_MouseStampObjectDone);
    $(window).bind('click', GlobalData.SDJS_LM_MouseStampObjectDone);

    // Prepare for stamping
    this.LM_StampPreTrack();
    this.InitializeAutoGrowDrag();

    console.log("O.Opt MouseStampNewShape - Output: Stamp operation initialized");
  }

  /**
     * Handles the completion of a mouse stamp operation
     * @param event - The mouse event that triggered the completion
     * @param additionalData - Optional additional data for the operation
     */
  MouseStampObjectDone(event, additionalData) {
    console.log("O.Opt MouseStampObjectDone - Input:", { event, additionalData });

    try {
      // Get document information
      const docInfo = GlobalData.optManager.svgDoc.docInfo;
      let isOutsideWorkArea = false;
      const objectsToSelect = [];

      // Reset auto-scroll timer
      GlobalData.optManager.ResetAutoScrollTimer();

      // Check if cursor is outside document boundaries
      if (event.clientX >= docInfo.dispX + docInfo.dispWidth ||
        event.clientX < GlobalData.optManager.svgDoc.docInfo.dispX ||
        event.clientY < GlobalData.optManager.svgDoc.docInfo.dispY) {

        isOutsideWorkArea = true;
      }

      // If cursor is outside document, cancel the operation
      if (isOutsideWorkArea) {
        this.CancelObjectStamp(true);
        // Collab.UnLockMessages();
        // Collab.UnBlockMessages();
        console.log("O.Opt MouseStampObjectDone - Output: Canceled (outside work area)");
        return;
      }

      // If no object has been created yet, exit
      if (this.theActionStoredObjectID < 0) {
        console.log("O.Opt MouseStampObjectDone - Output: No object created yet");
        return;
      }

      // Clear any existing selection
      this.ClearAnySelection(true);

      // Prepare data for collaboration message
      const messageData = {
        FrameList: []
      };

      // Convert window coordinates to document coordinates
      const docCoordinates = this.svgDoc.ConvertWindowToDocCoords(event.clientX, event.clientY);
      const isTextOnlyObject = this.theDrawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly;

      // Apply snapping if enabled and appropriate
      if (!isTextOnlyObject) {
        const isConnectOperation = this.LinkParams && this.LinkParams.SConnectIndex >= 0;
        const isSnappingOverridden = this.OverrideSnaps(event);

        if (GlobalData.docHandler.documentConfig.enableSnap &&
          !isConnectOperation &&
          !isSnappingOverridden) {
          docCoordinates = GlobalData.docHandler.SnapToGrid(docCoordinates);
        }
      }

      // Calculate position, considering center alignment if enabled
      let positionX = docCoordinates.x;
      if (this.stampHCenter) {
        positionX -= this.theDrawShape.Frame.width / 2;
      }

      let positionY = docCoordinates.y;
      if (this.stampVCenter) {
        positionY -= this.theDrawShape.Frame.height / 2;
      }

      let replacedObjectId;
      let frameData;

      // Process move list if available
      if (this.theMoveList && this.theMoveList.length) {
        for (let i = 0; i < this.theMoveList.length; i++) {
          const objectId = this.theMoveList[i];
          const drawingObject = this.GetObjectPtr(objectId, true);

          if (drawingObject) {
            drawingObject.UpdateFrame(drawingObject.Frame);
            frameData = Utils1.DeepCopy(drawingObject.Frame);
            messageData.FrameList.push(frameData);
            // Collab.AddNewBlockToSecondary(objectId);
            drawingObject.dataStyleOverride = null;
          }
        }
      } else {
        // Handle direct object manipulation
        if (this.theDrawShape) {
          // Set size dimensions
          this.theDrawShape.sizedim.width = this.theDrawShape.Frame.width;
          this.theDrawShape.sizedim.height = this.theDrawShape.Frame.height;

          // Special handling for frame objects
          if (this.theDrawShape.objecttype === ConstantData.ObjectTypes.SD_OBJT_FRAME) {
            const zList = GlobalData.optManager.ZListPreserve();
            replacedObjectId = this.ReplaceSpecialObject(
              this.theDrawShape,
              this.theActionStoredObjectID,
              zList,
              this.theDrawShape.objecttype
            );
            messageData.ReplaceSpecialObjectID = replacedObjectId;
          }

          // Update frame and prepare for collaboration
          this.theDrawShape.UpdateFrame(this.theDrawShape.Frame);
          frameData = Utils1.DeepCopy(this.theDrawShape.Frame);
          messageData.FrameList.push(frameData);
          // Collab.AddNewBlockToSecondary(this.theDrawShape.BlockID);
        }

        // Get the updated object
        this.GetObjectPtr(this.theActionStoredObjectID, true);
      }

      // Include link parameters for collaboration
      messageData.LinkParams = Utils1.DeepCopy(this.LinkParams);

      // Create collaboration message
      const collabMessage = this.BuildCreateMessage(messageData, false);

      // Update link flags for closed polylines
      this.SetLinkFlagsOnFilledClosedPolylines();

      // Special handling for floor plans
      if (GlobalData.gBusinessManager instanceof FloorPlan) {
        GlobalData.gBusinessManager.EnsureCubicleBehindOutline(this.theActionStoredObjectID);
      }

      // Reset edit mode and clean up event handlers
      this.SetEditMode(ConstantData.EditState.DEFAULT);
      $(window).unbind('mousedown');
      $(window).unbind('click');
      $(window).unbind('mousemove', DefaultEvt.Evt_MouseStampObjectMove);
      this.WorkAreaHammer.enable(true);

      // Build selection list
      if (!isTextOnlyObject) {
        objectsToSelect.push(this.theActionStoredObjectID);
      }

      // Handle move list if present
      if (this.theMoveList && this.theMoveList.length) {
        objectsToSelect.length = 0;
        objectsToSelect.push(...this.theMoveList);
        this.theActionStoredObjectID = -1;
      } else {
        this.AddToDirtyList(this.theActionStoredObjectID);
      }

      // Delete replaced objects if needed
      if (replacedObjectId) {
        const objectsToDelete = [replacedObjectId];
        this.DeleteObjects(objectsToDelete, false);
      }

      // Update rendering
      if (!this.IsTopMostVisibleLayer()) {
        this.MarkAllAllVisibleHigherLayerObjectsDirty();
      }
      this.RenderDirtySVGObjects();

      // Clean up move list
      this.theMoveList = null;

      // Execute completion callback if provided
      if (this.stampCompleteCallback && this.theActionStoredObjectID >= 0) {
        this.stampCompleteCallback(this.theActionStoredObjectID, this.stampCompleteUserData);
      }

      // Reset stamp-related variables
      this.stampCompleteCallback = null;
      this.stampCompleteUserData = null;
      this.stampHCenter = false;
      this.stampVCenter = false;
      this.stampShapeOffsetX = 0;
      this.stampShapeOffsetY = 0;

      // Finish the operation
      this.LM_StampPostRelease(true);
      this.DynamicSnapsRemoveGuides(this.dynamicGuides);
      this.dynamicGuides = null;
      this.theDragBBoxList = [];
      this.theDragElementList = [];
      this.theActionStoredObjectID = -1;
      this.theActionSVGObject = null;
      this.SetModalOperation(ConstantData2.ModalOperations.NONE);

      // // Send collaboration message if available
      // if (collabMessage) {
      //   if (Collab.IsSecondary() && Collab.CreateList.length) {
      //     collabMessage.Data.CreateList = [];
      //     collabMessage.Data.CreateList = collabMessage.Data.CreateList.concat(Collab.CreateList);
      //   }
      //   Collab.SendMessage(collabMessage);
      // }

      // Complete the operation
      this.CompleteOperation(objectsToSelect);

      console.log("O.Opt MouseStampObjectDone - Output: Stamp operation completed successfully");
    } catch (error) {
      console.log("O.Opt MouseStampObjectDone - Error:", error);
      GlobalData.optManager.CancelModalOperation();
      GlobalData.optManager.DragDrop_ExceptionCleanup();
      GlobalData.optManager.ExceptionCleanup(error);
    }
  }

  /**
     * Sets link flags on filled closed polylines
     * @param objectId - Optional ID of the object to process
     */
  SetLinkFlagsOnFilledClosedPolylines(objectId) {
    console.log("O.Opt SetLinkFlagsOnFilledClosedPolylines - Input:", objectId);

    let object = null;
    let moveObject = null;

    // Handle the specific object if provided
    if (objectId) {
      object = GlobalData.optManager.GetObjectPtr(objectId, false);

      // Set flags if it's a closed polyline
      if (object &&
        object instanceof ListManager.PolyLine &&
        object.polylist &&
        object.polylist.closed) {

        GlobalData.optManager.SetLinkFlag(
          objectId,
          ConstantData.LinkFlags.SED_L_MOVE | ConstantData.LinkFlags.SED_L_CHANGE
        );
      }
    }

    // Process objects in the move list
    if (this.theMoveList && this.theMoveList.length) {
      for (let index = 0; index < this.theMoveList.length; index++) {
        moveObject = this.GetObjectPtr(this.theMoveList[index], true);

        // Check if the object has hooks
        if (moveObject && moveObject.hooks.length > 0) {
          // Process each hook
          for (let hookIndex = 0; hookIndex < moveObject.hooks.length; hookIndex++) {
            const hookedObject = this.GetObjectPtr(moveObject.hooks[hookIndex].objid, false);

            // Set flags if the hooked object is a filled closed polyline
            if (hookedObject &&
              hookedObject.StyleRecord &&
              hookedObject.StyleRecord.Line &&
              hookedObject.StyleRecord.Line.BThick &&
              hookedObject.polylist &&
              hookedObject.polylist.closed) {

              GlobalData.optManager.SetLinkFlag(
                moveObject.hooks[hookIndex].objid,
                ConstantData.LinkFlags.SED_L_MOVE | ConstantData.LinkFlags.SED_L_CHANGE
              );
            }
          }
        }
      }
    }

    console.log("O.Opt SetLinkFlagsOnFilledClosedPolylines - Output: Link flags updated");
  }

  /**
     * Cancels the current object stamp operation
     * @param shouldUnbindEvents - Whether to unbind event handlers
     */
  CancelObjectStamp(shouldUnbindEvents) {
    console.log("O.Opt CancelObjectStamp - Input:", { shouldUnbindEvents });

    // Clear modal operation state
    this.SetModalOperation(ConstantData2.ModalOperations.NONE);
    ConstantData.DocumentContext.SelectionToolSticky = false;
    this.LM_StampPostRelease(false);

    // Clean up stored object if one was created
    if (this.theActionStoredObjectID >= 0) {
      this.Undo(true);
      this.ClearFutureUndoStates();
      this.theActionStoredObjectID = -1;
      this.theDragBBoxList = [];
      this.theDragElementList = [];
      this.theActionSVGObject = null;
    }

    // Reset edit mode
    this.SetEditMode(ConstantData.EditState.DEFAULT);

    // Unbind event handlers if requested
    if (shouldUnbindEvents) {
      $(window).unbind('mousedown');
      $(window).unbind('click');
      $(window).unbind('mousemove', DefaultEvt.Evt_MouseStampObjectMove);
      GlobalData.optManager.WorkAreaHammer.enable(true);
    }

    // Reset all stamp-related properties
    this.theMoveList = null;
    this.stampCompleteCallback = null;
    this.stampCompleteUserData = null;
    this.stampShapeOffsetX = 0;
    this.stampShapeOffsetY = 0;
    this.stampHCenter = false;
    this.stampVCenter = false;
    this.stampSticky = false;

    console.log("O.Opt CancelObjectStamp - Output: Object stamp canceled");
  }

  /**
     * Cleans up resources when an exception occurs during drag and drop operations
     */
  DragDrop_ExceptionCleanup(): void {
    console.log('O.Opt DragDrop_ExceptionCleanup - Input: No parameters');

    // Reset empty lists
    GlobalData.optManager.EmptyEMFList = [];
    GlobalData.optManager.EmptySymbolList = [];

    // // Unlock collaboration messages
    // Collab.UnLockMessages();
    // Collab.UnBlockMessages();

    console.log('O.Opt DragDrop_ExceptionCleanup - Output: Cleanup completed');
  }

  /**
     * Cancels the current object drag and drop operation
     * @param shouldUnbindEvents - Whether to unbind event handlers
     */
  CancelObjectDragDrop(shouldUnbindEvents) {
    console.log("O.Opt CancelObjectDragDrop - Input:", { shouldUnbindEvents });

    // Clear modal operation state
    this.SetModalOperation(ConstantData2.ModalOperations.NONE);
    this.LM_StampPostRelease(false);

    // Clean up stored object if one was created
    if (this.theActionStoredObjectID >= 0) {
      const svgElement = this.svgObjectLayer.GetElementByID(this.theActionStoredObjectID);

      if (svgElement) {
        this.svgObjectLayer.RemoveElement(svgElement);
      }

      this.Undo(true);
      this.ClearFutureUndoStates();
      this.theActionStoredObjectID = -1;
      this.theDragBBoxList = [];
      this.theDragElementList = [];
      this.theActionSVGObject = null;

      // if (Collab.AllowMessage()) {
      //   Collab.CloseSecondaryEdit();
      // }
    }

    // Reset edit mode
    this.SetEditMode(ConstantData.EditState.DEFAULT);

    // Unbind events if requested
    if (shouldUnbindEvents) {
      GlobalData.optManager.UnbindDragDropOrStamp();
    }

    // Reset all stamp-related properties
    this.stampCompleteCallback = null;
    this.stampCompleteUserData = null;
    this.theMoveList = null;
    this.stampShapeOffsetX = 0;
    this.stampShapeOffsetY = 0;
    this.stampHCenter = false;
    this.stampVCenter = false;

    console.log("O.Opt CancelObjectDragDrop - Output: Drag and drop canceled");
  }

  /**
     * Prepares for stamping an object onto the document
     */
  LM_StampPreTrack() {
    console.log("O.Opt LM_StampPreTrack - Input: No parameters");

    // Get the session data (not directly used in this function)
    GlobalData.optManager.GetObjectPtr(this.theSEDSessionBlockID, false);

    // Initialize link parameters
    this.LinkParams = new LinkParameters();
    this.LinkParams.AutoInsert = this.AllowAutoInsert();

    // Check if the object should drop on border lines
    if (this.theDrawShape &&
      this.theDrawShape.flags &&
      this.theDrawShape.flags & ConstantData.ObjFlags.SEDO_DropOnBorder) {
      this.LinkParams.DropOnLine = true;
    }

    console.log("O.Opt LM_StampPreTrack - Output: Link parameters initialized", {
      autoInsert: this.LinkParams.AutoInsert,
      dropOnLine: this.LinkParams.DropOnLine || false
    });
  }

  /**
     * Handles completion of a drag-drop operation
     * @param event - The drag event
     * @param additionalData - Optional additional data for the operation
     */
  DragDropObjectDone(event, additionalData) {
    console.log("O.Opt DragDropObjectDone - Input:", { event, additionalData });

    // Re-enable work area event handling
    this.WorkAreaHammer.enable(true);

    try {
      let isTextOnlyObject = false;
      Utils2.StopPropagationAndDefaults(event);
      GlobalData.optManager.ResetAutoScrollTimer();

      let index, objectCount, currentObject, replacedObjectId;
      const docInfo = GlobalData.optManager.svgDoc.docInfo;
      let isOutsideWorkArea = false;
      const objectsToSelect = [];

      // Check if cursor is outside the document's visible area
      if (event.gesture.center.clientX >= docInfo.dispX + docInfo.dispWidth) {
        isOutsideWorkArea = true;
      }

      if (event.gesture.center.clientX < GlobalData.optManager.svgDoc.docInfo.dispX) {
        isOutsideWorkArea = true;
      }

      if (event.gesture.center.clientY < GlobalData.optManager.svgDoc.docInfo.dispY) {
        isOutsideWorkArea = true;
      }

      // If outside work area, cancel the operation
      if (isOutsideWorkArea) {
        this.CancelObjectDragDrop(true);
        // Collab.UnLockMessages();
        // Collab.UnBlockMessages();
        console.log("O.Opt DragDropObjectDone - Output: Canceled (outside work area)");
        return;
      }

      // Verify that link parameters are initialized
      if (this.LinkParams == null) {
        this.CancelObjectDragDrop(true);
        console.log("O.Opt DragDropObjectDone - Output: Canceled (no link parameters)");
        return;
      }

      // Get document coordinates from window coordinates
      const docCoordinates = this.svgDoc.ConvertWindowToDocCoords(
        event.gesture.center.clientX,
        event.gesture.center.clientY
      );

      // Check if the object is text-only
      if (this.theDrawShape) {
        isTextOnlyObject = !!(this.theDrawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly);
      }

      // Apply snapping if enabled and appropriate
      if (!isTextOnlyObject) {
        const isConnectOperation = this.LinkParams && this.LinkParams.SConnectIndex >= 0;
        const isSnappingOverridden = this.OverrideSnaps(event);

        if (GlobalData.docHandler.documentConfig.enableSnap && !isConnectOperation && !isSnappingOverridden) {
          docCoordinates = GlobalData.docHandler.SnapToGrid(docCoordinates);
        }
      }

      // Calculate position, considering center alignment if enabled
      let positionX = docCoordinates.x;
      if (this.stampHCenter) {
        positionX -= this.theDrawShape.Frame.width / 2;
      }

      let positionY = docCoordinates.y;
      if (this.stampVCenter) {
        positionY -= this.theDrawShape.Frame.height / 2;
      }

      let targetObjectId;
      let frameData;
      const messageData = {
        FrameList: []
      };

      // Process objects in the move list if available
      if (this.theMoveList && this.theMoveList.length) {
        targetObjectId = this.theMoveList[0];
        objectCount = this.theMoveList.length;

        for (index = 0; index < objectCount; index++) {
          // Collab.AddNewBlockToSecondary(this.theMoveList[index]);

          currentObject = this.GetObjectPtr(this.theMoveList[index], true);
          if (currentObject) {
            currentObject.UpdateFrame(currentObject.Frame);
            frameData = Utils1.DeepCopy(currentObject.Frame);
            messageData.FrameList.push(frameData);
          }

          // Get a fresh copy of the object
          currentObject = this.GetObjectPtr(this.theMoveList[index], true);
        }
      } else {
        // Handle a single object
        if (this.theDrawShape) {
          targetObjectId = this.theDrawShape.BlockID;

          // Update size dimensions
          this.theDrawShape.sizedim.width = this.theDrawShape.Frame.width;
          this.theDrawShape.sizedim.height = this.theDrawShape.Frame.height;

          // Special handling for frame objects
          if (this.theDrawShape.objecttype === ConstantData.ObjectTypes.SD_OBJT_FRAME) {
            const zList = GlobalData.optManager.ZListPreserve();
            replacedObjectId = this.ReplaceSpecialObject(
              this.theDrawShape,
              this.theActionStoredObjectID,
              zList,
              this.theDrawShape.objecttype
            );
            messageData.ReplaceSpecialObjectID = replacedObjectId;
          }

          // Update frame and store for collaboration
          this.theDrawShape.UpdateFrame(this.theDrawShape.Frame);
          frameData = Utils1.DeepCopy(this.theDrawShape.Frame);
          messageData.FrameList.push(frameData);

          // Include rotation angle for auto-insert objects
          if (this.LinkParams.AutoInsert) {
            messageData.RotationAngle = this.theDrawShape.RotationAngle;
          }

          // Collab.AddNewBlockToSecondary(this.theDrawShape.BlockID);
        }

        // Get latest version of the action object
        this.GetObjectPtr(this.theActionStoredObjectID, true);
      }

      // Prepare collaboration message data
      messageData.LinkParams = Utils1.DeepCopy(this.LinkParams);
      messageData.AllowMany = true;
      messageData.CustomSymbol = false;

      // Handle symbol data if present
      if (this.theDrawShape && this.theDrawShape.SymbolID != null) {
        const symbolObject = SDUI.Commands.MainController.Symbols.GetLMObject(this.theDrawShape.SymbolID);

        if (symbolObject &&
          symbolObject.SymbolData &&
          symbolObject.SymbolData.IsCustomContent &&
          symbolObject.nativeDataArrayBuffer) {
          messageData.nativeDataString = Collab.BufferToString(symbolObject.nativeDataArrayBuffer);
          messageData.SymbolData = Utils1.DeepCopy(symbolObject.SymbolData);
        }
      }

      // Build collaboration message
      const collabMessage = this.BuildCreateMessage(messageData, false);

      // Reset edit mode and prepare selection
      this.SetEditMode(ConstantData.EditState.DEFAULT);
      GlobalData.optManager.UnbindDragDropOrStamp();

      if (!isTextOnlyObject) {
        objectsToSelect.push(this.theActionStoredObjectID);
      }

      // Get business manager for the target object
      let businessManager = Business.GetSelectionBusinessManager(targetObjectId);
      if (businessManager == null) {
        businessManager = GlobalData.gBusinessManager;
      }

      // Handle floor plan special case
      if (businessManager instanceof FloorPlan) {
        businessManager.EnsureCubicleBehindOutline(this.theActionStoredObjectID);
      }

      // Update selection list based on move list or single object
      if (this.theMoveList && this.theMoveList.length) {
        objectsToSelect = this.theMoveList.slice(0);
        this.theActionStoredObjectID = -1;
      } else {
        this.AddToDirtyList(this.theActionStoredObjectID);
      }

      // Delete replaced object if needed
      if (replacedObjectId) {
        const objectsToDelete = [replacedObjectId];
        this.DeleteObjects(objectsToDelete, false);
      }

      // Update rendering
      if (!this.IsTopMostVisibleLayer()) {
        this.MarkAllAllVisibleHigherLayerObjectsDirty();
      }
      this.RenderDirtySVGObjects();

      // Update link flags for filled polylines
      this.SetLinkFlagsOnFilledClosedPolylines();

      // Reset move list
      this.theMoveList = null;

      // Execute completion callback if provided
      if (this.stampCompleteCallback && this.theActionStoredObjectID >= 0) {
        this.stampCompleteCallback(this.theActionStoredObjectID, this.stampCompleteUserData);
      }

      // Reset stamp-related properties
      this.stampCompleteCallback = null;
      this.stampCompleteUserData = null;
      this.stampHCenter = false;
      this.stampVCenter = false;
      this.stampShapeOffsetX = 0;
      this.stampShapeOffsetY = 0;

      // Finish the stamp operation
      this.LM_StampPostRelease(true);

      // // Send collaboration message if available
      // if (collabMessage) {
      //   if (Collab.IsSecondary() && Collab.CreateList.length) {
      //     collabMessage.Data.CreateList = [];
      //     collabMessage.Data.CreateList = collabMessage.Data.CreateList.concat(Collab.CreateList);
      //   }
      //   Collab.SendMessage(collabMessage);
      // }

      // Clean up dynamic guides
      this.DynamicSnapsRemoveGuides(this.dynamicGuides);
      this.dynamicGuides = null;

      // Reset drag state
      this.theActionStoredObjectID = -1;
      this.theDragBBoxList = [];
      this.theDragElementList = [];
      this.theActionSVGObject = null;

      // Reset modal operation
      this.SetModalOperation(ConstantData2.ModalOperations.NONE);

      // Complete the operation
      this.CompleteOperation(objectsToSelect);

      console.log("O.Opt DragDropObjectDone - Output: Drag-drop operation completed successfully");
    } catch (error) {
      console.log("O.Opt DragDropObjectDone - Error:", error);
      GlobalData.optManager.CancelModalOperation();
      GlobalData.optManager.DragDrop_ExceptionCleanup();
      GlobalData.optManager.ExceptionCleanup(error);
      throw error;
    }
  }


  /**
   * Adds a new shape to the document and sets up related states
   * @param useDefaultStyle - Whether to use default style for the shape
   */
  MouseAddNewShape(useDefaultStyle) {
    console.log(`O.Opt MouseAddNewShape - Input:`, { useDefaultStyle });

    let newObjectID;
    let hasNativeData = this.theDrawShape.nativeDataArrayBuffer !== null;
    let offset = 0;
    let isPolyLineContainer = false;

    // Add the new object
    if ((newObjectID = this.AddNewObject(this.theDrawShape, useDefaultStyle, false)) >= 0) {
      this.theActionStoredObjectID = newObjectID;
      let visibleZList = GlobalData.optManager.VisibleZList();
      this.theDragBBoxList = [];
      this.theDragElementList = [];

      // Process objects in the move list if available
      if (this.theMoveList && this.theMoveList.length) {
        for (let i = 0; i < this.theMoveList.length; i++) {
          let moveObjectID = this.theMoveList[i];
          let moveObject = this.GetObjectPtr(moveObjectID, false);

          if (moveObject) {
            let svgFrame = moveObject.GetSVGFrame();

            // Handle polylines with thick borders
            if (moveObject instanceof PolyLine &&
              moveObject.polylist &&
              moveObject.polylist.closed) {
              if (moveObject.StyleRecord &&
                moveObject.StyleRecord.Line &&
                moveObject.StyleRecord.Line.BThick) {
                if (svgFrame.x < 0 && svgFrame.y < 0) {
                  offset = -2 * moveObject.StyleRecord.Line.BThick;
                  isPolyLineContainer = moveObject instanceof PolyLineContainer;
                }
              }
            }

            // Apply offset
            svgFrame.y += offset;
            svgFrame.x += offset;
            if (!isPolyLineContainer) offset = 0;

            // Add to drag tracking lists
            this.theDragBBoxList.push(svgFrame);
            let index = visibleZList.indexOf(moveObjectID);
            this.AddSVGObject(index, moveObjectID, true, false);
            this.theDragElementList.push(moveObjectID);

            // Set up snap target if enabled
            if (GlobalData.docHandler.documentConfig.enableSnap &&
              moveObjectID === this.theActionStoredObjectID) {
              this.theDragTargetBBox = $.extend(true, {}, svgFrame);
            }

            // Calculate enclosing rectangle
            this.theDragEnclosingRect = GlobalData.optManager.GetListSRect(
              this.theMoveList,
              false,
              true
            );
          }
        }
      }
      // Handle objects with native data
      else if (hasNativeData) {
        let newObject = this.GetObjectPtr(newObjectID, false);
        let sessionBlock = GlobalData.optManager.GetObjectPtr(this.theSEDSessionBlockID, false);
        let hasImageURL = newObject.ImageURL && newObject.ImageURL.length > 0;

        // Apply curvature if applicable
        if (newObject &&
          newObject.SymbolID !== ConstantData.Defines.Floorplan_WallOpeningID &&
          !hasImageURL) {
          newObject.ApplyCurvature(sessionBlock.def.rrectparam);
        }

        // Add to SVG layer
        let index = visibleZList.indexOf(this.theActionStoredObjectID);
        this.AddSVGObject(index, newObjectID, true, false);
      }

      // Store the SVG object and update UI state
      this.theActionSVGObject = this.svgObjectLayer.GetElementByID(this.theActionStoredObjectID);

      if (this.LinkParams) {
        this.LinkParams.lpCircList.push(this.theActionStoredObjectID);
      }

      GlobalData.optManager.ShowFrame(true);
      GlobalData.optManager.ShowXY(true);
    }

    console.log(`O.Opt MouseAddNewShape - Output: New object created with ID:`, newObjectID);
  }

  /**
   * Handles auto-scrolling during stamp drag operations
   */
  HandleStampDragDoAutoScroll() {
    console.log("O.Opt HandleStampDragDoAutoScroll - Input: Starting auto-scroll");

    // Schedule next auto-scroll
    GlobalData.optManager.autoScrollTimerID = this.autoScrollTimer.setTimeout(
      'HandleStampDragDoAutoScroll',
      100
    );

    // Convert window coordinates to document coordinates
    const documentCoords = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(
      GlobalData.optManager.autoScrollXPos,
      GlobalData.optManager.autoScrollYPos
    );

    // Scroll to the position and update the stamp object
    GlobalData.docHandler.ScrollToPosition(documentCoords.x, documentCoords.y);
    GlobalData.optManager.StampObjectMoveCommon(documentCoords.x, documentCoords.y);

    console.log("O.Opt HandleStampDragDoAutoScroll - Output: Position updated", documentCoords);
  }

  /**
   * Handles mouse movement during stamp operations
   * @param event - The mouse event
   */
  MouseStampObjectMove(event) {
    console.log("O.Opt MouseStampObjectMove - Input:", event);

    // Convert window coordinates to document coordinates
    const documentCoords = this.svgDoc.ConvertWindowToDocCoords(event.clientX, event.clientY);

    // If no object has been created yet, create it when cursor is within document boundaries
    if (this.theActionStoredObjectID < 0) {
      if (
        !(
          event.clientX >= GlobalData.optManager.svgDoc.docInfo.dispX &&
          event.clientY >= GlobalData.optManager.svgDoc.docInfo.dispY
        )
      ) {
        console.log("O.Opt MouseStampObjectMove - Output: Cursor outside document boundaries");
        return;
      }

      // Begin collaborative edit session and create new shape
      // Collab.BeginSecondaryEdit();

      this.MouseAddNewShape(this.bUseDefaultStyle);
      this.NewObjectVisible = true;
      console.log("O.Opt MouseStampObjectMove - Created new shape with ID:", this.theActionStoredObjectID);
    }

    // Handle auto-scrolling and movement
    if (this.AutoScrollCommon(event, true, 'HandleStampDragDoAutoScroll')) {
      this.StampObjectMoveCommon(documentCoords.x, documentCoords.y, event);
    }

    console.log("O.Opt MouseStampObjectMove - Output: Movement processed");
  }


  /**
   * Handles common logic for moving an object during stamping operations
   * @param mouseX - X coordinate of the mouse position
   * @param mouseY - Y coordinate of the mouse position
   * @param event - The event that triggered the movement
   */
  StampObjectMoveCommon(mouseX, mouseY, event) {
    console.log("O.Opt StampObjectMoveCommon - Input:", { mouseX, mouseY, event });

    let drawingObject, objectIndex, objectCount, objectId, xOffset, yOffset;
    let dragElement, visibleList, listIndex, svgElement;
    let deltaX = 0;
    let deltaY = 0;
    let objectFrame = {};
    let currentPosition = { x: mouseX, y: mouseY };
    let dragEnclosingRect = null;
    let objectRect;

    // Convert document coordinates to window coordinates
    const windowCoords = this.svgDoc.ConvertDocToWindowCoords(mouseX, mouseY);
    if (!windowCoords) {
      console.log("O.Opt StampObjectMoveCommon - Output: No valid window coordinates");
      return;
    }

    // Handle visibility based on object position
    if (this.theActionStoredObjectID > 0) {
      const isOutsideViewport =
        windowCoords.x < GlobalData.optManager.svgDoc.docInfo.dispX ||
        windowCoords.y < GlobalData.optManager.svgDoc.docInfo.dispY;

      if (isOutsideViewport) {
        if (this.NewObjectVisible) {
          // Hide objects when moved outside viewport
          if (this.theMoveList && this.theMoveList.length) {
            for (let i = 0; i < this.theMoveList.length; ++i) {
              objectId = this.theMoveList[i];
              dragElement = GlobalData.optManager.GetSVGDragElement(i);
              if (dragElement) {
                dragElement.SetVisible(false);
              }
            }
          } else if (this.theActionSVGObject) {
            this.theActionSVGObject.SetVisible(false);
          }

          this.NewObjectVisible = false;
          GlobalData.optManager.ShowFrame(false);
          GlobalData.optManager.ShowXY(false);
        }
        console.log("O.Opt StampObjectMoveCommon - Output: Object outside viewport, hidden");
        return;
      }

      // Show objects when they're within viewport
      if (!this.NewObjectVisible) {
        if (this.theMoveList && this.theMoveList.length) {
          for (let i = 0; i < this.theMoveList.length; ++i) {
            objectId = this.theMoveList[i];
            dragElement = GlobalData.optManager.GetSVGDragElement(i);
            if (dragElement) {
              dragElement.SetVisible(true);
            }
          }
        } else if (this.theActionSVGObject) {
          this.theActionSVGObject.SetVisible(true);
        }

        this.NewObjectVisible = true;
        GlobalData.optManager.ShowFrame(true);
        GlobalData.optManager.ShowXY(true);
      }
    }

    // Get the drawing object
    drawingObject = this.GetObjectPtr(this.theActionStoredObjectID, false);
    if (!drawingObject) {
      console.log("O.Opt StampObjectMoveCommon - Output: No valid drawing object");
      return;
    }

    // Check if this is a text-only object
    const isTextOnlyObject = this.theDrawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly;

    // Determine if we should apply snapping
    const isConnectOperation = this.LinkParams && this.LinkParams.SConnectIndex >= 0;
    const isSnapDisabled = this.OverrideSnaps(event) || isConnectOperation;

    const snapOffset = { x: null, y: null };

    // Handle snap-to-shapes if enabled
    if (!this.theMoveList && !isTextOnlyObject && this.AllowSnapToShapes()) {
      const snapOptions = {};
      const snapTargetId = drawingObject.CanSnapToShapes(snapOptions);

      if (snapTargetId >= 0) {
        const dynamicGuides = new DynamicGuides();
        const targetRect = this.GetObjectPtr(snapTargetId, false).GetSnapRect();

        // Create a copy of the target rectangle centered at the current position
        const positionedRect = $.extend(true, {}, targetRect);
        positionedRect.x = currentPosition.x - targetRect.width / 2;
        positionedRect.y = currentPosition.y - targetRect.height / 2;

        // Get snap points
        const snapResult = this.DynamicSnaps_GetSnapObjects(
          snapTargetId,
          positionedRect,
          dynamicGuides,
          this.theMoveList,
          null,
          snapOptions
        );

        // Apply snapping if found
        if (snapResult.x !== null) {
          positionedRect.x += snapResult.x;
          currentPosition.x += snapResult.x;
        }

        if (snapResult.y !== null) {
          positionedRect.y += snapResult.y;
          currentPosition.y += snapResult.y;
        }
      }
    }

    // Handle grid snapping if enabled
    if (GlobalData.docHandler.documentConfig.enableSnap && !isSnapDisabled && !isTextOnlyObject) {
      let objectRect, targetRect;

      // Get appropriate rectangles based on whether we're moving multiple objects
      if (this.theMoveList && this.theMoveList.length) {
        objectIndex = this.theMoveList.indexOf(this.theActionStoredObjectID);
        targetRect = Utils1.DeepCopy(GlobalData.optManager.theDragBBoxList[objectIndex]);
        objectRect = drawingObject.GetSnapRect();
      } else {
        targetRect = Utils1.DeepCopy(this.theActionBBox);
        objectRect = drawingObject.GetSnapRect();
      }

      // Get the enclosing rectangle
      dragEnclosingRect = this.theDragEnclosingRect
        ? Utils1.DeepCopy(this.theDragEnclosingRect)
        : objectRect;

      if (dragEnclosingRect && targetRect) {
        // Calculate offsets
        xOffset = dragEnclosingRect.x - targetRect.x;
        yOffset = dragEnclosingRect.y - targetRect.y;

        // Update position
        dragEnclosingRect.x = currentPosition.x - dragEnclosingRect.width / 2;
        dragEnclosingRect.y = currentPosition.y - dragEnclosingRect.height / 2;

        const objectPosition = {
          x: dragEnclosingRect.x - xOffset,
          y: dragEnclosingRect.y - yOffset
        };

        // Create a rectangle for snapping
        const snapRect = $.extend(true, {}, objectRect);
        snapRect.x = currentPosition.x - objectRect.width / 2;
        snapRect.y = currentPosition.y - objectRect.height / 2;

        // Apply custom snap if available
        if (drawingObject.CustomSnap(objectPosition.x, objectPosition.y, 0, 0, false, currentPosition)) {
          // Custom snap handled by the object
        }
        // Apply center snap if enabled
        else if (GlobalData.docHandler.documentConfig.centerSnap) {
          const snapResult = GlobalData.docHandler.SnapToGrid(currentPosition);
          if (snapOffset.x === null) {
            currentPosition.x = snapResult.x;
          }
          if (snapOffset.y === null) {
            currentPosition.y = snapResult.y;
          }
        }
        // Apply standard grid snapping
        else {
          const snapResult = GlobalData.docHandler.SnapRect(snapRect);
          if (snapOffset.x === null) {
            currentPosition.x += snapResult.x;
          }
          if (snapOffset.y === null) {
            currentPosition.y += snapResult.y;
          }
        }
      }
    }

    // Handle moving multiple objects
    if (this.theMoveList && this.theMoveList.length) {
      objectCount = this.theMoveList.length;
      objectIndex = this.theMoveList.indexOf(this.theActionStoredObjectID);
      objectRect = this.theDragEnclosingRect;

      // Calculate center point and apply auto-growth
      let centerPoint = {
        x: currentPosition.x + objectRect.width / 2,
        y: currentPosition.y + objectRect.height / 2
      };

      centerPoint = GlobalData.optManager.DoAutoGrowDrag(centerPoint);

      // Update position based on center point
      currentPosition.x = centerPoint.x - objectRect.width / 2;
      currentPosition.y = centerPoint.y - objectRect.height / 2;

      // Calculate offsets
      xOffset = currentPosition.x - objectRect.x - objectRect.width / 2;
      yOffset = currentPosition.y - objectRect.y - objectRect.height / 2;

      // Ensure we don't position objects outside the document
      if (objectRect.x + xOffset < 0) {
        xOffset = -objectRect.x;
      }
      if (objectRect.y + yOffset < 0) {
        yOffset = -objectRect.y;
      }

      // Get the target rectangle
      objectRect = GlobalData.optManager.theDragBBoxList[objectIndex];

      // Update the shape origin
      drawingObject.SetShapeOrigin(objectRect.x + xOffset, objectRect.y + yOffset);

      // Apply any additional tracking logic
      currentPosition = this.LM_StampDuringTrack(currentPosition, drawingObject);

      // Update display coordinates
      const dimensionsData = drawingObject.GetDimensionsForDisplay();
      GlobalData.optManager.UpdateDisplayCoordinates(
        dimensionsData,
        currentPosition,
        ConstantData.CursorTypes.Plus,
        drawingObject
      );

      // Update selection attributes
      const selectionAttrs = new SelectionAttributes();
      selectionAttrs.left = dimensionsData.x;
      selectionAttrs.top = dimensionsData.y;

      const showFeetAsInches = drawingObject.Dimensions &
        ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches;

      selectionAttrs.widthstr = ConstantData.DocumentContext.CurrentWidth;
      selectionAttrs.heightstr = ConstantData.DocumentContext.CurrentHeight;
      selectionAttrs.leftstr = this.GetLengthInRulerUnits(
        selectionAttrs.left,
        false,
        GlobalData.docHandler.rulerSettings.originx,
        showFeetAsInches
      );
      selectionAttrs.topstr = this.GetLengthInRulerUnits(
        selectionAttrs.top,
        false,
        GlobalData.docHandler.rulerSettings.originy,
        showFeetAsInches
      );

      // Update all objects in the move list
      for (let i = 0; i < objectCount; ++i) {
        objectId = this.theMoveList[i];
        const object = this.GetObjectPtr(objectId);

        if (object) {
          if (objectId !== this.theActionStoredObjectID) {
            objectRect = GlobalData.optManager.theDragBBoxList[i];
            if (!objectRect) continue;

            object.SetShapeOrigin(objectRect.x + xOffset, objectRect.y + yOffset);
          }

          dragElement = GlobalData.optManager.GetSVGDragElement(i);

          // Handle SVG fragment symbols
          if (!dragElement &&
            object.ShapeType === ConstantData.ShapeType.SVGFRAGMENTSYMBOL &&
            object.SVGFragment) {

            if (!visibleList) {
              visibleList = GlobalData.optManager.VisibleZList();
            }

            listIndex = visibleList.indexOf(objectId);
            this.AddSVGObject(listIndex, objectId, true, false);
            dragElement = GlobalData.optManager.svgObjectLayer.GetElementByID(objectId);
          }

          if (dragElement) {
            dragElement.SetPos(objectRect.x + xOffset, objectRect.y + yOffset);
          }
        }
      }
    }
    // Handle single object
    else {
      // Get object rectangles
      objectRect = Utils1.DeepCopy(this.theActionBBox);
      dragEnclosingRect = Utils1.DeepCopy(this.theDragEnclosingRect);

      // Calculate center point and apply auto-growth
      let centerPoint = {
        x: currentPosition.x + dragEnclosingRect.width / 2,
        y: currentPosition.y + dragEnclosingRect.height / 2
      };

      centerPoint = GlobalData.optManager.DoAutoGrowDrag(centerPoint);

      // Update position based on center point
      currentPosition.x = centerPoint.x - dragEnclosingRect.width / 2;
      currentPosition.y = centerPoint.y - dragEnclosingRect.height / 2;

      // Calculate offsets
      xOffset = currentPosition.x - dragEnclosingRect.x - dragEnclosingRect.width / 2;
      yOffset = currentPosition.y - dragEnclosingRect.y - dragEnclosingRect.height / 2;

      // Ensure we don't position objects outside the document
      if (objectRect.x + xOffset < 0) {
        xOffset = -dragEnclosingRect.x;
      } else {
        xOffset = currentPosition.x - objectRect.x - objectRect.width / 2;
      }

      if (objectRect.y + yOffset < 0) {
        yOffset = -dragEnclosingRect.y;
      } else {
        yOffset = currentPosition.y - objectRect.y - objectRect.height / 2;
      }

      // Update the shape origin
      drawingObject.SetShapeOrigin(objectRect.x + xOffset, objectRect.y + yOffset);

      // Apply any additional tracking logic
      currentPosition = this.LM_StampDuringTrack(currentPosition, drawingObject);

      // Update display coordinates
      const dimensionsData = drawingObject.GetDimensionsForDisplay();
      GlobalData.optManager.UpdateDisplayCoordinates(
        dimensionsData,
        currentPosition,
        ConstantData.CursorTypes.Move,
        drawingObject
      );

      // Update selection attributes
      const selectionAttrs = new SelectionAttributes();
      selectionAttrs.left = dimensionsData.x;
      selectionAttrs.top = dimensionsData.y;

      const showFeetAsInches = drawingObject.Dimensions &
        ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches;

      selectionAttrs.widthstr = ConstantData.DocumentContext.CurrentWidth;
      selectionAttrs.heightstr = ConstantData.DocumentContext.CurrentHeight;
      selectionAttrs.leftstr = this.GetLengthInRulerUnits(
        selectionAttrs.left,
        false,
        GlobalData.docHandler.rulerSettings.originx,
        showFeetAsInches
      );
      selectionAttrs.topstr = this.GetLengthInRulerUnits(
        selectionAttrs.top,
        false,
        GlobalData.docHandler.rulerSettings.originy,
        showFeetAsInches
      );

      // Update offsets for final positioning
      xOffset = currentPosition.x - dragEnclosingRect.x - dragEnclosingRect.width / 2;
      yOffset = currentPosition.y - dragEnclosingRect.y - dragEnclosingRect.height / 2;

      // Ensure we don't position objects outside the document
      if (dragEnclosingRect.x + xOffset - deltaX < 0) {
        xOffset = -dragEnclosingRect.x + deltaX;
        deltaX = 0;
      } else {
        xOffset = currentPosition.x - objectRect.x - objectRect.width / 2;
      }

      if (dragEnclosingRect.y + yOffset - deltaY < 0) {
        yOffset = -dragEnclosingRect.y + deltaY;
        deltaY = 0;
      } else {
        yOffset = currentPosition.y - objectRect.y - objectRect.height / 2;
      }

      // Update the shape origin again with final values
      drawingObject.SetShapeOrigin(objectRect.x + xOffset, objectRect.y + yOffset);

      // Handle connections
      if (this.LinkParams &&
        (this.LinkParams.ConnectIndex >= 0 || this.LinkParams.ConnectIndexHistory.length > 0)) {

        objectFrame = Utils1.DeepCopy(objectRect);
        objectFrame.x += xOffset;
        objectFrame.y += yOffset;

        this.HandleHookedObjectMoving(drawingObject, objectFrame);
      }

      // Update SVG element position
      this.theActionSVGObject.SetPos(objectRect.x + xOffset - deltaX, objectRect.y + yOffset - deltaY);

      // Update dynamic guides if needed
      const isConnecting = this.LinkParams && this.LinkParams.SConnectIndex >= 0;
      const dynamicGuides = new DynamicGuides();

      if (dynamicGuides) {
        if (isConnecting) {
          if (this.dynamicGuides) {
            this.DynamicSnapsRemoveGuides(this.dynamicGuides);
            this.dynamicGuides = null;
          }
        } else {
          // The next line is from the original code but the variable snapTargetId and
          // positionedRect aren't defined in this scope, so we won't update guides here
          // this.DynamicSnaps_UpdateGuides(dynamicGuides, snapTargetId, positionedRect);
        }
      }
    }

    console.log("O.Opt StampObjectMoveCommon - Output: Object positioned at", currentPosition);
  }


  /**
   * Sets and calculates the bounding rectangle for a shape
   * @param shapeObject - The shape object to calculate bounding rectangle for
   * @returns 0 on successful completion
   */
  SetShapeR(shapeObject) {
    console.log("O.Opt SetShapeR - Input:", { shapeObjectId: shapeObject.BlockID });

    let effectSettings;
    let outlineThickness;

    // Calculate outline thickness based on style record
    if (shapeObject.StyleRecord) {
      if (shapeObject.StyleRecord.Line.BThick && shapeObject.polylist == null) {
        outlineThickness = shapeObject.StyleRecord.Line.Thickness;
      } else {
        outlineThickness = shapeObject.StyleRecord.Line.Thickness / 2;
      }

      // Get effect settings for the shape
      effectSettings = shapeObject.CalcEffectSettings(
        shapeObject.Frame,
        shapeObject.StyleRecord,
        false
      );
    }

    // Inflate rectangle by outline thickness
    Utils2.InflateRect(shapeObject.r, outlineThickness, outlineThickness);

    // Add effects extent if present
    if (effectSettings) {
      Utils2.Add2Rect(shapeObject.r, effectSettings.extent);
    }

    // Handle attached text dimensions
    if (
      shapeObject.DataID >= 0 && (
        shapeObject.TextFlags & ConstantData.TextFlags.SED_TF_AttachB ||
        shapeObject.TextFlags & ConstantData.TextFlags.SED_TF_AttachA
      )
    ) {
      // Function to get text dimensions from SVG
      const getTextDimensions = (objectId) => {
        if (objectId == null) return null;

        let svgElement = GlobalData.optManager.svgObjectLayer.GetElementByID(objectId);

        // Create text element if it doesn't exist
        if (svgElement == null) {
          svgElement = GlobalData.optManager.svgDoc.CreateShape(
            ConstantData.CreateShapeType.SHAPECONTAINER
          );
          svgElement.SetID(shapeObject.BlockID);
          GlobalData.optManager.svgObjectLayer.AddElement(svgElement, 0);
          shapeObject.LM_AddSVGTextObject(GlobalData.optManager.svgDoc, svgElement);
        }

        if (svgElement) {
          const textElement = svgElement.GetElementByID(ConstantData.SVGElementClass.TEXT);
          if (textElement) {
            const position = textElement.GetPos();
            const dimensions = textElement.GetTextMinDimensions();
            return {
              x: position.x,
              y: position.y,
              width: dimensions.width,
              height: dimensions.height
            };
          }
        }
        return null;
      };

      // Get text dimensions and include in bounding rectangle
      const textDimensions = getTextDimensions(shapeObject.BlockID);
      if (textDimensions) {
        textDimensions.x += shapeObject.Frame.x;
        textDimensions.y += shapeObject.Frame.y;
        Utils2.UnionRect(shapeObject.r, textDimensions, shapeObject.r);
      }
    }

    // Add dimensions from shape object
    shapeObject.AddDimensionsToR();

    // Handle rotation if needed
    if (shapeObject.RotationAngle !== 0) {
      let points;
      let rotationAngleRadians;
      const originalFrame = {};
      const centerPoint = {};

      // Calculate center point of the shape
      centerPoint.x = shapeObject.Frame.x + shapeObject.Frame.width / 2;
      centerPoint.y = shapeObject.Frame.y + shapeObject.Frame.height / 2;

      // Store original frame
      Utils2.CopyRect(originalFrame, shapeObject.Frame);

      // Set frame to current bounding rect
      Utils2.CopyRect(shapeObject.Frame, shapeObject.r);

      // Get polygon points for rotation calculation
      console.log("O.Opt SetShapeR - Getting poly points for rotation");
      points = new BaseDrawingObject(shapeObject).GetPolyPoints(
        ConstantData.Defines.NPOLYPTS,
        false,
        false,
        false,
        null
      );

      // Calculate rotation angle in radians (negative because rotation is clockwise)
      rotationAngleRadians = -shapeObject.RotationAngle / (180 / ConstantData.Geometry.PI);

      // Rotate points around center
      Utils3.RotatePointsAboutPoint(centerPoint, rotationAngleRadians, points);

      // Get bounding rectangle of rotated points
      Utils2.GetPolyRect(shapeObject.r, points);

      // Restore original frame
      Utils2.CopyRect(shapeObject.Frame, originalFrame);
    }

    console.log("O.Opt SetShapeR - Output: Bounding rectangle calculated", shapeObject.r);
    return 0;
  }

  /**
     * Handles position tracking during stamp operations, checking for connections
     * @param position - The current cursor position
     * @param drawingObject - The drawing object being stamped
     * @returns The adjusted position based on connections
     */
  LM_StampDuringTrack(position, drawingObject) {
    console.log("O.Opt LM_StampDuringTrack - Input:", { position, drawingObject: drawingObject?.BlockID });

    let hookPoints;

    // Early exit conditions
    if (this.theActionStoredObjectID < 0) {
      console.log("O.Opt LM_StampDuringTrack - Output: No action object ID", position);
      return position;
    }

    if (this.theMoveList && this.theMoveList.length) {
      console.log("O.Opt LM_StampDuringTrack - Output: Using move list, returning original position", position);
      return position;
    }

    if (drawingObject == null) {
      console.log("O.Opt LM_StampDuringTrack - Output: No drawing object", position);
      return position;
    }

    // Get hook points for the object
    hookPoints = this.Move_GetHookPoints(this.theActionStoredObjectID, drawingObject, 0, 0);
    if (!hookPoints) {
      console.log("O.Opt LM_StampDuringTrack - Output: No hook points", position);
      return position;
    }

    // Reset delta values
    this.theDragDeltaX = 0;
    this.theDragDeltaY = 0;

    // Check for drop-on-line or auto-insert connection
    const linkParams = GlobalData.optManager.LinkParams;
    if ((linkParams.DropOnLine || linkParams.AutoInsert) &&
      this.FindConnect(
        this.theActionStoredObjectID,
        drawingObject,
        linkParams.cpt,
        true,
        true,
        false,
        position
      )) {
      // Apply position adjustment from FindConnect
      const adjustedPosition = {
        x: position.x + this.theDragDeltaX,
        y: position.y + this.theDragDeltaY
      };

      console.log("O.Opt LM_StampDuringTrack - Output: Drop-on-line adjusted position", adjustedPosition);
      return adjustedPosition;
    }

    // Reset delta values and try normal connection
    this.theDragDeltaX = 0;
    this.theDragDeltaY = 0;
    this.theDragStartX = position.x;
    this.theDragStartY = position.y;

    // Check for regular connection or join
    if (this.FindConnect(
      GlobalData.optManager.theActionStoredObjectID,
      drawingObject,
      hookPoints,
      true,
      false,
      linkParams.AllowJoin,
      position
    ) || linkParams.JoinIndex >= 0) {

      // Apply position adjustment
      const adjustedPosition = {
        x: position.x + this.theDragDeltaX,
        y: position.y + this.theDragDeltaY
      };

      console.log("O.Opt LM_StampDuringTrack - Output: Connection/join adjusted position", adjustedPosition);
      return adjustedPosition;
    }

    console.log("O.Opt LM_StampDuringTrack - Output: No adjustments needed", position);
    return position;
  }


  /**
     * Rotates a rectangle by a specified angle around a center point
     * @param rectangle - The rectangle to rotate
     * @param centerPoint - The point to rotate around
     * @param angleDegrees - Rotation angle in degrees
     * @returns A new rectangle that bounds the rotated points
     */
  RotateRect(rectangle, centerPoint, angleDegrees) {
    console.log("O.Opt RotateRect - Input:", { rectangle, centerPoint, angleDegrees });

    const points = [];
    const result = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };

    // Create points for each corner of the rectangle
    points.push(new Point(rectangle.x, rectangle.y));
    points.push(new Point(rectangle.x + rectangle.width, rectangle.y));
    points.push(new Point(rectangle.x + rectangle.width, rectangle.y + rectangle.height));
    points.push(new Point(rectangle.x, rectangle.y + rectangle.height));
    points.push(new Point(rectangle.x, rectangle.y)); // Close the polygon

    if (points && points.length) {
      // If rotation angle is provided, rotate the points
      if (angleDegrees) {
        const angleRadians = -2 * Math.PI * (angleDegrees / 360);

        // Calculate center of rectangle if not explicitly provided
        centerPoint.x = (rectangle.x + rectangle.x + rectangle.width) / 2;
        centerPoint.y = (rectangle.y + rectangle.y + rectangle.height) / 2;

        // Rotate points around center
        Utils3.RotatePointsAboutPoint(centerPoint, angleRadians, points);
      }

      // Calculate bounding rectangle of rotated points
      Utils2.GetPolyRect(result, points);
    }

    console.log("O.Opt RotateRect - Output:", result);
    return result;
  }

  /**
  * Rotates a rectangle around an explicit center point
  * @param rectangle - The rectangle to rotate
  * @param centerPoint - The point to rotate around
  * @param angleDegrees - Rotation angle in degrees
  * @returns A new rectangle that bounds the rotated points
  */
  RotateRectAboutCenter(rectangle, centerPoint, angleDegrees) {
    console.log("O.Opt RotateRectAboutCenter - Input:", { rectangle, centerPoint, angleDegrees });

    const points = [];
    const result = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };

    // Create points for each corner of the rectangle
    points.push(new Point(rectangle.x, rectangle.y));
    points.push(new Point(rectangle.x + rectangle.width, rectangle.y));
    points.push(new Point(rectangle.x + rectangle.width, rectangle.y + rectangle.height));
    points.push(new Point(rectangle.x, rectangle.y + rectangle.height));
    points.push(new Point(rectangle.x, rectangle.y)); // Close the polygon

    if (points && points.length) {
      // If rotation angle is provided, rotate the points
      if (angleDegrees) {
        const angleRadians = -2 * Math.PI * (angleDegrees / 360);

        // Rotate points around provided center
        Utils3.RotatePointsAboutPoint(centerPoint, angleRadians, points);
      }

      // Calculate bounding rectangle of rotated points
      Utils2.GetPolyRect(result, points);
    }

    console.log("O.Opt RotateRectAboutCenter - Output:", result);
    return result;
  }


  /**
     * Finds all child connectors for an object
     * @param objectId - ID of the parent object
     * @param linksList - Optional list of links to search through
     * @returns Array of child connector IDs
     */
  FindAllChildConnectors(objectId, linksList) {
    console.log("O.Opt FindAllChildConnectors - Input:", { objectId, linksList });

    const searchInfo = {
      lindex: -1,
      id: -1,
      hookpt: 0
    };

    const childConnectors = [];

    // Keep finding children until there are no more
    while (GlobalData.optManager.FindChildArrayByIndex(objectId, searchInfo, linksList) > 0) {
      childConnectors.push(searchInfo.id);
    }

    console.log("O.Opt FindAllChildConnectors - Output:", childConnectors);
    return childConnectors;
  }

  /**
     * Finds a child array by index
     * @param parentId - ID of the parent object
     * @param resultInfo - Object to store result information
     * @param linksList - Optional list of links to search through
     * @param baseClass - Base class type to filter by
     * @returns The ID of the found child or -1
     */
  FindChildArrayByIndex(parentId, resultInfo, linksList, baseClass) {
    console.log("O.Opt FindChildArrayByIndex - Input:", {
      parentId,
      resultInfo,
      hasLinksList: !!linksList,
      baseClass
    });

    let linkIndex, hookId, hookObject;

    // Use provided links list or get the default one
    const links = linksList || this.GetObjectPtr(this.theLinksBlockID, false);

    // Use provided base class or default to connector
    baseClass = baseClass || ConstantData.DrawingObjectBaseClass.CONNECTOR;

    // Find the first link for this parent
    const startLinkIndex = this.FindLink(links, parentId, true);
    const totalLinks = links.length;

    if (startLinkIndex >= 0) {
      for (linkIndex = startLinkIndex; linkIndex < totalLinks && links[linkIndex].targetid === parentId; linkIndex++) {
        // Check if this link is after the last found index and has the correct base class
        if (linkIndex > resultInfo.lindex &&
          (hookId = links[linkIndex].hookid,
            (hookObject = this.GetObjectPtr(hookId, false)) &&
            hookObject.DrawingObjectBaseClass === baseClass)) {

          // Update result information
          resultInfo.lindex = linkIndex;
          resultInfo.id = hookId;
          resultInfo.hookpt = hookObject.hooks[0].hookpt;

          console.log("O.Opt FindChildArrayByIndex - Output: Found child", hookId);
          return hookId;
        }
      }
    }

    console.log("O.Opt FindChildArrayByIndex - Output: No child found (-1)");
    return -1;
  }

  /**
   * Sets the frame for an object
   * @param objectId - ID of the object to update
   * @param newFrame - New frame dimensions
   * @returns 0 on success, 1 on failure
   */
  SetObjectFrame(objectId, newFrame) {
    console.log("O.Opt SetObjectFrame - Input:", { objectId, newFrame });

    // Get a preserved copy of the object for modification
    const targetObject = this.GetObjectPtr(objectId, true);

    if (targetObject == null) {
      console.log("O.Opt SetObjectFrame - Output: Failed to get object (1)");
      return 1;
    }

    // Set link flags for the object and connected objects
    this.SetLinkFlag(objectId, ConstantData.LinkFlags.SED_L_MOVE);

    if (targetObject.hooks.length) {
      this.SetLinkFlag(targetObject.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE);
    }

    // Update the object's frame
    targetObject.UpdateFrame(newFrame);

    console.log("O.Opt SetObjectFrame - Output: Frame updated successfully (0)");
    return 0;
  }

  /**
    * Sets attributes on an object
    * @param objectId - ID of the object to update
    * @param attributes - Object containing attributes to set
    */
  SetObjectAttributes(objectId, attributes) {
    console.log("O.Opt SetObjectAttributes - Input:", { objectId, attributes });

    // Get a preserved copy of the object for modification
    const objectBlock = GlobalData.objectStore.PreserveBlock(objectId);

    // Apply the properties to the object
    this.ApplyProperties(attributes, objectBlock.Data);

    console.log("O.Opt SetObjectAttributes - Output: Attributes applied");
  }

  /**
 * Recursively applies properties from one object to another
 * @param sourceProperties - Source object containing properties to copy
 * @param targetObject - Target object to receive the properties
 */
  ApplyProperties(sourceProperties, targetObject) {
    console.log("O.Opt ApplyProperties - Input:", {
      sourceProperties: Object.keys(sourceProperties),
      targetObject: targetObject ? targetObject.constructor.name : null
    });

    for (const propertyName in sourceProperties) {
      const targetValue = targetObject[propertyName];
      const sourceValue = sourceProperties[propertyName];
      const targetType = typeof targetValue;

      // Handle case where target property doesn't exist yet
      if (targetValue == null) {
        const sourceType = typeof sourceValue;

        // Simple types can be copied directly
        if (sourceValue == null ||
          sourceType === 'string' ||
          sourceType === 'number' ||
          sourceType === 'boolean') {
          targetObject[propertyName] = sourceValue;
        }
        // Arrays get copied by slice
        else if (sourceValue instanceof Array) {
          targetObject[propertyName] = sourceValue.slice(0);
        }
        // Blob and buffer types are directly assigned
        else if (sourceValue instanceof Blob || sourceValue instanceof Uint8Array) {
          targetObject[propertyName] = sourceValue;
        }
        // Avoid copying functions
        else if (sourceType !== 'function') {
          targetObject[propertyName] = $.extend(true, new sourceValue.constructor(), sourceValue);
        }
      }
      // Handle existing target properties
      else {
        // Simple types can be copied directly
        if (targetType === 'string' ||
          targetType === 'number' ||
          targetType === 'boolean') {
          targetObject[propertyName] = sourceValue;
        }
        // Arrays get copied by slice
        else if (sourceValue instanceof Array) {
          targetObject[propertyName] = sourceValue.slice(0);
        }
        // Blob and buffer types are directly assigned
        else if (sourceValue instanceof Blob || sourceValue instanceof Uint8Array) {
          targetObject[propertyName] = sourceValue;
        }
        // Avoid copying functions
        else if (targetType !== 'function') {
          // Create a copy of the existing object to preserve its type
          const targetCopy = $.extend(true, new targetValue.constructor(), targetValue);
          targetObject[propertyName] = targetCopy;

          // Recursively apply properties
          this.ApplyProperties(sourceValue, targetCopy);
        }
      }
    }

    console.log("O.Opt ApplyProperties - Output: Properties applied");
  }



  /**
     * Calculates points along a Y-curve (vertical semi-ellipse)
     *
     * @param points - Array to store calculated points
     * @param rect - The bounding rectangle for the curve
     * @param segmentCount - Number of segments in the curve
     * @param minOffset - Minimum offset from the top of the rectangle
     * @param maxOffset - Maximum offset from the bottom of the rectangle
     * @param startOffset - Offset for the first point
     * @param endOffset - Offset for the last point
     * @param isRightSide - Whether to place points on the right side of the rectangle
     * @returns The input points array with new points added
     */
  PolyYCurve(points, rect, segmentCount, minOffset, maxOffset, startOffset, endOffset, isRightSide) {
    console.log("O.Opt PolyYCurve - Input:", {
      pointCount: points.length,
      rect,
      segmentCount,
      minOffset,
      maxOffset,
      startOffset,
      endOffset,
      isRightSide
    });

    // Calculate vertical center and width
    const verticalHalf = rect.height / 2;
    const rectWidth = rect.width;

    // Ensure minimum segment count
    if (segmentCount < 2) {
      segmentCount = 2;
    }

    // Calculate vertical spacing between points
    const verticalSpacing = (2 * verticalHalf - startOffset - endOffset) / (segmentCount - 1);

    // Track if we've already processed special case points
    let minLimitProcessed = false;
    let maxLimitProcessed = false;

    // Create points along the curve
    for (let i = 0; i < segmentCount; i++) {
      // Calculate raw vertical offset from top
      let verticalOffset = verticalSpacing * i + startOffset;

      // Apply minimum offset constraint
      if (minOffset && verticalOffset < minOffset) {
        if (minLimitProcessed) {
          continue; // Skip duplicate minimum points
        }
        verticalOffset = minOffset;
        minLimitProcessed = true;
      }

      // Calculate distance from horizontal center
      let distanceFromCenter = verticalHalf - verticalOffset;

      // Apply maximum offset constraint
      if (maxOffset && distanceFromCenter - maxOffset < -verticalHalf) {
        if (maxLimitProcessed) {
          break; // Stop if we're past the maximum
        }
        distanceFromCenter = -(verticalHalf - maxOffset);
        maxLimitProcessed = true;
      }

      // Create new point
      const point = new Point(0, 0);

      // Calculate Y position
      point.y = rect.y + (verticalHalf - distanceFromCenter);

      // Calculate ratio for X position
      let ratio = 0;
      if (verticalHalf) {
        ratio = distanceFromCenter / verticalHalf;
      } else {
        rectWidth = 0;
      }

      // Calculate X using ellipse formula and place on correct side
      const horizontalOffset = Utils2.sqrt(1 - ratio * ratio) * rectWidth;
      point.x = isRightSide ? rect.x + rect.width - horizontalOffset : rect.x + horizontalOffset;

      // Add point to result array
      points.push(point);
    }

    console.log("O.Opt PolyYCurve - Output: Generated points:", points.length);
    return points;
  }

  /**
   * Determines if a point is inside a polygon using ray-casting algorithm
   * @param polygonPoints - Array of points defining the polygon
   * @param testPoint - The point to test for containment
   * @returns True if the point is inside the polygon, false otherwise
   */
  PolyPtInPolygon(polygonPoints, testPoint) {
    console.log("O.Opt PolyPtInPolygon - Input:", { polygonPointsCount: polygonPoints.length, testPoint });

    // Initialize triangle points
    const trianglePoints = [
      {}, {}, {}
    ];

    // Counter for number of intersections
    let intersectionCount = 0;

    trianglePoints[0] = polygonPoints[0];
    const pointCount = polygonPoints.length;

    // Check each possible triangle formed by consecutive points
    for (let i = 1; i < pointCount - 1; i++) {
      // Flag to track if point is within current triangle
      let isPointInTriangle = true;

      trianglePoints[1] = polygonPoints[i];
      trianglePoints[2] = polygonPoints[i + 1];

      // Check if test point is within the triangle angles
      for (let j = 0; j < 3; j++) {
        // Get angle from triangle point to test point
        const angleToTestPoint = this.SD_GetCounterClockwiseAngleBetween2Points(
          trianglePoints[j],
          testPoint
        );

        // Get indices for adjacent points (wrapping around)
        const prevIndex = j - 1 >= 0 ? j - 1 : 2;
        const nextIndex = j + 1 < 3 ? j + 1 : 0;

        // Calculate angles to adjacent points
        const angleToPrevPoint = this.SD_GetCounterClockwiseAngleBetween2Points(
          trianglePoints[j],
          trianglePoints[prevIndex]
        );

        const angleToNextPoint = this.SD_GetCounterClockwiseAngleBetween2Points(
          trianglePoints[j],
          trianglePoints[nextIndex]
        );

        // Get the larger of the two angles
        const largerAngle = angleToPrevPoint > angleToNextPoint ?
          angleToPrevPoint : angleToNextPoint;

        // Calculate complementary angle
        const complementaryAngle = ConstantData.Geometry.PI - largerAngle;

        // Normalize all angles to the same range
        const normalizedPrevAngle = this.NormalizeAngle(angleToPrevPoint, complementaryAngle);
        const normalizedNextAngle = this.NormalizeAngle(angleToNextPoint, complementaryAngle);

        // Ensure proper ordering of angles
        let smallerAngle = normalizedPrevAngle;
        let greaterAngle = normalizedNextAngle;

        if (normalizedPrevAngle > normalizedNextAngle) {
          smallerAngle = normalizedNextAngle;
          greaterAngle = normalizedPrevAngle;
        }

        // Normalize test point angle
        const normalizedTestPointAngle = this.NormalizeAngle(angleToTestPoint, complementaryAngle);

        // Check if test point angle is outside the range
        if (normalizedTestPointAngle < smallerAngle || normalizedTestPointAngle > greaterAngle) {
          isPointInTriangle = false;
          break;
        }
      }

      // If point is in triangle, increment intersection counter
      if (isPointInTriangle) {
        intersectionCount++;
      }
    }

    // Point is inside if number of intersections is odd
    const isInside = (intersectionCount % 2) !== 0;
    console.log("O.Opt PolyPtInPolygon - Output:", isInside);
    return isInside;
  }

  /**
     * Calculates the drawing scale based on ruler settings
     * @param drawingScale - The drawing scale configuration object
     * @returns The calculated drawing scale value
     */
  GetDrawingScale(drawingScale) {
    console.log("O.Opt GetDrawingScale - Input:", drawingScale);

    const units = ConstantData.RulerUnits;
    let majorScale = drawingScale.majorScale;
    let majorUnit = drawingScale.major;

    if (majorUnit == null) {
      majorUnit = ConstantData.Defines.DefaultRulerMajor;
    }

    // Adjust scale based on unit type
    switch (drawingScale.units) {
      case units.SED_Feet:
        majorScale *= 12;
        break;
      case units.SED_Mm:
        majorScale /= 10;
        break;
      case units.SED_M:
        majorScale *= 100;
        break;
    }

    // Calculate final scale
    const finalScale = majorScale * (ConstantData.Defines.DefaultRulerMajor / majorUnit);

    console.log("O.Opt GetDrawingScale - Output:", finalScale);
    return finalScale;
  }

  /**
     * Highlights a connection point on a drawing object
     * @param objectId - ID of the object to highlight
     * @param connectIndex - Index of the connection point
     * @param shouldHighlight - Whether to show (true) or hide (false) the highlight
     * @param connectPoint - The connection point coordinates
     * @param hookPointType - Type of hook point
     * @param cellId - Optional cell ID for container objects
     */
  HiliteConnect(objectId, connectIndex, shouldHighlight, connectPoint, hookPointType, cellId) {
    console.log("O.Opt HiliteConnect - Input:", {
      objectId,
      connectIndex,
      shouldHighlight,
      connectPoint,
      hookPointType,
      cellId
    });

    let targetId = objectId;
    let drawingObject = null;
    let svgElement = null;
    let highlightElement = null;
    let highlightId = null;

    // Get the drawing object
    drawingObject = this.GetObjectPtr(objectId, false);
    if (drawingObject == null) {
      console.log("O.Opt HiliteConnect - Output: No drawing object found");
      return;
    }

    // Check if this is a container connection or has a cell ID
    const isContainerConnection = !!(drawingObject.flags & ConstantData.ObjFlags.SEDO_ContConn || cellId != null);

    // Get the SVG element for this object
    svgElement = this.svgObjectLayer.GetElementByID(targetId);
    if (svgElement == null || svgElement.GetElementByID(ConstantData.SVGElementClass.SHAPE) == null) {
      console.log("O.Opt HiliteConnect - Output: No SVG element found");
      return;
    }

    // Create the highlight element ID
    highlightId = 'hilite_' + targetId;
    highlightElement = this.svgHighlightLayer.GetElementByID(highlightId);

    // Add highlight if requested and not already present
    if (highlightElement == null && shouldHighlight) {
      highlightElement = drawingObject.CreateConnectHilites(
        this.svgDoc,
        objectId,
        connectIndex,
        connectPoint,
        hookPointType,
        cellId
      );

      if (highlightElement != null) {
        this.svgHighlightLayer.AddElement(highlightElement);

        try {
          // Apply rotation to non-container connections
          if (!isContainerConnection) {
            highlightElement.SetRotation(drawingObject.RotationAngle);
          }
        } catch (error) {
          throw error;
        }

        console.log("O.Opt HiliteConnect - Output: Highlight added");
      } else {
        console.log("O.Opt HiliteConnect - Output: Failed to create highlight");
      }
    }
    // Remove highlight if requested and present
    else if (highlightElement != null && !shouldHighlight) {
      this.svgHighlightLayer.RemoveElement(highlightElement);
      console.log("O.Opt HiliteConnect - Output: Highlight removed");
    } else {
      console.log("O.Opt HiliteConnect - Output: No change needed");
    }
  }

  PolyLJoin(e, t, a, r, i) {
    var n, o, s, l, S, c, u, p, d, D, g, h, m, C, y, f = null, L = null, I = null, T = null, b = [], M = [], P = !1, R = [], A = !1, _ = ConstantData.ActionTriggerType.LINEEND, E = {
      x: 0,
      y: 0
    }, w = {}, F = ConstantData.Defines.SED_KnobSize, v = -1, G = GlobalData.optManager.ActiveVisibleZList(), N = !1;

    f = this.GetObjectPtr(e, !0);
    if (f == null) return -1;

    L = this.GetObjectPtr(a, !0);
    if (L == null) return -1;

    h = f.DataID;
    if (L.DataID >= 0) h = L.DataID;

    m = f.NoteID;
    if (L.NoteID >= 0) m = L.NoteID;

    y = f.CommentID;
    if (L.CommentID >= 0) y = L.CommentID;

    C = f.HyperlinkText;
    if (L.HyperlinkText) C = L.HyperlinkText;

    if (r === ConstantData.HookPts.SED_WTL || r === ConstantData.HookPts.SED_WTR) r = ConstantData.HookPts.SED_KTL;

    if (e === a && f.LineType === ConstantData.LineType.POLYLINE) {
      A = f.polylist.closed;
      f.polylist.closed = !0;
      s = f.polylist.segs.length;
      f.polylist.segs[s - 1].pt.x = f.polylist.segs[0].pt.x;
      f.polylist.segs[s - 1].pt.y = f.polylist.segs[0].pt.y;
      f.EndPoint.x = f.StartPoint.x;
      f.EndPoint.y = f.StartPoint.y;
      if (f.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) this.OpenShapeEdit(e);

      var k = -1;
      if (f instanceof PolyLineContainer && !A && i !== !0) {
        f.MaintainDimensionThroughPolygonOpennessChange(f.polylist.closed);
        k = -2;
      }

      f.CalcFrame();
      GlobalData.optManager.AddToDirtyList(f.BlockID);
      this.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE);
      this.MaintainLink(e, f, null, _, !1);
      return k;
    }
    if (f.LineType === ConstantData.LineType.POLYLINE) {
      I = f;
      T = L;
      M.push(a);
      c = e;
    } else if (L.LineType === ConstantData.LineType.POLYLINE) {
      I = L;
      T = f;
      u = t;
      t = r;
      r = u;
      M.push(e);
      c = a;
    }

    if (I == null) {
      M.push(a);
      M.push(e);
      v = Math.min(G.indexOf(a), G.indexOf(e));
      var U = {
        Frame: {
          x: f.Frame.x,
          y: f.Frame.x,
          width: f.Frame.width,
          height: f.Frame.height
        },
        inside: {
          x: f.inside.x,
          y: f.inside.x,
          width: f.inside.width,
          height: f.inside.height
        },
        StartPoint: {
          x: f.StartPoint.x,
          y: f.StartPoint.y
        },
        EndPoint: {
          x: f.EndPoint.x,
          y: f.EndPoint.y
        },
        flags: ConstantData.ObjFlags.SEDO_Erase | ConstantData.ObjFlags.SEDO_EraseOnGrow,
        extraflags: ConstantData.ExtraFlags.SEDE_SideKnobs,
        StartArrowID: L.StartArrowID,
        EndArrowID: L.EndArrowID,
        StartArrowDisp: L.StartArrowDisp,
        EndArrowDisp: L.EndArrowDisp,
        ArrowSizeIndex: L.ArrowSizeIndex,
        TextFlags: f.TextFlags,
        objecttype: f.objecttype,
        Dimensions: f.Dimensions,
        dataclass: ConstantData.SDRShapeTypes.SED_S_Poly,
        polylist: new PolyList()
      };

      if (L.StartArrowID === 0 && f.StartArrowID > 0) {
        U.StartArrowID = f.StartArrowID;
        U.StartArrowDisp = f.StartArrowDisp;
        U.ArrowSizeIndex = f.ArrowSizeIndex;
      }

      if (L.EndArrowID === 0 && f.EndArrowID > 0) {
        U.EndArrowID = f.EndArrowID;
        U.EndArrowDisp = f.EndArrowDisp;
        U.ArrowSizeIndex = f.ArrowSizeIndex;
      }

      U.StyleRecord = Utils1.DeepCopy(f.StyleRecord);

      if (U.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) {
        U.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT;
      }

      U.StyleRecord.Fill.Hatch = 0;

      var polyPoints = f.GetPolyPoints(ConstantData.Defines.NPOLYPTS, false, true, false, null);
      var numPoints = polyPoints.length;

      for (var n = 0; n < numPoints; n++) {
        var lineType = (n === 0 || f.LineType === ConstantData.LineType.SEGLINE) ? ConstantData.LineType.LINE : f.LineType;
        U.polylist.segs.push(new PolySeg(lineType, polyPoints[n].x - f.StartPoint.x, polyPoints[n].y - f.StartPoint.y));

        if (lineType === ConstantData.LineType.ARCLINE) {
          U.polylist.segs[U.polylist.segs.length - 1].param = f.IsReversed ? f.CurveAdjust : -f.CurveAdjust;
        } else if (lineType === ConstantData.LineType.ARCSEGLINE) {

          var arcQuadrant = this.PolyLine_Pr_PolyLGetArcQuadrant(polyPoints[n - 1], polyPoints[n], 0);

          U.polylist.segs[U.polylist.segs.length - 1].param = arcQuadrant.param;
          U.polylist.segs[U.polylist.segs.length - 1].ShortRef = arcQuadrant.ShortRef;
        }
      }

      I = gBusinessManager.AddNewPolyLine(f.objecttype, U) || new PolyLine(U);
      T = L;
      P = true;
    }
    if (t === ConstantData.HookPts.SED_KTL)
      var J = {
        x: I.StartPoint.x,
        y: I.StartPoint.y
      };
    else
      J = {
        x: I.EndPoint.x,
        y: I.EndPoint.y
      };
    if (r === ConstantData.HookPts.SED_KTL)
      var x = {
        x: T.StartPoint.x,
        y: T.StartPoint.y
      };
    else
      x = {
        x: T.EndPoint.x,
        y: T.EndPoint.y
      };
    if (l = J.x - x.x,
      S = J.y - x.y,
      T.StartPoint.x += l,
      T.StartPoint.y += S,
      T.EndPoint.x += l,
      T.EndPoint.y += S,
      (o = (b = T.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null)).length) + (s = I.polylist.segs.length) > ConstantData.Defines.SED_MaxPolySegs)
      -1;
    if (t === ConstantData.HookPts.SED_KTL) {
      if (_ = ConstantData.ActionTriggerType.LINESTART,
        r === ConstantData.HookPts.SED_KTL) {
        for (l = I.StartPoint.x - b[o - 1].x,
          S = I.StartPoint.y - b[o - 1].y,
          n = 0; n < s; n++)
          I.polylist.segs[n].pt.x += l,
            I.polylist.segs[n].pt.y += S;
        for (I.StartPoint.x = b[o - 1].x,
          I.StartPoint.y = b[o - 1].y,
          n = 1; n < o; n++) {
          switch (T.LineType) {
            case ConstantData.LineType.POLYLINE:
              E.x = I.polylist.segs[0].pt.x,
                E.y = I.polylist.segs[0].pt.y,
                I.polylist.segs[0] = Utils1.DeepCopy(T.polylist.segs[n]),
                I.polylist.segs[0].pt.x = E.x,
                I.polylist.segs[0].pt.y = E.y,
                I.polylist.segs[0].param = -I.polylist.segs[0].param;
              break;
            case ConstantData.LineType.ARCLINE:
              I.polylist.segs[0].LineType = T.LineType,
                T.IsReversed ? I.polylist.segs[0].param = -T.CurveAdjust : I.polylist.segs[0].param = T.CurveAdjust;
              break;
            case ConstantData.LineType.ARCSEGLINE:
              I.polylist.segs[0].LineType = T.LineType,
                I.polylist.segs[0].param = 0,
                g = I.Pr_PolyLGetArcQuadrant(b[n], b[n - 1], 0),
                I.polylist.segs[0].param = g.param,
                I.polylist.segs[0].ShortRef = g.ShortRef;
              break;
            default:
              I.polylist.segs[0].LineType = ConstantData.LineType.LINE
          }
          I.polylist.segs.unshift(new PolySeg(ConstantData.LineType.LINE, b[n].x - I.StartPoint.x, b[n].y - I.StartPoint.y))
        }
      } else {
        for (l = I.StartPoint.x - b[0].x,
          S = I.StartPoint.y - b[0].y,
          n = 0; n < s; n++)
          I.polylist.segs[n].pt.x += l,
            I.polylist.segs[n].pt.y += S;
        switch (I.StartPoint.x = b[0].x,
        I.StartPoint.y = b[0].y,
        T.LineType) {
          case ConstantData.LineType.POLYLINE:
            E.x = I.polylist.segs[0].pt.x,
              E.y = I.polylist.segs[0].pt.y,
              I.polylist.segs[0] = Utils1.DeepCopy(T.polylist.segs[o - 1]),
              I.polylist.segs[0].pt.x = E.x,
              I.polylist.segs[0].pt.y = E.y;
            break;
          case ConstantData.LineType.ARCLINE:
            I.polylist.segs[0].LineType = T.LineType,
              T.IsReversed ? I.polylist.segs[0].param = T.CurveAdjust : I.polylist.segs[0].param = -T.CurveAdjust;
            break;
          case ConstantData.LineType.ARCSEGLINE:
            I.polylist.segs[0].LineType = T.LineType,
              I.polylist.segs[0].param = 0,
              g = I.Pr_PolyLGetArcQuadrant(b[o - 2], b[o - 1], 0),
              I.polylist.segs[0].param = g.param,
              I.polylist.segs[0].ShortRef = g.ShortRef;
            break;
          default:
            I.polylist.segs[0].LineType = ConstantData.LineType.LINE
        }
        for (n = o - 2; n >= 0; n--)
          if (I.polylist.segs.unshift(new PolySeg(ConstantData.LineType.LINE, b[n].x - I.StartPoint.x, b[n].y - I.StartPoint.y)),
            n > 0)
            switch (T.LineType) {
              case ConstantData.LineType.POLYLINE:
                E.x = I.polylist.segs[0].pt.x,
                  E.y = I.polylist.segs[0].pt.y,
                  I.polylist.segs[0] = Utils1.DeepCopy(T.polylist.segs[n]),
                  I.polylist.segs[0].pt.x = E.x,
                  I.polylist.segs[0].pt.y = E.y;
                break;
              case ConstantData.LineType.ARCSEGLINE:
                I.polylist.segs[0].LineType = T.LineType,
                  w.x = b[n].x - I.StartPoint.x,
                  w.y = b[n].y - I.StartPoint.y,
                  I.polylist.segs[0].param = 0,
                  g = I.Pr_PolyLGetArcQuadrant(b[n - 1], b[n], 0),
                  I.polylist.segs[0].param = g.param,
                  I.polylist.segs[0].ShortRef = g.ShortRef
            }
      }
      D = Utils2.InflatePoint(I.polylist.segs[0].pt, F),
        !I.polylist.closed && Utils2.pointInRect(D, I.polylist.segs[I.polylist.segs.length - 1].pt) && (I.polylist.closed = !0,
          I.polylist.segs[I.polylist.segs.length - 1].pt.x = I.polylist.segs[0].pt.x,
          I.polylist.segs[I.polylist.segs.length - 1].pt.y = I.polylist.segs[0].pt.y,
          I.EndPoint.x = I.StartPoint.x,
          I.EndPoint.y = I.StartPoint.y,
          I instanceof PolyLine && !0 !== i && I.MaintainDimensionThroughPolygonOpennessChange(I.polylist.closed),
          I.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL && this.OpenShapeEdit(I.BlockID),
          GlobalData.optManager.AddToDirtyList(I.BlockID))
    } else {
      if (r === ConstantData.HookPts.SED_KTL) {
        for (n = 1; n < o; n++) {
          switch (T.LineType) {
            case ConstantData.LineType.POLYLINE:
              p = T.polylist.segs[n].LineType;
              break;
            case ConstantData.LineType.ARCLINE:
            case ConstantData.LineType.ARCSEGLINE:
              p = T.LineType;
              break;
            default:
              p = ConstantData.LineType.LINE
          }
          switch (I.polylist.segs.push(new PolySeg(p, b[n].x - I.StartPoint.x, b[n].y - I.StartPoint.y)),
          T.LineType) {
            case ConstantData.LineType.ARCLINE:
              T.IsReversed ? I.polylist.segs[I.polylist.segs.length - 1].param = T.CurveAdjust : I.polylist.segs[I.polylist.segs.length - 1].param = -T.CurveAdjust;
              break;
            case ConstantData.LineType.POLYLINE:
              I.polylist.segs[I.polylist.segs.length - 1] = Utils1.DeepCopy(T.polylist.segs[n]),
                I.polylist.segs[I.polylist.segs.length - 1].pt.x = b[n].x - I.StartPoint.x,
                I.polylist.segs[I.polylist.segs.length - 1].pt.y = b[n].y - I.StartPoint.y;
              break;
            case ConstantData.LineType.ARCSEGLINE:
              w.x = b[n].x - I.StartPoint.x,
                w.y = b[n].y - I.StartPoint.y,
                d = I.polylist.segs.length,
                I.polylist.segs[d - 1].param = 0,
                g = I.Pr_PolyLGetArcQuadrant(b[n - 1], b[n], 0),
                I.polylist.segs[d - 1].param = g.param,
                I.polylist.segs[d - 1].ShortRef = g.ShortRef
          }
        }
        I.EndPoint.x = b[o - 1].x,
          I.EndPoint.y = b[o - 1].y
      } else {
        for (n = o - 2; n >= 0; n--) {
          switch (T.LineType) {
            case ConstantData.LineType.POLYLINE:
              p = T.polylist.segs[n + 1].LineType;
              break;
            case ConstantData.LineType.ARCLINE:
            case ConstantData.LineType.ARCSEGLINE:
              p = T.LineType;
              break;
            default:
              p = ConstantData.LineType.LINE
          }
          switch (I.polylist.segs.push(new PolySeg(p, b[n].x - I.StartPoint.x, b[n].y - I.StartPoint.y)),
          T.LineType) {
            case ConstantData.LineType.ARCLINE:
              T.IsReversed ? I.polylist.segs[I.polylist.segs.length - 1].param = -T.CurveAdjust : I.polylist.segs[I.polylist.segs.length - 1].param = T.CurveAdjust;
              break;
            case ConstantData.LineType.POLYLINE:
              I.polylist.segs[I.polylist.segs.length - 1] = Utils1.DeepCopy(T.polylist.segs[n + 1]),
                I.polylist.segs[I.polylist.segs.length - 1].pt.x = b[n].x - I.StartPoint.x,
                I.polylist.segs[I.polylist.segs.length - 1].pt.y = b[n].y - I.StartPoint.y,
                I.polylist.segs[I.polylist.segs.length - 1].param = -I.polylist.segs[I.polylist.segs.length - 1].param;
              break;
            case ConstantData.LineType.ARCSEGLINE:
              d = I.polylist.segs.length,
                I.polylist.segs[d - 1].param = 0,
                g = I.Pr_PolyLGetArcQuadrant(b[n + 1], b[n], 0),
                I.polylist.segs[d - 1].param = g.param,
                I.polylist.segs[d - 1].ShortRef = g.ShortRef
          }
        }
        I.EndPoint.x = b[0].x,
          I.EndPoint.y = b[0].y
      }
      D = Utils2.InflatePoint(I.polylist.segs[I.polylist.segs.length - 1].pt, F),
        Utils2.pointInRect(D, I.polylist.segs[0].pt) && (I.polylist.closed = !0,
          I.polylist.segs[I.polylist.segs.length - 1].pt.x = I.polylist.segs[0].pt.x,
          I.polylist.segs[I.polylist.segs.length - 1].pt.y = I.polylist.segs[0].pt.y,
          I.EndPoint.x = I.StartPoint.x,
          I.EndPoint.y = I.StartPoint.y,
          I.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL && this.OpenShapeEdit(I.BlockID),
          I instanceof PolyLine && !0 !== i && I.MaintainDimensionThroughPolygonOpennessChange(I.polylist.closed),
          GlobalData.optManager.AddToDirtyList(I.BlockID))
    }
    if (I.CalcFrame(),
      P)
      c = this.AddNewObject(I, !1, !0),
        // Collab.AddNewBlockToSecondary(c),
        // Collab.ClearCreateList(),
        // Collab.AddToCreateList(c),
        N = !0,
        GlobalData.optManager.AddToDirtyList(c);
    else {
      var O = GlobalData.optManager.VisibleZList().indexOf(c);
      O >= 0 && this.AddSVGObject(O, c, !0, !0)
    }
    for ((I = GlobalData.optManager.GetObjectPtr(c, !1)) && I.DataID < 0 && (I.DataID = h,
      f.DataID === h ? (I.TextDirection = f.TextDirection,
        f.DataID = -1) : L.DataID === h && (I.TextDirection = L.TextDirection,
          L.DataID = -1),
      I.TextFlags = Utils2.SetFlag(I.TextFlags, ConstantData.TextFlags.SED_TF_HorizText, !I.TextDirection)),
      I && I.NoteID < 0 && (I.NoteID = m,
        f.NoteID === m ? f.NoteID = -1 : L.NoteID === m && (L.NoteID = -1),
        I.TextFlags = Utils2.SetFlag(I.TextFlags, ConstantData.TextFlags.SED_TF_HorizText, !I.TextDirection)),
      I && I.CommentID < 0 && (I.CommentID = y,
        f.CommentID === y ? f.CommentID = -1 : L.CommentID === y && (L.CommentID = -1),
        I.TextFlags = Utils2.SetFlag(I.TextFlags, ConstantData.TextFlags.SED_TF_HorizText, !I.TextDirection)),
      I && !I.HyperlinkText && (I.HyperlinkText = C),
      n = 0; n < M.length; n++)
      this.MoveLinks(c, M[n], null, null);
    if (this.DeleteObjects(M, !1),
      this.SetLinkFlag(c, ConstantData.LinkFlags.SED_L_MOVE),
      this.MaintainLink(c, I, null, _, !1),
      this.UpdateLinks(),
      R.push(c),
      this.SelectObjects(R, !1, !0),
      P && v >= 0) {
      var B = G.indexOf(c);
      G.splice(B, 1),
        G.splice(v, 0, c),
        N = !0,
        GlobalData.optManager.AddToDirtyList(c)
    }
    return I instanceof PolyLineContainer && I.MoveBehindAllLinked() && (N = !0),
      N && (GlobalData.optManager.IsTopMostVisibleLayer() ? GlobalData.optManager.RenderDirtySVGObjects() : GlobalData.optManager.RenderAllSVGObjects()),
      c
  }


  /**
 * Determines the arc quadrant based on two points and an angle
 * @param startPoint - The starting point of the arc
 * @param endPoint - The ending point of the arc
 * @param arcAngle - The angle of the arc in radians
 * @returns Object containing quadrant parameters and reference
 */
  PolyLine_Pr_PolyLGetArcQuadrant(startPoint, endPoint, arcAngle) {
    console.log("O.Opt PolyLine_Pr_PolyLGetArcQuadrant - Input:", {
      startPoint,
      endPoint,
      arcAngle
    });

    const result = {
      param: 0,
      ShortRef: 0
    };

    const points = [];
    const rotationCenter = {};

    // Add the points to the array
    points.push(new Point(startPoint.x, startPoint.y));
    points.push(new Point(endPoint.x, endPoint.y));

    // Set the rotation center to the start point
    rotationCenter.x = startPoint.x;
    rotationCenter.y = startPoint.y;

    // Apply rotation if the angle is significant
    if (Math.abs(arcAngle) >= 0.01) {
      const sinValue = Math.sin(arcAngle);
      const cosValue = Math.cos(arcAngle);
      const arcSin = Math.asin(sinValue);

      // Adjust the arc sine based on cosine sign
      const adjustedArcSin = cosValue < 0 ? -arcSin : arcSin;

      // Rotate the points around the center
      Utils3.RotatePointsAboutPoint(rotationCenter, adjustedArcSin, points);
    }

    const origin = points[0];
    const target = points[1];

    // Determine quadrant based on relative positions
    if (target.x > origin.x) {
      if (target.y > origin.y) {
        // Bottom-left quadrant
        result.param = -ConstantData.Geometry.PI / 2;
        result.ShortRef = ConstantData.ArcQuad.SD_PLA_BL;

        if (endPoint.notclockwise) {
          result.param = 0;
        }
      } else {
        // Top-left quadrant
        result.ShortRef = ConstantData.ArcQuad.SD_PLA_TL;

        if (endPoint.notclockwise) {
          result.ShortRef = ConstantData.ArcQuad.SD_PLA_TR;
          result.param = ConstantData.Geometry.PI / 2;
        }
      }
    } else {
      if (target.y > origin.y) {
        // Bottom-right quadrant
        result.ShortRef = ConstantData.ArcQuad.SD_PLA_BR;

        if (endPoint.notclockwise) {
          result.ShortRef = ConstantData.ArcQuad.SD_PLA_BL;
          result.param = ConstantData.Geometry.PI / 2;
        }
      } else {
        // Top-right quadrant
        result.param = -ConstantData.Geometry.PI / 2;
        result.ShortRef = ConstantData.ArcQuad.SD_PLA_TR;

        if (endPoint.notclockwise) {
          result.param = 0;
        }
      }
    }

    console.log("O.Opt PolyLine_Pr_PolyLGetArcQuadrant - Output:", result);
    return result;
  }





















  /**
  * Moves links from one object to another
  * @param targetObjectId - The ID of the target object to move links to
  * @param sourceObjectId - The ID of the source object to move links from
  * @param linkIndices - Optional array of link indices to move
  * @param hookResults - Optional array to store hook information in
  * @returns 0 on success, 1 on failure
  */
  MoveLinks(targetObjectId, sourceObjectId, linkIndices, hookResults) {
    console.log("O.Opt MoveLinks - Input:", {
      targetObjectId,
      sourceObjectId,
      linkIndices: linkIndices ? linkIndices.length : 'null',
      hasHookResults: !!hookResults
    });

    let tempLink, targetObject, sourceObject, hookPoint, linkIndex, linkCount;
    let sourceHookId, sourceHook, hookIndex, foundIndex, swapNeeded;
    let hookPoints = [];
    let hookInfo = {};
    let linksList = this.GetObjectPtr(this.theLinksBlockID, true);

    // Check if links list exists
    if (linksList == null) {
      console.log("O.Opt MoveLinks - Output: Failed (no links list)");
      return 1;
    }

    // Get total number of links
    linkCount = linksList.length;

    // Check if target object exists
    if (this.GetObjectPtr(sourceObjectId, false) == null) {
      console.log("O.Opt MoveLinks - Output: Failed (source object not found)");
      return 1;
    }

    // Check if source object exists
    if ((targetObject = this.GetObjectPtr(targetObjectId, false)) == null) {
      console.log("O.Opt MoveLinks - Output: Failed (target object not found)");
      return 1;
    }

    // If no link indices provided, find all links for the source object
    if (linkIndices == null) {
      linkIndices = [];
      foundIndex = this.FindLink(linksList, sourceObjectId, true);

      if (foundIndex >= 0) {
        while (foundIndex < linkCount && linksList[foundIndex].targetid === sourceObjectId) {
          linkIndices.push(foundIndex);
          foundIndex++;
        }
      }
    }

    // Process each link to be moved
    if ((linkIndices.length) >= 0) {
      for (let i = 0; i < linkIndices.length; i++) {
        // Get the link index and the hook object ID
        linkIndex = linkIndices[i];
        sourceHookId = linksList[linkIndex].hookid;

        if (sourceHookId >= 0) {
          // Get the hook object
          sourceHook = this.GetObjectPtr(sourceHookId, true);

          if (sourceHook == null) continue;

          // Skip objects with the NoMaintainLink flag
          if (sourceHook.flags & ConstantData.ObjFlags.SEDO_NoMaintainLink) continue;

          // Find the hook that points to the source object
          for (hookIndex = 0; hookIndex < sourceHook.hooks.length; hookIndex++) {
            if (sourceHook.hooks[hookIndex].objid === sourceObjectId) {
              // Get the hook point
              hookPoint = sourceHook.HookToPoint(sourceHook.hooks[hookIndex].hookpt, null);

              // If we're just collecting hook results
              if (hookResults) {
                hookInfo = {
                  pt: hookPoint,
                  obj: sourceHook,
                  index: hookIndex
                };
                hookResults.push(hookInfo);
                continue;
              }

              // Handle multiplicity objects differently
              if (sourceHook.objecttype !== ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY) {
                // Get target points for connection
                hookPoints = targetObject.GetTargetPoints(
                  hookPoint,
                  ConstantData.HookFlags.SED_LC_NoSnaps,
                  null
                );

                if (hookPoints && hookPoints.length) {
                  // Update hook connection point
                  sourceHook.hooks[hookIndex].connect.x = hookPoints[0].x;
                  sourceHook.hooks[hookIndex].connect.y = hookPoints[0].y;
                }

                // Update hook and link references
                sourceHook.hooks[hookIndex].objid = targetObjectId;
                linksList[linkIndex].targetid = targetObjectId;
              } else {
                // Just mark multiplicity links as moved
                linksList[linkIndex].flags = Utils2.SetFlag(
                  linksList[linkIndex].flags,
                  ConstantData.LinkFlags.SED_L_MOVE,
                  true
                );

                // Update hook and link references
                sourceHook.hooks[hookIndex].objid = targetObjectId;
                linksList[linkIndex].targetid = targetObjectId;
              }
            }
          }
        }
      }

      // Sort the links list by target IDs
      do {
        swapNeeded = false;
        for (hookIndex = 0; hookIndex < linkCount - 1; hookIndex++) {
          if (linksList[hookIndex].targetid > linksList[hookIndex + 1].targetid) {
            swapNeeded = true;
            tempLink = linksList[hookIndex + 1];
            linksList[hookIndex + 1] = linksList[hookIndex];
            linksList[hookIndex] = tempLink;
          }
        }
      } while (swapNeeded);
    }

    console.log("O.Opt MoveLinks - Output: Links moved successfully");
    return 0;
  }

  /**
  * Determines if UI adaptations for touch input should be applied
  * @param event - The input event to analyze
  * @returns True if touch-based UI adaptations should be applied, false otherwise
  */
  GetUIAdaptation(event) {
    console.log("O.Opt GetUIAdaptation - Input:", event);

    let isTouchInterface = false;

    // Check if we're already on a mobile platform
    if (GlobalData.optManager.isMobilePlatform) {
      isTouchInterface = true;
    }
    // Handle gesture events (from Hammer.js)
    else if (event.gesture) {
      // Check for pointer events
      if ('onpointerdown' in window) {
        if (event.gesture.srcEvent instanceof PointerEvent && event.gesture.srcEvent.pointerType == 'touch') {
          isTouchInterface = true;
        }
      }
      // Check for touch events
      else if ('ontouchstart' in window && event.gesture.srcEvent.type.indexOf('touch') != -1) {
        isTouchInterface = true;
      }
      // Mouse events don't trigger touch adaptations
      else if (event.gesture.srcEvent.type == 'mousedown') {
        isTouchInterface = false;
      }
    }
    // Handle direct events (not from Hammer.js)
    else {
      // Check for pointer events
      if ('onpointerdown' in window) {
        if (event instanceof PointerEvent && event.pointerType == 'touch') {
          isTouchInterface = true;
        }
      }
      // Check for touch events
      else if ('ontouchstart' in window && event.type.indexOf('touch') != -1) {
        isTouchInterface = true;
      }
      // Mouse events don't trigger touch adaptations
      else if (event.type == 'mousedown') {
        isTouchInterface = false;
      }
    }

    console.log("O.Opt GetUIAdaptation - Output:", isTouchInterface);
    return isTouchInterface;
  }


  /**
   * Deletes objects from the document
   * @param objectIds - Array of object IDs to delete
   * @param forceDelete - Whether to force deletion of objects with the NoDelete flag
   */
  DeleteObjects(objectIds, forceDelete) {
    console.log("O.Opt DeleteObjects - Input:", { objectIds, forceDelete });

    let objectIndex, objectCount, objectId, svgElement, overlayId;
    let overlayElement, objectData, hookCount, hookId, hookObject;
    let parentObjects = [];
    let layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, false);

    if (objectIds != null) {
      // Process each object ID in the array
      objectCount = objectIds.length ? objectIds.length : 0;

      for (objectIndex = objectCount - 1; objectIndex >= 0; objectIndex--) {
        objectId = objectIds[objectIndex];

        // Get the object from storage
        const objectBlock = GlobalData.objectStore.GetObject(objectId);

        if (objectBlock) {
          objectData = objectBlock.Data;

          // Skip objects with NoDelete flag if not forced
          if (
            objectData.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete &&
            bIsPrimaryStateManager &&
            !forceDelete
          ) {
            continue;
          }

          // Remove from Z-lists and selection
          this.RemoveFromAllZLists(objectId);
          this.RemoveFromSelectedList(objectId);

          // Mark for deletion in links
          this.SetLinkFlag(objectId, ConstantData.LinkFlags.SED_L_DELT);

          // Process hooks
          hookCount = objectData.hooks.length;
          for (let hookIndex = 0; hookIndex < hookCount; hookIndex++) {
            hookId = objectData.hooks[hookIndex].objid;

            if (hookId > 0) {
              hookObject = this.GetObjectPtr(hookId, true);

              if (hookObject) {
                hookObject.ChangeTarget(
                  hookId,
                  objectId,
                  objectData.hooks[hookIndex].cellid,
                  objectData.hooks[hookIndex].updhook,
                  objectData.hooks[hookIndex].connect,
                  false
                );
              }
            }
          }

          // Delete the object and collect parent objects
          const parentObjectId = objectData.DeleteObject();
          if (parentObjectId && parentObjects.indexOf(parentObjectId) < 0) {
            parentObjects.push(parentObjectId);
          }

          objectBlock.Delete();
        }

        // Remove SVG element
        svgElement = this.svgObjectLayer.GetElementByID(objectId);
        if (svgElement) {
          this.svgObjectLayer.RemoveElement(svgElement);
        }

        // Remove overlay elements
        overlayId = ConstantData.Defines.Action + objectId;
        overlayElement = this.svgOverlayLayer.GetElementByID(overlayId);

        if (overlayElement != null) {
          this.svgOverlayLayer.RemoveElement(overlayElement);
        }
      }

      // Process parent objects
      objectCount = parentObjects.length;
      for (objectIndex = 0; objectIndex < objectCount; objectIndex++) {
        switch (parentObjects[objectIndex].objecttype) {
          case ConstantData.ObjectTypes.SD_OBJT_NG_TIMELINE:
            if (GlobalData.optManager.GetObjectPtr(parentObjects[objectIndex].BlockID) != null) {
              GlobalData.optManager.Timeline_Format(parentObjects[objectIndex]);
            }
            break;
        }
      }
    }

    console.log("O.Opt DeleteObjects - Output: Objects deleted:", objectCount);
  }

  /**
   * Removes an object from all Z-order lists across all layers
   * @param objectId - ID of the object to remove
   */
  RemoveFromAllZLists(objectId) {
    console.log("O.Opt RemoveFromAllZLists - Input:", objectId);

    // Get the layers manager with preserved state
    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, true);
    const numberOfLayers = layersManager.nlayers;

    // Search through all layers for the object
    for (let layerIndex = 0; layerIndex < numberOfLayers; ++layerIndex) {
      const zList = layersManager.layers[layerIndex].zList;
      const indexInList = $.inArray(objectId, zList);

      if (indexInList != -1) {
        // Remove the object from the list when found
        zList.splice(indexInList, 1);
        console.log("O.Opt RemoveFromAllZLists - Output: Removed object from layer", layerIndex);
        return;
      }
    }

    console.log("O.Opt RemoveFromAllZLists - Output: Object not found in any layer");
  }

  /**
   * Removes an object from the selected objects list
   * @param objectId - ID of the object to remove from selection
   */
  RemoveFromSelectedList(objectId) {
    console.log("O.Opt RemoveFromSelectedList - Input:", objectId);

    // Get the current selected list (without preserving state)
    const selectedList = GlobalData.optManager.GetObjectPtr(
      GlobalData.optManager.theSelectedListBlockID,
      false
    );

    // Find the index of the object in the selection list
    const objectIndex = selectedList.indexOf(objectId);

    // Only proceed if the object is actually in the list
    if (objectIndex !== -1) {
      // Get a preserved copy of the selected list for modification
      const preservedList = GlobalData.optManager.GetObjectPtr(
        GlobalData.optManager.theSelectedListBlockID,
        true
      );

      // Remove the object from the selection list
      preservedList.splice(objectIndex, 1);

      // If this object was the target selection, clear the target selection
      const sessionData = GlobalData.optManager.GetObjectPtr(
        GlobalData.optManager.theSEDSessionBlockID,
        false
      );

      if (objectId === sessionData.tselect) {
        // Get preserved session data and clear the target selection
        const preservedSessionData = GlobalData.optManager.GetObjectPtr(
          GlobalData.optManager.theSEDSessionBlockID,
          true
        );
        preservedSessionData.tselect = -1;
      }
    }

    console.log("O.Opt RemoveFromSelectedList - Output: Object removed from selection");
  }

  /**
   * Retrieves a concatenated list of all objects across all layers in Z-order
   * @returns An array containing all object IDs in Z-order
   */
  ZList() {
    console.log("O.Opt ZList - Input: No parameters");

    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, false);
    let allObjectIds = [];

    // Iterate through all layers from bottom to top (reverse order)
    for (let layerIndex = layersManager.nlayers - 1; layerIndex >= 0; layerIndex--) {
      // Concatenate the z-list from current layer to our result array
      allObjectIds = allObjectIds.concat(layersManager.layers[layerIndex].zList);
    }

    console.log("O.Opt ZList - Output: Retrieved", allObjectIds.length, "objects");
    return allObjectIds;
  }

  /**
   * Checks if a URL is a blob URL
   * @param url - The URL to check
   * @returns True if the URL is a blob URL, false otherwise
   */
  IsBlobURL(url) {
    console.log("O.Opt IsBlobURL - Input:", url);

    const isBlobUrl = !!(url && url.length > 0 && 'blob:' === url.substring(0, 5));

    console.log("O.Opt IsBlobURL - Output:", isBlobUrl);
    return isBlobUrl;
  }

  /**
   * Calculates the counter-clockwise angle between two points in radians
   * @param startPoint - The starting point
   * @param endPoint - The ending point
   * @returns The counter-clockwise angle in radians
   */
  SD_GetCounterClockwiseAngleBetween2Points(startPoint, endPoint) {
    console.log("O.Opt SD_GetCounterClockwiseAngleBetween2Points - Input:", { startPoint, endPoint });

    const PI = ConstantData.Geometry.PI;

    // Calculate the differences in coordinates
    const deltaX = endPoint.x - startPoint.x;
    const deltaY = startPoint.y - endPoint.y;

    // Calculate the angle based on the position of the points
    let angle;
    if (deltaX === 0) {
      // Vertical line case
      angle = deltaY >= 0 ? PI / 2 : -PI / 2;
    } else if (deltaY === 0) {
      // Horizontal line case
      angle = deltaX >= 0 ? 0 : PI;
    } else {
      // General case - use arctangent
      angle = Math.atan2(deltaY, deltaX);
    }

    // Normalize angle to be between 0 and 2π
    if (angle < 0) {
      angle += 2 * PI;
    }

    console.log("O.Opt SD_GetCounterClockwiseAngleBetween2Points - Output:", angle);
    return angle;
  }

  /**
  * Gets the preserved Z-order list of objects from the front-most layer
  * @returns Array of object IDs in the front-most layer
  */
  FrontMostLayerZListPreserve() {
    console.log("O.Opt FrontMostLayerZListPreserve - Input: No parameters");

    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, true);
    const frontMostLayerZList = layersManager.layers[0].zList;

    console.log("O.Opt FrontMostLayerZListPreserve - Output: Retrieved front-most layer Z-list with",
      frontMostLayerZList.length, "objects");

    return frontMostLayerZList;
  }

  /**
   * Reverts to the previous edit mode from the edit mode history stack
   */
  UndoEditMode() {
    console.log("O.Opt UndoEditMode - Input: No parameters");

    // Get the edit mode history list or initialize empty array if it doesn't exist
    const editModeHistory = this.editModeList || [];

    // Only proceed if we have more than one mode in history (can go back)
    if (editModeHistory.length > 1) {
      // Remove the current mode
      editModeHistory.pop();

      // Get the previous mode
      const previousMode = editModeHistory[editModeHistory.length - 1];

      // Restore the previous edit mode without adding to history
      this.SetEditMode(previousMode.mode, previousMode.cursor, false, true);
    }

    console.log("O.Opt UndoEditMode - Output: Previous edit mode restored");
  }

  /**
   * Updates a hook connection between objects
   * @param objectId - ID of the object containing the hook
   * @param hookIndex - Index of the hook to update
   * @param targetObjectId - ID of the target object to connect to
   * @param hookPointType - Type of hook point to use
   * @param connectionPoint - Coordinates for the connection point
   * @param cellId - Optional cell ID for container objects
   * @returns 0 on success, 1 on failure
   */
  UpdateHook(objectId, hookIndex, targetObjectId, hookPointType, connectionPoint, cellId) {
    console.log("O.Opt UpdateHook - Input:", {
      objectId,
      hookIndex,
      targetObjectId,
      hookPointType,
      connectionPoint,
      cellId
    });

    let targetObject,
      previousTargetObject,
      hookCount,
      originalCellId = null,
      shouldCreateNewHook = false,
      hookWasDeleted = false;

    // Get the object that owns the hook (with preserved state)
    const sourceObject = this.GetObjectPtr(objectId, true);
    if (sourceObject == null) {
      console.log("O.Opt UpdateHook - Output: Failed to get source object");
      return 1;
    }

    // Store original hook count and cell ID if present
    hookCount = sourceObject.hooks.length;
    if (sourceObject.hooks.length > hookIndex && hookIndex >= 0) {
      originalCellId = sourceObject.hooks[hookIndex].cellId;
    }

    // Get links list (with preserved state)
    const linksList = this.GetObjectPtr(this.theLinksBlockID, true);
    if (linksList == null) {
      console.log("O.Opt UpdateHook - Output: Failed to get links list");
      return 1;
    }

    // Verify target object exists if provided
    if (targetObjectId >= 0) {
      targetObject = this.GetObjectPtr(targetObjectId, true);
      if (targetObject == null) {
        console.log("O.Opt UpdateHook - Output: Failed to get target object");
        return 1;
      }
    } else {
      cellId = null; // No cell ID if no target object
    }

    // Handle new hook creation (when hookIndex is negative)
    if (hookIndex < 0) {
      if (sourceObject.hooks.length < sourceObject.maxhooks && targetObjectId >= 0) {
        hookIndex = sourceObject.hooks.length;
        shouldCreateNewHook = true;
      }
    }
    // Handle existing hook updates or removal
    else if (hookCount > hookIndex) {
      // Check if we need to replace an existing hook
      if (sourceObject.hooks[hookIndex].objid != targetObjectId || originalCellId != cellId) {
        // Get the previous target object
        previousTargetObject = this.GetObjectPtr(sourceObject.hooks[hookIndex].objid, true);

        if (previousTargetObject) {
          // Notify previous target that the connection is changing
          previousTargetObject.ChangeTarget(
            sourceObject.hooks[hookIndex].objid,
            objectId,
            originalCellId,
            hookIndex,
            connectionPoint,
            false
          );
        }

        // Store hook count before deletion
        hookCount = sourceObject.hooks.length;

        // Remove the link between the objects
        this.DeleteLink(linksList, sourceObject.hooks[hookIndex].objid, objectId, originalCellId, 0, false);
        hookWasDeleted = true;

        // Remove the hook if it wasn't automatically removed by DeleteLink
        if (hookCount === sourceObject.hooks.length) {
          sourceObject.hooks.splice(hookIndex, 1);
        }

        // Update hook index to the end of the list
        hookIndex = sourceObject.hooks.length;
        shouldCreateNewHook = true;
      }
    }

    // Add or update the hook with the new target object
    if (targetObjectId >= 0 && hookIndex >= 0) {
      if (hookIndex >= sourceObject.hooks.length && sourceObject.hooks.length < sourceObject.maxhooks) {
        // Create a new hook
        sourceObject.hooks[sourceObject.hooks.length] = new Hook(targetObjectId, cellId, -1, hookPointType, connectionPoint);
      } else {
        // Update existing hook
        sourceObject.hooks[hookIndex].connect.x = connectionPoint.x;
        sourceObject.hooks[hookIndex].connect.y = connectionPoint.y;
        sourceObject.hooks[hookIndex].hookpt = hookPointType;
        sourceObject.hooks[hookIndex].objid = targetObjectId;
      }

      // Update the hook in the source object
      sourceObject.ChangeHook(hookIndex, true, connectionPoint);

      // Create link if needed
      if (shouldCreateNewHook) {
        this.InsertLink(linksList, objectId, hookIndex, 0);
      }

      // Notify target object about the new connection
      targetObject.ChangeTarget(targetObjectId, objectId, originalCellId, hookIndex, connectionPoint, true);
    }
    // Handle hook removal
    else if (hookWasDeleted) {
      // Check if object should be deleted on unhook
      if (sourceObject.extraflags & ConstantData.ExtraFlags.SEDE_DeleteOnUnhook) {
        this.DeleteObjects([sourceObject.BlockID]);
      }

      // Handle special case for network diagram events
      if (sourceObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT &&
        sourceObject &&
        sourceObject.datasetElemID > -1) {
        ListManager.SDData.DeleteRow(sourceObject.datasetElemID);
        sourceObject.datasetElemID = -1;
      }
    }

    // Update dimensions if needed
    if ((sourceObject.hooks.length === 2 || hookCount === 2) && sourceObject.Dimensions) {
      this.AddToDirtyList(objectId);
    }

    console.log("O.Opt UpdateHook - Output: Hook updated successfully");
    return 0;
  }


  /**
  * Changes a hook connection for a connector object
  * @param sourceObject - The source object containing the hook
  * @param hookIndex - Index of the hook being changed
  * @param isAdding - Whether the hook is being added (true) or removed (false)
  * @param hookData - Additional hook data
  */
  CN_ChangeHook(sourceObject, hookIndex, isAdding, hookData) {
    console.log("O.Opt CN_ChangeHook - Input:", {
      sourceObjectId: sourceObject.BlockID,
      hookIndex,
      isAdding,
      hasHookData: !!hookData
    });

    let connectorObject;
    let connectorId;
    let childConnectorId;
    let connectorStyle;
    let hasCoManagerFlag;
    let objectType;
    let objectSubtype;
    let childConnector;
    let connectionPoint = {};
    let objectsToDelete = [];

    // Handle hook addition
    if (isAdding) {
      // Check if source is a shape with hooks
      if (
        sourceObject.hooks &&
        sourceObject.hooks[hookIndex] &&
        sourceObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
      ) {
        // Find parent connector for the shape
        childConnectorId = Business.GetParentConnector(sourceObject.BlockID, null);
        if (childConnectorId >= 0) {
          // Get the connector object
          connectorObject = GlobalData.optManager.GetObjectPtr(childConnectorId, false);
          if (!connectorObject) {
            console.log("O.Opt CN_ChangeHook - Output: Failed (no connector object)");
            return;
          }

          // Skip special connector types
          if (connectorObject._IsFlowChartConnector()) {
            console.log("O.Opt CN_ChangeHook - Output: Skipped (flowchart connector)");
            return;
          }

          if (connectorObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH) {
            console.log("O.Opt CN_ChangeHook - Output: Skipped (cause-effect branch)");
            return;
          }

          if (connectorObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH) {
            console.log("O.Opt CN_ChangeHook - Output: Skipped (genogram branch)");
            return;
          }

          // Check for co-manager flags
          hasCoManagerFlag = connectorObject.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_CoManager;
          if (
            hasCoManagerFlag &&
            connectorObject.arraylist.hook.length - SDJS.ConnectorDefines.SEDA_NSkip >= 1
          ) {
            console.log("O.Opt CN_ChangeHook - Output: Skipped (co-manager limit reached)");
            return;
          }

          if (connectorObject.IsAsstConnector()) {
            console.log("O.Opt CN_ChangeHook - Output: Skipped (assistant connector)");
            return;
          }

          // Store object type and subtype
          objectType = connectorObject.objecttype;
          objectSubtype = connectorObject.subtype;

          // Update subtype for special object types
          if (
            sourceObject.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASKMAP ||
            sourceObject.subtype === ConstantData.ObjectSubTypes.SD_SUBT_HUBMAP
          ) {
            sourceObject.subtype = objectSubtype;
          }

          // Find child array for the current object
          connectorId = GlobalData.optManager.FindChildArray(sourceObject.BlockID, -1);

          // Create a new connector if needed
          if (connectorId < 0) {
            // Get appropriate connector style based on object type
            if (connectorObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_DECISIONTREE_CONNECTOR) {
              connectorStyle = gDecisionTreeManager.GetChildConnectorStyle(sourceObject);
            } else {
              connectorStyle = Business.GetChildConnectorStyle(sourceObject);
            }

            // Create new connector
            connectorId = Business.AddConnector(100, 100, connectorStyle, sourceObject.BlockID);

            if (connectorId >= 0) {
              childConnector = GlobalData.optManager.GetObjectPtr(connectorId, true);
            }

            if (!childConnector) {
              console.log("O.Opt CN_ChangeHook - Output: Failed to create child connector");
              return;
            }

            // Set connector properties
            childConnector.objecttype = objectType;
            childConnector.subtype = objectSubtype;

            // Set text flags for decision tree connectors
            if (objectType === ConstantData.ObjectTypes.SD_OBJT_DECISIONTREE_CONNECTOR) {
              childConnector.TextFlags = ConstantData.TextFlags.SED_TF_AttachC;
            }

            // Set connection point based on connector type
            if (hasCoManagerFlag) {
              connectionPoint.x = 0;
              connectionPoint.y = -ConstantData.SEDA_Styles.SEDA_CoManager;
            } else {
              connectionPoint = connectorStyle.connect;
            }

            // Update the hook for the new connector
            GlobalData.optManager.UpdateHook(
              connectorId,
              -1,
              sourceObject.BlockID,
              connectorStyle.hookpt,
              connectionPoint,
              null
            );

            // Update link flags and format the connector
            GlobalData.optManager.SetLinkFlag(sourceObject.BlockID, ConstantData.LinkFlags.SED_L_MOVE);
            childConnector.Pr_Format(connectorId);
            GlobalData.optManager.AddToDirtyList(connectorId);
          }

          // Special handling for mind map connectors
          if (objectType === ConstantData.ObjectTypes.SD_OBJT_MINDMAP_CONNECTOR) {
            gMindMapManager.ChangeHook(sourceObject, hookIndex, isAdding, hookData);
          }
        }
      }
    }
    // Handle hook removal
    else if (sourceObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE) {
      // Search information for finding child arrays
      const searchInfo = {
        lindex: -1,
        id: -1,
        hookpt: 0
      };

      // Find all child connectors and delete those without shapes
      while (GlobalData.optManager.FindChildArrayByIndex(sourceObject.BlockID, searchInfo) >= 0) {
        connectorId = searchInfo.id;
        if (connectorId >= 0 && GlobalData.optManager.CN_GetNShapes(connectorId) === 0) {
          objectsToDelete.push(connectorId);
          GlobalData.optManager.DeleteObjects(objectsToDelete, false);
        }
      }
    }

    console.log("O.Opt CN_ChangeHook - Output: Operation completed");
  }


  /**
   * Inserts a link between two objects in the links list
   * @param linksList - The list of links to insert into
   * @param hookObjectId - ID of the object that contains the hook
   * @param hookIndex - Index of the hook in the object's hooks array
   * @param flagValue - Optional flags to set on the link
   * @returns 0 on success, 1 on failure
   */
  InsertLink(linksList, hookObjectId, hookIndex, flagValue) {
    console.log("O.Opt InsertLink - Input:", {
      linksList: linksList?.length,
      hookObjectId,
      hookIndex,
      flagValue
    });

    // Get the hook object
    const hookObject = this.GetObjectPtr(hookObjectId, false);

    // Validation checks
    if (hookObject == null) {
      console.log("O.Opt InsertLink - Output: Failed to get hook object (1)");
      return 1;
    }

    if (hookIndex < 0 || hookIndex >= hookObject.hooks.length) {
      console.log("O.Opt InsertLink - Output: Invalid hook index (1)");
      return 1;
    }

    // Find position to insert the link
    const targetObjectId = hookObject.hooks[hookIndex].objid;
    let linkIndex = this.FindLink(linksList, targetObjectId, false);

    if (linkIndex >= 0) {
      // Check if this link already exists
      while (linkIndex < linksList.length && linksList[linkIndex].targetid === targetObjectId) {
        if (linksList[linkIndex].hookid == hookObjectId) {
          console.log("O.Opt InsertLink - Output: Link already exists (1)");
          return 1;
        }
        linkIndex++;
      }

      // Create and insert the new link
      const newLink = new Link(targetObjectId, hookObjectId, hookObject.hooks[hookIndex].cellid);

      // Set flags if provided
      if (flagValue) {
        newLink.flags = flagValue;
      }

      linksList.splice(linkIndex, 0, newLink);
    }

    console.log("O.Opt InsertLink - Output: Link inserted successfully (0)");
    return 0;
  }

  /**
   * Moves a connection highlight for an object
   * @param objectId - ID of the object to highlight
   * @param connectionPoint - The connection point coordinates
   * @param hookPointType - Type of hook point
   */
  MoveConnectHilite(objectId, connectionPoint, hookPointType) {
    console.log("O.Opt MoveConnectHilite - Input:", { objectId, connectionPoint, hookPointType });

    let targetId;
    let connectionIndex;
    let drawingObject = null;
    let highlightElement = null;
    let highlightId = null;
    let pointsList = [];
    let docScreenScale = this.svgDoc.docInfo.docToScreenScale;
    let connectionRadius = 0;

    targetId = objectId;

    // Increase highlight size at lower zoom levels for better visibility
    if (this.svgDoc.docInfo.docScale <= 0.5) {
      docScreenScale *= 2;
    }

    // Get the drawing object and determine connection point dimensions
    drawingObject = this.GetObjectPtr(objectId, false);
    if (drawingObject != null) {
      // Use different connection point sizes based on object type
      connectionRadius = drawingObject instanceof BaseLine
        ? ConstantData.Defines.CONNECTPT_LINE_DIM / docScreenScale
        : ConstantData.Defines.CONNECTPT_DIM / docScreenScale;

      // Create a list with the single connection point
      pointsList.push(connectionPoint);

      // Get perimeter points for the object
      connectionIndex = drawingObject.GetPerimPts(objectId, pointsList, null, false, hookPointType, -1);

      // If the object has a shape element, update its highlight
      if (this.svgObjectLayer.GetElementByID(targetId).GetElementByID(ConstantData.SVGElementClass.SHAPE) != null) {
        highlightId = 'hilite_' + targetId;
        highlightElement = this.svgHighlightLayer.GetElementByID(highlightId);

        if (highlightElement) {
          // Position the highlight element at the connection point
          highlightElement.SetPos(connectionIndex[0].x - connectionRadius, connectionIndex[0].y - connectionRadius);
        }
      }
    }

    console.log("O.Opt MoveConnectHilite - Output: Highlight moved to", connectionIndex ? connectionIndex[0] : "null");
  }

  /**
   * Removes a link between objects from the links list
   * @param linksList - The list of links to search in
   * @param targetId - ID of the target object
   * @param hookObjectId - Optional ID of the hook object to remove links for
   * @param cellId - Optional cell ID for container objects
   * @param hookPointType - Optional hook point type to filter by
   * @param skipHookRemoval - Whether to skip removing the actual hook (true) or not (false)
   * @returns 0 to indicate success
   */
  DeleteLink(linksList, targetId, hookObjectId, cellId, hookPointType, skipHookRemoval) {
    console.log("O.Opt DeleteLink - Input:", {
      targetId,
      hookObjectId,
      cellId,
      hookPointType,
      skipHookRemoval
    });

    // Find the first link with the target ID
    let linkIndex = this.FindLink(linksList, targetId, true);
    let shouldDeleteLink = false;
    let hookId = -1;

    // Default hookObjectId to -1 if undefined
    if (targetId === undefined) {
      hookObjectId = -1;
    }

    // Process each link with the target ID
    if (linkIndex >= 0) {
      while (linkIndex < linksList.length && linksList[linkIndex].targetid === targetId) {
        // Check if this link matches our criteria
        if (hookObjectId === -1 || linksList[linkIndex].hookid === hookObjectId) {
          shouldDeleteLink = true;
          hookId = linksList[linkIndex].hookid;

          // Check cell ID if provided
          if (cellId != null) {
            shouldDeleteLink = (cellId === linksList[linkIndex].cellid);
          }

          // Check hook type if requested
          if (hookId >= 0 && hookPointType !== 0) {
            shouldDeleteLink = this.IsHookType(hookId, targetId, hookPointType);
          }

          // Delete link and remove hook if matched and not skipping hook removal
          if (shouldDeleteLink) {
            if (hookId >= 0 && !skipHookRemoval) {
              this.RemoveHook(hookId, targetId, cellId);
            }
            linksList.splice(linkIndex, 1);
          } else {
            linkIndex++;
          }
        } else {
          linkIndex++;
        }
      }
    }

    console.log("O.Opt DeleteLink - Output: Links deleted successfully");
    return 0;
  }


  /**
     * Removes a hook connection from an object
     * @param objectId - ID of the object containing the hook
     * @param targetObjectId - ID of the target object to disconnect from
     * @param targetCellId - Optional cell ID for container connections
     * @returns 0 on success, 1 on failure
     */
  RemoveHook(objectId, targetObjectId, targetCellId) {
    console.log("O.Opt RemoveHook - Input:", { objectId, targetObjectId, targetCellId });

    // Get a preserved copy of the object for modification
    const sourceObject = this.GetObjectPtr(objectId, true);

    if (sourceObject == null) {
      console.log("O.Opt RemoveHook - Output: Failed to get object (1)");
      return 1;
    }

    // Search for the hook with matching target object ID and cell ID
    for (let hookIndex = 0; hookIndex < sourceObject.hooks.length; hookIndex++) {
      if (sourceObject.hooks[hookIndex].objid == targetObjectId) {
        // If cell ID is specified, it must match
        if (targetCellId !== null && targetCellId !== sourceObject.hooks[hookIndex].cellid) {
          continue;
        }

        // Notify the object that the hook is being removed
        sourceObject.ChangeHook(hookIndex, 0, sourceObject.hooks[hookIndex].connect);

        // Remove the hook from the array
        sourceObject.hooks.splice(hookIndex, 1);
        break;
      }
    }

    console.log("O.Opt RemoveHook - Output: Hook removed successfully (0)");
    return 0;
  }

  /**
   * Adds linked objects to a hook list based on specified criteria
   * @param linksList - The list of links to search in
   * @param hookList - The list of hooks to add to
   * @param startLinkIndex - Starting index in the links list
   * @param targetId - Target object ID to find hooks for
   * @param listCode - Code indicating which type of objects to include
   * @param recursionLevel - Current recursion level (for limiting depth)
   * @param boundingRect - Optional bounding rectangle to update
   * @returns Updated hook list with added objects
   */
  AddToHookList(linksList, hookList, startLinkIndex, targetId, listCode, recursionLevel, boundingRect) {
    console.log("O.Opt AddToHookList - Input:", {
      linksListLength: linksList.length,
      hookListCount: hookList.length,
      startLinkIndex,
      targetId,
      listCode,
      recursionLevel,
      hasBoundingRect: !!boundingRect
    });

    let hookObjectId, hookIndex, hookCounter, nextLinkIndex, otherObjectId, hookObject;
    let objectRect = {};
    let shouldAddToList = false;

    // Process all links for this target
    while (startLinkIndex < linksList.length && linksList[startLinkIndex].targetid == targetId) {
      // Get the ID of the hook object
      hookObjectId = linksList[startLinkIndex].hookid;
      hookObject = this.GetObjectPtr(hookObjectId, false);

      if (hookObject) {
        // Default to no specific hook
        hookIndex = -1;

        // Determine whether to add this object based on list code
        switch (listCode) {
          case ConstantData.ListCodes.SED_LC_MOVEHOOK:
          case ConstantData.ListCodes.SED_LC_MOVETARG:
            // For connector objects with exactly two hooks, check if the other
            // end is already in the hook list to prevent circular references
            if (
              hookObject.hooks.length == 2 &&
              (
                otherObjectId = hookObject.hooks[0].objid === targetId ? hookObject.hooks[1].objid : hookObject.hooks[0].objid,
                shouldAddToList = false,
                hookList.indexOf(otherObjectId) < 0
              )
            ) {
              break;
            }
            shouldAddToList = true;
            break;

          case ConstantData.ListCodes.SED_LC_CIRCTARG:
          case ConstantData.ListCodes.SED_LC_TOPONLY:
          case ConstantData.ListCodes.SED_LC_MOVETARGANDLINES:
            shouldAddToList = true;
            break;
        }

        // Skip if object is already in the hook list
        if (hookList.indexOf(hookObjectId) >= 0) {
          shouldAddToList = false;
        }

        // Add the object if conditions are met
        if (shouldAddToList) {
          // Find which hook connects to our target
          if (hookIndex < 0) {
            for (hookCounter = 0; hookCounter < hookObject.hooks.length; hookCounter++) {
              if (hookObject.hooks[hookCounter].objid == targetId) {
                hookIndex = hookCounter;
                break;
              }
            }
          }

          // If we found the matching hook, add the object to our list
          if (hookIndex >= 0 && hookObject.hooks[hookIndex].objid == targetId) {
            hookList.push(hookObjectId);

            // Add any enclosed objects for container shapes
            const enclosedObjects = hookObject.GetListOfEnclosedObjects(true);
            if (enclosedObjects.length) {
              GlobalData.optManager.JoinHookList(hookList, enclosedObjects);
            }

            // Update the bounding rectangle if provided
            if (
              boundingRect &&
              !(hookObject.flags & ConstantData.ObjFlags.SEDO_NotVisible)
            ) {
              objectRect = hookObject.GetMoveRect(true, true);
              boundingRect = Utils2.UnionRect(boundingRect, objectRect, boundingRect);
            }

            // For TOPONLY, don't recurse further
            // Otherwise, follow the graph in both directions
            if (listCode !== ConstantData.ListCodes.SED_LC_TOPONLY) {
              // Find links where this hook object is the target
              nextLinkIndex = this.FindLink(linksList, hookObjectId, true);
              if (nextLinkIndex >= 0) {
                hookList = this.AddToHookList(
                  linksList,
                  hookList,
                  nextLinkIndex,
                  hookObjectId,
                  listCode,
                  recursionLevel + 1,
                  boundingRect
                );
              }

              // For non-circular targets, follow other hooks on the object
              if (
                hookObject.hooks.length > 1 &&
                listCode !== ConstantData.ListCodes.SED_LC_CIRCTARG
              ) {
                hookList = this.GetTargetList(hookObjectId, linksList, hookList, boundingRect, listCode);
              }
            }

            // Special handling for circular targets at recursion level 0
            if (
              listCode === ConstantData.ListCodes.SED_LC_CIRCTARG &&
              recursionLevel === 0 &&
              hookObject.hooks.length > 1
            ) {
              for (hookCounter = 0; hookCounter < hookObject.hooks.length; hookCounter++) {
                if (hookCounter !== hookIndex) {
                  // Break if we find a loop (hook connects to itself)
                  if (hookObject.hooks[hookCounter].objid == hookObject.hooks[hookIndex].objid) {
                    break;
                  }
                  hookList.push(hookObject.hooks[hookIndex].objid);
                }
              }
            }
          }
        }
      }

      // Move to the next link
      startLinkIndex++;
    }

    console.log("O.Opt AddToHookList - Output: Updated hook list with", hookList.length, "items");
    return hookList;
  }

  /**
    * Notifies objects that a hooked object is moving
    * @param drawingObject - The object being moved
    * @param boundingBox - The bounding box of the moving object
    */
  HandleHookedObjectMoving(drawingObject, boundingBox) {
    console.log("O.Opt HandleHookedObjectMoving - Input:", {
      drawingObjectId: drawingObject.BlockID,
      boundingBox
    });

    let index = 0;
    let historyLength = 0;
    let connectedObject = null;

    // Handle the currently connected object
    if (
      this.LinkParams &&
      this.LinkParams.ConnectIndex >= 0 &&
      (connectedObject = this.GetObjectPtr(this.LinkParams.ConnectIndex, false))
    ) {
      if (connectedObject.HookedObjectMoving) {
        connectedObject.HookedObjectMoving({
          linkParams: this.LinkParams,
          movingShapeID: drawingObject.BlockID,
          movingShapeBBox: boundingBox
        });
      }
    }

    // Handle any previously connected objects in history
    if (this.LinkParams && this.LinkParams.ConnectIndexHistory.length > 0) {
      historyLength = this.LinkParams.ConnectIndexHistory.length;

      for (index = 0; index < historyLength; index++) {
        // Skip the current connect index
        if (this.LinkParams.ConnectIndexHistory[index] !== this.LinkParams.ConnectIndex) {
          connectedObject = this.GetObjectPtr(this.LinkParams.ConnectIndexHistory[index], false);

          if (connectedObject && connectedObject.HookedObjectMoving) {
            connectedObject.HookedObjectMoving({
              linkParams: this.LinkParams,
              movingShapeID: drawingObject.BlockID,
              movingShapeBBox: boundingBox
            });
          }
        }
      }
    }

    console.log("O.Opt HandleHookedObjectMoving - Output: Notified connected objects");
  }

  /**
     * Gets the ID of the object currently being edited for text
     * @returns The ID of the active text edit object, or null if none
     */
  GetActiveTextEdit() {
    console.log("O.Opt GetActiveTextEdit - Input: No parameters");

    let activeTextEditObjectId = null;
    const textEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);

    if (textEditSession.theActiveTextEditObjectID != -1) {
      activeTextEditObjectId = textEditSession.theActiveTextEditObjectID;
    }

    console.log("O.Opt GetActiveTextEdit - Output:", activeTextEditObjectId);
    return activeTextEditObjectId;
  }

  /**
     * Checks if there is an existing link between two objects
     * @param objectId1 - ID of the first object
     * @param objectId2 - ID of the second object
     * @returns True if a link exists between the objects, false otherwise
     */
  HasExistingLink(objectId1, objectId2) {
    console.log("O.Opt HasExistingLink - Input:", { objectId1, objectId2 });

    // Helper function to check if source object has a hook to target object
    function hasHookToTarget(sourceId, targetId) {
      const sourceObject = GlobalData.optManager.GetObjectPtr(sourceId, false);

      // Check each hook in the source object
      for (let hookIndex = 0; hookIndex < sourceObject.hooks.length; hookIndex++) {
        if (sourceObject.hooks[hookIndex].objid == targetId) {
          return true;
        }
      }
      return false;
    }

    // Check links in both directions
    const linkExists = !(!hasHookToTarget(objectId1, objectId2) && !hasHookToTarget(objectId2, objectId1));

    console.log("O.Opt HasExistingLink - Output:", linkExists);
    return linkExists;
  }

  /**
   * Verifies if a link between objects is valid
   * @param sourceObject - The source object containing hooks
   * @param linkData - The link data to verify
   * @returns Hook index if link is valid, -1 if link should be deleted
   */
  VerifyLink(sourceObject, linkData) {
    console.log("O.Opt VerifyLink - Input:", { sourceObjectId: sourceObject.BlockID, linkData });

    // Get the target object
    const targetObject = this.GetObjectPtr(linkData.targetid, false);
    const linkFlags = ListManager.LinkFlags;

    // Check if target object exists
    if (targetObject == null) {
      // Mark link for deletion if target object doesn't exist
      linkData.flags = Utils2.SetFlag(linkData.flags, linkFlags.SED_L_DELL, true);
      console.log("O.Opt VerifyLink - Output: Target object doesn't exist (-1)");
      return -1;
    }

    // Check each hook in the source object for a matching target
    for (let hookIndex = 0; hookIndex < sourceObject.hooks.length; hookIndex++) {
      if (sourceObject.hooks[hookIndex].objid === linkData.targetid &&
        sourceObject.hooks[hookIndex].cellid === linkData.cellid) {

        // If no cell ID, link is valid
        if (sourceObject.hooks[hookIndex].cellid === null) {
          console.log("O.Opt VerifyLink - Output: Valid link found at index", hookIndex);
          return hookIndex;
        }

        // If there is a cell ID, verify it exists in the table
        const tableData = targetObject.GetTable(false);
        const cellExists = this.Table_GetCellWithID(tableData, sourceObject.hooks[hookIndex].cellid);

        if (cellExists) {
          console.log("O.Opt VerifyLink - Output: Valid table cell link found at index", hookIndex);
          return hookIndex;
        } else {
          // Mark link for deletion if cell doesn't exist
          linkData.flags = Utils2.SetFlag(linkData.flags, linkFlags.SED_L_DELL, true);
          console.log("O.Opt VerifyLink - Output: Cell doesn't exist (-1)");
          return -1;
        }
      }
    }

    // No matching hook found
    console.log("O.Opt VerifyLink - Output: No matching hook found (-1)");
    return -1;
  }

  /**
     * Checks if a point intersects with a line
     * @param lineObject - The line object to check
     * @param point - The point to test for intersection
     * @returns True if the point intersects with the line, false otherwise
     */
  LineCheckPoint(lineObject, point) {
    console.log("O.Opt LineCheckPoint - Input:", { lineObject: lineObject.BlockID, point });

    // Create a copy of the point to avoid modifying the original
    const testPoint = Utils1.DeepCopy(point);

    // Create an array with the line's start and end points
    const linePoints = [];
    linePoints.push(new Point(lineObject.StartPoint.x, lineObject.StartPoint.y));
    linePoints.push(new Point(lineObject.EndPoint.x, lineObject.EndPoint.y));

    // Test if the point intersects with the line, considering line thickness
    const result = Utils3.LineDStyleHit(linePoints, testPoint, lineObject.StyleRecord.Line.Thickness, 0, 0) !== 0;

    console.log("O.Opt LineCheckPoint - Output:", result);
    return result;
  }

  /**
   * Checks if a point intersects with an arc or curved shape
   * @param drawingObject - The object containing the arc to check
   * @param testPoint - The point to test for intersection
   * @returns True if the point intersects with the arc, false otherwise
   */
  ArcCheckPoint(drawingObject, testPoint) {
    console.log("O.Opt ArcCheckPoint - Input:", { drawingObject: drawingObject.BlockID, testPoint });

    // Get the polygon points that represent the arc
    const polyPoints = drawingObject.GetPolyPoints(
      ConstantData.Defines.NPOLYPTS,
      false,
      false,
      false,
      null
    );

    // Check if point intersects with the line using the line thickness
    const isIntersecting = Utils3.LineDStyleHit(
      polyPoints,
      testPoint,
      drawingObject.StyleRecord.lineThickness,
      0,
      null
    ) !== 0;

    console.log("O.Opt ArcCheckPoint - Output:", isIntersecting);
    return isIntersecting;
  }

  /**
     * Cleans up connector hooks after object modifications
     * @param connectorId - ID of the connector to clean up
     * @param shapeId - ID of the shape that may have hooks
     */
  CleanupHooks(connectorId, shapeId) {
    console.log("O.Opt CleanupHooks - Input:", { connectorId, shapeId });

    // Get the connector object
    const connectorObject = this.GetObjectPtr(connectorId, false);

    // Get the shape object
    const shapeObject = this.GetObjectPtr(shapeId, false);

    // Check if we have a valid connector and shape
    if (
      connectorObject &&
      connectorObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
      !(connectorObject.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn) > 0 &&
      shapeObject &&
      shapeObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
    ) {
      // Find child array for the shape
      const childConnectorId = GlobalData.optManager.FindChildArray(shapeId, connectorId);

      if (childConnectorId >= 0) {
        // Check if the connector has no shapes attached
        if (GlobalData.optManager.CN_GetNShapes(childConnectorId) === 0) {
          // Delete the orphaned connector
          const objectsToDelete = [];
          objectsToDelete.push(childConnectorId);
          GlobalData.optManager.DeleteObjects(objectsToDelete, false);

          console.log("O.Opt CleanupHooks - Output: Deleted orphaned connector", childConnectorId);
          return;
        }
      }
    }

    console.log("O.Opt CleanupHooks - Output: No cleanup needed");
  }

  /**
     * Determines if two lines intersect and returns the intersection point
     * @param line1 - First line object
     * @param line2 - Second line object
     * @param resultPoint - Object to store intersection point coordinates
     * @returns True if the lines intersect, false otherwise
     */
  Lines_Intersect(line1, line2, resultPoint) {
    console.log("O.Opt Lines_Intersect - Input:", {
      line1: { start: line1.StartPoint, end: line1.EndPoint },
      line2: { start: line2.StartPoint, end: line2.EndPoint }
    });

    // Create a temporary point to avoid modifying resultPoint until we confirm intersection
    const tempPoint = {
      x: resultPoint.x,
      y: resultPoint.y
    };

    // Get the intersection point
    const hasIntersection = this.GetIntersectPt(
      line1.StartPoint,
      line1.EndPoint,
      line2.StartPoint,
      line2.EndPoint,
      line2.Frame,
      tempPoint
    );

    // Check if intersection exists and is within line1's frame boundaries
    if (hasIntersection &&
      tempPoint.x >= line1.Frame.x &&
      tempPoint.x <= line1.Frame.x + line1.Frame.width &&
      tempPoint.y >= line1.Frame.y &&
      tempPoint.y <= line1.Frame.y + line1.Frame.height) {

      // Update the result point with intersection coordinates
      resultPoint.x = tempPoint.x;
      resultPoint.y = tempPoint.y;

      console.log("O.Opt Lines_Intersect - Output: Lines intersect at", resultPoint);
      return true;
    }

    console.log("O.Opt Lines_Intersect - Output: Lines do not intersect");
    return false;
  }

  /**
   * Determines if an object is a UI element that should be hidden in tables
   * @param drawingObject - The drawing object to check
   * @returns True if the object is a UI element, false otherwise
   */
  Table_HideUI(drawingObject) {
    console.log("O.Opt Table_HideUI - Input:", drawingObject ? drawingObject.BlockID : null);

    const objectTypes = ConstantData.ObjectTypes;
    const isUIElement = drawingObject.objecttype === objectTypes.SD_OBJT_UIELEMENT;

    console.log("O.Opt Table_HideUI - Output:", isUIElement);
    return isUIElement;
  }

  /**
    * Creates an inflated outline around a polyline with specified thickness
    * @param points - The original polyline points
    * @param thickness - The thickness to inflate by
    * @param isClosed - Whether the polyline is closed
    * @param isOutward - Whether to inflate outward (true) or inward (false)
    * @returns The inflated polyline points
    */
  InflateLine(points, thickness, isClosed, isOutward) {
    console.log("O.Opt InflateLine - Input:", {
      pointCount: points.length,
      thickness,
      isClosed,
      isOutward
    });

    let windingDirection,
      pointIndex,
      angleIndex,
      angleCompare,
      currentAngle,
      segmentOffset,
      segmentCount;

    let outlinePoints = [];
    let tempPoints = [];
    let segmentInfo = {};

    // Helper function to calculate distance between two points
    function getDistance(point1, point2) {
      const deltaX = point2.x - point1.x;
      const deltaY = point2.y - point1.y;
      return Utils2.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    // Helper function to check if angles are close enough (within threshold)
    function areAnglesClose(angle1, angle2, threshold) {
      const normalizedAngle1 = angle1 - Math.PI / 2;
      angle1 -= normalizedAngle1;

      angle2 -= normalizedAngle1;
      if (angle2 < 0) {
        angle2 += 2 * Math.PI;
      }
      if (angle2 > 2 * Math.PI) {
        angle2 -= 2 * Math.PI;
      }

      return Math.abs(angle1 - angle2) <= threshold;
    }

    // Helper function to scale a polygon uniformly around its center
    function scalePolygon(polygonPoints, offsetDistance) {
      let scaledPoints = [];
      let boundingRect = {};

      // Make a deep copy of the points and calculate bounding rectangle
      scaledPoints = Utils1.DeepCopy(polygonPoints);
      Utils2.GetPolyRect(boundingRect, scaledPoints);

      // Center the points around origin for scaling
      for (pointIndex = 0; pointIndex < scaledPoints.length; pointIndex++) {
        scaledPoints[pointIndex].x -= boundingRect.x;
        scaledPoints[pointIndex].y -= boundingRect.y;
      }

      // Calculate scale factor based on desired inflation
      const doubleOffset = 2 * offsetDistance;
      const maxDimension = Math.max(boundingRect.width, boundingRect.height);

      // If the inflation is larger than the largest dimension, just return the original
      if (doubleOffset > maxDimension) {
        return polygonPoints;
      }

      // Calculate scale factor and apply it
      const scaleFactor = (maxDimension + doubleOffset) / maxDimension;
      for (pointIndex = 0; pointIndex < scaledPoints.length; pointIndex++) {
        scaledPoints[pointIndex].x *= scaleFactor;
        scaledPoints[pointIndex].y *= scaleFactor;

        // Position back to original location, adjusted by offset
        scaledPoints[pointIndex].x += boundingRect.x - offsetDistance;
        scaledPoints[pointIndex].y += boundingRect.y - offsetDistance;
      }

      return scaledPoints;
    }

    // Helper function to calculate a midpoint with proportional extension
    function calculateProportionalMidpoint(startPoint, endPoint, projectionPoint, startRef, endRef) {
      let resultPoints = [];
      let startDistance = getDistance(startPoint, endPoint);
      let projectionDistance = getDistance(startPoint, projectionPoint);

      // Calculate the scaling factor based on distances
      let scaleFactor = startDistance > 0 ? projectionDistance / startDistance : 0;
      let refDistance = getDistance(startRef, endRef);

      // Create three points for rotation calculation
      resultPoints = [
        { x: startRef.x, y: startRef.y },
        { x: 0, y: 0 },
        { x: endRef.x, y: endRef.y }
      ];

      // Calculate the angle between the reference points and rotate to align horizontally
      let angle = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(startRef, endRef);
      Utils3.RotatePointsAboutPoint(resultPoints[0], -angle, resultPoints);

      // Calculate the midpoint with proportional distance
      resultPoints[1].y = resultPoints[0].y;
      if (resultPoints[2].x > resultPoints[0].x) {
        resultPoints[1].x = resultPoints[0].x + refDistance * scaleFactor;
      } else {
        resultPoints[1].x = resultPoints[0].x - refDistance * scaleFactor;
      }

      // Rotate back to original orientation
      Utils3.RotatePointsAboutPoint(resultPoints[0], angle, resultPoints);

      return resultPoints[1];
    }

    // Adjust segment offset based on thickness
    segmentOffset = thickness / 2;
    if (segmentOffset < 3) {
      segmentOffset = 3;
    } else if (segmentOffset > 5) {
      segmentOffset = 5;
    }

    // Calculate the initial outline
    outlinePoints = this.CalcPolyOutline(points, thickness, isClosed, isOutward, segmentOffset, segmentInfo);

    // If outline calculation failed or had to insert segments, fall back to scaling
    if (outlinePoints === null || segmentInfo.segmentsInserted) {
      const fallbackResult = scalePolygon(points, isOutward ? thickness : -thickness);
      console.log("O.Opt InflateLine - Output (fallback to scaling):", fallbackResult.length);
      return fallbackResult;
    }

    // For closed shapes, ensure the outline is properly closed
    if (isClosed) {
      outlinePoints.push(new Point(outlinePoints[0].x, outlinePoints[0].y));
    }

    // Adjust winding direction based on parameters
    windingDirection = this.GetPolygonWindingDirection(points);
    if (windingDirection === -1 && isOutward) {
      outlinePoints.reverse();
    } else if (windingDirection === 1 && !isOutward) {
      outlinePoints.reverse();
    }

    // Verify the outline by trying to calculate another outline (reversed direction)
    if (this.CalcPolyOutline(outlinePoints, thickness, isClosed, !isOutward, segmentOffset, segmentInfo) === null ||
      segmentInfo.segmentsInserted) {
      const fallbackResult = scalePolygon(points, isOutward ? thickness : -thickness);
      console.log("O.Opt InflateLine - Output (fallback after verification):", fallbackResult.length);
      return fallbackResult;
    }

    // Process angles to ensure smooth transitions
    segmentCount = points.length;
    let outlineCount = outlinePoints.length;

    while (--outlineCount > 0 && --segmentCount > 0) {
      // Calculate angle between current segments
      const currentAngle = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(
        outlinePoints[outlineCount - 1],
        outlinePoints[outlineCount]
      );

      // Check if original and outline angles match
      if (!areAnglesClose(
        GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(
          points[segmentCount - 1],
          points[segmentCount]
        ),
        currentAngle,
        0.01
      )) {
        // Try to find a matching angle and insert interpolated points
        for (pointIndex = segmentCount - 1; pointIndex >= 0; pointIndex--) {
          if (areAnglesClose(
            GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(
              points[pointIndex],
              points[segmentCount]
            ),
            currentAngle,
            0.01
          )) {
            // Insert interpolated points
            for (angleIndex = tempPoints.length - 1; angleIndex >= 0; angleIndex--) {
              outlinePoints.splice(
                outlineCount,
                0,
                calculateProportionalMidpoint(
                  points[segmentCount],
                  points[segmentCount - tempPoints.length],
                  tempPoints[angleIndex],
                  outlinePoints[outlineCount],
                  outlinePoints[outlineCount - 1]
                )
              );
            }
            segmentCount -= tempPoints.length;
            tempPoints = [];
            break;
          }
          tempPoints.push(new Point(points[pointIndex].x, points[pointIndex].y));
        }

        if (tempPoints.length > 0) {
          break;
        }
      }
    }

    // If the resulting outline has a different point count, fall back to scaling
    if (outlinePoints.length !== points.length) {
      outlinePoints = scalePolygon(points, isOutward ? thickness : -thickness);
    }

    console.log("O.Opt InflateLine - Output:", outlinePoints.length);
    return outlinePoints;
  }

  /**
     * Calculates an outline for a polyline with specified thickness
     * @param points - Array of points defining the polyline
     * @param thickness - Thickness of the outline
     * @param isClosed - Whether the polyline is closed (true) or open (false)
     * @param isOutward - Whether the outline should go outward (true) or inward (false)
     * @param segmentStep - Optional step size between segments
     * @param resultInfo - Optional object to store information about the operation
     * @returns Array of points defining the outline or null if calculation failed
     */
  CalcPolyOutline(points, thickness, isClosed, isOutward, segmentStep, resultInfo) {
    console.log("O.Opt CalcPolyOutline - Input:", {
      pointCount: points.length,
      thickness,
      isClosed,
      isOutward,
      segmentStep
    });

    let segmentCount;
    let segmentIndex;
    let lastSegmentIndex;
    let searchIndex;
    let currentStep;
    let previousPoint;
    let startIndex;
    let increment;
    let foundIntersection;

    const resultPoints = [];
    const segments = [];
    let segmentCounter = 0;
    const intersectionPoint = { x: 0, y: 0 };
    const maxDistance = 100000;

    // Need at least two points to create an outline
    if (points.length < 2) {
      console.log("O.Opt CalcPolyOutline - Output: Insufficient points (null)");
      return null;
    }

    // Determine the winding direction of the polygon
    let windingDirection = 1;
    if (isClosed) {
      for (segmentIndex = 0; segmentIndex < points.length - 1; segmentIndex++) {
        (points[segmentIndex + 1].x - points[segmentIndex].x) *
          (points[segmentIndex + 1].y + points[segmentIndex].y);
      }
      windingDirection = this.GetPolygonWindingDirection(points);
    }

    // Adjust winding direction based on whether outline should go outward or inward
    if (!isOutward) {
      windingDirection = -windingDirection;
    }

    // Determine starting point and increment direction
    if (windingDirection < 1) {
      startIndex = points.length - 1;
      increment = -1;
    } else {
      startIndex = 0;
      increment = points.length;
    }

    // For zero thickness, just return a copy of the original points
    if (!thickness) {
      console.log("O.Opt CalcPolyOutline - Output: No thickness, returning copy of input points");
      return Utils1.DeepCopy(points);
    }

    // Initialize variables for segment creation
    segmentCounter = 0;
    previousPoint = startIndex - windingDirection;

    // Use provided segment step or calculate based on thickness
    if (segmentStep) {
      currentStep = segmentStep;
    } else {
      currentStep = thickness / 2;
      if (currentStep < 3) currentStep = 3;
      else if (currentStep > 5) currentStep = 5;
    }

    // Create segments for each point
    for (segmentIndex = startIndex; segmentIndex != increment; segmentIndex += windingDirection) {
      // Handle wrap-around for closed shapes
      if (previousPoint < 0 || previousPoint > points.length - 1) {
        if (!isClosed) {
          previousPoint = segmentIndex;
          continue;
        }
        previousPoint = previousPoint < 0 ? points.length - 1 : 0;
      }

      // Special handling for last segment
      if (segmentIndex == increment - windingDirection) {
        currentStep = 2;
      }

      // Skip segments that are too short
      if (Utils1.DeltaPoints(points[segmentIndex], points[previousPoint]) < currentStep) {
        continue;
      }

      // Create segment data for current point
      const segmentData = new SegmentData();
      segmentData.origSeg.start = Utils1.DeepCopy(points[previousPoint]);
      segmentData.origSeg.end = Utils1.DeepCopy(points[segmentIndex]);

      // Calculate offset segment
      Utils1.CalcExtendedOffsetSegment(segmentData, thickness, 2, maxDistance);

      segmentData.clipSeg.start = Utils1.DeepCopy(segmentData.extSeg.start);
      segmentData.clipSeg.end = Utils1.DeepCopy(segmentData.extSeg.end);

      // Merge with previous segment if angle is the same
      if (segmentCounter > 0 && segmentData.angle == segments[segmentCounter - 1].angle) {
        segments[segmentCounter - 1].origSeg.end = Utils1.DeepCopy(segmentData.origSeg.end);
        segments[segmentCounter - 1].clipSeg.end = Utils1.DeepCopy(segmentData.clipSeg.end);
        segments[segmentCounter - 1].extSeg.end = Utils1.DeepCopy(segmentData.extSeg.end);
        segments[segmentCounter - 1].extSeg.endExt = Utils1.DeepCopy(segmentData.extSeg.endExt);
        segments[segmentCounter - 1].extSeg.endRay = Utils1.DeepCopy(segmentData.extSeg.endRay);
      } else {
        segments.push(segmentData);
        segmentCounter++;
      }

      previousPoint = segmentIndex;
    }

    // If no segments were created, return null
    if (!segmentCounter) {
      console.log("O.Opt CalcPolyOutline - Output: No segments created (null)");
      return null;
    }

    // If only one segment, return simple outline
    if (segmentCounter == 1) {
      resultPoints.push(segments[0].clipSeg.start);
      resultPoints.push(segments[0].clipSeg.end);
      console.log("O.Opt CalcPolyOutline - Output: Single segment outline created", resultPoints);
      return resultPoints;
    }

    // Connect segments with proper intersections
    lastSegmentIndex = segmentCounter - 1;

    for (segmentIndex = 0; segmentIndex < segmentCounter; segmentIndex++) {
      // Special handling for first segment of non-closed polyline
      if (!isClosed && segmentIndex === 0) {
        lastSegmentIndex = segmentIndex;
        continue;
      }

      // Process segment intersection with previous segment
      if (Utils1.compareAngle(segments[segmentIndex].angle, segments[lastSegmentIndex].angle) > 0) {
        if (Utils1.CalcSegmentIntersect(
          segments[lastSegmentIndex].clipSeg.start,
          segments[lastSegmentIndex].extSeg.endExt,
          segments[segmentIndex].extSeg.startExt,
          segments[segmentIndex].clipSeg.end,
          intersectionPoint
        )) {
          // Use intersection point for both segments
          segments[lastSegmentIndex].clipSeg.end = Utils1.DeepCopy(intersectionPoint);
          segments[segmentIndex].clipSeg.start = Utils1.DeepCopy(intersectionPoint);
        } else if (Utils1.DeltaAngle(segments[segmentIndex].angle, segments[lastSegmentIndex].angle) < 15) {
          // For small angles, use midpoint
          segments[lastSegmentIndex].clipSeg.end.x = (segments[lastSegmentIndex].extSeg.end.x + segments[segmentIndex].extSeg.start.x) / 2;
          segments[lastSegmentIndex].clipSeg.end.y = (segments[lastSegmentIndex].extSeg.end.y + segments[segmentIndex].extSeg.start.y) / 2;
          segments[segmentIndex].clipSeg.start = Utils1.DeepCopy(segments[lastSegmentIndex].clipSeg.end);
        } else {
          // For larger angles, use extended points and insert a connecting segment
          segments[lastSegmentIndex].clipSeg.end = Utils1.DeepCopy(segments[lastSegmentIndex].extSeg.endExt);
          segments[segmentIndex].clipSeg.start = Utils1.DeepCopy(segments[segmentIndex].extSeg.startExt);
          Utils1.InsertSegment(segments, segmentIndex, segments[lastSegmentIndex].clipSeg.end, segments[segmentIndex].clipSeg.start, thickness, 2, maxDistance);
          segmentCounter++;
          segmentIndex++;
          resultInfo.segmentsInserted = true;
        }
      }
      lastSegmentIndex = segmentIndex;
    }

    // Perform second pass to check for intersections and fix any issues
    lastSegmentIndex = 0;
    for (segmentIndex = 1; segmentIndex < segmentCounter; segmentIndex++) {
      foundIntersection = false;

      // Check if segments are obtuse and adjacent
      if (Utils1.AreSegmentsObtuse(segments, segmentCounter, segmentIndex, lastSegmentIndex) &&
        Utils1.AreSegmentsAjacent(segmentCounter, segmentIndex, lastSegmentIndex)) {
        foundIntersection = true;
      }
      // Check for direct intersection
      else if (Utils1.CalcSegmentIntersect(
        segments[lastSegmentIndex].clipSeg.start,
        segments[lastSegmentIndex].clipSeg.end,
        segments[segmentIndex].clipSeg.start,
        segments[segmentIndex].clipSeg.end,
        intersectionPoint
      )) {
        foundIntersection = true;
        segments[lastSegmentIndex].clipSeg.end = Utils1.DeepCopy(intersectionPoint);
        segments[segmentIndex].clipSeg.start = Utils1.DeepCopy(intersectionPoint);
      }
      // Check for alignment
      else if (Utils1.SegmentsInAlignment(segments, segmentCounter, segmentIndex, lastSegmentIndex)) {
        foundIntersection = true;
        segments[lastSegmentIndex].clipSeg.end.x = (segments[lastSegmentIndex].clipSeg.end.x + segments[segmentIndex].clipSeg.start.x) / 2;
        segments[lastSegmentIndex].clipSeg.end.y = (segments[lastSegmentIndex].clipSeg.end.y + segments[segmentIndex].clipSeg.start.y) / 2;
        segments[segmentIndex].clipSeg.start = segments[lastSegmentIndex].clipSeg.end;
      }
      // Check for intersections with earlier segments
      else if (lastSegmentIndex > 0) {
        for (searchIndex = lastSegmentIndex - 1; searchIndex >= 0 && !foundIntersection && !(searchIndex < 0);) {
          if (Utils1.isEmptySeg(segments[searchIndex].clipSeg)) {
            searchIndex--;
          } else {
            // If we're not at the last segment and segments are obtuse, break
            if (segmentIndex != segmentCounter - 1 &&
              Utils1.AreSegmentsObtuse(segments, segmentCounter, segmentIndex, searchIndex)) {
              break;
            }

            // Check for intersection with earlier segment
            if (Utils1.CalcSegmentIntersect(
              segments[searchIndex].clipSeg.start,
              segments[searchIndex].clipSeg.end,
              segments[segmentIndex].clipSeg.start,
              segments[segmentIndex].clipSeg.end,
              intersectionPoint
            )) {
              lastSegmentIndex = searchIndex;
              segments[searchIndex].clipSeg.end = Utils1.DeepCopy(intersectionPoint);
              segments[segmentIndex].clipSeg.start = Utils1.DeepCopy(intersectionPoint);
              foundIntersection = true;
              break;
            }

            // Special handling for last segment
            if (Utils1.isEnd(segmentIndex, segments.length, isClosed) &&
              Utils1.DeltaAngle(segments[segmentIndex].angle, segments[searchIndex].angle) > 0 &&
              Utils1.CalcSegmentIntersect(
                segments[searchIndex].clipSeg.start,
                segments[searchIndex].extSeg.endRay,
                segments[segmentIndex].clipSeg.start,
                segments[segmentIndex].clipSeg.end,
                intersectionPoint
              )) {
              lastSegmentIndex = searchIndex;
              segments[searchIndex].clipSeg.end = Utils1.DeepCopy(intersectionPoint);
              segments[segmentIndex].clipSeg.start = Utils1.DeepCopy(intersectionPoint);
              foundIntersection = true;
              break;
            }

            searchIndex--;
          }
        }
      }

      // Update segments based on intersection results
      if (foundIntersection) {
        // Mark all segments between last and current as empty
        for (searchIndex = lastSegmentIndex + 1; searchIndex < segmentIndex;) {
          segments[searchIndex].clipSeg.end = Utils1.DeepCopy(segments[searchIndex].clipSeg.start);
          searchIndex++;
        }
        lastSegmentIndex = segmentIndex;
      }
      // Handle end segments
      else if (Utils1.isEnd(segmentIndex, segments.length, isClosed)) {
        segments[lastSegmentIndex].clipSeg.end = Utils1.DeepCopy(segments[segmentIndex].extSeg.end);
        // Mark remaining segments as empty
        for (searchIndex = lastSegmentIndex + 1; searchIndex < segmentCounter;) {
          segments[searchIndex].clipSeg.end = Utils1.DeepCopy(segments[searchIndex].clipSeg.start);
          searchIndex++;
        }
      } else {
        segments[segmentIndex].clipSeg.end = Utils1.DeepCopy(segments[segmentIndex].clipSeg.start);
      }
    }

    // Special handling for closed polylines to connect start and end points
    if (isClosed) {
      let firstValidIndex = -1;
      let lastValidIndex = -1;

      // Find first valid segment
      for (segmentIndex = 0; segmentIndex < segmentCounter; segmentIndex++) {
        if (!Utils1.isEmptySeg(segments[segmentIndex].clipSeg)) {
          firstValidIndex = segmentIndex;
          break;
        }
      }

      // Find last valid segment
      for (segmentIndex = segmentCounter - 1; segmentIndex >= 0; segmentIndex--) {
        if (!Utils1.isEmptySeg(segments[segmentIndex].clipSeg)) {
          lastValidIndex = segmentIndex;
          break;
        }
      }

      // If both valid segments exist, try to connect them
      if (firstValidIndex >= 0 && lastValidIndex >= 0) {
        foundIntersection = false;

        for (segmentIndex = firstValidIndex; !foundIntersection && segmentIndex < lastValidIndex; segmentIndex++) {
          lastSegmentIndex = lastValidIndex;

          // Check if segments are obtuse and adjacent
          if (Utils1.AreSegmentsObtuse(segments, segmentCounter, segmentIndex, lastSegmentIndex) &&
            Utils1.AreSegmentsAjacent(segmentCounter, segmentIndex, lastSegmentIndex)) {
            foundIntersection = true;
          }
          // Check for direct intersection
          else if (Utils1.CalcSegmentIntersect(
            segments[lastSegmentIndex].clipSeg.start,
            segments[lastSegmentIndex].clipSeg.end,
            segments[segmentIndex].clipSeg.start,
            segments[segmentIndex].clipSeg.end,
            intersectionPoint
          )) {
            foundIntersection = true;
            segments[lastSegmentIndex].clipSeg.end = Utils1.DeepCopy(intersectionPoint);
            segments[segmentIndex].clipSeg.start = Utils1.DeepCopy(intersectionPoint);
          }
          // Check for alignment
          else if (Utils1.SegmentsInAlignment(segments, segmentCounter, segmentIndex, lastSegmentIndex)) {
            foundIntersection = true;
          }
          // Check for intersections with earlier segments
          else {
            for (searchIndex = lastSegmentIndex - 1; searchIndex > segmentIndex && !foundIntersection;) {
              if (Utils1.isEmptySeg(segments[searchIndex].clipSeg)) {
                searchIndex--;
              } else {
                if (Utils1.AreSegmentsObtuse(segments, segmentCounter, segmentIndex, searchIndex)) {
                  break;
                }

                if (Utils1.CalcSegmentIntersect(
                  segments[searchIndex].clipSeg.start,
                  segments[searchIndex].clipSeg.end,
                  segments[segmentIndex].clipSeg.start,
                  segments[segmentIndex].clipSeg.end,
                  intersectionPoint
                )) {
                  lastSegmentIndex = searchIndex;
                  segments[searchIndex].clipSeg.end = Utils1.DeepCopy(intersectionPoint);
                  segments[segmentIndex].clipSeg.start = Utils1.DeepCopy(intersectionPoint);
                  foundIntersection = true;
                  break;
                }

                searchIndex--;
              }
            }

            // Update segments if intersection was found
            if (foundIntersection) {
              for (searchIndex = lastSegmentIndex + 1; searchIndex <= lastValidIndex;) {
                segments[searchIndex].clipSeg.end = Utils1.DeepCopy(segments[searchIndex].clipSeg.start);
                searchIndex++;
              }
            } else {
              segments[segmentIndex].clipSeg.end = Utils1.DeepCopy(segments[segmentIndex].clipSeg.start);
            }
          }
        }
      }
    }

    // Build final outline from valid segments
    for (segmentIndex = 0; segmentIndex < segmentCounter; segmentIndex++) {
      if (!Utils1.isEmptySeg(segments[segmentIndex].clipSeg)) {
        // Add start point if it's not already the last point in our result
        if (resultPoints.length === 0 ||
          segments[segmentIndex].clipSeg.start.x != resultPoints[resultPoints.length - 1].x ||
          segments[segmentIndex].clipSeg.start.y != resultPoints[resultPoints.length - 1].y) {
          resultPoints.push(Utils1.DeepCopy(segments[segmentIndex].clipSeg.start));
        }

        // Add end point
        resultPoints.push(Utils1.DeepCopy(segments[segmentIndex].clipSeg.end));
      }
    }

    // Remove duplicate end point if outline is nearly closed
    while (resultPoints.length > 1 && Utils1.DeltaPoints(resultPoints[resultPoints.length - 1], resultPoints[0]) < 3) {
      resultPoints.splice(resultPoints.length - 1, 1);
    }

    // Validate result
    if ((resultPoints.length < 2 && !isClosed) || (resultPoints.length < 3 && isClosed)) {
      console.log("O.Opt CalcPolyOutline - Output: Insufficient output points (null)");
      return null;
    }

    console.log("O.Opt CalcPolyOutline - Output: Outline created with", resultPoints.length, "points");
    return resultPoints;
  }

  /**
     * Determines the winding direction of a polygon
     * @param points - Array of points defining the polygon
     * @returns 1 for clockwise, -1 for counter-clockwise
     */
  GetPolygonWindingDirection(points) {
    console.log("O.Opt GetPolygonWindingDirection - Input:", { pointCount: points.length });

    let sum = 0;

    // Calculate the sum of (x2-x1) * (y2+y1) for each pair of adjacent points
    for (let i = 0; i < points.length - 1; i++) {
      sum += (points[i + 1].x - points[i].x) * (points[i + 1].y + points[i].y);
    }

    // Determine winding direction based on sum
    const direction = sum > 0 ? -1 : 1;

    console.log("O.Opt GetPolygonWindingDirection - Output:", direction);
    return direction;
  }

  /**
     * Recursively builds a list of target objects connected through hooks
     * @param objectId - ID of the object to get targets for
     * @param linksList - The list of links to search in
     * @param targetList - The list to add targets to
     * @param boundingRect - Optional bounding rectangle to update
     * @param listCode - Optional list code for filtering
     * @returns The updated list of target objects
     */
  GetTargetList(objectId, linksList, targetList, boundingRect, listCode) {
    console.log("O.Opt GetTargetList - Input:", {
      objectId,
      linksListLength: linksList?.length,
      targetListLength: targetList?.length,
      hasBoundingRect: !!boundingRect,
      listCode
    });

    let sourceObject;
    let targetObject;
    let linkIndex;
    let hookObjectId;

    // Default to move hook list code if not specified
    let hookListCode = ConstantData.ListCodes.SED_LC_MOVEHOOK;

    // Special case for lines and targets
    if (listCode === ConstantData.ListCodes.SED_LC_MOVETARGANDLINES) {
      hookListCode = listCode;
    }

    // Get the source object
    sourceObject = this.GetObjectPtr(objectId, false);
    if (sourceObject == null) {
      console.log("O.Opt GetTargetList - Output: Source object not found, returning original list");
      return targetList;
    }

    // Fix any circular references in hooks
    GlobalData.optManager.FixAnyCircularHooks(sourceObject);

    // Process each hook in the source object
    for (let hookIndex = 0; hookIndex < sourceObject.hooks.length; hookIndex++) {
      // Get the ID of the hooked object
      hookObjectId = sourceObject.hooks[hookIndex].objid;

      // Add the hooked object to the list if not already present
      if (targetList.indexOf(hookObjectId) < 0) {
        targetList.push(hookObjectId);

        // Update bounding rectangle if provided
        if (boundingRect) {
          targetObject = this.GetObjectPtr(hookObjectId, false);

          // Only include visible objects in bounding rectangle calculation
          if (!(targetObject.flags & ConstantData.ObjFlags.SEDO_NotVisible)) {
            const objectRect = targetObject.GetMoveRect(true, true);
            boundingRect = Utils2.UnionRect(boundingRect, objectRect, boundingRect);
          }
        }
      }

      // Find links for this hooked object and add their targets
      linkIndex = this.FindLink(linksList, hookObjectId, true);
      if (linkIndex >= 0) {
        targetList = this.AddToHookList(
          linksList,
          targetList,
          linkIndex,
          hookObjectId,
          hookListCode,
          1,
          boundingRect
        );
      }

      // Recursive call to process targets of this hooked object
      targetList = this.GetTargetList(
        hookObjectId,
        linksList,
        targetList,
        boundingRect,
        listCode
      );
    }

    console.log("O.Opt GetTargetList - Output: Returning list with", targetList.length, "targets");
    return targetList;
  }

  /**
     * Calculates the clockwise angle between two points in degrees
     * @param startPoint - The starting point
     * @param endPoint - The ending point
     * @returns The clockwise angle in degrees
     */
  SD_GetClockwiseAngleBetween2PointsInDegrees(startPoint, endPoint) {
    console.log("O.Opt SD_GetClockwiseAngleBetween2PointsInDegrees - Input:", { startPoint, endPoint });

    const PI = ConstantData.Geometry.PI;
    let deltaX, deltaY, angleRadians;

    deltaX = endPoint.x - startPoint.x;
    deltaY = endPoint.y - startPoint.y;

    // Calculate angle based on position
    if (deltaX === 0) {
      // Vertical line case
      angleRadians = deltaY >= 0 ? PI / 2 : -PI / 2;
    } else if (deltaY === 0) {
      // Horizontal line case
      angleRadians = deltaX >= 0 ? 0 : PI;
    } else {
      // General case - use arctangent
      angleRadians = Math.atan2(deltaY, deltaX);
    }

    // Normalize angle to be between 0 and 2π
    if (angleRadians < 0) {
      angleRadians += 2 * PI;
    }

    // Convert radians to degrees
    const angleDegrees = angleRadians * (180 / PI);

    console.log("O.Opt SD_GetClockwiseAngleBetween2PointsInDegrees - Output:", angleDegrees);
    return angleDegrees;
  }

  /**
     * Normalizes an angle value to be within the range [0, 2π)
     * @param angle - The angle to normalize
     * @param adjustment - The adjustment to apply before normalization
     * @returns The normalized angle value
     */
  NormalizeAngle(angle, adjustment) {
    console.log("O.Opt NormalizeAngle - Input:", { angle, adjustment });

    // Add the adjustment to the angle
    angle += adjustment;

    // Normalize to be within [0, 2π)
    if (angle >= 2 * ConstantData.Geometry.PI) {
      angle -= 2 * ConstantData.Geometry.PI;
    }

    if (angle < 0) {
      angle += 2 * ConstantData.Geometry.PI;
    }

    console.log("O.Opt NormalizeAngle - Output:", angle);
    return angle;
  }

  /**
    * Offsets a shape's position by the specified amounts
    * @param shapeId - ID of the shape to offset
    * @param offsetX - Amount to offset in X direction
    * @param offsetY - Amount to offset in Y direction
    * @param autoGrowSettings - Optional auto-grow settings
    */
  OffsetShape(shapeId: number, offsetX: number, offsetY: number, autoGrowSettings?: any) {
    console.log("O.Opt OffsetShape - Input:", {
      shapeId,
      offsetX,
      offsetY,
      hasAutoGrowSettings: !!autoGrowSettings
    });

    // Track the shape bounds
    const shapeBounds = {};

    // Get a preserved copy of the shape object for modification
    const shapeObject = GlobalData.objectStore.PreserveBlock(shapeId);

    // Initialize auto-grow if settings provided
    this.InitializeAutoGrowDrag(autoGrowSettings);

    // Get the actual shape data
    const shapeData = shapeObject.Data;

    // Apply the offset to the shape
    shapeData.OffsetShape(offsetX, offsetY);

    // Calculate new bounds after offset
    shapeBounds.x = shapeData.r.x + shapeData.r.width;
    shapeBounds.y = shapeData.r.y + shapeData.r.height;

    // Handle auto-grow with new bounds
    this.DoAutoGrowDrag(shapeBounds);

    // If there was any actual offset, update links and mark as dirty
    if (offsetX || offsetY) {
      this.SetLinkFlag(shapeId, ConstantData.LinkFlags.SED_L_MOVE);
      this.AddToDirtyList(shapeId, true);
    }

    console.log("O.Opt OffsetShape - Output: Shape offset applied", shapeBounds);
  }

  /**
     * Extends table lines based on intersection points with a polyline
     * @param polylineObject - The polyline object containing points
     * @param tableData - Table data containing rows and columns
     */
  Table_ExtendLines(polylineObject: any, tableData: any) {
    console.log("O.Opt Table_ExtendLines - Input:", {
      polylineObject: polylineObject?.BlockID,
      tableData: {
        rowCount: tableData?.rows?.length,
        colCount: tableData?.cols?.length
      }
    });

    const polyPoints = polylineObject.GetPolyPoints(
      ConstantData.Defines.NPOLYPTS,
      true,
      false,
      false,
      null
    );

    const intersectionPoints = [0, 0];

    // Calculate offsets
    const rectOffsetX = polylineObject.trect.x - polylineObject.Frame.x;
    const rectOffsetY = polylineObject.trect.y - polylineObject.Frame.y;
    const insideOffsetX = polylineObject.inside.x - polylineObject.Frame.x;
    const insideOffsetY = polylineObject.inside.y - polylineObject.Frame.y;

    const rowCount = tableData.rows.length;
    const colCount = tableData.cols.length;

    // Process rows
    for (let rowIndex = 0; rowIndex < rowCount - 1; rowIndex++) {
      const currentRow = tableData.rows[rowIndex];
      const segmentCount = currentRow.segments.length;

      // Calculate intersection line y-position
      let intersectionY = currentRow.frame.y + currentRow.frame.height + rectOffsetY;
      intersectionY -= tableData.cells[currentRow.start].hdisp / 2;

      // Check for horizontal intersections
      if (this.PolyGetIntersect(polyPoints, intersectionY, intersectionPoints, null, false) === 2) {
        // Update segment endpoints
        for (let segIndex = 0; segIndex < segmentCount; segIndex++) {
          const segment = currentRow.segments[segIndex];

          // Extend left endpoint if at start
          if (segment.x_start <= 0) {
            segment.x_start = intersectionPoints[0] - rectOffsetX + insideOffsetX;
          }

          // Extend right endpoint if at end
          if (segment.ncells + segment.start === currentRow.ncells) {
            segment.x_end = intersectionPoints[1] - rectOffsetX - insideOffsetX;
          }
        }
      }
    }

    // Process columns
    for (let colIndex = 0; colIndex < colCount - 1; colIndex++) {
      const currentCol = tableData.cols[colIndex];
      const segmentCount = currentCol.segments.length;

      // Calculate intersection line x-position
      const intersectionX = currentCol.x + rectOffsetX - currentCol.vdisp / 2;

      // Check for vertical intersections
      if (this.PolyGetIntersect(polyPoints, intersectionX, intersectionPoints, null, true) === 2) {
        // Update segment endpoints
        for (let segIndex = 0; segIndex < segmentCount; segIndex++) {
          const segment = currentCol.segments[segIndex];

          // Extend top endpoint if at start
          if (segment.rowstart === 0) {
            segment.y = intersectionPoints[0] - rectOffsetY + insideOffsetY;
          }

          // Extend bottom endpoint if at end
          if (segment.rowend === rowCount - 1) {
            segment.bottom = intersectionPoints[1] - rectOffsetY - insideOffsetY;
          }
        }
      }
    }

    console.log("O.Opt Table_ExtendLines - Output: Lines extended for table with", {
      rowCount,
      colCount
    });
  }

  /**
     * Gets intersection points between a line and a polyline
     * @param polylinePoints - Array of points defining the polyline
     * @param intersectValue - Value to test for intersection (x or y coordinate)
     * @param resultPoints - Array to store intersection points
     * @param resultIndices - Optional array to store indices of intersecting segments
     * @param isHorizontal - True for horizontal intersection line, false for vertical
     * @returns Number of intersection points found
     */
  PolyGetIntersect(
    polylinePoints: Point[],
    intersectValue: number,
    resultPoints: number[],
    resultIndices?: number[],
    isHorizontal?: boolean
  ): number {
    console.log("O.Opt PolyGetIntersect - Input:", {
      pointCount: polylinePoints.length,
      intersectValue,
      isHorizontal
    });

    let currentIndex = 0;
    let nextIndex = 1;
    let foundIntersection = false;
    let checkIndex = 0;
    let pointCount = polylinePoints.length;
    let intersectionCount = 0;
    let currentPoint = {};
    let nextPoint = {};
    let deltaX, deltaY, tempValue;
    let minValue, maxValue;
    let intersectX, intersectY;
    let rangeStart, rangeEnd;

    // Process each line segment in the polyline
    for (; nextIndex < pointCount + 1; nextIndex++) {
      let segmentEndIndex = nextIndex;
      currentPoint = polylinePoints[currentIndex];

      // Handle wrapping to start point for closed polylines
      if (nextIndex === pointCount) {
        nextPoint = polylinePoints[0];
        segmentEndIndex = 0;
      } else {
        nextPoint = polylinePoints[nextIndex];
      }

      // Skip zero-length segments
      if (Utils2.IsEqual(nextPoint.x, currentPoint.x) &&
        Utils2.IsEqual(nextPoint.y, currentPoint.y)) {
        continue;
      }

      currentIndex = nextIndex;
      deltaX = nextPoint.x - currentPoint.x;
      deltaY = nextPoint.y - currentPoint.y;

      // Handle horizontal intersection line
      if (isHorizontal) {
        // Determine x range of segment
        if (currentPoint.x < nextPoint.x) {
          minValue = currentPoint.x;
          maxValue = nextPoint.x;
        } else {
          minValue = nextPoint.x;
          maxValue = currentPoint.x;
        }

        // Skip if intersection line is outside segment x range
        if (intersectValue < minValue || intersectValue > maxValue) {
          continue;
        }

        // Prevent division by zero
        if (deltaX === 0) {
          deltaX = 1;
        }

        // Calculate intersection y coordinate
        intersectY = deltaY / deltaX * (intersectValue - currentPoint.x) + currentPoint.y;

        // Determine valid y range for intersection
        if (currentPoint.y < nextPoint.y) {
          rangeStart = currentPoint.y;
          rangeEnd = nextPoint.y;
        } else {
          rangeEnd = currentPoint.y;
          rangeStart = nextPoint.y;
        }

        // Check if intersection is within valid range
        if (intersectY >= rangeStart && intersectY <= rangeEnd) {
          // Check if this point is distinct from previous intersections
          if (intersectionCount > 0) {
            for (checkIndex = 0; checkIndex < intersectionCount; checkIndex++) {
              foundIntersection = Math.abs(intersectY - resultPoints[checkIndex]) > 1;
            }
          } else {
            foundIntersection = true;
          }

          if (foundIntersection) {
            // Stop if we've found too many intersections
            if (intersectionCount >= 2) {
              console.log("O.Opt PolyGetIntersect - Output: Too many intersections", intersectionCount + 1);
              return intersectionCount + 1;
            }

            // Store the intersection point
            resultPoints[intersectionCount] = intersectY;
            if (resultIndices) {
              resultIndices[intersectionCount] = segmentEndIndex;
            }
            intersectionCount++;
          }
        }
      }
      // Handle vertical intersection line
      else {
        // Similar logic but for vertical intersection
        if (currentPoint.y < nextPoint.y) {
          minValue = currentPoint.y;
          maxValue = nextPoint.y;
        } else {
          minValue = nextPoint.y;
          maxValue = currentPoint.y;
        }

        if (intersectValue < minValue || intersectValue > maxValue) {
          continue;
        }

        if (deltaY === 0) {
          deltaY = 1;
        }

        intersectX = deltaX / deltaY * (intersectValue - currentPoint.y) + currentPoint.x;

        if (currentPoint.x < nextPoint.x) {
          rangeStart = currentPoint.x;
          rangeEnd = nextPoint.x;
        } else {
          rangeEnd = currentPoint.x;
          rangeStart = nextPoint.x;
        }

        if (intersectX >= rangeStart && intersectX <= rangeEnd) {
          if (intersectionCount > 0) {
            for (checkIndex = 0; checkIndex < intersectionCount; checkIndex++) {
              foundIntersection = Math.abs(intersectX - resultPoints[checkIndex]) > 1;
            }
          } else {
            foundIntersection = true;
          }

          if (foundIntersection) {
            if (intersectionCount >= 2) {
              console.log("O.Opt PolyGetIntersect - Output: Too many intersections", intersectionCount + 1);
              return intersectionCount + 1;
            }

            resultPoints[intersectionCount] = intersectX;
            if (resultIndices) {
              resultIndices[intersectionCount] = segmentEndIndex;
            }
            intersectionCount++;
          }
        }
      }
    }

    // Sort intersection points in ascending order
    if (intersectionCount === 2 && resultPoints[0] > resultPoints[1]) {
      tempValue = resultPoints[1];
      resultPoints[1] = resultPoints[0];
      resultPoints[0] = tempValue;

      if (resultIndices) {
        tempValue = resultIndices[1];
        resultIndices[1] = resultIndices[0];
        resultIndices[0] = tempValue;
      }
    }

    console.log("O.Opt PolyGetIntersect - Output: Found", intersectionCount, "intersections");
    return intersectionCount;
  }

  /**
     * Gets shape parameters for different shape types
     * @param shapeType - The type of shape
     * @param shapeDimensions - The dimensions of the shape
     * @returns Object containing shape parameters
     */
  GetShapeParams(shapeType: number, shapeDimensions: { width: number, height: number }) {
    console.log("O.Opt GetShapeParams - Input:", { shapeType, shapeDimensions });

    let polyVectorMethod;
    let shouldCircularize = false;
    let shapeParameter = 0;

    switch (shapeType) {
      // Basic shapes
      case ConstantData.SDRShapeTypes.SED_S_Rect:
      case ConstantData.SDRShapeTypes.SED_S_Oval:
      case ConstantData.SDRShapeTypes.SED_S_RRect:
        break;

      // Circle
      case ConstantData.SDRShapeTypes.SED_S_Circ:
        shouldCircularize = true;
        break;

      // Diamond
      case ConstantData.SDRShapeTypes.SED_S_Diam:
        polyVectorMethod = PolygonShapeGenerator.SED_S_Diam;
        break;

      // Triangle variants
      case ConstantData.SDRShapeTypes.SED_S_Tri:
        polyVectorMethod = PolygonShapeGenerator.SED_S_Tri;
        break;
      case ConstantData.SDRShapeTypes.SED_S_TriB:
        polyVectorMethod = PolygonShapeGenerator.SED_S_TriB;
        break;

      // Parallelogram
      case ConstantData.SDRShapeTypes.SED_S_Pgm:
        shapeParameter = 0.13333 * shapeDimensions.width;
        polyVectorMethod = PolygonShapeGenerator.SED_S_Pgm;
        break;

      // Pentagon variants
      case ConstantData.SDRShapeTypes.SED_S_Pent:
        shapeParameter = 0.4 * shapeDimensions.height;
        polyVectorMethod = PolygonShapeGenerator.SED_S_Pent;
        shouldCircularize = false;
        break;
      case ConstantData.SDRShapeTypes.SED_S_PentL:
        shapeParameter = 0.4 * shapeDimensions.width;
        polyVectorMethod = PolygonShapeGenerator.SED_S_PentL;
        shouldCircularize = false;
        break;

      // Regular polygons
      case ConstantData.SDRShapeTypes.SED_S_Hex:
        shapeParameter = 0.26 * shapeDimensions.width;
        polyVectorMethod = PolygonShapeGenerator.SED_S_Hex;
        shouldCircularize = false;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Oct:
        shapeParameter = 0.28;
        polyVectorMethod = PolygonShapeGenerator.SED_S_Oct;
        shouldCircularize = false;
        break;

      // Arrow variants
      case ConstantData.SDRShapeTypes.SED_S_ArrR:
        shapeParameter = 0.3 * shapeDimensions.width;
        polyVectorMethod = PolygonShapeGenerator.SED_S_ArrR;
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrL:
        shapeParameter = 0.3 * shapeDimensions.width;
        polyVectorMethod = PolygonShapeGenerator.SED_S_ArrL;
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrT:
        shapeParameter = 0.3 * shapeDimensions.height;
        polyVectorMethod = PolygonShapeGenerator.SED_S_ArrT;
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrB:
        shapeParameter = 0.3 * shapeDimensions.height;
        polyVectorMethod = PolygonShapeGenerator.SED_S_ArrB;
        break;

      // Trapezoid variants
      case ConstantData.SDRShapeTypes.SED_S_Trap:
        shapeParameter = 0.2 * shapeDimensions.width;
        polyVectorMethod = PolygonShapeGenerator.SED_S_Trap;
        break;
      case ConstantData.SDRShapeTypes.SED_S_TrapB:
        shapeParameter = 0.2 * shapeDimensions.width;
        polyVectorMethod = PolygonShapeGenerator.SED_S_TrapB;
        break;

      // Flowchart shapes
      case ConstantData.SDRShapeTypes.SED_S_Input:
        shapeParameter = 0.27 * shapeDimensions.height;
        polyVectorMethod = PolygonShapeGenerator.SED_S_Input;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Term:
        polyVectorMethod = PolygonShapeGenerator.SED_S_Term;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Store:
        shapeParameter = shapeDimensions.width / 7.5;
        polyVectorMethod = PolygonShapeGenerator.SED_S_Store;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Doc:
        polyVectorMethod = PolygonShapeGenerator.SED_S_Doc;
        shapeParameter = shapeDimensions.height / 7.5;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Delay:
        shapeParameter = shapeDimensions.width / 5;
        polyVectorMethod = PolygonShapeGenerator.SED_S_Delay;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Disp:
        shapeParameter = shapeDimensions.width / 7.5;
        polyVectorMethod = PolygonShapeGenerator.SED_S_Disp;
        break;
    }

    const result = {
      dataclass: shapeType,
      shapeparam: shapeParameter,
      polyVectorMethod: polyVectorMethod,
      bCircularize: shouldCircularize
    };

    console.log("O.Opt GetShapeParams - Output:", result);
    return result;
  }

  BuildCreateMessage(message: any, shouldSend: boolean): any {
    console.log("O.Opt BuildCreateMessage - Input:", { message, shouldSend });
    /*
    if (Collab.AllowMessage()) {
      let createList: any[] = [];


      // Populate createList for secondary collaborator if applicable
      if (
        Collab.IsSecondary() &&
        (this.theMoveList && this.theMoveList.length
          ? (createList = createList.concat(this.theMoveList))
          : createList.push(this.theDrawShape.BlockID))
      ) {
        // No additional actions needed here
      }

      // If the drawn shape has a symbol identifier, process as a symbol creation
      if (this.theDrawShape.SymbolID) {
        message.symbolID = this.theDrawShape.SymbolID;
        message.CreateList = createList;
        message.StyleRecord = Utils1.DeepCopy(this.theDrawShape.StyleRecord);
        message.Actions = [];

        let action = new Collab.MessageAction(ConstantData.CollabMessageActions.CreateSymbol);
        message.Actions.push(action);
        action = new Collab.MessageAction(ConstantData.CollabMessageActions.MoveObject);
        message.Actions.push(action);
        action = new Collab.MessageAction(ConstantData.CollabMessageActions.LinkObject);
        message.Actions.push(action);

        const builtMessage = Collab.BuildMessage(ConstantData.CollabMessages.AddSymbol, message, false, true);

        if (!shouldSend) {
          console.log("O.Opt BuildCreateMessage - Output:", builtMessage);
          return builtMessage;
        }

        Collab.SendMessage(builtMessage);
        console.log("O.Opt BuildCreateMessage - Output:", builtMessage);
      } else {
        // Otherwise process as a shape creation
        message.attributes = {};
        message.CreateList = createList;
        message.attributes.StyleRecord = Utils1.DeepCopy(this.theDrawShape.StyleRecord);
        message.attributes.Frame = Utils1.DeepCopy(this.theDrawShape.Frame);
        message.attributes.TMargins = Utils1.DeepCopy(this.theDrawShape.TMargins);
        message.attributes.TextGrow = this.theDrawShape.TextGrow;
        message.attributes.ObjGrow = this.theDrawShape.ObjGrow;
        message.attributes.TextAlign = this.theDrawShape.TextAlign;
        message.attributes.flags = this.theDrawShape.flags;
        message.attributes.moreflags = this.theDrawShape.moreflags;
        message.attributes.shapeparam = this.theDrawShape.shapeparam;
        message.attributes.Dimensions = this.theDrawShape.Dimensions;
        if (this.theDrawShape.VertexArray) {
          message.attributes.VertexArray = Utils1.DeepCopy(this.theDrawShape.VertexArray);
        }
        message.ShapeType = this.theDrawShape.ShapeType;
        message.Actions = [];

        let action = new Collab.MessageAction(ConstantData.CollabMessageActions.CreateShape);
        message.Actions.push(action);
        action = new Collab.MessageAction(ConstantData.CollabMessageActions.MoveObject);
        message.Actions.push(action);
        action = new Collab.MessageAction(ConstantData.CollabMessageActions.LinkObject);
        message.Actions.push(action);

        const builtMessage = Collab.BuildMessage(ConstantData.CollabMessages.AddSymbol, message, false, true);

        if (!shouldSend) {
          console.log("O.Opt BuildCreateMessage - Output:", builtMessage);
          return builtMessage;
        }

        Collab.SendMessage(builtMessage);
        console.log("O.Opt BuildCreateMessage - Output:", builtMessage);
      }
  }
  */
  }

  RotateShapes(angleDegrees: number, selectionOverride?: any[]) {
    console.log("O.Opt RotateShapes - Input:", { angleDegrees, selectionOverride });
    let selectedList = GlobalData.optManager.GetObjectPtr(this.theSelectedListBlockID, false);
    let sedSession = this.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
    if (selectionOverride) {
      selectedList = selectionOverride;
    }
    let shape, textChild;
    let totalSelected = selectedList.length;
    if (totalSelected !== 0) {
      let centerPoint, rotationRadians, rotatedSubList, obj;
      let tempCounter = 0, removeIndex = 0, debugVal = null, deltaX = 0, deltaY = 0;
      // Check if any shape disallows rotation and log if found
      for (tempCounter = 0; tempCounter < totalSelected; tempCounter++) {
        shape = this.GetObjectPtr(selectedList[tempCounter], false);
        if (shape.NoRotate()) {
          break;
        }
      }
      if (shape && shape.NoRotate()) {
        console.log("O.Opt RotateShapes - NoRotate");
      } else {
        // Process PolyLineContainer groups
        for (tempCounter = 0; tempCounter < selectedList.length; tempCounter++) {
          shape = this.GetObjectPtr(selectedList[tempCounter], false);
          if (shape instanceof PolyLineContainer) {
            let enclosedObjects = shape.GetListOfEnclosedObjects(false);
            if (enclosedObjects.length > 0) {
              if (!this.AllowGroup(enclosedObjects))
                console.log("O.Opt RotateShapes - GroupNotAllowed");
              if (this.IsLinkedOutside(enclosedObjects))
                console.log("O.Opt RotateShapes - LinkedOutside");
              if (this.IsGroupNonDelete())
                console.log("O.Opt RotateShapes - GroupNonDelete");
            }
          }
        }
        // Rotate objects inside containers and other objects
        for (tempCounter = 0; tempCounter < selectedList.length; tempCounter++) {
          // Process for PolyLine and PolyLineContainer objects
          shape = this.GetObjectPtr(selectedList[tempCounter], true);
          if (shape instanceof PolyLine && shape.rflags) {
            this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, false);
            this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, false);
          }
          if (shape instanceof PolyLineContainer) {
            this.SetLinkFlag(selectedList[tempCounter], ConstantData.LinkFlags.SED_L_MOVE);
            this.AddToDirtyList(selectedList[tempCounter]);
            rotatedSubList = shape.RotateAllInContainer(shape.BlockID, angleDegrees);
            if (rotatedSubList && rotatedSubList.length) {
              for (removeIndex = selectedList.length - 1; removeIndex >= 0; removeIndex--) {
                if (rotatedSubList.indexOf(selectedList[removeIndex]) >= 0 && selectedList[removeIndex] !== shape.BlockID) {
                  selectedList.splice(removeIndex, 1);
                }
              }
            }
            // For PolyLineContainer or specific floorplan walls
            if (shape instanceof PolyLineContainer || shape.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) {
              // Remove hooked objects related to container rotation
              for (removeIndex = selectedList.length - 1; removeIndex >= 0; removeIndex--) {
                obj = GlobalData.optManager.GetObjectPtr(selectedList[removeIndex], false);
                if (obj && obj.hooks.length && obj.hooks[0].objid === shape.BlockID) {
                  selectedList.splice(removeIndex, 1);
                }
              }
            }
          }
        }
        // Rotate remaining objects individually
        totalSelected = selectedList.length;
        for (tempCounter = 0; tempCounter < totalSelected; tempCounter++) {
          shape = this.GetObjectPtr(selectedList[tempCounter], true);
          if (!(shape instanceof PolyLineContainer)) {
            this.SetLinkFlag(selectedList[tempCounter], ConstantData.LinkFlags.SED_L_MOVE);
            this.AddToDirtyList(selectedList[tempCounter]);
            if (shape instanceof BaseLine) {
              if (shape instanceof PolyLine) {
                // Rotate PolyLine via its poly points
                let center = {
                  x: shape.Frame.x + shape.Frame.width / 2,
                  y: shape.Frame.y + shape.Frame.height / 2
                };
                rotationRadians = 2 * Math.PI * ((360 - angleDegrees) / 360);
                let polyPoints = shape.GetPolyPoints(ConstantData.Defines.NPOLYPTS, false, true, false, null);
                Utils3.RotatePointsAboutPoint(center, rotationRadians, polyPoints);
                let totalPoints = polyPoints.length;
                shape.StartPoint.x = polyPoints[0].x;
                shape.StartPoint.y = polyPoints[0].y;
                for (removeIndex = 0; removeIndex < totalPoints; removeIndex++) {
                  shape.polylist.segs[removeIndex].pt.x = polyPoints[removeIndex].x - shape.StartPoint.x;
                  shape.polylist.segs[removeIndex].pt.y = polyPoints[removeIndex].y - shape.StartPoint.y;
                }
                shape.EndPoint.x = polyPoints[totalPoints - 1].x;
                shape.EndPoint.y = polyPoints[totalPoints - 1].y;
                shape.CalcFrame();
              } else {
                // Rotate BaseLine using midpoint and radius rotation
                GlobalData.optManager.ob = Utils1.DeepCopy(shape);
                let midX = (shape.StartPoint.x + shape.EndPoint.x) / 2;
                let midY = (shape.StartPoint.y + shape.EndPoint.y) / 2;
                let distance = Math.sqrt(
                  Math.pow(shape.EndPoint.x - shape.StartPoint.x, 2) +
                  Math.pow(shape.EndPoint.y - shape.StartPoint.y, 2)
                );
                rotationRadians = 2 * Math.PI * (angleDegrees / 360);
                distance /= 2;
                shape.StartPoint.x = midX - Math.cos(rotationRadians) * distance;
                shape.StartPoint.y = midY - Math.sin(rotationRadians) * distance;
                shape.EndPoint.x = midX + Math.cos(rotationRadians) * distance;
                shape.EndPoint.y = midY + Math.sin(rotationRadians) * distance;
                shape.AfterRotateShape(shape.BlockID);
                GlobalData.optManager.ob = {};
              }
            } else {
              shape.RotationAngle = angleDegrees;
              shape.UpdateFrame(shape.Frame);

              if (this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto) {
                let rightBoundary = shape.r.x + shape.r.width;
                let bottomBoundary = shape.r.y + shape.r.height;
                let offsetX = 0, offsetY = 0;
                if (rightBoundary > sedSession.dim.x) {
                  offsetX = sedSession.dim.x - rightBoundary;
                }
                if (bottomBoundary > sedSession.dim.y) {
                  offsetY = sedSession.dim.y - bottomBoundary;
                }
                if (shape.r.x < 0) {
                  offsetX = -shape.r.x;
                }
                if (shape.r.y < 0) {
                  offsetY = -shape.r.y;
                }
                if (offsetX || offsetY) {
                  shape.OffsetShape(offsetX, offsetY);
                }
              }
            }
          }
        }
        if (selectionOverride == null) {
          this.CompleteOperation(null);
        }
      }
    }
    console.log("O.Opt RotateShapes - Output: Rotation applied on selection, remaining count:", selectedList.length);
  }

  RemoveActionArrows(objectId, clearTimer) {
    console.log("O.Opt RemoveActionArrows - Input:", { objectId, clearTimer });
    const actionArrowId = 'actionArrow' + objectId;

    if (clearTimer) {
      this.ClearActionArrowTimer(objectId);
    } else {
      const targetObject = GlobalData.optManager.GetObjectPtr(objectId, false);
      if (targetObject) {
        targetObject.actionArrowHideTimerID = -1;
      }
    }

    if (GlobalData.optManager.FromOverlayLayer) {
      setTimeout(() => {
        GlobalData.optManager.SetActionArrowTimer(objectId);
      }, 0);
    } else {
      this.ClearOverlayElementsByID(actionArrowId);
    }

    console.log("O.Opt RemoveActionArrows - Output: Completed");
  }

  ClearActionArrowTimer(objectId: number) {
    console.log("O.Opt ClearActionArrowTimer - Input:", objectId);
    if (objectId >= 0) {
      const targetObject = GlobalData.optManager.GetObjectPtr(objectId, false);
      if (targetObject) {
        if (targetObject.actionArrowHideTimerID >= 0) {
          GlobalData.optManager.actionArrowHideTimer.clearTimeout(targetObject.actionArrowHideTimerID);
          targetObject.actionArrowHideTimerID = -1;
          console.log("O.Opt ClearActionArrowTimer - Timer cleared for object", objectId);
        } else {
          console.log("O.Opt ClearActionArrowTimer - No active timer for object", objectId);
        }
      } else {
        console.log("O.Opt ClearActionArrowTimer - No target object found for id", objectId);
      }
    } else {
      console.log("O.Opt ClearActionArrowTimer - Invalid objectId:", objectId);
    }
    console.log("O.Opt ClearActionArrowTimer - Output: Completed");
  }

  ClearOverlayElementsByID(elementID: string, resetHighlight: boolean) {
    console.log("O.Opt ClearOverlayElementsByID - Input:", { elementID, resetHighlight });

    // Get list of overlay elements matching the provided ID
    const overlayElementList = GlobalData.optManager.svgOverlayLayer.GetElementListWithID(elementID);
    const elementCount = overlayElementList.length;

    // Remove each overlay element from the SVG overlay layer
    for (let index = 0; index < elementCount; ++index) {
      GlobalData.optManager.svgOverlayLayer.RemoveElement(overlayElementList[index]);
    }

    // If resetHighlight flag is true and there is a currently highlighted shape, reset its effects and cursors
    if (resetHighlight && this.curHiliteShape !== -1) {
      const highlightedObject = this.GetObjectPtr(this.curHiliteShape, false);
      if (highlightedObject) {
        highlightedObject.SetRuntimeEffects(false);
        highlightedObject.ClearCursors();
      }
    }

    console.log("O.Opt ClearOverlayElementsByID - Output: Completed");
  }

  AlignShapes(alignmentType) {
    console.log("O.Opt AlignShapes - Input:", { alignmentType });
    let offsetX, offsetY;
    let alignmentPerformed = false;
    const selectedObjects = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data;
    const numSelected = selectedObjects.length;

    if (numSelected !== 0) {
      const targetSelected = this.GetTargetSelect();
      let targetAlignRect = null;
      let lineThickness = 0;

      if (targetSelected !== -1) {
        const targetObject = this.GetObjectPtr(targetSelected, false);
        targetAlignRect = targetObject.GetAlignRect();
        lineThickness = targetObject.StyleRecord.Line.Thickness;
        let currentAlignRect, currentDirtyFrame;
        let currentObject = null;

        // Collab.BeginSecondaryEdit();

        for (let i = 0; i < numSelected; ++i) {
          if (selectedObjects[i] === targetSelected) {
            continue;
          }
          currentDirtyFrame = null;
          currentObject = this.GetObjectPtr(selectedObjects[i], false);

          // Skip if object has hooks
          if (currentObject.hooks.length) {
            continue;
          }

          alignmentPerformed = true;
          currentObject = this.GetObjectPtr(selectedObjects[i], true);

          if (currentObject.FramezList && currentObject.FramezList.length) {
            currentDirtyFrame = currentObject.FramezList;
          }

          this.SetLinkFlag(selectedObjects[i], ConstantData.LinkFlags.SED_L_MOVE);
          this.AddToDirtyList(selectedObjects[i], true);
          currentAlignRect = currentObject.GetAlignRect();

          switch (alignmentType) {
            case "lefts":
              offsetX = targetAlignRect.x - lineThickness / 2 - (currentAlignRect.x - currentObject.StyleRecord.Line.Thickness / 2);
              offsetY = 0;
              break;
            case "centers":
              offsetX = targetAlignRect.x + targetAlignRect.width / 2 - currentAlignRect.width / 2 - currentAlignRect.x;
              offsetY = 0;
              break;
            case "rights":
              offsetX = targetAlignRect.x + targetAlignRect.width + lineThickness / 2 -
                (currentAlignRect.x + currentAlignRect.width + currentObject.StyleRecord.Line.Thickness / 2);
              offsetY = 0;
              break;
            case "tops":
              offsetY = targetAlignRect.y - lineThickness / 2 - (currentAlignRect.y - currentObject.StyleRecord.Line.Thickness / 2);
              offsetX = 0;
              break;
            case "middles":
              offsetY = targetAlignRect.y + targetAlignRect.height / 2 - currentAlignRect.height / 2 - currentAlignRect.y;
              offsetX = 0;
              break;
            case "bottoms":
              offsetY = targetAlignRect.y + targetAlignRect.height + lineThickness / 2 -
                (currentAlignRect.y + currentAlignRect.height + currentObject.StyleRecord.Line.Thickness / 2);
              offsetX = 0;
              break;
            default:
              offsetX = 0;
              offsetY = 0;
          }

          currentObject.OffsetShape(offsetX, offsetY, currentDirtyFrame);

          // Reset offsets and then adjust if the shape goes out of bounds
          offsetX = 0;
          offsetY = 0;
          if (currentObject.r.x < 0) {
            offsetX = -currentObject.r.x;
          }
          if (currentObject.r.y < 0) {
            offsetY = -currentObject.r.y;
          }
          if (offsetX || offsetY) {
            currentObject.OffsetShape(offsetX, offsetY);
          }
        }

        if (alignmentPerformed) {
          // if (Collab.AllowMessage()) {
          //   const messageData = { shapeAlign: alignmentType };
          //   // Collab.BuildMessage(ConstantData.CollabMessages.AlignShapes, messageData, true);
          // }
          this.CompleteOperation(null);
        } else {
          console.log("O.Opt AlignShapes - Output: AlignHooked & UnBlockMessages");
        }
      }
    }

    console.log("O.Opt AlignShapes - Output:", { alignmentPerformed });
  }

  DeleteSelectedObjects() {
    this.DeleteSelectedObjectsCommon()
  }

  DeleteSelectedObjectsCommon(objectIds, suppressCompleteOperation, preserveSelection, suppressCollabMessage) {
    console.log("O.Opt DeleteSelectedObjectsCommon - Input:", {
      objectIds,
      suppressCompleteOperation,
      preserveSelection,
      suppressCollabMessage
    });

    const activeTableId = this.Table_GetActiveID();
    if (activeTableId >= 0 && preserveSelection == null) {
      this.Table_DeleteCellContent(activeTableId);
    } else {
      let idsCount = 0;
      if (objectIds) {
        idsCount = objectIds.length;
      }
      if (this.AreSelectedObjects() || idsCount !== 0) {
        // if (Collab.AllowMessage()) {
        //   Collab.BeginSecondaryEdit();
        // }
        if (!preserveSelection) {
          GlobalData.optManager.CloseEdit();
        }
        let deleteResult, nextSelect = Business.GetNextSelect(), deleteList = [];
        const selectedObjects = GlobalData.objectStore.PreserveBlock(this.theSelectedListBlockID).Data;
        const objectsToDelete = objectIds || selectedObjects;

        deleteResult = this.AddtoDelete(objectsToDelete, false, null);
        if (deleteResult >= 0) {
          nextSelect = deleteResult;
        }
        // if (Collab.AllowMessage() && !suppressCollabMessage) {
        //   const messageObj = {
        //     listToDelete: Utils1.DeepCopy(objectsToDelete)
        //   };
        //   Collab.BuildMessage(ConstantData.CollabMessages.DeleteObjects, messageObj, false);
        // }
        const objectsCount = objectsToDelete.length;
        this.DeleteObjects(objectsToDelete, false);

        // if (objectsCount && this.IsPlanningDocument() === ConstantData.LayerTypes.SD_LAYERT_MINDMAP) {
        //   ListManager.TaskMap.CommitVisualOutline();
        // }

        if (!preserveSelection) {
          selectedObjects.splice(0);
          if (nextSelect >= 0) {
            deleteList.push(nextSelect);
          } else {
            this.SetTargetSelect(-1, true);
          }
        }
        // this.Comment_UpdatePanel(null);
        if (!suppressCompleteOperation) {
          this.CompleteOperation(deleteList);
        }
        console.log("O.Opt DeleteSelectedObjectsCommon - Output:", true);
        return true;
      }
    }
  }

  AreSelectedObjects(): boolean {
    console.log("O.Opt AreSelectedObjects - Input: No parameters");
    const selectedObjects = GlobalData.objectStore.GetObject(this.theSelectedListBlockID);
    const hasSelection = selectedObjects !== null && selectedObjects.Data.length !== 0;
    console.log("O.Opt AreSelectedObjects - Output:", hasSelection);
    return hasSelection;
  }

  AddtoDelete(objectIds: number[], isForced: boolean, additionalData: any) {
    console.log("O.Opt AddtoDelete - Input:", { objectIds, isForced, additionalData });

    let currentIndex: number;
    let objectCount: number = objectIds.length;
    let currentObj: any;
    let tempId: any;
    let parentConnector: number;
    let tempObj: any;
    let connectorHookCount: number;
    let connectorDefines = ConstantData.ConnectorDefines;
    let hasContainerConnector: boolean = false;
    let connectorUsageCount: number = 0;
    let deleteInfo: any = {};
    let childIds: any[] = [];
    // M holds a helper value; initialize to -1.
    let helperValue: number = -1;

    for (currentIndex = 0; currentIndex < objectCount; currentIndex++) {
      currentObj = GlobalData.optManager.GetObjectPtr(objectIds[currentIndex], false);
      if (currentObj != null) {
        // Save the current object's id
        tempId = objectIds[currentIndex];

        if (currentObj.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER) {
          this.TableContainerAddtoDelete(currentObj, objectIds);
        } else if (currentObj.IsSwimlane && currentObj.IsSwimlane()) {
          this.SwimlaneAddtoDelete(currentObj, objectIds);
          objectCount = objectIds.length;
        } else if (currentObj.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_TIMELINE) {
          this.TimelineAddtoDelete(currentObj, objectIds);
        } else if (currentObj instanceof Instance.Shape.ShapeContainer) {
          this.ContainerAddtoDelete(currentObj, objectIds);
          hasContainerConnector = true;
        }

        if (currentObj.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
          hasContainerConnector = true;
          if (currentObj._IsFlowChartConnector && currentObj._IsFlowChartConnector()) {
            switch (currentObj.objecttype) {
              case ConstantData.ObjectTypes.SD_OBJT_BAD_STEPCHART_BRANCH:
                break;
              case ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH:
              case ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH:
                if (!isForced) {
                  objectIds.splice(currentIndex, 1);
                  objectCount--;
                  currentIndex--;
                }
                break;
              default:
                Business.GetConnectorTree(objectIds[currentIndex], objectIds);
            }
          } else {
            if (currentObj.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH) {
              if (typeof connectorHookCount === "undefined" && currentObj.hooks.length) {
                tempObj = this.GetObjectPtr(currentObj.hooks[0].objid, false);
                if (tempObj && tempObj.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
                  connectorHookCount = tempObj.arraylist.hook.length - connectorDefines.SEDA_NSkip;
                  if (connectorHookCount < 0) {
                    connectorHookCount = 0;
                  }
                  if (0 === (tempObj.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete)) {
                    connectorHookCount++;
                  }
                }
              }
              if (typeof connectorHookCount !== "undefined") {
                if ((connectorHookCount - connectorUsageCount > 1 && (currentObj.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete) === 0) || isForced) {
                  Business.GetConnectorTree(objectIds[currentIndex], objectIds);
                  connectorUsageCount++;
                } else {
                  objectIds.splice(currentIndex, 1);
                  currentIndex--;
                  objectCount--;
                  tempId = -1;
                  // Reset helper id.
                  let helperId: number = -1;
                  if (currentObj.arraylist.hook[connectorDefines.A_Cl].id >= 0) {
                    helperId = currentObj.arraylist.hook[connectorDefines.A_Cl].id;
                  }
                  if (currentObj.arraylist.hook[connectorDefines.A_Cr].id >= 0) {
                    helperId = currentObj.arraylist.hook[connectorDefines.A_Cr].id;
                  }
                  if (helperId >= 0) {
                    let foundIndex = objectIds.indexOf(helperId);
                    if (foundIndex >= 0) {
                      objectIds.splice(foundIndex, 1);
                    }
                  }
                }
              }
            } else {
              Business.GetConnectorTree(objectIds[currentIndex], objectIds);
              objectCount = objectIds.length;
              if (isForced && currentObj.hooks.length) {
                tempObj = this.GetObjectPtr(currentObj.hooks[0].objid, false);
                if (tempObj && tempObj.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE && objectIds.indexOf(currentObj.hooks[0].objid) < 0) {
                  objectIds.push(currentObj.hooks[0].objid);
                }
              }
            }
          }
        } else {
          // For non-connector objects.
          let flagSkip: boolean = false;
          parentConnector = Business.GetParentConnector(objectIds[currentIndex], null);
          if (parentConnector >= 0) {
            hasContainerConnector = true;
            tempObj = gListManager.GetObjectPtr(parentConnector, false);
            if (tempObj) {
              let connectorEndInfo: any = {};
              if (this.IsConnectorEndShape(currentObj, tempObj, connectorEndInfo)) {
                if (typeof connectorHookCount === "undefined") {
                  connectorHookCount = connectorEndInfo.nshapes;
                }
                if (objectIds.indexOf(parentConnector) < 0) {
                  if (connectorHookCount - connectorUsageCount > 1 || connectorEndInfo.pasted || isForced) {
                    objectIds.push(parentConnector);
                    if ((tempObj.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete) && bIsPrimaryStateManager) {
                      tempObj.extraflags = SDJS.Utils.SetFlag(tempObj.extraflags, ConstantData.ExtraFlags.SEDE_NoDelete, false);
                    }
                    Business.GetConnectorTree(parentConnector, objectIds);
                    if (!connectorEndInfo.pasted) {
                      connectorUsageCount++;
                    }
                  } else {
                    objectIds.splice(currentIndex, 1);
                  }
                } else if (connectorEndInfo.nshapes <= 1 && !connectorEndInfo.pasted && !isForced) {
                  objectIds.splice(currentIndex, 1);
                  let parentIndex = objectIds.indexOf(parentConnector);
                  if (parentIndex >= 0) {
                    objectIds.splice(parentIndex, 1);
                  }
                }
                if (tempObj.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH) {
                  flagSkip = gGenogramManager.DeleteConnector(tempObj, objectIds, currentIndex, deleteInfo);
                  tempId = deleteInfo.parentshape;
                } else if (tempObj._IsFlowChartConnector && tempObj._IsFlowChartConnector()) {
                  childIds = [];
                  let childArray = GlobalData.optManager.FindChildArray(objectIds[currentIndex], -1);
                  let childObj = GlobalData.optManager.GetObjectPtr(childArray, false);
                  if (childObj == null) {
                    childObj = tempObj;
                  }
                  if (tempObj.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH ||
                    childObj.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH) {
                    if (gStepChartVManager && !isForced) {
                      helperValue = gStepChartVManager.DeleteShape(objectIds[currentIndex], objectIds, false, null, childIds);
                    }
                  } else if (tempObj.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH ||
                    childObj.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH) {
                    if (gStepChartHManager && !isForced) {
                      helperValue = gStepChartHManager.DeleteShape(objectIds[currentIndex], objectIds, false, null, childIds);
                    }
                  } else if (gFlowChartManager && !isForced) {
                    helperValue = gFlowChartManager.DeleteShape(objectIds[currentIndex], objectIds, false, childIds);
                  }
                } else if (tempObj.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_CoManager) {
                  if (isForced) {
                    tempId = tempObj.arraylist.hook[connectorDefines.SEDA_NSkip].id;
                    if (objectIds.indexOf(parentConnector) < 0) {
                      objectIds.push(parentConnector);
                    }
                    let hookCount = tempObj.arraylist.hook.length;
                    for (let hookIndex = connectorDefines.SEDA_NSkip; hookIndex < hookCount; hookIndex++) {
                      let hookId = tempObj.arraylist.hook[hookIndex].id;
                      if (objectIds.indexOf(hookId) < 0) {
                        objectIds.push(hookId);
                      }
                    }
                  } else {
                    let hookCount = tempObj.arraylist.hook.length;
                    for (let hookIndex = connectorDefines.SEDA_NSkip; hookIndex < hookCount; hookIndex++) {
                      let hookId = tempObj.arraylist.hook[hookIndex].id;
                      if (objectIds.indexOf(hookId) < 0) {
                        flagSkip = true;
                        break;
                      }
                    }
                  }
                } else {
                  if (tempObj.hooks.length === 0 && gListManager.CN_GetNShapes(parentConnector) <= 1 && objectIds.indexOf(parentConnector) === -1) {
                    objectIds.push(parentConnector);
                  }
                }
              }
            }
          } else {
            // No parent connector found.
            let repeatCount: number;
            if (currentObj.objecttype === ConstantData.ObjectTypes.SD_OBJT_MINDMAP_MAIN) {
              repeatCount = 2;
              flagSkip = false;
            } else {
              repeatCount = 1;
              if (!isForced) {
                flagSkip = true;
              }
            }
            let childSearchIndex: number = -1;
            for (let j = 0; j < repeatCount; j++) {
              let childId = GlobalData.optManager.FindChildArray(objectIds[currentIndex], childSearchIndex);
              if (childId >= 0) {
                let childObj = this.GetObjectPtr(childId, true);
                if (childObj && childObj.arraylist && (childObj.arraylist.hook.length <= connectorDefines.SEDA_NSkip || (childObj.flags & ConstantData.ObjFlags.SEDO_NotVisible))) {
                  flagSkip = false;
                }
                if (childObj.IsGenoConnector && childObj.IsGenoConnector()) {
                  flagSkip = false;
                  let alternateId: number = -1;
                  let hookCount = childObj.arraylist.hook.length;
                  for (let hookIndex = connectorDefines.SEDA_NSkip; hookIndex < hookCount; hookIndex++) {
                    let hookId = childObj.arraylist.hook[hookIndex].id;
                    if (objectIds.indexOf(hookId) < 0) {
                      if (this.GetObjectPtr(hookId, false).DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE) {
                        flagSkip = true;
                        break;
                      }
                      if (this.GetObjectPtr(hookId, false).DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
                        alternateId = hookId;
                      }
                    }
                  }
                  if (!flagSkip) {
                    if (objectIds.indexOf(childId) < 0) {
                      objectIds.push(childId);
                    }
                    if (alternateId >= 0 && objectIds.indexOf(alternateId) < 0) {
                      objectIds.push(alternateId);
                    }
                    flagSkip = true;
                  }
                }
                childObj.flags = SDJS.Utils.SetFlag(childObj.flags, ConstantData.ObjFlags.SEDO_Obj1, true);
                this.SetLinkFlag(childId, ConstantData.LinkFlags.SED_L_MOVE);
              }
              childSearchIndex = childId;
            }
          }
          if (!flagSkip) {
            let childConnectorCount = GlobalData.optManager.FindAllChildConnectors(tempId).length;
            let allChildConnectors = GlobalData.optManager.FindAllChildConnectors(tempId);
            for (let idx = 0; idx < childConnectorCount; idx++) {
              hasContainerConnector = true;
              let childConnectorObj = this.GetObjectPtr(allChildConnectors[idx], false);
              if (!(childConnectorObj && childConnectorObj._IsFlowChartConnector && childConnectorObj._IsFlowChartConnector())) {
                Business.GetConnectorTree(allChildConnectors[idx], objectIds);
              }
            }
            if (currentObj.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE && !isForced) {
              let tempArray: any[] = [];
              let healLineResult = this.HealLine(currentObj, false, tempArray);
              if (healLineResult >= 0) {
                hasContainerConnector = true;
                if (objectIds.indexOf(healLineResult) < 0) {
                  objectIds.push(healLineResult);
                }
                for (let k = 0; k < tempArray.length; k++) {
                  if (objectIds.indexOf(tempArray[k]) < 0) {
                    objectIds.push(tempArray[k]);
                  }
                }
              }
            }
            if (currentObj.associd >= 0) {
              let assocFlag: boolean = false;
              let assocObj = this.GetObjectPtr(currentObj.associd, false);
              if (assocObj) {
                if (assocObj.hooks.length && assocObj.hooks[0].hookpt === ConstantData.HookPts.SED_KATD) {
                  assocFlag = true;
                }

                if (assocObj.objecttype !== ConstantData.ObjectTypes.SD_OBJT_NG_EVENT && assocObj.objecttype !== ConstantData.ObjectTypes.SD_OBJT_NG_EVENT_LABEL) {
                  if (objectIds.indexOf(currentObj.associd) < 0) {
                    objectIds.push(currentObj.associd);
                  }
                }
              }
              if (assocFlag && objectIds.indexOf(currentObj.associd) < 0) {
                objectIds.push(currentObj.associd);
              }
            }
            if (currentObj.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE) {
              let childShapeList = GlobalData.optManager.FindAllChildObjects(currentObj.BlockID, ConstantData.DrawingObjectBaseClass.SHAPE, ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY);
              if (childShapeList && childShapeList.length) {
                for (let idx = 0; idx < childShapeList.length; idx++) {
                  if (objectIds.indexOf(childShapeList[idx]) < 0) {
                    objectIds.push(childShapeList[idx]);
                  }
                }
              }
            }
            if (!isForced) {
              let childLineList = GlobalData.optManager.FindAllChildObjects(currentObj.BlockID, ConstantData.DrawingObjectBaseClass.LINE, null);
              if (childLineList && childLineList.length) {
                for (let idx = 0; idx < childLineList.length; idx++) {
                  if (objectIds.indexOf(childLineList[idx]) < 0) {
                    objectIds.push(childLineList[idx]);
                  }
                }
              }
            }
          }
        }
      }
    }

    if (deleteInfo) {
      deleteInfo.connectors = hasContainerConnector;
    }
    console.log("O.Opt AddtoDelete - Output:", { objectIds, helperValue });
    return helperValue;
  }

  HealLine(e, t, a) {
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
      b = [],
      M = [],
      P = [],
      R = [],
      A = this.GetObjectPtr(this.theLinksBlockID, !1),
      _ = - 1,
      E = - 1,
      w = !1,
      F = (ConstantData.Defines.SED_CDim, !1),
      v = [],
      G = ConstantData.HookPts,
      N = function (e, t, a, r, i, n) {
        var o,
          s,
          l,
          S,
          c,
          u,
          p = [],
          d = [];
        if (
          o = e.segl.pts.length,
          s = t.segl.pts.length,
          c = Utils2.IsEqual(a.y, r.y, 0.1) ? Math.abs(a.x - r.x) : Math.abs(a.y - r.y),
          n
        ) for (S = 2; S < s; S++) l = Utils2.IsEqual(t.segl.pts[S].y, t.segl.pts[S - 1].y) ? Math.abs(t.segl.pts[S].x - t.segl.pts[S - 1].x) : Math.abs(t.segl.pts[S].y - t.segl.pts[S - 1].y),
          d.push(l);
        else for (S = s - 2; S > 0; S--) l = Utils2.IsEqual(t.segl.pts[S].y, t.segl.pts[S - 1].y) ? Math.abs(t.segl.pts[S].x - t.segl.pts[S - 1].x) : Math.abs(t.segl.pts[S].y - t.segl.pts[S - 1].y),
          d.push(l);
        if (i) {
          for (S = (u = d.length) - 1; S >= 0; S--) p.push(d[S]);
          for (p.push(c), S = 2; S < o; S++) l = Utils2.IsEqual(e.segl.pts[S].y, e.segl.pts[S - 1].y) ? Math.abs(e.segl.pts[S].x - e.segl.pts[S - 1].x) : Math.abs(e.segl.pts[S].y - e.segl.pts[S - 1].y),
            p.push(l)
        } else {
          for (S = 1; S < o - 1; S++) l = Utils2.IsEqual(e.segl.pts[S].y, e.segl.pts[S - 1].y) ? Math.abs(e.segl.pts[S].x - e.segl.pts[S - 1].x) : Math.abs(e.segl.pts[S].y - e.segl.pts[S - 1].y),
            p.push(l);
          for (p.push(c), u = d.length, S = 0; S < u; S++) p.push(d[S])
        }
        return p
      },
      k = function (e, t) {
        var a,
          r,
          i;
        for (
          r = t.length,
          5 === (i = e.segl.pts.length - 1) &&
          (t[2] = t[4]),
          a = 0;
          a < r &&
          (e.segl.lengths[a] = t[a], !(a >= i));
          a++
        );
      };
    if (s = this.FindLink(A, e.BlockID, !0), g = e.BlockID, !(s >= 0)) return - 1;
    for (
      this.AddToHookList(
        A,
        b,
        s,
        e.BlockID,
        ConstantData.ListCodes.SED_LC_TOPONLY,
        1,
        {
        }
      ),
      T = r = b.length,
      i = 0;
      i < r;
      i++
    ) if ((n = this.GetObjectPtr(b[i], !1)).AllowHeal()) for (M.push(b[i]), u = n.hooks.length, c = 0; c < u; c++) n.hooks[c].objid === g &&
      (
        P[M.length - 1] = n.hooks[c].connect,
        n.hooks[c].hookpt === G.SED_KTL ? R.push(n.segl.firstdir) : R.push(n.segl.lastdir)
      );
    if ((r = M.length) >= 2 && r < 4) for (i = 0; i < r; i++) {
      switch (R[i]) {
        case G.SED_KTC:
          C = M[i],
            void 0 !== y &&
            (M[0] = C, M[1] = y, nlines = 2, w = !0);
          break;
        case G.SED_KBC:
          y = M[i],
            void 0 !== C &&
            (M[0] = C, M[1] = y, nlines = 2, w = !0);
          break;
        case G.SED_KLC:
          h = M[i],
            void 0 !== m &&
            (M[0] = h, M[1] = m, nlines = 2, w = !0);
          break;
        case G.SED_KRC:
          m = M[i],
            void 0 !== h &&
            (M[0] = h, M[1] = m, nlines = 2, w = !0)
      }
      if (w) break
    }
    if (t && w) return 1;
    if (w) {
      if (
        n = this.GetObjectPtr(M[0], !0),
        o = this.GetObjectPtr(M[1], !0),
        1 === n.hooks.length &&
        2 === o.hooks.length
      ) {
        var U = M[0];
        M[0] = M[1],
          M[1] = U,
          n = this.GetObjectPtr(M[0], !0),
          o = this.GetObjectPtr(M[1], !0)
      }
      var J = Utils2.Pt2Rect(n.StartPoint, n.EndPoint),
        x = Utils2.Pt2Rect(o.StartPoint, o.EndPoint),
        O = GlobalData.optManager.GetPolyLineLinks(M[0], 0),
        B = GlobalData.optManager.GetPolyLineLinks(M[1], 0);
      for (r = n.hooks.length, i = 0; i < r; i++) n.hooks[i].objid != e.BlockID ? _ = n.hooks[i].objid : p = i;
      for (r = o.hooks.length, i = 0; i < r; i++) o.hooks[i].objid != e.BlockID ? (E = o.hooks[i].objid, d = i) : D = i;
      if (_ >= 0 && E >= 0 && _ != E) return o.hooks[d].hookpt === ConstantData.HookPts.SED_KTL ? (
        l = o.segl.firstdir,
        S = o.StartPoint,
        F = !1,
        f = {
          x: o.StartPoint.x,
          y: o.StartPoint.y
        },
        (I = o.segl.pts.length) > 2 &&
        (f.x = x.x + o.segl.pts[I - 2].x, f.y = x.y + o.segl.pts[I - 2].y)
      ) : (
        l = o.segl.lastdir,
        S = o.EndPoint,
        F = !0,
        (f = {
          x: o.StartPoint.x,
          y: o.StartPoint.y
        }).x = x.x + o.segl.pts[1].x,
        f.y = x.y + o.segl.pts[1].y
      ),
        n.hooks[p].hookpt === ConstantData.HookPts.SED_KTL ? (
          (L = {
            x: n.StartPoint.x,
            y: n.StartPoint.y
          }).x = J.x + n.segl.pts[1].x,
          L.y = J.y + n.segl.pts[1].y,
          v = N(n, o, L, f, !0, F),
          n.segl.firstdir = l,
          n.StartPoint.x = S.x,
          n.StartPoint.y = S.y,
          n.SegLFormat(S, ConstantData.ActionTriggerType.LINESTART, 0),
          k(n, v),
          n.SegLFormat(S, ConstantData.ActionTriggerType.LINESTART, 0)
        ) : (
          L = {
            x: n.StartPoint.x,
            y: n.StartPoint.y
          },
          (I = n.segl.pts.length) > 2 &&
          (L.x = J.x + n.segl.pts[I - 2].x, L.y = J.y + n.segl.pts[I - 2].y),
          v = N(n, o, L, f, !1, F),
          n.segl.lastdir = l,
          n.EndPoint.x = S.x,
          n.EndPoint.y = S.y,
          n.SegLFormat(S, ConstantData.ActionTriggerType.LINEEND, 0),
          k(n, v),
          n.SegLFormat(S, ConstantData.ActionTriggerType.LINEEND, 0)
        ),
        2 === T &&
        function () {
          var t,
            a = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
          Utils2.IsEqual(L.y, f.y, 2) ? (
            e.Frame.width + a.def.h_arraywidth,
            0,
            t = ConstantData.ActionArrow.RIGHT
          ) : (
            e.Frame.height + a.def.v_arraywidth,
            0,
            t = ConstantData.ActionArrow.DOWN
          ),
            Business.ShiftConnectedShapes(e.BlockID, E, n.BlockID, t, !1)
        }(),
        n.CalcFrame(),
        this.FilterLinks(O, B, a),
        B &&
        B.length &&
        this.MoveLinks(M[0], M[1], B, null),
        O &&
        O.length &&
        this.MoveLinks(M[0], M[0], O, null),
        n.hoplist.hops = [],
        n.hoplist.nhops = 0,
        this.AddToDirtyList(M[0]),
        this.UpdateHook(
          M[0],
          p,
          E,
          n.hooks[p].hookpt,
          o.hooks[d].connect,
          o.hooks[d].cellid
        ),
        this.SetLinkFlag(o.hooks[d].objid, ConstantData.LinkFlags.SED_L_MOVE),
        this.UpdateLinks(),
        M[1];
      if (_ >= 0 && E < 0) return o.hooks[0].hookpt === ConstantData.HookPts.SED_KTL ? (
        l = o.segl.lastdir,
        S = o.EndPoint,
        F = !0,
        (f = {
          x: o.StartPoint.x,
          y: o.StartPoint.y
        }).x = x.x + o.segl.pts[1].x,
        f.y = x.y + o.segl.pts[1].y
      ) : (
        l = o.segl.firstdir,
        S = o.StartPoint,
        F = !1,
        f = {
          x: o.StartPoint.x,
          y: o.StartPoint.y
        },
        (I = o.segl.pts.length) > 2 &&
        (f.x = x.x + o.segl.pts[I - 2].x, f.y = x.y + o.segl.pts[I - 2].y)
      ),
        n.hooks[p].hookpt === ConstantData.HookPts.SED_KTL ? (
          (L = {
            x: n.StartPoint.x,
            y: n.StartPoint.y
          }).x = J.x + n.segl.pts[1].x,
          L.y = J.y + n.segl.pts[1].y,
          v = N(n, o, L, f, !0, F),
          n.segl.firstdir = l,
          n.StartPoint.x = S.x,
          n.StartPoint.y = S.y,
          n.SegLFormat(S, ConstantData.ActionTriggerType.LINESTART, 0),
          n.CalcFrame(),
          k(n, v),
          n.SegLFormat(S, ConstantData.ActionTriggerType.LINESTART, 0)
        ) : (
          L = {
            x: n.StartPoint.x,
            y: n.StartPoint.y
          },
          (I = n.segl.pts.length) > 2 &&
          (L.x = J.x + n.segl.pts[I - 2].x, L.y = J.y + n.segl.pts[I - 2].y),
          v = N(n, o, L, f, !1, F),
          n.segl.lastdir = l,
          n.EndPoint.x = S.x,
          n.EndPoint.y = S.y,
          n.SegLFormat(S, ConstantData.ActionTriggerType.LINEEND, 0),
          n.CalcFrame(),
          k(n, v),
          n.SegLFormat(S, ConstantData.ActionTriggerType.LINEEND, 0)
        ),
        this.FilterLinks(O, B, a),
        B &&
        B.length &&
        this.MoveLinks(M[0], M[1], B, null),
        O &&
        O.length &&
        this.MoveLinks(M[0], M[0], O, null),
        n.hoplist.hops = [],
        n.hoplist.nhops = 0,
        this.UpdateHook(
          M[0],
          p,
          - 1,
          n.hooks[p].hookpt,
          n.hooks[p].connect,
          n.hooks[p].cellid
        ),
        this.AddToDirtyList(M[0]),
        M[1];
      var H,
        V = function (e, t, a, r) {
          var i,
            n,
            o = new ListManager.SegLine,
            s = Utils2.Pt2Rect(e.StartPoint, e.EndPoint);
          if (n = e.segl.pts.length, t === ConstantData.HookPts.SED_KTL) {
            for (i = n - 1; i > 0; i--) o.pts.push({
              x: e.segl.pts[i].x + s.x,
              y: e.segl.pts[i].y + s.y
            });
            o.firstdir = e.segl.lastdir
          } else {
            for (i = 0; i < n - 1; i++) o.pts.push({
              x: e.segl.pts[i].x + s.x,
              y: e.segl.pts[i].y + s.y
            });
            o.firstdir = e.segl.firstdir
          }
          if (
            n = a.segl.pts.length,
            s = Utils2.Pt2Rect(a.StartPoint, a.EndPoint),
            r === ConstantData.HookPts.SED_KTR
          ) {
            for (i = n - 2; i >= 0; i--) o.pts.push({
              x: a.segl.pts[i].x + s.x,
              y: a.segl.pts[i].y + s.y
            });
            o.lastdir = a.segl.firstdir
          } else {
            for (i = 1; i < n; i++) o.pts.push({
              x: a.segl.pts[i].x + s.x,
              y: a.segl.pts[i].y + s.y
            });
            o.lastdir = a.segl.lastdir
          }
          for (n = o.pts.length, i = 1; i < n; i++) o.pts[i].x == o.pts[i - 1].x ? o.lengths.push(Math.abs(o.pts[i].y - o.pts[i - 1].y)) : o.lengths.push(Math.abs(o.pts[i].x - o.pts[i - 1].x));
          return o
        }(o, o.hooks[0].hookpt, n, n.hooks[0].hookpt);
      o.hooks[0].hookpt === ConstantData.HookPts.SED_KTL &&
        (
          H = o.EndArrowID,
          o.EndArrowID = o.StartArrowID,
          o.StartArrowID = H,
          H = o.EndArrowDisp,
          o.EndArrowDisp = o.StartArrowDisp,
          o.StartArrowDisp = H
        ),
        o.hoplist.hops = [],
        o.hoplist.nhops = 0,
        o.segl = V,
        r = V.pts.length,
        o.StartPoint.x = V.pts[0].x,
        o.StartPoint.y = V.pts[0].y,
        o.EndPoint.x = V.pts[r - 1].x,
        o.EndPoint.y = V.pts[r - 1].y;
      var j = Utils2.Pt2Rect(o.StartPoint, o.EndPoint);
      for (i = 0; i < r; i++) o.segl.pts[i].x -= j.x,
        o.segl.pts[i].y -= j.y;
      return o.CalcFrame(),
        S = o.EndPoint,
        o.SegLFormat(S, ConstantData.ActionTriggerType.LINEEND, 0),
        o.CalcFrame(),
        this.FilterLinks(B, O, a),
        O &&
        O.length &&
        this.MoveLinks(M[1], M[0], O, null),
        B &&
        B.length &&
        this.MoveLinks(M[1], M[1], B, null),
        this.UpdateHook(
          M[1],
          D,
          - 1,
          o.hooks[D].hookpt,
          o.hooks[D].connect,
          o.hooks[D].cellid
        ),
        this.AddToDirtyList(M[1]),
        M[0]
    }
    return - 1
  }

  FindAllChildObjects(targetObjectId: number, filterDrawingBaseClass?: number, filterObjectType?: number): number[] {
    console.log("O.Opt FindAllChildObjects - Input:", {
      targetObjectId,
      filterDrawingBaseClass,
      filterObjectType
    });

    const links = this.GetObjectPtr(this.theLinksBlockID, false);
    const startIndex = this.FindLink(links, targetObjectId, true);
    const childObjectIds: number[] = [];
    const totalLinks = links.length;

    if (startIndex >= 0) {
      for (let index = startIndex; index < totalLinks && links[index].targetid === targetObjectId; index++) {
        const hookObjectId = links[index].hookid;
        const hookObject = this.GetObjectPtr(hookObjectId, false);
        if (hookObject) {
          if ((filterDrawingBaseClass != null && hookObject.DrawingObjectBaseClass !== filterDrawingBaseClass) ||
            (filterObjectType != null && hookObject.objecttype !== filterObjectType)) {
            // Skip this hookObject as it doesn't satisfy the filter criteria.
          } else {
            childObjectIds.push(hookObjectId);
          }
        }
      }
    }

    console.log("O.Opt FindAllChildObjects - Output:", { childObjectIds });
    return childObjectIds;
  }

  IsPlanningDocument() {
    return false;
  }

  /**
     * Restores the next state in the undo/redo history stack
     * @param shouldCancelModalOperation - Whether to cancel any active modal operations
     * @returns True if the redo operation was successful, false otherwise
     */
  Redo(shouldCancelModalOperation) {
    console.log("O.Opt Redo - Input:", { shouldCancelModalOperation });

    // Validate state manager exists
    if (null === GlobalData.stateManager) {
      throw new Error('stateManager is null');
    }

    // Handle modal operations
    if (shouldCancelModalOperation) {
      GlobalData.optManager.CancelModalOperation();
    }
    // Check if we're already at the last state
    else if (GlobalData.stateManager.CurrentStateID + 1 >= GlobalData.stateManager.States.length) {
      console.log("O.Opt Redo - Output: false (already at last state)");
      return false;
    }

    // Get the session data
    const sessionData = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
    const wasSpellCheckEnabled = sessionData.EnableSpellCheck;
    const hadNoRecentSymbols = sessionData.RecentSymbols.length === 0;

    // Get text editing session
    const textEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);

    // If active text editing is in progress, save it first
    if (textEditSession.theActiveTextEditObjectID !== -1 &&
      textEditSession.theTELastOp !== ConstantData.TELastOp.INIT &&
      textEditSession.theTELastOp !== ConstantData.TELastOp.TIMEOUT &&
      textEditSession.theTELastOp !== ConstantData.TELastOp.SELECT) {
      this.FlushTextToLMBlock();
      this.PreserveUndoState(false);
    }

    // Get layers manager and remember current layer type
    const layersManager = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, false);
    const previousLayerType = layersManager.layers[layersManager.activelayer].layertype;

    // Clean up URLs before state change
    this.Redo_DeleteURLs();

    // Check if a state is currently open
    const isStateOpen = Utils1.IsStateOpen();

    // Restore the next state and add to history
    GlobalData.stateManager.RestoreNextState();
    GlobalData.stateManager.AddToHistoryState();

    const currentStateId = GlobalData.stateManager.CurrentStateID;

    // Rebuild URLs for the new state
    this.RebuildURLs(GlobalData.stateManager.CurrentStateID - 1, true);

    // Resize and update the SVG document
    this.ResizeSVGDocument();
    this.UpdateLineHops(true);

    // Get updated session data after state restoration
    const updatedSessionData = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);

    // Update spell check if needed
    if (wasSpellCheckEnabled !== updatedSessionData.EnableSpellCheck) {
      SDUI.Commands.MainController.Document.SetSpellCheck(updatedSessionData.EnableSpellCheck, false);
    }

    // Update rulers if changed
    const currentRulerSettings = GlobalData.docHandler.rulerSettings;
    if (GlobalData.docHandler.RulersNotEqual(updatedSessionData.rulerSettings, currentRulerSettings)) {
      GlobalData.docHandler.SetRulers(updatedSessionData.rulerSettings, true);
    }

    // Update page settings if changed
    if (GlobalData.docHandler.PagesNotEqual(updatedSessionData.Page, GlobalData.optManager.theContentHeader.Page)) {
      GlobalData.optManager.theContentHeader.Page = Utils1.DeepCopy(updatedSessionData.Page);
    }

    // Get the current selection list
    const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, false);

    // Handle outline objects if needed
    const updatedTextEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);
    if (updatedTextEditSession.theActiveOutlineObjectID !== -1 && selectedList.length === 0) {
      const objectsToSelect = [];
      objectsToSelect.push(updatedTextEditSession.theActiveOutlineObjectID);
      this.SelectObjects(objectsToSelect, false, false);
    }

    // Clean up text editor events and render all SVG objects
    this.TEUnregisterEvents(true);
    GlobalData.optManager.InUndo = true;
    this.RenderAllSVGObjects();
    GlobalData.optManager.InUndo = false;

    // Get the updated session data
    const newSessionData = this.GetObjectPtr(this.theSEDSessionBlockID, false);

    // Reset active text edit after undo if needed
    if (updatedTextEditSession.theActiveTextEditObjectID !== -1) {
      this.ResetActiveTextEditAfterUndo();
    }

    // Update target selection display
    const targetSelectionId = GlobalData.optManager.GetTargetSelect();
    if (targetSelectionId >= 0) {
      const targetObject = this.GetObjectPtr(targetSelectionId, false);
      let dimensionsForDisplay = null;

      if (targetObject) {
        dimensionsForDisplay = targetObject.GetDimensionsForDisplay();
        this.ShowFrame(true);
      }

      GlobalData.optManager.UpdateDisplayCoordinates(dimensionsForDisplay, null, null, targetObject);
    } else {
      this.ShowFrame(false);
    }

    // Handle layer type changes
    const updatedLayersManager = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, false);
    const newLayerType = updatedLayersManager.layers[updatedLayersManager.activelayer].layertype;

    // Update selection attributes
    this.UpdateSelectionAttributes(selectedList);

    // Save changed blocks if state wasn't open
    if (!isStateOpen) {
      SDF.SaveChangedBlocks(currentStateId, 1);
    }

    console.log("O.Opt Redo - Output: true");
    return true;
  }

  /**
     * Pastes objects from clipboard based on the current context (text edit, table, etc.)
     * Handles different clipboard types and dispatches to appropriate paste handlers.
     *
     * @param event - The event that triggered the paste operation
     * @returns void
     */
  PasteObjects(event) {
    console.log("O.Opt PasteObjects - Input:", event);

    try {
      let activeEditor;
      let tableObject;
      const textEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);
      const activeTableId = this.Table_GetActiveID();

      if (activeTableId >= 0) {
        tableObject = this.GetObjectPtr(activeTableId, false);
      }

      if ((textEditSession.theActiveTextEditObjectID !== -1 || this.bInNoteEdit)) {
        // Case 1.1: Paste table content if the clipboard has table data
        if (textEditSession.theActiveTableObjectID >= 0 &&
          this.theContentHeader.ClipboardType === ConstantData.ClipboardType.Table &&
          this.theContentHeader.ClipboardBuffer) {
          this.Table_PasteCellContent(textEditSession.theActiveTableObjectID);
          console.log("O.Opt PasteObjects - Output: Table content pasted");
          return;
        }

        // Case 1.2: Paste text if the clipboard has text content
        if (this.theTextClipboard && this.theTextClipboard.text) {
          // Handle IE-specific line ending issues
          if (Clipboard.isIe) {
            const textLength = this.theTextClipboard.text.length;
            if (textLength >= 2 &&
              this.theTextClipboard.text[textLength - 2] === '\r' &&
              this.theTextClipboard.text[textLength - 1] === '\n') {
              this.theTextClipboard.text = this.theTextClipboard.text.slice(0, -2);
            }
          }

          // Paste text into active editor
          activeEditor = this.svgDoc.GetActiveEdit();
          if (activeEditor) {
            // Collab.BeginSecondaryEdit();
            this.RegisterLastTEOp(ConstantData.TELastOp.PASTE);
            activeEditor.Paste(this.theTextClipboard, true);
            this.RegisterLastTEOp(ConstantData.TELastOp.TIMEOUT);
          }
        }
        console.log("O.Opt PasteObjects - Output: Text pasted in text editor");
        return;
      }

      // Case 2: We're in dimension editing mode
      if (GlobalData.optManager.bInDimensionEdit) {
        if (this.theTextClipboard && this.theTextClipboard.text) {
          activeEditor = this.svgDoc.GetActiveEdit();
          if (activeEditor) {
            activeEditor.Paste(this.theTextClipboard, true);
          }
        }
        console.log("O.Opt PasteObjects - Output: Text pasted in dimension editor");
        return;
      }

      // Case 3: We have text and a target is selected
      if (this.theTextClipboard &&
        this.theTextClipboard.text &&
        this.theTextClipboard.text !== '\r\n') {
        if (this.GetTargetSelect() !== -1) {
          this.TargetPasteText();
          console.log("O.Opt PasteObjects - Output: Text pasted to target");
          return;
        }
      }

      // Case 4: Handle image clipboard content
      if (this.theImageClipboard &&
        this.theContentHeader.ClipboardType === ConstantData.ClipboardType.Image) {
        GlobalData.optManager.SetBackgroundImage(this.theImageClipboard, 0);
        console.log("O.Opt PasteObjects - Output: Image pasted as background");
        return;
      }

      // Case 5: Handle table cell content paste
      if (textEditSession.theActiveTableObjectID >= 0) {
        const hasTableClipboard = (
          this.theContentHeader.ClipboardType === ConstantData.ClipboardType.Table &&
          this.theContentHeader.ClipboardBuffer
        );

        const hasTextClipboard = (
          this.theTextClipboard &&
          this.theTextClipboard.text &&
          this.theTextClipboard.text !== '\r\n'
        );

        if (hasTableClipboard || hasTextClipboard) {
          this.Table_PasteCellContent(textEditSession.theActiveTableObjectID);
          console.log("O.Opt PasteObjects - Output: Content pasted into table cell");
          return;
        }
      }

      // Default case: Close any active edit and paste LM content
      this.CloseEdit(false);

      if (this.theContentHeader.ClipboardBuffer &&
        this.theContentHeader.ClipboardType === ConstantData.ClipboardType.LM) {
        // Collab.BeginSecondaryEdit();
        this.PasteLM(this.theContentHeader.ClipboardBuffer);
        console.log("O.Opt PasteObjects - Output: LM content pasted");
      } else {
        console.log("O.Opt PasteObjects - Output: No pasteable content found");
      }
    } catch (error) {
      console.log("O.Opt PasteObjects - Error:", error);
      throw error;
    }
  }

  TargetPasteText(): boolean {
    console.log("O.Opt TargetPasteText - Input: no parameters");

    // Check if text clipboard exists and has text content
    if (!this.theTextClipboard) {
      console.log("O.Opt TargetPasteText - Output: false (text clipboard does not exist)");
      return false;
    }
    if (this.theTextClipboard.text == null) {
      console.log("O.Opt TargetPasteText - Output: false (text clipboard text is null)");
      return false;
    }

    // Get the target selection ID
    const targetId = this.GetTargetSelect();
    if (targetId !== -1) {
      const targetObject = this.GetObjectPtr(targetId, false);
      if (targetObject && targetObject.AllowTextEdit()) {
        // Begin secondary edit operation
        // Collab.BeginSecondaryEdit();

        // Get the DOM element for the target text object and activate text edit mode
        const textElement = this.svgObjectLayer.GetElementByID(targetId);
        this.ActivateTextEdit(textElement);

        // Get the active text editor object and select its entire text
        const activeEditor = this.svgDoc.GetActiveEdit();
        const currentTextLength = activeEditor.GetText().length;
        activeEditor.SetSelectedRange(0, currentTextLength);

        // Paste clipboard text and update the text edit state
        this.RegisterLastTEOp(ConstantData.TELastOp.PASTE);
        activeEditor.Paste(this.theTextClipboard, true);
        this.RegisterLastTEOp(ConstantData.TELastOp.TIMEOUT);

        console.log("O.Opt TargetPasteText - Output: true (text pasted successfully)");
        return true;
      }
    }
    console.log("O.Opt TargetPasteText - Output: false (invalid target or text editing not allowed)");
    return false;
  }

  TERegisterEvents(textEditorWrapper, activationEvent, additionalOptions) {
    console.log("O.Opt TERegisterEvents - Input:", { textEditorWrapper, activationEvent, additionalOptions });
    if (textEditorWrapper != null) {
      // Set up virtual keyboard for the text editor
      this.SetVirtualKeyboardLifter(textEditorWrapper);
      // Activate the text editor with provided activation details
      textEditorWrapper.Activate(activationEvent, additionalOptions);

      // Initialize Hammer instances for various elements
      this.TETextHammer = Hammer(textEditorWrapper.editor.parent.textElem.node);
      this.TEClickAreaHammer = Hammer(textEditorWrapper.editor.parent.clickAreaElem.node);
      this.TEDecAreaHammer = Hammer(textEditorWrapper.editor.parent.decorationAreaElem.node);
      this.TEWorkAreaHammer = Hammer(document.getElementById('svg-area'));

      // Register drag event listeners
      this.TETextHammer.on("dragstart", this.TEDragStartFactory(textEditorWrapper.editor));
      this.TEClickAreaHammer.on("dragstart", this.TEClickAreaDragStartFactory(textEditorWrapper.editor));
      this.TEDecAreaHammer.on("dragstart", this.TEClickAreaDragStartFactory(textEditorWrapper.editor));
      this.TEWorkAreaHammer.on("drag", this.TEDragFactory(textEditorWrapper.editor));
      this.TEWorkAreaHammer.on("dragend", this.TEDragEndFactory(textEditorWrapper.editor));
    }
    console.log("O.Opt TERegisterEvents - Output: Registered events");
  }

  SetVirtualKeyboardLifter(editor: any) {
    console.log("O.Opt SetVirtualKeyboardLifter - Input:", editor);

    if (GlobalData.optManager.isAndroid || GlobalData.gDebugMobileTextDialog) {
      editor.SetVirtualKeyboardHook(
        function (editorInstance: any, proxyElement: any) {
          console.log("O.Opt MobileTextDialogTrigger Callback - Input:", editorInstance, proxyElement);
          GlobalData.optManager.MobileTextDialogTrigger(editorInstance, proxyElement);
          console.log("O.Opt MobileTextDialogTrigger Callback - Output");
        },
        null
      );
    } else {
      if (!GlobalData.optManager.WorkAreaTextInputProxy) {
        GlobalData.optManager.WorkAreaTextInputProxy = $('#SDTS_TouchProxy');
      }
      GlobalData.optManager.WorkAreaTextInputProxy.val('');
      editor.SetVirtualKeyboardHook(
        function (editorInstance: any, proxyElement: any) {
          console.log("O.Opt VirtualKeyboardLifter Callback - Input:", editorInstance, proxyElement);
          GlobalData.optManager.VirtualKeyboardLifter(editorInstance, proxyElement);
          console.log("O.Opt VirtualKeyboardLifter Callback - Output");
        },
        GlobalData.optManager.WorkAreaTextInputProxy
      );
    }

    console.log("O.Opt SetVirtualKeyboardLifter - Output: hook set");
  }

  VirtualKeyboardLifter(element: any, isActive: boolean) {
    console.log("O.Opt VirtualKeyboardLifter - Input:", { element, isActive });

    if (isActive) {
      // Calculate the element's frame in document coordinates.
      const elementFrame = element.CalcElementFrame();
      let frameChanged = false;
      let forceUpdate = false;

      // Check if the previously stored frame exists and is different.
      if (GlobalData.optManager.theVirtualKeyboardLifterElementFrame) {
        frameChanged =
          elementFrame.x !== GlobalData.optManager.theVirtualKeyboardLifterElementFrame.x ||
          elementFrame.y !== GlobalData.optManager.theVirtualKeyboardLifterElementFrame.y ||
          elementFrame.width !== GlobalData.optManager.theVirtualKeyboardLifterElementFrame.width ||
          elementFrame.height !== GlobalData.optManager.theVirtualKeyboardLifterElementFrame.height;
      } else {
        forceUpdate = true;
      }

      // If the frame has changed or there's no previous frame.
      if (frameChanged || forceUpdate) {
        // Convert element frame's top-left coordinates from document to window coordinates.
        let windowCoords = GlobalData.docHandler.DocObject().ConvertDocToWindowCoords(elementFrame.x, elementFrame.y);

        // Convert width and height from document lengths to window lengths.
        let windowWidth = GlobalData.docHandler.DocObject().ConvertDocToWindowLength(elementFrame.width);
        if (windowWidth === 0) {
          windowWidth = 1;
        }
        let windowHeight = GlobalData.docHandler.DocObject().ConvertDocToWindowLength(elementFrame.height);
        if (windowHeight === 0) {
          windowHeight = 1;
        }

        // Store the updated frame.
        GlobalData.optManager.theVirtualKeyboardLifterElementFrame = $.extend(true, {}, elementFrame);

        // Make the text input proxy visible.
        GlobalData.optManager.WorkAreaTextInputProxy.css('visibility', 'visible');

        // Check for debug flag to style differently.
        if (GlobalDatagDebugVirtualKeyboardLifter) {
          GlobalData.optManager.WorkAreaTextInputProxy.css('background-color', 'yellow');
          GlobalData.optManager.WorkAreaTextInputProxy.css('opacity', '0.25');
          GlobalData.optManager.WorkAreaTextInputProxy.css('color', 'black');
          GlobalData.optManager.WorkAreaTextInputProxy.css('z-index', '1000');
          // Adjust vertical position for debug.
          windowCoords.y += windowHeight;
        } else {
          GlobalData.optManager.WorkAreaTextInputProxy.css('opacity', '0');
          GlobalData.optManager.WorkAreaTextInputProxy.css('color', 'transparent');
          GlobalData.optManager.WorkAreaTextInputProxy.css('z-index', '-1000');
          GlobalData.optManager.WorkAreaTextInputProxy.css('text-align', 'left');
          // On Mac, adjust the coordinates; otherwise, hide the proxy off-screen.
          if (GlobalData.optManager.isMac) {
            windowCoords.x += windowWidth;
            windowHeight = 1;
          } else {
            windowCoords.x = -9999;
            windowWidth = 800;
          }
        }

        // Apply the calculated CSS positioning and dimensions.
        GlobalData.optManager.WorkAreaTextInputProxy.css('left', windowCoords.x + 'px');
        GlobalData.optManager.WorkAreaTextInputProxy.css('top', windowCoords.y + 'px');
        GlobalData.optManager.WorkAreaTextInputProxy.css('width', windowWidth + 'px');
        GlobalData.optManager.WorkAreaTextInputProxy.css('height', windowHeight + 'px');

        // If it's a forced update, clear the proxy's content.
        if (forceUpdate) {
          GlobalData.optManager.WorkAreaTextInputProxy.val('');
        }

        // Set focus to the proxy to trigger the virtual keyboard.
        GlobalData.optManager.WorkAreaTextInputProxy.focus();
      }
    } else {
      // When deactivating the virtual keyboard lifter.
      GlobalData.optManager.theVirtualKeyboardLifterElementFrame = null;
      GlobalData.optManager.WorkAreaTextInputProxy.css('visibility', 'visible');
      GlobalData.optManager.WorkAreaTextInputProxy.blur();
      GlobalData.optManager.WorkAreaTextInputProxy.val('');
      GlobalData.optManager.WorkAreaTextInputProxy.css('visibility', 'hidden');
    }

    console.log("O.Opt VirtualKeyboardLifter - Output: completed");
  }

  /**
     * Returns a handler function for drag start events.
     * This factory logs the provided drag handler and returns a function that handles mouse down events.
     * @param mouseDragHandler - The drag handler object with a method HandleMouseDown.
     * @returns A function to handle the mouse down event.
     */
  TEDragStartFactory(mouseDragHandler: any) {
    console.log("O.Opt TEDragStartFactory - Input:", { mouseDragHandler });
    return function (pointerEvent: any) {
      console.log("O.Opt TEDragStartHandler - Input:", { pointerEvent });
      pointerEvent.preventDefault();
      pointerEvent.stopPropagation();
      pointerEvent.gesture.preventDefault();
      pointerEvent.gesture.stopPropagation();
      // Call the handler's mouse down method.
      mouseDragHandler.HandleMouseDown(pointerEvent);
      console.log("O.Opt TEDragStartHandler - Output: Mouse down handled");
      return false;
    };
  }

  /**
   * Returns a handler function for click area drag start events.
   * This factory logs the provided click area handler and returns a function that handles mouse down events in the click area.
   * @param clickAreaHandler - The click area handler object with a method HandleMouseDown.
   * @returns A function to handle the mouse down event for the click area.
   */
  TEClickAreaDragStartFactory(clickAreaHandler: any) {
    console.log("O.Opt TEClickAreaDragStartFactory - Input:", { clickAreaHandler });
    return function (pointerEvent: any) {
      console.log("O.Opt TEClickAreaDragStartHandler - Input:", { pointerEvent });
      pointerEvent.preventDefault();
      pointerEvent.stopPropagation();
      pointerEvent.gesture.preventDefault();
      pointerEvent.gesture.stopPropagation();
      // Call the handler's mouse down method.
      clickAreaHandler.HandleMouseDown(pointerEvent);
      console.log("O.Opt TEClickAreaDragStartHandler - Output: Mouse down handled");
      return false;
    };
  }

  /**
     * Returns a handler function for drag move events.
     * This factory logs the provided move handler and returns a function that handles mouse move events.
     * @param dragMoveHandler - The drag move handler object with a method HandleMouseMove.
     * @returns A function to handle the mouse move event.
     */
  TEDragFactory(dragMoveHandler: any) {
    console.log("O.Opt TEDragFactory - Input:", { dragMoveHandler });
    return function (pointerEvent: any) {
      console.log("O.Opt TEDragHandler - Input:", { pointerEvent });
      pointerEvent.preventDefault();
      pointerEvent.stopPropagation();
      pointerEvent.gesture.preventDefault();
      pointerEvent.gesture.stopPropagation();
      // Call the handler's mouse move method.
      dragMoveHandler.HandleMouseMove(pointerEvent);
      console.log("O.Opt TEDragHandler - Output: Mouse move handled");
      return false;
    };
  }

  /**
   * Returns a handler function for drag end events.
   * This factory logs the provided end handler and returns a function that handles mouse up events.
   * After the mouse up event is processed, it calls Collab.UnBlockMessages to unblock collaborator messages.
   * @param dragEndHandler - The drag end handler object with a method HandleMouseUp.
   * @returns A function to handle the mouse up event.
   */
  TEDragEndFactory(dragEndHandler: any) {
    console.log("O.Opt TEDragEndFactory - Input:", { dragEndHandler });
    return function (pointerEvent: any) {
      console.log("O.Opt TEDragEndHandler - Input:", { pointerEvent });
      pointerEvent.preventDefault();
      pointerEvent.stopPropagation();
      pointerEvent.gesture.preventDefault();
      pointerEvent.gesture.stopPropagation();
      // Call the handler's mouse up method.
      dragEndHandler.HandleMouseUp(pointerEvent);
      console.log("O.Opt TEDragEndHandler - Calling Collab.UnBlockMessages()");
      // Collab.UnBlockMessages();
      console.log("O.Opt TEDragEndHandler - Output: Mouse up handled and messages unblocked");
      return false;
    };
  }

  /**
     * Calculates the default initial text style based on the input style settings.
     * @param inputStyle - An object containing text style properties including:
     *                     FontName, FontSize, FontType, Face, and Paint properties.
     * @returns A DefaultStyle object with computed style properties.
     */
  CalcDefaultInitialTextStyle(inputStyle) {
    console.log("O.Opt CalcDefaultInitialTextStyle - Input:", inputStyle);

    const defaultStyle = new DefaultStyle();
    const textFace = ConstantData.TextFace;

    defaultStyle.font = inputStyle.FontName;
    defaultStyle.size = SDF.PointSizeToFontSize(inputStyle.FontSize);
    defaultStyle.type = inputStyle.FontType;
    defaultStyle.color = inputStyle.Paint.Color;
    defaultStyle.colorTrans = inputStyle.Paint.Opacity;
    defaultStyle.weight = (inputStyle.Face & textFace.Bold) ? 'bold' : 'normal';
    defaultStyle.style = (inputStyle.Face & textFace.Italic) ? 'italic' : 'normal';
    defaultStyle.decoration = (inputStyle.Face & textFace.Underline) ? 'underline' : 'none';

    console.log("O.Opt CalcDefaultInitialTextStyle - Output:", defaultStyle);
    return defaultStyle;
  }

  /**
     * Shows or hides the SVG selection state for a given object.
     * Logs the input parameters and the final state change.
     * @param objectId - The identifier of the object.
     * @param isSelected - A boolean flag indicating whether the object is selected.
     */
  ShowSVGSelectionState(objectId: number, isSelected: boolean): void {
    console.log("O.Opt ShowSVGSelectionState - Input:", { objectId, isSelected });

    // Build an action element id using the constant prefix and object id.
    const actionElementId = ConstantData.Defines.Action + objectId;
    // Retrieve the currently target selected object id.
    const targetSelection = this.GetTargetSelect();
    // Attempt to retrieve the overlay SVG element for the action.
    let overlayElement = this.svgOverlayLayer.GetElementByID(actionElementId);
    // Retrieve the main SVG object element.
    const objectElement = this.svgObjectLayer.GetElementByID(objectId);
    // Get the object data pointer.
    const objectData = this.GetObjectPtr(objectId, false);

    if (objectData !== null) {
      let eventProxy: any;

      // If there is no overlay element and the selection should be shown.
      if (overlayElement === null && isSelected) {
        // Create action triggers for the object.
        overlayElement = objectData.CreateActionTriggers(this.svgDoc, objectId, objectElement, targetSelection);
        if (overlayElement !== null) {
          // Add the created trigger element to the overlay layer.
          this.svgOverlayLayer.AddElement(overlayElement);
          try {
            // Set rotation on the overlay element.
            overlayElement.SetRotation(objectData.RotationAngle);
          } catch (error) {
            throw error;
          }
          // If the object is allowed to grow, then set up gesture event bindings.
          if (!objectData.NoGrow()) {
            const domElement = overlayElement.DOMElement();
            const hammerInstance = Hammer(domElement);
            hammerInstance.on('tap', Evt_ActionTriggerTap);
            hammerInstance.on('dragstart', ((currentObject) => {
              return (event: any) => {
                currentObject.LM_ActionClick(event);
                return false;
              };
            })(objectData));
            overlayElement.SetEventProxy(hammerInstance);
          }
        }
      } else if (overlayElement !== null && !isSelected) {
        // If the overlay element exists and selection is removed, then remove it.
        this.svgOverlayLayer.RemoveElement(overlayElement);
      }

      // Update the opacity of dimension elements if the object's dimensions include selection flag.
      if (objectData.Dimensions & ConstantData.DimensionFlags.SED_DF_Select) {
        for (let index = objectElement.ElementCount() - 1; index >= 1; index--) {
          const childElement = objectElement.GetElementByIndex(index);
          // If the element is a dimension line or dimension text, update its opacity.
          if (
            childElement.GetID() === ConstantData.SVGElementClass.DIMENSIONLINE ||
            childElement.GetID() === ConstantData.SVGElementClass.DIMENSIONTEXT
          ) {
            childElement.SetOpacity(isSelected ? 1 : 0);
          }
        }
      }
    }

    console.log("O.Opt ShowSVGSelectionState - Output:", { objectId, isSelected });
  }

  /**
     * Registers the last text editor operation.
     * This function updates the internal state of the text editor session based on the given operation.
     * It preserves the undo state if necessary, sends out collaboration messages in case of a timeout,
     * and triggers a typing pause timer in case the operation is a character input.
     *
     * @param lastOp - The current text editor operation (e.g. CHAR, INIT, SELECT, TIMEOUT)
     */
  RegisterLastTEOp(lastOp: number) {
    console.log("O.Opt RegisterLastTEOp - Input:", { lastOp });
    const opConstants = ConstantData.TELastOp;

    // Only proceed if not in note edit mode.
    if (!this.bInNoteEdit) {
      // Collab.BeginSecondaryEdit();
      const session = this.GetObjectPtr(this.theTEDSessionBlockID, false);
      const previousOp = session.theTELastOp;

      // If there is an active text entry timer and the current operation is not a character,
      // clear the timer and register a TIMEOUT operation.
      if (
        this.textEntryTimer != null &&
        lastOp !== opConstants.CHAR
      ) {
        clearTimeout(this.textEntryTimer);
        this.textEntryTimer = null;
        this.RegisterLastTEOp(opConstants.TIMEOUT);
      }

      // Update the session with the current operation.
      session.theTELastOp = lastOp;
      if (lastOp !== opConstants.INIT) {
        session.theTEWasEdited = true;
      }

      // Decide whether to process the operation based on the previous operation.
      const shouldProcess = (prevOp: number): boolean => {
        if (lastOp !== opConstants.INIT) {
          switch (lastOp) {
            case opConstants.CHAR:
              if (prevOp !== lastOp) return true;
              break;
            case opConstants.SELECT:
              return false;
            default:
              return true;
          }
        }
        return false;
      };

      if (shouldProcess(previousOp)) {
        const activeEditor = this.svgDoc.GetActiveEdit();
        let runtimeText: string | null = null;
        let selectedRange: any = null;
        const activeTextEditObj = this.GetObjectPtr(session.theActiveTextEditObjectID, false);

        // Proceed only if there is a valid active text edit object
        if (activeTextEditObj && activeTextEditObj.DataID >= 0 && activeEditor) {
          const textDataId = activeTextEditObj.DataID;
          runtimeText = activeEditor.GetRuntimeText();
          selectedRange = activeEditor.GetSelectedRange();

          if (runtimeText) {
            this.PreserveUndoState(false);
            let textObject = this.GetObjectPtr(textDataId, false);
            if (textObject) {
              // Update text object with the current content and selection range.
              textObject.runtimeText = runtimeText;
              textObject.selrange = selectedRange;

              if (lastOp !== opConstants.TIMEOUT) {
                // Set text parameters based on the editor's formatter and minimum height.
                TextParams.minWidth = activeEditor.formatter.limits.minWidth;
                TextParams.maxWidth = activeEditor.formatter.limits.maxWidth;
                TextParams.minHeight = activeEditor.minHeight;

                // Retrieve updated objects
                const activeTextEditObjUpdated = this.GetObjectPtr(session.theActiveTextEditObjectID, true);
                textObject = this.GetObjectPtr(textDataId, true);
                const tableObject = activeTextEditObjUpdated.GetTable(true);
                // Optionally process table related logic here if necessary.
              }

              if (lastOp === opConstants.TIMEOUT && Collab.AllowMessage()) {
                // Prepare collaboration message for text edit timeout.
                const messageData: any = {};
                messageData.BlockID = session.theActiveTextEditObjectID;
                const messageTarget = GlobalData.optManager.GetObjectPtr(messageData.BlockID, false);
                let tableObj: any = messageTarget.GetTable(false);

                if (tableObj) {
                  messageData.TableSelect = tableObj.select >= 0 ? tableObj.cells[tableObj.select].uniqueid : -1;
                } else if (messageTarget && messageTarget instanceof SDJS.Connector) {
                  messageData.DataID = messageTarget.DataID;
                }

                messageData.runtimeText = Utils1.DeepCopy(runtimeText);
                messageData.selrange = Utils1.DeepCopy(selectedRange);
                messageData.minWidth = TextParams.minWidth;
                messageData.maxWidth = TextParams.maxWidth;
                messageData.minHeight = TextParams.minHeight;

                // Collab.BuildMessage(ConstantData.CollabMessages.Text_Edit, messageData, false);
                TextParams.minWidth = null;
                // Collab.UnBlockMessages();
              }
            }
          }
        }
      } else {
        // If processing is not needed, flag for unblocking messages.
        var shouldUnblock = true;
      }

      // If the current operation is a character input, reset the typing pause timeout.
      if (lastOp === opConstants.CHAR) {
        clearTimeout(this.textEntryTimer);
        this.textEntryTimer = null;
        this.textEntryTimer = setTimeout(GlobalData.optManager.TextEdit_PauseTyping, 1000);
      } else if (shouldUnblock) {
        // Collab.UnBlockMessages();
      }
    }
    console.log("O.Opt RegisterLastTEOp - Output: Completed");
  }

  /**
     * Deactivates the text edit mode and saves any changes made to the text.
     * This function handles cleanup of text editing state, saving content changes,
     * and potentially deleting empty text objects.
     *
     * @param preventCompleteOperation - If true, prevents triggering a complete operation
     * @param shouldCloseTable - If true, closes the associated table after deactivation
     */
  DeactivateTextEdit(preventCompleteOperation, shouldCloseTable) {
    console.log("O.Opt DeactivateTextEdit - Input:", { preventCompleteOperation, shouldCloseTable });

    let textDataId, objectIndex, cellCount;
    let session = this.GetObjectPtr(this.theTEDSessionBlockID, false);
    let operationRequired = false;
    let tableSelectedIndex = null;
    let messageData = {};

    // Clear text entry timer if active
    if (this.textEntryTimer != null) {
      clearTimeout(this.textEntryTimer);
      this.textEntryTimer = null;

      const wasMessagesLocked = Collab.AreMessagesLocked();
      // Collab.LockMessages();
      this.RegisterLastTEOp(ConstantData.TELastOp.TIMEOUT);
      if (!wasMessagesLocked) {
        // Collab.UnLockMessages();
      }
    }

    // Process only if there's an active text editing object
    if (session.theActiveTextEditObjectID != -1) {
      // Collab.BeginSecondaryEdit();
      session = this.GetObjectPtr(this.theTEDSessionBlockID, true);

      let selectedRange;
      let isTextEmpty = false;
      let isTextOnlyObject = false;
      let textEditor = this.svgDoc.GetActiveEdit();
      let runtimeText = null;
      let isNotInTable = session.theActiveTableObjectID < 0;
      let drawingObject = this.GetObjectPtr(session.theActiveTextEditObjectID, true);

      if (drawingObject) {
        drawingObject.TableID < 0 && (isNotInTable = true);

        const textDataId = drawingObject.DataID;

        // Handle resize flags
        if (session.theTEWasResized) {
          messageData.theTEWasResized = true;
          this.SetLinkFlag(
            session.theActiveTextEditObjectID,
            ConstantData.LinkFlags.SED_L_MOVE
          );

          if (drawingObject.hooks.length) {
            this.SetLinkFlag(drawingObject.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE);
          }

          session.theTEWasResized = false;
          session.theTEWasEdited = true;

          if (session.theActiveTableObjectID < 0) {
            this.AddToDirtyList(session.theActiveTextEditObjectID);
          }
        }

        // Special handling for 3D symbols
        if (drawingObject instanceof Instance.Shape.D3Symbol) {
          isNotInTable = false;
        }

        // Check if object has a table
        let tableData = drawingObject.GetTable(false);
        if (tableData) {
          isNotInTable = false;
        }
      }

      // Handle active editor state
      if (textEditor && (runtimeText = textEditor.GetRuntimeText())) {
        selectedRange = textEditor.GetSelectedRange();

        // Check if text is empty (only whitespace)
        isTextEmpty = textEditor.HasDataFields()
          ? 0 === textEditor.GetTextMinDimensions().width
          : 0 === textEditor.GetTextMinDimensions().width || textEditor.GetText() === ' ';

        // Handle reversal of standard text replacement
        if (isTextEmpty && this.ReverseReplaceStdText(drawingObject, textEditor)) {
          isTextEmpty = false;
          runtimeText = textEditor.GetRuntimeText();
          selectedRange = textEditor.GetSelectedRange();
        }

        // Get formatting style from the editor
        const formatStyle = textEditor.formatter.GetFormatAtOffset(0);

        // Apply style to the drawing object or table
        if (isNotInTable) {
          // Apply style directly to the object
          this.TextStyleToSDText(drawingObject.StyleRecord.Text, formatStyle.style);
        } else {
          // Apply style to the table cell
          let tableData = drawingObject.GetTable(true);
          if (tableData) {
            tableSelectedIndex = tableData.select;

            // Find the cell index if not already selected
            if (tableData.select < 0 && drawingObject.DataID >= 0) {
              for (cellCount = tableData.cells.length, objectIndex = 0; objectIndex < cellCount; objectIndex++) {
                if (tableData.cells[objectIndex].DataID === drawingObject.DataID) {
                  tableData.select = objectIndex;
                  break;
                }
              }
            }

            this.Table_SaveTextStyle(tableData, formatStyle.style);
          }
        }

        isTextOnlyObject = !!(drawingObject.flags & ConstantData.ObjFlags.SEDO_TextOnly);

        // Save text to the data object
        if (textDataId != -1) {
          let textDataObject = this.GetObjectPtr(textDataId, false);
          if (textDataObject) {
            textDataObject.runtimeText = runtimeText;
            textDataObject.selrange = selectedRange;

            textDataObject = this.GetObjectPtr(textDataId, true);

            // Create collaboration message if enabled
            // if (Collab.AllowMessage()) {
            //   messageData.BlockID = drawingObject.BlockID;
            //   messageData.runtimeText = Utils1.DeepCopy(runtimeText);
            //   messageData.selrange = Utils1.DeepCopy(selectedRange);
            //   messageData.empty = isTextEmpty;
            //   messageData.isTextLabel = isTextOnlyObject;
            //   messageData.closetable = shouldCloseTable;

            //   // Add additional information for tables or connectors
            //   if (tableData) {
            //     messageData.TableSelect = tableData.select >= 0
            //       ? tableData.cells[tableData.select].uniqueid
            //       : -1;
            //   } else if (drawingObject && drawingObject instanceof SDJS.Connector) {
            //     messageData.DataID = drawingObject.DataID;
            //   }

            //   Collab.BuildMessage(ConstantData.CollabMessages.Text_End, messageData, false);
            // }

            // Restore table selection
            if (tableSelectedIndex != null) {
              tableData.select = tableSelectedIndex;
            }

            // Mark the object as dirty if not in a table
            if (session.theActiveTableObjectID < 0) {
              this.AddToDirtyList(session.theActiveTextEditObjectID);
            }
          }
        }
      }

      // Unregister text editing events
      this.TEUnregisterEvents();

      // Handle empty text objects
      if (isTextEmpty) {
        if (isTextOnlyObject) {
          // Delete text-only objects that are empty
          this.DeleteObjects([session.theActiveTextEditObjectID], false);
          drawingObject = null;

          // Remove from selection list
          const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, true);
          const indexInSelection = selectedList.indexOf(session.theActiveTextEditObjectID);

          if (indexInSelection >= 0) {
            selectedList.splice(indexInSelection, 1);

            // Reset target selection if needed
            if (this.GetTargetSelect() === session.theActiveTextEditObjectID) {
              this.SetTargetSelect(-1, true);
            }
          }

          session.theTEWasEdited = true;
        } else {
          // Remove text data from non-text-only objects
          const textDataBlock = GlobalData.objectStore.GetObject(textDataId);

          drawingObject = this.GetObjectPtr(session.theActiveTextEditObjectID, true);
          if (drawingObject) {
            drawingObject.SetTextObject(-1);
          }

          if (textDataBlock) {
            textDataBlock.Delete();
          }

          if (session.theActiveTableObjectID < 0) {
            this.AddToDirtyList(session.theActiveTextEditObjectID);
          }

          session.theTEWasEdited = true;
        }
      }

      // Mark if operation is required
      if (session.theTEWasEdited) {
        operationRequired = true;
      }

      // Reset session state
      session.theActiveTextEditObjectID = -1;
      session.theTEWasEdited = false;
      session.theTEWasResized = false;
      session.theTELastOp = ConstantData.TELastOp.INIT;

      // Handle table deactivation
      if (drawingObject && drawingObject.GetTable) {
        let tableData = drawingObject.GetTable(true);
        if (tableData) {
          this.Table_DeActivateText(drawingObject, tableData);
          drawingObject.DataID = -1;
        }

        // Handle graph deactivation
        let graphData = drawingObject.GetGraph(true);
        if (graphData) {
          this.Graph_DeActivateText(drawingObject, graphData);
          drawingObject.DataID = -1;
        }

        // Special business manager handling
        if (graphData == null && tableData == null) {
          const businessManager = Business.GetSelectionBusinessManager(drawingObject.BlockID);
          if (businessManager) {
            const textElement = this.svgObjectLayer.GetElementByID(drawingObject.BlockID).GetElementByID(ConstantData.SVGElementClass.TEXT);
            businessManager.ShapeSaveData(drawingObject, textElement);
          }
        }
      }

      // Reset state and finalize operation
      // const wasMessagesLocked = Collab.AreMessagesLocked();
      // Collab.LockMessages();
      this.RegisterLastTEOp(ConstantData.TELastOp.INIT);

      // if (!wasMessagesLocked) {
      //   Collab.UnLockMessages();
      // }

      // Handle table release if requested
      if (shouldCloseTable) {
        this.Table_Release(false);
      }

      // Complete operation if needed and not prevented
      if (operationRequired && !preventCompleteOperation) {
        GlobalData.optManager.CompleteOperation(null);
      } else {
        this.PreserveUndoState(false);
        this.RenderDirtySVGObjects();
      }

      // Collab.UnBlockMessages();
    }

    console.log("O.Opt DeactivateTextEdit - Output: Text edit deactivated");
  }

  /**
     * Updates the SD text object style based on the given text style settings.
     * @param sdText - The SD text object whose style will be updated.
     * @param textStyle - The text style parameters containing font, size, weight, style, baseOffset, decoration, color, and color transparency.
     */
  TextStyleToSDText(sdText, textStyle) {
    console.log("O.Opt TextStyleToSDText - Input:", { sdText, textStyle });

    // Convert the font size from percentage to points (72 points per inch conversion)
    sdText.FontSize = Math.round(72 * textStyle.size / 100);

    // Determine the font identifier based on the font name provided in textStyle
    sdText.FontId = this.GetFontIdByName(textStyle.font);

    // Set font properties
    sdText.FontName = textStyle.font;
    sdText.Face = 0;

    // Update face flag for bold text
    if (textStyle.weight === 'bold') {
      sdText.Face += FileParser.TextFace.St_Bold;
    }

    // Update face flag for italic text
    if (textStyle.style === 'italic') {
      sdText.Face += FileParser.TextFace.St_Italic;
    }

    // Update face flag based on subscript or superscript offset
    if (textStyle.baseOffset === 'sub') {
      sdText.Face += FileParser.TextFace.St_Sub;
    } else if (textStyle.baseOffset === 'super') {
      sdText.Face += FileParser.TextFace.St_Super;
    }

    // Update face flag for text decorations (underline or strike-through)
    if (textStyle.decoration === 'underline') {
      sdText.Face += FileParser.TextFace.St_Under;
    } else if (textStyle.decoration === 'line-through') {
      sdText.Face += FileParser.TextFace.St_Strike;
    }

    // Set text color properties
    sdText.Paint.Color = textStyle.color;
    sdText.Paint.Opacity = textStyle.colorTrans;

    console.log("O.Opt TextStyleToSDText - Output:", sdText);
  }

  /**
     * Converts a given font size value to points based on the document's DPI.
     * Logs the input value and output result using the prefix "O.Opt".
     *
     * @param fontSizeValue - The font size value to convert.
     * @returns The font size in points, or -1 if the input is invalid.
     */
  FontSizeToPoints(fontSizeValue: number): number {
    console.log("O.Opt FontSizeToPoints - Input:", fontSizeValue);

    if (!fontSizeValue) {
      console.log("O.Opt FontSizeToPoints - Output:", -1);
      return -1;
    }

    const { rulerSettings, svgDoc } = GlobalData.docHandler;
    const docDpi = svgDoc.docInfo.docDpi;
    const points = rulerSettings.showpixels
      ? (72 * fontSizeValue) / docDpi
      : Math.round((72 * fontSizeValue) / docDpi);

    console.log("O.Opt FontSizeToPoints - Output:", points);
    return points;
  }

  /**
     * Sends the currently selected objects to the back layer.
     * Logs input and output with prefix O.Opt.
     */
  SendToBackOf(): void {
    console.log("O.Opt SendToBackOf - Input: no parameters");
    const frontBackLayers = this.GetFrontBackLayersForSelected();
    if (frontBackLayers.result) {
      // Send objects to the back of the lowest layer index
      this.SendToBackOfSpecificLayer(frontBackLayers.backmostindex);
    }
    console.log("O.Opt SendToBackOf - Output: completed");
  }

  /**
     * Sends the currently selected objects to a specific layer (back position).
     *
     * @param targetLayerIndex - The index of the target layer to send objects to.
     * @param updateSelectedBlock - (Optional) If provided, skip updating the selected list block.
     *
     * Logs input and output with prefix O.Opt.
     */
  SendToBackOfSpecificLayer(targetLayerIndex: number, updateSelectedBlock?: any): void {
    console.log("O.Opt SendToBackOfSpecificLayer - Input:", { targetLayerIndex, updateSelectedBlock });

    // Get the selected object block from the global object store.
    const selectedObjectBlock = GlobalData.objectStore.GetObject(this.theSelectedListBlockID);
    let selectedList = selectedObjectBlock.Data;
    const selectedCount = selectedList.length;

    if (selectedCount !== 0) {
      // Get associated list ids from the selected list.
      const associatedList = this.AddAssoctoList(selectedList, true);
      let associatedCount = associatedList.length;

      if (associatedCount !== 0) {
        const visibleZList = this.VisibleZList();
        if (visibleZList.length >= 1) {
          // // Begin collaboration message if allowed.
          // if (Collab.AllowMessage()) {
          //   Collab.BeginSecondaryEdit();
          // }

          // Create an array of indices of associated objects according to visible Z list order.
          const indexArray: number[] = [];
          for (let i = 0; i < associatedCount; i++) {
            const objectId = associatedList[i];
            const indexInVisible = $.inArray(objectId, visibleZList);
            indexArray.push(indexInVisible);
          }
          // Sort the indices in ascending order.
          indexArray.sort((a, b) => a - b);

          // Get the current Z-list for the target layer.
          const targetZList = this.ZListPreserveForLayer(targetLayerIndex);
          const orderedObjectIds: number[] = [];
          // Build ordered list from visibleZList based on sorted indices.
          for (let i = 0; i < associatedCount; i++) {
            const objectId = visibleZList[indexArray[i]];
            orderedObjectIds.push(objectId);
          }
          // Remove from all Z-lists and add to the beginning of the target Z list.
          for (let i = orderedObjectIds.length - 1; i >= 0; i--) {
            const objectId = orderedObjectIds[i];
            this.RemoveFromAllZLists(objectId);
            targetZList.unshift(objectId);
          }

          // Update line hops if necessary.
          this.UpdateLineHops(true);

          // // Build and send a collaboration message if allowed.
          // if (Collab.AllowMessage()) {
          //   const messageData = { theTargetLayer: targetLayerIndex };
          //   Collab.BuildMessage(ConstantData.CollabMessages.SendToBackOfSpecificLayer, messageData, true);
          // }

          // If updateSelectedBlock parameter is not specified, update the selected list block.
          if (updateSelectedBlock == null) {
            const preservedBlock = GlobalData.objectStore.PreserveBlock(this.theSelectedListBlockID);
            preservedBlock.Data = associatedList;
          }
          // Re-render all SVG objects and complete the operation.
          this.RenderAllSVGObjects();
          this.CompleteOperation();
        }
      }
    }
    console.log("O.Opt SendToBackOfSpecificLayer - Output: completed");
  }

  /**
     * Gets the frontmost and backmost layer details for the selected objects.
     * @returns {Object} An object containing:
     *   - result: boolean indicating if there is a selection,
     *   - frontmostname: the name of the frontmost layer,
     *   - frontmostindex: the index of the frontmost layer,
     *   - backmostname: the name of the backmost layer,
     *   - backmostindex: the index of the backmost layer.
     */
  GetFrontBackLayersForSelected() {
    console.log("O.Opt GetFrontBackLayersForSelected - Input:", {});

    const layerManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, false);
    const layers = layerManager.layers;
    const layerCount = layerManager.nlayers;
    let frontmostIndex = -1;
    let backmostIndex = 0;

    const selectedObjects = this.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, false);
    const selectedCount = selectedObjects.length;

    if (selectedCount === 0) {
      const resultEmpty = {
        result: false,
        frontmostname: layers[0].name,
        frontmostindex: 0,
        backmostname: layers[layerCount - 1].name,
        backmostindex: layerCount
      };
      console.log("O.Opt GetFrontBackLayersForSelected - Output:", resultEmpty);
      return resultEmpty;
    }

    for (let idx = 0; idx < selectedCount; idx++) {
      const currentLayerIndex = this.FindLayerForShapeID(selectedObjects[idx]);
      if (currentLayerIndex < frontmostIndex || frontmostIndex === -1) {
        frontmostIndex = currentLayerIndex;
      }
      if (currentLayerIndex > backmostIndex) {
        backmostIndex = currentLayerIndex;
      }
    }

    const result = {
      result: true,
      frontmostname: layers[frontmostIndex].name,
      frontmostindex: frontmostIndex,
      backmostname: layers[backmostIndex].name,
      backmostindex: backmostIndex
    };

    console.log("O.Opt GetFrontBackLayersForSelected - Output:", result);
    return result;
  }

  /**
    * Finds the layer index for a given shape ID.
    * @param shapeId - The ID of the shape.
    * @returns {number} The index of the layer containing the shape, or -1 if not found.
    */
  FindLayerForShapeID(shapeId: number): number {
    console.log("O.Opt FindLayerForShapeID - Input:", { shapeId });

    const layerManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, false);
    const layers = layerManager.layers;
    const layerCount = layerManager.nlayers;

    for (let layerIndex = 0; layerIndex < layerCount; layerIndex++) {
      const zList = layers[layerIndex].zList;
      if ($.inArray(shapeId, zList) !== -1) {
        console.log("O.Opt FindLayerForShapeID - Output:", { result: layerIndex });
        return layerIndex;
      }
    }

    console.log("O.Opt FindLayerForShapeID - Output:", { result: -1 });
    return -1;
  }

  /**
   * Returns an updated list of associated object IDs based on the input list.
   * It adds the original IDs, then appends the associated IDs (if available) and processes
   * objects that are swimlanes or containers for further associated deletions.
   *
   * @param listOfObjectIds - Array of object IDs to process.
   * @param skipContainerParents - If true, objects that have a container parent are excluded.
   * @returns Array of unique associated object IDs.
   *
   * Logs input and output with prefix "O.Opt".
   */
  AddAssoctoList(listOfObjectIds: number[], skipContainerParents: boolean): number[] {
    console.log("O.Opt AddAssoctoList - Input:", { listOfObjectIds, skipContainerParents });

    let associatedIds: number[] = [];
    const totalIds = listOfObjectIds.length;
    const objectTypes = ConstantData.ObjectTypes;

    for (let index = 0; index < totalIds; index++) {
      const objectId = listOfObjectIds[index];
      const currentObject = this.GetObjectPtr(objectId, false);

      // Process only if skipContainerParents is not enabled
      // or if the current object does not have a container parent.
      if (!skipContainerParents || !Business.HasContainerParent(currentObject)) {
        switch (currentObject.objecttype) {
          case objectTypes.SD_OBJT_SWIMLANE_COLS:
          case objectTypes.SD_OBJT_SWIMLANE_ROWS:
          case objectTypes.SD_OBJT_SWIMLANE_GRID:
            break;
        }

        // Add the current object's ID if not already present.
        if (associatedIds.indexOf(objectId) < 0) {
          associatedIds.push(objectId);
        }

        // If the object has an association (associd) and exists, add its associd.
        if (currentObject && currentObject.associd >= 0 && this.GetObjectPtr(currentObject.associd, false)) {
          if (associatedIds.indexOf(currentObject.associd) < 0) {
            associatedIds.push(currentObject.associd);
          }
        }

        // Process swimlane objects.
        if (currentObject.IsSwimlane()) {
          GlobalData.optManager.SwimlaneAddtoDelete(currentObject, associatedIds, true);
        }

        // Process container types.
        switch (currentObject.objecttype) {
          case objectTypes.SD_OBJT_SHAPECONTAINER:
            GlobalData.optManager.ContainerAddtoDelete(currentObject, associatedIds);
            break;
          case objectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER:
            GlobalData.optManager.TableContainerAddtoDelete(currentObject, associatedIds);
            break;
        }
      }
    }

    console.log("O.Opt AddAssoctoList - Output:", associatedIds);
    return associatedIds;
  }

  /**
   * Gets the preserved ZList for the specified layer.
   * @param layerIndex - The index of the layer to get the ZList for.
   * @returns The preserved ZList for the specified layer.
   */
  ZListPreserveForLayer(layerIndex: number) {
    console.log("O.Opt ZListPreserveForLayer - Input:", { layerIndex });
    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, true);
    const result = layersManager.layers[layerIndex].zList;
    console.log("O.Opt ZListPreserveForLayer - Output:", result);
    return result;
  }

  /**
     * Renders all SVG objects in the document.
     *
     * This function performs the following steps:
     * 1. Clears the SVG highlight, overlay, and object layers.
     * 2. Sets the background color.
     * 3. Iterates through the visible SVG objects and adds each one to the display.
     * 4. Renders selection states for SVG objects.
     * 5. Clears the list of objects marked for redrawing.
     *
     * All inputs (if any) and outputs are logged with the prefix "O.Opt".
     */
  RenderAllSVGObjects(): void {
    console.log("O.Opt RenderAllSVGObjects - Input: no parameters");

    // Allow full redraw from the editor
    // Collab.NoRedrawFromSameEditor = false;
    this.collaboration.NoRedrawFromSameEditor = false;

    // Retrieve the lists of objects to be rendered
    const visibleObjectList = this.VisibleZList();
    const activeObjectList = this.ActiveVisibleZList();
    const totalObjects = visibleObjectList.length;

    // Clear SVG layers and set the current background color
    this.ClearSVGHighlightLayer();
    this.ClearSVGOverlayLayer();
    this.ClearSVGObjectLayer();
    this.SetBackgroundColor();

    // Iterate through all visible objects and add them to the SVG canvas.
    for (let index = 0; index < totalObjects; ++index) {
      const currentObjectID = visibleObjectList[index];
      // Check if the current object is selected (present in activeObjectList)
      const isSelected = activeObjectList.indexOf(currentObjectID) !== -1;
      this.AddSVGObject(index, currentObjectID, false, isSelected);
    }

    // Render selection states and clear the dirty list
    this.RenderAllSVGSelectionStates();
    this.ClearDirtyList();

    console.log("O.Opt RenderAllSVGObjects - Output: rendering complete");
  }

  /**
     * Clears the SVG highlight layer by removing all highlight elements.
     * Logs the input and output with prefix O.Opt.
     */
  ClearSVGHighlightLayer(): void {
    console.log("O.Opt ClearSVGHighlightLayer - Input: none");
    if (this.svgOverlayLayer !== null) {
      this.svgHighlightLayer.RemoveAll();
      console.log("O.Opt ClearSVGHighlightLayer - Output: SVG highlight layer cleared");
    } else {
      console.log("O.Opt ClearSVGHighlightLayer - Output: svgOverlayLayer is null, no action taken");
    }
  }

  /**
   * Clears the SVG overlay layer by removing all overlay elements.
   * Logs the input and output with prefix O.Opt.
   */
  ClearSVGOverlayLayer(): void {
    console.log("O.Opt ClearSVGOverlayLayer - Input: none");
    if (this.svgOverlayLayer !== null) {
      this.svgOverlayLayer.RemoveAll();
      console.log("O.Opt ClearSVGOverlayLayer - Output: SVG overlay layer cleared");
    } else {
      console.log("O.Opt ClearSVGOverlayLayer - Output: svgOverlayLayer is null, no action taken");
    }
  }

  /**
     * Clears the SVG object layer by removing all object elements.
     * Logs the input and output with prefix O.Opt.
     */
  ClearSVGObjectLayer(): void {
    console.log("O.Opt ClearSVGObjectLayer - Input: none");
    if (this.svgObjectLayer !== null) {
      this.svgObjectLayer.RemoveAll();
      console.log("O.Opt ClearSVGObjectLayer - Output: SVG object layer cleared");
    } else {
      console.log("O.Opt ClearSVGObjectLayer - Output: svgObjectLayer is null, no action taken");
    }
  }

  /**
  * Sets the background color of the document based on the current paint settings.
  * It evaluates the session background paint settings and delegates to the correct fill method.
  * Also marks objects from the visible object list as dirty.
  *
  * @returns void
  */
  SetBackgroundColor(): void {
    console.log("O.Opt SetBackgroundColor - Input:", {});

    // Retrieve the session object background and the document background element.
    const sessionObject = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
    const backgroundElement = GlobalData.docHandler.GetBackground();

    if (sessionObject && backgroundElement) {
      const fillSettings = sessionObject.background.Paint;

      // Process according to the fill type.
      if (fillSettings.FillType === ConstantData.FillTypes.SDFILL_SOLID) {
        // For solid fill, if the color is white or opacity is zero, set fill to 'none'.
        if (fillSettings.Color === ConstantData.Colors.Color_White || fillSettings.Opacity === 0) {
          backgroundElement.SetFillColor('none');
        } else {
          backgroundElement.SetFillColor(fillSettings.Color);
        }
      } else if (fillSettings.FillType === ConstantData.FillTypes.SDFILL_GRADIENT) {
        // For gradient fill, create a gradient record and apply it.
        const baseShape = new ListManager.BaseShape();
        backgroundElement.SetGradientFill(
          baseShape.CreateGradientRecord(fillSettings.GradientFlags, fillSettings.Color, fillSettings.Opacity, fillSettings.EndColor, fillSettings.EndOpacity)
        );
      } else if (fillSettings.FillType === ConstantData.FillTypes.SDFILL_RICHGRADIENT) {
        // For rich gradient fill, create a rich gradient record and apply it.
        const baseShape = new ListManager.BaseShape();
        backgroundElement.SetGradientFill(baseShape.CreateRichGradientRecord(fillSettings.GradientFlags));
      } else if (fillSettings.FillType === ConstantData.FillTypes.SDFILL_TEXTURE) {
        // For texture fill, prepare the texture fill settings.
        const textureFill = {
          url: '',
          scale: 1,
          alignment: fillSettings.TextureScale.AlignmentScalar,
          dim: undefined as { x: number; y: number } | undefined
        };
        const textureId = fillSettings.Texture;

        // Check if the texture exists in the texture list.
        if (GlobalData.optManager.TextureList.Textures[textureId]) {
          const textureInfo = GlobalData.optManager.TextureList.Textures[textureId];
          textureFill.dim = textureInfo.dim;
          textureFill.url = textureInfo.ImageURL;
          textureFill.scale = GlobalData.optManager.CalcTextureScale(fillSettings.TextureScale, textureFill.dim.x);
          sessionObject.background.Paint.TextureScale.Scale = textureFill.scale;
          if (!textureFill.url) {
            textureFill.url = Constants.FilePath_CMSRoot + Constants.FilePath_Textures + textureInfo.filename;
          }
          backgroundElement.SetTextureFill(textureFill);
        }
      } else {
        backgroundElement.SetFillColor('none');
      }
      backgroundElement.ExcludeFromExport(this.GetBackgroundTransparent());
    }

    // Mark each visible object as dirty.
    const visibleObjectList = this.VisibleZList();
    for (let i = 0, len = visibleObjectList.length; i < len; i++) {
      const objectId = visibleObjectList[i];
      const currentObject = this.GetObjectPtr(objectId, false);
      if (currentObject && currentObject.DataID >= 0) {
        this.AddToDirtyList(objectId);
      }
    }

    console.log("O.Opt SetBackgroundColor - Output:", {});
  }

  /**
     * Gets whether the background should be considered transparent.
     * @returns True if the background is transparent, false otherwise.
     */
  GetBackgroundTransparent(): boolean {
    console.log("O.Opt GetBackgroundTransparent - Input: no parameters");

    const session = GlobalData.optManager.GetObjectPtr(
      GlobalData.optManager.theSEDSessionBlockID,
      false
    );
    const backgroundElement = GlobalData.docHandler.GetBackground();
    let isTransparent = true;

    if (session && backgroundElement) {
      const paintSettings = session.background.Paint;
      switch (paintSettings.FillType) {
        case ConstantData.FillTypes.SDFILL_SOLID:
          isTransparent =
            paintSettings.Color === ConstantData.Colors.Color_White ||
            paintSettings.Opacity === 0;
          break;
        case ConstantData.FillTypes.SDFILL_GRADIENT:
        case ConstantData.FillTypes.SDFILL_RICHGRADIENT:
        case ConstantData.FillTypes.SDFILL_TEXTURE:
          isTransparent = false;
          break;
        default:
          isTransparent = true;
      }
    }

    console.log("O.Opt GetBackgroundTransparent - Output:", isTransparent);
    return isTransparent;
  }

  ShowLoading(isLoading) {
  }

  /**
     * Brings the selected objects to the front of the front-most layer.
     *
     * @returns void
     *
     * Explanation:
     * - Retrieves the front and back layer details for the current selection.
     * - If a selection exists (layerData.result is true), it calls BringToFrontOfSpecificLayer
     *   with the frontmost layer index.
     * - Logs the input and output with the prefix "O.Opt".
     */
  BringToFrontOf(): void {
    console.log("O.Opt BringToFrontOf - Input: no parameters");

    const layerData = this.GetFrontBackLayersForSelected();
    if (layerData.result) {
      this.BringToFrontOfSpecificLayer(layerData.frontmostindex);
    }

    console.log("O.Opt BringToFrontOf - Output: completed");
  }

  /**
   * Sends the selected objects to the front of a specific layer.
   * @param targetLayerIndex - The index of the target layer.
   * @param updateSelectedBlock - Optional flag indicating whether to update the selected block.
   */
  BringToFrontOfSpecificLayer(targetLayerIndex: number, updateSelectedBlock?: any): void {
    console.log("O.Opt BringToFrontOfSpecificLayer - Input:", { targetLayerIndex, updateSelectedBlock });

    const selectedObjectBlock = GlobalData.objectStore.GetObject(this.theSelectedListBlockID);
    let selectedObjectList = Utils1.DeepCopy(selectedObjectBlock.Data);
    const selectedCount = selectedObjectList.length;

    if (selectedCount !== 0) {
      // Build a list of associated object IDs from the selected objects.
      const associatedList = this.AddAssoctoList(selectedObjectList);
      const associatedCount = associatedList.length;

      if (associatedCount !== 0) {
        const visibleZList = this.VisibleZList();
        if (visibleZList.length < 1) {
          console.log("O.Opt BringToFrontOfSpecificLayer - Output:", "No visible objects found");
          return;
        }

        // if (Collab.AllowMessage()) {
        //   Collab.BeginSecondaryEdit();
        // }

        // Map associated object IDs to their indices in the visible Z list.
        let indexArray: number[] = [];
        for (let i = 0; i < associatedCount; i++) {
          const objectId = associatedList[i];
          const indexInVisible = $.inArray(objectId, visibleZList);
          indexArray.push(indexInVisible);
        }

        // Sort the indices, then build a sorted list of object IDs.
        indexArray.sort((a, b) => a - b);
        let sortedAssociatedList: number[] = [];
        for (let i = 0; i < associatedCount; i++) {
          const sortedObjectId = visibleZList[indexArray[i]];
          sortedAssociatedList.push(sortedObjectId);
        }

        // Retrieve the preserved Z list for the target layer.
        const preservedZList = this.ZListPreserveForLayer(targetLayerIndex);
        for (let i = 0; i < associatedCount; i++) {
          const objectId = sortedAssociatedList[i];
          this.RemoveFromAllZLists(objectId);
          preservedZList.push(objectId);
        }

        this.UpdateLineHops(true);

        // if (Collab.AllowMessage()) {
        //   const messageData = { theTargetLayer: targetLayerIndex };
        //   Collab.BuildMessage(ConstantData.CollabMessages.BringToFrontOfSpecificLayer, messageData, true);
        // }

        if (updateSelectedBlock == null) {
          const preservedSelectedBlock = GlobalData.objectStore.PreserveBlock(this.theSelectedListBlockID);
          preservedSelectedBlock.Data = associatedList;
        }

        this.RenderAllSVGObjects();
        this.CompleteOperation();
        console.log("O.Opt BringToFrontOfSpecificLayer - Output:", "Operation completed");
      }
    }
  }

  /**
     * Groups selected objects into a single group shape
     * @param returnValueFlag - Flag to determine if function should return the group ID
     * @param customSelectionList - Optional custom selection list to use instead of current selection
     * @param skipValidation - If true, skips validation checks for grouping
     * @param preventRedraw - If true, prevents automatic redrawing of SVG objects
     * @param enableCollaboration - If true, enables collaboration messaging
     * @returns The ID of the new group or false if grouping failed
     */
  GroupSelectedShapes(returnValueFlag, customSelectionList, skipValidation, preventRedraw, enableCollaboration) {
    console.log("O.Opt GroupSelectedShapes - Input:", {
      returnValueFlag,
      customSelectionList: customSelectionList?.length || "undefined",
      skipValidation,
      preventRedraw,
      enableCollaboration
    });

    let objectIndex;
    let objectRect;
    let hasNoRotateObject = false;
    let commentIds = [];
    let visibleObjectList = this.ActiveVisibleZList();

    // If skipValidation is true, use the entire Z-list
    if (skipValidation) {
      visibleObjectList = GlobalData.optManager.ZList();
    }

    const totalVisibleObjects = visibleObjectList.length;
    if (totalVisibleObjects === 0) {
      console.log("O.Opt GroupSelectedShapes - Output: false (no visible objects)");
      return false;
    }

    // Get the list of objects to be grouped
    const selectionList = customSelectionList ||
      GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data;
    const selectionCount = selectionList.length;

    if (selectionCount <= 1) {
      console.log("O.Opt GroupSelectedShapes - Output: false (less than 2 objects selected)");
      return false;
    }

    // Get the move list (objects that will be grouped)
    const objectsToGroup = customSelectionList ||
      GlobalData.optManager.GetMoveList(-1, true, true, false, {}, false);

    // Validate that objects can be grouped
    if (!skipValidation) {
      // Check if all objects allow grouping
      if (!this.AllowGroup(objectsToGroup)) {
        Utils2.Alert(Resources.Strings.GroupNotAllowed, null);
        console.log("O.Opt GroupSelectedShapes - Output: false (grouping not allowed)");
        return false;
      }

      // Check if objects are linked to objects outside the group
      if (this.IsLinkedOutside(objectsToGroup)) {
        Utils2.Alert(Resources.Strings.LinkedOutside);
        console.log("O.Opt GroupSelectedShapes - Output: false (linked outside)");
        return false;
      }

      // Check if the group contains non-deletable objects
      if (this.IsGroupNonDelete()) {
        Utils2.Alert(Resources.Strings.GroupNonDelete);
        console.log("O.Opt GroupSelectedShapes - Output: false (contains non-deletable objects)");
        return false;
      }
    }

    // // Set up collaboration if enabled
    // let collaborationMessage;
    // if (enableCollaboration && Collab.AllowMessage()) {
    //   Collab.BeginSecondaryEdit();
    //   const messageData = {};
    //   collaborationMessage = Collab.BuildMessage(
    //     ConstantData.CollabMessages.GroupSelectedShapes,
    //     messageData,
    //     true,
    //     true
    //   );
    // }

    // Temporarily remove dimensions to calculate proper bounding rectangle
    const dimensionObjects = temporarilyRemoveDimensions(objectsToGroup);

    // Calculate bounding rectangle for all objects in the group
    const boundingRect = this.GetListSRect(objectsToGroup);

    // Restore dimensions
    restoreDimensions(objectsToGroup, dimensionObjects);

    // Create a filtered list of visible objects that are in objectsToGroup
    const filteredObjects = [];
    for (objectIndex = 0; objectIndex < totalVisibleObjects; ++objectIndex) {
      if (objectsToGroup.indexOf(visibleObjectList[objectIndex]) !== -1) {
        filteredObjects.push(visibleObjectList[objectIndex]);
      }
    }

    // Get the links list with preserved state
    const linksList = this.GetObjectPtr(this.theLinksBlockID, true);
    let currentObject = null;

    // Adjust objects' positions relative to the group's bounding rectangle
    for (objectIndex = 0; objectIndex < filteredObjects.length; ++objectIndex) {
      currentObject = GlobalData.optManager.GetObjectPtr(filteredObjects[objectIndex], true);

      // Store comment IDs for later adjustment
      if (currentObject.CommentID >= 0) {
        commentIds.push(currentObject.CommentID);
      }

      // Adjust object frame relative to group origin
      const objectFrame = currentObject.Frame;
      objectFrame.x -= boundingRect.x;
      objectFrame.y -= boundingRect.y;

      // Check if any object disallows rotation
      if (currentObject.NoRotate()) {
        hasNoRotateObject = true;
      }

      // Mark object as being in a group
      currentObject.bInGroup = true;

      // For line-based objects, adjust start and end points
      if (
        currentObject instanceof Instance.Shape.BaseLine ||
        currentObject instanceof Instance.Shape.Connector ||
        (currentObject.StartPoint !== undefined && currentObject.EndPoint !== undefined)
      ) {
        currentObject.StartPoint.x -= boundingRect.x;
        currentObject.StartPoint.y -= boundingRect.y;
        currentObject.EndPoint.x -= boundingRect.x;
        currentObject.EndPoint.y -= boundingRect.y;
      }

      // If object is already a group symbol, clean up its native data
      if (currentObject.NativeID >= 0 &&
        currentObject.ShapeType === ConstantData.ShapeType.GROUPSYMBOL) {
        const nativeBlock = GlobalData.objectStore.PreserveBlock(currentObject.NativeID);
        if (nativeBlock) {
          nativeBlock.Delete();
        }
        currentObject.NativeID = -1;
      }

      // Update the object's frame
      currentObject.UpdateFrame(objectFrame);
    }

    // Create group object data
    const groupData = {
      Frame: {
        x: boundingRect.x,
        y: boundingRect.y,
        width: boundingRect.width,
        height: boundingRect.height
      },
      TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL,
      ShapesInGroup: filteredObjects,
      InitialGroupBounds: {
        x: boundingRect.x,
        y: boundingRect.y,
        width: boundingRect.width,
        height: boundingRect.height
      }
    };

    // Create the group symbol
    const groupSymbol = new GroupSymbol(groupData);

    // If any object in group can't rotate, mark group as non-rotatable
    if (hasNoRotateObject) {
      groupSymbol.extraflags = Utils2.SetFlag(
        groupSymbol.extraflags,
        ConstantData.ExtraFlags.SEDE_NoRotate,
        true
      );
    }

    // Get the z-list with preserved state
    this.ZListPreserve();

    // Add the new group to the document
    const newGroupId = GlobalData.optManager.AddNewObject(groupSymbol, true, false);

    // // Handle collaboration for the new group
    // if (enableCollaboration && Collab.AllowMessage()) {
    //   Collab.AddNewBlockToSecondary(newGroupId);

    //   if (Collab.IsSecondary()) {
    //     const messageData = { CreateList: [newGroupId] };
    //     collaborationMessage.messageData = messageData;
    //   }
    // }

    // Adjust style settings for the group
    if (groupSymbol.StyleRecord) {
      if (groupSymbol.StyleRecord.Line) {
        groupSymbol.StyleRecord.Line.Thickness = 0;
      }

      if (groupSymbol.StyleRecord.OutsideEffect) {
        groupSymbol.StyleRecord.OutsideEffect.OutsideType = 0;
        groupSymbol.StyleRecord.OutsideEffect.OutsideExtent_Bottom = 0;
        groupSymbol.StyleRecord.OutsideEffect.OutsideExtent_Left = 0;
        groupSymbol.StyleRecord.OutsideEffect.OutsideExtent_Right = 0;
        groupSymbol.StyleRecord.OutsideEffect.OutsideExtent_Top = 0;
      }

      groupSymbol.UpdateFrame();
    }

    // Remove the grouped objects from z-lists and links
    for (objectIndex = 0; objectIndex < filteredObjects.length; ++objectIndex) {
      GlobalData.optManager.RemoveFromAllZLists(filteredObjects[objectIndex]);
      GlobalData.optManager.DeleteLink(
        linksList,
        filteredObjects[objectIndex],
        -1,
        null,
        0,
        true
      );
    }

    // Handle comments for grouped objects
    if (commentIds.length) {
      GlobalData.optManager.Comment_Group(commentIds);
    }

    // Get the updated visible list
    visibleObjectList = this.ActiveVisibleZList();
    const updatedVisibleCount = visibleObjectList.length;

    // Convert group to native format if available
    groupSymbol.ConvertToNative(GlobalData.optManager.RichGradients, skipValidation);

    // // Send collaboration message if enabled
    // if (enableCollaboration && Collab.AllowMessage()) {
    //   Collab.SendMessage(collaborationMessage);
    // }

    // Complete the operation and select the new group
    this.CompleteOperation([visibleObjectList[updatedVisibleCount - 1]], returnValueFlag);

    // Render all objects if not prevented
    if (!preventRedraw && !skipValidation) {
      this.RenderAllSVGObjects();
    }

    // Clear the move list
    this.theMoveList = null;

    console.log("O.Opt GroupSelectedShapes - Output:", newGroupId);
    return newGroupId;

    /**
     * Helper function to temporarily remove dimensions from objects
     * @param objectList - List of objects to process
     * @returns Array of saved dimension data
     */
    function temporarilyRemoveDimensions(objectList) {
      const dimensionData = [];

      for (let i = 0, len = objectList.length; i < len; i++) {
        const currentObject = GlobalData.optManager.GetObjectPtr(objectList[i], true);

        // Save dimensions that need to be preserved
        if (
          currentObject.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
          currentObject.Dimensions & ConstantData.DimensionFlags.SED_DF_Select
        ) {
          dimensionData.push({
            index: i,
            dimensions: currentObject.Dimensions
          });

          currentObject.Dimensions = 0;
          currentObject.UpdateFrame();
        }
      }

      return dimensionData;
    }

    /**
     * Helper function to restore dimensions to objects
     * @param objectList - List of objects to process
     * @param dimensionData - Array of saved dimension data
     */
    function restoreDimensions(objectList, dimensionData) {
      for (let i = 0, len = dimensionData.length; i < len; i++) {
        const objectToRestore = GlobalData.optManager.GetObjectPtr(
          objectList[dimensionData[i].index],
          true
        );

        objectToRestore.Dimensions = dimensionData[i].dimensions;
        objectToRestore.UpdateFrame();
      }
    }
  }

  /**
   * Checks if all objects in the group are allowed to be grouped.
   * It verifies that none of the objects are locked and that all hooks of each object
   * reference objects that are already part of the group.
   *
   * @param objectIds - Array of object IDs to be checked for grouping.
   * @returns True if grouping is allowed, false otherwise.
   */
  AllowGroup(objectIds: number[]): boolean {
    console.log("O.Opt AllowGroup - Input:", objectIds);

    for (const objectId of objectIds) {
      const currentObject = this.GetObjectPtr(objectId, false);
      if (currentObject) {
        // If object has a lock flag, grouping is not allowed.
        if (currentObject.flags & ConstantData.ObjFlags.SEDO_Lock) {
          console.log("O.Opt AllowGroup - Output: false");
          return false;
        }
        // Check each hook: if the hooked object is not in the group, grouping is not allowed.
        for (const hook of currentObject.hooks) {
          if (objectIds.indexOf(hook.objid) < 0) {
            console.log("O.Opt AllowGroup - Output: false");
            return false;
          }
        }
      }
    }

    console.log("O.Opt AllowGroup - Output: true");
    return true;
  }

  /**
   * Checks if any object in the provided list is linked to an object outside the list.
   * @param linkedObjectIds - Array of object IDs to check.
   * @returns True if at least one linked object refers to an object not in the list, false otherwise.
   */
  IsLinkedOutside(linkedObjectIds: number[]): boolean {
    console.log("O.Opt IsLinkedOutside - Input:", { linkedObjectIds });

    const allLinkedObjects = GlobalData.optManager.ZList();
    for (let outerIndex = 0; outerIndex < linkedObjectIds.length; outerIndex++) {
      const currentObject = GlobalData.optManager.GetObjectPtr(linkedObjectIds[outerIndex], false);
      for (let innerIndex = 0; innerIndex < allLinkedObjects.length; innerIndex++) {
        const comparedObject = GlobalData.optManager.GetObjectPtr(allLinkedObjects[innerIndex], false);
        if (comparedObject.associd === currentObject.BlockID && linkedObjectIds.indexOf(comparedObject.BlockID) === -1) {
          console.log("O.Opt IsLinkedOutside - Output:", true);
          return true;
        }
      }
    }
    console.log("O.Opt IsLinkedOutside - Output:", false);
    return false;
  }

  /**
   * Determines if the selected group contains any objects that are non-deletable.
   * It checks each object in the selected object list for:
   * - Being a Kanban Table (subtype)
   * - Having a no-delete extra flag set
   * - Being a Timeline Event with a hook referencing a Timeline object
   * @returns True if any object is non-deletable, otherwise false.
   */
  IsGroupNonDelete(): boolean {
    console.log("O.Opt IsGroupNonDelete - Input: no parameters");

    const selectedObjects = GlobalData.optManager.GetObjectPtr(
      GlobalData.optManager.theSelectedListBlockID,
      false
    );
    let currentObject = null;

    for (let index = 0; index < selectedObjects.length; index++) {
      currentObject = GlobalData.optManager.GetObjectPtr(selectedObjects[index], false);

      if (currentObject.subtype === ConstantData.ObjectTypes.SD_SUBT_KANBAN_TABLE) {
        console.log("O.Opt IsGroupNonDelete - Output: true");
        return true;
      }

      if (currentObject.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete) {
        console.log("O.Opt IsGroupNonDelete - Output: true");
        return true;
      }

      if (
        currentObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_TIMELINE_EVENT &&
        currentObject.hooks.length > 0 &&
        GlobalData.optManager.GetObjectPtr(currentObject.hooks[0].objid, false).objecttype === ConstantData.ObjectTypes.SD_OBJT_TIMELINE
      ) {
        console.log("O.Opt IsGroupNonDelete - Output: true");
        return true;
      }
    }

    console.log("O.Opt IsGroupNonDelete - Output: false");
    return false;
  }

  /**
   * Calculates the bounding rectangle that encloses the shapes corresponding to a list of object IDs.
   * @param objectIdList - An array of object IDs.
   * @param useFrame - If true, uses the object's Frame property.
   * @param useDragRectangle - If true and useFrame is false, uses the object's drag rectangle via GetDragR(); otherwise, uses the object's 'r' property.
   * @returns The union rectangle of all visible objects, or undefined if no valid object is processed.
   */
  GetListSRect(objectIdList, useFrame, useDragRectangle) {
    console.log("O.Opt GetListSRect - Input:", { objectIdList, useFrame, useDragRectangle });

    let unionRect;
    const notVisibleFlag = ConstantData.ObjFlags.SEDO_NotVisible;

    for (let i = 0; i < objectIdList.length; i++) {
      const objectId = objectIdList[i];
      const currentObject = GlobalData.optManager.GetObjectPtr(objectId, false);
      if (currentObject != null) {
        const currentRect = useFrame
          ? currentObject.Frame
          : (useDragRectangle ? currentObject.GetDragR() : currentObject.r);
        if (currentObject && (currentObject.flags & notVisibleFlag) === 0) {
          if (unionRect === undefined) {
            unionRect = {};
            Utils2.CopyRect(unionRect, currentRect);
          } else {
            Utils2.UnionRect(currentRect, unionRect, unionRect);
          }
        }
      }
    }

    console.log("O.Opt GetListSRect - Output:", unionRect);
    return unionRect;
  }

  /**
     * Ungroups selected shapes.
     * @returns {boolean} True if the ungroup operation was performed, false otherwise.
     */
  UngroupSelectedShapes() {
    console.log("O.Opt UngroupSelectedShapes - Input: none");

    const activeVisibleShapes = this.ActiveVisibleZList();
    if (activeVisibleShapes.length === 0) {
      console.log("O.Opt UngroupSelectedShapes - Output: false (no active visible shapes)");
      return false;
    }
    const selectedShapes = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data;
    const numSelectedShapes = selectedShapes.length;
    if (numSelectedShapes === 0) {
      console.log("O.Opt UngroupSelectedShapes - Output: false (no selected shapes)");
      return false;
    }

    let containsGroup = false;
    let currentShape = null;
    for (let index = 0; index < numSelectedShapes; index++) {
      currentShape = GlobalData.optManager.GetObjectPtr(selectedShapes[index], false);
      if (currentShape instanceof GroupSymbol) {
        containsGroup = true;
        break;
      }
      if (currentShape.NativeID >= 0) {
        containsGroup = true;
        break;
      }
    }

    if (containsGroup) {
      // if (Collab.AllowMessage()) {
      //   Collab.BeginSecondaryEdit();
      //   const messageObject = {};
      //   const message = Collab.BuildMessage(ConstantData.CollabMessages.UngroupSelectedShapes, messageObject, true, true);
      // }
      let currentSelectedShapes = GlobalData.optManager.GetObjectPtr(this.theSelectedListBlockID, true).slice(0);
      let resultShapeList: number[] = [];
      for (let index = 0; index < numSelectedShapes; index++) {
        currentShape = GlobalData.optManager.GetObjectPtr(currentSelectedShapes[index], false);
        const shapeId = currentSelectedShapes[index];
        if (currentShape instanceof GroupSymbol) {
          resultShapeList = resultShapeList.concat(currentShape.ShapesInGroup);
          this.UngroupShape(shapeId);
        } else if (currentShape.NativeID >= 0) {
          const ungroupResult = GlobalData.optManager.UngroupNative(shapeId, false, true);
          if (ungroupResult) {
            // if (Collab.AllowMessage()) {
            //   Collab.AddNewBlockToSecondary(ungroupResult[0]);
            // }
            this.DeleteObjects([shapeId], false);
            resultShapeList = resultShapeList.concat(ungroupResult);
            containsGroup = true;
          }
        } else {
          resultShapeList.push(shapeId);
        }
      }
      if (containsGroup) {
        this.RenderAllSVGObjects();
        this.SelectObjects(resultShapeList);
        // if (Collab.AllowMessage()) {
        //   const messageObject = {};
        //   if (Collab.IsSecondary() && Collab.CreateList.length) {
        //     messageObject.CreateList = [];
        //     messageObject.CreateList = messageObject.CreateList.concat(Collab.CreateList);
        //   }
        //   Collab.SendMessage(message);
        // }
        this.CompleteOperation(resultShapeList);
      }
    }
    console.log("O.Opt UngroupSelectedShapes - Output: operation completed");
  }

  /**
     * Finds the parent group that contains a given target object in its group hierarchy.
     * @param targetId - The ID of the target object to search for.
     * @param currentGroup - The current group object to inspect. If null, uses the global ZList.
     * @returns The group object that is a parent of the target object, or null if not found.
     */
  FindParentGroup(targetId: number, currentGroup?: any): any {
    console.log("O.Opt FindParentGroup - Input:", { targetId, currentGroup });
    let child: any;
    let index: number;
    // Use current group's ShapesInGroup if provided, otherwise use the global ZList.
    const groupArray = (currentGroup = currentGroup || null) ? currentGroup.ShapesInGroup : this.ZList();

    for (index = 0; index < groupArray.length; index++) {
      if (groupArray[index] === targetId) {
        console.log("O.Opt FindParentGroup - Output:", currentGroup);
        return currentGroup;
      }
      child = GlobalData.optManager.GetObjectPtr(groupArray[index], false);
      if (child instanceof GroupSymbol && child.ShapesInGroup) {
        const parentGroup = GlobalData.optManager.FindParentGroup(targetId, child);
        if (parentGroup) {
          console.log("O.Opt FindParentGroup - Output:", parentGroup);
          return parentGroup;
        }
      }
    }
    console.log("O.Opt FindParentGroup - Output: null");
    return null;
  }

  /**
     * Flips selected shapes based on the specified flip type.
     * @param flipType - The type of flip to apply. Should be one of the constant flags, e.g., SEDE_FlipVert or SEDE_FlipHoriz.
     * @returns void
     */
  FlipShapes(flipType: number): void {
    console.log("O.Opt FlipShapes - Input:", { flipType });

    const isRotationQualified = (shape: any): boolean => {
      return !(Math.abs(shape.RotationAngle % 180) < 20) &&
        Math.abs(shape.RotationAngle % 90) < 20;
    };

    const selectedObjects = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data;
    const count = selectedObjects.length;

    if (count !== 0) {
      let alternativeFlipType: number;
      let index = 0;
      let currentObject: any = null;
      let cannotFlipFound: boolean = false;

      alternativeFlipType = flipType === ConstantData.ExtraFlags.SEDE_FlipVert
        ? ConstantData.ExtraFlags.SEDE_FlipHoriz
        : ConstantData.ExtraFlags.SEDE_FlipVert;

      for (index = 0; index < count; index++) {
        currentObject = this.GetObjectPtr(selectedObjects[index], false);
        if (currentObject.NoFlip()) {
          cannotFlipFound = true;
          break;
        }
      }

      if (cannotFlipFound) {
        Utils2.Alert(Resources.Strings.NoFlip, null);
      } else {
        // if (Collab.AllowMessage()) {
        //   Collab.BeginSecondaryEdit();
        // }
        for (index = 0; index < count; index++) {
          currentObject = this.GetObjectPtr(selectedObjects[index], true);
          this.SetLinkFlag(selectedObjects[index], ConstantData.LinkFlags.SED_L_MOVE);
          if (currentObject.hooks.length) {
            this.SetLinkFlag(currentObject.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE);
          }
          this.AddToDirtyList(selectedObjects[index]);
          if (isRotationQualified(currentObject)) {
            currentObject.Flip(alternativeFlipType);
          } else {
            currentObject.Flip(flipType);
          }
        }
        // if (Collab.AllowMessage()) {
        //   const messageData = {
        //     flip: flipType
        //   };
        //   Collab.BuildMessage(ConstantData.CollabMessages.FlipShapes, messageData, true);
        // }
        this.CompleteOperation(null);
      }
    }

    console.log("O.Opt FlipShapes - Output: completed");
  }

  /**
   * Flips an array of vertex coordinates horizontally, vertically, or both.
   * @param vertices - Array of vertex objects with 'x' and 'y' properties, normalized between 0 and 1.
   * @param flipFlags - Bitmask flag that indicates the flip type. Use ConstantData.ExtraFlags.SEDE_FlipHoriz for horizontal flip and ConstantData.ExtraFlags.SEDE_FlipVert for vertical flip.
   * @returns The modified array of vertices after flipping.
   */
  FlipVertexArray(vertices: { x: number, y: number }[], flipFlags: number): { x: number, y: number }[] {
    console.log("O.Opt FlipVertexArray - Input:", { vertices, flipFlags });

    const count = vertices.length;
    for (let i = 0; i < count; i++) {
      if (flipFlags & ConstantData.ExtraFlags.SEDE_FlipHoriz) {
        vertices[i].x = 1 - vertices[i].x;
      }
      if (flipFlags & ConstantData.ExtraFlags.SEDE_FlipVert) {
        vertices[i].y = 1 - vertices[i].y;
      }
    }

    console.log("O.Opt FlipVertexArray - Output:", vertices);
    return vertices;
  }

  /**
   * Calculates optimal text indentation values for text inside a polygon shape.
   * This function finds the largest rectangular area within the polygon and calculates
   * appropriate indentation ratios for each side (left, right, top, bottom).
   *
   * @param polygonPoints - Array of points defining the polygon shape
   * @param shapeFrame - Rectangle object representing the shape's frame with width and height properties
   * @returns Object containing indentation values for each side of the text (left, right, top, bottom)
   */
  GuessTextIndents(polygonPoints, shapeFrame) {
    console.log("O.Opt GuessTextIndents - Input:", { polygonPoints, shapeFrame });

    // Initialize variables with descriptive names
    let shapeWidth, shapeHeight, frameWidth, frameHeight;
    let intersectionSegment, offsetStep, segmentPosition, endPosition;
    let topPosition, bottomPosition, leftPosition, rightPosition;
    let tempPosition, tempSegment, foundRectWidth, foundRectHeight;
    let rectangleArea, maxRectangleArea, bestRectangleHorizontal;
    let horizontalFound = false, verticalFound = false;
    let iterationCount = 10;
    let intersectionCount;

    // Create arrays to store intersection points
    let horizontalIntersectionPoints = [
      { x: 0, y: 0 },
      { x: 0, y: 0 }
    ];

    let verticalIntersectionPoints = [
      { x: 0, y: 0 },
      { x: 0, y: 0 }
    ];

    // Initialize result storage
    let rectangleResult = {};
    let horizontalRectangle = {};
    let indentationValues = {};

    // Ensure minimum dimensions
    shapeWidth = shapeFrame.width;
    if (shapeWidth < 1) {
      shapeWidth = 1;
    }

    shapeHeight = shapeFrame.height;
    if (shapeHeight < 1) {
      shapeHeight = 1;
    }

    frameWidth = shapeWidth;
    frameHeight = shapeHeight;

    // Create a frame rectangle
    let fullFrameRect = Utils2.SetRect(0, 0, shapeFrame.width, shapeFrame.height);

    // Calculate the step size for vertical search
    offsetStep = frameHeight / 20;

    // First pass: find best horizontal rectangle
    for (let i = 0; i < iterationCount; i++) {
      // Calculate the segment position as a percentage of the width
      segmentPosition = 0.8 * i * frameWidth / iterationCount;

      // Find intersections with the polygon at this position
      let intersectionCount = this.PolyGetIntersect(polygonPoints, segmentPosition, horizontalIntersectionPoints, null, true);

      if (intersectionCount === 2) {
        // For each possible end position
        for (let j = 0; j < iterationCount - i; j++) {
          endPosition = (1 - j / iterationCount * 0.8) * frameWidth;

          // Find intersections at the end position
          intersectionCount = this.PolyGetIntersect(polygonPoints, endPosition, verticalIntersectionPoints, null, true);

          if (intersectionCount === 2) {
            // Find the overlapping vertical range
            if (verticalIntersectionPoints[0] > horizontalIntersectionPoints[0]) {
              topPosition = verticalIntersectionPoints[0];
            } else {
              topPosition = horizontalIntersectionPoints[0];
            }

            if (verticalIntersectionPoints[1] < horizontalIntersectionPoints[1]) {
              bottomPosition = verticalIntersectionPoints[1];
            } else {
              bottomPosition = horizontalIntersectionPoints[1];
            }

            // If we have a valid vertical range
            if (topPosition < bottomPosition) {
              // Check the midpoint for further refinement
              tempPosition = topPosition;
              intersectionCount = this.PolyGetIntersect(polygonPoints, tempPosition + 1, verticalIntersectionPoints, null, false);

              if (intersectionCount > 2) {
                tempPosition = topPosition += offsetStep;
                intersectionCount = this.PolyGetIntersect(polygonPoints, tempPosition + 1, verticalIntersectionPoints, null, false);
              }

              tempPosition = bottomPosition;
              if (intersectionCount === 2) {
                intersectionCount = this.PolyGetIntersect(polygonPoints, tempPosition - 1, verticalIntersectionPoints, null, false);

                if (intersectionCount > 2) {
                  tempPosition = bottomPosition -= offsetStep;
                  intersectionCount = this.PolyGetIntersect(polygonPoints, tempPosition - 1, verticalIntersectionPoints, null, false);
                }
              }

              // If we still have a valid range
              if (intersectionCount === 2 && bottomPosition > topPosition) {
                tempPosition = topPosition + (bottomPosition - topPosition) / 2;
                leftPosition = segmentPosition;
                rightPosition = endPosition;

                // Check the midpoint
                intersectionCount = this.PolyGetIntersect(polygonPoints, tempPosition - 1, verticalIntersectionPoints, null, false);

                if (intersectionCount === 2) {
                  if (verticalIntersectionPoints[0] > segmentPosition) {
                    leftPosition = verticalIntersectionPoints[0];
                  }

                  if (verticalIntersectionPoints[1] < endPosition) {
                    rightPosition = verticalIntersectionPoints[1];
                  }
                }

                // Calculate the area of this rectangle
                rectangleArea = (rightPosition - leftPosition) * (bottomPosition - topPosition);

                // Update the best rectangle if this is larger
                if (horizontalFound === false || maxRectangleArea < rectangleArea) {
                  horizontalFound = true;
                  maxRectangleArea = rectangleArea;
                  rectangleResult = Utils2.SetRect(leftPosition, topPosition, rightPosition, bottomPosition);
                }
              }
            }
          }
        }
      }
    }

    // Save the best horizontal rectangle if found
    if (horizontalFound) {
      bestRectangleHorizontal = maxRectangleArea;
      Utils2.CopyRect(horizontalRectangle, rectangleResult);
      verticalFound = true;
    }

    // Second pass: find best vertical rectangle
    offsetStep = frameWidth / 20;

    for (let i = 0; i < iterationCount; i++) {
      segmentPosition = 0.8 * i * frameHeight / iterationCount;
      intersectionCount = this.PolyGetIntersect(polygonPoints, segmentPosition, horizontalIntersectionPoints, null, false);

      if (intersectionCount === 2) {
        for (let j = 0; j < iterationCount - i; j++) {
          endPosition = (1 - j / iterationCount * 0.8) * frameHeight;
          intersectionCount = this.PolyGetIntersect(polygonPoints, endPosition, verticalIntersectionPoints, null, false);

          if (intersectionCount === 2) {
            if (verticalIntersectionPoints[0] > horizontalIntersectionPoints[0]) {
              topPosition = verticalIntersectionPoints[0];
            } else {
              topPosition = horizontalIntersectionPoints[0];
            }

            if (verticalIntersectionPoints[1] < horizontalIntersectionPoints[1]) {
              bottomPosition = verticalIntersectionPoints[1];
            } else {
              bottomPosition = horizontalIntersectionPoints[1];
            }

            if (topPosition < bottomPosition) {
              tempPosition = topPosition;
              intersectionCount = this.PolyGetIntersect(polygonPoints, tempPosition + 1, verticalIntersectionPoints, null, true);

              if (intersectionCount > 2) {
                tempPosition = topPosition += offsetStep;
                intersectionCount = this.PolyGetIntersect(polygonPoints, tempPosition + 1, verticalIntersectionPoints, null, true);
              }

              tempPosition = bottomPosition;
              if (intersectionCount === 2) {
                intersectionCount = this.PolyGetIntersect(polygonPoints, tempPosition - 1, verticalIntersectionPoints, null, true);

                if (intersectionCount > 2) {
                  tempPosition = bottomPosition -= offsetStep;
                  intersectionCount = this.PolyGetIntersect(polygonPoints, tempPosition - 1, verticalIntersectionPoints, null, true);
                }
              }

              if (intersectionCount === 2 && bottomPosition > topPosition) {
                tempPosition = topPosition + (bottomPosition - topPosition) / 2;
                leftPosition = segmentPosition;
                rightPosition = endPosition;

                intersectionCount = this.PolyGetIntersect(polygonPoints, tempPosition - 1, verticalIntersectionPoints, null, true);

                if (intersectionCount === 2) {
                  if (verticalIntersectionPoints[0] > segmentPosition) {
                    leftPosition = verticalIntersectionPoints[0];
                  }

                  if (verticalIntersectionPoints[1] < endPosition) {
                    rightPosition = verticalIntersectionPoints[1];
                  }
                }

                rectangleArea = (rightPosition - leftPosition) * (bottomPosition - topPosition);

                if (horizontalFound === false || maxRectangleArea < rectangleArea) {
                  horizontalFound = true;
                  verticalFound = true;
                  maxRectangleArea = rectangleArea;
                  rectangleResult = Utils2.SetRect(topPosition, leftPosition, bottomPosition, rightPosition);
                }
              }
            }
          }
        }
      }
    }

    // Use the horizontal rectangle if it's better than the vertical one
    if (verticalFound && horizontalFound && bestRectangleHorizontal > maxRectangleArea) {
      Utils2.CopyRect(rectangleResult, horizontalRectangle);
    }

    // Calculate the indentation values
    if (horizontalFound) {
      indentationValues.left_sindent = (rectangleResult.x + 0) / shapeWidth;
      indentationValues.right_sindent = (fullFrameRect.x + fullFrameRect.width - (rectangleResult.x + rectangleResult.width) - 0) / shapeWidth;
      indentationValues.top_sindent = (rectangleResult.y + 0) / shapeHeight;
      indentationValues.bottom_sindent = (fullFrameRect.y + fullFrameRect.height - (rectangleResult.y + rectangleResult.height) - 0) / shapeHeight;
    } else {
      // Use default values if no good rectangle found
      indentationValues.left_sindent = 0.2;
      indentationValues.right_sindent = 0.2;
      indentationValues.top_sindent = 0.2;
      indentationValues.bottom_sindent = 0.2;
    }

    // Ensure indentation values aren't too large (total left+right indent shouldn't exceed 80%)
    while (indentationValues.left_sindent + indentationValues.right_sindent > 0.8) {
      if (indentationValues.left_sindent > 0.4) {
        indentationValues.left_sindent -= 0.1;
      }

      if (indentationValues.right_sindent > 0.4) {
        indentationValues.right_sindent -= 0.1;
      }
    }

    // Same for top/bottom indentation
    while (indentationValues.top_sindent + indentationValues.bottom_sindent > 0.8) {
      if (indentationValues.top_sindent > 0.4) {
        indentationValues.top_sindent -= 0.1;
      }

      if (indentationValues.bottom_sindent > 0.4) {
        indentationValues.bottom_sindent -= 0.1;
      }
    }

    console.log("O.Opt GuessTextIndents - Output:", indentationValues);
    return indentationValues;
  }

  /**
     * Adjusts the size of selected objects to match the target object's dimensions.
     * @param sizeOption - Option for resizing:
     *                     1: Match height only
     *                     2: Match width only
     *                     3: Match both width and height
     * @returns void
     */
  MakeSameSize(sizeOption) {
    console.log("O.Opt MakeSameSize - Input:", { sizeOption });
    const selectedList = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data;
    const selectedCount = selectedList.length;
    if (selectedCount <= 1) {
      console.log("O.Opt MakeSameSize - Output:", "Not enough objects selected");
      return;
    }
    const targetObjectId = this.GetTargetSelect();
    if (targetObjectId === -1) {
      console.log("O.Opt MakeSameSize - Output:", "No target object selected");
      return;
    }
    // Get target object's frame (deep-copy using jQuery.extend)
    const targetObject = this.GetObjectPtr(targetObjectId, false);
    const targetFrame = $.extend(true, {}, targetObject.Frame);
    const targetHeight = targetFrame.height;
    const targetWidth = targetFrame.width;

    // if (Collab.AllowMessage()) {
    //   Collab.BeginSecondaryEdit();
    // }

    // Resize each selected object (skipping the target object)
    for (let index = 0; index < selectedCount; ++index) {
      const objectId = selectedList[index];
      if (objectId === targetObjectId) continue;
      const currentObject = this.GetObjectPtr(objectId, true);
      const originalFrame = Utils1.DeepCopy(currentObject.Frame);
      switch (sizeOption) {
        case 1:
          // Match height only
          currentObject.SetSize(null, targetHeight, 0);
          break;
        case 2:
          // Match width only
          currentObject.SetSize(targetWidth, null, 0);
          break;
        case 3:
          // Match both width and height
          currentObject.SetSize(targetWidth, targetHeight, 0);
          break;
        default:
          break;
      }
      if ((GlobalData.docHandler.documentConfig.centerSnap && GlobalData.docHandler.documentConfig.enableSnap) ||
        GlobalData.docHandler.documentConfig.enableSnap === false) {
        const deltaX = (currentObject.Frame.width - originalFrame.width) / 2;
        const deltaY = (currentObject.Frame.height - originalFrame.height) / 2;
        if (deltaX || deltaY) {
          GlobalData.optManager.OffsetShape(objectId, -deltaX, -deltaY, 0);
        }
      }
      if (currentObject.rflags) {
        currentObject.rflags = Utils2.SetFlag(currentObject.rflags, ConstantData.FloatingPointDim.SD_FP_Width, false);
        currentObject.rflags = Utils2.SetFlag(currentObject.rflags, ConstantData.FloatingPointDim.SD_FP_Height, false);
      }
      this.SetLinkFlag(objectId, ConstantData.LinkFlags.SED_L_MOVE);
      this.AddToDirtyList(objectId);
    }

    // if (Collab.AllowMessage()) {
    //   const messageData = { makeSameSizeOption: sizeOption };
    //   Collab.BuildMessage(ConstantData.CollabMessages.MakeSameSize, messageData, true);
    // }
    this.CompleteOperation(null);
    console.log("O.Opt MakeSameSize - Output:", "Completed");
  }

  /**
     * Stamps a new text shape upon tap event.
     * @param shape - The shape object to be stamped.
     * @param hCenter - True if the shape should be horizontally centered.
     * @param vCenter - True if the shape should be vertically centered.
     * @param operation - The operation mode for stamping.
     * @param isSticky - True if the stamp is sticky.
     * @param completeCallback - Callback function to be executed upon completion.
     * @param completeUserData - Additional user data to pass to the callback.
     */
  StampNewTextShapeOnTap(shape, hCenter, vCenter, operation, isSticky, completeCallback, completeUserData) {
    console.log("O.Opt StampNewTextShapeOnTap - Input:", { shape, hCenter, vCenter, operation, isSticky, completeCallback, completeUserData });

    this.SetModalOperation(ConstantData2.ModalOperations.STAMPTEXTONTAP);
    this.stampCompleteCallback = completeCallback || null;
    this.stampCompleteUserData = completeUserData || null;
    this.stampHCenter = hCenter;
    this.stampVCenter = vCenter;
    this.stampSticky = isSticky;
    this.theDrawShape = shape;
    this.ClearAnySelection(false);
    this.SetEditMode(ConstantData.EditState.TEXT);

    this.WorkAreaHammerTap = (tapEvent) => {
      try {
        GlobalData.optManager.SetUIAdaptation(tapEvent);
        // if (Collab.AllowMessage()) {
        //   Collab.BeginSecondaryEdit();
        // }
        GlobalData.optManager.AddNewObject(shape, operation, false);
        const activeLayerZList = GlobalData.optManager.ActiveLayerZList();
        const activeCount = activeLayerZList.length;
        GlobalData.optManager.theActionStoredObjectID = activeLayerZList[activeCount - 1];
        GlobalData.optManager.theActionSVGObject = GlobalData.optManager.svgObjectLayer.GetElementByID(GlobalData.optManager.theActionStoredObjectID);
        GlobalData.optManager.StampTextObjectOnTapDone(tapEvent, operation);
      } catch (error) {
        GlobalData.optManager.CancelModalOperation();
        GlobalData.optManager.ExceptionCleanup(error);
        throw error;
      }
    };

    this.WorkAreaHammer.on('tap', this.WorkAreaHammerTap);
    this.LM_StampPreTrack();

    console.log("O.Opt StampNewTextShapeOnTap - Output: Completed");
  }

  /**
     * Cancels the object stamp text on tap operation.
     * @param event - The event triggering the cancellation of stamp text.
     * @returns void
     */
  CancelObjectStampTextOnTap(event: any): void {
    console.log("O.Opt CancelObjectStampTextOnTap - Input:", event);
    this.SetModalOperation(ConstantData2.ModalOperations.NONE);
    this.LM_StampPostRelease(false);
    this.SetEditMode(ConstantData.EditState.DEFAULT);
    if (event) {
      this.WorkAreaHammer.on('tap', DefaultEvt.Evt_WorkAreaHammerTap);
    }
    this.stampCompleteCallback = null;
    this.stampCompleteUserData = null;
    this.theMoveList = null;
    this.stampShapeOffsetX = 0;
    this.stampShapeOffsetY = 0;
    this.stampHCenter = false;
    this.stampVCenter = false;
    this.theDrawShape = null;
    this.theMoveList = null;
    this.theActionStoredObjectID = -1;
    this.theActionSVGObject = null;
    console.log("O.Opt CancelObjectStampTextOnTap - Output: Completed");
  }

  /**
   * Stamp text object on tap done.
   * @param event - The tap event object.
   * @param optionalParam - An optional parameter.
   * @returns void
   */
  StampTextObjectOnTapDone(event, optionalParam) {
    console.log("O.Opt StampTextObjectOnTapDone - Input:", { event, optionalParam });

    GlobalData.optManager.SetUIAdaptation(event);

    let objectIds = [];
    let docCoords = this.svgDoc.ConvertWindowToDocCoords(
      event.gesture.center.clientX,
      event.gesture.center.clientY
    );
    let isTextOnly = this.theDrawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly;

    if (!isTextOnly) {
      let hasValidConnection = this.LinkParams && this.LinkParams.SConnectIndex >= 0;
      if (this.OverrideSnaps(event)) {
        hasValidConnection = true;
      }
      if (GlobalData.docHandler.documentConfig.enableSnap && !hasValidConnection) {
        docCoords = GlobalData.docHandler.SnapToGrid(docCoords);
      }
    }

    let adjustedX = docCoords.x - this.theDrawShape.Frame.width / 2;
    let adjustedY = docCoords.y - this.theDrawShape.Frame.height / 2;

    // Update the shape's frame position with stamp offsets
    this.theDrawShape.Frame.x = adjustedX - this.stampShapeOffsetX;
    this.theDrawShape.Frame.y = adjustedY - this.stampShapeOffsetY;

    // Synchronize the shape's size dimensions with its frame
    this.theDrawShape.sizedim.width = this.theDrawShape.Frame.width;
    this.theDrawShape.sizedim.height = this.theDrawShape.Frame.height;

    this.theDrawShape.UpdateFrame(this.theDrawShape.Frame);

    // Collab.AddNewBlockToSecondary(this.theDrawShape.BlockID);

    let collaborationData = {};
    this.BuildCreateMessage(collaborationData, true);

    this.GetObjectPtr(this.theActionStoredObjectID, true);
    this.SetEditMode(ConstantData.EditState.DEFAULT);

    if (this.theMoveList && this.theMoveList.length) {
      this.DeleteObjects(objectIds, false);
      objectIds = this.theMoveList.slice(0);
      this.theActionStoredObjectID = -1;
    } else {
      this.AddToDirtyList(this.theActionStoredObjectID);
    }

    this.RenderDirtySVGObjects();
    this.theMoveList = null;

    this.WorkAreaHammer.on('tap', DefaultEvt.Evt_WorkAreaHammerTap);

    this.CompleteOperation(objectIds);

    if (this.stampCompleteCallback && this.theActionStoredObjectID >= 0) {
      this.stampCompleteCallback(this.theActionStoredObjectID, this.stampCompleteUserData);
    }
    this.stampCompleteCallback = null;
    this.stampCompleteUserData = null;

    this.stampHCenter = false;
    this.stampVCenter = false;
    this.stampShapeOffsetX = 0;
    this.stampShapeOffsetY = 0;

    this.LM_StampPostRelease(true);

    if (!isTextOnly) {
      objectIds.push(this.theActionStoredObjectID);
    }

    this.theActionStoredObjectID = -1;
    this.theActionSVGObject = null;
    this.SetModalOperation(ConstantData2.ModalOperations.NONE);

    console.log("O.Opt StampTextObjectOnTapDone - Output:", { stampedShapeId: this.theActionStoredObjectID, objectIds });
  }

  /**
   * Attempts to reverse standard text replacement by pasting the original text into the target clipboard.
   * @param source - The source object containing text and table information.
   * @param clipboard - The target clipboard object which supports the Paste method.
   * @returns True if the reverse replacement occurred, otherwise false.
   */
  ReverseReplaceStdText(source: any, clipboard: any): boolean {
    console.log("O.Opt ReverseReplaceStdText - Input:", { source, clipboard });
    let resultText: string;
    let tableData: any;
    let replaceIndex = -1;

    // Check if there is a table associated with the source object
    if (tableData = source.GetTable(true)) {
      if (tableData.select >= 0) {
        const selectedCell = tableData.cells[tableData.select];
        if (selectedCell.flags & ListManager.Table.CellFlags.SDT_F_Clickhere) {
          switch (selectedCell.celltype) {
            case ListManager.Table.CellTypes.SDT_CT_PERSON:
              replaceIndex = Resources.ReplaceTextStrings.Indexes.PersonClick;
              break;
            default:
              replaceIndex = (source.TextFlags & ConstantData.TextFlags.SED_TF_OneClick)
                ? Resources.ReplaceTextStrings.Indexes.Click
                : Resources.ReplaceTextStrings.Indexes.DoubleClick;
          }
          resultText = Resources.ReplaceTextStrings[replaceIndex];
          clipboard.Paste(resultText);
          selectedCell.flags = Utils2.SetFlag(selectedCell.flags, ListManager.Table.CellFlags.SDT_F_Clickhere, false);
          console.log("O.Opt ReverseReplaceStdText - Output:", true);
          return true;
        }
      }
    } else if (source.TextFlags & ConstantData.TextFlags.SED_TF_Clickhere) {
      resultText = (source.TextFlags & ConstantData.TextFlags.SED_TF_OneClick)
        ? Resources.ReplaceTextStrings[Resources.ReplaceTextStrings.Indexes.Click]
        : Resources.ReplaceTextStrings[Resources.ReplaceTextStrings.Indexes.DoubleClick];
      clipboard.Paste(resultText);
      source.TextFlags = Utils2.SetFlag(source.TextFlags, ConstantData.TextFlags.SED_TF_Clickhere, false);
      console.log("O.Opt ReverseReplaceStdText - Output:", true);
      return true;
    }

    console.log("O.Opt ReverseReplaceStdText - Output:", false);
    return false;
  }

  /**
     * Checks and replaces standard text in the provided text source.
     * @param textSource - The object containing the text and optional table data.
     * @param currentText - The current text string to evaluate for replacement.
     * @param textEditor - The text editor element that can update its text.
     * @param checkOnly - Flag indicating if the function should only check for a match without performing the replacement.
     * @returns True if a replacement condition is met; otherwise, false.
     */
  ReplaceStdText(textSource, currentText, textEditor, checkOnly) {
    console.log("O.Opt ReplaceStdText - Input:", { textSource, currentText, textEditor, checkOnly });

    let index, tableData, textPart, tempPart, isMatched, upperText;
    let replaceStringCount = Resources.ReplaceTextStrings.length;

    // Get substring from currentText to compare with the first replacement string.
    replaceStringCount = Resources.ReplaceTextStrings[0].length;
    textPart = currentText.slice(0, replaceStringCount);

    // Get substring from currentText to compare with the second replacement string.
    replaceStringCount = Resources.ReplaceTextStrings[1].length;
    tempPart = currentText.slice(0, replaceStringCount);

    // Determine if either starting substring matches (case insensitive).
    isMatched = textPart.toUpperCase() === Resources.ReplaceTextStrings[0].toUpperCase() ||
      tempPart.toUpperCase() === Resources.ReplaceTextStrings[1].toUpperCase();

    // Get the complete currentText in uppercase.
    upperText = currentText.toUpperCase();

    // Loop through all replacement strings starting from index 1.
    replaceStringCount = Resources.ReplaceTextStrings.length;
    for (index = 1; index < replaceStringCount; index++) {
      if (isMatched || upperText === Resources.ReplaceTextStrings[index].toUpperCase()) {
        // If only checking, log and return true immediately.
        if (checkOnly) {
          console.log("O.Opt ReplaceStdText - Output:", true);
          return true;
        }
        // Clear the text in the text editor.
        textEditor.SetText('');
        // Check if the textSource contains a table.
        tableData = textSource.GetTable(true);
        if (tableData) {
          // If there is a valid cell selection in the table, update its flags.
          if (tableData.select >= 0) {
            let cell = tableData.cells[tableData.select];
            cell.flags = Utils2.SetFlag(cell.flags, ListManager.Table.CellFlags.SDT_F_Clickhere, true);
          }
        } else {
          // Otherwise, update the text flags on the text source.
          textSource.TextFlags = Utils2.SetFlag(textSource.TextFlags, ConstantData.TextFlags.SED_TF_Clickhere, true);
        }
        console.log("O.Opt ReplaceStdText - Output:", true);
        return true;
      }
    }
    console.log("O.Opt ReplaceStdText - Output:", false);
    return false;
  }

  /**
     * Ungroups a shape by extracting its constituent shapes and applying any transformations
     * @param groupId - ID of the group to ungroup
     * @param maintainLinksFlag - Flag to determine how to maintain links (true for value 2, false for normal behavior)
     * @returns void
     */
  UngroupShape(groupId, maintainLinksFlag) {
    console.log("O.Opt UngroupShape - Input:", { groupId, maintainLinksFlag });

    // Arrays to track different object types
    let commentIds = [];
    let containerIds = [];
    let objectsForLinkMaintenance = [];
    let index, hookIndex, widthOffset, styleIndex;

    // References to objects and structures we'll need
    let newObject = null;
    let existingObject = null;
    let linksList = GlobalData.optManager.GetObjectPtr(this.theLinksBlockID, true);

    // Constants for flip operations
    const FLIP_VERTICAL = ConstantData.ExtraFlags.SEDE_FlipVert;
    const FLIP_HORIZONTAL = ConstantData.ExtraFlags.SEDE_FlipHoriz;

    // Get the group object
    const groupObject = GlobalData.optManager.GetObjectPtr(groupId, true);

    // Get the frame of the group and its center point
    const groupFrame = groupObject.Frame;
    const groupCenter = {
      x: groupFrame.x + groupFrame.width / 2,
      y: groupFrame.y + groupFrame.height / 2
    };

    // Get the shapes in the group and count them
    const shapesInGroup = groupObject.ShapesInGroup;
    const shapeCount = shapesInGroup.length;

    // If there are no shapes in the group, nothing to do
    if (shapeCount === 0) {
      console.log("O.Opt UngroupShape - Output: No shapes in group");
      return;
    }

    // Get the position and calculate scale factors
    const groupX = groupFrame.x;
    const groupY = groupFrame.y;
    let scaleX = groupFrame.width / groupObject.InitialGroupBounds.width;

    if (isNaN(scaleX)) {
      scaleX = 1;
    }

    let scaleY = groupFrame.height / groupObject.InitialGroupBounds.height;
    if (isNaN(scaleY)) {
      scaleY = 1;
    }

    // Get the z-list with preserved state
    GlobalData.optManager.ZListPreserve();

    // Process each shape in the group
    for (index = 0; index < shapeCount; ++index) {
      // Get the current shape from the group
      const currentShape = GlobalData.optManager.GetObjectPtr(shapesInGroup[index], true);

      // Track comment IDs
      if (currentShape.CommentID >= 0) {
        commentIds.push(currentShape.CommentID);
      }

      // Track container objects
      if (currentShape instanceof ShapeContainer) {
        containerIds.push(currentShape.BlockID);
      }

      // Create a deep copy for maintaining links
      newObject = new BaseDrawingObject(null);
      newObject = Utils1.DeepCopy(currentShape);
      newObject.Frame.x += groupX;
      newObject.Frame.y += groupY;

      // Adjust start and end points if they exist
      if (currentShape.StartPoint) {
        newObject.StartPoint.x += groupX;
        newObject.StartPoint.y += groupY;
      }

      if (currentShape.EndPoint) {
        newObject.EndPoint.x += groupX;
        newObject.EndPoint.y += groupY;
      }

      // Save the copy for later use
      objectsForLinkMaintenance.push(newObject);

      // Convert GroupSymbol to native format if needed
      if (currentShape instanceof GroupSymbol &&
        currentShape.NativeID < 0) {
        currentShape.ConvertToNative(GlobalData.optManager.RichGradients, false);
      }

      // Scale the object based on group parameters
      currentShape.ScaleObject(
        groupX,
        groupY,
        groupCenter,
        groupObject.RotationAngle,
        scaleX,
        scaleY,
        true
      );

      widthOffset = 0;

      // Apply vertical flip if needed
      if (groupObject.extraflags & FLIP_VERTICAL) {
        currentShape.Flip(FLIP_VERTICAL);
      }

      // Apply horizontal flip if needed
      if (groupObject.extraflags & FLIP_HORIZONTAL) {
        widthOffset = groupFrame.width -
          (currentShape.Frame.x + currentShape.Frame.width - groupFrame.x) -
          currentShape.Frame.x + groupFrame.x;
        currentShape.Flip(FLIP_HORIZONTAL);
      }

      // Apply width offset if needed
      if (widthOffset) {
        currentShape.OffsetShape(widthOffset, 0);
      }

      // Scale text if needed
      if (currentShape.DataID !== -1 && scaleY !== 1) {
        const textStyles = GlobalData.optManager.GetObjectPtr(currentShape.DataID, true).runtimeText.styles;
        const styleCount = textStyles.length;

        for (styleIndex = 0; styleIndex < styleCount; ++styleIndex) {
          textStyles[styleIndex].size *= scaleY;
        }
      }

      // Scale table if present
      const tableData = currentShape.GetTable(true);
      if (tableData) {
        this.Table_ScaleTable(currentShape, tableData, scaleX, scaleY);
      }

      // Mark as no longer in a group
      currentShape.bInGroup = false;

      // Add to dirty list and rebuild links
      this.AddToDirtyList(shapesInGroup[index]);
      GlobalData.optManager.RebuildLinks(linksList, shapesInGroup[index]);
    }

    // Insert the shapes into the layer at the group's position
    GlobalData.optManager.InsertObjectsIntoLayerAt(groupId, shapesInGroup);

    // Maintain links for each shape
    for (index = 0; index < objectsForLinkMaintenance.length; index++) {
      GlobalData.optManager.ob = objectsForLinkMaintenance[index];
      existingObject = GlobalData.optManager.GetObjectPtr(objectsForLinkMaintenance[index].BlockID, false);

      const linkMode = maintainLinksFlag ? 2 : false;

      GlobalData.optManager.MaintainLink(
        objectsForLinkMaintenance[index].BlockID,
        existingObject,
        GlobalData.optManager.ob,
        ConstantData.ActionTriggerType.FLIP,
        linkMode
      );
    }

    // Clear the temporary object reference
    GlobalData.optManager.ob = {};

    // Update link flags for containers
    const containerCount = containerIds.length;
    for (index = 0; index < containerCount; index++) {
      GlobalData.optManager.SetLinkFlag(containerIds[index], ConstantData.LinkFlags.SED_L_MOVE);
    }

    // Update all links
    GlobalData.optManager.UpdateLinks();

    // Clear the shapes list from the group
    groupObject.ShapesInGroup = [];

    // Delete the group object
    this.DeleteObjects([groupId], false);

    // Handle comment ungrouping if needed
    if (commentIds.length) {
      GlobalData.optManager.Comment_Ungroup(commentIds);
    }

    // Render all dirty SVG objects
    GlobalData.optManager.RenderDirtySVGObjects();

    console.log("O.Opt UngroupShape - Output: Successfully ungrouped", shapeCount, "shapes");
  }

  /**
     * Rebuilds the links for the specified object.
     * Inserts a move link for each hook present in the object.
     * @param linkList - The list in which the new links will be inserted.
     * @param objectId - The ID of the object whose links need to be rebuilt.
     */
  RebuildLinks(linkList, objectId) {
    console.log("O.Opt RebuildLinks - Input:", { linkList, objectId });
    const targetObject = GlobalData.optManager.GetObjectPtr(objectId, false);
    if (targetObject && targetObject.hooks) {
      const hookCount = targetObject.hooks.length;
      for (let hookIndex = 0; hookIndex < hookCount; hookIndex++) {
        GlobalData.optManager.InsertLink(linkList, objectId, hookIndex, ConstantData.LinkFlags.SED_L_MOVE);
      }
    }
    console.log("O.Opt RebuildLinks - Output: Completed");
  }

  /**
     * Inserts objects into a layer immediately after a specified object.
     * @param objectId - The ID of the object after which new objects will be inserted.
     * @param insertList - An array of object IDs to be inserted.
     * @returns void
     */
  InsertObjectsIntoLayerAt(objectId: number, insertList: number[]): void {
    console.log("O.Opt InsertObjectsIntoLayerAt - Input:", { objectId, insertList });

    // Find the layer index for the specified object.
    const layerIndex = this.FindLayerForShapeID(objectId);
    if (layerIndex >= 0) {
      // Retrieve the layers and get the current z-order list for the identified layer.
      const layers = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, true).layers;
      let currentZList = layers[layerIndex].zList;

      // Locate the index of the object in the z-order list.
      const objectIndex = currentZList.indexOf(objectId);
      const tail = currentZList.slice(objectIndex + 1);

      // Remove elements after the specified object.
      currentZList.splice(objectIndex + 1, currentZList.length - objectIndex - 1);

      // Insert new objects and append the tail.
      layers[layerIndex].zList = currentZList.concat(insertList, tail);
    }

    console.log("O.Opt InsertObjectsIntoLayerAt - Output:", { objectId, insertList });
  }

  /**
   * Cuts the selected objects from the document.
   * Depending on the editing mode, it will either cut text from an active text editor
   * or cut graphic/table objects.
   *
   * @param isFromCutButton - Boolean flag that indicates whether the cut was triggered by a button click.
   * @returns void
   */
  CutObjects(isFromCutButton: boolean): void {
    console.log("O.Opt CutObjects - Input:", { isFromCutButton });
    try {
      // If a cut is already in progress from a button and this call is from a button, cancel further processing.
      if (GlobalData.optManager.CutFromButton && isFromCutButton) {
        GlobalData.optManager.CutFromButton = false;
        console.log("O.Opt CutObjects - Output:", "Cut cancelled due to active cut button state.");
        return;
      }

      // Set the cut button flag based on the trigger.
      GlobalData.optManager.CutFromButton = !isFromCutButton;

      // Check if we are in a text editing mode or note/dimension edit mode.
      const textEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);
      if (
        textEditSession.theActiveTextEditObjectID !== -1 ||
        this.bInNoteEdit ||
        GlobalData.optManager.bInDimensionEdit
      ) {
        const activeTextEditor = this.svgDoc.GetActiveEdit();
        if (activeTextEditor) {
          this.theTextClipboard = activeTextEditor.Copy(true);
          // Collab.BeginSecondaryEdit();
          this.RegisterLastTEOp(ConstantData.TELastOp.CUT);
          activeTextEditor.Delete();
          this.theContentHeader.ClipboardBuffer = null;
          this.theContentHeader.ClipboardType = ConstantData.ClipboardType.Text;
          this.RegisterLastTEOp(ConstantData.TELastOp.TIMEOUT);
        }
        console.log("O.Opt CutObjects - Output:", "Text cut completed.");
        return;
      }

      // If a table cell is active, perform table cut operations.
      const activeTableId = this.Table_GetActiveID();
      if (activeTableId >= 0) {
        this.Table_CopyCellContent(activeTableId);
        this.Table_DeleteCellContent(activeTableId, null);
        console.log("O.Opt CutObjects - Output:", "Table cell cut completed.");
        return;
      }

      // If there are no selected objects, exit.
      if (!this.AreSelectedObjects()) {
        console.log("O.Opt CutObjects - Output:", "No selected objects to cut.");
        return;
      }

      // For graphic objects: close any active edit, copy objects to clipboard, and delete selected objects.
      this.CloseEdit();
      this.CopyObjectsCommon(false);
      this.DeleteSelectedObjectsCommon();

      console.log("O.Opt CutObjects - Output:", "Graphic objects cut completed.");
    } catch (error) {
      GlobalData.optManager.RestorePrimaryStateManager();
      GlobalData.optManager.ExceptionCleanup(error);
      console.log("O.Opt CutObjects - Output:", "Error occurred during cut operation.");
      throw error;
    }
  }

  /**
   * Copies the selected objects to clipboard.
   * @param returnBuffer - If true, returns an object with zList and buffer; otherwise, updates the clipboard buffer.
   * @returns An object with zList and buffer if returnBuffer is true; otherwise, no explicit return.
   */
  CopyObjectsCommon(returnBuffer: boolean): { zList: any[]; buffer: string } | void {
    console.log("O.Opt CopyObjectsCommon - Input:", { returnBuffer });

    // Retrieve the currently selected objects.
    const selectedObjects = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data;

    // // If there are selected objects and we're in a MindMap planning document, commit the visual outline.
    // if (selectedObjects.length && this.IsPlanningDocument() === ConstantData.LayerTypes.SD_LAYERT_MINDMAP) {
    //   ListManager.TaskMap.CommitVisualOutline();
    // }

    // Prepare deletion options with connectors flag set to false.
    const options = { connectors: false };
    this.AddtoDelete(selectedObjects, true, options);

    const selectedCount = selectedObjects.length;
    if (selectedCount !== 0) {
      // If connectors are flagged and returnBuffer is false, close the secondary edit and filter for clipboard.
      if (options.connectors && !returnBuffer) {
        // Collab.CloseSecondaryEdit();
        return this.FilterFiletoClipboard(selectedObjects, returnBuffer);
      }

      // Retrieve the global z-order list and prepare an index array.
      const zOrderList = this.ZList();
      const indexArray: number[] = [];
      for (let i = 0; i < selectedCount; i++) {
        const objectId = selectedObjects[i];
        // Find the index of the selected object in the z-order list.
        const indexInZList = $.inArray(objectId, zOrderList);
        indexArray.push(indexInZList);
      }

      // Sort the indices in ascending order.
      indexArray.sort((a, b) => a - b);

      // Build a sorted list of objects based on their index in the z-order.
      const sortedObjects: any[] = [];
      for (let i = 0; i < selectedCount; i++) {
        const sortedObjId = zOrderList[indexArray[i]];
        sortedObjects.push(sortedObjId);
      }

      // If returnBuffer flag is true, return the sorted zList and written buffer.
      if (returnBuffer) {
        console.log("O.Opt CopyObjectsCommon - Output:", { zList: sortedObjects, buffer: SDF.WriteSelect(sortedObjects, false, true, false) });
        return {
          zList: sortedObjects,
          buffer: SDF.WriteSelect(sortedObjects, false, true, false)
        };
      }

      // Otherwise update the clipboard buffer and clipboard type.
      this.theContentHeader.ClipboardBuffer = SDF.WriteSelect(sortedObjects, false, true, false);
      this.theContentHeader.ClipboardType = ConstantData.ClipboardType.LM;

      // Refresh the selected objects list by removing any objects that are not visible.
      const updatedSelectedObjects = this.GetObjectPtr(this.theSelectedListBlockID, false);
      for (let i = updatedSelectedObjects.length - 1; i >= 0; i--) {
        const currentObject = this.GetObjectPtr(updatedSelectedObjects[i], false);
        if (currentObject && (currentObject.flags & ConstantData.ObjFlags.SEDO_NotVisible)) {
          updatedSelectedObjects.splice(i, 1);
        }
      }
      console.log("O.Opt CopyObjectsCommon - Output: Clipboard updated");
    } else {
      console.log("O.Opt CopyObjectsCommon - Output: No objects selected");
    }
  }

  /**
     * Updates layer indices for objects based on the current layers data.
     * @param updateOptions - An object containing updated options, including a TextureList property.
     * @returns void
     */
  UpdateObjectLayerIndices(updateOptions: { TextureList: any }): void {
    console.log("O.Opt UpdateObjectLayerIndices - Input:", updateOptions);

    const layersManager = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, false);
    const layers = layersManager.layers;
    const numLayers = layersManager.nlayers;

    for (let layerIndex = 0; layerIndex < numLayers; layerIndex++) {
      const zList = layers[layerIndex].zList;
      for (let objectIndex = 0, zListLength = zList.length; objectIndex < zListLength; objectIndex++) {
        const currentObject = GlobalData.optManager.GetObjectPtr(zList[objectIndex], false);
        if (currentObject) {
          currentObject.Layer = layerIndex;
          currentObject.GetTextures(updateOptions.TextureList);
        }
      }
    }

    console.log("O.Opt UpdateObjectLayerIndices - Output: Completed");
  }

  /**
     * Pastes objects from the provided buffer at the computed paste position.
     * @param buffer - The buffer containing the object data.
     * @returns An array of selected object IDs that were pasted.
     */
  PasteLM(buffer: string): number[] {
    console.log("O.Opt PasteLM - Input:", buffer);

    const resultWrapper = { selectedList: [] as number[] };
    // Determine the paste position: use global paste point if set, otherwise get paste position.
    const pastePosition = GlobalData.optManager.PastePoint || this.GetPastePosition();
    let messagePayload: any = {};

    // if (Collab.AllowMessage()) {
    //   messagePayload.ClipboardString = Collab.BufferToString(buffer);
    //   messagePayload.pastepos = Utils1.DeepCopy(pastePosition);
    // }

    // Read symbol from buffer and update resultWrapper.selectedList accordingly.
    SDF.ReadSymbolFromBuffer(
      buffer,
      pastePosition.x,
      pastePosition.y,
      0,
      false,
      true,
      resultWrapper,
      true,
      false,
      false,
      false,
      false
    );

    GlobalData.optManager.PastePoint = null;
    this.CompleteOperation(resultWrapper.selectedList);

    // if (Collab.AllowMessage()) {
    //   if (Collab.IsSecondary()) {
    //     messagePayload.CreateList = Utils1.DeepCopy(resultWrapper.selectedList);
    //   }
    //   Collab.AddNewBlockToSecondary(resultWrapper.selectedList);
    //   Collab.BuildMessage(ConstantData.CollabMessages.PasteObjects, messagePayload, false);
    // }

    console.log("O.Opt PasteLM - Output:", resultWrapper.selectedList);
    return resultWrapper.selectedList;
  }

  /**
   * Gets the paste position for new objects.
   * This function calculates the paste position based on the current work area scroll offsets and
   * the document's scaling factor. A fixed offset is applied to the scroll position. If the current
   * scroll position matches the previous one, the paste position is further adjusted by incremental
   * offsets to avoid overlapping paste operations.
   * @returns An object containing the computed x and y coordinates for the paste position.
   */
  GetPastePosition(): { x: number; y: number } {
    console.log("O.Opt GetPastePosition - Input: no parameters");

    const offset = 100;
    const workArea = GlobalData.docHandler.svgDoc.GetWorkArea();
    let scale = GlobalData.docHandler.svgDoc.docInfo.docToScreenScale;
    if (scale == null || scale === 0) {
      scale = 1;
    }

    let pastePosition = {
      x: (workArea.scrollX + offset) / scale,
      y: (workArea.scrollY + offset) / scale
    };

    if (
      workArea.scrollX === GlobalData.optManager.TopLeftPasteScrollPos.x &&
      workArea.scrollY === GlobalData.optManager.TopLeftPasteScrollPos.y
    ) {
      pastePosition = GlobalData.optManager.TopLeftPastePos;
      pastePosition.x += 50;
      pastePosition.y += 50;
      GlobalData.optManager.PasteCount++;
      if (GlobalData.optManager.PasteCount > 5) {
        GlobalData.optManager.PasteCount = 0;
        pastePosition = {
          x: (workArea.scrollX + offset) / scale,
          y: (workArea.scrollY + offset) / scale
        };
      }
    } else {
      GlobalData.optManager.PasteCount = 0;
    }

    GlobalData.optManager.TopLeftPastePos = {
      x: pastePosition.x,
      y: pastePosition.y
    };
    GlobalData.optManager.TopLeftPasteScrollPos = {
      x: workArea.scrollX,
      y: workArea.scrollY
    };

    console.log("O.Opt GetPastePosition - Output:", pastePosition);
    return pastePosition;
  }

  /**
   * Copies selected objects or text based on the current editing mode.
   * @returns The clipboard content after the copy operation.
   */
  CopyObjects(): any {
    console.log("O.Opt CopyObjects - Input:");

    const activeTextEditorSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);
    const activeTableId = this.Table_GetActiveID();
    let clipboardContent: any;

    if (
      activeTextEditorSession.theActiveTextEditObjectID !== -1 ||
      this.bInNoteEdit ||
      GlobalData.optManager.bInDimensionEdit
    ) {
      const activeEditElement = this.svgDoc.GetActiveEdit();
      if (activeEditElement) {
        const copiedText = activeEditElement.Copy(true);
        if (copiedText) {
          this.theTextClipboard = copiedText;
        }
        SDUI.Commands.MainController.Selection.SetPasteEnable(this.theTextClipboard != null);
        this.theContentHeader.ClipboardBuffer = null;
        this.theContentHeader.ClipboardType = ConstantData.ClipboardType.Text;
      }
      clipboardContent = this.theTextClipboard;
      console.log("O.Opt CopyObjects - Output:", clipboardContent);
      return clipboardContent;
    }

    if (activeTableId >= 0) {
      this.Table_CopyCellContent(activeTableId);
      this.theTextClipboard = null;
    } else {
      if (!this.AreSelectedObjects()) {
        console.log("O.Opt CopyObjects - Output: No selected objects");
        return;
      }
      this.CloseEdit();
      this.CopyObjectsCommon(false);
      this.theTextClipboard = null;
    }

    const selectedObjectBlock = this.GetObjectPtr(this.theSelectedListBlockID, false);
    this.UpdateSelectionAttributes(selectedObjectBlock);
    clipboardContent = this.theContentHeader.ClipboardBuffer;
    console.log("O.Opt CopyObjects - Output:", clipboardContent);
    return clipboardContent;
  }

  /**
     * Gets the selection context.
     * @returns The context(s) indicating the current selection state.
     */
  GetSelectionContext(): any {
    console.log("O.Opt GetSelectionContext - Input:", {});

    let businessManager: any;
    let selectionContexts: any[] = [];

    // Check if there is an active text edit object in the TED session.
    const tedSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);
    if (tedSession.theActiveTextEditObjectID !== -1) {
      businessManager = Business.GetSelectionBusinessManager();
      if (businessManager) {
        selectionContexts.push(Resources.Contexts.Text);
        selectionContexts.push(this.GetAutomationContext(businessManager));
        console.log("O.Opt GetSelectionContext - Output:", selectionContexts);
        return selectionContexts;
      } else {
        console.log("O.Opt GetSelectionContext - Output:", Resources.Contexts.Text);
        return Resources.Contexts.Text;
      }
    }

    // Check if the active edit element corresponds to dimension or note text.
    const activeEditElement = this.svgDoc.GetActiveEdit();
    if (activeEditElement !== null && activeEditElement.ID === ConstantData.SVGElementClass.DIMENSIONTEXT) {
      console.log("O.Opt GetSelectionContext - Output:", Resources.Contexts.DimensionText);
      return Resources.Contexts.DimensionText;
    }
    if (activeEditElement !== null && activeEditElement.ID === ConstantData.SVGElementClass.NOTETEXT) {
      console.log("O.Opt GetSelectionContext - Output:", Resources.Contexts.NoteText);
      return Resources.Contexts.NoteText;
    }

    // Check if a table is active.
    if (this.Table_GetActiveID() !== -1) {
      selectionContexts.push(Resources.Contexts.Table);
      selectionContexts.push(Resources.Contexts.Text);
      businessManager = Business.GetSelectionBusinessManager();
      if (businessManager) {
        selectionContexts.push(Resources.Contexts.Automation);
      }
      console.log("O.Opt GetSelectionContext - Output:", selectionContexts);
      return selectionContexts;
    }

    // Handle default target selection.
    let targetObjectId = this.GetTargetSelect();
    if (targetObjectId === 0) {
      targetObjectId = -1;
    }
    if (targetObjectId !== -1) {
      businessManager = Business.GetSelectionBusinessManager();
      const targetObject = GlobalData.objectStore.GetObject(targetObjectId);
      const objectData = targetObject.Data;
      if (businessManager && /*!GlobalData.optManager.Comment_IsTarget(targetObjectId)*/ true) {
        selectionContexts.push(Resources.Contexts.Automation);
      }
      if (objectData.AllowTextEdit()) {
        if (selectionContexts.length) {
          selectionContexts.push(Resources.Contexts.Text);
          console.log("O.Opt GetSelectionContext - Output:", selectionContexts);
          return selectionContexts;
        } else {
          console.log("O.Opt GetSelectionContext - Output:", Resources.Contexts.Text);
          return Resources.Contexts.Text;
        }
      }
    }

    console.log("O.Opt GetSelectionContext - Output:", Resources.Contexts.None);
    return Resources.Contexts.None;
  }

  // /**
  //  * Checks if the specified object is currently targeted by a comment popup
  //  * @param objectId - The ID of the object to check
  //  * @returns True if the object is targeted by an active comment popup, false otherwise
  //  */
  // Comment_IsTarget(objectId: number): boolean {
  //   console.log("O.Opt Comment_IsTarget - Input:", objectId);

  //   if (objectId >= 0) {
  //     const commentPopup = Resources.Controls.Dropdowns.CommentPopup.GetControl(false);
  //     if (commentPopup && commentPopup[0].style.display === 'block') {
  //       console.log("O.Opt Comment_IsTarget - Output: true");
  //       return true;
  //     }
  //   }

  //   console.log("O.Opt Comment_IsTarget - Output: false");
  //   return false;
  // }

  /**
   * Handles keyboard key down events for text editing and object interactions.
   * This function processes key down events, manages text edit operations, and handles
   * special keys like arrows, backspace, delete, and spacebar.
   *
   * @param event - The keyboard event object
   * @param keyCode - The key code of the pressed key
   * @param altKey - Whether the Alt key was pressed
   * @returns True if the event was handled and should be prevented from bubbling, false otherwise
   */
  HandleKeyDown(event, keyCode, altKey) {
    console.log("O.Opt HandleKeyDown - Input:", {
      eventType: event.type,
      keyCode: keyCode,
      altKey: altKey
    });

    let activeEdit = this.svgDoc.GetActiveEdit();

    if (activeEdit && activeEdit.IsActive()) {
      // Handle active text editor cases
      if (!this.bInNoteEdit) {
        const textEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);

        if (textEditSession.theActiveTextEditObjectID !== -1) {
          switch (keyCode) {
            case ConstantData2.Keys.Left_Arrow:
            case ConstantData2.Keys.Right_Arrow:
            case ConstantData2.Keys.Up_Arrow:
            case ConstantData2.Keys.Down_Arrow:
              if (textEditSession.theTELastOp !== ConstantData.TELastOp.INIT) {
                this.RegisterLastTEOp(ConstantData.TELastOp.SELECT);
              }
              break;

            case ConstantData2.Keys.Backspace:
            case ConstantData2.Keys.Delete:
              this.RegisterLastTEOp(ConstantData.TELastOp.CHAR);
              break;
          }
        }
      }

      if (activeEdit.HandleKeyDownEvent(event)) {
        console.log("O.Opt HandleKeyDown - Output: true (activeEdit handled event)");
        return true;
      }
    } else if (keyCode === 32) { // Space key
      // Handle space key to activate text editing on selected objects
      const targetId = this.GetTargetSelect();

      if (targetId !== -1) {
        const targetObject = this.GetObjectPtr(targetId, false);

        if (targetObject && targetObject.AllowTextEdit()) {
          const svgElement = this.svgObjectLayer.GetElementByID(targetId);
          this.ActivateTextEdit(svgElement);

          activeEdit = this.svgDoc.GetActiveEdit();
          const textLength = activeEdit.GetText().length;

          activeEdit.SetSelectedRange(textLength, textLength);
          this.RegisterLastTEOp(ConstantData.TELastOp.CHAR);
          activeEdit.HandleKeyDownEvent(event);

          console.log("O.Opt HandleKeyDown - Output: true (space activated text edit)");
          return true;
        }
      }
    }

    console.log("O.Opt HandleKeyDown - Output: false");
    return false;
  }

  /**
   * Handles keyboard key press events for text editing and character input.
   * This function processes key press events, manages text edit operations,
   * and activates text editing on selected objects when characters are typed.
   *
   * @param event - The keyboard event object
   * @param keyCode - The key code of the pressed key
   * @returns True if the event was handled and should be prevented from bubbling, false otherwise
   */
  HandleKeyPress(event, keyCode) {
    console.log("O.Opt HandleKeyPress - Input:", {
      eventType: event.type,
      keyCode: keyCode
    });

    let activeEdit = this.svgDoc.GetActiveEdit();

    if (activeEdit && activeEdit.IsActive()) {
      // Handle active text editor cases
      if (!this.bInNoteEdit) {
        const textEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);

        if (textEditSession.theActiveTextEditObjectID !== -1) {
          this.RegisterLastTEOp(ConstantData.TELastOp.CHAR);
        }
      }

      if (activeEdit.HandleKeyPressEvent(event)) {
        event.preventDefault();
        console.log("O.Opt HandleKeyPress - Output: true (activeEdit handled event)");
        return true;
      }
    } else {
      // Handle initiating text edit on a selected object
      const targetId = this.GetTargetSelect();

      if (targetId !== -1) {
        const targetObject = this.GetObjectPtr(targetId, false);

        if (targetObject && targetObject.AllowTextEdit()) {
          const svgElement = this.svgObjectLayer.GetElementByID(targetId);
          this.ActivateTextEdit(svgElement);

          activeEdit = this.svgDoc.GetActiveEdit();

          if (activeEdit) {
            const textLength = activeEdit.GetText().length;
            activeEdit.SetSelectedRange(0, textLength);
            this.RegisterLastTEOp(ConstantData.TELastOp.CHAR);
            activeEdit.HandleKeyPressEvent(event);

            console.log("O.Opt HandleKeyPress - Output: true (activated text edit)");
            return true;
          }
        }
      }
    }

    console.log("O.Opt HandleKeyPress - Output: false");
    return false;
  }

  /**
     * Generates a PNG or JPEG preview image from the current document
     * @param callback - Function to call with the resulting blob
     * @param maxWidth - Maximum width of the preview image (default: 2400)
     * @param maxHeight - Maximum height of the preview image (default: 2400)
     * @param options - Additional options for image generation (format, fillBackground, zList)
     * @returns void - Result is provided through the callback
     */
  GeneratePreviewPNG(callback, maxWidth, maxHeight, options) {
    console.log("O.Opt GeneratePreviewPNG - Input:", {
      maxWidth: maxWidth || "default",
      maxHeight: maxHeight || "default",
      options
    });

    // Set default dimensions if not provided
    maxWidth = maxWidth || 2400;
    maxHeight = maxHeight || 2400;

    // Determine export format from options or default to PNG
    const exportFormat = options && options.format || 2;//ConstantData2.ExportType.PNG;

    if (exportFormat == ConstantData2.ExportType.PNG || exportFormat == ConstantData2.ExportType.JPEG) {
      // Generate SVG and convert it to image
      this.GenerateEncapsulatedSVG((svgData, success) => {
        if (svgData && success) {
          // Extract SVG dimensions and calculate scale factor
          const svgSize = Style.ExtractSVGSize(svgData);
          const scaleFactor = Math.min(1, maxWidth / svgSize.width, maxHeight / svgSize.height);

          // Apply scale factor to dimensions
          svgSize.width = Math.round(svgSize.width * scaleFactor);
          svgSize.height = Math.round(svgSize.height * scaleFactor);

          // Create an image from the SVG data
          const image = new Image();
          image.onload = function () {
            // Create canvas with appropriate dimensions
            const canvas = document.createElement('canvas');
            canvas.width = svgSize.width;
            canvas.height = svgSize.height;

            const context = canvas.getContext('2d');

            // Fill background with white for JPEG or if explicitly requested
            if (exportFormat == ConstantData2.ExportType.JPEG || (options && options.fillBackground)) {
              context.fillStyle = '#fff';
              context.fillRect(0, 0, svgSize.width, svgSize.height);
            }

            // Draw the SVG image onto the canvas
            context.drawImage(image, 0, 0, svgSize.width, svgSize.height);

            // Determine the MIME type based on export format
            const mimeType = exportFormat == ConstantData2.ExportType.JPEG ? 'image/jpeg' : 'image/png';

            // Convert canvas to blob and provide it to the callback
            canvas.toBlob((blob) => {
              console.log("O.Opt GeneratePreviewPNG - Output:", {
                format: mimeType,
                blobSize: blob ? blob.size : 0
              });
              callback(blob);
            }, mimeType, 0.8);
          };

          // Set the image source to the SVG data
          image.src = 'data:image/svg+xml,' + encodeURIComponent(svgData);
        } else {
          console.log("O.Opt GeneratePreviewPNG - Output: null (invalid SVG data)");
          callback(null);
        }
      }, false, false, true, 0, options && options.zList || null);
    } else {
      console.log("O.Opt GeneratePreviewPNG - Output: null (unsupported format)");
      callback(null);
    }
  }

  /**
   * Generates an encapsulated SVG representation of the document
   * @param callback - Function to call with the resulting SVG and a success flag
   * @param includeLinks - Whether to include hyperlinks in the SVG
   * @param includeTooltips - Whether to include tooltips in the SVG
   * @param inlineImages - Whether to inline images as base64 data URIs
   * @param padding - Padding to add around the SVG content (default: 12)
   * @param objectList - Optional list of specific objects to include in the SVG
   * @returns The SVG string directly if no callback is provided
   */
  GenerateEncapsulatedSVG(callback, includeLinks, includeTooltips, inlineImages, padding, objectList) {
    console.log("O.Opt GenerateEncapsulatedSVG - Input:", {
      hasCallback: !!callback,
      includeLinks,
      includeTooltips,
      inlineImages,
      padding,
      hasObjectList: !!objectList
    });

    let svgOutput = null;
    const exportOptions = {
      externImagePrep: true
    };

    // Configure export options based on parameters
    if (includeLinks) {
      exportOptions.exportLinks = true;
    }

    if (includeTooltips) {
      exportOptions.exportTT = true;
    }

    if (inlineImages) {
      exportOptions.inlineExternalImages = true;
    }

    if (objectList) {
      exportOptions.zList = objectList;
    }

    // Use default padding of 12 if not specified or not a number
    if (padding === undefined || typeof padding !== 'number') {
      padding = 12;
    }

    // Generate the SVG
    svgOutput = this.ExportSVGXML(true, padding, false, !includeLinks, false, exportOptions);

    // If no callback, just return the SVG string
    if (!callback) {
      console.log("O.Opt GenerateEncapsulatedSVG - Output: SVG string returned directly");
      return svgOutput;
    }

    // If we have external images to process
    if (exportOptions.externImageList && exportOptions.externImageList.length) {
      // Function to replace image URLs in the SVG
      const replaceImageRef = (originalUrl, newUrl) => {
        svgOutput = svgOutput.replace(originalUrl, newUrl);
      };

      // Process an individual external image
      const processExternalImage = (imageUrl) => {
        let relativePath;
        const originalUrl = imageUrl;
        let isCmsResource = false;

        // Check if this is a CMS resource
        if (imageUrl.toLowerCase().indexOf(Constants.FilePath_CMSRoot.toLowerCase()) === 0) {
          relativePath = imageUrl.slice(Constants.FilePath_CMSRoot.length);
          isCmsResource = true;
        }

        let isBinaryImage = false;
        let imageType = FileParser.GetImageBlobType(ConstantData2.ImageDir.dir_svg);

        // Determine image type from extension
        if (imageUrl.toLowerCase().indexOf('.png') > 0) {
          imageType = FileParser.GetImageBlobType(ConstantData2.ImageDir.dir_png);
          isBinaryImage = true;
        } else if (imageUrl.toLowerCase().indexOf('.jpg') > 0) {
          imageType = FileParser.GetImageBlobType(ConstantData2.ImageDir.dir_jpg);
          isBinaryImage = true;
        }

        // Handle image data once loaded
        const onImageLoaded = (imageData) => {
          if (imageData) {
            // For inline images that aren't already binary, detect format from content
            if (exportOptions.inlineExternalImages && !isBinaryImage) {
              const imageBytes = new Uint8Array(imageData);
              let formatDetected = false;

              // Check for JPEG signature
              if (imageData.byteLength >= 3 &&
                imageBytes[0] === 255 &&
                imageBytes[1] === 216 &&
                imageBytes[2] === 255) {
                imageType = FileParser.GetImageBlobType(ConstantData2.ImageDir.dir_jpg);
                formatDetected = true;
              }

              // Check for PNG signature
              if (!formatDetected &&
                imageData.byteLength >= 8 &&
                imageBytes[0] === 137 &&
                imageBytes[1] === 80 &&
                imageBytes[2] === 78 &&
                imageBytes[3] === 71 &&
                imageBytes[4] === 13 &&
                imageBytes[5] === 10 &&
                imageBytes[6] === 26 &&
                imageBytes[7] === 10) {
                imageType = FileParser.GetImageBlobType(ConstantData2.ImageDir.dir_png);
                formatDetected = true;
              }

              // Default to SVG if no binary format detected
              if (!formatDetected) {
                imageType = FileParser.GetImageBlobType(ConstantData2.ImageDir.dir_svg);
              }
            }

            // Create data URI from image data
            const dataUri = 'data:' + imageType + ';base64,' + Utils2.ArrayBufferToBase64(imageData);

            // Replace the URL in the SVG
            if (!isCmsResource && inlineImages) {
              const encodedUrl = SDJS_StrReplaceAll('&', '&amp;', imageUrl);
              replaceImageRef(encodedUrl, dataUri);
            } else {
              replaceImageRef(originalUrl, dataUri);
            }
          }

          // Remove this image from the processing list
          removeProcessedImage(originalUrl);
        };

        // Load the image data
        if (isCmsResource) {
          SDUI.CMSContent.GetResourceByRelativePath(SDUI.AppSettings.ContentSource, relativePath, onImageLoaded);
        } else {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', imageUrl, true);
          xhr.responseType = 'arraybuffer';

          xhr.onload = function () {
            if (xhr.status === 200) {
              onImageLoaded(this.response);
            } else {
              onImageLoaded(null);
            }
          };

          xhr.onerror = function () {
            onImageLoaded(null);
          };

          xhr.send();
        }
      };

      // Remove an image from the processing list
      const removeProcessedImage = (imageUrl) => {
        for (let i = 0; i < exportOptions.externImageList.length; i++) {
          if (exportOptions.externImageList[i].url === imageUrl) {
            exportOptions.externImageList.splice(i, 1);
            break;
          }
        }
      };

      // Start processing all external images
      for (let i = 0; i < exportOptions.externImageList.length; i++) {
        processExternalImage(exportOptions.externImageList[i].url);
      }

      // Poll until all images are processed or timeout is reached
      let attemptCount = 0;
      const checkCompletion = () => {
        if (exportOptions.externImageList.length) {
          if (attemptCount < 100) {
            setTimeout(checkCompletion, 100);
          } else {
            // Timeout reached, return what we have
            callback(svgOutput, false);
          }
          attemptCount++;
        } else {
          // All images processed successfully
          callback(svgOutput, true);
        }
      };

      setTimeout(checkCompletion, 100);
      console.log("O.Opt GenerateEncapsulatedSVG - Output: Processing external images asynchronously");
      return svgOutput;
    }

    // No external images to process
    callback(svgOutput, true);
    console.log("O.Opt GenerateEncapsulatedSVG - Output: SVG generated and passed to callback");
  }

  /**
     * Collects blob images from objects and stores them in a blob map.
     * This function recursively processes group symbols and extracts blob image data
     * from both direct object images and table cell images.
     *
     * @param objectIds - Array of object IDs to collect blob images from
     * @param blobMap - Map to store blob data by URL
     */
  GetBlobImages(objectIds, blobMap) {
    console.log("O.Opt GetBlobImages - Input:", {
      objectIdsCount: objectIds.length,
      blobMapSize: Object.keys(blobMap).length
    });

    let imageUrl;
    let tableData;
    let tableCell;
    let objectIndex;
    let cellIndex;
    let currentObject = null;
    let blobBytes = null;
    let objectCount = objectIds.length;

    for (objectIndex = 0; objectIndex < objectCount; ++objectIndex) {
      currentObject = this.GetObjectPtr(objectIds[objectIndex], false);

      if (currentObject.ShapeType == ConstantData.ShapeType.GROUPSYMBOL) {
        // For group symbols, recursively process their contained shapes
        if (currentObject.ShapesInGroup && currentObject.ShapesInGroup.length) {
          this.GetBlobImages(currentObject.ShapesInGroup, blobMap);
        }
      } else {
        // Process tables with images in cells
        tableData = currentObject.GetTable(false);
        if (tableData) {
          for (cellIndex = 0; cellIndex < tableData.cells.length; cellIndex++) {
            tableCell = tableData.cells[cellIndex];
            imageUrl = tableCell.ImageURL;

            if (imageUrl) {
              blobBytes = this.Table_CellGetBlobBytes(tableCell);
              if (blobBytes && !blobMap[imageUrl]) {
                blobMap[imageUrl] = blobBytes;
              }
            }
          }
        }

        // Process object's direct image or symbol URL
        imageUrl = '';
        if (currentObject.ImageURL) {
          imageUrl = currentObject.ImageURL;
        } else if (currentObject.SymbolURL) {
          imageUrl = currentObject.SymbolURL;
        }

        if (imageUrl) {
          blobBytes = currentObject.GetBlobBytes();
          if (blobBytes && !blobMap[imageUrl]) {
            blobMap[imageUrl] = blobBytes;
          }
        }
      }
    }

    console.log("O.Opt GetBlobImages - Output:", {
      processedObjects: objectCount,
      blobMapSize: Object.keys(blobMap).length
    });
  }

  /**
    * Calculates the bounding rectangle that encloses all visible objects in the document.
    * Title blocks can be optionally excluded.
    *
    * @param excludeTitleBlocks - Whether to exclude title blocks from the calculation
    * @param frameDetails - Optional object to store the frame details of the first visible object
    * @param objectList - Optional list of objects to calculate bounds for; if not provided, uses all visible objects
    * @returns The union rectangle of all visible objects, or undefined if no visible objects
    */
  GetSRect(excludeTitleBlocks, frameDetails, objectList) {
    console.log("O.Opt GetSRect - Input:", {
      excludeTitleBlocks,
      hasFrameDetails: !!frameDetails,
      objectList: objectList ? objectList.length : "undefined"
    });

    // Constants for better readability
    const FLAG_NOT_VISIBLE = ConstantData.ObjFlags.SEDO_NotVisible;
    const FLAG_TITLE_BLOCK = ConstantData.TextFlags.SED_TF_TitleBlock;

    // Use provided object list or get all visible objects
    const visibleObjects = objectList || GlobalData.optManager.VisibleZList();
    const objectCount = visibleObjects.length;

    let unionRect;
    let currentObject;
    let isTitleBlock;
    let objectRect;

    // Process each object
    for (let i = 0; i < objectCount; i++) {
      currentObject = GlobalData.optManager.GetObjectPtr(visibleObjects[i], false);

      if (currentObject != null) {
        isTitleBlock = false;

        // Check if object is a title block and we're excluding title blocks
        if (excludeTitleBlocks && (currentObject.TextFlags & FLAG_TITLE_BLOCK)) {
          isTitleBlock = true;
        }

        // Only include visible, non-title block objects
        if (currentObject && (currentObject.flags & FLAG_NOT_VISIBLE) === 0 && !isTitleBlock) {
          // Create a deep copy of the object's rectangle
          objectRect = $.extend(true, {}, currentObject.r);

          // Initialize union rectangle with first object
          if (unionRect === undefined) {
            unionRect = objectRect;

            // Store frame details of first object if requested
            if (frameDetails) {
              frameDetails.x = currentObject.Frame.x;
              frameDetails.y = currentObject.Frame.y;
              frameDetails.width = currentObject.Frame.width;
              frameDetails.height = currentObject.Frame.height;
            }
          } else {
            // Combine with union rectangle
            Utils2.UnionRect(objectRect, unionRect, unionRect);
          }
        }
      }
    }

    console.log("O.Opt GetSRect - Output:", unionRect);
    return unionRect;
  }

  /**
     * Removes all action arrows from visible objects in the document
     * This function iterates through all visible objects and removes any action arrows
     * associated with them, clearing timers as well.
     */
  RemoveAllActionArrows() {
    console.log("O.Opt RemoveAllActionArrows - Input: no parameters");

    const visibleObjects = this.VisibleZList();

    for (let i = 0; i < visibleObjects.length; i++) {
      this.RemoveActionArrows(visibleObjects[i], true);
    }

    console.log("O.Opt RemoveAllActionArrows - Output: Removed arrows from", visibleObjects.length, "objects");
  }

  /**
    * Gets the automation context based on the provided business manager
    * This function determines the appropriate automation context, considering
    * special flags that might modify the behavior (like disabling control arrows).
    *
    * @param businessManager - The business manager to get context from
    * @returns The appropriate automation context string
    */
  GetAutomationContext(businessManager) {
    console.log("O.Opt GetAutomationContext - Input:", businessManager);

    const sessionObject = GlobalData.optManager.GetObjectPtr(this.theSEDSessionBlockID, false);
    let automationContext = Resources.Contexts.Automation;

    if (businessManager) {
      automationContext = businessManager.GetAutomationContext();
    }

    // Check if the context is Automation and if control arrows should be disabled
    if (automationContext === Resources.Contexts.Automation) {
      if (sessionObject.moreflags & ConstantData.SessionMoreFlags.SEDSM_NoCtrlArrow) {
        automationContext = Resources.Contexts.AutomationNoCtrl;
      } else {
        automationContext = Resources.Contexts.Automation;
      }
    }

    console.log("O.Opt GetAutomationContext - Output:", automationContext);
    return automationContext;
  }

  /**
     * Duplicates the currently selected objects with an optional displacement
     * @param fromMove - If true, duplicates objects without displacement
     * @param editOverride - Optional secondary edit object for override parameters
     * @returns Array of duplicated object IDs
     */
  DuplicateObjects(fromMove, editOverride) {
    console.log("O.Opt DuplicateObjects - Input:", { fromMove, editOverride });

    const result = {
      selectedList: []
    };

    // Begin secondary edit and close any active edits
    // Collab.BeginSecondaryEdit();
    this.CloseEdit();

    // Only proceed if there are selected objects
    if (this.AreSelectedObjects()) {
      // Get session object with preservation based on whether this is a repeat operation
      const sessionObject = GlobalData.optManager.GetObjectPtr(
        GlobalData.optManager.theSEDSessionBlockID,
        !this.LastOpDuplicate && !editOverride
      );

      // Determine displacement for duplicated objects
      if (fromMove) {
        // No displacement when duplicating from move
        sessionObject.dupdisp.x = 0;
        sessionObject.dupdisp.y = 0;
      } else if (editOverride) {
        // Use displacement from override if provided
        sessionObject.dupdisp.x = editOverride.Data.dupdisp.x;
        sessionObject.dupdisp.y = editOverride.Data.dupdisp.y;
      } else if (!this.LastOpDuplicate) {
        // Default displacement for first duplication
        sessionObject.dupdisp.x = 50;
        sessionObject.dupdisp.y = 50;
      }

      // Get the current selection list
      const selectedList = GlobalData.optManager.GetObjectPtr(
        GlobalData.optManager.theSelectedListBlockID,
        false
      );

      // Prepare collaboration message if needed
      if (!editOverride /*&& Collab.AllowMessage()*/) {
        const messageData = {
          fromMove: fromMove,
          dupdisp: Utils1.DeepCopy(sessionObject.dupdisp),
          selectedList: Utils1.DeepCopy(selectedList),
          tselect: Utils1.DeepCopy(sessionObject.tselect)
        };
      }

      // Copy selected objects
      const copyResult = this.CopyObjectsCommon(true);

      if (copyResult && copyResult.buffer) {
        // Get the frame of the first copied object
        const firstObjectFrame = this.GetObjectPtr(copyResult.zList[0], false).Frame;

        // Read and create duplicated objects from the buffer with displacement
        SDF.ReadSymbolFromBuffer(
          copyResult.buffer,
          firstObjectFrame.x + sessionObject.dupdisp.x,
          firstObjectFrame.y + sessionObject.dupdisp.y,
          0,
          false,
          true,
          result,
          !fromMove,
          false,
          false,
          false,
          false
        );

        // Complete the operation if not from move
        if (!fromMove) {
          this.CompleteOperation(result.selectedList);

          // Mark as a duplicate operation for subsequent calls
          if (!editOverride) {
            this.LastOpDuplicate = true;
          }
        }
      }

      // // Send collaboration message if needed
      // if (!editOverride && Collab.AllowMessage()) {
      //   if (Collab.IsSecondary()) {
      //     messageData.CreateList = Utils1.DeepCopy(selectedList);
      //   }

      //   Collab.AddNewBlockToSecondary(selectedList);
      //   Collab.BuildMessage(
      //     ConstantData.CollabMessages.Duplicate,
      //     messageData,
      //     false
      //   );
      // }
    }

    console.log("O.Opt DuplicateObjects - Output:", result.selectedList);
    return result.selectedList;
  }

  /**
     * Restores the primary state manager if currently using a secondary state manager
     * This function handles necessary cleanup when switching back to the primary state manager,
     * ensuring any LM methods are restored and the SVG objects are re-rendered.
     */
  RestorePrimaryStateManager(): void {
    console.log("O.Opt RestorePrimaryStateManager - Input: no parameters");

    // Only take action if we're not already using the primary state manager
    if (!GlobalData.bIsPrimaryStateManager) {
      this.RestorePrimaryStateManagerLMMethods();
      SDJS_select_primary_state_manager();
      GlobalData.optManager.RenderAllSVGObjects();
    }

    console.log("O.Opt RestorePrimaryStateManager - Output: Primary state manager restored");
  }

  /**
     * Gets the current dirty state of the document
     * The dirty state indicates if the document has unsaved changes.
     * @returns True if the document has unsaved changes, false otherwise
     */
  GetDocDirtyState(): boolean {
    console.log("O.Opt GetDocDirtyState - Input: no parameters");

    const isDirty = GlobalData.optManager.theContentHeader.DocIsDirty;

    console.log("O.Opt GetDocDirtyState - Output:", isDirty);
    return isDirty;
  }

  /**
     * Sets the document's dirty state and updates related flags
     * This function marks whether the document has unsaved changes and
     * updates the AllowReplace flag which controls whether the document
     * can be replaced without warning.
     *
     * @param isDirty - Whether the document has unsaved changes
     * @param allowReplaceWhenClean - If true and isDirty is false, allows document replacement
     */
  SetDocDirtyState(isDirty: boolean, allowReplaceWhenClean?: boolean): void {
    console.log("O.Opt SetDocDirtyState - Input:", { isDirty, allowReplaceWhenClean });

    // Set the document dirty state
    GlobalData.optManager.theContentHeader.DocIsDirty = isDirty;

    // Update the AllowReplace flag based on dirty state
    if (isDirty) {
      GlobalData.optManager.theContentHeader.AllowReplace = false;
    } else if (allowReplaceWhenClean === true) {
      GlobalData.optManager.theContentHeader.AllowReplace = true;
    }

    console.log("O.Opt SetDocDirtyState - Output: Document dirty state set to", isDirty);
  }

  /**
   * Rebuilds URLs for objects in the current state manager, handling blob URLs for images and tables.
   * This function processes stored objects and ensures that blob URLs are properly created or deleted
   * based on the state operations (create or delete).
   *
   * @param stateId - The ID of the state to process
   * @param isNextState - If true, process the next state instead of current state
   * @returns void
   */
  RebuildURLs(stateId: number, isNextState: boolean): void {
    console.log("O.Opt RebuildURLs - Input:", { stateId, isNextState });

    let storedObjectCount: number;
    let objectIndex: number;
    let storedObject: any;
    let objectInstance: any;
    let objectData: any;
    let blobBytes: any;
    let imageType: string;
    let tableObject: any;
    let tableData: any;
    let storedData: any;

    // If processing the next state, handle CREATE operations
    if (isNextState) {
      storedObjectCount = GlobalData.stateManager.States[stateId + 1].StoredObjects.length;

      for (objectIndex = 0; objectIndex < storedObjectCount; objectIndex++) {
        storedObject = GlobalData.stateManager.States[stateId + 1].StoredObjects[objectIndex];

        // Handle drawing objects with CREATE operations
        if (storedObject.Type === ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT) {
          if (storedObject.StateOperationTypeID === Globals.StateOperationType.CREATE) {
            objectData = storedObject.Data;

            if (this.IsBlobURL(objectData.ImageURL)) {
              objectInstance = GlobalData.objectStore.GetObject(storedObject.ID);

              if (objectInstance) {
                objectData = objectInstance.Data;
                blobBytes = objectData.GetBlobBytes();
                imageType = FileParser.GetImageBlobType(blobBytes.ImageDir);
                objectData.ImageURL = GlobalData.optManager.MakeURL(null, blobBytes.Bytes, imageType);
              }
            }
          }
        }
        // Handle table objects with CREATE operations
        else if (storedObject.Type === ConstantData.StoredObjectType.TABLE_OBJECT &&
          storedObject.StateOperationTypeID === Globals.StateOperationType.CREATE) {
          tableObject = GlobalData.objectStore.GetObject(storedObject.ID);

          if (tableObject) {
            tableData = tableObject.Data;
            this.Table_RebuildURLs(tableData);
          }
        }
      }
    }

    // Process current state objects
    storedObjectCount = GlobalData.stateManager.States[stateId].StoredObjects.length;

    for (objectIndex = 0; objectIndex < storedObjectCount; objectIndex++) {
      storedObject = GlobalData.stateManager.States[stateId].StoredObjects[objectIndex];

      // Handle drawing objects
      if (storedObject.Type === ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT) {
        // Handle DELETE operations
        if (storedObject.StateOperationTypeID === Globals.StateOperationType.DELETE) {
          if (!isNextState) {
            objectInstance = GlobalData.objectStore.GetObject(storedObject.ID);

            if (objectInstance) {
              objectData = objectInstance.Data;

              if (objectData.BlobBytesID >= 0 && this.IsBlobURL(objectData.ImageURL)) {
                blobBytes = objectData.GetBlobBytes();
                imageType = FileParser.GetImageBlobType(blobBytes.ImageDir);
                objectData.ImageURL = GlobalData.optManager.MakeURL(null, blobBytes.Bytes, imageType);
              }
            }
          }
        }
        // Handle other operations
        else {
          storedData = storedObject.Data;
          objectInstance = GlobalData.objectStore.GetObject(storedObject.ID);

          if (this.IsBlobURL(storedData.ImageURL)) {
            if (objectInstance) {
              objectData = objectInstance.Data;

              if (storedData.ImageURL !== objectData.ImageURL) {
                this.DeleteURL(storedData.ImageURL);

                if (this.IsBlobURL(objectData.ImageURL)) {
                  blobBytes = objectData.GetBlobBytes();

                  if (blobBytes) {
                    imageType = FileParser.GetImageBlobType(blobBytes.ImageDir);

                    if (this.IsBlobURL(objectData.ImageURL)) {
                      objectData.ImageURL = GlobalData.optManager.MakeURL(null, blobBytes.Bytes, imageType);
                    }
                  }
                }
              }
            } else {
              this.DeleteURL(storedData.ImageURL);
            }
          } else if (objectInstance) {
            objectData = objectInstance.Data;

            if (this.IsBlobURL(objectData.ImageURL)) {
              blobBytes = objectData.GetBlobBytes();

              if (blobBytes) {
                imageType = FileParser.GetImageBlobType(blobBytes.ImageDir);

                if (this.IsBlobURL(objectData.ImageURL)) {
                  objectData.ImageURL = GlobalData.optManager.MakeURL(null, blobBytes.Bytes, imageType);
                }
              }
            }
          }
        }
      }
      // Handle table objects
      else if (storedObject.Type === ConstantData.StoredObjectType.TABLE_OBJECT) {
        if (storedObject.StateOperationTypeID === Globals.StateOperationType.DELETE) {
          if (!isNextState) {
            tableObject = GlobalData.objectStore.GetObject(storedObject.ID);

            if (tableObject) {
              tableData = tableObject.Data;
              GlobalData.optManager.Table_RebuildURLs(tableData);
            }
          }
        } else {
          storedData = storedObject.Data;
          tableObject = GlobalData.objectStore.GetObject(storedObject.ID);

          if (tableObject) {
            tableData = tableObject.Data;
            this.Table_RefreshURLs(storedData, tableData, false);
          } else {
            this.Table_DeleteURLs(storedData);
          }
        }
      }
    }

    console.log("O.Opt RebuildURLs - Output: URLs rebuilt for state:", stateId);
  }

  /**
     * Cleans up resources when an exception occurs during export operations
     * @param error - The exception that was thrown
     * @throws Rethrows the passed exception after cleanup
     */
  Export_ExceptionCleanup(error) {
    console.log("O.Opt Export_ExceptionCleanup - Input:", error);

    // Simply rethrow the error after performing any necessary cleanup
    // Additional cleanup logic would be added here if needed

    console.log("O.Opt Export_ExceptionCleanup - Output: Rethrowing exception");
    throw error;
  }

  /**
   * Updates the selection attributes for a table
   * @param tableId - The ID of the table
   * @param skipUpdate - Whether to skip updating the selection state
   */
  Table_UpdateSelectionAttributes(tableId, skipUpdate) {
    console.log("O.Opt: Table_UpdateSelectionAttributes input:", {
      tableId,
      skipUpdate
    });

    // Local variables with better names
    let cell;
    let cellIndex;
    let cellCount;
    let selectedCellIndex;
    let otherCell;
    let selectedCell;
    let isUiHidden = false;

    // Constants for better readability
    const tableObject = this.GetObjectPtr(tableId, false);
    const selectFlag = ConstantData.Table_CellFlags.SDT_F_Select;
    const noTextFlag = ConstantData.Table_CellFlags.SDT_F_NoText;
    const textFace = ConstantData.TextFace;
    const cellTypes = ConstantData.Table.CellTypes;

    // Get the table data
    let tableData = null;
    if (tableObject) {
      tableData = tableObject.GetTable(false);
    }

    // Validate selection index
    if (tableData &&
      tableData.select >= 0 &&
      tableData.select >= tableData.cells.length) {
      tableData.select = -1;
    }

    // Process selection if a cell is selected
    if (tableData && tableData.select >= 0) {
      // Get the selected cell
      cell = tableData.cells[tableData.select];
      selectedCellIndex = tableData.select;
      selectedCell = cell;

      // Update selection state
      this.SelectionState.lockedTableSelected = (tableData.flags & ListManager.Table.TableFlags.SDT_TF_LOCK) > 0;

      // Check if this is a special table in non-Builder application
      if (SDUI.AppSettings.Application !== Resources.Application.Builder &&
        tableObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER) {
        this.SelectionState.lockedTableSelected = true;
      }

      // Set initial selection state
      this.SelectionState.ncells_selected = 1;
      this.SelectionState.cell_notext = (cell.flags & noTextFlag) > 0;
      this.SelectionState.celltype = cell.celltype;
      this.SelectionState.cellflags = cell.flags;
      this.SelectionState.cellselected = true;

      // Handle dataset element ID based on subtype
      if (tableObject.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASK ||
        tableObject.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASKMAP) {
        this.SelectionState.datasetElemID = tableObject.datasetElemID;
      } else {
        this.SelectionState.datasetElemID = cell.datarecordID;
      }

      // Set paste state
      let clipboardType = this.GetClipboardType();
      if (clipboardType === ConstantData.ClipboardType.LM) {
        clipboardType = ConstantData.ClipboardType.None;
      }
      this.SelectionState.paste = clipboardType;

      // Check if UI should be hidden
      if (GlobalData.optManager.Table_HideUI(tableObject)) {
        this.SelectionState.IsTargetTable = false;
        this.SelectionState.ntablesselected = 0;
        this.SelectionState.NTableRows = GlobalDatagOptions.newTableRows;
        this.SelectionState.NTableCols = GlobalDatagOptions.newTableCols;
        this.SelectionState.ncells_selected = 0;
        isUiHidden = true;
      }

      // Handle special cell types
      switch (selectedCell.celltype) {
        case cellTypes.SDT_CT_MONTH_WITH_DAYS:
        case cellTypes.SDT_CT_WEEK_WITH_DAYS:
        case cellTypes.SDT_CT_QTR_WITH_MONTHS:
        case cellTypes.SDT_CT_YR_WITH_MONTHS:
        case cellTypes.SDT_CT_DAY_WITH_HOURS:
        case cellTypes.SDT_CT_MONTHLY_CALENDAR_NAME:
        case cellTypes.SDT_CT_YEARLY_CALENDAR_NAME:
        case cellTypes.SDT_CT_PREFIX_COUNT:
        case cellTypes.SDT_CT_SUBCOLHEADER:
        case cellTypes.SDT_CT_ROWREPEATER:
      }

      // Exit early if skipUpdate is true
      if (skipUpdate) {
        console.log("O.Opt: Table_UpdateSelectionAttributes - skipping update");
        return;
      }

      // Update text formatting attributes
      this.SelectionState.fontid = cell.Text.FontId;
      this.SelectionState.fontsize = cell.Text.FontSize;
      this.SelectionState.bold = (cell.Text.Face & textFace.Bold) > 0;
      this.SelectionState.italic = (cell.Text.Face & textFace.Italic) > 0;
      this.SelectionState.underline = (cell.Text.Face & textFace.Underline) > 0;
      this.SelectionState.superscript = (cell.Text.Face & textFace.Superscript) > 0;
      this.SelectionState.subscript = (cell.Text.Face & textFace.Subscript) > 0;
      this.SelectionState.cell_notext = (cell.flags & noTextFlag) > 0;
      this.SelectionState.celltype = cell.celltype;
      this.SelectionState.cellselected = true;
      this.SelectionState.cellflags = cell.flags;

      // Check if cell has text data
      if (cell.DataID >= 0) {
        this.SelectionState.selectionhastext = true;
        this.SelectionState.allowcopy = true;
      }

      // Process all other selected cells
      cellCount = tableData.cells.length;
      for (let i = 0; i < cellCount; i++) {
        if (i !== selectedCellIndex) {
          otherCell = tableData.cells[i];

          // Check if cell has text data
          if (otherCell.DataID >= 0) {
            this.SelectionState.selectionhastext = true;
            this.SelectionState.allowcopy = true;
          }

          // Check if the cell is selected
          if (otherCell.flags & selectFlag) {
            // Compare formatting with currently stored values
            if (this.SelectionState.fontid !== otherCell.Text.FontId) {
              this.SelectionState.fontid = -1;
            }

            if (this.SelectionState.fontsize !== otherCell.Text.FontSize) {
              this.SelectionState.fontsize = -1;
            }

            if (this.SelectionState.bold !== ((otherCell.Text.Face & textFace.Bold) > 0)) {
              this.SelectionState.bold = false;
            }

            if (this.SelectionState.italic !== ((otherCell.Text.Face & textFace.Italic) > 0)) {
              this.SelectionState.italic = false;
            }

            if (this.SelectionState.underline !== ((otherCell.Text.Face & textFace.Underline) > 0)) {
              this.SelectionState.underline = false;
            }

            if (this.SelectionState.superscript !== ((otherCell.Text.Face & textFace.Superscript) > 0)) {
              this.SelectionState.superscript = false;
            }

            if (this.SelectionState.subscript !== ((otherCell.Text.Face & textFace.Subscript) > 0)) {
              this.SelectionState.subscript = false;
            }

            if (this.SelectionState.cell_notext !== ((otherCell.flags & noTextFlag) > 0)) {
              this.SelectionState.cell_notext = false;
            }

            if (this.SelectionState.celltype !== otherCell.celltype) {
              this.SelectionState.celltype = 0;
            }

            if (this.SelectionState.cellflags !== otherCell.cellflags) {
              this.SelectionState.cellflags = 0;
            }

            // Increment selected cell count if UI isn't hidden
            if (!isUiHidden) {
              this.SelectionState.ncells_selected++;
            }
          }
        }
      }
    }

    console.log("O.Opt: Table_UpdateSelectionAttributes output:", {
      cellsSelected: this.SelectionState.ncells_selected,
      hasText: this.SelectionState.selectionhastext,
      cellType: this.SelectionState.celltype
    });
  }


  /**
   * Resets the active text edit after an undo operation
   * @param runtimeTextOverride - Optional runtime text to use instead of the object's current text
   */
  ResetActiveTextEditAfterUndo(runtimeTextOverride) {
    console.log("O.Opt: ResetActiveTextEditAfterUndo called with text override:",
      runtimeTextOverride ? "provided" : "none");

    const textEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);

    if (textEditSession.theActiveTextEditObjectID !== -1) {
      const activeTextObject = this.GetObjectPtr(textEditSession.theActiveTextEditObjectID, false);

      if (!activeTextObject) {
        console.log("O.Opt: ActiveTextObject not found, aborting");
        return;
      }

      const dataId = activeTextObject.DataID;

      if (dataId !== -1) {
        const textDataObject = this.GetObjectPtr(dataId, false);

        if (textDataObject) {
          let runtimeText = textDataObject.runtimeText;
          const selectionRange = textDataObject.selrange;

          // Use the provided runtime text if available
          if (runtimeTextOverride) {
            runtimeText = runtimeTextOverride;
          }

          // Refresh the rendering if no override was provided
          if (!runtimeTextOverride) {
            this.AddToDirtyList(textEditSession.theActiveTextEditObjectID);
            this.RenderDirtySVGObjects();
          }

          // Get and prepare the SVG element
          const svgElement = this.svgObjectLayer.GetElementByID(textEditSession.theActiveTextEditObjectID);

          if (svgElement && svgElement.textElem) {
            this.TERegisterEvents(svgElement.textElem);

            const activeEdit = this.svgDoc.GetActiveEdit();
            if (activeEdit) {
              activeEdit.SetRuntimeText(runtimeText);
              activeEdit.SetSelectedRange(
                selectionRange.start,
                selectionRange.end,
                selectionRange.line,
                selectionRange.anchor
              );
            }

            // Initialize empty text formatting if needed
            if (runtimeText.text === '') {
              console.log("O.Opt: Initializing empty text formatting");
              this.InitEmptyText(activeTextObject, svgElement);
            }
          }
        }
      }

      // Reset the text edit state
      textEditSession.TELastOp = ConstantData.TELastOp.INIT;
      this.ShowSVGSelectionState(textEditSession.theActiveTextEditObjectID, false);
    }

    console.log("O.Opt: ResetActiveTextEditAfterUndo complete");
  }

  /**
  * Handles text resizing for drawing objects
  * @param shapeId - ID of the shape to resize
  * @param constrainWidth - Whether to constrain width during resize
  * @param allowResize - Whether to allow resizing beyond minimum dimensions
  * @param svgElement - SVG element representing the shape
  * @param skipLinkFlagUpdate - Whether to skip updating link flags
  */
  TextResizeCommon(shapeId, constrainWidth, allowResize, svgElement, skipLinkFlagUpdate) {
    console.log("O.Opt: TextResizeCommon inputs:", {
      shapeId,
      constrainWidth,
      allowResize,
      svgElementType: svgElement?.constructor?.name || "unknown",
      skipLinkFlagUpdate
    });

    const textEditSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);
    const shape = this.GetObjectPtr(shapeId, false);

    // Handle BaseShape objects
    if (shape instanceof Instance.Shape.BaseShape) {
      // Get SVG element if not provided
      let element = svgElement || this.svgObjectLayer.GetElementByID(shapeId);

      if (element) {
        const textElement = element.textElem;

        if (textElement != null) {
          let shapeResized = false;
          let textTable = null;
          let tableSelectIndex = -1;
          let wasTableResize = false;

          // Get text parameters and dimensions
          let textParams = shape.GetTextParams(true);
          let textRect = textParams.trect;
          let minShapeWidth = shape.sizedim.width;
          let minShapeHeight = shape.sizedim.height;
          let textSizedWidth = textParams.tsizedim.width;
          let textSizedHeight = textParams.tsizedim.height;

          // Get minimum text dimensions
          let textMinDimensions = textElement.GetTextMinDimensions();
          let minTextWidth = textMinDimensions.width;

          if (minTextWidth < textSizedWidth) {
            minTextWidth = textSizedWidth;
          }

          let minTextHeight = textMinDimensions.height;
          if (minTextHeight < textSizedHeight) {
            minTextHeight = textSizedHeight;
          }

          // Create text rectangle with minimum dimensions
          let minTextRect = new Rectangle(
            textRect.x,
            textRect.y,
            minTextWidth,
            minTextHeight
          );

          // Handle text attachment positioning
          if (shape.TextFlags & ConstantData.TextFlags.SED_TF_AttachA ||
            shape.TextFlags & ConstantData.TextFlags.SED_TF_AttachB) {
            if (shape.TextFlags & ConstantData.TextFlags.SED_TF_AttachA) {
              switch (shape.TextAlign) {
                case ConstantData.TextAlign.TOPLEFT:
                case ConstantData.TextAlign.LEFT:
                case ConstantData.TextAlign.BOTTOMLEFT:
                  textElement.SetPos(0, -textMinDimensions.height - shape.TMargins.top);
                  break;
                case ConstantData.TextAlign.TOPRIGHT:
                case ConstantData.TextAlign.RIGHT:
                case ConstantData.TextAlign.BOTTOMRIGHT:
                  textElement.SetPos(
                    shape.Frame.width - textMinDimensions.width,
                    -textMinDimensions.height - shape.TMargins.top
                  );
                  break;
                default:
                  textElement.SetPos(
                    shape.Frame.width / 2 - textMinDimensions.width / 2,
                    -textMinDimensions.height - shape.TMargins.top
                  );
              }
              GlobalData.optManager.SetShapeR(shape);
            } else if (shape.TextFlags & ConstantData.TextFlags.SED_TF_AttachB) {
              switch (shape.TextAlign) {
                case ConstantData.TextAlign.TOPLEFT:
                case ConstantData.TextAlign.LEFT:
                case ConstantData.TextAlign.BOTTOMLEFT:
                  textElement.SetPos(0, shape.Frame.height);
                  break;
                case ConstantData.TextAlign.TOPRIGHT:
                case ConstantData.TextAlign.RIGHT:
                case ConstantData.TextAlign.BOTTOMRIGHT:
                  textElement.SetPos(
                    shape.Frame.width - textMinDimensions.width,
                    shape.Frame.height
                  );
                  break;
                default:
                  textElement.SetPos(
                    shape.Frame.width / 2 - textMinDimensions.width / 2,
                    shape.Frame.height
                  );
              }
              GlobalData.optManager.SetShapeR(shape);
            }
          } else {
            // Variables for positioning and sizing
            let centerX, centerY, growResult, targetShape;
            let originalFrame = $.extend(true, {}, shape.Frame);
            let newFrame = null;

            // Check if shape is in a group
            const table = shape.GetTable(false);
            const graph = shape.GetGraph(false);
            const isInGroup = shape.bInGroup === true;

            if (isInGroup) {
              allowResize = true;
            }

            // Process based on the text growth behavior
            switch (shape.TextGrow) {
              case ConstantData.TextGrowBehavior.HORIZONTAL:
                if (!Utils2.IsEqual(minTextWidth, textRect.width) ||
                  !Utils2.IsEqual(minTextHeight, textRect.height)) {

                  newFrame = $.extend(true, {}, shape.Frame);

                  // Handle table text growth
                  if (table && table.select >= 0) {
                    const updatedTable = shape.GetTable(false);
                    growResult = this.Table_TextGrow(
                      shape,
                      updatedTable,
                      updatedTable.select,
                      shape.TextGrow,
                      textMinDimensions,
                      null
                    );

                    textRect.width = growResult.x;
                    textRect.height = growResult.y;
                    shape.TRectToFrame(textRect, false);

                    let widthChange = shape.Frame.width - newFrame.width;
                    if (Utils2.IsEqual(widthChange, 0)) widthChange = 0;

                    let heightChange = shape.Frame.height - newFrame.height;
                    if (Utils2.IsEqual(heightChange, 0)) heightChange = 0;

                    wasTableResize = true;
                  } else {
                    // Standard text growth
                    shape.TRectToFrame(minTextRect, false);

                    let widthChange = shape.Frame.width - newFrame.width;
                    if (Utils2.IsEqual(widthChange, 0)) widthChange = 0;

                    let heightChange = shape.Frame.height - newFrame.height;
                    if (Utils2.IsEqual(heightChange, 0)) heightChange = 0;

                    wasTableResize = false;
                  }

                  // Adjust position based on text alignment
                  if (widthChange) {
                    switch (shape.TextAlign) {
                      case ConstantData.TextAlign.TOPLEFT:
                      case ConstantData.TextAlign.LEFT:
                      case ConstantData.TextAlign.BOTTOMLEFT:
                        newFrame.width += widthChange;
                        break;
                      case ConstantData.TextAlign.TOPCENTER:
                      case ConstantData.TextAlign.CENTER:
                      case ConstantData.TextAlign.BOTTOMCENTER:
                        centerX = newFrame.x + newFrame.width / 2;
                        newFrame.width += widthChange;
                        centerX -= newFrame.width / 2;
                        if (isInGroup && shape.RotationAngle === 0) {
                          // No position adjustment
                        } else {
                          newFrame.x = centerX;
                        }
                        break;
                      case ConstantData.TextAlign.TOPRIGHT:
                      case ConstantData.TextAlign.RIGHT:
                      case ConstantData.TextAlign.BOTTOMRIGHT:
                        newFrame.width += widthChange;
                        if (isInGroup && shape.RotationAngle === 0) {
                          // No position adjustment
                        } else {
                          newFrame.x -= widthChange;
                        }
                    }
                  }

                  // Apply height change if any
                  if (heightChange) {
                    newFrame.height += heightChange;
                  }

                  // Ensure minimum dimensions
                  if (allowResize || this.TextPinFrame(newFrame, textSizedHeight)) {
                    // Apply minimum dimensions for non-table shapes
                    if (wasTableResize === false) {
                      if (newFrame.width < minShapeWidth) {
                        newFrame.x = shape.Frame.x + shape.Frame.width / 2 - minShapeWidth / 2;
                        newFrame.width = minShapeWidth;
                      }
                      if (newFrame.height < minShapeHeight) {
                        newFrame.y = shape.Frame.y + shape.Frame.height / 2 - minShapeHeight / 2;
                        newFrame.height = minShapeHeight;
                      }
                    }

                    // Apply frame changes
                    if (widthChange || heightChange) {
                      shape.UpdateFrame(newFrame);
                      textEditSession.theTEWasResized = true;
                    }

                    // Update text position
                    if (textElement) {
                      textParams = shape.GetTextParams(false);
                      textRect = textParams.trect;
                      let svgFrame = shape.GetSVGFrame(newFrame);
                      textElement.SetPos(textRect.x - svgFrame.x, textRect.y - svgFrame.y);
                      textElement.SetConstraints(
                        GlobalData.optManager.theContentHeader.MaxWorkDim.x,
                        textRect.width,
                        textRect.height
                      );
                    }

                    // Perform additional resize operations
                    shape.ResizeInTextEdit(element, newFrame);
                    this.TextResizeNeedPageResize(shape, newFrame.x + newFrame.width, newFrame.y + newFrame.height);

                    // Handle rotation for grouped objects
                    if (isInGroup && shape.RotationAngle !== 0) {
                      let rotationCenter = {
                        x: originalFrame.x + originalFrame.width / 2,
                        y: originalFrame.y + originalFrame.height / 2
                      };

                      let originalRotatedRect = GlobalData.optManager.RotateRect(
                        originalFrame,
                        rotationCenter,
                        shape.RotationAngle
                      );

                      rotationCenter = {
                        x: newFrame.x + newFrame.width / 2,
                        y: newFrame.y + newFrame.height / 2
                      };

                      let newRotatedRect = GlobalData.optManager.RotateRect(
                        newFrame,
                        rotationCenter,
                        shape.RotationAngle
                      );

                      widthChange = originalRotatedRect.x - newRotatedRect.x;
                      heightChange = originalRotatedRect.y - newRotatedRect.y;
                      shape.OffsetShape(widthChange, heightChange);
                    }

                    // Update link flags
                    if (!skipLinkFlagUpdate) {
                      this.Resize_SetLinkFlag(shapeId, ConstantData.LinkFlags.SED_L_MOVE);
                    }
                  }
                }
                break;

              case ConstantData.TextGrowBehavior.VERTICAL:
              // Similar structure to HORIZONTAL case but with vertical growth logic
              // ...

              case ConstantData.TextGrowBehavior.PROPORTIONAL:
              // Proportional resize logic
              // ...
            }
          }
        }
      }
    } else {
      // Handle non-BaseShape objects
      shape.AdjustTextEditBackground(shapeId, svgElement);
    }

    console.log("O.Opt: TextResizeCommon completed for shape:", shapeId);
  }

  /**
   * Maintains the relative distance of a point within a line segment when transforming between lines
   * @param targetLine - The line to which the point should be mapped
   * @param sourceLine - The original line containing the point
   * @param segmentIndex - Index of the segment in the polyline
   * @param point - The point to be maintained in relative position
   * @returns The adjusted point position
   */
  Lines_MaintainDistWithinSegment(targetLine, sourceLine, segmentIndex, point) {
    console.log("O.Opt: Lines_MaintainDistWithinSegment inputs:", {
      targetLine: targetLine.BlockID || "unknown",
      sourceLine: sourceLine.BlockID || "unknown",
      segmentIndex,
      point: { x: point.x, y: point.y }
    });

    // Get bounding rectangle for calculations
    var boundingRect = {};

    // Get points of the source line
    var sourcePoints = sourceLine.GetPolyPoints(ConstantData.Defines.NPOLYPTS, false, true, false, null);
    Utils2.GetPolyRect(boundingRect, sourcePoints);

    // Calculate angle of the segment in the source line
    var sourceAngle = Utils1.CalcAngleFromPoints(sourcePoints[segmentIndex - 1], sourcePoints[segmentIndex]);
    var sourceAngleComplement = 360 - sourceAngle;
    var sourceAngleRadians = 2 * Math.PI * (sourceAngleComplement / 360);

    // Rotate source points to align with horizontal
    Utils3.RotatePointsAboutCenter(boundingRect, -sourceAngleRadians, sourcePoints);

    // Rotate the target point by the same angle
    var rotatedPoints = [point];
    Utils3.RotatePointsAboutCenter(boundingRect, -sourceAngleRadians, rotatedPoints);

    // Calculate the relative position of the point within the segment
    var segmentLength = sourcePoints[segmentIndex].x - sourcePoints[segmentIndex - 1].x;
    var relativePosition = (point.x - sourcePoints[segmentIndex - 1].x) / segmentLength;
    var verticalOffset = point.y - sourcePoints[segmentIndex - 1].y;

    // Rotate back
    Utils3.RotatePointsAboutCenter(boundingRect, sourceAngleRadians, rotatedPoints);

    // Get points of the target line
    var targetPoints = targetLine.GetPolyPoints(ConstantData.Defines.NPOLYPTS, false, true, false, null);

    // Calculate angle of the segment in the target line
    var targetAngle = Utils1.CalcAngleFromPoints(targetPoints[segmentIndex - 1], targetPoints[segmentIndex]);
    var targetAngleComplement = 360 - targetAngle;
    var targetAngleRadians = 2 * Math.PI * (targetAngleComplement / 360);

    // Get bounding rectangle for the target line
    Utils2.GetPolyRect(boundingRect, targetPoints);

    // Rotate target points to align with horizontal
    Utils3.RotatePointsAboutCenter(boundingRect, -targetAngleRadians, targetPoints);
    Utils3.RotatePointsAboutCenter(boundingRect, -targetAngleRadians, rotatedPoints);

    // Apply the relative position to the target segment
    var targetSegmentLength = targetPoints[segmentIndex].x - targetPoints[segmentIndex - 1].x;
    var adjustedDistance = targetSegmentLength * relativePosition;

    rotatedPoints[0].x = targetPoints[segmentIndex - 1].x + adjustedDistance;
    rotatedPoints[0].y = targetPoints[segmentIndex - 1].y + verticalOffset;

    // Rotate back to the target line's orientation
    Utils3.RotatePointsAboutCenter(targetLine.Frame, targetAngleRadians, rotatedPoints);

    // Update the point
    point = rotatedPoints[0];

    console.log("O.Opt: Lines_MaintainDistWithinSegment output:", {
      point: { x: point.x, y: point.y }
    });

    return point;
  }

  /**
   * Converts an arc to a sequence of polyline points
   * @param segments - Number of segments to divide the arc into
   * @param center - Center point of the arc
   * @param radius - Radius of the arc
   * @param startY - Starting Y coordinate
   * @param endY - Ending Y coordinate
   * @param targetX - Target X coordinate
   * @param flipArc - Whether to flip the arc
   * @param isComplexArc - Whether this is a complex arc that requires multiple segments
   * @returns Array of points representing the arc
   */
  ArcToPoly(segments, center, radius, startY, endY, targetX, flipArc, isComplexArc) {
    console.log("O.Opt: ArcToPoly inputs:", {
      segments,
      center: { x: center.x, y: center.y },
      radius,
      startY,
      endY,
      targetX,
      flipArc,
      isComplexArc
    });

    let isRightSide,
      midY1,
      midY2,
      points = [];

    // The following expression has no effect, but keeping it for compatibility
    endY - startY;

    if (isComplexArc) {
      // For complex arcs, divide into three segments
      if (startY > endY) {
        midY2 = center.y - radius;
        midY1 = center.y + radius;
      } else {
        midY1 = center.y - radius;
        midY2 = center.y + radius;
      }

      isRightSide = targetX < center.x;
      flipArc = false;

      // Generate three segments of the complex arc
      this.ArcToPolySeg(points, segments / 2, center, radius, startY, midY1, targetX, flipArc, !isRightSide);
      this.ArcToPolySeg(points, segments, center, radius, midY1, midY2, center.x, flipArc, isRightSide);
      this.ArcToPolySeg(points, segments / 2, center, radius, midY2, endY, targetX, flipArc, !isRightSide);
    } else {
      // For simple arcs, generate a single segment
      isRightSide = targetX >= center.x;
      this.ArcToPolySeg(points, segments, center, radius, startY, endY, targetX, flipArc, isRightSide);
    }

    console.log("O.Opt: ArcToPoly output points:", points.length);
    return points;
  }

  /**
   * Generates points along an arc segment and adds them to an array
   * @param points - Array to store the generated points
   * @param segments - Number of segments to divide the arc into
   * @param center - Center point of the arc
   * @param radius - Radius of the arc
   * @param startY - Starting Y coordinate
   * @param endY - Ending Y coordinate
   * @param targetX - Target X coordinate
   * @param flipArc - Whether to flip the arc
   * @param isRightSide - Whether the arc is on the right side
   * @returns Array of points representing the arc segment
   */
  ArcToPolySeg(points, segments, center, radius, startY, endY, targetX, flipArc, isRightSide) {
    console.log("O.Opt: ArcToPolySeg inputs:", {
      segments,
      center: { x: center.x, y: center.y },
      radius,
      startY,
      endY,
      targetX,
      flipArc,
      isRightSide
    });

    const radiusSquared = radius * radius;
    const yStep = (endY - startY) / segments;

    for (let i = 0; i < segments; i++) {
      const yOffset = yStep * i;
      const yDist = center.y - (startY + yOffset);
      const xDist = Utils2.sqrt(radiusSquared - yDist * yDist);

      const point = new Point(0, 0);
      point.y = center.y - yDist;

      if (isRightSide) {
        point.x = center.x + xDist;
        const diff = point.x - targetX;
        if (flipArc) {
          point.x = targetX - diff;
        }
      } else {
        point.x = center.x - xDist;
        const diff = targetX - point.x;
        if (flipArc) {
          point.x = targetX + diff;
        }
      }

      points.push(point);
    }

    console.log("O.Opt: ArcToPolySeg output points count:", points.length);
    return points;
  }

  ExportSVGXML(e, t, a, r, i, n) {
    var o = window.navigator.msPointerEnabled,
      s = !1;
    n &&
      n.inlineExternalImages &&
      (s = n.inlineExternalImages);
    var l = n &&
      n.zList ||
      this.ZList();
    n &&
      n.zList &&
      function (e) {
        const t = GlobalData.optManager.ZList().filter((t => !e.includes(t)));
        for (let e = 0, a = t.length; e < a; e++) {
          const a = GlobalData.optManager.svgObjectLayer.GetElementByID(t[e]);
          a &&
            a.svgObj &&
            a.svgObj.node &&
            a.svgObj.node.setAttribute('no-export-force', '1')
        }
      }(n.zList);
    l.length;
    var S,
      c,
      u = {};
    this.GetBlobImages(l, u);
    var p,
      d = this.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    if (
      n &&
        n.renderBounds ? p = n.renderBounds : e &&
          l.length ? (
        t = t ||
        0,
        (
          p = GlobalData.optManager.GetSRect(!1, !1, n && n.zList ? n.zList : null) ||
          {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          }
        ).x -= t,
        p.y -= t,
        p.width += 2 * t,
        p.height += 2 * t
      ) : p = {
        x: 0,
        y: 0,
        width: d.dim.x,
        height: d.dim.y
      },
      p.x = Utils1.RoundCoord(p.x),
      p.y = Utils1.RoundCoord(p.y),
      p.width = Utils1.RoundCoord(p.width),
      p.height = Utils1.RoundCoord(p.height),
      GlobalData.optManager.RemoveAllActionArrows(),
      - 1 !== this.curHiliteShape
    ) {
      var D = this.GetObjectPtr(this.curHiliteShape, !1);
      D &&
        (D.SetRuntimeEffects(!1), D.ClearCursors())
    }
    var g = document.getElementById('svg-area'),
      h = Utils3.CloneToDoc($('svg', g)[0], o),
      m = 'http://www.w3.org/2000/svg';
    o ||
      h.setAttribute('xmlns', m),
      h.setAttribute('version', '1.1'),
      h.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    var C,
      y,
      f,
      L = [],
      I = [],
      T = h.childNodes[0],
      b = T.childNodes.length,
      M = {};
    for (S = 0; S < b; S++) 0 === (C = (f = T.childNodes[S]).getAttribute('id')).indexOf('FX_NONE') ? L.push(f) : 0 === C.indexOf('FX_') &&
      (
        y = SDUI.Utils.MakeGuid(),
        f.setAttribute('id', y),
        y = 'url(#' + y + ')',
        M[C = 'url(#' + C + ')'] = {
          used: !1,
          node: f,
          id: y
        }
      );
    var P,
      R,
      A,
      _ = h.getElementsByTagNameNS(m, 'pattern'),
      E = _.length,
      w = {};
    for (S = 0; S < E; ++S) C = (R = _[S]).getAttribute('id'),
      y = Utils1.MakeGuid(),
      A = R.hasAttribute('_isImage_'),
      R.setAttribute('id', y),
      y = 'url(#' + y + ')',
      w[C = 'url(#' + C + ')'] = {
        id: y,
        needFilter: !0,
        isImage: A
      };
    for (
      E = (_ = h.getElementsByTagNameNS(m, 'linearGradient')).length,
      S = 0;
      S < E;
      ++S
    ) C = (R = _[S]).getAttribute('id'),
      y = Utils1.MakeGuid(),
      R.setAttribute('id', y),
      y = 'url(#' + y + ')',
      w[C = 'url(#' + C + ')'] = {
        id: y,
        needFilter: !0
      };
    for (
      E = (_ = h.getElementsByTagNameNS(m, 'radialGradient')).length,
      S = 0;
      S < E;
      ++S
    ) C = (R = _[S]).getAttribute('id'),
      y = Utils1.MakeGuid(),
      R.setAttribute('id', y),
      y = 'url(#' + y + ')',
      w[C = 'url(#' + C + ')'] = {
        id: y,
        needFilter: !0
      };
    var F,
      v = h.getElementsByTagNameNS(m, 'clipPath'),
      G = v.length,
      N = {};
    for (S = 0; S < G; ++S) C = (F = v[S]).getAttribute('id'),
      y = Utils1.MakeGuid(),
      F.setAttribute('id', y),
      y = 'url(#' + y + ')',
      N[C = 'url(#' + C + ')'] = y;
    var k,
      U,
      J = function () {
        if (!P) {
          var e = document.createElementNS(this.ns, 'filter'),
            t = document.createElementNS(this.ns, 'feMerge'),
            a = document.createElementNS(this.ns, 'feMergeNode');
          P = Utils1.MakeGuid(),
            e.setAttribute('id', P),
            e.setAttribute('x', '-0.5'),
            e.setAttribute('y', '-0.5'),
            e.setAttribute('width', '2'),
            e.setAttribute('height', '2'),
            a.setAttribute('in', 'SourceGraphic'),
            t.appendChild(a),
            e.appendChild(t),
            T.appendChild(e),
            P = 'url(#' + P + ')'
        }
        return P
      },
      x = n &&
        n.exportLinks,
      O = n &&
        n.exportTT,
      B = function (e, t, a, r) {
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
          h;
        if (e.hasAttribute && e.getAttribute && e.removeAttribute) if (
          S = x &&
          e.hasAttribute('_explink_'),
          c = O &&
          e.hasAttribute('_expnotett_'),
          u = O &&
          e.hasAttribute('_expdatatt_'),
          p = O &&
          e.hasAttribute('_expextendtt_'),
          !e.hasAttribute('no-export') ||
          S ||
          c ||
          u ||
          p
        ) if (
            e.removeAttribute('no-export'),
            e.hasAttribute('no-export-force')
          ) t.push(e);
          else if ('hidden' != (n = e.getAttribute('visibility'))) {
            if ('g' == e.nodeName) {
              if (!e.childNodes.length) return void t.push(e);
              e.removeAttribute('style')
            }
            if (
              (o = e.getAttribute('filter')) &&
              (
                (o = o.replace(/[\\|\"]/g, '')).indexOf('FX_NONE') >= 0 ? (e.removeAttribute('filter'), o = null) : void 0 !== M[o] &&
                  (e.setAttribute('filter', M[o].id), M[o].used = !0)
              ),
              h = !(r = r || !!o),
              r ||
              (
                D = e.getAttribute('width'),
                g = e.getAttribute('height'),
                D &&
                g &&
                (D = Number(D), g = Number(g), isNaN(D) || isNaN(g) || (h = D * g < 500000))
              ),
              (n = e.getAttribute('fill')) &&
              (
                n = n.replace(/[\\|\"]/g, ''),
                void 0 !== w[n] &&
                (
                  e.setAttribute('fill', w[n].id),
                  w[n].needFilter &&
                  !r &&
                  h &&
                  (e.setAttribute('filter', J()), r = !0)
                )
              ),
              (n = e.getAttribute('stroke')) &&
              (
                n = n.replace(/[\\|\"]/g, ''),
                void 0 !== w[n] &&
                (
                  e.setAttribute('stroke', w[n].id),
                  w[n].needFilter &&
                  !r &&
                  h &&
                  (e.setAttribute('filter', J()), r = !0)
                )
              ),
              (n = e.getAttribute('clip-path')) &&
              (
                n = n.replace(/[\\|\"]/g, ''),
                void 0 !== N[n] &&
                e.setAttribute('clip-path', N[n])
              ),
              e.hasAttribute('export-needfilter') &&
              !r &&
              h &&
              (e.setAttribute('filter', J()), r = !0),
              e.removeAttribute('pointer-events'),
              e.removeAttribute('class'),
              'tspan' == e.nodeName &&
              (n = e.getAttribute('style')) &&
              (s = (n = n.replace(/[\"]/g, '\'')).match(/(font-family\:.+?\;)/i)).length > 0
            ) for (n = (n = s[0].slice(12, - 1)).trim().split(','), i = 0; i < n.length; i++) l = n[i].trim(),
              a.indexOf(l) < 0 &&
              a.push(l);
            if (S) {
              var m = e.getAttribute('_explink_');
              $(e).wrap(
                '<a xlink:href="' + m + '" target="_blank" style="cursor:pointer"></a>'
              )
            }
            var C,
              y,
              f,
              L;
            for (
              e.removeAttribute('_explink_'),
              c &&
              (
                C = e.getAttribute('_expnotett_'),
                y = parseInt(C, 10),
                f = null,
                (L = GlobalData.optManager.GetObjectPtr(y, !1)) &&
                L.runtimeText &&
                (f = L.runtimeText.text),
                f &&
                (f = Utils2.UTF8_to_B64(f)),
                (d = f) &&
                e.setAttribute('onclick', '_SDRShowNoteTT(evt,\'' + d + '\')')
              ),
              e.removeAttribute('_expnotett_'),
              u &&
              (
                d = function (e) {
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
                    d = parseInt(e, 10),
                    D = GlobalData.optManager.GetObjectPtr(d, !1),
                    g = [];
                  if (D && D.HasFieldData()) for (
                    t = D.GetFieldDataTable(),
                    a = D.GetFieldDataRecord(),
                    r = ListManager.SDData.FieldedDataGetFieldList(t, !0),
                    i = 0;
                    i < r.length;
                    i++
                  ) n = r[i].fieldID,
                    o = r[i].name,
                    s = r[i].type,
                    l = ListManager.SDData.FieldedDataGetFieldValue(t, a, n),
                    l = GlobalData.optManager.ModifyFieldDataForDisplay(l, s),
                    S = ListManager.SDData.FieldedDataGetFieldStyle(t, a, n),
                    p = GlobalData.optManager.CleanShapeDataHyperlink(ListManager.SDData.FieldedDataGetFieldHyperlink(t, a, n)),
                    c = u = '',
                    s == ListManager.SDData.FieldedDataTypes.HEADER &&
                    (
                      p = '',
                      c = S + 'max-width:none;display:block;',
                      S = 'display:none;',
                      u = 'display:block;'
                    ),
                    p &&
                    (l = '<a target="_blank" href="' + p + '">' + l + '</a>'),
                    g.push({
                      name: o,
                      val: l,
                      dstyle: S,
                      lstyle: c,
                      rstyle: u
                    });
                  var h = JSON.stringify(g);
                  return Utils2.UTF8_to_B64(h)
                }(C = e.getAttribute('_expdatatt_')),
                d &&
                e.setAttribute('onclick', '_SDRShowDataTT(evt,\'' + d + '\')')
              ),
              e.removeAttribute('_expdatatt_'),
              p &&
              (
                d = function (e) {
                  var t = parseInt(e, 10),
                    a = GlobalData.optManager.GetObjectPtr(t, !1);
                  return a &&
                    (a = Utils2.UTF8_to_B64(a)),
                    a
                }(C = e.getAttribute('_expextendtt_')),
                d &&
                e.setAttribute('onclick', '_SDRShowSVGTT(evt,\'' + d + '\')')
              ),
              e.removeAttribute('_expextendtt_'),
              i = 0;
              i < e.childNodes.length;
              i++
            ) B(e.childNodes[i], t, a, r)
          } else t.push(e);
        else t.push(e)
      },
      H = n &&
        n.docOnly,
      V = n &&
        n.backOnly,
      j = n &&
        n.allowGrid;
    // Double ===
    var node;
    for (b = h.childNodes.length, S = 1; S < b; S++) node = h.childNodes[S],
      k = node.hasAttribute('sdjs-background'),
      (U = node.hasAttribute('sdjs-grid')) &&
      j &&
      !V &&
      (
        node.removeAttribute('no-export'),
        node.removeAttribute('style'),
        node.setAttribute('transform', 'scale(1.041667,1.041667) translate(0,0)')
      ),
      k &&
        V ||
        !k &&
        H ||
        !V &&
        !H ? (B(node, L, I, !1), U || node.removeAttribute('transform')) : L.push(node);
    for (
      var z in function () {
        const e = GlobalData.optManager.ZList();
        for (let t = 0, a = e.length; t < a; t++) {
          const a = GlobalData.optManager.svgObjectLayer.GetElementByID(e[t]);
          a &&
            a.svgObj &&
            a.svgObj.node &&
            (
              a.svgObj.node.hasAttribute('no-export-force') &&
              a.svgObj.node.removeAttribute('no-export-force')
            )
        }
      }(),
      M
    ) M[z] &&
      !M[z].used &&
      M[z].node &&
      L.push(M[z].node);
    var W = L.length;
    for (S = 0; S < W; S++) (f = L[S]).parentNode.removeChild(f);
    var q,
      K = h.getElementsByTagNameNS(m, 'g');
    for (S = K.length - 1; S >= 0; S--) (q = K[S]).childNodes.length ||
      q.parentNode.removeChild(q);
    if (!i) {
      var X,
        Y,
        Z,
        Q,
        ee,
        te,
        ae,
        re,
        ie,
        ne,
        oe,
        se,
        le,
        Se = h.getElementsByTagNameNS(m, 'image'),
        ce = [],
        ue = Se.length,
        pe = '',
        de = n &&
          n.externImagePrep,
        De = [],
        ge = !1,
        he = !1,
        me = !1,
        Ce = !1;
      for (S = 0; S < ue; S++) ce.push(Se[S]);
      for (S = 0; S < ue; ++S) {
        if (
          Z = (X = ce[S]).getAttribute('xlink:href'),
          oe = !1,
          le = (le = X.getElementsByTagName('title')).length ? le[0] : null,
          0 == Z.toLowerCase().indexOf('blob:') &&
          u[Z]
        ) Y = u[Z],
          pe = 'data:' + FileParser.GetImageBlobType(Y.ImageDir) + ';base64,' + Utils2.ArrayBufferToBase64(Y.Bytes),
          X.setAttribute('xlink:href', pe);
        else if (
          0 === Z.toLowerCase().indexOf(Constants.FilePath_CMSRoot.toLowerCase())
        ) {
          if (0 == Z.indexOf('/cmsstorage')) if ('PRD' === SDUI.Environment) Z = Z.replace('/cmsstorage', 'https://app.smartdraw.com/cmsstorage');
          else Z = Z.replace(
            '/cmsstorage',
            'https://' + SDUI.Environment.toLowerCase() + 'app.smartdraw.com/cmsstorage'
          );
          pe = Constants.URL_Cloud.indexOf('localcloud') >= 0 ||
            Constants.URL_Cloud.indexOf('localapp') >= 0 ? Z.replace('localcloud', 'devcloud') : Z,
            X.setAttribute('xlink:href', pe),
            oe = de
        } else 0 === Z.toLowerCase().indexOf(Constants.FilePath_DataIcons.toLowerCase()) ? (
          pe = de ? Z : Constants.URL_Cloud.indexOf('localcloud') >= 0 ||
            Constants.URL_Cloud.indexOf('localapp') >= 0 ? 'https://devapp.smartdraw.com/' + Z : Constants.URL_Cloud + Z,
          X.setAttribute('xlink:href', pe),
          oe = de
        ) : Z.indexOf(Constants.Icon_Hyperlink) >= 0 ? (
          ge ||
          (
            ee = SDUI.Utils.MakeGuid(),
            X.setAttribute(
              'xlink:href',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMl8xXyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxOCAxOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTggMTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMzMzMzMzM7fQ0KCS5zdDF7ZmlsbDojRkZGRkZGO30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUuMyw2LjVjLTAuNC0wLjUtMS0wLjctMS43LTAuN2gtMi4xYy0xLjIsMC0yLjIsMC45LTIuMywyLjFIOWMtMC4xLTAuNS0wLjMtMS0wLjctMS40QzcuOSw2LDcuMyw1LjgsNi43LDUuOA0KCUg0LjZjLTEuMywwLTIuMywxLjEtMi4zLDIuNHYxLjRjMCwwLjYsMC4yLDEuMiwwLjcsMS43YzAuNCwwLjUsMSwwLjcsMS43LDAuN2gyYzAuNiwwLDEuMi0wLjIsMS43LTAuN2MwLjQtMC40LDAuNi0wLjgsMC43LTEuNGgwLjINCgljMC4xLDAuNSwwLjMsMSwwLjcsMS40YzAuNCwwLjQsMSwwLjcsMS43LDAuN2gyLjFjMS4zLDAsMi4zLTEuMSwyLjMtMi4zVjguMUMxNiw3LjUsMTUuNyw2LjksMTUuMyw2LjV6Ii8+DQo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuNiw2LjFjMC41LDAsMSwwLjIsMS40LDAuNmMwLjQsMC40LDAuNiwwLjksMC42LDEuNHYxLjVjMCwwLjUtMC4yLDEuMS0wLjYsMS40Yy0wLjQsMC40LTAuOSwwLjYtMS40LDAuNmgtMg0KCWMtMC41LDAtMS4xLTAuMi0xLjQtMC42Yy0wLjQtMC40LTAuNi0wLjktMC42LTEuNUg4LjdjMCwxLjEtMC45LDItMiwySDQuNmMtMC41LDAtMS0wLjItMS40LTAuNWMtMC40LTAuNC0wLjYtMC45LTAuNi0xLjRWOC4xDQoJYzAtMS4xLDAuOS0yLDItMmgyYzEuMSwwLDIsMC45LDIsMmMwLDAsMCwwLDAsMC4xaDAuOWMwLTAuNSwwLjItMS4xLDAuNi0xLjVjMC40LTAuNCwwLjktMC42LDEuNC0wLjZMMTMuNiw2LjF6IE03LjMsOC4xDQoJYzAtMC4yLTAuMS0wLjQtMC4yLTAuNUM3LDcuNSw2LjgsNy40LDYuNiw3LjRoLTJjLTAuMiwwLTAuMywwLjEtMC41LDAuMkM0LjEsNy43LDQsNy45LDQsOC4xdjEuNWMwLDAuNCwwLjMsMC43LDAuNywwLjdoMg0KCWMwLjIsMCwwLjMtMC4xLDAuNS0wLjJjMC4xLTAuMSwwLjItMC4zLDAuMi0wLjVINi45Yy0wLjEsMC0wLjEsMC0wLjIsMGMtMC4xLDAtMC4xLDAtMC4yLTAuMWMtMC4xLDAtMC4xLTAuMS0wLjItMC4xDQoJQzYuMiw5LDYuMiw4LjYsNi40LDguNGMwLDAsMC4xLTAuMSwwLjItMC4xYzAuMSwwLDAuMS0wLjEsMC4yLTAuMWgwLjJMNy4zLDguMUw3LjMsOC4xeiBNMTQuMyw4LjFjMC0wLjQtMC4zLTAuNy0wLjctMC43aC0yLjENCgljLTAuNCwwLTAuNywwLjMtMC43LDAuN2MwLDAsMCwwLDAsMGgwLjRoMC4yYzAuMSwwLDAuMSwwLDAuMiwwLjFjMC4xLDAsMC4xLDAuMSwwLjIsMC4xQzEyLDguNiwxMiw5LDExLjgsOS4zYzAsMC0wLjEsMC4xLTAuMiwwLjENCgljLTAuMSwwLTAuMSwwLjEtMC4yLDAuMWMtMC4xLDAtMC4xLDAtMC4yLDBoLTAuNGMwLDAuMiwwLjEsMC40LDAuMiwwLjVjMC4xLDAuMSwwLjMsMC4yLDAuNSwwLjJoMmMwLjIsMCwwLjMtMC4xLDAuNS0wLjINCgljMC4xLTAuMSwwLjItMC4zLDAuMi0wLjVMMTQuMyw4LjFMMTQuMyw4LjF6Ii8+DQo8L3N2Zz4NCg=='
            )
          ),
          (Q = document.createElementNS(this.ns, 'use')).setAttribute('xlink:href', '#' + ee),
          X.parentNode.replaceChild(Q, X),
          (ie = X.getAttribute('transform')) &&
          (
            Q.setAttribute('transform', ie),
            X.removeAttribute('transform')
          ),
          le &&
          (X.removeChild(le), Q.appendChild(le)),
          ge ||
          (X.setAttribute('id', ee), T.appendChild(X), ge = !0)
        ) : Z.indexOf(Constants.Icon_Note) >= 0 ? (
          he ||
          (
            te = SDUI.Utils.MakeGuid(),
            X.setAttribute(
              'xlink:href',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxOCAxOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTggMTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNGRjk5MDA7fQ0KCS5zdDF7ZmlsbDojRkZGRjAwO30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTQuMiw2Ljh2N2MwLDAuNC0wLjMsMC44LTAuOCwwLjhINC45Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMy4zYzAtMC40LDAuMy0wLjgsMC44LTAuOGg1DQoJYzAuMiwwLDAuNSwwLjEsMC43LDAuMmMwLjIsMC4xLDAuNCwwLjIsMC42LDAuNGwyLjUsMi40YzAuMiwwLjIsMC4zLDAuNCwwLjQsMC42QzE0LjEsNi40LDE0LjIsNi42LDE0LjIsNi44eiBNNS4yLDEzLjZoOHYtNkg5LjkNCgljLTAuNCwwLTAuOC0wLjMtMC44LTAuOFYzLjZoLTRWMTMuNnoiLz4NCjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01LjIsMTMuNmg4di02SDkuOWMtMC40LDAtMC44LTAuMy0wLjgtMC44VjMuNmgtNFYxMy42eiIvPg0KPC9zdmc+DQo='
            )
          ),
          (Q = document.createElementNS(this.ns, 'use')).setAttribute('xlink:href', '#' + te),
          X.parentNode.replaceChild(Q, X),
          ne = X.getAttribute('onclick'),
          Q.setAttribute('onclick', ne),
          Q.setAttribute('style', 'cursor:pointer'),
          X.removeAttribute('onclick'),
          (ie = X.getAttribute('transform')) &&
          (
            Q.setAttribute('transform', ie),
            X.removeAttribute('transform')
          ),
          le &&
          X.removeChild(le),
          he ||
          (X.setAttribute('id', te), T.appendChild(X), he = !0)
        ) : Z.indexOf(Constants.Icon_Info) >= 0 ? (
          me ||
          (
            ae = SDUI.Utils.MakeGuid(),
            X.setAttribute(
              'xlink:href',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMl8xXyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxOCAxOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTggMTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMzMzY2OTk7fQ0KCS5zdDF7ZmlsbDojRkZGRkZGO30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTMuOSw2LjJjMSwxLjcsMSwzLjgsMCw1LjVjLTAuNSwwLjgtMS4yLDEuNS0yLDJjLTEuNywxLTMuOCwxLTUuNSwwYy0wLjgtMC41LTEuNS0xLjItMi0yYy0xLTEuNy0xLTMuOCwwLTUuNQ0KCWMwLjUtMC44LDEuMi0xLjUsMi0yYzEuNy0xLDMuOC0xLDUuNSwwQzEyLjgsNC42LDEzLjQsNS4zLDEzLjksNi4yeiIvPg0KPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwLjgsMTEuNnYwLjdjMCwwLjItMC4yLDAuMy0wLjMsMC4zSDcuOGMtMC4yLDAtMC4zLTAuMS0wLjMtMC4zdi0wLjdjMC0wLjEsMC0wLjIsMC4xLTAuMg0KCWMwLjEtMC4xLDAuMS0wLjEsMC4yLTAuMWgwLjN2LTJINy44Yy0wLjIsMC0wLjMtMC4yLTAuMy0wLjNWOC4yYzAtMC4yLDAuMS0wLjMsMC4zLTAuM2gyYzAuMiwwLDAuMywwLjIsMC4zLDAuM3YzaDAuMw0KCWMwLjEsMCwwLjIsMCwwLjIsMC4xQzEwLjgsMTEuNCwxMC44LDExLjUsMTAuOCwxMS42eiBNMTAuMiw1LjV2MWMwLDAuMi0wLjEsMC4zLTAuMywwLjNIOC41Yy0wLjEsMC0wLjIsMC0wLjItMC4xDQoJQzguMiw2LjcsOC4yLDYuNiw4LjIsNi41di0xYzAtMC4xLDAtMC4yLDAuMS0wLjJjMC4xLTAuMSwwLjEtMC4xLDAuMi0wLjFoMS4zQzEwLDUuMiwxMC4yLDUuMywxMC4yLDUuNXoiLz4NCjwvc3ZnPg0K'
            )
          ),
          (Q = document.createElementNS(this.ns, 'use')).setAttribute('xlink:href', '#' + ae),
          X.parentNode.replaceChild(Q, X),
          ne = X.getAttribute('onclick'),
          Q.setAttribute('onclick', ne),
          Q.setAttribute('style', 'cursor:pointer'),
          X.removeAttribute('onclick'),
          (ie = X.getAttribute('transform')) &&
          (
            Q.setAttribute('transform', ie),
            X.removeAttribute('transform')
          ),
          le &&
          X.removeChild(le),
          me ||
          (X.setAttribute('id', ae), T.appendChild(X), me = !0)
        ) : Z.indexOf(Constants.Icon_ExpandedView) >= 0 ? (
          Ce ||
          (
            re = SDUI.Utils.MakeGuid(),
            X.setAttribute(
              'xlink:href',
              'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIwLjIyMjIyaW4iIGhlaWdodD0iMC4yNzc3OGluIiB2aWV3Qm94PSIwIDAgMTYgMjAiPjx0aXRsZT5pY29uLWV4cGFuZC1zdmctMDI8L3RpdGxlPjxwYXRoIGQ9Ik01LjA1MTkyLDguNDEyYS4xOTYyNy4xOTYyNywwLDAsMSwwLC4yODczNkwyLjk3NywxMC43NzQ0bC45LjlhLjM5MjYuMzkyNiwwLDAsMSwwLC41NjI1Ni4zODcyNC4zODcyNCwwLDAsMS0uMjgxMjkuMTE4NzJoLTIuOEEuMzg3Mi4zODcyLDAsMCwxLC41MTQ0OCwxMi4yMzdhLjM4MTUzLjM4MTUzLDAsMCwxLS4xMTg3Mi0uMjgxMjh2LTIuOEEuMzgxNTMuMzgxNTMsMCwwLDEsLjUxNDQ4LDguODc0NGEuMzkyNTkuMzkyNTksMCwwLDEsLjU2MjU3LDBsLjkuOSwyLjA3NDg4LTIuMDc1YS4xOTY4MS4xOTY4MSwwLDAsMSwuMjg3NTMsMGwuNzEyNDcuNzEyNjRaTTkuOTk1NzYsMy4xNTU2OHYyLjhhLjM4MTU2LjM4MTU2LDAsMCwxLS4xMTg3MS4yODEyOC4zOTI1OS4zOTI1OSwwLDAsMS0uNTYyNTcsMGwtLjktLjktMi4wNzUsMi4wNzVhLjE5NjgxLjE5NjgxLDAsMCwxLS4yODc1MywwbC0uNzEyNDctLjcxMjY0YS4xOTY2Mi4xOTY2MiwwLDAsMSwwLS4yODczNmwyLjA3NS0yLjA3NS0uOS0uOWEuMzkyNTcuMzkyNTcsMCwwLDEsMC0uNTYyNTYuMzg3Mi4zODcyLDAsMCwxLC4yODEyOC0uMTE4NzJoMi44YS4zODcyNC4zODcyNCwwLDAsMSwuMjgxMjkuMTE4NzJBLjM4MTU2LjM4MTU2LDAsMCwxLDkuOTk1NzYsMy4xNTU2OFoiLz48L3N2Zz4='
            )
          ),
          (Q = document.createElementNS(this.ns, 'use')).setAttribute('xlink:href', '#' + re),
          X.parentNode.replaceChild(Q, X),
          ne = X.getAttribute('onclick'),
          Q.setAttribute('onclick', ne),
          Q.setAttribute('style', 'cursor:pointer'),
          X.removeAttribute('onclick'),
          (ie = X.getAttribute('transform')) &&
          (
            Q.setAttribute('transform', ie),
            X.removeAttribute('transform')
          ),
          le &&
          X.removeChild(le),
          Ce ||
          (X.setAttribute('id', re), T.appendChild(X), Ce = !0)
        ) : s &&
        (oe = !0, pe = Z);
        if (oe) {
          for (se = !1, c = 0; c < De.length; c++) De[c].url == pe &&
            (y = De[c].id, se = !0);
          se ||
            (y = SDUI.Utils.MakeGuid()),
            (Q = document.createElementNS(this.ns, 'use')).setAttribute('xlink:href', '#' + y),
            X.parentNode.replaceChild(Q, X),
            (ie = X.getAttribute('transform')) &&
            (
              Q.setAttribute('transform', ie),
              X.removeAttribute('transform')
            ),
            le &&
            (X.removeChild(le), Q.appendChild(le)),
            se ||
            (
              X.setAttribute('id', y),
              T.appendChild(X),
              De.push({
                url: pe,
                id: y
              })
            )
        }
      }
      de &&
        De.length &&
        (n.externImageList = De)
    }
    var ye,
      fe,
      Le,
      Ie,
      Te = '';
    if (!r) for (S = 0; S < I.length; ++S) '\'' == (ye = I[S])[0] &&
      '\'' == ye[ye.length - 1] &&
      (ye = ye.slice(1, - 1)),
      (fe = this.GetFontImportName(ye)) &&
      fe.length &&
      (Te += fe);
    if (
      Te.length > 0 &&
      (
        (Le = document.createElementNS(m, 'style')).setAttribute('type', 'text/css'),
        Le.removeAttribute('xml:space'),
        Ie = document.createTextNode(Te),
        Le.appendChild(Ie),
        T.appendChild(Le)
      ),
      h.setAttribute('width', p.width),
      h.setAttribute('height', p.height),
      h.setAttribute('viewBox', p.x + ' ' + p.y + ' ' + p.width + ' ' + p.height),
      h.removeAttribute('class'),
      n &&
      (
        n.width &&
        h.setAttribute('width', n.width),
        n.height &&
        h.setAttribute('height', n.height),
        void 0 !== n.left &&
        void 0 !== n.top &&
        h.setAttribute(
          'style',
          'position:relative; left:' + Math.round(n.left) + 'px; top:' + Math.round(n.top) + 'px; display:block;'
        ),
        void 0 !== n.id &&
        h.setAttribute('id', n.id),
        n.asDOMElement
      )
    ) return h;
    var be,
      Me = Utils3.XML2Str(h);
    be = / xmlns=\"(undefined)?\"/g,
      Me = Me.replace(be, ''),
      o &&
      (
        be = /xmlns:NS[0-9]+=\"\" /g,
        Me = Me.replace(be, ''),
        be = /NS[0-9]+:/g,
        Me = Me.replace(be, '')
      ),
      be = / xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g,
      Me = Me.replace(be, ''),
      be = /\xA0/g,
      Me = Utils3.StrReplaceAll('&nbsp;', ' ', Me = Me.replace(be, ' ')),
      Me = Utils3.StrReplaceAll('&quot;', '', Me),
      Me = Utils3.StrReplaceAll('$', '&#36;', Me);
    return a ||
      (
        Me = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' + Me
      ),
      n &&
        n.returnBoth ? {
        element: h,
        svg: Me
      }
        : Me
  }
}

export default OptHandler
