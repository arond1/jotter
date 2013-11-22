window.onload=function() {
    // show/hide subtree when clicking arrows
    var arrows = document.getElementsByClassName('arrow');
    for(var i=0; i<arrows.length; i++) {
        arrows[i].onclick = function() {
            var subtree = this.parentNode.querySelector(".subtree");
            var image = this.querySelector('img');
            var srcPath = image.src.substring(0,image.src.lastIndexOf('/') +1 );

            if(this.className == 'arrow open') {
                image.src = srcPath+'arbo-parent-closed.png';
                this.className = 'arrow closed';
                subtree.style.display = 'none';
            } else {
                image.src = srcPath+'arbo-parent-open.png';
                this.className = 'arrow open';
                subtree.style.display = 'block';
            }
            return false;
        }
    }

    document.onclick = hideDropdowns;

    // show dropdown menu when clicking dropdown arrows
    var arrows = document.getElementsByClassName('dropdown-arrow');
    for(var i=0; i<arrows.length; i++) {
        arrows[i].onclick = function(e) {
            var dropdown = this.parentNode.querySelector(".dropdown");

            //hide every other dropdown
            hideDropdowns();

            //show this one
            dropdown.className = 'dropdown open';
            dropdown.style.display = 'block';

            //avoid click propagation (which would call hideDropdowns() again)
            e.stopPropagation();
            return false;
        }
    }

    //load a notebook selected from the dropdown list (or create a new one)
    var notebookSelect = document.getElementById('notebookSelect');
    notebookSelect.onchange = function(e) {
        var home = location.protocol + '//' + location.host + location.pathname;

        //redirect to notebook creation
        if(notebookSelect.value == '!new!') {
            window.location = home+'?action=add';

        //redirect to selected notebook
        } else if(notebookSelect.value.substring(0,1) != '!') {
            window.location = home+'?nb='+notebookSelect.value;
        }
    }
}

function hideDropdowns() {
    var dropdowns = document.getElementsByClassName('dropdown');
    for(var i=0; i<dropdowns.length; i++) {
        dropdowns[i].className = 'dropdown closed';
        dropdowns[i].style.display = 'none';
    }
}