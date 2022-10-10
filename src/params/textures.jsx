import { TextureLoader, NearestFilter } from 'three'

import { 
    dirtImg,
    grassImg,
    glassImg,
    logImg,
    woodImg
} from './images'


//load Textures

const dirtTexture = new TextureLoader().load(dirtImg)
const grassTexture = new TextureLoader().load(grassImg)
const glassTexture = new TextureLoader().load(glassImg)
const logTexture = new TextureLoader().load(logImg)
const woodTexture = new TextureLoader().load(woodImg)
const groundTexture = new TextureLoader().load(grassImg)

// remove blur effects
groundTexture.magFilter = NearestFilter
dirtTexture.magFilter = NearestFilter
grassTexture.magFilter = NearestFilter
logTexture.magFilter = NearestFilter
woodTexture.magFilter = NearestFilter


export {
    dirtTexture,
    grassTexture,
    glassTexture,
    logTexture,
    woodTexture,
    groundTexture
}