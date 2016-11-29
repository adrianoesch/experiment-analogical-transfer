from json import load, dump

def generatePajekList(linkList,sep=';'):
    nodes = list(set([j for i in linkList for j in i.split(sep)[:2]]))
    nodes = sorted(nodes)
    nodesToIdxMap = {j:str(i+1) for i,j in enumerate(nodes)}
    nd = ['*Vertices '+str(len(nodes))]
    nd = nd+[str(i+1)+' "'+j+'"' for i,j in enumerate(nodes)]
    nd.append('*Edges '+str(len(linkList)))
    linkTuples = [tuple(i.split(';')) for i in linkList]
    nd = nd+[nodesToIdxMap[i[0]]+' '+nodesToIdxMap[i[1]]+' '+i[2].strip() for i in linkTuples]
    nd = [i+'\n' for i in nd]
    return nd

def getIdxMapFromPjk(pajekList):
    nNodes = int(pajekList[0].split(' ')[-1])
    nodes = pajekList[1:nNodes+1]
    n = {i.split(' ')[0]:i.split('"')[1] for i in nodes}
    return n

def getEdgesFromPjk(pajekList):
    nNodes = int(pajekList[0].split(' ')[-1])
    edges = pajekList[nNodes+2:]
    return edges

def getParents(path):
    pars = path.split(':')
    nd = []
    for i in range(1,len(pars)):
        nd.append(':'.join(pars[:i]))
    return nd

def getInterCommKey(j1,j2):
    par1 = getParents(d[j1])
    par2 = getParents(d[j2])
    if par1 == par2:
        return 'same'
    matches = [i+1 for i in range(min([len(par1),len(par2)])) if par1[i]==par2[i]]
    lv = max(matches) if len(matches)>0 else 0
    cl = sorted([par1[lv],par2[lv]])
    cs = str(cl[0])+' '+str(cl[1])
    return cs

def getInterCommKeyFromPaths(j1,j2):
    par1 = getParents(j1)
    par2 = getParents(j2)
    if par1 == par2:
        return 'same'
    matches = [i+1 for i in range(min([len(par1),len(par2)])) if par1[i]==par2[i]]
    lv = max(matches) if len(matches)>0 else 0
    cl = sorted([par1[lv],par2[lv]])
    cs = str(cl[0])+' '+str(cl[1])
    return cs
