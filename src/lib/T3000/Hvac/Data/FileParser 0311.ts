

// import DataStream from '../Opt/Business/DataStream'
import T3DataStream from "../Opt/Business/T3DataStream"
//import DataStream from 'datastream-js'
import ConstantData2 from "./ConstantData2";

const FileParser = {};

FileParser.SDROpCodesByName = {
  SDF_C_VERSION: 32769,
  SDF_C_ENDFILE: 16385,
  SDF_C_HEADER: 32770,
  SDF_C_HEADER_END: 16386,
  SDF_C_PAGE: 3,
  SDF_C_WDEVMODE: 4,
  SDF_C_PRINTERST: 5,
  SDF_C_FONTLIST: 32774,
  SDF_C_FONTLIST_END: 16390,
  SDF_C_FONTNAME: 7,
  SDF_C_COLORTABLE: 8,
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
  SDF_O_TEXTUREEXTRA: 2178,
  SDF_O_TEXTUREEXTRA: 2178
}

FileParser.SDROpCodesByCode = {
  32769: 'SDF_C_VERSION',
  16385: 'SDF_C_ENDFILE',
  32770: 'SDF_C_HEADER',
  16386: 'SDF_C_HEADER_END',
  3: 'SDF_C_PAGE',
  4: 'SDF_C_WDEVMODE',
  5: 'SDF_C_PRINTERST',
  32774: 'SDF_C_FONTLIST',
  16390: 'SDF_C_FONTLIST_END',
  7: 'SDF_C_FONTNAME',
  8: 'SDF_C_COLORTABLE',
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

// FileParser.SDRShapeTypes = {
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

FileParser.SDRColorFilters = {
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

FileParser.SDRFillTypes = {
  SDFILL_TRANSPARENT: 0,
  SDFILL_SOLID: 1,
  SDFILL_GRADIENT: 2,
  SDFILL_TEXTURE: 3,
  SDFILL_IMAGE: 4
}

FileParser.v6ColorIndexes = {
  Std_BorderIndex: 0,
  Std_LineIndex: 1,
  Std_FillIndex: 2,
  Std_TextIndex: 3,
  Std_ShadowIndex: 4,
  Std_BackIndex: 5,
  Std_HiliteIndex: 6
}

FileParser.v6ShadowStyles = {
  SED_Sh_None: 0,
  SED_Sh_RLine: 1,
  SED_Sh_SLine: 2,
  SED_Sh_Cont: 3,
  SED_Sh_Drop: 4,
  SED_Sh_FDrop: 5
}

FileParser.SDRObjectFlags = {
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

FileParser.SDRExtraFlags = {
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

FileParser.ObjectTypes = {
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


// FileParser.SeglTypes = {
//   SED_L_Line: 0,
//   SED_L_Arc: 1
// }

FileParser.v6FillTypes = {
  SEHollowIndex: 0,
  SEOpaqueIndex: 1
}

FileParser.LineDirFlags = {
  SED_LT_SLeft: 0,
  SED_LT_STop: 4,
  SED_LT_SRight: 8,
  SED_LT_SBottom: 12,
  SED_LT_ELeft: 0,
  SED_LT_ETop: 1,
  SED_LT_ERight: 2,
  SED_LT_EBottom: 3
}

FileParser.LineSubclass = {
  SED_LCH: 0,
  SED_LCD: 1,
  SED_LCV: 2
}

FileParser.OutEffect = {
  SDOUT_EFFECT_NONE: 0,
  SDOUT_EFFECT_DROP: 1,
  SDOUT_EFFECT_CAST: 2,
  SDOUT_EFFECT_GLOW: 3,
  SDOUT_EFFECT_REFL: 4
}

FileParser.FillEffect = {
  SDFILL_EFFECT_NONE: 0,
  SDFILL_EFFECT_GLOSS: 1,
  SDFILL_EFFECT_BEVEL: 2,
  SDFILL_EFFECT_INSHADOW: 3,
  SDFILL_EFFECT_INGLOW: 4
}

FileParser.TextFace = {
  St_Plain: 0,
  St_Bold: 1,
  St_Italic: 2,
  St_Under: 4,
  St_Reverse: 8,
  St_Super: 16,
  St_Sub: 32,
  St_Strike: 64
}

FileParser.TextFlags = {
  TEN_F_LINEF: 1,
  TEN_F_LINEP: 2,
  TEN_F_BREAK: 4,
  TEN_F_SYMBOL: 8,
  TEN_F_INSSYMBOL: 16,
  TEN_F_BADSPELL: 32
}

FileParser.TextStyleCodes = {
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

FileParser.ParaStyleCodes = {
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

FileParser.TextJust = {
  TA_LEFT: 0,
  TA_RIGHT: 2,
  TA_CENTER: 6,
  TA_TOP: 0,
  TA_BOTTOM: 8
}

FileParser.ImageDir = {
  dir_meta: 113,
  dir_jpg: 124,
  dir_png: 125,
  dir_svg: 143,
  dir_store: 123
}

FileParser.Platforms = {
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

FileParser.SDWFileDir = {
  dir_text: 114
}

FileParser.FontFamily = {
  FF_ROMAN: 16,
  FF_SWISS: 32,
  FF_MODERN: 48,
  FF_SCRIPT: 64,
  FF_DECORATIVE: 80
}

FileParser.PrintFlags = {
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

FileParser.GrowCodes = {
  SED_OG_All: 0,
  SED_OG_Horiz: 1,
  SED_OG_Vert: 2,
  SED_OG_Prop: 3
}

FileParser.ArrowMasks = {
  ARROW_T_MASK: 255,
  ARROW_DISP: 256
}

FileParser.SED_NParaPts = 100
FileParser.SDF_MAXCONNECT = 20
FileParser.Std_ONStyleColors = 7
FileParser.Signature = '00000000'
FileParser.GetImageDir = function (e) {
  var t = 0;
  switch (e.type) {
    case 'image/jpeg':
      t = ConstantData2.ImageDir.dir_jpg;
      break;
    case 'image/png':
      t = ConstantData2.ImageDir.dir_png;
      break;
    case 'image/svg+xml':
      t = ConstantData2.ImageDir.dir_svg;
      break;
    case 'image/wmf':
      t = ConstantData2.ImageDir.dir_meta
  }
  return t
}

FileParser.GetImageBlobType = function (e) {
  var t = '';
  switch (e) {
    case ConstantData2.ImageDir.dir_jpg:
      t = 'image/jpeg';
      break;
    case ConstantData2.ImageDir.dir_png:
      t = 'image/png';
      break;
    case ConstantData2.ImageDir.dir_svg:
      t = 'image/svg+xml';
      break;
    case ConstantData2.ImageDir.dir_meta:
      t = 'image/wmf'
  }
  return t
}

FileParser.GetImageBlobTypeFromExt = function (e) {
  var t = '';
  switch (e) {
    case '.jpg':
    case '.jpeg':
    default:
      t = 'image/jpeg';
      break;
    case '.png':
      t = 'image/png';
      break;
    case '.svg':
      t = 'image/svg+xml';
      break;
    case '.emf':
      t = 'image/wmf'
  }
  return t
}

FileParser.decimalToHex = function (e, t, a) {
  var r = Number(e).toString(16).toUpperCase();
  for (t = null == t ? t = 2 : t; r.length < t;) r = '0' + r;
  return a ? r : '0x' + r
}

FileParser.ToInt32 = function (e) {
  return e >> 0
}

FileParser.ToUInt32 = function (e) {
  return e >>> 0
}

FileParser.SDF_POINT_Struct = [
  'x',
  'int16',
  'y',
  'int16'
]
FileParser.SDF_LPOINT_Struct = [
  'x',
  'int32',
  'y',
  'int32'
]
FileParser.SDF_DPOINT_Struct = [
  'x',
  'float64',
  'y',
  'float64'
]
FileParser.SDF_RECT_Struct = [
  'left',
  'int16',
  'top',
  'int16',
  'right',
  'int16',
  'bottom',
  'int16'
]
FileParser.SDF_LRECT_Struct = [
  'left',
  'int32',
  'top',
  'int32',
  'right',
  'int32',
  'bottom',
  'int32'
]
FileParser.SDF_DRECT_Struct = [
  'left',
  'float64',
  'top',
  'float64',
  'right',
  'float64',
  'bottom',
  'float64'
]
FileParser.SDF_DCRECT_Struct = [
  'x',
  'float64',
  'y',
  'float64',
  'width',
  'float64',
  'height',
  'float64'
]
FileParser.SDF_BlockHeader = [
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

FileParser.SDF_LOGFONT_Struct = [
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
FileParser.SDF_LOGFONT_Struct_PRE_V1 = [
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
FileParser.SDF_VERSION_Struct = [
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
FileParser.BLOCK_HEADER_Struct = [
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
FileParser.SDF_HEADER_Struct = [
  'flags',
  'uint16',
  'worigin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'longflags',
  'uint32',
  'dateformat',
  'int16'
]
FileParser.SDF_HEADER_Struct_810 = [
  'flags',
  'uint16',
  'worigin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'longflags',
  'uint32'
]
FileParser.SDF_HEADER_Struct_22 = [
  'flags',
  'uint16',
  'worigin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  }
]
FileParser.SDF_HEADER_Struct_14 = [
  'flags',
  'uint16',
  'worigin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'wscale',
  'uint16',
  'wflags',
  'uint16',
  'oleback',
  'int32'
]
FileParser.SDF_LineDrawList_Struct_6 = [
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
FileParser.SDF_UIInfo_Struct = [
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
FileParser.SDF_UIInfo_Struct_36 = [
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
FileParser.SDF_UIInfo_Struct_40 = [
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
FileParser.SDF_UIInfo_Struct_52 = [
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
FileParser.SDF_UIInfo_Struct_56 = [
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
FileParser.SDF_UIInfo_Struct_60 = [
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
FileParser.SDF_LibList_Struct = [
  'selected',
  'int32',
  'nacross',
  'int32'
]

FileParser.SDF_TextureExtra_Struct = [
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

FileParser.SDF_Texture_Struct = [
  'textureindex',
  'int32'
]

FileParser.SDF_Hatch_Struct = [
  'hatch',
  'int32'
]

FileParser.SDF_DRAWOBJ8_Struct_448 = [
  'otype',
  'uint32',
  'r',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
    }
  },
  'inside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
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
    get: function (e) {
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
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
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
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

FileParser.SDF_DRAWOBJ8_Struct = [
  'otype',
  'uint32',
  'r',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'inside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'dimensionDeflectionH',
  'int32',
  'dimensionDeflectionV',
  'int32',
  'commentdir',
  'uint32',
  'sequence',
  'uint32',
  'hookdisp_x',
  'int32',
  'hookdisp_y',
  'int32',
  'pptLayout',
  'uint32',
  'subtype',
  'uint32'
]

FileParser.SDF_DRAWOBJ8_Struct_316 = [
  'otype',
  'uint32',
  'r',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'inside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'dimensionDeflectionH',
  'int32',
  'dimensionDeflectionV',
  'int32',
  'commentdir',
  'uint32',
  'sequence',
  'uint32',
  'hookdisp_x',
  'int32',
  'hookdisp_y',
  'int32',
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

FileParser.SDF_DRAWOBJ8_Struct_312 = [
  'otype',
  'uint32',
  'r',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'inside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'dimensionDeflectionH',
  'int32',
  'dimensionDeflectionV',
  'int32',
  'commentdir',
  'uint32',
  'sequence',
  'uint32',
  'hookdisp_x',
  'int32',
  'hookdisp_y',
  'int32',
  'pptLayout',
  'uint32',
  'subtype',
  'uint32',
  'colorchanges',
  'uint32',
  'moreflags',
  'uint32'
]

FileParser.SDF_DRAWOBJ8_Struct_848 = [
  'otype',
  'uint32',
  'r',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'inside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'dimensionDeflectionH',
  'int32',
  'dimensionDeflectionV',
  'int32',
  'commentdir',
  'uint32',
  'sequence',
  'uint32',
  'hookdisp_x',
  'int32',
  'hookdisp_y',
  'int32',
  'pptLayout',
  'uint32',
  'subtype',
  'uint32',
  'colorchanges',
  'uint32'
]

FileParser.SDF_DRAWOBJ8_Struct_837 = [
  'otype',
  'uint32',
  'r',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'inside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'dimensionDeflectionH',
  'uint32',
  'dimensionDeflectionV',
  'uint32',
  'commentdir',
  'uint32',
  'sequence',
  'uint32',
  'hookdisp_x',
  'int32',
  'hookdisp_y',
  'int32',
  'pptLayout',
  'uint32'
]

FileParser.SDF_DRAWOBJ8_Struct_824 = [
  'otype',
  'uint32',
  'r',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'inside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'dimensionDeflectionH',
  'uint32',
  'dimensionDeflectionV',
  'uint32',
  'commentdir',
  'uint32',
  'sequence',
  'uint32'
]

FileParser.SDF_DRAWOBJ8_Struct_830 = [
  'otype',
  'uint32',
  'r',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'inside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'dimensionDeflectionH',
  'uint32',
  'dimensionDeflectionV',
  'uint32',
  'commentdir',
  'uint32',
  'sequence',
  'uint32',
  'hookdisp_x',
  'int32',
  'hookdisp_y',
  'int32'
]

FileParser.SDF_DRAWOBJ8_Struct_814 = [
  'otype',
  'uint32',
  'r',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'inside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'dimensionDeflectionH',
  'uint32',
  'dimensionDeflectionV',
  'uint32'
]

FileParser.SDF_DRAWOBJ8_Struct_810 = [
  'otype',
  'uint32',
  'r',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'inside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'styleindex',
  'uint32',
  'objecttype',
  'uint32',
  'colorfilter',
  'uint32'
]

FileParser.SDF_DRAWOBJ_Struct = [
  'otype',
  'uint16',
  'r',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'inside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'gflags',
  'uint16'
]

FileParser.SDF_DRAWOBJ_Struct_148 = [
  'otype',
  'uint16',
  'r',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'inside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'gflags',
  'uint16',
  'lr',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'lframe',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'linside',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'lfixedpoint',
  'int32',
  'lsizedim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'lgframe',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  }
]

FileParser.SDF_DRAWOBJ6_Struct = [
  'hgframe',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'layer',
  'int32',
  'extraflags',
  'uint32'
]

FileParser.SDF_DRAWOBJ6_Struct_20 = [
  'hgframe',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'layer',
  'int32'
]

FileParser.SDF_DRAWOBJ7_Struct_48 = [
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'dbthick',
  'float64'
]

FileParser.SDF_DRAWOBJ7_Struct_20 = [
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

FileParser.SDF_PAGE_Struct_126 = [
  'margins',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
    }
  },
  'minmarg',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
    }
  },
  'landscape',
  'uint16',
  'printflags',
  'uint32',
  'lPadDim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
    }
  },
  'lpapersize',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
    }
  },
  'MinSize',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
    }
  },
  'printscale',
  'float64'
]

FileParser.SDF_PAGE_Struct_62 = [
  'PadDim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'papersize',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'margins',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'minmarg',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'lpapersize',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'MinSize',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'printscale',
  'uint32'
]

FileParser.SDF_PAGE_Struct_34 = [
  'PadDim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'papersize',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'margins',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'minmarg',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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

FileParser.SDF_PAGE_Struct_30 = [
  'PadDim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'papersize',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'margins',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'minmarg',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'landscape',
  'uint16',
  'wpapersize',
  'uint16',
  'overlap',
  'uint16'
]

FileParser.SDF_FONTNAME_Struct = [
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

FileParser.SDF_FONTNAME12_Struct = [
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

FileParser.SDF_FONTNAME15_Struct = [
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

FileParser.SDF_C_DRAW12_Struct420 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
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

FileParser.SDF_C_DRAW12_Struct440 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
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

FileParser.SDF_C_DRAW12_Struct364 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_C_DRAW12_Struct356 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_C_DRAW12_Struct_835 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_C_DRAW12_Struct_836 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_C_DRAW12_Struct_841 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_C_DRAW12_Struct_842 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_C_DRAW12_Struct_847 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_C_DRAW8_Struct = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_C_DRAW8_Struct_825 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
FileParser.SDF_C_DRAW8_Struct_810 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_C_DRAW8_Struct_224 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_C_DRAW8_Struct_800 = [
  'nobjects',
  'int32',
  'ngroups',
  'int32',
  'nlinks',
  'int32',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1, t)
    }
  },
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_C_DRAW_Struct_236 = [
  'nobjects',
  'int16',
  'ngroups',
  'int16',
  'nlinks',
  'int16',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'colors',
  {
    get: function (e) {
      var t,
        a,
        r = [];
      for (t = 0; t < FileParser.Std_ONStyleColors; ++t) a = e.readUint32(),
        r.push(a);
      return r
    }
  },
  'shaddisp',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1, t)
    }
  }
]

FileParser.SDF_C_DRAW_Struct_252 = [
  'nobjects',
  'int16',
  'ngroups',
  'int16',
  'nlinks',
  'int16',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'colors',
  {
    get: function (e) {
      var t,
        a,
        r = [];
      for (t = 0; t < FileParser.Std_ONStyleColors; ++t) a = e.readUint32(),
        r.push(a);
      return r
    }
  },
  'shaddisp',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1, t)
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

FileParser.SDF_C_DRAW_Struct_268 = [
  'nobjects',
  'int16',
  'ngroups',
  'int16',
  'nlinks',
  'int16',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
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
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'colors',
  {
    get: function (e) {
      var t,
        a,
        r = [];
      for (t = 0; t < FileParser.Std_ONStyleColors; ++t) a = e.readUint32(),
        r.push(a);
      return r
    }
  },
  'shaddisp',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
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
      return e.readStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1, t)
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
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'ldupdisp',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  }
]

FileParser.SDF_C_DRAW7_Struct_52 = [
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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

FileParser.SDF_C_DRAW7_Struct_48 = [
  'hopstyle',
  'int32',
  'hopdim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
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

FileParser.SDF_C_DRAWEXTRA_Struct_14 = [
  'tmargins',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'textgrow',
  'int16',
  'textflags',
  'int16',
  'fsize_min',
  'int16'
]

FileParser.SDF_C_DRAWOBJ5_Struct_60 = [
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

FileParser.SDF_DRAWTEXT_Struct_182 = [
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
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
    }
  },
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
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

FileParser.SDF_DRAWTEXT_Struct_110 = [
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_DRAWTEXT_Struct_106 = [
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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

FileParser.SDF_DRAWTEXT_Struct_94 = [
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'commentid',
  'int16',
  'textwrapwidth',
  'int32'
]

FileParser.SDF_DRAWTEXT_Struct = [
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'commentid',
  'int16'
]

FileParser.SDF_DRAWTEXT_Struct_810 = [
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  }
]

FileParser.SDF_DRAWTEXT_Struct_300 = [
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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

FileParser.SDF_LONGTEXT8_Struct_8 = [
  'InstID',
  'int32',
  'nstyles',
  'int32'
]

FileParser.SDF_LONGTEXT8_Struct = [
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'nlinks',
  'int32',
  'nlinkchar',
  'int32',
  'markupobjid',
  'int32'
]

FileParser.SDF_LONGTEXT_Struct = [
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'shaddisp',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
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

FileParser.SDF_TEXT_Struct = [
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'shaddisp',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'shadowstyle',
  'int16',
  'scolor',
  'uint32',
  'hcolor',
  'uint32'
]

FileParser.SDF_TEXTCODE_Struct = [
  'code',
  'uint16',
  'value',
  'uint32'
]

FileParser.SDF_TEXTCODE_Struct_Float = [
  'code',
  'uint16',
  'value',
  'float64'
]

FileParser.SDF_TEXTCODE_Struct_Code = [
  'code',
  'uint16'
]

FileParser.SDF_TEXTCODE_Struct_Value = [
  'value',
  'uint32'
]

FileParser.SDF_TEXTCODE_Struct_Value_Float = [
  'value',
  'float64'
]

FileParser.SDF_TEXTRUNS_Header = [
  'nruns',
  'uint16'
]

FileParser.SDF_TEXTCHANGE_Header = [
  'ncodes',
  'uint16',
  'offset',
  'uint32'
]

FileParser.SDF_STYLECODE_Struct = [
  'code',
  'uint16',
  'value',
  'int16'
]

FileParser.SDF_TEXTSTYLE_Header = [
  'index',
  'uint16',
  'ncodes',
  'uint16'
]

FileParser.SDF_TEXTLINK_Header = [
  'index',
  'uint16',
  'type',
  'uint16'
]

FileParser.SDF_PolyList_Struct_24 = [
  'InstID',
  'int16',
  'n',
  'int16',
  'flags',
  'uint32',
  'ldim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
    }
  }
]

FileParser.SDF_PolyList_Struct_20 = [
  'InstID',
  'int16',
  'n',
  'int16',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'flags',
  'uint32',
  'ldim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  }
]

FileParser.SDF_PolyList_Struct_8 = [
  'InstID',
  'int16',
  'n',
  'int16',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  }
]

FileParser.SDF_PolyList_Struct_12 = [
  'InstID',
  'int16',
  'n',
  'int16',
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'flags',
  'uint32'
]

FileParser.SDF_PolySeg_Struct_18 = [
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
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  }
]

FileParser.SDF_PolySeg_Struct_26 = [
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
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'lpt',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  }
]

FileParser.SDF_PolySeg_Struct = [
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
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'lpt',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'dimDeflection',
  'int16'
]

FileParser.SDF_PolySeg_Struct_847 = [
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
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'lpt',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'dimDeflection',
  'int16',
  'flags',
  'int32'
]

FileParser.SDF_PolySeg_Struct_50 = [
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
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
    }
  },
  'dimDeflection',
  'float64',
  'flags',
  'int32',
  'weight',
  'float64'
]

FileParser.SDF_PolySeg_Struct_40 = [
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
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'lpt',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'dimDeflection',
  'int16',
  'flags',
  'int32',
  'weight',
  'float64'
]

FileParser.SDF_PolySegExplicitPoint_Struct = [
  'npts',
  'int16',
  'pt',
  {
    get: function (e) {
      var t,
        a,
        r = [];
      for (t = 0; t < FileParser.SED_NParaPts; ++t) a = e.readStruct(FileParser.SDF_LPOINT_Struct),
        r.push(a);
      return r
    },
    set: function (e, t) {
      var a;
      for (a = 0; a < FileParser.SED_NParaPts; ++a) e.writeStruct(FileParser.SDF_LPOINT_Struct, t[a])
    }
  }
],
  FileParser.SDF_FreehandLine_Struct = [
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
        for (a = 0; a < t.npts; a++) r = e.readStruct(FileParser.SDF_DPOINT_Struct),
          i.push(r);
        return i
      },
      set: function (e, t, a) {
        var r;
        for (r = 0; r < a.npts; ++r) e.writeStruct(FileParser.SDF_DPOINT_Struct, t[r])
      }
    }
  ]

FileParser.SDF_CONNECTPOINT_Struct = [
  'nconnect',
  'int32',
  'connect',
  {
    get: function (e, t) {
      var a,
        r,
        i = [];
      for (a = 0; a < t.nconnect; ++a) r = e.readStruct(FileParser.SDF_LPOINT_Struct),
        i.push(r);
      return i
    },
    set: function (e, t, a) {
      var r;
      for (r = 0; r < a.nconnect; ++r) e.writeStruct(FileParser.SDF_LPOINT_Struct, t[r])
    }
  }
]

FileParser.SDF_LINK_Struct = [
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

FileParser.SDF_LINK6_Struct = [
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

FileParser.SDF_LinkList_Struct = [
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
      for (a = 0; a < t.n; ++a) r = e.readStruct(FileParser.SDF_LINK_Struct),
        i.push(r);
      return i
    },
    set: function (e, t, a) {
      var r;
      for (r = 0; r < a.n; ++r) e.writeStruct(FileParser.SDF_LINK_Struct, t[r])
    }
  }
]

FileParser.SDF_LinkList6_Struct = [
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
      for (a = 0; a < t.n; ++a) r = e.readStruct(FileParser.SDF_LINK6_Struct),
        i.push(r);
      return i
    },
    set: function (e, t, a) {
      var r;
      for (r = 0; r < a.n; ++r) e.writeStruct(FileParser.SDF_LINK6_Struct, t[r])
    }
  }
]

FileParser.SDF_ArrayHookText_Struct = [
  'tindex',
  'int32',
  'tuniqueid',
  'uint32'
]

FileParser.SDF_SegLine_Struct_210 = [
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
      for (t = 0; t < 5; ++t) a = e.readStruct(FileParser.SDF_DRECT_Struct),
        r.push(a);
      return r
    },
    set: function (e, t) {
      var a;
      for (a = 0; a < 5; ++a) e.writeStruct(FileParser.SDF_DRECT_Struct, t[a])
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

FileParser.SDF_SegLine_Struct_208 = [
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
      for (t = 0; t < 5; ++t) a = e.readStruct(FileParser.SDF_DRECT_Struct),
        r.push(a);
      return r
    },
    set: function (e, t) {
      var a;
      for (a = 0; a < 5; ++a) e.writeStruct(FileParser.SDF_DRECT_Struct, t[a])
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

FileParser.SDF_SegLine_Struct = [
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
      for (t = 0; t < 5; ++t) a = e.readStruct(FileParser.SDF_RECT_Struct),
        r.push(a);
      return r
    },
    set: function (e, t) {
      var a;
      for (a = 0; a < 5; ++a) e.writeStruct(FileParser.SDF_RECT_Struct, t[a])
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
      for (t = 0; t < 5; ++t) a = e.readStruct(FileParser.SDF_LRECT_Struct),
        r.push(a);
      return r
    },
    set: function (e, t) {
      var a;
      for (a = 0; a < 5; ++a) e.writeStruct(FileParser.SDF_LRECT_Struct, t[a])
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

FileParser.SDF_SegLine_Struct_58 = [
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
      for (t = 0; t < 5; ++t) a = e.readStruct(FileParser.SDF_RECT_Struct),
        r.push(a);
      return r
    },
    set: function (e, t) {
      var a;
      for (a = 0; a < 5; ++a) e.writeStruct(FileParser.SDF_RECT_Struct, t[a])
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

FileParser.SDF_ARRAY_Struct_30 = [
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

FileParser.SDF_ARRAY_Struct_34 = [
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

FileParser.SDF_ARRAY_Struct = [
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'angle',
  'int32'
]

FileParser.SDF_ARRAY_Struct_38 = [
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  }
]

FileParser.SDF_ARRAY_Struct_14 = [
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

FileParser.SDF_ARRAYHOOK_Struct_50 = [
  'uniqueid',
  'uint16',
  'extra',
  'float64',
  'lliner',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
    }
  },
  'lgap',
  'float64'
]

FileParser.SDF_ARRAYHOOK_Struct_38 = [
  'liner',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'lgap',
  'int32'
]

FileParser.SDF_ARRAYHOOK_Struct_18 = [
  'liner',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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

FileParser.SDF_ARRAYHOOK_Struct_14 = [
  'liner',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'uniqueid',
  'uint16',
  'index',
  'int16',
  'gap',
  'int16'
]

FileParser.SDF_CONTAINERLIST_Struct_100 = [
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

FileParser.SDF_CONTAINERLIST_Struct_92 = [
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

FileParser.SDF_CONTAINERHOOK_Struct_20 = [
  'x',
  'float64',
  'y',
  'float64',
  'id',
  'int32'
]

FileParser.SDF_CONTAINERHOOK_Struct_28 = [
  'x',
  'float64',
  'y',
  'float64',
  'id',
  'int32',
  'extra',
  'float64'
]

FileParser.SDF_OBJDATA_Struct16 = [
  'datasetID',
  'int32',
  'datasetElemID',
  'int32',
  'datasetType',
  'int32',
  'datasetTableID',
  'int32'
]

FileParser.SDF_OBJDATA_Struct32 = [
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

FileParser.SDF_RULER_Struct = [
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

FileParser.SDF_RULER_Struct_24 = [
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

FileParser.SDF_RULER_Struct_48 = [
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

FileParser.SDF_RULER_Struct_52 = [
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

FileParser.SDF_DRAWIMAGE8_Struct_82 = [
  'mr',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DCRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DCRECT_Struct, t)
    }
  },
  'croprect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
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


FileParser.SDF_DRAWIMAGE8_Struct_50 = [
  'mr',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'croprect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
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
],
  FileParser.SDF_DRAWIMAGE8_Struct_48 = [
    'mr',
    {
      get: function (e) {
        return e.readStruct(FileParser.SDF_LRECT_Struct)
      },
      set: function (e, t) {
        e.writeStruct(FileParser.SDF_LRECT_Struct, t)
      }
    },
    'croprect',
    {
      get: function (e) {
        return e.readStruct(FileParser.SDF_LRECT_Struct)
      },
      set: function (e, t) {
        e.writeStruct(FileParser.SDF_LRECT_Struct, t)
      }
    },
    'imageflags',
    'int32',
    'scale',
    'float64',
    'uniqueid',
    'uint32'
  ]

FileParser.SDF_BEGIN_THEME12_Struct = [
  'name',
  'u16stringle:32',
  'ncolorrows',
  'int32',
  'ncolorcols',
  'int32',
  'EffectStyleIndex',
  'int32'
]

FileParser.SDF_BEGIN_TEXTF_Struct = [
  'fontid',
  'int32',
  'fsize',
  'int32',
  'face',
  'int32'
]

FileParser.SDF_OUTSIDE_EFFECT_Struct = [
  'outsidetype',
  'int32',
  'extent',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
    }
  },
  'color',
  'uint32',
  'lparam',
  'int32',
  'wparam',
  'int32'
]

FileParser.SDF_THEME_FONT12_Struct = [
  'fontname',
  'u16stringle:32',
  'charset',
  'int32'
]

FileParser.SDF_BEGIN_LINE_Struct_8 = [
  'thickness',
  'int32',
  'pattern',
  'int32'
]

FileParser.SDF_BEGIN_LINE_Struct_12 = [
  'thickness',
  'int32',
  'pattern',
  'float64'
]

FileParser.SDF_BEGIN_LINE_Struct_14 = [
  'thickness',
  'float64',
  'pattern',
  'int32',
  'dummy',
  'int16'
]

FileParser.SDF_BEGIN_PAINT_Struct = [
  'filltype',
  'uint32',
  'color',
  'uint32'
]

FileParser.SDF_GRADIENT_Struct = [
  'gradientflags',
  'uint32',
  'ecolor',
  'uint32'
]

FileParser.SDF_RICHGRADIENT_Struct = [
  'gradienttype',
  'uint32',
  'angle',
  'uint32',
  'nstops',
  'uint32'
]

FileParser.SDF_RICHGRADIENTSTOP_Struct = [
  'color',
  'uint32',
  'stop',
  'uint32'
]

FileParser.SDF_EFFECT_Struct = [
  'effecttype',
  'int32',
  'effectcolor',
  'uint32',
  'wparam',
  'int32',
  'lparam',
  'int32'
]

FileParser.SDF_FILLED_LINE_Struct = [
  'bthick',
  'float64',
  'color',
  'uint32'
]

FileParser.SDF_DRAWARROW_Struct = [
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

FileParser.SDF_DRAWHOOK_Struct = [
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

FileParser.SDF_DRAWHOOK_Struct_10 = [
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

FileParser.SDF_DRAWHOOK_Visio_Struct = [
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

FileParser.LONGVALUE_Struct = [
  'value',
  'uint32'
]

FileParser.LONGVALUE2_Struct = [
  'value',
  'uint32',
  'type',
  'uint32'
]

FileParser.SDF_DRAWBORDER_Struct = [
  'bord',
  'uint16',
  'patindex',
  'int16',
  'color',
  'uint32'
]

FileParser.SDF_GANTTINFO_Struct = [
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

FileParser.SDF_DRAWLINE_Struct = [
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

FileParser.SDF_DRAWFILL_Struct = [
  'fpatindex',
  'uint16',
  'color',
  'uint32',
  'gradientflags',
  'int32',
  'ecolor',
  'uint32'
]

FileParser.SDF_DRAWFILL_Struct_6 = [
  'fpatindex',
  'uint16',
  'color',
  'uint32'
]

FileParser.SDF_THEME_COLOR_Struct = [
  'color',
  'uint32'
]

FileParser.SDF_THEMEGRADIENT_Struct = [
  'color',
  'uint32',
  'endcolor',
  'uint32',
  'gradientflags',
  'uint32'
]

FileParser.SDF_TABLE_Struct_64 = [
  'ncells',
  'uint32',
  'nrows',
  'uint32',
  'ht',
  'float64',
  'wd',
  'float64',
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
    }
  },
  'tabletype',
  'uint32',
  'flags',
  'uint32'
]

FileParser.SDF_TABLE_Struct_32 = [
  'ncells',
  'uint32',
  'nrows',
  'uint32',
  'ht',
  'uint32',
  'wd',
  'uint32',
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'tabletype',
  'uint32',
  'flags',
  'uint32'
]

FileParser.SDF_TABLE_Struct_28 = [
  'ncells',
  'uint32',
  'nrows',
  'uint32',
  'ht',
  'uint32',
  'wd',
  'uint32',
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'tabletype',
  'uint32'
]

FileParser.SDF_TABLE_Struct_24 = [
  'ncells',
  'uint32',
  'nrows',
  'uint32',
  'ht',
  'uint32',
  'wd',
  'uint32',
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  }
]

FileParser.SDF_TABLE_Struct_Short = [
  'ncells',
  'uint16',
  'nrows',
  'uint16',
  'ht',
  'uint32',
  'wd',
  'uint32',
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'tabletype',
  'uint32',
  'flags',
  'uint32'
]

FileParser.SDF_TABLE_Struct_Short_24 = [
  'ncells',
  'uint16',
  'nrows',
  'uint16',
  'ht',
  'uint32',
  'wd',
  'uint32',
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'tabletype',
  'uint32'
]

FileParser.SDF_TABLE_Struct_Short_20 = [
  'ncells',
  'uint16',
  'nrows',
  'uint16',
  'ht',
  'uint32',
  'wd',
  'uint32',
  'tmargin',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  }
]

FileParser.SDF_TABLE_CELL_Struct_176 = [
  'textht',
  'float64',
  'textwd',
  'float64',
  'minwd',
  'float64',
  'sizedim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DPOINT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
    }
  },
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
    }
  },
  'textid',
  'int32',
  'vjust',
  'int32',
  'just',
  'int32',
  'flags',
  'uint32',
  'fontid',
  'uint32',
  'associd',
  'uint32',
  'associndex',
  'int32',
  'nextra',
  'int32',
  'vdisp',
  'float64',
  'hdisp',
  'float64',
  'sequence',
  'int32',
  'framewd',
  'float64',
  'trectwd',
  'float64',
  'childcontainer',
  'int32'
]

FileParser.SDF_TABLE_CELL_Struct_108 = [
  'textht',
  'int32',
  'textwd',
  'int32',
  'minwd',
  'int32',
  'sizedim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'textid',
  'int32',
  'vjust',
  'int32',
  'just',
  'int32',
  'flags',
  'uint32',
  'fontid',
  'uint32',
  'associd',
  'uint32',
  'associndex',
  'int32',
  'nextra',
  'int32',
  'vdisp',
  'int32',
  'hdisp',
  'int32',
  'sequence',
  'int32',
  'framewd',
  'int32',
  'trectwd',
  'int32',
  'childcontainer',
  'int32'
]

FileParser.SDF_TABLE_CELL_Struct = [
  'textht',
  'int32',
  'textwd',
  'int32',
  'minwd',
  'int32',
  'sizedim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'textid',
  'int32',
  'vjust',
  'int32',
  'just',
  'int32',
  'flags',
  'uint32',
  'fontid',
  'uint32',
  'associd',
  'uint32',
  'associndex',
  'int32',
  'nextra',
  'int32',
  'vdisp',
  'int32',
  'hdisp',
  'int32',
  'sequence',
  'int32',
  'framewd',
  'int32',
  'trectwd',
  'int32'
]

FileParser.SDF_TABLE_CELL_Struct_96 = [
  'textht',
  'int32',
  'textwd',
  'int32',
  'minwd',
  'int32',
  'sizedim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'textid',
  'int32',
  'vjust',
  'int32',
  'just',
  'int32',
  'flags',
  'uint32',
  'fontid',
  'uint32',
  'associd',
  'uint32',
  'associndex',
  'int32',
  'nextra',
  'int32',
  'vdisp',
  'int32',
  'hdisp',
  'int32',
  'sequence',
  'int32'
]

FileParser.SDF_TABLE_CELL_Struct_92 = [
  'textht',
  'int32',
  'textwd',
  'int32',
  'minwd',
  'int32',
  'sizedim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'textid',
  'int32',
  'vjust',
  'int32',
  'just',
  'int32',
  'flags',
  'uint32',
  'fontid',
  'uint32',
  'associd',
  'uint32',
  'associndex',
  'int32',
  'nextra',
  'int32',
  'vdisp',
  'int32',
  'hdisp',
  'int32'
]

FileParser.SDF_TABLE_CELL7_Struct = [
  'textht',
  'int16',
  'textwd',
  'int16',
  'minwd',
  'int16',
  'sizedim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'textid',
  'int16',
  'vjust',
  'int16',
  'just',
  'int16',
  'hbord',
  'int16',
  'hdisp',
  'int16',
  'hpatindex',
  'int16',
  'hlcolor',
  'uint32',
  'vbord',
  'int16',
  'vdisp',
  'int16',
  'vpatindex',
  'int16',
  'vlcolor',
  'uint32',
  'fpatindex',
  'int16',
  'bcolor',
  'uint32',
  'flags',
  'uint16',
  'fontid',
  'int16',
  'fsize',
  'int16',
  'face',
  'int16',
  'tcolor',
  'uint32',
  'associd',
  'uint16',
  'associndex',
  'int16',
  'nextra',
  'int16',
  'ltextht',
  'int32',
  'ltextwd',
  'int32',
  'lsizedim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'lframe',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'ltrect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  }
]

FileParser.SDF_TABLE_CELL7_Struct_76 = [
  'textht',
  'int16',
  'textwd',
  'int16',
  'minwd',
  'int16',
  'sizedim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'trect',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'textid',
  'int16',
  'vjust',
  'int16',
  'just',
  'int16',
  'hbord',
  'int16',
  'hdisp',
  'int16',
  'hpatindex',
  'int16',
  'hlcolor',
  'uint32',
  'vbord',
  'int16',
  'vdisp',
  'int16',
  'vpatindex',
  'int16',
  'vlcolor',
  'uint32',
  'fpatindex',
  'int16',
  'bcolor',
  'uint32',
  'flags',
  'uint16',
  'fontid',
  'int16',
  'fsize',
  'int16',
  'face',
  'int16',
  'tcolor',
  'uint32',
  'associd',
  'uint16',
  'associndex',
  'int16',
  'nextra',
  'int16'
],
  FileParser.SDF_TABLE_CELLEXTRA_Struct = [
    'celltype',
    'int32',
    'dwold',
    'uint32',
    'styleindex',
    'int32',
    'celltime',
    'float64',
    'datarecordID',
    'int32'
  ]

FileParser.SDF_TABLE_CELLEXTRA_Struct_12 = [
  'celltype',
  'int32',
  'dwold',
  'uint32',
  'styleindex',
  'int32'
]

FileParser.SDF_TABLE_CELLEXTRAOLD_Struct = [
  'stylename',
  'string:32',
  'celltype',
  'int32',
  'dw',
  'uint32',
  'styleindex',
  'int32'
]

FileParser.SDF_TABLE_CELLPROP_Struct = [
  'fieldindex',
  'int32',
  'uniqueid',
  'uint32',
  'namelabel',
  'int32',
  'nfontid',
  'int32',
  'nfsize',
  'int32',
  'nface',
  'int32',
  'ntcolor',
  'uint32',
  'namewidth',
  'int32'
]

FileParser.SDF_TABLE_ROW_Struct_40 = [
  'ncells',
  'uint32',
  'start',
  'uint32',
  'lframe',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_DRECT_Struct, t)
    }
  }
]

FileParser.SDF_TABLE_ROW_Struct_32 = [
  'ncells',
  'uint32',
  'start',
  'uint32',
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'lframe',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  }
]

FileParser.SDF_TABLE_ROW_Struct_Short = [
  'ncells',
  'uint16',
  'start',
  'uint16',
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'lframe',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  }
]

FileParser.SDF_TABLE_ROW_Struct_Short_12 = [
  'ncells',
  'uint16',
  'start',
  'uint16',
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  }
]

FileParser.SDF_GRAPH_Struct = [
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

FileParser.SDF_GRAPH_AXIS_Struct = [
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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

FileParser.SDF_GRAPH_POINT_Struct = [
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'labelTextId',
  'uint16',
  'labelTangle',
  'uint16',
  'labelFrame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'labelCenter',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  }
]

FileParser.SDF_GRAPH_AXIS_TITLE_Struct = [
  'lflags',
  'uint16',
  'just',
  'uint16',
  'margin',
  'uint16',
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'tangle',
  'uint16',
  'drawpt',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'center',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  }
]

FileParser.SDF_GRAPH_AXIS_LABEL_Struct = [
  'categoryid',
  'uint16',
  'lflags',
  'uint16',
  'frame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'tangle',
  'uint16',
  'center',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_POINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_POINT_Struct, t)
    }
  },
  'textid',
  'uint16',
  'just',
  'uint16',
  'vjust',
  'uint16'
]

FileParser.SDF_GRAPH_LEGEND_ENTRY_Struct = [
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
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'swatchFrame',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_RECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_RECT_Struct, t)
    }
  },
  'flags',
  'uint16'
]

FileParser.SDF_LayerList_Struct = [
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

FileParser.SDF_OLEHEADER_Struct = [
  'dva',
  'uint32',
  'linked',
  'int16',
  'scale',
  'float64'
]

FileParser.parse_SDF_VERSION = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_VERSION_Struct)
}

FileParser.parse_SDF_HEADER = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_HEADER_Struct)
}

FileParser.parse_SDF_HEADER_810 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_HEADER_Struct_810)
}

FileParser.parse_SDF_HEADER_22 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_HEADER_Struct_22)
}

FileParser.parse_SDF_HEADER_14 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_HEADER_Struct_14)
}

FileParser.parse_SDF_UIInfo = function (e, t) {
  return 60 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_UIInfo_Struct_60) : 56 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_UIInfo_Struct_56) : 52 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_UIInfo_Struct_52) : 40 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_UIInfo_Struct_40) : 36 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_UIInfo_Struct_36) : new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_UIInfo_Struct)
}

FileParser.parse_SDF_LibList = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_LibList_Struct)
}

FileParser.parse_SDF_TextureExtra = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TextureExtra_Struct)
}

FileParser.parse_SDF_PAGE_126 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PAGE_Struct_126)
}

FileParser.parse_SDF_PAGE_62 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PAGE_Struct_62)
}

FileParser.parse_SDF_PAGE_34 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PAGE_Struct_34)
}

FileParser.parse_SDF_PAGE_30 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PAGE_Struct_30)
}
FileParser.parse_SDF_ORIGTEMPLATE = function (e) {
  var t = [
    'name',
    'u16stringle:' + (e.length / 2 - 1),
    'length',
    'u16stringle:1'
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.parse_SDF_ORIGTEMPLATE8 = function (e) {
  var t = [
    'name',
    'string:' + (e.length - 1),
    'length',
    'string:1'
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.parse_SDF_LONGVALUE = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.LONGVALUE_Struct)
}

FileParser.parse_SDF_HILITE = function (e) {
  var t = [
    'foldertype',
    'int32',
    'spare',
    'int32',
    'path',
    'u16stringle:' + (e.length - 8) / 2
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.parse_SDF_TEXTLINK = function (e) {
  var t = [
    'index',
    'uint16',
    'type',
    'uint16',
    'path',
    'u16stringle:' + (e.length - 4) / 2
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.parse_SDF_COMMENT = function (e) {
  var t = [
    'ObjectID',
    'int32',
    'UserID',
    'uint32',
    'timestamp',
    'float64',
    'comment',
    'u16stringle:' + (e.length - 16) / 2
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.parse_SDF_TEXTDATA = function (e) {
  var t = [
    'index',
    'uint16',
    'dataField',
    'u16stringle:' + (e.length - 2) / 2
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.parse_SDF_D3SETTINGS = function (e) {
  var t = [
    'settings',
    'u16stringle:' + e.length / 2
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.CleanlfFaceName = function (e) {
  var t,
    a = e.lfFaceName.length,
    r = '';
  for (t = 0; t < a && Number(e.lfFaceName.charCodeAt(t)) > 0; t++) r += e.lfFaceName[t];
  e.lfFaceName = r
}

FileParser.parse_SDF_DIMFONT = function (e, t) {
  return FileParser.ReadUnicode ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_LOGFONT_Struct) : new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_LOGFONT_Struct_PRE_V1)
}

FileParser.parse_SDF_FONTNAME12 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_FONTNAME12_Struct);
  return FileParser.CleanlfFaceName(t),
    t
}

FileParser.parse_SDF_FONTNAME = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_FONTNAME_Struct);
  return FileParser.CleanlfFaceName(t),
    t
}

FileParser.parse_SDF_FONTNAME15 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_FONTNAME15_Struct);
  return FileParser.CleanlfFaceName(t),
    t
}

FileParser.parse_SDF_DRAW12_356 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW12_Struct356);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW12_420 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW12_Struct420);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW12_440 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW12_Struct440);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW12_364 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW12_Struct364);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW12_360 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW12_Struct_847);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW12_352 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW12_Struct_842);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW12_348 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW12_Struct_841);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW12_344 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW12_Struct_836);
  return FileParser.CleanlfFaceName(t.lf),
    t
}
FileParser.parse_SDF_DRAW12_340 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW12_Struct_835);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW12_336 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW12_Struct_835);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW8_272 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW8_Struct);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW8_264 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW8_Struct_825);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW8_228 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW8_Struct_810);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW8_224 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW8_Struct_224);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW8_216 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW8_Struct_800);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW_252 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW_Struct_252);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW_236 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW_Struct_236);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAW7_52 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW7_Struct_52)
}

FileParser.parse_SDF_DRAW7_48 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW7_Struct_48)
}

FileParser.parse_SDF_DRAWEXTRA_14 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAWEXTRA_Struct_14)
}

FileParser.parse_SDF_DRAWOBJ5_60 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAWOBJ5_Struct_60)
}

FileParser.parse_SDF_DRAW_268 = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_C_DRAW_Struct_268);
  return FileParser.CleanlfFaceName(t.lf),
    t
}

FileParser.parse_SDF_DRAWOBJ8_848 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ8_Struct_848)
}

FileParser.parse_SDF_DRAWOBJ8_312 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ8_Struct_312)
}

FileParser.parse_SDF_DRAWOBJ8_316 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ8_Struct_316)
}

FileParser.parse_SDF_DRAWOBJ8_448 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ8_Struct_448)
}

FileParser.parse_SDF_DRAWOBJ8_847 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ8_Struct)
}

FileParser.parse_SDF_DRAWOBJ8_837 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ8_Struct_837)
}

FileParser.parse_SDF_DRAWOBJ8_830 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ8_Struct_830)
}

FileParser.parse_SDF_DRAWOBJ8_810 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ8_Struct_810)
}

FileParser.parse_SDF_DRAWOBJ8_824 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ8_Struct_824)
}

FileParser.parse_SDF_DRAWOBJ8_814 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ8_Struct_814)
}

FileParser.parse_SDF_DRAWOBJ = function (e, t) {
  return 148 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ_Struct_148) : new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ_Struct)
}

FileParser.parse_SDF_DRAWTEXT = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWTEXT_Struct)
}

FileParser.parse_SDF_DRAWTEXT182 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWTEXT_Struct_182)
}

FileParser.parse_SDF_DRAWTEXT110 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWTEXT_Struct_110)
}

FileParser.parse_SDF_DRAWTEXT106 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWTEXT_Struct_106)
}

FileParser.parse_SDF_DRAWTEXT94 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWTEXT_Struct_94)
}

FileParser.parse_SDF_DRAWTEXT_88 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWTEXT_Struct_810)
}

FileParser.parse_SDF_DRAWTEXT_72 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWTEXT_Struct_300)
}

FileParser.parse_SDF_SDPaint = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(['filltype',
    'uint32',
    'color',
    'uint32'])
}

FileParser.parse_SDF_PolyList_24 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PolyList_Struct_24)
}

FileParser.parse_SDF_PolyList_20 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PolyList_Struct_20)
}

FileParser.parse_SDF_PolyList_8 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PolyList_Struct_8)
}

FileParser.parse_SDF_PolyList_12 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PolyList_Struct_12)
}

FileParser.parse_SDF_PolySeg = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PolySeg_Struct)
}

FileParser.parse_SDF_PolySeg_26 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PolySeg_Struct_26)
}

FileParser.parse_SDF_PolySeg_18 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PolySeg_Struct_18)
}

FileParser.parse_SDF_PolySeg_32 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PolySeg_Struct_847)
}

FileParser.parse_SDF_PolySeg_40 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PolySeg_Struct_40)
}

FileParser.parse_SDF_PolySeg_50 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PolySeg_Struct_50)
}

FileParser.parse_SDF_PolySegExplicitPoints = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_PolySegExplicitPoint_Struct)
}

FileParser.parse_SDF_FreehandLine_Struct = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_FreehandLine_Struct)
}

FileParser.parse_SDF_LinkList = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_LinkList_Struct)
}

FileParser.parse_SDF_LinkList6 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_LinkList6_Struct)
}

FileParser.parse_SDF_ArrayHookText = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_ArrayHookText_Struct)
}

FileParser.parse_SDF_SegLine_208 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_SegLine_Struct_208)
}

FileParser.parse_SDF_SegLine_210 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_SegLine_Struct_210)
}

FileParser.parse_SDF_SegLine = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_SegLine_Struct)
}

FileParser.parse_SDF_SegLine_58 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_SegLine_Struct_58)
}

FileParser.parse_SDF_Array_30 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_ARRAY_Struct_30)
}

FileParser.parse_SDF_Array_34 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_ARRAY_Struct_34)
}

FileParser.parse_SDF_Array = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_ARRAY_Struct)
}

FileParser.parse_SDF_Array_38 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_ARRAY_Struct_38)
}

FileParser.parse_SDF_Array_14 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_ARRAY_Struct_14)
}

FileParser.parse_SDF_ArrayHook_50 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_ARRAYHOOK_Struct_50)
}

FileParser.parse_SDF_ArrayHook_38 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_ARRAYHOOK_Struct_38)
}

FileParser.parse_SDF_ArrayHook_18 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_ARRAYHOOK_Struct_18)
}

FileParser.parse_SDF_ArrayHook_14 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_ARRAYHOOK_Struct_14)
}

FileParser.parse_SDF_ContainerList_100 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_CONTAINERLIST_Struct_100)
}

FileParser.parse_SDF_ContainerList_92 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_CONTAINERLIST_Struct_92)
}

FileParser.parse_SDF_ContainerHook_20 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_CONTAINERHOOK_Struct_20)
}

FileParser.parse_SDF_ContainerHook_28 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_CONTAINERHOOK_Struct_28)
}

FileParser.parse_SDF_OBJDATA = function (e, t) {
  if (32 === t) var a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_OBJDATA_Struct32);
  else a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_OBJDATA_Struct16);
  return a
}

FileParser.parse_SDF_DRAWIMAGE8 = function (e, t) {
  var a;
  return 48 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWIMAGE8_Struct_48) : 50 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWIMAGE8_Struct_50) : 82 === t &&
    (
      a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWIMAGE8_Struct_82)
    ),
    a
}

FileParser.parse_SDF_RULER = function (e, t) {
  if (52 === t) var a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_RULER_Struct_52);
  else if (48 === t) a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_RULER_Struct_48);
  else if (24 === t) a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_RULER_Struct_24);
  else a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_RULER_Struct);
  return a
}

FileParser.parse_SDF_LINEDRAWLIST = function (e, t) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_LineDrawList_Struct_6)
}

FileParser.parse_SDF_BEGIN_THEME12 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_BEGIN_THEME12_Struct)
}

FileParser.parse_SDF_THEME_CAT = function (e) {
  var t = [
    'name',
    'u16stringle:' + e.length / 2
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.parse_SDF_THEME_COLOR = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_THEME_COLOR_Struct)
}

FileParser.parse_SDF_BEGIN_TEXTF = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_BEGIN_TEXTF_Struct)
}

FileParser.parse_SDF_THEME_FONT12 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_THEME_FONT12_Struct)
}

FileParser.parse_SDF_BEGIN_LINE = function (e, t) {
  if (8 === t) var a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_BEGIN_LINE_Struct_8);
  else if (12 === t) a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_BEGIN_LINE_Struct_12);
  else if (14 === t) a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_BEGIN_LINE_Struct_14);
  return a
}

FileParser.parse_SDF_FILLED_LINE = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_FILLED_LINE_Struct)
}

FileParser.parse_SDF_OUTSIDE = function (e) {
  var t = [
    'outsidetype',
    'int32',
    'extent',
    function (e) {
      return e.readStruct(FileParser.SDF_DRECT_Struct)
    },
    'color',
    'uint32',
    'lparam',
    'uint32',
    'wparam',
    'uint32'
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.parse_SDF_INSIDEEFFECT = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(
    ['effect',
      'int32',
      'effectcolor',
      'uint32',
      'lparam',
      'uint32',
      'wparam',
      'uint32']
  )
}

FileParser.parse_SDF_THEMEGRADIENT = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_THEMEGRADIENT_Struct)
}

FileParser.parse_SDF_GRADIENT = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(['gradientflags',
    'uint32',
    'ecolor',
    'uint32'])
}

FileParser.parse_SDF_RICHGRADIENT = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(['gradienttype',
    'uint32',
    'angle',
    'uint32',
    'nstops',
    'uint32'])
}

FileParser.parse_SDF_RICHGRADIENTSTOP = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(['color',
    'uint32',
    'stop',
    'uint32'])
}

FileParser.parse_SDF_EFFECT = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(
    ['effecttype',
      'int32',
      'effectcolor',
      'uint32',
      'wparam',
      'uint32',
      'lparam',
      'uint32']
  )
}

FileParser.parse_SDF_TEXTURE = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_Texture_Struct)
}

FileParser.parse_SDF_HATCH = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_Hatch_Struct)
}

FileParser.parse_SDF_BEGIN_STYLE = function (e) {
  var t = [
    'stylename',
    'u16stringle:' + e.length / 2
  ];
  return e.length ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t) : {
    stylename: ''
  }
}

FileParser.parse_SDF_EXPANDEDVIEW = function (e) {
  var t = [
    'svg',
    'u16stringle:' + e.length / 2
  ];
  return e.length ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t) : {
    svg: ''
  }
}

FileParser.parse_SDF_DRAWARROW = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWARROW_Struct)
}

FileParser.parse_SDF_DRAWHOOK = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWHOOK_Struct)
}

FileParser.parse_SDF_DRAWHOOK_10 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWHOOK_Struct_10)
}

FileParser.parse_SDF_DRAWHOOK_Visio = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWHOOK_Visio_Struct)
}

FileParser.parse_SDF_GANTTINFO = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_GANTTINFO_Struct)
}

FileParser.parse_SDF_DRAWBORDER = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWBORDER_Struct)
}

FileParser.parse_SDF_DRAWLINE = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWLINE_Struct)
}

FileParser.parse_SDF_DRAWFILL = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWFILL_Struct)
}

FileParser.parse_SDF_DRAWFILL_6 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWFILL_Struct_6)
}

FileParser.parse_SDF_DRAWOBJ7 = function (e, t) {
  return 20 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ7_Struct_20) : new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ7_Struct_48)
}

FileParser.parse_SDF_DRAWOBJ6 = function (e, t) {
  return 20 === t ? new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ6_Struct_20) : new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_DRAWOBJ6_Struct)
}

FileParser.parse_SDF_CONNECTPOINT = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_CONNECTPOINT_Struct)
}

FileParser.parse_SDF_LONGTEXT8_8 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_LONGTEXT8_Struct_8)
}

FileParser.parse_SDF_LONGTEXT8 = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_LONGTEXT8_Struct)
}

FileParser.parse_SDF_TEXT = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TEXT_Struct)
}

FileParser.parse_SDF_LONGTEXT = function (e) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_LONGTEXT_Struct)
}

FileParser.parse_SDF_TEXTCHAR = function (e) {
  var t = [
    'text',
    'u16stringle:' + e.length / 2
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.parse_SDF_TEXTCHAR_8 = function (e) {
  var t = [
    'text',
    'string:' + e.length
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.parse_SDF_TEXTRUNS = function (e) {
  var t = [
    'nruns',
    'uint16',
    'runs',
    function (e, t) {
      var a,
        r,
        i = [
          'ncodes',
          'uint16',
          'offset',
          'uint32',
          'op',
          function (e, t) {
            var a,
              r,
              i,
              n = [];
            for (a = 0; a < t.ncodes; a++) i = (r = e.readStruct(FileParser.SDF_TEXTCODE_Struct_Code)).code === FileParser.TextStyleCodes.SDF_T_SIZE_FLOAT ? e.readStruct(FileParser.SDF_TEXTCODE_Struct_Value_Float) : e.readStruct(FileParser.SDF_TEXTCODE_Struct_Value),
              r.value = i.value,
              n.push(r);
            return n
          }
        ],
        n = [];
      for (a = 0; a < t.nruns; a++) r = e.readStruct(i),
        n.push(r);
      return n
    }
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.parse_SDF_TEXTSTYLE = function (e) {
  var t = [
    'index',
    'uint16',
    'ncodes',
    'uint16',
    'codes',
    function (e, t) {
      var a,
        r,
        i = [];
      for (a = 0; a < t.ncodes; a++) r = e.readStruct(FileParser.SDF_STYLECODE_Struct),
        i.push(r);
      return i
    }
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.parse_SDF_GRAPH = function (e, t) {
  var a;
  return 52 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_GRAPH_Struct) : alert('bad graph size'),
    a
}

FileParser.parse_SDF_GRAPH_AXIS = function (e, t) {
  var a;
  return 106 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_GRAPH_AXIS_Struct) : alert('bad graph axis size'),
    a
}

FileParser.parse_SDF_GRAPH_POINT = function (e, t) {
  var a;
  return 64 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_GRAPH_POINT_Struct) : alert('bad graph point size'),
    a
}

FileParser.parse_SDF_GRAPH_TITLE = function (e, t) {
  var a;
  return 28 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_GRAPH_AXIS_TITLE_Struct) : alert('bad graph title size'),
    a
}

FileParser.parse_SDF_GRAPH_AXIS_LABEL = function (e, t) {
  var a;
  return 24 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_GRAPH_AXIS_LABEL_Struct) : alert('bad graph label size'),
    a
}

FileParser.parse_SDF_GRAPH_LEGEND_ENTRY = function (e, t) {
  var a;
  return 26 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_GRAPH_LEGEND_ENTRY_Struct) : alert('bad graph legend entry size'),
    a
}

FileParser.parse_SDF_TABLE = function (e, t) {
  var a;
  return 64 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_Struct_64) : 32 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_Struct_32) : 28 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_Struct_28) : 24 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_Struct_24) : alert('bad table size'),
    a
}

FileParser.parse_SDF_TABLE_Short = function (e, t) {
  var a;
  return 28 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_Struct_Short) : 24 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_Struct_Short_24) : 20 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_Struct_Short_20) : alert('bad short table size'),
    a
}

FileParser.parse_SDF_TABLE_CELL = function (e, t) {
  var a;
  return 176 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_CELL_Struct_176) : 108 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_CELL_Struct_108) : 104 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_CELL_Struct) : 96 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_CELL_Struct_96) : 92 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_CELL_Struct_92) : alert('bad table cell size'),
    a
}

FileParser.parse_SDF_TABLE_CELL7 = function (e, t) {
  var a;
  return 124 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_CELL7_Struct) : 76 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_CELL7_Struct_76) : alert('bad table cell7 size'),
    a
}

FileParser.parse_SDF_TABLE_CELLEXTRA = function (e, t) {
  var a;
  return 24 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_CELLEXTRA_Struct) : 12 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_CELLEXTRA_Struct_12) : alert('bad table cell extra size'),
    a
}

FileParser.parse_SDF_TABLE_CELLPROP = function (e, t) {
  var a;
  return 32 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_CELLPROP_Struct) : alert('bad table cell prop size'),
    a
}

FileParser.parse_SDF_TABLE_CELLEXTRAOLD = function (e, t) {
  var a;
  return 44 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_CELLEXTRAOLD_Struct) : alert('bad table cell extra old size'),
    a
}

FileParser.parse_SDF_TABLE_ROW = function (e, t) {
  var a;
  return 40 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_ROW_Struct_40) : 32 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_ROW_Struct_32) : alert('bad table row size'),
    a
}

FileParser.parse_SDF_TABLE_ROW_Short = function (e, t) {
  var a;
  return 28 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_ROW_Struct_Short) : 12 === t ? a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TABLE_ROW_Struct_Short_12) : alert('bad table row short size'),
    a
}

FileParser.PatchArrayBufferSlice = function () {
  ArrayBuffer.prototype.slice ||
    (
      ArrayBuffer.prototype.slice = function (e, t) {
        var a = new Uint8Array(this);
        void 0 === t &&
          (t = a.length);
        for (
          var r = new ArrayBuffer(t - e),
          i = new Uint8Array(r),
          n = 0;
          n < i.length;
          n++
        ) i[n] = a[n + e];
        return r
      }
    )
}



FileParser.parse_image = function (e, t) {
  FileParser.PatchArrayBufferSlice();
  var a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN),
    r = a.buffer;
  r = r.slice(a.byteOffset),
    a = {};
  var i = new Uint8Array(r),
    n = new Blob([r], {
      type: t
    }),
    o = window.URL ||
      window.webkitURL,
    s = '';
  return o &&
    o.createObjectURL &&
    'image/wmf' !== t &&
    'image/store' !== t &&
    (s = o.createObjectURL(n)),
  {
    URL: s,
    Blob: n,
    BlobBytes: i
  }
}

FileParser.parse_SDF_C_IMAGEBLOCK = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN),
    a = t.buffer,
    r = t.readStruct(FileParser.LONGVALUE2_Struct);
  FileParser.PatchArrayBufferSlice();
  var i = a.slice(t.byteOffset + 8),
    n = new Uint8Array(i);
  return (t = {}).data = i,
    t.bytes = n,
    t.imageid = r.value,
    t.imagedir = r.type,
    t
}

FileParser.parse_SDF_C_SDDATA = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN),
    a = t.buffer,
    r = t.readStruct(FileParser.LONGVALUE2_Struct);
  FileParser.PatchArrayBufferSlice();
  var i = a.slice(t.byteOffset),
    n = new Uint16Array(i);
  return (t = {}).data = i,
    t.bytes = n,
    t.imageid = r.value,
    t.imagedir = r.type,
    t
}

FileParser.parse_nativebuffer = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN),
    a = t.buffer;
  FileParser.PatchArrayBufferSlice();
  var r = a.slice(t.byteOffset + 4),
    i = new Uint8Array(r);
  return (t = {}).data = r,
    t.bytes = i,
    t
}

FileParser.parse_SDF_C_NATIVEBLOCK = function (e) {
  var t = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN),
    a = t.buffer,
    r = t.readStruct(FileParser.LONGVALUE_Struct);
  FileParser.PatchArrayBufferSlice();
  var i = a.slice(t.byteOffset + 4),
    n = new Uint8Array(i);
  return (t = {}).data = i,
    t.bytes = n,
    t.nativeid = r.value,
    t
}

FileParser.write_nativebuffer = function (e, t) {
  var a = new T3DataStream(t, null, T3DataStream.LITTLE_ENDIAN).buffer,
    r = new Uint8Array(a),
    i = r.length;
  e.writeUint32(i + 4),
    e.writeUint8Array(r)
}

FileParser.write_nativesdfbuffer = function (e, t) {
  var a = t.length;
  e.writeUint32(a + 4),
    e.writeUint8Array(t)
}

FileParser.write_nativebytearray = function (e, t) {
  t.length;
  e.writeUint8Array(t)
}

FileParser.parse_SDF_C_LAYERFLAGS_4 = function (e, t) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(['flags',
    'uint32'])
}

FileParser.parse_SDF_C_LAYERFLAGS_2 = function (e, t) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(['flags',
    'uint16'])
}

FileParser.parse_SDF_C_LAYERNAME = function (e, t) {
  var a = [
    'name',
    'u16stringle:' + (e.length / 2 - 1),
    'zeropadding',
    'u16stringle:1'
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(a)
}

FileParser.parse_SDF_C_LAYERTYPE = function (e, t) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(['type',
    'uint32'])
}

FileParser.parse_SDF_C_NATIVEID = function (e, t) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(['nativeid',
    'uint32'])
}

FileParser.parse_SDF_C_TOOLPALETTES_COLLAPSED = function (e, t) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(['collapsed',
    'uint32'])
}

FileParser.parse_SDF_C_IMAGEID = function (e, t) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(['blobbytesid',
    'uint32',
    'imagedir',
    'uint32'])
}

FileParser.parse_SDF_C_LAYERLIST = function (e, t) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_LayerList_Struct)
}

FileParser.parse_SDF_C_OLEHEADER = function (e, t) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_OLEHEADER_Struct)
}

FileParser.SDF_TEXTURE_Struct = [
  'dim',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LPOINT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LPOINT_Struct, t)
    }
  },
  'mr',
  {
    get: function (e) {
      return e.readStruct(FileParser.SDF_LRECT_Struct)
    },
    set: function (e, t) {
      e.writeStruct(FileParser.SDF_LRECT_Struct, t)
    }
  },
  'imagetype',
  'int32',
  'flags',
  'int32'
]

FileParser.parse_SDF_O_TEXTURE = function (e, t) {
  var a = new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(FileParser.SDF_TEXTURE_Struct);
  switch (a.imagetype) {
    case ConstantData2.ImageDir.dir_meta:
      FileParser.TextureFormat = 'image/meta';
      break;
    case ConstantData2.ImageDir.dir_jpg:
      FileParser.TextureFormat = 'image/jpeg';
      break;
    case ConstantData2.ImageDir.dir_png:
      FileParser.TextureFormat = 'image/png'
  }
  return a
}

FileParser.parse_SDF_O_TEXTUREEXT = function (e, t) {
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(
    ['categoryindex',
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
      'int32']
  )
}

FileParser.parse_unknown = function (e) {
  var t = [
    'data',
    'string:' + e.length
  ];
  return new T3DataStream(e, null, T3DataStream.LITTLE_ENDIAN).readStruct(t)
}

FileParser.ReadUnicode = !0
FileParser.TextureFormat = ''























































FileParser.SDR_Parser_Struct = ["start", function (e) {
  var t = e.readString(8);
  return t = t == FileParser.Signature ? t : null,
    FileParser.ReadUnicode = !0,
    t
}
  , "codes", ["[]", ["code", "uint16", "codeName", function (e, t) {
    return FileParser.SDROpCodesByCode[t.code] || "Unknown"
  }
    , "length", function (e, t) {
      return 16384 & t.code ? 0 : e.readUint32()
    }
    , "data", {
      get: function (e, t) {
        if (16384 & t.code)
          return 0;
        var a = {};
        switch (t.code) {
          case ConstantData2.SDROpCodesByName.SDF_C_VERSION:
            return a = FileParser.parse_SDF_VERSION(e.mapUint8Array(t.length)),
              t.length < 18 ? (a.Unicode = 0,
                FileParser.ReadUnicode = !1) : FileParser.ReadUnicode = a.Unicode,
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_HEADER:
            return 28 === t.length ? a = FileParser.parse_SDF_HEADER(e.mapUint8Array(t.length)) : 26 === t.length ? a = FileParser.parse_SDF_HEADER_810(e.mapUint8Array(t.length)) : 22 === t.length ? a = FileParser.parse_SDF_HEADER_22(e.mapUint8Array(t.length)) : 14 === t.length && (a = FileParser.parse_SDF_HEADER_14(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_HEAD_UIINFO:
            return a = FileParser.parse_SDF_UIInfo(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_PAGE:
            return 30 === t.length ? a = FileParser.parse_SDF_PAGE_30(e.mapUint8Array(t.length)) : 34 === t.length ? a = FileParser.parse_SDF_PAGE_34(e.mapUint8Array(t.length)) : 62 === t.length ? a = FileParser.parse_SDF_PAGE_62(e.mapUint8Array(t.length)) : 126 === t.length && (a = FileParser.parse_SDF_PAGE_126(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_LIBLIST:
            return a = FileParser.parse_SDF_LibList(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_O_TEXTUREEXTRA:
            return a = FileParser.parse_SDF_TextureExtra(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_FONTNAME12:
            return a = FileParser.parse_SDF_FONTNAME12(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_FONTNAME:
            return a = FileParser.parse_SDF_FONTNAME(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_FONTNAME15:
            return a = FileParser.parse_SDF_FONTNAME15(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DIMFONT:
            return a = FileParser.parse_SDF_DIMFONT(e.mapUint8Array(t.length, FileParser.ReadUnicode));
          case ConstantData2.SDROpCodesByName.SDF_C_BEGIN_THEME12:
            return a = FileParser.parse_SDF_BEGIN_THEME12(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_THEME_CAT:
            return a = FileParser.parse_SDF_THEME_CAT(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_THEME_COLOR:
            return a = FileParser.parse_SDF_THEME_COLOR(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_THEME_FONT12:
            return a = FileParser.parse_SDF_THEME_FONT12(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_BEGIN_TEXTF:
            return a = FileParser.parse_SDF_BEGIN_TEXTF(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DRAW12:
            switch (t.length) {
              case 440:
                a = FileParser.parse_SDF_DRAW12_440(e.mapUint8Array(t.length));
                break;
              case 420:
                a = FileParser.parse_SDF_DRAW12_420(e.mapUint8Array(t.length));
                break;
              case 364:
                a = FileParser.parse_SDF_DRAW12_364(e.mapUint8Array(t.length));
                break;
              case 360:
                a = FileParser.parse_SDF_DRAW12_360(e.mapUint8Array(t.length));
                break;
              case 356:
                a = FileParser.parse_SDF_DRAW12_356(e.mapUint8Array(t.length));
                break;
              case 352:
                a = FileParser.parse_SDF_DRAW12_352(e.mapUint8Array(t.length));
                break;
              case 348:
                a = FileParser.parse_SDF_DRAW12_348(e.mapUint8Array(t.length));
                break;
              case 344:
                a = FileParser.parse_SDF_DRAW12_344(e.mapUint8Array(t.length));
                break;
              case 340:
                a = FileParser.parse_SDF_DRAW12_340(e.mapUint8Array(t.length));
                break;
              case 336:
                a = FileParser.parse_SDF_DRAW12_336(e.mapUint8Array(t.length))
            }
            return a;
          case ConstantData2.SDROpCodesByName.SDF_C_DRAW8:
            return 272 === t.length ? a = FileParser.parse_SDF_DRAW8_272(e.mapUint8Array(t.length)) : 264 === t.length ? a = FileParser.parse_SDF_DRAW8_264(e.mapUint8Array(t.length)) : 228 === t.length ? a = FileParser.parse_SDF_DRAW8_228(e.mapUint8Array(t.length)) : 224 === t.length ? a = FileParser.parse_SDF_DRAW8_224(e.mapUint8Array(t.length)) : 216 === t.length && (a = FileParser.parse_SDF_DRAW8_216(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_DRAW:
            return 236 === t.length ? a = FileParser.parse_SDF_DRAW_236(e.mapUint8Array(t.length)) : 252 === t.length ? a = FileParser.parse_SDF_DRAW_252(e.mapUint8Array(t.length)) : 268 === t.length && (a = FileParser.parse_SDF_DRAW_268(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_DRAW7:
            return 48 === t.length ? a = FileParser.parse_SDF_DRAW7_48(e.mapUint8Array(t.length)) : 52 === t.length && (a = FileParser.parse_SDF_DRAW7_52(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWEXTRA:
            return 14 === t.length && (a = FileParser.parse_SDF_DRAWEXTRA_14(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWOBJ5:
            return 60 === t.length && (a = FileParser.parse_SDF_DRAWOBJ5_60(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWOBJ8:
            return 448 === t.length ? a = FileParser.parse_SDF_DRAWOBJ8_448(e.mapUint8Array(t.length)) : 316 === t.length ? a = FileParser.parse_SDF_DRAWOBJ8_316(e.mapUint8Array(t.length)) : 312 === t.length ? a = FileParser.parse_SDF_DRAWOBJ8_312(e.mapUint8Array(t.length)) : 308 === t.length ? a = FileParser.parse_SDF_DRAWOBJ8_848(e.mapUint8Array(t.length)) : 304 === t.length ? a = FileParser.parse_SDF_DRAWOBJ8_847(e.mapUint8Array(t.length)) : 300 === t.length ? a = FileParser.parse_SDF_DRAWOBJ8_837(e.mapUint8Array(t.length)) : 296 === t.length ? a = FileParser.parse_SDF_DRAWOBJ8_830(e.mapUint8Array(t.length)) : 288 === t.length ? a = FileParser.parse_SDF_DRAWOBJ8_824(e.mapUint8Array(t.length)) : 280 === t.length ? a = FileParser.parse_SDF_DRAWOBJ8_814(e.mapUint8Array(t.length)) : 252 === t.length && (a = FileParser.parse_SDF_DRAWOBJ8_810(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWOBJ:
            return a = FileParser.parse_SDF_DRAWOBJ(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_TABLEVP:
            return a = FileParser.parse_SDF_TABLE(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_TABLE:
            return a = FileParser.parse_SDF_TABLE_Short(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_TABLECELL8:
            return a = FileParser.parse_SDF_TABLE_CELL(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_TABLECELL:
            return a = FileParser.parse_SDF_TABLE_CELL7(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_TABLECELLEXTRAOLD:
            return a = FileParser.parse_SDF_TABLE_CELLEXTRAOLD(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_TABLECELLEXTRA:
            return a = FileParser.parse_SDF_TABLE_CELLEXTRA(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_TABLECELLPROP:
            return a = FileParser.parse_SDF_TABLE_CELLPROP(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_TABLEROWVP:
            return a = FileParser.parse_SDF_TABLE_ROW(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_TABLEROW:
            return a = FileParser.parse_SDF_TABLE_ROW_Short(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_GRAPH:
            return a = FileParser.parse_SDF_GRAPH(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_GRAPH_AXIS:
            return a = FileParser.parse_SDF_GRAPH_AXIS(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_GRAPH_POINT:
            return a = FileParser.parse_SDF_GRAPH_POINT(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_GRAPH_TITLE:
            return a = FileParser.parse_SDF_GRAPH_TITLE(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_GRAPH_LABEL:
            return a = FileParser.parse_SDF_GRAPH_AXIS_LABEL(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_GRAPH_LEGEND:
            return a = FileParser.parse_SDF_GRAPH_LEGEND_ENTRY(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWTEXT:
            return 182 === t.length ? a = FileParser.parse_SDF_DRAWTEXT182(e.mapUint8Array(t.length)) : 110 === t.length ? a = FileParser.parse_SDF_DRAWTEXT110(e.mapUint8Array(t.length)) : 106 === t.length ? a = FileParser.parse_SDF_DRAWTEXT106(e.mapUint8Array(t.length)) : 94 === t.length ? a = FileParser.parse_SDF_DRAWTEXT94(e.mapUint8Array(t.length)) : 90 === t.length ? a = FileParser.parse_SDF_DRAWTEXT(e.mapUint8Array(t.length)) : 88 === t.length ? a = FileParser.parse_SDF_DRAWTEXT_88(e.mapUint8Array(t.length)) : 72 === t.length && (a = FileParser.parse_SDF_DRAWTEXT_72(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_BEGIN_PAINT:
            return a = FileParser.parse_SDF_SDPaint(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWPOLY:
            return 8 === t.length ? a = FileParser.parse_SDF_PolyList_8(e.mapUint8Array(t.length)) : 12 === t.length ? a = FileParser.parse_SDF_PolyList_12(e.mapUint8Array(t.length)) : 20 === t.length ? a = FileParser.parse_SDF_PolyList_20(e.mapUint8Array(t.length)) : 24 === t.length && (a = FileParser.parse_SDF_PolyList_24(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWPOLYSEG:
            return 18 === t.length && (a = FileParser.parse_SDF_PolySeg_18(e.mapUint8Array(t.length))),
              28 === t.length ? a = FileParser.parse_SDF_PolySeg(e.mapUint8Array(t.length)) : 26 === t.length ? a = FileParser.parse_SDF_PolySeg_26(e.mapUint8Array(t.length)) : 32 === t.length ? a = FileParser.parse_SDF_PolySeg_32(e.mapUint8Array(t.length)) : 40 === t.length ? a = FileParser.parse_SDF_PolySeg_40(e.mapUint8Array(t.length)) : 50 === t.length && (a = FileParser.parse_SDF_PolySeg_50(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_POLYSEGEXPLICITPOINTS:
            return a = FileParser.parse_SDF_PolySegExplicitPoints(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWLINK:
            return a = FileParser.parse_SDF_LinkList(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWLINK6:
            return a = FileParser.parse_SDF_LinkList6(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWARRAYTEXT:
            return a = FileParser.parse_SDF_ArrayHookText(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_OBJDATA:
            return a = FileParser.parse_SDF_OBJDATA(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_O_RULER:
            return a = FileParser.parse_SDF_RULER(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_LINEDRAWLIST:
            return a = FileParser.parse_SDF_LINEDRAWLIST(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_BEGIN_LINE:
          case ConstantData2.SDROpCodesByName.SDF_C_BEGIN_HLINE:
          case ConstantData2.SDROpCodesByName.SDF_C_BEGIN_VLINE:
            return a = FileParser.parse_SDF_BEGIN_LINE(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_FILLEDLINE:
            return a = FileParser.parse_SDF_FILLED_LINE(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_OUTSIDE:
            return a = FileParser.parse_SDF_OUTSIDE(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_INSIDEEFFECT:
            return a = FileParser.parse_SDF_INSIDEEFFECT(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_EFFECT:
            return a = FileParser.parse_SDF_EFFECT(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_TEXTURE:
            return a = FileParser.parse_SDF_TEXTURE(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_HATCH:
            return a = FileParser.parse_SDF_HATCH(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_GRADIENT:
            return a = FileParser.parse_SDF_GRADIENT(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_RICHGRADIENT:
            return a = FileParser.parse_SDF_RICHGRADIENT(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_RICHGRADIENTSTOP:
            return a = FileParser.parse_SDF_RICHGRADIENTSTOP(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_THEMEGRADIENT:
            return a = FileParser.parse_SDF_THEMEGRADIENT(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_BEGIN_STYLE:
            return a = FileParser.parse_SDF_BEGIN_STYLE(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWARROW:
            return a = FileParser.parse_SDF_DRAWARROW(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWHOOK:
            return a = 22 === t.length ? FileParser.parse_SDF_DRAWHOOK_Visio(e.mapUint8Array(t.length)) : 10 === t.length ? FileParser.parse_SDF_DRAWHOOK_10(e.mapUint8Array(t.length)) : FileParser.parse_SDF_DRAWHOOK(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWBORDER:
            return a = FileParser.parse_SDF_DRAWBORDER(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_GANTTINFO:
            return a = FileParser.parse_SDF_GANTTINFO(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWLINE:
            return a = FileParser.parse_SDF_DRAWLINE(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWFILL:
            return a = 6 === t.length ? FileParser.parse_SDF_DRAWFILL_6(e.mapUint8Array(t.length)) : FileParser.parse_SDF_DRAWFILL(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWOBJ7:
            return a = FileParser.parse_SDF_DRAWOBJ7(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWOBJ6:
            return a = FileParser.parse_SDF_DRAWOBJ6(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_CONNECTPOINT:
            return a = FileParser.parse_SDF_CONNECTPOINT(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_LONGTEXT8:
            return a = 8 === t.length ? FileParser.parse_SDF_LONGTEXT8_8(e.mapUint8Array(t.length)) : FileParser.parse_SDF_LONGTEXT8(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_TEXT:
            return a = FileParser.parse_SDF_TEXT(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_LONGTEXT:
            return a = FileParser.parse_SDF_LONGTEXT(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_TEXTCHAR:
            return t.length && (a = FileParser.ReadUnicode ? FileParser.parse_SDF_TEXTCHAR(e.mapUint8Array(t.length)) : FileParser.parse_SDF_TEXTCHAR_8(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_TEXTRUN:
            return a = FileParser.parse_SDF_TEXTRUNS(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_TEXTSTYLE:
            return a = FileParser.parse_SDF_TEXTSTYLE(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_TEXTLINK:
            return a = FileParser.parse_SDF_TEXTLINK(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_TEXTDATA:
            return a = FileParser.parse_SDF_TEXTDATA(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_D3SETTINGS:
            return a = FileParser.parse_SDF_D3SETTINGS(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWSEGL:
            return 58 === t.length ? a = FileParser.parse_SDF_SegLine_58(e.mapUint8Array(t.length)) : 158 === t.length ? a = FileParser.parse_SDF_SegLine(e.mapUint8Array(t.length)) : 208 === t.length ? a = FileParser.parse_SDF_SegLine_208(e.mapUint8Array(t.length)) : 210 === t.length && (a = FileParser.parse_SDF_SegLine_210(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWARRAY:
            return 34 === t.length ? a = FileParser.parse_SDF_Array_34(e.mapUint8Array(t.length)) : 30 === t.length ? a = FileParser.parse_SDF_Array_30(e.mapUint8Array(t.length)) : 42 === t.length ? a = FileParser.parse_SDF_Array(e.mapUint8Array(t.length)) : 38 === t.length ? a = FileParser.parse_SDF_Array_38(e.mapUint8Array(t.length)) : 14 === t.length && (a = FileParser.parse_SDF_Array_14(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWARRAYHOOK:
            return 14 == t.length ? a = FileParser.parse_SDF_ArrayHook_14(e.mapUint8Array(t.length)) : 18 == t.length ? a = FileParser.parse_SDF_ArrayHook_18(e.mapUint8Array(t.length)) : 38 == t.length ? a = FileParser.parse_SDF_ArrayHook_38(e.mapUint8Array(t.length)) : 50 == t.length && (a = FileParser.parse_SDF_ArrayHook_50(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWCONTAINER:
            return 92 == t.length ? a = FileParser.parse_SDF_ContainerList_92(e.mapUint8Array(t.length)) : 100 == t.length && (a = FileParser.parse_SDF_ContainerList_100(e.mapUint8Array(t.length))),
              a;
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWCONTAINERHOOK:
            return a = 20 == t.length ? FileParser.parse_SDF_ContainerHook_20(e.mapUint8Array(t.length)) : FileParser.parse_SDF_ContainerHook_28(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_PRINTERST:
          case ConstantData2.SDROpCodesByName.SDF_C_LIBLIST_PATH:
          case ConstantData2.SDROpCodesByName.SDF_C_LIBLIST_GUID:
          case ConstantData2.SDROpCodesByName.SDF_C_PARENTPAGEID:
          case ConstantData2.SDROpCodesByName.SDF_C_ORIGTEMPLATE:
          case ConstantData2.SDROpCodesByName.SDF_C_GUIDE:
          case ConstantData2.SDROpCodesByName.SDF_C_EXPORTPATH:
          case ConstantData2.SDROpCodesByName.SDF_C_DEFAULTLIBS:
          case ConstantData2.SDROpCodesByName.SDF_C_PRESENTATION_BACKGROUND:
          case ConstantData2.SDROpCodesByName.SDF_C_PRESENTATION_NAME:
          case ConstantData2.SDROpCodesByName.SDF_C_IMPORT_SOURCE_PATH:
          case ConstantData2.SDROpCodesByName.SDF_C_TASKPANEL:
          case ConstantData2.SDROpCodesByName.SDF_C_ORGCHARTTABLE:
          case ConstantData2.SDROpCodesByName.SDF_C_KANBAN_PC_TITLE:
          case ConstantData2.SDROpCodesByName.SDF_C_KANBAN_ASSIGN_TITLE:
          case ConstantData2.SDROpCodesByName.SDF_C_THEME_TEXTURE:
          case ConstantData2.SDROpCodesByName.SDF_C_KANBAN_ASSIGN_TITLE:
          case ConstantData2.SDROpCodesByName.SDF_C_DEFAULTLIBS:
          case ConstantData2.SDROpCodesByName.SDF_C_CELL_STYLENAME:
          case ConstantData2.SDROpCodesByName.SDF_O_TEXTURENAME:
          case ConstantData2.SDROpCodesByName.SDF_O_TEXTURECATNAME:
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWJUMP:
          case ConstantData2.SDROpCodesByName.SDF_C_IMAGEURL:
          case ConstantData2.SDROpCodesByName.SDF_C_BUSINESSMODULE:
          case ConstantData2.SDROpCodesByName.SDF_C_SYMBOLSEARCHSTRING:
          case ConstantData2.SDROpCodesByName.SDF_C_SEARCHLIB:
          case ConstantData2.SDROpCodesByName.SDF_C_SEARCHLIB_NAME:
          case ConstantData2.SDROpCodesByName.SDF_C_SEARCHLIBSYMBOL_ID:
          case ConstantData2.SDROpCodesByName.SDF_C_SEARCHLIBSYMBOL_NAME:
          case ConstantData2.SDROpCodesByName.SDF_C_CURRENTSYMBOL_ID:
          case ConstantData2.SDROpCodesByName.SDF_C_LIBLIST_SEARCH_RESULT_ID:
          case ConstantData2.SDROpCodesByName.SDF_C_RECENTSYMBOL_ID:
          case ConstantData2.SDROpCodesByName.SDF_C_RECENTSYMBOL_NAME:
          case ConstantData2.SDROpCodesByName.SDF_C_RECENTSYMBOL_NOMENU:
          case ConstantData2.SDROpCodesByName.SDF_C_TOOLPALETTES_NAME:
          case ConstantData2.SDROpCodesByName.SDF_C_BUSINESSNAME_STR:
            return a = FileParser.ReadUnicode ? FileParser.parse_SDF_ORIGTEMPLATE(e.mapUint8Array(t.length)) : FileParser.parse_SDF_ORIGTEMPLATE8(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_EMFHASH:
            return a = FileParser.parse_SDF_ORIGTEMPLATE8(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_SVGFRAGMENTID:
          case ConstantData2.SDROpCodesByName.SDF_C_SVGIMAGEID:
            return a = FileParser.parse_SDF_ORIGTEMPLATE(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_LEFTPANELINFO:
          case ConstantData2.SDROpCodesByName.SDF_C_LIBLIST_ENTRY:
          case ConstantData2.SDROpCodesByName.SDF_C_LIB_COLLAPSED:
          case ConstantData2.SDROpCodesByName.SDF_C_SEARCHLIB_COLLAPSED:
          case ConstantData2.SDROpCodesByName.SDF_C_SEARCHLIB_HIDDEN:
          case ConstantData2.SDROpCodesByName.SDF_C_HILITELIST:
            return a = FileParser.parse_SDF_LONGVALUE(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_HILITE:
            return a = FileParser.parse_SDF_HILITE(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_CTHUMBNAIL:
            return a = FileParser.parse_image(e.mapUint8Array(t.length), "image/png");
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWIMAGE8:
            return a = FileParser.parse_SDF_DRAWIMAGE8(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWMETA:
            return a = FileParser.parse_image(e.mapUint8Array(t.length), "image/wmf");
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWPNG:
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWPREVIEWPNG:
            return a = FileParser.parse_image(e.mapUint8Array(t.length), "image/png");
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWJPG:
            return a = FileParser.parse_image(e.mapUint8Array(t.length), "image/jpeg");
          case ConstantData2.SDROpCodesByName.SDF_C_DRAWSVG:
            return a = FileParser.parse_image(e.mapUint8Array(t.length), "image/svg+xml");
          case ConstantData2.SDROpCodesByName.SDF_C_OLEHEADER:
            return a = FileParser.parse_SDF_C_OLEHEADER(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_OLESTORAGE:
            return a = FileParser.parse_image(e.mapUint8Array(t.length), "image/store");
          case ConstantData2.SDROpCodesByName.SDF_C_NATIVESTORAGE:
            return a = FileParser.parse_nativebuffer(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_SDDATA64:
          case ConstantData2.SDROpCodesByName.SDF_C_SDDATA64C:
            return a = FileParser.parse_SDF_C_SDDATA(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_LAYERFLAGS:
            return a = 2 == t.length ? FileParser.parse_SDF_C_LAYERFLAGS_2(e.mapUint8Array(t.length), t.length) : FileParser.parse_SDF_C_LAYERFLAGS_4(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_LAYERNAME:
            return a = FileParser.ReadUnicode ? FileParser.parse_SDF_ORIGTEMPLATE(e.mapUint8Array(t.length)) : FileParser.parse_SDF_ORIGTEMPLATE8(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_LAYERTYPE:
            return a = FileParser.parse_SDF_C_LAYERTYPE(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_LAYERLIST:
            return a = FileParser.parse_SDF_C_LAYERLIST(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_NATIVEID:
            return a = FileParser.parse_SDF_C_NATIVEID(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_TOOLPALETTES_COLLAPSED:
            return a = FileParser.parse_SDF_C_TOOLPALETTES_COLLAPSED(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_IMAGEID:
          case ConstantData2.SDROpCodesByName.SDF_C_EMFID:
          case ConstantData2.SDROpCodesByName.SDF_C_OLESTORAGEID:
            return a = FileParser.parse_SDF_C_IMAGEID(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_C_NATIVEBLOCK:
          case ConstantData2.SDROpCodesByName.SDF_C_NATIVEWINBLOCK:
            return a = FileParser.parse_SDF_C_NATIVEBLOCK(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_IMAGEBLOCK:
          case ConstantData2.SDROpCodesByName.SDF_C_EMFBLOCK:
            return a = FileParser.parse_SDF_C_IMAGEBLOCK(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_EXPANDEDVIEWBLOCK:
          case ConstantData2.SDROpCodesByName.SDF_C_TABLEBLOCK:
            return a = FileParser.parse_SDF_LONGVALUE(e.mapUint8Array(t.length));
          // case ConstantData2.SDROpCodesByName.SDF_C_CLOUDCOMMENTBLOCK:
          //   return a = FileParser.parse_SDF_COMMENT(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_GRAPHBLOCK:
            return a = FileParser.parse_SDF_LONGVALUE(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_EXPANDEDVIEW:
            return a = FileParser.parse_SDF_EXPANDEDVIEW(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_GANTTINFOBLOCK:
          case ConstantData2.SDROpCodesByName.SDF_C_GRAPHID:
          case ConstantData2.SDROpCodesByName.SDF_C_TABLEID:
          case ConstantData2.SDROpCodesByName.SDF_C_GANTTINFOID:
          case ConstantData2.SDROpCodesByName.SDF_C_NOTEID:
          case ConstantData2.SDROpCodesByName.SDF_C_EXPANDEDVIEWID:
            return a = FileParser.parse_SDF_LONGVALUE(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_O_TEXTURELIST:
            return a = FileParser.parse_SDF_C_LAYERTYPE(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_O_TEXTURE:
            return a = FileParser.parse_SDF_O_TEXTURE(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_O_TEXTUREEXT:
            return a = FileParser.parse_SDF_O_TEXTUREEXT(e.mapUint8Array(t.length), t.length);
          case ConstantData2.SDROpCodesByName.SDF_O_TEXTUREDATA:
            return a = FileParser.parse_image(e.mapUint8Array(t.length), FileParser.TextureFormat);
          case ConstantData2.SDROpCodesByName.SDF_C_COMMENT:
            return a = 8 === t.length ? FileParser.parse_SDF_LONGTEXT8_8(e.mapUint8Array(t.length)) : FileParser.parse_SDF_LONGTEXT8(e.mapUint8Array(t.length));
          case ConstantData2.SDROpCodesByName.SDF_C_FREEHANDLINE:
            return a = FileParser.parse_SDF_FreehandLine_Struct(e.mapUint8Array(t.length));
          default:
            return "data[" + (a = e.mapUint8Array(t.length).length) + "]"
        }
      }
    }], "*"]]






















// FileParser.SDR_Parser_HeaderOnly_Struct = [
//   'start',
//   function (e) {
//     var t = e.readString(8);
//     return t = t == FileParser.Signature ? t : null,
//       FileParser.ReadUnicode = !0,
//       t
//   },
//   'codes',
//   [
//     '[]',
//     [
//       'code',
//       'uint16',
//       'codeName',
//       function (e, t) {
//         return FileParser.SDROpCodesByCode[t.code] ||
//           'Unknown'
//       },
//       'length',
//       function (e, t) {
//         return 16384 & t.code ? 0 : e.readUint32()
//       },
//       'data',
//       {
//         get: function (e, t) {
//           if (16384 & t.code) return 0;
//           var a = {};
//           return t.code === ConstantData2.SDROpCodesByName.SDF_C_VERSION ? (
//             a = FileParser.parse_SDF_VERSION(e.mapUint8Array(t.length)),
//             t.length < 18 ? (a.Unicode = 0, FileParser.ReadUnicode = !1) : FileParser.ReadUnicode = a.Unicode,
//             a
//           ) : void 0
//         }
//       }
//     ],
//     '*'
//   ]
// ]

FileParser.SDR_Parser_HeaderOnly_Struct = ["start", function (e) {
  var t = e.readString(8);
  return t = t == FileParser.Signature ? t : null,
    FileParser.ReadUnicode = !0,
    t
}
  , "codes", ["[]", ["code", "uint16", "codeName", function (e, t) {
    return FileParser.SDROpCodesByCode[t.code] || "Unknown"
  }
    , "length", function (e, t) {
      return 16384 & t.code ? 0 : e.readUint32()
    }
    , "data", {
      get: function (e, t) {
        if (16384 & t.code)
          return 0;
        var a = {};
        return t.code === ConstantData2.SDROpCodesByName.SDF_C_VERSION ? (a = FileParser.parse_SDF_VERSION(e.mapUint8Array(t.length)),
          t.length < 18 ? (a.Unicode = 0,
            FileParser.ReadUnicode = !1) : FileParser.ReadUnicode = a.Unicode,
          a) : void 0
      }
    }], "*"]]

export default FileParser;
