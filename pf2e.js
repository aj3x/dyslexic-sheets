const controlIcon = document.getElementsByClassName('field__control--control_icon');

let iconPrefixes = 'icon_proficiency-';
const proficiencies = ['untrained', 'trained', 'expert', 'master', 'legendary'];
function getNextProficiency(p) {
    return proficiencies[(proficiencies.indexOf(p) + 1) % proficiencies.length];
}
for (let control of controlIcon){
    control.getElementsByTagName('input')[0].value;
    let input = control.getElementsByTagName('input')[0];
    let logo = control.getElementsByTagName('i')[0];
    control.onclick = () => {
        let curP = input.value;
        console.log('hi', logo, input);
        logo.classList.toggle(iconPrefixes + curP)
        let nextP = getNextProficiency(curP);
        console.log(curP, nextP);
        input.value = nextP;
        logo.classList.toggle(iconPrefixes + nextP);
    }
}
