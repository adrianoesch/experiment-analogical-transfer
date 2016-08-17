# settings ####
wd <- '~/Dropbox/master/'
dataFolder <- 'data/raw/'
cfFolder <- 'data/cf/'
storiesFile <- 'online/material_texts.js'
funFile <- 'code/fun.r'
apiKey <- 'DRywZzHELpEvBG829fD2'
csvFolder <- paste0(wd,dataFolder)
cfFolder <- paste0(wd,cfFolder)
storiesPath <- paste0(wd,storiesFile)
figuresPath <- 'tex/thesis II/figures/'
tablesPath <- 'tex/thesis II/tables/'

# load data & libs ####
setwd(wd)
library(rjson)
library(plyr)
library(gridExtra)
library(ggplot2)
library(lme4)
library(multcomp)
library(rstan)
library(reshape2)
library(shinystan)
library(rstanarm)
options(mc.cores = parallel::detectCores())
source(funFile)

#### experiment 1 ####

tr <- read.csv('data/tr_160523.csv')
t <- read.csv('data/t_160523.csv')
s <- read.csv('data/s_160523.csv')

x<-aggregate(value~sessionCode,tr,mean)
rownames(x)<-as.character(x$sessionCode)
rownmaes(s)<-s$sessionCode
s$overall_cor <- x$value[s$sessionCode]

# general task performance ####
# qualification distribution
s$qualification <- factor(s$quali,ordered=T,levels=c('doctoral','university','highschool'))
ggplot(s,aes(qualification))+geom_bar()+theme_bw()+labs(x="Qualification",y='Frequency')
ggsave(paste0(figuresPath,'sample_quali.png'),width=10,height=10,units='cm')

# age distribution
ggplot(s,aes(age))+geom_histogram(binwidth=10)+theme_bw()+labs(x='Age',y='Frequency')+
  scale_x_continuous(breaks=seq(20,70,10),labels=paste0(seq(20,70,10),'-',seq(29,69,10)))
ggsave(paste0(figuresPath,'sample_age.png'),width=10,height=10,units='cm')

# per subject avg overall correct distribution
ggplot(s,aes(overall_cor))+geom_histogram(binwidth=.05)+
  geom_vline(xintercept=median(s$overall_cor))+theme_bw()+
  labs(x='Recall Accuracy',y='Frequency')
savePlot('genper_overall.png')

# per subject avg overall and time reading median
ggplot(s,aes(x=timeReadingMedian,y=overall_cor))+geom_point(size=3)+
  geom_smooth(method='lm',se=FALSE,colour='black')+theme_bw()+
  labs(x='Time Reading',y='Recall Accuracy')
savePlot('genper_timeXoverall.png')

cor.test(s$overall_cor,s$timeReadingMedian)

# per subject avg overall and effort
x <- aggregate(overall_cor~effort,s,mean)
sds <- aggregate(overall_cor~effort,s,sd)[2]
les <- aggregate(overall_cor~effort,s,length)[2]
x$ses <- unlist(sds/sqrt(les))
ggplot(x,aes(x=as.factor(effort),y=overall_cor))+geom_point(size=3)+theme_bw()+
  geom_errorbar(aes(ymax=overall_cor+ses,ymin=overall_cor-ses))+
  labs(x='Effort',y='Recall Accuracy')
savePlot('genper_effortXoverall.png')

summary(aov(overall_cor~effort,s))

# per subject timeReading and effort
x <- aggregate(timeReadingMedian~effort,s,mean)
sds <- aggregate(timeReadingMedian~effort,s,sd)[2]
les <- aggregate(timeReadingMedian~effort,s,length)[2]
x$ses <- unlist(sds/sqrt(les))
ggplot(x,aes(x=as.factor(effort),y=timeReadingMedian))+geom_point(size=3)+theme_bw()+
  geom_errorbar(aes(ymax=timeReadingMedian+ses,ymin=timeReadingMedian-ses))+
  labs(x='Effort',y='Median Reading Time')
savePlot('genper_effortXtime.png')

summary(aov(timeReadingMedian~effort,s))

# material assessment
# per story recall accuracy on item level
x <- aggregate(value~title,tr,mean)
sds <- aggregate(value~title,tr,sd)[2]
les <- aggregate(value~title,tr,length)[2]
x$ses <- unlist(sds/sqrt(les))
x$condition <- factor(conditionMap[x$title],ordered=T,levels=c('analog','filler'))

ggplot(x,aes(y=value,x=title,shape=condition))+geom_point(size=3)+
  geom_smooth(method='lm',se=FALSE,colour='black')+
  theme_bw()+theme(axis.text.x=element_text(angle=45,hjust=1))+
  geom_errorbar(aes(ymax=value+ses,ymin=value-ses))+
  ylim(c(0.65,0.9))+
  labs(x='Stories',y='Recall Accuracy',shape='Condition')+
  geom_hline(yintercept=mean(x$value))
savePlot('material_stories.png')

summary(xtabs(~value+title,tr))


## testing random effects ####
# stoIdx
x2 <- aggregate(value~stoIdx,tr,mean)
sds <- aggregate(value~stoIdx,tr,sd)[[2]]
les <- aggregate(value~stoIdx,tr,length)[[2]]
x2$ses <- sds/sqrt(les)
ggplot(x2,aes(x=stoIdx,y=value))+geom_line()+geom_point(size=3)+
  geom_errorbar(aes(ymin=value-ses,ymax=value+ses))+
  coord_cartesian(ylim=c(0.6,0.9))+theme_bw()+
  labs(x="Trial Index",y="Recall Accuracy")
savePlot('conf_stoidx.png')


summary(glm(value~stoIdx,tr,family=binomial))
# summary(glm(value~stoIdx,subset(tr,stoIdx!=1&stoIdx!=12),family=binomial))

# response type
responseMap <- c('1st name','2nd name','relation')
names(reponseMap) <- c('name1_cor','name2_cor','rel_cor')
tr$responseType <- responseMap[tr$variable]

x2 <- aggregate(value~responseType,tr,mean)
sds <- aggregate(value~responseType,tr,sd)[[2]]
les <- aggregate(value~responseType,tr,length)[[2]]
x2$ses <- sds/sqrt(les)
arc <- data.frame(x=c(0,0,1,1),y=c(0,1,1,0))
p<-ggplot(x2,aes(x=responseType,y=value))+geom_point(size=3)+
  geom_errorbar(aes(ymin=value-ses,ymax=value+ses))+theme_bw()+
  coord_cartesian(ylim=c(0.65,0.9))+ylab('Recall Accuracy')+xlab('Response Type')
p+geom_line(data=arc,aes(x+1,0.85+y*0.01),lty=2)+
  geom_line(data=arc,aes(x*1.5+1.5,0.88+y*0.01),lty=2)+
  geom_text(x=2.25,y=.9,label='***')
savePlot('conf_respType.png')

summary(xtabs(~value+responseType,tr))
summary(glm(value~responseType,tr,family=binomial))

summary(xtabs(~value+variable2,tr))
summary(glm(value~variable2,tr,family=binomial))

# condition
x2 <- aggregate(value~condition,tr,mean)
sds <- aggregate(value~condition,tr,sd)[[2]]
les <- aggregate(value~condition,tr,length)[[2]]
x2$ses <- unlist(sds/sqrt(les))
p <- ggplot(x2,aes(x=condition,y=value))+geom_point(size=3)+
  geom_errorbar(aes(ymin=value-ses,ymax=value+ses))+theme_bw()+
  coord_cartesian(ylim=c(0.7,0.85))+labs(y='Recall Accuracy',x='Condition')
p+geom_line(data=arc,aes(x+1,0.82+y*0.01),lty=2)+
  geom_text(x=1.5,y=0.84,label='*')

savePlot('conf_condition.png')

summary(glm(value~condition,tr,family=binomial))
summary(xtabs(~value+condition,tr))

# reading time
summary(glm(value~timeReadingLog,tr,family=binomial))

# statIdx
x2 <- aggregate(value~statIdx,tr,mean)
sds <- aggregate(value~statIdx,tr,sd)[[2]]
les <- aggregate(value~statIdx,tr,length)[[2]]
x2$ses <- sds/sqrt(les)
p<-ggplot(x2,aes(x=statIdx,y=value))+geom_point(size=3)+theme_bw()+
    geom_errorbar(aes(ymin=value-ses,ymax=value+ses))+
    coord_cartesian(ylim=c(0.65,0.9))+
    labs(y='Recall Accuracy',x='Statement Index')
p+geom_line(data=arc,aes(x+1,0.83+y*0.01),lty=2)+
  geom_line(data=arc,aes(x*2+1,0.86+y*0.01),lty=2)+
  geom_text(x=1.5,y=.85,label='***')+
  geom_text(x=2,y=.88,label='*')

savePlot('conf_statIdx.png')

tr$statIdx <- as.factor(tr$statIdx)
summary(glm(value~statIdx,tr,family=binomial))
summary(xtabs(~value+statIdx,tr))

# per subject median time readings mean per dayblock
x2 <- aggregate(timeReading~value,tr,mean)
sds <- aggregate(timeReading~value,tr,sd)[[2]]
les <- aggregate(timeReading~value,tr,length)[[2]]
x2$ses <- sds/sqrt(les)
ggplot(x2,aes(y=timeReading,x=value))+geom_bar(stat='identity')+
  geom_errorbar(aes(ymax=timeReading+ses,ymin=timeReading-ses))

summary(lm(overall_cor~timeReadingMedian,s))
summary(glm(value~timeReadingLog,tr,family=binomial))

ggplot(s,aes(x=timeReadingMedian,y=overall_cor))+geom_point(size=3)+
  geom_smooth(method='lm')+
  ylab('Correct Response')+xlab('Median Time Reading')


## main effect ####
tr$stoIdxZ <- scale(tr$stoIdx)
tr$stoIdx2Z <- scale(tr$stoIdx2)
tr$conditionZ <- scale(as.integer(as.factor(tr$condition)))

x=aggregate(value~stoIdx2+condition,tr,mean)
sds=aggregate(value~stoIdx2+condition,tr,sd)$value
lengths=aggregate(value~stoIdx2+condition,tr,length)$value
x$ses <- unlist(sds/sqrt(lengths))
ggplot(x,aes(x=stoIdx2,y=value,shape=condition,group=condition))+geom_point(size=3)+
  theme_bw()+geom_line()+geom_errorbar(aes(ymin=value-ses,ymax=value+ses))+
  labs(y='Recall Accuracy',x='Trial Index',shape='Condition')+
  theme(legend.position=c(.8,0.2),legend.background=element_rect(colour=1,size=.2))
savePlot('main.png')

mod1 <- glmer(value~stoIdxZ*conditionZ+
                 (1|sessionCode)+(1|uniqueStatement),
               data=tr,family="binomial",
              control = glmerControl(optimizer = c("bobyqa"),optCtrl = list(maxfun = 100000)))
summary(mod1)

mod2 <- glmer(value~stoIdxZ*conditionZ+variable2+
                (1|sessionCode)+(1|uniqueStatement),
              data=tr,family="binomial",
              control = glmerControl(optimizer = c("bobyqa"),optCtrl = list(maxfun = 100000)))
summary(mod2)

mod3 <- glmer(value~stoIdxZ*conditionZ+variable2+statIdx+
                (1|sessionCode)+(1|uniqueStatement),
              data=tr,family="binomial",
              control = glmerControl(optimizer = c("bobyqa"),optCtrl = list(maxfun = 100000)))
summary(mod3)

mod4 <- glmer(value~stoIdxZ*conditionZ+variable2+statIdx+timeReadingLog+
                (1|sessionCode)+(1|uniqueStatement),
              data=tr,family="binomial",
              control = glmerControl(optimizer = c("bobyqa"),optCtrl = list(maxfun = 100000)))
summary(mod4)

mod5 <- glmer(value~stoIdxZ*conditionZ+variable2+statIdx+timeReadingLog+
                afterTrick+
                (1|sessionCode)+(1|uniqueStatement),
              data=tr,family="binomial",
              control = glmerControl(optimizer = c("bobyqa"),optCtrl = list(maxfun = 100000)))
summary(mod5)

mod6 <- glmer(value~stoIdxZ*conditionZ+variable2+statIdx+timeReadingLog+
                afterTrick+first+
                (1|sessionCode)+(1|uniqueStatement),
              data=tr,family="binomial",
              control = glmerControl(optimizer = c("bobyqa"),optCtrl = list(maxfun = 100000)))
summary(mod6)

# make nice table to compare models
library(stargazer)
stargazer(mod1,mod2,mod3,mod4,mod5,mod6,
                        type='latex',
                        dep.var.labels='Recall Sucess',
                        report='vc*s',star.char=c('o','*','**','**','***'),
                        star.cutoffs=c(.1,.05,.01,.001),
                        notes='\textsuperscript{o} p<0.1; * p<0.05; ** p<0.01; *** p<0.001',
                        notes.append=F,
                        out=paste0(tablesPath,'main_table.tex')
                        )

# model comparison
anova(mod1,mod2,mod3,mod4,mod5,mod6)



## reading times ####
t$stoIdxZ <- scale(t$stoIdx)
t$stoIdx2Z <- scale(t$stoIdx2)
t$conditionZ <- scale(as.integer(t$condition))
t$statIdx <- as.factor(t$statIdx)

x=aggregate(timeReadingLog~stoIdx2+condition,tr,mean)
sds=aggregate(timeReadingLog~stoIdx2+condition,tr,sd)$timeReadingLog
lengths=aggregate(timeReadingLog~stoIdx2+condition,tr,length)$timeReadingLog
x$ses <- unlist(sds/sqrt(lengths))
ggplot(x,aes(x=stoIdx2,y=timeReadingLog,shape=condition,group=condition))+geom_point(size=3)+
  theme_bw()+geom_line()+geom_errorbar(aes(ymin=timeReadingLog-ses,ymax=timeReadingLog+ses))+
  labs(y='Log Time Reading',x='Trial Index',shape='Condition')
savePlot('read.png')

read.mod = lmer(timeReadingLog~stoIdxZ*conditionZ+
                  (1|sessionCode)+(1|uniqueStatement),t)
cftest(read.mod)

read.mod.full = lmer(timeReadingLog~stoIdxZ*conditionZ+statIdx+
                   (1|sessionCode)+(1|uniqueStatement),t)
cftest(read.mod.full)

stargazer(read.mod,read.mod.full,
          type='latex',
          dep.var.labels='Log Time Reading',
          report='vc*s',star.char=c('o','*','**','**','***'),
          star.cutoffs=c(.1,.05,.01,.001),
          notes='\textsuperscript{o} p<0.1; * p<0.05; ** p<0.01; *** p<0.001',
          notes.append=F,
          out=paste0(tablesPath,'read_table.tex')
          )

anova(read.mod,read.mod.full)


# follow up ####
# percentage yes to follow up question
closeds = t(cbind(table(s$similarityClosed),
                  table(s$repetitionClosed),
                  table(s$analogyClosed)))
rownames(closeds) <- c('similarity','repetition','analogy')
closeds2 <- melt(closeds)
colnames(closeds2) <- c('Question','Response','Frequency')
x2<-data.frame(percs=closeds[,2]/rowSums(closeds))
x2$Question <- factor(rownames(x2),levels=c('similarity','repetition','analogy'),ordered=T)

ggplot(x2,aes(y=percs,x=Question))+geom_bar(stat='identity')+ylim(c(0,.5))+theme_bw()+
  labs(x='Question',y='Percentage Yes')
savePlot('fol_percYes.png')

x <- melt(s[,c('similarityClosed','repetitionClosed','analogyClosed','overall_cor','sessionCode')],id.var=c('overall_cor','sessionCode'))
questionMap <- c('Similarity','Repetition','Analogy')
names(questionMap)<-c('similarityClosed','repetitionClosed','analogyClosed')
x$variable <- factor(questionMap[x$variable],ordered=T,levels=questionMap)
x2 <- aggregate(overall_cor~variable+value,x,mean)
sds <- aggregate(overall_cor~variable+value,x,sd)[[3]]
lengths <- aggregate(overall_cor~variable+value,x,length)[[3]]
x2$ses <- unlist(sds/sqrt(lengths))
ggplot(x2,aes(value,overall_cor,group=value,shape=variable))+
  geom_bar(stat='identity',position='dodge',size=3)+facet_grid(.~variable)+coord_cartesian(ylim=c(.65,.9))+
  theme_bw()+geom_errorbar(aes(ymin=overall_cor-ses,ymax=overall_cor+ses))+
  labs(x='Answer',y='Overall Recall Accuracy')
savePlot('fol_answerXoverall.png')

mod.fol.sim <- lm(overall_cor~similarityClosed,s)
mod.fol.rep <- lm(overall_cor~repetitionClosed,s)
mod.fol.ana <- lm(overall_cor~analogyClosed,s)

summary(lm(overall_cor~similarityClosed,s))
summary(lm(overall_cor~repetitionClosed,s))
summary(lm(overall_cor~analogyClosed,s))

stargazer(mod.fol.sim,mod.fol.rep,mod.fol.ana,
          type='latex',
          dep.var.labels='Overall Recall Accuracy',
          report='vc*s',star.char=c('o','*','**','**','***'),
          star.cutoffs=c(.1,.05,.01,.001),
          notes='\\textsuperscript{o} p<0.1; * p<0.05; ** p<0.01; *** p<0.001',
          notes.append=F,
          out=paste0(tablesPath,'fol_table.tex')
)

#### experiment 2 ####
tr2 <- read.csv('data/tr_160812.csv')
t2 <- read.csv('data/t_160812.csv')
s2 <- read.csv('data/s_160812.csv')
rownames(s2) <- s2$sessionCode

tr2b <- tr2
tr2 <- tr2[tr$condition!='burns',]
t2b <- t2
t2 <- t2[t$condition!='burns',]

x <- aggregate(value~sessionCode,tr2,mean)
rownames(x) <- x$sessionCode
s2$overall_cor <- x$value[s2$sessionCode]

# age distribution
ggplot(s2,aes(age))+geom_histogram(binwidth=10)+
  geom_vline(xintercept=median(s2$age))+theme_bw()+
  scale_x_continuous(breaks=seq(20,70,10),labels=paste0(seq(20,70,10),'-',seq(29,69,10)))+
  labs(x='Age',y='Frequency')
savePlot('sample2_age.png')
  
median(s2$age)

# overall task performance
ggplot(s2,aes(overall_cor))+geom_histogram(binwidth=.05)+
  geom_vline(xintercept=median(s2$overall_cor))+theme_bw()+
  labs(x='Overall Recall Accuracy',y='Frequency')
savePlot('genper2_overall.png')

median(s2$overall_cor)

t.test(s$overall_cor,s2$overall_cor)

# material assessment
# per story recall accuracy on item level
x <- aggregate(value~title,tr2b,mean)
sds <- aggregate(value~title,tr2b,sd)[2]
les <- aggregate(value~title,tr2b,length)[2]
x$ses <- unlist(sds/sqrt(les))
x$condition <- factor(conditionMap2[as.character(x$title)],ordered=T,levels=c('analog','filler','burn'))
x$title<-factor(x$title,ordered=T,levels=x$title[order(x$condition)])

ggplot(x,aes(y=value,x=title,shape=condition))+geom_point(size=3)+
  geom_smooth(method='lm',se=FALSE,colour='black')+
  theme_bw()+theme(axis.text.x=element_text(angle=45,hjust=1))+
  geom_errorbar(aes(ymax=value+ses,ymin=value-ses))+
  labs(x='Stories',y='Recall Accuracy',shape='Condition')+
  ylim(c(0.5,0.75))+
  geom_hline(yintercept=mean(x$value))
savePlot('material2_storiesWburn.png')

summary(xtabs(~title+value,tr2b))

# confounding effects ####
# stoIdx
x2 <- aggregate(value~stoIdx,tr2,mean)
sds <- aggregate(value~stoIdx,tr2,sd)[[2]]
les <- aggregate(value~stoIdx,tr2,length)[[2]]
x2$ses <- sds/sqrt(les)
ggplot(x2,aes(x=stoIdx,y=value))+geom_line()+geom_point(size=3)+
  geom_errorbar(aes(ymin=value-ses,ymax=value+ses))+
  coord_cartesian(ylim=c(0.5,0.75))+theme_bw()+
  labs(x="Trial Index",y="Recall Accuracy")
savePlot('conf2_stoIdx.png')
  
summary(glm(value~stoIdx,tr2,family=binomial))


# stoIdx including burn trials
burnMap <- c(rep('burn',3),rep('experiment',8),'burn',rep('experiment',4))
names(burnMap)<-as.character(unique(tr2b$stoIdx))

x2 <- aggregate(value~stoIdx,tr2b,mean)
sds <- aggregate(value~stoIdx,tr2b,sd)[[2]]
les <- aggregate(value~stoIdx,tr2b,length)[[2]]
x2$ses <- sds/sqrt(les)
x2$condition <- burnMap[as.character(x2$stoIdx)]
x2$group=1

ggplot(x2,aes(x=stoIdx,y=value,shape=condition,group=group))+
  geom_line()+geom_point(size=3)+
  geom_errorbar(aes(ymin=value-ses,ymax=value+ses))+
  coord_cartesian(ylim=c(0.5,0.75))+
  labs(x="Trial Index",y="Recall Accuracy",shape='Burn')+theme_bw()+
  theme(legend.position=c(.2,0.2),legend.background=element_rect(colour=1,size=.2))
savePlot('conf2_stoIdxWburn.png')

summary(glm(value~stoIdx,tr2b,family=binomial))

## aftertrick check
tr2b$afterTrick <- as.factor(tr2b$stoIdx==14)
summary(glm(value~stoIdx+afterTrick,tr2b,family=binomial))

## check age influence
s$exp <- 'one'
s2$exp <- 'two'
x <- rbind(s[,c('age','overall_cor','exp')],s2[,c('age','overall_cor','exp')])
summary(lm(overall_cor~age+exp,x))


# response type
responseMap <- c('1st name','2nd name','relation')
names(responseMap) <- c('name1_cor','name2_cor','rel_cor')
tr2$responseType <- responseMap[tr2$variable]

x2 <- aggregate(value~responseType,tr2,mean)
sds <- aggregate(value~responseType,tr2,sd)[[2]]
les <- aggregate(value~responseType,tr2,length)[[2]]
x2$ses <- sds/sqrt(les)

p<-ggplot(x2,aes(x=responseType,y=value))+geom_point(size=3)+
  geom_errorbar(aes(ymin=value-ses,ymax=value+ses))+theme_bw()+
  coord_cartesian(ylim=c(0.55,0.8))+ylab('Recall Accuracy')+xlab('Response Type')
p+geom_line(data=arc,aes(x+1,0.75+y*0.01),lty=2)+
  geom_line(data=arc,aes(x*1.5+1.5,0.78+y*0.01),lty=2)+
  geom_text(x=2.25,y=.8,label='***')
savePlot('conf2_respType.png')

summary(xtabs(~value+responseType,tr))
summary(glm(value~responseType,tr,family=binomial))

summary(xtabs(~value+variable2,tr))
summary(glm(value~variable2,tr,family=binomial))

# condition
x2 <- aggregate(value~condition,tr2b,mean)
sds <- aggregate(value~condition,tr2b,sd)[[2]]
les <- aggregate(value~condition,tr2b,length)[[2]]
x2$ses <- unlist(sds/sqrt(les))
p <- ggplot(x2,aes(x=condition,y=value))+geom_point(size=3)+
  geom_errorbar(aes(ymin=value-ses,ymax=value+ses))+theme_bw()+
  coord_cartesian(ylim=c(0.5,0.75))+labs(y='Recall Accuracy',x='Condition')
# p+geom_line(data=arc,aes(x+1,0.72+y*0.01),lty=2)+
#   geom_text(x=1.5,y=0.74,label='*')
p
savePlot('conf2_conditionWburn.png')

summary(xtabs(~value+condition,tr2b))
summary(glm(value~condition,tr2b,family=binomial))

# statIdx
x2 <- aggregate(value~statIdx,tr2,mean)
sds <- aggregate(value~statIdx,tr2,sd)[[2]]
les <- aggregate(value~statIdx,tr2,length)[[2]]
x2$ses <- sds/sqrt(les)
p<-ggplot(x2,aes(x=statIdx,y=value))+geom_point(size=3)+theme_bw()+
  geom_errorbar(aes(ymin=value-ses,ymax=value+ses))+
  coord_cartesian(ylim=c(0.5,0.8))+
  labs(y='Recall Accuracy',x='Statement Index')
p+geom_line(data=arc,aes(x+1,0.71+y*0.01),lty=2)+
  geom_line(data=arc,aes(x*2+1,0.77+y*0.01),lty=2)+
  geom_text(x=1.5,y=.73,label='***')+
  geom_text(x=2,y=.79,label='***')
savePlot('conf2_statIdx.png')

tr2$statIdx <- as.factor(tr2$statIdx)
summary(xtabs(~value+statIdx,tr2))
summary(glm(value~statIdx,tr2,family=binomial))


# main ####
condStoIdxMap <- c(rep(1:2,2),rep(3:4,2),rep(5:6,2))
names(condStoIdxMap) <- as.character(unique(tr2$stoIdx))
tr2$stoIdx2 <- condStoIdxMap[as.character(tr2$stoIdx)]
tr2$primed <- tr2$stoIdx2%%2

tr2$primedZ <- tr2$primed
tr2$stoIdxZ <- scale(tr2$stoIdx)
tr2$stoIdx2Z <- scale(tr2$stoIdx2)
tr2$conditionZ <- scale(as.integer(as.factor(tr2$condition)))


x=aggregate(value~stoIdx+condition,tr2,mean)
sds=aggregate(value~stoIdx+condition,tr2,sd)$value
lengths=aggregate(value~stoIdx+condition,tr2,length)$value
x$ses <- unlist(sds/sqrt(lengths))
ggplot(x,aes(x=stoIdx,y=value,shape=condition,group=condition))+geom_point(size=3)+
  theme_bw()+geom_line()+geom_errorbar(aes(ymin=value-ses,ymax=value+ses))+
  labs(y='Recall Accuracy',x='Trial Index',shape='Condition')+ylim(c(0.45,0.75))+
  theme(legend.position=c(.2,0.2),legend.background=element_rect(colour=1,size=.2))
savePlot('main2.png')

tr2$variable2 <- ifelse(grepl('name',as.character(tr2$variable)),'name','relation')

# test glmers
mod2.1 <- glmer(value~stoIdxZ+variable2+statIdx+
                  (1|sessionCode)+(1|uniqueStatement),
                data=tr2,family="binomial")
summary(mod2.1)

mod2.2 <- glmer(value~stoIdxZ+variable2+statIdx+primedZ*conditionZ+
                  (1|sessionCode)+(1|uniqueStatement),
                data=tr2,family="binomial")
summary(mod2.2)

mod2.3 <- glmer(value~stoIdxZ+variable2+statIdx+stoIdxZ*conditionZ+
                            (1|sessionCode)+(1|uniqueStatement),
                          data=tr2,family="binomial")
summary(mod2.3)

mod2.4 <- glmer(value~stoIdxZ+variable2+statIdx+stoIdxZ*conditionZ+primedZ*conditionZ+
                (1|sessionCode)+(1|uniqueStatement),
              data=tr2,family="binomial",
              control = glmerControl(optimizer = c("bobyqa"),optCtrl = list(maxfun = 100000)))
summary(mod2.4)


anova(mod2.1,mod2.2,mod2.3,mod2.4)

stargazer(mod2.1,mod2.2,mod2.3,mod2.4,               
          type='latex',
          dep.var.labels='Recall Sucess',
          report='vc*s',star.char=c('o','*','**','**','***'),
          star.cutoffs=c(.1,.05,.01,.001),
          notes='\\textsuperscript{o} p<0.1; * p<0.05; ** p<0.01; *** p<0.001',
          notes.append=F,
          out=paste0(tablesPath,'main2_table.tex')
)

# primed interaction plot
x=aggregate(value~primed+condition,tr2,mean)
sds=aggregate(value~primed+condition,tr2,sd)$value
lengths=aggregate(value~primed+condition,tr2,length)$value
x$ses <- unlist(sds/sqrt(lengths))
x$primed <- ifelse(x$primed==0,'no','yes')
x$condition <- ifelse(x$condition=='analogues','analog','filler')
ggplot(x,aes(x=primed,y=value,shape=condition,group=condition))+geom_point(size=3)+
  theme_bw()+geom_line()+geom_errorbar(aes(ymin=value-ses,ymax=value+ses))+
  labs(y='Recall Accuracy',x='Primed',shape='Condition')
savePlot('main2b.png')

# follow up2 ####
closeds = t(cbind(table(s2$similarityClosed),
                  table(s2$repetitionClosed),
                  table(s2$analogyClosed)))
rownames(closeds) <- c('similarity','repetition','analogy')
closeds2 <- melt(closeds)
colnames(closeds2) <- c('Question','Response','Frequency')
x2<-data.frame(percs=closeds[,2]/rowSums(closeds))
x2$Question <- factor(rownames(x2),levels=c('similarity','repetition','analogy'),ordered=T)
ggplot(x2,aes(y=percs,x=Question))+geom_bar(stat='identity')+ylim(c(0,.4))+theme_bw()+
  labs(x='Question',y='Percentage Yes')
savePlot('fol2_percYes.png')

x <- melt(s2[,c('similarityClosed','repetitionClosed','analogyClosed','overall_cor','sessionCode')],id.var=c('overall_cor','sessionCode'))
questionMap <- c('Similarity','Repetition','Analogy')
names(questionMap)<-c('similarityClosed','repetitionClosed','analogyClosed')
x$variable <- factor(questionMap[x$variable],ordered=T,levels=questionMap)
x2 <- aggregate(overall_cor~variable+value,x,mean)
sds <- aggregate(overall_cor~variable+value,x,sd)[[3]]
lengths <- aggregate(overall_cor~variable+value,x,length)[[3]]
x2$ses <- unlist(sds/sqrt(lengths))
ggplot(x2,aes(value,overall_cor,group=value,shape=variable))+
  geom_bar(stat='identity',position='dodge',size=3)+facet_grid(.~variable)+
  coord_cartesian(ylim=c(.4,.85))+
  theme_bw()+geom_errorbar(aes(ymin=overall_cor-ses,ymax=overall_cor+ses))+
  labs(x='Answer',y='Overall Recall Accuracy')
savePlot('fol2_answerXoverall.png')

mod.fol2.sim <- lm(overall_cor~similarityClosed,s2)
summary(mod.fol2.sim)

mod.fol2.rep <- lm(overall_cor~repetitionClosed,s2)
summary(mod.fol2.rep)

mod.fol2.ana <- lm(overall_cor~analogyClosed,s2)
summary(mod.fol2.ana)

# table
stargazer(mod.fol2.sim,mod.fol2.rep,mod.fol2.ana,
          type='latex',
          dep.var.labels='Overall Recall Accuracy',
          report='vc*s',star.char=c('o','*','**','**','***'),
          star.cutoffs=c(.1,.05,.01,.001),
          notes='\\textsuperscript{o} p<0.1; * p<0.05; ** p<0.01; *** p<0.001',
          notes.append=F,
          out=paste0(tablesPath,'fol2_table.tex')
)


