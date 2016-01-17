jsPsych.plugins['hebb'] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

    var statements = trial.statements;
    var names = trial.names;
    var nNames = trial.nNamesPerStatement;
    var relations = trial.relations;

    var statIdx = 0;
    var td = 0;

    // var setTimeoutHandlers = [];
    var trial_data = {
      title : trial.title,
      similar : trial.similar,
    };
    var kbResps = [];
    var nDrags = 0;

    // function to end trial when it is time
    var end_trial = function() {

      // gather the data to store for the trial
      console.log(trial_data)

      // clear the display
      display_element.html('');

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    var dragProgress = function(){
      var input = $('.inputi').children();
      if(input.length<nNames[statIdx]){
        $('#errormessage').html('All boxes below must contain a word from above. You can drag them with the mouse.')
        return
      };
      statIdx++;
      trial_data['stat'+statIdx.toString()+'_name1'] = input[0].innerHTML;
      trial_data['stat'+statIdx.toString()+'_relation'] =  input[1].innerHTML;
      trial_data['stat'+statIdx.toString()+'_name2'] = nNames[statIdx-1]== 2 ? input[2].innerHTML : '';
      trial_data['stat'+statIdx.toString()+'_timeDrag'] = Date.now()-t0;
      trial_data['stat'+statIdx.toString()+'_ndrags'] = nDrags;
      t0 = Date.now(); // reset new time measure
      nDrags = 0;
      if (statIdx==statements.length){
        end_trial()
      }else{
        display()
      };
    };

    var display = function(){
      $('#names').html('');
      $('#relations').html('');
      if(nNames[statIdx]==1){
        $('#name2').parent().hide();
      };
      $('#statementNr').html(statIdx+1);
      $('.inputi').children().remove();
      $('#errormessage').html('')

      shuffle(names).map(function(i,j){
        $('#names').append("<div class='nameDivs' id='name_"+j.toString()+"'\
        ondragstart='d.drag(event)'  draggable='true'>"+i+"</div>")});
      shuffle(relations).map(function(i,j){
        $('#relations').append("<div class='relationDivs' id='relation_"+j.toString()+"'\
        ondragstart='d.drag(event)' draggable='true'>"+i+"</div>")});
        addDragEvent()
    };

    var addDragToCounter = function(){
      nDrags++;
    }

    var shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    var addDragEvent = function(){
      var nameItems = document.getElementsByClassName('nameDivs')
      var relItems = document.getElementsByClassName('relationDivs')
      for(i=0;i<nameItems.length;i++){
        nameItems[i].addEventListener('dragstart',addDragToCounter)
      };
      for(i=0;i<relItems.length;i++){
        relItems[i].addEventListener('dragstart',addDragToCounter)
      };
    };

    var dragStart = function(){
      statIdx=0;
      var dragStyle = "<style>#content{width:800px;position:absolute;}#menu{ margin-top:0px;}.menui{  width:150px;  height:280px;}.wrapMenu{  padding:0 50px;  float:left;}#menubox{  margin-left:200px;}#names, #name1, #name2{  background-color:rgb(230,230,230);}#relations, #relation{  background-color:rgb(200,200,200);}#names,#relations {  padding:10px;}#input{ width:800px; position:relative;  top:60px;  float:left;}.inputi{  width:190px;  padding:5px;  height:50px;}#inputbox{  font-size:16px;  position:relative;  border:1px solid black;  height:140px; padding:00px 60px;}.wrapInput{  float:left;  margin:20px 10px;}.relationDivs,.nameDivs{  font-size:14px;  font-family:arial;  height:20px;  border-radius: 3px;  margin:8px;  padding:5px;}.nameDivs{  background-color: rgba(0,0,0,0.2);}.relationDivs {  background-color: rgba(0,0,0,0.2);}#nextbutton{  position:relative;  margin-top:30px;  float:right;  padding:10px;  border-radius: 5px;  width:80px;  text-align:center;  background-color: rgba(0,0,0,0.7);  color:rgb(230,230,230)}#nextbutton:hover{  background-color: rgb(255,20,20);  color: black;}#errormessage{  color:rgb(250,50,50);  text-align:center; font-size:15px;}</style>";
      var dragScript = "<script>var d = {  drag : function(ev) {    ev.dataTransfer.setData('text', ev.target.id);    ev.dataTransfer.setData('class', ev.target.className);  },  drop : function(ev) {    ev.preventDefault();    var data = ev.dataTransfer.getData('text');    var classMatch = ev.dataTransfer.getData('class').slice(0,4)==ev.target.id.slice(0,4);    var emptyOrBackDrop = (ev.target.innerHTML=='' || ev.target.className=='menui');    if ( classMatch && emptyOrBackDrop){      ev.target.appendChild(document.getElementById(data));    }  },  allowDrop : function(ev) {    var classMatch = ev.dataTransfer.getData('class').slice(0,4)==ev.target.id.slice(0,4);    if (classMatch && (ev.target.innerHTML=='' || ev.target.className=='menui')){      ev.preventDefault();    };  },};</script>";
      var dragHtml = "<div id='content'>  <div id='menu' >    <div id='menubox'>      <div class='wrapMenu'>Names:<div id='names' class='menui'        ondrop='d.drop(event)' ondragover='d.allowDrop(event)' ></div></div>      <div class='wrapMenu'>Relations:<div id='relations' class='menui' ondrop='d.drop(event)' ondragover='d.allowDrop(event)' ></div></div>  </div>  </div>  <div id='input'>Statement <span id='statementNr'></span>: <span id='errormessage' style='margin-left:15px;'></span>    <div id='inputbox'>      <div class='wrapInput'>Name:<div id='name1' class='inputi' ondrop='d.drop(event)' ondragover='d.allowDrop(event)'></div></div>      <div class='wrapInput'>Relation:<div id='relation' class='inputi' ondrop='d.drop(event)' ondragover='d.allowDrop(event)' ></div></div>  <div class='wrapInput'>Name:<div id='name2' class='inputi' ondrop='d.drop(event)' ondragover='d.allowDrop(event)'></div></div>    </div>    <div id='nextbutton' >Next</div>  </div></div>";
      display_element.html(dragStyle);
      display_element.append(dragHtml);
      display_element.append(dragScript);
      $('#nextbutton').click(dragProgress);
      $('#content').css('top',((screen.height*0.5)-350).toString()+'px');
      t0 = Date.now();
      display();
    };

    var readProgress = function(kbInfo){
      kbResps.push(kbInfo);
      trial_data['stat'+statIdx.toString()+'_timeReading'] = statIdx>0 ? kbResps[statIdx].rt-kbResps[statIdx-1].rt : kbResps[0].rt;
      statIdx++;
      if(statIdx<statements.length){
        display_element.html(statements[statIdx]);
      }else{
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        display_element.html('');
        dragStart();
      };
    };

    var readStart = function(){
      var statIdx = 0;
      display_element.html(statements[statIdx])
    };

    var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: readProgress,
      valid_responses: [39],
      rt_method: 'date',
      persist: true,
      allow_held_key: false
    });

    readStart();
    // dragStart();
    };

  return plugin;
})();
