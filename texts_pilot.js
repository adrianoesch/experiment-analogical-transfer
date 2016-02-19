var texts = {
  "stories" : [
    {
      "title" : "bacteria",
      "statements" : [
        "Signal #1 triggers a reaction in bacteria #2.",
        "Bacteria #2 ejects enzyme #3.",
        "Enzyme #3 destroys cellwall of body cell #4.",
        "Body cell #5 dies."
      ],
      "nNamesPerStatement" : [2,2,2,1],
      "nNames" : 5,
      "relations" : [
        [
          "triggers sth. in",
          "provokes sth. in",
          "carries sth. in"
        ],[
          "ejects",
          "expels",
          "injects"
        ],[
          "destroys sth. of",
          "demolishes sth. of",
          "ereases sth. of"
        ],[
          "dies",
          "perishes",
          "is eliminated"
        ]
      ]
    },
    {
      "title" : "meteo",
      "nNamesPerStatement" : [2,2,2,1],
      "nNames" : 4,
      "statements" : [
        "Area #1 lies next to ocean #2.",
        "Wind #3 is moving cloud #4.",
        "Cloud #4 makes it rain over area #1.",
        "Area #1 is fertile."
      ],
      "relations" : [
        [
          "lies next to",
          "is contained in",
          "lies in front of"
        ],[
          "is moving",
          "is blowing",
          "is showing"
        ],[
          "makes it rain over",
          "brings humidity to",
          "drys out over"
        ],[
          "is humid",
          "is fertile",
          "is rich"
        ]
      ]
    },
    {
      "title" : "fish",
      "nNamesPerStatement" : [2,2,2,1],
      "nNames" : 5,
      "statements" : [
        "Fish #1 eat sea grass #2.",
        "Sea grass #3 grows in zone #4.",
        "Fisher #5 tries his luck in zone #4.",
        "Fisher #5 is successful."
      ],
      "relations" : [
        [
          "eat",
          "digest",
          "love"
        ],[
          "grows in",
          "propagates in",
          "floats in"
        ],[
          "tries his luck in",
          "attempts his fortune in",
          "looks in"
        ],[
          "is successful",
          "triumphs",
          "can be proud"
        ]
      ]
    },
    {
      "title" : "minority",
      "nNamesPerStatement" : [2,2,2,1],
      "nNames" : 3,
      "statements" : [
        "Country #1 shares ethnicity with minority #2.",
        "Country #1 supports minority #2.",
        "Minority #2 is supressed in country #3.",
        "Minority #2 starts to fight."
      ],
      "relations" : [
        [
          "shares sth. with",
          "is culturally similar to",
          "comes along with"
        ],[
          "supports",
          "delivers weapons to",
          "goes along with"
        ],[
          "is suppressed in",
          "is ruled in",
          "is majority in"
        ],[
          "starts to fight",
          "battles",
          "starts to uprise"
        ]
      ]
    },
    {
      "title" : "company",
      "nNamesPerStatement" : [2,2,2,1],
      "nNames" : 4,
      "statements" : [
        "Company #1 introduces product #2.",
        "Product #2 violates patent #4",
        "Company #3 posses patent #4.",
        "Company #3 takes legal action."
      ],
      "relations" : [
        [
          "introduces",
          "welcomes",
          "perils"
        ],
        [
          "violates",
          "ignores",
          "infringes"
        ],
        [
          "posses",
          "inherits",
          "owns"
        ],
        [
          "takes legal action",
          "brings charges",
          "brings a lawyer"
        ]
      ]
    },
    {
      "title" : "school",
      "nNamesPerStatement" : [2,2,2,2],
      "nNames" : 4,
      "statements" : [
        "Boy #1 goes to school #2.",
        "Girl #3 writes a letter for boy #1.",
        "Girl #4 is a friend of girl #3.",
        "Girl #4 brings the letter to boy #1."
      ],
      "relations" : [
        [
          "goes to",
          "is enrolled at",
          "enjoys"
        ],[
          "writes sth. for",
          "sends sth. to",
          "influences"
        ],[
          "is a friend of",
          "is a follower of",
          "knows"
        ],[
          "brings sth. to",
          "transports sth. to",
          "borrows sth. from"
        ]
      ]
    },
    {
      "title" : "ngo",
      "nNamesPerStatement" : [2,2,2,1],
      "nNames" : 3,
      "statements" : [
        "Country #1 needs resource #2.",
        "Resource #2 is sparse in country #1.",
        "Country #3 has a lot of resource #2.",
        "Country #2 starts negotiating."
      ],
      "relations" : [
        [
          "needs",
          "requires",
          "looks for"
        ],[
          "is sparse in",
          "is rarerly found in",
          "is sparked through"
        ],[
          "has a lot of",
          "is filled with",
          "fills in for"
        ],[
          "starts negotiating",
          "starts brokering",
          "starts trading"
        ]
      ]
    },
    {
      "title" : "farm",
      "nNamesPerStatement" : [2,2,2,1],
      "nNames" : 4,
      "statements" : [
        "Farmer #1 uses machine #2.",
        "Machine #2 can cut plant #3.",
        "Farmer #4 breaks machine #2.",
        "Plant #3 can not be harvested."
      ],
      "relations" : [
        [
          "uses",
          "applies",
          "needs"
        ],[
          "can cut",
          "chops",
          "can plow"
        ],[
          "breaks",
          "damages",
          "borrows"
        ],[
          "can not be harvested",
          "can not be captured",
          "can not move"
        ]
      ]
    },
    {
      "title" : "space",
      "nNamesPerStatement" : [2,2,2,1],
      "nNames" : 4,
      "statements" : [
        "Moon #1 circles planet #2.",
        "Meteor #3 hits planet #2",
        "Planet #2 switches to orbit #4.",
        "Moon #1 looses attraction."
      ],
      "relations" : [
        [
          "circles",
          "revolves",
          "surrounds"
        ],[
          "hits",
          "smashes",
          "battles"
        ],[
          "switches to",
          "changes to",
          "steps into"
        ],[
          "looses attraction",
          "decreases force",
          "is less enhanced"
        ]
      ]
    }
  ],
  "names" : ["Titho","Ilres","Fozeh","Thygef","Dohod","Rove","Eshbu","Ottha","Thuha","Epnux","Evib","Potho","Ribi","Kawud","Avyth","Wehif","Uyim","Saly","Ohuy","Ezol","Eshov","Lyde","Huluw","Gena","Lenik","Upum","Hoyl","Afi","Yuxeh","Thisun","Ofes","Atmag","Vuloz","Puvi","Orok","Pishi","Thyra","Afid","Hosen","Upno","Kewos","Hoap","Ada","Olag","Uwit","Ebib","Irov","Uhuy","Ihab","Vivaf","Felac","Enwi","Ahow","Mabi","Owih","Rothuk","Napib","Ivan","Assit","Eyem","Roze","Awiz","Zimob","Ifeh","Izdep","Wutoc","Molash","Ofpoz","Mawi","Afik","Erok","Yoges","Uvman","Vilux","Lothe","Inag","Goxos","Itbob","Mewep","Ewey","Meuf","Owmi","Upel","Eefar","Igoth","Olef","Ubug","Aid","Hadith","Enmob","Wecin","Turow","Paza","Hize","Gelyp","Idog","Vipal","Pide","Gabit"]
};
