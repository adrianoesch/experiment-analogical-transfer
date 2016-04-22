var instructions = {
  welcome :   '<h2>Welcome</h2><p>To run this experiment we need launch into fullscreen mode. \
              Following actions will terminate \
              the experiment:<ul><li>exiting fullscreen mode</li><li>switching tabs or applications</li>\
              <li>reloading the webpage</li><li>going-"back" in the browser</li></ul>\
              <p>Please close all other running applications and turn off all notifications before entering \
              the experiment. Ensure you are in a calm place without any distractions.</p>\
              <p>Click "Enter" to launch into fullscreen and start the experiment.</p>',

  consent :   '<h2>Consent</h2><p>In this experiment you will be asked to read very short stories \
              and recall the content after each story. The experiment will \
              take about 10 to 15 minutes. The data will be recorded anonymously. Your participation \
              is of course voluntary, and you can quit the experiment at any time without giving any \
              reasons. However, you will receive payment only if you complete the experiment.</p>\
              <p>By pressing the right arrow key you agree to those terms and continue the experiment.</p>',

  task :      '<h2>Instructions</h2><p>Thank you very much for taking part in our experiment!</p>\
              <p>Your task will be to read\
              a few short stories and recall the content after each story. Each story consists of three statements and \
              at first those three statements will be presented statement by statement. Please read each statement thoroughly but don\'t \
              waste too much time. \
              You can continue to the next statement with \
              pressing the right arrow key.</p>\
              <p>After each story you will be asked to recall the content, again statement \
              by statement and in order of appearance by reconstructing the names of the entities plus their relation. \
              You will be able to choose the names and relations from two separate menus (one for names and one for relations).\
              You can select the names and relations with drag & drop\
              (click on an item with the mouse & drag it into a corresponding container).\
              You can correct your response by dragging objects back and forth within their corresponding containers\
              until you click "Next". All response boxes must contain an item. \
              Means to facilitate this task are not allowed.</p>\
              <h3>Example</h3><p>Let\'s say you have read the phrase "The child Driho smashed the mug Gapsi" as the first statement of a story. \
              You will then see a screen like below where you are asked to recall the content of the first statement. \
              By dragging the name "Driho" into the first name box, the \
              relation "smashed" into the relation field the and the name "Krati" into the second name container, \
              you arrive at the correct solution.</p>\
              <p>If you changed your mind, just drag the item back into the menu container and choose \
              another item. This example is draggable, try it out.</p>\
              <style>#content{width:800px;position:relative;}#menu{ border:solid 1px black;height:370px;}.menui{  width:150px;  height:280px; border:1px solid white;}.wrapMenu{  padding:0 50px;  float:left;}#menubox{margin:20px 0px 0px 130px;}#names, #name1, #name2{  background-color:rgb(230,230,230);}#relations, #relation{  background-color:rgb(200,200,200);}#names,#relations {  padding:10px;}#input{ width:800px; position:relative;  top:30px;  float:left;} .inputi{  width:190px;  padding:10px;  height:30px;border:1px solid white;}#inputbox{  font-size:16px;  position:relative;  border:1px solid black;  height:120px; padding:00px 50px; margin-bottom:130px}.wrapInput{  float:left;  margin:20px 10px;}.relationDivs,.nameDivs{  font-size:13px;  font-family:arial;  height:20px;  border-radius: 3px;  margin:3px;  padding:0px 0px 5px 5px;}.nameDivs{  background-color: rgba(0,0,0,0.2);}.relationDivs {  background-color: rgba(0,0,0,0.2);}#nextbutton{  position:relative;  margin-top:30px;  float:right;  padding:10px;  border-radius: 5px;  width:80px;  text-align:center;  background-color: rgba(0,0,0,0.7);  color:rgb(230,230,230)}#nextbutton:hover{  background-color: rgb(255,20,20);  color: black;}#errormessage{  color:rgb(250,50,50);  text-align:center; font-size:15px;}</style>\
              <div id="content" style="top: 50px;">Menu:  <div id="menu">    <div id="menubox">      <div class="wrapMenu">Names:        <div id="names" class="menui">          <div class="nameDivs" id="name_0" draggable="true">Helia</div>          <div class="nameDivs" id="name_1" draggable="true">Driho</div>          <div class="nameDivs" id="name_2" draggable="true">Istrof</div>          <div class="nameDivs" id="name_3" draggable="true">Gapsi</div>          <div class="nameDivs" id="name_4" draggable="true">Sotah</div>          <div class="nameDivs" id="name_5" draggable="true">Filzey</div>        </div>      </div>      <div class="wrapMenu">Relations:        <div id="relations" class="menui">          <div class="relationDivs" id="relation_0" draggable="true">crashed</div>          <div class="relationDivs" id="relation_1" draggable="true">enlarged</div>          <div class="relationDivs" id="relation_2" draggable="true">damaged</div>          <div class="relationDivs" id="relation_3" draggable="true">derailes</div>          <div class="relationDivs" id="relation_4" draggable="true">smashed</div>          <div class="relationDivs" id="relation_5" draggable="true">shouts</div>        </div>      </div>    </div>  </div>  <div id="input">Response: <strong>Statement <span id="statementNr">1</span></strong> <span id="errormessage"></span>    <div id="inputbox">      <div class="wrapInput">Name:        <div id="name1" class="inputi"></div>      </div>      <div class="wrapInput">Relation:        <div id="relation" class="inputi"></div>      </div>      <div class="wrapInput">Name:        <div id="name2" class="inputi"></div>      </div>    </div>  </div></div>\
              <script>Experiment.d.init()</script>\
              <p style="">When you are done with arranging objects, there will be a "Next" button to continue to either \
              the subsequent statement to recall or next story to read.</p>\
              <p style="margin-bottom:50px;">Press the right arrow key to continue to the experiment.</p>\
              ',

  reminder : '<h4><p>We will now start with presenting statements, so prepare yourself.</p>\
              <p>Press the right arrow key to continue and the left arrow key to go back to the instructions \
              with the example.</p></h4>',

  sincerity : '<p>Finally, we ask you to tell us honestly whether you did the experiment seriously, \
              giving it your full attention. You will receive your regular payment independent of how you respond. \
              This question serves internal data anlysis assessment.</p>\
              <p>Have you done the experiment seriously? <select id="sincerity">\
              <option value=""></option>\
              <option value="yes">Yes, my data should be used</option>\
              <option value="no">No, my data should not be used</option></select></p>',

  effort :    '<p>How much effort did you put in the task? <select type="text" id="effort">\
              <option value=""></option>\
              <option value="0">0 - none</option>\
              <option value="1">1 - little bit</option>\
              <option value="2">2 - quite some</option>\
              <option value="3">3 - a lot</option></select></p>',

  language : '<p>What is your native language? <select type="text" id="language">\
              <option value=""></option>\
              <option value="en">English</option>\
              <option value="es">Spanish</option>\
              <option value="de">German</option>\
              <option value="ot">Other</option></select></p>',

  age :       '<p>How old are you? <select type="text" id="age">'+age_options+'</select></p>',
  gender :    '<p>Gender: <select id="gender"><option value=""></option>\
              <option value="female">Female</option><option value="male">Male</otion>\
              <option value="other">Others</option></select></p>',

  qualification : '<p>Highest educational qualification: <select id="quali">\
              <option value=""></option>\
              <option value="no highschool">No high school degree</option>\
              <option value="highschool">High school degree</option>\
              <option value="university">University degree</option>\
              <option value="doctoral">Doctoral degree</option></select></p>',

  end_fullscreen : '<h2>First part done!</h2><p>You can leave fullscreen mode by clicking "Exit".\
                    Next, we would like to know a few more things about your experience during the previous task and \
                    yourself.</p>',

  confirmation : '<h2>Thank you for participating in our experiment.</h2><p>The goal of this experiment was \
                 to investigate whether repeating causal structures in analog stories eases the recall of information. Please do \
                 not share this information with anyone! It is crucial that the explanation is kept confidential until we \
                 have collected all data.</p><p>Here is your code to confirm your participation: <span style="font-weight:bold;" id="conf_code"></span></p>\
                 <p>Make sure to copy and paste this code back to Crowdflower (use right-click>copy in Safari). When you \
                 are done with it, you can close this browser window or tab. Thanks again!</p>',

  similarityClosed : '<p>Did you notice similarities between the stories during the experiment (not now)?<br> \
                      <select id="similarityClosed">\
                      <option value=""></option>\
                      <option value="yes">Yes</option>\
                      <option value="no">No</option>\
                      </select></p>',

  similarityOpen : '<p class="optionalTextarea" style="display:none;">If so, what were the similarities?<br>\
                    <textarea id="similarityOpen" rows="4" cols="100"></textarea></p>',

  repetitionClosed : '<p>Did you notice repeating elements between the stories during the experiment (not now)?<br>\
                      <select id="repetitionClosed">\
                      <option value=""></option>\
                      <option value="yes">Yes</option>\
                      <option value="no">No</option>\
                      </select></p>',

  repetitionOpen : '<p class="optionalTextarea" style="display:none;">If so, which elements were repeating and in which stories did you detect those?<br>\
                    <textarea id="repetitionOpen" rows="4" cols="100"></textarea></p>',

  analogyClosed : '<p>Did you notice the repeating analog/causal structure in every second story during the experiment (not now)? \
                      <select id="analogyClosed">\
                      <option value=""></option>\
                      <option value="yes">Yes</option>\
                      <option value="no">No</option>\
                      </select></p>',

  analogyOpen : '<p class="optionalTextarea" style="display:none;">If so, can you remember which stories had repeating/analog structure? <br>Please describe the ones you remember briefly.<br>\
                    <textarea id="analogyOpen" rows="4" cols="100"></textarea></p>'

};
