const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");
    
    // getting new date, current year and month
    let cdate = new Date(),
    currYear = cdate.getFullYear(),
    currMonth = cdate.getMonth();
    
    // storing full name of all months in array
    const months = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];
    
    const renderCalendar = () => {
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
        let liTag = "";
    
        for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
            liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }
    
        for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
            // adding active class to li if the current day, month, and year matched
            let isToday = i === cdate.getDate() && currMonth === new Date().getMonth() 
                         && currYear === new Date().getFullYear() ? "active" : "";
            liTag += `<li class="${isToday}">${i}</li>`;
        }
    
        for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
        }
        currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
        daysTag.innerHTML = liTag;
    }
    renderCalendar();
    
    prevNextIcon.forEach(icon => { // getting prev and next icons
        icon.addEventListener("click", () => { // adding click event on both icons
            // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
            currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    
            if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
                // creating a new date of current year & month and pass it as date value
                cdate = new Date(currYear, currMonth, new Date().getDate());
                currYear = cdate.getFullYear(); // updating current year with new date year
                currMonth = cdate.getMonth(); // updating current month with new date month
            } else {
                cdate = new Date(); // pass the current date as date value
            }
            renderCalendar(); // calling renderCalendar function
        });
    });

    const currentDateHeader = document.querySelector("h6");
const daysTag1 = document.querySelector(".days");
const list = document.getElementById('todolist');
const todoData = {}; // 날짜별 할 일을 저장할 객체

function addItem() {
    let todo = document.getElementById('form3');
    const clickedDate = currentDateHeader.textContent.split('일')[0]; // 현재 헤더에서 날짜 추출

    if (!todoData[clickedDate]) {
        todoData[clickedDate] = []; // 해당 날짜의 할 일을 담을 배열 생성
    }

    const todoItem = todo.value;
    if (todoItem.trim() !== '') {
        todoData[clickedDate].push({ todo: todoItem, checked: false }); // 해당 날짜의 배열에 할 일 추가
    }

    updateToDoList(clickedDate); // 할 일 목록 업데이트
    todo.value = '';
    todo.focus();
}

daysTag1.addEventListener('click', (event) => {
    const clickedDate = event.target.innerText;

    if (clickedDate !== '' && !isNaN(clickedDate)) {
        const [date, month] = clickedDate.split(' '); // 날짜와 월을 분리

        // 클릭한 날짜로 h6 태그 내용 갱신
        currentDateHeader.textContent = `${date}일 To Do`;

        // 선택한 날짜에 해당하는 할 일 목록을 업데이트
        updateToDoList(date);
    }
});

function updateToDoList(date) {
    const clickedDate = date.trim(); // 선택한 날짜 가져오기

    // 할 일 목록을 초기화
    list.innerHTML = '';

    // 선택한 날짜에 해당하는 할 일 목록을 가져와서 list에 추가
    if (todoData[clickedDate] && todoData[clickedDate].length > 0) {
        todoData[clickedDate].forEach((todoObj, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'd-flex align-items-center';
            listItem.style.marginBottom = '5px'; // 간격 추가

            const cbx = document.createElement('input');
            cbx.type = 'checkbox';
            cbx.className = 'form-check-input me-2';
            cbx.checked = todoObj.checked;

            cbx.addEventListener('change', function () {
                todoData[clickedDate][index].checked = this.checked;
                if (this.checked) {
                    listItem.style.textDecoration = 'line-through';
                } else {
                    listItem.style.textDecoration = 'none';
                }
            });

            listItem.appendChild(cbx);
            listItem.appendChild(document.createTextNode(todoObj.todo));

            // 삭제 버튼(X) 추가
            const deleteButton = document.createElement('button');
            deleteButton.innerText = '';
            deleteButton.className = 'btn-close ms-auto';
            deleteButton.addEventListener('click', function () {
                list.removeChild(listItem);
                list.removeChild(hr);
                todoData[clickedDate].splice(index, 1);
                updateToDoList(clickedDate);
            });

            listItem.appendChild(deleteButton);
            list.appendChild(listItem); // ul에 li 추가

            // 체크박스 상태에 따라 텍스트에 라인 적용
            if (todoObj.checked) {
                listItem.style.textDecoration = 'line-through';
            }

            // 수평선(hr 태그) 추가
            const hr = document.createElement('hr');
            list.appendChild(hr);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = 'NO EVENT'; // 해당 날짜에 할 일이 없을 때 메시지 출력
        listItem.style.listStyle = 'none';
        list.appendChild(listItem);
    }
}
