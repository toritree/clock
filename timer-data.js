class TimerData extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(document.getElementById("timer-data").content.cloneNode(true))
  }
  static get observedAttributes() { return ["title","time","remove","start"]; }
  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot.getElementById("title").textContent = this.getAttribute("title")
    this.shadowRoot.getElementById("time").textContent = this.getAttribute("time")
    this.shadowRoot.getElementById("remove").onclick =this.onclose
    this.shadowRoot.getElementById("start").onclick = this.onclick
    console.log(this.shadowRoot.getElementById("start").onclick)
  }
}
customElements.define('time-data', TimerData)