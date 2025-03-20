import T3Gv from "../../Data/T3Gv";
import T3Util from "../../Util/T3Util";


class ObjectUtil {

  /**
   * Retrieves an object pointer based on the object ID
   * @param objectId - The ID of the object to retrieve
   * @param preserveObjectBlock - Whether to preserve the block during retrieval
   * @returns The data of the retrieved object, or null if the object is not found
   */
  static GetObjectPtr(objectId, preserveObjectBlock?) {
    T3Util.Log('O.Opt GetObjectPtr - Input:', { objectId, preserveObjectBlock });

    const targetObject = T3Gv.stdObj.GetObject(objectId);

    // Return null if object not found or ID is invalid
    if (targetObject == null || objectId < 0) {
      T3Util.Log('O.Opt GetObjectPtr - Output: null (invalid object ID or not found)');
      return null;
    }

    // Determine whether to use preserved block data or direct object data
    const objectData = preserveObjectBlock
      ? T3Gv.stdObj.PreserveBlock(objectId).Data
      : targetObject.Data;

    T3Util.Log('O.Opt GetObjectPtr - Output:', objectData);
    return objectData;
  }
}

export default ObjectUtil
