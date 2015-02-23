apt-get update

apt-get install python-software-properties -y

apt-add-repository ppa:chris-lea/node.js
apt-get update
apt-get install nodejs -y

apt-get install mongodb -y
mkdir -p /data/db
chown -R mongodb:mongodb /data/db/

npm install bower --save
npm install -g express --save
npm install express-generator -g --save


cd /vagrant
express ronda
mv ronda/* .
rm -R ronda
mkdir log
mkdir test
perl -pi -e 's/\.\.\/app/\.\.\/server/g' /vagrant/bin/www
mv app.js server.js

cp package.js.master package.js

npm install

cat << EOF > /etc/init/ronda.conf
# ronda - ronda job file

description "ronda"
author "Alejandro Balbi  <alejandrobalbi@gmail.com>"

start on filesystem or runlevel [2345]
stop on shutdown

pre-start script
    echo "[\`date\`] ronda Starting" >> /vagrant/log/ronda.log
end script

script
    export HOME="/vagrant"
    echo \$\$ > /var/run/ronda.pid
    exec /usr/bin/node /vagrant/bin/www  >> /vagrant/log/ronda.log
end script

pre-stop script
    rm /var/run/ronda.pid
    echo "[\`date\`] Node Test Stopping" >> /vagrant/log/ronda.log
end script
EOF

sudo service ronda start

