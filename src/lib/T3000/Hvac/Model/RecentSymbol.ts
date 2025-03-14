

class RecentSymbol {

  public ItemId: number;
  public ContentTitle: string;
  public ContentTT: string;
  public ContentImageUrl: string;
  public NoMenu: boolean;

  constructor(itemId: number, title: string, noMenu: boolean) {

    this.ItemId = itemId;
    this.ContentTitle = '';
    this.ContentTT = '';
    this.ContentImageUrl = '';
    this.NoMenu = !!noMenu;

    if (title) {

      // Double ===
      this.ContentTitle = title;
      this.ContentImageUrl = 'symbols/BTN/' + this.ItemId + '.png';
      this.ContentTT = this.ContentTitle.replace(/"/g, '&quot;');
    }

  }
}

export default RecentSymbol

