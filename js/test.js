// 공부 유형 자가진단 - 채점 및 결과 표시 로직
document.addEventListener("DOMContentLoaded", function () {
  var TOTAL_QUESTIONS = 10;

  var GROUPS = {
    nt: {
      label: "NT",
      title: "NT 분석가형",
      desc: "논리와 전략으로 배우는 그룹이에요. 원리를 이해하고 스스로 구조를 세울 때 학습 효율이 가장 높아집니다.",
      href: "nt.html",
    },
    nf: {
      label: "NF",
      title: "NF 외교관형",
      desc: "의미와 공감으로 배우는 그룹이에요. 공부의 이유와 가치를 찾을 때 몰입도가 가장 높아집니다.",
      href: "nf.html",
    },
    sj: {
      label: "SJ",
      title: "SJ 관리자형",
      desc: "계획과 반복으로 배우는 그룹이에요. 체계적인 일정과 꾸준한 반복 학습이 강점입니다.",
      href: "sj.html",
    },
    sp: {
      label: "SP",
      title: "SP 탐험가형",
      desc: "실전과 체험으로 배우는 그룹이에요. 직접 부딪히고 몸으로 익힐 때 가장 빠르게 배웁니다.",
      href: "sp.html",
    },
  };

  var form = document.getElementById("test-form");
  var progressBar = document.getElementById("progress-bar");
  var formError = document.getElementById("form-error");
  var resultPanel = document.getElementById("result-panel");

  function updateProgress() {
    var answered = 0;
    for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
      if (form.querySelector('input[name="q' + i + '"]:checked')) {
        answered++;
      }
    }
    progressBar.style.width = (answered / TOTAL_QUESTIONS) * 100 + "%";
  }

  function getAnswers() {
    var answers = {};
    for (var i = 1; i <= TOTAL_QUESTIONS; i++) {
      var checked = form.querySelector('input[name="q' + i + '"]:checked');
      answers["q" + i] = checked ? checked.value : null;
    }
    return answers;
  }

  function computeResultKey(answers) {
    var scores = { nt: 0, nf: 0, sj: 0, sp: 0 };
    Object.keys(answers).forEach(function (key) {
      var value = answers[key];
      if (value && scores.hasOwnProperty(value)) {
        scores[value]++;
      }
    });

    var bestKey = "nt";
    var order = ["nt", "nf", "sj", "sp"];
    order.forEach(function (key) {
      if (scores[key] > scores[bestKey]) {
        bestKey = key;
      }
    });
    return bestKey;
  }

  function showResult(groupKey) {
    var group = GROUPS[groupKey];
    if (!group) return;

    document.getElementById("result-badge").textContent = group.label;
    document.getElementById("result-title").textContent = group.title;
    document.getElementById("result-desc").textContent = group.desc;

    var resultLink = document.getElementById("result-link");
    resultLink.href = group.href;
    resultLink.textContent = group.label + " 그룹 페이지로 이동";

    form.style.display = "none";
    document.querySelector(".progress-wrap").style.display = "none";
    formError.style.display = "none";
    resultPanel.style.display = "block";

    var newUrl = window.location.pathname + "?result=" + groupKey;
    window.history.replaceState({ result: groupKey }, "", newUrl);
  }

  form.addEventListener("change", updateProgress);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var answers = getAnswers();
    var unanswered = Object.keys(answers).some(function (key) {
      return answers[key] === null;
    });

    if (unanswered) {
      formError.style.display = "block";
      formError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    formError.style.display = "none";
    var resultKey = computeResultKey(answers);
    if (typeof gtag === "function") {
      gtag("event", "test_complete", { group: resultKey });
    }
    showResult(resultKey);
  });

  document.getElementById("share-btn").addEventListener("click", function () {
    var shareUrl = window.location.href;
    var titleText = document.getElementById("result-title").textContent;

    if (navigator.share) {
      navigator
        .share({
          title: "MBTI 공부법 연구소",
          text: "내 공부 유형은 " + titleText + "! 너도 확인해봐.",
          url: shareUrl,
        })
        .catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(function () {
        alert("결과 링크가 복사되었어요. 친구에게 붙여넣기 해보세요!");
      });
    } else {
      window.prompt("아래 링크를 복사해서 친구에게 공유하세요.", shareUrl);
    }
  });

  document.getElementById("retry-btn").addEventListener("click", function () {
    window.location.href = window.location.pathname;
  });

  // 공유된 링크로 접속한 경우 바로 결과를 보여준다
  var params = new URLSearchParams(window.location.search);
  var sharedResult = params.get("result");
  if (sharedResult && GROUPS[sharedResult]) {
    showResult(sharedResult);
  } else {
    updateProgress();
  }
});
