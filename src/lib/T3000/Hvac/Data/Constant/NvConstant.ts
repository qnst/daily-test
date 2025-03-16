

class NvConstant {

  static TELastOp = {
    INIT: - 1, CHAR: 0, BS: 1, DEL: 2, STYLE: 3, CUT: 4, COPY: 5, PASTE: 6, SELECT: 7, TIMEOUT: 8
  }

  static RulerUnit = {
    None: 0, Inches: 1, Feet: 2, Mm: 3, Cm: 4, M: 5
  }

  static Colors = {
    White: '#FFFFFF',
    Black: '#000000',
    Hilite: '#0099FF',
    Select: '#00FF00',
    Row_Shade: '#F1F1F1',
    Trans: 4294967295,
    Gray: '#C0C0C0'
  }

  static FillTypes = {
    Transparent: 0,
    Solid: 1,
    Gradient: 2,
    Texture: 3,
    Image: 4,
    RichGradient: 5
  }

  static GraphType = {
    Unset: - 1,
    Bar: 0,
    StackedBar: 1,
    Line: 2,
    Pie: 3,
    LineArpie: 4,
    StackedLine: 5
  }

  static GraphFlags = {
    // SequenceByPoints: 1,
    // SequenceBySeries: 2,
    SequenceByCategory: 4,
    // SequenceByPointsBySeries: 8,
    // Dax3D: 16,
    // DaxFlagDataModified: 32,
    // DaxAvailable: 64,
    // DaxShowTable: 128,
    // DaxFlipRowColOrientation: 256,
    // DaxRedirectEditSeriesName: 2048,
    // DaxDataTableUserManagedGeomet: 4096,
    // DaxBGImageFill: 8192,
    // DaxAreaBGImageFill: 16384,
    // DaxShowStackedScale: 32768
  }

  static AxisFlags = {
    //SDAX_START_AT_LOWER_BOUND: 1,
    // SDAX_HIDE_MAJOR_TICKS: 2,
    DaxHideMinorTicks: 4,
    // SDAX_MAJOR_TICK_IF_LABEL: 8,
    // SDAX_LABELS_ANGLED: 16,
    DaxShowGridLineMajor: 32,
    // SDAX_HIDE_AXIS_LINE: 64,
    // SDAX_HIDE_LABELS: 128,
    // SDAX_HIDE_TITLE: 256,
    // SDAX_SHOW_GRID_LINE_MINOR: 512,
    // SDAX_SHOW_SUMMARY_LABELS: 1024
  }

  static LegendType = {
    DaxLegendFull: 0,
    DaxLegendNone: 1,
    DaxLegendNames: 2,
    DaxLegendSwatches: 3
  }

  static HopDimX = [6, 8, 10]

  static HopDimY = [4, 5, 6]

  static HopStyle = { SDH_Box: 0, SDH_Arc: 1 }

  static DimensionFlags = {
    EndPts: 1,
    AllSeg: 2,
    Total: 4,
    Select: 8,
    Always: 16,
    Area: 32,
    AreaSel: 64,
    Standoff: 128,
    Exterior: 256,
    ShowFractionalInches: 512,
    RectWithAndHeight: 1024,
    ShowLineAngles: 2048,
    InteriorAngles: 4096,
    HideHookedObjDimensions: 8192,
    ShowFeetAsInches: 16384
  }

  static TextGrowBehavior = {
    ProPortional: 0,
    Horizontal: 1,
    Vertical: 2,
    FSize: 3
  }

  static StyleDefaults = {
    Default: 'Style7',
    DefThick: 1,
    DefFont: 'Arial'
  }

  static LayerFlags = {
    Visible: 1,
    Active: 2,
    NoAdd: 4,
    AllowCellEdit: 8,
    UseEdges: 16
  }

  static LayerTypes = {
    None: 0,
    // SD_LAYERT_MINDMAP: 1,
    // SD_LAYERT_GANTT: 2,
    // SD_LAYERT_PERT: 3,
    WebPage: 4,
    // SD_LAYERT_TIMELINE: 5,
    // SD_LAYERT_MEETING: 6,
    BackGround: 7
  }



  static LayerMoveType = {
    Bottom: 0,
    Before: 1,
    After: 2,
    Top: 3
  }

  static ContainerListArrangements = {
    Row: 0,
    Column: 1
  }

  static ContainerListFlags = {
    AllowOnlyContainers: 1,
    AllowOnlyNonContainers: 2,
    Sparse: 4,
    LeftChanged: 8,
    TopChanged: 16,
    Adjust: 32
  }

  static CommentParams = {
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

  static EditState = {
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

  static Geometry = {
    PI: 3.14159265358979
  }

  static ObjFlags = {
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

  static TextFlags = {
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

  static SessionMoreFlags = {
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

  static HookFlags = {
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

  static ListCodes = {
    SED_LC_CIRCTARG: 1,
    SED_LC_MOVETARG: 2,
    SED_LC_MOVEHOOK: 3,
    SED_LC_TARGONLY: 4,
    SED_LC_CHILDRENONLY: 5,
    SED_LC_TOPONLY: 6,
    SED_LC_LINESONLY: 7,
    SED_LC_MOVETARGANDLINES: 8
  }

  static FloatingPointDim = {
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

  static HitCodes = {
    SED_Border: 40,
    SED_Inside: 41,
    SED_InsideE: 42,
    SED_InsideT: 43,
    SED_PLApp: 73,
    SED_InContainer: 101
  }

  static Guide_DistanceTypes = {
    Room: 1,
    Horizontal_Wall: 2,
    Vertical_Wall: 3,
    PolyWall: 4
  }

  static SegLDir = {
    SED_KTC: 5,
    SED_KBC: 6,
    SED_KLC: 7,
    SED_KRC: 8
  }

  static ObjectTypes = {
    SD_OBJT_NONE: 0,
    SD_OBJT_PICTCONTAINER: 1,
    SD_OBJT_FRAME: 2,
    SD_OBJT_CABINETWALL: 3,
    SD_OBJT_CABINETFINISH: 4,
    SD_OBJT_BACKGROUND: 5,
    // SD_OBJT_MINDMAP_MAIN: 6,
    // SD_OBJT_MINDMAP_IDEA: 7,
    // SD_OBJT_MINDMAP_CONNECTOR: 8,
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

  static ObjectSubTypes = {
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

  static ImageScales = {
    SDIMAGE_ALWAYS_FIT: 0,
    SDIMAGE_CROP_TO_FIT: 1,
    SDIMAGE_PROP_FIT: 2
  }

  static ShapeClass = {
    PLAIN: 1,
    GROUPSYMBOL: 2,
    SVGSYMBOL: 3,
    SVGFRAGMENTSYMBOL: 4,
    MISSINGEMF: 5
  }

}

export default NvConstant
