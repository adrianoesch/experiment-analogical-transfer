var Experiment = {
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
    }
    ,
    init :function(){
      console.log('drag initiated')
      var addEvent = function(className,evStr,evFunc){
        var t = document.getElementsByClassName(className);
        for(i=0;i<t.length;i++){
          t[i].addEventListener(evStr,function(event){
            evFunc(event)});
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
    buttonStyle : 'height:60px;width:90px;float:right;font-size:12px;font-weight:bold;',
    instructions : instructions,
    nTrials : 1,
    wrap : function(p){
      var divStart = "<div id='content' style='"+this.contentDivStyle+"'>"
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
      var page = [this.wrap(this.instructions.consent)];
      var b = {
        type : 'instructions',
        pages: page
      };
      return b
    },
    instructions_block : function(){
      var pages = [this.wrap(this.instructions.task),
                    this.wrap(this.instructions.reminder)];
      var b = {
        type : 'instructions',
        pages: pages
      };
      return b
    },
    enter_fullscreen_block : function(){
      var html = this.wrap(this.instructions.welcome);
      var buttonStyle = this.buttonStyle;
      var b={
        type: 'fullscreen',
        html: html,
        buttonStyle : buttonStyle,
        buttontext: "Enter",
        visibility: true,
        on_fullscreen_abort: function(){
          jsPsych.finishTrial();
          jsPsych.endExperiment('The experiment was terminated due to fullscreen abort.');
        },
        on_fullscreen_fail: function(){
          jsPsych.finishTrial();
          jsPsych.endExperiment('Your browser doesn\'t provide the necessary functionality. We recommend \
          using an up-to-date version of Firefox or Chrome.');
        },
        on_visibility_abort:function(){
          jsPsych.finishTrial();
          jsPsych.endExperiment('The experiment was terminated due to lack of visibility of the window.');
        },
        on_visibility_fail:function(){
          jsPsych.finishTrial();
          jsPsych.endExperiment('Your browser doesn\'t provide the necessary functionality. We recommend \
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
      nNames = 6;
      var names = texts.names;
      function drawSampleNames(){
          return jsPsych.randomization.sample(names,nNames)
      };
      function createStories(i,simil){
        i.similar = simil;
        i.names = drawSampleNames()
        i.statements = i.statements.map(function(val,j){
          var replKeys = ['#1','\#2','\#3','\#4','\#5'];
          for(j=0;j<replKeys.length;j++){
            if(val.indexOf(replKeys[j]) >- 1){
              val = val.replace(replKeys[j], i.names[j])};
          };
          return val
        })
        return i
      }
      var similars = jsPsych.randomization.shuffle(texts.stories.similar).map(function(i){
        return createStories(i,true)});
      var nonsimilars = jsPsych.randomization.shuffle(texts.stories.nonsimilar).map(function(i){
        return createStories(i,false)});
      var objects = [];
      for (i=0;i<this.nTrials/2;i++){
        objects.push(similars[i]);
        objects.push(nonsimilars[i]);
      };
      function wrapStatements(stat){
        return "<div style='content'><p style='text-align:center;font-size:40px;line-height:1.5;margin-top:"+((screen.height*.5)-30).toString()+"px;'>"
              +stat+"</p></div>";
      };
      objects = objects.map(function(i){
        i.statements = i.statements.map(function(j){
          return wrapStatements(j);
        })
        return i;
      })
      var b = {
        type : 'hebb',
        timeline : objects
      };
      return b
    },
    debriefing_block : function(){
      var page = [this.wrap(this.instructions.debriefing)];
      var b = {
        type : 'instructions',
        pages: page
      };
      return b
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
      timeline.push(this.debriefing_block());
      return timeline;
    }
  },
  saveData : function(){
    // var csvStrings = [jsPsych.data.dataOfTypeAsCSV('hebb')]
    // $.ajax({
    //   type: 'post',
    //   cache: false,
    //   url: './store2.php',
    //   data: {subjectID: Experiment.user.UID, folder: 'anna', csvStrings: csvStrings, dataAsJSON: jsPsych.data.dataAsJSON()}
    // });
    console.log('Data saved.');
    console.log(jsPsych.data.getData());

  },
  startJsPsych : function(){
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
    var checkIE = function(){
      if (detectIE()!=false){
        var str = 'Your browser doesn\'t provide the necessary functionality. Please use an recently \
        updated version of Chrome or Firefox. If further problems occure, please contact \
        the principal investigator of this experiment.';
        jsPsych.endExperiment(str);
      }
    };

    var timeline = this.timeline.init();
    jsPsych.init({
      timeline : timeline,
      on_start : checkIE,
    });
  }
};

Experiment.startJsPsych();
