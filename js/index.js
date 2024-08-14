function calendarHandler(){
    popup = document.querySelector('.calendar'),
    daysTag = document.querySelector(".calendar__body__days"),
    years_list_btn = document.querySelector(".calendar__years-list-btn"),
    currentDate = document.querySelector(".calendar__current-date"),
    calendar__wrapper = document.querySelector('.calendar__wrapper'),
    prevNextIcon =  [document.querySelector(".calendar__material-symbols-rounded.prev"), document.querySelector(".calendar__material-symbols-rounded.next")];
    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    let date = new Date();
    let currYear = date.getFullYear();
    let currMonth = date.getMonth()
    const renderCalendar=()=>{
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
    //отдает выбранную дату, на вход - день, который выбрал юзер

    const getChoosenDate = (day)=>{
        return({date: currentDate.innerText, day: day})
    }

    const dateHandler = (tags)=>{
        let dateListArr = Array.from(tags.children)
        dateListArr.forEach((tag, inx)=>tag.addEventListener('click', (e)=>{
            const choosenday = e.target.innerText
            e.target.classList.add('checked')
            dateListArr.map((li, index)=> index !== inx?li.classList.remove('checked'):li.classList.add('checked'));
            // выбранные день из календаря
            console.log(getChoosenDate(choosenday));
        }))
    }
    const updateMonth = (icon) => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { 
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); 
            currMonth = date.getMonth(); 
        } else {
            date = new Date(); 
        }
    }
    const updateYear = ()=>{
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

    currentDate.onclick = ()=>{
        updateYear();
    }
    
    const openCalendar = ()=>{
        renderCalendar();
        popup.classList.add('active');
        setTimeout(()=>calendar__wrapper.classList.toggle('active'), 3);
        dateHandler(daysTag);
        prevNextIcon.forEach(icon => { 
            icon.addEventListener("click", () => { 
                updateMonth(icon)
                renderCalendar();
                dateHandler(daysTag)
            });
        });
    }
    openCalendar()
}

const bar = document.querySelector('.progress-bar');
const loader = document.querySelector('.loading-container');
const map_page = document.querySelector('.map-page');
console.log(document.readyState)
window.onload = ()=> console.log(document.readyState)
function loadData() {
  let progress =  0;
    return new Promise((resolve) => {
      let timerId = setInterval(() => {
        progress += 30;
        bar.style.setProperty('--progress', `${progress}px`);
        if (progress >= bar.clientWidth) {
          clearInterval(timerId);
          resolve();
        }
      }, 160);
    })
  }
  
console.log(loadData())
loadData()
    .then(() => {
      console.log('resolve')
      loader.classList.add('hidden');
      map_page.classList.add('active');
      setTimeout(()=>loader.style.display = 'none', 2000)
    })

function isVisuable(page){
    console.log('vis', page.classList)
    return  page.classList.contains('active')
}
function controlBtnHandler(){
    const footer_btns = Array.from(document.querySelectorAll('.footer-btn'));
    court_list = document.querySelector('.court-list'),
    date_btns = Array.from(document.querySelectorAll('.date-btn')),
    cards_court =  document.querySelectorAll('.court-list__cards__card'),
    court_page = document.querySelector('.court-page'),
    add_players_btn = document.querySelector('.court-page__schedule__card.active'),
    choosing_time = document.querySelector('.choosing-time'),
    back_btns =  document.querySelectorAll('.btn-back'),
    btn_popup_help = document.querySelector('#help-btn'),
    close_btn_help = document.querySelector('.court-page__popup__close-poup'),
    popup_help_wrapper = document.querySelector('.court-page__popup__wrapper'),
    popup_help = document.querySelector('.court-page__popup'),
    sidebar = document.querySelector('.sidebar'),
    btns_sidebar = document.querySelectorAll('.sidebar-btn'),
    invite_block = document.querySelector('.choosing-time__invite'),
    invite_close_btn = document.querySelector('.invite__close-btn'),
    sidebar_close_btn = document.querySelector('.sidebar__close-btn'),
    getCurrentPage = (e)=>{
        return e.target.closest('section')
    },
    
    getPrevpage = (e)=>{
        console.log(e.target.closest('section').className)
        const  prev_index = Array.from(document.querySelectorAll('section')).indexOf(e.target.closest('section')) -1;
        return document.querySelectorAll('section')[prev_index]
    },
    
    goBack=(current, prev)=>{
        viewPage(prev);
        current.classList.remove('active')
    },
    
    viewPage =(currentPage)=>{
        console.log(currentPage)
        currentPage.classList.add('active')
    },
    
    closePage = (currentPage)=>{
        console.log('close the', currentPage)
        currentPage.classList.remove('active')
    },
    showInvite = ()=>{;
    invite_block.classList.add('active')
    },

    closePopup = (popup)=>{
        console.log(popup)
        const popup_wrapper = popup.children[0];
        closePage(popup_wrapper);
        setTimeout(()=>{closePage(popup)}, 10);
        console.log(popup_wrapper)
    };


    function startSwipe(e) {
        let startY = e.touches[0].clientY;
        console.log(e.touches);
        invite_block.addEventListener('touchmove', (e) => swipe(e, startY));
        console.log('event', e.touches[0].clientY);
    }
    
    console.log(invite_close_btn)
    
    invite_close_btn.addEventListener('click', ()=> closePage(invite_block));
    sidebar_close_btn.addEventListener('click', ()=> closePage(sidebar));
    invite_block.addEventListener('click', (e)=> {
        if (e.target !== invite_block) return
        invite_block.classList.toggle('active')
    })

    btn_popup_help.addEventListener('click', (e)=>{
        console.log('help')
        viewPage(popup_help);
        setTimeout(()=>viewPage(popup_help_wrapper), 3)
        btn_popup_help.checked = true;
    })

    btns_sidebar.forEach(btn=>btn.addEventListener('click', (e)=>{
        console.log('sidebar')
        sidebar.classList.toggle('active')
    }))

    document.onclick = (e)=>{
        if ( isVisuable(document.querySelector('.calendar')) && e.target.closest('button') === null && e.target === popup) {
           closePopup(document.querySelector('.calendar'))
        }
    }

    close_btn_help.addEventListener('click', (e)=>{
        closePopup(popup_help);
        btn_popup_help.checked = false;
    })

    add_players_btn.addEventListener('click', (e)=>{
        viewPage(choosing_time);
        closePage(court_page);
        closePage(sidebar)
        setTimeout(()=>showInvite(), 30)
    })

    cards_court.forEach(card=>card.addEventListener('click', ()=>{
        viewPage(court_page);
        closePage(sidebar)
        closePage(court_list);
        closePage(choosing_time);
    }))

    date_btns.forEach(btn=>btn.addEventListener('click', ()=>{
        calendarHandler();
    }))

    footer_btns.forEach(btn=> btn.addEventListener('click', (e)=>{
        viewPage(document.querySelector(`.${btn.value}`))
        closePage(getCurrentPage(e))
        closePage(sidebar)
    }))

    back_btns.forEach(btn=> btn.addEventListener('click', (e)=>{
        console.log(getPrevpage(e));
        goBack(getCurrentPage(e),getPrevpage(e));
    }))
}

document.addEventListener('DOMContentLoaded', ()=>{
    controlBtnHandler();
    var swiper = new Swiper(".mySwiper", {
        pagination: {
          el: ".swiper-pagination",
        },
    })
})



