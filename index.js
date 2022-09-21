const now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let isFirst  = true;

/**
 * 윈도우 load 시 달력 3페이지를 생성한다. (총 6개월)
 */
window.addEventListener('load', () => {
  const [prevYear1, prevMonth1, prevYear2, prevMonth2] = getDate(year, month - 2);
  const [currYear1, currMonth1, currYear2, currMonth2] = getDate(year, month);
  const [nextYear1, nextMonth1, nextYear2, nextMonth2] = getDate(year, month + 2);

  const divTwoMonthPrev = createTwoMonthHtml(prevYear1, prevMonth1, prevYear2, prevMonth2);
  const divTwoMonthCurr = createTwoMonthHtml(currYear1, currMonth1, currYear2, currMonth2);
  const divTwoMonthNext = createTwoMonthHtml(nextYear1, nextMonth1, nextYear2, nextMonth2);

  contentsWrapper.appendChild(divTwoMonthPrev);
  contentsWrapper.appendChild(divTwoMonthCurr);
  contentsWrapper.appendChild(divTwoMonthNext);
});

/**
 * 캘린더에 트랜지션(슬라이딩) 클래스 추가
 */
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const contentsWrapper = document.querySelector('.contents-wrapper');

// prev 버튼 클릭 시 트리거
prevBtn.addEventListener('click', () => {
  contentsWrapper.classList.add('animate-prev');
});

// next 버튼 클릭 시 트리거
nextBtn.addEventListener('click', () => {
  contentsWrapper.classList.add('animate-next');
});

/**
 * 이전 or 다음달 캘린더 생성 및 삭제
 * transition(슬라이딩 애니메이션)이 완료될 경우 트리거
 */
contentsWrapper.addEventListener('transitionend', () => {
  // *prev 버튼을 눌렀을 경우*
  if (contentsWrapper.classList.contains('animate-prev')) {
    // 마지막 캘린더 삭제
    contentsWrapper.removeChild(contentsWrapper.children[2]);

    // month를 새로 생성할 캘린더의 값으로 변경
    // 가장 처음에는 앞뒤 캘린더가 만들어져 있기 때문에 4개월을 빼준다.
    month -= isFirst ? 4 : 2;
    isFirst = false;

    // 새로운 캘린더 생성
    const [year1, month1, year2, month2] = getDate(year, month);
    const divTwoMonth = createTwoMonthHtml(year1, month1, year2, month2);

    // 바뀐 값으로 갱신
    year = year1;
    month = month1;

    // 앞쪽에 캘린더 추가
    contentsWrapper.insertBefore(divTwoMonth, contentsWrapper.children[0]);
    contentsWrapper.classList.remove('animate-prev');

    return;
  }

  // *next 버튼을 눌렀을 경우*

  // 첫번째 캘린더 삭제
  contentsWrapper.removeChild(contentsWrapper.children[0]);

  // month를 새로 생성할 캘린더의 값으로 변경
  // 가장 처음에는 앞뒤 캘린더가 만들어져 있기 때문에 4개월을 더해준다.
  month += isFirst ? 4 : 2;
  isFirst = false;

  // 새로운 캘린더 생성
  const [year1, month1, year2, month2] = getDate(year, month);
  const divTwoMonth = createTwoMonthHtml(year1, month1, year2, month2);

  // 바뀐 값으로 갱신
  year = year1;
  month = month1;

  // 뒤쪽에 캘린더 추가
  contentsWrapper.appendChild(divTwoMonth);
  contentsWrapper.classList.remove('animate-next');
});

/**
 * 캘린더 내용 생성 - 두달짜리
 */
function createTwoMonthHtml(year1, month1, year2, month2) {
  const divTwoMonth = document.createElement('div');
  divTwoMonth.classList.add('two-month');

  const divOneMonth1 = createOneMonthHtml(year1, month1);
  const divOneMonth2 = createOneMonthHtml(year2, month2);

  divTwoMonth.appendChild(divOneMonth1);
  divTwoMonth.appendChild(divOneMonth2);

  return divTwoMonth;
}

/**
 * 캘린더 내용 생성 - 한달짜리 (두달짜리 안에 포함됨)
 */
function createOneMonthHtml(year, month) {
  const divOneMonth = document.createElement('div');
  divOneMonth.classList.add('one-month');

  const divMonthTitle = document.createElement('div');
  divMonthTitle.innerHTML = `${year}년 ${month}월`;
  divOneMonth.appendChild(divMonthTitle);

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  tbody.innerHTML = createTrHtml(year, month);
  table.appendChild(tbody);
  divOneMonth.appendChild(table);

  return divOneMonth;
}

/**
 * 캘린더 내용 생성 - 한달짜리의 tr 생성
 */
function createTrHtml(year, month) {
  const startDay = new Date(year, month - 1, 1).getDay(); // 1일이 시작하는 요일을 구한다.
  const lastDay = new Date(year, month, 0).getDate();           // 주어진 달의 마지막 날짜를 구한다.

  let trArr = [];
  let trStr = '<tr>';
  const n = (startDay + lastDay) + (7 - (startDay + lastDay) % 7);

  for (let i = 0; i < n; i++) {
    if (i < startDay) {
      trStr += '<td></td>';
      continue;
    }

    if (i >= startDay && i < startDay + lastDay) {
      trStr += `<td><div>${i - startDay + 1}</div></td>`;
      if (i % 7 === 6) {
        trStr += '</tr>';
        trArr.push(trStr);
        trStr = '<tr>';
      }
      continue;
    }

    // 마지막 날짜 이후 빈칸으로 채우기
    trStr += '<td></td>';
  }
  // 마지막에 채워진 빈칸 추가
  trArr.push(trStr);

  return trArr.join('\n');
}


/**
 * 입력받은 달과 그 다음 달의 년과 월을 리턴한다.
 * 12월일 때 뒤로가는 경우나 1월일때 앞으로가는 경우를 고려한다.
 */
function getDate(year, month) {
  // -1월(1월 - 두달) ,
  if(month === -1) {
    return [year - 1, 11, year - 1, 12];
  }

  // 0월(2월 - 두달)
  if(month === 0){
    return [year - 1, 12, year, 1];
  }

  // 12월
  if(month === 12) {
    return [year, 12, year + 1, 1];
  }

  // 13월(11월 + 두달), 14월(12월 + 두달)
  if(month > 12) {
    return [year + 1, month-12, year + 1, month-11];
  }

  return [year, month, year, month + 1];
}
