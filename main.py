from flask import Flask, request, url_for, render_template
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import PyPDF2
import os
from tool import Tool
from flaskTool import FlaskTool
import json
from shutil import rmtree
from werkzeug.utils import secure_filename

app = Flask(__name__)


# Do not add this in production!
cors = CORS(app, static_folder = 'pdf_files')
app.config['CORS_HEADERS'] = 'Content-Type'

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///pdfTools.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


# Path, where all pdf files are saved/uploaded
PdfFilesPath = "/static/PdfFiles"


flaskTool = None

class pdf(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pdf_name = db.Column(db.String(255))
    pdf = db.Column(db.LargeBinary(length=2048))

    def __repr__(self) -> str:
        return f"{self.pdf_name}"

@app.route("/encrypt_pdf",methods=['POST'])    
@cross_origin()
def encrypt_pdf():
    if request.method == 'POST':
        # password to set
        password = request.form["password"]
        
        # Create a new Tool Object
        tool = Tool(flaskTool.path)

        # Encrypt the pdf and save it on the server
        tool.encrypt(password, f"{flaskTool.resultPath}_encrypted.pdf")

        

        # Return the url of encrypted file
        return f"{flaskTool.resultPath}_encrypted.pdf"


@app.route("/decrypt_pdf",methods=['POST'])    
@cross_origin()
def decrypt_pdf():
    if request.method == 'POST':
        # password of the pdf file
        password = request.form["password"]
        
        # Create a new Tool Object
        tool = Tool(flaskTool.path)

        # Encrypt the pdf and save it on the server
        tool.decrypt(password, f"{flaskTool.resultPath}_decrypted.pdf")

        

        # Return the url of encrypted file
        return f"{flaskTool.resultPath}_decrypted.pdf"

@app.route("/remove_file",methods=['POST'])    
@cross_origin()
def remove_file():
    if request.method == 'POST':
        try:
            if request.form.get("removeFolder") == "true":
                rmtree(request.form['url'].replace(".pdf", ""))
            else:
                os.remove(request.form["url"])
                os.remove(FlaskTool.PdfFilesPath + secure_filename(str(request.form['originalFileName'])))
        
        except Exception as e:
            pass

        return "200"


@app.route("/remove_images",methods=['POST'])    
@cross_origin()
def remove_images():
    if request.method == 'POST':        
        # Create a new Tool Object
        tool = Tool(flaskTool.path)

        # Encrypt the pdf and save it on the server
        tool.remove_images(f"{flaskTool.resultPath}_No_Images.pdf")

        

        # Return the url of encrypted file
        return f"{flaskTool.resultPath}_No_Images.pdf"

@app.route("/remove_links",methods=['POST'])    
@cross_origin()
def remove_links():
    if request.method == 'POST':        
        # Create a new Tool Object
        tool = Tool(flaskTool.path)

        # Encrypt the pdf and save it on the server
        tool.remove_links(f"{flaskTool.resultPath}_No_Links.pdf")

        

        # Return the url of encrypted file
        return f"{flaskTool.resultPath}_No_Links.pdf"


@app.route("/extract_images",methods=['POST'])    
@cross_origin()
def extract_images():
    if request.method == 'POST':
        # Create a FlaskTool Object 
        flaskTool = FlaskTool(request)
        
        # Save the uploaded file to the server
        flaskTool.saveFile()
        
        # Create a new Tool Object
        tool = Tool(flaskTool.path)

        # Encrypt the pdf and save it on the server
        folderName = flaskTool.filename.replace(".pdf", "")
        if not os.path.isdir(f"{FlaskTool.PdfFilesPath}{folderName}"):
            os.mkdir(f"{FlaskTool.PdfFilesPath}{folderName}")

        try:
            tool.extract_images(f"{FlaskTool.PdfFilesPath}{folderName}")
        except Exception as error:
            tool.extract_images(saveTo=f"{FlaskTool.PdfFilesPath}{folderName}")

        

        # Return the url of encrypted file
        return json.dumps(os.listdir(f"{FlaskTool.PdfFilesPath}{folderName}"))


@app.route("/setOperationPages",methods=['POST'])    
@cross_origin()
def setOperationPages():
    if request.method == 'POST':
        global flaskTool
        loadedPages = json.loads(request.form["pages"])
        pages = loadedPages


        flaskTool = FlaskTool(request)
        flaskTool.saveFile()
        Tool.file = open(flaskTool.path, "rb")
        Tool.pdf_reader = PyPDF2.PdfFileReader(Tool.file)
        pdf_writer = PyPDF2.PdfFileWriter()

        Tool.requested_pages = pages

        try:
            Tool.pdf_reader.getNumPages()

        except PyPDF2.utils.PdfReadError as e:
            if "File has not been decrypted" in str(e):
                return "Decrypted PDF"
            
            else:
                exit()

        if pages[0] == "all":
            for i in range(Tool.pdf_reader.getNumPages()):
                pdf_writer.addPage(Tool.pdf_reader.getPage(i))
            pages = list(range(Tool.pdf_reader.getNumPages()))

        else:
            pages = []
            for i in loadedPages:
                if "-" in str(i):
                    ranges = i.split("-")

                    pages.extend(list(range(int(ranges[0])-1, int(ranges[1]) )))
                
                else:
                    pages.append(i-1)
            for i in pages:
                pdf_writer.addPage(Tool.pdf_reader.getPage(i))

    

        Tool.pages = pages

        Tool.pdf_writer = pdf_writer


        return "Operating"


@app.route("/setOperationPages",methods=['POST'])    
@cross_origin()
def save_operation_pages():
    if request.method == "POST":
        # Create a tool object 
        tool = Tool(flaskTool.path)

        # Save operation pages
        tool.save_operation_pages(f"{flaskTool.resultPath}_splitted.pdf")

        # Remove original file from server
        flaskTool.removeOriginalFile()

         # Return the url of slitted pdf file
        return f"{flaskTool.resultPath}_splitted.pdf"

@app.route('<myurl>')
def index(myurl):
    return render_template('index.html')

if __name__=="__main__":
    app.run(debug=True)