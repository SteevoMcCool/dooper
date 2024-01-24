let ele = document.getElementById("no")
let div = document.getElementById("div")

let ele2 = document.getElementById("yes")
let divC = div.getBoundingClientRect()

ele.style.position = "absolute"
ele.style.top = `${105}px`
ele.style.left =`${700}px`
let moving = 0
let r = 0
document.addEventListener("mousemove",function(event){
    let mX = event.clientX
    let mY = event.clientY
    let bounds = ele.getBoundingClientRect()
    let cX = (bounds.left + bounds.right)/2
    let cY = (bounds.top + bounds.bottom)/2
    let dx = mX - cX
    let dy = -(mY - cY)
    let newr = Math.sqrt(dx**2 + dy**2) 
    let dr = r - newr
    let angle = Math.atan2(dy,dx)
    let mag = Math.max(0, (50 + moving + dr/5) - newr)
    if (mag > 0 ){
        moving = Math.min(moving+1,30)
        mag += dr*0.5
        ele.style.transition = `   transition: all 0s, background-color 0.2s, transform 0.2s;`
    }else{
        ele.style.transition = `   transition: all 0.2s, background-color 0.2s, transform 0.2s;`
    }
    let newX =  (bounds.left + -Math.cos(angle) * mag)
    let newY =  (bounds.top + Math.sin(angle) * mag) 

    if (newX < 0) {
        newX = divC.width -bounds.height - 12
    }
    if (newY < 0){
        newY = divC.height -bounds.width - 12
    }
    if (newX > divC.width){
        newX = (newX % divC.width) + 12
    }
    if (newY > divC.height){
        newY = (newY % divC.height) + 12
    }
    ele.style.left =  `${newX}px`
    ele.style.top =  `${newY}px`
    r = newr
})

ele.addEventListener("focus", function(){
    ele2.focus()
})

ele2.addEventListener("click",function(){
    let r = 250 + Math.floor(Math.random()*6)
    let g = 101 + Math.floor(Math.random()**(1.5)*100)
    let b =  176+Math.floor(Math.random()**(0.8)*50)
    document.body.style.backgroundColor = `rgb(${r},${g},${b})`
    document.body.insertAdjacentHTML("beforeend",`<p>Hooray!</p>`)
})

ele.addEventListener("click",function(){
    document.body.style.backgroundColor = `rgb(80,90,120)`
    document.body.insertAdjacentHTML("beforeend",`<p>Boooo!</p>`)
})
//poop

window.onresize = function(){
    divC = div.getBoundingClientRect()
}