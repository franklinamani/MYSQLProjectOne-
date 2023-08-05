#!/bin/bash
if [[ "$(stat --file-system --format=%T /html)" == "nfs" ]]; then  
  # Intial file-sync
  rsync -aq /html/ /var/www/html/ --delete-after
  # sync files when changed
  kingsCS-filesync.sh "/html/" "/var/www/html/" &
else
  rmdir /var/www/html
  ln -s /html /var/www/
fi

# pass args to docker-entrypoint.sh
/usr/local/bin/docker-php-entrypoint "$@"