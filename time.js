export class Time extends HTMLElement{
  static get observedAttributes() { return ["repeat","step","r","start","hourtime","minshintime","secondtime","time"]; }
  attributeChangedCallback(name, oldValue, newValue) {
      this.updateTime(this)
    if (name === "start" || name === "step" || name === "r" || name === "repeat") {
      this.shadowRoot.getElementById("main").innerHTML = this.DOM
    }
  }
  updateTime = (elm) => {
    const shadow = elm.shadowRoot
    shadow.getElementById("Minshin").setAttribute("style",`--col-needle-c:green;--needle-w:2;--needle-r:${elm.getAttribute("minshintime")};`)
    shadow.getElementById("hourHand").setAttribute("style",`--col-needle-c:red;--needle-w:3;--needle-r:${elm.getAttribute("hourtime")};`)
    shadow.getElementById("secondHand").setAttribute("style", `--col-needle-c:yellow;--needle-w:5;--needle-r:${elm.getAttribute("secondtime")};`)
    shadow.getElementById("time").textContent = elm.getAttribute("time")
  }

  get DOM() {
    let repeat = []
    if (
      this.hasAttribute("start")
      && this.hasAttribute("step")
      && this.hasAttribute("r")
      && this.hasAttribute("repeat")
    ) {
      for (let i = Number(this.getAttribute("start")); i <= Number(this.getAttribute("repeat")); i += Number(this.getAttribute("step")))
        repeat.push(`<span class="time" style="--r:${i * Number(this.getAttribute("r"))}"><span>${i}</span></span>`)
    }
    repeat = repeat.join("")
    return `
    <div class="clockBoard">
      <div class="needle">
        <span id="Minshin" style="--col-needle-c:green;--needle-w:2;--needle-r:${this.getAttribute("minshintime")};"></span>
        <span id="hourHand" style="--col-needle-c:red;--needle-w:3;--needle-r:${this.getAttribute("hourtime")};"></span>
        <span id="secondHand" style="--col-needle-c:yellow;--needle-w:5;--needle-r:${this.getAttribute("secondtime")};"></span>
      </div>
      ${repeat}
    </div>
    <div class="time">
      <span id="time"></span>
    </div>
    `
  }
  get STYLE() {
    return `    div#main{
      --wid:500px;
      --col-bg:rgb(247, 247, 247);
      --col-bo:rgb(69, 69, 69);
      --col-font:rgb(132, 132, 132);
    }
    @media (prefers-color-scheme: dark) {
      div#main{
      --wid:500px;
      --col-bg:rgb(28, 28, 28);
      --col-bo:rgb(69, 69, 69);
      --col-font:rgb(132, 132, 132);
    }
    }
    div#main{
      height: calc(var(--wid) * 1.4);
      width: calc(var(--wid) * 1.2);
    }
    div.clockBoard{
      display: block;
      width: var(--wid);
      height: var(--wid);
      background-color: var(--col-bg);
      border:1.5px solid var(--col-bo);
      box-shadow: 0 0 80px var(--col-bo);
      border-radius: var(--wid);
      margin: 0 auto;
      position: relative;
    }
    div.time{
      height:calc(var(--wid) * 0.4);
      width: var(--wid);
      margin: 0 auto;
      margin-top:calc(var(--wid) * 0.1);
      text-align: center;
      font-size:3em;
      color: var(--col-font);
    }
    div.clockBoard::before{
      position:absolute;
      inset: 50%;
      content: "";
      width: 10px;
      height: 10px;
      transform: translate(-50%, -50%);
      display: block;
      border: 2px solid var(--col-bo);
      border-radius: 10px;
    }
    span.time{
      position: absolute;
      display: inline-block;
      text-align: center;
      width: calc(var(--wid) - 10%);
      inset: 20px;
      color: var(--col-font);
      font-weight: 1000;
      font-size: 1.5em;
      transform: rotate(calc(1deg * var(--r)));
    }
    span.time span{
      display: inline-block;
      transform: rotate(calc(-1deg * var(--r)));
    }
    div.needle{
      display: block;
      width: var(--wid);
      height: var(--wid);
      position: absolute;
      top:0;
      left:0;
    }
    div.needle::after{
      position:absolute;
      inset: 50%;
      transform: translate(-50%, -50%);
      content: "";
      width: calc(var(--wid) / 2);
      height: calc(var(--wid) / 2);
      display: block;
      border: 1px solid var(--col-bo);
      border-radius: calc(var(--wid) / 2);
    }
    div.needle span{
      position:absolute;
      display: inline-block;
      width: calc(var(--wid) / var(--needle-w));
      height: calc(var(--wid) / var(--needle-w));
      inset: 50%;
      transform: translate(-50%, -50%) rotate( calc( 1deg * var(--needle-r)) );
    }
    div.needle span::before{
      display: inline-block;
      position: relative;
      top:calc(50% - 10px);
      content: "";
      width: 10px;
      height: 10px;
      background-color:  var(--col-needle-c);
      transform: translate(-5px);
      border-radius: 10px;
      box-shadow: 0 0 20px var(--col-needle-c);
    }
    `
  }

  constructor() {
    super()
    
    this.attachShadow({ mode: 'open' })
    const style = document.createElement("style")
    style.textContent = this.STYLE
    const dom = document.createElement("div")
    dom.id="main"
    dom.innerHTML = this.DOM
    this.shadowRoot.append(style,dom)
  }
}

customElements.define('time-time', Time)