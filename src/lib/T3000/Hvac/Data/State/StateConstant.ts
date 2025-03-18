

/**
 * Constants used for managing application state
 * Contains operation types and object types used throughout the application
 */
class StateConstant {
  /**
   * Defines types of operations that can be performed on state
   * @property {number} CREATE - Create a new state entry (value: 1)
   * @property {number} UPDATE - Update an existing state entry (value: 2)
   * @property {number} DELETE - Delete a state entry (value: 3)
   */
  static readonly StateOperationType = {
    CREATE: 1,
    UPDATE: 2,
    DELETE: 3
  } as const;

  /**
   * Defines the types of objects that can be stored in the application state
   * Each value represents a unique object type identifier used for storage and retrieval
   */
  /**
   * Defines the types of objects that can be stored in the application state
   * Each constant represents a unique identifier for different object types in the system
   * @property {string} BaseDrawObject - Base drawing object type
   * @property {string} TextObject - Text element object type
   * @property {string} NotesObject - Notes object type
   * @property {string} SedSessionObject - SED session data object type
   * @property {string} TedSessionObject - TED session data object type
   * @property {string} SelectedListObject - Selected items list object type
   * @property {string} LinkListObject - Links collection object type
   * @property {string} LayersManagerObject - Layers management object type
   * @property {string} HNativeObject - Native handler object type
   * @property {string} HNativeWinObject - Native Windows handler object type
   * @property {string} BlobBytesObject - Binary large object data type
   * @property {string} GraphObject - Graph visualization object type
   * @property {string} SDDataObject - Structured data object type
   * @property {string} ExpandedViewObject - Expanded view state object type
   * @property {string} CommentBlock - Comment block object type
   * @property {string} CommentThread - Comment thread object type
   * @property {string} CommentList - List of comments object type
   */
  static readonly StoredObjectType = {
    BaseDrawObject: 'BaseDrawObject',
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
  } as const;
}

export default StateConstant;
