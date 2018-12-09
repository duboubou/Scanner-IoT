#!/bin/bash
mysql -u bryan -ppodium123 <<EOF
USE projet
LOAD DATA LOCAL INFILE '/var/www/html/log_csv_cut.csv'
INTO TABLE rtl
FIELDS TERMINATED BY ','
IGNORE 1 LINES;
EOF