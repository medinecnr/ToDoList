const yapilacak = document.getElementById('yapilacak')
const btn = document.getElementById('btn')
const wrapper = document.querySelector('.wrapper')

btn.addEventListener('click',kaydet)
yapilacak.addEventListener('keydown',(e)=>{
    if(e.key == 'Enter'){
        kaydet()
    }
})

function kaydet(){
    let yapilacaklar = JSON.parse(localStorage.getItem('todos'))
    if(yapilacak.value.trim() != ''){
        let todo ={
            id:Date.now(),
            yap:yapilacak.value,
            yapildimi:false
        }
    
       yapilacaklar.push(todo)
       localStorage.setItem('todos',JSON.stringify(yapilacaklar))

       addHtml(todo)
    }  
    yapilacak.value = ''
}

function sayfaBaslarken(){
    let todos = JSON.parse(localStorage.getItem('todos'))
    if(todos){
        for(let i of todos){
            addHtml(i)
        }
    }else{
        localStorage.setItem('todos','[]')
    }
}

sayfaBaslarken()

function addHtml(todo){
    
    let kapsayici = document.createElement('div')
    kapsayici.classList.add('kapsayici')
    kapsayici.id = todo.id
    if(todo.yapildimi == true){
        kapsayici.classList.add('yapildi')
    }
    kapsayici.innerHTML =
    `
        <span>${todo.yap}</span>
        <div class="icon-div">
            <i class="fa-solid fa-check" onclick=check(${todo.id})></i>
            <i class="fa-regular fa-pen-to-square" onclick=edit(${todo.id})></i>
            <i class="fa-solid fa-x" onclick=sil(${todo.id}) ></i>
        </div>
    
    `
    wrapper.appendChild(kapsayici)
}

function edit(id){
    let todos = JSON.parse(localStorage.getItem('todos'))
    let ilgiliTodo = todos.find((eleman)=>eleman.id == id)
    let kapsayici = document.getElementById(id)
    kapsayici.innerHTML = ''
    kapsayici.classList.add('input-g')
    
    let input = document.createElement('input')
    input.classList.add('inp-edit')
    let btn = document.createElement('button')
    btn.classList.add('btn-edit')
    btn.textContent='Degistir'
    kapsayici.append(input,btn)

    btn.onclick = guncelle
    function guncelle(){
        ilgiliTodo.yap = input.value
        ilgiliTodo.yapildimi = false
        localStorage.setItem('todos',JSON.stringify(todos))
        kapsayici.classList.remove('input-g','yapildi')
    
        kapsayici.innerHTML =
        `
            <span>${ilgiliTodo.yap}</span>
            <div class="icon-div">
                <i class="fa-solid fa-check" onclick=check(${ilgiliTodo.id})></i>
                <i class="fa-regular fa-pen-to-square" onclick=edit(${ilgiliTodo.id})></i>
                <i class="fa-solid fa-x" onclick=sil(${ilgiliTodo.id}) ></i>
            </div>
    
        `
    }
    

}

function sil(id){
    let todos = JSON.parse(localStorage.getItem('todos'))
    let silinmis = todos.filter((eleman,index)=>eleman.id != id)
    
    localStorage.setItem('todos',JSON.stringify(silinmis))
    let kapsayici = document.getElementById(id)
    kapsayici.style.animation = 'efektli-sil .3s linear'
    setInterval(()=>{
        kapsayici.remove()
    },300)
}

function check(id){
    let todos = JSON.parse(localStorage.getItem('todos'))
    let ilgiliTodo = todos.find((eleman)=>eleman.id == id)

    console.log(ilgiliTodo)
    ilgiliTodo.yapildimi = !ilgiliTodo.yapildimi

    localStorage.setItem('todos',JSON.stringify(todos))
    
    let kapsayici = document.getElementById(id) 
    kapsayici.classList.toggle('yapildi')
}