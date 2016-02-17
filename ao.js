var Experiment = {
  getTimeStamp : function(){
    var str = new Date().toString().slice(0,24);
    var str = str.replace(/ /g,'_');
    var str = str.replace(/:/g,'-');
    return str;
  },
  session : {
    code : jsPsych.randomization.randomID(12)
  },
  d : {
    targetID : '',
    className : '',
    dragstart : function(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
      Experiment.d.targetID = ev.target.id;
      Experiment.d.className = ev.target.className;
    },
    drop : function(ev) {
      ev.preventDefault();
      var classMatch = Experiment.d.className.slice(0,4)==ev.target.id.slice(0,4);
      var emptyOrBackDrop = (ev.target.innerHTML=='' || ev.target.className=='menui');
      if ( classMatch && emptyOrBackDrop){
        ev.target.appendChild(document.getElementById(Experiment.d.targetID));
        ev.currentTarget.style.border = "";
      };
    },
    dragover : function(ev) {
      var classMatch = Experiment.d.className.slice(0,4)==ev.target.id.slice(0,4);
      if (classMatch && (ev.target.innerHTML=='' || ev.target.className=='menui')){
        ev.preventDefault();
        ev.currentTarget.style.border = "1px dashed black";
      };
    },
    dragleave : function(ev){
      ev.currentTarget.style.border = "";
    },
    init :function(){
      var addEvent = function(className,evStr,evFunc){
        var t = document.getElementsByClassName(className);
        for(i=0;i<t.length;i++){
          t[i].addEventListener(evStr,evFunc,false);
        };
      };
      addEvent("nameDivs","dragstart",Experiment.d.dragstart);
      addEvent("relationDivs","dragstart",Experiment.d.dragstart);
      addEvent("menui","dragover",Experiment.d.dragover);
      addEvent("menui","drop",Experiment.d.drop);
      addEvent("menui","dragleave",Experiment.d.dragleave);
      addEvent("inputi","dragover",Experiment.d.dragover);
      addEvent("inputi","drop",Experiment.d.drop);
      addEvent("inputi","dragleave",Experiment.d.dragleave);
    }
  },
  timeline : {
    contentDivStyle : 'position:absolute;width:800px;left:'+
                      +((screen.width-800)/2).toString()+'px;',
    buttonStyle : 'height:60px;width:90px;float:right;font-size:12px;font-weight:bold;margin-top:50px;',
    instructions : instructions,
    nTrials : 1,
    wrap : function(p,mTop){
      mTop = mTop || 0;
      var divStart = "<div id='content' style='"+this.contentDivStyle+"margin-top:"+mTop+"px;'>"
      if (typeof p == 'string'){
        var t = divStart+p+'</div>';
      }else{
        var t = [];
        for (i=0;i<p.length;i++){
          t.push(divStart+p[i]+'</div>');
        };
      };
      return t;
    },
    consent_block : function(){
      var page = [this.wrap(this.instructions.consent,100)];
      var b = {
        type : 'instructions',
        pages: page
      };
      return b
    },
    instructions_block : function(){
      var pages = [this.wrap(this.instructions.task),
                    this.wrap(this.instructions.reminder,screen.height*.5-200)];
      var b = {
        type : 'instructions',
        pages: pages
      };
      return b
    },
    enter_fullscreen_block : function(){
      var html = this.wrap(this.instructions.welcome,50);
      var buttonStyle = this.buttonStyle;
      var b={
        type: 'fullscreen',
        html: html,
        buttonStyle : buttonStyle,
        buttontext: "Enter",
        visibility: true,
        on_fullscreen_abort: function(){
          jsPsych.abortExperiment('The experiment was terminated due to fullscreen abort.');
        },
        on_fullscreen_fail: function(){
          jsPsych.abortExperiment('Your browser doesn\'t provide the necessary functionality. We recommend \
          using an up-to-date version of Firefox or Chrome.');
        },
        on_visibility_abort:function(){
          jsPsych.abortExperiment('The experiment was terminated due to lack of visibility of the window.');
        },
        on_visibility_fail:function(){
          jsPsych.abortExperiment('Your browser doesn\'t provide the necessary functionality. We recommend \
          using an up-to-date version of Firefox or Chrome.');
        }
      };
      return b
    },
    exit_fullscreen_block : function(){
      var html = this.wrap(this.instructions.end_fullscreen);
      var buttonStyle = this.buttonStyle;
      var b = {
        type : 'fullscreen',
        exit : true,
        buttonStyle : buttonStyle,
        buttontext: "Save & Exit",
        html : html,
        on_finish : function(data){
          Experiment.saveData();
        }
      };
      return b;
    },
    hebb_block : function(){

      var getObjects = function(){
        var names = texts.names;
        function drawSampleNames(nNames){
            return jsPsych.randomization.sample(names,nNames)
        };

        function createStories(i,simil){
          i.similar = simil;
          i.names = drawSampleNames(i.statements.length*2)
          i.correctNamesInStatements = [];
          var replKeys = ['\#1','\#2','\#3','\#4','\#5'];
          i.statements = i.statements.map(function(val,num){
            i.correctNamesInStatements[num] = [];
            for(j=0;j<replKeys.length;j++){
              if(val.indexOf(replKeys[j].slice(1,2)) > -1){
                val = val.replace(replKeys[j], i.names[j])
                i.correctNamesInStatements[num].push(i.names[j]);
                };
            };
            return val
          })
          return i
        };

        if (is_pilot){
          var difficulties = jsPsych.randomization.shuffle([2,2,2,3,3,3,4,4,4]);
          var objects = jsPsych.randomization.shuffle(texts.stories);
          for (i=0;i<difficulties.length;i++){
            objects[i].diff = difficulties[i];
            objects[i].statements = objects[i].statements.slice(difficulties[i]*-1);
            objects[i].relations = objects[i].relations.slice(difficulties[i]*-1);
            objects[i].nNamesPerStatement = objects[i].nNamesPerStatement.slice(difficulties[i]*-1);
            objects[i] = createStories(objects[i],false);
          };
        }else{
          var similars = jsPsych.randomization.shuffle(texts.stories.similar).map(function(i){
            return createStories(i,true)});
          var nonsimilars = jsPsych.randomization.shuffle(texts.stories.nonsimilar).map(function(i){
            return createStories(i,false)});
          var objects = [];
          for (i=0;i<this.nTrials/2;i++){
            objects.push(similars[i]);
            objects.push(nonsimilars[i]);
          };
        }
        return objects;
      };

      function wrapStatements(stat){
        return "<div style='content'><p style='text-align:center;font-size:40px;line-height:1.5;margin-top:"+((screen.height*.5)-30).toString()+"px;'>"
              +stat+"</p></div>";
      };

      var objects = getObjects();
      objects = objects.map(function(i){
        i.statements = i.statements.map(function(j){
          return wrapStatements(j);
        })
        return i;
      })

      var b = {
        type : 'hebb',
        timeline : objects,
        timing_post_trial: 0
      };
      return b
    },
    confirmation_block : function(){
      page = this.wrap(instructions.confirmation,100)
      var sessionCode = Experiment.session.code;
      jsPsych.data.addProperties({sessionCode : sessionCode});

      b = {
        type : 'instructions',
        pages : [page],
        on_trial_start : function(){
          setTimeout(function(){$('#conf_code').html([sessionCode,"57xo5ftqu4vr"].join('-'))},100);
        }
      };
      return b;
    },
    demographics_block : function(){
      var nextButton = "<button id='jspsych-fullscreen-button' style='"+this.buttonStyle+"'>Next</button>";
      var pages = this.wrap([ this.instructions.age+
                              this.instructions.gender+
                              this.instructions.qualification+
                              nextButton,
                              this.instructions.sincerity+
                              nextButton
                            ]);
      var b = {
        type: "html-input-ao",
        check: function(info){
          keys = Object.keys(info)
          for(i=0;i<keys.length;i++){
            if (info[keys[i]]==''){
              return false
            }
          }
          return true
        },
        cont_key: 'Button',
        error : function(){
          alert('Some of the select-boxes are empty. Please choose an option.')
        },
        timeline:[
          {
            inputIDs :  ['age','gender','quali'],
            html : pages[0]
          },{
            inputIDs : ['sincerity'],
            html : pages[1]
          }]
      };
      return b;
    },
    init : function(){
      var timeline = [];
      timeline.push(this.enter_fullscreen_block());
      timeline.push(this.consent_block());
      timeline.push(this.instructions_block());
      timeline.push(this.hebb_block());
      timeline.push(this.demographics_block());
      timeline.push(this.exit_fullscreen_block());
      timeline.push(this.confirmation_block());
      return timeline;
    }
  },
  saveData : function(){
    function createDemographicsCsvString(){
      var d = jsPsych.data.getTrialsOfType('html-input-ao');
      var csv = [{ sessionCode : d[0]['sessionCode'],
                  age : d[0]['age'],
                  gender : d[0]['gender'],
                  qualification : d[0]['quali'],
                  sincerity : d.length>1 ? d[1]['sincerity'] :  '',
                  sessionStart : Experiment.session.start,
                  sessionEnd : Experiment.getTimeStamp()
                }];
      var csvString = jsPsych.data.JSON2CSV(csv);
      return csvString
    }

    var csvStrings = [jsPsych.data.dataOfTypeAsCSV('hebb'), createDemographicsCsvString()];
    var jsonStrings = [jsPsych.data.dataAsJSON()];

    $.ajax({
      type: 'post',
      cache: false,
      url: './store.php',
      data: {
        subjectID: [Experiment.session.code,Experiment.getTimeStamp()].join('_'),
        folder: 'pilot_160216',
        csvStrings: csvStrings,
        dataAsJSON: jsonStrings
      }
    });

    console.log('Data saved.');

  },
  checkBrowser : function(){
    var isDraggable = function(){
      return 'draggable' in document.createElement('span')
    };

    var detectIE = function(){
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf('MSIE ');
      if (msie > 0) {
          // IE 10 or older => return version number
          return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      };
      var trident = ua.indexOf('Trident/');
      if (trident > 0) {
          // IE 11 => return version number
          var rv = ua.indexOf('rv:');
          return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      };
      var edge = ua.indexOf('Edge/');
      if (edge > 0) {
         // Edge (IE 12+) => return version number
         return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      };
      // other browser
      return false;
    };

    if (detectIE()!=false || isDraggable()==false){
      var html = Experiment.timeline.wrap(instructions.browserError,150)
      $('body').html(html)
      return false
    }else{
      return true
    };
  },
  startJsPsych : function(){
    this.session.start = this.getTimeStamp();
    if (this.checkBrowser()){
      var timeline = this.timeline.init();
      jsPsych.init({
        timeline : timeline
      });
    }
  }
};
console.log(t=JSON.parse(JSON.stringify(texts)))
window.onload = function(){Experiment.startJsPsych()};
