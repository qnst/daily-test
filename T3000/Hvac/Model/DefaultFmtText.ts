

class DefaultFmtText {
  width: number;
  height: number;
  fmtWidth: number;
  text: string;
  paragraphs: any[];
  styles: any[];
  hyperlinks: any[];

  constructor() {
    this.width = 0;
    this.height = 0;
    this.fmtWidth = 0;
    this.text = '';
    this.paragraphs = [];
    this.styles = [];
    this.hyperlinks = [];
  }
}

export default DefaultFmtText
