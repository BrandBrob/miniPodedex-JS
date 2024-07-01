const div = document.querySelector(".pokemon-div")
const obtainPokemonAxios = async ()=>{
    let res =  await axios(`https://pokeapi.co/api/v2/pokemon/charizard/`)
    console.log(res.data.sprites.versions["generation-iv"]["diamond-pearl"])
    getImages(res.data.sprites.versions["generation-iv"]["diamond-pearl"])
}
const getImages = (image)=>{
    value = Object.values(image);
    for (let i = 0; i < value.length; i++) {
        if(value[i] === null){
        continue
        }
       div.innerHTML += `<img src=${value[i]}>`
    }
}

try{
    obtainPokemonAxios()
}
catch(e){
    console.log(e)
}


