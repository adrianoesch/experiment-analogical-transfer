/**
 * html-input-ao
 * adrian oesch
 *
 * plugin for displaying html and save all input fields to data.
 * add list of html strings if input elements etc
 * add inputIDs of requested elements to store from html string
 *
 **/

 jsPsych.plugins["html-input-ao"] = (function() {

   var plugin = {};

   plugin.trial = function(display_element, trial) {

			trial.cont_key = trial.cont_key || "Button";
      trial.check = trial.check || function(){return true;};

			// function to end trial when it is time
			var checkInput = function() {
				trial_data = getInput()
				if(trial.check(trial_data)){
					endTrial(trial_data)
				}else{
					trial.error.call()
				}
			};

			var endTrial = function(){
				display_element.html('');
				jsPsych.finishTrial(trial_data);
			}


			var getInput = function() {
				var t1 = Date.now()-t0
				var trial_data = {"rt": t1};
				var inputs = trial.inputIDs
				for (i=0;i<inputs.length;i++){
					trial_data[inputs[i]] = $('#'+inputs[i]).val()
				}
				return trial_data
			};

			display_element.append(trial.html);
			var t0 = Date.now()
			$(':button').on('click',function(){
				checkInput()
			});


		};

		return plugin;
})();
