
import T3Gv from "../T3Gv"

class StateBase {

  public ID: number;
  public CreatedBy: string;
  public StateType: number;
  public IsOpen: boolean;
  public CURRENT_SEQ_OBJECT_ID: number;

  constructor(id?: number, createdBy?: string, stateType?: number, isOpen?: boolean) {
    this.ID = id != null ? id : -1;
    this.CreatedBy = createdBy || null;
    this.StateType = stateType || null;
    this.IsOpen = isOpen != null ? isOpen : true;
    this.CURRENT_SEQ_OBJECT_ID = T3Gv.CURRENT_SEQ_OBJECT_ID;
  }
}

export default StateBase
