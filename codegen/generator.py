#!/usr/bin/env python
from string import Template
import sys, pprint, os
import re
import json
import time
import shutil

# Add the directory containing your module to the Python path
scriptpath = "./generateValidator.py"
sys.path.append(os.path.abspath(scriptpath))
from generateValidator import *

scriptpath = "./generateSampleDb.py"
sys.path.append(os.path.abspath(scriptpath))
from generateSampleDb import *

# Make a separate generator for all differnt target for easy maintenance & simplicity even though  database.xlsx is beging read multiple times. 
if __name__ == '__main__':

    genValidator = generateValidator()
    genValidator.codegen( ['tcp.xlsx'] ) # add more xls

    sampledb = generateSampleDb()
    sampledb.codegen( ['tcp.xlsx'] ) # add more xls

