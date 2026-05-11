// ================= TYPING EFFECT =================

const words = [

  'Full Stack Developer',

  'Frontend Enthusiast',

  'PHP & SQL Learner',

  'Responsive Web Designer',

  'JavaScript Developer',

  'Creative UI Designer'

];

let i = 0;
let j = 0;
let currentWord = '';
let isDeleting = false;

const typing = document.getElementById('typing');

function type() {

  currentWord = words[i];

  // TYPING

  if (isDeleting) {

    typing.textContent = currentWord.substring(0, j--);

  } else {

    typing.textContent = currentWord.substring(0, j++);

  }

  // WHEN WORD COMPLETES

  if (!isDeleting && j === currentWord.length + 1) {

    isDeleting = true;

    setTimeout(type, 1200);

    return;

  }

  // WHEN WORD DELETES

  if (isDeleting && j === 0) {

    isDeleting = false;

    i = (i + 1) % words.length;

  }

  setTimeout(type, isDeleting ? 45 : 90);

}

// START TYPING

type();