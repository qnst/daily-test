
import Resources from './Resources';
import Globals from './Globals';
import RulerSettings from '../Model/RulerConfig'
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


ListManager.DrawShapeType = {
  RECT: 1,
  RRECT: 2,
  OVAL: 3,
  POLYGON: 4,
  LINE: 5,
  ARCLINE: 6
}

ListManager.SegmentedLineDirection = {
  TOP: 1,
  LEFT: 2,
  BOTTOM: 3,
  RIGHT: 4
}

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


ListManager.TrialTests = {
  NoWatermark: 575,
  NoPrint: 575
}


ListManager.DateCodes = {
  SDUSDATE: 0,
  SDEURODATE: 1
}

ListManager.ClockTypes = {
  SDAUTOTIME: 0,
  SD12HOURTIME: 1,
  SD24HOURTIME: 2
}

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

ListManager.WFlags = {
  W_Stf: 1,
  W_Page: 2
}

ListManager.FreehandLineTypes = {
  Pen: 1,
  Highlighter: 2
}

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

ListManager.ConnectorDir = {
  ORG_HORIZONTAL: 0,
  ORG_VERTICALDOWN: 1,
  ORG_VERTICALUP: 2,
  ORG_HORIZONTALRIGHT: 3
}

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

ListManager.LibraryUseFlags = {
  SDLE_UseShowDimensions: 1,
  SDLE_UseLayer: 2,
  SDLE_UseText: 4,
  SDLE_AddNameAsLabel: 8
}

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

ListManager.DrawShapeType = {
  RECT: 1,
  RRECT: 2,
  OVAL: 3,
  POLYGON: 4,
  LINE: 5,
  ARCLINE: 6
}
ListManager.SegmentedLineDirection = {
  TOP: 1,
  LEFT: 2,
  BOTTOM: 3,
  RIGHT: 4
}

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


ListManager.TrialTests = {
  NoWatermark: 575,
  NoPrint: 575
}

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



ListManager.WFlags = {
  W_Stf: 1,
  W_Page: 2
}


ListManager.FreehandLineTypes = {
  Pen: 1,
  Highlighter: 2
}

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

ListManager.ConnectorDir = {
  ORG_HORIZONTAL: 0,
  ORG_VERTICALDOWN: 1,
  ORG_VERTICALUP: 2,
  ORG_HORIZONTALRIGHT: 3
}


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

ListManager.FormatPainterModes = {
  NONE: 0,
  OBJECT: 1,
  TEXT: 2,
  TABLE: 3
}

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

ListManager.LibraryUseFlags = {
  SDLE_UseShowDimensions: 1,
  SDLE_UseLayer: 2,
  SDLE_UseText: 4,
  SDLE_AddNameAsLabel: 8
}

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



ListManager.CPoint = function (e, t) {

  this.h = e ||
    0,
    this.v = t ||
    0
}



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


ListManager.LibListEntry = function (e) {
  this.libname = e,
    this.libGuid = null,
    this.scrollpos = 0,
    this.SearchResults = !1,
    this.Collapsed = !1
}


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


export default ListManager;
