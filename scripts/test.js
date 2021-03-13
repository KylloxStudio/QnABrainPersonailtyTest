const header = document.getElementById('title');
const qna = document.getElementById('QnA');
const loadingPage = document.getElementById('loading');
const ENDPOINT = 16;
const TYPENUM = 6;
const select = [];

let qIdx = -1;
let lIdx = 0;
let brainType;


const startTest = function() {
    const title = document.getElementById('title');
    title.style.animation = 'slide-up 0.35s ease-in-out forwards, ' + 'fade-out 0.4s ease-in-out forwards';

    window.window.setTimeout(function() {
        title.style.display = 'none';
        qna.style.display = 'block';

        goNext();
        goPrevious();
    }, 250);
};


const goNext = function() {
    if (qIdx++ == qnaList.length - 1) {
        end();
        return;
    }

    const progress = document.querySelector('.progress-bar');
    const qList = qnaList[qIdx];
    const qNum = document.querySelector('.question-number');
    const q = document.querySelector('.question-text');

    progress.style.width = (100 * (qIdx + 1)/(ENDPOINT)) + '%';
    qNum.innerHTML = qList.n;
    q.innerHTML = qList.q;
    qna.style.animation = 'fade-in 0.3s ease-in-out 0.4s forwards';

    window.setTimeout(function() {
        for (let i in qList.a) {
            addAnswer(qList.a[i].answer, i);
        }
        qna.style.opacity = 1;
    }, 125);
};

const addAnswer = function(answerTxt, idx) {
    const answer = document.createElement('button');
    const a = document.querySelector('#answer');

    answer.className += 'answer-btn answer-box';
    answer.innerHTML = answerTxt;
    answer.addEventListener('click', function() {
        const parent = answer.parentNode;
        const children = parent.childNodes;
        const list = qnaList[qIdx];

        for (let i in children) {
            children[i].disabled = true;
        }

        parent.classList.add('fade-out-5-4');
        window.setTimeout(function() {
            select[qIdx] = idx;
            a.innerHTML = '';
            parent.classList.remove('fade-out-5-4');
            goNext();
        }, 250);

        score[0] += list.a[idx].score[0];
        score[1] += list.a[idx].score[1];
        score[2] += list.a[idx].score[2];
        score[3] += list.a[idx].score[3];
        score[4] += list.a[idx].score[4];
        score[5] += list.a[idx].score[5];
    });

    window.window.setTimeout(function() {
        answer.style.animation = 'slide-down 0.35s forwards, fade-in 0.35s forwards';
    }, 25);
    a.appendChild(answer);
};

const end = function() {
    const spinner1 = document.getElementById('spinner1');
    const spinner2 = document.getElementById('spinner2');
    const spinner3 = document.getElementById('spinner3');
    const loadingText = document.getElementById('loading-text');

    switch (Math.max.apply(null, score)) {
        case score[0]:
            brainType = "A";
            console.log("Brain Type: " + brainType + ", Score: " + score[0]);
            break;
        case score[1]:
            brainType = "B";
            console.log("Brain Type: " + brainType + ", Score: " + score[1]);
            break;
        case score[2]:
            brainType = "C";
            console.log("Brain Type: " + brainType + ", Score: " + score[2]);
            break;
        case score[3]:
            brainType = "D";
            console.log("Brain Type: " + brainType + ", Score: " + score[3]);
            break;
        case score[4]:
            brainType = "E";
            console.log("Brain Type: " + brainType + ", Score: " + score[4]);
            break;
        case score[5]:
            brainType = "F";
            console.log("Brain Type: " + brainType + ", Score: " + score[5]);
    }

    qna.style.animation = 'slide-up 0.35s forwards, fade-out 0.4s forwards';
    loadingPage.style.animation = 'fade-in 0.35s ease-out 0.3s both';
    loadingText.style.animation = 'fade-in 0.35s ease-out 0.3s both, slide-down 0.35s ease-out 0.2s both';
    spinner1.className += ' ' + brainType + '-brain-type-bgcolor';
    spinner2.className += ' ' + brainType + '-brain-type-bgcolor';
    spinner3.className += ' ' + brainType + '-brain-type-bgcolor';

    window.setTimeout(function() {
        qna.style.display = 'none';
        loadingText.style.display = 'none';
        loadingPage.style.display = 'block';
    }, 350);

    window.setTimeout(function() {
        loadingText.style.display = 'block';
    }, 700);

    window.setTimeout(function() {
        showResult();
    }, 3750);
};

const showResult = function() {
    let aIdx = Number(typeList[0].typeId);
    let bIdx = Number(typeList[1].typeId);
    let cIdx = Number(typeList[2].typeId);
    let dIdx = Number(typeList[3].typeId);
    let eIdx = Number(typeList[4].typeId);
    let fIdx = Number(typeList[5].typeId);
    
    let resultTitle;
    let resultMBTI;
    let resultDescription;

    const result = document.getElementById('result');
    const resultMessageTitle = document.getElementById('result-title');
    const resultMessageMBTI = document.getElementById('result-mbti');
    const resultMessageSubtitle = document.getElementById('result-subtitle');
    const resultMessageDescription = document.getElementById('result-description');
    const resultMessageDescriptionWrap = document.getElementById('result-description-wrap');

    switch (brainType) {
        case "A":
            resultTitle = typeList[aIdx].name,
            resultMBTI = typeList[aIdx].mbti,
            resultDescription = typeList[aIdx].desc
            break;
        case "B":
            resultTitle = typeList[bIdx].name,
            resultMBTI = typeList[bIdx].mbti,
            resultDescription = typeList[bIdx].desc
            break;
        case "C":
            resultTitle = typeList[cIdx].name,
            resultMBTI = typeList[cIdx].mbti,
            resultDescription = typeList[cIdx].desc
            break;
        case "D":
            resultTitle = typeList[dIdx].name,
            resultMBTI = typeList[dIdx].mbti,
            resultDescription = typeList[dIdx].desc
            break;
        case "E":
            resultTitle = typeList[eIdx].name,
            resultMBTI = typeList[eIdx].mbti,
            resultDescription = typeList[eIdx].desc
            break;
        case "F":
            resultTitle = typeList[fIdx].name,
            resultMBTI = typeList[fIdx].mbti,
            resultDescription = typeList[fIdx].desc
    }

    loadingPage.style.animation = 'fade-out 0.4s forwards';
    result.style.animation = 'fade-in 0.35s ease-in-out 0.4s forwards';

    window.setTimeout(function() {
        loadingPage.style.display = 'none';
        result.style.display = 'block';
    }, 250);

    const title = "<div class='" + brainType + "-brain-type-color'>" + resultTitle + "</div>";
    const mbti = "<div class='" + brainType + "-brain-type-color result-mbti'>MBTI: " + resultMBTI + "</div>";
    const subtitle = "<p class='result-subtitle'>당신의 뇌 성격 유형은..</p>";
    const description = "<div class='result-description'>" + resultDescription + "</div>";

    resultMessageSubtitle.innerHTML = subtitle;
    resultMessageTitle.innerHTML = title;
    resultMessageMBTI.innerHTML = mbti;
    resultMessageDescription.innerHTML = description;
    resultMessageDescriptionWrap.className += ' ' + brainType + '-brain-type-border';
};