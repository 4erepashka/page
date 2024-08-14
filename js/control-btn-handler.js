document.addEventListener('DOMContentLoaded', ()=>{
    const footer_btns = Array.from(document.querySelectorAll('.footer-btn'));
    const map_page = document.querySelector('.map-page');
    const court_list = document.querySelector('.court-list');
    console.log('court-cards', document.querySelectorAll('.court-list__cards__card'))
    const cards_court =  document.querySelectorAll('.court-list__cards__card');
    const court_page = document.querySelector('.court-page');
    const add_players_btn = document.querySelector('.court-page__schedule__card.active');
    console.log('active add players', add_players_btn)
    const choosing_time = document.querySelector('.choosing-time');
    const back_btns =  document.querySelectorAll('.btn-back');
    const free_time = document.querySelector('.free-time');
    const add_court= document.querySelector('.add-court');
    console.log(back_btns)
    console.log('footer-btn', footer_btns);
    console.log('', footer_btns);
    back_btns.forEach(btn=> btn.addEventListener('click', (e)=>{
        getCurrentPage(e);
        if (e.target.closest('section').className.indexOf('court-page') !== -1){
            court_list.classList.add('active')
            court_page.classList.remove('active')
        }else if (e.target.closest('section').className.indexOf('choosing-time') !== -1){
            choosing_time.classList.remove('active')
            court_page.classList.add('active')
        }
       
    }))
    add_players_btn.addEventListener('click', (e)=>{
        choosing_time.classList.add('active')
        court_page.classList.remove('active')
    })
    cards_court.forEach(card=>card.addEventListener('click', (e)=>{
        court_list.classList.remove('active')
        court_page.classList.add('active')
    }))
    footer_btns.forEach(btn=> btn.addEventListener('click', ()=>{
        console.log(btn.innerText)
        console.log(btn.closest('section'))
        console.log('court_list', court_list)
        // if ( btn.innerText === 'Список' ) {
        //         court_list.classList.toggle('active') 
        // }
        btn.innerText === 'Список'  && court_list.classList.toggle('active');
        btn.innerText === 'Карта'  && map_page.classList.toggle('active');
        btn.closest('section').classList.remove('active');

        // btn.innerText === 'Список' && court_list.classList.toggle('active') 
    }))

})


function viewPage(page){
    page.classList.add('active');
}

function getCurrentPage(e){
    console.log('inside')
    let section_className = e.target.closest('section').className
    console.log('page', section_className.slice(0, section_className.indexOf('active')))
}