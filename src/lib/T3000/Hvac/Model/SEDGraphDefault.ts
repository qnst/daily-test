
import { Type } from 'class-transformer'
import 'reflect-metadata'
import NvConstant from "../Data/Constant/NvConstant"
import QuickStyle from "./QuickStyle"

class SEDGraphDefault {

  public type: number;
  public flags: number;
  public pointflags: number;
  public catAxisflags: number;
  public magAxisflags: number;
  public legendType: number;
  public legendlayoutflags: number;
  public imagevaluerep: number;
  public quadrant: number;

  @Type(() => QuickStyle)
  public style: QuickStyle;

  @Type(() => QuickStyle)
  public areaStyle: QuickStyle;

  @Type(() => QuickStyle)
  public gridStyle: QuickStyle;

  @Type(() => QuickStyle)
  public titleStyle: QuickStyle;

  @Type(() => QuickStyle)
  public legendStyle: QuickStyle;

  @Type(() => QuickStyle)
  public legendTitleStyle: QuickStyle;

  @Type(() => QuickStyle)
  public catAxisStyle: QuickStyle;

  @Type(() => QuickStyle)
  public catAxisTitleStyle: QuickStyle;

  @Type(() => QuickStyle)
  public magAxisStyle: QuickStyle;

  @Type(() => QuickStyle)
  public magAxisTitleStyle: QuickStyle;

  @Type(() => QuickStyle)
  public pointStyle: QuickStyle;

  @Type(() => QuickStyle)
  public pointLabelStyle: QuickStyle;

  constructor() {
    this.type = NvConstant.GraphType.Bar;
    this.flags = NvConstant.GraphFlags.SequenceByCategory;
    this.pointflags = 0;
    this.catAxisflags = NvConstant.AxisFlags.DaxShowGridLineMajor | NvConstant.AxisFlags.DaxHideMinorTicks;
    this.magAxisflags = NvConstant.AxisFlags.DaxShowGridLineMajor;
    this.legendType = NvConstant.LegendType.DaxLegendFull;
    this.legendlayoutflags = 0;
    this.imagevaluerep = - 1;
    this.quadrant = 0;
    this.style = new QuickStyle();
    this.areaStyle = new QuickStyle();
    this.gridStyle = new QuickStyle();
    this.titleStyle = new QuickStyle();
    this.legendStyle = new QuickStyle();
    this.legendTitleStyle = new QuickStyle();
    this.catAxisStyle = new QuickStyle();
    this.catAxisTitleStyle = new QuickStyle();
    this.magAxisStyle = new QuickStyle();
    this.magAxisTitleStyle = new QuickStyle();
    this.pointStyle = new QuickStyle();
    this.pointLabelStyle = new QuickStyle();
  }
}

export default SEDGraphDefault



