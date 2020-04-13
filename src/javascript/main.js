console.log('Bulma Dashboard');
//Sidebar Collapse
Array.from(document.getElementById('sidebar').getElementsByClassName('has-dropdown')).forEach(element => {
    element.addEventListener('click', function(e) {
        if(!e.target.parentNode.className.includes("has-dropdown")){return;}
        const submenu = element.getElementsByTagName('ul')[0];
        if(submenu != undefined)
        { submenu.style.display = submenu.style.display == "block" ? "none" : "block";}
        event.preventDefault();
    }, element);
})