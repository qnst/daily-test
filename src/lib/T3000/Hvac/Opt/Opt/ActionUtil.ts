import T3Gv from "../../Data/T3Gv";
import T3Util from "../../Util/T3Util";
import ObjectUtil from "../Data/ObjectUtil";
import LayerUtil from "./LayerUtil";


class ActionUtil {

  /**
   * Clears all action arrow timers for visible objects in the system.
   * This function iterates through all visible objects and removes any active
   * hide timers associated with action arrows, preventing scheduled hiding
   * actions from executing.
   * @returns {void}
   */
  static ClearAllActionArrowTimers() {
    T3Util.Log('O.Opt ClearAllActionArrowTimers: input');

    const visibleObjects = LayerUtil.VisibleZList();

    for (let objectIndex = 0; objectIndex < visibleObjects.length; objectIndex++) {
      const visibleObject = ObjectUtil.GetObjectPtr(visibleObjects[objectIndex], false);

      if (visibleObject && visibleObject.actionArrowHideTimerID !== -1) {
        // Clear the existing timeout and reset the timer ID
        T3Gv.opt.actionArrowHideTimer.clearTimeout(visibleObject.actionArrowHideTimerID);
        visibleObject.actionArrowHideTimerID = -1;
      }
    }

    T3Util.Log('O.Opt ClearAllActionArrowTimers: output');
  }
}

export default ActionUtil
