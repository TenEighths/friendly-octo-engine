const app = {};

//function for api call to get spells of a certain level
app.getSpells = function(level) {
    const spells = $.ajax ({
        url: `https://www.dnd5eapi.co/api/spells/?level=${level}`, 
        method: 'GET',
        dataType: 'json'
    })
    //returns spell object
    return spells; 
}

//get detailed spell information from api
app.getSpellDetails = function(index) {
    $.ajax ({
        url: `https://www.dnd5eapi.co/api/spells/${index}`, 
        dataType: 'json'
    }).then(function(res) {
        
        app.displaySpellDetails(res);
    });
    $('.spell-book').empty();
}

//populates spell-name select
app.populateSpell = function(spell) {
    $('#spell-name').show();
    $('#spell-name').append(`<option value="${spell.index}"> ${spell.name} </option>`);
}

//get all spells from selected level
app.getSpellLevel = () => {
    $('#spell-level').on('change', () => {
        
        //get selected level
        const selection = $('#spell-level option:selected').val();
        //get all spells of selected level from getSpells
        let spells = app.getSpells(selection);
        spells.done(res => {
            //for each spell in selected level populate select
            $('#spell-name').append('<option value="#"> Select a spell </option>')
            res.results.forEach(results => { 
                app.populateSpell(results)           
            });          
        })
    //clear spells when new level selected
    $('#spell-name').empty();
    $('.spell-book').empty();
    });

}

//append spell names to html
app.displaySpells = function() {   
    $('#spell-name').on('change', () => {
        app.getSpellDetails($('#spell-name option:selected').val())     
    });
}
//append spell details
app.displaySpellDetails = function(spell) {
    
    let htmlToAppend = "";
    //ensure all spell descriptions are added to page
    for(let i = 0; i < spell.desc.length; i++) {
        htmlToAppend +=`${spell.desc[i]}<br><br>`;
    }
    $('.spell-book').append(`<p class="spell-desc">${htmlToAppend}</p> `);
    
}

app.init = function() {
    console.log('Initializing');
    
    app.getSpellLevel();
    app.displaySpells();

}

$(document).ready(function() {
    app.init();
})
