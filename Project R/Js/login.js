function validation(){
    if(document.Formfill.Email.value==""){
    document.getElementById("result").innerHTML="Enter your Email";
    return false;
}
else if(document.Formfill.Password.value==""){
    document.getElementById("result").innerHTML="Enter your Password";
    return false;
}

else if(document.Formfill.Password.value){
    popup.classList.add("open-slide")
    return false;
}
else if(document.Formfill.Password.value == document.Formfill.CPassword.value){
    popup.classList.add("open-slide")
    return false;
}
}

var popup=document.getElementById('popup');
function CloseSlide(){
    popup.classList.remove('open-slide')
}   