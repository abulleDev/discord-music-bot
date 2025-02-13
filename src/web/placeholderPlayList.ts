class ListItem {
  public id: string;
  public title: string;
  public description: string;
  public uploader: string;
  public webpage_url: string;
  public uploader_url: string;
  public thumbnail: string;
  public extractor: string;

  constructor(index: number) {
    this.id = `${index}`;
    this.title = `Music ${index}`;
    this.description = `Description ${index}`;
    this.uploader = `Uploader ${index}`;
    this.webpage_url = 'https://example.com';
    this.uploader_url = 'https://example.com';
    this.thumbnail = 'https://placecats.com/500/400';
    this.extractor = 'test';
  }
}

const playList: ListItem[] = [];

for (let i = 0; i < 20; i++) {
  playList.push(new ListItem(i + 1));
}

export default playList;
