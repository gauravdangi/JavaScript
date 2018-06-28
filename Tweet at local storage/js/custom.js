eventListenersFunction();
function eventListenersFunction(){
  console.log('eventListenerFunction called!');
  document.querySelector('#tweetForm').addEventListener('submit',addTweets);
  document.querySelector('.showtweets').addEventListener('click',removeTweets);
  // whenever page loads event
  document.addEventListener('DOMContentLoaded',showTweets);
}
//----------add tweets to local storage----------------
function addTweets(e){
  console.log('getTweets() called!');
  e.preventDefault();
  const tweet = document.querySelector('#tweet').value;
  //console.log(tweet);
  let tweets = getTweetsFromStorage();
  tweets.push(tweet);
  saveTweetsOnStorage(tweets);
}

// gets tweets from local localStorage
function getTweetsFromStorage(){
  let tweets;
  if(localStorage.getItem('tweets')===null){
    tweets = [];
  }else{
    tweets = JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}

// store tweet in local localStorage
function saveTweetsOnStorage(tweets){
  localStorage.setItem('tweets',JSON.stringify(tweets));
  //showTweets();
}

//----------------------------------
function showTweets(){
  console.log('showtweets called');
  tweets = getTweetsFromStorage();
  console.log(tweets);
  tweets.forEach(function(tweet){
    const para = document.createElement('p');
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'glyphicon glyphicon-remove xyz';
    para.textContent = tweet;
    //para.innerHTML = tweet;
    //para.appendChild(document.createTextNode(tweet));
    para.appendChild(removeBtn);
    //console.log(document.querySelector('.showtweets'));
    document.querySelector('.showtweets').appendChild(para);
  })

}
//--------------- removing tweet ---------------
function removeTweets(e){
  //console.log('removeTweets called');
  if(e.target.classList.contains('xyz')){
    //console.log('Remove icon clicked');
    e.target.parentElement.remove();
    const content = e.target.parentElement.textContent;
    removeTweetFromStorage(content);
  }
}

function removeTweetFromStorage(tweet){
  tweets = getTweetsFromStorage();
  tweets.forEach(function(tweetLS,index){
    if(tweetLS === tweet){
      tweets.splice(index,1);
    }
  });
  saveTweetsOnStorage(tweets);
}
