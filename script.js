const CLOCK = () => {
  const time = document.getElementById("clock-main")
  setInterval(() => {
    const d =new Date()
    time.setAttribute("minshintime", d.getMinutes()*6 + 90)
    time.setAttribute("hourtime", d.getHours()*30 + 90)
    time.setAttribute("secondtime",  (d.getMilliseconds()/1000 + d.getSeconds()) * 6 + 90)
    time.setAttribute("time",`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
  },10)
  const utc = document.getElementById("clock-utc-time")
  utc.textContent = `${new Date().getTimezoneOffset()/60} (UTC)`
}

window.onload = () => {
  strTest()
  CLOCK()
  document.getElementById("clock-nav").onclick=jumpLink
  document.getElementById("timer-nav").onclick=jumpLink
  document.getElementById("stopwatch-nav").onclick = jumpLink
  document.getElementById("timer-menu-add-bu").addEventListener("click",TimerMenuAddBu)
}
const strTest = () => {
  if (!localStorage.getItem("time")) {
    localStorage.setItem("time","[]")
  }
}
const setStr = (time,title) => {
  const s = JSON.parse(localStorage.getItem("time"))
  s.push({ time, title })
  localStorage.setItem("time",JSON.stringify(s))
}

const jumpLink = (e) => {
  document.getElementById("clock-nav").className=""
  document.getElementById("timer-nav").className=""
  document.getElementById("stopwatch-nav").className=""
  e.target.className = "tar"
  window.location.hash = e.target.dataset.hash
}
const TimerMenuAddBu = () => {
  const tar = document.getElementById("timer-menu-box")
  const title = prompt("What is the title?")
  const time = prompt("How many minutes do you want?(T:M:S)")
  if(time.split(":").length !== 3)return
  if (title && time) {
    const ele = document.createElement("time-data")
    addMenu(ele,tar,title,time)
    setStr(time.split(":"),title)
  }
}
const addMenu = (ele,tar,title,time) => {
  ele.setAttribute("title",title)
  ele.setAttribute("time",time)
  tar.insertBefore(ele, document.getElementById("timer-menu-add"))
}