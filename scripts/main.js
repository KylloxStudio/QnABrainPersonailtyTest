//<![CDATA[
    // // 사용할 앱의 JavaScript 키를 설정해 주세요.
    Kakao.init('ab11114588a17f210f80eb9d1668d490');

    // // 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
    Kakao.Link.createDefaultButton({
        container: '#kakao-share',
        objectType: 'feed',
        content: {
            title: $('meta[property="og:title"]').attr('content'),
            description: $('meta[property="og:description"]').attr('content'),
            imageUrl: $('meta[property="og:image"]').attr('content'),
            link: {
            mobileWebUrl: $('meta[property="og:url"]').attr('content'),
            webUrl: $('meta[property="og:url"]').attr('content')
            }
        },
        buttons: [{
            title: '웹으로 보기',
            link: {
                webUrl: $('meta[property="og:url"]').attr('content')
            }
        }]
    });
//]]>


const shareButton = document.getElementById('local-share');

shareButton.addEventListener("click", async function() {
    if (typeof navigator.share == "undefined") {
        copyToClipboard($('meta[property="og:url"]').attr('content'));
        window.alert("현재 사용하고 계신 브라우저는 로컬 공유 기능을 지원하지 않습니다. \n ( URL 주소가 클립보드로 복사되었습니다 )");
    }

    try {
        await navigator.share({
            title: $('meta[property="og:title"]').attr('content'),
            text: $('meta[property="og:description"]').attr('content'),
            url: $('meta[property="og:url"]').attr('content'),
        });
    } catch (e) {
        console.log("Share Failed. " + e);
    }
});


$(document).ready(function() {
    $('#hide-used-licence').hide();
    $('#used-licence').hide();
    $('#QnA').hide();
    $('#result').hide();
    $('#loading').hide();
});