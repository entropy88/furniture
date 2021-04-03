import { html } from 'https://unpkg.com/lit-html?module';
import {getMyFurniture} from "./data.js";

function myPublicationsTemplate(data){
    return html`
      <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        ${data.length>0? data.map(itemTemplate):html`<p>No furniture</p>`}
      
        </div>
    `
}

function itemTemplate(item){
    return html`
    <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${item.img}" />
                            <p>${item.description}</p>
                            <footer>
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${item._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>`
}

export async function myPublications(ctx){
    let userId=sessionStorage.getItem("userId");
    let data= await getMyFurniture(userId);
    ctx.render(myPublicationsTemplate(data))
}