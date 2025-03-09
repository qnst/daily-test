
import ListManager from "./ListManager";
import FileParser from "./FileParser";
import Commands from "../Opt/Business/ToolOpt";
import $ from 'jquery'
import DefaultStyle from '../Model/DefaultStyle'
import QuickStyle from "../Model/QuickStyle"
import ConstantData from "../Data/ConstantData"
import ConstantData2 from "./ConstantData2";

const Resources = {
  // RulerUnits: null,
}



Resources.Arrowheads = []

Resources.CurrentTheme = null

Resources.ThemeNames = [
  'Lancelot',
  'Cador',
  'Dagonet',
  'Galahad',
  'Geraint',
  'Bedivere',
  'Steel',
  'Basic',
  'Lanval',
  'Alpine',
  'Mojave',
  'Astra',
  'Monarch',
  'Blueprint',
  'Mountain',
  'Bright',
  'North',
  'Calico',
  'Office',
  'Divide',
  'Prairieclover',
  'Douglas',
  'Presentation',
  'Everest',
  'RIVIER',
  'Floorplan',
  'Sagebrush',
  'Grayscale',
  'Salton',
  'Hill',
  'Sidewinder',
  'InternalUI',
  'Willow',
  'Loveland',
  'Wireframe',
  'Miner',
  'Fennec',
  'Modern',
  'Formula',
  'Agile',
  'Modulus'
]

Resources.StartupPushMessage = function () {
  this.Flags = Resources.StartupStageFlags.None,
    this.IsTemplate = !1,
    this.ReadOnlyLicense = !1
}

Resources.StartupStageFlags = {
  None: 0,
  BackplaneConnected: 1,
  LicenseLoaded: 2,
  DocumentMetadataLoaded: 4,
  FileBinaryReadComplete: 8,
  CredentialsLoaded: 16,
  UserSettingsArrived: 32
}

Resources.GeometryPathData = function (e, t, a, r, i) {
  this.X = e >= 0 ||
    e < 0 ? e : 0,
    this.Y = t >= 0 ||
      t < 0 ? t : 0,
    this.Width = a >= 0 ||
      a < 0 ? a : 0,
    this.Height = r >= 0 ||
      r < 0 ? r : 0,
    this.GeometryString = null == i ? null : i
}

Resources.ArrowheadGeometry = function (e, t, a, r) {
  this.Type = null != e ? e : null,
    this.Filled = null == t ||
    t,
    this.Stroke = null != a ? a : 0,
    this.PathData = new Resources.GeometryPathData,
    'string' == typeof r ? this.PathData.GeometryString = r : r instanceof Resources.GeometryPathData &&
      (this.PathData = r)
}

Resources.Point = function (e, t) {
  this.x = e >= 0 ||
    e < 0 ? e : 0,
    this.y = t >= 0 ||
      e < 0 ? t : 0
}

Resources.Point.prototype.FromString = function (e) {
  if (null == e) return null;
  if (e.indexOf(')') <= 0) return null;
  var t = e.substring(1, e.indexOf(')') - 1).split(',');
  if (2 !== t.length) return null;
  var a = new Resources.Point;
  return a.x = Number(t[0]),
    a.y = Number(t[1]),
    a
}

Resources.ActiveSessionFlags = {
  WebAppSession: 1,
  WindowsAppSession: 2,
  LoginConflict: 4,
  SessionClosed: 8,
  ReadOnlyMode: 16,
  DepositoryAdded: 32
}

Resources.ActiveSessionResponse = {
  NotLoggedIn: - 1,
  OK: 0,
  LoginConflict: 1,
  RefreshContent: 2,
  ReadOnlyMode: 3,
  DepositoryAdded: 4,
  PluginAddedRemoved: 5,
  ReInitUser: 6
}

Resources.FileUploadTypes = {
  None: 0,
  SDR: 1,
  ZIP: 2,
  SVG: 3
}

Resources.ModalContexts = {
  None: - 1,
  ConnectionPointsDialog: 'connectionPoints',
  ColorPickerDialog: 'colorPicker',
  FilePickerDialog: 'filePicker'
}

Resources.SaveDialogDisplayMode = {
  List: 0,
  Grid: 1
}

Resources.TemplateDialogStartLocations = {
  RecentlyUsed: 0,
  Folder: 1,
  Template: 2,
  Plugin: 3
}


Resources.ShareAccessType = {
  Unknown: - 1,
  None: 0,
  ReadOnly: 1,
  ReadWrite: 2,
  Admin: 3,
  Owner: 4
}

Resources.TemplateDialogIFrameMode = {
  None: 0,
  OpenDocument: 1,
  OpenTemplate: 2
}

// Resources.ShareErrorMessage = {
//   DocumentShareNotFound: 1,
//   DocumentDoesNotExist: 2,
//   FolderShareNotFound: 3,
//   FolderDoesNotExist: 4,
//   Forbidden: 5,
//   DocumentShareRevoked: 6,
//   FolderShareRevoked: 7,
//   InvalidPluginToken: 8,
//   PluginSiteLicenseBlocked: 9,
//   PluginShareForbidden: 10,
//   CloudNotFind3rdPartyFileForUser: 11
// }

// Resources.ShareErrorMessageDetail = {
//   MissingShareToken: 1,
//   TokenNotFound: 2,
//   TokenNotResolved: 3,
//   UserNotLoggedIn: 4,
//   MissingDepo: 5,
//   NoCredentialsOneDrive: 6,
//   NoCredentialsSharePoint: 7,
//   ShareNotFound: 8,
//   ShareForbidden: 9,
//   ShareNotResolved: 10,
//   IsFolder: 11,
//   ShareNotSynchronized: 12
// }

// Resources.StorageProviders = {
//   None: 0,
//   SDCloud: 1,
//   Box: 2,
//   DropBox: 4,
//   GoogleDrive: 8,
//   OneDrive: 16,
//   SharePoint: 32,
//   Egnyte: 64
// }

// Resources.Depositories = {
//   None: 0,
//   SDTS: 1,
//   SDJS: 2,
//   GoogleDrive: 3,
//   MSFTOneDrive: 4,
//   DropBox: 5,
//   Box: 6,
//   MSFTSharePoint: 7,
//   Egnyte: 8,
//   ToStorageProviderFlag: function (e) {
//     switch (e) {
//       case Resources.Depositories.DropBox:
//         return Resources.StorageProviders.DropBox;
//       case Resources.Depositories.GoogleDrive:
//         return Resources.StorageProviders.GoogleDrive;
//       case Resources.Depositories.MSFTOneDrive:
//         return Resources.StorageProviders.OneDrive;
//       case Resources.Depositories.SDJS:
//       case Resources.Depositories.SDTS:
//         return Resources.StorageProviders.SDCloud;
//       case Resources.Depositories.Box:
//         return Resources.StorageProviders.Box;
//       case Resources.Depositories.None:
//         return Resources.StorageProviders.None;
//       case Resources.Depositories.MSFTSharePoint:
//         return Resources.StorageProviders.SharePoint;
//       case Resources.Depositories.Egnyte:
//         return Resources.StorageProviders.Egnyte;
//       default:
//         return Resources.StorageProviders.None
//     }
//   },
//   GetName: function (e) {
//     switch (e) {
//       case Resources.Depositories.DropBox:
//         return 'DropBox';
//       case Resources.Depositories.GoogleDrive:
//         return 'Google Drive';
//       case Resources.Depositories.MSFTOneDrive:
//         return 'Microsoft OneDrive';
//       case Resources.Depositories.SDJS:
//       case Resources.Depositories.SDTS:
//         return 'SmartDraw';
//       case Resources.Depositories.Box:
//         return 'Box';
//       case Resources.Depositories.None:
//         return '';
//       case Resources.Depositories.MSFTSharePoint:
//         return 'Microsoft SharePoint';
//       case Resources.Depositories.Egnyte:
//         return 'Egnyte';
//       default:
//         return ''
//     }
//     return ''
//   },
//   GetIndex: function (e) {
//     switch (e) {
//       case Resources.Depositories.None:
//         return 6;
//       case Resources.Depositories.SDJS:
//       case Resources.Depositories.SDTS:
//         return 0;
//       case Resources.Depositories.MSFTOneDrive:
//         return 1;
//       case Resources.Depositories.MSFTSharePoint:
//         return 2;
//       case Resources.Depositories.GoogleDrive:
//         return 3;
//       case Resources.Depositories.DropBox:
//         return 4;
//       case Resources.Depositories.Box:
//         return 5;
//       case Resources.Depositories.Egnyte:
//         return 6;
//       default:
//         return 7
//     }
//   },
//   GetClass: function (e) {
//     switch (e) {
//       case Resources.Depositories.None:
//         return '';
//       case Resources.Depositories.SDJS:
//       case Resources.Depositories.SDTS:
//         return 'sp-SDCloud';
//       case Resources.Depositories.MSFTOneDrive:
//         return 'sp-OneDrive';
//       case Resources.Depositories.MSFTSharePoint:
//         return 'sp-SharePoint';
//       case Resources.Depositories.GoogleDrive:
//         return 'sp-GoogleDrive';
//       case Resources.Depositories.DropBox:
//         return 'sp-DropBox';
//       case Resources.Depositories.Box:
//         return 'sp-Box';
//       case Resources.Depositories.Egnyte:
//         return 'sp-Egnyte';
//       default:
//         return 6
//     }
//   }
// }

// Resources.DepositoryToStorageProvider = function (e) {
//   return 0 == e ||
//     1 == e ? 0 : 2 == e ? 1 : 3 == e ? 8 : 4 == e ? 16 : 5 == e ? 4 : 6 == e ? 2 : 7 == e ? 32 : 8 == e ? 64 : 0
// }

// Resources.FileSource = {
//   None: 0,
//   CloudHub: 1,
//   ElectronMac: 2,
//   AtlassianServer: 3
// }

Resources.ContentSource = {
  None: 0,
  SDCloudWebService: 1,
  SDCloudStaticContent: 2,
  ElectronBTFStaticContent: 3,
  JiraBTFStaticContent: 4,
  ConfuenceBTFStaticContent: 5,
  JiraServerVSSStaticContent: 6,
  ConfluenceServerVSSStaticContent: 7
}

Resources.CloudSource = {
  None: 0,
  SDCloud: 1
}

Resources.Application = {
  None: 0,
  Editor: 1,
  TemplateDialog: 2,
  Builder: 3,
  Viewer: 4,
  ReadOnlyFastViewer: 5,
  VisualScriptStudio: 6,
  VisualScriptStudioRenderer: 7,
  VisualScriptReportWindow: 8,
  Dashboard: 9
}

Resources.ApplicationContext = {
  SDCloud: 'ab2792d8-d262-4d4b-9d0b-fbd1d8ddbe3e',
  ConfluenceCloud: '1e8c302a-ac27-4b98-be4c-02a54c918694',
  JIRACloud: '6ef2fe19-2429-4271-850e-07aa6f152719',
  Mac: '3d69f35b-fcf8-45d4-8698-4ff6bb952044',
  ConfluenceServer: '5e502751-b065-49b4-9938-5c7e8cbc857a',
  JIRAServer: '7208a373-4614-4b9c-9e62-aadb1cef7599',
  Trello: '7177b336-2b59-45af-9500-b3692761445d',
  LabArchives: '207f489a-4c58-4c96-85bc-3a5192010dc1',
  JIRAGadgetServer: 'aa64623d-ef96-48db-9967-aa7495ba5b59',
  ConfluenceHeadlessServer: '30cb14ee-3602-4300-a4f6-fb5d1a9ebcf4',
  JIRAGadgetCloud: '00a10f35-7cc9-4bed-a325-8a86ff9a2f3f',
  ConfluenceHeadlessCloud: '7c278468-7acb-4a4f-bbbc-4a2908694fa4',
  MicrosoftTeams: '4d16ee48-6eaf-4d31-88bb-b904969f2f93',
  MicrosoftTeamsPersonalTab: 'd94b02a8-f650-4960-9c84-b9056e7ce8a4',
  MicrosoftTeamsConfig: '91753636-c358-4bfd-866e-c889548271b5',
  JIRAGadgetServerBTF: '1064584e-40fa-4dcb-a199-f59fa1c78e56',
  ElectronBTFVisualScript: '41422bdf-4909-4c47-9baa-7a12c5de6a64',
  ConfluenceServerVisualScriptBTF: 'a8fedc87-7ea3-4e89-95b7-75010ce6a33a',
  JiraServerVSS: 'f4b9165b-0069-40ee-abc7-70263d76ff95',
  ConfluenceServerVSS: '6760d9fc-3a24-4e64-ab45-393cf604aaf6',
  ConfluenceCloudConnector: 'bf887e83-59d2-458e-bfbb-1ac12a394ee7',
  JIRACloudConnector: '0cd8be97-1032-4df5-94d5-15c09c7d69be',
  ConfluenceServerConnector: 'be7db0d9-fd61-48be-930d-0ff841ff5d35',
  JIRAServerConnector: 'b52685af-0ca6-46fe-b94a-ede19f9db96b',
  ElectronApp: '7b080637-c32f-4c23-a62b-e7771234031c',
  Zoom: 'da8fc638-af04-48ee-a6b7-844bc78d46c1',
  OneDriveFileHandlerPreview: '3a0042e6-f423-488a-ac12-7a1341101dde',
  OneDriveFileHandlerOpenDocument: '1c570787-ba17-44d9-aa7a-a5af1bcd3de0',
  OneDriveFileHandlerNewDocument: '6428b338-9fa1-45f0-a38c-7d82b1c8f287',
  GoogleWorkspace: 'd7cf9c9c-8f86-4b2e-a702-92d5cd3ca4c4',
  OrgChartMassExport: '18e3b6b9-833a-4335-85c8-2ab407dffec0',
  ShareEmbed: 'dfacef70-4f97-46c3-bc7c-19168f8a90e4'
}

Resources.ApplicationModeFlags = {
  None: 0,
  ReadOnly: 1,
  Embedded: 2,
  IFrame: 4,
  UseLocalSDRStorage: 8,
  ExampleNonReadOnly: 16,
  NeedsImmediateSave: 32,
  Widget: 64,
  DevToolsEnabled: 128
}


Resources.PluginIDPrefix = {
  GetPrefix: function (e) {
    return 'string' != typeof e ? e : e.substring(0, 3)
  },
  ConfluenceCloud: '001',
  JIRACloud: '002',
  Office: '003',
  ConfluenceServer: '004',
  JIRAServer: '005'
}

Resources.FileConversionStatus = {
  Pending: 0,
  InProgress: 1,
  Complete: 2,
  Canceled: 3,
  Failed: 4,
  FirstStepComplete: 5
}

Resources.SDOAuthIntegration = {
  None: 0,
  Jira: 1,
  SharePointPickList: 3,
  AzureDevOps: 4
}

// Resources.CollabNamePreference = {
//   None: 0,
//   DisplayName: 1,
//   Email: 2,
//   Initial: 3
// }

// Resources.CursorDisplayMode = {
//   None: 0,
//   Show: 1,
//   Hide: 2
// }

Resources.ActionIcons = {
  NONE: 'styles/img/datafields/SVG/none.svg',
  Due: 'styles/img/datafields/SVG/DataField-Due.svg',
  Task: 'styles/img/datafields/SVG/DataField-Task.svg',
  Schedule: 'styles/img/datafields/SVG/DataField-Schedule.svg',
  Time: 'styles/img/datafields/SVG/DataField-Time.svg',
  Chat: 'styles/img/datafields/SVG/DataField-Chat.svg',
  Exclaim: 'styles/img/datafields/SVG/DataField-Exclaim.svg',
  Chatting: 'styles/img/datafields/SVG/DataField-Chatting.svg',
  BulbOrange: 'styles/img/datafields/SVG/DataField-BulbOrange.svg',
  BulbPurple: 'styles/img/datafields/SVG/DataField-BulbPurple.svg',
  BulbRed: 'styles/img/datafields/SVG/DataField-BulbRed.svg',
  BulbGreen: 'styles/img/datafields/SVG/DataField-BulbGreen.svg',
  CircleTask: 'styles/img/datafields/SVG/DataField-CircleTask.svg',
  EmojiSurprise: 'styles/img/datafields/SVG/DataField-EmojiSurprise.svg',
  EmojiSad: 'styles/img/datafields/SVG/DataField-EmojiSad.svg',
  EmojiMeh: 'styles/img/datafields/SVG/DataField-EmojiMeh.svg',
  EmojiHappy: 'styles/img/datafields/SVG/DataField-EmojiHappy.svg',
  ArrowRight: 'styles/img/datafields/SVG/DataField-ArrowRight.svg',
  ArrowLeft: 'styles/img/datafields/SVG/DataField-ArrowLeft.svg',
  ArrowDown: 'styles/img/datafields/SVG/DataField-ArrowDown.svg',
  ArrowUp: 'styles/img/datafields/SVG/DataField-ArrowUp.svg',
  FlagOrange: 'styles/img/datafields/SVG/DataField-FlagOrange.svg',
  FlagPurple: 'styles/img/datafields/SVG/DataField-FlagPurple.svg',
  FlagRed: 'styles/img/datafields/SVG/DataField-FlagRed.svg',
  FlagGreen: 'styles/img/datafields/SVG/DataField-FlagGreen.svg'
}

Resources.VisualizerID = {
  Azure: 1,
  Aws: 2,
  OrgChart: 3,
  Jira: 4,
  DecisionTree: 5,
  DataChart: 6,
  Gauge: 7,
  Erd: 8,
  UMLClass: 9,
  UMLSequence: 10,
  StickyNotes: 11,
  VisualScript: 12,
  JiraReports: 13,
  AzureDevops: 15,
  Timeline: 16,
  GetTemplate: function (e) {
    switch (e) {
      case Resources.VisualizerID.Azure:
        return '228de57b-1742-413b-a78c-6d5b2403ae78';
      case Resources.VisualizerID.Aws:
        return '3d9589b9-b5eb-4349-ac28-fe2510f9422b';
      case Resources.VisualizerID.OrgChart:
        return '748f16f6-e4b2-4c40-a8af-0637f505b463';
      case Resources.VisualizerID.Jira:
        return 'df9daafe-244c-420f-aa3d-88cd3d4b5ca2';
      case Resources.VisualizerID.JiraReports:
        return '3427b8ee-7e3d-40df-b2c4-1f5223c09582';
      case Resources.VisualizerID.DecisionTree:
        return '3a6a6523-492c-4ca5-adb0-08ef4c709953';
      case Resources.VisualizerID.DataChart:
        return 'db4d56f1-c5ed-4a6b-99e0-a884a9f61315';
      case Resources.VisualizerID.Gauge:
        return '2d840414-8d84-422a-97a0-42494cc47485';
      case Resources.VisualizerID.Erd:
        return '520ece43-167b-445c-b810-fb7d35e9aba4';
      case Resources.VisualizerID.UMLClass:
        return '3f94c5ba-46fb-46ac-80e2-8b13581b08db';
      case Resources.VisualizerID.UMLSequence:
        return '940ceeab-6fdc-463f-a85d-fdf1f3d99167';
      case Resources.VisualizerID.StickyNotes:
      case Resources.VisualizerID.VisualScript:
        return 'b993f724-b109-4f07-bb2a-c4727f0b00ea';
      case Resources.VisualizerID.AzureDevops:
        return 'c126c14b-278c-4756-abe2-959378dc9e0c';
      case Resources.VisualizerID.Timeline:
        return '004f6406-9760-450f-99fa-e676329d7add'
    }
  },
  GetModalID: function (e) {
    switch (e) {
      case Resources.VisualizerID.Azure:
        return Resources.VisualizerModal.Azure;
      case Resources.VisualizerID.Aws:
        return Resources.VisualizerModal.Aws;
      case Resources.VisualizerID.OrgChart:
        return Resources.VisualizerModal.OrgChart;
      case Resources.VisualizerID.Jira:
        return Resources.VisualizerModal.Jira;
      case Resources.VisualizerID.JiraReports:
        return Resources.VisualizerModal.JiraReports;
      case Resources.VisualizerID.DecisionTree:
        return Resources.VisualizerModal.DecisionTree;
      case Resources.VisualizerID.Gauge:
        return Resources.VisualizerModal.Gauge;
      case Resources.VisualizerID.Erd:
        return Resources.VisualizerModal.Erd;
      case Resources.VisualizerID.UMLClass:
        return Resources.VisualizerModal.UMLClass;
      case Resources.VisualizerID.UMLSequence:
        return Resources.VisualizerModal.UMLSequence;
      case Resources.VisualizerID.StickyNotes:
        return Resources.VisualizerModal.StickyNotes;
      case Resources.VisualizerID.VisualScript:
        return Resources.VisualizerModal.VisualScript;
      case Resources.VisualizerID.AzureDevops:
        return Resources.VisualizerModal.AzureDevops;
      case Resources.VisualizerID.Timeline:
        return Resources.VisualizerModal.Timeline
    }
  }
}

Resources.VisualizerModal = {
  Azure: 'm-importazure',
  Aws: 'm-importaws',
  OrgChart: 'm-orgChartVisualizer',
  Jira: 'm-jiraFindIssue',
  JiraReports: 'm-jiraReportVisualizer',
  DecisionTree: 'm-decisionTreeVisualizer',
  Erd: 'm-erdVisualizer',
  UMLClass: 'm-classDiagramVisualizer',
  UMLSequence: 'm-umlSequenceVisualizer',
  StickyNotes: 'm-importstickynotes',
  VisualScript: 'm-importsdon',
  AzureDevops: 'm-azureDevOpsFindItem',
  Timeline: 'm-timelineVisualizer',
  DataChart: 'dd-selectGraph',
  Gauge: 'dd-selectGauge'
}

Resources.Arrowhead = function (e, t, a, r, i, n, o, s) {

  this.Id = e >= 0 ? e : - 1,
    this.Description = null != t &&
      'string' == typeof t ? t : null,
    this.Width = a >= 0 ||
      a < 0 ? a : 0,
    this.Height = r >= 0 ||
      r < 0 ? r : 0,
    this.EndPoint = i instanceof Resources.Point ? Resources.Point(i.X, i.Y) : new Resources.Point,
    this.AttachPoint = n instanceof Resources.Point ? Resources.Point(n.X, n.Y) : new Resources.Point,
    this.Centered = null == o &&
    o,
    this.Geometry = null != s &&
      s instanceof Array ? s : [],
    Object.preventExtensions(this)
}

Resources.Arrowhead.prototype.MakeArrowheads = function () {
  var e = new Resources.Arrowhead;
  e.Id = 0,
    e.Description = 'No Arrow',
    e.Width = 1,
    e.Height = 1,
    e.EndPoint = new Resources.Point(0, 0),
    e.AttachPoint = new Resources.Point(0, 0),
    e.Centered = !1,
    e.Geometry = [],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 1,
    e.Description = 'Filled Arrow',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(0, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !0, null, 'M0,0L10,5L0,10z')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 2,
    e.Description = 'Line Arrow',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(10, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,0L10,5L0,10')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 3,
    e.Description = 'Fancy Arrow',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(5, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !0, null, 'M0,0L10,5L0,10L5,5z')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 4,
    e.Description = 'Filled Circle',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(5, 5),
    e.AttachPoint = new Resources.Point(0, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('OVAL', !0, null, new Resources.GeometryPathData(0, 0, 10, 10))
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 5,
    e.Description = 'Unfilled Circle',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(5, 5),
    e.AttachPoint = new Resources.Point(0, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('OVAL', !1, 0.5, new Resources.GeometryPathData(0, 0, 10, 10))
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 6,
    e.Description = 'Filled Square',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(5, 5),
    e.AttachPoint = new Resources.Point(0, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('RECT', !0, null, new Resources.GeometryPathData(0, 0, 10, 10))
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 7,
    e.Description = 'Unfilled Square',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(5, 5),
    e.AttachPoint = new Resources.Point(0, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('RECT', !1, 0.5, new Resources.GeometryPathData(0, 0, 10, 10))
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 8,
    e.Description = 'Crows Foot',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(0, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,5L10,0M0,5L10,5M0,5L10,10')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 9,
    e.Description = 'Slash',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(5, 5),
    e.AttachPoint = new Resources.Point(5, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,10L10,0')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 10,
    e.Description = 'Filled Crows Foot',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(5, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, null, 'M0,5L10,0L10,10z')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 11,
    e.Description = 'Filled Diamond',
    e.Width = 20,
    e.Height = 10,
    e.EndPoint = new Resources.Point(20, 5),
    e.AttachPoint = new Resources.Point(5, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, null, 'M0,5L10,0L20,5L10,10z')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 12,
    e.Description = 'Zero to Many',
    e.Width = 20,
    e.Height = 10,
    e.EndPoint = new Resources.Point(20, 5),
    e.AttachPoint = new Resources.Point(5, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, null, new Resources.GeometryPathData(0, 0, 10, 10))
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 13,
    e.Description = 'One to Many',
    e.Width = 20,
    e.Height = 10,
    e.EndPoint = new Resources.Point(20, 5),
    e.AttachPoint = new Resources.Point(10, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M5,0L5,10'),
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M10,5L20,0M10,5L20,5M10,5L20,10')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 14,
    e.Description = 'Zero to One',
    e.Width = 20,
    e.Height = 10,
    e.EndPoint = new Resources.Point(20, 5),
    e.AttachPoint = new Resources.Point(0, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('OVAL', !1, 0.5, new Resources.GeometryPathData(0, 0, 10, 10)),
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M10,5L20,5M15,0L15,10')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 15,
    e.Description = 'One to One',
    e.Width = 20,
    e.Height = 10,
    e.EndPoint = new Resources.Point(20, 5),
    e.AttachPoint = new Resources.Point(20, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M5,0L5,10M10,0L10,10')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 16,
    e.Description = 'One to Zero',
    e.Width = 20,
    e.Height = 10,
    e.EndPoint = new Resources.Point(15, 5),
    e.AttachPoint = new Resources.Point(10, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M5,0L5,10'),
      new Resources.ArrowheadGeometry('OVAL', !1, 0.5, new Resources.GeometryPathData(10, 0, 10, 10))
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 17,
    e.Description = 'Center Filled Arrow',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(5, 5),
    e.AttachPoint = new Resources.Point(5, 5),
    e.Centered = !0,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !0, null, 'M0,0L10,5L0,10z')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 18,
    e.Description = 'Center Line Arrow',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(5, 5),
    e.AttachPoint = new Resources.Point(5, 5),
    e.Centered = !0,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,0L10,5L0,10L5,5z')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 19,
    e.Description = 'Center Fancy Arrow',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(5, 5),
    e.AttachPoint = new Resources.Point(5, 5),
    e.Centered = !0,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !0, null, 'M0,0L10,5L0,10L5,5z')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 20,
    e.Description = 'Double Arrow',
    e.Width = 20,
    e.Height = 10,
    e.EndPoint = new Resources.Point(20, 5),
    e.AttachPoint = new Resources.Point(0, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !0, null, 'M0,0L10,5L0,10z'),
      new Resources.ArrowheadGeometry('PATH', !0, null, 'M10,0L20,5L10,10z')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 21,
    e.Description = 'Filled Dimension Arrow',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(0, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !0, null, 'M0,0L10,5L0,10z'),
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M10,0L10,10')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 22,
    e.Description = 'Line Dimension Arrow',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(10, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,0L10,5L0,10'),
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M10,0L10,10')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 23,
    e.Description = 'Dimension Line',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(10, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M10,0L10,10')
    ],
    Resources.Arrowheads.push(e),
    Resources.Arrowheads.push(new Resources.Arrowhead(24, 'ARROW MISSING')),
    (e = new Resources.Arrowhead).Id = 25,
    e.Description = 'Arc Down',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(5, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 1, 'M5,5A5,5 0 0,1 10,10')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 26,
    e.Description = 'Arc Up',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(5, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 1, 'M5,5A5,5 0 0,0 10,0')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 27,
    e.Description = 'Half Arrow Up',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(10, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,0L10,5')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 28,
    e.Description = 'Half Arrow Down',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(10, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,10L10,5')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 29,
    e.Description = 'Center Cross',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(5, 5),
    e.AttachPoint = new Resources.Point(5, 5),
    e.Centered = !0,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,0L10,10M0,10L10,0')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 30,
    e.Description = 'Half Line Up',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(10, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M10,5L10,0')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 31,
    e.Description = 'Half Line Down',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(10, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M10,5L10,10')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 32,
    e.Description = 'Back Slash',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(5, 5),
    e.AttachPoint = new Resources.Point(5, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,0L10,10')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 33,
    e.Description = 'Unfilled Arrow',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(0, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,0L10,5L0,10z')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 34,
    e.Description = 'Unfilled Crows Foot',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(0, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,5L10,0L10,10z')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 35,
    e.Description = 'Unfilled Diamond',
    e.Width = 20,
    e.Height = 10,
    e.EndPoint = new Resources.Point(20, 5),
    e.AttachPoint = new Resources.Point(0, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,5L10,0L20,5L10,10z')
    ],
    Resources.Arrowheads.push(e),
    (e = new Resources.Arrowhead).Id = 36,
    e.Description = 'Single Line Cross',
    e.Width = 10,
    e.Height = 10,
    e.EndPoint = new Resources.Point(10, 5),
    e.AttachPoint = new Resources.Point(10, 5),
    e.Centered = !1,
    e.Geometry = [
      new Resources.ArrowheadGeometry('PATH', !1, 0.5, 'M0,0L0,10')
    ],
    Resources.Arrowheads.push(e)
}

Resources.TextureScale = function () {

  this.Units = 0,
    this.Scale = 0,
    this.RWidth = 0,
    this.AlignmentScalar = 0,
    this.Flags = 0,
    this.FromJSON = function (e) {
      return $.extend(!0, this, e)
    },
    Object.preventExtensions(this)
}

Resources.TextureFlags = {
  SD_Tx_UseColors: 1,
  SD_Tx_EMF: 2,
  SD_Tx_Std: 4
}

Resources.SDTexture = function () {
  this.ImageURL = null,
    this.BlobBytes = null,
    this.imagetype,
    this.dim = {
      x: 0,
      y: 0
    },
    this.mr = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    this.index = - 1,
    this.flags = 0,
    this.categoryindex = 0,
    this.TextureScale = null,
    this.name = '',
    this.filename = ''
}

// Resources.SDTextureList = function () {
//   this.Textures = [],
//     this.Categories = []
// }

Resources.SDRichGradientStop = function (e, t, a) {
  this.color = e,
    this.opacity = t,
    this.stop = a
}

Resources.SDRichGradient = function (e, t) {
  this.gradienttype = e,
    this.angle = t,
    this.stops = []
}

/*
ConstantData.FillTypes = {
  SDFILL_TRANSPARENT: 0,
  SDFILL_SOLID: 1,
  SDFILL_GRADIENT: 2,
  SDFILL_TEXTURE: 3,
  SDFILL_IMAGE: 4,
  SDFILL_RICHGRADIENT: 5
}
*/

Resources.RichGradientTypes = {
  SDFILL_RICHGRADIENT_LINEAR: 0,
  SDFILL_RICHGRADIENT_RADIAL_BR: 1,
  SDFILL_RICHGRADIENT_RADIAL_BL: 2,
  SDFILL_RICHGRADIENT_RADIAL_CENTER: 3,
  SDFILL_RICHGRADIENT_RADIAL_BC: 4,
  SDFILL_RICHGRADIENT_RADIAL_TC: 5,
  SDFILL_RICHGRADIENT_RADIAL_TR: 6,
  SDFILL_RICHGRADIENT_RADIAL_TL: 7,
  SDFILL_RICHGRADIENT_RECT_BR: 8,
  SDFILL_RICHGRADIENT_RECT_BL: 9,
  SDFILL_RICHGRADIENT_RECT_CENTER: 10,
  SDFILL_RICHGRADIENT_RECT_TR: 11,
  SDFILL_RICHGRADIENT_RECT_TL: 12,
  SDFILL_RICHGRADIENT_SHAPE: 13
}

Resources.Windows_LinePatterns = {
  SEP_None: 0,
  SEP_Solid: 1,
  SEP_Dotted: 2,
  SEP_Dashed: 3,
  SEP_DDashed: 4,
  SEP_DDDashed: 5,
  SEP_DoubleLine: 6,
  SEP_FilledLine: 7
}

Resources.LinePatternData = [
  0,
  '1,1',
  '3,1',
  '3,1,1,1',
  '3,1,1,1,1,1'
]

/*
ConstantData.Colors = {
  Color_White: '#FFFFFF',
  Color_Black: '#000000',
  Color_Hilite: '#0099FF',
  Color_Select: '#00FF00',
  Color_Row_Shade: '#F1F1F1',
  Color_Trans: 4294967295,
  Color_Gray: '#C0C0C0'
}
  */

// Resources.StyleDefaults = {
//   SDSTYLE_DEFAULT: 'Style7',
//   SDSTYLE_DEFTHICK: 1,
//   SDSTYLE_DEFFONT: 'Arial'
// }

Resources.SDGHatchStyleTotal = 53


/*
Resources.PaintData = function (e) {




  // ConstantData.FillTypes = {
  //   SDFILL_TRANSPARENT: 0,
  //   SDFILL_SOLID: 1,
  //   SDFILL_GRADIENT: 2,
  //   SDFILL_TEXTURE: 3,
  //   SDFILL_IMAGE: 4,
  //   SDFILL_RICHGRADIENT: 5
  // }

  this.FillType = ConstantData.FillTypes.SDFILL_SOLID,
    this.Color = e,
    this.EndColor = ConstantData.Colors.Color_White,
    this.GradientFlags = 0,
    this.Texture = 0,
    this.TextureScale = new Resources.TextureScale,
    this.Opacity = 1,
    this.EndOpacity = 1,
    this.FromJSON = function (e) {
      $.extend(this, e),
        this.TextureScale = new Resources.TextureScale,
        this.TextureScale.FromJSON(e.TextureScale),
        this.Opacity = 1,
        this.EndOpacity = 1
    }
}
    */


/*
Resources.FillData = function () {



  // ConstantData.Colors = {
  //   Color_White: '#FFFFFF',
  //   Color_Black: '#000000',
  //   Color_Hilite: '#0099FF',
  //   Color_Select: '#00FF00',
  //   Color_Row_Shade: '#F1F1F1',
  //   Color_Trans: 4294967295,
  //   Color_Gray: '#C0C0C0'
  // }

  this.Paint = new Resources.PaintData(ConstantData.Colors.Color_White),
    this.Hatch = 0,
    this.FillEffect = 0,
    this.EffectColor = null,
    this.WParam = 0,
    this.LParam = 0,
    this.FromJSON = function (e) {
      $.extend(this, e),
        this.Paint = new Resources.PaintData(ConstantData.Colors.Color_White),
        this.Paint.FromJSON(e.Paint)
    }
}
    */


// Resources.LineData = function () {

//   this.Paint = new Resources.PaintData(ConstantData.Colors.Color_Black),
//     this.Hatch = 0,
//     this.LineEffect = 0,
//     this.Thickness = Resources.StyleDefaults.SDSTYLE_DEFTHICK,
//     this.LinePattern = 0,
//     this.BThick = 0,
//     this.EdgeColor = null,
//     this.LParam = 0,
//     this.WParam = 0,
//     this.FromJSON = function (e) {
//       $.extend(this, e),
//         this.Paint = new Resources.PaintData(ConstantData.Colors.Color_Black),
//         this.Paint.FromJSON(e.Paint)
//     }
// }

// Resources.OutsideEffectData = function () {

//   this.OutsideType = 0,
//     this.OutsideExtent_Right = 0,
//     this.OutsideExtent_Left = 0,
//     this.OutsideExtent_Top = 0,
//     this.OutsideExtent_Bottom = 0,
//     this.Color = ConstantData.Colors.Color_Black,
//     this.LParam = 0,
//     this.WParam = 0,
//     this.FromJSON = function (e) {
//       $.extend(this, e)
//     }
// }

Resources.InsideEffectData = function () {

  this.Effect = 0,
    this.EffectColor = ConstantData.Colors.Color_White,
    this.LParam = 0,
    this.WParam = 0,
    this.FromJSON = function (e) {
      $.extend(this, e)
    }
}

Resources.GradientData = function () {

  this.Color = null,
    this.EndColor = null,
    this.GradientFlags = 0,
    this.FromJSON = function (e) {
      $.extend(this, e)
    }
}

Resources.GetFontIdByName = function (e) {
  for (var t = Resources.WebFonts, a = t.length, r = 0; r < a; r++) {
    if (t[r].Name === e) return r
  }
  return - 1
}

/*
Resources.TextFormatData = function () {

  this.Paint = new Resources.PaintData(ConstantData.Colors.Color_Black),
    this.FontName = Resources.StyleDefaults.SDSTYLE_DEFFONT,
    this.FontType = 'sanserif',
    this.FontId = Resources.GetFontIdByName(Resources.StyleDefaults.SDSTYLE_DEFFONT),
    this.FontSize = 10,
    this.Face = 0,
    this.Effect = new Resources.OutsideEffectData,
    this.FromJSON = function (e) {
      $.extend(this, e),
        this.Paint = new Resources.PaintData(ConstantData.Colors.Color_Black),
        this.Effect = new Resources.OutsideEffectData,
        this.Paint.FromJSON(e.Paint),
        this.Effect.FromJSON(e.Effect)
    }
}
    */

/*
// Double ===
Resources.QuickStyle = function () {



  // Resources.StyleDefaults = {
  //   SDSTYLE_DEFAULT: 'Style7',
  //   SDSTYLE_DEFTHICK: 1,
  //   SDSTYLE_DEFFONT: 'Arial'
  // }

  this.Name = Resources.StyleDefaults.SDSTYLE_DEFAULT,
    this.Fill = new Resources.FillData,
    this.Border = new Resources.LineData,
    this.OutsideEffect = new Resources.OutsideEffectData,
    this.Text = new Resources.TextFormatData,
    this.Line = new Resources.LineData,
    this.FromJSON = function (e) {
      this.Name = e.Name,
        this.Fill.FromJSON(e.Fill),
        this.Border.FromJSON(e.Border),
        this.OutsideEffect.FromJSON(e.OutsideEffect),
        this.Text.FromJSON(e.Text),
        this.Line.FromJSON(e.Line)
    }
}
*/

Resources.SDTheme = function () {

  this.Name = null,
    this.Category = null,
    this.Background = new Resources.FillData,
    this.EffectStyleIndex = 0,
    this.Styles = [],
    this.Colors = [],
    this.OutsideEffects = [],
    this.InsideEffects = [],
    this.Gradients = [],
    this.RecentStyles = [],
    this.FromJSON = function (e) {
      var t = e.Styles.length,
        a = e.Colors.length,
        r = e.OutsideEffects.length,
        i = e.InsideEffects.length,
        n = e.Gradients.length;
      this.Name = e.Name,
        this.Category = e.Category,
        this.Background.FromJSON(e.Background),
        this.EffectStyleIndex = e.EffectStyleIndex,
        this.RecentStyles = e.RecentStyles,
        this.Styles = [],
        this.Colors = [],
        this.OutsideEffects = [],
        this.InsideEffects = [],
        this.Gradients = [];
      var o = 0;
      for (o = 0; o < t; o++) {
        var s = new QuickStyle();// new Resources.QuickStyle;
        // Double ===
        s.FromJSON(e.Styles[o]),
          this.Styles.push(s)
      }
      for (o = 0; o < a; o++) this.Colors.push(e.Colors[o]);
      for (o = 0; o < r; o++) {
        var l = new Resources.OutsideEffectData;
        l.FromJSON(e.OutsideEffects[o]),
          this.OutsideEffects.push(l)
      }
      for (o = 0; o < i; o++) {
        var S = new Resources.InsideEffectData;
        S.FromJSON(e.InsideEffects[o]),
          this.InsideEffects.push(S)
      }
      for (o = 0; o < n; o++) {
        var c = new Resources.GradientData;
        c.FromJSON(e.Gradients[o]),
          this.Gradients.push(c)
      }
    }
}

Resources.FindTheme = function (e) {
  var t,
    a,
    r = e.charAt(0);
  return r.toUpperCase(),
    t = e.length,
    a = r + e.substring(1, t),
    Resources.ThemeNames.indexOf(a)
}

Resources.FindStyle = function (e) {

  /*
  let currentTheme = Resources.CurrentTheme;
  if (currentTheme && currentTheme.Styles) {
    for (let i = 0; i < currentTheme.Styles.length; i++) {
      console.log('currentTheme.Styles[i].Name', currentTheme.Styles[i].Name, currentTheme.Styles[i]);
      if (currentTheme.Styles[i].Name === e) {
        return currentTheme.Styles[i];
      }
    }
  }
  return null;
  */

  return new QuickStyle()
}

Resources.FindStyleIndex = function (e) {
  var t,
    a,
    r = Resources.CurrentTheme;
  if (r && r.Styles) for (t = r.Styles.length, a = 0; a < t; a++) if (r.Styles[a].Name === e) return a;
  return - 1
}

Resources.MatchFlags = {
  SDSTYLE_NOMATCH_FILL: 1,
  SDSTYLE_NOMATCH_LINETHICK: 2,
  SDSTYLE_NOMATCH_LINEPAT: 4,
  SDSTYLE_NOMATCH_LINEFILL: 8,
  SDSTYLE_NOMATCH_TEXTFONT: 16,
  SDSTYLE_NOMATCH_TEXTSIZE: 32,
  SDSTYLE_NOMATCH_TEXTFACE: 64,
  SDSTYLE_NOMATCH_TEXTFILL: 128,
  SDSTYLE_NOMATCH_OUTSIDE: 256,
  SDSTYLE_NOMATCH_BTHICK: 512
}

Resources.SD_CompareStyles = function (e, t, a) {
  var r = Resources.MatchFlags,
    i = 0;
  return i = e.Fill.Hatch === t.Fill.Hatch &&
    Resources.SD_EqualFillEffect(e.Fill, t.Fill) &&
    Resources.SD_EqualPaint(e.Fill.Paint, t.Fill.Paint, a) ? 0 : r.SDSTYLE_NOMATCH_FILL,
    e.Line.Thickness != t.Line.Thickness &&
    (i |= r.SDSTYLE_NOMATCH_LINETHICK),
    e.Line.BThick != t.Line.BThick &&
    (i |= r.SDSTYLE_NOMATCH_LINETHICK),
    e.Line.LinePattern != t.Line.LinePattern &&
    (i |= r.SDSTYLE_NOMATCH_LINEPAT),
    e.Line.Hatch == t.Line.Hatch &&
    Resources.SD_EqualLineEffect(e.Line, t.Line) &&
    Resources.SD_EqualPaint(e.Line.Paint, t.Line.Paint, a) ||
    (i |= r.SDSTYLE_NOMATCH_LINEFILL),
    e.Text.FontName != t.Text.FontName &&
    (i |= r.SDSTYLE_NOMATCH_TEXTFONT),
    e.Text.FontSize != t.Text.FontSize &&
    (i |= r.SDSTYLE_NOMATCH_TEXTSIZE),
    e.Text.Face != t.Text.Face &&
    (i |= r.SDSTYLE_NOMATCH_TEXTFACE),
    Resources.SD_EqualPaint(e.Text.Paint, t.Text.Paint, a) &&
    Resources.SD_EqualOutside(e.Text.Effect, t.Text.Effect) ||
    (i |= r.SDSTYLE_NOMATCH_TEXTFILL),
    Resources.SD_EqualOutside(e.OutsideEffect, t.OutsideEffect) ||
    (i |= r.SDSTYLE_NOMATCH_OUTSIDE),
    i
}

Resources.SD_CompareLines = function (e, t, a) {
  var r = Resources.MatchFlags,
    i = 0;
  return e.Thickness != t.Thickness &&
    (i |= r.SDSTYLE_NOMATCH_LINETHICK),
    e.LinePattern != t.LinePattern &&
    (i |= r.SDSTYLE_NOMATCH_LINEPAT),
    e.Hatch == t.Hatch &&
    Resources.SD_EqualLineEffect(e, t) &&
    Resources.SD_EqualPaint(e.Paint, t.Paint, a) ||
    (i |= r.SDSTYLE_NOMATCH_LINEFILL),
    i
}

Resources.SDEqualTxScale = function (e, t) {
  return e.Scale === t.Scale &&
    e.RWidth === t.RWidth &&
    e.Units === t.Units &&
    e.AlignmentScalar === t.AlignmentScalar &&
    e.Flags === t.Flags
}

Resources.SD_EqualRichGradient = function (e, t) {
  var a,
    r,
    i;
  if (
    r = e.stops.length,
    i = t.stops.length,
    e.gradienttype === t.gradienttype &&
    e.angle === t.angle &&
    r === i
  ) {
    for (a = 0; a < r; a++) {
      if (e.stops[a].color !== t.stops[a].color) return !1;
      if (e.stops[a].opacity !== t.stops[a].opacity) return !1;
      if (e.stops[a].stop !== t.stops[a].stop) return !1
    }
    return !0
  }
  return !1
}

Resources.SD_EqualPaint = function (e, t, a) {
  var r = ConstantData.FillTypes;
  if (e.FillType !== t.FillType) return !1;
  switch (e.FillType) {
    case r.SDFILL_SOLID:
      return e.Color === t.Color &&
        e.Opacity === t.Opacity;
    case r.SDFILL_RICHGRADIENT:
      return e.gradientflags == t.gradientflags;
    case r.SDFILL_GRADIENT:
      return e.Color === t.Color &&
        e.Opacity === t.Opacity &&
        e.EndColor === t.EndColor &&
        e.EndOpacity === t.EndOpacity &&
        e.GradientFlags === t.GradientFlags;
    case r.SDFILL_TEXTURE:
      return a ? e.Texture === t.Texture &&
        Resources.SDEqualTxScale(e.TextureScale, t.TextureScale) : e.Texture === t.Texture;
    default:
      return e.Opacity === t.Opacity
  }
}

Resources.SD_EqualFillEffect = function (e, t) {
  return e.FillEffect === t.FillEffect &&
    e.WParam === t.WParam &&
    e.LParam === t.LParam &&
    e.EffectColor === t.EffectColor
}

Resources.SD_EqualLineEffect = function (e, t) {
  return e.LineEffect === t.LineEffect &&
    e.WParam === t.WParam &&
    e.LParam === t.LParam
}

Resources.SD_EqualOutside = function (e, t) {
  return e.OutsideType === t.OutsideType &&
    e.Color === t.Color &&
    e.OutsideExtent_Left == t.OutsideExtent_Left &&
    e.OutsideExtent_Top === t.OutsideExtent_Top &&
    e.OutsideExtent_Right === t.OutsideExtent_Right &&
    e.OutsideExtent_Bottom === t.OutsideExtent_Bottom &&
    e.WParam === t.WParam &&
    e.LParam === t.LParam
}

Resources.SD_EqualFill = function (e, t) {
  return Resources.SD_EqualPaint(e.Paint, t.Paint, !0) &&
    Resources.SD_EqualFillEffect(e, t) &&
    e.Hatch === t.Hatch
}

Resources.ControlInfo = function (e, t, a, r, i, n, o) {
  this.Id = null == e ? null : e,
    this.Control = null,
    this.MinSelectedItems = null == t ? 0 : t,
    this.MinSelectedShapes = null == a ? 0 : a,
    this.MinSelectedLines = null == r ? 0 : r,
    this.NotesEditEnable = null != i &&
    i,
    this.HasTextOnly = null != n &&
    n,
    this.NoPolyLineContainer = null != o &&
    o,
    this.GetControl = function (e) {
      if (null != this.Control && !0 !== e) return this.Control;
      var t = $('#' + this.Id);
      return null != t &&
        t.length > 0 ? (this.Control = t, this.Control) : null
    }
}

Resources.GroupControlInfo = function (e) {
  Resources.ControlInfo.call(this, e),
    this.ClassName = null == e ? null : e,
    this.GetControl = function (e) {
      if (null != this.Control && (null == e || !0 !== e)) return this.Control;
      var t = $('.' + this.ClassName);
      return null != t &&
        t.length > 0 ? (this.Control = t, this.Control) : null
    }
}

Resources.ClearControls = function (e) {
  for (var t in e) e[t].Control = null
}

Resources.ClearToolPaletteControls = function () {
  for (var e in Resources.Controls.ToolPalettes) {
    var t = Resources.Controls.GetToolPaletteControls(Resources.Controls.ToolPalettes[e].Id);
    t &&
      Resources.ClearControls(t)
  }
}

Resources.GroupControlInfo.prototype = new Resources.ControlInfo,
  Resources.GroupControlInfo.prototype.constructor = Resources.GroupControlInfo,
  Resources.BusinessNames = {
    OrgChart: 'ORGCHART',
    FlowChart: 'FLOWCHART',
    DecisionTree: 'DECISIONTREE',
    Pedigree: 'PEDIGREE',
    Descendant: 'DESCENDANT',
    CauseAndEffect: 'CAUSEANDEFFECT',
    Genogram: 'GENOGRAM',
    FloorPlan: 'FLOORPLAN',
    MindMap: 'MINDMAP',
    TaskMap: 'TASKMAP',
    ProjectChart: 'PROJECTCHART',
    Table: 'TABLE',
    Engineering: 'ENGINEERING',
    StepChart: 'STEPCHART',
    StepChartV: 'STEPCHARTV',
    LineDraw: 'LINEDRAW',
    LineDrawUMLClass: 'LINEDRAW_UMLCLASS',
    LineDrawUML: 'LINEDRAW_UML',
    LineDrawUMLComponent: 'LINEDRAW_UMLCOMPONENT',
    LineDrawERD: 'LINEDRAW_ERD',
    LineDrawBPMN: 'LINEDRAW_BPMN',
    LineDrawSwimlane: 'LINEDRAW_SWIMLANE',
    LineDrawBPMNTask: 'LINEDRAW_BPMN_TASK',
    LineDrawBPMNEvent: 'LINEDRAW_BPMN_EVENT',
    LineDrawBPMNGateway: 'LINEDRAW_BPMN_GATEWAY',
    LineDrawBPMNData: 'LINEDRAW_BPMN_DATA',
    LineDrawBPMNChoreography: 'LINEDRAW_BPMN_CHOREOGRAPHY',
    LineDrawBPMNPool: 'LINEDRAW_BPMN_POOL',
    LineDrawEngineering: 'LINEDRAW_ENGINEERING',
    LineDrawAWS: 'LINEDRAW_AWS',
    LineDrawAzure: 'LINEDRAW_AZURE'
  }

Resources.Controls = {
  MainApp: {
    App: new Resources.ControlInfo('mainApp')
  },
  Ribbons: {
    Design: new Resources.ControlInfo('r-design'),
    Help: new Resources.ControlInfo('r-help'),
    Home: new Resources.ControlInfo('r-home'),
    Insert: new Resources.ControlInfo('r-insert'),
    Page: new Resources.ControlInfo('r-page'),
    Table: new Resources.ControlInfo('r-table'),
    Review: new Resources.ControlInfo('r-review'),
    File: new Resources.ControlInfo('r-file'),
    Options: new Resources.ControlInfo('r-options'),
    Developer: new Resources.ControlInfo('r-developer'),
    Charts: new Resources.ControlInfo('r-charts')
  },
  RibbonButtons: {
    File: new Resources.ControlInfo('r-fileTab'),
    ReadOnly_EditFile: new Resources.ControlInfo('ro-editFile'),
    BuyButton: new Resources.ControlInfo('r-buyLink'),
    DeveloperTab: new Resources.ControlInfo('r-developerTab'),
    ViewOptionsButton: new Resources.ControlInfo('r-topbar-viewOptions')
  },
  Ribbon_Design: {
    SetSize: new Resources.ControlInfo('r-design-setSize', 1),
    SetWidth: new Resources.ControlInfo('r-design-setWidth', 1),
    SetHeight: new Resources.ControlInfo('r-design-setHeight', 1),
    SetLeft: new Resources.ControlInfo('r-design-setLeft', 1),
    SetTop: new Resources.ControlInfo('r-design-setTop', 1),
    ChangeShape: new Resources.ControlInfo('r-design-changeShape', 1, 1),
    EditShapeOutline: new Resources.ControlInfo('r-design-editShapeOutline', 1, 1),
    ChangeLineShape: new Resources.ControlInfo('r-design-changeLineShape', 1, 0, 1),
    ConnectionPoints: new Resources.ControlInfo('r-design-connectionPoints', 0, 1, 0, null, null, !0),
    TextEntry: new Resources.ControlInfo('r-design-textEntry', 1),
    Dimensions: new Resources.ControlInfo('r-design-dimensions', 1),
    ShapeProperties: new Resources.ControlInfo('r-design-shapeProperties', 1, 1),
    ShapeLayout: new Resources.ControlInfo('r-design-layout', 1),
    FreezeProperties: new Resources.ControlInfo('r-design-freezeProperties', 1),
    Lock: new Resources.ControlInfo('r-design-lockObject', 1),
    Bullets: new Resources.ControlInfo('r-design-bullets', 1, 0, 0, !0, !0),
    Spacing: new Resources.ControlInfo('r-design-spacing', 1, 0, 0, !0, !0),
    TextAlign: new Resources.ControlInfo('r-design-textAlign', 1, 0, 0, !0, !0),
    Direction: new Resources.ControlInfo('r-design-direction', 0, 0, 1)
  },
  Ribbon_Help: {
    GetSupport: new Resources.ControlInfo('r-help-getSupport'),
    About: new Resources.ControlInfo('r-help-about'),
    BuyLink: new Resources.ControlInfo('r-help-buy'),
    License: new Resources.ControlInfo('r-help-license')
  },
  Ribbon_Home: {
    Paste: new Resources.ControlInfo('r-home-paste'),
    Copy: new Resources.ControlInfo('r-home-copy'),
    Cut: new Resources.ControlInfo('r-home-cut', 1),
    FormatPainter: new Resources.ControlInfo('r-home-formatPainter', 1),
    Undo: new Resources.ControlInfo('r-home-undo'),
    ReDo: new Resources.ControlInfo('r-home-redo'),
    Select: new Resources.ControlInfo('r-home-select'),
    ShapeToolButtonGroup: new Resources.ControlInfo('r-home-shapeToolButtonGroup'),
    WallToolButtonGroup: new Resources.ControlInfo('r-home-wallToolButtonGroup'),
    LineTool: new Resources.ControlInfo('r-home-lineTool'),
    LineToolDD: new Resources.ControlInfo('r-home-lineToolDD'),
    WallTool: new Resources.ControlInfo('r-home-wallTool'),
    ShapeTool: new Resources.ControlInfo('r-home-shapeTool'),
    ShapeToolDD: new Resources.ControlInfo('r-home-shapeToolDD'),
    Text: new Resources.ControlInfo('r-home-text'),
    AddLink: new Resources.ControlInfo('r-home-addLink', 1),
    AddNote: new Resources.ControlInfo('r-home-addNote', 1),
    Theme: new Resources.ControlInfo('r-home-theme'),
    QuickStyle: new Resources.ControlInfo('r-home-quickStyle'),
    Fill: new Resources.ControlInfo('r-home-fill'),
    Lines: new Resources.ControlInfo('r-home-lines'),
    LineStyle: new Resources.ControlInfo('r-home-lineStyle'),
    Effects: new Resources.ControlInfo('r-home-effects'),
    Font: new Resources.ControlInfo('r-home-font'),
    CurrentFontLabel: new Resources.ControlInfo('r-home-currentFont'),
    TextSize: new Resources.ControlInfo('r-home-textSize'),
    CurrentTextSizeLabel: new Resources.ControlInfo('r-home-currentTextSize'),
    Bold: new Resources.ControlInfo('r-home-bold', 0, 0, 0, !0),
    Italic: new Resources.ControlInfo('r-home-italic', 0, 0, 0, !0),
    Underline: new Resources.ControlInfo('r-home-underline', 0, 0, 0, !0),
    Subscript: new Resources.ControlInfo('r-home-subscript', 1, 0, 0, !0),
    Superscript: new Resources.ControlInfo('r-home-superscript', 1, 0, 0, !0),
    TextColor: new Resources.ControlInfo('r-home-textColor', 0, 0, 0, !0),
    InsertSymbol: new Resources.ControlInfo('r-home-insertSymbol', 0, 0, 0, !0),
    ExportSharePrintContainer: new Resources.ControlInfo('r-share'),
    Rotate: new Resources.ControlInfo('r-home-rotate', 1),
    Align: new Resources.ControlInfo('r-home-align', 2),
    Group: new Resources.ControlInfo('r-home-group', 1),
    BringToFront: new Resources.ControlInfo('r-home-bringToFront', 1),
    SendToBack: new Resources.ControlInfo('r-home-sendToBack', 1),
    Flip: new Resources.ControlInfo('r-home-flip', 1),
    MakeSame: new Resources.ControlInfo('r-home-makeSame', 2),
    SpaceEvenly: new Resources.ControlInfo('r-home-spaceEvenly', 3)
  },
  Ribbon_Insert: {
    AddPicture: new Resources.ControlInfo('r-insert-addPicture'),
    AddComment: new Resources.ControlInfo('r-insert-addComment', 1),
    AddNote: new Resources.ControlInfo('r-insert-addNote', 1),
    AddLink: new Resources.ControlInfo('r-insert-addLink', 1),
    AddGraph: new Resources.ControlInfo('r-insert-addGraph'),
    Addl: new Resources.ControlInfo('r-insert-addGauge')
  },
  Ribbon_File: {
    New: new Resources.ControlInfo('r-file-new'),
    Open: new Resources.ControlInfo('r-file-save'),
    SaveAs: new Resources.ControlInfo('r-file-saveAs'),
    SaveAsText: new Resources.ControlInfo('r-file-saveAsText'),
    Documents: new Resources.ControlInfo('r-file-myDocuments'),
    Recent: new Resources.ControlInfo('r-file-recent'),
    Print: new Resources.ControlInfo('r-file-print'),
    Share: new Resources.ControlInfo('r-file-share'),
    Export: new Resources.ControlInfo('r-file-export'),
    Import: new Resources.ControlInfo('r-file-import'),
    Options: new Resources.ControlInfo('r-file-options'),
    Account: new Resources.ControlInfo('r-file-account'),
    SaveAsText: new Resources.ControlInfo('r-file-saveAs-text')
  },
  Ribbon_Page: {
    SetBackground: new Resources.ControlInfo('r-page-setBackground'),
    SetOrientation: new Resources.ControlInfo('r-page-setOrientation'),
    SetMargins: new Resources.ControlInfo('r-page-setMargins'),
    SetLayers: new Resources.ControlInfo('r-page-layers'),
    SetWorkArea: new Resources.ControlInfo('r-page-setWorkArea'),
    CenterDrawing: new Resources.ControlInfo('r-page-centerDrawing'),
    SetScale: new Resources.ControlInfo('r-page-setScale'),
    SetSnaps: new Resources.ControlInfo('r-page-setSnaps'),
    SnapToShapes: new Resources.ControlInfo('r-page-snapToShapes'),
    ShowRulers: new Resources.ControlInfo('r-page-showRulers'),
    ShowGrid: new Resources.ControlInfo('r-page-showGrid'),
    ShowPageDividers: new Resources.ControlInfo('r-page-pageDividers'),
    UseSnaps: new Resources.ControlInfo('r-page-useSnaps'),
    Find: new Resources.ControlInfo('r-page-findInDoc'),
    Replace: new Resources.ControlInfo('r-page-replaceInDoc'),
    FindText: new Resources.ControlInfo('r-page-findText'),
    ReplaceText: new Resources.ControlInfo('r-page-replaceText'),
    MatchCase: new Resources.ControlInfo('r-page-matchCase'),
    MatchWord: new Resources.ControlInfo('r-page-matchWord')
  },
  Ribbon_Tablekey: {
    InsertTable: new Resources.ControlInfo('r-insertTable'),
    TableNew: new Resources.ControlInfo('r-tableNew'),
    TableNumRows: new Resources.ControlInfo('r-tableNumRows'),
    TableNumColumns: new Resources.ControlInfo('r-tableNumColumns'),
    RowsColumns: new Resources.ControlInfo('r-rowsColumns', 1),
    ColumnDelete: new Resources.ControlInfo('r-columnDelete', 1),
    TableInsertLeft: new Resources.ControlInfo('r-tableInsertLeft', 1),
    TableInsertRight: new Resources.ControlInfo('r-tableInsertRight', 1),
    TableInsertAbove: new Resources.ControlInfo('r-tableInsertAbove', 1),
    TableInsertBelow: new Resources.ControlInfo('r-tableInsertBelow', 1),
    TableJoin: new Resources.ControlInfo('r-tableJoin', 2),
    TableSplit: new Resources.ControlInfo('r-tableSplit', 1),
    TableDistribute: new Resources.ControlInfo('r-tableDistribute', 1),
    TableStyle: new Resources.ControlInfo('r-tableStyle'),
    TableDelete: new Resources.ControlInfo('r-tableDelete', 1),
    TableFormat: new Resources.ControlInfo('r-tableFormat'),
    TableFill: new Resources.ControlInfo('r-tableFill'),
    TableGrid: new Resources.ControlInfo('r-tableGrid'),
    TableEffects: new Resources.ControlInfo('r-tableEffects'),
    TableData: new Resources.ControlInfo('r-tableData'),
    TableAutoFill: new Resources.ControlInfo('r-tableAutoFill'),
    TableConvert: new Resources.ControlInfo('r-tableConvert', 1),
    TableConvertText: new Resources.ControlInfo('r-tableConvertText', 1),
    TableTextEditing: new Resources.ControlInfo('r-tableTextEditing', 1),
    TableTextEditingLabel: new Resources.ControlInfo('r-tableTextEditingLabel', 1)
  },
  Ribbon_Review: {
    SpellCheck: new Resources.ControlInfo('r-review-spellCheck'),
    ChangeDictionary: new Resources.ControlInfo('r-review-changeDictionary'),
    AddComment: new Resources.ControlInfo('r-review-addComment', 1),
    ShowComments: new Resources.ControlInfo('r-review-showComments'),
    NextComment: new Resources.ControlInfo('r-review-nextComment'),
    PreviousComment: new Resources.ControlInfo('r-review-previousComment'),
    Find: new Resources.ControlInfo('r-review-find'),
    FindReplace: new Resources.ControlInfo('r-review-findReplace')
  },
  Ribbon_Options: {
    ViewPres: new Resources.ControlInfo('r-options-viewPres'),
    SpellCheck: new Resources.ControlInfo('r-options-spellCheck'),
    ChangeDictionary: new Resources.ControlInfo('r-options-spellDict'),
    SpellOptions: new Resources.ControlInfo('r-options-spell')
  },
  Ribbon_Charts: {
    New: new Resources.ControlInfo('r-charts-new'),
    File: new Resources.ControlInfo('r-charts-file'),
    Clipboard: new Resources.ControlInfo('r-charts-clipboard'),
    AddSeries: new Resources.ControlInfo('r-charts-addSeries'),
    AddCategory: new Resources.ControlInfo('r-charts-addCategory'),
    DataTable: new Resources.ControlInfo('r-charts-dataTable'),
    Swap: new Resources.ControlInfo('r-charts-swap'),
    PieData: new Resources.ControlInfo('r-charts-pieData'),
    Type: new Resources.ControlInfo('r-charts-type'),
    Layout: new Resources.ControlInfo('r-charts-layout'),
    Rotate: new Resources.ControlInfo('r-charts-rotate'),
    Axes: new Resources.ControlInfo('r-charts-axes'),
    Grid: new Resources.ControlInfo('r-charts-grid'),
    Legend: new Resources.ControlInfo('r-charts-legend'),
    Data: new Resources.ControlInfo('r-charts-data'),
    HAxis: new Resources.ControlInfo('r-charts-hAxis'),
    VAxis: new Resources.ControlInfo('r-charts-vAxis'),
    GroupLabels: new Resources.ControlInfo('r-charts-groupLabels'),
    FormatLabels: new Resources.ControlInfo('r-charts-formatLabels')
  },
  // Collab: {
  //   CollabBar: new Resources.ControlInfo('collab-group-container'),
  //   IconList: new Resources.ControlInfo('collab-group-icon-list'),
  //   MoreUsers: new Resources.ControlInfo('collab-group-more-users'),
  //   MoreUsersIcon: new Resources.ControlInfo('collab-group-more-users-icon'),
  //   UserCount: new Resources.ControlInfo('collab-group-user-count'),
  //   NotificationArea: new Resources.ControlInfo('collab-notification-area')
  // },
  ContextMenus: {
    BPMN_Activity: new Resources.ControlInfo('cxt-bpmn-activity'),
    BPMN_Event: new Resources.ControlInfo('cxt-bpmn-event'),
    BPMN_Gateway: new Resources.ControlInfo('cxt-bpmn-gateway'),
    BPMN_Data: new Resources.ControlInfo('cxt-bpmn-data'),
    BPMN_Choreo: new Resources.ControlInfo('cxt-bpmn-choreo'),
    BPMN_Pool: new Resources.ControlInfo('cxt-bpmn-pool'),
    Default: new Resources.ControlInfo('cxt-default'),
    DefaultReadOnly: new Resources.ControlInfo('cxt-default-readonly'),
    PolyLine: new Resources.ControlInfo('cxt-polyline'),
    PolyWall: new Resources.ControlInfo('cxt-polywall'),
    Connector: new Resources.ControlInfo('cxt-connector'),
    FloorPlanWall: new Resources.ControlInfo('cxt-floorPlan-wall'),
    LineDashes: new Resources.ControlInfo('cxt-lineDashes'),
    LineSubMenu: new Resources.ControlInfo('cxt-lineSubMenu'),
    LineSubMenuCurve: new Resources.ControlInfo('cxt-linesubmenusetcurve'),
    LineSubMenuUMLClass: new Resources.ControlInfo('cxt-linesubmenuumlclass'),
    LineSubMenuUML: new Resources.ControlInfo('cxt-linesubmenuuml'),
    LineSubMenuUMLComponent: new Resources.ControlInfo('cxt-linesubmenuumlcomponent'),
    LineSubMenuERD: new Resources.ControlInfo('cxt-linesubmenuerd'),
    LineSubMenuBPMN: new Resources.ControlInfo('cxt-linesubmenubpmn'),
    LineSubMenuSingleWall: new Resources.ControlInfo('cxt-lineSubMenuSingleWall'),
    LineThickness: new Resources.ControlInfo('cxt-lineThickness'),
    WorkArea: new Resources.ControlInfo('cxt-workArea'),
    Table: new Resources.ControlInfo('cxt-table'),
    TableRows: new Resources.ControlInfo('cxt-table-rowsonly'),
    TableCols: new Resources.ControlInfo('cxt-table-columnsonly'),
    TableRowandCol: new Resources.ControlInfo('cxt-table-rowandcol'),
    PolylineSegMenu: new Resources.ControlInfo('cxt-polyline-segment'),
    PolywallSegMenu: new Resources.ControlInfo('cxt-polywall-segment'),
    SymbolMenu: new Resources.ControlInfo('cxt-symbolmenu'),
    BuilderSmartContainer: new Resources.ControlInfo('cxt-buildersmartcontainer'),
    TextMenu: new Resources.ControlInfo('cxt-textmenu'),
    PageTab: new Resources.ControlInfo('cxt-pagetab'),
    Wireframe: new Resources.ControlInfo('cxt-wireframe'),
    Gantt: new Resources.ControlInfo('cxt-gantt'),
    CustomSymbolLibrary: new Resources.ControlInfo('cxt-symbolLibraryMenu'),
    TextMenuData: new Resources.ControlInfo('cxt-textmenu-data'),
    RectContextMenu: new Resources.ControlInfo('cxt-smart-container'),
    Swimlane: new Resources.ControlInfo('cxt-swimlane'),
    Frame: new Resources.ControlInfo('cxt-frame'),
    Gauge: new Resources.ControlInfo('cxt-gauge'),
    Graph: new Resources.ControlInfo('cxt-graph'),
    Multiplicity: new Resources.ControlInfo('cxt-multiplicity')
  },
  CXT_Default: {
    Cut: new Resources.ControlInfo('cxt-default-cut'),
    Copy: new Resources.ControlInfo('cxt-default-copy'),
    Paste: new Resources.ControlInfo('cxt-default-paste'),
    StraightSeg: new Resources.ControlInfo('cxt-default-lineSegStraight'),
    CurvedSeg: new Resources.ControlInfo('cxt-default-lineSegCurved'),
    ChangeShape: new Resources.ControlInfo('cxt-default-changeShape'),
    AddHyperlink: new Resources.ControlInfo('cxt-default-addHyperlink'),
    AddNote: new Resources.ControlInfo('cxt-default-addNote'),
    AddComment: new Resources.ControlInfo('cxt-default-addComment'),
    ClearImage: new Resources.ControlInfo('cxt-default-clearImage'),
    ConvertToJiraCard: new Resources.ControlInfo('cxt-default-convertToJiraCard'),
    UpdateJiraIssue: new Resources.ControlInfo('cxt-default-updateJiraIssue'),
    Lock: new Resources.ControlInfo('cxt-default-Lock')
  },
  CXT_Rect: {
    Cut: new Resources.ControlInfo('cxt-smart-container-cut'),
    Copy: new Resources.ControlInfo('cxt-smart-container-copy'),
    Paste: new Resources.ControlInfo('cxt-smart-container-paste'),
    StraightSeg: new Resources.ControlInfo('cxt-smart-container-lineSegStraight'),
    CurvedSeg: new Resources.ControlInfo('cxt-smart-container-lineSegCurved'),
    ChangeShape: new Resources.ControlInfo('cxt-smart-container-changeShape'),
    Frame: new Resources.ControlInfo('cxt-smart-container-addFrame'),
    AddHyperlink: new Resources.ControlInfo('cxt-smart-container-addHyperlink'),
    AddNote: new Resources.ControlInfo('cxt-smart-container-addNote'),
    AddComment: new Resources.ControlInfo('cxt-smart-container-addComment'),
    ClearImage: new Resources.ControlInfo('cxt-smart-container-clearImage'),
    ConvertToJiraCard: new Resources.ControlInfo('cxt-smart-container-convertToJiraCard'),
    UpdateJiraIssue: new Resources.ControlInfo('cxt-smart-container-updateJiraIssue'),
    Lock: new Resources.ControlInfo('cxt-smart-container-Lock')
  },
  CTX_BuilderContainer: {
    Adjust: new Resources.ControlInfo('cxt-buildersmartcontainer-adjust')
  },
  CXT_Text: {
    Cut: new Resources.ControlInfo('cxt-text-cut'),
    Copy: new Resources.ControlInfo('cxt-text-copy'),
    Paste: new Resources.ControlInfo('cxt-text-paste'),
    AddHyperlink: new Resources.ControlInfo('cxt-text-addHyperlink')
  },
  CXT_TextData: {
    Cut: new Resources.ControlInfo('cxt-textmenu-data-cut'),
    Copy: new Resources.ControlInfo('cxt-textmenu-data-copy'),
    Paste: new Resources.ControlInfo('cxt-textmenu-data-paste'),
    AddHyperlink: new Resources.ControlInfo('cxt-textmenu-data-addHyperlink')
  },
  CXT_LineSubMenu: {
    Cut: new Resources.ControlInfo('cxt-lineSubMenu-cut'),
    Copy: new Resources.ControlInfo('cxt-lineSubMenu-copy'),
    Paste: new Resources.ControlInfo('cxt-lineSubMenu-paste'),
    Lock: new Resources.ControlInfo('cxt-lineSubMenu-Lock'),
    LockSingleWall: new Resources.ControlInfo('cxt-lineSubMenuSingleWall-Lock'),
    LockCurve: new Resources.ControlInfo('cxt-lineSubMenuSetCurve-Lock'),
    LockBPMN: new Resources.ControlInfo('cxt-lineSubMenuBPMN-Lock'),
    LockERD: new Resources.ControlInfo('cxt-lineSubMenuERD-Lock'),
    LockUML: new Resources.ControlInfo('cxt-lineSubMenuUML-Lock'),
    LockUMLClass: new Resources.ControlInfo('cxt-lineSubMenuUMLClass-Lock'),
    LockUMLComponent: new Resources.ControlInfo('cxt-lineSubMenuUMLComponent-Lock'),
    CurveBPMN: new Resources.ControlInfo('cxt-lineSubMenuBPMN-setCornerRadius'),
    CurveUML: new Resources.ControlInfo('cxt-lineSubMenuUML-setCornerRadius'),
    CurveUMLClass: new Resources.ControlInfo('cxt-lineSubMenuUMLClass-setCornerRadius'),
    CurveUMLComponent: new Resources.ControlInfo('cxt-lineSubMenuUMLComponent-setCornerRadius'),
    CurveERD: new Resources.ControlInfo('cxt-lineSubMenuERD-setCornerRadius'),
    SelChart: new Resources.ControlInfo('cxt-lineSubMenu-selectChart'),
    SelChartCurve: new Resources.ControlInfo('cxt-lineSubMenuSetCurve-selectChart'),
    SelChartBPMN: new Resources.ControlInfo('cxt-lineSubMenuBPMN-selectChart'),
    SelChartERD: new Resources.ControlInfo('cxt-lineSubMenuERD-selectChart'),
    SelChartUML: new Resources.ControlInfo('cxt-lineSubMenuUML-selectChart'),
    SelChartUMLClass: new Resources.ControlInfo('cxt-lineSubMenuUMLClass-selectChart'),
    SelChartUMLComponent: new Resources.ControlInfo('cxt-lineSubMenuUMLComponent-selectChart')
  },
  CXT_BPMN_Event: {
    EventTrigger: new Resources.ControlInfo('cxt-bpmn-event-eventtrigger'),
    Lock: new Resources.ControlInfo('cxt-bpmn-event-Lock')
  },
  CXT_LineThickness: {
    Thick0: new Resources.ControlInfo('cxt-lineThickness-thick0'),
    Thick1: new Resources.ControlInfo('cxt-lineThickness-thick1'),
    Thick2: new Resources.ControlInfo('cxt-lineThickness-thick2'),
    Thick3: new Resources.ControlInfo('cxt-lineThickness-thick3'),
    Thick5: new Resources.ControlInfo('cxt-lineThickness-thick5'),
    Thick8: new Resources.ControlInfo('cxt-lineThickness-thick8'),
    ThickCustom: new Resources.ControlInfo('cxt-lineThickness-thickCustom')
  },
  CXT_PolyLine: {
    Cut: new Resources.ControlInfo('cxt-polyline-cut'),
    Copy: new Resources.ControlInfo('cxt-polyline-copy'),
    Paste: new Resources.ControlInfo('cxt-polyline-paste'),
    PolyLine_AddNode: new Resources.ControlInfo('cxt-polyline-addnode'),
    PolyLine_RemoveNodes: new Resources.ControlInfo('cxt-polyline-removenodes'),
    PolyLine_Split: new Resources.ControlInfo('cxt-polyline-split'),
    StraightSeg: new Resources.ControlInfo('cxt-polyline-lineSegStraight'),
    CurvedSeg: new Resources.ControlInfo('cxt-polyline-lineSegCurved'),
    ChangeLineSegment: new Resources.ControlInfo('cxt-polyline-changeSegment'),
    Lock: new Resources.ControlInfo('cxt-polyline-Lock')
  },
  CXT_PolyLine_Segment: {
    LineSegStraight: new Resources.ControlInfo('cxt-polyline-segment-lineSegStraight'),
    LineSegCurved: new Resources.ControlInfo('cxt-polyline-segment-lineSegCurved'),
    LineSegParabola: new Resources.ControlInfo('cxt-polyline-segment-lineSegParabola'),
    LineSegEllipse: new Resources.ControlInfo('cxt-polyline-segment-lineSegEllipse')
  },
  CXT_BPMN_Activity: {
    Lock: new Resources.ControlInfo('cxt-bpmn-activity-Lock')
  },
  CXT_BPMN_Data: {
    Lock: new Resources.ControlInfo('cxt-bpmn-data-Lock')
  },
  CXT_BPMN_Gateway: {
    Lock: new Resources.ControlInfo('cxt-bpmn-gateway-Lock')
  },
  CXT_BPMN_Choreo: {
    RemoveParticipant: new Resources.ControlInfo('cxt-bpmn-choreo-removeparticipant'),
    Lock: new Resources.ControlInfo('cxt-bpmn-choreo-Lock')
  },
  CXT_BPMN_Pool: {
    RemoveLane: new Resources.ControlInfo('cxt-bpmn-pool-removelane'),
    Lock: new Resources.ControlInfo('cxt-bpmnpool-Lock')
  },
  CXT_Swimlane: {
    FillColumnHeader: new Resources.ControlInfo('cxt-swimlane-fillHeader'),
    FillRowHeader: new Resources.ControlInfo('cxt-swimlane-fillRowHeader'),
    FillLanes: new Resources.ControlInfo('cxt-swimlane-fillLanes'),
    Lock: new Resources.ControlInfo('cxt-swimlane-Lock')
  },
  CXT_Frame: {
    FillColumnHeader: new Resources.ControlInfo('cxt-frame-fillHeader'),
    FillFrame: new Resources.ControlInfo('cxt-frame-fillFrame'),
    FillLanes: new Resources.ControlInfo('cxt-frame-fillLanes'),
    Lock: new Resources.ControlInfo('cxt-frame-Lock')
  },
  CXT_Graph: {
    Lock: new Resources.ControlInfo('cxt-graph-Lock')
  },
  CXT_Gauge: {
    Lock: new Resources.ControlInfo('cxt-gauge-Lock')
  },
  CXT_Connector: {
    Connector_Cut: new Resources.ControlInfo('cxt-connector-cut'),
    Connector_Copy: new Resources.ControlInfo('cxt-connector-copy'),
    Connector_Paste: new Resources.ControlInfo('cxt-connector-paste'),
    Connector_Arrowheads: new Resources.ControlInfo('cxt-connector-arrowheads'),
    Connector_SetCornerRadius: new Resources.ControlInfo('cxt-connector-setCornerRadius'),
    Lock: new Resources.ControlInfo('cxt-connector-Lock'),
    ShowLineHops: new Resources.ControlInfo('cxt-connector-lineHops')
  },
  CXT_PolyWall: {
    RemoveLineSegment: new Resources.ControlInfo('cxt-polywall-removeCorner'),
    EditCorners: new Resources.ControlInfo('cxt-polywall-editCorners'),
    Split: new Resources.ControlInfo('cxt-polywall-split'),
    Lock: new Resources.ControlInfo('cxt-polywall-Lock')
  },
  CXT_FloorPlanWall: {
    Cut: new Resources.ControlInfo('cxt-floorPlanWall-cut'),
    Copy: new Resources.ControlInfo('cxt-floorPlanWall-copy'),
    Paste: new Resources.ControlInfo('cxt-floorPlanWall-paste'),
    Fill: new Resources.ControlInfo('cxt-floorPlanWall-fill'),
    BorderThickness: new Resources.ControlInfo('cxt-floorPlanWall-borderThickness'),
    BorderStyle: new Resources.ControlInfo('cxt-floorPlanWall-borderStyle'),
    BorderColor: new Resources.ControlInfo('cxt-floorPlanWall-borderColor'),
    ChangeSegment: new Resources.ControlInfo('cxt-floorPlanWall-changeSegment'),
    RemoveLineSegment: new Resources.ControlInfo('cxt-floorPlanWall-removeLineSegment'),
    AddCorner: new Resources.ControlInfo('cxt-floorPlanWall-addCorner'),
    SplitTwoLines: new Resources.ControlInfo('cxt-floorPlanWall-splitTwoLines'),
    ShowDimensions: new Resources.ControlInfo('cxt-floorPlanWall-showDimensions'),
    PositionSize: new Resources.ControlInfo('cxt-floorPlanWall-cxt-floorPlanWall-positionSize'),
    Lock: new Resources.ControlInfo('cxt-floorPlanWall-lock'),
    FreezeProperties: new Resources.ControlInfo('cxt-floorPlanWall-freezeProperties')
  },
  CXT_WorkArea: {
    Cut: new Resources.ControlInfo('cxt-workArea-cut'),
    Copy: new Resources.ControlInfo('cxt-workArea-copy'),
    Paste: new Resources.ControlInfo('cxt-workArea-paste'),
    Background: new Resources.ControlInfo('cxt-workArea-background'),
    CenterInWorkArea: new Resources.ControlInfo('cxt-workArea-centerInWorkArea'),
    WorkArea: new Resources.ControlInfo('cxt-workArea-workArea')
  },
  CXT_Table: {
    DeleteRow: new Resources.ControlInfo('cxt-table-deleterow'),
    DeleteColumn: new Resources.ControlInfo('cxt-table-deletecol'),
    Join: new Resources.ControlInfo('cxt-table-join'),
    Split: new Resources.ControlInfo('cxt-table-split'),
    InsertRowAbove: new Resources.ControlInfo('cxt-table-insertrows-above'),
    InsertRowBelow: new Resources.ControlInfo('cxt-table-insertrows-below'),
    InsertColLeft: new Resources.ControlInfo('cxt-table-insertcols-left'),
    InsertColRight: new Resources.ControlInfo('cxt-table-insertcols-right'),
    AllowTextEditing: new Resources.ControlInfo('cxt-table-allowtextedit')
  },
  CXT_PageTab: {
    Insert: new Resources.ControlInfo('cxt-pagetab-insert'),
    Duplicate: new Resources.ControlInfo('cxt-pagetab-insertdup'),
    Rename: new Resources.ControlInfo('cxt-pagetab-rename'),
    Delete: new Resources.ControlInfo('cxt-pagetab-delete')
  },
  CXT_Wireframe: {
    Insert: new Resources.ControlInfo('cxt-wireframe-insert'),
    Remove: new Resources.ControlInfo('cxt-wireframe-delete'),
    AddIcon: new Resources.ControlInfo('cxt-wireframe-addicons'),
    AddSeparator: new Resources.ControlInfo('cxt-wireframe-separator'),
    ToggleEnable: new Resources.ControlInfo('cxt-wireframe-disable')
  },
  CXT_Gantt: {
    AddTask: new Resources.ControlInfo('cxt-gantt-add'),
    RemoveTask: new Resources.ControlInfo('cxt-gantt-remove'),
    AddMilestone: new Resources.ControlInfo('cxt-gantt-milestone'),
    Indent: new Resources.ControlInfo('cxt-gantt-indent'),
    Outdent: new Resources.ControlInfo('cxt-gantt-outdent'),
    Trello: new Resources.ControlInfo('cxt-gantt-trello')
  },
  CXT_SymbolMenu: {
    Credits: new Resources.ControlInfo('cxt-symbolmenu-credits'),
    DeleteSymbol: new Resources.ControlInfo('cxt-symbolmenu-delete'),
    UpdateSymbol: new Resources.ControlInfo('cxt-symbolmenu-update'),
    CopyIDButton: new Resources.ControlInfo('cxt-symbolMenu-copyID'),
    HiddenIDTextField: new Resources.ControlInfo('cxt-symbolMenu-clipboardInput'),
    CMSDeleteSymbol: new Resources.ControlInfo('cxt-symbolmenu-cmsdelete'),
    CMSEditSymbol: new Resources.ControlInfo('cxt-symbolmenu-cmsedit'),
    RemoveRecent: new Resources.ControlInfo('cxt-symbolmenu-removerecent')
  },
  Dropdowns: {
    Align: new Resources.ControlInfo('dd-align'),
    Arrowheads: new Resources.ControlInfo('dd-arrowheads'),
    ArrowheadsERD: new Resources.ControlInfo('dd-arrowheadsERD'),
    ArrowClass: new Resources.ControlInfo('dd-arrowClass'),
    ArrowInterface: new Resources.ControlInfo('dd-arrowInterface'),
    ArrowUML: new Resources.ControlInfo('dd-arrowUML'),
    ArrowERDLeft: new Resources.ControlInfo('dd-arrowERDLeft'),
    ArrowERDRight: new Resources.ControlInfo('dd-arrowERDRight'),
    ArrowBPMN: new Resources.ControlInfo('dd-arrowBPMN'),
    AddDepo: new Resources.ControlInfo('dd-addDepo'),
    AssignmentMenu: new Resources.ControlInfo('dd-assignmentMenu'),
    Background: new Resources.ControlInfo('dd-background'),
    Bevel: new Resources.ControlInfo('dd-bevelEffects'),
    BorderThickness: new Resources.ControlInfo('dd-borderThickness'),
    BorderStyle: new Resources.ControlInfo('dd-borderStyle'),
    Borders: new Resources.ControlInfo('dd-borders'),
    BPMNEventTriggerStart: new Resources.ControlInfo('dd-bpmnEventTriggerS'),
    BPMNEventTriggerStartNI: new Resources.ControlInfo('dd-bpmnEventTriggerSNI'),
    BPMNEventTriggerIntermediate: new Resources.ControlInfo('dd-bpmnEventTriggerINT'),
    BPMNEventTriggerIntermediateNI: new Resources.ControlInfo('dd-bpmnEventTriggerINTNI'),
    BPMNEventTriggerIntermediateThrow: new Resources.ControlInfo('dd-bpmnEventTriggerINTTH'),
    BPMNEventTriggerEnd: new Resources.ControlInfo('dd-bpmnEventTriggerE'),
    BPMNEventType: new Resources.ControlInfo('dd-bpmnEventType'),
    BPMNActivityType: new Resources.ControlInfo('dd-bpmnActivityType'),
    BPMNActivityMarker: new Resources.ControlInfo('dd-bpmnMarker'),
    BPMNTaskType: new Resources.ControlInfo('dd-bpmnTaskType'),
    BPMNGatewayType: new Resources.ControlInfo('dd-bpmnGatewayType'),
    BPMNDataType: new Resources.ControlInfo('dd-bpmnDataType'),
    BPMNChoreoType: new Resources.ControlInfo('dd-bpmnChoreoType'),
    BPMNChoreoMarker: new Resources.ControlInfo('dd-bpmnChoreoMarker'),
    BuilderTableCelltypes: new Resources.ControlInfo('dd-builder-tables-celltypes'),
    BranchStyle: new Resources.ControlInfo('dd-branchStyle'),
    ChangeShape: new Resources.ControlInfo('dd-changeShape'),
    ChangeShapeOrgChart: new Resources.ControlInfo('dd-changeShapeOrgChart'),
    ChangeLineShape: new Resources.ControlInfo('dd-changeLineShape'),
    ChangeWallShape: new Resources.ControlInfo('dd-changeWallShape'),
    ChartListPlain: new Resources.ControlInfo('dd-chartListPlain'),
    // CollabNamePreference: new Resources.ControlInfo('dd-collab-namePreference'),
    // CollabOptions: new Resources.ControlInfo('dd-collab-optionsMenu'),
    // CollabUserList: new Resources.ControlInfo('dd-collab-userList'),
    // CollabUserTooltip: new Resources.ControlInfo('dd-collab-userTooltip'),
    CommentPopup: new Resources.ControlInfo('dd-commentPopup'),
    ConfirmCommentDelete: new Resources.ControlInfo('dd-confirmCommentDelete'),
    ConnectorLineTool: new Resources.ControlInfo('dd-connectorLineTool'),
    DataRulesIcons: new Resources.ControlInfo('dd-dataRulesIcons'),
    DepoSwitcher: new Resources.ControlInfo('dd-depoSwitcher'),
    DevTools: new Resources.ControlInfo('dd-devTools'),
    Effects: new Resources.ControlInfo('dd-effects'),
    ExpandedViewContainer: new Resources.ControlInfo('dd-expandedViewContainer'),
    Export: new Resources.ControlInfo('dd-export'),
    ExportImage: new Resources.ControlInfo('dd-export-image'),
    ExportPDF: new Resources.ControlInfo('dd-export-pdf'),
    Extensions: new Resources.ControlInfo('dd-extensions'),
    File: new Resources.ControlInfo('dd-file'),
    FileRibbonImport: new Resources.ControlInfo('dd-fileRibbonImport'),
    FileTypeSwitcher: new Resources.ControlInfo('dd-fileTypeSwitcher'),
    Fill: new Resources.ControlInfo('dd-fill'),
    Flip: new Resources.ControlInfo('dd-flip'),
    Gloss: new Resources.ControlInfo('dd-glossEffects'),
    Glow: new Resources.ControlInfo('dd-glowEffects'),
    GlowInner: new Resources.ControlInfo('dd-innerGlowEffects'),
    GradientColorOne: new Resources.ControlInfo('dd-gradientColorOne'),
    GradientColorTwo: new Resources.ControlInfo('dd-gradientColorTwo'),
    Group: new Resources.ControlInfo('dd-group'),
    Holidays: new Resources.ControlInfo('dd-holidays'),
    Icons: new Resources.ControlInfo('dd-icons'),
    Insert: new Resources.ControlInfo('dd-insert'),
    InsertDiagram: new Resources.ControlInfo('dd-insertDiagram'),
    InsertDataDiagram: new Resources.ControlInfo('dd-insertDataDiagram'),
    InsertShape: new Resources.ControlInfo('dd-insertShape'),
    ImportExport: new Resources.ControlInfo('m-importExport'),
    Layers: new Resources.ControlInfo('dd-layers'),
    LayerDropdownList: new Resources.ControlInfo('dd-layerDropdownList'),
    LegendList: new Resources.ControlInfo('dd-legendList'),
    Lines: new Resources.ControlInfo('dd-lines'),
    LineFill: new Resources.ControlInfo('dd-lineFill'),
    LineDropdown: new Resources.ControlInfo('dd-lineDropdown'),
    LineThickness: new Resources.ControlInfo('dd-lineThickness'),
    LineTool: new Resources.ControlInfo('dd-lineTool'),
    LineSetCornerRadius: new Resources.ControlInfo('dd-line-setCornerRadius'),
    GanttScroll: new Resources.ControlInfo('dd-gantt-scrollGantt'),
    TimeMeasure: new Resources.ControlInfo('dd-gantt-timeMeasure'),
    GanttScrollBar: new Resources.ControlInfo('dd-ganttScrollBar'),
    GanttScrollBarLeft: new Resources.ControlInfo('dd-ganttScrollLeft'),
    GanttScrollBarRight: new Resources.ControlInfo('dd-ganttScrollRight'),
    GaugeType: new Resources.ControlInfo('dd-gaugeType'),
    GaugeParameterBool: new Resources.ControlInfo('dd-gaugeParameterBool'),
    GraphType: new Resources.ControlInfo('dd-graphType'),
    GraphParameterBool: new Resources.ControlInfo('dd-graphParameterBool'),
    LineToolEngineering: new Resources.ControlInfo('dd-lineToolEngineering'),
    LineToolSwimlanes: new Resources.ControlInfo('dd-lineToolSwimlanes'),
    LineStyle: new Resources.ControlInfo('dd-lineStyle'),
    MakeSame: new Resources.ControlInfo('dd-makeSame'),
    MeetingTools: new Resources.ControlInfo('dd-meeting-tools'),
    Measures: new Resources.ControlInfo('dd-measures'),
    MobileTabs: new Resources.ControlInfo('dd-mobileTabs'),
    MoveObjectToLayer: new Resources.ControlInfo('dd-moveObjectToLayer'),
    Margins: new Resources.ControlInfo('dd-setMargins'),
    MindMapDirection: new Resources.ControlInfo('dd-mindMapDirection'),
    OrgChartBranchStyle: new Resources.ControlInfo('dd-orgChartBranchStyle'),
    OrgChartBranchStyleShort: new Resources.ControlInfo('dd-orgChartBranchStyleShort'),
    OrgChartBranchStyleLeft: new Resources.ControlInfo('dd-orgChartBranchStyleLeft'),
    OrgChartBranchStyleRight: new Resources.ControlInfo('dd-orgChartBranchStyleRight'),
    OrgChartBranchStyleUp: new Resources.ControlInfo('dd-orgChartBranchStyleUp'),
    OrgChartDirection: new Resources.ControlInfo('dd-orgChartDirection'),
    Orientation: new Resources.ControlInfo('dd-setOrientation'),
    PageList: new Resources.ControlInfo('dd-pageList'),
    PaperSize: new Resources.ControlInfo('dd-paperSize'),
    PrintOrientation: new Resources.ControlInfo('dd-printOrientation'),
    Quickstyles: new Resources.ControlInfo('dd-quickStyles'),
    CustomThemePreview: new Resources.ControlInfo('dd-customThemePreview'),
    Reflection: new Resources.ControlInfo('dd-reflectionEffects'),
    Rotate: new Resources.ControlInfo('dd-rotate'),
    RoundedRectFixed: new Resources.ControlInfo('dd-roundedRectFixed'),
    RoundedRectProportional: new Resources.ControlInfo('dd-roundedRectProportional'),
    SampleTables: new Resources.ControlInfo('dd-sampleTables'),
    Select: new Resources.ControlInfo('dd-select'),
    SmartContainerSetCornerRadius: new Resources.ControlInfo('dd-smart-container-setCornerRadius'),
    SetMargins: new Resources.ControlInfo('dd-setMargins'),
    SetOrientation: new Resources.ControlInfo('dd-setOrientation'),
    SetScale: new Resources.ControlInfo('dd-setScale'),
    SetScaleArchitecture: new Resources.ControlInfo('dd-scale-docArchitectural'),
    SetScaleMetric: new Resources.ControlInfo('dd-scale-docMetric'),
    SetScaleMechEng: new Resources.ControlInfo('dd-scale-docMechanicalEngineering'),
    SwimlaneOptions: new Resources.ControlInfo('dd-swimlaneOptions'),
    SwimlaneAddLanes: new Resources.ControlInfo('dd-swimlaneAddLanes'),
    FrameOptions: new Resources.ControlInfo('dd-frameOptions'),
    PrecisionDecimal: new Resources.ControlInfo('dd-scale-precisionDecimal'),
    PrecisionFraction: new Resources.ControlInfo('dd-scale-precisionFraction'),
    SetSnaps: new Resources.ControlInfo('dd-setSnaps'),
    SelectGraph: new Resources.ControlInfo('dd-selectGraph'),
    SelectGauge: new Resources.ControlInfo('dd-selectGauge'),
    SelChart: new Resources.ControlInfo('dd-selChart'),
    SelSwimlane: new Resources.ControlInfo('dd-selSwimlane'),
    Shadows: new Resources.ControlInfo('dd-shadowEffects'),
    ShadowsInner: new Resources.ControlInfo('dd-innerShadowEffects'),
    ShadowsCast: new Resources.ControlInfo('dd-castShadowEffects'),
    ShapeBasic: new Resources.ControlInfo('dd-shapesBasic'),
    ShapeDropdown: new Resources.ControlInfo('dd-shapeDropdown'),
    ShapeLayout: new Resources.ControlInfo('dd-shapeLayout'),
    ShapeProperties: new Resources.ControlInfo('dd-shapeProperties'),
    Share: new Resources.ControlInfo('dd-share'),
    SpaceEvenly: new Resources.ControlInfo('dd-spaceEvenly'),
    SwimlaneFormat: new Resources.ControlInfo('dd-swimlaneFormat'),
    SwimlaneGridAddLane: new Resources.ControlInfo('dd-swimlaneGrid-addLane'),
    SwimlaneGridRemoveLane: new Resources.ControlInfo('dd-swimlaneGrid-removeLane'),
    SwimlaneTextOrientation: new Resources.ControlInfo('dd-swimlaneTextOrientation'),
    SymbolLibrarySelect: new Resources.ControlInfo('dd-symbolLibSelect'),
    SymbolSearch: new Resources.ControlInfo('dd-symbolSearch'),
    TabsMore: new Resources.ControlInfo('dd-more'),
    TableDelete: new Resources.ControlInfo('dd-tableDelete'),
    TableDistribute: new Resources.ControlInfo('dd-tableDistribute'),
    TableNRows: new Resources.ControlInfo('dd-tableNRows'),
    TableNCols: new Resources.ControlInfo('dd-tableNCols'),
    TableNew: new Resources.ControlInfo('dd-tableNew'),
    Themes: new Resources.ControlInfo('dd-themes'),
    CustomThemes: new Resources.ControlInfo('dd-customThemes'),
    CustomThemesSwatchOptions: new Resources.ControlInfo('dd-customThemesSwatchOptions'),
    CustomThemesEditDelete: new Resources.ControlInfo('dd-customThemesEditDelete'),
    CustomThemeLineThickness: new Resources.ControlInfo('dd-customThemeLineThickness'),
    CustomThemeLineStyle: new Resources.ControlInfo('dd-customThemeLineStyle'),
    ThemeLegacy: new Resources.ControlInfo('dd-themeLegacy'),
    ThemeMore: new Resources.ControlInfo('dd-themeMore'),
    TextAlign: new Resources.ControlInfo('dd-textAlign'),
    TextBullets: new Resources.ControlInfo('dd-bullets'),
    TextColor: new Resources.ControlInfo('dd-textColor'),
    TextDirection: new Resources.ControlInfo('dd-textDirection'),
    TextFonts: new Resources.ControlInfo('dd-fonts'),
    TextSpacing: new Resources.ControlInfo('dd-textSpacing'),
    TextSize: new Resources.ControlInfo('dd-textSize'),
    TextPosition: new Resources.ControlInfo('dd-textPosition'),
    TextureUnits: new Resources.ControlInfo('dd-texture-units'),
    TextureAlignment: new Resources.ControlInfo('dd-texture-alignment'),
    TimeframeCustomYear: new Resources.ControlInfo('dd-timeframe-customyear'),
    TimeframeDays: new Resources.ControlInfo('dd-timeframe-days'),
    TimeframeMonths: new Resources.ControlInfo('dd-timeframe-months'),
    TimeframeYears: new Resources.ControlInfo('dd-timeframe-years'),
    TimelineConnectorStyle: new Resources.ControlInfo('dd-timelineConnectorStyle'),
    TimelineFormat: new Resources.ControlInfo('dd-timelineFormat'),
    TimelineEventPosition: new Resources.ControlInfo('dd-timelineEventPosition'),
    TimelineEventType: new Resources.ControlInfo('dd-timelineEventType'),
    TrelloBoardName: new Resources.ControlInfo('dd-trelloBoardName'),
    TrelloLane: new Resources.ControlInfo('dd-trelloLane'),
    TrelloMembers: new Resources.ControlInfo('dd-trelloMembers'),
    FindOptions: new Resources.ControlInfo('dd-findOptions'),
    ViewOptions: new Resources.ControlInfo('dd-viewOptions'),
    WallThickness: new Resources.ControlInfo('dd-wallThickness'),
    ZoomOptions: new Resources.ControlInfo('dd-zoomOptions'),
    AccountMenu: new Resources.ControlInfo('dd-accountMenu'),
    AddPage: new Resources.ControlInfo('dd-addPage'),
    MobileTabsReadOnly: new Resources.ControlInfo('dd-mobileTabsRo'),
    SpellingSuggest: new Resources.ControlInfo('dd-spellingSuggest'),
    SpellDict: new Resources.ControlInfo('dd-spellDictList'),
    SpellOptionsDD: new Resources.ControlInfo('dd-spellOptions'),
    ChartsNew: new Resources.ControlInfo('dd-chartsNew'),
    PieData: new Resources.ControlInfo('dd-pieData'),
    ChartType: new Resources.ControlInfo('dd-chartType'),
    ChartsQuickLaout: new Resources.ControlInfo('dd-chartsQuickLayout'),
    ChartRotate: new Resources.ControlInfo('dd-chartRotate'),
    ChartAxes: new Resources.ControlInfo('dd-axes'),
    ChartsGrid: new Resources.ControlInfo('dd-chartsGrid'),
    Legend: new Resources.ControlInfo('dd-legend'),
    ChartsData: new Resources.ControlInfo('dd-chartsData'),
    HorizontalAxis: new Resources.ControlInfo('dd-hAxis'),
    VerticalAxis: new Resources.ControlInfo('dd-vAxis'),
    GroupLabels: new Resources.ControlInfo('dd-groupLabels'),
    SmartContainerArrangement: new Resources.ControlInfo('dd-smartcontainerArrangement'),
    SmartContainerType: new Resources.ControlInfo('dd-smartcontainerType'),
    smartcontainerWrap: new Resources.ControlInfo('dd-smartcontainerWrap'),
    smartcontainerChild: new Resources.ControlInfo('dd-smartcontainerChild'),
    NoUserWidgetMenu: new Resources.ControlInfo('dd-noUserWidgetMenu'),
    PrintScale: new Resources.ControlInfo('dd-printScale'),
    PrintScaleOptions: new Resources.ControlInfo('dd-printScaleOptions'),
    ScaleArchitecture: new Resources.ControlInfo('dd-scale-architectural'),
    ScaleMetric: new Resources.ControlInfo('dd-scale-metric'),
    ScaleMechEngineering: new Resources.ControlInfo('dd-scale-mechanicalEngineering'),
    ScaleOptions: new Resources.ControlInfo('dd-ScaleOptions'),
    WireframeIcons: new Resources.ControlInfo('dd-wireframeIcons'),
    EditDataValues: new Resources.ControlInfo('dd-editDataValues'),
    DataFieldTypes: new Resources.ControlInfo('dd-datafieldtype'),
    DataTableSelect: new Resources.ControlInfo('dd-datatableselect'),
    DataTableActions: new Resources.ControlInfo('dd-datatableActions'),
    DataFieldSelect: new Resources.ControlInfo('dd-datafieldselect'),
    DataRuleSelect: new Resources.ControlInfo('dd-datarule-select'),
    DataRuleEdit: new Resources.ControlInfo('dd-datarule-edit'),
    DataRulesFieldSelect: new Resources.ControlInfo('dd-dataruledlg-fieldselect'),
    DataRulesOpSelect: new Resources.ControlInfo('dd-dataruledlg-opselect'),
    DataRulesBoolOpSelect: new Resources.ControlInfo('dd-dataruledlg-boolopselect'),
    DataRulesBoolSelect: new Resources.ControlInfo('dd-dataruledlg-boolselect'),
    DataRulesActionSelect: new Resources.ControlInfo('dd-dataruledlg-actionselect'),
    DataRulesColorSelect: new Resources.ControlInfo('dd-dataruledlg-colorselect'),
    TextMenuData: new Resources.ControlInfo('cxt-textmenu-data'),
    DataEditBoolSelect: new Resources.ControlInfo('dd-dataedit-boolselect'),
    DataEditPreset: new Resources.ControlInfo('dd-dataedit-preset'),
    PluginsList: new Resources.ControlInfo('dd-pluginsList'),
    D3SymbolLibSelect: new Resources.ControlInfo('dd-d3symbollibselect'),
    WallThickness: new Resources.ControlInfo('dd-wallThickness'),
    FreehandLines: new Resources.ControlInfo('dd-freehand-lines')
  },
  DD_Align: {
    Lefts: new Resources.ControlInfo('dd-align-lefts'),
    Centers: new Resources.ControlInfo('dd-align-centers'),
    Rights: new Resources.ControlInfo('dd-align-rights'),
    Tops: new Resources.ControlInfo('dd-align-tops'),
    Middles: new Resources.ControlInfo('dd-align-middles'),
    Bottoms: new Resources.ControlInfo('dd-align-bottoms')
  },
  DD_Arrowheads: {
    None: new Resources.ControlInfo('dd-arrowheads-none'),
    Right: new Resources.ControlInfo('dd-arrowheads-right'),
    Left: new Resources.ControlInfo('dd-arrowheads-left'),
    Both: new Resources.ControlInfo('dd-arrowheads-both'),
    Custom: new Resources.ControlInfo('dd-arrowheads-custom')
  },
  DD_CornerRadius: {
    None: new Resources.ControlInfo('dd-smart-container-setCornerRadius-none'),
    Medium: new Resources.ControlInfo('dd-smart-container-setCornerRadius-medium'),
    Custom: new Resources.ControlInfo('dd-smart-container-setCornerRadius-custom')
  },
  DD_LineSetCornerRadius: {
    None: new Resources.ControlInfo('dd-line-setCornerRadius-none'),
    Medium: new Resources.ControlInfo('dd-line-setCornerRadius-large'),
    Custom: new Resources.ControlInfo('dd-line-setCornerRadius-all')
  },
  DD_Background: {
    RecentColorGroup: new Resources.GroupControlInfo('bg-recent-color'),
    ThemeColorGroup: new Resources.GroupControlInfo('fill-theme-color'),
    StandardColorGroup: new Resources.GroupControlInfo('fill-standard-color'),
    NoFill: new Resources.ControlInfo('dd-background-no-fill'),
    Gradient: new Resources.ControlInfo('dd-background-gradient-trigger'),
    More: new Resources.ControlInfo('dd-background-colorpicker-trigger'),
    Texture: new Resources.ControlInfo('dd-background-texture-trigger')
  },
  DD_BranchStyle: {
    ChartStyle1: new Resources.ControlInfo('dd-branchStyle-chart1'),
    ChartStyle2: new Resources.ControlInfo('dd-branchStyle-chart2'),
    ChartStyle3: new Resources.ControlInfo('dd-branchStyle-chart3'),
    ChartStyle4: new Resources.ControlInfo('dd-branchStyle-chart4'),
    BranchStyle1: new Resources.ControlInfo('dd-branchStyle-branch1'),
    BranchStyle2: new Resources.ControlInfo('dd-branchStyle-branch2'),
    BranchStyle3: new Resources.ControlInfo('dd-branchStyle-branch3'),
    BranchStyle4: new Resources.ControlInfo('dd-branchStyle-branch4')
  },
  DD_BevelEffects: {
    1: new Resources.ControlInfo('dd-bevelEffects-bevel1'),
    2: new Resources.ControlInfo('dd-bevelEffects-bevel2'),
    3: new Resources.ControlInfo('dd-bevelEffects-bevel3'),
    4: new Resources.ControlInfo('dd-bevelEffects-bevel4'),
    5: new Resources.ControlInfo('dd-bevelEffects-bevel5'),
    6: new Resources.ControlInfo('dd-bevelEffects-bevel6'),
    7: new Resources.ControlInfo('dd-bevelEffects-bevel7'),
    8: new Resources.ControlInfo('dd-bevelEffects-bevel8'),
    9: new Resources.ControlInfo('dd-bevelEffects-bevel9')
  },
  DD_BorderThickness: {
    ThickNone: new Resources.ControlInfo('dd-borderThickness-thickNone'),
    Thick1: new Resources.ControlInfo('dd-borderThickness-thick1'),
    Thick2: new Resources.ControlInfo('dd-borderThickness-thick2'),
    Thick3: new Resources.ControlInfo('dd-borderThickness-thick3'),
    Thick4: new Resources.ControlInfo('dd-borderThickness-thick4'),
    Thick5: new Resources.ControlInfo('dd-borderThickness-thick5'),
    ThickCustom: new Resources.ControlInfo('dd-borderThickness-thickCustom')
  },
  DD_BorderStyle: {
    Solid: new Resources.ControlInfo('dd-borderStyle-solid'),
    Dotted: new Resources.ControlInfo('dd-borderStyle-dotted'),
    Dashed: new Resources.ControlInfo('dd-borderStyle-dashed'),
    DashDot: new Resources.ControlInfo('dd-borderStyle-dashdot'),
    DashDotDot: new Resources.ControlInfo('dd-borderStyle-dashdotdot'),
    Double: new Resources.ControlInfo('dd-borderStyle-double')
  },
  DD_Borders: {
    RecentColors: new Resources.GroupControlInfo('borders-recent-color'),
    ThemeColors: new Resources.GroupControlInfo('fill-theme-color'),
    StandardColors: new Resources.GroupControlInfo('fill-standard-color'),
    Transparency: new Resources.ControlInfo('dd-borders-opacity'),
    TransparencySlider: new Resources.ControlInfo('dd-borders-opacity-slider'),
    Gradient: new Resources.ControlInfo('dd-borders-gradient-trigger'),
    More: new Resources.ControlInfo('dd-borders-colorpicker-trigger'),
    Texture: new Resources.ControlInfo('dd-borders-textures-trigger'),
    Arrowheads: new Resources.ControlInfo('dd-borders-arrowheads')
  },
  DD_Comments: {
    TextArea: new Resources.ControlInfo('dd-commentPopup-textArea'),
    ThreadContainer: new Resources.ControlInfo('dd-commentPopup-threadContainer')
  },
  // DD_CollabNamePreference: {
  //   DisplayName: new Resources.ControlInfo('collab-name-display'),
  //   Email: new Resources.ControlInfo('collab-name-email'),
  //   Initial: new Resources.ControlInfo('collab-name-initial')
  // },
  // DD_CollabTooltip: {
  //   UserInfo: new Resources.ControlInfo('collab-user-info')
  // },
  // DD_CollabUserList: {
  //   UserList: new Resources.ControlInfo('collab-user-list-items')
  // },
  // DD_CollabOptions: {
  //   ToggleCursors: new Resources.ControlInfo('collab-cursors-label'),
  //   CopyDocLink: new Resources.ControlInfo('collab-copy-doc-link')
  // },
  DD_ChangeShape: {
    Shape0: new Resources.ControlInfo('dd-changeShape-shape0'),
    Shape1: new Resources.ControlInfo('dd-changeShape-shape1'),
    Shape2: new Resources.ControlInfo('dd-changeShape-shape2'),
    Shape3: new Resources.ControlInfo('dd-changeShape-shape3'),
    Shape4: new Resources.ControlInfo('dd-changeShape-shape4'),
    Shape5: new Resources.ControlInfo('dd-changeShape-shape5'),
    Shape6: new Resources.ControlInfo('dd-changeShape-shape6'),
    Shape7: new Resources.ControlInfo('dd-changeShape-shape7')
  },
  DD_InsertShape: {
    Shape0: new Resources.ControlInfo('dd-insertShape-shape0'),
    Shape1: new Resources.ControlInfo('dd-insertShape-shape1'),
    Shape2: new Resources.ControlInfo('dd-insertShape-shape2'),
    Shape3: new Resources.ControlInfo('dd-insertShape-shape3'),
    Shape4: new Resources.ControlInfo('dd-insertShape-shape4'),
    Shape5: new Resources.ControlInfo('dd-insertShape-shape5'),
    Shape6: new Resources.ControlInfo('dd-insertShape-shape6'),
    Shape7: new Resources.ControlInfo('dd-insertShape-shape7')
  },
  DD_DepoSwitcher: {
    SmartDraw: new Resources.ControlInfo('leftNav-depoBrowser-smartDraw'),
    GoogleDrive: new Resources.ControlInfo('leftNav-depoBrowser-google'),
    MicrsosoftOneDrive: new Resources.ControlInfo('leftNav-depoBrowser-microsoft'),
    DropBox: new Resources.ControlInfo('leftNav-depoBrowser-dropBox'),
    AddNew: new Resources.ControlInfo('leftNav-depoBrowser-addNewDepo')
  },
  DD_AddDepo: {
    GoogleDrive: new Resources.ControlInfo('dd-addDepo-google'),
    MicrsosoftOneDrive: new Resources.ControlInfo('dd-addDepo-microsoft'),
    DropBox: new Resources.ControlInfo('dd-addDepo-dropBox'),
    Box: new Resources.ControlInfo('dd-addDepo-box')
  },
  DD_AccountMenu: {
    AccountLink: new Resources.ControlInfo('tn-account'),
    DownloadLink: new Resources.ControlInfo('tn-downloadDesk'),
    BuyLink: new Resources.ControlInfo('tn-buyLink')
  },
  DD_AddPage: {
    PageSame: new Resources.ControlInfo('dd-addPage-same'),
    PageCopy: new Resources.ControlInfo('dd-addPage-duplicate'),
    PageNew: new Resources.ControlInfo('dd-addPage-new'),
    PageExisting: new Resources.ControlInfo('dd-addPage-existing'),
    Manage: new Resources.ControlInfo('dd-addPage-manage')
  },
  DD_devTools: {
    ImportGliffy: new Resources.ControlInfo('dd-devTools-importGliffy'),
    ImportSDON: new Resources.ControlInfo('dd-devTools-importSDON'),
    ImportText: new Resources.ControlInfo('dd-devTools-importtext')
  },
  DD_Effects: {
    NoOutside: new Resources.ControlInfo('dd-effects-noOutside'),
    Shadow: new Resources.ControlInfo('dd-effects-drop-shadow'),
    CastShadow: new Resources.ControlInfo('dd-effects-cast-shadow'),
    Glow: new Resources.ControlInfo('dd-effects-glow'),
    Reflection: new Resources.ControlInfo('dd-effects-reflection'),
    NoInside: new Resources.ControlInfo('dd-effects-noInside'),
    InnerShadow: new Resources.ControlInfo('dd-effects-inner-shadow'),
    InnerGlow: new Resources.ControlInfo('dd-effects-inner-glow'),
    Bevel: new Resources.ControlInfo('dd-effects-bevel'),
    Gloss: new Resources.ControlInfo('dd-effects-gloss')
  },
  DD_Export: {
    ExportOffice: new Resources.ControlInfo('dd-export-office'),
    ExportPDF: new Resources.ControlInfo('dd-export-pdf'),
    ExportSVG: new Resources.ControlInfo('dd-export-svg'),
    ExportPNG: new Resources.ControlInfo('dd-export-png'),
    ExportJPEG: new Resources.ControlInfo('dd-export-jpeg'),
    ExportVSDX: new Resources.ControlInfo('dd-export-vsdx'),
    ExportVSD: new Resources.ControlInfo('dd-export-vsd')
  },
  DD_File: {
  },
  DD_Fill: {
    RecentColorGroup: new Resources.GroupControlInfo('fill-recent-color'),
    ThemeColorGroup: new Resources.GroupControlInfo('fill-theme-color'),
    StandardColorGroup: new Resources.GroupControlInfo('fill-standard-color'),
    FillOpacity: new Resources.ControlInfo('dd-fill-opacity'),
    FillOpacitySlider: new Resources.ControlInfo('dd-fill-opacity-slider'),
    NoFill: new Resources.ControlInfo('dd-fill-no-fill'),
    Gradient: new Resources.ControlInfo('dd-fill-gradient-trigger'),
    More: new Resources.ControlInfo('dd-fill-colorpicker-trigger'),
    Texture: new Resources.ControlInfo('dd-fill-textures-trigger'),
    Hatch: new Resources.ControlInfo('dd-fill-hatch')
  },
  DD_Flip: {
    Horizontal: new Resources.ControlInfo('dd-flip-flipHorizontal'),
    Vertical: new Resources.ControlInfo('dd-flip-flipVertical')
  },
  DD_GlossEffects: {
    1: new Resources.ControlInfo('dd-glossEffects-gloss1'),
    2: new Resources.ControlInfo('dd-glossEffects-gloss2'),
    3: new Resources.ControlInfo('dd-glossEffects-gloss3'),
    4: new Resources.ControlInfo('dd-glossEffects-gloss4'),
    5: new Resources.ControlInfo('dd-glossEffects-gloss5'),
    6: new Resources.ControlInfo('dd-glossEffects-gloss6'),
    7: new Resources.ControlInfo('dd-glossEffects-gloss7'),
    8: new Resources.ControlInfo('dd-glossEffects-gloss8'),
    9: new Resources.ControlInfo('dd-glossEffects-gloss9'),
    10: new Resources.ControlInfo('dd-glossEffects-gloss10'),
    11: new Resources.ControlInfo('dd-glossEffects-gloss11'),
    12: new Resources.ControlInfo('dd-glossEffects-gloss12'),
    13: new Resources.ControlInfo('dd-glossEffects-gloss13'),
    14: new Resources.ControlInfo('dd-glossEffects-gloss14'),
    15: new Resources.ControlInfo('dd-glossEffects-gloss15')
  },
  DD_InsideGlow: {
    1: new Resources.ControlInfo('dd-glowEffects-insideGlow1'),
    2: new Resources.ControlInfo('dd-glowEffects-insideGlow2'),
    3: new Resources.ControlInfo('dd-glowEffects-insideGlow3'),
    4: new Resources.ControlInfo('dd-glowEffects-insideGlow4'),
    5: new Resources.ControlInfo('dd-glowEffects-insideGlow5'),
    6: new Resources.ControlInfo('dd-glowEffects-insideGlow6'),
    7: new Resources.ControlInfo('dd-glowEffects-insideGlow7'),
    8: new Resources.ControlInfo('dd-glowEffects-insideGlow8'),
    9: new Resources.ControlInfo('dd-glowEffects-insideGlow9')
  },
  DD_Glow: {
    1: new Resources.ControlInfo('dd-glowEffects-glow1'),
    2: new Resources.ControlInfo('dd-glowEffects-glow2'),
    3: new Resources.ControlInfo('dd-glowEffects-glow3'),
    4: new Resources.ControlInfo('dd-glowEffects-glow4'),
    5: new Resources.ControlInfo('dd-glowEffects-glow5'),
    6: new Resources.ControlInfo('dd-glowEffects-glow6'),
    7: new Resources.ControlInfo('dd-glowEffects-glow7'),
    8: new Resources.ControlInfo('dd-glowEffects-glow8'),
    9: new Resources.ControlInfo('dd-glowEffects-glow9')
  },
  DD_InsideShadow: {
    1: new Resources.ControlInfo('dd-shadowEffects-insideShadow1'),
    2: new Resources.ControlInfo('dd-shadowEffects-insideShadow2'),
    3: new Resources.ControlInfo('dd-shadowEffects-insideShadow3'),
    4: new Resources.ControlInfo('dd-shadowEffects-insideShadow4'),
    5: new Resources.ControlInfo('dd-shadowEffects-insideShadow5'),
    6: new Resources.ControlInfo('dd-shadowEffects-insideShadow6'),
    7: new Resources.ControlInfo('dd-shadowEffects-insideShadow7'),
    8: new Resources.ControlInfo('dd-shadowEffects-insideShadow8'),
    9: new Resources.ControlInfo('dd-shadowEffects-insideShadow9')
  },
  DD_Group: {
    Group: new Resources.ControlInfo('dd-group-group'),
    Ungroup: new Resources.ControlInfo('dd-group-ungroup')
  },
  DD_Icons: {
    None: new Resources.ControlInfo('dd-icons-none')
  },
  DD_ImportExport: {
  },
  DD_LayerDropdownList: {
    LayerList: new Resources.ControlInfo('dd-layerDropdownList-layerListItems'),
    New: new Resources.ControlInfo('dd-layerDropdownList-layerListNew'),
    Manage: new Resources.ControlInfo('dd-layerDropdownList-layerListManage'),
    Divider: new Resources.ControlInfo('dd-layerDropdownList-layerListDivider')
  },
  DD_Layers: {
    NewLayer: new Resources.ControlInfo('dd-layers-newLayer'),
    ManageLayers: new Resources.ControlInfo('dd-layers-manageLayers'),
    ShowAllLayers: new Resources.ControlInfo('dd-layers-showAllLayers'),
    MoveObjectToLayer: new Resources.ControlInfo('dd-layers-moveObjectToLayer'),
    BringToFront: new Resources.ControlInfo('dd-layers-bringToFrontOf'),
    SendToBack: new Resources.ControlInfo('dd-layers-sendToBackOf'),
    BringToFrontName: new Resources.ControlInfo('dd-layers-bringToFrontOf-name'),
    SendToBackName: new Resources.ControlInfo('dd-layers-sendToBackOf-name')
  },
  DD_LineDropdown: {
    LineColor: new Resources.ControlInfo('dd-layers-moveObjectToLayer')
  },
  DD_MeetingTools: {
    PenColorIndicator: new Resources.ControlInfo('dd-meeting-tools-pen-color'),
    HighlighterColorIndicator: new Resources.ControlInfo('dd-meeting-tools-highlighter-color')
  },
  DD_LineThickness: {
    Thick0: new Resources.ControlInfo('dd-lineThickness-thick0'),
    Thick1: new Resources.ControlInfo('dd-lineThickness-thick1'),
    Thick2: new Resources.ControlInfo('dd-lineThickness-thick2'),
    Thick3: new Resources.ControlInfo('dd-lineThickness-thick3'),
    Thick5: new Resources.ControlInfo('dd-lineThickness-thick5'),
    Thick8: new Resources.ControlInfo('dd-lineThickness-thick8'),
    ThickCustom: new Resources.ControlInfo('dd-lineThickness-more')
  },
  DD_CustomThemeLineThickness: {
    Thick0: new Resources.ControlInfo('dd-customThemeLineThickness-thick0'),
    Thick1: new Resources.ControlInfo('dd-customThemeLineThickness-thick1'),
    Thick2: new Resources.ControlInfo('dd-customThemeLineThickness-thick2'),
    Thick3: new Resources.ControlInfo('dd-customThemeLineThickness-thick3'),
    Thick5: new Resources.ControlInfo('dd-customThemeLineThickness-thick5'),
    Thick8: new Resources.ControlInfo('dd-customThemeLineThickness-thick8')
  },
  DD_CustomThemeLineStyle: {
    Solid: new Resources.ControlInfo('dd-customThemeLineStyle-solid'),
    Dotted: new Resources.ControlInfo('dd-customThemeLineStyle-dotted'),
    Dashed: new Resources.ControlInfo('dd-customThemeLineStyle-dashed'),
    DashDot: new Resources.ControlInfo('dd-customThemeLineStyle-dashdot'),
    DashDotDot: new Resources.ControlInfo('dd-customThemeLineStyle-dashdotdot')
  },
  DD_LineTool: {
    StraightLine: new Resources.ControlInfo('dd-lineTool-straight'),
    CurvedLine: new Resources.ControlInfo('dd-lineTool-curved'),
    ShapeConnector: new Resources.ControlInfo('dd-lineTool-connector'),
    CurvedConnector: new Resources.ControlInfo('dd-lineTool-curvedConnector'),
    FreehandLine: new Resources.ControlInfo('dd-lineTool-freehand'),
    PolygonLine: new Resources.ControlInfo('dd-lineTool-polygon'),
    AddWall: new Resources.ControlInfo('dd-lineTool-addWall')
  },
  DD_WallTool: {
    WallThicknessInterior: new Resources.ControlInfo('dd-wallThickness-interior'),
    WallThicknessExterior: new Resources.ControlInfo('dd-wallThickness-exterior'),
    WallThicknessMetricInterior: new Resources.ControlInfo('dd-wallThickness-metric-interior'),
    WallThicknessMetricExterior: new Resources.ControlInfo('dd-wallThickness-metric-exterior')
  },
  DD_LineToolEngineering: {
    StraightLine: new Resources.ControlInfo('dd-lineToolEngineering-straight'),
    CurvedLine: new Resources.ControlInfo('dd-lineToolEngineering-curved'),
    ShapeConnector: new Resources.ControlInfo('dd-lineToolEngineering-connector'),
    CurvedConnector: new Resources.ControlInfo('dd-lineToolEngineering-curvedConnector'),
    Comm: new Resources.ControlInfo('dd-lineToolEngineering-comm'),
    Digi: new Resources.ControlInfo('dd-lineToolEngineering-digi')
  },
  DD_SwimlaneFormat: {
    Column: new Resources.ControlInfo('dd-swimlaneFormat-column'),
    Row: new Resources.ControlInfo('dd-swimlaneFormat-row'),
    Grid: new Resources.ControlInfo('dd-swimlaneFormat-grid')
  },
  DD_SwimlaneOptions: {
    AutoResize: new Resources.ControlInfo('dd-swimlaneOptions-autoresizebox'),
    Container: new Resources.ControlInfo('dd-swimlaneOptions-containerbox'),
    TextDir: new Resources.ControlInfo('dd-swimlaneOptions-textdir'),
    TextDirBox: new Resources.ControlInfo('dd-swimlaneOptions-textdirbox'),
    TitleRow: new Resources.ControlInfo('dd-swimlaneOptions-titlerow'),
    TitleRowBox: new Resources.ControlInfo('dd-swimlaneOptions-titlerowbox'),
    AllowNesting: new Resources.ControlInfo('dd-swimlaneOptions-allownestbox'),
    FrameGroup: new Resources.ControlInfo('dd-swimlaneOptions-groupbox')
  },
  DD_SwimlaneAddLanes: {
    AddRowBelow: new Resources.ControlInfo('dd-swimlaneAddLanes-addRow-below'),
    AddRowAbove: new Resources.ControlInfo('dd-swimlaneAddLanes-addRow-above'),
    DeleteRow: new Resources.ControlInfo('dd-swimlaneAddLanes-deleteRow'),
    DeleteGridRow: new Resources.ControlInfo('dd-swimlaneAddLanes-deleteGridRow'),
    AddColLeft: new Resources.ControlInfo('dd-swimlaneAddLanes-addCol-left'),
    AddColRight: new Resources.ControlInfo('dd-swimlaneAddLanes-addCol-right'),
    DeleteCol: new Resources.ControlInfo('dd-swimlaneAddLanes-deleteCol'),
    DeleteGridCol: new Resources.ControlInfo('dd-swimlaneAddLanes-deleteGridCol')
  },
  DD_FrameOptions: {
    AutoResize: new Resources.ControlInfo('dd-frameOptions-autoresizebox'),
    TitleRow: new Resources.ControlInfo('dd-frameOptions-titlerow'),
    TitleRowBox: new Resources.ControlInfo('dd-frameOptions-titlerowbox'),
    AllowNesting: new Resources.ControlInfo('dd-frameOptions-allownestbox'),
    FrameGroup: new Resources.ControlInfo('dd-frameOptions-groupbox')
  },
  DD_LineToolSwimlanes: {
    StraightLine: new Resources.ControlInfo('dd-lineToolSwimlanes-straight'),
    CurvedLine: new Resources.ControlInfo('dd-lineToolSwimlanes-curved'),
    ShapeConnector: new Resources.ControlInfo('dd-lineToolSwimlanes-connector'),
    CurvedConnector: new Resources.ControlInfo('dd-lineToolSwimlanes-curvedConnector')
  },
  DD_LineStyle: {
    Solid: new Resources.ControlInfo('dd-lineStyle-solid'),
    Dotted: new Resources.ControlInfo('dd-lineStyle-dotted'),
    Dashed: new Resources.ControlInfo('dd-lineStyle-dashed'),
    DashDot: new Resources.ControlInfo('dd-lineStyle-dashdot'),
    DashDotDot: new Resources.ControlInfo('dd-lineStyle-dashdotdot')
  },
  DD_Lines: {
    LineTypes: new Resources.GroupControlInfo('dd-lines-lineItem'),
    RecentColors: new Resources.GroupControlInfo('line-recent-color'),
    ThemeColors: new Resources.GroupControlInfo('fill-theme-color'),
    StandardColors: new Resources.GroupControlInfo('fill-standard-color'),
    Transparency: new Resources.ControlInfo('dd-lines-opacity'),
    TransparencySlider: new Resources.ControlInfo('dd-lines-opacity-slider'),
    Gradient: new Resources.ControlInfo('dd-lines-gradient-trigger'),
    More: new Resources.ControlInfo('dd-lines-colorpicker-trigger'),
    Texture: new Resources.ControlInfo('dd-lines-textures-trigger'),
    Arrowheads: new Resources.ControlInfo('dd-lines-arrowheads')
  },
  DD_FreehandLine: {
    StylingOptions: new Resources.GroupControlInfo('freehand-styling-option'),
    ColorEntry: new Resources.GroupControlInfo('freehand-fill-color'),
    CustomColorGroup: new Resources.GroupControlInfo('freehand-custom-color'),
    FreehandColorContainer: new Resources.ControlInfo('dd-freehand-lines-color-container'),
    MoreColors: new Resources.ControlInfo('dd-freehand-lines-colorpicker-trigger'),
    TransparencySlider: new Resources.ControlInfo('dd-freehand-lines-opacity-slider'),
    MoreThickness: new Resources.ControlInfo('dd-lineThickness-more')
  },
  DD_LineFill: {
    LineTypes: new Resources.GroupControlInfo('dd-linefill-lineItem'),
    RecentColors: new Resources.GroupControlInfo('linefill-recent-color'),
    ThemeColors: new Resources.GroupControlInfo('fill-theme-color'),
    StandardColors: new Resources.GroupControlInfo('fill-standard-color'),
    Transparency: new Resources.ControlInfo('dd-linefill-opacity'),
    TransparencySlider: new Resources.ControlInfo('dd-linefill-opacity-slider'),
    Gradient: new Resources.ControlInfo('dd-linefill-gradient-trigger'),
    More: new Resources.ControlInfo('dd-linefill-colorpicker-trigger'),
    Texture: new Resources.ControlInfo('dd-linefill-textures-trigger'),
    Arrowheads: new Resources.ControlInfo('dd-linefill-arrowheads')
  },
  DD_MoveObjectToLayer: {
    Layers: new Resources.GroupControlInfo('dd-moveObjectToLayer')
  },
  DD_MakeSame: {
    SameHeight: new Resources.ControlInfo('dd-makeSame-sameHeight'),
    SameWidth: new Resources.ControlInfo('dd-makeSame-sameWidth'),
    Both: new Resources.ControlInfo('dd-makeSame-sameBoth')
  },
  DD_MobileTabs: {
    DeveloperButton: new Resources.ControlInfo('dd-mobileTabs-developer')
  },
  DD_SetMargins: {
    Normal: new Resources.ControlInfo('dd-setMargins-normal'),
    Narrow: new Resources.ControlInfo('dd-setMargins-narrow'),
    Wide: new Resources.ControlInfo('dd-setMargins-wide'),
    Custom: new Resources.ControlInfo('dd-setMargins-custom')
  },
  DD_MindMapDirection: {
    Horizontal: new Resources.ControlInfo('dd-mindMapDirection-horizontal'),
    Vertical: new Resources.ControlInfo('dd-mindMapDirection-vertical')
  },
  DD_OrgChartDirection: {
    TopDown: new Resources.ControlInfo('dd-orgChartDirection-topDown'),
    BottomUp: new Resources.ControlInfo('dd-orgChartDirection-bottomUp'),
    LeftToRight: new Resources.ControlInfo('dd-orgChartDirection-leftToRight'),
    RightToLeft: new Resources.ControlInfo('dd-orgChartDirection-rightToLeft')
  },
  DD_OrgChartBranchStyle: {
    Tree: new Resources.ControlInfo('dd-orgchartBranchStyle-tree'),
    Staggered: new Resources.ControlInfo('dd-orgchartBranchStyle-staggered'),
    RightColumn: new Resources.ControlInfo('dd-orgchartBranchStyle-rightColumn'),
    LeftColumn: new Resources.ControlInfo('dd-orgchartBranchStyle-leftColumn'),
    TwoColumn: new Resources.ControlInfo('dd-orgchartBranchStyle-twoColumn')
  },
  DD_SetOrientation: {
    Portrait: new Resources.ControlInfo('dd-setOrientation-portrait'),
    Landscape: new Resources.ControlInfo('dd-setOrientation-landscape')
  },
  DD_SelChart: {
    Left: new Resources.ControlInfo('dd-selChart-selectLeft'),
    Right: new Resources.ControlInfo('dd-selChart-selectRight'),
    Up: new Resources.ControlInfo('dd-selChart-selectUp'),
    Down: new Resources.ControlInfo('dd-selChart-selectDown')
  },
  DD_SelSwimlane: {
    selectColumnHeader: new Resources.ControlInfo('dd-selSwimlane-selectColumnHeader'),
    selectRowHeader: new Resources.ControlInfo('dd-selSwimlane-selectRowHeader'),
    selectLanes: new Resources.ControlInfo('dd-selSwimlane-selectLanes')
  },
  DD_PaperSize: {
    Letter: new Resources.ControlInfo('dd-paperSize-letter'),
    Legal: new Resources.ControlInfo('dd-paperSize-legal'),
    Ledger: new Resources.ControlInfo('dd-paperSize-ledger'),
    A: new Resources.ControlInfo('dd-paperSize-A'),
    B: new Resources.ControlInfo('dd-paperSize-B'),
    C: new Resources.ControlInfo('dd-paperSize-C'),
    D: new Resources.ControlInfo('dd-paperSize-D'),
    E: new Resources.ControlInfo('dd-paperSize-E'),
    ArchA: new Resources.ControlInfo('dd-paperSize-ArchA'),
    ArchB: new Resources.ControlInfo('dd-paperSize-ArchB'),
    ArchC: new Resources.ControlInfo('dd-paperSize-ArchC'),
    ArchD: new Resources.ControlInfo('dd-paperSize-ArchD'),
    ArchE: new Resources.ControlInfo('dd-paperSize-ArchE'),
    ArchE1: new Resources.ControlInfo('dd-paperSize-ArchE1'),
    A0: new Resources.ControlInfo('dd-paperSize-A0'),
    A1: new Resources.ControlInfo('dd-paperSize-A1'),
    A2: new Resources.ControlInfo('dd-paperSize-A2'),
    A3: new Resources.ControlInfo('dd-paperSize-A3'),
    A4: new Resources.ControlInfo('dd-paperSize-A4'),
    A5: new Resources.ControlInfo('dd-paperSize-A5'),
    A6: new Resources.ControlInfo('dd-paperSize-A6'),
    B0: new Resources.ControlInfo('dd-paperSize-B0'),
    B1: new Resources.ControlInfo('dd-paperSize-B1'),
    B2: new Resources.ControlInfo('dd-paperSize-B2'),
    B3: new Resources.ControlInfo('dd-paperSize-B3'),
    B4: new Resources.ControlInfo('dd-paperSize-B4'),
    B5: new Resources.ControlInfo('dd-paperSize-B5'),
    B6: new Resources.ControlInfo('dd-paperSize-B6')
  },
  DD_PrintOrientation: {
    Portrait: new Resources.ControlInfo('dd-printOrientation-portrait'),
    Landscape: new Resources.ControlInfo('dd-printOrientation-landscape')
  },
  DD_Ro: {
    Print: new Resources.ControlInfo('dd-mobileTabsRo-print')
  },
  DD_PrintScale: {
    OnePage: new Resources.ControlInfo('dd-printScaleOne'),
    ActualSize: new Resources.ControlInfo('dd-printScaleActual'),
    Custom: new Resources.ControlInfo('dd-printScaleCustom')
  },
  DD_PrintScaleOptions: {
    ScaleOptionsArchitectural: new Resources.ControlInfo('dd-printScaleOptions-architectural'),
    ScaleOptionsMetric: new Resources.ControlInfo('dd-printScaleOptions-metric'),
    ScaleOptionsMechEng: new Resources.ControlInfo('dd-printScaleOptions-mechanicalEngineering')
  },
  DD_DecimalPrecision: {
    DP_0: new Resources.ControlInfo('dd-scale-precisionDecimal-0'),
    DP_1: new Resources.ControlInfo('dd-scale-precisionDecimal-1'),
    DP_2: new Resources.ControlInfo('dd-scale-precisionDecimal-2'),
    DP_3: new Resources.ControlInfo('dd-scale-precisionDecimal-3'),
    DP_4: new Resources.ControlInfo('dd-scale-precisionDecimal-4'),
    DP_5: new Resources.ControlInfo('dd-scale-precisionDecimal-5'),
    DP_6: new Resources.ControlInfo('dd-scale-precisionDecimal-6')
  },
  DD_FractionalPrecision: {
    DP_0: new Resources.ControlInfo('dd-scale-precisionFraction-0'),
    DP_1: new Resources.ControlInfo('dd-scale-precisionFraction-1'),
    DP_2: new Resources.ControlInfo('dd-scale-precisionFraction-2'),
    DP_3: new Resources.ControlInfo('dd-scale-precisionFraction-3'),
    DP_4: new Resources.ControlInfo('dd-scale-precisionFraction-4'),
    DP_5: new Resources.ControlInfo('dd-scale-precisionFraction-5'),
    DP_6: new Resources.ControlInfo('dd-scale-precisionFraction-6')
  },
  DD_QuickStyles: {
  },
  DD_Rotate: {
    Rotate0: new Resources.ControlInfo('dd-rotate-0'),
    Rotate45: new Resources.ControlInfo('dd-rotate-45'),
    Rotate90: new Resources.ControlInfo('dd-rotate-90'),
    Rotate135: new Resources.ControlInfo('dd-rotate-135'),
    Rotate180: new Resources.ControlInfo('dd-rotate-180'),
    Rotate225: new Resources.ControlInfo('dd-rotate-225'),
    Rotate270: new Resources.ControlInfo('dd-rotate-270'),
    Rotate315: new Resources.ControlInfo('dd-rotate-315')
  },
  DD_Select: {
    SelectMultiple: new Resources.ControlInfo('dd-select-multiple'),
    SelectAll: new Resources.ControlInfo('dd-select-all'),
    SelectLines: new Resources.ControlInfo('dd-select-lines'),
    SelectShapes: new Resources.ControlInfo('dd-select-shapes'),
    Delete: new Resources.ControlInfo('dd-select-delete')
  },
  DD_SetScale: {
    Architectural: new Resources.ControlInfo('dd-printScaleOptions-architectural'),
    Metric: new Resources.ControlInfo('dd-printScaleOptions-metric'),
    MechEng: new Resources.ControlInfo('dd-printScaleOptions-mechanicalEngineering'),
    Custom: new Resources.ControlInfo('dd-setScale-custom'),
    Precision: new Resources.ControlInfo('dd-printScaleOptions-precision')
  },
  DD_SetScale_Architecture: {
    0: new Resources.ControlInfo('dd-scale-docArchitectural-3-32'),
    1: new Resources.ControlInfo('dd-scale-docArchitectural-1-8'),
    2: new Resources.ControlInfo('dd-scale-docArchitectural-3-16'),
    3: new Resources.ControlInfo('dd-scale-docArchitectural-1-4'),
    4: new Resources.ControlInfo('dd-scale-docArchitectural-3-8'),
    5: new Resources.ControlInfo('dd-scale-docArchitectural-1-2'),
    6: new Resources.ControlInfo('dd-scale-docArchitectural-3-4'),
    7: new Resources.ControlInfo('dd-scale-docArchitectural-1'),
    8: new Resources.ControlInfo('dd-scale-docArchitectural-1-5'),
    9: new Resources.ControlInfo('dd-scale-docArchitectural-3'),
    10: new Resources.ControlInfo('dd-scale-docArchitectural-1-1')
  },
  DD_SetScale_Metric: {
    0: new Resources.ControlInfo('dd-scale-docMetric-1-100'),
    1: new Resources.ControlInfo('dd-scale-docMetric-1-50'),
    2: new Resources.ControlInfo('dd-scale-docMetric-1-20'),
    3: new Resources.ControlInfo('dd-scale-docMetric-1-10'),
    4: new Resources.ControlInfo('dd-scale-docMetric-1-5'),
    5: new Resources.ControlInfo('dd-scale-docMetric-1-2'),
    6: new Resources.ControlInfo('dd-scale-docMetric-1-1'),
    7: new Resources.ControlInfo('dd-scale-docMetric-2-1'),
    8: new Resources.ControlInfo('dd-scale-docMetric-10-1')
  },
  DD_SetScale_MechEng: {
    0: new Resources.ControlInfo('dd-scale-docMechanicalEngineering-1-32'),
    1: new Resources.ControlInfo('dd-scale-docMechanicalEngineering-1-16'),
    2: new Resources.ControlInfo('dd-scale-docMechanicalEngineering-1-8'),
    3: new Resources.ControlInfo('dd-scale-docMechanicalEngineering-1-4'),
    4: new Resources.ControlInfo('dd-scale-docMechanicalEngineering-1-2'),
    5: new Resources.ControlInfo('dd-scale-docMechanicalEngineering-1'),
    6: new Resources.ControlInfo('dd-scale-docMechanicalEngineering-2'),
    7: new Resources.ControlInfo('dd-scale-docMechanicalEngineering-4'),
    8: new Resources.ControlInfo('dd-scale-docMechanicalEngineering-8'),
    9: new Resources.ControlInfo('dd-scale-docMechanicalEngineering-10')
  },
  DD_SetSnaps: {
    TopLeft: new Resources.ControlInfo('dd-setSnaps-snapTopLeft'),
    Center: new Resources.ControlInfo('dd-setSnaps-snapCenter'),
    NoSnaps: new Resources.ControlInfo('dd-setSnaps-doNotSnap')
  },
  DD_SpellOptions: {
    SpellIgnoreCaps: new Resources.ControlInfo('dd-spellOptions-ignoreCaps'),
    SpellInitCaps: new Resources.ControlInfo('dd-spellOptions-ignoreInitCaps'),
    SpellAlphaNum: new Resources.ControlInfo('dd-spellOptions-ignoreAlphaNum'),
    SpellClearList: new Resources.ControlInfo('dd-spellOptions-clearList')
  },
  DD_ShadowEffects: {
    1: new Resources.ControlInfo('dd-shadowEffects-shadow1'),
    2: new Resources.ControlInfo('dd-shadowEffects-shadow2'),
    3: new Resources.ControlInfo('dd-shadowEffects-shadow3'),
    4: new Resources.ControlInfo('dd-shadowEffects-shadow4'),
    5: new Resources.ControlInfo('dd-shadowEffects-shadow5'),
    6: new Resources.ControlInfo('dd-shadowEffects-shadow6'),
    7: new Resources.ControlInfo('dd-shadowEffects-shadow7'),
    8: new Resources.ControlInfo('dd-shadowEffects-shadow8'),
    9: new Resources.ControlInfo('dd-shadowEffects-shadow9')
  },
  DD_CastShadowEffects: {
    1: new Resources.ControlInfo('dd-shadowEffects-castShadow1'),
    2: new Resources.ControlInfo('dd-shadowEffects-castShadow2'),
    3: new Resources.ControlInfo('dd-shadowEffects-castShadow3'),
    4: new Resources.ControlInfo('dd-shadowEffects-castShadow4'),
    5: new Resources.ControlInfo('dd-shadowEffects-castShadow5'),
    6: new Resources.ControlInfo('dd-shadowEffects-castShadow6'),
    7: new Resources.ControlInfo('dd-shadowEffects-castShadow7'),
    8: new Resources.ControlInfo('dd-shadowEffects-castShadow8'),
    9: new Resources.ControlInfo('dd-shadowEffects-castShadow9')
  },
  DD_ReflectionEffects: {
    1: new Resources.ControlInfo('dd-reflectionEffects-castShadow1'),
    2: new Resources.ControlInfo('dd-reflectionEffects-castShadow2'),
    3: new Resources.ControlInfo('dd-reflectionEffects-castShadow3'),
    4: new Resources.ControlInfo('dd-reflectionEffects-castShadow4'),
    5: new Resources.ControlInfo('dd-reflectionEffects-castShadow5'),
    6: new Resources.ControlInfo('dd-reflectionEffects-castShadow6'),
    7: new Resources.ControlInfo('dd-reflectionEffects-castShadow7'),
    8: new Resources.ControlInfo('dd-reflectionEffects-castShadow8'),
    9: new Resources.ControlInfo('dd-reflectionEffects-castShadow9')
  },
  DD_ShapeBasic: {
    Rectangle: new Resources.ControlInfo('dd-shapeBasic-rect'),
    Oval: new Resources.ControlInfo('dd-shapeBasic-oval'),
    Diamond: new Resources.ControlInfo('dd-shapeBasic-diamond'),
    Parallelogram: new Resources.ControlInfo('dd-shapeBasic-parallelogram'),
    Storage: new Resources.ControlInfo('dd-shapeBasic-stored-data'),
    Circle: new Resources.ControlInfo('dd-shapeBasic-circle'),
    Trapezoid: new Resources.ControlInfo('dd-shapeBasic-trapezoid'),
    Triangle: new Resources.ControlInfo('dd-shapeBasic-triangle'),
    Terminator: new Resources.ControlInfo('dd-shapeBasic-terminator'),
    ArrowRight: new Resources.ControlInfo('dd-shapeBasic-arrow-right'),
    Input: new Resources.ControlInfo('dd-shapeBasic-input'),
    PentagonLeft: new Resources.ControlInfo('dd-shapeBasic-pentagon-left')
  },
  DD_ShapeLayout: {
    BringToFront: new Resources.ControlInfo('dd-shapeLayout-bringToFront'),
    SendToBack: new Resources.ControlInfo('dd-shapeLayout-sendToBack'),
    FlipHorizontal: new Resources.ControlInfo('dd-shapeLayout-flipHorizontal'),
    FlipVertical: new Resources.ControlInfo('dd-shapeLayout-flipVertical')
  },
  DD_ShapeProperties: {
  },
  DD_ShapeDropdown: {
    BorderThickness: new Resources.ControlInfo('dd-borderThickness'),
    BorderStyle: new Resources.ControlInfo('dd-borderStyle')
  },
  DD_Share: {
    GetLink: new Resources.ControlInfo('dd-share-getLink'),
    Email: new Resources.ControlInfo('dd-share-email'),
    Embed: new Resources.ControlInfo('dd-share-print')
  },
  DD_SpaceEvenly: {
    Vertically: new Resources.ControlInfo('dd-spaceEvenly-vertically'),
    Horizontally: new Resources.ControlInfo('dd-spaceEvenly-horizontally'),
    Both: new Resources.ControlInfo('dd-spaceEvenly-both')
  },
  DD_SymbolLibrarySelect: {
    ActiveLibraries: new Resources.ControlInfo('dd-symbolLibSelect-libList'),
    SymbolBrowser: new Resources.ControlInfo('dd-symbolLibSelect-showBrowser'),
    CloseLibrary: new Resources.ControlInfo('dd-symbolLibSelect-closeLib'),
    AddCustomLibrary: new Resources.ControlInfo('dd-symbolLibSelect-addCustom'),
    ExportCustomLibrary: new Resources.ControlInfo('dd-symbolLibSelect-exportCustom'),
    RenameCustomLibrary: new Resources.ControlInfo('dd-symbolLibSelect-rename'),
    ImportCustomLibrary: new Resources.ControlInfo('dd-symbolLibSelect-importCustom')
  },
  DD_SymbolSearch: {
    PinSymbols: new Resources.ControlInfo('dd-symbolSearch-pinsymbols'),
    PinLibrary: new Resources.ControlInfo('dd-symbolSearch-pinlibrary')
  },
  DD_TableNRows: {
    NRowsCustom: new Resources.GroupControlInfo('dd-tableNRows-custom')
  },
  DD_TableNColss: {
    NColsCustom: new Resources.GroupControlInfo('dd-tableNCols-custom')
  },
  DD_Theme: {
    BuiltIn: new Resources.GroupControlInfo('builtInTheme'),
    Chart: new Resources.GroupControlInfo('chartTheme'),
    ThemeSubLegacy: new Resources.ControlInfo('dd-themes-sublegacy'),
    ThemeSubMore: new Resources.ControlInfo('dd-themes-submore')
  },
  DD_ThemeLegacy: {
    BuiltIn: new Resources.GroupControlInfo('builtInTheme')
  },
  DD_ThemeMore: {
    BuiltIn: new Resources.GroupControlInfo('builtInTheme')
  },
  DD_TextAlign: {
    TopLeft: new Resources.ControlInfo('dd-textAlign-topLeft'),
    TopCenter: new Resources.ControlInfo('dd-textAlign-topCenter'),
    TopRight: new Resources.ControlInfo('dd-textAlign-topRight'),
    Left: new Resources.ControlInfo('dd-textAlign-middleLeft'),
    Center: new Resources.ControlInfo('dd-textAlign-middleCenter'),
    Right: new Resources.ControlInfo('dd-textAlign-middleRight'),
    BottomLeft: new Resources.ControlInfo('dd-textAlign-bottomLeft'),
    BottomCenter: new Resources.ControlInfo('dd-textAlign-bottomCenter'),
    BottomRight: new Resources.ControlInfo('dd-textAlign-bottomRight')
  },
  DD_TextBullets: {
    Bullets: new Resources.GroupControlInfo('textBullets')
  },
  DD_textColor: {
    RecentColorGroup: new Resources.GroupControlInfo('dd-textColor-recent-color'),
    ThemeColorGroup: new Resources.GroupControlInfo('dd-textColor-theme-color'),
    StandardColorGroup: new Resources.GroupControlInfo('dd-textColor-standard-color'),
    FillOpacitySlider: new Resources.ControlInfo('dd-textColor-opacity-slider'),
    ClearFill: new Resources.ControlInfo('dd-textColor-clear')
  },
  DD_TextDirection: {
    AlongTheLine: new Resources.ControlInfo('dd-textDirection-along'),
    Horizontal: new Resources.ControlInfo('dd-textDirection-horizontal')
  },
  DD_TextFonts: {
    RecentFontList: new Resources.ControlInfo('dd-fonts-recent'),
    AllFontList: new Resources.ControlInfo('dd-fonts-all'),
    AllFonts: new Resources.GroupControlInfo('generatedFont'),
    RecentFonts: new Resources.GroupControlInfo('recentFont')
  },
  DD_TextSize: {
    Size_8: new Resources.ControlInfo('dd-textSize-8'),
    Size_9: new Resources.ControlInfo('dd-textSize-9'),
    Size_10: new Resources.ControlInfo('dd-textSize-10'),
    Size_11: new Resources.ControlInfo('dd-textSize-11'),
    Size_12: new Resources.ControlInfo('dd-textSize-12'),
    Size_13: new Resources.ControlInfo('dd-textSize-13'),
    Size_14: new Resources.ControlInfo('dd-textSize-14'),
    Size_16: new Resources.ControlInfo('dd-textSize-16'),
    Size_18: new Resources.ControlInfo('dd-textSize-18'),
    Size_20: new Resources.ControlInfo('dd-textSize-20'),
    Size_22: new Resources.ControlInfo('dd-textSize-22'),
    Size_24: new Resources.ControlInfo('dd-textSize-24'),
    Size_26: new Resources.ControlInfo('dd-textSize-26'),
    Size_36: new Resources.ControlInfo('dd-textSize-36'),
    Size_48: new Resources.ControlInfo('dd-textSize-48'),
    Size_72: new Resources.ControlInfo('dd-textSize-72'),
    CustomSize: new Resources.ControlInfo('dd-textSize-custom')
  },
  DD_TextSpacing: {
    TextSpace_10: new Resources.ControlInfo('dd-textSpacing-10'),
    TextSpace_15: new Resources.ControlInfo('dd-textSpacing-15'),
    TextSpace_20: new Resources.ControlInfo('dd-textSpacing-20')
  },
  DD_TextPosition: {
    Above: new Resources.ControlInfo('dd-textPosition-above'),
    Inside: new Resources.ControlInfo('dd-textPosition-inside'),
    Below: new Resources.ControlInfo('dd-textPosition-below')
  },
  DD_TimelineConnectorStyle: {
    TimelineConnectorStyle1: new Resources.ControlInfo('dd-timelineConnectorStyle-style1'),
    TimelineConnectorStyle2: new Resources.ControlInfo('dd-timelineConnectorStyle-style2'),
    TimelineConnectorStyle3: new Resources.ControlInfo('dd-timelineConnectorStyle-style3'),
    TimelineConnectorStyle4: new Resources.ControlInfo('dd-timelineConnectorStyle-style4')
  },
  DD_TimelineFormat: {
    Auto: new Resources.ControlInfo('dd-timelineFormat-auto'),
    Years: new Resources.ControlInfo('dd-timelineFormat-years'),
    Quarters: new Resources.ControlInfo('dd-timelineFormat-quarters'),
    Months: new Resources.ControlInfo('dd-timelineFormat-months'),
    Weeks: new Resources.ControlInfo('dd-timelineFormat-weeks'),
    DaysByMonth: new Resources.ControlInfo('dd-timelineFormat-daysByMonth'),
    DaysByWeeks: new Resources.ControlInfo('dd-timelineFormat-daysByWeeks'),
    Hours: new Resources.ControlInfo('dd-timelineFormat-hours'),
    StartWeekSunday: new Resources.ControlInfo('dd-timelineFormat-startWeekSunday'),
    StartWeekMonday: new Resources.ControlInfo('dd-timelineFormat-startWeekMonday')
  },
  DD_Zoom: {
    ZoomFitPage: new Resources.ControlInfo('dd-zoomOptions-FitPage'),
    ZoomFitWindow: new Resources.ControlInfo('dd-zoomOptions-FitWindow'),
    Zoom100: new Resources.ControlInfo('dd-zoomOptions-100'),
    Zoom200: new Resources.ControlInfo('dd-zoomOptions-200'),
    Zoom300: new Resources.ControlInfo('dd-zoomOptions-300'),
    Zoom400: new Resources.ControlInfo('dd-zoomOptions-400'),
    ZoomToMe: new Resources.ControlInfo('dd-zoomOptions-ZoomToMe')
  },
  DD_SpellingSuggest: {
    SuggestNone: new Resources.ControlInfo('dd-spellingSuggest-none'),
    SuggestList: new Resources.ControlInfo('dd-spellingSuggestList'),
    SuggestAdd: new Resources.ControlInfo('dd-spellingSuggest-add'),
    SuggestIgnore: new Resources.ControlInfo('dd-spellingSuggest-ignore')
  },
  DD_ChartsNew: {
    Bar: new Resources.ControlInfo('dd-chartsNew-bar'),
    Pie: new Resources.ControlInfo('dd-chartsNew-pie'),
    StackedBar: new Resources.ControlInfo('dd-chartsNew-stackedBar'),
    Line: new Resources.ControlInfo('dd-chartsNew-line'),
    RelativeValue: new Resources.ControlInfo('dd-chartsNew-relativeValue'),
    Area: new Resources.ControlInfo('dd-chartsNew-area'),
    LayeredArea: new Resources.ControlInfo('dd-chartsNew-layeredArea'),
    ThreeD: new Resources.ControlInfo('dd-chartsNew-3d')
  },
  DD_PieData: {
    Category1: new Resources.ControlInfo('dd-pieData-category1'),
    Category2: new Resources.ControlInfo('dd-pieData-category2'),
    Category3: new Resources.ControlInfo('dd-pieData-category3'),
    Category4: new Resources.ControlInfo('dd-pieData-category4')
  },
  DD_ChartType: {
    Bar: new Resources.ControlInfo('dd-chartType-bar'),
    Pie: new Resources.ControlInfo('dd-chartType-pie'),
    StackedBar: new Resources.ControlInfo('dd-chartType-stackedBar'),
    Line: new Resources.ControlInfo('dd-chartType-line'),
    RelativeValue: new Resources.ControlInfo('dd-chartType-relativeValue'),
    Area: new Resources.ControlInfo('dd-chartType-area'),
    LayeredArea: new Resources.ControlInfo('dd-chartType-layeredArea'),
    ThreeD: new Resources.ControlInfo('dd-chartType-3d')
  },
  DD_ChartsQuickLaout: {
    Layout1: new Resources.ControlInfo('dd-chartsQuickLayout-layout1'),
    Layout2: new Resources.ControlInfo('dd-chartsQuickLayout-layout2'),
    Layout3: new Resources.ControlInfo('dd-chartsQuickLayout-layout3'),
    Layout4: new Resources.ControlInfo('dd-chartsQuickLayout-layout4'),
    Layout5: new Resources.ControlInfo('dd-chartsQuickLayout-layout5'),
    Layout6: new Resources.ControlInfo('dd-chartsQuickLayout-layout6'),
    Layout7: new Resources.ControlInfo('dd-chartsQuickLayout-layout7'),
    Layout8: new Resources.ControlInfo('dd-chartsQuickLayout-layout8'),
    Layout9: new Resources.ControlInfo('dd-chartsQuickLayout-layout9')
  },
  DD_ChartRotate: {
    Quadrant1: new Resources.ControlInfo('dd-chartRotate-quadrant1'),
    Quadrant2: new Resources.ControlInfo('dd-chartRotate-quadrant2'),
    Quadrant3: new Resources.ControlInfo('dd-chartRotate-quadrant3'),
    Quadrant4: new Resources.ControlInfo('dd-chartRotate-quadrant4')
  },
  DD_ChartAxes: {
    ShowNone: new Resources.ControlInfo('dd-axes-showNone'),
    ShowBoth: new Resources.ControlInfo('dd-axes-showBoth'),
    ShowHorizontal: new Resources.ControlInfo('dd-axes-showHorizontal'),
    ShowVertical: new Resources.ControlInfo('dd-axes-showVertical')
  },
  DD_ChartsGrid: {
    HorizontalNone: new Resources.ControlInfo('dd-chartsGrid-horizontalNone'),
    HorizontalMinorGridlines: new Resources.ControlInfo('dd-chartsGrid-horizontalMinorGridlines'),
    HorizontalMajorGridlines: new Resources.ControlInfo('dd-chartsGrid-horizontalMajorGridlines'),
    HorizontalMajorandMinorGridlines: new Resources.ControlInfo('dd-chartsGrid-horizontalMajorandMinorGridlines'),
    VerticalNone: new Resources.ControlInfo('dd-chartsGrid-verticalNone'),
    VerticalMinorGridlines: new Resources.ControlInfo('dd-chartsGrid-verticalMinorGridlines'),
    VerticalMajorGridlines: new Resources.ControlInfo('dd-chartsGrid-verticalMajorGridlines'),
    VerticalMajorandMinorGridlines: new Resources.ControlInfo('dd-chartsGrid-verticalMajorandMinorGridlines'),
    Custom: new Resources.ControlInfo('dd-chartsGrid-custom')
  },
  DD_Legend: {
    None: new Resources.ControlInfo('dd-legend-none'),
    Full: new Resources.ControlInfo('dd-legend-full'),
    ShowNames: new Resources.ControlInfo('dd-legend-showNames'),
    ShowSwatch: new Resources.ControlInfo('dd-legend-showSwatch'),
    ShowScale: new Resources.ControlInfo('dd-legend-showScale'),
    Bottom: new Resources.ControlInfo('dd-legend-bottom'),
    Right: new Resources.ControlInfo('dd-legend-right')
  },
  DD_ChartsData: {
    HideDataLabels: new Resources.ControlInfo('dd-chartsData-hideDataLabels'),
    OutsideLabels: new Resources.ControlInfo('dd-chartsData-outsideLabels'),
    OutsideAngle: new Resources.ControlInfo('dd-chartsData-outsideAngle'),
    OutsideAngledLeader: new Resources.ControlInfo('dd-chartsData-outsideAngledLeader'),
    Custom: new Resources.ControlInfo('dd-chartsData-custom')
  },
  DD_HorizontalAxis: {
    NoHorizontalAxisLabels: new Resources.ControlInfo('dd-hAxis-noHorizontalAxisLabels'),
    ShowHorizontalAxisLabels: new Resources.ControlInfo('dd-hAxis-showHorizontalAxisLabels'),
    AngleHorizontalAxisLabels: new Resources.ControlInfo('dd-hAxis-angleHorizontalAxisLabels'),
    ShowMinorTickMarks: new Resources.ControlInfo('dd-hAxis-showMinorTickMarks'),
    ShowMajorTickMarks: new Resources.ControlInfo('dd-hAxis-showMajorTickMarks'),
    ShowHorizontalAxisTitle: new Resources.ControlInfo('dd-hAxis-showHorizontalAxisTitle')
  },
  DD_VerticalAxis: {
    NoVerticalAxisLabels: new Resources.ControlInfo('dd-vAxis-noVerticalAxisLabels'),
    ShowVerticalAxisLabels: new Resources.ControlInfo('dd-vAxis-showVerticalAxisLabels'),
    AngleVerticalAxisLabels: new Resources.ControlInfo('dd-vAxis-angleVerticalAxisLabels'),
    ShowMinorTickMarks: new Resources.ControlInfo('dd-vAxis-showMinorTickMarks'),
    ShowMajorTickMarks: new Resources.ControlInfo('dd-vAxis-showMajorTickMarks'),
    ShowVerticalAxisTitle: new Resources.ControlInfo('dd-vAxis-showVerticalAxisTitle')
  },
  DD_GroupLabels: {
    None: new Resources.ControlInfo('dd-groupLabels-none'),
    GroupByDate: new Resources.ControlInfo('dd-groupLabels-groupByDate'),
    GroupByNumber: new Resources.ControlInfo('dd-groupLabels-groupByNumber'),
    Advanced: new Resources.ControlInfo('dd-groupLabels-advanced')
  },
  DD_GanttScroll: {
    GanttScrollTimeMeasureButton: new Resources.ControlInfo('dd-ganttScrollTimeMeasureButton')
  },
  DD_TimeMeasure: {
    Auto: new Resources.ControlInfo('dd-gantt-Measure-auto'),
    Years: new Resources.ControlInfo('dd-gantt-Measure-years'),
    Quarters: new Resources.ControlInfo('dd-gantt-Measure-quarters'),
    Months: new Resources.ControlInfo('dd-gantt-Measure-months'),
    Weeks: new Resources.ControlInfo('dd-gantt-Measure-weeks'),
    DaysByMonths: new Resources.ControlInfo('dd-gantt-Measure-daysByMonth'),
    DaysByWeeks: new Resources.ControlInfo('dd-gantt-Measure-daysByWeeks'),
    Hours: new Resources.ControlInfo('dd-gantt-Measure-hours')
  },
  DD_Holidays: {
    USA: new Resources.ControlInfo('dd-holidays-usa'),
    UK: new Resources.ControlInfo('dd-holidays-uk'),
    Can: new Resources.ControlInfo('dd-holidays-canada'),
    Aus: new Resources.ControlInfo('dd-holidays-australia'),
    All: new Resources.ControlInfo('dd-holidays-all'),
    None: new Resources.ControlInfo('dd-holidays-none')
  },
  DD_DataFieldTypes: {
    TEXT: new Resources.ControlInfo('dd-datafieldtypes-text'),
    BOOL: new Resources.ControlInfo('dd-datafieldtypes-bool'),
    INT: new Resources.ControlInfo('dd-datafieldtypes-int'),
    FLOAT: new Resources.ControlInfo('dd-datafieldtypes-float'),
    DATE: new Resources.ControlInfo('dd-datafieldtypes-date'),
    HEADER: new Resources.ControlInfo('dd-datafieldtypes-header')
  },
  DD_DataTableSelect: {
    LIST: new Resources.ControlInfo('dd-tableselect-list'),
    NEW: new Resources.ControlInfo('dd-tableselect-new'),
    IMPORT: new Resources.ControlInfo('dd-tableselect-import'),
    UPDATE: new Resources.ControlInfo('dd-tableselect-update'),
    EXPORT: new Resources.ControlInfo('dd-tableselect-export'),
    RENAME: new Resources.ControlInfo('dd-tableselect-rename'),
    DELETE: new Resources.ControlInfo('dd-tableselect-delete')
  },
  DD_DataFieldSelect: {
    LIST: new Resources.ControlInfo('dd-datafieldlist')
  },
  DD_DataRulesFieldSelect: {
    LIST: new Resources.ControlInfo('dd-dataruledlg-fieldlist')
  },
  DD_DataRuleSelect: {
    LIST: new Resources.ControlInfo('dd-dataruleselect-list')
  },
  DD_DataRuleEdit: {
    LIST: new Resources.ControlInfo('dd-dataruleedit-list')
  },
  DD_DataEditPreset: {
    LIST: new Resources.ControlInfo('dd-dataeditpreset-list')
  },
  DD_Themes: {
    CustomThemes: new Resources.ControlInfo('dd-themes-customThemes')
  },
  DD_CustomThemes: {
    Model: new Resources.ControlInfo('dd-customThemes-model')
  },
  DD_CustomThemesEditDelete: {
    Edit: new Resources.ControlInfo('dd-customThemesEditDelete-edit'),
    Delete: new Resources.ControlInfo('dd-customThemesEditDelete-delete')
  },
  DD_ArrowClass: {
    aggregation: new Resources.ControlInfo('dd-arrowclass-aggregation'),
    association: new Resources.ControlInfo('dd-arrowclass-association'),
    composition: new Resources.ControlInfo('dd-arrowclass-composition'),
    dependency: new Resources.ControlInfo('dd-arrowclass-dependency'),
    dirassociation: new Resources.ControlInfo('dd-arrowclass-dirassociation'),
    inheritance: new Resources.ControlInfo('dd-arrowclass-inheritance'),
    inhrealization: new Resources.ControlInfo('dd-arrowclass-inhrealization')
  },
  DD_ArrowInterface: {
    aggregation: new Resources.ControlInfo('dd-arrowinterface-aggregation'),
    association: new Resources.ControlInfo('dd-arrowinterface-association'),
    composition: new Resources.ControlInfo('dd-arrowinterface-composition'),
    dependency: new Resources.ControlInfo('dd-arrowinterface-dependency'),
    dirassociation: new Resources.ControlInfo('dd-arrowinterface-dirassociation'),
    inheritance: new Resources.ControlInfo('dd-arrowinterface-inheritance')
  },
  DD_ArrowUML: {
    aggregation: new Resources.ControlInfo('dd-arrowUML-aggregation'),
    association: new Resources.ControlInfo('dd-arrowUML-association'),
    composition: new Resources.ControlInfo('dd-arrowUML-composition'),
    dependency: new Resources.ControlInfo('dd-arrowUML-dependency'),
    dirassociation: new Resources.ControlInfo('dd-arrowUML-dirassociation'),
    inheritance: new Resources.ControlInfo('dd-arrowUML-inheritance'),
    plain: new Resources.ControlInfo('dd-arrowUML-plain')
  },
  DD_ArrowBPMN: {
    normal: new Resources.ControlInfo('dd-arrowbpmn-normal'),
    conditional: new Resources.ControlInfo('dd-arrowbpmn-conditional'),
    default:
      new Resources.ControlInfo('dd-arrowbpmn-default'),
    message: new Resources.ControlInfo('dd-arrowbpmn-message'),
    association: new Resources.ControlInfo('dd-arrowbpmn-association')
  },
  DD_BPMNMarkers: {
    Loop: new Resources.ControlInfo('dd-bpmnmarker-loop'),
    Subprocess: new Resources.ControlInfo('dd-bpmnmarker-subprocess'),
    Parallel: new Resources.ControlInfo('dd-bpmnmarker-parallel'),
    Sequential: new Resources.ControlInfo('dd-bpmnmarker-sequential'),
    Adhoc: new Resources.ControlInfo('dd-bpmnmarker-adhoc'),
    Compensation: new Resources.ControlInfo('dd-bpmnmarker-compensation')
  },
  DD_BPMNChoreoMarkers: {
    Loop: new Resources.ControlInfo('dd-bpmnchoreomarker-loop'),
    Subprocess: new Resources.ControlInfo('dd-bpmnchoreomarker-subprocess'),
    Parallel: new Resources.ControlInfo('dd-bpmnchoreomarker-parallel'),
    Sequential: new Resources.ControlInfo('dd-bpmnchoreomarker-sequential')
  },
  DD_BPMNChoreoTypes: {
    Task: new Resources.ControlInfo('dd-bpmnchoreotype-task'),
    Call: new Resources.ControlInfo('dd-bpmnchoreotype-call')
  },
  DD_BPMNTaskTypes: {
    Service: new Resources.ControlInfo('dd-bpmntasktype-service'),
    Send: new Resources.ControlInfo('dd-bpmntasktype-send'),
    Receive: new Resources.ControlInfo('dd-bpmntasktype-receive'),
    IntReceive: new Resources.ControlInfo('dd-bpmntasktype-intreceive'),
    User: new Resources.ControlInfo('dd-bpmntasktype-user'),
    Manual: new Resources.ControlInfo('dd-bpmntasktype-manual'),
    Business: new Resources.ControlInfo('dd-bpmntasktype-business'),
    Script: new Resources.ControlInfo('dd-bpmntasktype-script')
  },
  DD_BPMNDataTypes: {
    Collection: new Resources.ControlInfo('dd-bpmndatatype-collection'),
    Input: new Resources.ControlInfo('dd-bpmndatatype-input'),
    Output: new Resources.ControlInfo('dd-bpmndatatype-output')
  },
  DD_BPMNEventTypes: {
    Start: new Resources.ControlInfo('dd-bpmneventtype-start'),
    StartNI: new Resources.ControlInfo('dd-bpmneventtype-startni'),
    Intermediate: new Resources.ControlInfo('dd-bpmneventtype-intermediate'),
    IntermediateNI: new Resources.ControlInfo('dd-bpmneventtype-intermediateni'),
    IntermediateThrow: new Resources.ControlInfo('dd-bpmneventtype-intermediatethrow'),
    End: new Resources.ControlInfo('dd-bpmneventtype-end')
  },
  DD_BPMNGatewayTypes: {
    None: new Resources.ControlInfo('dd-bpmngatewaytype-none'),
    Exclusive: new Resources.ControlInfo('dd-bpmngatewaytype-exclusive'),
    Event: new Resources.ControlInfo('dd-bpmngatewaytype-event'),
    ExEvent: new Resources.ControlInfo('dd-bpmngatewaytype-exevent'),
    ParallelEvent: new Resources.ControlInfo('dd-bpmngatewaytype-parallelevent'),
    Inclusive: new Resources.ControlInfo('dd-bpmngatewaytype-inclusive'),
    Complex: new Resources.ControlInfo('dd-bpmngatewaytype-complex'),
    Parallel: new Resources.ControlInfo('dd-bpmngatewaytype-parallel')
  },
  DD_BPMNActivityTypes: {
    Task: new Resources.ControlInfo('dd-bpmnactivitytype-task'),
    Subroutine: new Resources.ControlInfo('dd-bpmnactivitytype-subroutine'),
    Transaction: new Resources.ControlInfo('dd-bpmnactivitytype-transaction'),
    Call: new Resources.ControlInfo('dd-bpmnactivitytype-call')
  },
  DD_BPMNEventTriggersS: {
    None: new Resources.ControlInfo('dd-bpmneventtriggerS-none'),
    Message: new Resources.ControlInfo('dd-bpmneventtriggerS-message'),
    Timer: new Resources.ControlInfo('dd-bpmneventtriggerS-timer'),
    Error: new Resources.ControlInfo('dd-bpmneventtriggerS-error'),
    Escalation: new Resources.ControlInfo('dd-bpmneventtriggerS-escalation'),
    Compensation: new Resources.ControlInfo('dd-bpmneventtriggerS-compensation'),
    Conditional: new Resources.ControlInfo('dd-bpmneventtriggerS-conditional'),
    Signal: new Resources.ControlInfo('dd-bpmneventtriggerS-signal'),
    Multiple: new Resources.ControlInfo('dd-bpmneventtriggerS-multiple'),
    Parallel: new Resources.ControlInfo('dd-bpmneventtriggerS-parallel')
  },
  DD_BPMNEventTriggersSNI: {
    Message: new Resources.ControlInfo('dd-bpmneventtriggerSNI-message'),
    Timer: new Resources.ControlInfo('dd-bpmneventtriggerSNI-timer'),
    Escalation: new Resources.ControlInfo('dd-bpmneventtriggerSNI-escalation'),
    Conditional: new Resources.ControlInfo('dd-bpmneventtriggerSNI-conditional'),
    Signal: new Resources.ControlInfo('dd-bpmneventtriggerSNI-signal'),
    Multiple: new Resources.ControlInfo('dd-bpmneventtriggerSNI-multiple'),
    Parallel: new Resources.ControlInfo('dd-bpmneventtriggerSNI-parallel')
  },
  DD_BPMNEventTriggersINT: {
    None: new Resources.ControlInfo('dd-bpmneventtriggerINT-none'),
    Message: new Resources.ControlInfo('dd-bpmneventtriggerINT-message'),
    Timer: new Resources.ControlInfo('dd-bpmneventtriggerINT-timer'),
    Error: new Resources.ControlInfo('dd-bpmneventtriggerINT-error'),
    Escalation: new Resources.ControlInfo('dd-bpmneventtriggerINT-escalation'),
    Cancel: new Resources.ControlInfo('dd-bpmneventtriggerINT-cancel'),
    Compensation: new Resources.ControlInfo('dd-bpmneventtriggerINT-compensation'),
    Conditional: new Resources.ControlInfo('dd-bpmneventtriggerINT-conditional'),
    Link: new Resources.ControlInfo('dd-bpmneventtriggerINT-link'),
    Signal: new Resources.ControlInfo('dd-bpmneventtriggerINT-signal'),
    Multiple: new Resources.ControlInfo('dd-bpmneventtriggerINT-multiple'),
    Parallel: new Resources.ControlInfo('dd-bpmneventtriggerINT-parallel')
  },
  DD_BPMNEventTriggersINTNI: {
    Message: new Resources.ControlInfo('dd-bpmneventtriggerINTNI-message'),
    Timer: new Resources.ControlInfo('dd-bpmneventtriggerINTNI-timer'),
    Escalation: new Resources.ControlInfo('dd-bpmneventtriggerINTNI-escalation'),
    Conditional: new Resources.ControlInfo('dd-bpmneventtriggerINTNI-conditional'),
    Signal: new Resources.ControlInfo('dd-bpmneventtriggerINTNI-signal'),
    Multiple: new Resources.ControlInfo('dd-bpmneventtriggerINTNI-multiple'),
    Parallel: new Resources.ControlInfo('dd-bpmneventtriggerINTNI-parallel')
  },
  DD_BPMNEventTriggersINTTH: {
    Message: new Resources.ControlInfo('dd-bpmneventtriggerINTTH-message'),
    Escalation: new Resources.ControlInfo('dd-bpmneventtriggerINTTH-escalation'),
    Compensation: new Resources.ControlInfo('dd-bpmneventtriggerINTTH-compensation'),
    Link: new Resources.ControlInfo('dd-bpmneventtriggerINTTH-link'),
    Signal: new Resources.ControlInfo('dd-bpmneventtriggerINTTH-signal'),
    Multiple: new Resources.ControlInfo('dd-bpmneventtriggerINTTH-multiple')
  },
  DD_BPMNEventTriggersE: {
    None: new Resources.ControlInfo('dd-bpmneventtriggerE-none'),
    Message: new Resources.ControlInfo('dd-bpmneventtriggerE-message'),
    Error: new Resources.ControlInfo('dd-bpmneventtriggerE-error'),
    Escalation: new Resources.ControlInfo('dd-bpmneventtriggerE-escalation'),
    Cancel: new Resources.ControlInfo('dd-bpmneventtriggerE-cancel'),
    Compensation: new Resources.ControlInfo('dd-bpmneventtriggerE-compensation'),
    Signal: new Resources.ControlInfo('dd-bpmneventtriggerE-signal'),
    Terminate: new Resources.ControlInfo('dd-bpmneventtriggerE-terminate'),
    Multiple: new Resources.ControlInfo('dd-bpmneventtriggerE-multiple')
  },
  DD_SmartContainerArrangement: {
    Row: new Resources.ControlInfo('dd-smartcontainerArrangement-row'),
    Col: new Resources.ControlInfo('dd-smartcontainerArrangement-col')
  },
  DD_SmartContainerType: {
    Kanban: new Resources.ControlInfo('dd-smartcontainerType-kanban'),
    Sparse: new Resources.ControlInfo('dd-smartcontainerType-sparse')
  },
  DD_SmartContainerChild: {
    All: new Resources.ControlInfo('dd-smartcontainerChild-all'),
    NonContainer: new Resources.ControlInfo('dd-smartcontainerChild-noncontainers'),
    Container: new Resources.ControlInfo('dd-smartcontainerChild-containers')
  },
  DD_SmartContainerWrap: {
    None: new Resources.ControlInfo('dd-smartcontainerWrap-none'),
    Custom: new Resources.ControlInfo('dd-smartcontainerWrap-custom')
  },
  DD_BuilderTableCelltypes: {
    None: new Resources.ControlInfo('dd-builder-tables-celltypes-0'),
    RowHeader: new Resources.ControlInfo('dd-builder-tables-celltypes-300'),
    RowBody: new Resources.ControlInfo('dd-builder-tables-celltypes-301'),
    ColHeader: new Resources.ControlInfo('dd-builder-tables-celltypes-310'),
    ColBody: new Resources.ControlInfo('dd-builder-tables-celltypes-312')
  },
  Modals: {
    AWSImportDialog: new Resources.ControlInfo('m-importaws'),
    AboutDialog: new Resources.ControlInfo('m-about'),
    ActiveSessionAlert: new Resources.ControlInfo('m-activeSession'),
    Alert: new Resources.ControlInfo('m-alert'),
    ArrowheadsDialog: new Resources.ControlInfo('m-arrowheads'),
    ArrowheadsERDDialog: new Resources.ControlInfo('m-arrowheadsERDDialog'),
    AzureImportDialog: new Resources.ControlInfo('m-importazure'),
    CMSAddSymbol: new Resources.ControlInfo('m-builder-cmsAddSymbol'),
    CMSConfirmSymbol: new Resources.ControlInfo('m-builder-cmsConfirmSymbol'),
    CMSEditSymbol: new Resources.ControlInfo('m-builder-cmsEditSymbol'),
    CMSLoginDialog: new Resources.ControlInfo('m-CMSLoginDialog'),
    CMSUpdateSymbol: new Resources.ControlInfo('m-builder-cmsUpdateSymbol'),
    ColorPickerDialog: new Resources.ControlInfo('m-colorpicker'),
    ConfluenceContactInfoDialog: new Resources.ControlInfo('m-confluencecontactinfo'),
    ConnectionPoints: new Resources.ControlInfo('m-connectionPoints'),
    SetRoundness: new Resources.ControlInfo('m-setRoundness'),
    CreateTrelloCard: new Resources.ControlInfo('m-createTrelloCard'),
    CustomMarginsDialog: new Resources.ControlInfo('m-custommargins'),
    CustomParametersDialog: new Resources.ControlInfo('m-customparams'),
    CustomRotationDialog: new Resources.ControlInfo('m-customRotation'),
    CustomSymbolOptionsDialog: new Resources.ControlInfo('m-customSymbolOptions'),
    CustomThemeDialog: new Resources.ControlInfo('m-customThemeModal'),
    PublishUpdatesDialog: new Resources.ControlInfo('m-publishUpdates'),
    PublishingUrlDialog: new Resources.ControlInfo('m-publishingURL'),
    CustomSymbolLibraryNameDialog: new Resources.ControlInfo('m-customSymbolLibraryName'),
    D3SymbolBuilderDialog: new Resources.ControlInfo('m-d3Builder'),
    DataExportDialog: new Resources.ControlInfo('m-exportData'),
    DataRulesDialog: new Resources.ControlInfo('m-dataRules'),
    DataListDialog: new Resources.ControlInfo('m-dataList'),
    DocHistoryModal: new Resources.ControlInfo('m-docHistory'),
    EditGauge: new Resources.ControlInfo('m-editGauge'),
    EditGraph: new Resources.ControlInfo('m-editGraph'),
    EditLayerDialog: new Resources.ControlInfo('m-editLayer'),
    EmbedDialog: new Resources.ControlInfo('m-embedDialog'),
    Export: new Resources.ControlInfo('m-export'),
    ExportOffice: new Resources.ControlInfo('m-exportOffice'),
    Feedback: new Resources.ControlInfo('m-feedback'),
    FilePicker: new Resources.ControlInfo('m-filePicker'),
    Find: new Resources.ControlInfo('m-find'),
    FindReplace: new Resources.ControlInfo('m-findReplace'),
    FindToolbar: new Resources.ControlInfo('m-find'),
    FreezePropDialog: new Resources.ControlInfo('m-freezeProp'),
    GradientDialog: new Resources.ControlInfo('m-gradient'),
    GrowDlg: new Resources.ControlInfo('m-shapeProperties'),
    HatchesDialog: new Resources.ControlInfo('m-hatches'),
    Hint_Anonymous: new Resources.ControlInfo('m-hint-anonymous'),
    Hint_AutoSave: new Resources.ControlInfo('m-hint-autosave'),
    Hint_BadConnection: new Resources.ControlInfo('m-hint-badConnection'),
    Hint_Metric: new Resources.ControlInfo('m-hint-metric'),
    Hint_MobileReadOnly: new Resources.ControlInfo('m-hint-mobilereadonly'),
    Hint_ReadOnly: new Resources.ControlInfo('m-hint-readonly'),
    Hyperlink: new Resources.ControlInfo('m-hyperlink'),
    Insert: new Resources.ControlInfo('m-insert'),
    ImportBarLineData: new Resources.ControlInfo('m-importbarlinedata'),
    ImportCustomContentDialog: new Resources.ControlInfo('m-importCustomContentDialog'),
    ImportData: new Resources.ControlInfo('m-importdata'),
    ImportFile: new Resources.ControlInfo('m-importfile'),
    ImportGliffy: new Resources.ControlInfo('m-importgliffy'),
    ImportImage: new Resources.ControlInfo('m-importimage'),
    ImportPDF: new Resources.ControlInfo('m-importpdf'),
    ImportPieData: new Resources.ControlInfo('m-importpiedata'),
    ImportSDON: new Resources.ControlInfo('m-importsdon'),
    ImportText: new Resources.ControlInfo('m-importtext'),
    ImportStickynotes: new Resources.ControlInfo('m-importstickynotes'),
    InsertBitmap: new Resources.ControlInfo('m-insertbitmap'),
    InsertSymbolDialog: new Resources.ControlInfo('m-insertsymbol'),
    ChatGPTInput: new Resources.ControlInfo('m-chatGPTInput'),
    JiraPIBoardDialog: new Resources.ControlInfo('m-jiraPIBoard'),
    JiraAddIssueDialog: new Resources.ControlInfo('m-jiraAddIssue'),
    JiraFindIssueDialog: new Resources.ControlInfo('m-jiraFindIssue'),
    JiraProductRoadmapDialog: new Resources.ControlInfo('m-jiraProductRoadmap'),
    JiraBlockingIssueDialog: new Resources.ControlInfo('m-jiraBlockingIssue'),
    JiraEpicDependencyDialog: new Resources.ControlInfo('m-jiraEpicDependency'),
    KeyboardShortcutsList: new Resources.ControlInfo('m-keyboardShortcutsList'),
    AzureDevOpsFindItemDialog: new Resources.ControlInfo('m-azureDevOpsFindItem'),
    AzureDevOpsAddItemDialog: new Resources.ControlInfo('m-azureDevOpsAddItem'),
    OrgChartVisualizer: new Resources.ControlInfo('m-orgChartVisualizer'),
    DecisionTreeVisualizer: new Resources.ControlInfo('m-decisionTreeVisualizer'),
    ErdVisualizer: new Resources.ControlInfo('m-erdVisualizer'),
    ClassDiagramVisualizer: new Resources.ControlInfo('m-classDiagramVisualizer'),
    MSTeamsVisualizer: new Resources.ControlInfo('m-msTeamsVisualizer'),
    UmlSequenceVisualizer: new Resources.ControlInfo('m-umlSequenceVisualizer'),
    UmlStateVisualizer: new Resources.ControlInfo('m-umlStateVisualizer'),
    JiraReportVisualizer: new Resources.ControlInfo('m-jiraReportVisualizer'),
    LineHops: new Resources.ControlInfo('m-lineHops'),
    LineThicknessDialog: new Resources.ControlInfo('m-linethickness'),
    LinkWarning: new Resources.ControlInfo('m-linkWarning'),
    Loading: new Resources.ControlInfo('m-loading'),
    LoginSignupDialog: new Resources.ControlInfo('m-loginsignup'),
    ManageLayersDialog: new Resources.ControlInfo('m-manageLayers'),
    ManagePages: new Resources.ControlInfo('m-managePages'),
    MessageBox: new Resources.ControlInfo('m-messagebox'),
    MessageBoxNoPrint: new Resources.ControlInfo('m-messageboxNoPrint'),
    MobileTextDialog: new Resources.ControlInfo('m-mobiletext'),
    PublishUpdates: new Resources.ControlInfo('m-publishUpdates'),
    NameDialog: new Resources.ControlInfo('m-name'),
    NewLayerDialog: new Resources.ControlInfo('m-newLayer'),
    Options: new Resources.ControlInfo('m-options'),
    PDFExport: new Resources.ControlInfo('m-pdfExport'),
    PageSetup: new Resources.ControlInfo('m-pageSetup'),
    PluginClassDiagram: new Resources.ControlInfo('m-pluginClassDiagram'),
    PluginDialog: new Resources.ControlInfo('m-plugin'),
    PluginERD: new Resources.ControlInfo('m-pluginERD'),
    PluginPrebuiltIframeViewer: new Resources.ControlInfo('m-pluginPrebuiltIframeViewer'),
    PluginSiteMap: new Resources.ControlInfo('m-pluginSiteMap'),
    PositionSize: new Resources.ControlInfo('m-positionSize'),
    ProjectOptions: new Resources.ControlInfo('m-projectOptions'),
    ProjectTimeframe: new Resources.ControlInfo('m-projectTimeframe'),
    SaveAs: new Resources.ControlInfo('m-saveAs'),
    Scale: new Resources.ControlInfo('m-scale'),
    ShapeProperties: new Resources.ControlInfo('m-shapeProperties'),
    ShareDialog: new Resources.ControlInfo('m-shareDialog'),
    ShowDimensions: new Resources.ControlInfo('m-showDimensions'),
    ShowUrlDialog: new Resources.ControlInfo('m-showUrl'),
    SymbolLibrary: new Resources.ControlInfo('m-symbolLib'),
    TemplateDialog: new Resources.ControlInfo('m-templateDialog'),
    TemplateDialogIframe: new Resources.ControlInfo('m-tdIframe'),
    TextEntry: new Resources.ControlInfo('m-textEntry'),
    TextureSettingsDialog: new Resources.ControlInfo('m-texturesettings'),
    TexturesDialog: new Resources.ControlInfo('m-textures'),
    TimelineImportDialog: new Resources.ControlInfo('m-timelineVisualizer'),
    TimelineEventPicker: new Resources.ControlInfo('m-eventPicker'),
    TimelineRangeSelect: new Resources.ControlInfo('m-timelineRangeSelect'),
    TrelloSyncMessage: new Resources.ControlInfo('m-trellosync'),
    TrialActivateDialog: new Resources.ControlInfo('m-trialactivate'),
    TrialBuyDialog: new Resources.ControlInfo('m-trialbuy'),
    TrialSplashDialog: new Resources.ControlInfo('m-trialsplash'),
    WorkAreaDialog: new Resources.ControlInfo('m-workArea')
  },
  Modal_DocHistory: {
    IFrame: new Resources.ControlInfo('m-dochistory-iframe')
  },
  Modal_TrialBuyDialog: {
    Title: new Resources.ControlInfo('m-buy-title'),
    IFrame: new Resources.ControlInfo('m-buy-iframe')
  },
  Modal_ActiveSessionAlert: {
    StatusText: new Resources.ControlInfo('m-activeSession-status'),
    OK: new Resources.ControlInfo('m-activeSession-ok'),
    Edit: new Resources.ControlInfo('m-activeSession-edit'),
    View: new Resources.ControlInfo('m-activeSession-view'),
    License: new Resources.ControlInfo('m-activeSession-license'),
    Cancel: new Resources.ControlInfo('m-activeSession-cancel'),
    SaveCopy: new Resources.ControlInfo('m-activeSession-saveCopy'),
    ReconnectingSpinner: new Resources.ControlInfo('m-activeSession-reconnectLoader')
  },
  Modal_Alert: {
    StatusText: new Resources.ControlInfo('m-alert-status'),
    StatusDetailText: new Resources.ControlInfo('m-alert-statusDetail'),
    OK: new Resources.ControlInfo('m-alert-ok'),
    Cancel: new Resources.ControlInfo('m-alert-cancel'),
    Header: new Resources.ControlInfo('m-alert-header'),
    LoadingSpinner: new Resources.ControlInfo('m-alert-loading'),
    Footer: new Resources.ControlInfo('m-alert-footer')
  },
  Modal_SymbolLibrary: {
    TreeViewContainer: new Resources.ControlInfo('m-symbolLib-tree'),
    ViewItemContainer: new Resources.ControlInfo('m-symbolLib-view'),
    Close: new Resources.ControlInfo('m-symbolLib-close'),
    Add: new Resources.ControlInfo('m-symbolLib-add'),
    LibraryNameLabel: new Resources.ControlInfo('m-symbolLib-curLibName'),
    SearchContainer: new Resources.ControlInfo('cv-subNav-searchContainer'),
    RenameCustomLibrary: new Resources.ControlInfo('m-symbolLib-renameCustomLibrary')
  },
  Modal_FilePicker: {
    Breadcrumb: new Resources.ControlInfo('m-filePicker-breadcrumb'),
    GalleryViewContainer: new Resources.ControlInfo('m-filePicker-view'),
    GalleryGridContainer: new Resources.ControlInfo('m-filePicker-grid'),
    FileName: new Resources.ControlInfo('m-filePicker-fileName'),
    FileType: new Resources.ControlInfo('m-filePicker-type'),
    FileTypeIcon: new Resources.ControlInfo('m-filePicker-typeIcon'),
    Commit: new Resources.ControlInfo('m-filePicker-commit'),
    SelectHyperlink: new Resources.ControlInfo('m-filePicker-select'),
    Title: new Resources.ControlInfo('m-filePicker-title'),
    DepoIcon: new Resources.ControlInfo('m-filePicker-depoIcon'),
    DepoSelect: new Resources.ControlInfo('m-filePicker-depo'),
    MoreView: new Resources.ControlInfo('m-filePicker-more'),
    DepoContainer: new Resources.ControlInfo('m-filePicker-depoContainer'),
    NewFolder: new Resources.ControlInfo('m-filePicker-newFolder')
  },
  Modal_Scale: {
    UseImperialScale: new Resources.ControlInfo('m-scale-useImperial'),
    UseMetricScale: new Resources.ControlInfo('m-scale-useMetric'),
    TargetMeasureInInches: new Resources.ControlInfo('m-scale-setMeasureInches'),
    TargetMeasureInFeet: new Resources.ControlInfo('m-scale-setMeasureFeet'),
    TargetMeasureInMm: new Resources.ControlInfo('m-scale-setMeasureMm'),
    TargetMeasureInCm: new Resources.ControlInfo('m-scale-setMeasureCm'),
    TargetMeasureInMetres: new Resources.ControlInfo('m-scale-setMeasureMetres'),
    TargetMeasurementIncrement: new Resources.ControlInfo('m-scale-targetMeasureIncrement'),
    HorizontalRuler: new Resources.ControlInfo('m-scale-horizontalRuler'),
    VerticalRuler: new Resources.ControlInfo('m-scale-verticalRuler'),
    ShowPixels: new Resources.ControlInfo('m-scale-showPixels'),
    ShowPixelsLabel: new Resources.ControlInfo('m-scale-showPixelsLabel')
  },
  Modal_Dimensions: {
    ShowDimensionsNever: new Resources.ControlInfo('m-showDimensions-showNever'),
    ShowDimensionsWhenSelected: new Resources.ControlInfo('m-showDimensions-showWhenSelected'),
    ShowDimensionsAlways: new Resources.ControlInfo('m-showDimensions-showAlways'),
    ShowDimensionsEndPts: new Resources.ControlInfo('m-showDimensions-endPts'),
    ShowDimensionsTotal: new Resources.ControlInfo('m-showDimensions-total'),
    ShowDimensionsAllSeg: new Resources.ControlInfo('m-showDimensions-allSeg'),
    ShowDimensionsRectWithAndHeight: new Resources.ControlInfo('m-showDimensions-rectWithAndHeight'),
    ShowDimensionsArea: new Resources.ControlInfo('m-showDimensions-area'),
    ShowDimensionsNoArea: new Resources.ControlInfo('m-showDimensions-noArea'),
    ShowDimensionsExtensionLines: new Resources.ControlInfo('m-showDimensions-extensionLines'),
    ShowDimensionsLineAngles: new Resources.ControlInfo('m-showDimensions-lineAngles'),
    ShowDimensionsMeasureFromExterior: new Resources.ControlInfo('m-showDimensions-measureFromExterior'),
    ShowDimensionsMeasureFromInterior: new Resources.ControlInfo('m-showDimensions-measureFromInterior')
  },
  Modal_ProjectOptions: {
    TaskNumber: new Resources.ControlInfo('m-projectOptions-taskNumber'),
    Resource: new Resources.ControlInfo('m-projectOptions-resource'),
    Dept: new Resources.ControlInfo('m-projectOptions-dept'),
    Cost: new Resources.ControlInfo('m-projectOptions-cost'),
    Cust: new Resources.ControlInfo('m-projectOptions-cust'),
    Start: new Resources.ControlInfo('m-projectOptions-start'),
    End: new Resources.ControlInfo('m-projectOptions-end'),
    Length: new Resources.ControlInfo('m-projectOptions-length'),
    PC: new Resources.ControlInfo('m-projectOptions-pc'),
    HolidayCountry: new Resources.ControlInfo('m-projectOptions-holidays'),
    WorkDaySun: new Resources.ControlInfo('m-projectOptions-toggleSunday'),
    WorkDayMon: new Resources.ControlInfo('m-projectOptions-toggleMonday'),
    WorkDayTue: new Resources.ControlInfo('m-projectOptions-toggleTuesday'),
    WorkDayWed: new Resources.ControlInfo('m-projectOptions-toggleWednesday'),
    WorkDayThu: new Resources.ControlInfo('m-projectOptions-toggleThursday'),
    WorkDayFri: new Resources.ControlInfo('m-projectOptions-toggleFriday'),
    WorkDaySat: new Resources.ControlInfo('m-projectOptions-toggleSaturday')
  },
  Modal_ProjectTimeframe: {
    StartDate: new Resources.ControlInfo('m-projectTimeframe-datepickerFrom'),
    EndDate: new Resources.ControlInfo('m-projectTimeframe-datepickerTo'),
    TaskStartDate: new Resources.ControlInfo('m-projectTimeframe-datepickerStart')
  },
  Modal_CreateTrelloCard: {
    PickBoard: new Resources.ControlInfo('m-createTrelloCard-boardNameButtonLabel'),
    PickLane: new Resources.ControlInfo('m-createTrelloCard-laneButtonLabel'),
    PickMember: new Resources.ControlInfo('m-createTrelloCard-membersButtonLabel'),
    Description: new Resources.ControlInfo('m-createTrelloCard-commentField')
  },
  Modal_PageSetup: {
    PaperSize: new Resources.ControlInfo('m-pageSetup-paperSize'),
    PrintOrientation: new Resources.ControlInfo('m-pageSetup-printOrientation'),
    PrintToOnePage: new Resources.ControlInfo('m-pageSetup-printToOnePage'),
    PrintScaleType: new Resources.ControlInfo('m-pageSetup-printScale'),
    PrintScaleAmount: new Resources.ControlInfo('m-pageSetup-printScaleOptions'),
    SelectedPage: new Resources.ControlInfo('m-pageSetup-selectedPage'),
    PageCount: new Resources.ControlInfo('m-pageSetup-numberOfPages'),
    PrevPage: new Resources.ControlInfo('m-pageSetup-prevPage'),
    NextPage: new Resources.ControlInfo('m-pageSetup-nextPage'),
    PrintGrid: new Resources.ControlInfo('m-pageSetup-printGrid'),
    PrintAllPages: new Resources.ControlInfo('m-pageSetup-printAllPages'),
    IncludeLinks: new Resources.ControlInfo('m-pageSetup-includeLinks')
  },
  Modal_Hyperlink: {
    LinkText: new Resources.ControlInfo('m-hyperlink-text'),
    Browse: new Resources.ControlInfo('m-hyperlink-browse'),
    Clear: new Resources.ControlInfo('m-hyperlink-clear'),
    ClearPage: new Resources.ControlInfo('m-hyperlink-pageClear'),
    HyperlinkPageTitle: new Resources.ControlInfo('m-hyperlink-pageTitle'),
    HyperlinkPageSection: new Resources.ControlInfo('m-hyperlink-pageDiv'),
    HyperlinkPageSelector: new Resources.ControlInfo('m-hyperlink-page')
  },
  Modal_Find: {
    FindText: new Resources.ControlInfo('r-page-findText')
  },
  Modal_SetRoundness: {
    SetRoundnessRounded: new Resources.ControlInfo('m-setRoundness-rounded'),
    SetRoundnessSquare: new Resources.ControlInfo('m-setRoundness-square'),
    SetRoundnessSpinner: new Resources.ControlInfo('m-setRoundness-setCornerRoundnessSpiner'),
    SetRoundnessAll: new Resources.ControlInfo('m-setRoundness-applyToAll')
  },
  Modal_ImportFile: {
    Input: new Resources.ControlInfo('m-importfile-input'),
    OK: new Resources.ControlInfo('m-importfile-ok'),
    Cancel: new Resources.ControlInfo('m-importfile-cancel')
  },
  Modal_ImportImage: {
    Input: new Resources.ControlInfo('m-importimage-input'),
    OK: new Resources.ControlInfo('m-importimage-ok'),
    Cancel: new Resources.ControlInfo('m-importimage-cancel'),
    Title: new Resources.ControlInfo('m-importimage-title'),
    Background: new Resources.ControlInfo('m-importimage-toggleBackground')
  },
  Modal_ImportPDF: {
    Input: new Resources.ControlInfo('m-importpdf-input'),
    Background: new Resources.ControlInfo('m-importpdf-toggleBackground'),
    OK: new Resources.ControlInfo('m-importpdf-ok'),
    Cancel: new Resources.ControlInfo('m-importpdf-cancel'),
    Title: new Resources.ControlInfo('m-importpdf-title')
  },
  Modal_ImportSDON: {
    Input: new Resources.ControlInfo('m-importsdon-input'),
    LoadedDataResults: new Resources.ControlInfo('m-importsdon-loadedDataResults'),
    FileTitle: new Resources.ControlInfo('m-importsdon-fileTitle'),
    ImportDropZone: new Resources.ControlInfo('m-importsdon-importDropZone'),
    OK: new Resources.ControlInfo('m-importsdon-ok'),
    Cancel: new Resources.ControlInfo('m-importsdon-cancel')
  },
  Modal_ImportText: {
    Input: new Resources.ControlInfo('m-importtext-input'),
    OK: new Resources.ControlInfo('m-importtext-ok'),
    Cancel: new Resources.ControlInfo('m-importtext-cancel'),
    ReplaceChart: new Resources.ControlInfo('m-importtext-replaceChart'),
    AppendToShape: new Resources.ControlInfo('m-importtext-appendToShape')
  },
  Modal_ImportStickynotes: {
    Input: new Resources.ControlInfo('m-importstickynotes-input'),
    LoadedDataResults: new Resources.ControlInfo('m-importstickynotes-loadedDataResults'),
    FileTitle: new Resources.ControlInfo('m-importstickynotes-fileTitle'),
    ImportDropZone: new Resources.ControlInfo('m-importstickynotes-importDropZone'),
    OK: new Resources.ControlInfo('m-importstickynotes-ok'),
    Cancel: new Resources.ControlInfo('m-importstickynotes-cancel')
  },
  Modal_ImportGliffy: {
    Input: new Resources.ControlInfo('m-importgliffy-input'),
    OK: new Resources.ControlInfo('m-importgliffy-ok'),
    Cancel: new Resources.ControlInfo('m-importgliffy-cancel')
  },
  Modal_ImportData: {
    Input: new Resources.ControlInfo('m-importdata-input'),
    URLInput: new Resources.ControlInfo('m-importdata-urlinput'),
    OK: new Resources.ControlInfo('m-importdata-ok'),
    Cancel: new Resources.ControlInfo('m-importdata-cancel'),
    FileTab: new Resources.ControlInfo('m-importdata-filemode'),
    URLTab: new Resources.ControlInfo('m-importdata-urlmode'),
    UpdateSection: new Resources.ControlInfo('m-importdata-updatesection'),
    FieldSelectLabel: new Resources.ControlInfo('m-importdata-fieldselectlabel'),
    FieldSelect: new Resources.ControlInfo('m-importdata-fieldselect'),
    AutoUpdateGroup: new Resources.ControlInfo('m-importdata-autoupdategroup'),
    AutoUpdate: new Resources.ControlInfo('m-importdata-autoupdate'),
    Title: new Resources.ControlInfo('m-importdata-title'),
    AltTitle: new Resources.ControlInfo('m-importdata-alttitle')
  },

  Modal_ImportCustomContentDialog: {
    FilePicker: new Resources.ControlInfo('m-importCustomContentDialog-files'),
    ImportGallery: new Resources.ControlInfo('m-importCustomContentDialog-gallery'),
    ExecuteImportButton: new Resources.ControlInfo('m-importCustomContentDialog-importFiles'),
    Title: new Resources.ControlInfo('m-importCustomContentDialog-title')
  },
  Modal_Notes: {
    NoteText: new Resources.ControlInfo('m-notes-text'),
    Clear: new Resources.ControlInfo('m-notes-clear')
  },
  Modal_PDFExport: {
    Cancel: new Resources.ControlInfo('m-pdfExport-cancel')
  },
  Modal_Feedback: {
    LinkText: new Resources.ControlInfo('m-feedback-text')
  },
  Modal_Options: {
    LineLink: new Resources.ControlInfo('m-options-linelink'),
    LineShapes: new Resources.ControlInfo('m-options-lineshapes'),
    LineJoin: new Resources.ControlInfo('m-options-linejoin'),
    CtrlArrow: new Resources.ControlInfo('m-options-ctrlArrow')
  },
  Modal_ConnectionPoints: {
    Default: new Resources.ControlInfo('m-connectionPoints-pointsDefault'),
    Continuous: new Resources.ControlInfo('m-connectionPoints-pointsContinuous'),
    Custom: new Resources.ControlInfo('m-connectionPoints-pointsCustom'),
    Preview: new Resources.ControlInfo('m-connectionPoints-Preview'),
    CustomValues: new Resources.ControlInfo('m-connectionPoints-customValues'),
    CustomXValue: new Resources.ControlInfo('m-connectionPoints-customXValue'),
    CustomYValue: new Resources.ControlInfo('m-connectionPoints-customYValue'),
    UseSnaps: new Resources.ControlInfo('m-connectionPoints-useSnaps')
  },
  Modal_LineHops: {
    GlobalShow: new Resources.ControlInfo('m-lineHopsShow-show'),
    GlobalHide: new Resources.ControlInfo('m-lineHopsShow-hide'),
    StyleRound: new Resources.ControlInfo('m-lineHopsStyle-round'),
    StyleSquare: new Resources.ControlInfo('m-lineHopsStyle-square'),
    SizeSmall: new Resources.ControlInfo('m-lineHopsSize-small'),
    SizeMedium: new Resources.ControlInfo('m-lineHopsSize-medium'),
    SizeLarge: new Resources.ControlInfo('m-lineHopsSize-large'),
    LineShowHops: new Resources.ControlInfo('m-LineHopsThisLine')
  },
  Modal_NameDialog: {
    Header: new Resources.ControlInfo('m-name-header'),
    Description: new Resources.ControlInfo('m-name-description'),
    NameText: new Resources.ControlInfo('m-name-text'),
    OK: new Resources.ControlInfo('m-name-ok'),
    Cancel: new Resources.ControlInfo('m-name-cancel')
  },
  Modal_NewLayer: {
    IsVisible: new Resources.ControlInfo('m-newLayer-visible'),
    IsClickable: new Resources.ControlInfo('m-newLayer-clickable'),
    LayerName: new Resources.ControlInfo('m-newLayer-layername')
  },
  Modal_EditLayer: {
    IsVisible: new Resources.ControlInfo('m-editLayer-visible'),
    IsClickable: new Resources.ControlInfo('m-editLayer-clickable'),
    LayerName: new Resources.ControlInfo('m-editLayer-layername')
  },
  Modal_ManageLayers: {
    LayerTable: new Resources.ControlInfo('m-manageLayers-layerTable'),
    MoveLayerUp: new Resources.ControlInfo('m-manageLayers-moveLayerUp'),
    MoveLayerDown: new Resources.ControlInfo('m-manageLayers-moveLayerDown'),
    RemoveLayer: new Resources.ControlInfo('m-manageLayers-removeLayer')
  },
  Modal_DataRules: {
    NameField: new Resources.ControlInfo('m-dataRules-nameInput'),
    RulesContainer: new Resources.ControlInfo('m-dataRules-rulesContainer'),
    OKBtn: new Resources.ControlInfo('m-dataRules-okBtn'),
    DeleteBtn: new Resources.ControlInfo('m-dataRules-deleteBtn')
  },
  Modal_DataList: {
    ListContainer: new Resources.ControlInfo('m-dataList-listContainer'),
    RowAdd: new Resources.ControlInfo('m-dataList-rowadd'),
    RowDel: new Resources.ControlInfo('m-dataList-rowdel'),
    RowUp: new Resources.ControlInfo('m-dataList-rowup'),
    RowDown: new Resources.ControlInfo('m-dataList-rowdown'),
    NoEntry: new Resources.ControlInfo('m-dataList-noentry'),
    OKBtn: new Resources.ControlInfo('m-dataList-okBtn'),
    DeleteBtn: new Resources.ControlInfo('m-dataList-deleteBtn')
  },
  Modal_AWSImport: {
    TitleField: new Resources.ControlInfo('m-importaws-titleinput'),
    KeyField: new Resources.ControlInfo('m-importaws-keyinput'),
    SecretField: new Resources.ControlInfo('m-importaws-secretinput'),
    RegionSelect: new Resources.ControlInfo('m-importaws-regionselect'),
    RegionSection: new Resources.ControlInfo('m-importaws-regionSection'),
    KeyImport: new Resources.ControlInfo('m-importaws-keyImport'),
    RoleImport: new Resources.ControlInfo('m-importaws-roleImport'),
    ARNField: new Resources.ControlInfo('m-importaws-arnInput'),
    ProgressGroup: new Resources.ControlInfo('m-importaws-progressgroup'),
    ProgressText: new Resources.ControlInfo('m-importaws-progresstext'),
    ProgressBar: new Resources.ControlInfo('m-importaws-progressbar'),
    OKBtn: new Resources.ControlInfo('m-importaws-okBtn'),
    DataSourceSelect: new Resources.ControlInfo('m-importaws-dataSourceSelect'),
    DataSourceSelectRole: new Resources.ControlInfo('m-importaws-dataSourceSelect-role'),
    DataSourceSelectKey: new Resources.ControlInfo('m-importaws-dataSourceSelect-key'),
    ExternalId: new Resources.ControlInfo('m-importaws-externalId')
  },
  Modal_AzureImport: {
    TitleField: new Resources.ControlInfo('m-importazure-titleinput'),
    SubField: new Resources.ControlInfo('m-importazure-subinput'),
    RSGroupList: new Resources.ControlInfo('m-importazure-grouplist'),
    ProgressGroup: new Resources.ControlInfo('m-importazure-progressgroup'),
    ProgressText: new Resources.ControlInfo('m-importazure-progresstext'),
    ProgressBar: new Resources.ControlInfo('m-importazure-progressbar'),
    OKBtn: new Resources.ControlInfo('m-importazure-okBtn')
  },
  Modal_CustomThemeDialog: {
    ThemeName: new Resources.ControlInfo('m-customThemeModal-themeName'),
    ErrorMessage: new Resources.ControlInfo('m-customThemeModal-errorField'),
    Swatch1: new Resources.ControlInfo('m-customThemeModal-swatch1'),
    Swatch2: new Resources.ControlInfo('m-customThemeModal-swatch2'),
    Swatch3: new Resources.ControlInfo('m-customThemeModal-swatch3'),
    Swatch4: new Resources.ControlInfo('m-customThemeModal-swatch4'),
    Swatch5: new Resources.ControlInfo('m-customThemeModal-swatch5'),
    Swatch6: new Resources.ControlInfo('m-customThemeModal-swatch6'),
    OKBtn: new Resources.ControlInfo('m-customThemeModal-OK')
  },
  Modal_DataExport: {
    FieldList: new Resources.ControlInfo('m-exportData-fieldList'),
    TableView: new Resources.ControlInfo('m-exportData-tableView'),
    SelectAllBtn: new Resources.ControlInfo('m-exportData-selectAllBtn'),
    SelectNoneBtn: new Resources.ControlInfo('m-exportData-selectNoneBtn'),
    ExportClipBtn: new Resources.ControlInfo('m-exportData-clipboardBtn'),
    ExportFileBtn: new Resources.ControlInfo('m-exportData-fileBtn'),
    ExportTableBtn: new Resources.ControlInfo('m-exportData-tableBtn')
  },
  Modal_D3SymbolBuilder: {
    LibSelector: new Resources.ControlInfo('m-d3Builder-libSelector'),
    D3SettingsField: new Resources.ControlInfo('m-d3Builder-d3SettingsField'),
    PreviewBtn: new Resources.ControlInfo('m-d3Builder-previewBtn'),
    PreviewArea: new Resources.ControlInfo('m-d3Builder-previewArea'),
    OKBtn: new Resources.ControlInfo('m-d3Builder-okBtn')
  },
  Modal_EditGraph: {
    list: new Resources.ControlInfo('m-editGraph-moreParametersList'),
    legend: new Resources.ControlInfo('m-editGraph-legend'),
    graphType: new Resources.ControlInfo('m-editGraph-graphType'),
    title: new Resources.ControlInfo('m-editGraph-title')
  },
  Modal_EditGauge: {
    list: new Resources.ControlInfo('m-editGauge-moreParametersList'),
    gaugeType: new Resources.ControlInfo('m-editGauge-gaugeType'),
    min: new Resources.ControlInfo('m-editGauge-Min'),
    value: new Resources.ControlInfo('m-editGauge-Value'),
    max: new Resources.ControlInfo('m-editGauge-Max')
  },
  Modal_TextEntry: {
    GrowProp: new Resources.ControlInfo('m-textEntry-prop'),
    GrowHoriz: new Resources.ControlInfo('m-textEntry-horiz'),
    GrowVert: new Resources.ControlInfo('m-textEntry-vert'),
    CREnter: new Resources.ControlInfo('m-textEntry-cr-enter'),
    CRTab: new Resources.ControlInfo('m-textEntry-cr-tab'),
    Single: new Resources.ControlInfo('m-textEntry-single'),
    Double: new Resources.ControlInfo('m-textEntry-double'),
    None: new Resources.ControlInfo('m-textEntry-none'),
    TMargin: new Resources.ControlInfo('m-textEntry-tmargin'),
    OK: new Resources.ControlInfo('m-name-ok'),
    Cancel: new Resources.ControlInfo('m-name-cancel'),
    NoSpelling: new Resources.ControlInfo('m-textEntry-noSpelling'),
    TextPosition: new Resources.ControlInfo('m-textEntry-textPosition')
  },
  Modal_GrowDlg: {
    GrowProp: new Resources.ControlInfo('m-shapeProperties-prop'),
    GrowHoriz: new Resources.ControlInfo('m-shapeProperties-horiz'),
    GrowVert: new Resources.ControlInfo('m-shapeProperties-vert'),
    GrowAll: new Resources.ControlInfo('m-shapeProperties-all'),
    AdjSides: new Resources.ControlInfo('m-shapeProperties-adjustSides'),
    RRectProp: new Resources.ControlInfo('m-shapeProperties-rrectprop'),
    RRectFixed: new Resources.ControlInfo('m-shapeProperties-rrectfixed'),
    RRectPropLabel: new Resources.ControlInfo('m-shapeProperties-rrectprop-label'),
    RRectFixedLabel: new Resources.ControlInfo('m-shapeProperties-rrectfixed-label'),
    RRectControls: new Resources.ControlInfo('m-shapeProperties'),
    ContainerBox: new Resources.ControlInfo('m-shapeProperties-makeContainer')
  },
  Modal_WorkAreaDialog: {
    Preview: new Resources.ControlInfo('m-workArea-Preview'),
    RemoveBlankPages: new Resources.ControlInfo('m-workArea-removeBlankPages'),
    PagesAcross: new Resources.ControlInfo('m-workArea-pagesAcross'),
    PagesDown: new Resources.ControlInfo('m-workArea-pagesDown'),
    InchesAcross: new Resources.ControlInfo('m-workArea-inchesAcross'),
    InchesDown: new Resources.ControlInfo('m-workArea-inchesDown'),
    FixImageSizeInInches: new Resources.ControlInfo('m-workArea-fixImageSizeInInches'),
    AllowAutoGrow: new Resources.ControlInfo('m-workArea-toggleAutoGrow')
  },
  Modal_ArrowheadsDialog: {
    Preview: new Resources.ControlInfo('m-arrowheads-Preview')
  },
  Modal_ArrowheadsERDDialogStart: {
    StartNone: new Resources.ControlInfo('dd-arrowERDLeft-arrowheadStartNone'),
    StartMany: new Resources.ControlInfo('dd-arrowERDLeft-arrowheadStartMany'),
    StartOne: new Resources.ControlInfo('dd-arrowERDLeft-arrowheadStartOne'),
    StartZeroMany: new Resources.ControlInfo('dd-arrowERDLeft-arrowheadStartZeroMany'),
    StartOneMany: new Resources.ControlInfo('dd-arrowERDLeft-arrowheadStartOneMany'),
    StartZeroOne: new Resources.ControlInfo('dd-arrowERDLeft-arrowheadStartZeroOne'),
    StartOnlyOne: new Resources.ControlInfo('dd-arrowERDLeft-arrowheadStartOnlyOne')
  },
  Modal_ArrowheadsERDDialogEnd: {
    EndNone: new Resources.ControlInfo('dd-arrowERDRight-arrowheadEndNone'),
    EndMany: new Resources.ControlInfo('dd-arrowERDRight-arrowheadEndMany'),
    EndOne: new Resources.ControlInfo('dd-arrowERDRight-arrowheadEndOne'),
    EndZeroMany: new Resources.ControlInfo('dd-arrowERDRight-arrowheadEndZeroMany'),
    EndOneMany: new Resources.ControlInfo('dd-arrowERDRight-arrowheadEndOneMany'),
    EndZeroOne: new Resources.ControlInfo('dd-arrowERDRight-arrowheadEndZeroOne'),
    EndOnlyOne: new Resources.ControlInfo('dd-arrowERDRight-arrowheadEndOnlyOne'),
    Preview: new Resources.ControlInfo('m-arrowheadsERD-Preview')
  },
  Modal_CustomRotationDialog: {
    SetCustomRotation: new Resources.ControlInfo('m-customRotation-setCustomRotation')
  },
  Modal_TexturesDialog: {
    TexturesTitle: new Resources.ControlInfo('m-textures-dialog-title'),
    TextureList: new Resources.ControlInfo('m-textures-list'),
    OKButton: new Resources.ControlInfo('m-textures-OK'),
    CancelButton: new Resources.ControlInfo('m-textures-cancel'),
    EditTexture: new Resources.ControlInfo('m-textures-edit')
  },
  Modal_TexturesSettingDialog: {
    TexturePercent: new Resources.ControlInfo('m-texturesettings-size-percent'),
    TextureUnits: new Resources.ControlInfo('m-texturesettings-size-units'),
    TextureAlignFixed: new Resources.ControlInfo('m-texturesettings-align-fixed'),
    TextureAlignSpecific: new Resources.ControlInfo('m-texturesettings-align-specific'),
    TexturePercentValue: new Resources.ControlInfo('m-texturesettings-size-percent-value'),
    TextureUnitsValue: new Resources.ControlInfo('m-texturesettings-size-units-value'),
    TextureUnitsDropdown: new Resources.ControlInfo('m-texturesettings-size-units-units'),
    TextureAlignmentDropdown: new Resources.ControlInfo('m-texturesettings-align-specific-value')
  },
  Modal_InsertSymbolDialog: {
    SymbolList: new Resources.ControlInfo('m-insertsymbol-list')
  },
  Modal_CustomMarginsDialog: {
    LeftMargin: new Resources.ControlInfo('m-custommargins-leftmargin'),
    RightMargin: new Resources.ControlInfo('m-custommargins-rightmargin'),
    TopMargin: new Resources.ControlInfo('m-custommargins-topmargin'),
    BottomMargin: new Resources.ControlInfo('m-custommargins-bottommargin')
  },
  Modal_CustomParametersDialog: {
    Title: new Resources.ControlInfo('m-customparams-title'),
    Title2: new Resources.ControlInfo('m-customparams-title2'),
    LeftMargin: new Resources.ControlInfo('m-customparams-leftmargin'),
    RightMargin: new Resources.ControlInfo('m-customparams-rightmargin')
  },
  Modal_ColorPickerDialog: {
    ColorPickerTitle: new Resources.ControlInfo('m-colorpicker-title')
  },
  Modal_TemplateDialog: {
    Iframe: new Resources.ControlInfo('m-templateDialog-iFrame')
  },
  Modal_GradientDialog: {
    GradientTitle: new Resources.ControlInfo('m-gradient-dialog-title'),
    GradientSchemes: new Resources.ControlInfo('m-gradient-schemes')
  },
  Modal_ShareDialog: {
    ShareURL: new Resources.ControlInfo('m-shareDialog-url'),
    ShareAccessType: new Resources.ControlInfo('m-shareDialog-accessType'),
    Instructions: new Resources.ControlInfo('m-shareDialog-instructions'),
    PermissionsTable: new Resources.ControlInfo('m-shareDialog-permissionsTable'),
    Cancel: new Resources.ControlInfo('m-shareDialog-cancel'),
    SendLink: new Resources.ControlInfo('m-shareDialog-sendLink'),
    CopyLink: new Resources.ControlInfo('m-shareDialog-copy'),
    EmailEntryContainer: new Resources.ControlInfo('m-shareDialog-emailShare'),
    EmailEntryInput: new Resources.ControlInfo('m-shareDialog-emailInput'),
    EmailEntryOuterContainer: new Resources.ControlInfo('m-shareDialog-emailShareContainer'),
    EmailEntryHiddenInput: new Resources.ControlInfo('m-shareDialog-hiddenInput'),
    ThirdPartyStorageInfo: new Resources.ControlInfo('m-shareDialog-thirdPartyStorageInfo')
  },
  Modal_PublishUpdates: {
    NotifyMessage: new Resources.ControlInfo('m-publishUpdates-notifyMessage'),
    PublishButton: new Resources.ControlInfo('m-publishUpdates-publish'),
    InfoMessage: new Resources.ControlInfo('m-publishUpdates-infoMessage'),
    WarnMessage: new Resources.ControlInfo('m-publishUpdates-warnMessage'),
    ErrorMessage: new Resources.ControlInfo('m-publishUpdates-errorMessage')
  },
  Modal_PublishingUrl: {
    Url: new Resources.ControlInfo('m-publishingURL-url')
  },
  Modal_ChatGPTInput: {
    Query: new Resources.ControlInfo('m-chatGPTInput-query')
  },
  Modal_JiraAddIssue: {
    IssueKey: new Resources.ControlInfo('m-jiraAddIssue-issueKey'),
    IssueKeyMoreFieldsControl: new Resources.ControlInfo('m-jiraAddIssue-issueKeyMoreFields'),
    ProjectSection: new Resources.ControlInfo('m-jiraAddIssue-projectSection'),
    ProjectName: new Resources.ControlInfo('m-jiraAddIssue-projectName'),
    IssueTypes: new Resources.ControlInfo('m-jiraAddIssue-issueTypes'),
    EpicNameGroup: new Resources.ControlInfo('m-jiraAddIssue-epicNameGroup'),
    EpicName: new Resources.ControlInfo('m-jiraAddIssue-epicName'),
    Priorities: new Resources.ControlInfo('m-jiraAddIssue-priorities'),
    Summary: new Resources.ControlInfo('m-jiraAddIssue-summary'),
    Description: new Resources.ControlInfo('m-jiraAddIssue-description'),
    Assignee: new Resources.ControlInfo('m-jiraAddIssue-assignee'),
    Sprint: new Resources.ControlInfo('m-jiraAddIssue-sprint'),
    FixVersion: new Resources.ControlInfo('m-jiraAddIssue-fixVersion'),
    Header: new Resources.ControlInfo('m-jiraAddIssue-header'),
    ProjectsLoadingSpinner: new Resources.ControlInfo('m-jiraAddIssue-projects-loading'),
    DialogLoadingSpinner: new Resources.ControlInfo('m-jiraAddIssue-dialog-loading'),
    IssueTypesLoadingSpinner: new Resources.ControlInfo('m-jiraAddIssue-issueTypes-loading'),
    PrioritiesLoadingSpinner: new Resources.ControlInfo('m-jiraAddIssue-priorities-loading'),
    WaitingForAuthentication: new Resources.ControlInfo('m-jiraAddIssue-waitingForAuthentication'),
    Authenticated: new Resources.ControlInfo('m-jiraAddIssue-authenticated'),
    Ok: new Resources.ControlInfo('m-jiraAddIssue-ok')
  },
  Modal_JiraFindIssue: {
    SelectOperation: new Resources.ControlInfo('m-jiraFindIssue-selection'),
    ProjectName: new Resources.ControlInfo('m-jiraFindIssue-projectName'),
    SearchContainer: new Resources.ControlInfo('m-jiraFindIssue-searchContainer'),
    Search: new Resources.ControlInfo('m-jiraFindIssue-search'),
    SearchMessage: new Resources.ControlInfo('m-jiraFindIssue-searchMessage'),
    SearchTypeAdvanced: new Resources.ControlInfo('m-jiraFindIssue-searchTypeAdvanced'),
    SearchTypeBasic: new Resources.ControlInfo('m-jiraFindIssue-searchTypeBasic'),
    SearchTypeFilter: new Resources.ControlInfo('m-jiraFindIssue-searchTypeFilter'),
    SortGroup: new Resources.ControlInfo('m-jiraFindIssue-sortGroup'),
    SortField: new Resources.ControlInfo('m-jiraFindIssue-sortField'),
    SortDirectionAsc: new Resources.ControlInfo('m-jiraFindIssue-sortDirectionAsc'),
    SortDirectionDesc: new Resources.ControlInfo('m-jiraFindIssue-sortDirectionDesc'),
    ErrorMessage: new Resources.ControlInfo('m-jiraFindIssue-errorMessage'),
    SelectedIssueKey: new Resources.ControlInfo('m-jiraFindIssue-selectedIssueKey'),
    SelectAll: new Resources.ControlInfo('m-jiraFindIssue-selectAll'),
    ResultsContainer: new Resources.ControlInfo('m-jiraFindIssue-resultsContainer'),
    ResultsColumnHeaders: new Resources.ControlInfo('m-jiraFindIssue-headerContainer'),
    ResultsList: new Resources.ControlInfo('m-jiraFindIssue-resultsList'),
    ProjectsLoadingSpinner: new Resources.ControlInfo('m-jiraFindIssue-projects-loading'),
    SearchLoadingSpinner: new Resources.ControlInfo('m-jiraFindIssue-search-loading'),
    FiltersSelect: new Resources.ControlInfo('m-jiraFindIssue-filterSelect'),
    CurrentInstance: new Resources.ControlInfo('m-jiraFindIssue-currentInstance'),
    WaitingForAuthentication: new Resources.ControlInfo('m-jiraFindIssue-waitingForAuthentication'),
    Authenticated: new Resources.ControlInfo('m-jiraFindIssue-authenticated'),
    Ok: new Resources.ControlInfo('m-jiraFindIssue-ok')
  },
  Modal_JiraPIBoard: {
    ProjectName: new Resources.ControlInfo('m-jiraPIBoard-projectName'),
    Sprints: new Resources.ControlInfo('m-jiraPIBoard-sprints'),
    Sprint1: new Resources.ControlInfo('m-jiraPIBoard-sprint1'),
    Sprint2: new Resources.ControlInfo('m-jiraPIBoard-sprint2'),
    Sprint3: new Resources.ControlInfo('m-jiraPIBoard-sprint3'),
    Sprint4: new Resources.ControlInfo('m-jiraPIBoard-sprint4'),
    Sprint5: new Resources.ControlInfo('m-jiraPIBoard-sprint5'),
    Teams: new Resources.ControlInfo('m-jiraPIBoard-teamField'),
    TeamsCustom: new Resources.ControlInfo('m-jiraPIBoard-teamFieldCustom'),
    IssueTypes: new Resources.ControlInfo('m-jiraPIBoard-issueTypes'),
    ProjectsLoadingSpinner: new Resources.ControlInfo('m-jiraPIBoard-projects-loading'),
    SprintsLoadingSpinner: new Resources.ControlInfo('m-jiraPIBoard-sprints-loading'),
    IssueTypesLoadingSpinner: new Resources.ControlInfo('m-jiraPIBoard-issueTypes-loading'),
    WaitingForAuthentication: new Resources.ControlInfo('m-jiraPIBoard-waitingForAuthentication'),
    Authenticated: new Resources.ControlInfo('m-jiraPIBoard-authenticated'),
    Ok: new Resources.ControlInfo('m-jiraPIBoard-ok')
  },
  Modal_JiraProductRoadmap: {
    ProjectName: new Resources.ControlInfo('m-jiraProductRoadmap-projectName'),
    ProgramIncrement1: new Resources.ControlInfo('m-jiraProductRoadmap-programIncrement1'),
    ProgramIncrement2: new Resources.ControlInfo('m-jiraProductRoadmap-programIncrement2'),
    ProgramIncrement3: new Resources.ControlInfo('m-jiraProductRoadmap-programIncrement3'),
    ProgramIncrement4: new Resources.ControlInfo('m-jiraProductRoadmap-programIncrement4'),
    ProgramIncrement5: new Resources.ControlInfo('m-jiraProductRoadmap-programIncrement5'),
    Teams: new Resources.ControlInfo('m-jiraProductRoadmap-teamField'),
    TeamsCustom: new Resources.ControlInfo('m-jiraProductRoadmap-teamFieldCustom'),
    TeamFilter: new Resources.ControlInfo('m-jiraProductRoadmap-teamFilter'),
    ProgramIncrementField: new Resources.ControlInfo('m-jiraProductRoadmap-piField'),
    ProgramIncrementFieldCustom: new Resources.ControlInfo('m-jiraProductRoadmap-piFieldCustom'),
    ProjectsLoadingSpinner: new Resources.ControlInfo('m-jiraProductRoadmap-projects-loading'),
    ProgramIncrementsLoadingSpinner: new Resources.ControlInfo('m-jiraProductRoadmap-programIncrements-loading'),
    WaitingForAuthentication: new Resources.ControlInfo('m-jiraProductRoadmap-waitingForAuthentication'),
    Authenticated: new Resources.ControlInfo('m-jiraProductRoadmap-authenticated'),
    Ok: new Resources.ControlInfo('m-jiraProductRoadmap-ok')
  },
  Modal_JiraBlockingIssue: {
    IssueKey: new Resources.ControlInfo('m-jiraBlockingIssue-issueKey'),
    WaitingForAuthentication: new Resources.ControlInfo('m-jiraBlockingIssue-waitingForAuthentication'),
    Authenticated: new Resources.ControlInfo('m-jiraBlockingIssue-authenticated'),
    Ok: new Resources.ControlInfo('m-jiraBlockingIssue-ok')
  },
  Modal_JiraEpicDependency: {
    IssueKey: new Resources.ControlInfo('m-jiraEpicDependency-issueKey'),
    LinkName: new Resources.ControlInfo('m-jiraEpicDependency-linkName'),
    TeamField: new Resources.ControlInfo('m-jiraEpicDependency-teamField'),
    CustomTeamField: new Resources.ControlInfo('m-jiraEpicDependency-customTeamField'),
    WaitingForAuthentication: new Resources.ControlInfo('m-jiraEpicDependency-waitingForAuthentication'),
    Authenticated: new Resources.ControlInfo('m-jiraEpicDependency-authenticated'),
    Ok: new Resources.ControlInfo('m-jiraEpicDependency-ok')
  },
  Modal_AzureDevOpsFindItem: {
    SelectOperation: new Resources.ControlInfo('m-azureDevOpsFindIssue-selection'),
    BusySpinner: new Resources.ControlInfo('m-azureDevOpsFindIssue-busySpinner'),
    CurrentOrganization: new Resources.ControlInfo('m-azureDevOpsFindIssue-currentOrganization'),
    ProjectName: new Resources.ControlInfo('m-azureDevOpsFindIssue-projectName'),
    OrganizationSelect: new Resources.ControlInfo('m-azureDevOpsFindIssue-organizationSelect'),
    ProjectSelect: new Resources.ControlInfo('m-azureDevOpsFindIssue-projectSelect'),
    TeamSelect: new Resources.ControlInfo('m-azureDevOpsFindIssue-teamSelect'),
    SearchGroup: new Resources.ControlInfo('m-azureDevOpsFindIssue-searchGroup'),
    Search: new Resources.ControlInfo('m-azureDevOpsFindIssue-search'),
    SearchMessage: new Resources.ControlInfo('m-azureDevOpsFindIssue-searchMessage'),
    SearchTypeAdvanced: new Resources.ControlInfo('m-azureDevOpsFindIssue-searchTypeAdvanced'),
    SearchTypeBasic: new Resources.ControlInfo('m-azureDevOpsFindIssue-searchTypeBasic'),
    SearchTypeFilter: new Resources.ControlInfo('m-azureDevOpsFindIssue-searchTypeFilter'),
    BasicSearchOptions: new Resources.ControlInfo('m-azureDevOpsFindIssue-basicSearchOptions'),
    Active: new Resources.ControlInfo('m-azureDevOpsFindIssue-active'),
    CreatedDateFilter: new Resources.ControlInfo('m-azureDevOpsFindIssue-createdDateFilter'),
    WorkItemTypeFilter: new Resources.ControlInfo('m-azureDevOpsFindIssue-workItemTypeFilter'),
    SortGroup: new Resources.ControlInfo('m-azureDevOpsFindIssue-sortGroup'),
    SortField: new Resources.ControlInfo('m-azureDevOpsFindIssue-sortField'),
    SortDirectionAsc: new Resources.ControlInfo('m-azureDevOpsFindIssue-sortDirectionAsc'),
    SortDirectionDesc: new Resources.ControlInfo('m-azureDevOpsFindIssue-sortDirectionDesc'),
    ErrorMessage: new Resources.ControlInfo('m-azureDevOpsFindIssue-errorMessage'),
    SelectedIssueKey: new Resources.ControlInfo('m-azureDevOpsFindIssue-selectedIssueKey'),
    SelectAll: new Resources.ControlInfo('m-azureDevOpsFindIssue-selectAll'),
    ResultsContainer: new Resources.ControlInfo('m-azureDevOpsFindIssue-resultsContainer'),
    ResultsColumnHeaders: new Resources.ControlInfo('m-azureDevOpsFindIssue-headerContainer'),
    ResultsList: new Resources.ControlInfo('m-azureDevOpsFindIssue-resultsList'),
    ProjectsLoadingSpinner: new Resources.ControlInfo('m-azureDevOpsFindIssue-projects-loading'),
    SearchLoadingSpinner: new Resources.ControlInfo('m-azureDevOpsFindIssue-search-loading'),
    FiltersSelect: new Resources.ControlInfo('m-azureDevOpsFindIssue-filterSelect'),
    WaitingForAuthentication: new Resources.ControlInfo('m-azureDevOpsFindIssue-waitingForAuthentication'),
    Authenticated: new Resources.ControlInfo('m-azureDevOpsFindIssue-authenticated'),
    Ok: new Resources.ControlInfo('m-azureDevOpsFindIssue-ok')
  },
  Modal_AzureDevOpsAddItem: {
    ItemId: new Resources.ControlInfo('m-azureDevOpsAddItem-itemId'),
    IssueKeyMoreFieldsControl: new Resources.ControlInfo('m-azureDevOpsAddItem-issueKeyMoreFields'),
    OrganizationSection: new Resources.ControlInfo('m-azureDevOpsAddItem-organizationSection'),
    OrganizationName: new Resources.ControlInfo('m-azureDevOpsAddItem-organizationName'),
    ProjectSection: new Resources.ControlInfo('m-azureDevOpsAddItem-projectSection'),
    ProjectName: new Resources.ControlInfo('m-azureDevOpsAddItem-projectName'),
    ItemTypesSection: new Resources.ControlInfo('m-azureDevOpsAddItem-itemTypesSection'),
    ItemTypes: new Resources.ControlInfo('m-azureDevOpsAddItem-itemTypes'),
    Priorities: new Resources.ControlInfo('m-azureDevOpsAddItem-priorities'),
    Summary: new Resources.ControlInfo('m-azureDevOpsAddItem-summary'),
    Assignee: new Resources.ControlInfo('m-azureDevOpsAddItem-assignee'),
    Header: new Resources.ControlInfo('m-azureDevOpsAddItem-header'),
    ProjectsLoadingSpinner: new Resources.ControlInfo('m-azureDevOpsAddItem-projects-loading'),
    DialogLoadingSpinner: new Resources.ControlInfo('m-azureDevOpsAddItem-dialog-loading'),
    WaitingForAuthentication: new Resources.ControlInfo('m-azureDevOpsAddItem-waitingForAuthentication'),
    Authenticated: new Resources.ControlInfo('m-azureDevOpsAddItem-authenticated'),
    Ok: new Resources.ControlInfo('m-azureDevOpsAddItem-ok')
  },
  Modal_ShowUrl: {
    DisplayUrl: new Resources.ControlInfo('m-showUrl-url')
  },
  Modal_OrgChartVisualizer: {
    ModalDiv: new Resources.ControlInfo('m-orgChartVisualizer'),
    LoadingSpinner: new Resources.ControlInfo('m-orgChartVisualizer-loading'),
    File: new Resources.ControlInfo('m-orgChartVisualizer-file'),
    FileLabelDiv: new Resources.ControlInfo('m-orgChartVisualizer-fileInputLabelDiv'),
    FileLabel: new Resources.ControlInfo('m-orgChartVisualizer-fileInputLabel'),
    ImportDropZone: new Resources.ControlInfo('m-orgChartVisualizer-importDropZone'),
    LoadBtn: new Resources.ControlInfo('m-orgChartVisualizer-loadBtn'),
    SubmitBtn: new Resources.ControlInfo('m-orgChartVisualizer-submitBtn'),
    Title: new Resources.ControlInfo('m-orgChartVisualizer-fileTitle'),
    Error: new Resources.ControlInfo('m-orgChartVisualizer-error'),
    ShapeLimitError: new Resources.ControlInfo('m-orgChartVisualizer-shapeLimitError'),
    Warning: new Resources.ControlInfo('m-orgChartVisualizer-warning'),
    OptionsDiv: new Resources.ControlInfo('m-orgChartVisualizer-loadedFileOptions'),
    DelimiterSelect: new Resources.ControlInfo('m-orgChartVisualizer-delimiterSelect'),
    DelimiterSelectDiv: new Resources.ControlInfo('m-orgChartVisualizer-delimiterSelectDiv'),
    MatchColumnsHeader: new Resources.ControlInfo('m-orgChartVisualizer-matchColumnsHeader'),
    MatchColumnsMessage: new Resources.ControlInfo('m-orgChartVisualizer-matchColumnsMessage'),
    ChooseUsageMessage: new Resources.ControlInfo('m-orgChartVisualizer-chooseUsageMessage'),
    DataSourceSelect: new Resources.ControlInfo('m-orgChartVisualizer-dataSourceSelect'),
    DataSourceSelectActiveDirectory: new Resources.ControlInfo('m-orgChartVisualizer-dataSourceSelect-activeDirectory'),
    DataSourceSelectSharePointList: new Resources.ControlInfo('m-orgChartVisualizer-dataSourceSelect-sharePointList'),
    DataSourceSelectFile: new Resources.ControlInfo('m-orgChartVisualizer-dataSourceSelect-file'),
    ActiveDirectoryDataSource: new Resources.ControlInfo('m-orgChartVisualizer-activeDirectoryDataSource'),
    ActiveDirectoryDataSourceSpinner: new Resources.ControlInfo('m-orgChartVisualizer-activeDirectoryDataSourceSpinner'),
    DataSourceChooseManager: new Resources.ControlInfo('m-orgChartVisualizer-dataSourceChooseManager'),
    DataSourceChooseIdentity: new Resources.ControlInfo('m-orgChartVisualizer-dataSourceChooseIdentity'),
    LocalFileDataSource: new Resources.ControlInfo('m-orgChartVisualizer-localFileDataSource'),
    SharePointListDataSource: new Resources.ControlInfo('m-orgChartVisualizer-sharePointListDataSource'),
    SharePointListDataSourceSpinner: new Resources.ControlInfo('m-orgChartVisualizer-sharePointListDataSourceSpinner'),
    ManagerSelect: new Resources.ControlInfo('m-orgChartVisualizer-managerSelect'),
    IdentitySelect: new Resources.ControlInfo('m-orgChartVisualizer-identitySelect'),
    Diag: new Resources.ControlInfo('m-orgChartVisualizer-diag'),
    LoadedDataResultsDiv: new Resources.ControlInfo('m-orgChartVisualizer-loadedDataResults'),
    SharePointSiteSelect: new Resources.ControlInfo('m-orgChartVisualizer-sharePointSiteSelect'),
    SharePointListSelect: new Resources.ControlInfo('m-orgChartVisualizer-sharePointListSelect')
  },
  Modal_DecisionTreeVisualizer: {
    File: new Resources.ControlInfo('m-decisionTreeVisualizer-file'),
    FileName: new Resources.ControlInfo('m-decisionTreeVisualizer-fileName'),
    FileNameDiv: new Resources.ControlInfo('m-decisionTreeVisualizer-fileNameDiv'),
    ImportDropZone: new Resources.ControlInfo('m-decisionTreeVisualizer-importDropZone'),
    FormatInstructions: new Resources.ControlInfo('m-decisionTreeVisualizer-formatInstructions'),
    BusySpinner: new Resources.ControlInfo('m-decisionTreeVisualizer-busySpinner'),
    Error: new Resources.ControlInfo('m-decisionTreeVisualizer-error'),
    SubmitBtn: new Resources.ControlInfo('m-decisionTreeVisualizer-submitBtn')
  },
  Modal_ErdVisualizer: {
    File: new Resources.ControlInfo('m-erdVisualizer-file'),
    ImportDropZone: new Resources.ControlInfo('m-erdVisualizer-importDropZone'),
    FileNameDiv: new Resources.ControlInfo('m-erdVisualizer-fileNameDiv'),
    FileName: new Resources.ControlInfo('m-erdVisualizer-fileName'),
    FileControls: new Resources.ControlInfo('m-erdVisualizer-fileControls'),
    Exclude: new Resources.ControlInfo('m-erdVisualizer-exclude'),
    TreeOutputOuter: new Resources.ControlInfo('m-erdVisualizer-treeOutputOuter'),
    TreeOutput: new Resources.ControlInfo('m-erdVisualizer-treeOutput'),
    OutputText: new Resources.ControlInfo('m-erdVisualizer-outputText'),
    TreeOptions: new Resources.ControlInfo('m-erdVisualizer-treeOptions'),
    CheckAll: new Resources.ControlInfo('m-erdVisualizer-checkAll'),
    UncheckAll: new Resources.ControlInfo('m-erdVisualizer-uncheckAll'),
    ShowColumns: new Resources.ControlInfo('m-erdVisualizer-showColumns'),
    ShowTypesLbl: new Resources.ControlInfo('m-erdVisualizer-showTypesLbl'),
    ShowTypes: new Resources.ControlInfo('m-erdVisualizer-showTypes'),
    Loading: new Resources.ControlInfo('m-erdVisualizer-loading'),
    Error: new Resources.ControlInfo('m-erdiVsualizer-error'),
    SubmitBtn: new Resources.ControlInfo('m-erdVisualizer-submitBtn')
  },
  Modal_ClassDiagramVisualizer: {
    tabDiv: new Resources.ControlInfo('m-classDiagramVisualizer-filesTab'),
    importDropZone: new Resources.ControlInfo('m-classDiagramVisualizer-importDropZone'),
    output: new Resources.ControlInfo('m-classDiagramVisualizer-lfOutputText'),
    fileDisplayHeader: new Resources.ControlInfo('m-classDiagramVisualizer-fileDisplayHeader'),
    fileList: new Resources.ControlInfo('m-classDiagramVisualizer-lfFiles'),
    excludeClassBtn: new Resources.ControlInfo('m-classDiagramVisualizer-lfClassExclude'),
    fileNameTextDiv: new Resources.ControlInfo('m-classDiagramVisualizer-lfFileNameDiv'),
    fileNameText: new Resources.ControlInfo('m-classDiagramVisualizer-lfFileName'),
    classExcludeOutputDiv: new Resources.ControlInfo('m-classDiagramVisualizer-lfClassExclusionTree'),
    classExclusionTreeOuterDiv: new Resources.ControlInfo('m-classDiagramVisualizer-lfClassExclusionTreeOuter'),
    classExLoading: new Resources.ControlInfo('m-classDiagramVisualizer-lfClassExLoading'),
    ghClassExclude: new Resources.ControlInfo('m-classDiagramVisualizer-ghClassExclude'),
    ghFileExclude: new Resources.ControlInfo('m-classDiagramVisualizer-ghFileExclude'),
    lfClassExclude: new Resources.ControlInfo('m-classDiagramVisualizer-lfClassExclude'),
    classExcludeCheckAllBtn: new Resources.ControlInfo('m-classDiagramVisualizer-lfClassExcludeCheckAll'),
    classExcludeUncheckAllBtn: new Resources.ControlInfo('m-classDiagramVisualizer-lfClassExcludeUncheckAll'),
    ghClassExcludeCheckAll: new Resources.ControlInfo('m-classDiagramVisualizer-ghClassExcludeCheckAll'),
    ghClassExcludeUncheckAll: new Resources.ControlInfo('m-classDiagramVisualizer-ghClassExcludeUncheckAll'),
    options: new Resources.ControlInfo('m-classDiagramVisualizer-options'),
    gHideMethods: new Resources.ControlInfo('m-classDiagramVisualizer-gHideMethods'),
    gHideProperties: new Resources.ControlInfo('m-classDiagramVisualizer-gHideProperties'),
    selectRepo: new Resources.ControlInfo('m-classDiagramVisualizer-selectRepo'),
    localRadio: new Resources.ControlInfo('m-classDiagramVisualizer-local'),
    githubRadio: new Resources.ControlInfo('m-classDiagramVisualizer-github'),
    filesTabBack: new Resources.ControlInfo('m-classDiagramVisualizer-filesTabBack'),
    githubBack: new Resources.ControlInfo('m-classDiagramVisualizer-githubBack'),
    githubAuthBack: new Resources.ControlInfo('m-classDiagramVisualizer-ghAuthenticateBack'),
    githubTab: new Resources.ControlInfo('m-classDiagramVisualizer-githubTab'),
    ghOutput: new Resources.ControlInfo('m-classDiagramVisualizer-ghOutput'),
    githubAuthTab: new Resources.ControlInfo('m-classDiagramVisualizer-githubAuthTab'),
    ghLogoutBtn: new Resources.ControlInfo('m-classDiagramVisualizer-ghLogoutBtn'),
    ghListFilesBtn: new Resources.ControlInfo('m-classDiagramVisualizer-ghListFilesBtn'),
    gEverythingBelowAuthentication: new Resources.ControlInfo('m-classDiagramVisualizer-gEverythingBelowAuthentication'),
    ghUser: new Resources.ControlInfo('m-classDiagramVisualizer-ghUser'),
    ghRepo: new Resources.ControlInfo('m-classDiagramVisualizer-ghRepo'),
    branchInput: new Resources.ControlInfo('m-classDiagramVisualizer-ghBranch'),
    ghAuthOutput: new Resources.ControlInfo('m-classDiagramVisualizer-ghAuthOutput'),
    ghTreeOutput: new Resources.ControlInfo('m-classDiagramVisualizer-ghTreeOutput'),
    ghClassExclusionTree: new Resources.ControlInfo('m-classDiagramVisualizer-ghClassExclusionTree'),
    ghTreeOutputOuter: new Resources.ControlInfo('m-classDiagramVisualizer-ghTreeOutputOuter'),
    ghTreeLoading: new Resources.ControlInfo('m-classDiagramVisualizer-ghTreeLoading'),
    ghClassExclusionTreeOuter: new Resources.ControlInfo('m-classDiagramVisualizer-ghClassExclusionTreeOuter'),
    ghClassExLoading: new Resources.ControlInfo('m-classDiagramVisualizer-ghClassExLoading'),
    ghInputHistorySection: new Resources.ControlInfo('m-classDiagramVisualizer-ghInputHistorySection'),
    ghInputHistory: new Resources.ControlInfo('m-classDiagramVisualizer-ghInputHistory'),
    ghAuthenticateBtn: new Resources.ControlInfo('m-classDiagramVisualizer-ghAuthenticateBtn'),
    SubmitBtn: new Resources.ControlInfo('m-classDiagramVisualizer-submitBtn')
  },
  Modal_MSTeamsVisualizer: {
    DataSourceSelect: new Resources.ControlInfo('m-msTeamsVisualizer-dataSourceSelect'),
    LoadTeamsInfoBtn: new Resources.ControlInfo('m-msTeamsVisualizer-loadTeamsInfoBtn'),
    ActiveDirectoryDataSource: new Resources.ControlInfo('m-msTeamsVisualizer-activeDirectoryDataSource'),
    GatheringDataSpinner: new Resources.ControlInfo('m-msTeamsVisualizer-gatheringDataSpinner'),
    TeamsGatheringDataMessage: new Resources.ControlInfo('m-msTeamsVisualizer-teamsGatheringDataMessage'),
    TeamsDataGatheredMessage: new Resources.ControlInfo('m-msTeamsVisualizer-teamsDataGatheredMessage'),
    ActiveDirectoryDataSource: new Resources.ControlInfo('m-msTeamsVisualizer-teamsDataGatheredMessage'),
    Warning: new Resources.ControlInfo('m-msTeamsVisualizer-warning'),
    Error: new Resources.ControlInfo('m-msTeamsVisualizer-error'),
    SubmitBtn: new Resources.ControlInfo('m-msTeamsVisualizer-submitBtn')
  },
  Modal_UmlSequenceVisualizer: {
    File: new Resources.ControlInfo('m-umlSequenceVisualizer-file'),
    FileNameDiv: new Resources.ControlInfo('m-umlSequenceVisualizer-fileNameDiv'),
    FileName: new Resources.ControlInfo('m-umlSequenceVisualizer-fileName'),
    ImportDropZone: new Resources.ControlInfo('m-umlSequenceVisualizer-importDropZone'),
    BusySpinner: new Resources.ControlInfo('m-umlSequenceVisualizer-busySpinner'),
    Error: new Resources.ControlInfo('m-umlSequenceVisualizer-error'),
    SubmitBtn: new Resources.ControlInfo('m-umlSequenceVisualizer-submitBtn')
  },
  Modal_UmlStateVisualizer: {
    File: new Resources.ControlInfo('m-umlStateVisualizer-file'),
    FileNameDiv: new Resources.ControlInfo('m-umlStateVisualizer-fileNameDiv'),
    FileName: new Resources.ControlInfo('m-umlStateVisualizer-fileName'),
    ImportDropZone: new Resources.ControlInfo('m-umlStateVisualizer-importDropZone'),
    BusySpinner: new Resources.ControlInfo('m-umlStateVisualizer-busySpinner'),
    Error: new Resources.ControlInfo('m-umlStateVisualizer-error'),
    SubmitBtn: new Resources.ControlInfo('m-umlStateVisualizer-submitBtn')
  },
  Modal_JiraReportVisualizer: {
    PiBoard: new Resources.ControlInfo('m-jiraReportVisualizer-piBoard'),
    ProductRoadmap: new Resources.ControlInfo('m-jiraReportVisualizer-productRoadmap'),
    EpicDependency: new Resources.ControlInfo('m-jiraReportVisualizer-epicDependency'),
    BlockingIssue: new Resources.ControlInfo('m-jiraReportVisualizer-blockingIssue'),
    SubmitBtn: new Resources.ControlInfo('m-jiraReportVisualizer-submitBtn')
  },
  Modal_CustomSymbolLibraryName: {
    Text: new Resources.ControlInfo('m-customSymbolLibraryName-text'),
    Description: new Resources.ControlInfo('m-customSymbolLibraryName-description'),
    SiteWide: new Resources.ControlInfo('m-customSymbolLibraryName-siteWide'),
    SiteWideGroup: new Resources.ControlInfo('m-customSymbolLibraryName-siteWideGroup'),
    Ok: new Resources.ControlInfo('m-customSymbolLibraryName-ok')
  },
  Modal_LineThicknessDialog: {
    Title: new Resources.ControlInfo('m-linethickness-title'),
    Preview: new Resources.ControlInfo('m-linethickness-preview'),
    CustomLineThickness: new Resources.ControlInfo('m-linethickness-custom'),
    UnitsLabel: new Resources.ControlInfo('m-linethickness-units'),
    PresetsInches: new Resources.ControlInfo('m-linethickness-presets-inches'),
    PresetsFeet: new Resources.ControlInfo('m-linethickness-presets-feet'),
    PresetsLineFeet: new Resources.ControlInfo('m-linethickness-presets-line-feet'),
    PresetsMillimeters: new Resources.ControlInfo('m-linethickness-presets-millimeters'),
    PresetsLineMillimeters: new Resources.ControlInfo('m-linethickness-presets-line-millimeters'),
    PresetsCentimeters: new Resources.ControlInfo('m-linethickness-presets-centimeters'),
    PresetsLineCentimeters: new Resources.ControlInfo('m-linethickness-presets-line-centimeters'),
    PresetsMeters: new Resources.ControlInfo('m-linethickness-presets-meters'),
    PresetsLineMeters: new Resources.ControlInfo('m-linethickness-presets-line-meters')
  },
  Modal_Export: {
    DownloadLink: new Resources.ControlInfo('m-export-download'),
    PrintLink: new Resources.ControlInfo('m-export-print'),
    ProgressLabel: new Resources.ControlInfo('m-export-progressLabel'),
    FormatLabel: new Resources.ControlInfo('m-export-formatLabel'),
    ProgressBar: new Resources.ControlInfo('m-export-progressBar'),
    DownloadReadyDiv: new Resources.ControlInfo('m-export-downloadReadyDiv'),
    PrintReadyDiv: new Resources.ControlInfo('m-export-printReadyDiv'),
    ErrorDiv: new Resources.ControlInfo('m-export-errorDiv')
  },
  Modal_LoginSignup: {
    IFrame: new Resources.ControlInfo('m-loginSignup-iFrame')
  },
  Modal_ConfluenceContactInfo: {
    IFrame: new Resources.ControlInfo('m-confluencecontactinfo-iFrame')
  },
  Modal_FreezeProp: {
    FreezeFillColor: new Resources.ControlInfo('m-freezeProp-fillColor'),
    FreezeFillTexture: new Resources.ControlInfo('m-freezeProp-fillTexture'),
    FreezeShadowsGlow: new Resources.ControlInfo('m-freezeProp-shadowsGlow'),
    FreezeEffects: new Resources.ControlInfo('m-freezeProp-effects'),
    FreezeTextProp: new Resources.ControlInfo('m-freezeProp-textProp'),
    FreezeLineBorderColor: new Resources.ControlInfo('m-freezeProp-lineBorderColor'),
    FreezeLineBorderThickness: new Resources.ControlInfo('m-freezeProp-lineBorderThickness'),
    FreezeLineBorderPattern: new Resources.ControlInfo('m-freezeProp-lineBorderPattern'),
    FreezeArrowheads: new Resources.ControlInfo('m-freezeProp-arrowheads'),
    FreezeStyles: new Resources.ControlInfo('m-freezeProp-styles'),
    FreezeSize: new Resources.ControlInfo('m-freezeProp-size')
  },
  Modal_MobileText: {
    MobileText: new Resources.ControlInfo('m-mobiletext-text'),
    Clear: new Resources.ControlInfo('m-mobiletext-clear')
  },
  Modal_InsertBitmap: {
    AddBitmap: new Resources.ControlInfo('m-insertbitmap-add'),
    ReplaceBitmap: new Resources.ControlInfo('m-insertbitmap-replace'),
    CancelBitmap: new Resources.ControlInfo('m-insertbitmap-cancel')
  },
  Modal_Hint_AutoSave: {
    Hide: new Resources.ControlInfo('m-hint-autosave-hide'),
    Action: new Resources.ControlInfo('m-hint-autosave-action'),
    DocName: new Resources.ControlInfo('m-hint-autosave-docName')
  },
  Modal_Hint_Anonymous: {
    Action: new Resources.ControlInfo('m-hint-autosave-action')
  },
  Modal_Hint_Metric: {
    Hide: new Resources.ControlInfo('m-hint-metric-hide'),
    Action: new Resources.ControlInfo('m-hint-metric-action')
  },
  Modal_Hint_ReadOnly: {
    Hide: new Resources.ControlInfo('m-hint-readonly-hide'),
    Action: new Resources.ControlInfo('m-hint-readonly-action')
  },
  Modal_Hint_MobileReadOnly: {
    Hide: new Resources.ControlInfo('m-hint-mobilereadonly-hide'),
    Action: new Resources.ControlInfo('m-hint-mobilereadonly-action')
  },
  Modal_MessageBox: {
    Message: new Resources.ControlInfo('m-messagebox-message'),
    OK: new Resources.ControlInfo('m-messagebox-ok'),
    Cancel: new Resources.ControlInfo('m-messagebox-cancel')
  },
  Modal_MessageBoxNoPrint: {
    Message: new Resources.ControlInfo('m-messageboxNoPrint-message'),
    OK: new Resources.ControlInfo('m-messageboxNoPrint-ok'),
    Cancel: new Resources.ControlInfo('m-messageboxNoPrint-cancel')
  },
  Modal_ExportOffice: {
    DownloadLink: new Resources.ControlInfo('m-exportOffice-download'),
    ClipboardTarget: new Resources.ControlInfo('m-exportOffice-clipboardTarget'),
    CopyLink: new Resources.ControlInfo('m-exportOffice-copy'),
    ProgressLabel: new Resources.ControlInfo('m-exportOffice-progressLabel'),
    ProgressBar: new Resources.ControlInfo('m-exportOffice-progressBar'),
    CopyReadyDiv: new Resources.ControlInfo('m-exportOffice-copyReadyDiv'),
    ErrorDiv: new Resources.ControlInfo('m-exportOffice-errorDiv')
  },
  Modal_ManagePages: {
    PageTable: new Resources.ControlInfo('m-managePages-pageTable'),
    MovePageUp: new Resources.ControlInfo('m-managePages-moveUp'),
    MovePageDown: new Resources.ControlInfo('m-managePages-movePageDown'),
    OkPageModal: new Resources.ControlInfo('m-managePages-ok'),
    CancelPageModal: new Resources.ControlInfo('m-managePages-cancel')
  },
  Modal_TemplateDialogIframe: {
    Iframe: new Resources.ControlInfo('m-tdIframe-iFrame')
  },
  Modal_EmbedDialog: {
    FormatToken: new Resources.ControlInfo('m-mEmbedDialog-formatToken'),
    FormatHTML: new Resources.ControlInfo('m-mEmbedDialog-formatHTML'),
    ToolbarAlways: new Resources.ControlInfo('m-mEmbedDialog-toolbarAlways'),
    ToolbarOnRollover: new Resources.ControlInfo('m-mEmbedDialog-toolbarOnRollover'),
    EmbedHTML: new Resources.ControlInfo('m-embedDialog-html'),
    HideForToken: new Resources.ControlInfo('m-mEmbedDialog-hide-for-token'),
    Caption: new Resources.ControlInfo('m-mEmbedDialog-caption'),
    Cancel: new Resources.ControlInfo('m-embedDialog-cancel')
  },
  Modal_CustomSymbolOptions: {
    NameInput: new Resources.ControlInfo('m-customSymbolOptions-nameInput'),
    ColorOptionForm: new Resources.ControlInfo('m-customSymbolOptions-colorOptionForm'),
    ColorOptionAuto: new Resources.ControlInfo('m-customSymbolOptions-colorOptionAuto'),
    ColorOptionKeepCurrent: new Resources.ControlInfo('m-customSymbolOptions-colorOptionKeepCurrent'),
    ProgressBarContainer: new Resources.ControlInfo('m-customSymbolOptions-progressBarContainer'),
    ProgressBar: new Resources.ControlInfo('m-customSymbolOptions-progressBar'),
    ErrorLabel: new Resources.ControlInfo('m-customSymbolOptions-error'),
    OK: new Resources.ControlInfo('m-customSymbolOptions-ok')
  },
  Modal_PluginDialog: {
    ErrorLabel: new Resources.ControlInfo('m-plugin-error'),
    PluginName: new Resources.ControlInfo('m-plugin-name'),
    PluginURL: new Resources.ControlInfo('m-plugin-url'),
    PluginDescription: new Resources.ControlInfo('m-plugin-description'),
    DefaultSettings: new Resources.ControlInfo('m-plugin-settings'),
    NewPlugin: new Resources.ControlInfo('m-plugin-new'),
    SavePlugin: new Resources.ControlInfo('m-plugin-save'),
    DeletePlugin: new Resources.ControlInfo('m-plugin-archive'),
    PluginSelectList: new Resources.ControlInfo('m-plugin-selectPlugin'),
    IFrame: new Resources.ControlInfo('m-plugin-iframe'),
    ShareLink: new Resources.ControlInfo('m-plugin-shareUrl'),
    ShareLinkContainer: new Resources.ControlInfo('m-plugin-shareLinkContainer'),
    DefaultSettingsContainer: new Resources.ControlInfo('m-plugin-settingsContainer'),
    PluginURLContainer: new Resources.ControlInfo('m-plugin-urlContainer'),
    ModalHeader: new Resources.ControlInfo('m-plugin-title'),
    PickerContainer: new Resources.ControlInfo('m-plugin-pickerContainer'),
    DescriptionContainer: new Resources.ControlInfo('m-plugin-descriptionContainer'),
    NameContainer: new Resources.ControlInfo('m-plugin-nameContainer')
  },
  Modal_TrelloSyncMessage: {
    TrelloSyncText: new Resources.ControlInfo('m-trellosync-message'),
    TrelloSyncDiscard: new Resources.ControlInfo('m-trellosync-discard'),
    TrelloSyncKeep: new Resources.ControlInfo('m-trellosync-keep')
  },
  Modal_PluginPrebuiltIframeViewer: {
    TitleText: new Resources.ControlInfo('m-pluginPrebuiltIframeViewer-title'),
    Iframe: new Resources.ControlInfo('m-pluginPrebuiltIframeViewer-iframe')
  },
  Modal_CMSLoginDialog: {
    UserNameInput: new Resources.ControlInfo('m-CMSLoginDialog-userName'),
    UserPasswordInput: new Resources.ControlInfo('m-CMSLoginDialog-userPassword'),
    RememberCredentialsInput: new Resources.ControlInfo('m-CMSLoginDialog-remember'),
    LoginStatusLabel: new Resources.ControlInfo('m-CMSLoginDialog-loginStatus')
  },
  Modal_CMSUpdateSymbol: {
    TitleInput: new Resources.ControlInfo('m-builder-cmsUpdateSymbol-symbolNameInput'),
    SVGPreviewCurrent: new Resources.ControlInfo('m-builder-cmsUpdateSymbol-svgPreviewCurrent'),
    SVGPreviewNew: new Resources.ControlInfo('m-builder-cmsUpdateSymbol-svgPreviewNew'),
    ErrorMessage: new Resources.ControlInfo('m-builder-cmsUpdateSymbol-errorMessage'),
    UpdateNativeRadio: new Resources.ControlInfo('m-builder-cmsUpdateSymbol-updateNative')
  },
  Modal_CMSAddSymbol: {
    TitleInput: new Resources.ControlInfo('m-builder-cmsAddSymbol-symbolName'),
    SVGPreview: new Resources.ControlInfo('m-builder-cmsAddSymbol-svgPreview'),
    ErrorMessage: new Resources.ControlInfo('m-builder-cmsAddSymbol-errorMessage'),
    NativeRadio: new Resources.ControlInfo('m-builder-cmsAddSymbol-nativeRadio')
  },
  Modal_CMSConfirmSymbol: {
    HeaderPar: new Resources.ControlInfo('m-builder-cmsConfirmSymbol-title'),
    BodyPar: new Resources.ControlInfo('m-builder-cmsConfirmSymbol-body'),
    OkayButton: new Resources.ControlInfo('m-builder-cmsConfirmSymbol-yes'),
    CancelButton: new Resources.ControlInfo('m-builder-cmsConfirmSymbol-no')
  },
  Modal_CMSEditSymbol: {
    TitleInput: new Resources.ControlInfo('m-builder-cmsEditSymbol-symbolName'),
    ErrorMessage: new Resources.ControlInfo('m-builder-cmsEditSymbol-errorMessage'),
    SizingRulerRadio: new Resources.ControlInfo('m-builder-cmsEditSymbol-sizingOption'),
    SizingWidthInput: new Resources.ControlInfo('m-builder-cmsEditSymbol-sizingWidth'),
    SizingHeightInput: new Resources.ControlInfo('m-builder-cmsEditSymbol-sizingHeight'),
    SizingUnitsSelect: new Resources.ControlInfo('m-builder-cmsEditSymbol-sizingUnits'),
    SizingWidthMetricInput: new Resources.ControlInfo('m-builder-cmsEditSymbol-sizingWidthMetric'),
    SizingHeightMetricInput: new Resources.ControlInfo('m-builder-cmsEditSymbol-sizingHeightMetric'),
    SizingUnitsMetricSelect: new Resources.ControlInfo('m-builder-cmsEditSymbol-sizingUnitsMetric'),
    NativeColorRadio: new Resources.ControlInfo('m-builder-cmsEditSymbol-nativeColorOptions'),
    SVGImageRadio: new Resources.ControlInfo('m-builder-cmsEditSymbol-svgImageOption'),
    SVGOptionDiv: new Resources.ControlInfo('m-builder-cmsEditSymbol-svgOptionDiv'),
    SVGOptionGrowSelect: new Resources.ControlInfo('m-builder-cmsEditSymbol-svgOptionGrow'),
    SVGOptionTextSelect: new Resources.ControlInfo('m-builder-cmsEditSymbol-svgOptionText')
  },
  Modal_TimelineImport: {
    ModalDiv: new Resources.ControlInfo('m-timelineVisualizer'),
    StylingHeader: new Resources.ControlInfo('m-timelineVisualizer-stylingTitle'),
    StylingDiv: new Resources.ControlInfo('visualizer-timeline-styling-options'),
    EventOptions: new Resources.ControlInfo('visualizer-timeline-styling-events'),
    EventType: new Resources.ControlInfo('visualizer-timeline-eventType-select'),
    EventPosition: new Resources.ControlInfo('visualizer-timeline-eventPosition-select'),
    DateOptions: new Resources.ControlInfo('visualizer-timeline-dateOptions'),
    DateManual: new Resources.ControlInfo('visualizer-timeline-timeframe-manualSelect'),
    DateFrom: new Resources.ControlInfo('visualizer-timeline-datepickerFrom'),
    DateTo: new Resources.ControlInfo('visualizer-timeline-datepickerTo'),
    UnitsSelect: new Resources.ControlInfo('visualizer-timeline-timeframe-units'),
    DateAuto: new Resources.ControlInfo('visualizer-timeline-datepickerAuto'),
    DataSource: new Resources.ControlInfo('m-timelineVisualizer-dataSource'),
    ImportDropZone: new Resources.ControlInfo('m-timelineVisualizer-importDropZone'),
    File: new Resources.ControlInfo('m-timelineVisualizer-file'),
    FileLabelDiv: new Resources.ControlInfo('m-timelineVisualizer-fileInputLabelDiv'),
    FileLabel: new Resources.ControlInfo('m-timelineVisualizer-fileInputLabel'),
    Error: new Resources.ControlInfo('m-timelineVisualizer-error'),
    MatchColumnsHeader: new Resources.ControlInfo('m-timelineVisualizer-matchColumnsHeader'),
    DelimiterSelectDiv: new Resources.ControlInfo('m-timelineVisualizer-delimiterSelectDiv'),
    DelimiterSelect: new Resources.ControlInfo('m-timelineVisualizer-delimiterSelect'),
    DateFormatDiv: new Resources.ControlInfo('m-timelineVisualizer-dateFormatDiv'),
    DateFormat: new Resources.ControlInfo('m-timelineVisualizer-dateFormat'),
    MatchColumnsMessage: new Resources.ControlInfo('m-timelineVisualizer-matchColumnsMessage'),
    Warning: new Resources.ControlInfo('m-timelineVisualizer-warning'),
    LoadedDataResultsDiv: new Resources.ControlInfo('m-timelineVisualizer-loadedDataResults'),
    Title: new Resources.ControlInfo('m-timelineVisualizer-fileTitle'),
    OptionsDiv: new Resources.ControlInfo('m-timelineVisualizer-loadedFileOptions'),
    SubmitBtn: new Resources.ControlInfo('m-timelineVisualizer-submitBtn')
  },
  Modal_TimelineEventPicker: {
    EventTitle: new Resources.ControlInfo('m-eventPicker-title'),
    StartDate: new Resources.ControlInfo('m-eventPicker-datepickerStart'),
    Note: new Resources.ControlInfo('m-eventPicker-note'),
    Position: new Resources.ControlInfo('m-eventPicker-position'),
    Type: new Resources.ControlInfo('m-eventPicker-type'),
    SubmitBtn: new Resources.ControlInfo('m-eventPicker-ok'),
    Error: new Resources.ControlInfo('m-eventPicker-error')
  },
  Modal_TimelineRangeSelect: {
    StartDate: new Resources.ControlInfo('m-timelineRangeSelect-datepickerStart'),
    EndDate: new Resources.ControlInfo('m-timelineRangeSelect-datepickerEnd'),
    UnitsSelect: new Resources.ControlInfo('m-timelineRangeSelect-units'),
    SubmitBtn: new Resources.ControlInfo('m-timelineRangeSelect-ok'),
    Warning: new Resources.ControlInfo('m-timelineRangeSelect-warning')
  },
  ToolPalettes: {
    Flowchart: new Resources.ControlInfo('tp-flowchart_tools'),
    ConnectorFormat: new Resources.ControlInfo('tp-connector_format'),
    RecentSymbols: new Resources.ControlInfo('tp-recentsymbols'),
    AddWall: new Resources.ControlInfo('tp-add_wall'),
    AdjustWall: new Resources.ControlInfo('tp-adjust_wall'),
    AWSImport: new Resources.ControlInfo('tp-aws_import'),
    AzureImport: new Resources.ControlInfo('tp-azure_import'),
    BPMNChoreography: new Resources.ControlInfo('tp-bpmn_choreography'),
    BPMNData: new Resources.ControlInfo('tp-bpmn_data'),
    BPMNEvents: new Resources.ControlInfo('tp-bpmn_events'),
    BPMNGateway: new Resources.ControlInfo('tp-bpmn_gateway'),
    BPMNLine: new Resources.ControlInfo('tp-bpmn_line'),
    BPMNPool: new Resources.ControlInfo('tp-bpmn_pool'),
    BPMNTasks: new Resources.ControlInfo('tp-bpmn_tasks'),
    CauseEffectBuild: new Resources.ControlInfo('tp-causeeffect_build'),
    CauseEffectChartLayout: new Resources.ControlInfo('tp-causeeffect_chart_layout'),
    CertificateEdit: new Resources.ControlInfo('tp-certificate_edit'),
    Graph: new Resources.ControlInfo('tp-graph'),
    ChartLayout: new Resources.ControlInfo('tp-chart_layout'),
    ContainerFormat: new Resources.ControlInfo('tp-container_format'),
    ContainerTable: new Resources.ControlInfo('tp-container_table'),
    DecisionTreeChartLayout: new Resources.ControlInfo('tp-decisiontree_chart_layout'),
    DecisionTreeImportExport: new Resources.ControlInfo('tp-decisiontree_importexport'),
    DimensionsArea: new Resources.ControlInfo('tp-dimensions_area'),
    DocumentSetup: new Resources.ControlInfo('tp-document_setup'),
    EcomapBuild: new Resources.ControlInfo('tp-ecomap_build'),
    EmployeeProperties: new Resources.ControlInfo('tp-employee_properties'),
    ERDLine: new Resources.ControlInfo('tp-erd_line'),
    ERDImport: new Resources.ControlInfo('tp-erd_import'),
    FamilyTreeBuild: new Resources.ControlInfo('tp-familytree_build'),
    Gauge: new Resources.ControlInfo('tp-gauge'),
    Jira: new Resources.ControlInfo('tp-jira'),
    JiraBlockingIssue: new Resources.ControlInfo('tp-jira_blocking_issue'),
    JiraEpicDependency: new Resources.ControlInfo('tp-jira_epic_dependency'),
    JiraProductRoadmap: new Resources.ControlInfo('tp-jira_product_roadmap'),
    JiraPIBoard: new Resources.ControlInfo('tp-jira_piboard'),
    AzureDevOps: new Resources.ControlInfo('tp-azure_devops'),
    LineDrawFormat: new Resources.ControlInfo('tp-linedraw_format'),
    Lines: new Resources.ControlInfo('tp-lines'),
    MindMapChartLayout: new Resources.ControlInfo('tp-mindmap_chart_layout'),
    MindMapEdit: new Resources.ControlInfo('tp-mindmap_edit'),
    TaskMapEdit: new Resources.ControlInfo('tp-taskmap_edit'),
    MindMapImportExport: new Resources.ControlInfo('tp-mindmap_importexport'),
    MindMapShapeLayout: new Resources.ControlInfo('tp-mindmap_shape_layout'),
    Options: new Resources.ControlInfo('tp-options'),
    OrgChartAddShapes: new Resources.ControlInfo('tp-orgchart_addshapes'),
    OrgChartChartLayout: new Resources.ControlInfo('tp-orgchart_chartlayout'),
    OrgChartImportExport: new Resources.ControlInfo('tp-orgchart_importexport'),
    OrgChartLayout: new Resources.ControlInfo('tp-orgchart_layout'),
    OrgChartTools: new Resources.ControlInfo('tp-orgchart_tools'),
    PedigreeChartBuild: new Resources.ControlInfo('tp-pedigreechart_build'),
    ProjectChartProject: new Resources.ControlInfo('tp-projectchart_project'),
    ProjectChartTaskProperties: new Resources.ControlInfo('tp-projectchart_task_properties'),
    ProjectChartTaskMilestones: new Resources.ControlInfo('tp-projectchart_tasks_milestones'),
    SplitPath: new Resources.ControlInfo('tp-split_path'),
    StepChartHorizontal: new Resources.ControlInfo('tp-stepchart_horizontal'),
    StepChartVertical: new Resources.ControlInfo('tp-stepchart_vertical'),
    SubCharts: new Resources.ControlInfo('tp-sub_charts'),
    SubMap: new Resources.ControlInfo('tp-sub_map'),
    SubProcess: new Resources.ControlInfo('tp-sub_process'),
    SwimLane: new Resources.ControlInfo('tp-swim_lane'),
    TimelineStyle: new Resources.ControlInfo('tp-timeline_style'),
    TimelineImportExport: new Resources.ControlInfo('tp-timeline_importexport'),
    TimelineEvents: new Resources.ControlInfo('tp-timeline_events'),
    Table: new Resources.ControlInfo('tp-table'),
    TableBuild: new Resources.ControlInfo('tp-table_build'),
    UMLImport: new Resources.ControlInfo('tp-uml_import'),
    UMLLines: new Resources.ControlInfo('tp-uml_lines'),
    UMLClassImport: new Resources.ControlInfo('tp-umlclass_import'),
    UMLClassLine: new Resources.ControlInfo('tp-umlclass_line'),
    UMLComponentLine: new Resources.ControlInfo('tp-umlcomponent_line'),
    WireframeUIElement: new Resources.ControlInfo('tp-wireframe_ui_element'),
    WireframeUIFormat: new Resources.ControlInfo('tp-wireframe_ui_format')
  },
  ToolPalettes_OrgChart_Layout: {
    BoxSimple: new Resources.ControlInfo('tp-orgchart_layout-boxSimple'),
    BoxSplit: new Resources.ControlInfo('tp-orgchart_layout-boxSplit'),
    BoxPict: new Resources.ControlInfo('tp-orgchart_layout-boxPict'),
    BoxSplitPict: new Resources.ControlInfo('tp-orgchart_layout-boxPictSplit')
  },
  ToolPalettes_OrgChart_Tools: {
    DrawDottedLine: new Resources.ControlInfo('tp-orgchart_tools-drawDottedLine')
  },
  ToolPalettes_AddWall: {
    AddWall: new Resources.ControlInfo('tp-add_wall-addWall')
  },
  ToolPalettes_AdjustWall: {
    WallThickness: new Resources.ControlInfo('tp-adjust_wall-thickness')
  },
  ToolPalettes_DimensionsArea: {
    ShowDimensions: new Resources.ControlInfo('tp-dimensions_area-showDimensions')
  },
  ToolPalettes_ConnectorFormat: {
    AutoGroup: new Resources.ControlInfo('tp-connector_format-autoGroup'),
    AutoSelect: new Resources.ControlInfo('tp-connector_format-autoSelect'),
    ActionButton: new Resources.ControlInfo('tp-connector_format-actionBtn'),
    CtrlArrow: new Resources.ControlInfo('tp-connector_format-ctrlArrow'),
    VerticalSpacing: new Resources.ControlInfo('tp-connector_format-verticalSpacing'),
    HorizontalSpacing: new Resources.ControlInfo('tp-connector_format-horizontalSpacing')
  },
  ToolPalettes_MindMapShapeLayout: {
    BlankBox: new Resources.ControlInfo('tp-mindmap_shape_layout-blankBox'),
    TwoSplitBox: new Resources.ControlInfo('tp-mindmap_shape_layout-twoSplitBox'),
    ThreeSplitBox: new Resources.ControlInfo('tp-mindmap_shape_layout-threeSplitBox')
  },
  ToolPalettes_TaskMapEdit: {
    CreateTrelloCard: new Resources.ControlInfo('tp-taskmap_edit-createTrelloCard')
  },
  ToolPalettes_MindMapChartLayout: {
    ViewasProjectChart: new Resources.ControlInfo('tp-mindmap_chart_layoutchangeView')
  },
  ToolPalettes_ProjectChartTaskProperties: {
    CreateTrelloCard: new Resources.ControlInfo('tp-projectchart_task_properties-createTrelloCard')
  },
  ToolPalettes_ProjectChartProject: {
    ViewasMindmap: new Resources.ControlInfo('tp-projectchart_project-projectSwitch')
  },
  ToolPalettes_LineDrawFormat: {
    ActionBtn: new Resources.ControlInfo('tp-linedraw_format-actionBtn')
  },
  ToolPalettes_Swimlanes: {
    Lanes: new Resources.ControlInfo('tp-swim_lane-lanes'),
    VerticalLanes: new Resources.ControlInfo('tp-swim_lane-verticalLanes'),
    HorizontalLanes: new Resources.ControlInfo('tp-swim_lane-horizontalLanes'),
    LanesInput: new Resources.ControlInfo('tp-swim_lane-lanesInput'),
    VerticalLanesInput: new Resources.ControlInfo('tp-swim_lane-verticalLanesInput'),
    HorizontalLanesInput: new Resources.ControlInfo('tp-swim_lane-horizontalLanesInput')
  },
  ToolPalettes_Options: {
    AllowLinesToLink: new Resources.ControlInfo('tp-options-allowLinesToLink'),
    AllowLinesToJoin: new Resources.ControlInfo('tp-options-allowLinesToJoin')
  },
  ToolPalettes_WireframeUIElement: {
    Label: new Resources.ControlInfo('tp-wireframe_ui_element-label'),
    Insert: new Resources.ControlInfo('tp-wireframe_ui_element-insert'),
    Remove: new Resources.ControlInfo('tp-wireframe_ui_element-remove')
  },
  ToolPalettes_WireframeUIFormat: {
    AddIcon: new Resources.ControlInfo('tp-wireframe_ui_format-addIcon'),
    AddSeparator: new Resources.ControlInfo('tp-wireframe_ui_format-addSeparator'),
    ToggleEnable: new Resources.ControlInfo('tp-wireframe_ui_format-toggleEnable')
  },
  ToolPalettes_ContainerFormat: {
    ActionButton: new Resources.ControlInfo('tp-container_format-actionBtn'),
    CtrlArrow: new Resources.ControlInfo('tp-container_format-ctrlArrow')
  },
  ToolPalettes_ContainerTable: {
    AddRow: new Resources.ControlInfo('tp-container_table-addRow'),
    DeleteRow: new Resources.ControlInfo('tp-container_table-delRow'),
    AddColumn: new Resources.ControlInfo('tp-container_table-addColumn'),
    DeleteColumn: new Resources.ControlInfo('tp-container_table-delColumn')
  },
  ToolPalettes_ERDLine: {
    Arrowheads: new Resources.ControlInfo('tp-erd_line-arrowright'),
    Multiplicity: new Resources.ControlInfo('tp-erd_line-mult')
  },
  ToolPalettes_BPMNLine: {
    LineStyle: new Resources.ControlInfo('tp-bpmn_line-linestyle'),
    Reverse: new Resources.ControlInfo('tp-bpmn_line-reverse')
  },
  ToolPalettes_UMLLine: {
    LineStyle: new Resources.ControlInfo('tp-uml_lines_umlstyle'),
    Reverse: new Resources.ControlInfo('tp-uml_lines_reverse')
  },
  ToolPalettes_UMLClassLine: {
    LineStyle: new Resources.ControlInfo('tp-umlclass_line_classstyle'),
    Reverse: new Resources.ControlInfo('tp-umlclass_line_reverse'),
    Multiplicity: new Resources.ControlInfo('tp-umlclass_line_mult')
  },
  ToolPalettes_UMLComponentLine: {
    InterfaceStyle: new Resources.ControlInfo('tp-umlcomponent_line_interfacestyle'),
    ClassStyle: new Resources.ControlInfo('tp-umlcomponent_line_classstyle'),
    Reverse: new Resources.ControlInfo('tp-umlcomponent_line_reverse'),
    Multiplicity: new Resources.ControlInfo('tp-umlcomponent_line_mult')
  },
  ToolPalettes_BPMNTasks: {
    ActivityType: new Resources.ControlInfo('tp-bpmn_tasks-activity-type'),
    TaskType: new Resources.ControlInfo('tp-bpmn_tasks-task-type'),
    ActivityMarker: new Resources.ControlInfo('tp-bpmn_tasks-activity-marker')
  },
  ToolPalettes_BPMNEvents: {
    EventType: new Resources.ControlInfo('tp-bpmn_events-event-type'),
    EventTrigger: new Resources.ControlInfo('tp-bpmn_events-event-trigger')
  },
  ToolPalettes_BPMNGateway: {
    GatewayType: new Resources.ControlInfo('tp-bpmn_gateway-gateway-type')
  },
  ToolPalettes_BPMNData: {
    DataType: new Resources.ControlInfo('tp-bpmn_data-data-type')
  },
  ToolPalettes_BPMNChoreography: {
    ChoreoType: new Resources.ControlInfo('tp-bpmn_choreography-type'),
    ChoreoMarker: new Resources.ControlInfo('tp-bpmn_choreography-marker'),
    ChoreoAdd: new Resources.ControlInfo('tp-bpmn_choreography-addparticipant'),
    ChoreoRemove: new Resources.ControlInfo('tp-bpmn_choreography-removeparticipant')
  },
  ToolPalettes_BPMNPool: {
    AddLane: new Resources.ControlInfo('tp-bpmn_pool-addlane'),
    RemoveLane: new Resources.ControlInfo('tp-bpmn_pool-removelane')
  },
  ToolPalettes_SubProcess: {
    Sub: new Resources.ControlInfo('tp-sub_process-createSubProcess')
  },
  ToolPalettes_SubCharts: {
    Sub: new Resources.ControlInfo('tp-sub_charts-createSubProcess')
  },
  ToolPalettes_SubMap: {
    Sub: new Resources.ControlInfo('tp-sub_map-createSubProcess')
  },
  ToolPalettes_UMLImport: {
    Import: new Resources.ControlInfo('tp-uml-file')
  },
  SmartPanels: {
    LeftPanel: new Resources.ControlInfo('leftpanel'),
    SmartPanelContainer: new Resources.ControlInfo('sp-container'),
    ToolPaletteContainer: new Resources.ControlInfo('sp-controlsContainer'),
    SmartPanel: new Resources.ControlInfo('sp-smartpanel'),
    SmartPanel2: new Resources.ControlInfo('sp-smartpanel2'),
    SmartPanel3: new Resources.ControlInfo('sp-smartpanel3'),
    SmartPanel4: new Resources.ControlInfo('sp-smartpanel4'),
    SymbolLibrary: new Resources.ControlInfo('sp-symbolLib'),
    GutterPanel: new Resources.ControlInfo('sp-gutterPanel'),
    DataPanelContainer: new Resources.ControlInfo('df-panel'),
    CommentContainer: new Resources.ControlInfo('sp-comment-leftpanel'),
    InsertContainer: new Resources.ControlInfo('sp-insert'),
    SymbolSearchContainer: new Resources.ControlInfo('sp-symbol-search-panel'),
    ControlsContainer: new Resources.ControlInfo('sp-controlsContainer'),
    Flowchart: new Resources.ControlInfo('sp-flowcharts'),
    Orgchart: new Resources.ControlInfo('sp-org_charts'),
    Hubs: new Resources.ControlInfo('sp-hubs'),
    Engineering: new Resources.ControlInfo('sp-engineering'),
    CauseandEffect: new Resources.ControlInfo('sp-cause_and_effect'),
    AWS: new Resources.ControlInfo('sp-aws'),
    Azure: new Resources.ControlInfo('sp-azure'),
    AccidentReconstruction: new Resources.ControlInfo('sp-accident_reconstruction'),
    ActivityNetwork: new Resources.ControlInfo('sp-activity_networks'),
    AffinityDiagram: new Resources.ControlInfo('sp-affinity_diagram'),
    Assignment: new Resources.ControlInfo('sp-assignment'),
    AuthorityMatrix: new Resources.ControlInfo('sp-authority_matrix'),
    BalancedScorecard: new Resources.ControlInfo('sp-balanced_scorecard'),
    BasicMatrix: new Resources.ControlInfo('sp-basic_matrix'),
    Basics: new Resources.ControlInfo('sp-basics'),
    BCGMatrix: new Resources.ControlInfo('sp-bcg_matrix'),
    BlankSmartPanel: new Resources.ControlInfo('sp-blank_smartpanel'),
    Blueprint: new Resources.ControlInfo('sp-blueprint'),
    BPMN: new Resources.ControlInfo('sp-bpmn'),
    Certificate: new Resources.ControlInfo('sp-certificates'),
    Charts: new Resources.ControlInfo('sp-charts'),
    Class: new Resources.ControlInfo('sp-class'),
    CrimeScene: new Resources.ControlInfo('sp-crime_scenes_floorplan'),
    CycleDiagram: new Resources.ControlInfo('sp-cycle_diagram'),
    DecisionTree: new Resources.ControlInfo('sp-decision_trees'),
    DeploymentChart: new Resources.ControlInfo('sp-deployment_charts'),
    DescendantTree: new Resources.ControlInfo('sp-descendant_trees'),
    Ecomap: new Resources.ControlInfo('sp-ecomaps'),
    Elevation: new Resources.ControlInfo('sp-elevations'),
    ERD: new Resources.ControlInfo('sp-erd'),
    FeatureComparison: new Resources.ControlInfo('sp-feature_comparison_charts'),
    Flyer: new Resources.ControlInfo('sp-flyers'),
    FormDesign: new Resources.ControlInfo('sp-form_design'),
    Forms: new Resources.ControlInfo('sp-forms'),
    Genograms: new Resources.ControlInfo('sp-genograms'),
    Gauges: new Resources.ControlInfo('sp-gauges'),
    Hierarchy: new Resources.ControlInfo('sp-hierarchy'),
    HouseofQuality: new Resources.ControlInfo('sp-house_of_quality_matrix'),
    InfluenceDiagram: new Resources.ControlInfo('sp-influence_diagrams'),
    Jira: new Resources.ControlInfo('sp-jira'),
    JiraBlockingIssue: new Resources.ControlInfo('sp-jira_blocking_issue'),
    JiraEpicDependency: new Resources.ControlInfo('sp-jira_epic_dependency'),
    JiraProductRoadmap: new Resources.ControlInfo('sp-jira_product_roadmap'),
    JiraPIBoard: new Resources.ControlInfo('sp-jira_piboard'),
    Kanban: new Resources.ControlInfo('sp-kanban_simple'),
    Landscape: new Resources.ControlInfo('sp-landscape_design'),
    LegacyMap: new Resources.ControlInfo('sp-legacy_maps'),
    LiveMap: new Resources.ControlInfo('sp-live_map'),
    SwimLaneLineDraw: new Resources.ControlInfo('sp-sl_linedraw'),
    LineDraw: new Resources.ControlInfo('sp-linedraw'),
    ManualChart: new Resources.ControlInfo('sp-manual'),
    Map: new Resources.ControlInfo('sp-maps'),
    Matrix: new Resources.ControlInfo('sp-matrices'),
    NetworkDiagram: new Resources.ControlInfo('sp-network_diagrams'),
    NetworkDiagramManual: new Resources.ControlInfo('sp-network-diagram-manual'),
    PedigreeChart: new Resources.ControlInfo('sp-pedigree_charts'),
    Planogram: new Resources.ControlInfo('sp-planograms'),
    ProjectChart: new Resources.ControlInfo('sp-project_chart'),
    ProjectPlanning: new Resources.ControlInfo('sp-mind_maps'),
    PyramidChart: new Resources.ControlInfo('sp-pyramid_charts'),
    RackDiagram: new Resources.ControlInfo('sp-rack_diagrams'),
    ResourceTaskMatrix: new Resources.ControlInfo('sp-resource_and_task_matrix'),
    Roadmap: new Resources.ControlInfo('sp-roadmap'),
    ScienceDiagram: new Resources.ControlInfo('sp-science_diagrams'),
    Sitemap: new Resources.ControlInfo('sp-sitemap'),
    SoftwareDesign: new Resources.ControlInfo('sp-software_design'),
    StepChart: new Resources.ControlInfo('sp-step_charts'),
    StepChartVertical: new Resources.ControlInfo('sp-step_charts_vertical'),
    StorageDesign: new Resources.ControlInfo('sp-storage_design'),
    StrategyMap: new Resources.ControlInfo('sp-strategy_maps'),
    Swimlane: new Resources.ControlInfo('sp-swim_lanes'),
    SWOT: new Resources.ControlInfo('sp-swot_diagram'),
    Table: new Resources.ControlInfo('sp-tables'),
    Timeline: new Resources.ControlInfo('sp-timelines'),
    UML: new Resources.ControlInfo('sp-uml_activity_diagrams'),
    UMLClass: new Resources.ControlInfo('sp-uml_class'),
    UMLComponent: new Resources.ControlInfo('sp-uml_component'),
    UMLDiagram: new Resources.ControlInfo('sp-uml_diagram'),
    VennDiagram: new Resources.ControlInfo('sp-venn_diagrams'),
    WireframeDiagram: new Resources.ControlInfo('sp-wireframe_diagrams'),
    Whiteboarding: new Resources.ControlInfo('sp-whiteboarding'),
    StickyNotes: new Resources.ControlInfo('sp-sticky_notes'),
    WorkflowDiagram: new Resources.ControlInfo('sp-workflow_diagrams'),
    FloorPlan: new Resources.ControlInfo('sp-floor_plans')
  },
  SmartPanel_Common: {
    Tools: new Resources.ControlInfo('sp-smartpanel-toolsSection'),
    ToolsLabel: new Resources.ControlInfo('sp-smartpanel-toolsLabel'),
    Select: new Resources.ControlInfo('sp-smartpanel-select'),
    ShapeTool: new Resources.ControlInfo('sp-smartpanel-shapeTool'),
    LineTool: new Resources.ControlInfo('sp-smartpanel-lineTool'),
    Text: new Resources.ControlInfo('sp-smartpanel-text'),
    WallTool: new Resources.ControlInfo('sp-smartpanel-wallTool'),
    WallToolButtonGroup: new Resources.ControlInfo('sp-smartpanel-wallToolButtonGroup'),
    ShapeToolButtonGroup: new Resources.ControlInfo('sp-smartpanel-shapeToolButtonGroup')
  },
  SmartPanel_Comments: {
    Panel: new Resources.ControlInfo('sp-comment-panel'),
    TextArea: new Resources.ControlInfo('sp-comment-panel-textArea'),
    ThreadContainer: new Resources.ControlInfo('sp-comment-panel-threadContainer'),
    NoCommentsPlaceholder: new Resources.ControlInfo('sp-noCommentsPlaceholder')
  },
  SmartPanel_SymbolSearch: {
    SymbolSearchContainer: new Resources.ControlInfo('sp-symbol-search-panel-container'),
    Close: new Resources.ControlInfo('sp-symbol-search-panel-close'),
    TextArea: new Resources.ControlInfo('sp-symbol-search-panel-textArea'),
    SearchButton: new Resources.ControlInfo('sp-symbolSearch-panel-symbolSearchButton'),
    ClearSearchButton: new Resources.ControlInfo('sp-symbolSearch-panel-clearSearchButton'),
    CombineButton: new Resources.ControlInfo('sp-symbolSearch-panel-toggleCombine'),
    SymbolSearchErrorMessage: new Resources.ControlInfo('sp-symbolSearchErrorMessage'),
    SymbolSearchErrorMessageClose: new Resources.ControlInfo('sp-symbolSearchErrorMessage-close')
  },
  SmartPanel_SymbolLibrary: {
    DropLibraryList: new Resources.ControlInfo('sp-symbolLib-libraryPicker'),
    SymbolLibraryContainer: new Resources.ControlInfo('sp-symbolLib-container'),
    SymbolLibraryGallery: new Resources.ControlInfo('sp-symbolLib-gallery'),
    SymbolLibraryGalleryContainer: new Resources.ControlInfo('sp-symbolLib-galleryContainer'),
    ScrollingSection: new Resources.ControlInfo('sp-symbolLib-scrollingSection'),
    NoLibrariesPlaceholder: new Resources.ControlInfo('sp-noLibrariesPlaceholder')
  },
  SmartPanel_GutterPanel: {
    SmartPanelTab: new Resources.ControlInfo('sp-gutterPanel-displayPanel'),
    DataTab: new Resources.ControlInfo('sp-gutterPanel-displayData'),
    CommentTab: new Resources.ControlInfo('sp-gutterPanel-displayComments'),
    InsertTab: new Resources.ControlInfo('sp-gutterPanel-displayInsert'),
    Help: new Resources.ControlInfo('sp-gutterPanel-help')
  },
  SmartPanel_InsertPanel: {
    DiagramContainer: new Resources.ControlInfo('sp-insert-panel_DiagramList'),
    WhiteboardContainer: new Resources.ControlInfo('sp-insert-panel_WhiteboardList')
  },
  SmartPanel_DataPanel: {
    ParentContainer: new Resources.ControlInfo('df-schema'),
    FieldList: new Resources.ControlInfo('df-schma-fieldlist'),
    FieldListContainer: new Resources.ControlInfo('df-schma-fieldlistcontainer'),
    TableContainer: new Resources.ControlInfo('df-schma-tablecontainer'),
    TableView: new Resources.ControlInfo('df-schma-tableview'),
    TableSelectDropDown: new Resources.ControlInfo('df-schema-tableSelct'),
    TableSelectLabel: new Resources.ControlInfo('df-schema-currentTable'),
    TableSelectMore: new Resources.ControlInfo('df-schema-tableselectmore'),
    EditSchema: new Resources.ControlInfo('df-schema-editSchema'),
    EditData: new Resources.ControlInfo('df-schema-editData'),
    EditTable: new Resources.ControlInfo('df-schema-editTable'),
    RowAdd: new Resources.ControlInfo('df-schema-rowadd'),
    RowDelete: new Resources.ControlInfo('df-schema-rowdel'),
    RowMoveUp: new Resources.ControlInfo('df-schema-rowup'),
    RowMoveDown: new Resources.ControlInfo('df-schema-rowdown'),
    DataRecordAdd: new Resources.ControlInfo('df-data-add-record'),
    DataRecordPrev: new Resources.ControlInfo('df-data-prev-record'),
    DataRecordNext: new Resources.ControlInfo('df-data-next-record'),
    DataRules: new Resources.ControlInfo('df-schema-dataRules'),
    UnlinkShape: new Resources.ControlInfo('df-schema-unlinkShape'),
    DeleteData: new Resources.ControlInfo('df-schema-deleteData'),
    DisplayData: new Resources.ControlInfo('df-schema-shapeDataDisplay'),
    HideDataIcon: new Resources.ControlInfo('df-schema-hideDataIcon'),
    DeleteTable: new Resources.ControlInfo('df-schema-deleteTable'),
    RenameTable: new Resources.ControlInfo('df-schema-renameTable'),
    ExportTable: new Resources.ControlInfo('df-schema-exportTable'),
    ImportTable: new Resources.ControlInfo('df-schema-importTable'),
    UpdateTable: new Resources.ControlInfo('df-schema-updateTable'),
    TableExtendBtn: new Resources.ControlInfo('df-expand-table-button')
  },
  WorkArea: {
    DocumentToolbar: new Resources.ControlInfo('wa-docToolbar'),
    Layers: new Resources.ControlInfo('wa-docToolbar-layerTabs'),
    LayersList: new Resources.ControlInfo('wa-docToolbar-layerList'),
    LayerButton: new Resources.ControlInfo('wa-docToolbar-layerButton'),
    LayerButtonLabel: new Resources.ControlInfo('wa-docToolbar-layerButtonLabel'),
    Coordinates: new Resources.ControlInfo('wa-docToolbar-details'),
    Left: new Resources.ControlInfo('wa-docToolbar-left'),
    LeftValue: new Resources.ControlInfo('wa-docToolbar-leftValue'),
    LeftEdit: new Resources.ControlInfo('wa-docToolbar-leftEdit'),
    Top: new Resources.ControlInfo('wa-docToolbar-top'),
    TopValue: new Resources.ControlInfo('wa-docToolbar-topValue'),
    TopEdit: new Resources.ControlInfo('wa-docToolbar-topEdit'),
    Width: new Resources.ControlInfo('wa-docToolbar-width'),
    WidthValue: new Resources.ControlInfo('wa-docToolbar-widthValue'),
    WidthEdit: new Resources.ControlInfo('wa-docToolbar-widthEdit'),
    Height: new Resources.ControlInfo('wa-docToolbar-height'),
    HeightValue: new Resources.ControlInfo('wa-docToolbar-heightValue'),
    HeightEdit: new Resources.ControlInfo('wa-docToolbar-heightEdit'),
    X: new Resources.ControlInfo('wa-docToolbar-xpos'),
    XValue: new Resources.ControlInfo('wa-docToolbar-xposValue'),
    Y: new Resources.ControlInfo('wa-docToolbar-ypos'),
    YValue: new Resources.ControlInfo('wa-docToolbar-yposValue'),
    SymbolTooltip: new Resources.ControlInfo('symbol-tooltip')
  },
  WA_DocumentToolbar: {
    ShowRulers: new Resources.ControlInfo('wa-docToolbar-showRulers'),
    ShowGrid: new Resources.ControlInfo('wa-docToolbar-showGrid'),
    UseSnaps: new Resources.ControlInfo('wa-docToolbar-useSnaps'),
    SnapsToCenter: new Resources.ControlInfo('wa-docToolbar-snapToCenter'),
    Zoom: new Resources.ControlInfo('wa-docToolbar-zoom'),
    Layers: new Resources.ControlInfo('wa-docToolbar-layerTabs'),
    Coordinates: new Resources.ControlInfo('wa-docToolbar-details'),
    Left: new Resources.ControlInfo('wa-docToolbar-left'),
    LeftValue: new Resources.ControlInfo('wa-docToolbar-leftValue'),
    LeftEdit: new Resources.ControlInfo('wa-docToolbar-leftEdit'),
    Top: new Resources.ControlInfo('wa-docToolbar-top'),
    TopValue: new Resources.ControlInfo('wa-docToolbar-topValue'),
    TopEdit: new Resources.ControlInfo('wa-docToolbar-topEdit'),
    Width: new Resources.ControlInfo('wa-docToolbar-width'),
    WidthValue: new Resources.ControlInfo('wa-docToolbar-widthValue'),
    WidthEdit: new Resources.ControlInfo('wa-docToolbar-widthEdit'),
    Height: new Resources.ControlInfo('wa-docToolbar-height'),
    HeightValue: new Resources.ControlInfo('wa-docToolbar-heightValue'),
    HeightEdit: new Resources.ControlInfo('wa-docToolbar-heightEdit'),
    X: new Resources.ControlInfo('wa-docToolbar-xpos'),
    XValue: new Resources.ControlInfo('wa-docToolbar-xposValue'),
    Y: new Resources.ControlInfo('wa-docToolbar-ypos'),
    YValue: new Resources.ControlInfo('wa-docToolbar-yposValue')
  },
  WA_PagesToolbar: {
    PageTabs: new Resources.ControlInfo('wa-pagesToolbar-pageTabs'),
    PageList: new Resources.ControlInfo('wa-pagesToolbar-pageList'),
    AddPage: new Resources.ControlInfo('wa-docToolbar-addPage')
  },
  GetControls: function (e, t) {
    return null == e ? null : 0 === (e = e.toLowerCase()).indexOf('r-') ? Resources.Controls.GetRibbonControls(e, t) : 0 === e.indexOf('cxt-') ? Resources.Controls.GetContextMenuControls(e, t) : 0 === e.indexOf('m-') ? Resources.Controls.GetModalControls(e, t) : 0 === e.indexOf('dd-') ? Resources.Controls.GetDropdownControls(e, t) : 0 === e.indexOf('sp-') ? Resources.Controls.GetSmartPanelControls(e, t) : 0 === e.indexOf('tp-') ? Resources.Controls.GetToolPaletteControls(e, t) : 0 === e.indexOf('wa-') ? Resources.Controls.GetWorkAreaControls(e, t) : null
  },
  GetRibbonControls: function (e, t) {
    if ('string' != typeof e) return null;
    var a = null;
    switch (e = e.toLowerCase()) {
      case Resources.Controls.Ribbons.Design.Id.toLowerCase():
        a = Resources.Controls.Ribbon_Design;
        break;
      case Resources.Controls.Ribbons.Help.Id.toLowerCase():
        a = Resources.Controls.Ribbon_Help;
        break;
      case Resources.Controls.Ribbons.Home.Id.toLowerCase():
        a = Resources.Controls.Ribbon_Home;
        break;
      case Resources.Controls.Ribbons.Insert.Id.toLowerCase():
        a = Resources.Controls.Ribbon_Insert;
        break;
      case Resources.Controls.Ribbons.File.Id.toLowerCase():
        a = Resources.Controls.Ribbon_File;
        break;
      case Resources.Controls.Ribbons.Page.Id.toLowerCase():
        a = Resources.Controls.Ribbon_Page;
        break;
      case Resources.Controls.Ribbons.Review.Id.toLowerCase():
        a = Resources.Controls.Ribbon_Review;
        break;
      case Resources.Controls.Ribbons.Table.Id.toLowerCase():
        a = Resources.Controls.Ribbon_Tablekey;
        break;
      case Resources.Controls.Ribbons.Options.Id.toLowerCase():
        a = Resources.Controls.Ribbon_Options;
        break;
      case Resources.Controls.Ribbons.Charts.Id.toLowerCase():
        a = Resources.Controls.Ribbon_Charts;
        break;
      default:
        a = null
    }
    if (!0 === t && null != a) {
      var r = [];
      for (var i in a) {
        var n = a[i];
        r.push(n)
      }
      return r
    }
    return a
  },
  GetContextMenuControls: function (e, t) {
    if ('string' != typeof e) return null;
    var a = null;
    switch (e = e.toLowerCase()) {
      case Resources.Controls.ContextMenus.Default.Id.toLowerCase():
        a = Resources.Controls.CXT_Default;
        break;
      case Resources.Controls.ContextMenus.RectContextMenu.Id.toLowerCase():
        a = Resources.Controls.CXT_Rect;
        break;
      case Resources.Controls.ContextMenus.Graph.Id.toLowerCase():
        a = Resources.Controls.CXT_Graph;
        break;
      case Resources.Controls.ContextMenus.Gauge.Id.toLowerCase():
        a = Resources.Controls.CXT_Gauge;
        break;
      case Resources.Controls.ContextMenus.LineSubMenu.Id.toLowerCase():
        a = Resources.Controls.CXT_LineSubMenu;
        break;
      case Resources.Controls.ContextMenus.LineSubMenuCurve.Id.toLowerCase():
        a = Resources.Controls.LineSubMenuCurve;
        break;
      case Resources.Controls.ContextMenus.LineThickness.Id.toLowerCase():
        a = Resources.Controls.CXT_LineThickness;
        break;
      case Resources.Controls.ContextMenus.LineDashes.Id.toLowerCase():
        a = Resources.Controls.CXT_LineDashes;
        break;
      case Resources.Controls.ContextMenus.PolyLine.Id.toLowerCase():
        a = Resources.Controls.CXT_PolyLine;
        break;
      case Resources.Controls.ContextMenus.Connector.Id.toLowerCase():
        a = Resources.Controls.CXT_Connector;
        break;
      case Resources.Controls.ContextMenus.PolyLine.Id.toLowerCase():
        a = Resources.Controls.CXT_FloorPlanWall;
        break;
      case Resources.Controls.ContextMenus.PolyWall.Id.toLowerCase():
        a = Resources.Controls.CXT_PolyWall;
        break;
      case Resources.Controls.ContextMenus.BPMN_Activity.Id.toLowerCase():
        a = Resources.Controls.CXT_BPMN_Activity;
        break;
      case Resources.Controls.ContextMenus.BPMN_Data.Id.toLowerCase():
        a = Resources.Controls.CXT_BPMN_Data;
        break;
      case Resources.Controls.ContextMenus.BPMN_Event.Id.toLowerCase():
        a = Resources.Controls.CXT_BPMN_Event;
        break;
      case Resources.Controls.ContextMenus.BPMN_Gateway.Id.toLowerCase():
        a = Resources.Controls.CXT_BPMN_Gateway;
        break;
      case Resources.Controls.ContextMenus.BPMN_Choreo.Id.toLowerCase():
        a = Resources.Controls.CXT_BPMN_Choreo;
        break;
      case Resources.Controls.ContextMenus.BPMN_Pool.Id.toLowerCase():
        a = Resources.Controls.CXT_BPMN_Pool;
        break;
      case Resources.Controls.ContextMenus.Swimlane.Id.toLowerCase():
        a = Resources.Controls.CXT_Swimlane;
        break;
      case Resources.Controls.ContextMenus.Frame.Id.toLowerCase():
        a = Resources.Controls.CXT_Frame;
        break;
      case Resources.Controls.ContextMenus.WorkArea.Id.toLowerCase():
        a = Resources.Controls.CXT_WorkArea;
        break;
      case Resources.Controls.ContextMenus.PageTab.Id.toLowerCase():
        a = Resources.Controls.CXT_PageTab;
        break;
      case Resources.Controls.ContextMenus.Wireframe.Id.toLowerCase():
        a = Resources.Controls.CXT_Wireframe;
        break;
      case Resources.Controls.ContextMenus.Gantt.Id.toLowerCase():
        a = Resources.Controls.CXT_Gantt;
        break;
      case Resources.Controls.ContextMenus.Table.Id.toLowerCase():
        a = Resources.Controls.CXT_Table
    }
    if (!0 === t && null != a) {
      var r = [];
      for (var i in a) {
        var n = a[i];
        r.push(n)
      }
      return r
    }
    return a
  },
  GetDropdownControls: function (e, t) {
    if ('string' != typeof e) return null;
    var a = null;
    switch (e = e.toLowerCase()) {
      case Resources.Controls.Dropdowns.Align.Id.toLowerCase():
        a = Resources.Controls.DD_Align;
        break;
      case Resources.Controls.Dropdowns.AddPage.Id.toLowerCase():
        a = Resources.Controls.DD_AddPage;
        break;
      case Resources.Controls.Dropdowns.Arrowheads.Id.toLowerCase():
        a = Resources.Controls.DD_Arrowheads;
        break;
      case Resources.Controls.Dropdowns.SmartContainerSetCornerRadius.Id.toLowerCase():
        a = Resources.Controls.DD_CornerRadius;
        break;
      case Resources.Controls.Dropdowns.LineSetCornerRadius.Id.toLowerCase():
        a = Resources.Controls.DD_LineSetCornerRadius;
        break;
      case Resources.Controls.Dropdowns.Arrowheads.Id.toLowerCase():
        a = Resources.Controls.DD_AssignmentMenu;
        break;
      case Resources.Controls.Dropdowns.Background.Id.toLowerCase():
        a = Resources.Controls.DD_Background;
        break;
      case Resources.Controls.Dropdowns.BorderStyle.Id.toLowerCase():
        a = Resources.Controls.DD_BorderStyle;
        break;
      case Resources.Controls.Dropdowns.BorderThickness.Id.toLowerCase():
        a = Resources.Controls.DD_BorderThickness;
        break;
      case Resources.Controls.Dropdowns.Borders.Id.toLowerCase():
        a = Resources.Controls.DD_Borders;
        break;
      case Resources.Controls.Dropdowns.BranchStyle.Id.toLowerCase():
        a = Resources.Controls.DD_BranchStyle;
        break;
      case Resources.Controls.Dropdowns.ChangeShape.Id.toLowerCase():
        a = Resources.Controls.DD_Align;
        break;
      case Resources.Controls.Dropdowns.CommentPopup.Id.toLowerCase():
        a = Resources.Controls.DD_Comments;
        break;
      case Resources.Controls.Dropdowns.ChangeShapeOrgChart.Id.toLowerCase():
        a = Resources.Controls.DD_ChangeShapeOrgChart;
        break;
      case Resources.Controls.Dropdowns.ConnectorLineTool.Id.toLowerCase():
        a = Resources.Controls.DD_ConnectorLineTool;
        break;
      case Resources.Controls.Dropdowns.InsertShape.Id.toLowerCase():
        a = Resources.Controls.DD_InsertShape;
        break;
      case Resources.Controls.Dropdowns.Export.Id.toLowerCase():
        a = Resources.Controls.DD_Export;
        break;
      case Resources.Controls.Dropdowns.File.Id.toLowerCase():
        a = Resources.Controls.DD_File;
        break;
      case Resources.Controls.Dropdowns.Fill.Id.toLowerCase():
        a = Resources.Controls.DD_Fill;
        break;
      case Resources.Controls.Dropdowns.Flip.Id.toLowerCase():
        a = Resources.Controls.DD_Flip;
        break;
      case Resources.Controls.Dropdowns.Group.Id.toLowerCase():
        a = Resources.Controls.DD_Group;
        break;
      case Resources.Controls.Dropdowns.ImportExport.Id.toLowerCase():
        a = Resources.Controls.DD_ImportExport;
        break;
      case Resources.Controls.Dropdowns.Layers.Id.toLowerCase():
        a = Resources.Controls.DD_Layers;
        break;
      case Resources.Controls.Dropdowns.DevTools.Id.toLowerCase():
        a = Resources.Controls.DD_devTools;
        break;
      case Resources.Controls.Dropdowns.Lines.Id.toLowerCase():
        a = Resources.Controls.DD_Lines;
        break;
      case Resources.Controls.Dropdowns.FreehandLines.Id.toLowerCase():
        a = Resources.Controls.DD_FreehandLine;
        break;
      case Resources.Controls.Dropdowns.LineFill.Id.toLowerCase():
        a = Resources.Controls.DD_LineFill;
        break;
      case Resources.Controls.Dropdowns.LineStyle.Id.toLowerCase():
        a = Resources.Controls.DD_LineStyle;
        break;
      case Resources.Controls.Dropdowns.LineThickness.Id.toLowerCase():
        a = Resources.Controls.DD_LineThickness;
        break;
      case Resources.Controls.Dropdowns.LineTool.Id.toLowerCase():
        a = Resources.Controls.DD_LineTool;
        break;
      case Resources.Controls.Dropdowns.LineTool.Id.toLowerCase():
        a = Resources.Controls.DD_LineToolEngineering;
        break;
      case Resources.Controls.Dropdowns.LineToolSwimlanes.Id.toLowerCase():
        a = Resources.Controls.DD_LineToolSwimlanes;
        break;
      case Resources.Controls.Dropdowns.SwimlaneFormat.Id.toLowerCase():
        a = Resources.Controls.DD_SwimlaneFormat;
        break;
      case Resources.Controls.Dropdowns.SwimlaneOptions.Id.toLowerCase():
        a = Resources.Controls.DD_SwimlaneOptions;
        break;
      case Resources.Controls.Dropdowns.SwimlaneAddLanes.Id.toLowerCase():
        a = Resources.Controls.DD_SwimlaneAddLanes;
        break;
      case Resources.Controls.Dropdowns.FrameOptions.Id.toLowerCase():
        a = Resources.Controls.DD_FrameOptions;
        break;
      case Resources.Controls.Dropdowns.MakeSame.Id.toLowerCase():
        a = Resources.Controls.DD_MakeSame;
        break;
      case Resources.Controls.Dropdowns.Measures.Id.toLowerCase():
        a = Resources.Controls.DD_Measures;
        break;
      case Resources.Controls.Dropdowns.MeetingTools.Id.toLowerCase():
        a = Resources.Controls.DD_MeetingTools;
        break;
      case Resources.Controls.Dropdowns.MobileTabs.Id.toLowerCase():
        a = Resources.Controls.DD_MobileTabs;
        break;
      case Resources.Controls.Dropdowns.OrgChartBranchStyle.Id.toLowerCase():
        a = Resources.Controls.DD_OrgChartBranchStyle;
        break;
      case Resources.Controls.Dropdowns.OrgChartDirection.Id.toLowerCase():
        a = Resources.Controls.DD_OrgChartDirection;
        break;
      case Resources.Controls.Dropdowns.MindMapDirection.Id.toLowerCase():
        a = Resources.Controls.MindMapDirection;
        break;
      case Resources.Controls.Dropdowns.PaperSize.Id.toLowerCase():
        a = Resources.Controls.DD_PaperSize;
        break;
      case Resources.Controls.Dropdowns.PrintOrientation.Id.toLowerCase():
        a = Resources.Controls.DD_PrintOrientation;
        break;
      case Resources.Controls.Dropdowns.SetMargins.Id.toLowerCase():
        a = Resources.Controls.DD_SetMargins;
        break;
      case Resources.Controls.Dropdowns.SetOrientation.Id.toLowerCase():
        a = Resources.Controls.DD_SetOrientation;
        break;
      case Resources.Controls.Dropdowns.SelChart.Id.toLowerCase():
        a = Resources.Controls.DD_SelChart;
        break;
      case Resources.Controls.Dropdowns.SelSwimlane.Id.toLowerCase():
        a = Resources.Controls.DD_SelSwimlane;
        break;
      case Resources.Controls.Dropdowns.Quickstyles.Id.toLowerCase():
        a = Resources.Controls.DD_QuickStyles;
        break;
      case Resources.Controls.Dropdowns.Rotate.Id.toLowerCase():
        a = Resources.Controls.DD_Rotate;
        break;
      case Resources.Controls.Dropdowns.Rotate.Id.toLowerCase():
        a = Resources.Controls.DD_SampleTables;
        break;
      case Resources.Controls.Dropdowns.SetScale.Id.toLowerCase():
        a = Resources.Controls.DD_SetScale;
        break;
      case Resources.Controls.Dropdowns.SetScaleArchitecture.Id.toLowerCase():
        a = Resources.Controls.DD_SetScale_Architecture;
        break;
      case Resources.Controls.Dropdowns.SetScaleMetric.Id.toLowerCase():
        a = Resources.Controls.DD_SetScale_Metric;
        break;
      case Resources.Controls.Dropdowns.SetScaleMechEng.Id.toLowerCase():
        a = Resources.Controls.DD_SetScale_MechEng;
        break;
      case Resources.Controls.Dropdowns.SetSnaps.Id.toLowerCase():
        a = Resources.Controls.DD_SetSnaps;
        break;
      case Resources.Controls.Dropdowns.ShapeBasic.Id.toLowerCase():
        a = Resources.Controls.DD_ShapeBasic;
        break;
      case Resources.Controls.Dropdowns.ShapeDropdown.Id.toLowerCase():
        a = Resources.Controls.DD_ShapeDropdown;
        break;
      case Resources.Controls.Dropdowns.ShapeLayout.Id.toLowerCase():
        a = Resources.Controls.DD_ShapeLayout;
        break;
      case Resources.Controls.Dropdowns.ShapeProperties.Id.toLowerCase():
        a = Resources.Controls.DD_ShapeProperties;
        break;
      case Resources.Controls.Dropdowns.Share.Id.toLowerCase():
        a = Resources.Controls.DD_Share;
        break;
      case Resources.Controls.Dropdowns.SpaceEvenly.Id.toLowerCase():
        a = Resources.Controls.DD_SpaceEvenly;
        break;
      case Resources.Controls.Dropdowns.SymbolSearch.Id.toLowerCase():
        a = Resources.Controls.DD_SymbolSearch;
        break;
      case Resources.Controls.Dropdowns.TabsMore.Id.toLowerCase():
        a = Resources.Controls.DD_more;
        break;
      case Resources.Controls.Dropdowns.ThemeLegacy.Id.toLowerCase():
        a = Resources.Controls.DD_ThemeLegacy;
        break;
      case Resources.Controls.Dropdowns.ThemeMore.Id.toLowerCase():
        a = Resources.Controls.DD_ThemeMore;
        break;
      case Resources.Controls.Dropdowns.Themes.Id.toLowerCase():
        a = Resources.Controls.DD_Theme;
        break;
      case Resources.Controls.Dropdowns.CustomThemes.Id.toLowerCase():
        a = Resources.Controls.DD_CustomThemes;
        break;
      case Resources.Controls.Dropdowns.CustomThemesSwatchOptions.Id.toLowerCase():
        a = Resources.Controls.DD_CustomThemesSwatchOptions;
        break;
      case Resources.Controls.Dropdowns.CustomThemesEditDelete.Id.toLowerCase():
        a = Resources.Controls.DD_CustomThemesEditDelete;
        break;
      case Resources.Controls.Dropdowns.TextAlign.Id.toLowerCase():
        a = Resources.Controls.DD_TextAlign;
        break;
      case Resources.Controls.Dropdowns.TextBullets.Id.toLowerCase():
        a = Resources.Controls.DD_TextBullets;
        break;
      case Resources.Controls.Dropdowns.TextColor.Id.toLowerCase():
        a = Resources.Controls.DD_textColor;
        break;
      case Resources.Controls.Dropdowns.TextDirection.Id.toLowerCase():
        a = Resources.Controls.DD_TextDirection;
        break;
      case Resources.Controls.Dropdowns.TextFonts.Id.toLowerCase():
        a = Resources.Controls.DD_TextFonts;
        break;
      case Resources.Controls.Dropdowns.TextSize.Id.toLowerCase():
        a = Resources.Controls.DD_TextSize;
        break;
      case Resources.Controls.Dropdowns.TextSpacing.Id.toLowerCase():
        a = Resources.Controls.DD_TextSpacing;
        break;
      case Resources.Controls.Dropdowns.TimelineConnectorStyle.Id.toLowerCase():
        a = Resources.Controls.DD_TimelineConnectorStyle;
        break;
      case Resources.Controls.Dropdowns.TimelineFormat.Id.toLowerCase():
        a = Resources.Controls.DD_TimelineFormat;
        break;
      case Resources.Controls.Dropdowns.BuilderTableCelltypes.Id.toLowerCase():
        a = Resources.Controls.DD_BuilderTableCelltypes;
        break;
      case Resources.Controls.Dropdowns.TrelloBoardName.Id.toLowerCase():
        a = Resources.Controls.DD_TrelloBoardName;
        break;
      case Resources.Controls.Dropdowns.TimelineFormat.Id.toLowerCase():
        a = Resources.Controls.DD_TrelloLane;
        break;
      case Resources.Controls.Dropdowns.TimelineFormat.Id.toLowerCase():
        a = Resources.Controls.DD_TrelloMembers;
        break;
      case Resources.Controls.Dropdowns.ChartsData.Id.toLowerCase():
        a = Resources.Controls.DD_ChartsData;
        break;
      default:
        a = null
    }
    if (!0 === t && null != a) {
      var r = [];
      for (var i in a) {
        var n = a[i];
        r.push(n)
      }
      return r
    }
    return a
  },
  GetToolPaletteControls: function (e, t) {
    if ('string' != typeof e) return null;
    var a = null;
    switch (e = e.toLowerCase()) {
      case Resources.Controls.ToolPalettes.OrgChartLayout.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_OrgChart_Layout;
        break;
      case Resources.Controls.ToolPalettes.OrgChartTools.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_OrgChart_Tools;
        break;
      case Resources.Controls.ToolPalettes.AddWall.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_AddWall;
        break;
      case Resources.Controls.ToolPalettes.AdjustWall.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_AdjustWall;
        break;
      case Resources.Controls.ToolPalettes.DimensionsArea.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_DimensionsArea;
        break;
      case Resources.Controls.ToolPalettes.ConnectorFormat.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_ConnectorFormat;
        break;
      case Resources.Controls.ToolPalettes.MindMapShapeLayout.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_MindMapShapeLayout;
        break;
      case Resources.Controls.ToolPalettes.TaskMapEdit.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_TaskMapEdit;
        break;
      case Resources.Controls.ToolPalettes.MindMapChartLayout.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_MindMapChartLayout;
        break;
      case Resources.Controls.ToolPalettes.ProjectChartTaskProperties.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_ProjectChartTaskProperties;
        break;
      case Resources.Controls.ToolPalettes.ProjectChartProject.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_ProjectChartProject;
        break;
      case Resources.Controls.ToolPalettes.SwimLane.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_Swimlanes;
        break;
      case Resources.Controls.ToolPalettes.LineDrawFormat.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_LineDrawFormat;
        break;
      case Resources.Controls.ToolPalettes.Options.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_Options;
        break;
      case Resources.Controls.ToolPalettes.WireframeUIElement.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_WireframeUIElement;
        break;
      case Resources.Controls.ToolPalettes.WireframeUIFormat.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_WireframeUIFormat;
        break;
      case Resources.Controls.ToolPalettes.ContainerFormat.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_ContainerFormat;
        break;
      case Resources.Controls.ToolPalettes.ContainerTable.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_ContainerTable;
        break;
      case Resources.Controls.ToolPalettes.ERDLine.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_ERDLine;
        break;
      case Resources.Controls.ToolPalettes.BPMNTasks.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_BPMNTasks;
        break;
      case Resources.Controls.ToolPalettes.BPMNEvents.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_BPMNEvents;
        break;
      case Resources.Controls.ToolPalettes.BPMNGateway.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_BPMNGateway;
        break;
      case Resources.Controls.ToolPalettes.BPMNData.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_BPMNData;
        break;
      case Resources.Controls.ToolPalettes.BPMNChoreography.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_BPMNChoreography;
        break;
      case Resources.Controls.ToolPalettes.BPMNLine.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_BPMNLine;
        break;
      case Resources.Controls.ToolPalettes.UMLLines.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_UMLLine;
        break;
      case Resources.Controls.ToolPalettes.UMLClassLine.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_UMLClassLine;
        break;
      case Resources.Controls.ToolPalettes.UMLComponentLine.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_UMLComponentLine;
        break;
      case Resources.Controls.ToolPalettes.BPMNPool.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_BPMNPool;
        break;
      case Resources.Controls.ToolPalettes.SubProcess.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_SubProcess;
        break;
      case Resources.Controls.ToolPalettes.SubCharts.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_SubCharts;
        break;
      case Resources.Controls.ToolPalettes.SubMap.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_SubMap;
        break;
      case Resources.Controls.ToolPalettes.UMLImport.Id.toLowerCase():
        a = Resources.Controls.ToolPalettes_UMLImport
    }
    return a
  },
  GetSmartPanelControls: function (e, t) {
    if ('string' != typeof e) return null;
    e = e.toLowerCase();
    var a = null;
    if (AppSettings.NewUI) switch (e) {
      case Resources.Controls.SmartPanels.SymbolSearchContainer.Id.toLowerCase():
        a = Resources.Controls.SmartPanel_SymbolSearch;
        break;
      case Resources.Controls.SmartPanels.SmartPanel.Id.toLowerCase():
        a = Resources.Controls.SmartPanel_Common
    } else switch (e) {
      case Resources.Controls.SmartPanels.SmartPanel.Id.toLowerCase():
        a = Resources.Controls.SmartPanel_Common;
        break;
      case Resources.Controls.SmartPanels.CommentContainer.Id.toLowerCase():
        a = Resources.Controls.SmartPanel_Comments;
        break;
      case Resources.Controls.SmartPanels.SymbolSearchContainer.Id.toLowerCase():
        a = Resources.Controls.SmartPanel_SymbolSearch
    }
    if (!0 === t && null != a) {
      var r = [];
      for (var i in a) {
        var n = a[i];
        r.push(n)
      }
      return r
    }
    return a
  },
  GetModalControls: function (e, t) {
    if ('string' != typeof e) return null;
    var a = null;
    switch (e = e.toLowerCase()) {
      case Resources.Controls.Modals.ImportFile.Id.toLowerCase():
        a = Resources.Controls.Modal_ImportFile;
        break;
      case Resources.Controls.Modals.ImportSDON.Id.toLowerCase():
        a = Resources.Controls.Modal_ImportSDON;
        break;
      case Resources.Controls.Modals.ImportText.Id.toLowerCase():
        a = Resources.Controls.Modal_ImportText;
        break;
      case Resources.Controls.Modals.ImportStickynotes.Id.toLowerCase():
        a = Resources.Controls.Modal_ImportStickynotes;
        break;
      case Resources.Controls.Modals.ImportGliffy.Id.toLowerCase():
        a = Resources.Controls.Modal_ImportGliffy;
        break;
      case Resources.Controls.Modals.ImportData.Id.toLowerCase():
      case Resources.Controls.Modals.ImportBarLineData.Id.toLowerCase():
      case Resources.Controls.Modals.ImportPieData.Id.toLowerCase():
        a = Resources.Controls.Modal_ImportData;
        break;
      case Resources.Controls.Modals.ImportImage.Id.toLowerCase():
        a = Resources.Controls.Modal_ImportImage;
        break;
      case Resources.Controls.Modals.PositionSize.Id.toLowerCase():
        a = Resources.Controls.Modal_PositionSize;
        break;
      case Resources.Controls.Modals.ShapeProperties.Id.toLowerCase():
        a = Resources.Controls.Modal_ShapeProperties;
        break;
      case Resources.Controls.Modals.SymbolLibrary.Id.toLowerCase():
        a = Resources.Controls.Modal_SymbolLibrary;
        break;
      case Resources.Controls.Modals.FilePicker.Id.toLowerCase():
        a = Resources.Controls.Modal_FilePicker;
        break;
      case Resources.Controls.Modals.FindReplace.Id.toLowerCase():
        a = Resources.Controls.Modal_FileReplace;
        break;
      case Resources.Controls.Modals.Find.Id.toLowerCase():
        a = Resources.Controls.Modal_Find;
        break;
      case Resources.Controls.Modals.Options.Id.toLowerCase():
        a = Resources.Controls.Modal_Options;
        break;
      case Resources.Controls.Modals.PDFExport.Id.toLowerCase():
        a = Resources.Controls.Modal_PDFExport;
        break;
      case Resources.Controls.Modals.ConnectionPoints.Id.toLowerCase():
        a = Resources.Controls.Modal_ConnectionPoints;
        break;
      case Resources.Controls.Modals.Hyperlink.Id.toLowerCase():
        a = Resources.Controls.Modal_Hyperlink;
        break;
      case Resources.Controls.Modals.Find.Id.toLowerCase():
        a = Resources.Controls.Modal_Find;
        break;
      case Resources.Controls.Modals.SaveAs.Id.toLowerCase():
        a = Resources.Controls.Modal_SaveAs;
        break;
      case Resources.Controls.Modals.ShowDimensions.Id.toLowerCase():
        a = Resources.Controls.Modal_ShowDimensions;
        break;
      case Resources.Controls.Modals.ProjectOptions.Id.toLowerCase():
        a = Resources.Controls.Modal_ProjectOptions;
        break;
      case Resources.Controls.Modals.CreateTrelloCard.Id.toLowerCase():
        a = Resources.Controls.Modal_CreateTrelloCard;
        break;
      case Resources.Controls.Modals.Scale.Id.toLowerCase():
        a = Resources.Controls.Modal_Scale;
        break;
      case Resources.Controls.Modals.TextEntry.Id.toLowerCase():
        a = Resources.Controls.Modal_TextEntry;
        break;
      case Resources.Controls.Modals.ChatGPTInput.Id.toLowerCase():
        a = Resources.Controls.Modal_ChatGPTInput;
        break;
      case Resources.Controls.Modals.InsertBitmap.Id.toLowerCase():
        a = Resources.Controls.Modal_InsertBitmap;
        break;
      case Resources.Controls.Modals.LineHops.Id.toLowerCase():
        a = Resources.Controls.Modal_LineHops;
        break;
      case Resources.Controls.Modals.NewLayerDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_NewLayer;
        break;
      case Resources.Controls.Modals.ManageLayersDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_ManageLayers;
        break;
      case Resources.Controls.Modals.DataRulesDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_DataRules;
        break;
      case Resources.Controls.Modals.DataListDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_DataList;
        break;
      case Resources.Controls.Modals.AWSImportDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_AWSImport;
        break;
      case Resources.Controls.Modals.AzureImportDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_AzureImport;
        break;
      case Resources.Controls.Modals.CustomThemeDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_CustomThemeDialog;
        break;
      case Resources.Controls.Modals.EditGraph.Id.toLowerCase():
        a = Resources.Controls.Modal_EditGraph;
        break;
      case Resources.Controls.Modals.DataExportDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_DataExport;
        break;
      case Resources.Controls.Modals.EditLayerDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_EditLayer;
        break;
      case Resources.Controls.Modals.WorkAreaDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_WorkAreaDialog;
        break;
      case Resources.Controls.Modals.LineThicknessDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_LineThicknessDialog;
        break;
      case Resources.Controls.Modals.CustomMarginsDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_CustomMarginsDialog;
        break;
      case Resources.Controls.Modals.CustomParametersDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_CustomParametersDialog;
        break;
      case Resources.Controls.Modals.CustomRotationDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_CustomRotationDialog;
        break;
      case Resources.Controls.Modals.PluginClassDiagram.Id.toLowerCase():
        a = Resources.Controls.Modal_PluginClassDiagram;
        break;
      case Resources.Controls.Modals.EmbedDialog.Id.toLowerCase():
        a = Resources.Controls.Modal_EmbedDialog;
        break;
      case Resources.Controls.Modals.OrgChartVisualizer.Id.toLowerCase():
        a = Resources.Controls.Modal_OrgChartVisualizer;
        break;
      case Resources.Controls.Modals.DecisionTreeVisualizer.Id.toLowerCase():
        a = Resources.Controls.Modal_DecisionTreeVisualizer;
        break;
      case Resources.Controls.Modals.ErdVisualizer.Id.toLowerCase():
        a = Resources.Controls.Modal_ErdVisualizer;
        break;
      case Resources.Controls.Modals.ClassDiagramVisualizer.Id.toLowerCase():
        a = Resources.Controls.Modal_ClassDiagramVisualizer;
        break;
      case Resources.Controls.Modals.ImportPDF.Id.toLowerCase():
        a = Resources.Controls.Modal_ImportPDF
    }
    if (!0 === t && null != a) {
      var r = [];
      for (var i in a) {
        var n = a[i];
        r.push(n)
      }
      return r
    }
    return a
  },
  GetWorkAreaControls: function (e, t) {
    if (null == e) return [];
    var a = null;
    switch (e.toLowerCase()) {
      case Resources.Controls.WorkArea.DocumentToolbar.Id.toLowerCase():
        a = Resources.Controls.WA_DocumentToolbar;
        break;
      case Resources.Controls.WorkArea.Layers.Id.toLowerCase():
        a = Resources.Controls.WorkArea.Layers;
        break;
      case Resources.Controls.WorkArea.LayersList.Id.toLowerCase():
        a = Resources.Controls.WorkArea.LayersList;
        break;
      case Resources.Controls.WorkArea.LayerButton.Id.toLowerCase():
        a = Resources.Controls.WorkArea.LayerButton;
        break;
      case Resources.Controls.WorkArea.LayerButtonLabel.Id.toLowerCase():
        a = Resources.Controls.WorkArea.LayerButtonLabel
    }
    if (!0 === t && null != a) {
      var r = [];
      for (var i in a) {
        var n = a[i];
        r.push(n)
      }
      return r
    }
    return a
  },
  GetControl: function (e) {
    if (null == e) return null;
    if (e = e.toLowerCase(), /*AppSettings.NewUI*/ false) var t = [
      Resources.Controls.ContextMenus,
      Resources.Controls.Dropdowns,
      Resources.Controls.Modals,
      Resources.Controls.Ribbons,
      Resources.Controls.ToolPalettes,
      Resources.Controls.SmartPanels,
      Resources.Controls.WorkArea
    ];
    else t = [
      Resources.Controls.ContextMenus,
      Resources.Controls.Dropdowns,
      Resources.Controls.Modals,
      Resources.Controls.Ribbons,
      Resources.Controls.SmartPanels,
      Resources.Controls.WorkArea
    ];
    for (var a = t.length, r = 0; r < a; r++) {
      var i = t[r];
      for (var n in i) {
        var o = i[n];
        if (o.Id.toLowerCase() === e) return o;
        if (0 === e.indexOf(o.Id.toLowerCase())) {
          var s = Resources.Controls.GetControls(o.Id);
          if (null != s) for (var l in s) {
            var S = s[l];
            if (S.Id.toLowerCase() === e) return S
          }
          return null
        }
      }
    }
  }
}

// Resources.Keys = {
//   Backspace: 8,
//   Tab: 9,
//   Enter: 13,
//   Shift: 16,
//   Ctrl: 17,
//   Alt: 18,
//   Caps_Lock: 20,
//   Escape: 27,
//   Space: 32,
//   Page_Up: 33,
//   Page_Down: 34,
//   End: 35,
//   Home: 36,
//   Left_Arrow: 37,
//   Up_Arrow: 38,
//   Right_Arrow: 39,
//   Down_Arrow: 40,
//   Insert: 45,
//   Delete: 46,
//   0: 48,
//   1: 49,
//   2: 50,
//   3: 51,
//   4: 52,
//   5: 53,
//   6: 54,
//   7: 55,
//   8: 56,
//   9: 57,
//   A: 65,
//   B: 66,
//   C: 67,
//   D: 68,
//   E: 69,
//   F: 70,
//   G: 71,
//   H: 72,
//   I: 73,
//   J: 74,
//   K: 75,
//   L: 76,
//   M: 77,
//   N: 78,
//   O: 79,
//   P: 80,
//   Q: 81,
//   R: 82,
//   S: 83,
//   T: 84,
//   U: 85,
//   V: 86,
//   W: 87,
//   X: 88,
//   Y: 89,
//   Z: 90,
//   Left_Window_Key: 91,
//   Right_Window_Key: 92,
//   Select_Key: 93,
//   Numpad_0: 96,
//   Numpad_1: 97,
//   Numpad_2: 98,
//   Numpad_3: 99,
//   Numpad_4: 100,
//   Numpad_5: 101,
//   Numpad_6: 102,
//   Numpad_7: 103,
//   Numpad_8: 104,
//   Numpad_9: 105,
//   Nultiply: 106,
//   Add: 107,
//   Subtract: 109,
//   Decimal_Point: 110,
//   Divide: 111,
//   F1: 112,
//   F2: 113,
//   F3: 114,
//   F4: 115,
//   F5: 116,
//   F6: 117,
//   F7: 118,
//   F8: 119,
//   F9: 120,
//   F10: 121,
//   F11: 122,
//   F12: 123,
//   Num_Lock: 144,
//   Scroll_Lock: 145,
//   Semi_Colon: 186,
//   Equal_Sign: 187,
//   Comma: 188,
//   Dash: 189,
//   Period: 190,
//   Forward_Slash: 191,
//   Grave_Accent: 192,
//   Open_Bracket: 219,
//   Back_Slash: 220,
//   Close_Braket: 221,
//   Single_Quote: 222
// }

Resources.ModifierKeys = {
  None: 0,
  Ctrl: 1,
  Shift: 2,
  Alt: 3,
  Ctrl_Alt: 4,
  Ctrl_Shift: 5,
  Shift_Alt: 6
}

// Resources.NonTextKeys = [
//   Resources.Keys.Backspace,
//   Resources.Keys.Tab,
//   Resources.Keys.Enter,
//   Resources.Keys.Left_Arrow,
//   Resources.Keys.Up_Arrow,
//   Resources.Keys.Right_Arrow,
//   Resources.Keys.Down_Arrow,
//   Resources.Keys.Delete,
//   Resources.Keys.Escape
// ]

Resources.Contexts = {
  None: - 1,
  All: 0,
  Text: 1,
  Table: 2,
  Automation: 3,
  DimensionText: 4,
  FloorPlan: 5,
  Note: 6,
  Navigation: 7,
  AutomationNoCtrl: 8,
  ReadOnly: 9
}

Resources.KeyboardCommand = function (e, t, a, r, i, n, o) {
  this.Name = null != e ? e : null,
    this.Context = null != t ? t : Resources.Contexts.None,
    this.ModifierKey = null != a ? a : Resources.ModifierKeys.None,
    this.KeyCode = null != r ? r : null,
    this.Command = 'function' == typeof i ? i : function () {
      alert(
        'Keyboard command \'' + this.Name + '\' (' + this.ModifierKey + ' + ' + this.KeyCode + ') is unbound.'
      )
    },
    this.CommandParent = null != n ? n : this,
    this.CommandParams = null != o ? o : [],
    this.Execute = function () {
      return this.Command.apply(this.CommandParent, this.CommandParams)
    }
}

Resources.KeyboardCommands = {
  All: [],
  Text: [],
  Table: [],
  Flowchart: [],
  MindMap: [],
  FloorPlan: [],
  Navigation: [],
  CustomConnectPoints: []
}

Resources.KeyboardCommand.prototype.BuildCommands = function () {

  console.log('Resources.KeyboardCommand.prototype.Resources --------', Resources)
  console.log('Resources.KeyboardCommand.prototype.Commands.MainController --------', Commands.MainController)
  console.log('Resources.KeyboardCommand.prototype.Commands.MainController.ConnectionPoints --------', Commands.MainController.ConnectionPoints)



  var e = Resources,
    t = Resources.ModifierKeys,
    a = Commands.MainController,
    r = a.Shapes,
    i = a.Business,
    n = a.ConnectionPoints;
  Resources.KeyboardCommands.All = [
    new Resources.KeyboardCommand('Copy', e.Contexts.All, t.Ctrl, ConstantData2.Keys.C, r.Copy, r),
    new Resources.KeyboardCommand('Cut', e.Contexts.All, t.Ctrl, ConstantData2.Keys.X, r.Cut, r),
    new Resources.KeyboardCommand('Paste', e.Contexts.All, t.Ctrl, ConstantData2.Keys.V, r.Paste, r),
    new Resources.KeyboardCommand('Undo', e.Contexts.All, t.Ctrl, ConstantData2.Keys.Z, r.Undo, r),
    new Resources.KeyboardCommand('Redo', e.Contexts.All, t.Ctrl, ConstantData2.Keys.Y, r.Redo, r),
    new Resources.KeyboardCommand(
      'SelectAll',
      e.Contexts.All,
      t.Ctrl,
      ConstantData2.Keys.A,
      r.SelectAllObjects,
      r
    ),
    new Resources.KeyboardCommand(
      'Delete',
      e.Contexts.All,
      t.None,
      ConstantData2.Keys.Delete,
      r.DeleteSelectedObjects,
      r
    ),
    new Resources.KeyboardCommand(
      'Delete',
      e.Contexts.All,
      t.None,
      ConstantData2.Keys.Backspace,
      r.DeleteSelectedObjects,
      r
    ),
    new Resources.KeyboardCommand(
      'Cancel',
      e.Contexts.All,
      t.None,
      ConstantData2.Keys.Escape,
      r.CancelModalOperation,
      r
    ),
    new Resources.KeyboardCommand(
      'Group',
      e.Contexts.All,
      t.Ctrl,
      ConstantData2.Keys.G,
      r.GroupSelectedShapes,
      r
    ),
    new Resources.KeyboardCommand(
      'Ungroup',
      e.Contexts.All,
      t.Ctrl_Shift,
      ConstantData2.Keys.G,
      r.UngroupSelectedShapes,
      r
    ),
    new Resources.KeyboardCommand('Duplicate', e.Contexts.All, t.Ctrl, ConstantData2.Keys.D, r.Duplicate, r),
    new Resources.KeyboardCommand(
      'Find',
      e.Contexts.All,
      t.Ctrl,
      ConstantData2.Keys.F,
      a.ShowModal,
      a,
      [
        Resources.Controls.Modals.Find.Id
      ]
    ),
    new Resources.KeyboardCommand('Replace', e.Contexts.All, t.Ctrl, ConstantData2.Keys.H, r.Replace, r),
    new Resources.KeyboardCommand('Bold', e.Contexts.Text, t.Ctrl, ConstantData2.Keys.B, r.BoldText, r),
    new Resources.KeyboardCommand('Italic', e.Contexts.Text, t.Ctrl, ConstantData2.Keys.I, r.ItalicText, r),
    new Resources.KeyboardCommand(
      'Underline',
      e.Contexts.Text,
      t.Ctrl,
      ConstantData2.Keys.U,
      r.UnderlineText,
      r
    ),
    new Resources.KeyboardCommand('Save', e.Contexts.All, t.Ctrl, ConstantData2.Keys.S, a.Save, a),
    new Resources.KeyboardCommand('ZoomIn', e.Contexts.All, t.Ctrl, ConstantData2.Keys.Add, a.ZoomIn, a),
    new Resources.KeyboardCommand('ZoomOut', e.Contexts.All, t.Ctrl, ConstantData2.Keys.Subtract, a.ZoomOut, a),
    new Resources.KeyboardCommand('ZoomIn', e.Contexts.All, t.Ctrl, ConstantData2.Keys.Equal_Sign, a.ZoomIn, a),
    new Resources.KeyboardCommand('ZoomOut', e.Contexts.All, t.Ctrl, ConstantData2.Keys.Dash, a.ZoomOut, a),
    new Resources.KeyboardCommand(
      'ReplaySVGEvents',
      e.Contexts.All,
      t.Ctrl,
      ConstantData2.Keys.E,
      a.ReplaySVGEvents,
      a
    ),
    new Resources.KeyboardCommand(
      'RecordSVGEvents',
      e.Contexts.All,
      t.Ctrl,
      ConstantData2.Keys.R,
      a.RecordSVGEvents,
      a
    ),
    // new Resources.KeyboardCommand(
    //   'SetEditorToCollaborate',
    //   e.Contexts.All,
    //   t.Ctrl,
    //   ConstantData2.Keys.F1,
    //   a.SetEditorToCollaborate,
    //   a
    // ),
    new Resources.KeyboardCommand(
      'SDF.BuildBlockList',
      e.Contexts.All,
      t.Ctrl,
      ConstantData2.Keys.F2,
      a.BuildBlockList,
      a
    ),
    new Resources.KeyboardCommand(
      'SDF.ReadBlockList',
      e.Contexts.All,
      t.Ctrl,
      ConstantData2.Keys.F3,
      a.ReadBlockList,
      a
    ),
    new Resources.KeyboardCommand('Hyperlink', e.Contexts.All, t.Ctrl, ConstantData2.Keys.K, r.AddHyperlink, r)
  ],
    Resources.KeyboardCommands.ReadOnly = [
      new Resources.KeyboardCommand('ZoomIn', e.Contexts.All, t.Ctrl, ConstantData2.Keys.Add, a.ZoomIn, a),
      new Resources.KeyboardCommand('ZoomOut', e.Contexts.All, t.Ctrl, ConstantData2.Keys.Subtract, a.ZoomOut, a),
      new Resources.KeyboardCommand('ZoomIn', e.Contexts.All, t.Ctrl, ConstantData2.Keys.Equal_Sign, a.ZoomIn, a),
      new Resources.KeyboardCommand('ZoomOut', e.Contexts.All, t.Ctrl, ConstantData2.Keys.Dash, a.ZoomOut, a)
    ],
    Resources.KeyboardCommands.Text = [
      new Resources.KeyboardCommand('Copy', e.Contexts.Text, t.Ctrl, ConstantData2.Keys.C, r.Copy, r),
      new Resources.KeyboardCommand('Cut', e.Contexts.Text, t.Ctrl, ConstantData2.Keys.X, r.Cut, r),
      new Resources.KeyboardCommand('Paste', e.Contexts.Text, t.Ctrl, ConstantData2.Keys.V, r.Paste, r),
      new Resources.KeyboardCommand('Undo', e.Contexts.Text, t.Ctrl, ConstantData2.Keys.Z, r.Undo, r),
      new Resources.KeyboardCommand('Redo', e.Contexts.Text, t.Ctrl, ConstantData2.Keys.Y, r.Redo, r),
      new Resources.KeyboardCommand('Bold', e.Contexts.Text, t.Ctrl, ConstantData2.Keys.B, r.BoldText, r),
      new Resources.KeyboardCommand('Italic', e.Contexts.Text, t.Ctrl, ConstantData2.Keys.I, r.ItalicText, r),
      new Resources.KeyboardCommand(
        'Underline',
        e.Contexts.Text,
        t.Ctrl,
        ConstantData2.Keys.U,
        r.UnderlineText,
        r
      ),
      // new Resources.KeyboardCommand(
      //   'SetEditorToCollaborate',
      //   e.Contexts.All,
      //   t.Ctrl,
      //   ConstantData2.Keys.F1,
      //   a.SetEditorToCollaborate,
      //   a
      // ),
      new Resources.KeyboardCommand(
        'SDF.BuildBlockList',
        e.Contexts.All,
        t.Ctrl,
        ConstantData2.Keys.F2,
        a.BuildBlockList,
        a
      ),
      new Resources.KeyboardCommand(
        'SDF.ReadBlockList',
        e.Contexts.All,
        t.Ctrl,
        ConstantData2.Keys.F3,
        a.ReadBlockList,
        a
      )
    ],
    Resources.KeyboardCommands.Table = [
      new Resources.KeyboardCommand('TTab', e.Contexts.Table, 0, ConstantData2.Keys.Tab, r.Table_NavRight, r),
      new Resources.KeyboardCommand(
        'TShiftTab',
        e.Contexts.Table,
        t.Shift,
        ConstantData2.Keys.Tab,
        r.Table_NavLeft,
        r
      ),
      new Resources.KeyboardCommand(
        'TNavRight',
        e.Contexts.Table,
        0,
        ConstantData2.Keys.Right_Arrow,
        r.Table_NavRight,
        r
      ),
      new Resources.KeyboardCommand(
        'TShiftNavRight',
        e.Contexts.Table,
        t.Shift,
        ConstantData2.Keys.Right_Arrow,
        r.Table_ShiftNavRight,
        r
      ),
      new Resources.KeyboardCommand(
        'TNavLeft',
        e.Contexts.Table,
        0,
        ConstantData2.Keys.Left_Arrow,
        r.Table_NavLeft,
        r
      ),
      new Resources.KeyboardCommand(
        'TShiftNavLeft',
        e.Contexts.Table,
        t.Shift,
        ConstantData2.Keys.Left_Arrow,
        r.Table_ShiftNavLeft,
        r
      ),
      new Resources.KeyboardCommand('TNavUp', e.Contexts.Table, 0, ConstantData2.Keys.Up_Arrow, r.Table_NavUp, r),
      new Resources.KeyboardCommand(
        'TShiftNavUp',
        e.Contexts.Table,
        t.Shift,
        ConstantData2.Keys.Up_Arrow,
        r.Table_ShiftNavUp,
        r
      ),
      new Resources.KeyboardCommand(
        'TNavDown',
        e.Contexts.Table,
        0,
        ConstantData2.Keys.Down_Arrow,
        r.Table_NavDown,
        r
      ),
      new Resources.KeyboardCommand(
        'TShiftNavDown',
        e.Contexts.Table,
        t.Shift,
        ConstantData2.Keys.Down_Arrow,
        r.Table_ShiftNavDown,
        r
      ),
      new Resources.KeyboardCommand('TEnter', e.Contexts.Table, 0, ConstantData2.Keys.Enter, r.Table_NavEnter, r)
    ],
    Resources.KeyboardCommands.Automation = [
      new Resources.KeyboardCommand(
        'AddRightPeer',
        e.Contexts.Flowchart,
        0,
        ConstantData2.Keys.Enter,
        i.AddRightPeer,
        i
      ),
      new Resources.KeyboardCommand(
        'AddRightPeer_Shift',
        e.Contexts.Flowchart,
        t.Shift,
        ConstantData2.Keys.Enter,
        i.AddRightPeer,
        i
      ),
      new Resources.KeyboardCommand('Tab', e.Contexts.Flowchart, 0, ConstantData2.Keys.Tab, i.Tab, i),
      new Resources.KeyboardCommand(
        'ShiftTab',
        e.Contexts.Flowchart,
        t.Shift,
        ConstantData2.Keys.Tab,
        i.ShiftTab,
        i
      ),
      new Resources.KeyboardCommand(
        'AddLeft',
        e.Contexts.Flowchart,
        t.Ctrl,
        ConstantData2.Keys.Left_Arrow,
        i.AddLeft,
        i
      ),
      new Resources.KeyboardCommand(
        'AddRight',
        e.Contexts.Flowchart,
        t.Ctrl,
        ConstantData2.Keys.Right_Arrow,
        i.AddRight,
        i
      ),
      new Resources.KeyboardCommand(
        'AddUp',
        e.Contexts.Flowchart,
        t.Ctrl,
        ConstantData2.Keys.Up_Arrow,
        i.AddAbove,
        i
      ),
      new Resources.KeyboardCommand(
        'AddDown',
        e.Contexts.Flowchart,
        t.Ctrl,
        ConstantData2.Keys.Down_Arrow,
        i.AddBelow,
        i
      ),
      new Resources.KeyboardCommand(
        'SplitLeft',
        e.Contexts.Flowchart,
        t.Shift,
        ConstantData2.Keys.Left_Arrow,
        i.SplitPathLeft,
        i
      ),
      new Resources.KeyboardCommand(
        'SplitRight',
        e.Contexts.Flowchart,
        t.Shift,
        ConstantData2.Keys.Right_Arrow,
        i.SplitPathRight,
        i
      ),
      new Resources.KeyboardCommand(
        'SplitUp',
        e.Contexts.Flowchart,
        t.Shift,
        ConstantData2.Keys.Up_Arrow,
        i.SplitPathUp,
        i
      ),
      new Resources.KeyboardCommand(
        'SplitDown',
        e.Contexts.Flowchart,
        t.Shift,
        ConstantData2.Keys.Down_Arrow,
        i.SplitPathDown,
        i
      ),
      new Resources.KeyboardCommand(
        'NavRight',
        e.Contexts.Flowchart,
        0,
        ConstantData2.Keys.Right_Arrow,
        i.NavRight,
        i
      ),
      new Resources.KeyboardCommand(
        'NavLeft',
        e.Contexts.Flowchart,
        0,
        ConstantData2.Keys.Left_Arrow,
        i.NavLeft,
        i
      ),
      new Resources.KeyboardCommand('NavUp', e.Contexts.Flowchart, 0, ConstantData2.Keys.Up_Arrow, i.NavUp, i),
      new Resources.KeyboardCommand(
        'NavDown',
        e.Contexts.Flowchart,
        0,
        ConstantData2.Keys.Down_Arrow,
        i.NavDown,
        i
      )
    ],
    Resources.KeyboardCommands.AutomationNoCtrl = [
      new Resources.KeyboardCommand(
        'AddRightPeer',
        e.Contexts.Flowchart,
        0,
        ConstantData2.Keys.Enter,
        i.AddRightPeer,
        i
      ),
      new Resources.KeyboardCommand(
        'AddRightPeer_Shift',
        e.Contexts.Flowchart,
        t.Shift,
        ConstantData2.Keys.Enter,
        i.AddRightPeer,
        i
      ),
      new Resources.KeyboardCommand('Tab', e.Contexts.Flowchart, 0, ConstantData2.Keys.Tab, i.Tab, i),
      new Resources.KeyboardCommand(
        'ShiftTab',
        e.Contexts.Flowchart,
        t.Shift,
        ConstantData2.Keys.Tab,
        i.ShiftTab,
        i
      ),
      new Resources.KeyboardCommand(
        'NavRight',
        e.Contexts.Flowchart,
        0,
        ConstantData2.Keys.Right_Arrow,
        i.NavRight,
        i
      ),
      new Resources.KeyboardCommand(
        'NavLeft',
        e.Contexts.Flowchart,
        0,
        ConstantData2.Keys.Left_Arrow,
        i.NavLeft,
        i
      ),
      new Resources.KeyboardCommand('NavUp', e.Contexts.Flowchart, 0, ConstantData2.Keys.Up_Arrow, i.NavUp, i),
      new Resources.KeyboardCommand(
        'NavDown',
        e.Contexts.Flowchart,
        0,
        ConstantData2.Keys.Down_Arrow,
        i.NavDown,
        i
      )
    ],
    Resources.KeyboardCommands.Navigation = [
      new Resources.KeyboardCommand('Tab', e.Contexts.Navigation, 0, ConstantData2.Keys.Tab, i.Tab, i),
      new Resources.KeyboardCommand(
        'ShiftTab',
        e.Contexts.Navigation,
        t.Shift,
        ConstantData2.Keys.Tab,
        i.ShiftTab,
        i
      ),
      new Resources.KeyboardCommand(
        'GrowLeft',
        e.Contexts.Navigation,
        t.Shift,
        ConstantData2.Keys.Left_Arrow,
        i.GrowLeft,
        i
      ),
      new Resources.KeyboardCommand(
        'GrowRight',
        e.Contexts.Navigation,
        t.Shift,
        ConstantData2.Keys.Right_Arrow,
        i.GrowRight,
        i
      ),
      new Resources.KeyboardCommand(
        'GrowUp',
        e.Contexts.Navigation,
        t.Shift,
        ConstantData2.Keys.Up_Arrow,
        i.GrowUp,
        i
      ),
      new Resources.KeyboardCommand(
        'GrowDown',
        e.Contexts.Navigation,
        t.Shift,
        ConstantData2.Keys.Down_Arrow,
        i.GrowDown,
        i
      ),
      new Resources.KeyboardCommand(
        'NudgeRight',
        e.Contexts.Navigation,
        0,
        ConstantData2.Keys.Right_Arrow,
        i.NudgeRight,
        i
      ),
      new Resources.KeyboardCommand(
        'NudgeLeft',
        e.Contexts.Navigation,
        0,
        ConstantData2.Keys.Left_Arrow,
        i.NudgeLeft,
        i
      ),
      new Resources.KeyboardCommand(
        'NudgeUp',
        e.Contexts.Navigation,
        0,
        ConstantData2.Keys.Up_Arrow,
        i.NudgeUp,
        i
      ),
      new Resources.KeyboardCommand(
        'NudgeDown',
        e.Contexts.Navigation,
        0,
        ConstantData2.Keys.Down_Arrow,
        i.NudgeDown,
        i
      )
    ],
    Resources.KeyboardCommands.FloorPlan = [
      new Resources.KeyboardCommand(
        'StopAddingWalls',
        e.Contexts.FloorPlan,
        0,
        ConstantData2.Keys.Escape,
        i.StopAddingWalls,
        i
      ),
      new Resources.KeyboardCommand('Tab', e.Contexts.FloorPlan, 0, ConstantData2.Keys.Tab, i.Tab, i),
      new Resources.KeyboardCommand(
        'ShiftTab',
        e.Contexts.FloorPlan,
        t.Shift,
        ConstantData2.Keys.Tab,
        i.ShiftTab,
        i
      ),
      new Resources.KeyboardCommand(
        'GrowLeft',
        e.Contexts.FloorPlan,
        t.Shift,
        ConstantData2.Keys.Left_Arrow,
        i.GrowLeft,
        i
      ),
      new Resources.KeyboardCommand(
        'GrowRight',
        e.Contexts.FloorPlan,
        t.Shift,
        ConstantData2.Keys.Right_Arrow,
        i.GrowRight,
        i
      ),
      new Resources.KeyboardCommand(
        'GrowUp',
        e.Contexts.FloorPlan,
        t.Shift,
        ConstantData2.Keys.Up_Arrow,
        i.GrowUp,
        i
      ),
      new Resources.KeyboardCommand(
        'GrowDown',
        e.Contexts.FloorPlan,
        t.Shift,
        ConstantData2.Keys.Down_Arrow,
        i.GrowDown,
        i
      ),
      new Resources.KeyboardCommand(
        'NudgeRight',
        e.Contexts.FloorPlan,
        0,
        ConstantData2.Keys.Right_Arrow,
        i.NudgeRight,
        i
      ),
      new Resources.KeyboardCommand(
        'NudgeLeft',
        e.Contexts.FloorPlan,
        0,
        ConstantData2.Keys.Left_Arrow,
        i.NudgeLeft,
        i
      ),
      new Resources.KeyboardCommand('NudgeUp', e.Contexts.FloorPlan, 0, ConstantData2.Keys.Up_Arrow, i.NudgeUp, i),
      new Resources.KeyboardCommand(
        'NudgeDown',
        e.Contexts.FloorPlan,
        0,
        ConstantData2.Keys.Down_Arrow,
        i.NudgeDown,
        i
      )
    ],
    Resources.KeyboardCommands.CustomConnectPoints = [
      new Resources.KeyboardCommand(
        'PointRight',
        e.Contexts.All,
        0,
        ConstantData2.Keys.Right_Arrow,
        n.PointMoveRight,
        n
      ),
      new Resources.KeyboardCommand(
        'PointLeft',
        e.Contexts.All,
        0,
        ConstantData2.Keys.Left_Arrow,
        n.PointMoveLeft,
        n
      ),
      new Resources.KeyboardCommand('PointUp', e.Contexts.All, 0, ConstantData2.Keys.Up_Arrow, n.PointMoveUp, n),
      new Resources.KeyboardCommand(
        'PointDown',
        e.Contexts.All,
        0,
        ConstantData2.Keys.Down_Arrow,
        n.PointMoveDown,
        n
      ),
      new Resources.KeyboardCommand('PointDelete', e.Contexts.All, 0, ConstantData2.Keys.Delete, n.PointDelete, n),
      new Resources.KeyboardCommand(
        'PointSelectPrev',
        e.Contexts.All,
        t.Ctrl,
        ConstantData2.Keys.Left_Arrow,
        n.PointSelectPrev,
        n
      ),
      new Resources.KeyboardCommand(
        'PointSelectNext',
        e.Contexts.All,
        t.Ctrl,
        ConstantData2.Keys.Right_Arrow,
        n.PointSelectNext,
        n
      ),
      new Resources.KeyboardCommand(
        'PointSelectPrev',
        e.Contexts.All,
        t.Alt,
        ConstantData2.Keys.Left_Arrow,
        n.PointSelectPrev,
        n
      ),
      new Resources.KeyboardCommand(
        'PointSelectNext',
        e.Contexts.All,
        t.Alt,
        ConstantData2.Keys.Right_Arrow,
        n.PointSelectNext,
        n
      ),
      new Resources.KeyboardCommand(
        'PointSelectPrev',
        e.Contexts.All,
        t.Ctrl,
        ConstantData2.Keys.Up_Arrow,
        n.PointSelectPrev,
        n
      ),
      new Resources.KeyboardCommand(
        'PointSelectNext',
        e.Contexts.All,
        t.Ctrl,
        ConstantData2.Keys.Down_Arrow,
        n.PointSelectNext,
        n
      ),
      new Resources.KeyboardCommand(
        'PointSelectPrev',
        e.Contexts.All,
        t.Alt,
        ConstantData2.Keys.Up_Arrow,
        n.PointSelectPrev,
        n
      ),
      new Resources.KeyboardCommand(
        'PointSelectNext',
        e.Contexts.All,
        t.Alt,
        ConstantData2.Keys.Down_Arrow,
        n.PointSelectNext,
        n
      )
    ]
}

Resources.KeyboardCommand.prototype.GetCommandsInContext = function (e) {
  var t = [];
  switch (e) {
    case Resources.Contexts.All:
      t = Resources.KeyboardCommands.All;
      break;
    case Resources.Contexts.ReadOnly:
      t = Resources.KeyboardCommands.ReadOnly;
      break;
    case Resources.Contexts.Automation:
      t = Resources.KeyboardCommands.Automation;
      break;
    case Resources.Contexts.AutomationNoCtrl:
      t = Resources.KeyboardCommands.AutomationNoCtrl;
      break;
    case Resources.Contexts.FloorPlan:
      t = Resources.KeyboardCommands.FloorPlan;
      break;
    case Resources.Contexts.Table:
      t = Resources.KeyboardCommands.Table;
      break;
    case Resources.Contexts.Text:
    case Resources.Contexts.DimensionText:
    case Resources.Contexts.NoteText:
      t = Resources.KeyboardCommands.Text;
      break;
    case Resources.Contexts.Navigation:
      t = Resources.KeyboardCommands.Navigation;
      break;
    case Resources.ModalContexts.ConnectionPointsDialog:
      t = Resources.KeyboardCommands.CustomConnectPoints
  }
  return t
}

Resources.WebFont = function (e, t, a, r, i, n, o) {
  this.Id = null !== e ? e : - 1,
    this.Name = null !== t ? t : null,
    this.WebFontFamily = null !== a ? a : null,
    this.Class = null !== r ? r : null,
    this.Category = null !== i ? i : null,
    this.Source = null !== n ? n : null,
    this.Default = null !== o &&
    o
}

Resources.WebFonts = []
Resources.BuildWebFonts = function () {
  var e,
    t,
    a = Globals.WebFonts.length;
  for (
    Globals.WebFonts.sort(
      (
        function (e, t) {
          return e.name.toLowerCase() < t.name.toLowerCase() ? - 1 : e.name.toLowerCase() === t.name.toLowerCase() ? 0 : 1
        }
      )
    ),
    e = 0;
    e < a;
    e++
  ) t = Globals.WebFonts[e],
    Resources.WebFonts.push(
      new Resources.WebFont(
        e,
        t.name,
        t.name,
        t.class,
        t.category,
        t.source,
        'yes' === t.default
      )
    );
  ConstantData.DocumentContext.RecentFonts.push(Resources.WebFonts[0]),
    ConstantData.DocumentContext.CurrentFont = Resources.WebFonts[0]
}

Resources.PreviewType = {
  Empty: - 1,
  Any: 0,
  Symbol: 1,
  SymbolLibrary: 2,
  Template: 3,
  TemplateLibrary: 4,
  FormatMapping: 5,
  KeywordGroup: 6,
  InstantiatePreviewItem: function (e) {
    return e === Resources.PreviewType.Symbol ||
      e === Resources.PreviewType.Template ? new Resources.ContentPreviewItem : e === Resources.PreviewType.SymbolLibrary ||
        e === Resources.PreviewType.TemplateLibrary ? new Resources.PreviewList : new Resources.PreviewItem
  }
}

Resources.PreviewItem = function () {
  this.ItemId = null,
    this.ContentTitle = null,
    this.ContentDescription = null,
    this.ContentType = Resources.PreviewType.Any,
    this.IsCustomContent = !1,
    this.FromJSON = function (e) {
      return $.extend(!0, this, e)
    }
}

Resources.ContentPreviewItem = function () {
  Resources.PreviewItem.call(this),
    this.ContentImageUrl = null,
    this.FromJSON = function (e) {
      if (
        $.extend(!0, this, e),
        this instanceof Resources.PreviewList != !0
      ) {
        if ('PNG' === e.ContentImageUrl || 'SVG' === e.ContentImageUrl) {
          var t = e.ContentImageUrl;
          this.ContentImageUrl = Constants.FilePath_CMSRoot,
            this.ContentType === Resources.PreviewType.Symbol ? this.ContentImageUrl += '/Symbols/BTN/' + this.ItemId + '.png' : this.ContentType === Resources.PreviewType.Template &&
              (
                'PNG' === t ? this.ContentImageUrl += '/Templates/PNG/' + this.ItemId + '.png' : 'SVG' === t &&
                  (this.ContentImageUrl += '/Templates/SVG/' + this.ItemId + '.svg')
              )
        } else if (
          !0 === this.IsCustomContent &&
          this.ContentType === Resources.PreviewType.Symbol
        ) {
          var a = this.ContentImageUrl;
          this.ContentImageUrl = this.GetCustomContentPreviewImageURL(this.ItemId, a, !1)
        } else this.ContentImageUrl = null == this.ContentImageUrl ? null : Constants.FilePath_CMSRoot + this.ContentImageUrl.replace(/\\/g, '/');
        this.ContentImageUrl = null == this.ContentImageUrl ? null : Utils.cacheBustUrl(Utils.toCDNUrl(this.ContentImageUrl))
      }
    },
    this.GetCustomContentPreviewImageURL = function (e, t, a) {
      var r = '/customcontent/symbols/' + e + '.png?cctoken=' + t;
      return !0 === a &&
        (r = Utils.cacheBustUrl(Utils.toCDNUrl(r))),
        r
    }
}

Resources.ContentPreviewItem.prototype = new Resources.PreviewItem
Resources.ContentPreviewItem.prototype.constructor = Resources.ContentPreviewItem
Resources.PreviewList = function () {
  Resources.ContentPreviewItem.call(this),
    this.Items = [],
    this.ListContentType = Resources.PreviewType.Any,
    this.SearchResults = !1,
    this.FromJSON = function (e) {
      if (
        Resources.PreviewList.prototype.FromJSON.call(this, e),
        this.Items = [],
        null == e.Items
      ) return this;
      for (var t = 0; t < e.Items.length; t++) {
        var a = Resources.PreviewType.InstantiatePreviewItem(this.ListContentType);
        a.FromJSON(e.Items[t]),
          this.Items.push(a)
      }
      return this
    },
    this.SearchContent = function (t, a) {
      return e(t, this, a, !1)
    },
    this.GetParent = function (t, a) {
      return null == a &&
        (a = this),
        e(t, a, !0, !0)
    };
  var e = function (t, a, r, i) {
    for (var n = a.Items.length, o = 0; o < n; o++) {
      var s = a.Items[o];
      if (s.ItemId === t) return null != i &&
        !0 === i ? a : s;
      if (
        s instanceof Resources.PreviewList &&
        !0 === r &&
        null != (s = e(t, s, r, i))
      ) return s
    }
    return null
  }
}

Resources.PreviewList.prototype = new Resources.ContentPreviewItem
Resources.PreviewList.prototype.constructor = Resources.PreviewList
Resources.SymbolCache = function (e, t, a) {
  this.SymbolID = e,
    this.LMObject = t,
    this.SymbolData = a
}

Resources.UserDepository = function () {
  this.Depository = Resources.Depositories.None,
    this.AccountEmail = null
}

Resources.FileIdentifierType = {
  SmartDrawFileId: 0,
  FilePath: 1,
  DepositoryFileId: 2
}

Resources.SortOrder = {
  Ascending: 1,
  Descending: 2
}

Resources.SortBy = {
  ContentTitle: 1,
  DateModified: 2
}

Resources.FilePreviewType = {
  None: 0,
  List: 1,
  Document: 2,
  Action: 3,
  Presentation: 4,
  Folder: 5,
  InstantiatePreviewItem: function (e) {
    return e === Resources.FilePreviewType.Document ? new Resources.DocumentPreviewItem : e === Resources.FilePreviewType.List ? new Resources.PreviewList : e === Resources.FilePreviewType.Folder ? new Resources.FolderPreviewItem : new Resources.PreviewItem
  }
}

Resources.SDTSPreviewItem = function () {
  this.ItemId = null,
    this.ContentTitle = null,
    this.ContentDescription = null,
    this.ContentType = Resources.FilePreviewType.None,
    this.FromJSON = function (e) {
      return $.extend(!0, this, e)
    }
}

Resources.DocumentPreviewItem = function () {
  Resources.SDTSPreviewItem.call(this),
    this.ContentImageUrl = null,
    this.DateModified = null,
    this.DisplayDate = null,
    this.DepositoryId = null,
    this.Depostiory = Resources.Depositories.None,
    this.FolderPath = null,
    this.UserOwnerId = null,
    this.DisplayTitle = null,
    this.FromJSON = function (e) {
      $.extend(!0, this, e),
        this.DateModified = Utils.ParseEpochDate(this.DateModified),
        this.DisplayDate = Utils.GetDateString(this.DateModified),
        this.DisplayTitle = null != this.ContentTitle &&
          this.ContentTitle.toLowerCase().indexOf('.sdr') == this.ContentTitle.length - 4 ? this.ContentTitle.substring(0, this.ContentTitle.length - 4) : this.ContentTitle
    }
}

Resources.DocumentPreviewItem.prototype = new Resources.SDTSPreviewItem
Resources.DocumentPreviewItem.prototype.constructor = Resources.DocumentPreviewItem
Resources.FolderPreviewItem = function () {
  Resources.SDTSPreviewItem.call(this),
    this.FolderPath = null,
    this.ContainingFolder = null,
    this.DateModified = null,
    this.DisplayDate = null,
    this.DepositoryId = null,
    this.Depository = Resources.Depositories.None,
    this.ContentImageUrl = null,
    this.FromJSON = function (e) {
      $.extend(!0, this, e),
        this.DateModified = Utils.ParseEpochDate(this.DateModified),
        this.DisplayDate = Utils.GetDateString(this.DateModified)
    }
}

Resources.FolderPreviewItem.prototype = new Resources.SDTSPreviewItem
Resources.FolderPreviewItem.prototype.constructor = Resources.DocumentPreviewItem
Resources.SDTSPreviewList = function () {
  Resources.SDTSPreviewItem.call(this),
    this.Items = [],
    this.ListContentType = Resources.FilePreviewType.None,
    this.FromJSON = function (e) {
      Resources.SDTSPreviewList.prototype.FromJSON.call(this, e),
        this.Items = [];
      for (var t = 0; t < e.Items.length; t++) {
        var a = Resources.PreviewType.InstantiatePreviewItem(e.Items[t].ContentType);
        a.FromJSON(e.Items[t]),
          this.Items.push(a)
      }
      return this
    },
    this.SearchContent = function (t, a) {
      return e(t, this, a, !1)
    },
    this.GetParent = function (t) {
      return e(t, this, !0, !0)
    };
  var e = function (t, a, r, i) {
    for (var n = a.Items.length, o = 0; o < n; o++) {
      var s = a.Items[o];
      if (s.ItemId === t) return null != i &&
        !0 === i ? a : s;
      if (null != s.Items && !0 === r && null != (s = e(t, s, r, i))) return s
    }
    return null
  }
}

Resources.SDTSPreviewList.prototype = new Resources.SDTSPreviewItem
Resources.SDTSPreviewList.prototype.constructor = Resources.SDTSPreviewList
Resources.SDTSFolderPreviewList = function () {
  Resources.SDTSPreviewItem.call(this),
    this.Items = [],
    this.ListContentType = Resources.FilePreviewType.None,
    this.FolderPath = null
}

Resources.SDTSFolderPreviewList.prototype = new Resources.SDTSPreviewList
Resources.SDTSFolderPreviewList.prototype.constructor = Resources.SDTSFolderPreviewList
Resources.SDFile = function () {
  this.Id = - 1,
    this.OwnerUserID = - 1,
    this.DateModified = null,
    this.DepositoryFileId = null,
    this.FileName = '',
    this.Depository = Resources.Depositories.SDJS,
    this.Permission = 0,
    this.VirtualPath = - 1,
    this.Archived = !1,
    this.Description = null,
    this.IsUntitled = !0,
    this.IsNew = !1,
    this.FromJSON = function (e) {
      $.extend(!0, this, e),
        this.Id > 0 &&
        void 0 === e.IsUntitled &&
        (this.IsUntitled = !1),
        this.DateModified = Utils.ParseEpochDate(this.DateModified)
    },
    this.ToPostForm = function () {
      var e = $.extend(!0, new Resources.SDFile, this);
      return delete e.DateModified,
        e
    },
    this.ConvertJSDateToWCFDate = function (e) {
      return null == e ? '/Date(-62135568000000-0800)/' : '/Date(' + e.getTime() + ')/'
    }
}

Resources.PagedSDRManifest = function () {
  this.Version = '1.0',
    this.Initial = null,
    this.TabOrder = [],
    this.FromJSON = function (e) {
      $.extend(!0, this, e)
    },
    this.ToFileString = function () {
      var e = '';
      e += '"Version" : "' + this.Version + '"; \r\n',
        e += '"Initial" : "' + this.Initial + '"; \r\n',
        e += '"TabOrder" : [ \r\n';
      for (var t = this.TabOrder.length, a = 0; a < t; a++) e += a !== t - 1 ? '"' + this.TabOrder[a] + '", \r\n' : '"' + this.TabOrder[a] + '" \r\n';
      return e += '];'
    }
}

Resources.PagedSDRManifest2 = function () {
  this.Version = '2.0',
    this.Initial = null,
    this.TabOrder = [],
    this.FromJSON = function (e) {
      $.extend(!0, this, e)
    },
    this.ToFileString = function () {
      var e = '';
      e += '"Version" : "' + this.Version + '", \r\n',
        e += '"Initial" : "' + this.Initial + '", \r\n',
        e += '"TabOrder" : [ \r\n';
      for (var t = this.TabOrder.length, a = 0; a < t; a++) {
        e += ' { \r\n';
        var r = this.TabOrder[a];
        e += '"PageID" : "' + r.PageID + '", \r\n',
          e += '"PageName" : "' + r.PageName + '", \r\n',
          e += '"Ordinal" : "' + r.Ordinal + '" \r\n',
          r.Orginal !== t - 1 ? e += ' }, \r\n' : e += ' } \r\n'
      }
      return e += '];'
    },
    this.GetPageName = function (e) {
      for (var t = this.TabOrder.length, a = 0; a < t; a++) {
        var r = this.TabOrder[a];
        if (e == r.PageID) return r.PageName
      }
      return null
    },
    this.GetPageID = function (e) {
      '.sdr' === e.substr(pagePath.length - 4, 4).toLowerCase() &&
        (e = e.substr(0, pagePath.length - 4));
      for (var t = this.TabOrder.length, a = 0; a < t; a++) {
        var r = this.TabOrder[a];
        if (e == r.PageName) return r.PageID
      }
      return null
    },
    this.GetFirstPageID = function () {
      for (var e = this.TabOrder.length, t = 0; t < e; t++) {
        var a = this.TabOrder[t];
        if (0 == a.Ordinal) return a.PageID
      }
      return null
    },
    this.GetPageOrdinal = function (e) {
      for (var t = this.TabOrder.length, a = 0; a < t; a++) {
        var r = this.TabOrder[a];
        if (e == r.PageID) return r.Ordinal
      }
      return null
    },
    this.GetPageNameByOrdinal = function (e) {
      for (var t = this.TabOrder.length, a = 0; a < t; a++) {
        var r = this.TabOrder[a];
        if (e == r.Ordinal) return r.PageName
      }
      return null
    },
    this.AddPage = function (e, t) {
      '.sdr' === t.substr(pagePath.length - 4, 4).toLowerCase() &&
        (t = t.substr(0, pagePath.length - 4));
      var a = new Resources.PageMetaData;
      a.PageID = e,
        a.PageName = t,
        a.Ordinal = this.TabOrder.length,
        this.TabOrder.push(a)
    },
    this.AddPage = function (e, t, a) {
      if (null != t && t != Constants.Guid_Empty) {
        '.sdr' === a.substr(pagePath.length - 4, 4).toLowerCase() &&
          (a = a.substr(0, pagePath.length - 4));
        for (var r = [], i = this.TabOrder.length, n = 0; n < i; n++) {
          var o = this.TabOrder[n],
            s = new Resources.PageMetaData;
          n < e ? (
            s.PageID = o.PageID,
            s.PageName = o.PageName,
            s.Ordinal = o.Ordinal,
            r.push(s)
          ) : n == e ? (
            s.PageID = t,
            s.PageName = a,
            s.Ordinal = e,
            r.push(s),
            s.PageID = o.PageID,
            s.PageName = o.PageName,
            s.Ordinal = e + 1,
            r.push(s)
          ) : (
            s.PageID = o.PageID,
            s.PageName = o.PageName,
            s.Ordinal = o.Ordinal + 1,
            r.push(s)
          )
        }
        this.TabOrder = r
      }
    },
    this.RemovePage = function (e) {
      for (var t = [], a = this.TabOrder.length, r = 0; r < a; r++) {
        var i = this.TabOrder[r];
        if (i.Ordinal !== e) {
          var n = new Resources.PageMetaData;
          n.PageID = i.PageID,
            n.PageName = i.PageName,
            n.Ordinal = i.Ordinal,
            t.push(n)
        }
      }
      this.TabOrder = t
    },
    this.MovePage = function (e, t, a) {
      if (e !== Constants.Guid_Empty && 1 !== this.TabOrder.length) {
        var r = this.GetPageOrdinal(e),
          i = this.TabOrder.length,
          n = [],
          o = this.TabOrder[r];
        o.Ordinal = t;
        var s = this.TabOrder[t];
        s.Ordinal = r;
        for (var l = 0; l < i; l++) {
          var S = this.TabOrder[l];
          l == r ? n.push(s) : l == t ? n.push(o) : n.push(S)
        }
        this.TabOrder = n,
          !0 === a &&
          (this.Initial = e)
      }
    }
}

Resources.PageMetaData = function () {
  this.PageName = null,
    this.PageID = null,
    this.Ordinal = null
}

Resources.LineToolTypes = {
  StraightLine: 'line',
  ArcLine: 'arcLine',
  ArcSegmentedLine: 'arcSegLine',
  SegmentedLine: 'segLine',
  PolyLine: 'polyLine',
  PolyLineContainer: 'polyLineContainer',
  MoveWall: 'moveWall',
  CommLine: 'commline',
  DigiLine: 'digiline',
  FreehandLine: 'freehandLine'
}

Resources.ShapeToolTypes = {
  Rectangle: 'rect',
  RoundRectangle: 'roundRect',
  Oval: 'oval',
  Square: 'square',
  Circle: 'circle',
  RoundSquare: 'roundSquare'
}

Resources.StyledLineToolTypes = {
  Pen: 'pen',
  Highlighter: 'highlighter'
}

Resources.SwimlaneTypes = {
  Row: 0,
  Column: 1,
  Grid: 2
}



Resources.Tools = {
  Tool_Symbol: - 1,
  Tool_Select: 0,
  Tool_Shape: 1,
  Tool_Line: 2,
  Tool_Text: 3,
  Tool_Wall: 4,
  Tool_StyledLine: 5
}

Resources.LeftPanelMode = {
  LEFTPANELMODE_SMARTPANEL: 0,
  LEFTPANELMODE_SYMBOLS: 1,
  LEFTPANELMODE_DATA: 2,
  LEFTPANELMODE_COMMENTS: 3,
  LEFTPANELMODE_SYMBOLSEARCH: 4,
  LEFTPANELMODE_INSERT: 5
}

Resources.WindowsLineTools = [
  Resources.LineToolTypes.StraightLine,
  Resources.LineToolTypes.ArcLine,
  Resources.LineToolTypes.SegmentedLine,
  Resources.LineToolTypes.ArcSegmentedLine,
  Resources.LineToolTypes.PolyLine,
  Resources.LineToolTypes.PolyLine,
  Resources.LineToolTypes.MoveWall
]

Resources.WindowsShapeTools = [
  Resources.ShapeToolTypes.Rectangle,
  Resources.ShapeToolTypes.RoundRectangle,
  Resources.ShapeToolTypes.Oval,
  Resources.ShapeToolTypes.Square,
  Resources.ShapeToolTypes.Rectangle,
  Resources.ShapeToolTypes.Circle,
  Resources.ShapeToolTypes.RoundSquare
]

// Resources.DocumentContext = {
//   UserId: - 1,
//   UserName: '',
//   UserToken: null,
//   UserLoginId: '',
//   CloudFileMetadata: null,
//   LineTool: Resources.LineToolTypes.SegmentedLine,
//   ShapeTool: ConstantData.SDRShapeTypes.SED_S_Rect,

//   //Double ===
//   UsingWallTool: !1,
//   SelectionTool: Resources.Tools.Tool_Select,
//   SelectionToolSticky: !1,
//   SelectionToolMultiple: !1,
//   SwimlaneFormat: Resources.SwimlaneTypes.Row,
//   SwimlaneNLanes: 4,
//   SwimlaneNVLanes: 4,
//   SwimlaneRotate: !0,
//   SwimlaneTitle: !1,
//   AutoContainer: !0,
//   ActAsContainer: !0,
//   CollapseTools: !1,
//   RecentFonts: [],
//   CurrentFont: null,
//   CurrentFontSize: 12,
//   AllowCopy: !1,
//   CurrentClipboard: 0,
//   RecentColors: [],
//   RecentFreehandColors: [],
//   LastTexture: 0,
//   SelectedSymbol: '00000000-0000-0000-00000000',
//   ActiveSymbolLibraries: [],
//   SmartPanelContext: Resources.Contexts.None,
//   CurrentQuickStyle: 7,
//   CurrentTextAlignment: 'center',
//   CurrentTextBullet: 'none',
//   CurrentTextSpacing: 0,
//   CurrentTextDirection: !0,
//   CurrentRibbon: 'r-home',
//   CurrentSmartPanel: null,
//   CurrentSubType: 0,
//   CurrentObjType: 0,
//   CurrentLineThickness: 1,
//   CurrentElemID: - 1,
//   CurrentContainerList: null,
//   CurrentFixedCornerRadius: - 1,
//   CurrentLineCornerRadius: - 1,
//   CurrentConnectorCanHaveCurve: !1,
//   CurrentSelectionBusinessManager: null,
//   CurrentWallThickness: 0,
//   PolyLineContainerMoveMode: !1,
//   CanTypeInWorkArea: !0,
//   ApplicationClosing: !1,
//   CurrentWidth: 0,
//   CurrentHeight: 0,
//   CurrentLeft: 0,
//   CurrentTop: 0,
//   Colorfilter: 0,
//   Saved: !1,
//   SessionFlags: Resources.ActiveSessionFlags.WebAppSession,
//   TimerCallbackID: - 1,
//   IsTargetTable: !1,
//   TableCellNoText: !1,
//   TableCellType: 0,
//   TableCellSelected: !1,
//   TableCellFlags: 0,
//   EditRows: !1,
//   EditCols: !1,
//   HTMLFocusControl: null,
//   NumberFilter: [
//     '0',
//     '1',
//     '2',
//     '3',
//     '4',
//     '5',
//     '6',
//     '7',
//     '8',
//     '9',
//     '.'
//   ],
//   FeetFilter: [
//     '0',
//     '1',
//     '2',
//     '3',
//     '4',
//     '5',
//     '6',
//     '7',
//     '8',
//     '9',
//     '.',
//     '"',
//     ' ',
//     '\'',
//     '/'
//   ],
//   IntegerFilter: [
//     '0',
//     '1',
//     '2',
//     '3',
//     '4',
//     '5',
//     '6',
//     '7',
//     '8',
//     '9'
//   ],
//   FindTarget: '',
//   ReplaceTarget: '',
//   MatchWord: !1,
//   MatchCase: !1,
//   LoggingSessionID: - 1,
//   AllowLayers: !0,
//   TemplateID: null,
//   ReadOnlyPermission: !1,
//   UserSettings: null,
//   HintSeen: 0,
//   PublicShareToken: null,
//   NotificationPublicShareToken: null,
//   NotificationUserName: null,
//   PublishUrl: null,
//   ReadJSON: !1,
//   NoSetBusiness: !1,
//   TrelloPU: !1,
//   TrelloPUOpenExisting: !1,
//   Credentials: [],
//   CurrentCredential: null,
//   ContentSource: Resources.ContentSource.SDCloudWebService,
//   SpacebarDown: !1,
//   FullScreen: !1,
//   ImportingJSNF: !1,
//   StyledLineTool: Resources.StyledLineToolTypes.Highlighter
// }

// Resources.DocumentContext = Object.preventExtensions(Resources.DocumentContext)

Resources.Strings = {
  OrgChart_CoManagerAsst: 'Assistants cannot be co-managers',
  OrgChart_ChangeStyle: 'You cannot change the style of co-manager and assistants',
  OrgChart_NoSelect: 'To use this command you must first select a shape in the tree',
  OrgChart_NoShape: 'To use this command you must first add a shape using add right, left, up or down',
  OrgChart_NoAsst: 'To use this command you cannot select an Assistant',
  CauseAndEffect_NoSelect: 'Select a shape in your chart with a different connector style than the one you chose.',
  CauseAndEffect_NoSelectDetail: 'To use this command you must first select a detail in your diagram',
  Genogram_HasPartner: 'This person already has a partner',
  Genogram_HasParent: 'This person already has a parent',
  Genogram_NoSelect: 'To use this command you must first select a person in your diagram',
  Search_NoMatch: 'Search completed with no matches found.',
  Search_NMatches: ' matches found and replaced',
  Search_ReplMatch: 'The search target and replacement are the same.',
  SDRRead_Error_1: 'This file is not a SmartDraw file',
  SDRRead_Error_2: 'Unable to open a file created with a later version of SmartDraw',
  SDRRead_Error_3: 'This file is not formatted correctly',
  SDRRead_Error_4: 'Unable to open a file created with this earlier version of SmartDraw. Open and save the file in SmartDraw CI.',
  SDRRead_Error_5: 'Unable to open a file because it contains groups created by an earlier version of SmartDraw.',
  SDRRead_Error_6: 'This file contains features that are only supported in SmartDraw Windows. It can not be opened.',
  SDRRead_Error_7: 'No Shapes in group',
  SDRRead_Error_8: 'Table not read',
  SDRRead_Error_9: 'Metafile not read',
  SDRRead_Error_10: 'Texture not read',
  SDRRead_Error_11: 'Symbol too large',
  SDRRead_Error_12: 'File created with a version of SmartDraw not recent enough to support online project charts',
  NoFlip: 'Shapes hooked to other shapes and automatic connectors cannot be flipped.',
  NoRotate: 'Certain shapes, shape connectors, linked lines, and groups containing them cannot be rotated.',
  MaxPolySegs: 'Completing this operation would result in a polygon with more than the maximum number of segments.',
  DocFailed: 'The document failed to load.',
  DocWriteFailed: 'An error occurred saving the document to the server.',
  DocCreateFailed: 'An error occurred creating the document on the server.',
  PDFExportFailed: 'An error occurred creating the PDF. No PDF was exported',
  LibraryLoadFailed: 'Unable to load library ',
  InvalidFileName: 'Invalid File Name. The file name cannot contain the following characters: *, ", \\, /, <, >, ?, :, |',
  NoCreateFileInCheckoutRequired: 'You cannot save a file here.  This document library\'s versioning settings are set to "require checkout", which is not supported.',
  InsertTable: '<i class=\'icon-table\'></i>\r\n Insert Table',
  EditTable: '<i class=\'icon-table\'></i>\r\n Edit Table',
  OrgChart_ImportImageTitle: 'Add a picture to this position',
  Decision_Tree_Yes: 'Yes',
  Decision_Tree_No: 'No',
  Decision_Tree_Label: 'Label',
  CauseAndEffect_Label: 'Detail',
  CauseAndEffect_CauseLabel: 'Cause',
  DefaultNotesText: '',
  GroupNotAllowed: 'Some of the objects you have selected to be grouped are locked, or hooked to other objects that must also be selected to become part of the same group',
  NoShape: 'To use this command you must first select a shape',
  NoGraph: 'To use this command you must first select a graph',
  NoGauge: 'To use this command you must first select a gauge',
  NoInsertGraph: 'You cannot insert Graphs or Gauges into this type of document.',
  EditShapeOutline_WrongShape: 'You cannot edit the outline of complex symbols and images',
  AlignHooked: 'You cannot align or space objects that are linked to other objects. You must select at least three objects that are not linked to any others to use this command.',
  MaxConnectPoints: 'You have already added the maximum number of 16 connect points.',
  NURBS3InsufficientPoints: 'Polyline must have at least three control points to convert to degree 2 NURBS.',
  NURBS4InsufficientPoints: 'Polyline must have at least four control points to convert to degree 3 NURBS.',
  Bezier3InsufficientPoints: 'Polyline must have at least three control points to convert to degree 2 Bezier.',
  Bezier4InsufficientPoints: 'Polyline must have at least four control points to convert to degree 3 Bezier.',
  EllipticalArcInsufficientPoints: 'Polyline must have at least three control points to convert to an Elliptical Arc.',
  Error_Bounds: 'Making this change would force some of your objects outside the bounds of the work area.',
  Error_NoSymbol: 'No symbol in the library panel is selected.',
  Error_NoSymbolReplace: 'To use this command you must first select a shape',
  Error_NoShapeWithLine: 'To use this command you must first select a shape connected to a line',
  ColorPicker_Fill_Title: 'Set Custom Fill Color',
  ColorPicker_Text_Title: 'Set Custom Text Color',
  ColorPicker_Line_Title: 'Set Custom Line Color',
  ColorPicker_Background_Title: 'Set Custom Background Color',
  ColorPicker_Gradient_Title: 'Set Custom Gradient Color',
  ColorPicker_DataRules_Title: 'Set Custom Color',
  Gradient_Fill_Title: 'Set Fill Gradient',
  Gradient_Line_Title: 'Set Line Gradient',
  Gradient_Background_Title: 'Set Background Gradient',
  Error_InComplete: 'Unable to complete this operation.',
  No_Service: 'A connection to a service is required before this action can be completed. Please use the menu on the template browser to add ',
  NoShare3rdPartyService: 'Hyperlinks to documents from this service can not be shared from other users directly. The owner would need to hyperlink using the public sharing URL for the document. ',
  DocumentCannotBeOpened: 'Document cannot be opened.  It may no longer exist, or the owner of the document has not shared it with you.',
  NotSharedWithYou: 'Document cannot be opened. The owner of that document has not shared it with you.',
  DocumentCanNotBeOpenedNotFound: 'Document cannot be opened. It is not found in ',
  DocumentNotFound: 'Document was not found',
  MaxLayersReached: 'The maximum number of layers has already been added to this document',
  LinkedOutside: 'Some of the objects you have selected to be part of a group are linked to other objects that are not part of the group. \nEither deselect these objects or select the objects that they are linked to.',
  GroupNonDelete: 'You cannot group permanent objects like project charts and similar diagrams',
  SpellUserDictDelete: 'Are you sure you want to delete the saved word list?  This operation cannot be undone.',
  LockIdle: '\n            <button><pfe-icon icon="fluent-locked" color="base"></pfe-icon>&nbsp;<span class="btn-label">Lock</span></button>\n        ',
  UnlockIdle: '\n          <button><pfe-icon icon="fluent-locked" color="base"></pfe-icon>&nbsp;<span class="btn-label">Unlock</span></button>\n        ',
  PageName: 'Page ',
  PageErrorDup: 'A page with that name already exists.',
  PageErrorBad: 'Invalid page name. The page name cannot contain the following characters: *, ", \\, /, <, >, ?, :, |',
  PageDelete: 'Are you sure that you want to delete ',
  AllowTextEditing: '\n            <button><i class="icon-unlock-alt"></i> Allow Text Editing</button>\n        ',
  NoTextEditing: '\n            <button><i class="icon-unlock-alt"></i> Don\'t Allow Text Editing</button>\n        ',
  Annotation: 'Annotation',
  BackgroundLayer: 'Background',
  AnnotationLayerSDR: 'Annotation',
  AnnotationLayerArchSDR: 'AnnotationArch',
  AnnotationLayerAlreadyPresent: 'An annotation layer already is in place.  You must remove this layer before you can add the annotation layer',
  MyProject: 'My Project',
  Milestone: 'Milestone',
  Task: 'Task',
  WeekOf: 'Week of',
  GanttDependency: 'To make one or more tasks dependent on another, select their bars by holding down the shift key and clicking on them, and then select the master task by shift-clicking on it.',
  GanttOnlyOneMaster: 'The bottom task is already dependent on another task.  A task can only be dependent on one other task.',
  GanttDependencyCircular: 'A child task may not be dependent on its parent and vice versa. Tasks cannot be dependent on others that are dependent on them.',
  GanttRemoveDependency: 'To remove the dependency of a task  first select it by clicking on it, or select its row in the chart.',
  UI_Tab: 'Tab',
  UI_Radio: 'Radio Button',
  UI_Checkbox: 'Check Box',
  UI_Panel: 'Panel',
  UI_Item: 'Menu Item',
  UI_None: 'Select a UI Element',
  SDONVer: 'The version of SDON imported is not supported by this version of SmartDraw',
  NoCellsSelected: 'Before you can use this command you must select one or more cells in a table by clicking on it.',
  DeleteTasks: 'Before you can use this command you must select one or more task rows that are not the root task.',
  NoBoxSelected: 'Before you can use this command you must select a box in the chart by clicking on it.',
  MustHaveAtLeastOneWorkDaySelected: 'You must have at least one working day selected.',
  Error_FieldDataTableBad: 'Invalid table name',
  NewFieldDataTableTitle: 'Create Data Table',
  NewFieldDataTablePrompt: 'Enter name for new data table',
  RenameFieldDataTableTitle: 'Rename Data Table',
  RenameFieldDataTablePrompt: 'Enter new name for data table',
  DeleteDataFieldPrompt: 'Deleting field will delete all data associated with this field.  Do you wish to continue?',
  RemoveShapeDataPrompt: 'This will delete all data for the selected shape.  Do you wish to continue?',
  DeleteDataTablePrompt: 'This will delete all data for all shapes associated with this schema, and remove this data table.  Do you wish to continue?',
  ChangeDataSchemaPrompt: 'Do you want to convert currently selected shape to use selected schema?  Some data may be lost.',
  DeleteDataRuleCondition: 'This will delete this rule condition.  Do you wish to continue?',
  DeleteDataRuleSet: 'This will delete this rule set, and will affect the visuals for any shape that this is attached to.  Do you wish to continue?',
  DeleteDataPresetList: 'This will delete this preset list.  Do you wish to continue?',
  DataExportNoData: 'No shapes found with attached data',
  NewFieldName: 'Field ',
  FieldTableSelectNone: 'Add Data Table',
  UnlinkDataButton: 'Detach Shape Data',
  LinkDataButton: 'Attach Shape Data',
  ShowDataIcon: 'Show Shape Data',
  HideDataIcon: 'Hide Shape Data',
  DataImportErr_LineCount: 'The text file must contain more than one line of text separated by CR',
  DataImportErr_FieldCount: 'Each line in the text file must contain one or more fields separated by a comma',
  DataImportErr_FieldCountMismatch: 'Each line in the text file must contain same number of fields separated by a comma',
  DataImportErr_NoUniqueFields: 'There are no fields that have unique data.  Each record must contain unique data in at least one field to allow for matching data records during re-import.',
  DataImportErr_FieldUpdateMismatch: 'The fields don\'t match up with the existing data',
  DataImportErr_Generic: 'Error importing data',
  GanttDropError: 'You cannot move this task here.',
  FullyIndented: 'The selected tasks are fully indented',
  FullyOutdented: 'The selected tasks are fully outdented',
  CreateTrelloCard: 'Create Trello Card',
  UnlinkTrelloCard: 'Unlink Trello Card',
  CreateTrelloCardMenu: '\n            <button><i class="icon-plus"></i> Create Trello Card</button>\n        ',
  UnlinkTrelloCardMenu: '\n            <button><i class="icon-plus"></i> Unlink Trello Card</button>\n        ',
  TrelloBoardPrompt: 'Board Name',
  TrelloLanePrompt: 'Lane',
  TrelloMemberPrompt: 'Members',
  TrelloMustSelectTask: 'Must have selected a task',
  TrelloMustChooseBoard: 'You must choose a board name',
  TrelloMustChooseLane: 'You must choose a lane',
  TrelloMustAssignTrelloMembers: 'This document contains tasks that are linked to one or more Trello cards.  You may only assign users that are members of the associated Trello board',
  FloorPlanStopAddingWalls: 'Stop Adding Walls',
  FloorPlanStartAddingWalls: 'Add Single Wall',
  InvalidFontSize: 'Invalid font Size. Must be between 4 and 400',
  CouldNotSetDimension: 'Dimension could not be set',
  RetryTrelloCreate: 'Login information for Trello has expired (or is not valid).  Please close this dialog and try again',
  SwimlaneLabel: 'Person/Group',
  Swimlane_Missing: 'First add swimlanes using the buttons above.',
  DeleteComment: 'Delete Comment?',
  NoShapeConnector: 'To use this command you must first select a shape attached to an automatic connector',
  LineThicknessDialogTitle: 'Set Line or Border Thickness',
  LineThicknessDialogTitle_Wall: 'Set Wall Thickness',
  TrialNoPrint: 'You\'ll need to buy SmartDraw before you can print, share  or export.',
  TrialNoPrintNoExport: 'You\'ll need to buy SmartDraw before you can print or share.',
  TrialNoPrintNoShare: 'You\'ll need to buy SmartDraw before you can print or export.',
  FrameTitle: 'Title',
  SelectGantt: 'You must first select a Gantt chart.',
  SelectTimeline: 'You must first select a Timeline',
  BelowMinDateTimeline: 'Select a date after 01/01/1300',
  ImportSelect: 'First select a shape in the diagram you want to replace with an import.',
  NoChangeShape: 'The shapes selected cannot be changed.'
}

Resources.ReplaceTextStrings = [
  'Click To Add',
  'Double Click To Add',
  'Click to Add Text',
  'Double Click to Add Text',
  'Enter Person',
  'Enter Task'
]
Resources.ReplaceTextStrings.Indexes = {
  Click: 2,
  DoubleClick: 3,
  PersonClick: 4,
  TaskClick: 5
}



Resources.ShareAccessType = {
  Unknown: - 1,
  None: 0,
  ReadOnly: 1,
  ReadWrite: 2,
  Admin: 3,
  Owner: 4
}

Resources.CloudContentType = {
  None: 0,
  Document: 1,
  Folder: 2
}

Resources.DocumentStatusFlags = {
  None: 0,
  CheckedOutInWindows: 1
}

Resources.Document = function () {
  this.ID = - 1,
    this.OwnerUserID = - 1,
    this.RequestingUserAccessLevel = Resources.ShareAccessType.Unknown,
    this.DateCreated = null,
    this.DateChanged = null,
    this.ChangedBy = null,
    this.ChangedByUserID = - 1,
    this.Archived = !1,
    this.Name = null,
    this.FullPath = null,
    this.FolderID = - 1,
    this.CheckedOut = null,
    this.CheckedOutBy = - 1,
    this.Timestamp = - 1,
    this.DocumentStatus = Resources.DocumentStatusFlags.None,
    this.FromJSON = function (e) {
      return $.extend(!0, this, e),
        this.DateCreated = Utils.ParseEpochDate(e.DateCreated),
        this.DateChanged = Utils.ParseEpochDate(e.DateChanged),
        this
    }
}

Resources.Folder = function () {
  this.ID = - 1,
    this.OwnerUserID = - 1,
    this.RequestingUserAccessLevel = Resources.ShareAccessType.Unknown,
    this.DateCreated = null,
    this.DateChanged = null,
    this.ChangedBy = null,
    this.ChangedByUserID = - 1,
    this.Archived = !1,
    this.Name = null,
    this.FullPath = null,
    this.ParentFolderID = - 1,
    this.FromJSON = function (e) {
      return $.extend(!0, this, e),
        this.DateCreated = Utils.ParseEpochDate(e.DateCreated),
        this.DateChanged = Utils.ParseEpochDate(e.DateChanged),
        this
    },
    this.ToFolderPreview = function (e) {
      var t = new Resources.FolderPreviewItem;
      return t.ItemId = this.ID,
        t.ContentTitle = this.Name,
        t.ContentType = Resources.FilePreviewType.Folder,
        t.FolderPath = '/' + this.FullPath + '/' + this.ContentTitle + '/',
        t.ContainingFolder = '/' + this.FullPath + '/',
        t.DepositoryId = t.FolderPath,
        t.Depository = Resources.Depostiory.SDJS,
        t
    }
}

Resources.PublicDocumentShare = function () {
  this.DocumentID = - 1,
    this.URLToken = null,
    this.DateCreated = null,
    this.DateChanged = null,
    this.ChangedBy = null,
    this.ChangedByUserID = - 1,
    this.ShareAccessType = Resources.ShareAccessType.None,
    this.DomainsWithAccess = null,
    this.FromJSON = function (e) {
      return $.extend(!0, this, e),
        this.DateCreated = Utils.ParseEpochDate(e.DateCreated),
        this.DateChanged = Utils.ParseEpochDate(e.DateChanged),
        this
    }
}

Resources.ThirdPartyImageShare = function () {
  this.ID = - 1,
    this.URLToken = null,
    this.DateCreated = null,
    this.DateChanged = null,
    this.ChangedBy = null,
    this.FileDepositoryID = null,
    this.Depository = null,
    this.FromJSON = function (e) {
      return $.extend(!0, this, e),
        this.DateCreated = Utils.ParseEpochDate(e.DateCreated),
        this.DateChanged = Utils.ParseEpochDate(e.DateChanged),
        this
    }
}

Resources.DocumentShare = function () {
  this.DocumentID = - 1,
    this.SharedToUserID = - 1,
    this.DateCreated = null,
    this.DateChanged = null,
    this.ChangedBy = null,
    this.ChangedByUserId = - 1,
    this.Archived = !1,
    this.ShareAccessTypeID = Resources.ShareAccessType.None,
    this.FromJSON = function (e) {
      return $.extend(!0, this, e),
        this.DateCreated = Utils.ParseEpochDate(e.DateCreated),
        this.DateChanged = Utils.ParseEpochDate(e.DateChanged),
        this
    }
}

Resources.PublicFolderShare = function () {
  this.FolderID = - 1,
    this.URLToken = null,
    this.DateCreated = null,
    this.DateChanged = null,
    this.ChangedBy = null,
    this.ChangedByUserID = - 1,
    this.ShareAccessType = Resources.ShareAccessType.None,
    this.DomainsWithAccess = null,
    this.FromJSON = function (e) {
      return $.extend(!0, this, e),
        this.DateCreated = Utils.ParseEpochDate(e.DateCreated),
        this.DateChanged = Utils.ParseEpochDate(e.DateChanged),
        this
    }
}

Resources.FolderShare = function () {
  this.FolderID = - 1,
    this.SharedToUserID = - 1,
    this.DateCreated = null,
    this.DateChanged = null,
    this.ChangedBy = null,
    this.ChangedByUserId = - 1,
    this.Archived = !1,
    this.ShareAccessTypeID = Resources.ShareAccessType.None,
    this.FromJSON = function (e) {
      return $.extend(!0, this, e),
        this.DateCreated = Utils.ParseEpochDate(e.DateCreated),
        this.DateChanged = Utils.ParseEpochDate(e.DateChanged),
        this
    }
}

Resources.User = function () {
  this.Id = - 1,
    this.ChangedBy = null,
    this.DateCreated = null,
    this.DateChanged = null,
    this.Archived = !1,
    this.LicenseAgreement = null,
    this.DateActivated = null,
    this.Name = null,
    this.FromJSON = function (e) {
      return $.extend(!0, this, e),
        this.DateCreated = Utils.ParseEpochDate(e.DateCreated),
        this.DateChanged = Utils.ParseEpochDate(e.DateChanged),
        this.LicenseAgreement = Utils.ParseEpochDate(e.LicenseAgreement),
        this.DateActivated = Utils.ParseEpochDate(e.DateActivated),
        this
    }
}

Resources.ShareEntry = function () {
  this.Share = null,
    this.User = null
}

Resources.UserSettings = function () {
  this.UserID = - 1,
    this.DateChanged = null,
    this.LastOpenedFilePath = null,
    this.LastFilePathDepository = null != window.SDTD &&
      null != SDTD.Resources ? SDTD.Resources.Depostiory.None : Resources.Depositories.None,
    this.LastTemplate = null,
    this.LastTemplateLibrary = null,
    this.LastContentRefresh = null,
    this.ShowGrid = !1,
    this.RecentColors = [],
    this.PaperSize = 0,
    this.Metric = !1,
    this.HelpTipStatus = 0,
    this.SpellCheck = !0,
    this.SpellDict = null,
    this.SpellFlags = 0,
    this.UseThumbnails = !1,
    this.ExpirationWarning = null,
    this.DisableCtrlArrowShapeInsert = !1,
    this.UseSDVersion = '',
    this.UseDashboard = null,
    this.CollapseRibbon = !1,
    // this.UserCollaborationName = '',
    this.CursorDisplayMode = Resources.CursorDisplayMode.Show,
    // this.UserNameDisplayMode = Resources.CollabNamePreference.None,
    this.DashboardUserSettings = null,
    this.FromJSON = function (e) {
      if (
        $.extend(!0, this, e),
        this.DateCreated = Utils.ParseEpochDate(e.DateCreated),
        this.LastContentRefresh = Utils.ParseEpochDate(e.LastContentRefresh),
        'string' == typeof e.DashboardUserSettings
      ) try {
        this.DashboardUserSettings = JSON.parse(e.DashboardUserSettings)
      } catch (e) {
        this.DashboardUserSettings = null
        throw e
      }
      return this
    }
}

Resources.CloudShareEmail = function () {
  this.ID = - 1,
    this.FromUserID = - 1,
    this.Recipients = [],
    this.DocumentID = - 1,
    this.Message = null,
    this.ContentType = 0,
    this.FromJSON = function (e) {
      $.extend(!0, this, e);
      for (var t = e.length, a = 0; a < t; a++) this.Recipients[a] = new Resources.DocumentShareEmailSend,
        this.Recipients[a].FromJSON(e.Recipients[a]);
      return this
    }
}

Resources.CloudShareEmailSend = function () {
  this.CloudShareEmailID = - 1,
    this.RecipientEmail = null,
    this.RecipientUserID = - 1,
    this.AccessLevel = Resources.ShareAccessType.Unknown,
    this.FromJSON = function (e) {
      return $.extend(!0, this, e),
        this
    }
}

Resources.CloudContentType = {
  None: 0,
  File: 1,
  Folder: 2
}

Resources.CloudFileFlags = {
  None: 0,
  IsUntitled: 1,
  IsCheckedOutInWindows: 2,
  IsShared: 4,
  IsTemplate: 8
}

Resources.CloudFolderFlags = {
  None: 0,
  IsRoot: 1,
  IsVirtual: 2,
  IsShared: 4,
  IsServiceEndpoint: 8,
  IsSite: 16,
  IsCheckoutRequired: 32
}

Resources.CloudSortBy = {
  None: 0,
  ContentTitle: 1,
  DateModified: 2
}

Resources.CloudSortOrder = {
  None: 0,
  Ascending: 1,
  Descending: 2
}

Resources.CloudPermissions = {
  Unknown: - 1,
  None: 0,
  CanRead: 1,
  CanWrite: 2,
  CanDelete: 4,
  CanRename: 8,
  CanRemoveItemFromFolder: 16,
  CanShare: 32,
  CanRollback: 64,
  CanCreate: 128
}

Resources.CloudIdentifierType = {
  None: 0,
  NumericID: 1,
  FullPath: 2,
  DepositoryID: 3
}

Resources.ImportFileStatusStep = {
  NotStarted: 0,
  FileCreated: 1,
  FileCheckedOut: 2,
  ChunkUploaded: 3,
  FileDataWriteComplete: 4,
  FileCheckedIn: 5,
  ImportComplete: 6
}

Resources.CloudPermissionsCheck = {
  GetPermission: function (e) {
    if (null == e) return null;
    var t = null;
    return 'number' != typeof (t = 'number' == typeof e ? e : void 0 === e.Permission ? null : e.Permission) &&
      (t = null),
      t
  },
  CanRead: function (e) {
    var t = this.GetPermission(e);
    return null != t &&
      Utils.HasFlag(t, Resources.CloudPermissions.CanRead)
  },
  CanWrite: function (e) {
    var t = this.GetPermission(e);
    return null != t &&
      Utils.HasFlag(t, Resources.CloudPermissions.CanWrite)
  },
  CanCreate: function (e) {
    var t = this.GetPermission(e);
    return null != t &&
      Utils.HasFlag(t, Resources.CloudPermissions.CanCreate)
  },
  CanDelete: function (e) {
    var t = this.GetPermission(e);
    return null != t &&
      Utils.HasFlag(t, Resources.CloudPermissions.CanDelete)
  },
  CanRename: function (e) {
    var t = this.GetPermission(e);
    return null != t &&
      Utils.HasFlag(t, Resources.CloudPermissions.CanRename)
  },
  CanRemoveItemFromFolder: function (e) {
    var t = this.GetPermission(e);
    return null != t &&
      Utils.HasFlag(t, Resources.CloudPermissions.CanRemoveItemFromFolder)
  }
}

Resources.CloudFile = function () {
  this.ID = - 1,
    this.CredentialID = - 1,
    this.SmartDrawUserID = - 1,
    this.DepositoryOwnerEntityID = null,
    this.DepositoryID = null,
    this.DateCreated = null,
    this.Depository = Resources.Depositories.None,
    this.Name = null,
    this.FullPath = null,
    this.ContainingFolderDepositoryID = null,
    this.Permission = Resources.CloudPermissions.None,
    this.ContentType = Resources.CloudContentType.File,
    this.Archived = !1,
    this.CheckedOutBy = null,
    this.DateModified = null,
    this.FileFlags = Resources.CloudFileFlags.None,
    this.ThumbnailToken = null,
    this.IsShared = !1,
    this.CommonFolder = !1,
    this.DocumentShared = !1,
    this.FolderShared = !1
}

Resources.CloudFile.prototype.FromJSON = function (e) {
  $.extend(this, e),
    this.DateModified = Utils.ParseEpochDate(this.DateModified),
    this.DateCreated = Utils.ParseEpochDate(this.DateCreated)
}

Resources.CloudFolder = function () {
  this.ID = - 1,
    this.CredentialID = - 1,
    this.SmartDrawUserID = - 1,
    this.DepositoryOwnerEntityID = null,
    this.DepositoryID = null,
    this.DateCreated = null,
    this.DateModified = null,
    this.Depository = Resources.Depositories.None,
    this.Name = null,
    this.FullPath = null,
    this.ContainingFolderDepositoryID = null,
    this.Permission = Resources.CloudPermissions.None,
    this.ContentType = Resources.CloudContentType.File,
    this.Archived = !1,
    this.DateModified = new Date(Date.now()),
    this.FolderFlags = Resources.CloudFolderFlags.None,
    this.CommonFolder = !1,
    this.FolderShared = !1
}

Resources.CloudFolder.prototype.FromJSON = function (e) {
  $.extend(this, e),
    this.DateCreated = Utils.ParseEpochDate(this.DateCreated),
    this.DateModified = Utils.ParseEpochDate(this.DateModified)
}

Resources.CloudCredentialStatus = {
  OK: 0,
  Invalid: 1
}

Resources.CloudCredentialPreview = function () {
  this.UserID = - 1,
    this.CredentialID = - 1,
    this.Depository = Resources.Depositories.None,
    this.DepositoryUserID = null,
    this.DepositoryAccountID = null,
    this.UserName = null,
    this.CredentialStatus = Resources.CloudCredentialStatus.OK
}

Resources.CloudCredentialPreview.prototype.FromJSON = function (e) {
  $.extend(this, e)
}

Resources.DisplayCloudItem = function () {
  this.CloudItem = null,
    this.DisplayName = '',
    this.DisplayDate = '',
    this.DisplayImageURL = '',
    this.DocumentURL = '',
    this.DisplayDepository = '',
    this.TemplateClass = '',
    this.ListViewIcon = 'icon-sdcloud',
    this.DepositoryClassName = null,
    this.FolderShareClass = null
}

// Resources.DisplayCloudItem.MakeDisplayItem = function (e) {
//   if (null == e) return null;
//   var t = new Resources.DisplayCloudItem;
//   t.CloudItem = e,
//     t.DisplayDepository = Resources.Depositories.GetName(e.Depository),
//     null != e.DateModified ? t.DisplayDate = Utils.GetDateString(e.DateModified) : t.DisplayDate = '';
//   var a = Resources.Depositories.GetName(e.Depository);
//   if (
//     null != a &&
//     '' !== a &&
//     (
//       t.DepositoryClassName = 'depo-' + a.toLowerCase().replace(/ /g, '-')
//     ),
//     e.ContentType === Resources.CloudContentType.File
//   ) {
//     if (
//       null == e.Name ||
//       e.Name.toLowerCase().lastIndexOf('.sdr') !== e.Name.length - 4 &&
//       e.Name.toLowerCase().lastIndexOf('.sdt') !== e.Name.length - 4 ||
//       (t.DisplayName = e.Name.substring(0, e.Name.length - 4)),
//       void 0 !== window.SDTD
//     ) {
//       t.DocumentURL = SDTD.Constants.URL_SDJS + '?' + Constants.QS_CredentialID + '=' + e.CredentialID + '&' + Constants.QS_DepositoryID + '=' + Utils.EncodeURL(e.DepositoryID),
//         t.DocumentURL = Utils.GetStandardQueryStringParameters(t.DocumentURL),
//         !0 === AppSettings.Iframe &&
//         (t.DocumentURL = '');
//       var r = null;
//       null !== e.DateModified &&
//         (r = e.DateModified.getTime()),
//         t.DisplayImageURL = Utils.cacheBustUrl(
//           Constants.URL_Cloud + 'cloudstorage/' + e.ID + '/preview.png?tdtoken=' + e.ThumbnailToken + '&ownerId=' + e.SmartDrawUserID + '&depo=' + e.Depository + (null == r ? '' : '&modifiedat=' + r) + '&cb=' + Math.random().toString(36)
//         ),
//         FileSource.IsTemplate(e) &&
//         (
//           t.TemplateClass = 'sdTemplate',
//           t.ListViewIcon = 'icon-sdTemplate'
//         )
//     }
//   } else {
//     if (e.ContentType !== Resources.CloudContentType.Folder) return null;
//     {
//       t.DisplayName = e.Name;
//       var i = null;
//       AppSettings.AreTemplateDialogControlsAvailable() ? i = AppSettings.AreDashboardControlsAvailable() ? SDDash.Resources.CurrentSession.User.ID : SDTD.Resources.CurrentSession.User.ID : AppSettings.AreEditorControlsAvailable() &&
//         (i = ConstantData.DocumentContext.UserId);
//       let a = e.ID === - i ||
//         e.Depository === Resources.Depositories.SDJS &&
//         e.ID < 0;
//       a = a ||
//         !0 === Utils.HasFlag(e.FolderFlags, Resources.CloudFolderFlags.IsVirtual) &&
//         - 1 !== e.Name.toLowerCase().indexOf('share'),
//         e.CommonFolder ||
//           !0 === Utils.HasFlag(e.FolderFlags, Resources.CloudFolderFlags.IsShared) ||
//           null != i &&
//           i != e.SmartDrawUserID ||
//           a ? AppSettings.AreDashboardControlsAvailable() &&
//         (e.FolderShareClass = SDDash.Constants.CSS_SharedFolder) : e.FolderShareClass = null,
//         e.Depository !== Resources.Depositories.DropBox ? t.DisplayDate = Utils.GetDateString(e.DateCreated) : t.DisplayDate = ''
//     }
//   }
//   return t
// }

// Resources.CloudItemList = function () {
//   this.DisplayCloudItem = null,
//     this.Items = []
// }

Resources.ImportFileStatus = function () {
  this.ImportStatus = Resources.ImportFileStatusStep.NotStarted,
    this.StepSuccess = !0,
    this.CloudFile = null,
    this.TotalBytes = 0,
    this.BytesSent = 0
}

Resources.CloudTrackingSession = function () {
  this.SessionID = - 1,
    this.UserAgent = null,
    this.UserID = - 1,
    this.DocumentID = - 1
}

Resources.CloudTrackingEvent = function () {
  this.SessionID = - 1,
    this.EventType = null,
    this.EventData = null,
    this.SessionSeconds = 0
}

Resources.CloudEvents = {
  APP_START: 'APP_EDITOR_START',
  APP_CLOSE: 'APP_EDITOR_CLOSE',
  APP_CRASH: 'APP_EDITOR_CRASH',
  APP_DOC_SWITCH: 'APP_EDITOR_DOC_SWITCH',
  TEMPLATE_DIALOG_START: 'APP_TEMPLATE_DIALOG_START',
  TEMPLATE_DIALOG_CRASH: 'APP_TEMPLATE_DIALOG_CRASH',
  TEMPLATE_DIALOG_CLOSE: 'APP_TEMPLATE_DIALOG_CLOSE',
  APP_KEYCOMMAND: 'APP_KEYCOMMAND',
  BACKPLANE_SEND: 'BACKPLANE_SEND',
  BACKPLANE_RECEIVE: 'BACKPLANE_RECEIVE',
  BACKPLANE_INFO: 'BACKPLANE_INFO',
  BACKPLANE_CONNECT_REQEUST: 'BACKPLANE_CONNECT_REQUEST',
  BACKPLANE_CONNECT: 'BACKPLANE_CONNECT',
  BACKPLANE_CONNECTION_REFUSED: 'BACKPLANE_CONNECTION_REFUSED',
  BACKPLANE_RECONNECT: 'BACKPLANE_RECONNECT',
  BACKPLANE_DISCONNECT: 'BACKPLANE_DISCONNECT',
  BACKPLANE_DISCONNECT_REQUEST: 'BACKPLANE_DISCONNECT_REQEUST',
  BACKPLANE_SOCKET_CRASH: 'BACKPLANE_SOCKET_CRASH',
  BACKPLANE_SOCKET_CLOSE: 'BACKPLANE_SOCKET_CLOSE',
  BACKPLANE_SOCKET_OPEN: 'BACKPLANE_SOCKET_OPEN',
  BACKPLANE_SOCKET_RECONNECT_ATTEMPT: 'BACKPLANE_SOCKET_RECONNECT_ATTEMPT',
  BACKPLANE_SOCKET_RECONNECT_FAILED: 'BACKPLANE_SOCKET_RECONNECT_FAILED',
  BACKPLANE_ERROR: 'BACKPLANE_ERROR',
  // BACKPLANE_COLLAB_ERROR: 'BACKPLANE_COLLAB_ERROR'
}

// Utils.Logger = {
//   AttributesToSkip: [
//     'id',
//     'class',
//     'disabled',
//     'style'
//   ],
//   CommandsToSkip: [
//     'FilePicker.UI_FilterCharacters',
//     'ShareDialog.UI_EmailEntryInputKeydown'
//   ],
//   QueuedMessages: [],
//   SessionStartTime: - 1,
//   BatchLogTimer: null,
//   Sending: !1,
//   StartSession: function () {
//     if (
//       !1 !== AppSettings.ServerLoggingEnabled &&
//       !(ConstantData.DocumentContext.LoggingSessionID > 0)
//     ) {
//       var e = new Resources.CloudTrackingSession;
//       e.UserID = ConstantData.DocumentContext.UserId,
//         e.UserAgent = window.navigator.userAgent;
//       var t = - 1;
//       null != ConstantData.DocumentContext.CloudFileMetadata &&
//         ConstantData.DocumentContext.CloudFileMetadata.Depository === Resources.Depositories.SDJS &&
//         (
//           (
//             t = ConstantData.DocumentContext.CloudFileMetadata.DepositoryID
//           ) < 0 &&
//           (t = - 1),
//           null == t &&
//           (t = - 1)
//         ),
//         e.DocumentID = t,

//         // $.ajax(
//         //   Constants.URL_CMS + Constants.URL_SDCloud_Users + 'CreateLoggingSession/',
//         //   {
//         //     type: 'POST',
//         //     async: !0,
//         //     contentType: 'application/json',
//         //     dataType: 'json',
//         //     xhrFields: {
//         //       withCredentials: !0
//         //     },
//         //     data: JSON.stringify(e),
//         //     success: function (e) {
//         //       Utils.Logger.SessionStartTime = Date.now(),
//         //       ConstantData.DocumentContext.LoggingSessionID = parseInt(e, 0),
//         //       Utils.Logger.LogMessage(Resources.CloudEvents.APP_START, document.location.href)
//         //     },
//         //     error: function (e) {
//         //       ConstantData.DocumentContext.LoggingSessionID = - 1
//         //     }
//         //   }
//         // )

//         (
//           Utils.Logger.SessionStartTime = Date.now(),
//           ConstantData.DocumentContext.LoggingSessionID = 191419182,
//           Utils.Logger.LogMessage(Resources.CloudEvents.APP_START, document.location.href)
//         )
//     }
//   },
//   ChangeSessionDocument: function (e) {
//     if (!1 !== AppSettings.ServerLoggingEnabled) {
//       null == e &&
//         (e = ConstantData.DocumentContext.CloudFileMetadata);
//       var t = e.DepositoryID;
//       (new Resources.CloudTrackingSession).DocumentID = t,
//         $.ajax(
//           Constants.URL_CMS + Constants.URL_SDCloud_Users + '/UpdateSessionDocument/?sessionID=' + ConstantData.DocumentContext.LoggingSessionID + '&documentID=' + t,
//           {
//             type: 'POST',
//             async: !0,
//             contentType: 'application/json',
//             dataType: 'json',
//             success: function (e) {
//             },
//             error: function (e) {
//             }
//           }
//         )
//     }
//   },
//   CloseSession: function () {
//     !1 !== AppSettings.ServerLoggingEnabled &&
//       $.ajax(
//         Constants.URL_CMS + Constants.URL_SDCloud_Users + '/CloseSession/?sessionID=' + ConstantData.DocumentContext.LoggingSessionID,
//         {
//           type: 'POST',
//           async: !1,
//           contentType: 'application/json',
//           dataType: 'json',
//           data: JSON.stringify(this.QueuedMessages),
//           success: function (e) {
//           },
//           error: function (e) {
//           }
//         }
//       )
//   },
//   GetAttributeString: function (e) {
//     if (!1 !== AppSettings.ServerLoggingEnabled) {
//       for (var t = '', a = e.attributes.length, r = 0; r < a; r++) {
//         var i = e.attributes[r];
//         if (
//           !1 !== i.specified &&
//           !1 !== Utils.Logger.ValidateAttribute(i.name)
//         ) {
//           var n = i.value;
//           null == n &&
//             (n = '(null)'),
//             n = (n = n.replace(/;/g, '%3B')).replace(/=/g, '%3D'),
//             t = t + i.name.toLowerCase() + '=' + n + ';'
//         }
//       }
//       return t
//     }
//   },
//   ValidateAttribute: function (e) {
//     if (!1 !== AppSettings.ServerLoggingEnabled) {
//       if (null == e) return !1;
//       if (
//         e = e.toLowerCase(),
//         Utils.Logger.AttributesToSkip.indexOf(e) > - 1
//       ) return !1;
//       for (var t in Constants) if (
//         0 === t.toLowerCase().indexOf('attr_') &&
//         null != Constants[t] &&
//         Constants[t].toLowerCase() === e
//       ) return !0;
//       return !1
//     }
//   },
//   LogCommand: function (e, t) {
//     if (!1 !== AppSettings.ServerLoggingEnabled) {
//       var a = new Resources.CloudTrackingEvent;
//       a.SessionID = ConstantData.DocumentContext.LoggingSessionID,
//         a.EventType = e,
//         t.currentTarget ? (
//           a.EventData = Utils.Logger.GetAttributeString(t.currentTarget),
//           Utils.Logger.QueueLoggedMessage(a)
//         ) : t.target &&
//         (
//           a.EventData = Utils.Logger.GetAttributeString(t.target),
//           Utils.Logger.QueueLoggedMessage(a)
//         )
//     }
//   },
//   LogError: function (e) {
//     console.log('=============LogError=============', e)
//     throw e;



//     if (!1 !== AppSettings.ServerLoggingEnabled) {
//       var t = new Resources.CloudTrackingEvent;
//       t.SessionID = ConstantData.DocumentContext.LoggingSessionID,
//         t.EventType = Resources.CloudEvents.APP_CRASH,
//         t.EventData = e,
//         Utils.Logger.QueueLoggedMessage(t)
//     }

//   },
//   LogMessage: function (e, t) {
//     console.log('=============LogMessage=============', e.message)


//     if (!1 !== AppSettings.ServerLoggingEnabled) {
//       var a = new Resources.CloudTrackingEvent;
//       a.SessionID = ConstantData.DocumentContext.LoggingSessionID,
//         a.EventType = e,
//         a.EventData = t,
//         Utils.Logger.QueueLoggedMessage(a)
//     }

//   },
//   LogBackplaneEvent: function (e, t, a) {
//     try {
//       var r = null,
//         i = null;
//       if (
//         !0 === SDBP.Utils.IsObject(t) ? (
//           !0 === SDBP.Utils.IsObject(t.Message) ? r = t.Message : !0 === SDBP.Utils.IsObject(t.ResponseMessage) ? r = t.ResponseMessage : null != SDBP.Utils.SocketMessageLogHelper.GetSocketMessageCode(t) ? r = t : t instanceof CloseEvent ? i = `Code: ${t.code}, WasClean: ${t.wasClean}, Reason: ${t.reason}` : t instanceof Event ? i = `EventType: ${t.type}` : t instanceof Error &&
//             (i = t.stack),
//           null != r &&
//           null == i &&
//           (i = SDBP.Utils.SocketMessageLogHelper.GetLogMessage(r, a))
//         ) : 'string' == typeof t &&
//         (i = t),
//         null == i
//       ) return;
//       this.LogMessage(e, i)
//     } catch (a) {
//     }
//   },
//   LogKeyboardCommand: function (e, t) {
//     if (!1 !== AppSettings.ServerLoggingEnabled) {
//       var a,
//         r = new Resources.CloudTrackingEvent;
//       r.SessionID = ConstantData.DocumentContext.LoggingSessionID,
//         r.EventType = Resources.CloudEvents.APP_KEYCOMMAND;
//       var i = null,
//         n = null;
//       for (a in Resources.Keys) if (Resources.Keys[a] === e) {
//         i = a;
//         break
//       }
//       for (a in Resources.ModifierKeys) if (Resources.ModifierKeys[a] === t) {
//         n = a;
//         break
//       }
//       null != i &&
//         (
//           r.EventData = null == n ? i : n + '+' + i,
//           Utils.Logger.QueueLoggedMessage(r)
//         )
//     }
//   },
//   QueueLoggedMessage: function (e) {
//     console.log('=============QueueLoggedMessage=============', e.message)

//     // throw e;

//     !1 !== AppSettings.ServerLoggingEnabled &&
//       null != e &&
//       null != e.EventType &&
//       '' !== e.EventType.replace(/ /g, '') &&
//       - 1 != ConstantData.DocumentContext.LoggingSessionID &&
//       (
//         ConstantData.DocumentContext.LoggingSessionID != e.SessionID &&
//         (e.SessionID = ConstantData.DocumentContext.LoggingSessionID),
//         - 1 === Utils.Logger.CommandsToSkip.indexOf(e.EventType) &&
//         (
//           - 1 != this.SessionStartTime &&
//           (e.SessionSeconds = (Date.now() - this.SessionStartTime) / 1000),
//           this.QueuedMessages.push(e),
//           this.QueuedMessages.length > 10 &&
//           !this.Sending &&
//           this.FlushQueue()
//         )
//       )

//   },
//   FlushQueue: function () {

//     console.log('=============FlushQueue=============')


//     !1 !== AppSettings.ServerLoggingEnabled &&
//       - 1 != ConstantData.DocumentContext.LoggingSessionID &&
//       this.QueuedMessages.length > 0 &&
//       !this.Sending &&
//       (
//         this.Sending = !0,
//         this.LogBatch(this.QueuedMessages),
//         this.QueuedMessages = [],
//         this.Sending = !1
//       )

//   },
//   LogEvent: function (e) {
//     console.log('=============LogEvent=============', e.message)


//     !1 !== AppSettings.ServerLoggingEnabled &&
//       null != e &&
//       null != e.EventType &&
//       '' !== e.EventType.replace(/ /g, '') &&
//       - 1 != ConstantData.DocumentContext.LoggingSessionID &&
//       (
//         ConstantData.DocumentContext.LoggingSessionID != e.SessionID &&
//         (e.SessionID = ConstantData.DocumentContext.LoggingSessionID),
//         - 1 === Utils.Logger.CommandsToSkip.indexOf(e.EventType) &&
//         (
//           - 1 != this.SessionStartTime &&
//           (e.SessionSeconds = (Date.now() - this.SessionStartTime) / 1000),
//           $.ajax(
//             Constants.URL_CMS + Constants.URL_SDCloud_Logging + 'LogEvent/',
//             {
//               type: 'POST',
//               async: !0,
//               contentType: 'application/json',
//               dataType: 'json',
//               data: JSON.stringify(e),
//               success: function (e) {
//               },
//               error: function (e) {
//               }
//             }
//           )
//         )
//       )

//   },
//   LogBatch: function (e) {

//     console.log('=============LogBatch=============', e)

//     // throw e;

//     /*
//     !1 !== AppSettings.ServerLoggingEnabled &&
//       null != e &&
//       $.ajax(
//         Constants.URL_CMS + Constants.URL_SDCloud_Logging + 'LogBatch/',
//         {
//           type: 'POST',
//           async: !0,
//           contentType: 'application/json',
//           dataType: 'json',
//           data: JSON.stringify(e),
//           success: function (e) {
//           },
//           error: function (e) {
//           }
//         }
//       )
//         */
//   }
// }

Resources.SearchResult = function () {
  this.CMSItems = [],
    this.FileItems = [],
    this.SymbolLibraries = [],
    this.FromJSON = function (e) {
      if (null != e) {
        if (null != e.CMSItems) for (var t = e.CMSItems.length, a = 0; a < t; a++) {
          var r = e.CMSItems[a];
          null != (
            i = Resources.PreviewType.InstantiatePreviewItem(r.ContentType)
          ) &&
            (
              i.FromJSON(r),
              i instanceof Resources.PreviewList &&
              (i.ListContentType = Resources.PreviewType.Symbol),
              this.CMSItems.push(i)
            )
        }
        if (null != e.SymbolLibraries) for (t = e.SymbolLibraries.length, a = 0; a < t; a++) {
          var i;
          r = e.SymbolLibraries[a];
          null != (
            i = Resources.PreviewType.InstantiatePreviewItem(r.ContentType)
          ) &&
            (
              i.FromJSON(r),
              i instanceof Resources.PreviewList &&
              (i.ListContentType = Resources.PreviewType.Symbol),
              this.SymbolLibraries.push(i)
            )
        }
      }
    }
}

Resources.PagedSDRFile = function () {
  var e = new ZipController;
  this.FileName = null,
    this.Manifest = new Resources.PagedSDRManifest,
    this.SDRType = Resources.SDRType.NonSDR,
    this.IsZip = function () {
      return e.Inititalized()
    },
    this.GetSDRType = function (e, t) {
      if (null == e || 'function' != typeof t) return !1;
      e.size < 8 &&
        t(Resources.SDRType.NonSDR);
      var a = new FileReader;
      a.onload = function (e) {
        for (
          var a = new DataView(e.target.result),
          r = Resources.SDRType.NonSDR,
          i = '',
          n = 0;
          n < 8;
          n++
        ) {
          var o = a.getUint8(n);
          i += String.fromCharCode(o)
        }
        r = 'smartdrw' === i.toLowerCase() ? Resources.SDRType.SDR : 'smartpgd' === i.toLowerCase() ? Resources.SDRType.PagedSDR : - 1 !== i.toLowerCase().indexOf('pk') ? Resources.SDRType.SignaturelessZip : SDF.IsSDON(e.target.result) ? Resources.SDRType.SDON : Resources.SDRType.NonSDR,
          t(r)
      },
        a.readAsArrayBuffer(e)
    },
    this.Load = function (t, a, r) {
      var n = 'function' == typeof r,
        o = this;
      this.FileName = a,
        this.GetSDRType(
          t,
          (
            function (a) {
              if (o.SDRType = a, a === Resources.SDRType.NonSDR) return n &&
                r(!1, 'Supplied file is not a SDR or a paged SDR.'),
                !1;
              if (
                a === Resources.SDRType.SDR ||
                a === Resources.SDRType.SDON
              ) return !0 === n &&
                r(!0),
                !0;
              if (
                a === Resources.SDRType.PagedSDR ||
                a === Resources.SDRType.SignaturelessZip
              ) {
                var s = function (e, t) {
                  null != e ? (o.Manifest.FromJSON(e), !0 === n && r(!0)) : !0 === n &&
                    r(!1, 'No manifest file present. Reason: ' + t)
                },
                  l = function (e, t) {
                    !0 === e ? i(o, s) : !0 === n &&
                      r(!1, 'Failed to read zip file. Reason: ' + t)
                  };
                return a === Resources.SDRType.SignaturelessZip ? (
                  o.SDRType = Resources.SDRType.PagedSDR,
                  e.CreateZip(t, l),
                  !0
                ) : (e.CreateZip(t.slice(8), l), !0)
              }
              return !0 === n &&
                r(!1),
                !1
            }
          )
        )
    },
    this.ConvertToZip = function (t, a) {
      return 'string' == typeof t &&
        (
          (!1 !== e.Inititalized() || 0 != e.CreateZip()) &&
          0 != this.AddPage(t, 0, a)
        )
    },
    this.AddPage = function (t, r, i) {
      return !1 !== this.IsZip() &&
        (
          - 1 === this.GetPageIndex(t) &&
          (
            '.sdr' !== t.substr(t.length - 4, 4).toLowerCase() &&
            (t += '.sdr'),
            0 != e.AddFile(t, i) &&
            (a(this.Manifest, t, r), !0)
          )
        )
    },
    this.RemovePage = function (t) {
      return !1 !== this.IsZip() &&
        (
          - 1 !== this.GetPageIndex(t) &&
          (
            0 != e.DeleteFile(t) &&
            (
              S(t),
              this.Manifest.Initial.toLowerCase() === t.toLowerCase() &&
              (this.Manifest.Initial = this.Manifest.TabOrder[0]),
              a(this.Manifest, t, - 1),
              !0
            )
          )
        )
    },
    this.UpdatePage = function (t, a) {
      return !1 !== this.IsZip() &&
        (- 1 !== this.GetPageIndex(t) && 0 != e.UpdateFile(t, a))
    },
    this.AddFile = function (t, a) {
      return !1 !== this.IsZip() &&
        (!0 !== this.FileExists(t) && 0 != e.AddFile(t, a))
    },
    this.UpdateFile = function (t, a) {
      return !1 !== this.IsZip() &&
        (!1 !== this.FileExists(t) && 0 != e.UpdateFile(t, a))
    },
    this.FileExists = function (t) {
      if ('string' != typeof t) return !1;
      var a = e.GetFiles();
      if (null == a || 0 === a.length) return !1;
      for (var r = t.toLowerCase(), i = a.length, n = 0; n < i; n++) {
        if (r === a[n].toLowerCase()) return !0
      }
      return !1
    },
    this.MovePage = function (e, t) {
      return !1 !== this.IsZip() &&
        (
          'string' == typeof e &&
          'number' == typeof t &&
          - 1 !== t &&
          (- 1 != this.GetPageIndex(e) && (a(this.Manifest, e, t), !0))
        )
    },
    this.SetDefaultPage = function (e) {
      return !1 !== this.IsZip() &&
        (
          'string' == typeof e &&
          (
            - 1 !== this.GetPageIndex(e) &&
            (this.Manifest.Initial = e, s(this.Manifest), !0)
          )
        )
    },
    this.RenamePage = function (t, a, r) {
      if (0 == this.IsZip() || 'string' != typeof a) return !1;
      if (- 1 !== this.GetPageIndex(a)) return !1;
      '.sdr' !== a.substr(a.length - 4, 4).toLowerCase() &&
        (a += '.sdr');
      var i = this.GetPageIndex(t);
      return - 1 !== i &&
        (
          this.Manifest.TabOrder[i] = a,
          this.Manifest.Initial.toLowerCase() === t.toLowerCase() &&
          (this.Manifest.Initial = a),
          s(this.Manifest),
          e.GetFileDataAsync(
            t,
            'blob',
            (
              function (i, n) {
                if (null != i) return e.AddFile(a, i),
                  e.DeleteFile(t),
                  'function' == typeof r ? c(t, a, r) : void 0;
                'function' == typeof r &&
                  r(!1, n)
              }
            )
          ),
          !0
        )
    },
    this.GetPagePath = function (e) {
      return 'number' != typeof e ||
        e < 0 ||
        e >= this.Manifest.TabOrder.length ? null : this.Manifest.TabOrder[e]
    },
    this.GetPageIndex = function (e) {
      return r(this.Manifest, e)
    },
    this.GetFileData = function (t, a) {
      return 'function' == typeof a &&
        (
          !1 === this.IsZip() ? (a(null, 'No zip file present.'), !1) : 'string' != typeof t ? (a(null, 'Invalid page name.'), !1) : !1 === this.FileExists(t) ? (a(null, 'Page does not exist in zip. PagedSDRFile.js'), !1) : e.GetFileDataAsync(t, 'blob', a)
        )
    },
    this.GetZipFileData = function (a, r) {
      if ('function' != typeof r) return !1;
      e.GetZipDataAsync(
        'arraybuffer',
        a,
        (
          function (e, a) {
            if (null != e) {
              var i = t(e);
              r(new Blob([i]))
            } else r(null, a)
          }
        )
      )
    },
    this.UpdateManifestTabOrder = function (e) {
      if (null == e) return !1;
      for (var t = this.Manifest.TabOrder.length, a = 0; a < t; a++) if (- 1 === e.TabOrder.indexOf(this.Manifest.TabOrder[a])) return !1;
      return this.Manifest.TabOrder = e.TabOrder,
        this.Manifest.Initial = e.Initial,
        s(this.Manifest),
        !0
    };
  var t = function (e) {
    if (null == e) return null;
    var t = new ArrayBuffer(e.byteLength + 8),
      a = new DataView(t);
    a.setUint8(0, 83),
      a.setUint8(1, 77),
      a.setUint8(2, 65),
      a.setUint8(3, 82),
      a.setUint8(4, 84),
      a.setUint8(5, 80),
      a.setUint8(6, 71),
      a.setUint8(7, 68);
    for (var r = new DataView(e), i = r.byteLength, n = 0; n < i; n++) a.setUint8(n + 8, r.getUint8(n));
    return t
  },
    a = function (e, t, a) {
      if (null != e && 'string' == typeof t && 'number' == typeof a) {
        var i = r(e, t);
        if (- 1 === a) {
          if (- 1 === i) return;
          e.TabOrder.splice(i, 1)
        } else if (- 1 === i) a >= e.TabOrder.length ? e.TabOrder.push(t) : e.TabOrder.splice(a, 0, t);
        else {
          var n = a;
          e.TabOrder.splice(i, 1),
            n > e.TabOrder.length ? e.TabOrder.push(t) : e.TabOrder.splice(n, 0, t)
        }
        s(e)
      }
    },
    r = function (e, t) {
      if (null == t || null == e) return - 1;
      for (var a = t.toLowerCase(), r = e.TabOrder.length, i = 0; i < r; i++) {
        var n = e.TabOrder[i];
        if ('string' == typeof n && n.toLowerCase() === a) return i
      }
      return - 1
    },
    i = function (t, a) {
      var r = 'function' == typeof a;
      e.GetFileDataAsync(
        'manifest.txt',
        'arraybuffer',
        (
          function (e, i) {
            if (null == e) !0 === r &&
              a(null, i);
            else {
              var s = new DataStream(e),
                S = '';
              e.byteLength % 2 == 0 &&
                (S = s.readUCS2String(e.byteLength / 2, DataStream.LITTLE_ENDIAN));
              var c = l(e);
              if (- 1 !== c.toLowerCase().indexOf('!base64!')) try {
                S = $.base64.atob(S.substring(8, S.length), !0)
              } catch (e) {
                return void (!0 === r && a(null, 'Base64 version of manifest is corrupt.'))
              } else - 1 !== c.toLowerCase().indexOf('version') &&
                (S = c);
              e = o(S);
              try {
                e = JSON.parse(e)
              } catch (e) {
                return n(t, a)
              }
              !0 === r &&
                a(e)
            }
          }
        )
      )
    },
    n = function (t, a) {
      var r = 'function' == typeof a;
      e.GetFileDataAsync(
        'manifest.txt',
        'base64',
        (
          function (e, t) {
            if (null == e) !0 === r &&
              a(null, t);
            else {
              var i = $.base64.atob(e);
              if (- 1 !== i.toLowerCase().indexOf('!base64!')) try {
                i = $.base64.atob(i.substring(8, i.length), !0)
              } catch (e) {
                return void (!0 === r && a(null, 'Base64 version of manifest is corrupt.'))
              }
              e = o(i);
              try {
                e = JSON.parse(e)
              } catch (e) {
                !0 === r &&
                  a(null, 'Invalid manifest JSON')
              }
              !0 === r &&
                a(e)
            }
          }
        )
      )
    },
    o = function (e) {
      if ('string' != typeof e) return null;
      var t = '{' + e.replace('�', '"V').replace(/(?!\B\"[^\"]*);(?![^\"]*\"\B)/g, ',').replace(/\r?\n|\r/g, '').replace(/\/\//g, '\\\\').replace(/\0/g, '').replace('",]', '"]').replace('ÿþ', '').replace('﻿', '') + '}';
      return t = t.replace(',}', '}')
    },
    s = function (t) {
      var a = t.ToFileString(),
        r = new ArrayBuffer(10),
        i = new DataStream(r);
      i.writeUCS2String(a, DataStream.LITTLE_ENDIAN, a.length),
        e.UpdateFile('manifest.txt', new Uint8Array(i.buffer))
    },
    l = function (e) {
      var t,
        a,
        r,
        i,
        n,
        o,
        s = new Uint8Array(e);
      for (t = '', r = s.length, a = 0; a < r;) switch ((i = s[a++]) >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          t += String.fromCharCode(i);
          break;
        case 12:
        case 13:
          n = s[a++],
            t += String.fromCharCode((31 & i) << 6 | 63 & n);
          break;
        case 14:
          n = s[a++],
            o = s[a++],
            t += String.fromCharCode((15 & i) << 12 | (63 & n) << 6 | (63 & o) << 0)
      }
      return t
    },
    S = function (t) {
      if (null != t) {
        '.sdr' === t.toLowerCase().substring(t.length - 4) &&
          (t = t.substring(0, t.length - 4));
        var a = t.toLowerCase(),
          r = e.GetFiles();
        if (null != r && 0 !== r.length) for (var i = r.length, n = 0; n < i; n++) {
          var o = r[n],
            s = o.lastIndexOf('.');
          - 1 !== s &&
            (o = o.substring(0, s)),
            o.toLowerCase() === a &&
            e.DeleteFile(r[n])
        }
      }
    },
    c = function (t, a, r) {
      if (null != t && null != a) {
        '.sdr' === t.toLowerCase().substring(t.length - 4) &&
          (t = t.substring(0, t.length - 4)),
          '.sdr' === a.toLowerCase().substring(a.length - 4) &&
          (a = a.substring(0, a.length - 4));
        var i = t.toLowerCase(),
          n = [],
          o = [],
          s = e.GetFiles();
        if (null != s && 0 !== s.length) {
          for (var l = s.length, S = 0; S < l; S++) {
            var c = s[S],
              p = c.lastIndexOf('.');
            if (- 1 !== p) {
              var d = c.substring(0, p),
                D = s[S].substring(p);
              d.toLowerCase() === i &&
                n.push({
                  OldName: s[S],
                  NewName: a + D
                })
            }
          }
          if (0 === n.length) return r(!0);
          var g = n.length;
          for (S = 0; S < g; S++) {
            var h = n[S];
            u(
              h.OldName,
              h.NewName,
              (function () {
                o.push(h),
                  o.length === n.length &&
                  r(!0)
              })
            )
          }
        }
      }
    },
    u = function (t, a, r) {
      e.GetFileDataAsync(
        t,
        'blob',
        (
          function (i, n) {
            null != i &&
              (e.AddFile(a, i), e.DeleteFile(t), 'function' == typeof r && r(!0))
          }
        )
      )
    }
}

Resources.SDRType = {
  NonSDR: 0,
  SDR: 1,
  PagedSDR: 2,
  SignaturelessZip: 3,
  SDON: 4
}

Resources.PagedSDRFile2 = function () {
  var e = new ZipController;
  this.FileName = null,
    this.Manifest2 = new Resources.PagedSDRManifest2,
    this.SDRType = Resources.SDRType.NonSDR,
    this.IsZip = function () {
      return e.Inititalized()
    },
    this.GetSDRType = function (e, t) {
      if (null == e || 'function' != typeof t) return !1;
      e.size < 8 &&
        t(Resources.SDRType.NonSDR);
      var a = new FileReader;
      a.onload = function (e) {
        for (
          var a = new DataView(e.target.result),
          r = Resources.SDRType.NonSDR,
          i = '',
          n = 0;
          n < 8;
          n++
        ) {
          var o = a.getUint8(n);
          i += String.fromCharCode(o)
        }
        r = 'smartdrw' === i.toLowerCase() ? Resources.SDRType.SDR : 'smartpgd' === i.toLowerCase() ? Resources.SDRType.PagedSDR : - 1 !== i.toLowerCase().indexOf('pk') ? Resources.SDRType.SignaturelessZip : SDF.IsSDON(e.target.result) ? Resources.SDRType.SDON : Resources.SDRType.NonSDR,
          t(r)
      },
        a.readAsArrayBuffer(e)
    },
    this.Load = function (t, a, r) {
      var i = 'function' == typeof r,
        n = this;
      this.FileName = a,
        this.GetSDRType(
          t,
          (
            function (a) {
              if (n.SDRType = a, a === Resources.SDRType.NonSDR) return i &&
                r(!1, 'Supplied file is not a SDR or a paged SDR.'),
                !1;
              if (
                a === Resources.SDRType.SDR ||
                a === Resources.SDRType.SDON
              ) return !0 === i &&
                r(!0),
                !0;
              if (
                a === Resources.SDRType.PagedSDR ||
                a === Resources.SDRType.SignaturelessZip
              ) {
                var s = function (e, t) {
                  null != e ? (n.Manifest2.FromJSON(e), !0 === i && r(!0)) : !0 === i &&
                    r(!1, 'No manifest file present. Reason: ' + t)
                },
                  l = function (e, t) {
                    !0 === e ? o(n, s) : !0 === i &&
                      r(!1, 'Failed to read zip file. Reason: ' + t)
                  };
                return a === Resources.SDRType.SignaturelessZip ? (
                  n.SDRType = Resources.SDRType.PagedSDR,
                  e.CreateZip(t, l),
                  !0
                ) : (e.CreateZip(t.slice(8), l), !0)
              }
              return !0 === i &&
                r(!1),
                !1
            }
          )
        )
    },
    this.ConvertToZip = function (t, a, r) {
      return 'string' == typeof pagePath &&
        (
          (!1 !== e.Inititalized() || 0 != e.CreateZip()) &&
          0 != this.AddPage(t, a, 0, r)
        )
    },
    this.AddPage = function (t, r, i, n) {
      return !1 !== this.IsZip() &&
        (
          - 1 === this.GetPageIndex(t) &&
          (
            '.sdr' !== t.substr(t.length - 4, 4).toLowerCase() &&
            (t += '.sdr'),
            0 != e.AddFile(t, n) &&
            (a(this.Manifest2, t, r, i), !0)
          )
        )
    },
    this.RemovePage = function (t) {
      return !1 !== this.IsZip() &&
        (
          - 1 !== this.GetPageIndex(t) &&
          (
            0 != e.DeleteFile(t + '.sdr') &&
            (
              u(t),
              this.Manifest2.Initial.toLowerCase() === t.toLowerCase() &&
              (this.Manifest2.Initial = this.Manifest2.GetFirstPageID()),
              a(this.Manifest2, t, '', - 1),
              !0
            )
          )
        )
    },
    this.UpdatePage = function (t, a) {
      return !1 !== this.IsZip() &&
        (- 1 !== this.GetPageIndex(t) && 0 != e.UpdateFile(t, a))
    },
    this.AddFile = function (t, a) {
      return !1 !== this.IsZip() &&
        (!0 !== this.FileExists(t) && 0 != e.AddFile(t, a))
    },
    this.UpdateFile = function (t, a) {
      return !1 !== this.IsZip() &&
        (!1 !== this.FileExists(t) && 0 != e.UpdateFile(t, a))
    },
    this.FileExists = function (t) {
      if ('string' != typeof t) return !1;
      var a = e.GetFiles();
      if (null == a || 0 === a.length) return !1;
      for (var r = t.toLowerCase() + '.sdr', i = a.length, n = 0; n < i; n++) {
        if (r === a[n].toLowerCase()) return !0
      }
      return !1
    },
    this.FileExistsByPageName = function (t) {
      if ('string' != typeof t) return !1;
      '.sdr' !== t.substr(t.length - 4, 4).toLowerCase() &&
        (t += '.sdr');
      var a = e.GetFiles();
      if (null == a || 0 === a.length) return !1;
      for (var r = t.toLowerCase(), i = a.length, n = 0; n < i; n++) {
        if (r === a[n].toLowerCase()) return !0
      }
      return !1
    },
    this.MovePage = function (e, t) {
      return !1 !== this.IsZip() &&
        (
          'string' == typeof e &&
          'number' == typeof t &&
          - 1 !== t &&
          (- 1 != this.GetPageIndex(e) && (a(this.Manifest2, e, t), !0))
        )
    },
    this.SetDefaultPage = function (e) {
      return !1 !== this.IsZip() &&
        (
          'string' == typeof e &&
          (
            - 1 !== this.GetPageIndex(e) &&
            (this.Manifest2.Initial = e, S(this.Manifest2), !0)
          )
        )
    },
    this.RenamePage = function (t, a, r) {
      if (0 == this.IsZip() || 'string' != typeof a) return !1;
      if (- 1 !== this.GetPageIndex(a)) return !1;
      '.sdr' !== a.substr(a.length - 4, 4).toLowerCase() &&
        (a += '.sdr');
      var i = this.GetPageIndex(t);
      return - 1 !== i &&
        (
          this.Manifest2.TabOrder[i] = a,
          this.Manifest2.Initial.toLowerCase() === t.toLowerCase() &&
          (this.Manifest2.Initial = a),
          S(this.Manifest2),
          e.GetFileDataAsync(
            t,
            'blob',
            (
              function (i, n) {
                if (null != i) return e.AddFile(a, i),
                  e.DeleteFile(t),
                  'function' == typeof r ? p(t, a, r) : void 0;
                'function' == typeof r &&
                  r(!1, n)
              }
            )
          ),
          !0
        )
    },
    this.GetPagePath = function (e) {
      return 'number' != typeof e ||
        e < 0 ||
        e >= this.Manifest2.TabOrder.length ? null : this.Manifest2.GetPageNameByOrdinal(e)
    },
    this.GetPageName = function (e) {
      return i(this.Manifest2, e)
    },
    this.GetPageIndex = function (e) {
      return r(this.Manifest2, e)
    },
    this.GetPageIndexByName = function (e) {
      return n(this.Manifest2, e)
    },
    this.GetFileData = function (t, a) {
      return 'function' == typeof a &&
        (
          !1 === this.IsZip() ? (a(null, 'No zip file present.'), !1) : 'string' != typeof t ? (a(null, 'Invalid page name.'), !1) : !1 === this.FileExistsByPageName(t) ? (a(null, 'Page does not exist in zip. PagedSDRFile2.js'), !1) : e.GetFileDataAsync(t, 'blob', a)
        )
    },
    this.GetZipFileData = function (a, r) {
      if ('function' != typeof r) return !1;
      e.GetZipDataAsync(
        'arraybuffer',
        a,
        (
          function (e, a) {
            if (null != e) {
              var i = t(e);
              r(new Blob([i]))
            } else r(null, a)
          }
        )
      )
    },
    this.UpdateManifestTabOrder = function (e) {
      if (null == e) return !1;
      for (var t = this.Manifest2.TabOrder.length, a = 0; a < t; a++) if (- 1 === e.TabOrder.indexOf(this.Manifest2.TabOrder[a])) return !1;
      return this.Manifest2.TabOrder = e.TabOrder,
        this.Manifest2.Initial = e.Initial,
        S(this.Manifest2),
        !0
    };
  var t = function (e) {
    if (null == e) return null;
    var t = new ArrayBuffer(e.byteLength + 8),
      a = new DataView(t);
    a.setUint8(0, 83),
      a.setUint8(1, 77),
      a.setUint8(2, 65),
      a.setUint8(3, 82),
      a.setUint8(4, 84),
      a.setUint8(5, 80),
      a.setUint8(6, 71),
      a.setUint8(7, 68);
    for (var r = new DataView(e), i = r.byteLength, n = 0; n < i; n++) a.setUint8(n + 8, r.getUint8(n));
    return t
  },
    a = function (e, t, a, i) {
      if (null != e && 'string' == typeof pagePath && 'number' == typeof i) {
        var n = r(e, t);
        if (- 1 === i) {
          if (- 1 === n) return;
          e.RemovePage(n)
        } else - 1 === n ? i >= e.TabOrder.length ? e.AddPage(t, a) : e.AddPage(i, t, a) : e.MovePage(t, i, !0);
        S(e)
      }
    },
    r = function (e, t) {
      if (null == t || null == e) return - 1;
      for (var a = e.TabOrder.length, r = 0; r < a; r++) {
        if (e.TabOrder[r].PageID === t) return r
      }
      return - 1
    },
    i = function (e, t) {
      if (null == t || null == e) return - 1;
      for (var a = e.TabOrder.length, r = 0; r < a; r++) {
        var i = e.TabOrder[r];
        if (i.PageID === t) return i.PageName
      }
      return null
    },
    n = function (e, t) {
      if (null == t || null == e) return - 1;
      for (var a = e.TabOrder.length, r = 0; r < a; r++) {
        if (e.TabOrder[r].PageName === t) return r
      }
      return - 1
    },
    o = function (t, a) {
      var r = 'function' == typeof a;
      e.GetFileDataAsync(
        'manifest.txt',
        'arraybuffer',
        (
          function (e, i) {
            if (null == e) !0 === r &&
              a(null, i);
            else {
              var n = new DataStream(e),
                o = '';
              e.byteLength % 2 == 0 &&
                (o = n.readUCS2String(e.byteLength / 2, DataStream.LITTLE_ENDIAN));
              var S = c(e);
              if (- 1 !== S.toLowerCase().indexOf('!base64!')) try {
                o = $.base64.atob(o.substring(8, o.length), !0)
              } catch (e) {
                return void (!0 === r && a(null, 'Base64 version of manifest is corrupt.'))
              } else - 1 !== S.toLowerCase().indexOf('version') &&
                (o = S);
              e = l(o);
              try {
                e = JSON.parse(e)
              } catch (e) {
                return s(t, a)
              }
              !0 === r &&
                a(e)
            }
          }
        )
      )
    },
    s = function (t, a) {
      var r = 'function' == typeof a;
      e.GetFileDataAsync(
        'manifest.txt',
        'base64',
        (
          function (e, t) {
            if (null == e) !0 === r &&
              a(null, t);
            else {
              var i = $.base64.atob(e);
              if (- 1 !== i.toLowerCase().indexOf('!base64!')) try {
                i = $.base64.atob(i.substring(8, i.length), !0)
              } catch (e) {
                return void (!0 === r && a(null, 'Base64 version of manifest is corrupt.'))
              }
              e = l(i);
              try {
                e = JSON.parse(e)
              } catch (e) {
                !0 === r &&
                  a(null, 'Invalid manifest JSON')
              }
              !0 === r &&
                a(e)
            }
          }
        )
      )
    },
    l = function (e) {
      if ('string' != typeof e) return null;
      var t = '{' + e.replace('�', '"V').replace(/(?!\B\"[^\"]*);(?![^\"]*\"\B)/g, ',').replace(/\r?\n|\r/g, '').replace(/\/\//g, '\\\\').replace(/\0/g, '').replace('",]', '"]').replace('ÿþ', '').replace('﻿', '') + '}';
      return t = t.replace(',}', '}')
    },
    S = function (t) {
      var a = t.ToFileString(),
        r = new ArrayBuffer(10),
        i = new DataStream(r);
      i.writeUCS2String(a, DataStream.LITTLE_ENDIAN, a.length),
        e.UpdateFile('manifest.txt', new Uint8Array(i.buffer))
    },
    c = function (e) {
      var t,
        a,
        r,
        i,
        n,
        o,
        s = new Uint8Array(e);
      for (t = '', r = s.length, a = 0; a < r;) switch ((i = s[a++]) >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          t += String.fromCharCode(i);
          break;
        case 12:
        case 13:
          n = s[a++],
            t += String.fromCharCode((31 & i) << 6 | 63 & n);
          break;
        case 14:
          n = s[a++],
            o = s[a++],
            t += String.fromCharCode((15 & i) << 12 | (63 & n) << 6 | (63 & o) << 0)
      }
      return t
    },
    u = function (t) {
      if (null != t) {
        '.sdr' === t.toLowerCase().substring(t.length - 4) &&
          (t = t.substring(0, t.length - 4));
        var a = t.toLowerCase(),
          r = e.GetFiles();
        if (null != r && 0 !== r.length) for (var i = r.length, n = 0; n < i; n++) {
          var o = r[n],
            s = o.lastIndexOf('.');
          - 1 !== s &&
            (o = o.substring(0, s)),
            o.toLowerCase() === a &&
            e.DeleteFile(r[n])
        }
      }
    },
    p = function (t, a, r) {
      if (null != t && null != a) {
        '.sdr' === t.toLowerCase().substring(t.length - 4) &&
          (t = t.substring(0, t.length - 4)),
          '.sdr' === a.toLowerCase().substring(a.length - 4) &&
          (a = a.substring(0, a.length - 4));
        var i = t.toLowerCase(),
          n = [],
          o = [],
          s = e.GetFiles();
        if (null != s && 0 !== s.length) {
          for (var l = s.length, S = 0; S < l; S++) {
            var c = s[S],
              u = c.lastIndexOf('.');
            if (- 1 !== u) {
              var p = c.substring(0, u),
                D = s[S].substring(u);
              p.toLowerCase() === i &&
                n.push({
                  OldName: s[S],
                  NewName: a + D
                })
            }
          }
          if (0 === n.length) return r(!0);
          var g = n.length;
          for (S = 0; S < g; S++) {
            var h = n[S];
            d(
              h.OldName,
              h.NewName,
              (function () {
                o.push(h),
                  o.length === n.length &&
                  r(!0)
              })
            )
          }
        }
      }
    },
    d = function (t, a, r) {
      e.GetFileDataAsync(
        t,
        'blob',
        (
          function (i, n) {
            null != i &&
              (e.AddFile(a, i), e.DeleteFile(t), 'function' == typeof r && r(!0))
          }
        )
      )
    }
}

Resources.CustomSymbolOptions = function () {
  this.SymbolName = null,
    this.AutoColorOptions = Resources.CustomSymbolAutoColorOptions.KeepColors,
    this.Index = - 1
}

Resources.CustomSymbolAutoColorOptions = {
  ColorWithTheme: 1,
  KeepColors: 2
}

Resources.DigestedQueryString = function () {
  this.DepositoryID = null,
    this.CredentialID = null,
    this.DocumentID = null,
    this.Depository = null,
    this.OwnerUserID = null,
    this.WidgetToken = null,
    this.ReadOnlyMode = !1,
    this.IFrameMode = !1,
    this.PublicDocShareToken = null,
    this.PageNumber = - 1,
    this.EmbeddedMode = !1,
    this.UseLocalStorage = !1,
    this.LocalSDRTempFileGUID = null,
    this.TemplateID = null,
    this.ApplicationContext = Resources.ApplicationContext.SDCloud,
    this.ApplicationModeFlags = Resources.ApplicationModeFlags.None,
    this.PluginID = null,
    this.NoRo = !1,
    this.TrelloPU = !1,
    this.TrelloPUOpenExisting = !1,
    this.NeedsSave = !1,
    this.TemplateDialogStartLocation = - 1,
    this.ShareError = null,
    this.ShareErrorDetail = null,
    this.FolderID = null,
    this.DevToolsEabled = !1,
    this.ForceEditor = !1,
    this.LucidOAuthToken = null,
    this.LucidOAuthVerifier = null,
    this.GoogleDocID = null,
    this.ShowDepo = null,
    this.EmbeddedInGoogle = !1,
    this.RealTime = !1,
    this.Visualizer = null,
    this.IsVersion1DocumentLink = function () {
      return null != this.DocumentID &&
        null != this.Depository &&
        null != this.OwnerUserID
    },
    this.IsVersion2DocumentLink = function () {
      return null != this.CredentialID &&
        null != this.DepositoryID
    },
    this.DigestQueryString = function () {
      var a = Utils.GetQueryStringVariables();
      if (null != window.location.hash && '' !== window.location.hash) {
        var r = Utils.GetQueryStringVariables(window.location.hash.toString().replace('#', '?'));
        for (var i in r) a[i] = r[i]
      }
      var n = Utils.DecodeURL(a[Constants.QS_DocumentId]),
        o = decodeURIComponent(a[Constants.QS_DepositoryID]),
        s = a[Constants.QS_CredentialID],
        l = a[Constants.QS_Depository],
        S = a[Constants.QS_OwnerId],
        c = a[Constants.QS_PublicDocumentToken],
        u = a[Constants.QS_PageNumber],
        p = a[Constants.QS_PageID],
        d = a[Constants.QS_WidgetToken],
        D = a[Constants.QS_ReadOnlyMode],
        g = a[Constants.QS_Embedded],
        h = a[Constants.QS_UseLocalSDRStorage],
        m = a[Constants.QS_TempFileGUID],
        C = a[Constants.QS_TemplateId],
        y = a[Constants.QS_NoRo],
        f = a[Constants.QS_TrelloPU],
        L = a[Constants.QS_TrelloPUOpenExisting],
        I = a[Constants.QS_NeedSave],
        T = a[Constants.QS_ApplicationContext],
        b = a[Constants.QS_AppFlags],
        M = a[Constants.QS_PluginID],
        P = a[Constants.QS_TemplateDialogStartLocation],
        R = a[Constants.QS_ShareError],
        A = a[Constants.QS_ShareErrorDetail],
        _ = a[Constants.QS_FolderId],
        E = a[Constants.QS_IFrameMode],
        w = a[Constants.QS_DevMode],
        F = a[Constants.QS_ForceEditor],
        v = a[Constants.QS_LucidOAuthToken],
        G = a[Constants.QS_LucidOAuthVerifier],
        N = a[Constants.QS_GoogleDocState],
        k = a[Constants.QS_GoogleEmbedded],
        U = a[Constants.QS_RealTime],
        J = a[Constants.QS_Code],
        x = a[Constants.QS_ShowDepo],
        O = a[Constants.QS_VisualizerID],
        B = a[Constants.QS_ElectronAppVersion];
      if (
        null != n &&
        '' !== n &&
        (this.DocumentID = n),
        null != o &&
        '' !== o &&
        'undefined' !== o &&
        (this.DepositoryID = o),
        null != s &&
        !1 === isNaN(parseInt(s, 0)) &&
        (this.CredentialID = parseInt(s)),
        null != l &&
        !1 === isNaN(parseInt(l, 0)) &&
        (this.Depository = parseInt(l, 0)),
        null != S &&
        !1 === isNaN(parseInt(S, 0)) &&
        (this.OwnerUserID = parseInt(S, 0)),
        null != c &&
        '' !== c &&
        (this.PublicDocShareToken = c),
        null != u &&
        !1 === isNaN(parseInt(u)) &&
        (this.PageNumber = parseInt(u, 0)),
        null != p &&
        '' !== p &&
        (this.PageID = p),
        null != d &&
        (this.WidgetToken = d),
        null != D &&
        e(D) &&
        (this.ReadOnlyMode = !0),
        null != g &&
        e(g) &&
        (this.EmbeddedMode = !0),
        null != h &&
        e(h) &&
        (this.UseLocalStorage = !0),
        null != m &&
        (this.LocalSDRTempFileGUID = m),
        null != C &&
        (this.TemplateID = C),
        null != y &&
        e(y) &&
        (this.NoRo = !0),
        null != f &&
        e(f) &&
        (this.TrelloPU = !0),
        null != L &&
        e(L) &&
        (this.TrelloPUOpenExisting = !0),
        null != I &&
        e(I) &&
        (this.NeedsSave = !0),
        null != T &&
        (this.ApplicationContext = T),
        null != b &&
        !1 === isNaN(parseInt(b, 0)) &&
        (this.ApplicationModeFlags = parseInt(b, 0)),
        null != M &&
        (this.PluginID = M),
        null != P &&
        !1 === isNaN(parseInt(P, 0)) &&
        (this.TemplateDialogStartLocation = parseInt(P, 0)),
        null != R &&
        !1 === isNaN(parseInt(R)) &&
        (this.ShareError = parseInt(R, 0)),
        null != A &&
        !1 === isNaN(parseInt(A)) &&
        (this.ShareErrorDetail = parseInt(A, 0)),
        null != _ &&
        !1 === isNaN(parseInt(_)) &&
        (this.FolderID = parseInt(_)),
        null != E &&
        !0 === e(E) &&
        (this.IFrameMode = !0),
        null != w &&
        !0 === e(w) &&
        (this.DevToolsEabled = !0),
        null != F &&
        !0 === e(F) &&
        (this.ForceEditor = !0),
        null != v &&
        '' !== v &&
        (this.LucidOAuthToken = v),
        null != G &&
        '' !== G &&
        (this.LucidOAuthVerifier = G),
        null != k &&
        'true' === k &&
        (this.EmbeddedInGoogle = !0),
        null != U &&
        null != ServerPage &&
        'DEV' === ServerPage.Environment &&
        e(U) &&
        (this.RealTime = !0),
        null != J &&
        (this.OAuthAuthCode = J),
        null != x &&
        !1 === isNaN(parseInt(x)) &&
        (this.ShowDepo = parseInt(x)),
        null != O &&
        !1 === isNaN(parseInt(O)) &&
        (this.Visualizer = parseInt(O)),
        null != B &&
        (this.ElectronAppVersion = B),
        null != N
      ) {
        var H = decodeURIComponent(N);
        try {
          var V = JSON.parse(H);
          'open' == V.action &&
            (this.GoogleDocID = V.ids[0])
        } catch (e) {
          throw e
        }
      }
      null != this.PluginID &&
        this.ApplicationContext === Resources.ApplicationContext.SDCloud ? null != (T = t(this.PluginID)) &&
      (this.ApplicationContext = T) : !0 !== this.TrelloPU &&
      !0 !== this.TrelloPUOpenExisting ||
      (
        this.ApplicationContext = Resources.ApplicationContext.Trello
      )
    };
  var e = function (e) {
    return 'true' === e ||
      '1' === e
  },
    t = function (e) {
      if ('string' != typeof e) return null;
      var t = Resources.PluginIDPrefix.GetPrefix(e);
      return null == t ? null : t === Resources.PluginIDPrefix.ConfluenceCloud ? Resources.ApplicationContext.ConfluenceCloud : t === Resources.PluginIDPrefix.JIRACloud ? Resources.ApplicationContext.JIRACloud : null
    }
}


Resources.FeedbackItem = function () {
  this.UserId = null,
    this.UserAgentString = null,
    this.UserMessage = null,
    this.ErrorMessage = null,
    this.DocumentSVG = null
}

Resources.ProgressDisplays = {
  None: 0,
  MoveContent: 1
}

Resources.ProgressStatus = {
  NotStarted: 0,
  InProgress: 1,
  Completed: 2,
  Failed: 3
}

Resources.FileOperationProgress = function () {
  this.FileId = - 1,
    this.DepositoryFileId = null,
    this.Depository = Resources.Depositories.None,
    this.FileName = null,
    this.Status = Resources.ProgressStatus.NotStarted,
    this.Description = null
}

Resources.FileOperationProgress.prototype.FromJSON = function (e) {
  $.extend(!0, this, e)
}

// Resources.CMSItemBase = function (e) {
//
//   this.Id = null == e ? Constants.Guid_Empty : e,
//     this.DateCreated = null,
//     this.DateChanged = null,
//     this.ChangedBy = null,
//     this.ValidateForSave = function () {
//       return this.Id !== Constants.Guid_Empty
//     },
//     this.FromJSON = function (e) {
//       return $.extend(!0, this, e)
//     }
// }

// Resources.CMSContentItem = function (e) {
//
//   this.Title = null,
//     this.SmartDrawId = - 1,
//     this.Formats = [],
//     this.Version = null,
//     Resources.CMSItemBase.call(this, e),
//     this.FromJSON = function (e) {
//       for (
//         var t in Resources.CMSContentItem.prototype.FromJSON.call(this, e),
//         this.Formats = [],
//         e.Formats
//       ) this.Formats.push((new Resources.FormatMapping).FromJSON(e.Formats[t]))
//     }
// }

// Resources.CMSContentItem.prototype = new Resources.CMSItemBase
// Resources.CMSContentItem.prototype.constructor = Resources.CMSContentItem
// Resources.CMSPropertyBagBase = function (e) {
//   Resources.CMSItemBase.call(this, e);
//   var t = e;
//   this.RelatedObjectId = function () {
//     return t
//   }
// }

// Resources.CMSPropertyBagBase.prototype = new Resources.CMSItemBase,
//   Resources.CMSPropertyBagBase.prototype.constructor = Resources.CMSPropertyBagBase
// Resources.SDContentFormat = {
//   Native: 0,
//   EMF: 1,
//   SVG: 2,
//   PNG: 3,
//   SDT: 4,
//   SDL: 5,
//   SDS: 6,
//   JPEG: 7
// }

// Resources.FormatMapping = function () {
//   this.ContentItemId = null,
//     this.Format = Resources.SDContentFormat.Native,
//     this.FilePath = null
// }

// Resources.FormatMapping.prototype = new Resources.CMSItemBase
// Resources.FormatMapping.constructor = Resources.FormatMapping
// Resources.SDSymbol = function () {
//
//   this.Description = '',
//     this.CopyrightId = - 1,
//     this.HashCode = null,
//     this.HasNative = !1,
//     this.IsCustomContent = !1,
//     this.ScalingData = new Resources.SymbolScaling,
//     this.ShapeData = new Resources.SymbolShape,
//     this.TextData = new Resources.SymbolText,
//     Resources.CMSContentItem.call(this),
//     this.ValidateForSave = function () {
//       if (
//         !1 === Resources.SDSymbol.prototype.ValidateForSave.call(this)
//       ) return !1;
//       if (this.ScalingData instanceof Resources.SymbolScaling == !1) return !1;
//       if (this.ShapeData instanceof Resources.SymbolShape == !1) return !1;
//       if (this.TextData instanceof Resources.SymbolText == !1) return !1;
//       var e = this.Id;
//       [
//         this.ScalingData,
//         this.ShapeData,
//         this.TextData
//       ].forEach((function (t, a, r) {
//         t.RelatedObjectId = e
//       }))
//     },
//     this.FromJSON = function (e) {
//       Resources.SDSymbol.prototype.FromJSON.call(this, e),
//         this.ScalingData = new Resources.SymbolScaling,
//         this.ShapeData = new Resources.SymbolShape,
//         this.TextData = new Resources.SymbolText,
//         this.ScalingData.FromJSON(e.ScalingData),
//         this.ShapeData.FromJSON(e.ShapeData),
//         this.TextData.FromJSON(e.TextData)
//     };
//   var e = function (e) {
//     null != e &&
//       (e.X = e.x, e.Y = e.y)
//   };
//   this.FixPoints = function () {
//     e(this.ScalingData.Dimensions),
//       e(this.ScalingData.OriginalDimensions),
//       e(this.ShapeData.AttachPoint),
//       this.ShapeData.ConnectionPoints.forEach((function (t, a, r) {
//         e(t)
//       }))
//   }
// }

// Resources.SDSymbol.prototype = new Resources.CMSContentItem
// Resources.SDSymbol.prototype.constructor = Resources.SDSymbol
// Resources.SymbolScaling = function () {
//   Resources.CMSPropertyBagBase.call(this),
//     this.ObjectGrowFlags = - 1,
//     this.Dimensions = new Resources.Point,
//     this.OriginalDimensions = new Resources.Point,
//     this.ScaleType = - 1,
//     this.Scale = - 1,
//     this.MetricUnits = - 1,
//     this.Width = - 1,
//     this.Height = - 1,
//     this.Metric_Width = - 1,
//     this.Metric_Height = - 1,
//     this.FromJSON = function (e) {
//       Resources.SymbolScaling.prototype.FromJSON.call(this, e);
//       var t = new Resources.Point;
//       t.x = this.Dimensions.X,
//         t.y = this.Dimensions.Y,
//         t.X = this.Dimensions.X,
//         t.Y = this.Dimensions.Y,
//         this.Dimensions = t;
//       var a = new Resources.Point;
//       a.x = this.OriginalDimensions.X,
//         a.y = this.OriginalDimensions.Y,
//         a.X = this.OriginalDimensions.X,
//         a.Y = this.OriginalDimensions.Y,
//         this.OriginalDimensions = a
//     }
// }

// Resources.SymbolScaling.prototype = new Resources.CMSPropertyBagBase
// Resources.SymbolScaling.prototype.constructor = Resources.SymbolScaling
// Resources.SymbolShape = function () {
//   Resources.CMSPropertyBagBase.call(this),
//     this.ConnectionPoints = [],
//     this.AttachPoint = new Resources.Point,
//     this.ObjectAttributeFlags = - 1,
//     this.ExtraAttributeFlags = - 1,
//     this.UseFlags = - 1,
//     this.DataClass = - 1,
//     this.ObjectType = - 1,
//     this.LayerName = null,
//     this.ColorFilter = 0,
//     this.FromJSON = function (e) {
//       Resources.SymbolShape.prototype.FromJSON.call(this, e);
//       var t = new Resources.Point;
//       t.x = this.AttachPoint.X,
//         t.y = this.AttachPoint.Y,
//         t.X = this.AttachPoint.X,
//         t.Y = this.AttachPoint.Y,
//         this.AttachPoint = t;
//       for (var a = this.ConnectionPoints.length, r = [], i = 0; i < a; i++) {
//         t = new Resources.Point;
//         var n = this.ConnectionPoints[i];
//         t.x = n.X,
//           t.y = n.Y,
//           t.X = n.X,
//           t.Y = n.Y,
//           r.push(t)
//       }
//       this.ConnectionPoints = r
//     }
// }

// Resources.SymbolShape.prototype = new Resources.CMSPropertyBagBase
// Resources.SymbolShape.prototype.constructor = Resources.SymbolShape
// Resources.SymbolText = function () {
//   Resources.CMSPropertyBagBase.call(this),
//     this.TextFlags = - 1,
//     this.TextGrow = - 1,
//     this.LeftTextIndent = - 1,
//     this.RightTextIndent = - 1,
//     this.TopTextIndent = - 1,
//     this.BottomTextIndent = - 1,
//     this.VerticalJustification = - 1,
//     this.HorizontalJustification = - 1
// }

// Resources.SymbolText.prototype = new Resources.CMSPropertyBagBase
// Resources.SymbolText.prototype.constructor = Resources.SymbolText
// Resources.JSNFMapping = function () {
//   this.JSNFID = null,
//     this.CMSID = null,
//     this.JSNFTags = null,
//     this.ShapeBusinessLogic = null,
//     this.LineConnectorType = null
// }


// Resources.CustomEventArgs = function (e, t) {
//   var a = e,
//     r = t;
//   this.EventKey = null,
//     Object.defineProperty(
//       this,
//       'EventKey',
//       {
//         get: function () {
//           return a
//         },
//         configurable: !1,
//         enumerable: !0
//       }
//     ),
//     this.Data = null,
//     Object.defineProperty(
//       this,
//       'Data',
//       {
//         get: function () {
//           return r
//         },
//         configurable: !1,
//         enumerable: !0
//       }
//     ),
//     this.StopPropagation = function () {
//     }
// }

/*
Resources.RulerUnits = {
  SED_UNone: 0,
  SED_Inches: 1,
  SED_Feet: 2,
  SED_Mm: 3,
  SED_Cm: 4,
  SED_M: 5
}
*/

export default Resources;
