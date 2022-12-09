systemctl restart wg-quick@wg0

sudo systemctl start docker
sudo service mysqld restart
rm -rf Web/trackbackend
mkdir Web/trackbackend
cd Web/trackbackend
git clone https://github.com/grogulin/track-browser-backend.git
cd track-browser-backend
docker image rm time7bass/trackbrowserbackend
docker build . -t time7bass/trackbrowserbackend
docker run -p 9900:9900 -d time7bass/trackbrowserbackend
cd ../../..
#rm -rf Web/trackbackend
