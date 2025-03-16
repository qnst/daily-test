
import NvConstant from "../Data/Constant/NvConstant"
import StateConstant from "../Data/State/StateConstant";

class TEDSession {

  public Type: string;
  public theActiveTextEditObjectID: number;
  public theTEWasResized: boolean;
  public theTEWasEdited: boolean;
  public theTELastOp: any;
  public theActiveTableObjectID: number;
  public theActiveTableObjectIndex: number;
  public theActiveOutlineObjectID: number;
  public theActiveGraphObjectID: number;
  public EditorID: number;

  constructor() {
    this.Type = StateConstant.StoredObjectType.TedSessionObject;
    this.theActiveTextEditObjectID = -1;
    this.theTEWasResized = false;
    this.theTEWasEdited = false;
    this.theTELastOp = NvConstant.TELastOp.INIT;
    this.theActiveTableObjectID = -1;
    this.theActiveTableObjectIndex = -1;
    this.theActiveOutlineObjectID = -1;
    this.theActiveGraphObjectID = -1;
    this.EditorID = 0;
  }
}

export default TEDSession
