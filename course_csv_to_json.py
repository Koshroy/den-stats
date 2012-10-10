import sys, re
import csv, json

def main():
    fname = sys.argv[1]
    f = open(fname)
    data_arr = []
    courseReader = csv.reader(f, delimiter=',', quotechar='"')
    for split_line in courseReader:
        hours = re.sub('[^0-9-]*', '', split_line[4])
        hours_list = map(lambda x: int(x), hours.split('-'))
        
        line_dict = {'time':split_line[0].lower(), 'major':split_line[1].lower(), 'grade':split_line[3].lower(), 'hours':hours_list, 'difficulty':split_line[5].lower()}
        data_arr.append(line_dict)

    f.close()

    out_f = open(sys.argv[2], 'w')
    json.dump(data_arr, out_f)
    out_f.close()
        

if __name__ == "__main__":
    main()
    
