import { html, render } from 'https://unpkg.com/lit-html?module';
import {getAllFurniture} from "./data.js"

function catalogTemplate(data){
    return html`
      <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
       ${data.map(itemTemplate)}
           
        </div>
    `
}

export async function catalog(ctx){
    let data=await getAllFurniture();
    ctx.render(catalogTemplate(data))
}

function itemTemplate(item){
    return html`
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
            </div>
</div>
    `
}