
import T3Gv from '../Data/T3Gv';
import DocUtil from './DocUtil';
import OptUtil from '../Opt/Opt/OptUtil';
import WallOpt from "../Opt/Wall/WallOpt";
import Clipboard from '../Opt/Clipboard/Clipboard'
import Instance from '../Data/Instance/Instance';
import Shape from '../Data/Instance/Shape';
import Basic from '../Data/Instance/Basic';
import DataOpt from '../Opt/Data/DataOpt';
import EvtOpt from '../Event/EvtOpt';
import KeyboardOpt from '../Opt/Keyboard/KeyboardOpt';
import UserOpt from '../Opt/User/UserOpt';

/**
 * Extends the global Window interface to include T3000 HVAC application references
 */
declare global {
  interface Window {
    docUtil: any;
    wallOpt: any;
  }
}

/**
 * Polyfill for getTransformToElement method which was deprecated/removed from SVGElement
 * Calculates transformation matrix from this element to the target element
 * @param element The target SVG element
 * @returns The transformation matrix between the two elements
 */
SVGElement.prototype.getTransformToElement = function (element: SVGElement): SVGMatrix {
  return element.getScreenCTM().inverse().multiply(this.getScreenCTM());
};

class T3Opt {

  /**
   * Event operations handler for managing UI event bindings
   */
  public evtOpt: EvtOpt;

  public keyBoardOpt: KeyboardOpt;

  public userOpt: UserOpt;

  /**
   * Initializes a new instance of the DocOpt class
   */
  constructor() {
    this.evtOpt = new EvtOpt();
    this.keyBoardOpt = new KeyboardOpt();
    this.userOpt = new UserOpt();
  }

  /**
   * Initializes the document operation system
   */
  Initialize() {
    // Initialize data state and store
    DataOpt.InitStateAndStore();

    // Set up document handler and option manager
    T3Gv.docUtil = new DocUtil();
    T3Gv.opt = new OptUtil();
    T3Gv.opt.Initialize();

    // Initialize wall operations
    T3Gv.wallOpt = new WallOpt();

    // Prevent default context menu
    window.oncontextmenu = function (event) {
      event.preventDefault();
    };

    // Set up keyboard event handlers
    window.onkeydown = KeyboardOpt.OnKeyDown;
    window.onkeyup = KeyboardOpt.OnKeyUp;
    window.onkeypress = KeyboardOpt.OnKeyPress;

    // Build keyboard commands
    this.keyBoardOpt.BuildCommands();

    // Expose handlers to window for external access
    window.docUtil = T3Gv.docUtil;
    window.wallOpt = T3Gv.wallOpt;

    // Bind element control events
    this.evtOpt.BindElemCtlEvent();

    // Initialize instances
    this.InitInstance();

    // Initialize clipboard
    Clipboard.Init();

    // Load stored data
    DataOpt.InitStoredData();

    // Render all SVG objects
    T3Gv.opt.RenderAllSVGObjects();

    this.userOpt.Initialize();
  }

  /**
   * Initializes instance types
   */
  InitInstance() {
    Instance.Shape = Shape;
    Instance.Basic = Basic;
  }
}

export default T3Opt
