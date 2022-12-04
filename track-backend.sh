sudo systemctl restart docker
rm -rf trackbackend
mkdir trackbackend
cd trackbackend
git clone https://github.com/grogulin/track-browser-backend.git
docker image rm time7bass/trackbrowserbackend
docker build . -t time7bass/trackbrowserbackend
docker run -p 9900:9900 time7bass/trackbrowserbackend
cd ..
