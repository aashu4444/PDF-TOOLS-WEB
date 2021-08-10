import shutil
import os
import re

# ------Moving static files to production folder

# The source path
srcStr = "build/static/"

# The destination path
dstStr = "../../Production version/static/BuildStatic/"


src = os.listdir(srcStr)

try:
    for item in src:
        shutil.move(srcStr + item, dstStr)

except shutil.Error as e:
    for item in src:
        for i in os.listdir(srcStr + item):
            shutil.move(srcStr + item + f"/{i}", dstStr + item + f"/{i}")


# -----Changin static urls in index.html

# The destination path for templates
dstTmp = "../../Production version/templates/build/"

# All results will be appended in this list 
ls = []

# Name of the html file
htmlFileName = "index.html"

# The file to read and write
htmlFilePath = f"build/{htmlFileName}"

# Read the html file
with open(htmlFilePath, "r") as f:
    mystr = f.read() # Read
    
    # The string to search
    findStr = r'="/static/'

    # Create the pattern
    patt = re.compile(findStr)

    # Find matches in mystr
    matches = patt.finditer(mystr)

    # Iterate through all found matches
    for match in matches:
        path = ""

        for index, char in enumerate(mystr[match.span()[1]:], start=1):
            if char == '"':
                ls.append((path, (match.span()[0], match.span()[0] + index + len(findStr))))
                path = ""
                break
            else:
                path += char

finalStr = mystr

for item in ls:
    # Replace the string
    finalStr = finalStr.replace(mystr[item[1][0]:item[1][1]], f"""="{{{{ url_for('static', filename='BuildStatic/{item[0]}') }}}}" """, )

# Remove manifest from finalStr
finalStr.replace('<link rel="manifest" href="/manifest.json"/>', "")


# Open the file in write mode
with open(htmlFilePath, "w") as f:
    f.write(finalStr)

try:
    shutil.move(htmlFilePath, dstTmp)

except shutil.Error as e:
    shutil.move(htmlFilePath, dstTmp + htmlFileName)

# Remove the build folder
shutil.rmtree("build")