

class ShapeContant {

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

  static LinePatternData = [
    0,
    '1,1',
    '3,1',
    '3,1,1,1',
    '3,1,1,1,1,1'
  ]

  static Windows_LinePatterns = {
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

    this.Units = 0,
      this.Scale = 0,
      this.RWidth = 0,
      this.AlignmentScalar = 0,
      this.Flags = 0
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
}

export default ShapeContant
