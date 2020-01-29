#!/bin/bash
#Setup swapfile
cd
echo 'Setup swapfile....'
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
sysctl vm.swappiness=10
echo 'vm.swappiness=10' >> /etc/sysctl.conf
sysctl vm.vfs_cache_pressure=50
echo 'vm.vfs_cache_pressure=50' >> /etc/sysctl.conf
free -h
echo 'Swap file setup finish....'
echo ''
echo ''

#install node
echo 'Installing node....'
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
bash nodesource_setup.sh
apt install nodejs
apt install build-essential
echo 'Node installation finish.'
node_version="$(node -v)"
echo 'Node version: ' $node_version 
echo ''
echo ''

#install yarn
echo 'Installing yarn....'
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt-get update && apt-get install yarn
echo 'Yarn installation finish.'
yarn_version="$(yarn -v)"
echo 'Node version: ' $yarn_version 
echo ''
echo ''

#Install postgres
echo 'Installing postgres....'
apt install postgresql postgresql-contrib
echo 'Postgres installation finish.'
echo 'Manually setup the postgres for extra settings..'
echo 'Config file location: /etc/postgresql/10/main/pg_hba.conf'
echo 'Restart after saving pg_hba.conf: service postgresql restart'
echo ''
echo ''

#Install postgrest api
echo 'Dowloading postgrest api....'
mkdir postgrest
cd postgrest
wget https://github.com/PostgREST/postgrest/releases/download/v5.1.0/postgrest-v5.1.0-ubuntu.tar.xz
tar xfJ postgrest-v5.1.0-ubuntu.tar.xz
apt-get install libpq-dev
ln -sf /root/postgrest/postgrest /usr/local/bin/postgrest
echo 'Setup postgrest api.... finish'
cd
