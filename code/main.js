const div = document.querySelector(".pokemon-div")

let poke = prompt("Which pokemon do you want to see?")

const getPokemonAxios = async()=>{
    let pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${poke}/`)
    console.log(pokemon.data.sprites)
    const images = getImages(pokemon.data.sprites)
    displayImages(images)
}
function getImages(input) {
    const images = [];
    for (const entry of Object.values(input)) {
        if (typeof entry === 'string') {
            images.push(entry);
        } else {
            if (entry === null) continue;
            images.push(getImages(entry));
        }
    }
    console.log(images.flat())
    return images.flat();
}

const displayImages = (images)=>{
    images.forEach(src => {
        const img = document.createElement("img");
        img.style.width="300px"
        img.src = src;
        div.appendChild(img)
    });
}
getPokemonAxios()