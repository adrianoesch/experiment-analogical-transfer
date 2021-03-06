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
      Experiment.session.ipAddress = jsPsych.data.urlVariables()['isDev']=='True' ? 'None' : remoteIp ;
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
        var csv = [{
                    sessionCode : Experiment.session.code,
                    workerId : d['workerId']['workerId'],
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

      var csvStrings = [jsPsych.data.dataOfTypeAsCSV('hebb'), createDemographicsCsvString()];
      var jsonStrings = [jsPsych.data.dataAsJSON()];
      var folderStr = jsPsych.data.urlVariables()['f'] || 'experiment_1605';
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
      $('#conf_code').html([Experiment.session.code,"wgsk4qf6680d"].join('-'));
    },
    moveToNextQuestion(e){
      if((e.keyCode==3||e.key=='c')&&e.ctrlKey){
        $('body').html('');
        jsPsych.pluginAPI.cancelAllKeyboardResponses();
        clearTimeout(Experiment.session.timeOut);
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
    nTrials : jsPsych.data.urlVariables()['nTrials'] || 17 ,
    analogFirst : jsPsych.randomization.sample(['True','False'],1)[0]
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
          stoObj.names = drawSampleNames(stoObj.relations.length*2)
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
          // stoObj.relations = stoObj.relDifficulty==1 ? stoObj.relations : stoObj.relations.map(
          //   function(rels){return([rels[0], rels[2]] ) });
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

          var storyTimeline = [];

          var analoguesTitle = jsPsych.randomization.shuffle(Object.keys(Experiment.material.texts.analogues));
          var fillersTitle = jsPsych.randomization.shuffle(Object.keys(Experiment.material.texts.fillers));
          var burnsTitle = jsPsych.randomization.shuffle(Object.keys(Experiment.material.texts.burns));

          var burnIdx = 0;
          var fillerIdx = 0;
          var analogIdx = 0;

          var pattern = [3,4,7,8,13,14];
          var burnPattern = [0,1,2,12];
          var analogPattern = Experiment.session.analogFirst == 'True' ? pattern : pattern.map(function(i){return(i+2)})
          var fillerPattern = Experiment.session.analogFirst == 'True' ? pattern.map(function(i){return(i+2)}) :  pattern;
          // var pattern2 = [1,1,1,1,0,0,0,0,1,1,1,1];
          // var diffPattern = Experiment.session.difficultFirst == 'True' ? pattern2 : pattern2.map(function(i){return(Math.abs(i-1))});
          // var diffPattern = [1,1,1].concat(diffPattern.slice(0,8)).concat([1,1]).concat(diffPattern.slice(8,12));

          for(i=0;i<Experiment.session.nTrials;i++){
            if(burnPattern.indexOf(i)>=0){
              obj = Experiment.material.texts.burns[burnsTitle[burnIdx]];
              obj.condition = 'burns';
              obj.title = burnsTitle[burnIdx];
              burnIdx++;
            }else if (analogPattern.indexOf(i)>=0){
              obj = Experiment.material.texts.analogues[analoguesTitle[analogIdx]];
              obj.condition = 'analogues';
              obj.title = analoguesTitle[analogIdx];
              analogIdx++;
            }else if (fillerPattern.indexOf(i)>=0){
              obj = Experiment.material.texts.fillers[fillersTitle[fillerIdx]];
              obj.condition = 'fillers';
              obj.title = fillersTitle[fillerIdx];
              fillerIdx++;
            }else if (i == 11){
              obj = Experiment.material.texts.trick;
              obj.title = 'trick';
              obj.condition = 'trick';
            };
            // obj.relDifficulty = diffPattern[i];
            storyTimeline.push(obj)
          };


          return storyTimeline
        };

        storyTimeline = getStoryTimeline().map(storObjHandler);

        return storyTimeline
      };

      var items = getObjects();

      if(jsPsych.data.urlVariables()['isDev']=='True'){
        var items = items.slice(11,17)
      };

      var b = {
        type : 'hebb',
        timeline : items,
        timing_post_trial: 0,
        on_finish : function(){
          data = jsPsych.data.getLastTrialData();
          if(data.title=='trick'){
            var cors = [
              data.stat0_relation==data.stat0_rel_sol,
              data.stat0_name1==data.stat0_name1_sol,
              data.stat0_name2==data.stat0_name2_sol
            ];
            if (cors.some(function(i){return i==false})){
              html = Experiment.utils.wrap(Experiment.material.instructions.abortAttention,100);
              $('body').html(html);
              throw new Error('Experiment aborted due to lack of attention.');
            }
          };
        }
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
    worker_id_block : function(){
      pages = Experiment.utils.wrap(
        Experiment.material.instructions.workerId+
        "<button id='jspsych-fullscreen-button' style='"+Experiment.material.buttonStyle+"'>Next</button>",100)

      b = {
        type: "html-input-ao",
        cont_key: 'Button',
        html: pages,
        inputIDs : ['workerId'],
        data : { questionName: 'workerId' },
        on_finish : function(){
          workerId = jsPsych.data.getLastTrialData()['workerId']
          dones = ["33900426", "35154350", "1856261", "749174", "34417263", "12009597", "33427067", "21843889", "36792158", "14392456", "35408915", "33591819", "33591819", "37569381", "37569381", "36302660", "37848111", "1", "2669113", "37503896", "37781749", "37666276", "35685724", "36109443", "37974953", "37973995", "36874997", "29521896", "36274622", "34726682", "14237967", "33294824", "1", "1", "36877530", "37191129", "34470383", "1", "37392022", "21088425", "34594876", "25295869", "19767815", "10126320", "10126320", "6340330", "19495345", "18244116", "36876389", "31888345", "37089840", "36876797", "37844223", "35921003", "37569382", "37569382", "13473930", "1", "37968169", "234123421", "37905051", "1731155", "25185311", "37118552","37974953","34726682","34594876","36874997","37392022","37973995","15448937","33427067","33591819","33900426","35408915","1856261","37569382","35685724","37118552","37503896","31888345","29521896","11102360","37781749", "36109443", "34430732", "38037792", "36274622", "12009597", "14392456", "37503896", "36877530", "21088425", "36876389", "36876797", "35921003", "25185311","33402064", "36761089", "33984573", "31085823", "9383666", "33110177", "34737109", "15448937", "2034278", "37101250", "11102360", "NA", "35921003", "33980820", "21088425", "11998178", "NA", "36350388", "NA", "1890003", "33996915", "12009597", "37315879", "36876389", "24170547", "36858304", "28301350", "30513549", "9559045", "33519460", "NA", "34737109", "9383666", "9383666", "NA", "20512953", "21017840", "37161088", "24329110", "36807032", "37161088", "18785646", "36875955", "33110177", "6579519", "25501853", "2034278", "30898464", "NA", "25501853", "31424895", "20043657", "16762164", "36624282", "33345368", "18132201", "1854070", "36620182", "33720713", "21088425", "21088425", "31956791", "NA", "36877530", "15445601", "3682947", "36917158", "36850816", "34016083", "6579519", "1854545", "1853182", "1854070", "34694174", "36939273", "NA", "31329809", "36939273", "33984573", "36871506", "36747744", "33110177", "35059719", "14392456", "37547023", "NA", "18386513", "36726729", "12009597", "NA", "13277529", "37262070", "37258901", "2034278", "36620711", "2034278", "37078496", "NA", "31834299", "36876797", "35603542", "12115558", "3663077", "36874997", "36620182", "33816546", "34066313", "21088425", "36875532", "NA", "6556053", "33816546", "36657816", "30321275", "35920592", "25185311", "37503896", "36624282", "35701460", "37144319", "14560516", "34525204" ];
          if(dones.indexOf(workerId) > -1){
            var abortMessage = Experiment.utils.wrap(Experiment.material.instructions.abortId,100);
            $('body').html(abortMessage);
            throw new Error('Experiment aborted due to participation at similar experiment.');
          }else if(workerId.length<6){
            var abortMessage = '<p>This is an invald worker ID.</p>'
            $('body').html(Experiment.utils.wrap(abortMessage,100));
            throw new Error('Experiment aborted due to invalid worker id experiment.');
          }
        },
        check : function(i){
          if(i.workerId==''){
            alert('Input field is empty.')
            return false
          }else{
            return true
          }
        }
      };

      return b
    },
    init : function(){
      var timeline = [];
      timeline.push(this.worker_id_block());
      timeline.push(this.enter_fullscreen_block());
      timeline.push(this.consent_block());
      timeline.push(this.instructions_block());
      timeline.push(this.hebb_block());
      timeline.push(this.exit_fullscreen_block());
      timeline.push(this.survey_block());
      // timeline.push(this.rei_block());
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
    if(jsPsych.data.urlVariables()['allowSkip']=='True'){
      this.utils.addTrialSkip();
    }
    this.utils.setIpAddress();
    jsPsych.init({
      timeline : this.timeline.init()
    });
  }
};

window.onload = function(){Experiment.init()};
