!(function() {
    var btn = document.querySelector('.getLinks'),
        input = document.querySelector('.urlInput');

    var links = () => {
        var put = document.querySelector('#output');
        put.innerHTML = 'Loading the video...';
        fetch(`https://ripsave.com/download?video=${input.value}`)
            .then(d => d.text())
            .then(d => {
                put.innerHTML = d;
                var linkBtn = document.querySelectorAll('.download .table a');
                linkBtn.forEach(d => {
                    if (!d.classList.contains('btn-success')) {
                        d.classList.add('btn-success');
                    }
                });
            })
            .catch(err => console.log(err.message));

        //console.log(addClass);
    }

    btn.onclick = links;
})();
