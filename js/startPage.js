window.onload = function(){
    document.getElementById("LoginBox").addEventListener("click", startLogin)
    function startLogin(){
        if(document.getElementById("loginForm").style.display == "flex"){
            document.getElementById("loginForm").style.display = "none";  
        }
        else{
            document.getElementById("loginForm").style.display = "flex";
        }

    }
}