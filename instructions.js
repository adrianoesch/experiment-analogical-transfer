var instructions = {
  welcome :   '<h2>Welcome</h2><p>To run this experiment we need launch into fullscreen mode. \
              Following actions will terminate \
              the experiment:<ul><li>exiting fullscreen mode</li><li>switching tabs or applications</li>\
              <li>reloading the webpage</li><li>going-"back" in the browser</li></ul>\
              <p>Please close all other running applications and turn off all notifications before entering \
              the experiment. Ensure you are in a calm place without any distractions, for example, noise.<p>\
              <p>Click "Enter" to launch into fullscreen and start the experiment.',

  consent :   '<h2>Consent</h2><p>In this experiment you will be asked to read very short stories \
              and recall the content after each story. The experiment will \
              take about 10 to 15 minutes. The data will be recorded anonymously. Your participation \
              is of course voluntary, and you can quit the experiment at any time without giving any \
              reasons. However, you will receive payment only if you complete the experiment.</p>\
              <p>By pressing the right arrow you agree to those terms and continue the experiment.</p>',

  task :      '<h2>Instructions</h2><p>Thank you very much for taking part in our experiment! \
              The experiment will take about 10 to 15 minutes.</p><p>Your task will be to read\
              a few short stories and recall the content after each story. At first the stories \
              will be presented statement by statement. You can continue to the next statement with \
              the right arrow button.</p><p>At the time of recall we ask you to recall the story again statement \
              by statement in order of appearance. You will be able to choose the names of the entities plus the \
              relations between those entities from two separate menus (one for names and one for relations).\
              You can choose names and relations with drag and drop \
              (click on an item with the mouse & drag it into a corresponding container).\
              You can correct your response by draging objects back and forth within their corresponding containers\
              until you click "Next". All input boxes must contain an object.</p>\
              <h3>Example</h3><p>Let\'s say you have read the statement "The child Driho crashed the mug Gapsi". \
              You will then see a screen like below. By draging the name "Driho" into the first name box, the \
              relation "crashed" into the relation field the and the name "Krati" into the second name container.</p>\
              <p>If you changed your mind or made an error, just drag the item back into the names container and choose \
              another item. This example is dragable.</p>\
              <style>#content{width:800px;position:relative;}#menu{ border:solid 1px black;height:370px;}.menui{  width:150px;  height:280px; border:1px solid white;}.wrapMenu{  padding:0 50px;  float:left;}#menubox{margin:20px 0px 0px 130px;}#names, #name1, #name2{  background-color:rgb(230,230,230);}#relations, #relation{  background-color:rgb(200,200,200);}#names,#relations {  padding:10px;}#input{ width:800px; position:relative;  top:30px;  float:left;} .inputi{  width:190px;  padding:10px;  height:30px;border:1px solid white;}#inputbox{  font-size:16px;  position:relative;  border:1px solid black;  height:120px; padding:00px 50px; margin-bottom:130px}.wrapInput{  float:left;  margin:20px 10px;}.relationDivs,.nameDivs{  font-size:13px;  font-family:arial;  height:20px;  border-radius: 3px;  margin:3px;  padding:0px 0px 5px 5px;}.nameDivs{  background-color: rgba(0,0,0,0.2);}.relationDivs {  background-color: rgba(0,0,0,0.2);}#nextbutton{  position:relative;  margin-top:30px;  float:right;  padding:10px;  border-radius: 5px;  width:80px;  text-align:center;  background-color: rgba(0,0,0,0.7);  color:rgb(230,230,230)}#nextbutton:hover{  background-color: rgb(255,20,20);  color: black;}#errormessage{  color:rgb(250,50,50);  text-align:center; font-size:15px;}</style>\
              <div id="content" style="top: 50px;">Menu:<div id="menu"><div id="menubox"><div class="wrapMenu">Names:<div id="names" class="menui"><div class="nameDivs" id="name_0" draggable="true">Hoap</div><div class="nameDivs" id="name_1" draggable="true">Hosen</div><div class="nameDivs" id="name_2" draggable="true">Ofes</div><div class="nameDivs" id="name_3" draggable="true">Huluw</div><div class="nameDivs" id="name_4" draggable="true">Lyde</div><div class="nameDivs" id="name_5" draggable="true">Fozeh</div></div></div>      <div class="wrapMenu">Relations:<div id="relations" class="menui"><div class="relationDivs" id="relation_0" draggable="true">creates</div><div class="relationDivs" id="relation_1" draggable="true">suffers</div><div class="relationDivs" id="relation_2" draggable="true">bursts</div><div class="relationDivs" id="relation_3" draggable="true">sustains</div><div class="relationDivs" id="relation_4" draggable="true">cracks</div><div class="relationDivs" id="relation_5" draggable="true">writes</div></div></div>  </div>  </div>  <div id="input">Response: <strong>Statement <span id="statementNr">1</span></strong> <span id="errormessage"></span>    <div id="inputbox">      <div class="wrapInput">Name:<div id="name1" class="inputi"></div></div><div class="wrapInput">Relation:<div id="relation" class="inputi"></div></div>  <div class="wrapInput">Name:<div id="name2" class="inputi"></div></div></div></div></div>\
              <script>Experiment.d.init()</script>\
              <p style="">When you are done with arranging objects, there will be a "Next" button to continue to the subsequent statement or story. \
              New statements will appear thereafter.</p>\
              <p style="margin-bottom:50px;">Press the right arrow key to continue to the experiment.</p>\
              ',

  reminder : '<h4><p>Press the right arrow key to start the experiment. We will start with presenting statements \
              right away, so prepare yourself.</p><p>Press the left arrow key to go back to the instructions \
              and the example.</p></h4>\
              ',

  sincerity : '<p>Finally, we ask you to tell us honestly whether you did the experiment seriously, \
              giving it your full attention. You will receive your payment independent of how you respond. \
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
                   by <br>clicking 'Save & Exit'.</p>",

  debriefing : '<h2>Thank you again for participating in our experiment.</h2><p>The goal of this experiment was \
             to investigate whether repeated causal structures stories eases the recall of information. Please do \
             not share this information with anyone! It is crucial that the explanation is kept confidential until we \
             have collected all data.</p><p>Here is your code to confirm your participation: 34#!2sS6zs6Q</p>\
             <p>After copying the confirmation code, you can close this browser window or tab.</p>'
};
