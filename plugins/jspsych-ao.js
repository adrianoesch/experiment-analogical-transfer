jsPsych.plugins["ao"] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {
    //
    // var statements = trial.objects.statements;
    // var names = trial.objects.names;
    // var relations = trial.objects.relations;
    //
    // // var setTimeoutHandlers = [];
    // var trial_data = {};
    // var kbResps = [];
    //
    // // function to end trial when it is time
    // var end_trial = function() {
    //
    //   // gather the data to store for the trial
    //   console.log(trial_data)
    //
    //   //jsPsych.data.write(trial_data);
    //
    //   // clear the display
    //   display_element.html('');
    //
    //   // move on to the next trial
    //   jsPsych.finishTrial(trial_data);
    // };
    //
    // var dragProgress = function(){
    //   var input = $('.inputi').children();
    //   if(input.length<3){
    //     $('#errormessage').html('These 3 boxes must contain a word from above.')
    //     return
    //   };
    //
    //   trial_data['name1_stat'+statIdx.toString()] = input[0].innerHTML;
    //   trial_data['relation'+statIdx.toString()] =  input[1].innerHTML;
    //   trial_data['name1_stat'+statIdx.toString()] = input[2].innerHTML;
    //
    //   if (statIdx==statements.length){
    //     end_trial()
    //   }else{
    //     display()
    //   };
    // };
    //
    // var display = function(){
    //   $('#names').html('');$('#relations').html('');
    //   $('.inputi').children().remove();
    //   $('#errormessage').html('')
    //
    //   shuffle(names[statIdx]).map(function(i,j){
    //     $('#names').append("<div class='nameDivs' id='name_"+j.toString()+"'\
    //     ondragstart='drag(event)'  draggable='true'>"+i+"</div>")});
    //   shuffle(relations[statIdx]).map(function(i,j){
    //     $('#relations').append("<div class='relationDivs' id='relation_"+j.toString()+"'\
    //     draggable='true' ondragstart='drag(event)'>"+i+"</div>")});
    // };
    //
    // var shuffle = function(array) {
    //     for (var i = array.length - 1; i > 0; i--) {
    //         var j = Math.floor(Math.random() * (i + 1));
    //         var temp = array[i];
    //         array[i] = array[j];
    //         array[j] = temp;
    //     }
    //     return array;
    // };
    //
    // var d = {
    //   drag : function(ev) {
    //     ev.dataTransfer.setData("text", ev.target.id);
    //     ev.dataTransfer.setData("class", ev.target.className);
    //   },
    //   drop : function(ev) {
    //     ev.preventDefault();
    //     var data = ev.dataTransfer.getData("text");
    //     var classMatch = ev.dataTransfer.getData("class").slice(0,4)==ev.target.id.slice(0,4);
    //     var emptyOrBackDrop = (ev.target.innerHTML=='' || ev.target.className=="menui");
    //     if ( classMatch && emptyOrBackDrop){
    //       ev.target.appendChild(document.getElementById(data));
    //     }
    //   },
    //   allowDrop : function(ev) {
    //     var classMatch = ev.dataTransfer.getData("class").slice(0,4)==ev.target.id.slice(0,4);
    //     if (classMatch && (ev.target.innerHTML=='' || ev.target.className=="menui")){
    //       ev.preventDefault();
    //     };
    //   },
    // };
    //
    // var dragStart = function(){
    //   var dragStyle = "<style>body{  font-family:helvetica;  font-size:20px;}#content{  position:relative;  width:800px;  left:150px;}#menu{  postion:relative;  margin-top:100px;}.menui{  width:150px;  height:280px;}.wrapMenu{  padding:0 50px;  float:left;}#menubox{  margin-left:200px;}#names, #name1, #name2{  background-color:rgb(230,230,230);}#relations, #relation{  background-color:rgb(200,200,200);}#names,#relations {  padding:10px;}#input{  left:100px;  position:relative;  top:60px;  float:left;}.inputi{  width:170px;  padding:5px;  height:50px;}#inputbox{  font-size:16px;  position:relative;  border:1px solid black;  height:120px;  width:600px;  padding:00px 60px;}.wrapInput{  float:left;  margin:20 10px;}.relationDivs,.nameDivs{  font-size:14px;  font-family:arial;  height:20px;  border-radius: 3px;  margin:8px;  padding:5px;}.nameDivs{  background-color: rgba(0,0,0,0.2);}.relationDivs {  background-color: rgba(255,255,255,0.5);}#nextbutton{  position:relative;  margin-top:30px;  float:right;  padding:10px;  border-radius: 5px;  width:80px;  text-align:center;  background-color: rgba(0,0,0,0.7);  color:rgb(230,230,230)}#nextbutton:hover{  background-color: rgb(255,20,20);  color: black;}#errormessage{  color:rgb(250,50,50);  text-align:center;}</style>";
    //   var dragHtml = "<div id='content'>  <div id='menu' >    <div id='menubox'>      <div class='wrapMenu'>Names:<div id='names' class='menui'        ondrop='d.drop(event)' ondragover='d.allowDrop(event)' ></div></div>      <div class='wrapMenu'>Relations:<div id='relations' class='menui'        ondrop='d.drop(event)' ondragover='d.allowDrop(event)' ></div></div>  </div>  </div>  <div id='input'>Statement #: <span id='errormessage'></span>    <div id='inputbox'>      <div class='wrapInput'>Name:<div id='name1' class='inputi'        ondrop='d.drop(event)' ondragover='d.allowDrop(event)'></div></div>      <div class='wrapInput'>Relation:<div id='relation' class='inputi'        ondrop='d.drop(event)' ondragover='d.allowDrop(event)' ></div></div>      <div class='wrapInput'>Name:<div id='name2' class='inputi'        ondrop='d.drop(event)' ondragover='d.allowDrop(event)'></div></div>    </div>    <div id='nextbutton' onclick='d.dragProgress()'>Next</div>  </div></div>";
    //   $('body').html(dragStyle)
    //   $('body').append(dragHtml)
    //   var statIdx = 0;
    //   display()
    // };
    //
    // var readProgress = function(kbInfo){
    //   kbResps.push(kbInfo);
    //   trial_data['reading.time.'+kbResps.length] = kbResps[statIdx].rt-kbResps[statIdx-1].rt || kbResps[0].rt;
    //   statIdx++;
    //   if(statIdx<statements.length){
    //     display_element.html(statements[statIdx]);
    //   }else{
    //     jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
    //     dragDrop();
    //   };
    // };
    //
    // var readStart = function(){
    //   var statIdx = 0;
    //   display_element.html(statements[statIdx])
    //   var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
    //     callback_function: readProgress,
    //     valid_responses: [39],
    //     rt_method: 'date',
    //     persist: true,
    //     allow_held_key: false
    //   });
    // }
    //
    // readStart();
    };

  return plugin;
})();
