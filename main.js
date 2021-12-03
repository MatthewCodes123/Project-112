//https://teachablemachine.withgoogle.com/models/5r8xYnRVk/model.json

var prediction_1 = ""


camera=document.getElementById("camera")

Webcam.set({
    width:350,
    height:300,
    img_format:"png",
    png_quality:90
});

Webcam.attach("#camera")

function camera1(e){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='cheese' src='"+data_uri+"'>"
    })
}

console.log("ml5 version",ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5r8xYnRVk/model.json",modelLoaded)
function modelLoaded(e){
    console.log("modelLoaded")
}

function speak(e) {
    synth = window.speechSynthesis;
    var speak_data_1 = "The prediction is" + prediction_1
    var utter_this = new SpeechSynthesisUtterance(speak_data_1)
    synth.speak(utter_this)
}

function result(e) {
    img = document.getElementById("cheese")
    classifier.classify(img, gotResult)
}

function gotResult(error, result) {
    if (error) {
        console.error(error)
    }
    else {
        console.log(result)

        prediction_1 = result[0].label
        document.getElementById("e1").innerHTML = prediction_1
        speak()
        if (result[0].label == "Ok hand") {
            document.getElementById("emoji1").innerHTML = "&#128076;"
        }
        if (result[0].label == "Thumbs up hand") {
            document.getElementById("emoji1").innerHTML = "&#128077;";
        }
        if (result[0].label == "Peace hand") {
            document.getElementById("emoji1").innerHTML = "&#9996;";
        }
    }
}