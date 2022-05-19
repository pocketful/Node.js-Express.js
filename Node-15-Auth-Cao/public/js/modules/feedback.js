let errorsFeArr = [];

export function clearFeErrsArr() {
  errorsFeArr = [];
}

export function clearErrsSpans() {
  // clearErrsArr();
  document.querySelectorAll('.err').forEach((errEl) => {
    const error = errEl;
    error.textContent = '';
    error.previousElementSibling.classList.remove('err-input');
    // error.previousElementSibling.style.border = 'none';
  });
}

function clearErrCommon(output) {
  const commonErr = document.getElementById(output);
  commonErr.textContent = '';
  return commonErr;
}

export function feedback(output, errors = errorsFeArr) {
  console.log('Errors ===', errors);

  clearErrsSpans();
  const commonErr = clearErrCommon(output);

  if (typeof errors === 'string') {
    commonErr.textContent = errors;
  }

  if (Array.isArray(errors)) {
    errors.forEach((errObj) => {
      const errEl = document.getElementById(errObj.field);
      // const errEl = formEl.elements[errObj.field];
      errEl.classList.add('err-input');
      errEl.nextElementSibling.textContent = errObj.message;
      // errEl.style.border = '2px solid red';
      // errEl.nextElementSibling.textContent = errObj.message;
      // const input = document.querySelector(`#${form} > * > #${errObj.path}`); // #formLogin > * > #email
    });
  }
}

/* Front End ----------------------------------------------------------------------- */
/* BE errors:
data.message === [
  { message: '"email" is not allowed to be empty', field: 'email' },
  { message: '"password" length must be at least 3 characters long', field: 'password' }
] */

function addErrToErrsArr(message, field) {
  errorsFeArr.push({ message, field });
}

export function checkInput(valueToCheck, field, rulesArr) {
  // forEach, map won't stop - will show all the rules. we need to terminate after the first rule. return only terminate one cycle
  // rulesArr.forEach(rule => );
  // for loop is good, for in is newer. with return it will terminate all loop
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of rulesArr) {
    // console.log('valueToCheck===', valueToCheck);
    // console.log('field===', field);
    // console.log('rule===', rule);
    if (rule === 'required') {
      if (valueToCheck === '') {
        addErrToErrsArr(`${field} is not allowed to be empty`, field);
        return;
      }
    }
    if (rule.split('-')[0] === 'minLength') {
      const length = rule.split('-')[1];
      if (valueToCheck.length < length) {
        addErrToErrsArr(`${field} length must be at least ${length} characters long`, field);
        return;
      }
    }
    if (rule.split('-')[0] === 'maxLength') {
      const length = rule.split('-')[1];
      if (valueToCheck.length > length) {
        addErrToErrsArr(
          `${field} length must be less than or equal to ${length} characters long`,
          field,
        );
        return;
      }
    }
    if (rule === 'email') {
      if (!valueToCheck.includes('@')) {
        addErrToErrsArr(`${field} must be a valid email`, field);
        return;
      }
      if (!valueToCheck.split('@')[1].includes('.')) {
        addErrToErrsArr(`${field} must be a valid email`, field);
        return;
      }
    }
  }
}

/* passwords --------------------------------------------------------------------- */
const passInpEl = document.getElementById('password');
const pass2InpEl = document.getElementById('password2');

export function clearFeedback(output) {
  // clearErrSpans();
  clearErrCommon(output);
  passInpEl.style.border = 'none';
  pass2InpEl.style.border = 'none';
  passInpEl.nextElementSibling.textContent = '';
  pass2InpEl.nextElementSibling.textContent = '';
}

export function passwordFeedback() {
  passInpEl.style.border = '2px solid red';
  pass2InpEl.style.border = '2px solid red';
  passInpEl.nextElementSibling.textContent = "Passwords does't match";
  pass2InpEl.nextElementSibling.textContent = "Passwords does't match";
}
