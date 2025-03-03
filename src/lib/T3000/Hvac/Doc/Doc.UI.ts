
// import DocHandler from "./Doc.DocHandler1";
// import OptHandler from "../Opt/Opt.OptHandler1";
// import * as Utils from '../Helper/Helper.Utils';

import GlobalData from '../Data/GlobalData';
import StateManager from '../Data/State/StateManager';
import ObjectStore from '../Data/State/ObjectStore';
import ObjectStoreFactory from '../Data/State/ObjectStoreFactory';
import DocHandler from './Doc.DocHandler';
import OptHandler from '../Opt/Opt.OptHandler';
import Base from '../Opt/Business/Base';
import FloorPlan from '../Opt/Business/FloorPlan';
import FloorPlan_Wall from '../Opt/Business/FloorPlan_Wall';
import Resources from '../Data/Resources';
import $ from 'jquery';
import Commands from '../Opt/Business/Commands'

import BaseLine from '../Shape/Shape.BaseLine';
import PolyLine from '../Shape/Shape.PolyLine';
import Polygon from '../Shape/Shape.Polygon';
import BaseShape from '../Shape/Shape.BaseShape';
import Line from '../Shape/Shape.Line';
import ArcLine from '../Shape/Shape.ArcLine';
import SegmentedLine from '../Shape/Shape.SegmentedLine';
import SVGFragmentSymbol from '../Shape/Shape.SVGFragmentSymbol';
import PolyLineContainer from '../Shape/Shape.PolyLineContainer';
import ShapeContainer from '../Shape/Shape.ShapeContainer';

import Container from '../Basic/Basic.Container';

import Clipboard from '../Opt/Business/Clipboard'
import D3Symbol from '../Shape/Shape.D3Symbol'
import Connector from '../Shape/Shape.Connector'
import Events from '../Event/Events'
import Oval from '../Shape/Shape.Oval'
import Rect from '../Shape/Shape.Rect'
import RRect from '../Shape/Shape.RRect'
import GroupSymbol from '../Shape/Shape.GroupSymbol'
import Utils2 from '../Helper/Utils2';
import Utils1 from '../Helper/Utils1'
import Instance from '../Data/Instance/Instance';

import Shape from '../Data/Instance/Shape';
import Basic from '../Data/Instance/Basic';
import DataOpt from '../Data/DataOpt';

declare global {

  interface Window {
    gDocumentHandler: any;
    gBusinessManager: any;
  }
}

SVGElement.prototype.getTransformToElement = function (element) { return element.getScreenCTM().inverse().multiply(this.getScreenCTM()) }

class UI {

  constructor() {
  }

  InitInstance() {
    // GlobalDataShape.BaseLine = BaseLine;
    // GlobalDataShape.PolyLine = PolyLine;
    // GlobalDataShape.Polygon = Polygon;
    // GlobalDataShape.BaseShape = BaseShape;
    // GlobalDataShape.Line = Line;
    // GlobalDataShape.ArcLine = ArcLine;
    // GlobalDataShape.SegmentedLine = SegmentedLine;
    // GlobalDataShape.ShapeContainer = ShapeContainer;
    // GlobalDataShape.SVGFragmentSymbol = SVGFragmentSymbol;
    // GlobalDataShape.PolyLineContainer = PolyLineContainer;
    // GlobalDataShape.D3Symbol = D3Symbol;
    // GlobalDataShape.Connector = Connector;
    // GlobalDataShape.Oval = Oval;
    // GlobalDataShape.Rect = Rect;
    // GlobalDataShape.RRect = RRect;
    // GlobalDataShape.GroupSymbol = GroupSymbol;
    // GlobalDataBasic.Container = Container;


    // // new global data to store the shape and basic type
    // Instance.Shape.BaseLine = BaseLine;
    // Instance.Basic.Container = Container;

    Instance.Shape = Shape;
    Instance.Basic = Basic;

  }


  // SDJS_select_primary_state_manager = () => {

  //   GlobalData.stateManager = GlobalData.stateManagerPrimary;
  //   GlobalData.objectStore = GlobalData.objectStorePrimary;
  //   GlobalData.CURRENT_SEQ_OBJECT_ID = GlobalData.CURRENT_SEQ_OBJECT_ID_Primary;
  //   GlobalData.bIsPrimaryStateManager = true;
  // }

  // SDJS_init_state_manager = () => {
  //   GlobalData.stateManagerPrimary = new StateManager();
  //   GlobalData.objectStorePrimary = new ObjectStore();
  //   this.SDJS_select_primary_state_manager();
  //   GlobalData.clipboardManager = new ObjectStoreFactory().Create();
  //   // SDJS.Editor.PatchArrayBufferSlice();
  //   GlobalData.CURRENT_SEQ_OBJECT_ID = 0;

  //   console.log('=== SDJS_init_state_manager -> GPP', GPP);
  // }

  SDJS_init_document_handler = () => {
    //
    // if (
    //   GlobalData.docHandler = new SDJS.DocumentHandler,
    //   $(document).on('SDJS.Socket.OnOpen', SDF.SaveAllBlocks),
    //   $(document).on(
    //     'SDJS.Socket.OnStatusMessage',
    //     GlobalData.docHandler.HandleSocketStatus
    //   ),
    //   $(document).on(
    //     'SDJS.Socket.OnDocumentChangeMessage',
    //     GlobalData.docHandler.HandleSocketNewDocument
    //   ),
    //   $(document).on(
    //     'SDJS.Socket.SDJS.Socket.OnSocketCommandMessage',
    //     GlobalData.docHandler.HandleSocketCommand
    //   ),
    //   $(window).on('hashchange', GlobalData.docHandler.HandleHashChange),
    //   null === GlobalData.docHandler
    // ) throw new Error('Got null value for gDocumentHandler');

    GlobalData.docHandler = new DocHandler();
  }

  SDJS_init_list_manager = () => {
    //
    // console.log('SDJS_init_list_manager');
    // if (null === (GlobalData.optManager = new ListManager.LM)) throw new Error('Got null value for gList');
    // // new SDJSError({
    // //   source: 'ListManager constructor',
    // //   message: 'Got null value for gListManager'
    // // });

    // GlobalData.optManager.Initialize()
    GlobalData.optManager = new OptHandler();// new ListManager.LM
    GlobalData.optManager.Initialize()
  }

  SDJS_init_business_manager = (e) => {
    GlobalData.gBaseManager = new Base();
    GlobalData.gFloorplanManager = new FloorPlan();
    // GlobalData.gFloorplanWallManager = new FloorPlan_Wall();
    GlobalData.gBusinessManager = GlobalData.gFloorplanManager;
  }


  SDJS_init_business_manager2 = (e) => {


    if (GlobalData.optManager) {
      if (e !== null) {
        if (e !== GlobalData.optManager.theContentHeader.BusinessModule) {
          GlobalData.gBusinessManager = null;
          GlobalData.optManager.SetBusinessModule(e);
        }

        if (GlobalData.gBaseManager === null) {
          GlobalData.gBaseManager = new Base();
          // Business.Objects.BASE = GlobalData.gBaseManager;
        }

        // if (GlobalDatagFlowChartManager === null) {
        //   GlobalDatagFlowChartManager = new Business.FlowChart();
        //   Business.Objects.FLOWCHART = GlobalDatagFlowChartManager;
        // }

        if (GlobalData.gFloorplanManager === null) {
          GlobalData.gFloorplanManager = new FloorPlan();
          // Business.Objects.FLOORPLAN = GlobalData.gFloorplanManager;
        }

        // if (GlobalData.gFloorplanWallManager === null) {
        //   GlobalData.gFloorplanWallManager = new FloorPlan_Wall();
        //   // Business.Objects.FLOORPLAN_WALL = GlobalData.gFloorplanWallManager;
        // }

        // if (gOrgChartManager === null) {
        //   gOrgChartManager = new Business.OrgChart();
        //   Business.Objects.ORGCHART = gOrgChartManager;
        // }

        // if (gMindMapManager === null) {
        //   gMindMapManager = new Business.MindMap();
        //   Business.Objects.MINDMAP = gMindMapManager;
        // }

        // if (gTaskMapManager === null) {
        //   gTaskMapManager = new Business.TaskMap();
        //   Business.Objects.TASKMAP = gTaskMapManager;
        // }

        // if (gProjectChartManager === null) {
        //   gProjectChartManager = new Business.ProjectChart();
        //   Business.Objects.PROJECTCHART = gProjectChartManager;
        // }

        // if (gDecisionTreeManager === null) {
        //   gDecisionTreeManager = new Business.DecisionTree();
        //   Business.Objects.DECISIONTREE = gDecisionTreeManager;
        // }

        // if (gPedigreeManager === null) {
        //   gPedigreeManager = new Business.Pedigree();
        //   Business.Objects.PEDIGREE = gPedigreeManager;
        // }

        // if (gDescendantManager === null) {
        //   gDescendantManager = new Business.Descendant();
        //   Business.Objects.DESCENDANT = gDescendantManager;
        // }

        // if (gCauseAndEffectManager === null) {
        //   gCauseAndEffectManager = new Business.CauseAndEffect();
        //   Business.Objects.CAUSEANDEFFECT = gCauseAndEffectManager;
        // }

        // if (gGenogramManager === null) {
        //   gGenogramManager = new Business.Genogram();
        //   Business.Objects.GENOGRAM = gGenogramManager;
        // }

        // if (gTableManager === null) {
        //   gTableManager = new Business.Table();
        //   Business.Objects.TABLE = gTableManager;
        // }

        // if (gTableRowManager === null) {
        //   gTableRowManager = new Business.TableRow();
        //   Business.Objects.TABLEROW = gTableRowManager;
        // }

        // if (gStepChartHManager === null) {
        //   gStepChartHManager = new Business.StepChart();
        //   Business.Objects.STEPCHART = gStepChartHManager;
        // }

        // if (gStepChartVManager === null) {
        //   gStepChartVManager = new Business.StepChartV();
        //   Business.Objects.STEPCHARTV = gStepChartVManager;
        // }

        // if (gUIElementManager === null) {
        //   gUIElementManager = new Business.UIElement();
        //   Business.Objects.UIELEMENT = gUIElementManager;
        // }

        // if (gTimelineManager === null) {
        //   gTimelineManager = new Business.Timeline();
        //   Business.Objects.TIMELINE = gTimelineManager;
        // }

        // if (gLineDrawManager === null) {
        //   gLineDrawManager = new Business.LineDraw();
        //   Business.Objects.LINEDRAW = gLineDrawManager;
        // }

        // if (gLineDrawUMLClassManager === null) {
        //   gLineDrawUMLClassManager = new Business.LineDrawUMLClass();
        //   Business.Objects.LINEDRAW_UMLCLASS = gLineDrawUMLClassManager;
        // }

        // if (gLineDrawUMLManager === null) {
        //   gLineDrawUMLManager = new Business.LineDrawUML();
        //   Business.Objects.LINEDRAW_UML = gLineDrawUMLManager;
        // }

        // if (gLineDrawUMLComponentManager === null) {
        //   gLineDrawUMLComponentManager = new Business.LineDrawUMLComponent();
        //   Business.Objects.LINEDRAW_UMLCOMPONENT = gLineDrawUMLComponentManager;
        // }

        // if (gLineDrawERDManager === null) {
        //   gLineDrawERDManager = new Business.LineDrawERD();
        //   Business.Objects.LINEDRAW_ERD = gLineDrawERDManager;
        // }

        // if (gLineDrawBPMNManager === null) {
        //   gLineDrawBPMNManager = new Business.LineDrawBPMN();
        //   Business.Objects.LINEDRAW_BPMN = gLineDrawBPMNManager;
        // }

        // if (gLineDrawBPMNTaskManager === null) {
        //   gLineDrawBPMNTaskManager = new Business.LineDrawBPMN_Task();
        //   Business.Objects.LINEDRAW_BPMN_TASK = gLineDrawBPMNTaskManager;
        // }

        // if (gLineDrawBPMNGatewayManager === null) {
        //   gLineDrawBPMNGatewayManager = new Business.LineDrawBPMN_Gateway();
        //   Business.Objects.LINEDRAW_BPMN_GATEWAY = gLineDrawBPMNGatewayManager;
        // }

        // if (gLineDrawBPMNEventManager === null) {
        //   gLineDrawBPMNEventManager = new Business.LineDrawBPMN_Event();
        //   Business.Objects.LINEDRAW_BPMN_EVENT = gLineDrawBPMNEventManager;
        // }

        // if (gLineDrawBPMNDataManager === null) {
        //   gLineDrawBPMNDataManager = new Business.LineDrawBPMN_Data();
        //   Business.Objects.LINEDRAW_BPMN_DATA = gLineDrawBPMNDataManager;
        // }

        // if (gLineDrawBPMNChoreographyManager === null) {
        //   gLineDrawBPMNChoreographyManager = new Business.LineDrawBPMN_Choreography();
        //   Business.Objects.LINEDRAW_BPMN_CHOREOGRAPHY = gLineDrawBPMNChoreographyManager;
        // }

        // if (gLineDrawBPMNPoolManager === null) {
        //   gLineDrawBPMNPoolManager = new Business.LineDrawBPMN_Pool();
        //   Business.Objects.LINEDRAW_BPMN_POOL = gLineDrawBPMNPoolManager;
        // }

        // if (gLineDrawSwimlaneManager === null) {
        //   gLineDrawSwimlaneManager = new Business.LineDrawSwimlane();
        //   Business.Objects.LINEDRAW_SWIMLANE = gLineDrawSwimlaneManager;
        // }

        // if (gLineDrawEngineeringManager === null) {
        //   gLineDrawEngineeringManager = new Business.LineDrawEngineering();
        //   Business.Objects.LINEDRAW_ENGINEERING = gLineDrawEngineeringManager;
        // }

        // if (gLineDrawAWSManager === null) {
        //   gLineDrawAWSManager = new Business.LineDrawAWS();
        //   Business.Objects.LINEDRAW_AWS = gLineDrawAWSManager;
        // }

        // if (gLineDrawAzureManager === null) {
        //   gLineDrawAzureManager = new Business.LineDrawAzure();
        //   Business.Objects.LINEDRAW_AZURE = gLineDrawAzureManager;
        // }

        // if (gContainerManager === null) {
        //   gContainerManager = new Business.Container();
        //   Business.Objects.CONTAINER = gContainerManager;
        // }

        // if (gContainerTableManager === null) {
        //   gContainerTableManager = new Business.ContainerTable();
        //   Business.Objects.CONTAINER_TABLE = gContainerTableManager;
        // }

        // if (gGraphManager === null) {
        //   gGraphManager = new Business.Graph();
        //   Business.Objects.GRAPH = gGraphManager;
        // }

        // if (gGaugeManager === null) {
        //   gGaugeManager = new Business.Gauge();
        //   Business.Objects.GAUGE = gGaugeManager;
        // }

        // if (gJiraIssuesContainerManager === null) {
        //   gJiraIssuesContainerManager = new Business.JiraIssuesContainer();
        //   Business.Objects.JIRA_ISSUESCONTAINER = gJiraIssuesContainerManager;
        // }

        // if (gJiraBlockingIssueManager === null) {
        //   gJiraBlockingIssueManager = new Business.JiraBlockingIssue();
        //   Business.Objects.JIRA_BLOCKINGISSUE = gJiraBlockingIssueManager;
        // }

        // if (gJiraEpicDependencyManager === null) {
        //   gJiraEpicDependencyManager = new Business.JiraEpicDependency();
        //   Business.Objects.JIRA_EPICDEPENDENCY = gJiraEpicDependencyManager;
        // }

        // if (gJiraProductRoadmapManager === null) {
        //   gJiraProductRoadmapManager = new Business.JiraProductRoadmap();
        //   Business.Objects.JIRA_PRODUCTROADMAP = gJiraProductRoadmapManager;
        // }

        // if (gJiraPIBoardManager === null) {
        //   gJiraPIBoardManager = new Business.JiraPIBoard();
        //   Business.Objects.JIRA_PIBOARD = gJiraPIBoardManager;
        // }

        // if (gAzureDevOpsItemContainerManager === null) {
        //   gAzureDevOpsItemContainerManager = new Business.AzureDevOpsItemContainer();
        //   Business.Objects.AZUREDEVOPS_ITEMCONTAINER = gAzureDevOpsItemContainerManager;
        // }

        // for (const t in Business.Objects) {
        //   if (t === gListManager.theContentHeader.BusinessModule) {
        //     gBusinessManager = Business.Objects[t];
        //     break;
        //   }
        // }

        GlobalData.gBusinessManager = GlobalData.gFloorplanManager;

        if (GlobalData.gBusinessManager === null) {
          GlobalData.gBusinessManager = new Base();
        }
      }
    }

    // GlobalDatagBusinessController = new SDUI.BusinessController();
  }


  Initialize = () => {

    console.log('============================ UI.Initialize start ============================');

    // SDUI.AppSettings.PagedSDR2 = true;//Double ==== ServerPage.PagedSDR2;
    // SDJS_init_logger();


    // this.SDJS_init_state_manager();

    DataOpt.InitStateAndStore();

    this.SDJS_init_document_handler();
    // SDJS_init_options();


    this.SDJS_init_list_manager();
    // SDJS_init_business_manager("FLOORPLAN");
    this.SDJS_init_business_manager("FLOORPLAN");


    window.oncontextmenu = function (e) {
      e.preventDefault();
    }


    window.onkeydown = Events.OnKeyDown;
    window.onkeyup = Events.OnKeyUp;
    window.onkeypress = Events.OnKeyPress;

    Resources.KeyboardCommand.prototype.BuildCommands();


    //Double ===


    window.gDocumentHandler = GlobalData.docHandler;
    window.gBusinessManager = GlobalData.gBusinessManager;


    this.EventTest();

    this.InitInstance();

    Clipboard.Init();



    console.log('=== Global data === Instance1', Instance)

    // GlobalDataShape = null;
    // GlobalData.docHandler = null;
    // GlobalData.optManager = null;

    // localStorage.setItem('GPP1', JSON.stringify(GPP))

    DataOpt.InitStoredData()


    //GlobalData.optManager.CloseEdit(!1, !0);
    // GlobalData.optManager.ResizeSVGDocument();
    GlobalData.optManager.RenderAllSVGObjects();
    // GlobalData.optManager.RenderDirtySVGObjects();
    // GlobalData.optManager.RenderLastSVGObject();



    // debugger
  }

  EventTest = () => {

    $(document).ready(function () {



      document.getElementById('test_btn_select').addEventListener('click', function () {
        console.log('11111111111111111111111111111111111111')

        new Commands().SD_Select(event)
      });

      document.getElementById('test_btn_try_library').addEventListener('click', function () {
        new Commands().SD_ClickSymbol(event);
        new Commands().SD_DragDropSymbol(event);
      });


      document.getElementById('test_btn_try_line').addEventListener('click', function () {
        console.log('222222222222222222222222222222222222222')

        new Commands().SD_Tool_Line(event)

        // SDUI.ShapeController DrawNewLineShape

        //ListManager.LM.prototype.DrawNewObject
        //this.WorkAreaHammer.on('dragstart', Evt_WorkAreaHammerDrawStart);
        //GlobalData.optManager.StartNewObjectDraw(e)


        // ListManager.LM.prototype.RubberBandSelectMoveCommon

        // // Double ===
        // if(GlobalData.optManager.theRubberBand===null){
        //   return;
        // }

        //ListManager.LM.prototype.DrawNewObject
        //============ 1 ListManager.LM.prototype.DrawNewObject

        // StartNewObjectDraw


        // Line clicked setup move ListManager.LM.prototype.LM_SetupMove

        //this.HideAllSVGSelectionStates(), REMOVE ALL SVG SELECTIONS

        //  ListManager.LM.prototype.LM_MoveClick

      });

      document.getElementById('test_btn_try_line1').addEventListener('click', function () {
        console.log('test_btn_try_line1')

        //   case 'line':
        //   newShape = this.DrawNewLine(a, 0, isDrawing, r);
        //   break;
        // case 'commline':
        //   newShape = this.DrawNewLine(a, 1, isDrawing, r);
        //   break;
        // case 'digiline':
        //   newShape = this.DrawNewLine(a, 2, isDrawing, r);
        //   break;
        // case 'arcLine':
        //   newShape = this.DrawNewArcLine(isDrawing, a, r);
        //   break;
        // case 'segLine':
        //   newShape = this.DrawNewSegLine(isDrawing, a, r);
        //   break;
        // case 'arcSegLine':
        //   newShape = this.DrawNewArcSegLine(isDrawing, a, r);
        //   break;
        // case 'polyLine':
        //   newShape = this.DrawNewPolyLine(isDrawing, a, r);
        //   break;
        // case 'polyLineContainer':
        //   newShape = this.DrawNewPolyLineContainer(isDrawing, a, r);
        //   break;
        // case 'freehandLine':
        //   newShape = this.DrawNewFreehandLine(isDrawing, a, r);

        new Commands().SD_Tool_Line(event)

        // SDUI.ShapeController DrawNewLineShape

        //ListManager.LM.prototype.DrawNewObject
        //this.WorkAreaHammer.on('dragstart', Evt_WorkAreaHammerDrawStart);
        //GlobalData.optManager.StartNewObjectDraw(e)


        // ListManager.LM.prototype.RubberBandSelectMoveCommon

        // // Double ===
        // if(GlobalData.optManager.theRubberBand===null){
        //   return;
        // }

        //ListManager.LM.prototype.DrawNewObject
        //============ 1 ListManager.LM.prototype.DrawNewObject

        // StartNewObjectDraw


        // Line clicked setup move ListManager.LM.prototype.LM_SetupMove

        //this.HideAllSVGSelectionStates(), REMOVE ALL SVG SELECTIONS

        //  ListManager.LM.prototype.LM_MoveClick

      });


      // SDUI.Commands.ts

      document.getElementById('test_btn_try_wall').addEventListener('click', function () {
        console.log('test_btn_try_wall')

        // Interior Wall 4" linethickness="0.33333" Exterior Wall 6 linethickness="0.5"
        // Metric Interior Wall 150mm linethickness="0.15" linethickness="0.2"
        new Commands().SD_Line_SetDefaultWallThickness(event)

      });

      document.getElementById('test_btn_try_Rect').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Rect SED_S_Rect: 2')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)

        var shapeType = 2;

        // SED_S_Photo: - 2,
        // SED_S_Table: - 1,
        // SED_S_Text: 0,
        // SED_S_Image: 1,
        // SED_S_Rect: 2,
        // SED_S_RRect: 3,
        // SED_S_Oval: 4,
        // SED_S_Pgm: 5,
        // SED_S_Diam: 6,
        // SED_S_Doc: 7,
        // SED_S_Term: 8,
        // SED_S_Circ: 9,
        // SED_S_ArrR: 10,
        // SED_S_ArrL: 11,
        // SED_S_ArrT: 12,
        // SED_S_ArrB: 13,
        // SED_S_Tri: 14,
        // SED_S_TriB: 15,
        // SED_S_Input: 16,
        // SED_S_Trap: 17,
        // SED_S_TrapB: 18,
        // SED_S_Oct: 19,
        // SED_S_Store: 20,
        // SED_S_Hex: 21,
        // SED_S_Pent: 22,
        // SED_S_PentL: 23,
        // SED_S_Delay: 24,
        // SED_S_Disp: 25,
        // SED_S_Poly: 26,
        // SED_S_MeasureArea: 27,
        // SED_S_Last: 27


        new Commands().SD_StampShapeFromTool(event, shapeType)

        // SDUI.Commands.MainController.Shapes.StampOrDragDropNewShape(e, shapeType)
        // SDUI.ShapeController.ts => StampOrDragDropNewShape
        // GlobalData.optManager.PreDragDropOrStamp()
        // this.StampOrDragDropCallback
        // GlobalData.optManager.StampTimeout = window.setTimeout(i, 200, r, a)

        // ==>  GlobalData.optManager.DragDropNewShape(o, !0, !0, !0, null, null)
        // ==>  GlobalData.optManager.MouseStampNewShape(o, !0, !0, !0, null, null)


        //StampOrDragDropNewShape

        // => ListManager.LM.prototype.StampObjectMove

        /*
        Collab.BeginSecondaryEdit();
        this.MouseAddNewShape(this.bUseDefaultStyle);
        => ListManager.LM.prototype.MouseAddNewShape
        this.NewObjectVisible = true;
      }

      if (this.AutoScrollCommon(e, true, 'HandleStampDragDoAutoScroll')) {
        this.StampObjectMoveCommon(t.x, t.y, e);
      }
        */


        // rectangle shapetype=2 shapetype="4" shapetype="5" shapetype="6" shapetype="20" shapetype="9" shapetype="17" shapetype="14"
        //shapetype="8" shapetype="10" shapetype="16"   shapetype="23"

      });

      document.getElementById('test_btn_try_Oval').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Oval SED_S_Oval: 4')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_StampShapeFromTool(event, 4)
        var shapeType = 8;

      });


      document.getElementById('test_btn_try_Image').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Image SED_S_Image: 1')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_StampShapeFromTool(event, 1)
        var shapeType = 3;

      });


      document.getElementById('test_btn_try_Circ').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Circ SED_S_Circ: 9')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_StampShapeFromTool(event, 9)
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_Text').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Text SED_S_Text: 0')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_StampShapeFromTool(event, 'textLabel')
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_ArrR').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_ArrR SED_S_ArrR: 10')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_StampShapeFromTool(event, 10)
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_ArrL').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_ArrL SED_S_ArrL: 11')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_StampShapeFromTool(event, 11)
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_ArrT').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_ArrT SED_S_ArrT: 12')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_StampShapeFromTool(event, 12)
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_ArrB').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_ArrB SED_S_ArrB: 13')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_StampShapeFromTool(event, 13)
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_Roate45').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Roate45 45')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Rotate(event, 45)
        var shapeType = 5;

      });


      document.getElementById('test_btn_try_Roate90').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Roate90 90')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Rotate(event, 90)
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_Align_lefts').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Align_lefts Align_lefts')
        //shapealign="lefts"
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Shape_Align("lefts")

        // SD_Shape_Align: function (e) {
        //   if (null == e)
        //     return null;
        //   var t = e.currentTarget.attributes.getNamedItem(SDUI.Constants.Attr_ShapeAlign).value;
        //   SDUI.Commands.MainController.Shapes.AlignShapes(t)
        // }
      });


      document.getElementById('test_btn_try_Align_centers').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Align_centers Align_rights')
        //shapealign="rights"
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        // new Commands().SD_Rotate(event, 90)
        // var shapeType = 5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;

        new Commands().SD_Shape_Align("lefts")


      });

      document.getElementById('test_btn_try_Align_tops').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Align_tops Align_tops')
        //shapealign="tops"
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Shape_Align("tops")
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_Align_middles').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Align_middles Align_middles')
        //shapealign="middles"
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Shape_Align("middles")
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_Align_bottoms').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Align_bottoms Align_bottoms')
        //shapealign="bottoms"
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Shape_Align("bottoms")
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_Group').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Group Group')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Group(event)

      });

      document.getElementById('test_btn_try_Ungroup').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Ungroup Ungroup')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Ungroup(event)

      });

      document.getElementById('test_btn_try_Flip_Horizontal').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Flip_Horizontal Flip_Horizontal')
        //shapealign="rights"
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Shape_Flip_Horizontal(event)
        var shapeType = 5;

      });


      document.getElementById('test_btn_try_Flip_Vertical').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Flip_Vertical Flip_Horizontal')
        //shapealign="rights"
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Shape_Flip_Vertical(event)
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_Same_Height').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Same_Height Same_Height')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        //samesizeoption="1" Make Same Height
        new Commands().SD_MakeSameSize(event, 1)

      });

      document.getElementById('test_btn_try_Same_Width').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Same_Width Same_Width')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        //samesizeoption="2" Make Same Width
        new Commands().SD_MakeSameSize(event, 2)

      });

      document.getElementById('test_btn_try_Same_Both').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Same_Both Same_Both')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        //samesizeoption="3" Both
        new Commands().SD_MakeSameSize(event, 3)

      });

      document.getElementById('test_btn_try_BringToFront').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_BringToFront BringToFront')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Shape_BringToFront(event)
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_SendToBack').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_SendToBack SendToBack')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Shape_SendToBack(event)
        var shapeType = 5;

      });

      document.getElementById('test_btn_try_Paste').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Paste Paste')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Paste(event)

      });


      document.getElementById('test_btn_try_Copy').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Copy Copy')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Copy(event)

      });

      document.getElementById('test_btn_try_Cut').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Cut Cut')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Cut(event)

      });

      document.getElementById('test_btn_try_Delete').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Delete Delete')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Delete(event)

      });


      document.getElementById('test_btn_try_Undo').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Undo Undo')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Undo(event)

      });


      document.getElementById('test_btn_try_Redo').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Redo Redo')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Redo(event)

      });



      document.getElementById('test_btn_try_Save').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Save save')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_CommitFilePickerSelection(event)

      });

      document.getElementById('test_btn_try_Duplicate').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Duplicate Duplicate')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        new Commands().SD_Duplicate(event)

      });




      document.getElementById('test_btn_try_Clear').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Clear Clear')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        // new Commands().SD_Duplicate(event)

        localStorage.clear();

      });



      document.getElementById('test_btn_try_Measure').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_Measure Measure')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        // new Commands().SD_Duplicate(event)

        new Commands().SD_MeasureDistance(event)

      });


      document.getElementById('test_btn_try_AreaMeasure').addEventListener('pointerdown', function (e) {
        console.log('test_btn_try_AreaMeasure AreaMeasure')
        // debugger
        // SDUI.Commands.RibbonCommands.SD_StampShapeClick(event)
        // new Commands().SD_Duplicate(event)

        new Commands().SD_MeasureArea(event)

      });






















    })
  }
}

export default UI;
