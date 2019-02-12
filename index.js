!(function() {
    var btn,
        n,
        p = document.querySelector('.urlsBtn'),
        single = document.querySelector('.single'),
        multiple = document.querySelector('.multiple'),
        input = document.querySelector('.input'),
        textarea = document.querySelector('.textarea'),
        put = document.querySelector('#output');

    var links = () => {
        put.innerHTML = 'Fetching the video informations...';
        n = document.querySelector(".urlInput");
        var urlSplit = n.value.split(',').map(d => d.trim());
        var urls = urlSplit.map(d => 'https://ripsave.com/download?video=' + d);
        Promise.all(urls.map(d => fetch(d)))
            .then(d => d.map(d => d.text()))
            .then(d => d.map(d => {
                put.innerHTML = '';
                d.then(d => {
                    var p = document.createElement('p'),
                        heading = document.createElement('h3');
                    p.innerHTML = d;
                    p.className = 'vimeoVideos';
                    var metaNode = Array.from(p.querySelectorAll('.vimeoVideos meta')),
                        linkNode = Array.from(p.querySelectorAll('.vimeoVideos link')),
                        scriptNode = Array.from(p.querySelectorAll('.vimeoVideos script')),
                        table = Array.from(p.querySelectorAll('table a')),
                        allNode = [...metaNode, ...linkNode, ...scriptNode];
                    allNode.forEach(d => d.remove());
                    table.forEach(d => d.classList.add('btn', 'btn-primary'));
                    console.log(titleNode);
                    heading.className = 'alert alert-primary vimeoVideosTitle';
                    if (p.querySelector('.download') === null) {
                        put.innerHTML = '<p class="alert alert-danger">Please recheck the URL once. <br>It failed to fetch the video</p>';
                    }
                    else{
                        put.appendChild(heading);
                        put.appendChild(p);
                    }
                    var titleNode = Array.from(p.querySelectorAll('.vimeoVideos title'));
                    titleNode.forEach(d => heading.innerHTML = d.innerHTML.split('Download: ')[1]);
                })
            }))
            .catch(err => {
                if (err.message === 'Failed to fetch') {
                    var msg = 'Failed to fetch the video.<br>Please recheck the url and try again.';
                    put.innerHTML = '<p class="alert alert-danger">Error Message:<br> ' + msg + '</p>';
                } else {
                    put.innerHTML = 'Error: ' + err.name + '<br>Error Message: ' + err.message;
                }
            });
    }

    single.onclick = () => {
        if (!single.classList.contains('active')) {
            put.innerHTML = 'Copy the link and paste and click the button.';
            single.classList.add('active');
            multiple.classList.remove('active');
            p.innerHTML = '<input type="text" class="form-control urlInput input" placeholder="Enter video url" aria-label="Enter video url" aria-describedby="button-addon2"><div class="input-group-append"><button class="btn btn-secondary getLinks" type="button" id="button-addon2">Get Links</button></div>';
        }
        btn = document.querySelector('.getLinks');
        btn.onclick = () => {
            n = document.querySelector(".urlInput");
            if (n.value.length === 0) {
                put.innerHTML = 'Please enter the url';
            } else if (n.value.length > 0 && !n.value.match(/(vimeo.com)/gi)) {
                put.innerHTML = 'This is not Vimeo\'s url<br>Example: \'https://vimeo.com/86359067\'';
            } else {
                links();
            }
        }
    }
    multiple.onclick = () => {
        if (!multiple.classList.contains('active')) {
            put.innerHTML = 'Copy the link and paste and click the button.<br>Separate videos with comma(,) only<br>Example: https://vimeo.co.. , https://vimeo.co..';
            multiple.classList.add('active');
            single.classList.remove('active');
            p.innerHTML = '<textarea name="urls" cols="30" rows="5" class="form-control urlInput textarea" aria-label="Enter videos url" aria-describedby="button-addon2"></textarea><div class="input-group-append"><button class="btn btn-secondary getLinks" type="button" id="button-addon2">Get Links</button></div>';
        }
        btn = document.querySelector('.getLinks');
        btn.onclick = () => {
            n = document.querySelector(".urlInput");
            if (n.value.length === 0) {
                put.innerHTML = 'Please enter the url';
            } else if (n.value.length > 0 && !n.value.match(/(vimeo.com)/gi)) {
                put.innerHTML = 'This is not Vimeo\'s url<br>Example: \'https://vimeo.com/86359067\'';
            } else {
                links();
            }
        }
    }

    document.querySelector('.getLinks').onclick = () => {
        n = document.querySelector(".urlInput");
        if (n.value.length === 0) {
            put.innerHTML = 'Please enter the url';
        } else if (n.value.length > 0 && !n.value.match(/(vimeo.com)/gi)) {
            put.innerHTML = 'This is not Vimeo\'s url<br>Example: \'https://vimeo.com/86359067\'';
        } else {
            links();
        }
    };
})();
