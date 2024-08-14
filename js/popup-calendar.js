document.addEventListener('DOMContentLoaded', ()=>{
    const btns_popup = Array.from(document.querySelectorAll('.date-btn'));
    const popup = document.querySelector('.calendar');
    const calendar = document.querySelector('.calendar__wrapper');
    console.log(btns_popup);
    console.log(popup);
    btns_popup.forEach(btn=>btn.addEventListener('click', (e)=> {
        popup.style.display = 'block';
        setTimeout(()=>calendar.classList.toggle('active'), 3)
    }))
    document.addEventListener('click', (e)=>{
        console.log(e.target.closest('div'));

        if (calendar.classList.contains('active') && e.target.closest('div') === null){
            calendar.classList.toggle('active');
            setTimeout(()=>popup.style.display = 'none', 10)
        }
    })
    console.log(calendar.classList.contains('active'))
      
})