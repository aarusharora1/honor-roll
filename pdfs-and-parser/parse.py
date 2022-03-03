from tkinter import N
from numpy import char
from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer
from pdfminer.layout import LAParams
import json

localParams = LAParams(boxes_flow=None, char_margin=1)

output = open("output.json", "r+")
data = json.load(output)
output.seek(0)

output.truncate(0)
fileList = [
    "./2018-19_Sem1_GoldHR.pdf",
    "./2018-19_Sem1_GreenHR.pdf",
    "./2018-19_Sem2_GoldHR.pdf",
    "./2018-19_Sem2_GreenHR.pdf",
    "./2019-20_Sem1_GoldHR.pdf",
    "./2019-20_Sem1_GreenHR.pdf",
    "./2019-20_Sem2_GoldHR.pdf",
    "./2019-20_Sem2_GreenHR.pdf",
    "./2020-21_Sem1_GoldHR.pdf",
    "./2020-21_Sem1_GreenHR.pdf",
    "./2020-21_Sem2_GoldHR.pdf",
    "./2020-21_Sem2_GreenHR.pdf",
    "./2021-22_Sem1_GoldHR.pdf",
    "./2021-22_Sem1_GreenHR.pdf",
    
    

]
temp = open("output.txt", "w")
for fileName in fileList:
    
    nameList = []

    for page_layout in extract_pages(fileName, laparams=localParams):
        for element in page_layout:
            if isinstance(element, LTTextContainer):
                #print(element.get_text())
                curText = element.get_text()
                
                #if ("Gold" not in curText and "Green" not in curText):
                    
                splited = curText.split('\n')
                for i in range(len(splited)):
                    cur2 = splited[i].replace(" ","")
                    if ("HonorRoll" in cur2 or "Semester" in cur2 or "Student" in cur2 or "Grade" in cur2):
                        continue
                    if (len(cur2) > 2 and cur2 != "Gold" and "Adlai" not in cur2 and "Green" not in cur2):
                        #print(cur2)
                        #temp.write(cur2 +"\n")
                        nameList.append(cur2)
    curGrade = 12
    curGradYear = int(fileName[2:6])+1
    curSemester = fileName[10:14]
    honorType = fileName[15:19]
    if honorType != "Gold":
        honorType = "Green"
    print(honorType)
    print(curGradYear)
    print(curSemester)

    for i in range(len(nameList)):
        temp.write(str(curGradYear) + "    " + nameList[i] + "\n")
        if (len(nameList[i])>3 and "Honor" not in nameList[i]):
            if (i>0):
            # print(nameList[i][:1]+ "    " + nameList[i-1][:1] + "    " + str(len(nameList[i])))
                #print(curGrade)
                if (nameList[i][:1]=='A' and nameList[i-1][:1]=='Z'):
                    temp.write("\n" + nameList[i] + "             " + nameList[i-1] + "    " + fileName + " \n")
                    curGrade-=1
                    curGradYear+=1
                #output.write(str(curGrade) + " " + nameList[i]+ "\n")
                names = nameList[i].split(',')
                if (len(names) < 2):
                    continue
                out = names[1] + names[0] + str(curGradYear)
                
                if (out in data):
                    data[out]["Status"][str(curGrade) + "" +curSemester] = honorType
                #  continue
                else:
                    data[out]={
                        "First": names[1],
                        "Last": names[0],
                        "Status": {}
                    }
                    data[out]["Status"][str(curGrade) + "" +curSemester] = honorType
                #output.write(out+"\n")
json.dump(data, output)
output.close()

    #print(gradeList)
    #print(nameList)
temp.close()