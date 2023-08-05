FROM mysql:8.0-debian

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
      rsync \
      inotify-tools && \
    rm -fR /var/lib/apt/lists/*

COPY utf8.cnf /etc/mysql/mysql.conf.d/
COPY kingsCS-entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/kingsCS-entrypoint.sh && \
    ln -sf usr/local/bin/kingsCS-entrypoint.sh /entrypoint.sh

ENTRYPOINT ["kingsCS-entrypoint.sh"]

EXPOSE 3306

CMD ["mysqld"]

