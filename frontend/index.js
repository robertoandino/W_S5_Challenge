
async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

  const learners1 = await axios.get('http://localhost:3003/api/learners') // fix this
  const mentors1 = await axios.get('http://localhost:3003/api/mentors') // fix this
  
  //console.log(mentors1.data)
  //console.log(learners1.data)
  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  let learners = {}
  let mentors = {}

  //storing learners1 data into learners object
  for(const key in learners1.data){
  
    learners[key] = learners1.data[key]
    
  }

  //storing mentors1 data into mentors object
  for(const key in mentors1.data){
  
    mentors[key] = mentors1.data[key]
    
  }

  //Matching learners mentors id with mentors id and replacing the id with mentors name.
  for(const key in mentors){

    for(const learnerKey in learners){
      
      for(const mentorIdKey in learners[learnerKey].mentors)
      {
        if(learners[learnerKey].mentors[mentorIdKey] === mentors[key].id){
          learners[learnerKey].mentors[mentorIdKey] = mentors[key].firstName + " " + mentors[key].lastName;
        }
      }
      
    }
  }
  //console.log(mentors[0].id)
  //console.log(learners[0].mentors);

  console.log(learners[0])
  console.log(learners[0].mentors[0])


  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'


  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner in learners) { // looping over each learner object

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    const card = document.createElement('div')
    const heading = document.createElement('h3')
    const email = document.createElement('div')
    const mentorsHeading = document.createElement('h4')
    const mentorsList = document.createElement('ul')
    //const mentor = document.createElement('li');

    card.className = 'card';

    heading.textContent = learners[learner].fullName;
    card.appendChild(heading);
    email.textContent = learners[learner].email
    card.appendChild(email);
    mentorsHeading.className = 'closed'
    mentorsHeading.textContent = "Mentors"
    card.appendChild(mentorsHeading);
    for(let mentorKey in learners[learner].mentors){
      //mentorsHeading.textContent = learners[learner].mentors[mentorKey]
      const mentor = document.createElement('li');
      //mentor.textContent = mentorsHeading;
      mentor.textContent = learners[learner].mentors[mentorKey]
      mentorsList.appendChild(mentor)
    }
    //mentorsHeading.appendChild(mentorsList)
    //card.appendChild(mentorsHeading)


    // 👆 ==================== TASK 3 END ====================== 👆


    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learners[learner].fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learners[learner].id}`
          info.textContent = `The selected learner is ${learners[learner].fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learners[learner].id}`
          info.textContent = `The selected learner is ${learners[learner].fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
