"use client";

import { useState } from "react";

type Step = "landing" | "profile" | "code" | "checkout" | "test" | "done";
type Level = "sprout" | "chick" | "marriage";

const createCoupleCode = () => {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const randomValues = new Uint32Array(10);
  crypto.getRandomValues(randomValues);
  const value = Array.from(randomValues, (number) => characters[number % characters.length]).join("");
  return `LOVE-${value.slice(0, 5)}-${value.slice(5)}`;
};

const levels = {
  sprout: { tag: "하", title: "아직 어색해요", subtitle: "새싹커플편", color: "mint" },
  chick: { tag: "중", title: "우리, 서로 잘 알아요!", subtitle: "병아리반 커플편", color: "yellow" },
  marriage: { tag: "상", title: "가족입니다. 신고만 하면 돼요", subtitle: "혼인신고편", color: "pink" },
} as const;

const questions = [
  ["객관식", "내 연인이 요즘 가장 자주 찾는 음료는?", ["아메리카노", "달콤한 라테", "차·에이드", "그때그때 달라요"]],
  ["단답형", "연인이 가장 좋아하는 음식 메뉴를 한 가지만 적어주세요."],
  ["객관식", "연인이 쉬는 날 가장 하고 싶어 하는 것은?", ["집에서 푹 쉬기", "맛집·카페 가기", "운동·야외 활동", "여행 떠나기"]],
  ["OX", "연인은 아침형 인간이다.", ["O", "X"]],
  ["단답형", "연인이 가장 좋아하는 계절은 언제인가요?"],
  ["객관식", "연인이 스트레스를 받을 때 가장 원하는 반응은?", ["조용히 들어주기", "해결책 제안하기", "혼자 둘 시간 주기", "맛있는 것 사주기"]],
  ["단답형", "연인이 요즘 가장 자주 하는 말이나 말버릇은?"],
  ["객관식", "둘의 첫 데이트 장소와 가장 가까운 것은?", ["카페·식당", "공원·산책로", "영화관·공연장", "학교·회사 근처"]],
  ["OX", "우리의 첫인상과 지금의 인상은 비슷하다.", ["O", "X"]],
  ["서술형", "처음 상대에게 호감을 느낀 순간을 적어주세요."],
  ["단답형", "연인의 생일은 몇 월 며칠인가요?"],
  ["객관식", "연인이 선물 받을 때 더 기뻐하는 것은?", ["갖고 싶던 실용품", "손편지·사진", "깜짝 이벤트", "함께하는 경험"]],
  ["단답형", "연인이 가장 좋아하는 색은?"],
  ["객관식", "연인의 연락 스타일은?", ["짧아도 자주", "한 번에 길게", "통화 선호", "만날 때 집중"]],
  ["OX", "연인은 기념일을 꼼꼼히 챙기는 편이다.", ["O", "X"]],
  ["서술형", "우리 둘만 알아듣는 애칭이나 암호 같은 말을 적어주세요."],
  ["객관식", "연인이 더 좋아하는 데이트 시간은?", ["이른 아침", "한가로운 오후", "분위기 좋은 저녁", "늦은 밤"]],
  ["단답형", "연인이 가장 가고 싶어 하는 여행지는?"],
  ["객관식", "여행 계획을 세울 때 연인은?", ["분 단위 계획형", "큰 틀만 계획", "상대에게 맡김", "즉흥이 최고"]],
  ["OX", "연인은 사진 찍히는 것을 좋아한다.", ["O", "X"]],
  ["서술형", "함께한 날 중 다시 돌아가고 싶은 하루와 이유는?"],
  ["객관식", "다툰 뒤 연인이 먼저 원하는 것은?", ["바로 대화하기", "잠시 진정할 시간", "먼저 사과받기", "가벼운 스킨십"]],
  ["단답형", "연인이 화났을 때 보이는 가장 확실한 신호는?"],
  ["OX", "연인은 서운한 마음을 바로 말하는 편이다.", ["O", "X"]],
  ["서술형", "연인에게 사과할 때 꼭 해주었으면 하는 말은?"],
  ["객관식", "연인이 사랑을 가장 크게 느끼는 순간은?", ["다정한 말", "함께 보내는 시간", "도움과 배려", "선물·스킨십"]],
  ["단답형", "연인이 가장 듣고 싶어 하는 칭찬은?"],
  ["객관식", "연인의 걱정이 많아지는 시간은?", ["일어나자마자", "일과 중", "집에 돌아온 뒤", "잠들기 전"]],
  ["OX", "연인은 힘든 일이 생기면 나에게 먼저 말한다.", ["O", "X"]],
  ["서술형", "내가 연인에게 가장 고마웠던 일을 적어주세요."],
  ["객관식", "연인이 돈을 쓰는 우선순위에 가까운 것은?", ["저축·안정", "맛있는 음식", "취미·경험", "패션·물건"]],
  ["단답형", "연인이 요즘 가장 이루고 싶은 목표는?"],
  ["OX", "연인은 중요한 결정을 할 때 나와 꼭 상의한다.", ["O", "X"]],
  ["객관식", "연인이 꿈꾸는 주거 환경은?", ["도심 아파트", "조용한 전원주택", "교통 좋은 소형 집", "어디든 함께면 좋음"]],
  ["서술형", "5년 뒤 우리 둘의 평범한 하루를 상상해 적어주세요."],
  ["객관식", "연인이 생각하는 이상적인 휴일 아침은?", ["늦잠", "함께 아침 식사", "운동·산책", "근교 나들이"]],
  ["단답형", "연인이 키우고 싶어 하는 반려동물은?"],
  ["OX", "연인은 결혼에 대해 구체적으로 이야기한 적이 있다.", ["O", "X"]],
  ["객관식", "집안일 중 연인이 상대적으로 덜 싫어하는 것은?", ["요리", "설거지", "청소", "빨래"]],
  ["서술형", "함께 살게 된다면 꼭 지키고 싶은 생활 규칙 한 가지는?"],
  ["단답형", "연인의 가족 구성원을 아는 만큼 적어주세요."],
  ["객관식", "연인이 중요하게 여기는 가치에 가장 가까운 것은?", ["신뢰", "성장", "안정", "즐거움"]],
  ["OX", "우리는 서로의 친구를 편안하게 만난다.", ["O", "X"]],
  ["서술형", "연인이 힘들 때 내가 해줄 수 있는 가장 좋은 도움은?"],
  ["객관식", "연인이 가장 두려워하는 관계의 모습은?", ["무관심", "잦은 다툼", "신뢰의 흔들림", "각자의 성장 멈춤"]],
  ["단답형", "우리 관계에서 연인이 가장 자랑스러워하는 점은?"],
  ["서술형", "서로에게 아직 하지 못했지만 꼭 전하고 싶은 말은?"],
  ["객관식", "우리의 닮은 정도를 점수로 매긴다면?", ["25% 이하", "26~50%", "51~75%", "76% 이상"]],
  ["단답형", "우리의 사랑을 한 단어로 표현한다면?"],
  ["서술형", "앞으로 둘이 함께 꼭 이루고 싶은 약속 한 가지를 적어주세요."],
] as const;

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [landingPage, setLandingPage] = useState<1 | 2 | 3>(1);
  const [mode, setMode] = useState<"new" | "join">("new");
  const [level, setLevel] = useState<Level>("sprout");
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [code, setCode] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const current = questions.slice(page * 5, page * 5 + 5);
  const progress = Math.round((Object.keys(answers).length / 50) * 100);

  const begin = (kind: "new" | "join") => {
    setMode(kind);
    setCopyMessage("");
    setCode(kind === "new" ? createCoupleCode() : "");
    setStep(kind === "new" ? "profile" : "code");
  };
  const showGuide = () => { setLandingPage(2); setStep("landing"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const nextFromProfile = () => mode === "new" ? setStep("checkout") : showGuide();
  const setAnswer = (idx: number, value: string) => setAnswers((a) => ({ ...a, [idx]: value }));
  const copyCode = async () => {
    setCopyMessage("복사 중...");
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
        success = true;
      }
    } catch {
      success = false;
    }

    if (!success) {
      const field = document.createElement("textarea");
      field.value = code;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      success = document.execCommand("copy");
      field.remove();
    }

    if (success) {
      setCopyMessage("복사 완료 ✓");
      window.setTimeout(() => setCopyMessage(""), 2500);
    } else {
      setCopyMessage("자동 복사가 차단됐어요. 아래 창에서 직접 복사해 주세요.");
      window.prompt("커플 코드를 길게 눌러 복사해 주세요.", code);
    }
  };

  return (
    <main>
      <nav className="nav"><button className="brand" onClick={() => { setStep("landing"); setLandingPage(1); }}><span>너를</span> 알아가는 과정</button><div className="nav-right"><span className="price">지금은 무료</span><span className="secure">둘만의 커플 테스트</span></div></nav>

      {step === "landing" && <>
        {landingPage === 1 && <section className="hero landing-panel" id="main-flow">
          <p className="section-step">01. 메인 플로우</p>
          <div className="hero-copy">
            <p className="eyebrow">COUPLE ANSWER TEST · 50 QUESTIONS</p>
            <h1>우리는 서로를<br/><em>얼마나 알고 있을까?</em></h1>
            <p className="lead">같은 질문에 따로 답하고, 둘만의 결과표로 확인해요.<br/>정답보다 중요한 건 서로를 더 알아가는 과정이니까.</p>
            <div className="hero-actions">
              <button className="primary" onClick={() => begin("new")}>처음이신가요? <b>코드 발급하기</b><span>→</span></button>
              <button className="secondary" onClick={() => begin("join")}>코드를 받으셨나요? <b>코드 입력하기</b><span>→</span></button>
            </div>
            <p className="micro">한 명이 코드를 만들고 상대에게 공유하면 준비 끝! · 각 15~20분</p>
          </div>
          <div className="paper-stack" aria-label="커플 답안지 미리보기">
            <div className="paper back-paper"></div>
            <div className="paper answer-sheet">
              <div className="paper-head"><div><small>COUPLE TEST</small><h2>우리의 답안지</h2></div><span className="stamp">마음<br/>채점중</span></div>
              <div className="name-line"><span>응시자</span><b>나</b><i>×</i><b>너</b></div>
              {["첫 데이트 때 내가 주문한 메뉴는?", "내가 가장 좋아하는 계절은?", "지금 가장 가고 싶은 여행지는?"].map((q,i)=><div className="sample-q" key={q}><b>0{i+1}</b><div><p>{q}</p><span className="fake-line"></span></div>{i===1 && <mark>비슷해요!</mark>}</div>)}
              <div className="score"><small>서로를 알아가는 정도</small><strong>82<span>%</span></strong><div><i style={{width:"82%"}}/></div></div>
            </div>
          </div>
        </section>}
        {landingPage === 2 && <section className="how landing-panel" id="how-it-works"><p className="section-step">02. 사용방법</p><div><small>HOW IT WORKS</small><h2>둘이 따로 답하고,<br/>결과는 함께 받아요</h2></div>{[["01","코드 만들기","대표 한 명이 이메일을 입력하고 커플 코드를 만들어요."],["02","각자 답하기","같은 50문항에 서로 상의하지 않고 솔직하게 답해요."],["03","결과 받아보기","맞다·비슷하다·다르다로 비교한 결과지를 이메일로 받아요."]].map(x=><article key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></article>)}<div className="landing-pager"><button onClick={() => setLandingPage(1)}>← 이전</button><span>02 / 03</span><button onClick={() => setLandingPage(3)}>다음 페이지 →</button></div></section>}
        {landingPage === 3 && <section className="levels landing-panel" id="choose-test">
          <p className="section-step">03. 선택지</p>
          <div className="section-title"><p>3 STEPS FOR US</p><h2>어떤 커플인가요?<br/>우리에게 맞는 시험지를 골라요!</h2><span>연애의 시간보다, 지금 서로에게 궁금한 마음을 기준으로 선택해 보세요.</span></div>
          <div className="level-grid">{(Object.keys(levels) as Level[]).map((key) => { const x=levels[key]; return <button key={key} className={`level-card ${x.color} ${level===key?"selected":""}`} onClick={()=>setLevel(key)}><span className="level-tag">난이도 {x.tag}</span><div className={`level-icon ${key}`} role="img" aria-label={`${x.subtitle} 손그림 아이콘`}></div><p>{x.title}</p><h3>{x.subtitle}</h3><small>{key==="sprout"?"취향과 첫 마음을 알아가는 우리":key==="chick"?"일상과 마음의 습관까지 아는 우리":"미래와 생활을 함께 그리는 우리"}</small><i>{level===key?"선택됨 ✓":"이 시험지 선택하기 →"}</i></button>})}</div>
          <div className="landing-pager"><button onClick={() => setLandingPage(2)}>← 이전: 사용방법</button><button onClick={() => setStep("test")}>선택한 시험지로 시작하기 →</button></div>
        </section>}
      </>}

      {(step === "profile" || step === "code" || step === "checkout") && <section className="form-page"><button className="back" onClick={()=>setStep("landing")}>← 처음으로</button><div className="form-card">
        <p className="eyebrow">{step==="code"?"COUPLE CODE":"TEST REGISTRATION"}</p>
        {step === "code" ? <><h1>코드를 받으셨나요?</h1><p>연인에게 받은 커플 코드를 입력해 주세요.</p><label>커플 코드<input value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="LOVE-ABCDE-12345" /></label><button className="primary full" onClick={() => setStep("profile")}>코드 확인하기 <span>→</span></button></> : step === "profile" ? <><h1>{mode==="new"?"우리의 시험지를 준비할게요":"이제 내 정보를 알려주세요"}</h1><p>결과지를 받을 정확한 정보를 입력해 주세요.</p><div className="field-row"><label>성함<input placeholder="홍길동" /></label><label>이메일 주소<input type="email" placeholder="love@example.com" /></label></div><label className="check"><input type="checkbox"/> <span><b>서비스 이용약관 및 개인정보 수집·이용에 동의합니다.</b><small>수집한 성함과 이메일은 커플 확인 및 결과지 전달 목적으로만 사용하며, 다른 용도로 이용하지 않습니다. 결과 발송 후 관계 법령에 따른 기간 동안 안전하게 보관됩니다.</small></span></label><button className="primary full" onClick={nextFromProfile}>{mode==="new"?"커플 코드 발급하기":"입력 완료하고 계속하기"} <span>→</span></button></> : <><div className="code-ticket"><small>우리의 커플 코드</small><strong>{code}</strong><button type="button" onClick={copyCode}>코드 복사</button><span className="copy-feedback" aria-live="polite">{copyMessage}</span></div><h1>커플 코드가 발급됐어요!</h1><p>상대방에게 위 코드를 전달해 주세요. 이제 사용방법을 확인한 뒤 우리에게 맞는 시험지를 선택할 수 있어요.</p><button className="primary full" onClick={showGuide}>계속하기 <span>→</span></button></>}
      </div></section>}

      {step === "test" && <section className="test-page"><header className="test-head"><div><p>{levels[level].subtitle}</p><h1>너를 알아가는 과정</h1></div><div className="test-meta"><span>응시자 ________</span><b>{page+1} / 10 PAGE</b></div></header><div className="progress"><i style={{width:`${progress}%`}}/><span>{progress}% 작성</span></div><div className="question-paper">{current.map((q, i)=>{const idx=page*5+i; const opts=q[2] as readonly string[]|undefined; return <fieldset key={idx}><legend><b>{String(idx+1).padStart(2,"0")}</b><span>{q[1]}</span><em>{q[0]}</em></legend>{opts?<div className="options">{opts.map((o,n)=><label key={o} className={answers[idx]===o?"checked":""}><input type="radio" name={`q${idx}`} onChange={()=>setAnswer(idx,o)}/><i>{n+1}</i>{o}</label>)}</div>:q[0]==="서술형"?<textarea value={answers[idx]||""} onChange={e=>setAnswer(idx,e.target.value)} placeholder="솔직한 마음을 적어주세요."/>:<input className="line-input" value={answers[idx]||""} onChange={e=>setAnswer(idx,e.target.value)} placeholder="답을 적어주세요."/>}</fieldset>})}</div><div className="pager"><button disabled={page===0} onClick={()=>setPage(p=>p-1)}>← 이전</button><span>{Array.from({length:10},(_,i)=><i key={i} className={i===page?"on":""}/>)}</span><button className="primary" onClick={()=>page===9?setStep("done"):setPage(p=>p+1)}>{page===9?"답안지 제출하기":"다음 페이지"} →</button></div></section>}

      {step === "done" && <section className="done"><div className="done-card"><span>✓</span><p>ANSWER SHEET SUBMITTED</p><h1>답안지를 잘 받았어요!</h1><p>연인도 답안을 제출하면 두 분의 답을<br/>‘맞다 · 비슷하다 · 다르다’로 비교해 이메일로 보내드릴게요.</p><div className="code-ticket"><small>상대에게 보낼 커플 코드</small><strong>{code}</strong><button type="button" onClick={copyCode}>복사하기</button><span className="copy-feedback" aria-live="polite">{copyMessage}</span></div><button className="secondary full" onClick={()=>setStep("landing")}>처음 화면으로</button></div></section>}
      <footer><b>너를 알아가는 과정</b><span>정답보다 다정한 오답을 발견하는 커플 문답</span><p>이용약관 · 개인정보처리방침 · 문의하기</p><small>© 2026 THE PROCESS OF KNOWING YOU</small></footer>
    </main>
  );
}
