let cards = document.getElementById('cards')
let cardsPorcoes = document.getElementById('cards-porcoes')
console.log(cards)
let numeroID = 0
let numeroPorcao = 0

fetch('http://localhost:3000/lanches').then(res => res.json()).then(res => {
  res.map(data => {
    numeroID++
    cards.append(criarDiv(data.imagem, data.preco, data.name, numeroID))
  })
})

fetch('http://localhost:3000/porcoes').then(res => res.json()).then(res => {
  res.map(data => {
    numeroPorcao++
    cardsPorcoes.append(criarDivPorcoes(data.imagem, data.preco, data.nome, numeroPorcao))
  })
})


function criarCardFlutuante(name,imagem,preco,ingredientes){
  console.log(ingredientes)
  let div = document.createElement('div')
  div.id = 'myModal'
  div.classList.add('modal','d-flex', 'justify-content-end','align-items-center')
  div.innerHTML = `
  <div class="modal-content">
      <span class="close w-100 d-flex justify-content-end">&times;</span>
      <header >
          <div class="container d-flex justify-content-space-between mb-3">
              <img src="${imagem}" class="w-50 m-1 formatacao-ingredientes rounded-lg" alt="">
              <div class="container d-flex flex-column align-items-center justify-content-center">
                  <h3 class="  titulo-card">${name}</h3>
                  <h2 class=" preco-card">R$${preco}</h2>
              </div>
          </div>
          <div class="text-start p-2  formatacao-ingredientes">
              <h2 class="pl-2 text-white textos-ingredientes mb-0">Ingredientes</h2>
          </div>
      </header>
  </div>

  `

 
  let listaIngredientes = document.createElement('div')
  listaIngredientes.classList.add('lista-ingredientes', 'mt-1', 'p-3', 'formatacao-ingredientes')
  let ul = document.createElement('ul')
  ingredientes.forEach((ingrediente)=>{
    let li = document.createElement('li')
    li.classList.add('li-ingredientes')
    let h4 = document.createElement('h4')
    h4.classList.add('textos-ingredientes-composicao')
    h4.innerHTML = ingrediente
    li.append(h4)
    ul.append(li)
  })
  listaIngredientes.append(ul)
  div.querySelector('header').append(listaIngredientes)
  document.querySelector('body').append(div)

  div.querySelector('.close').onclick = function() {
    div.remove()
  }
  window.onclick = function(event) {
    if (event.target == div) {
      div.remove()
    }
  }

  return div
}



function criarDiv(imagem, preco, nome, numeroID) {
  let div = document.createElement('div')
  div.innerHTML = `

  <div class="col-4 card-lanche " id="${numeroID}">
  <div class="card  propriedades-card  mb-4" style="width: 18rem;">
    <img src="${imagem}" class="card-img-config" alt="">
    <div class="card-body">
      <h3 class = "card-text text-center titulo-card">${nome}</h3>
      <h2 class="card-text text-center preco-card">R$${preco}</h2>
    </div>
  </div>
  </div>


  `
 
  div.style.cursor = 'pointer'
  div.addEventListener('click', (ev) => {
    console.log(ev.target)
    fetch('http://localhost:3000/lanches/' + numeroID).then(res => res.json()).then(res => {
    console.log(res)
    document.querySelector('body').append(criarCardFlutuante(res.name,res.imagem,res.preco,res.ingredientes))
    })
  })
  return div
}


function criarDivPorcoes(imagem, preco, nome, numeroPorcao) {
  let div = document.createElement('div')
  div.innerHTML = `
  <div class="col-4 card-lanche " id="${numeroPorcao}">
  <div class="card  propriedades-card  mb-4" style="width: 18rem;">
    <img src="${imagem}" class="card-img-config" alt="">
    <div class="card-body">
      <h3 class = "card-text text-center titulo-card">${nome}</h3>
      <h2 class="card-text text-center preco-card">R$${preco}</h2>
    </div>
  </div>
  </div>
      
       
  `
  div.style.cursor = 'pointer'
  div.addEventListener('click', (ev) => {
    console.log(ev.target)
    fetch('http://localhost:3000/porcoes/' + numeroPorcao).then(res => res.json()).then(res => {
    console.log(res)
    document.querySelector('body').append(criarCardFlutuantePorcoes(res.nome,res.imagem,res.preco,res.descricao))
    })
  })
  return div
}

function criarCardFlutuantePorcoes(nome,imagem,preco,descricao){

  let div = document.createElement('div')
  div.id = 'myModal'
  div.classList.add('modal','d-flex', 'justify-content-center', 'align-items-center')
  div.innerHTML = `
 
  <div class="modal-content">
      <span class="close w-100 d-flex justify-content-end ">&times;</span>
      <header >
          <div class="container d-flex justify-content-space-between mb-3">
              <img src="${imagem}" class="w-50 m-1 formatacao-ingredientes" alt="">
              <div class="container d-flex flex-column align-items-center justify-content-center">
                  <h3 class=" text-center  titulo-card">${nome}</h3>
                  <h2 class=" preco-card">R$${preco}</h2>
              </div>
          </div>
          <div class="text-start p-2  formatacao-ingredientes">
              <h2 class=" pl-2 text-white textos-ingredientes mb-0">Descrição</h2>
          </div>
          <div class="p-5 formatacao-ingredientes mt-2">
          <h4 class="mb-auto titulo-card text-center text-lg">
            Essa é a descrição da porção de batata
          </h4>
          </div>
      </header>
  </div>


  `
  div.querySelector('.close').onclick = function() {
    div.remove()
  }
  window.onclick = function(event) {
    if (event.target == div) {
      div.remove()
    }
  }

  return div
}