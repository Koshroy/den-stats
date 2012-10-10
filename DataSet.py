from collections import deque
from collections import defaultdict
import types

class DataSet(object):
    def __init__(self, dataArr):
        self._data = dataArr

    def _getval(self, name):
        return sorted(map(lambda x: x.get(name), self._data))

    def __getattr__(self, name):
        return self._getval(name)

    def __getitem__(self, name):
        return self._getval(name)

    def getGroup(self, attrName, groupVal):
        for i in xrange(len(self._data)):
            if self._data[i].get(attrName) == groupVal:
                return self._data[i]

    def getHistRepr(self, attrName):
        outHist = defaultdict(deque)
        for i in xrange(len(self._data)):
            assert self._data[i] is not None
            outHist[attrName].append(self._data[i][attrName])
        return outHist

class BinnedDataDict(dict):
    def __init__(self, dataArr):
        dict.__init__(self)
        self.setDataList(dataArr)

    def setDataList(self, dataArr):
        self._dataDict = defaultdict(int)
        self._totalItems = len(dataArr)
        for datum in dataArr:
            self._dataDict[datum] = self._dataDict[datum] + 1

    def addItem(self, item):
        self._dataDict(item, self._dataDict[item] + 1)

    def setItem(self, attrName, attrVal):
        try:
            v = int(attrVal)
            self._dataDict[attrName] = v
        except TypeError:
            pass
        except ValueError:
            pass

    def ratio(self, attrName):
        fItems = self._totalItems + 0.0
        assert fItems is FloatType, "fItems Float conversion failed"
        return len(self._dataDict[attrName]) / fItems
        
    def __getitem__(self, attrName):
        return self._dataDict.get(attrName, None)

    def __setitem__(self, attrName, attrVal):
        return self.setItem(attrName, attrVal)

    def __str__(self):
        return str(self._dataDict)

    def keys(self):
        return self._dataDict.keys()

    def values(self):
        return self._dataDict.values()

    def iteritems(self):
        for pair in self._dataDict.iteritems():
            yield pair


            
            
