var texts = {
  names : ['Titho','Ilres','Fozeh','Thygef','Dohod','Rove','Eshbu','Ottha','Thuha','Epnux','Evib','Potho','Ribi','Kawud','Avyth','Wehif','Uyim','Saly','Ohuy','Ezol','Eshov','Lyde','Huluw','Gena','Lenik','Upum','Hoyl','Afi','Yuxeh','Thisun','Ofes','Atmag','Vuloz','Puvi','Orok','Pishi','Thyra','Afid','Hosen','Upno','Kewos','Hoap','Ada','Olag','Uwit','Ebib','Irov','Uhuy','Ihab','Vivaf','Felac','Enwi','Ahow','Mabi','Owih','Rothuk','Napib','Ivan','Assit','Eyem','Roze','Awiz','Zimob','Ifeh','Izdep','Wutoc','Molash','Ofpoz','Mawi','Afik','Erok','Yoges','Uvman','Vilux','Lothe','Inag','Goxos','Itbob','Mewep','Ewey','Meuf','Owmi','Upel','Eefar','Igoth','Olef','Ubug','Aid','Hadith','Enmob','Wecin','Turow','Paza','Hize','Gelyp','Idog','Vipal','Pide','Gabit'],
  stories : {
    similar : [
      {
        title : 'bacteria',
        statements : [
          'Bacteria #1 ejects enzyme #2.',
          'Enzyme #2 destroys cellwall of body cell #3.',
          'Bodycell #3 dies.'
        ],
        nNamesPerStatement : [2,2,1],
        relations : [
          'ejects',
          'expels',
          'distroys',
          'demolishes',
          'dies',
          'perishes'
        ],
      },{
        title : 'countries',
        nNamesPerStatement : [2,2,1],
        statements : [
          'Country #1 invents weapon #2.',
          'With weapon #2, the border of country #3 can be breached.',
          'Country #3 is invaded.'
        ],
        relations : [
          'breaches',
          'hurts',
          'is invades',
          'is loosing',
          'invents',
          'introduces'
        ]
      },
      {
        title : 'countries',
        nNamesPerStatement : [2,2,1],
        statements : [
          'Person #1 writes computer code #2.',
          'Code #2 can crack into servers of company #3.',
          'The company #3 suffers a huge data loss.'
        ],
        relations : [
          'writes',
          'creates',
          'cracks',
          'bursts',
          'suffers',
          'sustains'
        ]
      }
    ],
    nonsimilar : [
      {
        title : 'fishermen',
        nNamesPerStatement : [2,2,1],
        statements : [
          'Fisher #1 caught a fish #2.',
          'Fish #2 eat a lot of sea grass #3.',
          'Sea grass #3 grows at high depths.'
        ],
        relations : [
          'caught',
          'took out',
          'eats',
          'digests',
          'grows',
          'spreads'
        ]
      },{
        title : 'forest',
        nNamesPerStatement : [2,2,1],
        statements : [
          'Pig #1 loves to drink Liquid #2.',
          'Liquid #2 contains a lot of vitamin #3.',
          'Vitamin #3 is widespread.'
        ],
        relations : [
          'loves',
          'adores',
          'contains',
          'inherits',
          'is widespread',
          'is popular'
        ]
      },{
        title : 'clouds',
        nNamesPerStatement : [2,2,1],
        statements : [
          'Cloud #1 frequently appears in area #2.',
          'Area #2 is part of the realm of #3.',
          'In the realm of #3 is very humid.'
        ],
        relations : [
          'appears in ',
          'occurs in',
          'is part of',
          'is contained in',
          'is humid',
          'rains a lot'
        ]
      }
    ]
  }
};
