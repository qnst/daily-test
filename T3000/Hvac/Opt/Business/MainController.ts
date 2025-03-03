


import ShapeController from './ShapeController'
import BusinessController from './BusinessController'
import ConnectionPointsController from './ConnectionPointsController'
import DocumentController from './DocumentController'
import ActiveSelection from './ActiveSelection'
import GlobalData from '../../Data/GlobalData'
import Resources from '../../Data/Resources'
import Clipboard from '../Business/Clipboard'
import Commands from '../Business/Commands'
import $ from 'jquery'
import Utils4 from '../../Helper/Utils4'
import DataOpt from '../../Data/DataOpt'

import ConstantData from '../../Data/ConstantData'
import ConstantData2 from '../../Data/ConstantData2'


class MainController {

  public Shapes: any;
  public Business: any;
  public ConnectionPoints: any;
  public Document: any;
  public Selection: any;

  constructor() {
    // Initialize controllers
    // this.Ribbons = new SDUI.RibbonController();
    // this.Theme = new SDUI.ThemeController();
    // this.Dropdowns = new SDUI.DropdownController();
    // this.Modals = new SDUI.ModalController();
    this.Selection = new ActiveSelection();
    // this.SmartPanels = new SDUI.SmartPanelController();
    // this.DataPanel = new SDUI.DataPanelController();
    this.Shapes = new ShapeController();
    // this.Symbols = new SDUI.SymbolController();
    // this.SymbolLibraryBrowser = new SDUI.SymbolLibraryBrowser();
    this.Document = new DocumentController();
    // this.Fonts = new SDUI.FontController();
    // this.HTMLLoader = new SDUI.HTMLPartialLoader();
    this.Business = new BusinessController();
    // this.FilePicker = new SDUI.FilePicker();
    // this.ActionMenu = new SDUI.ActionMenuController();
    // this.FileHub = new SDUI.FileHubController();
    // this.PrintDialog = new SDUI.PrintDialog();
    // this.ScaleDialog = new SDUI.ScaleDialogController();
    // this.DimensionsDialog = new SDUI.DimensionsDialogController();
    // this.TextEntryController = new SDUI.TextEntryController();
    // this.GrowDlgController = new SDUI.GrowDlgController();
    // this.FreezePropDlgController = new SDUI.FreezePropDlgController();
    // this.SetRoundnessDlgController = new SDUI.SetRoundnessDlgController();
    // this.ManagePagesController = new SDUI.ManagePagesController();
    // this.HashController = new SDUI.HashController();
    // this.Hyperlinks = new SDUI.HyperlinkController();
    // this.ImportController = new SDUI.ImportController();
    this.ConnectionPoints = new ConnectionPointsController();
    // this.OptionsController = new SDUI.OptionsController();
    // this.InsertBitmapController = new SDUI.InsertBitmapController();
    // this.HintController = new SDUI.HintController();
    // this.PDFExporter = new SDUI.PDFExporter;
    // this.FeedbackController = new SDUI.FeedbackDialogController;
    // this.SmartShareController = new SDUI.SmartShareController;
    // this.NameDialog = new SDUI.NameDialog();
    // this.MessageBox = new SDUI.MBController();
    // this.LineHopsDialog = new SDUI.LineHopsDialogController();
    // this.NewLayerDialog = new SDUI.NewLayerDialogController();
    // this.EditLayerDialog = new SDUI.EditLayerDialogController();
    // this.ManageLayersDialog = new SDUI.ManageLayersDialogController();
    // this.WorkAreaDialog = new SDUI.WorkAreaDialogController();
    // this.ArrowheadsDialog = new SDUI.ArrowheadsDialogController();
    // this.FindDialog = new SDUI.FindReplaceController();
    // this.HatchesDialog = new SDUI.HatchesDialogController();
    // this.TexturesDialog = new SDUI.TexturesDialogController();
    // this.TextureSettingsDialog = new SDUI.TextureSettingsDialogController();
    // this.InsertSymbolDialog = new SDUI.InsertSymbolDialogController();
    // this.CustomMarginsDialog = new SDUI.CustomMarginsDialogController();
    // this.CustomParametersDialog = new SDUI.CustomParametersDialogController();
    // this.CustomRotationDialog = new SDUI.CustomRotationDialogController();
    // this.TemplateDialogController = new SDUI.TemplateDialogController();
    // this.GradientDialog = new SDUI.GradientDialogController;
    // this.ShareDialogController = new SDUI.ShareDialogController;
    // this.LineThicknessDialog = new SDUI.LineThicknessDialogController();
    // this.ExportController = new SDUI.ExportController;
    // this.ColorPickerDialog = new SDUI.ColorPickerDialogController;
    // this.ProjectOptionsDialog = new SDUI.ProjectOptionsDialogController;
    // this.ProjectTimeframeDialog = new SDUI.ProjectTimeframeDialogController;
    // this.TrialBuyController = new SDUI.TrialBuyController;
    // this.TrialSplashController = new SDUI.TrialSplashController;
    // this.TrialActivateController = new SDUI.TrialActivateController;
    // this.LoginSignupController = new SDUI.LoginSignupController((function () {
    //   SDUI.Initializer.InitUser(!1)
    // }));
    // this.ConfluenceContactInfoController = new SDUI.ConfluenceContactInfoController;
    // this.FeedbackDialogController = new SDUI.FeedbackDialogController;
    // this.MobileTextDialogController = new SDUI.MobileTextDialogController;
    // this.ActiveSessionController = new SDUI.ActiveSessionController();
    // this.PagedSDRController = new SDUI.PagedSDRController();
    // this.EmbedDialogController = new SDUI.EmbedDialogController;
    // this.DocHistory = new SDUI.DocHistoryController();
    // this.GliffyImporter = new SDUI.GliffyImportController();
    // this.VisioStencilImportDialog = new SDUI.VisioStencilImportDialog;
    // this.CustomSymbolLibraryController = new SDUI.CustomSymbolLibraryController;
    // this.CreateTrelloCardDialog = new SDUI.CreateTrelloCardDialogController;
    // this.AlertModal = new SDUI.AlertModalController();
    // this.PluginController = new SDUI.Plugins.PluginController;
    // this.TrelloSynchController = new SDUI.TrelloSyncDialogController;
    // this.MediaGeneratorController = new SDUI.MediaGeneratorController;
    // this.ImportCustomContentController = new SDUI.ImportCustomContentController;
    // this.PluginPrebuiltIframeViewerController = new SDUI.PluginPrebuiltIframeViewerController;
    // this.DataRulesDialog = new SDUI.DataRulesDialogController;
    // this.DataListDialog = new SDUI.DataListDialogController;
    // this.DataExportDialog = new SDUI.DataExportController;
    // this.D3SymbolBuilderDialog = new SDUI.D3SymbolBuilderController;
    // this.EditGraphDlgController = new SDUI.EditGraphDlgController;
    // this.EditGaugeDlgController = new SDUI.EditGaugeDlgController;
    // this.CMSSVGMapperController = new SDUI.CMSSVGMapperController;
    // this.CMSLoginDialogController = new SDUI.CMSLoginDialogController;
    // this.CMSAddSymbolController = new SDUI.CMSAddSymbolController;
    // this.CMSDeleteSymbolController = new SDUI.CMSDeleteSymbolController;
    // this.CMSEditSymbolController = new SDUI.CMSEditSymbolController;
    // this.CMSConfirmationDialogController = new SDUI.CMSConfirmationDialogController;
    // this.AWSDialog = new SDUI.AWSDialogController;
    // this.AWSImport = new SDUI.AWSImportController;
    // this.AzureDialog = new SDUI.AzureDialogController;
    // this.AzureImport = new SDUI.AzureImportController;
    // this.JSNFImport = new SDUI.JSNFImportController;
    // this.CollabOverlayController = new SDUI.CollabOverlayContoller;
    // this.CustomThemeDialogController = new SDUI.CustomThemeDialogController;
    // this.PublishingUrlDialogController = new SDUI.PublishingUrlDialogController;
    // this.PublishUpdatesDialogController = new SDUI.PublishUpdatesDialogController;
    // this.CustomSymbolLibraryNameDialogController = new SDUI.CustomSymbolLibraryNameDialogController;
    // this.IframeMessagingController = new SDUI.IframeMessagingController;
    // this.OAuthIntegrationsController = new SDUI.OAuthIntegrationsController;
    // this.JiraAddIssueDialogController = new SDUI.JiraAddIssueDialogController;
    // this.JiraFindIssueDialogController = new SDUI.JiraFindIssueDialogController;
    // this.JiraPIBoardDialogController = new SDUI.JiraPIBoardDialogController;
    // this.JiraProductRoadmapDialogController = new SDUI.JiraProductRoadmapDialogController;
    // this.JiraBlockingIssueDialogController = new SDUI.JiraBlockingIssueDialogController;
    // this.JiraEpicDependencyDialogController = new SDUI.JiraEpicDependencyDialogController;
    // this.IntegrationsCardsController = new SDUI.IntegrationsCardsController;
    // this.AzureDevOpsFindItemDialogController = new SDUI.AzureDevOpsFindItemDialogController;
    // this.AzureDevOpsAddItemDialogController = new SDUI.AzureDevOpsAddItemDialogController;
    // this.ShowUrlDialogController = new SDUI.ShowUrlDialogController;
    // this.LinkWarningController = new SDUI.LinkWarningController;
    // this.ChatGPTInputController = new SDUI.ChatGPTInputController;
    // this.OrgChartVisualizerController = new SDUI.OrgChartVisualizerController;
    // this.DecisionTreeVisualizerController = new SDUI.DecisionTreeVisualizerController;
    // this.ErdVisualizerController = new SDUI.ErdVisualizerController;
    // this.ClassDiagramVisualizerController = new SDUI.ClassDiagramVisualizerController;
    // this.MSTeamsVisualizerController = new SDUI.MSTeamsVisualizerController;
    // this.UmlSequenceVisualizerController = new SDUI.UmlSequenceVisualizerController;
    // this.UmlStateVisualizerController = new SDUI.UmlStateVisualizerController;
    // this.JiraReportVisualizerController = new SDUI.JiraReportVisualizerController;
    // this.TimelineImportController = new SDUI.TimelineImportController;
    // this.EventPickerDialogController = new SDUI.EventPickerDialogController;
    // this.TimelineRangeSelectController = new SDUI.TimelineRangeSelectController;
    // this.CollabPanelController = new SDUI.CollabPanelController();
    // this._ribbonMenuHighlightID = null;
    // this._ribbonMenuID = null;
    // this.SubControllers = [];
  }

  ShowContextualMenu() {
    //Double === TODO
    console.log('ShowContextualMenu')
  }

  HandleKeyDown(e, t, a) {
    // if (!0 !== this.Modals.ModalsVisible()) {
    if (GlobalData.optManager.bTouchPanStarted && t == ConstantData2.Keys.Space)
      return e.stopPropagation(),
        void e.preventDefault();
    var r, i, n, o = [], s = 0, l = 0, S = (t == ConstantData2.Keys.Left_Arrow ||
      t == ConstantData2.Keys.Right_Arrow || t == ConstantData2.Keys.Up_Arrow ||
      t == ConstantData2.Keys.Down_Arrow) && Resources.DocumentContext &&
      ConstantData.DocumentContext.UserSettings && ConstantData.DocumentContext.UserSettings.DisableCtrlArrowShapeInsert;

    // Double === TODO
    var deferedTextEdit;
    if (1 == a && (67 == t || 99 == t || 88 == t || 120 == t || 86 == t || 118 == t))
      Clipboard.isFF && Clipboard.FocusOnIEclipboardDiv();
    else {
      if (!1,
        i = !1,
        deferedTextEdit = !1,
        null != (r = null/*this.Modals.GetModalContext()*/) && o.push(r),
        n = this.Selection.GetSelectionContext(),
        "titleInput" === e.target.id && (n = Resources.Contexts.Text),
        n instanceof Array)
        for (s = n.length,
          l = 0; l < s; l++)
          o.push(n[l]);
      else
        o.push(n);
      var c = null;// this.SmartPanels.GetSmartPanelContext();
      o.indexOf(c) < 0 && o.push(c),
        o.push(Resources.Contexts.All),
        s = o.length,
        GlobalData.docHandler.IsReadOnly() && ((o = []).push(Resources.Contexts.ReadOnly),
          s = o.length);
      for (var u = 0; u < s; u++) {
        var p = o[u]
          , d = Resources.KeyboardCommand.prototype.GetCommandsInContext(p)
          , D = d.length;
        for (l = 0; l < D; l++) {
          var g = d[l];
          if (g.KeyCode === t && g.ModifierKey === a) {
            if (S && i)
              break;
            if (!g.Execute())
              return e.stopPropagation(),
                e.preventDefault()

            // Double === TODO
            // ,
            // void SDUI.Utils.Logger.LogKeyboardCommand(t, a)
          }
        }
        if (!1 === ConstantData.DocumentContext.CanTypeInWorkArea)
          return void (t === ConstantData2.Keys.Escape && gListManager.Comment_Cancel());
        if (p !== Resources.Contexts.DimensionText && p !== Resources.Contexts.NoteText || (i = !0),
          p === Resources.Contexts.Text && (a === Resources.ModifierKeys.None || a === Resources.ModifierKeys.Shift || a === Resources.ModifierKeys.Ctrl || a === Resources.ModifierKeys.Ctrl_Shift))
          if (!1 === Commands.MainController.Shapes.IsActiveTextEdit() && "titleInput" != e.target.id) {
            if (-1 != ConstantData2.NonTextKeys.indexOf(t))
              continue;
            a != Resources.ModifierKeys.Ctrl && (i = !0)
          } else
            i = !0;
        if (i && a != Resources.ModifierKeys.Ctrl)
          break
      }
      i && (t === ConstantData2.Keys.Escape ? (GlobalData.optManager.DeactivateAllTextEdit(!1),
        GlobalData.optManager.bInNoteEdit && GlobalData.optManager.Note_CloseEdit(),
        GlobalData.optManager.RenderAllSVGSelectionStates(),
        e.stopPropagation(),
        e.preventDefault()) : Commands.MainController.Shapes.HandleKeyDown(e, t, a) && (e.stopPropagation(),
          e.preventDefault()))
    }
    // }
  }


  SaveAs = function () {



    var t = "TestSaveDouble";
    var a = ".sdr";
    var CredentialID = "-1";
    var CurrentFolder = "-1";

    GlobalData.optManager.CloseEdit();

    // save data to locastorage
    DataOpt.SaveToLocal();


  }


  HandleKeyPress = function (e, t) {
    var a = !1;
    if (GlobalData.optManager.bTouchPanStarted && t == ConstantData2.Keys.Space)
      return e.stopPropagation(),
        void e.preventDefault();
    if (true/*!0 !== this.Modals.ModalsVisible()*/)
      if (1 == Utils4.GetModifierKeys(e) && (67 == t || 99 == t || 88 == t || 120 == t || 86 == t || 118 == t))
        Clipboard.isFF && Clipboard.FocusOnIEclipboardDiv();
      else if (!1 !== ConstantData.DocumentContext.CanTypeInWorkArea && !GlobalData.docHandler.IsReadOnly()) {
        var r = this.Selection.GetSelectionContext();
        r instanceof Array && (a = r.indexOf(Resources.Contexts.Text) >= 0),
          (a || r === Resources.Contexts.Text || r === Resources.Contexts.DimensionText ||
            r === Resources.Contexts.NoteText) && Commands.MainController.Shapes.HandleKeyPress(e, t)
          && e.stopPropagation()
      }
  }
}

export default MainController
