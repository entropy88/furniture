import { html } from 'https://unpkg.com/lit-html?module';
import {login as apiLogin} from "./data.js"

function loginTemplate(onSubmit){
    return html`
     <div  class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
    </div>
    `
}

export async function login(ctx){
    ctx.render(loginTemplate(onSubmit));
    
    async function onSubmit(e){
        e.preventDefault()
        let form=e.target;
        let formData= new FormData(form);
        let email=formData.get("email");
        let password=formData.get("password");
        await apiLogin(email, password);
        ctx.page.redirect("/")
       }    
    }