#!/bin/bash

mysql -u user_iot<<EOF
USE db_projet_iot
DELETE tab1
FROM table_Accesspoint AS tab1, table_Accesspoint AS tab2
WHERE tab1.key_com > tab2.key_com
AND tab1.bssid=tab2.bssid
AND tab1.last_time_seen=tab2.last_time_seen
AND tab1.channel=tab2.channel
AND tab1.privacy=tab2.privacy
AND tab1.cipher=tab2.cipher
AND tab1.authentication=tab2.authentication
AND tab1.beacon=tab2.beacon
AND tab1.essid=tab2.essid
AND tab1.nb_sta_co=tab2.nb_sta_co;

EOF

mysql -u user_iot<<EOF2
USE db_projet_iot
DELETE tab1
FROM table_Stations AS tab1, table_Stations AS tab2
WHERE tab1.key_com_sta > tab2.key_com_sta
AND tab1.macaddr_sta=tab2.macaddr_sta
AND tab1.last_time_sta=tab2.last_time_sta
AND tab1.power=tab2.power
AND tab1.packets_num=tab2.packets_num
AND tab1.bssid_sta=tab2.bssid_sta
AND tab1.probe=tab2.probe;

EOF2

mysql -u user_iot<<EOF3
USE db_projet_iot
DELETE tab1
FROM table_Bluetooth AS tab1, table_Bluetooth AS tab2
WHERE tab1.key_com_ble > tab2.key_com_ble
AND tab1.macaddr_ble=tab2.macaddr_ble
AND tab1.nom_ble=tab2.nom_ble
AND tab1.more_info=tab2.more_info
AND tab1.last_time_ble=tab2.last_time_ble;

EOF3


mysql -u user_iot<<EOF4
USE db_projet_iot
DELETE tab1
FROM table_Rtl AS tab1, table_Rtl AS tab2
WHERE tab1.key_com_Rtl > tab2.key_com_Rtl
AND tab1.timestamp=tab2.timestamp
AND tab1.product=tab2.product
AND tab1.temperature=tab2.temperature
AND tab1.humidity=tab2.humidity
AND tab1.pressure=tab2.pressure;

EOF4


#Vérifier les doublons
#SELECT COUNT(*) AS nbr_doublon, bssid, last_time_seen, channel, privacy, cipher, authentication, beacon, essid, nb_sta_co
#FROM table_Accesspoint
#GROUP BY bssid, last_time_seen, channel, privacy, cipher, authentication, beacon, essid, nb_sta_co
#HAVING COUNT(*) > 1