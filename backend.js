
//SYMPTOM variables 
var button = document.getElementById("resultsButton")
var Fever = document.getElementById("fever")
var Dry_Cough = document.getElementById("dry_cough")
var Fatigue = document.getElementById("fatigue")
var Aches_and_Pains = document.getElementById("ache/pain")
var Nasal_Congestion = document.getElementById("nasal_congestion")
var Runny_Nose = document.getElementById("runny_nose")
var Sore_Throat = document.getElementById("sore_throat")
var Diarrhoea = document.getElementById("Diarrhoea")
var Exposure = document.getElementById("exposure")
var Auto_Immune_Diseases = document.getElementById("Auto-Immune_Diseases")
var Age = document.getElementById("Age")




//When user clicks "get results" this function runs
button.onclick = function(){
   //Total measuring liklihood that you have Covid-19
   var total = symptomTotal()
   var risk = find_risk()
   var infectionLiklihood = likelihood_of_infection(total)
   var recommendation = find_recommendation()
   
   document.getElementById("textContentOutput").value = infectionLiklihood + "\n" + risk + "\n" + recommendation + "\n" + "\n" + "Disclaimer: This is not a substitute for a physical COVID-19 test. Provided information should be used for guidance only. This website is not responsible for misuse or misinterpretation."
   
}


//Counts number of weighted symtoms and returns to main function
function symptomTotal() {

   var total = 0  
   if (Fever.checked){
      total += 3;
   }
   if (Dry_Cough.checked){
      total += 3;
   }
   if (Fatigue.checked){
      total += 1
   }
   if (Aches_and_Pains.checked){
      total += 1
   }
   if (Nasal_Congestion.checked){
      total += 1 ;
   }
   if (Runny_Nose.checked){
      total += 1
   }
   if (Sore_Throat.checked){
      total += 1
   }
   if (Diarrhoea.checked){
      total += 1
   }
   if (Exposure.checked){
      total += 4
   }

   return total
}


//Outputs your liklihood of infection(Good Chance, Moderate Chance, Small Chance)
function likelihood_of_infection(total){
   
   if (total > 6) {
      return "Likelihood of being infected: High."
   }
   else if (total <= 6 && total > 3) {
      return "Likelihood of being infected: Moderate."
   }
   else {
      return "Likelihood of being infected: Low."
   }
}



//Outputs your risk level based on age and underlying medical conditions(High Risk, Moderate Risk, Low Risk)
function find_risk(){
   
   if (Auto_Immune_Diseases.checked) {
      return "Risk if contracted: Very High."
   }
   if (Age.value > 70) {
      return "Risk if contracted: Very High."
   }
   if (Age.value > 50 && Age.value <= 70) {
      return "Risk if contracted: High."
   }
   if (Age.value > 30 && Age.value <= 50) {
      return "Risk if contracted: Moderate."
   }
   if (Age.value > 10 && Age.value <= 30) {
      return "Risk if contracted: Low."
   }
   if (Age.value <= 10) {
      return "Risk if contracted: Moderate."
   }
}

//Outputs a recommendation based upon risk level, liklihood of infection, exposure
function find_recommendation() { 
   var total = symptomTotal()
   var recommendation1 = "Recommendation: Seek out your local testing procedures, follow them carefully and make as little contact as possible with others."
   var recommendation2 = "Recommendation: Self-quarantine for 14 days and if symptoms worsen or more symptoms appear seek out local testing procedures."
   var recommendation3 = "Recommendation: Continue practicing social distancing and wash hands regularly."

   if (Exposure.checked && total > 0) {
      return recommendation1
   }
   if (Exposure.checked && total == 0) {
      return recommendation2
   }
   if (Age.value > 70 && total > 0 && total < 6) {
      return recommendation2
   }
   if (Auto_Immune_Diseases.checked && total > 0 && total < 6) {
      return recommendation2
   }
   if (total > 6) {
      return recommendation1
   }
   if (total <= 6 && total > 3) {
      return recommendation2
   }
   if (total <= 3) {
      return recommendation3
   }
}