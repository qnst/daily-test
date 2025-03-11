
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import T3Gv from '../Data/T3Gv'
import FileParser from '../Data/FileParser'
import EvtUtil from "../Event/EvtUtil";
import Element from "../Basic/B.Element";
import QuickStyle from "../Model/QuickStyle"
import Rectangle from "../Model/Rectangle"
import TextureList from '../Model/TextureList'

class Graph {

  constructor() {
    this.layoutFrame = new Rectangle(0, 0, 0, 0),
      this.stackScale = - 1,
      this.lastEditeddataId = - 1,
      this.objTangleSave = 0,
      this.areaBGImageID = - 1,
      this.bgImageID = - 1,
      this.dataTableManagedRect = new Rectangle(0, 0, 0, 0),
      this.virtualBounds3D = new Rectangle(0, 0, 0, 0),
      this.valuePrecision = - 1,
      this.pieChartCategory = - 1,
      this.pieOriginTangle = - 1,
      this.area = new Rectangle(0, 0, 0, 0),
      this.selectedText = - 1,
      this.flags = 0,
      this.pointflags = 0,
      this.prefixChar = null,
      this.suffixChar = null,
      this.graphtype = - 1,
      this.quadrant = 0,
      this.barAreaAmount = 0,
      this.barAreaAmountStacked = 0,
      txList = new TextureList(),
      this.imageValueRep = 0,
      this.perspectiveView3D = - 1,
      this.effectLightDirection3D = - 1,
      this.style = new QuickStyle(),
      this.areaStyle = new QuickStyle(),
      this.gridStyle = new QuickStyle(),
      this.axes = [],
      this.graphtitle = new TODO.Graph.Axis.Title,
      this.graphlegendTitle = new TODO.Graph.Axis.Title,
      this.graphLegendType = 0,
      this.graphLegend = [],
      this.gpoint = []
  }

  TODO.Graph.Axis = function () {
    this.orientation = 0,
      this.selected = !1,
      this.flags = 0,
      this.lflags = 0,
      this.summaryflags = 0,
      this.fixedpoint = 0,
      this.frame = new Rectangle(0, 0, 0, 0),
      this.margin = 0,
      this.startpref = 0,
      this.endpref = 0,
      this.majorpref = 0,
      this.minorpref = 0,
      this.start = 0,
      this.end = 0,
      this.major = 0,
      this.majorscale = 0,
      this.minor = 0,
      this.minorscale = 0,
      this.tickstyles = 0,
      this.labelformat = 0,
      this.style = new QuickStyle(),
      this.title = new TODO.Graph.Axis.Title,
      this.footprint3d = [],
      this.labels = []
  },
  TODO.Graph.Point = function () {
    this.uniqueid = - 1,
      this.seriesid = - 1,
      this.categoryid = - 1,
      this.HyperlinkText = '',
      this.DataID = - 1,
      this.NoteID = - 1,
      this.value = 0,
      this.percentOfCategory = 0,
      this.frame = new Rectangle(0, 0, 0, 0),
      this.tangle = 0,
      this.explodeAmt = 0,
      this.wedgeStartTangle = 0,
      this.imageFill = {},
      this.imgFillSize = {
        cx: 0,
        cy: 0
      },
      this.selected = !1,
      this.flags = 0,
      this.style = new QuickStyle(),
      this.imagescale = 0,
      this.imagestackfactor = 0,
      this.imagerect = new Rectangle(0, 0, 0, 0),
      this.imagerectBottom = new Rectangle(0, 0, 0, 0),
      this.imagerectMiddle = new Rectangle(0, 0, 0, 0),
      this.imagerectTop = new Rectangle(0, 0, 0, 0),
      this.imagePaintBounds = new Rectangle(0, 0, 0, 0),
      this.footprint3d = [],
      this.label = new TODO.Graph.Axis.Label
  },
  TODO.Graph.LegendEntry = function () {
    this.seriesid = - 1,
      this.selected = !1,
      this.flags = 0,
      this.lflags = 0,
      this.DataID = - 1,
      this.imgIndx = - 1,
      this.textFrame = new Rectangle(0, 0, 0, 0),
      this.swatchFrame = new Rectangle(0, 0, 0, 0),
      this.style = new QuickStyle(),
      this.labelStyle = new QuickStyle(),
      this.imageFill = {},
      this.valuePerImage = 0
  },
  TODO.Graph.Category = function () {
    this.categoryid = - 1,
      this.cSeries = 0,
      this.cumValue = 0,
      this.cumValuePos = 0,
      this.cumValueNeg = 0,
      this.maxArea = new Rectangle(0, 0, 0, 0),
      this.maxArea3D = new Rectangle(0, 0, 0, 0),
      this.selectHotspot = new Rectangle(0, 0, 0, 0)
  },
  TODO.Graph.Axis.Label = function () {
    this.categoryid = - 1,
      this.selected = !1,
      this.lflags = 0,
      this.frame = new Rectangle(0, 0, 0, 0),
      this.frame3DOverlay = new Rectangle(0, 0, 0, 0),
      this.tangle = 0,
      this.center = {
        x: 0,
        y: 0
      },
      this.DataID = - 1,
      this.just = 0,
      this.vjust = 0,
      this.style = new QuickStyle(),
  },
  TODO.Graph.Axis.Title = function () {
    this.DataID = - 1,
      this.disp = {
        x: 0,
        y: 0
      },
      this.selected = !1,
      this.lflags = 0,
      this.just = 0,
      this.margin = 0,
      this.frame = new Rectangle(0, 0, 0, 0),
      this.tangle = 0,
      this.drawpt = new Rectangle(0, 0, 0, 0),
      this.center = {
        x: 0,
        y: 0
      },
      this.style = new QuickStyle(),
  },
  TODO.Graph.Defines = {
    SDAX_HORIZ: 0,
    SDAX_VERT: 1,
    SDAX_CATEGORY_AXIS: 1,
    SDAX_MAGNITUDE_AXIS: 2,
    SDAX_MAX_CATEGORIES: 500,
    SDAX_MAX_SERIES: 128,
    SDAX_MAX_NUDGES: 32,
    SDAX_NUM_SAMPLE_SERIES: 3,
    SDAX_NUM_SAMPLE_CATS: 4,
    SDAX_MAX_AXIS_LABELS: 500,
    SDAX_MAX_POINTS_ARC: 256,
    SDAX_SELECT_THICKNESS: 2,
    SDAX_SELECT_KNOBSIZE: 3,
    SDAX_SELECT_NONMOVABLE_KNOBSIZE: 2,
    SDAX_SELECT_COLOR: {
      r: 0,
      g: 0,
      b: 0
    },
    SDAX_NONMOVABLE_COLOR: {
      r: 128,
      g: 128,
      b: 128
    },
    SDAX_HIGHLIGHT_COLOR: {
      r: 0,
      g: 255,
      b: 255
    },
    SDAX_EXTERNAL_LEADER_STEMSIZE: 25,
    SDAX_CAT_AXIS_MARGIN: 10,
    SDAX_VALUE_LABEL_MARGIN: 2,
    SDAX_VALUE_LABEL_EXTERNAL_MARGIN: 7,
    SDAX_GRAPH_TITLE_VERTICAL_SPACING: 10,
    SDAX_DEFAULT_AXIS_TITLE_CATEGORIES: 'Categories',
    SDAX_DEFAULT_AXIS_TITLE: 'Axis Title',
    SDAX_DEFAULT_AXIS_TITLE_MAGNITUDE: 'Units',
    SDAX_DEFAULT_GRAPH_TITLE: 'Chart Title',
    SDAX_DEFAULT_CATEGORY_LABEL: 'Category',
    SDAX_DEFAULT_SERIES_NAME: 'Series',
    SDAX_MAJORTICKSIZE: 8,
    SDAX_MINORTICKSIZE: 4,
    SDAX_MAJOR_TICK_THICKNESS: 2,
    SDAX_MINOR_TICK_THICKNESS: 1,
    SDAX_BARCLUSTER_SPACING_PERCENT: 0.75,
    SDAX_BARSTACK_SPACING_PERCENT: 0.6,
    SDAX_DEFAULT_AXIS_LABEL_WIDTH: 300,
    SDAX_DEFAULT_AXIS_LABEL_HEIGHT: 75,
    SDAX_DEFAULT_AXIS_TITLE_WIDTH: 300,
    SDAX_DEFAULT_AXIS_TITLE_HEIGHT: 75,
    SDAX_DEFAULT_GRAPH_TITLE_WIDTH: 300,
    SDAX_DEFAULT_GRAPH_TITLE_HEIGHT: 75,
    SDAX_3D_BAR_Z: - 400,
    SDAX_3D_AXIS_Z: 0,
    SDAX_3D_AXIS_LOFT: 50,
    SDAX_LEGEND_SWATCH_SIZE: 15,
    SDAX_LEGEND_GAP_SIZE: 5,
    SDAX_LEGEND_MARGIN: 2,
    SDAX_LEGEND_BOTTOM_MARGIN: 4,
    SDAX_LEGEND_RIGHT_MARGIN: 12,
    SDAX_NUDGE_MARGIN: 1,
    SDAX_MIN_HOTSPOT_SIZE: 6,
    SDAX_PIE_HOTSPOT_DEGREES: 1,
    SDAX_PIE_HOTSPOT_RADIANS: 0.175,
    SDAX_EXPLODE_HOTSPOT_PERCENT: 0.5,
    SDAX_WIDEN_HOTSPOT_PERCENT: 0.3,
    SDAX_GALLERY_DEFAULT_EXPLODE_AMT: 20,
    SDAX_DefThick: 1
  },
  Object.freeze(TODO.Graph.Defines),
  TODO.Graph.Static = {
    LastGraphType: - 1,
    LastGraphSubType: - 1
  },
  TODO.Graph.StylePrefix = {
    SDGRAPH_STYLE_PREFIX_BAR: 'Bar',
    SDGRAPH_STYLE_PREFIX_PIEWEDGE: 'Pie',
    SDGRAPH_STYLE_PREFIX_LINE: 'Line',
    SDGRAPH_STYLE_PREFIX_AREA: 'Area'
  },
  Object.freeze(TODO.Graph.StylePrefix),
  TODO.Graph.SelectionType = {
    SDAX_SELECT_NONE: 0,
    SDAX_SELECT_POINT: 1,
    SDAX_SELECT_SERIES: 2,
    SDAX_SELECT_CATEGORY: 3
  },
  Object.freeze(TODO.Graph.SelectionType),
  TODO.Graph.MovementDirection = {
    SDAX_LEFT: 1,
    SDAX_RIGHT: 2,
    SDAX_UP: 3,
    SDAX_DOWN: 4,
    SDAX_TOP: 5,
    SDAX_BOTTOM: 6
  },
  Object.freeze(TODO.Graph.SelectionType),
  TODO.Graph.TimeGranularity = {
    SDAX_MILLENIUM: 11,
    SDAX_CENTURY: 10,
    SDAX_DECADE: 9,
    SDAX_YEAR: 8,
    SDAX_QUARTER: 7,
    SDAX_MONTH: 6,
    SDAX_WEEK: 5,
    SDAX_DAY: 4,
    SDAX_HOUR: 3,
    SDAX_MINUTE: 2,
    SDAX_SECOND: 1
  },
  Object.freeze(TODO.Graph.TimeGranularity),
  TODO.Graph.ImageRepresentation = {
    SDAX_IMAGEVALUEREP_NONE: 0,
    SDAX_IMAGEVALUEREP_STACK: 1,
    SDAX_IMAGEVALUEREP_STACK_NOSCALE: 2,
    SDAX_IMAGEVALUEREP_SIZE: 3,
    SDAX_IMAGEVALUEREP_STRETCH: 4,
    SDAX_IMAGEVALUEREP_SPAN: 5
  },
  Object.freeze(TODO.Graph.ImageRepresentation),
  TODO.Graph.LegendType = {
    SDAX_LEGEND_FULL: 0,
    SDAX_LEGEND_NONE: 1,
    SDAX_LEGEND_NAMES: 2,
    SDAX_LEGEND_SWATCHES: 3
  },
  Object.freeze(TODO.Graph.LegendType),
  TODO.Graph.ScaleValue = {
    SDAX_SCALE_AUTO: - 2,
    SDAX_SCALE_RECC: - 3,
    SDAX_SCALE_CUSTOM: - 4
  },
  Object.freeze(TODO.Graph.ScaleValue),
  TODO.Graph.GraphType = {
    SDGRAPH_TYPE_UNSET: - 1,
    SDGRAPH_TYPE_BAR: 0,
    SDGRAPH_TYPE_STACKEDBAR: 1,
    SDGRAPH_TYPE_LINE: 2,
    SDGRAPH_TYPE_PIE: 3,
    SDGRAPH_TYPE_LINEARPIE: 4,
    SDGRAPH_TYPE_STACKEDLINE: 5
  },
  Object.freeze(TODO.Graph.GraphType),
  TODO.Graph.GraphSubType = {
    SDGRAPH_SUBTYPE_UNSET: - 1,
    SDGRAPH_SUBTYPE_NONE: 0,
    SDGRAPH_SUBTYPE_HISTOGRAM: 1,
    SDGRAPH_SUBTYPE_AREA: 2
  },
  Object.freeze(TODO.Graph.GraphSubType),
  TODO.Graph.AxisFlags = {
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
  },
  Object.freeze(TODO.Graph.AxisFlags),
  TODO.Graph.AxisSummaryLabelFlags = {
    SDAX_SUMMARIZE_FORMATTING_MASK: 47,
    SDAX_FORMAT_MONTHNAMES: 1,
    SDAX_FORMAT_MONTHNAMES_ABBREV: 2,
    SDAX_FORMAT_YY: 4,
    SDAX_FORMAT_TIMES_TO_SECOND: 8,
    SDAX_FORMAT_DATES_INCLUDING_YEAR: 16,
    SDAX_SUMMARIZE_BY_DATE_PREFERRED: 32,
    SDAX_SUMMARIZE_BY_DATE_TIME_MASK: 4294967104,
    SDAX_SUMMARIZE_BY_SECOND: 64,
    SDAX_SUMMARIZE_BY_MINUTE: 128,
    SDAX_SUMMARIZE_BY_HOUR: 256,
    SDAX_SUMMARIZE_BY_DAY: 512,
    SDAX_SUMMARIZE_BY_WEEK: 1024,
    SDAX_SUMMARIZE_BY_MONTH: 2048,
    SDAX_SUMMARIZE_BY_QUARTER: 4096,
    SDAX_SUMMARIZE_BY_YEAR: 8192,
    SDAX_SUMMARIZE_BY_DECADE: 16384,
    SDAX_SUMMARIZE_BY_CENTURY: 32768,
    SDAX_SUMMARIZE_BY_MILLENIUM: 65536
  },
  Object.freeze(TODO.Graph.AxisSummaryLabelFlags),
  TODO.Graph.AxisTickStyles = {
    SDAX_TICK_ABOVE: 0,
    SDAX_TICK_BELOW: 1
  },
  Object.freeze(TODO.Graph.AxisTickStyles),
  TODO.Graph.Flags = {
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
  },
  Object.freeze(TODO.Graph.Flags),
  TODO.Graph.PointFlags = {
    SDAX_VALUELABELS: 1,
    SDAX_VALUELABELS_ANGLED: 2,
    SDAX_VALUELABELS_SERIES_NAME: 4,
    SDAX_VALUELABELS_PERCENT: 8,
    SDAX_VALUELABELS_NOVALUE: 16,
    SDAX_FILL_LINE_AREA: 32,
    SDAX_3D_BARS_ROUNDED: 64,
    SDAX_3D_BARS_CYLINDER: 128,
    SDAX_3D_BARS_CONE: 256,
    SDAX_VALUELABELS_EXTERNAL: 512,
    SDAX_VALUELABELS_EXTERNAL_LEADERS: 1024,
    SDAX_DIAGONAL: 2048,
    SDAX_RAGGED_EDGES: 4096
  },
  Object.freeze(TODO.Graph.PointFlags),
  TODO.Graph.LayoutFlags = {
    SDAX_LAYOUT_AFFECTING_HORIZ: 1,
    SDAX_LAYOUT_AFFECTING_VERT: 2,
    SDAX_LAYOUT_ALTERNATE: 4
  },
  Object.freeze(TODO.Graph.LayoutFlags),
  TODO.Graph.PointFlagOverrides = {
    SDAX_POINT_SELECTED: 1,
    SDAX_POINT_FORCE_EXTERNALLEADER: 2
  },
  Object.freeze(TODO.Graph.PointFlagOverrides),
  TODO.Graph.LegendEntryFlags = {
    SDAX_TREND_LINE: 1
  },
  Object.freeze(TODO.Graph.LegendEntryFlags),
  TODO.Graph.HitCodes = {
    SDG_VALUE_HOTSPOT: 1,
    SDG_TEXT: 2,
    SDG_POINT: 3,
    SDG_GRAPHTYPE_CHANGE: 4,
    SDG_EXPLODE: 5,
    SDG_WIDEN: 6,
    SDG_SELECT: 7,
    SDG_MULTISELECT: 8,
    SDG_AXIS_GROW: 9,
    SDG_TEXT_HYPERLINK: 10,
    SDG_INSIDEGJ: 11,
    SDG_INSIDEGN: 12
  },
  Object.freeze(TODO.Graph.HitCodes),
  TODO.Graph.AxesStyles = {
    SDGRAPH_AXES_BOTH: 0,
    SDGRAPH_AXES_HORIZ_ONLY: 1,
    SDGRAPH_AXES_VERT_ONLY: 2,
    SDGRAPH_AXES_NONE: 3
  },
  Object.freeze(TODO.Graph.AxesStyles),
  TODO.Graph.GridStyles = {
    SDGRAPH_GRID_BOTH: 0,
    SDGRAPH_GRID_MINOR_ONLY: 1,
    SDGRAPH_GRID_MAJOR_ONLY: 2,
    SDGRAPH_GRID_NONE: 3
  },
  Object.freeze(TODO.Graph.GridStyles),
  TODO.Graph.DrawTypes = {
    SD_GRAPH_DRAWTYPE_TEXT: 0,
    SD_GRAPH_DRAWTYPE_LINES: 1,
    SD_GRAPH_DRAWTYPE_ALL: 2
  },
  Object.freeze(TODO.Graph.DrawTypes),
  TODO.Graph.BarStyleVariations3d = {
    SDGRAPH_3D_SHAPE_TYPE_RECT: 0,
    SDGRAPH_3D_SHAPE_TYPE_ROUNDEDRECT: 1,
    SDGRAPH_3D_SHAPE_TYPE_CYLINDER: 2,
    SDGRAPH_3D_SHAPE_TYPE_CONE: 3
  },
  Object.freeze(TODO.Graph.BarStyleVariations3d),
  TODO.Graph.StyleBuilderInfo = {
    SDTD_GRAPHSTYLE: 'chartStyle',
    SDTD_GRAPHSTYLENAME: 'name',
    SDTD_GRAPHSTYLETYPE: 'type',
    SDTD_GRAPHSTYLESUBTYPE: 'subtype',
    SDTD_GRAPHSTYLEQUADRANT: 'quadrant',
    SDTD_GRAPHSTYLEIMAGEVALREP: 'imageChart',
    SDTD_GRAPHSTYLELEGEND: 'legend',
    SDTD_GRAPHSTYLELEGENDPLACEMENT: 'legendPlacement',
    SDTD_GRAPHSTYLESHADOW: 'shadow',
    SDTD_GRAPHSTYLEGRADIENT: 'gradient',
    SDTD_GRAPHSTYLEEXPLODE: 'explode',
    SDTD_GRAPHSTYLESIMPLIFY: 'simplify',
    SDTD_GRAPHSTYLE3D: '3d',
    SDTD_GRAPHSTYLE3DSTYLE: '3dStyle',
    SDTD_GRAPHSTYLEDIAGONAL: 'diagonalEdge',
    SDTD_GRAPHSTYLERAGGED: 'raggedEdge'
  },
  Object.freeze(TODO.Graph.StyleBuilderInfo),
  TODO.Graph.ValueLabelOptions = {
    SDTD_GRAPHSTYLE_VALUELABELS: 'valueLabels',
    SDTD_GRAPHSTYLE_VALUELABELS_ANGLED: 'valueLabelAngled',
    SDTD_GRAPHSTYLE_VALUELABELS_SHOWVALUE: 'valueLabelShowValue',
    SDTD_GRAPHSTYLE_VALUELABELS_SHOWSERIES: 'valueLabelShowSeries',
    SDTD_GRAPHSTYLE_VALUELABELS_SHOWPERCENT: 'valueLabelShowPercent',
    SDTD_GRAPHSTYLE_VALUELABELS_STYLE: 'valueLabelStyle'
  },
  Object.freeze(TODO.Graph.ValueLabelOptions),
  TODO.Graph.AxisLabelOptions = {
    SDTD_GRAPHSTYLE_HAXIS: 'horizontalAxis',
    SDTD_GRAPHSTYLE_VAXIS: 'verticalAxis',
    SDTD_GRAPHSTYLE_AXIS_LINE: 'line',
    SDTD_GRAPHSTYLE_AXIS_TITLE: 'title',
    SDTD_GRAPHSTYLE_AXIS_LABELS: 'labels',
    SDTD_GRAPHSTYLE_AXIS_MAJOR_TICKS: 'majorTicks',
    SDTD_GRAPHSTYLE_AXIS_MINOR_TICKS: 'minorTicks',
    SDTD_GRAPHSTYLE_AXIS_MAJOR_GRID: 'majorGridLine',
    SDTD_GRAPHSTYLE_AXIS_MINOR_GRID: 'minorGridLine'
  },
  Object.freeze(TODO.Graph.AxisLabelOptions),
  TODO.Graph.GraphDefaultColors = [
    '#3C459F',
    '#6DBB5B',
    '#1096EE',
    '#4C55B5',
    '#B54C89',
    '#4CB578',
    '#3C449E',
    '#3C9E96',
    '#C23C3E',
    '#52C480',
    '#C45297',
    '#52C480',
    '#846ECC',
    '#CC6E87',
    '#6ECCB3'
  ],
  Object.freeze(TODO.Graph.GraphDefaultColors),
  TODO.Graph.GraphStyles = {
    Default: {
      graphType: 0,
      graphSubType: 0,
      vertAxisFlags: 0,
      horizAxisFlags: 0,
      pointFlags: 0,
      valueLabelStyleName: '',
      quadrant: 0,
      imageValueRep: 0,
      legend: 0,
      legendAtBottom: 0,
      shadow: 0,
      gradient: 0,
      simplifySample: 0,
      explode: 0,
      show3d: 0,
      style3d: 0
    },
    Bar: {
      Default: {
        graphType: TODO.Graph.GraphType.SDGRAPH_TYPE_BAR,
        graphSubType: TODO.Graph.GraphSubType.SDGRAPH_SUBTYPE_NONE,
        legend: TODO.Graph.LegendType.SDAX_LEGEND_FULL,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      1: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      2: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      3: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS | TODO.Graph.AxisFlags.SDAX_HIDE_AXIS_LINE | TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS
      },
      4: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS | TODO.Graph.PointFlags.SDAX_VALUELABELS_ANGLED,
        valueLabelStyleName: 'Style15',
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      5: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      6: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      7: {
        quadrant: 1,
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS | TODO.Graph.PointFlags.SDAX_VALUELABELS_ANGLED,
        valueLabelStyleName: 'Style15',
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      8: {
        quadrant: 1,
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL,
        valueLabelStyleName: 'Style15',
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      9: {
        quadrant: 1,
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      }
    },
    Pie: {
      Default: {
        graphType: TODO.Graph.GraphType.SDGRAPH_TYPE_PIE,
        graphSubType: TODO.Graph.GraphSubType.SDGRAPH_SUBTYPE_NONE,
        legend: TODO.Graph.LegendType.SDAX_LEGEND_NONE,
        simplifySample: 1,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS | TODO.Graph.AxisFlags.SDAX_HIDE_AXIS_LINE | TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS | TODO.Graph.AxisFlags.SDAX_HIDE_AXIS_LINE | TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      1: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL | TODO.Graph.PointFlags.SDAX_VALUELABELS_SERIES_NAME | TODO.Graph.PointFlags.SDAX_VALUELABELS_PERCENT
      },
      2: {
        legend: TODO.Graph.LegendType.SDAX_LEGEND_FULL
      },
      3: {
        legend: TODO.Graph.LegendType.SDAX_LEGEND_NONE
      },
      4: {
        legend: TODO.Graph.LegendType.SDAX_LEGEND_NONE,
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS,
        explode: 1
      },
      4: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL | TODO.Graph.PointFlags.SDAX_VALUELABELS_SERIES_NAME | TODO.Graph.PointFlags.SDAX_VALUELABELS_PERCENT,
        explode: 1
      },
      5: {
        legend: TODO.Graph.LegendType.SDAX_LEGEND_FULL,
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS,
        explode: 1
      },
      6: {
        legend: TODO.Graph.LegendType.SDAX_LEGEND_FULL,
        explode: 1
      },
      7: {
        legend: TODO.Graph.LegendType.SDAX_LEGEND_NONE,
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS | TODO.Graph.PointFlags.SDAX_VALUELABELS_SERIES_NAME | TODO.Graph.PointFlags.SDAX_VALUELABELS_PERCENT,
        explode: 1
      }
    },
    Line: {
      Default: {
        graphType: TODO.Graph.GraphType.SDGRAPH_TYPE_LINE,
        graphSubType: TODO.Graph.GraphSubType.SDGRAPH_SUBTYPE_NONE,
        legend: TODO.Graph.LegendType.SDAX_LEGEND_FULL,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      1: {
      },
      2: {
      },
      3: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_AXIS_LINE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS | TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      4: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      5: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS | TODO.Graph.PointFlags.SDAX_VALUELABELS_ANGLED,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      6: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      9: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL,
        quadrant: 1,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      }
    },
    StackedBar: {
      Default: {
        graphType: TODO.Graph.GraphType.SDGRAPH_TYPE_STACKEDBAR,
        graphSubType: TODO.Graph.GraphSubType.SDGRAPH_SUBTYPE_NONE,
        legend: TODO.Graph.LegendType.SDAX_LEGEND_FULL,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      1: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      2: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      3: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS | TODO.Graph.AxisFlags.SDAX_HIDE_AXIS_LINE | TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS
      },
      4: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS | TODO.Graph.PointFlags.SDAX_VALUELABELS_ANGLED,
        valueLabelStyleName: 'Style15',
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      5: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      6: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      7: {
        quadrant: 1,
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS | TODO.Graph.PointFlags.SDAX_VALUELABELS_ANGLED,
        valueLabelStyleName: 'Style15',
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      8: {
        quadrant: 1,
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL,
        valueLabelStyleName: 'Style15',
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      9: {
        quadrant: 1,
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      }
    },
    StackedLine: {
      Default: {
        graphType: TODO.Graph.GraphType.SDGRAPH_TYPE_STACKEDLINE,
        graphSubType: TODO.Graph.GraphSubType.SDGRAPH_SUBTYPE_NONE,
        legend: TODO.Graph.LegendType.SDAX_LEGEND_FULL,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      1: {
      },
      2: {
      },
      3: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_AXIS_LINE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS | TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      4: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      5: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS | TODO.Graph.PointFlags.SDAX_VALUELABELS_ANGLED,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      6: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      9: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL,
        quadrant: 1,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      }
    },
    LinearPie: {
      Default: {
        graphType: TODO.Graph.GraphType.SDGRAPH_TYPE_LINEARPIE,
        graphSubType: TODO.Graph.GraphSubType.SDGRAPH_SUBTYPE_NONE,
        legend: TODO.Graph.LegendType.SDAX_LEGEND_FULL,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_AXIS_LINE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_AXIS_LINE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS | TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        legendAtBottom: 1,
        quadrant: 3
      },
      1: {
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS | TODO.Graph.PointFlags.SDAX_VALUELABELS_SERIES_NAME | TODO.Graph.PointFlags.SDAX_VALUELABELS_PERCENT,
        explode: 1
      },
      2: {
        legend: TODO.Graph.LegendType.SDAX_LEGEND_NONE,
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_SERIES_NAME | TODO.Graph.PointFlags.SDAX_VALUELABELS_PERCENT,
        explode: 1
      },
      3: {
        legend: TODO.Graph.LegendType.SDAX_LEGEND_NONE,
        pointFlags: 0,
        explode: 1
      },
      4: {
        legend: TODO.Graph.LegendType.SDAX_LEGEND_NONE,
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS | TODO.Graph.PointFlags.SDAX_VALUELABELS_SERIES_NAME | TODO.Graph.PointFlags.SDAX_VALUELABELS_PERCENT
      },
      5: {
        legend: TODO.Graph.LegendType.SDAX_LEGEND_FULL,
        pointFlags: TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_SERIES_NAME | TODO.Graph.PointFlags.SDAX_VALUELABELS_PERCENT,
        explode: 1
      },
      6: {
        legend: TODO.Graph.LegendType.SDAX_LEGEND_FULL,
        pointFlags: 0,
        explode: 1
      }
    },
    Area: {
      Default: {
        graphType: TODO.Graph.GraphType.SDGRAPH_TYPE_STACKEDLINE,
        graphSubType: TODO.Graph.GraphSubType.SDGRAPH_SUBTYPE_AREA,
        pointFlags: TODO.Graph.PointFlags.SDAX_FILL_LINE_AREA,
        legend: TODO.Graph.LegendType.SDAX_LEGEND_FULL,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      1: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      2: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      3: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS | TODO.Graph.AxisFlags.SDAX_HIDE_AXIS_LINE | TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS
      },
      4: {
        pointFlags: TODO.Graph.PointFlags.SDAX_FILL_LINE_AREA | TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS | TODO.Graph.PointFlags.SDAX_VALUELABELS_ANGLED,
        valueLabelStyleName: 'Style15',
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      5: {
        pointFlags: TODO.Graph.PointFlags.SDAX_FILL_LINE_AREA | TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      6: {
        pointFlags: TODO.Graph.PointFlags.SDAX_FILL_LINE_AREA | TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      }
    },
    LayeredArea: {
      Default: {
        graphType: TODO.Graph.GraphType.SDGRAPH_TYPE_LINE,
        graphSubType: TODO.Graph.GraphSubType.SDGRAPH_SUBTYPE_AREA,
        pointFlags: TODO.Graph.PointFlags.SDAX_FILL_LINE_AREA,
        legend: TODO.Graph.LegendType.SDAX_LEGEND_FULL,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      1: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS
      },
      2: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      3: {
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS | TODO.Graph.AxisFlags.SDAX_HIDE_AXIS_LINE | TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_HIDE_MAJOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS | TODO.Graph.AxisFlags.SDAX_HIDE_TITLE | TODO.Graph.AxisFlags.SDAX_HIDE_LABELS
      },
      4: {
        pointFlags: TODO.Graph.PointFlags.SDAX_FILL_LINE_AREA | TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS | TODO.Graph.PointFlags.SDAX_VALUELABELS_ANGLED,
        valueLabelStyleName: 'Style15',
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      5: {
        pointFlags: TODO.Graph.PointFlags.SDAX_FILL_LINE_AREA | TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      },
      6: {
        pointFlags: TODO.Graph.PointFlags.SDAX_FILL_LINE_AREA | TODO.Graph.PointFlags.SDAX_VALUELABELS | TODO.Graph.PointFlags.SDAX_VALUELABELS_EXTERNAL_LEADERS,
        vertAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR | TODO.Graph.AxisFlags.SDAX_HIDE_MINOR_TICKS,
        horizAxisFlags: TODO.Graph.AxisFlags.SDAX_SHOW_GRID_LINE_MAJOR
      }
    }
  }

}

export default Graph;
