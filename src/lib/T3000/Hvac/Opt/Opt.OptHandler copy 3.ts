

import HvTimer from "../Helper/HvTimer";
import QuickStyle from "../Model/QuickStyle";
import ListManager from '../Data/ListManager';
import ParagraphFormat from '../Model/ParagraphFormat';
import GlobalData from '../Data/GlobalData';
import Globals from "../Data/Globals";
import SDTextureList from "../Model/TextureList";
import SDF from '../Data/SDF';
import ContentHeader from '../Model/ContentHeader';
import SEDSession from '../Model/SEDSession';
import LayersManager from "../Model/LayersManager";
import Layer from "../Model/Layer";
import $ from 'jquery';
import EvtUtil from "../Event/EvtUtil";
import Collab from "../Data/Collab";
import Resources from "../Data/Resources";
import ArrowDefs from '../Model/ArrowDefs';
import ArrowSizes from '../Model/ArrowSizes';
import CollabOverlayContoller from "../Opt/Business/CollabOverlayContoller";
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
  public Dynamic_Guides: any;
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
  public TextureList: SDTextureList;
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

  //#endregion

  Initialize() {

    if (this.bIsInitialized) {
      return;
    }

    this.theSVGDocumentID = '#svg-area';
    this.sendstate = 0;
    this.theRubberBand = null;
    this.theRubberBandStartX = 0;
    this.theRubberBandStartY = 0;
    this.theRubberBandFrame = { x: 0, y: 0, width: 0, height: 0 };
    this.theDragBBoxList = [];
    this.theDragElementList = [];
    this.theDragEnclosingRect = null;
    this.theDragStartX = 0;
    this.theDragStartY = 0;
    this.theDragDeltaX = 0;
    this.theDragDeltaY = 0;
    this.theDragTargetID = null;
    this.theDragTargetBBox = {};
    this.theDragGotMove = false;
    this.theDragGotAutoResizeRight = false;
    this.theDragGotAutoResizeBottom = false;
    this.theDragGotAutoResizeOldX = [];
    this.theDragGotAutoResizeOldY = [];
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
    this.Dynamic_Guides = null;
    this.theRotateKnobCenterDivisor = { x: 2, y: 2 };
    this.theRotateStartPoint = {};
    this.theRotateEndPoint = {};
    this.theRotateStartRotation = 0;
    this.theRotateObjectRadians = 0;
    this.theRotateEndRotation = 0;
    this.theRotatePivotX = 0;
    this.theRotatePivotY = 0;
    this.theRotateSnap = 5;
    this.enhanceRotateSnap = 45;
    this.theDrawShape = null;
    this.StampTimeout = null;
    this.wasClickInShape = false;
    this.autoScrollTimer = new HvTimer(this)/*GPTimer(this)*/;
    this.autoScrollTimerID = -1;
    this.autoScrollXPos = 0;
    this.autoScrollYPos = 0;
    this.bInAutoScroll = false;
    this.textEntryTimer = null;
    this.isGestureCapable = 'ontouchstart' in window || ('onpointerdown' in window && navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
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
    this.theSelectedListBlockID = -1;
    this.theSEDSessionBlockID = -1;
    this.theTEDSessionBlockID = -1;
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
    this.FormatPainterMode = ConstantData2.FormatPainterModes.NONE;
    this.FormatPainterStyle = new QuickStyle();
    this.FormatPainterSticky = false;
    this.FormatPainterText = new QuickStyle();
    this.FormatPainterParaFormat = new ParagraphFormat();
    this.FormatPainterArrows = null;
    this.svgDoc = null;
    this.svgObjectLayer = null;
    this.svgOverlayLayer = null;
    this.svgHighlightLayer = null;
    this.theEventTimestamp = 0;
    this.actionArrowHideTimer = new HvTimer(this);
    this.uniqueID = 0;
    this.theTextClipboard = null;
    this.theHtmlClipboard = null;
    this.CutFromButton = false;
    this.theImageClipboard = null;

    const selectedListBlock = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.SELECTEDLIST_OBJECT, []);
    this.theSelectedListBlockID = selectedListBlock.ID;

    let defaultStyle = new QuickStyle();

    this.TextureList = new SDTextureList();
    this.NStdTextures = 0;
    this.RichGradients = [];
    this.HasBlockDirectory = false;
    this.FileVersion = 41;// SDF.SDF_FVERSION2022;
    this.ActiveExpandedView = null;
    this.CommentUserIDs = [];
    this.theContentHeader = new ContentHeader();

    const sedSession = new SEDSession();
    sedSession.def.style = defaultStyle;
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

    const tedSession = new TEDSession();// new ListManager.TEDSession();
    const tedSessionBlock = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.TED_SESSION_OBJECT, tedSession);
    this.theTEDSessionBlockID = tedSessionBlock.ID;

    const linksBlock = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.LINKLIST_OBJECT, []);
    this.theLinksBlockID = linksBlock.ID;

    this.PreserveUndoState(true);
    this.InitSVGDocument();
    this.SVGroot = this.svgDoc.svgObj.node;
    this.UpdateSelectionAttributes(null);
    this.BuildArrowheadLookupTables();
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
    this.SetEditMode(ConstantData.EditState.DEFAULT);
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
  }

  PreserveUndoState(e) {


    //debugger
    if (!GlobalData.optManager.NoUndo) {
      if (null === GlobalData.stateManager) throw new Error('stateManager is null');
      // new SDJSError({
      //     source: 'ListManager.PreserveUndoState',
      //     message: 'stateManager is null'
      //   });
      if (!(GlobalData.stateManager.CurrentStateID < 0)) {
        // var t = Editor.IsStateOpen();
        var t = Utils1.IsStateOpen();
        GlobalData.stateManager.PreserveState(),
          t &&
          GlobalData.stateManager.AddToHistoryState(),
          !e &&
          t &&
          (
            this.GetDocDirtyState() ? SDF.SaveChangedBlocks(GlobalData.stateManager.CurrentStateID, 1) : SDF.SaveAllBlocks(),
            this.SetDocDirtyState(!0)
          )
      }
    }
  }

  InitSVGDocument() {

    var e = GlobalData.objectStore.GetObject(this.theSEDSessionBlockID).Data;

    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    console.log("Screen width:", screenWidth, "Screen height:", screenHeight);

    GlobalData.docHandler.InitializeWorkArea({
      svgAreaID: this.theSVGDocumentID,
      documentWidth: screenWidth,// 2000,// e.dim.x,
      documentHeight: screenHeight,// 250,// e.dim.y,
      documentDPI: 100
    });

    this.svgDoc = GlobalData.docHandler.DocObject();
    this.svgObjectLayer = this.svgDoc.AddLayer('svgObjectLayer');
    this.svgDoc.SetDocumentLayer('svgObjectLayer');
    this.svgOverlayLayer = this.svgDoc.AddLayer('svgOverlayLayer');
    this.svgOverlayLayer.ExcludeFromExport(true);
    this.svgHighlightLayer = this.svgDoc.AddLayer('svgHighlightLayer');
    this.svgHighlightLayer.ExcludeFromExport(true);
    this.svgCollabLayer = this.svgDoc.AddLayer('svgCollabLayer');
    this.svgCollabLayer.ExcludeFromExport(true);
    this.svgCollabLayer.AllowScaling(false);


    //mainApp Double ===
    this.MainAppElement = document.getElementById('main-app');
    this.WorkAreaElement = document.getElementById('svg-area');
    this.DocumentElement = document.getElementById('document-area');

    this.WorkAreaHammer = Hammer(this.WorkAreaElement);
    this.DocumentElementHammer = Hammer(this.DocumentElement);

    this.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick);
    this.WorkAreaHammer.on('wheel', EvtUtil.Evt_WorkAreaMouseWheel);
    this.DocumentElementHammer.on('wheel', EvtUtil.Evt_WorkAreaMouseWheel);

    this.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDragStart);
  }


  GetFractionDenominator() {

    return GlobalData.docHandler.rulerSettings.majorScale <= 1 ? 16 : GlobalData.docHandler.rulerSettings.majorScale <= 2 ? 8 : GlobalData.docHandler.rulerSettings.majorScale <= 4 ? 4 : GlobalData.docHandler.rulerSettings.majorScale <= 8 ? 2 : 1
  }

  UpdateSelectionAttributes(e) {
    return;

    console.log(' =========== UpdateSelectionAttributes ============', e)

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
      m = 0,
      ateselect,
      C = ConstantData.DrawingObjectBaseClass,
      y = {
        topconnector: - 1,
        topshape: - 1,
        foundtree: !1
      },
      f = GlobalData.optManager.GetObjectPtr(this.theSEDSessionBlockID, !1),
      L = ConstantData.TextFace,
      I = {},
      T = ConstantData.ObjectTypes,
      b = ConstantData.ShapeType;

    //Double
    // var ateselect;
    if (
      e &&
      (m = e.length) &&
      (ateselect = e[0]),
      Collab.IsCollaborating() &&
      Collab.Animation_AllowSelectionMessage(undefined) &&
      Collab.Animation_BuildMessage(
        0,
        0,
        ConstantData.Collab_AnimationMessages.ChangeSelection,
        e
      ),
      this.SelectionState.nselect = 0,
      this.SelectionState.nlineselected = 0,
      this.SelectionState.nshapeselected = 0,
      this.SelectionState.nconnectorselected = 0,
      this.SelectionState.ngroupsselected = 0,
      this.SelectionState.nimageselected = 0,
      this.SelectionState.IsTargetTable = !1,
      this.SelectionState.allowalign = 0,
      this.SelectionState.width = 0,
      this.SelectionState.widthstr = '',
      this.SelectionState.height = 0,
      this.SelectionState.heightstr = '',
      this.SelectionState.left = 0,
      this.SelectionState.leftstr = '',
      this.SelectionState.top = 0,
      this.SelectionState.topstr = '',
      this.SelectionState.paste = this.GetClipboardType(),
      D = Collab.GetUndoState(),
      this.SelectionState.undo = D.undo,
      this.SelectionState.redo = D.redo,
      this.SelectionState.TextDirection = 0,
      this.SelectionState.dimensions = 0,
      this.SelectionState.ncells_selected = 0,
      this.SelectionState.cell_notext = !1,
      this.SelectionState.celltype = 0,
      this.SelectionState.cellselected = !1,
      this.SelectionState.cellflags = 0,

      //Double ====
      // this.SelectionState.NTableCols = GlobalDatagOptions.newTableCols,
      // this.SelectionState.NTableRows = GlobalDatagOptions.newTableRows,
      this.SelectionState.ntablesselected = 0,
      this.SelectionState.bInNoteEdit = this.bInNoteEdit,
      this.SelectionState.allowcopy = !1,
      this.SelectionState.selectionhastext = !1,
      this.SelectionState.npolylinecontainerselected = 0,
      this.SelectionState.projectTableSelected = !1,
      this.SelectionState.lockedTableSelected = !1,
      this.SelectionState.nsegs = 0,
      this.SelectionState.polyclosed = !1,
      this.SelectionState.iswallselected = !1,
      this.SelectionState.WallThickness = 0,
      this.SelectionState.subtype = 0,
      this.SelectionState.objecttype = 0,
      this.SelectionState.datasetElemID = - 1,
      this.SelectionState.tselect = - 1,
      this.SelectionState.fixedCornerRadius = - 2,
      this.SelectionState.lineCornerRadius = - 2,
      this.SelectionState.connectorCanHaveCurve = !1,
      this.SelectionState.CurrentSelectionBusinessManager = GlobalData.gBusinessManager,
      this.SelectionState.isJiraCard = !1,
      GlobalData.optManager.bInDimensionEdit
    ) this.SelectionState.fontid = -1,// GlobalData.optManager.GetFontIdByName(GlobalData.optManager.theContentHeader.DimensionFont.fontName),
      this.SelectionState.fontsize = GlobalData.optManager.theContentHeader.DimensionFont.fontSize,
      this.SelectionState.bold = (GlobalData.optManager.theContentHeader.DimensionFont.face & L.Bold) > 0,
      this.SelectionState.italic = (GlobalData.optManager.theContentHeader.DimensionFont.face & L.Italic) > 0,
      this.SelectionState.underline = (GlobalData.optManager.theContentHeader.DimensionFont.face & L.Underline) > 0,
      this.SelectionState.superscript = (GlobalData.optManager.theContentHeader.DimensionFont.face & L.Subscript) > 0,
      this.SelectionState.subscript = (GlobalData.optManager.theContentHeader.DimensionFont.face & L.Subscript) > 0,
      this.SelectionState.CurrentSelectionBusinessManager = null;
    else if (0 === m || this.bInNoteEdit) this.SelectionState.fontid = -1,// GlobalData.optManager.GetFontIdByName(f.def.lf.fontName),
      this.SelectionState.fontsize = f.def.style.Text.FontSize,
      this.SelectionState.bold = (f.def.style.Text.Face & L.Bold) > 0,
      this.SelectionState.italic = (f.def.style.Text.Face & L.Italic) > 0,
      this.SelectionState.underline = (f.def.style.Text.Face & L.Underline) > 0,
      this.SelectionState.superscript = (f.def.style.Text.Face & L.Subscript) > 0,
      this.SelectionState.subscript = (f.def.style.Text.Face & L.Subscript) > 0,
      this.SelectionState.TextDirection = 0 == (f.def.textflags & ConstantData.TextFlags.SED_TF_HorizText),
      this.SelectionState.dimensions = f.dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
      f.dimensions & ConstantData.DimensionFlags.SED_DF_Select,
      this.bInNoteEdit &&
      this.curNoteShape >= 0 &&
      null != (
        d = Business.GetSelectionBusinessManager(this.curNoteShape)
      ) &&
      (this.SelectionState.CurrentSelectionBusinessManager = d);
    else {
      for (
        t = this.GetTargetSelect(),
        this.SelectionState.nselect = m,
        this.SelectionState.nlineselected = 0,
        this.SelectionState.nshapeselected = 0,
        this.SelectionState.nconnectorselected = 0,
        t >= 0 &&
        (
          null != (i = this.GetObjectPtr(t, !1)) &&
          i instanceof BaseDrawingObject ||
          (t = - 1, f.tselect = - 1)
        ),
        t >= 0 &&
        (
          null != (d = Business.GetSelectionBusinessManager(t)) &&
          (this.SelectionState.CurrentSelectionBusinessManager = d),
          this.SelectionState.tselect = t,
          (i = this.GetObjectPtr(t, !1)) &&
          (
            this.SelectionState.colorfilter = i.colorfilter,
            i.GetPositionRect(),
            this.SelectionState.subtype = i.subtype,
            this.SelectionState.objecttype = i.objecttype,
            this.SelectionState.datasetElemID = i.datasetElemID,
            s = i.GetDimensionsForDisplay(),
            this.SelectionState.left = s.x,
            this.SelectionState.top = s.y,
            this.SelectionState.width = s.width,
            this.SelectionState.height = s.height,
            i.objecttype === T.SD_OBJT_FLOORPLAN_WALL &&
            (
              this.SelectionState.WallThickness = i.StyleRecord.Line.Thickness
            ),
            this.SelectionState.leftstr = i.GetLengthInRulerUnits(
              this.SelectionState.left,
              GlobalData.docHandler.rulerSettings.originx
            ),
            this.SelectionState.topstr = i.GetLengthInRulerUnits(
              this.SelectionState.top,
              GlobalData.docHandler.rulerSettings.originy
            ),
            this.SelectionState.widthstr = i.GetLengthInRulerUnits(this.SelectionState.width),
            0 !== s.height ? this.SelectionState.heightstr = i.GetLengthInRulerUnits(this.SelectionState.height) : this.SelectionState.heightstr = '',
            (S = GlobalData.optManager.Table_HideUI(i) ? null : i.GetTable(!1)) &&
            (
              this.SelectionState.IsTargetTable = !0,
              this.SelectionState.NTableRows = S.rows.length,
              this.SelectionState.NTableCols = S.cols.length,
              this.SelectionState.ntablesselected++
            ),
            this.SelectionState.selectionhastext = i.DataID >= 0
          ),
          Business.FindTreeTop(i, 0, y) ? (
            o = y.topshape >= 0 ? y.topshape : y.topconnector,
            n = this.GetMoveList(o, !1, !0, !1, null, !1)
          ) : n = this.GetMoveList(t, !1, !0, !1, null, !1)
        ),
        a = 0;
        a < m;
        a++
      ) if (
          p = e[a],
          n ? - 1 === n.indexOf(p) &&
            (this.SelectionState.allowalign = !0) : p != t &&
          (this.SelectionState.allowalign = !0),
          (r = this.GetObjectPtr(p, !1)) instanceof BaseDrawingObject &&
          (
            u = (c = -1/*GlobalData.optManager.SD_GetVisioTextChild(p)*/) >= 0 ? this.GetObjectPtr(c, !1) : r,
            r
          )
        ) {
          switch (
          r.ImageURL &&
          r.ImageURL.length &&
          this.SelectionState.nimageselected++,
          (r.IsSwimlane() || r instanceof ShapeContainer) &&
          (
            this.SelectionState.lockedTableSelected = !0,
            this.SelectionState.IsTargetTable = !0
          ),
          (S = r.GetTable(!1)) &&
          (
            (S.flags & ListManager.Table.TableFlags.SDT_TF_LOCK) > 0 &&
            (this.SelectionState.lockedTableSelected = !0),
            SDUI.AppSettings.Application !== Resources.Application.Builder &&
            r.objecttype === T.SD_OBJT_TABLE_WITH_SHAPECONTAINER &&
            (this.SelectionState.lockedTableSelected = !0),
            GlobalData.optManager.Table_GetCellWithType(S, ListManager.Table.CellTypes.SD_CT_JIRA_ISSUEKEY) &&
            (this.SelectionState.isJiraCard = !0)
          ),
          r.objecttype === T.SD_OBJT_FLOORPLAN_WALL &&
          (this.SelectionState.iswallselected = !0),
          h = r.DrawingObjectBaseClass,
          r instanceof PolyLineContainer &&
          (h = C.SHAPE),
          h
          ) {
            case C.SHAPE:
              switch (
              this.SelectionState.nshapeselected++,
              S &&
              this.SelectionState.ntablesselected++,
              r.ShapeType
              ) {
                case b.RECT:
                case b.RRECT:
                  r.moreflags & ConstantData.ObjMoreFlags.SED_MF_FixedRR ? - 2 === this.SelectionState.fixedCornerRadius ? this.SelectionState.fixedCornerRadius = 100 * r.shapeparam : this.SelectionState.fixedCornerRadius !== 100 * r.shapeparam &&
                    (this.SelectionState.fixedCornerRadius = - 1) : - 2 === this.SelectionState.fixedCornerRadius &&
                      0 === r.shapeparam ? this.SelectionState.fixedCornerRadius = 0 : this.SelectionState.fixedCornerRadius = - 1
              }
              break;
            case C.CONNECTOR:
              this.SelectionState.nconnectorselected++,
                r.AllowCurveOnConnector() &&
                (
                  this.SelectionState.connectorCanHaveCurve = !0,
                  - 2 === this.SelectionState.lineCornerRadius ? this.SelectionState.lineCornerRadius = r.arraylist.curveparam : this.SelectionState.lineCornerRadius !== r.arraylist.curveparam &&
                    (this.SelectionState.lineCornerRadius = - 1)
                );
            case C.LINE:
              this.SelectionState.nlineselected++,
                g = r.TextDirection,
                0 === this.SelectionState.TextDirection ? this.SelectionState.TextDirection = g : this.SelectionState.TextDirection !== g &&
                  (this.SelectionState.TextDirection = - 1),
                r.LineType === ConstantData.LineType.SEGLINE &&
                (
                  - 2 === this.SelectionState.lineCornerRadius ? this.SelectionState.lineCornerRadius = r.segl.curveparam : this.SelectionState.lineCornerRadius !== r.segl.curveparam &&
                    (this.SelectionState.lineCornerRadius = - 1)
                )
          }
          u.DataID >= 0 &&
            (this.SelectionState.selectionhastext = !0),
            (r instanceof GroupSymbol || r.NativeID >= 0) &&
            this.SelectionState.ngroupsselected++;
          var M = this.Table_GetActiveID();
          r instanceof PolyLineContainer &&
            this.SelectionState.npolylinecontainerselected++,
            r.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART &&
            (this.SelectionState.projectTableSelected = !0),
            r.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASK &&
            (this.SelectionState.projectTableSelected = !0),
            r instanceof PolyLine &&
            r.polylist &&
            r.polylist.segs &&
            (
              this.SelectionState.nsegs = r.polylist.segs.length,
              this.SelectionState.polyclosed = r.polylist.closed
            ),
            M === t ? this.Table_UpdateSelectionAttributes(M, !1) : (
              l = u.GetTextFormat(!0, I),
              I.hastext &&
              (this.SelectionState.selectionhastext = !0),
              0 === a ? (
                this.SelectionState.fontid = l.FontId,
                this.SelectionState.fontsize = l.FontSize,
                this.SelectionState.bold = (l.Face & L.Bold) > 0,
                this.SelectionState.italic = (l.Face & L.Italic) > 0,
                this.SelectionState.underline = (l.Face & L.Underline) > 0,
                this.SelectionState.superscript = (l.Face & L.Superscript) > 0,
                this.SelectionState.subscript = (l.Face & L.Subscript) > 0
              ) : (
                this.SelectionState.fontid !== l.FontId &&
                (this.SelectionState.fontid = - 1),
                this.SelectionState.fontsize !== l.FontSize &&
                (this.SelectionState.fontsize = - 1),
                this.SelectionState.bold !== (l.Face & L.Bold) > 0 &&
                (this.SelectionState.bold = !1),
                this.SelectionState.italic !== (l.Face & L.Italic) > 0 &&
                (this.SelectionState.italic = !1),
                this.SelectionState.underline !== (l.Face & L.Underline) > 0 &&
                (this.SelectionState.underline = !1),
                this.SelectionState.superscript !== (l.Face & L.Superscript) > 0 &&
                (this.SelectionState.superscript = !1),
                this.SelectionState.subscript !== (l.Face & L.Subscript) > 0 &&
                (this.SelectionState.subscript = !1)
              )
            ),
            this.SelectionState.dimensions |= r.Dimensions & (
              ConstantData.DimensionFlags.SED_DF_Always | ConstantData.DimensionFlags.SED_DF_Select
            )
        }
      this.theMoveList = null
    }
    this.SelectionState.allowcopy = this.SelectionState.nselect > 0;
    var P = new SelectionAttributes;
    $.extend(!0, P, this.SelectionState),
      GlobalData.docHandler.rulerSettings.showpixels &&
      P.fontsize >= 0 &&
      (P.fontsize = this.PixelstoPoints(P.fontsize))
    /*SDUI.Commands.MainController.UpdateActiveSelection(P, !1)*/
  }

  // GetObjectPtr = function (blockId, t) {
  //   var a = {};
  //   return null == blockId ||
  //     blockId < 0 ? null : (
  //     t ? (a = GlobalData.objectStore.GetObject(blockId)) &&
  //       (a = GlobalData.objectStore.PreserveBlock(blockId)) : a = GlobalData.objectStore.GetObject(blockId),
  //     null == a ? null : a.Data
  //   )
  // }



  GetObjectPtr(blockId, isPreserveBlock) {
    var object = GlobalData.objectStore.GetObject(blockId);
    if (object == null || blockId < 0) {
      return null;
    }

    if (isPreserveBlock) {
      object = GlobalData.objectStore.PreserveBlock(blockId);
    }

    return object == null ? null : object.Data;
  }

  GetClipboardType() {
    console.log('============ GlobalData.clipboardManager', GlobalData.clipboardManager);
    var e = this.GetObjectPtr(this.theTEDSessionBlockID, !1);
    GlobalData.clipboardManager.Get();
    return - 1 != e.theActiveTextEditObjectID ||
      this.bInNoteEdit ? e.theActiveTableObjectID >= 0 &&
        this.theContentHeader.ClipboardType === ConstantData.ClipboardType.Table &&
        this.theContentHeader.ClipboardBuffer ? ConstantData.ClipboardType.Table : this.theTextClipboard &&
          this.theTextClipboard.text ? ConstantData.ClipboardType.Text : ConstantData.ClipboardType.None : e.theActiveTableObjectID >= 0 &&
            (
              this.theContentHeader.ClipboardType === ConstantData.ClipboardType.Table &&
              this.theContentHeader.ClipboardBuffer ||
              this.theTextClipboard &&
              this.theTextClipboard.text
            ) ? ConstantData.ClipboardType.Table : GlobalData.optManager.theContentHeader.ClipboardBuffer &&
              this.theContentHeader.ClipboardType === ConstantData.ClipboardType.LM ? ConstantData.ClipboardType.LM : this.GetTargetSelect() >= 0 &&
                this.theTextClipboard &&
                this.theTextClipboard.text ? ConstantData.ClipboardType.Text : ConstantData.ClipboardType.None
  }

  GetTargetSelect() {
    var e;
    e = this.GetObjectPtr(this.theSEDSessionBlockID, !1);
    var t = this.Table_GetActiveID();
    t >= 0 &&
      (e.tselect = t);
    var a = - 1;
    if (e.tselect >= 0) {
      var r = GlobalData.optManager.GetObjectPtr(e.tselect, !1);
      r &&
        r instanceof BaseDrawingObject &&
        (a = e.tselect)
    }
    return a
  }

  Table_GetActiveID() {
    return this.GetObjectPtr(this.theTEDSessionBlockID, !1).theActiveTableObjectID
  }

  // GetFontIdByName(e) {
  //   var t = Resources.WebFonts,
  //     a = t.length,
  //     r = e;
  //   'Segoe UI' === e &&
  //     (r = 'Arial'),
  //     r += 'X';
  //   for (var i = 0; i < a; i++) {
  //     if (t[i].Name + 'X' === r) return i
  //   }
  //   return - 1
  // }

  BuildArrowheadLookupTables() {
    const arrowDefs = new ArrowDefs().uiArrowDefs;
    const arrowSizes = new ArrowSizes().uiarrowSizes;

    ConstantData1.ArrowheadLookupTable.length = arrowDefs.length;
    for (let i = 0; i < arrowDefs.length; i++) {
      ConstantData1.ArrowheadLookupTable[arrowDefs[i].id] = arrowDefs[i];
    }

    ConstantData1.ArrowheadSizeTable.length = arrowSizes.length;
    for (let i = 0; i < arrowSizes.length; i++) {
      ConstantData1.ArrowheadSizeTable[i] = arrowSizes[i];
    }
  }

  SetEditMode(stateMode, t, a, r) {

    var i,
      n = t;
    if (
      this.editModeList &&
      (a || r) ||
      (this.editModeList = []),
      GlobalData.gBusinessManager &&
      GlobalData.gBusinessManager.NotifySetEditMode &&
      GlobalData.gBusinessManager.NotifySetEditMode(stateMode),
      !n
    ) switch (stateMode) {
      case ConstantData.EditState.STAMP:
        n = ConstantData.CursorType.STAMP;
        break;
      case ConstantData.EditState.TEXT:
        n = ConstantData.CursorType.TEXT;
        break;
      case ConstantData.EditState.FORMATPAINT:
        n = ConstantData.CursorType.PAINT;
        break;
      case ConstantData.EditState.LINKCONNECT:
        n = ConstantData.CursorType.ANCHOR;
        break;
      case ConstantData.EditState.LINKJOIN:
        n = ConstantData.CursorType.EDIT_CLOSE;
        break;
      case ConstantData.EditState.EDIT:
        n = ConstantData.CursorType.EDIT;
        break;
      case ConstantData.EditState.DRAGCONTROL:
        n = ConstantData.CursorType.NESW_RESIZE;
        break;
      case ConstantData.EditState.DRAGSHAPE:
        n = ConstantData.CursorType.MOVE;
        break;
      case ConstantData.EditState.GRAB:
        n = ConstantData.CursorType.GRAB;
        break;
      default:
        n = ConstantData.CursorType.DEFAULT
    }
    this.svgDoc.SetCursor(n),
      a ||
        !this.editModeList.length ? this.editModeList.push({
          mode: stateMode,
          cursor: n
        }) : (
        this.editModeList[this.editModeList.length - 1].mode = stateMode,
        this.editModeList[this.editModeList.length - 1].cursor = n
      ),
      this.curHiliteShape >= 0 &&
      (i = GlobalData.objectStore.GetObject(this.curHiliteShape)) &&
      i.Data.SetCursors()
  }

  // SetBusinessModule(e) {
  //   this.theContentHeader.BusinessModule = e
  // }

  ShowXY(xy) {
    // Show the x and y coordinates of the mouse pointer
  }

  UpdateDisplayCoordinates(e, t, a, r) {

    // console.log('ListManager.LM.prototype.UpdateDisplayCoordinates ==== e, t, a, r=>', e, t, a, r);

    //#region

    /*
    if (
      NumberToString = function (e, t) {
        var a,
          r,
          i = e,
          n = 2;
        n = GlobalData.docHandler.rulerSettings.dp;
        if (t) return e;
        if (GlobalData.docHandler.rulerSettings.showpixels) return i = e.toFixed(0);
        if (null != e.toFixed && (i = e.toFixed(n)), t) {
          if (r = i.indexOf('"'), n = i.indexOf('\''), r < 0) i += '    ';
          else for (a = r - n; a < 4; a++) i += ' ';
          for (a = n; a < 4; a++) i += ' '
        } else if ((r = i.indexOf('.')) < 0 && (r = (i += '.').length - 1), r >= 0) {
          for (a = n = i.length - r - 1; a < n; a++) i += '0';
          for (a = r; a < 4; a++) i += ' '
        }
        return i
      },
      null == a &&
      (a = ConstantData.CursorTypes.Default),
      Collab.IsCollaborating() &&
      t
    ) {
      var i = Date.now();
      if (i - Collab.MoveTimestamp > Collab.MoveDelay) {
        var n = {
          CursorType: a
        };
        Collab.Animation_BuildMessage(
          t.x,
          t.y,
          ListManager.Collab_AnimationMessages.CursorMove,
          n
        ),
          Collab.MoveTimestamp = i
      }
    }
    if (GlobalData.docHandler.documentConfig.showRulers) {
      var o = 0,
        s = 0,
        l = GlobalData.docHandler.rulerSettings.useInches &&
          GlobalData.docHandler.rulerSettings.units === Resources.RulerUnits.SED_Feet;
      if (
        l &&
        (
          s = o = ConstantData.DimensionFlags.SED_DF_ShowFractionalInches,
          r &&
          (
            s = Utils.SetFlag(
              o,
              ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches,
              (
                r.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches
              ) > 0
            )
          )
        ),
        e
      ) {
        var S = this.GetLengthInRulerUnits(e.x, !1, GlobalData.docHandler.rulerSettings.originx, o),
          c = this.GetLengthInRulerUnits(e.y, !1, GlobalData.docHandler.rulerSettings.originy, o),
          u = this.GetLengthInRulerUnits(e.width, !1, null, s),
          p = this.GetLengthInRulerUnits(e.height, !1, null, s),
          d = Resources.Controls.WorkArea,
          D = d.LeftEdit;
        D.GetControl(),
          D.Control &&
          (D.Control[0].value = y(NumberToString(S, l)));
        var g = d.TopEdit;
        g.GetControl(),
          g.Control &&
          (g.Control[0].value = y(NumberToString(c, l)));
        var h = d.WidthEdit;
        h.GetControl(),
          h.Control &&
          (h.Control[0].value = y(NumberToString(u, l)));
        var m = d.HeightEdit;
        m.GetControl(),
          m.Control &&
          (m.Control[0].value = y(NumberToString(p, l)))
      }
      if (t) {
        t.x < 0 &&
          (t.x = 0),
          t.y < 0 &&
          (t.y = 0);
        var C = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
        t.x > C.dim.x &&
          (t.x = C.dim.x),
          t.y > C.dim.y &&
          (t.y = C.dim.y)
      }
    }
    function y(e) {
      var t,
        a = e.length;
      for (t = (e = e.trim()).length; t < a; t++) e += ' ';
      return e
    }
      */
    //#endregion

    if (a == null) {
      a = CollabOverlayContoller.CursorTypes.Default;
    }

    if (Collab.IsCollaborating() && t) {
      const now = Date.now();
      if (now - Collab.MoveTimestamp > Collab.MoveDelay) {
        const message = {
          CursorType: a
        };
        Collab.Animation_BuildMessage(
          t.x,
          t.y,
          ConstantData.Collab_AnimationMessages.CursorMove,
          message
        );
        Collab.MoveTimestamp = now;
      }
    }

    if (GlobalData.docHandler.documentConfig.showRulers) {
      let showFractionalInches = 0;
      let showFeetAsInches = 0;
      const useFeet = GlobalData.docHandler.rulerSettings.useInches &&
        GlobalData.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Feet;

      if (useFeet) {
        showFractionalInches = showFeetAsInches = ConstantData.DimensionFlags.SED_DF_ShowFractionalInches;
        if (r) {
          showFeetAsInches = Utils.SetFlag(
            showFractionalInches,
            ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches,
            (r.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches) > 0
          );
        }
      }

      if (e) {
        const xLength = this.GetLengthInRulerUnits(e.x, false, GlobalData.docHandler.rulerSettings.originx, showFractionalInches);
        const yLength = this.GetLengthInRulerUnits(e.y, false, GlobalData.docHandler.rulerSettings.originy, showFractionalInches);
        const width = this.GetLengthInRulerUnits(e.width, false, null, showFeetAsInches);
        const height = this.GetLengthInRulerUnits(e.height, false, null, showFeetAsInches);

        const workArea = Resources.Controls.WorkArea;
        const leftEdit = workArea.LeftEdit;
        leftEdit.GetControl();
        if (leftEdit.Control) {
          leftEdit.Control[0].value = formatValue(NumberToString(xLength, useFeet));
        }

        const topEdit = workArea.TopEdit;
        topEdit.GetControl();
        if (topEdit.Control) {
          topEdit.Control[0].value = formatValue(NumberToString(yLength, useFeet));
        }

        const widthEdit = workArea.WidthEdit;
        widthEdit.GetControl();
        if (widthEdit.Control) {
          widthEdit.Control[0].value = formatValue(NumberToString(width, useFeet));
        }

        const heightEdit = workArea.HeightEdit;
        heightEdit.GetControl();
        if (heightEdit.Control) {
          heightEdit.Control[0].value = formatValue(NumberToString(height, useFeet));
        }
      }

      if (t) {
        t.x = Math.max(0, t.x);
        t.y = Math.max(0, t.y);

        const sessionBlock = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
        t.x = Math.min(sessionBlock.dim.x, t.x);
        t.y = Math.min(sessionBlock.dim.y, t.y);
      }
    }


  }

  IsWheelClick(e) {
    var t = !1;
    return e.gesture &&
      (e = e.gesture.srcEvent),
      e instanceof MouseEvent ? 2 === e.which &&
        (t = !0) : 'onpointerdown' in window &&
        e instanceof PointerEvent &&
        2 === e.which &&
      (t = !0),
      t
  }

  RubberBandSelect_Cancel(e) {
    if (GlobalData.optManager.theRubberBand) {
      GlobalData.optManager.WorkAreaHammer.off('drag');
      GlobalData.optManager.WorkAreaHammer.off('dragend');
      GlobalData.optManager.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDragStart);
      GlobalData.optManager.ResetAutoScrollTimer();
      GlobalData.optManager.svgOverlayLayer.RemoveElement(GlobalData.optManager.theRubberBand);
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
  }

  SetUIAdaptation(event) {



    /*
    var t = !1;
    GlobalData.optManager.isMobilePlatform ? t = !0 : e.gesture ? 'onpointerdown' in window ? e.gesture.srcEvent instanceof PointerEvent &&
      'touch' == e.gesture.srcEvent.pointerType &&
      (t = !0) : 'ontouchstart' in window ? (
        Utils.RibbonDebugStr('event is a ' + e.gesture.srcEvent.type),
        - 1 != e.gesture.srcEvent.type.indexOf('touch') ? t = !0 : 'mousedown' == e.gesture.srcEvent.type &&
          (t = !1)
      ) : 'mousedown' == e.gesture.srcEvent.type &&
    (t = !1) : 'onpointerdown' in window ? e instanceof PointerEvent &&
      'touch' == e.pointerType &&
      (t = !0) : 'ontouchstart' in window ? (
        Utils.RibbonDebugStr('event is a ' + e.type),
        - 1 != e.type.indexOf('touch') ? t = !0 : 'mousedown' == e.type &&
          (t = !1)
      ) : 'mousedown' == e.type &&
    (t = !1),
      t ? (
        ConstantData.Defines.SED_KnobSize = 19,
        ConstantData.Defines.SED_RKnobSize = 21,
        ConstantData.Defines.SED_CKnobSize = 28,
        ConstantData.Defines.CONNECTPT_DIM = 19,
        ConstantData.Defines.JOINPT_DIM = 19,
        ConstantData.Defines.JOINPT_LINE_DIM = 75,
        ConstantData.Defines.CONNECTPT_LINE_DIM = 75,
        ConstantData.Defines.SED_Slop = 20,
        ConstantData.Defines.SED_SlopShapeExtra = 20,
        ConstantData.Defines.ActionArrowSizeH = 39,
        ConstantData.Defines.ActionArrowSizeV = 30
      ) : (
        ConstantData.Defines.SED_KnobSize = 9,
        ConstantData.Defines.SED_RKnobSize = 7,
        ConstantData.Defines.SED_CKnobSize = 14,
        ConstantData.Defines.CONNECTPT_DIM = 7,
        ConstantData.Defines.JOINPT_DIM = 10,
        ConstantData.Defines.JOINPT_LINE_DIM = 32,
        ConstantData.Defines.CONNECTPT_LINE_DIM = 16,
        ConstantData.Defines.SED_Slop = 7,
        ConstantData.Defines.SED_SlopShapeExtra = 10,
        ConstantData.Defines.ActionArrowSizeH = 20,
        ConstantData.Defines.ActionArrowSizeV = 13
      ),
      this.bTouchInitiated = t
      */




    // debugger;


    /*
    var isTouch = false;

    if (GlobalData.optManager.isMobilePlatform) {
      isTouch = true;
    } else if (event.gesture) {
      if ('onpointerdown' in window) {
        if (event.gesture.srcEvent instanceof PointerEvent && event.gesture.srcEvent.pointerType === 'touch') {
          isTouch = true;
        }
      } else if ('ontouchstart' in window) {
        Utils2.RibbonDebugStr('event is a ' + event.gesture.srcEvent.type);
        if (event.gesture.srcEvent.type.indexOf('touch') !== -1) {
          isTouch = true;
        } else if (event.gesture.srcEvent.type === 'mousedown') {
          isTouch = false;
        }
      } else if (event.gesture.srcEvent.type === 'mousedown') {
        isTouch = false;
      }
    } else if ('onpointerdown' in window) {
      if (event instanceof PointerEvent && event.pointerType === 'touch') {
        isTouch = true;
      }
    } else if ('ontouchstart' in window) {
      Utils2.RibbonDebugStr('event is a ' + event.type);
      if (event.type.indexOf('touch') !== -1) {
        isTouch = true;
      } else if (event.type === 'mousedown') {
        isTouch = false;
      }
    } else if (event.type === 'mousedown') {
      isTouch = false;
    }

    if (isTouch) {
      ConstantData.Defines.SED_KnobSize = 19;
      ConstantData.Defines.SED_RKnobSize = 21;
      ConstantData.Defines.SED_CKnobSize = 28;
      ConstantData.Defines.CONNECTPT_DIM = 19;
      ConstantData.Defines.JOINPT_DIM = 19;
      ConstantData.Defines.JOINPT_LINE_DIM = 75;
      ConstantData.Defines.CONNECTPT_LINE_DIM = 75;
      ConstantData.Defines.SED_Slop = 20;
      ConstantData.Defines.SED_SlopShapeExtra = 20;
      ConstantData.Defines.ActionArrowSizeH = 39;
      ConstantData.Defines.ActionArrowSizeV = 30;
    } else {
      ConstantData.Defines.SED_KnobSize = 9;
      ConstantData.Defines.SED_RKnobSize = 7;
      ConstantData.Defines.SED_CKnobSize = 14;
      ConstantData.Defines.CONNECTPT_DIM = 7;
      ConstantData.Defines.JOINPT_DIM = 10;
      ConstantData.Defines.JOINPT_LINE_DIM = 32;
      ConstantData.Defines.CONNECTPT_LINE_DIM = 16;
      ConstantData.Defines.SED_Slop = 7;
      ConstantData.Defines.SED_SlopShapeExtra = 10;
      ConstantData.Defines.ActionArrowSizeH = 20;
      ConstantData.Defines.ActionArrowSizeV = 13;
    }

    this.bTouchInitiated = isTouch;
    */
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
    if (!Collab.IsProcessingMessage()) {
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
      GlobalData.optManager.WorkAreaHammer.on('drag', EvtUtil.Evt_RubberBandDrag);
      GlobalData.optManager.WorkAreaHammer.on('dragend', EvtUtil.Evt_RubberBandDragEnd);

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

  // Double === render all opt shape including the re-siez image
  RenderAllSVGSelectionStates() {
    console.log('ListManager.LM.prototype.RenderAllSVGSelectionStates ======================');
    // debugger
    var e = this.ActiveVisibleZList(),
      t = e.length,
      a = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data,
      r = (a.length, 0),
      i = - 1,
      n = 0,
      o = null,
      s = null,
      l = null,
      S = null,
      c = this.GetTargetSelect(),
      u = [
        ConstantData.SVGElementClass.DIMENSIONLINE,
        ConstantData.SVGElementClass.DIMENSIONTEXT,
        ConstantData.SVGElementClass.AREADIMENSIONLINE,
        ConstantData.SVGElementClass.DIMENSIONTEXTNOEDIT
      ],
      p = function (e) {
        return function (t) {
          return ConstantData.DocumentContext.HTMLFocusControl &&
            ConstantData.DocumentContext.HTMLFocusControl.blur &&
            ConstantData.DocumentContext.HTMLFocusControl.blur(),
            e.LM_ActionClick(t),
            !1
        }
      };
    for (r = 0; r < t; ++r) if (
      n = e[r],
      !(
        (i = a.indexOf(n)) < 0 ||
        null == (o = GlobalData.optManager.GetObjectPtr(n, !1)) ||
        o.flags & ConstantData.ObjFlags.SEDO_NotVisible ||
        null == (s = this.svgObjectLayer.GetElementByID(n)) ||
        null == s.GetElementByID(ConstantData.SVGElementClass.SHAPE)
      )
    ) {
      if (
        S = ConstantData.Defines.Action + n,
        null == (l = this.svgOverlayLayer.GetElementByID(S)) &&
        null != (l = o.CreateActionTriggers(this.svgDoc, n, s, c))
      ) {
        this.svgOverlayLayer.AddElement(l);
        try {
          l.SetRotation(o.RotationAngle)
        } catch (e) {
          throw e;
        }
        if (
          0 == (o.flags & ConstantData.ObjFlags.SEDO_Lock) &&
          !GlobalData.docHandler.IsReadOnly() &&
          !o.NoGrow()
        ) {
          var d = l.DOMElement(),
            D = Hammer(d);
          D.on('tap', EvtUtil.Evt_ActionTriggerTap),
            D.on('dragstart', p(o)),
            this.isGestureCapable &&
            (
              D.on('pinchin', EvtUtil.Evt_WorkAreaHammerPinchIn),
              D.on('pinchout', EvtUtil.Evt_WorkAreaHammerPinchOut),
              D.on('transformend', EvtUtil.Evt_WorkAreaHammerPinchEnd)
            ),
            l.SetEventProxy(D)
        }
      }
      if (o.Dimensions & ConstantData.DimensionFlags.SED_DF_Select) {
        var g,
          h = 0,
          m = null;
        for (h = s.ElementCount() - 1; h >= 1; h--) g = (m = s.GetElementByIndex(h)).GetID(),
          u.indexOf(g) >= 0 &&
          m.SetOpacity(i >= 0 ? 1 : 0)
      }
    }
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

  // UpdateFieldDataTooltipPos(e, t) {
  //   // if (this.FieldedDataTooltipVisible() && (e || t)) {
  //   //   var a = SDUI.Commands.MainController.Dropdowns.GetDropdown(Resources.Controls.Dropdowns.EditDataValues.Id);
  //   //   if (a && a.Control) {
  //   //     var r = a.Control.css('left').replace('px', ''),
  //   //       i = a.Control.css('top').replace('px', '');
  //   //     r = parseFloat(r),
  //   //       i = parseFloat(i),
  //   //       isNaN(r) ||
  //   //       isNaN(i) ||
  //   //       (
  //   //         r += e,
  //   //         i += t,
  //   //         a.Control.css('left', r + 'px'),
  //   //         a.Control.css('top', i + 'px')
  //   //       )
  //   //   }
  //   // }
  // }

  SetFormatPainter(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s,
      l;
    if (
      this.currentModalOperation === ConstantData2.ModalOperations.FORMATPAINTER
    ) this.currentModalOperation = ConstantData2.ModalOperations.NONE,
      this.SetEditMode(ConstantData.EditState.DEFAULT),
      this.FormatPainterSticky = !1;
    else if (!e) if (
      this.CancelModalOperation(),
      a = GlobalData.optManager.GetActiveTextEdit(),
      i = GlobalData.optManager.Table_GetActiveID(),
      null != a
    ) {
      this.currentModalOperation = ConstantData2.ModalOperations.FORMATPAINTER,
        this.FormatPainterMode = ConstantData2.FormatPainterModes.TEXT,
        this.FormatPainterSticky = t;
      var S = this.svgDoc.GetActiveEdit();
      S &&
        (
          this.FormatPainterText = S.GetSelectedFormat(),
          this.FormatPainterStyle = {
            StyleRecord: {
            }
          },
          this.FormatPainterStyle.Text = new TextFormatData(),
          this.TextStyleToSDText(this.FormatPainterStyle.Text, this.FormatPainterText),
          this.SetEditMode(ConstantData.EditState.FORMATPAINT)
        )
    } else if (i >= 0) {
      if ((r = this.GetObjectPtr(i, !1)) && (o = r.GetTable(!1))) if (o.select >= 0) {
        this.currentModalOperation = ConstantData2.ModalOperations.FORMATPAINTER,
          this.FormatPainterSticky = t,
          this.FormatPainterMode = ConstantData2.FormatPainterModes.TABLE,
          this.FormatPainterStyle = {
            StyleRecord: {
            }
          },
          n = o.cells[o.select],
          this.FormatPainterStyle.Text = Utils1.DeepCopy(n.Text),
          this.FormatPainterStyle.hline = Utils1.DeepCopy(n.hline),
          this.FormatPainterStyle.vline = Utils1.DeepCopy(n.vline),
          this.FormatPainterStyle.Fill = Utils1.DeepCopy(n.fill),
          this.FormatPainterStyle.vjust = n.vjust,
          this.FormatPainterStyle.just = n.just,
          this.FormatPainterText = this.CalcDefaultInitialTextStyle(this.FormatPainterStyle.Text);
        var c = {};
        c.just = n.just,
          c.bullet = 'none',
          c.spacing = 0;
        var u = this.svgObjectLayer.GetElementByID(r.BlockID);
        this.Table_GetTextParaFormat(o, c, u, !1, !1, o.select),
          this.FormatPainterParaFormat = c,
          this.SetEditMode(ConstantData.EditState.FORMATPAINT)
      } else o.rselect >= 0 ? (
        this.currentModalOperation = ConstantData2.ModalOperations.FORMATPAINTER,
        this.FormatPainterSticky = t,
        this.FormatPainterMode = ConstantData2.FormatPainterModes.TABLE,
        this.FormatPainterStyle = {
          StyleRecord: {
          }
        },
        s = o.rows[o.rselect],
        n = o.cells[s.start + s.segments[0].start],
        this.FormatPainterStyle.hline = Utils1.DeepCopy(n.hline),
        this.SetEditMode(ConstantData.EditState.FORMATPAINT)
      ) : o.cselect >= 0 &&
      (
        this.currentModalOperation = ConstantData2.ModalOperations.FORMATPAINTER,
        this.FormatPainterSticky = t,
        this.FormatPainterMode = ConstantData2.FormatPainterModes.TABLE,
        this.FormatPainterStyle = {
          StyleRecord: {
          }
        },
        l = o.cols[o.cselect],
        this.FormatPainterStyle.vline = Utils1.DeepCopy(l.vline),
        this.SetEditMode(ConstantData.EditState.FORMATPAINT)
      )
    } else (a = this.GetTargetSelect()) >= 0 &&
      (r = this.GetObjectPtr(a, !1)) &&
      (
        this.currentModalOperation = ConstantData2.ModalOperations.FORMATPAINTER,
        this.FormatPainterSticky = t,
        this.FormatPainterMode = ConstantData2.FormatPainterModes.OBJECT,
        this.FormatPainterStyle = Utils1.DeepCopy(r.StyleRecord),
        this.FormatPainterStyle.Border = Utils1.DeepCopy(r.StyleRecord.Line),
        !(
          r.ImageURL ||
          r.SymbolURL ||
          r instanceof GroupSymbol
        ) ||
        r instanceof SVGFragmentSymbol ||
        (
          delete this.FormatPainterStyle.Fill,
          delete this.FormatPainterStyle.Name,
          (
            0 === this.FormatPainterStyle.Line.Thickness ||
            r instanceof GroupSymbol
          ) &&
          (
            delete this.FormatPainterStyle.Line,
            delete this.FormatPainterStyle.Border
          )
        ),
        this.FormatPainterText = r.GetTextFormat(!1, null),
        null === this.FormatPainterText &&
        (
          this.FormatPainterText = this.CalcDefaultInitialTextStyle(this.FormatPainterStyle.Text)
        ),
        this.FormatPainterParaFormat = r.GetTextParaFormat(!1),
        this.FormatPainterArrows = r.GetArrowheadFormat(),
        this.SetEditMode(ConstantData.EditState.FORMATPAINT)
      );
    // Commands.MainController.Selection.SetFormatPainterHighlight(
    //   this.currentModalOperation === ConstantData2.ModalOperations.FORMATPAINTER
    // )
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
        Collab.BeginSecondaryEdit();
        shapeObject = this.GetObjectPtr(activeOutlineId, false);
        if (
          shapeObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
          shapeObject.LineType === ConstantData.LineType.POLYLINE &&
          shapeObject.polylist.closed &&
          (this.PolyLineToShape(activeOutlineId), Collab.AllowMessage())
        ) {
          const messagePayload = { BlockID: activeOutlineId };
          Collab.BuildMessage(ConstantData.CollabMessages.CloseShapeEdit, messagePayload, false);
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

  // OverrideSnaps = function (e) {
  //   if (null == e) return !1;
  //   var t = e.altKey;
  //   return e.gesture &&
  //     e.gesture.srcEvent &&
  //     (t = e.gesture.srcEvent.altKey),
  //     1 == t
  // }


  OverrideSnaps(event) {
    if (event == null) {
      return false;
    }

    let isAltKeyPressed = event.altKey;

    if (event.gesture && event.gesture.srcEvent) {
      isAltKeyPressed = event.gesture.srcEvent.altKey;
    }

    return isAltKeyPressed === true;
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

  // ExceptionCleanup = function (e) {
  //   throw e;
  //   console.log('ListManager.LM.prototype.ExceptionCleanup ==============', e);
  //   // throw e;

  //   if (null != e && e.stack, null === GlobalData.stateManager) throw new Error('stateManager is null');
  //   // new SDJSError({
  //   //   source: 'ListManager.ExceptionCleanup',
  //   //   message: 'stateManager is null'
  //   // });
  //   this.TEUnregisterEvents(),
  //     this.DeactivateAllTextEdit(!0),
  //     this.CloseEdit(!1, !0),
  //     GlobalData.stateManager.ExceptionCleanup(),
  //     this.ResizeSVGDocument(),
  //     this.RenderAllSVGObjects();
  //   var t = this.GetObjectPtr(this.theSEDSessionBlockID, !1);
  //   Resources.CurrentTheme.Name !== t.CurrentTheme &&
  //     (new SDUI.ThemeController).SwitchTheme(t.CurrentTheme);
  //   var a = this.GetObjectPtr(this.theSelectedListBlockID, !1);
  //   this.UpdateSelectionAttributes(a),
  //     SDUI.Commands.MainController.SmartPanels.IdleSmartPanel(!0),
  //     Collab.IsProcessingMessage() ||
  //     (
  //       '1' === e.name ? Utils2.Alert(e.message) : 'PRD' === SDUI.Environment ? Utils2.Alert(Resources.Strings.Error_InComplete) : Utils2.Alert(e.stack),
  //       Collab.AllowMessage() &&
  //       Collab.IsSecondary() &&
  //       Collab.ReSyncCollaboration()
  //     ),
  //     SDUI.Utils.Logger.LogError(e.stack),
  //     Collab.UnLockMessages(),
  //     Collab.UnBlockMessages()
  // }






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




















  SelectAllInRect(e, t) {

    console.log('ListManager.LM.prototype.SelectAllInRect e, t=> ======', e, t);
    // debugger
    var visibleObjects = this.ActiveVisibleZList();
    var filteredObjects = this.RemoveNotVisible(visibleObjects);
    var objectCount = filteredObjects.length;
    var shapeContainerType = ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER;

    if (objectCount !== 0) {
      var selectionRect = {
        x: e.x,
        y: e.y,
        width: e.width,
        height: e.height
      };
      var selectedObjects = [];

      for (var i = 0; i < objectCount; ++i) {
        var object = GlobalData.objectStore.GetObject(filteredObjects[i]);
        if (object != null) {
          var objectData = object.Data;
          if (objectData.objecttype !== shapeContainerType || !this.ContainerIsInCell(objectData)) {
            var objectFrame = objectData.Frame;
            if (objectData.RotationAngle) {
              var center = {
                x: objectFrame.x + objectFrame.width / 2,
                y: objectFrame.y + objectFrame.height / 2
              };
              objectFrame = GlobalData.optManager.RotateRectAboutCenter(objectFrame, center, objectData.RotationAngle);
            }
            if (this.IsRectangleFullyEnclosed(selectionRect, objectFrame)) {
              selectedObjects.push(filteredObjects[i]);
            }
          }
        }
      }

      if (selectedObjects.length === 0) {
        this.ClearSelectionClick();
      } else {
        this.SelectObjects(selectedObjects, t, false);
      }
    }
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

    if (!Collab.NoRedrawFromSameEditor) {
      this.HideAllSVGSelectionStates();
    }

    this.DynamicSnapsRemoveGuides(this.Dynamic_Guides);
    this.Dynamic_Guides = null;
    this.UpdateLinks();
    this.UpdateLineHops(true);

    const noRedraw = Collab.NoRedrawFromSameEditor;
    this.RenderDirtySVGObjects();
    this.FitDocumentWorkArea(false, false, false, fitOption);

    if (GlobalData.gTestException) {
      const error = new Error(Resources.Strings.Error_InComplete);
      error.name = '1';
      throw error;
    }

    if (selectionObjects && Collab.AllowSelectionChange()) {
      this.SelectObjects(selectionObjects, false, true);
    } else if (!noRedraw) {
      this.RenderAllSVGSelectionStates();
    }

    if (!preserveUndoState) {
      this.PreserveUndoState(false);
    }

    const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, false);
    GlobalData.docHandler.ShowCoordinates(true);

    if (Collab.AllowSelectionChange()) {
      this.UpdateSelectionAttributes(selectedList);
    }

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
    this.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDrawStart);

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


  FindConnect(e, t, a, r, i, n, o) {
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
      y,
      f,
      L,
      I = 0,
      T = !1,
      b = {},
      M = [],
      P = [],
      R = 1e+30,
      A = 0,
      _ = {
        x: 0,
        y: 0
      },
      E = {},
      w = [],
      F = [],
      v = null,
      G = 0,
      N = ConstantData.HookFlags.SED_LC_HookNoExtra,
      k = ConstantData.HookPts,
      U = !1,
      J = function (e) {
        switch (e) {
          case k.SED_KTC:
          case k.SED_KBC:
          case k.SED_KRC:
          case k.SED_KLC:
            return !0;
          default:
            if (e >= k.SED_CustomBase && e < k.SED_CustomBase + 100) return !0
        }
        return !1
      },
      x = t.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
        t.objecttype !== ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR;
    if (null == a) return !1;
    if (null == (s = this.LinkParams.lpCircList)) return !1;
    _.x = this.LinkParams.ConnectPt.x,
      _.y = this.LinkParams.ConnectPt.y,
      A = t.hookflags,
      A = Utils2.SetFlag(A, ConstantData.HookFlags.SED_LC_AttachToLine, !1),
      (C = this.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1)) &&
      (G = C.flags),
      i ? (w.push(ConstantData.DrawingObjectBaseClass.LINE), v = w) : this.LinkParams.ArraysOnly &&
        (
          t.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ? (w.push(ConstantData.DrawingObjectBaseClass.SHAPE), v = w) : t.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE ? (
            w.push(ConstantData.DrawingObjectBaseClass.CONNECTOR),
            G & ConstantData.SessionFlags.SEDS_LLink &&
            w.push(ConstantData.DrawingObjectBaseClass.LINE),
            v = w
          ) : v = w
        ),
      n &&
      F.push(ConstantData.DrawingObjectBaseClass.LINE),
      GlobalData.optManager.FromOverlayLayer &&
      (w.push(ConstantData.DrawingObjectBaseClass.SHAPE), v = w),
      this.LinkParams.JoinIndex = - 1;
    for (var O = 0; O < a.length; O++) {
      if (
        I = 0,
        n ||
        (
          b = new HitResult(- 1, 0, null),
          t.ClosePolygon(e, a, b) &&
          (n = !0)
        ),
        n &&
        (
          b = new HitResult(- 1, 0, null),
          t.ClosePolygon(e, a, b) ||
          (b = this.FindObject(a[O], s, F, !1, !0, null)),
          b &&
          b.hitcode === ConstantData.HitCodes.SED_PLApp
        )
      ) {
        this.LinkParams.JoinIndex = b.objectid,
          this.LinkParams.JoinData = b.segment,
          this.LinkParams.JoinSourceData = a[O].id,
          p = b.pt.x - a[O].x,
          d = b.pt.y - a[O].y,
          this.theDragDeltaX = p,
          this.theDragDeltaY = d,
          this.LinkParams.JoinData === ConstantData.HookPts.SED_KTL ? (this.LinkParams.ConnectPt.x = 0, this.LinkParams.ConnectPt.y = 0) : (
            this.LinkParams.ConnectPt.x = ConstantData.Defines.SED_CDim,
            this.LinkParams.ConnectPt.y = ConstantData.Defines.SED_CDim
          );
        break
      }
      if (
        this.LinkParams.PrevConnect >= 0 &&
        (g = this.GetObjectPtr(this.LinkParams.PrevConnect, !1))
      ) if (
          L = Utils1.DeepCopy(GlobalData.optManager.LinkParams.ContainerPt[0]),
          g.IsShapeContainer(t, L)
        ) {
          var B = g.GetHitTestFrame(t);
          Utils2.pointInRect(B, L) &&
            (
              b.objectid = this.LinkParams.PrevConnect,
              b.hitcode = ConstantData.HitCodes.SED_InContainer,
              b.cellid = null
            )
        } else Utils2.pointInRect(g.r, a[O]) &&
          (I = g.Hit(a[O], x, !1, null)) &&
          (
            null == b &&
            (b = {
              cellid: null
            }),
            b.objectid = this.LinkParams.PrevConnect,
            b.hitcode = I,
            b.cellid = null
          );
      if (0 === I && (b = this.FindObject(a[O], s, v, x, !1, t)), b && b.hitcode) {
        if (null == (D = this.GetObjectPtr(b.objectid, !1))) return !1;
        if (
          b.hitcode === ConstantData.HitCodes.SED_InContainer &&
          (U = !0, L = b.theContainerPt),
          !U
        ) if (i) {
          if (this.LinkParams.AutoInsert) {
            if (
              t.DrawingObjectBaseClass != ConstantData.DrawingObjectBaseClass.SHAPE
            ) continue;
            var H = !1;
            for (j = 0; j < D.hooks.length; j++) D.hooks[j].objid == t.BlockID &&
              (H = !0);
            if (H) continue;
            if (D.LineType != ConstantData.LineType.SEGLINE) continue
          }
          if (
            0 == (D.targflags & ConstantData.HookFlags.SED_LC_AttachToLine)
          ) continue
        } else if (
            m = D.targflags,
            this.LinkParams.ArraysOnly ||
              0 != (G & ConstantData.SessionFlags.SEDS_SLink) ? this.LinkParams.ArraysOnly &&
              D.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
            (
              m = Utils2.SetFlag(m, ConstantData.HookFlags.SED_LC_Shape, !0)
            ) : m = Utils2.SetFlag(m, ConstantData.HookFlags.SED_LC_Shape, !1),
            0 == (A & m)
          ) continue;
        if (
          A = Utils2.SetFlag(A, ConstantData.HookFlags.SED_LC_ShapeOnLine, i),
          t.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
          (
            A = Utils2.SetFlag(A, ConstantData.HookFlags.SED_LC_NoSnaps, !0)
          ),
          null == (P = D.GetTargetPoints(a[O], A | N, e)) ||
          0 === P.length
        ) return !1;
        M = D.GetPerimPts(b.objectid, P, null, !1, P[0].cellid, e);
        var V = a[O];
        U &&
          (E = V = L, y = L.id);
        for (var j = 0; j < M.length; j++) (c = (l = M[j].x - V.x) * l + (S = M[j].y - V.y) * S) < R &&
          (R = c, u = j);
        if (D.polylist && b.segment >= 0) {
          var z = this.FindObject(M[u], s, v, !1, !1, t);
          if (!z) return !1;
          if (z.segment != b.segment) return !1
        }
        U ||
          (
            y = a[O].id,
            (y = D.GetBestHook(e, a[O].id, P[u])) != a[O].id ? (
              (E = t.HookToPoint(y, null)).x += o.x - this.theDragStartX,
              E.y += o.y - this.theDragStartY
            ) : E = a[O]
          );
        var W = (p = M[u].x - E.x) * p + (d = M[u].y - E.y) * d;
        if (!D.AllowHook(a[O], e, W)) continue;
        if (
          this.theDragDeltaX = p,
          this.theDragDeltaY = d,
          i &&
          this.LinkParams.AutoInsert
        ) {
          if (
            this.LinkParams.AutoPoints = [],
            f = $.extend(!0, {
            }, t.Frame),
            Math.floor((t.RotationAngle + 45) / 90)
          ) {
            var q = 90 / (180 / ConstantData.Geometry.PI),
              K = [];
            K.push(new Point(f.x, f.y)),
              K.push(new Point(f.x + f.width, f.y + f.height)),
              Utils3.RotatePointsAboutCenter(f, q, K),
              f = Utils2.Pt2Rect(K[0], K[1])
          }
          if (
            f.x += p,
            f.y += d,
            !D.GetFrameIntersects(f, t, this.LinkParams.AutoPoints, this.LinkParams)
          ) continue
        }
        T = !0,
          this.LinkParams.ConnectIndex = b.objectid,
          this.LinkParams.ConnectIndex >= 0 &&
          this.LinkParams.ConnectIndexHistory.indexOf(this.LinkParams.ConnectIndex) < 0 &&
          this.LinkParams.ConnectIndexHistory.push(this.LinkParams.ConnectIndex),
          this.LinkParams.ConnectPt.x = P[u].x,
          this.LinkParams.ConnectPt.y = P[u].y,
          this.LinkParams.ConnectInside = P[u].cellid,
          this.LinkParams.HookIndex = y,
          this.LinkParams.AutoInsert &&
            i &&
            !GlobalData.optManager.LinkParams.AutoSinglePoint ? this.LinkParams.ConnectHookFlag = ConstantData.HookFlags.SED_LC_AutoInsert : this.LinkParams.ArraysOnly &&
              D.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
              t.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
              J(y) ? this.LinkParams.ConnectHookFlag = ConstantData.HookFlags.SED_LC_HookReverse : this.LinkParams.ConnectHookFlag = 0;
        break
      }
    }
    return T ||
      (
        this.LinkParams.ConnectIndex >= 0 &&
        this.LinkParams.ConnectIndexHistory.indexOf(this.LinkParams.ConnectIndex) < 0 &&
        this.LinkParams.ConnectIndexHistory.push(this.LinkParams.ConnectIndex),
        this.LinkParams.ConnectIndex = - 1
      ),
      this.LinkParams.JoinIndex != this.LinkParams.HiliteJoin &&
      r &&
      (
        this.LinkParams.HiliteConnect >= 0 &&
        (
          this.HiliteConnect(
            this.LinkParams.HiliteConnect,
            this.LinkParams.ConnectPt,
            !1,
            !1,
            e,
            this.LinkParams.HiliteInside
          ),
          this.LinkParams.HiliteConnect = - 1,
          this.LinkParams.HiliteInside = null,
          this.UndoEditMode()
        ),
        this.LinkParams.JoinIndex >= 0 &&
          this.LinkParams.HiliteJoin < 0 ? this.GetEditMode() != ConstantData.EditState.LINKJOIN &&
        this.SetEditMode(ConstantData.EditState.LINKJOIN, null, !0) : this.LinkParams.JoinIndex < 0 &&
        this.LinkParams.HiliteJoin >= 0 &&
        this.UndoEditMode(),
        this.LinkParams.HiliteJoin >= 0 &&
        (
          this.HiliteConnect(
            this.LinkParams.HiliteJoin,
            this.LinkParams.ConnectPt,
            !1,
            !0,
            e,
            null
          ),
          this.LinkParams.HiliteJoin = - 1,
          this.UndoEditMode()
        ),
        this.LinkParams.JoinIndex >= 0 &&
        (
          this.HiliteConnect(
            this.LinkParams.JoinIndex,
            this.LinkParams.ConnectPt,
            !0,
            !0,
            e,
            null
          ),
          this.LinkParams.HiliteJoin = this.LinkParams.JoinIndex,
          this.GetEditMode() != ConstantData.EditState.LINKJOIN &&
          this.SetEditMode(ConstantData.EditState.LINKJOIN, null, !0)
        )
      ),
      this.LinkParams.HiliteConnect == this.LinkParams.ConnectIndex &&
        this.LinkParams.HiliteInside == this.LinkParams.ConnectInside ||
        !r ? T &&
        r &&
        this.LinkParams.HiliteConnect === this.LinkParams.ConnectIndex &&
        this.LinkParams.HiliteInside === this.LinkParams.ConnectInside &&
        1 === M.length &&
      (
        _.x == this.LinkParams.ConnectPt.x &&
        _.y == this.LinkParams.ConnectPt.y ||
        this.MoveConnectHilite(
          this.LinkParams.ConnectIndex,
          this.LinkParams.ConnectPt,
          this.LinkParams.ConnectInside
        )
      ) : (
        this.LinkParams.HiliteJoin >= 0 &&
        (
          this.HiliteConnect(
            this.LinkParams.HiliteJoin,
            this.LinkParams.ConnectPt,
            !1,
            !0,
            e,
            null
          ),
          this.LinkParams.HiliteJoin = - 1,
          this.UndoEditMode()
        ),
        this.LinkParams.ConnectIndex >= 0 &&
          this.LinkParams.HiliteConnect < 0 ? this.GetEditMode() != ConstantData.EditState.LINKCONNECT &&
        this.SetEditMode(ConstantData.EditState.LINKCONNECT, null, !0) : this.LinkParams.ConnectIndex < 0 &&
        this.LinkParams.HiliteConnect >= 0 &&
        (
          h = this.GetObjectPtr(this.LinkParams.HiliteConnect, !1),
          t.OnDisconnect(e, h, this.LinkParams.HookIndex, M[u]),
          this.UndoEditMode()
        ),
        this.LinkParams.HiliteConnect >= 0 &&
        (
          this.HiliteConnect(
            this.LinkParams.HiliteConnect,
            this.LinkParams.ConnectPt,
            !1,
            !1,
            e,
            this.LinkParams.HiliteInside
          ),
          this.LinkParams.HiliteConnect = - 1,
          this.LinkParams.HiliteInside = null,
          this.UndoEditMode()
        ),
        this.LinkParams.ConnectIndex >= 0 &&
        (
          this.HiliteConnect(
            this.LinkParams.ConnectIndex,
            this.LinkParams.ConnectPt,
            !0,
            !1,
            e,
            this.LinkParams.ConnectInside
          ),
          this.LinkParams.HiliteConnect = this.LinkParams.ConnectIndex,
          this.LinkParams.HiliteInside = this.LinkParams.ConnectInside,
          t.OnConnect(e, D, this.LinkParams.HookIndex, M[u], o),
          this.GetEditMode() != ConstantData.EditState.LINKCONNECT &&
          this.SetEditMode(ConstantData.EditState.LINKCONNECT, null, !0)
        )
      ),
      T
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
          // Skip locked, non-linkable, or VisioText objects.
          if (
            currentObject.flags & ConstantData.ObjFlags.SEDO_Lock ||
            currentObject.flags & ConstantData.ObjFlags.SEDO_NoLinking ||
            (currentObject.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText)
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

  AddNewObject1(e, t, a, r) {
    // debugger
    console.log('ListManager->Start AddNewObject e', e, t, a, r);
    console.log('GlobalData.gBaseManager========================', GlobalData.gBaseManager);
    var i,
      n,
      o = 0,
      s = null,
      l = !1;
    r = r ||
      null;
    var S = null,
      c = '',
      u = !1;
    if (null == e)
      //    throw new SDJSError({
      //   source: 'ListManager.AddNewObject',
      //   message: 'AddNewObject got sent null initial graphics attributes'
      // });
      throw new Error('AddNewObject got sent null initial graphics attributes');
    if (e.nativeDataArrayBuffer) {
      if ((i = this.AddNewNativeSymbol(e, a, !1)) >= 0) {
        var p = this.GetObjectPtr(i, !0);
        return p &&
          (
            this.theDragEnclosingRect = p.GetDragR(),
            e.SymbolID == ConstantData.Defines.Floorplan_WallOpeningID &&
            (
              p.extraflags = Utils2.SetFlag(
                p.extraflags,
                ConstantData.ExtraFlags.SEDE_DeleteOnUnhook,
                !0
              )
            )
          ),
          i
      }
    } else e.SymbolData ? (
      s = e.SymbolData.SymbolData,
      n = e.SymbolData.Title,
      e.SymbolData.ShapeData &&
      e.SymbolData.ShapeData.UseFlags & ListManager.LibraryUseFlags.SDLE_AddNameAsLabel &&
      null == r &&
      (r = n),
      0 == e.SymbolData.IsCustomContent &&
      0 == e.SymbolData.HasNative &&
      'VisioStencil' !== e.SymbolData.ChangedBy &&
      (S = e.SymbolData.Id, c = e.SymbolData.Title)
    ) : this.AllowAddToRecent(e) &&
    (S = ListManager.StandardShapeSymbolIDs[e.dataclass], u = !0);
    var d = GlobalData.objectStore.GetObject(this.theSEDSessionBlockID).Data;
    if (void 0 === t && (t = !0), t) {
      e.StyleRecord = Utils1.DeepCopy(d.def.style),
        e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
        (
          e.StyleRecord.Line = Utils1.DeepCopy(e.StyleRecord.Border),
          e.TMargins = Utils1.DeepCopy(d.def.tmargins),
          e.TextFlags = Utils2.SetFlag(
            e.TextFlags,
            ConstantData.TextFlags.SED_TF_FormCR,
            (d.def.textflags & ConstantData.TextFlags.SED_TF_FormCR) > 0
          )
        );
      var D = d.def.just;
      'middle' != d.def.vjust &&
        'center' != d.def.vjust &&
        (D = d.def.vjust + '-' + d.def.just),
        e.TextAlign = D
    }
    if (
      this.forcedotted &&
      e.StyleRecord &&
      (
        e.StyleRecord.Line.LinePattern = this.forcedotted,
        this.forcedotted = null
      ),
      e.UpdateFrame(e.Frame),
      e.sizedim.width = e.Frame.width,
      e.sizedim.height = e.Frame.height,
      e.UniqueID = this.uniqueID++,
      e.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
      (o = ConstantData.LayerFlags.SDLF_UseEdges),
      e.DataID = r ? GlobalData.optManager.CreateTextBlock(e, r) : - 1,
      e.EMFBuffer
    ) {
      var g,
        h = e.EMFBuffer,
        m = new ListManager.BlobBytes(e.EMFBufferType, h);
      e.EMFBufferType === ConstantData2.ImageDir.dir_meta ? (
        g = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, m)
      ) &&
        (e.EMFBlobBytesID = g.ID) : (
          g = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, m)
        ) &&
      (e.BlobBytesID = g.ID),
        e.EMFBuffer = null,
        e.EMFBufferType != ConstantData2.ImageDir.dir_meta &&
        delete e.EMFHash
    } else e.EMFHash &&
      e.SymbolData &&
      null != e.EMFBufferType &&
      e.EMFBufferType !== ConstantData2.ImageDir.dir_svg &&
      (l = !0);
    null == e.SymbolID &&
      (e.SymbolData = null);
    var C = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT, e);
    if (null === C)
      //   throw new SDJSError({
      //   source: 'ListManager.AddNewObject',
      //   message: 'AddNewObject got a null new graphics block allocation'
      // });

      throw new Error('AddNewObject got a null new graphics block allocation');
    if (
      Collab.AddToCreateList(C.Data.BlockID),
      S &&
      GlobalData.gBaseManager.UpdateShapeList(e, S, c, u),
      s
    ) {
      var y = [],
        f = n ||
          '';
      f = f.replace(/"/g, '\\"'),
        y.push({
          placeholder: '{{TITLE}}',
          value: f
        }),
        this.SetShapeDataFromSDON(C.Data.BlockID, s, y)
    }
    var L = !1;
    if (e.SymbolData && e.SymbolData.HasNative && (L = !0), L) {
      var I = {
        SymbolID: e.SymbolID,
        BlockID: e.BlockID
      };
      GlobalData.optManager.EmptySymbolList.push(I)
    } else if (l) {
      var T = {
        EMFHash: e.EMFHash,
        BlockID: e.BlockID,
        EMFBufferType: e.EMFBufferType
      };
      GlobalData.optManager.EmptyEMFList.push(T),
        e.SymbolData = null
    }
    this.ZListPreserve(o).push(C.ID);
    var b = e instanceof BaseLine,
      M = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1),
      P = M.layers[M.activelayer].layertype === ConstantData.LayerTypes.SD_LAYERT_MINDMAP ||
        M.layers[M.activelayer].layertype === ConstantData.LayerTypes.SD_LAYERT_GANTT;
    return Collab.IsProcessingMessage() ? this.AddToDirtyList(C.ID) : this.IsTopMostVisibleLayer() ||
      b ||
      P ? this.RenderLastSVGObject(a) : (
      this.RenderLastSVGObject(a),
      this.MarkAllAllVisibleHigherLayerObjectsDirty(),
      this.RenderDirtySVGObjectsNoSetMouse()
    ),
      this.theActionBBox = $.extend(!0, {
      }, e.Frame),
      this.theDragEnclosingRect = e.GetDragR(),
      C.ID
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

    // If the drawing object contains native data, add it as a native symbol.
    if (drawingObject.nativeDataArrayBuffer) {
      nativeSymbolResult = this.AddNewNativeSymbol(drawingObject, shouldStyleCopy, false);
      if (nativeSymbolResult >= 0) {
        const newObj = this.GetObjectPtr(nativeSymbolResult, true);
        if (newObj) {
          this.theDragEnclosingRect = newObj.GetDragR();
          if (drawingObject.SymbolID === ConstantData.Defines.Floorplan_WallOpeningID) {
            newObj.extraflags = Utils2.SetFlag(newObj.extraflags, ConstantData.ExtraFlags.SEDE_DeleteOnUnhook, true);
          }
        }
        console.log("O.Opt AddNewObject - Output:", nativeSymbolResult);
        return nativeSymbolResult;
      }
    }

    // Process symbol data if available.
    if (drawingObject.SymbolData) {
      symbolData = drawingObject.SymbolData.SymbolData;
      symbolTitle = drawingObject.SymbolData.Title;
      if (drawingObject.SymbolData.ShapeData &&
        (drawingObject.SymbolData.ShapeData.UseFlags & ListManager.LibraryUseFlags.SDLE_AddNameAsLabel) &&
        textContent == null) {
        textContent = symbolTitle;
      }
      if (drawingObject.SymbolData.IsCustomContent === 0 &&
        drawingObject.SymbolData.HasNative === 0 &&
        drawingObject.SymbolData.ChangedBy !== 'VisioStencil') {
        symbolId = drawingObject.SymbolData.Id;
        symbolTitleForUpdate = drawingObject.SymbolData.Title;
      }
    } else {
      if (this.AllowAddToRecent(drawingObject)) {
        symbolId = ListManager.StandardShapeSymbolIDs[drawingObject.dataclass];
        isStandardShape = true;
      }
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

    // Process EMFBuffer if available.
    if (drawingObject.EMFBuffer) {
      let bmp;
      const buffer = drawingObject.EMFBuffer;
      const blobBytes = new ListManager.BlobBytes(drawingObject.EMFBufferType, buffer);
      if (drawingObject.EMFBufferType === ConstantData2.ImageDir.dir_meta) {
        bmp = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, blobBytes);
        if (bmp) {
          drawingObject.EMFBlobBytesID = bmp.ID;
        }
      } else {
        bmp = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, blobBytes);
        if (bmp) {
          drawingObject.BlobBytesID = bmp.ID;
        }
      }
      drawingObject.EMFBuffer = null;
      if (drawingObject.EMFBufferType !== ConstantData2.ImageDir.dir_meta) {
        delete drawingObject.EMFHash;
      }
    } else if (drawingObject.EMFHash && drawingObject.SymbolData && drawingObject.EMFBufferType != null &&
      drawingObject.EMFBufferType !== ConstantData2.ImageDir.dir_svg) {
      // Flag indicating special processing based on EMFHash.
      isStandardShape = true;
    }

    if (drawingObject.SymbolID == null) {
      drawingObject.SymbolData = null;
    }

    // Create new graphics block.
    const newBlock = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT, drawingObject);
    if (newBlock == null) {
      throw new Error('AddNewObject got a null new graphics block allocation');
    }

    Collab.AddToCreateList(newBlock.Data.BlockID);

    if (symbolId) {
      GlobalData.gBaseManager.UpdateShapeList(drawingObject, symbolId, symbolTitleForUpdate, isStandardShape);
    }
    if (symbolData) {
      const replacements = [];
      let titleForReplace = symbolTitle || '';
      titleForReplace = titleForReplace.replace(/"/g, '\\"');
      replacements.push({
        placeholder: '{{TITLE}}',
        value: titleForReplace
      });
      this.SetShapeDataFromSDON(newBlock.Data.BlockID, symbolData, replacements);
    }

    let hasNative = false;
    if (drawingObject.SymbolData && drawingObject.SymbolData.HasNative) {
      hasNative = true;
    }
    if (hasNative) {
      const nativeInfo = {
        SymbolID: drawingObject.SymbolID,
        BlockID: drawingObject.BlockID
      };
      GlobalData.optManager.EmptySymbolList.push(nativeInfo);
    } else if (isStandardShape) {
      const emfInfo = {
        EMFHash: drawingObject.EMFHash,
        BlockID: drawingObject.BlockID,
        EMFBufferType: drawingObject.EMFBufferType
      };
      GlobalData.optManager.EmptyEMFList.push(emfInfo);
      drawingObject.SymbolData = null;
    }

    this.ZListPreserve(layerFlag).push(newBlock.ID);

    const isBaseline = drawingObject instanceof BaseLine;
    const layersData = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, false);
    const isSpecialLayer = layersData.layers[layersData.activelayer].layertype === ConstantData.LayerTypes.SD_LAYERT_MINDMAP ||
      layersData.layers[layersData.activelayer].layertype === ConstantData.LayerTypes.SD_LAYERT_GANTT;

    if (Collab.IsProcessingMessage()) {
      console.log("O.Opt AddNewObject - Output:", newBlock.ID);
      return this.AddToDirtyList(newBlock.ID);
    } else if (this.IsTopMostVisibleLayer() || isBaseline || isSpecialLayer) {
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

  // RenderLastSVGObject = function (e) {
  //   GlobalData.optManager.FromOverlayLayer;
  //   var t = this.ActiveLayerZList(),
  //     a = t.length;
  //   this.AddSVGObject(undefined, t[a - 1], !1, e),
  //     e &&
  //     this.RenderAllSVGSelectionStates()
  // }


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

      // For Gantt connector, force renderCallback to false.
      if (drawingData.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CONNECTOR) {
        renderCallback = false;
      }

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

          let shapeTapHandler = EvtUtil.Evt_ShapeTapFactory(drawingData);
          hammerInstance.on('tap', shapeTapHandler);

          if (!GlobalData.docHandler.IsReadOnly()) {
            GlobalData.Evt_ShapeDragStart = EvtUtil.Evt_ShapeDragStartFactory(drawingData);
            hammerInstance.on('dragstart', GlobalData.Evt_ShapeDragStart);

            if (this.isMobilePlatform) {
              GlobalData.SDJS_LM_ShapeHold = EvtUtil.Evt_ShapeHoldFactory(drawingData);
              hammerInstance.on('hold', GlobalData.SDJS_LM_ShapeHold);
            }

            if (drawingData.AllowTextEdit() || drawingData.AllowDoubleClick()) {
              GlobalData.SDJS_LM_ShapeDoubleTap = EvtUtil.Evt_ShapeDoubleTapFactory(drawingData);
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
    this.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDragStart);
    this.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick);

    // Call cancel on the drawing object if present.
    if (actionObject) {
      actionObject.CancelObjectDraw();
    }

    // Invoke any business manager cancellation routines if present.
    if (GlobalData.gBusinessManager.CancelObjectDraw) {
      GlobalData.gBusinessManager.CancelObjectDraw();
    }

    // Set the selection tool to the default select tool.
    Commands.MainController.Selection.SetSelectionTool(Resources.Tools.Tool_Select, false);

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
    GlobalData.optManager.CommentIdleTab();
    GlobalData.optManager.Comment_UpdatePanel(null);
    GlobalData.optManager.Comment_UpdateDropDown();

    // Save changed blocks if state was not open before undo
    if (!isStateOpen) {
      SDF.SaveChangedBlocks(currentStateID, -1);
    }

    console.log("O.Opt Undo - Output:", true);
    return true;
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
      f = !0,
      L = !1,
      I = !1,
      T = 0,
      b = {
        x: 0,
        y: 0
      },
      M = [
        {
          x: 0,
          y: 0
        }
      ],
      P = {},
      R = ConstantData,
      A = this.GetObjectPtr(this.theLinksBlockID, !1),
      _ = !1;
    if (null == A) return this.UpdateLineHops(!0),
      1;
    GlobalData.optManager.FixAnyCircularHooks();
    var E = this.GetObjectPtr(this.theSEDSessionBlockID, !1),
      w = GlobalData.docHandler.documentConfig.enableSnap;
    for (
      GlobalData.docHandler.documentConfig.enableSnap = !1,
      a = A.length - 1;
      a >= 0 &&
      !(a >= A.length);
      a--
    ) A[a].flags & R.LinkFlags.SED_L_DELT ? (
      _ ||
      (A = this.GetObjectPtr(this.theLinksBlockID, !0), _ = !0),
      this.DeleteLink(A, A[a].targetid, - 1, null, 0, !1),
      a = A.length
    ) : (
      A[a].flags & R.LinkFlags.SED_L_DELL ||
      A[a].flagss & R.LinkFlags.SED_L_BREAK ||
      null == (D = this.GetObjectPtr(A[a].hookid, !1))
    ) &&
    (
      _ ||
      (A = this.GetObjectPtr(this.theLinksBlockID, !0), _ = !0),
      this.DeleteLink(A, A[a].targetid, A[a].hookid, A[a].cellid, 0, !1),
      a = A.length
    );
    if (
      E.flags & R.SessionFlags.SEDS_NoTreeOverlap ||
      E.flags & R.SessionFlags.SEDS_IsFlowChart
    ) {
      var F;
      t = A.length;
      var v = {
        topconnector: - 1,
        topshape: - 1,
        foundtree: !1
      };
      for (a = 0; a < t; a++) (F = A[a].flags & R.LinkFlags.SED_L_MOVE) &&
        (
          i = this.GetObjectPtr(A[a].targetid, !1),
        /*Business.FindTreeTop(i, F, v)*/1 &&
          v.topshape >= 0 &&
          GlobalData.optManager.SetLinkFlag(v.topshape, ConstantData.LinkFlags.SED_L_MOVE),
          v.topshape = - 1,
          v.foundtree = !1
        )
    }
    for (; f;) for (f = !1, a = 0; a < A.length; a++) if (A[a].flags & R.LinkFlags.SED_L_MOVE) if (
      _ ||
      (A = this.GetObjectPtr(this.theLinksBlockID, !0), _ = !0),
      null == (D = this.GetObjectPtr(A[a].hookid, !0))
    ) A[a].flags = Utils2.SetFlag(A[a].flags, R.LinkFlags.SED_L_DELL, !0),
      A[a].flags = Utils2.SetFlag(A[a].flags, R.LinkFlags.SED_L_MOVE, !1),
      I = !0;
    else if ((h = this.VerifyLink(D, A[a])) >= 0) {
      if (
        D.LinkNotVisible(),
        g = this.GetObjectPtr(A[a].targetid, !1),
        D.objecttype === ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY &&
        (
          A[a].flags = Utils2.SetFlag(A[a].flags, R.LinkFlags.SED_L_CHANGE, !1)
        ),
        A[a].flags & R.LinkFlags.SED_L_CHANGE
      ) {
        if (
          n = D.HookToPoint(D.hooks[h].hookpt, null),
          T = ConstantData.HookFlags.SED_LC_NoSnaps | ConstantData.HookFlags.SED_LC_ForceEnd,
          T = Utils2.SetFlag(
            T,
            ConstantData.HookFlags.SED_LC_ShapeOnLine,
            !(D instanceof BaseLine)
          ),
          o = g.GetTargetPoints(n, T, D.BlockID)
        ) {
          for (s = o.length, d = null, l = 0; l < s; l++) c = (p = o[l].x - D.hooks[h].connect.x) * p + (u = o[l].y - D.hooks[h].connect.y) * u,
            (null == d || c < d) &&
            (d = c, S = l);
          null != S &&
            (
              D.hooks[h].connect.x = o[S].x,
              D.DrawingObjectBaseClass != ConstantData.DrawingObjectBaseClass.CONNECTOR &&
              (D.hooks[h].connect.y = o[S].y)
            )
        }
        D.hooks[h].hookpt = g.GetBestHook(A[a].hookid, D.hooks[h].hookpt, D.hooks[h].connect),
          A[a].flags = Utils2.SetFlag(A[a].flags, R.LinkFlags.SED_L_CHANGE, !1)
      }
      if (null == (b = D.HookToPoint(D.hooks[h].hookpt, null))) continue;
      null != g &&
        (
          M[0].x = D.hooks[h].connect.x,
          M[0].y = D.hooks[h].connect.y,
          M = g.GetPerimPts(A[a].targetid, M, D.hooks[h].hookpt, !1, A[a].cellid, A[a].hookid),
          1 === D.hooks.length ? (
            p = M[0].x - b.x,
            Math.abs(p) < 0.1 &&
            (p = 0),
            u = M[0].y - b.y,
            Math.abs(u) < 0.1 &&
            (u = 0),
            (p || u) &&
            (
              this.OffsetShape(
                A[a].hookid,
                p,
                u,
                ConstantData.ActionTriggerType.UPDATELINKS
              ),
              (
                (e = D.Frame).x < 0 ||
                e.y < 0 ||
                e.x + e.width > E.dim.x ||
                e.y + e.height > E.dim.y
              ) &&
              (
                L = !0,
                r = this.GetTargetNode(A[a].hookid),
                (i = this.GetObjectPtr(r, !1)) &&
                (
                  i.flags = Utils2.SetFlag(i.flags, ConstantData.ObjFlags.SEDO_Bounds, !0)
                )
              )
            )
          ) : 2 === D.hooks.length &&
          D.LinkGrow(A[a].hookid, D.hooks[h].hookpt, M[0])
        ),
        A[a].flags = Utils2.SetFlag(A[a].flags, R.LinkFlags.SED_L_MOVE, !1),
        f = !0
    } else I = !0;
    if (I) for (a = A.length - 1; a >= 0 && !(a >= A.length); a--) A[a].flags & R.LinkFlags.SED_L_DELT ? (this.DeleteLink(A, A[a].targetid, - 1, null, 0, !1), a = A.length) : (
      A[a].flags & R.LinkFlags.SED_L_DELL ||
      A[a].flagss & R.LinkFlags.SED_L_BREAK ||
      null == (D = this.GetObjectPtr(A[a].hookid, !1))
    ) &&
      (
        this.DeleteLink(A, A[a].targetid, A[a].hookid, A[a].cellid, 0, !1),
        a = A.length
      );
    if (L) {
      var G = this.ZList();
      for (this.InitializeAutoGrowDrag(), t = G.length, a = 0; a < t; a++) if (
        (C = this.GetObjectPtr(G[a], !1)) &&
        C.flags & ConstantData.ObjFlags.SEDO_Bounds &&
        (
          C.flags = Utils2.SetFlag(C.flags, ConstantData.ObjFlags.SEDO_Bounds, !1),
          m = this.GetMoveList(G[a], !1, !0, !1, P, !1),
          p = 0,
          P.x + P.width > E.dim.x &&
          (p = E.dim.x - (P.x + P.width)),
          p < - P.x &&
          (p = - P.x),
          u = 0,
          P.y + P.height > E.dim.y &&
          (u = E.dim.y - (P.y + P.height)),
          u < - P.y &&
          (u = - P.y),
          y = m.length,
          (p || u) &&
          y
        )
      ) for (l = 0; l < y; l++) this.OffsetShape(m[l], p, u, ConstantData.ActionTriggerType.UPDATELINKS);
      this.theMoveList = null
    }
    return GlobalData.docHandler.documentConfig.enableSnap = w,
      0
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
    if (Collab.NoRedrawFromSameEditor) {
      this.theDirtyList.length = 0;
      Collab.NoRedrawFromSameEditor = false;
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
    const visioTextFlag = ConstantData.ObjMoreFlags.SED_MF_VisioText;

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
          // Handle Visio text objects
          if (object.moreflags & visioTextFlag && object.hooks.length > 0) {
            objectId = object.hooks[0].objid;
          }

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

  GetMoveList(e, t, a, r, i, n) {
    var o,
      s;
    this.theMoveList = [];
    var l,
      S,
      c,
      u,
      p,
      d,
      D,
      g = this.GetObjectPtr(this.theLinksBlockID, !1);
    if (null == g) return this.theMoveList;
    if (
      c = n ? ConstantData.ListCodes.SED_LC_TARGONLY : ConstantData.ListCodes.SED_LC_MOVETARG,
      e >= 0 &&
      (
        (s = this.GetObjectPtr(e, !1)) &&
        (S = s.GetHookFlags()),
        S & ConstantData.HookFlags.SED_LC_MoveTarget &&
        t &&
        s.hooks.length &&
        (e = this.GetTargetNode(s.hooks[0].objid))
      ),
      t ||
      r
    ) for (
        l = r ? this.ActiveVisibleZList().slice(0) : this.GetObjectPtr(this.theSelectedListBlockID, !1).slice(0),
        o = 0;
        o < l.length;
        o++
      ) if (s = this.GetObjectPtr(l[o], !1)) {
        if (
          s.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT_LABEL
        ) {
          - 1 === l.indexOf(s.associd) &&
            l.push(s.associd);
          continue
        } (0 === s.hooks.length || a) &&
          (
            this.theMoveList = this.GetHookList(g, this.theMoveList, l[o], s, c, i)
          )
      }
    if (
      e >= 0 &&
      (s = this.GetObjectPtr(e, !1)) &&
      (0 === s.hooks.length || a) &&
      (
        this.theMoveList = this.GetHookList(g, this.theMoveList, e, s, c, i)
      ),
      a
    ) for (u = this.theMoveList.length, o = 0; o < u; o++) for (

      //Double add var before s
      var s = this.GetObjectPtr(this.theMoveList[o], !1),
      list = s.GetListOfEnclosedObjects(!0),
      p = list.length,
      d = 0;
      d < p;
      d++
    ) D = list[d],
      this.theMoveList.indexOf(D) < 0 &&
      this.theMoveList.push(D);
    return this.theMoveList
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
    this.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDragStart);
    this.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick);

    // Clear any modal operations
    this.SetModalOperation(ConstantData2.ModalOperations.NONE);

    console.log('O.Opt ResetObjectDraw - Output: Object draw state reset');
  }

  LM_MoveClick(e) {
    console.log('ListManager.LM.prototype.LM_MoveClick e=>', e);

    if (
      GlobalData.optManager.IsWheelClick(e) ||
      ConstantData.DocumentContext.SpacebarDown
    ) return EvtUtil.Evt_WorkAreaHammerDragStart(e),
      void Utils2.StopPropagationAndDefaults(e);
    Utils2.StopPropagationAndDefaults(e);
    try {
      ConstantData.DocumentContext.HTMLFocusControl &&
        ConstantData.DocumentContext.HTMLFocusControl.blur &&
        ConstantData.DocumentContext.HTMLFocusControl.blur(),
        this.NudgeOpen &&
        GlobalData.optManager.CloseOpenNudge();
      var t = this.LM_SetupMove(e);
      if (1 != t) return - 1 === t ? void Collab.UnLockMessages() : (
        Collab.UnLockMessages(),
        void Collab.UnBlockMessages()
      );
      Collab.UnLockMessages(),
        this.currentModalOperation === ConstantData2.ModalOperations.NONE &&
        GlobalData.optManager.SetEditMode(ConstantData.EditState.DRAGSHAPE),
        GlobalData.optManager.WorkAreaHammer.on('drag', EvtUtil.Evt_ShapeDrag),
        GlobalData.optManager.WorkAreaHammer.on('dragend', EvtUtil.Evt_ShapeDragEnd)
    } catch (e) {
      GlobalData.optManager.LM_Move_ExceptionCleanup(e);
      GlobalData.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  SetControlDragMode(element) {
    console.log("O.Opt SetControlDragMode - Input:", element);

    const cursorType = element.GetCursor();
    this.SetEditMode(ConstantData.EditState.DRAGCONTROL, cursorType);

    console.log("O.Opt SetControlDragMode - Output: Mode set to DRAGCONTROL with cursor", cursorType);
  }

  HideOverlayLayer() {
    this.svgOverlayLayer.SetVisible(false)
  }

  LM_SetupMove(e) {


    console.log('===== ListManager.LM.prototype.LM_SetupMove =====', e);
    // debugger
    var t,
      a,
      r,
      i = null,
      n = null,
      o = null,
      s = !1,
      l = ConstantData.ObjectTypes;
    if (
      GlobalData.optManager.MoveDuplicated = !1,
      null == (
        t = this.svgObjectLayer.FindElementByDOMElement(e.currentTarget)
      )
    ) return !1;
    a = t.GetTargetForEvent(e),
      this.theEventTimestamp = Date.now(),
      Utils2.StopPropagationAndDefaults(e);
    var S = t.GetID(),
      c = GlobalData.optManager.GetObjectPtr(S, !1);
    if (!(c && c instanceof BaseDrawingObject)) return !1;
    if (this.bInDimensionEdit) return this.CloseEdit(!1, !0),
      this.bInDimensionEdit = !1,
      !1;
    if (
      a instanceof Text &&
      (
        a.ID === ConstantData.SVGElementClass.DIMENSIONTEXT ||
        a.ID === ConstantData.SVGElementClass.DIMENSIONTEXTNOEDIT
      )
    ) return !1;
    if (
      a instanceof Image &&
      this.UserDataisIcon(a.GetUserData())
    ) return !1;
    if (
      Collab.AllowMessage() &&
      (Collab.LockMessages(), Collab.BeginSecondaryEdit()),
      this.currentModalOperation === ConstantData2.ModalOperations.FORMATPAINTER
    ) {
      if (r = t.GetID(), this.FormatPainterClick(r, e)) return !1;
      t = this.svgObjectLayer.GetElementByID(r)
    }
    // SDUI.Commands.MainController.GetToolSetting();
    var u,
      p = this.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
    if (
      this.currentModalOperation !== ConstantData2.ModalOperations.FORMATPAINTER ||
      this.FormatPainterMode !== ConstantData2.FormatPainterModes.OBJECT
    ) {
      var d = t.GetTargetForEvent(e),
        D = d.GetID(),
        g = d.GetUserData();
      this.theDragTargetID = t.GetID(),
        // this.theDragTargetID = this.SD_GetVisioTextParent(this.theDragTargetID),
        this.theDragTargetID = this.GetEventShapeParent(this.theDragTargetID),
        this.theDragTargetID = Business.SelectContainerParent(this.theDragTargetID),
        i = GlobalData.objectStore.GetObject(this.theDragTargetID);
      var h = this.IsRightClick(e);
      if (i) {
        if ((n = i.Data).IsSwimlane()) if (D === ConstantData.Defines.TableCellNoHit) {
          o = n.GetTable(!1);
          var m = this.Table_GetCellClicked(n, e);
          if (
            m >= 0 &&
            o.cells[m].flags & ListManager.Table.CellFlags.SDT_F_NoText &&
            !h
          ) return GlobalData.optManager.StartRubberBandSelect(e),
            !1
        } else if (
          n.objecttype === l.SD_OBJT_FRAME_CONTAINER &&
          D === ConstantData.SVGElementClass.SHAPE &&
          !h
        ) return GlobalData.optManager.StartRubberBandSelect(e),
          !1;
        if (
          s = (n.TextFlags & ConstantData.TextFlags.SED_TF_OneClick) > 0,
          h
        ) s = !1;
        else if (n.flags & ConstantData.ObjFlags.SEDO_Lock) return this.SelectObjectFromClick(e, t),
          !1
      }
      var C = this.Table_GetActiveID();
      if (o = n.GetTable(!1), C === this.theDragTargetID || s && null != o) switch (D) {
        case ConstantData.SVGElementClass.SHAPE:
        case ConstantData.Defines.TableSelection:
        case ConstantData.Defines.TableCells:
          var y = this.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
          Utils2.pointInRect(n.trect, y) &&
            (D = ConstantData.Defines.TableCellHit);
          break;
        case ConstantData.SVGElementClass.TEXT:
          g >= 0 &&
            (D = ConstantData.Defines.TableTextHit);
          break;
        case ConstantData.SVGElementClass.SLOP:
        case ConstantData.SVGElementClass.BACKGROUNDIMAGE:
        case ConstantData.SVGElementClass.GANTTGRIDHEADERLINE:
        case ConstantData.SVGElementClass.GANTTGRIDHEADERTEXT:
        case ConstantData.SVGElementClass.GANTTGRIDTITLELINE:
        case ConstantData.SVGElementClass.GANTTGRIDTITLETEXT:
        case ConstantData.SVGElementClass.GANTTGRIDHOTSPOT:
          s = !1
      } else switch (D) {
        case ConstantData.Defines.TableRowHitHidden:
        case ConstantData.Defines.TableRowHit:
        case ConstantData.Defines.TableRowSelection:
        case ConstantData.Defines.TableColHit:
        case ConstantData.Defines.TableColHitHidden:
        case ConstantData.Defines.TableColSelection:
        case ConstantData.Defines.TableCellHit:
        case ConstantData.Defines.TableCells:
        case ConstantData.SVGElementClass.BACKGROUNDIMAGE:
          D = '';
          break;
        case ConstantData.SVGElementClass.SLOP:
          this.DeactivateAllTextEdit(!1),
            s = !1
      }
      switch (D) {
        case ConstantData.Defines.GraphTextHit:
          return this.Graph_SetupAction(e, this.theDragTargetID, D, g),
            !1;
        case ConstantData.SVGElementClass.BACKGROUNDIMAGE:
        case ConstantData.Defines.TableCellHit:
        case ConstantData.Defines.TableTextHit:
        case ConstantData.Defines.TableCells:
        case ConstantData.Defines.TableRowZone:
        case ConstantData.Defines.TableColZone:
          return !0 === this.Table_SetupAction(e, this.theDragTargetID, D, g) ||
            - 1;
        case ConstantData.Defines.TableRowHitHidden:
        case ConstantData.Defines.TableRowHit:
        case ConstantData.Defines.TableRowSelection:
          if (n && this.Table_HideUI(n)) return !1;
          var f = d.GetUserData();
          return this.Table_SetupAction(
            e,
            this.theDragTargetID,
            ConstantData.Defines.TableRowHit,
            f
          ),
            !1;
        case ConstantData.Defines.TableColHit:
        case ConstantData.Defines.TableColHitHidden:
        case ConstantData.Defines.TableColSelection:
          if (n && this.Table_HideUI(n)) return !1;
          var L = d.GetUserData();
          return this.Table_SetupAction(
            e,
            this.theDragTargetID,
            ConstantData.Defines.TableColHit,
            L
          ),
            !1;
        case ConstantData.Defines.HitAreas:
          return u = d.GetUserData(),
            this.LM_HitAreaClick(this.theDragTargetID, u),
            e.gesture &&
            e.gesture.stopDetect(),
            !1
      }
      if (s) return GlobalData.optManager.ActivateTextEdit(t.svgObj.SDGObj, e, !1),
        !1
    }
    if (o && i && this.Table_CloseEdit(i, o)/*, this.Table_Release(!1)*/) {
      var I = this.GetObjectPtr(this.theSelectedListBlockID, !1);
      this.UpdateSelectionAttributes(I)
    }
    if (!this.SelectObjectFromClick(e, t, !0)) return !1;
    if (null == (i = GlobalData.objectStore.GetObject(this.theDragTargetID))) return !1;
    if (
      (n = i.Data).objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR &&
      (n.datasetElemID >= 0 && this.GanttGetParentID(n.datasetElemID) < 0)
    ) return !1;
    if (
      this.HideAllSVGSelectionStates(),
      this.InitializeAutoGrowDrag(),
      n.InterceptMoveOperation(e)
    ) return !1;
    var T = {},
      b = {},
      M = {};
    if (
      this.IsLoneFlowchartShape(n, M) &&
      (this.theDragTargetID = M.id),
      this.IsConnectorEndShape(n, null, T) ? this.theDragTargetID = T.id : this.IsGenogramPartner(n, b) &&
        (this.theDragTargetID = b.id),
      this.theMoveBounds = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      this.PinRect = null,
      this.Dynamic_Guides = new DynamicGuides(),
      n.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR
    ) this.theMoveBounds = n.GetMoveRect(!1, !1),
      (P = []).push(this.theDragTargetID),
      this.PinRect = {},
      this.PinRect = n.AdjustPinRect(this.PinRect, !0);
    else var P = this.GetMoveList(this.theDragTargetID, !0, !0, !1, this.theMoveBounds, !1);
    var R = 0;
    P &&
      (R = P.length),
      this.theDragStartX = p.x,
      this.theDragStartY = p.y;
    var A = 0;
    this.theDragBBoxList = [],
      this.theDragElementList = [];
    var _ = - 1,
      E = null;
    this.dragGotMove = !1,
      this.InitializeAutoGrowDrag();
    var w = [],
      F = - 1;
    for (A = 0; A < R; ++A) _ = P[A],
      (n = this.GetObjectPtr(_, !1)) &&
      (
        n instanceof Connector ||
        n.flags & ConstantData.ObjFlags.SEDO_NotVisible ||
        w.push(_)
      );
    for (A = 0; A < R; ++A) _ = P[A],
      (n = this.GetObjectPtr(_, !1)) instanceof Connector &&
      (
        n.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn ? w.push(_) : n.hooks.length ? (
          F = n.hooks[0].objid,
          this.GetObjectPtr(F) instanceof Connector ? n.flags & ConstantData.ObjFlags.SEDO_NotVisible ||
            w.push(_) : n.flags & ConstantData.ObjFlags.SEDO_NotVisible &&
            (!n.hooks || - 1 == w.indexOf(F)) ||
          w.push(_)
        ) : n.flags & ConstantData.ObjFlags.SEDO_NotVisible ||
        w.push(_)
      );
    for (R = (P = w).length, this.theMoveList = P, A = 0; A < R; ++A) _ = P[A],
      E = (n = this.GetObjectPtr(_, !1)).GetSVGFrame(),
      this.theDragBBoxList.push(E),
      this.theDragElementList.push(_),
      GlobalData.docHandler.documentConfig.enableSnap &&
      _ == this.theDragTargetID &&
      (this.theDragTargetBBox = $.extend(!0, {
      }, E));
    return this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto &&
      (
        this.theDragEnclosingRect = GlobalData.optManager.GetListSRect(this.theMoveList)
      ),
      this.LM_MovePreTrack(P, e),
      !0
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
    Collab.UnLockMessages();
    Collab.UnBlockMessages();

    console.log('O.Opt LM_Move_ExceptionCleanup - Output: Cleanup completed');

    // Re-throw the exception after cleanup
    throw error;
  }

  UnbindShapeMoveHammerEvents() {
    console.log('O.Opt UnbindShapeMoveHammerEvents - Input: No parameters');

    if (GlobalData.optManager.WorkAreaHammer) {
      GlobalData.optManager.WorkAreaHammer.off('drag');
      GlobalData.optManager.WorkAreaHammer.off('dragend');
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

  LM_MovePreTrack(e, t) {
    GlobalData.optManager.GetObjectPtr(this.theSEDSessionBlockID, !1);
    var a,
      r = t.gesture &&
        t.gesture.srcEvent &&
        t.gesture.srcEvent.altKey;
    (
      this.LinkParams = new LinkParameters(),
      this.LinkParams.AutoInsert = this.AllowAutoInsert(),
      this.LinkParams.AutoInsert
    ) &&
      (
        this.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1).length > 1 &&
        (this.LinkParams.AutoInsert = !1),
        t.gesture &&
        t.gesture.srcEvent &&
        t.gesture.srcEvent.altKey
      );
    if (null != (a = this.GetObjectPtr(this.theDragTargetID, !1))) {
      GlobalData.optManager.ob = Utils1.DeepCopy(a),
        1 === a.hooks.length &&
        0 == (
          a.GetHookFlags() & ConstantData.HookFlags.SED_LC_MoveTarget
        ) &&
        e.indexOf(a.hooks[0].objid) < 0 &&
        (
          this.LinkParams.ConnectIndex = a.hooks[0].objid,
          this.LinkParams.PrevConnect = a.hooks[0].objid,
          this.LinkParams.ConnectIndexHistory.push(a.hooks[0].objid),
          this.LinkParams.ConnectPt.x = a.hooks[0].connect.x,
          this.LinkParams.ConnectPt.y = a.hooks[0].connect.y,
          this.LinkParams.ConnectInside = a.hooks[0].cellid,
          this.LinkParams.HookIndex = a.hooks[0].hookpt,
          this.LinkParams.InitialHook = 0
        );
      var i = this.GetObjectPtr(this.theLinksBlockID, !1);
      if (
        this.LinkParams.lpCircList = this.GetHookList(
          i,
          this.LinkParams.lpCircList,
          this.theDragTargetID,
          a,
          ConstantData.ListCodes.SED_LC_CIRCTARG,
          {
          }
        ),
        this.JoinHookList(this.LinkParams.lpCircList, e),
        this.LinkParams.AutoInsert &&
        a instanceof BaseShape &&
        this.HealLine(a, !0, null) > 0 &&
        1 == r &&
        (
          this.LinkParams.lpCircList = [],
          this.LinkParams.lpCircList.push(this.theDragTargetID),
          this.theMoveList = [],
          this.theMoveList.push(this.theDragTargetID),
          this.LinkParams.AutoHeal = !0
        ),
        this.AllowSnapToShapes()
      ) {
        var n = a.GetSnapRect(),
          o = $.extend(!0, {
          }, n);
        o.x += GlobalData.optManager.theDragDeltaX,
          o.y += GlobalData.optManager.theDragDeltaY;
        var s = {},
          l = a.CanSnapToShapes(s);
        if (l >= 0) {
          n = this.GetObjectPtr(l, !1).GetSnapRect(),
            sobj_theRect = $.extend(!0, {
            }, n);
          var S = new DynamicGuides(),
            c = [];
          c.push(this.theDragTargetID);
          this.DynamicSnaps_GetSnapObjects(l, sobj_theRect, S, c, null, s);
          S &&
            this.DynamicSnaps_UpdateGuides(S, l, sobj_theRect)
        }
      }
    }
  }

  AllowAutoInsert() {
    return GlobalData.gBusinessManager.AllowAutoInsert()
  }

  JoinHookList(e, t) {
    if (null != e && null != t) for (var a = 0; a < t.length; a++) e.indexOf(t[a]) < 0 &&
      e.push(t[a])
  }

  AllowSnapToShapes() {
    GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    return GlobalData.docHandler.documentConfig.snapToShapes
  }

  CheckDragIsOverCustomLibrary(e) {
    return false;
    return null != e &&
      (
        null != SDUI.Commands.MainController.Symbols &&
        !0 === SDUI.Commands.MainController.Symbols.IsCursorOverSymbolLibraryGallery(e.gesture.center.clientX, e.gesture.center.clientY, !0)
      )
  }

  LM_MoveTrack(e, t) {

    console.log(' ===========       ListManager.LM.prototype.LM_MoveTrack e, t=> ======', e, t);

    var a;
    if (!(Date.now() - this.theEventTimestamp < 250)) {
      if (!this.dragGotMove) {
        var r = this.theMoveList;
        if (r && r.length) {
          if (this.DragDuplicate(e)) {
            var i = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !0),
              n = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !0);
            for (i.length = 0, p = 0; p < r.length; p++) i.push(r[p]);
            var o = this.GetObjectPtr(this.theDragTargetID, !1),
              s = - 1,
              l = null;
            o &&
              (l = o.Frame, s = o.DrawingObjectBaseClass);
            var S,
              c = this.DuplicateObjects(!0);
            for (i.length = 0, p = 0; p < c.length; p++) i.push(c[p]);
            for (
              GlobalData.optManager.MoveDuplicated = !0,
              this.theMoveList.length = 0,
              this.theDragElementList.length = 0,
              this.theDragBBoxList.length = 0,
              this.LinkParams.lpCircList = [],
              this.LinkParams.InitialHook = - 1,
              p = c.length - 1;
              p >= 0;
              p--
            ) null != (d = this.GetObjectPtr(c[p], !1)) &&
              (
                this.theMoveList.push(c[p]),
                this.LinkParams.lpCircList.push(c[p]),
                this.theDragElementList.push(c[p]),
                S = d.GetSVGFrame(),
                l &&
                Utils2.EqualRect(S, l, 2) &&
                d.DrawingObjectBaseClass === s &&
                (this.theDragTargetID = c[p], n.tselect = c[p]),
                this.theDragBBoxList.push(S)
              );
            r = this.theMoveList
          }
          for (var u = r.length, p = 0; p < u; ++p) {
            var d,
              D = r[p];
            (d = this.GetObjectPtr(D, !1)) &&
              d.RemoveDimensionLines(this.svgObjectLayer.GetElementByID(D))
          }
        }
      }
      if (
        this.dragGotMove = !0,
        a = this.LinkParams &&
        this.LinkParams.ConnectIndex >= 0,
        t
      ) this.ResetAutoScrollTimer();
      else if (!this.AutoScrollCommon(e, !a, 'HandleObjectDragDoAutoScroll')) return;
      var g = this.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
      g = this.LM_MoveDuringTrack(g, e),
        this.HandleObjectDragMoveCommon(g.x, g.y, t, e)
    }
  }

  LM_MoveRelease(e, t) {
    var a,
      r,
      i,
      n,
      o = !1;
    if (
      !t &&
      (
        Utils2.StopPropagationAndDefaults(e),
        GlobalData.optManager.UnbindShapeMoveHammerEvents(),
        this.ResetAutoScrollTimer(),
        GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
        this.DynamicSnapsRemoveGuides(this.Dynamic_Guides),
        this.Dynamic_Guides = null,
        !this.dragGotMove ||
        this.CheckDragIsOverCustomLibrary(e)
      )
    ) {
      if (this.CheckDragIsOverCustomLibrary(e)) {
        var s,
          l,
          S = this.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1);
        for (s = this.theMoveList.length, a = 0; a < s; a++) l = this.theMoveList[a],
          - 1 === S.indexOf(l) &&
          S.push(l);
        for (n = 0, (i = this.theMoveList) && (n = i.length), a = 0; a < n; a++) r = i[a],
          this.AddToDirtyList(r);
        this.RenderDirtySVGObjects()
      }
      return this.LM_MovePostRelease(!1),
        this.RenderAllSVGSelectionStates(),
        this.theMoveList = null,
        void Collab.UnBlockMessages()
    }
    if (n = 0, (i = this.theMoveList) && (n = i.length), 0 !== n) {
      var c = null,
        u = {},
        p = {
          theMoveList: [],
          thePointList: [],
          theDragDeltaX: this.theDragDeltaX,
          MoveDuplicated: GlobalData.optManager.MoveDuplicated
        };
      for (a = 0; a < n; ++a) {
        r = i[a];
        var d = GlobalData.objectStore.GetObject(r).Data;
        if (t || (c = this.theDragBBoxList[a]), c || t) {
          if (
            t ? u = t.Data.thePointList[a] : (u.x = c.x + this.theDragDeltaX, u.y = c.y + this.theDragDeltaY),
            d.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
            null == d.polylist &&
            d.StyleRecord.Line.BThick &&
            (
              u.x += d.StyleRecord.Line.BThick,
              u.y += d.StyleRecord.Line.BThick
            ),
            t
          ) {
            var D = 'note_' + r,
              g = this.svgHighlightLayer.GetElementByID(D);
            if (g) {
              var h = g.GetPos(),
                m = u.x - d.Frame.x,
                C = u.y - d.Frame.y;
              h.x += m,
                h.y += C,
                g.SetPos(h.x, h.y)
            }
          }
          this.SetShapeOriginNoDirty(r, u.x, u.y),
            this.LinkParams.ConnectHookFlag === ConstantData.HookFlags.SED_LC_AutoInsert &&
            d.UpdateFrame(d.Frame),
            (
              d.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
              d.Dimensions & ConstantData.DimensionFlags.SED_DF_Select ||
              t ||
              d.Dimensions & ConstantData.DimensionFlags.SED_DF_Area
            ) &&
            this.AddToDirtyList(r),
            Collab.AllowMessage() &&
            (
              p.theMoveList.push(r),
              p.thePointList.push(Utils1.DeepCopy(u))
            )
        }
      }
      if (Collab.AllowMessage()) {
        p.LinkParams = Utils1.DeepCopy(GlobalData.optManager.LinkParams);
        var y = Collab.BuildMessage(ConstantData.CollabMessages.MoveObjects, p, !1, !0)
      }
      if (
        this.LM_MovePostRelease(!0, t),
        y &&
        (
          Collab.IsSecondary() &&
          Collab.CreateList.length &&
          (
            y.Data.CreateList = [],
            y.Data.CreateList = y.Data.CreateList.concat(Collab.CreateList)
          ),
          Collab.SendMessage(y)
        ),
        !t &&
        this.LastOpDuplicate
      ) {
        o = !0;
        var f = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !0);
        f.dupdisp.x += this.theDragDeltaX,
          f.dupdisp.y += this.theDragDeltaY
      }
      this.CompleteOperation(null),
        t ||
        (o && (this.LastOpDuplicate = !0), this.theMoveList = null)
    }
  }

  LM_MovePostRelease(e, t) {
    var a = !1,
      r = [];
    if (
      this.LinkParams &&
      this.LinkParams.HiliteConnect >= 0 &&
      (
        this.HiliteConnect(
          GlobalData.optManager.LinkParams.HiliteConnect,
          this.LinkParams.ConnectPt,
          !1,
          !1,
          this.theDragTargetID,
          this.LinkParams.ConnectPt,
          this.LinkParams.HiliteInside
        ),
        this.LinkParams.HiliteConnect = - 1,
        this.LinkParams.HiliteInside = null
      ),
      this.LinkParams &&
      this.LinkParams.HiliteJoin >= 0 &&
      (
        this.HiliteConnect(
          GlobalData.optManager.LinkParams.HiliteJoin,
          this.LinkParams.ConnectPt,
          !1,
          !0,
          this.theDragTargetID,
          null
        ),
        this.LinkParams.HiliteJoin = - 1
      ),
      t ||
      this.SetEditMode(ConstantData.EditState.DEFAULT),
      e
    ) {
      let e = GlobalData.optManager.GetObjectPtr(this.theDragTargetID);
      if (
        e.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT ||
        e.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT_LABEL
      ) {
        let e = this.theDragDeltaX,
          r = this.theMoveList;
        null != t?.Data?.theDragDeltaX &&
          (e = t.Data.theDragDeltaX),
          null != t?.Data?.theMoveList &&
          (r = t.Data.theMoveList),
          a = GlobalData.optManager.TimelineMoveEvent(this.theDragTargetID, r, e, !0)
      } else if (this.LinkParams.JoinIndex >= 0) this.PolyLJoin(
        this.LinkParams.JoinIndex,
        this.LinkParams.JoinData,
        this.theDragTargetID,
        this.LinkParams.JoinSourceData,
        !1
      );
      else if (
        this.LinkParams &&
        (
          this.LinkParams.ConnectIndex >= 0 ||
          this.LinkParams.InitialHook >= 0
        )
      ) GlobalData.gFlowChartManager &&
        (
          a = GlobalData.gFlowChartManager.FlowChartHook(
            this.theDragTargetID,
            this.LinkParams.InitialHook,
            this.LinkParams.ConnectIndex,
            this.LinkParams.HookIndex,
            this.LinkParams.ConnectPt
          )
        ),
        a ||
        (
          this.LinkParams.ConnectHookFlag === ConstantData.HookFlags.SED_LC_AutoInsert ? this.SD_AutoInsertShape(this.theDragTargetID, this.LinkParams.ConnectIndex) : this.LinkParams.ConnectHookFlag === ConstantData.HookFlags.SED_LC_HookReverse ? this.LM_ReverseHook(this.theDragTargetID) : (
            a = function () {
              var e = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1);
              if (e.length <= 1) return !1;
              var t,
                a,
                r,
                i,
                n,
                o,
                s,
                l,
                S = null;
              list = [],
                connect = [];
              var c = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theDragTargetID, !1);
              if (GlobalData.optManager.LinkParams.ConnectIndex >= 0) {
                if (
                  (
                    S = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.LinkParams.ConnectIndex, !1)
                  ) &&
                  S instanceof ShapeContainer
                ) {
                  a = GlobalData.optManager.LinkParams.ConnectIndex,
                    i = e.length;
                  var u = S.ContainerList.flags & ConstantData.ContainerListFlags.Sparse;
                  if (c.hooks.length && c.hooks[0].objid === a) for (r = 0; r < i; r++) (n = e[r]) !== GlobalData.optManager.theDragTargetID &&
                    (t = GlobalData.optManager.GetObjectPtr(n, !1)).hooks.length &&
                    t.hooks[0].objid === a &&
                    (
                      u ? (
                        s = GlobalData.optManager.LinkParams.ConnectPt.x - c.hooks[0].connect.x,
                        l = GlobalData.optManager.LinkParams.ConnectPt.y - c.hooks[0].connect.y,
                        (s || l) &&
                        (
                          list.push(n),
                          o = t.hooks[0].connect.x + s,
                          y = t.hooks[0].connect.y + l,
                          o < 0 &&
                          (o = 0),
                          connect.push({
                            x: o,
                            y: y
                          })
                        )
                      ) : (
                        (o = GlobalData.optManager.LinkParams.ConnectPt.x) < 0 &&
                        (o = 0),
                        list.push(n),
                        connect.push({
                          x: o,
                          y: GlobalData.optManager.LinkParams.ConnectPt.y + list.length
                        })
                      )
                    );
                  else for (r = 0; r < i; r++) (n = e[r]) !== GlobalData.optManager.theDragTargetID &&
                    (
                      t = GlobalData.optManager.GetObjectPtr(n, !1),
                      S.IsShapeContainer(t) &&
                      (
                        list.push(n),
                        (o = GlobalData.optManager.LinkParams.ConnectPt.x) < 0 &&
                        (o = 0),
                        connect.push({
                          x: o,
                          y: GlobalData.optManager.LinkParams.ConnectPt.y + list.length
                        })
                      )
                    )
                }
              } else if (
                c.hooks.length > 0 &&
                (
                  a = c.hooks[0].objid,
                  (S = GlobalData.optManager.GetObjectPtr(a, !1)) &&
                  S instanceof ShapeContainer
                )
              ) for (i = e.length, r = 0; r < i; r++) (n = e[r]) !== GlobalData.optManager.theDragTargetID &&
                (t = GlobalData.optManager.GetObjectPtr(n, !1)).hooks.length &&
                t.hooks[0].objid === a &&
                (
                  t.Frame.x,
                  t.Frame.width,
                  t.Frame.y,
                  list.push(n),
                  connect.push(t.hooks[0].connect)
                );
              if ((i = list.length) > 0) {
                for (
                  list.unshift(GlobalData.optManager.theDragTargetID),
                  connect.unshift(GlobalData.optManager.LinkParams.ConnectPt),
                  i++,
                  r = 0;
                  r < i;
                  r++
                ) n = list[r],
                  GlobalData.optManager.UpdateHook(
                    n,
                    GlobalData.optManager.LinkParams.InitialHook,
                    GlobalData.optManager.LinkParams.ConnectIndex,
                    GlobalData.optManager.LinkParams.HookIndex,
                    connect[r],
                    GlobalData.optManager.LinkParams.ConnectInside
                  ),
                  GlobalData.optManager.SetLinkFlag(
                    GlobalData.optManager.LinkParams.ConnectIndex,
                    ConstantData.LinkFlags.SED_L_MOVE
                  ),
                  GlobalData.optManager.CleanupHooks(
                    GlobalData.optManager.theDragTargetID,
                    GlobalData.optManager.LinkParams.ConnectIndex
                  );
                return !0
              }
              return !1
            }(),
            a ||
            (
              this.UpdateHook(
                this.theDragTargetID,
                this.LinkParams.InitialHook,
                this.LinkParams.ConnectIndex,
                this.LinkParams.HookIndex,
                this.LinkParams.ConnectPt,
                this.LinkParams.ConnectInside
              ),
              this.SetLinkFlag(
                this.LinkParams.ConnectIndex,
                ConstantData.LinkFlags.SED_L_MOVE
              ),
              this.CleanupHooks(this.theDragTargetID, this.LinkParams.ConnectIndex)
            )
          )
        );
      else {
        var i = Business.GetSelectionBusinessManager(this.theDragTargetID);
        null == i &&
          (i = GlobalData.gBusinessManager),
          i instanceof FloorPlan &&
          i.EnsureCubicleBehindOutline(this.theDragTargetID)
      }
      this.IsGanttBar(this.theDragTargetID) &&
        this.GanttAdjustBar(this.theDragTargetID, 0),
        t ||
        null != this.PostMoveSelectID &&
        (
          r.push(this.PostMoveSelectID),
          this.SelectObjects(r, !1, !1),
          this.PostMoveSelectID = null
        )
    }
    e &&
      this.UpdateLinks(),
      t ||
      (
        this.LinkParams = null,
        GlobalData.optManager.ob = {},
        this.theDragEnclosingRect = null,
        this.theDragElementList = [],
        this.theDragBBoxList = []
      )
  }


  DragDuplicate(e) {
    if (null == e) return !1;
    var t = e.ctrlKey;
    if (
      e.gesture &&
      e.gesture.srcEvent &&
      (t = e.gesture.srcEvent.ctrlKey),
      t
    ) {
      var a = this.GetObjectPtr(this.theDragTargetID, !1),
        r = ConstantData.ObjectTypes,
        i = ConstantData.ObjectSubTypes;
      if (a) {
        switch (a.objecttype) {
          case r.SD_OBJT_MINDMAP_MAIN:
          case r.SD_OBJT_GANTT_CHART:
          case r.SD_OBJT_GANTT_BAR:
          case r.SD_OBJT_MINDMAP_CONNECTOR:
            t = !1
        }
        if (a.subtype === i.SD_SUBT_TASK) t = !1;
        a.datasetElemID >= 0 &&
          (t = !1)
      }
    }
    return 1 == t
  }

  LM_MoveDuringTrack(e) {

    console.log(' ===========       ListManager.LM.prototype.LM_MoveDuringTrack e=> ======', e);

    var t,
      a,
      r,
      i,
      n,
      o,
      s = {},
      l = [];
    if (this.theDragTargetID < 0) return e;
    if (null == (a = this.GetObjectPtr(this.theDragTargetID, !1))) return e;
    if (
      this.LinkParams &&
      this.LinkParams.AutoHeal &&
      (
        n = Math.abs(e.x - this.theDragStartX),
        o = Math.abs(e.y - this.theDragStartY),
        n > 50 ||
        o > 50 ||
        this.LinkParams.AutoInsert &&
        this.LinkParams.ConnectIndex >= 0
      )
    ) {
      i = this.HealLine(a, !1, l),
        this.LinkParams.AutoHeal = !1,
        this.LinkParams.AutoHealID = a.BlockID,
        i >= 0 &&
        (l.push(i), this.DeleteObjects(l, !1));
      var S = this.theDirtyList.indexOf(this.theDragTargetID);
      S >= 0 &&
        this.theDirtyList.splice(S, 1),
        this.RenderDirtySVGObjects(),
        S >= 0 &&
        this.AddToDirtyList(this.theDragTargetID);
      this.GetMoveList(this.theDragTargetID, !0, !0, !1, this.theMoveBounds, !1)
    }
    if (
      this.PinRect &&
      this.PinMoveRect(e),
      r = this.Move_GetHookPoints(
        this.theDragTargetID,
        a,
        e.x - this.theDragStartX,
        e.y - this.theDragStartY
      )
    ) {
      if (
        this.theDragDeltaX = 0,
        this.theDragDeltaY = 0,
        GlobalData.optManager.LinkParams.DropOnLine ||
        GlobalData.optManager.LinkParams.AutoInsert
      ) {
        (s = $.extend(!0, {
        }, a.Frame)).x += e.x - this.theDragStartX,
          s.y += e.y - this.theDragStartY;
        var c = a.Frame;
        if (
          a.Frame = s,
          t = this.FindConnect(
            this.theDragTargetID,
            a,
            GlobalData.optManager.LinkParams.cpt,
            !0,
            !0,
            !1,
            e
          ),
          a.Frame = c,
          t
        ) return e.x += this.theDragDeltaX,
          e.y += this.theDragDeltaY,
          e
      }
      this.theDragDeltaX = 0,
        this.theDragDeltaY = 0,
        (
          (
            t = this.FindConnect(
              GlobalData.optManager.theDragTargetID,
              a,
              r,
              !0,
              !1,
              GlobalData.optManager.LinkParams.AllowJoin,
              e
            )
          ) ||
          GlobalData.optManager.LinkParams.JoinIndex >= 0
        ) &&
        (e.x += this.theDragDeltaX, e.y += this.theDragDeltaY)
    }
    return e
  }



  Move_GetHookPoints(e, t, a, r) {
    var i,
      n = [],
      o = [],
      s = [],
      l = !1,
      S = !1,
      c = !1,
      u = ConstantData.ExtraFlags,
      p = ConstantData.Defines.SED_CDim;
    if (null == t) return null;
    if (null == this.LinkParams) return null;
    if (t.hooks && 2 === t.hooks.length) return null;
    if (t.flags & ConstantData.ObjFlags.SEDO_Assoc) return null;
    if (t.PreventLink()) return null;
    if (
      !t.AllowLink() &&
      this.LinkParams &&
      (this.LinkParams.ArraysOnly = !0),
      (i = this.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1)) &&
      (
        l = i.flags & ConstantData.SessionFlags.SEDS_AttLink &&
        t.hookflags & ConstantData.HookFlags.SED_LC_AttachToLine,
        S = i.flags & ConstantData.SessionFlags.SEDS_FreeHand,
        c = this.AllowAutoInsert()
      ),
      (
        l = !!(
          t.flags & ConstantData.ObjFlags.SEDO_DropOnBorder ||
          t.flags & ConstantData.ObjFlags.SEDO_DropOnTable
        )
      ) ||
      c
    ) {
      if (
        l &&
        (this.LinkParams.DropOnLine = !0),
        o.push(new Point(t.attachpoint.x, t.attachpoint.y)),
        t.extraflags & (u.SEDE_FlipHoriz | u.SEDE_FlipVert)
      ) {
        var d = new Rectangle(0, 0, p, p);
        GlobalData.optManager.FlipPoints(d, t.extraflags, o)
      }
      this.LinkParams.cpt = t.GetPerimPts(e, o, ConstantData.HookPts.SED_KAT, !1, null, - 1),
        this.LinkParams.cpt[0].id = ConstantData.HookPts.SED_KAT,
        this.LinkParams.cpt[0].x += a,
        this.LinkParams.cpt[0].y += r
    }
    t.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE &&
      (
        s.push(new Point(p / 2, 0)),
        this.LinkParams.ContainerPt = t.GetPerimPts(e, s, ConstantData.HookPts.SED_KAT, !1, null, - 1),
        this.LinkParams.ContainerPt[0].id = ConstantData.HookPts.SED_KAT,
        this.LinkParams.ContainerPt[0].x += a,
        this.LinkParams.ContainerPt[0].y += r
      ),
      this.LinkParams.AllowJoin = S &&
      t.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE,
      n = t.GetHookPoints(!0),
      n = t.GetPerimPts(e, n, 0, !1, null, - 1);
    for (var D = 0; D < n.length; D++) n[D].x += a,
      n[D].y += r;
    return n
  }

  HandleObjectDragMoveCommon(e, t, a, r) {
    console.log('ListManager.LM.prototype.HandleObjectDragMoveCommon e, t, a, r=>', e, t, a, r);
    var i;
    function n() {
      GlobalData.optManager.theDragDeltaX < - GlobalData.optManager.theMoveBounds.x &&
        (GlobalData.optManager.theDragDeltaX = - GlobalData.optManager.theMoveBounds.x),
        GlobalData.optManager.theDragDeltaY < - GlobalData.optManager.theMoveBounds.y &&
        (GlobalData.optManager.theDragDeltaY = - GlobalData.optManager.theMoveBounds.y)
    }
    if (GlobalData.optManager.PinRect) {
      var o = {
        x: e,
        y: t
      };
      this.PinMoveRect(o),
        e = o.x,
        t = o.y
    }
    GlobalData.optManager.theDragDeltaX = e - GlobalData.optManager.theDragStartX,
      GlobalData.optManager.theDragDeltaY = t - GlobalData.optManager.theDragStartY,
      n();
    var s = {
      x: GlobalData.optManager.theDragDeltaX + GlobalData.optManager.theMoveBounds.x + GlobalData.optManager.theMoveBounds.width,
      y: GlobalData.optManager.theDragDeltaY + GlobalData.optManager.theMoveBounds.y + GlobalData.optManager.theMoveBounds.height
    };
    s = GlobalData.optManager.DoAutoGrowDrag(s);
    var l = this.theMoveList,
      S = 0;
    if (l && (S = l.length), 0 !== S) {
      var c,
        u = 0,
        p = null,
        d = null,
        D = {
          x: e,
          y: t
        },
        g = {},
        h = {};
      i = this.LinkParams &&
        (
          this.LinkParams.ConnectIndex >= 0 ||
          this.LinkParams.JoinIndex >= 0
        ) ||
        a;
      var m = this.EnhanceSnaps(r);
      this.OverrideSnaps(r) &&
        (i = !0);
      var C = GlobalData.optManager.GetObjectPtr(this.theDragTargetID, !1),
        y = {
          x: null,
          y: null
        },
        f = {
          x: e,
          y: t
        };
      if (
        f.x < 0 &&
        (f.x = 0),
        i &&
        this.Dynamic_Guides &&
        (
          this.DynamicSnapsRemoveGuides(this.Dynamic_Guides),
          this.Dynamic_Guides = null
        ),
        !i &&
        this.AllowSnapToShapes()
      ) {
        d = C.GetSnapRect(),
          (g = $.extend(!0, {
          }, d)).x += GlobalData.optManager.theDragDeltaX,
          g.y += GlobalData.optManager.theDragDeltaY;
        var L = {},
          I = C.CanSnapToShapes(L);
        if (I >= 0) {
          d = this.GetObjectPtr(I, !1).GetSnapRect(),
            (h = $.extend(!0, {
            }, d)).x += GlobalData.optManager.theDragDeltaX,
            h.y += GlobalData.optManager.theDragDeltaY;
          var T = new ListManager.Dynamic_Guides;
          null != (
            y = this.DynamicSnaps_GetSnapObjects(I, h, T, this.theMoveList, null, L)
          ).x &&
            (
              f.x += y.x,
              h.x += y.x,
              GlobalData.optManager.theDragDeltaX = f.x - GlobalData.optManager.theDragStartX
            ),
            null != y.y &&
            (
              f.y += y.y,
              h.y += y.y,
              GlobalData.optManager.theDragDeltaY = f.y - GlobalData.optManager.theDragStartY
            ),
            n()
        }
      }
      if (GlobalData.docHandler.documentConfig.enableSnap && !i) d = (C = GlobalData.optManager.GetObjectPtr(this.theDragTargetID, !1)).GetSnapRect(),
        (g = $.extend(!0, {
        }, d)).x += GlobalData.optManager.theDragDeltaX,
        g.y += GlobalData.optManager.theDragDeltaY,
        C &&
          C.CustomSnap(
            C.Frame.x,
            C.Frame.y,
            GlobalData.optManager.theDragDeltaX,
            GlobalData.optManager.theDragDeltaY,
            !1,
            f
          ) ? (
          null == y.x &&
          (GlobalData.optManager.theDragDeltaX = f.x - GlobalData.optManager.theDragStartX),
          null == y.y &&
          (GlobalData.optManager.theDragDeltaY = f.y - GlobalData.optManager.theDragStartY),
          n()
        ) : GlobalData.docHandler.documentConfig.centerSnap ? (
          D.x = d.x + GlobalData.optManager.theDragDeltaX + d.width / 2,
          D.y = d.y + GlobalData.optManager.theDragDeltaY + d.height / 2,
          D = GlobalData.docHandler.SnapToGrid(D),
          null == y.x &&
          (GlobalData.optManager.theDragDeltaX = D.x - d.x - d.width / 2),
          null == y.y &&
          (GlobalData.optManager.theDragDeltaY = D.y - d.y - d.height / 2)
        ) : (
          (g = $.extend(!0, {
          }, d)).x += GlobalData.optManager.theDragDeltaX,
          g.y += GlobalData.optManager.theDragDeltaY,
          c = GlobalData.docHandler.SnapRect(g),
          null == y.x &&
          (GlobalData.optManager.theDragDeltaX += c.x),
          null == y.y &&
          (GlobalData.optManager.theDragDeltaY += c.y)
        ),
        m &&
        (
          Math.abs(GlobalData.optManager.theDragDeltaX) >= Math.abs(GlobalData.optManager.theDragDeltaY) ? GlobalData.optManager.theDragDeltaY = 0 : GlobalData.optManager.theDragDeltaX = 0
        );
      var b = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
      if (
        GlobalData.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto
      ) {
        var M = GlobalData.optManager.theMoveBounds.x + GlobalData.optManager.theMoveBounds.width + GlobalData.optManager.theDragDeltaX;
        M > b.dim.x &&
          (GlobalData.optManager.theDragDeltaX -= M - b.dim.x);
        var P = GlobalData.optManager.theMoveBounds.y + GlobalData.optManager.theMoveBounds.height + GlobalData.optManager.theDragDeltaY;
        P > b.dim.y &&
          (GlobalData.optManager.theDragDeltaY -= P - b.dim.y)
      }
      var R = this.GetTargetSelect();
      for (
        R < 0 &&
        (R = this.theDragTargetID),
        !0 === a &&
        (GlobalData.optManager.theDragDeltaX = 0, GlobalData.optManager.theDragDeltaY = 0),
        u = 0;
        u < S;
        ++u
      ) {
        if (d = GlobalData.optManager.theDragBBoxList[u], this.theMoveList[u] === R) {
          C = this.GetObjectPtr(R, !1);
          var A = {
            x: d.x + GlobalData.optManager.theDragDeltaX,
            y: d.y + GlobalData.optManager.theDragDeltaY,
            width: d.width,
            height: d.height
          };
          C &&
            (
              (A = C.GetDimensionsForDisplay()).x += GlobalData.optManager.theDragDeltaX,
              A.y += GlobalData.optManager.theDragDeltaY,
              (
                this.LinkParams &&
                this.LinkParams.ConnectIndex >= 0 ||
                this.LinkParams.ConnectIndexHistory.length > 0
              ) &&
              this.HandleHookedObjectMoving(C, A)
            ),
            this.UpdateDisplayCoordinates(A, D, ConstantData.CursorTypes.Move, C);
          var _ = new SelectionAttributes();
          _.left = A.x,
            _.top = A.y;
          var E = C.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches;
          _.widthstr = ConstantData.DocumentContext.CurrentWidth,
            _.heightstr = ConstantData.DocumentContext.CurrentHeight,
            _.leftstr = this.GetLengthInRulerUnits(_.left, !1, GlobalData.docHandler.rulerSettings.originx, E),
            _.topstr = this.GetLengthInRulerUnits(_.top, !1, GlobalData.docHandler.rulerSettings.originy, E),
            // SDUI.Commands.MainController.UpdateRibbonDimensions(_),
            T &&
            this.DynamicSnaps_UpdateGuides(T, I, h)
        }
        if (p = GlobalData.optManager.GetSVGDragElement(u)) {
          p.SetPos(
            d.x + GlobalData.optManager.theDragDeltaX,
            d.y + GlobalData.optManager.theDragDeltaY
          );
          var w = {
            x: d.x + GlobalData.optManager.theDragDeltaX,
            y: d.y + GlobalData.optManager.theDragDeltaY,
            width: d.width,
            height: d.height
          };
          Collab.SendSVGEvent(
            this.theMoveList[u],
            ConstantData.CollabSVGEventTypes.Object_Move,
            w
          )
        }
      }
    }
  }




  EnhanceSnaps(e) {
    if (null == e) return !1;
    var t = e.shiftKey;
    return e.gesture &&
      e.gesture.srcEvent &&
      (t = e.gesture.srcEvent.shiftKey),
      1 == t
  }



  GetSVGDragElement(e) {
    return !this.theDragElementList ||
      e < 0 ||
      e >= this.theDragElementList.length ? null : this.svgObjectLayer.GetElementByID(this.theDragElementList[e])
  }


  SetShapeOriginNoDirty(e, t, a) {
    var r = {},
      i = GlobalData.objectStore.PreserveBlock(e).Data;
    r.x = i.Frame.x,
      r.y = i.Frame.y,
      i.SetShapeOrigin(t, a),
      (t - r.x || a - r.y) &&
      this.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE)
  }


  SetLinkFlag(e, t) {
    var a,
      r,
      i = this.GetObjectPtr(this.theLinksBlockID, !1);
    if (null == i) return 1;
    if ((a = this.FindLink(i, e, !0)) >= 0) {
      if (
        i = this.GetObjectPtr(this.theLinksBlockID, !0),
        null == (r = this.GetObjectPtr(e, !0))
      ) return 1;
      for (
        r.ChangeTarget(e, null, null, null, null, !1);
        a < i.length &&
        i[a].targetid == e;
      ) i[a].flags = Utils2.SetFlag(i[a].flags, t, !0),
        a++
    }
    return 0
  }


  Resize_SetLinkFlag(e, t) {
    var a,
      r;
    (a = this.GetObjectPtr(e, !1)) &&
      a.hooks.length &&
      (r = this.GetObjectPtr(a.hooks[0].objid, !1)) &&
      (
        r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ||
        r instanceof ShapeContainer
      ) &&
      this.SetLinkFlag(a.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE),
      this.SetLinkFlag(e, t)
  }

  MaintainLink(e, t, a, r, i) {
    var n,
      o,
      s = 0,
      l = {},
      S = [],
      c = this.GetObjectPtr(this.theLinksBlockID, !0);
    if (null != c && t.AllowMaintainLink() && (n = this.FindLink(c, e, !0)) >= 0) for (; n < c.length && c[n].targetid === e;) {
      if (o = this.GetObjectPtr(c[n].hookid, !1)) {
        if (o.associd === e && o.flags & ConstantData.ObjFlags.SEDO_Assoc) {
          n++;
          continue
        }
        if (o.flags & ConstantData.ObjFlags.SEDO_NoMaintainLink) {
          n++;
          continue
        }
        for (var u, p = 0; p < o.hooks.length; p++) if (u = i, o.hooks[p].objid === e) {
          if (
            2 === i &&
            (
              u = !(
                o.hooks[p].hookpt !== ConstantData.HookPts.SED_KAT ||
                o.DrawingObjectBaseClass !== ConstantData.DrawingObjectBaseClass.SHAPE ||
                t instanceof PolyLineContainer
              )
            ),
            l = o.HookToPoint(o.hooks[p].hookpt, null),
            !1 === t.MaintainPoint(l, e, a, o, r)
          ) {
            n++;
            continue
          }
          if (
            u ||
            (
              s = ConstantData.HookFlags.SED_LC_NoSnaps,
              s = Utils2.SetFlag(
                s,
                ConstantData.HookFlags.SED_LC_ShapeOnLine,
                !(o instanceof BaseLine)
              ),
              (S = t.GetTargetPoints(l, s, null)) &&
              (o.hooks[p].connect.x = S[0].x, o.hooks[p].connect.y = S[0].y)
            ),
            t.TextFlags & ConstantData.TextFlags.SED_TF_HorizText &&
            o instanceof BaseShape
          ) {
            var d = t.GetApparentAngle(l);
            d %= 180;
            var D = o.RotationAngle;
            if (
              angle180 = d + 180,
              angle180 %= 360,
              d = GlobalData.optManager.GetAngleSmallestDiff(d, D) < GlobalData.optManager.GetAngleSmallestDiff(angle180, D) ? d : angle180,
              !(Math.abs(D - d) <= 2 || Math.abs(D - Math.abs(d - 180)) <= 2)
            ) {
              GlobalData.objectStore.PreserveBlock(c[n].hookid);
              o.RotationAngle = d,
                GlobalData.optManager.AddToDirtyList(o.BlockID)
            }
          }
        }
      }
      n++
    }
  }


  IsGanttBar(e) {

    var t = this.GetObjectPtr(e);
    return !!t &&
      t.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR
  }


  RotatePointAroundPoint(e, t, a) {
    var r = {};
    r.x = t.x,
      r.y = t.y;
    var i = Math.sin(a),
      n = Math.cos(a);
    r.x -= e.x,
      r.y -= e.y;
    var o = r.x * n - r.y * i,
      s = r.x * i + r.y * n;
    return r.x = o + e.x,
      r.y = s + e.y,
      r
  }

  CheckTextHyperlinkHit(e, t) {
    if (- 1 === e.DataID && - 1 === e.TableID) return !1;
    if (e.flags & ConstantData.ObjFlags.SEDO_Lock) return !1;
    if (this.GetEditMode() !== ConstantData.EditState.DEFAULT) return !1;
    var a = this.svgObjectLayer.GetElementByID(e.tag);
    if (
      this.GetObjectPtr(this.theTEDSessionBlockID, !1).theActiveTextEditObjectID !== e.BlockID
    ) {
      var r = e.GetTable(!1);
      if (r) {
        var i = GlobalData.optManager.Table_GetCellClicked(e, t);
        if (i >= 0) {
          var n = r.cells[i];
          n.DataID >= 0 &&
            a &&
            (
              a.textElem = a.GetElementByID(ConstantData.SVGElementClass.TEXT, n.DataID)
            )
        }
      }
    }
    var o = a.textElem;
    if (!o) return !1;
    var s = o.GetHyperlinkAtLocation(t);
    return !!s &&
      (
        // SDUI.Commands.MainController.Hyperlinks.FollowHyperlink(s),
        !0
      )
  }


  UpdateEdgeLayers(e, t, a) {
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
      d = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
      D = d.layers,
      g = d.nlayers,
      h = ConstantData.Defines.AnnoHotDist,
      m = !1,
      C = h,
      y = h,
      f = t.x - 2 * h,
      L = t.y - 2 * h,
      I = Utils1.DeepCopy(this.theDirtyList);
    for (this.theDirtyList = [], r = 0; r < g; r++) if (
      r !== d.activelayer &&
      D[r].flags & ConstantData.LayerFlags.SDLF_UseEdges
    ) for (o = (i = D[r].zList).length, n = 0; n < o; n++) l = i[n],
      e.indexOf(l) >= 0 ||
      (s = GlobalData.optManager.GetObjectPtr(l, !1)) &&
      (
        u = s.Frame.x < C,
        p = s.Frame.y < y,
        S = s.Frame.x + s.Frame.width > C + f,
        c = s.Frame.y + s.Frame.height > y + L,
        s.UseEdges(u, p, S, c, t, a) &&
        (m = !0)
      );
    m &&
      GlobalData.optManager.RenderDirtySVGObjects(),
      this.theDirtyList = I
  }


  ResizeSVGDocument() {
    var e = GlobalData.objectStore.GetObject(this.theSEDSessionBlockID).Data;
    GlobalData.docHandler.ResizeDocument(e.dim.x, e.dim.y)
  }

  LM_TestIconClick(e) {
    var t,
      a = this.svgObjectLayer.FindElementByDOMElement(e.currentTarget);
    if (null != a) {
      var r = a.GetTargetForEvent(e),
        i = r.GetID(),
        n = r.GetUserData(),
        o = a.GetID(),
        s = GlobalData.optManager.GetObjectPtr(o, !1);
      if (!(s && s instanceof BaseDrawingObject)) return !1;
      switch (i) {
        case ConstantData.Defines.TableRowHit:
        case ConstantData.Defines.TableRowHitHidden:
        case ConstantData.Defines.TableRowSelection:
          break;
        case ConstantData.Defines.HitAreas:
          t = r.GetUserData(),
            this.LM_HitAreaClick(o, t);
          break;
        default:
          this.LM_ShapeIconClick(e, o, i, n)
      }
    }
  }

  HandleObjectDragDoAutoScroll() {
    GlobalData.optManager.autoScrollTimerID = this.autoScrollTimer.setTimeout('HandleObjectDragDoAutoScroll', 100);
    var e = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(GlobalData.optManager.autoScrollXPos, GlobalData.optManager.autoScrollYPos);
    GlobalData.docHandler.ScrollToPosition(e.x, e.y),
      GlobalData.optManager.HandleObjectDragMoveCommon(e.x, e.y)
  }


  PreDragDropOrStamp() {
    if (GlobalData.optManager.MainAppHammer) {
      GlobalData.optManager.UnbindDragDropOrStamp();
    }
    GlobalData.optManager.MainAppHammer = Hammer(GlobalData.optManager.MainAppElement);
    console.log('ListManager.LM.prototype.PreDragDropOrStamp', GlobalData.optManager.MainAppHammer)

  }

  LM_ShapeIconClick(e, t, a, r) {
    var i;
    if (null == (i = this.GetObjectPtr(t, !1))) return !1;
    if (i instanceof ShapeContainer) {
      var n = GlobalData.optManager.ContainerIsInCell(i);
      n &&
        (t = (i = n.obj).BlockID)
    }
    if (!(i.flags & ConstantData.ObjFlags.SEDO_Lock)) {
      if (this.GetEditMode() !== ConstantData.EditState.DEFAULT) return !1;
      switch (a) {
        case ConstantData.ShapeIconType.TRELLOLINK:
          var o,
            s;
          return !(
            (o = (p = i.IsNoteCell(r)) ? p.datarecordID : i.datasetElemID) >= 0 &&
            (
              s = ListManager.SDData.GetValue(
                o,
                ListManager.GanttFieldNameList[ListManager.GanttTaskFields.TASK_TRELLO_CARD_URL]
              )
            ) &&
            s.length
          ) ||
            (
              e.gesture &&
              e.gesture.stopDetect(),
              SDUI.Commands.MainController.Hyperlinks.FollowHyperlink(s),
              !0
            );
        case ConstantData.ShapeIconType.HYPERLINK:
          var l = i.GetHyperlink(r);
          return '' !== l &&
            (
              e.gesture &&
              e.gesture.stopDetect(),
              SDUI.Commands.MainController.Hyperlinks.FollowHyperlink(l)
            ),
            !0;
        case ConstantData.ShapeIconType.EXPANDEDVIEW:
          var S;
          S = (p = i.IsNoteCell(r)) ? p.ExpandedViewID : i.ExpandedViewID,
            GlobalData.optManager.ShowExpandedView(S, e);
          break;
        case ConstantData.ShapeIconType.COMMENT:
          var c = null;
          if (r && r.split) {
            var u = r.split('.');
            u[1] &&
              (c = parseInt(u[1], 10))
          }
          GlobalData.optManager.EditComments(c);
          break;
        case ConstantData.ShapeIconType.NOTES:
          var p = i.IsNoteCell(r);
          return this.bInNoteEdit ||
            this.DeactivateAllTextEdit(!1),
            !this.bInNoteEdit ||
            this.curNoteShape == t &&
            this.curNoteTableCell == p ||
            this.ToggleNote(this.curNoteShape, this.curNoteTableCell),
            this.ToggleNote(t, p, r),
            !0;
        case ConstantData.ShapeIconType.EXPANDTABLE:
          p = i.IsNoteCell(r);
          this.SD_GanttExpandContract(i.BlockID, p, !0, r);
          break;
        case ConstantData.ShapeIconType.COLLAPSETABLE:
          p = i.IsNoteCell(r);
          this.SD_GanttExpandContract(i.BlockID, p, !1, r);
          break;
        case ConstantData.ShapeIconType.FIELDDATA:
          var d = e.shiftKey;
          return e.gesture &&
            e.gesture.srcEvent &&
            (d = e.gesture.srcEvent.shiftKey),
            this.ToggleFieldedDataTooltip(t, d),
            !0;
        case ConstantData.ShapeIconType.ATTACHMENT:
          return !0
      }
      return !1
    }
  }

  ActivateTextEdit(e, t, a, r) {
    var i,
      n,
      o,
      s,
      l,
      S = e.ID,
      c = this.GetObjectPtr(this.theTEDSessionBlockID, !1),
      u = [],
      p = {};
    var theTextLength;
    if (
      null != (s = this.GetObjectPtr(S, !1)) &&
      s instanceof BaseDrawingObject &&
      !(s.flags & ConstantData.ObjFlags.SEDO_Lock)
    ) {
      if ((y = s.GetTable(!1)) && t) {
        var d = GlobalData.optManager.Table_GetCellClicked(s, t);
        if (d >= 0 && !GlobalData.optManager.Table_AllowCellTextEdit(y, d)) return
      } else if (y && this.Table_GetFirstTextCell(y) < 0) return;
      var D = -1;//Double === GlobalData.optManager.SD_GetVisioTextChild(S);
      if (D >= 0 && (S = D), p.BlockID = S, null == r) {
        if (
          // SDUI.Commands.MainController.Dropdowns.HideAllDropdowns(),
          S == c.theActiveTextEditObjectID
        ) return;
        - 1 != c.theActiveTextEditObjectID &&
          this.CloseEdit();
        var g = this.GetObjectPtr(this.theSelectedListBlockID, !1);
        - 1 === g.indexOf(S) ||
          g.length > 1 ? (u.push(S), this.SelectObjects(u, !1, !0), i = g[0]) : i = S
      } else p = r.Data;
      Collab.BeginSecondaryEdit();
      var h = this.GetObjectPtr(S, !0),
        m = h.GetTextObject(t, !1, p);
      if (null != m) {
        if (null == r) c = this.GetObjectPtr(this.theTEDSessionBlockID, !0);
        else if (r.EditorID === Collab.EditorID) {
          (c = this.GetObjectPtr(this.theTEDSessionBlockID, !1)).theActiveTextEditObjectID = - 1;
          var C = c.theActiveTableObjectID;
          c.theTEWasResized = !1,
            c.theTEWasEdited = !1,
            (c = this.GetObjectPtr(this.theTEDSessionBlockID, !0)).theActiveTextEditObjectID = S,
            c.theActiveTableObjectID = C
        } else (c = this.GetObjectPtr(this.theTEDSessionBlockID, !1)).EditorID = r.EditorID,
          (c = this.GetObjectPtr(this.theTEDSessionBlockID, !0)).EditorID = Collab.EditorID;
        if (e = this.svgObjectLayer.GetElementByID(S), - 1 == m) {
          h = this.GetObjectPtr(S, !0);
          if (
            o = new TextObject({
            }),
            null === (
              n = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.LM_TEXT_OBJECT, o)
            )
          ) throw new Error('ActivateTextEdit got a null new text block allocation')
          // new SDJSError({
          //   source: 'ActivateTextEdit.CreateBlock',
          //   message: 'ActivateTextEdit got a null new text block allocation'
          // });
          if (!h.SetTextObject(n.ID)) return;
          h.LM_AddSVGTextObject(this.svgDoc, e),
            o = n.Data,
            !0
        } else o = this.GetObjectPtr(m, !0),
          null == e.textElem &&
          h.LM_AddSVGTextObject(this.svgDoc, e);
        var y;
        if (
          null == r &&
          (
            c.theActiveTextEditObjectID = S,
            c.theTEWasResized = !1,
            c.theTEWasEdited = !1
          ),
          (y = h.GetTable(!1)) &&
          (
            y.select >= 0 ? p.TableSelect = y.cells[y.select].uniqueid : p.TableSelect = - 1
          ),
          null == r &&
          (
            y ? this.Table_Load(S) : (
              this.Table_Release(!1),
              0 == (s.TextFlags & ConstantData.TextFlags.SED_TF_AttachA) &&
              0 == (s.TextFlags & ConstantData.TextFlags.SED_TF_AttachB) &&
              GlobalData.optManager.svgObjectLayer.MoveElementToFront(e)
            )
          ),
          null == r
        ) t &&
          t.gesture ? this.TERegisterEvents(e.textElem, t.gesture.srcEvent, a) : this.TERegisterEvents(e.textElem, t),
          l = (M = this.svgDoc.GetActiveEdit()).GetSelectedRange(),
          p.theSelectedRange = Utils1.DeepCopy(l),
          null == t &&
          (
            theTextLength = M.GetText().length,
            p.theSelectedRange.start = 0,
            p.theSelectedRange.anchor = 0,
            p.theSelectedRange.end = theTextLength
          );
        else r &&
          r.EditorID === Collab.EditorID &&
          (l = r.Data.theSelectedRange);
        var f = e.textElem.GetText();
        if ('' === f) {
          if (m < 0) {
            var L = {},
              I = h.GetTextDefault(L);
            p.TextStyle = Utils1.DeepCopy(I);
            var T = this.CalcDefaultInitialTextStyle(I);
            p.theDefaultStyle = Utils1.DeepCopy(T);
            var b = L.vjust;
            p.vjust = b;
            var M = this.svgDoc.GetActiveEdit();
            p.theSelectedRange = l,
              e.textElem.SetText(' '),
              e.textElem.SetFormat(T),
              e.textElem.SetParagraphStyle(L),
              h instanceof BaseShape &&
              e.textElem.SetVerticalAlignment(b),
              e.textElem.SetText(''),
              o.runtimeText = e.textElem.GetRuntimeText()
          }
          h.TextFlags = Utils2.SetFlag(h.TextFlags, ConstantData.TextFlags.SED_TF_Clickhere, !1)
        } else {
          (
            null == r &&
            !Collab.IsSecondary() ||
            null != r &&
            r.EditorID === Collab.EditorID
          ) &&
            this.ReplaceStdText(h, f, e.textElem)
        }
        l &&
          (o.selrange = l),
          null == r &&
          (
            e.SetCursor(ConstantData.CursorType.TEXT),
            i &&
            this.ShowSVGSelectionState(i, !1),
            this.RegisterLastTEOp(ConstantData.TELastOp.INIT)
          ),
          this.PreserveUndoState(!1),
          Collab.AllowMessage() &&
          Collab.BuildMessage(ConstantData.CollabMessages.Text_Init, p, !1),
          (t && 'dragstart' !== t.type || null == t) &&
          Collab.UnBlockMessages()
      }
    }
  }

  StampObjectMove(e) {


    console.log('ListManager.LM.prototype.StampObjectMove 1 e=', e)
    console.log('ListManager.LM.prototype.StampObjectMove 2 this.theActionStoredObjectID=', this.theActionStoredObjectID)


    /*
    Utils2.StopPropagationAndDefaults(e);
    var t = this.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
    if (this.theActionStoredObjectID < 0) {
      if (
        !(
          e.gesture.center.clientX >= GlobalData.optManager.svgDoc.docInfo.dispX &&
          e.gesture.center.clientY >= GlobalData.optManager.svgDoc.docInfo.dispY
        )
      ) return;
      Collab.BeginSecondaryEdit(),
        this.MouseAddNewShape(this.bUseDefaultStyle),
        this.NewObjectVisible = !0
    }
    this.AutoScrollCommon(e, !0, 'HandleStampDragDoAutoScroll') &&
      this.StampObjectMoveCommon(t.x, t.y, e)
      */

    // debugger

    Utils2.StopPropagationAndDefaults(e);

    var Doublex = 0;
    var Doubley = 0;

    // Double ====
    if (e.gesture === null || e.gesture === undefined) {

      Doublex = e.clientX;
      Doubley = e.clientY;
    }
    else {
      Doublex = e.gesture.center.clientX;
      Doubley = e.gesture.center.clientY;
    }

    const t = this.svgDoc.ConvertWindowToDocCoords(Doublex, Doubley/*e.gesture.center.clientX, e.gesture.center.clientY*/);

    if (this.theActionStoredObjectID < 0) {
      if (
        // e.gesture.center.clientX < GlobalData.optManager.svgDoc.docInfo.dispX ||
        // e.gesture.center.clientY < GlobalData.optManager.svgDoc.docInfo.dispY

        e.clientX < GlobalData.optManager.svgDoc.docInfo.dispX ||
        e.clientY < GlobalData.optManager.svgDoc.docInfo.dispY
      ) {
        return;
      }
      Collab.BeginSecondaryEdit();
      this.MouseAddNewShape(this.bUseDefaultStyle);
      this.NewObjectVisible = true;
    }

    if (this.AutoScrollCommon(e, true, 'HandleStampDragDoAutoScroll')) {
      this.StampObjectMoveCommon(t.x, t.y, e);
    }
  }

  DragDropNewShape(e, t, a, r, i, n) {
    console.log('ListManager.LM.prototype.DragDropNewShape 1 e=', e)
    console.log('ListManager.LM.prototype.DragDropNewShape 2 t=', t)
    console.log('ListManager.LM.prototype.DragDropNewShape 3 a=', a)
    console.log('ListManager.LM.prototype.DragDropNewShape 4 r=', r)
    console.log('ListManager.LM.prototype.DragDropNewShape 5 i=', i)
    console.log('ListManager.LM.prototype.DragDropNewShape 6 n=', n)

    /*
   try {
    this.SetModalOperation(ConstantData2.ModalOperations.DRAGDROP);
    this.GetObjectPtr(this.theTEDSessionBlockID, !1);
    this.CloseEdit(),
      this.stampCompleteCallback = i ||
      null,
      this.stampCompleteUserData = n ||
      null,
      this.stampHCenter = t,
      this.stampVCenter = a,
      this.bUseDefaultStyle = r,
      this.theActionStoredObjectID = - 1,
      this.theDragBBoxList = [],
      this.theDragElementList = [],
      this.NewObjectVisible = !1,
      this.theDrawShape = e,
      e.flags & ConstantData.ObjFlags.SEDO_TextOnly ? this.SetEditMode(ConstantData.EditState.TEXT) : this.SetEditMode(ConstantData.EditState.STAMP),
      GlobalData.Evt_StampObjectDragEnd = Evt_StampObjectDragEndFactory(r),
      GlobalData.optManager.MainAppHammer ||
      GlobalData.optManager.PreDragDropOrStamp(),
      GlobalData.optManager.MainAppHammer.on('drag', Evt_StampObjectDrag),
      GlobalData.optManager.MainAppHammer.on('dragend',  GlobalData.Evt_StampObjectDragEnd),
      this.LM_StampPreTrack(),
      this.InitializeAutoGrowDrag()
     } catch (e) {
      console.log('ListManager.LM.prototype.DragDropNewShape 7 error=',e)
      throw e;
       GlobalData.optManager.CancelModalOperation(),
          GlobalData.optManager.ExceptionCleanup(e)
      }

      */

    //

    // e = SDJS.ListManager.Rect
    // t = true
    // a = true
    // r = false
    // i = null
    // n = null


    try {
      this.SetModalOperation(ConstantData2.ModalOperations.DRAGDROP);
      this.GetObjectPtr(this.theTEDSessionBlockID, false);
      this.CloseEdit();
      this.stampCompleteCallback = i || null;
      this.stampCompleteUserData = n || null;
      this.stampHCenter = t;
      this.stampVCenter = a;
      this.bUseDefaultStyle = r;
      this.theActionStoredObjectID = -1;
      this.theDragBBoxList = [];
      this.theDragElementList = [];
      this.NewObjectVisible = false;
      this.theDrawShape = e;
      if (e.flags & ConstantData.ObjFlags.SEDO_TextOnly) {
        this.SetEditMode(ConstantData.EditState.TEXT);
      } else {
        this.SetEditMode(ConstantData.EditState.STAMP);
      }



      GlobalData.Evt_StampObjectDragEnd = EvtUtil.Evt_StampObjectDragEndFactory(r);

      // debugger;

      if (!GlobalData.optManager.MainAppHammer) {
        GlobalData.optManager.PreDragDropOrStamp();
      }

      // debugger
      this.WorkAreaHammer.enable(!1);

      // GlobalData.optManager.MainAppHammer.on('drag', EvtUtil.Evt_StampObjectDrag);
      // GlobalData.optManager.MainAppHammer.on('dragend', Evt_StampObjectDragEnd);

      GlobalData.optManager.MainAppHammer.on('mousemove', EvtUtil.Evt_StampObjectDrag);

      // console.log('===GlobalData.Evt_StampObjectDragEnd', GlobalData.Evt_StampObjectDragEnd)
      // GlobalData.optManager.MainAppHammer.on('mousedown', GlobalData.Evt_StampObjectDragEnd);
      // GlobalData.optManager.MainAppHammer.on('mousedown', console.log('=== mousedown'));
      // GlobalData.optManager.MainAppHammer.on('click', GlobalData.Evt_StampObjectDragEnd);
      // GlobalData.optManager.MainAppHammer.on('click', function (e) { console.log('===DragDropNewShape click', e) });

      // GlobalData.optManager.MainAppHammer.on('dragend', function (e) { console.log('===DragDropNewShape dragend', e) });
      // GlobalData.optManager.MainAppHammer.on('dragend', EvtUtil.Evt_StampObjectDragEndFactory(r));

      // GlobalData.optManager.MainAppHammer.on('dragend', function (e) { GlobalData.optManager.DragDropObjectDone(e, r) })
      GlobalData.optManager.MainAppHammer.on('dragend', GlobalData.Evt_StampObjectDragEnd);

      // const fun = function (t) {
      //   GlobalData.optManager.DragDropObjectDone(t, e);
      //   return true;
      // }

      // GlobalData.optManager.MainAppHammer.on('dragend', function (t) {
      //   console.log('===DragDropNewShape dragend', t);
      //   return GlobalData.optManager.DragDropObjectDone(t, e), true;
      // });

      // GlobalData.optManager.MainAppHammer.on('mouseup', GlobalData.Evt_StampObjectDragEnd);


      // GlobalData.optManager.MainAppHammer.on('click', function (e) {
      //   console.log('================================================ dragend', e);
      // });



      /*
      var testElem= document.getElementById('mainApp');
      // var testHammer= new Hammer(testElem);
      var mc = new Hammer.Manager(testElem);
      mc.add(new Hammer.Drag());
      mc.on('drag', function(e) {
        // 处理拖动事件
        console.log('Element is being dragged.');
      });
      mc.recognizeWith(mc.get('pinch'));
      mc.recognizeWith(mc.get('rotate'));
      mc.recognizeWith(mc.get('press'));
      mc.recognizeWith(mc.get('pan'));
      mc.recognizeWith(mc.get('swipe'));
      */


      // testHammer.on('drag', Evt_StampObjectDrag);
      // testHammer.on('dragend', GlobalData.Evt_StampObjectDragEnd);



      // console.log('ListManager.LM.prototype.DragDropNewShape 8 GlobalData.optManager.MainAppHammer', GlobalData.optManager.MainAppHammer)

      this.LM_StampPreTrack();
      this.InitializeAutoGrowDrag();
    } catch (e) {
      console.log('ListManager.LM.prototype.DragDropNewShape error:', e);
      GlobalData.optManager.CancelModalOperation();
      GlobalData.optManager.ExceptionCleanup(e);
      throw e;
    }


  }


  MouseStampNewShape(e, t, a, r, i, n) {

    // debugger
    console.log('======== ListManager.LM.prototype.MouseStampNewShape 1 e=', e)
    console.log('======== ListManager.LM.prototype.MouseStampNewShape 2 t=', t)
    console.log('======== ListManager.LM.prototype.MouseStampNewShape 3 a=', a)
    console.log('======== ListManager.LM.prototype.MouseStampNewShape 4 r=', r)
    console.log('======== ListManager.LM.prototype.MouseStampNewShape 5 i=', i)
    console.log('======== ListManager.LM.prototype.MouseStampNewShape 6 n=', n)

    this.SetModalOperation(ConstantData2.ModalOperations.STAMP);
    this.GetObjectPtr(this.theTEDSessionBlockID, !1);
    this.DeactivateTextEdit(!1),
      this.stampCompleteCallback = i ||
      null,
      this.stampCompleteUserData = n ||
      null,
      this.stampHCenter = t,
      this.stampVCenter = a,
      this.bUseDefaultStyle = r,
      this.theActionStoredObjectID = - 1,
      this.theDragBBoxList = [],
      this.theDragElementList = [],
      this.NewObjectVisible = !1,
      this.theDrawShape = e,
      this.theDrawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly ? this.SetEditMode(ConstantData.EditState.TEXT) : this.SetEditMode(
        ConstantData.EditState.STAMP,
        ConstantData.CursorType.STAMP
      ),
      this.WorkAreaHammer.enable(!1),
      $(window).bind('mousemove', EvtUtil.Evt_MouseStampObjectMove),
      GlobalData.SDJS_LM_MouseStampObjectDone = EvtUtil.Evt_MouseStampObjectDoneFactory(r),
      $(window).bind('mousedown', GlobalData.SDJS_LM_MouseStampObjectDone),
      $(window).bind('click', GlobalData.SDJS_LM_MouseStampObjectDone),
      this.LM_StampPreTrack(),
      this.InitializeAutoGrowDrag()
  }


  MouseStampObjectDone(e, t) {
    // debugger
    try {
      var a,
        r,
        i,
        n,
        o = GlobalData.optManager.svgDoc.docInfo,
        s = !1,
        l = [];
      if (
        GlobalData.optManager.ResetAutoScrollTimer(),
        e.clientX >= o.dispX + o.dispWidth &&
        (s = !0),
        e.clientX < GlobalData.optManager.svgDoc.docInfo.dispX &&
        (s = !0),
        e.clientY,
        GlobalData.optManager.svgDoc.docInfo.dispY,
        GlobalData.optManager.svgDoc.docInfo.dispHeight,
        e.clientY < GlobalData.optManager.svgDoc.docInfo.dispY &&
        (s = !0),
        s
      ) return this.CancelObjectStamp(!0),
        // this.UpdateTools(),
        Collab.UnLockMessages(),
        void Collab.UnBlockMessages();
      if (this.theActionStoredObjectID < 0) return;
      this.ClearAnySelection(!0);
      var S,
        c = {
          FrameList: []
        },
        u = this.svgDoc.ConvertWindowToDocCoords(e.clientX, e.clientY),
        p = this.theDrawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly;
      if (!p) {
        var d = this.LinkParams &&
          this.LinkParams.SConnectIndex >= 0;
        this.OverrideSnaps(e) &&
          (d = !0),
          GlobalData.docHandler.documentConfig.enableSnap &&
          !d &&
          (u = GlobalData.docHandler.SnapToGrid(u))
      }
      var D = u.x;
      this.stampHCenter &&
        (D -= this.theDrawShape.Frame.width / 2);
      var g = u.y;
      if (
        this.stampVCenter &&
        (g -= this.theDrawShape.Frame.height / 2),
        this.theMoveList &&
        this.theMoveList.length
      ) for (
          r = this.theMoveList.length,
          D - this.stampShapeOffsetX,
          g - this.stampShapeOffsetY,
          a = 0;
          a < r;
          a++
        ) (i = this.GetObjectPtr(this.theMoveList[a], !0)) &&
          (
            i.UpdateFrame(i.Frame),
            S = Utils1.DeepCopy(i.Frame),
            c.FrameList.push(S),
            Collab.AddNewBlockToSecondary(this.theMoveList[a]),
            i.dataStyleOverride = null
          ),
          i = this.GetObjectPtr(this.theMoveList[a], !0);
      else {
        if (this.theDrawShape) {
          if (
            this.theDrawShape.sizedim.width = this.theDrawShape.Frame.width,
            this.theDrawShape.sizedim.height = this.theDrawShape.Frame.height,
            this.theDrawShape.objecttype === ConstantData.ObjectTypes.SD_OBJT_FRAME
          ) {
            var h = GlobalData.optManager.ZListPreserve();
            n = this.ReplaceSpecialObject(
              this.theDrawShape,
              this.theActionStoredObjectID,
              h,
              this.theDrawShape.objecttype
            ),
              c.ReplaceSpecialObjectID = n
          }
          this.theDrawShape.UpdateFrame(this.theDrawShape.Frame),
            S = Utils1.DeepCopy(this.theDrawShape.Frame),
            c.FrameList.push(S),
            Collab.AddNewBlockToSecondary(this.theDrawShape.BlockID)
        }
        this.GetObjectPtr(this.theActionStoredObjectID, !0)
      }
      c.LinkParams = Utils1.DeepCopy(this.LinkParams);
      var m = this.BuildCreateMessage(c, !1);
      if (
        this.SetLinkFlagsOnFilledClosedPolylines(),
        GlobalData.gBusinessManager &&
        // GlobalData.gBusinessManager instanceof Business.FloorPlan &&
        GlobalData.gBusinessManager instanceof FloorPlan &&
        GlobalData.gBusinessManager.EnsureCubicleBehindOutline(this.theActionStoredObjectID),
        this.SetEditMode(ConstantData.EditState.DEFAULT),
        $(window).unbind('mousedown'),
        $(window).unbind('click'),
        $(window).unbind('mousemove', EvtUtil.Evt_MouseStampObjectMove),
        this.WorkAreaHammer.enable(!0),
        p ||
        l.push(this.theActionStoredObjectID),
        this.theMoveList &&
          this.theMoveList.length ? (l = this.theMoveList.slice(0), this.theActionStoredObjectID = - 1) : this.AddToDirtyList(this.theActionStoredObjectID),
        n
      ) {
        var C = [
          n
        ];
        this.DeleteObjects(C, !1)
      }
      this.IsTopMostVisibleLayer() ||
        this.MarkAllAllVisibleHigherLayerObjectsDirty(),
        this.RenderDirtySVGObjects(),
        this.theMoveList = null,
        this.stampCompleteCallback &&
        this.theActionStoredObjectID >= 0 &&
        this.stampCompleteCallback(this.theActionStoredObjectID, this.stampCompleteUserData),
        this.stampCompleteCallback = null,
        this.stampCompleteUserData = null,
        this.stampHCenter = !1,
        this.stampVCenter = !1,
        this.stampShapeOffsetX = 0,
        this.stampShapeOffsetY = 0,
        this.LM_StampPostRelease(!0),
        this.DynamicSnapsRemoveGuides(this.Dynamic_Guides),
        this.Dynamic_Guides = null,
        this.theDragBBoxList = [],
        this.theDragElementList = [],
        this.theActionStoredObjectID = - 1,
        this.theActionSVGObject = null,
        this.SetModalOperation(ConstantData2.ModalOperations.NONE),
        m &&
        (
          Collab.IsSecondary() &&
          Collab.CreateList.length &&
          (
            m.Data.CreateList = [],
            m.Data.CreateList = m.Data.CreateList.concat(Collab.CreateList)
          ),
          Collab.SendMessage(m)
        ),
        this.CompleteOperation(l)
      //,
      // this.UpdateTools()
    } catch (e) {
      GlobalData.optManager.CancelModalOperation(),
        GlobalData.optManager.DragDrop_ExceptionCleanup(),
        GlobalData.optManager.ExceptionCleanup(e)
      //,
      // GlobalData.optManager.UpdateTools()
    }
  }


  SetLinkFlagsOnFilledClosedPolylines(e) {

    var t,
      a,
      r = null,
      i = null;
    if (
      e &&
      (i = GlobalData.optManager.GetObjectPtr(e, !1)) &&
      i instanceof ListManager.PolyLine &&
      i.polylist &&
      i.polylist.closed &&
      GlobalData.optManager.SetLinkFlag(
        e,
        ConstantData.LinkFlags.SED_L_MOVE | ConstantData.LinkFlags.SED_L_CHANGE
      ),
      this.theMoveList &&
      this.theMoveList.length
    ) for (t = 0; t < this.theMoveList.length; t++) if (
      (r = this.GetObjectPtr(this.theMoveList[t], !0)) &&
      r.hooks.length > 0
    ) for (a = 0; a < r.hooks.length; a++) {
      var n = this.GetObjectPtr(r.hooks[a].objid, !1);
      n &&
        n.StyleRecord &&
        n.StyleRecord.Line &&
        n.StyleRecord.Line.BThick &&
        (
          n.polylist &&
          n.polylist.closed &&
          GlobalData.optManager.SetLinkFlag(
            r.hooks[a].objid,
            ConstantData.LinkFlags.SED_L_MOVE | ConstantData.LinkFlags.SED_L_CHANGE
          )
        )
    }
  }




  CancelObjectStamp(e) {
    this.SetModalOperation(ConstantData2.ModalOperations.NONE),
      ConstantData.DocumentContext.SelectionToolSticky = !1,
      this.LM_StampPostRelease(!1),
      this.theActionStoredObjectID >= 0 &&
      (
        this.Undo(!0),
        this.ClearFutureUndoStates(),
        this.theActionStoredObjectID = - 1,
        this.theDragBBoxList = [],
        this.theDragElementList = [],
        this.theActionSVGObject = null
      ),
      this.SetEditMode(ConstantData.EditState.DEFAULT),
      e &&
      (
        $(window).unbind('mousedown'),
        $(window).unbind('click'),
        $(window).unbind('mousemove', EvtUtil.Evt_MouseStampObjectMove),
        GlobalData.optManager.WorkAreaHammer.enable(!0)
      ),
      this.theMoveList = null,
      this.stampCompleteCallback = null,
      this.stampCompleteUserData = null,
      this.stampShapeOffsetX = 0,
      this.stampShapeOffsetY = 0,
      this.stampHCenter = !1,
      this.stampVCenter = !1,
      this.stampSticky = !1
  }



  DragDrop_ExceptionCleanup() {
    // throw e;
    // Double === TODO
    console.log('ListManager.LM.prototype.DragDrop_ExceptionCleanup')
    GlobalData.optManager.EmptyEMFList = [],
      GlobalData.optManager.EmptySymbolList = [],
      Collab.UnLockMessages(),
      Collab.UnBlockMessages()
  }


  CancelObjectDragDrop(e) {
    if (
      this.SetModalOperation(ConstantData2.ModalOperations.NONE),
      this.LM_StampPostRelease(!1),
      this.theActionStoredObjectID >= 0
    ) {
      var t = this.svgObjectLayer.GetElementByID(this.theActionStoredObjectID);
      t &&
        this.svgObjectLayer.RemoveElement(t),
        this.Undo(!0),
        this.ClearFutureUndoStates(),
        this.theActionStoredObjectID = - 1,
        this.theDragBBoxList = [],
        this.theDragElementList = [],
        this.theActionSVGObject = null,
        Collab.AllowMessage() &&
        Collab.CloseSecondaryEdit()
    }
    this.SetEditMode(ConstantData.EditState.DEFAULT),
      e &&
      GlobalData.optManager.UnbindDragDropOrStamp(),
      this.stampCompleteCallback = null,
      this.stampCompleteUserData = null,
      this.theMoveList = null,
      this.stampShapeOffsetX = 0,
      this.stampShapeOffsetY = 0,
      this.stampHCenter = !1,
      this.stampVCenter = !1
  }


  LM_StampPreTrack() {
    GlobalData.optManager.GetObjectPtr(this.theSEDSessionBlockID, !1);
    this.LinkParams = new LinkParameters(),
      this.LinkParams.AutoInsert = this.AllowAutoInsert(),
      this.theDrawShape &&
      this.theDrawShape.flags &&
      this.theDrawShape.flags & ConstantData.ObjFlags.SEDO_DropOnBorder &&
      (this.LinkParams.DropOnLine = !0)
  }


  DragDropObjectDone(e, t) {

    debugger
    this.WorkAreaHammer.enable(!0)

    console.log('DragDropObjectDone e, t', e, t)

    try {
      var a = !1;
      Utils2.StopPropagationAndDefaults(e),
        GlobalData.optManager.ResetAutoScrollTimer();
      var r,
        i,
        n,
        o,
        s = GlobalData.optManager.svgDoc.docInfo,
        l = !1,
        S = [];
      if (
        e.gesture.center.clientX >= s.dispX + s.dispWidth &&
        (l = !0),
        e.gesture.center.clientX < GlobalData.optManager.svgDoc.docInfo.dispX &&
        (l = !0),
        e.gesture.center.clientY,
        GlobalData.optManager.svgDoc.docInfo.dispY,
        GlobalData.optManager.svgDoc.docInfo.dispHeight,
        e.gesture.center.clientY < GlobalData.optManager.svgDoc.docInfo.dispY &&
        (l = !0),
        l
      ) return this.CancelObjectDragDrop(!0),
        // this.UpdateTools(),
        Collab.UnLockMessages(),
        void Collab.UnBlockMessages();
      if (null == this.LinkParams) return void this.CancelObjectDragDrop(!0);
      var c = this.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
      if (
        this.theDrawShape &&
        (
          a = this.theDrawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly
        ),
        !a
      ) {
        var u = this.LinkParams &&
          this.LinkParams.SConnectIndex >= 0;
        this.OverrideSnaps(e) &&
          (u = !0),
          GlobalData.docHandler.documentConfig.enableSnap &&
          !u &&
          (c = GlobalData.docHandler.SnapToGrid(c))
      }
      var p = c.x;
      this.stampHCenter &&
        (p -= this.theDrawShape.Frame.width / 2);
      var d = c.y;
      this.stampVCenter &&
        (d -= this.theDrawShape.Frame.height / 2);
      var D,
        g,
        h = {
          FrameList: []
        };
      if (this.theMoveList && this.theMoveList.length) for (
        g = this.theMoveList[0],
        i = this.theMoveList.length,
        p - this.stampShapeOffsetX,
        d - this.stampShapeOffsetY,
        r = 0;
        r < i;
        r++
      ) Collab.AddNewBlockToSecondary(this.theMoveList[r]),
        (n = this.GetObjectPtr(this.theMoveList[r], !0)) &&
        (
          n.UpdateFrame(n.Frame),
          D = Utils1.DeepCopy(n.Frame),
          h.FrameList.push(D)
        ),
        n = this.GetObjectPtr(this.theMoveList[r], !0);
      else {
        if (this.theDrawShape) {
          if (
            g = this.theDrawShape.BlockID,
            this.theDrawShape.sizedim.width = this.theDrawShape.Frame.width,
            this.theDrawShape.sizedim.height = this.theDrawShape.Frame.height,
            this.theDrawShape.objecttype === ConstantData.ObjectTypes.SD_OBJT_FRAME
          ) {
            var m = GlobalData.optManager.ZListPreserve();
            o = this.ReplaceSpecialObject(
              this.theDrawShape,
              this.theActionStoredObjectID,
              m,
              this.theDrawShape.objecttype
            ),
              h.ReplaceSpecialObjectID = o
          }
          this.theDrawShape.UpdateFrame(this.theDrawShape.Frame),
            D = Utils1.DeepCopy(this.theDrawShape.Frame),
            h.FrameList.push(D),
            this.LinkParams.AutoInsert &&
            (h.RotationAngle = this.theDrawShape.RotationAngle),
            Collab.AddNewBlockToSecondary(this.theDrawShape.BlockID)
        }
        this.GetObjectPtr(this.theActionStoredObjectID, !0)
      }
      if (
        h.LinkParams = Utils1.DeepCopy(this.LinkParams),
        h.AllowMany = !0,
        h.CustomSymbol = !1,
        this.theDrawShape &&
        null != this.theDrawShape.SymbolID
      ) {
        var C = SDUI.Commands.MainController.Symbols.GetLMObject(this.theDrawShape.SymbolID);
        C &&
          C.SymbolData &&
          C.SymbolData.IsCustomContent &&
          C.nativeDataArrayBuffer &&
          (
            h.nativeDataString = Collab.BufferToString(C.nativeDataArrayBuffer),
            h.SymbolData = Utils1.DeepCopy(C.SymbolData)
          )
      }
      var y = this.BuildCreateMessage(h, !1);
      this.SetEditMode(ConstantData.EditState.DEFAULT),
        GlobalData.optManager.UnbindDragDropOrStamp(),
        a ||
        S.push(this.theActionStoredObjectID);
      var f = Business.GetSelectionBusinessManager(g);
      if (
        null == f &&
        (f = GlobalData.gBusinessManager),
        // f instanceof Business.FloorPlan &&
        // Double ===
        f instanceof FloorPlan &&
        f.EnsureCubicleBehindOutline(this.theActionStoredObjectID),
        this.theMoveList &&
          this.theMoveList.length ? (S = this.theMoveList.slice(0), this.theActionStoredObjectID = - 1) : this.AddToDirtyList(this.theActionStoredObjectID),
        o
      ) {
        var L = [
          o
        ];
        this.DeleteObjects(L, !1)
      }
      this.IsTopMostVisibleLayer() ||
        this.MarkAllAllVisibleHigherLayerObjectsDirty(),
        this.RenderDirtySVGObjects(),
        this.SetLinkFlagsOnFilledClosedPolylines(),
        this.theMoveList = null,
        this.stampCompleteCallback &&
        this.theActionStoredObjectID >= 0 &&
        this.stampCompleteCallback(this.theActionStoredObjectID, this.stampCompleteUserData),
        this.stampCompleteCallback = null,
        this.stampCompleteUserData = null,
        this.stampHCenter = !1,
        this.stampVCenter = !1,
        this.stampShapeOffsetX = 0,
        this.stampShapeOffsetY = 0,
        this.LM_StampPostRelease(!0),
        y &&
        (
          Collab.IsSecondary() &&
          Collab.CreateList.length &&
          (
            y.Data.CreateList = [],
            y.Data.CreateList = y.Data.CreateList.concat(Collab.CreateList)
          ),
          Collab.SendMessage(y)
        ),
        this.DynamicSnapsRemoveGuides(this.Dynamic_Guides),
        this.Dynamic_Guides = null,
        this.theActionStoredObjectID = - 1,
        this.theDragBBoxList = [],
        this.theDragElementList = [],
        this.theActionSVGObject = null,
        this.SetModalOperation(ConstantData2.ModalOperations.NONE),
        this.CompleteOperation(S)
      //,
      // this.UpdateTools()

    } catch (e) {
      GlobalData.optManager.CancelModalOperation(),
        GlobalData.optManager.DragDrop_ExceptionCleanup(),
        GlobalData.optManager.ExceptionCleanup(e)
      throw e
      //,
      // GlobalData.optManager.UpdateTools()
    }
  }


  MouseAddNewShape(e) {

    console.log('======== ListManager.LM.prototype.MouseAddNewShape 1 ', e)

    // debugger

    /*
    var t,
      a,
      r = 0,
      i = !1;
    if (
      a = null != this.theDrawShape.nativeDataArrayBuffer,
      !((t = this.AddNewObject(this.theDrawShape, e, !1)) < 0)
    ) {
      this.ActiveLayerZList().length,
        this.theActionStoredObjectID = t;
      var n,
        o,
        s,
        l,
        S,
        c,
        u,
        p = GlobalData.optManager.VisibleZList();
      if (
        this.theDragBBoxList = [],
        this.theDragElementList = [],
        this.theMoveList &&
        this.theMoveList.length
      ) for (o = this.theMoveList.length, l = this.theMoveList, s = 0; s < o; ++s) S = l[s],
        null != (c = this.GetObjectPtr(S, !1)) &&
        (
          u = c.GetSVGFrame(),
          c instanceof ListManager.PolyLine &&
          c.polylist &&
          c.polylist.closed &&
          c.StyleRecord &&
          c.StyleRecord.Line &&
          c.StyleRecord.Line.BThick &&
          u.x < 0 &&
          u.y < 0 &&
          (
            r = - 2 * c.StyleRecord.Line.BThick,
            i = c instanceof PolyLineContainer
          ),
          u.y += r,
          u.x += r,
          i ||
          (r = 0),
          this.theDragBBoxList.push(u),
          n = p.indexOf(S),
          this.AddSVGObject(n, S, !0, !1),
          this.theDragElementList.push(S),
          GlobalData.docHandler.documentConfig.enableSnap &&
          S == this.theActionStoredObjectID &&
          (this.theDragTargetBBox = $.extend(!0, {
          }, u)),
          this.theDragEnclosingRect = GlobalData.optManager.GetListSRect(this.theMoveList, !1, !0)
        );
      else if (a) {
        var d = this.GetObjectPtr(t, !1),
          D = GlobalData.optManager.GetObjectPtr(this.theSEDSessionBlockID, !1),
          g = null != d.ImageURL &&
            d.ImageURL.length > 0;
        d &&
          d.SymbolID !== ConstantData.Defines.Floorplan_WallOpeningID &&
          !g &&
          d.ApplyCurvature(D.def.rrectparam),
          n = p.indexOf(this.theActionStoredObjectID),
          this.AddSVGObject(n, t, !0, !1)
      }
      this.theActionSVGObject = this.svgObjectLayer.GetElementByID(this.theActionStoredObjectID),
        this.LinkParams &&
        this.LinkParams.lpCircList.push(this.theActionStoredObjectID),
        GlobalData.optManager.ShowFrame(!0),
        GlobalData.optManager.ShowXY(!0)
    }

    */


    let newObjectID;
    let hasNativeData = this.theDrawShape.nativeDataArrayBuffer !== null;
    let offset = 0;
    let isPolyLineContainer = false;

    if ((newObjectID = this.AddNewObject(this.theDrawShape, e, false)) >= 0) {
      this.theActionStoredObjectID = newObjectID;
      let visibleZList = GlobalData.optManager.VisibleZList();
      this.theDragBBoxList = [];
      this.theDragElementList = [];

      if (this.theMoveList && this.theMoveList.length) {
        for (let i = 0; i < this.theMoveList.length; i++) {
          let moveObjectID = this.theMoveList[i];
          let moveObject = this.GetObjectPtr(moveObjectID, false);

          if (moveObject) {
            let svgFrame = moveObject.GetSVGFrame();

            if (moveObject instanceof PolyLine && moveObject.polylist && moveObject.polylist.closed) {
              if (moveObject.StyleRecord && moveObject.StyleRecord.Line && moveObject.StyleRecord.Line.BThick) {
                if (svgFrame.x < 0 && svgFrame.y < 0) {
                  offset = -2 * moveObject.StyleRecord.Line.BThick;
                  isPolyLineContainer = moveObject instanceof PolyLineContainer;
                }
              }
            }

            svgFrame.y += offset;
            svgFrame.x += offset;
            if (!isPolyLineContainer) offset = 0;

            this.theDragBBoxList.push(svgFrame);
            let index = visibleZList.indexOf(moveObjectID);
            this.AddSVGObject(index, moveObjectID, true, false);
            this.theDragElementList.push(moveObjectID);

            if (GlobalData.docHandler.documentConfig.enableSnap && moveObjectID === this.theActionStoredObjectID) {
              this.theDragTargetBBox = $.extend(true, {}, svgFrame);
            }

            this.theDragEnclosingRect = GlobalData.optManager.GetListSRect(this.theMoveList, false, true);
          }
        }
      } else if (hasNativeData) {
        let newObject = this.GetObjectPtr(newObjectID, false);
        let sessionBlock = GlobalData.optManager.GetObjectPtr(this.theSEDSessionBlockID, false);
        let hasImageURL = newObject.ImageURL && newObject.ImageURL.length > 0;

        if (newObject && newObject.SymbolID !== ConstantData.Defines.Floorplan_WallOpeningID && !hasImageURL) {
          newObject.ApplyCurvature(sessionBlock.def.rrectparam);
        }

        let index = visibleZList.indexOf(this.theActionStoredObjectID);
        this.AddSVGObject(index, newObjectID, true, false);
      }

      this.theActionSVGObject = this.svgObjectLayer.GetElementByID(this.theActionStoredObjectID);

      if (this.LinkParams) {
        this.LinkParams.lpCircList.push(this.theActionStoredObjectID);
      }

      GlobalData.optManager.ShowFrame(true);
      GlobalData.optManager.ShowXY(true);
    }











  }


  HandleStampDragDoAutoScroll() {
    GlobalData.optManager.autoScrollTimerID = this.autoScrollTimer.setTimeout('HandleStampDragDoAutoScroll', 100);
    var e = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(GlobalData.optManager.autoScrollXPos, GlobalData.optManager.autoScrollYPos);
    GlobalData.docHandler.ScrollToPosition(e.x, e.y),
      GlobalData.optManager.StampObjectMoveCommon(e.x, e.y)
  }

  MouseStampObjectMove(e) {
    console.log('======== ListManager.LM.prototype.MouseStampObjectMove 1 e=', e)
    var t = this.svgDoc.ConvertWindowToDocCoords(e.clientX, e.clientY);
    if (this.theActionStoredObjectID < 0) {
      if (
        !(
          e.clientX >= GlobalData.optManager.svgDoc.docInfo.dispX &&
          e.clientY >= GlobalData.optManager.svgDoc.docInfo.dispY
        )
      ) return;
      Collab.BeginSecondaryEdit(),
        this.MouseAddNewShape(this.bUseDefaultStyle),
        this.NewObjectVisible = !0
    }
    this.AutoScrollCommon(e, !0, 'HandleStampDragDoAutoScroll') &&
      this.StampObjectMoveCommon(t.x, t.y, e)
  }


  StampObjectMoveCommon(e, t, a) {
    console.log('ListManager.LM.prototype.StampObjectMoveCommon 1 e=', e)
    console.log('ListManager.LM.prototype.StampObjectMoveCommon 2 t=', t)
    console.log('ListManager.LM.prototype.StampObjectMoveCommon 3 a=', a)

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
      g = 0,
      h = 0,
      m = {},
      C = {
        x: e,
        y: t
      },
      y = null,
      f = this.svgDoc.ConvertDocToWindowCoords(e, t);
    if (null != f) {
      var L,
        I;
      if (this.theActionStoredObjectID > 0) {
        if (
          f.x < GlobalData.optManager.svgDoc.docInfo.dispX ||
          f.y < GlobalData.optManager.svgDoc.docInfo.dispY
        ) {
          if (this.NewObjectVisible) {
            if (this.theMoveList && this.theMoveList.length) for (n = this.theMoveList.length, i = 0; i < n; ++i) p = this.theMoveList[i],
              (d = GlobalData.optManager.GetSVGDragElement(i)) &&
              d.SetVisible(!1);
            else this.theActionSVGObject.SetVisible(!1);
            this.NewObjectVisible = !1,
              GlobalData.optManager.ShowFrame(!1),
              GlobalData.optManager.ShowXY(!1)
          }
          return
        }
        if (!this.NewObjectVisible) {
          if (this.theMoveList && this.theMoveList.length) for (n = this.theMoveList.length, i = 0; i < n; ++i) p = this.theMoveList[i],
            (d = GlobalData.optManager.GetSVGDragElement(i)) &&
            d.SetVisible(!0);
          else this.theActionSVGObject.SetVisible(!0);
          this.NewObjectVisible = !0,
            GlobalData.optManager.ShowFrame(!0),
            GlobalData.optManager.ShowXY(!0)
        }
      }
      var T = this.theDrawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly;
      if (r = this.GetObjectPtr(this.theActionStoredObjectID, !1)) {
        r.r.x,
          r.Frame.x,
          r.r.width,
          r.Frame.width;
        var b,
          M,
          P = this.LinkParams &&
            this.LinkParams.SConnectIndex >= 0;
        this.OverrideSnaps(a) &&
          (P = !0);
        var R = {
          x: null,
          y: null
        };
        if (
          !(this.theMoveList && this.theMoveList.length > 0) &&
          this.AllowSnapToShapes() &&
          !T
        ) {
          var A = {},
            _ = r.CanSnapToShapes(A);
          if (_ >= 0) {
            var E = new DynamicGuides();
            o = this.GetObjectPtr(_, !1).GetSnapRect();
            var w = $.extend(!0, {
            }, o);
            w.x = C.x - o.width / 2,
              w.y = C.y - o.height / 2,
              null != (
                R = this.DynamicSnaps_GetSnapObjects(_, w, E, this.theMoveList, null, A)
              ).x &&
              (w.x += R.x, C.x += R.x),
              null != R.y &&
              (w.y += R.y, C.y += R.y)
          }
        }
        if (
          GlobalData.docHandler.documentConfig.enableSnap &&
          !P &&
          !T &&
          (
            this.theMoveList &&
              this.theMoveList.length ? (
              D = this.theMoveList.indexOf(this.theActionStoredObjectID),
              b = Utils1.DeepCopy(GlobalData.optManager.theDragBBoxList[D]),
              o = r.GetSnapRect()
            ) : (b = Utils1.DeepCopy(this.theActionBBox), o = r.GetSnapRect()),
            (
              y = this.theDragEnclosingRect ? Utils1.DeepCopy(this.theDragEnclosingRect) : o
            ) &&
            b
          )
        ) {
          s = y.x - b.x,
            l = y.y - b.y,
            y.x = C.x - y.width / 2,
            y.y = C.y - y.height / 2;
          var F = {
            x: y.x - s,
            y: y.y - l
          };
          if (
            (M = $.extend(!0, {
            }, o)).x = C.x - o.width / 2,
            M.y = C.y - o.height / 2,
            r.CustomSnap(F.x, F.y, 0, 0, !1, C)
          );
          else if (GlobalData.docHandler.documentConfig.centerSnap) I = GlobalData.docHandler.SnapToGrid(C),
            null == R.x &&
            (C.x = I.x),
            null == R.y &&
            (C.y = I.y);
          else {
            var v = GlobalData.docHandler.SnapRect(M);
            null == R.x &&
              (C.x += v.x),
              null == R.y &&
              (C.y += v.y)
          }
        }
        if (this.theMoveList && this.theMoveList.length) {
          n = this.theMoveList.length,
            D = this.theMoveList.indexOf(this.theActionStoredObjectID),
            o = this.theDragEnclosingRect,
            L = {
              x: C.x + o.width / 2,
              y: C.y + o.height / 2
            },
            L = GlobalData.optManager.DoAutoGrowDrag(L),
            C.x = L.x - o.width / 2,
            C.y = L.y - o.height / 2,
            s = C.x - o.x - o.width / 2,
            l = C.y - o.y - o.height / 2,
            o.x + s < 0 &&
            (s = - o.x),
            o.y + l < 0 &&
            (l = - o.y),
            o = GlobalData.optManager.theDragBBoxList[D],
            r.SetShapeOrigin(o.x + s, o.y + l),
            C = this.LM_StampDuringTrack(C, r);
          var G = r.GetDimensionsForDisplay();
          GlobalData.optManager.UpdateDisplayCoordinates(G, C, ConstantData.CursorTypes.Plus, r),
            (k = new SelectionAttributes()).left = G.x,
            k.top = G.y;
          var N = r.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches;
          for (
            k.widthstr = ConstantData.DocumentContext.CurrentWidth,
            k.heightstr = ConstantData.DocumentContext.CurrentHeight,
            k.leftstr = this.GetLengthInRulerUnits(k.left, !1, GlobalData.docHandler.rulerSettings.originx, N),
            k.topstr = this.GetLengthInRulerUnits(k.top, !1, GlobalData.docHandler.rulerSettings.originy, N)
            ,
            // SDUI.Commands.MainController.UpdateRibbonDimensions(k),
            i = 0;
            i < n;
            ++i
          ) if (p = this.theMoveList[i], S = this.GetObjectPtr(p)) {
            if (p !== this.theActionStoredObjectID) {
              if (null == (o = GlobalData.optManager.theDragBBoxList[i])) continue;
              S.SetShapeOrigin(o.x + s, o.y + l)
            }
            null == (d = GlobalData.optManager.GetSVGDragElement(i)) &&
              S.ShapeType === ConstantData.ShapeType.SVGFRAGMENTSYMBOL &&
              null != S.SVGFragment &&
              (
                null == u &&
                (u = GlobalData.optManager.VisibleZList()),
                c = u.indexOf(p),
                this.AddSVGObject(c, p, !0, !1),
                d = GlobalData.optManager.svgObjectLayer.GetElementByID(p)
              ),
              d &&
              d.SetPos(o.x + s, o.y + l)
          }
        } else {
          o = Utils1.DeepCopy(this.theActionBBox),
            y = Utils1.DeepCopy(this.theDragEnclosingRect),
            L = {
              x: C.x + y.width / 2,
              y: C.y + y.height / 2
            },
            L = GlobalData.optManager.DoAutoGrowDrag(L),
            C.x = L.x - y.width / 2,
            C.y = L.y - y.height / 2,
            s = C.x - y.x - y.width / 2,
            l = C.y - y.y - y.height / 2,
            s = o.x + s < 0 ? - y.x : C.x - o.x - o.width / 2,
            l = o.y + l < 0 ? - y.y : C.y - o.y - o.height / 2,
            r.SetShapeOrigin(o.x + s, o.y + l),
            C = this.LM_StampDuringTrack(C, r);
          var k;
          G = r.GetDimensionsForDisplay();
          GlobalData.optManager.UpdateDisplayCoordinates(G, C, ConstantData.CursorTypes.Move, r),
            (k = new SelectionAttributes()).left = G.x,
            k.top = G.y;
          N = r.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches;
          k.widthstr = ConstantData.DocumentContext.CurrentWidth,
            k.heightstr = ConstantData.DocumentContext.CurrentHeight,
            k.leftstr = this.GetLengthInRulerUnits(k.left, !1, GlobalData.docHandler.rulerSettings.originx, N),
            k.topstr = this.GetLengthInRulerUnits(k.top, !1, GlobalData.docHandler.rulerSettings.originy, N),
            // SDUI.Commands.MainController.UpdateRibbonDimensions(k),
            s = C.x - y.x - y.width / 2,
            l = C.y - y.y - y.height / 2,
            y.x + s - g < 0 ? (s = - y.x + g, g = 0) : s = C.x - o.x - o.width / 2,
            y.y + l - h < 0 ? (l = - y.y + h, h = 0) : l = C.y - o.y - o.height / 2,
            r.SetShapeOrigin(o.x + s, o.y + l),
            (
              this.LinkParams &&
              this.LinkParams.ConnectIndex >= 0 ||
              this.LinkParams.ConnectIndexHistory.length > 0
            ) &&
            (
              (m = Utils1.DeepCopy(o)).x += s,
              m.y += l,
              this.HandleHookedObjectMoving(r, m)
            ),
            this.theActionSVGObject.SetPos(o.x + s - g, o.y + l - h);
          var U = this.LinkParams &&
            this.LinkParams.SConnectIndex >= 0;
          E &&
            (
              U ? this.Dynamic_Guides &&
                (
                  this.DynamicSnapsRemoveGuides(this.Dynamic_Guides),
                  this.Dynamic_Guides = null
                ) : this.DynamicSnaps_UpdateGuides(E, _, w)
            )
        }
      }
    }
  }


  SetShapeR(e) {

    //Double ===
    var t, outthick;
    if (
      e.StyleRecord &&
      (
        e.StyleRecord.Line.BThick &&
          null == e.polylist ? (outthick = e.StyleRecord.Line.Thickness, 0) : (outthick = e.StyleRecord.Line.Thickness / 2, outthick),
        t = e.CalcEffectSettings(e.Frame, e.StyleRecord, !1)
      ),
      Utils2.InflateRect(e.r, outthick, outthick),
      t &&
      Utils2.Add2Rect(e.r, t.extent),
      e.DataID >= 0 &&
      (
        e.TextFlags & ConstantData.TextFlags.SED_TF_AttachB ||
        e.TextFlags & ConstantData.TextFlags.SED_TF_AttachA
      )
    ) {
      var a = function (t) {
        if (null != t) {
          var a = GlobalData.optManager.svgObjectLayer.GetElementByID(t);
          if (
            null == a &&
            (
              (
                a = GlobalData.optManager.svgDoc.CreateShape(ConstantData.CreateShapeType.SHAPECONTAINER)
              ).SetID(e.BlockID),
              GlobalData.optManager.svgObjectLayer.AddElement(a, 0),
              e.LM_AddSVGTextObject(GlobalData.optManager.svgDoc, a)
            ),
            a
          ) {
            var r = a.GetElementByID(ConstantData.SVGElementClass.TEXT);
            if (r) {
              var i = r.GetPos(),
                n = r.GetTextMinDimensions();
              return {
                x: i.x,
                y: i.y,
                width: n.width,
                height: n.height
              }
            }
          }
        }
      }(e.BlockID);
      a &&
        (
          a.x += e.Frame.x,
          a.y += e.Frame.y,
          Utils2.UnionRect(e.r, a, e.r)
        )
    }
    if (e.AddDimensionsToR(), 0 !== e.RotationAngle) {
      var r,
        i,
        n = {},
        o = {};
      o.x = e.Frame.x + e.Frame.width / 2,
        o.y = e.Frame.y + e.Frame.height / 2,
        Utils2.CopyRect(n, e.Frame),
        Utils2.CopyRect(e.Frame, e.r),
        // r = ListManager.BaseDrawingObject.prototype.GetPolyPoints.call(e, ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),
        console.log('Opt== SetShapeR e', e),
        console.log('Opt== SetShapeR this', this),
        // r = e.BaseDrawingObject_GetPolyPoints(e, ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),
        r = new BaseDrawingObject(e).GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),

        i = - e.RotationAngle / (180 / ConstantData.Geometry.PI),
        //GlobalData.optManager.RotatePointsAboutPoint(o, i, r),
        Utils3.RotatePointsAboutPoint(o, i, r),
        Utils2.GetPolyRect(e.r, r),
        Utils2.CopyRect(e.Frame, n)
    }
    return 0
  }



  LM_StampDuringTrack(e, t) {
    var a;
    if (this.theActionStoredObjectID < 0) return e;
    if (this.theMoveList && this.theMoveList.length) return e;
    if (null == t) return e;
    if (
      a = this.Move_GetHookPoints(this.theActionStoredObjectID, t, 0, 0)
    ) {
      if (
        this.theDragDeltaX = 0,
        this.theDragDeltaY = 0,
        (
          GlobalData.optManager.LinkParams.DropOnLine ||
          GlobalData.optManager.LinkParams.AutoInsert
        ) &&
        this.FindConnect(
          this.theActionStoredObjectID,
          t,
          GlobalData.optManager.LinkParams.cpt,
          !0,
          !0,
          !1,
          e
        )
      ) return e.x += this.theDragDeltaX,
        e.y += this.theDragDeltaY,
        e;
      this.theDragDeltaX = 0,
        this.theDragDeltaY = 0,
        this.theDragStartX = e.x,
        this.theDragStartY = e.y,
        (
          this.FindConnect(
            GlobalData.optManager.theActionStoredObjectID,
            t,
            a,
            !0,
            !1,
            GlobalData.optManager.LinkParams.AllowJoin,
            e
          ) ||
          GlobalData.optManager.LinkParams.JoinIndex >= 0
        ) &&
        (e.x += this.theDragDeltaX, e.y += this.theDragDeltaY)
    }
    return e
  }




  RotateRect(e, t, a) {
    var r,
      i = [],
      n = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return i.push(new Point(e.x, e.y)),
      i.push(new Point(e.x + e.width, e.y)),
      i.push(new Point(e.x + e.width, e.y + e.height)),
      i.push(new Point(e.x, e.y + e.height)),
      i.push(new Point(e.x, e.y)),
      i &&
      i.length &&
      (
        a &&
        (
          r = - 2 * Math.PI * (a / 360),
          t.x = (e.x + e.x + e.width) / 2,
          t.y = (e.y + e.y + e.height) / 2,
          // GlobalData.optManager.RotatePointsAboutPoint(t, r, i)
          Utils3.RotatePointsAboutPoint(t, r, i)
        ),
        Utils2.GetPolyRect(n, i)
      ),
      n
  }

  RotateRectAboutCenter(e, t, a) {
    var r,
      i = [],
      n = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return i.push(new Point(e.x, e.y)),
      i.push(new Point(e.x + e.width, e.y)),
      i.push(new Point(e.x + e.width, e.y + e.height)),
      i.push(new Point(e.x, e.y + e.height)),
      i.push(new Point(e.x, e.y)),
      i &&
      i.length &&
      (
        a &&
        (
          r = - 2 * Math.PI * (a / 360),
          // GlobalData.optManager.RotatePointsAboutPoint(t, r, i)
          Utils3.RotatePointsAboutPoint(t, r, i)
        ),
        Utils2.GetPolyRect(n, i)
      ),
      n
  }



  FindAllChildConnectors(e, t) {
    for (
      var a = {
        lindex: - 1,
        id: - 1,
        hookpt: 0
      },
      r = [];
      GlobalData.optManager.FindChildArrayByIndex(e, a, t) > 0;
    ) r.push(a.id);
    return r
  }


  FindChildArrayByIndex(e, t, a, r) {
    var i,
      n,
      o,
      s;
    s = a ||
      this.GetObjectPtr(this.theLinksBlockID, !1),
      null == r &&
      (r = ConstantData.DrawingObjectBaseClass.CONNECTOR);
    var l = this.FindLink(s, e, !0);
    if (i = s.length, l >= 0) for (; l < i && s[l].targetid === e;) {
      if (
        l > t.lindex &&
        (
          n = s[l].hookid,
          (o = this.GetObjectPtr(n, !1)) &&
          o.DrawingObjectBaseClass === r
        )
      ) return t.lindex = l,
        t.id = n,
        t.hookpt = o.hooks[0].hookpt,
        n;
      l++
    }
    return - 1
  }


  SD_GetVisioTextChild(e) {
    var t = GlobalData.optManager.GetObjectPtr(e);
    if (t && t.TextFlags & ConstantData.TextFlags.SED_TF_AttachD) {
      var a = GlobalData.optManager.GetObjectPtr(t.associd);
      if (
        a &&
        a.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText
      ) return t.associd
    }
    return - 1
  }



  SetObjectFrame(e, t) {
    var a = this.GetObjectPtr(e, !0);
    return null == a ? 1 : (
      this.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
      a.hooks.length &&
      this.SetLinkFlag(a.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE),
      a.UpdateFrame(t),
      0
    )
  }

  SetObjectAttributes(e, t) {
    var a = GlobalData.objectStore.PreserveBlock(e);
    this.ApplyProperties(t, a.Data)
  }

  ApplyProperties(e, t) {
    for (var a in e) {
      var r = t[a],
        i = e[a],
        n = typeof r;
      if (null == r) {
        var o = typeof i;
        null == i ||
          'string' === o ||
          'number' === o ||
          'boolean' === o ? t[a] = i : i instanceof Array ? t[a] = i.slice(0) : i instanceof Blob ||
            i instanceof Uint8Array ? t[a] = i : 'function' !== n &&
          (t[a] = $.extend(!0, new i.constructor, i))
      } else 'string' === n ||
        'number' === n ||
        'boolean' === n ? t[a] = i : i instanceof Array ? t[a] = i.slice(0) : i instanceof Blob ||
          i instanceof Uint8Array ? t[a] = i : 'function' !== n &&
        (
          r = $.extend(!0, new r.constructor, r),
          t[a] = r,
          this.ApplyProperties(i, r)
        )
    }
  }





  PolyYCurve(e, t, a, r, i, n, o, s) {
    var l,
      S,
      c,
      u,
      p,
      d,
      D,
      g = 0,
      h = {},
      m = !1,
      C = !1;
    for (
      S = t.height / 2,
      l = t.width,
      a < 2 &&
      (a = 2),
      c = (2 * S - n - o) / (a - 1),
      u = 0;
      u < a;
      u++
    ) {
      if (p = c * u + n, r && p < r) {
        if (m) continue;
        p = r,
          m = !0
      }
      if (d = S - p, i && d - i < - S) {
        if (C) break;
        d = - (S - i),
          C = !0
      } (h = new Point(0, 0)).y = t.y + (S - d),
        S ? g = d / S : l = 0,
        D = Utils2.sqrt(1 - g * g) * l,
        h.x = s ? t.x + t.width - D : t.x + D,
        e.push(h)
    }
    return e
  }


  // RotatePointsAboutPoint = function (e, t, a) {
  //   var r,
  //     i,
  //     n,
  //     o,
  //     s,
  //     l;
  //   if (0 !== t) for (
  //     r = Math.sin(t),
  //     i = Math.cos(t),
  //     Math.abs(i) < 0.0001 &&
  //     (i = 0),
  //     Math.abs(r) < 0.0001 &&
  //     (r = 0),
  //     l = a.length,
  //     s = 0;
  //     s < l;
  //     s++
  //   ) n = a[s].x - e.x,
  //     o = a[s].y - e.y,
  //     a[s].x = n * i + o * r + e.x,
  //     a[s].y = - n * r + o * i + e.y
  // }



  // RotatePointsAboutPoint = function (center, angle, points) {
  //   if (angle === 0) return;

  //   const sinAngle = Math.sin(angle);
  //   const cosAngle = Math.cos(angle);

  //   const adjustedCosAngle = Math.abs(cosAngle) < 0.0001 ? 0 : cosAngle;
  //   const adjustedSinAngle = Math.abs(sinAngle) < 0.0001 ? 0 : sinAngle;

  //   for (let i = 0; i < points.length; i++) {
  //     const dx = points[i].x - center.x;
  //     const dy = points[i].y - center.y;

  //     points[i].x = dx * adjustedCosAngle + dy * adjustedSinAngle + center.x;
  //     points[i].y = -dx * adjustedSinAngle + dy * adjustedCosAngle + center.y;
  //   }
  // }



  PolyPtInPolygon(e, t) {
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
      D = [
        {
        },
        {
        },
        {
        }
      ],
      g = 0;
    for (D[0] = e[0], o = e.length, a = 1; a < o - 1; a++) {
      for (
        d = !0,
        D[1] = e[a],
        D[2] = e[a + 1],
        r = 0;
        r < 3 &&
        (
          S = this.SD_GetCounterClockwiseAngleBetween2Points(D[r], t),
          i = r - 1 >= 0 ? r - 1 : 2,
          n = r + 1 < 3 ? r + 1 : 0,
          p = (s = this.SD_GetCounterClockwiseAngleBetween2Points(D[r], D[i])) > (l = this.SD_GetCounterClockwiseAngleBetween2Points(D[r], D[n])) ? s : l,
          u = ConstantData.Geometry.PI - p,
          (s = this.NormalizeAngle(s, u)) > (l = this.NormalizeAngle(l, u)) &&
          (c = s, s = l, l = c),
          ((S = this.NormalizeAngle(S, u)) < s || S > l) &&
          (d = !1),
          d
        );
        r++
      );
      d &&
        g++
    }
    return g % 2 != 0
  }


  GetDrawingScale(drwScale) {
    // var t = ConstantData.RulerUnits;
    // var a = e.majorScale;
    // var r = e.major;
    // switch (
    // null == r &&
    // (r = ConstantData.Defines.DefaultRulerMajor),
    // e.units
    // ) {
    //   case t.SED_Feet:
    //     a *= 12;
    //     break;
    //   case t.SED_Mm:
    //     a /= 10;
    //     break;
    //   case t.SED_M:
    //     a *= 100
    // }
    // return a *= ConstantData.Defines.DefaultRulerMajor / r

    const units = ConstantData.RulerUnits;
    let majorScale = drwScale.majorScale;
    let major = drwScale.major;

    if (major == null) {
      major = ConstantData.Defines.DefaultRulerMajor;
    }

    switch (drwScale.units) {
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

    return majorScale *= ConstantData.Defines.DefaultRulerMajor / major;
  }


  HiliteConnect(e, t, a, r, i, n) {
    var o,
      s = null,
      l = null,
      S = null,
      c = null;
    if (o = e, null != (s = this.GetObjectPtr(e, !1))) {
      var u = s.flags & ConstantData.ObjFlags.SEDO_ContConn ||
        null != n;
      if (
        null != (l = this.svgObjectLayer.GetElementByID(o)) &&
        null != l.GetElementByID(ConstantData.SVGElementClass.SHAPE)
      ) if (
          c = 'hilite_' + o,
          null == (S = this.svgHighlightLayer.GetElementByID(c)) &&
          a
        ) {
          if (null != (S = s.CreateConnectHilites(this.svgDoc, o, t, r, i, n))) {
            this.svgHighlightLayer.AddElement(S);
            try {
              u ||
                S.SetRotation(s.RotationAngle)
            } catch (e) {
              throw e;
            }
          }
        } else null == S ||
          a ||
          this.svgHighlightLayer.RemoveElement(S)
    }
  }

  PolyLJoin1(e, t, a, r, i) {
    // throw new Error();

    // debugger
    console.log('OptHandler.PolyLJoin e, t, a, r, i', e, t, a, r, i)

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
      f = null,
      L = null,
      I = null,
      T = null,
      b = [],
      M = [],
      P = !1,
      R = [],
      A = !1,
      _ = ConstantData.ActionTriggerType.LINEEND,
      E = {
        x: 0,
        y: 0
      },
      w = {},
      F = ConstantData.Defines.SED_KnobSize,
      v = - 1,
      G = GlobalData.optManager.ActiveVisibleZList(),
      N = !1;
    if (null == (f = this.GetObjectPtr(e, !0))) return - 1;
    if (null == (L = this.GetObjectPtr(a, !0))) return - 1;
    if (
      h = f.DataID,
      L.DataID >= 0 &&
      (h = L.DataID),
      m = f.NoteID,
      L.NoteID >= 0 &&
      (m = L.NoteID),
      y = f.CommentID,
      L.CommentID >= 0 &&
      (y = L.CommentID),
      C = f.HyperlinkText,
      L.HyperlinkText &&
      (C = L.HyperlinkText),
      r !== ConstantData.HookPts.SED_WTL &&
      r !== ConstantData.HookPts.SED_WTR ||
      (r = ConstantData.HookPts.SED_KTL),
      e === a &&
      f.LineType === ConstantData.LineType.POLYLINE
    ) {
      A = f.polylist.closed,
        f.polylist.closed = !0,
        s = f.polylist.segs.length,
        f.polylist.segs[s - 1].pt.x = f.polylist.segs[0].pt.x,
        f.polylist.segs[s - 1].pt.y = f.polylist.segs[0].pt.y,
        f.EndPoint.x = f.StartPoint.x,
        f.EndPoint.y = f.StartPoint.y,
        f.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
        this.OpenShapeEdit(e);
      var k = - 1;
      return f instanceof PolyLineContainer &&
        !A &&
        !0 !== i &&
        (
          f.MaintainDimensionThroughPolygonOpennessChange(f.polylist.closed),
          k = - 2
        ),
        f.CalcFrame(),
        GlobalData.optManager.AddToDirtyList(f.BlockID),
        this.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
        this.MaintainLink(e, f, null, _, !1),
        k
    }
    if (
      f.LineType === ConstantData.LineType.POLYLINE ? (I = f, T = L, M.push(a), c = e) : L.LineType === ConstantData.LineType.POLYLINE &&
        (I = L, T = f, u = t, t = r, r = u, M.push(e), c = a),
      null == I
    ) {
      M.push(a),
        M.push(e),
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
        polylist: new PolyList()// new ListManager.PolyList
      };
      for (
        0 === L.StartArrowID &&
        f.StartArrowID > 0 &&
        (
          U.StartArrowID = f.StartArrowID,
          U.StartArrowDisp = f.StartArrowDisp,
          U.ArrowSizeIndex = f.ArrowSizeIndex
        ),
        0 === L.EndArrowID &&
        f.EndArrowID > 0 &&
        (
          U.EndArrowID = f.EndArrowID,
          U.EndArrowDisp = f.EndArrowDisp,
          U.ArrowSizeIndex = f.ArrowSizeIndex
        ),
        U.StyleRecord = Utils1.DeepCopy(f.StyleRecord),
        U.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
        (
          U.StyleRecord.Fill.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT
        ),
        U.StyleRecord.Fill.Hatch = 0,
        o = (
          b = f.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null)
        ).length,
        n = 0;
        n < o;
        n++
      ) switch (
        p = 0 === n ||
          f.LineType === ConstantData.LineType.SEGLINE ? ConstantData.LineType.LINE : f.LineType,
        U.polylist.segs.push(
          new PolySeg(p, b[n].x - f.StartPoint.x, b[n].y - f.StartPoint.y)
        ),
        p
        ) {
          case ConstantData.LineType.ARCLINE:
            f.IsReversed ? U.polylist.segs[U.polylist.segs.length - 1].param = f.CurveAdjust : U.polylist.segs[U.polylist.segs.length - 1].param = - f.CurveAdjust;
            break;
          case ConstantData.LineType.ARCSEGLINE:
            // g = PolyLine.prototype.Pr_PolyLGetArcQuadrant.call(null, b[n - 1], b[n], 0),
            g = new PolyLine().Pr_PolyLGetArcQuadrant(b[n - 1], b[n], 0),

              U.polylist.segs[U.polylist.segs.length - 1].param = g.param,
              U.polylist.segs[U.polylist.segs.length - 1].ShortRef = g.ShortRef
        }
      null == (I = GlobalData.gBusinessManager.AddNewPolyLine(f.objecttype, U)) &&
        (I = new PolyLine(U)),
        I &&
        ConstantData.LineType.ARCSEGLINE,
        T = L,
        P = !0
    }
    if (t === ConstantData.HookPts.SED_KTL) var J = {
      x: I.StartPoint.x,
      y: I.StartPoint.y
    };
    else J = {
      x: I.EndPoint.x,
      y: I.EndPoint.y
    };
    if (r === ConstantData.HookPts.SED_KTL) var x = {
      x: T.StartPoint.x,
      y: T.StartPoint.y
    };
    else x = {
      x: T.EndPoint.x,
      y: T.EndPoint.y
    };
    if (
      l = J.x - x.x,
      S = J.y - x.y,
      T.StartPoint.x += l,
      T.StartPoint.y += S,
      T.EndPoint.x += l,
      T.EndPoint.y += S,
      (
        o = (
          b = T.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null)
        ).length
      ) + (s = I.polylist.segs.length) > ConstantData.Defines.SED_MaxPolySegs
    ) return Utils2.Alert(Resources.Strings.MaxPolySegs, null),
      - 1;
    if (t === ConstantData.HookPts.SED_KTL) {
      if (
        _ = ConstantData.ActionTriggerType.LINESTART,
        r === ConstantData.HookPts.SED_KTL
      ) {
        for (
          l = I.StartPoint.x - b[o - 1].x,
          S = I.StartPoint.y - b[o - 1].y,
          n = 0;
          n < s;
          n++
        ) I.polylist.segs[n].pt.x += l,
          I.polylist.segs[n].pt.y += S;
        for (I.StartPoint.x = b[o - 1].x, I.StartPoint.y = b[o - 1].y, n = 1; n < o; n++) {
          switch (T.LineType) {
            case ConstantData.LineType.POLYLINE:
              E.x = I.polylist.segs[0].pt.x,
                E.y = I.polylist.segs[0].pt.y,
                I.polylist.segs[0] = Utils1.DeepCopy(T.polylist.segs[n]),
                I.polylist.segs[0].pt.x = E.x,
                I.polylist.segs[0].pt.y = E.y,
                I.polylist.segs[0].param = - I.polylist.segs[0].param;
              break;
            case ConstantData.LineType.ARCLINE:
              I.polylist.segs[0].LineType = T.LineType,
                T.IsReversed ? I.polylist.segs[0].param = - T.CurveAdjust : I.polylist.segs[0].param = T.CurveAdjust;
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
          I.polylist.segs.unshift(
            new PolySeg(
              ConstantData.LineType.LINE,
              b[n].x - I.StartPoint.x,
              b[n].y - I.StartPoint.y
            )
          )
        }
      } else {
        for (l = I.StartPoint.x - b[0].x, S = I.StartPoint.y - b[0].y, n = 0; n < s; n++) I.polylist.segs[n].pt.x += l,
          I.polylist.segs[n].pt.y += S;
        switch (I.StartPoint.x = b[0].x, I.StartPoint.y = b[0].y, T.LineType) {
          case ConstantData.LineType.POLYLINE:
            E.x = I.polylist.segs[0].pt.x,
              E.y = I.polylist.segs[0].pt.y,
              I.polylist.segs[0] = Utils1.DeepCopy(T.polylist.segs[o - 1]),
              I.polylist.segs[0].pt.x = E.x,
              I.polylist.segs[0].pt.y = E.y;
            break;
          case ConstantData.LineType.ARCLINE:
            I.polylist.segs[0].LineType = T.LineType,
              T.IsReversed ? I.polylist.segs[0].param = T.CurveAdjust : I.polylist.segs[0].param = - T.CurveAdjust;
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
        for (n = o - 2; n >= 0; n--) if (
          I.polylist.segs.unshift(
            new PolySeg(
              ConstantData.LineType.LINE,
              b[n].x - I.StartPoint.x,
              b[n].y - I.StartPoint.y
            )
          ),
          n > 0
        ) switch (T.LineType) {
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
        !I.polylist.closed &&
        Utils2.pointInRect(D, I.polylist.segs[I.polylist.segs.length - 1].pt) &&
        (
          I.polylist.closed = !0,
          I.polylist.segs[I.polylist.segs.length - 1].pt.x = I.polylist.segs[0].pt.x,
          I.polylist.segs[I.polylist.segs.length - 1].pt.y = I.polylist.segs[0].pt.y,
          I.EndPoint.x = I.StartPoint.x,
          I.EndPoint.y = I.StartPoint.y,
          I instanceof PolyLine &&
          !0 !== i &&
          I.MaintainDimensionThroughPolygonOpennessChange(I.polylist.closed),
          I.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
          this.OpenShapeEdit(I.BlockID),
          GlobalData.optManager.AddToDirtyList(I.BlockID)
        )
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
          switch (
          I.polylist.segs.push(
            new PolySeg(p, b[n].x - I.StartPoint.x, b[n].y - I.StartPoint.y)
          ),
          T.LineType
          ) {
            case ConstantData.LineType.ARCLINE:
              T.IsReversed ? I.polylist.segs[I.polylist.segs.length - 1].param = T.CurveAdjust : I.polylist.segs[I.polylist.segs.length - 1].param = - T.CurveAdjust;
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
          switch (
          I.polylist.segs.push(
            new PolySeg(p, b[n].x - I.StartPoint.x, b[n].y - I.StartPoint.y)
          ),
          T.LineType
          ) {
            case ConstantData.LineType.ARCLINE:
              T.IsReversed ? I.polylist.segs[I.polylist.segs.length - 1].param = - T.CurveAdjust : I.polylist.segs[I.polylist.segs.length - 1].param = T.CurveAdjust;
              break;
            case ConstantData.LineType.POLYLINE:
              I.polylist.segs[I.polylist.segs.length - 1] = Utils1.DeepCopy(T.polylist.segs[n + 1]),
                I.polylist.segs[I.polylist.segs.length - 1].pt.x = b[n].x - I.StartPoint.x,
                I.polylist.segs[I.polylist.segs.length - 1].pt.y = b[n].y - I.StartPoint.y,
                I.polylist.segs[I.polylist.segs.length - 1].param = - I.polylist.segs[I.polylist.segs.length - 1].param;
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
        Utils2.pointInRect(D, I.polylist.segs[0].pt) &&
        (
          I.polylist.closed = !0,
          I.polylist.segs[I.polylist.segs.length - 1].pt.x = I.polylist.segs[0].pt.x,
          I.polylist.segs[I.polylist.segs.length - 1].pt.y = I.polylist.segs[0].pt.y,
          I.EndPoint.x = I.StartPoint.x,
          I.EndPoint.y = I.StartPoint.y,
          I.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
          this.OpenShapeEdit(I.BlockID),
          I instanceof PolyLine &&
          !0 !== i &&
          I.MaintainDimensionThroughPolygonOpennessChange(I.polylist.closed),
          GlobalData.optManager.AddToDirtyList(I.BlockID)
        )
    }
    if (I.CalcFrame(), P) c = this.AddNewObject(I, !1, !0),
      Collab.AddNewBlockToSecondary(c),
      Collab.ClearCreateList(),
      Collab.AddToCreateList(c),
      N = !0,
      GlobalData.optManager.AddToDirtyList(c);
    else {
      var O = GlobalData.optManager.VisibleZList().indexOf(c);
      O >= 0 &&
        this.AddSVGObject(O, c, !0, !0)
    }
    for (
      (I = GlobalData.optManager.GetObjectPtr(c, !1)) &&
      I.DataID < 0 &&
      (
        I.DataID = h,
        f.DataID === h ? (I.TextDirection = f.TextDirection, f.DataID = - 1) : L.DataID === h &&
          (I.TextDirection = L.TextDirection, L.DataID = - 1),
        I.TextFlags = Utils2.SetFlag(
          I.TextFlags,
          ConstantData.TextFlags.SED_TF_HorizText,
          !I.TextDirection
        )
      ),
      I &&
      I.NoteID < 0 &&
      (
        I.NoteID = m,
        f.NoteID === m ? f.NoteID = - 1 : L.NoteID === m &&
          (L.NoteID = - 1),
        I.TextFlags = Utils2.SetFlag(
          I.TextFlags,
          ConstantData.TextFlags.SED_TF_HorizText,
          !I.TextDirection
        )
      ),
      I &&
      I.CommentID < 0 &&
      (
        I.CommentID = y,
        f.CommentID === y ? f.CommentID = - 1 : L.CommentID === y &&
          (L.CommentID = - 1),
        I.TextFlags = Utils2.SetFlag(
          I.TextFlags,
          ConstantData.TextFlags.SED_TF_HorizText,
          !I.TextDirection
        )
      ),
      I &&
      !I.HyperlinkText &&
      (I.HyperlinkText = C),
      n = 0;
      n < M.length;
      n++
    ) this.MoveLinks(c, M[n], null, null);
    if (
      this.DeleteObjects(M, !1),
      this.SetLinkFlag(c, ConstantData.LinkFlags.SED_L_MOVE),
      this.MaintainLink(c, I, null, _, !1),
      this.UpdateLinks(),
      R.push(c),
      this.SelectObjects(R, !1, !0),
      P &&
      v >= 0
    ) {
      var B = G.indexOf(c);
      G.splice(B, 1),
        G.splice(v, 0, c),
        N = !0,
        GlobalData.optManager.AddToDirtyList(c)
    }
    return I instanceof PolyLineContainer &&
      I.MoveBehindAllLinked() &&
      (N = !0),
      N &&
      (
        GlobalData.optManager.IsTopMostVisibleLayer() ? GlobalData.optManager.RenderDirtySVGObjects() : GlobalData.optManager.RenderAllSVGObjects()
      ),
      c
  }







  PolyLJoin(e, t, a, r, i) {
    // debugger
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
          // var arcQuadrant = ListManager.PolyLine.prototype.Pr_PolyLGetArcQuadrant.call(null, polyPoints[n - 1], polyPoints[n], 0);

          // var arcQuadrant = new PolyLine().Pr_PolyLGetArcQuadrant(polyPoints[n - 1], polyPoints[n], 0);

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
      // return Utils2.Alert(Resources.Strings.MaxPolySegs, null),
      console.log('MaxPolySegs'),
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
        Collab.AddNewBlockToSecondary(c),
        Collab.ClearCreateList(),
        Collab.AddToCreateList(c),
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
        // GlobalData.optManager.RotatePointsAboutPoint(c, n, S)),
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





















  MoveLinks(e, t, a, r) {
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
      g = [],
      h = {},
      m = this.GetObjectPtr(this.theLinksBlockID, !0);
    if (null == m) return 1;
    if (S = m.length, null == this.GetObjectPtr(t, !1)) return 1;
    if (null == (o = this.GetObjectPtr(e, !1))) return 1;
    if (null == a && (a = [], (l = this.FindLink(m, t, !0)) >= 0)) for (; l < S && m[l].targetid === t;) a.push(l),
      l++;
    if ((p = a.length) >= 0) {
      for (d = 0; d < p; d++) if ((D = m[l = a[d]].hookid) >= 0) {
        if (null == (n = this.GetObjectPtr(D, !0))) continue;
        if (n.flags & ConstantData.ObjFlags.SEDO_NoMaintainLink) continue;
        for (c = 0; c < n.hooks.length; c++) if (n.hooks[c].objid === t) {
          if (s = n.HookToPoint(n.hooks[c].hookpt, null), r) {
            h = {
              pt: s,
              obj: n,
              index: c
            },
              r.push(h);
            continue
          }
          n.objecttype !== ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY ? (
            g = o.GetTargetPoints(s, ConstantData.HookFlags.SED_LC_NoSnaps, null)
          ) &&
            g.length &&
            (n.hooks[c].connect.x = g[0].x, n.hooks[c].connect.y = g[0].y) : m[l].flags = Utils2.SetFlag(m[l].flags, ConstantData.LinkFlags.SED_L_MOVE, !0),
            n.hooks[c].objid = e,
            m[l].targetid = e
        }
      }
      do {
        for (u = !1, c = 0; c < S - 1; c++) m[c].targetid > m[c + 1].targetid &&
          (u = !0, i = m[c + 1], m[c + 1] = m[c], m[c] = i)
      } while (u)
    }
    return 0
  }

  GetUIAdaptation(e) {
    var t = !1;
    return GlobalData.optManager.isMobilePlatform ? t = !0 : e.gesture ? 'onpointerdown' in window ? e.gesture.srcEvent instanceof PointerEvent &&
      'touch' == e.gesture.srcEvent.pointerType &&
      (t = !0) : 'ontouchstart' in window &&
        - 1 != e.gesture.srcEvent.type.indexOf('touch') ? t = !0 : 'mousedown' == e.gesture.srcEvent.type &&
    (t = !1) : 'onpointerdown' in window ? e instanceof PointerEvent &&
      'touch' == e.pointerType &&
      (t = !0) : 'ontouchstart' in window &&
        - 1 != e.type.indexOf('touch') ? t = !0 : 'mousedown' == e.type &&
    (t = !1),
      t
  }


  DeleteObjects(e, t) {
    // debugger
    console.log('DeleteObjects e,t', e, t)

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
      D = [],
      g = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1);
    if (null != e) {
      for (a = (r = e.length ? e.length : 0) - 1; a >= 0; a--) {
        i = e[a];
        var h = GlobalData.objectStore.GetObject(i);
        if (h) {
          if (
            (p = h.Data).extraflags & ConstantData.ExtraFlags.SEDE_NoDelete &&
            bIsPrimaryStateManager &&
            !t
          ) continue;
          for (
            this.RemoveFromAllZLists(i),
            this.RemoveFromSelectedList(i),
            this.SetLinkFlag(i, ConstantData.LinkFlags.SED_L_DELT),
            S = p.hooks.length,
            c = 0;
            c < S;
            c++
          ) (l = h.Data.hooks[c].objid) > 0 &&
            (u = this.GetObjectPtr(l, !0)) &&
            u.ChangeTarget(
              l,
              i,
              p.hooks[c].cellid,
              p.hooks[c].updhook,
              p.hooks[c].connect,
              !1
            );
          (d = p.DeleteObject()) &&
            D.indexOf(d) < 0 &&
            D.push(d),
            h.Delete()
        } (n = this.svgObjectLayer.GetElementByID(i)) &&
          this.svgObjectLayer.RemoveElement(n),
          o = ConstantData.Defines.Action + i,
          null != (s = this.svgOverlayLayer.GetElementByID(o)) &&
          this.svgOverlayLayer.RemoveElement(s)
      }
      for (r = D.length, a = 0; a < r; a++) switch (D[a].objecttype) {
        case ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART:
          g.layers[g.activelayer].zList.indexOf(D[a].BlockID) >= 0 &&
            (
              GlobalData.optManager.UpdateLinks(),
              GlobalData.optManager.GanttFormat(D[a].BlockID, !0, !1, !0, null)
            );
          break;
        case ConstantData.ObjectTypes.SD_OBJT_NG_TIMELINE:
          null != GlobalData.optManager.GetObjectPtr(D[a].BlockID) &&
            GlobalData.optManager.Timeline_Format(D[a])
      }
    }
  }



  RemoveFromAllZLists(e) {
    var t,
      a,
      r = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, !0),
      i = (r.layers, r.nlayers),
      n = [];
    for (t = 0; t < i; ++t) if (n = r.layers[t].zList, - 1 != (a = $.inArray(e, n))) return void n.splice(a, 1)
  }


  RemoveFromSelectedList(e) {
    var t = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1),
      a = t.indexOf(e);
    - 1 !== a &&
      (
        (
          t = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !0)
        ).splice(a, 1),
        e === GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1).tselect &&
        (
          GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !0).tselect = - 1
        )
      )
  }

  ZList() {
    var e,
      t = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
      a = (t.layers, []);
    for (e = t.nlayers - 1; e >= 0; e--) a = a.concat(t.layers[e].zList);
    return a
  }





  // Utils3.LineDStyleHit = function (e, t, a, r, i) {
  //   var n,
  //     o,
  //     s,
  //     l,
  //     S,
  //     c,
  //     u,
  //     p,
  //     d,
  //     D,
  //     g,
  //     h,
  //     m,
  //     C,
  //     y,
  //     f = - 1,
  //     L = 0,
  //     I = {};
  //   for (c = a + 12 + r, u = e.length, y = 0; y < u - 1; y++) I = Utils2.Pt2Rect(e[y], e[y + 1]),
  //     Utils2.InflateRect(I, c, c),
  //     Utils2.pointInRect(I, t) &&
  //     (
  //       e[y].x === e[y + 1].x ? (
  //         I = e[y].y < e[y + 1].y ? Utils2.SetRect(e[y].x - c, e[y].y, e[y].x + c, e[y + 1].y) : Utils2.SetRect(e[y].x - c, e[y + 1].y, e[y].x + c, e[y].y),
  //         Utils2.pointInRect(I, t) &&
  //         (L = ConstantData.HitCodes.SED_Border, f = y, m = e[y].x, C = t.y)
  //       ) : e[y].y == e[y + 1].y ? (
  //         I = e[y].x < e[y + 1].x ? Utils2.SetRect(e[y].x, e[y].y - c, e[y + 1].x, e[y].y + c) : Utils2.SetRect(e[y + 1].x, e[y].y - c, e[y].x, e[y].y + c),
  //         Utils2.pointInRect(I, t) &&
  //         (L = ConstantData.HitCodes.SED_Border, f = y, C = e[y].y, m = t.x)
  //       ) : (
  //         D = Math.abs(e[y].x - e[y + 1].x),
  //         g = Math.abs(e[y].y - e[y + 1].y),
  //         h = Utils2.sqrt(g * g + D * D),
  //         d = t.x - e[y].x,
  //         g / D < 1 ? (
  //           e[y].x <= e[y + 1].x ? (s = e[y].y, l = e[y + 1].y) : (l = e[y].y, s = e[y + 1].y, d = t.x - e[y + 1].x),
  //           o = s > l ? s - g * d / D : s + g * d / D,
  //           p = (D ? h / D : 1) * c,
  //           t.y <= o + p &&
  //           t.y >= o - p &&
  //           (L = ConstantData.HitCodes.SED_Border, f = y, C = o, m = t.x)
  //         ) : (
  //           e[y].x <= e[y + 1].x ? (s = e[y].y, l = e[y + 1].y, S = e[y].x) : (l = e[y].y, s = e[y + 1].y, S = e[y + 1].x),
  //           n = s > l ? S + D * (s - t.y) / g : S + D * (t.y - s) / g,
  //           p = (g ? h / g : 1) * c,
  //           t.x <= n + p &&
  //           t.x >= n - p &&
  //           (L = ConstantData.HitCodes.SED_Border, f = y, m = n, C = t.y)
  //         )
  //       )
  //     );
  //   return void 0 !== m &&
  //     (t.x = m),
  //     void 0 !== C &&
  //     (t.y = C),
  //     i &&
  //     (i.lpHit = f),
  //     L
  // }




  IsBlobURL(e) {
    return !!(e && e.length > 0 && 'blob:' === e.substring(0, 5))
  }





  SD_GetCounterClockwiseAngleBetween2Points(e, t) {
    var a,
      r,
      i,
      n = ConstantData.Geometry.PI;
    return a = t.x - e.x,
      r = e.y - t.y,
      (i = 0 === a ? r >= 0 ? n / 2 : - n / 2 : 0 === r ? a >= 0 ? 0 : n : Math.atan2(r, a)) < 0 &&
      (i += 2 * n),
      i
  }

  FrontMostLayerZListPreserve() {
    return GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, !0).layers[0].zList
  }

  UndoEditMode() {
    var e,
      t = this.editModeList ||
        [];
    t.length > 1 &&
      (
        t.pop(),
        e = t[t.length - 1],
        this.SetEditMode(e.mode, e.cursor, !1, !0)
      )
  }

  UpdateHook(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S = null,
      c = !1,
      u = !1,
      p = this.GetObjectPtr(e, !0);
    if (null == p) return 1;
    l = p.hooks.length;
    var d = this.GetObjectPtr(this.theLinksBlockID, !0);
    if (null == d) return 1;
    if (p.hooks.length > t && t >= 0 && (S = p.hooks[t].cellid), a >= 0) {
      if (null == (o = this.GetObjectPtr(a, !0))) return 1
    } else n = null;
    t < 0 ? p.hooks.length < p.maxhooks &&
      a >= 0 &&
      (t = p.hooks.length, 1, c = !0) : l > t &&
      (p.hooks[t].objid != a || S != n) &&
    (
      (s = this.GetObjectPtr(p.hooks[t].objid, !0)) &&
      s.ChangeTarget(p.hooks[t].objid, e, S, t, i, !1),
      l = p.hooks.length,
      this.DeleteLink(d, p.hooks[t].objid, e, S, 0, !1),
      u = !0,
      l === p.hooks.length &&
      p.hooks.splice(t, 1),
      t = p.hooks.length,
      c = !0
    ),
      a >= 0 &&
        t >= 0 ? (
        t >= p.hooks.length &&
          p.hooks.length < p.maxhooks ? p.hooks[p.hooks.length] = new Hook(a, n, - 1, r, i) : (
          p.hooks[t].connect.x = i.x,
          p.hooks[t].connect.y = i.y,
          p.hooks[t].hookpt = r,
          p.hooks[t].objid = a
        ),
        p.ChangeHook(t, !0, i),
        c &&
        this.InsertLink(d, e, t, 0),
        o.ChangeTarget(a, e, S, t, i, !0)
      ) : u &&
      (
        p.extraflags & ConstantData.ExtraFlags.SEDE_DeleteOnUnhook &&
        this.DeleteObjects([p.BlockID]),
        p.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT &&
        p &&
        p.datasetElemID > - 1 &&
        (
          ListManager.SDData.DeleteRow(p.datasetElemID),
          p.datasetElemID = - 1
        )
      ),
      2 !== p.hooks.length &&
      2 !== l ||
      !p.Dimensions ||
      this.AddToDirtyList(e)
  }



  CN_ChangeHook(e, t, a, r) {
    var i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p = {},
      d = [];
    if (a) {
      if (
        e.hooks &&
        e.hooks[t] &&
        e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
      ) {
        if ((o = Business.GetParentConnector(e.BlockID, null)) >= 0) {
          if (null == (i = GlobalData.optManager.GetObjectPtr(o, !1))) return;
          if (i._IsFlowChartConnector()) return;
          if (
            i.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH
          ) return;
          if (
            i.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH
          ) return;
          if (
            (
              l = i.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_CoManager
            ) &&
            i.arraylist.hook.length - SDJS.ConnectorDefines.SEDA_NSkip >= 1
          ) return;
          if (i.IsAsstConnector()) return;
          if (
            S = i.objecttype,
            c = i.subtype,
            e.subtype !== ConstantData.ObjectSubTypes.SD_SUBT_TASKMAP &&
            e.subtype !== ConstantData.ObjectSubTypes.SD_SUBT_HUBMAP ||
            (e.subtype = c),
            (n = GlobalData.optManager.FindChildArray(e.BlockID, - 1)) < 0
          ) {
            if (
              i.objecttype === ConstantData.ObjectTypes.SD_OBJT_DECISIONTREE_CONNECTOR
            ) s = gDecisionTreeManager.GetChildConnectorStyle(e);
            else s = Business.GetChildConnectorStyle(e);
            if (
              (n = Business.AddConnector(100, 100, s, e.BlockID)) >= 0 &&
              (u = GlobalData.optManager.GetObjectPtr(n, !0)),
              null == u
            ) return;
            if (
              u.objecttype = S,
              u.subtype = c,
              S === ConstantData.ObjectTypes.SD_OBJT_DECISIONTREE_CONNECTOR
            ) u.TextFlags = ConstantData.TextFlags.SED_TF_AttachC;
            l ? (p.x = 0, p.y = - ConstantData.SEDA_Styles.SEDA_CoManager) : p = s.connect,
              GlobalData.optManager.UpdateHook(n, - 1, e.BlockID, s.hookpt, p, null),
              GlobalData.optManager.SetLinkFlag(e.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
              u.Pr_Format(n),
              GlobalData.optManager.AddToDirtyList(n)
          }
          if (S === ConstantData.ObjectTypes.SD_OBJT_MINDMAP_CONNECTOR) gMindMapManager.ChangeHook(e, t, a, r)
        }
      } else if (
        e instanceof SegmentedLine &&
        e.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CONNECTOR &&
        e.hooks.length >= 2
      ) {
        var D = new Point(0, 0);
        D.x = GlobalData.optManager.GetDependencyLineEndX(e),
          D.y = e.EndPoint.y;
        var g = this.svgObjectLayer.GetElementByID(e.BlockID);
        g &&
          (
            e.EndPoint.x = D.x,
            e.EndPoint.y = D.y,
            e.ModifyShape(g, D.x, D.y, ConstantData.ActionTriggerType.SEGL_PRESERVE)
          )
      }
    } else if (
      e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
    ) for (
        var h = {
          lindex: - 1,
          id: - 1,
          hookpt: 0
        };
        GlobalData.optManager.FindChildArrayByIndex(e.BlockID, h) >= 0;
      ) (n = h.id) >= 0 &&
        0 === GlobalData.optManager.CN_GetNShapes(n) &&
        (d.push(n), GlobalData.optManager.DeleteObjects(d, !1))
  }




  InsertLink(e, t, a, r) {
    var i = this.GetObjectPtr(t, !1);
    if (null == i) return 1;
    if (a >= 0 && a < i.hooks.length) {
      var n = this.FindLink(e, i.hooks[a].objid, !1);
      if (n >= 0) {
        for (; n < e.length && e[n].targetid === i.hooks[a].objid;) {
          if (e[n].hookid == t) return 1;
          n++
        }
        e.splice(n, 0, {
        }),
          e[n] = new Link(i.hooks[a].objid, t, i.hooks[a].cellid),
          r &&
          (e[n].flags = r)
      }
    }
    return 0
  }

  MoveConnectHilite(e, t, a) {
    var r,
      i,
      n = null,
      o = null,
      s = null,
      l = [],
      S = this.svgDoc.docInfo.docToScreenScale,
      c = 0;
    r = e,
      this.svgDoc.docInfo.docScale <= 0.5 &&
      (S *= 2),
      null != (n = this.GetObjectPtr(e, !1)) &&
      (
        c = n instanceof BaseLine ? ConstantData.Defines.CONNECTPT_LINE_DIM / S : ConstantData.Defines.CONNECTPT_DIM / S,
        l.push(t),
        i = n.GetPerimPts(e, l, null, !1, a, - 1),
        null != this.svgObjectLayer.GetElementByID(r).GetElementByID(ConstantData.SVGElementClass.SHAPE) &&
        (
          s = 'hilite_' + r,
          (o = this.svgHighlightLayer.GetElementByID(s)) &&
          o.SetPos(i[0].x - c, i[0].y - c)
        )
      )
  }

  DeleteLink(e, t, a, r, i, n) {
    var o = this.FindLink(e, t, !0),
      s = !1,
      l = - 1;
    if (void 0 === t && (a = - 1), o >= 0) for (; o < e.length && e[o].targetid === t;) - 1 === a ||
      e[o].hookid === a ? (
      s = !0,
      l = e[o].hookid,
      null != r &&
      (s = r === e[o].cellid),
      l >= 0 &&
      0 !== i &&
      (s = this.IsHookType(l, t, i)),
      s ? (l >= 0 && !n && this.RemoveHook(l, t, r), e.splice(o, 1)) : o++
    ) : o++;
    return 0
  }



  RemoveHook(e, t, a) {
    var r = this.GetObjectPtr(e, !0);
    if (null == r) return 1;
    for (var i = 0; i < r.hooks.length; i++) if (r.hooks[i].objid == t) {
      if (null !== a && a !== r.hooks[i].cellid) continue;
      r.ChangeHook(i, 0, r.hooks[i].connect),
        r.hooks.splice(i, 1);
      break
    }
    return 0
  }

  AddToHookList(e, t, a, r, i, n, o) {
    for (var s, l, S, c, u, p, d = {}, D = !1; a < e.length && e[a].targetid == r;) {
      if (s = e[a].hookid, p = this.GetObjectPtr(s, !1)) {
        switch (l = - 1, i) {
          case ConstantData.ListCodes.SED_LC_MOVEHOOK:
          case ConstantData.ListCodes.SED_LC_MOVETARG:
            if (
              2 == p.hooks.length &&
              (
                u = p.hooks[0].objid === r ? p.hooks[1].objid : p.hooks[0].objid,
                D = !1,
                t.indexOf(u) < 0
              )
            ) break;
            D = !0;
            break;
          case ConstantData.ListCodes.SED_LC_CIRCTARG:
          case ConstantData.ListCodes.SED_LC_TOPONLY:
          case ConstantData.ListCodes.SED_LC_MOVETARGANDLINES:
            D = !0
        }
        if (t.indexOf(s) >= 0 && (D = !1), D) {
          if (l < 0) for (S = 0; S < p.hooks.length; S++) if (p.hooks[S].objid == r) {
            l = S;
            break
          }
          if (l >= 0 && p.hooks[l].objid == r) {
            t.push(s);
            var g = p.GetListOfEnclosedObjects(!0);
            if (
              g.length &&
              GlobalData.optManager.JoinHookList(t, g),
              o &&
              0 == (p.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
              (d = p.GetMoveRect(!0, !0), o = Utils2.UnionRect(o, d, o)),
              i === ConstantData.ListCodes.SED_LC_TOPONLY ||
              (
                (c = this.FindLink(e, s, !0)) >= 0 &&
                (t = this.AddToHookList(e, t, c, s, i, n + 1, o)),
                p.hooks.length > 1 &&
                i !== ConstantData.ListCodes.SED_LC_CIRCTARG &&
                (t = this.GetTargetList(s, e, t, o, i))
              ),
              i === ConstantData.ListCodes.SED_LC_CIRCTARG &&
              0 === n &&
              p.hooks.length > 1
            ) for (S = 0; S < p.hooks.length; S++) if (S !== l) {
              if (p.hooks[S].objid == p.hooks[l].objid) break;
              t.push(p.hooks[l].objid)
            }
          }
        }
      }
      a++
    }
    return t
  }


  HandleHookedObjectMoving(e, t) {
    var a = 0,
      r = 0,
      i = null;
    if (
      this.LinkParams &&
      this.LinkParams.ConnectIndex >= 0 &&
      (i = this.GetObjectPtr(this.LinkParams.ConnectIndex, !1)) &&
      i.HookedObjectMoving &&
      i.HookedObjectMoving({
        linkParams: this.LinkParams,
        movingShapeID: e.BlockID,
        movingShapeBBox: t
      }),
      this.LinkParams &&
      this.LinkParams.ConnectIndexHistory.length > 0
    ) {
      r = this.LinkParams.ConnectIndexHistory.length;
      for (a = 0; a < r; a++) this.LinkParams.ConnectIndexHistory[a] !== this.LinkParams.ConnectIndex &&
        (
          i = this.GetObjectPtr(this.LinkParams.ConnectIndexHistory[a], !1)
        ) &&
        i.HookedObjectMoving &&
        i.HookedObjectMoving({
          linkParams: this.LinkParams,
          movingShapeID: e.BlockID,
          movingShapeBBox: t
        })
    }
  }





  GetActiveTextEdit() {
    var e = null,
      t = this.GetObjectPtr(this.theTEDSessionBlockID, !1);
    return - 1 != t.theActiveTextEditObjectID &&
      (e = t.theActiveTextEditObjectID),
      e
  }


  HasExistingLink(e, t) {
    function a(e, t) {
      var a,
        r = GlobalData.optManager.GetObjectPtr(e, !1);
      for (a = 0; a < r.hooks.length; a++) if (r.hooks[a].objid == t) return !0;
      return !1
    }
    return !(!a(e, t) && !a(t, e))
  }

  VerifyLink(e, t) {
    var a,
      r = this.GetObjectPtr(t.targetid, !1),
      i = ListManager;
    if (null == r) return t.flags = Utils2.SetFlag(t.flags, i.LinkFlags.SED_L_DELL, !0),
      - 1;
    for (var n = 0; n < e.hooks.length; n++) if (e.hooks[n].objid === t.targetid && e.hooks[n].cellid === t.cellid) return null === e.hooks[n].cellid ||
      (
        a = r.GetTable(!1),
        this.Table_GetCellWithID(a, e.hooks[n].cellid)
      ) ? n : (
      t.flags = Utils2.SetFlag(t.flags, i.LinkFlags.SED_L_DELL, !0),
      - 1
    );
    return - 1
  }




  LineCheckPoint(e, t) {

    var a,
      r = [];
    return a = Utils1.DeepCopy(t),
      r.push(new Point(e.StartPoint.x, e.StartPoint.y)),
      r.push(new Point(e.EndPoint.x, e.EndPoint.y)),
      0 !== Utils3.LineDStyleHit(r, a, e.StyleRecord.Line.Thickness, 0, 0)
  }

  ArcCheckPoint(e, t) {
    var a;
    return a = e.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !1, !1, null),
      0 !== Utils3.LineDStyleHit(a, t, e.StyleRecord.lineThickness, 0, null)
  }


  CleanupHooks(e, t) {
    var a,
      r;
    if (
      (a = this.GetObjectPtr(e, !1)) &&
      a.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
      (
        !(
          (
            a.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_FlowConn
          ) > 0
        ) &&
        (r = this.GetObjectPtr(t, !1)) &&
        r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE
      )
    ) {
      var i = GlobalData.optManager.FindChildArray(t, e);
      if (i >= 0) if (0 === GlobalData.optManager.CN_GetNShapes(i)) {
        var n = [];
        n.push(i),
          GlobalData.optManager.DeleteObjects(n, !1)
      }
    }
  }





  Lines_Intersect(e, t, a) {
    var r = {
      x: a.x,
      y: a.y
    };
    return !!this.GetIntersectPt(e.StartPoint, e.EndPoint, t.StartPoint, t.EndPoint, t.Frame, r) &&
      (
        r.x >= e.Frame.x &&
        r.x <= e.Frame.x + e.Frame.width &&
        r.y >= e.Frame.y &&
        r.y <= e.Frame.y + e.Frame.height &&
        (a.x = r.x, a.y = r.y, !0)
      )
  }

  Table_HideUI(e) {
    var t = ConstantData.ObjectTypes;
    return e.objecttype === t.SD_OBJT_UIELEMENT
  }


  InflateLine(e, t, a, r) {

    var i,
      n,
      o,
      s,
      l,
      S,
      c,
      u = [],
      p = [],
      d = {};
    function D(e, t) {
      var a = t.x - e.x,
        r = t.y - e.y;
      return Utils2.sqrt(a * a + r * r)
    }
    function g(e, t, a) {
      var r = e - Math.PI / 2;
      return e -= r,
        (t -= r) < 0 &&
        (t += 2 * Math.PI),
        t > 2 * Math.PI &&
        (t -= 2 * Math.PI),
        Math.abs(e - t) <= a
    }
    function h(e, t) {
      var a,
        r,
        i,
        o = [],
        s = {};
      for (
        o = Utils1.DeepCopy(e),
        Utils2.GetPolyRect(s, o),
        n = 0;
        n < o.length;
        n++
      ) o[n].x -= s.x,
        o[n].y -= s.y;
      if ((a = 2 * t) > (i = Math.max(s.width, s.height))) return e;
      for (r = (i + a) / i, n = 0; n < o.length; n++) o[n].x *= r,
        o[n].y *= r,
        o[n].x += s.x - t,
        o[n].y += s.y - t;
      return o
    }
    function m(e, t, a, r, i) {
      var n,
        o = [],
        s = D(e, t),
        l = D(e, a),
        S = s > 0 ? l / s : 0,
        c = D(r, i);
      return o = [
        {
          x: r.x,
          y: r.y
        },
        {
          x: 0,
          y: 0
        },
        {
          x: i.x,
          y: i.y
        }
      ],
        n = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(r, i),
        // GlobalData.optManager.RotatePointsAboutPoint(o[0], - n, o),
        Utils3.RotatePointsAboutPoint(o[0], - n, o),
        o[1].y = o[0].y,
        o[2].x > o[0].x ? o[1].x = o[0].x + c * S : o[1].x = o[0].x - c * S,
        // GlobalData.optManager.RotatePointsAboutPoint(o[0], n, o),
        Utils3.RotatePointsAboutPoint(o[0], n, o),
        o[1]
    }
    if (
      (s = t / 2) < 3 ? s = 3 : s > 5 &&
        (s = 5),
      null === (u = this.CalcPolyOutline(e, t, a, r, s, d)) ||
      d.segmentsInserted
    ) return h(e, r ? t : - t);
    if (
      a &&
      u.push(new Point(u[0].x, u[0].y)),
      - 1 == (i = this.GetPolygonWindingDirection(e)) &&
      r &&
      u.reverse(),
      1 != i ||
      r ||
      u.reverse(),
      null === this.CalcPolyOutline(u, t, a, !r, s, d) ||
      d.segmentsInserted
    ) return h(e, r ? t : - t);
    for (S = e.length, c = u.length; --c > 0 && --S > 0;) if (
      !g(
        GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(e[S - 1], e[S]),
        l = GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(u[c - 1], u[c]),
        0.01
      )
    ) {
      for (n = S - 1; n >= 0; n--) {
        if (
          g(
            GlobalData.optManager.SD_GetCounterClockwiseAngleBetween2Points(e[n], e[S]),
            l,
            0.01
          )
        ) {
          for (o = p.length - 1; o >= 0; o--) u.splice(c, 0, m(e[S], e[S - p.length], p[o], u[c], u[c - 1]));
          S -= p.length,
            p = [];
          break
        }
        p.push(new Point(e[n].x, e[n].y))
      }
      if (p.length > 0) break
    }
    return u.length !== e.length &&
      (u = h(e, r ? t : - t)),
      u
  }


  CalcPolyOutline(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g = [],
      h = [],
      m = 0,
      C = {
        x: 0,
        y: 0
      },
      y = 100000;
    if (e.length < 2) return null;
    if (a) {
      for (s = 0; s < e.length - 1; s++) (e[s + 1].x - e[s].x) * (e[s + 1].y + e[s].y);
      m = this.GetPolygonWindingDirection(e)
    } else m = 1;
    if (r || (m = - m), m < 1 ? (p = e.length - 1, d = - 1) : (p = 0, d = e.length), !t) return g = Utils1.DeepCopy(e);
    for (o = 0, u = p - m, i ? c = i : (c = t / 2) < 3 ? c = 3 : c > 5 && (c = 5), s = p; s != d; s += m) {
      if (u < 0 || u > e.length - 1) {
        if (!a) {
          u = s;
          continue
        }
        u = u < 0 ? e.length - 1 : 0
      }
      if (s == d - m && (c = 2), !(Utils1.DeltaPoints(e[s], e[u]) < c)) {
        var f = new SegmentData();
        f.origSeg.start = Utils1.DeepCopy(e[u]),
          f.origSeg.end = Utils1.DeepCopy(e[s]),
          Utils1.CalcExtendedOffsetSegment(f, t, 2, y),
          f.clipSeg.start = Utils1.DeepCopy(f.extSeg.start),
          f.clipSeg.end = Utils1.DeepCopy(f.extSeg.end),
          o > 0 &&
            f.angle == h[o - 1].angle ? (
            h[o - 1].origSeg.end = Utils1.DeepCopy(f.origSeg.end),
            h[o - 1].clipSeg.end = Utils1.DeepCopy(f.clipSeg.end),
            h[o - 1].extSeg.end = Utils1.DeepCopy(f.extSeg.end),
            h[o - 1].extSeg.endExt = Utils1.DeepCopy(f.extSeg.endExt),
            h[o - 1].extSeg.endRay = Utils1.DeepCopy(f.extSeg.endRay)
          ) : (h.push(f), o++),
          u = s
      }
    }
    if (!o) return null;
    if (1 == o) return g.push(h[0].clipSeg.start),
      g.push(h[0].clipSeg.end),
      g;
    for (l = o - 1, s = 0; s < o; s++) a ||
      0 !== s ? (
      Utils1.compareAngle(h[s].angle, h[l].angle) > 0 &&
      (
        Utils1.CalcSegmentIntersect(
          h[l].clipSeg.start,
          h[l].extSeg.endExt,
          h[s].extSeg.startExt,
          h[s].clipSeg.end,
          C
        ) ? (
          h[l].clipSeg.end = Utils1.DeepCopy(C),
          h[s].clipSeg.start = Utils1.DeepCopy(C)
        ) : Utils1.DeltaAngle(h[s].angle, h[l].angle) < 15 ? (
          h[l].clipSeg.end.x = (h[l].extSeg.end.x + h[s].extSeg.start.x) / 2,
          h[l].clipSeg.end.y = (h[l].extSeg.end.y + h[s].extSeg.start.y) / 2,
          h[s].clipSeg.start = Utils1.DeepCopy(h[l].clipSeg.end)
        ) : (
          h[l].clipSeg.end = Utils1.DeepCopy(h[l].extSeg.endExt),
          h[s].clipSeg.start = Utils1.DeepCopy(h[s].extSeg.startExt),
          Utils1.InsertSegment(h, s, h[l].clipSeg.end, h[s].clipSeg.start, t, 2, y),
          o++,
          s++,
          n.segmentsInserted = !0
        )
      ),
      l = s
    ) : l = s;
    for (l = 0, s = 1; s < o; s++) {
      if (D = !1, Utils1.AreSegmentsObtuse(h, o, s, l) && Utils1.AreSegmentsAjacent(o, s, l)) D = !0;
      else if (
        Utils1.CalcSegmentIntersect(
          h[l].clipSeg.start,
          h[l].clipSeg.end,
          h[s].clipSeg.start,
          h[s].clipSeg.end,
          C
        )
      ) D = !0,
        h[l].clipSeg.end = Utils1.DeepCopy(C),
        h[s].clipSeg.start = Utils1.DeepCopy(C);
      else if (Utils1.SegmentsInAlignment(h, o, s, l)) D = !0,
        h[l].clipSeg.end.x = (h[l].clipSeg.end.x + h[s].clipSeg.start.x) / 2,
        h[l].clipSeg.end.y = (h[l].clipSeg.end.y + h[s].clipSeg.start.y) / 2,
        h[s].clipSeg.start = h[l].clipSeg.end;
      else if (l > 0) for (S = l - 1; S >= 0 && !D && !(S < 0);) if (Utils1.isEmptySeg(h[S].clipSeg)) S--;
      else {
        if (s != o - 1 && Utils1.AreSegmentsObtuse(h, o, s, S)) break;
        if (
          Utils1.CalcSegmentIntersect(
            h[S].clipSeg.start,
            h[S].clipSeg.end,
            h[s].clipSeg.start,
            h[s].clipSeg.end,
            C
          )
        ) {
          l = S,
            h[S].clipSeg.end = Utils1.DeepCopy(C),
            h[s].clipSeg.start = Utils1.DeepCopy(C),
            D = !0;
          break
        }
        if (
          Utils1.isEnd(s, h.length, a) &&
          Utils1.DeltaAngle(h[s].angle, h[S].angle) > 0 &&
          Utils1.CalcSegmentIntersect(
            h[S].clipSeg.start,
            h[S].extSeg.endRay,
            h[s].clipSeg.start,
            h[s].clipSeg.end,
            C
          )
        ) {
          l = S,
            h[S].clipSeg.end = Utils1.DeepCopy(C),
            h[s].clipSeg.start = Utils1.DeepCopy(C),
            D = !0;
          break
        }
        S--
      }
      if (D) {
        for (S = l + 1; S < s;) h[S].clipSeg.end = Utils1.DeepCopy(h[S].clipSeg.start),
          S++;
        l = s
      } else if (Utils1.isEnd(s, h.length, a)) for (
        h[l].clipSeg.end = Utils1.DeepCopy(h[s].extSeg.end),
        S = l + 1;
        S < o;
      ) h[S].clipSeg.end = Utils1.DeepCopy(h[S].clipSeg.start),
        S++;
      else h[s].clipSeg.end = Utils1.DeepCopy(h[s].clipSeg.start)
    }
    if (a) {
      for (p = d = - 1, s = 0; s < o; s++) if (!Utils1.isEmptySeg(h[s].clipSeg)) {
        p = s;
        break
      }
      for (s = o - 1; s >= 0; s--) if (!Utils1.isEmptySeg(h[s].clipSeg)) {
        d = s;
        break
      }
      if (p >= 0 && d >= 0) for (D = !1, s = p; !D && s < d; s++) if (Utils1.AreSegmentsObtuse(h, o, s, l = d) && Utils1.AreSegmentsAjacent(o, s, l)) D = !0;
      else if (
        Utils1.CalcSegmentIntersect(
          h[l].clipSeg.start,
          h[l].clipSeg.end,
          h[s].clipSeg.start,
          h[s].clipSeg.end,
          C
        )
      ) D = !0,
        h[l].clipSeg.end = Utils1.DeepCopy(C),
        h[s].clipSeg.start = Utils1.DeepCopy(C);
      else if (Utils1.SegmentsInAlignment(h, o, s, l)) D = !0;
      else {
        for (S = l - 1; S > s && !D;) if (Utils1.isEmptySeg(h[S].clipSeg)) S--;
        else {
          if (Utils1.AreSegmentsObtuse(h, o, s, S)) break;
          if (
            Utils1.CalcSegmentIntersect(
              h[S].clipSeg.start,
              h[S].clipSeg.end,
              h[s].clipSeg.start,
              h[s].clipSeg.end,
              C
            )
          ) {
            l = S,
              h[S].clipSeg.end = Utils1.DeepCopy(C),
              h[s].clipSeg.start = Utils1.DeepCopy(C),
              D = !0;
            break
          }
          S--
        }
        if (D) for (S = l + 1; S <= d;) h[S].clipSeg.end = Utils1.DeepCopy(h[S].clipSeg.start),
          S++;
        else h[s].clipSeg.end = Utils1.DeepCopy(h[s].clipSeg.start)
      }
    }
    for (s = 0; s < o; s++) Utils1.isEmptySeg(h[s].clipSeg) ||
      (
        0 !== g.length &&
        h[s].clipSeg.start.x == g[g.length - 1].x &&
        h[s].clipSeg.start.y == g[g.length - 1].y ||
        g.push(Utils1.DeepCopy(h[s].clipSeg.start)),
        g.push(Utils1.DeepCopy(h[s].clipSeg.end))
      );
    for (; g.length > 1 && Utils1.DeltaPoints(g[g.length - 1], g[0]) < 3;) g.splice(g.length - 1, 1);
    return (g.length < 2 && !a || g.length < 3 && a) &&
      (g = null),
      g
  }



  GetPolygonWindingDirection(e) {

    var t,
      a = 0;
    for (t = 0; t < e.length - 1; t++) a += (e[t + 1].x - e[t].x) * (e[t + 1].y + e[t].y);
    return a > 0 ? - 1 : 1
  }


  GetTargetList(e, t, a, r, i) {
    var n,
      o,
      s,
      l,
      S = {},
      c = ConstantData.ListCodes.SED_LC_MOVEHOOK;
    if (
      i === ConstantData.ListCodes.SED_LC_MOVETARGANDLINES &&
      (c = i),
      null == (n = this.GetObjectPtr(e, !1))
    ) return a;
    GlobalData.optManager.FixAnyCircularHooks(n);
    for (var u = 0; u < n.hooks.length; u++) s = n.hooks[u].objid,
      a.indexOf(s) < 0 &&
      (
        a.push(s),
        o = this.GetObjectPtr(s, !1),
        r &&
        0 == (o.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
        (S = o.GetMoveRect(!0, !0), r = Utils2.UnionRect(r, S, r))
      ),
      (l = this.FindLink(t, s, !0)) >= 0 &&
      (a = this.AddToHookList(t, a, l, s, c, 1, r)),
      a = this.GetTargetList(s, t, a, r, i);
    return a
  }


  SD_GetClockwiseAngleBetween2PointsInDegrees(e, t) {
    var a,
      r,
      i,
      n = ConstantData.Geometry.PI;
    return a = t.x - e.x,
      r = t.y - e.y,
      (i = 0 === a ? r >= 0 ? n / 2 : - n / 2 : 0 === r ? a >= 0 ? 0 : n : Math.atan2(r, a)) < 0 &&
      (i += 2 * n),
      i * (180 / ConstantData.Geometry.PI)
  }



  NormalizeAngle(e, t) {
    return (e += t) >= 2 * ConstantData.Geometry.PI &&
      (e -= 2 * ConstantData.Geometry.PI),
      e < 0 &&
      (e += 2 * ConstantData.Geometry.PI),
      e
  }

  OffsetShape(e, t, a, r) {
    var i = {},
      n = GlobalData.objectStore.PreserveBlock(e);
    this.InitializeAutoGrowDrag(r);
    var o = n.Data;
    o.OffsetShape(t, a),
      i.x = o.r.x + o.r.width,
      i.y = o.r.y + o.r.height,
      this.DoAutoGrowDrag(i),
      (t || a) &&
      (
        this.SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE),
        this.AddToDirtyList(e, !0)
      )
  }


  Table_ExtendLines(e, t) {
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
      h = e.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !0, !1, !1, null),
      m = [
        0,
        0
      ];
    for (
      p = e.trect.x - e.Frame.x,
      d = e.trect.y - e.Frame.y,
      D = e.inside.x - e.Frame.x,
      g = e.inside.y - e.Frame.y,
      i = t.rows.length,
      S = t.cols.length,
      r = 0;
      r < i - 1;
      r++
    ) if (
        o = (a = t.rows[r]).segments.length,
        l = a.frame.y + a.frame.height + d,
        l -= t.cells[t.rows[r].start].hdisp / 2,
        2 == this.PolyGetIntersect(h, l, m, null, !1)
      ) for (n = 0; n < o; n++) (s = a.segments[n]).x_start <= 0 &&
        (s.x_start = m[0] - p + D),
        s.ncells + s.start === a.ncells &&
        (s.x_end = m[1] - p - D);
    for (r = 0; r < S - 1; r++) if (
      o = (c = t.cols[r]).segments.length,
      u = c.x + p - c.vdisp / 2,
      2 == this.PolyGetIntersect(h, u, m, null, !0)
    ) for (n = 0; n < o; n++) 0 === (s = c.segments[n]).rowstart &&
      (s.y = m[0] - d + g),
      s.rowend === i - 1 &&
      (s.bottom = m[1] - d - g)
  }


  PolyGetIntersect(e, t, a, r, i) {
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
      y = {},
      f = {},
      L = 0;
    ConstantData.Defines.LongIntMax;
    for (S = e.length, n = 0, o = 1; o < S + 1; o++) if (
      c = o,
      f = e[n],
      o === S ? (y = e[0], c = 0) : y = e[o],
      !Utils2.IsEqual(y.x, f.x) ||
      !Utils2.IsEqual(y.y, f.y)
    ) if (n = o, u = y.x - f.x, p = y.y - f.y, i) {
      if (f.x < y.x ? (m = f.x, C = y.x) : (m = y.x, C = f.x), t < m || t > C) continue;
      if (
        0 === u &&
        (u = 1),
        D = p / u * (t - f.x) + f.y,
        f.y < y.y ? (g = f.y, h = y.y) : (h = f.y, g = y.y),
        D >= g &&
        D <= h
      ) {
        if (L > 0) for (l = 0; l < L && (s = Math.abs(D - a[l]) > 1); l++);
        else s = !0;
        if (s) {
          if (!(L < 2)) return L + 1;
          a[L] = D,
            r &&
            (r[L] = c),
            L++
        }
      }
    } else {
        if (f.y < y.y ? (m = f.y, C = y.y) : (m = y.y, C = f.y), t < m || t > C) continue;
        if (
          0 === p &&
          (p = 1),
          d = u / p * (t - f.y) + f.x,
          f.x < y.x ? (g = f.x, h = y.x) : (h = f.x, g = y.x),
          d >= g &&
          d <= h
        ) {
          if (L > 0) for (l = 0; l < L && (s = Math.abs(d - a[l]) > 1); l++);
          else s = !0;
          if (s) {
            if (!(L < 2)) return L + 1;
            a[L] = d,
              r &&
              (r[L] = c),
              L++
          }
        }
      }
    return 2 === L &&
      a[0] > a[1] &&
      (s = a[1], a[1] = a[0], a[0] = s, r && (s = r[1], r[1] = r[0], r[0] = s)),
      L
  }


  GetShapeParams(e, t) {
    var a,
      r = !1,
      i = 0;
    switch (e) {
      case ConstantData.SDRShapeTypes.SED_S_Rect:
      case ConstantData.SDRShapeTypes.SED_S_Oval:
      case ConstantData.SDRShapeTypes.SED_S_RRect:
        e;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Circ:
        r = !0,
          e;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Diam:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          // a = ListManager.PolygonShapeGenerator.SED_S_Diam;
          a = PolygonShapeGenerator.SED_S_Diam;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Tri:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          a = PolygonShapeGenerator.SED_S_Tri;
        break;
      case ConstantData.SDRShapeTypes.SED_S_TriB:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          a = PolygonShapeGenerator.SED_S_TriB;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Pgm:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = 0.13333 * t.width,
          a = PolygonShapeGenerator.SED_S_Pgm;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Pent:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = 0.4 * t.height,
          a = PolygonShapeGenerator.SED_S_Pent,
          r = !1;
        break;
      case ConstantData.SDRShapeTypes.SED_S_PentL:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = 0.4 * t.width,
          a = PolygonShapeGenerator.SED_S_PentL,
          r = !1;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Hex:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = 0.26 * t.width,
          a = PolygonShapeGenerator.SED_S_Hex,
          r = !1;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Oct:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = 0.28,
          a = PolygonShapeGenerator.SED_S_Oct,
          r = !1;
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrR:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = 0.3 * t.width,
          a = PolygonShapeGenerator.SED_S_ArrR;
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrL:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = 0.3 * t.width,
          a = PolygonShapeGenerator.SED_S_ArrL;
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrT:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = 0.3 * t.height,
          a = PolygonShapeGenerator.SED_S_ArrT;
        break;
      case ConstantData.SDRShapeTypes.SED_S_ArrB:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = 0.3 * t.height,
          a = PolygonShapeGenerator.SED_S_ArrB;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Trap:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = 0.2 * t.width,
          a = PolygonShapeGenerator.SED_S_Trap;
        break;
      case ConstantData.SDRShapeTypes.SED_S_TrapB:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = 0.2 * t.width,
          a = PolygonShapeGenerator.SED_S_TrapB;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Input:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = 0.27 * t.height,
          a = PolygonShapeGenerator.SED_S_Input;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Term:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          a = PolygonShapeGenerator.SED_S_Term;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Store:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = t.width / 7.5,
          a = PolygonShapeGenerator.SED_S_Store;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Doc:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          a = PolygonShapeGenerator.SED_S_Doc,
          i = t.height / 7.5;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Delay:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = t.width / 5,
          a = PolygonShapeGenerator.SED_S_Delay;
        break;
      case ConstantData.SDRShapeTypes.SED_S_Disp:
        ConstantData.SDRShapeTypes.SED_S_Poly,
          i = t.width / 7.5,
          a = PolygonShapeGenerator.SED_S_Disp
    }
    return {
      dataclass: e,
      shapeparam: i,
      polyVectorMethod: a,
      bCircularize: r
    }
  }

  BuildCreateMessage(e, t) {
    if (Collab.AllowMessage()) {
      var a = [];
      if (
        Collab.IsSecondary() &&
        (
          this.theMoveList &&
            this.theMoveList.length ? a = a.concat(this.theMoveList) : a.push(this.theDrawShape.BlockID)
        ),
        this.theDrawShape.SymbolID
      ) {
        e.symbolID = this.theDrawShape.SymbolID,
          e.CreateList = a,
          e.StyleRecord = Utils1.DeepCopy(this.theDrawShape.StyleRecord),
          e.Actions = [];
        var r = new Collab.MessageAction(ConstantData.CollabMessageActions.CreateSymbol);
        if (
          e.Actions.push(r),
          r = new Collab.MessageAction(ConstantData.CollabMessageActions.MoveObject),
          e.Actions.push(r),
          r = new Collab.MessageAction(ConstantData.CollabMessageActions.LinkObject),
          e.Actions.push(r),
          i = Collab.BuildMessage(ConstantData.CollabMessages.AddSymbol, e, !1, !0),
          !t
        ) return i;
        Collab.SendMessage(i)
      } else {
        e.attributes = {},
          e.CreateList = a,
          e.attributes.StyleRecord = Utils1.DeepCopy(this.theDrawShape.StyleRecord),
          e.attributes.Frame = Utils1.DeepCopy(this.theDrawShape.Frame),
          e.attributes.TMargins = Utils1.DeepCopy(this.theDrawShape.TMargins),
          e.attributes.TextGrow = this.theDrawShape.TextGrow,
          e.attributes.ObjGrow = this.theDrawShape.ObjGrow,
          e.attributes.TextAlign = this.theDrawShape.TextAlign,
          e.attributes.flags = this.theDrawShape.flags,
          e.attributes.moreflags = this.theDrawShape.moreflags,
          e.attributes.shapeparam = this.theDrawShape.shapeparam,
          e.attributes.Dimensions = this.theDrawShape.Dimensions,
          e.attributes.dataclass = this.theDrawShape.dataclass,
          this.theDrawShape.VertexArray &&
          (
            e.attributes.VertexArray = Utils1.DeepCopy(this.theDrawShape.VertexArray)
          ),
          e.ShapeType = this.theDrawShape.ShapeType,
          e.Actions = [];
        r = new Collab.MessageAction(ConstantData.CollabMessageActions.CreateShape);
        e.Actions.push(r),
          r = new Collab.MessageAction(ConstantData.CollabMessageActions.MoveObject),
          e.Actions.push(r),
          r = new Collab.MessageAction(ConstantData.CollabMessageActions.LinkObject),
          e.Actions.push(r);
        var i = Collab.BuildMessage(ConstantData.CollabMessages.AddSymbol, e, !1, !0);
        if (!t) return i;
        Collab.SendMessage(i)
      }
    }
  }


  RotateShapes(e, t) {
    var a = GlobalData.optManager.GetObjectPtr(this.theSelectedListBlockID, !1)
      , r = this.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1);
    t && (a = t);
    var i, n, o = a.length;
    if (0 !== o) {
      var s, l, S, c, u = 0, p = 0, d = null, D = 0, g = 0;
      for (u = 0; u < o && !(l = (d = this.GetObjectPtr(a[u], !1)).NoRotate()); ++u)
        ;
      if (l)
        // SDJS.Utils.Alert(SDUI.Resources.Strings.NoRotate, null);
        console.log('NoRotate');
      else {
        for (u = 0; u < a.length; u++)
          if ((d = this.GetObjectPtr(a[u], !1)) instanceof PolyLineContainer/* ListManager.PolyLineContainer*/) {
            var h = d.GetListOfEnclosedObjects(!1);
            if (h.length > 0) {
              if (!this.AllowGroup(h))
                // return void SDJS.Utils.Alert(SDUI.Resources.Strings.GroupNotAllowed, null);
                console.log('GroupNotAllowed');
              if (this.IsLinkedOutside(h))
                // return void SDJS.Utils.Alert(SDUI.Resources.Strings.LinkedOutside);
                console.log('LinkedOutside');
              if (this.IsGroupNonDelete())
                // return void SDJS.Utils.Alert(SDUI.Resources.Strings.GroupNonDelete)
                console.log('GroupNonDelete');
            }
          }

        /*
      if (null == t && Collab.AllowMessage()) {
        Collab.BeginSecondaryEdit();
        var m = {
          angle: e
        }
          , C = Collab.BuildMessage(ConstantData.CollabMessages.RotateShapes, m, !0, !0);
        Collab.LockMessages()
      }*/
        var rotatedList;
        for (u = 0; u < a.length; u++) {
          if ((d = this.GetObjectPtr(a[u], !0)) instanceof PolyLine /*ListManager.PolyLine*/ && d.rflags && (this.rflags =
            // SDJS.Utils.SetFlag
            Utils2.SetFlag
              (this.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),

            // this.rflags = SDJS.Utils.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !1)),
            this.rflags = Utils2.SetFlag(this.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !1)),
            d instanceof PolyLineContainer/*ListManager.PolyLineContainer*/ && (this.SetLinkFlag(a[u], ConstantData.LinkFlags.SED_L_MOVE),
              this.AddToDirtyList(a[u]),
              rotatedList = d.RotateAllInContainer(d.BlockID, e),
              rotatedList && rotatedList.length))
            for (p = a.length - 1; p >= 0; p--)
              rotatedList.indexOf(a[p]) >= 0 && a[p] != d.BlockID && a.splice(p, 1);
          if (d instanceof PolyLineContainer/*ListManager.PolyLineContainer*/ || d.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL)
            var obj;
          for (p = a.length - 1; p >= 0; p--)
            obj = GlobalData.optManager.GetObjectPtr(a[p], !1),
              obj && obj.hooks.length && obj.hooks[0].objid === d.BlockID && a.splice(p, 1)
        }
        for (o = a.length,
          u = 0; u < o; ++u)
          if (!((d = this.GetObjectPtr(a[u], !0)) instanceof PolyLineContainer/*ListManager.PolyLineContainer*/))
            if (this.SetLinkFlag(a[u], ConstantData.LinkFlags.SED_L_MOVE),
              this.AddToDirtyList(a[u]),
              d instanceof BaseLine/*ListManager.BaseLine*/)
              if (d instanceof PolyLine/*ListManager.PolyLine*/) {
                var y = {
                  x: d.Frame.x + d.Frame.width / 2,
                  y: d.Frame.y + d.Frame.height / 2
                };
                s = 2 * Math.PI * ((360 - e) / 360);
                var f = d.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null);
                // GlobalData.optManager.RotatePointsAboutPoint(y, s, f);
                Utils3.RotatePointsAboutPoint(y, s, f);
                var L = f.length;
                for (d.StartPoint.x = f[0].x,
                  d.StartPoint.y = f[0].y,
                  p = 0; p < L; p++)
                  d.polylist.segs[p].pt.x = f[p].x - d.StartPoint.x,
                    d.polylist.segs[p].pt.y = f[p].y - d.StartPoint.y;
                d.EndPoint.x = f[L - 1].x,
                  d.EndPoint.y = f[L - 1].y,
                  d.CalcFrame()
              } else {
                GlobalData.optManager.ob = Utils1./* SDJS.Editor.*/DeepCopy(d);
                var I = (d.StartPoint.x + d.EndPoint.x) / 2
                  , T = (d.StartPoint.y + d.EndPoint.y) / 2
                  , b = Math.sqrt((d.EndPoint.x - d.StartPoint.x) * (d.EndPoint.x - d.StartPoint.x) + (d.EndPoint.y - d.StartPoint.y) * (d.EndPoint.y - d.StartPoint.y));
                s = 2 * Math.PI * (e / 360),
                  b /= 2,
                  d.StartPoint.x = I - Math.cos(s) * b,
                  d.StartPoint.y = T - Math.sin(s) * b,
                  d.EndPoint.x = I + Math.cos(s) * b,
                  d.EndPoint.y = T + Math.sin(s) * b,
                  d.AfterRotateShape(d.BlockID),
                  GlobalData.optManager.ob = {}
              }
            else
              d.RotationAngle = e,
                d.UpdateFrame(d.Frame),
                (i = GlobalData.optManager.SD_GetVisioTextChild(a[u])) >= 0 && (n = GlobalData.optManager.GetObjectPtr(i, !0)) && (n.VisioRotationDiff ? n.RotationAngle = e - n.VisioRotationDiff : n.RotationAngle = e,
                  n.UpdateFrame(n.Frame),
                  this.AddToDirtyList(i)),
                this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto && (S = d.r.x + d.r.width,
                  c = d.r.y + d.r.height,
                  S > r.dim.x && (D = r.dim.x - S),
                  c > r.dim.y && (g = r.dim.y - c)),
                d.r.x < 0 && (D = -d.r.x),
                d.r.y < 0 && (g = -d.r.y),
                (D || g) && d.OffsetShape(D, g);
        if (t == null) {
          // if (Collab.AllowMessage()) {
          //   Collab.SendMessage(C);
          //   Collab.UnLockMessages();
          // }
          this.CompleteOperation(null);
        }
      }
    }
  }


  RemoveActionArrows(e, t) {
    var a = 'actionArrow' + e;
    if (t) this.ClearActionArrowTimer(e);
    else {
      var r = GlobalData.optManager.GetObjectPtr(e, !1);
      r &&
        (r.actionArrowHideTimerID = - 1)
    }
    GlobalData.optManager.FromOverlayLayer ? setTimeout((function () {
      GlobalData.optManager.SetActionArrowTimer(e)
    }), 0) : this.ClearOverlayElementsByID(a)
  }



  ClearActionArrowTimer(e) {
    if (!(e < 0)) {
      var t = GlobalData.optManager.GetObjectPtr(e, !1);
      t &&
        (
          t.actionArrowHideTimerID < 0 ||
          (
            GlobalData.optManager.actionArrowHideTimer.clearTimeout(t.actionArrowHideTimerID),
            t.actionArrowHideTimerID = - 1
          )
        )
    }
  }

  ClearOverlayElementsByID(e, t) {
    var a,
      r,
      i = GlobalData.optManager.svgOverlayLayer.GetElementListWithID(e),
      n = i.length;
    for (a = 0; a < n; ++a) GlobalData.optManager.svgOverlayLayer.RemoveElement(i[a]);
    t &&
      - 1 != this.curHiliteShape &&
      (r = this.GetObjectPtr(this.curHiliteShape, !1)) &&
      (r.SetRuntimeEffects(!1), r.ClearCursors())
  }



  AlignShapes(e) {
    var t, a, r = !1, i = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data, n = i.length;
    if (0 !== n) {
      var o = this.GetTargetSelect()
        , s = null
        , l = 0;
      if (-1 != o) {
        var S = this.GetObjectPtr(o, !1);
        s = S.GetAlignRect(),
          l = S.StyleRecord.Line.Thickness;
        var c, u = 0, p = null, d = null;
        for (Collab.BeginSecondaryEdit(),
          u = 0; u < n; ++u)
          if (i[u] !== o && (d = null,
            !(p = this.GetObjectPtr(i[u], !1)).hooks.length)) {
            switch (r = !0,
            (p = this.GetObjectPtr(i[u], !0)).FramezList && p.FramezList.length && (d = p.FramezList),
            this.SetLinkFlag(i[u], ConstantData.LinkFlags.SED_L_MOVE),
            this.AddToDirtyList(i[u], !0),
            c = p.GetAlignRect(),
            e) {
              case "lefts":
                t = s.x - l / 2 - (c.x - p.StyleRecord.Line.Thickness / 2),
                  a = 0;
                break;
              case "centers":
                t = s.x + s.width / 2 - c.width / 2 - c.x,
                  a = 0;
                break;
              case "rights":
                t = s.x + s.width + l / 2 - (c.x + c.width + p.StyleRecord.Line.Thickness / 2),
                  a = 0;
                break;
              case "tops":
                a = s.y - l / 2 - (c.y - p.StyleRecord.Line.Thickness / 2),
                  t = 0;
                break;
              case "middles":
                a = s.y + s.height / 2 - c.height / 2 - c.y,
                  t = 0;
                break;
              case "bottoms":
                a = s.y + s.height + l / 2 - (c.y + c.height + p.StyleRecord.Line.Thickness / 2),
                  t = 0
            }
            p.OffsetShape(t, a, d),
              t = 0,
              a = 0,
              p.r.x < 0 && (t = -p.r.x),
              p.r.y < 0 && (a = -p.r.y),
              (t || a) && p.OffsetShape(t, a)
          }
        if (r) {
          if (Collab.AllowMessage()) {
            var D = {
              shapeAlign: e
            };
            // Collab.BuildMessage(ConstantData.CollabMessages.AlignShapes, D, !0)
          }
          this.CompleteOperation(null)
        } else
          // SDJS.Utils.Alert(SDUI.Resources.Strings.AlignHooked, null),
          // Collab.UnBlockMessages()
          console.log('AlignHooked & UnBlockMessages')
      }
    }
  }


  DeleteSelectedObjects() {
    this.DeleteSelectedObjectsCommon()
  }

  DeleteSelectedObjectsCommon(e, t, a, r) {
    var i = this.Table_GetActiveID();
    if (i >= 0 && null == a) this.Table_DeleteCellContent(i);
    else {
      var n = 0;
      if (e && (n = e.length), this.AreSelectedObjects() || 0 !== n) {
        Collab.AllowMessage() &&
          Collab.BeginSecondaryEdit(),
          a ||
          GlobalData.optManager.CloseEdit();
        var o,
          s,
          l = Business.GetNextSelect(),
          S = [],
          c = GlobalData.objectStore.PreserveBlock(this.theSelectedListBlockID).Data;
        if (
          s = e ||
          c,
          (o = this.AddtoDelete(s, !1, null)) >= 0 &&
          (l = o),
          Collab.AllowMessage() &&
          !r
        ) {
          var u = {};
          u.listtodelete = Utils1.DeepCopy(s),
            Collab.BuildMessage(ConstantData.CollabMessages.DeleteObjects, u, !1)
        }
        var p = s.length;
        return this.DeleteObjects(s, !1),
          p &&
          this.IsPlanningDocument() === ConstantData.LayerTypes.SD_LAYERT_MINDMAP &&
          ListManager.TaskMap.CommitVisualOutline(),
          a ||
          (c.splice(0), l >= 0 ? S.push(l) : this.SetTargetSelect(- 1, !0)),
          this.Comment_UpdatePanel(null),
          t ||
          this.CompleteOperation(S),
          !0
      }
    }
  }


  AreSelectedObjects() {
    var e = GlobalData.objectStore.GetObject(this.theSelectedListBlockID);
    return null != e &&
      0 !== e.Data.length
  }


  AddtoDelete(e, t, a) {
    var r, i, n, o, s, l, S, c, u, p, d, D, g, h, m, C, y, f, L, I, T, b, M = -1, P = !1, R = 0, A = {}, _ = [],
      E = (ConstantData.ConnectorDefines.SEDA_NSkip,
        ConstantData.ConnectorDefines);
    for (i = e.length,
      r = 0; r < i; r++)
      if (null != (n = GlobalData.optManager.GetObjectPtr(e[r], !1)))
        if (y = e[r],
          n.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART ? this.GanttAddtoDelete(e, t, n) : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER ? this.TableContainerAddtoDelete(n, e) : n.IsSwimlane() ? (this.SwimlaneAddtoDelete(n, e),
            i = e.length) : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_TIMELINE ? this.TimelineAddtoDelete(n, e) :
            //  n instanceof ListManager.ShapeContainer
            // Double === TODO
            // n instanceof GlobalDataShape.ShapeContainer
            n instanceof Instance.Shape.ShapeContainer
            && (this.ContainerAddtoDelete(n, e),
              P = !0),
          n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR)
          if (P = !0,
            n._IsFlowChartConnector())
            switch (n.objecttype) {
              case ConstantData.ObjectTypes.SD_OBJT_BAD_STEPCHART_BRANCH:
                break;
              case ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH:
              case ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH:
                t || (e.splice(r, 1),
                  i--,
                  r--);
                break;
              default:
                Business.GetConnectorTree(e[r], e)
            }
          else
            n.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH ? (void 0 === C && n.hooks.length && (l = this.GetObjectPtr(n.hooks[0].objid, !1)).DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR && ((C = l.arraylist.hook.length - ConstantData.ConnectorDefines.SEDA_NSkip) < 0 && (C = 0),
              0 == (l.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete) && C++),
              void 0 !== C && (C - R > 1 && 0 == (n.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete) || t ? (Business.GetConnectorTree(e[r], e),
                R++) : (e.splice(r, 1),
                  r--,
                  i--,
                  y = -1,
                  u = -1,
                  n.arraylist.hook[E.A_Cl].id >= 0 && (u = n.arraylist.hook[E.A_Cl].id),
                  n.arraylist.hook[E.A_Cr].id >= 0 && (u = n.arraylist.hook[E.A_Cr].id),
                  u >= 0 && (g = e.indexOf(u)) >= 0 && e.splice(g, 1)))) : (Business.GetConnectorTree(e[r], e),
                    i = e.length,
                    t && n.hooks.length && (l = this.GetObjectPtr(n.hooks[0].objid, !1)) && l.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE && e.indexOf(n.hooks[0].objid) < 0 && e.push(n.hooks[0].objid));
        else {
          if (p = !1,
            (s = Business.GetParentConnector(e[r], null)) >= 0) {
            if (P = !0,
              l = gListManager.GetObjectPtr(s, !1)) {
              var w = {};
              if (this.IsConnectorEndShape(n, l, w) && (void 0 === C && (C = w.nshapes),
                e.indexOf(s) < 0 ? C - R > 1 || w.pasted || t ? (e.push(s),
                  l.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete && bIsPrimaryStateManager && (l.extraflags = SDJS.Utils.SetFlag(l.extraflags, ConstantData.ExtraFlags.SEDE_NoDelete, !1)),
                  Business.GetConnectorTree(s, e),
                  w.pasted || R++) : e.splice(r, 1) : w.nshapes <= 1 && !w.pasted && !t && (e.splice(r, 1),
                    (g = e.indexOf(s)) >= 0 && e.splice(g, 1))),
                l.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH)
                p = gGenogramManager.DeleteConnector(l, e, r, A),
                  y = A.parentshape;
              else if (l._IsFlowChartConnector())
                _ = [],
                  f = GlobalData.optManager.FindChildArray(e[r], -1),
                  null == (L = GlobalData.optManager.GetObjectPtr(f, !1)) && (L = l),
                  l.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH ||
                    L.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH ?
                    gStepChartVManager && !t && (M = gStepChartVManager.DeleteShape(e[r], e, !1, null, _)) :
                    l.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH ||
                      L.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH ?
                      gStepChartHManager && !t && (M = gStepChartHManager.DeleteShape(e[r], e, !1, null, _)) :
                      gFlowChartManager && !t && (M = gFlowChartManager.DeleteShape(e[r], e, !1, _));
              else if (l.arraylist.styleflags & ConstantData.SEDA_Styles.SEDA_CoManager) {
                if (t)
                  for (y = l.arraylist.hook[ConstantData.ConnectorDefines.SEDA_NSkip].id,
                    e.indexOf(s) < 0 && e.push(s),
                    S = l.arraylist.hook.length,
                    c = ConstantData.ConnectorDefines.SEDA_NSkip; c < S; c++)
                    u = l.arraylist.hook[c].id,
                      e.indexOf(u) < 0 && e.push(u);
                else
                  for (S = l.arraylist.hook.length,
                    c = ConstantData.ConnectorDefines.SEDA_NSkip; c < S; c++)
                    if (u = l.arraylist.hook[c].id,
                      e.indexOf(u) < 0) {
                      p = !0;
                      break
                    }
              } else
                0 === l.hooks.length && gListManager.CN_GetNShapes(s) <= 1 && -1 === e.indexOf(s) && e.push(s)
            }
          } else {
            var F;
            for (n.objecttype === ConstantData.ObjectTypes.SD_OBJT_MINDMAP_MAIN ? (F = 2,
              p = !1) : (F = 1,
                t || (p = !0)),
              I = -1,
              m = 0; m < F; m++)
              if ((o = GlobalData.optManager.FindChildArray(e[r], I)) >= 0) {
                if ((d = this.GetObjectPtr(o, !0)) && d.arraylist && (d.arraylist.hook.length <= ConstantData.ConnectorDefines.SEDA_NSkip || d.flags & ConstantData.ObjFlags.SEDO_NotVisible) && (p = !1),
                  d.IsGenoConnector()) {
                  p = !1;
                  var v = -1;
                  for (S = d.arraylist.hook.length,
                    c = ConstantData.ConnectorDefines.SEDA_NSkip; c < S; c++)
                    if (u = d.arraylist.hook[c].id,
                      e.indexOf(u) < 0) {
                      if ((h = this.GetObjectPtr(u, !1)).DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE) {
                        p = !0;
                        break
                      }
                      h.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR && (v = u)
                    }
                  !1 === p && (e.indexOf(o) < 0 && e.push(o),
                    v >= 0 && e.indexOf(v) < 0 && e.push(v),
                    p = !0)
                }
                d.flags = SDJS.Utils.SetFlag(d.flags, ConstantData.ObjFlags.SEDO_Obj1, !0),
                  this.SetLinkFlag(o, ConstantData.LinkFlags.SED_L_MOVE)
              }
            I = o
          }
          if (!p)
            for (b = (o = GlobalData.optManager.FindAllChildConnectors(y)).length,
              m = 0; m < b; m++)
              P = !0,
                (d = this.GetObjectPtr(o[m], !1))._IsFlowChartConnector() || Business.GetConnectorTree(o[m], e);
          if (n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE && !t) {
            var G, N, k = [];
            if ((D = this.HealLine(n, !1, k)) >= 0)
              for (P = !0,
                e.indexOf(D) < 0 && e.push(D),
                N = k.length,
                G = 0; G < N; G++)
                e.indexOf(k[G]) < 0 && e.push(k[G])
          }
          if (n.associd >= 0) {
            var U = !1;
            (h = this.GetObjectPtr(n.associd, !1)) && (h.hooks.length && h.hooks[0].hookpt === ConstantData.HookPts.SED_KATD && (U = !0),
              h.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText && (U = !0),
              h.objecttype !== ConstantData.ObjectTypes.SD_OBJT_NG_EVENT && h.objecttype !== ConstantData.ObjectTypes.SD_OBJT_NG_EVENT_LABEL || e.indexOf(n.associd) < 0 && e.push(n.associd)),
              U && e.indexOf(n.associd) < 0 && e.push(n.associd)
          }
          if (n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE) {
            var J = GlobalData.optManager.FindAllChildObjects(n.BlockID, ConstantData.DrawingObjectBaseClass.SHAPE, ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY);
            if (J && J.length) {
              var x = J.length;
              for (m = 0; m < x; m++)
                e.indexOf(J[m]) < 0 && e.push(J[m])
            }
          }
          if (!t)
            for (b = (T = GlobalData.optManager.FindAllChildObjects(n.BlockID, ConstantData.DrawingObjectBaseClass.LINE, null)).length,
              c = 0; c < b; c++)
              e.indexOf(T[c]) < 0 && e.push(T[c])
        }
    return a && (a.connectors = P),
      M
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


  FindAllChildObjects(e, t, a) {
    var r,
      i,
      n,
      o = this.GetObjectPtr(this.theLinksBlockID, !1),
      s = this.FindLink(o, e, !0),
      l = [];
    if (r = o.length, s >= 0) for (; s < r && o[s].targetid === e;) i = o[s].hookid,
      (n = this.GetObjectPtr(i, !1)) &&
      (
        null != t &&
        n.DrawingObjectBaseClass !== t ||
        null != a &&
        n.objecttype !== a ||
        l.push(i)
      ),
      s++;
    return l
  }

  IsPlanningDocument() {
    var e,
      t = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
      a = t.nlayers,
      r = 0,
      i = t.layers;
    for (e = 0; e < a; ++e) switch (i[e].layertype) {
      case ConstantData.LayerTypes.SD_LAYERT_MINDMAP:
        e === t.activelayer &&
          (r = ConstantData.LayerTypes.SD_LAYERT_MINDMAP);
        break;
      case ConstantData.LayerTypes.SD_LAYERT_GANTT:
        e === t.activelayer &&
          (r = ConstantData.LayerTypes.SD_LAYERT_GANTT)
    }
    return r
  }


  Comment_UpdatePanel(e) {
    // SDUI.Commands.MainController.SmartPanels.GetLeftPanelMode() === Resources.LeftPanelMode.LEFTPANELMODE_COMMENTS &&
    //   e !== ConstantData.CommentParams.PanelTargetID &&
    //   GlobalData.optManager.Comment_BuildPanel()

    // Double ===
  }



  Redo(e) {
    // debugger
    if (null === GlobalData.stateManager)
      //   throw new SDJSError({
      //   source: 'ListManager.Undo',
      //   message: 'stateManager is null'
      // });
      throw new Error('stateManager is null');
    if (e) GlobalData.optManager.CancelModalOperation();
    else if (GlobalData.stateManager.CurrentStateID + 1 >= GlobalData.stateManager.States.length) return !1;
    var t = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      a = t.EnableSpellCheck,
      r = 0 === t.RecentSymbols.length,
      i = this.GetObjectPtr(this.theTEDSessionBlockID, !1);
    - 1 != i.theActiveTextEditObjectID &&
      i.theTELastOp !== ConstantData.TELastOp.INIT &&
      i.theTELastOp !== ConstantData.TELastOp.TIMEOUT &&
      i.theTELastOp !== ConstantData.TELastOp.SELECT &&
      (this.FlushTextToLMBlock(), this.PreserveUndoState(!1));
    var n = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1),
      o = n.layers[n.activelayer].layertype;
    this.Redo_DeleteURLs();
    // var s = SDJS.Editor.IsStateOpen();
    var s = Utils1.IsStateOpen();
    GlobalData.stateManager.RestoreNextState(),
      GlobalData.stateManager.AddToHistoryState();
    var l = GlobalData.stateManager.CurrentStateID;
    this.RebuildURLs(GlobalData.stateManager.CurrentStateID - 1, !0),
      this.ResizeSVGDocument(),
      this.UpdateLineHops(!0),
      a !== (
        t = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1)
      ).EnableSpellCheck &&
      SDUI.Commands.MainController.Document.SetSpellCheck(t.EnableSpellCheck, !1);
    var S = GlobalData.docHandler.rulerSettings;
    GlobalData.docHandler.RulersNotEqual(t.rulerSettings, S) &&
      GlobalData.docHandler.SetRulers(t.rulerSettings, !0),
      GlobalData.docHandler.PagesNotEqual(t.Page, GlobalData.optManager.theContentHeader.Page) &&
      (
        GlobalData.optManager.theContentHeader.Page = Utils1.DeepCopy(t.Page)
      );
    var c = this.GetObjectPtr(this.theSelectedListBlockID, !1);
    if (
      - 1 != (i = this.GetObjectPtr(this.theTEDSessionBlockID, !1)).theActiveOutlineObjectID &&
      0 === c.length
    ) {
      var u = [];
      u.push(i.theActiveOutlineObjectID),
        this.SelectObjects(u, !1, !1)
    }
    this.TEUnregisterEvents(!0),
      GlobalData.optManager.InUndo = !0,
      this.RenderAllSVGObjects(),
      GlobalData.optManager.InUndo = !1;
    var p = this.GetObjectPtr(this.theSEDSessionBlockID, !1);
    // Resources.CurrentTheme.Name !== p.CurrentTheme &&
    //   (new SDUI.ThemeController).SwitchTheme(p.CurrentTheme);
    - 1 != i.theActiveTextEditObjectID &&
      this.ResetActiveTextEditAfterUndo();
    var d = GlobalData.optManager.GetTargetSelect();
    if (d >= 0) {
      var D = this.GetObjectPtr(d, !1),
        g = null;
      D &&
        (g = D.GetDimensionsForDisplay(), this.ShowFrame(!0)),
        GlobalData.optManager.UpdateDisplayCoordinates(g, null, null, D)
    } else this.ShowFrame(!1);
    if (
      o != (
        n = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, !1)
      ).layers[n.activelayer].layertype
    ) switch (n.layers[n.activelayer].layertype) {
      case ConstantData.LayerTypes.SD_LAYERT_MINDMAP:
        SDUI.AppSettings.NewUI ? (
          SDJS_init_business_manager('TASKMAP'),
          SDUI.Commands.MainController.SmartPanels.LoadTools(gTaskMapManager)
        ) : 'sp-mind_maps' != ConstantData.DocumentContext.CurrentSmartPanel &&
        (
          SDUI.Commands.MainController.LoadSmartPanel('sp-mind_maps'),
          SDJS_init_business_manager('MINDMAP')
        );
        break;
      case ConstantData.LayerTypes.SD_LAYERT_GANTT:
        SDUI.AppSettings.NewUI ? (
          SDJS_init_business_manager('PROJECTCHART'),
          SDUI.Commands.MainController.SmartPanels.LoadTools(gProjectChartManager)
        ) : 'sp-project_chart' != ConstantData.DocumentContext.CurrentSmartPanel &&
        (
          SDUI.Commands.MainController.LoadSmartPanel('sp-project_chart'),
          SDJS_init_business_manager('PROJECTCHART')
        )
    }
    return
    // ListManager.Trello.TrelloUpdateAllCardsFromTasks(!0, l),
    this.UpdateSelectionAttributes(c),
      // SDUI.Commands.MainController.SmartPanels.IdleSmartPanel(),
      // SDUI.Commands.MainController.Document.IdleLayersTabs(),
      GlobalData.optManager.CommentIdleTab(),
      GlobalData.optManager.Comment_UpdatePanel(null),
      GlobalData.optManager.Comment_UpdateDropDown(),
      // SDUI.Commands.MainController.Symbols.RecentSymbols_DisplaySymbols(t.RecentSymbols, r),
      s ||
      SDF.SaveChangedBlocks(l, 1),
      !0
  }


  PasteObjects(e) {
    // debugger
    try {
      var t,
        a,
        r = this.GetObjectPtr(this.theTEDSessionBlockID, !1),
        i = this.Table_GetActiveID(),
        n = !1,
        o = !1;
      if (
        i >= 0 &&
        (a = this.GetObjectPtr(i, !1)) &&
        a.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CHART &&
        (
          n = !0,
          this.theContentHeader.ClipboardBuffer &&
          this.theContentHeader.ClipboardType === ConstantData.ClipboardType.LM &&
          (o = !0)
        ),
        (- 1 != r.theActiveTextEditObjectID || this.bInNoteEdit) &&
        !o
      ) {
        if (
          r.theActiveTableObjectID >= 0 &&
          this.theContentHeader.ClipboardType === ConstantData.ClipboardType.Table &&
          this.theContentHeader.ClipboardBuffer
        ) return void this.Table_PasteCellContent(r.theActiveTableObjectID);
        if (this.theTextClipboard && this.theTextClipboard.text) {
          if (Clipboard.isIe) {
            var s = this.theTextClipboard.text.length;
            s >= 2 &&
              '\r' === this.theTextClipboard.text[s - 2] &&
              '\n' === this.theTextClipboard.text[s - 1] &&
              (
                this.theTextClipboard.text = this.theTextClipboard.text.slice(0, - 2)
              )
          } (t = this.svgDoc.GetActiveEdit()) &&
            (
              Collab.BeginSecondaryEdit(),
              this.RegisterLastTEOp(ConstantData.TELastOp.PASTE),
              t.Paste(this.theTextClipboard, !0),
              this.RegisterLastTEOp(ConstantData.TELastOp.TIMEOUT)
            )
        }
        return
      }
      if (GlobalData.optManager.bInDimensionEdit) return void (
        this.theTextClipboard &&
        this.theTextClipboard.text &&
        (t = this.svgDoc.GetActiveEdit()) &&
        t.Paste(this.theTextClipboard, !0)
      );
      if (
        this.theTextClipboard &&
        this.theTextClipboard.text &&
        '\r\n' !== this.theTextClipboard.text
      ) if (- 1 != this.GetTargetSelect()) return void this.TargetPasteText();
      return this.theImageClipboard &&
        this.theContentHeader.ClipboardType === ConstantData.ClipboardType.Image ? void GlobalData.optManager.SetBackgroundImage(this.theImageClipboard, 0) : r.theActiveTableObjectID >= 0 &&
          (
            this.theContentHeader.ClipboardType === ConstantData.ClipboardType.Table &&
            this.theContentHeader.ClipboardBuffer ||
            this.theTextClipboard &&
            this.theTextClipboard.text &&
            '\r\n' !== this.theTextClipboard.text
          ) ? void this.Table_PasteCellContent(r.theActiveTableObjectID) : (
        this.CloseEdit(n),
        void (
          this.theContentHeader.ClipboardBuffer &&
          this.theContentHeader.ClipboardType === ConstantData.ClipboardType.LM &&
          (
            Collab.BeginSecondaryEdit(),
            this.PasteLM(this.theContentHeader.ClipboardBuffer)
          )
        )
      )
    } catch (e) {
      // GlobalData.optManager.ExceptionCleanup(e)
      throw e;
    }
  }



  TargetPasteText() {
    if (!this.theTextClipboard) return !1;
    if (null == this.theTextClipboard.text) return !1;
    var e = this.GetTargetSelect();
    if (- 1 != e) {
      var t = this.GetObjectPtr(e, !1);
      if (t && t.AllowTextEdit()) {
        Collab.BeginSecondaryEdit();
        var a = this.svgObjectLayer.GetElementByID(e);
        this.ActivateTextEdit(a);
        var r = this.svgDoc.GetActiveEdit(),
          i = r.GetText().length;
        return r.SetSelectedRange(0, i),
          this.RegisterLastTEOp(ConstantData.TELastOp.PASTE),
          r.Paste(this.theTextClipboard, !0),
          this.RegisterLastTEOp(ConstantData.TELastOp.TIMEOUT),
          !0
      }
    }
    return !1
  }


  TERegisterEvents(e, t, a) {
    null != e &&
      (
        this.SetVirtualKeyboardLifter(e),
        e.Activate(t, a),
        this.TETextHammer = Hammer(e.editor.parent.textElem.node),
        this.TEClickAreaHammer = Hammer(e.editor.parent.clickAreaElem.node),
        this.TEDecAreaHammer = Hammer(e.editor.parent.decorationAreaElem.node),
        this.TEWorkAreaHammer = Hammer(document.getElementById('svg-area')),
        this.TETextHammer.on('dragstart', this.TEDragStartFactory(e.editor)),
        this.TEClickAreaHammer.on('dragstart', this.TEClickAreaDragStartFactory(e.editor)),
        this.TEDecAreaHammer.on('dragstart', this.TEClickAreaDragStartFactory(e.editor)),
        this.TEWorkAreaHammer.on('drag', this.TEDragFactory(e.editor)),
        this.TEWorkAreaHammer.on('dragend', this.TEDragEndFactory(e.editor))
      )
  }



  SetVirtualKeyboardLifter(e) {
    GlobalData.optManager.isAndroid ||
      GlobalData.gDebugMobileTextDialog ? e.SetVirtualKeyboardHook(
        (function (e, t) {
          GlobalData.optManager.MobileTextDialogTrigger(e, t)
        }),
        null
      ) : (
      GlobalData.optManager.WorkAreaTextInputProxy ||
      (GlobalData.optManager.WorkAreaTextInputProxy = $('#SDTS_TouchProxy')),
      GlobalData.optManager.WorkAreaTextInputProxy.val(''),
      e.SetVirtualKeyboardHook(
        (function (e, t) {
          GlobalData.optManager.VirtualKeyboardLifter(e, t)
        }),
        GlobalData.optManager.WorkAreaTextInputProxy
      )
    )
  }


  VirtualKeyboardLifter(e, t) {
    if (t) {
      var a,
        r,
        i,
        n,
        o = {};
      a = e.CalcElementFrame();
      var s = !1;
      GlobalData.optManager.theVirtualKeyboardLifterElementFrame ? n = a.x != GlobalData.optManager.theVirtualKeyboardLifterElementFrame.x ||
        a.y != GlobalData.optManager.theVirtualKeyboardLifterElementFrame.y ||
        a.width != GlobalData.optManager.theVirtualKeyboardLifterElementFrame.width ||
        a.height != GlobalData.optManager.theVirtualKeyboardLifterElementFrame.height : s = !0,
        (n || s) &&
        (
          o = GlobalData.docHandler.DocObject().ConvertDocToWindowCoords(a.x, a.y),
          0 === (
            r = GlobalData.docHandler.DocObject().ConvertDocToWindowLength(a.width)
          ) &&
          (r = 1),
          0 === (
            i = GlobalData.docHandler.DocObject().ConvertDocToWindowLength(a.height)
          ) &&
          (i = 1),
          GlobalData.optManager.theVirtualKeyboardLifterElementFrame = $.extend(!0, {
          }, a),
          GlobalData.optManager.WorkAreaTextInputProxy.css('visibility', 'visible'),
          GlobalDatagDebugVirtualKeyboardLifter ? (
            GlobalData.optManager.WorkAreaTextInputProxy.css('background-color', 'yellow'),
            GlobalData.optManager.WorkAreaTextInputProxy.css('opacity', '0.25'),
            GlobalData.optManager.WorkAreaTextInputProxy.css('color', 'black'),
            GlobalData.optManager.WorkAreaTextInputProxy.css('z-index', '1000'),
            o.y += i
          ) : (
            GlobalData.optManager.WorkAreaTextInputProxy.css('opacity', '0'),
            GlobalData.optManager.WorkAreaTextInputProxy.css('color', 'transparent'),
            GlobalData.optManager.WorkAreaTextInputProxy.css('z-index', '-1000'),
            GlobalData.optManager.WorkAreaTextInputProxy.css('text-align', 'left'),
            GlobalData.optManager.isMac ? (o.x += r, i = 1) : (o.x = - 9999, r = 800)
          ),
          GlobalData.optManager.WorkAreaTextInputProxy.css('left', o.x + 'px'),
          GlobalData.optManager.WorkAreaTextInputProxy.css('top', o.y + 'px'),
          GlobalData.optManager.WorkAreaTextInputProxy.css('width', r + 'px'),
          GlobalData.optManager.WorkAreaTextInputProxy.css('height', i + 'px'),
          s &&
          GlobalData.optManager.WorkAreaTextInputProxy.val(''),
          GlobalData.optManager.WorkAreaTextInputProxy.focus()
        )
    } else GlobalData.optManager.theVirtualKeyboardLifterElementFrame = null,
      GlobalData.optManager.WorkAreaTextInputProxy.css('visibility', 'visible'),
      GlobalData.optManager.WorkAreaTextInputProxy.blur(),
      GlobalData.optManager.WorkAreaTextInputProxy.val(''),
      GlobalData.optManager.WorkAreaTextInputProxy.css('visibility', 'hidden')
  }



  TEDragStartFactory(e) {
    return function (t) {
      return t.preventDefault(),
        t.stopPropagation(),
        t.gesture.preventDefault(),
        t.gesture.stopPropagation(),
        e.HandleMouseDown(t),
        !1
    }
  }

  TEClickAreaDragStartFactory(e) {
    return function (t) {
      return t.preventDefault(),
        t.stopPropagation(),
        t.gesture.preventDefault(),
        t.gesture.stopPropagation(),
        e.HandleMouseDown(t),
        !1
    }
  }


  TEDragFactory(e) {
    return function (t) {
      return t.preventDefault(),
        t.stopPropagation(),
        t.gesture.preventDefault(),
        t.gesture.stopPropagation(),
        e.HandleMouseMove(t),
        !1
    }
  }


  TEDragEndFactory(e) {
    return function (t) {
      return t.preventDefault(),
        t.stopPropagation(),
        t.gesture.preventDefault(),
        t.gesture.stopPropagation(),
        e.HandleMouseUp(t),
        Collab.UnBlockMessages(),
        !1
    }
  }


  CalcDefaultInitialTextStyle(e) {
    // var t = SDGraphics.Text.Formatter.DefaultStyle(),
    var t = new DefaultStyle(),
      a = ConstantData.TextFace;
    return t.font = e.FontName,
      t.size = SDF.PointSizeToFontSize(e.FontSize),
      t.type = e.FontType,
      t.color = e.Paint.Color,
      t.colorTrans = e.Paint.Opacity,
      e.Face & a.Bold ? t.weight = 'bold' : t.weight = 'normal',
      e.Face & a.Italic ? t.style = 'italic' : t.style = 'normal',
      e.Face & a.Underline ? t.decoration = 'underline' : t.decoration = 'none',
      t
  }


  ShowSVGSelectionState(e, t) {
    var a = ConstantData.Defines.Action + e,
      r = this.GetTargetSelect(),
      i = this.svgOverlayLayer.GetElementByID(a),
      n = this.svgObjectLayer.GetElementByID(e),
      o = this.GetObjectPtr(e, !1);
    if (null != o) {
      var s;
      if (null == i && t) {
        if (null != (i = o.CreateActionTriggers(this.svgDoc, e, n, r))) {
          this.svgOverlayLayer.AddElement(i);
          try {
            i.SetRotation(o.RotationAngle)
          } catch (e) {
            throw e
          }
          if (!o.NoGrow()) {
            var l = i.DOMElement(),
              S = Hammer(l);
            S.on('tap', Evt_ActionTriggerTap),
              S.on('dragstart', (s = o, function (e) {
                return s.LM_ActionClick(e),
                  !1
              })),
              i.SetEventProxy(S)
          }
        }
      } else null == i ||
        t ||
        this.svgOverlayLayer.RemoveElement(i);
      if (o.Dimensions & ConstantData.DimensionFlags.SED_DF_Select) {
        var c = 0,
          u = null;
        for (c = n.ElementCount() - 1; c >= 1; c--) (u = n.GetElementByIndex(c)).GetID() != ConstantData.SVGElementClass.DIMENSIONLINE &&
          u.GetID() != ConstantData.SVGElementClass.DIMENSIONTEXT ||
          u.SetOpacity(t ? 1 : 0)
      }
    }
  }


  RegisterLastTEOp(e) {
    var t = ConstantData.TELastOp;
    if (!this.bInNoteEdit) {
      Collab.BeginSecondaryEdit();
      var a = this.GetObjectPtr(this.theTEDSessionBlockID, !1),
        r = a.theTELastOp;
      if (
        null != this.textEntryTimer &&
        e !== ConstantData.TELastOp.CHAR &&
        (
          clearTimeout(this.textEntryTimer),
          this.textEntryTimer = null,
          this.RegisterLastTEOp(ConstantData.TELastOp.TIMEOUT)
        ),
        a.theTELastOp = e,
        e != ConstantData.TELastOp.INIT &&
        (a.theTEWasEdited = !0),
        function (a) {
          if (e !== ConstantData.TELastOp.INIT) switch (e) {
            case t.CHAR:
              if (a !== e) return !0;
              break;
            case t.SELECT:
              return !1;
            default:
              return !0
          }
          return !1
        }(r)
      ) {
        var i = this.svgDoc.GetActiveEdit(),
          n = null,
          o = null,
          s = this.GetObjectPtr(a.theActiveTextEditObjectID, !1);
        if (s && s.DataID >= 0 && i) {
          var l = s.DataID;
          if (n = i.GetRuntimeText(), o = i.GetSelectedRange(), n) {
            this.PreserveUndoState(!1);
            var S = this.GetObjectPtr(l, !1);
            if (S) {
              if (
                S.runtimeText = n,
                S.selrange = o,
                e !== ConstantData.TELastOp.TIMEOUT
              ) {



                /*SDJS_ListManager_TextParams*/TextParams.minWidth = i.formatter.limits.minWidth,
                /*SDJS_ListManager_TextParams*/TextParams.maxWidth = i.formatter.limits.maxWidth,
                /*SDJS_ListManager_TextParams*/TextParams.minHeight = i.minHeight,
                  s = this.GetObjectPtr(a.theActiveTextEditObjectID, !0),
                  S = this.GetObjectPtr(l, !0);
                var c = s.GetTable(!0)
              }
              if (
                e == ConstantData.TELastOp.TIMEOUT &&
                Collab.AllowMessage()
              ) {
                var u = {};
                u.BlockID = a.theActiveTextEditObjectID;
                var p = GlobalData.optManager.GetObjectPtr(u.BlockID, !1);
                (c = p.GetTable(!1)) ? c.select >= 0 ? u.TableSelect = c.cells[c.select].uniqueid : u.TableSelect = - 1 : p &&
                  p instanceof SDJS.Connector &&
                  (u.DataID = p.DataID),
                  u.runtimeText = Utils1.DeepCopy(n),
                  u.selrange = Utils1.DeepCopy(o),
                  u.minWidth = /*SDJS_ListManager_TextParams*/TextParams.minWidth,
                  u.maxWidth = /*SDJS_ListManager_TextParams*/TextParams.maxWidth,
                  u.minHeight = /*SDJS_ListManager_TextParams*/TextParams.minHeight,
                  Collab.BuildMessage(ConstantData.CollabMessages.Text_Edit, u, !1),
                /*SDJS_ListManager_TextParams*/TextParams.minWidth = null,
                  Collab.UnBlockMessages()
              }
            }
          }
        }
      } else var d = !0;
      e === ConstantData.TELastOp.CHAR ? (
        clearTimeout(this.textEntryTimer),
        this.textEntryTimer = null,
        this.textEntryTimer = setTimeout(GlobalData.optManager.TextEdit_PauseTyping, 1000)
      ) : d &&
      Collab.UnBlockMessages()
    }
  }


  DeactivateTextEdit(e, t) {
    var a,
      r,
      i,
      n = this.GetObjectPtr(this.theTEDSessionBlockID, !1),
      o = !1,
      s = null,
      l = {};
    if (null != this.textEntryTimer) {
      clearTimeout(this.textEntryTimer),
        this.textEntryTimer = null;
      var S = Collab.AreMessagesLocked();
      Collab.LockMessages(),
        this.RegisterLastTEOp(ConstantData.TELastOp.TIMEOUT),
        S ||
        Collab.UnLockMessages()
    }
    if (- 1 != n.theActiveTextEditObjectID) {
      Collab.BeginSecondaryEdit(),
        n = this.GetObjectPtr(this.theTEDSessionBlockID, !0);
      var c,
        u = !1,
        p = !1,
        d = this.svgDoc.GetActiveEdit(),
        D = null,
        g = n.theActiveTableObjectID < 0,
        h = this.GetObjectPtr(n.theActiveTextEditObjectID, !0);
      if (h) {
        h.TableID < 0 &&
          (g = !0);
        var m = h.DataID;
        n.theTEWasResized &&
          (
            l.theTEWasResized = !0,
            this.SetLinkFlag(
              n.theActiveTextEditObjectID,
              ConstantData.LinkFlags.SED_L_MOVE
            ),
            h.hooks.length &&
            this.SetLinkFlag(h.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE),
            n.theTEWasResized = !1,
            n.theTEWasEdited = !0,
            n.theActiveTableObjectID < 0 &&
            this.AddToDirtyList(n.theActiveTextEditObjectID)
          ),
          // h instanceof ListManager.D3Symbol &&
          // Double === TODO
          // h instanceof GlobalDataShape.D3Symbol &&
          h instanceof Instance.Shape.D3Symbol &&
          (g = !1),
          (a = h.GetTable(!1)) &&
          (g = !1)
      }
      if (d && (D = d.GetRuntimeText(), c = d.GetSelectedRange(), D)) {
        (
          u = d.HasDataFields() ? 0 === d.GetTextMinDimensions().width : 0 === d.GetTextMinDimensions().width ||
            ' ' === d.GetText()
        ) &&
          this.ReverseReplaceStdText(h, d) &&
          (u = !1, D = d.GetRuntimeText(), c = d.GetSelectedRange());
        var C = d.formatter.GetFormatAtOffset(0);
        if (g) this.TextStyleToSDText(h.StyleRecord.Text, C.style);
        else if (a = h.GetTable(!0)) {
          if (s = a.select, a.select < 0 && h.DataID >= 0) for (i = a.cells.length, r = 0; r < i; r++) if (a.cells[r].DataID === h.DataID) {
            a.select = r;
            break
          }
          this.Table_SaveTextStyle(a, C.style)
        }
        if (p = h.flags & ConstantData.ObjFlags.SEDO_TextOnly, - 1 != m) {
          var y = this.GetObjectPtr(m, !1);
          y &&
            (
              y.runtimeText = D,
              y.selrange = c,
              y = this.GetObjectPtr(m, !0),
              Collab.AllowMessage() &&
              (
                l.BlockID = h.BlockID,
                l.runtimeText = Utils1.DeepCopy(D),
                l.selrange = Utils1.DeepCopy(c),
                l.empty = u,
                l.isTextLabel = p,
                l.closetable = t,
                a ? a.select >= 0 ? l.TableSelect = a.cells[a.select].uniqueid : l.TableSelect = - 1 : h &&
                  h instanceof SDJS.Connector &&
                  (l.DataID = h.DataID),
                Collab.BuildMessage(ConstantData.CollabMessages.Text_End, l, !1)
              ),
              null != s &&
              (a.select = s),
              n.theActiveTableObjectID < 0 &&
              this.AddToDirtyList(n.theActiveTextEditObjectID)
            )
        }
      }
      if (this.TEUnregisterEvents(), u) if (p) {
        this.DeleteObjects([n.theActiveTextEditObjectID], !1),
          h = null;
        var f = this.GetObjectPtr(this.theSelectedListBlockID, !0),
          L = f.indexOf(n.theActiveTextEditObjectID);
        if (L >= 0) f.splice(L, 1),
          this.GetTargetSelect() === n.theActiveTextEditObjectID &&
          this.SetTargetSelect(- 1, !0);
        n.theTEWasEdited = !0
      } else {
        var I = GlobalData.objectStore.GetObject(m);
        (h = this.GetObjectPtr(n.theActiveTextEditObjectID, !0)) &&
          h.SetTextObject(- 1),
          I &&
          I.Delete(),
          n.theActiveTableObjectID < 0 &&
          this.AddToDirtyList(n.theActiveTextEditObjectID),
          n.theTEWasEdited = !0
      }
      if (
        n.theTEWasEdited &&
        (o = !0),
        n.theActiveTextEditObjectID = - 1,
        n.theTEWasEdited = !1,
        n.theTEWasResized = !1,
        n.theTELastOp = ConstantData.TELastOp.INIT,
        n.theActiveTableObjectID,
        h &&
        h.GetTable
      ) {
        (a = h.GetTable(!0)) &&
          (this.Table_DeActivateText(h, a), h.DataID = - 1);
        var T = h.GetGraph(!0);
        if (
          T &&
          (this.Graph_DeActivateText(h, T), h.DataID = - 1),
          null == T &&
          null == a
        ) {
          var b = Business.GetSelectionBusinessManager(h.BlockID);
          if (b) {
            var M = this.svgObjectLayer.GetElementByID(h.BlockID).GetElementByID(ConstantData.SVGElementClass.TEXT);
            b.ShapeSaveData(h, M)
          }
        }
      }
      S = Collab.AreMessagesLocked(),
        Collab.LockMessages(),
        this.RegisterLastTEOp(ConstantData.TELastOp.INIT),
        S ||
        Collab.UnLockMessages(),
        t &&
        this.Table_Release(!1),
        o &&
          !e ? GlobalData.optManager.CompleteOperation(null) : (this.PreserveUndoState(!1), this.RenderDirtySVGObjects()),
        Collab.UnBlockMessages()
    }
  }




  TextStyleToSDText(e, t) {
    e.FontSize = Math.round(72 * t.size / 100),
      e.FontId = this.GetFontIdByName(t.font),
      e.FontName = t.font,
      e.Face = 0,
      'bold' === t.weight &&
      (e.Face += FileParser.TextFace.St_Bold),
      'italic' == t.style &&
      (e.Face += FileParser.TextFace.St_Italic),
      'sub' == t.baseOffset ? e.Face += FileParser.TextFace.St_Sub : 'super' == t.baseOffset &&
        (e.Face += FileParser.TextFace.St_Super),
      'underline' == t.decoration ? e.Face += FileParser.TextFace.St_Under : 'line-through' == t.decoration &&
        (e.Face += FileParser.TextFace.St_Strike),
      e.Paint.Color = t.color,
      e.Paint.Opacity = t.colorTrans
  }


  FontSizeToPoints(e) {
    return e ? GlobalData.docHandler.rulerSettings.showpixels ? 72 * e / GlobalData.docHandler.svgDoc.docInfo.docDpi : Math.round(72 * e / GlobalData.docHandler.svgDoc.docInfo.docDpi) : - 1
  }




  SendToBackOf() {
    var e = this.GetFrontBackLayersForSelected();
    e.result &&
      this.SendToBackOfSpecificLayer(e.backmostindex)
  }


  SendToBackOfSpecificLayer(e, t) {
    var a = GlobalData.objectStore.GetObject(this.theSelectedListBlockID),
      r = a.Data,
      i = r.length;
    if (0 !== i) {
      var n = this.AddAssoctoList(r, !0);
      if (0 !== (i = n.length)) {
        var o = this.VisibleZList();
        if (!(o.length < 1)) {
          Collab.AllowMessage() &&
            Collab.BeginSecondaryEdit();
          o.length;
          var s,
            l,
            S = [];
          for (s = 0; s < i; s++) {
            l = n[s];
            var c = $.inArray(l, o);
            S.push(c)
          }
          S.sort((function (e, t) {
            return e - t
          }));
          var u = this.ZListPreserveForLayer(e),
            p = [];
          for (s = 0; s < i; s++) l = o[S[s]],
            p.push(l);
          for (s = i - 1; s >= 0; --s) l = p[s],
            this.RemoveFromAllZLists(l),
            u.unshift(l);
          if (this.UpdateLineHops(!0), Collab.AllowMessage()) {
            var d = {
              theTargetLayer: e
            };
            Collab.BuildMessage(
              ConstantData.CollabMessages.SendToBackOfSpecificLayer,
              d,
              !0
            )
          }
          null == t &&
            (
              (a = GlobalData.objectStore.PreserveBlock(this.theSelectedListBlockID)).Data = n
            ),
            this.RenderAllSVGObjects(),
            this.CompleteOperation()
        }
      }
    }
  }


  GetFrontBackLayersForSelected() {
    var e,
      t,
      a = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
      r = a.layers,
      i = a.nlayers,
      n = - 1,
      o = 0,
      s = this.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1),
      l = s.length;
    if (!l) return {
      result: !1,
      frontmostname: r[0].name,
      frontmostindex: 0,
      backmostname: r[i - 1].name,
      backmostindex: i
    };
    for (e = 0; e < l; ++e) ((t = this.FindLayerForShapeID(s[e])) < n || - 1 == n) &&
      (n = t),
      t > o &&
      (o = t);
    return {
      result: !0,
      frontmostname: r[n].name,
      frontmostindex: n,
      backmostname: r[o].name,
      backmostindex: o
    }
  }



  FindLayerForShapeID(e) {
    var t,
      a,
      r = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
      i = r.layers,
      n = r.nlayers;
    for (a = 0; a < n; ++a) if (t = i[a].zList, - 1 != $.inArray(e, t)) return a;
    return - 1
  }

  AddAssoctoList(e, t) {
    var a,
      r,
      i,
      n,
      o = [];
    r = e.length;
    var s = ConstantData.ObjectTypes;
    for (i = 0; i < r; i++) if (
      n = e[i],
      a = this.GetObjectPtr(n, !1),
      !t ||
      !Business.HasContainerParent(a)
    ) {
      switch (a.objecttype) {
        case s.SD_OBJT_GANTT_CHART:
        case s.SD_OBJT_GANTT_BAR:
        case s.SD_OBJT_GANTT_CONNECTOR:
          continue;
        case s.SD_OBJT_SWIMLANE_COLS:
        case s.SD_OBJT_SWIMLANE_ROWS:
        case s.SD_OBJT_SWIMLANE_GRID:
      }
      switch (
      o.indexOf(n) < 0 &&
      o.push(n),
      a &&
      a.associd >= 0 &&
      this.GetObjectPtr(a.associd, !1) &&
      o.indexOf(a.associd) < 0 &&
      o.push(a.associd),
      a.IsSwimlane() &&
      GlobalData.optManager.SwimlaneAddtoDelete(a, o, !0),
      a.objecttype
      ) {
        case s.SD_OBJT_SHAPECONTAINER:
          GlobalData.optManager.ContainerAddtoDelete(a, o);
          break;
        case s.SD_OBJT_TABLE_WITH_SHAPECONTAINER:
          GlobalData.optManager.TableContainerAddtoDelete(a, o)
      }
    }
    return o
  }


  ZListPreserveForLayer(e) {
    return GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, !0).layers[e].zList
  }


  RenderAllSVGObjects() {
    Collab.NoRedrawFromSameEditor = !1;
    var e,
      t,
      a = this.VisibleZList(),
      r = this.ActiveVisibleZList(),
      i = a.length;
    for (
      this.ClearSVGHighlightLayer(),
      this.ClearSVGOverlayLayer(),
      this.ClearSVGObjectLayer(),
      this.SetBackgroundColor(),
      e = 0;
      e < i;
      ++e
    ) t = - 1 != r.indexOf(a[e]),
      this.AddSVGObject(e, a[e], !1, t);
    this.RenderAllSVGSelectionStates(),
      this.ClearDirtyList()
    //,
    // GlobalData.optManager.ShowLoading(!1)
    // Double === TODO
  }


  ClearSVGHighlightLayer() {
    null !== this.svgOverlayLayer &&
      this.svgHighlightLayer.RemoveAll()
  }

  ClearSVGOverlayLayer() {
    null !== this.svgOverlayLayer &&
      this.svgOverlayLayer.RemoveAll()
  }


  ClearSVGObjectLayer() {
    null !== this.svgObjectLayer &&
      this.svgObjectLayer.RemoveAll()
  }


  SetBackgroundColor() {
    var e,
      t = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      a = GlobalData.docHandler.GetBackground();
    if (t && a) {
      var r = t.background.Paint;
      if (r.FillType == ConstantData.FillTypes.SDFILL_SOLID) r.Color == ConstantData.Colors.Color_White ||
        0 === r.Opacity ? a.SetFillColor('none') : a.SetFillColor(r.Color);
      else if (r.FillType == ConstantData.FillTypes.SDFILL_GRADIENT) e = new ListManager.BaseShape,
        a.SetGradientFill(
          e.CreateGradientRecord(r.GradientFlags, r.Color, r.Opacity, r.EndColor, r.EndOpacity)
        );
      else if (r.FillType == ConstantData.FillTypes.SDFILL_RICHGRADIENT) e = new ListManager.BaseShape,
        a.SetGradientFill(e.CreateRichGradientRecord(r.GradientFlags));
      else if (r.FillType == ConstantData.FillTypes.SDFILL_TEXTURE) {
        var i = {
          url: '',
          scale: 1,
          alignment: r.TextureScale.AlignmentScalar
        },
          n = r.Texture;
        GlobalData.optManager.TextureList.Textures[n] &&
          (
            i.dim = GlobalData.optManager.TextureList.Textures[n].dim,
            i.url = GlobalData.optManager.TextureList.Textures[n].ImageURL,
            i.scale = GlobalData.optManager.CalcTextureScale(r.TextureScale, i.dim.x),
            t.background.Paint.TextureScale.Scale = i.scale,
            i.url ||
            (
              i.url = Constants.FilePath_CMSRoot + Constants.FilePath_Textures + GlobalData.optManager.TextureList.Textures[n].filename
            ),
            a.SetTextureFill(i)
          )
      } else a.SetFillColor('none');
      a.ExcludeFromExport(this.GetBackgroundTransparent())
    }
    var o,
      s,
      l,
      S,
      c = this.VisibleZList();
    for (s = c.length, o = 0; o < s; o++) S = c[o],
      (l = this.GetObjectPtr(S, !1)) &&
      l.DataID >= 0 &&
      this.AddToDirtyList(S)
  }


  GetBackgroundTransparent() {
    var e = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1),
      t = GlobalData.docHandler.GetBackground(),
      a = !0;
    if (e && t) {
      var r = e.background.Paint;
      switch (r.FillType) {
        case ConstantData.FillTypes.SDFILL_SOLID:
          a = r.Color == ConstantData.Colors.Color_White ||
            0 === r.Opacity;
          break;
        case ConstantData.FillTypes.SDFILL_GRADIENT:
        case ConstantData.FillTypes.SDFILL_RICHGRADIENT:
        case ConstantData.FillTypes.SDFILL_TEXTURE:
          a = !1;
          break;
        default:
          a = !0
      }
    }
    return a
  }

  ShowLoading(e) {

    /*
    var t = $('#svg-area');
    if (t) if (e) t.addClass('loading');
    else {
      if (
        !0 === SDUI.AppSettings.UseBackplane &&
        (
          !0 === SDUI.BackplaneEditorMainController?.BackplanePages?.OperationInProgress ||
          !0 === ConstantData.DocumentContext.ImportingJSNF
        )
      ) return;
      if (
        !0 !== SDUI.AppSettings.UseBackplane &&
        (
          !0 === SDUI.Commands.MainController?.PagedSDRController?.OperationInProgress ||
          !0 === ConstantData.DocumentContext.ImportingJSNF
        )
      ) return;
      t.removeClass('loading')
    }
      */
  }



  BringToFrontOf() {
    var e = this.GetFrontBackLayersForSelected();
    e.result &&
      this.BringToFrontOfSpecificLayer(e.frontmostindex)
  }

  BringToFrontOfSpecificLayer(e, t) {
    var a = GlobalData.objectStore.GetObject(this.theSelectedListBlockID),
      r = Utils1.DeepCopy(a.Data),
      i = r.length;
    if (0 !== i) {
      var n = this.AddAssoctoList(r);
      if (0 !== (i = n.length)) {
        var o = this.VisibleZList();
        if (!(o.length < 1)) {
          Collab.AllowMessage() &&
            Collab.BeginSecondaryEdit();
          o.length;
          var s,
            l,
            S = [];
          for (s = 0; s < i; s++) {
            l = n[s];
            var c = $.inArray(l, o);
            S.push(c)
          }
          S.sort((function (e, t) {
            return e - t
          }));
          var u = [];
          for (s = 0; s < i; s++) l = o[S[s]],
            u.push(l);
          var p = this.ZListPreserveForLayer(e);
          for (s = 0; s < i; s++) l = u[s],
            this.RemoveFromAllZLists(l),
            p.push(l);
          if (this.UpdateLineHops(!0), Collab.AllowMessage()) {
            var d = {
              theTargetLayer: e
            };
            Collab.BuildMessage(
              ConstantData.CollabMessages.BringToFrontOfSpecificLayer,
              d,
              !0
            )
          }
          null == t &&
            (
              (a = GlobalData.objectStore.PreserveBlock(this.theSelectedListBlockID)).Data = n
            ),
            this.RenderAllSVGObjects(),
            this.CompleteOperation()
        }
      }
    }
  }


  GroupSelectedShapes(e, t, a, r, i) {
    var n,
      o,
      s = !1,
      l = [],
      S = this.ActiveVisibleZList();
    a &&
      (S = GlobalData.optManager.ZList());
    var c = S.length;
    if (0 === c) return !1;
    var u = (t || GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data).length;
    if (u <= 1) return !1;
    if (o = t || GlobalData.optManager.GetMoveList(- 1, !0, !0, !1, {
    }, !1), !a) {
      if (!this.AllowGroup(o)) return void Utils2.Alert(Resources.Strings.GroupNotAllowed, null);
      if (this.IsLinkedOutside(o)) return void Utils2.Alert(Resources.Strings.LinkedOutside);
      if (this.IsGroupNonDelete()) return void Utils2.Alert(Resources.Strings.GroupNonDelete)
    }
    if (i && Collab.AllowMessage()) {
      Collab.BeginSecondaryEdit();
      var p = {},
        d = Collab.BuildMessage(ConstantData.CollabMessages.GroupSelectedShapes, p, !0, !0)
    }
    var D,
      g = function (e) {
        for (var t = [], a = 0, r = e.length; a < r; a++) {
          var i = GlobalData.optManager.GetObjectPtr(e[a], !0);
          (
            i.Dimensions & ConstantData.DimensionFlags.SED_DF_Always ||
            i.Dimensions & ConstantData.DimensionFlags.SED_DF_Select
          ) &&
            (
              t.push({
                index: a,
                dimensions: i.Dimensions
              }),
              i.Dimensions = 0,
              i.UpdateFrame()
            )
        }
        return t
      }(o);
    D = this.GetListSRect(o),
      function (e, t) {
        for (var a = 0, r = t.length; a < r; a++) {
          var i = GlobalData.optManager.GetObjectPtr(e[t[a].index], !0);
          i.Dimensions = t[a].dimensions,
            i.UpdateFrame()
        }
      }(o, g);
    var h = [];
    for (n = 0; n < c; ++n) - 1 != o.indexOf(S[n]) &&
      h.push(S[n]);
    t ||
      this.GetObjectPtr(this.theSelectedListBlockID, !0);
    var m,
      C = this.GetObjectPtr(this.theLinksBlockID, !0),
      y = null;
    for (u = h.length, n = 0; n < u; ++n) {
      if (
        (y = GlobalData.optManager.GetObjectPtr(h[n], !0)).CommentID >= 0 &&
        l.push(y.CommentID),
        (m = y.Frame).x -= D.x,
        m.y -= D.y,
        y.NoRotate() &&
        (s = !0),
        y.bInGroup = !0,
        (
          // y instanceof ListManager.BaseLine ||
          // y instanceof GlobalDataShape.BaseLine ||
          y instanceof Instance.Shape.BaseLine ||
          // y instanceof SDJS.Connector ||
          // y instanceof GlobalDataShape.Connector ||
          y instanceof Instance.Shape.Connector ||
          void 0 !== y.StartPoint &&
          void 0 !== y.EndPoint
        ) &&
        (
          y.StartPoint.x -= D.x,
          y.StartPoint.y -= D.y,
          y.EndPoint.x -= D.x,
          y.EndPoint.y -= D.y
        ),
        y.NativeID >= 0 &&
        y.ShapeType === ConstantData.ShapeType.GROUPSYMBOL
      ) {
        var f = GlobalData.objectStore.PreserveBlock(y.NativeID);
        f &&
          f.Delete(),
          y.NativeID = - 1
      }
      y.UpdateFrame(m)
    }
    var L = {
      Frame: {
        x: D.x,
        y: D.y,
        width: D.width,
        height: D.height
      },
      TextGrow: ConstantData.TextGrowBehavior.PROPORTIONAL,
      ShapesInGroup: h,
      InitialGroupBounds: {
        x: D.x,
        y: D.y,
        width: D.width,
        height: D.height
      }
    },
      // I = new ListManager.GroupSymbol(L);
      I = new GroupSymbol(L);
    s &&
      (
        I.extraflags = Utils2.SetFlag(I.extraflags, ConstantData.ExtraFlags.SEDE_NoRotate, !0)
      );
    this.ZListPreserve();
    var T = GlobalData.optManager.AddNewObject(I, !0, !1);
    for (
      i &&
      Collab.AllowMessage() &&
      (
        Collab.AddNewBlockToSecondary(T),
        Collab.IsSecondary() &&
        (p.CreateList = [], p.CreateList.push(T))
      ),
      I.StyleRecord &&
      (
        I.StyleRecord.Line &&
        (I.StyleRecord.Line.Thickness = 0),
        I.StyleRecord.OutsideEffect &&
        (
          I.StyleRecord.OutsideEffect.OutsideType = 0,
          I.StyleRecord.OutsideEffect.OutsideExtent_Bottom = 0,
          I.StyleRecord.OutsideEffect.OutsideExtent_Left = 0,
          I.StyleRecord.OutsideEffect.OutsideExtent_Right = 0,
          I.StyleRecord.OutsideEffect.OutsideExtent_Top = 0
        ),
        I.UpdateFrame()
      ),
      n = 0;
      n < u;
      ++n
    ) GlobalData.optManager.RemoveFromAllZLists(h[n]),
      GlobalData.optManager.DeleteLink(C, h[n], - 1, null, 0, !0);
    return l.length &&
      GlobalData.optManager.Comment_Group(l),
      c = (S = this.ActiveVisibleZList()).length,
      I.ConvertToNative(GlobalData.optManager.RichGradients, a),
      i &&
      Collab.AllowMessage() &&
      Collab.SendMessage(d),
      this.CompleteOperation([S[c - 1]], e),
      r ||
      a ||
      this.RenderAllSVGObjects(),
      this.theMoveList = null,
      T
  }

  AllowGroup(e) {
    var t,
      a,
      r,
      i,
      n;
    for (t = e.length, a = 0; a < t; a++) if (r = this.GetObjectPtr(e[a], !1)) {
      if (r.flags & ConstantData.ObjFlags.SEDO_Lock) return !1;
      for (n = r.hooks.length, i = 0; i < n; i++) if (e.indexOf(r.hooks[i].objid) < 0) return !1
    }
    return !0
  }

  IsLinkedOutside(e) {

    var t,
      a,
      r = null,
      i = null,
      n = GlobalData.optManager.ZList();
    for (t = 0; t < e.length; t++) for (r = GlobalData.optManager.GetObjectPtr(e[t], !1), a = 0; a < n.length; a++) if (
      (i = GlobalData.optManager.GetObjectPtr(n[a], !1)).associd === r.BlockID &&
      - 1 === e.indexOf(i.BlockID)
    ) return !0;
    return !1
  }

  IsGroupNonDelete() {

    var e,
      t = null,
      a = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1);
    for (e = 0; e < a.length; e++) {
      if (
        (t = GlobalData.optManager.GetObjectPtr(a[e], !1)).subtype == ConstantData.ObjectTypes.SD_SUBT_KANBAN_TABLE
      ) return !0;
      if (t.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete) return !0;
      if (
        t.objecttype == ConstantData.ObjectTypes.SD_OBJT_TIMELINE_EVENT &&
        t.hooks.length > 0 &&
        GlobalData.optManager.GetObjectPtr(t.hooks[0].objid).objecttype == ConstantData.ObjectTypes.SD_OBJT_TIMELINE
      ) return !0
    }
    return !1
  }

  GetListSRect(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l = ConstantData.ObjFlags.SEDO_NotVisible;
    for (i = e.length, r = 0; r < i; r++) {
      n = e[r];
      var S = GlobalData.optManager.GetObjectPtr(n, !1);
      null != S &&
        (
          s = t ? S.Frame : a ? S.GetDragR() : S.r,
          S &&
          0 == (S.flags & l) &&
          (
            void 0 === o ? (o = {}, Utils2.CopyRect(o, s)) : Utils2.UnionRect(s, o, o)
          )
        )
    }
    return o
  }


  UngroupSelectedShapes() {
    var e,
      t;
    if (0 === this.ActiveVisibleZList().length) return !1;
    var a = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data,
      r = a.length;
    if (0 === r) return !1;
    var i = !1,
      n = null;
    for (e = 0; e < r; ++e) {
      if (
        (n = GlobalData.optManager.GetObjectPtr(a[e], !1))
        // instanceof ListManager.GroupSymbol
        // Double ===
        instanceof GroupSymbol
      ) {
        i = !0;
        break
      }
      if (n.NativeID >= 0) {
        i = !0;
        break
      }
    }
    if (i) {
      if (Collab.AllowMessage()) {
        Collab.BeginSecondaryEdit();
        var o = {},
          s = Collab.BuildMessage(
            ConstantData.CollabMessages.UngroupSelectedShapes,
            o,
            !0,
            !0
          )
      }
      a = (a = GlobalData.optManager.GetObjectPtr(this.theSelectedListBlockID, !0)).slice(0);
      var l = [];
      for (e = 0; e < r; ++e) {
        n = GlobalData.optManager.GetObjectPtr(a[e], !1);
        var S = a[e];
        // n instanceof ListManager.GroupSymbol
        // Double ===
        n instanceof GroupSymbol
          ? (i = !0, l = l.concat(n.ShapesInGroup), this.UngroupShape(S)) : n.NativeID >= 0 ? (t = GlobalData.optManager.UngroupNative(S, !1, !0)) &&
            (
              Collab.AllowMessage() &&
              Collab.AddNewBlockToSecondary(t[0]),
              this.DeleteObjects([S], !1),
              l = l.concat(t),
              i = !0
            ) : l.push(S)
      }
      i &&
        (
          this.RenderAllSVGObjects(),
          this.SelectObjects(l),
          Collab.AllowMessage() &&
          (
            Collab.IsSecondary() &&
            Collab.CreateList.length &&
            (
              o.CreateList = [],
              o.CreateList = o.CreateList.concat(Collab.CreateList)
            ),
            Collab.SendMessage(s)
          ),
          this.CompleteOperation(l)
        )
    }
  }




  FindParentGroup(e, t) {
    var a,
      r,
      i = (t = t || null) ? t.ShapesInGroup : this.ZList();
    for (r = 0; r < i.length; r++) {
      if (i[r] == e) return t;
      if (
        (a = GlobalData.optManager.GetObjectPtr(i[r], !1))
        // instanceof ListManager.GroupSymbol &&
        instanceof GroupSymbol &&
        a.ShapesInGroup &&
        (a = GlobalData.optManager.FindParentGroup(e, a))
      ) return a
    }
    return null
  }



  FlipShapes(e) {
    var t = function (e) {
      return !(Math.abs(e.RotationAngle % 180) < 20) &&
        Math.abs(e.RotationAngle % 90) < 20
    },
      a = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data,
      r = a.length;
    if (0 !== r) {
      var i,
        n = 0,
        o = null,
        s = !1;
      for (
        i = e === ConstantData.ExtraFlags.SEDE_FlipVert ? ConstantData.ExtraFlags.SEDE_FlipHoriz : ConstantData.ExtraFlags.SEDE_FlipVert,
        n = 0;
        n < r &&
        !(s = (o = this.GetObjectPtr(a[n], !1)).NoFlip());
        ++n
      );
      if (s) Utils2.Alert(Resources.Strings.NoFlip, null);
      else {
        for (
          Collab.AllowMessage() &&
          Collab.BeginSecondaryEdit(),
          n = 0;
          n < r;
          ++n
        ) o = this.GetObjectPtr(a[n], !0),
          this.SetLinkFlag(a[n], ConstantData.LinkFlags.SED_L_MOVE),
          o.hooks.length &&
          this.SetLinkFlag(o.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE),
          this.AddToDirtyList(a[n]),
          t(o) ? o.Flip(i) : o.Flip(e);
        if (Collab.AllowMessage()) {
          var l = {
            flip: e
          };
          Collab.BuildMessage(ConstantData.CollabMessages.FlipShapes, l, !0)
        }
        this.CompleteOperation(null)
      }
    }
  }

  FlipVertexArray(e, t) {
    var a,
      r = e.length;
    for (a = 0; a < r; a++) t & ConstantData.ExtraFlags.SEDE_FlipHoriz &&
      (e[a].x = 1 - e[a].x),
      t & ConstantData.ExtraFlags.SEDE_FlipVert &&
      (e[a].y = 1 - e[a].y);
    return e
  }

  GuessTextIndents(e, t) {
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
      L = 10,
      I = [
        {
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 0
        }
      ],
      T = [
        {
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 0
        }
      ],
      b = 0,
      M = 0,
      P = 0,
      R = {},
      A = {},
      _ = {};
    for (
      (a = t.width) < 1 &&
      (a = 1),
      (i = t.height) < 1 &&
      (i = 1),
      r = a,
      n = i,
      f = Utils2.SetRect(0, 0, t.width, t.height),
      o = n / 20,
      s = 0;
      s < L;
      s++
    ) if (l = 0.8 * s * r / L, 2 === (c = this.PolyGetIntersect(e, l, I, null, !0))) for (u = 0; u < L - s; u++) S = (1 - u / L * 0.8) * r,
      2 === (c = this.PolyGetIntersect(e, S, T, null, !0)) &&
      (
        T[0] > (g = I[0]) &&
        (g = T[0]),
        T[1] < (h = I[1]) &&
        (h = T[1]),
        g < h &&
        (
          p = g,
          (c = this.PolyGetIntersect(e, p + 1, T, null, !1)) > 2 &&
          (p = g += o, c = this.PolyGetIntersect(e, p + 1, T, null, !1)),
          p = h,
          2 === c &&
          (c = this.PolyGetIntersect(e, p - 1, T, null, !1)) > 2 &&
          (p = h -= o, c = this.PolyGetIntersect(e, p - 1, T, null, !1)),
          2 === c &&
          h > g &&
          (
            p = g + (h - g) / 2,
            d = l,
            D = S,
            2 === (c = this.PolyGetIntersect(e, p - 1, T, null, !1)) &&
            (T[0] > l && (d = T[0]), T[1] < S && (D = T[1])),
            m = (D - d) * (h - g),
            (0 === b || C < m) &&
            (b = !0, C = m, R = Utils2.SetRect(d, g, D, h))
          )
        )
      );
    for (
      b &&
      (y = C = R.width * R.height, Utils2.CopyRect(A, R), M = !0),
      o = r / 20,
      s = 0;
      s < L;
      s++
    ) if (l = 0.8 * s * n / L, 2 === (c = this.PolyGetIntersect(e, l, I, null, !1))) for (u = 0; u < L - s; u++) S = (1 - u / L * 0.8) * n,
      2 === (c = this.PolyGetIntersect(e, S, T, null, !1)) &&
      (
        T[0] > (g = I[0]) &&
        (g = T[0]),
        T[1] < (h = I[1]) &&
        (h = T[1]),
        g < h &&
        (
          p = g,
          (c = this.PolyGetIntersect(e, p + 1, T, null, !0)) > 2 &&
          (p = g += o, c = this.PolyGetIntersect(e, p + 1, T, null, !0)),
          p = h,
          2 === c &&
          (c = this.PolyGetIntersect(e, p - 1, T, null, !0)) > 2 &&
          (p = h -= o, c = this.PolyGetIntersect(e, p - 1, T, null, !0)),
          2 === c &&
          h > g &&
          (
            p = g + (h - g) / 2,
            d = l,
            D = S,
            2 === (c = this.PolyGetIntersect(e, p - 1, T, null, !0)) &&
            (T[0] > l && (d = T[0]), T[1] < S && (D = T[1])),
            m = (D - d) * (h - g),
            (0 === b || C < m) &&
            (b = !0, P = !0, C = m, R = Utils2.SetRect(g, d, h, D))
          )
        )
      );
    for (
      P &&
      M &&
      y > (C = R.width * R.height) &&
      Utils2.CopyRect(R, A),
      b ? (
        _.left_sindent = (R.x + 0) / a,
        _.right_sindent = (f.x + f.width - (R.x + R.width) - 0) / a,
        _.top_sindent = (R.y + 0) / i,
        _.bottom_sindent = (f.y + f.height - (R.y + R.height) - 0) / i
      ) : (
        _.left_sindent = 0.2,
        _.right_sindent = 0.2,
        _.top_sindent = 0.2,
        _.bottom_sindent = 0.2
      );
      _.left_sindent + _.right_sindent > 0.8;
    ) _.left_sindent > 0.4 &&
      (_.left_sindent -= 0.1),
      _.right_sindent > 0.4 &&
      (_.right_sindent -= 0.1);
    for (; _.top_sindent + _.bottom_sindent > 0.8;) _.top_sindent > 0.4 &&
      (_.top_sindent -= 0.1),
      _.bottom_sindent > 0.4 &&
      (_.bottom_sindent -= 0.1);
    return _
  }


  MakeSameSize(e) {
    var t = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data,
      a = t.length;
    if (!(a <= 1)) {
      var r = this.GetTargetSelect(),
        i = null;
      if (- 1 != r) {
        this.GetObjectPtr(r, !1);
        var n,
          o,
          s,
          l = 0,
          S = null,
          c = (i = $.extend(!0, {
          }, this.GetObjectPtr(r, !1).Frame)).height,
          u = i.width;
        for (
          Collab.AllowMessage() &&
          Collab.BeginSecondaryEdit(),
          l = 0;
          l < a;
          ++l
        ) if ((n = t[l]) !== r) {
          S = this.GetObjectPtr(n, !0);
          var p = Utils1.DeepCopy(S.Frame);
          switch (e) {
            case 1:
              S.SetSize(null, c, 0);
              break;
            case 2:
              S.SetSize(u, null, 0);
              break;
            case 3:
              S.SetSize(u, c, 0)
          }(
            GlobalData.docHandler.documentConfig.centerSnap &&
            GlobalData.docHandler.documentConfig.enableSnap ||
            !1 === GlobalData.docHandler.documentConfig.enableSnap
          ) &&
            (
              o = (S.Frame.width - p.width) / 2,
              s = (S.Frame.height - p.height) / 2,
              (o || s) &&
              GlobalData.optManager.OffsetShape(n, - o, - s, 0)
            ),
            S.rflags &&
            (
              S.rflags = Utils2.SetFlag(S.rflags, ConstantData.FloatingPointDim.SD_FP_Width, !1),
              S.rflags = Utils2.SetFlag(S.rflags, ConstantData.FloatingPointDim.SD_FP_Height, !1)
            ),
            this.SetLinkFlag(t[l], ConstantData.LinkFlags.SED_L_MOVE),
            this.AddToDirtyList(t[l])
        }
        if (Collab.AllowMessage()) {
          var d = {
            makeSameSizeOption: e
          };
          Collab.BuildMessage(ConstantData.CollabMessages.MakeSameSize, d, !0)
        }
        this.CompleteOperation(null)
      }
    }
  }



  StampNewTextShapeOnTap(e, t, a, r, i, n, o) {
    this.SetModalOperation(ConstantData2.ModalOperations.STAMPTEXTONTAP),
      this.stampCompleteCallback = n ||
      null,
      this.stampCompleteUserData = o ||
      null,
      this.stampHCenter = t,
      this.stampVCenter = a,
      this.stampSticky = i,
      this.theDrawShape = e,
      this.ClearAnySelection(!1),
      this.SetEditMode(ConstantData.EditState.TEXT),
      this.WorkAreaHammerTap = function (t) {
        try {
          GlobalData.optManager.SetUIAdaptation(t),
            Collab.AllowMessage() &&
            Collab.BeginSecondaryEdit(),
            GlobalData.optManager.AddNewObject(e, r, !1);
          var a = GlobalData.optManager.ActiveLayerZList(),
            i = a.length;
          GlobalData.optManager.theActionStoredObjectID = a[i - 1],
            GlobalData.optManager.theActionSVGObject = GlobalData.optManager.svgObjectLayer.GetElementByID(GlobalData.optManager.theActionStoredObjectID),
            GlobalData.optManager.StampTextObjectOnTapDone(t, r)
        } catch (e) {
          GlobalData.optManager.CancelModalOperation();
          GlobalData.optManager.ExceptionCleanup(e);
          // GlobalData.optManager.UpdateTools();
          throw e;
        }
      },
      this.WorkAreaHammer.on('tap', this.WorkAreaHammerTap),
      this.LM_StampPreTrack()
  }


  CancelObjectStampTextOnTap(e) {
    this.SetModalOperation(ConstantData2.ModalOperations.NONE),
      this.LM_StampPostRelease(!1),
      this.SetEditMode(ConstantData.EditState.DEFAULT),
      e &&
      this.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick),
      this.stampCompleteCallback = null,
      this.stampCompleteUserData = null,
      this.theMoveList = null,
      this.stampShapeOffsetX = 0,
      this.stampShapeOffsetY = 0,
      this.stampHCenter = !1,
      this.stampVCenter = !1,
      this.theDrawShape = null,
      this.theMoveList = null,
      this.theActionStoredObjectID = - 1,
      this.theActionSVGObject = null
    //,
    // this.UpdateTools()
  }

  StampTextObjectOnTapDone(e, t) {
    GlobalData.optManager.SetUIAdaptation(e);
    var a = [],
      r = this.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
      i = this.theDrawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly;
    if (!i) {
      var n = this.LinkParams &&
        this.LinkParams.SConnectIndex >= 0;
      this.OverrideSnaps(e) &&
        (n = !0),
        GlobalData.docHandler.documentConfig.enableSnap &&
        !n &&
        (r = GlobalData.docHandler.SnapToGrid(r))
    }
    var o = r.x;
    o -= this.theDrawShape.Frame.width / 2;
    var s = r.y;
    var Collab_Data;
    s -= this.theDrawShape.Frame.height / 2,
      this.theDrawShape.Frame.x = o - this.stampShapeOffsetX,
      this.theDrawShape.Frame.y = s - this.stampShapeOffsetY,
      this.theDrawShape.sizedim.width = this.theDrawShape.Frame.width,
      this.theDrawShape.sizedim.height = this.theDrawShape.Frame.height,
      this.theDrawShape.UpdateFrame(this.theDrawShape.Frame),
      Collab.AddNewBlockToSecondary(this.theDrawShape.BlockID),
      Collab_Data = {},
      this.BuildCreateMessage(Collab_Data, !0),
      this.GetObjectPtr(this.theActionStoredObjectID, !0),
      this.SetEditMode(ConstantData.EditState.DEFAULT),
      this.theMoveList &&
        this.theMoveList.length ? (
        this.DeleteObjects(a, !1),
        a = this.theMoveList.slice(0),
        this.theActionStoredObjectID = - 1
      ) : this.AddToDirtyList(this.theActionStoredObjectID),
      this.RenderDirtySVGObjects(),
      this.theMoveList = null,
      this.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick),
      this.CompleteOperation(a),
      this.stampCompleteCallback &&
      this.theActionStoredObjectID >= 0 &&
      this.stampCompleteCallback(this.theActionStoredObjectID, this.stampCompleteUserData),
      this.stampCompleteCallback = null,
      this.stampCompleteUserData = null,
      this.stampHCenter = !1,
      this.stampVCenter = !1,
      this.stampShapeOffsetX = 0,
      this.stampShapeOffsetY = 0,
      this.LM_StampPostRelease(!0),
      i ||
      a.push(this.theActionStoredObjectID),
      this.theActionStoredObjectID = - 1,
      this.theActionSVGObject = null,
      this.SetModalOperation(ConstantData2.ModalOperations.NONE)
    //,
    // this.UpdateTools()
  }

  ReverseReplaceStdText(e, t) {
    var a,
      r,
      i = - 1;
    if (r = e.GetTable(!0)) {
      if (r.select >= 0) {
        var n = r.cells[r.select];
        if (n.flags & ListManager.Table.CellFlags.SDT_F_Clickhere) {
          switch (n.celltype) {
            case ListManager.Table.CellTypes.SDT_CT_PERSON:
              i = Resources.ReplaceTextStrings.Indexes.PersonClick;
              break;
            case ListManager.Table.CellTypes.SDT_CT_GANTTTASK:
              i = Resources.ReplaceTextStrings.Indexes.TaskClick;
              break;
            default:
              i = e.TextFlags & ConstantData.TextFlags.SED_TF_OneClick ? Resources.ReplaceTextStrings.Indexes.Click : Resources.ReplaceTextStrings.Indexes.DoubleClick
          }
          return a = Resources.ReplaceTextStrings[i],
            t.Paste(a),
            n.flags = Utils2.SetFlag(n.flags, ListManager.Table.CellFlags.SDT_F_Clickhere, !1),
            !0
        }
      }
    } else if (e.TextFlags & ConstantData.TextFlags.SED_TF_Clickhere) return a = e.TextFlags & ConstantData.TextFlags.SED_TF_OneClick ? Resources.ReplaceTextStrings[Resources.ReplaceTextStrings.Indexes.Click] : Resources.ReplaceTextStrings[Resources.ReplaceTextStrings.Indexes.DoubleClick],
      t.Paste(a),
      e.TextFlags = Utils2.SetFlag(e.TextFlags, ConstantData.TextFlags.SED_TF_Clickhere, !1),
      !0;
    return !1
  }



  ReplaceStdText(e, t, a, r) {
    var i,
      n,
      o,
      s,
      l,
      S,
      c = Resources.ReplaceTextStrings.length;
    for (
      c = Resources.ReplaceTextStrings[0].length,
      o = t.slice(0, c),
      c = Resources.ReplaceTextStrings[1].length,
      s = t.slice(0, c),
      l = o.toUpperCase() === Resources.ReplaceTextStrings[0].toUpperCase() ||
      s.toUpperCase() === Resources.ReplaceTextStrings[1].toUpperCase(),
      S = t.toUpperCase(),
      c = Resources.ReplaceTextStrings.length,
      i = 1;
      i < c;
      i++
    ) if (l || S === Resources.ReplaceTextStrings[i].toUpperCase()) {
      if (r) return !0;
      if (a.SetText(''), n = e.GetTable(!0)) {
        if (n.select >= 0) {
          var u = n.cells[n.select];
          u.flags = Utils2.SetFlag(u.flags, ListManager.Table.CellFlags.SDT_F_Clickhere, !0)
        }
      } else e.TextFlags = Utils2.SetFlag(e.TextFlags, ConstantData.TextFlags.SED_TF_Clickhere, !0);
      return !0
    }
    return !1
  }


  UngroupShape(e, t) {
    var a,
      r,
      i,
      n,
      o = [],
      s = null,
      l = null,
      S = [],
      c = ConstantData.ExtraFlags.SEDE_FlipVert,
      u = ConstantData.ExtraFlags.SEDE_FlipHoriz,
      p = GlobalData.optManager.GetObjectPtr(e, !0),
      d = GlobalData.optManager.SD_GetVisioTextChild(e),
      D = [],
      g = p.Frame,
      h = {
        x: g.x + g.width / 2,
        y: g.y + g.height / 2
      },
      m = (Math.PI, p.RotationAngle, p.ShapesInGroup),
      C = m.length;
    if (0 !== C) {
      var y = null,
        f = this.GetObjectPtr(this.theLinksBlockID, !0),
        L = (GlobalData.optManager.ZListPreserve(), g.x),
        I = g.y,
        T = g.width / p.InitialGroupBounds.width;
      isNaN(T) &&
        (T = 1);
      var b = g.height / p.InitialGroupBounds.height;
      for (isNaN(b) && (b = 1), a = 0; a < C; ++a) {
        if (
          (y = GlobalData.optManager.GetObjectPtr(m[a], !0)).CommentID >= 0 &&
          o.push(y.CommentID),
          // y instanceof ListManager.ShapeContainer &&
          y instanceof ShapeContainer &&
          D.push(y.BlockID),
          // s = new ListManager.BaseDrawingObject(null),
          s = new BaseDrawingObject(null),
          (s = Utils1.DeepCopy(y)).Frame.x += L,
          s.Frame.y += I,
          s.StartPoint &&
          (s.StartPoint.x += L, s.StartPoint.y += I),
          s.EndPoint &&
          (s.EndPoint.x += L, s.EndPoint.y += I),
          S.push(s),
          // y instanceof ListManager.GroupSymbol &&
          y instanceof GroupSymbol &&
          y.NativeID < 0 &&
          y.ConvertToNative(GlobalData.optManager.RichGradients, !1),
          y.ScaleObject(L, I, h, p.RotationAngle, T, b, !0),
          i = 0,
          0,
          p.extraflags & c &&
          y.Flip(c),
          p.extraflags & u &&
          (
            i = p.Frame.width - (y.Frame.x + y.Frame.width - p.Frame.x) - y.Frame.x + p.Frame.x,
            y.Flip(u)
          ),
          i &&
          y.OffsetShape(i, 0),
          - 1 != y.DataID &&
          1 != b
        ) {
          var M = GlobalData.optManager.GetObjectPtr(y.DataID, !0).runtimeText.styles,
            P = M.length;
          for (n = 0; n < P; ++n) M[n].size *= b
        } (r = y.GetTable(!0)) &&
          this.Table_ScaleTable(y, r, T, b),
          y.bInGroup = !1,
          this.AddToDirtyList(m[a]),
          GlobalData.optManager.RebuildLinks(f, m[a])
      }
      for (
        GlobalData.optManager.InsertObjectsIntoLayerAt(e, m),
        a = 0;
        a < S.length;
        a++
      ) {
        if (
          GlobalData.optManager.ob = S[a],
          l = GlobalData.optManager.GetObjectPtr(S[a].BlockID, !1),
          t
        ) var R = 2;
        else R = !1;
        GlobalData.optManager.MaintainLink(
          S[a].BlockID,
          l,
          GlobalData.optManager.ob,
          ConstantData.ActionTriggerType.FLIP,
          R
        )
      }
      GlobalData.optManager.ob = {};
      var A = D.length;
      for (a = 0; a < A; a++) GlobalData.optManager.SetLinkFlag(D[a], ConstantData.LinkFlags.SED_L_MOVE);
      GlobalData.optManager.UpdateLinks(),
        p.ShapesInGroup = [],
        this.DeleteObjects([e], !1),
        d >= 0 &&
        (
          (l = GlobalData.optManager.GetObjectPtr(d)).moreflags = Utils2.SetFlag(
            l.moreflags,
            ConstantData.ObjMoreFlags.SED_MF_VisioText,
            !1
          ),
          l.associd = - 1,
          this.BringObjectToFrontofLayer(d)
        ),
        o.length &&
        GlobalData.optManager.Comment_Ungroup(o),
        GlobalData.optManager.RenderDirtySVGObjects()
    }
  }



  RebuildLinks(e, t) {
    var a = GlobalData.optManager.GetObjectPtr(t, !1);
    if (a && a.hooks) for (var r = a.hooks.length, i = 0; i < r; i++)
      GlobalData.optManager.InsertLink(e, t, i, ConstantData.LinkFlags.SED_L_MOVE)
  }


  InsertObjectsIntoLayerAt(e, t) {
    var a = this.FindLayerForShapeID(e);
    if (a >= 0) {
      var r = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, !0).layers,
        i = r[a].zList,
        n = i.indexOf(e),
        o = i.length,
        s = i.slice(n + 1);
      i.splice(n + 1, o - n - 1),
        i = i.concat(t),
        r[a].zList = i.concat(s)
    }
  }

  CutObjects(e) {
    try {
      if (GlobalData.optManager.CutFromButton && e) return void (GlobalData.optManager.CutFromButton = !1);
      if (
        GlobalData.optManager.CutFromButton = !0 !== e,
        - 1 != this.GetObjectPtr(this.theTEDSessionBlockID, !1).theActiveTextEditObjectID ||
        this.bInNoteEdit ||
        GlobalData.optManager.bInDimensionEdit
      ) {
        var t = this.svgDoc.GetActiveEdit();
        return void (
          t &&
          (
            this.theTextClipboard = t.Copy(!0),
            Collab.BeginSecondaryEdit(),
            this.RegisterLastTEOp(ConstantData.TELastOp.CUT),
            t.Delete(),
            // SDUI.Commands.MainController.Selection.SetPasteEnable(null != this.theTextClipboard),
            this.theContentHeader.ClipboardBuffer = null,
            this.theContentHeader.ClipboardType = ConstantData.ClipboardType.Text,
            this.RegisterLastTEOp(ConstantData.TELastOp.TIMEOUT)
          )
        )
      }
      var a = this.Table_GetActiveID();
      if (a >= 0) return this.Table_CopyCellContent(a),
        void this.Table_DeleteCellContent(a, null);
      if (!this.AreSelectedObjects()) return;
      this.CloseEdit(),
        this.CopyObjectsCommon(!1),
        this.DeleteSelectedObjectsCommon()
    } catch (e) {
      GlobalData.optManager.RestorePrimaryStateManager();
      GlobalData.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  CopyObjectsCommon(e) {
    var t,
      a,
      r = GlobalData.objectStore.GetObject(this.theSelectedListBlockID).Data;
    r.length &&
      this.IsPlanningDocument() === ConstantData.LayerTypes.SD_LAYERT_MINDMAP &&
      ListManager.TaskMap.CommitVisualOutline();
    var i = {
      connectors: !1
    };
    this.AddtoDelete(r, !0, i);
    var n = r.length;
    if (0 !== n) {
      if (i.connectors && !e) return Collab.CloseSecondaryEdit(),
        this.FilterFiletoClipboard(r, e);
      var o,
        s = this.ZList(),
        l = (s.length, []);
      for (t = 0; t < n; t++) {
        o = r[t];
        var S = $.inArray(o, s);
        l.push(S)
      }
      l.sort((function (e, t) {
        return e - t
      }));
      var c = [];
      for (t = 0; t < n; t++) o = s[l[t]],
        c.push(o);
      if (e) return {
        zList: c,
        buffer: SDF.WriteSelect(c, !1, !0, !1)
      };
      for (
        this.theContentHeader.ClipboardBuffer = SDF.WriteSelect(c, !1, !0, !1),
        this.theContentHeader.ClipboardType = ConstantData.ClipboardType.LM,
        t = (
          n = (r = this.GetObjectPtr(this.theSelectedListBlockID, !1)).length
        ) - 1;
        t >= 0;
        t--
      ) (a = this.GetObjectPtr(r[t], !1)) &&
        a.flags & ConstantData.ObjFlags.SEDO_NotVisible &&
        r.splice(t, 1)
    }
  }



  UpdateObjectLayerIndices(e) {
    var t,
      a,
      r,
      i,
      n,
      o = GlobalData.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
      s = o.layers,
      l = o.nlayers;
    for (r = 0; r < l; ++r) for (t = (a = s[r].zList).length, i = 0; i < t; ++i) (n = GlobalData.optManager.GetObjectPtr(a[i], !1)) &&
      (n.Layer = r, n.GetTextures(e.TextureList))
  }



  PasteLM(e) {
    var t,
      a = {
        selectedList: []
      };
    if (
      t = GlobalData.optManager.PastePoint ? GlobalData.optManager.PastePoint : this.GetPastePosition(),
      Collab.AllowMessage()
    ) {
      var r = {};
      r.ClipboardString = Collab.BufferToString(e),
        r.pastepos = Utils1.DeepCopy(t)
    }
    return SDF.ReadSymbolFromBuffer(e, t.x, t.y, 0, !1, !0, a, !0, !1, !1, !1, !1),
      GlobalData.optManager.PastePoint = null,
      this.CompleteOperation(a.selectedList),
      Collab.AllowMessage() &&
      (
        Collab.IsSecondary() &&
        (r.CreateList = Utils1.DeepCopy(a.selectedList)),
        Collab.AddNewBlockToSecondary(a.selectedList),
        Collab.BuildMessage(ConstantData.CollabMessages.PasteObjects, r, !1)
      ),
      a.selectedList
  }

  GetPastePosition() {
    var e = 100,
      t = GlobalData.docHandler.svgDoc.GetWorkArea(),
      a = GlobalData.docHandler.svgDoc.docInfo.docToScreenScale;
    null != a &&
      0 !== a ||
      (a = 1);
    var r = {
      x: (t.scrollX + e) / a,
      y: (t.scrollY + e) / a
    };
    return t.scrollX === GlobalData.optManager.TopLeftPasteScrollPos.x &&
      t.scrollY === GlobalData.optManager.TopLeftPasteScrollPos.y ? (
      (r = GlobalData.optManager.TopLeftPastePos).x += 50,
      r.y += 50,
      GlobalData.optManager.PasteCount++,
      GlobalData.optManager.PasteCount > 5 &&
      (
        GlobalData.optManager.PasteCount = 0,
        r = {
          x: (t.scrollX + e) / a,
          y: (t.scrollY + e) / a
        }
      )
    ) : GlobalData.optManager.PasteCount = 0,
      GlobalData.optManager.TopLeftPastePos = {
        x: r.x,
        y: r.y
      },
      GlobalData.optManager.TopLeftPasteScrollPos = {
        x: t.scrollX,
        y: t.scrollY
      },
      r
  }

  CopyObjects() {
    var e = this.GetObjectPtr(this.theTEDSessionBlockID, !1),
      t = this.Table_GetActiveID();
    if (
      - 1 != e.theActiveTextEditObjectID ||
      this.bInNoteEdit ||
      GlobalData.optManager.bInDimensionEdit
    ) {
      var a = this.svgDoc.GetActiveEdit();
      if (a) {
        var r = a.Copy(!0);
        r &&
          (this.theTextClipboard = r),
          SDUI.Commands.MainController.Selection.SetPasteEnable(null != this.theTextClipboard),
          this.theContentHeader.ClipboardBuffer = null,
          this.theContentHeader.ClipboardType = ConstantData.ClipboardType.Text
      }
      return this.theTextClipboard
    }
    if (t >= 0) this.Table_CopyCellContent(t),
      this.theTextClipboard = null;
    else {
      if (!this.AreSelectedObjects()) return;
      this.CloseEdit(),
        this.CopyObjectsCommon(!1),
        this.theTextClipboard = null
    }
    var i = this.GetObjectPtr(this.theSelectedListBlockID, !1);
    return this.UpdateSelectionAttributes(i),
      this.theContentHeader.ClipboardBuffer
  }


  GetSelectionContext() {

    console.log('ListManager.LM.prototype.GetSelectionContext');

    var e,
      t = [];
    if (
      - 1 != this.GetObjectPtr(this.theTEDSessionBlockID, !1).theActiveTextEditObjectID
    ) return (e = Business.GetSelectionBusinessManager()) ? (
      t.push(Resources.Contexts.Text),
      t.push(this.GetAutomationContext(e)),
      t
    ) : Resources.Contexts.Text;
    var a = this.svgDoc.GetActiveEdit();
    if (
      null != a &&
      a.ID == ConstantData.SVGElementClass.DIMENSIONTEXT
    ) return Resources.Contexts.DimensionText;
    if (null != a && a.ID == ConstantData.SVGElementClass.NOTETEXT) return Resources.Contexts.NoteText;
    if (- 1 != this.Table_GetActiveID()) return t.push(Resources.Contexts.Table),
      t.push(Resources.Contexts.Text),
      (e = Business.GetSelectionBusinessManager()) &&
      t.push(Resources.Contexts.Automation),
      t;
    var r,
      i = this.GetTargetSelect();
    if (
      0 === i &&
      (i = - 1),
      - 1 != i &&
      (
        e = Business.GetSelectionBusinessManager(),
        r = GlobalData.objectStore.GetObject(i)
      )
    ) {
      var n = r.Data;
      if (
        e &&
        !GlobalData.optManager.Comment_IsTarget(i) &&
        t.push(Resources.Contexts.Automation),
        n.AllowTextEdit()
      ) return t.length ? (t.push(Resources.Contexts.Text), t) : Resources.Contexts.Text
    }
    return Resources.Contexts.None
  }


  Comment_IsTarget(e) {
    if (e >= 0) {
      var t = Resources.Controls.Dropdowns.CommentPopup.GetControl(!1);
      if (t && 'block' === t[0].style.display) return !0
    }
    return !1
  }

  HandleKeyDown(e, t, a) {
    var r = this.svgDoc.GetActiveEdit();
    if (r && r.IsActive()) {
      if (!this.bInNoteEdit) {
        var i = this.GetObjectPtr(this.theTEDSessionBlockID, !1);
        if (- 1 != i.theActiveTextEditObjectID) switch (t) {
          case ConstantData2.Keys.Left_Arrow:
          case ConstantData2.Keys.Right_Arrow:
          case ConstantData2.Keys.Up_Arrow:
          case ConstantData2.Keys.Down_Arrow:
            i.theTELastOp != ConstantData.TELastOp.INIT &&
              this.RegisterLastTEOp(ConstantData.TELastOp.SELECT);
            break;
          case ConstantData2.Keys.Backspace:
          case ConstantData2.Keys.Delete:
            this.RegisterLastTEOp(ConstantData.TELastOp.CHAR)
        }
      }
      if (r.HandleKeyDownEvent(e)) return !0
    } else if (32 == t) {
      var n = this.GetTargetSelect();
      if (- 1 != n) {
        var o = this.GetObjectPtr(n, !1);
        if (o && o.AllowTextEdit()) {
          var s = this.svgObjectLayer.GetElementByID(n);
          this.ActivateTextEdit(s);
          var l = (r = this.svgDoc.GetActiveEdit()).GetText().length;
          return r.SetSelectedRange(l, l),
            this.RegisterLastTEOp(ConstantData.TELastOp.CHAR),
            r.HandleKeyDownEvent(e),
            !0
        }
      }
    }
    return !1
  }

  HandleKeyPress(e, t) {
    var a = this.svgDoc.GetActiveEdit();
    if (a && a.IsActive()) {
      if (!this.bInNoteEdit) - 1 != this.GetObjectPtr(this.theTEDSessionBlockID, !1).theActiveTextEditObjectID &&
        this.RegisterLastTEOp(ConstantData.TELastOp.CHAR);
      if (a.HandleKeyPressEvent(e)) return e.preventDefault(),
        !0
    } else {
      var r = this.GetTargetSelect();
      if (- 1 != r) {
        var i = this.GetObjectPtr(r, !1);
        if (i && i.AllowTextEdit()) {
          var n = this.svgObjectLayer.GetElementByID(r);
          if (this.ActivateTextEdit(n), a = this.svgDoc.GetActiveEdit()) {
            var o = a.GetText().length;
            return a.SetSelectedRange(0, o),
              this.RegisterLastTEOp(ConstantData.TELastOp.CHAR),
              a.HandleKeyPressEvent(e),
              !0
          }
        }
      }
    }
    return !1
  }


  GeneratePreviewPNG(e, t, a, r) {
    //debugger
    t = t ||
      2400,
      a = a ||
      2400;
    const i = r &&
      r.format ||
      Resources.SDJSExportType.PNG;
    if (
      i == Resources.SDJSExportType.PNG ||
      i == Resources.SDJSExportType.JPEG
    ) {
      this.GenerateEncapsulatedSVG(
        (
          function (n, o) {
            if (n && o) {
              // var s = SDGraphics.Element.Style.ExtractSVGSize(n),
              var s = Style.ExtractSVGSize(n),
                l = Math.min(1, t / s.width, a / s.height);
              s.width = Math.round(s.width * l),
                s.height = Math.round(s.height * l);
              var S = new Image;
              S.onload = function () {
                var t = document.createElement('canvas');
                t.width = s.width,
                  t.height = s.height;
                var a = t.getContext('2d');
                (i == Resources.SDJSExportType.JPEG || r && r.fillBackground) &&
                  (a.fillStyle = '#fff', a.fillRect(0, 0, s.width, s.height)),
                  a.drawImage(S, 0, 0, s.width, s.height);
                var n = i == Resources.SDJSExportType.JPEG ? 'image/jpeg' : 'image/png';
                t.toBlob((function (t) {
                  e(t)
                }), n, 0.8)
              },
                S.src = 'data:image/svg+xml,' + encodeURIComponent(n)
            } else e(null)
          }
        ),
        !1,
        !1,
        !0,
        0,
        r &&
        r.zList ||
        null
      )
    } else e(null)
  }

  GenerateEncapsulatedSVG(e, t, a, r, i, n) {
    var o = null,
      s = {
        externImagePrep: !0
      };
    if (
      t &&
      (s.exportLinks = !0),
      a &&
      (s.exportTT = !0),
      r &&
      (s.inlineExternalImages = !0),
      n &&
      (s.zList = n),
      void 0 !== i &&
      'number' == typeof i ||
      (i = 12),
      o = this.ExportSVGXML(!0, i, !1, !t, !1, s),
      !e
    ) return o;
    if (s.externImageList && s.externImageList.length) {
      var l,
        S = function (e, t) {
          o = o.replace(e, t)
        },
        c = function (e) {
          var t,
            a = e,
            i = !1;
          0 === a.toLowerCase().indexOf(Constants.FilePath_CMSRoot.toLowerCase()) &&
            (a = a.slice(Constants.FilePath_CMSRoot.length), i = !0);
          var n = !1,
            o = FileParser.GetImageBlobType(ConstantData2.ImageDir.dir_svg);
          a.toLowerCase().indexOf('.png') > 0 ? (
            o = FileParser.GetImageBlobType(ConstantData2.ImageDir.dir_png),
            n = !0
          ) : a.toLowerCase().indexOf('.jpg') > 0 &&
          (
            o = FileParser.GetImageBlobType(ConstantData2.ImageDir.dir_jpg),
            n = !0
          );
          var l = function (l) {
            if (l) {
              if (s.inlineExternalImages && !n) {
                var c = new Uint8Array(l),
                  u = !1;
                l.byteLength >= 3 &&
                  255 === c[0] &&
                  216 === c[1] &&
                  255 === c[2] &&
                  (
                    o = FileParser.GetImageBlobType(ConstantData2.ImageDir.dir_jpg),
                    u = !0
                  ),
                  !u &&
                  l.byteLength >= 8 &&
                  137 === c[0] &&
                  80 === c[1] &&
                  78 === c[2] &&
                  71 === c[3] &&
                  13 === c[4] &&
                  10 === c[5] &&
                  26 === c[6] &&
                  10 === c[7] &&
                  (
                    o = FileParser.GetImageBlobType(ConstantData2.ImageDir.dir_png),
                    u = !0
                  ),
                  u ||
                  (
                    o = FileParser.GetImageBlobType(ConstantData2.ImageDir.dir_svg)
                  )
              }
              if (
                t = 'data:' + o + ';base64,' + Utils2.ArrayBufferToBase64(l),
                !i &&
                r
              ) {
                var p = SDJS_StrReplaceAll('&', '&amp;', a);
                S(p, t)
              } else S(e, t)
            }
            !function (e) {
              var t;
              for (t = 0; t < s.externImageList.length; t++) if (s.externImageList[t].url == e) {
                s.externImageList.splice(t, 1);
                break
              }
            }(e)
          };
          if (i) SDUI.CMSContent.GetResourceByRelativePath(SDUI.AppSettings.ContentSource, a, l);
          else {
            var c = new XMLHttpRequest,
              u = null;
            c.open('GET', a, !0),
              c.responseType = 'arraybuffer',
              c.onload = function (e) {
                200 === c.status ? (u = this.response, l(u)) : l(null)
              },
              c.onerror = function (e) {
                l(null)
              },
              c.send()
          }
        };
      for (l = 0; l < s.externImageList.length; l++) c(s.externImageList[l].url);
      var u = 0,
        p = function () {
          s.externImageList.length ? u < 100 ? setTimeout(p, 100) : e(o, !1) : e(o, !0),
            u++
        };
      return setTimeout(p, 100),
        o
    }
    e(o, !0)
  }


  ExportSVGXML(e, t, a, r, i, n) {

  }



  GetBlobImages(e, t) {
    var a,
      r,
      i,
      n,
      o,
      s = null,
      l = null,
      S = e.length;
    for (n = 0; n < S; ++n) if (
      (s = this.GetObjectPtr(e[n], !1)).ShapeType == ConstantData.ShapeType.GROUPSYMBOL
    ) s.ShapesInGroup &&
      s.ShapesInGroup.length &&
      this.GetBlobImages(s.ShapesInGroup, t);
    else {
      if (r = s.GetTable(!1)) for (o = 0; o < r.cells.length; o++) (a = (i = r.cells[o]).ImageURL) &&
        (l = this.Table_CellGetBlobBytes(i)) &&
        (t[a] || (t[a] = l));
      a = '',
        s.ImageURL ? a = s.ImageURL : s.SymbolURL &&
          (a = s.SymbolURL),
        a &&
        (l = s.GetBlobBytes()) &&
        (t[a] || (t[a] = l))
    }
  }

  GetSRect(e, t, a) {
    var r,
      i,
      n,
      o,
      s,
      l,
      S = ConstantData.ObjFlags.SEDO_NotVisible,
      c = ConstantData.TextFlags.SED_TF_TitleBlock;
    for (
      i = (r = null != a ? a : GlobalData.optManager.VisibleZList()).length,
      n = 0;
      n < i;
      n++
    ) {
      var u = GlobalData.optManager.GetObjectPtr(r[n], !1);
      null != u &&
        (
          l = !1,
          e &&
          u.TextFlags & c &&
          (l = !0),
          u &&
          0 == (u.flags & S) &&
          !l &&
          (
            s = $.extend(!0, {
            }, u.r),
            void 0 === o ? (
              o = s,
              t &&
              (
                t.x = u.Frame.x,
                t.y = u.Frame.y,
                t.width = u.Frame.width,
                t.height = u.Frame.height
              )
            ) : Utils2.UnionRect(s, o, o)
          )
        )
    }
    return o
  }



  RemoveAllActionArrows() {
    for (var e = this.VisibleZList(), t = 0; t < e.length; t++) this.RemoveActionArrows(e[t], !0)
  }


  GetAutomationContext(e) {
    var t = GlobalData.optManager.GetObjectPtr(this.theSEDSessionBlockID, !1),
      a = Resources.Contexts.Automation;
    return e &&
      (a = e.GetAutomationContext()),
      a === Resources.Contexts.Automation ? t.moreflags & ConstantData.SessionMoreFlags.SEDSM_NoCtrlArrow ? Resources.Contexts.AutomationNoCtrl : Resources.Contexts.Automation : a
  }


  DuplicateObjects(e, t) {
    debugger
    var a = {
      selectedList: [],
    };
    if (
      (Collab.BeginSecondaryEdit(),
        this.CloseEdit(),
        this.AreSelectedObjects())
    ) {
      var r = GlobalData.optManager.GetObjectPtr(
        GlobalData.optManager.theSEDSessionBlockID,
        !1 === this.LastOpDuplicate && !t
      );
      e
        ? ((r.dupdisp.x = 0), (r.dupdisp.y = 0))
        : t
          ? ((r.dupdisp.x = t.Data.dupdisp.x), (r.dupdisp.y = t.Data.dupdisp.y))
          : this.LastOpDuplicate || ((r.dupdisp.x = 50), (r.dupdisp.y = 50));
      var i = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1);
      if (!t && Collab.AllowMessage()) {
        var n = {
          fromMove: e,
        };
        (n.dupdisp = Utils1.DeepCopy(r.dupdisp)),
          (n.selectedList = Utils1.DeepCopy(i)),
          (n.tselect = Utils1.DeepCopy(r.tselect));
      }
      var o = this.CopyObjectsCommon(!0);
      if (o && o.buffer) {
        var s = this.GetObjectPtr(o.zList[0], !1).Frame;
        SDF.ReadSymbolFromBuffer(
          o.buffer,
          s.x + r.dupdisp.x,
          s.y + r.dupdisp.y,
          0,
          !1,
          !0,
          a,
          !e,
          !1,
          !1,
          !1,
          !1
        ),
          e ||
          (this.CompleteOperation(a.selectedList),
            t || (this.LastOpDuplicate = !0));
      }
      return (
        !t &&
        Collab.AllowMessage() &&
        (Collab.IsSecondary() && (n.CreateList = Utils1.DeepCopy(i)),
          Collab.AddNewBlockToSecondary(i),
          Collab.BuildMessage(
            ConstantData.CollabMessages.Duplicate,
            n,
            !1
          )),
        a.selectedList
      );
    }
  }


  RestorePrimaryStateManager() {
    GlobalData.bIsPrimaryStateManager ||
      (
        this.RestorePrimaryStateManagerLMMethods(),
        SDJS_select_primary_state_manager(),
        GlobalData.optManager.RenderAllSVGObjects()
      )
  }


  GetDocDirtyState() {
    return GlobalData.optManager.theContentHeader.DocIsDirty
  }


  SetDocDirtyState(e, t) {
    GlobalData.optManager.theContentHeader.DocIsDirty = e,
      e ? GlobalData.optManager.theContentHeader.AllowReplace = !1 : !0 === t &&
        (GlobalData.optManager.theContentHeader.AllowReplace = !0)
    // ,
    // null != SDUI.Initializer &&
    // SDUI.Initializer.GetAppCloseFunction()
  }

  RebuildURLs(e, t) {
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
      p;
    if (t) for (a = GlobalData.stateManager.States[e + 1].StoredObjects.length, r = 0; r < a; r++) (i = GlobalData.stateManager.States[e + 1].StoredObjects[r]).Type === ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT ? i.StateOperationTypeID === Globals.StateOperationType.CREATE &&
      (
        o = i.Data,
        this.IsBlobURL(o.ImageURL) &&
        (n = GlobalData.objectStore.GetObject(i.ID)) &&
        (
          s = (o = n.Data).GetBlobBytes(),
          l = FileParser.GetImageBlobType(s.ImageDir),
          o.ImageURL = GlobalData.optManager.MakeURL(null, s.Bytes, l)
        )
      ) : i.Type === ConstantData.StoredObjectType.TABLE_OBJECT &&
      i.StateOperationTypeID === Globals.StateOperationType.CREATE &&
      (c = GlobalData.objectStore.GetObject(i.ID)) &&
    (u = c.Data, this.Table_RebuildURLs(u));
    for (a = GlobalData.stateManager.States[e].StoredObjects.length, r = 0; r < a; r++) (i = GlobalData.stateManager.States[e].StoredObjects[r]).Type === ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT ? i.StateOperationTypeID === Globals.StateOperationType.DELETE ? t ||
      (n = GlobalData.objectStore.GetObject(i.ID)) &&
      (o = n.Data).BlobBytesID >= 0 &&
      this.IsBlobURL(o.ImageURL) &&
      (
        s = o.GetBlobBytes(),
        l = FileParser.GetImageBlobType(s.ImageDir),
        o.ImageURL = GlobalData.optManager.MakeURL(null, s.Bytes, l)
      ) : (
      S = i.Data,
      n = GlobalData.objectStore.GetObject(i.ID),
      this.IsBlobURL(S.ImageURL) ? n ? (
        o = n.Data,
        S.ImageURL !== o.ImageURL &&
        (
          this.DeleteURL(S.ImageURL),
          this.IsBlobURL(o.ImageURL) &&
          (s = o.GetBlobBytes()) &&
          (
            l = FileParser.GetImageBlobType(s.ImageDir),
            this.IsBlobURL(o.ImageURL) &&
            (o.ImageURL = GlobalData.optManager.MakeURL(null, s.Bytes, l))
          )
        )
      ) : this.DeleteURL(S.ImageURL) : n &&
      (
        o = n.Data,
        this.IsBlobURL(o.ImageURL) &&
        (s = o.GetBlobBytes()) &&
        (
          l = FileParser.GetImageBlobType(s.ImageDir),
          this.IsBlobURL(o.ImageURL) &&
          (o.ImageURL = GlobalData.optManager.MakeURL(null, s.Bytes, l))
        )
      )
    ) : i.Type === ConstantData.StoredObjectType.TABLE_OBJECT &&
    (
      i.StateOperationTypeID === Globals.StateOperationType.DELETE ? t ||
        (c = GlobalData.objectStore.GetObject(i.ID)) &&
        (u = c.Data, GlobalData.optManager.Table_RebuildURLs(u)) : (
        p = i.Data,
        (c = GlobalData.objectStore.GetObject(i.ID)) ? (u = c.Data, this.Table_RefreshURLs(p, u, !1)) : this.Table_DeleteURLs(p)
      )
    )
  }



  Export_ExceptionCleanup(e) {
    throw e;
    // SDJS.SocketClient.close(),
    //   '1' === e.name ? Utils2.Alert(e.message) : Utils2.Alert(e.stack)
  }

  Table_UpdateSelectionAttributes(e, t) {

    // Double ===

    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S = this.GetObjectPtr(e, !1),
      c = !1,
      u = ConstantData.Table_CellFlags.SDT_F_Select,
      p = ConstantData.Table_CellFlags.SDT_F_NoText,
      d = ConstantData.TextFace,
      D = ConstantData.Table.CellTypes;
    if (
      S &&
      (r = S.GetTable(!1)),
      r &&
      r.select >= 0 &&
      r.select >= r.cells.length &&
      (r.select = - 1),
      r &&
      r.select >= 0
    ) {
      switch (
      a = r.cells[r.select],
      o = r.select,
      l = a,
      this.SelectionState.lockedTableSelected = (r.flags & ListManager.Table.TableFlags.SDT_TF_LOCK) > 0,
      SDUI.AppSettings.Application !== Resources.Application.Builder &&
      S.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER &&
      (this.SelectionState.lockedTableSelected = !0),
      this.SelectionState.ncells_selected = 1,
      this.SelectionState.cell_notext = (a.flags & p) > 0,
      this.SelectionState.celltype = a.celltype,
      this.SelectionState.cellflags = a.flags,
      this.SelectionState.cellselected = !0,
      S.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASK ||
        S.subtype === ConstantData.ObjectSubTypes.SD_SUBT_TASKMAP ? this.SelectionState.datasetElemID = S.datasetElemID : this.SelectionState.datasetElemID = a.datarecordID,
      (s = this.GetClipboardType()) === ConstantData.ClipboardType.LM &&
      (s = ConstantData.ClipboardType.None),
      this.SelectionState.paste = s,
      GlobalData.optManager.Table_HideUI(S) &&
      (
        this.SelectionState.IsTargetTable = !1,
        this.SelectionState.ntablesselected = 0,
        this.SelectionState.NTableRows = GlobalDatagOptions.newTableRows,
        this.SelectionState.NTableCols = GlobalDatagOptions.newTableCols,
        this.SelectionState.ncells_selected = 0,
        c = !0
      ),
      l.celltype
      ) {
        case D.SDT_CT_MONTH_WITH_DAYS:
        case D.SDT_CT_WEEK_WITH_DAYS:
        case D.SDT_CT_QTR_WITH_MONTHS:
        case D.SDT_CT_YR_WITH_MONTHS:
        case D.SDT_CT_DAY_WITH_HOURS:
        case D.SDT_CT_MONTHLY_CALENDAR_NAME:
        case D.SDT_CT_YEARLY_CALENDAR_NAME:
        case D.SDT_CT_PREFIX_COUNT:
        case D.SDT_CT_SUBCOLHEADER:
        case D.SDT_CT_ROWREPEATER:
        case D.SDT_CT_GANTT_DATEBLOCK_TITLE:
          this.SelectionState.IsTargetTable = !1,
            this.SelectionState.ntablesselected = 0,
            this.SelectionState.NTableRows = GlobalDatagOptions.newTableRows,
            this.SelectionState.NTableCols = GlobalDatagOptions.newTableCols,
            this.SelectionState.ncells_selected = 0,
            c = !0
      }
      if (t) return;
      for (
        this.SelectionState.fontid = a.Text.FontId,
        this.SelectionState.fontsize = a.Text.FontSize,
        this.SelectionState.bold = (a.Text.Face & d.Bold) > 0,
        this.SelectionState.italic = (a.Text.Face & d.Italic) > 0,
        this.SelectionState.underline = (a.Text.Face & d.Underline) > 0,
        this.SelectionState.superscript = (a.Text.Face & d.Superscript) > 0,
        this.SelectionState.subscript = (a.Text.Face & d.Subscript) > 0,
        this.SelectionState.cell_notext = (a.flags & p) > 0,
        this.SelectionState.celltype = a.celltype,
        this.SelectionState.cellselected = !0,
        this.SelectionState.cellflags = a.flags,
        a.DataID >= 0 &&
        (
          this.SelectionState.selectionhastext = !0,
          this.SelectionState.allowcopy = !0
        ),
        i = r.cells.length,
        n = 0;
        n < i;
        n++
      ) n !== o &&
        (
          (a = r.cells[n]).DataID >= 0 &&
          (
            this.SelectionState.selectionhastext = !0,
            this.SelectionState.allowcopy = !0
          ),
          a.flags & u &&
          (
            this.SelectionState.fontid !== a.Text.FontId &&
            (this.SelectionState.fontid = - 1),
            this.SelectionState.fontsize !== a.Text.FontSize &&
            (this.SelectionState.fontsize = - 1),
            this.SelectionState.bold !== (a.Text.Face & d.Bold) > 0 &&
            (this.SelectionState.bold = !1),
            this.SelectionState.italic !== (a.Text.Face & d.Italic) > 0 &&
            (this.SelectionState.italic = !1),
            this.SelectionState.underline !== (a.Text.Face & d.Underline) > 0 &&
            (this.SelectionState.underline = !1),
            this.SelectionState.superscript !== (a.Text.Face & d.Superscript) > 0 &&
            (this.SelectionState.superscript = !1),
            this.SelectionState.subscript !== (a.Text.Face & d.Subscript) > 0 &&
            (this.SelectionState.subscript = !1),
            this.SelectionState.cell_notext !== (a.flags & p) > 0 &&
            (this.SelectionState.cell_notext = !1),
            this.SelectionState.celltype !== a.celltype &&
            (this.SelectionState.celltype = 0),
            this.SelectionState.cellflags !== a.cellflags &&
            (this.SelectionState.cellflags = 0),
            c ||
            this.SelectionState.ncells_selected++
          )
        )
    }
  }


  ResetActiveTextEditAfterUndo(e) {
    var t = this.GetObjectPtr(this.theTEDSessionBlockID, !1);
    if (- 1 != t.theActiveTextEditObjectID) {
      var a = this.GetObjectPtr(t.theActiveTextEditObjectID, !1);
      if (!a) return;
      var r = a.DataID;
      if (- 1 != r) {
        var i = this.GetObjectPtr(r, !1);
        if (i) {
          var n,
            o = i.runtimeText,
            s = i.selrange;
          e &&
            (o = e),
            null == e &&
            (
              this.AddToDirtyList(t.theActiveTextEditObjectID),
              this.RenderDirtySVGObjects()
            );
          var l = this.svgObjectLayer.GetElementByID(t.theActiveTextEditObjectID);
          l &&
            l.textElem &&
            this.TERegisterEvents(l.textElem),
            (n = this.svgDoc.GetActiveEdit()) &&
            (
              n.SetRuntimeText(o),
              n.SetSelectedRange(s.start, s.end, s.line, s.anchor)
            ),
            '' === o.text &&
            this.InitEmptyText(a, l)
        }
      }
      t.TELastOp = ConstantData.TELastOp.INIT,
        this.ShowSVGSelectionState(t.theActiveTextEditObjectID, !1)
    }
  }




  InitEmptyText(e, t) {
    var a = {},
      r = e.GetTextDefault(a),
      i = this.CalcDefaultInitialTextStyle(r),
      n = a.vjust;
    t.textElem.SetText(' '),
      t.textElem.SetFormat(i),
      t.textElem.SetParagraphStyle(a),
      //e instanceof ListManager.BaseShape &&
      // e instanceof GlobalDataShape.BaseShape &&
      e instanceof Instance.Shape.BaseShape &&
      t.textElem.SetVerticalAlignment(n),
      t.textElem.SetText('')
  }


  TextResizeCommon(e, t, a, r, i) {
    var n = this.GetObjectPtr(this.theTEDSessionBlockID, !1),
      o = this.GetObjectPtr(e, !1);
    // if (o instanceof ListManager.BaseShape) {
    // if (o instanceof GlobalDataShape.BaseShape) {
    if (o instanceof Instance.Shape.BaseShape) {
      if (r) var s = r;
      else s = this.svgObjectLayer.GetElementByID(e);
      if (s) {
        var l = s.textElem;
        if (null != l) {
          var S,
            c,
            u,
            p = null,
            d = - 1,
            D = !1,
            g = (u = o.GetTextParams(!0)).trect,
            h = o.sizedim.width,
            m = o.sizedim.height,
            C = u.tsizedim.width,
            y = u.tsizedim.height,
            f = l.GetTextMinDimensions(),
            L = f.width;
          L < C &&
            (L = C);
          var I = f.height;
          I < y &&
            (I = y);
          var T = new Rectangle(g.x, g.y, L, I);
          if (
            o.TextFlags & ConstantData.TextFlags.SED_TF_AttachA ||
            o.TextFlags & ConstantData.TextFlags.SED_TF_AttachB
          ) {
            if (o.TextFlags & ConstantData.TextFlags.SED_TF_AttachA) {
              switch (o.TextAlign) {
                case ConstantData.TextAlign.TOPLEFT:
                case ConstantData.TextAlign.LEFT:
                case ConstantData.TextAlign.BOTTOMLEFT:
                  l.SetPos(0, - f.height - o.TMargins.top);
                  break;
                case ConstantData.TextAlign.TOPRIGHT:
                case ConstantData.TextAlign.RIGHT:
                case ConstantData.TextAlign.BOTTOMRIGHT:
                  l.SetPos(o.Frame.width - f.width, - f.height - o.TMargins.top);
                  break;
                default:
                  l.SetPos(o.Frame.width / 2 - f.width / 2, - f.height - o.TMargins.top)
              }
              GlobalData.optManager.SetShapeR(o)
            } else if (o.TextFlags & ConstantData.TextFlags.SED_TF_AttachB) {
              switch (o.TextAlign) {
                case ConstantData.TextAlign.TOPLEFT:
                case ConstantData.TextAlign.LEFT:
                case ConstantData.TextAlign.BOTTOMLEFT:
                  l.SetPos(0, o.Frame.height);
                  break;
                case ConstantData.TextAlign.TOPRIGHT:
                case ConstantData.TextAlign.RIGHT:
                case ConstantData.TextAlign.BOTTOMRIGHT:
                  l.SetPos(o.Frame.width - f.width, o.Frame.height);
                  break;
                default:
                  l.SetPos(o.Frame.width / 2 - f.width / 2, o.Frame.height)
              }
              GlobalData.optManager.SetShapeR(o)
            }
          } else {
            var b,
              M,
              P,
              R,
              A = o.GetTable(!1),
              _ = o.GetGraph(!1),
              E = 1 == o.bInGroup;
            E &&
              (a = !0);
            var w = $.extend(!0, {
            }, o.Frame);
            switch (o.TextGrow) {
              case ConstantData.TextGrowBehavior.HORIZONTAL:
                if (
                  !Utils2.IsEqual(L, g.width) ||
                  !Utils2.IsEqual(I, g.height)
                ) {
                  switch (
                  p = $.extend(!0, {
                  }, o.Frame),
                  g = $.extend(!0, {
                  }, o.trect),
                  A &&
                    A.select >= 0 ? (
                    A = o.GetTable(!1),
                    P = this.Table_TextGrow(o, A, A.select, o.TextGrow, f, null),
                    g.width = P.x,
                    g.height = P.y,
                    o.TRectToFrame(g, !1),
                    S = o.Frame.width - p.width,
                    Utils2.IsEqual(S, 0) &&
                    (S = 0),
                    M = o.Frame.height - p.height,
                    Utils2.IsEqual(M, 0) &&
                    (M = 0),
                    D = !0
                  ) : (
                    o.TRectToFrame(T, !1),
                    S = o.Frame.width - p.width,
                    Utils2.IsEqual(S, 0) &&
                    (S = 0),
                    M = o.Frame.height - p.height,
                    Utils2.IsEqual(M, 0) &&
                    (M = 0),
                    D = !1
                  ),
                  o.TextAlign
                  ) {
                    case ConstantData.TextAlign.TOPLEFT:
                    case ConstantData.TextAlign.LEFT:
                    case ConstantData.TextAlign.BOTTOMLEFT:
                      S &&
                        (p.width += S);
                      break;
                    case ConstantData.TextAlign.TOPCENTER:
                    case ConstantData.TextAlign.CENTER:
                    case ConstantData.TextAlign.BOTTOMCENTER:
                      S &&
                        (
                          b = p.x + p.width / 2,
                          p.width += S,
                          b -= p.width / 2,
                          E &&
                          0 === o.RotationAngle ||
                          (p.x = b)
                        );
                      break;
                    case ConstantData.TextAlign.TOPRIGHT:
                    case ConstantData.TextAlign.RIGHT:
                    case ConstantData.TextAlign.BOTTOMRIGHT:
                      S &&
                        (p.width += S, E && 0 === o.RotationAngle || (p.x -= S))
                  }
                  switch (o.TextAlign) {
                    case ConstantData.TextAlign.TOPLEFT:
                    case ConstantData.TextAlign.TOPCENTER:
                    case ConstantData.TextAlign.TOPRIGHT:
                    case ConstantData.TextAlign.LEFT:
                    case ConstantData.TextAlign.CENTER:
                    case ConstantData.TextAlign.RIGHT:
                    case ConstantData.TextAlign.BOTTOMLEFT:
                    case ConstantData.TextAlign.BOTTOMCENTER:
                    case ConstantData.TextAlign.BOTTOMRIGHT:
                  }
                  if (
                    M &&
                    (p.height += M),
                    a ||
                    this.TextPinFrame(p, y),
                    !1 === D &&
                    (
                      p.width < h &&
                      (p.x = o.Frame.x + o.Frame.width / 2 - h / 2, p.width = h),
                      p.height < m &&
                      (p.y = o.Frame.y + o.Frame.height / 2 - m / 2, p.height = m)
                    ),
                    (S || M) &&
                    (o.UpdateFrame(p), n.theTEWasResized = !0),
                    l &&
                    (
                      g = (u = o.GetTextParams(!1)).trect,
                      R = o.GetSVGFrame(p),
                      l.SetPos(g.x - R.x, g.y - R.y),
                      l.SetConstraints(GlobalData.optManager.theContentHeader.MaxWorkDim.x, g.width, g.height)
                    ),
                    o.ResizeInTextEdit(s, p),
                    this.TextResizeNeedPageResize(o, p.x + p.width, p.y + p.height),
                    E &&
                    0 !== o.RotationAngle
                  ) {
                    var F = {
                      x: w.x + w.width / 2,
                      y: w.y + w.height / 2
                    },
                      v = GlobalData.optManager.RotateRect(w, F, o.RotationAngle),
                      G = (
                        F = {
                          x: p.x + p.width / 2,
                          y: p.y + p.height / 2
                        },
                        GlobalData.optManager.RotateRect(p, F, o.RotationAngle)
                      );
                    S = v.x - G.x,
                      M = v.y - G.y,
                      o.OffsetShape(S, M)
                  }
                  i ||
                    this.Resize_SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE)
                }
                break;
              case ConstantData.TextGrowBehavior.VERTICAL:
                if (_ && _.selectedText >= 0) {
                  var N = this.GraphTextHitInfo(_, _.selectedText);
                  if (N) {
                    switch (l.svgObj.SDGObj.SetParagraphAlignment(N.just), N.vJust) {
                      case ConstantData2.TextJust.TA_TOP:
                        l.vAlign = 'top';
                        break;
                      case ConstantData2.TextJust.TA_BOTTOM:
                        l.vAlign = 'bottom';
                        break;
                      case ConstantData2.TextJust.TA_CENTER:
                        l.vAlign = 'middle'
                    }
                    l.SetConstraints(N.maxDim.cx, N.maxDim.cx, N.maxDim.cy)
                  }
                  break
                }
                if (
                  !Utils2.IsEqual(L, g.width) ||
                  !Utils2.IsEqual(I, g.height)
                ) {
                  if (p = $.extend(!0, {
                  }, o.Frame), A && A.select >= 0) {
                    if (
                      g = $.extend(!0, {
                      }, o.trect),
                      A = o.GetTable(!1),
                      P = this.Table_TextGrow(o, A, A.select, o.TextGrow, f, null),
                      g.width = P.x,
                      g.height = P.y,
                      o.TRectToFrame(g, !1),
                      S = o.Frame.width - p.width,
                      M = o.Frame.height - p.height,
                      Utils2.IsEqual(S, 0) &&
                      (S = 0),
                      Utils2.IsEqual(M, 0) &&
                      (M = 0),
                      D = !0,
                      M
                    ) {
                      switch (o.TextAlign) {
                        case ConstantData.TextAlign.TOPLEFT:
                        case ConstantData.TextAlign.TOPCENTER:
                        case ConstantData.TextAlign.TOPRIGHT:
                        case ConstantData.TextAlign.LEFT:
                        case ConstantData.TextAlign.CENTER:
                        case ConstantData.TextAlign.RIGHT:
                        case ConstantData.TextAlign.BOTTOMLEFT:
                        case ConstantData.TextAlign.BOTTOMCENTER:
                        case ConstantData.TextAlign.BOTTOMRIGHT:
                          p.height += M
                      }
                      o.objecttype === ConstantData.ObjectTypes.SD_OBJT_ANNOTATION &&
                        (p.y -= M)
                    }
                  } else {
                    if (_ && _.selectedText >= 0) {
                      l.SetConstraints(GlobalData.optManager.theContentHeader.MaxWorkDim.x, g.width, g.height);
                      break
                    }
                    D = !1,
                      o.TRectToFrame(T, !1);
                    var k = (g.y, p.y);
                    k = o.Frame.height,
                      M = 1,
                      c = p.y + p.height / 2,
                      E &&
                      0 === o.RotationAngle ||
                      (p.y = c - k / 2),
                      p.height = k,
                      t &&
                      (p.width = o.Frame.width),
                      S = o.Frame.width - p.width,
                      Utils2.IsEqual(S, 0) &&
                      (S = 0),
                      S > 0 &&
                      (p.width += S)
                  }
                  if (
                    !1 === D &&
                    (
                      p.width < h &&
                      (p.x = o.Frame.x, p.width = h),
                      p.height < m &&
                      (p.y = o.Frame.y, p.height = m)
                    ),
                    a ||
                    this.TextPinFrame(p, y),
                    (S || M) &&
                    (o.UpdateFrame(p), n.theTEWasResized = !0),
                    l &&
                    (
                      g = (u = o.GetTextParams(!1)).trect,
                      R = o.GetSVGFrame(p),
                      l.SetPos(g.x - R.x, g.y - R.y),
                      E &&
                      l.SetSize(g.width, g.height)
                    ),
                    o.ResizeInTextEdit(s, p),
                    this.TextResizeNeedPageResize(o, p.x + p.width, p.y + p.height),
                    E &&
                    0 !== o.RotationAngle
                  ) {
                    F = {
                      x: w.x + w.width / 2,
                      y: w.y + w.height / 2
                    },
                      v = GlobalData.optManager.RotateRect(w, F, o.RotationAngle),
                      F = {
                        x: p.x + p.width / 2,
                        y: p.y + p.height / 2
                      },
                      G = GlobalData.optManager.RotateRect(p, F, o.RotationAngle);
                    S = v.x - G.x,
                      M = v.y - G.y,
                      o.OffsetShape(S, M)
                  }
                  i ||
                    this.Resize_SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE)
                }
                break;
              case ConstantData.TextGrowBehavior.PROPORTIONAL:
                if (!Utils2.IsEqual(I, g.height)) {
                  I < g.height &&
                    o.Frame.height > m &&
                    !0,
                    A &&
                    (d = A.select);
                  var U = GlobalData.optManager.FitProp(o, l, I - g.height, d);
                  if (
                    f = l.GetTextMinDimensions(),
                    g = $.extend(!0, {
                    }, o.trect),
                    p = $.extend(!0, {
                    }, o.Frame),
                    A &&
                    A.select >= 0
                  ) {
                    p.width = U.x,
                      p.height = U.y,
                      o.UpdateFrame(p);
                    var J = o.trect.width - g.width,
                      x = o.trect.height - g.height;
                    if (!J && !x) break;
                    var O = {
                      width: J,
                      height: x
                    };
                    A = o.GetTable(!1),
                      U = this.Table_TextGrow(o, A, A.select, o.TextGrow, f, O),
                      g.width = U.x,
                      g.height = U.y,
                      o.TRectToFrame(g, !1),
                      U.x = o.Frame.width,
                      U.y = o.Frame.height
                  }
                  var B = p.x + p.width / 2;
                  if (
                    E &&
                    0 === o.RotationAngle ||
                    (p.x = B - U.x / 2),
                    p.width = U.x,
                    c = p.y + p.height / 2,
                    E &&
                    0 === o.RotationAngle ||
                    (p.y = c - U.y / 2),
                    p.height = U.y,
                    a ||
                    this.TextPinFrame(p, y),
                    p.width < h &&
                    (p.x = o.Frame.x, p.width = h),
                    p.height < m &&
                    (p.y = o.Frame.y, p.height = m),
                    o.UpdateFrame(p),
                    n.theTEWasResized = !0,
                    l
                  ) {
                    var H = l.editCallback;
                    l.editCallback = null,
                      g = (u = o.GetTextParams(!1)).trect,
                      R = o.GetSVGFrame(p),
                      l.SetPos(g.x - R.x, g.y - R.y),
                      l.SetConstraints(g.width, g.width, g.height),
                      n.theActiveTextEditObjectID == e &&
                      l.editor.UpdateCursor(),
                      l.editCallback = H
                  }
                  if (
                    o.ResizeInTextEdit(s, p),
                    this.TextResizeNeedPageResize(o, p.x + p.width, p.y + p.height),
                    E &&
                    0 !== o.RotationAngle
                  ) {
                    F = {
                      x: w.x + w.width / 2,
                      y: w.y + w.height / 2
                    },
                      v = GlobalData.optManager.RotateRect(w, F, o.RotationAngle),
                      F = {
                        x: p.x + p.width / 2,
                        y: p.y + p.height / 2
                      },
                      G = GlobalData.optManager.RotateRect(p, F, o.RotationAngle);
                    S = v.x - G.x,
                      M = v.y - G.y,
                      o.OffsetShape(S, M)
                  }
                  i ||
                    this.Resize_SetLinkFlag(e, ConstantData.LinkFlags.SED_L_MOVE)
                }
            }
          }
        }
      }
    } else o.AdjustTextEditBackground(e, r)
  }



  Lines_MaintainDistWithinSegment(e, t, a, r) {
    var i = {},
      n = t.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null);
    Utils2.GetPolyRect(i, n);
    var o = Utils1.CalcAngleFromPoints(n[a - 1], n[a]),
      s = 360 - o,
      l = 2 * Math.PI * (s / 360);
    Utils3.RotatePointsAboutCenter(i, - l, n);
    var S = [
      r
    ];
    Utils3.RotatePointsAboutCenter(i, - l, S);
    var c = n[a].x - n[a - 1].x,
      u = (r.x - n[a - 1].x) / c,
      p = r.y - n[a - 1].y;
    Utils3.RotatePointsAboutCenter(i, l, S),
      n = e.GetPolyPoints(ConstantData.Defines.NPOLYPTS, !1, !0, !1, null),
      s = 360 - (o = Utils1.CalcAngleFromPoints(n[a - 1], n[a])),
      l = 2 * Math.PI * (s / 360),
      Utils2.GetPolyRect(i, n),
      Utils3.RotatePointsAboutCenter(i, - l, n),
      Utils3.RotatePointsAboutCenter(i, - l, S);
    var d = (c = n[a].x - n[a - 1].x) * u;
    S[0].x = n[a - 1].x + d,
      S[0].y = n[a - 1].y + p,
      Utils3.RotatePointsAboutCenter(e.Frame, l, S),
      r = S[0]
  }

  ArcToPoly(e, t, a, r, i, n, o, s) {
    var l,
      S,
      c,
      u = [];
    return i - r,
      s ? (
        r > i ? (c = t.y - a, S = t.y + a) : (S = t.y - a, c = t.y + a),
        l = n < t.x,
        o = !1,
        this.ArcToPolySeg(u, e / 2, t, a, r, S, n, o, !l),
        this.ArcToPolySeg(u, e, t, a, S, c, t.x, o, l),
        this.ArcToPolySeg(u, e / 2, t, a, c, i, n, o, !l)
      ) : (l = n >= t.x, this.ArcToPolySeg(u, e, t, a, r, i, n, o, l)),
      u
  }

  ArcToPolySeg(e, t, a, r, i, n, o, s, l) {
    var S,
      c,
      u,
      p,
      d,
      D,
      g,
      h = r * r;
    for (S = (n - i) / t, p = 0; p < t; p++) d = S * p,
      D = a.y - (i + d),
      c = Utils2.sqrt(h - D * D),
      (g = new Point(0, 0)).y = a.y - D,
      l ? (g.x = a.x + c, u = g.x - o, s && (g.x = o - u)) : (g.x = a.x - c, u = o - g.x, s && (g.x = o + u)),
      e.push(g);
    return e
  }





}

export default OptHandler















































