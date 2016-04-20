var texts = {
  "analogues" : {
    "bacteria": {
      "statements" : [
        "Bacteria #1 emits enzyme #2.",
        "Enzyme #2 dissolves the membrane of organ #3.",
        "Organ #3 fails."
      ],
      "relations" : [
        [
          "emits",
          "expels",
          "injects"
        ],[
          "dissolves sth. of",
          "disintegrates sth. of",
          "disjoints sth. of"
        ],[
          "fails",
          "dies",
          "is eliminated"
        ]
      ]
    },
    "crusader" : {
      "statements" : [
        "Crusader group #1 bought weapon #2.",
        "Weapon #2 breaches the fortification of town #3.",
        "Town #3 is invaded."
      ],
      "relations":[
        [
          "bought",
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
    "espionage" : {
      "statements" : [
        "Country #1 trains spy #2.",
        "Spy #2 is hired by Intelligence Agency of country #3.",
        "Country #3 has its secrets stolen."
      ],
      "relations" : [[
        "trains",
        "instructs",
        "creates"
      ],[
        "is hired by sth. of",
        "is employed by sth. of",
        "is fired by sth. of"
      ],[
        "has sth. stolen",
        "has sth. poached",
        "has sth. lost"
        ]
      ]
    },
    "fox" : {
      "statements" : [
        "Fox #1 digs tunnel #2.",
        "Tunnel #2 leads to coop of chicken #3.",
        "Chicken #3 is devoured."
      ],
      "relations" : [[
        "digs",
        "burrow",
        "wants"
      ],[
        "leads to sth. of",
        "gets to sth. of",
        "goes on sth. of"
      ],[
        "is devoured",
        "is eaten",
        "is missing"
      ]]
    }
  },
  "fillers" : {
    "meteo" : {
      "statements" : [
        "Cloud #1 collects humidity over ocean #2.",
        "Ocean #2 lies next to the beaches of area #3.",
        "Area #3 is fertile."
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
    "fish" : {
      "statements" : [
        "Fisher #1 cultivates sea grass #2.",
        "Sea grass #2 is eaten by fish #3.",
        "Fish #3 is captured."
      ],
      "relations":[
        [
          "cultivates",
          "grows",
          "breeds"
        ],[
          "is eaten by",
          "is consumed by",
          "is accepted by"
        ],[
          "is captured",
          "is taken",
          "is digested"
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
          "is rarely found in",
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
    },
    "employee" : {
      "statements" : [
        "Employee #1 is assigned to project #2.",
        "Project #2 supports agenda of manager #3.",
        "Manager #3 gets a promotion."
      ],
      "relations":[
        [
          "is assigned to",
          "is referred to",
          "is arranged to"
        ],[
          "supports sth. of",
          "emphasizes sth. of",
          "destroys sth. of"
        ],[
          "gets a promotion",
          "gets an advancement",
          "gets a bonus"
        ]
      ]
    },
    "school" : {
      "statements" : [
        "School girl #1 hits boy #2.",
        "Boy #2 reports to teacher #3.",
        "Teacher #3 calls parents."
      ],
      "relations":[
        [
          "hits",
          "punches",
          "touches"
        ],[
          "reports to",
          "tells",
          "goes to"
        ],[
          "calls parents",
          "notifies parents",
          "visits parents"
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
