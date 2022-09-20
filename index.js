const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const contentsWrapper = document.querySelector('.contents-wrapper');

prevBtn.addEventListener('click', () => {
  contentsWrapper.classList.add('animate-prev');
});

nextBtn.addEventListener('click', () => {
  contentsWrapper.classList.add('animate-next');
});

// transition(슬라이딩 애니메이션)이 완료될 경우 트리거
contentsWrapper.addEventListener('transitionend', (e) => {
  // prev 버튼을 눌렀을 경우
  if(contentsWrapper.classList.contains('animate-prev')){
    // 마지막 캘린더 삭제
    contentsWrapper.removeChild(contentsWrapper.children[2]);

    // 앞쪽에 캘린더 추가
    const divTwoMonth = createCalendarHtml();
    contentsWrapper.insertBefore(divTwoMonth,contentsWrapper.children[0]);
    contentsWrapper.classList.remove('animate-prev');

    return;
  }

  // next 버튼을 눌렀을 경우

  // 첫번째 캘린더 삭제
  contentsWrapper.removeChild(contentsWrapper.children[0]);

  // 뒤쪽에 캘린더 추가
  const divTwoMonth = createCalendarHtml();
  contentsWrapper.appendChild(divTwoMonth);

  contentsWrapper.classList.remove('animate-next');
});

function createCalendarHtml() {
  const html = `<div class="one-month">
                        <div>2023년 00월</div>
                        <table>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                </div>
                <div class="one-month">
                        <div>2023년 11월</div>
                        <table>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                </div>`;
  const divTwoMonth = document.createElement('div');
  divTwoMonth.classList.add('two-month');
  divTwoMonth.innerHTML = html;

  return divTwoMonth;
}
