import json
import sys
from DataSet import *

def main():
    if len(sys.argv) < 2:
        print 'Usage: python dataProcess.py [filenames]'
    
    fnames = sys.argv[1:]
    for fname in fnames:
        f = open(fname)
        dataArr = json.loads(f.read())
        lowerDataArr = sanitizeDataDict(dataArr)
            
        ds = DataSet(lowerDataArr)

        classHist = ds.getHistRepr("difficulty")
        print classHist
        classHistBinned = BinnedDataDict(classHist)
        print classHistBinned


def sanitizeDataDict(dataArr):
    outArr = []
    for group in dataArr:
        newGroup = {}
        for k, v in group.iteritems():
            if hasattr(v, 'lower'):
                lowerV = v.lower()
            else:
                lowerV = v
            try:
                finalV = int(lowerV)
            except TypeError:
                finalV = lowerV
            except ValueError:
                finalV = lowerV
            newGroup[k] = finalV
        outArr.append(newGroup)

    return outArr


if __name__ == "__main__":
    main()
