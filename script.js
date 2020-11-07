// ----------------- Timer Code -------------------------
$(function(){
  let totalTime = 120;
  let min=0, sec=0, counter=0;

  let timer = setInterval(function(){
    counter++;
    min = Math.floor((totalTime - counter)/60); //(120-1)/60 = 1
    sec = totalTime - min*60 -counter; // 120-1*60 - 1 = 59

    $(".timer-box span").text(min + ":" +sec);

    if (counter == totalTime){
      alert("The test has Ended !");
      show_result();
      clearInterval(timer);
    }
  },1000);
});
// ------------------ Code For Questions -------------------
let index = 0;
let page_no = 1;

let questions = mcqs;

function print_mcq(i){
  $(".title span").text(page_no++ +"/"+questions.length);//Question Index

  $(".question-box").text(questions[i].question);
  $(".option-box span").eq(0).text(questions[i].option[0]);
  $(".option-box span").eq(1).text(questions[i].option[1]);
  $(".option-box span").eq(2).text(questions[i].option[2]);
  $(".option-box span").eq(3).text(questions[i].option[3]);
}
print_mcq(index);
// ----------------- Code For Checking Options ---------------
let attempt = 0;
let score = 0;
let wrong = 0;
let negative_marks = 0;

function check(option){
  attempt++;
  let optionClicked = $(option).data("opt");

  if(optionClicked == questions[index].answer){
    $(option).addClass("right");
    score++;
  }
  else{
    $(option).addClass("wrong");
    wrong++;
    negative_marks+=0.25;
  }

  $(".score-box span").text(score);

  $(".option-box span").attr("onclick",""); //removing click attribute(1 click only)
}
// ----------------- Code for Next Button ---------------------
function next(){
  if(index >= questions.length -1){
    show_result();
  }

  index++;
  $(".option-box span").removeClass();//remove previously assigned wrong/right class
  $(".option-box span").attr("onclick","check(this)");//assigning click attribute
  print_mcq(index);
}
// ------------------ Code For Result-Page ----------------------
let total_question = questions.length;

function show_result(){
  $("#question_page").hide();
  $("#result_page").show();

  $("#total-questions").text(total_question);
  $("#attempt-questions").text(attempt);
  $("#correct-questions").text(score);
  $("#incorrect-questions").text(wrong);
  $("#negative_marks").text("-"+negative_marks);
  $("#Score").text(score-negative_marks);
}
