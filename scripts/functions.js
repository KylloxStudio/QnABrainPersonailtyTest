const start = function() {
    $('.used-licence-link-wrap').hide();
    $('#used-licence').hide();

    window.setTimeout(function() {
        startTest();
    }, 25);
};


const reTryTest = function() {
    window.setTimeout(function() {
        reloadPage(10);
    }, 5);
};


const showHideUsedLicence = function() {
    if (document.getElementById("used-licence").style.display == 'none') {
        $('#used-licence').show();
        $('#show-used-licence').hide();
        $('#hide-used-licence').show();
    } else {
        $('#used-licence').hide();
        $('#show-used-licence').show();
        $('#hide-used-licence').hide();
    }
};


const reloadPage = function(time = 35) {
    window.setTimeout(function() {
        window.location.reload();
    }, time);
};

const goMainPage = function() {
    if (window.location.host == 'brain-personality.site') {
        window.location.replace('https://brain-personality.site');
    } else {
        window.location.replace('../index.html');
    }
};


const openInNewTab = function(url) {
    var win = window.open(url, '_blank', 'noopener noreferrer');
    win.focus();
};


const copyToClipboard = function(text) {
    var t = document.createElement("textarea");
    
    document.body.appendChild(t);
    t.value = text;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
};

