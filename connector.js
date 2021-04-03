import page from "//unpkg.com/page/page.mjs";
import { html, render } from 'https://unpkg.com/lit-html?module';

import {logout as apiLogout} from "./data.js"

import {catalog} from "./catalog.js";
import {login} from "./login.js";
import {register} from "./register.js";
import {create} from "./create.js";
import {details} from "./details.js";
import {edit} from "./edit.js";
import {myPublications} from "./myPublications.js";

let main=document.getElementsByClassName("container")[0];
let nav=document.getElementsByClassName("nav");
let logoutBtn=document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", logout);

function logout(){
    console.log("logout")
    apiLogout();
    setUserNav();
    page.redirect("/")
}

setUserNav()

page("/", loadData, catalog);
page("/login", loadData, login);
page("/register", loadData, register);
page("/create", loadData, create);
page("/details/:id", loadData, details);
page("/edit/:id", loadData, edit);
page("/myPublications", loadData, myPublications);
page.start()


function setUserNav(){
    let guest=document.getElementById("guest");
    let user=document.getElementById("user");
    let userIsLogged=sessionStorage.getItem("userId");
    if (userIsLogged!=null){
        guest.style.display="none";
        user.style.display="block";
    } else {
        guest.style.display="block";
        user.style.display="none";
    }
}

function loadData(ctx, next){
    ctx.render=function(view){
        render(view,main);
    }
    ctx.setUserNav=setUserNav;
    setUserNav();
    next();
}