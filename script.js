const body = document.getElementById('body')
console.log(body)

body.addEventListener('click', (e)=>{
    console.log('clicked the div')
    console.log(e)
    console.log(e.clientX + ' ' + e.clientY)  //i think this gives the absolute position of the mouse on the screen
    let div = document.createElement('div')
    div.className = 'node'
    // div.style.position = 'relative'
    div.style.left = e.pageX+"px"
    div.style.top = e.pageY+"px"
    console.log(div)
    body.appendChild(div)
})