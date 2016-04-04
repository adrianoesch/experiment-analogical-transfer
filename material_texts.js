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
    "rebel-group" : {
      "statements" : [
        "Rebel group #1 bought weapon #2.",
        "Weapon #2 breaches the border of city #3.",
        "City #3 is invaded."
      ],
      "relations":[
        [
          "bougth",
          "acquired",
          "caught"
        ],[
          "breaches sth. of",
          "breaks sth. of",
          "passes sth. of"
        ],[
          "is invaded",
          "is intruded",
          "is infiltrated"
        ]
      ]
    },
    "hacker" : {
      "statements" : [
        "Hacker #1 wrote computer code #2.",
        "Code #2 cracks the firewall of company #3.",
        "Company #3 suffers a data loss."
      ],
      "relations":[
        [
          "wrote",
          "invented",
          "thought of"
        ],[
          "cracks sth. of",
          "penetrates sth. of",
          "catches sth. of"
        ],[
          "suffers sth.",
          "leaks sth.",
          "tolerates sth."
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
          "produces",
          "filters"
        ],[
          "dissolves sth. of",
          "eliminates sth. of",
          "resolves sth. of"
        ],[
          "becomes toxic",
          "turns inhabitable",
          "becomes eliptic"
        ]
      ]
    },
    "lawyer" : {
      "statements" : [
        "Lawyer #1 finds loophole #2.",
        "Loophole #2 bypasses contract of union #3.",
        "Union #3 loses a lawsuit."
      ],
      "relations":[
        [
          "finds",
          "detects",
          "meets"
        ],[
          "bypasses sth. of",
          "overrides sth. of",
          "bystands sth. of"
        ],[
          "loses sth.",
          "forfeits sth.",
          "files sth."
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
          "learns about",
          "finds out about",
          "starts looking"
        ],[
          "suspends sth. of",
          "disrupts sth. of",
          "inspects sth. of"
        ],[
          "gets robbed",
          "endures loss",
          "is hijacked"
        ]
      ]
    },
    "fracking" : {
      "statements" : [
        "Fracking acitivities #1 provoke earthquake #2.",
        "Earthquake #2 destabilizes concrete structure of dam #3.",
        "Dam #3 bursts."
      ],
      "relations":[
        [
          "provoke",
          "initate",
          "propagate"
        ],[
          "destabilizes",
          "decomposes",
          "shakes"
        ],[
          "bursts",
          "is flushed",
          "burns"
        ]
      ]
    }
  },
  "fillers" : {
    "meteo" : {
      "statements" : [
        "Cloud #1 collects humidity over ocean #2.",
        "Ocean #2 lies next to the beaches of area #1.",
        "Area #1 is fertile."
      ],
      "relations" : [
        [
          "collects humidity over",
          "is contained in",
          "lies in front of"
        ],[
          "lies next to",
          "is located near",
          "lies above"
        ],[
          "is fertile",
          "is humid",
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
          "becomes fond of",
          "feels loved"
        ]
      ]
    },
    "fish" : {
      "statements" : [
        "Fisher #1 cultivated sea grass #2.",
        "Sea grass #2 is eaten by fish #3.",
        "Fish #3 is captured."
      ],
      "relations":[
        [
          "cultivated",
          "grows",
          "breeds"
        ],[
          "is eaten by",
          "is consumed by",
          "is accpeted by"
        ],[
          "is captured",
          "is taken",
          "is digested"
        ]
      ]
    },
    "space" : {
      "statements" : [
        "Universe #1 casts off meteor #2.",
        "Meteor #2 hits member of galaxy #3",
        "Galaxy #3 recomposes."
      ],
      "relations" : [
        [
          "casts off",
          "introduced",
          "surrounds"
        ],[
          "hits sth. of",
          "smashes sth. of",
          "battles sth. of"
        ],[
          "restructures",
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
    "mining" : {
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
    "insect" : {
      "statements" : [
        "Perfume #1 attracts insect #2.",
        "Insect #2 attacks woman #3.",
        "Woman #3 has an allergic reaction."
      ],
      "relations":[
        [
          "attracts",
          "lures",
          "smells"
        ],[
          "attacks",
          "assaults",
          "approaches"
        ],[
          "has an allergic reaction",
          "reacts allergically",
          "has a panic reaction"
        ]
      ]
    }
  },
  "trick" : {
    "statements" : [
      "Object #1 relates to object #2."
    ],
    "relations" : [
      [
      "relates to",
      "delegates",
      "increases"
      ]
    ]
  }
};
