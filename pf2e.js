

//#region Setup
//#region Bug Fixes
//#region Bug Fix Functions
function fixDupeAttr(dupe, index) {
  return dupe.replace(":/", ":" + index + "/");
}
/**
 * @param {Element} other
 * @param {number} index
 */
const fixDuplicates = (other, index) => {
  console.log(other);
  if (other.id) other.id = fixDupeAttr(other.id, index);
  let otherName = other.getAttribute("name");
  if (otherName) other.setAttribute("name", fixDupeAttr(otherName, index));
  other.querySelectorAll("input").forEach((inputs) => {
    if (inputs.id) inputs.id = fixDupeAttr(inputs.id, index);
    let inputsName = inputs.getAttribute("name");
    if (inputsName) inputs.setAttribute("name", fixDupeAttr(inputsName, index));
  });
  other.querySelectorAll("label").forEach((label) => {
    if (label.htmlFor) label.htmlFor = fixDupeAttr(label.htmlFor, index);
  });
};
//#endregion

//#region Other People Checkboxes
document
  .querySelectorAll('[name="field-option/character-background:/attitude"]')
  .forEach(fixDuplicates);
document
  .querySelectorAll('[name="field-option/character-background:/name"]')
  .forEach(fixDuplicates);
document
  .querySelectorAll('[name="field-option/character-background:/info"]')
  .forEach(fixDuplicates);
document
  .querySelectorAll('[name="field-option/character-background:/alignment"]')
  .forEach(fixDuplicates);
//#endregion
//#endregion

//#region Reference Fields
//#region disable ref fields
const __allInputsWithRef = document.querySelectorAll("input[ref]");
__allInputsWithRef.forEach((input) => {
  input.setAttribute("readonly", true);
});
//#endregion

//#region Ref/Readonly
const __allInputsWithID = document.querySelectorAll("input[id]");
__allInputsWithID.forEach((input) => {
  input.oninput = (x) => {
    const refs = document.querySelectorAll(`input[ref="${input.id}"]`);
    refs.forEach((ref) => {
      ref.value = input.value;
    });
  };
});
//#endregion
//#endregion

//#region Controls

//#region Proficiency Controls
const __proficiencyControlElements = document.getElementsByClassName(
  "field__control--control_icon"
);

let __proficiencyIconPrefix = "icon_proficiency-";
const __proficiencyNames = ["untrained", "trained", "expert", "master", "legendary"];
function getNextProficiency(p) {
  return __proficiencyNames[(__proficiencyNames.indexOf(p) + 1) % __proficiencyNames.length];
}
for (let control of __proficiencyControlElements) {
  control.getElementsByTagName("input")[0].value;
  let input = control.getElementsByTagName("input")[0];
  let logo = control.getElementsByTagName("i")[0];
  control.onclick = () => {
    let curP = input.value;
    logo.classList.toggle(__proficiencyIconPrefix + curP);
    let nextP = getNextProficiency(curP);
    input.value = nextP;
    logo.classList.toggle(__proficiencyIconPrefix + nextP);
  };
}
//#endregion

//#region Alignment Controls
const __alignmentIconPrefix = "field__grid--alignment_";
const __controlAlignmentElements = document.getElementsByClassName(
  "field--control_alignment"
);

for (let control of __controlAlignmentElements) {
  let logo = control.getElementsByClassName("field__grid")[0];
  let inputs = control.getElementsByTagName("input");

  logo.onclick = () => {
    /** @type {HTMLInputElement|null} */
    let cur;
    /** @type {HTMLInputElement|null} */
    let next;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        cur = inputs[i];
        next = inputs[i + 1];
      }
    }
    if (!cur) {
      next = inputs[0];
    }
    if (cur) {
      cur.checked = null;
      logo.classList.toggle(__alignmentIconPrefix + cur.value);
    }
    if (next) {
      next.checked = true;
      logo.classList.toggle(__alignmentIconPrefix + next.value);
    }
  };
}
//#endregion

//#region Potency Controls
const __controlPotencyElements = document.querySelectorAll(
  ".field__control--control_counter"
);
const __potencyLogoPrefix = "icon_counter-";
__controlPotencyElements.forEach((control) => {
  let input = control.querySelector("input");
  let logo = control.querySelector(".field--control_counter__icon");
  control.onclick = () => {
    logo.classList.toggle(__potencyLogoPrefix + input.value);
    input.value++;
    input.value %= 4;
    logo.classList.toggle(__potencyLogoPrefix + input.value);
  };
});

//#endregion

//#endregion
//#endregion
