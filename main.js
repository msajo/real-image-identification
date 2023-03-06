function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('Mobilenet',modelLoaded);
}
function preload(){

}
function draw(){
image(video,0,0,300,300);
classifier.classify(video,gotResults);
}
function modelLoaded(){
  console.log('Model loaded');
}
var previous_results = "";
function gotResults(error,results){
  if(error){
    console.error(error);
  } else {
    if (results[0].confidence > 0.5 && previous_results == results[0].label){
      console.log(results);
      previous_results = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = 'object detected is '+ results[0].label;
      var utter_this = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utter_this);

      document.getElementById(results_object_name).innerHTML = "Object : "+ results[0].label;
      document.getElementById(results_object_accuracy).innerHTML = "Accuracy : "+ results[0].confidence;
    }  
  }
}


