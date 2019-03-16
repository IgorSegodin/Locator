class RestTemplate {

    json(url) {
        return fetch(url)
            .then((response) => response.json());
    }
}

export default RestTemplate