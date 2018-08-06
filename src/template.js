import Mustache from 'mustache';

export default class Template {
  constructor(templates, contents, order) {
    this.templates = templates;
    this.contents = contents;
    this.order = order;
  }

  get masterTemplate() {
    return this.order.reduce((acc, key) => {
      let string = '';
      if (this.contents[key]) {
        string = this.templates[key] || '';
      }
      return acc + string;
    }, '');
  }

  render(data, cb) {
    const mt = this.masterTemplate;
    const output = Mustache.render(mt, data);
    if (!cb) {
      return output;
    }
    return cb(output);
  }
}
