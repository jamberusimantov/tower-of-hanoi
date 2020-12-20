window.onload = ()=>{//בניית תשתית התחלתית
  let index, tower1, tower2, tower3, moves, miror;
  buildEnviorment();
  document.getElementById('submitBtn').addEventListener('click', () => { submit(); });//אירוע לחיצה 
}
function buildEnviorment() {//הכנת התשתית
  main.innerHTML += '<div id="displayDiv"></div>';
  main.innerHTML += '<div id="movesDiv"></div>';
  displayDiv.innerHTML = '<h1 id="title">TOWER OF HANOI</h1>';
  displayDiv.innerHTML += '<div id="inputLine"></div>';
  displayDiv.innerHTML += '<img id="displayImg" src="./towerhanoi.png" alt="pic of tower of hanoi"><h2 id="resultLine"></h2>';
  inputLine.innerHTML = '<input id="inputElement" type="number"> <button id="submitBtn">GO</button>';
}
function submit() {//קריאה לפונקציה
  towerHanoi(parseInt(inputElement.value));
}
function towerHanoi(param) {//פונקציה ראשית
  tower1 = [], tower2 = [], tower3 = [], moves = [], miror = [];
  index = 0;//איפוס משתנים גלובלים
  let start = tower1;//הגדרת מגדלים דינאמים 
  let first = (isOdd(param)) ? tower3 : tower2;
  let last = (isOdd(param)) ? tower2 : tower3;
  movesDiv.innerHTML = '';//ניקוי לוח המהלכים
  if (param > 0) {
    setTower1(param);//מילוי מגדל ההתחלה
    createMiror(param, moves);//יצירת מפה
    play(param, moves, start, first, last);//הפעלת מפת המהלכים
    return moves.length;
  }//הודעת שגיאה למס קטן מ1
  resultLine.innerHTML = "NOT ITERABLE :)";
}
function isOdd(param) {//בדיקת זוגיות
  return (param % 2 != 0) ? true : false;
}
function setTower1(param) {//מילוי מגדל ההתחלה
  for (let i = 1; i <= param; i++) {
    tower1.push(param + 1 - i);
  }
}
function createMiror(param, moves){ //יוצר מפת מהלכים
  for (let i = 1; i <= param; i++) {
    if (isOdd(i)) {//מראה לאסטרטגית אי זוגי
      if (i > 1) { miror = costumizeMiror(i, moves); }
      moves.push(['start', 'first']);//הגדרת סנטר למראה
      if (i > 1) { pushMiror(moves, miror); }//איחוד מראה ומערך
    }
    else {//מראה לאסטרטגית זוגי
      miror = costumizeMiror(i, moves);
      moves.push(['start', 'last']);//הגדרת סנטר למראה
      pushMiror(moves, miror);//איחוד מראה ומערך
    }
  }
}
function costumizeMiror(index, array) {//יוצר מפה
  let newArray = [];
  for (const iterator of array) {
    let firstArrayItem = switchValues(index, iterator[0]);
    let secondArrayItem = switchValues(index, iterator[1]);
    newArray.push([firstArrayItem, secondArrayItem]);
  }
  return newArray;
}
function switchValues(index, param) {//מעדכן ערכים במראה
  if (isOdd(index)) {
    switch (param) {
      case 'start': { return 'last'; }
      case 'last': { return 'first'; }
      case 'first': { return 'start'; }
    }
  }
  else {
    switch (param) {
      case 'start': { return 'first'; }
      case 'first': { return 'last'; }
      case 'last': { return 'start'; }
    }
  }
}
function pushMiror(array, mirorArray) {// משלב את המראה במפה
  for (const iterator of mirorArray) {
    array.push(iterator);
  }
}
function play(param, moves, start, first, last) {//הפעלת מפת המהלכים
  let moveArray = [];
  let move;
  displayMoves(param);
  for (const iterator of moves) {
    index++;
    moveArray = actualTower(iterator, start, first, last);
    move = moveArray[0].pop();
    moveArray[1].push(move);
    displayMoves(param);
    console.log(`disc plays:${move}  move: ${index}`);
  }
}
function actualTower(array, start, first, last) {//קבלת מגדל להעברה
  let newArray = [];
  for (let i = 0; i < array.length; i++) {//המרת מחרוזת למשתנה מייצג של מגדל
    switch (array[i]) {
      case 'start': {
        newArray.push(start);
        break;
      }
      case 'first': {
        newArray.push(first);
        break;
      }
      case 'last': {
        newArray.push(last);
        break;
      }
    }
  }
  return newArray;
}
function displayMoves(param) {//הדפסות למסך
  switch (index) {
    case 0: {//תמונת מצב לפני תחילת המשחק
      resultLine.innerHTML = `RESULT: ${moves.length}`;
      movesDiv.innerHTML += `<div class='moves' id='start'> 
  <h1 class='movesH1'>START</h1><hr>
  <span class='movesSpan'>Tower 1:</span> ${tower1}<br>
  <span class='movesSpan'>Tower 2:</span> ${tower2}<br>
  <span class='movesSpan'>Tower 3:</span> ${tower3}</div>`;
      return;
    }
    case 2 ** param - 1: {//תמונת מצב בסוף המשחק
      movesDiv.innerHTML += `<div class='moves' id='end'> 
  <h1 class='movesH1'>FINISH</h1><hr>
  <span class='movesSpan'>Tower 1:</span> ${tower1}<br>
  <span class='movesSpan'>Tower 2:</span> ${tower2}<br>
  <span class='movesSpan'>Tower 3:</span> ${tower3}</div>`;
      return;
    }
    default: { //תמונת מצב בתוך המשחק
      movesDiv.innerHTML += `<div class='moves' id='move${index}'> 
  <h1 class='movesH1'>Move: ${index}</h1><hr>
  <span class='movesSpan'>Tower 1:</span> ${tower1}<br>
  <span class='movesSpan'>Tower 2:</span> ${tower2}<br>
  <span class='movesSpan'>Tower 3:</span> ${tower3}</div>`;
    }
  }
}