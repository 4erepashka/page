const daysTag = document.querySelector(".calendar__body__days"),
years_list_btn = document.querySelector(".calendar__years-list-btn"),
currentDate = document.querySelector(".calendar__current-date"),
calendar__wrapper = document.querySelector('.calendar__wrapper')
prevNextIcon =  [document.querySelector(".calendar__material-symbols-rounded.prev"), document.querySelector(".calendar__material-symbols-rounded.next")];
console.log(prevNextIcon)
// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
console.log(currYear)
console.log(currMonth)
console.log('the first day of month', new Date(currYear, currMonth +1 , 0).getDate()  )

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { 
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { 
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { 
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerHTML = `${months[currMonth]} ${currYear} <svg class='calendar__years-list-btn' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L11.2929 14.2929C11.6262 14.6262 11.7929 14.7929 12 14.7929C12.2071 14.7929 12.3738 14.6262 12.7071 14.2929L18 9" stroke="#F80000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`; 
    daysTag.innerHTML = liTag;
}
renderCalendar();
dateHandler(daysTag)
console.log(years_list_btn)
currentDate.onclick = (e)=>{
    console.log('click the btn list')
    console.log('click')
    const years_list = document.createElement('div');
    years_list.classList.add('calendar__years-list');
    const yearNow = new Date().getFullYear();
    for (let i = yearNow; i>= yearNow - 41; i--) {
        const yearItem = document.createElement("div");
        yearItem.classList.add("calendar__year-item");
        yearItem.textContent = i;
        years_list.appendChild(yearItem);
        yearItem.addEventListener("click", () => {
          // Обновляем год и перерисовываем календарь
          currYear = i;
          renderCalendar();
          dateHandler(daysTag);
          years_list.remove();
          currentDate.style.display = 'flex'
        });
    }
      // Добавляем список лет в DOM
      currentDate.style.display = 'none'
      calendar__wrapper.appendChild(years_list);
}


prevNextIcon.forEach(icon => { 
    icon.addEventListener("click", () => { 
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        console.log(currMonth, currYear)
        if(currMonth < 0 || currMonth > 11) { 
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); 
            currMonth = date.getMonth(); 
        } else {
            date = new Date(); 
        }
        renderCalendar();
        dateHandler(daysTag)
    });
});

// getChoosenDate -> возвращает объект выбранной даты   

function dateHandler(tags){
    let dateListArr = Array.from(tags.children)
    dateListArr.forEach((tag, inx)=>tag.addEventListener('click', (e)=>{
        const choosenday = e.target.innerText
        e.target.classList.add('checked')
        dateListArr.map((li, index)=> index !== inx?li.classList.remove('checked'):li.classList.add('checked'))
        free_time_page.classList.add('active');
        console.log(getChoosenDate(choosenday));
    }))
}
const dateListArr = Array.from(daysTag)
dateListArr.forEach((tag, inx)=>tag.addEventListener('click', (e)=>{
    const choosenday = e.target.innerText
    e.target.classList.add('checked')
    dateListArr.map((li, index)=> index !== inx?li.classList.remove('checked'):li.classList.add('checked'))
    console.log(getChoosenDate(choosenday));
}))


function getChoosenDate(day){
    console.log('day', day)
    return({date: currentDate.innerText, day: day})
}