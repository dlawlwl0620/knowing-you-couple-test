# 초보자용 홈페이지 수정 안내

디자인은 [`app/easy-customize.css`](app/easy-customize.css) 한 파일에서 대부분 수정할 수 있습니다.

## GitHub에서 직접 수정하는 방법

1. GitHub 저장소에서 `app` 폴더를 누릅니다.
2. `easy-customize.css` 파일을 누릅니다.
3. 오른쪽 위 연필 모양 **Edit this file**을 누릅니다.
4. 원하는 색상이나 숫자를 변경합니다.
5. 아래쪽 **Commit changes**를 눌러 저장합니다.
6. 약 1분 뒤 공개 홈페이지에 자동 반영됩니다.

## 자주 바꾸는 설정

- 메인 색상: `--easy-main-color`
- 서브 색상: `--easy-sub-color`
- 기본 글자색: `--easy-text-color`
- 제목 크기: `--easy-title-size`
- 카드 열 개수: `--easy-card-columns`
- 카드 사이 간격: `--easy-card-gap`
- 카드 둥근 정도: `--easy-card-radius`
- 버튼 둥근 정도: `--easy-button-radius`

색상은 `#cdeee8`처럼 `#`으로 시작하는 여섯 자리 색상 코드를 입력하면 됩니다.

## 폰트 변경

`easy-customize.css` 맨 위의 `@font-face`에서 폰트 이름과 `src` 주소를 변경하고, 아래의 `--easy-font`도 같은 이름으로 변경합니다.

## 주의사항

- `:`와 `;`는 지우지 마세요.
- 색상값이나 숫자만 변경하는 것이 가장 안전합니다.
- 모바일에서는 카드가 항상 한 줄로 보이도록 설정되어 있습니다.

