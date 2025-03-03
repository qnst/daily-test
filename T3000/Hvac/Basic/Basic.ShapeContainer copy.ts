



// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import Basic from "./Basic.Index";
// import GPP from "../gListManager";
import $ from 'jquery';
import HvacSVG from "../Helper/SVG.t2"

import Global from "./Basic.Global";



import Group from "./Basic.Group";
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"


class ShapeContainer extends Group {

  public shapeGroup: any;

  constructor() {
    super()
  }

  // GetInstanceName(){
  //   return "Group";
  // }
  // Basic.ShapeContainer = function () {
  // },
  // Basic.ShapeContainer.prototype = new Basic.Group,
  // Basic.ShapeContainer.prototype.constructor = Basic.ShapeContainer

  CreateElement(e, t) {
    //'use strict';
    return this.svgObj = new HvacSVG.Container(HvacSVG.create('g')),
      this.InitElement(e, t),
      this.shapeGroup = new Group(),
      this.shapeGroup.CreateElement(e, t),
      // Basic.Container.prototype.AddElement.call(this, this.shapeGroup),
      // Container.prototype.AddElement.call(this, this.shapeGroup),
      super.AddElement(this.shapeGroup),
      this.svgObj
  }

  AddElement(e, t, a) {
    return a ?
      //  Basic.Container.prototype.AddElement.call(this, e, t) :
      super.AddElement(e, t) :
      this.shapeGroup ? this.shapeGroup.AddElement(e, t) : void 0
  }

  RemoveElement(e, t) {
    return t ?
      // Basic.Container.prototype.RemoveElement.call(this, e) :
      super.RemoveElement(e) :
      this.shapeGroup ? this.shapeGroup.RemoveElement(e) : void 0
  }

  RemoveAll(e) {
    return e ?
      // Basic.Container.prototype.RemoveAll.call(this) :
      super.RemoveAll() :
      this.shapeGroup ? this.shapeGroup.RemoveAll() : void 0
  }

  RemoveElementByInternalID(e, t) {
    return t ?
      //  Basic.Container.prototype.RemoveElementByInternalID.call(this, e) :
      super.RemoveElementByInternalID(e) :
      this.shapeGroup ? this.shapeGroup.RemoveElementByInternalID(e) : void 0
  }

  ElementCount(e) {
    return e ?
      // Basic.Container.prototype.ElementCount.call(this) :
      super.ElementCount() :
      this.shapeGroup ? this.shapeGroup.ElementCount() : 0
  }

  GetElementByIndex(e, t) {
    return t ?
      // Basic.Container.prototype.GetElementByIndex.call(this, e) :
      super.GetElementByIndex(e) :
      this.shapeGroup ? this.shapeGroup.GetElementByIndex(e) : null
  }

  GetElementByID(e, t, a) {
    return a ?
      // Basic.Container.prototype.GetElementByID.call(this, e, t) :
      super.GetElementByID(e, t) :
      this.shapeGroup ? this.shapeGroup.GetElementByID(e, t) : null
  }

  GetElementByIDInGroup(e, t) {
    return t ?
      // Basic.Container.prototype.GetElementByIDInGroup.call(this, e) :
      super.GetElementByIDInGroup(e) :
      this.shapeGroup ? this.shapeGroup.GetElementByIDInGroup(e) : null
  }

  GetElementListWithID(e, t) {
    return t ?
      // Basic.Container.prototype.GetElementListWithID.call(this, e) :
      super.GetElementListWithID(e) :
      this.shapeGroup ? this.shapeGroup.GetElementListWithID(e) : []
  }

  GetElementByInternalID(e, t) {
    return t ?
      //  Basic.Container.prototype.GetElementByInternalID.call(this, e) :
      super.GetElementByInternalID(e) :
      this.shapeGroup ? this.shapeGroup.GetElementByInternalID(e) : null
  }

  FindElement(e, t) {
    return t ?
      // Basic.Container.prototype.FindElement.call(this, e) :
      super.FindElement(e) :
      this.shapeGroup ? this.shapeGroup.FindElement(e) : null
  }

  FindElementByDOMElement(e, t) {
    return t ?
      // Basic.Container.prototype.FindElementByDOMElement.call(this, e) :
      super.FindElementByDOMElement(e) :
      this.shapeGroup ? this.shapeGroup.FindElementByDOMElement(e) : null
  }

  GetElementIndex(e, t) {
    return t ?
      // Basic.Container.prototype.GetElementIndex.call(this, e) :
      super.GetElementIndex(e) :
      this.shapeGroup ? this.shapeGroup.GetElementIndex(e) : - 1
  }

  MoveElementForeward(e, t) {
    return t ?
      // Basic.Container.prototype.MoveElementForeward.call(this, e) :
      super.MoveElementForeward(e) :
      this.shapeGroup ? this.shapeGroup.MoveElementForeward(e) : void 0
  }

  MoveElementBackward(e, t) {
    return t ?
      // Basic.Container.prototype.MoveElementBackward.call(this, e) :
      super.MoveElementBackward(e) :
      this.shapeGroup ? this.shapeGroup.MoveElementBackward(e) : void 0
  }

  MoveElementToFront(e, t) {
    return t ?
      // Basic.Container.prototype.MoveElementToFront.call(this, e) :
      super.MoveElementToFront(e) :
      this.shapeGroup ? this.shapeGroup.MoveElementToFront(e) : void 0
  }

  MoveElementToBack(e, t) {
    return t ?
      // Basic.Container.prototype.MoveElementToBack.call(this, e) :
      super.MoveElementToBack(e) :
      this.shapeGroup ? this.shapeGroup.MoveElementToBack(e) : void 0
  }

}

export default ShapeContainer;





// export default Basic.ShapeContainer;
