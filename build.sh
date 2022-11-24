#!/bin/bash
git tag -a v$1 -m "Version $1"
docker build -t osirisguitar/heat-control-backend:$1 .
docker push osirisguitar/heat-control-backend:$1
