export class PostModel {
  public id: string;
  constructor(
    public header: string,
    public content: string,
  ) {
    this.id = (Date.now() + Math.floor(Math.random() * 10000)).toString()
  }
}
