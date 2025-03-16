

import { Type } from 'class-transformer'
import 'reflect-metadata'
import RulerConfig from "./RulerConfig"
import PageRecord from "./PageRecord"
import NvConstant from "../Data/Constant/NvConstant"
import RecentSymbol from "./RecentSymbol"
import FillData from "./FillData"
import SEDDefault from './SEDDefault'
import SEDGraphDefault from './SEDGraphDefault'
import StateConstant from '../Data/State/StateConstant'
import OptConstant from '../Data/Constant/OptConstant'

class SEDSession {

  //#region Properties

  public Type: any;
  public dim: { x: number, y: number };
  public flags: number;
  public tselect: number;
  public dupdisp: { x: number, y: number };

  @Type(() => SEDDefault)
  public def: SEDDefault;

  @Type(() => SEDGraphDefault)
  public graphDef: SEDGraphDefault;

  public RefCon: number;
  public d_sarrow: number;
  public d_sarrowdisp: boolean;
  public d_earrow: number;
  public d_earrowdisp: boolean;
  public d_arrowsize: number;
  public centersnapalign: boolean;
  public hopdimindex: number;
  public hopdim: { x: any, y: any };
  public hopstyle: any;
  public dimensions: any;
  public shapedimensions: number;

  @Type(() => FillData)
  public background: FillData;

  public bkdir: number;
  public bkid: number;
  public bkcroprect: { left: number, top: number, right: number, bottom: number };
  public bkflags: number;
  public addCount: number;
  public sequencemask: number;
  public sequencestep: number;
  public nsequencesteps: number;
  public sequenceflags: number;
  public libSelectedRestore: any;
  public chartdirection: number;
  public copyPasteTrialVers: number;
  public taskmanagementflags: number;
  public taskdays: number;
  public forcedotted: boolean;
  public moreflags: number;
  public fieldmask: number;
  public CurrentTheme: string;
  public EnableSpellCheck: boolean;

  @Type(() => RulerConfig)
  public rulerConfig: RulerConfig;

  @Type(() => PageRecord)
  public Page: PageRecord;

  @Type(() => RecentSymbol)
  public RecentSymbols: RecentSymbol[];

  public CommentListID: number;
  public CommentID: number;

  //#endregion

  constructor() {

    //#region Initialize Properties

    this.Type = StateConstant.StoredObjectType.SedSessionObject;
    this.dim = { x: 1000, y: 750 };
    this.flags = OptConstant.SessionFlags.SEDS_LLink | OptConstant.SessionFlags.SEDS_FreeHand | OptConstant.SessionFlags.SEDS_NoTreeOverlap;
    this.tselect = -1;
    this.dupdisp = { x: 0, y: 0 };
    this.def = new SEDDefault();
    this.graphDef = new SEDGraphDefault();
    this.RefCon = 0;
    this.d_sarrow = 0;
    this.d_sarrowdisp = false;
    this.d_earrow = 0;
    this.d_earrowdisp = false;
    this.d_arrowsize = 1;
    this.centersnapalign = true;
    this.hopdimindex = 1;
    this.hopdim = { x: NvConstant.HopDimX[1], y: NvConstant.HopDimY[1] };
    this.hopstyle = NvConstant.HopStyle.SDH_Arc;

    // Double change it to Select: 8 | Always: 16
    this.dimensions = NvConstant.DimensionFlags.Total;
    this.shapedimensions = 0;
    this.background = new FillData();
    this.background.Paint.FillType = NvConstant.FillTypes.Transparent;
    this.bkdir = 0;
    this.bkid = -1;
    this.bkcroprect = { left: 0, top: 0, right: 0, bottom: 0 };
    this.bkflags = 0;
    this.addCount = 0;
    this.sequencemask = 0;
    this.sequencestep = -1;
    this.nsequencesteps = 0;
    this.sequenceflags = 0;
    this.libSelectedRestore = undefined;
    this.chartdirection = 0;
    this.copyPasteTrialVers = 0;
    this.taskmanagementflags = 0;
    this.taskdays = 7;
    this.forcedotted = false;
    this.moreflags = 0;
    this.fieldmask = 0;
    this.CurrentTheme = '';
    this.EnableSpellCheck = true;
    this.rulerConfig = new RulerConfig();
    this.Page = new PageRecord();
    this.RecentSymbols = [];
    this.CommentListID = -1;
    this.CommentID = -1;

    //#endregion
  }
}

export default SEDSession
