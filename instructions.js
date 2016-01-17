var instructions = {
  welcome :   '<h2>Welcome</h2><p>To run this experiment we need launch into fullscreen mode. \
              Following actions will terminate \
              the experiment:<ul><li>exiting fullscreen mode</li><li>switching tabs or applications</li>\
              <li>reloading the webpage</li><li>going-"back" in the browser</li></ul>\
              <p>Please close all other running applications and turn off all notifications before entering \
              the experiment. Ensure you are in a calm place without any distractions, for example, noise.<p>\
              <p>Click "Enter" to launch into fullscreen and start the experiment.',

  consent :   '<h2>Consent</h2><p>In this experiment you will be asked to briefly remember very short stories \
              and then recall the statements after each story. The experiment will \
              take about 10 to 15 minutes. The data will be recorded anonymously. Your participation \
              is of course voluntary, and you can quit the experiment at any time without giving any \
              reasons. However, you will receive payment only if you complete the experiment.</p>\
              <p>By pressing the right arrow you agree to those terms and continue the experiment.</p>',

  task :      '<h2>Instructions</h2><p>Thank you very much for taking part in our experiment! \
              The experiment will take about 10 to 15 minutes.',

  sincerity : '<p>Finally, we ask you to tell us honestly whether you did the experiment seriously, \
              giving it your full attention. You will receive your payment independent of how you respon. \
              This question serves only internal data anlysis assessment.</p>\
              <p>Have you done the experiment seriously? <select id="sincerity">\
              <option val=""></option>\
              <option val="yes">Yes, my data should be used</option>\
              <option val="no">No, my data should not be used</option></select></p>',

  age :       '<p>How old are you? <select type="text" id="age">'+age_options+'</select></p>',
  gender :    '<p>Gender: <select id="gender"><option value=""></option>\
              <option value="female">Female</option><option value="male">Male</otion>\
              <option value="other">Others</option></select></p>',

  qualification : '<p>Highest educational qualification: <select id="quali">\
              <option val=""></option>\
              <option val="no highschool">No high school degree</option>\
              <option val="highschool">High school degree</option>\
              <option val="university">University degree</option>\
              <option val="doctoral">Doctoral degree</option></select></p>',

  end_fullscreen : "<h2>This was it!</h2> <p>Please save your data and continue to the debriefing and confirmation code\
                   by clicking 'Save & Exit'.</p>",

  debriefing : '<p><h2>Thank you again for participating in our experiment.</h2></p><p> The goal of this experiment was \
             to investigate whether that share causal structure are stored and access better througth structure repetitoin\
             than stories with no repeating causal structure.</p><p>Please do not share \
             this information with anyone! It is crucial the explanation is kept confidential until we \
             have collected all data.</p><p>Here is your code to confirm your participation: 34#!2sS6zs6Q</p>\
             <p>The experiment is over. After copying the confirmation code, \
             you can close this browser window or tab .</p>'
};
