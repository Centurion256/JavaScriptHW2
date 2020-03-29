// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumb, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,  

//Instead of a separate function which checks for length of a string, the lookbehind (?<=.{min_lenth,}) and negative lookbehind (?<!.{max_length,}) patterns have been used
let fields = 
{
  'name': /^(?:\w+?(?:\s{2})?)+(?<=.*\w)$/m,
  'email': /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))(?<=.{5,})(?<!.{51,})$/m,
  'phone': /^[\+0]\d{3}(?:\(\d{2}\)|\d{2})(?:[\s\-]?\d{0,3}){2}[\s-]?\d{2}(?<=(?:\d[^\d]*){12,})$/m,
  'message': /^(?:\b\w+?\b(?<!(?:ugly|pig|dumb|stupid|ignorant))[^\w]*)+(?<=.{10,})$/im
}; 

function validateMe(event) {
    event.preventDefault();
    let nodes = event.target.elements;
    let valid = true;
    for (let field in fields) valid &= validateElement(nodes[field]); 
    valid ? event.target.submit() : event.target.reset();
    return valid;
    
  }

function validateElement(elem) {   
    
    let validElement = true;
    let currErrorNode = elem.parentNode.querySelector('p.help-block');
    currErrorNode.innerHTML = '';
    let currErrors = document.createElement('ul');
    currErrors.setAttribute("role", "alert");
    if (!fields[elem.id].test(elem.value))
    {
      let li = document.createElement('li');
      li.innerText = `${elem.id} format is incorrect`;
      currErrors.appendChild(li);
      validElement = false;
    }
    if (currErrors.childElementCount > 0) {
      currErrorNode.appendChild(currErrors)
    }
    return validElement;
  }
