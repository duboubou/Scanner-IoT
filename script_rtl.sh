#!/bin/bash

case "$1" in
  start|"")
	rtl_433 -G -q -F json:json-sh.json
	;;
  stop)
	killall -9 rtl_433
	;;
  status)
  if [[ $(ps -ef | grep rtl_433 | grep -v grep | wc -l) != 0 ]]; then
    echo "Process is running"
  else
    echo "Process is not running, you can press start"
  fi
	;;
  *)
	echo "Commande non autorisée, utilisez start, stop ou status" >&2
	exit 3
	;;
esac
