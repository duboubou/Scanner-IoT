#!/bin/bash

sudo chmod 777 /var/www/html/project/dossier_json/temp.json
sudo chmod 777 /var/www/html/project/dossier_json/req_cam1.json
sudo chmod 777 /var/www/html/project/dossier_json/req_cam2.json
sudo chmod 777 /var/www/html/project/dossier_json/req_cam3.json
sudo chmod 777 /var/www/html/project/dossier_json/req_cam4.json


del_crochets () {

	cat /var/www/html/project/dossier_json/$1 | cut -c 2- | rev | cut -c 2- | rev > /var/www/html/project/dossier_json/temp.json
	cat /var/www/html/project/dossier_json/temp.json > /var/www/html/project/dossier_json/$1 

}


del_crochets req_cam1.json
del_crochets req_cam2.json
del_crochets req_cam3.json
del_crochets req_cam4.json
