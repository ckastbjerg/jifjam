const yo = require('yo-yo')

function getGif(searchText) {
    const req = `${location.protocol}//api.giphy.com/v1/stickers/search?q=${searchText}&api_key=dc6zaTOxFJmzC`;
    return fetch(req).then(response => response.json()).then(res => {
        const index = Math.floor(Math.random() * res.data.length);
        return res.data[index].images.fixed_height.url;
    });
}

const styles = `
  height: 30vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const imageStyles = `
  height: 100%;
`;

module.exports = searchText => {
    const id = Math.random().toString();

    getGif(searchText).then(url => {
        document.getElementById(id).innerHTML = `<img style="${imageStyles}" src="${url}" />`;
    });

    return yo`<div style="${styles}" id="${id}"></div>`;
}
