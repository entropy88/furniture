import * as api  from "./api.js"

const host="http://localhost:3030"
api.settings.host=host;

export const login=api.login;
export const register=api.register;
export const logout=api.logout;

export async function createFurniture(item){
    return await api.post(host+"/data/catalog", item)
}

export async function getAllFurniture(){
    return await api.get("http://localhost:3030/data/catalog")
}

export async function getFurnitureById(id){
    return await api.get("http://localhost:3030/data/catalog/"+id)
}

export async function updateFurniture(id, item){
    return await api.put("http://localhost:3030/data/catalog/"+id,item)
}

export async function deleteFurniture(id){
    return await api.del("http://localhost:3030/data/catalog/" + id)
}

export async function getMyFurniture(userId){
    return await api.get(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`)
}