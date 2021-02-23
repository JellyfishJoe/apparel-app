function drop() {
    document.getElementById("signInDrop").classList.toggle("show");
}

window.onclick = function(event) {
    if(!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("signIn-content");
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
    }
}