
import ConstantData from "../Data/ConstantData"

class ContainerList {

  public Arrangement: number;
  public HorizontalSpacing: number;
  public VerticalSpacing: number;
  public AlignH: string;
  public AlignV: string;
  public Wrap: number;
  public height: number;
  public width: number;
  public MinWidth: number;
  public MinHeight: number;
  public flags: number;
  public nacross: number;
  public ndown: number;
  public childwidth: number;
  public childheight: number;
  public List: any[];

  constructor() {
    this.Arrangement = ConstantData.ContainerListArrangements.Column;
    this.HorizontalSpacing = 10;
    this.VerticalSpacing = 10;
    this.AlignH = 'center';
    this.AlignV = 'top';
    this.Wrap = 0;
    this.height = 0;
    this.width = 0;
    this.MinWidth = 150 + 2 * this.VerticalSpacing;
    this.MinHeight = 75 + 2 * this.HorizontalSpacing;
    this.flags = 0;
    this.nacross = 1;
    this.ndown = 1;
    this.childwidth = 150;
    this.childheight = 75;
    this.List = [];
  }
}

export default ContainerList
