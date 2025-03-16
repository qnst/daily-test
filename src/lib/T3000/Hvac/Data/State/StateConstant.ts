

class StateConstant {

  static StateOperationType = {
    CREATE: 1,
    UPDATE: 2,
    DELETE: 3
  }

  static StoredObjectType = {
    BaseDrawingObject: 'BaseDrawingObject',
    TextObject: 'TextObject',
    NotesObject: 'NotesObject',
    SedSessionObject: 'SEDSession',
    TedSessionObject: 'TEDSession',
    SelectedListObject: 'SelectedList',
    LinkListObject: 'Links',
    LayersManagerObject: 'LayersManager',
    HNativeObject: 'hNative',
    HNativeWinObject: 'hNativeWindows',
    BlobBytesObject: 'BlobBytes',
    GraphObject: 'Graph',
    SDDataObject: 'SDData',
    ExpandedViewObject: 'ExpandedView',
    CommentBlock: 'CommentBlock',
    CommentThread: 'CommentThread',
    CommentList: 'CommentList'
  }
}

export default StateConstant
