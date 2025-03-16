
import { Type } from 'class-transformer'
import 'reflect-metadata'

import FillData from './FillData'
import LineData from './LineData'
import OutsideEffectData from './OutsideEffectData'
import TextFormatData from './TextFormatData'

class QuickStyle {
  public Name: string;

  @Type(() => LineData)
  public Border: LineData;

  @Type(() => FillData)
  public Fill: FillData;

  @Type(() => LineData)
  public Line: LineData;

  @Type(() => OutsideEffectData)
  public OutsideEffect: OutsideEffectData;

  @Type(() => TextFormatData)
  public Text: TextFormatData;

  constructor() {
    this.Name = 'Style7';
    this.Fill = new FillData();
    this.Border = new LineData();
    this.OutsideEffect = new OutsideEffectData();
    this.Text = new TextFormatData();
    this.Line = new LineData();
  }
}

export default QuickStyle


