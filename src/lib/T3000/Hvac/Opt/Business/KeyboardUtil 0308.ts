
import ToolUtil from './ToolUtil'
import ConstantData2 from '../../Data/ConstantData2'

class KBUConstant {
  static Contexts = {
    None: - 1,
    All: 0,
    Text: 1,
    Table: 2,
    Automation: 3,
    DimensionText: 4,
    FloorPlan: 5,
    Note: 6,
    Navigation: 7,
    AutomationNoCtrl: 8,
    ReadOnly: 9
  }

  static ModifierKeys = {
    None: 0,
    Ctrl: 1,
    Shift: 2,
    Alt: 3,
    Ctrl_Alt: 4,
    Ctrl_Shift: 5,
    Shift_Alt: 6
  }
}

class KeyboardUtil {

  public Name: string;
  public Context: string;
  public ModifierKey: string;
  public KeyCode: string;
  public Command: string;
  public CommandParent: string;
  public CommandParams: string;
  Execute: () => any;
  public KeyboardCommands: any;

  constructor() {
    this.KeyboardCommands = { All: [] }
  }

  /**
   * Creates a keyboard command with the specified properties
   * @param name - Name of the keyboard command
   * @param context - Context in which the command is active
   * @param modifierKey - Modifier key required for the command (e.g. Ctrl, Alt)
   * @param keyCode - Key code that triggers the command
   * @param commandFunction - Function to execute when command is triggered
   * @param commandParent - Parent object on which to call the command function
   * @param commandParams - Parameters to pass to the command function
   */
  BuildCommand(name, context, modifierKey, keyCode, commandFunction, commandParent, commandParams?) {
    console.log('U.KeyboardUtil: Creating keyboard command', name, context, modifierKey, keyCode);

    this.Name = name !== null ? name : null;
    this.Context = context !== null ? context : KBUConstant.Contexts.None;
    this.ModifierKey = modifierKey !== null ? modifierKey : KBUConstant.ModifierKeys.None;
    this.KeyCode = keyCode !== null ? keyCode : null;

    this.Command = typeof commandFunction === 'function' ? commandFunction : function () {
      alert('Keyboard command \'' + this.Name + '\' (' + this.ModifierKey + ' + ' + this.KeyCode + ') is unbound.');
    };

    this.CommandParent = commandParent !== null ? commandParent : this;
    this.CommandParams = commandParams !== null ? commandParams : [];

    /**
     * Executes the keyboard command with its defined parameters
     * @returns Result of the command execution
     */
    this.Execute = function () {
      console.log('U.KeyboardUtil: Executing command', this.Name);
      const result = this.Command.apply(this.CommandParent, this.CommandParams);
      console.log('U.KeyboardUtil: Command execution complete', this.Name);
      return result;
    };
  }

  BuildCommands = function () {
    const ctx = KBUConstant.Contexts;
    const mfk = KBUConstant.ModifierKeys;
    const tlu = new ToolUtil();

    // var e = Resources,
    // t = Resources.ModifierKeys,
    // a = Commands.MainController,
    // r = a.Shapes,
    // i = a.Business,
    // n = a.ConnectionPoints;
    this.KeyboardCommands.All = [
      this.BuildCommand('Copy', ctx.All, mfk.Ctrl, ConstantData2.Keys.C, tlu.Copy, tlu),
      this.BuildCommand('Cut', ctx.All, mfk.Ctrl, ConstantData2.Keys.X, tlu.Cut, tlu),
      this.BuildCommand('Paste', ctx.All, mfk.Ctrl, ConstantData2.Keys.V, tlu.Paste, tlu),
      this.BuildCommand('Undo', ctx.All, mfk.Ctrl, ConstantData2.Keys.Z, tlu.Undo, tlu),
      // new KeyboardUtil('Redo', ctx.All, mfk.Ctrl, ConstantData2.Keys.Y, tlu.Redo, tlu),
      // new KeyboardUtil('SelectAll', ctx.All, mfk.Ctrl, ConstantData2.Keys.A, tlu.SelectAllObjects, tlu),
      // new KeyboardUtil('Delete', ctx.All, mfk.None, ConstantData2.Keys.Delete, tlu.DeleteSelectedObjects, tlu),
      // new KeyboardUtil('Delete', ctx.All, mfk.None, ConstantData2.Keys.Backspace, tlu.DeleteSelectedObjects, tlu),
      // new KeyboardUtil('Cancel', ctx.All, mfk.None, ConstantData2.Keys.Escape, tlu.CancelModalOperation, tlu),
      // new KeyboardUtil('Group', ctx.All, mfk.Ctrl, ConstantData2.Keys.G, tlu.GroupSelectedShapes, tlu),
      // new KeyboardUtil('Ungroup', ctx.All, mfk.Ctrl_Shift, ConstantData2.Keys.G, tlu.UngroupSelectedShapes, tlu),
      // new KeyboardUtil('Duplicate', ctx.All, mfk.Ctrl, ConstantData2.Keys.D, tlu.Duplicate, tlu),
      // new KeyboardUtil('Find', ctx.All, mfk.Ctrl, ConstantData2.Keys.F, a.ShowModal, a, [Resources.Controls.Modals.Find.Id]),
      // new KeyboardUtil('Replace', ctx.All, mfk.Ctrl, ConstantData2.Keys.H, tlu.Replace, tlu),
      // new KeyboardUtil('Bold', ctx.Text, mfk.Ctrl, ConstantData2.Keys.B, tlu.BoldText, tlu),
      // new KeyboardUtil('Italic', ctx.Text, mfk.Ctrl, ConstantData2.Keys.I, tlu.ItalicText, tlu),
      // new KeyboardUtil('Underline', ctx.Text, mfk.Ctrl, ConstantData2.Keys.U, tlu.UnderlineText, tlu),
      // new KeyboardUtil('Save', ctx.All, mfk.Ctrl, ConstantData2.Keys.S, a.Save, a),
      // new KeyboardUtil('ZoomIn', ctx.All, mfk.Ctrl, ConstantData2.Keys.Add, a.ZoomIn, a),
      // new KeyboardUtil('ZoomOut', ctx.All, mfk.Ctrl, ConstantData2.Keys.Subtract, a.ZoomOut, a),
      // new KeyboardUtil('ZoomIn', ctx.All, mfk.Ctrl, ConstantData2.Keys.Equal_Sign, a.ZoomIn, a),
      // new KeyboardUtil('ZoomOut', ctx.All, mfk.Ctrl, ConstantData2.Keys.Dash, a.ZoomOut, a),
      // new KeyboardUtil('ReplaySVGEvents', ctx.All, mfk.Ctrl, ConstantData2.Keys.E, a.ReplaySVGEvents, a),
      // new KeyboardUtil('RecordSVGEvents', ctx.All, mfk.Ctrl, ConstantData2.Keys.R, a.RecordSVGEvents, a),
      // // new KeyboardUtil(  'SetEditorToCollaborate',  ctx.All,    mfk.Ctrl,   ConstantData2.Keys.F1,  a.SetEditorToCollaborate,   a  ),
      // new KeyboardUtil('SDF.BuildBlockList', ctx.All, mfk.Ctrl, ConstantData2.Keys.F2, a.BuildBlockList, a),
      // new KeyboardUtil('SDF.ReadBlockList', ctx.All, mfk.Ctrl, ConstantData2.Keys.F3, a.ReadBlockList, a),
      // new KeyboardUtil('Hyperlink', ctx.All, mfk.Ctrl, ConstantData2.Keys.K, tlu.AddHyperlink, tlu)
    ];
    // this.KeyboardCommands.ReadOnly = [
    //   new KeyboardUtil('ZoomIn', ctx.All, mfk.Ctrl, ConstantData2.Keys.Add, a.ZoomIn, a),
    //   new KeyboardUtil('ZoomOut', ctx.All, mfk.Ctrl, ConstantData2.Keys.Subtract, a.ZoomOut, a),
    //   new KeyboardUtil('ZoomIn', ctx.All, mfk.Ctrl, ConstantData2.Keys.Equal_Sign, a.ZoomIn, a),
    //   new KeyboardUtil('ZoomOut', ctx.All, mfk.Ctrl, ConstantData2.Keys.Dash, a.ZoomOut, a)
    // ];
    // this.KeyboardCommands.Text = [
    //   new KeyboardUtil('Copy', ctx.Text, mfk.Ctrl, ConstantData2.Keys.C, tlu.Copy, tlu),
    //   new KeyboardUtil('Cut', ctx.Text, mfk.Ctrl, ConstantData2.Keys.X, tlu.Cut, tlu),
    //   new KeyboardUtil('Paste', ctx.Text, mfk.Ctrl, ConstantData2.Keys.V, tlu.Paste, tlu),
    //   new KeyboardUtil('Undo', ctx.Text, mfk.Ctrl, ConstantData2.Keys.Z, tlu.Undo, tlu),
    //   new KeyboardUtil('Redo', ctx.Text, mfk.Ctrl, ConstantData2.Keys.Y, tlu.Redo, tlu),
    //   new KeyboardUtil('Bold', ctx.Text, mfk.Ctrl, ConstantData2.Keys.B, tlu.BoldText, tlu),
    //   new KeyboardUtil('Italic', ctx.Text, mfk.Ctrl, ConstantData2.Keys.I, tlu.ItalicText, tlu),
    //   new KeyboardUtil('Underline', ctx.Text, mfk.Ctrl, ConstantData2.Keys.U, tlu.UnderlineText, tlu),
    //   // new KeyboardUtil(  'SetEditorToCollaborate',   ctx.All,    mfk.Ctrl,  ConstantData2.Keys.F1,   a.SetEditorToCollaborate,  a  ),
    //   new KeyboardUtil('SDF.BuildBlockList', ctx.All, mfk.Ctrl, ConstantData2.Keys.F2, a.BuildBlockList, a),
    //   new KeyboardUtil('SDF.ReadBlockList', ctx.All, mfk.Ctrl, ConstantData2.Keys.F3, a.ReadBlockList, a)
    // ];
  }
}

export default KeyboardUtil
