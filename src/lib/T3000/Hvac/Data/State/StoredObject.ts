

import Globals from "../Globals"
import T3Gv from "../T3Gv"
import Utils1 from "../../Helper/Utils1"

class StoredObject {

  public ID: number;
  public Dirty: boolean;
  public Type: number;
  public Data: any;
  public IsPersisted: boolean;
  public StateOperationTypeID: number;

  constructor(id, type, data, isDirty, isPersisted, addToGlobal?) {
    this.ID = id === parseInt(id, 10) && id >= 0 ? id : - 1;
    this.Dirty = isDirty || false;
    this.Type = type || null;
    this.Data = data || null;
    this.IsPersisted = false !== isPersisted;
    this.StateOperationTypeID = null;

    if (this.Data && Utils1.isObject(this.Data)) {
      this.Data.BlockID = id;
    }

    if (addToGlobal === undefined || addToGlobal === false || addToGlobal === null) {
      return this;
    }

    if (undefined !== T3Gv.objectStore && true === this.IsPersisted) {
      if (- 1 != this.ID) {
        var n = T3Gv.objectStore.GetObject(this.ID);
        if (undefined !== n) {
          if (n == null) {
            return null;
          }
          else {
            n.Type = type ? this.Type : n.Type;
            n.Data = data ? this.Data : n.Data;
            n.Dirty = isDirty ? this.Dirty : n.Dirty;
            n.StateOperationTypeID = Globals.StateOperationType.UPDATE;
            T3Gv.objectStore.SaveObject(n);

            return n;
          }
        }
      } else {
        this.StateOperationTypeID = Globals.StateOperationType.CREATE;
        T3Gv.objectStore.SaveObject(this);
      }
    }
  }

  Delete = () => {
    T3Gv.objectStore.DeleteObject(this.ID)
  }
}

export default StoredObject
