import T3Constant from "../../Data/Constant/T3Constant";
import T3Gv from "../../Data/T3Gv";
import T3Util from "../../Util/T3Util";
import ObjectUtil from "../Data/ObjectUtil";
import SelectUtil from "./SelectUtil";

class OptCMUtil {

  /**
   * Determines the current type of content stored in the clipboard
   * This function checks various application states and clipboard contents
   * to determine what kind of data is currently available for pasting.
   *
   * @returns The identified clipboard content type (Text, LM, Table, or None)
   */
  static GetClipboardType() {
    T3Util.Log('O.Opt GetClipboardType - Input: No parameters');

    // Get the text edit session data
    const textEditData = ObjectUtil.GetObjectPtr(T3Gv.opt.teDataBlockId, false);

    // Initialize clipboard
    T3Gv.clipboard.Get();

    let clipboardType;

    // Check if text or note editing is currently active
    const isTextEditActive = textEditData.theActiveTextEditObjectID !== -1;
    const isNoteEditActive = T3Gv.opt.bInNoteEdit;

    if (isTextEditActive || isNoteEditActive) {
      // Determine clipboard type while in text/note editing mode
      if (T3Gv.opt.textClipboard && T3Gv.opt.textClipboard.text) {
        clipboardType = T3Constant.ClipboardType.Text;
      } else {
        clipboardType = T3Constant.ClipboardType.None;
      }
    }
    // Check for Layout Manager content in clipboard
    else if (T3Gv.opt.contentHeader.ClipboardBuffer &&
      T3Gv.opt.contentHeader.ClipboardType === T3Constant.ClipboardType.LM) {
      clipboardType = T3Constant.ClipboardType.LM;
    }
    // Check for text selection with available clipboard text
    else if (SelectUtil.GetTargetSelect() >= 0 &&
      T3Gv.opt.textClipboard &&
      T3Gv.opt.textClipboard.text) {
      clipboardType = T3Constant.ClipboardType.Text;
    }
    // Default: no valid clipboard content
    else {
      clipboardType = T3Constant.ClipboardType.None;
    }

    T3Util.Log('O.Opt GetClipboardType - Output:', clipboardType);
    return clipboardType;
  }

  /**
   * Converts pixel values to point values for font size calculations
   * This function is used when displaying font sizes that are stored in pixels but need to be shown in points.
   * The conversion uses the standard DPI relationship between pixels and points (72 points per inch).
   *
   * @param pixelValue - The font size in pixels to convert
   * @returns The equivalent font size in points, rounded to the nearest 0.5
   */
  static PixelstoPoints(pixelValue) {
    return Math.floor(100 * pixelValue / 72 + 0.5);
  }

}

export default OptCMUtil
