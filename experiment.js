var Experiment = {
  utils:{
    changeVisibility : function(){
        if($('select').val()=='yes'){
          $('.optionalTextarea').show();
        }else{
          $('.optionalTextarea').hide();
        };
    },
    getTimeStamp : function(){
      var str = new Date().toString().slice(0,24);
      var str = str.replace(/ /g,'_');
      var str = str.replace(/:/g,'-');
      return str;
    },
    setIpAddress : function(){
      Experiment.session.ipAddress = remoteIp;
    },
    saveData : function(){
      function transfromHtmlInputFormat(data){
        nd = {};
        for(i=0;i<data.length;i++){
          nd[data[i]['questionName']]=data[i];
        };
        return nd;
      };

      function createDemographicsCsvString(){
        var htmlInputData = jsPsych.data.getTrialsOfType('html-input-ao') ;
        var d = transfromHtmlInputFormat(htmlInputData);

        var b = Experiment.utils.getBrowserInfo();
        var csv = [{ sessionCode : Experiment.session.code,
                    age : d['demo1']['age'],
                    gender : d['demo1']['gender'],
                    language : d['demo1']['language'],
                    qualification : d['demo1']['quali'],
                    effort : d['demo1']['effort'],
                    sincerity : d['demo2']['sincerity'] || '',
                    sessionStart : Experiment.session.start,
                    sessionEnd : Experiment.utils.getTimeStamp(),
                    ipAddress : Experiment.session.ipAddress,
                    browserName : b.name,
                    browserVersion : b.version,
                    similarityClosed : d['similarity']['similarityClosed'],
                    similarityOpen : d['similarity']['similarityOpen'],
                    repetitionClosed : d['repetition']['repetitionClosed'],
                    repetitionOpen : d['repetition']['repetitionOpen'],
                    analogyClosed : d['analogy']['analogyClosed'],
                    analogyOpen : d['analogy']['analogyOpen']
                  }];
        var csvString = jsPsych.data.JSON2CSV(csv);
        return csvString
      };

      var csvStrings = [jsPsych.data.dataOfTypeAsCSV('hebb'),jsPsych.data.dataOfTypeAsCSV('survey-likert'), createDemographicsCsvString()];
      var jsonStrings = [jsPsych.data.dataAsJSON()];
      var folderStr = jsPsych.data.getURLVariable('f') || 'experiment_1604';
      $.ajax({
        type: 'post',
        cache: false,
        url: './store.php',
        data: {
          subjectID: [Experiment.session.code,Experiment.utils.getTimeStamp()].join('_'),
          folder: folderStr,
          csvStrings: csvStrings,
          dataAsJSON: jsonStrings
        }
      });
      console.log('Data saved.');
    },
    getBrowserInfo : function(){
      var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if(/trident/i.test(M[1])){
          tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
          return {name:'IE',version:(tem[1]||'')};
          }
      if(M[1]==='Chrome'){
          tem=ua.match(/\bOPR\/(\d+)/)
          if(tem!=null)   {return {name:'Opera', version:tem[1]};}
          }
      M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
      return {
        name: M[0],
        version: M[1]
      }
    },
    checkBrowser : function(){

      b = Experiment.utils.getBrowserInfo();

      acceptedBrowsers = {
        'Firefox': 42,
        'Chrome': 45,
        'Safari': 8
      };

      if(Object.keys(acceptedBrowsers).indexOf(b.name) == -1){
        $('body').html('<h4>You must either use Chrome, Firefox or Safari to take part in this experiment.</h4>');
        console.log(b);
        throw new Error('Experiment aborted due to invalid browser.');
      }else if(b.version < acceptedBrowsers[b.name]){
        $('body').html('<h4>The browser version is too outdated for this experiment. Please update your browser and try again.</h4>');
        console.log(b);
        throw new Error('Experiment aborted due to unaccepted browser.');
      }else if(screen.width<800){
        $('body').html('<h4>Your screen is too small. We need a minimum of 800px screen width to display stimuli.</h4>');
        throw new Error('Experiment aborted due to small screen size.');
      }
    },
    wrap : function(p,mTop){
      mTop = mTop || 0;
      var divStart = "<div id='content' style='"+Experiment.material.contentDivStyle+"margin-top:"+mTop+"px;'>"
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
    displayConfCode : function(){
      $('#conf_code').html([Experiment.session.code,"57xo5ftqu4vr"].join('-'));
    },
    moveToNextQuestion(e){
      if(e.which==3&&e.ctrlKey){
        $('body').html('');
        jsPsych.pluginAPI.cancelAllKeyboardResponses();
        jsPsych.finishTrial();
      };
    },
    addTrialSkip(){
      $(document).bind('keypress',function(e){Experiment.utils.moveToNextQuestion(e)});
    }
  },
  session : {
    is_dev : jsPsych.data.urlVariables()['is_dev'] == 'true',
    code : jsPsych.randomization.randomID(12),
    nTrials : jsPsych.data.urlVariables()['is_dev'] == 'true' ? 1 : 7
  },
  material : {
    names : jsPsych.randomization.shuffle(names),
    texts : texts,
    instructions : instructions,
    contentDivStyle : 'position:absolute;width:800px;left:'+
                      +((screen.width-800)/2).toString()+'px;',
    buttonStyle : 'height:60px;width:90px;float:right;font-size:12px;font-weight:bold;margin-top:50px;'
  },
  timeline : {
    consent_block : function(){
      var page = [Experiment.utils.wrap(Experiment.material.instructions.consent,100)];
      var b = {
        type : 'instructions',
        pages: page
      };
      return b
    },
    instructions_block : function(){
      var pages = [Experiment.utils.wrap(Experiment.material.instructions.task),
                    Experiment.utils.wrap(Experiment.material.instructions.reminder,screen.height*.5-200)];
      var b = {
        type : 'instructions',
        pages: pages
      };
      return b
    },
    enter_fullscreen_block : function(){
      var html = Experiment.utils.wrap(Experiment.material.instructions.welcome,50);
      var buttonStyle = Experiment.material.buttonStyle;
      var b={
        type: 'fullscreen',
        html: html,
        buttonStyle : Experiment.material.buttonStyle,
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
      var html = Experiment.utils.wrap(Experiment.material.instructions.end_fullscreen,100);

      var b = {
        type : 'fullscreen',
        exit : true,
        buttonStyle : Experiment.material.buttonStyle,
        buttontext: "Exit",
        html : html
      };
      return b;
    },
    hebb_block : function(){

      var getObjects = function(){

        function storObjHandler(stoObj){
          stoObj.names = drawSampleNames(stoObj.statements.length*2)
          stoObj.correctNamesInStatements = [];
          stoObj.nNamesPerStatement = [];
          var replKeys = ['\#1','\#2','\#3','\#4','\#5'];
          stoObj.statements = stoObj.statements.map(function(val,num){
            stoObj.correctNamesInStatements[num] = [];
            stoObj.nNamesPerStatement[num] = [];
            for(j=0;j<replKeys.length;j++){
              if(val.indexOf(replKeys[j].slice(1,2)) > -1){
                val = val.replace(replKeys[j], stoObj.names[j]);
                stoObj.correctNamesInStatements[num].push(stoObj.names[j]);
                };
            };
            stoObj.nNamesPerStatement[num] = stoObj.correctNamesInStatements[num].length;
            val = wrapStatements(val);
            return val;
          })
          return stoObj;
        };

        function drawSampleNames(nNames){
          var n = Experiment.material.names.splice(0,nNames);
          return n;
        };

        function wrapStatements(stat){
          return "<div style='content'><p style='text-align:center;font-size:40px;line-height:1.5;margin-top:"+((screen.height*.5)-30).toString()+"px;'>"
                +stat+"</p></div>";
        };

        function getStoryTimeline(){

          if(Experiment.session.is_dev){
            var analoguesTitle = Object.keys(Experiment.material.texts.analogues).slice(0,1);
            var fillersTitle = Object.keys(Experiment.material.texts.fillers).slice(0,1);
          }else{
            var analoguesTitle = jsPsych.randomization.shuffle(Object.keys(Experiment.material.texts.analogues));
            var fillersTitle = jsPsych.randomization.shuffle(Object.keys(Experiment.material.texts.fillers));
          }

          var storyTimeline = [];

          for(i=0;i<Experiment.session.nTrials;i++){
            analogueObj = Experiment.material.texts.analogues[analoguesTitle[i]];
            analogueObj.condition = 'analogue';
            analogueObj.title = analoguesTitle[i];
            fillerObj = Experiment.material.texts.fillers[fillersTitle[i]];
            fillerObj.condition = 'filler';
            fillerObj.title = fillersTitle[i];
            storyTimeline.push(fillerObj);
            storyTimeline.push(analogueObj);
            if (i == Math.round(Experiment.session.nTrials/2)){
              trickObj = Experiment.material.texts.trick;
              trickObj.title = 'trick';
              trickObj.condition = 'trick';
              storyTimeline.push(trickObj)
            };
          };

          return storyTimeline
        };

        storyTimeline = getStoryTimeline().map(storObjHandler);

        return storyTimeline
      };

      var items = getObjects();

      var b = {
        type : 'hebb',
        timeline : items,
        timing_post_trial: 0
      };
      return b
    },
    confirmation_block : function(){
      page = Experiment.utils.wrap(
        instructions.confirmation+
        "<script>Experiment.utils.displayConfCode()</script>"
        ,100)
      var sessionCode = Experiment.session.code;
      jsPsych.data.addProperties({sessionCode : sessionCode});

      b = {
        type : 'instructions',
        pages : [page]
      };
      return b;
    },
    demographics_block : function(){
      var nextButton = "<button id='jspsych-fullscreen-button' style='"+Experiment.material.buttonStyle+"'>Next</button>";
      var pages = Experiment.utils.wrap([ Experiment.material.instructions.age+
                              Experiment.material.instructions.gender+
                              Experiment.material.instructions.qualification+
                              Experiment.material.instructions.language+
                              Experiment.material.instructions.effort+
                              nextButton,
                              Experiment.material.instructions.sincerity+
                              nextButton
                            ],100);
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
            inputIDs :  ['age','gender','quali','language','effort'],
            html : pages[0],
            data : {
              questionName:'demo1'
            }
          },{
            inputIDs : ['sincerity'],
            html : pages[1],
            data : {
              questionName:'demo2'
            },
            on_finish : function(){
              Experiment.utils.saveData();
            }
          }
        ]
      };
      return b;
    },
    survey_block : function(){
      var nextButton = "<button id='jspsych-fullscreen-button' style='"+Experiment.material.buttonStyle+"'>Next</button>";
      var pages = Experiment.utils.wrap([
        Experiment.material.instructions.similarityClosed+
        Experiment.material.instructions.similarityOpen+
        nextButton+"<script>document.onchange = Experiment.utils.changeVisibility;</script>",
        Experiment.material.instructions.repetitionClosed+
        Experiment.material.instructions.repetitionOpen+
        nextButton,
        Experiment.material.instructions.analogyClosed+
        Experiment.material.instructions.analogyOpen+
        nextButton],100);

      var b = {
        type: "html-input-ao",
        cont_key: 'Button',
        timeline : [
          {
            html: pages[0],
            inputIDs : ['similarityClosed','similarityOpen'],
            data : {
              questionName: 'similarity'
            }
          },{
            html: pages[1],
            inputIDs : ['repetitionClosed','repetitionOpen'],
            data : {
              questionName: 'repetition'
            }
          },{
            html: pages[2],
            inputIDs : ['analogyClosed','analogyOpen'],
            data : {
              questionName: 'analogy'
            },
            on_finish : function(){
              document.onchange = true;
            }
          }
        ],
        check : function(info){
          keys = Object.keys(info)
          for(i=0;i<keys.length;i++){
            if (info[keys[i]]=='' && $('#'+keys[i]+':visible').length>0){
              return false
            }
          }
          return true
        },
        error : function(){
          alert('Some of the input containers are empty.')
        }
      };

      return b;
    },
    rei_block : function(){
      var q = ["I don't like to have to do a lot of thinking.", "I try to avoid situations that require thinking in depth about something.", "I prefer to do something that challenges my thinking abilities rather than something that requires little thought.", "I prefer complex to simple problems.", "Thinking hard and for a long time about something gives me little satisfaction.", "I trust my initial feelings about people.", "I believe in trusting my hunches.", "My initial impressions of people are almost always right.", "When it comes to trusting people, I can usually rely on my 'gut feelings'.", "I can usually feel when a person is right or wrong even if I can't explain how I know."];
      var l = ['completely false','','','','completely true'];
      var qIds = [0,1,2,3,4,5,6,7,8,9];
      var qIdsShuffled = jsPsych.randomization.shuffle(qIds);

      var ll = [];
      var ql=[]

      for(i=0;i<q.length;i++){
        ql.push(q[qIdsShuffled[i]]);
        ll.push(l);
      };

      var b = {
        type: "survey-likert",
        preamble : '<h4>Please answer following questions:</h4>',
        questions : ql,
        labels : ll,
        data : {
          reiIdx:qIdsShuffled.join(';')
        },
        force_response : true
      };
      return b;
    },
    init : function(){
      var timeline = [];
      timeline.push(this.enter_fullscreen_block());
      timeline.push(this.consent_block());
      timeline.push(this.instructions_block());
      timeline.push(this.hebb_block());
      timeline.push(this.exit_fullscreen_block());
      timeline.push(this.survey_block());
      timeline.push(this.rei_block());
      timeline.push(this.demographics_block());
      timeline.push(this.confirmation_block());
      return timeline;
    }
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
  init : function(){
    this.utils.checkBrowser();
    this.session.start = Experiment.utils.getTimeStamp();
    if(jsPsych.data.urlVariables()['allowSkip']=='true'){
        this.utils.addTrialSkip();
    }
    this.utils.setIpAddress();
    jsPsych.init({
      timeline : this.timeline.init()
    });
  }
};

window.onload = function(){Experiment.init()};
