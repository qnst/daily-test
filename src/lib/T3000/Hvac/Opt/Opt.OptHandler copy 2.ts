

import HvTimer from "../Helper/T3Timer";
import QuickStyle from "../Model/QuickStyle";
import ListManager from '../Data/ListManager';
import ParagraphFormat from '../Model/ParagraphFormat';
import GlobalData from '../Data/T3Gv';
import Globals from "../Data/Globals";
import SDTextureList from "../Model/TextureList";
import SDF from '../Data/ShapeDataUtil';
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
import Commands from './Business/ToolOpt';
import Document from '../Basic/B.Document';
import Utils1 from "../Helper/Utils1";
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3"
import BaseLine from '../Shape/S.BaseLine';
import FileParser from "../Data/FileParser";
import '../Helper/T3Hammer'
import PolyLine from '../Shape/S.PolyLine';
import PolyLineContainer from '../Shape/S.PolyLineContainer';
import BaseDrawingObject from '../Shape/S.BaseDrawingObject';
import Business from './Business/OptAhUtil';
import GroupSymbol from '../Shape/S.GroupSymbol';
import Connector from '../Shape/S.Connector';
import FloorPlan from './Business/WallOpt'
import Point from '../Model/Point';
import ShapeContainer from '../Shape/S.ShapeContainer'
import SegmentedLine from '../Shape/S.SegmentedLine';
import BaseShape from '../Shape/S.BaseShape';
import SegmentData from '../Model/SegmentData'
import PolygonShapeGenerator from "./Business/PolygonUtil"
import DefaultStyle from "../Model/DefaultStyle"
import TextParams from "../Model/TextParams"
import Style from '../Basic/B.Element.Style'
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
  public svgDocId: string;
  public sendstate: number;
  public rubberBand: any;
  public rubberBandStartX: number;
  public rubberBandStartY: number;
  public rubberBandFrame: any;
  public dragBBoxList: any[];
  public dragElementList: any[];
  public dragEnclosingRect: any;
  public dragStartX: number;
  public dragStartY: number;
  public dragDeltaX: number;
  public dragDeltaY: number;
  public dragTargetId: any;
  public dragTargetBBox: any;
  public dragGotMove: boolean;
  public dragGotAutoResizeRight: boolean;
  public dragGotAutoResizeBottom: boolean;
  public dragGotAutoResizeOldX: any[];
  public dragGotAutoResizeOldY: any[];
  public nudgeDelta: number;
  public noUndo: boolean;
  public actionStoredObjectId: number;
  public actionSvgObject: any;
  public actionTriggerId: number;
  public actionTriggerData: number;
  public actionStartX: number;
  public actionStartY: number;
  public actionTableLastX: number;
  public actionTableLastY: number;
  public actionOldExtra: number;
  public actionBBox: any;
  public actionNewBBox: any;
  public actionLockAspectRatio: boolean;
  public actionAspectRatioWidth: number;
  public actionAspectRatioHeight: number;
  public useDefaultStyle: boolean;
  public newObjectVisible: boolean;
  public emptySymbolList: any[];
  public emptyEMFList: any[];
  public addCount: number;
  public lineStamp: boolean;
  public drawStartX: number;
  public drawStartY: number;
  public lineDrawStartX: number;
  public lineDrawStartY: number;
  public fromOverlayLayer: boolean;
  public lineDrawId: number;
  public lineDrawLineId: number;
  public Dynamic_Guides: any;
  public rotateKnobCenterDivisor: any;
  public rotateStartPoint: any;
  public rotateEndPoint: any;
  public rotateStartRotation: number;
  public rotateObjectRadians: number;
  public rotateEndRotation: number;
  public rotatePivotX: number;
  public rotatePivotY: number;
  public rotateSnap: number;
  public enhanceRotateSnap: number;
  public drawShape: any;
  public stampTimeout: any;
  public wasClickInShape: boolean;
  public autoScrollTimer: HvTimer;
  public autoScrollTimerId: number;
  public autoScrollXPos: number;
  public autoScrollYPos: number;
  public inAutoScroll: boolean;
  public textEntryTimer: any;
  public isGestureCapable: boolean;
  public touchInitiated: boolean;
  public mainAppElement: any;
  public mainAppHammer: any;
  public workAreaElement: any;
  public WorkAreaHammer: any;
  public workAreaTextInputProxy: any;
  public virtualKeyboardLifterElementFrame: any;
  public touchPanStarted: boolean;
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

  //#endregion

  Initialize() {

    if (this.bIsInitialized) {
      return;
    }

    this.svgDocId = '#svg-area';
    this.sendstate = 0;
    this.rubberBand = null;
    this.rubberBandStartX = 0;
    this.rubberBandStartY = 0;
    this.rubberBandFrame = { x: 0, y: 0, width: 0, height: 0 };
    this.dragBBoxList = [];
    this.dragElementList = [];
    this.dragEnclosingRect = null;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragDeltaX = 0;
    this.dragDeltaY = 0;
    this.dragTargetId = null;
    this.dragTargetBBox = {};
    this.dragGotMove = false;
    this.dragGotAutoResizeRight = false;
    this.dragGotAutoResizeBottom = false;
    this.dragGotAutoResizeOldX = [];
    this.dragGotAutoResizeOldY = [];
    this.nudgeDelta = 10;
    this.noUndo = false;
    this.actionStoredObjectId = -1;
    this.actionSvgObject = null;
    this.actionTriggerId = 0;
    this.actionTriggerData = 0;
    this.actionStartX = 0;
    this.actionStartY = 0;
    this.actionTableLastX = 0;
    this.actionTableLastY = 0;
    this.actionOldExtra = 0;
    this.actionBBox = {};
    this.actionNewBBox = {};
    this.actionLockAspectRatio = false;
    this.actionAspectRatioWidth = 0;
    this.actionAspectRatioHeight = 0;
    this.useDefaultStyle = false;
    this.newObjectVisible = false;
    this.emptySymbolList = [];
    this.emptyEMFList = [];
    this.addCount = 0;
    this.lineStamp = false;
    this.drawStartX = 0;
    this.drawStartY = 0;
    this.lineDrawStartX = 0;
    this.lineDrawStartY = 0;
    this.fromOverlayLayer = false;
    this.lineDrawId = -1;
    this.lineDrawLineId = -1;
    this.Dynamic_Guides = null;
    this.rotateKnobCenterDivisor = { x: 2, y: 2 };
    this.rotateStartPoint = {};
    this.rotateEndPoint = {};
    this.rotateStartRotation = 0;
    this.rotateObjectRadians = 0;
    this.rotateEndRotation = 0;
    this.rotatePivotX = 0;
    this.rotatePivotY = 0;
    this.rotateSnap = 5;
    this.enhanceRotateSnap = 45;
    this.drawShape = null;
    this.stampTimeout = null;
    this.wasClickInShape = false;
    this.autoScrollTimer = new HvTimer(this)/*GPTimer(this)*/;
    this.autoScrollTimerId = -1;
    this.autoScrollXPos = 0;
    this.autoScrollYPos = 0;
    this.inAutoScroll = false;
    this.textEntryTimer = null;
    this.isGestureCapable = 'ontouchstart' in window || ('onpointerdown' in window && navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
    this.touchInitiated = false;
    this.mainAppElement = null;
    this.mainAppHammer = null;
    this.workAreaElement = null;
    this.WorkAreaHammer = null;
    this.workAreaTextInputProxy = null;
    this.virtualKeyboardLifterElementFrame = null;
    this.touchPanStarted = false;
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

    const selectedListBlock = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.SELECTEDLIST_OBJECT, []);
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

    const sedSessionBlock = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.SED_SESSION_OBJECT, sedSession);
    this.theSEDSessionBlockID = sedSessionBlock.ID;

    const layersManager = new LayersManager();
    const defaultLayer = new Layer();
    defaultLayer.name = ConstantData.Defines.DefaultLayerName;
    layersManager.layers.push(defaultLayer);
    layersManager.nlayers = 1;
    layersManager.activelayer = 0;

    const layersManagerBlock = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.LAYERS_MANAGER_OBJECT, layersManager);
    this.theLayersManagerBlockID = layersManagerBlock.ID;

    this.SelectionState = new SelectionAttributes();

    const tedSession = new TEDSession();// new ListManager.TEDSession();
    const tedSessionBlock = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.TED_SESSION_OBJECT, tedSession);
    this.theTEDSessionBlockID = tedSessionBlock.ID;

    const linksBlock = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.LINKLIST_OBJECT, []);
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
    this.initialStateID = T3Gv.stateManager.CurrentStateID;
    this.nObjectStoreStart = T3Gv.objectStore.StoredObjects.length;
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
    if (!T3Gv.optManager.noUndo) {
      if (null === T3Gv.stateManager) throw new Error('stateManager is null');
      // new SDJSError({
      //     source: 'ListManager.PreserveUndoState',
      //     message: 'stateManager is null'
      //   });
      if (!(T3Gv.stateManager.CurrentStateID < 0)) {
        // var t = Editor.IsStateOpen();
        var t = Utils1.IsStateOpen();
        T3Gv.stateManager.PreserveState(),
          t &&
          T3Gv.stateManager.AddToHistoryState(),
          !e &&
          t &&
          (
            this.GetDocDirtyState() ? SDF.SaveChangedBlocks(T3Gv.stateManager.CurrentStateID, 1) : SDF.SaveAllBlocks(),
            this.SetDocDirtyState(!0)
          )
      }
    }
  }

  InitSVGDocument() {

    var e = T3Gv.objectStore.GetObject(this.theSEDSessionBlockID).Data;

    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    console.log("Screen width:", screenWidth, "Screen height:", screenHeight);

    T3Gv.docHandler.InitializeWorkArea({
      svgAreaID: this.svgDocId,
      documentWidth: screenWidth,// 2000,// e.dim.x,
      documentHeight: screenHeight,// 250,// e.dim.y,
      documentDPI: 100
    });

    this.svgDoc = T3Gv.docHandler.DocObject();
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
    this.mainAppElement = document.getElementById('main-app');
    this.workAreaElement = document.getElementById('svg-area');
    this.DocumentElement = document.getElementById('document-area');

    this.WorkAreaHammer = Hammer(this.workAreaElement);
    this.DocumentElementHammer = Hammer(this.DocumentElement);

    this.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick);
    this.WorkAreaHammer.on('wheel', EvtUtil.Evt_WorkAreaMouseWheel);
    this.DocumentElementHammer.on('wheel', EvtUtil.Evt_WorkAreaMouseWheel);

    this.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDragStart);
  }


  GetFractionDenominator() {

    return T3Gv.docHandler.rulerSettings.majorScale <= 1 ? 16 : T3Gv.docHandler.rulerSettings.majorScale <= 2 ? 8 : T3Gv.docHandler.rulerSettings.majorScale <= 4 ? 4 : T3Gv.docHandler.rulerSettings.majorScale <= 8 ? 2 : 1
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
      f = T3Gv.optManager.GetObjectPtr(this.theSEDSessionBlockID, !1),
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
      this.SelectionState.CurrentSelectionBusinessManager = T3Gv.gBusinessManager,
      this.SelectionState.isJiraCard = !1,
      T3Gv.optManager.bInDimensionEdit
    ) this.SelectionState.fontid = -1,// T3Gv.optManager.GetFontIdByName(T3Gv.optManager.theContentHeader.DimensionFont.fontName),
      this.SelectionState.fontsize = T3Gv.optManager.theContentHeader.DimensionFont.fontSize,
      this.SelectionState.bold = (T3Gv.optManager.theContentHeader.DimensionFont.face & L.Bold) > 0,
      this.SelectionState.italic = (T3Gv.optManager.theContentHeader.DimensionFont.face & L.Italic) > 0,
      this.SelectionState.underline = (T3Gv.optManager.theContentHeader.DimensionFont.face & L.Underline) > 0,
      this.SelectionState.superscript = (T3Gv.optManager.theContentHeader.DimensionFont.face & L.Subscript) > 0,
      this.SelectionState.subscript = (T3Gv.optManager.theContentHeader.DimensionFont.face & L.Subscript) > 0,
      this.SelectionState.CurrentSelectionBusinessManager = null;
    else if (0 === m || this.bInNoteEdit) this.SelectionState.fontid = -1,// T3Gv.optManager.GetFontIdByName(f.def.lf.fontName),
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
              T3Gv.docHandler.rulerSettings.originx
            ),
            this.SelectionState.topstr = i.GetLengthInRulerUnits(
              this.SelectionState.top,
              T3Gv.docHandler.rulerSettings.originy
            ),
            this.SelectionState.widthstr = i.GetLengthInRulerUnits(this.SelectionState.width),
            0 !== s.height ? this.SelectionState.heightstr = i.GetLengthInRulerUnits(this.SelectionState.height) : this.SelectionState.heightstr = '',
            (S = T3Gv.optManager.Table_HideUI(i) ? null : i.GetTable(!1)) &&
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
            u = (c = -1/*T3Gv.optManager.SD_GetVisioTextChild(p)*/) >= 0 ? this.GetObjectPtr(c, !1) : r,
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
            T3Gv.optManager.Table_GetCellWithType(S, ListManager.Table.CellTypes.SD_CT_JIRA_ISSUEKEY) &&
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
      T3Gv.docHandler.rulerSettings.showpixels &&
      P.fontsize >= 0 &&
      (P.fontsize = this.PixelstoPoints(P.fontsize))
    /*SDUI.Commands.MainController.UpdateActiveSelection(P, !1)*/
  }

  // GetObjectPtr = function (blockId, t) {
  //   var a = {};
  //   return null == blockId ||
  //     blockId < 0 ? null : (
  //     t ? (a = T3Gv.objectStore.GetObject(blockId)) &&
  //       (a = T3Gv.objectStore.PreserveBlock(blockId)) : a = T3Gv.objectStore.GetObject(blockId),
  //     null == a ? null : a.Data
  //   )
  // }



  GetObjectPtr(blockId, isPreserveBlock) {
    var object = T3Gv.objectStore.GetObject(blockId);
    if (object == null || blockId < 0) {
      return null;
    }

    if (isPreserveBlock) {
      object = T3Gv.objectStore.PreserveBlock(blockId);
    }

    return object == null ? null : object.Data;
  }

  GetClipboardType() {
    console.log('============ T3Gv.clipboardManager', T3Gv.clipboardManager);
    var e = this.GetObjectPtr(this.theTEDSessionBlockID, !1);
    T3Gv.clipboardManager.Get();
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
            ) ? ConstantData.ClipboardType.Table : T3Gv.optManager.theContentHeader.ClipboardBuffer &&
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
      var r = T3Gv.optManager.GetObjectPtr(e.tselect, !1);
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
      T3Gv.gBusinessManager &&
      T3Gv.gBusinessManager.NotifySetEditMode &&
      T3Gv.gBusinessManager.NotifySetEditMode(stateMode),
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
      (i = T3Gv.objectStore.GetObject(this.curHiliteShape)) &&
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
        n = T3Gv.docHandler.rulerSettings.dp;
        if (t) return e;
        if (T3Gv.docHandler.rulerSettings.showpixels) return i = e.toFixed(0);
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
    if (T3Gv.docHandler.documentConfig.showRulers) {
      var o = 0,
        s = 0,
        l = T3Gv.docHandler.rulerSettings.useInches &&
          T3Gv.docHandler.rulerSettings.units === Resources.RulerUnits.SED_Feet;
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
        var S = this.GetLengthInRulerUnits(e.x, !1, T3Gv.docHandler.rulerSettings.originx, o),
          c = this.GetLengthInRulerUnits(e.y, !1, T3Gv.docHandler.rulerSettings.originy, o),
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
        var C = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
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

    if (T3Gv.docHandler.documentConfig.showRulers) {
      let showFractionalInches = 0;
      let showFeetAsInches = 0;
      const useFeet = T3Gv.docHandler.rulerSettings.useInches &&
        T3Gv.docHandler.rulerSettings.units === ConstantData.RulerUnits.SED_Feet;

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
        const xLength = this.GetLengthInRulerUnits(e.x, false, T3Gv.docHandler.rulerSettings.originx, showFractionalInches);
        const yLength = this.GetLengthInRulerUnits(e.y, false, T3Gv.docHandler.rulerSettings.originy, showFractionalInches);
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

        const sessionBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, false);
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
    if (T3Gv.optManager.rubberBand) {
      T3Gv.optManager.WorkAreaHammer.off('drag');
      T3Gv.optManager.WorkAreaHammer.off('dragend');
      T3Gv.optManager.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDragStart);
      T3Gv.optManager.ResetAutoScrollTimer();
      T3Gv.optManager.svgOverlayLayer.RemoveElement(T3Gv.optManager.rubberBand);
      T3Gv.optManager.rubberBand = null;
      T3Gv.optManager.rubberBandStartX = 0;
      T3Gv.optManager.rubberBandStartY = 0;
      T3Gv.optManager.rubberBandFrame = {
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
    T3Gv.optManager.isMobilePlatform ? t = !0 : e.gesture ? 'onpointerdown' in window ? e.gesture.srcEvent instanceof PointerEvent &&
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
      this.touchInitiated = t
      */




    // debugger;


    /*
    var isTouch = false;

    if (T3Gv.optManager.isMobilePlatform) {
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

    this.touchInitiated = isTouch;
    */
  }

  SetDocumentScale(scaleFactor, isAnimated) {
    console.log('O.Opt SetDocumentScale: input', { scaleFactor, isAnimated });

    if (this.svgDoc) {
      T3Gv.docHandler.SetZoomFactor(scaleFactor, isAnimated);
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

    if (!T3Gv.optManager.fromOverlayLayer) {
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
      let object = T3Gv.optManager.GetObjectPtr(objects[i], false);
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
        T3Gv.optManager.CloseOpenNudge();
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

    const isShowRulers = T3Gv.docHandler.documentConfig.showRulers;

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
      if (T3Gv.docHandler.IsReadOnly()) {
        console.log('O.Opt StartRubberBandSelect - Document is read-only; aborting.');
        return;
      }

      if (this.cachedWidth) {
        try {
          T3Gv.optManager.CloseEdit();
          T3Gv.optManager.ChangeWidth(this.cachedWidth);
        } catch (error) {
          T3Gv.optManager.ExceptionCleanup(error);
          throw error;
        }
      }
      if (this.cachedHeight) {
        try {
          T3Gv.optManager.CloseEdit();
          T3Gv.optManager.ChangeHeight(this.cachedHeight);
        } catch (error) {
          T3Gv.optManager.ExceptionCleanup(error);
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
      T3Gv.optManager.CloseEdit();

      // Create the rubber band shape as a rectangle
      const rubberBandShape = this.svgDoc.CreateShape(ConstantData.CreateShapeType.RECT);
      rubberBandShape.SetStrokeColor('black');
      if (T3Gv.optManager.isAndroid) {
        rubberBandShape.SetFillColor('none');
        rubberBandShape.SetFillOpacity(0);
      } else {
        rubberBandShape.SetFillColor('black');
        rubberBandShape.SetFillOpacity(0.03);
      }

      const zoomFactorInverse = 1 / T3Gv.docHandler.GetZoomFactor();
      rubberBandShape.SetStrokeWidth(1 * zoomFactorInverse);

      if (!T3Gv.optManager.isAndroid) {
        const strokePattern = 2 * zoomFactorInverse + ',' + zoomFactorInverse;
        rubberBandShape.SetStrokePattern(strokePattern);
      }

      // Convert window coordinates to document coordinates
      const startCoordinates = this.svgDoc.ConvertWindowToDocCoords(
        event.gesture.center.clientX,
        event.gesture.center.clientY
      );
      T3Gv.optManager.rubberBandStartX = startCoordinates.x;
      T3Gv.optManager.rubberBandStartY = startCoordinates.y;
      rubberBandShape.SetSize(1, 1);
      rubberBandShape.SetPos(startCoordinates.x, startCoordinates.y);
      T3Gv.optManager.svgOverlayLayer.AddElement(rubberBandShape);

      console.log('O.Opt StartRubberBandSelect - Rubber band shape created:', rubberBandShape);
      T3Gv.optManager.rubberBand = rubberBandShape;
      T3Gv.optManager.EndStampSession();

      // Bind hammer events for the rubber band dragging
      T3Gv.optManager.WorkAreaHammer.on('drag', EvtUtil.Evt_RubberBandDrag);
      T3Gv.optManager.WorkAreaHammer.on('dragend', EvtUtil.Evt_RubberBandDragEnd);

      console.log('O.Opt StartRubberBandSelect - Output rubber band set successfully:', T3Gv.optManager.rubberBand);
    } catch (error) {
      console.log('O.Opt StartRubberBandSelect - Error:', error);
      T3Gv.optManager.RubberBandSelect_ExceptionCleanup(error);
      T3Gv.optManager.ExceptionCleanup(error);
      throw error;
    }
  }

  HandleDataTooltipClose(e) {
    this.ClearFieldDataDatePicker(),
      // SDUI.Commands.MainController.DataPanel.ProcessActiveEdit(),
      this.ActiveDataTT &&
      this.ActiveDataTT.dataChanged &&
      (
        this.CompleteOperation(null, e),
        this.ActiveDataTT.dataChanged = !1
      )
  }

  ClearFieldDataDatePicker() {
    this._curDatePickerElem &&
      this._curDatePickerElem.datepicker &&
      this._curDatePickerElem.datepicker('hide'),
      this._curDatePickerElem = null
  }


  ClearAllActionArrowTimers() {
    for (var e = this.VisibleZList(), t = 0; t < e.length; t++) {
      var a = this.GetObjectPtr(e[t], !1);
      a &&
        - 1 !== a.actionArrowHideTimerID &&
        (
          this.actionArrowHideTimer.clearTimeout(a.actionArrowHideTimerID),
          a.actionArrowHideTimerID = - 1
        )
    }
  }

  VisibleZList() {
    var e,
      t,
      a = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
      r = (a.layers, a.nlayers),
      i = a.activelayer,
      n = [];
    for (t = r - 1; t >= 0; t--) e = a.layers[t],
      (t == i || e.flags & ConstantData.LayerFlags.SDLF_Visible) &&
      (n = n.concat(e.zList));
    return n
  }

  ShowOverlayLayer() {
    this.svgOverlayLayer.SetVisible(!0)
  }

  // Double === render all opt shape including the re-siez image
  RenderAllSVGSelectionStates() {
    console.log('ListManager.LM.prototype.RenderAllSVGSelectionStates ======================');
    // debugger
    var e = this.ActiveVisibleZList(),
      t = e.length,
      a = T3Gv.objectStore.GetObject(this.theSelectedListBlockID).Data,
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
        null == (o = T3Gv.optManager.GetObjectPtr(n, !1)) ||
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
          !T3Gv.docHandler.IsReadOnly() &&
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
    var e,
      t,
      a = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
      r = (a.layers, a.nlayers),
      i = a.activelayer,
      n = [];
    for (t = r - 1; t >= 0; t--) e = a.layers[t],
      (
        t == i ||
        e.flags & ConstantData.LayerFlags.SDLF_Visible &&
        e.flags & ConstantData.LayerFlags.SDLF_Active
      ) &&
      (n = n.concat(e.zList));
    return n
  }


  UpdateFieldDataTooltipPos(e, t) {
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
      a = T3Gv.optManager.GetActiveTextEdit(),
      i = T3Gv.optManager.Table_GetActiveID(),
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

  DeactivateAllTextEdit(e, t) {
    if (
      - 1 != this.GetObjectPtr(this.theTEDSessionBlockID, !1).theActiveTextEditObjectID
    ) this.DeactivateTextEdit(e, t);
    else {
      var a = this.svgDoc.GetActiveEdit();
      null != a &&
        a.ID == ConstantData.SVGElementClass.DIMENSIONTEXT &&
        this.TEUnregisterEvents()
    }
  }

  TEUnregisterEvents(e) {
    this.svgDoc.ClearActiveEdit(e),
      null != this.textEntryTimer &&
      (clearTimeout(this.textEntryTimer), this.textEntryTimer = null),
      this.TETextHammer &&
      (
        this.TETextHammer.off('dragstart'),
        this.TETextHammer.dispose(),
        this.TETextHammer = null
      ),
      this.TEClickAreaHammer &&
      (
        this.TEClickAreaHammer.off('dragstart'),
        this.TEClickAreaHammer.dispose(),
        this.TEClickAreaHammer = null
      ),
      this.TEDecAreaHammer &&
      (
        this.TEDecAreaHammer.off('dragstart'),
        this.TEDecAreaHammer.dispose(),
        this.TEDecAreaHammer = null
      ),
      this.TEWorkAreaHammer &&
      (
        this.TEWorkAreaHammer.off('drag'),
        this.TEWorkAreaHammer.off('dragend'),
        this.TEWorkAreaHammer.dispose(),
        this.TEWorkAreaHammer = null
      )
  }

  CloseShapeEdit(e, t, a) {
    var r,
      i = this.GetObjectPtr(this.theTEDSessionBlockID, !1),
      n = i.theActiveOutlineObjectID;
    if (t && (n = a), n >= 0) {
      if (!0 === e) return;
      if (e === n) return;
      if (r = this.GetObjectPtr(n, !1)) {
        if (
          r.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL
        ) return;
        if (
          /*Collab.AllowMessage() &&*/
          (Collab.BeginSecondaryEdit(), r = this.GetObjectPtr(n, !1)),
          r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
          r.LineType === ConstantData.LineType.POLYLINE &&
          r.polylist.closed &&
          (this.PolyLineToShape(n), Collab.AllowMessage())
        ) {
          var o = {
            BlockID: n
          };
          Collab.BuildMessage(ConstantData.CollabMessages.CloseShapeEdit, o, !1)
        }
      }
      t ||
        (
          (i = this.GetObjectPtr(this.theTEDSessionBlockID, !0)).theActiveOutlineObjectID = - 1
        ),
        this.CompleteOperation()
    }
  }

  EndStampSession() {
    T3Gv.optManager.GetEditMode() === ConstantData.EditState.STAMP &&
      (
        this.actionStoredObjectId = - 1,
        this.CancelObjectDragDrop(!0),
        T3Gv.optManager.mainAppHammer &&
        T3Gv.optManager.UnbindDragDropOrStamp()
      )
  }

  GetEditMode() {
    var e = this.editModeList ||
      [],
      t = ConstantData.EditState.DEFAULT;
    return e.length &&
      (t = e[e.length - 1].mode),
      t
  }

  AutoScrollCommon(e, t, a) {
    console.log('ListManager.LM.prototype.AutoScrollCommon e, t, a=>', e, t, a);

    var r,
      i,
      n = !1;
    this.OverrideSnaps(e) &&
      (t = !1),
      e.gesture ? (r = e.gesture.center.clientX, i = e.gesture.center.clientY) : (r = e.clientX, i = e.clientY);
    var o = r,
      s = i;
    if (
      r >= T3Gv.optManager.svgDoc.docInfo.dispX + T3Gv.optManager.svgDoc.docInfo.dispWidth - 8 &&
      (
        n = !0,
        o = T3Gv.optManager.svgDoc.docInfo.dispX + T3Gv.optManager.svgDoc.docInfo.dispWidth - 8 + 32
      ),
      r < T3Gv.optManager.svgDoc.docInfo.dispX &&
      (n = !0, o = T3Gv.optManager.svgDoc.docInfo.dispX - 32),
      i >= T3Gv.optManager.svgDoc.docInfo.dispY + T3Gv.optManager.svgDoc.docInfo.dispHeight - 8 &&
      (
        n = !0,
        s = T3Gv.optManager.svgDoc.docInfo.dispY + T3Gv.optManager.svgDoc.docInfo.dispHeight - 8 + 32
      ),
      i < T3Gv.optManager.svgDoc.docInfo.dispY &&
      (n = !0, s = T3Gv.optManager.svgDoc.docInfo.dispY - 32),
      n
    ) {
      if (t && T3Gv.docHandler.documentConfig.enableSnap) {
        var l = {
          x: o,
          y: s
        };
        o = (l = T3Gv.docHandler.SnapToGrid(l)).x,
          s = l.y
      }
      return T3Gv.optManager.autoScrollXPos = o,
        T3Gv.optManager.autoScrollYPos = s,
        - 1 != T3Gv.optManager.autoScrollTimerId ? !1 : (
          T3Gv.optManager.autoScrollTimerId = T3Gv.optManager.autoScrollTimer.setTimeout(a, 0),
          !1
        )
    }
    return T3Gv.optManager.ResetAutoScrollTimer(),
      !0
  }

  RubberBandSelect_ExceptionCleanup(e) {
    throw e;
    console.log('ListManager.LM.prototype.RubberBandSelect_ExceptionCleanup e=> ==========', e);

    // throw e;

    // DOUBLE ========
    T3Gv.optManager.UnbindRubberBandHammerEvents(),
      T3Gv.optManager.ResetAutoScrollTimer(),
      T3Gv.optManager.rubberBand &&
      T3Gv.optManager.svgOverlayLayer.RemoveElement(T3Gv.optManager.rubberBand),
      T3Gv.optManager.rubberBand = null,
      T3Gv.optManager.rubberBandStartX = 0,
      T3Gv.optManager.rubberBandStartY = 0,
      T3Gv.optManager.rubberBandFrame = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      Collab.UnLockMessages(),
      Collab.UnBlockMessages(),
      T3Gv.optManager.InUndo = !1
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
    T3Gv.optManager.WorkAreaHammer &&
      (
        T3Gv.optManager.WorkAreaHammer.off('drag'),
        T3Gv.optManager.WorkAreaHammer.off('dragend')
      )
  }

  ResetAutoScrollTimer() {
    - 1 != this.autoScrollTimerId &&
      (
        this.autoScrollTimer.clearTimeout(this.autoScrollTimerId),
        this.autoScrollTimerId = - 1
      )
  }

  RubberBandSelectMoveCommon(e, t) {


    /*
    console.log('ListManager.LM.prototype.RubberBandSelectMoveCommon e, t=> ======', e, t);
    console.log('ListManager.LM.prototype.RubberBandSelectMoveCommon T3Gv.optManager=> ======', T3Gv.optManager);
    var a = e,
      r = t,
      i = T3Gv.optManager.rubberBandStartX,
      n = T3Gv.optManager.rubberBandStartY;
    return a >= i &&
      r >= n ? (
      T3Gv.optManager.rubberBand.SetSize(a - i, r - n),
      void (
        T3Gv.optManager.rubberBandFrame = {
          x: i,
          y: n,
          width: a - i,
          height: r - n
        }
      )
    ) : r < n ? a >= i ? (
      T3Gv.optManager.rubberBand.SetSize(a - i, n - r),
      T3Gv.optManager.rubberBand.SetPos(i, r),
      void (
        T3Gv.optManager.rubberBandFrame = {
          x: i,
          y: r,
          width: a - i,
          height: n - r
        }
      )
    ) : (
      T3Gv.optManager.rubberBand.SetSize(i - a, n - r),
      T3Gv.optManager.rubberBand.SetPos(a, r),
      void (
        T3Gv.optManager.rubberBandFrame = {
          x: a,
          y: r,
          width: i - a,
          height: n - r
        }
      )
    ) : a < T3Gv.optManager.rubberBandStartX ? (
      T3Gv.optManager.rubberBand.SetSize(i - a, r - n),
      T3Gv.optManager.rubberBand.SetPos(a, n),
      void (
        T3Gv.optManager.rubberBandFrame = {
          x: a,
          y: n,
          width: i - a,
          height: r - n
        }
      )
    ) : void 0

    */


    // Double ===
    if (T3Gv.optManager.rubberBand === null) {
      return;
    }


    console.log('ListManager.LM.prototype.RubberBandSelectMoveCommon e, t=> ======', e, t);
    console.log('ListManager.LM.prototype.RubberBandSelectMoveCommon T3Gv.optManager=> ======', T3Gv.optManager);

    const a = e;
    const r = t;
    const i = T3Gv.optManager.rubberBandStartX;
    const n = T3Gv.optManager.rubberBandStartY;

    if (a >= i && r >= n) {
      T3Gv.optManager.rubberBand.SetSize(a - i, r - n);
      T3Gv.optManager.rubberBandFrame = {
        x: i,
        y: n,
        width: a - i,
        height: r - n
      };
    } else if (r < n) {
      if (a >= i) {
        T3Gv.optManager.rubberBand.SetSize(a - i, n - r);
        T3Gv.optManager.rubberBand.SetPos(i, r);
        T3Gv.optManager.rubberBandFrame = {
          x: i,
          y: r,
          width: a - i,
          height: n - r
        };
      } else {
        T3Gv.optManager.rubberBand.SetSize(i - a, n - r);
        T3Gv.optManager.rubberBand.SetPos(a, r);
        T3Gv.optManager.rubberBandFrame = {
          x: a,
          y: r,
          width: i - a,
          height: n - r
        };
      }
    } else if (a < i) {
      T3Gv.optManager.rubberBand.SetSize(i - a, r - n);
      T3Gv.optManager.rubberBand.SetPos(a, n);
      T3Gv.optManager.rubberBandFrame = {
        x: a,
        y: n,
        width: i - a,
        height: r - n
      };
    }































  }

  // ExceptionCleanup = function (e) {
  //   throw e;
  //   console.log('ListManager.LM.prototype.ExceptionCleanup ==============', e);
  //   // throw e;

  //   if (null != e && e.stack, null === T3Gv.stateManager) throw new Error('stateManager is null');
  //   // new SDJSError({
  //   //   source: 'ListManager.ExceptionCleanup',
  //   //   message: 'stateManager is null'
  //   // });
  //   this.TEUnregisterEvents(),
  //     this.DeactivateAllTextEdit(!0),
  //     this.CloseEdit(!1, !0),
  //     T3Gv.stateManager.ExceptionCleanup(),
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
    throw error;
    // console.log('ListManager.LM.prototype.ExceptionCleanup ==============', error);
    // throw e;

    // if (null != e && e.stack, null === T3Gv.stateManager) throw new Error('stateManager is null');
    // new SDJSError({
    //   source: 'ListManager.ExceptionCleanup',
    //   message: 'stateManager is null'
    // });
    this.TEUnregisterEvents();
    this.DeactivateAllTextEdit(!0);
    this.CloseEdit(!1, !0);
    T3Gv.stateManager.ExceptionCleanup();
    this.ResizeSVGDocument();
    this.RenderAllSVGObjects();
    var t = this.GetObjectPtr(this.theSEDSessionBlockID, !1);
    // Resources.CurrentTheme.Name !== t.CurrentTheme &&
    //   (new SDUI.ThemeController).SwitchTheme(t.CurrentTheme);
    var a = this.GetObjectPtr(this.theSelectedListBlockID, !1);
    this.UpdateSelectionAttributes(a);
    // SDUI.Commands.MainController.SmartPanels.IdleSmartPanel(!0),
    // Collab.IsProcessingMessage() ||
    // (
    //   '1' === e.name ? Utils2.Alert(e.message) : 'PRD' === SDUI.Environment ? Utils2.Alert(Resources.Strings.Error_InComplete) : Utils2.Alert(e.stack),
    //   Collab.AllowMessage() &&
    //   Collab.IsSecondary() &&
    //   Collab.ReSyncCollaboration()
    // ),
    // SDUI.Utils.Logger.LogError(e.stack),
    // Collab.UnLockMessages(),
    // Collab.UnBlockMessages()
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
        var object = T3Gv.objectStore.GetObject(filteredObjects[i]);
        if (object != null) {
          var objectData = object.Data;
          if (objectData.objecttype !== shapeContainerType || !this.ContainerIsInCell(objectData)) {
            var objectFrame = objectData.Frame;
            if (objectData.RotationAngle) {
              var center = {
                x: objectFrame.x + objectFrame.width / 2,
                y: objectFrame.y + objectFrame.height / 2
              };
              objectFrame = T3Gv.optManager.RotateRectAboutCenter(objectFrame, center, objectData.RotationAngle);
            }
            if (this.IsRectEnclosed(selectionRect, objectFrame)) {
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

  RemoveNotVisible(e) {
    var t,
      a,
      r,
      i,
      n = [],
      o = ConstantData.ObjFlags.SEDO_NotVisible;
    for (r = e.length, t = 0; t < r; t++) i = e[t],
      (a = this.GetObjectPtr(i, !1)) &&
      0 == (a.flags & o) &&
      n.push(i);
    return n
  }

  IsCtrlClick(e) {
    var t = !1;
    return e.gesture &&
      (e = e.gesture.srcEvent),
      e instanceof MouseEvent ? e.ctrlKey &&
        (t = !0) : 'onpointerdown' in window &&
        e instanceof PointerEvent &&
        e.ctrlKey &&
      (t = !0),
      t
  }

  RubberBandSelectDoAutoScroll() {
    T3Gv.optManager.autoScrollTimerId = this.autoScrollTimer.setTimeout('RubberBandSelectDoAutoScroll', 100);
    var e = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(T3Gv.optManager.autoScrollXPos, T3Gv.optManager.autoScrollYPos);
    T3Gv.docHandler.ScrollToPosition(e.x, e.y),
      T3Gv.optManager.RubberBandSelectMoveCommon(e.x, e.y)
  }


  CompleteOperation(e, t, a, r) {
    if (!Collab.NoRedrawFromSameEditor) {
      this.HideAllSVGSelectionStates();
    }

    // if (T3Gv.optManager.FromRightClickClose !== 1 && Commands.MainController.Dropdowns.HasRightClickDropDowns() && !Collab.IsProcessingMessage()) {
    //   Commands.MainController.Dropdowns.HideAllDropdowns();
    // }

    this.DynamicSnaps_RemoveGuides(this.Dynamic_Guides);
    this.Dynamic_Guides = null;
    this.UpdateLinks();
    this.UpdateLineHops(true);

    if (!Utils1.IsStateOpen() && Collab.objectStore == null) {
      // GlobalDatagFlowChartManager.UpdateSwimlanes();
      // Double === Need to Check
    }

    const noRedraw = Collab.NoRedrawFromSameEditor;

    this.RenderDirtySVGObjects();
    this.FitDocumentWorkArea(false, false, false, a);

    if (T3Gv.gTestException) {
      const error = new Error(Resources.Strings.Error_InComplete);
      error.name = '1';
      throw error;
    }

    if (e && Collab.AllowSelectionChange()) {
      this.SelectObjects(e, false, true);
    } else if (!noRedraw) {
      this.RenderAllSVGSelectionStates();
    }

    if (!t) {
      this.PreserveUndoState(false);
    }

    const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, false);
    T3Gv.docHandler.ShowCoordinates(true);

    if (Collab.AllowSelectionChange()) {
      this.UpdateSelectionAttributes(selectedList);
    }

    // Commands.MainController.SmartPanels.IdleSmartPanel();
    // Commands.MainController.Document.IdleLayersTabs();
    this.LastOpDuplicate = false;
    this.ScrollObjectIntoView(-1, false);

    if (/*SDJS*/true && Clipboard && Clipboard.FocusOnClipboardInput) {
      Clipboard.FocusOnClipboardInput();
    }

    // Collab.UnBlockMessages();
  }

  DrawNewObject(drwShape, isClearSection) {
    // debugger
    console.log('= Opt DrawNewObject drwShape,isClearSection', drwShape, isClearSection)

    this.SetModalOperation(ConstantData2.ModalOperations.DRAW);
    this.GetObjectPtr(this.theTEDSessionBlockID, false);
    this.CloseEdit();
    this.lineDrawId = - 1;
    this.drawShape = drwShape;
    this.ClearAnySelection(!isClearSection);
    this.SetEditMode(ConstantData.EditState.EDIT);
    this.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDrawStart);
    // T3Gv.optManager.isMobilePlatform ||
    //   (
    //     e instanceof PolyLine ||
    //       e instanceof PolyLineContainer ? this.WorkAreaHammer.on('tap', Evt_WorkAreaHammerDrawStart) : e instanceof BaseLine &&
    //     this.WorkAreaHammer.off('tap')
    //   )
  }

  SetModalOperation(e) {
    e != ConstantData2.ModalOperations.NONE &&
      this.currentModalOperation != ConstantData2.ModalOperations.NONE &&
      this.currentModalOperation != e &&
      this.CancelModalOperation(),
      this.currentModalOperation = e
  }

  StartNewObjectDraw(event) {


    /*
    var t;
    if (!T3Gv.optManager.lineStamp) {
      Collab.BeginSecondaryEdit(),
        T3Gv.optManager.SetUIAdaptation(e);
      var a = this.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
      if (
        this.drawStartX = a.x,
        this.drawStartY = a.y,
        this.drawShape.LM_DrawPreTrack(a)
      ) {
        if (
          t = this.LinkParams &&
          this.LinkParams.SConnectIndex >= 0,
          this.OverrideSnaps(e) &&
          (t = !0),
          T3Gv.docHandler.documentConfig.enableSnap &&
          !t
        ) {
          var r = this.drawShape.GetSnapRect(),
            i = null,
            n = Utils1.DeepCopy(this.actionBBox),
            o = (
              i = this.dragEnclosingRect ? Utils1.DeepCopy(this.dragEnclosingRect) : r
            ).x - n.x,
            s = i.y - n.y;
          i.x = a.x - i.width / 2,
            i.y = a.y - i.height / 2;
          var l = {
            x: i.x - o,
            y: i.y - s
          };
          if (this.drawShape.CustomSnap(l.x, l.y, 0, 0, !1, a));
          else if (T3Gv.docHandler.documentConfig.centerSnap) theSnapPoint = T3Gv.docHandler.SnapToGrid(a),
            a.x = theSnapPoint.x,
            a.y = theSnapPoint.y;
          else {
            var S = $.extend(!0, {
            }, r);
            S.x = a.x - r.width / 2,
              S.y = a.y - r.height / 2;
            var c = T3Gv.docHandler.SnapRect(S);
            a.x += c.x,
              a.y += c.y
          }
        }
        var u = a.x,
          p = a.y;
        this.ClearAnySelection(!0),
          this.actionStartX = u,
          this.actionStartY = p,
          this.actionBBox = {
            x: u,
            y: p,
            width: 1,
            height: 1
          },
          this.actionNewBBox = {
            x: u,
            y: p,
            width: 1,
            height: 1
          };
        var d = this.drawShape;
        this.DoAutoGrowDragInit(),
          this.ShowFrame(!0),
          d.LM_DrawClick(u, p),
          this.AddNewObject(d, !d.bOverrideDefaultStyleOnDraw, !1);
        var D = this.ActiveLayerZList(),
          g = D.length;
        this.actionStoredObjectId = D[g - 1],
          T3Gv.optManager.LinkParams &&
          T3Gv.optManager.LinkParams.lpCircList &&
          T3Gv.optManager.LinkParams.lpCircList.push(this.actionStoredObjectId),
          this.actionSvgObject = this.svgObjectLayer.GetElementByID(this.actionStoredObjectId),
          this.LinkParams &&
          this.LinkParams.SConnectIndex >= 0 &&
          (
            this.HiliteConnect(
              this.LinkParams.SConnectIndex,
              this.LinkParams.SConnectPt,
              !0,
              !1,
              d.BlockID,
              this.LinkParams.SConnectInside
            ),
            this.LinkParams.SHiliteConnect = this.LinkParams.SConnectIndex,
            this.LinkParams.SHiliteInside = this.LinkParams.SConnectInside
          ),
          this.LinkParams &&
          this.LinkParams.SJoinIndex >= 0 &&
          (
            this.HiliteConnect(
              this.LinkParams.SJoinIndex,
              this.LinkParams.SConnectPt,
              !0,
              !0,
              d.BlockID,
              null
            ),
            this.LinkParams.SHiliteJoin = this.LinkParams.SJoinIndex
          )
      }
    }
      */
    // debugger

    console.log('= Opt StartNewObjectDraw: event', event)


    var t;

    if (T3Gv.optManager.lineStamp) {
      return;
    }


    // Collab.BeginSecondaryEdit();
    // T3Gv.optManager.SetUIAdaptation(event);


    var docCoords = this.svgDoc.ConvertWindowToDocCoords(event.gesture.center.clientX, event.gesture.center.clientY);

    console.log('= Opt StartNewObjectDraw: client-x-y, doc-x-y', event.gesture.center.clientX, event.gesture.center.clientY, docCoords)

    this.drawStartX = docCoords.x;
    this.drawStartY = docCoords.y;

    console.log('= Opt StartNewObjectDraw: draw start x-y', this.drawStartX, this.drawStartY)


    const check = this.drawShape.LM_DrawPreTrack(docCoords);

    if (!check) {
      return;
    }

    let hasLinkPar = this.LinkParams && this.LinkParams.SConnectIndex >= 0;
    let needOverrideSnaps = this.OverrideSnaps(event);
    hasLinkPar = hasLinkPar || needOverrideSnaps;


    // if (needOverrideSnaps) {
    //   hasLinkPar = true;
    // }

    const isEnableSnap = T3Gv.docHandler.documentConfig.enableSnap && !hasLinkPar;

    if (isEnableSnap) {
      var r = this.drawShape.GetSnapRect();
      var i = null;
      var n = Utils1.DeepCopy(this.actionBBox);
      var o = (i = this.dragEnclosingRect ? Utils1.DeepCopy(this.dragEnclosingRect) : r).x - n.x;
      var s = i.y - n.y;

      i.x = docCoords.x - i.width / 2;
      i.y = docCoords.y - i.height / 2;

      var l = {
        x: i.x - o,
        y: i.y - s
      };

      if (!this.drawShape.CustomSnap(l.x, l.y, 0, 0, false, docCoords)) {
        if (T3Gv.docHandler.documentConfig.centerSnap) {
          var theSnapPoint = T3Gv.docHandler.SnapToGrid(docCoords);
          docCoords.x = theSnapPoint.x;
          docCoords.y = theSnapPoint.y;
        } else {
          var S = $.extend(true, {}, r);
          S.x = docCoords.x - r.width / 2;
          S.y = docCoords.y - r.height / 2;
          var c = T3Gv.docHandler.SnapRect(S);
          docCoords.x += c.x;
          docCoords.y += c.y;
        }
      }
    }

    var docCorX = docCoords.x;
    var docCorY = docCoords.y;

    this.ClearAnySelection(true);
    this.actionStartX = docCorX;
    this.actionStartY = docCorY;
    this.actionBBox = { x: docCorX, y: docCorY, width: 1, height: 1 };
    this.actionNewBBox = { x: docCorX, y: docCorY, width: 1, height: 1 };

    var drw = this.drawShape;
    this.DoAutoGrowDragInit();
    this.ShowFrame(true);
    drw.LM_DrawClick(docCorX, docCorY);
    this.AddNewObject(drw, !drw.bOverrideDefaultStyleOnDraw, false);

    var D = this.ActiveLayerZList();
    var g = D.length;
    this.actionStoredObjectId = D[g - 1];

    const hasCircList = T3Gv.optManager.LinkParams && T3Gv.optManager.LinkParams.lpCircList;
    if (hasCircList) {
      T3Gv.optManager.LinkParams.lpCircList.push(this.actionStoredObjectId);
    }

    this.actionSvgObject = this.svgObjectLayer.GetElementByID(this.actionStoredObjectId);

    const hasConnectIndex = this.LinkParams && this.LinkParams.SConnectIndex >= 0;

    if (hasConnectIndex) {
      this.HiliteConnect(this.LinkParams.SConnectIndex, this.LinkParams.SConnectPt, true, false, drw.BlockID, this.LinkParams.SConnectInside);
      this.LinkParams.SHiliteConnect = this.LinkParams.SConnectIndex;
      this.LinkParams.SHiliteInside = this.LinkParams.SConnectInside;
    }

    const hasJoinIndex = this.LinkParams && this.LinkParams.SJoinIndex >= 0;

    if (hasJoinIndex) {
      this.HiliteConnect(this.LinkParams.SJoinIndex, this.LinkParams.SConnectPt, true, true, drw.BlockID, null);
      this.LinkParams.SHiliteJoin = this.LinkParams.SJoinIndex;
    }
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
      (C = this.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1)) &&
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
      T3Gv.optManager.fromOverlayLayer &&
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
          this.dragDeltaX = p,
          this.dragDeltaY = d,
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
          L = Utils1.DeepCopy(T3Gv.optManager.LinkParams.ContainerPt[0]),
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
              (E = t.HookToPoint(y, null)).x += o.x - this.dragStartX,
              E.y += o.y - this.dragStartY
            ) : E = a[O]
          );
        var W = (p = M[u].x - E.x) * p + (d = M[u].y - E.y) * d;
        if (!D.AllowHook(a[O], e, W)) continue;
        if (
          this.dragDeltaX = p,
          this.dragDeltaY = d,
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
            !T3Gv.optManager.LinkParams.AutoSinglePoint ? this.LinkParams.ConnectHookFlag = ConstantData.HookFlags.SED_LC_AutoInsert : this.LinkParams.ArraysOnly &&
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



  FindObject(e, t, a, r, i, n) {
    var o,
      s,
      l,
      S,
      c = {},
      u = new HitResult(- 1, 0, null);
    if (null == (S = this.ActiveVisibleZList())) return - 1;
    for (var p = S.length - 1; p >= 0; p--) if (!(s = t && - 1 != t.indexOf(S[p]))) {
      if (null != (o = this.GetObjectPtr(S[p], !1))) {
        if (
          n &&
          (
            n instanceof ShapeContainer ||
            n.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER
          ) &&
          o.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR
        ) continue;
        (
          o.flags & ConstantData.ObjFlags.SEDO_Lock ||
          o.flags & ConstantData.ObjFlags.SEDO_NoLinking ||
          o.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText
        ) &&
          (o = null)
      }
      if (null != o) {
        if (o.flags & ConstantData.ObjFlags.SEDO_NotVisible) continue;
        if (o.extraflags & ConstantData.ExtraFlags.SEDE_ConnToConn) continue;
        if (
          n &&
          n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
          T3Gv.optManager.FindChildArray(S[p], - 1) >= 0
        ) continue;
        if (
          a &&
          (s = - 1 === a.indexOf(o.DrawingObjectBaseClass)),
          (c = o.GetHitTestFrame(n)).width < ConstantData.Defines.FindObjectMinHitSpot &&
          (
            c.width = ConstantData.Defines.FindObjectMinHitSpot,
            c.x -= ConstantData.Defines.FindObjectMinHitSpot / 2
          ),
          c.height < ConstantData.Defines.FindObjectMinHitSpot &&
          (
            c.height = ConstantData.Defines.FindObjectMinHitSpot,
            c.y -= ConstantData.Defines.FindObjectMinHitSpot / 2
          ),
          o instanceof ShapeContainer
        ) {
          if (
            l = Utils1.DeepCopy(T3Gv.optManager.LinkParams.ContainerPt[0]),
            o.IsShapeContainer(n, l) &&
            Utils2.pointInRect(c, l)
          ) return u.objectid = S[p],
            u.hitcode = ConstantData.HitCodes.SED_InContainer,
            u.theContainerPt = l,
            u;
          continue
        }
        if (o.IsSwimlane() && Utils2.pointInRect(c, e)) return null;
        if (
          !s &&
          Utils2.pointInRect(c, e) &&
          (u.objectid = S[p], u.hitcode = o.Hit(e, r, i, u), u.hitcode)
        ) return u
      }
    }
    return null
  }


  // DoAutoGrowDragInit = function (e, t) {
  //   console.log('ListManager.LM.prototype.DoAutoGrowDragInit 1 e=', e);
  //   console.log('ListManager.LM.prototype.DoAutoGrowDragInit 2 t=', t);

  //   this.GetObjectPtr(this.theTEDSessionBlockID, false);
  //   var a = this.currentModalOperation === ConstantData2.ModalOperations.FORMATPAINTER &&
  //     (
  //       e === ConstantData.ActionTriggerType.TABLE_ROW ||
  //       e === ConstantData.ActionTriggerType.TABLE_COL
  //     );
  //   e === ConstantData.ActionTriggerType.TABLE_SELECT ||
  //     a ||
  //     this.CloseEdit(!1, t),
  //     this.dragGotAutoResizeRight = !1,
  //     this.dragGotAutoResizeBottom = !1,
  //     this.dragGotAutoResizeOldX = [],
  //     this.dragGotAutoResizeOldY = []
  // }



  DoAutoGrowDragInit(actionType, closeEdit) {
    console.log('= Opt DoAutoGrowDragInit 1 actionType=', actionType);
    console.log('= Opt DoAutoGrowDragInit 2 closeEdit=', closeEdit);

    /*
    this.GetObjectPtr(this.theTEDSessionBlockID, false);

    const isFormatPainter = this.currentModalOperation === ConstantData2.ModalOperations.FORMATPAINTER &&
      (actionType === ConstantData.ActionTriggerType.TABLE_ROW || actionType === ConstantData.ActionTriggerType.TABLE_COL);

    if (actionType === ConstantData.ActionTriggerType.TABLE_SELECT || isFormatPainter) {
      this.CloseEdit(false, closeEdit);
    }
    */

    this.dragGotAutoResizeRight = false;
    this.dragGotAutoResizeBottom = false;
    this.dragGotAutoResizeOldX = [];
    this.dragGotAutoResizeOldY = [];
  }














  unbindActionClickHammerEvents() {
    T3Gv.optManager.WorkAreaHammer &&
      (
        T3Gv.optManager.WorkAreaHammer.off('drag'),
        T3Gv.optManager.WorkAreaHammer.off('dragend'),
        T3Gv.optManager.WorkAreaHammer.off('doubletap')
      )
  }













  AddNewObject1(e, t, a, r) {
    // debugger
    console.log('ListManager->Start AddNewObject e', e, t, a, r);
    console.log('T3Gv.gBaseManager========================', T3Gv.gBaseManager);
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
            this.dragEnclosingRect = p.GetDragR(),
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
    var d = T3Gv.objectStore.GetObject(this.theSEDSessionBlockID).Data;
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
      e.DataID = r ? T3Gv.optManager.CreateTextBlock(e, r) : - 1,
      e.EMFBuffer
    ) {
      var g,
        h = e.EMFBuffer,
        m = new ListManager.BlobBytes(e.EMFBufferType, h);
      e.EMFBufferType === ConstantData2.ImageDir.dir_meta ? (
        g = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, m)
      ) &&
        (e.EMFBlobBytesID = g.ID) : (
          g = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, m)
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
    var C = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT, e);
    if (null === C)
      //   throw new SDJSError({
      //   source: 'ListManager.AddNewObject',
      //   message: 'AddNewObject got a null new graphics block allocation'
      // });

      throw new Error('AddNewObject got a null new graphics block allocation');
    if (
      Collab.AddToCreateList(C.Data.BlockID),
      S &&
      T3Gv.gBaseManager.UpdateShapeList(e, S, c, u),
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
      T3Gv.optManager.emptySymbolList.push(I)
    } else if (l) {
      var T = {
        EMFHash: e.EMFHash,
        BlockID: e.BlockID,
        EMFBufferType: e.EMFBufferType
      };
      T3Gv.optManager.emptyEMFList.push(T),
        e.SymbolData = null
    }
    this.ZListPreserve(o).push(C.ID);
    var b = e instanceof BaseLine,
      M = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1),
      P = M.layers[M.activelayer].layertype === ConstantData.LayerTypes.SD_LAYERT_MINDMAP ||
        M.layers[M.activelayer].layertype === ConstantData.LayerTypes.SD_LAYERT_GANTT;
    return Collab.IsProcessingMessage() ? this.AddToDirtyList(C.ID) : this.IsTopMostVisibleLayer() ||
      b ||
      P ? this.RenderLastSVGObject(a) : (
      this.RenderLastSVGObject(a),
      this.MarkAllAllVisibleHigherLayerObjectsDirty(),
      this.RenderDirtySVGObjectsNoSetMouse()
    ),
      this.actionBBox = $.extend(!0, {
      }, e.Frame),
      this.dragEnclosingRect = e.GetDragR(),
      C.ID
  }






















  // Double === draw core logic

  AddNewObject(drw, t, a, r) {
    // debugger
    console.log('= Opt AddNewObject drw,t,a,r', drw, t, a, r);
    console.log('= Opt AddNewObject T3Gv.gBaseManager', T3Gv.gBaseManager);


    var i;
    var n;
    var o = 0;
    var s = null;
    var l = !1;

    r = r || null;
    var S = null;
    var c = '';
    var u = !1;

    if (null == drw) {
      throw new Error('the drw shape is null');
    }

    const isNativeDataArrayBuffer = drw.nativeDataArrayBuffer;

    if (isNativeDataArrayBuffer) {
      if ((i = this.AddNewNativeSymbol(drw, a, !1)) >= 0) {
        var p = this.GetObjectPtr(i, !0);
        return p &&
          (
            this.dragEnclosingRect = p.GetDragR(),
            drw.SymbolID == ConstantData.Defines.Floorplan_WallOpeningID &&
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
    }

    const isSymbolData = drw.SymbolData;

    if (isSymbolData) {
      s = drw.SymbolData.SymbolData;
      n = drw.SymbolData.Title;
      if (drw.SymbolData.ShapeData && (drw.SymbolData.ShapeData.UseFlags & ListManager.LibraryUseFlags.SDLE_AddNameAsLabel) && r == null) {
        r = n;
      }
      if (drw.SymbolData.IsCustomContent === 0 && drw.SymbolData.HasNative === 0 && drw.SymbolData.ChangedBy !== 'VisioStencil') {
        S = drw.SymbolData.Id;
        c = drw.SymbolData.Title;
      }
    } else {
      if (this.AllowAddToRecent(drw)) {
        S = ListManager.StandardShapeSymbolIDs[drw.dataclass];
        u = true;
      }
    }






    var d = T3Gv.objectStore.GetObject(this.theSEDSessionBlockID).Data;


    if (t === undefined) {
      t = true;
    }

    if (t) {
      drw.StyleRecord = Utils1.DeepCopy(d.def.style);

      if (drw.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE) {
        drw.StyleRecord.Line = Utils1.DeepCopy(drw.StyleRecord.Border);
        drw.TMargins = Utils1.DeepCopy(d.def.tmargins);
        drw.TextFlags = Utils2.SetFlag(
          drw.TextFlags,
          ConstantData.TextFlags.SED_TF_FormCR,
          (d.def.textflags & ConstantData.TextFlags.SED_TF_FormCR) > 0
        );
      }

      var D = d.def.just;
      if (d.def.vjust !== 'middle' && d.def.vjust !== 'center') {
        D = d.def.vjust + '-' + d.def.just;
      }
      drw.TextAlign = D;
    }

    if (this.forcedotted && drw.StyleRecord) {
      drw.StyleRecord.Line.LinePattern = this.forcedotted;
      this.forcedotted = null;
    }

    drw.UpdateFrame(drw.Frame);
    drw.sizedim.width = drw.Frame.width;
    drw.sizedim.height = drw.Frame.height;
    drw.UniqueID = this.uniqueID++;

    if (drw.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL) {
      o = ConstantData.LayerFlags.SDLF_UseEdges;
    }

    drw.DataID = r ? T3Gv.optManager.CreateTextBlock(drw, r) : -1;

    if (drw.EMFBuffer) {
      var g;
      var h = drw.EMFBuffer;
      var m = new ListManager.BlobBytes(drw.EMFBufferType, h);

      if (drw.EMFBufferType === ConstantData2.ImageDir.dir_meta) {
        g = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, m);
        if (g) {
          drw.EMFBlobBytesID = g.ID;
        }
      } else {
        g = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.BLOBBYTES_OBJECT, m);
        if (g) {
          drw.BlobBytesID = g.ID;
        }
      }

      drw.EMFBuffer = null;

      if (drw.EMFBufferType !== ConstantData2.ImageDir.dir_meta) {
        delete drw.EMFHash;
      }
    } else if (drw.EMFHash && drw.SymbolData && drw.EMFBufferType != null && drw.EMFBufferType !== ConstantData2.ImageDir.dir_svg) {
      l = true;
    }

    if (drw.SymbolID == null) {
      drw.SymbolData = null;
    }

    var C = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT, drw);

    if (C == null) {
      throw new Error('AddNewObject got a null new graphics block allocation');
    }


    if (
      Collab.AddToCreateList(C.Data.BlockID),
      S &&
      T3Gv.gBaseManager.UpdateShapeList(drw, S, c, u),
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

    if (drw.SymbolData && drw.SymbolData.HasNative && (L = !0), L) {
      var I = {
        SymbolID: drw.SymbolID,
        BlockID: drw.BlockID
      };
      T3Gv.optManager.emptySymbolList.push(I)
    } else if (l) {
      var T = {
        EMFHash: drw.EMFHash,
        BlockID: drw.BlockID,
        EMFBufferType: drw.EMFBufferType
      };
      T3Gv.optManager.emptyEMFList.push(T),
        drw.SymbolData = null
    }


    this.ZListPreserve(o).push(C.ID);
    var b = drw instanceof BaseLine,
      M = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1),
      P = M.layers[M.activelayer].layertype === ConstantData.LayerTypes.SD_LAYERT_MINDMAP ||
        M.layers[M.activelayer].layertype === ConstantData.LayerTypes.SD_LAYERT_GANTT;
    return Collab.IsProcessingMessage() ? this.AddToDirtyList(C.ID) : this.IsTopMostVisibleLayer() ||
      b ||
      P ? this.RenderLastSVGObject(a) : (
      this.RenderLastSVGObject(a),
      this.MarkAllAllVisibleHigherLayerObjectsDirty(),
      this.RenderDirtySVGObjectsNoSetMouse()
    ),
      this.actionBBox = $.extend(!0, {
      }, drw.Frame),
      this.dragEnclosingRect = drw.GetDragR(),
      C.ID
  }














































































































































  AllowAddToRecent(e) {
    if (e) {
      if (e.flags & ConstantData.ObjFlags.SEDO_TextOnly) return !1;
      if (e.IsSwimlane()) return !1
    }
    return !0
  }


  ZListPreserve(e) {
    var t = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !0),
      a = t.layers,
      r = t.activelayer,
      i = a[r];
    if (i.flags & ConstantData.LayerFlags.SDLF_NoAdd || i.flags & e) {
      var n,
        o = a.length;
      for (n = 0; n < o; n++) if (0 == (a[n].flags & ConstantData.LayerFlags.SDLF_NoAdd)) {
        this.MakeLayerActiveByIndex(n),
          T3Gv.optManager.DirtyObjectsOnLayer(r, i),
          T3Gv.optManager.DirtyObjectsOnLayer(n, a[n]),
          T3Gv.optManager.RenderDirtySVGObjects(),
          i = a[n];
        break
      }
    }
    return i.zList
  }

  IsTopMostVisibleLayer() {
    return this.GetObjectPtr(this.theLayersManagerBlockID, !1).activelayer == this.GetTopMostVisibleLayer()
  }

  GetTopMostVisibleLayer() {
    var e,
      t = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
      a = t.layers,
      r = t.nlayers;
    for (e = 0; e < r; ++e) if (a[e].flags & ConstantData.LayerFlags.SDLF_Visible) return e;
    return - 1
  }

  // RenderLastSVGObject = function (e) {
  //   T3Gv.optManager.fromOverlayLayer;
  //   var t = this.ActiveLayerZList(),
  //     a = t.length;
  //   this.AddSVGObject(undefined, t[a - 1], !1, e),
  //     e &&
  //     this.RenderAllSVGSelectionStates()
  // }


  RenderLastSVGObject(shouldRenderSelectionStates) {

    console.log('= Opt RenderLastSVGObject shouldRenderSelectionStates', shouldRenderSelectionStates);

    const isfromOverlayLayer = T3Gv.optManager.fromOverlayLayer;
    const activeLayerZList = this.ActiveLayerZList();
    const lastObjectId = activeLayerZList[activeLayerZList.length - 1];

    this.AddSVGObject(undefined, lastObjectId, false, shouldRenderSelectionStates);

    if (shouldRenderSelectionStates) {
      this.RenderAllSVGSelectionStates();
    }
  }

  ActiveLayerZList() {
    var e = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1);
    return e.layers[e.activelayer].zList
  }

  AddSVGObject(e, objectId, a, r) {


    // e t a r
    //
    console.log('= Opt AddSVGObject 1 e', e);
    console.log('= Opt AddSVGObject 2 t', objectId);
    console.log('= Opt AddSVGObject 3 a', a);
    console.log('= Opt AddSVGObject 4 r', r);



    /*
      var i = this.svgDoc,
        n = T3Gv.objectStore.GetObject(t);
      if (n) {
        var o = n.Data;
        o.tag = t;
        var s,
          l = null;
        if (
          (l = o.CreateShape(i, r)) &&
          l.SetID(t),
          o.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CONNECTOR &&
          (r = !1),
          a ? (
            s = this.svgObjectLayer.GetElementByID(t),
            l &&
            this.svgObjectLayer.AddElement(l, e),
            s &&
            this.svgObjectLayer.RemoveElement(s)
          ) : l &&
          this.svgObjectLayer.AddElement(l),
          l &&
          o.PostCreateShapeCallback(i, l, r),
          l
        )
          try {
            l.SetRotation(
              o.RotationAngle,
              o.Frame.x + o.Frame.width / 2,
              o.Frame.y + o.Frame.height / 2
            )
          } catch (e) {
            console.log('ListManager.LM.prototype.AddSVGObject 5 =========== SetRotation', e);
          }
        if (null !== l) if (r) {
          var S = l.DOMElement(),
            c = Hammer(S);
          GlobalDataSDJS_LM_ShapeTap = Evt_ShapeTapFactory(o),
            c.on('tap', GlobalDataSDJS_LM_ShapeTap),
            T3Gv.docHandler.IsReadOnly() ||
            (
              T3Gv.Evt_ShapeDragStart = Evt_ShapeDragStartFactory(o),
              c.on('dragstart', T3Gv.Evt_ShapeDragStart),
              this.isMobilePlatform &&
              (
                T3Gv.SDJS_LM_ShapeHold = Evt_ShapeHoldFactory(o),
                c.on('hold', T3Gv.SDJS_LM_ShapeHold)
              ),
              (o.AllowTextEdit() || o.AllowDoubleClick()) &&
              (
                T3Gv.SDJS_LM_ShapeDoubleTap = Evt_ShapeDoubleTapFactory(o),
                c.on('doubletap', T3Gv.SDJS_LM_ShapeDoubleTap)
              ),
              l.SetEventProxy(c)
            ),
            this.isMobilePlatform ||
            T3Gv.docHandler.IsReadOnly() ||
            l.svgObj.mouseover(
              (
                function (e) {
                  var t = this.SDGObj.GetID(),
                    a = T3Gv.optManager.GetObjectPtr(t, !1);
                  a &&
                    a.SetRolloverActions(i, l, e)
                }
              )
            ),
            this.isGestureCapable &&
            (
              c.on('pinchin', Evt_WorkAreaHammerPinchIn),
              c.on('pinchout', Evt_WorkAreaHammerPinchOut),
              c.on('transformend', Evt_WorkAreaHammerPinchEnd)
            ),
            o.RegisterForDataDrop(l)
        } else l.SetEventBehavior(ConstantData.EventBehavior.NONE)

      }
      else
        try {
          throw Error('theGraphicsObject is null, aborting.')
        } catch (e) {
          console.log('ListManager.LM.prototype.AddSVGObject 6 =========== theGraphicsObject', e);

        }

        */



    // debugger
    var svgDoc = this.svgDoc;
    var drw = T3Gv.objectStore.GetObject(objectId);

    console.log('= Opt AddSVGObject n', drw);
    console.log('= Opt AddSVGObject n.data', drw.Data);

    if (drw) {
      var drwData = drw.Data;
      drwData.tag = objectId;
      var s;
      var shapeContainer = null;

      // debugger

      shapeContainer = drwData.CreateShape(svgDoc, r);
      if (shapeContainer) {
        shapeContainer.SetID(objectId);
        if (drwData.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CONNECTOR) {
          r = false;
        }

        if (a) {
          s = this.svgObjectLayer.GetElementByID(objectId);
          if (shapeContainer) {
            this.svgObjectLayer.AddElement(shapeContainer, e);
          }
          if (s) {
            this.svgObjectLayer.RemoveElement(s);
          }
        } else if (shapeContainer) {
          this.svgObjectLayer.AddElement(shapeContainer);
        }

        if (shapeContainer) {
          drwData.PostCreateShapeCallback(svgDoc, shapeContainer, r);
        }

        try {
          shapeContainer.SetRotation(
            drwData.RotationAngle,
            drwData.Frame.x + drwData.Frame.width / 2,
            drwData.Frame.y + drwData.Frame.height / 2
          );
        } catch (e) {

          console.log('= Opt AddSVGObject SetRotation', e);
          throw e
        }

        if (shapeContainer !== null) {
          if (r) {
            var S = shapeContainer.DOMElement(),
              c = Hammer(S);

            var SDJS_LM_ShapeTap = EvtUtil.Evt_ShapeTapFactory(drwData);
            c.on('tap', SDJS_LM_ShapeTap);

            if (!T3Gv.docHandler.IsReadOnly()) {
              T3Gv.Evt_ShapeDragStart = EvtUtil.Evt_ShapeDragStartFactory(drwData);
              c.on('dragstart', T3Gv.Evt_ShapeDragStart);

              if (this.isMobilePlatform) {
                T3Gv.SDJS_LM_ShapeHold = EvtUtil.Evt_ShapeHoldFactory(drwData);
                c.on('hold', T3Gv.SDJS_LM_ShapeHold);
              }

              if (drwData.AllowTextEdit() || drwData.AllowDoubleClick()) {
                T3Gv.SDJS_LM_ShapeDoubleTap = EvtUtil.Evt_ShapeDoubleTapFactory(drwData);
                c.on('doubletap', T3Gv.SDJS_LM_ShapeDoubleTap);
              }

              shapeContainer.SetEventProxy(c);
            }

            if (!this.isMobilePlatform && !T3Gv.docHandler.IsReadOnly()) {
              shapeContainer.svgObj.mouseover(function (e) {
                var t = this.SDGObj.GetID(),
                  a = T3Gv.optManager.GetObjectPtr(t, false);
                if (a) {
                  a.SetRolloverActions(svgDoc, shapeContainer, e);
                }
              });
            }

            // if (this.isGestureCapable) {
            //   c.on('pinchin', Evt_WorkAreaHammerPinchIn);
            //   c.on('pinchout', Evt_WorkAreaHammerPinchOut);
            //   c.on('transformend', Evt_WorkAreaHammerPinchEnd);
            // }



            drwData.RegisterForDataDrop(shapeContainer);
          } else {
            shapeContainer.SetEventBehavior(ConstantData.EventBehavior.NONE);
          }
        }
      }
    } else {
      try {
        throw new Error('theGraphicsObject is null, aborting.');
      } catch (e) {
        console.log('ListManager.LM.prototype.AddSVGObject 6 =========== theGraphicsObject', e);
        throw e;
      }
    }
  }

  NoteIsShowing(e, t) {
    if (this.curNoteShape === e) if (t) {
      if (
        this.curNoteTableCell &&
        this.curNoteTableCell.uniqueid === t.uniqueid
      ) return !0
    } else if (null == this.curNoteTableCell) return !0;
    return !1
  }

  DoAutoGrowDrag(e) {
    // console.log('5 ListManager.LM.prototype.DoAutoGrowDrag e=>', e);
    var t;
    e.x < 0 &&
      (e.x = 0),
      e.y < 0 &&
      (e.y = 0);
    var a = T3Gv.objectStore.GetObject(T3Gv.optManager.theSEDSessionBlockID).Data;
    return T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto ? (e.x > a.dim.x && (e.x = a.dim.x), e.y > a.dim.y && (e.y = a.dim.y), e) : (
      e.x > a.dim.x ? (
        T3Gv.optManager.dragGotAutoResizeOldX.push(a.dim.x),
        t = {
          x: (
            a = T3Gv.objectStore.PreserveBlock(T3Gv.optManager.theSEDSessionBlockID).Data
          ).dim.x + T3Gv.optManager.theContentHeader.Page.papersize.x - (
              T3Gv.optManager.theContentHeader.Page.margins.left + T3Gv.optManager.theContentHeader.Page.margins.right
            ),
          y: a.dim.y
        },
        T3Gv.optManager.UpdateEdgeLayers([], a.dim, t),
        a.dim.x += T3Gv.optManager.theContentHeader.Page.papersize.x - (
          T3Gv.optManager.theContentHeader.Page.margins.left + T3Gv.optManager.theContentHeader.Page.margins.right
        ),
        T3Gv.optManager.inAutoScroll = !0,
        T3Gv.optManager.ResizeSVGDocument(),
        T3Gv.optManager.inAutoScroll = !1,
        T3Gv.optManager.dragGotAutoResizeRight = !0
      ) : T3Gv.optManager.dragGotAutoResizeRight &&
      e.x < T3Gv.optManager.dragGotAutoResizeOldX.slice(- 1).pop() &&
      (
        a = T3Gv.objectStore.PreserveBlock(T3Gv.optManager.theSEDSessionBlockID).Data,
        t = {
          x: T3Gv.optManager.dragGotAutoResizeOldX.pop(),
          y: a.dim.y
        },
        T3Gv.optManager.UpdateEdgeLayers([], a.dim, t),
        a.dim.x = t.x,
        T3Gv.optManager.inAutoScroll = !0,
        T3Gv.optManager.ResizeSVGDocument(),
        T3Gv.optManager.inAutoScroll = !1,
        0 === T3Gv.optManager.dragGotAutoResizeOldX.length &&
        (T3Gv.optManager.dragGotAutoResizeRight = !1)
      ),
      e.y > a.dim.y ? (
        T3Gv.optManager.dragGotAutoResizeOldY.push(a.dim.y),
        t = {
          x: (
            a = T3Gv.objectStore.PreserveBlock(T3Gv.optManager.theSEDSessionBlockID).Data
          ).dim.x,
          y: a.dim.y + T3Gv.optManager.theContentHeader.Page.papersize.y - (
            T3Gv.optManager.theContentHeader.Page.margins.top + T3Gv.optManager.theContentHeader.Page.margins.bottom
          )
        },
        T3Gv.optManager.UpdateEdgeLayers([], a.dim, t),
        a.dim.y += T3Gv.optManager.theContentHeader.Page.papersize.y - (
          T3Gv.optManager.theContentHeader.Page.margins.top + T3Gv.optManager.theContentHeader.Page.margins.bottom
        ),
        T3Gv.optManager.inAutoScroll = !0,
        T3Gv.optManager.ResizeSVGDocument(),
        T3Gv.optManager.inAutoScroll = !1,
        T3Gv.optManager.dragGotAutoResizeBottom = !0
      ) : T3Gv.optManager.dragGotAutoResizeBottom &&
      e.y < T3Gv.optManager.dragGotAutoResizeOldY.slice(- 1).pop() &&
      (
        t = {
          x: (
            a = T3Gv.objectStore.PreserveBlock(T3Gv.optManager.theSEDSessionBlockID).Data
          ).dim.x,
          y: T3Gv.optManager.dragGotAutoResizeOldY.pop()
        },
        T3Gv.optManager.UpdateEdgeLayers([], a.dim, t),
        a.dim.y = t.y,
        T3Gv.optManager.inAutoScroll = !0,
        T3Gv.optManager.ResizeSVGDocument(),
        T3Gv.optManager.inAutoScroll = !1,
        0 === T3Gv.optManager.dragGotAutoResizeOldY.length &&
        (T3Gv.optManager.dragGotAutoResizeBottom = !1)
      ),
      e
    )
  }


  IsRectEnclosed(e, t) {
    return t.x >= e.x &&
      t.x + t.width <= e.x + e.width &&
      t.y >= e.y &&
      t.y + t.height <= e.y + e.height
  }

  GetLengthInRulerUnits(e, t, a, r) {

    var i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
      n = '',
      o = 0,
      s = 0,
      l = 0,
      S = 0,
      c = 0,
      u = 0,
      p = 0,
      d = '',
      D = 1,
      g = (Math.pow(10, T3Gv.docHandler.rulerSettings.dp), !1);
    r &&
      (
        g = (
          r & ConstantData.DimensionFlags.SED_DF_ShowFractionalInches
        ) > 0
      );
    var h = !1;
    if (
      r &&
      (
        h = (r & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches) > 0
      ),
      a &&
      (
        a *= 100,
        T3Gv.docHandler.rulerSettings.useInches ||
        (a /= ConstantData.Defines.MetricConv),
        e -= a
      ),
      T3Gv.docHandler.rulerSettings.showpixels
    ) return n = Math.round(e);
    if (
      S = this.GetLengthInUnits(e),
      T3Gv.docHandler.rulerSettings.useInches &&
      T3Gv.docHandler.rulerSettings.units == ConstantData.RulerUnits.SED_Feet &&
      !t
    ) {
      if (
        S < 0 &&
        (D = - 1, S = - S),
        s = 12 * (S - (o = Math.floor(S / 1))),
        g &&
        (l = s - (c = Math.floor(s / 1)), s = c),
        12 == Number(s).toFixed() &&
        (s = 0, o++),
        h &&
        (s += 12 * o, o = 0),
        l > 0 &&
        (
          u = l / (p = this.GetFractionStringGranularity(i)),
          (u = Math.round(u)) >= 1 / p &&
          (u = 0, 12 != ++s || h || (o++, s = 0)),
          u > 0
        )
      ) {
        for (; u % 2 == 0;) u /= 2,
          p *= 2;
        d = u + '/' + Math.floor(1 / p / 1)
      }
      0 !== (o *= D) &&
        (n = o + '\''),
        d.length > 0 ? (n += ' ' + Number(s).toFixed(), d.length > 0 && (n += ' ' + d), n += '"') : s > 0 &&
          (s = Math.round(s)) > 0 &&
          (n += ' ' + s + '"')
    } else (
      T3Gv.docHandler.rulerSettings.units == ConstantData.RulerUnits.SED_Inches ||
      T3Gv.docHandler.rulerSettings.units == ConstantData.RulerUnits.SED_M ||
      T3Gv.docHandler.rulerSettings.units == ConstantData.RulerUnits.SED_Cm ||
      T3Gv.docHandler.rulerSettings.units == ConstantData.RulerUnits.SED_Mm
    ) &&
      (n = S.toFixed(T3Gv.docHandler.rulerSettings.dp));
    return n
  }

  GetLengthInUnits(e, t) {

    return !0,
      e * this.GetToUnits()
  }


  GetToUnits() {

    var e = T3Gv.docHandler.DocObject().GetWorkArea().docDpi,
      t = 0;
    return e = T3Gv.docHandler.rulerSettings.major,
      t = T3Gv.docHandler.rulerSettings.majorScale / e,
      T3Gv.docHandler.rulerSettings.useInches ||
      (t *= T3Gv.docHandler.rulerSettings.metricConv),
      t
  }

  CancelModalOperation() {
    switch (this.currentModalOperation) {
      case ConstantData2.ModalOperations.NONE:
        break;
      case ConstantData2.ModalOperations.STAMP:
        this.CancelObjectStamp(!0);
        break;
      case ConstantData2.ModalOperations.STAMPTEXTONTAP:
        this.CancelObjectStampTextOnTap(!0);
        break;
      case ConstantData2.ModalOperations.DRAGDROP:
        this.CancelObjectDragDrop(!0);
        break;
      case ConstantData2.ModalOperations.DRAW:
        this.CancelObjectDraw();
        break;
      case ConstantData2.ModalOperations.FORMATPAINTER:
        this.SetFormatPainter(!0, !1);
        break;
      case ConstantData2.ModalOperations.ADDCORNER:
        T3Gv.gBusinessManager &&
          T3Gv.gBusinessManager.AddCorner &&
          this.ResetHammerGesture(
            'dragstart',
            T3Gv.gBusinessManager.AddCorner,
            T3Gv.Evt_ShapeDragStart
          );
        break;
      case ConstantData2.ModalOperations.SPLITWALL:
        T3Gv.gBusinessManager &&
          T3Gv.gBusinessManager.SplitWall &&
          (
            this.ResetHammerGesture(
              'dragstart',
              T3Gv.gBusinessManager.SplitWall,
              T3Gv.Evt_ShapeDragStart
            ),
            T3Gv.optManager.SetEditMode(ConstantData.EditState.DEFAULT)
          )
    }
  }

  CancelObjectDraw() {
    var e = this.GetObjectPtr(this.actionStoredObjectId, !1),
      t = e instanceof PolyLine ||
        e instanceof PolyLineContainer;
    this.SetModalOperation(ConstantData2.ModalOperations.NONE),
      this.LM_StampPostRelease(!1),
      this.actionStoredObjectId >= 0 &&
        !t ? (
        this.Undo(!0),
        this.ClearFutureUndoStates(),
        this.actionStoredObjectId = - 1,
        this.dragBBoxList = [],
        this.dragElementList = [],
        this.actionSvgObject = null
      ) : this.GetObjectPtr(this.actionStoredObjectId, !0),
      this.SetEditMode(ConstantData.EditState.DEFAULT),
      T3Gv.optManager.UnbindDragDropOrStamp(),
      this.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDragStart),
      this.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick),
      e &&
      e.CancelObjectDraw(),
      T3Gv.gBusinessManager.CancelObjectDraw &&
      T3Gv.gBusinessManager.CancelObjectDraw()

      ,
      Commands.MainController.Selection.SetSelectionTool(Resources.Tools.Tool_Select, !1)
  }


  LM_StampPostRelease(e) {
    var t,
      a = !1;
    this.LinkParams &&
      this.LinkParams.HiliteConnect >= 0 &&
      (
        this.HiliteConnect(
          T3Gv.optManager.LinkParams.HiliteConnect,
          this.LinkParams.ConnectPt,
          !1,
          !1,
          this.dragTargetId,
          this.LinkParams.HiliteInside
        ),
        this.LinkParams.HiliteConnect = - 1,
        this.LinkParams.HiliteInsidet = null
      ),
      this.LinkParams &&
      this.LinkParams.HiliteJoin >= 0 &&
      (
        this.HiliteConnect(
          T3Gv.optManager.LinkParams.HiliteJoin,
          this.LinkParams.ConnectPt,
          !1,
          !0,
          this.dragTargetId,
          null
        ),
        this.LinkParams.HiliteJoin = - 1
      ),
      this.SetEditMode(ConstantData.EditState.DEFAULT),
      e &&
      (
        this.LinkParams &&
          this.LinkParams.JoinIndex >= 0 ? this.PolyLJoin(
            this.LinkParams.JoinIndex,
            this.LinkParams.JoinData,
            this.dragTargetId,
            this.LinkParams.JoinSourceData,
            !1
          ) : this.LinkParams &&
          (
            this.LinkParams.ConnectIndex >= 0 ||
            this.LinkParams.InitialHook >= 0
          ) &&
        (
          GlobalDatagFlowChartManager &&
          (
            a = GlobalDatagFlowChartManager.FlowChartHook(
              this.actionStoredObjectId,
              this.LinkParams.InitialHook,
              this.LinkParams.ConnectIndex,
              this.LinkParams.HookIndex,
              this.LinkParams.ConnectPt
            )
          ),
          a ||
          (
            this.LinkParams.ConnectHookFlag === ConstantData.HookFlags.SED_LC_AutoInsert ? this.SD_AutoInsertShape(this.actionStoredObjectId, this.LinkParams.ConnectIndex) : this.LinkParams.ConnectHookFlag === ConstantData.HookFlags.SED_LC_HookReverse ? this.LM_ReverseHook(this.actionStoredObjectId) : 0 !== (
              t = this.UpdateHook(
                this.actionStoredObjectId,
                this.LinkParams.InitialHook,
                this.LinkParams.ConnectIndex,
                this.LinkParams.HookIndex,
                this.LinkParams.ConnectPt,
                this.LinkParams.ConnectInside
              )
            ) &&
              void 0 !== t ||
              this.SetLinkFlag(
                this.LinkParams.ConnectIndex,
                ConstantData.LinkFlags.SED_L_MOVE
              )
          )
        )
      ),
      this.LinkParams = null
  }

  Undo(e, t) {
    //debugger
    if (t) T3Gv.optManager.CancelModalOperation();
    else if (
      this.currentModalOperation != ConstantData2.ModalOperations.NONE
    ) return !1;
    if (null === T3Gv.stateManager)
      //    throw new SDJSError({
      //   source: 'ListManager.Undo',
      //   message: 'stateManager is null'
      // });
      throw new Error('stateManager is null');
    if (
      this.NudgeOpen &&
      T3Gv.optManager.CloseOpenNudge(),
      T3Gv.stateManager.CurrentStateID <= 0
    ) return !1;
    var a = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
    var r = a.EnableSpellCheck;
    var i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1);
    var n = 0 === a.RecentSymbols.length;
    var o = i.layers[i.activelayer].layertype;
    var s = this.GetObjectPtr(this.theTEDSessionBlockID, !1);

    var check = - 1 != s.theActiveTextEditObjectID &&
      s.theTELastOp !== ConstantData.TELastOp.INIT &&
      s.theTELastOp !== ConstantData.TELastOp.TIMEOUT &&
      s.theTELastOp !== ConstantData.TELastOp.SELECT;
    if (check) {
      (this.FlushTextToLMBlock(), this.PreserveUndoState(!1));
    }
    // var l = SDJS.Editor.IsStateOpen();


    /*
    var l = Utils1.IsStateOpen();
    e &&
      (
        T3Gv.CURRENT_SEQ_OBJECT_ID = T3Gv.stateManager.States[T3Gv.stateManager.CurrentStateID].CURRENT_SEQ_OBJECT_ID
      ),
      T3Gv.stateManager.RestorePrevState(),
      e ||
      T3Gv.stateManager.AddToHistoryState();
    */

    var isStateOpen = Utils1.IsStateOpen();

    if (e) {
      T3Gv.CURRENT_SEQ_OBJECT_ID = T3Gv.stateManager.States[T3Gv.stateManager.CurrentStateID].CURRENT_SEQ_OBJECT_ID;
    }

    T3Gv.stateManager.RestorePrevState();

    if (!e) {
      T3Gv.stateManager.AddToHistoryState();
    }

    /*
     var S = T3Gv.stateManager.CurrentStateID;
     this.RebuildURLs(T3Gv.stateManager.CurrentStateID + 1, !1),
       this.ResizeSVGDocument(),
       this.UpdateLineHops(!0),
       r !== (
         a = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1)
       ).EnableSpellCheck &&
       SDUI.Commands.MainController.Document.SetSpellCheck(a.EnableSpellCheck, !1);
   */

    var currentStateID = T3Gv.stateManager.CurrentStateID;
    this.RebuildURLs(currentStateID + 1, false);
    this.ResizeSVGDocument();
    this.UpdateLineHops(true);

    var sessionBlock = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, false);
    if (r !== sessionBlock.EnableSpellCheck) {
      SDUI.Commands.MainController.Document.SetSpellCheck(sessionBlock.EnableSpellCheck, false);
    }

    /*
    var c = T3Gv.docHandler.rulerSettings;

    T3Gv.docHandler.RulersNotEqual(a.rulerSettings, c) &&
      T3Gv.docHandler.SetRulers(a.rulerSettings, !0),
      T3Gv.docHandler.PagesNotEqual(a.Page, T3Gv.optManager.theContentHeader.Page) &&
      (
        T3Gv.optManager.theContentHeader.Page = Utils1.DeepCopy(a.Page)
      );
      */

    var rulerSettings = T3Gv.docHandler.rulerSettings;

    if (T3Gv.docHandler.RulersNotEqual(a.rulerSettings, rulerSettings)) {
      T3Gv.docHandler.SetRulers(a.rulerSettings, true);
    }

    if (T3Gv.docHandler.PagesNotEqual(a.Page, T3Gv.optManager.theContentHeader.Page)) {
      T3Gv.optManager.theContentHeader.Page = Utils1.DeepCopy(a.Page);
    }

    /*
      var u = this.GetObjectPtr(this.theSelectedListBlockID, !1);
      if (
        - 1 != (s = this.GetObjectPtr(this.theTEDSessionBlockID, !1)).theActiveOutlineObjectID &&
        0 === u.length
      ) {
        var p = [];
        p.push(s.theActiveOutlineObjectID),
          this.SelectObjects(p, !1, !1)
      }
      this.TEUnregisterEvents(!0),
        T3Gv.optManager.InUndo = !0,
        this.RenderAllSVGObjects(),
        T3Gv.optManager.InUndo = !1;
      var d = this.GetObjectPtr(this.theSEDSessionBlockID, !1);
      */


    var selectedList = this.GetObjectPtr(this.theSelectedListBlockID, false);
    var tedSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);

    if (tedSession.theActiveOutlineObjectID !== -1 && selectedList.length === 0) {
      var activeOutlineObjects = [];
      activeOutlineObjects.push(tedSession.theActiveOutlineObjectID);
      this.SelectObjects(activeOutlineObjects, false, false);
    }

    this.TEUnregisterEvents(true);
    T3Gv.optManager.InUndo = true;
    this.RenderAllSVGObjects();
    T3Gv.optManager.InUndo = false;

    var sedSession = this.GetObjectPtr(this.theSEDSessionBlockID, false);

    // Double ===
    /*
    Resources.CurrentTheme.Name !== d.CurrentTheme &&
      (new SDUI.ThemeController).SwitchTheme(d.CurrentTheme);
      */

    /*
      - 1 != s.theActiveTextEditObjectID &&
        this.ResetActiveTextEditAfterUndo();
        */
    if (s.theActiveTextEditObjectID !== -1) {
      this.ResetActiveTextEditAfterUndo();
    }

    /*
      var D = T3Gv.optManager.GetTargetSelect();
      if (D >= 0) {
        var g = this.GetObjectPtr(D, !1),
          h = null;
        g &&
          (h = g.GetDimensionsForDisplay(), this.ShowFrame(!0)),
          T3Gv.optManager.UpdateDisplayCoordinates(h, null, null, g)
      } else this.ShowFrame(!1);
       */


    var targetSelect = T3Gv.optManager.GetTargetSelect();
    if (targetSelect >= 0) {
      var selectedObject = this.GetObjectPtr(targetSelect, false);
      var dimensions = null;
      if (selectedObject) {
        dimensions = selectedObject.GetDimensionsForDisplay();
        this.ShowFrame(true);
      }
      T3Gv.optManager.UpdateDisplayCoordinates(dimensions, null, null, selectedObject);
    } else {
      this.ShowFrame(false);
    }


    /*
      if (
        o != (
          i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1)
        ).layers[i.activelayer].layertype
      ) switch (i.layers[i.activelayer].layertype) {
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
          */

    if (o != (i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, false)).layers[i.activelayer].layertype) {
      switch (i.layers[i.activelayer].layertype) {
        case ConstantData.LayerTypes.SD_LAYERT_MINDMAP:
          if (SDUI.AppSettings.NewUI) {
            SDJS_init_business_manager('TASKMAP');
            SDUI.Commands.MainController.SmartPanels.LoadTools(gTaskMapManager);
          } else if (ConstantData.DocumentContext.CurrentSmartPanel !== 'sp-mind_maps') {
            SDUI.Commands.MainController.LoadSmartPanel('sp-mind_maps');
            SDJS_init_business_manager('MINDMAP');
          }
          break;
        case ConstantData.LayerTypes.SD_LAYERT_GANTT:
          if (SDUI.AppSettings.NewUI) {
            SDJS_init_business_manager('PROJECTCHART');
            SDUI.Commands.MainController.SmartPanels.LoadTools(gProjectChartManager);
          } else if (ConstantData.DocumentContext.CurrentSmartPanel !== 'sp-project_chart') {
            SDUI.Commands.MainController.LoadSmartPanel('sp-project_chart');
            SDJS_init_business_manager('PROJECTCHART');
          }
          break;
      }
    }

    /*
    return
    // ListManager.Trello.TrelloUpdateAllCardsFromTasks(!0, S),
    this.UpdateSelectionAttributes(u),

      // SDUI.Commands.MainController.SmartPanels.IdleSmartPanel(),
      // SDUI.Commands.MainController.Document.IdleLayersTabs(),
      T3Gv.optManager.CommentIdleTab(),
      T3Gv.optManager.Comment_UpdatePanel(null),
      T3Gv.optManager.Comment_UpdateDropDown(),
      // SDUI.Commands.MainController.Symbols.RecentSymbols_DisplaySymbols(a.RecentSymbols, n),
      l ||
      SDF.SaveChangedBlocks(S, - 1),
      !0
      */



    // ListManager.Trello.TrelloUpdateAllCardsFromTasks(!0, S),
    this.UpdateSelectionAttributes(selectedList);

    // SDUI.Commands.MainController.SmartPanels.IdleSmartPanel(),
    // SDUI.Commands.MainController.Document.IdleLayersTabs(),
    T3Gv.optManager.CommentIdleTab();
    T3Gv.optManager.Comment_UpdatePanel(null);
    T3Gv.optManager.Comment_UpdateDropDown();
    // SDUI.Commands.MainController.Symbols.RecentSymbols_DisplaySymbols(a.RecentSymbols, n),
    if (!isStateOpen) {
      SDF.SaveChangedBlocks(currentStateID, -1);
    }
    return !0
  }

  CommentIdleTab(e) {
    var t = this.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
      a = this.GetObjectPtr(t.CommentListID, !1);
    null == a ||
      0 === a.threads.length ? this.CommentShowTab(!1) : this.CommentShowTab(!0)
  }


  CommentShowTab(e) {
    // var t = Resources.Controls.SmartPanel_GutterPanel.CommentTab.GetControl(!0);
    // t &&
    //   (e ? t.removeClass('hide') : t.addClass('hide'))
  }


  Comment_UpdateDropDown() {
    // var e = Resources.Controls.Dropdowns.CommentPopup.Control;
    // e &&
    //   'block' === e[0].style.display &&
    //   T3Gv.optManager.Comment_BuildDropDown()

    // Double ===
  }



  Redo_DeleteURLs() {
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
        (r = T3Gv.stateManager.CurrentStateID) + 1 >= T3Gv.stateManager.States.length
      )
    ) for (e = T3Gv.stateManager.States[r + 1].StoredObjects.length, t = 0; t < e; t++) (a = T3Gv.stateManager.States[r + 1].StoredObjects[t]).Type === ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT ? a.StateOperationTypeID === Globals.StateOperationType.DELETE ? (i = T3Gv.objectStore.GetObject(a.ID)) &&
      (
        n = i.Data,
        this.IsBlobURL(n.ImageURL) &&
        this.DeleteURL(n.ImageURL)
      ) : (i = T3Gv.objectStore.GetObject(a.ID)) &&
    (
      n = i.Data,
      this.IsBlobURL(n.ImageURL) &&
      a.Data.ImageURL !== n.ImageURL &&
      this.DeleteURL(n.ImageURL)
    ) : a.Type === ConstantData.StoredObjectType.TABLE_OBJECT &&
    (
      a.StateOperationTypeID === Globals.StateOperationType.DELETE ? (o = T3Gv.objectStore.GetObject(a.ID)) &&
        (s = o.Data, this.Table_DeleteURLs(s)) : (o = T3Gv.objectStore.GetObject(a.ID)) &&
      (s = o.Data, l = a.Data, this.Table_RefreshURLs(s, l, !0))
    )
  }



  ClearFutureUndoStates() {
    if (null === T3Gv.stateManager) throw new Error('stateManager is null');
    // new SDJSError({
    //   source: 'ListManager.ClearFutureUndoStates',
    //   message: 'stateManager is null'
    // });
    T3Gv.stateManager.ClearFutureUndoStates()
  }

  UnbindDragDropOrStamp() {
    T3Gv.optManager.mainAppHammer &&
      (
        T3Gv.optManager.mainAppHammer.dispose(),
        T3Gv.optManager.mainAppHammer = null
      )
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
    T3Gv.optManager.FixAnyCircularHooks();
    var E = this.GetObjectPtr(this.theSEDSessionBlockID, !1),
      w = T3Gv.docHandler.documentConfig.enableSnap;
    for (
      T3Gv.docHandler.documentConfig.enableSnap = !1,
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
          T3Gv.optManager.SetLinkFlag(v.topshape, ConstantData.LinkFlags.SED_L_MOVE),
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
      for (this.DoAutoGrowDragInit(), t = G.length, a = 0; a < t; a++) if (
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
    return T3Gv.docHandler.documentConfig.enableSnap = w,
      0
  }


  FixAnyCircularHooks(e) {
    const t = e ? [
      e.BlockID
    ] : function () {
      const e = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLinksBlockID, !1);
      let t = [];
      const a = e.length;
      for (let r = 0; r < a; r++) t.includes(e[r].hookid) ||
        t.push(e[r].hookid);
      return t
    }(),
      a = [],
      r = t.length;
    for (let e = 0; e < r; e++) i(a, t[e]);
    function i(e, t, a = []) {
      const r = T3Gv.optManager.GetObjectPtr(t, !1);
      if (a.push(t), !r) return;
      const s = r.hooks.length;
      for (let l = 0; l < s; l++) a.indexOf(r.hooks[l].objid) >= 0 ? o(e, t, r.hooks[l].objid) : i(e, r.hooks[l].objid, n(a))
    }
    function n(e) {
      let t = [];
      const a = e.length;
      for (let r = 0; r < a; r++) t[r] = e[r];
      return t
    }
    function o(e, t, a) {
      e.some((e => e.objectId === t && e.hookObjectId === a)) ||
        e.push({
          objectId: t,
          hookObjectId: a
        })
    }
    !function (e) {
      const t = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLinksBlockID, !1),
        a = e.length;
      for (let r = 0; r < a; r++) {
        const a = T3Gv.optManager.GetObjectPtr(e[r].objectId, !0),
          i = T3Gv.optManager.GetObjectPtr(e[r].hookObjectId);
        if (i instanceof Connector) {
          T3Gv.optManager.DeleteObjects([i.BlockID], !1);
          continue
        }
        a.hooks = a.hooks.filter((t => t.objid != e[r].hookObjectId));
        const n = T3Gv.optManager.FindExactLink(t, e[r].hookObjectId, e[r].objectId);
        n < 0 ||
          (
            t[n].flags = Utils2.SetFlag(t[n].flags, ConstantData.LinkFlags.SED_L_DELT, !0)
          )
      }
    }(a)
  }


  PostObjectDraw(e) {
    var t = [],
      a = T3Gv.objectStore.GetObject(this.actionStoredObjectId);
    if (null != a) return null == a.Data.Frame ||
      a.Data.Frame.width < 10 &&
      a.Data.Frame.height < 10 ? (this.Undo(!0), this.ClearFutureUndoStates()) : (
      a.Data.sizedim.width = a.Data.Frame.width,
      a.Data.sizedim.height = a.Data.Frame.height,
      T3Gv.stateManager.ReplaceInCurrentState(this.actionStoredObjectId, a),
      a.Data.objecttype !== ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL &&
      t.push(this.actionStoredObjectId),
      this.IsTopMostVisibleLayer() ||
      this.MarkAllAllVisibleHigherLayerObjectsDirty(),
      this.AddToDirtyList(this.actionStoredObjectId)
    ),
      this.PostObjectDrawCommon(t, e),
      t.length;
    this.PostObjectDrawCommon(null, e)
  }


  AddToDirtyList(e, t) {
    this.theDirtyList.indexOf(e) < 0 ? (this.theDirtyList.push(e), this.theDirtyListMoveOnly[e] = !!t) : t ||
      (this.theDirtyListMoveOnly[e] = !1)
  }

  PostObjectDrawCommon(e, t) {
    // var a = Collab.AreMessagesLocked();
    // Collab.LockMessages(),
    this.CompleteOperation(e),
      this.ResetObjectDraw(),
      this.UpdateTools(),
      T3Gv.gBusinessManager.PostObjectDrawHook &&
      T3Gv.gBusinessManager.PostObjectDrawHook(t),
      this.actionStoredObjectId = - 1,
      this.actionSvgObject = null

    // ,
    // a ||
    // (Collab.UnLockMessages(), Collab.UnBlockMessages())
  }



  DynamicSnaps_RemoveGuides(e) {
    var t,
      a,
      r,
      i;
    if (e) for (t in e) if (e[t]) {
      var n = t + 'label',
        o = t + 'back',
        s = T3Gv.optManager.svgHighlightLayer.GetElementByID(t),
        l = T3Gv.optManager.svgHighlightLayer.GetElementByID(n),
        S = T3Gv.optManager.svgHighlightLayer.GetElementByID(o);
      if (
        s &&
        T3Gv.optManager.svgHighlightLayer.RemoveElement(s),
        l &&
        T3Gv.optManager.svgHighlightLayer.RemoveElement(l),
        S &&
        T3Gv.optManager.svgHighlightLayer.RemoveElement(S),
        e[t].otherhits
      ) for (a = e[t].otherhits.length, r = 0; r < a; r++) n = t + (i = e[t].otherhits[r]).ID.toString() + 'label',
        o = t + i.ID.toString() + 'back',
        s = T3Gv.optManager.svgHighlightLayer.GetElementByID(t + i.ID.toString()),
        l = T3Gv.optManager.svgHighlightLayer.GetElementByID(n),
        S = T3Gv.optManager.svgHighlightLayer.GetElementByID(o),
        s &&
        T3Gv.optManager.svgHighlightLayer.RemoveElement(s),
        l &&
        T3Gv.optManager.svgHighlightLayer.RemoveElement(l),
        S &&
        T3Gv.optManager.svgHighlightLayer.RemoveElement(S)
    }
    e = null
  }

  UpdateLineHops(e) {
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
      d = 0,
      D = 0,
      g = 0,
      h = - 1,
      m = [],
      C = [],
      y = this.GetObjectPtr(this.theSEDSessionBlockID, !1);
    if (0 != (y.flags & ConstantData.SessionFlags.SEDS_AllowHops)) {
      this.HideHopTargets();
      var f = this.VisibleZList(),
        L = f.length;
      for (m = [], C = [], n = y.hopdim.x, t = 0; t < L; ++t) r = f[t],
        (o = this.GetObjectPtr(r, !1)) instanceof BaseLine &&
        !(o instanceof PolyLine) &&
        (
          (o.flags & ConstantData.ObjFlags.SEDO_LineMod || e) &&
          - 1 == h &&
          (g, h = - 2),
          m.push(r),
          g++,
          o.flags & ConstantData.ObjFlags.SEDO_LineHop &&
          (- 2 == h && (d = D, h = - 3), C.push(r), D++),
          o.flags = Utils2.SetFlag(o.flags, ConstantData.ObjFlags.SEDO_LineMod, !1)
        );
      if (D && - 3 == h) for (t = d; t < D; ++t) {
        for (
          i = (o = this.GetObjectPtr(C[t], !1)).hoplist.nhops,
          o.hoplist.nhops = 0,
          o.hoplist.hops = [],
          a = 0;
          a < g &&
          m[a] != C[t];
          ++a
        ) {
          for (c = !1, p = o.hooks.length, u = 0; u < p; u++) o.hooks[u].objid == m[a] &&
            (c = !0);
          if (!c) {
            for (p = (s = this.GetObjectPtr(m[a], !1)).hooks.length, u = 0; u < p; u++) s.hooks[u].objid == C[t] &&
              (c = !0);
            if (!c) {
              var I = {},
                T = {};
              Utils2.CopyRect(I, o.r),
                Utils2.CopyRect(T, s.r),
                0 === I.width &&
                (I.width = 1),
                0 === I.height &&
                (I.height = 1),
                0 === T.width &&
                (T.width = 1),
                0 === T.height &&
                (T.height = 1),
                Utils2.IntersectRect(I, T) &&
                o.CalcLineHops(s, 0)
            }
          }
        }
        if (o.hoplist.nhops > 1) for (
          o.hoplist.hops.sort(this.Hop_Compare),
          a = o.hoplist.nhops - 1;
          a > 0;
          a--
        ) l = o.hoplist.hops[a - 1].pt.x - o.hoplist.hops[a].pt.x,
          S = o.hoplist.hops[a - 1].pt.y - o.hoplist.hops[a].pt.y,
          Utils2.sqrt(l * l + S * S) < 3 * n &&
          (o.hoplist.hops[a - 1].cons = !0);
        if (i || o.hoplist.nhops) {
          var b = Utils2.Pt2Rect(o.StartPoint, o.EndPoint);
          for (a = 0; a < o.hoplist.nhops; ++a) o.hoplist.hops[a].pt.x -= b.x,
            o.hoplist.hops[a].pt.y -= b.y;
          this.AddToDirtyList(C[t])
        }
      }
    }
  }


  RenderDirtySVGObjects() {
    this.RenderDirtySVGObjectsCommon(!0)
  }


  RenderDirtySVGObjectsCommon(e) {
    if (
      Collab.NoRedrawFromSameEditor &&
      (
        this.theDirtyList.length = 0,
        Collab.NoRedrawFromSameEditor = !1
      ),
      0 !== this.theDirtyList.length
    ) {
      var t,
        a,
        r = this.VisibleZList(),
        i = this.ActiveVisibleZList(),
        n = function (e) {
          var t,
            a,
            r,
            i,
            n = [],
            o = ConstantData.ObjFlags.SEDO_NotVisible;
          for (r = e.length, t = 0; t < r; t++) i = e[t],
            (a = T3Gv.optManager.GetObjectPtr(i, !1)) &&
            0 == (a.flags & o) &&
            n.push(i);
          return n
        }(r);
      T3Gv.optManager.theDirtyList.sort((function (e, t) {
        return r.indexOf(e) < r.indexOf(t) ? - 1 : 1
      }));
      var o,
        s,
        l,
        S,
        c = this.theDirtyList.length,
        u = 0;
      for (t = 0; t < c; ++t) s = !1,
        o = this.theDirtyList[t],
        l = this.theDirtyListMoveOnly[o],
        (u = n.indexOf(o)) < 0 &&
        (u = r.indexOf(o)),
        u < 0 ||
        (
          e &&
          (s = - 1 != i.indexOf(o)),
          l ? (S = this.GetObjectPtr(o, !1)) &&
            S.MoveSVG() : this.AddSVGObject(u, o, !0, s)
        );
      if (T3Gv.optManager.DirtyListReOrder) {
        var p,
          d = n.length;
        for (t = 0; t < d; t++) a = n[t],
          (p = this.svgObjectLayer.GetElementByID(a)) &&
          (
            this.svgObjectLayer.RemoveElement(p),
            this.svgObjectLayer.AddElement(p, t)
          )
      }
      this.ClearDirtyList()
    }
  }

  ClearDirtyList() {
    this.theDirtyList = [],
      this.theDirtyListMoveOnly = [],
      this.DirtyListReOrder = !1
  }

  FitDocumentWorkArea(e, t, a, r) {
    var i,
      n,
      o,
      s,
      l,
      S = !1,
      c = !1,
      u = !1,
      p = !1,
      d = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1);
    for (
      d.layers[d.activelayer].flags & ConstantData.LayerFlags.SDLF_UseEdges &&
      (
        S = !0,
        s = d.layers[d.activelayer].flags & ConstantData.LayerFlags.SDLF_Visible
      ),
      o = d.nlayers,
      n = 0;
      n < o;
      n++
    ) if (
        d.layers[n].flags & ConstantData.LayerFlags.SDLF_UseEdges &&
        d.layers[n].flags & ConstantData.LayerFlags.SDLF_Visible ||
        S
      ) {
        c = !0;
        break
      }
    i = this.CalcAllObjectEnclosingRect(c && !S, r);
    var D,
      g,
      h = this.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
      m = T3Gv.optManager.theContentHeader.Page.papersize,
      C = T3Gv.optManager.theContentHeader.Page.margins,
      y = m.x - (C.left + C.right),
      f = m.y - (C.top + C.bottom),
      L = {};
    if (
      i.x < 0 &&
      (i.x = 0),
      i.y < 0 &&
      (i.y = 0),
      D = Math.floor(i.x + i.width),
      g = Math.floor(i.y + i.height),
      c &&
      !S &&
      (
        g < T3Gv.optManager.theContentHeader.Page.minsize.y &&
        (g = T3Gv.optManager.theContentHeader.Page.minsize.y, u = !0),
        D < T3Gv.optManager.theContentHeader.Page.minsize.x &&
        (D = T3Gv.optManager.theContentHeader.Page.minsize.x, p = !0)
      ),
      this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_Pages &&
      !S
    ) {
      var I = Math.ceil(D / y),
        T = Math.ceil(g / f);
      if (I < 1 && (I = 1), T < 1 && (T = 1), c) var b = Math.ceil(h.dim.x / y),
        M = Math.ceil(h.dim.y / f);
      else b = Math.round(h.dim.x / y),
        M = Math.round(h.dim.y / f);
      if (
        b < 1 &&
        (b = 1),
        M < 1 &&
        (M = 1),
        D <= h.dim.x &&
        g <= h.dim.y &&
        !t &&
        I >= b &&
        T >= M &&
        1 === b &&
        1 === M
      ) return;
      L = {
        x: I * y,
        y: T * f
      },
        p &&
        (L.x = D),
        u &&
        (L.y = g),
        this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto &&
        (L.x < h.dim.x && (L.x = h.dim.x), L.y < h.dim.y && (L.y = h.dim.y))
    } else S &&
      (i.width += 12, i.height += 12),
      L.x = i.x + i.width,
      L.y = i.y + i.height,
      !S ||
      Utils2.IsEqual(L.x, h.dim.x, 2) &&
      Utils2.IsEqual(L.y, h.dim.y, 2) ||
      (
        s ? (
          L.x < y &&
          (L.x = y),
          L.y < f &&
          (L.y = f),
          0 == (
            this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto
          ) &&
          (
            T3Gv.optManager.theContentHeader.Page.minsize.y = L.y,
            T3Gv.optManager.theContentHeader.Page.minsize.x = L.x
          )
        ) : (
          T3Gv.optManager.theContentHeader.Page.minsize.x = y,
          T3Gv.optManager.theContentHeader.Page.minsize.y = f
        )
      ),
      L.x < T3Gv.optManager.theContentHeader.Page.minsize.x &&
      (L.x = T3Gv.optManager.theContentHeader.Page.minsize.x),
      L.y < T3Gv.optManager.theContentHeader.Page.minsize.y &&
      (L.y = T3Gv.optManager.theContentHeader.Page.minsize.y);
    l = Utils2.IsEqual(L.x, h.dim.x) &&
      Utils2.IsEqual(L.y, h.dim.y);
    var P = L.x > h.dim.x ||
      L.y > h.dim.y;
    if (l) T3Gv.docHandler.CheckScaleToFit() &&
      this.ResizeSVGDocument();
    else {
      if (
        this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto &&
        !a &&
        (!P || function (e, t, a) {
          return _(e.x, t) &&
            _(e.y, a)
        }(h.dim, y, f))
      ) {
        if (P) {
          var R = new Error(Resources.Strings.Error_Bounds);
          throw R.name = '1',
          R
        }
        return
      }
      var A = !0;
      e &&
        (A = !1),
        h = this.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, A),
        this.UpdateEdgeLayers([], h.dim, L),
        h.dim.x = L.x,
        h.dim.y = L.y,
        this.ResizeSVGDocument()
    }
    function _(e, t) {
      const a = e % t;
      return Utils2.IsEqual(a, 0)
    }
  }


  CalcAllObjectEnclosingRect(e, t) {
    var a,
      r,
      i,
      n,
      o = this.VisibleZList(),
      s = o.length,
      l = 0,
      S = 0,
      c = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
      u = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    if (0 === s) return u;
    var p = 0,
      d = 0,
      D = null,
      g = null,
      h = [];
    for (r = c.nlayers, p = 0; p < r; p++) if (
      p !== c.activelayer &&
      c.layers[p].flags & ConstantData.LayerFlags.SDLF_UseEdges &&
      (h = h.concat(c.layers[p].zList), e)
    ) {
      l = 25,
        S = 25,
        n = h.length;
      var m = this.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
      for (i = 0; i < n; i++) (D = T3Gv.optManager.GetObjectPtr(h[i], !1)) &&
        D.objecttype === ConstantData.ObjectTypes.SD_OBJT_ANNOTATION &&
        D.Frame.y + D.Frame.height >= m.dim.y - ConstantData.Defines.AnnoHotDist &&
        (S = 10 + m.dim.y - D.Frame.y)
    }
    var C = 0;
    for (p = 0; p < s; p++) d = o[p],
      h.indexOf(d) >= 0 ||
      null != (D = T3Gv.objectStore.GetObject(d)) &&
      (
        a = D.Data,
        D.Data.flags & ConstantData.ObjFlags.SEDO_NotVisible ||
        (
          g = t ? Utils1.DeepCopy(a.Frame) : Utils1.DeepCopy(a.r),
          0 == C ? u = Utils1.DeepCopy(g) : Utils2.UnionRect(g, u, u),
          C++
        )
      );
    return e &&
      (u.height += S),
      e &&
      (u.width += l),
      u
  }

  // SelectObjects = function (e, t, a) {
  //   var r,
  //     i,
  //     n = - 1,
  //     o = ConstantData.ObjMoreFlags.SED_MF_VisioText;
  //   if (null !== e && 0 !== e.length) {
  //     var s = this.GetObjectPtr(this.theTEDSessionBlockID, !1);
  //     - 1 != s.theActiveTextEditObjectID &&
  //       this.DeactivateTextEdit(!1, !0),
  //       - 1 != s.theActiveTableObjectID &&
  //       this.Table_Release(!1);
  //     var l = this.GetObjectPtr(this.theSelectedListBlockID, a);
  //     n = this.GetTargetSelect(),
  //       t ||
  //       (this.SetDimensionVisibility(l, !1), l.length = 0),
  //       n >= 0 &&
  //       (r = $.inArray(n, l), t ? r >= 0 &&
  //         (n = - 1) : r < 0 && (n = - 1));
  //     var S,
  //       c = e.length;
  //     for (i = 0; i < c; ++i) {
  //       var u,
  //         p = e[i];
  //       if (null != (u = this.GetObjectPtr(p, !1))) if (
  //         u.moreflags & o &&
  //         u.hooks.length &&
  //         (p = u.hooks[0].objid),
  //         - 1 == (S = $.inArray(p, l))
  //       ) n < 0 &&
  //         (n = p),
  //         l.push(p);
  //       else if (t) (u = T3Gv.optManager.GetObjectPtr(p, !1)) &&
  //         u.ShowOrHideDimensions(!1),
  //         l.splice(S, 1)
  //     }
  //     n >= 0 &&
  //       (r = $.inArray(n, l)) < 0 &&
  //       (n = - 1),
  //       n < 0 &&
  //       l.length &&
  //       (n = l[0]),
  //       this.SetTargetSelect(n, a),
  //       this.LastOpDuplicate = !1,
  //       this.UpdateSelectionAttributes(l),
  //       this.HideAllSVGSelectionStates(),
  //       this.RenderAllSVGSelectionStates()
  //   }
  // }





  SelectObjects(e, t, a) {
    let selectedIndex = -1;
    const visioTextFlag = ConstantData.ObjMoreFlags.SED_MF_VisioText;

    if (e && e.length > 0) {
      const tedSession = this.GetObjectPtr(this.theTEDSessionBlockID, false);

      if (tedSession.theActiveTextEditObjectID !== -1) {
        this.DeactivateTextEdit(false, true);
      }

      if (tedSession.theActiveTableObjectID !== -1) {
        this.Table_Release(false);
      }

      const selectedList = this.GetObjectPtr(this.theSelectedListBlockID, a);
      selectedIndex = this.GetTargetSelect();

      if (!t) {
        this.SetDimensionVisibility(selectedList, false);
        selectedList.length = 0;
      }

      if (selectedIndex >= 0) {
        const indexInSelectedList = $.inArray(selectedIndex, selectedList);
        if (t) {
          if (indexInSelectedList >= 0) {
            selectedIndex = -1;
          }
        } else {
          if (indexInSelectedList < 0) {
            selectedIndex = -1;
          }
        }
      }

      for (let i = 0; i < e.length; i++) {
        let objectId = e[i];
        const object = this.GetObjectPtr(objectId, false);

        if (object) {
          if (object.moreflags & visioTextFlag && object.hooks.length > 0) {
            objectId = object.hooks[0].objid;
          }

          const indexInSelectedList = $.inArray(objectId, selectedList);

          if (indexInSelectedList === -1) {
            if (selectedIndex < 0) {
              selectedIndex = objectId;
            }
            selectedList.push(objectId);
          } else if (t) {
            const objectInList = T3Gv.optManager.GetObjectPtr(objectId, false);
            if (objectInList) {
              objectInList.ShowOrHideDimensions(false);
            }
            selectedList.splice(indexInSelectedList, 1);
          }
        }
      }

      if (selectedIndex >= 0) {
        const indexInSelectedList = $.inArray(selectedIndex, selectedList);
        if (indexInSelectedList < 0) {
          selectedIndex = -1;
        }
      }

      if (selectedIndex < 0 && selectedList.length > 0) {
        selectedIndex = selectedList[0];
      }

      this.SetTargetSelect(selectedIndex, a);
      this.LastOpDuplicate = false;
      this.UpdateSelectionAttributes(selectedList);
      this.HideAllSVGSelectionStates();
      this.RenderAllSVGSelectionStates();
    }
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

  GetHookList(e, t, a, r, i, n) {
    var o = !1,
      s = !1,
      l = - 1,
      S = {};
    switch (
    i === ConstantData.ListCodes.SED_LC_CHILDRENONLY &&
    (s = !0, i = ConstantData.ListCodes.SED_LC_CIRCTARG),
    i === ConstantData.ListCodes.SED_LC_LINESONLY &&
    (s = !0, i = ConstantData.ListCodes.SED_LC_TOPONLY),
    i
    ) {
      case ConstantData.ListCodes.SED_LC_MOVETARG:
        if (
          (
            r.hooks.length > 1 ||
            1 == r.hooks.length &&
            r.flags & ConstantData.ObjFlags.SEDO_Assoc
          ) &&
          (i = ConstantData.ListCodes.SED_LC_MOVEHOOK),
          t.indexOf(a) >= 0
        ) return t;
        break;
      case ConstantData.ListCodes.SED_LC_MOVEHOOK:
        if (t.indexOf(a) >= 0) return t;
        break;
      case ConstantData.ListCodes.SED_LC_MOVETARGANDLINES:
      case ConstantData.ListCodes.SED_LC_CIRCTARG:
        break;
      case ConstantData.ListCodes.SED_LC_TARGONLY:
        o = !0,
          l = - 1
    }
    if (o || (l = this.FindLink(e, a, !0)), t.indexOf(a) < 0 && !s) {
      t.push(a),
        n &&
        0 == (r.flags & ConstantData.ObjFlags.SEDO_NotVisible) &&
        (
          S = r.GetMoveRect(!0, !0),
          1 === t.length ? Utils2.CopyRect(n, S) : n = Utils2.UnionRect(n, S, n)
        );
      var c = r.GetListOfEnclosedObjects(!0);
      c.length &&
        T3Gv.optManager.JoinHookList(t, c)
    }
    return l >= 0 &&
      this.AddToHookList(e, t, l, a, i, 0, n),
      i == ConstantData.ListCodes.SED_LC_MOVEHOOK &&
      (
        r.hooks.length >= 2 ||
        r.flags & ConstantData.ObjFlags.SEDO_Assoc
      ) &&
      this.GetTargetList(a, e, t, n, i),
      t
  }

  FindLink(e, t, a) {
    if (0 === e.length) return a ? - 1 : 0;
    for (var r = 0; r < e.length; r++) {
      if (e[r].targetid === t) return r;
      if (!a && e[r].targetid > t) return r
    }
    return a ? - 1 : e.length
  }


  ScrollObjectIntoView(e, t, a) {
    var r;
    if (
    /*!Collab.IsProcessingMessage()*/false &&
      (null != e && - 1 != e || (e = this.GetTargetSelect()), - 1 != e)
    ) {
      if (a) r = a;
      else {
        var i = this.GetObjectPtr(e, !1);
        if (null == i) return;
        r = i.r
      }
      var n = this.svgDoc.docInfo,
        o = {
          x: n.docVisX,
          y: n.docVisY,
          width: n.docVisWidth,
          height: n.docVisHeight
        };
      if (!this.IsRectEnclosed(o, r) || t) {
        var s,
          l,
          S;
        if (r.width >= o.width || r.height >= o.height) if (Utils2.UnionRect(o, r, o) && !t) return;
        if (t) {
          var c = o.x + o.width / 2,
            u = o.y + o.height / 2,
            p = r.x + r.width / 2;
          return s = u - (r.y + r.height / 2),
            l = (o.x - (c - p)) * n.docToScreenScale,
            S = (o.y - s) * n.docToScreenScale,
            void T3Gv.docHandler.SetScroll(l, S)
        }
        l = o.x,
          S = o.y;
        var d = 20,
          D = 20;
        return n.docVisWidth < n.docWidth &&
          (D = 30),
          n.docVisHeight < n.docHeight &&
          (d = 30),
          r.x < o.x &&
          (l = r.x - 20),
          r.x + r.width > o.x + o.width &&
          (l = r.x + r.width - o.width + d),
          r.y < o.y &&
          (S = r.y - 20),
          r.y + r.height > o.y + o.height &&
          (S = r.y + r.height - o.height + D),
          l *= n.docToScreenScale,
          S *= n.docToScreenScale,
          void T3Gv.docHandler.SetScroll(l, S)
      }
    }
  }


  ResetObjectDraw() {
    this.actionStoredObjectId = - 1,
      this.actionSvgObject = null,
      this.GetObjectPtr(this.actionStoredObjectId, !0),
      this.SetEditMode(ConstantData.EditState.DEFAULT),
      this.WorkAreaHammer.on('dragstart', EvtUtil.Evt_WorkAreaHammerDragStart),
      this.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick),
      this.SetModalOperation(ConstantData2.ModalOperations.NONE)
  }

  // Double === update tool
  UpdateTools() {


    var e;
    if (!ConstantData.DocumentContext.SelectionToolSticky) {
      if (ConstantData.DocumentContext.SelectionTool !== Resources.Tools.Tool_Select) {
        // SDUI.Commands.MainController.Selection.SetSelectionTool(Resources.Tools.Tool_Select, false);
      }
    } else {
      switch (ConstantData.DocumentContext.SelectionTool) {
        case Resources.Tools.Tool_Line:
          Commands.MainController.Shapes.DrawNewLineShape(null, false, true);
          break;
        case Resources.Tools.Tool_Shape:
          e = { type: 'mousedown' };
          Commands.MainController.Shapes.StampOrDragDropNewShape(e, null);
          e = { type: 'mouseup' };
          Commands.MainController.Shapes.StampOrDragDropNewShape(e, null);
          break;
        case Resources.Tools.Tool_Text:
          Commands.MainController.Shapes.StampTextLabel(true, true);
          break;
        case Resources.Tools.Tool_Wall:
          Commands.MainController.Shapes.DrawNewWallShape(true, null);
          break;
        case Resources.Tools.Tool_Symbol:
          e = { type: 'mousedown' };
          var t = Commands.MainController.Symbols.GetSelectedButton();
          Commands.MainController.Shapes.DragDropSymbol(e, t);
          e = { type: 'click' };
          Commands.MainController.Shapes.DragDropSymbol(e, t);
          break;
        case Resources.Tools.Tool_StyledLine:
          Commands.MainController.Shapes.DrawNewStyledLineShape(null, true);
          break;
      }
    }

  }


  LM_MoveClick(e) {
    console.log('ListManager.LM.prototype.LM_MoveClick e=>', e);

    if (
      T3Gv.optManager.IsWheelClick(e) ||
      ConstantData.DocumentContext.SpacebarDown
    ) return Evt_WorkAreaHammerDragStart(e),
      void Utils2.StopPropagationAndDefaults(e);
    Utils2.StopPropagationAndDefaults(e);
    try {
      ConstantData.DocumentContext.HTMLFocusControl &&
        ConstantData.DocumentContext.HTMLFocusControl.blur &&
        ConstantData.DocumentContext.HTMLFocusControl.blur(),
        this.NudgeOpen &&
        T3Gv.optManager.CloseOpenNudge();
      var t = this.LM_SetupMove(e);
      if (1 != t) return - 1 === t ? void Collab.UnLockMessages() : (
        Collab.UnLockMessages(),
        void Collab.UnBlockMessages()
      );
      Collab.UnLockMessages(),
        this.currentModalOperation === ConstantData2.ModalOperations.NONE &&
        T3Gv.optManager.SetEditMode(ConstantData.EditState.DRAGSHAPE),
        T3Gv.optManager.WorkAreaHammer.on('drag', EvtUtil.Evt_ShapeDrag),
        T3Gv.optManager.WorkAreaHammer.on('dragend', EvtUtil.Evt_ShapeDragEnd)
    } catch (e) {
      T3Gv.optManager.LM_Move_ExceptionCleanup(e);
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }


  SetControlDragMode(e) {
    var t = e.GetCursor();
    this.SetEditMode(ConstantData.EditState.DRAGCONTROL, t)
  }


  HideOverlayLayer() {
    this.svgOverlayLayer.SetVisible(!1)
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
      T3Gv.optManager.MoveDuplicated = !1,
      null == (
        t = this.svgObjectLayer.FindElementByDOMElement(e.currentTarget)
      )
    ) return !1;
    a = t.GetTargetForEvent(e),
      this.theEventTimestamp = Date.now(),
      Utils2.StopPropagationAndDefaults(e);
    var S = t.GetID(),
      c = T3Gv.optManager.GetObjectPtr(S, !1);
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
      this.dragTargetId = t.GetID(),
        this.dragTargetId = this.SD_GetVisioTextParent(this.dragTargetId),
        this.dragTargetId = this.GetEventShapeParent(this.dragTargetId),
        this.dragTargetId = Business.SelectContainerParent(this.dragTargetId),
        i = T3Gv.objectStore.GetObject(this.dragTargetId);
      var h = this.IsRightClick(e);
      if (i) {
        if ((n = i.Data).IsSwimlane()) if (D === ConstantData.Defines.TableCellNoHit) {
          o = n.GetTable(!1);
          var m = this.Table_GetCellClicked(n, e);
          if (
            m >= 0 &&
            o.cells[m].flags & ListManager.Table.CellFlags.SDT_F_NoText &&
            !h
          ) return T3Gv.optManager.StartRubberBandSelect(e),
            !1
        } else if (
          n.objecttype === l.SD_OBJT_FRAME_CONTAINER &&
          D === ConstantData.SVGElementClass.SHAPE &&
          !h
        ) return T3Gv.optManager.StartRubberBandSelect(e),
          !1;
        if (
          s = (n.TextFlags & ConstantData.TextFlags.SED_TF_OneClick) > 0,
          h
        ) s = !1;
        else if (n.flags & ConstantData.ObjFlags.SEDO_Lock) return this.SelectObjectFromClick(e, t),
          !1
      }
      var C = this.Table_GetActiveID();
      if (o = n.GetTable(!1), C === this.dragTargetId || s && null != o) switch (D) {
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
          return this.Graph_SetupAction(e, this.dragTargetId, D, g),
            !1;
        case ConstantData.SVGElementClass.BACKGROUNDIMAGE:
        case ConstantData.Defines.TableCellHit:
        case ConstantData.Defines.TableTextHit:
        case ConstantData.Defines.TableCells:
        case ConstantData.Defines.TableRowZone:
        case ConstantData.Defines.TableColZone:
          return !0 === this.Table_SetupAction(e, this.dragTargetId, D, g) ||
            - 1;
        case ConstantData.Defines.TableRowHitHidden:
        case ConstantData.Defines.TableRowHit:
        case ConstantData.Defines.TableRowSelection:
          if (n && this.Table_HideUI(n)) return !1;
          var f = d.GetUserData();
          return this.Table_SetupAction(
            e,
            this.dragTargetId,
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
            this.dragTargetId,
            ConstantData.Defines.TableColHit,
            L
          ),
            !1;
        case ConstantData.Defines.HitAreas:
          return u = d.GetUserData(),
            this.LM_HitAreaClick(this.dragTargetId, u),
            e.gesture &&
            e.gesture.stopDetect(),
            !1
      }
      if (s) return T3Gv.optManager.ActivateTextEdit(t.svgObj.SDGObj, e, !1),
        !1
    }
    if (o && i && this.Table_CloseEdit(i, o), this.Table_Release(!1)) {
      var I = this.GetObjectPtr(this.theSelectedListBlockID, !1);
      this.UpdateSelectionAttributes(I)
    }
    if (!this.SelectObjectFromClick(e, t, !0)) return !1;
    if (null == (i = T3Gv.objectStore.GetObject(this.dragTargetId))) return !1;
    if (
      (n = i.Data).objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_BAR &&
      (n.datasetElemID >= 0 && this.GanttGetParentID(n.datasetElemID) < 0)
    ) return !1;
    if (
      this.HideAllSVGSelectionStates(),
      this.DoAutoGrowDragInit(),
      n.InterceptMoveOperation(e)
    ) return !1;
    var T = {},
      b = {},
      M = {};
    if (
      this.IsLoneFlowchartShape(n, M) &&
      (this.dragTargetId = M.id),
      this.IsConnectorEndShape(n, null, T) ? this.dragTargetId = T.id : this.IsGenogramPartner(n, b) &&
        (this.dragTargetId = b.id),
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
      (P = []).push(this.dragTargetId),
      this.PinRect = {},
      this.PinRect = n.AdjustPinRect(this.PinRect, !0);
    else var P = this.GetMoveList(this.dragTargetId, !0, !0, !1, this.theMoveBounds, !1);
    var R = 0;
    P &&
      (R = P.length),
      this.dragStartX = p.x,
      this.dragStartY = p.y;
    var A = 0;
    this.dragBBoxList = [],
      this.dragElementList = [];
    var _ = - 1,
      E = null;
    this.dragGotMove = !1,
      this.DoAutoGrowDragInit();
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
      this.dragBBoxList.push(E),
      this.dragElementList.push(_),
      T3Gv.docHandler.documentConfig.enableSnap &&
      _ == this.dragTargetId &&
      (this.dragTargetBBox = $.extend(!0, {
      }, E));
    return this.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto &&
      (
        this.dragEnclosingRect = T3Gv.optManager.GetListSRect(this.theMoveList)
      ),
      this.LM_MovePreTrack(P, e),
      !0
  }

  LM_Move_ExceptionCleanup(e) {
    throw e;

    console.log('  ListManager.LM.prototype.LM_Move_ExceptionCleanup ', e)
    T3Gv.optManager.LinkParams = null,
      T3Gv.optManager.dragBBoxList = [],
      T3Gv.optManager.dragElementList = [],
      T3Gv.optManager.theMoveList = null,
      T3Gv.optManager.dragEnclosingRect = null,
      T3Gv.optManager.dragGotMove = !1,
      T3Gv.optManager.unbindShapeMoveHammerEvents(),
      T3Gv.optManager.ResetAutoScrollTimer(),
      Collab.UnLockMessages(),
      Collab.UnBlockMessages()
  }

  unbindShapeMoveHammerEvents() {
    T3Gv.optManager.WorkAreaHammer &&
      (
        T3Gv.optManager.WorkAreaHammer.off('drag'),
        T3Gv.optManager.WorkAreaHammer.off('dragend')
      )
  }

  SD_GetVisioTextParent(e) {
    var t = T3Gv.optManager.GetObjectPtr(e);
    if (
      t &&
      t.moreflags & ConstantData.ObjMoreFlags.SED_MF_VisioText
    ) {
      var a = T3Gv.optManager.GetObjectPtr(t.associd);
      if (a && a.TextFlags & ConstantData.TextFlags.SED_TF_AttachD) return t.associd
    }
    return e
  }

  GetEventShapeParent(e) {
    var t = T3Gv.optManager.GetObjectPtr(e);
    if (
      t &&
      t.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT_LABEL
    ) {
      var a = T3Gv.optManager.GetObjectPtr(t.associd);
      if (
        a &&
        a.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT
      ) return t.associd
    }
    return e
  }

  Table_Release(e, t) {
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
      d = T3Gv.optManager.Table_GetActiveID();
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
              T3Gv.optManager.svgObjectLayer.RemoveElement(m),
              T3Gv.optManager.svgObjectLayer.AddElement(m, p.theActiveTableObjectIndex)
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


  SelectObjectFromClick(e, t, a) {
    var r = this.ActiveVisibleZList().length,
      i = ConstantData.ObjectTypes.SD_OBJT_SHAPECONTAINER;
    if (0 === r) return !1;
    if (null === t) return !1;
    var n = t.GetID(),
      o = this.GetObjectPtr(n, !1);
    if (!(o && o instanceof BaseDrawingObject)) return !1;
    if (o && o.objecttype === i && this.ContainerIsInCell(o)) return !1;
    var s,
      l,
      S = T3Gv.objectStore.GetObject(this.theSelectedListBlockID).Data;
    s = $.inArray(n, S);
    var c = [];
    return c.push(n),
      l = e.gesture.srcEvent.shiftKey ||
      e.gesture.srcEvent.ctrlKey ||
      ConstantData.DocumentContext.SelectionToolMultiple,
      e.gesture.srcEvent.ctrlKey &&
      e.gesture.srcEvent.metaKey &&
      (l = !1),
      - 1 == s ? (this.SelectObjects(c, l, !1), !0) : !l ||
        (this.SelectObjects(c, l, !1), !!a)
  }

  IsLoneFlowchartShape(e, t) {
    var a;
    return !!(
      e &&
      e.hooks.length &&
      (a = this.GetObjectPtr(e.hooks[0].objid, !1)) &&
      a.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
      a._IsFlowChartConnector() &&
      0 === a.hooks.length &&
      a.arraylist.hook.length === ConnectorDefines.SEDA_NSkip + 1
    ) &&
      (t.id = a.BlockID, !0)
  }




  IsConnectorEndShape(e, t, a) {
    var r;
    return !!(
      e &&
      e.hooks.length &&
      0 === e.hooks[0].connect.y &&
      e.hooks[0].connect.x < 0 &&
      (
        null == t &&
        (t = this.GetObjectPtr(e.hooks[0].objid, !1)),
        a &&
        t &&
        t.hooks.length &&
        (r = this.GetObjectPtr(t.hooks[0].objid, !1)) &&
        r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR
      )
    ) &&
      (
        a.id = t.hooks[0].objid,
        r.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete ? (
          a.nshapes = r.arraylist.hook.length - ConnectorDefines.SEDA_NSkip,
          a.nshapes < 0 &&
          (a.nshapes = 0),
          a.pasted = !1
        ) : a.pasted = !0,
        !0
      )
  }

  IsGenogramPartner(e, t) {
    var a,
      r;
    if (e && e.hooks.length) {
      if (
        (a = this.GetObjectPtr(e.hooks[0].objid, !1)) &&
        a.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR
      ) {
        if (a.IsGenoConnector()) return t.id = e.hooks[0].objid,
          !0;
        if (
          a.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH &&
          this.FindChildObject(e.BlockID, ConstantData.DrawingObjectBaseClass.LINE, - 1) >= 0
        ) return t.id = e.hooks[0].objid,
          !0
      }
    } else if (
      (r = this.FindChildArray(e.BlockID, - 1)) >= 0 &&
      (a = this.GetObjectPtr(r, !1)).IsGenoConnector()
    ) return t.id = r,
      !0;
    return !1
  }


  FindChildArray(e, t) {
    var a,
      r,
      i,
      n = this.GetObjectPtr(this.theLinksBlockID, !1),
      o = this.FindLink(n, e, !0);
    if (a = n.length, o >= 0) for (; o < a && n[o].targetid === e;) {
      if (
        (r = n[o].hookid) !== t &&
        (i = this.GetObjectPtr(r, !1)) &&
        i.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR
      ) return r;
      o++
    }
    return - 1
  }



  LM_MovePreTrack(e, t) {
    T3Gv.optManager.GetObjectPtr(this.theSEDSessionBlockID, !1);
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
        this.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !1).length > 1 &&
        (this.LinkParams.AutoInsert = !1),
        t.gesture &&
        t.gesture.srcEvent &&
        t.gesture.srcEvent.altKey
      );
    if (null != (a = this.GetObjectPtr(this.dragTargetId, !1))) {
      T3Gv.optManager.ob = Utils1.DeepCopy(a),
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
          this.dragTargetId,
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
          this.LinkParams.lpCircList.push(this.dragTargetId),
          this.theMoveList = [],
          this.theMoveList.push(this.dragTargetId),
          this.LinkParams.AutoHeal = !0
        ),
        this.AllowSnapToShapes()
      ) {
        var n = a.GetSnapRect(),
          o = $.extend(!0, {
          }, n);
        o.x += T3Gv.optManager.dragDeltaX,
          o.y += T3Gv.optManager.dragDeltaY;
        var s = {},
          l = a.CanSnapToShapes(s);
        if (l >= 0) {
          n = this.GetObjectPtr(l, !1).GetSnapRect(),
            sobj_theRect = $.extend(!0, {
            }, n);
          var S = new DynamicGuides(),
            c = [];
          c.push(this.dragTargetId);
          this.DynamicSnaps_GetSnapObjects(l, sobj_theRect, S, c, null, s);
          S &&
            this.DynamicSnaps_UpdateGuides(S, l, sobj_theRect)
        }
      }
    }
  }

  AllowAutoInsert() {
    return T3Gv.gBusinessManager.AllowAutoInsert()
  }

  JoinHookList(e, t) {
    if (null != e && null != t) for (var a = 0; a < t.length; a++) e.indexOf(t[a]) < 0 &&
      e.push(t[a])
  }

  AllowSnapToShapes() {
    T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
    return T3Gv.docHandler.documentConfig.snapToShapes
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
            var i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !0),
              n = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !0);
            for (i.length = 0, p = 0; p < r.length; p++) i.push(r[p]);
            var o = this.GetObjectPtr(this.dragTargetId, !1),
              s = - 1,
              l = null;
            o &&
              (l = o.Frame, s = o.DrawingObjectBaseClass);
            var S,
              c = this.DuplicateObjects(!0);
            for (i.length = 0, p = 0; p < c.length; p++) i.push(c[p]);
            for (
              T3Gv.optManager.MoveDuplicated = !0,
              this.theMoveList.length = 0,
              this.dragElementList.length = 0,
              this.dragBBoxList.length = 0,
              this.LinkParams.lpCircList = [],
              this.LinkParams.InitialHook = - 1,
              p = c.length - 1;
              p >= 0;
              p--
            ) null != (d = this.GetObjectPtr(c[p], !1)) &&
              (
                this.theMoveList.push(c[p]),
                this.LinkParams.lpCircList.push(c[p]),
                this.dragElementList.push(c[p]),
                S = d.GetSVGFrame(),
                l &&
                Utils2.EqualRect(S, l, 2) &&
                d.DrawingObjectBaseClass === s &&
                (this.dragTargetId = c[p], n.tselect = c[p]),
                this.dragBBoxList.push(S)
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
        T3Gv.optManager.unbindShapeMoveHammerEvents(),
        this.ResetAutoScrollTimer(),
        T3Gv.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
        this.DynamicSnaps_RemoveGuides(this.Dynamic_Guides),
        this.Dynamic_Guides = null,
        !this.dragGotMove ||
        this.CheckDragIsOverCustomLibrary(e)
      )
    ) {
      if (this.CheckDragIsOverCustomLibrary(e)) {
        var s,
          l,
          S = this.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !1);
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
          dragDeltaX: this.dragDeltaX,
          MoveDuplicated: T3Gv.optManager.MoveDuplicated
        };
      for (a = 0; a < n; ++a) {
        r = i[a];
        var d = T3Gv.objectStore.GetObject(r).Data;
        if (t || (c = this.dragBBoxList[a]), c || t) {
          if (
            t ? u = t.Data.thePointList[a] : (u.x = c.x + this.dragDeltaX, u.y = c.y + this.dragDeltaY),
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
        p.LinkParams = Utils1.DeepCopy(T3Gv.optManager.LinkParams);
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
        var f = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !0);
        f.dupdisp.x += this.dragDeltaX,
          f.dupdisp.y += this.dragDeltaY
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
          T3Gv.optManager.LinkParams.HiliteConnect,
          this.LinkParams.ConnectPt,
          !1,
          !1,
          this.dragTargetId,
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
          T3Gv.optManager.LinkParams.HiliteJoin,
          this.LinkParams.ConnectPt,
          !1,
          !0,
          this.dragTargetId,
          null
        ),
        this.LinkParams.HiliteJoin = - 1
      ),
      t ||
      this.SetEditMode(ConstantData.EditState.DEFAULT),
      e
    ) {
      let e = T3Gv.optManager.GetObjectPtr(this.dragTargetId);
      if (
        e.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT ||
        e.objecttype === ConstantData.ObjectTypes.SD_OBJT_NG_EVENT_LABEL
      ) {
        let e = this.dragDeltaX,
          r = this.theMoveList;
        null != t?.Data?.dragDeltaX &&
          (e = t.Data.dragDeltaX),
          null != t?.Data?.theMoveList &&
          (r = t.Data.theMoveList),
          a = T3Gv.optManager.TimelineMoveEvent(this.dragTargetId, r, e, !0)
      } else if (this.LinkParams.JoinIndex >= 0) this.PolyLJoin(
        this.LinkParams.JoinIndex,
        this.LinkParams.JoinData,
        this.dragTargetId,
        this.LinkParams.JoinSourceData,
        !1
      );
      else if (
        this.LinkParams &&
        (
          this.LinkParams.ConnectIndex >= 0 ||
          this.LinkParams.InitialHook >= 0
        )
      ) GlobalDatagFlowChartManager &&
        (
          a = GlobalDatagFlowChartManager.FlowChartHook(
            this.dragTargetId,
            this.LinkParams.InitialHook,
            this.LinkParams.ConnectIndex,
            this.LinkParams.HookIndex,
            this.LinkParams.ConnectPt
          )
        ),
        a ||
        (
          this.LinkParams.ConnectHookFlag === ConstantData.HookFlags.SED_LC_AutoInsert ? this.SD_AutoInsertShape(this.dragTargetId, this.LinkParams.ConnectIndex) : this.LinkParams.ConnectHookFlag === ConstantData.HookFlags.SED_LC_HookReverse ? this.LM_ReverseHook(this.dragTargetId) : (
            a = function () {
              var e = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !1);
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
              var c = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.dragTargetId, !1);
              if (T3Gv.optManager.LinkParams.ConnectIndex >= 0) {
                if (
                  (
                    S = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.LinkParams.ConnectIndex, !1)
                  ) &&
                  S instanceof ShapeContainer
                ) {
                  a = T3Gv.optManager.LinkParams.ConnectIndex,
                    i = e.length;
                  var u = S.ContainerList.flags & ConstantData.ContainerListFlags.Sparse;
                  if (c.hooks.length && c.hooks[0].objid === a) for (r = 0; r < i; r++) (n = e[r]) !== T3Gv.optManager.dragTargetId &&
                    (t = T3Gv.optManager.GetObjectPtr(n, !1)).hooks.length &&
                    t.hooks[0].objid === a &&
                    (
                      u ? (
                        s = T3Gv.optManager.LinkParams.ConnectPt.x - c.hooks[0].connect.x,
                        l = T3Gv.optManager.LinkParams.ConnectPt.y - c.hooks[0].connect.y,
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
                        (o = T3Gv.optManager.LinkParams.ConnectPt.x) < 0 &&
                        (o = 0),
                        list.push(n),
                        connect.push({
                          x: o,
                          y: T3Gv.optManager.LinkParams.ConnectPt.y + list.length
                        })
                      )
                    );
                  else for (r = 0; r < i; r++) (n = e[r]) !== T3Gv.optManager.dragTargetId &&
                    (
                      t = T3Gv.optManager.GetObjectPtr(n, !1),
                      S.IsShapeContainer(t) &&
                      (
                        list.push(n),
                        (o = T3Gv.optManager.LinkParams.ConnectPt.x) < 0 &&
                        (o = 0),
                        connect.push({
                          x: o,
                          y: T3Gv.optManager.LinkParams.ConnectPt.y + list.length
                        })
                      )
                    )
                }
              } else if (
                c.hooks.length > 0 &&
                (
                  a = c.hooks[0].objid,
                  (S = T3Gv.optManager.GetObjectPtr(a, !1)) &&
                  S instanceof ShapeContainer
                )
              ) for (i = e.length, r = 0; r < i; r++) (n = e[r]) !== T3Gv.optManager.dragTargetId &&
                (t = T3Gv.optManager.GetObjectPtr(n, !1)).hooks.length &&
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
                  list.unshift(T3Gv.optManager.dragTargetId),
                  connect.unshift(T3Gv.optManager.LinkParams.ConnectPt),
                  i++,
                  r = 0;
                  r < i;
                  r++
                ) n = list[r],
                  T3Gv.optManager.UpdateHook(
                    n,
                    T3Gv.optManager.LinkParams.InitialHook,
                    T3Gv.optManager.LinkParams.ConnectIndex,
                    T3Gv.optManager.LinkParams.HookIndex,
                    connect[r],
                    T3Gv.optManager.LinkParams.ConnectInside
                  ),
                  T3Gv.optManager.SetLinkFlag(
                    T3Gv.optManager.LinkParams.ConnectIndex,
                    ConstantData.LinkFlags.SED_L_MOVE
                  ),
                  T3Gv.optManager.CleanupHooks(
                    T3Gv.optManager.dragTargetId,
                    T3Gv.optManager.LinkParams.ConnectIndex
                  );
                return !0
              }
              return !1
            }(),
            a ||
            (
              this.UpdateHook(
                this.dragTargetId,
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
              this.CleanupHooks(this.dragTargetId, this.LinkParams.ConnectIndex)
            )
          )
        );
      else {
        var i = Business.GetSelectionBusinessManager(this.dragTargetId);
        null == i &&
          (i = T3Gv.gBusinessManager),
          i instanceof FloorPlan &&
          i.EnsureCubicleBehindOutline(this.dragTargetId)
      }
      this.IsGanttBar(this.dragTargetId) &&
        this.GanttAdjustBar(this.dragTargetId, 0),
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
        T3Gv.optManager.ob = {},
        this.dragEnclosingRect = null,
        this.dragElementList = [],
        this.dragBBoxList = []
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
      var a = this.GetObjectPtr(this.dragTargetId, !1),
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
    if (this.dragTargetId < 0) return e;
    if (null == (a = this.GetObjectPtr(this.dragTargetId, !1))) return e;
    if (
      this.LinkParams &&
      this.LinkParams.AutoHeal &&
      (
        n = Math.abs(e.x - this.dragStartX),
        o = Math.abs(e.y - this.dragStartY),
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
      var S = this.theDirtyList.indexOf(this.dragTargetId);
      S >= 0 &&
        this.theDirtyList.splice(S, 1),
        this.RenderDirtySVGObjects(),
        S >= 0 &&
        this.AddToDirtyList(this.dragTargetId);
      this.GetMoveList(this.dragTargetId, !0, !0, !1, this.theMoveBounds, !1)
    }
    if (
      this.PinRect &&
      this.PinMoveRect(e),
      r = this.Move_GetHookPoints(
        this.dragTargetId,
        a,
        e.x - this.dragStartX,
        e.y - this.dragStartY
      )
    ) {
      if (
        this.dragDeltaX = 0,
        this.dragDeltaY = 0,
        T3Gv.optManager.LinkParams.DropOnLine ||
        T3Gv.optManager.LinkParams.AutoInsert
      ) {
        (s = $.extend(!0, {
        }, a.Frame)).x += e.x - this.dragStartX,
          s.y += e.y - this.dragStartY;
        var c = a.Frame;
        if (
          a.Frame = s,
          t = this.FindConnect(
            this.dragTargetId,
            a,
            T3Gv.optManager.LinkParams.cpt,
            !0,
            !0,
            !1,
            e
          ),
          a.Frame = c,
          t
        ) return e.x += this.dragDeltaX,
          e.y += this.dragDeltaY,
          e
      }
      this.dragDeltaX = 0,
        this.dragDeltaY = 0,
        (
          (
            t = this.FindConnect(
              T3Gv.optManager.dragTargetId,
              a,
              r,
              !0,
              !1,
              T3Gv.optManager.LinkParams.AllowJoin,
              e
            )
          ) ||
          T3Gv.optManager.LinkParams.JoinIndex >= 0
        ) &&
        (e.x += this.dragDeltaX, e.y += this.dragDeltaY)
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
      (i = this.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1)) &&
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
        T3Gv.optManager.FlipPoints(d, t.extraflags, o)
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
      T3Gv.optManager.dragDeltaX < - T3Gv.optManager.theMoveBounds.x &&
        (T3Gv.optManager.dragDeltaX = - T3Gv.optManager.theMoveBounds.x),
        T3Gv.optManager.dragDeltaY < - T3Gv.optManager.theMoveBounds.y &&
        (T3Gv.optManager.dragDeltaY = - T3Gv.optManager.theMoveBounds.y)
    }
    if (T3Gv.optManager.PinRect) {
      var o = {
        x: e,
        y: t
      };
      this.PinMoveRect(o),
        e = o.x,
        t = o.y
    }
    T3Gv.optManager.dragDeltaX = e - T3Gv.optManager.dragStartX,
      T3Gv.optManager.dragDeltaY = t - T3Gv.optManager.dragStartY,
      n();
    var s = {
      x: T3Gv.optManager.dragDeltaX + T3Gv.optManager.theMoveBounds.x + T3Gv.optManager.theMoveBounds.width,
      y: T3Gv.optManager.dragDeltaY + T3Gv.optManager.theMoveBounds.y + T3Gv.optManager.theMoveBounds.height
    };
    s = T3Gv.optManager.DoAutoGrowDrag(s);
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
      var C = T3Gv.optManager.GetObjectPtr(this.dragTargetId, !1),
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
          this.DynamicSnaps_RemoveGuides(this.Dynamic_Guides),
          this.Dynamic_Guides = null
        ),
        !i &&
        this.AllowSnapToShapes()
      ) {
        d = C.GetSnapRect(),
          (g = $.extend(!0, {
          }, d)).x += T3Gv.optManager.dragDeltaX,
          g.y += T3Gv.optManager.dragDeltaY;
        var L = {},
          I = C.CanSnapToShapes(L);
        if (I >= 0) {
          d = this.GetObjectPtr(I, !1).GetSnapRect(),
            (h = $.extend(!0, {
            }, d)).x += T3Gv.optManager.dragDeltaX,
            h.y += T3Gv.optManager.dragDeltaY;
          var T = new ListManager.Dynamic_Guides;
          null != (
            y = this.DynamicSnaps_GetSnapObjects(I, h, T, this.theMoveList, null, L)
          ).x &&
            (
              f.x += y.x,
              h.x += y.x,
              T3Gv.optManager.dragDeltaX = f.x - T3Gv.optManager.dragStartX
            ),
            null != y.y &&
            (
              f.y += y.y,
              h.y += y.y,
              T3Gv.optManager.dragDeltaY = f.y - T3Gv.optManager.dragStartY
            ),
            n()
        }
      }
      if (T3Gv.docHandler.documentConfig.enableSnap && !i) d = (C = T3Gv.optManager.GetObjectPtr(this.dragTargetId, !1)).GetSnapRect(),
        (g = $.extend(!0, {
        }, d)).x += T3Gv.optManager.dragDeltaX,
        g.y += T3Gv.optManager.dragDeltaY,
        C &&
          C.CustomSnap(
            C.Frame.x,
            C.Frame.y,
            T3Gv.optManager.dragDeltaX,
            T3Gv.optManager.dragDeltaY,
            !1,
            f
          ) ? (
          null == y.x &&
          (T3Gv.optManager.dragDeltaX = f.x - T3Gv.optManager.dragStartX),
          null == y.y &&
          (T3Gv.optManager.dragDeltaY = f.y - T3Gv.optManager.dragStartY),
          n()
        ) : T3Gv.docHandler.documentConfig.centerSnap ? (
          D.x = d.x + T3Gv.optManager.dragDeltaX + d.width / 2,
          D.y = d.y + T3Gv.optManager.dragDeltaY + d.height / 2,
          D = T3Gv.docHandler.SnapToGrid(D),
          null == y.x &&
          (T3Gv.optManager.dragDeltaX = D.x - d.x - d.width / 2),
          null == y.y &&
          (T3Gv.optManager.dragDeltaY = D.y - d.y - d.height / 2)
        ) : (
          (g = $.extend(!0, {
          }, d)).x += T3Gv.optManager.dragDeltaX,
          g.y += T3Gv.optManager.dragDeltaY,
          c = T3Gv.docHandler.SnapRect(g),
          null == y.x &&
          (T3Gv.optManager.dragDeltaX += c.x),
          null == y.y &&
          (T3Gv.optManager.dragDeltaY += c.y)
        ),
        m &&
        (
          Math.abs(T3Gv.optManager.dragDeltaX) >= Math.abs(T3Gv.optManager.dragDeltaY) ? T3Gv.optManager.dragDeltaY = 0 : T3Gv.optManager.dragDeltaX = 0
        );
      var b = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
      if (
        T3Gv.optManager.theContentHeader.flags & ConstantData.ContentHeaderFlags.CT_DA_NoAuto
      ) {
        var M = T3Gv.optManager.theMoveBounds.x + T3Gv.optManager.theMoveBounds.width + T3Gv.optManager.dragDeltaX;
        M > b.dim.x &&
          (T3Gv.optManager.dragDeltaX -= M - b.dim.x);
        var P = T3Gv.optManager.theMoveBounds.y + T3Gv.optManager.theMoveBounds.height + T3Gv.optManager.dragDeltaY;
        P > b.dim.y &&
          (T3Gv.optManager.dragDeltaY -= P - b.dim.y)
      }
      var R = this.GetTargetSelect();
      for (
        R < 0 &&
        (R = this.dragTargetId),
        !0 === a &&
        (T3Gv.optManager.dragDeltaX = 0, T3Gv.optManager.dragDeltaY = 0),
        u = 0;
        u < S;
        ++u
      ) {
        if (d = T3Gv.optManager.dragBBoxList[u], this.theMoveList[u] === R) {
          C = this.GetObjectPtr(R, !1);
          var A = {
            x: d.x + T3Gv.optManager.dragDeltaX,
            y: d.y + T3Gv.optManager.dragDeltaY,
            width: d.width,
            height: d.height
          };
          C &&
            (
              (A = C.GetDimensionsForDisplay()).x += T3Gv.optManager.dragDeltaX,
              A.y += T3Gv.optManager.dragDeltaY,
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
            _.leftstr = this.GetLengthInRulerUnits(_.left, !1, T3Gv.docHandler.rulerSettings.originx, E),
            _.topstr = this.GetLengthInRulerUnits(_.top, !1, T3Gv.docHandler.rulerSettings.originy, E),
            // SDUI.Commands.MainController.UpdateRibbonDimensions(_),
            T &&
            this.DynamicSnaps_UpdateGuides(T, I, h)
        }
        if (p = T3Gv.optManager.GetSVGDragElement(u)) {
          p.SetPos(
            d.x + T3Gv.optManager.dragDeltaX,
            d.y + T3Gv.optManager.dragDeltaY
          );
          var w = {
            x: d.x + T3Gv.optManager.dragDeltaX,
            y: d.y + T3Gv.optManager.dragDeltaY,
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
    return !this.dragElementList ||
      e < 0 ||
      e >= this.dragElementList.length ? null : this.svgObjectLayer.GetElementByID(this.dragElementList[e])
  }


  SetShapeOriginNoDirty(e, t, a) {
    var r = {},
      i = T3Gv.objectStore.PreserveBlock(e).Data;
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
              d = T3Gv.optManager.GetAngleSmallestDiff(d, D) < T3Gv.optManager.GetAngleSmallestDiff(angle180, D) ? d : angle180,
              !(Math.abs(D - d) <= 2 || Math.abs(D - Math.abs(d - 180)) <= 2)
            ) {
              T3Gv.objectStore.PreserveBlock(c[n].hookid);
              o.RotationAngle = d,
                T3Gv.optManager.AddToDirtyList(o.BlockID)
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
        var i = T3Gv.optManager.Table_GetCellClicked(e, t);
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
      d = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
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
      (s = T3Gv.optManager.GetObjectPtr(l, !1)) &&
      (
        u = s.Frame.x < C,
        p = s.Frame.y < y,
        S = s.Frame.x + s.Frame.width > C + f,
        c = s.Frame.y + s.Frame.height > y + L,
        s.UseEdges(u, p, S, c, t, a) &&
        (m = !0)
      );
    m &&
      T3Gv.optManager.RenderDirtySVGObjects(),
      this.theDirtyList = I
  }


  ResizeSVGDocument() {
    var e = T3Gv.objectStore.GetObject(this.theSEDSessionBlockID).Data;
    T3Gv.docHandler.ResizeDocument(e.dim.x, e.dim.y)
  }

  LM_TestIconClick(e) {
    var t,
      a = this.svgObjectLayer.FindElementByDOMElement(e.currentTarget);
    if (null != a) {
      var r = a.GetTargetForEvent(e),
        i = r.GetID(),
        n = r.GetUserData(),
        o = a.GetID(),
        s = T3Gv.optManager.GetObjectPtr(o, !1);
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
    T3Gv.optManager.autoScrollTimerId = this.autoScrollTimer.setTimeout('HandleObjectDragDoAutoScroll', 100);
    var e = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(T3Gv.optManager.autoScrollXPos, T3Gv.optManager.autoScrollYPos);
    T3Gv.docHandler.ScrollToPosition(e.x, e.y),
      T3Gv.optManager.HandleObjectDragMoveCommon(e.x, e.y)
  }


  PreDragDropOrStamp() {
    if (T3Gv.optManager.mainAppHammer) {
      T3Gv.optManager.UnbindDragDropOrStamp();
    }
    T3Gv.optManager.mainAppHammer = Hammer(T3Gv.optManager.mainAppElement);
    console.log('ListManager.LM.prototype.PreDragDropOrStamp', T3Gv.optManager.mainAppHammer)

  }

  LM_ShapeIconClick(e, t, a, r) {
    var i;
    if (null == (i = this.GetObjectPtr(t, !1))) return !1;
    if (i instanceof ShapeContainer) {
      var n = T3Gv.optManager.ContainerIsInCell(i);
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
            T3Gv.optManager.ShowExpandedView(S, e);
          break;
        case ConstantData.ShapeIconType.COMMENT:
          var c = null;
          if (r && r.split) {
            var u = r.split('.');
            u[1] &&
              (c = parseInt(u[1], 10))
          }
          T3Gv.optManager.EditComments(c);
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
        var d = T3Gv.optManager.Table_GetCellClicked(s, t);
        if (d >= 0 && !T3Gv.optManager.Table_AllowCellTextEdit(y, d)) return
      } else if (y && this.Table_GetFirstTextCell(y) < 0) return;
      var D = -1;//Double === T3Gv.optManager.SD_GetVisioTextChild(S);
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
              n = T3Gv.objectStore.CreateBlock(ConstantData.StoredObjectType.LM_TEXT_OBJECT, o)
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
              T3Gv.optManager.svgObjectLayer.MoveElementToFront(e)
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
    console.log('ListManager.LM.prototype.StampObjectMove 2 this.actionStoredObjectId=', this.actionStoredObjectId)


    /*
    Utils2.StopPropagationAndDefaults(e);
    var t = this.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
    if (this.actionStoredObjectId < 0) {
      if (
        !(
          e.gesture.center.clientX >= T3Gv.optManager.svgDoc.docInfo.dispX &&
          e.gesture.center.clientY >= T3Gv.optManager.svgDoc.docInfo.dispY
        )
      ) return;
      Collab.BeginSecondaryEdit(),
        this.MouseAddNewShape(this.useDefaultStyle),
        this.newObjectVisible = !0
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

    if (this.actionStoredObjectId < 0) {
      if (
        // e.gesture.center.clientX < T3Gv.optManager.svgDoc.docInfo.dispX ||
        // e.gesture.center.clientY < T3Gv.optManager.svgDoc.docInfo.dispY

        e.clientX < T3Gv.optManager.svgDoc.docInfo.dispX ||
        e.clientY < T3Gv.optManager.svgDoc.docInfo.dispY
      ) {
        return;
      }
      Collab.BeginSecondaryEdit();
      this.MouseAddNewShape(this.useDefaultStyle);
      this.newObjectVisible = true;
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
      this.useDefaultStyle = r,
      this.actionStoredObjectId = - 1,
      this.dragBBoxList = [],
      this.dragElementList = [],
      this.newObjectVisible = !1,
      this.drawShape = e,
      e.flags & ConstantData.ObjFlags.SEDO_TextOnly ? this.SetEditMode(ConstantData.EditState.TEXT) : this.SetEditMode(ConstantData.EditState.STAMP),
      T3Gv.Evt_StampObjectDragEnd = Evt_StampObjectDragEndFactory(r),
      T3Gv.optManager.mainAppHammer ||
      T3Gv.optManager.PreDragDropOrStamp(),
      T3Gv.optManager.mainAppHammer.on('drag', Evt_StampObjectDrag),
      T3Gv.optManager.mainAppHammer.on('dragend',  T3Gv.Evt_StampObjectDragEnd),
      this.LM_StampPreTrack(),
      this.DoAutoGrowDragInit()
     } catch (e) {
      console.log('ListManager.LM.prototype.DragDropNewShape 7 error=',e)
      throw e;
       T3Gv.optManager.CancelModalOperation(),
          T3Gv.optManager.ExceptionCleanup(e)
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
      this.useDefaultStyle = r;
      this.actionStoredObjectId = -1;
      this.dragBBoxList = [];
      this.dragElementList = [];
      this.newObjectVisible = false;
      this.drawShape = e;
      if (e.flags & ConstantData.ObjFlags.SEDO_TextOnly) {
        this.SetEditMode(ConstantData.EditState.TEXT);
      } else {
        this.SetEditMode(ConstantData.EditState.STAMP);
      }



      T3Gv.Evt_StampObjectDragEnd = EvtUtil.Evt_StampObjectDragEndFactory(r);

      // debugger;

      if (!T3Gv.optManager.mainAppHammer) {
        T3Gv.optManager.PreDragDropOrStamp();
      }

      // debugger
      this.WorkAreaHammer.enable(!1);

      // T3Gv.optManager.mainAppHammer.on('drag', EvtUtil.Evt_StampObjectDrag);
      // T3Gv.optManager.mainAppHammer.on('dragend', Evt_StampObjectDragEnd);

      T3Gv.optManager.mainAppHammer.on('mousemove', EvtUtil.Evt_StampObjectDrag);

      // console.log('===T3Gv.Evt_StampObjectDragEnd', T3Gv.Evt_StampObjectDragEnd)
      // T3Gv.optManager.mainAppHammer.on('mousedown', T3Gv.Evt_StampObjectDragEnd);
      // T3Gv.optManager.mainAppHammer.on('mousedown', console.log('=== mousedown'));
      // T3Gv.optManager.mainAppHammer.on('click', T3Gv.Evt_StampObjectDragEnd);
      // T3Gv.optManager.mainAppHammer.on('click', function (e) { console.log('===DragDropNewShape click', e) });

      // T3Gv.optManager.mainAppHammer.on('dragend', function (e) { console.log('===DragDropNewShape dragend', e) });
      // T3Gv.optManager.mainAppHammer.on('dragend', EvtUtil.Evt_StampObjectDragEndFactory(r));

      // T3Gv.optManager.mainAppHammer.on('dragend', function (e) { T3Gv.optManager.DragDropObjectDone(e, r) })
      T3Gv.optManager.mainAppHammer.on('dragend', T3Gv.Evt_StampObjectDragEnd);

      // const fun = function (t) {
      //   T3Gv.optManager.DragDropObjectDone(t, e);
      //   return true;
      // }

      // T3Gv.optManager.mainAppHammer.on('dragend', function (t) {
      //   console.log('===DragDropNewShape dragend', t);
      //   return T3Gv.optManager.DragDropObjectDone(t, e), true;
      // });

      // T3Gv.optManager.mainAppHammer.on('mouseup', T3Gv.Evt_StampObjectDragEnd);


      // T3Gv.optManager.mainAppHammer.on('click', function (e) {
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
      // testHammer.on('dragend', T3Gv.Evt_StampObjectDragEnd);



      // console.log('ListManager.LM.prototype.DragDropNewShape 8 T3Gv.optManager.mainAppHammer', T3Gv.optManager.mainAppHammer)

      this.LM_StampPreTrack();
      this.DoAutoGrowDragInit();
    } catch (e) {
      console.log('ListManager.LM.prototype.DragDropNewShape error:', e);
      T3Gv.optManager.CancelModalOperation();
      T3Gv.optManager.ExceptionCleanup(e);
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
      this.useDefaultStyle = r,
      this.actionStoredObjectId = - 1,
      this.dragBBoxList = [],
      this.dragElementList = [],
      this.newObjectVisible = !1,
      this.drawShape = e,
      this.drawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly ? this.SetEditMode(ConstantData.EditState.TEXT) : this.SetEditMode(
        ConstantData.EditState.STAMP,
        ConstantData.CursorType.STAMP
      ),
      this.WorkAreaHammer.enable(!1),
      $(window).bind('mousemove', EvtUtil.Evt_MouseStampObjectMove),
      T3Gv.SDJS_LM_MouseStampObjectDone = EvtUtil.Evt_MouseStampObjectDoneFactory(r),
      $(window).bind('mousedown', T3Gv.SDJS_LM_MouseStampObjectDone),
      $(window).bind('click', T3Gv.SDJS_LM_MouseStampObjectDone),
      this.LM_StampPreTrack(),
      this.DoAutoGrowDragInit()
  }


  MouseStampObjectDone(e, t) {
    // debugger
    try {
      var a,
        r,
        i,
        n,
        o = T3Gv.optManager.svgDoc.docInfo,
        s = !1,
        l = [];
      if (
        T3Gv.optManager.ResetAutoScrollTimer(),
        e.clientX >= o.dispX + o.dispWidth &&
        (s = !0),
        e.clientX < T3Gv.optManager.svgDoc.docInfo.dispX &&
        (s = !0),
        e.clientY,
        T3Gv.optManager.svgDoc.docInfo.dispY,
        T3Gv.optManager.svgDoc.docInfo.dispHeight,
        e.clientY < T3Gv.optManager.svgDoc.docInfo.dispY &&
        (s = !0),
        s
      ) return this.CancelObjectStamp(!0),
        this.UpdateTools(),
        Collab.UnLockMessages(),
        void Collab.UnBlockMessages();
      if (this.actionStoredObjectId < 0) return;
      this.ClearAnySelection(!0);
      var S,
        c = {
          FrameList: []
        },
        u = this.svgDoc.ConvertWindowToDocCoords(e.clientX, e.clientY),
        p = this.drawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly;
      if (!p) {
        var d = this.LinkParams &&
          this.LinkParams.SConnectIndex >= 0;
        this.OverrideSnaps(e) &&
          (d = !0),
          T3Gv.docHandler.documentConfig.enableSnap &&
          !d &&
          (u = T3Gv.docHandler.SnapToGrid(u))
      }
      var D = u.x;
      this.stampHCenter &&
        (D -= this.drawShape.Frame.width / 2);
      var g = u.y;
      if (
        this.stampVCenter &&
        (g -= this.drawShape.Frame.height / 2),
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
        if (this.drawShape) {
          if (
            this.drawShape.sizedim.width = this.drawShape.Frame.width,
            this.drawShape.sizedim.height = this.drawShape.Frame.height,
            this.drawShape.objecttype === ConstantData.ObjectTypes.SD_OBJT_FRAME
          ) {
            var h = T3Gv.optManager.ZListPreserve();
            n = this.ReplaceSpecialObject(
              this.drawShape,
              this.actionStoredObjectId,
              h,
              this.drawShape.objecttype
            ),
              c.ReplaceSpecialObjectID = n
          }
          this.drawShape.UpdateFrame(this.drawShape.Frame),
            S = Utils1.DeepCopy(this.drawShape.Frame),
            c.FrameList.push(S),
            Collab.AddNewBlockToSecondary(this.drawShape.BlockID)
        }
        this.GetObjectPtr(this.actionStoredObjectId, !0)
      }
      c.LinkParams = Utils1.DeepCopy(this.LinkParams);
      var m = this.BuildCreateMessage(c, !1);
      if (
        this.SetLinkFlagsOnFilledClosedPolylines(),
        T3Gv.gBusinessManager &&
        // T3Gv.gBusinessManager instanceof Business.FloorPlan &&
        T3Gv.gBusinessManager instanceof FloorPlan &&
        T3Gv.gBusinessManager.EnsureCubicleBehindOutline(this.actionStoredObjectId),
        this.SetEditMode(ConstantData.EditState.DEFAULT),
        $(window).unbind('mousedown'),
        $(window).unbind('click'),
        $(window).unbind('mousemove', EvtUtil.Evt_MouseStampObjectMove),
        this.WorkAreaHammer.enable(!0),
        p ||
        l.push(this.actionStoredObjectId),
        this.theMoveList &&
          this.theMoveList.length ? (l = this.theMoveList.slice(0), this.actionStoredObjectId = - 1) : this.AddToDirtyList(this.actionStoredObjectId),
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
        this.actionStoredObjectId >= 0 &&
        this.stampCompleteCallback(this.actionStoredObjectId, this.stampCompleteUserData),
        this.stampCompleteCallback = null,
        this.stampCompleteUserData = null,
        this.stampHCenter = !1,
        this.stampVCenter = !1,
        this.stampShapeOffsetX = 0,
        this.stampShapeOffsetY = 0,
        this.LM_StampPostRelease(!0),
        this.DynamicSnaps_RemoveGuides(this.Dynamic_Guides),
        this.Dynamic_Guides = null,
        this.dragBBoxList = [],
        this.dragElementList = [],
        this.actionStoredObjectId = - 1,
        this.actionSvgObject = null,
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
        this.CompleteOperation(l),
        this.UpdateTools()
    } catch (e) {
      T3Gv.optManager.CancelModalOperation(),
        T3Gv.optManager.DragDrop_ExceptionCleanup(),
        T3Gv.optManager.ExceptionCleanup(e),
        T3Gv.optManager.UpdateTools()
    }
  }


  SetLinkFlagsOnFilledClosedPolylines(e) {

    var t,
      a,
      r = null,
      i = null;
    if (
      e &&
      (i = T3Gv.optManager.GetObjectPtr(e, !1)) &&
      i instanceof ListManager.PolyLine &&
      i.polylist &&
      i.polylist.closed &&
      T3Gv.optManager.SetLinkFlag(
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
          T3Gv.optManager.SetLinkFlag(
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
      this.actionStoredObjectId >= 0 &&
      (
        this.Undo(!0),
        this.ClearFutureUndoStates(),
        this.actionStoredObjectId = - 1,
        this.dragBBoxList = [],
        this.dragElementList = [],
        this.actionSvgObject = null
      ),
      this.SetEditMode(ConstantData.EditState.DEFAULT),
      e &&
      (
        $(window).unbind('mousedown'),
        $(window).unbind('click'),
        $(window).unbind('mousemove', EvtUtil.Evt_MouseStampObjectMove),
        T3Gv.optManager.WorkAreaHammer.enable(!0)
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
    T3Gv.optManager.emptyEMFList = [],
      T3Gv.optManager.emptySymbolList = [],
      Collab.UnLockMessages(),
      Collab.UnBlockMessages()
  }


  CancelObjectDragDrop(e) {
    if (
      this.SetModalOperation(ConstantData2.ModalOperations.NONE),
      this.LM_StampPostRelease(!1),
      this.actionStoredObjectId >= 0
    ) {
      var t = this.svgObjectLayer.GetElementByID(this.actionStoredObjectId);
      t &&
        this.svgObjectLayer.RemoveElement(t),
        this.Undo(!0),
        this.ClearFutureUndoStates(),
        this.actionStoredObjectId = - 1,
        this.dragBBoxList = [],
        this.dragElementList = [],
        this.actionSvgObject = null,
        Collab.AllowMessage() &&
        Collab.CloseSecondaryEdit()
    }
    this.SetEditMode(ConstantData.EditState.DEFAULT),
      e &&
      T3Gv.optManager.UnbindDragDropOrStamp(),
      this.stampCompleteCallback = null,
      this.stampCompleteUserData = null,
      this.theMoveList = null,
      this.stampShapeOffsetX = 0,
      this.stampShapeOffsetY = 0,
      this.stampHCenter = !1,
      this.stampVCenter = !1
  }


  LM_StampPreTrack() {
    T3Gv.optManager.GetObjectPtr(this.theSEDSessionBlockID, !1);
    this.LinkParams = new LinkParameters(),
      this.LinkParams.AutoInsert = this.AllowAutoInsert(),
      this.drawShape &&
      this.drawShape.flags &&
      this.drawShape.flags & ConstantData.ObjFlags.SEDO_DropOnBorder &&
      (this.LinkParams.DropOnLine = !0)
  }


  DragDropObjectDone(e, t) {

    debugger
    this.WorkAreaHammer.enable(!0)

    console.log('DragDropObjectDone e, t', e, t)

    try {
      var a = !1;
      Utils2.StopPropagationAndDefaults(e),
        T3Gv.optManager.ResetAutoScrollTimer();
      var r,
        i,
        n,
        o,
        s = T3Gv.optManager.svgDoc.docInfo,
        l = !1,
        S = [];
      if (
        e.gesture.center.clientX >= s.dispX + s.dispWidth &&
        (l = !0),
        e.gesture.center.clientX < T3Gv.optManager.svgDoc.docInfo.dispX &&
        (l = !0),
        e.gesture.center.clientY,
        T3Gv.optManager.svgDoc.docInfo.dispY,
        T3Gv.optManager.svgDoc.docInfo.dispHeight,
        e.gesture.center.clientY < T3Gv.optManager.svgDoc.docInfo.dispY &&
        (l = !0),
        l
      ) return this.CancelObjectDragDrop(!0),
        this.UpdateTools(),
        Collab.UnLockMessages(),
        void Collab.UnBlockMessages();
      if (null == this.LinkParams) return void this.CancelObjectDragDrop(!0);
      var c = this.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
      if (
        this.drawShape &&
        (
          a = this.drawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly
        ),
        !a
      ) {
        var u = this.LinkParams &&
          this.LinkParams.SConnectIndex >= 0;
        this.OverrideSnaps(e) &&
          (u = !0),
          T3Gv.docHandler.documentConfig.enableSnap &&
          !u &&
          (c = T3Gv.docHandler.SnapToGrid(c))
      }
      var p = c.x;
      this.stampHCenter &&
        (p -= this.drawShape.Frame.width / 2);
      var d = c.y;
      this.stampVCenter &&
        (d -= this.drawShape.Frame.height / 2);
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
        if (this.drawShape) {
          if (
            g = this.drawShape.BlockID,
            this.drawShape.sizedim.width = this.drawShape.Frame.width,
            this.drawShape.sizedim.height = this.drawShape.Frame.height,
            this.drawShape.objecttype === ConstantData.ObjectTypes.SD_OBJT_FRAME
          ) {
            var m = T3Gv.optManager.ZListPreserve();
            o = this.ReplaceSpecialObject(
              this.drawShape,
              this.actionStoredObjectId,
              m,
              this.drawShape.objecttype
            ),
              h.ReplaceSpecialObjectID = o
          }
          this.drawShape.UpdateFrame(this.drawShape.Frame),
            D = Utils1.DeepCopy(this.drawShape.Frame),
            h.FrameList.push(D),
            this.LinkParams.AutoInsert &&
            (h.RotationAngle = this.drawShape.RotationAngle),
            Collab.AddNewBlockToSecondary(this.drawShape.BlockID)
        }
        this.GetObjectPtr(this.actionStoredObjectId, !0)
      }
      if (
        h.LinkParams = Utils1.DeepCopy(this.LinkParams),
        h.AllowMany = !0,
        h.CustomSymbol = !1,
        this.drawShape &&
        null != this.drawShape.SymbolID
      ) {
        var C = SDUI.Commands.MainController.Symbols.GetLMObject(this.drawShape.SymbolID);
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
        T3Gv.optManager.UnbindDragDropOrStamp(),
        a ||
        S.push(this.actionStoredObjectId);
      var f = Business.GetSelectionBusinessManager(g);
      if (
        null == f &&
        (f = T3Gv.gBusinessManager),
        // f instanceof Business.FloorPlan &&
        // Double ===
        f instanceof FloorPlan &&
        f.EnsureCubicleBehindOutline(this.actionStoredObjectId),
        this.theMoveList &&
          this.theMoveList.length ? (S = this.theMoveList.slice(0), this.actionStoredObjectId = - 1) : this.AddToDirtyList(this.actionStoredObjectId),
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
        this.actionStoredObjectId >= 0 &&
        this.stampCompleteCallback(this.actionStoredObjectId, this.stampCompleteUserData),
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
        this.DynamicSnaps_RemoveGuides(this.Dynamic_Guides),
        this.Dynamic_Guides = null,
        this.actionStoredObjectId = - 1,
        this.dragBBoxList = [],
        this.dragElementList = [],
        this.actionSvgObject = null,
        this.SetModalOperation(ConstantData2.ModalOperations.NONE),
        this.CompleteOperation(S),
        this.UpdateTools()

    } catch (e) {
      T3Gv.optManager.CancelModalOperation(),
        T3Gv.optManager.DragDrop_ExceptionCleanup(),
        T3Gv.optManager.ExceptionCleanup(e)
      throw e
      //,
      // T3Gv.optManager.UpdateTools()
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
      a = null != this.drawShape.nativeDataArrayBuffer,
      !((t = this.AddNewObject(this.drawShape, e, !1)) < 0)
    ) {
      this.ActiveLayerZList().length,
        this.actionStoredObjectId = t;
      var n,
        o,
        s,
        l,
        S,
        c,
        u,
        p = T3Gv.optManager.VisibleZList();
      if (
        this.dragBBoxList = [],
        this.dragElementList = [],
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
          this.dragBBoxList.push(u),
          n = p.indexOf(S),
          this.AddSVGObject(n, S, !0, !1),
          this.dragElementList.push(S),
          T3Gv.docHandler.documentConfig.enableSnap &&
          S == this.actionStoredObjectId &&
          (this.dragTargetBBox = $.extend(!0, {
          }, u)),
          this.dragEnclosingRect = T3Gv.optManager.GetListSRect(this.theMoveList, !1, !0)
        );
      else if (a) {
        var d = this.GetObjectPtr(t, !1),
          D = T3Gv.optManager.GetObjectPtr(this.theSEDSessionBlockID, !1),
          g = null != d.ImageURL &&
            d.ImageURL.length > 0;
        d &&
          d.SymbolID !== ConstantData.Defines.Floorplan_WallOpeningID &&
          !g &&
          d.ApplyCurvature(D.def.rrectparam),
          n = p.indexOf(this.actionStoredObjectId),
          this.AddSVGObject(n, t, !0, !1)
      }
      this.actionSvgObject = this.svgObjectLayer.GetElementByID(this.actionStoredObjectId),
        this.LinkParams &&
        this.LinkParams.lpCircList.push(this.actionStoredObjectId),
        T3Gv.optManager.ShowFrame(!0),
        T3Gv.optManager.ShowXY(!0)
    }

    */


    let newObjectID;
    let hasNativeData = this.drawShape.nativeDataArrayBuffer !== null;
    let offset = 0;
    let isPolyLineContainer = false;

    if ((newObjectID = this.AddNewObject(this.drawShape, e, false)) >= 0) {
      this.actionStoredObjectId = newObjectID;
      let visibleZList = T3Gv.optManager.VisibleZList();
      this.dragBBoxList = [];
      this.dragElementList = [];

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

            this.dragBBoxList.push(svgFrame);
            let index = visibleZList.indexOf(moveObjectID);
            this.AddSVGObject(index, moveObjectID, true, false);
            this.dragElementList.push(moveObjectID);

            if (T3Gv.docHandler.documentConfig.enableSnap && moveObjectID === this.actionStoredObjectId) {
              this.dragTargetBBox = $.extend(true, {}, svgFrame);
            }

            this.dragEnclosingRect = T3Gv.optManager.GetListSRect(this.theMoveList, false, true);
          }
        }
      } else if (hasNativeData) {
        let newObject = this.GetObjectPtr(newObjectID, false);
        let sessionBlock = T3Gv.optManager.GetObjectPtr(this.theSEDSessionBlockID, false);
        let hasImageURL = newObject.ImageURL && newObject.ImageURL.length > 0;

        if (newObject && newObject.SymbolID !== ConstantData.Defines.Floorplan_WallOpeningID && !hasImageURL) {
          newObject.ApplyCurvature(sessionBlock.def.rrectparam);
        }

        let index = visibleZList.indexOf(this.actionStoredObjectId);
        this.AddSVGObject(index, newObjectID, true, false);
      }

      this.actionSvgObject = this.svgObjectLayer.GetElementByID(this.actionStoredObjectId);

      if (this.LinkParams) {
        this.LinkParams.lpCircList.push(this.actionStoredObjectId);
      }

      T3Gv.optManager.ShowFrame(true);
      T3Gv.optManager.ShowXY(true);
    }











  }


  HandleStampDragDoAutoScroll() {
    T3Gv.optManager.autoScrollTimerId = this.autoScrollTimer.setTimeout('HandleStampDragDoAutoScroll', 100);
    var e = T3Gv.optManager.svgDoc.ConvertWindowToDocCoords(T3Gv.optManager.autoScrollXPos, T3Gv.optManager.autoScrollYPos);
    T3Gv.docHandler.ScrollToPosition(e.x, e.y),
      T3Gv.optManager.StampObjectMoveCommon(e.x, e.y)
  }

  MouseStampObjectMove(e) {
    console.log('======== ListManager.LM.prototype.MouseStampObjectMove 1 e=', e)
    var t = this.svgDoc.ConvertWindowToDocCoords(e.clientX, e.clientY);
    if (this.actionStoredObjectId < 0) {
      if (
        !(
          e.clientX >= T3Gv.optManager.svgDoc.docInfo.dispX &&
          e.clientY >= T3Gv.optManager.svgDoc.docInfo.dispY
        )
      ) return;
      Collab.BeginSecondaryEdit(),
        this.MouseAddNewShape(this.useDefaultStyle),
        this.newObjectVisible = !0
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
      if (this.actionStoredObjectId > 0) {
        if (
          f.x < T3Gv.optManager.svgDoc.docInfo.dispX ||
          f.y < T3Gv.optManager.svgDoc.docInfo.dispY
        ) {
          if (this.newObjectVisible) {
            if (this.theMoveList && this.theMoveList.length) for (n = this.theMoveList.length, i = 0; i < n; ++i) p = this.theMoveList[i],
              (d = T3Gv.optManager.GetSVGDragElement(i)) &&
              d.SetVisible(!1);
            else this.actionSvgObject.SetVisible(!1);
            this.newObjectVisible = !1,
              T3Gv.optManager.ShowFrame(!1),
              T3Gv.optManager.ShowXY(!1)
          }
          return
        }
        if (!this.newObjectVisible) {
          if (this.theMoveList && this.theMoveList.length) for (n = this.theMoveList.length, i = 0; i < n; ++i) p = this.theMoveList[i],
            (d = T3Gv.optManager.GetSVGDragElement(i)) &&
            d.SetVisible(!0);
          else this.actionSvgObject.SetVisible(!0);
          this.newObjectVisible = !0,
            T3Gv.optManager.ShowFrame(!0),
            T3Gv.optManager.ShowXY(!0)
        }
      }
      var T = this.drawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly;
      if (r = this.GetObjectPtr(this.actionStoredObjectId, !1)) {
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
          T3Gv.docHandler.documentConfig.enableSnap &&
          !P &&
          !T &&
          (
            this.theMoveList &&
              this.theMoveList.length ? (
              D = this.theMoveList.indexOf(this.actionStoredObjectId),
              b = Utils1.DeepCopy(T3Gv.optManager.dragBBoxList[D]),
              o = r.GetSnapRect()
            ) : (b = Utils1.DeepCopy(this.actionBBox), o = r.GetSnapRect()),
            (
              y = this.dragEnclosingRect ? Utils1.DeepCopy(this.dragEnclosingRect) : o
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
          else if (T3Gv.docHandler.documentConfig.centerSnap) I = T3Gv.docHandler.SnapToGrid(C),
            null == R.x &&
            (C.x = I.x),
            null == R.y &&
            (C.y = I.y);
          else {
            var v = T3Gv.docHandler.SnapRect(M);
            null == R.x &&
              (C.x += v.x),
              null == R.y &&
              (C.y += v.y)
          }
        }
        if (this.theMoveList && this.theMoveList.length) {
          n = this.theMoveList.length,
            D = this.theMoveList.indexOf(this.actionStoredObjectId),
            o = this.dragEnclosingRect,
            L = {
              x: C.x + o.width / 2,
              y: C.y + o.height / 2
            },
            L = T3Gv.optManager.DoAutoGrowDrag(L),
            C.x = L.x - o.width / 2,
            C.y = L.y - o.height / 2,
            s = C.x - o.x - o.width / 2,
            l = C.y - o.y - o.height / 2,
            o.x + s < 0 &&
            (s = - o.x),
            o.y + l < 0 &&
            (l = - o.y),
            o = T3Gv.optManager.dragBBoxList[D],
            r.SetShapeOrigin(o.x + s, o.y + l),
            C = this.LM_StampDuringTrack(C, r);
          var G = r.GetDimensionsForDisplay();
          T3Gv.optManager.UpdateDisplayCoordinates(G, C, ConstantData.CursorTypes.Plus, r),
            (k = new SelectionAttributes()).left = G.x,
            k.top = G.y;
          var N = r.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches;
          for (
            k.widthstr = ConstantData.DocumentContext.CurrentWidth,
            k.heightstr = ConstantData.DocumentContext.CurrentHeight,
            k.leftstr = this.GetLengthInRulerUnits(k.left, !1, T3Gv.docHandler.rulerSettings.originx, N),
            k.topstr = this.GetLengthInRulerUnits(k.top, !1, T3Gv.docHandler.rulerSettings.originy, N)
            ,
            // SDUI.Commands.MainController.UpdateRibbonDimensions(k),
            i = 0;
            i < n;
            ++i
          ) if (p = this.theMoveList[i], S = this.GetObjectPtr(p)) {
            if (p !== this.actionStoredObjectId) {
              if (null == (o = T3Gv.optManager.dragBBoxList[i])) continue;
              S.SetShapeOrigin(o.x + s, o.y + l)
            }
            null == (d = T3Gv.optManager.GetSVGDragElement(i)) &&
              S.ShapeType === ConstantData.ShapeType.SVGFRAGMENTSYMBOL &&
              null != S.SVGFragment &&
              (
                null == u &&
                (u = T3Gv.optManager.VisibleZList()),
                c = u.indexOf(p),
                this.AddSVGObject(c, p, !0, !1),
                d = T3Gv.optManager.svgObjectLayer.GetElementByID(p)
              ),
              d &&
              d.SetPos(o.x + s, o.y + l)
          }
        } else {
          o = Utils1.DeepCopy(this.actionBBox),
            y = Utils1.DeepCopy(this.dragEnclosingRect),
            L = {
              x: C.x + y.width / 2,
              y: C.y + y.height / 2
            },
            L = T3Gv.optManager.DoAutoGrowDrag(L),
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
          T3Gv.optManager.UpdateDisplayCoordinates(G, C, ConstantData.CursorTypes.Move, r),
            (k = new SelectionAttributes()).left = G.x,
            k.top = G.y;
          N = r.Dimensions & ConstantData.DimensionFlags.SED_DF_ShowFeetAsInches;
          k.widthstr = ConstantData.DocumentContext.CurrentWidth,
            k.heightstr = ConstantData.DocumentContext.CurrentHeight,
            k.leftstr = this.GetLengthInRulerUnits(k.left, !1, T3Gv.docHandler.rulerSettings.originx, N),
            k.topstr = this.GetLengthInRulerUnits(k.top, !1, T3Gv.docHandler.rulerSettings.originy, N),
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
            this.actionSvgObject.SetPos(o.x + s - g, o.y + l - h);
          var U = this.LinkParams &&
            this.LinkParams.SConnectIndex >= 0;
          E &&
            (
              U ? this.Dynamic_Guides &&
                (
                  this.DynamicSnaps_RemoveGuides(this.Dynamic_Guides),
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
          var a = T3Gv.optManager.svgObjectLayer.GetElementByID(t);
          if (
            null == a &&
            (
              (
                a = T3Gv.optManager.svgDoc.CreateShape(ConstantData.CreateShapeType.SHAPECONTAINER)
              ).SetID(e.BlockID),
              T3Gv.optManager.svgObjectLayer.AddElement(a, 0),
              e.LM_AddSVGTextObject(T3Gv.optManager.svgDoc, a)
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
        //T3Gv.optManager.RotatePointsAboutPoint(o, i, r),
        Utils3.RotatePointsAboutPoint(o, i, r),
        Utils2.GetPolyRect(e.r, r),
        Utils2.CopyRect(e.Frame, n)
    }
    return 0
  }



  LM_StampDuringTrack(e, t) {
    var a;
    if (this.actionStoredObjectId < 0) return e;
    if (this.theMoveList && this.theMoveList.length) return e;
    if (null == t) return e;
    if (
      a = this.Move_GetHookPoints(this.actionStoredObjectId, t, 0, 0)
    ) {
      if (
        this.dragDeltaX = 0,
        this.dragDeltaY = 0,
        (
          T3Gv.optManager.LinkParams.DropOnLine ||
          T3Gv.optManager.LinkParams.AutoInsert
        ) &&
        this.FindConnect(
          this.actionStoredObjectId,
          t,
          T3Gv.optManager.LinkParams.cpt,
          !0,
          !0,
          !1,
          e
        )
      ) return e.x += this.dragDeltaX,
        e.y += this.dragDeltaY,
        e;
      this.dragDeltaX = 0,
        this.dragDeltaY = 0,
        this.dragStartX = e.x,
        this.dragStartY = e.y,
        (
          this.FindConnect(
            T3Gv.optManager.actionStoredObjectId,
            t,
            a,
            !0,
            !1,
            T3Gv.optManager.LinkParams.AllowJoin,
            e
          ) ||
          T3Gv.optManager.LinkParams.JoinIndex >= 0
        ) &&
        (e.x += this.dragDeltaX, e.y += this.dragDeltaY)
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
          // T3Gv.optManager.RotatePointsAboutPoint(t, r, i)
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
          // T3Gv.optManager.RotatePointsAboutPoint(t, r, i)
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
      T3Gv.optManager.FindChildArrayByIndex(e, a, t) > 0;
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
    var t = T3Gv.optManager.GetObjectPtr(e);
    if (t && t.TextFlags & ConstantData.TextFlags.SED_TF_AttachD) {
      var a = T3Gv.optManager.GetObjectPtr(t.associd);
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
    var a = T3Gv.objectStore.PreserveBlock(e);
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
      G = T3Gv.optManager.ActiveVisibleZList(),
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
        T3Gv.optManager.AddToDirtyList(f.BlockID),
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
      null == (I = T3Gv.gBusinessManager.AddNewPolyLine(f.objecttype, U)) &&
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
          T3Gv.optManager.AddToDirtyList(I.BlockID)
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
          T3Gv.optManager.AddToDirtyList(I.BlockID)
        )
    }
    if (I.CalcFrame(), P) c = this.AddNewObject(I, !1, !0),
      Collab.AddNewBlockToSecondary(c),
      Collab.ClearCreateList(),
      Collab.AddToCreateList(c),
      N = !0,
      T3Gv.optManager.AddToDirtyList(c);
    else {
      var O = T3Gv.optManager.VisibleZList().indexOf(c);
      O >= 0 &&
        this.AddSVGObject(O, c, !0, !0)
    }
    for (
      (I = T3Gv.optManager.GetObjectPtr(c, !1)) &&
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
        T3Gv.optManager.AddToDirtyList(c)
    }
    return I instanceof PolyLineContainer &&
      I.MoveBehindAllLinked() &&
      (N = !0),
      N &&
      (
        T3Gv.optManager.IsTopMostVisibleLayer() ? T3Gv.optManager.RenderDirtySVGObjects() : T3Gv.optManager.RenderAllSVGObjects()
      ),
      c
  }







  PolyLJoin(e, t, a, r, i) {
    // debugger
    var n, o, s, l, S, c, u, p, d, D, g, h, m, C, y, f = null, L = null, I = null, T = null, b = [], M = [], P = !1, R = [], A = !1, _ = ConstantData.ActionTriggerType.LINEEND, E = {
      x: 0,
      y: 0
    }, w = {}, F = ConstantData.Defines.SED_KnobSize, v = -1, G = T3Gv.optManager.ActiveVisibleZList(), N = !1;

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
      T3Gv.optManager.AddToDirtyList(f.BlockID);
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
          T3Gv.optManager.AddToDirtyList(I.BlockID))
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
          T3Gv.optManager.AddToDirtyList(I.BlockID))
    }
    if (I.CalcFrame(),
      P)
      c = this.AddNewObject(I, !1, !0),
        Collab.AddNewBlockToSecondary(c),
        Collab.ClearCreateList(),
        Collab.AddToCreateList(c),
        N = !0,
        T3Gv.optManager.AddToDirtyList(c);
    else {
      var O = T3Gv.optManager.VisibleZList().indexOf(c);
      O >= 0 && this.AddSVGObject(O, c, !0, !0)
    }
    for ((I = T3Gv.optManager.GetObjectPtr(c, !1)) && I.DataID < 0 && (I.DataID = h,
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
        T3Gv.optManager.AddToDirtyList(c)
    }
    return I instanceof PolyLineContainer && I.MoveBehindAllLinked() && (N = !0),
      N && (T3Gv.optManager.IsTopMostVisibleLayer() ? T3Gv.optManager.RenderDirtySVGObjects() : T3Gv.optManager.RenderAllSVGObjects()),
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
        // T3Gv.optManager.RotatePointsAboutPoint(c, n, S)),
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
    return T3Gv.optManager.isMobilePlatform ? t = !0 : e.gesture ? 'onpointerdown' in window ? e.gesture.srcEvent instanceof PointerEvent &&
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
      g = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1);
    if (null != e) {
      for (a = (r = e.length ? e.length : 0) - 1; a >= 0; a--) {
        i = e[a];
        var h = T3Gv.objectStore.GetObject(i);
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
              T3Gv.optManager.UpdateLinks(),
              T3Gv.optManager.GanttFormat(D[a].BlockID, !0, !1, !0, null)
            );
          break;
        case ConstantData.ObjectTypes.SD_OBJT_NG_TIMELINE:
          null != T3Gv.optManager.GetObjectPtr(D[a].BlockID) &&
            T3Gv.optManager.Timeline_Format(D[a])
      }
    }
  }



  RemoveFromAllZLists(e) {
    var t,
      a,
      r = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !0),
      i = (r.layers, r.nlayers),
      n = [];
    for (t = 0; t < i; ++t) if (n = r.layers[t].zList, - 1 != (a = $.inArray(e, n))) return void n.splice(a, 1)
  }


  RemoveFromSelectedList(e) {
    var t = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !1),
      a = t.indexOf(e);
    - 1 !== a &&
      (
        (
          t = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !0)
        ).splice(a, 1),
        e === T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1).tselect &&
        (
          T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !0).tselect = - 1
        )
      )
  }

  ZList() {
    var e,
      t = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
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
    return T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !0).layers[0].zList
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
          if (null == (i = T3Gv.optManager.GetObjectPtr(o, !1))) return;
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
            (n = T3Gv.optManager.FindChildArray(e.BlockID, - 1)) < 0
          ) {
            if (
              i.objecttype === ConstantData.ObjectTypes.SD_OBJT_DECISIONTREE_CONNECTOR
            ) s = gDecisionTreeManager.GetChildConnectorStyle(e);
            else s = Business.GetChildConnectorStyle(e);
            if (
              (n = Business.AddConnector(100, 100, s, e.BlockID)) >= 0 &&
              (u = T3Gv.optManager.GetObjectPtr(n, !0)),
              null == u
            ) return;
            if (
              u.objecttype = S,
              u.subtype = c,
              S === ConstantData.ObjectTypes.SD_OBJT_DECISIONTREE_CONNECTOR
            ) u.TextFlags = ConstantData.TextFlags.SED_TF_AttachC;
            l ? (p.x = 0, p.y = - ConstantData.SEDA_Styles.SEDA_CoManager) : p = s.connect,
              T3Gv.optManager.UpdateHook(n, - 1, e.BlockID, s.hookpt, p, null),
              T3Gv.optManager.SetLinkFlag(e.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
              u.Pr_Format(n),
              T3Gv.optManager.AddToDirtyList(n)
          }
          if (S === ConstantData.ObjectTypes.SD_OBJT_MINDMAP_CONNECTOR) gMindMapManager.ChangeHook(e, t, a, r)
        }
      } else if (
        e instanceof SegmentedLine &&
        e.objecttype === ConstantData.ObjectTypes.SD_OBJT_GANTT_CONNECTOR &&
        e.hooks.length >= 2
      ) {
        var D = new Point(0, 0);
        D.x = T3Gv.optManager.GetDependencyLineEndX(e),
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
        T3Gv.optManager.FindChildArrayByIndex(e.BlockID, h) >= 0;
      ) (n = h.id) >= 0 &&
        0 === T3Gv.optManager.CN_GetNShapes(n) &&
        (d.push(n), T3Gv.optManager.DeleteObjects(d, !1))
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
              T3Gv.optManager.JoinHookList(t, g),
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
        r = T3Gv.optManager.GetObjectPtr(e, !1);
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
      var i = T3Gv.optManager.FindChildArray(t, e);
      if (i >= 0) if (0 === T3Gv.optManager.CN_GetNShapes(i)) {
        var n = [];
        n.push(i),
          T3Gv.optManager.DeleteObjects(n, !1)
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
        n = T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(r, i),
        // T3Gv.optManager.RotatePointsAboutPoint(o[0], - n, o),
        Utils3.RotatePointsAboutPoint(o[0], - n, o),
        o[1].y = o[0].y,
        o[2].x > o[0].x ? o[1].x = o[0].x + c * S : o[1].x = o[0].x - c * S,
        // T3Gv.optManager.RotatePointsAboutPoint(o[0], n, o),
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
        T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(e[S - 1], e[S]),
        l = T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(u[c - 1], u[c]),
        0.01
      )
    ) {
      for (n = S - 1; n >= 0; n--) {
        if (
          g(
            T3Gv.optManager.SD_GetCounterClockwiseAngleBetween2Points(e[n], e[S]),
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
    T3Gv.optManager.FixAnyCircularHooks(n);
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
      n = T3Gv.objectStore.PreserveBlock(e);
    this.DoAutoGrowDragInit(r);
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
            this.theMoveList.length ? a = a.concat(this.theMoveList) : a.push(this.drawShape.BlockID)
        ),
        this.drawShape.SymbolID
      ) {
        e.symbolID = this.drawShape.SymbolID,
          e.CreateList = a,
          e.StyleRecord = Utils1.DeepCopy(this.drawShape.StyleRecord),
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
          e.attributes.StyleRecord = Utils1.DeepCopy(this.drawShape.StyleRecord),
          e.attributes.Frame = Utils1.DeepCopy(this.drawShape.Frame),
          e.attributes.TMargins = Utils1.DeepCopy(this.drawShape.TMargins),
          e.attributes.TextGrow = this.drawShape.TextGrow,
          e.attributes.ObjGrow = this.drawShape.ObjGrow,
          e.attributes.TextAlign = this.drawShape.TextAlign,
          e.attributes.flags = this.drawShape.flags,
          e.attributes.moreflags = this.drawShape.moreflags,
          e.attributes.shapeparam = this.drawShape.shapeparam,
          e.attributes.Dimensions = this.drawShape.Dimensions,
          e.attributes.dataclass = this.drawShape.dataclass,
          this.drawShape.VertexArray &&
          (
            e.attributes.VertexArray = Utils1.DeepCopy(this.drawShape.VertexArray)
          ),
          e.ShapeType = this.drawShape.ShapeType,
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
    var a = T3Gv.optManager.GetObjectPtr(this.theSelectedListBlockID, !1)
      , r = this.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
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
            obj = T3Gv.optManager.GetObjectPtr(a[p], !1),
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
                // T3Gv.optManager.RotatePointsAboutPoint(y, s, f);
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
                T3Gv.optManager.ob = Utils1./* SDJS.Editor.*/DeepCopy(d);
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
                  T3Gv.optManager.ob = {}
              }
            else
              d.RotationAngle = e,
                d.UpdateFrame(d.Frame),
                (i = T3Gv.optManager.SD_GetVisioTextChild(a[u])) >= 0 && (n = T3Gv.optManager.GetObjectPtr(i, !0)) && (n.VisioRotationDiff ? n.RotationAngle = e - n.VisioRotationDiff : n.RotationAngle = e,
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
      var r = T3Gv.optManager.GetObjectPtr(e, !1);
      r &&
        (r.actionArrowHideTimerID = - 1)
    }
    T3Gv.optManager.fromOverlayLayer ? setTimeout((function () {
      T3Gv.optManager.SetActionArrowTimer(e)
    }), 0) : this.ClearOverlayElementsByID(a)
  }



  ClearActionArrowTimer(e) {
    if (!(e < 0)) {
      var t = T3Gv.optManager.GetObjectPtr(e, !1);
      t &&
        (
          t.actionArrowHideTimerID < 0 ||
          (
            T3Gv.optManager.actionArrowHideTimer.clearTimeout(t.actionArrowHideTimerID),
            t.actionArrowHideTimerID = - 1
          )
        )
    }
  }

  ClearOverlayElementsByID(e, t) {
    var a,
      r,
      i = T3Gv.optManager.svgOverlayLayer.GetElementListWithID(e),
      n = i.length;
    for (a = 0; a < n; ++a) T3Gv.optManager.svgOverlayLayer.RemoveElement(i[a]);
    t &&
      - 1 != this.curHiliteShape &&
      (r = this.GetObjectPtr(this.curHiliteShape, !1)) &&
      (r.SetRuntimeEffects(!1), r.ClearCursors())
  }



  AlignShapes(e) {
    var t, a, r = !1, i = T3Gv.objectStore.GetObject(this.theSelectedListBlockID).Data, n = i.length;
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
          T3Gv.optManager.CloseEdit();
        var o,
          s,
          l = Business.GetNextSelect(),
          S = [],
          c = T3Gv.objectStore.PreserveBlock(this.theSelectedListBlockID).Data;
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
    var e = T3Gv.objectStore.GetObject(this.theSelectedListBlockID);
    return null != e &&
      0 !== e.Data.length
  }


  AddtoDelete(e, t, a) {
    var r, i, n, o, s, l, S, c, u, p, d, D, g, h, m, C, y, f, L, I, T, b, M = -1, P = !1, R = 0, A = {}, _ = [],
      E = (ConstantData.ConnectorDefines.SEDA_NSkip,
        ConstantData.ConnectorDefines);
    for (i = e.length,
      r = 0; r < i; r++)
      if (null != (n = T3Gv.optManager.GetObjectPtr(e[r], !1)))
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
                  f = T3Gv.optManager.FindChildArray(e[r], -1),
                  null == (L = T3Gv.optManager.GetObjectPtr(f, !1)) && (L = l),
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
              if ((o = T3Gv.optManager.FindChildArray(e[r], I)) >= 0) {
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
            for (b = (o = T3Gv.optManager.FindAllChildConnectors(y)).length,
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
            var J = T3Gv.optManager.FindAllChildObjects(n.BlockID, ConstantData.DrawingObjectBaseClass.SHAPE, ConstantData.ObjectTypes.SD_OBJT_MULTIPLICITY);
            if (J && J.length) {
              var x = J.length;
              for (m = 0; m < x; m++)
                e.indexOf(J[m]) < 0 && e.push(J[m])
            }
          }
          if (!t)
            for (b = (T = T3Gv.optManager.FindAllChildObjects(n.BlockID, ConstantData.DrawingObjectBaseClass.LINE, null)).length,
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
        O = T3Gv.optManager.GetPolyLineLinks(M[0], 0),
        B = T3Gv.optManager.GetPolyLineLinks(M[1], 0);
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
            a = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1);
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
      t = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
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
    //   T3Gv.optManager.Comment_BuildPanel()

    // Double ===
  }



  Redo(e) {
    // debugger
    if (null === T3Gv.stateManager)
      //   throw new SDJSError({
      //   source: 'ListManager.Undo',
      //   message: 'stateManager is null'
      // });
      throw new Error('stateManager is null');
    if (e) T3Gv.optManager.CancelModalOperation();
    else if (T3Gv.stateManager.CurrentStateID + 1 >= T3Gv.stateManager.States.length) return !1;
    var t = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
      a = t.EnableSpellCheck,
      r = 0 === t.RecentSymbols.length,
      i = this.GetObjectPtr(this.theTEDSessionBlockID, !1);
    - 1 != i.theActiveTextEditObjectID &&
      i.theTELastOp !== ConstantData.TELastOp.INIT &&
      i.theTELastOp !== ConstantData.TELastOp.TIMEOUT &&
      i.theTELastOp !== ConstantData.TELastOp.SELECT &&
      (this.FlushTextToLMBlock(), this.PreserveUndoState(!1));
    var n = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1),
      o = n.layers[n.activelayer].layertype;
    this.Redo_DeleteURLs();
    // var s = SDJS.Editor.IsStateOpen();
    var s = Utils1.IsStateOpen();
    T3Gv.stateManager.RestoreNextState(),
      T3Gv.stateManager.AddToHistoryState();
    var l = T3Gv.stateManager.CurrentStateID;
    this.RebuildURLs(T3Gv.stateManager.CurrentStateID - 1, !0),
      this.ResizeSVGDocument(),
      this.UpdateLineHops(!0),
      a !== (
        t = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1)
      ).EnableSpellCheck &&
      SDUI.Commands.MainController.Document.SetSpellCheck(t.EnableSpellCheck, !1);
    var S = T3Gv.docHandler.rulerSettings;
    T3Gv.docHandler.RulersNotEqual(t.rulerSettings, S) &&
      T3Gv.docHandler.SetRulers(t.rulerSettings, !0),
      T3Gv.docHandler.PagesNotEqual(t.Page, T3Gv.optManager.theContentHeader.Page) &&
      (
        T3Gv.optManager.theContentHeader.Page = Utils1.DeepCopy(t.Page)
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
      T3Gv.optManager.InUndo = !0,
      this.RenderAllSVGObjects(),
      T3Gv.optManager.InUndo = !1;
    var p = this.GetObjectPtr(this.theSEDSessionBlockID, !1);
    // Resources.CurrentTheme.Name !== p.CurrentTheme &&
    //   (new SDUI.ThemeController).SwitchTheme(p.CurrentTheme);
    - 1 != i.theActiveTextEditObjectID &&
      this.ResetActiveTextEditAfterUndo();
    var d = T3Gv.optManager.GetTargetSelect();
    if (d >= 0) {
      var D = this.GetObjectPtr(d, !1),
        g = null;
      D &&
        (g = D.GetDimensionsForDisplay(), this.ShowFrame(!0)),
        T3Gv.optManager.UpdateDisplayCoordinates(g, null, null, D)
    } else this.ShowFrame(!1);
    if (
      o != (
        n = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theLayersManagerBlockID, !1)
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
      T3Gv.optManager.CommentIdleTab(),
      T3Gv.optManager.Comment_UpdatePanel(null),
      T3Gv.optManager.Comment_UpdateDropDown(),
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
      if (T3Gv.optManager.bInDimensionEdit) return void (
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
        this.theContentHeader.ClipboardType === ConstantData.ClipboardType.Image ? void T3Gv.optManager.SetBackgroundImage(this.theImageClipboard, 0) : r.theActiveTableObjectID >= 0 &&
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
      // T3Gv.optManager.ExceptionCleanup(e)
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
    T3Gv.optManager.isAndroid ||
      T3Gv.gDebugMobileTextDialog ? e.SetVirtualKeyboardHook(
        (function (e, t) {
          T3Gv.optManager.MobileTextDialogTrigger(e, t)
        }),
        null
      ) : (
      T3Gv.optManager.workAreaTextInputProxy ||
      (T3Gv.optManager.workAreaTextInputProxy = $('#SDTS_TouchProxy')),
      T3Gv.optManager.workAreaTextInputProxy.val(''),
      e.SetVirtualKeyboardHook(
        (function (e, t) {
          T3Gv.optManager.VirtualKeyboardLifter(e, t)
        }),
        T3Gv.optManager.workAreaTextInputProxy
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
      T3Gv.optManager.virtualKeyboardLifterElementFrame ? n = a.x != T3Gv.optManager.virtualKeyboardLifterElementFrame.x ||
        a.y != T3Gv.optManager.virtualKeyboardLifterElementFrame.y ||
        a.width != T3Gv.optManager.virtualKeyboardLifterElementFrame.width ||
        a.height != T3Gv.optManager.virtualKeyboardLifterElementFrame.height : s = !0,
        (n || s) &&
        (
          o = T3Gv.docHandler.DocObject().ConvertDocToWindowCoords(a.x, a.y),
          0 === (
            r = T3Gv.docHandler.DocObject().ConvertDocToWindowLength(a.width)
          ) &&
          (r = 1),
          0 === (
            i = T3Gv.docHandler.DocObject().ConvertDocToWindowLength(a.height)
          ) &&
          (i = 1),
          T3Gv.optManager.virtualKeyboardLifterElementFrame = $.extend(!0, {
          }, a),
          T3Gv.optManager.workAreaTextInputProxy.css('visibility', 'visible'),
          GlobalDatagDebugVirtualKeyboardLifter ? (
            T3Gv.optManager.workAreaTextInputProxy.css('background-color', 'yellow'),
            T3Gv.optManager.workAreaTextInputProxy.css('opacity', '0.25'),
            T3Gv.optManager.workAreaTextInputProxy.css('color', 'black'),
            T3Gv.optManager.workAreaTextInputProxy.css('z-index', '1000'),
            o.y += i
          ) : (
            T3Gv.optManager.workAreaTextInputProxy.css('opacity', '0'),
            T3Gv.optManager.workAreaTextInputProxy.css('color', 'transparent'),
            T3Gv.optManager.workAreaTextInputProxy.css('z-index', '-1000'),
            T3Gv.optManager.workAreaTextInputProxy.css('text-align', 'left'),
            T3Gv.optManager.isMac ? (o.x += r, i = 1) : (o.x = - 9999, r = 800)
          ),
          T3Gv.optManager.workAreaTextInputProxy.css('left', o.x + 'px'),
          T3Gv.optManager.workAreaTextInputProxy.css('top', o.y + 'px'),
          T3Gv.optManager.workAreaTextInputProxy.css('width', r + 'px'),
          T3Gv.optManager.workAreaTextInputProxy.css('height', i + 'px'),
          s &&
          T3Gv.optManager.workAreaTextInputProxy.val(''),
          T3Gv.optManager.workAreaTextInputProxy.focus()
        )
    } else T3Gv.optManager.virtualKeyboardLifterElementFrame = null,
      T3Gv.optManager.workAreaTextInputProxy.css('visibility', 'visible'),
      T3Gv.optManager.workAreaTextInputProxy.blur(),
      T3Gv.optManager.workAreaTextInputProxy.val(''),
      T3Gv.optManager.workAreaTextInputProxy.css('visibility', 'hidden')
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
                var p = T3Gv.optManager.GetObjectPtr(u.BlockID, !1);
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
        this.textEntryTimer = setTimeout(T3Gv.optManager.TextEdit_PauseTyping, 1000)
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
        var I = T3Gv.objectStore.GetObject(m);
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
          !e ? T3Gv.optManager.CompleteOperation(null) : (this.PreserveUndoState(!1), this.RenderDirtySVGObjects()),
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
    return e ? T3Gv.docHandler.rulerSettings.showpixels ? 72 * e / T3Gv.docHandler.svgDoc.docInfo.docDpi : Math.round(72 * e / T3Gv.docHandler.svgDoc.docInfo.docDpi) : - 1
  }




  SendToBackOf() {
    var e = this.GetFrontBackLayersForSelected();
    e.result &&
      this.SendToBackOfSpecificLayer(e.backmostindex)
  }


  SendToBackOfSpecificLayer(e, t) {
    var a = T3Gv.objectStore.GetObject(this.theSelectedListBlockID),
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
              (a = T3Gv.objectStore.PreserveBlock(this.theSelectedListBlockID)).Data = n
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
      a = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
      r = a.layers,
      i = a.nlayers,
      n = - 1,
      o = 0,
      s = this.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !1),
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
      r = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
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
      T3Gv.optManager.SwimlaneAddtoDelete(a, o, !0),
      a.objecttype
      ) {
        case s.SD_OBJT_SHAPECONTAINER:
          T3Gv.optManager.ContainerAddtoDelete(a, o);
          break;
        case s.SD_OBJT_TABLE_WITH_SHAPECONTAINER:
          T3Gv.optManager.TableContainerAddtoDelete(a, o)
      }
    }
    return o
  }


  ZListPreserveForLayer(e) {
    return T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !0).layers[e].zList
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
    // T3Gv.optManager.ShowLoading(!1)
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
      t = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
      a = T3Gv.docHandler.GetBackground();
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
        T3Gv.optManager.TextureList.Textures[n] &&
          (
            i.dim = T3Gv.optManager.TextureList.Textures[n].dim,
            i.url = T3Gv.optManager.TextureList.Textures[n].ImageURL,
            i.scale = T3Gv.optManager.CalcTextureScale(r.TextureScale, i.dim.x),
            t.background.Paint.TextureScale.Scale = i.scale,
            i.url ||
            (
              i.url = Constants.FilePath_CMSRoot + Constants.FilePath_Textures + T3Gv.optManager.TextureList.Textures[n].filename
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
    var e = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSEDSessionBlockID, !1),
      t = T3Gv.docHandler.GetBackground(),
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
    var a = T3Gv.objectStore.GetObject(this.theSelectedListBlockID),
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
              (a = T3Gv.objectStore.PreserveBlock(this.theSelectedListBlockID)).Data = n
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
      (S = T3Gv.optManager.ZList());
    var c = S.length;
    if (0 === c) return !1;
    var u = (t || T3Gv.objectStore.GetObject(this.theSelectedListBlockID).Data).length;
    if (u <= 1) return !1;
    if (o = t || T3Gv.optManager.GetMoveList(- 1, !0, !0, !1, {
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
          var i = T3Gv.optManager.GetObjectPtr(e[a], !0);
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
          var i = T3Gv.optManager.GetObjectPtr(e[t[a].index], !0);
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
        (y = T3Gv.optManager.GetObjectPtr(h[n], !0)).CommentID >= 0 &&
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
        var f = T3Gv.objectStore.PreserveBlock(y.NativeID);
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
    var T = T3Gv.optManager.AddNewObject(I, !0, !1);
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
    ) T3Gv.optManager.RemoveFromAllZLists(h[n]),
      T3Gv.optManager.DeleteLink(C, h[n], - 1, null, 0, !0);
    return l.length &&
      T3Gv.optManager.Comment_Group(l),
      c = (S = this.ActiveVisibleZList()).length,
      I.ConvertToNative(T3Gv.optManager.RichGradients, a),
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
      n = T3Gv.optManager.ZList();
    for (t = 0; t < e.length; t++) for (r = T3Gv.optManager.GetObjectPtr(e[t], !1), a = 0; a < n.length; a++) if (
      (i = T3Gv.optManager.GetObjectPtr(n[a], !1)).associd === r.BlockID &&
      - 1 === e.indexOf(i.BlockID)
    ) return !0;
    return !1
  }

  IsGroupNonDelete() {

    var e,
      t = null,
      a = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !1);
    for (e = 0; e < a.length; e++) {
      if (
        (t = T3Gv.optManager.GetObjectPtr(a[e], !1)).subtype == ConstantData.ObjectTypes.SD_SUBT_KANBAN_TABLE
      ) return !0;
      if (t.extraflags & ConstantData.ExtraFlags.SEDE_NoDelete) return !0;
      if (
        t.objecttype == ConstantData.ObjectTypes.SD_OBJT_TIMELINE_EVENT &&
        t.hooks.length > 0 &&
        T3Gv.optManager.GetObjectPtr(t.hooks[0].objid).objecttype == ConstantData.ObjectTypes.SD_OBJT_TIMELINE
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
      var S = T3Gv.optManager.GetObjectPtr(n, !1);
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
    var a = T3Gv.objectStore.GetObject(this.theSelectedListBlockID).Data,
      r = a.length;
    if (0 === r) return !1;
    var i = !1,
      n = null;
    for (e = 0; e < r; ++e) {
      if (
        (n = T3Gv.optManager.GetObjectPtr(a[e], !1))
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
      a = (a = T3Gv.optManager.GetObjectPtr(this.theSelectedListBlockID, !0)).slice(0);
      var l = [];
      for (e = 0; e < r; ++e) {
        n = T3Gv.optManager.GetObjectPtr(a[e], !1);
        var S = a[e];
        // n instanceof ListManager.GroupSymbol
        // Double ===
        n instanceof GroupSymbol
          ? (i = !0, l = l.concat(n.ShapesInGroup), this.UngroupShape(S)) : n.NativeID >= 0 ? (t = T3Gv.optManager.UngroupNative(S, !1, !0)) &&
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
        (a = T3Gv.optManager.GetObjectPtr(i[r], !1))
        // instanceof ListManager.GroupSymbol &&
        instanceof GroupSymbol &&
        a.ShapesInGroup &&
        (a = T3Gv.optManager.FindParentGroup(e, a))
      ) return a
    }
    return null
  }



  FlipShapes(e) {
    var t = function (e) {
      return !(Math.abs(e.RotationAngle % 180) < 20) &&
        Math.abs(e.RotationAngle % 90) < 20
    },
      a = T3Gv.objectStore.GetObject(this.theSelectedListBlockID).Data,
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
    var t = T3Gv.objectStore.GetObject(this.theSelectedListBlockID).Data,
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
            T3Gv.docHandler.documentConfig.centerSnap &&
            T3Gv.docHandler.documentConfig.enableSnap ||
            !1 === T3Gv.docHandler.documentConfig.enableSnap
          ) &&
            (
              o = (S.Frame.width - p.width) / 2,
              s = (S.Frame.height - p.height) / 2,
              (o || s) &&
              T3Gv.optManager.OffsetShape(n, - o, - s, 0)
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
      this.drawShape = e,
      this.ClearAnySelection(!1),
      this.SetEditMode(ConstantData.EditState.TEXT),
      this.WorkAreaHammerTap = function (t) {
        try {
          T3Gv.optManager.SetUIAdaptation(t),
            Collab.AllowMessage() &&
            Collab.BeginSecondaryEdit(),
            T3Gv.optManager.AddNewObject(e, r, !1);
          var a = T3Gv.optManager.ActiveLayerZList(),
            i = a.length;
          T3Gv.optManager.actionStoredObjectId = a[i - 1],
            T3Gv.optManager.actionSvgObject = T3Gv.optManager.svgObjectLayer.GetElementByID(T3Gv.optManager.actionStoredObjectId),
            T3Gv.optManager.StampTextObjectOnTapDone(t, r)
        } catch (e) {
          T3Gv.optManager.CancelModalOperation();
          T3Gv.optManager.ExceptionCleanup(e);
          T3Gv.optManager.UpdateTools();
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
      this.drawShape = null,
      this.theMoveList = null,
      this.actionStoredObjectId = - 1,
      this.actionSvgObject = null,
      this.UpdateTools()
  }

  StampTextObjectOnTapDone(e, t) {
    T3Gv.optManager.SetUIAdaptation(e);
    var a = [],
      r = this.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
      i = this.drawShape.flags & ConstantData.ObjFlags.SEDO_TextOnly;
    if (!i) {
      var n = this.LinkParams &&
        this.LinkParams.SConnectIndex >= 0;
      this.OverrideSnaps(e) &&
        (n = !0),
        T3Gv.docHandler.documentConfig.enableSnap &&
        !n &&
        (r = T3Gv.docHandler.SnapToGrid(r))
    }
    var o = r.x;
    o -= this.drawShape.Frame.width / 2;
    var s = r.y;
    var Collab_Data;
    s -= this.drawShape.Frame.height / 2,
      this.drawShape.Frame.x = o - this.stampShapeOffsetX,
      this.drawShape.Frame.y = s - this.stampShapeOffsetY,
      this.drawShape.sizedim.width = this.drawShape.Frame.width,
      this.drawShape.sizedim.height = this.drawShape.Frame.height,
      this.drawShape.UpdateFrame(this.drawShape.Frame),
      Collab.AddNewBlockToSecondary(this.drawShape.BlockID),
      Collab_Data = {},
      this.BuildCreateMessage(Collab_Data, !0),
      this.GetObjectPtr(this.actionStoredObjectId, !0),
      this.SetEditMode(ConstantData.EditState.DEFAULT),
      this.theMoveList &&
        this.theMoveList.length ? (
        this.DeleteObjects(a, !1),
        a = this.theMoveList.slice(0),
        this.actionStoredObjectId = - 1
      ) : this.AddToDirtyList(this.actionStoredObjectId),
      this.RenderDirtySVGObjects(),
      this.theMoveList = null,
      this.WorkAreaHammer.on('tap', EvtUtil.Evt_WorkAreaHammerClick),
      this.CompleteOperation(a),
      this.stampCompleteCallback &&
      this.actionStoredObjectId >= 0 &&
      this.stampCompleteCallback(this.actionStoredObjectId, this.stampCompleteUserData),
      this.stampCompleteCallback = null,
      this.stampCompleteUserData = null,
      this.stampHCenter = !1,
      this.stampVCenter = !1,
      this.stampShapeOffsetX = 0,
      this.stampShapeOffsetY = 0,
      this.LM_StampPostRelease(!0),
      i ||
      a.push(this.actionStoredObjectId),
      this.actionStoredObjectId = - 1,
      this.actionSvgObject = null,
      this.SetModalOperation(ConstantData2.ModalOperations.NONE),
      this.UpdateTools()
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
      p = T3Gv.optManager.GetObjectPtr(e, !0),
      d = T3Gv.optManager.SD_GetVisioTextChild(e),
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
        L = (T3Gv.optManager.ZListPreserve(), g.x),
        I = g.y,
        T = g.width / p.InitialGroupBounds.width;
      isNaN(T) &&
        (T = 1);
      var b = g.height / p.InitialGroupBounds.height;
      for (isNaN(b) && (b = 1), a = 0; a < C; ++a) {
        if (
          (y = T3Gv.optManager.GetObjectPtr(m[a], !0)).CommentID >= 0 &&
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
          y.ConvertToNative(T3Gv.optManager.RichGradients, !1),
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
          var M = T3Gv.optManager.GetObjectPtr(y.DataID, !0).runtimeText.styles,
            P = M.length;
          for (n = 0; n < P; ++n) M[n].size *= b
        } (r = y.GetTable(!0)) &&
          this.Table_ScaleTable(y, r, T, b),
          y.bInGroup = !1,
          this.AddToDirtyList(m[a]),
          T3Gv.optManager.RebuildLinks(f, m[a])
      }
      for (
        T3Gv.optManager.InsertObjectsIntoLayerAt(e, m),
        a = 0;
        a < S.length;
        a++
      ) {
        if (
          T3Gv.optManager.ob = S[a],
          l = T3Gv.optManager.GetObjectPtr(S[a].BlockID, !1),
          t
        ) var R = 2;
        else R = !1;
        T3Gv.optManager.MaintainLink(
          S[a].BlockID,
          l,
          T3Gv.optManager.ob,
          ConstantData.ActionTriggerType.FLIP,
          R
        )
      }
      T3Gv.optManager.ob = {};
      var A = D.length;
      for (a = 0; a < A; a++) T3Gv.optManager.SetLinkFlag(D[a], ConstantData.LinkFlags.SED_L_MOVE);
      T3Gv.optManager.UpdateLinks(),
        p.ShapesInGroup = [],
        this.DeleteObjects([e], !1),
        d >= 0 &&
        (
          (l = T3Gv.optManager.GetObjectPtr(d)).moreflags = Utils2.SetFlag(
            l.moreflags,
            ConstantData.ObjMoreFlags.SED_MF_VisioText,
            !1
          ),
          l.associd = - 1,
          this.BringObjectToFrontofLayer(d)
        ),
        o.length &&
        T3Gv.optManager.Comment_Ungroup(o),
        T3Gv.optManager.RenderDirtySVGObjects()
    }
  }



  RebuildLinks(e, t) {
    var a = T3Gv.optManager.GetObjectPtr(t, !1);
    if (a && a.hooks) for (var r = a.hooks.length, i = 0; i < r; i++)
      T3Gv.optManager.InsertLink(e, t, i, ConstantData.LinkFlags.SED_L_MOVE)
  }


  InsertObjectsIntoLayerAt(e, t) {
    var a = this.FindLayerForShapeID(e);
    if (a >= 0) {
      var r = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !0).layers,
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
      if (T3Gv.optManager.CutFromButton && e) return void (T3Gv.optManager.CutFromButton = !1);
      if (
        T3Gv.optManager.CutFromButton = !0 !== e,
        - 1 != this.GetObjectPtr(this.theTEDSessionBlockID, !1).theActiveTextEditObjectID ||
        this.bInNoteEdit ||
        T3Gv.optManager.bInDimensionEdit
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
      T3Gv.optManager.RestorePrimaryStateManager();
      T3Gv.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  CopyObjectsCommon(e) {
    var t,
      a,
      r = T3Gv.objectStore.GetObject(this.theSelectedListBlockID).Data;
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
      o = T3Gv.optManager.GetObjectPtr(this.theLayersManagerBlockID, !1),
      s = o.layers,
      l = o.nlayers;
    for (r = 0; r < l; ++r) for (t = (a = s[r].zList).length, i = 0; i < t; ++i) (n = T3Gv.optManager.GetObjectPtr(a[i], !1)) &&
      (n.Layer = r, n.GetTextures(e.TextureList))
  }



  PasteLM(e) {
    var t,
      a = {
        selectedList: []
      };
    if (
      t = T3Gv.optManager.PastePoint ? T3Gv.optManager.PastePoint : this.GetPastePosition(),
      Collab.AllowMessage()
    ) {
      var r = {};
      r.ClipboardString = Collab.BufferToString(e),
        r.pastepos = Utils1.DeepCopy(t)
    }
    return SDF.ReadSymbolFromBuffer(e, t.x, t.y, 0, !1, !0, a, !0, !1, !1, !1, !1),
      T3Gv.optManager.PastePoint = null,
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
      t = T3Gv.docHandler.svgDoc.GetWorkArea(),
      a = T3Gv.docHandler.svgDoc.docInfo.docToScreenScale;
    null != a &&
      0 !== a ||
      (a = 1);
    var r = {
      x: (t.scrollX + e) / a,
      y: (t.scrollY + e) / a
    };
    return t.scrollX === T3Gv.optManager.TopLeftPasteScrollPos.x &&
      t.scrollY === T3Gv.optManager.TopLeftPasteScrollPos.y ? (
      (r = T3Gv.optManager.TopLeftPastePos).x += 50,
      r.y += 50,
      T3Gv.optManager.PasteCount++,
      T3Gv.optManager.PasteCount > 5 &&
      (
        T3Gv.optManager.PasteCount = 0,
        r = {
          x: (t.scrollX + e) / a,
          y: (t.scrollY + e) / a
        }
      )
    ) : T3Gv.optManager.PasteCount = 0,
      T3Gv.optManager.TopLeftPastePos = {
        x: r.x,
        y: r.y
      },
      T3Gv.optManager.TopLeftPasteScrollPos = {
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
      T3Gv.optManager.bInDimensionEdit
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
        r = T3Gv.objectStore.GetObject(i)
      )
    ) {
      var n = r.Data;
      if (
        e &&
        !T3Gv.optManager.Comment_IsTarget(i) &&
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
      i = (r = null != a ? a : T3Gv.optManager.VisibleZList()).length,
      n = 0;
      n < i;
      n++
    ) {
      var u = T3Gv.optManager.GetObjectPtr(r[n], !1);
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
    var t = T3Gv.optManager.GetObjectPtr(this.theSEDSessionBlockID, !1),
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
      var r = T3Gv.optManager.GetObjectPtr(
        T3Gv.optManager.theSEDSessionBlockID,
        !1 === this.LastOpDuplicate && !t
      );
      e
        ? ((r.dupdisp.x = 0), (r.dupdisp.y = 0))
        : t
          ? ((r.dupdisp.x = t.Data.dupdisp.x), (r.dupdisp.y = t.Data.dupdisp.y))
          : this.LastOpDuplicate || ((r.dupdisp.x = 50), (r.dupdisp.y = 50));
      var i = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !1);
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
    T3Gv.bIsPrimaryStateManager ||
      (
        this.RestorePrimaryStateManagerLMMethods(),
        SDJS_select_primary_state_manager(),
        T3Gv.optManager.RenderAllSVGObjects()
      )
  }


  GetDocDirtyState() {
    return T3Gv.optManager.theContentHeader.DocIsDirty
  }


  SetDocDirtyState(e, t) {
    T3Gv.optManager.theContentHeader.DocIsDirty = e,
      e ? T3Gv.optManager.theContentHeader.AllowReplace = !1 : !0 === t &&
        (T3Gv.optManager.theContentHeader.AllowReplace = !0)
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
    if (t) for (a = T3Gv.stateManager.States[e + 1].StoredObjects.length, r = 0; r < a; r++) (i = T3Gv.stateManager.States[e + 1].StoredObjects[r]).Type === ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT ? i.StateOperationTypeID === Globals.StateOperationType.CREATE &&
      (
        o = i.Data,
        this.IsBlobURL(o.ImageURL) &&
        (n = T3Gv.objectStore.GetObject(i.ID)) &&
        (
          s = (o = n.Data).GetBlobBytes(),
          l = FileParser.GetImageBlobType(s.ImageDir),
          o.ImageURL = T3Gv.optManager.MakeURL(null, s.Bytes, l)
        )
      ) : i.Type === ConstantData.StoredObjectType.TABLE_OBJECT &&
      i.StateOperationTypeID === Globals.StateOperationType.CREATE &&
      (c = T3Gv.objectStore.GetObject(i.ID)) &&
    (u = c.Data, this.Table_RebuildURLs(u));
    for (a = T3Gv.stateManager.States[e].StoredObjects.length, r = 0; r < a; r++) (i = T3Gv.stateManager.States[e].StoredObjects[r]).Type === ConstantData.StoredObjectType.BASE_LM_DRAWING_OBJECT ? i.StateOperationTypeID === Globals.StateOperationType.DELETE ? t ||
      (n = T3Gv.objectStore.GetObject(i.ID)) &&
      (o = n.Data).BlobBytesID >= 0 &&
      this.IsBlobURL(o.ImageURL) &&
      (
        s = o.GetBlobBytes(),
        l = FileParser.GetImageBlobType(s.ImageDir),
        o.ImageURL = T3Gv.optManager.MakeURL(null, s.Bytes, l)
      ) : (
      S = i.Data,
      n = T3Gv.objectStore.GetObject(i.ID),
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
            (o.ImageURL = T3Gv.optManager.MakeURL(null, s.Bytes, l))
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
          (o.ImageURL = T3Gv.optManager.MakeURL(null, s.Bytes, l))
        )
      )
    ) : i.Type === ConstantData.StoredObjectType.TABLE_OBJECT &&
    (
      i.StateOperationTypeID === Globals.StateOperationType.DELETE ? t ||
        (c = T3Gv.objectStore.GetObject(i.ID)) &&
        (u = c.Data, T3Gv.optManager.Table_RebuildURLs(u)) : (
        p = i.Data,
        (c = T3Gv.objectStore.GetObject(i.ID)) ? (u = c.Data, this.Table_RefreshURLs(p, u, !1)) : this.Table_DeleteURLs(p)
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
      T3Gv.optManager.Table_HideUI(S) &&
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
              T3Gv.optManager.SetShapeR(o)
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
              T3Gv.optManager.SetShapeR(o)
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
                      l.SetConstraints(T3Gv.optManager.theContentHeader.MaxWorkDim.x, g.width, g.height)
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
                      v = T3Gv.optManager.RotateRect(w, F, o.RotationAngle),
                      G = (
                        F = {
                          x: p.x + p.width / 2,
                          y: p.y + p.height / 2
                        },
                        T3Gv.optManager.RotateRect(p, F, o.RotationAngle)
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
                      l.SetConstraints(T3Gv.optManager.theContentHeader.MaxWorkDim.x, g.width, g.height);
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
                      v = T3Gv.optManager.RotateRect(w, F, o.RotationAngle),
                      F = {
                        x: p.x + p.width / 2,
                        y: p.y + p.height / 2
                      },
                      G = T3Gv.optManager.RotateRect(p, F, o.RotationAngle);
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
                  var U = T3Gv.optManager.FitProp(o, l, I - g.height, d);
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
                      v = T3Gv.optManager.RotateRect(w, F, o.RotationAngle),
                      F = {
                        x: p.x + p.width / 2,
                        y: p.y + p.height / 2
                      },
                      G = T3Gv.optManager.RotateRect(p, F, o.RotationAngle);
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















































