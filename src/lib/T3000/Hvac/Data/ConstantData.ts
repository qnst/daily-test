

class ConstantData {

  public static TELastOp = {
    INIT: - 1, CHAR: 0, BS: 1, DEL: 2, STYLE: 3, CUT: 4, COPY: 5, PASTE: 6, SELECT: 7, TIMEOUT: 8
  }

  public static StoredObjectType = {
    BASE_LM_DRAWING_OBJECT: 'BaseDrawingObject',
    LM_TEXT_OBJECT: 'TextObject',
    LM_NOTES_OBJECT: 'NotesObject',
    SED_SESSION_OBJECT: 'SEDSession',
    TED_SESSION_OBJECT: 'TEDSession',
    SELECTEDLIST_OBJECT: 'SelectedList',
    LINKLIST_OBJECT: 'Links',
    LAYERS_MANAGER_OBJECT: 'LayersManager',
    H_NATIVE_OBJECT: 'hNative',
    H_NATIVEWIN_OBJECT: 'hNativeWindows',
    BLOBBYTES_OBJECT: 'BlobBytes',
    TABLE_OBJECT: 'Table',
    GRAPH_OBJECT: 'Graph',
    SDDATA_OBJECT: 'SDData',
    EXPANDEDVIEW_OBJECT: 'ExpandedView',
    LM_COMMENT_BLOCK: 'CommentBlock',
    LM_COMMENT_THREAD: 'CommentThread',
    LM_COMMENT_LIST: 'CommentList'
  }

  public static SessionFlags = {
    SEDS_Active: 1,
    SEDS_Snap: 2,
    SEDS_InLink: 4,
    SEDS_LLink: 8,
    SEDS_SLink: 16,
    SEDS_HorizText: 64,
    SEDS_TabNext: 128,
    SEDS_AttLink: 256,
    SEDS_SwitchSpell: 512,
    SEDS_FreeHand: 1024,
    SEDS_NoTreeOverlap: 2048,
    SEDS_AllowHops: 4096,
    SEDS_AutoConnect: 8192,
    SEDS_NoSideHitConvert: 16384,
    SEDS_Bk_Tile: 32768,
    SEDS_LockLayers: 65536,
    SEDS_AutoInsert: 131072,
    SEDS_SegLLinkToLinesOnly: 262144,
    SEDS_AutoFormat: 524288,
    SEDS_HideConnExpand: 1048576,
    SEDS_IsFlowChart: 2097152,
    SEDS_NoAnimate: 4194304,
    SEDS_AllowShapeReplace: 8388608,
    SEDS_RetiredFlag: 16777216,
    SEDS_ShowTaskIcons: 33554432,
    SEDS_NoStepFormatting: 1073741824,
    SEDS_NoPageBreakLines: 2147483648
  }

  public static RulerUnits = {
    SED_UNone: 0, SED_Inches: 1, SED_Feet: 2, SED_Mm: 3, SED_Cm: 4, SED_M: 5
  }

  public static Defines = {
    SED_CDim: 30000,
    MetricConv: 2.54,
    CONNECTPT_DIM: 7,
    CONNECTPT_LINE_DIM: 16,
    JOINPT_DIM: 10,
    JOINPT_LINE_DIM: 32,
    SED_MinWid: 1,
    NPOLYPTS: 100,
    SED_RoundFactor: 0.292893218,
    LongIntMax: 2147483647,
    SED_HorizOnly: 1,
    SED_VertOnly: 2,
    SED_SegMinLen: 4,
    SED_SegMinSeg: 4,
    SD_MaxLongDim: 10000000,
    SED_SegDefLen: 25,
    SED_Slop: 7,
    SED_EdgeSlop: 5,
    SED_SlopShapeExtra: 10,
    SED_ConnectorSlop: 25,
    SED_FlowConnectorSlop: 75,
    SED_FlowRadialSlop: 150,
    SED_FlowConnectorDisp: 50,
    SED_KnobSize: 9,
    SED_RKnobSize: 7,
    SED_CKnobSize: 14,
    SED_MinDim: 4,
    Action: 'action_',
    HitAreas: 'hitareas_',
    TableRowHit: 'table_rowhit',
    TableRowHitHidden: 'table_rowhithidden',
    TableRowSelection: 'table_rowselection',
    TableColHit: 'table_colhit',
    TableColHitHidden: 'table_colhithidden',
    TableColSelection: 'table_colselection',
    TableCellHit: 'table_cellhit',
    TableTextHit: 'table_texthit',
    TableSelection: 'table_selection',
    TableCells: 'table_cells',
    TableRowZone: 'table_rowzone',
    TableColZone: 'table_colzone',
    TableZoneDim: 3,
    GraphTextHit: 'graph_texthit',
    TableCellFrame: 'table_cellframe',
    TableCellSeparator: 'table_menuseparator',
    TableCellNoHit: 'table_cellnohit',
    EllipseAxes: 'axes_',
    SED_MaxPolySegs: 500,
    SD_MAXSTEPS: 100,
    DimensionDefaultStandoff: 25,
    DimensionDefaultNonStandoff: 5,
    DimensionDefaultTextGap: 3,
    DimensionLineColor: '#000000',// '#9999FF',

    // Set the default value to -2.5
    CoordinateLineDefaultStandoff: -2.5,// 25,
    CoordinateLineDefaultNonStandoff: 0,
    CoordinateLineDefaultTextGap: 3,

    //Double
    CoordinateLineColor: 'blue',
    FindObjectMinHitSpot: 5,
    DEFAULT_NONWORKINGDAYS: 130,
    SED_DefTMargin: 2,
    DefaultStyle: 'Style7',
    TextBlockStyle: 'Text Block',
    D3Style: 'D3',
    GanttBarDefaultStyle: 'Remaining',
    DefMargin: 50,
    SED_MaxLineThick: 48,
    SED_MaxJSLineThick: 8,
    SED_DNULL: 4294967295,
    DefRRect: 0.2,
    DefFixedRRect: 0.05,
    Icon_Person: 2,
    Icon_Dim: 18,
    Shape_Width: 150,
    Shape_Height: 75,
    Shape_Square: 100,
    SDMAXHOPS: 32,
    SED_MaxPoints: 16000,
    SED_PolyLNPts: 301,
    HOPPOLYPTS: 25,
    MAXARRAYSPACING: 1000,
    SED_DefThick: 6,
    MaxWorkDimX: 320000,
    MaxWorkDimY: 320000,
    CITreeSpacing: 36,
    CITreeSpacingExtra: 16,
    Connector_PlusPath: 'assets/images/connector/plus.svg',
    Connector_MinusPath: 'assets/images/connector/minus.svg',
    Connector_Move_Vertical_Path: 'assets/images/connector/move-vertical.svg',
    Connector_Move_Horizontal_Path: 'assets/images/connector/move-horizontal.svg',
    Floorplan_WallOpeningID: '6f8f8fce-dc39-40ec-8b44-3bc91897ca2b',
    Stickynote_SymbolID: '20b1b997-2ad1-461e-8cb7-c16920498da9',
    ActionArrowSizeH: 20,
    ActionArrowSizeV: 13,
    baseArrowSlop: 7,
    connectorArrowSlop: 25,
    Swimlane_Width: 150,
    Swimlane_Height: 75,
    MaxUserLayers: 32,
    MinSidePointLength: 40,
    DefaultRulerMajor: 100,
    STANDARD_INTERIOR_WALL: 8.33325,
    STANDARD_EXTERIOR_WALL: 12.5,
    METRIC_INTERIOR_WALL: 11.811023622047243,
    METRIC_EXTERIOR_WALL: 15.74796,
    AnnoHotDist: 200,
    RRectFixedDim: 100,
    MinLineDistanceForDeterminingOrientation: 0.2,
    Note_TextMargin: 6,
    Note_FontSize: 12,
    Note_Spacing: 0.1,
    IconShapeBottomOffset: 2,
    iconShapeRightOffset: 2,
    TimelineRowHeight: 25,
    NoteHeight: 20,
    SVGIconIndex: 450,
    MinCellDim: 3,
    MaxRecentSymbols: 8,
    MaxSwimlanes: 100,
    SwimlaneGap: 20,
    FrameGap: 20,
    FrameTitleHeight: 40,
    FrameTitleWidth: 200,
    FrameFillColor: '#F5F6F7',
    FrameLineColor: '#DDDDDD',
    FrameTextColor: '#333333',
    DefaultLayerName: 'Layer-1',
    MinLineDrawGap: 20,
    CustomSymbolSignature: 'JSCustomSymbol',
    PenStylingDefault: {
      Line: {
        Thickness: 1,
        Paint: {
          Opacity: 1,
          Color: '#000000',
          FillType: 1
        }
      }
    },
    HighlighterStylingDefault: {
      Line: {
        Thickness: 5,
        Paint: {
          Opacity: 0.35,
          Color: '#FFE536',
          FillType: 1
        }
      }
    }
  }

  public static ContentHeaderFlags = {
    CT_OnePage: 16,
    CT_AutoSpell: 32,
    CT_DA_Pages: 1024,
    CT_DA_Limit: 2048,
    CT_DA_NoAuto: 4096,
    CT_HideLeftPanel: 16384,
    CT_SymbolSearchCombine: 32768,
    CT_ShowRulers: 65536,
    CT_ShowGrid: 131072,
    CT_SnapToGridTL: 262144,
    CT_SnapToGridC: 524288,
    CT_SnapToShapes_Off: 1048576,
    CT_ShowPageDividers: 2097152,
    CT_TaskChanged: 268435456
  }

  public static Colors = {
    Color_White: '#FFFFFF',
    Color_Black: '#000000',
    Color_Hilite: '#0099FF',
    Color_Select: '#00FF00',
    Color_Row_Shade: '#F1F1F1',
    Color_Trans: 4294967295,
    Color_Gray: '#C0C0C0'
  }

  public static FillTypes = {
    SDFILL_TRANSPARENT: 0,
    SDFILL_SOLID: 1,
    SDFILL_GRADIENT: 2,
    SDFILL_TEXTURE: 3,
    SDFILL_IMAGE: 4,
    SDFILL_RICHGRADIENT: 5
  }

  public static GraphType = {
    SDGRAPH_TYPE_UNSET: - 1,
    SDGRAPH_TYPE_BAR: 0,
    SDGRAPH_TYPE_STACKEDBAR: 1,
    SDGRAPH_TYPE_LINE: 2,
    SDGRAPH_TYPE_PIE: 3,
    SDGRAPH_TYPE_LINEARPIE: 4,
    SDGRAPH_TYPE_STACKEDLINE: 5
  }

  public static GraphFlags = {
    SDAX_SEQUENCE_BY_POINTS: 1,
    SDAX_SEQUENCE_BY_SERIES: 2,
    SDAX_SEQUENCE_BY_CATEGORY: 4,
    SDAX_SEQUENCE_BY_POINTS_BY_SERIES: 8,
    SDAX_3D: 16,
    SDAX_FLAG_DATA_MODIFIED: 32,
    SDAX_AVAILABLE: 64,
    SDAX_SHOW_TABLE: 128,
    SDAX_FLIP_ROW_COL_ORIENTATION: 256,
    SDAX_REDIRECT_EDIT_SERIES_NAME: 2048,
    SDAX_DATATABLE_USER_MANAGED_GEOMETRY: 4096,
    SDAX_BG_IMAGEFILL: 8192,
    SDAX_AREABG_IMAGEFILL: 16384,
    SDAX_SHOW_STACKED_SCALE: 32768
  }

  public static AxisFlags = {
    SDAX_START_AT_LOWER_BOUND: 1,
    SDAX_HIDE_MAJOR_TICKS: 2,
    SDAX_HIDE_MINOR_TICKS: 4,
    SDAX_MAJOR_TICK_IF_LABEL: 8,
    SDAX_LABELS_ANGLED: 16,
    SDAX_SHOW_GRID_LINE_MAJOR: 32,
    SDAX_HIDE_AXIS_LINE: 64,
    SDAX_HIDE_LABELS: 128,
    SDAX_HIDE_TITLE: 256,
    SDAX_SHOW_GRID_LINE_MINOR: 512,
    SDAX_SHOW_SUMMARY_LABELS: 1024
  }

  public static LegendType = {
    SDAX_LEGEND_FULL: 0,
    SDAX_LEGEND_NONE: 1,
    SDAX_LEGEND_NAMES: 2,
    SDAX_LEGEND_SWATCHES: 3
  }

  public static HopDimX = [6, 8, 10]

  public static HopDimY = [4, 5, 6]

  public static HopStyle = { SDH_Box: 0, SDH_Arc: 1 }

  public static DimensionFlags = {
    SED_DF_EndPts: 1,
    SED_DF_AllSeg: 2,
    SED_DF_Total: 4,
    SED_DF_Select: 8,
    SED_DF_Always: 16,
    SED_DF_Area: 32,
    SED_DF_AreaSel: 64,
    SED_DF_Standoff: 128,
    SED_DF_Exterior: 256,
    SED_DF_ShowFractionalInches: 512,
    SED_DF_RectWithAndHeight: 1024,
    SED_DF_ShowLineAngles: 2048,
    SED_DF_InteriorAngles: 4096,
    SED_DF_HideHookedObjDimensions: 8192,
    SED_DF_ShowFeetAsInches: 16384
  }

  public static TextGrowBehavior = {
    PROPORTIONAL: 0,
    HORIZONTAL: 1,
    VERTICAL: 2,
    FSIZE: 3
  }

  public static StyleDefaults = {
    SDSTYLE_DEFAULT: 'Style7',
    SDSTYLE_DEFTHICK: 1,
    SDSTYLE_DEFFONT: 'Arial'
  }

  public static LayerFlags = {
    SDLF_Visible: 1,
    SDLF_Active: 2,
    SDLF_NoAdd: 4,
    SDLF_AllowCellEdit: 8,
    SDLF_UseEdges: 16
  }

  public static LayerTypes = {
    SD_LAYERT_NONE: 0,
    // SD_LAYERT_MINDMAP: 1,
    // SD_LAYERT_GANTT: 2,
    // SD_LAYERT_PERT: 3,
    SD_LAYERT_WEBPAGE: 4,
    // SD_LAYERT_TIMELINE: 5,
    // SD_LAYERT_MEETING: 6,
    SD_LAYERT_BACKGROUND: 7
  }

  public static DrawingObjectBaseClass = {
    SHAPE: 0,
    LINE: 1,
    CONNECTOR: 3
  }

  public static LineType = {
    LINE: 1,
    ARCLINE: 2,
    SEGLINE: 3,
    ARCSEGLINE: 4,
    POLYLINE: 5,
    PARABOLA: 6,
    FREEHAND: 7,
    NURBS: 501,
    NURBSSEG: 502,
    ELLIPSE: 503,
    ELLIPSEEND: 504,
    QUADBEZ: 505,
    QUADBEZCON: 506,
    CUBEBEZ: 507,
    CUBEBEZCON: 508,
    SPLINE: 509,
    SPLINECON: 510,
    MOVETO: 600,
    MOVETO_NEWPOLY: 601
  }

  public static PolyListFlags = {
    SD_PLF_FreeHand: 1,
    SD_PLF_OneStep: 2,
    SD_PLF_NoMiddleControlPoints: 4,
    SD_PLF_TimelineControlPoint: 8,
    SD_PLF_NoControl: 16,
    SD_PLF_WasExplict: 32,
    SD_PLF_HasMoveTo: 64,
    SD_PLF_HasPolyPoly: 128
  }

  public static PolySegFlags = {
    SD_PLS_Select: 1,
    SD_PLS_Hide: 2,
    SD_PLS_Temp: 4,
    SD_PLS_TempSave: 8,
    SD_PLS_VA: 16,
    SD_PLS_NVA: 32,
    SD_PLS_NoLine: 64,
    SD_PLS_NoFill: 128
  }

  public static ArcQuad = {
    SD_PLA_TL: 0,
    SD_PLA_BL: 1,
    SD_PLA_BR: 2,
    SD_PLA_TR: 3
  }

  //Text.CursorState
  public static CursorState = {
    NONE: 0,
    EDITONLY: 1,
    EDITLINK: 2,
    LINKONLY: 3
  }

  public static Constants = {
    FilePath_ImageKnobs: '../../../styles/img/knobs/',
    Knob_ExpandDiag1: 'expand-diagonal-handle-1.svg',
    Knob_ExpandDiag2: 'expand-diagonal-handle-2.svg',
    Knob_ExpandHoriz: 'expand-horizontal-handle.svg',
    Knob_ExpandVert: 'expand-vertical-handle.svg',
  }

  public static EventBehavior = {
    NORMAL: 'visiblePainted',
    INSIDE: 'visibleFill',
    OUTSIDE: 'visibleStroke',
    ALL: 'visible',
    HIDDEN: 'painted',
    HIDDEN_IN: 'fill',
    HIDDEN_OUT: 'stroke',
    HIDDEN_ALL: 'all',
    NONE: 'none'
  }

  public static CursorType = {
    AUTO: 'cur-auto',
    DEFAULT: 'cur-default',
    NONE: 'cur-none',
    CONTEXT_MENU: 'cur-context-menu',
    HELP: 'cur-help',
    POINTER: 'cur-pointer',
    PROGRESS: 'cur-progress',
    BUSY: 'cur-wait',
    CELL: 'cur-cell',
    CROSSHAIR: 'cur-crosshair',
    TEXT: 'cur-text',
    VERTICAL_TEXT: 'cur-vertical-text',
    ALIAS: 'cur-alias',
    COPY: 'cur-copy',
    MOVE: 'cur-move',
    NO_DROP: 'cur-no-drop',
    NOT_ALLOWED: 'cur-not-allowed',
    ALL_SCROLL: 'cur-all-scroll',
    COL_RESIZE: 'cur-col-resize',
    ROW_RESIZE: 'cur-row-resize',
    RESIZE_T: 'cur-n-resize',
    RESIZE_R: 'cur-e-resize',
    RESIZE_B: 'cur-s-resize',
    RESIZE_L: 'cur-w-resize',
    RESIZE_TB: 'cur-ns-resize',
    RESIZE_LR: 'cur-ew-resize',
    RESIZE_RT: 'cur-ne-resize',
    RESIZE_LT: 'cur-nw-resize',
    RESIZE_RB: 'cur-se-resize',
    RESIZE_LB: 'cur-sw-resize',
    NESW_RESIZE: 'cur-nesw-resize',
    NWSE_RESIZE: 'cur-nwse-resize',
    ZOOM_IN: 'cur-zoom-in',
    ZOOM_OUT: 'cur-zoom-out',
    ZOOM_GRAB: 'cur-zoom-grab',
    ZOOM_GRABBING: 'cur-zoom-grabbing',
    ANCHOR: 'cur-anchor',
    PAINT: 'cur-paint',
    ROTATE: 'cur-rotate',
    DROPLIB: 'cur-droplib',
    EDIT_X: 'cur-pencil-x',
    EDIT: 'cur-pencil',
    EDIT_CLOSE: 'cur-pencil-close',
    ADD: 'cur-add',
    STAMP: 'cur-stamp',
    ARR_DOWN: 'cur-arr-down',
    ARR_RIGHT: 'cur-arr-right',
    BRUSH: 'cur-brush',
    BRUSH_EDIT: 'cur-brush-edit',
    BRUSH_CELL: 'cur-brush-cell',
    BRUSH_TABLE: 'cur-brush-table',
    ADD_RIGHT: 'cur-add-right',
    ADD_LEFT: 'cur-add-left',
    ADD_UP: 'cur-add-up',
    ADD_DOWN: 'cur-add-down',
    ADD_PLUS: 'cur-add-plus',
    GRAB: 'cur-grab'
  }

  public static CursorTypes = {
    Default: 'DEFAULT',
    Plus: 'PLUS',
    Move: 'MOVE',
    Grow: 'GROW'
  }

  public static CreateShapeType = {
    RECT: 1,
    RRECT: 2,
    OVAL: 3,
    LINE: 4,
    POLYLINE: 5,
    POLYGON: 6,
    PATH: 7,
    TEXT: 8,
    IMAGE: 9,
    GROUP: 10,
    LAYER: 11,
    SYMBOL: 12,
    POLYLINECONTAINER: 13,
    POLYPOLYLINE: 14,
    SHAPECOPY: 15,
    SHAPECONTAINER: 16
  }

  static LayerMoveType = {
    BOTTOM: 0,
    BEFORE: 1,
    AFTER: 2,
    TOP: 3
  }

  public static ContainerListArrangements = {
    Row: 0,
    Column: 1
  }

  public static ContainerListFlags = {
    AllowOnlyContainers: 1,
    AllowOnlyNonContainers: 2,
    Sparse: 4,
    LeftChanged: 8,
    TopChanged: 16,
    Adjust: 32
  }

  public static CommentParams = {
    CommentID: - 1,
    DocumentThreadID: - 1,
    DropDownContainer: null,
    DropDownTextArea: null,
    Panel: null,
    PanelContainer: null,
    CommentTemplate: null,
    DateTemplate: null,
    PanelCommentTemplate: null,
    PanelTargetID: - 2,
    DeleteTarget: - 1
  }

  public static EditState = {
    DEFAULT: 1,
    STAMP: 2,
    TEXT: 3,
    FORMATPAINT: 4,
    LINKCONNECT: 5,
    LINKJOIN: 6,
    EDIT: 7,
    DRAGCONTROL: 8,
    DRAGSHAPE: 9,
    GRAB: 10
  }

  public static Geometry = {
    PI: 3.14159265358979
  }

  public static ObjFlags = {
    SEDO_Select: 1,
    SEDO_Hide: 2,
    SEDO_Erase: 4,
    SEDO_EraseOnGrow: 8,
    SEDO_Lock: 16,
    SEDO_Spare: 32,
    SEDO_ImageShape: 64,
    SEDO_Bounds: 128,
    SEDO_ImageOnly: 256,
    SEDO_TextOnly: 512,
    SEDO_NoPen: 1024,
    SEDO_IsTarget: 2048,
    SEDO_InList: 4096,
    SEDO_Assoc: 8192,
    SEDO_Obj1: 16384,
    SEDO_ContConn: 32768,
    SEDO_HUnGroup: 65536,
    SEDO_UseConnect: 131072,
    SEDO_DropOnBorder: 262144,
    SEDO_DropOnTable: 524288,
    SEDO_LineHop: 1048576,
    SEDO_LineMod: 2097152,
    SEDO_NoTableLink: 4194304,
    SEDO_MetaObject: 8388608,
    SEDO_NoLinking: 16777216,
    SEDO_PrintTrans: 33554432,
    SEDO_HasTransImage: 67108864,
    SEDO_AllowDropImage: 134217728,
    SEDO_NotVisible: 268435456,
    SEDO_NoMaintainLink: 536870912,
    SEDO_AllowMetaColor: 1073741824,
    SEDO_HideThumbnail: 2147483648
  }

  public static ExtraFlags = {
    SEDE_NoColor: 1,
    SEDE_NoShadow: 2,
    SEDE_NoTShadow: 4,
    SEDE_FlipHoriz: 8,
    SEDE_FlipVert: 16,
    SEDE_NoRotate: 32,
    SEDE_OldHookPt: 64,
    SEDE_PermAssoc: 128,
    SEDE_TableFit: 256,
    SEDE_TableActive: 512,
    SEDE_License: 1024,
    SEDE_PhotoPH: 2048,
    SEDE_ShareTable: 4096,
    SEDE_ShareProp: 8192,
    SEDE_AutoParent: 16384,
    SEDE_AutoNumber: 32768,
    SEDE_AutoChild: 65536,
    SEDE_ShareScale: 131072,
    SEDE_GroupHasScript: 262144,
    SEDE_IsPhotoTitle: 524288,
    SEDE_SideKnobs: 1048576,
    SEDE_ConnToConn: 2097152,
    SEDE_ConnToShapes: 4194304,
    SEDE_NoDelete: 8388608,
    SEDE_LinkVCenter: 16777216,
    SEDE_MaintainLinkedObjOrientation: 16777216,
    SEDE_ImageDup: 33554432,
    SEDE_ComboSelect: 67108864,
    SEDE_CollapseConn: 134217728,
    SEDE_ExtraPolySegs: 268435456,
    SEDE_DataUpdate: 536870912,
    SEDE_NoDraw: 1073741824,
    SEDE_DeleteOnUnhook: 2147483648
  }

  public static ObjMoreFlags = {

    SED_MF_FixedRR: 64,
    SED_MF_Container: 128,
    SED_MF_UseInfoNoteIcon: 256,
    SED_MF_ContainerChild: 512,
    SED_MF_AutoContainer: 1024,
    SED_MF_Frame_AllowNesting: 2048,
    SED_MF_Frame_Group: 4096
  }

  public static TextFlags = {
    SED_TF_BaseLine: 1,
    SED_TF_FitToText: 2,
    SED_TF_AttachB: 4,
    SED_TF_AttachA: 8,
    SED_TF_None: 16,
    SED_TF_AttachC: 32,
    SED_TF_Dimension: 64,
    SED_TF_HorizText: 128,
    SED_TF_AdjFSize: 256,
    SED_TF_OneClick: 512,
    SED_TF_OwnSize: 1024,
    SED_TF_FormCR: 2048,
    SED_TF_NoSpell: 4096,
    SED_TF_Clickhere: 8192,
    SED_TF_AttachD: 16384,
    SED_TF_TitleBlock: 32768,
    SED_TF_Attach: 16428
  }

  public static SessionMoreFlags = {
    SEDSM_FlowHorizOnly: 1,
    SEDSM_ValueStream: 2,
    SEDSM_FlowUseData: 4,
    SEDSM_FlowCalcNVA: 8,
    SEDSM_NoActionButton: 16,
    SEDSM_ShowGrid: 32,
    SEDSM_DrawToScale: 64,
    SEDSM_Swimlane_Cols: 128,
    SEDSM_Swimlane_Rows: 256,
    SEDSM_KeepUnits: 512,
    SEDSM_HideLayerTabs: 1024,
    SEDSM_HideDataIcons: 2048,
    SEDSM_NoCtrlArrow: 4096
  }

  public static LinkFlags = {
    SED_L_DELT: 1,
    SED_L_DELL: 2,
    SED_L_CHANGE: 4,
    SED_L_BREAK: 8,
    SED_L_MOVE: 16,
    SED_L_WASMOVE: 32
  }

  public static HookFlags = {
    SED_LC_Shape: 1,
    SED_LC_Line: 2,
    SED_LC_HOnly: 4,
    SED_LC_VOnly: 8,
    SED_LC_CHook: 16,
    SED_LC_ArrayMod: 32,
    SED_LC_NotOnPen: 64,
    SED_LC_MoveTarget: 128,
    SED_LC_AttachToLine: 256,
    SED_LC_NoSnaps: 512,
    SED_LC_ShapeOnLine: 1024,
    SED_LC_FindPoint: 2048,
    SED_LC_VirtualPoint: 4096,
    SED_LC_AutoInsert: 8192,
    SED_LC_ForceEnd: 16384,
    SED_LC_HookIsArray: 32768,
    SED_LC_HookInside: 65536,
    SED_LC_HookNoExtra: 131072,
    SED_LC_HookReverse: 262144,
    SED_LC_NoContinuous: 524288,
    SED_LC_TableRows: 1048576
  }

  public static ListCodes = {
    SED_LC_CIRCTARG: 1,
    SED_LC_MOVETARG: 2,
    SED_LC_MOVEHOOK: 3,
    SED_LC_TARGONLY: 4,
    SED_LC_CHILDRENONLY: 5,
    SED_LC_TOPONLY: 6,
    SED_LC_LINESONLY: 7,
    SED_LC_MOVETARGANDLINES: 8
  }

  public static FloatingPointDim = {
    SD_FP_Left: 1,
    SD_FP_Top: 2,
    SD_FP_Right: 4,
    SD_FP_Bottom: 8,
    SD_FP_Width: 16,
    SD_FP_Height: 32,
    SD_FP_Pos: 15,
    SD_FP_All: 63,
    SD_FP_PreserveDim: 64
  }

  public static HookPts = {
    SED_KTL: 1,
    SED_KTR: 2,
    SED_KBL: 3,
    SED_KBR: 4,
    SED_KTC: 5,
    SED_KBC: 6,
    SED_KLC: 7,
    SED_KRC: 8,
    SED_LL: 20,
    SED_LR: 21,
    SED_LT: 22,
    SED_LB: 23,
    SED_KCTL: 201,
    SED_KCTR: 202,
    SED_KCBL: 203,
    SED_KCBR: 204,
    SED_KCT: 205,
    SED_KCB: 206,
    SED_KCL: 207,
    SED_KCR: 208,
    SED_KCC: 209,
    SED_KAT: 220,
    SED_KATD: 221,
    SED_AK: 300,
    SED_AKCTL: 301,
    SED_AKCT: 305,
    SED_AKCB: 306,
    SED_AKCL: 307,
    SED_AKCR: 308,
    SED_AKCC: 309,
    SED_WTL: 321,
    SED_WTR: 322,
    SED_WBL: 323,
    SED_WBR: 324,
    SED_CustomBase: 500
  }

  public static HitCodes = {
    SED_Border: 40,
    SED_Inside: 41,
    SED_InsideE: 42,
    SED_InsideT: 43,
    SED_PLApp: 73,
    SED_InContainer: 101
  }

  public static Guide_DistanceTypes = {
    Room: 1,
    Horizontal_Wall: 2,
    Vertical_Wall: 3,
    PolyWall: 4
  }

  public static SegLDir = {
    SED_KTC: 5,
    SED_KBC: 6,
    SED_KLC: 7,
    SED_KRC: 8
  }

  public static ObjectTypes = {
    SD_OBJT_NONE: 0,
    SD_OBJT_PICTCONTAINER: 1,
    SD_OBJT_FRAME: 2,
    SD_OBJT_CABINETWALL: 3,
    SD_OBJT_CABINETFINISH: 4,
    SD_OBJT_BACKGROUND: 5,
    SD_OBJT_MINDMAP_MAIN: 6,
    SD_OBJT_MINDMAP_IDEA: 7,
    SD_OBJT_MINDMAP_CONNECTOR: 8,
    SD_OBJT_CAUSEEFFECT_MAIN: 9,
    SD_OBJT_SWIMLANE_ROWS: 11,
    SD_OBJT_SWIMLANE_COLS: 12,
    SD_OBJT_TIMELINE_EVENT: 13,
    SD_OBJT_STORYB_CONNECTOR: 15,
    SD_OBJT_FLOORPLAN_WALL: 16,
    SD_OBJT_TIMELINE: 18,
    SD_OBJT_2012GROUP: 19,
    SD_OBJT_KANBAN_CARD: 20,
    SD_OBJT_VALUESTREAM_TIMELINE: 21,
    SD_OBJT_VALUESTREAM_SYMBOL: 22,
    SD_OBJT_VALUESTREAM_TAKT: 23,
    SD_OBJT_DECISIONTREE_CONNECTOR: 24,
    SD_OBJT_PEDIGREE_CONNECTOR: 25,
    SD_OBJT_CAUSEEFFECT_BRANCH: 26,
    SD_OBJT_GENOGRAM_BRANCH: 27,
    SD_OBJT_STEPCHARTH_BRANCH: 28,
    SD_OBJT_STEPCHARTV_BRANCH: 29,
    SD_OBJT_BAD_STEPCHART_BRANCH: 30,
    SD_OBJT_DESCENDANT_CONNECTOR: 31,
    SD_OBJT_ANNOTATION: 32,
    SD_OBJT_UIELEMENT: 33,
    SD_OBJT_NG_TIMELINE: 34,
    SD_OBJT_NG_EVENT: 35,
    SD_OBJT_NG_EVENT_LABEL: 36,
    SD_OBJT_D3SYMBOL: 37,
    SD_OBJT_MANUAL_EVENT_LABEL: 38,
    SD_OBJT_MULTIPLICITY: 39,
    SD_OBJT_BPMN_EVENT_START: 40,
    SD_OBJT_BPMN_EVENT_INTERMEDIATE: 41,
    SD_OBJT_BPMN_EVENT_END: 42,
    SD_OBJT_BPMN_EVENT_START_NI: 43,
    SD_OBJT_BPMN_EVENT_INTERMEDIATE_NI: 44,
    SD_OBJT_BPMN_EVENT_INTERMEDIATE_THROW: 45,
    SD_OBJT_BPMN_ACTIVITY: 50,
    SD_OBJT_BPMN_GATEWAY: 51,
    SD_OBJT_BPMN_DATAOBJECT: 52,
    SD_OBJT_BPMN_CHOREOGRAPHY: 53,
    SD_OBJT_BPMN_POOL: 54,
    SD_OBJT_SHAPECONTAINER: 55,
    SD_OBJT_TABLE_WITH_SHAPECONTAINER: 56,
    SD_OBJT_BUSLOGIC_TABLE: 57,
    SD_OBJT_BUSLOGIC_TABLEROW: 58,
    SD_OBJT_BUSLOGIC_LINEDRAW: 59,
    SD_OBJT_SWIMLANE_GRID: 60,
    SD_OBJT_JIRA_ISSUES_CONTAINER_ISSUE: 61,
    SD_OBJT_JIRA_BLOCKINGISSUE: 62,
    SD_OBJT_JIRA_EPICDEPENDENCY: 63,
    SD_OBJT_JIRA_PRODUCTROADMAP: 64,
    SD_OBJT_JIRA_PIBOARD: 65,
    SD_OBJT_FRAME_CONTAINER: 75,
    SD_OBJT_BUSLOGIC_AWS: 76,
    SD_OBJT_BUSLOGIC_AZURE: 77,
    SD_OBJT_AZUREDEVOPS_ITEM_CARD: 78,
    SD_OBJT_EXTRATEXTLABEL: 80
  }

  public static ObjectSubTypes = {
    SD_SUBT_NONE: 0,
    SD_SUBT_TASKMAP: 1,
    SD_SUBT_MEETINGMAP: 2,
    SD_SUBT_HUBMAP: 3,
    SD_SUBT_MEETINGPERSON: 4,
    SD_SUBT_MEETINGTASK: 5,
    SD_SUBT_TASK: 6,
    SD_SUBT_HUBNODE: 7,
    SD_SUBT_KANBAN_TABLE: 8,
    SD_SUBT_CUBICLE: 9,
    SD_SUBT_VS_NVA: 10,
    SD_SUBT_VS_INV: 11,
    SD_SUBT_VS_SYMONLY: 12,
    SD_SUBT_UI_VRADIO: 13,
    SD_SUBT_UI_HRADIO: 14,
    SD_SUBT_UI_VCHECKBOX: 15,
    SD_SUBT_UI_HCHECKBOX: 16,
    SD_SUBT_UI_ACCORDION: 17,
    SD_SUBT_UI_VTABBED: 18,
    SD_SUBT_UI_HTABBED: 19,
    SD_SUBT_UI_MENU: 20,
    SD_SUBT_UI_VLIST: 21,
    SD_SUBT_UI_HLIST: 22,
    SD_SUBT_UI_RMENU: 23,
    SD_SUBT_UI_MMENU: 24,
    SD_SUBT_NGEVENT_STRAIGHT: 24,
    SD_SUBT_NGEVENT_VERTICAL: 25,
    SD_SUBT_NGEVENT_TEXTONLY: 26,
    SD_SUBT_NGEVENT_BULLET: 27,
    SD_SUBT_NGEVENT_BAR: 28,
    SD_SUBT_NGEVENT_BLOCK: 29,
    SD_SUBT_NGEVENT_SWIMLANE: 30,
    SD_SUBT_BPMN_EVENT_MESSAGE: 31,
    SD_SUBT_BPMN_EVENT_TIMER: 32,
    SD_SUBT_BPMN_EVENT_ERROR: 33,
    SD_SUBT_BPMN_EVENT_ESCALATION: 34,
    SD_SUBT_BPMN_EVENT_CANCEL: 35,
    SD_SUBT_BPMN_EVENT_COMPENSATION: 36,
    SD_SUBT_BPMN_EVENT_CONDITIONAL: 37,
    SD_SUBT_BPMN_EVENT_LINK: 38,
    SD_SUBT_BPMN_EVENT_SIGNAL: 39,
    SD_SUBT_BPMN_EVENT_TERMINATE: 40,
    SD_SUBT_BPMN_EVENT_MULTIPLE: 41,
    SD_SUBT_BPMN_EVENT_PARALLEL: 42,
    SD_SUBT_BPMN_ACTIVITY_TASK: 50,
    SD_SUBT_BPMN_ACTIVITY_SUBROUTINE: 51,
    SD_SUBT_BPMN_ACTIVITY_TRANSACTION: 52,
    SD_SUBT_BPMN_ACTIVITY_CALL: 53,
    SD_SUBT_BPMN_GATEWAY_EXCLUSIVE: 60,
    SD_SUBT_BPMN_GATEWAY_EVENT: 61,
    SD_SUBT_BPMN_GATEWAY_EXCLUSIVE_EVENT: 62,
    SD_SUBT_BPMN_GATEWAY_PARALLEL_EVENT: 63,
    SD_SUBT_BPMN_GATEWAY_INCLUSIVE: 64,
    SD_SUBT_BPMN_GATEWAY_PARALLEL: 65,
    SD_SUBT_BPMN_GATEWAY_COMPLEX: 66,
    SD_SUBT_BPMN_LINE: 70,
    SD_SUBT_ERD_LINE: 71,
    SD_SUBT_UML_LINE: 72,
    SD_SUBT_UMLCLASS_LINE: 73,
    SD_SUBT_UMLCOMPONENT_LINE: 74,
    SD_SUBT_LINEDRAW_SWIMLANE: 75,
    SD_SUBT_MULTIPLICITY_FLIPPED: 80
  }

  public static ImageScales = {
    SDIMAGE_ALWAYS_FIT: 0,
    SDIMAGE_CROP_TO_FIT: 1,
    SDIMAGE_PROP_FIT: 2
  }

  public static ShapeClass = {
    PLAIN: 1,
    GROUPSYMBOL: 2,
    SVGSYMBOL: 3,
    SVGFRAGMENTSYMBOL: 4,
    MISSINGEMF: 5
  }

  public static ShapeType = {
    // RECT: 'ListManager.Rect',
    // RRECT: 'ListManager.RRect',
    // OVAL: 'ListManager.Oval',
    // POLYGON: 'ListManager.Polygon',
    // VECTORSYMBOL: 'ListManager.VectorSymbol',
    // BITMAPSYMBOL: 'ListManager.BitmapSymbol',
    // GROUPSYMBOL: 'ListManager.GroupSymbol',
    // SVGFRAGMENTSYMBOL: 'ListManager.SVGFragmentSymbol',
    // D3SYMBOL: 'ListManager.D3Symbol'

    RECT: 'Rect',
    RRECT: 'RRect',
    OVAL: 'Oval',
    POLYGON: 'Polygon',
    VECTORSYMBOL: 'VectorSymbol',
    BITMAPSYMBOL: 'BitmapSymbol',
    GROUPSYMBOL: 'GroupSymbol',
    SVGFRAGMENTSYMBOL: 'SVGFragmentSymbol',
    D3SYMBOL: 'D3Symbol'
  }

  public static ClipboardType = {
    None: 0,
    Text: 1,
    LM: 2,
    Table: 3,
    Image: 4
  }

  public static ConnectorDefines = {
    DefaultHt: 25,
    DefaultWd: 25,
    A_Bk: 0,
    A_Cl: 1,
    A_Cr: 2,
    SEDA_NSkip: 3,
    StubHookPt: - 3,
    SEDAC_NORMAL: 0,
    SEDAC_ABOVE: - 2,
    SEDAC_BELOW: - 3,
    SEDAC_PARENT: - 4
  }

  public static SEDA_Styles = {
    SEDA_StartLeft: 1,
    SEDA_BothSides: 2,
    SEDA_Stagger: 4,
    SEDA_PerpConn: 8,
    SEDA_Linear: 16,
    SEDA_Radial: 32,
    SEDA_ReverseCol: 64,
    SEDA_EndConn: 128,
    SEDA_MinZero: 256,
    SEDA_CoManager: 512,
    SEDA_FlowConn: 1024,
    SEDA_GenoConn: 2048,
    SEDA_MatchSize: 4096,
    SEDA_MinInvisible: 8192,
    SEDA_MinOne: 16384,
    SEDA_Timeline: 32768
  }

  public static Array_Flags = {
    Array_LeaveA_Cl: 1,
    Array_LeaveA_Cr: 1
  }

  public static CollabMessageActions = {
    CreateSymbol: 1,
    CreateLine: 2,
    CreateShape: 3,
    MoveObject: 4,
    LinkObject: 5,
    AddLabel: 6
  }

  public static Collab_AnimationMessages = {
    CursorMove: 1000,
    ChangeSelection: 1001
  }

  public static CollabMessages = {
    SetStyleAttributes: 1,
    SetTextAttributes: 2,
    Text_Init: 3,
    Text_Edit: 4,
    Text_End: 5,
    AddSymbol: 6,
    AddLine: 7,
    ActionButton: 8,
    ActionButton_SplitPath: 9,
    LineDraw_InsertShape: 10,
    MoveObjects: 11,
    Dialog_Dimensions: 12,
    Action_Shape: 13,
    Action_Line: 14,
    Action_Connector: 15,
    PolyLSetSegmentType: 16,
    PolyLRemoveNodes: 17,
    PolyLAddNode: 18,
    PolyLSplit: 19,
    Duplicate: 20,
    DeleteObjects: 21,
    Table_DeleteCellContent: 22,
    PasteObjects: 23,
    Table_PasteCellContent: 24,
    Undo: 25,
    Redo: 26,
    FormatPainter: 27,
    Table_PasteFormat: 28,
    Edit_Note: 29,
    Comment_Add: 30,
    SetTextDirection: 31,
    ChangeWidth: 32,
    ChangeHeight: 33,
    SetTopLeft: 34,
    AlignShapes: 35,
    GroupSelectedShapes: 36,
    UngroupSelectedShapes: 37,
    RotateShapes: 38,
    FlipShapes: 39,
    BringToFrontOfSpecificLayer: 40,
    SendToBackOfSpecificLayer: 41,
    SpaceEvenly: 42,
    MakeSameSize: 43,
    ChangeShape: 44,
    ChangeLineType: 45,
    ChangeToSymbol: 46,
    OpenShapeEdit: 47,
    CloseShapeEdit: 48,
    SetTargetConnectionPoints: 49,
    SetShapeProperties: 50,
    SetColorFilter: 51,
    Lock: 52,
    SetObjectHyperlink: 53,
    FieldedDataImportFromFile: 54,
    InsertGraph: 55,
    InsertGauge: 56,
    SetBackgroundColor: 57,
    SetBackgroundGradient: 58,
    ResetBackgroundGradient: 59,
    SetBackgroundTexture: 60,
    SetPageOrientation: 61,
    SetPageMargins: 62,
    SetCustomPageMargins: 63,
    AddNewLayer: 64,
    SetLayers: 65,
    ShowAllLayers: 66,
    LayerTabClick: 67,
    Dialog_Options: 68,
    SetWorkArea: 69,
    CenterOnPage: 70,
    SetScalePreset: 71,
    ScaleDialog: 72,
    InsertTable: 73,
    RemoveTables: 74,
    SetTableProperties: 75,
    Table_DeleteRows: 76,
    Table_InsertRows: 77,
    Table_InsertColumns: 78,
    Table_DeleteColumns: 79,
    Table_JoinCells: 80,
    Table_SplitCells: 81,
    Table_DistributeRowandCols: 82,
    Table_SetCellFlags: 83,
    SetSDPFlag: 84,
    InsertSDONFromImport: 85,
    ApplyLineHopDialog: 86,
    AddCorner: 87,
    AddAnnotationLayer: 88,
    RemoveAnnotationLayer: 89,
    ShowDimensions: 90,
    SetBranchStyle: 91,
    SetChartStyle: 92,
    SetSDPMoreFlag: 93,
    UpdateGraph: 94,
    DataFieldDeleteTable: 95,
    SetDirection: 96,
    ConnectorSetSpacing: 97,
    ActionButton_JoinPath: 98,
    OrgSetTable: 99,
    MindMapSetTable: 100,
    MindMapAddIcon: 101,
    ReadJSONAPI: 102,
    UpdateProjectOptions: 110,
    UpdateProjectTimeframe: 111,
    InsertSwimlane: 112,
    MakeUniformSize: 113,
    BPMN_SwitchSymbol: 114,
    BPMN_SwitchIcon: 115,
    BPMN_AddRemoveParticipant: 116,
    ReverseArrowheads: 117,
    AddMultiplicity: 118,
    UIElementAction: 119,
    HandleIconClick: 120,
    CMD_NewDataTable: 121,
    CMD_DataFieldAdd: 122,
    CMD_DataFieldLabelChange: 123,
    CMD_DataFieldTypeSelect: 124,
    CMD_DataFieldDelete: 125,
    CMD_DataFieldMoveUp: 126,
    CMD_DataFieldMoveDown: 127,
    CMD_DataFieldRenameTable: 128,
    FieldedDataUpdateFromFile: 129,
    FieldedDataImportFromURL: 130,
    FieldedDataUpdateFromURL: 131,
    CMD_HandleDataChange: 132,
    UpdateFieldedDataTooltipItem: 133,
    AddDataRule: 134,
    UpdateDataRule: 135,
    DeleteDataRule: 136,
    CMD_SelectDataRule: 137,
    AttachRowToShape: 138,
    CMD_DataFieldUnlinkShape: 139,
    CMD_DataFieldDeleteData_NoShape: 140,
    CMD_DataFieldDeleteData: 141,
    HandleDataDrop: 142,
    SetHideIconState: 143,
    AddSelectedSymbol: 144,
    NudgeSelectedObjects: 145,
    SetSpellCheck: 148,
    ClearImage: 149,
    Table_ImportPicture: 150,
    Shape_ImportPicture: 151,
    AddShape_ImportPicture: 152,
    ContainerDoubleClick: 153,
    FieldedDataSetFieldPresetList: 154,
    FieldedDataClearFieldPresetList: 155,
    Table_InsertDeleteGroupCols: 156,
    Table_InsertDeleteGroupRows: 157,
    UpdateGauge: 158,
    SetFractionalPrecision: 159,
    SetDecimalPrecision: 160,
    OrgAddPicture: 161,
    SetLineCornerRadiusAll: 162,
    SwitchTheme: 163,
    UpdateDimensionFromTextObj: 164,
    SetDefaultWallThickness: 165,
    SetShapeMoreFlags: 166,
    Pr_InsertSymbol: 167,
    HandleDataRecordAdd: 168,
    InsertFrameContainer: 169,
    CreateTableFromReport: 170,
    Jira_CreateShapesForIssues: 171,
    UpdateSelectedShapeFromJiraInformation: 172,
    Jira_ProductRoadMap: 173,
    Multiplicity_SwitchSides: 174,
    UpdateObjectWithIntegrationCardItemInformation: 175,
    CreateShapesForIntegrationCardItems: 176,
    TimelineAddEvent: 177,
    TimelineRemoveEvent: 178,
    TimelineChangePosition: 179,
    TimelineChangeType: 180,
    TimelineChangeDate: 181,
    TimelineSetAuto: 182,
    TimelineMoveEvent: 183,
    HitAreaClick: 184,
    Table_FillSwimlane: 185,
    DeSelect: 186,
    SwimLane_Operation: 187,
    CreateSubProcess: 188,
    SubProcess_UpdateParent: 189,
    SetViewport: 190
  }

  public static CollabSVGEventTypes = {
    Object_Move: 1,
    Shape_Grow: 2,
    Table_GrowColumn: 3,
    TextEntry: 4
  }

  public static LineAngleDimensionDefs = {
    ANGLEDIMENSION_ARROWHEAD_SIZE: 10,
    ANGLEDIMENSION_ARROWHEAD_WIDTH: 4,
    ANGLEDIMENSION_PREFERRED_ARROWSTEM_MINIMUM: 4,
    ANGLEDIMENSION_PREFERRED_BISECTOR_LEN: 75
  }

  public static ActionTriggerType = {
    TOPLEFT: 1,
    TOPCENTER: 2,
    TOPRIGHT: 3,
    CENTERRIGHT: 4,
    BOTTOMRIGHT: 5,
    BOTTOMCENTER: 6,
    BOTTOMLEFT: 7,
    CENTERLEFT: 8,
    ROTATE: 9,
    MODIFYSHAPE: 10,
    LINESTART: 11,
    LINEEND: 12,
    ATTACHPOINT: 13,
    SEGL_ONE: 14,
    SEGL_TWO: 15,
    SEGL_THREE: 16,
    POLYLNODE: 17,
    POLYLADJ: 18,
    POLYLEND: 19,
    CONNECTOR_HOOK: 20,
    CONNECTOR_PERP: 21,
    CONNECTOR_ADJ: 22,
    MOVEPOLYSEG: 23,
    FLIP: 24,
    TABLE_ROW: 25,
    TABLE_COL: 26,
    TABLE_SELECT: 27,
    TABLE_EDIT: 28,
    TABLE_ROWSELECT: 29,
    TABLE_COLSELECT: 30,
    LINELENGTH: 31,
    SEGL_PRESERVE: 32,
    LINE_THICKNESS: 33,
    DIMENSION_LINE_ADJ: 34,
    UPDATELINKS: 35,
    CONTAINER_ADJ: 36
  }

  public static HitAreaType = {
    CONNECTOR_COLLAPSE: 1,
    CONNECTOR_EXPAND: 2,
    EDITDIMENSIONTEXT: 3
  }

  public static ShapeIconType = {
    HYPERLINK: 'HYPERLINK',
    NOTES: 'NOTES',
    ATTACHMENT: 'ATTACHMENT',
    FIELDDATA: 'FIELDDATA',
    EXPANDTABLE: 'EXPANDTABLE',
    COLLAPSETABLE: 'COLLAPSETABLE',
    DATAACTION: 'DATAACTION',
    EXPANDEDVIEW: 'EXPANDEDVIEW',
    COMMENT: 'COMMENT'
  }

  public static LineOrientation = {
    NONE: 1,
    HORIZONTAL: 2,
    VERTICAL: 3,
    DIAGONAL_TLRB: 4,
    DIAGONAL_TRBL: 5
  }

  public static GrowBehavior = {
    ALL: 0,
    HCONSTRAIN: 1,
    VCONSTRAIN: 2,
    PROPORTIONAL: 3
  }

  public static ContentType = {
    NONE: 1,
    TEXT: 2,
    TABLE: 3,
    GRAPH: 4
  }

  public static SVGElementClass = {
    SHAPE: 1,
    SLOP: 2,
    HATCH: 3,
    TEXT: 4,
    TEXTBACKGROUND: 5,
    DIMENSIONTEXT: 6,
    DIMENSIONLINE: 7,
    BACKGROUNDIMAGE: 8,
    ICON: 9,
    NOTETEXT: 10,
    ACTIONARROW: 11,
    DIMENSIONTEXTNOEDIT: 12,
    AREADIMENSIONLINE: 13,
    GRAPHLINE: 14,
    CoordinateLine: 21
  }

  public static ActionArrow = {
    UP: 1,
    LEFT: 2,
    DOWN: 3,
    RIGHT: 4,
    SLOP: 5,
    CUSTOM: 6,
    ENTER: 7,
    COMANAGER: 8,
    ASSISTANT: 9,
    ADDPARENTS: 10,
    ADDDESCENDANTS: 11
  }

  public static ModalOperations = {
    NONE: 0,
    STAMP: 1,
    DRAW: 2,
    DRAGDROP: 3,
    STAMPTEXTONTAP: 4,
    ADDCORNER: 5,
    DRAWPOLYLINE: 6,
    FORMATPAINTER: 7,
    SPLITWALL: 8
  }

  public static TextAlign = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
    TOPLEFT: 'top-left',
    TOPCENTER: 'top-center',
    TOPRIGHT: 'top-right',
    BOTTOMLEFT: 'bottom-left',
    BOTTOMCENTER: 'bottom-center',
    BOTTOMRIGHT: 'bottom-right'
  }


  // public static SDRShapeTypes = {
  //   SED_S_Photo: - 2,
  //   SED_S_Table: - 1,
  //   SED_S_Text: 0,
  //   SED_S_Image: 1,
  //   SED_S_Rect: 2,
  //   SED_S_RRect: 3,
  //   SED_S_Oval: 4,
  //   SED_S_Pgm: 5,
  //   SED_S_Diam: 6,
  //   SED_S_Doc: 7,
  //   SED_S_Term: 8,
  //   SED_S_Circ: 9,
  //   SED_S_ArrR: 10,
  //   SED_S_ArrL: 11,
  //   SED_S_ArrT: 12,
  //   SED_S_ArrB: 13,
  //   SED_S_Tri: 14,
  //   SED_S_TriB: 15,
  //   SED_S_Input: 16,
  //   SED_S_Trap: 17,
  //   SED_S_TrapB: 18,
  //   SED_S_Oct: 19,
  //   SED_S_Store: 20,
  //   SED_S_Hex: 21,
  //   SED_S_Pent: 22,
  //   SED_S_PentL: 23,
  //   SED_S_Delay: 24,
  //   SED_S_Disp: 25,
  //   SED_S_Poly: 26,
  //   SED_S_MeasureArea: 27,
  //   SED_S_Last: 27
  // }

  // public static DocumentContext = {
  //   CurrentTextAlignment: 'center',
  //   SpacebarDown: false,
  // }

  //   DocumentContext = {
  //     UserId: -1,
  //     UserName: "",
  //     UserToken: null,
  //     UserLoginId: "",
  //     CloudFileMetadata: null,
  //     LineTool: SDUI.Resources.LineToolTypes.SegmentedLine,
  //     ShapeTool: SDJS.FileParser.SDRShapeTypes.SED_S_Rect,
  //     UsingWallTool: !1,
  //     SelectionTool: SDUI.Resources.Tools.Tool_Select,
  //     SelectionToolSticky: !1,
  //     SelectionToolMultiple: !1,
  //     SwimlaneFormat: SDUI.Resources.SwimlaneTypes.Row,
  //     SwimlaneNLanes: 4,
  //     SwimlaneNVLanes: 4,
  //     SwimlaneRotate: !0,
  //     SwimlaneTitle: !1,
  //     AutoContainer: !0,
  //     ActAsContainer: !0,
  //     CollapseTools: !1,
  //     RecentFonts: [],
  //     CurrentFont: null,
  //     CurrentFontSize: 12,
  //     AllowCopy: !1,
  //     CurrentClipboard: 0,
  //     RecentColors: [],
  //     RecentFreehandColors: [],
  //     LastTexture: 0,
  //     SelectedSymbol: "00000000-0000-0000-00000000",
  //     ActiveSymbolLibraries: [],
  //     SmartPanelContext: SDUI.Resources.Contexts.None,
  //     CurrentQuickStyle: 7,
  //     CurrentTextAlignment: "center",
  //     CurrentTextBullet: "none",
  //     CurrentTextSpacing: 0,
  //     CurrentTextDirection: !0,
  //     CurrentRibbon: "r-home",
  //     CurrentSmartPanel: null,
  //     CurrentSubType: 0,
  //     CurrentObjType: 0,
  //     CurrentLineThickness: 1,
  //     CurrentElemID: -1,
  //     CurrentContainerList: null,
  //     CurrentFixedCornerRadius: -1,
  //     CurrentLineCornerRadius: -1,
  //     CurrentConnectorCanHaveCurve: !1,
  //     CurrentSelectionBusinessManager: null,
  //     CurrentWallThickness: 0,
  //     PolyLineContainerMoveMode: !1,

  //     ApplicationClosing: !1,
  //     CurrentWidth: 0,
  //     CurrentHeight: 0,
  //     CurrentLeft: 0,
  //     CurrentTop: 0,
  //     Colorfilter: 0,
  //     Saved: !1,
  //     SessionFlags: SDUI.Resources.ActiveSessionFlags.WebAppSession,
  //     TimerCallbackID: -1,
  //     IsTargetTable: !1,
  //     TableCellNoText: !1,
  //     TableCellType: 0,
  //     TableCellSelected: !1,
  //     TableCellFlags: 0,
  //     EditRows: !1,
  //     EditCols: !1,
  //     HTMLFocusControl: null,
  //     NumberFilter: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
  //     FeetFilter: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", '"', " ", "'", "/"],
  //     IntegerFilter: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  //     FindTarget: "",
  //     ReplaceTarget: "",
  //     MatchWord: !1,
  //     MatchCase: !1,
  //     LoggingSessionID: -1,
  //     AllowLayers: !0,
  //     TemplateID: null,
  //     ReadOnlyPermission: !1,
  //     UserSettings: null,
  //     HintSeen: 0,
  //     PublicShareToken: null,
  //     NotificationPublicShareToken: null,
  //     NotificationUserName: null,
  //     PublishUrl: null,
  //     ReadJSON: !1,
  //     NoSetBusiness: !1,
  //     TrelloPU: !1,
  //     TrelloPUOpenExisting: !1,
  //     Credentials: [],
  //     CurrentCredential: null,
  //     ContentSource: SDUI.Resources.ContentSource.SDCloudWebService,
  //     SpacebarDown: !1,
  //     FullScreen: !1,
  //     ImportingJSNF: !1,
  //     StyledLineTool: SDUI.Resources.StyledLineToolTypes.Highlighter
  // }


  public static Table_CellFlags = {
    SDT_F_Select: 1,
    SDT_F_HSelect: 2,
    SDT_F_VSelect: 4,
    SDT_F_Hide: 8,
    SDT_F_SilentF: 16,
    SDT_F_SilentL: 32,
    SDT_F_NoText: 64,
    SDT_F_PhotoPH: 128,
    SDT_F_WasNoText: 256,
    SDT_F_Clickhere: 512,
    SDT_F_FixPhotoSize: 1024,
    SDT_F_TransImage: 2048,
    SDT_F_AllowDropImage: 4096,
    SDT_F_BadName: 8192,
    SDT_F_NoDefaultLine: 16384,
    SDT_F_HideCol: 32768,
    SDT_F_ScaleImg: 65536,
    SDT_F_AMPM: 131072,
    SDT_F_JumpThumbnail: 262144,
    SDT_F_FixedWidth: 524288,
    SDT_F_FixedHeight: 1048576,
    SDT_F_ToggleIcon: 2097152,
    SDT_F_ToggleIconSelect: 4194304,
    SDT_F_ScaletoFit: 8388608,
    SDT_F_FrameCell: 16777216,
    SDT_F_DontScale: 33554432,
    SDT_F_InfoNoteIcon: 67108864,
    SDT_F_UseTextRectAsFrame: 134217728,
    SDT_F_UseExpandedRectAsFrame: 268435456,
    SDT_F_AllowMin: 536870912
  }

  public static TextFace = {
    Bold: 1,
    Italic: 2,
    Underline: 4,
    Superscript: 16,
    Subscript: 32
  }

  public static Table_CellTypes = {
    SDT_CT_MONTH_WITH_DAYS: 1,
    SDT_CT_DAY_NUMBER: 2,
    SDT_CT_DAY_VALUE: 3,
    SDT_CT_WEEK_WITH_DAYS: 4,
    SDT_CT_WEEK_DAY_DATE: 5,
    SDT_CT_WEEK_DAY_NAME: 6,
    SDT_CT_WEEK_VALUE: 15,
    SDT_CT_QTR_WITH_MONTHS: 7,
    SDT_CT_QTR_MONTH_NUMBER: 8,
    SDT_CT_QTR_MONTH_NAME: 9,
    SDT_CT_MONTH_VALUE: 10,
    SDT_CT_YR_WITH_MONTHS: 11,
    SDT_CT_QUARTER_VALUE: 12,
    SDT_CT_QTR_NAME: 13,
    SDT_CT_YEAR_VALUE: 16,
    SDT_CT_DAY_WITH_HOURS: 17,
    SDT_CT_DAY_HOUR_NUMBER: 18,
    SDT_CT_HOUR_VALUE: 19,
    SDT_CT_PREFIX_COUNT: 20,
    SDT_CT_PREFIX_VALUE: 21,
    SDT_CT_GRAPHVALUE: 34,
    SDT_CT_GRAPHCOLUMNHEADER: 35,
    SDT_CT_GRAPHROWNAME: 36,
    SDT_CT_SUBCOLHEADER: 40,
    SDT_CT_ROWREPEATER: 41,
    SDT_CT_PERSON: 60,
    SDT_CT_MEETINGTASK: 61,
    SDT_CT_MEETINGDATE: 62,
    SDT_CT_PHOTOCELL: 150,
    SDT_CT_ICONCELL: 151,
    SDT_CT_ICONPHOTOCELL: 152,
    SDT_CT_KANBANCELL: 153,
    SDT_CT_MENU_SEPARATOR: 154,
    SD_CT_TITLEBLOCK_TITLE: 160,
    SD_CT_TITLEBLOCK_COMPANY: 161,
    SD_CT_TITLEBLOCK_EXEC: 162,
    SD_CT_TITLEBLOCK_MANAGE: 163,
    SD_CT_TITLEBLOCK_CREATED: 164,
    SD_CT_TITLEBLOCK_UPDATED: 165,
    SD_CT_TITLEBLOCK_DEPT: 166,
    SD_CT_VS_DEMAND: 190,
    SD_CT_VS_HOURS: 191,
    SD_CT_VS_TAKT: 192,
    SD_CT_FLOW_LABEL: 201,
    SD_CT_FLOW_VA: 202,
    SD_CT_FLOW_NVA: 203,
    SD_CT_FLOW_COT: 204,
    SD_CT_FLOW_UPT: 205,
    SD_CT_FLOW_FPY: 206,
    SD_CT_FLOW_DIST: 207,
    SD_CT_FLOW_DEF: 208,
    SD_CT_FLOW_INV: 209,
    SD_CT_FLOW_OP: 210,
    SD_CT_TIMELINE_ROWLABEL: 250,
    SD_CT_TIMELINE_DATETITLE: 251,
    SD_CT_TIMELINE_LABELROW: 252,
    SD_CT_BPMN_PARTICIPANT: 260,
    SD_CT_ROW_HEADER: 300,
    SD_CT_ROW_BODY: 301,
    SD_CT_COL_HEADER: 310,
    SD_CT_COL_BODY: 312,
    SD_CT_ROWCOL_HEADER: 610,
    SD_CT_ROW_HEADER_COL_BODY: 612,
    SD_CT_ROW_BODY_COL_HEADER: 611,
    SD_CT_ROW_BODY_COL_BODY: 613,
    SD_CT_JIRA_ISSUEKEY: 614,
    SD_CT_JIRA_SUMMARY: 615,
    SD_CT_JIRA_STATUS: 616,
    SD_CT_JIRA_PRIORITY: 617,
    SD_CT_JIRA_ASSIGNEE: 618,
    SD_CT_JIRA_ASSIGNEE_AVATAR: 619,
    SD_CT_JIRA_ISSUETYPE: 620,
    SD_CT_SWIMLANE_TITLE: 630
  }
}

export default ConstantData
