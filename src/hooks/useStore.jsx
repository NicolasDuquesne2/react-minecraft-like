import { nanoid } from 'nanoid'
import create from 'zustand'


export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: [
    {
        key: nanoid(),
        pos: [0, 0.5, -  1],
        texture: 'dirt',
    },
    {
        key: nanoid(),
        pos: [1, 0.5, -  1],
        texture: 'glass',
    },
],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes : [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture
                }
            ]
        }))
    },
    removeCube: () => {},
    setTexture: () => {},
    saveWord: () => {},
    resetWord: () => {},
}))