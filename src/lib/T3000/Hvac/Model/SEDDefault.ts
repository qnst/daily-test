
import { Type } from 'class-transformer'
import 'reflect-metadata'
import NvConstant from "../Data/Constant/NvConstant"
import FontRecord from "./FontRecord"
import QuickStyle from './QuickStyle'
import OptConstant from '../Data/Constant/OptConstant'

class SEDDefault {

  @Type(() => QuickStyle)
  public style: QuickStyle;
  public just: string;
  public vjust: string;

  @Type(() => FontRecord)
  public lf: FontRecord;

  public textflags: number;
  public textgrow: number;
  public fsize_min: number;
  public tmargins: { left: number, top: number, right: number, bottom: number };
  public flags: number;
  public h_arraywidth: number;
  public v_arraywidth: number;
  public lastcommand: number;
  public arrayht: number;
  public arraywd: number;
  public wallThickness: number;
  public curveparam: number;
  public rrectparam: number;
  public pen: {};
  public highlighter: {};

  constructor() {
    this.style = new QuickStyle();
    this.just = 'center';
    this.vjust = 'center';
    this.lf = new FontRecord();
    this.textflags = 0;
    this.textgrow = NvConstant.TextGrowBehavior.PROPORTIONAL;
    this.fsize_min = 8;
    this.tmargins = { left: OptConstant.Defines.SED_DefTMargin, top: OptConstant.Defines.SED_DefTMargin, right: OptConstant.Defines.SED_DefTMargin, bottom: OptConstant.Defines.SED_DefTMargin };
    this.flags = 0;
    this.h_arraywidth = 50;
    this.v_arraywidth = 50;
    this.lastcommand = 0;
    this.arrayht = 25;
    this.arraywd = 25;
    this.wallThickness = 0;
    this.curveparam = 0;
    this.rrectparam = OptConstant.Defines.DefFixedRRect;
    this.pen = {};
    this.highlighter = {};
  }
}

export default SEDDefault
