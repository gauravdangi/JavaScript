console.log('app.js Javascript');

// ----------- if you want to clean local storage ----------
//cleanLocalStorageForCart();
function cleanLocalStorageForCart(){
  let courses = [];
  setCoursesToStorage(courses);
}


// -------------- event Listeners ----------------------
eventHandler();
function eventHandler(){
  document.querySelector('#courses-list').addEventListener('click',addToCart);
  //document.querySelector('.add-to-cart').addEventListener('courses-list',addToCart);
  document.querySelector('#shopping-cart').addEventListener('click', removeCourseFromCart);
  document.querySelector('#clear-cart').addEventListener('click', clearCart);
  document.addEventListener('DOMContentLoaded',showCart);
}

// --------------- Functions -------------------
// ---------- add item to cart function -------------
function addToCart(e){
  console.log('addToCart function called');
  e.preventDefault();
  if(e.target.classList.contains('add-to-cart')){
    //console.log('add to cart clicked');
    //console.log(e.target.parentElement.parentElement);
    const course = getCourseObject(e.target.parentElement.parentElement);
    //console.log(course);
    storeCourseInStorage(course);
  }

}
function getCourseObject(course){
  //console.log('addCourseToLocalSotrage');
  const courseInfo = {
    image : course.querySelector('img').src,
    name: course.querySelector('h4').textContent,
    price: course.querySelector('.price span').textContent,
    id: course.querySelector('a').getAttribute('data-id')
  };
  return courseInfo;
}

// ----------- store course in local storage --------------
function storeCourseInStorage(course){
  //console.log('storeCourseInStorage() called');
  courses = getCoursesFromStorage();
  // check if course is already added
  let isIt = isAlreadyAdded(course,courses);
  console.log(isIt);
  if(isIt == 0){
    console.log('Adding course');
    courses.push(course);
    setCoursesToStorage(courses);
  }
  //showCart();
  window.location.href = 'http://127.0.0.1:3000';
}

// ------- get course from local storage --------------------
function getCoursesFromStorage(){
  //console.log('getCoursesFromStorage() called');
  let courses;
  const localS = localStorage.getItem('courses');
  if(localS === null){
    courses = [];
  }else{
    courses = JSON.parse(localS);
  }
  return courses;
}

// ------------ set course to local storage ---------------
function setCoursesToStorage(courses){
  localStorage.setItem('courses',JSON.stringify(courses));
}

// ----------- check if course is already added to cart --------------
function isAlreadyAdded(course,courses){
  console.log('isAlreadyAdded() called');
  let flag = 0;
  courses.forEach(function(courseLS){
    if(courseLS.name === course.name && courseLS.id === course.id){
      console.log('Already added');
      flag = 1;
      return false;
    }
  });
  return flag;
}

// -------------- show courses in cart ---------------
function showCart(){
  //console.log('showCart() called')
  //clear();
  let courses = getCoursesFromStorage();
  courses.forEach(function(course){
    //creating heading <tr>
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <tr>
          <td><img src="${course.image}" width=100></td>
          <td>${course.name}</td>
          <td>${course.price}</td>
          <td><a href="#" class="romove" data-id="${course.id}">X</a></td>
        </tr>
    `
    document.querySelector('#cart-content').appendChild(tr);
  });
}

// ---------------- remove course from cart ---------------
function removeCourseFromCart(e){
  if(e.target.classList.contains('romove')){
    //console.log(e.target.parentElement.parentElement);
    const course = e.target.parentElement.parentElement;
    const name = course.querySelectorAll('td')[1].textContent;
    console.log(name);
    const id = course.querySelector('a').getAttribute('data-id');
    removeCourse(name,id);
    e.target.parentElement.parentElement.remove();
  }
}

//remove one item
function removeCourse(name,id){
  console.log('removeCourse() called');
  courses = getCoursesFromStorage();
  courses.forEach(function(courseLS,index){
    if(courseLS.name == name && courseLS.id == id){
      courses.splice(index,1);
      return false;
    }
  });
  setCoursesToStorage(courses);
}

// remove everything from cart
function clearCart(){
  cleanLocalStorageForCart();
  clear();
}

// clear courses from cart
function clear(){
  const cartContent = document.querySelector('#cart-content');
  //cartContent.innerHTML = '';  <- we can do like this
  while(cartContent.firstChild){
    cartContent.firstChild.remove();
  }
}
