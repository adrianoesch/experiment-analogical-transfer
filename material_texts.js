var texts = {
  "analogues" : {
    "bacteria": {
      "statements" : [
        "Bacteria #1 ejects enzyme #2.",
        "Enzyme #2 destroys the membrane of organ #3.",
        "Organ #3 fails."
      ],
      "relations" : [
        [
          "ejects",
          "expels",
          "injects"
        ],[
          "destroys sth. of",
          "demolishes sth. of",
          "erases sth. of"
        ],[
          "dies",
          "perishes",
          "is eliminated"
        ]
      ]
    },
    "rebel" : {
      "statements" : [
        "Rebel group #1 invents weapon #2.",
        "Weapon #2 breaches the border of country #3.",
        "Country #3 is invaded."
      ],
      "relations":[
        [
          "relation 1a",
          "relation 1b",
          "relation 1c"
        ],[
          "relation 2a",
          "relation 2b",
          "relation 2c"
        ],[
          "relation 3a",
          "relation 3b",
          "relation 3c"
        ]
      ]
    },
    "hacker" : {
      "statements" : [
        "Hacker #1 wrote computer code #2.",
        "Code #2 cracks the firewall of company #3.",
        "Company #3 suffers data loss."
      ],
      "relations":[
        [
          "relation 1a",
          "relation 1b",
          "relation 1c"
        ],[
          "relation 2a",
          "relation 2b",
          "relation 2c"
        ],[
          "relation 3a",
          "relation 3b",
          "relation 3c"
        ]
      ]
    },
    "gas" : {
      "statements" : [
        "Factory #1 emits gas #2.",
        "Gas #2 dissolves the outer layer of planet #3.",
        "Planet #3 becomes toxic."
      ],
      "relations":[
        [
          "emits",
          "relation 1b",
          "relation 1c"
        ],[
          "dissolves sth. of",
          "dissipates sth. of",
          "relation 2c"
        ],[
          "becomes toxic",
          "gets uninhabitable",
          "relation 3c"
        ]
      ]
    },
    "lawyer" : {
      "statements" : [
        "Lawyer #1 finds loophole #2.",
        "Loophole #2 bypasses contract of union #3.",
        "Union #3 looses a lawsuit."
      ],
      "relations":[
        [
          "relation 1a",
          "relation 1b",
          "relation 1c"
        ],[
          "relation 2a",
          "relation 2b",
          "relation 2c"
        ],[
          "relation 3a",
          "relation 3b",
          "relation 3c"
        ]
      ]
    },
    "robber" : {
      "statements" : [
        "Criminal #1 learns about security issue #2.",
        "Security issue #2 suspends alarm system of museum #3.",
        "Museum #3 gets robbed."
      ],
      "relations":[
        [
          "relation 1a",
          "relation 1b",
          "relation 1c"
        ],[
          "relation 2a",
          "relation 2b",
          "relation 2c"
        ],[
          "relation 3a",
          "relation 3b",
          "relation 3c"
        ]
      ]
    },
    "mining" : {
      "statements" : [
        "Mining acitivities #1 provoke earthquake #2.",
        "Earthquake #2 destabilizes concrete structure of dam #3.",
        "Dam #3 bursts."
      ],
      "relations":[
        [
          "provoke",
          "initate",
          "propagates"
        ],[
          "destabilizes",
          "shakes",
          "relation 2c"
        ],[
          "bursts",
          "disintegrates",
          "relation 3c"
        ]
      ]
    }
  },
  "fillers" : {
    "meteo" : {
      "statements" : [
        "Cloud #1 collects humidity over ocean #2.",
        "Ocean #2 lies behind the hills of area #1.",
        "Area #1 is fertile."
      ],
      "relations" : [
        [
          "lies next to",
          "is contained in",
          "lies in front of"
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
    "school" : {
      "statements" : [
        "Boy #1 goes to school #2.",
        "Girl #3 writes a letter to boy #1.",
        "Boy #1 falls in love.",
      ],
      "relations" : [
        [
          "goes to",
          "is enrolled at",
          "enjoys"
        ],[
          "writes sth. to",
          "sends sth. to",
          "influences"
        ],[
          "falls in love",
          "relation 3b",
          "borrows sth. from"
        ]
      ]
    },
    "fish" : {
      "statements" : [
        "Fisher #1 cultivates sea grass #2.",
        "Sea grass #2 is regularly eaten by fish #3.",
        "Fish #3 get caught."
      ],
      "relations":[
        [
          "relation 1a",
          "relation 1b",
          "relation 1c"
        ],[
          "relation 2a",
          "relation 2b",
          "relation 2c"
        ],[
          "relation 3a",
          "relation 3b",
          "relation 3c"
        ]
      ]
    },
    "space" : {
      "statements" : [
        "Meteor #1 enteres galaxy #2.",
        "Meteor #1 hits planet #3",
        "Planet #3 switches orbit."
      ],
      "relations" : [
        [
          "enteres",
          "introduced",
          "surrounds"
        ],[
          "hits",
          "smashes",
          "battles"
        ],[
          "switches",
          "changes",
          "steps"
        ]
      ]
    },
    "farm" : {
      "statements" : [
        "Farmer #1 bought machine #2.",
        "Machine #2 can collect fruit of plant #3.",
        "Plant #3 are harvested automatically."
      ],
      "relations" : [
        [
          "bought",
          "purchased",
          "borrowed"
        ],[
          "can collect",
          "garners",
          "can compose"
        ],[
          "are harvested automatically",
          "are reaped mechanically",
          "are picked manually"
        ]
      ]
    },
    "ngo" : {
      "statements" : [
        "Mining company #1 has a lot of resource #2.",
        "Resource #2 is sparse in country #3.",
        "Country #3 starts negotiating."
      ],
      "relations" : [
        [
          "has a lot of",
          "is filled with",
          "fills in for"
        ],[
          "is sparse in",
          "is rarerly found in",
          "is sparked through"
        ],[
          "starts negotiating",
          "starts brokering",
          "starts trading"
        ]
      ]
    },
    "story" : {
      "statements" : [
        "Mining company #1 has a lot of resource #2.",
        "Resource #2 is sparse in country #3.",
        "Country #3 starts negotiating."
      ],
      "relations":[
        [
          "relation 1a",
          "relation 1b",
          "relation 1c"
        ],[
          "relation 2a",
          "relation 2b",
          "relation 2c"
        ],[
          "relation 3a",
          "relation 3b",
          "relation 3c"
        ]
      ]
    }
  },
  "trick" : {
    "statements" : [
      "Object #1 relates to object #2."
    ],
    "relations" : [
      "relates to",
      "delegates",
      "increases"
    ]
  }
};
