#!/bin/bash
END=100
for i in $(seq 1 $END); 
do node puppeter.js $i;
done