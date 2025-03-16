

class OptConstant {

  static CSType = {
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

  static ShapeType = {
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

  static EventBehavior = {
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

  static ExportType = {
    None: 0,
    PNG: 2,
    SVG: 3,
    JPEG: 13,
  }

  static LineTypes = {
    SedLsNone: 0,
    SedLsComm: 1,
    SedLsDigi: 2,
    SedLsChord: 3,
    SedLsWall: 4,
    SedLsMeasuringTape: 5
  }

  static SVGPathSeg = {
    PATHSEG_UNKNOWN: 0,
    PATHSEG_CLOSEPATH: 1,
    PATHSEG_MOVETO_ABS: 2,
    PATHSEG_MOVETO_REL: 3,
    PATHSEG_LINETO_ABS: 4,
    PATHSEG_LINETO_REL: 5,
    PATHSEG_CURVETO_CUBIC_ABS: 6,
    PATHSEG_CURVETO_CUBIC_REL: 7,
    PATHSEG_CURVETO_QUADRATIC_ABS: 8,
    PATHSEG_CURVETO_QUADRATIC_REL: 9,
    PATHSEG_ARC_ABS: 10,
    PATHSEG_ARC_REL: 11,
    PATHSEG_LINETO_HORIZONTAL_ABS: 12,
    PATHSEG_LINETO_HORIZONTAL_REL: 13,
    PATHSEG_LINETO_VERTICAL_ABS: 14,
    PATHSEG_LINETO_VERTICAL_REL: 15,
    PATHSEG_CURVETO_CUBIC_SMOOTH_ABS: 16,
    PATHSEG_CURVETO_CUBIC_SMOOTH_REL: 17,
    PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: 18,
    PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: 19
  }

  static ObjectTypes = {
    SED_Shape: 0,
    SED_LineD: 1,
    SED_SegL: 2,
    SED_Array: 3,
    SED_PolyL: 4,
    SED_NURBS: 501,
    SED_NURBSSEG: 502,
    SED_ELLIPSE: 503,
    SED_ELLIPSEEND: 504,
    SED_QUADBEZ: 505,
    SED_QUADBEZCON: 506,
    SED_CUBEBEZ: 507,
    SED_CUBEBEZCON: 508,
    SED_SPLINE: 509,
    SED_SPLINECON: 510,
    SED_MOVETO: 600,
    SED_MOVETO_NEWPOLY: 601,
    SED_Freehand: 7
  }

  static LineType = {
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


  static ArcQuad = {
    SD_PLA_TL: 0,
    SD_PLA_BL: 1,
    SD_PLA_BR: 2,
    SD_PLA_TR: 3
  }

  static ObjMoreFlags = {
    SED_MF_FixedRR: 64,
    SED_MF_Container: 128,
    SED_MF_UseInfoNoteIcon: 256,
    SED_MF_ContainerChild: 512,
    SED_MF_AutoContainer: 1024,
    SED_MF_Frame_AllowNesting: 2048,
    SED_MF_Frame_Group: 4096
  }


  static Defines = {
    SED_CDim: 30000,
    MetricConv: 2.54,
    CONNECTPT_DIM: 7,
    CONNECTPT_LINE_DIM: 16,
    // JOINPT_DIM: 10,
    JOINPT_LINE_DIM: 32,
    SED_MinWid: 1,
    NPOLYPTS: 100,
    SED_RoundFactor: 0.292893218,
    LongIntMax: 2147483647,
    SED_HorizOnly: 1,
    SED_VertOnly: 2,
    SED_SegMinLen: 4,
    SED_SegMinSeg: 4,
    // SD_MaxLongDim: 10000000,
    SED_SegDefLen: 25,
    SED_Slop: 7,
    // SED_EdgeSlop: 5,
    SED_SlopShapeExtra: 10,
    SED_ConnectorSlop: 25,
    SED_FlowConnectorSlop: 75,
    SED_FlowRadialSlop: 150,
    SED_FlowConnectorDisp: 50,
    SED_KnobSize: 9,
    SED_RKnobSize: 7,
    SED_CKnobSize: 14,
    SED_MinDim: 4,
    Action: 'act_',
    HitAreas: 'hitareas_',
    // TableRowHit: 'table_rowhit',
    // TableRowHitHidden: 'table_rowhithidden',
    // TableRowSelection: 'table_rowselection',
    // TableColHit: 'table_colhit',
    // TableColHitHidden: 'table_colhithidden',
    // TableColSelection: 'table_colselection',
    // TableCellHit: 'table_cellhit',
    // TableTextHit: 'table_texthit',
    // TableSelection: 'table_selection',
    // TableCells: 'table_cells',
    // TableRowZone: 'table_rowzone',
    // TableColZone: 'table_colzone',
    // TableZoneDim: 3,
    GraphTextHit: 'graph_texthit',
    // TableCellFrame: 'table_cellframe',
    // TableCellSeparator: 'table_menuseparator',
    // TableCellNoHit: 'table_cellnohit',
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
    // DEFAULT_NONWORKINGDAYS: 130,
    SED_DefTMargin: 2,
    // DefaultStyle: 'Style7',
    TextBlockStyle: 'Text Block',
    // D3Style: 'D3',
    // GanttBarDefaultStyle: 'Remaining',
    DefMargin: 50,
    // SED_MaxLineThick: 48,
    // SED_MaxJSLineThick: 8,
    SED_DNULL: 4294967295,
    DefRRect: 0.2,
    DefFixedRRect: 0.05,
    // Icon_Person: 2,
    // Icon_Dim: 18,
    Shape_Width: 150,
    Shape_Height: 75,
    Shape_Square: 100,
    SDMAXHOPS: 32,
    // SED_MaxPoints: 16000,
    // SED_PolyLNPts: 301,
    // HOPPOLYPTS: 25,
    // MAXARRAYSPACING: 1000,
    // SED_DefThick: 6,
    MaxWorkDimX: 320000,
    MaxWorkDimY: 320000,
    // CITreeSpacing: 36,
    CITreeSpacingExtra: 16,
    Connector_PlusPath: 'assets/images/connector/plus.svg',
    Connector_MinusPath: 'assets/images/connector/minus.svg',
    Connector_Move_Vertical_Path: 'assets/images/connector/move-vertical.svg',
    Connector_Move_Horizontal_Path: 'assets/images/connector/move-horizontal.svg',
    Floorplan_WallOpeningID: '6f8f8fce-dc39-40ec-8b44-3bc91897ca2b',
    // Stickynote_SymbolID: '20b1b997-2ad1-461e-8cb7-c16920498da9',
    ActionArrowSizeH: 20,
    ActionArrowSizeV: 13,
    baseArrowSlop: 7,
    connectorArrowSlop: 25,
    // Swimlane_Width: 150,
    // Swimlane_Height: 75,
    // MaxUserLayers: 32,
    MinSidePointLength: 40,
    DefaultRulerMajor: 100,
    // STANDARD_INTERIOR_WALL: 8.33325,
    // STANDARD_EXTERIOR_WALL: 12.5,
    // METRIC_INTERIOR_WALL: 11.811023622047243,
    // METRIC_EXTERIOR_WALL: 15.74796,
    AnnoHotDist: 200,
    RRectFixedDim: 100,
    MinLineDistanceForDeterminingOrientation: 0.2,
    // Note_TextMargin: 6,
    // Note_FontSize: 12,
    // Note_Spacing: 0.1,
    IconShapeBottomOffset: 2,
    iconShapeRightOffset: 2,
    // TimelineRowHeight: 25,
    // NoteHeight: 20,
    // SVGIconIndex: 450,
    // MinCellDim: 3,
    // MaxRecentSymbols: 8,
    // MaxSwimlanes: 100,
    // SwimlaneGap: 20,
    // FrameGap: 20,
    // FrameTitleHeight: 40,
    // FrameTitleWidth: 200,
    // FrameFillColor: '#F5F6F7',
    // FrameLineColor: '#DDDDDD',
    // FrameTextColor: '#333333',
    DefaultLayerName: 'Layer-1',
    // MinLineDrawGap: 20,
    //CustomSymbolSignature: 'JSCustomSymbol',
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

  public static ExtraFlags = {
    // SEDE_NoColor: 1,
    // SEDE_NoShadow: 2,
    // SEDE_NoTShadow: 4,
    SEDE_FlipHoriz: 8,
    SEDE_FlipVert: 16,
    SEDE_NoRotate: 32,
    // SEDE_OldHookPt: 64,
    // SEDE_PermAssoc: 128,
    // SEDE_TableFit: 256,
    // SEDE_TableActive: 512,
    // SEDE_License: 1024,
    // SEDE_PhotoPH: 2048,
    // SEDE_ShareTable: 4096,
    // SEDE_ShareProp: 8192,
    // SEDE_AutoParent: 16384,
    // SEDE_AutoNumber: 32768,
    // SEDE_AutoChild: 65536,
    // SEDE_ShareScale: 131072,
    // SEDE_GroupHasScript: 262144,
    // SEDE_IsPhotoTitle: 524288,
    SEDE_SideKnobs: 1048576,
    SEDE_ConnToConn: 2097152,
    // SEDE_ConnToShapes: 4194304,
    SEDE_NoDelete: 8388608,
    // SEDE_LinkVCenter: 16777216,
    // SEDE_MaintainLinkedObjOrientation: 16777216,
    // SEDE_ImageDup: 33554432,
    // SEDE_ComboSelect: 67108864,
    SEDE_CollapseConn: 134217728,
    // SEDE_ExtraPolySegs: 268435456,
    // SEDE_DataUpdate: 536870912,
    // SEDE_NoDraw: 1073741824,
    SEDE_DeleteOnUnhook: 2147483648
  }

  static DrawingObjectBaseClass = {
    SHAPE: 0,
    LINE: 1,
    CONNECTOR: 3
  }



  static ActionArrow = {
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

  static SVGElementClass = {
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

  static ContentType = {
    NONE: 1,
    TEXT: 2,
    TABLE: 3,
    GRAPH: 4
  }

  static GrowBehavior = {
    ALL: 0,
    HCONSTRAIN: 1,
    VCONSTRAIN: 2,
    ProPortional: 3
  }

  static LineOrientation = {
    NONE: 1,
    Horizontal: 2,
    Vertical: 3,
    DIAGONAL_TLRB: 4,
    DIAGONAL_TRBL: 5
  }


  static HitAreaType = {
    CONNECTOR_COLLAPSE: 1,
    CONNECTOR_EXPAND: 2,
    EDITDIMENSIONTEXT: 3
  }

  static ShapeIconType = {
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


  static ActionTriggerType = {
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

  static CollabSVGEventTypes = {
    Object_Move: 1,
    Shape_Grow: 2,
    Table_GrowColumn: 3,
    TextEntry: 4
  }

  static LineAngleDimensionDefs = {
    ANGLEDIMENSION_ARROWHEAD_SIZE: 10,
    ANGLEDIMENSION_ARROWHEAD_WIDTH: 4,
    ANGLEDIMENSION_PREFERRED_ARROWSTEM_MINIMUM: 4,
    ANGLEDIMENSION_PREFERRED_BISECTOR_LEN: 75
  }

  static Array_Flags = {
    Array_LeaveA_Cl: 1,
    Array_LeaveA_Cr: 1
  }


  static SEDA_Styles = {
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

  static ConnectorDefines = {
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

  static SessionFlags = {
    // SEDS_Active: 1,
    // SEDS_Snap: 2,
    // SEDS_InLink: 4,
    SEDS_LLink: 8,
    SEDS_SLink: 16,
    // SEDS_HorizText: 64,
    // SEDS_TabNext: 128,
    SEDS_AttLink: 256,
    // SEDS_SwitchSpell: 512,
    SEDS_FreeHand: 1024,
    SEDS_NoTreeOverlap: 2048,
    SEDS_AllowHops: 4096,
    // SEDS_AutoConnect: 8192,
    // SEDS_NoSideHitConvert: 16384,
    // SEDS_Bk_Tile: 32768,
    // SEDS_LockLayers: 65536,
    // SEDS_AutoInsert: 131072,
    // SEDS_SegLLinkToLinesOnly: 262144,
    SEDS_AutoFormat: 524288,
    SEDS_HideConnExpand: 1048576,
    SEDS_IsFlowChart: 2097152,
    // SEDS_NoAnimate: 4194304,
    // SEDS_AllowShapeReplace: 8388608,
    // SEDS_RetiredFlag: 16777216,
    // SEDS_ShowTaskIcons: 33554432,
    SEDS_NoStepFormatting: 1073741824,
    // SEDS_NoPageBreakLines: 2147483648
  }

  static ContentHeaderFlags = {
    // CT_OnePage: 16,
    // CT_AutoSpell: 32,
    CT_DA_Pages: 1024,
    // CT_DA_Limit: 2048,
    CT_DA_NoAuto: 4096,
    // CT_HideLeftPanel: 16384,
    // CT_SymbolSearchCombine: 32768,
    CT_ShowRulers: 65536,
    CT_ShowGrid: 131072,
    CT_SnapToGridTL: 262144,
    CT_SnapToGridC: 524288,
    CT_SnapToShapes_Off: 1048576,
    CT_ShowPageDividers: 2097152,
    // CT_TaskChanged: 268435456
  }

  static HookPts = {
    SED_KTL: 1,
    SED_KTR: 2,
    // SED_KBL: 3,
    // SED_KBR: 4,
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
    // SED_AKCTL: 301,
    SED_AKCT: 305,
    SED_AKCB: 306,
    SED_AKCL: 307,
    SED_AKCR: 308,
    // SED_AKCC: 309,
    SED_WTL: 321,
    SED_WTR: 322,
    SED_WBL: 323,
    SED_WBR: 324,
    SED_CustomBase: 500
  }

  static LineSubclass = {
    SED_LCH: 0,
    SED_LCD: 1,
    SED_LCV: 2
  }

  static SeglTypes = {
    SED_L_Line: 0,
    SED_L_Arc: 1
  }



  static ModalOperations = {
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




}

export default OptConstant
