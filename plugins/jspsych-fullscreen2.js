/**
 * Adrian Oesch
 * Oktober 2015
 *
 * adapted from https://groups.google.com/forum/#!topic/jspsych/qP1qV82msm0
 */
var fs_plugin_glob = {};
jsPsych.plugins['fullscreen'] = (function(){

    var plugin = {};

    plugin.trial = function(display_element, trial){

      // set defaults
      trial.button = trial.buttontext || 'Enter';
      trial.exit = trial.exit || false;
      trial.buttonStyle = trial.buttonStyle || "";
      trial.on_fullscreen_abort = trial.on_fullscreen_abort || null;
      trial.on_fullscreen_fail = trial.on_fullscreen_fail || null;
      trial.on_visibility_abort = trial.on_visibility_abort || null;
      trial.on_visibility_fail = trial.on_visibility_fail || true;

      var fs = {
        check : function (){
          if(typeof document.webkitIsFullScreen != 'boolean' && typeof document.mozFullScreen != 'boolean' && +
          typeof document.msFullscreenElement != 'boolean' && typeof document.fullscreenchange != 'boolean'){
            return false;
          }else{
            return true;
          };
        },
        launch : function (elem) {
          if(elem.requestFullscreen){
            elem.requestFullscreen(elem.ALLOW_KEYBOARD_INPUT);
          }else if(elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen(elem.ALLOW_KEYBOARD_INPUT)
          }else if(elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(elem.ALLOW_KEYBOARD_INPUT);
            if (!(navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") > -1)){
              document.addEventListener('keydown',function(e){e.preventDefault()});
          };
          }else if(elem.msRequestFullscreen) {
            elem.msRequestFullscreen(elem.ALLOW_KEYBOARD_INPUT);
          }
        },
        exit : function () {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          };
        },
        getFullScreenAbort : function (callObj){
          var fullScreenAbort = function(){
            if (!document.webkitIsFullScreen && typeof document.webkitIsFullScreen != 'undefined'){
              callObj.call()
            }else if (!document.mozFullScreen && typeof document.mozFullScreen != 'undefined'){
              callObj.call()
            }else if (!document.msFullscreenElement && typeof document.msFullscreenElement != 'undefined'){
              callObj.call()
            }else if (!document.fullscreenchange && typeof document.fullscreenchange != 'undefined'){
              callObj.call()
            }
          };
          return fullScreenAbort
        },
        addListener : function(){
          if (!document.webkitIsFullScreen && typeof document.webkitIsFullScreen != 'undefined'){
            document.addEventListener('webkitfullscreenchange',Experiment.fs_abort,false);
          }else if (!document.mozFullScreen && typeof document.mozFullScreen != 'undefined'){
            document.addEventListener('mozfullscreenchange',Experiment.fs_abort,false);
          }else if (!document.msFullscreenElement && typeof document.msFullscreenElement != 'undefined'){
            document.addEventListener('MSFullscreenChange',Experiment.fs_abort,false);
          }else if (!document.fullscreenchange && typeof document.fullscreenchange != 'undefined'){
            document.addEventListener('fullscreenchange',Experiment.fs_abort,false);
          }
        },
        removeListener : function(){
          document.removeEventListener('webkitfullscreenchange',Experiment.fs_abort);
          document.removeEventListener('mozfullscreenchange',Experiment.fs_abort);
          document.removeEventListener('MSFullscreenChange',Experiment.fs_abort);
          document.removeEventListener('fullscreenchange',Experiment.fs_abort);
        }
      };

      var vs = {
        on_abort : trial.on_hide_abort,
        on_fail : trial.on_hide_fail,
        check : function(){
          if(typeof document.webkitHidden != 'boolean' && typeof document.mozHidden != 'boolean' && +
          typeof document.msHidden != 'boolean' && typeof document.hidden != 'boolean'){
            return false;
          }else{
            return true;
          };
        },
        addListener : function(){
          if (document.webkitHidden != 'undefined'){
            document.addEventListener('webkitvisibilitychange',Experiment.vs_abort,false);
          }else if (typeof document.mozHidden != 'undefined'){
            document.addEventListener('mozvisibilitychange',Experiment.vs_abort,false);
          }else if (typeof document.msHidden != 'undefined'){
            document.addEventListener('msvisibilitychange',Experiment.vs_abort,false);
          }else if (typeof document.hidden != 'undefined'){
            document.addEventListener('visibilitychange',Experiment.vs_abort,false);
          }
        },
        removeListener : function(){
            document.removeEventListener('webkitvisibilitychange',jsPsych.data.getData()[0].fs_abort,false);
            document.removeEventListener('mozvisibilitychange',Experiment.vsFail,false);
            document.removeEventListener('msvisibilitychange',Experiment.vsFail,false);
            document.removeEventListener('visibilitychange',Experiment.vsFail,false);
        }
      };
      var buttonHtml = "<button id='jspsych-fullscreen-button' style='"+
        trial.buttonStyle+"'><p>" + trial.button + "</p></button>";
      display_element.append(trial.html)
      $('#content').append(buttonHtml)

      $('#jspsych-fullscreen-button').on('click',function(){
          if (trial.exit) {
            fs.removeListener()
            vs.removeListener()
            fs.exit();
          }else{
            if (fs.check()){
              fs.launch(document.documentElement);
              if (typeof trial.on_fullscreen_abort != 'undefined'){
                if (typeof trial.on_fullscreen_abort != 'function'){
                  console.error('jspsych-fullscreen response parameter is not a function.');
                }else{
                  Experiment.fs_abort = fs.getFullScreenAbort(trial.on_fullscreen_abort)
                  fs.addListener();
                }
              }
            }else{
              trial.on_launch_fail()
            }
          }
          if (trial.visibility){
            if(vs.check()){
              if (typeof trial.on_hide_fail != 'undefined'){
                if (typeof trial.on_hide_fail != 'function'){
                  console.error('jspsych-fullscreen response parameter is not a function.');
                }else{
                  Experiment.vs_abort = trial.on_visibility_abort
                  vs.addListener();
                }
              }
            }else{
              if (typeof trial.on_hide_fail != 'undefined'){
                trial.on_visibility_fail()
              }
            }
          }
          display_element.html('');
          jsPsych.finishTrial();
        });
    }

    return plugin;
})();
