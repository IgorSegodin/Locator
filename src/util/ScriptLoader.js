class ScriptLoader {

    load(url) {
        return new Promise((resolve, reject) => {
            let scriptEl = document.createElement('script');
            scriptEl.type = 'application/javascript';
            scriptEl.src = url;
            scriptEl.setAttribute('async', '');
            scriptEl.setAttribute('defer', '');

            scriptEl.onload = function() {
                resolve();
            };

            // TODO on fail

            document.head.appendChild(scriptEl);
        });
    }

}

export default ScriptLoader;