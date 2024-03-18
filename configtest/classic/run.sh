#!/bin/sh

cd $(dirname "$0")
set -eux
eslint --max-warnings 0 src
