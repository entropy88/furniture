import { html } from 'https://unpkg.com/lit-html?module';
import {register as apiRegister} from "./data.js"

function registerTemplate(onSubmit){
    return html`
     <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
    </div>
    `
}

export async function register(ctx){
    ctx.render(registerTemplate(onSubmit));
    
    async function onSubmit(e){
        e.preventDefault()
        let form=e.target;
        let formData= new FormData(form);
        let email=formData.get("email");
        let password=formData.get("password");
        let repass=formData.get("rePass");
        if (password!==repass){
            return alert("Passwords are not the same!")
        }
        await apiRegister(email, password);
        ctx.page.redirect("/")
       }    
    }