const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn bg-sky-100">${el}</span> `)
    return htmlElements.join(' ');
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}



const manageSpinner = (status) => {
  if(status == true){
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');
  }else{
     document.getElementById('word-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
};




const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json())
    .then(json => displayLesson(json.data))
}

const removeActive = () => {
  const lessonButtons = document.querySelectorAll('.lesson-btn');
  // console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove('active'));
};


const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {

      removeActive(); // remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);

      clickBtn.classList.add('active'); // add active class only clicked button
      displayLevelWord(data.data);
    })
}

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);

};


// {
//   "word": "Cautious",
//   "meaning": "সতর্ক",
//   "pronunciation": "কশাস",
//   "level": 2,
//   "sentence": "Be cautious while crossing the road.",
//   "points": 2,
//   "partsOfSpeech": "adjective",
//   "synonyms": [
//     "careful",
//     "alert",
//     "watchful"
//   ],
//   "id": 3
// }

const displayWordDetails = (word) => {
  // console.log(word);
  const detailsBox = document.getElementById('details-container');
  detailsBox.innerHTML = `
    <div class="">
      <h2 class="text-2xl font-bold">
        ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
      </h2>
    </div>
    <div class="">
      <h2 class=" font-bold">
        Meaning
      </h2>
      <p>${word.meaning}</p>
    </div>
    <div class="">
      <h2 class=" font-bold">
        Example
      </h2>
      <p>${word.sentence}</p>
    </div>
    <div class="">
      <h2 class=" font-bold">
        সমার্থক শব্দ গুলো
      </h2>
      <div class="">${createElements(word.synonyms)}</div>
      
    </div>
    `;
  document.getElementById('word_modal').showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
       <div class="text-center  col-span-full runded-xl py-10 space-y-6 font-bangla flex flex-col justify-center items-center">
            <img class="mx-auto" src="/assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400  ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
          </div>
        `;
        manageSpinner(false);
    return;
  }
  // {
  //   "id": 1,
  //   "level": 3,
  //   "word": "Abundant",
  //   "meaning": null,
  //   "pronunciation": "অবানডান্ট"
  // }

  words.forEach(word => {
    // console.log(word);
    const card = document.createElement('div');
    card.innerHTML = `
   <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-semibold font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
              <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fas fa-info-circle"></i></button>
              <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
              
            </div>
          </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
}

const displayLesson = (lessons) => {
  // 1. get the container and & empty it
  const levelContainer = document.getElementById('level-container');
  levelContainer.innerHTML = "";
  // 2. get into every lessons
  for (let lesson of lessons) {
    //3. create elemen
    // console.log(lesson);
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-primary btn-outline lesson-btn">
    <i class="fas fa-book-open"></i> Lesson - ${lesson.level_no}
    </button>
    `;
    //4. append into container
    levelContainer.append(btnDiv);
  }



}


loadLesson();


document.getElementById('btn-search').addEventListener('click', () => {
  removeActive();
  const input = document.getElementById('input-search');
  const searchValue = input.value.trim().toLowerCase();
  
  fetch("https://openapi.programming-hero.com/api/words/all")
  .then((res) => res.json())
  .then((data)=> {
    const allWords = data.data;
    console.log(allWords);
    const filterWords = allWords.filter((word) => 
      word.word.toLowerCase().includes(searchValue) 
  );
displayLevelWord(filterWords);
  });
  
})