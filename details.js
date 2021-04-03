import { html, render } from 'https://unpkg.com/lit-html?module';
import {getFurnitureById} from "./data.js";
import {deleteFurniture} from "./data.js";


function itemTemplate(item, userIsOwner,delFurniture){
    return html`
     <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${item.img}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${item.make}</span></p>
                <p>Model: <span>${item.model}</span></p>
                <p>Year: <span>${item.year}</span></p>
                <p>Description: <span>${item.description}</span></p>
                <p>Price: <span>${item.price}</span></p>
                <p>Material: <span>${item.material}</span></p>
                ${userIsOwner?html` <div>
                    <a href="/edit/${item._id}" class="btn btn-info">Edit</a>
                    <a @click=${delFurniture} href="javascript:void(0)" class="btn btn-red">Delete</a>
                </div>`:""}
               
            </div>
        </div>
    `
}

export async function details(ctx){
    let itemId=ctx.params.id;
    let item=await getFurnitureById(itemId);
    let userIsOwner=item._ownerId==sessionStorage.getItem("userId");

    async function delFurniture(){
        let confirmed=confirm("are you sure?");
        if (confirmed){
            await deleteFurniture(itemId);
            ctx.page.redirect("/");
        }
    
    }

    ctx.render(itemTemplate(item, userIsOwner,delFurniture));
}


