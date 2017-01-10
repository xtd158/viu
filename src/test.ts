import v from './v';

function diff(newEl: Element, oldEl: Element) {
    while (oldEl.firstChild) {
        oldEl.removeChild(oldEl.firstChild);
    }

    [].forEach.call(newEl.children, (el) => {
        oldEl.appendChild(el);
    });

    console.log(newEl);

}

class List {
    constructor(private list: string[]) {}
    public render() {
        return v`
        <ul>
            ${this.list.map(item => v`<li>${item}</li>`)}
        </ul>
        `;
    }

    public update(list: string[]) {
        this.list = list;
    }
}

class App {
    private list = [
        'aaaaaaaa',
        'bbbbbbbb',
        'cccccccc'
    ];
    private el: Element;
    private listCmp: List;

    constructor() {
        this.listCmp = new List(this.list);
    }

    public insert = () => {
        this.list.push((+new Date()).toString());
        this.listCmp.update(this.list);
        let newEl = this.render();
        // @todo: use dom diff
        diff(newEl, this.el);
    }

    public render() {
        let newC = 'new-class';
        return v`
        <div class= "panel ${newC}">
        <h1 class="panel-title">This is title</h1>
        <br />
        <div class="panel-content">
        ${this.listCmp.render()}
        </div>
        <button onclick=${this.insert} >添加</button>
        </div>
        `;
    }

    public mount(container: Element) {
        this.el = this.render();
        container.appendChild(this.el);
    }
}

const app = new App();
app.mount(document.querySelector('.app'));
