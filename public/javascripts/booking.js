const bookingCourse = document.getElementById('booking-course')
const timePeriod = document.getElementById('timePeriod')

function updateBookDate (selectElement) {
  // 選取要取的值
  const selectedTime = selectElement.options[selectElement.selectedIndex].getAttribute('data-time')

  // 找到要放的地方屬性
  const bookDateElement = document.getElementById('bookDate')

  // 更新時間內容
  bookDateElement.textContent = '上课时间：' + selectedTime
}

bookingCourse.addEventListener('click', () => { updateBookDate(timePeriod) })
