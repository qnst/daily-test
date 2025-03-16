
import { Type } from 'class-transformer'
import 'reflect-metadata'
import TextureScale from './TextureScale'
import NvConstant from '../Data/Constant/NvConstant'

class PaintData {

  public FillType: number;
  public Color: string;
  public EndColor: string;
  public GradientFlags: number;
  public Texture: number;

  @Type(() => TextureScale)
  public TextureScale: TextureScale;

  public Opacity: number;
  public EndOpacity: number;

  constructor(color: string) {

    this.FillType = NvConstant.FillTypes.Solid;
    this.Color = color;
    this.EndColor = NvConstant.Colors.White;
    this.GradientFlags = 0;
    this.Texture = 0;
    this.TextureScale = new TextureScale();
    this.Opacity = 1;
    this.EndOpacity = 1;

  }
}

export default PaintData
