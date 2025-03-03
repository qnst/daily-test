
import Resources from './Resources';
import Globals from './Globals';
import RulerSettings from '../Model/RulerSettings'
import FileParser from '../Data/FileParser'
import QuickStyle from '../Model/QuickStyle'
import ConstantData from './ConstantData'
import FillData from '../Model/FillData'
import FontRecord from '../Model/FontRecord'
import SEDDefault from '../Model/SEDDefault'
import SEDGraphDefault from '../Model/SEDGraphDefault'

const ListManager = {

  Defines: null,
  ModalOperations: null,
  FormatPainterModes: null,
  ArrowheadLookupTable: null,
  ArrowheadSizeTable: null,
}


// ConstantData.DrawingObjectBaseClass = {
//   SHAPE: 0,
//   LINE: 1,
//   CONNECTOR: 3
// }

/*
// Object.freeze(ConstantData.DrawingObjectBaseClass)
ListManager.ShapeType = {
  RECT: 'ListManager.Rect',
  RRECT: 'ListManager.RRect',
  OVAL: 'ListManager.Oval',
  POLYGON: 'ListManager.Polygon',
  VECTORSYMBOL: 'ListManager.VectorSymbol',
  BITMAPSYMBOL: 'ListManager.BitmapSymbol',
  GROUPSYMBOL: 'ListManager.GroupSymbol',
  SVGFRAGMENTSYMBOL: 'ListManager.SVGFragmentSymbol',
  D3SYMBOL: 'ListManager.D3Symbol'
}
*/

// Object.freeze(ListManager.ShapeType)

// ListManager.ShapeClass = {
//   PLAIN: 1,
//   GROUPSYMBOL: 2,
//   SVGSYMBOL: 3,
//   SVGFRAGMENTSYMBOL: 4,
//   MISSINGEMF: 5
// }

// Object.freeze(ListManager.ShapeClass)
// ListManager.LineType = {
//   LINE: 1,
//   ARCLINE: 2,
//   SEGLINE: 3,
//   ARCSEGLINE: 4,
//   POLYLINE: 5,
//   PARABOLA: 6,
//   FREEHAND: 7,
//   NURBS: 501,
//   NURBSSEG: 502,
//   ELLIPSE: 503,
//   ELLIPSEEND: 504,
//   QUADBEZ: 505,
//   QUADBEZCON: 506,
//   CUBEBEZ: 507,
//   CUBEBEZCON: 508,
//   SPLINE: 509,
//   SPLINECON: 510,
//   MOVETO: 600,
//   MOVETO_NEWPOLY: 601
// }

// Object.freeze(ListManager.LineType)
ListManager.DrawShapeType = {
  RECT: 1,
  RRECT: 2,
  OVAL: 3,
  POLYGON: 4,
  LINE: 5,
  ARCLINE: 6
}

// Object.freeze(ListManager.DrawShapeType)
// ListManager.ActionTriggerType = {
//   TOPLEFT: 1,
//   TOPCENTER: 2,
//   TOPRIGHT: 3,
//   CENTERRIGHT: 4,
//   BOTTOMRIGHT: 5,
//   BOTTOMCENTER: 6,
//   BOTTOMLEFT: 7,
//   CENTERLEFT: 8,
//   ROTATE: 9,
//   MODIFYSHAPE: 10,
//   LINESTART: 11,
//   LINEEND: 12,
//   ATTACHPOINT: 13,
//   SEGL_ONE: 14,
//   SEGL_TWO: 15,
//   SEGL_THREE: 16,
//   POLYLNODE: 17,
//   POLYLADJ: 18,
//   POLYLEND: 19,
//   CONNECTOR_HOOK: 20,
//   CONNECTOR_PERP: 21,
//   CONNECTOR_ADJ: 22,
//   MOVEPOLYSEG: 23,
//   FLIP: 24,
//   TABLE_ROW: 25,
//   TABLE_COL: 26,
//   TABLE_SELECT: 27,
//   TABLE_EDIT: 28,
//   TABLE_ROWSELECT: 29,
//   TABLE_COLSELECT: 30,
//   LINELENGTH: 31,
//   SEGL_PRESERVE: 32,
//   LINE_THICKNESS: 33,
//   DIMENSION_LINE_ADJ: 34,
//   UPDATELINKS: 35,
//   CONTAINER_ADJ: 36
// }

// Object.freeze(ListManager.ActionTriggerType)

// ListManager.HitAreaType = {
//   CONNECTOR_COLLAPSE: 1,
//   CONNECTOR_EXPAND: 2,
//   EDITDIMENSIONTEXT: 3
// }

// Object.freeze(ListManager.HitAreaType)
// ListManager.ShapeIconType = {
//   HYPERLINK: 'HYPERLINK',
//   NOTES: 'NOTES',
//   ATTACHMENT: 'ATTACHMENT',
//   FIELDDATA: 'FIELDDATA',
//   EXPANDTABLE: 'EXPANDTABLE',
//   COLLAPSETABLE: 'COLLAPSETABLE',
//   TRELLOLINK: 'TRELLOLINK',
//   DATAACTION: 'DATAACTION',
//   EXPANDEDVIEW: 'EXPANDEDVIEW',
//   COMMENT: 'COMMENT'
// }

// Object.freeze(ListManager.ShapeIconType)
ListManager.SegmentedLineDirection = {
  TOP: 1,
  LEFT: 2,
  BOTTOM: 3,
  RIGHT: 4
}

// Object.freeze(ListManager.SegmentedLineDirection)
// ListManager.LineOrientation = {
//   NONE: 1,
//   HORIZONTAL: 2,
//   VERTICAL: 3,
//   DIAGONAL_TLRB: 4,
//   DIAGONAL_TRBL: 5
// }

// Object.freeze(ListManager.LineOrientation),
// ListManager.GrowBehavior = {
//   ALL: 0,
//   HCONSTRAIN: 1,
//   VCONSTRAIN: 2,
//   PROPORTIONAL: 3
// }

// Object.freeze(ListManager.GrowBehavior),
// ListManager.TextGrowBehavior = {
//   PROPORTIONAL: 0,
//   HORIZONTAL: 1,
//   VERTICAL: 2,
//   FSIZE: 3
// }

// Object.freeze(ListManager.TextGrowBehavior),
// ListManager.ContentType = {
//   NONE: 1,
//   TEXT: 2,
//   TABLE: 3,
//   GRAPH: 4
// }

// Object.freeze(ListManager.ContentType),

// ListManager.SVGElementClass = {
//   SHAPE: 1,
//   SLOP: 2,
//   HATCH: 3,
//   TEXT: 4,
//   TEXTBACKGROUND: 5,
//   DIMENSIONTEXT: 6,
//   DIMENSIONLINE: 7,
//   BACKGROUNDIMAGE: 8,
//   ICON: 9,
//   NOTETEXT: 10,
//   ACTIONARROW: 11,
//   DIMENSIONTEXTNOEDIT: 12,
//   AREADIMENSIONLINE: 13,
//   GRAPHLINE: 14,
//   GANTTGRIDHEADERLINE: 15,
//   GANTTGRIDHEADERTEXT: 16,
//   GANTTGRIDTITLELINE: 17,
//   GANTTGRIDTITLETEXT: 18,
//   GANTTGRIDHOTSPOT: 19,
//   GANTTGRIDCLIPPINGGROUP: 20
// }

// Object.freeze(ListManager.SVGElementClass),
// ListManager.ActionArrow = {
//   UP: 1,
//   LEFT: 2,
//   DOWN: 3,
//   RIGHT: 4,
//   SLOP: 5,
//   CUSTOM: 6,
//   ENTER: 7,
//   COMANAGER: 8,
//   ASSISTANT: 9,
//   ADDPARENTS: 10,
//   ADDDESCENDANTS: 11
// }

// Object.freeze(ListManager.ActionArrow),
// ListManager.EditState = {
//   DEFAULT: 1,
//   STAMP: 2,
//   TEXT: 3,
//   FORMATPAINT: 4,
//   LINKCONNECT: 5,
//   LINKJOIN: 6,
//   EDIT: 7,
//   DRAGCONTROL: 8,
//   DRAGSHAPE: 9,
//   GRAB: 10
// }

// Object.freeze(ListManager.EditState),
// ListManager.Geometry = {
//   PI: 3.14159265358979
// }

// Object.freeze(ListManager.Geometry),
ListManager.KeyCode = {
  A: 65,
  B: 66,
  C: 67,
  F: 70,
  V: 86,
  X: 88,
  Y: 89,
  Z: 90,
  DEL: 46,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40
}

// Object.freeze(ListManager.KeyCode),
ListManager.SocketActions = {
  SaveAllBlocks: 1,
  WriteManifest: 2,
  ClosePage: 3,
  AddDupPage: 4,
  AddNewPage: 5,
  AddDupPage_Init: 6,
  AddNewPage_Init: 7,
  CompleteAdd: 8,
  ChangePage: 9,
  CompleteChange: 10,
  RenamePage: 11,
  CompleteRename: 12,
  DeletePage: 12,
  CompleteDelete: 13,
  ReorderPages: 13,
  CompleteReorder: 14,
  RenamePage_NoSocket: 15,
  DeletePage_NoSocket: 16,
  Insert_Template: 17,
  Insert_Template_Init: 18,
  Insert_Document: 19,
  Insert_Document_Init: 20
}

// ListManager.ObjFlags = {
//   SEDO_Select: 1,
//   SEDO_Hide: 2,
//   SEDO_Erase: 4,
//   SEDO_EraseOnGrow: 8,
//   SEDO_Lock: 16,
//   SEDO_Spare: 32,
//   SEDO_ImageShape: 64,
//   SEDO_Bounds: 128,
//   SEDO_ImageOnly: 256,
//   SEDO_TextOnly: 512,
//   SEDO_NoPen: 1024,
//   SEDO_IsTarget: 2048,
//   SEDO_InList: 4096,
//   SEDO_Assoc: 8192,
//   SEDO_Obj1: 16384,
//   SEDO_ContConn: 32768,
//   SEDO_HUnGroup: 65536,
//   SEDO_UseConnect: 131072,
//   SEDO_DropOnBorder: 262144,
//   SEDO_DropOnTable: 524288,
//   SEDO_LineHop: 1048576,
//   SEDO_LineMod: 2097152,
//   SEDO_NoTableLink: 4194304,
//   SEDO_MetaObject: 8388608,
//   SEDO_NoLinking: 16777216,
//   SEDO_PrintTrans: 33554432,
//   SEDO_HasTransImage: 67108864,
//   SEDO_AllowDropImage: 134217728,
//   SEDO_NotVisible: 268435456,
//   SEDO_NoMaintainLink: 536870912,
//   SEDO_AllowMetaColor: 1073741824,
//   SEDO_HideThumbnail: 2147483648
// }

// Object.freeze(ListManager.ObjFlags),
// ListManager.ExtraFlags = {
//   SEDE_NoColor: 1,
//   SEDE_NoShadow: 2,
//   SEDE_NoTShadow: 4,
//   SEDE_FlipHoriz: 8,
//   SEDE_FlipVert: 16,
//   SEDE_NoRotate: 32,
//   SEDE_OldHookPt: 64,
//   SEDE_PermAssoc: 128,
//   SEDE_TableFit: 256,
//   SEDE_TableActive: 512,
//   SEDE_License: 1024,
//   SEDE_PhotoPH: 2048,
//   SEDE_ShareTable: 4096,
//   SEDE_ShareProp: 8192,
//   SEDE_AutoParent: 16384,
//   SEDE_AutoNumber: 32768,
//   SEDE_AutoChild: 65536,
//   SEDE_ShareScale: 131072,
//   SEDE_GroupHasScript: 262144,
//   SEDE_IsPhotoTitle: 524288,
//   SEDE_SideKnobs: 1048576,
//   SEDE_ConnToConn: 2097152,
//   SEDE_ConnToShapes: 4194304,
//   SEDE_NoDelete: 8388608,
//   SEDE_LinkVCenter: 16777216,
//   SEDE_MaintainLinkedObjOrientation: 16777216,
//   SEDE_ImageDup: 33554432,
//   SEDE_ComboSelect: 67108864,
//   SEDE_CollapseConn: 134217728,
//   SEDE_ExtraPolySegs: 268435456,
//   SEDE_DataUpdate: 536870912,
//   SEDE_NoDraw: 1073741824,
//   SEDE_DeleteOnUnhook: 2147483648
// }

// Object.freeze(ListManager.ExtraFlags),
// ListManager.ObjMoreFlags = {
//   SED_MF_VisioText: 1,
//   SED_MF_VisioPoly: 2,
//   SED_MF_VisioCallOut: 4,
//   SED_MF_VisioDefaultText: 8,
//   SED_MF_VisioLineTextLabel: 16,
//   SED_MF_VisioExportTable: 32,
//   SED_MF_FixedRR: 64,
//   SED_MF_Container: 128,
//   SED_MF_UseInfoNoteIcon: 256,
//   SED_MF_ContainerChild: 512,
//   SED_MF_AutoContainer: 1024,
//   SED_MF_Frame_AllowNesting: 2048,
//   SED_MF_Frame_Group: 4096
// }

// ListManager.TextFlags = {
//   SED_TF_BaseLine: 1,
//   SED_TF_FitToText: 2,
//   SED_TF_AttachB: 4,
//   SED_TF_AttachA: 8,
//   SED_TF_None: 16,
//   SED_TF_AttachC: 32,
//   SED_TF_Dimension: 64,
//   SED_TF_HorizText: 128,
//   SED_TF_AdjFSize: 256,
//   SED_TF_OneClick: 512,
//   SED_TF_OwnSize: 1024,
//   SED_TF_FormCR: 2048,
//   SED_TF_NoSpell: 4096,
//   SED_TF_Clickhere: 8192,
//   SED_TF_AttachD: 16384,
//   SED_TF_TitleBlock: 32768,
//   SED_TF_Attach: 16428
// }

/*
// Object.freeze(ListManager.TextFlags),
ListManager.SessionFlags = {
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
  SEDS_IsCloudOfflineEditConflict: 67108864,
  SEDS_IsCloudCheckoutConflict: 134217728,
  SEDS_IsCloudSharedReadOnly: 268435456,
  SEDS_IsCloudChangedTeams: 536870912,
  SEDS_NoStepFormatting: 1073741824,
  SEDS_NoPageBreakLines: 2147483648
}
*/

// Object.freeze(ListManager.SessionFlags),
// ListManager.SessionMoreFlags = {
//   SEDSM_FlowHorizOnly: 1,
//   SEDSM_ValueStream: 2,
//   SEDSM_FlowUseData: 4,
//   SEDSM_FlowCalcNVA: 8,
//   SEDSM_NoActionButton: 16,
//   SEDSM_ShowGrid: 32,
//   SEDSM_DrawToScale: 64,
//   SEDSM_Swimlane_Cols: 128,
//   SEDSM_Swimlane_Rows: 256,
//   SEDSM_KeepUnits: 512,
//   SEDSM_HideLayerTabs: 1024,
//   SEDSM_HideDataIcons: 2048,
//   SEDSM_NoCtrlArrow: 4096
// }

// ListManager.LinkFlags = {
//   SED_L_DELT: 1,
//   SED_L_DELL: 2,
//   SED_L_CHANGE: 4,
//   SED_L_BREAK: 8,
//   SED_L_MOVE: 16,
//   SED_L_WASMOVE: 32
// }

// Object.freeze(ListManager.LinkFlags),
// ListManager.HookFlags = {
//   SED_LC_Shape: 1,
//   SED_LC_Line: 2,
//   SED_LC_HOnly: 4,
//   SED_LC_VOnly: 8,
//   SED_LC_CHook: 16,
//   SED_LC_ArrayMod: 32,
//   SED_LC_NotOnPen: 64,
//   SED_LC_MoveTarget: 128,
//   SED_LC_AttachToLine: 256,
//   SED_LC_NoSnaps: 512,
//   SED_LC_ShapeOnLine: 1024,
//   SED_LC_FindPoint: 2048,
//   SED_LC_VirtualPoint: 4096,
//   SED_LC_AutoInsert: 8192,
//   SED_LC_ForceEnd: 16384,
//   SED_LC_HookIsArray: 32768,
//   SED_LC_HookInside: 65536,
//   SED_LC_HookNoExtra: 131072,
//   SED_LC_HookReverse: 262144,
//   SED_LC_NoContinuous: 524288,
//   SED_LC_TableRows: 1048576
// }

// Object.freeze(ListManager.HookFlags),
// ListManager.ListCodes = {
//   SED_LC_CIRCTARG: 1,
//   SED_LC_MOVETARG: 2,
//   SED_LC_MOVEHOOK: 3,
//   SED_LC_TARGONLY: 4,
//   SED_LC_CHILDRENONLY: 5,
//   SED_LC_TOPONLY: 6,
//   SED_LC_LINESONLY: 7,
//   SED_LC_MOVETARGANDLINES: 8
// }

// Object.freeze(ListManager.ListCodes),
// ListManager.FloatingPointDim = {
//   SD_FP_Left: 1,
//   SD_FP_Top: 2,
//   SD_FP_Right: 4,
//   SD_FP_Bottom: 8,
//   SD_FP_Width: 16,
//   SD_FP_Height: 32,
//   SD_FP_Pos: 15,
//   SD_FP_All: 63,
//   SD_FP_PreserveDim: 64
// }

// Object.freeze(ListManager.FloatingPointDim),
// ListManager.HookPts = {
//   SED_KTL: 1,
//   SED_KTR: 2,
//   SED_KBL: 3,
//   SED_KBR: 4,
//   SED_KTC: 5,
//   SED_KBC: 6,
//   SED_KLC: 7,
//   SED_KRC: 8,
//   SED_LL: 20,
//   SED_LR: 21,
//   SED_LT: 22,
//   SED_LB: 23,
//   SED_KCTL: 201,
//   SED_KCTR: 202,
//   SED_KCBL: 203,
//   SED_KCBR: 204,
//   SED_KCT: 205,
//   SED_KCB: 206,
//   SED_KCL: 207,
//   SED_KCR: 208,
//   SED_KCC: 209,
//   SED_KAT: 220,
//   SED_KATD: 221,
//   SED_AK: 300,
//   SED_AKCTL: 301,
//   SED_AKCT: 305,
//   SED_AKCB: 306,
//   SED_AKCL: 307,
//   SED_AKCR: 308,
//   SED_AKCC: 309,
//   SED_WTL: 321,
//   SED_WTR: 322,
//   SED_WBL: 323,
//   SED_WBR: 324,
//   SED_CustomBase: 500
// }

// Object.freeze(ListManager.HookPts),
ListManager.TargetPts = {
  T_TL: 0,
  T_TLC: 1,
  T_TC: 2,
  T_TRC: 3,
  T_TR: 4,
  T_RTC: 5,
  T_RC: 6,
  T_RBC: 7,
  T_BR: 8,
  T_BRC: 9,
  T_BC: 10,
  T_BLC: 11,
  T_BL: 12,
  T_LBC: 13,
  T_LC: 14,
  T_LTC: 15
}

/*
// Object.freeze(ListManager.TargetPts),
ConstantData.Defines = {
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
  DimensionLineColor: '#9999FF',
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
*/

ListManager.TrialTests = {
  NoWatermark: 575,
  NoPrint: 575
}

// ListManager.HitCodes = {
//   SED_Border: 40,
//   SED_Inside: 41,
//   SED_InsideE: 42,
//   SED_InsideT: 43,
//   SED_PLApp: 73,
//   SED_InContainer: 101
// }

// Object.freeze(ListManager.HitCodes),
// ListManager.ArrowHeadTypes = {
//   ARR_NONE: 0,
//   ARR_FILL: 1,
//   ARR_PLAIN: 2,
//   ARR_FANCY: 3,
//   ARR_FCIRC: 4,
//   ARR_ECIRC: 5,
//   ARR_FSQU: 6,
//   ARR_ESQU: 7,
//   ARR_CROW: 8,
//   ARR_SLASH: 9,
//   ARR_FCROW: 10,
//   ARR_DIAM: 11,
//   ARR_ZEROTOMANY: 12,
//   ARR_ONETOMANY: 13,
//   ARR_ZEROTOONE: 14,
//   ARR_ONETOONE: 15,
//   ARR_ONETOZERO: 16,
//   ARR_C_FILL: 17,
//   ARR_C_PLAIN: 18,
//   ARR_C_FANCY: 19,
//   ARR_DOUBLE: 20,
//   ARR_DIM_FILL: 21,
//   ARR_DIM_PLAIN: 22,
//   ARR_DIM_LINE: 23,
//   ARR_META: 24,
//   ARR_ARC_DOWN: 25,
//   ARR_ARC_UP: 26,
//   ARR_HALF_UP: 27,
//   ARR_HALF_DOWN: 28,
//   ARR_C_CROSS: 29,
//   ARR_HLINE_UP: 30,
//   ARR_HLINE_DOWN: 31,
//   ARR_OSLASH: 32,
//   ARR_OFILL: 33,
//   ARR_OFCROW: 34,
//   ARR_ODIAM: 35,
//   ARR_ONECROSS: 36,
//   ARR_IND_DOWN: 37,
//   ARR_IND_UP: 38,
//   ARR_ROUND_END: 39,
//   ARR_UML_OPEN: 40,
//   ARR_UML_CLOSED: 41,
//   ARR_UML_CONNECTED: 42,
//   ARR_C_UML_CONNECTED: 43
// }

ListManager.DateCodes = {
  SDUSDATE: 0,
  SDEURODATE: 1
}

// Object.freeze(ListManager.DateCodes),
ListManager.ClockTypes = {
  SDAUTOTIME: 0,
  SD12HOURTIME: 1,
  SD24HOURTIME: 2
}

// Object.freeze(ListManager.ClockTypes),
ListManager.ImportTypes = {
  File: 0,
  Image: 1,
  SDON: 2,
  Gliffy: 3,
  Text: 4,
  Data: 5,
  CSV: 6,
  Stickynotes: 7
}

// Object.freeze(ListManager.DateCodes),
// ListManager.Guide_DistanceTypes = {
//   Room: 1,
//   Horizontal_Wall: 2,
//   Vertical_Wall: 3,
//   PolyWall: 4
// }

ListManager.WFlags = {
  W_Stf: 1,
  W_Page: 2
}

// Object.freeze(ListManager.WFlags),
// ListManager.SegLDir = {
//   SED_KTC: 5,
//   SED_KBC: 6,
//   SED_KLC: 7,
//   SED_KRC: 8
// }

// Object.freeze(ListManager.SegLDir),
ListManager.FreehandLineTypes = {
  Pen: 1,
  Highlighter: 2
}

// Object.freeze(ListManager.FreehandLineTypes),
// ListManager.ArcQuad = {
//   SD_PLA_TL: 0,
//   SD_PLA_BL: 1,
//   SD_PLA_BR: 2,
//   SD_PLA_TR: 3
// }

// Object.freeze(ListManager.ArcQuad),
// ListManager.PolySegFlags = {
//   SD_PLS_Select: 1,
//   SD_PLS_Hide: 2,
//   SD_PLS_Temp: 4,
//   SD_PLS_TempSave: 8,
//   SD_PLS_VA: 16,
//   SD_PLS_NVA: 32,
//   SD_PLS_NoLine: 64,
//   SD_PLS_NoFill: 128
// }

// Object.freeze(ListManager.PolySegFlags),
// ListManager.PolyListFlags = {
//   SD_PLF_FreeHand: 1,
//   SD_PLF_OneStep: 2,
//   SD_PLF_NoMiddleControlPoints: 4,
//   SD_PLF_TimelineControlPoint: 8,
//   SD_PLF_NoControl: 16,
//   SD_PLF_WasExplict: 32,
//   SD_PLF_HasMoveTo: 64,
//   SD_PLF_HasPolyPoly: 128
// }

// Object.freeze(ListManager.PolyListFlags),
// ListManager.ObjectTypes = {
//   SD_OBJT_NONE: 0,
//   SD_OBJT_PICTCONTAINER: 1,
//   SD_OBJT_FRAME: 2,
//   SD_OBJT_CABINETWALL: 3,
//   SD_OBJT_CABINETFINISH: 4,
//   SD_OBJT_BACKGROUND: 5,
//   SD_OBJT_MINDMAP_MAIN: 6,
//   SD_OBJT_MINDMAP_IDEA: 7,
//   SD_OBJT_MINDMAP_CONNECTOR: 8,
//   SD_OBJT_CAUSEEFFECT_MAIN: 9,
//   SD_OBJT_GANTT_BAR: 10,
//   SD_OBJT_SWIMLANE_ROWS: 11,
//   SD_OBJT_SWIMLANE_COLS: 12,
//   SD_OBJT_TIMELINE_EVENT: 13,
//   SD_OBJT_GANTT_CONNECTOR: 14,
//   SD_OBJT_STORYB_CONNECTOR: 15,
//   SD_OBJT_FLOORPLAN_WALL: 16,
//   SD_OBJT_GANTT_CHART: 17,
//   SD_OBJT_TIMELINE: 18,
//   SD_OBJT_2012GROUP: 19,
//   SD_OBJT_KANBAN_CARD: 20,
//   SD_OBJT_VALUESTREAM_TIMELINE: 21,
//   SD_OBJT_VALUESTREAM_SYMBOL: 22,
//   SD_OBJT_VALUESTREAM_TAKT: 23,
//   SD_OBJT_DECISIONTREE_CONNECTOR: 24,
//   SD_OBJT_PEDIGREE_CONNECTOR: 25,
//   SD_OBJT_CAUSEEFFECT_BRANCH: 26,
//   SD_OBJT_GENOGRAM_BRANCH: 27,
//   SD_OBJT_STEPCHARTH_BRANCH: 28,
//   SD_OBJT_STEPCHARTV_BRANCH: 29,
//   SD_OBJT_BAD_STEPCHART_BRANCH: 30,
//   SD_OBJT_DESCENDANT_CONNECTOR: 31,
//   SD_OBJT_ANNOTATION: 32,
//   SD_OBJT_UIELEMENT: 33,
//   SD_OBJT_NG_TIMELINE: 34,
//   SD_OBJT_NG_EVENT: 35,
//   SD_OBJT_NG_EVENT_LABEL: 36,
//   SD_OBJT_D3SYMBOL: 37,
//   SD_OBJT_MANUAL_EVENT_LABEL: 38,
//   SD_OBJT_MULTIPLICITY: 39,
//   SD_OBJT_BPMN_EVENT_START: 40,
//   SD_OBJT_BPMN_EVENT_INTERMEDIATE: 41,
//   SD_OBJT_BPMN_EVENT_END: 42,
//   SD_OBJT_BPMN_EVENT_START_NI: 43,
//   SD_OBJT_BPMN_EVENT_INTERMEDIATE_NI: 44,
//   SD_OBJT_BPMN_EVENT_INTERMEDIATE_THROW: 45,
//   SD_OBJT_BPMN_ACTIVITY: 50,
//   SD_OBJT_BPMN_GATEWAY: 51,
//   SD_OBJT_BPMN_DATAOBJECT: 52,
//   SD_OBJT_BPMN_CHOREOGRAPHY: 53,
//   SD_OBJT_BPMN_POOL: 54,
//   SD_OBJT_SHAPECONTAINER: 55,
//   SD_OBJT_TABLE_WITH_SHAPECONTAINER: 56,
//   SD_OBJT_BUSLOGIC_TABLE: 57,
//   SD_OBJT_BUSLOGIC_TABLEROW: 58,
//   SD_OBJT_BUSLOGIC_LINEDRAW: 59,
//   SD_OBJT_SWIMLANE_GRID: 60,
//   SD_OBJT_JIRA_ISSUES_CONTAINER_ISSUE: 61,
//   SD_OBJT_JIRA_BLOCKINGISSUE: 62,
//   SD_OBJT_JIRA_EPICDEPENDENCY: 63,
//   SD_OBJT_JIRA_PRODUCTROADMAP: 64,
//   SD_OBJT_JIRA_PIBOARD: 65,
//   SD_OBJT_FRAME_CONTAINER: 75,
//   SD_OBJT_BUSLOGIC_AWS: 76,
//   SD_OBJT_BUSLOGIC_AZURE: 77,
//   SD_OBJT_AZUREDEVOPS_ITEM_CARD: 78,
//   SD_OBJT_EXTRATEXTLABEL: 80
// }

// Object.freeze(ListManager.ObjectTypes),
// ListManager.ObjectSubTypes = {
//   SD_SUBT_NONE: 0,
//   SD_SUBT_TASKMAP: 1,
//   SD_SUBT_MEETINGMAP: 2,
//   SD_SUBT_HUBMAP: 3,
//   SD_SUBT_MEETINGPERSON: 4,
//   SD_SUBT_MEETINGTASK: 5,
//   SD_SUBT_TASK: 6,
//   SD_SUBT_HUBNODE: 7,
//   SD_SUBT_KANBAN_TABLE: 8,
//   SD_SUBT_CUBICLE: 9,
//   SD_SUBT_VS_NVA: 10,
//   SD_SUBT_VS_INV: 11,
//   SD_SUBT_VS_SYMONLY: 12,
//   SD_SUBT_UI_VRADIO: 13,
//   SD_SUBT_UI_HRADIO: 14,
//   SD_SUBT_UI_VCHECKBOX: 15,
//   SD_SUBT_UI_HCHECKBOX: 16,
//   SD_SUBT_UI_ACCORDION: 17,
//   SD_SUBT_UI_VTABBED: 18,
//   SD_SUBT_UI_HTABBED: 19,
//   SD_SUBT_UI_MENU: 20,
//   SD_SUBT_UI_VLIST: 21,
//   SD_SUBT_UI_HLIST: 22,
//   SD_SUBT_UI_RMENU: 23,
//   SD_SUBT_UI_MMENU: 24,
//   SD_SUBT_NGEVENT_STRAIGHT: 24,
//   SD_SUBT_NGEVENT_VERTICAL: 25,
//   SD_SUBT_NGEVENT_TEXTONLY: 26,
//   SD_SUBT_NGEVENT_BULLET: 27,
//   SD_SUBT_NGEVENT_BAR: 28,
//   SD_SUBT_NGEVENT_BLOCK: 29,
//   SD_SUBT_NGEVENT_SWIMLANE: 30,
//   SD_SUBT_BPMN_EVENT_MESSAGE: 31,
//   SD_SUBT_BPMN_EVENT_TIMER: 32,
//   SD_SUBT_BPMN_EVENT_ERROR: 33,
//   SD_SUBT_BPMN_EVENT_ESCALATION: 34,
//   SD_SUBT_BPMN_EVENT_CANCEL: 35,
//   SD_SUBT_BPMN_EVENT_COMPENSATION: 36,
//   SD_SUBT_BPMN_EVENT_CONDITIONAL: 37,
//   SD_SUBT_BPMN_EVENT_LINK: 38,
//   SD_SUBT_BPMN_EVENT_SIGNAL: 39,
//   SD_SUBT_BPMN_EVENT_TERMINATE: 40,
//   SD_SUBT_BPMN_EVENT_MULTIPLE: 41,
//   SD_SUBT_BPMN_EVENT_PARALLEL: 42,
//   SD_SUBT_BPMN_ACTIVITY_TASK: 50,
//   SD_SUBT_BPMN_ACTIVITY_SUBROUTINE: 51,
//   SD_SUBT_BPMN_ACTIVITY_TRANSACTION: 52,
//   SD_SUBT_BPMN_ACTIVITY_CALL: 53,
//   SD_SUBT_BPMN_GATEWAY_EXCLUSIVE: 60,
//   SD_SUBT_BPMN_GATEWAY_EVENT: 61,
//   SD_SUBT_BPMN_GATEWAY_EXCLUSIVE_EVENT: 62,
//   SD_SUBT_BPMN_GATEWAY_PARALLEL_EVENT: 63,
//   SD_SUBT_BPMN_GATEWAY_INCLUSIVE: 64,
//   SD_SUBT_BPMN_GATEWAY_PARALLEL: 65,
//   SD_SUBT_BPMN_GATEWAY_COMPLEX: 66,
//   SD_SUBT_BPMN_LINE: 70,
//   SD_SUBT_ERD_LINE: 71,
//   SD_SUBT_UML_LINE: 72,
//   SD_SUBT_UMLCLASS_LINE: 73,
//   SD_SUBT_UMLCOMPONENT_LINE: 74,
//   SD_SUBT_LINEDRAW_SWIMLANE: 75,
//   SD_SUBT_MULTIPLICITY_FLIPPED: 80
// }

// Object.freeze(ListManager.ObjectSubTypes),
// ListManager.HopStyle = {
//   SDH_Box: 0,
//   SDH_Arc: 1
// }

// Object.freeze(ListManager.HopStyle),
// ListManager.HopDimX = [
//   6,
//   8,
//   10
// ]

// ListManager.HopDimY = [
//   4,
//   5,
//   6
// ]

// ListManager.ImageScales = {
//   SDIMAGE_ALWAYS_FIT: 0,
//   SDIMAGE_CROP_TO_FIT: 1,
//   SDIMAGE_PROP_FIT: 2
// }

// Object.freeze(ListManager.ImageScales),
ListManager.TextureAlign = {
  SDTX_TOPLEFT: 1,
  SDTX_TOPCENTER: 2,
  SDTX_TOPRIGHT: 3,
  SDTX_CENLEFT: 4,
  SDTX_CENTER: 5,
  SDTX_CENRIGHT: 6,
  SDTX_BOTLEFT: 7,
  SDTX_BOTCENTER: 8,
  SDTX_BOTRIGHT: 9
}

// Object.freeze(ListManager.TextureAlign),
// ListManager.TextAlign = {
//   LEFT: 'left',
//   CENTER: 'center',
//   RIGHT: 'right',
//   TOPLEFT: 'top-left',
//   TOPCENTER: 'top-center',
//   TOPRIGHT: 'top-right',
//   BOTTOMLEFT: 'bottom-left',
//   BOTTOMCENTER: 'bottom-center',
//   BOTTOMRIGHT: 'bottom-right'
// }

// Object.freeze(ListManager.TextAlign),
// ListManager.TextFace = {
//   Bold: 1,
//   Italic: 2,
//   Underline: 4,
//   Superscript: 16,
//   Subscript: 32
// }

// Object.freeze(ListManager.TextFace),


// ListManager.ClipboardType = {
//   None: 0,
//   Text: 1,
//   LM: 2,
//   Table: 3,
//   Image: 4
// }

/*
// Object.freeze(ListManager.ClipboardType),
ListManager.TELastOp = {
  INIT: - 1,
  CHAR: 0,
  BS: 1,
  DEL: 2,
  STYLE: 3,
  CUT: 4,
  COPY: 5,
  PASTE: 6,
  SELECT: 7,
  TIMEOUT: 8
}
*/

// Object.freeze(ListManager.TELastOp),
ListManager.ConnectorDir = {
  ORG_HORIZONTAL: 0,
  ORG_VERTICALDOWN: 1,
  ORG_VERTICALUP: 2,
  ORG_HORIZONTALRIGHT: 3
}

// Object.freeze(ListManager.ConnectorDir),
ListManager.ModalOperations = {
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

Object.freeze(ListManager.ModalOperations),
  ListManager.FormatPainterModes = {
    NONE: 0,
    OBJECT: 1,
    TEXT: 2,
    TABLE: 3
  }

// Object.freeze(ListManager.FormatPainterModes),
// ListManager.DimensionFlags = {
//   SED_DF_EndPts: 1,
//   SED_DF_AllSeg: 2,
//   SED_DF_Total: 4,
//   SED_DF_Select: 8,
//   SED_DF_Always: 16,
//   SED_DF_Area: 32,
//   SED_DF_AreaSel: 64,
//   SED_DF_Standoff: 128,
//   SED_DF_Exterior: 256,
//   SED_DF_ShowFractionalInches: 512,
//   SED_DF_RectWithAndHeight: 1024,
//   SED_DF_ShowLineAngles: 2048,
//   SED_DF_InteriorAngles: 4096,
//   SED_DF_HideHookedObjDimensions: 8192,
//   SED_DF_ShowFeetAsInches: 16384
// }

// Object.freeze(ListManager.DimensionFlags),
ListManager.LibraryFlags = {
  SEDL_NoColor: 1,
  SEDL_Auto: 2,
  SEDL_NoSize: 4,
  SEDL_Scale: 8,
  SEDL_NoAttach: 16,
  SEDL_JPG: 32,
  SEDL_PNG: 64,
  SEDL_DropOnBorder: 128,
  SEDL_DropOnTable: 256,
  SEDL_Virtual: 512,
  SEDL_Bad: 1024,
  SEDL_NoLinking: 2048,
  SEDL_Planning: 4096,
  SEDL_NoTarget: 8192
}

// Object.freeze(ListManager.LibraryFlags),
ListManager.LibraryUseFlags = {
  SDLE_UseShowDimensions: 1,
  SDLE_UseLayer: 2,
  SDLE_UseText: 4,
  SDLE_AddNameAsLabel: 8
}

// Object.freeze(ListManager.LibraryUseFlags),
// ListManager.GraphType = {
//   SDGRAPH_TYPE_UNSET: - 1,
//   SDGRAPH_TYPE_BAR: 0,
//   SDGRAPH_TYPE_STACKEDBAR: 1,
//   SDGRAPH_TYPE_LINE: 2,
//   SDGRAPH_TYPE_PIE: 3,
//   SDGRAPH_TYPE_LINEARPIE: 4,
//   SDGRAPH_TYPE_STACKEDLINE: 5
// }

// Object.freeze(ListManager.GraphType),
// ListManager.GraphFlags = {
//   SDAX_SEQUENCE_BY_POINTS: 1,
//   SDAX_SEQUENCE_BY_SERIES: 2,
//   SDAX_SEQUENCE_BY_CATEGORY: 4,
//   SDAX_SEQUENCE_BY_POINTS_BY_SERIES: 8,
//   SDAX_3D: 16,
//   SDAX_FLAG_DATA_MODIFIED: 32,
//   SDAX_AVAILABLE: 64,
//   SDAX_SHOW_TABLE: 128,
//   SDAX_FLIP_ROW_COL_ORIENTATION: 256,
//   SDAX_REDIRECT_EDIT_SERIES_NAME: 2048,
//   SDAX_DATATABLE_USER_MANAGED_GEOMETRY: 4096,
//   SDAX_BG_IMAGEFILL: 8192,
//   SDAX_AREABG_IMAGEFILL: 16384,
//   SDAX_SHOW_STACKED_SCALE: 32768
// }

// Object.freeze(ListManager.GraphFlags),
// ListManager.AxisFlags = {
//   SDAX_START_AT_LOWER_BOUND: 1,
//   SDAX_HIDE_MAJOR_TICKS: 2,
//   SDAX_HIDE_MINOR_TICKS: 4,
//   SDAX_MAJOR_TICK_IF_LABEL: 8,
//   SDAX_LABELS_ANGLED: 16,
//   SDAX_SHOW_GRID_LINE_MAJOR: 32,
//   SDAX_HIDE_AXIS_LINE: 64,
//   SDAX_HIDE_LABELS: 128,
//   SDAX_HIDE_TITLE: 256,
//   SDAX_SHOW_GRID_LINE_MINOR: 512,
//   SDAX_SHOW_SUMMARY_LABELS: 1024
// }

// Object.freeze(ListManager.AxisFlags),
// ListManager.LegendType = {
//   SDAX_LEGEND_FULL: 0,
//   SDAX_LEGEND_NONE: 1,
//   SDAX_LEGEND_NAMES: 2,
//   SDAX_LEGEND_SWATCHES: 3
// }

// Object.freeze(ListManager.LegendType),
ListManager.GradientStyle = {
  GRAD_MIDDLE: 1,
  GRAD_HORIZ: 4,
  GRAD_VERT: 2,
  GRAD_TLBR: 8,
  GRAD_TRBL: 16,
  GRAD_REV: 32,
  GRAD_SHAPE: 64,
  GRAD_RADIAL: 128
}

// Object.freeze(ListManager.GradientStyle),
// ConstantData.LayerFlags = {
//   SDLF_Visible: 1,
//   SDLF_Active: 2,
//   SDLF_NoAdd: 4,
//   SDLF_AllowCellEdit: 8,
//   SDLF_UseEdges: 16
// }

// Object.freeze(ConstantData.LayerFlags),
// ConstantData.LayerTypes = {
//   SD_LAYERT_NONE: 0,
//   SD_LAYERT_MINDMAP: 1,
//   SD_LAYERT_GANTT: 2,
//   SD_LAYERT_PERT: 3,
//   SD_LAYERT_WEBPAGE: 4,
//   SD_LAYERT_TIMELINE: 5,
//   SD_LAYERT_MEETING: 6,
//   SD_LAYERT_BACKGROUND: 7
// }

/*
// Object.freeze(ConstantData.LayerTypes),
ConstantData.ContentHeaderFlags = {
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
  */

// Object.freeze(ConstantData.ContentHeaderFlags),
ListManager.ShapeCenteringOptions = {
  SD_SHAPE_CENTER_LEFT_ALIGN: 1,
  SD_SHAPE_CENTER_RIGHT_ALIGN: 2,
  SD_SHAPE_CENTER_TOP_ALIGN: 3,
  SD_SHAPE_CENTER_BOTTOM_ALIGN: 4
}

ListManager.DataOpsFieldTypes = {
  SD_DATA_FT_TEXT: 0,
  SD_DATA_FT_DATE: 1,
  SD_DATA_FT_TIME: 2,
  SD_DATA_FT_PC: 3,
  SD_DATA_FT_FP: 4,
  SD_DATA_FT_INT: 5,
  SD_DATA_FT_FPG: 6
}

ListManager.TaskManagementFlags = {
  TASKMGT_ASSIGNONLY: 1,
  TASKMGT_SHOW_DATES: 2,
  TASKMGT_KANBANONLY: 4
}

ListManager.GanttTaskModes = {
  TASK_MODE_START: 0,
  TASK_MODE_END: 1,
  TASK_MODE_BOTH: 2
}

ListManager.GanttTaskFields = {
  ROW_FIELD: 0,
  PARENT_FIELD: 1,
  INDEX_FIELD: 2,
  TASK_FIELD: 3,
  TASK_START: 4,
  TASK_END: 5,
  TASK_LENGTH: 6,
  TASK_RESOURCE: 7,
  TASK_SIDE: 8,
  TASK_MASTER: 9,
  TASK_HIDE: 10,
  TASK_PC: 11,
  TASK_DEPT: 12,
  TASK_COST: 13,
  TASK_CUSTOM: 14,
  TASK_GUID: 15,
  TASK_PERSONID: 16,
  TASK_PERSONGUID: 17,
  TASK_ICON: 18,
  TASK_STYLE: 19,
  TASK_NOTES: 20,
  TASK_CHILDURL: 21,
  TASK_NOTESID: 22,
  TASK_TRELLO_CARD_ID: 23,
  TASK_TRELLO_CARD_URL: 24
}

ListManager.NGTimelineFields = {
  BLOCKID: 0,
  START: 1,
  LENGTH: 2,
  UNITS: 3,
  AUTO: 4,
  DEF_POSITION: 5,
  DEF_EVENT: 6,
  EVENT_TABLEID: 7,
  EVENT_START: 8,
  EVENT_END: 9,
  STARTTIME: 10,
  COLWIDTH: 11,
  ALTERNATECOLUMNS: 12,
  ROWPROPERTIES: 13,
  DEFAULTSHAPE: 14
}

ListManager.NGTimelineEventFields = {
  START: 0,
  STARTSECS: 1,
  LENGTH: 2,
  POSITION: 3,
  BLOCKID: 4
}

ListManager.JiraFields = {
  PARAMS: 0
}

ListManager.DocumentTableFields = {
  DOC_TYPE: 0,
  DOC_NAME: 1,
  DOC_GUID: 2,
  DOC_VERSION: 3,
  DOC_TIMESTAMP: 4,
  DOC_TEAMGUID: 5,
  DOC_TEAMID: 6,
  DOC_LIBGUID: 7,
  DOC_SUBTYPE: 8
}

ListManager.HubTableFields = {
  INDEX_FIELD: 0,
  ROW_FIELD: 1,
  PARENT_FIELD: 2
}

ListManager.ImportTableFields = {
  PARAMS_FIELD: 0
}

ListManager.PersonTableFields = {
  TM_P_NAME: 0,
  TM_P_GUID: 1,
  TM_P_EMAIL: 2,
  TM_P_STATUS: 3,
  TM_P_LOCALGUID: 4,
  TM_P_LOCALFLAGS: 5
}

ListManager.PersonTableFlags = {
  SF_LF_SOURCE_SDR: 1,
  SF_LF_SOURCE_TEAMDATA: 2,
  SF_LF_SOURCE_SERVER: 4,
  SF_LF_ASSIGNMENT_MADE: 8,
  SF_LF_FROM_TRELLO: 16
}

ListManager.DataRelationships = {
  PARENT_RELATIONSHIP: 'PARENTCHILD',
  DEPENDENT_RELATIONSHIP: 'MASTERSLAVE',
  FOLDER_RELATIONSHIP: 'FOLDERFILE',
  TEAMLIB_RELATIONSHIP: 'TEAMFOLDER',
  MEETING_RELATIONSHIP: 'MEETINGPARENTCHILD',
  FLOW_PARENT_RELATIONSHIP: 'FLOWPARENTCHILD'
}

ListManager.TimeScale = {
  SDG_YR: 2,
  SDG_YR_WITH_QTR: 3,
  SDG_YR_WITH_MONTHS: 11,
  SDG_QTR_WITH_MONTHS: 7,
  SDG_MONTH_WITH_DAYS: 1,
  SDG_WEEK_WITH_DAYS: 4,
  SDG_WEEK_DAY_DATE: 5,
  SDG_DAY_WITH_HOURS: 17,
  SDG_FIT_TO_WINDOW: 99
}

ListManager.DataSetNameListIndexes = {
  DATASET_GOOGLEMAPS: 0,
  DATASET_PLANNING: 1,
  DATASET_GRAPH: 2,
  DATASET_WEBSITEMAP: 3,
  DATASET_LDAP: 4,
  DATASET_DOCUMENT: 5,
  DATASET_VPM: 6,
  DATASET_SHAREDFILES: 7,
  DATASET_HUB: 8,
  DATASET_TEAMDATA: 9,
  DATASET_FLOWCHART: 10,
  DATASET_FIELDEDDATA: 11,
  DATASET_NG_TIMELINE: 12,
  DATASET_IMPORT: 13
}

ListManager.DataSetNameList = [
  'GOOGLEMAPS',
  'PLANNING',
  'GRAPHS',
  'WEBSITEMAP',
  'LDAP',
  'DOCUMENT',
  'VPM',
  'SHAREDFILES',
  'HUB',
  'TEAMDATA',
  'FLOWCHART',
  'FIELDEDDATA',
  'NG_TIMELINE',
  'IMPORT'
]

ListManager.GanttFieldNameList = [
  'ROW',
  'PARENT',
  'INDEX',
  'TASK',
  'START',
  'END',
  'LENGTH',
  'RESOURCE',
  'MINDMAPSIDE',
  'MASTER',
  'HIDE',
  'PERCENTCOMPLETE',
  'DEPARTMENT',
  'COST',
  'CUSTOM',
  'GUID',
  'PERSONID',
  'PERSONGUID',
  'ICON',
  'STYLEOVERRIDES',
  'NOTES',
  'CHILDURL',
  'NOTESID',
  'TRELLOCARDID',
  'TRELLOCARDURL'
]

ListManager.TimelineFieldNameList = [
  'BLOCKID',
  'START',
  'LENGTH',
  'UNITS',
  'AUTO',
  'DEF_POSITION',
  'DEF_EVENT',
  'EVENT_TABLEID',
  'EVENT_START',
  'EVENT_END',
  'STARTTIME',
  'COLWIDTH',
  'ALTERNATECOLUMNS',
  'ROWPROPERTIES',
  'DEFAULTSHAPE'
]

ListManager.JiraReportFieldNameList = [
  'Params'
]

ListManager.TimelineEventFieldNameList = [
  'START',
  'STARTSECS',
  'LENGTH',
  'POSITION',
  'BLOCKID'
]

ListManager.DocumentFieldNameList = [
  'DOCTYPE',
  'DOCNAME',
  'DOCGUID',
  'DOCVERSION',
  'DOCTIMESTAMP',
  'TEAMGUID',
  'TEAMID',
  'DOCLIBGUID',
  'DOCSUBTYPE'
]

ListManager.HubFieldNameList = [
  'INDEX',
  'ROW',
  'PARENT',
  'LABEL',
  'SIDE',
  'HIDE',
  'RECORDTYPE',
  'LINKURL',
  'ICON',
  'STYLE',
  'NOTES',
  'NOTESID'
]

ListManager.PersonFieldNameList = [
  'NAME',
  'GUID',
  'EMAIL',
  'STATUS',
  'LOCALGUID',
  'LOCALFLAGS'
]

ListManager.ImportFieldNameList = [
  'PARAMS'
]

ListManager.TimeAmounts = {
  OneDay: 86400,
  OneDayNS: 864000000000,
  OneHourNS: 36000000000,
  OneWeekNS: 6048000000000,
  OneSecondNS: 10000000,
  OneMinNS: 600000000,
  OneDayMS: 86400000
}

ListManager.TimelineUnits = {
  HundredYear: 100,
  FiftyYear: 50,
  TenYear: 10,
  FiveYear: 5,
  TwoYear: 2,
  Year: 365,
  Quarter: 92,
  Month: 31,
  Week: 7,
  Day: 1,
  TwelveHour: - 12,
  SixHour: - 6,
  FourHour: - 4,
  TwoHour: - 2,
  Hour: - 1
}

ListManager.MonthStrings = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER'
]

ListManager.MonthAbrStrings = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
]

ListManager.QuarterStrings = [
  'Q1',
  'Q2',
  'Q3',
  'Q4'
]

ListManager.OrgChartOrientations = {
  SD_ORG_HORIZONTAL: 0,
  SD_ORG_VERTICALDOWN: 1,
  SD_ORG_VERTICALUP: 2,
  SD_ORG_HORIZONTALRIGHT: 3
}

// ListManager.LineAngleDimensionDefs = {
//   ANGLEDIMENSION_ARROWHEAD_SIZE: 10,
//   ANGLEDIMENSION_ARROWHEAD_WIDTH: 4,
//   ANGLEDIMENSION_PREFERRED_ARROWSTEM_MINIMUM: 4,
//   ANGLEDIMENSION_PREFERRED_BISECTOR_LEN: 75
// }



// Object.freeze(ListManager.PolygonShapeGenerator),
// ListManager.CollabSVGEventTypes = {
//   Object_Move: 1,
//   Shape_Grow: 2,
//   Table_GrowColumn: 3,
//   TextEntry: 4
// }

// ListManager.CollabMessages = {
//   SetStyleAttributes: 1,
//   SetTextAttributes: 2,
//   Text_Init: 3,
//   Text_Edit: 4,
//   Text_End: 5,
//   AddSymbol: 6,
//   AddLine: 7,
//   ActionButton: 8,
//   ActionButton_SplitPath: 9,
//   LineDraw_InsertShape: 10,
//   MoveObjects: 11,
//   Dialog_Dimensions: 12,
//   Action_Shape: 13,
//   Action_Line: 14,
//   Action_Connector: 15,
//   PolyLSetSegmentType: 16,
//   PolyLRemoveNodes: 17,
//   PolyLAddNode: 18,
//   PolyLSplit: 19,
//   Duplicate: 20,
//   DeleteObjects: 21,
//   Table_DeleteCellContent: 22,
//   PasteObjects: 23,
//   Table_PasteCellContent: 24,
//   Undo: 25,
//   Redo: 26,
//   FormatPainter: 27,
//   Table_PasteFormat: 28,
//   Edit_Note: 29,
//   Comment_Add: 30,
//   SetTextDirection: 31,
//   ChangeWidth: 32,
//   ChangeHeight: 33,
//   SetTopLeft: 34,
//   AlignShapes: 35,
//   GroupSelectedShapes: 36,
//   UngroupSelectedShapes: 37,
//   RotateShapes: 38,
//   FlipShapes: 39,
//   BringToFrontOfSpecificLayer: 40,
//   SendToBackOfSpecificLayer: 41,
//   SpaceEvenly: 42,
//   MakeSameSize: 43,
//   ChangeShape: 44,
//   ChangeLineType: 45,
//   ChangeToSymbol: 46,
//   OpenShapeEdit: 47,
//   CloseShapeEdit: 48,
//   SetTargetConnectionPoints: 49,
//   SetShapeProperties: 50,
//   SetColorFilter: 51,
//   Lock: 52,
//   SetObjectHyperlink: 53,
//   FieldedDataImportFromFile: 54,
//   InsertGraph: 55,
//   InsertGauge: 56,
//   SetBackgroundColor: 57,
//   SetBackgroundGradient: 58,
//   ResetBackgroundGradient: 59,
//   SetBackgroundTexture: 60,
//   SetPageOrientation: 61,
//   SetPageOrientation: 61,
//   SetPageMargins: 62,
//   SetCustomPageMargins: 63,
//   AddNewLayer: 64,
//   SetLayers: 65,
//   ShowAllLayers: 66,
//   LayerTabClick: 67,
//   Dialog_Options: 68,
//   SetWorkArea: 69,
//   CenterOnPage: 70,
//   SetScalePreset: 71,
//   ScaleDialog: 72,
//   InsertTable: 73,
//   RemoveTables: 74,
//   SetTableProperties: 75,
//   Table_DeleteRows: 76,
//   Table_InsertRows: 77,
//   Table_InsertColumns: 78,
//   Table_DeleteColumns: 79,
//   Table_JoinCells: 80,
//   Table_SplitCells: 81,
//   Table_DistributeRowandCols: 82,
//   Table_SetCellFlags: 83,
//   SetSDPFlag: 84,
//   InsertSDONFromImport: 85,
//   ApplyLineHopDialog: 86,
//   AddCorner: 87,
//   AddAnnotationLayer: 88,
//   RemoveAnnotationLayer: 89,
//   ShowDimensions: 90,
//   SetBranchStyle: 91,
//   SetChartStyle: 92,
//   SetSDPMoreFlag: 93,
//   UpdateGraph: 94,
//   DataFieldDeleteTable: 95,
//   SetDirection: 96,
//   ConnectorSetSpacing: 97,
//   ActionButton_JoinPath: 98,
//   OrgSetTable: 99,
//   MindMapSetTable: 100,
//   MindMapAddIcon: 101,
//   ReadJSONAPI: 102,
//   GanttAddTask: 103,
//   GanttAddDependency: 104,
//   GanttRemoveDependency: 105,
//   GanttIndent: 106,
//   GanttSortTasks: 107,
//   SD_GanttExpandContract: 108,
//   GanttSetTimeScale: 109,
//   UpdateProjectOptions: 110,
//   UpdateProjectTimeframe: 111,
//   InsertSwimlane: 112,
//   MakeUniformSize: 113,
//   BPMN_SwitchSymbol: 114,
//   BPMN_SwitchIcon: 115,
//   BPMN_AddRemoveParticipant: 116,
//   ReverseArrowheads: 117,
//   AddMultiplicity: 118,
//   UIElementAction: 119,
//   HandleIconClick: 120,
//   CMD_NewDataTable: 121,
//   CMD_DataFieldAdd: 122,
//   CMD_DataFieldLabelChange: 123,
//   CMD_DataFieldTypeSelect: 124,
//   CMD_DataFieldDelete: 125,
//   CMD_DataFieldMoveUp: 126,
//   CMD_DataFieldMoveDown: 127,
//   CMD_DataFieldRenameTable: 128,
//   FieldedDataUpdateFromFile: 129,
//   FieldedDataImportFromURL: 130,
//   FieldedDataUpdateFromURL: 131,
//   CMD_HandleDataChange: 132,
//   UpdateFieldedDataTooltipItem: 133,
//   AddDataRule: 134,
//   UpdateDataRule: 135,
//   DeleteDataRule: 136,
//   CMD_SelectDataRule: 137,
//   AttachRowToShape: 138,
//   CMD_DataFieldUnlinkShape: 139,
//   CMD_DataFieldDeleteData_NoShape: 140,
//   CMD_DataFieldDeleteData: 141,
//   HandleDataDrop: 142,
//   SetHideIconState: 143,
//   AddSelectedSymbol: 144,
//   NudgeSelectedObjects: 145,
//   SetSpellCheck: 148,
//   ClearImage: 149,
//   Table_ImportPicture: 150,
//   Shape_ImportPicture: 151,
//   AddShape_ImportPicture: 152,
//   ContainerDoubleClick: 153,
//   FieldedDataSetFieldPresetList: 154,
//   FieldedDataClearFieldPresetList: 155,
//   Table_InsertDeleteGroupCols: 156,
//   Table_InsertDeleteGroupRows: 157,
//   UpdateGauge: 158,
//   SetFractionalPrecision: 159,
//   SetDecimalPrecision: 160,
//   OrgAddPicture: 161,
//   SetLineCornerRadiusAll: 162,
//   SwitchTheme: 163,
//   UpdateDimensionFromTextObj: 164,
//   SetDefaultWallThickness: 165,
//   SetShapeMoreFlags: 166,
//   Pr_InsertSymbol: 167,
//   HandleDataRecordAdd: 168,
//   InsertFrameContainer: 169,
//   CreateTableFromReport: 170,
//   Jira_CreateShapesForIssues: 171,
//   UpdateSelectedShapeFromJiraInformation: 172,
//   Jira_ProductRoadMap: 173,
//   Multiplicity_SwitchSides: 174,
//   UpdateObjectWithIntegrationCardItemInformation: 175,
//   CreateShapesForIntegrationCardItems: 176,
//   TimelineAddEvent: 177,
//   TimelineRemoveEvent: 178,
//   TimelineChangePosition: 179,
//   TimelineChangeType: 180,
//   TimelineChangeDate: 181,
//   TimelineSetAuto: 182,
//   TimelineMoveEvent: 183,
//   HitAreaClick: 184,
//   Table_FillSwimlane: 185,
//   DeSelect: 186,
//   SwimLane_Operation: 187,
//   CreateSubProcess: 188,
//   SubProcess_UpdateParent: 189,
//   SetViewport: 190
// }

// ListManager.Collab_AnimationMessages = {
//   CursorMove: 1000,
//   ChangeSelection: 1001
// }

// ListManager.CollabMessageActions = {
//   CreateSymbol: 1,
//   CreateLine: 2,
//   CreateShape: 3,
//   MoveObject: 4,
//   LinkObject: 5,
//   AddLabel: 6
// }

ListManager.StandardShapeSymbolIDs = {
  2: 'b8002394-8010-495f-8fdd-7869523153d7',
  4: '97067c1b-2237-40da-8343-95ee70b7830e',
  5: 'eaf0858e-cc36-4733-8f63-ef221acd0d5c',
  6: '499eb277-a38d-46de-88bd-fc878b29a9ab',
  20: '0a806d00-9d8e-4c11-8389-7874aff78720',
  9: 'c3f38053-ac93-479b-8cb6-d93fd2f6c7dc',
  17: '6ec5bad8-2a11-406c-8d09-ee829c3dcb2c',
  14: '6314591b-042b-47bb-858c-82ea96739168',
  8: 'a2cd9683-2056-46a1-8733-d6a4db4a6462',
  10: 'db87b678-a609-440f-815d-9aaf37316f48',
  16: 'c6f29c4d-9a27-4559-8313-74c85398d52d',
  23: 'c18bdcd5-750f-4dd5-813d-c647b7d898d4'
}

ListManager.EssentialLibraries = {
  'd1e2f6d3-8dcf-4c39-8c42-ad1f252be500': [
    '13a207a6-0d65-4515-be3a-d3d782979063'
  ],
  '211eb435-e111-4947-8f52-0911efbaeed8': [
    '7b0f0517-d105-4a53-9e1f-04563f5b8171'
  ],
  'a20dc4d3-0d87-47c5-889d-66c757c62213': [
    '13a207a6-0d65-4515-be3a-d3d782979063'
  ],
  '735ef08a-24a9-445e-86ff-48ba78ab85a8': [
    '96c6268d-33d6-4d03-b62d-556786c8280c',
    '13a207a6-0d65-4515-be3a-d3d782979063'
  ],
  'a96888df-52d7-40a0-865c-51ee36eaeb28': [
    '13a207a6-0d65-4515-be3a-d3d782979063'
  ],
  'cf3de6bc-42c2-4571-8619-349f8f79d2ef': [
    '13a207a6-0d65-4515-be3a-d3d782979063'
  ],
  '5543d88d-2355-4d6b-8119-c4cc478173de': [
    '5024a8a4-2da2-4f41-b6be-66bae6e09530'
  ],
  '7c423c2c-26e1-47bb-8ce4-cb5bc7400d25': [
    'd1eea160-7255-456c-9be4-b9eca11820d1',
    '29f422d6-0874-4276-9fac-fb7280c100c3'
  ],
  '1daef7bc-bbaa-4496-8b88-80fdcd4ec553': [
    '9cdd3a7c-1eeb-4660-b726-142cf9b5d607'
  ],
  '8369a092-517c-49e7-8336-3edba999927d': [
    '9cdd3a7c-1eeb-4660-b726-142cf9b5d607'
  ],
  '9cf47e77-33dc-4de4-860b-7d1296ec5674': [
    '9cdd3a7c-1eeb-4660-b726-142cf9b5d607'
  ],
  LINEDRAW_AWS: [
    '25e5b561-135a-41c0-a427-29a2d9f7fc90'
  ],
  LINEDRAW_AZURE: [
    '710db560-6150-401b-8bbd-0d03f0972e92'
  ],
  LINEDRAW_ERD: [
    'cbfca214-3f91-43b0-90a7-60a460779c22'
  ],
  LINEDRAW_UMLCLASS: [
    '5f1f1d3c-1a15-4eec-b1a7-3abc2ca2dfd8'
  ],
  LINEDRAW_UML: [
    'b61155e9-b1fd-411d-99c7-688b7e64c51b'
  ],
  CONTAINER: [
    '13a207a6-0d65-4515-be3a-d3d782979063'
  ],
  GAUGE: [
    'fff24423-3c85-468a-b69e-552d96109218'
  ],
  GRAPH: [
    'a22d30cc-dd82-41c3-a1e6-28e968bed477'
  ],
  JIRA: [
    'b21c02ed-a7e0-4509-8719-777eb2c0adcb'
  ]
}

// ConstantData.DrawingObjectBaseClass = {
//   SHAPE: 0,
//   LINE: 1,
//   CONNECTOR: 3
// }

// Object.freeze(ConstantData.DrawingObjectBaseClass),
// ListManager.ShapeType = {
//   // RECT: 'ListManager.Rect',
//   // RRECT: 'ListManager.RRect',
//   // OVAL: 'ListManager.Oval',
//   // POLYGON: 'ListManager.Polygon',
//   // VECTORSYMBOL: 'ListManager.VectorSymbol',
//   // BITMAPSYMBOL: 'ListManager.BitmapSymbol',
//   // GROUPSYMBOL: 'ListManager.GroupSymbol',
//   // SVGFRAGMENTSYMBOL: 'ListManager.SVGFragmentSymbol',
//   // D3SYMBOL: 'ListManager.D3Symbol'

//   RECT: 'Rect',
//   RRECT: 'RRect',
//   OVAL: 'Oval',
//   POLYGON: 'Polygon',
//   VECTORSYMBOL: 'VectorSymbol',
//   BITMAPSYMBOL: 'BitmapSymbol',
//   GROUPSYMBOL: 'GroupSymbol',
//   SVGFRAGMENTSYMBOL: 'SVGFragmentSymbol',
//   D3SYMBOL: 'D3Symbol'
// }

// Object.freeze(ListManager.ShapeType),

// ListManager.ShapeClass = {
//   PLAIN: 1,
//   GROUPSYMBOL: 2,
//   SVGSYMBOL: 3,
//   SVGFRAGMENTSYMBOL: 4,
//   MISSINGEMF: 5
// }

// Object.freeze(ListManager.ShapeClass),
// ListManager.LineType = {
//   LINE: 1,
//   ARCLINE: 2,
//   SEGLINE: 3,
//   ARCSEGLINE: 4,
//   POLYLINE: 5,
//   PARABOLA: 6,
//   FREEHAND: 7,
//   NURBS: 501,
//   NURBSSEG: 502,
//   ELLIPSE: 503,
//   ELLIPSEEND: 504,
//   QUADBEZ: 505,
//   QUADBEZCON: 506,
//   CUBEBEZ: 507,
//   CUBEBEZCON: 508,
//   SPLINE: 509,
//   SPLINECON: 510,
//   MOVETO: 600,
//   MOVETO_NEWPOLY: 601
// }

// Object.freeze(ListManager.LineType),
ListManager.DrawShapeType = {
  RECT: 1,
  RRECT: 2,
  OVAL: 3,
  POLYGON: 4,
  LINE: 5,
  ARCLINE: 6
}

// Object.freeze(ListManager.DrawShapeType),
// ListManager.ActionTriggerType = {
//   TOPLEFT: 1,
//   TOPCENTER: 2,
//   TOPRIGHT: 3,
//   CENTERRIGHT: 4,
//   BOTTOMRIGHT: 5,
//   BOTTOMCENTER: 6,
//   BOTTOMLEFT: 7,
//   CENTERLEFT: 8,
//   ROTATE: 9,
//   MODIFYSHAPE: 10,
//   LINESTART: 11,
//   LINEEND: 12,
//   ATTACHPOINT: 13,
//   SEGL_ONE: 14,
//   SEGL_TWO: 15,
//   SEGL_THREE: 16,
//   POLYLNODE: 17,
//   POLYLADJ: 18,
//   POLYLEND: 19,
//   CONNECTOR_HOOK: 20,
//   CONNECTOR_PERP: 21,
//   CONNECTOR_ADJ: 22,
//   MOVEPOLYSEG: 23,
//   FLIP: 24,
//   TABLE_ROW: 25,
//   TABLE_COL: 26,
//   TABLE_SELECT: 27,
//   TABLE_EDIT: 28,
//   TABLE_ROWSELECT: 29,
//   TABLE_COLSELECT: 30,
//   LINELENGTH: 31,
//   SEGL_PRESERVE: 32,
//   LINE_THICKNESS: 33,
//   DIMENSION_LINE_ADJ: 34,
//   UPDATELINKS: 35,
//   CONTAINER_ADJ: 36
// }

// Object.freeze(ListManager.ActionTriggerType),

// ListManager.HitAreaType = {
//   CONNECTOR_COLLAPSE: 1,
//   CONNECTOR_EXPAND: 2,
//   EDITDIMENSIONTEXT: 3
// }

// Object.freeze(ListManager.HitAreaType),
// ListManager.ShapeIconType = {
//   HYPERLINK: 'HYPERLINK',
//   NOTES: 'NOTES',
//   ATTACHMENT: 'ATTACHMENT',
//   FIELDDATA: 'FIELDDATA',
//   EXPANDTABLE: 'EXPANDTABLE',
//   COLLAPSETABLE: 'COLLAPSETABLE',
//   TRELLOLINK: 'TRELLOLINK',
//   DATAACTION: 'DATAACTION',
//   EXPANDEDVIEW: 'EXPANDEDVIEW',
//   COMMENT: 'COMMENT'
// }

// Object.freeze(ListManager.ShapeIconType),
ListManager.SegmentedLineDirection = {
  TOP: 1,
  LEFT: 2,
  BOTTOM: 3,
  RIGHT: 4
}

// Object.freeze(ListManager.SegmentedLineDirection),
// ListManager.LineOrientation = {
//   NONE: 1,
//   HORIZONTAL: 2,
//   VERTICAL: 3,
//   DIAGONAL_TLRB: 4,
//   DIAGONAL_TRBL: 5
// }

// Object.freeze(ListManager.LineOrientation),
// ListManager.GrowBehavior = {
//   ALL: 0,
//   HCONSTRAIN: 1,
//   VCONSTRAIN: 2,
//   PROPORTIONAL: 3
// }

// Object.freeze(ListManager.GrowBehavior),
// ListManager.TextGrowBehavior = {
//   PROPORTIONAL: 0,
//   HORIZONTAL: 1,
//   VERTICAL: 2,
//   FSIZE: 3
// }

// Object.freeze(ListManager.TextGrowBehavior),
// ListManager.ContentType = {
//   NONE: 1,
//   TEXT: 2,
//   TABLE: 3,
//   GRAPH: 4
// }

// Object.freeze(ListManager.ContentType),

// ListManager.SVGElementClass = {
//   SHAPE: 1,
//   SLOP: 2,
//   HATCH: 3,
//   TEXT: 4,
//   TEXTBACKGROUND: 5,
//   DIMENSIONTEXT: 6,
//   DIMENSIONLINE: 7,
//   BACKGROUNDIMAGE: 8,
//   ICON: 9,
//   NOTETEXT: 10,
//   ACTIONARROW: 11,
//   DIMENSIONTEXTNOEDIT: 12,
//   AREADIMENSIONLINE: 13,
//   GRAPHLINE: 14,
//   GANTTGRIDHEADERLINE: 15,
//   GANTTGRIDHEADERTEXT: 16,
//   GANTTGRIDTITLELINE: 17,
//   GANTTGRIDTITLETEXT: 18,
//   GANTTGRIDHOTSPOT: 19,
//   GANTTGRIDCLIPPINGGROUP: 20
// }

// Object.freeze(ListManager.SVGElementClass),
// ListManager.ActionArrow = {
//   UP: 1,
//   LEFT: 2,
//   DOWN: 3,
//   RIGHT: 4,
//   SLOP: 5,
//   CUSTOM: 6,
//   ENTER: 7,
//   COMANAGER: 8,
//   ASSISTANT: 9,
//   ADDPARENTS: 10,
//   ADDDESCENDANTS: 11
// }

/*
// Object.freeze(ListManager.ActionArrow),
ListManager.EditState = {
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
  */

// Object.freeze(ListManager.EditState),
// ListManager.Geometry = {
//   PI: 3.14159265358979
// }

// Object.freeze(ListManager.Geometry),
ListManager.KeyCode = {
  A: 65,
  B: 66,
  C: 67,
  F: 70,
  V: 86,
  X: 88,
  Y: 89,
  Z: 90,
  DEL: 46,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40
}

// Object.freeze(ListManager.KeyCode),
ListManager.SocketActions = {
  SaveAllBlocks: 1,
  WriteManifest: 2,
  ClosePage: 3,
  AddDupPage: 4,
  AddNewPage: 5,
  AddDupPage_Init: 6,
  AddNewPage_Init: 7,
  CompleteAdd: 8,
  ChangePage: 9,
  CompleteChange: 10,
  RenamePage: 11,
  CompleteRename: 12,
  DeletePage: 12,
  CompleteDelete: 13,
  ReorderPages: 13,
  CompleteReorder: 14,
  RenamePage_NoSocket: 15,
  DeletePage_NoSocket: 16,
  Insert_Template: 17,
  Insert_Template_Init: 18,
  Insert_Document: 19,
  Insert_Document_Init: 20
}

// ListManager.ObjFlags = {
//   SEDO_Select: 1,
//   SEDO_Hide: 2,
//   SEDO_Erase: 4,
//   SEDO_EraseOnGrow: 8,
//   SEDO_Lock: 16,
//   SEDO_Spare: 32,
//   SEDO_ImageShape: 64,
//   SEDO_Bounds: 128,
//   SEDO_ImageOnly: 256,
//   SEDO_TextOnly: 512,
//   SEDO_NoPen: 1024,
//   SEDO_IsTarget: 2048,
//   SEDO_InList: 4096,
//   SEDO_Assoc: 8192,
//   SEDO_Obj1: 16384,
//   SEDO_ContConn: 32768,
//   SEDO_HUnGroup: 65536,
//   SEDO_UseConnect: 131072,
//   SEDO_DropOnBorder: 262144,
//   SEDO_DropOnTable: 524288,
//   SEDO_LineHop: 1048576,
//   SEDO_LineMod: 2097152,
//   SEDO_NoTableLink: 4194304,
//   SEDO_MetaObject: 8388608,
//   SEDO_NoLinking: 16777216,
//   SEDO_PrintTrans: 33554432,
//   SEDO_HasTransImage: 67108864,
//   SEDO_AllowDropImage: 134217728,
//   SEDO_NotVisible: 268435456,
//   SEDO_NoMaintainLink: 536870912,
//   SEDO_AllowMetaColor: 1073741824,
//   SEDO_HideThumbnail: 2147483648
// }

// Object.freeze(ListManager.ObjFlags),
// ListManager.ExtraFlags = {
//   SEDE_NoColor: 1,
//   SEDE_NoShadow: 2,
//   SEDE_NoTShadow: 4,
//   SEDE_FlipHoriz: 8,
//   SEDE_FlipVert: 16,
//   SEDE_NoRotate: 32,
//   SEDE_OldHookPt: 64,
//   SEDE_PermAssoc: 128,
//   SEDE_TableFit: 256,
//   SEDE_TableActive: 512,
//   SEDE_License: 1024,
//   SEDE_PhotoPH: 2048,
//   SEDE_ShareTable: 4096,
//   SEDE_ShareProp: 8192,
//   SEDE_AutoParent: 16384,
//   SEDE_AutoNumber: 32768,
//   SEDE_AutoChild: 65536,
//   SEDE_ShareScale: 131072,
//   SEDE_GroupHasScript: 262144,
//   SEDE_IsPhotoTitle: 524288,
//   SEDE_SideKnobs: 1048576,
//   SEDE_ConnToConn: 2097152,
//   SEDE_ConnToShapes: 4194304,
//   SEDE_NoDelete: 8388608,
//   SEDE_LinkVCenter: 16777216,
//   SEDE_MaintainLinkedObjOrientation: 16777216,
//   SEDE_ImageDup: 33554432,
//   SEDE_ComboSelect: 67108864,
//   SEDE_CollapseConn: 134217728,
//   SEDE_ExtraPolySegs: 268435456,
//   SEDE_DataUpdate: 536870912,
//   SEDE_NoDraw: 1073741824,
//   SEDE_DeleteOnUnhook: 2147483648
// }

// Object.freeze(ListManager.ExtraFlags),
// ListManager.ObjMoreFlags = {
//   SED_MF_VisioText: 1,
//   SED_MF_VisioPoly: 2,
//   SED_MF_VisioCallOut: 4,
//   SED_MF_VisioDefaultText: 8,
//   SED_MF_VisioLineTextLabel: 16,
//   SED_MF_VisioExportTable: 32,
//   SED_MF_FixedRR: 64,
//   SED_MF_Container: 128,
//   SED_MF_UseInfoNoteIcon: 256,
//   SED_MF_ContainerChild: 512,
//   SED_MF_AutoContainer: 1024,
//   SED_MF_Frame_AllowNesting: 2048,
//   SED_MF_Frame_Group: 4096
// }

// ListManager.TextFlags = {
//   SED_TF_BaseLine: 1,
//   SED_TF_FitToText: 2,
//   SED_TF_AttachB: 4,
//   SED_TF_AttachA: 8,
//   SED_TF_None: 16,
//   SED_TF_AttachC: 32,
//   SED_TF_Dimension: 64,
//   SED_TF_HorizText: 128,
//   SED_TF_AdjFSize: 256,
//   SED_TF_OneClick: 512,
//   SED_TF_OwnSize: 1024,
//   SED_TF_FormCR: 2048,
//   SED_TF_NoSpell: 4096,
//   SED_TF_Clickhere: 8192,
//   SED_TF_AttachD: 16384,
//   SED_TF_TitleBlock: 32768,
//   SED_TF_Attach: 16428
// }

/*
// Object.freeze(ListManager.TextFlags),
ListManager.SessionFlags = {
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
  SEDS_IsCloudOfflineEditConflict: 67108864,
  SEDS_IsCloudCheckoutConflict: 134217728,
  SEDS_IsCloudSharedReadOnly: 268435456,
  SEDS_IsCloudChangedTeams: 536870912,
  SEDS_NoStepFormatting: 1073741824,
  SEDS_NoPageBreakLines: 2147483648
}
*/

// Object.freeze(ListManager.SessionFlags),
// ListManager.SessionMoreFlags = {
//   SEDSM_FlowHorizOnly: 1,
//   SEDSM_ValueStream: 2,
//   SEDSM_FlowUseData: 4,
//   SEDSM_FlowCalcNVA: 8,
//   SEDSM_NoActionButton: 16,
//   SEDSM_ShowGrid: 32,
//   SEDSM_DrawToScale: 64,
//   SEDSM_Swimlane_Cols: 128,
//   SEDSM_Swimlane_Rows: 256,
//   SEDSM_KeepUnits: 512,
//   SEDSM_HideLayerTabs: 1024,
//   SEDSM_HideDataIcons: 2048,
//   SEDSM_NoCtrlArrow: 4096
// }

// ListManager.LinkFlags = {
//   SED_L_DELT: 1,
//   SED_L_DELL: 2,
//   SED_L_CHANGE: 4,
//   SED_L_BREAK: 8,
//   SED_L_MOVE: 16,
//   SED_L_WASMOVE: 32
// }

// Object.freeze(ListManager.LinkFlags),
// ListManager.HookFlags = {
//   SED_LC_Shape: 1,
//   SED_LC_Line: 2,
//   SED_LC_HOnly: 4,
//   SED_LC_VOnly: 8,
//   SED_LC_CHook: 16,
//   SED_LC_ArrayMod: 32,
//   SED_LC_NotOnPen: 64,
//   SED_LC_MoveTarget: 128,
//   SED_LC_AttachToLine: 256,
//   SED_LC_NoSnaps: 512,
//   SED_LC_ShapeOnLine: 1024,
//   SED_LC_FindPoint: 2048,
//   SED_LC_VirtualPoint: 4096,
//   SED_LC_AutoInsert: 8192,
//   SED_LC_ForceEnd: 16384,
//   SED_LC_HookIsArray: 32768,
//   SED_LC_HookInside: 65536,
//   SED_LC_HookNoExtra: 131072,
//   SED_LC_HookReverse: 262144,
//   SED_LC_NoContinuous: 524288,
//   SED_LC_TableRows: 1048576
// }

// Object.freeze(ListManager.HookFlags),
// ListManager.ListCodes = {
//   SED_LC_CIRCTARG: 1,
//   SED_LC_MOVETARG: 2,
//   SED_LC_MOVEHOOK: 3,
//   SED_LC_TARGONLY: 4,
//   SED_LC_CHILDRENONLY: 5,
//   SED_LC_TOPONLY: 6,
//   SED_LC_LINESONLY: 7,
//   SED_LC_MOVETARGANDLINES: 8
// }

// Object.freeze(ListManager.ListCodes),
// ListManager.FloatingPointDim = {
//   SD_FP_Left: 1,
//   SD_FP_Top: 2,
//   SD_FP_Right: 4,
//   SD_FP_Bottom: 8,
//   SD_FP_Width: 16,
//   SD_FP_Height: 32,
//   SD_FP_Pos: 15,
//   SD_FP_All: 63,
//   SD_FP_PreserveDim: 64
// }

// Object.freeze(ListManager.FloatingPointDim),
// ListManager.HookPts = {
//   SED_KTL: 1,
//   SED_KTR: 2,
//   SED_KBL: 3,
//   SED_KBR: 4,
//   SED_KTC: 5,
//   SED_KBC: 6,
//   SED_KLC: 7,
//   SED_KRC: 8,
//   SED_LL: 20,
//   SED_LR: 21,
//   SED_LT: 22,
//   SED_LB: 23,
//   SED_KCTL: 201,
//   SED_KCTR: 202,
//   SED_KCBL: 203,
//   SED_KCBR: 204,
//   SED_KCT: 205,
//   SED_KCB: 206,
//   SED_KCL: 207,
//   SED_KCR: 208,
//   SED_KCC: 209,
//   SED_KAT: 220,
//   SED_KATD: 221,
//   SED_AK: 300,
//   SED_AKCTL: 301,
//   SED_AKCT: 305,
//   SED_AKCB: 306,
//   SED_AKCL: 307,
//   SED_AKCR: 308,
//   SED_AKCC: 309,
//   SED_WTL: 321,
//   SED_WTR: 322,
//   SED_WBL: 323,
//   SED_WBR: 324,
//   SED_CustomBase: 500
// }

// Object.freeze(ListManager.HookPts),
ListManager.TargetPts = {
  T_TL: 0,
  T_TLC: 1,
  T_TC: 2,
  T_TRC: 3,
  T_TR: 4,
  T_RTC: 5,
  T_RC: 6,
  T_RBC: 7,
  T_BR: 8,
  T_BRC: 9,
  T_BC: 10,
  T_BLC: 11,
  T_BL: 12,
  T_LBC: 13,
  T_LC: 14,
  T_LTC: 15
}

/*
// Object.freeze(ListManager.TargetPts),
ConstantData.Defines = {
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
  DimensionLineColor: '#9999FF',
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
*/

ListManager.TrialTests = {
  NoWatermark: 575,
  NoPrint: 575
}

// ListManager.HitCodes = {
//   SED_Border: 40,
//   SED_Inside: 41,
//   SED_InsideE: 42,
//   SED_InsideT: 43,
//   SED_PLApp: 73,
//   SED_InContainer: 101
// }

// Object.freeze(ListManager.HitCodes),
ListManager.ArrowHeadTypes = {
  ARR_NONE: 0,
  ARR_FILL: 1,
  ARR_PLAIN: 2,
  ARR_FANCY: 3,
  ARR_FCIRC: 4,
  ARR_ECIRC: 5,
  ARR_FSQU: 6,
  ARR_ESQU: 7,
  ARR_CROW: 8,
  ARR_SLASH: 9,
  ARR_FCROW: 10,
  ARR_DIAM: 11,
  ARR_ZEROTOMANY: 12,
  ARR_ONETOMANY: 13,
  ARR_ZEROTOONE: 14,
  ARR_ONETOONE: 15,
  ARR_ONETOZERO: 16,
  ARR_C_FILL: 17,
  ARR_C_PLAIN: 18,
  ARR_C_FANCY: 19,
  ARR_DOUBLE: 20,
  ARR_DIM_FILL: 21,
  ARR_DIM_PLAIN: 22,
  ARR_DIM_LINE: 23,
  ARR_META: 24,
  ARR_ARC_DOWN: 25,
  ARR_ARC_UP: 26,
  ARR_HALF_UP: 27,
  ARR_HALF_DOWN: 28,
  ARR_C_CROSS: 29,
  ARR_HLINE_UP: 30,
  ARR_HLINE_DOWN: 31,
  ARR_OSLASH: 32,
  ARR_OFILL: 33,
  ARR_OFCROW: 34,
  ARR_ODIAM: 35,
  ARR_ONECROSS: 36,
  ARR_IND_DOWN: 37,
  ARR_IND_UP: 38,
  ARR_ROUND_END: 39,
  ARR_UML_OPEN: 40,
  ARR_UML_CLOSED: 41,
  ARR_UML_CONNECTED: 42,
  ARR_C_UML_CONNECTED: 43
}

ListManager.DateCodes = {
  SDUSDATE: 0,
  SDEURODATE: 1
}

// Object.freeze(ListManager.DateCodes),
ListManager.ClockTypes = {
  SDAUTOTIME: 0,
  SD12HOURTIME: 1,
  SD24HOURTIME: 2
}

// Object.freeze(ListManager.ClockTypes),
ListManager.ImportTypes = {
  File: 0,
  Image: 1,
  SDON: 2,
  Gliffy: 3,
  Text: 4,
  Data: 5,
  CSV: 6,
  Stickynotes: 7
}

// Object.freeze(ListManager.DateCodes),
// ListManager.Guide_DistanceTypes = {
//   Room: 1,
//   Horizontal_Wall: 2,
//   Vertical_Wall: 3,
//   PolyWall: 4
// }

ListManager.WFlags = {
  W_Stf: 1,
  W_Page: 2
}

// Object.freeze(ListManager.WFlags),
// ListManager.SegLDir = {
//   SED_KTC: 5,
//   SED_KBC: 6,
//   SED_KLC: 7,
//   SED_KRC: 8
// }

// Object.freeze(ListManager.SegLDir),
ListManager.FreehandLineTypes = {
  Pen: 1,
  Highlighter: 2
}

// Object.freeze(ListManager.FreehandLineTypes),
// ListManager.ArcQuad = {
//   SD_PLA_TL: 0,
//   SD_PLA_BL: 1,
//   SD_PLA_BR: 2,
//   SD_PLA_TR: 3
// }

// Object.freeze(ListManager.ArcQuad),
// ListManager.PolySegFlags = {
//   SD_PLS_Select: 1,
//   SD_PLS_Hide: 2,
//   SD_PLS_Temp: 4,
//   SD_PLS_TempSave: 8,
//   SD_PLS_VA: 16,
//   SD_PLS_NVA: 32,
//   SD_PLS_NoLine: 64,
//   SD_PLS_NoFill: 128
// }

// Object.freeze(ListManager.PolySegFlags),
// ListManager.PolyListFlags = {
//   SD_PLF_FreeHand: 1,
//   SD_PLF_OneStep: 2,
//   SD_PLF_NoMiddleControlPoints: 4,
//   SD_PLF_TimelineControlPoint: 8,
//   SD_PLF_NoControl: 16,
//   SD_PLF_WasExplict: 32,
//   SD_PLF_HasMoveTo: 64,
//   SD_PLF_HasPolyPoly: 128
// }

// Object.freeze(ListManager.PolyListFlags),
// ListManager.ObjectTypes = {
//   SD_OBJT_NONE: 0,
//   SD_OBJT_PICTCONTAINER: 1,
//   SD_OBJT_FRAME: 2,
//   SD_OBJT_CABINETWALL: 3,
//   SD_OBJT_CABINETFINISH: 4,
//   SD_OBJT_BACKGROUND: 5,
//   SD_OBJT_MINDMAP_MAIN: 6,
//   SD_OBJT_MINDMAP_IDEA: 7,
//   SD_OBJT_MINDMAP_CONNECTOR: 8,
//   SD_OBJT_CAUSEEFFECT_MAIN: 9,
//   SD_OBJT_GANTT_BAR: 10,
//   SD_OBJT_SWIMLANE_ROWS: 11,
//   SD_OBJT_SWIMLANE_COLS: 12,
//   SD_OBJT_TIMELINE_EVENT: 13,
//   SD_OBJT_GANTT_CONNECTOR: 14,
//   SD_OBJT_STORYB_CONNECTOR: 15,
//   SD_OBJT_FLOORPLAN_WALL: 16,
//   SD_OBJT_GANTT_CHART: 17,
//   SD_OBJT_TIMELINE: 18,
//   SD_OBJT_2012GROUP: 19,
//   SD_OBJT_KANBAN_CARD: 20,
//   SD_OBJT_VALUESTREAM_TIMELINE: 21,
//   SD_OBJT_VALUESTREAM_SYMBOL: 22,
//   SD_OBJT_VALUESTREAM_TAKT: 23,
//   SD_OBJT_DECISIONTREE_CONNECTOR: 24,
//   SD_OBJT_PEDIGREE_CONNECTOR: 25,
//   SD_OBJT_CAUSEEFFECT_BRANCH: 26,
//   SD_OBJT_GENOGRAM_BRANCH: 27,
//   SD_OBJT_STEPCHARTH_BRANCH: 28,
//   SD_OBJT_STEPCHARTV_BRANCH: 29,
//   SD_OBJT_BAD_STEPCHART_BRANCH: 30,
//   SD_OBJT_DESCENDANT_CONNECTOR: 31,
//   SD_OBJT_ANNOTATION: 32,
//   SD_OBJT_UIELEMENT: 33,
//   SD_OBJT_NG_TIMELINE: 34,
//   SD_OBJT_NG_EVENT: 35,
//   SD_OBJT_NG_EVENT_LABEL: 36,
//   SD_OBJT_D3SYMBOL: 37,
//   SD_OBJT_MANUAL_EVENT_LABEL: 38,
//   SD_OBJT_MULTIPLICITY: 39,
//   SD_OBJT_BPMN_EVENT_START: 40,
//   SD_OBJT_BPMN_EVENT_INTERMEDIATE: 41,
//   SD_OBJT_BPMN_EVENT_END: 42,
//   SD_OBJT_BPMN_EVENT_START_NI: 43,
//   SD_OBJT_BPMN_EVENT_INTERMEDIATE_NI: 44,
//   SD_OBJT_BPMN_EVENT_INTERMEDIATE_THROW: 45,
//   SD_OBJT_BPMN_ACTIVITY: 50,
//   SD_OBJT_BPMN_GATEWAY: 51,
//   SD_OBJT_BPMN_DATAOBJECT: 52,
//   SD_OBJT_BPMN_CHOREOGRAPHY: 53,
//   SD_OBJT_BPMN_POOL: 54,
//   SD_OBJT_SHAPECONTAINER: 55,
//   SD_OBJT_TABLE_WITH_SHAPECONTAINER: 56,
//   SD_OBJT_BUSLOGIC_TABLE: 57,
//   SD_OBJT_BUSLOGIC_TABLEROW: 58,
//   SD_OBJT_BUSLOGIC_LINEDRAW: 59,
//   SD_OBJT_SWIMLANE_GRID: 60,
//   SD_OBJT_JIRA_ISSUES_CONTAINER_ISSUE: 61,
//   SD_OBJT_JIRA_BLOCKINGISSUE: 62,
//   SD_OBJT_JIRA_EPICDEPENDENCY: 63,
//   SD_OBJT_JIRA_PRODUCTROADMAP: 64,
//   SD_OBJT_JIRA_PIBOARD: 65,
//   SD_OBJT_FRAME_CONTAINER: 75,
//   SD_OBJT_BUSLOGIC_AWS: 76,
//   SD_OBJT_BUSLOGIC_AZURE: 77,
//   SD_OBJT_AZUREDEVOPS_ITEM_CARD: 78,
//   SD_OBJT_EXTRATEXTLABEL: 80
// }

// Object.freeze(ListManager.ObjectTypes),
// ListManager.ObjectSubTypes = {
//   SD_SUBT_NONE: 0,
//   SD_SUBT_TASKMAP: 1,
//   SD_SUBT_MEETINGMAP: 2,
//   SD_SUBT_HUBMAP: 3,
//   SD_SUBT_MEETINGPERSON: 4,
//   SD_SUBT_MEETINGTASK: 5,
//   SD_SUBT_TASK: 6,
//   SD_SUBT_HUBNODE: 7,
//   SD_SUBT_KANBAN_TABLE: 8,
//   SD_SUBT_CUBICLE: 9,
//   SD_SUBT_VS_NVA: 10,
//   SD_SUBT_VS_INV: 11,
//   SD_SUBT_VS_SYMONLY: 12,
//   SD_SUBT_UI_VRADIO: 13,
//   SD_SUBT_UI_HRADIO: 14,
//   SD_SUBT_UI_VCHECKBOX: 15,
//   SD_SUBT_UI_HCHECKBOX: 16,
//   SD_SUBT_UI_ACCORDION: 17,
//   SD_SUBT_UI_VTABBED: 18,
//   SD_SUBT_UI_HTABBED: 19,
//   SD_SUBT_UI_MENU: 20,
//   SD_SUBT_UI_VLIST: 21,
//   SD_SUBT_UI_HLIST: 22,
//   SD_SUBT_UI_RMENU: 23,
//   SD_SUBT_UI_MMENU: 24,
//   SD_SUBT_NGEVENT_STRAIGHT: 24,
//   SD_SUBT_NGEVENT_VERTICAL: 25,
//   SD_SUBT_NGEVENT_TEXTONLY: 26,
//   SD_SUBT_NGEVENT_BULLET: 27,
//   SD_SUBT_NGEVENT_BAR: 28,
//   SD_SUBT_NGEVENT_BLOCK: 29,
//   SD_SUBT_NGEVENT_SWIMLANE: 30,
//   SD_SUBT_BPMN_EVENT_MESSAGE: 31,
//   SD_SUBT_BPMN_EVENT_TIMER: 32,
//   SD_SUBT_BPMN_EVENT_ERROR: 33,
//   SD_SUBT_BPMN_EVENT_ESCALATION: 34,
//   SD_SUBT_BPMN_EVENT_CANCEL: 35,
//   SD_SUBT_BPMN_EVENT_COMPENSATION: 36,
//   SD_SUBT_BPMN_EVENT_CONDITIONAL: 37,
//   SD_SUBT_BPMN_EVENT_LINK: 38,
//   SD_SUBT_BPMN_EVENT_SIGNAL: 39,
//   SD_SUBT_BPMN_EVENT_TERMINATE: 40,
//   SD_SUBT_BPMN_EVENT_MULTIPLE: 41,
//   SD_SUBT_BPMN_EVENT_PARALLEL: 42,
//   SD_SUBT_BPMN_ACTIVITY_TASK: 50,
//   SD_SUBT_BPMN_ACTIVITY_SUBROUTINE: 51,
//   SD_SUBT_BPMN_ACTIVITY_TRANSACTION: 52,
//   SD_SUBT_BPMN_ACTIVITY_CALL: 53,
//   SD_SUBT_BPMN_GATEWAY_EXCLUSIVE: 60,
//   SD_SUBT_BPMN_GATEWAY_EVENT: 61,
//   SD_SUBT_BPMN_GATEWAY_EXCLUSIVE_EVENT: 62,
//   SD_SUBT_BPMN_GATEWAY_PARALLEL_EVENT: 63,
//   SD_SUBT_BPMN_GATEWAY_INCLUSIVE: 64,
//   SD_SUBT_BPMN_GATEWAY_PARALLEL: 65,
//   SD_SUBT_BPMN_GATEWAY_COMPLEX: 66,
//   SD_SUBT_BPMN_LINE: 70,
//   SD_SUBT_ERD_LINE: 71,
//   SD_SUBT_UML_LINE: 72,
//   SD_SUBT_UMLCLASS_LINE: 73,
//   SD_SUBT_UMLCOMPONENT_LINE: 74,
//   SD_SUBT_LINEDRAW_SWIMLANE: 75,
//   SD_SUBT_MULTIPLICITY_FLIPPED: 80
// }

// Object.freeze(ListManager.ObjectSubTypes),
// ListManager.HopStyle = {
//   SDH_Box: 0,
//   SDH_Arc: 1
// }

// Object.freeze(ListManager.HopStyle),
// ListManager.HopDimX = [
//   6,
//   8,
//   10
// ]

// ListManager.HopDimY = [
//   4,
//   5,
//   6
// ]

// ListManager.ImageScales = {
//   SDIMAGE_ALWAYS_FIT: 0,
//   SDIMAGE_CROP_TO_FIT: 1,
//   SDIMAGE_PROP_FIT: 2
// }

// Object.freeze(ListManager.ImageScales),
ListManager.TextureAlign = {
  SDTX_TOPLEFT: 1,
  SDTX_TOPCENTER: 2,
  SDTX_TOPRIGHT: 3,
  SDTX_CENLEFT: 4,
  SDTX_CENTER: 5,
  SDTX_CENRIGHT: 6,
  SDTX_BOTLEFT: 7,
  SDTX_BOTCENTER: 8,
  SDTX_BOTRIGHT: 9
}

// Object.freeze(ListManager.TextureAlign),
// ListManager.TextAlign = {
//   LEFT: 'left',
//   CENTER: 'center',
//   RIGHT: 'right',
//   TOPLEFT: 'top-left',
//   TOPCENTER: 'top-center',
//   TOPRIGHT: 'top-right',
//   BOTTOMLEFT: 'bottom-left',
//   BOTTOMCENTER: 'bottom-center',
//   BOTTOMRIGHT: 'bottom-right'
// }

// Object.freeze(ListManager.TextAlign),
// ListManager.TextFace = {
//   Bold: 1,
//   Italic: 2,
//   Underline: 4,
//   Superscript: 16,
//   Subscript: 32
// }

// Object.freeze(ListManager.TextFace),


// ListManager.ClipboardType = {
//   None: 0,
//   Text: 1,
//   LM: 2,
//   Table: 3,
//   Image: 4
// }

/*
// Object.freeze(ListManager.ClipboardType),
ListManager.TELastOp = {
  INIT: - 1,
  CHAR: 0,
  BS: 1,
  DEL: 2,
  STYLE: 3,
  CUT: 4,
  COPY: 5,
  PASTE: 6,
  SELECT: 7,
  TIMEOUT: 8
}
*/

// Object.freeze(ListManager.TELastOp),
ListManager.ConnectorDir = {
  ORG_HORIZONTAL: 0,
  ORG_VERTICALDOWN: 1,
  ORG_VERTICALUP: 2,
  ORG_HORIZONTALRIGHT: 3
}

// Object.freeze(ListManager.ConnectorDir),
ListManager.ModalOperations = {
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

// Object.freeze(ListManager.ModalOperations),
ListManager.FormatPainterModes = {
  NONE: 0,
  OBJECT: 1,
  TEXT: 2,
  TABLE: 3
}

// Object.freeze(ListManager.FormatPainterModes),
// ListManager.DimensionFlags = {
//   SED_DF_EndPts: 1,
//   SED_DF_AllSeg: 2,
//   SED_DF_Total: 4,
//   SED_DF_Select: 8,
//   SED_DF_Always: 16,
//   SED_DF_Area: 32,
//   SED_DF_AreaSel: 64,
//   SED_DF_Standoff: 128,
//   SED_DF_Exterior: 256,
//   SED_DF_ShowFractionalInches: 512,
//   SED_DF_RectWithAndHeight: 1024,
//   SED_DF_ShowLineAngles: 2048,
//   SED_DF_InteriorAngles: 4096,
//   SED_DF_HideHookedObjDimensions: 8192,
//   SED_DF_ShowFeetAsInches: 16384
// }

// Object.freeze(ListManager.DimensionFlags),
ListManager.LibraryFlags = {
  SEDL_NoColor: 1,
  SEDL_Auto: 2,
  SEDL_NoSize: 4,
  SEDL_Scale: 8,
  SEDL_NoAttach: 16,
  SEDL_JPG: 32,
  SEDL_PNG: 64,
  SEDL_DropOnBorder: 128,
  SEDL_DropOnTable: 256,
  SEDL_Virtual: 512,
  SEDL_Bad: 1024,
  SEDL_NoLinking: 2048,
  SEDL_Planning: 4096,
  SEDL_NoTarget: 8192
}

// Object.freeze(ListManager.LibraryFlags),
ListManager.LibraryUseFlags = {
  SDLE_UseShowDimensions: 1,
  SDLE_UseLayer: 2,
  SDLE_UseText: 4,
  SDLE_AddNameAsLabel: 8
}

// Object.freeze(ListManager.LibraryUseFlags),
// ListManager.GraphType = {
//   SDGRAPH_TYPE_UNSET: - 1,
//   SDGRAPH_TYPE_BAR: 0,
//   SDGRAPH_TYPE_STACKEDBAR: 1,
//   SDGRAPH_TYPE_LINE: 2,
//   SDGRAPH_TYPE_PIE: 3,
//   SDGRAPH_TYPE_LINEARPIE: 4,
//   SDGRAPH_TYPE_STACKEDLINE: 5
// }

// Object.freeze(ListManager.GraphType),
// ListManager.GraphFlags = {
//   SDAX_SEQUENCE_BY_POINTS: 1,
//   SDAX_SEQUENCE_BY_SERIES: 2,
//   SDAX_SEQUENCE_BY_CATEGORY: 4,
//   SDAX_SEQUENCE_BY_POINTS_BY_SERIES: 8,
//   SDAX_3D: 16,
//   SDAX_FLAG_DATA_MODIFIED: 32,
//   SDAX_AVAILABLE: 64,
//   SDAX_SHOW_TABLE: 128,
//   SDAX_FLIP_ROW_COL_ORIENTATION: 256,
//   SDAX_REDIRECT_EDIT_SERIES_NAME: 2048,
//   SDAX_DATATABLE_USER_MANAGED_GEOMETRY: 4096,
//   SDAX_BG_IMAGEFILL: 8192,
//   SDAX_AREABG_IMAGEFILL: 16384,
//   SDAX_SHOW_STACKED_SCALE: 32768
// }

// Object.freeze(ListManager.GraphFlags),
// ListManager.AxisFlags = {
//   SDAX_START_AT_LOWER_BOUND: 1,
//   SDAX_HIDE_MAJOR_TICKS: 2,
//   SDAX_HIDE_MINOR_TICKS: 4,
//   SDAX_MAJOR_TICK_IF_LABEL: 8,
//   SDAX_LABELS_ANGLED: 16,
//   SDAX_SHOW_GRID_LINE_MAJOR: 32,
//   SDAX_HIDE_AXIS_LINE: 64,
//   SDAX_HIDE_LABELS: 128,
//   SDAX_HIDE_TITLE: 256,
//   SDAX_SHOW_GRID_LINE_MINOR: 512,
//   SDAX_SHOW_SUMMARY_LABELS: 1024
// }

// Object.freeze(ListManager.AxisFlags),
// ListManager.LegendType = {
//   SDAX_LEGEND_FULL: 0,
//   SDAX_LEGEND_NONE: 1,
//   SDAX_LEGEND_NAMES: 2,
//   SDAX_LEGEND_SWATCHES: 3
// }

// Object.freeze(ListManager.LegendType),
ListManager.GradientStyle = {
  GRAD_MIDDLE: 1,
  GRAD_HORIZ: 4,
  GRAD_VERT: 2,
  GRAD_TLBR: 8,
  GRAD_TRBL: 16,
  GRAD_REV: 32,
  GRAD_SHAPE: 64,
  GRAD_RADIAL: 128
}

// Object.freeze(ListManager.GradientStyle),
// ConstantData.LayerFlags = {
//   SDLF_Visible: 1,
//   SDLF_Active: 2,
//   SDLF_NoAdd: 4,
//   SDLF_AllowCellEdit: 8,
//   SDLF_UseEdges: 16
// }

// Object.freeze(ConstantData.LayerFlags),
// ConstantData.LayerTypes = {
//   SD_LAYERT_NONE: 0,
//   SD_LAYERT_MINDMAP: 1,
//   SD_LAYERT_GANTT: 2,
//   SD_LAYERT_PERT: 3,
//   SD_LAYERT_WEBPAGE: 4,
//   SD_LAYERT_TIMELINE: 5,
//   SD_LAYERT_MEETING: 6,
//   SD_LAYERT_BACKGROUND: 7
// }

/*
// Object.freeze(ConstantData.LayerTypes),
ConstantData.ContentHeaderFlags = {
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
  */

// Object.freeze(ConstantData.ContentHeaderFlags),
ListManager.ShapeCenteringOptions = {
  SD_SHAPE_CENTER_LEFT_ALIGN: 1,
  SD_SHAPE_CENTER_RIGHT_ALIGN: 2,
  SD_SHAPE_CENTER_TOP_ALIGN: 3,
  SD_SHAPE_CENTER_BOTTOM_ALIGN: 4
}

ListManager.DataOpsFieldTypes = {
  SD_DATA_FT_TEXT: 0,
  SD_DATA_FT_DATE: 1,
  SD_DATA_FT_TIME: 2,
  SD_DATA_FT_PC: 3,
  SD_DATA_FT_FP: 4,
  SD_DATA_FT_INT: 5,
  SD_DATA_FT_FPG: 6
}

ListManager.TaskManagementFlags = {
  TASKMGT_ASSIGNONLY: 1,
  TASKMGT_SHOW_DATES: 2,
  TASKMGT_KANBANONLY: 4
}

ListManager.GanttTaskModes = {
  TASK_MODE_START: 0,
  TASK_MODE_END: 1,
  TASK_MODE_BOTH: 2
}

ListManager.GanttTaskFields = {
  ROW_FIELD: 0,
  PARENT_FIELD: 1,
  INDEX_FIELD: 2,
  TASK_FIELD: 3,
  TASK_START: 4,
  TASK_END: 5,
  TASK_LENGTH: 6,
  TASK_RESOURCE: 7,
  TASK_SIDE: 8,
  TASK_MASTER: 9,
  TASK_HIDE: 10,
  TASK_PC: 11,
  TASK_DEPT: 12,
  TASK_COST: 13,
  TASK_CUSTOM: 14,
  TASK_GUID: 15,
  TASK_PERSONID: 16,
  TASK_PERSONGUID: 17,
  TASK_ICON: 18,
  TASK_STYLE: 19,
  TASK_NOTES: 20,
  TASK_CHILDURL: 21,
  TASK_NOTESID: 22,
  TASK_TRELLO_CARD_ID: 23,
  TASK_TRELLO_CARD_URL: 24
}

ListManager.NGTimelineFields = {
  BLOCKID: 0,
  START: 1,
  LENGTH: 2,
  UNITS: 3,
  AUTO: 4,
  DEF_POSITION: 5,
  DEF_EVENT: 6,
  EVENT_TABLEID: 7,
  EVENT_START: 8,
  EVENT_END: 9,
  STARTTIME: 10,
  COLWIDTH: 11,
  ALTERNATECOLUMNS: 12,
  ROWPROPERTIES: 13,
  DEFAULTSHAPE: 14
}

ListManager.NGTimelineEventFields = {
  START: 0,
  STARTSECS: 1,
  LENGTH: 2,
  POSITION: 3,
  BLOCKID: 4
}

ListManager.JiraFields = {
  PARAMS: 0
}

ListManager.DocumentTableFields = {
  DOC_TYPE: 0,
  DOC_NAME: 1,
  DOC_GUID: 2,
  DOC_VERSION: 3,
  DOC_TIMESTAMP: 4,
  DOC_TEAMGUID: 5,
  DOC_TEAMID: 6,
  DOC_LIBGUID: 7,
  DOC_SUBTYPE: 8
}

ListManager.HubTableFields = {
  INDEX_FIELD: 0,
  ROW_FIELD: 1,
  PARENT_FIELD: 2
}

ListManager.ImportTableFields = {
  PARAMS_FIELD: 0
}

ListManager.PersonTableFields = {
  TM_P_NAME: 0,
  TM_P_GUID: 1,
  TM_P_EMAIL: 2,
  TM_P_STATUS: 3,
  TM_P_LOCALGUID: 4,
  TM_P_LOCALFLAGS: 5
}

ListManager.PersonTableFlags = {
  SF_LF_SOURCE_SDR: 1,
  SF_LF_SOURCE_TEAMDATA: 2,
  SF_LF_SOURCE_SERVER: 4,
  SF_LF_ASSIGNMENT_MADE: 8,
  SF_LF_FROM_TRELLO: 16
}

ListManager.DataRelationships = {
  PARENT_RELATIONSHIP: 'PARENTCHILD',
  DEPENDENT_RELATIONSHIP: 'MASTERSLAVE',
  FOLDER_RELATIONSHIP: 'FOLDERFILE',
  TEAMLIB_RELATIONSHIP: 'TEAMFOLDER',
  MEETING_RELATIONSHIP: 'MEETINGPARENTCHILD',
  FLOW_PARENT_RELATIONSHIP: 'FLOWPARENTCHILD'
}

ListManager.TimeScale = {
  SDG_YR: 2,
  SDG_YR_WITH_QTR: 3,
  SDG_YR_WITH_MONTHS: 11,
  SDG_QTR_WITH_MONTHS: 7,
  SDG_MONTH_WITH_DAYS: 1,
  SDG_WEEK_WITH_DAYS: 4,
  SDG_WEEK_DAY_DATE: 5,
  SDG_DAY_WITH_HOURS: 17,
  SDG_FIT_TO_WINDOW: 99
}

ListManager.DataSetNameListIndexes = {
  DATASET_GOOGLEMAPS: 0,
  DATASET_PLANNING: 1,
  DATASET_GRAPH: 2,
  DATASET_WEBSITEMAP: 3,
  DATASET_LDAP: 4,
  DATASET_DOCUMENT: 5,
  DATASET_VPM: 6,
  DATASET_SHAREDFILES: 7,
  DATASET_HUB: 8,
  DATASET_TEAMDATA: 9,
  DATASET_FLOWCHART: 10,
  DATASET_FIELDEDDATA: 11,
  DATASET_NG_TIMELINE: 12,
  DATASET_IMPORT: 13
}

ListManager.DataSetNameList = [
  'GOOGLEMAPS',
  'PLANNING',
  'GRAPHS',
  'WEBSITEMAP',
  'LDAP',
  'DOCUMENT',
  'VPM',
  'SHAREDFILES',
  'HUB',
  'TEAMDATA',
  'FLOWCHART',
  'FIELDEDDATA',
  'NG_TIMELINE',
  'IMPORT'
]

ListManager.GanttFieldNameList = [
  'ROW',
  'PARENT',
  'INDEX',
  'TASK',
  'START',
  'END',
  'LENGTH',
  'RESOURCE',
  'MINDMAPSIDE',
  'MASTER',
  'HIDE',
  'PERCENTCOMPLETE',
  'DEPARTMENT',
  'COST',
  'CUSTOM',
  'GUID',
  'PERSONID',
  'PERSONGUID',
  'ICON',
  'STYLEOVERRIDES',
  'NOTES',
  'CHILDURL',
  'NOTESID',
  'TRELLOCARDID',
  'TRELLOCARDURL'
]

ListManager.TimelineFieldNameList = [
  'BLOCKID',
  'START',
  'LENGTH',
  'UNITS',
  'AUTO',
  'DEF_POSITION',
  'DEF_EVENT',
  'EVENT_TABLEID',
  'EVENT_START',
  'EVENT_END',
  'STARTTIME',
  'COLWIDTH',
  'ALTERNATECOLUMNS',
  'ROWPROPERTIES',
  'DEFAULTSHAPE'
]

ListManager.JiraReportFieldNameList = [
  'Params'
]

ListManager.TimelineEventFieldNameList = [
  'START',
  'STARTSECS',
  'LENGTH',
  'POSITION',
  'BLOCKID'
]

ListManager.DocumentFieldNameList = [
  'DOCTYPE',
  'DOCNAME',
  'DOCGUID',
  'DOCVERSION',
  'DOCTIMESTAMP',
  'TEAMGUID',
  'TEAMID',
  'DOCLIBGUID',
  'DOCSUBTYPE'
]

ListManager.HubFieldNameList = [
  'INDEX',
  'ROW',
  'PARENT',
  'LABEL',
  'SIDE',
  'HIDE',
  'RECORDTYPE',
  'LINKURL',
  'ICON',
  'STYLE',
  'NOTES',
  'NOTESID'
]

ListManager.PersonFieldNameList = [
  'NAME',
  'GUID',
  'EMAIL',
  'STATUS',
  'LOCALGUID',
  'LOCALFLAGS'
]

ListManager.ImportFieldNameList = [
  'PARAMS'
]

ListManager.TimeAmounts = {
  OneDay: 86400,
  OneDayNS: 864000000000,
  OneHourNS: 36000000000,
  OneWeekNS: 6048000000000,
  OneSecondNS: 10000000,
  OneMinNS: 600000000,
  OneDayMS: 86400000
}

ListManager.TimelineUnits = {
  HundredYear: 100,
  FiftyYear: 50,
  TenYear: 10,
  FiveYear: 5,
  TwoYear: 2,
  Year: 365,
  Quarter: 92,
  Month: 31,
  Week: 7,
  Day: 1,
  TwelveHour: - 12,
  SixHour: - 6,
  FourHour: - 4,
  TwoHour: - 2,
  Hour: - 1
}

ListManager.MonthStrings = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER'
]

ListManager.MonthAbrStrings = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
]

ListManager.QuarterStrings = [
  'Q1',
  'Q2',
  'Q3',
  'Q4'
]

ListManager.OrgChartOrientations = {
  SD_ORG_HORIZONTAL: 0,
  SD_ORG_VERTICALDOWN: 1,
  SD_ORG_VERTICALUP: 2,
  SD_ORG_HORIZONTALRIGHT: 3
}

// ListManager.LineAngleDimensionDefs = {
//   ANGLEDIMENSION_ARROWHEAD_SIZE: 10,
//   ANGLEDIMENSION_ARROWHEAD_WIDTH: 4,
//   ANGLEDIMENSION_PREFERRED_ARROWSTEM_MINIMUM: 4,
//   ANGLEDIMENSION_PREFERRED_BISECTOR_LEN: 75
// }

// ListManager.PolygonShapeGenerator = {
//   SED_S_Pgm: function (e, t) {
//     return (t /= e.width) > 1 &&
//       (t = 1),
//       [
//         {
//           x: t,
//           y: 0
//         },
//         {
//           x: 1,
//           y: 0
//         },
//         {
//           x: 1 - t,
//           y: 1
//         },
//         {
//           x: 0,
//           y: 1
//         },
//         {
//           x: t,
//           y: 0
//         }
//       ]
//   },
//   SED_S_Diam: function (e, t) {
//     return [{
//       x: 0.5,
//       y: 0
//     },
//     {
//       x: 1,
//       y: 0.5
//     },
//     {
//       x: 0.5,
//       y: 1
//     },
//     {
//       x: 0,
//       y: 0.5
//     },
//     {
//       x: 0.5,
//       y: 0
//     }
//     ]
//   },
//   SED_S_Doc: function (e, t) {
//     var a = [],
//       r = e.width,
//       i = e.height,
//       n = t;
//     n -= 0,
//       a.push({
//         x: 0,
//         y: (i - n) / i
//       }),
//       a.push({
//         x: 0,
//         y: (i - n) / i
//       }),
//       a.length = 85,
//       a[84] = {
//         x: 0,
//         y: (i - n) / i
//       },
//       a[1] = {
//         x: 0,
//         y: 0
//       },
//       a[2] = {
//         x: 1,
//         y: 0
//       },
//       a[3] = {
//         x: 1,
//         y: (i - n - 0) / i
//       };
//     for (var o, s, l, S = r / 4, c = n, u = 2 * S / 40, p = 1; p <= 40; p++) o = r - (l = u * p),
//       l = (S - l) / S,
//       s = i - n - 0 - Math.sqrt(1 - l * l) * c,
//       a[p + 3] = {
//         x: o / r,
//         y: s / i
//       };
//     for (u = 2 * S / 40, p = 1; p <= 40; p++) o = r - ((l = u * p) + 2 * S),
//       l = (S - l) / S,
//       s = i - n + Math.sqrt(1 - l * l) * c,
//       a[p + 43] = {
//         x: o / r,
//         y: s / i
//       };
//     return a
//   },
//   SED_S_Term: function (e, t) {
//     var a,
//       r,
//       i = [],
//       n = e.width,
//       o = e.height;
//     return (a = Math.floor(o / 2)) > n / 2 &&
//       (a = Math.floor(n / 2)),
//       r = {
//         left: 0,
//         top: 0,
//         right: a,
//         bottom: 2 * a
//       },
//       i = Utils.PolyYCurve(i, r, 40, 0, 0, 0, a, !0, n, o),
//       r = {
//         left: 0,
//         top: o - 2 * a,
//         right: a,
//         bottom: o
//       },
//       i = Utils.PolyYCurve(i, r, 40, 0, 0, a, 0, !0, n, o),
//       r = {
//         left: n - a,
//         top: o,
//         right: n,
//         bottom: o - 2 * a
//       },
//       i = Utils.PolyYCurve(i, r, 40, 0, 0, 0, - a, !1, n, o),
//       r = {
//         left: n - a,
//         top: 2 * a,
//         right: n,
//         bottom: 0
//       },
//       (i = Utils.PolyYCurve(i, r, 40, 0, 0, - a, 0, !1, n, o)).push(new Point(i[0].x, i[0].y)),
//       i
//   },
//   SED_S_ArrR: function (e, t) {
//     return (t /= e.width) > 1 &&
//       (t = 1),
//       [
//         {
//           x: 0,
//           y: 0.15
//         },
//         {
//           x: 1 - t,
//           y: 0.15
//         },
//         {
//           x: 1 - t,
//           y: 0
//         },
//         {
//           x: 1,
//           y: 0.5
//         },
//         {
//           x: 1 - t,
//           y: 1
//         },
//         {
//           x: 1 - t,
//           y: 0.85
//         },
//         {
//           x: 0,
//           y: 0.85
//         },
//         {
//           x: 0,
//           y: 0.15
//         }
//       ]
//   },
//   SED_S_ArrL: function (e, t) {
//     return (t /= e.width) > 1 &&
//       (t = 1),
//       [
//         {
//           x: 0,
//           y: 0.5
//         },
//         {
//           x: t,
//           y: 0
//         },
//         {
//           x: t,
//           y: 0.15
//         },
//         {
//           x: 1,
//           y: 0.15
//         },
//         {
//           x: 1,
//           y: 0.85
//         },
//         {
//           x: t,
//           y: 0.85
//         },
//         {
//           x: t,
//           y: 1
//         },
//         {
//           x: 0,
//           y: 0.5
//         }
//       ]
//   },
//   SED_S_ArrT: function (e, t) {
//     return (t /= e.height) > 1 &&
//       (t = 1),
//       [
//         {
//           x: 0.5,
//           y: 0
//         },
//         {
//           x: 0,
//           y: t
//         },
//         {
//           x: 0.15,
//           y: t
//         },
//         {
//           x: 0.15,
//           y: 1
//         },
//         {
//           x: 0.85,
//           y: 1
//         },
//         {
//           x: 0.85,
//           y: t
//         },
//         {
//           x: 1,
//           y: t
//         },
//         {
//           x: 0.5,
//           y: 0
//         }
//       ]
//   },
//   SED_S_ArrB: function (e, t) {
//     return (t /= e.height) > 1 &&
//       (t = 1),
//       [
//         {
//           x: 0.15,
//           y: 0
//         },
//         {
//           x: 0.15,
//           y: 1 - t
//         },
//         {
//           x: 0,
//           y: 1 - t
//         },
//         {
//           x: 0.5,
//           y: 1
//         },
//         {
//           x: 1,
//           y: 1 - t
//         },
//         {
//           x: 0.85,
//           y: 1 - t
//         },
//         {
//           x: 0.85,
//           y: 0
//         },
//         {
//           x: 0.15,
//           y: 0
//         }
//       ]
//   },
//   SED_S_Tri: function (e, t) {
//     return [{
//       x: 0.5,
//       y: 0
//     },
//     {
//       x: 1,
//       y: 1
//     },
//     {
//       x: 0,
//       y: 1
//     },
//     {
//       x: 0.5,
//       y: 0
//     }
//     ]
//   },
//   SED_S_TriB: function (e, t) {
//     return [{
//       x: 0,
//       y: 0
//     },
//     {
//       x: 1,
//       y: 0
//     },
//     {
//       x: 0.5,
//       y: 1
//     },
//     {
//       x: 0,
//       y: 0
//     }
//     ]
//   },
//   SED_S_Input: function (e, t) {
//     return (t /= e.height) > 1 &&
//       (t = 1),
//       [
//         {
//           x: 0,
//           y: t
//         },
//         {
//           x: 1,
//           y: 0
//         },
//         {
//           x: 1,
//           y: 1
//         },
//         {
//           x: 0,
//           y: 1
//         },
//         {
//           x: 0,
//           y: t
//         }
//       ]
//   },
//   SED_S_Trap: function (e, t) {
//     return (t /= e.width) > 0.5 &&
//       (t = 0.5),
//       [
//         {
//           x: t,
//           y: 0
//         },
//         {
//           x: 1 - t,
//           y: 0
//         },
//         {
//           x: 1,
//           y: 1
//         },
//         {
//           x: 0,
//           y: 1
//         },
//         {
//           x: t,
//           y: 0
//         }
//       ]
//   },
//   SED_S_TrapB: function (e, t) {
//     return (t /= e.width) > 0.5 &&
//       (t = 0.5),
//       [
//         {
//           x: 0,
//           y: 0
//         },
//         {
//           x: 1,
//           y: 0
//         },
//         {
//           x: 1 - t,
//           y: 1
//         },
//         {
//           x: t,
//           y: 1
//         },
//         {
//           x: 0,
//           y: 0
//         }
//       ]
//   },
//   SED_S_Oct: function (e, t, a) {
//     return [{
//       x: t,
//       y: 0
//     },
//     {
//       x: 1 - t,
//       y: 0
//     },
//     {
//       x: 1,
//       y: a
//     },
//     {
//       x: 1,
//       y: 1 - a
//     },
//     {
//       x: 1 - t,
//       y: 1
//     },
//     {
//       x: t,
//       y: 1
//     },
//     {
//       x: 0,
//       y: 1 - a
//     },
//     {
//       x: 0,
//       y: a
//     },
//     {
//       x: t,
//       y: 0
//     }
//     ]
//   },
//   SED_S_Store: function (e, t, a) {
//     var r,
//       i,
//       n = [],
//       o = e.width,
//       s = e.height;
//     var l = {
//       x: (a = t) / o,
//       y: 1
//     };
//     n.push(l);
//     for (
//       r = {
//         left: 0,
//         top: 0,
//         right: a,
//         bottom: s
//       },
//       n.length = 42,
//       n = Utils.PolyYCurve(n, r, 40, 0, 0, 0, 0, !0, o, s),
//       i = 0;
//       i < 40;
//       i++
//     ) n[40 - i] = n[42 + i];
//     return n[41] = {
//       x: a / o,
//       y: 0
//     },
//       n[42] = {
//         x: 1,
//         y: 0
//       },
//       r = {
//         left: o - a,
//         top: 0,
//         right: o,
//         bottom: s
//       },
//       a ? (
//         r.left -= 0,
//         r.right -= 0,
//         n.length = 43,
//         (n = Utils.PolyYCurve(n, r, 40, 0, 0, 0, 0, !0, o, s)).push({
//           x: 1,
//           y: 1
//         })
//       ) : (
//         r.top += 0,
//         r.bottom -= 0,
//         (n = Utils.PolyYCurve(n, r, 40, 0, 0, 0, 0, !0, o, s)).push({
//           x: 1,
//           y: (s - 0) / s
//         }),
//         n.push({
//           x: 1,
//           y: 1
//         })
//       ),
//       n
//   },
//   SED_S_Hex: function (e, t) {
//     return (t /= e.width) > 0.5 &&
//       (t = 0.5),
//       [
//         {
//           x: t,
//           y: 0
//         },
//         {
//           x: 1 - t,
//           y: 0
//         },
//         {
//           x: 1,
//           y: 0.5
//         },
//         {
//           x: 1 - t,
//           y: 1
//         },
//         {
//           x: t,
//           y: 1
//         },
//         {
//           x: 0,
//           y: 0.5
//         },
//         {
//           x: t,
//           y: 0
//         }
//       ]
//   },
//   SED_S_Pent: function (e, t) {
//     return (t /= e.height) > 1 &&
//       (t = 1),
//       [
//         {
//           x: 0,
//           y: 1 - t
//         },
//         {
//           x: 0,
//           y: 0
//         },
//         {
//           x: 1,
//           y: 0
//         },
//         {
//           x: 1,
//           y: 1 - t
//         },
//         {
//           x: 0.5,
//           y: 1
//         },
//         {
//           x: 0,
//           y: 1 - t
//         }
//       ]
//   },
//   SED_S_PentL: function (e, t) {
//     return (t /= e.width) > 1 &&
//       (t = 1),
//       [
//         {
//           x: t,
//           y: 0
//         },
//         {
//           x: 1,
//           y: 0
//         },
//         {
//           x: 1,
//           y: 1
//         },
//         {
//           x: t,
//           y: 1
//         },
//         {
//           x: 0,
//           y: 0.5
//         },
//         {
//           x: t,
//           y: 0
//         }
//       ]
//   },
//   SED_S_Delay: function (e, t) {
//     var a = [],
//       r = e.width,
//       i = e.height,
//       n = t;
//     a[0] = {
//       x: 0,
//       y: 1
//     },
//       a[1] = {
//         x: 0,
//         y: 0
//       },
//       a[2] = {
//         x: (r - n) / r,
//         y: 0
//       };
//     var o = {
//       left: r - n,
//       top: 0,
//       right: r,
//       bottom: i
//     };
//     return (a = Utils.PolyYCurve(a, o, 80, 0, 0, 0, 0, !1, r, i)).push({
//       x: (r - n) / r,
//       y: 1
//     }),
//       a
//   },
//   SED_S_Disp: function (e, t) {
//     var a = [],
//       r = e.width,
//       i = e.height,
//       n = t;
//     a[0] = {
//       x: n / r,
//       y: 1
//     },
//       a[1] = {
//         x: 0,
//         y: 0.5
//       },
//       a[2] = {
//         x: n / r,
//         y: 0
//       },
//       a[3] = {
//         x: (r - n) / r,
//         y: 0
//       };
//     var o = {
//       left: r - n,
//       top: 0,
//       right: r,
//       bottom: i
//     };
//     return (a = Utils.PolyYCurve(a, o, 80, 0, 0, 0, 0, !1, r, i)).push({
//       x: (r - n) / r,
//       y: 1
//     }),
//       a.push({
//         x: n / r,
//         y: 1
//       }),
//       a
//   }
// }

// Object.freeze(ListManager.PolygonShapeGenerator),
// ListManager.CollabSVGEventTypes = {
//   Object_Move: 1,
//   Shape_Grow: 2,
//   Table_GrowColumn: 3,
//   TextEntry: 4
// }

// ListManager.CollabMessages = {
//   SetStyleAttributes: 1,
//   SetTextAttributes: 2,
//   Text_Init: 3,
//   Text_Edit: 4,
//   Text_End: 5,
//   AddSymbol: 6,
//   AddLine: 7,
//   ActionButton: 8,
//   ActionButton_SplitPath: 9,
//   LineDraw_InsertShape: 10,
//   MoveObjects: 11,
//   Dialog_Dimensions: 12,
//   Action_Shape: 13,
//   Action_Line: 14,
//   Action_Connector: 15,
//   PolyLSetSegmentType: 16,
//   PolyLRemoveNodes: 17,
//   PolyLAddNode: 18,
//   PolyLSplit: 19,
//   Duplicate: 20,
//   DeleteObjects: 21,
//   Table_DeleteCellContent: 22,
//   PasteObjects: 23,
//   Table_PasteCellContent: 24,
//   Undo: 25,
//   Redo: 26,
//   FormatPainter: 27,
//   Table_PasteFormat: 28,
//   Edit_Note: 29,
//   Comment_Add: 30,
//   SetTextDirection: 31,
//   ChangeWidth: 32,
//   ChangeHeight: 33,
//   SetTopLeft: 34,
//   AlignShapes: 35,
//   GroupSelectedShapes: 36,
//   UngroupSelectedShapes: 37,
//   RotateShapes: 38,
//   FlipShapes: 39,
//   BringToFrontOfSpecificLayer: 40,
//   SendToBackOfSpecificLayer: 41,
//   SpaceEvenly: 42,
//   MakeSameSize: 43,
//   ChangeShape: 44,
//   ChangeLineType: 45,
//   ChangeToSymbol: 46,
//   OpenShapeEdit: 47,
//   CloseShapeEdit: 48,
//   SetTargetConnectionPoints: 49,
//   SetShapeProperties: 50,
//   SetColorFilter: 51,
//   Lock: 52,
//   SetObjectHyperlink: 53,
//   FieldedDataImportFromFile: 54,
//   InsertGraph: 55,
//   InsertGauge: 56,
//   SetBackgroundColor: 57,
//   SetBackgroundGradient: 58,
//   ResetBackgroundGradient: 59,
//   SetBackgroundTexture: 60,
//   SetPageOrientation: 61,
//   SetPageOrientation: 61,
//   SetPageMargins: 62,
//   SetCustomPageMargins: 63,
//   AddNewLayer: 64,
//   SetLayers: 65,
//   ShowAllLayers: 66,
//   LayerTabClick: 67,
//   Dialog_Options: 68,
//   SetWorkArea: 69,
//   CenterOnPage: 70,
//   SetScalePreset: 71,
//   ScaleDialog: 72,
//   InsertTable: 73,
//   RemoveTables: 74,
//   SetTableProperties: 75,
//   Table_DeleteRows: 76,
//   Table_InsertRows: 77,
//   Table_InsertColumns: 78,
//   Table_DeleteColumns: 79,
//   Table_JoinCells: 80,
//   Table_SplitCells: 81,
//   Table_DistributeRowandCols: 82,
//   Table_SetCellFlags: 83,
//   SetSDPFlag: 84,
//   InsertSDONFromImport: 85,
//   ApplyLineHopDialog: 86,
//   AddCorner: 87,
//   AddAnnotationLayer: 88,
//   RemoveAnnotationLayer: 89,
//   ShowDimensions: 90,
//   SetBranchStyle: 91,
//   SetChartStyle: 92,
//   SetSDPMoreFlag: 93,
//   UpdateGraph: 94,
//   DataFieldDeleteTable: 95,
//   SetDirection: 96,
//   ConnectorSetSpacing: 97,
//   ActionButton_JoinPath: 98,
//   OrgSetTable: 99,
//   MindMapSetTable: 100,
//   MindMapAddIcon: 101,
//   ReadJSONAPI: 102,
//   GanttAddTask: 103,
//   GanttAddDependency: 104,
//   GanttRemoveDependency: 105,
//   GanttIndent: 106,
//   GanttSortTasks: 107,
//   SD_GanttExpandContract: 108,
//   GanttSetTimeScale: 109,
//   UpdateProjectOptions: 110,
//   UpdateProjectTimeframe: 111,
//   InsertSwimlane: 112,
//   MakeUniformSize: 113,
//   BPMN_SwitchSymbol: 114,
//   BPMN_SwitchIcon: 115,
//   BPMN_AddRemoveParticipant: 116,
//   ReverseArrowheads: 117,
//   AddMultiplicity: 118,
//   UIElementAction: 119,
//   HandleIconClick: 120,
//   CMD_NewDataTable: 121,
//   CMD_DataFieldAdd: 122,
//   CMD_DataFieldLabelChange: 123,
//   CMD_DataFieldTypeSelect: 124,
//   CMD_DataFieldDelete: 125,
//   CMD_DataFieldMoveUp: 126,
//   CMD_DataFieldMoveDown: 127,
//   CMD_DataFieldRenameTable: 128,
//   FieldedDataUpdateFromFile: 129,
//   FieldedDataImportFromURL: 130,
//   FieldedDataUpdateFromURL: 131,
//   CMD_HandleDataChange: 132,
//   UpdateFieldedDataTooltipItem: 133,
//   AddDataRule: 134,
//   UpdateDataRule: 135,
//   DeleteDataRule: 136,
//   CMD_SelectDataRule: 137,
//   AttachRowToShape: 138,
//   CMD_DataFieldUnlinkShape: 139,
//   CMD_DataFieldDeleteData_NoShape: 140,
//   CMD_DataFieldDeleteData: 141,
//   HandleDataDrop: 142,
//   SetHideIconState: 143,
//   AddSelectedSymbol: 144,
//   NudgeSelectedObjects: 145,
//   SetSpellCheck: 148,
//   ClearImage: 149,
//   Table_ImportPicture: 150,
//   Shape_ImportPicture: 151,
//   AddShape_ImportPicture: 152,
//   ContainerDoubleClick: 153,
//   FieldedDataSetFieldPresetList: 154,
//   FieldedDataClearFieldPresetList: 155,
//   Table_InsertDeleteGroupCols: 156,
//   Table_InsertDeleteGroupRows: 157,
//   UpdateGauge: 158,
//   SetFractionalPrecision: 159,
//   SetDecimalPrecision: 160,
//   OrgAddPicture: 161,
//   SetLineCornerRadiusAll: 162,
//   SwitchTheme: 163,
//   UpdateDimensionFromTextObj: 164,
//   SetDefaultWallThickness: 165,
//   SetShapeMoreFlags: 166,
//   Pr_InsertSymbol: 167,
//   HandleDataRecordAdd: 168,
//   InsertFrameContainer: 169,
//   CreateTableFromReport: 170,
//   Jira_CreateShapesForIssues: 171,
//   UpdateSelectedShapeFromJiraInformation: 172,
//   Jira_ProductRoadMap: 173,
//   Multiplicity_SwitchSides: 174,
//   UpdateObjectWithIntegrationCardItemInformation: 175,
//   CreateShapesForIntegrationCardItems: 176,
//   TimelineAddEvent: 177,
//   TimelineRemoveEvent: 178,
//   TimelineChangePosition: 179,
//   TimelineChangeType: 180,
//   TimelineChangeDate: 181,
//   TimelineSetAuto: 182,
//   TimelineMoveEvent: 183,
//   HitAreaClick: 184,
//   Table_FillSwimlane: 185,
//   DeSelect: 186,
//   SwimLane_Operation: 187,
//   CreateSubProcess: 188,
//   SubProcess_UpdateParent: 189,
//   SetViewport: 190
// }

// ListManager.Collab_AnimationMessages = {
//   CursorMove: 1000,
//   ChangeSelection: 1001
// }

// ListManager.CollabMessageActions = {
//   CreateSymbol: 1,
//   CreateLine: 2,
//   CreateShape: 3,
//   MoveObject: 4,
//   LinkObject: 5,
//   AddLabel: 6
// }

// ListManager.StandardShapeSymbolIDs = {
//   2: 'b8002394-8010-495f-8fdd-7869523153d7',
//   4: '97067c1b-2237-40da-8343-95ee70b7830e',
//   5: 'eaf0858e-cc36-4733-8f63-ef221acd0d5c',
//   6: '499eb277-a38d-46de-88bd-fc878b29a9ab',
//   20: '0a806d00-9d8e-4c11-8389-7874aff78720',
//   9: 'c3f38053-ac93-479b-8cb6-d93fd2f6c7dc',
//   17: '6ec5bad8-2a11-406c-8d09-ee829c3dcb2c',
//   14: '6314591b-042b-47bb-858c-82ea96739168',
//   8: 'a2cd9683-2056-46a1-8733-d6a4db4a6462',
//   10: 'db87b678-a609-440f-815d-9aaf37316f48',
//   16: 'c6f29c4d-9a27-4559-8313-74c85398d52d',
//   23: 'c18bdcd5-750f-4dd5-813d-c647b7d898d4'
// }

// ListManager.EssentialLibraries = {
//   'd1e2f6d3-8dcf-4c39-8c42-ad1f252be500': [
//     '13a207a6-0d65-4515-be3a-d3d782979063'
//   ],
//   '211eb435-e111-4947-8f52-0911efbaeed8': [
//     '7b0f0517-d105-4a53-9e1f-04563f5b8171'
//   ],
//   'a20dc4d3-0d87-47c5-889d-66c757c62213': [
//     '13a207a6-0d65-4515-be3a-d3d782979063'
//   ],
//   '735ef08a-24a9-445e-86ff-48ba78ab85a8': [
//     '96c6268d-33d6-4d03-b62d-556786c8280c',
//     '13a207a6-0d65-4515-be3a-d3d782979063'
//   ],
//   'a96888df-52d7-40a0-865c-51ee36eaeb28': [
//     '13a207a6-0d65-4515-be3a-d3d782979063'
//   ],
//   'cf3de6bc-42c2-4571-8619-349f8f79d2ef': [
//     '13a207a6-0d65-4515-be3a-d3d782979063'
//   ],
//   '5543d88d-2355-4d6b-8119-c4cc478173de': [
//     '5024a8a4-2da2-4f41-b6be-66bae6e09530'
//   ],
//   '7c423c2c-26e1-47bb-8ce4-cb5bc7400d25': [
//     'd1eea160-7255-456c-9be4-b9eca11820d1',
//     '29f422d6-0874-4276-9fac-fb7280c100c3'
//   ],
//   '1daef7bc-bbaa-4496-8b88-80fdcd4ec553': [
//     '9cdd3a7c-1eeb-4660-b726-142cf9b5d607'
//   ],
//   '8369a092-517c-49e7-8336-3edba999927d': [
//     '9cdd3a7c-1eeb-4660-b726-142cf9b5d607'
//   ],
//   '9cf47e77-33dc-4de4-860b-7d1296ec5674': [
//     '9cdd3a7c-1eeb-4660-b726-142cf9b5d607'
//   ],
//   LINEDRAW_AWS: [
//     '25e5b561-135a-41c0-a427-29a2d9f7fc90'
//   ],
//   LINEDRAW_AZURE: [
//     '710db560-6150-401b-8bbd-0d03f0972e92'
//   ],
//   LINEDRAW_ERD: [
//     'cbfca214-3f91-43b0-90a7-60a460779c22'
//   ],
//   LINEDRAW_UMLCLASS: [
//     '5f1f1d3c-1a15-4eec-b1a7-3abc2ca2dfd8'
//   ],
//   LINEDRAW_UML: [
//     'b61155e9-b1fd-411d-99c7-688b7e64c51b'
//   ],
//   CONTAINER: [
//     '13a207a6-0d65-4515-be3a-d3d782979063'
//   ],
//   GAUGE: [
//     'fff24423-3c85-468a-b69e-552d96109218'
//   ],
//   GRAPH: [
//     'a22d30cc-dd82-41c3-a1e6-28e968bed477'
//   ],
//   JIRA: [
//     'b21c02ed-a7e0-4509-8719-777eb2c0adcb'
//   ]
// }

// export default ListManager.Model;
// ListManager.Point = function (e, t) {

//   this.x = e ||
//     0,
//     this.y = t ||
//     0
// }

// ListManager.PathPoint = function (e, t, a, r, i, n) {

//   this.x = e ||
//     0,
//     this.y = t ||
//     0,
//     this.moveto = a ||
//     !1,
//     this.arrowhead = r ||
//     !1,
//     this.curvex = i ||
//     0,
//     this.curvey = n ||
//     0
// }
// ListManager.Rectangle = function (e, t, a, r) {

//   this.x = e ||
//     0,
//     this.y = t ||
//     0,
//     this.width = a ||
//     0,
//     this.height = r ||
//     0
// }

/*
ListManager.PolyList = function () {

  this.dim = {
    x: 0,
    y: 0
  },
    this.offset = {
      x: 0,
      y: 0
    },
    this.flags = 0,
    this.closed = 0,
    this.wasline = !0,
    this.Shape_Rotation = 0,
    this.Shape_DataID = - 1,
    this.Shape_TableID = - 1,
    this.segs = []
}
    */


ListManager.CPoint = function (e, t) {

  this.h = e ||
    0,
    this.v = t ||
    0
}

// ListManager.CRect = function (e, t, a, r) {

//   this.h = e ||
//     0,
//     this.v = t ||
//     0,
//     this.hdist = a ||
//     0,
//     this.vdist = r ||
//     0
// }

// ListManager.StepRect = function (e, t, a, r) {

//   this.h = e ||
//     0,
//     this.v = t ||
//     0,
//     this.hend = a ||
//     0,
//     this.vend = r ||
//     0
// }

// ListManager.ConnectorDefines = {
//   DefaultHt: 25,
//   DefaultWd: 25,
//   A_Bk: 0,
//   A_Cl: 1,
//   A_Cr: 2,
//   SEDA_NSkip: 3,
//   StubHookPt: - 3,
//   SEDAC_NORMAL: 0,
//   SEDAC_ABOVE: - 2,
//   SEDAC_BELOW: - 3,
//   SEDAC_PARENT: - 4
// }

// ListManager.SEDAHook = function () {

//   this.startpoint = {
//     h: 0,
//     v: 0
//   },
//     this.endpoint = {
//       h: 0,
//       v: 0
//     },
//     this.id = - 1,
//     this.textid = - 1,
//     this.tuniqueid = - 1,
//     this.gap = ListManager.ConnectorDefines.DefaultWd,
//     this.ogap = 0,
//     this.extra = 0,
//     this.comanagerht = 0,
//     this.isasst = !1,
//     this.pr = new ListManager.CRect(0, 0, 0, 0),
//     this.sequence = 0,
//     this.steps = []
// }

// ListManager.SEDArray = function () {

//   this.styleflags = 0,
//     this.tilt = 0,
//     this.angle = 0,
//     this.ht = 0,
//     this.wd = 0,
//     this.flags = 0,
//     this.matchsizelen = 0,
//     this.lasttexthook = - 1,
//     this.curveparam = 0,
//     this.profile = new ListManager.CRect(0, 0, 0, 0),
//     this.coprofile = new ListManager.CRect(0, 0, 0, 0),
//     this.steps = [],
//     this.hook = []
// }

// ListManager.SEDA_Styles = {
//   SEDA_StartLeft: 1,
//   SEDA_BothSides: 2,
//   SEDA_Stagger: 4,
//   SEDA_PerpConn: 8,
//   SEDA_Linear: 16,
//   SEDA_Radial: 32,
//   SEDA_ReverseCol: 64,
//   SEDA_EndConn: 128,
//   SEDA_MinZero: 256,
//   SEDA_CoManager: 512,
//   SEDA_FlowConn: 1024,
//   SEDA_GenoConn: 2048,
//   SEDA_MatchSize: 4096,
//   SEDA_MinInvisible: 8192,
//   SEDA_MinOne: 16384,
//   SEDA_Timeline: 32768
// }

// ListManager.Array_Flags = {
//   Array_LeaveA_Cl: 1,
//   Array_LeaveA_Cr: 1
// }
// ListManager.TextObject = function (e) {
//   e = e ||
//   {
//   },
//     this.Type = ConstantData.StoredObjectType.LM_TEXT_OBJECT,
//     this.runtimeText = e.runtimeText ||
//     null,
//     this.selrange = e.selrange ||
//     {
//       start: 0,
//       end: 0,
//       line: 0
//     }
// }



ListManager.PageRecord = function () {
  this.papersize = {
    x: 1100,
    y: 850
  },
    this.minsize = {
      x: 1000,
      y: 750
    },
    this.margins = {
      left: 50,
      top: 50,
      right: 50,
      bottom: 50
    },
    this.printflags = FileParser.PrintFlags.SEP_OnePage,
    this.printscale = 0,
    this.landscape = !0
}

ListManager.ImageRecord = function () {

  this.mr = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
    this.croprect = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    this.imageflags = ListManager.ImageScales.SDIMAGE_CROP_TO_FIT,
    this.scale = 1,
    this.iconid = 0
}

ListManager.SwimlaneProperties = function () {

  this.DataID = - 1,
    this.HFill = null,
    this.LFill = null
}

ListManager.TimelineProperties = function () {
  this.Arrangement = null,
    this.Auto = null,
    this.HideGridLabelColumn = !1,
    this.Start = '',
    this.StartTime = '',
    this.Length = 0,
    this.Units = null,
    this.EventType = null,
    this.Position = null,
    this.LineLength = 100
}

ListManager.OleHeader = function () {

  this.dva = 0,
    this.linked = !1,
    this.scale = 1
}

// ListManager.ArrowheadRecord = function () {

//   this.StartArrowID = 0,
//     this.StartArrowDisp = !1,
//     this.EndArrowID = 0,
//     this.EndArrowDisp = !1,
//     this.ArrowSizeIndex = 1
// }

/*
ListManager.FontRecord = function () {
  this.fontName = 'Arial',
    this.fontType = 'sanserif',
    this.fontSize = 10,
    this.face = 0
}
    */

ListManager.LibListEntry = function (e) {
  this.libname = e,
    this.libGuid = null,
    this.scrollpos = 0,
    this.SearchResults = !1,
    this.Collapsed = !1
}

// ListManager.LibList = function () {
//   this.selected = 0,
//     this.lib = []
// }

// ListManager.RightClickData = function () {
//   this.TargetID = - 1,
//     this.segment = - 1,
//     this.HitPt = {
//       x: 0,
//       y: 0
//     },
//     this.Locked = !1,
//     this.Context = 0
// }

ListManager.ImportReplaceData = function (e) {
  this.context = e,
    this.deleteList = [],
    this.ForceFrame = !1,
    this.SmartContainerID = - 1,
    this.SmartContainerChildID = - 1,
    this.import_params = null,
    this.import_params_tablename = '',
    this.ContainerID = - 1
}

ListManager.Options = function () {
  this.newTableRows = 4,
    this.newTableCols = 3
}

ListManager.BlobBytes = function (e, t) {
  this.ImageDir = e,
    this.Bytes = t
}

ListManager.PolyGeometry = function (e, t, a, r, i) {
  this.NoFill = e,
    this.NoLine = t,
    this.Closed = a,
    this.Offset = r,
    this.NPoints = i,
    this.MoveTo = [],
    this.shapeid = 0
}

ListManager.Dynamic_Hit = function (e, t, a, r, i, n, o) {
  this.ID = e,
    this.snap = t,
    this.edge = a,
    this.distance = r,
    this.leftright = i,
    this.aboveleft = n,
    this.label = o,
    this.pt = null,
    this.otherhits = []
}

ListManager.Dynamic_Guides = function () {
  this.above_left = null,
    this.below_left = null,
    this.above_right = null,
    this.below_right = null,
    this.left_top = null,
    this.right_top = null,
    this.left_bottom = null,
    this.right_bottom = null,
    this.above_center = null,
    this.below_center = null,
    this.left_center = null,
    this.right_center = null,
    this.wall_left = null,
    this.wall_right = null,
    this.wall_top = null,
    this.wall_bottom = null
}

// ListManager.ContentHeader = function () {
//   this.Page = new ListManager.PageRecord,
//     this.MaxWorkDim = new Point(
//       ConstantData.Defines.MaxWorkDimX,
//       ConstantData.Defines.MaxWorkDimY
//     ),
//     this.DimensionFont = new FontRecord(),
//     this.DimensionFontStyle = new DefaultStyle,/* new SDGraphics.Text.Formatter.DefaultStyle,*/
//     this.flags = ConstantData.ContentHeaderFlags.CT_DA_Pages,
//     this.BusinessModule = '',
//     this.dateformat = - 1,
//     this.smarthelpname = '',
//     this.smartpanelname = '',
//     this.originaltemplate = '',
//     this.orgcharttable = '',
//     this.exportpath = '',
//     this.presentationBackground = '',
//     this.presentationName = '',
//     this.importSourcePath = '',
//     this.defaultlibs = '',
//     this.lp_list = new ListManager.LibList,
//     this.ClipboardBuffer = null,
//     this.ClipboardType = ListManager.ClipboardType.None,
//     this.nonworkingdays = ConstantData.Defines.DEFAULT_NONWORKINGDAYS,
//     this.holidaymask = 0,
//     this.DocIsDirty = !1,
//     this.AllowReplace = !0,
//     this.FontList = [],
//     this.SymbolSearchString = '',
//     this.Save_HistoryState = - 1,
//     this.ParentPageID = ''
// }


// ListManager.SelectionAttributes = function () {

//   this.tselect = - 1,
//     this.nselect = 0,
//     this.nlineselected = 0,
//     this.nshapeselected = 0,
//     this.nconnectorselected = 0,
//     this.ngroupsselected = 0,
//     this.nimageselected = 0,
//     this.IsTargetTable = !1,
//     this.paste = 0,
//     this.undo = !1,
//     this.redo = !1,
//     this.allowalign,
//     this.width = 0,
//     this.height = 0,
//     this.left = 0,
//     this.top = 0,
//     this.widthstr = '',
//     this.heightstr = '',
//     this.leftstr = '',
//     this.topstr = '',
//     this.fontid = 0,
//     this.fontsize = 12,
//     this.bold = !1,
//     this.italic = !1,
//     this.underline = !1,
//     this.superscript = !1,
//     this.subscript = !1,
//     this.TextDirection = !0,
//     this.ncells_selected = 0,
//     this.NTableRows = 4,
//     this.NTableCols = 3,
//     this.cell_notext = !1,
//     this.celltype = 0,
//     this.cellselected = !1,
//     this.cellflags = 0,
//     this.ntablesselected = 0,
//     this.bInNoteEdit = !1,
//     this.allowcopy = !1,
//     this.selectionhastext = !1,
//     this.subtype = 0,
//     this.objecttype = 0,
//     this.datasetElemID = - 1,
//     this.projectTableSelected = !1,
//     this.lockedTableSelected = !1,
//     this.fixedCornerRadius = 0,
//     this.lineCornerRadius = 0,
//     this.colorfilter = 0,
//     this.SelectionBusinessManager = null,
//     this.WallThickness = 0
// }

ListManager.SelectionShapeProperties = function () {
  this.TextGrow = null,
    this.ObjGrow = null,
    this.tmargin = null,
    this.ClickFlag = null,
    this.CRFlag = null,
    this.SideConn = null,
    this.AllowSides = !1,
    this.AllowSpell = null,
    this.hasrrectselected = !1,
    this.rrectfixed = !1,
    this.rrectparam = 0.2,
    this.hastable = !1
}

/*
ListManager.SEDDefault = function () {
  this.style = {},
    this.just = 'center',
    this.vjust = 'center',
    this.lf = new ListManager.FontRecord,
    this.textflags = 0,
    this.textgrow = ListManager.TextGrowBehavior.PROPORTIONAL,
    this.fsize_min = 8,
    this.tmargins = {
      left: ConstantData.Defines.SED_DefTMargin,
      top: ConstantData.Defines.SED_DefTMargin,
      right: ConstantData.Defines.SED_DefTMargin,
      bottom: ConstantData.Defines.SED_DefTMargin
    },
    this.flags = 0,
    this.h_arraywidth = 50,
    this.v_arraywidth = 50,
    this.lastcommand = 0,
    this.arrayht = 25,
    this.arraywd = 25,
    this.wallThickness = 0,
    this.curveparam = 0,
    this.rrectparam = ConstantData.Defines.DefFixedRRect,
    this.pen = {},
    this.highlighter = {}
}
    */

/*
ListManager.SEDGraphDefault = function () {
  this.type = ListManager.GraphType.SDGRAPH_TYPE_BAR,
    this.flags = ListManager.GraphFlags.SDAX_SEQUENCE_BY_CATEGORY,
    this.pointflags = 0,
    this.catAxisflags = ListManager.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | ListManager.AxisFlags.SDAX_HIDE_MINOR_TICKS,
    this.magAxisflags = ListManager.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
    this.legendType = ListManager.LegendType.SDAX_LEGEND_FULL,
    this.legendlayoutflags = 0,
    this.imagevaluerep = - 1,
    this.quadrant = 0,
    this.style = new QuickStyle(),// new Resources.QuickStyle,
    this.areaStyle = new QuickStyle(),// new Resources.QuickStyle,
    this.gridStyle = new QuickStyle(),// new Resources.QuickStyle,
    this.titleStyle = new QuickStyle(),// new Resources.QuickStyle,
    this.legendStyle = new QuickStyle(),// new Resources.QuickStyle,
    this.legendTitleStyle = new QuickStyle(),// new Resources.QuickStyle,
    this.catAxisStyle = new QuickStyle(),//new Resources.QuickStyle,
    this.catAxisTitleStyle = new QuickStyle(),//new Resources.QuickStyle,
    this.magAxisStyle = new QuickStyle(),//new Resources.QuickStyle,
    this.magAxisTitleStyle = new QuickStyle(),// new Resources.QuickStyle,
    this.pointStyle = new QuickStyle(),// new Resources.QuickStyle,
    this.pointLabelStyle = new QuickStyle()// new Resources.QuickStyle
}
    */

/*
ListManager.RecentSymbol = function (e, t, a) {
  this.ItemId = e,
    this.ContentTitle = '',
    this.ContentTT = '',
    this.ContentImageUrl = '',
    this.NoMenu = !!a,
    t &&
    (
      this.ContentTitle = t,
      this.ContentImageUrl = Constants.FilePath_CMSRoot + 'symbols/BTN/' + this.ItemId + '.png',
      this.ContentTT = this.ContentTitle.replace(/"/g, '&quot;')
    )
}
    */

// ListManager.SEDSession = function () {
//   this.Type = ConstantData.StoredObjectType.SED_SESSION_OBJECT,
//     this.dim = {
//       x: 1000,
//       y: 750
//     },
//     this.flags = ListManager.SessionFlags.SEDS_LLink | ListManager.SessionFlags.SEDS_FreeHand | ListManager.SessionFlags.SEDS_NoTreeOverlap,
//     this.tselect = - 1,
//     this.dupdisp = {
//       x: 0,
//       y: 0
//     },
//     this.def = new SEDDefault(),
//     this.graphDef = new SEDGraphDefault(),
//     this.RefCon = 0,
//     this.d_sarrow = 0,
//     this.d_sarrowdisp = !1,
//     this.d_earrow = 0,
//     this.d_earrowdisp = !1,
//     this.d_arrowsize = 1,
//     this.centersnapalign = !0,
//     this.hopdimindex = 1,
//     this.hopdim = {
//       x: ListManager.HopDimX[1],
//       y: ListManager.HopDimY[1]
//     },
//     this.hopstyle = ListManager.HopStyle.SDH_Arc,
//     this.dimensions = ListManager.DimensionFlags.SED_DF_Total,
//     this.shapedimensions = 0,
//     this.background = new FillData(),
//     this.background.Paint.FillType = ConstantData.FillTypes.SDFILL_TRANSPARENT,
//     this.bkdir = 0,
//     this.bkid = - 1,
//     this.bkcroprect = {
//       left: 0,
//       top: 0,
//       right: 0,
//       bottom: 0
//     },
//     this.bkflags = 0,
//     this.addcount = 0,
//     this.sequencemask = 0,
//     this.sequencestep = - 1,
//     this.nsequencesteps = 0,
//     this.sequenceflags = 0,
//     this.libSelectedRestore,
//     this.chartdirection = 0,
//     this.copyPasteTrialVers = 0,
//     this.taskmanagementflags = 0,
//     this.taskdays = 7,
//     this.forcedotted = !1,
//     this.moreflags = 0,
//     this.fieldmask = 0,
//     this.CurrentTheme = '',
//     this.EnableSpellCheck = !0,
//     this.rulerSettings = new RulerSettings(),// new DocumentHandler.rulerSettings,
//     this.Page = new ListManager.PageRecord,
//     this.RecentSymbols = [],
//     this.CommentListID = - 1,
//     this.CommentID = - 1
// }

/* move to model
ListManager.TEDSession = function () {
  this.Type = Globals.StoredObjectType.TED_SESSION_OBJECT,
    this.theActiveTextEditObjectID = - 1,
    this.theTEWasResized = !1,
    this.theTEWasEdited = !1,
    this.theTELastOp = ListManager.TELastOp.INIT,
    this.theActiveTableObjectID = - 1,
    this.theActiveTableObjectIndex = - 1,
    this.theActiveOutlineObjectID = - 1,
    this.theActiveGraphObjectID = - 1,
    this.EditorID = 0
}
*/

// ListManager.Layer = function () {
//   this.name = '',
//     this.flags = ConstantData.LayerFlags.SDLF_Visible,
//     this.n = 0,
//     this.index = 0,
//     this.layertype = ConstantData.LayerTypes.SD_LAYERT_NONE,
//     this.zList = []
// }

// ListManager.LayersManager = function () {
//   this.Type = ConstantData.StoredObjectType.LAYERS_MANAGER_OBJECT,
//     this.nlayers = 0,
//     this.layers = [],
//     this.activelayer = 0,
//     this.swimlanelist = []
// }



// ListManager.Link = function (e, t, a) {

//   this.targetid = e ||
//     0,
//     this.hookid = t ||
//     0,
//     this.flags = 0,
//     this.cellid = a
// }

// ListManager.Hook = function (e, t, a, r, i) {
//   this.objid = e ||
//     0,
//     this.cellid = t ||
//     null,
//     this.cellindex = a ||
//     0,
//     this.hookpt = r ||
//     0,
//     this.connect = {
//       x: 0,
//       y: 0
//     },
//     i &&
//     (this.connect.x = i.x || 0, this.connect.y = i.y || 0)
// }

// ListManager.LinkParameters = function () {
//   this.ConnectIndex = - 1,
//     this.ConnectPt = {
//       x: 0,
//       y: 0
//     },
//     this.ConnectInside = null,
//     this.ConnectHookFlag = 0,
//     this.HookIndex = - 1,
//     this.InitialHook = - 1,
//     this.PrevConnect = - 1,
//     this.ConnectIndexHistory = [],
//     this.SConnectIndex = - 1,
//     this.SConnectInside = null,
//     this.SConnectHookFlag = 0,
//     this.SConnectPt = {
//       x: 0,
//       y: 0
//     },
//     this.HiliteConnect = - 1,
//     this.HiliteInside = null,
//     this.HiliteHookFlag = 0,
//     this.SHiliteConnect = - 1,
//     this.SHiliteInside = null,
//     this.SHiliteHookFlag = 0,
//     this.JoinIndex = - 1,
//     this.JoinData = 0,
//     this.JoinSourceData = 0,
//     this.SJoinIndex = - 1,
//     this.SJoinData = 0,
//     this.SJoinSourceData = 0,
//     this.HiliteJoin = - 1,
//     this.SHiliteJoin = - 1,
//     this.ArraysOnly = !1,
//     this.lpCircList = [],
//     this.DropOnLine = !1,
//     this.AutoInsert = !1,
//     this.AutoPoints = [],
//     this.AutoSeg = 0,
//     this.AutoSinglePoint = 0,
//     this.AutoHeal = !1,
//     this.AutoHealID = - 1,
//     this.cpt = [],
//     this.ContainerPt = [],
//     this.AllowJoin = 0,
//     this.savedEditState = ListManager.EditState.DEFAULT
// }

// ListManager.HitResult = function (e, t, a) {
//   this.objectid = e ||
//     0,
//     this.hitcode = t ||
//     0,
//     this.cellid = a ||
//     0,
//     this.segment = - 1,
//     this.pt = {
//       x: 0,
//       y: 0
//     }
// }




ListManager.OrgChartTables = [
  'Org-Split',
  'Org-Photo',
  'Org-PhotoSplit'
]

ListManager.WinOrgChartTables = [
  'Double no Pic',
  'Single with Pic',
  'Double with Pic'
]

ListManager.WinMindMapTables = [
  'Icon_Shape',
  'Icon Resource'
]

ListManager.MindMapTables = [
  'MM-TwoSplitBox',
  'MM-ThreeSplitBox',
  'Icon'
]

ListManager.JiraTables = [
  'JiraCard'
]




ListManager.CommentBlock = function () {
  this.comment = '',
    this.userID = - 1,
    this.userName = '',
    this.objectID = - 1,
    this.timestamp = 0,
    this.year = 0,
    this.month = 0,
    this.day = 0
}

ListManager.CommentThread = function () {
  this.timestamp = 0,
    this.objID = null,
    this.blocks = []
}

ListManager.CommentList = function () {
  this.threads = []
}

ListManager.CommentData = function () {
  this.Comment = '',
    this.CommenterName = 'User',
    this.Time = '0,00',
    this.BlockID = null
}



// ListManager.CommentParams = {
//   CommentID: - 1,
//   DocumentThreadID: - 1,
//   DropDownContainer: null,
//   DropDownTextArea: null,
//   Panel: null,
//   PanelContainer: null,
//   CommentTemplate: null,
//   DateTemplate: null,
//   PanelCommentTemplate: null,
//   PanelTargetID: - 2,
//   DeleteTarget: - 1
// }




// ListManager.ContainerListArrangements = {
//   Row: 0,
//   Column: 1
// }

// ListManager.ContainerListFlags = {
//   AllowOnlyContainers: 1,
//   AllowOnlyNonContainers: 2,
//   Sparse: 4,
//   LeftChanged: 8,
//   TopChanged: 16,
//   Adjust: 32
// }

// ListManager.ContainerList = function () {
//   this.Arrangement = ListManager.ContainerListArrangements.Column,
//     this.HorizontalSpacing = 10,
//     this.VerticalSpacing = 10,
//     this.AlignH = 'center',
//     this.AlignV = 'top',
//     this.Wrap = 0,
//     this.height = 0,
//     this.width = 0,
//     this.MinWidth = 150 + 2 * this.VerticalSpacing,
//     this.MinHeight = 75 + 2 * this.HorizontalSpacing,
//     this.flags = 0,
//     this.nacross = 1,
//     this.ndown = 1,
//     this.childwidth = 150,
//     this.childheight = 75,
//     this.List = []
// }

// ListManager.ContainerListShape = function () {
//   this.id = - 1,
//     this.pt = {
//       x: 0,
//       y: 0
//     },
//     this.extra = 0
// }


// ListManager.ArrowheadLookupTable = []

// ListManager.ArrowheadSizeTable = []

// ListManager.PolySeg = function (e, t, a) {

//   this.LineType = e ||
//     ListManager.LineType.LINE,
//     this.dataclass = 0,
//     this.ShortRef = 0,
//     this.param = 0,
//     this.weight = 0,
//     this.dimDeflection = 0,
//     this.flags = 0,
//     this.pt = {
//       x: 0,
//       y: 0
//     },
//     this.UserData = null,
//     t &&
//     (this.pt.x = t),
//     a &&
//     (this.pt.y = a)
// }


// ListManager.CursorTypes = {
//   Default: 'DEFAULT',
//   Plus: 'PLUS',
//   Move: 'MOVE',
//   Grow: 'GROW'
// }

// ListManager.CreateShapeType = {
//   RECT: 1,
//   RRECT: 2,
//   OVAL: 3,
//   LINE: 4,
//   POLYLINE: 5,
//   POLYGON: 6,
//   PATH: 7,
//   TEXT: 8,
//   IMAGE: 9,
//   GROUP: 10,
//   LAYER: 11,
//   SYMBOL: 12,
//   POLYLINECONTAINER: 13,
//   POLYPOLYLINE: 14,
//   SHAPECOPY: 15,
//   SHAPECONTAINER: 16
// }

// ListManager.CursorType = {
//   AUTO: 'cur-auto',
//   DEFAULT: 'cur-default',
//   NONE: 'cur-none',
//   CONTEXT_MENU: 'cur-context-menu',
//   HELP: 'cur-help',
//   POINTER: 'cur-pointer',
//   PROGRESS: 'cur-progress',
//   BUSY: 'cur-wait',
//   CELL: 'cur-cell',
//   CROSSHAIR: 'cur-crosshair',
//   TEXT: 'cur-text',
//   VERTICAL_TEXT: 'cur-vertical-text',
//   ALIAS: 'cur-alias',
//   COPY: 'cur-copy',
//   MOVE: 'cur-move',
//   NO_DROP: 'cur-no-drop',
//   NOT_ALLOWED: 'cur-not-allowed',
//   ALL_SCROLL: 'cur-all-scroll',
//   COL_RESIZE: 'cur-col-resize',
//   ROW_RESIZE: 'cur-row-resize',
//   RESIZE_T: 'cur-n-resize',
//   RESIZE_R: 'cur-e-resize',
//   RESIZE_B: 'cur-s-resize',
//   RESIZE_L: 'cur-w-resize',
//   RESIZE_TB: 'cur-ns-resize',
//   RESIZE_LR: 'cur-ew-resize',
//   RESIZE_RT: 'cur-ne-resize',
//   RESIZE_LT: 'cur-nw-resize',
//   RESIZE_RB: 'cur-se-resize',
//   RESIZE_LB: 'cur-sw-resize',
//   NESW_RESIZE: 'cur-nesw-resize',
//   NWSE_RESIZE: 'cur-nwse-resize',
//   ZOOM_IN: 'cur-zoom-in',
//   ZOOM_OUT: 'cur-zoom-out',
//   ZOOM_GRAB: 'cur-zoom-grab',
//   ZOOM_GRABBING: 'cur-zoom-grabbing',
//   ANCHOR: 'cur-anchor',
//   PAINT: 'cur-paint',
//   ROTATE: 'cur-rotate',
//   DROPLIB: 'cur-droplib',
//   EDIT_X: 'cur-pencil-x',
//   EDIT: 'cur-pencil',
//   EDIT_CLOSE: 'cur-pencil-close',
//   ADD: 'cur-add',
//   STAMP: 'cur-stamp',
//   ARR_DOWN: 'cur-arr-down',
//   ARR_RIGHT: 'cur-arr-right',
//   BRUSH: 'cur-brush',
//   BRUSH_EDIT: 'cur-brush-edit',
//   BRUSH_CELL: 'cur-brush-cell',
//   BRUSH_TABLE: 'cur-brush-table',
//   ADD_RIGHT: 'cur-add-right',
//   ADD_LEFT: 'cur-add-left',
//   ADD_UP: 'cur-add-up',
//   ADD_DOWN: 'cur-add-down',
//   ADD_PLUS: 'cur-add-plus',
//   GRAB: 'cur-grab'
// }


ListManager.EffectType = {
  DROPSHADOW: {
    id: 'SHD',
    outside: !0
  },
  CASTSHADOW: {
    id: 'SHC',
    outside: !0
  },
  GLOW: {
    id: 'GLW',
    outside: !0
  },
  REFLECT: {
    id: 'REFL',
    outside: !0
  },
  BEVEL: {
    id: 'BVL',
    inside: !0
  },
  GLOSS: {
    id: 'GLOSS',
    inside: !0
  },
  INNERGLOW: {
    id: 'IGLW',
    inside: !0
  },
  INNERSHADOW: {
    id: 'ISHD',
    inside: !0
  },
  RECOLOR: {
    id: 'RCLR',
    inside: !0
  }
}

// ListManager.EventBehavior = {
//   NORMAL: 'visiblePainted',
//   INSIDE: 'visibleFill',
//   OUTSIDE: 'visibleStroke',
//   ALL: 'visible',
//   HIDDEN: 'painted',
//   HIDDEN_IN: 'fill',
//   HIDDEN_OUT: 'stroke',
//   HIDDEN_ALL: 'all',
//   NONE: 'none'
// }


// ListManager.Constants = {
//   FilePath_ImageKnobs: '../../../styles/img/knobs/',
//   Knob_ExpandDiag1: 'expand-diagonal-handle-1.svg',
//   Knob_ExpandDiag2: 'expand-diagonal-handle-2.svg',
//   Knob_ExpandHoriz: 'expand-horizontal-handle.svg',
//   Knob_ExpandVert: 'expand-vertical-handle.svg',
// }


// ListManager.CursorState = {
//   NONE: 0,
//   EDITONLY: 1,
//   EDITLINK: 2,
//   LINKONLY: 3
// }


export default ListManager;
