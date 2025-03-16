

class TextConstant {


  static TextFace = {
    Bold: 1,
    Italic: 2,
    // Underline: 4,
    // Superscript: 16,
    // Subscript: 32
  }

  static STTextFace = {
    // St_Plain: 0,
    St_Bold: 1,
    St_Italic: 2,
    St_Under: 4,
    // St_Reverse: 8,
    St_Super: 16,
    St_Sub: 32,
    St_Strike: 64
  }

  static TextFlags = {
    // TEN_F_LINEF: 1,
    // TEN_F_LINEP: 2,
    // TEN_F_BREAK: 4,
    // TEN_F_SYMBOL: 8,
    // TEN_F_INSSYMBOL: 16,
    TEN_F_BADSPELL: 32
  }

  static TextStyleCodes = {
    SDF_T_FONT: 0,
    SDF_T_SIZE: 1,
    SDF_T_FACE: 2,
    SDF_T_FLAGS: 3,
    SDF_T_COLOR: 4,
    SDF_T_STYLEID: 5,
    // SDF_T_ORIENT: 6,
    SDF_T_EXTRA: 7,
    // SDF_T_SETSIZE: 8,
    // SDF_T_SETSIZEMIN: 9,
    SDF_T_LINKID: 10,
    SDF_T_DATAID: 11,
    SDF_T_PAINTTYPE: 20,
    // SDF_T_PAINTECOLOR: 21,
    // SDF_T_PAINTGRAD: 22,
    // SDF_T_PAINTTEXTURE: 23,
    // SDF_T_PAINTTXSCALE: 24,
    SDF_T_SIZE_FLOAT: 25
  }

  static TextJust = {
    TA_LEFT: 0,
    TA_RIGHT: 2,
    TA_CENTER: 6,
    TA_TOP: 0,
    TA_BOTTOM: 8
  }

  static TextAlign = {
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

  static TextureAlign = {
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

  static ReplaceTextStrings = [
    'Click To Add',
    'Double Click To Add',
    'Click to Add Text',
    'Double Click to Add Text',
    'Enter Person',
    'Enter Task'
  ]
}

export default TextConstant
