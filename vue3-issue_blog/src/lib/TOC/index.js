class TOC {
    constructor(o = {}) {
        const { target = 'body', tocClass = 'toc', h2Class = 'toc-2', h3Class = 'toc-3' } = o;

        this.target = target;
        this.tocClass = tocClass;
        this.h2Class = h2Class;
        this.h3Class = h3Class;

        return this.init();
    }

    init() {
        const toc = document.createElement('ul');
        toc.classList.add(`${this.tocClass}__list`);

        const heads = document.querySelectorAll(`${this.target} h2 , ${this.target} h3`);

        heads.forEach(el => {
            el.id = el.id.toString() || el.textContent;
            // 
            const a = document.createElement('a');
            a.innerHTML = el.textContent;
            a.href = `#${el.id}`;

            const li = document.createElement('li');
            li.appendChild(a);

            // h2
            if (el.tagName === 'H2') {
                li.classList.add(this.h2Class)
                toc.appendChild(li);
            }
            // h3
            if (el.tagName === 'H3') {
                li.classList.add(this.h3Class);
                const lastLi = toc.lastElementChild;

                if (lastLi.lastElementChild.tagName === 'A') {
                    const ul = document.createElement('ul');
                    ul.appendChild(li)
                    lastLi.appendChild(ul)
                } else {
                    lastLi.lastElementChild.appendChild(li);
                }

            }
        })

        return toc
    }
}

export default TOC;