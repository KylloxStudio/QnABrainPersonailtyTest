const NAME = $('input[name=name]');
const EMAIL = $('input[name=email]');
const MESSAGE = $('textarea[name=message]');
const checkEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

function checkWordCount(obj, maxlength) {
    var str = obj.value;
    var str_length = str.length;
    var max_length = maxlength;
    var i = 0;
    var ko_byte = 0;
    var li_len = 0;
    var one_char = "";
    var str2 = "";
    for (i = 0; i < str_length; i++) {
        one_char = str.charAt(i);
        ko_byte++;
    }
    if (ko_byte <= max_length) {
        li_len = i + 1;
    }
    if (ko_byte > max_length) {
        alert(max_length + " 글자 이상 입력할 수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다.");
        str2 = str.substr(0, max_length);
        obj.value = str2;
    }
    obj.focus();
}

function checkWordType() {
    if (NAME.val() == '') {
        alert("이름을 입력해주세요.");
        NAME.focus();
        return false;
    } else if (EMAIL.val() == '') {
        alert("이메일 주소를 입력해주세요.");
        EMAIL.focus();
        return false;
    } else if (!checkEmail.test(EMAIL.val())) {
        alert("이메일 주소가 올바르지 않습니다.");
        EMAIL.focus();
        return false;
    } else if (MESSAGE.val() == '') {
        alert("내용을 입력해주세요.");
        MESSAGE.focus();
        return false;
    } else {
        return true;
    }
}

emailjs.init("user_ObDVdiMQlk2RAhavouTNx");

$('input[name=submit]').click(function() {
    const checkUndefinedMessage = checkWordType();

    var templateParams = {
        name: NAME.val(),
        email : EMAIL.val(),
        message : MESSAGE.val()
    };

    if (checkUndefinedMessage == true) {
        emailjs.send('service_kyllox', 'template_kyllox', templateParams).then(function(response) {
            window.alert('성공적으로 이메일을 전송하였습니다.\n' + response.status + ' ' + response.text);
        }, function(e) {
            window.alert('이메일 전송에 실패하였습니다.\n' + e);
        });
    }
});