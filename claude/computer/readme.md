export ANTHROPIC_API_KEY=sk-rFBoE5GHTLgyCfOqOxkS1VItX3yu1a1D2oN8RwrlHIhqmGdo
export ANTHROPIC_BASE_URL=https://api.302.ai/v1/

docker run \
    -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY \
    -e ANTHROPIC_BASE_URL=$ANTHROPIC_BASE_URL \
    -v $HOME/.anthropic:/home/computeruse/.anthropic \
    -p 5900:5900 \
    -p 8501:8501 \
    -p 6080:6080 \
    -p 8080:8080 \
    -it ghcr.io/anthropics/anthropic-quickstarts:computer-use-demo-latest