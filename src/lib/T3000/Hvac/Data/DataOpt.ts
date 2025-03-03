

import GlobalData from '../Data/GlobalData'
import StateManager from '../Data/State/StateManager'
import ObjectStore from '../Data/State/ObjectStore'
import ObjectStoreFactory from '../Data/State/ObjectStoreFactory'
import { plainToInstance, } from 'class-transformer'
import 'reflect-metadata'
import State from './State/State'
import StoredObject from './State/StoredObject'
import SEDSession from '../Model/SEDSession'
import LayersManager from '../Model/LayersManager'
import TEDSession from '../Model/TEDSession'
import Instance from './Instance/Instance'

class DataOpt {

  static readonly clipboardManagerKey: string = "T3.clipboardManager";
  static readonly stateManagerKey: string = "T3.stateManager";
  static readonly objectStoreKey: string = "T3.objectStore";
  static readonly CURRENT_SEQ_OBJECT_IDKey: string = "T3.CURRENT_SEQ_OBJECT_ID";

  // Call this function to load data from localstorage after global data been initialized

  static InitStoredData() {

    // Only restore the state and clipboard in dev env to reduce the json file size
    this.InitClipboardManager();

    this.InitStateManager();

    this.InitObjectStore();

    this.InitCurrentSeqObjectId();
  }

  static InitClipboardManager() {

  }

  static InitStateManager() {
    const stateManagerJsonObj = this.LoadData(this.stateManagerKey);

    if (stateManagerJsonObj === null) {
      console.log('=== init from localstorage->stateManagerJsonObj is null');
      return;
    }

    const stateManagerCls = plainToInstance(StateManager, stateManagerJsonObj);

    for (let i = 0; i < stateManagerCls.States.length; i++) {

      const stateCls = plainToInstance(State, stateManagerCls.States[i]);

      for (let j = 0; j < stateCls.StoredObjects.length; j++) {

        const storedObjectCls = this.TransferStoredObjectCls(stateCls.StoredObjects[j]);

        stateCls.StoredObjects[j] = storedObjectCls as unknown as ObjectStore;
      }

      stateManagerCls.States[i] = stateCls;
    }

    // test init stateManager is correct
    console.log('re-parse-to-json stateManagerCls', JSON.stringify(stateManagerCls));

    GlobalData.stateManager = stateManagerCls;
  }

  static InitObjectStore() {
    const objectStoreJsonObj = this.LoadData(this.objectStoreKey);

    if (objectStoreJsonObj === null) {
      console.log('=== init from localstorage->objectStoreJsonObj is null');
      return;
    }

    const objectStoreCls = plainToInstance(ObjectStore, objectStoreJsonObj);

    for (let i = 0; i < objectStoreCls.StoredObjects.length; i++) {


      /*
      const storedObjectCls = plainToInstance(StoredObject, objectStoreCls.StoredObjects[i]);
      const storedObjectData = storedObjectCls.Data;

      if (storedObjectData.Type === 'SEDSession') {
        const sedSessionData = plainToInstance(SEDSession, storedObjectData);
        storedObjectCls.Data = sedSessionData;

        console.log('sedSessionData', sedSessionData);
      }

      if (storedObjectData.Type === 'LayersManager') {
        const layersManagerData = plainToInstance(LayersManager, storedObjectData);
        storedObjectCls.Data = layersManagerData;

        console.log('layersManagerData', layersManagerData);
      }

      if (storedObjectData.Type === 'TEDSession') {
        const tedSessionData = plainToInstance(TEDSession, storedObjectData);
        storedObjectCls.Data = tedSessionData;

        console.log('tedSessionData', tedSessionData);
      }

      if (storedObjectData.Type === 'BaseDrawingObject') {

        // SHAPE: 0, LINE: 1,  CONNECTOR: 3
        if (storedObjectData.DrawingObjectBaseClass === 1) {
          const lineData = plainToInstance(Instance.Shape.Line, storedObjectData);
          storedObjectCls.Data = lineData;

          console.log('lineData', lineData);
        }

        if (storedObjectData.DrawingObjectBaseClass === 0) {
          if (storedObjectData.ShapeType === 'Oval') {

            const ovalData = plainToInstance(Instance.Shape.Oval, storedObjectData);
            storedObjectCls.Data = ovalData;

            console.log('ovalData', ovalData);
          }

          if (storedObjectData.ShapeType === 'Rect') {

            const rectData = plainToInstance(Instance.Shape.Rect, storedObjectData);
            storedObjectCls.Data = rectData;

            console.log('rectData', rectData);
          }

          if (storedObjectData.ShapeType === 'Polygon') {

            const polygonData = plainToInstance(Instance.Shape.Polygon, storedObjectData);
            storedObjectCls.Data = polygonData

          }

          if (storedObjectData.ShapeType === "PolyLineContainer") {
            const polyLineContainerData = plainToInstance(Instance.Shape.PolyLineContainer, storedObjectData);
            storedObjectCls.Data = polyLineContainerData;

            console.log('polyLineContainerData', polyLineContainerData);
          }
        }

        if (storedObjectData.DrawingObjectBaseClass === 3) {
          const connectorData = plainToInstance(Instance.Shape.Connector, storedObjectData);
          storedObjectCls.Data = connectorData;

          console.log('connectorData', connectorData);
        }
      }

      */

      const storedObjectCls = this.TransferStoredObjectCls(objectStoreCls.StoredObjects[i]);

      objectStoreCls.StoredObjects[i] = storedObjectCls as unknown as ObjectStore;
    }

    // test init stateManager is correct
    console.log('re-parse-to-json objectStoreCls', JSON.stringify(objectStoreCls));

    GlobalData.objectStore = objectStoreCls;
  }

  static InitCurrentSeqObjectId() {
    const currentSeqObjectIdJsonObj = this.LoadData(this.CURRENT_SEQ_OBJECT_IDKey);

    if (currentSeqObjectIdJsonObj === null) {
      console.log('=== init from localstorage->currentSeqObjectIdJsonObj is null');
      return;
    }

    GlobalData.CURRENT_SEQ_OBJECT_ID = currentSeqObjectIdJsonObj;
  }


  static TransferStoredObjectCls(storedObjectJson) {

    const storedObjectCls = plainToInstance(StoredObject, storedObjectJson/* stateCls.StoredObjects[j]*/);
    const storedObjectData = storedObjectCls.Data;

    if (storedObjectData.Type === 'SEDSession') {
      const sedSessionData = plainToInstance(SEDSession, storedObjectData);
      storedObjectCls.Data = sedSessionData;
      storedObjectCls.Data.dimensions = 146;

      console.log('sedSessionData', sedSessionData);
    }

    if (storedObjectData.Type === 'LayersManager') {
      const layersManagerData = plainToInstance(LayersManager, storedObjectData);
      storedObjectCls.Data = layersManagerData;

      console.log('layersManagerData', layersManagerData);
    }

    if (storedObjectData.Type === 'TEDSession') {
      const tedSessionData = plainToInstance(TEDSession, storedObjectData);
      storedObjectCls.Data = tedSessionData;

      console.log('tedSessionData', tedSessionData);
    }

    if (storedObjectData.Type === 'BaseDrawingObject') {

      // SHAPE: 0, LINE: 1,  CONNECTOR: 3
      if (storedObjectData.DrawingObjectBaseClass === 1) {

        if (storedObjectData?.T3Type === "PolyLineContainer") {
          const polyLineContainerData = plainToInstance(Instance.Shape.PolyLineContainer, storedObjectData);
          storedObjectCls.Data = polyLineContainerData;

          console.log('polyLineContainerData', polyLineContainerData);
        }
        else {
          const lineData = plainToInstance(Instance.Shape.Line, storedObjectData);
          storedObjectCls.Data = lineData;

          console.log('lineData', lineData);
        }
      }

      if (storedObjectData.DrawingObjectBaseClass === 0) {
        if (storedObjectData.ShapeType === 'Oval') {

          const ovalData = plainToInstance(Instance.Shape.Oval, storedObjectData);
          storedObjectCls.Data = ovalData;

          console.log('ovalData', ovalData);
        }

        if (storedObjectData.ShapeType === 'Rect') {

          const rectData = plainToInstance(Instance.Shape.Rect, storedObjectData);
          storedObjectCls.Data = rectData;

          console.log('rectData', rectData);
        }

        if (storedObjectData.ShapeType === 'Polygon') {

          const polygonData = plainToInstance(Instance.Shape.Polygon, storedObjectData);
          storedObjectCls.Data = polygonData

        }
      }

      if (storedObjectData.DrawingObjectBaseClass === 3) {
        const connectorData = plainToInstance(Instance.Shape.Connector, storedObjectData);
        storedObjectCls.Data = connectorData;

        console.log('connectorData', connectorData);
      }
    }

    return storedObjectCls;
  }

  static SaveToLocal() {

    /*
    debugger

    this.InitStateManagerPrimary();

    this.InitObjectStorePrimary();

    this.InitClipboardManager();

    this.InitStateManager();

    this.InitObjectStore();

    return;
    */

    debugger

    const VisibleZList = GlobalData.optManager.VisibleZList();

    // save stateManagePrimary
    //this.SaveData(this.stateManagerPrimaryKey, GlobalData.stateManagerPrimary);

    // save objectStorePrimary
    //this.SaveData(this.objectStorePrimaryKey, GlobalData.objectStorePrimary);

    // save clipboardManager
    this.SaveData(this.clipboardManagerKey, GlobalData.clipboardManager);

    // save stateManager
    this.SaveData(this.stateManagerKey, GlobalData.stateManager);

    // save objectStore
    this.SaveData(this.objectStoreKey, GlobalData.objectStore);

    // this.SaveData(this.CURRENT_SEQ_OBJECT_ID_PrimaryKey, GlobalData.CURRENT_SEQ_OBJECT_ID_Primary);

    this.SaveData(this.CURRENT_SEQ_OBJECT_IDKey, GlobalData.CURRENT_SEQ_OBJECT_ID);
  }

  static SaveToT3000() {

  }

  // load data from localstorage
  static LoadData(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // save data to localstorage
  static SaveData(key: string, data: any) {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  static InitStateAndStore() {
    GlobalData.stateManager = new StateManager();
    GlobalData.objectStore = new ObjectStore();
    GlobalData.CURRENT_SEQ_OBJECT_ID = 0;
    GlobalData.bIsPrimaryStateManager = true;
    GlobalData.clipboardManager = new ObjectStoreFactory().Create();
  }
}

export default DataOpt
