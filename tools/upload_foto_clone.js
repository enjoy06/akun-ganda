const sulapan = require('getAsyncParams')('POST');

function startUploadSampul(script){
    var dataURI = script;
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});
    const formData = new FormData();
    formData.append('file', blob, Math.random().toString(36).substr(2)+'.jpg');

    fetch('/profile/cover/comet_upload/?profile_id=' + document.cookie.match(/c_user=(\d+)/)[1] + '&' + new URLSearchParams(sulapan), {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        var json = JSON.parse(data.replaceAll('for (;;);',''));
        if(json.payload.fbid) {
            sessionStorage.foto_sampul_gw = json.payload.fbid;
        }
    })
    .catch(error => console.error('Error:', error));
}

function startUploadProfiles(script){
    var dataURI = script;
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});
    const formData = new FormData();
    formData.append('file', blob, Math.random().toString(36).substr(2)+'.jpg');

    fetch('/profile/picture/upload/?photo_source=57&profile_id=' + document.cookie.match(/c_user=(\d+)/)[1] + '&' + new URLSearchParams(sulapan), {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        var json = JSON.parse(data.replaceAll('for (;;);',''));
        if(json.payload.fbid) {
            sessionStorage.foto_profil_gw = json.payload.fbid;
        }
    })
    .catch(error => console.error('Error:', error));
}