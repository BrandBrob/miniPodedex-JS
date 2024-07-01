const div = document.querySelector(".pokemon-div");
const btnNext = document.querySelector(".next");
const btnBack = document.querySelector(".back");

const inpPoke = document.getElementById("inp-text")
const inpGene = document.getElementById("inp-gener")
const inpGame = document.getElementById("inp-game")
const inpSend = document.getElementById("inp-btn")

const dataListPokemon = document.getElementById("inp-text1")
const dataListgen = document.getElementById("inp-gener1")
const dataListgame = document.getElementById("inp-game1")
const pokemonStatsDiv = document.getElementById("stats")
const getAllPokemons = async()=>{
    const res = await axios("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    const pokemons = Object.values(res.data.results)
    pokemons.forEach(poke => {
        createOptionPokemon(poke.name)
    });
}

const createOptionPokemon = (pokemon)=>{
    const newOption = document.createElement("option")
    newOption.innerHTML = pokemon
    dataListPokemon.appendChild(newOption)

}
const addOptionsToLists = async()=>{
    const res = await axios(`https://pokeapi.co/api/v2/pokemon/pikachu/`)
    const generation = res.data.sprites.versions
    const game = res.data.sprites.versions
    console.log(game)
    const generations = Object.keys(generation)
    generations.forEach(gener => {
        console.log(gener)
        if(gener == "generation-v"){
            const blackAnime = generation[gener]["black-white"]["animated"]
           // blackGifs()
        }
        let games1 = (Object.keys(game[gener])[0])
        let games2 = (Object.keys(game[gener])[1])
        createOptionsGener(gener)
        createOptionGame(games1,games2)
    });

}
const createOptionsGener = (gen)=>{
    const newOption = document.createElement("option")
    newOption.innerHTML = gen
    dataListgen.appendChild(newOption)
}
const createOptionGame = (game1,game2)=>{
    const newOption1 = document.createElement("option")
    const newOption2 = document.createElement("option")
    newOption1.innerHTML = game1
    newOption2.innerHTML = game2
    dataListgame.appendChild(newOption1)
    dataListgame.appendChild(newOption2)
}

const obtainPokemonAxios = async () => {
    let pokemon = inpPoke.value
    console.log(pokemon)
    const h2 = document.querySelector(".name")
    h2.classList.remove("dis")
    h2.textContent = pokemon.toUpperCase()
    let res = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    console.log(res.data)
    let stats = res.data.stats
    showStats(stats)
    showIdandType(res.data.game_indices[19]["game_index"],res.data.types[0]["type"]["name"])
    console.log(res.data.game_indices)
    getImages(res.data.sprites.versions[inpGene.value][inpGame.value]);
};

let index = 0;
let value = [];
const getImages = (image) => {
    console.log(image)
    if(inpGene.value !=="generation-v"){
    value = Object.values(image).filter(img => img !== null);// Default Image
    } else{
    value = Object.values(image.animated).filter(img=>img !== null);
    }
    div.innerHTML = `<img id=${index} src=${value[0]}>`;
    btnBack.addEventListener("click", () => {
        if (index > 0) {
            index--;
            eraseImage(index + 1);
            showImages(value, index);
            console.log(index);
        }
    });
    btnNext.addEventListener("click", () => {
        if (index < value.length - 1) {
            index++;
            showImages(value, index);
            console.log(index);
        }
    });
};
const showImages = (value, index) => {
    if (value[index] == null) {
        return;
    }
    div.innerHTML = `<img id=${index} src=${value[index]}>`; // Replace the images
};
const eraseImage = (index) => {
    const imgToErase = document.getElementById(index);
    if (imgToErase) {
        imgToErase.remove();
    }
};
const showIdandType=(pokemonId,type)=>{
    const idText = document.querySelector(".id")
    const typeText = document.querySelector(".type")
    idText.classList.remove("dis")
    idText.textContent =`Id: ${pokemonId}`
    typeText.classList.remove("dis")
    typeText.textContent =`Type: ${type}`
}
let i = 0
let numP = []
const showStats = (stats)=>{
    stats.forEach(stat => {
        console.log( stat["stat"]["name"])
        console.log(stat["base_stat"])
        i++
        numP.push(i)
        console.log(numP)
        let p = document.createElement("p")
        p.classList.add("stat")
        p.innerHTML = `${stat["stat"]["name"]} ${stat["base_stat"]}`
        pokemonStatsDiv.appendChild(p)
        inpSend.addEventListener("click",()=>{
            numP.forEach(erase => {
                p.remove()
            });
        })
        });
}
getAllPokemons()
addOptionsToLists()
inpSend.addEventListener("click",()=>{
    obtainPokemonAxios();
    btnBack.classList.remove("dis"); btnNext.classList.remove("dis");
})