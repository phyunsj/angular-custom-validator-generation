#!/usr/bin/env python
from xlrd import open_workbook
from string import Template
import sys, pprint, os
import re
import time
import shutil

# Add the directory containing your module to the Python path (wants absolute paths)
scriptpath = "./fixedLabels.py"
sys.path.append(os.path.abspath(scriptpath))
from fixedLabels import *

scriptpath = "./tsTemplate.py"
sys.path.append(os.path.abspath(scriptpath))
from tsTemplate import *

class generateValidator(fixedLabels, tsTemplate):

    def __init__ (self) :
        pass

    def codegen(self, xlsList):

        for book in xlsList:
          print ".Scanning ", book
          wb =  open_workbook('./'+book)
          bookName = book.replace('.xlsx','').title()
          for sheet in wb.sheets():
            print "..Scanning (Table) "+sheet.name 

            self.exportclass  = open('./'+bookName.lower()+'.'+sheet.name.lower()+'.ts', 'w') 
            self.exportclass.write('export class '+bookName+sheet.name.title()+'  {')
            self.exportclass.write('\n\tid : number;')
            self.exportclass.write('\n\tname : string;')
            self.defaultmodel = ''

            if sheet.name.upper() == 'SETTING' : # only care about setting prameters
                self.validator     = open('./'+bookName.lower()+'.validator.ts', 'w')  
                self.tooltip       = open('./'+bookName.lower()+'.tooltip.ts', 'w') 
                self.defaultmodel  = '\n\n\tconstructor() {'
            
                # header
                self.validator.write( self.tsValidatorHeader )
                # factory number or string
                stmt = Template(self.tsValidatorNumFactory).safe_substitute(dict(paramName=bookName))
                self.validator.write( stmt )
                stmt = Template(self.tsValidatorStrFactory).safe_substitute(dict(paramName=bookName))
                self.validator.write( stmt )

                

                num_rows  = sheet.nrows
                num_cells = sheet.ncols
                curr_row = 1 # 

                while curr_row < num_rows:
                  param_name         = sheet.cell_value(curr_row, 0).encode("utf-8")
                  param_displayname  = sheet.cell_value(curr_row, 1).encode("utf-8")
                  param_type         = sheet.cell_value(curr_row, 2).encode("utf-8")
                  param_min          = int(sheet.cell_value(curr_row, 3))
                  param_max          = int(sheet.cell_value(curr_row, 4))
                  param_unit         = sheet.cell_value(curr_row, 5).encode("utf-8")
                  param_default      = int(sheet.cell_value(curr_row, 6))
                  param_description  = sheet.cell_value(curr_row, 7).encode("utf-8")

                  stmt = Template(self.tsValidatorDirective).safe_substitute(dict(paramGroup=bookName, \
                         paramName=bookName+param_name.title().replace('_',''), minNum=param_min , maxNum=param_max, paramType=param_type.title(), paramDisplayName=param_displayname ))
                  self.validator.write( stmt )
                

                  self.tooltip.write('export const '+param_name.title().replace('_','')+' = "'+param_description+'";\n')
                  
                  
                  self.defaultmodel = self.defaultmodel + '\n\t\tthis.'+param_name.title().replace('_','')+' = '+str(param_default)+' ;'
                  
                  # for now, support only int (number) - just add mode conditional stmts for different types
                  self.exportclass.write('\n\t'+param_name.title().replace('_','')+' : number;')
                  curr_row = curr_row  + 1
                self.defaultmodel = self.defaultmodel +'\n\t}'
            else:
                num_rows  = sheet.nrows
                num_cells = sheet.ncols
                curr_row = 1 # 

                while curr_row < num_rows:
                  param_name         = sheet.cell_value(curr_row, 0).encode("utf-8")
                  param_displayname  = sheet.cell_value(curr_row, 1).encode("utf-8")
                  param_type         = sheet.cell_value(curr_row, 2).encode("utf-8")
                  
                  # for now, support only int (number) - just add mode conditional stmts for different types
                  self.exportclass.write('\n\t'+param_name.title().replace('_','')+' : number;')
                  curr_row = curr_row  + 1                  
            self.exportclass.write(self.defaultmodel+'\n}')    
            self.exportclass.close()
          self.validator.close();   
          self.tooltip.close(); 

