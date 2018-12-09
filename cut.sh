#!/bin/bash

cut -d ',' -f 1,4,9,12,14,114 /var/www/html/log_csv.csv > /var/www/html/log_csv_cut.csv