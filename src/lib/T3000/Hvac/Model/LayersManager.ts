
import { Type } from 'class-transformer'
import 'reflect-metadata'
import Layer from './Layer'
import StateConstant from '../Data/State/StateConstant';

class LayersManager {
  public Type: string;
  public nlayers: number;

  @Type(() => Layer)
  public layers: Layer[];

  public activelayer: number;

  // Double ===
  public swimlanelist: any[];

  constructor() {
    this.Type = StateConstant.StoredObjectType.LayersManagerObject;
    this.nlayers = 0;
    this.layers = new Array<Layer>();
    this.activelayer = 0;
    this.swimlanelist = [];
  }
}

export default LayersManager
