

class WindowSettings {

  public updated: number;
  public worigin: { x: number, y: number };
  public wscale: number;
  public wscalemode: number;
  public leftpanelmode: number;

  constructor() {
    this.updated = 0;
    this.worigin = { x: 0, y: 0 };
    this.wscale = 0;
    this.wscalemode = 0;
    this.leftpanelmode = 0;
  }
}

export default WindowSettings
