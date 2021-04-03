import { html, render } from 'https://unpkg.com/lit-html?module';
import {getFurnitureById} from "./data.js";
import {updateFurniture} from "./data.js";

function editTemplate(item, onSubmit){
    return html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control valid" id="new-make" type="text" name="make" .value=${item.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control is-valid" id="new-model" type="text" name="model" .value=${item.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control is-invalid" id="new-year" type="number" name="year" .value=${item.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" .value=${item.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price"  .value=${item.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img"  .value=${item.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material"  .value=${item.material}>
                    </div>
                    <input type="submit" class="btn btn-primary" value="edit" />
                </div>
            </div>
        </form>
    `
}

export async function edit(ctx){
    let itemId=ctx.params.id;
    let item=await getFurnitureById(itemId)
    ctx.render(editTemplate(item, onSubmit));
    

    async function onSubmit(e){
        e.preventDefault();
        let form=e.target;
        let formData= new FormData(form);

        let make=formData.get("make");
        let model=formData.get("model");
        let year=Number(formData.get("year"));
        let price=Number(formData.get("price"));
        let img=formData.get("img");
        let material=formData.get("material");
        let description=formData.get("description");

        let newItem={
            make,
            model,
            year,
            price,
            img,
            material,
            description
        }
    
        await updateFurniture(itemId,newItem);
        ctx.page.redirect("/");
    }

    
}