from werkzeug.utils import secure_filename
import os
from tool import Tool

class FlaskTool():
    PdfFilesPath = "static/PdfFiles/"
    pdffilespath = "static/PdfFiles"
    def __init__(self, request):
        self.file = request.files["pdf_file"]
        self.filename = self.file.filename
        self.path = f"{self.PdfFilesPath}{secure_filename(self.filename)}"
        self.resultPath = self.path.replace(".pdf", "")

    def saveFile(self):
        self.file.save(self.path)
        return self.path

    def removeOriginalFile(self):
        try:
            os.remove(self.path)
            print("file removed", self.path)
        except Exception as e:
            print("Can't remove: ", e)


    