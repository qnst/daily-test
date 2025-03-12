

import T3DataStream from "../Util/T3DataStream"

class ShapeConstant {

  static LineToolTypes = {
    StraightLine: 'line',
    ArcLine: 'arcLine',
    ArcSegmentedLine: 'arcSegLine',
    SegmentedLine: 'segLine',
    PolyLine: 'polyLine',
    PolyLineContainer: 'polyLineContainer',
    MoveWall: 'moveWall',
    CommLine: 'commline',
    DigiLine: 'digiline',
    FreehandLine: 'freehandLine'
  }

  /**
   * Defines pattern data for different line styles
   * Each entry represents a pattern of dashes and spaces
   * The first value (0) represents a solid line
   * Other entries are comma-separated values indicating lengths of dashes and gaps in sequence
   * Used for rendering different line types in drawing applications
   */
  static LinePatternData = [
    0,
    '1,1',       // Dotted line (equal dash and gap lengths)
    '3,1',       // Dashed line (dash three times longer than gap)
    '3,1,1,1',   // Dash-dot line (long dash followed by short dash)
    '3,1,1,1,1,1' // Dash-dot-dot line (long dash followed by two short dashes)
  ]

  static WinLinePatterns = {
    SEP_None: 0,
    SEP_Solid: 1,
    SEP_Dotted: 2,
    SEP_Dashed: 3,
    SEP_DDashed: 4,
    SEP_DDDashed: 5,
    SEP_DoubleLine: 6,
    SEP_FilledLine: 7
  }

  static SDGHatchStyleTotal = 53

  static Contexts = {
    None: - 1,
    All: 0,
    Text: 1,
    Table: 2,
    Automation: 3,
    DimensionText: 4,
    FloorPlan: 5,
    Note: 6,
    Navigation: 7,
    AutomationNoCtrl: 8,
    ReadOnly: 9
  }

  static TextureScale = function () {
    this.Units = 0;
    this.Scale = 0;
    this.RWidth = 0;
    this.AlignmentScalar = 0;
    this.Flags = 0;
  }

  static LinkFlags = {
    SED_L_DELT: 1,
    SED_L_DELL: 2,
    SED_L_CHANGE: 4,
    SED_L_BREAK: 8,
    SED_L_MOVE: 16,
    SED_L_WASMOVE: 32
  }

  static LibraryFlags = {
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

  static OpCodeName = {
    cVersion: 32769,
    cEndFile: 16385,
    cHeader: 32770,
    cHeaderEnd: 16386,
    cPage: 3,
    cWdeVMode: 4,
    cPrintErst: 5,
    cFontList: 32774,
    cFontListEnd: 16390,
    cFontName: 7,
    cColorTable: 8,
    SDF_C_THUMBNAIL: 9,
    SDF_C_TOOLBARPATH: 10,
    SDF_C_LICENSE: 11,
    SDF_C_ADVISOR: 12,
    SDF_C_PANELINFO: 13,
    SDF_C_CTHUMBNAIL: 14,
    SDF_C_KEYWORDS: 15,
    SDF_C_ADVISORURL: 16,
    SDF_C_DOCPROPERTY: 17,
    SDF_C_EXPORTPATH: 18,
    SDF_C_PROPPWORD: 19,
    SDF_C_RUNSCRIPTPATH: 20,
    SDF_C_LIBLIST7: 32789,
    SDF_C_LIBLIST7_END: 16405,
    SDF_C_LIBLIST7_ENTRY: 22,
    SDF_C_LIBLIST7_PATH: 23,
    SDF_C_LIBLIST: 32933,
    SDF_C_LIBLIST_END: 16549,
    SDF_C_LIBLIST_ENTRY: 166,
    SDF_C_LIBLIST_PATH: 167,
    SDF_C_WIZLIST: 32792,
    SDF_C_WIZLIST_END: 16408,
    SDF_C_WIZLIST_NAME: 25,
    SDF_C_DIMFONT: 26,
    SDF_C_ONESTEPFOLDER: 27,
    SDF_C_TRIALDATA: 28,
    SDF_C_CMSDATA: 29,
    SDF_C_DRAW: 32800,
    SDF_C_DRAW_END: 16416,
    SDF_C_DRAWGROUP: 32801,
    SDF_C_DRAWGROUP_END: 16417,
    SDF_C_DRAWOBJ: 32802,
    SDF_C_DRAWOBJ_END: 16418,
    SDF_C_DRAWFILL: 35,
    SDF_C_DRAWBORDER: 36,
    SDF_C_DRAWLINE: 37,
    SDF_C_DRAWTEXT: 38,
    SDF_C_DRAWSEGL: 39,
    SDF_C_DRAWHOOK: 40,
    SDF_C_DRAWLINK6: 41,
    SDF_C_DRAWJUMP: 48,
    SDF_C_DRAWPOLY: 32817,
    SDF_C_DRAWPOLY_END: 16433,
    SDF_C_DRAWPOLYSEG: 50,
    SDF_C_DRAWARRAY: 32819,
    SDF_C_DRAWARRAY_END: 16435,
    SDF_C_DRAWARRAYHOOK: 52,
    SDF_C_DRAWEXTRA: 53,
    SDF_C_DRAWOBJ5: 54,
    SDF_C_DRAWOBJ6: 55,
    SDF_C_BEGIN_LAYER: 32824,
    SDF_C_END_LAYER: 16440,
    SDF_C_LAYERFLAGS: 57,
    SDF_C_LAYERNAME: 58,
    SDF_C_DRAWLINK: 59,
    SDF_C_DRAWOBJ7: 60,
    SDF_C_CONNECTPOINT: 61,
    SDF_C_DRAW7: 62,
    SDF_C_DRAWTXSCALE: 63,
    SDF_C_TEXT: 32832,
    SDF_C_TEXT_END: 16448,
    SDF_C_LONGTEXT: 32842,
    SDF_C_LONGTEXT_END: 16448,
    SDF_C_TEXTCHAR: 65,
    SDF_C_TEXTRUN: 66,
    SDF_C_TEXTSTYLE: 67,
    SDF_C_TEXTLINK: 68,
    SDF_C_TEXTDATA: 69,
    SDF_C_DRAWIMAGE: 71,
    SDF_C_DRAWBITMAP: 72,
    SDF_C_DRAWMETA: 73,
    SDF_C_LAYERTYPE: 74,
    SDF_C_DRAWARRAYTEXT: 75,
    SDF_C_ARROWMETA: 80,
    SDF_C_OLEHEADER: 81,
    SDF_C_OLESTORAGE: 82,
    SDF_C_TABLE: 32851,
    SDF_C_TABLE_END: 16467,
    SDF_C_TABLEROW: 84,
    SDF_C_TABLECELL: 85,
    SDF_C_INSTSIZE: 86,
    SDF_C_TLICENSE: 87,
    SDF_C_DRAWPNG: 88,
    SDF_C_DRAWJPG: 89,
    SDF_C_NATIVESTORAGE: 90,
    SDF_C_TABLECELLPROP: 91,
    SDF_C_DRAWBTXSCALE: 92,
    SDF_C_DEFLBTXSCALE: 93,
    SDF_C_DEFSBTXSCALE: 94,
    SDF_C_DEFTXSCALE: 95,
    SDF_C_HILITELIST: 32864,
    SDF_C_HILITELIST_END: 16480,
    SDF_C_HILITE: 97,
    SDF_C_PROPERTY: 112,
    SDF_C_BEGIN_PR_LANG: 32881,
    SDF_C_END_PR_LANG: 16497,
    SDF_C_PR_LANGNAME: 114,
    SDF_C_PR_SCRIPT: 115,
    SDF_C_PR_FSCRIPT: 116,
    SDF_C_PR_INCLUDE: 121,
    SDF_C_PR_EXTRA: 122,
    SDF_C_PR_PUBLIC: 123,
    SDF_C_PR_EXTRA1: 124,
    SDF_C_PR_LANGEXT: 125,
    SDF_C_PR_LANGREC: 126,
    SDF_C_PR_LANGSCHEMA: 127,
    SDF_C_BEGIN_PR_FIELD: 32885,
    SDF_C_END_PR_FIELD: 16501,
    SDF_C_PR_FIELDNAME: 118,
    SDF_C_PR_FIELDVALUE: 119,
    SDF_C_PR_FIELDHEAD: 120,
    SDF_C_PR_FIELDVLIST: 128,
    SDF_C_BEGIN_PHOTOPROP: 32896,
    SDF_C_END_PHOTOPROP: 16512,
    SDF_C_BEGIN_FILL: 32897,
    SDF_C_END_FILL: 16513,
    SDF_C_BEGIN_LINE: 32898,
    SDF_C_END_LINE: 16514,
    SDF_C_BEGIN_TEXTF: 32899,
    SDF_C_END_TEXTF: 16515,
    SDF_C_BEGIN_PAINT: 32907,
    SDF_C_END_PAINT: 16523,
    SDF_C_BEGIN_STYLELIST: 32905,
    SDF_C_END_STYLELIST: 16521,
    SDF_C_BEGIN_STYLE: 32906,
    SDF_C_END_STYLE: 16522,
    SDF_C_BEGIN_THEME: 32908,
    SDF_C_END_THEME: 16524,
    SDF_C_GRAPHSTYLE: 151,
    SDF_C_GRADIENT: 132,
    SDF_C_TEXTURE: 133,
    SDF_C_HATCH: 134,
    SDF_C_EFFECT1: 135,
    SDF_C_OUTSIDE1: 136,
    SDF_C_FILLEDLINE: 137,
    SDF_C_THEME_COLOR: 141,
    SDF_C_THEME_TEXTURE: 142,
    SDF_C_THEME_FONT: 143,
    SDF_C_OUTSIDE: 161,
    SDF_C_THEME_CAT: 162,
    SDF_C_EFFECT: 163,
    SDF_C_DESCRIPTION: 164,
    SDF_C_DRAW8: 32944,
    SDF_C_DRAW8_END: 16560,
    SDF_C_DRAWOBJ8: 32945,
    SDF_C_DRAWOBJ8_END: 16561,
    SDF_C_DRAWARROW: 178,
    SDF_C_LONGTEXT8: 32947,
    SDF_C_LONGTEXT8_END: 16563,
    SDF_C_COMMENT: 32983,
    SDF_C_COMMENT_END: 16599,
    SDF_C_TABLECELL8: 180,
    SDF_C_DRAWIMAGE8: 185,
    SDF_C_BEGIN_HLINE: 32949,
    SDF_C_BEGIN_VLINE: 32950,
    SDF_C_BEGIN_NAMETEXTF: 32951,
    SDF_C_GUIDE: 184,
    SDF_C_TASKPANEL: 186,
    SDF_C_TABLECELLEXTRAOLD: 187,
    SDF_C_HEAD_UIINFO: 188,
    SDF_C_TABLECELLEXTRA: 189,
    SDF_C_BEGIN_OUTSIDELIST: 32958,
    SDF_C_END_OUTSIDELIST: 16574,
    SDF_C_BEGIN_INSIDELIST: 32959,
    SDF_C_END_INSIDELIST: 16575,
    SDF_C_INSIDEEFFECT: 192,
    SDF_C_BEGIN_GRADIENTLIST: 32967,
    SDF_C_END_GRADIENTLIST: 16583,
    SDF_C_THEMEGRADIENT: 200,
    SDF_C_INK: 193,
    SDF_C_INK_PEN_IMAGE: 194,
    SDF_C_INK_HIGHLIGHT_IMAGE: 195,
    SDF_C_GRAPH: 32979,
    SDF_C_GRAPH_END: 16595,
    SDF_C_GRAPH_AXIS: 212,
    SDF_C_GRAPH_TITLE: 201,
    SDF_C_GRAPH_LABEL: 202,
    SDF_C_GRAPH_LEGEND_BEGIN: 32971,
    SDF_C_GRAPH_LEGEND_END: 16587,
    SDF_C_GRAPH_LEGEND: 204,
    SDF_C_GRAPH_POINT: 205,
    SDF_C_SDDATA: 209,
    SDF_C_SDDATA64: 227,
    SDF_C_DEFAULTLIBS: 197,
    SDF_C_ORIGTEMPLATE: 198,
    SDF_C_ORGCHARTTABLE: 199,
    SDF_C_OBJDATA: 210,
    SDF_C_CELL_STYLENAME: 213,
    SDF_C_LEFTPANELINFO: 214,
    SDF_C_TIMELINEINFO: 215,
    SDF_C_POLYSEGEXPLICITPOINTS: 216,
    SDF_C_MARKUP: 32985,
    SDF_C_MARKUP_END: 16601,
    SDF_C_NATIVEEMBEDSTORAGE: 218,
    SDF_C_FONTNAME12: 219,
    SDF_C_FONTNAME15: 238,
    SDF_C_BEGIN_THEME12: 32988,
    SDF_C_END_THEME12: 16604,
    SDF_C_THEME_FONT12: 221,
    SDF_C_GRAPHSTYLE12: 222,
    SDF_C_DRAW12: 32991,
    SDF_C_DRAW12_END: 16607,
    SDF_C_TABLEVP: 32993,
    SDF_C_TABLEVP_END: 16609,
    SDF_C_TABLEROWVP: 226,
    SDF_C_LAYERLIST: 239,
    SDF_C_NATIVEID: 240,
    SDF_C_NATIVEBLOCK: 241,
    SDF_C_NATIVEWINBLOCK: 242,
    SDF_C_IMAGEID: 243,
    SDF_C_IMAGEBLOCK: 244,
    SDF_C_TABLEID: 245,
    SDF_C_TABLEBLOCK: 246,
    SDF_C_NOTEID: 247,
    SDF_O_RULER: 2049,
    SDF_C_DRAWSVG: 236,
    SDF_C_EMFHASH: 237,
    SDF_C_SVGFRAGMENTID: 248,
    SDF_C_RICHGRADIENT: 249,
    SDF_C_RICHGRADIENTSTOP: 250,
    SDF_C_BLOCKDIRECTORY: 251,
    SDF_C_DRAWPREVIEWPNG: 252,
    SDF_C_EMFID: 253,
    SDF_C_EMFBLOCK: 254,
    SDF_C_SYMBOLNAME: 258,
    SDF_C_GANTTINFO: 259,
    SDF_C_OLESTORAGEID: 255,
    SDF_C_GRAPHID: 256,
    SDF_C_GRAPHBLOCK: 257,
    SDF_C_GANTTINFOID: 260,
    SDF_C_GANTTINFOBLOCK: 261,
    SDF_C_SDDATA64C: 262,
    SDF_C_D3SETTINGS: 263,
    SDF_C_EXPANDEDVIEWID: 264,
    SDF_C_EXPANDEDVIEWBLOCK: 265,
    SDF_C_EXPANDEDVIEW: 266,
    SDF_C_SVGIMAGEID: 267,
    SDF_C_LINEDRAWLIST: 268,
    // SDF_C_CLOUDCOMMENTBLOCK: 270,
    SDF_C_SYMBOLSEARCHSTRING: 271,
    SDF_C_SEARCHLIB: 33040,
    SDF_C_SEARCHLIB_END: 16656,
    SDF_C_SEARCHLIB_ID: 273,
    SDF_C_SEARCHLIB_NAME: 274,
    SDF_C_SEARCHLIBSYMBOL_ID: 275,
    SDF_C_SEARCHLIBSYMBOL_NAME: 276,
    SDF_C_LIB_COLLAPSED: 277,
    SDF_C_CURRENTSYMBOL_ID: 278,
    SDF_C_LIBLIST_SEARCH_RESULT_ID: 279,
    SDF_C_SEARCHLIB_COLLAPSED: 280,
    SDF_C_DRAWCONTAINER: 33049,
    SDF_C_DRAWCONTAINER_END: 16665,
    SDF_C_DRAWCONTAINERHOOK: 282,
    SDF_C_IMAGEURL: 283,
    SDF_C_BUSINESSMODULE: 284,
    SDF_C_RECENTSYMBOLS_BEGIN: 33053,
    SDF_C_RECENTSYMBOLS_END: 16669,
    SDF_C_RECENTSYMBOL_ID: 286,
    SDF_C_RECENTSYMBOL_NAME: 287,
    SDF_C_SEARCHLIB_HIDDEN: 288,
    SDF_C_TOOLPALETTES_BEGIN: 33057,
    SDF_C_TOOLPALETTES_END: 16673,
    SDF_C_TOOLPALETTES_NAME: 290,
    SDF_C_TOOLPALETTES_COLLAPSED: 291,
    SDF_C_RECENTSYMBOL_NOMENU: 292,
    SDF_C_BUSINESSNAME_STR: 293,
    SDF_C_LIBLIST_GUID: 294,
    SDF_C_PARENTPAGEID: 295,
    SDF_C_FREEHANDLINE: 296,
    SDF_O_TEXTURELIST: 34934,
    SDF_O_TEXTURELIST_END: 17526,
    SDF_O_TEXTURE: 2167,
    SDF_O_TEXTURENAME: 2168,
    SDF_O_TEXTUREDATA: 2169,
    SDF_O_TEXTURECATNAME: 2177,
    SDF_O_TEXTUREEXTRA: 2178
  }

  static SDROpCodesByCode = {
    32769: 'cVersion',
    16385: 'cEndFile',
    32770: 'cHeader',
    16386: 'cHeaderEnd',
    3: 'cPage',
    4: 'cWdeVMode',
    5: 'cPrintErst',
    32774: 'cFontList',
    16390: 'cFontListEnd',
    7: 'cFontName',
    8: 'cColorTable',
    9: 'SDF_C_THUMBNAIL',
    10: 'SDF_C_TOOLBARPATH',
    11: 'SDF_C_LICENSE',
    12: 'SDF_C_ADVISOR',
    13: 'SDF_C_PANELINFO',
    14: 'SDF_C_CTHUMBNAIL',
    15: 'SDF_C_KEYWORDS',
    16: 'SDF_C_ADVISORURL',
    17: 'SDF_C_DOCPROPERTY',
    18: 'SDF_C_EXPORTPATH',
    19: 'SDF_C_PROPPWORD',
    20: 'SDF_C_RUNSCRIPTPATH',
    32789: 'SDF_C_LIBLIST7',
    16405: 'SDF_C_LIBLIST7_END',
    22: 'SDF_C_LIBLIST7_ENTRY',
    23: 'SDF_C_LIBLIST7_PATH',
    32933: 'SDF_C_LIBLIST',
    16549: 'SDF_C_LIBLIST_END',
    166: 'SDF_C_LIBLIST_ENTRY',
    167: 'SDF_C_LIBLIST_PATH',
    32792: 'SDF_C_WIZLIST',
    16408: 'SDF_C_WIZLIST_END',
    25: 'SDF_C_WIZLIST_NAME',
    26: 'SDF_C_DIMFONT',
    27: 'SDF_C_ONESTEPFOLDER',
    28: 'SDF_C_TRIALDATA',
    29: 'SDF_C_CMSDATA',
    32800: 'SDF_C_DRAW',
    16416: 'SDF_C_DRAW_END',
    32801: 'SDF_C_DRAWGROUP',
    16417: 'SDF_C_DRAWGROUP_END',
    32802: 'SDF_C_DRAWOBJ',
    16418: 'SDF_C_DRAWOBJ_END',
    35: 'SDF_C_DRAWFILL',
    36: 'SDF_C_DRAWBORDER',
    37: 'SDF_C_DRAWLINE',
    38: 'SDF_C_DRAWTEXT',
    39: 'SDF_C_DRAWSEGL',
    40: 'SDF_C_DRAWHOOK',
    41: 'SDF_C_DRAWLINK6',
    48: 'SDF_C_DRAWJUMP',
    32817: 'SDF_C_DRAWPOLY',
    16433: 'SDF_C_DRAWPOLY_END',
    50: 'SDF_C_DRAWPOLYSEG',
    32819: 'SDF_C_DRAWARRAY',
    16435: 'SDF_C_DRAWARRAY_END',
    52: 'SDF_C_DRAWARRAYHOOK',
    53: 'SDF_C_DRAWEXTRA',
    54: 'SDF_C_DRAWOBJ5',
    55: 'SDF_C_DRAWOBJ6',
    32824: 'SDF_C_BEGIN_LAYER',
    16440: 'SDF_C_END_LAYER',
    57: 'SDF_C_LAYERFLAGS',
    58: 'SDF_C_LAYERNAME',
    59: 'SDF_C_DRAWLINK',
    60: 'SDF_C_DRAWOBJ7',
    61: 'SDF_C_CONNECTPOINT',
    62: 'SDF_C_DRAW7',
    63: 'SDF_C_DRAWTXSCALE',
    32832: 'SDF_C_TEXT',
    16448: 'SDF_C_TEXT_END',
    32842: 'SDF_C_LONGTEXT',
    65: 'SDF_C_TEXTCHAR',
    66: 'SDF_C_TEXTRUN',
    67: 'SDF_C_TEXTSTYLE',
    68: 'SDF_C_TEXTLINK',
    69: 'SDF_C_TEXTDATA',
    71: 'SDF_C_DRAWIMAGE',
    72: 'SDF_C_DRAWBITMAP',
    73: 'SDF_C_DRAWMETA',
    74: 'SDF_C_LAYERTYPE',
    75: 'SDF_C_DRAWARRAYTEXT',
    80: 'SDF_C_ARROWMETA',
    81: 'SDF_C_OLEHEADER',
    82: 'SDF_C_OLESTORAGE',
    32851: 'SDF_C_TABLE',
    16467: 'SDF_C_TABLE_END',
    84: 'SDF_C_TABLEROW',
    85: 'SDF_C_TABLECELL',
    86: 'SDF_C_INSTSIZE',
    87: 'SDF_C_TLICENSE',
    88: 'SDF_C_DRAWPNG',
    89: 'SDF_C_DRAWJPG',
    90: 'SDF_C_NATIVESTORAGE',
    91: 'SDF_C_TABLECELLPROP',
    92: 'SDF_C_DRAWBTXSCALE',
    93: 'SDF_C_DEFLBTXSCALE',
    94: 'SDF_C_DEFSBTXSCALE',
    95: 'SDF_C_DEFTXSCALE',
    32864: 'SDF_C_HILITELIST',
    16480: 'SDF_C_HILITELIST_END',
    97: 'SDF_C_HILITE',
    112: 'SDF_C_PROPERTY',
    32881: 'SDF_C_BEGIN_PR_LANG',
    16497: 'SDF_C_END_PR_LANG',
    114: 'SDF_C_PR_LANGNAME',
    115: 'SDF_C_PR_SCRIPT',
    116: 'SDF_C_PR_FSCRIPT',
    121: 'SDF_C_PR_INCLUDE',
    122: 'SDF_C_PR_EXTRA',
    123: 'SDF_C_PR_PUBLIC',
    124: 'SDF_C_PR_EXTRA1',
    125: 'SDF_C_PR_LANGEXT',
    126: 'SDF_C_PR_LANGREC',
    127: 'SDF_C_PR_LANGSCHEMA',
    32885: 'SDF_C_BEGIN_PR_FIELD',
    16501: 'SDF_C_END_PR_FIELD',
    118: 'SDF_C_PR_FIELDNAME',
    119: 'SDF_C_PR_FIELDVALUE',
    120: 'SDF_C_PR_FIELDHEAD',
    128: 'SDF_C_PR_FIELDVLIST',
    32896: 'SDF_C_BEGIN_PHOTOPROP',
    16512: 'SDF_C_END_PHOTOPROP',
    32897: 'SDF_C_BEGIN_FILL',
    16513: 'SDF_C_END_FILL',
    32898: 'SDF_C_BEGIN_LINE',
    16514: 'SDF_C_END_LINE',
    32899: 'SDF_C_BEGIN_TEXTF',
    16515: 'SDF_C_END_TEXTF',
    32907: 'SDF_C_BEGIN_PAINT',
    16523: 'SDF_C_END_PAINT',
    32905: 'SDF_C_BEGIN_STYLELIST',
    16521: 'SDF_C_END_STYLELIST',
    32906: 'SDF_C_BEGIN_STYLE',
    16522: 'SDF_C_END_STYLE',
    32908: 'SDF_C_BEGIN_THEME',
    16524: 'SDF_C_END_THEME',
    151: 'SDF_C_GRAPHSTYLE',
    132: 'SDF_C_GRADIENT',
    133: 'SDF_C_TEXTURE',
    134: 'SDF_C_HATCH',
    135: 'SDF_C_EFFECT1',
    136: 'SDF_C_OUTSIDE1',
    137: 'SDF_C_FILLEDLINE',
    141: 'SDF_C_THEME_COLOR',
    142: 'SDF_C_THEME_TEXTURE',
    143: 'SDF_C_THEME_FONT',
    161: 'SDF_C_OUTSIDE',
    162: 'SDF_C_THEME_CAT',
    163: 'SDF_C_EFFECT',
    164: 'SDF_C_DESCRIPTION',
    32944: 'SDF_C_DRAW8',
    16560: 'SDF_C_DRAW8_END',
    32945: 'SDF_C_DRAWOBJ8',
    16561: 'SDF_C_DRAWOBJ8_END',
    178: 'SDF_C_DRAWARROW',
    32947: 'SDF_C_LONGTEXT8',
    16563: 'SDF_C_LONGTEXT8_END',
    32983: 'SDF_C_COMMENT',
    16599: 'SDF_C_COMMENT_END',
    180: 'SDF_C_TABLECELL8',
    185: 'SDF_C_DRAWIMAGE8',
    32949: 'SDF_C_BEGIN_HLINE',
    32950: 'SDF_C_BEGIN_VLINE',
    32951: 'SDF_C_BEGIN_NAMETEXTF',
    184: 'SDF_C_GUIDE',
    186: 'SDF_C_TASKPANEL',
    187: 'SDF_C_TABLECELLEXTRAOLD',
    188: 'SDF_C_HEAD_UIINFO',
    189: 'SDF_C_TABLECELLEXTRA',
    32958: 'SDF_C_BEGIN_OUTSIDELIST',
    16574: 'SDF_C_END_OUTSIDELIST',
    32959: 'SDF_C_BEGIN_INSIDELIST',
    16575: 'SDF_C_END_INSIDELIST',
    192: 'SDF_C_INSIDEEFFECT',
    32967: 'SDF_C_BEGIN_GRADIENTLIST',
    16583: 'SDF_C_END_GRADIENTLIST',
    200: 'SDF_C_THEMEGRADIENT',
    193: 'SDF_C_INK',
    194: 'SDF_C_INK_PEN_IMAGE',
    195: 'SDF_C_INK_HIGHLIGHT_IMAGE',
    32979: 'SDF_C_GRAPH',
    16595: 'SDF_C_GRAPH_END',
    212: 'SDF_C_GRAPH_AXIS',
    201: 'SDF_C_GRAPH_TITLE',
    202: 'SDF_C_GRAPH_LABEL',
    32971: 'SDF_C_GRAPH_LEGEND_BEGIN',
    16587: 'SDF_C_GRAPH_LEGEND_END',
    204: 'SDF_C_GRAPH_LEGEND',
    205: 'SDF_C_GRAPH_POINT',
    209: 'SDF_C_SDDATA',
    227: 'SDF_C_SDDATA64',
    197: 'SDF_C_DEFAULTLIBS',
    198: 'SDF_C_ORIGTEMPLATE',
    199: 'SDF_C_ORGCHARTTABLE',
    210: 'SDF_C_OBJDATA',
    213: 'SDF_C_CELL_STYLENAME',
    214: 'SDF_C_LEFTPANELINFO',
    215: 'SDF_C_TIMELINEINFO',
    216: 'SDF_C_POLYSEGEXPLICITPOINTS',
    32985: 'SDF_C_MARKUP',
    16601: 'SDF_C_MARKUP_END',
    218: 'SDF_C_NATIVEEMBEDSTORAGE',
    219: 'SDF_C_FONTNAME12',
    32988: 'SDF_C_BEGIN_THEME12',
    16604: 'SDF_C_END_THEME12',
    221: 'SDF_C_THEME_FONT12',
    222: 'SDF_C_GRAPHSTYLE12',
    32991: 'SDF_C_DRAW12',
    16607: 'SDF_C_DRAW12_END',
    32993: 'SDF_C_TABLEVP',
    16609: 'SDF_C_TABLEVP_END',
    226: 'SDF_C_TABLEROWVP',
    2049: 'SDF_O_RULER',
    236: 'SDF_C_DRAWSVG',
    237: 'SDF_C_EMFHASH',
    238: 'SDF_C_FONTNAME15',
    239: 'SDF_C_LAYERLIST',
    240: 'SDF_C_NATIVEID',
    241: 'SDF_C_NATIVEBLOCK',
    242: 'SDF_C_NATIVEWINBLOCK',
    243: 'SDF_C_IMAGEID',
    244: 'SDF_C_IMAGEBLOCK',
    245: 'SDF_C_TABLEID',
    246: 'SDF_C_TABLEBLOCK',
    247: 'SDF_C_NOTEID',
    248: 'SDF_C_SVGFRAGMENTID',
    249: 'SDF_C_RICHGRADIENT',
    250: 'SDF_C_RICHGRADIENTSTOP',
    251: 'SDF_C_BLOCKDIRECTORY',
    252: 'SDF_C_DRAWPREVIEWPNG',
    253: 'SDF_C_EMFID',
    254: 'SDF_C_EMFBLOCK',
    255: 'SDF_C_OLESTORAGEID',
    256: 'SDF_C_GRAPHID',
    257: 'SDF_C_GRAPHBLOCK',
    258: 'SDF_C_SYMBOLNAME',
    259: 'SDF_C_GANTTINFO',
    260: 'SDF_C_GANTTINFOID',
    261: 'SDF_C_GANTTINFOBLOCK',
    262: 'SDF_C_SDDATA64C',
    263: 'SDF_C_D3SETTINGS',
    264: 'SDF_C_EXPANDEDVIEWID',
    265: 'SDF_C_EXPANDEDVIEWBLOCK',
    266: 'SDF_C_EXPANDEDVIEW',
    267: 'SDF_C_SVGIMAGEID',
    268: 'SDF_C_LINEDRAWLIST',
    // 270: 'SDF_C_CLOUDCOMMENTBLOCK',
    271: 'SDF_C_SYMBOLSEARCHSTRING',
    33040: 'SDF_C_SEARCHLIB',
    16656: 'SDF_C_SEARCHLIB_END',
    273: 'SDF_C_SEARCHLIB_ID',
    274: 'SDF_C_SEARCHLIB_NAME',
    275: 'SDF_C_SEARCHLIBSYMBOL_ID',
    276: 'SDF_C_SEARCHLIBSYMBOL_NAME',
    277: 'SDF_C_LIB_COLLAPSED',
    278: 'SDF_C_CURRENTSYMBOL_ID',
    279: 'SDF_C_LIBLIST_SEARCH_RESULT_ID',
    280: 'SDF_C_SEARCHLIB_COLLAPSED',
    33049: 'SDF_C_DRAWCONTAINER',
    16665: 'SDF_C_DRAWCONTAINER_END',
    282: 'SDF_C_DRAWCONTAINERHOOK',
    283: 'SDF_C_IMAGEURL',
    284: 'SDF_C_BUSINESSMODULE',
    33053: 'SDF_C_RECENTSYMBOLS_BEGIN',
    16669: 'SDF_C_RECENTSYMBOLS_END',
    286: 'SDF_C_RECENTSYMBOL_ID',
    287: 'SDF_C_RECENTSYMBOL_NAME',
    288: 'SDF_C_SEARCHLIB_HIDDEN',
    33057: 'SDF_C_TOOLPALETTES_BEGIN',
    16673: 'SDF_C_TOOLPALETTES_END',
    290: 'SDF_C_TOOLPALETTES_NAME',
    291: 'SDF_C_TOOLPALETTES_COLLAPSED',
    292: 'SDF_C_RECENTSYMBOL_NOMENU',
    293: 'SDF_C_BUSINESSNAME_STR',
    294: 'SDF_C_LIBLIST_GUID',
    295: 'SDF_C_PARENTPAGEID',
    296: 'SDF_C_FREEHANDLINE',
    34934: 'SDF_O_TEXTURELIST',
    17526: 'SDF_O_TEXTURELIST_END',
    2167: 'SDF_O_TEXTURE',
    2168: 'SDF_O_TEXTURENAME',
    2169: 'SDF_O_TEXTUREDATA',
    2177: 'SDF_O_TEXTURECATNAME',
    2178: 'SDF_O_TEXTUREEXTRA'
  }

  static SDRColorFilters = {
    SD_NOCOLOR_FILL: 1,
    SD_NOCOLOR_TEXTURE: 2,
    SD_NOCOLOR_LINE: 4,
    SD_NOCOLOR_LINETHICK: 8,
    SD_NOCOLOR_LINEPAT: 16,
    SD_NOCOLOR_LINEARROW: 32,
    SD_NOCOLOR_TEXT: 64,
    SD_NOCOLOR_OUTSIDE: 128,
    SD_NOCOLOR_EFFECT: 256,
    SD_NOCOLOR_STYLE: 512,
    SD_NOCOLOR_ALL: 1023,
    SD_NOCOLOR_RESIZE: 1024
  }

  static SDRFillTypes = {
    SDFILL_TRANSPARENT: 0,
    SDFILL_SOLID: 1,
    SDFILL_GRADIENT: 2,
    SDFILL_TEXTURE: 3,
    SDFILL_IMAGE: 4
  }

  static v6ColorIndexes = {
    Std_BorderIndex: 0,
    Std_LineIndex: 1,
    Std_FillIndex: 2,
    Std_TextIndex: 3,
    Std_ShadowIndex: 4,
    Std_BackIndex: 5,
    Std_HiliteIndex: 6
  }

  static v6ShadowStyles = {
    SED_Sh_None: 0,
    SED_Sh_RLine: 1,
    SED_Sh_SLine: 2,
    SED_Sh_Cont: 3,
    SED_Sh_Drop: 4,
    SED_Sh_FDrop: 5
  }

  static SDRObjectFlags = {
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
    SEDO_LinkCenter: 4194304,
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

  static SDRExtraFlags = {
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

  static v6FillTypes = {
    SEHollowIndex: 0,
    SEOpaqueIndex: 1
  }

  static LineDirFlags = {
    SED_LT_SLeft: 0,
    SED_LT_STop: 4,
    SED_LT_SRight: 8,
    SED_LT_SBottom: 12,
    SED_LT_ELeft: 0,
    SED_LT_ETop: 1,
    SED_LT_ERight: 2,
    SED_LT_EBottom: 3
  }

  static LineSubclass = {
    SED_LCH: 0,
    SED_LCD: 1,
    SED_LCV: 2
  }

  static OutEffect = {
    SDOUT_EFFECT_NONE: 0,
    SDOUT_EFFECT_DROP: 1,
    SDOUT_EFFECT_CAST: 2,
    SDOUT_EFFECT_GLOW: 3,
    SDOUT_EFFECT_REFL: 4
  }

  static FillEffect = {
    SDFILL_EFFECT_NONE: 0,
    SDFILL_EFFECT_GLOSS: 1,
    SDFILL_EFFECT_BEVEL: 2,
    SDFILL_EFFECT_INSHADOW: 3,
    SDFILL_EFFECT_INGLOW: 4
  }

  static TextFace = {
    St_Plain: 0,
    St_Bold: 1,
    St_Italic: 2,
    St_Under: 4,
    St_Reverse: 8,
    St_Super: 16,
    St_Sub: 32,
    St_Strike: 64
  }

  static TextFlags = {
    TEN_F_LINEF: 1,
    TEN_F_LINEP: 2,
    TEN_F_BREAK: 4,
    TEN_F_SYMBOL: 8,
    TEN_F_INSSYMBOL: 16,
    TEN_F_BADSPELL: 32
  }

  static TextStyleCodes = {
    SDF_T_FONT: 0,
    SDF_T_SIZE: 1,
    SDF_T_FACE: 2,
    SDF_T_FLAGS: 3,
    SDF_T_COLOR: 4,
    SDF_T_STYLEID: 5,
    SDF_T_ORIENT: 6,
    SDF_T_EXTRA: 7,
    SDF_T_SETSIZE: 8,
    SDF_T_SETSIZEMIN: 9,
    SDF_T_LINKID: 10,
    SDF_T_DATAID: 11,
    SDF_T_PAINTTYPE: 20,
    SDF_T_PAINTECOLOR: 21,
    SDF_T_PAINTGRAD: 22,
    SDF_T_PAINTTEXTURE: 23,
    SDF_T_PAINTTXSCALE: 24,
    SDF_T_SIZE_FLOAT: 25
  }

  static ParaStyleCodes = {
    SDF_S_JUST: 100,
    SDF_S_SPACING: 101,
    SDF_S_LEADING: 102,
    SDF_S_TRACKING: 103,
    SDF_S_LINDENT: 104,
    SDF_S_RINDENT: 105,
    SDF_S_PINDENT: 106,
    SDF_S_BINDENT: 107,
    SDF_S_BULLET: 108,
    SDF_S_TABSPACE: 109,
    SDF_S_HYPHEN: 110
  }

  static TextJust = {
    TA_LEFT: 0,
    TA_RIGHT: 2,
    TA_CENTER: 6,
    TA_TOP: 0,
    TA_BOTTOM: 8
  }

  static ImageDir = {
    dir_meta: 113,
    dir_jpg: 124,
    dir_png: 125,
    dir_svg: 143,
    dir_store: 123
  }

  static Platforms = {
    SDF_WIN31: 1,
    SDF_WIN32: 2,
    SDF_MAC68: 3,
    SDF_PREVIEWWIN32: 4,
    SDF_WIN32_VISIO: 5,
    SDF_SDJS: 6,
    SDF_SDJSBLOCK: 7,
    SDF_VISIO: 8,
    SDF_WIN32BLOCK: 9,
    SDF_VISIOLUCID: 10
  }

  static SDWFileDir = {
    dir_text: 114
  }

  static FontFamily = {
    FF_ROMAN: 16,
    FF_SWISS: 32,
    FF_MODERN: 48,
    FF_SCRIPT: 64,
    FF_DECORATIVE: 80
  }

  static PrintFlags = {
    SEP_Printing: 1,
    SEP_PrintInk: 2,
    SEP_Header: 4,
    SEP_OnePage: 8,
    SEP_Overlap: 16,
    SEP_PrintGrid: 32,
    SEP_ScaleUp: 64,
    SEP_MinMarg: 128,
    SEP_PrintAsBitmap: 256,
    SEP_PrintComments: 512,
    SEP_CustomPageSize: 1024,
    SEP_FitToScale: 2048
  }

  static GrowCodes = {
    SED_OG_All: 0,
    SED_OG_Horiz: 1,
    SED_OG_Vert: 2,
    SED_OG_Prop: 3
  }

  static ArrowMasks = {
    ARROW_T_MASK: 255,
    ARROW_DISP: 256
  }

  static SED_NParaPts = 100
  static SDF_MAXCONNECT = 20
  static Std_ONStyleColors = 7
  static Signature = '00000000'

  static GetImageDir = function (fileType) {
    /**
     * Determines the image directory code based on the MIME type
     * @param fileType - The MIME type of the image
     * @returns The directory code for the image type
     */
    var dirCode = 0;
    switch (fileType) {
      case 'image/jpeg':
        dirCode = ShapeConstant.ImageDir.dir_jpg;
        break;
      case 'image/png':
        dirCode = ShapeConstant.ImageDir.dir_png;
        break;
      case 'image/svg+xml':
        dirCode = ShapeConstant.ImageDir.dir_svg;
        break;
      case 'image/wmf':
        dirCode = ShapeConstant.ImageDir.dir_meta;
    }
    return dirCode;
  }

  static GetImageBlobType = function (dirCode) {
    /**
     * Converts an image directory code to its corresponding MIME type
     * @param dirCode - The directory code for the image type
     * @returns The MIME type string for the image
     */
    var mimeType = '';
    switch (dirCode) {
      case ShapeConstant.ImageDir.dir_jpg:
        mimeType = 'image/jpeg';
        break;
      case ShapeConstant.ImageDir.dir_png:
        mimeType = 'image/png';
        break;
      case ShapeConstant.ImageDir.dir_svg:
        mimeType = 'image/svg+xml';
        break;
      case ShapeConstant.ImageDir.dir_meta:
        mimeType = 'image/wmf';
    }
    return mimeType;
  }

  static GetImageBlobTypeFromExt = function (fileExtension) {
    /**
     * Determines the MIME type based on the file extension
     * @param fileExtension - The file extension including the dot (e.g., '.jpg')
     * @returns The corresponding MIME type string
     */
    var mimeType = '';
    switch (fileExtension) {
      case '.jpg':
      case '.jpeg':
      default:
        mimeType = 'image/jpeg';
        break;
      case '.png':
        mimeType = 'image/png';
        break;
      case '.svg':
        mimeType = 'image/svg+xml';
        break;
      case '.emf':
        mimeType = 'image/wmf';
    }
    return mimeType;
  }

  static decimalToHex = function (value, padLength, omitPrefix) {
    /**
     * Converts a decimal number to its hexadecimal representation
     * @param value - The decimal number to convert
     * @param padLength - The minimum length of the resulting hex string (default: 2)
     * @param omitPrefix - If true, returns the hex without '0x' prefix
     * @returns The hexadecimal string representation
     */
    var hexString = Number(value).toString(16).toUpperCase();
    for (padLength = padLength == null ? 2 : padLength; hexString.length < padLength;) hexString = '0' + hexString;
    return omitPrefix ? hexString : '0x' + hexString;
  }

  static ToInt32 = function (value) {
    /**
     * Converts a value to a signed 32-bit integer using bitwise right shift
     * @param value - The value to convert
     * @returns The value as a signed 32-bit integer
     */
    return value >> 0;
  }

  static ToUInt32 = function (value) {
    /**
     * Converts a value to an unsigned 32-bit integer using unsigned bitwise right shift
     * @param value - The value to convert
     * @returns The value as an unsigned 32-bit integer
     */
    return value >>> 0;
  }

  /**
   * Structure definition for a 2D point with integer coordinates
   * Used for storing coordinate data in the SmartDraw format
   * Each point consists of x and y integer values (16-bit)
   * This is commonly used for positioning elements in drawing files
   */
  static PointStruct = [
    'x',        // X coordinate
    'int16',    // 16-bit signed integer
    'y',        // Y coordinate
    'int16'     // 16-bit signed integer
  ]

  /**
   * Structure definition for a 2D point with 32-bit integer coordinates
   * Used for storing coordinate data with higher precision than PointStruct
   * Each point consists of x and y integer values (32-bit)
   * This structure is typically used for positioning elements in large drawing spaces
   */
  static LPointStruct = [
    'x',        // X coordinate
    'int32',    // 32-bit signed integer
    'y',        // Y coordinate
    'int32'     // 32-bit signed integer
  ]

  static DPointStruct = [
    'x',
    'float64',
    'y',
    'float64'
  ]

  static RectStruct = [
    'left',
    'int16',
    'top',
    'int16',
    'right',
    'int16',
    'bottom',
    'int16'
  ]

  static LRectStruct = [
    'left',
    'int32',
    'top',
    'int32',
    'right',
    'int32',
    'bottom',
    'int32'
  ]

  static DRectStruct = [
    'left',
    'float64',
    'top',
    'float64',
    'right',
    'float64',
    'bottom',
    'float64'
  ]

  static DCRectStruct = [
    'x',
    'float64',
    'y',
    'float64',
    'width',
    'float64',
    'height',
    'float64'
  ]

  static LOGFontStruct = [
    'lfHeight',
    'int32',
    'lfWidth',
    'int32',
    'lfEscapement',
    'int32',
    'lfOrientation',
    'int32',
    'lfWeight',
    'int32',
    'lfItalic',
    'uint8',
    'lfUnderline',
    'uint8',
    'lfStrikeOut',
    'uint8',
    'lfCharSet',
    'uint8',
    'lfOutPrecision',
    'uint8',
    'lfClipPrecision',
    'uint8',
    'lfQuality',
    'uint8',
    'lfPitchAndFamily',
    'uint8',
    'lfFaceName',
    'u16stringle:64'
  ]

  static LOGFontStructPreV1 = [
    'lfHeight',
    'int32',
    'lfWidth',
    'int32',
    'lfEscapement',
    'int32',
    'lfOrientation',
    'int32',
    'lfWeight',
    'int32',
    'lfItalic',
    'uint8',
    'lfUnderline',
    'uint8',
    'lfStrikeOut',
    'uint8',
    'lfCharSet',
    'uint8',
    'lfOutPrecision',
    'uint8',
    'lfClipPrecision',
    'uint8',
    'lfQuality',
    'uint8',
    'lfPitchAndFamily',
    'uint8',
    'lfFaceName',
    'string:64'
  ]

  static VersionStruct = [
    'FVersion',
    'uint16',
    'PVersion',
    'uint16',
    'Platform',
    'uint16',
    'MinVer',
    'uint16',
    'printres',
    'uint16',
    'drawres',
    'uint16',
    'LongFormat',
    'uint16',
    'TrialVersion',
    'uint16',
    'Unicode',
    'uint16'
  ]

  static BlockHeaderStruct = [
    'state',
    'int32',
    'delta',
    'int32',
    'action',
    'int32',
    'blocktype',
    'int32',
    'blockid',
    'int32',
    'index',
    'int32',
    'nblocks',
    'int32'
  ]

  static HeaderStruct = [
    'flags',
    'uint16',
    'worigin',
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.PointStruct)
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.PointStruct, value)
      }
    },
    'wscale',
    'uint16',
    'wflags',
    'uint16',
    'oleback',
    'int32',
    'lworigin',
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LPointStruct, value)
      }
    },
    'longflags',
    'uint32',
    'dateformat',
    'int16'
  ]

  static HeaderStruct810 = [
    'flags',
    'uint16',
    'worigin',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'wscale',
    'uint16',
    'wflags',
    'uint16',
    'oleback',
    'int32',
    'lworigin',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'longflags',
    'uint32'
  ]

  static HeaderStruct22 = [
    'flags',
    'uint16',
    'worigin',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'wscale',
    'uint16',
    'wflags',
    'uint16',
    'oleback',
    'int32',
    'lworigin',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    }
  ]

  static HeaderStruct14 = [
    'flags',
    'uint16',
    'worigin',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'wscale',
    'uint16',
    'wflags',
    'uint16',
    'oleback',
    'int32'
  ]

  static LineDrawListStruct6 = [
    'n',
    'int32',
    'symbol1',
    'string:36',
    'symbol2',
    'string:36',
    'symbol3',
    'string:36',
    'symbol4',
    'string:36',
    'symbol5',
    'string:36',
    'symbol6',
    'string:36'
  ]

  static UIInfoStruct = [
    'linetoolindex',
    'int32',
    'shapetoolindex',
    'int32',
    'datetime2007',
    'uint32',
    'holidaymask',
    'uint32',
    'datetime1',
    'uint32',
    'datetime2',
    'uint32',
    'nonworkingdays',
    'uint32'
  ]

  static UIInfoStruct36 = [
    'linetoolindex',
    'int32',
    'shapetoolindex',
    'int32',
    'datetime2007',
    'uint32',
    'holidaymask',
    'uint32',
    'datetime1',
    'uint32',
    'datetime2',
    'uint32',
    'nonworkingdays',
    'uint32',
    'swimlaneformat',
    'uint32',
    'autocontainer',
    'uint32'
  ]

  static UIInfoStruct40 = [
    'linetoolindex',
    'int32',
    'shapetoolindex',
    'int32',
    'datetime2007',
    'uint32',
    'holidaymask',
    'uint32',
    'datetime1',
    'uint32',
    'datetime2',
    'uint32',
    'nonworkingdays',
    'uint32',
    'swimlaneformat',
    'uint32',
    'autocontainer',
    'uint32',
    'actascontainer',
    'uint32'
  ]

  static UIInfoStruct52 = [
    'linetoolindex',
    'int32',
    'shapetoolindex',
    'int32',
    'datetime2007',
    'uint32',
    'holidaymask',
    'uint32',
    'datetime1',
    'uint32',
    'datetime2',
    'uint32',
    'nonworkingdays',
    'uint32',
    'swimlaneformat',
    'uint32',
    'autocontainer',
    'uint32',
    'actascontainer',
    'uint32',
    'swimlanenlanes',
    'uint32',
    'swimlanenvlanes',
    'uint32',
    'swimlanerotate',
    'uint32'
  ]

  static UIInfoStruct56 = [
    'linetoolindex',
    'int32',
    'shapetoolindex',
    'int32',
    'datetime2007',
    'uint32',
    'holidaymask',
    'uint32',
    'datetime1',
    'uint32',
    'datetime2',
    'uint32',
    'nonworkingdays',
    'uint32',
    'swimlaneformat',
    'uint32',
    'autocontainer',
    'uint32',
    'actascontainer',
    'uint32',
    'swimlanenlanes',
    'uint32',
    'swimlanenvlanes',
    'uint32',
    'swimlanerotate',
    'uint32',
    'swimlanetitle',
    'uint32'
  ]

  static UIInfoStruct60 = [
    'linetoolindex',
    'int32',
    'shapetoolindex',
    'int32',
    'datetime2007',
    'uint32',
    'holidaymask',
    'uint32',
    'datetime1',
    'uint32',
    'datetime2',
    'uint32',
    'nonworkingdays',
    'uint32',
    'swimlaneformat',
    'uint32',
    'autocontainer',
    'uint32',
    'actascontainer',
    'uint32',
    'swimlanenlanes',
    'uint32',
    'swimlanenvlanes',
    'uint32',
    'swimlanerotate',
    'uint32',
    'swimlanetitle',
    'uint32',
    'collapsetools',
    'uint32'
  ]

  static LibListStruct = [
    'selected',
    'int32',
    'nacross',
    'int32'
  ]

  static TextureExtraStruct = [
    'categoryindex',
    'int32',
    'units',
    'int32',
    'scale',
    'float64',
    'rwidth',
    'float64',
    'alignment',
    'int32',
    'flags',
    'int32'
  ]

  static TextureStruct = [
    'textureindex',
    'int32'
  ]

  static HatchStruct = [
    'hatch',
    'int32'
  ]

  /**
   * Structure definition for DrawObj8 with 448 byte size
   * Contains properties for a drawing object including position, dimensions, appearance settings and metadata
   * Used for binary data serialization/deserialization
   */
  static DrawObj8Struct448 = [
    'otype',
    'uint32',
    'r',
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.DRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.DRectStruct, value);
      }
    },
    'frame',
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.DRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.DRectStruct, value);
      }
    },
    'inside',
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.DRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.DRectStruct, value);
      }
    },
    'dataclass',
    'uint32',
    'flags',
    'uint32',
    'extraflags',
    'uint32',
    'fixedpoint',
    'float64',
    'shapeparam',
    'float64',
    'objgrow',
    'uint32',
    'sizedim',
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.DPointStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.DPointStruct, value);
      }
    },
    'hookflags',
    'uint32',
    'targflags',
    'uint32',
    'maxhooks',
    'uint32',
    'associd',
    {
      get: function (reader) {
        var associationId = reader.readInt16();
        reader.readInt16(); // Skip padding
        return associationId;
      },
      set: function (writer, value) {
        writer.writeInt16(value);
        writer.writeInt16(0); // Add padding
      }
    },
    'associndex',
    'int32',
    'uniqueid',
    'int32',
    'ShortRef',
    'uint32',
    'gframe',
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.DRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.DRectStruct, value);
      }
    },
    'gflags',
    'uint32',
    'attachpoint_x',
    'float64',
    'attachpoint_y',
    'float64',
    'rleft',
    'float64',
    'rtop',
    'float64',
    'rright',
    'float64',
    'rbottom',
    'float64',
    'rwd',
    'float64',
    'rht',
    'float64',
    'rflags',
    'uint32',
    'hgframe',
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.DRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.DRectStruct, value);
      }
    },
    'layer',
    'uint32',
    'breverse',
    'uint32',
    'dimensions',
    'uint32',
    'hiliter',
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'styleindex',
    'uint32',
    'objecttype',
    'uint32',
    'colorfilter',
    'uint32',
    'perspective',
    'uint32',
    'extendedSnapRect',
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.DRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.DRectStruct, value);
      }
    },
    'dimensionDeflectionH',
    'float64',
    'dimensionDeflectionV',
    'float64',
    'commentdir',
    'uint32',
    'sequence',
    'uint32',
    'hookdisp_x',
    'float64',
    'hookdisp_y',
    'float64',
    'pptLayout',
    'uint32',
    'subtype',
    'uint32',
    'colorchanges',
    'uint32',
    'moreflags',
    'uint32',
    'objclass',
    'uint32'
  ]

  /**
   * Standard drawing object structure definition for version 8 format
   * Contains geometry, appearance, and behavioral properties for drawing objects
   */
  static DrawObj8Struct = [
    'otype',                     // Object type
    'uint32',
    'r',                         // Rectangle bounds
    {
      /**
       * Reads rectangle bounds from binary data
       * @param reader - Binary reader instance
       * @returns Rectangle structure representing object bounds
       */
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      /**
       * Writes rectangle bounds to binary data
       * @param writer - Binary writer instance
       * @param value - Rectangle structure to write
       */
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'frame',                     // Frame rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'inside',                    // Inside rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dataclass',                 // Data classification
    'uint32',
    'flags',                     // Object flags
    'uint32',
    'extraflags',                // Additional flags
    'uint32',
    'fixedpoint',                // Fixed point anchor
    'int32',
    'shapeparam',                // Shape-specific parameter
    'float64',
    'objgrow',                   // Object growth behavior
    'uint32',
    'sizedim',                   // Size dimensions
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LPointStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LPointStruct, value);
      }
    },
    'hookflags',                 // Connection hook flags
    'uint32',
    'targflags',                 // Target flags
    'uint32',
    'maxhooks',                  // Maximum number of hooks
    'uint32',
    'associd',                   // Association ID
    {
      /**
       * Reads association ID with padding handling
       * @param reader - Binary reader instance
       * @returns Association ID value
       */
      get: function (reader) {
        const associationId = reader.readInt16();
        reader.readInt16(); // Skip padding
        return associationId;
      },
      /**
       * Writes association ID with padding
       * @param writer - Binary writer instance
       * @param value - Association ID to write
       */
      set: function (writer, value) {
        writer.writeInt16(value);
        writer.writeInt16(0); // Add padding
      }
    },
    'associndex',                // Association index
    'int32',
    'uniqueid',                  // Unique identifier
    'int32',
    'ShortRef',                  // Short reference
    'uint32',
    'gframe',                    // Group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'gflags',                    // Group flags
    'uint32',
    'attachpoint_x',             // Attachment point X coordinate
    'int32',
    'attachpoint_y',             // Attachment point Y coordinate
    'int32',
    'rleft',                     // Real left coordinate
    'float64',
    'rtop',                      // Real top coordinate
    'float64',
    'rright',                    // Real right coordinate
    'float64',
    'rbottom',                   // Real bottom coordinate
    'float64',
    'rwd',                       // Real width
    'float64',
    'rht',                       // Real height
    'float64',
    'rflags',                    // Real coordinate flags
    'uint32',
    'hgframe',                   // Host group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'layer',                     // Layer index
    'uint32',
    'breverse',                  // Reverse flag for borders
    'uint32',
    'dimensions',                // Dimensioning flags
    'uint32',
    'hiliter',                   // Highlighter rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'styleindex',                // Style index
    'uint32',
    'objecttype',                // Specific object type
    'uint32',
    'colorfilter',               // Color filtering options
    'uint32',
    'perspective',               // Perspective view settings
    'uint32',
    'extendedSnapRect',          // Extended snap rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dimensionDeflectionH',      // Horizontal dimension deflection
    'int32',
    'dimensionDeflectionV',      // Vertical dimension deflection
    'int32',
    'commentdir',                // Comment direction
    'uint32',
    'sequence',                  // Sequence number
    'uint32',
    'hookdisp_x',                // Hook display X coordinate
    'int32',
    'hookdisp_y',                // Hook display Y coordinate
    'int32',
    'pptLayout',                 // Presentation layout
    'uint32',
    'subtype',                   // Object subtype
    'uint32'
  ]

  /**
   * Extended drawing object structure definition for version 8 format with 316 bytes
   * Contains all base properties plus additional fields for advanced rendering and behavior
   */
  static DrawObj8Struct316 = [
    'otype',                     // Object type
    'uint32',
    'r',                         // Rectangle bounds
    {
      /**
       * Reads rectangle bounds from binary data
       * @param reader - Binary reader instance
       * @returns Rectangle structure representing object bounds
       */
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      /**
       * Writes rectangle bounds to binary data
       * @param writer - Binary writer instance
       * @param value - Rectangle structure to write
       */
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'frame',                     // Frame rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'inside',                    // Inside rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dataclass',                 // Data classification
    'uint32',
    'flags',                     // Object flags
    'uint32',
    'extraflags',                // Additional flags
    'uint32',
    'fixedpoint',                // Fixed point anchor
    'int32',
    'shapeparam',                // Shape-specific parameter
    'float64',
    'objgrow',                   // Object growth behavior
    'uint32',
    'sizedim',                   // Size dimensions
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LPointStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LPointStruct, value);
      }
    },
    'hookflags',                 // Connection hook flags
    'uint32',
    'targflags',                 // Target flags
    'uint32',
    'maxhooks',                  // Maximum number of hooks
    'uint32',
    'associd',                   // Association ID
    {
      /**
       * Reads association ID with padding handling
       * @param reader - Binary reader instance
       * @returns Association ID value
       */
      get: function (reader) {
        const associationId = reader.readInt16();
        reader.readInt16(); // Skip padding
        return associationId;
      },
      /**
       * Writes association ID with padding
       * @param writer - Binary writer instance
       * @param value - Association ID to write
       */
      set: function (writer, value) {
        writer.writeInt16(value);
        writer.writeInt16(0); // Add padding
      }
    },
    'associndex',                // Association index
    'int32',
    'uniqueid',                  // Unique identifier
    'int32',
    'ShortRef',                  // Short reference
    'uint32',
    'gframe',                    // Group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'gflags',                    // Group flags
    'uint32',
    'attachpoint_x',             // Attachment point X coordinate
    'int32',
    'attachpoint_y',             // Attachment point Y coordinate
    'int32',
    'rleft',                     // Real left coordinate
    'float64',
    'rtop',                      // Real top coordinate
    'float64',
    'rright',                    // Real right coordinate
    'float64',
    'rbottom',                   // Real bottom coordinate
    'float64',
    'rwd',                       // Real width
    'float64',
    'rht',                       // Real height
    'float64',
    'rflags',                    // Real coordinate flags
    'uint32',
    'hgframe',                   // Host group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'layer',                     // Layer index
    'uint32',
    'breverse',                  // Reverse flag for borders
    'uint32',
    'dimensions',                // Dimensioning flags
    'uint32',
    'hiliter',                   // Highlighter rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'styleindex',                // Style index
    'uint32',
    'objecttype',                // Specific object type
    'uint32',
    'colorfilter',               // Color filtering options
    'uint32',
    'perspective',               // Perspective view settings
    'uint32',
    'extendedSnapRect',          // Extended snap rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dimensionDeflectionH',      // Horizontal dimension deflection
    'int32',
    'dimensionDeflectionV',      // Vertical dimension deflection
    'int32',
    'commentdir',                // Comment direction
    'uint32',
    'sequence',                  // Sequence number
    'uint32',
    'hookdisp_x',                // Hook display X coordinate
    'int32',
    'hookdisp_y',                // Hook display Y coordinate
    'int32',
    'pptLayout',                 // Presentation layout
    'uint32',
    'subtype',                   // Object subtype
    'uint32',
    'colorchanges',              // Color change flags
    'uint32',
    'moreflags',                 // Additional flags
    'uint32',
    'objclass',                  // Object classification
    'uint32'
  ]

  /**
   * Structure definition for DrawObj8 with 312 bytes
   * Used for binary serialization/deserialization of drawing objects in version 8 format
   * Contains properties like position, dimensions, behavior flags, and style information
   */
  static DrawObj8Struct312 = [
    'otype',                     // Object type
    'uint32',
    'r',                         // Rectangle bounds
    {
      /**
       * Reads rectangle bounds from binary data
       * @param reader - Binary reader instance
       * @returns Rectangle structure representing object bounds
       */
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      /**
       * Writes rectangle bounds to binary data
       * @param writer - Binary writer instance
       * @param value - Rectangle structure to write
       */
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'frame',                     // Frame rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'inside',                    // Inside rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dataclass',                 // Data classification
    'uint32',
    'flags',                     // Object flags
    'uint32',
    'extraflags',                // Additional flags
    'uint32',
    'fixedpoint',                // Fixed point anchor
    'int32',
    'shapeparam',                // Shape-specific parameter
    'float64',
    'objgrow',                   // Object growth behavior
    'uint32',
    'sizedim',                   // Size dimensions
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LPointStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LPointStruct, value);
      }
    },
    'hookflags',                 // Connection hook flags
    'uint32',
    'targflags',                 // Target flags
    'uint32',
    'maxhooks',                  // Maximum number of hooks
    'uint32',
    'associd',                   // Association ID
    {
      /**
       * Reads association ID with padding handling
       * @param reader - Binary reader instance
       * @returns Association ID value
       */
      get: function (reader) {
        const associationId = reader.readInt16();
        reader.readInt16(); // Skip padding
        return associationId;
      },
      /**
       * Writes association ID with padding
       * @param writer - Binary writer instance
       * @param value - Association ID to write
       */
      set: function (writer, value) {
        writer.writeInt16(value);
        writer.writeInt16(0); // Add padding
      }
    },
    'associndex',                // Association index
    'int32',
    'uniqueid',                  // Unique identifier
    'int32',
    'ShortRef',                  // Short reference
    'uint32',
    'gframe',                    // Group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'gflags',                    // Group flags
    'uint32',
    'attachpoint_x',             // Attachment point X coordinate
    'int32',
    'attachpoint_y',             // Attachment point Y coordinate
    'int32',
    'rleft',                     // Real left coordinate
    'float64',
    'rtop',                      // Real top coordinate
    'float64',
    'rright',                    // Real right coordinate
    'float64',
    'rbottom',                   // Real bottom coordinate
    'float64',
    'rwd',                       // Real width
    'float64',
    'rht',                       // Real height
    'float64',
    'rflags',                    // Real coordinate flags
    'uint32',
    'hgframe',                   // Host group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'layer',                     // Layer index
    'uint32',
    'breverse',                  // Reverse flag for borders
    'uint32',
    'dimensions',                // Dimensioning flags
    'uint32',
    'hiliter',                   // Highlighter rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'styleindex',                // Style index
    'uint32',
    'objecttype',                // Specific object type
    'uint32',
    'colorfilter',               // Color filtering options
    'uint32',
    'perspective',               // Perspective view settings
    'uint32',
    'extendedSnapRect',          // Extended snap rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dimensionDeflectionH',      // Horizontal dimension deflection
    'int32',
    'dimensionDeflectionV',      // Vertical dimension deflection
    'int32',
    'commentdir',                // Comment direction
    'uint32',
    'sequence',                  // Sequence number
    'uint32',
    'hookdisp_x',                // Hook display X coordinate
    'int32',
    'hookdisp_y',                // Hook display Y coordinate
    'int32',
    'pptLayout',                 // Presentation layout
    'uint32',
    'subtype',                   // Object subtype
    'uint32',
    'colorchanges',              // Color change flags
    'uint32',
    'moreflags',                  // Additional flags
    'uint32'
  ]

  /**
   * Structure definition for DrawObj8 with 848 bytes size
   * Extended version of the DrawObj8 structure used for more complex objects
   * Supports additional metadata and rendering information
   */
  static DrawObj8Struct848 = [
    'otype',                     // Object type
    'uint32',
    'r',                         // Rectangle bounds
    {
      /**
       * Reads rectangle bounds from binary data
       * @param reader - Binary reader instance
       * @returns Rectangle structure representing object bounds
       */
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      /**
       * Writes rectangle bounds to binary data
       * @param writer - Binary writer instance
       * @param value - Rectangle structure to write
       */
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'frame',                     // Frame rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'inside',                    // Inside rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dataclass',                 // Data classification
    'uint32',
    'flags',                     // Object flags
    'uint32',
    'extraflags',                // Additional flags
    'uint32',
    'fixedpoint',                // Fixed point anchor
    'int32',
    'shapeparam',                // Shape-specific parameter
    'float64',
    'objgrow',                   // Object growth behavior
    'uint32',
    'sizedim',                   // Size dimensions
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LPointStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LPointStruct, value);
      }
    },
    'hookflags',                 // Connection hook flags
    'uint32',
    'targflags',                 // Target flags
    'uint32',
    'maxhooks',                  // Maximum number of hooks
    'uint32',
    'associd',                   // Association ID
    {
      /**
       * Reads association ID with padding handling
       * @param reader - Binary reader instance
       * @returns Association ID value
       */
      get: function (reader) {
        const associationId = reader.readInt16();
        reader.readInt16(); // Skip padding
        return associationId;
      },
      /**
       * Writes association ID with padding
       * @param writer - Binary writer instance
       * @param value - Association ID to write
       */
      set: function (writer, value) {
        writer.writeInt16(value);
        writer.writeInt16(0); // Add padding
      }
    },
    'associndex',                // Association index
    'int32',
    'uniqueid',                  // Unique identifier
    'int32',
    'ShortRef',                  // Short reference
    'uint32',
    'gframe',                    // Group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'gflags',                    // Group flags
    'uint32',
    'attachpoint_x',             // Attachment point X coordinate
    'int32',
    'attachpoint_y',             // Attachment point Y coordinate
    'int32',
    'rleft',                     // Real left coordinate
    'float64',
    'rtop',                      // Real top coordinate
    'float64',
    'rright',                    // Real right coordinate
    'float64',
    'rbottom',                   // Real bottom coordinate
    'float64',
    'rwd',                       // Real width
    'float64',
    'rht',                       // Real height
    'float64',
    'rflags',                    // Real coordinate flags
    'uint32',
    'hgframe',                   // Host group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'layer',                     // Layer index
    'uint32',
    'breverse',                  // Reverse flag for borders
    'uint32',
    'dimensions',                // Dimensioning flags
    'uint32',
    'hiliter',                   // Highlighter rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'styleindex',                // Style index
    'uint32',
    'objecttype',                // Specific object type
    'uint32',
    'colorfilter',               // Color filtering options
    'uint32',
    'perspective',               // Perspective view settings
    'uint32',
    'extendedSnapRect',          // Extended snap rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dimensionDeflectionH',      // Horizontal dimension deflection
    'int32',
    'dimensionDeflectionV',      // Vertical dimension deflection
    'int32',
    'commentdir',                // Comment direction
    'uint32',
    'sequence',                  // Sequence number
    'uint32',
    'hookdisp_x',                // Hook display X coordinate
    'int32',
    'hookdisp_y',                // Hook display Y coordinate
    'int32',
    'pptLayout',                 // Presentation layout
    'uint32',
    'subtype',                   // Object subtype
    'uint32',
    'colorchanges',               // Color change flags
    'uint32'
  ]

  /**
   * Structure definition for DrawObj8 with 837 byte size
   * Used for binary serialization/deserialization of drawing objects in version 8 format
   * Contains properties for a drawing object including geometry, appearance settings, and behavioral flags
   */
  static DrawObj8Struct837 = [
    'otype',                     // Object type
    'uint32',
    'r',                         // Rectangle bounds
    {
      /**
       * Reads rectangle bounds from binary data
       * @param reader - Binary reader instance
       * @returns Rectangle structure representing object bounds
       */
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      /**
       * Writes rectangle bounds to binary data
       * @param writer - Binary writer instance
       * @param value - Rectangle structure to write
       */
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'frame',                     // Frame rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'inside',                    // Inside rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dataclass',                 // Data classification
    'uint32',
    'flags',                     // Object flags
    'uint32',
    'extraflags',                // Additional flags
    'uint32',
    'fixedpoint',                // Fixed point anchor
    'int32',
    'shapeparam',                // Shape-specific parameter
    'float64',
    'objgrow',                   // Object growth behavior
    'uint32',
    'sizedim',                   // Size dimensions
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LPointStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LPointStruct, value);
      }
    },
    'hookflags',                 // Connection hook flags
    'uint32',
    'targflags',                 // Target flags
    'uint32',
    'maxhooks',                  // Maximum number of hooks
    'uint32',
    'associd',                   // Association ID
    {
      /**
       * Reads association ID with padding handling
       * @param reader - Binary reader instance
       * @returns Association ID value
       */
      get: function (reader) {
        const associationId = reader.readInt16();
        reader.readInt16(); // Skip padding
        return associationId;
      },
      /**
       * Writes association ID with padding
       * @param writer - Binary writer instance
       * @param value - Association ID to write
       */
      set: function (writer, value) {
        writer.writeInt16(value);
        writer.writeInt16(0); // Add padding
      }
    },
    'associndex',                // Association index
    'int32',
    'uniqueid',                  // Unique identifier
    'int32',
    'ShortRef',                  // Short reference
    'uint32',
    'gframe',                    // Group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'gflags',                    // Group flags
    'uint32',
    'attachpoint_x',             // Attachment point X coordinate
    'int32',
    'attachpoint_y',             // Attachment point Y coordinate
    'int32',
    'rleft',                     // Real left coordinate
    'float64',
    'rtop',                      // Real top coordinate
    'float64',
    'rright',                    // Real right coordinate
    'float64',
    'rbottom',                   // Real bottom coordinate
    'float64',
    'rwd',                       // Real width
    'float64',
    'rht',                       // Real height
    'float64',
    'rflags',                    // Real coordinate flags
    'uint32',
    'hgframe',                   // Host group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'layer',                     // Layer index
    'uint32',
    'breverse',                  // Reverse flag for borders
    'uint32',
    'dimensions',                // Dimensioning flags
    'uint32',
    'hiliter',                   // Highlighter rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'styleindex',                // Style index
    'uint32',
    'objecttype',                // Specific object type
    'uint32',
    'colorfilter',               // Color filtering options
    'uint32',
    'perspective',               // Perspective view settings
    'uint32',
    'extendedSnapRect',          // Extended snap rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dimensionDeflectionH',      // Horizontal dimension deflection
    'uint32',
    'dimensionDeflectionV',      // Vertical dimension deflection
    'uint32',
    'commentdir',                // Comment direction
    'uint32',
    'sequence',                  // Sequence number
    'uint32',
    'hookdisp_x',                // Hook display X coordinate
    'int32',
    'hookdisp_y',                // Hook display Y coordinate
    'int32',
    'pptLayout',                 // Presentation layout
    'uint32'
  ]

  /**
   * Structure definition for DrawObj8 with 824 byte size
   * Similar to 837 byte version but without the pptLayout field
   * Used for serialization/deserialization of drawing objects in earlier version 8 formats
   */
  static DrawObj8Struct824 = [
    'otype',                     // Object type
    'uint32',
    'r',                         // Rectangle bounds
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'frame',                     // Frame rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'inside',                    // Inside rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dataclass',                 // Data classification
    'uint32',
    'flags',                     // Object flags
    'uint32',
    'extraflags',                // Additional flags
    'uint32',
    'fixedpoint',                // Fixed point anchor
    'int32',
    'shapeparam',                // Shape-specific parameter
    'float64',
    'objgrow',                   // Object growth behavior
    'uint32',
    'sizedim',                   // Size dimensions
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LPointStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LPointStruct, value);
      }
    },
    'hookflags',                 // Connection hook flags
    'uint32',
    'targflags',                 // Target flags
    'uint32',
    'maxhooks',                  // Maximum number of hooks
    'uint32',
    'associd',                   // Association ID
    {
      get: function (reader) {
        const associationId = reader.readInt16();
        reader.readInt16(); // Skip padding
        return associationId;
      },
      set: function (writer, value) {
        writer.writeInt16(value);
        writer.writeInt16(0); // Add padding
      }
    },
    'associndex',                // Association index
    'int32',
    'uniqueid',                  // Unique identifier
    'int32',
    'ShortRef',                  // Short reference
    'uint32',
    'gframe',                    // Group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'gflags',                    // Group flags
    'uint32',
    'attachpoint_x',             // Attachment point X coordinate
    'int32',
    'attachpoint_y',             // Attachment point Y coordinate
    'int32',
    'rleft',                     // Real left coordinate
    'float64',
    'rtop',                      // Real top coordinate
    'float64',
    'rright',                    // Real right coordinate
    'float64',
    'rbottom',                   // Real bottom coordinate
    'float64',
    'rwd',                       // Real width
    'float64',
    'rht',                       // Real height
    'float64',
    'rflags',                    // Real coordinate flags
    'uint32',
    'hgframe',                   // Host group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'layer',                     // Layer index
    'uint32',
    'breverse',                  // Reverse flag for borders
    'uint32',
    'dimensions',                // Dimensioning flags
    'uint32',
    'hiliter',                   // Highlighter rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'styleindex',                // Style index
    'uint32',
    'objecttype',                // Specific object type
    'uint32',
    'colorfilter',               // Color filtering options
    'uint32',
    'perspective',               // Perspective view settings
    'uint32',
    'extendedSnapRect',          // Extended snap rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dimensionDeflectionH',      // Horizontal dimension deflection
    'uint32',
    'dimensionDeflectionV',      // Vertical dimension deflection
    'uint32',
    'commentdir',                // Comment direction
    'uint32',
    'sequence',                  // Sequence number
    'uint32'
  ]

  /**
   * Structure definition for DrawObj8 with 830 bytes
   * Defines the binary layout for drawing objects with full attributes
   * Used for serialization/deserialization of complex shapes
   */
  static DrawObj8Struct830 = [
    'objectType',                  // Object type code
    'uint32',
    'rectangle',                   // Main rectangle bounds
    {
      /**
       * Reads rectangle bounds from binary data
       * @param reader - Binary reader instance
       * @returns Rectangle structure representing object bounds
       */
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      /**
       * Writes rectangle bounds to binary data
       * @param writer - Binary writer instance
       * @param value - Rectangle structure to write
       */
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'frameRectangle',              // Frame rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'insideRectangle',             // Inside rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dataClass',                   // Data classification
    'uint32',
    'flags',                       // Object flags
    'uint32',
    'extraFlags',                  // Additional flags
    'uint32',
    'fixedPoint',                  // Fixed point anchor
    'int32',
    'shapeParameter',              // Shape-specific parameter
    'float64',
    'objectGrow',                  // Object growth behavior
    'uint32',
    'sizeDimensions',              // Size dimensions
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LPointStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LPointStruct, value);
      }
    },
    'hookFlags',                   // Connection hook flags
    'uint32',
    'targetFlags',                 // Target flags
    'uint32',
    'maxHooks',                    // Maximum number of hooks
    'uint32',
    'associationId',               // Association ID
    {
      /**
       * Reads association ID with padding handling
       * @param reader - Binary reader instance
       * @returns Association ID value
       */
      get: function (reader) {
        const associationId = reader.readInt16();
        reader.readInt16(); // Skip padding
        return associationId;
      },
      /**
       * Writes association ID with padding
       * @param writer - Binary writer instance
       * @param value - Association ID to write
       */
      set: function (writer, value) {
        writer.writeInt16(value);
        writer.writeInt16(0); // Add padding
      }
    },
    'associationIndex',            // Association index
    'int32',
    'uniqueId',                    // Unique identifier
    'int32',
    'shortReference',              // Short reference
    'uint32',
    'groupFrame',                  // Group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'groupFlags',                  // Group flags
    'uint32',
    'attachPointX',                // Attachment point X coordinate
    'int32',
    'attachPointY',                // Attachment point Y coordinate
    'int32',
    'realLeft',                    // Real left coordinate
    'float64',
    'realTop',                     // Real top coordinate
    'float64',
    'realRight',                   // Real right coordinate
    'float64',
    'realBottom',                  // Real bottom coordinate
    'float64',
    'realWidth',                   // Real width
    'float64',
    'realHeight',                  // Real height
    'float64',
    'realFlags',                   // Real coordinate flags
    'uint32',
    'hostGroupFrame',              // Host group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'layer',                       // Layer index
    'uint32',
    'borderReverse',               // Reverse flag for borders
    'uint32',
    'dimensions',                  // Dimensioning flags
    'uint32',
    'highlighterRect',             // Highlighter rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'styleIndex',                  // Style index
    'uint32',
    'objectTypeSpecific',          // Specific object type
    'uint32',
    'colorFilter',                 // Color filtering options
    'uint32',
    'perspective',                 // Perspective view settings
    'uint32',
    'extendedSnapRect',            // Extended snap rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dimensionDeflectionH',        // Horizontal dimension deflection
    'uint32',
    'dimensionDeflectionV',        // Vertical dimension deflection
    'uint32',
    'commentDirection',            // Comment direction
    'uint32',
    'sequence',                    // Sequence number
    'uint32',
    'hookDisplayX',                // Hook display X coordinate
    'int32',
    'hookDisplayY',                // Hook display Y coordinate
    'int32'
  ]

  /**
   * Structure definition for DrawObj8 with 814 bytes
   * Defines the binary layout for drawing objects with basic attributes
   * Used for serialization/deserialization of simpler shapes
   */
  static DrawObj8Struct814 = [
    'objectType',                  // Object type code
    'uint32',
    'rectangle',                   // Main rectangle bounds
    {
      /**
       * Reads rectangle bounds from binary data
       * @param reader - Binary reader instance
       * @returns Rectangle structure representing object bounds
       */
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      /**
       * Writes rectangle bounds to binary data
       * @param writer - Binary writer instance
       * @param value - Rectangle structure to write
       */
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'frameRectangle',              // Frame rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'insideRectangle',             // Inside rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dataClass',                   // Data classification
    'uint32',
    'flags',                       // Object flags
    'uint32',
    'extraFlags',                  // Additional flags
    'uint32',
    'fixedPoint',                  // Fixed point anchor
    'int32',
    'shapeParameter',              // Shape-specific parameter
    'float64',
    'objectGrow',                  // Object growth behavior
    'uint32',
    'sizeDimensions',              // Size dimensions
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LPointStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LPointStruct, value);
      }
    },
    'hookFlags',                   // Connection hook flags
    'uint32',
    'targetFlags',                 // Target flags
    'uint32',
    'maxHooks',                    // Maximum number of hooks
    'uint32',
    'associationId',               // Association ID
    {
      /**
       * Reads association ID with padding handling
       * @param reader - Binary reader instance
       * @returns Association ID value
       */
      get: function (reader) {
        const associationId = reader.readInt16();
        reader.readInt16(); // Skip padding
        return associationId;
      },
      /**
       * Writes association ID with padding
       * @param writer - Binary writer instance
       * @param value - Association ID to write
       */
      set: function (writer, value) {
        writer.writeInt16(value);
        writer.writeInt16(0); // Add padding
      }
    },
    'associationIndex',            // Association index
    'int32',
    'uniqueId',                    // Unique identifier
    'int32',
    'shortReference',              // Short reference
    'uint32',
    'groupFrame',                  // Group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'groupFlags',                  // Group flags
    'uint32',
    'attachPointX',                // Attachment point X coordinate
    'int32',
    'attachPointY',                // Attachment point Y coordinate
    'int32',
    'realLeft',                    // Real left coordinate
    'float64',
    'realTop',                     // Real top coordinate
    'float64',
    'realRight',                   // Real right coordinate
    'float64',
    'realBottom',                  // Real bottom coordinate
    'float64',
    'realWidth',                   // Real width
    'float64',
    'realHeight',                  // Real height
    'float64',
    'realFlags',                   // Real coordinate flags
    'uint32',
    'hostGroupFrame',              // Host group frame
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'layer',                       // Layer index
    'uint32',
    'borderReverse',               // Reverse flag for borders
    'uint32',
    'dimensions',                  // Dimensioning flags
    'uint32',
    'highlighterRect',             // Highlighter rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'styleIndex',                  // Style index
    'uint32',
    'objectTypeSpecific',          // Specific object type
    'uint32',
    'colorFilter',                 // Color filtering options
    'uint32',
    'perspective',                 // Perspective view settings
    'uint32',
    'extendedSnapRect',            // Extended snap rectangle
    {
      get: function (reader) {
        return reader.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (writer, value) {
        writer.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'dimensionDeflectionH',        // Horizontal dimension deflection
    'uint32',
    'dimensionDeflectionV',         // Vertical dimension deflection
    'uint32'
  ]

  static DrawObj8Struct810 = [
    'otype',
    'uint32',
    'r',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'frame',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'inside',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'dataclass',
    'uint32',
    'flags',
    'uint32',
    'extraflags',
    'uint32',
    'fixedpoint',
    'int32',
    'shapeparam',
    'float64',
    'objgrow',
    'uint32',
    'sizedim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'hookflags',
    'uint32',
    'targflags',
    'uint32',
    'maxhooks',
    'uint32',
    'associd',
    {
      get: function (e) {
        var t = e.readInt16();
        e.readInt16();
        return t
      },
      set: function (e, t) {
        e.writeInt16(t),
          e.writeInt16(0)
      }
    },
    'associndex',
    'int32',
    'uniqueid',
    'int32',
    'ShortRef',
    'uint32',
    'gframe',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'gflags',
    'uint32',
    'attachpoint_x',
    'int32',
    'attachpoint_y',
    'int32',
    'rleft',
    'float64',
    'rtop',
    'float64',
    'rright',
    'float64',
    'rbottom',
    'float64',
    'rwd',
    'float64',
    'rht',
    'float64',
    'rflags',
    'uint32',
    'hgframe',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'layer',
    'uint32',
    'breverse',
    'uint32',
    'dimensions',
    'uint32',
    'hiliter',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'styleindex',
    'uint32',
    'objecttype',
    'uint32',
    'colorfilter',
    'uint32'
  ]

  static DrawObjStruct = [
    'otype',
    'uint16',
    'r',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'frame',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'inside',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'dataclass',
    'uint16',
    'flags',
    'uint16',
    'extraflags',
    'uint16',
    'fixedpoint',
    'int16',
    'shapeparam',
    'float64',
    'objgrow',
    'uint16',
    'sizedim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'hookflags',
    'uint16',
    'targflags',
    'uint16',
    'maxhooks',
    'uint16',
    'associd',
    'uint16',
    'associndex',
    'int16',
    'uniqueid',
    'int16',
    'ShortRef',
    'uint16',
    'gframe',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'gflags',
    'uint16'
  ]

  static DrawObjStruct148 = [
    'otype',
    'uint16',
    'r',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'frame',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'inside',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'dataclass',
    'uint16',
    'flags',
    'uint16',
    'extraflags',
    'uint16',
    'fixedpoint',
    'int16',
    'shapeparam',
    'float64',
    'objgrow',
    'uint16',
    'sizedim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'hookflags',
    'uint16',
    'targflags',
    'uint16',
    'maxhooks',
    'uint16',
    'associd',
    'uint16',
    'associndex',
    'int16',
    'uniqueid',
    'uint16',
    'ShortRef',
    'int16',
    'gframe',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'gflags',
    'uint16',
    'lr',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'lframe',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'linside',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'lfixedpoint',
    'int32',
    'lsizedim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'lgframe',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    }
  ]

  static DrawObj6Struct = [
    'hgframe',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'layer',
    'int32',
    'extraflags',
    'uint32'
  ]

  static DrawObj6Struct20 = [
    'hgframe',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'layer',
    'int32'
  ]

  static DrawObj7Struct48 = [
    'bfillcolor',
    'uint32',
    'bpatindex',
    'uint32',
    'bthick',
    'uint32',
    'breverse',
    'uint32',
    'flags',
    'uint32',
    'dimensions',
    'uint32',
    'hiliter',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'dbthick',
    'float64'
  ]

  static DrawObj7Struct20 = [
    'bfillcolor',
    'uint32',
    'bpatindex',
    'uint32',
    'bthick',
    'uint32',
    'breverse',
    'uint32',
    'flags',
    'uint32'
  ]

  static PageStruct126 = [
    'margins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DRectStruct, t)
      }
    },
    'minmarg',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DRectStruct, t)
      }
    },
    'landscape',
    'uint16',
    'printflags',
    'uint32',
    'lPadDim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DPointStruct, t)
      }
    },
    'lpapersize',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DPointStruct, t)
      }
    },
    'MinSize',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DPointStruct, t)
      }
    },
    'printscale',
    'float64'
  ]

  static PageStruct62 = [
    'PadDim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'papersize',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'margins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'minmarg',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'landscape',
    'uint16',
    'wpapersize',
    'uint16',
    'overlap',
    'uint16',
    'printflags',
    'uint32',
    'lPadDim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'lpapersize',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'MinSize',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'printscale',
    'uint32'
  ]

  static PageStruct34 = [
    'PadDim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'papersize',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'margins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'minmarg',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'landscape',
    'uint16',
    'wpapersize',
    'uint16',
    'overlap',
    'uint16',
    'printflags',
    'uint32'
  ]

  static PageStruct30 = [
    'PadDim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'papersize',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'margins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'minmarg',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'landscape',
    'uint16',
    'wpapersize',
    'uint16',
    'overlap',
    'uint16'
  ]

  static FontNameStruct = [
    'id',
    'int16',
    'lfCharSet',
    'uint16',
    'lfFaceName',
    'string:64',
    'lfHeight',
    'uint16',
    'lfWidth',
    'uint16',
    'lfEscapement',
    'uint16',
    'lfOrientation',
    'uint16',
    'lfWeight',
    'uint16',
    'lfItalic',
    'uint8',
    'lfUnderline',
    'uint8',
    'lfStrikeOut',
    'uint8',
    'lfOutPrecision',
    'uint8',
    'lfClipPrecision',
    'uint8',
    'lfQuality',
    'uint8',
    'lfPitchAndFamily',
    'uint8'
  ]

  static FontName12Struct = [
    'id',
    'int16',
    'lfCharSet',
    'uint16',
    'lfFaceName',
    'u16stringle:16',
    'lfHeight',
    'uint16',
    'lfWidth',
    'uint16',
    'lfEscapement',
    'uint16',
    'lfOrientation',
    'uint16',
    'lfWeight',
    'uint16',
    'lfItalic',
    'uint8',
    'lfUnderline',
    'uint8',
    'lfStrikeOut',
    'uint8',
    'lfOutPrecision',
    'uint8',
    'lfClipPrecision',
    'uint8',
    'lfQuality',
    'uint8',
    'lfPitchAndFamily',
    'uint8',
    'dummy',
    'uint8'
  ]

  static FontName15Struct = [
    'id',
    'int16',
    'lfCharSet',
    'uint16',
    'lfFaceName',
    'u16stringle:64',
    'lfHeight',
    'uint16',
    'lfWidth',
    'uint16',
    'lfEscapement',
    'uint16',
    'lfOrientation',
    'uint16',
    'lfWeight',
    'uint16',
    'lfItalic',
    'uint8',
    'lfUnderline',
    'uint8',
    'lfStrikeOut',
    'uint8',
    'lfOutPrecision',
    'uint8',
    'lfClipPrecision',
    'uint8',
    'lfQuality',
    'uint8',
    'lfPitchAndFamily',
    'uint8',
    'dummy',
    'uint8'
  ]

  static CDraw12Struct420 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStruct, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'float64',
    'v_arraywidth',
    'float64',
    'lastcommand',
    'int32',
    'graphtype',
    'int32',
    'graphflags',
    'int32',
    'graphpointflags',
    'int32',
    'graphcataxisflags',
    'int32',
    'graphmagaxisflags',
    'int32',
    'graphlegendtype',
    'int32',
    'graphlegendlayoutflags',
    'int32',
    'graphimagevaluerep',
    'int32',
    'graphquadrant',
    'int32',
    'arraywd',
    'float64',
    'arrayht',
    'float64',
    'sequenceflags',
    'int32',
    'chartdirection',
    'int32',
    'copyPasteTrialVers',
    'int32',
    'taskmanagementflags',
    'int32',
    'taskdays',
    'int32',
    'moreflags',
    'int32',
    'fieldmask',
    'int32'
  ]

  static CDraw12Struct440 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStruct, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'float64',
    'v_arraywidth',
    'float64',
    'lastcommand',
    'int32',
    'graphtype',
    'int32',
    'graphflags',
    'int32',
    'graphpointflags',
    'int32',
    'graphcataxisflags',
    'int32',
    'graphmagaxisflags',
    'int32',
    'graphlegendtype',
    'int32',
    'graphlegendlayoutflags',
    'int32',
    'graphimagevaluerep',
    'int32',
    'graphquadrant',
    'int32',
    'arraywd',
    'float64',
    'arrayht',
    'float64',
    'sequenceflags',
    'int32',
    'chartdirection',
    'int32',
    'copyPasteTrialVers',
    'int32',
    'taskmanagementflags',
    'int32',
    'taskdays',
    'int32',
    'moreflags',
    'int32',
    'fieldmask',
    'int32',
    'wallThickness',
    'float64',
    'curveparam',
    'int32',
    'rrectparam',
    'float64'
  ]

  static CDraw12Struct364 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStruct, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'int32',
    'v_arraywidth',
    'int32',
    'lastcommand',
    'int32',
    'graphtype',
    'int32',
    'graphflags',
    'int32',
    'graphpointflags',
    'int32',
    'graphcataxisflags',
    'int32',
    'graphmagaxisflags',
    'int32',
    'graphlegendtype',
    'int32',
    'graphlegendlayoutflags',
    'int32',
    'graphimagevaluerep',
    'int32',
    'graphquadrant',
    'int32',
    'arraywd',
    'int32',
    'arrayht',
    'int32',
    'sequenceflags',
    'int32',
    'chartdirection',
    'int32',
    'copyPasteTrialVers',
    'int32',
    'taskmanagementflags',
    'int32',
    'taskdays',
    'int32',
    'moreflags',
    'int32',
    'fieldmask',
    'int32'
  ]

  static CDraw12Struct356 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStruct, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'int32',
    'v_arraywidth',
    'int32',
    'lastcommand',
    'int32',
    'graphtype',
    'int32',
    'graphflags',
    'int32',
    'graphpointflags',
    'int32',
    'graphcataxisflags',
    'int32',
    'graphmagaxisflags',
    'int32',
    'graphlegendtype',
    'int32',
    'graphlegendlayoutflags',
    'int32',
    'graphimagevaluerep',
    'int32',
    'graphquadrant',
    'int32',
    'arraywd',
    'int32',
    'arrayht',
    'int32',
    'sequenceflags',
    'int32',
    'chartdirection',
    'int32',
    'copyPasteTrialVers',
    'int32',
    'taskmanagementflags',
    'int32',
    'taskdays',
    'int32'
  ]

  static CDraw12Struct835 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStruct, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'int32',
    'v_arraywidth',
    'int32',
    'lastcommand',
    'int32',
    'graphtype',
    'int32',
    'graphflags',
    'int32',
    'graphpointflags',
    'int32',
    'graphcataxisflags',
    'int32',
    'graphmagaxisflags',
    'int32',
    'graphlegendtype',
    'int32',
    'graphlegendlayoutflags',
    'int32',
    'graphimagevaluerep',
    'int32',
    'graphquadrant',
    'int32',
    'arraywd',
    'int32',
    'arrayht',
    'int32'
  ]

  static CDraw12Struct836 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStruct, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'int32',
    'v_arraywidth',
    'int32',
    'lastcommand',
    'int32',
    'graphtype',
    'int32',
    'graphflags',
    'int32',
    'graphpointflags',
    'int32',
    'graphcataxisflags',
    'int32',
    'graphmagaxisflags',
    'int32',
    'graphlegendtype',
    'int32',
    'graphlegendlayoutflags',
    'int32',
    'graphimagevaluerep',
    'int32',
    'graphquadrant',
    'int32',
    'arraywd',
    'int32',
    'arrayht',
    'int32',
    'sequenceflags',
    'int32'
  ]

  static CDraw12Struct841 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStruct, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'int32',
    'v_arraywidth',
    'int32',
    'lastcommand',
    'int32',
    'graphtype',
    'int32',
    'graphflags',
    'int32',
    'graphpointflags',
    'int32',
    'graphcataxisflags',
    'int32',
    'graphmagaxisflags',
    'int32',
    'graphlegendtype',
    'int32',
    'graphlegendlayoutflags',
    'int32',
    'graphimagevaluerep',
    'int32',
    'graphquadrant',
    'int32',
    'arraywd',
    'int32',
    'arrayht',
    'int32',
    'sequenceflags',
    'int32',
    'chartdirection',
    'int32'
  ]

  static CDraw12Struct842 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStruct, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'int32',
    'v_arraywidth',
    'int32',
    'lastcommand',
    'int32',
    'graphtype',
    'int32',
    'graphflags',
    'int32',
    'graphpointflags',
    'int32',
    'graphcataxisflags',
    'int32',
    'graphmagaxisflags',
    'int32',
    'graphlegendtype',
    'int32',
    'graphlegendlayoutflags',
    'int32',
    'graphimagevaluerep',
    'int32',
    'graphquadrant',
    'int32',
    'arraywd',
    'int32',
    'arrayht',
    'int32',
    'sequenceflags',
    'int32',
    'chartdirection',
    'int32',
    'copyPasteTrialVers',
    'int32'
  ]

  static CDraw12Struct847 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStruct, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'int32',
    'v_arraywidth',
    'int32',
    'lastcommand',
    'int32',
    'graphtype',
    'int32',
    'graphflags',
    'int32',
    'graphpointflags',
    'int32',
    'graphcataxisflags',
    'int32',
    'graphmagaxisflags',
    'int32',
    'graphlegendtype',
    'int32',
    'graphlegendlayoutflags',
    'int32',
    'graphimagevaluerep',
    'int32',
    'graphquadrant',
    'int32',
    'arraywd',
    'int32',
    'arrayht',
    'int32',
    'sequenceflags',
    'int32',
    'chartdirection',
    'int32',
    'copyPasteTrialVers',
    'int32',
    'taskmanagementflags',
    'int32',
    'taskdays',
    'int32',
    'moreflags',
    'int32'
  ]

  static CDraw8Struct = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStructPreV1)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStructPreV1, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'int32',
    'v_arraywidth',
    'int32',
    'lastcommand',
    'int32',
    'graphtype',
    'int32',
    'graphflags',
    'int32',
    'graphpointflags',
    'int32',
    'graphcataxisflags',
    'int32',
    'graphmagaxisflags',
    'int32',
    'graphlegendtype',
    'int32',
    'graphlegendlayoutflags',
    'int32',
    'graphimagevaluerep',
    'int32',
    'graphquadrant',
    'int32',
    'arraywd',
    'int32',
    'arrayht',
    'int32'
  ]

  static CDraw8Struct825 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStructPreV1)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStructPreV1, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'int32',
    'v_arraywidth',
    'int32',
    'lastcommand',
    'int32',
    'graphtype',
    'int32',
    'graphflags',
    'int32',
    'graphpointflags',
    'int32',
    'graphcataxisflags',
    'int32',
    'graphmagaxisflags',
    'int32',
    'graphlegendtype',
    'int32',
    'graphlegendlayoutflags',
    'int32',
    'graphimagevaluerep',
    'int32',
    'graphquadrant',
    'int32'
  ]

  static CDraw8Struct810 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStructPreV1)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStructPreV1, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'int32',
    'v_arraywidth',
    'int32',
    'lastcommand',
    'int32'
  ]

  static CDraw8Struct224 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStructPreV1)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStructPreV1, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32',
    'h_arraywidth',
    'int32',
    'v_arraywidth',
    'int32'
  ]

  static CDraw8Struct800 = [
    'nobjects',
    'int32',
    'ngroups',
    'int32',
    'nlinks',
    'int32',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'tselect',
    'int32',
    'unique',
    'int32',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'just',
    'int32',
    'vjust',
    'int32',
    'd_sarrow',
    'int32',
    'd_earrow',
    'int32',
    'd_arrowsize',
    'int32',
    'snapalign',
    'int32',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStructPreV1)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStructPreV1, t)
      }
    },
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'defflags',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'activelayer',
    'int32',
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'textgrow',
    'int32',
    'textflags',
    'int32',
    'fsize_min',
    'int32',
    'styleindex',
    'int32'
  ]

  static CDrawStruct236 = [
    'nobjects',
    'int16',
    'ngroups',
    'int16',
    'nlinks',
    'int16',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'flags',
    'int16',
    'tselect',
    'int16',
    'unique',
    'int16',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'colors',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < ShapeConstant.Std_ONStyleColors; ++t) a = e.readUint32(),
          r.push(a);
        return r
      }
    },
    'shaddisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      }
    },
    'shadowstyle',
    'int16',
    'styleflags',
    'int16',
    'sname',
    'string:32',
    'bord',
    'int16',
    'lbord',
    'int16',
    'fsize',
    'int16',
    'face',
    'int16',
    'just',
    'int16',
    'vjust',
    'int16',
    'fname',
    'string:32',
    'CharSet',
    'uint16',
    'd_fpatindex',
    'int16',
    'd_sarrow',
    'int16',
    'd_earrow',
    'int16',
    'd_arrowsize',
    'int16',
    'snapalign',
    'int16',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStructPreV1)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStructPreV1, t)
      }
    }
  ]

  static CDrawStruct252 = [
    'nobjects',
    'int16',
    'ngroups',
    'int16',
    'nlinks',
    'int16',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'flags',
    'int16',
    'tselect',
    'int16',
    'unique',
    'int16',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'colors',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < ShapeConstant.Std_ONStyleColors; ++t) a = e.readUint32(),
          r.push(a);
        return r
      }
    },
    'shaddisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      }
    },
    'shadowstyle',
    'int16',
    'styleflags',
    'int16',
    'sname',
    'string:32',
    'bord',
    'int16',
    'lbord',
    'int16',
    'fsize',
    'int16',
    'face',
    'int16',
    'just',
    'int16',
    'vjust',
    'int16',
    'fname',
    'string:32',
    'CharSet',
    'uint16',
    'd_fpatindex',
    'int16',
    'd_sarrow',
    'int16',
    'd_earrow',
    'int16',
    'd_arrowsize',
    'int16',
    'snapalign',
    'int16',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStructPreV1)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStructPreV1, t)
      }
    },
    'ecolor',
    'uint32',
    'gradientflags',
    'int32',
    'd_bpatindex',
    'uint32',
    'd_lpatindex',
    'uint32'
  ]

  static CDrawStruct268 = [
    'nobjects',
    'int16',
    'ngroups',
    'int16',
    'nlinks',
    'int16',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'flags',
    'int16',
    'tselect',
    'int16',
    'unique',
    'int16',
    'dupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'colors',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < ShapeConstant.Std_ONStyleColors; ++t) a = e.readUint32(),
          r.push(a);
        return r
      }
    },
    'shaddisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      }
    },
    'shadowstyle',
    'int16',
    'styleflags',
    'int16',
    'sname',
    'string:32',
    'bord',
    'int16',
    'lbord',
    'int16',
    'fsize',
    'int16',
    'face',
    'int16',
    'just',
    'int16',
    'vjust',
    'int16',
    'fname',
    'string:32',
    'CharSet',
    'uint16',
    'd_fpatindex',
    'int16',
    'd_sarrow',
    'int16',
    'd_earrow',
    'int16',
    'd_arrowsize',
    'int16',
    'snapalign',
    'int16',
    'lf',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LOGFontStructPreV1)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LOGFontStructPreV1, t)
      }
    },
    'ecolor',
    'uint32',
    'gradientflags',
    'int32',
    'd_bpatindex',
    'uint32',
    'd_lpatindex',
    'uint32',
    'ldim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'ldupdisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    }
  ]

  static CDraw7Struct52 = [
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'lbpatindex',
    'int32',
    'bfillcolor',
    'int32',
    'bthick',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'dbthick',
    'float64',
    'sbpatindex',
    'int32',
    'activelayer',
    'int32'
  ]

  static CDraw7Struct48 = [
    'hopstyle',
    'int32',
    'hopdim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'flags',
    'int32',
    'lbpatindex',
    'int32',
    'bfillcolor',
    'int32',
    'bthick',
    'int32',
    'dimensions',
    'int32',
    'shapedimensions',
    'int32',
    'dbthick',
    'float64',
    'sbpatindex',
    'int32'
  ]

  static CDrawExtraStruct14 = [
    'tmargins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'textgrow',
    'int16',
    'textflags',
    'int16',
    'fsize_min',
    'int16'
  ]

  static CDrawObj5Struct60 = [
    'attachpoint_x',
    'int32',
    'attachpoint_y',
    'int32',
    'rleft',
    'float64',
    'rtop',
    'float64',
    'rright',
    'float64',
    'rbottom',
    'float64',
    'rwd',
    'float64',
    'rht',
    'float64',
    'rflags',
    'int32'
  ]

  static DrawTextStruct182 = [
    'left_sindent',
    'float64',
    'top_sindent',
    'float64',
    'right_sindent',
    'float64',
    'bottom_sindent',
    'float64',
    'tindent',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DRectStruct, t)
      }
    },
    'tmargin',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DRectStruct, t)
      }
    },
    'textid',
    'int16',
    'textflags',
    'uint16',
    'ascent',
    'uint16',
    'vjust',
    'uint16',
    'just',
    'uint16',
    'textgrow',
    'uint16',
    'tangle',
    'float64',
    'ltrect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DRectStruct, t)
      }
    },
    'commentid',
    'int16',
    'textwrapwidth',
    'float64',
    'linetextx',
    'float64',
    'linetexty',
    'float64',
    'visiorotationdiff',
    'float64'
  ]

  static DrawTextStruct110 = [
    'trect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'left_sindent',
    'float64',
    'top_sindent',
    'float64',
    'right_sindent',
    'float64',
    'bottom_sindent',
    'float64',
    'tindent',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'tmargin',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'textid',
    'int16',
    'textflags',
    'uint16',
    'ascent',
    'uint16',
    'vjust',
    'uint16',
    'just',
    'uint16',
    'textgrow',
    'uint16',
    'tangle',
    'int16',
    'gtangle',
    'int16',
    'ltrect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'commentid',
    'int16',
    'textwrapwidth',
    'int32',
    'linetextx',
    'float64',
    'linetexty',
    'int32',
    'visiorotationdiff',
    'int32'
  ]

  static DrawTextStruct106 = [
    'trect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'left_sindent',
    'float64',
    'top_sindent',
    'float64',
    'right_sindent',
    'float64',
    'bottom_sindent',
    'float64',
    'tindent',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'tmargin',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'textid',
    'int16',
    'textflags',
    'uint16',
    'ascent',
    'uint16',
    'vjust',
    'uint16',
    'just',
    'uint16',
    'textgrow',
    'uint16',
    'tangle',
    'int16',
    'gtangle',
    'int16',
    'ltrect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'commentid',
    'int16',
    'textwrapwidth',
    'int32',
    'linetextx',
    'float64',
    'linetexty',
    'int32'
  ]

  static DrawTextStruct94 = [
    'trect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'left_sindent',
    'float64',
    'top_sindent',
    'float64',
    'right_sindent',
    'float64',
    'bottom_sindent',
    'float64',
    'tindent',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'tmargin',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'textid',
    'int16',
    'textflags',
    'uint16',
    'ascent',
    'uint16',
    'vjust',
    'uint16',
    'just',
    'uint16',
    'textgrow',
    'uint16',
    'tangle',
    'int16',
    'gtangle',
    'int16',
    'ltrect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'commentid',
    'int16',
    'textwrapwidth',
    'int32'
  ]

  static DrawTextStruct = [
    'trect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'left_sindent',
    'float64',
    'top_sindent',
    'float64',
    'right_sindent',
    'float64',
    'bottom_sindent',
    'float64',
    'tindent',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'tmargin',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'textid',
    'int16',
    'textflags',
    'uint16',
    'ascent',
    'uint16',
    'vjust',
    'uint16',
    'just',
    'uint16',
    'textgrow',
    'uint16',
    'tangle',
    'int16',
    'gtangle',
    'int16',
    'ltrect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'commentid',
    'int16'
  ]

  static DrawTextStruct810 = [
    'trect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'left_sindent',
    'float64',
    'top_sindent',
    'float64',
    'right_sindent',
    'float64',
    'bottom_sindent',
    'float64',
    'tindent',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'tmargin',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'textid',
    'int16',
    'textflags',
    'uint16',
    'ascent',
    'uint16',
    'vjust',
    'uint16',
    'just',
    'uint16',
    'textgrow',
    'uint16',
    'tangle',
    'int16',
    'gtangle',
    'int16',
    'ltrect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    }
  ]

  static DrawTextStruct300 = [
    'trect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'left_sindent',
    'float64',
    'top_sindent',
    'float64',
    'right_sindent',
    'float64',
    'bottom_sindent',
    'float64',
    'tindent',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'tmargin',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'textid',
    'int16',
    'textflags',
    'uint16',
    'ascent',
    'uint16',
    'vjust',
    'uint16',
    'just',
    'uint16',
    'textgrow',
    'uint16',
    'tangle',
    'int16',
    'gtangle',
    'int16'
  ]

  static LonText8Struct8 = [
    'InstID',
    'int32',
    'nstyles',
    'int32'
  ]

  static LongText8Struct = [
    'InstID',
    'int32',
    'nruns',
    'int32',
    'nstyles',
    'int32',
    'nchar',
    'int32',
    'flags',
    'int32',
    'margins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'nlinks',
    'int32',
    'nlinkchar',
    'int32',
    'markupobjid',
    'int32'
  ]

  static LongTextStruct = [
    'InstID',
    'int16',
    'nruns',
    'int16',
    'nstyles',
    'int16',
    'nchar',
    'uint32',
    'flags',
    'uint16',
    'margins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'shaddisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'shadowstyle',
    'int16',
    'scolor',
    'uint32',
    'hcolor',
    'uint32',
    'nlinks',
    'uint32',
    'nlinkchar',
    'uint32'
  ]

  static TextStruct = [
    'InstID',
    'int16',
    'nruns',
    'int16',
    'nstyles',
    'int16',
    'nchar',
    'uint16',
    'flags',
    'uint16',
    'margins',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'shaddisp',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'shadowstyle',
    'int16',
    'scolor',
    'uint32',
    'hcolor',
    'uint32'
  ]

  static TextCodeStruct = [
    'code',
    'uint16',
    'value',
    'uint32'
  ]

  static TextCodeStructFloat = [
    'code',
    'uint16',
    'value',
    'float64'
  ]

  static TextCodeStructCode = [
    'code',
    'uint16'
  ]

  static TextCodeStructValue = [
    'value',
    'uint32'
  ]

  static TextCodeStructValueFloat = [
    'value',
    'float64'
  ]

  static TextRunsHeader = [
    'nruns',
    'uint16'
  ]

  static TextChangeHeader = [
    'ncodes',
    'uint16',
    'offset',
    'uint32'
  ]

  static StyleCodeStruct = [
    'code',
    'uint16',
    'value',
    'int16'
  ]

  static TextStyleHeader = [
    'index',
    'uint16',
    'ncodes',
    'uint16'
  ]

  static TextLinkHeader = [
    'index',
    'uint16',
    'type',
    'uint16'
  ]

  static PolyListStruct24 = [
    'InstID',
    'int16',
    'n',
    'int16',
    'flags',
    'uint32',
    'ldim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DPointStruct, t)
      }
    }
  ]

  static PolyListStruct20 = [
    'InstID',
    'int16',
    'n',
    'int16',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'flags',
    'uint32',
    'ldim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    }
  ]

  static PolyListStruct8 = [
    'InstID',
    'int16',
    'n',
    'int16',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    }
  ]

  static PolyListStruct12 = [
    'InstID',
    'int16',
    'n',
    'int16',
    'dim',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'flags',
    'uint32'
  ]

  static PolySegStruct18 = [
    'otype',
    'int16',
    'dataclass',
    'int16',
    'ShortRef',
    'int16',
    'param',
    'float64',
    'lpt',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    }
  ]

  static PolySegStruct26 = [
    'otype',
    'int16',
    'dataclass',
    'int16',
    'ShortRef',
    'int16',
    'param',
    'float64',
    'pt',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'lpt',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    }
  ]

  static PolySegStruct = [
    'otype',
    'int16',
    'dataclass',
    'int16',
    'ShortRef',
    'int16',
    'param',
    'float64',
    'pt',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'lpt',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'dimDeflection',
    'int16'
  ]

  static PolySegStruct847 = [
    'otype',
    'int16',
    'dataclass',
    'int16',
    'ShortRef',
    'int16',
    'param',
    'float64',
    'pt',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'lpt',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'dimDeflection',
    'int16',
    'flags',
    'int32'
  ]

  static PolySegStruct50 = [
    'otype',
    'int16',
    'dataclass',
    'int16',
    'ShortRef',
    'int16',
    'param',
    'float64',
    'lpt',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DPointStruct, t)
      }
    },
    'dimDeflection',
    'float64',
    'flags',
    'int32',
    'weight',
    'float64'
  ]

  static PolySegStruct40 = [
    'otype',
    'int16',
    'dataclass',
    'int16',
    'ShortRef',
    'int16',
    'param',
    'float64',
    'pt',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'lpt',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LPointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LPointStruct, t)
      }
    },
    'dimDeflection',
    'int16',
    'flags',
    'int32',
    'weight',
    'float64'
  ]

  static PolySegExplicitPointStruct = [
    'npts',
    'int16',
    'pt',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < ShapeConstant.SED_NParaPts; ++t) a = e.readStruct(ShapeConstant.LPointStruct),
          r.push(a);
        return r
      },
      set: function (e, t) {
        var a;
        for (a = 0; a < ShapeConstant.SED_NParaPts; ++a) e.writeStruct(ShapeConstant.LPointStruct, t[a])
      }
    }
  ]

  static FreehandLineStruct = [
    'InstID',
    'int16',
    'npts',
    'int16',
    'pts',
    {
      get: function (e, t) {
        var a,
          r,
          i = [];
        for (a = 0; a < t.npts; a++) r = e.readStruct(ShapeConstant.DPointStruct),
          i.push(r);
        return i
      },
      set: function (e, t, a) {
        var r;
        for (r = 0; r < a.npts; ++r) e.writeStruct(ShapeConstant.DPointStruct, t[r])
      }
    }
  ]

  static ConnectPointStruct = [
    'nconnect',
    'int32',
    'connect',
    {
      get: function (e, t) {
        var a,
          r,
          i = [];
        for (a = 0; a < t.nconnect; ++a) r = e.readStruct(ShapeConstant.LPointStruct),
          i.push(r);
        return i
      },
      set: function (e, t, a) {
        var r;
        for (r = 0; r < a.nconnect; ++r) e.writeStruct(ShapeConstant.LPointStruct, t[r])
      }
    }
  ]

  static LinkStruct = [
    'targetid',
    'uint16',
    'tindex',
    'int16',
    'hookid',
    'uint16',
    'hindex',
    'int16',
    'flags',
    'uint16',
    'cellid',
    'uint32'
  ]

  static Link6Struct = [
    'targetid',
    'uint16',
    'tindex',
    'int16',
    'hookid',
    'uint16',
    'hindex',
    'int16',
    'flags',
    'uint16'
  ]

  static LinkListStruct = [
    'n',
    'int16',
    'size',
    'int16',
    'links',
    {
      get: function (e, t) {
        var a,
          r,
          i = [];
        for (a = 0; a < t.n; ++a) r = e.readStruct(ShapeConstant.LinkStruct),
          i.push(r);
        return i
      },
      set: function (e, t, a) {
        var r;
        for (r = 0; r < a.n; ++r) e.writeStruct(ShapeConstant.LinkStruct, t[r])
      }
    }
  ]

  static LinkList6Struct = [
    'n',
    'int16',
    'size',
    'int16',
    'links',
    {
      get: function (e, t) {
        var a,
          r,
          i = [];
        for (a = 0; a < t.n; ++a) r = e.readStruct(ShapeConstant.Link6Struct),
          i.push(r);
        return i
      },
      set: function (e, t, a) {
        var r;
        for (r = 0; r < a.n; ++r) e.writeStruct(ShapeConstant.Link6Struct, t[r])
      }
    }
  ]

  static ArrayHookTextStruct = [
    'tindex',
    'int32',
    'tuniqueid',
    'uint32'
  ]

  static SegLineStruct210 = [
    'InstId',
    'int16',
    'firstdir',
    'int16',
    'lastdir',
    'int16',
    'curveparam',
    'int16',
    'nsegs',
    'int16',
    'lsegr',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < 5; ++t) a = e.readStruct(ShapeConstant.DRectStruct),
          r.push(a);
        return r
      },
      set: function (e, t) {
        var a;
        for (a = 0; a < 5; ++a) e.writeStruct(ShapeConstant.DRectStruct, t[a])
      }
    },
    'llengths',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < 5; ++t) a = e.readFloat64(),
          r.push(a);
        return r
      },
      set: function (e, t) {
        var a;
        for (a = 0; a < 5; ++a) e.writeFloat64(t[a])
      }
    }
  ]

  static SegLineStruct208 = [
    'InstId',
    'int16',
    'firstdir',
    'int16',
    'lastdir',
    'int16',
    'nsegs',
    'int16',
    'lsegr',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < 5; ++t) a = e.readStruct(ShapeConstant.DRectStruct),
          r.push(a);
        return r
      },
      set: function (e, t) {
        var a;
        for (a = 0; a < 5; ++a) e.writeStruct(ShapeConstant.DRectStruct, t[a])
      }
    },
    'llengths',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < 5; ++t) a = e.readFloat64(),
          r.push(a);
        return r
      },
      set: function (e, t) {
        var a;
        for (a = 0; a < 5; ++a) e.writeFloat64(t[a])
      }
    }
  ]

  static SegLineStruct = [
    'InstId',
    'int16',
    'firstdir',
    'int16',
    'lastdir',
    'int16',
    'nsegs',
    'int16',
    'segr',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < 5; ++t) a = e.readStruct(ShapeConstant.RectStruct),
          r.push(a);
        return r
      },
      set: function (e, t) {
        var a;
        for (a = 0; a < 5; ++a) e.writeStruct(ShapeConstant.RectStruct, t[a])
      }
    },
    'lengths',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < 5; ++t) a = e.readInt16(),
          r.push(a);
        return r
      },
      set: function (e, t) {
        var a;
        for (a = 0; a < 5; ++a) e.writeInt16(t[a])
      }
    },
    'lsegr',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < 5; ++t) a = e.readStruct(ShapeConstant.LRectStruct),
          r.push(a);
        return r
      },
      set: function (e, t) {
        var a;
        for (a = 0; a < 5; ++a) e.writeStruct(ShapeConstant.LRectStruct, t[a])
      }
    },
    'llengths',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < 5; ++t) a = e.readInt32(),
          r.push(a);
        return r
      },
      set: function (e, t) {
        var a;
        for (a = 0; a < 5; ++a) e.writeInt32(t[a])
      }
    }
  ]

  static SegLineStruct58 = [
    'InstId',
    'int16',
    'firstdir',
    'int16',
    'lastdir',
    'int16',
    'nsegs',
    'int16',
    'segr',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < 5; ++t) a = e.readStruct(ShapeConstant.RectStruct),
          r.push(a);
        return r
      },
      set: function (e, t) {
        var a;
        for (a = 0; a < 5; ++a) e.writeStruct(ShapeConstant.RectStruct, t[a])
      }
    },
    'lengths',
    {
      get: function (e) {
        var t,
          a,
          r = [];
        for (t = 0; t < 5; ++t) a = e.readInt16(),
          r.push(a);
        return r
      },
      set: function (e, t) {
        var a;
        for (a = 0; a < 5; ++a) e.writeInt16(t[a])
      }
    }
  ]

  static ArrayStruct30 = [
    'InstID',
    'int16',
    'styleflags',
    'uint16',
    'tilt',
    'int16',
    'nshapes',
    'int16',
    'nlines',
    'int16',
    'lht',
    'float64',
    'lwd',
    'float64',
    'angle',
    'int32'
  ]

  static ArrayStruct34 = [
    'InstID',
    'int16',
    'styleflags',
    'uint16',
    'tilt',
    'int16',
    'nshapes',
    'int16',
    'nlines',
    'int16',
    'lht',
    'float64',
    'lwd',
    'float64',
    'angle',
    'int32',
    'curveparam',
    'int32'
  ]

  static ArrayStruct = [
    'InstID',
    'int16',
    'styleflags',
    'uint16',
    'tilt',
    'int16',
    'ht',
    'int16',
    'wd',
    'int16',
    'nshapes',
    'int16',
    'nlines',
    'int16',
    'lht',
    'int32',
    'lwd',
    'int32',
    'profile',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'angle',
    'int32'
  ]

  static ArrayStruct38 = [
    'InstID',
    'int16',
    'styleflags',
    'uint16',
    'tilt',
    'int16',
    'ht',
    'int16',
    'wd',
    'int16',
    'nshapes',
    'int16',
    'nlines',
    'int16',
    'lht',
    'int32',
    'lwd',
    'int32',
    'profile',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    }
  ]

  static ArrayStruct14 = [
    'InstID',
    'int16',
    'styleflags',
    'uint16',
    'tilt',
    'int16',
    'ht',
    'int16',
    'wd',
    'int16',
    'nshapes',
    'int16',
    'nlines',
    'int16'
  ]

  static ArrayHookStruct50 = [
    'uniqueid',
    'uint16',
    'extra',
    'float64',
    'lliner',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DRectStruct, t)
      }
    },
    'lgap',
    'float64'
  ]

  static ArrayHookStruct38 = [
    'liner',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'uniqueid',
    'uint16',
    'index',
    'int16',
    'gap',
    'int16',
    'extra',
    'int32',
    'lliner',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'lgap',
    'int32'
  ]

  static ArrayHookStruct18 = [
    'liner',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'uniqueid',
    'uint16',
    'index',
    'int16',
    'gap',
    'int16',
    'extra',
    'int32'
  ]

  static ArrayHookStruct14 = [
    'liner',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'uniqueid',
    'uint16',
    'index',
    'int16',
    'gap',
    'int16'
  ]

  static ContainerListStruct100 = [
    'Arrangement',
    'int32',
    'HorizontalSpacing',
    'float64',
    'VerticalSpacing',
    'float64',
    'AlignH',
    'string:8',
    'AlignV',
    'string:8',
    'Wrap',
    'int32',
    'height',
    'float64',
    'width',
    'float64',
    'MinWidth',
    'float64',
    'MinHeight',
    'float64',
    'flags',
    'int32',
    'nacross',
    'int32',
    'ndown',
    'int32',
    'childwidth',
    'float64',
    'childheight',
    'float64'
  ]

  static ContainerListStruct92 = [
    'Arrangement',
    'int32',
    'HorizontalSpacing',
    'int32',
    'VerticalSpacing',
    'int32',
    'AlignH',
    'string:8',
    'AlignV',
    'string:8',
    'Wrap',
    'int32',
    'height',
    'float64',
    'width',
    'float64',
    'MinWidth',
    'float64',
    'MinHeight',
    'float64',
    'flags',
    'int32',
    'nacross',
    'int32',
    'ndown',
    'int32',
    'childwidth',
    'float64',
    'childheight',
    'float64'
  ]

  static ContainerHookStruct20 = [
    'x',
    'float64',
    'y',
    'float64',
    'id',
    'int32'
  ]

  static ContainerHookStruct28 = [
    'x',
    'float64',
    'y',
    'float64',
    'id',
    'int32',
    'extra',
    'float64'
  ]

  static ObjDataStruct16 = [
    'datasetID',
    'int32',
    'datasetElemID',
    'int32',
    'datasetType',
    'int32',
    'datasetTableID',
    'int32'
  ]

  static ObjDataStruct32 = [
    'datasetID',
    'int32',
    'datasetElemID',
    'int32',
    'datasetType',
    'int32',
    'datasetTableID',
    'int32',
    'fieldDataDatasetID',
    'int32',
    'fieldDataElemID',
    'int32',
    'fieldDataTableID',
    'int32',
    'fieldDataDatasetID',
    'int32'
  ]

  static RulerStruct = [
    'show',
    'int16',
    'inches',
    'int16',
    'Major',
    'float64',
    'MinorDenom',
    'int16',
    'MajorScale',
    'float64',
    'units',
    'int16',
    'dp',
    'int32',
    'originx',
    'float64',
    'originy',
    'float64'
  ]

  static RulerStruct24 = [
    'show',
    'int16',
    'inches',
    'int16',
    'Major',
    'float64',
    'MinorDenom',
    'int16',
    'MajorScale',
    'float64',
    'units',
    'int16'
  ]

  static RulerStruct48 = [
    'show',
    'int16',
    'inches',
    'int16',
    'Major',
    'float64',
    'MinorDenom',
    'int16',
    'MajorScale',
    'float64',
    'units',
    'int16',
    'dp',
    'int32',
    'originx',
    'float64',
    'originy',
    'float64',
    'showpixels',
    'int32'
  ]

  static RulerStruct52 = [
    'show',
    'int16',
    'inches',
    'int16',
    'Major',
    'float64',
    'MinorDenom',
    'int16',
    'MajorScale',
    'float64',
    'units',
    'int16',
    'dp',
    'int32',
    'originx',
    'float64',
    'originy',
    'float64',
    'showpixels',
    'int32',
    'fractionaldenominator',
    'int32'
  ]

  static DrawImage8Struct82 = [
    'mr',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DCRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DCRectStruct, t)
      }
    },
    'croprect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DRectStruct, t)
      }
    },
    'imageflags',
    'int32',
    'scale',
    'float64',
    'uniqueid',
    'uint32',
    'iconid',
    'uint16'
  ]

  static DrawImage8Struct50 = [
    'mr',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'croprect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'imageflags',
    'int32',
    'scale',
    'float64',
    'uniqueid',
    'uint32',
    'iconid',
    'uint16'
  ]

  static DrawImage8Struct48 = [
    'mr',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'croprect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.LRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.LRectStruct, t)
      }
    },
    'imageflags',
    'int32',
    'scale',
    'float64',
    'uniqueid',
    'uint32'
  ]

  static BeginTheme12Struct = [
    'name',
    'u16stringle:32',
    'ncolorrows',
    'int32',
    'ncolorcols',
    'int32',
    'EffectStyleIndex',
    'int32'
  ]

  static BeginTextfStruct = [
    'fontid',
    'int32',
    'fsize',
    'int32',
    'face',
    'int32'
  ]

  static OutSideEffectStruct = [
    'outsidetype',
    'int32',
    'extent',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.DRectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.DRectStruct, t)
      }
    },
    'color',
    'uint32',
    'lparam',
    'int32',
    'wparam',
    'int32'
  ]

  static ThemeFont12Struct = [
    'fontname',
    'u16stringle:32',
    'charset',
    'int32'
  ]

  static BeginLineStruct8 = [
    'thickness',
    'int32',
    'pattern',
    'int32'
  ]

  static BeginLineStruct12 = [
    'thickness',
    'int32',
    'pattern',
    'float64'
  ]

  static BeginLineStruct14 = [
    'thickness',
    'float64',
    'pattern',
    'int32',
    'dummy',
    'int16'
  ]

  static BeginPaintStruct = [
    'filltype',
    'uint32',
    'color',
    'uint32'
  ]

  static GradientStruct = [
    'gradientflags',
    'uint32',
    'ecolor',
    'uint32'
  ]

  static RichGradientStruct = [
    'gradienttype',
    'uint32',
    'angle',
    'uint32',
    'nstops',
    'uint32'
  ]

  static RichGradientStopStruct = [
    'color',
    'uint32',
    'stop',
    'uint32'
  ]

  static EffectStruct = [
    'effecttype',
    'int32',
    'effectcolor',
    'uint32',
    'wparam',
    'int32',
    'lparam',
    'int32'
  ]

  static FilledLineStruct = [
    'bthick',
    'float64',
    'color',
    'uint32'
  ]

  static DrawArrowStruct = [
    'arrowsize',
    'uint32',
    'sarrow',
    'uint32',
    'earrow',
    'uint32',
    'sarrowid',
    'uint32',
    'earrowid',
    'uint32'
  ]

  static DrawHookStruct = [
    'objid',
    'uint16',
    'index',
    'int16',
    'connectx',
    'int16',
    'connecty',
    'int16',
    'hookpt',
    'int16',
    'cellid',
    'uint32'
  ]

  static DrawHookStruct10 = [
    'objid',
    'uint16',
    'index',
    'int16',
    'connectx',
    'int16',
    'connecty',
    'int16',
    'hookpt',
    'int16'
  ]

  static DrawHookVisioStruct = [
    'objid',
    'uint16',
    'index',
    'int16',
    'connectx',
    'int16',
    'connecty',
    'int16',
    'hookpt',
    'int16',
    'cellid',
    'uint32',
    'lconnectx',
    'int32',
    'lconnecty',
    'int32'
  ]

  static LongValueStruct = [
    'value',
    'uint32'
  ]

  static LongValue2Struct = [
    'value',
    'uint32',
    'type',
    'uint32'
  ]

  static DrawBOrderStruct = [
    'bord',
    'uint16',
    'patindex',
    'int16',
    'color',
    'uint32'
  ]

  static GanttinfoStruct = [
    'timeScale',
    'uint32',
    'flags',
    'uint32',
    'configuredStart1',
    'uint32',
    'configuredStart2',
    'uint32',
    'configuredEnd1',
    'uint32',
    'configuredEnd2',
    'uint32',
    'start1',
    'uint32',
    'start2',
    'uint32',
    'end1',
    'uint32',
    'end2',
    'uint32',
    'scrollStart1',
    'uint32',
    'scrollStart2',
    'uint32',
    'scrollEnd1',
    'uint32',
    'scrollEnd2',
    'uint32'
  ]

  static DrawLineStruct = [
    'bord',
    'uint16',
    'patindex',
    'int16',
    'color',
    'uint32',
    'arrowsize',
    'uint16',
    'sarrow',
    'uint16',
    'earrow',
    'uint16',
    'sarrowid',
    'uint16',
    'earrowid',
    'uint16'
  ]

  static DrawFillStruct = [
    'fpatindex',
    'uint16',
    'color',
    'uint32',
    'gradientflags',
    'int32',
    'ecolor',
    'uint32'
  ]

  static DrawFillStruct6 = [
    'fpatindex',
    'uint16',
    'color',
    'uint32'
  ]

  static GraphStruct = [
    'stackScale',
    'uint16',
    'pointflags',
    'uint16',
    'valuePrecision',
    'uint16',
    'pieChartCategory',
    'uint16',
    'pieOriginTangle',
    'uint16',
    'flags',
    'uint16',
    'prefixChar',
    'uint16',
    'graphtype',
    'uint16',
    'quadrant',
    'uint16',
    'barAreaAmount',
    'float64',
    'barAreaAmountStacked',
    'float64',
    'npoints',
    'uint16',
    'imageValueRep',
    'uint16',
    'graphLegendType',
    'uint16',
    'perspectiveView3D',
    'float64',
    'effectLightDirection3D',
    'uint16',
    'suffixChar',
    'uint16'
  ]

  static GraphAxisStruct = [
    'orientation',
    'uint16',
    'flags',
    'uint16',
    'lflags',
    'uint16',
    'fixedpoint',
    'uint16',
    'frame',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'margin',
    'uint16',
    'startpref',
    'float64',
    'endpref',
    'float64',
    'start',
    'float64',
    'end',
    'float64',
    'major',
    'float64',
    'majorscale',
    'float64',
    'minor',
    'float64',
    'minorscale',
    'float64',
    'tickstyles',
    'uint16',
    'labelformat',
    'uint16',
    'summaryflags',
    'uint32',
    'majorpref',
    'float64',
    'minorpref',
    'float64'
  ]

  static GraphPointStruct = [
    'dataid',
    'uint16',
    'seriesid',
    'uint16',
    'categoryid',
    'uint16',
    'value',
    'float64',
    'frame',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'tangle',
    'uint16',
    'flags',
    'uint16',
    'labelformat',
    'uint16',
    'explodeAmt',
    'uint16',
    'labelstyle',
    'uint16',
    'imagescale',
    'float64',
    'imagerect',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'labelTextId',
    'uint16',
    'labelTangle',
    'uint16',
    'labelFrame',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'labelCenter',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    }
  ]

  static GraphAxisTitleStruct = [
    'lflags',
    'uint16',
    'just',
    'uint16',
    'margin',
    'uint16',
    'frame',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'tangle',
    'uint16',
    'drawpt',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'center',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    }
  ]

  static GraphAxisLabelStruct = [
    'categoryid',
    'uint16',
    'lflags',
    'uint16',
    'frame',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'tangle',
    'uint16',
    'center',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.PointStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.PointStruct, t)
      }
    },
    'textid',
    'uint16',
    'just',
    'uint16',
    'vjust',
    'uint16'
  ]

  static GraphLegendEntryStruct = [
    'seriesid',
    'uint16',
    'lflags',
    'uint16',
    'textid',
    'uint16',
    'imgIndx',
    'uint16',
    'textFrame',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'swatchFrame',
    {
      get: function (e) {
        return e.readStruct(ShapeConstant.RectStruct)
      },
      set: function (e, t) {
        e.writeStruct(ShapeConstant.RectStruct, t)
      }
    },
    'flags',
    'uint16'
  ]

  static LayerListStruct = [
    'n',
    'int32',
    'zList',
    {
      get: function (e, t) {
        var a,
          r,
          i = [];
        for (a = 0; a < t.n; ++a) r = e.readInt32(e.endianness),
          i.push(r);
        return i
      },
      set: function (e, t, a) {
        var r;
        for (r = 0; r < a.n; ++r) e.writeInt32(t[r], e.endianness)
      }
    }
  ]

  static OleHeaderStruct = [
    'dva',
    'uint32',
    'linked',
    'int16',
    'scale',
    'float64'
  ]

  static parseVersion = function (e) {
    return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.VersionStruct)
  }

  static parseHeader = function (e) {
    return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.HeaderStruct)
  }

  static parseHeader810 = function (e) {
    return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.HeaderStruct810)
  }

  static parseHeader22 = function (e) {
    return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.HeaderStruct22)
  }

  static parseHeader14 = function (e) {
    return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.HeaderStruct14)
  }

  static parseUIInfo = function (e, t) {
    return 60 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.UIInfoStruct60) : 56 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.UIInfoStruct56) : 52 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.UIInfoStruct52) : 40 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.UIInfoStruct40) : 36 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.UIInfoStruct36) : new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.UIInfoStruct)
  }

  static parseLibList = function (e) {
    return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.LibListStruct)
  }

  static parseTextureExtra = function (e) {
    return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.TextureExtraStruct)
  }

  static parsePage126 = function (e) {
    return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.PageStruct126)
  }

  static parsePage62 = function (e) {
    return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.PageStruct62)
  }

  static parsePage34 = function (e) {
    return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.PageStruct34)
  }

  static parsePage30 = function (e) {
    return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.PageStruct30)
  }

  /**
   * Parses original template data from a binary buffer
   * @param buffer - The binary buffer containing template data
   * @returns An object with template name and length fields
   */
  static parseOrigTemplate = function (buffer) {
    const structDefinition = [
      'name',
      'u16stringle:' + (buffer.length / 2 - 1),
      'length',
      'u16stringle:1'
    ];
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(structDefinition);
  }

  /**
   * Parses original template data (version 8) from a binary buffer
   * @param buffer - The binary buffer containing template data with 8-bit character encoding
   * @returns An object with template name and length fields
   */
  static parseOrigTemplate8 = function (buffer) {
    const structDefinition = [
      'name',
      'string:' + (buffer.length - 1),
      'length',
      'string:1'
    ];
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(structDefinition);
  }

  /**
   * Parses a LONGVALUE structure from binary data
   * @param buffer - The binary buffer containing LONGVALUE data
   * @returns A structured object containing the parsed LONGVALUE data
   */
  static parseLongValue = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.LongValueStruct)
  }

  /**
   * Parses a highlight structure from binary data
   * @param buffer - The binary buffer containing highlight data
   * @returns A structured object containing folder type, spare value, and path information
   */
  static parseHighlight = function (buffer) {
    const structDefinition = [
      'folderType',
      'int32',
      'spareValue',
      'int32',
      'path',
      'u16stringle:' + (buffer.length - 8) / 2
    ];

    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(structDefinition);
  }

  /**
   * Parses text link data from a binary buffer
   * @param buffer - The binary buffer containing text link data
   * @returns A structured object with index, type, and path properties
   */
  static parseTextLink = function (buffer) {
    const structDefinition = [
      'index',
      'uint16',
      'type',
      'uint16',
      'path',
      'u16stringle:' + (buffer.length - 4) / 2
    ];
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(structDefinition);
  }

  /**
   * Parses comment data from a binary buffer
   * @param buffer - The binary buffer containing comment data
   * @returns A structured object with ObjectID, UserID, timestamp, and comment text
   */
  static parseComment = function (buffer) {
    const structDefinition = [
      'ObjectID',
      'int32',
      'UserID',
      'uint32',
      'timestamp',
      'float64',
      'comment',
      'u16stringle:' + (buffer.length - 16) / 2
    ];
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(structDefinition);
  }

  /**
   * Parses text data from a binary buffer
   * @param buffer - The binary buffer containing text data
   * @returns A structured object with index and dataField properties
   */
  static parseTextData = function (buffer) {
    const structDefinition = [
      'index',
      'uint16',
      'dataField',
      'u16stringle:' + (buffer.length - 2) / 2
    ];
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(structDefinition);
  }

  /**
   * Parses 3D settings from a binary buffer
   * @param buffer - The binary buffer containing 3D settings data
   * @returns An object containing 3D settings as a string
   */
  static parseD3Settings = function (buffer) {
    const structDefinition = [
      'settings',
      'u16stringle:' + buffer.length / 2
    ];
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(structDefinition);
  }

  /**
   * Cleans a font face name by removing invalid characters
   * @param fontObject - The font object containing an lfFaceName property to clean
   */
  static CleanlfFaceName = function (fontObject) {
    const nameLength = fontObject.lfFaceName.length;
    let cleanedName = '';

    for (let i = 0; i < nameLength && Number(fontObject.lfFaceName.charCodeAt(i)) > 0; i++) {
      cleanedName += fontObject.lfFaceName[i];
    }

    fontObject.lfFaceName = cleanedName;
  }

  /**
   * Parses dimension font data from a binary buffer
   * @param buffer - The binary buffer containing font data
   * @param size - The size of the font data (not used in function body)
   * @returns A structured object containing the parsed font data
   */
  static parseDimFont = function (buffer, size) {
    if (ShapeConstant.ReadUnicode) {
      return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.LOGFontStruct);
    } else {
      return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.LOGFontStructPreV1);
    }
  }

  /**
   * Parses font name data (v12 format) from a binary buffer
   * @param buffer - The binary buffer containing font name data
   * @returns A structured object containing the parsed and cleaned font name data
   */
  static parseFontName12 = function (buffer) {
    const fontData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.FontName12Struct);
    ShapeConstant.CleanlfFaceName(fontData);
    return fontData;
  }

  /**
   * Parses font name data from a binary buffer
   * @param buffer - The binary buffer containing font name data
   * @returns A structured object containing the parsed and cleaned font name data
   */
  static parseFontName = function (buffer) {
    const fontData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.FontNameStruct);
    ShapeConstant.CleanlfFaceName(fontData);
    return fontData;
  }

  /**
   * Parses font name data (v15 format) from a binary buffer
   * @param buffer - The binary buffer containing font name data
   * @returns A structured object containing the parsed and cleaned font name data
   */
  static parseFontName15 = function (buffer) {
    const fontData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.FontName15Struct);
    ShapeConstant.CleanlfFaceName(fontData);
    return fontData;
  }

  /**
   * Parses drawing data (356-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw12356 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw12Struct356);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (420-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw12420 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw12Struct420);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (440-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw12440 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw12Struct440);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (364-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw12364 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw12Struct364);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (360-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw12360 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw12Struct847);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (352-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw12352 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw12Struct842);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (348-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw12348 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw12Struct841);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (344-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw12344 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw12Struct836);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (340-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw12340 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw12Struct835);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (336-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw12336 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw12Struct835);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (272-byte structure, version 8 format) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw8272 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw8Struct);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (264-byte structure, version 8 format) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw8264 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw8Struct825);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (228-byte structure, version 8 format) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw8228 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw8Struct810);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (224-byte structure, version 8 format) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw8224 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw8Struct224);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (216-byte structure, version 8 format) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw8216 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw8Struct800);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data (252-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw252 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDrawStruct252);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data from a 236-byte structure binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw236 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDrawStruct236);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing data from a 52-byte structure (version 7 format) binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data
   */
  static parseDraw752 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw7Struct52);
  }

  /**
   * Parses drawing data from a 48-byte structure (version 7 format) binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data
   */
  static parseDraw748 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDraw7Struct48);
  }

  /**
   * Parses extra drawing data from a 14-byte structure binary buffer
   * @param buffer - The binary buffer containing extra drawing data
   * @returns A structured object containing the parsed extra drawing data
   */
  static parseDrawExtra14 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDrawExtraStruct14);
  }

  /**
   * Parses drawing object data (version 5) from a 60-byte structure binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj560 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDrawObj5Struct60);
  }

  /**
   * Parses drawing data from a 268-byte structure binary buffer
   * @param buffer - The binary buffer containing drawing data
   * @returns A structured object containing the parsed drawing data with cleaned font information
   */
  static parseDraw268 = function (buffer) {
    const drawData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.CDrawStruct268);
    ShapeConstant.CleanlfFaceName(drawData.lf);
    return drawData;
  }

  /**
   * Parses drawing object data (version 8, 848-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj8848 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawObj8Struct848);
  }

  /**
   * Parses drawing object data (version 8, 312-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj8312 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawObj8Struct312);
  }

  /**
   * Parses drawing object data (version 8, 316-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj8316 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawObj8Struct316);
  }

  /**
   * Parses drawing object data (version 8, 448-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj8448 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawObj8Struct448);
  }

  /**
   * Parses drawing object data (version 8, 847-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj8847 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawObj8Struct);
  }

  /**
   * Parses drawing object data (version 8, 837-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj8837 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawObj8Struct837);
  }

  /**
   * Parses drawing object data (version 8, 830-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj8830 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawObj8Struct830);
  }

  /**
   * Parses drawing object data (version 8, 810-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj8810 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawObj8Struct810);
  }

  /**
   * Parses drawing object data (version 8, 824-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj8824 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawObj8Struct824);
  }

  /**
   * Parses drawing object data (version 8, 814-byte structure) from a binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj8814 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawObj8Struct814);
  }

  /**
   * Parses drawing object data based on the provided size
   * @param buffer - The binary buffer containing drawing object data
   * @param size - The size of the data structure to read (in bytes)
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj = function (buffer, size) {
    if (size === 148) {
      return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.DrawObjStruct148);
    } else {
      return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.DrawObjStruct);
    }
  }

  /**
   * Parses drawing text data from a binary buffer using the standard structure
   * @param buffer - The binary buffer containing drawing text data
   * @returns A structured object containing the parsed drawing text data
   */
  static parseDrawText = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawTextStruct);
  }

  /**
   * Parses drawing text data from a 182-byte structure binary buffer
   * @param buffer - The binary buffer containing drawing text data
   * @returns A structured object containing the parsed drawing text data
   */
  static parseDrawText182 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawTextStruct182);
  }

  /**
   * Parses drawing text data from a 110-byte structure binary buffer
   * @param buffer - The binary buffer containing drawing text data
   * @returns A structured object containing the parsed drawing text data
   */
  static parseDrawText110 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawTextStruct110);
  }

  /**
   * Parses drawing text data from a 106-byte structure binary buffer
   * @param buffer - The binary buffer containing drawing text data
   * @returns A structured object containing the parsed drawing text data
   */
  static parseDrawText106 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawTextStruct106);
  }

  /**
   * Parses drawing text data from a 94-byte structure binary buffer
   * @param buffer - The binary buffer containing drawing text data
   * @returns A structured object containing the parsed drawing text data
   */
  static parseDrawText94 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawTextStruct94);
  }

  /**
   * Parses drawing text data from an 88-byte structure binary buffer
   * @param buffer - The binary buffer containing drawing text data
   * @returns A structured object containing the parsed drawing text data
   */
  static parseDrawText88 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawTextStruct810);
  }

  /**
   * Parses drawing text data from a 72-byte structure binary buffer
   * @param buffer - The binary buffer containing drawing text data
   * @returns A structured object containing the parsed drawing text data
   */
  static parseDrawText72 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawTextStruct300);
  }

  /**
   * Parses paint data from binary buffer
   * @param buffer - The binary buffer containing paint data
   * @returns A structured object containing fill type and color information
   */
  static parseSDPaint = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct([
      'filltype',
      'uint32',
      'color',
      'uint32'
    ]);
  }

  /**
   * Parses 24-byte polygon list data from binary buffer
   * @param buffer - The binary buffer containing polygon list data
   * @returns A structured object containing polygon points and metadata
   */
  static parsePolyList24 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.PolyListStruct24);
  }

  /**
   * Parses 20-byte polygon list data from binary buffer
   * @param buffer - The binary buffer containing polygon list data
   * @returns A structured object containing polygon points and metadata
   */
  static parsePolyList20 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.PolyListStruct20);
  }

  /**
   * Parses 8-byte polygon list data from binary buffer
   * @param buffer - The binary buffer containing polygon list data
   * @returns A structured object containing polygon points and metadata
   */
  static parsePolyList8 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.PolyListStruct8);
  }

  /**
   * Parses 12-byte polygon list data from binary buffer
   * @param buffer - The binary buffer containing polygon list data
   * @returns A structured object containing polygon points and metadata
   */
  static parsePolyList12 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.PolyListStruct12);
  }

  /**
   * Parses polygon segment data from binary buffer
   * @param buffer - The binary buffer containing polygon segment data
   * @returns A structured object containing polygon segment information
   */
  static parsePolySeg = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.PolySegStruct);
  }

  /**
   * Parses 26-byte polygon segment data from binary buffer
   * @param buffer - The binary buffer containing polygon segment data
   * @returns A structured object containing polygon segment information
   */
  static parsePolySeg26 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.PolySegStruct26);
  }

  /**
   * Parses 18-byte polygon segment data from binary buffer
   * @param buffer - The binary buffer containing polygon segment data
   * @returns A structured object containing polygon segment information
   */
  static parsePolySeg18 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.PolySegStruct18);
  }

  /**
   * Parses 32-byte polygon segment data from binary buffer (version 847)
   * @param buffer - The binary buffer containing polygon segment data
   * @returns A structured object containing polygon segment information
   */
  static parsePolySeg32 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.PolySegStruct847);
  }

  /**
   * Parses 40-byte polygon segment data from binary buffer
   * @param buffer - The binary buffer containing polygon segment data
   * @returns A structured object containing polygon segment information
   */
  static parsePolySeg40 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.PolySegStruct40);
  }

  /**
   * Parses 50-byte polygon segment data from binary buffer
   * @param buffer - The binary buffer containing polygon segment data
   * @returns A structured object containing polygon segment information
   */
  static parsePolySeg50 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.PolySegStruct50);
  }

  /**
   * Parses explicit points for polygon segments from binary buffer
   * @param buffer - The binary buffer containing explicit point data
   * @returns A structured object containing explicit point information
   */
  static parsePolySegExplicitPoints = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.PolySegExplicitPointStruct);
  }

  /**
   * Parses freehand line data from binary buffer
   * @param buffer - The binary buffer containing freehand line data
   * @returns A structured object containing freehand line information
   */
  static parseFreehandLineStruct = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.FreehandLineStruct);
  }

  /**
   * Parses link list data from binary buffer
   * @param buffer - The binary buffer containing link list data
   * @returns A structured object containing link list information
   */
  static parseLinkList = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.LinkListStruct);
  }

  /**
   * Parses version 6 link list data from binary buffer
   * @param buffer - The binary buffer containing link list data
   * @returns A structured object containing link list information
   */
  static parseLinkList6 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.LinkList6Struct);
  }

  /**
   * Parses array hook text data from binary buffer
   * @param buffer - The binary buffer containing array hook text data
   * @returns A structured object containing array hook text information
   */
  static parseArrayHookText = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ArrayHookTextStruct);
  }

  /**
   * Parses 208-byte segment line data from binary buffer
   * @param buffer - The binary buffer containing segment line data
   * @returns A structured object containing segment line information
   */
  static parseSegLine208 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.SegLineStruct208);
  }

  /**
   * Parses 210-byte segment line data from binary buffer
   * @param buffer - The binary buffer containing segment line data
   * @returns A structured object containing segment line information
   */
  static parseSegLine210 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.SegLineStruct210);
  }

  /**
   * Parses standard segment line data from binary buffer
   * @param buffer - The binary buffer containing segment line data
   * @returns A structured object containing segment line information
   */
  static parseSegLine = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.SegLineStruct);
  }

  /**
   * Parses 58-byte segment line data from binary buffer
   * @param buffer - The binary buffer containing segment line data
   * @returns A structured object containing segment line information
   */
  static parseSegLine58 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.SegLineStruct58);
  }

  /**
   * Parses 30-byte array data from binary buffer
   * @param buffer - The binary buffer containing array data
   * @returns A structured object containing array information
   */
  static parseArray30 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ArrayStruct30);
  }

  /**
   * Parses 34-byte array data from binary buffer
   * @param buffer - The binary buffer containing array data
   * @returns A structured object containing array information
   */
  static parseArray34 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ArrayStruct34);
  }

  /**
   * Parses standard array data from binary buffer
   * @param buffer - The binary buffer containing array data
   * @returns A structured object containing array information
   */
  static parseArray = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ArrayStruct);
  }

  /**
   * Parses 38-byte array data from binary buffer
   * @param buffer - The binary buffer containing array data
   * @returns A structured object containing array information
   */
  static parseArray38 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ArrayStruct38);
  }

  /**
   * Parses 14-byte array data from binary buffer
   * @param buffer - The binary buffer containing array data
   * @returns A structured object containing array information
   */
  static parseArray14 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ArrayStruct14);
  }

  /**
   * Parses 50-byte array hook data from binary buffer
   * @param buffer - The binary buffer containing array hook data
   * @returns A structured object containing array hook information
   */
  static parseArrayHook50 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ArrayHookStruct50);
  }

  /**
   * Parses 38-byte array hook data from binary buffer
   * @param buffer - The binary buffer containing array hook data
   * @returns A structured object containing array hook information
   */
  static parseArrayHook38 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ArrayHookStruct38);
  }

  /**
   * Parses 18-byte array hook data from binary buffer
   * @param buffer - The binary buffer containing array hook data
   * @returns A structured object containing array hook information
   */
  static parseArrayHook18 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ArrayHookStruct18);
  }

  /**
   * Parses 14-byte array hook data from binary buffer
   * @param buffer - The binary buffer containing array hook data
   * @returns A structured object containing array hook information
   */
  static parseArrayHook14 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ArrayHookStruct14);
  }

  /**
   * Parses 100-byte container list data from binary buffer
   * @param buffer - The binary buffer containing container list data
   * @returns A structured object containing container list information
   */
  static parseContainerList100 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ContainerListStruct100);
  }

  /**
   * Parses 92-byte container list data from binary buffer
   * @param buffer - The binary buffer containing container list data
   * @returns A structured object containing container list information
   */
  static parseContainerList92 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ContainerListStruct92);
  }

  /**
   * Parses 20-byte container hook data from binary buffer
   * @param buffer - The binary buffer containing container hook data
   * @returns A structured object containing container hook information
   */
  static parseContainerHook20 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ContainerHookStruct20);
  }

  /**
   * Parses 28-byte container hook data from binary buffer
   * @param buffer - The binary buffer containing container hook data
   * @returns A structured object containing container hook information
   */
  static parseContainerHook28 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ContainerHookStruct28);
  }

  /**
   * Parses object data from binary buffer
   * @param buffer - The binary buffer containing object data
   * @param size - The size of the data structure in bytes
   * @returns A structured object containing object data information
   */
  static parseObjData = function (buffer, size) {
    let parsedData;

    if (size === 32) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.ObjDataStruct32);
    } else {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.ObjDataStruct16);
    }

    return parsedData;
  }

  /**
   * Parses image data from a binary buffer based on the structure size
   * @param buffer - The binary buffer containing image data
   * @param structSize - The size of the structure to be parsed
   * @returns A structured object containing the parsed image data
   */
  static parseDrawImage8 = function (buffer, structSize) {
    let parsedData;

    if (structSize === 48) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.DrawImage8Struct48);
    } else if (structSize === 50) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.DrawImage8Struct50);
    } else if (structSize === 82) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.DrawImage8Struct82);
    }

    return parsedData;
  }

  /**
   * Parses ruler data from a binary buffer based on the structure size
   * @param buffer - The binary buffer containing ruler data
   * @param structSize - The size of the structure to be parsed
   * @returns A structured object containing the parsed ruler data
   */
  static parseRuler = function (buffer, structSize) {
    let parsedData;

    if (structSize === 52) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.RulerStruct52);
    } else if (structSize === 48) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.RulerStruct48);
    } else if (structSize === 24) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.RulerStruct24);
    } else {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.RulerStruct);
    }

    return parsedData;
  }

  /**
   * Parses line draw list data from a binary buffer
   * @param buffer - The binary buffer containing line draw list data
   * @param structSize - The size of the structure to be parsed (not used in function body)
   * @returns A structured object containing the parsed line draw list data
   */
  static parseLineDrawList = function (buffer, structSize) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.LineDrawListStruct6);
  }

  /**
   * Parses theme data (version 12) from a binary buffer
   * @param buffer - The binary buffer containing theme data
   * @returns A structured object containing the parsed theme data
   */
  static parseBeginTheme12 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.BeginTheme12Struct);
  }

  /**
   * Parses theme category data from a binary buffer
   * @param buffer - The binary buffer containing theme category data
   * @returns A structured object containing the parsed theme category data with a name property
   */
  static parseThemeCat = function (buffer) {
    const structDefinition = [
      'name',
      'u16stringle:' + buffer.length / 2
    ];
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(structDefinition);
  }


  /**
   * Parses text font data from a binary buffer
   * @param buffer - The binary buffer containing text font data
   * @returns A structured object containing the parsed text font data
   */
  static parseBeginTextf = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.BeginTextfStruct);
  }

  /**
   * Parses theme font data (version 12) from a binary buffer
   * @param buffer - The binary buffer containing theme font data
   * @returns A structured object containing the parsed theme font data
   */
  static parseThemeFont12 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ThemeFont12Struct);
  }

  /**
   * Parses line data from a binary buffer based on the structure size
   * @param buffer - The binary buffer containing line data
   * @param structSize - The size of the structure to be parsed
   * @returns A structured object containing the parsed line data
   */
  static parseBeginLine = function (buffer, structSize) {
    let parsedData;

    if (structSize === 8) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.BeginLineStruct8);
    } else if (structSize === 12) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.BeginLineStruct12);
    } else if (structSize === 14) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.BeginLineStruct14);
    }

    return parsedData;
  }

  /**
   * Parses filled line data from a binary buffer
   * @param buffer - The binary buffer containing filled line data
   * @returns A structured object containing the parsed filled line data
   */
  static parseFilledLine = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.FilledLineStruct);
  }

  /**
   * Parses outside effect data from a binary buffer
   * @param buffer - The binary buffer containing outside effect data
   * @returns A structured object containing the parsed outside effect data
   */
  static parseOutSide = function (buffer) {
    const structDefinition = [
      'outsidetype',
      'int32',
      'extent',
      function (stream) {
        return stream.readStruct(ShapeConstant.DRectStruct);
      },
      'color',
      'uint32',
      'lparam',
      'uint32',
      'wparam',
      'uint32'
    ];
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(structDefinition);
  }

  /**
   * Parses inside effect data from a binary buffer
   * @param buffer - The binary buffer containing inside effect data
   * @returns A structured object containing the parsed inside effect data
   */
  static parseInsideEffect = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct([
        'effect',
        'int32',
        'effectcolor',
        'uint32',
        'lparam',
        'uint32',
        'wparam',
        'uint32'
      ]);
  }


  /**
   * Parses gradient data from a binary buffer
   * @param buffer - The binary buffer containing gradient data
   * @returns A structured object containing the parsed gradient data
   */
  static parseGradient = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct([
        'gradientflags',
        'uint32',
        'ecolor',
        'uint32'
      ]);
  }

  /**
   * Parses rich gradient data from a binary buffer
   * @param buffer - The binary buffer containing rich gradient data
   * @returns A structured object containing the parsed rich gradient data
   */
  static parseRichGradient = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct([
        'gradienttype',
        'uint32',
        'angle',
        'uint32',
        'nstops',
        'uint32'
      ]);
  }

  /**
   * Parses rich gradient stop data from a binary buffer
   * @param buffer - The binary buffer containing gradient stop data
   * @returns A structured object containing the parsed gradient stop data
   */
  static parseRichGradientStop = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct([
        'color',
        'uint32',
        'stop',
        'uint32'
      ]);
  }

  /**
   * Parses effect data from a binary buffer
   * @param buffer - The binary buffer containing effect data
   * @returns A structured object containing the parsed effect data
   */
  static parseEffect = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct([
        'effecttype',
        'int32',
        'effectcolor',
        'uint32',
        'wparam',
        'uint32',
        'lparam',
        'uint32'
      ]);
  }

  /**
   * Parses texture data from a binary buffer
   * @param buffer - The binary buffer containing texture data
   * @returns A structured object containing the parsed texture data
   */
  static parseTexture = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.TextureStruct);
  }

  /**
   * Parses hatch pattern data from a binary buffer
   * @param buffer - The binary buffer containing hatch pattern data
   * @returns A structured object containing the parsed hatch pattern data
   */
  static parseHatch = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.HatchStruct);
  }

  /**
   * Parses style data from a binary buffer
   * @param buffer - The binary buffer containing style data
   * @returns A structured object containing the parsed style data with a stylename property
   */
  static parseBeginStyle = function (buffer) {
    if (buffer.length === 0) {
      return { stylename: '' };
    }

    const structDefinition = [
      'stylename',
      'u16stringle:' + buffer.length / 2
    ];
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(structDefinition);
  }

  /**
   * Parses expanded view SVG data from a binary buffer
   * @param buffer - The binary buffer containing SVG data
   * @returns A structured object containing the parsed SVG data with an svg property
   */
  static parseExpandedView = function (buffer) {
    if (buffer.length === 0) {
      return { svg: '' };
    }

    const structDefinition = [
      'svg',
      'u16stringle:' + buffer.length / 2
    ];
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(structDefinition);
  }

  /**
   * Parses arrow drawing data from a binary buffer
   * @param buffer - The binary buffer containing arrow drawing data
   * @returns A structured object containing arrow size, start/end arrow types, and arrow IDs
   */
  static parseDrawArrow = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawArrowStruct);
  }

  /**
   * Parses hook drawing data from a binary buffer
   * @param buffer - The binary buffer containing hook drawing data
   * @returns A structured object containing object ID, index, connection points and cell ID
   */
  static parseDrawHook = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawHookStruct);
  }

  /**
   * Parses 10-byte hook drawing data from a binary buffer
   * @param buffer - The binary buffer containing hook drawing data (10-byte structure)
   * @returns A structured object containing object ID, index, and connection points
   */
  static parseDrawHook10 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawHookStruct10);
  }

  /**
   * Parses border drawing data from a binary buffer
   * @param buffer - The binary buffer containing border drawing data
   * @returns A structured object containing border width, pattern index, and color
   */
  static parseDrawBorder = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawBOrderStruct);
  }

  /**
   * Parses line drawing data from a binary buffer
   * @param buffer - The binary buffer containing line drawing data
   * @returns A structured object containing line border, pattern, color, and arrow information
   */
  static parseDrawLine = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawLineStruct);
  }

  /**
   * Parses fill drawing data from a binary buffer
   * @param buffer - The binary buffer containing fill drawing data
   * @returns A structured object containing fill pattern index, color, gradient flags, and end color
   */
  static parseDrawFill = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawFillStruct);
  }

  /**
   * Parses 6-byte fill drawing data from a binary buffer
   * @param buffer - The binary buffer containing 6-byte fill drawing data
   * @returns A structured object containing fill pattern index and color
   */
  static parseDrawFill6 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.DrawFillStruct6);
  }

  /**
   * Parses drawing object data (version 7) from a binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @param structSize - The size of the structure to be parsed (20 or 48 bytes)
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj7 = function (buffer, structSize) {
    return 20 === structSize
      ? new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.DrawObj7Struct20)
      : new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.DrawObj7Struct48);
  }

  /**
   * Parses drawing object data (version 6) from a binary buffer
   * @param buffer - The binary buffer containing drawing object data
   * @param structSize - The size of the structure to be parsed (20 bytes or standard size)
   * @returns A structured object containing the parsed drawing object data
   */
  static parseDrawObj6 = function (buffer, structSize) {
    return 20 === structSize
      ? new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.DrawObj6Struct20)
      : new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(ShapeConstant.DrawObj6Struct);
  }

  /**
   * Parses connection point data from a binary buffer
   * @param buffer - The binary buffer containing connection point data
   * @returns A structured object containing connection point information
   */
  static parseConnectPoint = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.ConnectPointStruct);
  }

  /**
   * Parses 8-byte long text data (version 8) from a binary buffer
   * @param buffer - The binary buffer containing 8-byte long text data
   * @returns A structured object containing instance ID and style count
   */
  static parseLongText88 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.LonText8Struct8);
  }

  /**
   * Parses long text data (version 8) from a binary buffer
   * @param buffer - The binary buffer containing long text data
   * @returns A structured object containing text metadata including runs, styles, and character counts
   */
  static parseLongText8 = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.LongText8Struct);
  }

  /**
   * Parses text data from a binary buffer
   * @param buffer - The binary buffer containing text data
   * @returns A structured object containing text metadata and formatting information
   */
  static parseText = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.TextStruct);
  }

  /**
   * Parses long text data from a binary buffer
   * @param buffer - The binary buffer containing long text data
   * @returns A structured object containing text metadata, formatting information, and shadow effects
   */
  static parseLongText = function (buffer) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.LongTextStruct);
  }

  /**
   * Parses text character data from a binary buffer (Unicode format)
   * @param buffer - The binary buffer containing text character data
   * @returns A structured object containing the text as a Unicode string
   */
  static parseTextChar = function (buffer) {
    const structDefinition = [
      'text',
      'u16stringle:' + buffer.length / 2
    ];
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(structDefinition);
  }

  /**
   * Parses text character data from a binary buffer (8-bit format)
   * @param buffer - The binary buffer containing text character data
   * @returns A structured object containing the text as an 8-bit ASCII string
   */
  static parseTextChar8 = function (buffer) {
    const structDefinition = [
      'text',
      'string:' + buffer.length
    ];
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(structDefinition);
  }

  /**
   * Parses text runs data from a binary buffer
   * @param buffer - The binary buffer containing text runs data
   * @returns A structured object containing text run information including formatting codes
   */
  static parseTextRuns = function (buffer) {
    const structDefinition = [
      'nruns',
      'uint16',
      'runs',
      function (stream, data) {
        const runStruct = [
          'ncodes',
          'uint16',
          'offset',
          'uint32',
          'op',
          function (stream, runData) {
            const operations = [];

            for (let i = 0; i < runData.ncodes; i++) {
              const codeData = stream.readStruct(ShapeConstant.TextCodeStructCode);

              // Handle float values specially
              const valueData = codeData.code === ShapeConstant.TextStyleCodes.SDF_T_SIZE_FLOAT
                ? stream.readStruct(ShapeConstant.TextCodeStructValueFloat)
                : stream.readStruct(ShapeConstant.TextCodeStructValue);

              codeData.value = valueData.value;
              operations.push(codeData);
            }

            return operations;
          }
        ];

        const runs = [];
        for (let i = 0; i < data.nruns; i++) {
          runs.push(stream.readStruct(runStruct));
        }

        return runs;
      }
    ];

    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(structDefinition);
  }

  /**
   * Parses text style data from a binary buffer
   * @param buffer - The binary buffer containing text style data
   * @returns A structured object containing text style index, code count, and style codes
   */
  static parseTextStyle = function (buffer) {
    const structDefinition = [
      'index',
      'uint16',
      'ncodes',
      'uint16',
      'codes',
      function (stream, data) {
        const styleCodes = [];

        for (let i = 0; i < data.ncodes; i++) {
          styleCodes.push(stream.readStruct(ShapeConstant.StyleCodeStruct));
        }

        return styleCodes;
      }
    ];

    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(structDefinition);
  }

  /**
   * Parses graph data from a binary buffer
   * @param buffer - The binary buffer containing graph data
   * @param structSize - The size of the structure to be parsed
   * @returns A structured object containing graph configuration and display properties
   */
  static parseGraph = function (buffer, structSize) {
    if (structSize === 52) {
      return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.GraphStruct);
    }

    throw new Error('Invalid graph structure size');
  }

  /**
   * Parses graph axis data from a binary buffer
   * @param buffer - The binary buffer containing graph axis data
   * @param structSize - The size of the structure in bytes
   * @returns A structured object with graph axis properties
   */
  static parseGraphAxis = function (buffer, structSize) {
    let parsedData;

    if (structSize === 106) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.GraphAxisStruct);
    } else {
      console.error('Invalid graph axis structure size');
    }

    return parsedData;
  }

  /**
   * Parses graph point data from a binary buffer
   * @param buffer - The binary buffer containing graph point data
   * @param structSize - The size of the structure in bytes
   * @returns A structured object with graph point properties
   */
  static parseGraphPoint = function (buffer, structSize) {
    let parsedData;

    if (structSize === 64) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.GraphPointStruct);
    } else {
      console.error('Invalid graph point structure size');
    }

    return parsedData;
  }

  /**
   * Parses graph title data from a binary buffer
   * @param buffer - The binary buffer containing graph title data
   * @param structSize - The size of the structure in bytes
   * @returns A structured object with graph title properties
   */
  static parseGraphTitle = function (buffer, structSize) {
    let parsedData;

    if (structSize === 28) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.GraphAxisTitleStruct);
    } else {
      console.error('Invalid graph title structure size');
    }

    return parsedData;
  }

  /**
   * Parses graph axis label data from a binary buffer
   * @param buffer - The binary buffer containing graph axis label data
   * @param structSize - The size of the structure in bytes
   * @returns A structured object with graph axis label properties
   */
  static parseGraphAxisLabel = function (buffer, structSize) {
    let parsedData;

    if (structSize === 24) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.GraphAxisLabelStruct);
    } else {
      console.error('Invalid graph label structure size');
    }

    return parsedData;
  }

  /**
   * Parses graph legend entry data from a binary buffer
   * @param buffer - The binary buffer containing graph legend entry data
   * @param structSize - The size of the structure in bytes
   * @returns A structured object with graph legend entry properties
   */
  static parseGraphLegendEntry = function (buffer, structSize) {
    let parsedData;

    if (structSize === 26) {
      parsedData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
        .readStruct(ShapeConstant.GraphLegendEntryStruct);
    } else {
      console.error('Invalid graph legend entry structure size');
    }

    return parsedData;
  }

  /**
   * Provides a polyfill for ArrayBuffer.prototype.slice if not available
   * Ensures compatibility across different browsers and environments
   */
  static PatchArrayBufferSlice = function () {
    if (!ArrayBuffer.prototype.slice) {
      ArrayBuffer.prototype.slice = function (start, end) {
        const sourceArray = new Uint8Array(this);

        if (end === undefined) {
          end = sourceArray.length;
        }

        const resultBuffer = new ArrayBuffer(end - start);
        const resultArray = new Uint8Array(resultBuffer);

        for (let i = 0; i < resultArray.length; i++) {
          resultArray[i] = sourceArray[i + start];
        }

        return resultBuffer;
      };
    }
  }

  /**
   * Parses image data from a binary buffer and creates blob URLs
   * @param buffer - The binary buffer containing image data
   * @param mimeType - The MIME type of the image
   * @returns Object containing the image as URL, Blob, and raw bytes
   */
  static parseImage = function (buffer, mimeType) {
    ShapeConstant.PatchArrayBufferSlice();

    const stream = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN);
    let bufferData = stream.buffer;
    bufferData = bufferData.slice(stream.byteOffset);

    const imageBytes = new Uint8Array(bufferData);
    const imageBlob = new Blob([bufferData], { type: mimeType });
    const urlCreator = window.URL || window.webkitURL;
    let imageUrl = '';

    if (urlCreator &&
      urlCreator.createObjectURL &&
      mimeType !== 'image/wmf' &&
      mimeType !== 'image/store') {
      imageUrl = urlCreator.createObjectURL(imageBlob);
    }

    return {
      URL: imageUrl,
      Blob: imageBlob,
      BlobBytes: imageBytes
    };
  }

  /**
   * Parses image block data from a binary buffer
   * @param buffer - The binary buffer containing image block data
   * @returns Object containing image ID, directory, and binary data
   */
  static parseCImageLock = function (buffer) {
    const stream = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN);
    const bufferData = stream.buffer;
    const headerData = stream.readStruct(ShapeConstant.LongValue2Struct);

    ShapeConstant.PatchArrayBufferSlice();

    const imageData = bufferData.slice(stream.byteOffset + 8);
    const imageBytes = new Uint8Array(imageData);

    return {
      data: imageData,
      bytes: imageBytes,
      imageid: headerData.value,
      imagedir: headerData.type
    };
  }

  /**
   * Parses SD data from a binary buffer
   * @param buffer - The binary buffer containing SD data
   * @returns Object containing SD data ID, directory, and binary data
   */
  static parseCSdData = function (buffer) {
    const stream = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN);
    const bufferData = stream.buffer;
    const headerData = stream.readStruct(ShapeConstant.LongValue2Struct);

    ShapeConstant.PatchArrayBufferSlice();

    const sdData = bufferData.slice(stream.byteOffset);
    const sdBytes = new Uint16Array(sdData);

    return {
      data: sdData,
      bytes: sdBytes,
      imageid: headerData.value,
      imagedir: headerData.type
    };
  }

  /**
   * Parses a native buffer from binary data
   * @param buffer - The binary buffer to parse
   * @returns Object containing the parsed data and byte array
   */
  static parseNativeBuffer = function (buffer) {
    const dataStream = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN);
    const bufferData = dataStream.buffer;
    ShapeConstant.PatchArrayBufferSlice();

    const slicedData = bufferData.slice(dataStream.byteOffset + 4);
    const byteArray = new Uint8Array(slicedData);

    const result = {
      data: slicedData,
      bytes: byteArray
    };

    return result;
  }

  /**
   * Parses a native block from SDF format
   * @param buffer - The binary buffer containing native block data
   * @returns Object containing the parsed data, byte array, and native ID
   */
  static parseCNativeBlock = function (buffer) {
    const dataStream = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN);
    const bufferData = dataStream.buffer;
    const headerData = dataStream.readStruct(ShapeConstant.LongValueStruct);

    ShapeConstant.PatchArrayBufferSlice();

    const slicedData = bufferData.slice(dataStream.byteOffset + 4);
    const byteArray = new Uint8Array(slicedData);

    const result = {
      data: slicedData,
      bytes: byteArray,
      nativeid: headerData.value
    };

    return result;
  }

  /**
   * Writes a native buffer to a data stream
   * @param dataStream - The target data stream
   * @param dataBuffer - The buffer to write
   */
  static writeNativeBuffer = function (dataStream, dataBuffer) {
    const bufferData = new T3DataStream(dataBuffer, null, T3DataStream.LITTLE_ENDIAN).buffer;
    const byteArray = new Uint8Array(bufferData);
    const dataLength = byteArray.length;

    dataStream.writeUint32(dataLength + 4);
    dataStream.writeUint8Array(byteArray);
  }

  /**
   * Writes a native SDF buffer to a data stream
   * @param dataStream - The target data stream
   * @param byteArray - The byte array to write
   */
  static writeNativeSdfBuffer = function (dataStream, byteArray) {
    const dataLength = byteArray.length;

    dataStream.writeUint32(dataLength + 4);
    dataStream.writeUint8Array(byteArray);
  }

  /**
   * Writes a native byte array to a data stream
   * @param dataStream - The target data stream
   * @param byteArray - The byte array to write
   */
  static writeNativeByteArray = function (dataStream, byteArray) {
    dataStream.writeUint8Array(byteArray);
  }

  /**
   * Parses 4-byte layer flags from binary data
   * @param buffer - The binary buffer containing layer flags
   * @param size - The size of the data (not used in function body)
   * @returns Object containing layer flags
   */
  static parseCLayerFlags4 = function (buffer, size) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct([
      'flags',
      'uint32'
    ]);
  }

  /**
   * Parses 2-byte layer flags from binary data
   * @param buffer - The binary buffer containing layer flags
   * @param size - The size of the data (not used in function body)
   * @returns Object containing layer flags
   */
  static parseCLayerFlags2 = function (buffer, size) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct([
      'flags',
      'uint16'
    ]);
  }

  /**
   * Parses layer type from binary data
   * @param buffer - The binary buffer containing layer type
   * @param size - The size of the data (not used in function body)
   * @returns Object containing layer type
   */
  static parseCLayerType = function (buffer, size) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct([
      'type',
      'uint32'
    ]);
  }

  /**
   * Parses native ID from binary data
   * @param buffer - The binary buffer containing native ID
   * @param size - The size of the data (not used in function body)
   * @returns Object containing native ID
   */
  static parseCNativeId = function (buffer, size) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct([
      'nativeid',
      'uint32'
    ]);
  }

  /**
   * Parses tool palettes collapsed state from binary data
   * @param buffer - The binary buffer containing collapsed state
   * @param size - The size of the data (not used in function body)
   * @returns Object containing collapsed state
   */
  static parseCToolPalettesCollapsed = function (buffer, size) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct([
      'collapsed',
      'uint32'
    ]);
  }

  /**
   * Parses image ID and directory from binary data
   * @param buffer - The binary buffer containing image information
   * @param size - The size of the data (not used in function body)
   * @returns Object containing blob bytes ID and image directory
   */
  static parseCImageId = function (buffer, size) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct([
      'blobbytesid',
      'uint32',
      'imagedir',
      'uint32'
    ]);
  }

  /**
   * Parses layer list from binary data
   * @param buffer - The binary buffer containing layer list
   * @param size - The size of the data (not used in function body)
   * @returns Structured object containing layer list information
   */
  static parseCLayerList = function (buffer, size) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.LayerListStruct);
  }

  /**
   * Parses OLE header from binary data
   * @param buffer - The binary buffer containing OLE header
   * @param size - The size of the data (not used in function body)
   * @returns Structured object containing OLE header information
   */
  static parseCOleHeader = function (buffer, size) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.OleHeaderStruct);
  }

  /**
   * Definition of Texture structure for parsing texture data
   * Contains dimension, rectangle, image type and flags
   */
  static TextureStructA = [
    'dim',
    {
      get: function (stream) {
        return stream.readStruct(ShapeConstant.LPointStruct);
      },
      set: function (stream, value) {
        stream.writeStruct(ShapeConstant.LPointStruct, value);
      }
    },
    'mr',
    {
      get: function (stream) {
        return stream.readStruct(ShapeConstant.LRectStruct);
      },
      set: function (stream, value) {
        stream.writeStruct(ShapeConstant.LRectStruct, value);
      }
    },
    'imagetype',
    'int32',
    'flags',
    'int32'
  ]

  /**
   * Parses texture data from binary buffer and sets the appropriate texture format
   * @param buffer - The binary buffer containing texture data
   * @param size - The size of the data (not used in function body)
   * @returns Structured object containing texture information
   */
  static parseOTexture = function (buffer, size) {
    const textureData = new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN)
      .readStruct(ShapeConstant.TextureStruct);

    switch (textureData.imagetype) {
      case ShapeConstant.ImageDir.dir_meta:
        ShapeConstant.TextureFormat = 'image/meta';
        break;
      case ShapeConstant.ImageDir.dir_jpg:
        ShapeConstant.TextureFormat = 'image/jpeg';
        break;
      case ShapeConstant.ImageDir.dir_png:
        ShapeConstant.TextureFormat = 'image/png';
        break;
    }

    return textureData;
  }

  /**
   * Parses extended texture data from binary buffer
   * @param buffer - The binary buffer containing extended texture data
   * @param size - The size of the data (not used in function body)
   * @returns Structured object containing extended texture information
   */
  static parseOTextureExt = function (buffer, size) {
    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct([
      'categoryindex',
      'int32',
      'units',
      'int32',
      'scale',
      'float64',
      'rwidth',
      'float64',
      'alignment',
      'int32',
      'flags',
      'int32'
    ]);
  }

  /**
   * Parses unknown data format from binary buffer
   * @param buffer - The binary buffer containing unknown data
   * @returns Object containing raw data as string
   */
  static parseUnknown = function (buffer) {
    const structDefinition = [
      'data',
      'string:' + buffer.length
    ];

    return new T3DataStream(buffer, null, T3DataStream.LITTLE_ENDIAN).readStruct(structDefinition);
  }

  /**
   * Flag indicating whether to read Unicode strings
   * Used during parsing to determine string encoding format
   */
  static ReadUnicode = true;

  /**
   * Current texture format detected during parsing
   * Set by parseOTexture based on the image type
   */
  static TextureFormat = '';

  /**
   * Parser structure definition for Shape Description Records (SDR)
   * Used to parse the complete structure of SDR documents
   */
  static T3Struct = [
    "start",
    /**
     * Reads the file signature and validates it against the expected signature
     * @param dataStream - The data stream to read from
     * @returns The signature if valid, null otherwise
     */
    function (dataStream) {
      const signature = dataStream.readString(8);
      // Check if signature matches expected value
      const validSignature = signature == ShapeConstant.Signature ? signature : null;
      // Default to Unicode mode
      ShapeConstant.ReadUnicode = true;
      return validSignature;
    },
    "codes",
    ["[]", [
      "code",
      "uint16",
      "codeName",
      /**
       * Maps numeric operation code to its string name
       * @param stream - The data stream (unused)
       * @param codeData - The code data object containing the numeric code
       * @returns String name of the operation code or "Unknown" if not found
       */
      function (stream, codeData) {
        return ShapeConstant.SDROpCodesByCode[codeData.code] || "Unknown";
      },
      "length",
      /**
       * Reads the length of data for this operation code
       * @param stream - The data stream to read from
       * @param codeData - The code data object
       * @returns Length of the data block, or 0 if this is a control code (bit 0x4000 set)
       */
      function (stream, codeData) {
        return (codeData.code & 0x4000) ? 0 : stream.readUint32();
      },
      "data",
      {
        /**
         * Reads and parses operation data based on operation code
         * @param stream - The data stream to read from
         * @param codeData - The code data object containing code and length
         * @returns Parsed data object or string representation
         */
        get: function (stream, codeData) {
          // Skip control codes (bit 0x4000 set)
          if (codeData.code & 0x4000) {
            return 0;
          }

          let parsedData = {};

          switch (codeData.code) {
            case ShapeConstant.OpCodeName.cVersion:
              parsedData = ShapeConstant.parseVersion(stream.mapUint8Array(codeData.length));

              // Determine if we should use Unicode based on version information
              if (codeData.length < 18) {
                parsedData.Unicode = 0;
                ShapeConstant.ReadUnicode = false;
              } else {
                ShapeConstant.ReadUnicode = parsedData.Unicode;
              }

              return parsedData;

            case ShapeConstant.OpCodeName.cHeader:
              if (codeData.length === 28) {
                parsedData = ShapeConstant.parseHeader(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 26) {
                parsedData = ShapeConstant.parseHeader810(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 22) {
                parsedData = ShapeConstant.parseHeader22(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 14) {
                parsedData = ShapeConstant.parseHeader14(stream.mapUint8Array(codeData.length));
              }

              return parsedData;

            case ShapeConstant.OpCodeName.SDF_C_HEAD_UIINFO:
              return ShapeConstant.parseUIInfo(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.cPage:
              if (codeData.length === 30) {
                parsedData = ShapeConstant.parsePage30(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 34) {
                parsedData = ShapeConstant.parsePage34(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 62) {
                parsedData = ShapeConstant.parsePage62(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 126) {
                parsedData = ShapeConstant.parsePage126(stream.mapUint8Array(codeData.length));
              }

              return parsedData;

            case ShapeConstant.OpCodeName.SDF_C_LIBLIST:
              return ShapeConstant.parseLibList(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_O_TEXTUREEXTRA:
              return ShapeConstant.parseTextureExtra(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_FONTNAME12:
              return ShapeConstant.parseFontName12(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.cFontName:
              return ShapeConstant.parseFontName(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_FONTNAME15:
              return ShapeConstant.parseFontName15(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_DIMFONT:
              return ShapeConstant.parseDimFont(stream.mapUint8Array(codeData.length, ShapeConstant.ReadUnicode));

            case ShapeConstant.OpCodeName.SDF_C_BEGIN_THEME12:
              return ShapeConstant.parseBeginTheme12(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_THEME_CAT:
              return ShapeConstant.parseThemeCat(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_THEME_COLOR:
              return ShapeConstant.parse_SDF_THEME_COLOR(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_THEME_FONT12:
              return ShapeConstant.parseThemeFont12(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_BEGIN_TEXTF:
              return ShapeConstant.parseBeginTextf(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_DRAW12:
              /**
               * Parses Draw12 format data based on structure size
               * Different structure sizes represent different versions or variations
               * @param buffer - The binary buffer containing drawing data
               * @param size - The size of the structure to determine which parser to use
               * @returns A structured object containing the parsed drawing data
               */
              let parsedDrawing = null;
              switch (codeData.length) {
                case 440:
                  parsedDrawing = ShapeConstant.parseDraw12440(stream.mapUint8Array(codeData.length));
                  break;
                case 420:
                  parsedDrawing = ShapeConstant.parseDraw12420(stream.mapUint8Array(codeData.length));
                  break;
                case 364:
                  parsedDrawing = ShapeConstant.parseDraw12364(stream.mapUint8Array(codeData.length));
                  break;
                case 360:
                  parsedDrawing = ShapeConstant.parseDraw12360(stream.mapUint8Array(codeData.length));
                  break;
                case 356:
                  parsedDrawing = ShapeConstant.parseDraw12356(stream.mapUint8Array(codeData.length));
                  break;
                case 352:
                  parsedDrawing = ShapeConstant.parseDraw12352(stream.mapUint8Array(codeData.length));
                  break;
                case 348:
                  parsedDrawing = ShapeConstant.parseDraw12348(stream.mapUint8Array(codeData.length));
                  break;
                case 344:
                  parsedDrawing = ShapeConstant.parseDraw12344(stream.mapUint8Array(codeData.length));
                  break;
                case 340:
                  parsedDrawing = ShapeConstant.parseDraw12340(stream.mapUint8Array(codeData.length));
                  break;
                case 336:
                  parsedDrawing = ShapeConstant.parseDraw12336(stream.mapUint8Array(codeData.length));
                  break;
              }
              return parsedDrawing;

            case ShapeConstant.OpCodeName.SDF_C_DRAW8:
              /**
               * Parses Draw8 format data based on structure size
               * Older version of drawing data with different memory layouts
               * @param buffer - The binary buffer containing drawing data
               * @param size - The size of the structure to determine which parser to use
               * @returns A structured object containing the parsed drawing data
               */
              let parsedDraw8 = null;
              if (codeData.length === 272) {
                parsedDraw8 = ShapeConstant.parseDraw8272(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 264) {
                parsedDraw8 = ShapeConstant.parseDraw8264(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 228) {
                parsedDraw8 = ShapeConstant.parseDraw8228(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 224) {
                parsedDraw8 = ShapeConstant.parseDraw8224(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 216) {
                parsedDraw8 = ShapeConstant.parseDraw8216(stream.mapUint8Array(codeData.length));
              }
              return parsedDraw8;

            case ShapeConstant.OpCodeName.SDF_C_DRAW:
              /**
               * Parses standard Draw format data based on structure size
               * Base drawing data format used across different versions
               * @param buffer - The binary buffer containing drawing data
               * @param size - The size of the structure to determine which parser to use
               * @returns A structured object containing the parsed drawing data
               */
              let parsedBasicDraw = null;
              if (codeData.length === 236) {
                parsedBasicDraw = ShapeConstant.parseDraw236(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 252) {
                parsedBasicDraw = ShapeConstant.parseDraw252(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 268) {
                parsedBasicDraw = ShapeConstant.parseDraw268(stream.mapUint8Array(codeData.length));
              }
              return parsedBasicDraw;

            case ShapeConstant.OpCodeName.SDF_C_DRAW7:
              /**
               * Parses Draw7 format data based on structure size
               * Version 7 specific drawing data format
               * @param buffer - The binary buffer containing drawing data
               * @param size - The size of the structure to determine which parser to use
               * @returns A structured object containing the parsed drawing data
               */
              let parsedDraw7 = null;
              if (codeData.length === 48) {
                parsedDraw7 = ShapeConstant.parseDraw748(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 52) {
                parsedDraw7 = ShapeConstant.parseDraw752(stream.mapUint8Array(codeData.length));
              }
              return parsedDraw7;

            case ShapeConstant.OpCodeName.SDF_C_DRAWEXTRA:
              /**
               * Parses extra drawing data information
               * Contains supplementary information for drawing objects
               * @param buffer - The binary buffer containing extra drawing data
               * @param size - The size of the structure to validate
               * @returns A structured object containing the parsed extra drawing data
               */
              let parsedDrawExtra = null;
              if (codeData.length === 14) {
                parsedDrawExtra = ShapeConstant.parseDrawExtra14(stream.mapUint8Array(codeData.length));
              }
              return parsedDrawExtra;

            case ShapeConstant.OpCodeName.SDF_C_DRAWOBJ5:
              /**
               * Parses DrawObj5 format data for version 5 drawing objects
               * Early version of drawing object data
               * @param buffer - The binary buffer containing drawing object data
               * @param size - The size of the structure to validate
               * @returns A structured object containing the parsed drawing object data
               */
              let parsedDrawObj5 = null;
              if (codeData.length === 60) {
                parsedDrawObj5 = ShapeConstant.parseDrawObj560(stream.mapUint8Array(codeData.length));
              }
              return parsedDrawObj5;

            case ShapeConstant.OpCodeName.SDF_C_DRAWOBJ8:
              /**
               * Parses DrawObj8 format data based on structure size
               * Version 8 specific drawing object data with multiple formats
               * @param buffer - The binary buffer containing drawing object data
               * @param size - The size of the structure to determine which parser to use
               * @returns A structured object containing the parsed drawing object data
               */
              let parsedDrawObj8 = null;
              if (codeData.length === 448) {
                parsedDrawObj8 = ShapeConstant.parseDrawObj8448(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 316) {
                parsedDrawObj8 = ShapeConstant.parseDrawObj8316(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 312) {
                parsedDrawObj8 = ShapeConstant.parseDrawObj8312(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 308) {
                parsedDrawObj8 = ShapeConstant.parseDrawObj8848(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 304) {
                parsedDrawObj8 = ShapeConstant.parseDrawObj8847(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 300) {
                parsedDrawObj8 = ShapeConstant.parseDrawObj8837(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 296) {
                parsedDrawObj8 = ShapeConstant.parseDrawObj8830(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 288) {
                parsedDrawObj8 = ShapeConstant.parseDrawObj8824(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 280) {
                parsedDrawObj8 = ShapeConstant.parseDrawObj8814(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 252) {
                parsedDrawObj8 = ShapeConstant.parseDrawObj8810(stream.mapUint8Array(codeData.length));
              }
              return parsedDrawObj8;

            case ShapeConstant.OpCodeName.SDF_C_DRAWOBJ:
              /**
               * Parses standard DrawObj format data
               * Generic drawing object data format used across multiple versions
               * @param buffer - The binary buffer containing drawing object data
               * @param size - The size of the structure to pass to the parser
               * @returns A structured object containing the parsed drawing object data
               */
              return ShapeConstant.parseDrawObj(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_TABLEVP:
              /**
               * Parses table viewport data
               * Contains information about table display and presentation
               * @param buffer - The binary buffer containing table viewport data
               * @param size - The size of the structure to pass to the parser
               * @returns A structured object containing the parsed table viewport data
               */
              return ShapeConstant.parse_SDF_TABLE(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_TABLE:
              /**
               * Parses table data in short format
               * Contains basic table definition information
               * @param buffer - The binary buffer containing table data
               * @param size - The size of the structure to pass to the parser
               * @returns A structured object containing the parsed table data
               */
              return ShapeConstant.parse_SDF_TABLE_Short(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_TABLECELL8:
              /**
               * Parses version 8 table cell data
               * Contains information about individual cells in a table
               * @param buffer - The binary buffer containing table cell data
               * @param size - The size of the structure to pass to the parser
               * @returns A structured object containing the parsed table cell data
               */
              return ShapeConstant.parse_SDF_TABLE_CELL(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_TABLECELL:
              /**
               * Parses version 7 table cell data
               * Contains information about individual cells in a version 7 table
               * @param buffer - The binary buffer containing table cell data
               * @param size - The size of the structure to pass to the parser
               * @returns A structured object containing the parsed table cell data
               */
              return ShapeConstant.parse_SDF_TABLE_CELL7(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_TABLECELLEXTRAOLD:
              /**
               * Parses legacy extra table cell data
               * Contains extended information for table cells in older formats
               * @param buffer - The binary buffer containing extra cell data
               * @param size - The size of the structure to pass to the parser
               * @returns A structured object containing the parsed extra cell data
               */
              return ShapeConstant.parse_SDF_TABLE_CELLEXTRAOLD(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_TABLECELLEXTRA:
              /**
               * Parses extra table cell data
               * Contains extended information for table cells
               * @param buffer - The binary buffer containing extra cell data
               * @param size - The size of the structure to pass to the parser
               * @returns A structured object containing the parsed extra cell data
               */
              return ShapeConstant.parse_SDF_TABLE_CELLEXTRA(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_TABLECELLPROP:
              /**
               * Parses table cell property data
               * Contains styling and formatting properties for table cells
               * @param buffer - The binary buffer containing cell property data
               * @param size - The size of the structure to pass to the parser
               * @returns A structured object containing the parsed cell property data
               */
              return ShapeConstant.parse_SDF_TABLE_CELLPROP(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_TABLEROWVP:
              /**
               * Parses table row viewport data from a binary buffer
               * @param buffer - The binary buffer containing table row data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with table row viewport properties
               */
              return ShapeConstant.parse_SDF_TABLE_ROW(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_TABLEROW:
              /**
               * Parses short table row data from a binary buffer
               * @param buffer - The binary buffer containing short table row data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with short table row properties
               */
              return ShapeConstant.parse_SDF_TABLE_ROW_Short(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_GRAPH:
              /**
               * Parses graph data from a binary buffer
               * @param buffer - The binary buffer containing graph data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with graph configuration properties
               */
              return ShapeConstant.parseGraph(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_GRAPH_AXIS:
              /**
               * Parses graph axis data from a binary buffer
               * @param buffer - The binary buffer containing graph axis data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with graph axis properties
               */
              return ShapeConstant.parseGraphAxis(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_GRAPH_POINT:
              /**
               * Parses graph point data from a binary buffer
               * @param buffer - The binary buffer containing graph point data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with graph point properties
               */
              return ShapeConstant.parseGraphPoint(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_GRAPH_TITLE:
              /**
               * Parses graph title data from a binary buffer
               * @param buffer - The binary buffer containing graph title data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with graph title properties
               */
              return ShapeConstant.parseGraphTitle(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_GRAPH_LABEL:
              /**
               * Parses graph axis label data from a binary buffer
               * @param buffer - The binary buffer containing graph axis label data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with graph axis label properties
               */
              return ShapeConstant.parseGraphAxisLabel(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_GRAPH_LEGEND:
              /**
               * Parses graph legend entry data from a binary buffer
               * @param buffer - The binary buffer containing graph legend entry data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with graph legend entry properties
               */
              return ShapeConstant.parseGraphLegendEntry(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_DRAWTEXT:
              /**
               * Parses drawing text data from a binary buffer based on structure size
               * @param buffer - The binary buffer containing drawing text data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with drawing text properties
               */
              let parsedDrawText;

              if (codeData.length === 182) {
                parsedDrawText = ShapeConstant.parseDrawText182(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 110) {
                parsedDrawText = ShapeConstant.parseDrawText110(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 106) {
                parsedDrawText = ShapeConstant.parseDrawText106(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 94) {
                parsedDrawText = ShapeConstant.parseDrawText94(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 90) {
                parsedDrawText = ShapeConstant.parseDrawText(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 88) {
                parsedDrawText = ShapeConstant.parseDrawText88(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 72) {
                parsedDrawText = ShapeConstant.parseDrawText72(stream.mapUint8Array(codeData.length));
              }

              return parsedDrawText;

            case ShapeConstant.OpCodeName.SDF_C_BEGIN_PAINT:
              /**
               * Parses paint data from a binary buffer
               * @param buffer - The binary buffer containing paint data
               * @returns A structured object with paint properties including fill type and color
               */
              return ShapeConstant.parseSDPaint(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_DRAWPOLY:
              /**
               * Parses polygon drawing data from a binary buffer based on structure size
               * @param buffer - The binary buffer containing polygon data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with polygon drawing properties
               */
              let parsedPolyList;

              if (codeData.length === 8) {
                parsedPolyList = ShapeConstant.parsePolyList8(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 12) {
                parsedPolyList = ShapeConstant.parsePolyList12(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 20) {
                parsedPolyList = ShapeConstant.parsePolyList20(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 24) {
                parsedPolyList = ShapeConstant.parsePolyList24(stream.mapUint8Array(codeData.length));
              }

              return parsedPolyList;

            case ShapeConstant.OpCodeName.SDF_C_DRAWPOLYSEG:
              /**
               * Parses polygon segment drawing data from a binary buffer based on structure size
               * @param buffer - The binary buffer containing polygon segment data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with polygon segment drawing properties
               */
              let parsedPolySeg;

              if (codeData.length === 18) {
                parsedPolySeg = ShapeConstant.parsePolySeg18(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 28) {
                parsedPolySeg = ShapeConstant.parsePolySeg(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 26) {
                parsedPolySeg = ShapeConstant.parsePolySeg26(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 32) {
                parsedPolySeg = ShapeConstant.parsePolySeg32(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 40) {
                parsedPolySeg = ShapeConstant.parsePolySeg40(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 50) {
                parsedPolySeg = ShapeConstant.parsePolySeg50(stream.mapUint8Array(codeData.length));
              }

              return parsedPolySeg;

            case ShapeConstant.OpCodeName.SDF_C_POLYSEGEXPLICITPOINTS:
              /**
               * Parses explicit points for polygon segments from a binary buffer
               * @param buffer - The binary buffer containing explicit polygon point data
               * @returns A structured object with explicit polygon point properties
               */
              return ShapeConstant.parsePolySegExplicitPoints(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_DRAWLINK:
              /**
               * Parses link list data from a binary buffer
               * @param buffer - The binary buffer containing link list data
               * @returns A structured object with link list properties for shape connections
               */
              return ShapeConstant.parseLinkList(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_DRAWLINK6:
              /**
               * Parses version 6 link list data from a binary buffer
               * @param buffer - The binary buffer containing version 6 link list data
               * @returns A structured object with link list properties specific to version 6
               */
              return ShapeConstant.parseLinkList6(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_DRAWARRAYTEXT:
              /**
               * Parses array hook text data from a binary buffer
               * @param buffer - The binary buffer containing array hook text data
               * @returns A structured object with array hook text properties for shape arrays
               */
              return ShapeConstant.parseArrayHookText(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_OBJDATA:
              /**
               * Parses object data from a binary buffer
               * @param buffer - The binary buffer containing object data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with properties for embedded objects
               */
              return ShapeConstant.parseObjData(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_O_RULER:
              /**
               * Parses ruler data from a binary buffer
               * @param buffer - The binary buffer containing ruler data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with ruler properties including units and scale
               */
              return ShapeConstant.parseRuler(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_LINEDRAWLIST:
              /**
               * Parses line draw list data from a binary buffer
               * @param buffer - The binary buffer containing line draw list data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with line draw list properties
               */
              return ShapeConstant.parseLineDrawList(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_BEGIN_LINE:
            case ShapeConstant.OpCodeName.SDF_C_BEGIN_HLINE:
            case ShapeConstant.OpCodeName.SDF_C_BEGIN_VLINE:
              /**
               * Parses line data (standard, horizontal, or vertical) from a binary buffer
               * @param buffer - The binary buffer containing line data
               * @param structSize - The size of the structure in bytes
               * @returns A structured object with line properties including thickness and pattern
               */
              return ShapeConstant.parseBeginLine(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_FILLEDLINE:
              /**
               * Parses filled line data from a binary buffer
               * @param buffer - The binary buffer containing filled line data
               * @returns A structured object with filled line properties including thickness and color
               */
              return ShapeConstant.parseFilledLine(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_OUTSIDE:
              /**
               * Parses outside effect data from a binary buffer
               * @param buffer - The binary buffer containing outside effect data
               * @returns A structured object with outside effect properties including type, extent, and color
               */
              return ShapeConstant.parseOutSide(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_INSIDEEFFECT:
              /**
               * Parses inside effect data from a binary buffer
               * @param buffer - The binary buffer containing inside effect data
               * @returns A structured object with inside effect properties including effect type and color
               */
              return ShapeConstant.parseInsideEffect(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_EFFECT:
              /**
               * Parses effect data from a binary buffer
               * @param buffer - The binary buffer containing effect data
               * @returns A structured object with effect properties including type, color, and parameters
               */
              return ShapeConstant.parseEffect(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_TEXTURE:
              /**
               * Parses texture data from a binary buffer
               * @param buffer - The binary buffer containing texture data
               * @returns A structured object with texture properties including dimensions and image type
               */
              return ShapeConstant.parseTexture(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_HATCH:
              /**
               * Parses hatch pattern data from a binary buffer
               * @param buffer - The binary buffer containing hatch pattern data
               * @returns A structured object with hatch pattern properties for shape fills
               */
              return ShapeConstant.parseHatch(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_GRADIENT:
              /**
               * Parses gradient data from a binary buffer
               * @param buffer - The binary buffer containing gradient data
               * @returns A structured object with gradient properties including flags and end color
               */
              return ShapeConstant.parseGradient(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_RICHGRADIENT:
              /**
               * Parses rich gradient data from a binary buffer
               * @param buffer - The binary buffer containing rich gradient data
               * @returns A structured object with rich gradient properties including type, angle, and stop count
               */
              return ShapeConstant.parseRichGradient(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_RICHGRADIENTSTOP:
              /**
               * Parses rich gradient stop data from a binary buffer
               * @param buffer - The binary buffer containing gradient stop data
               * @returns A structured object with gradient stop properties including color and position
               */
              return ShapeConstant.parseRichGradientStop(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_THEMEGRADIENT:
              /**
               * Parses theme gradient data from a binary buffer
               * @param buffer - The binary buffer containing theme gradient data
               * @returns A structured object containing the parsed theme gradient data
               */
              return ShapeConstant.parse_SDF_THEMEGRADIENT(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_BEGIN_STYLE:
              /**
               * Parses style data from a binary buffer
               * @param buffer - The binary buffer containing style data
               * @returns A structured object containing the parsed style data with a stylename property
               */
              return ShapeConstant.parseBeginStyle(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_DRAWARROW:
              /**
               * Parses arrow drawing data from a binary buffer
               * @param buffer - The binary buffer containing arrow drawing data
               * @returns A structured object containing arrow size, start/end arrow types, and arrow IDs
               */
              return ShapeConstant.parseDrawArrow(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_DRAWHOOK:
              /**
               * Parses hook drawing data from a binary buffer based on structure size
               * @param buffer - The binary buffer containing hook drawing data
               * @returns A structured object containing object ID, index, connection points and other hook properties
               */
              if (codeData.length === 22) {
              } else if (codeData.length === 10) {
                return ShapeConstant.parseDrawHook10(stream.mapUint8Array(codeData.length));
              } else {
                return ShapeConstant.parseDrawHook(stream.mapUint8Array(codeData.length));
              }

            case ShapeConstant.OpCodeName.SDF_C_DRAWBORDER:
              /**
               * Parses border drawing data from a binary buffer
               * @param buffer - The binary buffer containing border drawing data
               * @returns A structured object containing border width, pattern index, and color
               */
              return ShapeConstant.parseDrawBorder(stream.mapUint8Array(codeData.length));


            case ShapeConstant.OpCodeName.SDF_C_DRAWLINE:
              /**
               * Parses line drawing data from a binary buffer
               * @param buffer - The binary buffer containing line drawing data
               * @returns A structured object containing line border, pattern, color, and arrow information
               */
              return ShapeConstant.parseDrawLine(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_DRAWFILL:
              /**
               * Parses fill drawing data from a binary buffer
               * @param buffer - The binary buffer containing fill drawing data
               * @returns A structured object containing fill pattern index, color, and additional properties
               */
              if (codeData.length === 6) {
                return ShapeConstant.parseDrawFill6(stream.mapUint8Array(codeData.length));
              } else {
                return ShapeConstant.parseDrawFill(stream.mapUint8Array(codeData.length));
              }

            case ShapeConstant.OpCodeName.SDF_C_DRAWOBJ7:
              /**
               * Parses drawing object data (version 7) from a binary buffer
               * @param buffer - The binary buffer containing drawing object data
               * @param structSize - The size of the structure to be parsed
               * @returns A structured object containing the parsed drawing object data
               */
              return ShapeConstant.parseDrawObj7(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_DRAWOBJ6:
              /**
               * Parses drawing object data (version 6) from a binary buffer
               * @param buffer - The binary buffer containing drawing object data
               * @param structSize - The size of the structure to be parsed
               * @returns A structured object containing the parsed drawing object data
               */
              return ShapeConstant.parseDrawObj6(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_CONNECTPOINT:
              /**
               * Parses connection point data from a binary buffer
               * @param buffer - The binary buffer containing connection point data
               * @returns A structured object containing connection point information
               */
              return ShapeConstant.parseConnectPoint(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_LONGTEXT8:
              /**
               * Parses long text data (version 8) from a binary buffer
               * @param buffer - The binary buffer containing long text data
               * @returns A structured object containing text metadata including runs, styles, and character counts
               */
              if (codeData.length === 8) {
                return ShapeConstant.parseLongText88(stream.mapUint8Array(codeData.length));
              } else {
                return ShapeConstant.parseLongText8(stream.mapUint8Array(codeData.length));
              }

            case ShapeConstant.OpCodeName.SDF_C_TEXT:
              /**
               * Parses text data from a binary buffer
               * @param buffer - The binary buffer containing text data
               * @returns A structured object containing text metadata and formatting information
               */
              return ShapeConstant.parseText(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_LONGTEXT:
              /**
               * Parses long text data from a binary buffer
               * @param buffer - The binary buffer containing long text data
               * @returns A structured object containing text metadata, formatting information, and shadow effects
               */
              return ShapeConstant.parseLongText(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_TEXTCHAR:
              /**
               * Parses text character data from a binary buffer
               * @param buffer - The binary buffer containing text character data
               * @returns A structured object containing the text as a string
               */
              let textCharData;
              if (codeData.length) {
                if (ShapeConstant.ReadUnicode) {
                  textCharData = ShapeConstant.parseTextChar(stream.mapUint8Array(codeData.length));
                } else {
                  textCharData = ShapeConstant.parseTextChar8(stream.mapUint8Array(codeData.length));
                }
              }
              return textCharData;

            case ShapeConstant.OpCodeName.SDF_C_TEXTRUN:
              /**
               * Parses text runs data from a binary buffer
               * @param buffer - The binary buffer containing text runs data
               * @returns A structured object containing text run information including formatting codes
               */
              return ShapeConstant.parseTextRuns(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_TEXTSTYLE:
              /**
               * Parses text style data from a binary buffer
               * @param buffer - The binary buffer containing text style data
               * @returns A structured object containing text style index, code count, and style codes
               */
              return ShapeConstant.parseTextStyle(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_TEXTLINK:
              /**
               * Parses text link data from a binary buffer
               * @param buffer - The binary buffer containing text link data
               * @returns A structured object with index, type, and path properties
               */
              return ShapeConstant.parseTextLink(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_TEXTDATA:
              /**
               * Parses text data from a binary buffer
               * @param buffer - The binary buffer containing text data
               * @returns A structured object with index and dataField properties
               */
              return ShapeConstant.parseTextData(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_D3SETTINGS:
              /**
               * Parses 3D settings from a binary buffer
               * @param buffer - The binary buffer containing 3D settings data
               * @returns An object containing 3D settings as a string
               */
              return ShapeConstant.parseD3Settings(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_DRAWSEGL:
              /**
               * Parses segment line data from a binary buffer based on structure size
               * @param buffer - The binary buffer containing segment line data
               * @returns A structured object containing segment line information
               */
              let segLineData;
              if (codeData.length === 58) {
                segLineData = ShapeConstant.parseSegLine58(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 158) {
                segLineData = ShapeConstant.parseSegLine(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 208) {
                segLineData = ShapeConstant.parseSegLine208(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 210) {
                segLineData = ShapeConstant.parseSegLine210(stream.mapUint8Array(codeData.length));
              }
              return segLineData;

            case ShapeConstant.OpCodeName.SDF_C_DRAWARRAY:
              /**
               * Parses array data from a binary buffer based on structure size
               * @param buffer - The binary buffer containing array data
               * @returns A structured object containing array information
               */
              let arrayData;
              if (codeData.length === 34) {
                arrayData = ShapeConstant.parseArray34(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 30) {
                arrayData = ShapeConstant.parseArray30(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 42) {
                arrayData = ShapeConstant.parseArray(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 38) {
                arrayData = ShapeConstant.parseArray38(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 14) {
                arrayData = ShapeConstant.parseArray14(stream.mapUint8Array(codeData.length));
              }
              return arrayData;

            case ShapeConstant.OpCodeName.SDF_C_DRAWARRAYHOOK:
              /**
               * Parses array hook data from a binary buffer based on structure size
               * @param buffer - The binary buffer containing array hook data
               * @returns A structured object containing array hook information
               */
              let arrayHookData;
              if (codeData.length === 14) {
                arrayHookData = ShapeConstant.parseArrayHook14(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 18) {
                arrayHookData = ShapeConstant.parseArrayHook18(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 38) {
                arrayHookData = ShapeConstant.parseArrayHook38(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 50) {
                arrayHookData = ShapeConstant.parseArrayHook50(stream.mapUint8Array(codeData.length));
              }
              return arrayHookData;

            case ShapeConstant.OpCodeName.SDF_C_DRAWCONTAINER:
              /**
               * Parses container list data from a binary buffer based on structure size
               * @param buffer - The binary buffer containing container list data
               * @returns A structured object containing container list information
               */
              let containerData;
              if (codeData.length === 92) {
                containerData = ShapeConstant.parseContainerList92(stream.mapUint8Array(codeData.length));
              } else if (codeData.length === 100) {
                containerData = ShapeConstant.parseContainerList100(stream.mapUint8Array(codeData.length));
              }
              return containerData;

            case ShapeConstant.OpCodeName.SDF_C_DRAWCONTAINERHOOK:
              /**
               * Parses container hook data from a binary buffer based on structure size
               * @param buffer - The binary buffer containing container hook data
               * @returns A structured object containing container hook information
               */
              if (codeData.length === 20) {
                return ShapeConstant.parseContainerHook20(stream.mapUint8Array(codeData.length));
              } else {
                return ShapeConstant.parseContainerHook28(stream.mapUint8Array(codeData.length));
              }

            case ShapeConstant.OpCodeName.cPrintErst:
            case ShapeConstant.OpCodeName.SDF_C_LIBLIST_PATH:
            case ShapeConstant.OpCodeName.SDF_C_LIBLIST_GUID:
            case ShapeConstant.OpCodeName.SDF_C_PARENTPAGEID:
            case ShapeConstant.OpCodeName.SDF_C_ORIGTEMPLATE:
            case ShapeConstant.OpCodeName.SDF_C_GUIDE:
            case ShapeConstant.OpCodeName.SDF_C_EXPORTPATH:
            case ShapeConstant.OpCodeName.SDF_C_DEFAULTLIBS:
            case ShapeConstant.OpCodeName.SDF_C_PRESENTATION_BACKGROUND:
            case ShapeConstant.OpCodeName.SDF_C_PRESENTATION_NAME:
            case ShapeConstant.OpCodeName.SDF_C_IMPORT_SOURCE_PATH:
            case ShapeConstant.OpCodeName.SDF_C_TASKPANEL:
            case ShapeConstant.OpCodeName.SDF_C_ORGCHARTTABLE:
            case ShapeConstant.OpCodeName.SDF_C_KANBAN_PC_TITLE:
            case ShapeConstant.OpCodeName.SDF_C_KANBAN_ASSIGN_TITLE:
            case ShapeConstant.OpCodeName.SDF_C_THEME_TEXTURE:
            case ShapeConstant.OpCodeName.SDF_C_DEFAULTLIBS:
            case ShapeConstant.OpCodeName.SDF_C_CELL_STYLENAME:
            case ShapeConstant.OpCodeName.SDF_O_TEXTURENAME:
            case ShapeConstant.OpCodeName.SDF_O_TEXTURECATNAME:
            case ShapeConstant.OpCodeName.SDF_C_DRAWJUMP:
            case ShapeConstant.OpCodeName.SDF_C_IMAGEURL:
            case ShapeConstant.OpCodeName.SDF_C_BUSINESSMODULE:
            case ShapeConstant.OpCodeName.SDF_C_SYMBOLSEARCHSTRING:
            case ShapeConstant.OpCodeName.SDF_C_SEARCHLIB:
            case ShapeConstant.OpCodeName.SDF_C_SEARCHLIB_NAME:
            case ShapeConstant.OpCodeName.SDF_C_SEARCHLIBSYMBOL_ID:
            case ShapeConstant.OpCodeName.SDF_C_SEARCHLIBSYMBOL_NAME:
            case ShapeConstant.OpCodeName.SDF_C_CURRENTSYMBOL_ID:
            case ShapeConstant.OpCodeName.SDF_C_LIBLIST_SEARCH_RESULT_ID:
            case ShapeConstant.OpCodeName.SDF_C_RECENTSYMBOL_ID:
            case ShapeConstant.OpCodeName.SDF_C_RECENTSYMBOL_NAME:
            case ShapeConstant.OpCodeName.SDF_C_RECENTSYMBOL_NOMENU:
            case ShapeConstant.OpCodeName.SDF_C_TOOLPALETTES_NAME:
            case ShapeConstant.OpCodeName.SDF_C_BUSINESSNAME_STR:
              /**
               * Parses string data from a binary buffer with appropriate encoding
               * @param buffer - The binary buffer containing template data
               * @returns An object with template name and length fields
               */
              if (ShapeConstant.ReadUnicode) {
                return ShapeConstant.parseOrigTemplate(stream.mapUint8Array(codeData.length));
              } else {
                return ShapeConstant.parseOrigTemplate8(stream.mapUint8Array(codeData.length));
              }

            case ShapeConstant.OpCodeName.SDF_C_EMFHASH:
              /**
               * Parses EMF hash data from a binary buffer
               * @param buffer - The binary buffer containing EMF hash data
               * @returns An object with hash information in 8-bit encoding
               */
              return ShapeConstant.parseOrigTemplate8(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_SVGFRAGMENTID:
            case ShapeConstant.OpCodeName.SDF_C_SVGIMAGEID:
              /**
               * Parses SVG fragment or image ID data from a binary buffer
               * @param buffer - The binary buffer containing SVG reference data
               * @returns A structured object containing SVG identifier information
               */
              return ShapeConstant.parseOrigTemplate(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_LEFTPANELINFO:
            case ShapeConstant.OpCodeName.SDF_C_LIBLIST_ENTRY:
            case ShapeConstant.OpCodeName.SDF_C_LIB_COLLAPSED:
            case ShapeConstant.OpCodeName.SDF_C_SEARCHLIB_COLLAPSED:
            case ShapeConstant.OpCodeName.SDF_C_SEARCHLIB_HIDDEN:
            case ShapeConstant.OpCodeName.SDF_C_HILITELIST:
              /**
               * Parses long value data for various UI state and library entries
               * @param buffer - The binary buffer containing the long value data
               * @returns A structured object containing value information
               */
              return ShapeConstant.parseLongValue(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_HILITE:
              /**
               * Parses highlight data from a binary buffer
               * @param buffer - The binary buffer containing highlight information
               * @returns A structured object containing highlight properties
               */
              return ShapeConstant.parseHighlight(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_CTHUMBNAIL:
              /**
               * Parses thumbnail image data from a binary buffer
               * @param buffer - The binary buffer containing PNG thumbnail data
               * @returns Object containing the image as URL, Blob, and raw bytes
               */
              return ShapeConstant.parse_image(stream.mapUint8Array(codeData.length), "image/png");

            case ShapeConstant.OpCodeName.SDF_C_DRAWIMAGE8:
              /**
               * Parses version 8 image data from a binary buffer
               * @param buffer - The binary buffer containing image data
               * @param size - The size of the data structure in bytes
               * @returns A structured object containing the parsed image data
               */
              return ShapeConstant.parseDrawImage8(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_DRAWMETA:
              /**
               * Parses Windows Metafile (WMF) image data from a binary buffer
               * @param buffer - The binary buffer containing WMF image data
               * @returns Object containing the image as URL, Blob, and raw bytes
               */
              return ShapeConstant.parse_image(stream.mapUint8Array(codeData.length), "image/wmf");

            case ShapeConstant.OpCodeName.SDF_C_DRAWPNG:
            case ShapeConstant.OpCodeName.SDF_C_DRAWPREVIEWPNG:
              /**
               * Parses PNG image data from a binary buffer
               * @param buffer - The binary buffer containing PNG image data
               * @returns Object containing the image as URL, Blob, and raw bytes
               */
              return ShapeConstant.parse_image(stream.mapUint8Array(codeData.length), "image/png");

            case ShapeConstant.OpCodeName.SDF_C_DRAWJPG:
              /**
               * Parses JPEG image data from a binary buffer
               * @param buffer - The binary buffer containing JPEG image data
               * @returns Object containing the image as URL, Blob, and raw bytes
               */
              return ShapeConstant.parse_image(stream.mapUint8Array(codeData.length), "image/jpeg");

            case ShapeConstant.OpCodeName.SDF_C_DRAWSVG:
              /**
               * Parses SVG image data from a binary buffer
               * @param buffer - The binary buffer containing SVG image data
               * @returns Object containing the image as URL, Blob, and raw bytes
               */
              return ShapeConstant.parse_image(stream.mapUint8Array(codeData.length), "image/svg+xml");

            case ShapeConstant.OpCodeName.SDF_C_OLEHEADER:
              /**
               * Parses OLE (Object Linking and Embedding) header data from a binary buffer
               * @param buffer - The binary buffer containing OLE header data
               * @param size - The size of the data in bytes
               * @returns A structured object containing OLE header information
               */
              return ShapeConstant.parseCOleHeader(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_OLESTORAGE:
              /**
               * Parses OLE storage data from a binary buffer
               * @param buffer - The binary buffer containing OLE storage data
               * @returns Object containing the OLE storage as raw data
               */
              return ShapeConstant.parse_image(stream.mapUint8Array(codeData.length), "image/store");

            case ShapeConstant.OpCodeName.SDF_C_NATIVESTORAGE:
              /**
               * Parses native storage buffer from binary data
               * @param buffer - The binary buffer containing native storage data
               * @returns Object containing the parsed data and byte array
               */
              return ShapeConstant.parseNativeBuffer(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_SDDATA64:
            case ShapeConstant.OpCodeName.SDF_C_SDDATA64C:
              /**
               * Parses 64-bit SD data from a binary buffer
               * @param buffer - The binary buffer containing SD data
               * @returns Object containing SD data ID, directory, and binary data
               */
              return ShapeConstant.parseCSdData(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_LAYERFLAGS:
              /**
               * Parses layer flags from binary data with appropriate structure
               * @param buffer - The binary buffer containing layer flags
               * @param size - The size of the data to determine format (2 or 4 bytes)
               * @returns Object containing layer flags
               */
              return codeData.length === 2
                ? ShapeConstant.parseCLayerFlags2(stream.mapUint8Array(codeData.length), codeData.length)
                : ShapeConstant.parseCLayerFlags4(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_LAYERNAME:
              /**
               * Parses layer name from binary data with appropriate encoding
               * @param buffer - The binary buffer containing layer name
               * @returns Object containing layer name with proper character encoding
               */
              return ShapeConstant.ReadUnicode
                ? ShapeConstant.parseOrigTemplate(stream.mapUint8Array(codeData.length))
                : ShapeConstant.parseOrigTemplate8(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_LAYERTYPE:
              /**
               * Parses layer type from binary data
               * @param buffer - The binary buffer containing layer type
               * @param size - The size of the data in bytes
               * @returns Object containing layer type information
               */
              return ShapeConstant.parseCLayerType(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_LAYERLIST:
              /**
               * Parses layer list from binary data
               * @param buffer - The binary buffer containing layer list
               * @param size - The size of the data in bytes
               * @returns Structured object containing layer list information
               */
              return ShapeConstant.parseCLayerList(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_NATIVEID:
              /**
               * Parses native ID from binary data
               * @param buffer - The binary buffer containing native ID
               * @param size - The size of the data in bytes
               * @returns Object containing native ID information
               */
              return ShapeConstant.parseCNativeId(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_TOOLPALETTES_COLLAPSED:
              /**
               * Parses tool palettes collapsed state from binary data
               * @param buffer - The binary buffer containing collapsed state
               * @param size - The size of the data in bytes
               * @returns Object containing collapsed state information
               */
              return ShapeConstant.parseCToolPalettesCollapsed(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_IMAGEID:
            case ShapeConstant.OpCodeName.SDF_C_EMFID:
            case ShapeConstant.OpCodeName.SDF_C_OLESTORAGEID:
              /**
               * Parses image ID and directory from binary data
               * @param buffer - The binary buffer containing image information
               * @param size - The size of the data in bytes
               * @returns Object containing blob bytes ID and image directory
               */
              return ShapeConstant.parseCImageId(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_C_NATIVEBLOCK:
            case ShapeConstant.OpCodeName.SDF_C_NATIVEWINBLOCK:
              /**
               * Parses a native block from binary data
               * @param buffer - The binary buffer containing native block data
               * @returns Object containing the parsed data, byte array, and native ID
               */
              return ShapeConstant.parseCNativeBlock(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_IMAGEBLOCK:
            case ShapeConstant.OpCodeName.SDF_C_EMFBLOCK:
              /**
               * Parses image block data from a binary buffer
               * @param buffer - The binary buffer containing image block data
               * @returns Object containing image ID, directory, and binary data
               */
              return ShapeConstant.parseCImageLock(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_EXPANDEDVIEWBLOCK:
            case ShapeConstant.OpCodeName.SDF_C_TABLEBLOCK:
              /**
               * Parses expanded view or table block data from a binary buffer
               * @param buffer - The binary buffer containing block data
               * @returns Object containing value information for the block
               */
              return ShapeConstant.parseLongValue(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_CLOUDCOMMENTBLOCK:
              /**
               * Parses cloud comment data from a binary buffer
               * @param buffer - The binary buffer containing comment data
               * @returns A structured object with ObjectID, UserID, timestamp, and comment text
               */
              return ShapeConstant.parseComment(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_GRAPHBLOCK:
              /**
               * Parses graph block data from a binary buffer
               * @param buffer - The binary buffer containing graph block data
               * @returns Object containing value information for the graph block
               */
              return ShapeConstant.parseLongValue(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_EXPANDEDVIEW:
              /**
               * Parses expanded view SVG data from a binary buffer
               * @param buffer - The binary buffer containing SVG data
               * @returns A structured object containing the parsed SVG data with an svg property
               */
              return ShapeConstant.parseExpandedView(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_GANTTINFOBLOCK:
            case ShapeConstant.OpCodeName.SDF_C_GRAPHID:
            case ShapeConstant.OpCodeName.SDF_C_TABLEID:
            case ShapeConstant.OpCodeName.SDF_C_GANTTINFOID:
            case ShapeConstant.OpCodeName.SDF_C_NOTEID:
            case ShapeConstant.OpCodeName.SDF_C_EXPANDEDVIEWID:
              /**
               * Parses ID values from a binary buffer
               * @param buffer - The binary buffer containing ID data
               * @returns Object containing value information for the ID
               */
              return ShapeConstant.parseLongValue(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_O_TEXTURELIST:
              /**
               * Parses texture list data from a binary buffer
               * @param buffer - The binary buffer containing texture list data
               * @param size - The size of the data in bytes
               * @returns Object containing texture list type information
               */
              return ShapeConstant.parseCLayerType(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_O_TEXTURE:
              /**
               * Parses texture data from binary buffer and sets the appropriate texture format
               * @param buffer - The binary buffer containing texture data
               * @param size - The size of the data in bytes
               * @returns Structured object containing texture information
               */
              return ShapeConstant.parseOTexture(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_O_TEXTUREEXT:
              /**
               * Parses extended texture data from binary buffer
               * @param buffer - The binary buffer containing extended texture data
               * @param size - The size of the data in bytes
               * @returns Structured object containing extended texture information
               */
              return ShapeConstant.parseOTextureExt(stream.mapUint8Array(codeData.length), codeData.length);

            case ShapeConstant.OpCodeName.SDF_O_TEXTUREDATA:
              /**
               * Parses texture image data from a binary buffer using current texture format
               * @param buffer - The binary buffer containing texture image data
               * @returns Object containing the image data in the detected texture format
               */
              return ShapeConstant.parse_image(stream.mapUint8Array(codeData.length), ShapeConstant.TextureFormat);

            case ShapeConstant.OpCodeName.SDF_C_COMMENT:
              /**
               * Parses comment data from a binary buffer
               * @param buffer - The binary buffer containing comment data
               * @returns Structured object with text information or instance ID and style count
               */
              return codeData.length === 8
                ? ShapeConstant.parseLongText88(stream.mapUint8Array(codeData.length))
                : ShapeConstant.parseLongText8(stream.mapUint8Array(codeData.length));

            case ShapeConstant.OpCodeName.SDF_C_FREEHANDLINE:
              /**
               * Parses freehand line data from binary buffer
               * @param buffer - The binary buffer containing freehand line data
               * @returns Structured object containing freehand line information
               */
              return ShapeConstant.parseFreehandLineStruct(stream.mapUint8Array(codeData.length));









            default:
              const dataLength = stream.mapUint8Array(codeData.length).length;
              return `data[${dataLength}]`;
          }
        }
      }
    ], "*"]
  ]

  /**
   * Parser structure definition for SDR (Shape Description Record) headers only
   * Used to parse header information without processing the complete document content
   * This lighter version only processes version information to determine encoding
   */
  static T3HeaderOnlyStruct = [
    "start",
    function (dataStream) {
      const signature = dataStream.readString(8);
      // Check if signature matches expected value
      const validSignature = signature == ShapeConstant.Signature ? signature : null;
      // Default to Unicode mode
      ShapeConstant.ReadUnicode = true;
      return validSignature;
    },
    "codes",
    ["[]", [
      "code",
      "uint16",
      "codeName",
      /**
       * Maps numeric operation code to its string name
       * @param stream - The data stream (unused)
       * @param codeData - The code data object containing the numeric code
       * @returns String name of the operation code or "Unknown" if not found
       */
      function (stream, codeData) {
        return ShapeConstant.SDROpCodesByCode[codeData.code] || "Unknown";
      },
      "length",
      /**
       * Reads the length of data for this operation code
       * @param stream - The data stream to read from
       * @param codeData - The code data object
       * @returns Length of the data block, or 0 if this is a control code (bit 0x4000 set)
       */
      function (stream, codeData) {
        return (codeData.code & 0x4000) ? 0 : stream.readUint32();
      },
      "data",
      {
        /**
         * Reads and parses operation data based on operation code
         * For header-only parsing, only processes version information
         * @param stream - The data stream to read from
         * @param codeData - The code data object containing code and length
         * @returns Parsed data object for version information, or undefined for other codes
         */
        get: function (stream, codeData) {
          // Skip control codes (bit 0x4000 set)
          if (codeData.code & 0x4000) {
            return 0;
          }

          let parsedData = {};

          // Only process version information in this lightweight parser
          if (codeData.code === ShapeConstant.OpCodeName.cVersion) {
            parsedData = ShapeConstant.parseVersion(stream.mapUint8Array(codeData.length));

            // Determine if we should use Unicode based on version information
            if (codeData.length < 18) {
              parsedData.Unicode = 0;
              ShapeConstant.ReadUnicode = false;
            } else {
              ShapeConstant.ReadUnicode = parsedData.Unicode;
            }

            return parsedData;
          }

          // Ignore all other operation codes in header-only mode
          return undefined;
        }
      }
    ], "*"]
  ]

}

export default ShapeConstant
