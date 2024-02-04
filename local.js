let todo = {
    id:123123,
    yapilacak:'Bulasik yika',
    yapildimi:true
}

let kayitliBilgi = localStorage.getItem('todos')

let kayitliBilgiObj = JSON.parse(kayitliBilgi)

console.log(
    kayitliBilgiObj
)

