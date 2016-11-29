# create latex table
library(Hmisc)

analogTitles <- names(sto$analogues)
fillerTitles <- names(sto$fillers)

getLatexForTitles <-  function(titleList){
  storyStrings <- c()
  for(i in titleList){
    stories <- if(i %in% names(sto$analogues)){sto$analogues[[i]]}else
      if (i %in% names(sto$fillers)){sto$fillers[[i]]}else 
      if (i %in% names(sto$burns)){sto$burns[[i]]}
    rows = list()
    for(j in 1:3){
      f <- ifelse(j==1,capitalize(i),' ')
      rows[[j]] = paste0(f, ' & ',
        stories[['statements']][[j]],' & ',
        paste0(stories[['relations']][[j]],collapse = ' / '), ' \\')
    }
    storyStrings = c(storyStrings,paste0(rows,collapse=' '),' & & \\')
  }
  r <- paste0(storyStrings,collapse = ' ')
  r <- gsub('#1','A',r)
  r <- gsub('#2','B',r)
  r <- gsub('#3','C',r)
  return(r)
}

getLatexForTitles(names(sto$analogues))

getLatexForTitles(names(sto$fillers))

getLatexForTitles(names(sto$burns))


names = c(  "Titho",
            "Ilres",
            "Fozeh",
            "Thygef",
            "Dohod",
            "Rove",
            "Eshbu",
            "Ottha",
            "Thuha",
            "Epnux",
            "Evib",
            "Potho",
            "Ribi",
            "Kawud",
            "Avyth",
            "Wehif",
            "Uyim",
            "Saly",
            "Ohuy",
            "Ezol",
            "Eshov",
            "Lyde",
            "Huluw",
            "Gena",
            "Lenik",
            "Upum",
            "Hoyl",
            "Afi",
            "Yuxeh",
            "Thisun",
            "Ofes",
            "Matmag",
            "Vuloz",
            "Puvi",
            "Orok",
            "Pishi",
            "Thyra",
            "Diaf",
            "Hosen",
            "Upno",
            "Kewos",
            "Hoap",
            "Adjo",
            "Olag",
            "Uwit",
            "Ebib",
            "Rivo",
            "Uhuy",
            "Ihab",
            "Vivaf",
            "Felac",
            "Newi",
            "Ahow",
            "Mabi",
            "Owih",
            "Rothuk",
            "Napib",
            "Assit",
            "Eyem",
            "Roze",
            "Awiz",
            "Zimob",
            "Ifeh",
            "Zidep",
            "Wutoc",
            "Molash",
            "Ofpoz",
            "Mawi",
            "Afik",
            "Reok",
            "Yoges",
            "Uvman",
            "Vilux",
            "Lothe",
            "Inag",
            "Goxos",
            "Itbob",
            "Mewep",
            "Ewey",
            "Meuf",
            "Owmi",
            "Upel",
            "Eefar",
            "Igoth",
            "Olef",
            "Ubug",
            "Aid",
            "Hadith",
            "Enmob",
            "Wecin",
            "Turow",
            "Paza",
            "Hize",
            "Gelyp",
            "Idog",
            "Vipal",
            "Pide",
            "Gabit",
            "Zishu",
            "Henu",
            "Soav",
            "Misug",
            "Kesal",
            "Dugoz",
            "Pobat",
            "Thusoth",
            "Ohan",
            "Romap",
            "Zugew",
            "Ena",
            "Niem"
)

cat(paste0(names,collapse=paste0('\\','item ')))

paste0( names, collapse=' / ')
