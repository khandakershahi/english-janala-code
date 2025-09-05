const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json())
    .then(json => displayLesson(json.data))
}

const loadLevelWord = (id)=> {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data))
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";
// {
//   "id": 1,
//   "level": 3,
//   "word": "Abundant",
//   "meaning": null,
//   "pronunciation": "অবানডান্ট"
// }

   words.forEach( word => {
    // console.log(word);
    const card = document.createElement('div');
    card.innerHTML = `
   <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-semibold font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fas fa-info-circle"></i></button>
              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
              
            </div>
          </div>
    `;
    wordContainer.append(card);
   })
}

const displayLesson = (lessons) => {
   // 1. get the container and & empty it
   const levelContainer = document.getElementById('level-container');
   levelContainer.innerHTML = "";
   // 2. get into every lessons
   for(let lesson of lessons){
    //3. create elemen
    // console.log(lesson);
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-primary btn-outline">
    <i class="fa-solid fa-circle-question"></i> Lesson - ${lesson.level_no}
    </button>
    `;
            //4. append into container
    levelContainer.append(btnDiv);
   }
            


}


loadLesson();