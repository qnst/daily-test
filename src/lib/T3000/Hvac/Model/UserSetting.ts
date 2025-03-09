

import T3Constant from "../Data/T3Constant";

class UserSettings {

  public UserID: number;
  public DateChanged: Date;
  public ShowGrid: boolean;
  public RecentColors: string[];
  public PaperSize: number;
  public Metric: boolean;
  public DisableCtrlArrowShapeInsert: boolean;
  public CursorDisplayMode: number;

  constructor() {
    this.UserID = -1;
    this.DateChanged = null;
    this.ShowGrid = false;
    this.RecentColors = [];
    this.PaperSize = 0;
    this.Metric = false;
    this.DisableCtrlArrowShapeInsert = false;
    this.CursorDisplayMode = T3Constant.CursorDisplayMode.Show;
  }
}

export default UserSettings
