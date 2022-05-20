// eslint-disable-next-line import/no-mutable-exports
export let errorsFeArr = [];

export function clearFeErrsArr() {
  errorsFeArr = [];
}

const errSpanEls = document.querySelectorAll('.err');
const errCommonEl = document.querySelector('.err-common');

export function clearErrors() {
  clearFeErrsArr();
  errCommonEl.textContent = '';
  errSpanEls.forEach((errSpanEl) => {
    const error = errSpanEl;
    error.textContent = '';
    error.previousElementSibling.classList.remove('err-input');
    // error.previousElementSibling.style.border = 'none';
  });
}

export function handleErrors(errors = errorsFeArr) {
  console.log('Errors ===', errors);

  if (typeof errors === 'string') {
    errCommonEl.textContent = errors;
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

/* BE errors:
data.message === [
  { message: '"email" is not allowed to be empty', field: 'email' },
  { message: '"password" length must be at least 3 characters long', field: 'password' }
] */

function addErrToErrsArr(message, field) {
  errorsFeArr.push({ message, field });
}

function checkRequired(value, field) {
  if (value === '') {
    addErrToErrsArr(`${field} is not allowed to be empty`, field);
    return true;
  }
  return false;
}

function checkMinLength(value, minLength, field) {
  if (value.length < minLength) {
    addErrToErrsArr(`${field} length must be at least ${minLength} characters long`, field);
    return true;
  }
  return false;
}

function checkMaxLength(value, maxLength, field) {
  if (value.length > maxLength) {
    addErrToErrsArr(
      `${field} length must be less than or equal to ${maxLength} characters long`,
      field,
    );
    return true;
  }
  return false;
}

function checkEmail(value, field) {
  if (!value.includes('@')) {
    addErrToErrsArr(`${field} must be a valid email`, field);
    return true;
  }
  if (!value.split('@')[1].includes('.')) {
    addErrToErrsArr(`${field} must be a valid email`, field);
    return true;
  }
  return false;
}

function checkRef(value, field, valueR, fieldR) {
  if (value !== valueR) {
    addErrToErrsArr("passwords does't match", fieldR);
    addErrToErrsArr("passwords does't match", field);
    return true;
  }
  return false;
}

export function checkInput(valueToCheck, field, rulesArr) {
  // forEach, map won't stop - will show all the rules. we need to terminate after the first rule. return only terminate one cycle
  // rulesArr.forEach(rule => );
  // for loop is good, for in is newer. with return it will terminate all loop
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of rulesArr) {
    if (rule === 'required') {
      if (checkRequired(valueToCheck, field)) {
        return;
      }
      // if (valueToCheck === '') {
      //   addErrToErrsArr(`${field} is not allowed to be empty`, field);
      //   return;
      // }
    }
    if (rule.split('-')[0] === 'minLength') {
      const min = rule.split('-')[1];
      if (checkMinLength(valueToCheck, min, field)) {
        return;
      }
      // if (valueToCheck.length < length) {
      //   addErrToErrsArr(`${field} length must be at least ${length} characters long`, field);
      //   return;
      // }
    }
    if (rule.split('-')[0] === 'maxLength') {
      const max = rule.split('-')[1];
      if (checkMaxLength(valueToCheck, max, field)) {
        return;
      }
      // if (valueToCheck.length > length) {
      //   addErrToErrsArr(`${field} length must be less than or equal to ${length} characters long`, field);
      //   return;
      // }
    }
    if (rule === 'email') {
      if (checkEmail(valueToCheck, field)) {
        return;
      }
      // if (!valueToCheck.includes('@')) {
      //   addErrToErrsArr(`${field} must be a valid email`, field);
      //   return;
      // }
      // if (!valueToCheck.split('@')[1].includes('.')) {
      //   addErrToErrsArr(`${field} must be a valid email`, field);
      //   return;
      // }
    }
    if (rule.split('-')[0] === 'ref') {
      const fieldRef = rule.split('-')[1];
      const valueRef = rule.split('-')[2];
      if (checkRef(valueToCheck, field, valueRef, fieldRef)) {
        return;
      }
      // if (valueToCheck !== valueRef) {
      //   addErrToErrsArr("passwords does't match", fieldRef);
      //   addErrToErrsArr("passwords does't match", field);
      //   return;
      // }
    }

    // if (typeof rule === 'object') {
    //   if (rule.match) {
    //     // if (valueToCheck !== rule.match) {
    //     //   addErrToErrsArr("passwords does't match", rule.field);
    //     //   addErrToErrsArr("passwords does't match", field);
    //     //   return;
    //     // }
    //   }
    // }
  }
}
