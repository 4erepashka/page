document.addEventListener('DOMContentLoaded', ()=>{
    const btn_popup = document.querySelector('#help-btn');
    const close_btn = document.querySelector('.court-page__popup__close-poup');
    const popup_wrapper = document.querySelector('.court-page__popup__wrapper');
    const popup = document.querySelector('.court-page__popup');
    console.log('btn',btn_popup);
    console.log('popup', popup);
    console.log(popup_wrapper)
    btn_popup.addEventListener('click', (e)=>{
        popup.style.display = 'block';
        setTimeout(()=>popup_wrapper.classList.toggle('active'), 3)
    })
    close_btn.addEventListener('click', ()=>{
        popup_wrapper.classList.remove('active');
        setTimeout(()=>{popup.style.display = 'none';}, 1000);
        btn_popup.checked = false;
    })
     
})