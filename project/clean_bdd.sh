#!/bin/bash

mysql -u user_iot<<EOF
USE db_projet_iot
DELETE FROM table_Rtl
VALUES ("$var_mac_sta", "$var_last_time_sta", "$var_power", "$var_packet_num", "$var_bssid_sta", "$var_probe", NULL);
EOF
		