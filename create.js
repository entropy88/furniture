import { html, render } from 'https://unpkg.com/lit-html?module';
import {createFurniture} from "./data.js";


function createTemplate(onSubmit){
return html`
 <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control valid" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control is-valid" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control is-invalid" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
`
}

export async function create(ctx){
    ctx.render(createTemplate(onSubmit));
    

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
    
        await createFurniture(newItem);
        ctx.page.redirect("/");
    }

    
}