

class CursorConstant {

  static CursorType = {
    AUTO: 'cur-auto',
    DEFAULT: 'cur-default',//
    NONE: 'cur-none',
    CONTEXT_MENU: 'cur-context-menu',
    HELP: 'cur-help',
    POINTER: 'cur-pointer',//
    PROGRESS: 'cur-progress',
    BUSY: 'cur-wait',
    CELL: 'cur-cell',
    CROSSHAIR: 'cur-crosshair',//crosshair.svg
    TEXT: 'cur-text',//
    VERTICAL_TEXT: 'cur-vertical-text',
    ALIAS: 'cur-alias',
    COPY: 'cur-copy',
    MOVE: 'cur-move',
    NO_DROP: 'cur-no-drop',
    NOT_ALLOWED: 'cur-not-allowed',
    ALL_SCROLL: 'cur-all-scroll',
    COL_RESIZE: 'cur-col-resize',//////
    ROW_RESIZE: 'cur-row-resize',//////
    RESIZE_T: 'cur-n-resize',//
    RESIZE_R: 'cur-e-resize',//
    RESIZE_B: 'cur-s-resize',//
    RESIZE_L: 'cur-w-resize',//
    RESIZE_TB: 'cur-ns-resize',//
    RESIZE_LR: 'cur-ew-resize',//
    RESIZE_RT: 'cur-ne-resize',//
    RESIZE_LT: 'cur-nw-resize',//
    RESIZE_RB: 'cur-se-resize',//
    RESIZE_LB: 'cur-sw-resize',//
    NESW_RESIZE: 'cur-nesw-resize',//
    NWSE_RESIZE: 'cur-nwse-resize',//
    ZOOM_IN: 'cur-zoom-in',
    ZOOM_OUT: 'cur-zoom-out',
    ZOOM_GRAB: 'cur-zoom-grab',
    ZOOM_GRABBING: 'cur-zoom-grabbing',
    ANCHOR: 'cur-anchor',//  anchor.cur
    PAINT: 'cur-paint',// paint.cur
    ROTATE: 'cur-rotate',// rotate.cur
    DROPLIB: 'cur-droplib', // droplib.cur |||||
    EDIT_X: 'cur-pencil-x',// pencil-x.cur |||
    EDIT: 'cur-pencil', // edit.cur |||
    EDIT_CLOSE: 'cur-pencil-close', //edit-close.cur |||
    ADD: 'cur-add',// cur1012.cur
    STAMP: 'cur-stamp', //cur1036.cur
    ARR_DOWN: 'cur-arr-down', //cur1022.cur
    ARR_RIGHT: 'cur-arr-right', //cur1023.cur
    BRUSH: 'cur-brush',//cur1025.cur
    BRUSH_EDIT: 'cur-brush-edit',//cur1026.cur
    BRUSH_CELL: 'cur-brush-cell',//cur1027.cur
    BRUSH_TABLE: 'cur-brush-table',//cur1028.cur
    ADD_RIGHT: 'cur-add-right',//////////// cur1048.cur
    ADD_LEFT: 'cur-add-left',//////////////// cur1049.cur
    ADD_UP: 'cur-add-up',//////////// cur1050.cur
    ADD_DOWN: 'cur-add-down',////////////// cur1051.cur
    ADD_PLUS: 'cur-add-plus',////////////// cur1045.cur
    GRAB: 'cur-grab'
  }

  static CursorTypes = {
    Default: 'DEFAULT',
    Plus: 'PLUS',
    Move: 'MOVE',
    Grow: 'GROW'
  }

  static Knob = {
    Path: '../../../style/img/knob/',
    DiagonLeft: 'diagon_left.svg',
    DiagonRight: 'diagon_right.svg',
    ExpandHoriz: 'expand_horiz.svg',
    ExpandVert: 'expand_vert.svg',
  }

  static CursorState = {
    NONE: 0,
    EDITONLY: 1,
    EDITLINK: 2,
    LINKONLY: 3
  }
}

export default CursorConstant
