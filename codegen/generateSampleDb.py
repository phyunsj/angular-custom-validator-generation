#!/usr/bin/env python
from xlrd import open_workbook
from string import Template
import sys, pprint, os
import re
import time
import shutil
import random

# Add the directory containing your module to the Python path (wants absolute paths)
scriptpath = "./fixedLabels.py"
sys.path.append(os.path.abspath(scriptpath))
from fixedLabels import *

scriptpath = "./tsTemplate.py"
sys.path.append(os.path.abspath(scriptpath))
from tsTemplate import *

class generateSampleDb(fixedLabels, tsTemplate):

    def __init__ (self) :
        pass

    def random_generator(self, size=6):
        return ''.join(random.choice("YUNZS6793YUIO") for x in range(size))

    def codegen(self, xlsList):

        sampleEntries = 20

        for book in xlsList:
          print ".Scanning ", book
          wb =  open_workbook('./'+book)
          bookName = book.replace('.xlsx','').title()

          self.sampleDB   = open('./'+bookName.lower()+'.json', 'w') 

          for sheet in wb.sheets():
            print "..Scanning (Table) "+sheet.name 

            if sheet.name.upper() == 'SETTING' : # only care about setting prameters
                 

                self.sampleDB.write('{\n')
                self.sampleDB.write('\t"'+bookName+'Node" : [\n')

                for i in range(1,10):
               
                  if i != 1 :
                     self.sampleDB.write('\t,\n')
                  self.sampleDB.write('\t{ "id" : '+str(i)+'\n')
                  self.sampleDB.write('\t ,"name" : "US-NJ-'+self.random_generator()+'"\n')
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

                    self.sampleDB.write('\t,"'+param_name.title().replace('_','')+'" : '+ str(random.randint( param_min , param_max )) + '\n')
                    curr_row = curr_row  + 1
                  self.sampleDB.write('\t}\n')
               
                self.sampleDB.write('\t]\n')
 
            else :  # status


                self.sampleDB.write('\t,\n\t"'+bookName+'Stat" : [\n')

                for i in range(1,10):
               
                  if i != 1 :
                     self.sampleDB.write('\t,\n')
                  self.sampleDB.write('\t{ "id" : '+str(i)+'\n')
                  self.sampleDB.write('\t ,"name" : "US-NJ-'+self.random_generator()+'"\n')
                  self.sampleDB.write('\t ,"syncErr" : '+str(random.randint(0,1))+'\n')

                  num_rows  = sheet.nrows
                  num_cells = sheet.ncols
                  curr_row = 1 # 

                  while curr_row < num_rows:
                    param_name         = sheet.cell_value(curr_row, 0).encode("utf-8")
                    param_displayname  = sheet.cell_value(curr_row, 1).encode("utf-8")
                    param_type         = sheet.cell_value(curr_row, 2).encode("utf-8")
                   

                    self.sampleDB.write('\t,"'+param_name.title().replace('_','')+'" : '+ str(random.randint( 20 , 1000 )) + '\n')
                    curr_row = curr_row  + 1
                  self.sampleDB.write('\t}\n')
               
                self.sampleDB.write('\t]\n')
                self.sampleDB.write('}\n')

          self.sampleDB.close();   

