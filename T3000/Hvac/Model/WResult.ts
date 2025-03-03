
import WindowSettings from './WindowSettings'

class WResult {

  //#region Properties

  public error: number;
  public coordScaleFactor: number;
  public sdp: any;
  public tLMB: any;
  public ctp: any;
  public WindowSettings: any;
  public docDpi: number;
  public fontlist: any[];
  public lpStyles: any[];
  public UniqueMap: any[];
  public zList: any[];
  public links: any[];
  public textlinks: any[];
  public polyid: number;
  public nsegl: number;
  public arrayid: number;
  public GroupOffset: { x: number; y: number };
  public rulerSettings: any;
  public WriteBlocks: boolean;
  public noTables: boolean;
  public WriteGroupBlock: boolean;
  public selectonly: boolean;
  public nblocks: number;
  public BlockAction: number;
  public state: number;
  public delta: number;
  public TextureList: any[];
  public LibraryPathTarget: string;
  public RichGradients: any[];
  public WriteVisio: boolean;
  public KeepSegDir: boolean;
  public WriteWin32: boolean;

  //#endregion

  constructor() {

    //#region Init Properties

    this.error = 0;
    this.coordScaleFactor = 1;
    this.sdp = null;
    this.tLMB = null;
    this.ctp = null;
    this.WindowSettings = new WindowSettings();
    this.docDpi = 100;
    this.fontlist = [];
    this.lpStyles = [];
    this.UniqueMap = [];
    this.zList = [];
    this.links = [];
    this.textlinks = [];
    this.polyid = 0;
    this.nsegl = 0;
    this.arrayid = 0;
    this.GroupOffset = { x: 0, y: 0 };
    this.rulerSettings = null;
    this.WriteBlocks = false;
    this.noTables = false;
    this.WriteGroupBlock = false;
    this.selectonly = false;
    this.nblocks = 0;
    this.BlockAction = 0;
    this.state = 0;
    this.delta = 0;
    this.TextureList = [];
    this.LibraryPathTarget = '';
    this.RichGradients = [];
    this.WriteVisio = false;
    this.KeepSegDir = false;
    this.WriteWin32 = false;

    //#endregion
  }
}

export default WResult
