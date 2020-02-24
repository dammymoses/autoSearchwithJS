const search = document.querySelector('#search');
const matchList = document.getElementById('match-list');
const card=document.querySelectorAll('.card');






matchList.addEventListener('click', function(e){

if(e.target.classList == 'selected'){
    const click=e.target.textContent;
    const selectClicked =click.split(' ')
    const answer=`${selectClicked[0]} ${selectClicked[1]}`;
    search.value=answer;
    matchList.innerHTML='';
}
//console.log(e.target.querySelector('.selected'));
//console.log(click.split(' '));
})


const searchState = async (SearchText) =>{
    const res = await fetch('./data/countries.json');
    const state = await res.json();
    // console.log(state);
    let matches = state.filter(state =>{
    const regex = new RegExp(`^${SearchText}`,'gi');
    return state.name.match(regex) || state.abbr.match(regex)
});
    console.log('strike2',matches.length)
    if(SearchText.length === 0){
        matches =[];
        matchList.innerHTML='';
        console.log('strike',matches.length)
    }
    outputHtml(matches);
}
    const outputHtml = (matches) =>{
        if(matches.length > 0){
            matchList.innerHTML='';
            matchList.classList.add('ontop');
    const html = matches.map(match=>{
        const div =document.createElement('div');
        div.innerHTML=`<div class="card card-body mb-1">
        <h4 class="selected">${match.name} (${match.abbr}) 
        <span class="text-primary">${match.capital}</span>
        </h4>
        <small>Lat:${match.lat} / Long: ${match.long}</small>
        </div>`
        matchList.appendChild(div);
    }
    )

   // matchList.innerHTML=html;
        }
    }
search.addEventListener('input', ()=>searchState(search.value))


 