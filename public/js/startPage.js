window.onload = function(){
    document.getElementById("LoginBox").addEventListener("click", startLogin)
    function startLogin(){
        if(document.getElementById("loginForm").style.display == "flex"){
            document.getElementById("loginForm").style.display = "none";  
        }
        else{
            document.getElementById("signupForm").style.display = "none";  
            document.getElementById("loginForm").style.display = "flex";
        }

    }

    document.getElementById("SignupBox").addEventListener("click", startSignup)
    function startSignup(){
        if(document.getElementById("signupForm").style.display == "flex"){
            document.getElementById("signupForm").style.display = "none";  
        }
        else{
            document.getElementById("loginForm").style.display = "none";  
            document.getElementById("signupForm").style.display = "flex";
        }

    }
}